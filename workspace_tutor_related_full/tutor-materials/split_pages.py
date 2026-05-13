#!/usr/bin/env python3
"""
Split all background-pages/page-XXX.png into left/right book pages
using 5:11 ratio (left = 5/11 of width)
Output: background-pages-split/book-XXX.png
"""

import re
from pathlib import Path
from PIL import Image

INPUT_DIR = Path(__file__).parent / "background-pages"
OUTPUT_DIR = Path(__file__).parent / "background-pages-split"
OUTPUT_DIR.mkdir(exist_ok=True)

PDF_PAGE_START = 7
BOOK_PAGE_START = 0
SPLIT_RATIO = 5 / 11  # left : right = 5 : 6


def get_sorted_pages():
    pages = sorted(INPUT_DIR.glob("page-*.png"))
    numbered = []
    for p in pages:
        m = re.match(r'page-(\d+)\.png', p.name)
        if m:
            numbered.append((int(m.group(1)), p))
    return sorted(numbered)


def main():
    pages = get_sorted_pages()
    print(f"Splitting {len(pages)} images → {len(pages)*2} book pages\n")

    for i, (pdf_num, img_path) in enumerate(pages):
        offset = pdf_num - PDF_PAGE_START
        left_book = BOOK_PAGE_START + offset * 2
        right_book = left_book + 1

        left_out = OUTPUT_DIR / f"book-{left_book:03d}.png"
        right_out = OUTPUT_DIR / f"book-{right_book:03d}.png"

        img = Image.open(img_path)
        w, h = img.size
        split_x = int(w * SPLIT_RATIO)

        left = img.crop((0, 0, split_x, h))
        right = img.crop((split_x, 0, w, h))

        left.save(left_out)
        right.save(right_out)
        print(f"[{i+1}/{len(pages)}] {img_path.name} ({w}x{h}) → book-{left_book:03d} + book-{right_book:03d}")

    print(f"\nDone! {len(pages)*2} pages saved to {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
