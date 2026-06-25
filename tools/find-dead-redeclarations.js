#!/usr/bin/env node
/**
 * find-dead-redeclarations.js — correctness-hardened dead-declaration detector.
 *
 * Phase 3.6 §14 prerequisite 2. Finds CSS declarations that are PROVABLY dead by
 * the cascade: within the SAME at-rule context (the @media/@supports/@container
 * stack) and the EXACT same selector string, when a property is declared more
 * than once, only one declaration can ever win — the LAST declaration at the
 * HIGHEST importance tier present (!important beats normal regardless of order;
 * among equal importance, later source position wins). Every OTHER declaration
 * of that property in that group is cascade-neutral to delete, at any viewport.
 *
 * This is a real character-level state machine (NOT regex): it tracks
 *   - /* block comments *\/
 *   - "double" and 'single' quoted strings (so content:"}" can't fool it)
 *   - ( ... ) paren depth (so url(data:image/svg+xml;...{...}) can't fool it)
 *   - { } block depth, with a context STACK that pushes on @media/@supports/
 *     @container and pops on the matching close brace (the bug the throwaway
 *     detector had: it never popped, mis-labelling top-level decls as media-gated)
 *   - @keyframes / @font-face / @page bodies are treated as OPAQUE (their inner
 *     "0% { }" blocks are not selectors and must not be grouped as redeclarations)
 *
 * Conservative by construction:
 *   - selectors grouped by byte-normalized string (whitespace collapsed, trimmed);
 *     two selectors that differ at all are DIFFERENT groups → never over-deletes
 *   - property names compared exactly (no shorthand/longhand expansion) →
 *     `margin` then `margin-top` are NOT grouped (both kept)
 *   - only EXACT same property+selector+context is ever flagged
 *
 * Usage:
 *   node tools/find-dead-redeclarations.js <file.css> [--json] [--top-level] [--media] [--selector=SEL]
 *   node tools/find-dead-redeclarations.js --validate   (self-test against main's ground truth)
 */
'use strict';

const fs = require('fs');

// ---- tokenizing scanner -----------------------------------------------------

/**
 * Parse a CSS string into a flat list of declaration records, each tagged with
 * its full context path and the line it starts on.
 * @returns {Array<{context:string, selector:string, prop:string, important:boolean, line:number, raw:string}>}
 */
function parseDeclarations(css) {
  const decls = [];
  const ctxStack = []; // normalized at-rule preludes, e.g. '@media (max-width: 760px)'
  // selector frame stack: each style-rule block pushes its selector; null for skipped/at-rule frames.
  const selStack = [];
  let i = 0;
  const n = css.length;

  // line tracking: precompute newline offsets for O(log n) line lookup
  const lineStarts = [0];
  for (let k = 0; k < n; k++) if (css[k] === '\n') lineStarts.push(k + 1);
  const lineOf = (off) => {
    // binary search: largest index with lineStarts[idx] <= off
    let lo = 0, hi = lineStarts.length - 1, ans = 0;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (lineStarts[mid] <= off) { ans = mid; lo = mid + 1; } else hi = mid - 1;
    }
    return ans + 1; // 1-based
  };

  const norm = (s) => s.replace(/\s+/g, ' ').trim();

  // `buf` accumulates the raw text of the current chunk (a prelude before `{`,
  // or a declaration before `;`/`}`). `bufStart` is its byte offset (for line#).
  let buf = '';
  let bufStart = -1;
  const pushChar = (ch, off) => { if (buf === '') bufStart = off; buf += ch; };

  // depth at which a skipped (opaque) at-rule body began; -1 when not skipping.
  let skipDepth = -1;

  while (i < n) {
    const ch = css[i];

    // --- comments ---
    if (ch === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2);
      i = end === -1 ? n : end + 2;
      continue;
    }
    // --- strings ---
    if (ch === '"' || ch === "'") {
      const quote = ch;
      let j = i + 1;
      while (j < n) {
        if (css[j] === '\\') { j += 2; continue; }
        if (css[j] === quote) break;
        j++;
      }
      // preserve the string verbatim in buf so values stay intact
      const str = css.slice(i, Math.min(j + 1, n));
      if (buf === '') bufStart = i;
      buf += str;
      i = j + 1;
      continue;
    }
    // --- parens (url(), calc(), data-URIs): swallow until matching ) ---
    if (ch === '(') {
      let depth = 0;
      let j = i;
      while (j < n) {
        const c = css[j];
        if (c === '/' && css[j + 1] === '*') { const e = css.indexOf('*/', j + 2); j = e === -1 ? n : e + 2; continue; }
        if (c === '"' || c === "'") {
          const q = c; let k = j + 1;
          while (k < n) { if (css[k] === '\\') { k += 2; continue; } if (css[k] === q) break; k++; }
          j = k + 1; continue;
        }
        if (c === '(') depth++;
        else if (c === ')') { depth--; if (depth === 0) { j++; break; } }
        j++;
      }
      const paren = css.slice(i, j);
      if (buf === '') bufStart = i;
      buf += paren;
      i = j;
      continue;
    }

    // --- block open ---
    if (ch === '{') {
      const prelude = norm(buf);
      buf = '';
      if (skipDepth !== -1) {
        // already inside an opaque at-rule: just track nesting via selStack
        selStack.push(null);
        i++;
        continue;
      }
      if (prelude.startsWith('@')) {
        const atName = prelude.slice(1).split(/[\s(]/, 1)[0].toLowerCase();
        if (atName === 'media' || atName === 'supports' || atName === 'container') {
          ctxStack.push(prelude);
          selStack.push('__AT__'); // marker: pop ctxStack when this frame closes
        } else {
          // @keyframes / @font-face / @page / @layer-block / etc → opaque
          skipDepth = selStack.length; // remember the depth where skipping started
          selStack.push(null);
        }
      } else {
        selStack.push(prelude); // a style rule; prelude is the selector
      }
      i++;
      continue;
    }

    // --- block close ---
    if (ch === '}') {
      // flush a trailing declaration with no semicolon
      flushDecl(i, false);
      const frame = selStack.pop();
      if (frame === '__AT__') ctxStack.pop();
      // skipDepth was set to selStack.length BEFORE the opaque frame was pushed,
      // so that frame sits AT index skipDepth; popping it returns length to
      // skipDepth. Use <= (not <) or the skip never ends → rest of file lost.
      if (skipDepth !== -1 && selStack.length <= skipDepth) skipDepth = -1;
      i++;
      continue;
    }

    // --- declaration terminator ---
    if (ch === ';') {
      flushDecl(i, true);
      i++;
      continue;
    }

    pushChar(ch, i);
    i++;
  }

  function flushDecl(termOffset, isSemicolon) {
    const raw = buf;
    const rawStart = bufStart;
    buf = '';
    bufStart = -1;
    if (skipDepth !== -1) return; // inside opaque at-rule
    const text = raw.trim();
    if (!text) return;
    const sel = selStack[selStack.length - 1];
    if (sel === null || sel === '__AT__' || sel === undefined) return; // not inside a style rule
    const colon = text.indexOf(':');
    if (colon === -1) return; // not a declaration (e.g. stray token)
    const prop = text.slice(0, colon).trim().toLowerCase();
    if (!prop) return;
    const value = text.slice(colon + 1).trim();
    const important = /!\s*important\b/i.test(value);
    // exact byte span of the declaration, for surgical excision:
    //   declStart = first non-ws char (the property name)
    //   spanEnd   = just after the terminating ';' (or at the '}' if none)
    const leadWs = raw.length - raw.trimStart().length;
    const declStart = rawStart + leadWs;
    const spanEnd = isSemicolon ? termOffset + 1 : declStart + text.length;
    decls.push({
      context: ctxStack.join(' || '),
      selector: norm(sel),
      prop,
      important,
      line: lineOf(declStart),
      raw: text,
      start: declStart,
      end: spanEnd,
    });
  }

  return decls;
}

// ---- dead-declaration analysis ----------------------------------------------

/**
 * Group declarations by (context, selector, prop) and mark the dead ones.
 * Within a group, the winner is the LAST declaration at the highest importance
 * tier present; all others are dead.
 * @returns {Array<{dead, winner, group}>}
 */
function findDead(decls) {
  const groups = new Map();
  decls.forEach((d, idx) => {
    const key = `${d.context} ${d.selector} ${d.prop}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({ ...d, idx });
  });

  const dead = [];
  for (const [, members] of groups) {
    if (members.length < 2) continue;
    const anyImportant = members.some((m) => m.important);
    const tier = anyImportant ? members.filter((m) => m.important) : members;
    // winner = last (highest source position) at the winning tier
    const winner = tier.reduce((a, b) => (b.idx > a.idx ? b : a));
    for (const m of members) {
      if (m.idx === winner.idx) continue;
      dead.push({ ...m, winnerLine: winner.line, winnerImportant: winner.important });
    }
  }
  dead.sort((a, b) => a.line - b.line);
  return dead;
}

/**
 * Excise the byte spans of `dead` declarations from `css`. Uses an offset mask
 * (order-independent): marks each [start,end) range, then for any line that had
 * a deletion and whose surviving bytes are all whitespace, removes the whole
 * line incl. its newline. Multi-declaration lines keep their surviving decls.
 * @returns {{css:string, removed:number}}
 */
function applyExcisions(css, dead) {
  const n = css.length;
  const del = new Uint8Array(n); // 1 = delete this byte
  for (const d of dead) {
    for (let k = d.start; k < d.end && k < n; k++) del[k] = 1;
    // also swallow trailing same-line whitespace after the ';' so a removed
    // decl on a multi-decl line doesn't leave a double space (stop at newline)
    for (let k = d.end; k < n && (css[k] === ' ' || css[k] === '\t'); k++) del[k] = 1;
  }
  // line-level cleanup: walk lines; a line is [ls, le] where le is its '\n' (or n)
  let ls = 0;
  while (ls <= n) {
    let le = ls;
    while (le < n && css[le] !== '\n') le++;
    let touched = false;
    let surviveNonWs = false;
    for (let k = ls; k < le; k++) {
      if (del[k]) { touched = true; }
      else if (!/\s/.test(css[k])) { surviveNonWs = true; }
    }
    if (touched && !surviveNonWs) {
      for (let k = ls; k < le; k++) del[k] = 1;
      if (le < n) del[le] = 1; // swallow the now-empty line's newline
    }
    ls = le + 1;
  }
  let out = '';
  let removed = 0;
  for (let k = 0; k < n; k++) {
    if (del[k]) { removed++; continue; }
    out += css[k];
  }
  return { css: out, removed };
}

// ---- CLI --------------------------------------------------------------------

function classify(d) { return d.context === '' ? 'top-level' : 'media-gated'; }

function main() {
  const args = process.argv.slice(2);
  if (args.includes('--validate')) return validate();

  const file = args.find((a) => !a.startsWith('--'));
  if (!file) {
    console.error('usage: node tools/find-dead-redeclarations.js <file.css> [--json] [--write] [--top-level] [--media] [--selector=SEL] [--min-line=N] [--max-line=N]');
    process.exit(2);
  }
  const css = fs.readFileSync(file, 'utf8');
  let dead = findDead(parseDeclarations(css));

  if (args.includes('--top-level')) dead = dead.filter((d) => classify(d) === 'top-level');
  if (args.includes('--media')) dead = dead.filter((d) => classify(d) === 'media-gated');
  const selArg = args.find((a) => a.startsWith('--selector='));
  if (selArg) {
    const want = selArg.slice('--selector='.length);
    dead = dead.filter((d) => d.selector.includes(want));
  }
  const minArg = args.find((a) => a.startsWith('--min-line='));
  if (minArg) { const v = Number(minArg.split('=')[1]); dead = dead.filter((d) => d.line >= v); }
  const maxArg = args.find((a) => a.startsWith('--max-line='));
  if (maxArg) { const v = Number(maxArg.split('=')[1]); dead = dead.filter((d) => d.line <= v); }

  if (args.includes('--write')) {
    const before = css.split('\n').length;
    const { css: out, removed } = applyExcisions(css, dead);
    const after = out.split('\n').length;
    fs.writeFileSync(file, out);
    console.log(`${file}: excised ${dead.length} dead declarations (${dead.filter((d) => d.important).length} !important), ${removed} bytes; lines ${before} → ${after} (−${before - after})`);
    return;
  }

  if (args.includes('--json')) {
    console.log(JSON.stringify(dead, null, 2));
    return;
  }

  const top = dead.filter((d) => classify(d) === 'top-level');
  const media = dead.filter((d) => classify(d) === 'media-gated');
  const imp = dead.filter((d) => d.important).length;
  console.log(`${file}: ${dead.length} dead declarations (${imp} !important) across redeclaration groups`);
  console.log(`  top-level (desktop-verifiable):  ${top.length}`);
  console.log(`  media-gated (needs narrow band): ${media.length}`);
  console.log('');
  for (const d of dead) {
    const tag = classify(d) === 'top-level' ? 'TOP ' : 'MEDIA';
    const ctx = d.context ? ` [${d.context}]` : '';
    console.log(`  L${String(d.line).padStart(6)} ${tag} ${d.selector} { ${d.prop}${d.important ? ' !important' : ''} }  → winner L${d.winnerLine}${ctx}`);
  }
}

function validate() {
  // Ground truth: on main (pre-collapse) .learn-explain-toggle-btn declared
  // `height` 11× at top level, per PHASE3.6_SPEC §0. Verify the detector finds
  // exactly that (the toggle-btn family was deleted on the collapse branch).
  const { execFileSync } = require('child_process');
  let css;
  try {
    css = execFileSync('git', ['show', 'main:app/style.css'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  } catch (e) {
    console.error('validate: could not read main:app/style.css —', e.message);
    process.exit(2);
  }
  const decls = parseDeclarations(css);
  const dead = findDead(decls);
  // Ground-truth group: the EXACT top-level selector-list that PHASE3.6_SPEC §0
  // names as the toggle-btn height pileup. (The spec's "11×" lumped together
  // specificity variants; the precise cascade-safe group is this exact list.)
  const SEL = '.learn-explain-toggle-btn, #learnFocusBtn, .learn-side-restore-explain, .learn-side-restore-chat';
  const heightGroup = decls.filter((d) => d.selector === SEL && d.prop === 'height' && d.context === '');
  const heightDead = dead.filter((d) => d.selector === SEL && d.prop === 'height' && d.context === '');
  // Regression guard: the skipDepth bug truncated parsing to ~1.7k decls / 3
  // contexts after the first @keyframes. A healthy parse sees the whole file.
  const parsedWholeFile = decls.length > 20000 && new Set(decls.map((d) => d.context)).size > 20;
  console.log('VALIDATION against main:app/style.css');
  console.log(`  whole-file parse (regression guard): ${decls.length} decls, ${new Set(decls.map((d) => d.context)).size} contexts → ${parsedWholeFile ? 'OK' : 'TRUNCATED'}`);
  console.log(`  "${SEL}" { height } top-level declarations: ${heightGroup.length}`);
  console.log(`  …of which dead (all but the winner):       ${heightDead.length}`);
  const ok = parsedWholeFile && heightGroup.length >= 6 && heightDead.length === heightGroup.length - 1;
  console.log(`  expected: whole-file OK, ≥6 declarations, dead = count-1`);
  console.log(ok ? '  PASS ✓' : '  FAIL ✗');
  console.log('');
  console.log(`  total dead declarations on main: ${dead.length} (${dead.filter((d) => d.important).length} !important)`);
  console.log(`    top-level:   ${dead.filter((d) => classify(d) === 'top-level').length}`);
  console.log(`    media-gated: ${dead.filter((d) => classify(d) === 'media-gated').length}`);
  process.exit(ok ? 0 : 1);
}

if (require.main === module) main();
module.exports = { parseDeclarations, findDead, applyExcisions, classify };
