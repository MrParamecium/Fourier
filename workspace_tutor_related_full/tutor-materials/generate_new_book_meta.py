#!/usr/bin/env python3
"""
Generate metadata for new book pages using Claude Sonnet.
Processes new-book-ocr/*.txt -> new-book-ocr/*.meta.json
"""
import os, json, time, re, sys, ssl
try:
    import requests as _requests
    USE_REQUESTS = True
except ImportError:
    import urllib.request, urllib.error
    USE_REQUESTS = False

API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
MODEL = "anthropic/claude-sonnet-4.6"
OCR_DIR = "new-book-ocr"
PAGES = 149
DELAY = 0.5  # seconds between requests

SYSTEM_PROMPT = """You are a metadata extractor for a signals and systems textbook (Lathi & Green, Linear Systems and Signals, 3rd ed).
Given a page of text, extract structured metadata. Respond with ONLY valid JSON, no markdown."""

def extract_meta(page_num, text):
    user_prompt = f"""Extract metadata from this textbook page (page {page_num}).

Page text:
---
{text[:3000]}
---

Respond with JSON only:
{{
  "chapter": "B" or "1" or "2" etc,
  "section": "B.1" or "1.3" etc (the main section on this page, or null),
  "subsection": "B.1-2" or "1.3-1" etc (most specific subsection, or null),
  "title": "section title" (or null),
  "summary": "2-3 sentence summary of this page content",
  "keywords": ["keyword1", "keyword2", ...],
  "has_math": true or false,
  "page_type": "text" | "math_heavy" | "example" | "figure" | "mixed" | "problems" | "matlab" | "summary"
}}"""

    payload = json.dumps({
        "model": MODEL,
        "max_tokens": 512,
        "temperature": 0.1,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt}
        ]
    }).encode()

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }
    if USE_REQUESTS:
        resp = _requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            data=payload, headers=headers, timeout=30, verify=False
        )
        data = resp.json()
    else:
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        req = urllib.request.Request(
            "https://openrouter.ai/api/v1/chat/completions",
            data=payload, headers=headers
        )
        with urllib.request.urlopen(req, timeout=30, context=ctx) as r:
            data = json.loads(r.read())
    content = data["choices"][0]["message"]["content"].strip()
    # Strip markdown code fences if present
    content = re.sub(r'^```json\s*', '', content)
    content = re.sub(r'\s*```$', '', content)
    return json.loads(content)

def main():
    if not API_KEY:
        print("❌ OPENROUTER_API_KEY not set")
        sys.exit(1)

    done = 0
    errors = 0
    for page_num in range(1, PAGES + 1):
        txt_path = f"{OCR_DIR}/page-{page_num:03d}.txt"
        meta_path = f"{OCR_DIR}/page-{page_num:03d}.meta.json"

        if os.path.exists(meta_path):
            done += 1
            continue

        if not os.path.exists(txt_path):
            print(f"  ⚠️  page-{page_num:03d}.txt missing, skip")
            continue

        with open(txt_path) as f:
            text = f.read()

        if len(text.strip()) < 20:
            # blank/near-blank page
            meta = {"chapter": None, "section": None, "subsection": None,
                    "title": None, "summary": "Blank or near-blank page.",
                    "keywords": [], "has_math": False, "page_type": "text"}
            with open(meta_path, 'w') as f:
                json.dump(meta, f, ensure_ascii=False, indent=2)
            done += 1
            continue

        try:
            meta = extract_meta(page_num, text)
            meta["book_page"] = f"page-{page_num:03d}"
            with open(meta_path, 'w') as f:
                json.dump(meta, f, ensure_ascii=False, indent=2)
            done += 1
            print(f"  ✅ page-{page_num:03d}: {meta.get('subsection','?')} — {meta.get('title','?')[:50]}")
        except Exception as e:
            errors += 1
            print(f"  ❌ page-{page_num:03d}: {e}")

        time.sleep(DELAY)

    print(f"\n🎉 Done: {done} pages processed, {errors} errors")

if __name__ == "__main__":
    main()
