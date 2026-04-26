#!/usr/bin/env python3
import argparse
import base64
import json
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

ROOT = Path(__file__).resolve().parent
SECTION_MAP_NEW = ROOT / 'section-page-map-new.json'
SECTION_MAP_OLD = ROOT / 'section-page-map.json'

GPT_IMG_RE = re.compile(r'/generated/gptimage2-[^\)\s"\']+', re.I)
LEGACY_GEN_RE = re.compile(r'/generated/(?:fig|chart)-[^\)\s"\']+', re.I)
BOOK_IMG_RE = re.compile(r'/(?:figures|generated/crops|pages)/[^\)\s"\']+', re.I)
MATPLOTLIB_RE = re.compile(r'matplotlib|python_matplotlib', re.I)
VISUAL_PLAN_RE = re.compile(r'data-visual-plan-b64="([^"]+)"', re.I)


def load_sections(book_source: str) -> List[str]:
    path = SECTION_MAP_NEW if book_source == 'new' else SECTION_MAP_OLD
    data = json.loads(path.read_text())
    return list(data.keys())


def extract_visual_plan(markdown: str) -> Optional[Dict[str, Any]]:
    match = VISUAL_PLAN_RE.search(markdown or '')
    if not match:
        return None
    try:
        raw = base64.b64decode(match.group(1)).decode('utf-8')
        return json.loads(raw)
    except Exception:
        return None


def fetch_section(base_url: str, section_id: str, book_source: str, uid: str, timeout: int) -> Dict[str, Any]:
    payload = {
        'sectionId': section_id,
        'sectionTitle': section_id,
        'mode': 'lesson',
        'language': 'en',
        'bookSource': book_source,
        'webSources': [],
        'uid': uid,
    }
    req = urllib.request.Request(
        f'{base_url.rstrip("/")}/api/section',
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'},
    )
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        body = resp.read().decode('utf-8', 'replace')
        return json.loads(body)


def analyze(section_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
    lesson = data.get('lesson', '') or ''
    plan = extract_visual_plan(lesson) or {}
    anchor = str(plan.get('primary_anchor') or '').strip().lower() or None
    gpt_images = GPT_IMG_RE.findall(lesson)
    legacy_images = LEGACY_GEN_RE.findall(lesson)
    book_images = BOOK_IMG_RE.findall(lesson)
    has_matplotlib = bool(MATPLOTLIB_RE.search(lesson))
    has_cached = bool(data.get('cached'))
    fallback = data.get('fallback')

    problems: List[str] = []
    if not plan:
        problems.append('missing_visual_plan')
    if legacy_images:
        problems.append('legacy_generated_image')
    if has_matplotlib:
        problems.append('matplotlib_marker')
    if anchor == 'generated_image' and not gpt_images:
        problems.append('generated_image_without_gptimage2')
    if anchor == 'matplotlib':
        problems.append('visual_plan_matplotlib')
    if not gpt_images and not book_images:
        problems.append('no_renderable_lesson_image')

    ok = not problems
    return {
        'sectionId': section_id,
        'ok': ok,
        'cached': has_cached,
        'fallback': fallback,
        'visualPlan': anchor,
        'gptImages': gpt_images,
        'bookImages': book_images,
        'legacyImages': legacy_images,
        'hasMatplotlib': has_matplotlib,
        'problems': problems,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description='Verify section lesson visuals are using gptimage2 / new visual plan semantics.')
    parser.add_argument('--base-url', default='http://127.0.0.1:9000')
    parser.add_argument('--book-source', choices=['new', 'old'], default='new')
    parser.add_argument('--uid', default='openclaw-control-ui')
    parser.add_argument('--section', action='append', default=[], help='Specific section id(s) to verify')
    parser.add_argument('--limit', type=int, default=0, help='Max number of sections from section-page-map to verify')
    parser.add_argument('--timeout', type=int, default=420)
    parser.add_argument('--delay-ms', type=int, default=0)
    parser.add_argument('--json', action='store_true', help='Output full JSON report')
    args = parser.parse_args()

    sections = args.section[:] if args.section else load_sections(args.book_source)
    if args.limit and args.limit > 0:
        sections = sections[:args.limit]

    results = []
    failures = []
    for idx, section_id in enumerate(sections, start=1):
        try:
            data = fetch_section(args.base_url, section_id, args.book_source, args.uid, args.timeout)
            result = analyze(section_id, data)
        except urllib.error.HTTPError as e:
            result = {
                'sectionId': section_id,
                'ok': False,
                'error': f'HTTP {e.code}',
                'body': e.read().decode('utf-8', 'replace')[:1000],
            }
        except Exception as e:
            result = {
                'sectionId': section_id,
                'ok': False,
                'error': repr(e),
            }
        results.append(result)
        if not result.get('ok'):
            failures.append(result)
        if args.delay_ms and idx < len(sections):
            time.sleep(args.delay_ms / 1000)

    summary = {
        'baseUrl': args.base_url,
        'bookSource': args.book_source,
        'checked': len(results),
        'ok': len(results) - len(failures),
        'failed': len(failures),
        'failures': failures,
    }

    if args.json:
        print(json.dumps({'summary': summary, 'results': results}, ensure_ascii=False, indent=2))
    else:
        print(f"checked={summary['checked']} ok={summary['ok']} failed={summary['failed']}")
        for item in results:
            if item.get('ok'):
                print(f"OK   {item['sectionId']:<12} anchor={item.get('visualPlan') or '-':<16} gpt={len(item.get('gptImages') or [])} cached={item.get('cached')} fallback={item.get('fallback')}")
            else:
                print(f"FAIL {item['sectionId']:<12} problems={','.join(item.get('problems') or []) or item.get('error')}")

    return 1 if failures else 0


if __name__ == '__main__':
    sys.exit(main())
