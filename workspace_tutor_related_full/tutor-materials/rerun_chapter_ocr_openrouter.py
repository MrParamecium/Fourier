#!/usr/bin/env python3
"""
Regenerate new-book OCR pages with OpenRouter vision models.

This intentionally overwrites page-XXX.txt and page-XXX.meta.json for the
requested printed book-page range. It keeps existing figures metadata when
present, because figure crops/descriptions are managed by the figure pipeline.
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import re
import ssl
import sys
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path


ROOT = Path(__file__).resolve().parent
OCR_DIR = ROOT / "new-book-ocr"
PAGE_DIR = ROOT / "new-book-pages"
API_URL = "https://openrouter.ai/api/v1/chat/completions"
DEFAULT_MODEL = "openai/gpt-5.4"

PROMPT = """You are performing OCR and page metadata extraction for a signals and systems textbook page.

Return ONLY valid JSON with this exact shape:
{
  "text": "full OCR text for the page",
  "meta": {
    "chapter": "2" or "3",
    "section": "2.4" or "3.8" or null,
    "subsection": "2.4-1" or "3.11-4" or null,
    "title": "section or page title, or null",
    "summary": "2-3 sentence page summary",
    "keywords": ["keyword", "..."],
    "has_math": true,
    "page_type": "text|math_heavy|example|figure|mixed|problems|matlab|summary"
  }
}

OCR requirements:
- Preserve all visible textbook text, section headings, equations, examples, drills, captions, and MATLAB code.
- Keep section headings on their own line, preserving section numbers such as 2.4-1 or 3.8.
- Preserve equation labels such as (2.17) and (3.24).
- Use readable unicode or LaTeX for math; do not summarize the OCR text.
- If the page is an end-of-chapter Problems page, set page_type to "problems" and do not treat problem numbers as section headings.
- Do not include markdown fences or commentary outside the JSON."""


def load_env(env_path: Path) -> None:
    if not env_path.exists():
        return
    for line in env_path.read_text(encoding="utf-8", errors="ignore").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip("\"'")
        if key and key not in os.environ:
            os.environ[key] = value


def image_data_url(path: Path) -> str:
    raw = path.read_bytes()
    return "data:image/png;base64," + base64.b64encode(raw).decode("ascii")


def strip_json(raw: str) -> dict:
    text = raw.strip()
    text = re.sub(r"^```(?:json)?\s*", "", text)
    text = re.sub(r"\s*```$", "", text)
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        match = re.search(r"\{[\s\S]*\}", text)
        if match:
            return json.loads(match.group(0))
        raise


def call_openrouter(page_num: int, model: str, timeout: int) -> dict:
    api_key = os.environ.get("OPENROUTER_API_KEY", "")
    if not api_key:
        raise RuntimeError("OPENROUTER_API_KEY missing")
    image_path = PAGE_DIR / f"page-{page_num:03d}.png"
    if not image_path.exists():
        raise FileNotFoundError(str(image_path))

    payload = {
        "model": model,
        "temperature": 0,
        "max_tokens": 8192,
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": f"Printed book page: {page_num}\n\n{PROMPT}"},
                    {"type": "image_url", "image_url": {"url": image_data_url(image_path)}},
                ],
            }
        ],
    }
    req = urllib.request.Request(
        API_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://tutor.local",
            "X-Title": "TutorAgent Chapter OCR",
        },
    )
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    with urllib.request.urlopen(req, timeout=timeout, context=ctx) as resp:
        data = json.loads(resp.read())
    content = data["choices"][0]["message"]["content"]
    parsed = strip_json(content)
    if not isinstance(parsed, dict) or not parsed.get("text") or not isinstance(parsed.get("meta"), dict):
        raise ValueError("OpenRouter response missing text/meta")
    return parsed


def normalize_meta(page_num: int, parsed: dict, old_figures: list) -> dict:
    meta = dict(parsed.get("meta") or {})
    chapter = str(meta.get("chapter") or ("2" if page_num < 237 else "3")).strip()
    section = meta.get("section")
    subsection = meta.get("subsection")
    page_type = str(meta.get("page_type") or "mixed").strip().lower()
    allowed_types = {"text", "math_heavy", "example", "figure", "mixed", "problems", "matlab", "summary"}
    if page_type not in allowed_types:
        page_type = "mixed"

    def clean_code(value):
        value = str(value or "").strip()
        return value or None

    section = clean_code(section)
    subsection = clean_code(subsection)
    if section and not section.startswith(f"{chapter}."):
        section = None
    if subsection and not subsection.startswith(f"{chapter}."):
        subsection = None

    return {
        "chapter": chapter,
        "section": section,
        "subsection": subsection,
        "title": meta.get("title") or None,
        "summary": str(meta.get("summary") or "").strip(),
        "keywords": [str(x).strip() for x in meta.get("keywords", []) if str(x).strip()][:16],
        "has_math": bool(meta.get("has_math")),
        "page_type": page_type,
        "book_page": f"page-{page_num:03d}",
        "figures": old_figures,
        "metadata_model": f"openrouter:{os.environ.get('OCR_OPENROUTER_MODEL', DEFAULT_MODEL)}",
    }


def process_page(page_num: int, model: str, timeout: int, force: bool, retries: int) -> tuple[int, str]:
    txt_path = OCR_DIR / f"page-{page_num:03d}.txt"
    meta_path = OCR_DIR / f"page-{page_num:03d}.meta.json"
    if not force and txt_path.exists() and meta_path.exists():
        return page_num, "skip"

    old_figures = []
    if meta_path.exists():
        try:
            old_figures = json.loads(meta_path.read_text(encoding="utf-8")).get("figures") or []
        except Exception:
            old_figures = []

    last_error = None
    for attempt in range(1, retries + 2):
        try:
            parsed = call_openrouter(page_num, model, timeout)
            text = str(parsed["text"]).replace("\r\n", "\n").strip() + "\n"
            meta = normalize_meta(page_num, parsed, old_figures)
            txt_path.write_text(text, encoding="utf-8")
            meta_path.write_text(json.dumps(meta, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            return page_num, f"ok chars={len(text)} section={meta.get('subsection') or meta.get('section')} type={meta.get('page_type')}"
        except Exception as exc:
            last_error = exc
            if attempt <= retries:
                time.sleep(2 * attempt)
    return page_num, f"fail {last_error}"


def main() -> int:
    load_env(ROOT.parent / "tutor-openclaw-ui" / ".env")
    load_env(ROOT.parent.parent / "tutor-openclaw-ui" / ".env")

    parser = argparse.ArgumentParser()
    parser.add_argument("--start", type=int, default=150)
    parser.add_argument("--end", type=int, default=329)
    parser.add_argument("--model", default=os.environ.get("OCR_OPENROUTER_MODEL", DEFAULT_MODEL))
    parser.add_argument("--concurrency", type=int, default=2)
    parser.add_argument("--timeout", type=int, default=180)
    parser.add_argument("--retries", type=int, default=1)
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    os.environ["OCR_OPENROUTER_MODEL"] = args.model
    pages = list(range(args.start, args.end + 1))
    print(f"OpenRouter OCR start pages={args.start}-{args.end} count={len(pages)} model={args.model} concurrency={args.concurrency} force={args.force}", flush=True)

    failures = []
    with ThreadPoolExecutor(max_workers=max(1, args.concurrency)) as pool:
        futures = {pool.submit(process_page, n, args.model, args.timeout, args.force, args.retries): n for n in pages}
        for future in as_completed(futures):
            page_num, status = future.result()
            print(f"page-{page_num:03d}: {status}", flush=True)
            if status.startswith("fail"):
                failures.append((page_num, status))

    if failures:
        print("FAILED:")
        for page_num, status in failures:
            print(f"page-{page_num:03d}: {status}")
        return 1
    print("OpenRouter OCR complete")
    return 0


if __name__ == "__main__":
    sys.exit(main())
