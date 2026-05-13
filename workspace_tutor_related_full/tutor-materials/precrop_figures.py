#!/usr/bin/env python3
"""
Pre-crop all figures from meta.json bounding boxes.
Output: tutor-openclaw-ui/generated/crops/book-XXX--Fig-B-6.png
"""
import os, json, re
from PIL import Image

OCR_DIR   = os.path.join(os.path.dirname(__file__), "background-ocr-v3")
IMG_DIR   = os.path.join(os.path.dirname(__file__), "background-pages-split")
OUT_DIR   = os.path.join(os.path.dirname(__file__), "../tutor-openclaw-ui/generated/crops")

os.makedirs(OUT_DIR, exist_ok=True)

def safe_filename(fig_id):
    """Convert 'Fig. B.6' → 'Fig-B-6'"""
    return re.sub(r'[^a-zA-Z0-9]', '-', fig_id).strip('-')

total = 0
for fname in sorted(os.listdir(OCR_DIR)):
    if not fname.endswith(".meta.json"):
        continue
    page_id = fname.replace(".meta.json", "")
    meta_path = os.path.join(OCR_DIR, fname)
    img_path  = os.path.join(IMG_DIR, f"{page_id}.png")

    if not os.path.exists(img_path):
        continue

    meta = json.load(open(meta_path))
    figures = meta.get("figures", [])
    if not figures:
        continue

    img = Image.open(img_path)
    W, H = img.size

    for fig in figures:
        fig_id = fig.get("fig_id") or "unnamed"
        t, l, b, r = fig["top"], fig["left"], fig["bottom"], fig["right"]
        # pixel coords
        x0, y0, x1, y1 = int(l*W), int(t*H), int(r*W), int(b*H)
        crop = img.crop((x0, y0, x1, y1))
        out_name = f"{page_id}--{safe_filename(fig_id)}.png"
        out_path = os.path.join(OUT_DIR, out_name)
        crop.save(out_path, optimize=True)
        print(f"  {page_id} / {fig_id} → crops/{out_name} ({crop.size[0]}x{crop.size[1]})")
        total += 1

print(f"\nDone! {total} figures pre-cropped → {OUT_DIR}")
