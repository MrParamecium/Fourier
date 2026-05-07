#!/usr/bin/env python3
"""
Generate SECTION_PREVIEWS entries for new book sections using Claude.
Output: new-book-previews.json
"""
import json, os, glob, ssl
from collections import defaultdict

try:
    import requests as _requests
    USE_REQUESTS = True
except ImportError:
    import urllib.request
    USE_REQUESTS = False

API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
MODEL = "anthropic/claude-haiku-4.5"  # cheap + fast for previews
META_DIR = "tutor-materials/new-book-ocr"
OCR_DIR = "tutor-materials/new-book-ocr"
OUT_FILE = "tutor-materials/new-book-previews.json"

def call_claude(system, user):
    payload = json.dumps({
        "model": MODEL,
        "max_tokens": 400,
        "temperature": 0.2,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user}
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
        return resp.json()["choices"][0]["message"]["content"].strip()
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
        return data["choices"][0]["message"]["content"].strip()

# Group pages by subsection key
files = sorted(glob.glob(f"{META_DIR}/page-*.meta.json"))
sections = defaultdict(list)
for f in files:
    with open(f) as fp:
        m = json.load(fp)
    sub = m.get('subsection') or m.get('section')
    title = m.get('title')
    if sub:
        page_id = os.path.basename(f).replace('.meta.json','')
        sections[sub].append((page_id, title, m.get('summary',''), m.get('keywords',[])))

# Load existing output
if os.path.exists(OUT_FILE):
    with open(OUT_FILE) as f:
        results = json.load(f)
else:
    results = {}

SYSTEM = """You are writing concise section preview descriptions for a signals and systems textbook tutor app.
Given a section ID, title, and summary text, generate TWO descriptions:
1. English (2-3 sentences, student-friendly, explain what this section is about and why it matters for exams)
2. Chinese/Simplified (same content in Chinese)

CRITICAL style rules:
- NEVER start with "Learn", "Master", "Understand", "Discover", "Explore", or any imperative verb
- Vary your opening style — use declarative statements, questions, vivid analogies, or direct content descriptions
- Examples of good openings:
  - "Partial fractions are the key tool for..."
  - "Why does a step function appear everywhere in circuits?"
  - "Convolution—the single operation that defines..."
  - "Fourier transforms turn time-domain headaches into..."
  - "Every LTI system can be fully described by..."
- Each section should feel distinct, not templated

Also pick ONE emoji that best represents the content.
Count the number of reference pages provided.

Respond with ONLY valid JSON:
{"en": "...", "zh": "...", "emoji": "...", "refs": <number>}"""

for section_key, pages in sorted(sections.items()):
    # Build display title from first page that has one
    title = next((p[1] for p in pages if p[1]), section_key)
    summary_text = " ".join([p[2] for p in pages[:3] if p[2]])
    keywords = []
    for p in pages[:3]:
        keywords.extend(p[3])
    keywords = list(set(keywords))[:8]

    # Use section_key as lookup key (matches syllabusDataNew subsection format)
    # Also need title-based key for SECTION_PREVIEWS lookup
    display_key = f"{section_key} {title}" if title and title != section_key else section_key

    if display_key in results or section_key in results:
        print(f"  ✓ skip {section_key}")
        continue

    user_prompt = f"""Section: {section_key}
Title: {title}
Pages: {len(pages)}
Summary: {summary_text[:600]}
Keywords: {', '.join(keywords)}

Generate preview JSON."""

    try:
        raw = call_claude(SYSTEM, user_prompt)
        import re
        raw = re.sub(r'^```json\s*', '', raw)
        raw = re.sub(r'\s*```$', '', raw)
        data = json.loads(raw)
        data['refs'] = len(pages)
        results[display_key] = data
        # Also store by section key alone as fallback
        results[section_key] = data
        print(f"  ✅ {section_key}: {title[:40]}")
        # Save incrementally
        with open(OUT_FILE, 'w') as f:
            json.dump(results, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"  ❌ {section_key}: {e}")

print(f"\n✅ Done: {len(results)} entries -> {OUT_FILE}")
