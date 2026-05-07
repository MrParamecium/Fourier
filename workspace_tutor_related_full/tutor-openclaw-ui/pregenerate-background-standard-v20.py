#!/usr/bin/env python3
import json, re, time, urllib.request, pathlib, sys
from pathlib import Path

API='http://127.0.0.1:9000/api/section'
MAP=Path('/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/section-page-map-new.json')
CACHE_ROOT=Path('/Users/chenghaoxiang/.openclaw/workspace/tutor-materials/lesson-cache')
LOG=Path('/tmp/background-standard-v20.log')
TIMEOUT=600

mp=json.loads(MAP.read_text())
all_sections=[k for k in mp.keys() if re.match(r'^B(?:[.-]\d+)*$', k, re.I)]
all_sections=sorted(all_sections, key=lambda s: [int(x) if x.isdigit() else x.lower() for x in re.split(r'([0-9]+)', s)])

def has_child(section):
    lower = section.lower()
    return any(s.lower() != lower and (s.lower().startswith(lower + '.') or s.lower().startswith(lower + '-')) for s in all_sections)

sections=[s for s in all_sections if not has_child(s)]

def norm(section):
    s=section.strip().lower().replace('.', '_').replace('-', '-')
    return s

def cache_path(section):
    return CACHE_ROOT / norm(section) / 'new__track:standard|math:calculus_ok.v20.en.md'

def post(section):
    body={
        'sectionId': section,
        'sectionTitle': section,
        'mode': 'lesson',
        'language': 'en',
        'bookSource': 'new',
        'webSources': [],
        'uid': None,
        'profileOverride': {
            'track':'standard','goal':'standard','math':'calculus_ok','timeline':'few_weeks','style':[],'outcome':[]
        }
    }
    data=json.dumps(body).encode('utf-8')
    req=urllib.request.Request(API, data=data, headers={'Content-Type':'application/json'})
    with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
        return json.loads(resp.read().decode('utf-8'))

with LOG.open('w', encoding='utf-8') as log:
    log.write(f'sections={len(sections)} timeout={TIMEOUT}s\n')
    log.flush()
    done=0
    for i,section in enumerate(sections,1):
        cp=cache_path(section)
        if cp.exists():
            done+=1
            log.write(f'[{i}/{len(sections)}] SKIP {section} existing={cp}\n')
            log.flush()
            continue
        started=time.time()
        log.write(f'[{i}/{len(sections)}] START {section}\n')
        log.flush()
        try:
            obj=post(section)
            lesson=obj.get('lesson','')
            ok=bool(lesson) and cp.exists()
            elapsed=time.time()-started
            log.write(f'[{i}/{len(sections)}] {"OK" if ok else "FAIL"} {section} elapsed={elapsed:.1f}s cached={obj.get("cached")} fallback={obj.get("fallback")} len={len(lesson)} file={cp.exists()}\n')
            log.flush()
            if ok:
                done+=1
        except Exception as e:
            elapsed=time.time()-started
            log.write(f'[{i}/{len(sections)}] ERROR {section} elapsed={elapsed:.1f}s err={e}\n')
            log.flush()
    log.write(f'DONE done={done}/{len(sections)}\n')
    log.flush()
