#!/usr/bin/env node
/**
 * Visual-diff harness for CSS-heavy refactors (Phase 3 #20, #22, deferred #19).
 *
 * Captures PNG screenshots of the key visual surfaces in guest mode, then
 * compares them pixel-for-pixel against a saved baseline. Animated regions
 * (login cosmos Three.js canvas, in-flight panel transitions) are masked so
 * a deterministic diff is possible.
 *
 * Usage:
 *   node tools/visual-diff.js --baseline    # save current state to tools/visual-baseline/
 *   node tools/visual-diff.js --check       # capture current + diff vs baseline
 *
 * Exit 0 if every view diffs under THRESHOLD pixels (or on --baseline).
 * Exit 1 if any view exceeds threshold, or on harness failure.
 *
 * Report: tools/visual-diff-report.md (only written by --check).
 */
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { chromium } = require('playwright');
const pixelmatch = require('pixelmatch').default;
const { PNG } = require('pngjs');

const PORT = Number(process.env.TUTOR_VDIFF_PORT || 9125);
const BASE = `http://127.0.0.1:${PORT}`;
const VIEWPORT = { width: 1280, height: 800 };
const PIXELMATCH_THRESHOLD = 0.1;        // per-pixel YIQ-distance threshold
const FAIL_RATIO = 0.005;                // fail if >0.5% of pixels differ

const TOOLS = __dirname;
const BASELINE_DIR = path.join(TOOLS, 'visual-baseline');
const CURRENT_DIR = path.join(TOOLS, 'visual-current');
const DIFF_DIR = path.join(TOOLS, 'visual-diff');
const REPORT_PATH = path.join(TOOLS, 'visual-diff-report.md');

const MODE = process.argv.includes('--baseline') ? 'baseline'
           : process.argv.includes('--check') ? 'check'
           : null;
if (!MODE) {
    console.error('usage: visual-diff.js --baseline | --check');
    process.exit(2);
}

// CSS to mask non-deterministic regions before screenshotting.
// Add selectors here when a new always-animating element shows up.
const MASK_CSS = `
    /* login cosmos Three.js canvas — Phase 1 #10 */
    #introWebglContainer { visibility: hidden !important; }
    /* in-flight panel transitions */
    .is-animating { transition: none !important; animation: none !important; }
    /* relative timestamps in Recent Conversations would drift between runs */
    .sidebar-recent-list .recent-timestamp,
    .sidebar-recent-list time { visibility: hidden !important; }
`;

const SUBTOPIC = { id: '1_1-1', title: '1.1-1 Signal Energy',
    chapter: 'Chapter 1: Signals and Systems',
    section: '1.1 Size of a Signal' };

// ---------- view definitions ----------
// One long-lived page bootstrapped through enterGuestMode; each setup() takes
// the page from "wherever we are" to its target state. `06-lesson-view` runs
// last because it mutates the page the most — sidebar nav is still clickable
// from inside a lesson, but it's cheaper to capture sidebar destinations first.
//
// Landing was intentionally excluded from this harness: style.css L33181-44845
// (Phase 3 #20) and the runtime inject*Styles cluster (Phase 3 #22) are both
// post-marketing lesson-UI rules. The landing page sits outside Phase 3's blast
// radius and its decorative font-swap noise made deterministic diffs painful.
// Re-add if a future phase touches global rules.
const sharedViews = [
    { name: '01-guest-home', setup: async (page) => {
        await page.evaluate(() => {
            document.querySelectorAll('.feature-close-btn').forEach(b => {
                if (b.offsetParent !== null) b.click();
            });
        });
        await page.waitForTimeout(300);
    } },
    { name: '02-syllabus-open', setup: async (page) => {
        await ensureSyllabusOpen(page);
        await page.waitForTimeout(400);
    } },
    { name: '03-mistake-notebook', setup: async (page) => {
        await page.click('#navMistakeNotebookBtn');
        await page.waitForSelector('#mistakeNotebookView:not(.hidden)', { timeout: 5000 });
        await page.waitForTimeout(400);
    } },
    { name: '04-recent-conversations', setup: async (page) => {
        await page.click('#mistakeNotebookCloseBtn').catch(() => {});
        await page.waitForSelector('#mistakeNotebookView.hidden', { timeout: 3000 }).catch(() => {});
        await page.click('#navRecentBtn');
        await page.waitForTimeout(700);
    } },
    { name: '05-settings', setup: async (page) => {
        await page.click('#sidebarSettingsBtn');
        await page.waitForSelector('.settings-page-version', { timeout: 5000 });
        await page.waitForTimeout(400);
    } },
    { name: '06-lesson-view', setup: async (page) => {
        await page.evaluate(() => {
            document.querySelectorAll('.feature-close-btn').forEach(b => {
                if (b.offsetParent !== null) b.click();
            });
        });
        await openSubtopic(page, SUBTOPIC);
        await page.waitForTimeout(800); // let KaTeX settle
    } },
    // The next 3 views (added with Phase 3 PR #21 baseline refresh per
    // docs/phase3_plan.md §5.6) target the surfaces PR #22 directly governs.
    // They build on view 06's already-loaded lesson — no need to renavigate.
    { name: '07-lesson-pager-states', setup: async (page) => {
        // Force the pager to its last-subsection state so the next-button
        // disabled treatment is visible. We do this by reaching the
        // sentinel "is at end" state without leaving the lesson:
        // hover the next-button to surface its hover treatment.
        await page.evaluate(() => {
            const nextBtn = document.querySelector('#learnKpNextBtn, #learnFocusNextBtn');
            if (nextBtn) nextBtn.scrollIntoView({ block: 'center' });
        });
        const nextBtn = page.locator('#learnKpNextBtn, #learnFocusNextBtn').first();
        await nextBtn.hover({ force: true }).catch(() => {});
        await page.waitForTimeout(300);
    } },
    { name: '08-lesson-lecture-toolbar', setup: async (page) => {
        // qa-wide focuses the QA column to ~2/3 width and is one of the
        // most-overridden states across both #22's runtime inject*Styles
        // sites and #20's banner cluster.
        await page.evaluate(() => {
            const shell = document.getElementById('learnBody');
            if (shell) shell.dataset.panelFocus = 'qa-wide';
            window.dispatchEvent(new Event('resize'));
        });
        await page.waitForTimeout(400);
    } },
    { name: '09-lesson-qa-column', setup: async (page) => {
        // qa-full collapses lecture entirely and exposes the followup-bar
        // glass panel + chat composer chrome. Also exercise :focus-within
        // on the followup bar so PR #22's hover/focus rules are captured.
        await page.evaluate(() => {
            const shell = document.getElementById('learnBody');
            if (shell) shell.dataset.panelFocus = 'qa-full';
            window.dispatchEvent(new Event('resize'));
        });
        await page.waitForTimeout(300);
        await page.locator('#learnFollowupBar input, #learnFollowupBar textarea').first()
            .focus({ timeout: 2000 }).catch(() => {});
        await page.waitForTimeout(300);
    } },
];

// ---------- shared helpers (mirror smoke.js — kept independent on purpose) ----------
function waitForHealth(timeoutMs = 15000) {
    const deadline = Date.now() + timeoutMs;
    return new Promise((resolve, reject) => {
        const tryOnce = () => {
            fetch(`${BASE}/health`).then(r => r.ok ? resolve() : retry()).catch(retry);
        };
        const retry = () => {
            if (Date.now() > deadline) return reject(new Error('bridge /health never came up'));
            setTimeout(tryOnce, 300);
        };
        tryOnce();
    });
}

async function enterGuestMode(page) {
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    await page.click('#introGetStartedBtn');
    await page.click('#guestModeBtnLogin[data-bound-guest-mode="1"]', { timeout: 25000 });
    await page.click('#quizCloseBtn');
    await page.waitForSelector('#navSyllabusBtn', { timeout: 10000 });
    await page.addStyleTag({ content: MASK_CSS });
}

async function ensureSyllabusOpen(page) {
    for (let attempt = 0; attempt < 4; attempt++) {
        const stable = await page.locator('#sidebarSyllabusPanel.is-open:not(.is-animating)').count();
        if (stable > 0) return;
        await page.click('#navSyllabusBtn').catch(() => {});
        try {
            await page.waitForSelector('#sidebarSyllabusPanel.is-open:not(.is-animating)', { timeout: 2500 });
            return;
        } catch (_) { /* try again */ }
    }
    throw new Error('could not open syllabus panel');
}

async function openSubtopic(page, sub, waitMs = 25000) {
    await ensureSyllabusOpen(page);
    await page.click(`#courseSyllabus .syllabus-chapter:has-text("${sub.chapter}")`);
    await page.click(`#courseSyllabus .syllabus-section[data-section="${sub.section}"]`);
    const card = page.locator(`.chapter-overview-subcard[data-sublesson-title="${sub.title}"]`);
    await card.waitFor({ state: 'visible', timeout: 10000 });
    let entered = false;
    const sawOpenLog = { value: false };
    const listener = m => { if (/\[openLearnMode\]/.test(m.text())) sawOpenLog.value = true; };
    page.on('console', listener);
    try {
        for (let i = 0; i < 5 && !entered; i++) {
            await card.click();
            const t0 = Date.now();
            while (Date.now() - t0 < 2000) {
                if (sawOpenLog.value) { entered = true; break; }
                await page.waitForTimeout(100);
            }
        }
    } finally {
        page.off('console', listener);
    }
    if (!entered) throw new Error(`subtopic "${sub.title}" click never fired openLearnMode`);
    const content = page.locator('#learnExplainContent');
    const deadline = Date.now() + waitMs;
    while (Date.now() < deadline) {
        const text = (await content.innerText().catch(() => '')) || '';
        if (text && !text.includes('Preparing lesson...') && text.length > 80) return;
        await page.waitForTimeout(300);
    }
    throw new Error(`subtopic "${sub.title}" never rendered`);
}

// ---------- diff core ----------
function readPng(p) {
    return PNG.sync.read(fs.readFileSync(p));
}

function comparePng(baselinePath, currentPath, diffPath) {
    const a = readPng(baselinePath);
    const b = readPng(currentPath);
    if (a.width !== b.width || a.height !== b.height) {
        return { mismatch: a.width * a.height, ratio: 1, total: a.width * a.height,
                 error: `size mismatch: baseline ${a.width}x${a.height} vs current ${b.width}x${b.height}` };
    }
    const diff = new PNG({ width: a.width, height: a.height });
    const mismatch = pixelmatch(a.data, b.data, diff.data, a.width, a.height,
        { threshold: PIXELMATCH_THRESHOLD });
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
    const total = a.width * a.height;
    return { mismatch, ratio: mismatch / total, total };
}

// ---------- runner ----------
(async () => {
    const repoRoot = path.resolve(__dirname, '..');
    const outDir = MODE === 'baseline' ? BASELINE_DIR : CURRENT_DIR;
    fs.mkdirSync(outDir, { recursive: true });
    if (MODE === 'check') fs.mkdirSync(DIFF_DIR, { recursive: true });

    console.log(`[visual-diff] mode=${MODE} → ${outDir}`);
    console.log(`[visual-diff] starting bridge on :${PORT}`);
    const server = spawn('node', ['app/ws-bridge.js'], {
        cwd: repoRoot,
        env: { ...process.env, PORT: String(PORT) },
        stdio: ['ignore', 'pipe', 'pipe'],
    });
    server.stdout.on('data', () => {});
    server.stderr.on('data', d => process.stderr.write(`  [bridge-err] ${d}`));

    let exitCode = 0;
    const results = [];

    try {
        await waitForHealth();
        const browser = await chromium.launch();
        const captureView = async (view, page) => {
            const dest = path.join(outDir, `${view.name}.png`);
            try {
                await view.setup(page);
                await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
                await page.screenshot({ path: dest, fullPage: false });
                console.log(`  ✓ ${view.name}`);
                if (MODE === 'check') {
                    const baselinePath = path.join(BASELINE_DIR, `${view.name}.png`);
                    if (!fs.existsSync(baselinePath)) {
                        results.push({ view: view.name, status: 'no-baseline' });
                        return;
                    }
                    const diffPath = path.join(DIFF_DIR, `${view.name}.png`);
                    const cmp = comparePng(baselinePath, dest, diffPath);
                    const pass = !cmp.error && cmp.ratio <= FAIL_RATIO;
                    results.push({ view: view.name, status: pass ? 'pass' : 'fail',
                                   mismatch: cmp.mismatch, total: cmp.total,
                                   ratio: cmp.ratio, error: cmp.error });
                    if (!pass) exitCode = 1;
                }
            } catch (err) {
                console.log(`  ✗ ${view.name}: ${err.message}`);
                results.push({ view: view.name, status: 'error', error: err.message });
                exitCode = 1;
            }
        };

        // One guest-mode bootstrap (injects MASK_CSS) then walk sharedViews
        // in order. Each setup() leaves the page in a clean enough state for
        // the next view to reset.
        const sharedPage = await browser.newPage({ viewport: VIEWPORT });
        await enterGuestMode(sharedPage);
        for (const view of sharedViews) await captureView(view, sharedPage);
        await sharedPage.close().catch(() => {});
        await browser.close();
    } catch (err) {
        console.error('[visual-diff] FATAL', err);
        exitCode = 1;
    } finally {
        server.kill('SIGTERM');
        await new Promise(r => setTimeout(r, 500));
    }

    if (MODE === 'check') {
        const lines = ['# Visual-diff report', '',
            `Threshold: ≤${(FAIL_RATIO * 100).toFixed(2)}% mismatched pixels per view`,
            '', '| View | Status | Mismatch | Ratio | Note |',
            '|---|---|---|---|---|'];
        for (const r of results) {
            const ratio = r.ratio != null ? (r.ratio * 100).toFixed(3) + '%' : '—';
            const mismatch = r.mismatch != null ? `${r.mismatch}/${r.total}` : '—';
            lines.push(`| ${r.view} | ${r.status} | ${mismatch} | ${ratio} | ${r.error || ''} |`);
        }
        fs.writeFileSync(REPORT_PATH, lines.join('\n') + '\n');
        console.log(`\n[visual-diff] report → ${REPORT_PATH}`);
    }
    process.exit(exitCode);
})();
