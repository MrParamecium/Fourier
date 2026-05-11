#!/usr/bin/env python3
"""
Build section-page-map-new.json for the new book (3rd Ed).
Maps chapter / section / subsection codes -> ordered list of page IDs.

Key rules:
- Scan pages in order and forward-fill section/subsection across continuation pages.
- Prefer OCR-detected section/subsection headers over noisy page-level metadata.
- Boundary pages can belong to both the previous and next subsection/section.
- Exclude end-of-chapter/problem pages from teaching-page maps.
"""
import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
META_DIR = ROOT / "tutor-materials" / "new-book-ocr"
OUT_FILE = ROOT / "tutor-openclaw-ui" / "section-page-map-new.json"
SUBSECTION_RE = re.compile(r"^\s*((?:[A-Za-z]\.)?\d+(?:\.\d+)*(?:-\d+)+)\b")
SECTION_RE = re.compile(r"^\s*((?:[A-Za-z]\.)?\d+(?:\.\d+)+)(?!-)\b\s+")


def add(section_map, key, page):
    if key and page not in section_map[key.lower()]:
        section_map[key.lower()].append(page)


def uniq_keep_order(items):
    out = []
    seen = set()
    for item in items:
        key = str(item or "").strip().lower()
        if not key or key in seen:
            continue
        seen.add(key)
        out.append(str(item).strip())
    return out


def normalize(code):
    return str(code or "").strip() or None


def parent_section(code):
    code = normalize(code)
    if not code or "-" not in code:
        return None
    return code.rsplit("-", 1)[0]


def chapter_prefix(chapter):
    chapter = normalize(chapter)
    if not chapter:
        return None
    if chapter.lower() == "b":
        return "b."
    return f"{chapter.lower()}."


def same_chapter(code, chapter):
    code = str(code or "").strip().lower()
    prefix = chapter_prefix(chapter)
    if not code or not prefix:
        return True
    return code.startswith(prefix)


def load_page_text(meta_file):
    txt_file = meta_file.with_name(meta_file.name.replace(".meta.json", ".txt"))
    try:
        return txt_file.read_text(encoding="utf-8", errors="ignore")
    except FileNotFoundError:
        return ""


def detect_headers(text):
    sections = []
    subsections = []
    for line in text.splitlines():
        sub = SUBSECTION_RE.match(line)
        if sub:
            subsections.append(sub.group(1))
            continue
        sec = SECTION_RE.match(line)
        if sec:
            sections.append(sec.group(1))
    sections = uniq_keep_order(sections)
    subsections = uniq_keep_order(subsections)
    if subsections:
        derived_sections = [parent_section(s) for s in subsections]
        sections = uniq_keep_order(sections + [s for s in derived_sections if s])
    return sections, subsections


def is_problem_page(meta):
    page_type = str(meta.get("page_type") or "").strip().lower()
    title = str(meta.get("title") or "").strip().lower()
    return page_type == "problems" or "problem" in title


def main():
    files = sorted(META_DIR.glob("page-*.meta.json"))
    section_map = defaultdict(list)

    active_chapter = None
    active_section = None
    active_subsection = None

    for file in files:
        with open(file, encoding="utf-8") as fp:
            meta = json.load(fp)

        page_id = file.stem.replace(".meta", "")
        if is_problem_page(meta):
            continue

        prev_section = active_section
        prev_subsection = active_subsection

        if meta.get("chapter"):
            active_chapter = normalize(meta.get("chapter"))

        text = load_page_text(file)
        explicit_sections, explicit_subsections = detect_headers(text)
        if active_chapter:
            explicit_sections = [s for s in explicit_sections if same_chapter(s, active_chapter)]
            explicit_subsections = [s for s in explicit_subsections if same_chapter(s, active_chapter)]
        raw_section = normalize(meta.get("section"))
        raw_subsection = normalize(meta.get("subsection"))
        if active_chapter and raw_section and not same_chapter(raw_section, active_chapter):
            raw_section = None
        if active_chapter and raw_subsection and not same_chapter(raw_subsection, active_chapter):
            raw_subsection = None

        if explicit_sections:
            page_section = explicit_sections[-1]
        elif active_section:
            page_section = active_section
        else:
            page_section = raw_section

        if page_section and page_section != active_section:
            if active_section and page_section != active_section:
                active_subsection = None
            active_section = page_section

        boundary_prev_section = None
        if explicit_sections and prev_section and normalize(prev_section) != normalize(explicit_sections[0]) and same_chapter(prev_section, active_chapter):
            boundary_prev_section = prev_section

        boundary_prev_subsection = None
        if explicit_subsections and prev_subsection and normalize(prev_section) == normalize(active_section) and same_chapter(prev_subsection, active_chapter):
            if normalize(prev_subsection) != normalize(explicit_subsections[0]):
                boundary_prev_subsection = prev_subsection

        if explicit_subsections:
            active_subsection = explicit_subsections[-1]
        elif raw_subsection:
            active_subsection = raw_subsection

        add(section_map, active_chapter, page_id)
        add(section_map, active_section, page_id)
        add(section_map, active_subsection, page_id)
        add(section_map, boundary_prev_section, page_id)
        add(section_map, boundary_prev_subsection, page_id)
        for sec in explicit_sections:
            add(section_map, sec, page_id)
        for sub in explicit_subsections:
            add(section_map, sub, page_id)

    result = dict(sorted(section_map.items()))
    OUT_FILE.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"✅ Built {len(result)} section mappings -> {OUT_FILE}")
    for key in ["b", "b.1", "b.1-1", "b.1-2", "b.2", "b.2-1", "b.3", "b.3-1", "b.3-2", "1.2", "1.3", "1.3-1", "1.3-2"]:
        if key in result:
            print(f"  {key}: {len(result[key])} pages -> {result[key]}")


if __name__ == "__main__":
    main()
