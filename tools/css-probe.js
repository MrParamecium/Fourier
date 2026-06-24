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
 *   before/after a refactor. getComputedStyle returns the resolved cascade value
 *   regardless of viewport clipping AND resolves calc()/min() to px — which is
 *   exactly the signal that distinguishes the 12-ID followup-bar winner
 *   (`calc(100% - 36px)`) from the 8-ID one (`min(820px, …)`). It generalizes the
 *   per-view computed-style asserts already in visual-diff.js (views 12b-e/14d-f).
 *
 * Usage:
 *   node tools/css-probe.js --baseline   # snapshot resolved styles → css-probe-baseline.json
 *   node tools/css-probe.js --check      # capture current + diff vs baseline (byte-identical)
 *
 * Exit 0 if every probed (state, selector, pseudo, property) value matches the
 * baseline byte-for-byte (or on --baseline). Exit 1 on any diff, any __MISSING__
 * that was present in baseline, or harness failure.
 *
 * Report: tools/css-probe-report.md (only written by --check).
 *
 * NOT wired into `npm run check` — it spawns the bridge + Chromium (~30s). Run it
 * manually as a pre-merge gate alongside visual-diff (property-identity +
 * spatial-identity are complementary).
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
// enter() MUST assert-as-entered (prove the gated rule actually matches) before
// the snapshot, or the probe reads an inactive rule and proves nothing
// (docs/PHASE3.6_SPEC.md §4.1, risk R8). All states run on one Page-A lesson page
// (§1.1-1) opened once; resetLessonChromeState() clears prior panel state.

// Helper run inside enter() to drop learn-view panel state to a known floor.
async function resetLearnChrome(page) {
    await resetLessonChromeState(page);
    await page.evaluate(() => {
        document.getElementById('textbookFocusModal')?.classList.add('hidden');
        document.body.classList.remove('textbook-focus-active');
    });
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
        },
        probes: [
            ['#learnChatCol', null, 'background-image'],
            ['#learnChatCol', null, 'background-color'],
            ['#learnChatCol', null, 'overflow'],
            ['#learnFollowupBar', null, 'width'],
            ['#learnFollowupBar', null, 'min-height'],
            ['#learnFollowupBar', null, 'border-top-left-radius'],
            ['#learnFollowupBar', null, 'background-image'],
            ['#learnFollowupBar', null, 'box-shadow'],
            ['#learnFollowupBar', null, 'backdrop-filter'],
            ['#learnFollowupBar', null, 'z-index'],
            ['#learnFollowupBar', '::before', 'content'],
            ['#learnFollowupBar', '::after', 'transform'],
            ['#learnFollowupBar .input-wrapper', null, 'grid-template-columns'],
            ['#learnFollowupBar .input-field', null, 'min-height'],
            ['#learnFollowupBar .input-field', null, 'font-weight'],
        ],
    },
    {
        // S3 — data-panel-focus="qa-full" (mirrors visual-diff view 09). Largest
        // chat surface; same §3d war coverage as S2.
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
        },
        probes: [
            ['#learnChatCol', null, 'background-image'],
            ['#learnFollowupBar', null, 'width'],
            ['#learnFollowupBar', null, 'min-height'],
            ['#learnFollowupBar', null, 'border-top-left-radius'],
            ['#learnFollowupBar', null, 'backdrop-filter'],
            ['#learnFollowupBar', '::after', 'transform'],
        ],
    },
    {
        // S12 — textbook-focus modal, Q&A panel un-hidden. THE PILOT GATE: pins the
        // resolved values of every selector the textbook de-doubling rewrites
        // (docs/PHASE3.6_SPEC.md §3 Pilot 0). The page-indicator background-image
        // is the load-bearing one — it must stay the GLASS radial-gradient (not the
        // paper-tag `#fff8dd` gradient from the L23441 single-ID !important rule);
        // a Step-2 over-flatten to a bare ID would surface the paper-tag value here.
        state: 'S12-textbook-qa-open',
        enter: async (page) => {
            await resetLearnChrome(page);
            await page.evaluate(() => {
                const modal = document.getElementById('textbookFocusModal');
                const content = document.getElementById('textbookFocusContent');
                const indicator = document.getElementById('textbookFocusPageIndicator');
                const panel = document.getElementById('textbookFocusQaPanel');
                if (!modal) return;
                document.body.classList.add('textbook-focus-active');
                modal.classList.remove('hidden');
                // Un-hide the Q&A panel so its de-doubled internals (head, compose,
                // input, send, empty) are live for getComputedStyle. The panel is
                // `.hidden` by default (only shown when the user toggles the fab).
                panel?.classList.remove('hidden');
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
            const ok = await page.evaluate(() => {
                const modal = document.getElementById('textbookFocusModal');
                const panel = document.getElementById('textbookFocusQaPanel');
                return !!modal && !modal.classList.contains('hidden')
                    && !!panel && !panel.classList.contains('hidden');
            });
            assertOrThrow(ok, 'S12-textbook-qa-open: modal still hidden or #textbookFocusQaPanel missing/hidden');
        },
        probes: [
            ['#textbookFocusModal', null, 'background-image'],
            ['#textbookFocusDialog .learn-focus-headings', null, 'background-image'],
            ['#textbookFocusDialog .learn-focus-headings', null, 'backdrop-filter'],
            ['#textbookFocusQaPanel', null, 'border-top-left-radius'],
            ['#textbookFocusQaPanel', null, 'background-image'],
            ['#textbookFocusQaPanel', null, 'box-shadow'],
            ['#textbookFocusQaPanel', null, 'backdrop-filter'],
            ['#textbookFocusQaPanel', '::before', 'content'],
            ['#textbookFocusQaPanel', '::before', 'opacity'],
            ['.textbook-focus-qa-head', null, 'background-image'],
            ['.textbook-focus-qa-close', null, 'background-image'],
            ['.textbook-focus-qa-empty', null, 'border-top-left-radius'],
            ['.textbook-focus-qa-compose', null, 'grid-template-columns'],
            ['.textbook-focus-qa-input', null, 'min-height'],
            ['.textbook-focus-qa-input', null, 'border-top-left-radius'],
            ['.textbook-focus-qa-send', null, 'width'],
            ['.textbook-focus-qa-send', null, 'border-top-left-radius'],
            ['#textbookFocusQaToggle', null, 'width'],
            ['#textbookFocusQaToggle', null, 'background-image'],
            // The load-bearing page-indicator probes (Step-2 specificity guard):
            ['#textbookFocusPageIndicator', null, 'background-image'],
            ['#textbookFocusPageIndicator', null, 'border-top-left-radius'],
            ['#textbookFocusPageIndicator', null, 'min-width'],
            ['#textbookFocusPageIndicator', '::before', 'content'],
            ['#textbookFocusPageIndicator', '::before', 'display'],
            ['#textbookFocusPageIndicator', '::after', 'display'],
        ],
    },
];

// Read every probe tuple's resolved computed value for one state.
async function snapshotState(page, stateDef) {
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
    return `${state} | ${p.sel}${p.pseudo ? p.pseudo : ''} { ${p.prop} }`;
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
        fs.writeFileSync(BASELINE_PATH, JSON.stringify(snapshot, null, 2) + '\n');
        console.log(`\n[css-probe] baseline → ${BASELINE_PATH}`);
        process.exit(0);
    }

    // --check: byte-identical comparison against the committed baseline.
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
        if (!Array.isArray(baseRows)) { continue; } // baseline state was an error — skip
        if (!curRows || !Array.isArray(curRows)) {
            errors.push(`${state}: current run produced no rows (${curRows && curRows.error ? curRows.error : 'missing'})`);
            continue;
        }
        const curByKey = new Map(curRows.map(p => [keyOf(state, p), p.value]));
        for (const bp of baseRows) {
            const k = keyOf(state, bp);
            const cur = curByKey.has(k) ? curByKey.get(k) : '__ABSENT__';
            if (cur !== bp.value) {
                diffs.push({ key: k, before: bp.value, after: cur });
            }
        }
    }

    const lines = ['# css-probe report', '',
        `States: ${Object.keys(baseline).join(', ')}`,
        `Result: ${diffs.length === 0 && errors.length === 0 ? 'PASS — all probes byte-identical' : 'FAIL'}`,
        ''];
    if (errors.length) {
        lines.push('## State errors', '');
        for (const e of errors) lines.push(`- ${e}`);
        lines.push('');
    }
    if (diffs.length) {
        lines.push('## Probe diffs (baseline → current)', '',
            '| Probe | Before | After |', '|---|---|---|');
        for (const d of diffs) {
            lines.push(`| ${d.key} | \`${d.before}\` | \`${d.after}\` |`);
        }
    } else if (!errors.length) {
        lines.push('Every probed (state, selector, property) resolved value matches the baseline byte-for-byte.');
    }
    fs.writeFileSync(REPORT_PATH, lines.join('\n') + '\n');
    console.log(`\n[css-probe] report → ${REPORT_PATH}`);

    if (diffs.length || errors.length) {
        console.error(`[css-probe] FAIL: ${diffs.length} probe diff(s), ${errors.length} state error(s)`);
        for (const d of diffs) console.error(`  ~ ${d.key}\n      before: ${d.before}\n      after:  ${d.after}`);
        for (const e of errors) console.error(`  ! ${e}`);
        process.exit(1);
    }
    console.log('[css-probe] PASS — all probes byte-identical');
    process.exit(0);
})();
