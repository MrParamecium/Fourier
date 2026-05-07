#!/usr/bin/env python3
"""
Extract figure bounding boxes from each book page using Gemini 3.1 Pro vision.
Writes results into each book-XXX.meta.json as a "figures" array:
  { "fig_id": "B.6", "top": 0.35, "left": 0.0, "bottom": 0.72, "right": 1.0, "caption": "..." }
Skips pages that already have figures, or have page_type == "text" with no math.
"""

import os, json, base64, time, sys, re
import requests

API_KEY  = os.environ.get("OPENROUTER_API_KEY", "")
API_URL  = "https://openrouter.ai/api/v1/chat/completions"
MODEL    = "google/gemini-2.5-pro-preview-03-25"   # vision-capable Gemini Pro

OCR_DIR  = os.path.join(os.path.dirname(__file__), "background-ocr-v3")
IMG_DIR  = os.path.join(os.path.dirname(__file__), "background-pages-split")

PROMPT = """You are analyzing a scanned textbook page from a Signal Processing textbook.

Your task: Identify every FIGURE or DIAGRAM on this page (NOT equations or text blocks, only actual visual diagrams/plots/illustrations).

For each figure, return a JSON array with objects like:
{
  "fig_id": "Fig. B.6",
  "top": 58,
  "left": 58,
  "bottom": 620,
  "right": 821,
  "caption": "brief description of what is shown"
}

Rules:
- Bounding box values are in PIXELS from the top-left corner of the image
- Be generous: add 10-20px padding around each figure and its caption
- Include the figure caption text in the bounding box
- If NO figures/diagrams exist (only text + equations), return an empty array: []
- Return ONLY a valid JSON array, no markdown fences, no explanation
"""

def call_gemini(img_path: str) -> list:
    with open(img_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()

    body = json.dumps({
        "model": MODEL,
        "max_tokens": 2000,
        "temperature": 0.1,
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{b64}"}},
                    {"type": "text", "text": PROMPT}
                ]
            }
        ]
    }).encode()

    resp = requests.post(
        API_URL,
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://tutor-agent.local",
            "X-Title": "TutorAgent-FigExtract"
        },
        data=body,
        timeout=90,
        verify=False
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
    figs = json.loads(text[start:end+1])

    # Convert pixel coords to 0-1 fractions using known page size
    from PIL import Image
    with Image.open(img_path) as im:
        W, H = im.size
    out = []
    for fig in figs:
        # Accept either pixel or fractional (if already 0-1)
        t = fig.get('top', 0)
        l = fig.get('left', 0)
        b = fig.get('bottom', H)
        r = fig.get('right', W)
        # If values look like pixels (>1.0), normalize
        if max(t, l, b, r) > 1.0:
            t, l, b, r = t/H, l/W, b/H, r/W
        # Clamp
        t, l, b, r = max(0.0,t), max(0.0,l), min(1.0,b), min(1.0,r)
        out.append({'fig_id': fig.get('fig_id','unnamed'), 'top':round(t,4), 'left':round(l,4), 'bottom':round(b,4), 'right':round(r,4), 'caption': fig.get('caption','')})
    return out


def process_all(force=False):
    pages = sorted([
        f.replace(".meta.json", "")
        for f in os.listdir(OCR_DIR)
        if f.endswith(".meta.json")
    ])
    print(f"Found {len(pages)} pages")

    for i, page_id in enumerate(pages):
        meta_path = os.path.join(OCR_DIR, f"{page_id}.meta.json")
        img_path  = os.path.join(IMG_DIR, f"{page_id}.png")

        if not os.path.exists(img_path):
            print(f"[{i+1}/{len(pages)}] {page_id}: no image, skip")
            continue

        with open(meta_path) as f:
            meta = json.load(f)

        if not force and "figures" in meta:
            print(f"[{i+1}/{len(pages)}] {page_id}: already has figures ({len(meta['figures'])}), skip")
            continue

        # Skip pages that are pure text with no figures expected
        if meta.get("page_type") == "text" and not meta.get("has_math"):
            meta["figures"] = []
            with open(meta_path, "w") as f:
                json.dump(meta, f, indent=2, ensure_ascii=False)
            print(f"[{i+1}/{len(pages)}] {page_id}: text-only, wrote figures=[]")
            continue

        try:
            figs = call_gemini(img_path)
            meta["figures"] = figs
            with open(meta_path, "w") as f:
                json.dump(meta, f, indent=2, ensure_ascii=False)
            print(f"[{i+1}/{len(pages)}] {page_id}: {len(figs)} figure(s) found → saved")
        except Exception as e:
            print(f"[{i+1}/{len(pages)}] {page_id}: ERROR {e}")

        # Rate limit: ~1 req/sec
        time.sleep(1.2)

    print("\nDone!")

if __name__ == "__main__":
    force = "--force" in sys.argv
    # Quick single-page test: python extract_fig_coords.py --test book-016
    if "--test" in sys.argv:
        idx = sys.argv.index("--test")
        page_id = sys.argv[idx+1] if idx+1 < len(sys.argv) else "book-016"
        img_path = os.path.join(IMG_DIR, f"{page_id}.png")
        figs = call_gemini(img_path)
        print(json.dumps(figs, indent=2))
    else:
        process_all(force=force)
