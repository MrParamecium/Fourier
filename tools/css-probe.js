#!/usr/bin/env node
/**
 * Computed-style probe harness for the Phase 3.6 CSS structural collapse
 * (`!important` wall + doubled-ID `#X#X` pattern). See docs/PHASE3.6_SPEC.md §4.
 *
 * WHY THIS EXISTS (and why visual-diff.js is not enough):
 *   The 36-view pixel-diff harness has two documented blindspots for this work:
 *     1. Off-screen / clipped chrome — `page.screenshot({fullPage:false})` clips
 *        to 1280×800; the §3a.i regression (PR #71) painted OUTSIDE the captured
 *        region and passed at 0/1024000 px through two `--check` runs.
 *     2. Sub-threshold property swaps — a cascade flip (e.g. min-height 152→112,
 *        radial-gradient→flat) can dirty fewer pixels than even the 0.05% strict
 *        threshold when the element is clipped or the delta is alpha-on-glass.
 *   This harness reads literal getComputedStyle values and asserts BYTE-IDENTICAL
 *   before/after a refactor. It generalizes the per-view computed-style asserts
 *   already in visual-diff.js (views 12b-e/14d-f).
 *
 * PROBE THE CASCADE WINNER, NOT THE LAYOUT (review of PR #101):
 *   Probes pin LITERAL cascade values (min-height 152px, border-radius 28px, the
 *   glass-token inside background-image) — NOT layout-derived USED values
 *   (`width: 426px`, `grid-template-columns: 48px 258px 52px`). Used values are
 *   recomputed from viewport / scrollbar gutter / font metrics, so they drift
 *   across machines + Chromium versions (false FAIL) while telling you nothing
 *   about which rule won (a 12-ID `calc(100%-36px)` and an 8-ID `min(820px,…)`
 *   resolve to the SAME px below 820px). Literal cascade values are deterministic
 *   and discriminate the winner.
 *
 * FAIL CLOSED (review of PR #101):
 *   A verification harness must treat ABSENCE OF SIGNAL as failure, never a
 *   silent pass: `--baseline` refuses to write if any probe is `__MISSING__`
 *   (element absent → mis-specified probe); `--check` fails on a `__MISSING__`/
 *   `__ABSENT__` baseline value, a vanished element, a non-array (corrupt)
 *   baseline state, a current-only probe with no baseline entry, or a duplicate
 *   probe key. Each `enter()` asserts a SENTINEL computed value proving the
 *   gated doubled-ID rule actually wins before any probe is trusted (R8).
 *
 * Usage:
 *   node tools/css-probe.js --baseline   # snapshot resolved styles → css-probe-baseline.json
 *   node tools/css-probe.js --check      # capture current + diff vs baseline (byte-identical)
 *
 * Exit 0 only if every probed value matches the baseline byte-for-byte (or on a
 * clean --baseline). Exit 1 on any diff, any fail-closed condition, or harness failure.
 *
 * Report: tools/css-probe-report.md (only written by --check).
 *
 * NOT wired into `npm run check` for execution — it spawns the bridge + Chromium
 * (~30s). Run manually as a pre-merge gate alongside visual-diff (property-identity
 * + spatial-identity are complementary).
 *
 * KNOWN follow-up (deferred D1, docs/phase3_deferred.md §13): the bridge-spawn /
 * signal-teardown / MASK addInitScript / markdown-report blocks are near-duplicates
 * of visual-diff.js. A shared hoist into test-utils.js is its own PR (center of
 * gravity is the stable visual-diff.js; needs a visual-diff regression run).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { chromium } = require('playwright');
const {
    MASK_CSS,
    waitForHealth,
    enterGuestMode,
    openSubtopic,
    resetLessonChromeState,
    settleLesson,
    assertOrThrow,
} = require('./test-utils.js');

// Separate port from visual-diff.js (:9125) so the two harnesses can run
// back-to-back (or concurrently) without an EADDRINUSE clash on the bridge.
const PORT = Number(process.env.TUTOR_CSSPROBE_PORT || 9126);
const BASE = `http://127.0.0.1:${PORT}`;
const VIEWPORT = { width: 1280, height: 800 };

const TOOLS = __dirname;
const BASELINE_PATH = path.join(TOOLS, 'css-probe-baseline.json');
const REPORT_PATH = path.join(TOOLS, 'css-probe-report.md');

const MODE = process.argv.includes('--baseline') ? 'baseline'
           : process.argv.includes('--check') ? 'check'
           : null;
if (!MODE) {
    console.error('usage: css-probe.js --baseline | --check');
    process.exit(2);
}

const SUBTOPIC = { id: '1_1-1', title: '1.1-1 Signal Energy',
    chapter: 'Chapter 1: Signals and Systems',
    section: '1.1 Size of a Signal' };

// ---------- probe states ----------
// Each state: { state, enter(page), probes: [[selector, pseudo|null, property], ...] }.
// enter() MUST assert a SENTINEL computed value proving the gated doubled-ID rule
// is the live cascade winner (R8, docs/PHASE3.6_SPEC.md §4.1) before snapshot —
// otherwise the probe reads an inactive rule and proves nothing. All states run on
// one Page-A lesson page (§1.1-1) opened once; resetLearnChrome() clears prior state.

// Drop learn-view panel state + the textbook modal to a known floor between states.
async function resetLearnChrome(page) {
    await resetLessonChromeState(page);
    await page.evaluate(() => {
        document.getElementById('textbookFocusModal')?.classList.add('hidden');
        document.body.classList.remove('textbook-focus-active');
    });
}

// Sentinel for the §3d composer chain: the 12-ID L41334 rule sets min-height 152px
// and wins unconditionally over the 8-ID runtime-collapsed.css rule's 112px. If this
// does not hold, the probe state is wrong and the baseline must not be trusted.
async function assertFollowupBarWinner(page, label) {
    const mh = await page.evaluate(() => {
        const el = document.getElementById('learnFollowupBar');
        return el ? getComputedStyle(el).minHeight : null;
    });
    assertOrThrow(mh === '152px',
        `${label}: #learnFollowupBar min-height is "${mh}", expected "152px" (the 12-ID §3d winner). State invalid — probe would not exercise the cascade war.`);
}

const FOLLOWUP_PROBES = [
    ['#learnChatCol', null, 'background-image'],   // §3d war: flat var vs radial (L33191 dead / L37417 wins)
    ['#learnFollowupBar', null, 'min-height'],      // 152 (12-ID) vs 112 (8-ID) — discriminating literal
    ['#learnFollowupBar', null, 'border-top-left-radius'], // 28 vs 18
    ['#learnFollowupBar', null, 'background-image'], // pink glass vs white glass
    ['#learnFollowupBar', null, 'box-shadow'],
    ['#learnFollowupBar', null, 'backdrop-filter'], // blur(36) vs blur(34)
    ['#learnFollowupBar', null, 'z-index'],         // 40 (L33213 8-ID) vs runtime 3
    ['#learnFollowupBar', null, 'overflow'],        // visible (L33213)
];

// ---------- viewport-banded learn-chrome states (docs/phase3_deferred.md §14 prerequisite 1) ----------
// The `!important` / doubled-ID wall's single largest remaining lever is the redeclaration pileup
// inside width @media queries; the desktop-only (1280) probe + visual-diff harnesses are blind to
// it — exactly the narrow-viewport blindspot spec §4 warns about. These states render §1.1-1's
// always-present learn-chrome (#learnExplainToolbar + the inherited --learn-edge-tab-top custom
// property) across five viewport widths and pin only LITERAL cascade values — never layout-derived
// used values (toolbar-center's clamp() gap interpolates 17.92→16.24→12.46px with the viewport and
// would false-FAIL across machines; deliberately NOT probed, per the header doc).
//
// Each band transition is BRACKETED — a state just above and just below it both capture the shared
// probe set — so a deletion is caught from the narrow side AND a media-query hoist that changes the
// desktop value is caught from the wide side (N0). The single discriminator per transition
// (empirically verified 2026-06-25; every probed value is byte-stable across two independent runs):
//   N0 @1280 → N1 @1160 (≤1180): toolbar grid-template-areas none → "left right"/"center center";
//                                toolbar-center flex-wrap nowrap → wrap.
//   N1 @1160 → N2 @890  (≤900):  toolbar flex-wrap nowrap → wrap.
//   N2 @890  → N3 @740  (≤820):  --learn-edge-tab-top 22px → 14px.
//   N3 @740  → N4 @700  (≤720):  toolbar grid-template-areas → fully-stacked "center"/"left"/"right".
// flex-wrap on #learnExplainToolbar is INERT (the toolbar resolves to display:grid) — it is probed
// as a cascade WITNESS that the ≤900 rule wins, not for a layout effect. Cells that repeat across
// adjacent states (e.g. toolbar-center flex-wrap is "wrap" at every ≤1180 width) are intentional:
// they pin the persists-down winner, so deleting its single source rule flips every state below it.
//
// NOT covered (elements absent from a §1.1-1 lesson DOM — recorded as a follow-up gap in §14):
//   chapter-overview book-spread (≤1120/≤760), lecture-overlay nav buttons (≤1320/≤900),
//   collapsed-panel edge tabs (≤900), and runtime-collapsed.css @container lecture-panel bands
//   (keyed off the explain-panel's own width, not the viewport).

// Assert a band's literal value is the live cascade winner BEFORE trusting any probe (R8 /
// FAIL-CLOSED) — proves the rule actually applies at this viewport, not merely that
// setViewportSize was called. Reads RAW (no trim) so the sentinel and the probe (snapshotState,
// also raw) agree byte-for-byte on what "the value" is, rather than the sentinel masking a
// whitespace divergence the probe would surface.
async function assertNarrowBand(page, label, sel, prop, expected) {
    const got = await page.evaluate(({ sel, prop }) => {
        const el = document.querySelector(sel);
        return el ? getComputedStyle(el).getPropertyValue(prop) : '__MISSING__';
    }, { sel, prop });
    assertOrThrow(got === expected,
        `${label}: ${sel} { ${prop} } resolved "${got}", expected "${expected}" — the band rule is not the live cascade winner at this viewport; baseline invalid.`);
}

// One shared probe list captured at every banded width, so each transition is pinned from both
// sides. flex-wrap on the toolbar is inert-on-grid (above) — a cascade witness, not layout.
const NARROW_PROBES = [
    ['.learn-explain-toolbar', null, 'grid-template-areas'], // none (≥1181) / 2-row (≤1180) / 3-row stack (≤720)
    ['.learn-explain-toolbar', null, 'flex-wrap'],           // nowrap (≥901) → wrap (≤900); witness of the ≤900 rule
    ['.learn-toolbar-center', null, 'flex-wrap'],            // nowrap (≥1181) → wrap (≤1180)
    ['.learn-body', null, '--learn-edge-tab-top'],           // 22px (≥821) → 14px (≤820)
];

// Factory for a banded state: apply the per-state viewport (snapshotState reads .viewport), floor
// the chrome to the natural (non-collapsed) lesson — explicitly clear explain-collapsed so the
// higher-specificity `.explain-collapsed:not(.chat-collapsed)` edge-tab rule (0,3,0) cannot leak
// in from a prior state and mask the ≤820 band (0,1,0) — then sentinel-assert the band winner.
function bandState(id, width, sentinel) {
    return {
        state: id,
        viewport: { width, height: 800 },
        enter: async (page) => {
            await resetLearnChrome(page); // dispatches resize at the already-applied viewport
            await page.evaluate(() => document.getElementById('learnBody')?.classList.remove('explain-collapsed'));
            await assertNarrowBand(page, id, sentinel.sel, sentinel.prop, sentinel.expected);
        },
        probes: NARROW_PROBES,
    };
}

const PROBE_STATES = [
    {
        // S2 — data-panel-focus="qa-wide" (mirrors visual-diff view 08). Baselines
        // the §3d composer-chain war (Surface 6, deferred): #learnChatCol bg +
        // #learnFollowupBar 12-ID vs runtime-collapsed.css 8-ID geometry. NOT edited
        // tonight — captured now so future Surface-6 work diffs against pre-collapse truth.
        state: 'S2-qa-wide',
        enter: async (page) => {
            await resetLearnChrome(page);
            await page.evaluate(() => {
                const shell = document.getElementById('learnBody');
                if (shell) shell.dataset.panelFocus = 'qa-wide';
                window.dispatchEvent(new Event('resize'));
            });
            await page.waitForTimeout(400);
            const ok = await page.evaluate(() =>
                document.getElementById('learnBody')?.dataset.panelFocus === 'qa-wide'
                && !!document.getElementById('learnFollowupBar'));
            assertOrThrow(ok, 'S2-qa-wide: panelFocus not applied or #learnFollowupBar missing');
            await assertFollowupBarWinner(page, 'S2-qa-wide');
        },
        probes: FOLLOWUP_PROBES,
    },
    {
        // S3 — data-panel-focus="qa-full" (mirrors visual-diff view 09). Same §3d
        // war coverage as S2 in the largest-chat state.
        state: 'S3-qa-full',
        enter: async (page) => {
            await resetLearnChrome(page);
            await page.evaluate(() => {
                const shell = document.getElementById('learnBody');
                if (shell) shell.dataset.panelFocus = 'qa-full';
                window.dispatchEvent(new Event('resize'));
            });
            await page.waitForTimeout(400);
            const ok = await page.evaluate(() =>
                document.getElementById('learnBody')?.dataset.panelFocus === 'qa-full'
                && !!document.getElementById('learnFollowupBar'));
            assertOrThrow(ok, 'S3-qa-full: panelFocus not applied or #learnFollowupBar missing');
            await assertFollowupBarWinner(page, 'S3-qa-full');
        },
        probes: FOLLOWUP_PROBES,
    },
    {
        // S12 — textbook-focus modal, Q&A panel un-hidden, empty-state node rendered.
        // THE PILOT GATE: pins the resolved values of every selector the textbook
        // de-double rewrites (docs/PHASE3.6_SPEC.md §3 Pilot 0). The page-indicator
        // background-image is load-bearing — it must stay the GLASS radial-gradient
        // (carries the `253, 224, 71` token), not the paper-tag `#fff8dd` gradient
        // from the L23441 single-ID !important rule; a Step-2 over-flatten to a bare
        // ID would surface the paper-tag value here. The sentinel asserts the glass
        // rule wins BEFORE any probe is trusted.
        state: 'S12-textbook-qa-open',
        enter: async (page) => {
            await resetLearnChrome(page);
            await page.evaluate(() => {
                const modal = document.getElementById('textbookFocusModal');
                const content = document.getElementById('textbookFocusContent');
                const indicator = document.getElementById('textbookFocusPageIndicator');
                const panel = document.getElementById('textbookFocusQaPanel');
                const scroll = document.getElementById('textbookFocusQaScroll');
                if (!modal) return;
                document.body.classList.add('textbook-focus-active');
                modal.classList.remove('hidden');
                // Un-hide the Q&A panel so its de-doubled internals are live.
                panel?.classList.remove('hidden');
                // Render the empty-state node so `.textbook-focus-qa-empty` (L41810,
                // a de-double target) is actually in the DOM. It is otherwise only
                // emitted by app.js:3052 on the live Q&A render path. Matches that markup.
                if (scroll) scroll.innerHTML = '<div class="textbook-focus-qa-empty">No questions yet.</div>';
                const placeholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFBAJ/wlseKgAAAABJRU5ErkJggg==';
                if (content) {
                    content.innerHTML = `
                        <div class="textbook-focus-scroll">
                            <div class="textbook-focus-scroll-page">
                                <img class="textbook-focus-single-page" src="${placeholder}" alt="mock page">
                            </div>
                        </div>`;
                }
                if (indicator) indicator.textContent = '1 / 1';
            });
            await page.waitForTimeout(200);
            // Sentinel 1: modal + panel + empty node present.
            const present = await page.evaluate(() => {
                const modal = document.getElementById('textbookFocusModal');
                const panel = document.getElementById('textbookFocusQaPanel');
                return !!modal && !modal.classList.contains('hidden')
                    && !!panel && !panel.classList.contains('hidden')
                    && !!document.querySelector('.textbook-focus-qa-empty');
            });
            assertOrThrow(present, 'S12: modal hidden, QA panel missing/hidden, or .textbook-focus-qa-empty not rendered');
            // Sentinel 2: the GLASS LOCK rules win (not the paper-tag / base rules).
            const win = await page.evaluate(() => {
                const ind = document.getElementById('textbookFocusPageIndicator');
                const panel = document.getElementById('textbookFocusQaPanel');
                return {
                    indBg: ind ? getComputedStyle(ind).backgroundImage : '',
                    panelRadius: panel ? getComputedStyle(panel).borderTopLeftRadius : '',
                };
            });
            assertOrThrow(win.indBg.includes('253, 224, 71'),
                `S12: page-indicator background-image lacks the glass token "253, 224, 71" (got "${win.indBg}"). The doubled-ID GLASS LOCK rule is not winning — paper-tag rule may have taken over; baseline invalid.`);
            assertOrThrow(win.panelRadius === '24px',
                `S12: QA panel border-top-left-radius is "${win.panelRadius}", expected "24px" (the GLASS LOCK rule). Base class rule (16px) may be winning; baseline invalid.`);
        },
        probes: [
            ['#textbookFocusModal', null, 'background-image'],
            ['#textbookFocusDialog .learn-focus-headings', null, 'background-image'],
            ['#textbookFocusDialog .learn-focus-headings', null, 'backdrop-filter'],
            ['#textbookFocusQaPanel', null, 'border-top-left-radius'],   // 24 vs base 16 — discriminating
            ['#textbookFocusQaPanel', null, 'background-image'],
            ['#textbookFocusQaPanel', null, 'box-shadow'],
            ['#textbookFocusQaPanel', null, 'backdrop-filter'],
            ['#textbookFocusQaPanel', '::before', 'content'],            // "" -> '""' (discriminating)
            ['#textbookFocusQaPanel', '::before', 'opacity'],            // 0.72
            ['.textbook-focus-qa-head', null, 'background-image'],
            ['.textbook-focus-qa-head', null, 'border-bottom-color'],
            ['.textbook-focus-qa-close', null, 'background-image'],
            ['.textbook-focus-qa-empty', null, 'border-top-left-radius'], // 22 — now rendered
            ['.textbook-focus-qa-empty', null, 'background-image'],
            ['.textbook-focus-qa-compose', null, 'gap'],                  // 12px literal (NOT grid-template-columns used value)
            ['.textbook-focus-qa-compose', null, 'border-top-color'],
            ['.textbook-focus-qa-input', null, 'min-height'],            // 48px literal
            ['.textbook-focus-qa-input', null, 'border-top-left-radius'], // 18px
            ['.textbook-focus-qa-send', null, 'width'],                  // 48px FIXED literal (not auto/derived)
            ['.textbook-focus-qa-send', null, 'border-top-left-radius'], // 18px
            ['#textbookFocusQaToggle', null, 'width'],                   // 74px FIXED literal
            ['#textbookFocusQaToggle', null, 'background-image'],
            // The load-bearing page-indicator probes (Step-2 specificity guard).
            // Pseudo content/display dropped — they resolve `none` whether the
            // doubled-ID or single-ID rule wins (non-discriminating, review PR #101).
            ['#textbookFocusPageIndicator', null, 'background-image'],   // GLASS token vs paper-tag
            ['#textbookFocusPageIndicator', null, 'border-top-left-radius'], // 16px
            ['#textbookFocusPageIndicator', null, 'min-width'],          // 80px
        ],
    },
    // Viewport-banded learn-chrome (§14 prereq 1). N0 captures the desktop (pre-transition) side
    // so every band is bracketed; each sentinel asserts the band-entry literal at its own width.
    bandState('N0-desktop-1280', 1280,
        { sel: '.learn-explain-toolbar', prop: 'grid-template-areas', expected: 'none' }),
    bandState('N1-toolbar-1160', 1160,
        { sel: '.learn-explain-toolbar', prop: 'grid-template-areas', expected: '"left right" "center center"' }),
    bandState('N2-toolbar-890', 890,
        { sel: '.learn-explain-toolbar', prop: 'flex-wrap', expected: 'wrap' }),
    bandState('N3-edgetab-740', 740,
        { sel: '.learn-body', prop: '--learn-edge-tab-top', expected: '14px' }),
    bandState('N4-toolbar-700', 700,
        { sel: '.learn-explain-toolbar', prop: 'grid-template-areas', expected: '"center" "left" "right"' }),
];

// Read every probe tuple's resolved computed value for one state.
async function snapshotState(page, stateDef) {
    // Per-state viewport (defaults to desktop). Set UNCONDITIONALLY each iteration so every state
    // runs at its own width regardless of order — the page + context are shared and the viewport
    // is sticky on the context (set once at newContext), so a prior banded state's width must not
    // persist into the next. setViewportSize queues a resize but does not await layout; settle the
    // reflow (double-rAF) BEFORE enter() so the app's resize handlers recompute at the new width.
    await page.setViewportSize(stateDef.viewport || VIEWPORT);
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
    await stateDef.enter(page);
    await settleLesson(page);
    return page.evaluate((probes) => {
        return probes.map(([sel, pseudo, prop]) => {
            const el = document.querySelector(sel);
            if (!el) return { sel, pseudo, prop, value: '__MISSING__' };
            const cs = getComputedStyle(el, pseudo || undefined);
            return { sel, pseudo, prop, value: cs.getPropertyValue(prop) };
        });
    }, stateDef.probes);
}

function keyOf(state, p) {
    // Explicit field separators so a selector that literally contains `::before`
    // can never collide with a (selector, '::before') tuple.
    return `${state} | ${p.sel} || ${p.pseudo || ''} || ${p.prop}`;
}

// ---------- runner ----------
let bridgeProcess = null;
let signalHandled = false;
function signalCleanup(signal) {
    if (signalHandled) return;
    signalHandled = true;
    if (bridgeProcess && !bridgeProcess.killed) {
        try { bridgeProcess.kill('SIGTERM'); } catch (_) {}
    }
    process.exit(signal === 'SIGTERM' ? 143 : 130);
}
process.once('SIGINT', () => signalCleanup('SIGINT'));
process.once('SIGTERM', () => signalCleanup('SIGTERM'));

(async () => {
    const repoRoot = path.resolve(__dirname, '..');

    console.log(`[css-probe] mode=${MODE}`);
    console.log(`[css-probe] starting bridge on :${PORT}`);
    const server = spawn('node', ['app/ws-bridge.js'], {
        cwd: repoRoot,
        env: { ...process.env, PORT: String(PORT) },
        stdio: ['ignore', 'pipe', 'pipe'],
    });
    bridgeProcess = server;
    server.stdout.on('data', () => {});
    server.stderr.on('data', d => process.stderr.write(`  [bridge-err] ${d}`));

    let exitCode = 0;
    const snapshot = {};

    try {
        await waitForHealth(BASE);
        const browser = await chromium.launch();
        const context = await browser.newContext({
            viewport: VIEWPORT,
            timezoneId: 'UTC',
            locale: 'en-US',
        });
        // Inherit the same mask as visual-diff (freezes .is-animating transitions
        // so a probe taken mid-transition reads the settled value). The masked
        // properties (visibility/color/caret/animation on login + meta elements)
        // do not overlap any probed property, and the mask is identical across
        // --baseline and --check so it cannot create a false diff.
        await context.addInitScript(({ css }) => {
            const inject = () => {
                const s = document.createElement('style');
                s.textContent = css;
                document.head.appendChild(s);
            };
            if (document.head) inject();
            else document.addEventListener('DOMContentLoaded', inject);
        }, { css: MASK_CSS });

        const page = await context.newPage();
        await enterGuestMode(page, BASE);
        await openSubtopic(page, SUBTOPIC);

        // FAIL CLOSED: duplicate state names would silently overwrite in `snapshot[name]`,
        // dropping a whole state's coverage with zero signal (the per-key / missing-state guards
        // cannot see it). Reject before capturing.
        const stateNames = PROBE_STATES.map((s) => s.state);
        const dupState = stateNames.find((n, i) => stateNames.indexOf(n) !== i);
        if (dupState) {
            console.error(`[css-probe] duplicate PROBE_STATES name "${dupState}" — state ids must be unique`);
            process.exit(1);
        }

        for (const stateDef of PROBE_STATES) {
            try {
                const rows = await snapshotState(page, stateDef);
                snapshot[stateDef.state] = rows;
                console.log(`  ✓ ${stateDef.state} (${rows.length} probes)`);
            } catch (err) {
                console.log(`  ✗ ${stateDef.state}: ${err.message}`);
                snapshot[stateDef.state] = { error: err.message };
                exitCode = 1;
            }
        }

        await page.close().catch(() => {});
        await context.close().catch(() => {});
        await browser.close();
    } catch (err) {
        console.error('[css-probe] FATAL', err);
        exitCode = 1;
    } finally {
        const exited = new Promise((resolve) => server.once('exit', resolve));
        server.kill('SIGTERM');
        await Promise.race([
            exited,
            new Promise((resolve) => setTimeout(() => {
                console.warn('[css-probe] bridge did not exit within 2s after SIGTERM');
                resolve();
            }, 2000)),
        ]);
    }

    if (MODE === 'baseline') {
        if (exitCode !== 0) {
            console.error('[css-probe] a state errored during capture — NOT writing a partial baseline');
            process.exit(1);
        }
        // FAIL CLOSED: a probe whose element is absent records __MISSING__, which would
        // then compare __MISSING__===__MISSING__ forever (false confidence). Refuse to
        // bake one into the proof artifact — fix the probe/state instead.
        const missing = [];
        const dupKeys = [];
        for (const [state, rows] of Object.entries(snapshot)) {
            if (!Array.isArray(rows)) continue;
            const seen = new Set();
            for (const p of rows) {
                if (p.value === '__MISSING__' || p.value === '__ABSENT__') missing.push(keyOf(state, p));
                const k = keyOf(state, p);
                if (seen.has(k)) dupKeys.push(k); else seen.add(k);
            }
        }
        if (missing.length) {
            console.error('[css-probe] refusing to write baseline — these probes resolved __MISSING__ (element absent in state):');
            for (const m of missing) console.error(`  ! ${m}`);
            console.error('  Fix the probe selector or render the element in enter().');
            process.exit(1);
        }
        // FAIL CLOSED: a duplicate probe key within a state would bake two rows the --check
        // de-dup silently collapses (here multiplied across every state sharing NARROW_PROBES).
        // --check already rejects dup current keys; refuse to WRITE one too, symmetrically.
        if (dupKeys.length) {
            console.error('[css-probe] refusing to write baseline — duplicate probe keys (de-dup the probe list):');
            for (const k of dupKeys) console.error(`  ! ${k}`);
            process.exit(1);
        }
        fs.writeFileSync(BASELINE_PATH, JSON.stringify(snapshot, null, 2) + '\n');
        console.log(`\n[css-probe] baseline → ${BASELINE_PATH} (${Object.keys(snapshot).length} states, all probes have a real value)`);
        process.exit(0);
    }

    // --check: byte-identical comparison against the committed baseline, fail-closed.
    if (!fs.existsSync(BASELINE_PATH)) {
        console.error(`[css-probe] no baseline at ${BASELINE_PATH} — run --baseline first`);
        process.exit(1);
    }
    const baseline = JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8'));
    const diffs = [];
    const errors = [];
    for (const state of Object.keys(baseline)) {
        const baseRows = baseline[state];
        const curRows = snapshot[state];
        if (!Array.isArray(baseRows)) {
            errors.push(`${state}: baseline state is not a probe array (corrupt/partial baseline) — failing closed`);
            continue;
        }
        if (!curRows || !Array.isArray(curRows)) {
            errors.push(`${state}: current run produced no rows (${curRows && curRows.error ? curRows.error : 'missing'})`);
            continue;
        }
        const curByKey = new Map();
        for (const p of curRows) {
            const k = keyOf(state, p);
            if (curByKey.has(k)) errors.push(`${state}: duplicate probe key "${k}" — de-dup the probe list`);
            curByKey.set(k, p.value);
        }
        const baseKeys = new Set();
        for (const bp of baseRows) {
            const k = keyOf(state, bp);
            baseKeys.add(k);
            if (bp.value === '__MISSING__' || bp.value === '__ABSENT__') {
                errors.push(`${state}: baseline value for "${k}" is ${bp.value} — probe never had a real value; re-baseline / fix the probe`);
                continue;
            }
            const cur = curByKey.has(k) ? curByKey.get(k) : '__ABSENT__';
            if (cur === '__MISSING__') {
                errors.push(`${state}: "${k}" element vanished (baseline ${bp.value}, now __MISSING__)`);
                continue;
            }
            if (cur !== bp.value) diffs.push({ key: k, before: bp.value, after: cur });
        }
        // Reverse pass: a current probe with no baseline entry means someone added a
        // probe without re-baselining — it would otherwise be silently uncovered.
        for (const p of curRows) {
            const k = keyOf(state, p);
            if (!baseKeys.has(k)) errors.push(`${state}: current probe "${k}" has no baseline entry — re-baseline after adding/renaming probes`);
        }
    }

    // Symmetric fail-closed: a current state absent from the baseline (a probe
    // state added without re-baselining) would otherwise be silently uncovered.
    for (const state of Object.keys(snapshot)) {
        if (!(state in baseline)) {
            errors.push(`${state}: current run has a probe state with no baseline entry — re-baseline after adding a new state`);
        }
    }

    const cell = (v) => String(v).replace(/\|/g, '\\|'); // guard the markdown table
    const pass = diffs.length === 0 && errors.length === 0;
    const lines = ['# css-probe report', '',
        `States: ${Object.keys(baseline).join(', ')}`,
        `Result: ${pass ? 'PASS — all probes byte-identical' : 'FAIL'}`,
        ''];
    if (errors.length) {
        lines.push('## Fail-closed errors', '');
        for (const e of errors) lines.push(`- ${e}`);
        lines.push('');
    }
    if (diffs.length) {
        lines.push('## Probe diffs (baseline → current)', '',
            '| Probe | Before | After |', '|---|---|---|');
        for (const d of diffs) lines.push(`| ${cell(d.key)} | \`${cell(d.before)}\` | \`${cell(d.after)}\` |`);
    } else if (!errors.length) {
        lines.push('Every probed (state, selector, property) resolved value matches the baseline byte-for-byte.');
    }
    fs.writeFileSync(REPORT_PATH, lines.join('\n') + '\n');
    console.log(`\n[css-probe] report → ${REPORT_PATH}`);

    if (!pass) {
        console.error(`[css-probe] FAIL: ${diffs.length} probe diff(s), ${errors.length} fail-closed error(s)`);
        for (const d of diffs) console.error(`  ~ ${d.key}\n      before: ${d.before}\n      after:  ${d.after}`);
        for (const e of errors) console.error(`  ! ${e}`);
        process.exit(1);
    }
    console.log('[css-probe] PASS — all probes byte-identical');
    process.exit(0);
})();
