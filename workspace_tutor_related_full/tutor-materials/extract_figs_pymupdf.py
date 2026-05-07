#!/usr/bin/env python3
"""
Extract figure bounding boxes from Lathi 3rd Ed PDF using PyMuPDF.

Improved algorithm v2:
  The key insight for this textbook is that figures consist of many small drawing
  paths (axis ticks, curve segments, arrows). The page border/box is ALWAYS the
  largest rectangle spanning most of the page — we identify and exclude it first.

  Steps:
  1. Collect all vector paths, discard the 1-2 largest "page frame" rects
  2. Build a 2D density map: bin remaining paths into a vertical grid
  3. Find "figure bands" = contiguous vertical regions with high path density
  4. For each band, compute tight bbox from actual paths inside it
  5. Apply padding, filter by minimum size, convert to fraction coords
  6. Crop PNG, optionally label with Claude Sonnet

Usage:
  python3 extract_figs_pymupdf.py            # Background + Chapter 1
  python3 extract_figs_pymupdf.py --test 10  # first N pages
  python3 extract_figs_pymupdf.py --force    # re-run even if done
"""

import os, json, base64, time, sys, re
import requests
import fitz
from PIL import Image

# ── Paths ──────────────────────────────────────────────────────────────────────
DIR       = os.path.dirname(os.path.abspath(__file__))
OCR_DIR   = os.path.join(DIR, 'new-book-ocr')
IMG_DIR   = os.path.join(DIR, 'new-book-pages')
FIGS_DIR  = os.path.join(DIR, 'new-book-figures')
PDF_PATH  = os.path.join(DIR, 'Linear Systems and Signals Third Edition.pdf')
MAP_PATH  = os.path.join(DIR, '..', 'tutor-openclaw-ui', 'section-page-map-new.json')
os.makedirs(FIGS_DIR, exist_ok=True)

PDF_OFFSET = 20   # page-001 = PDF index 20

# ── API (Claude Sonnet for labeling) ──────────────────────────────────────────
API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
API_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL   = "anthropic/claude-sonnet-4.6"

LABEL_PROMPT = """This is a cropped figure from Lathi's "Linear Systems and Signals" (3rd Ed).
Identify: 1) the figure label as printed (e.g. "Fig. B.2") or "unknown", 2) one-sentence caption.
Respond ONLY with JSON: {"fig_id": "Fig. B.2", "caption": "..."}"""


def call_claude_label(crop_path: str, retries: int = 2) -> dict:
    with open(crop_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()
    body = {
        "model": MODEL, "max_tokens": 150, "temperature": 0.1,
        "messages": [{"role": "user", "content": [
            {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{b64}"}},
            {"type": "text", "text": LABEL_PROMPT}
        ]}]
    }
    for attempt in range(retries):
        try:
            resp = requests.post(API_URL,
                headers={"Authorization": f"Bearer {API_KEY}",
                         "Content-Type": "application/json",
                         "HTTP-Referer": "https://tutor-agent.local"},
                json=body, timeout=25)
            resp.raise_for_status()
            text = resp.json()["choices"][0]["message"]["content"].strip()
            s, e = text.find('{'), text.rfind('}')
            if s != -1 and e != -1:
                return json.loads(text[s:e+1])
        except Exception as ex:
            if attempt < retries - 1:
                time.sleep(2)
            else:
                raise ex
    return {"fig_id": "unknown", "caption": ""}


# ── Core detection algorithm ───────────────────────────────────────────────────

def detect_figures(page: fitz.Page) -> list:
    """
    Returns list of fitz.Rect (in pt) for each detected figure on the page.
    """
    W, H = page.rect.width, page.rect.height
    all_drawings = page.get_drawings()

    # ── Step 1: separate "frame" rects from content paths ─────────────────────
    # Filter rules (in order):
    # a) Page-level borders: large in BOTH dimensions
    # b) Bleed/crop marks: start outside the page
    # c) Full-width thin rules: decorative separators
    # d) Sub-pixel noise
    # e) AXIS BOX detection: a rect that is wide (>0.6W) but NOT tall (h < 0.55H)
    #    and appears ≥2 times (duplicate strokes) = the figure's outer border frame.
    #    We detect these by collecting all rects wider than 0.6W and treating them
    #    as "spanning" elements — we keep them in a separate list so the density
    #    scan uses their ENDPOINTS to split bands rather than their full span.

    content_paths = []

    for d in all_drawings:
        r = d['rect']
        dw = r.x1 - r.x0
        dh = r.y1 - r.y0

        # (a) full page border (large in both dimensions)
        if dw > W * 0.65 and dh > H * 0.65:
            continue
        # (b) outside page (bleed marks)
        if r.x0 < -5 or r.y0 < -5 or r.x1 > W + 5 or r.y1 > H + 5:
            continue
        # (c) full-width thin rule (decorative separator)
        if dw > W * 0.65 and dh < 4:
            continue
        # (d) zero-height/zero-width paths with no area
        if dw < 2 and dh < 2:
            continue

        content_paths.append(r)

    if len(content_paths) < 3:
        return []

    # ── Step 1b: remove paths that are "code block" backgrounds ─────────────
    # MATLAB/code blocks in this textbook use a filled rectangle as background.
    # These are wide+tall 'f' (fill) rects with significant text inside them.
    # We detect them by checking character count inside the rect bounds.
    filtered_paths = []
    page_text_dict = page.get_text('rawdict')  # detailed char positions
    all_chars_xy = []  # (x, y) of every char on the page
    for blk in page_text_dict.get('blocks', []):
        for ln in blk.get('lines', []):
            for sp in ln.get('spans', []):
                for ch in sp.get('chars', []):
                    ox, oy = ch['origin']
                    all_chars_xy.append((ox, oy))

    for r in content_paths:
        dw = r.x1 - r.x0
        dh = r.y1 - r.y0
        # Only check wide+tall paths (potential code backgrounds)
        if dw > W * 0.55 and dh > H * 0.15:
            # Count chars inside this rect
            chars_inside = sum(1 for (cx, cy) in all_chars_xy
                               if r.x0 <= cx <= r.x1 and r.y0 <= cy <= r.y1)
            if chars_inside > 20:  # >20 chars = code/text background, skip
                continue
        filtered_paths.append(r)

    content_paths = filtered_paths
    if len(content_paths) < 3:
        return []

    # ── Step 1c: find text-line gaps to use as hard split boundaries ──────────
    # Text blocks between figures create natural empty vertical bands.
    # We collect the y-ranges of significant text blocks (height > 8pt, width > 30pt)
    # and use them as "forbidden" zones that force cluster splits.
    text_blocks = page.get_text('blocks')  # (x0,y0,x1,y1,text,block_no,block_type)
    text_y_ranges = []
    for blk in text_blocks:
        bx0, by0, bx1, by1 = blk[0], blk[1], blk[2], blk[3]
        bw, bh = bx1 - bx0, by1 - by0
        if bh > 8 and bw > 30:
            text_y_ranges.append((by0, by1))

    # ── Step 2: vertical density scan — find figure "bands" ───────────────────
    # Divide page into N_BINS vertical slices; count paths in each slice.
    N_BINS = 100
    bin_h = H / N_BINS
    counts = [0] * N_BINS

    for r in content_paths:
        b0 = max(0, int(r.y0 / bin_h))
        b1 = min(N_BINS - 1, int(r.y1 / bin_h))
        for b in range(b0, b1 + 1):
            counts[b] += 1

    # Threshold: a bin is "active" if it has at least MIN_DENSITY paths
    MIN_DENSITY = 1

    # ── Step 3: find contiguous active bands, split on text-block gaps ────────
    GAP_BINS = 3   # allow up to 3 empty bins inside a figure

    # Build a set of "text-occupied" bins — these force splits
    text_bins = set()
    for (ty0, ty1) in text_y_ranges:
        tb0 = max(0, int(ty0 / bin_h))
        tb1 = min(N_BINS - 1, int(ty1 / bin_h))
        for b in range(tb0, tb1 + 1):
            # Only mark as text if drawing density is ZERO there
            # (pure text rows with no drawings = definite gap between figures)
            if counts[b] == 0:
                text_bins.add(b)

    bands = []   # list of (start_bin, end_bin)
    in_band = False
    gap_count = 0
    band_start = 0

    for i, c in enumerate(counts):
        # A bin with text and no drawings = hard boundary
        is_text_gap = (i in text_bins)

        if c >= MIN_DENSITY and not is_text_gap:
            if not in_band:
                band_start = i
                in_band = True
            gap_count = 0
        else:
            if in_band:
                gap_count += 1
                force_split = is_text_gap and gap_count >= 1
                if gap_count > GAP_BINS or force_split:
                    bands.append((band_start, i - gap_count))
                    in_band = False
                    gap_count = 0
    if in_band:
        bands.append((band_start, N_BINS - 1))

    # ── Step 4: for each band, compute tight bbox from paths inside it ─────────
    MIN_FIG_H_PT  = 50   # minimum figure height in pt
    MIN_FIG_W_PT  = 50   # minimum figure width in pt
    MIN_PATH_COUNT = 4   # minimum number of paths to be a real figure

    # Generous padding — better to include a little extra than cut off axis labels
    PAD_TOP    = 40   # axis labels / titles above the figure
    PAD_BOTTOM = 50   # figure caption below
    PAD_LR     = 30   # y-axis labels / right margin

    results = []
    for (b0, b1) in bands:
        y_min = b0 * bin_h
        y_max = (b1 + 1) * bin_h

        # Collect paths that fall within this band
        band_paths = [r for r in content_paths
                      if r.y1 >= y_min and r.y0 <= y_max]

        if len(band_paths) < MIN_PATH_COUNT:
            continue

        # Tight bbox from drawing paths
        x0 = min(r.x0 for r in band_paths)
        y0 = min(r.y0 for r in band_paths)
        x1 = max(r.x1 for r in band_paths)
        y1 = max(r.y1 for r in band_paths)

        draw_h = y1 - y0
        draw_w = x1 - x0

        # ── Formula-row filter ────────────────────────────────────────────────
        # Inline math/formula drawings are very short in Y (< 35pt) and
        # have few paths clustered in a single line.
        # Real figures are taller (coordinate axes, signal plots, etc.)
        if draw_h < 35:
            continue

        # Also reject if paths are spread across many x-positions but very
        # short in y — signature of a single formula line with symbols
        if draw_h < 50 and len(band_paths) < 8:
            continue

        # Size check
        if draw_w < MIN_FIG_W_PT or draw_h < MIN_FIG_H_PT:
            continue

        # ── Expand bbox to include immediately adjacent text labels ──────────
        # Only grab text that is VERY close to the drawing bbox:
        # within 25pt above (axis titles) or 35pt below (captions).
        # Hard cap: never expand more than 50pt in any direction.
        TEXT_NEAR_TOP    = 15   # pt above drawing bbox → axis label/title (tight)
        TEXT_NEAR_BOTTOM = 40   # pt below drawing bbox → caption
        TEXT_NEAR_LR     = 20   # pt to the side → y-axis label
        MAX_EXPAND       = 40   # hard cap on total expansion per side
        MAX_TOP_BLOCK_W  = 120  # only expand upward for SHORT text (axis labels)
                                # ignore wide paragraph blocks above

        orig_x0, orig_y0, orig_x1, orig_y1 = x0, y0, x1, y1

        for blk in text_blocks:
            bx0, by0, bx1, by1 = blk[0], blk[1], blk[2], blk[3]
            bw, bh = bx1 - bx0, by1 - by0
            if bh < 4 or bw < 8:
                continue
            # Must have horizontal overlap with the drawing region
            h_overlap = min(bx1, x1) - max(bx0, x0)
            if h_overlap < 15:
                continue
            # Just above (only short text = axis label, not paragraph text)
            if by1 >= y0 - TEXT_NEAR_TOP and by0 < y0 and bw <= MAX_TOP_BLOCK_W:
                new_y0 = min(y0, by0)
                if orig_y0 - new_y0 <= MAX_EXPAND:
                    y0 = new_y0
            # Just below
            if by0 <= y1 + TEXT_NEAR_BOTTOM and by1 > y1:
                new_y1 = max(y1, by1)
                if new_y1 - orig_y1 <= MAX_EXPAND:
                    y1 = new_y1
            # Left side labels (within y range of figure)
            if by0 >= orig_y0 - 5 and by1 <= orig_y1 + 5 and bx1 < x0:
                if x0 - bx0 <= TEXT_NEAR_LR + MAX_EXPAND:
                    x0 = min(x0, bx0)

        # Add generous padding, then clamp to page
        x0 = max(0,  x0 - PAD_LR)
        y0 = max(0,  y0 - PAD_TOP)
        x1 = min(W,  x1 + PAD_LR)
        y1 = min(H,  y1 + PAD_BOTTOM)

        results.append(fitz.Rect(x0, y0, x1, y1))

    # ── Step 5: merge overlapping/touching rects ──────────────────────────────
    merged = []
    for r in sorted(results, key=lambda x: x.y0):
        if merged and r.y0 <= merged[-1].y1 + 15:
            last = merged[-1]
            merged[-1] = fitz.Rect(
                min(last.x0, r.x0), min(last.y0, r.y0),
                max(last.x1, r.x1), max(last.y1, r.y1)
            )
        else:
            merged.append(fitz.Rect(r))

    return merged


def rect_to_frac(rect: fitz.Rect, W: float, H: float) -> dict:
    return {
        "top":    round(max(0, rect.y0 / H), 4),
        "left":   round(max(0, rect.x0 / W), 4),
        "bottom": round(min(1, rect.y1 / H), 4),
        "right":  round(min(1, rect.x1 / W), 4),
    }


def crop_png(img_path: str, frac: dict, out_path: str) -> bool:
    with Image.open(img_path) as im:
        W, H = im.size
        l = int(frac['left']   * W)
        t = int(frac['top']    * H)
        r = int(frac['right']  * W)
        b = int(frac['bottom'] * H)
        l, t, r, b = max(0,l), max(0,t), min(W,r), min(H,b)
        if r <= l or b <= t:
            return False
        im.crop((l, t, r, b)).save(out_path, 'PNG')
    return True


def safe_fn(s: str) -> str:
    return re.sub(r'[^a-zA-Z0-9_\-]', '_', str(s)).strip('_').lower()


# ── Main ───────────────────────────────────────────────────────────────────────

def process_pages(page_ids: list, doc: fitz.Document, force: bool = False):
    total = len(page_ids)
    processed = skipped = errors = 0

    for i, page_id in enumerate(page_ids):
        meta_path = os.path.join(OCR_DIR, f"{page_id}.meta.json")
        img_path  = os.path.join(IMG_DIR,  f"{page_id}.png")

        try:
            page_num = int(page_id.replace('page-', ''))
        except ValueError:
            skipped += 1; continue

        pdf_idx = page_num - 1 + PDF_OFFSET

        if not os.path.exists(img_path) or not os.path.exists(meta_path):
            skipped += 1; continue

        with open(meta_path) as f:
            meta = json.load(f)

        if not force and 'figures' in meta:
            print(f"[{i+1}/{total}] {page_id}: already done ({len(meta['figures'])} figs), skip")
            skipped += 1; continue

        # Skip pure text pages
        if meta.get('page_type') == 'text' and not meta.get('has_math'):
            meta['figures'] = []
            with open(meta_path, 'w') as f: json.dump(meta, f, indent=2)
            skipped += 1; continue

        print(f"[{i+1}/{total}] {page_id} (section={meta.get('section','?')}) …", flush=True)

        try:
            pdf_page = doc[pdf_idx]
            W_pt, H_pt = pdf_page.rect.width, pdf_page.rect.height
            fig_rects = detect_figures(pdf_page)

            figs = []
            for j, rect in enumerate(fig_rects):
                frac = rect_to_frac(rect, W_pt, H_pt)
                tmp  = os.path.join(FIGS_DIR, f"_tmp_{page_id}_{j}.png")

                if not crop_png(img_path, frac, tmp):
                    continue

                # Try to label with Claude (best-effort)
                fig_id = f"fig-{page_id}-{j+1}"
                caption = ""
                try:
                    label   = call_claude_label(tmp)
                    fig_id  = label.get('fig_id', fig_id)
                    caption = label.get('caption', '')
                    time.sleep(0.3)
                except Exception as ex:
                    print(f"  ⚠️  label skipped: {ex}", flush=True)

                final_name = f"{page_id}-{safe_fn(fig_id)}-{j+1}.png"
                final_path = os.path.join(FIGS_DIR, final_name)
                os.rename(tmp, final_path)

                with Image.open(final_path) as im:
                    pw, ph = im.size
                print(f"  ✂️  {fig_id}: {final_name} ({pw}×{ph}px)", flush=True)

                figs.append({**frac, "fig_id": fig_id, "caption": caption, "crop_file": final_name})

            meta['figures'] = figs
            with open(meta_path, 'w') as f: json.dump(meta, f, indent=2)
            print(f"  ✅ {len(figs)} figure(s)", flush=True)
            processed += 1

        except Exception as e:
            print(f"  ❌ ERROR: {e}", flush=True)
            import traceback; traceback.print_exc()
            errors += 1

        # clean leftover tmp files
        for f in os.listdir(FIGS_DIR):
            if f.startswith('_tmp_'):
                try: os.remove(os.path.join(FIGS_DIR, f))
                except: pass

    print(f"\n{'='*55}")
    print(f"Done! processed={processed}  skipped={skipped}  errors={errors}")
    print(f"Figures in: {FIGS_DIR}")


if __name__ == "__main__":
    force  = "--force" in sys.argv
    test_n = None
    if "--test" in sys.argv:
        idx    = sys.argv.index("--test")
        test_n = int(sys.argv[idx + 1]) if idx + 1 < len(sys.argv) else 10

    with open(MAP_PATH) as f:
        sec_map = json.load(f)

    if "--all" in sys.argv:
        page_list = sorted({p for pages in sec_map.values() for p in pages})
    else:
        target_keys = [k for k in sec_map if k.lower().startswith('b') or k.startswith('1')]
        seen, page_list = set(), []
        for k in sorted(target_keys):
            for p in sec_map[k]:
                if p not in seen:
                    seen.add(p); page_list.append(p)
        page_list = sorted(page_list)

    if test_n is not None:
        page_list = page_list[:test_n]
        print(f"🧪 TEST: {test_n} pages → {page_list}")
    else:
        print(f"📚 Processing {len(page_list)} pages")

    doc = fitz.open(PDF_PATH)
    try:
        process_pages(page_list, doc, force)
    finally:
        doc.close()
