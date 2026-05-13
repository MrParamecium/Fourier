#!/usr/bin/env python3
"""
OCR Background 章节 - v3
- 用 gemini-3.1-pro-preview 识别每张 PNG（左右两页书页）
- 拆分为独立书页文件 book-XXX.txt（按书内页码）
- Background 章节：PDF page-007 对应书内第1页（书页码从1开始）
  - page-007.png → book-001.txt (左) + book-002.txt (右)
  - page-008.png → book-003.txt + book-004.txt
  - 以此类推
"""

import os
import re
import base64
import json
import time
import requests
from pathlib import Path

API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
MODEL = "google/gemini-3.1-pro-preview"
BASE_URL = "https://openrouter.ai/api/v1/chat/completions"

INPUT_DIR = Path(__file__).parent / "background-pages"
OUTPUT_DIR = Path(__file__).parent / "background-ocr-v3"
OUTPUT_DIR.mkdir(exist_ok=True)

# page-007 是第一张图，对应书内页码 1 和 2
# page-008 → 3, 4 ; page-009 → 5, 6 ; ...
PDF_PAGE_START = 7   # 第一张 PNG 的编号
BOOK_PAGE_START = 0  # 对应的书内起始页码（0-indexed）

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
   B.6-2 Some Title
   (Do NOT add ** or ### around headings)
2. All math formulas in LaTeX format
3. Preserve all text, equations, examples, figure captions, footnotes
4. Do not skip or summarize anything
5. Keep original paragraph structure

Start directly with "=== LEFT PAGE ===" — no preamble."""


def ocr_double_page(img_path: Path) -> tuple[str, str]:
    """Returns (left_page_text, right_page_text)"""
    with open(img_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()

    payload = {
        "model": MODEL,
        "messages": [{
            "role": "user",
            "content": [
                {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{b64}"}},
                {"type": "text", "text": PROMPT}
            ]
        }],
        "max_tokens": 8192
    }

    resp = requests.post(BASE_URL, json=payload, headers={
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }, timeout=120)
    resp.raise_for_status()
    raw = resp.json()["choices"][0]["message"]["content"]

    # Split on === LEFT PAGE === and === RIGHT PAGE ===
    left_text = ""
    right_text = ""

    # Try strict format first
    left_match = re.search(r'===\s*LEFT PAGE\s*===\s*(.*?)(?===\s*RIGHT PAGE\s*===)', raw, re.DOTALL | re.IGNORECASE)
    right_match = re.search(r'===\s*RIGHT PAGE\s*===\s*(.*?)$', raw, re.DOTALL | re.IGNORECASE)

    if left_match:
        left_text = left_match.group(1).strip()
    if right_match:
        right_text = right_match.group(1).strip()

    # Fallback 1: try splitting on any divider keyword
    if not left_text or not right_text:
        parts = re.split(r'(?:---+|===+|RIGHT PAGE|\*\*RIGHT\*\*)', raw, maxsplit=1, flags=re.IGNORECASE)
        if len(parts) == 2:
            left_text = left_text or parts[0].strip()
            right_text = right_text or parts[1].strip()

    # Fallback 2: split roughly in half by lines
    if not left_text or not right_text:
        lines = raw.strip().splitlines()
        mid = len(lines) // 2
        left_text = left_text or '\n'.join(lines[:mid]).strip()
        right_text = right_text or '\n'.join(lines[mid:]).strip()

    return left_text, right_text


def get_sorted_pages():
    pages = sorted(INPUT_DIR.glob("*.png"))
    # Extract page number from filename
    numbered = []
    for p in pages:
        m = re.match(r'page-(\d+)\.png', p.name)
        if m:
            numbered.append((int(m.group(1)), p))
    return sorted(numbered)


def main():
    pages = get_sorted_pages()
    print(f"共找到 {len(pages)} 张图片，每张含2页书页，共 {len(pages)*2} 书页")

    results = {}
    errors = []

    for i, (pdf_num, img_path) in enumerate(pages):
        # Calculate book page numbers for this image
        offset = pdf_num - PDF_PAGE_START  # how many images before this one
        left_book_page = BOOK_PAGE_START + offset * 2
        right_book_page = left_book_page + 1

        left_out = OUTPUT_DIR / f"book-{left_book_page:03d}.txt"
        right_out = OUTPUT_DIR / f"book-{right_book_page:03d}.txt"

        # Skip only if both exist AND are non-empty
        if left_out.exists() and right_out.exists() and left_out.stat().st_size > 0 and right_out.stat().st_size > 0:
            print(f"[{i+1}/{len(pages)}] {img_path.name} → book-{left_book_page:03d} & book-{right_book_page:03d} 已存在，跳过")
            continue

        print(f"[{i+1}/{len(pages)}] OCR: {img_path.name} → book-{left_book_page:03d}.txt + book-{right_book_page:03d}.txt ...", end=" ", flush=True)
        t0 = time.time()

        try:
            left_text, right_text = ocr_double_page(img_path)
            left_out.write_text(left_text, encoding="utf-8")
            right_out.write_text(right_text, encoding="utf-8")
            elapsed = time.time() - t0
            chars = len(left_text) + len(right_text)
            results[img_path.stem] = {"left": left_book_page, "right": right_book_page, "chars": chars}
            print(f"✓ {chars} 字符, {elapsed:.1f}s")
        except Exception as e:
            print(f"✗ 错误: {e}")
            errors.append(img_path.name)
            time.sleep(5)
            continue

        # Rate limit: 5s between requests
        if i < len(pages) - 1:
            time.sleep(5)

    print(f"\n=== 完成 ===")
    print(f"成功: {len(results)} 张 / 失败: {len(errors)}")
    if errors:
        print(f"失败: {errors}")

    # Save mapping index
    index = {
        "description": "Maps PDF page filename to book page numbers",
        "pdf_page_start": PDF_PAGE_START,
        "book_page_start": BOOK_PAGE_START,
        "results": results
    }
    (OUTPUT_DIR / "_index.json").write_text(
        json.dumps(index, ensure_ascii=False, indent=2)
    )
    print(f"索引已保存: {OUTPUT_DIR}/_index.json")


if __name__ == "__main__":
    if not API_KEY:
        print("错误：请设置 OPENROUTER_API_KEY 环境变量")
        exit(1)
    main()
