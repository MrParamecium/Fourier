"""Build the owner-approved English lesson from new source, not a legacy cache."""
import html
import importlib.util
import json
from pathlib import Path
import re
import shutil

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'workspace/materials/chapter-tutor-fresh/2_4-2'
DEST = ROOT / 'app/lessons/2_4-2'
SKILL = Path.home() / '.codex/skills/fourier-chapter-tutor/scripts/build_draft.py'
spec = importlib.util.spec_from_file_location('chapter_builder', SKILL)
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)

checks = {
 'why': ('What area does convolution add?', [('The signed product area', True, 'Correct. Multiply the two heights first, then integrate with its sign.'), ('The gap between the curves', False, 'The gap is not the integrand. We need the pointwise product.')]),
 'time': ('Which variable moves through the integral at a fixed output time?', [('τ', True, 'Correct. τ is integrated out; t selects the output instant.'), ('t', False, 'Hold t fixed for one integral. τ runs through the upper graph.')]),
 'workflow': ('The fixed support starts at −1; the moving edge ends at t+2. When can overlap begin?', [('t > −3', True, 'Correct: t+2 > −1. Touching at −3 has zero area.'), ('Only t > 0', False, 'Both original signals start before zero. Solve t+2 > −1.')]),
 'causal': ('At t=2 in Example 2.10, which interval contributes?', [('0 ≤ τ ≤ 2', True, 'Correct. Intersect τ ≥ 0 with τ ≤ t.'), ('−2 ≤ τ ≤ 0', False, 'The fixed causal signal vanishes for negative τ.')]),
 'signed': ('At t=0 in Example 2.11, what is c(0)?', [('−1', True, 'Correct. Only the negative branch contributes, with integral −1.'), ('+1', False, 'Area below zero is negative. Do not take its absolute value.')]),
 'finite': ('At t=1.5 in Example 2.12, what are the overlap and area?', [('0.5 ≤ τ ≤ 2.5; area = 1', True, 'Correct. Integrate τ/3 from 0.5 to 2.5.'), ('0 ≤ τ ≤ 3; area = 1.5', False, 'The rectangle covers only [t−1,t+1], not the whole ramp.')]),
 'transfer': ('For supports [a,b] and [c,d], where can the convolution be nonzero?', [('[a+c,b+d]', True, 'Correct. Add the beginning edges and the ending edges.'), ('[a−d,b−c]', False, 'Those differences describe another overlap arrangement; output support adds the original supports.')])
}
titles = {'figure27':'Figure 2.7 · The graphical procedure','example210':'Example 2.10 · Two causal exponentials','example211':'Example 2.11 · A two-sided signal','example212':'Example 2.12 · A rectangle and a ramp'}

def demo(key):
    steps = ''.join(f'<button type="button" data-step="{i}" aria-pressed="false">{i} · {label}</button>' for i,label in enumerate(['Read and fix','Flip','Shift and overlap','Multiply and integrate'],1))
    return f'''<section class="demo" data-demo="{key}" aria-label="{titles[key]}" id="demo-{key}">
<div class="demo-head"><h3>{titles[key]}</h3><div class="stepbar" role="group" aria-label="Convolution steps">{steps}</div></div>
<div class="demo-controls"><b>Signals</b><ul data-functions></ul><div class="time-controls"><label>Time t = <output data-time-value>0.00</output><input type="range" aria-label="{titles[key]} time" disabled></label><button data-play type="button" hidden>Play</button><button data-reset type="button">Reset</button></div>
<div class="readouts"><div>Current interval<output data-interval></output></div><div>Integration bounds<output data-bounds></output></div><div>Signed area<output data-area-value></output></div></div><p data-step-note></p><div data-times aria-label="Important times"></div></div>
<div class="legend"><span class="blue">Fixed signal</span><span class="orange">Moving signal</span><span class="purple">Product area</span></div><div data-status role="status">Scroll here to load this independent GeoGebra demo.</div>
<div class="plot-host" data-upper id="{key}-upper"></div><div class="linked-divider">Same t: the upper product area becomes the lower output value</div><div class="plot-host" data-lower id="{key}-lower"></div><div class="demo-note" data-model-note></div></section>'''

def checkpoint(key):
    question,answers=checks[key]
    buttons=''.join(f'<button type="button" data-correct="{str(right).lower()}" data-feedback="{html.escape(feedback,quote=True)}">{html.escape(label)}</button>' for label,right,feedback in answers)
    return f'<fieldset class="checkpoint" data-checkpoint="{key}"><legend>Quick check</legend><p>{html.escape(question)}</p><div class="answers">{buttons}</div><p class="feedback" aria-live="polite">Choose an answer to check this section.</p></fieldset>'

md=(SOURCE/'lesson.md').read_text()
# The skill renderer owns Markdown -> HTML; this adapter handles only our typed slots.
md=md.replace('(assets/figure-', '(assets/textbook-crops/figure-')
manifest={'section':'2.4-2 · Graphical Understanding of Convolution Operation','source_pages':list(range(178,191)),
 'sources_markdown':(SOURCE/'sources.md').read_text(), 'checkpoints_markdown':'# Checkpoints\n\n'+'\n'.join(f'- {q}' for q,_ in checks.values()),
 'assets':[{'path':f'assets/textbook-crops/figure-{n}.png','kind':'textbook_figure'} for n in ['2-7','2-8','2-9','2-10']], 'placeholders':[]}
builder.build_package(SOURCE/'lesson.md', SOURCE, {'current':1,'total':7,'verified':0}, manifest)
body,count=builder.markdown_body(md)
for key in titles: body=body.replace(f'<p>DEMO:{key}</p>',demo(key))
for key in checks: body=body.replace(f'<p>CHECKPOINT:{key}</p>',checkpoint(key))
assert count==7 and body.count('class="demo"')==4
page='''<!doctype html>
<html lang="en" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>2.4-2 · Graphical Understanding of Convolution Operation</title>
<script>try{document.documentElement.dataset.theme=localStorage.getItem('fourier-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){}</script>
<link rel="stylesheet" href="lesson.css?v=fresh-20260909">
<script>window.MathJax={tex:{inlineMath:[['\\\\(','\\\\)']],displayMath:[['\\\\[','\\\\]']]}};</script>
<script defer src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script></head>
<body data-lesson-revision="fresh-20260909"><header class="progress-shell"><div class="progress-inner"><div class="progress-title">2.4-2 · Graphical Understanding of Convolution Operation</div><div class="progress-meta"><div class="progress-text"><span id="progress-position">Current 1/7</span><span>·</span><span id="progress-completed">Completed 0/7</span><span>·</span><span id="progress-percent">14%</span></div><button class="theme-toggle" id="theme-toggle" type="button" aria-label="Switch to dark mode"><svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/></svg><svg class="moon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.5 15.5A8.5 8.5 0 0 1 8.5 4.5a8.5 8.5 0 1 0 11 11Z"/></svg></button></div><div class="track"><div class="bar" id="progress-bar"></div></div></div></header>
<main>'''+body+'''<footer>Source: Lathi &amp; Green, Linear Systems and Signals, Third Edition, §2.4-2, pp. 178–190. Four independently controlled GeoGebra demonstrations. Reading position and checked completion are separate.</footer></main>
<script src="demo-models.js?v=fresh-20260909"></script><script src="demo.js?v=fresh-20260909"></script><script src="lesson.js?v=fresh-20260909"></script></body></html>'''
(SOURCE/'lesson.html').write_text(page)
DEST.mkdir(parents=True,exist_ok=True)
for name in ['lesson.html','lesson.css','lesson.js','demo.js','demo-models.js']:
    shutil.copy2(SOURCE/name,DEST/name)
shutil.copytree(SOURCE/'assets/textbook-crops',DEST/'assets/textbook-crops',dirs_exist_ok=True)
# Keep the text given to the tutor synchronized with the shipped document.
clean=re.sub(r'^(?:DEMO|CHECKPOINT):.*\n?', '', md, flags=re.M)
(DEST/'lesson.md').write_text(clean)
cache=ROOT/'workspace/materials/lesson-cache/2_4-2/new__aquarius_visual_latex_v2.aquarius_visual_latex_v2.en.md'
cache.parent.mkdir(parents=True,exist_ok=True)
meta='%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="lesson_package" data-teaching-role="concept_anchor" style="display:none;"></div>%%KC_END%%\n\n'
cache.write_text(meta+clean.replace('(assets/', '(/lessons/2_4-2/assets/'))
print(f'Built {DEST}: 7 sections, 4 independent demos; cache replaced with new English source.')
