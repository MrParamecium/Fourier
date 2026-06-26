#!/usr/bin/env node
/**
 * _grow-keep-from-report.js — TEMP scratch (Phase 3.6a iteration helper).
 *
 * Read the latest _view-cascade-report.md, parse flips, and grow
 * _keep-important.json with every candidate from _view-important.json that
 * could plausibly explain each flip:
 *   - candidate.prop matches the flipped prop (or rect-flip → ALL geometry props
 *     touching that element), AND
 *   - candidate.selector contains ANY token from the flipped element's
 *     `tagName`, `#id`, or `.class` set.
 *
 * This OVER-keeps (a candidate may not be the actual cascade winner before strip),
 * but over-keeping is the safe direction: we miss true strippables (lower
 * conversion %), we never strip a load-bearing rule. The loop converges as the
 * keep-set monotonically grows and re-strip + re-check narrows the flip set.
 *
 *   1. node tools/_strip-view-important.js --view=feedback
 *   2. node tools/_view-cascade-probe.js --check       # writes _view-cascade-report.md
 *   3. node tools/_grow-keep-from-report.js            # grows _keep-important.json
 *   4. goto 1 until PASS
 */
'use strict';
const fs = require('fs');
const path = require('path');

const REPORT = path.join(__dirname, '_view-cascade-report.md');
const KEEP = path.join(__dirname, '_keep-important.json');
const CAND = path.join(__dirname, '_view-important.json');

const report = fs.readFileSync(REPORT, 'utf8');
const cand = JSON.parse(fs.readFileSync(CAND, 'utf8'));
const keep = new Set(fs.existsSync(KEEP) ? JSON.parse(fs.readFileSync(KEEP, 'utf8')) : []);
const startSize = keep.size;

// Flatten candidates with target-view tag.
const candidates = [];
for (const [view, list] of Object.entries(cand)) {
  for (const d of list) candidates.push({ view, ...d });
}

// Parse element-desc tokens from `tagName[#id][.class.class…]`.
// We deliberately DO NOT use tagName as a token because every candidate is
// anchored on `#feedbackView` already, and tag-matches (`div` in particular)
// over-keep wildly (any candidate selector containing `div` matches every
// flipping div). #id and .class tokens are precise enough.
function tokensOf(desc) {
  const tokens = new Set();
  for (const id of desc.matchAll(/#([A-Za-z][A-Za-z0-9_-]*)/g)) {
    tokens.add('#' + id[1]);
  }
  for (const cl of desc.matchAll(/\.([A-Za-z][A-Za-z0-9_-]*)/g)) {
    tokens.add('.' + cl[1]);
  }
  // For tagless elements (e.g. plain `div`), fall back to a sentinel that only
  // matches a candidate explicitly targeting `#feedbackView` (the view root) —
  // which is right, because a plain `div` flip without identifying classes IS
  // the view root or a structural wrapper styled via the view ID.
  if (tokens.size === 0) tokens.add('#feedbackView');
  return tokens;
}

// Parse the report's flip lines into [{state, idx, desc, kind, prop}].
const lineRe = /^- (?<state>.+?) \| \[(?<idx>\d+)\] (?<desc>.+?) \| (?<kind>[\w:-]+(?:: ?| "))/;
const propLineRe = /^- (?<state>.+?) \| \[(?<idx>\d+)\] (?<desc>.+?) \| (?<prop>[\w-]+(?:-[\w-]+)*): "/;
const rectLineRe = /^- (?<state>.+?) \| \[(?<idx>\d+)\] (?<desc>.+?) \| rect /;
const pseudoLineRe = /^- (?<state>.+?) \| \[(?<idx>\d+)\] (?<desc>.+?) \| ::(?<pe>before|after|placeholder) /;

const elementFlips = new Map();  // key=desc → Map(prop → Set<states>)
let flipLines = 0;
for (const raw of report.split('\n')) {
  if (!raw.startsWith('- ')) continue;
  flipLines++;
  let m = raw.match(propLineRe);
  let prop;
  let desc;
  if (m) { prop = m.groups.prop; desc = m.groups.desc; }
  else if ((m = raw.match(rectLineRe))) { prop = '__rect__'; desc = m.groups.desc; }
  else if ((m = raw.match(pseudoLineRe))) { prop = '__pseudo__'; desc = m.groups.desc; }
  else continue;
  if (!elementFlips.has(desc)) elementFlips.set(desc, new Map());
  const propMap = elementFlips.get(desc);
  if (!propMap.has(prop)) propMap.set(prop, 0);
  propMap.set(prop, propMap.get(prop) + 1);
}

// Geometry/layout props grouped together — a rect flip on element X means we
// should keep every !important on X's layout-affecting props (any of these can
// have driven the box change).
const RECT_PROPS = new Set([
  'width', 'height', 'min-width', 'min-height', 'max-width', 'max-height',
  'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
  'border', 'border-width', 'border-style', 'border-left', 'border-right',
  'top', 'right', 'bottom', 'left', 'inset',
  'display', 'position', 'box-sizing', 'flex', 'flex-basis', 'flex-direction',
  'flex-grow', 'flex-shrink', 'flex-wrap', 'gap', 'grid-column', 'grid-row',
  'grid-template-columns', 'align-items', 'align-self', 'justify-content',
  'justify-self', 'place-items', 'overflow', 'overflow-y', 'visibility',
  'transform', 'font-size', 'line-height', 'letter-spacing',
]);
// Pseudo flips ⇒ keep ::before/::after-relevant props on the element.
const PSEUDO_PROPS = new Set([
  'content', 'background', 'background-image', 'background-color', 'color',
  'opacity', 'transform', 'box-shadow', 'border-color', 'width', 'height',
  'display', 'top', 'left', 'right', 'bottom', 'position',
]);

let kept = 0;
for (const [desc, propMap] of elementFlips) {
  const tokens = tokensOf(desc);
  const wantProps = new Set();
  for (const p of propMap.keys()) {
    if (p === '__rect__') for (const q of RECT_PROPS) wantProps.add(q);
    else if (p === '__pseudo__') for (const q of PSEUDO_PROPS) wantProps.add(q);
    else wantProps.add(p);
  }
  for (const c of candidates) {
    if (!wantProps.has(c.prop)) continue;
    // selector must mention at least one of the element's tokens.
    let hit = false;
    for (const t of tokens) {
      if (c.selector.includes(t)) { hit = true; break; }
    }
    if (!hit) continue;
    if (!keep.has(c.line)) { keep.add(c.line); kept++; }
  }
}

const out = [...keep].sort((a, b) => a - b);
fs.writeFileSync(KEEP, JSON.stringify(out, null, 2));
console.log(`[grow-keep] flips parsed: ${flipLines}  unique elements: ${elementFlips.size}`);
console.log(`[grow-keep] keep-set: ${startSize} → ${keep.size} (+${kept})`);
console.log(`[grow-keep] wrote ${KEEP}`);
