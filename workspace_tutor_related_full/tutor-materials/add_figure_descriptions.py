#!/usr/bin/env python3
import os, json, glob, base64, re, time, sys
from pathlib import Path
import requests

ROOT = Path(os.path.expanduser('~/Desktop/tutor agent/workspace_tutor_related_full/tutor-materials'))
OCR_DIRS = [ROOT/'new-book-ocr', ROOT/'background-ocr-v3']
FIG_DIRS = [ROOT/'new-book-figures', ROOT/'background-figures', ROOT/'generated'/'crops']
API_KEY = os.environ.get('OPENROUTER_API_KEY','')
MODEL = os.environ.get('FIGURE_DESCRIPTION_MODEL','openai/gpt-5.4')
LIMIT = int(os.environ.get('FIGURE_DESCRIPTION_LIMIT','9999'))

SYSTEM = 'You describe textbook figures for retrieval and teaching. Return JSON only.'
PROMPT = '''Describe this single textbook figure for a tutoring system.
Return strict JSON with:
- description: 2-4 concise sentences. Mention axes, labels, objects, relationships, and what students should notice.
- keywords: 4-8 lowercase retrieval phrases.
Do not solve unrelated problems. Do not mention copyright. Keep it factual and searchable.'''

def load_env(path):
    if not path.exists(): return
    for line in path.read_text().splitlines():
        line=line.strip()
        if not line or line.startswith('#') or '=' not in line: continue
        k,v=line.split('=',1)
        os.environ.setdefault(k.strip(), v.strip().strip('"\''))

load_env(Path('/Users/chenghaoxiang/Desktop/tutor agent/tutor-openclaw-ui/.env'))
API_KEY = os.environ.get('OPENROUTER_API_KEY','')

def find_img(crop):
    if not crop: return None
    name=Path(crop).name
    for d in FIG_DIRS:
        p=d/name
        if p.exists(): return p
    return None

def extract_json(s):
    s=s.strip()
    s=re.sub(r'^```json\s*','',s)
    s=re.sub(r'\s*```$','',s)
    a=s.find('{'); b=s.rfind('}')
    if a>=0 and b>a: s=s[a:b+1]
    return json.loads(s)

def describe(img_path, caption=''):
    b64=base64.b64encode(img_path.read_bytes()).decode()
    payload={
        'model': MODEL,
        'temperature': 0.1,
        'max_tokens': 450,
        'messages': [
            {'role':'system','content':SYSTEM},
            {'role':'user','content':[
                {'type':'text','text': PROMPT + (f'\nExisting caption: {caption}' if caption else '')},
                {'type':'image_url','image_url':{'url':f'data:image/png;base64,{b64}'}}
            ]}
        ]
    }
    r=requests.post('https://openrouter.ai/api/v1/chat/completions',headers={'Authorization':f'Bearer {API_KEY}','Content-Type':'application/json'},json=payload,timeout=120,verify=False)
    if r.status_code>=400:
        raise RuntimeError(f'{r.status_code}: {r.text[:400]}')
    content=r.json()['choices'][0]['message']['content']
    data=extract_json(content)
    desc=str(data.get('description','')).strip()
    kws=data.get('keywords',[])
    if not desc: raise RuntimeError('empty description')
    if not isinstance(kws,list): kws=[]
    return desc, [str(x).strip().lower() for x in kws if str(x).strip()][:8]

def main():
    if not API_KEY:
        print('OPENROUTER_API_KEY missing', file=sys.stderr)
        return 1
    updated=0; skipped=0; errors=0
    for ocr_dir in OCR_DIRS:
        for meta_path in sorted(ocr_dir.glob('*.meta.json')):
            data=json.loads(meta_path.read_text())
            figs=data.get('figures') or []
            changed=False
            for fig in figs:
                if fig.get('description'):
                    skipped+=1; continue
                img=find_img(fig.get('crop_file',''))
                if not img:
                    skipped+=1; continue
                if updated>=LIMIT:
                    break
                try:
                    desc,kws=describe(img, fig.get('caption',''))
                    fig['description']=desc
                    fig['keywords']=sorted(set((fig.get('keywords') or []) + kws))[:12]
                    fig['description_model']=MODEL
                    changed=True; updated+=1
                    print(f'OK {meta_path.name} {fig.get("fig_id")}: {desc[:90]}')
                    time.sleep(0.35)
                except Exception as e:
                    errors+=1
                    print(f'ERR {meta_path.name} {fig.get("fig_id")}: {e}', file=sys.stderr)
            if changed:
                meta_path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n")
            if updated>=LIMIT:
                print(f'Done limit={LIMIT}: updated={updated}, skipped={skipped}, errors={errors}')
                return 0
    print(f'Done: updated={updated}, skipped={skipped}, errors={errors}')
    return 0

if __name__=='__main__':
    raise SystemExit(main())
