#!/usr/bin/env python3
"""
Metadata generator for background-ocr-v3/
- Watches for new book-XXX.txt files
- For each one without a corresponding book-XXX.meta.json, calls gpt-5.4 to generate:
  - subsection (e.g. B.1-1)
  - summary (2-3 sentences)
  - keywords (list of 5-10 terms)
- Runs in a loop until all .txt files have metadata, then exits
"""

import os
import re
import json
import time
import requests
from pathlib import Path

BASE_URL = "https://openrouter.ai/api/v1"
API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
MODEL = "openai/gpt-5.4"

OCR_DIR = Path(__file__).parent / "background-ocr-v3"
POLL_INTERVAL = 5   # seconds between scans
MAX_IDLE_ROUNDS = 6 # exit after 6 consecutive idle scans (~30s with no new files)

PROMPT_TEMPLATE = """You are a metadata generator for a Signal Processing and Linear Systems textbook.

Below is the OCR text of one book page. Generate structured metadata for this page.

Return ONLY valid JSON with these fields:
{{
  "subsection": "e.g. B.1-1 or B.2 (the section/subsection this page belongs to, or null if unclear)",
  "summary": "2-3 sentence summary of what this page covers",
  "keywords": ["keyword1", "keyword2", ...],
  "has_math": true or false,
  "page_type": "text" | "example" | "figure" | "table" | "mixed"
}}

Page content:
---
{content}
---"""


def generate_metadata(txt_path: Path) -> dict:
    content = txt_path.read_text(encoding="utf-8").strip()
    if not content:
        return {"subsection": None, "summary": "Empty page", "keywords": [], "has_math": False, "page_type": "text"}

    prompt = PROMPT_TEMPLATE.format(content=content[:3000])  # cap at 3000 chars

    payload = {
        "model": MODEL,
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 512
    }

    resp = requests.post(
        f"{BASE_URL}/chat/completions",
        json=payload,
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://openclaw.ai",
            "X-Title": "TutorAgent Metadata"
        },
        timeout=60
    )
    resp.raise_for_status()
    raw = resp.json()["choices"][0]["message"]["content"].strip()

    # Strip markdown code fences if present
    raw = re.sub(r'^```(?:json)?\s*', '', raw)
    raw = re.sub(r'\s*```$', '', raw)

    meta = json.loads(raw)
    meta["book_page"] = txt_path.stem  # e.g. book-003
    return meta


def get_pending(ocr_dir: Path) -> list[Path]:
    txt_files = sorted(ocr_dir.glob("book-*.txt"))
    pending = []
    for f in txt_files:
        meta_path = f.with_suffix(".meta.json")
        if not meta_path.exists():
            pending.append(f)
    return pending


def main():
    print(f"Metadata generator started. Watching: {OCR_DIR}")
    idle_rounds = 0
    total_done = 0

    while True:
        pending = get_pending(OCR_DIR)

        if not pending:
            idle_rounds += 1
            if idle_rounds >= MAX_IDLE_ROUNDS:
                print(f"\nNo new files for {MAX_IDLE_ROUNDS * POLL_INTERVAL}s. Done! Total generated: {total_done}")
                break
            print(f"  (waiting for new files... {idle_rounds}/{MAX_IDLE_ROUNDS})", flush=True)
            time.sleep(POLL_INTERVAL)
            continue

        idle_rounds = 0

        for txt_path in pending:
            meta_path = txt_path.with_suffix(".meta.json")
            print(f"  Generating metadata: {txt_path.name} ...", end=" ", flush=True)
            t0 = time.time()
            try:
                meta = generate_metadata(txt_path)
                meta_path.write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")
                elapsed = time.time() - t0
                print(f"✓ [{meta.get('subsection','?')}] {elapsed:.1f}s")
                total_done += 1
            except Exception as e:
                print(f"✗ {e}")
            time.sleep(1)  # small pause between metadata calls

        # After processing pending batch, poll again
        time.sleep(POLL_INTERVAL)


if __name__ == "__main__":
    main()
