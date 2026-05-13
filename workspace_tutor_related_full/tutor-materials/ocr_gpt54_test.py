#!/usr/bin/env python3
"""
OCR test with capi/gpt-5.4
- 只跑前4张 (page-007 ~ page-010)，覆盖 book-000 ~ book-007
- 每张含左右两页，用 === LEFT PAGE === / === RIGHT PAGE === 分隔
"""

import os
import re
import base64
import time
import requests
from pathlib import Path

CAPI_BASE_URL = "https://openrouter.ai/api/v1"
CAPI_API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
MODEL = "openai/gpt-5.4"

INPUT_DIR = Path(__file__).parent / "background-pages"
OUTPUT_DIR = Path(__file__).parent / "background-ocr-v3"
OUTPUT_DIR.mkdir(exist_ok=True)

PDF_PAGE_START = 7    # page-007 is the first image
BOOK_PAGE_START = 0   # book-000, book-001, ...
TEST_IMAGES = None    # None = run all images

PROMPT = """This scanned image contains TWO book pages side by side (left page and right page).

Please extract ALL text content from BOTH pages separately.

Output format — use EXACTLY this structure:
=== LEFT PAGE ===
[full text of left page]

=== RIGHT PAGE ===
[full text of right page]

Requirements for each page:
1. Section headings MUST be on their own line, preserving exact format like:
   B.1 Complex Numbers
   B.1-1 A Historical Note
   (Do NOT add ** or ### or any markdown around headings)
2. All math formulas in LaTeX format (inline: $...$, display: $$...$$)
3. Preserve ALL text, equations, examples, figure captions, footnotes
4. Do not skip or summarize anything
5. Keep original paragraph structure

Start directly with "=== LEFT PAGE ===" — no preamble."""


def ocr_double_page(img_path: Path) -> tuple[str, str]:
    with open(img_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()

    payload = {
        "model": MODEL,
        "messages": [{
            "role": "user",
            "content": [
                {
                    "type": "image_url",
                    "image_url": {"url": f"data:image/png;base64,{b64}"}
                },
                {"type": "text", "text": PROMPT}
            ]
        }],
        "max_tokens": 4096
    }

    resp = requests.post(
        f"{CAPI_BASE_URL}/chat/completions",
        json=payload,
        headers={
            "Authorization": f"Bearer {CAPI_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://openclaw.ai",
            "X-Title": "TutorAgent OCR"
        },
        timeout=120
    )
    resp.raise_for_status()
    raw = resp.json()["choices"][0]["message"]["content"]

    # Parse left / right
    left_text = ""
    right_text = ""

    left_match = re.search(r'===\s*LEFT PAGE\s*===\s*(.*?)(?====\s*RIGHT PAGE\s*===)', raw, re.DOTALL | re.IGNORECASE)
    right_match = re.search(r'===\s*RIGHT PAGE\s*===\s*(.*?)$', raw, re.DOTALL | re.IGNORECASE)

    if left_match:
        left_text = left_match.group(1).strip()
    if right_match:
        right_text = right_match.group(1).strip()

    # Fallback: split on any divider
    if not left_text or not right_text:
        parts = re.split(r'(?:---+|===+|RIGHT PAGE|\*\*RIGHT\*\*)', raw, maxsplit=1, flags=re.IGNORECASE)
        if len(parts) == 2:
            left_text = left_text or parts[0].strip()
            right_text = right_text or parts[1].strip()

    # Fallback: split in half
    if not left_text or not right_text:
        lines = raw.strip().splitlines()
        mid = len(lines) // 2
        left_text = left_text or '\n'.join(lines[:mid]).strip()
        right_text = right_text or '\n'.join(lines[mid:]).strip()

    return left_text, right_text


def get_sorted_pages():
    pages = sorted(INPUT_DIR.glob("*.png"))
    numbered = []
    for p in pages:
        m = re.match(r'page-(\d+)\.png', p.name)
        if m:
            numbered.append((int(m.group(1)), p))
    return sorted(numbered)


def main():
    all_pages = get_sorted_pages()
    pages = all_pages[:TEST_IMAGES] if TEST_IMAGES else all_pages
    print(f"测试前 {len(pages)} 张图片 → 共 {len(pages)*2} 书页\n")

    for i, (pdf_num, img_path) in enumerate(pages):
        offset = pdf_num - PDF_PAGE_START
        left_book = BOOK_PAGE_START + offset * 2
        right_book = left_book + 1

        left_out = OUTPUT_DIR / f"book-{left_book:03d}.txt"
        right_out = OUTPUT_DIR / f"book-{right_book:03d}.txt"

        # Skip if both files exist and non-empty
        if left_out.exists() and right_out.exists() and left_out.stat().st_size > 0 and right_out.stat().st_size > 0:
            print(f"[{i+1}/{len(pages)}] {img_path.name} → already done, skipping")
            continue

        print(f"[{i+1}/{len(pages)}] {img_path.name} → book-{left_book:03d}.txt + book-{right_book:03d}.txt ...", end=" ", flush=True)
        t0 = time.time()

        try:
            left_text, right_text = ocr_double_page(img_path)
            left_out.write_text(left_text, encoding="utf-8")
            right_out.write_text(right_text, encoding="utf-8")
            elapsed = time.time() - t0
            chars = len(left_text) + len(right_text)
            left_lines = len(left_text.splitlines())
            right_lines = len(right_text.splitlines())
            print(f"✓ {chars} chars ({left_lines}L/{right_lines}R lines), {elapsed:.1f}s")
        except Exception as e:
            print(f"✗ 错误: {e}")
            if hasattr(e, 'response') and e.response is not None:
                print(f"   Response: {e.response.text[:300]}")
            time.sleep(5)
            continue

        if i < len(pages) - 1:
            time.sleep(3)

    print("\n=== 完成 ===")
    print(f"输出目录: {OUTPUT_DIR}")
    # Show file sizes
    for f in sorted(OUTPUT_DIR.glob("book-0[0-7].txt")):
        size = f.stat().st_size
        print(f"  {f.name}: {size} bytes")


if __name__ == "__main__":
    main()
