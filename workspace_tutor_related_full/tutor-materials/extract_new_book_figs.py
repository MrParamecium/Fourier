#!/usr/bin/env python3
"""
Extract figure bounding boxes from new book (Lathi 3rd Ed) pages using GPT-5.4.
Writes results into each page-XXX.meta.json as a "figures" array AND
crops each figure into tutor-materials/new-book-figures/{page}-{fig_id}.png

Usage:
  python3 extract_new_book_figs.py            # all pages
  python3 extract_new_book_figs.py --test 3   # first N pages only
  python3 extract_new_book_figs.py --force    # re-run even if already done
"""

import os, json, base64, time, sys, re
import requests
from PIL import Image

# ── Paths ──────────────────────────────────────────────────────────────────────
DIR = os.path.dirname(os.path.abspath(__file__))
OCR_DIR   = os.path.join(DIR, 'new-book-ocr')
IMG_DIR   = os.path.join(DIR, 'new-book-pages')
FIGS_DIR  = os.path.join(DIR, 'new-book-figures')
os.makedirs(FIGS_DIR, exist_ok=True)

# ── API ────────────────────────────────────────────────────────────────────────
API_KEY  = os.environ.get("OPENROUTER_API_KEY", "")
API_URL  = "https://openrouter.ai/api/v1/chat/completions"
MODEL    = "openai/gpt-5.4"   # GPT-5.4 via OpenRouter

PROMPT = """You are analyzing a page from a university signal processing textbook (Lathi, "Linear Systems and Signals", 3rd Edition).

Your task: Identify every FIGURE, DIAGRAM, PLOT, or ILLUSTRATION on this page.
Do NOT include: equations, text blocks, tables of numbers, or multi-line formulas by themselves.
DO include: block diagrams, signal plots, waveform graphs, system diagrams, Venn diagrams, geometric illustrations — anything visual that is NOT just equations or text.

For each figure found, return a JSON array:
[
  {
    "fig_id": "Fig. 1.3",
    "top": 420,
    "left": 55,
    "bottom": 690,
    "right": 760,
    "caption": "short description of what is shown"
  }
]

Rules:
- Bounding box values are in PIXELS from the top-left corner of the image
- Be generous: add 15-25px padding around each figure AND its caption text
- Include the figure caption/label text within the bounding box
- Use the exact figure label from the book (e.g. "Fig. 1.3a", "Figure B.6") if visible; otherwise generate a descriptive id like "diagram-convolution"
- If NO figures/diagrams exist (only text + equations), return: []
- Return ONLY a valid JSON array — no markdown fences, no explanation text
"""

def call_gpt54(img_path: str) -> list:
    with open(img_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()

    body = {
        "model": MODEL,
        "max_tokens": 2000,
        "temperature": 0.1,
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/png;base64,{b64}"}
                    },
                    {"type": "text", "text": PROMPT}
                ]
            }
        ]
    }

    resp = requests.post(
        API_URL,
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://tutor-agent.local",
            "X-Title": "TutorAgent-FigExtract-NewBook"
        },
        json=body,
        timeout=90
    )
    resp.raise_for_status()
    result = resp.json()

    text = result["choices"][0]["message"]["content"].strip()

    # Robustly extract JSON array
    start = text.find('[')
    end   = text.rfind(']')
    if start == -1:
        return []
    if end == -1 or end < start:
        text = text[start:] + ']'
        end = len(text) - 1

    raw_figs = json.loads(text[start:end+1])

    # Normalize: convert pixel coords → 0-1 fractions, clamp
    with Image.open(img_path) as im:
        W, H = im.size

    out = []
    for fig in raw_figs:
        t = float(fig.get('top',    0))
        l = float(fig.get('left',   0))
        b = float(fig.get('bottom', H))
        r = float(fig.get('right',  W))

        # If values look like pixels (> 1.0), normalize
        if max(t, l, b, r) > 1.0:
            t, l, b, r = t/H, l/W, b/H, r/W

        t = max(0.0, min(1.0, t))
        l = max(0.0, min(1.0, l))
        b = max(0.0, min(1.0, b))
        r = max(0.0, min(1.0, r))

        # Sanity: must be a non-trivial box
        if b - t < 0.03 or r - l < 0.03:
            continue

        out.append({
            'fig_id':  fig.get('fig_id', 'unnamed'),
            'top':    round(t, 4),
            'left':   round(l, 4),
            'bottom': round(b, 4),
            'right':  round(r, 4),
            'caption': fig.get('caption', '')
        })
    return out


def safe_filename(fig_id: str) -> str:
    """Convert fig_id to a safe filename fragment."""
    return re.sub(r'[^a-zA-Z0-9_\-]', '_', fig_id).strip('_').lower()


def crop_and_save(img_path: str, page_id: str, figs: list):
    """Crop each figure from the page and save to FIGS_DIR."""
    if not figs:
        return
    with Image.open(img_path) as im:
        W, H = im.size
        for fig in figs:
            t = int(fig['top']    * H)
            l = int(fig['left']   * W)
            b = int(fig['bottom'] * H)
            r = int(fig['right']  * W)
            # Clamp to image bounds
            l, t, r, b = max(0,l), max(0,t), min(W,r), min(H,b)
            if r <= l or b <= t:
                continue
            cropped = im.crop((l, t, r, b))
            safe_id = safe_filename(fig['fig_id'])
            out_name = f"{page_id}-{safe_id}.png"
            out_path = os.path.join(FIGS_DIR, out_name)
            cropped.save(out_path, 'PNG')
            fig['crop_file'] = out_name  # attach filename back to fig dict
            print(f"  ✂️  Saved crop: {out_name} ({r-l}×{b-t}px)")


def process_pages(page_ids: list, force: bool = False):
    total = len(page_ids)
    skipped = 0
    processed = 0
    errors = 0

    for i, page_id in enumerate(page_ids):
        meta_path = os.path.join(OCR_DIR, f"{page_id}.meta.json")
        img_path  = os.path.join(IMG_DIR,  f"{page_id}.png")

        if not os.path.exists(img_path):
            print(f"[{i+1}/{total}] {page_id}: ⚠️  image missing, skip")
            skipped += 1
            continue

        if not os.path.exists(meta_path):
            print(f"[{i+1}/{total}] {page_id}: ⚠️  meta missing, skip")
            skipped += 1
            continue

        with open(meta_path, 'r') as f:
            meta = json.load(f)

        if not force and 'figures' in meta:
            count = len(meta['figures'])
            print(f"[{i+1}/{total}] {page_id}: already done ({count} figs), skip")
            skipped += 1
            continue

        # Skip pure text pages with no math (unlikely to have figures)
        if meta.get('page_type') == 'text' and not meta.get('has_math'):
            meta['figures'] = []
            with open(meta_path, 'w') as f:
                json.dump(meta, f, indent=2, ensure_ascii=False)
            print(f"[{i+1}/{total}] {page_id}: text-only, wrote figures=[]")
            skipped += 1
            continue

        print(f"[{i+1}/{total}] {page_id}: analyzing… (type={meta.get('page_type','?')}, section={meta.get('section','?')})")

        try:
            figs = call_gpt54(img_path)
            # Crop and save each figure
            crop_and_save(img_path, page_id, figs)
            meta['figures'] = figs
            with open(meta_path, 'w') as f:
                json.dump(meta, f, indent=2, ensure_ascii=False)
            if figs:
                print(f"  ✅ {len(figs)} figure(s) found and saved")
            else:
                print(f"  ✅ no figures (text/math only)")
            processed += 1
        except Exception as e:
            print(f"  ❌ ERROR: {e}")
            errors += 1

        time.sleep(1.5)   # rate limit

    print(f"\n{'='*50}")
    print(f"Done! processed={processed} skipped={skipped} errors={errors}")
    print(f"Figures saved to: {FIGS_DIR}")


def get_pages_for_sections(sections: list) -> list:
    """Return sorted list of page_ids for the given section keys."""
    map_path = os.path.join(os.path.dirname(DIR), 'tutor-openclaw-ui', 'section-page-map-new.json')
    if not os.path.exists(map_path):
        # fallback: all pages
        return sorted([f.replace('.meta.json','') for f in os.listdir(OCR_DIR) if f.endswith('.meta.json')])

    with open(map_path) as f:
        sec_map = json.load(f)

    seen = set()
    result = []
    for sec in sections:
        pages = sec_map.get(sec, [])
        for p in pages:
            if p not in seen:
                seen.add(p)
                result.append(p)
    return sorted(result)


if __name__ == "__main__":
    force   = "--force"  in sys.argv
    test_n  = None

    if "--test" in sys.argv:
        idx = sys.argv.index("--test")
        test_n = int(sys.argv[idx+1]) if idx+1 < len(sys.argv) else 3

    # ── Determine page list ────────────────────────────────────────────────────
    if "--all" in sys.argv:
        all_pages = sorted([
            f.replace('.meta.json','')
            for f in os.listdir(OCR_DIR)
            if f.endswith('.meta.json')
        ])
        page_list = all_pages
    else:
        # Default: Background (b) + Chapter 1 (1)
        # These are the section keys in section-page-map-new.json
        map_path = os.path.join(
            os.path.dirname(DIR), 'tutor-openclaw-ui', 'section-page-map-new.json'
        )
        with open(map_path) as f:
            sec_map = json.load(f)

        # Collect all pages for 'b' and '1' (the two top-level chapter sections)
        target_keys = [k for k in sec_map if k.lower().startswith('b') or k.startswith('1')]
        seen = set()
        page_list = []
        for k in sorted(target_keys):
            for p in sec_map[k]:
                if p not in seen:
                    seen.add(p)
                    page_list.append(p)
        page_list = sorted(page_list)  # page-001 → page-149

    if test_n is not None:
        page_list = page_list[:test_n]
        print(f"🧪 TEST MODE: processing first {test_n} pages: {page_list}")
    else:
        print(f"📚 Processing {len(page_list)} pages (Background + Chapter 1)")

    print(f"📁 Crops will be saved to: {FIGS_DIR}\n")
    process_pages(page_list, force=force)
