#!/usr/bin/env node
'use strict';
/**
 * Self-test for window.* symbols that tools/visual-diff.js relies on at
 * runtime. Greps each owning source file for `window.<symbol> =` assignment
 * — if any is missing, fail with the failing PR-class hint instead of
 * waiting for a `node tools/visual-diff.js --check` run to surface it.
 *
 * Per docs/phase3_deferred.md §7c. Add new exports here as they appear.
 *
 * Exit codes: 0 = all present, 1 = at least one missing.
 */
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');

// Each row: { symbol, file, consumer }. `file` is grepped for an
// `window.<symbol> =` assignment; `consumer` is the call-site that breaks
// when the symbol disappears (printed in the failure message so the human
// knows which feature regresses).
const REQUIRED = [
    { symbol: 'parseBase64JsonAttr',       file: 'app/app.js',
      consumer: 'tools/visual-diff.js — PAGE_C demo hydration check' },
    { symbol: 'inferInteractiveDemoFamily', file: 'app/interactive-demos/dispatcher.js',
      consumer: 'tools/visual-diff.js — PAGE_C lesson-family inference' },
    { symbol: '__ftutorRefreshPager',      file: 'app/ui-friction-fixes.js',
      consumer: 'tools/test-utils.js resetLessonChromeState — pager-state observer rewake' },
];

let exitCode = 0;
for (const { symbol, file, consumer } of REQUIRED) {
    const abs = path.join(REPO, file);
    if (!fs.existsSync(abs)) {
        console.error(`[harness-exports] FAIL ${symbol}: source file ${file} not found`);
        exitCode = 1;
        continue;
    }
    const src = fs.readFileSync(abs, 'utf8');
    // Match `window.<symbol> =` with optional whitespace; permissive enough
    // to catch `window['<symbol>']` if someone ever switches notation.
    const re = new RegExp(`window\\.${symbol}\\s*=|window\\[['"]${symbol}['"]\\]\\s*=`);
    if (!re.test(src)) {
        console.error(`[harness-exports] FAIL window.${symbol} missing from ${file}`);
        console.error(`                  consumer: ${consumer}`);
        exitCode = 1;
    }
}

if (exitCode === 0) {
    console.log(`[harness-exports] OK — ${REQUIRED.length} required window.* exports present`);
}
process.exit(exitCode);
