#!/usr/bin/env python3
"""
Generate local OCR assets for the new book from the searchable PDF.

This script creates:
- new-book-pages/page-XXX.png
- new-book-ocr/page-XXX.txt
- new-book-ocr/page-XXX.meta.json

The current PDF maps printed book page N to PDF page N + 20.
Existing new-book pages 1-149 were produced in the same page-numbering scheme.
"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
from pathlib import Path

import fitz
from PIL import Image


ROOT = Path(__file__).resolve().parent
PDF_PATH = ROOT / "Linear Systems and Signals Third Edition.pdf"
OCR_DIR = ROOT / "new-book-ocr"
PAGE_DIR = ROOT / "new-book-pages"

PDF_PAGE_OFFSET = 20
TARGET_WIDTH = 1800
TARGET_HEIGHT = 2200
RENDER_SCALE = TARGET_WIDTH / 576

SUBSECTION_RE = re.compile(r"^\s*((?:[A-Za-z]\.)?\d+(?:\.\d+)*(?:-\d+)+)\b\s*(.*)$")
SECTION_RE = re.compile(r"^\s*((?:[A-Za-z]\.)?\d+(?:\.\d)+)(?!-)\b\s*(.*)$")


KEYWORD_PATTERNS = [
    ("zero-input response", r"\bzero[- ]input\b"),
    ("zero-state response", r"\bzero[- ]state\b"),
    ("impulse response", r"\bimpulse response\b"),
    ("convolution", r"\bconvolution\b"),
    ("unit impulse", r"\bunit impulse|\bdelta\b|δ"),
    ("unit step", r"\bunit step|u\("),
    ("differential equation", r"\bdifferential equation\b"),
    ("difference equation", r"\bdifference equation\b"),
    ("characteristic equation", r"\bcharacteristic equation\b"),
    ("characteristic roots", r"\bcharacteristic roots?\b"),
    ("discrete-time", r"\bdiscrete[- ]time\b|\bx\[n\]"),
    ("continuous-time", r"\bcontinuous[- ]time\b|\bx\(t\)"),
    ("LTI system", r"\bLTI\b|linear time[- ]invariant"),
    ("LTIC system", r"\bLTIC\b"),
    ("LTID system", r"\bLTID\b"),
    ("system response", r"\bsystem response\b"),
    ("state equation", r"\bstate equation\b|\bstate-space\b"),
    ("MATLAB", r"\bMATLAB\b|>>"),
    ("sampling", r"\bsampling\b|\bsampled\b"),
    ("digital filter", r"\bdigital filter\b"),
    ("downsampling", r"\bdownsampling\b"),
    ("upsampling", r"\bupsampling\b"),
    ("interpolation", r"\binterpolation\b"),
    ("stability", r"\bstability\b|\bstable\b"),
]


def clean_title(raw: str) -> str | None:
    text = re.sub(r"\s+", " ", raw or "").strip(" .:-")
    if not text:
        return None
    # PDF small caps often extract as "I NTRODUCTION" or "S YSTEM".
    prev = None
    while prev != text:
        prev = text
        text = re.sub(r"\b([A-Z])\s+([A-Z][A-Z]+)\b", r"\1\2", text)
        text = re.sub(r"\b([A-Z])\s+([A-Z][a-z]+)\b", r"\1\2", text)
    text = text.replace("  ", " ").strip()
    if text.isupper() and len(text) > 5:
        text = text.title()
    return text


def parent_section(code: str | None) -> str | None:
    if not code or "-" not in code:
        return None
    return code.rsplit("-", 1)[0]


def chapter_for_printed_page(page_num: int) -> str | None:
    if 150 <= page_num <= 236:
        return "2"
    if 237 <= page_num <= 329:
        return "3"
    return None


def render_page(doc: fitz.Document, printed_page: int, force: bool = False) -> None:
    out = PAGE_DIR / f"page-{printed_page:03d}.png"
    if out.exists() and out.stat().st_size > 0 and not force:
        return

    pdf_page = printed_page + PDF_PAGE_OFFSET
    page = doc[pdf_page - 1]
    pix = page.get_pixmap(matrix=fitz.Matrix(RENDER_SCALE, RENDER_SCALE), alpha=False)
    image = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    if image.width != TARGET_WIDTH:
        ratio = TARGET_WIDTH / image.width
        image = image.resize((TARGET_WIDTH, round(image.height * ratio)), Image.Resampling.LANCZOS)
    if image.height > TARGET_HEIGHT:
        top = (image.height - TARGET_HEIGHT) // 2
        image = image.crop((0, top, TARGET_WIDTH, top + TARGET_HEIGHT))
    elif image.height < TARGET_HEIGHT:
        canvas = Image.new("RGB", (TARGET_WIDTH, TARGET_HEIGHT), "white")
        top = (TARGET_HEIGHT - image.height) // 2
        canvas.paste(image, (0, top))
        image = canvas
    image.save(out)


def extract_text(printed_page: int, force: bool = False) -> str:
    out = OCR_DIR / f"page-{printed_page:03d}.txt"
    if out.exists() and out.stat().st_size > 0 and not force:
        return out.read_text(encoding="utf-8", errors="ignore")

    pdf_page = printed_page + PDF_PAGE_OFFSET
    result = subprocess.run(
        [
            "pdftotext",
            "-f",
            str(pdf_page),
            "-l",
            str(pdf_page),
            "-layout",
            str(PDF_PATH),
            "-",
        ],
        check=True,
        text=True,
        capture_output=True,
    )
    text = result.stdout.replace("\f", "").rstrip() + "\n"
    out.write_text(text, encoding="utf-8")
    return text


def detect_headers(text: str) -> tuple[list[tuple[str, str | None]], list[tuple[str, str | None]]]:
    sections: list[tuple[str, str | None]] = []
    subsections: list[tuple[str, str | None]] = []
    for line in text.splitlines():
        sub = SUBSECTION_RE.match(line)
        if sub:
            subsections.append((sub.group(1), clean_title(sub.group(2))))
            continue
        sec = SECTION_RE.match(line)
        if sec:
            sections.append((sec.group(1), clean_title(sec.group(2))))
    return sections, subsections


def page_type_for(text: str, title: str | None) -> str:
    compact = re.sub(r"\s+", " ", text)
    low = compact.lower()
    title_low = (title or "").lower()
    problem_header = any(re.fullmatch(r"\s*P\s*R\s*O\s*B\s*L\s*E\s*M\s*S\s*", line, re.I) or re.fullmatch(r"\s*Problems\s+\d+\s*", line, re.I) for line in text.splitlines())
    if problem_header or "problem" in title_low:
        return "problems"
    if "summary" in title_low or re.search(r"\b\d+\.\d+\s+s\s*u\s*m\s*m\s*a\s*r\s*y\b", low, re.I):
        return "summary"
    if "matlab" in low or ">>" in text:
        return "matlab"
    if re.search(r"\be\s*x\s*a\s*m\s*p\s*l\s*e\b|\bexample\b", low):
        return "example"
    math_hits = len(re.findall(r"[=∫Σ∑δλγωΩ]|\bdt\b|\bdn\b|\bx\[[n0-9]\]|\by\[[n0-9]\]", text))
    if math_hits >= 10:
        return "math_heavy"
    figure_hits = len(re.findall(r"\bFigure\s+\d", text))
    if figure_hits >= 2 and len(compact) < 1800:
        return "figure"
    return "text"


def forced_page_type(page_num: int) -> str | None:
    if 223 <= page_num <= 236:
        return "problems"
    if 314 <= page_num <= 329:
        return "problems"
    return None


def has_math(text: str) -> bool:
    return bool(re.search(r"[=∫Σ∑δλγωΩ]|\bdt\b|\bdn\b|\bx\[[n0-9]\]|\by\[[n0-9]\]|\([23]\.\d+\)", text))


def keywords_for(text: str, section: str | None, subsection: str | None, title: str | None) -> list[str]:
    keywords: list[str] = []
    for item in [section, subsection, title]:
        if item:
            keywords.append(item)
    for keyword, pattern in KEYWORD_PATTERNS:
        if re.search(pattern, text, re.I):
            keywords.append(keyword)
    out: list[str] = []
    seen = set()
    for item in keywords:
        key = item.lower()
        if key not in seen:
            seen.add(key)
            out.append(item)
    return out[:14]


def summary_for(page_num: int, chapter: str | None, section: str | None, subsection: str | None, title: str | None, text: str) -> str:
    label = subsection or section or (f"Chapter {chapter}" if chapter else f"page {page_num}")
    clean = re.sub(r"[ \t]+", " ", text)
    clean = re.sub(r"\n{2,}", "\n", clean).strip()
    lines = [
        re.sub(r"\s+", " ", line).strip()
        for line in clean.splitlines()
        if re.sub(r"\s+", " ", line).strip()
    ]
    body = " ".join(line for line in lines[:8] if not line.startswith("“"))
    body = body[:420].rstrip()
    if title:
        return f"This page covers {label} ({title}). OCR text begins with: {body}"
    return f"This page covers {label}. OCR text begins with: {body}"


def write_meta(page_num: int, text: str, state: dict[str, str | None], force: bool = False) -> None:
    meta_path = OCR_DIR / f"page-{page_num:03d}.meta.json"
    old_figures = []
    if meta_path.exists():
        try:
            old_figures = json.loads(meta_path.read_text(encoding="utf-8")).get("figures") or []
        except Exception:
            old_figures = []
    if meta_path.exists() and meta_path.stat().st_size > 0 and old_figures and not force:
        return

    chapter = chapter_for_printed_page(page_num) or state.get("chapter")
    state["chapter"] = chapter
    forced_type = forced_page_type(page_num)

    explicit_sections, explicit_subsections = detect_headers(text)
    if chapter:
        # Avoid treating formula constants such as 0.8, 1.8, or 6.5 as section
        # headers while processing a known chapter range.
        explicit_sections = [(code, title) for code, title in explicit_sections if code.startswith(f"{chapter}.")]
        explicit_subsections = [(code, title) for code, title in explicit_subsections if code.startswith(f"{chapter}.")]

    title = None
    if forced_type == "problems":
        explicit_sections = []
        explicit_subsections = []
        title = "Problems"
    elif explicit_sections:
        section_code, title = explicit_sections[-1]
        state["section"] = section_code
        state["subsection"] = None
    if explicit_subsections:
        subsection_code, sub_title = explicit_subsections[-1]
        state["subsection"] = subsection_code
        state["section"] = parent_section(subsection_code) or state.get("section")
        title = sub_title or title

    section = state.get("section")
    subsection = state.get("subsection")
    page_type = forced_type or page_type_for(text, title)

    if not title:
        if page_type == "problems":
            title = "Problems"
        elif page_type == "summary":
            title = "Summary"

    meta = {
        "chapter": chapter,
        "section": section,
        "subsection": subsection,
        "title": title,
        "summary": summary_for(page_num, chapter, section, subsection, title, text),
        "keywords": keywords_for(text, section, subsection, title),
        "has_math": has_math(text),
        "page_type": page_type,
        "book_page": f"page-{page_num:03d}",
        "figures": old_figures,
        "metadata_model": "local-pdftotext-pymupdf-2026-05-09",
    }
    meta_path.write_text(json.dumps(meta, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--start", type=int, default=150)
    parser.add_argument("--end", type=int, default=329)
    parser.add_argument("--force-text", action="store_true")
    parser.add_argument("--force-pages", action="store_true")
    parser.add_argument("--force-meta", action="store_true")
    args = parser.parse_args()

    OCR_DIR.mkdir(exist_ok=True)
    PAGE_DIR.mkdir(exist_ok=True)

    doc = fitz.open(PDF_PATH)
    state: dict[str, str | None] = {
        "chapter": chapter_for_printed_page(args.start),
        "section": None,
        "subsection": None,
    }

    for page_num in range(args.start, args.end + 1):
        render_page(doc, page_num, force=args.force_pages)
        text = extract_text(page_num, force=args.force_text)
        write_meta(page_num, text, state, force=args.force_meta)
        txt_size = (OCR_DIR / f"page-{page_num:03d}.txt").stat().st_size
        img_size = (PAGE_DIR / f"page-{page_num:03d}.png").stat().st_size
        print(f"page-{page_num:03d}: text={txt_size}B image={img_size}B section={state.get('subsection') or state.get('section')}")


if __name__ == "__main__":
    main()
