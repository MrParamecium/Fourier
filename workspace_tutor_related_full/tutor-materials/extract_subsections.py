#!/usr/bin/env python3
"""
Extract subsections (B.X-Y Title) from background-ocr pages.
Outputs subsections.json in background-ocr/.
"""

import os
import re
import json

OCR_DIR = os.path.join(os.path.dirname(__file__), "background-ocr")
OUTPUT = os.path.join(OCR_DIR, "subsections.json")

# Match patterns like:
#   B.1-1 A Historical Note              (plain)
#   **B.5-2 Partial Fractions: ...**      (bold markdown)
#   ### B.7-7 Indefinite Integrals        (heading markdown)
SUBSECTION_RE = re.compile(
    r'^(?:\#{1,4}\s*|\*{1,2})?'   # optional ### or **
    r'(B\.\d+-\d+)'               # subsection id e.g. B.5-2
    r'\s+'                         # whitespace
    r'([^\n\*\#]{2,100})'         # title text (no * or #)
    r'\*{0,2}$',                   # optional closing **
    re.MULTILINE
)

def get_sorted_pages():
    pages = []
    for fname in os.listdir(OCR_DIR):
        m = re.match(r'^page-(\d+)\.txt$', fname)
        if m:
            pages.append((int(m.group(1)), fname))
    pages.sort()
    return pages

def extract():
    pages = get_sorted_pages()

    # subsections[id] = { title, pages: [] }
    subsections = {}
    # Track which subsection is "current" as we scan pages
    current_subsection = None

    for page_num, fname in pages:
        page_id = fname.replace('.txt', '')
        fpath = os.path.join(OCR_DIR, fname)
        with open(fpath, 'r', encoding='utf-8') as f:
            text = f.read()

        # Find all subsection headers on this page
        matches = list(SUBSECTION_RE.finditer(text))

        if matches:
            for m in matches:
                sub_id = m.group(1)          # e.g. B.1-1
                sub_title = m.group(2).strip()

                # Clean up title — truncate at common noise patterns
                sub_title = re.split(r'\s{3,}|\t', sub_title)[0].strip()
                sub_title = sub_title.rstrip('.')

                if sub_id not in subsections:
                    subsections[sub_id] = {
                        "id": sub_id,
                        "title": f"{sub_id} {sub_title}",
                        "pages": []
                    }
                # Add this page if not already there
                if page_id not in subsections[sub_id]["pages"]:
                    subsections[sub_id]["pages"].append(page_id)

                current_subsection = sub_id
        else:
            # No new subsection starts on this page —
            # it belongs to the current one (continuation)
            if current_subsection and current_subsection in subsections:
                if page_id not in subsections[current_subsection]["pages"]:
                    subsections[current_subsection]["pages"].append(page_id)

    # Sort by subsection id
    def sort_key(k):
        parts = re.match(r'B\.(\d+)-(\d+)', k)
        if parts:
            return (int(parts.group(1)), int(parts.group(2)))
        return (999, 999)

    ordered = dict(sorted(subsections.items(), key=lambda x: sort_key(x[0])))

    with open(OUTPUT, 'w', encoding='utf-8') as f:
        json.dump(ordered, f, ensure_ascii=False, indent=2)

    print(f"Found {len(ordered)} subsections:")
    for k, v in ordered.items():
        print(f"  {k}: {v['title']}")
        print(f"       pages: {v['pages']}")

if __name__ == '__main__':
    extract()
