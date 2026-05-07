#!/usr/bin/env python3
"""Test figure extraction on a single page."""
import json, base64, requests, re
from PIL import Image

API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
MODEL   = "google/gemini-2.5-pro-preview-03-25"
API_URL = "https://openrouter.ai/api/v1/chat/completions"

img_path = "/Users/chenghaoxiang/.openclaw/workspace/tutor-materials/background-pages-split/book-016.png"

with open(img_path, "rb") as f:
    b64 = base64.b64encode(f.read()).decode()

PROMPT = """You are analyzing a scanned textbook page from a Signal Processing textbook.
Identify every FIGURE or DIAGRAM (NOT equations, only visual plots/diagrams/illustrations).
Return a JSON array: [{"fig_id":"Fig.X","top":58,"left":58,"bottom":620,"right":821,"caption":"..."}]
Bounding box in PIXELS. Include caption in the box. If none, return []. Only raw JSON, no markdown."""

body = json.dumps({
    "model": MODEL, "max_tokens": 2000, "temperature": 0.0,
    "messages": [{"role": "user", "content": [
        {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{b64}"}},
        {"type": "text", "text": PROMPT}
    ]}]
}).encode()

resp = requests.post(API_URL,
    headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
    data=body, timeout=90, verify=False)
raw = resp.json()["choices"][0]["message"]["content"].strip()
print("RAW:", repr(raw[:300]))

start, end = raw.find("["), raw.rfind("]")
figs_raw = json.loads(raw[start:end+1])

# Normalize to fractions
with Image.open(img_path) as im:
    W, H = im.size
print(f"Image size: {W}x{H}")

figs = []
for fig in figs_raw:
    t, l, b, r = fig["top"], fig["left"], fig["bottom"], fig["right"]
    if max(t, l, b, r) > 1.0:
        t, l, b, r = t/H, l/W, b/H, r/W
    figs.append({"fig_id": fig.get("fig_id","unnamed"), "top": round(t,4), "left": round(l,4), "bottom": round(b,4), "right": round(r,4), "caption": fig.get("caption","")})

print("FIGURES:")
print(json.dumps(figs, indent=2))

# Crop and save to verify
from PIL import Image as PImage
img = PImage.open(img_path)
for i, fig in enumerate(figs):
    crop = img.crop((int(fig["left"]*W), int(fig["top"]*H), int(fig["right"]*W), int(fig["bottom"]*H)))
    out = f"/tmp/fig_test_{i}.png"
    crop.save(out)
    print(f"Saved crop: {out} ({crop.size})")
