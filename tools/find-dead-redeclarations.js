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
  // or a declaration before `;`/`}`) for prop:value PARSING only. Byte OFFSETS
  // are tracked separately via declFirst/declLast — the offset of the first and
  // last non-whitespace CONTENT byte since the last flush. This decoupling is
  // essential: comments are elided from `buf`, so buf-relative arithmetic would
  // drift into a preceding comment (deleting its closing */). declFirst/declLast
  // index the real source, skipping leading/trailing whitespace AND comments.
  let buf = '';
  let declFirst = -1; // source offset of first content byte of current chunk
  let declLast = -1;  // source offset of last content byte (inclusive)
  const markContent = (from, to) => { if (declFirst < 0) declFirst = from; declLast = to; };
  const pushChar = (ch, off) => { buf += ch; if (!/\s/.test(ch)) markContent(off, off); };

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
      const strEnd = Math.min(j + 1, n);
      const str = css.slice(i, strEnd);
      buf += str;
      markContent(i, strEnd - 1);
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
      buf += paren;
      markContent(i, j - 1);
      i = j;
      continue;
    }

    // --- block open ---
    if (ch === '{') {
      const prelude = norm(buf);
      buf = '';
      declFirst = -1; declLast = -1;
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
    const declStart = declFirst;
    const contentEnd = declLast; // last content byte (inclusive)
    buf = '';
    declFirst = -1; declLast = -1;
    if (skipDepth !== -1) return; // inside opaque at-rule
    const text = raw.trim();
    if (!text || declStart < 0) return;
    const sel = selStack[selStack.length - 1];
    if (sel === null || sel === '__AT__' || sel === undefined) return; // not inside a style rule
    const colon = text.indexOf(':');
    if (colon === -1) return; // not a declaration (e.g. stray token)
    const propRaw = text.slice(0, colon).trim();
    // regular property names are ASCII case-insensitive; CSS CUSTOM properties
    // (--x) are case-SENSITIVE — do not fold their case or --Gap and --gap merge.
    const prop = propRaw.startsWith('--') ? propRaw : propRaw.toLowerCase();
    if (!prop) return;
    const value = text.slice(colon + 1).trim();
    // strip string literals before the !important test so a string value like
    // content:"!important" cannot be mistaken for a real !important declaration.
    const valForImp = value.replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, '');
    const important = /!\s*important\b/i.test(valForImp);
    // group by the full nesting path of style-rule selectors (length 1 for flat
    // CSS — unchanged behavior; >1 only under native nesting, where keeping the
    // parent chain prevents two same-named child rules under DIFFERENT parents
    // from colliding into one group → never over-deletes across nesting).
    const selector = selStack.filter((s) => s && s !== '__AT__').map(norm).join(' >> ');
    // exact byte span of the declaration, for surgical excision. declStart and
    // contentEnd index the real source (skipping leading/trailing ws AND any
    // elided comments), so the span never bleeds into a neighbouring comment.
    //   spanEnd = just after the terminating ';' (or just after the last
    //   content byte when the block-closing '}' ends the declaration).
    const spanEnd = isSemicolon ? termOffset + 1 : contentEnd + 1;
    decls.push({
      context: ctxStack.join(' || '),
      selector,
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
      dead.push({ ...m, winnerLine: winner.line });
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

// ---- empty style-rule removal ----------------------------------------------

/**
 * Find STYLE-rule blocks (not @media/@supports/@container/@keyframes/@font-face)
 * whose body holds zero declarations and zero nested rules — i.e. `sel { }` with
 * only whitespace inside. Such rules render nothing, so removing the whole
 * `sel { }` span (selector through close brace) is unconditionally safe. The
 * collapse leaves these husks behind when every declaration of a block was a
 * dead loser. Comment-only bodies are NOT removed (a comment may be a note).
 * @returns {Array<{start:number, end:number, selector:string}>}
 */
function findEmptyStyleRules(css) {
  const n = css.length;
  const out = [];
  const stack = []; // { kind:'style'|'at', preludeStart, hasContent }
  let i = 0;
  let preludeStart = -1; // first content byte of the pending prelude
  let skipDepth = -1;

  const markPrelude = (off) => { if (preludeStart < 0) preludeStart = off; };
  const markParentContent = () => { if (stack.length && skipDepth === -1) stack[stack.length - 1].hasContent = true; };

  while (i < n) {
    const ch = css[i];
    if (ch === '/' && css[i + 1] === '*') {
      // a comment inside a block counts as content → preserve comment-only
      // husks (don't delete dev notes); it does NOT set preludeStart, so the
      // removal span still starts at the selector, leaving a leading comment.
      markParentContent();
      const e = css.indexOf('*/', i + 2); i = e === -1 ? n : e + 2; continue;
    }
    if (ch === '"' || ch === "'") {
      const q = ch; let j = i + 1;
      while (j < n) { if (css[j] === '\\') { j += 2; continue; } if (css[j] === q) break; j++; }
      markPrelude(i); markParentContent();
      i = j + 1; continue;
    }
    if (ch === '(') {
      let depth = 0, j = i;
      while (j < n) {
        const c = css[j];
        if (c === '/' && css[j + 1] === '*') { const e = css.indexOf('*/', j + 2); j = e === -1 ? n : e + 2; continue; }
        if (c === '"' || c === "'") { const q = c; let k = j + 1; while (k < n) { if (css[k] === '\\') { k += 2; continue; } if (css[k] === q) break; k++; } j = k + 1; continue; }
        if (c === '(') depth++;
        else if (c === ')') { depth--; if (depth === 0) { j++; break; } }
        j++;
      }
      markPrelude(i); markParentContent();
      i = j; continue;
    }
    if (ch === '{') {
      const prelude = css.slice(preludeStart < 0 ? i : preludeStart, i).replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
      const pStart = preludeStart < 0 ? i : preludeStart;
      preludeStart = -1;
      if (skipDepth !== -1) { stack.push({ kind: 'skip' }); i++; continue; }
      markParentContent(); // this nested block is content for its parent
      if (prelude.startsWith('@')) {
        const at = prelude.slice(1).split(/[\s(]/, 1)[0].toLowerCase();
        if (at === 'media' || at === 'supports' || at === 'container') stack.push({ kind: 'at', preludeStart: pStart, braceStart: i, hasContent: false });
        else { skipDepth = stack.length; stack.push({ kind: 'skip' }); }
      } else {
        stack.push({ kind: 'style', preludeStart: pStart, braceStart: i, hasContent: false });
      }
      i++; continue;
    }
    if (ch === '}') {
      // reset preludeStart FIRST: after a block closes, the next prelude starts
      // fresh. Without this, a block whose last decl lacks a trailing ';' leaves
      // preludeStart pointing INTO it, so a following husk's span starts mid-prior
      // block and applyExcisions corrupts the file. (Mirror of the flushDecl fix.)
      preludeStart = -1;
      const blk = stack.pop();
      if (blk && blk.kind === 'style' && !blk.hasContent) {
        // selector slice ends at the '{' (braceStart), not the '}', so it never leaks a brace
        out.push({ start: blk.preludeStart, end: i + 1, selector: css.slice(blk.preludeStart, blk.braceStart).replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim() });
      }
      if (skipDepth !== -1 && stack.length <= skipDepth) skipDepth = -1;
      i++; continue;
    }
    if (ch === ';') { markPrelude(i); markParentContent(); preludeStart = -1; i++; continue; }
    if (!/\s/.test(ch)) { markPrelude(i); markParentContent(); }
    i++;
  }
  return out;
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

  // --empty-rules: remove `sel { }` husks (whitespace/comment-only style rules).
  if (args.includes('--empty-rules')) {
    const empties = findEmptyStyleRules(css);
    if (args.includes('--write')) {
      const before = css.split('\n').length;
      // reuse the excision masker (start/end spans); line-swallow tidies up
      const { css: out, removed } = applyExcisions(css, empties);
      const after = out.split('\n').length;
      fs.writeFileSync(file, out);
      console.log(`${file}: removed ${empties.length} empty style rules, ${removed} bytes; lines ${before} → ${after} (−${before - after})`);
    } else if (args.includes('--json')) {
      console.log(JSON.stringify(empties, null, 2));
    } else {
      console.log(`${file}: ${empties.length} empty style-rule husks`);
      for (const e of empties) console.log(`  L${String(css.slice(0, e.start).split('\n').length).padStart(6)}  ${e.selector.slice(0, 90)}`);
    }
    return;
  }

  let dead = findDead(parseDeclarations(css));

  if (args.includes('--top-level')) dead = dead.filter((d) => classify(d) === 'top-level');
  if (args.includes('--media')) dead = dead.filter((d) => classify(d) === 'media-gated');
  const selArg = args.find((a) => a.startsWith('--selector='));
  if (selArg) {
    const want = selArg.slice('--selector='.length);
    dead = dead.filter((d) => d.selector.includes(want));
  }
  const lineBound = (flag) => {
    const a = args.find((x) => x.startsWith(flag + '='));
    if (!a) return null;
    const v = Number(a.split('=')[1]);
    if (!Number.isInteger(v) || v < 1) {
      console.error(`${flag} must be a positive integer (got "${a.split('=')[1]}") — refusing to silently filter to zero`);
      process.exit(2);
    }
    return v;
  };
  const minV = lineBound('--min-line');
  if (minV !== null) dead = dead.filter((d) => d.line >= minV);
  const maxV = lineBound('--max-line');
  if (maxV !== null) dead = dead.filter((d) => d.line <= maxV);

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
  // SELF-CONTAINED self-test over synthetic fixtures — no dependency on the
  // evolving content of any real file (the earlier version anchored to a
  // toggle-btn pileup on `main` that THIS tool's collapse deletes, so it would
  // have gone permanently red post-merge). Each case asserts the full
  // detect→collapse round-trip, including the exact bug classes found in review.
  const collapse = (css) => applyExcisions(css, findDead(parseDeclarations(css))).css;
  const stripEmpty = (css) => applyExcisions(css, findEmptyStyleRules(css)).css;
  let pass = 0;
  let fail = 0;
  const eq = (name, got, want) => {
    if (got === want) { pass++; return; }
    fail++;
    console.log(`  FAIL ${name}\n    got : ${JSON.stringify(got)}\n    want: ${JSON.stringify(want)}`);
  };

  // --- redeclaration collapse ---
  eq('simple pileup', collapse('.x {\n  color: red;\n  color: blue;\n}\n'), '.x {\n  color: blue;\n}\n');
  eq('!important beats later normal', collapse('.x {\n  color: red !important;\n  color: blue;\n}\n'), '.x {\n  color: red !important;\n}\n');
  eq('last !important wins', collapse('.x {\n  color: red !important;\n  color: green !important;\n}\n'), '.x {\n  color: green !important;\n}\n');
  eq('different selectors kept', collapse('.x { color: red; }\n#y { color: blue; }\n'), '.x { color: red; }\n#y { color: blue; }\n');
  eq('content:"}" string safe', collapse('.x {\n  content: "}";\n  color: red;\n  color: blue;\n}\n'), '.x {\n  content: "}";\n  color: blue;\n}\n');
  eq('data-uri safe', collapse('.x {\n  background: url(data:image/svg+xml;utf8,<svg></svg>);\n  color: red;\n  color: blue;\n}\n'), '.x {\n  background: url(data:image/svg+xml;utf8,<svg></svg>);\n  color: blue;\n}\n');
  eq('@keyframes opaque', collapse('@keyframes a { 0% { opacity: 0; } 100% { opacity: 1; } }\n.x { color: red; color: blue; }\n'), '@keyframes a { 0% { opacity: 0; } 100% { opacity: 1; } }\n.x { color: blue; }\n');
  eq('media context isolates', collapse('.x { color: red; }\n@media (max-width: 600px) { .x { color: blue; } }\n'), '.x { color: red; }\n@media (max-width: 600px) { .x { color: blue; } }\n');
  eq('media internal pileup', collapse('@media (max-width: 600px) {\n  .x { color: red; color: blue; }\n}\n'), '@media (max-width: 600px) {\n  .x { color: blue; }\n}\n');
  eq('comment before dead decl preserved', collapse('.x {\n  --a: 1;\n  /* C */\n  --b: 2;\n  --b: 3;\n}\n'), '.x {\n  --a: 1;\n  /* C */\n  --b: 3;\n}\n');
  // review fix: !important inside a STRING value must not be read as important
  eq('string !important not real', collapse('.x {\n  content: "!important";\n  content: "real";\n}\n'), '.x {\n  content: "real";\n}\n');
  // review fix: custom-property names are CASE-SENSITIVE (--Gap != --gap)
  eq('custom-prop case sensitive', collapse(':root {\n  --Gap: 10px;\n  --gap: 20px;\n}\n'), ':root {\n  --Gap: 10px;\n  --gap: 20px;\n}\n');
  // review fix: native nesting must not collide same child under different parents
  eq('nesting no cross-parent collide', collapse('.a { & .c { color: red; } }\n.b { & .c { color: green; } }\n'), '.a { & .c { color: red; } }\n.b { & .c { color: green; } }\n');

  // --- empty-rule husks ---
  eq('empty husk removed', stripEmpty('.x { }\n.y { color: red; }\n'), '.y { color: red; }\n');
  eq('comment-only husk kept', stripEmpty('.x { /* note */ }\n'), '.x { /* note */ }\n');
  eq('empty @media kept', stripEmpty('@media (max-width: 600px) { }\n'), '@media (max-width: 600px) { }\n');
  // review fix: a husk after a semicolon-less block must not corrupt that block
  eq('husk after semicolon-less block', stripEmpty('.a { color: red }\n.b { }\n.c { color: blue }\n'), '.a { color: red }\n.c { color: blue }\n');

  console.log(`VALIDATION (self-contained): ${pass} passed, ${fail} failed`);
  console.log(fail === 0 ? '  PASS ✓' : '  FAIL ✗');
  process.exit(fail === 0 ? 0 : 1);
}

if (require.main === module) main();
module.exports = { parseDeclarations, findDead, applyExcisions, classify, findEmptyStyleRules };
