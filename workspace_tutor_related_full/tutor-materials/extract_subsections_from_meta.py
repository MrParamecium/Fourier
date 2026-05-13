#!/usr/bin/env python3
"""
Extract subsections from book-XXX.meta.json files
Output: background-ocr-v3/subsections.json
Format: [{subsection, label, start_page, end_page, book_pages: []}]
"""

import json
import re
from pathlib import Path
from collections import defaultdict

OCR_DIR = Path(__file__).parent / "background-ocr-v3"

def normalize_subsection(raw):
    if not raw:
        return None
    # Extract the B.X or B.X-Y part from the subsection field
    m = re.match(r'(B\.\d+(?:-\d+)?)', str(raw))
    if m:
        return m.group(1)
    # Sometimes it might be like "Background" or "B"
    if str(raw).strip() in ("B", "Background"):
        return "B"
    return None

def main():
    meta_files = sorted(OCR_DIR.glob("book-*.meta.json"))
    print(f"Found {len(meta_files)} meta files")

    # Build page -> subsection mapping
    page_subsection = {}
    for mf in meta_files:
        data = json.loads(mf.read_text(encoding="utf-8"))
        book_page = data.get("book_page", mf.stem.replace(".meta", ""))
        # Extract page number
        m = re.match(r'book-(\d+)', book_page)
        if not m:
            continue
        page_num = int(m.group(1))
        sub = normalize_subsection(data.get("subsection"))
        page_subsection[page_num] = {
            "subsection": sub,
            "summary": data.get("summary", ""),
            "keywords": data.get("keywords", []),
            "has_math": data.get("has_math", False),
            "page_type": data.get("page_type", "text"),
        }

    # Group consecutive pages by subsection
    # Use forward-fill: if a page has no subsection, inherit from previous
    pages = sorted(page_subsection.keys())
    last_sub = None
    filled = {}
    for p in pages:
        sub = page_subsection[p]["subsection"]
        if sub:
            last_sub = sub
        filled[p] = {**page_subsection[p], "subsection": last_sub or "B"}

    # Group by subsection (in order of first appearance)
    subsection_pages = defaultdict(list)
    seen_order = []
    for p in pages:
        sub = filled[p]["subsection"]
        if sub not in subsection_pages:
            seen_order.append(sub)
        subsection_pages[sub].append(p)

    # Build result
    result = []
    for sub in seen_order:
        pgs = subsection_pages[sub]
        # Collect all keywords for this subsection
        all_keywords = []
        for p in pgs:
            all_keywords.extend(filled[p]["keywords"])
        # Deduplicate keywords preserving order
        seen_kw = set()
        unique_kw = []
        for kw in all_keywords:
            if kw.lower() not in seen_kw:
                seen_kw.add(kw.lower())
                unique_kw.append(kw)

        result.append({
            "subsection": sub,
            "start_page": min(pgs),
            "end_page": max(pgs),
            "book_pages": pgs,
            "keywords": unique_kw[:15],
        })

    out_path = OCR_DIR / "subsections.json"
    out_path.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Written {len(result)} subsections to {out_path}")
    print()
    for s in result:
        print(f"  {s['subsection']:12s}  pages {s['start_page']:3d}-{s['end_page']:3d}  ({len(s['book_pages'])} pages)")

if __name__ == "__main__":
    main()
