'use strict';
/**
 * Shared Playwright test utilities for tools/visual-diff.js and tools/smoke.js.
 *
 * Previously each caller redefined enterGuestMode / openSubtopic / etc.;
 * keeping them in sync required a 2-place edit on every selector change.
 * Centralized here per docs/superpowers/specs/2026-06-22-harness-expansion-design.md.
 */
const fs = require('fs');
const path = require('path');

// CSS masking non-deterministic regions before screenshot. Add selectors here
// whenever a new always-animating or text-drifting element shows up.
// Injected at BrowserContext level (addInitScript) by visual-diff.js so every
// page derived from the context inherits the mask before first paint —
// callers must not need to remember to re-inject.
const MASK_CSS = `
    /* login cosmos Three.js canvas — Phase 1 #10 */
    #introWebglContainer { visibility: hidden !important; }
    /* Phase 3.5 v2 view 19: login-view WebGL backdrop + decorative doodles
       drift across runs (random sparkle/tilt seeds in clerk-auth.js + CSS
       keyframes). Mask the canvas + freeze the decorative motion so the
       Glass card chrome stays diffable. */
    #loginWebglContainer { visibility: hidden !important; }
    #loginView .login-card.tilt-element {
        transform: none !important;
        transition: none !important;
        animation: none !important;
    }
    #loginView .login-doodle,
    #loginView .login-map-card,
    #loginView .login-scrap-note,
    #loginView .login-practice-log,
    #loginView .login-sticky-note,
    #loginView .login-mini-ticket {
        animation: none !important;
        transition: none !important;
    }
    /* Phase 3.5 v2 view 23: textbook focus dialog injects raster page images.
       Hide the image content (still keeps the Glass card chrome) so a missing
       textbook page doesn't fail the capture. */
    #textbookFocusDialog .textbook-focus-single-page,
    #textbookFocusDialog .textbook-focus-scroll-page img { visibility: hidden !important; }
    /* in-flight panel transitions */
    .is-animating { transition: none !important; animation: none !important; }
    /* relative timestamps in Recent Conversations drift between runs */
    .sidebar-recent-list .recent-timestamp,
    .sidebar-recent-list time { visibility: hidden !important; }
    /* feedback meta line = author + " · " + timestamp; timestamp drifts.
       Real selectors verified against renderFeedbackBoard. */
    .feedback-thread-meta,
    .feedback-reply-meta { color: transparent !important; text-shadow: none !important; }
    /* input caret blink in focused-composer view. Scoped to input surfaces. */
    input, textarea, [contenteditable="true"] { caret-color: transparent !important; }
    /* home-mode menu transitions during forced .show flip */
    .home-mode-menu.show { transition: none !important; animation: none !important; }
    /* Settings → Account card UID line. startGuestMode() generates a fresh
       Math.random() UID per session (clerk-auth.js startGuestMode); without
       this mask view 05 drifts every run at 0.013%. .settings-user-meta is
       a dedicated leaf node that holds ONLY the "UID: XXXXXX" line, so
       masking it preserves the rest of the Account card.
       !important + 2-ID specificity beats both the inline
       style="color:#94a3b8" and the L33281 author rule, regardless of
       cascade order. */
    html #settingsView .settings-user-meta { color: transparent !important; text-shadow: none !important; }
`;

function waitForHealth(base, timeoutMs = 15000) {
    const deadline = Date.now() + timeoutMs;
    return new Promise((resolve, reject) => {
        const tryOnce = () => {
            fetch(`${base}/health`).then(r => r.ok ? resolve() : retry()).catch(retry);
        };
        const retry = () => {
            if (Date.now() > deadline) return reject(new Error('bridge /health never came up'));
            setTimeout(tryOnce, 300);
        };
        tryOnce();
    });
}

async function enterGuestMode(page, base) {
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    await page.click('#introGetStartedBtn');
    await page.click('#guestModeBtnLogin[data-bound-guest-mode="1"]', { timeout: 25000 });
    await page.click('#quizCloseBtn');
    await page.waitForSelector('#navSyllabusBtn', { timeout: 10000 });
}

// Page D bootstrap (Phase 3.5 v2): navigate to BASE and dismiss the intro
// landing so the login Glass surface (FINAL LOGIN LIQUID GLASS L43321+) is
// visible. Does NOT enter guest mode — clicking `#guestModeBtnLogin` would
// transition into the workspace. After this returns the page sits on the
// login card with the Three.js cosmos canvas masked.
async function enterLoginView(page, base) {
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    await page.click('#introGetStartedBtn');
    await page.waitForSelector('#loginView:not(.hidden)', { timeout: 10000 });
    // Wait for the bound-guest-mode attribute as proof clerk-auth.js
    // initLoginExperience() ran — the same readiness signal enterGuestMode
    // uses one click later. Without it, the login card buttons may still be
    // mid-bind on slow runs.
    await page.waitForSelector('#guestModeBtnLogin[data-bound-guest-mode="1"]', { timeout: 25000 });
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
    throw new Error('could not open syllabus panel after 4 attempts');
}

async function openSubtopic(page, sub, waitMs = 25000) {
    await ensureSyllabusOpen(page);
    // Substring match; count!==1 guard below catches ambiguity (e.g.
    // "Chapter 1" prefix-matching a future "Chapter 14").
    const chapter = page.locator('#courseSyllabus .syllabus-chapter', { hasText: sub.chapter });
    const chapterCount = await chapter.count();
    if (chapterCount !== 1) {
        throw new Error(`ambiguous chapter selector ('${sub.chapter}' matched ${chapterCount} rows)`);
    }
    await chapter.first().click();
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
        if (text && !text.includes('Preparing lesson...') && text.length > 80) return text;
        await page.waitForTimeout(300);
    }
    throw new Error(`subtopic "${sub.title}" never rendered within ${waitMs}ms`);
}

// Close any visible feature-popover help bubbles. Several Page A/B views
// open with a `.feature-close-btn` element rendered into the page; click
// every one that is currently in the layout (offsetParent !== null) so
// transient highlight chrome doesn't leak into the screenshot.
async function closeFeaturePopovers(page) {
    await page.evaluate(() => {
        document.querySelectorAll('.feature-close-btn').forEach(b => {
            if (b.offsetParent !== null) b.click();
        });
    });
}

// Reset Home/sidebar chrome state left over from a previous Page B view
// (e.g. view 11 forced `#homeModeMenu.show` + `aria-expanded='true'` on the
// toggle button). View 12+ navigation strips `.show` but inherits the stale
// `aria-expanded`; no current selector keys off it, but the harness should
// not be silently order-dependent. Parallel to resetLessonChromeState.
async function resetHomeChromeState(page) {
    await page.evaluate(() => {
        const menu = document.getElementById('homeModeMenu');
        const toggle = document.getElementById('homeModeToggleBtn');
        menu?.classList.remove('show');
        toggle?.setAttribute('aria-expanded', 'false');
    });
}

// Reset lesson chrome state left over from a previous view on the same page.
// Used by views 15/16 (which run after view 09's qa-full state) and by Page C
// when reopening a second lesson on a sticky Page A.
async function resetLessonChromeState(page) {
    await page.evaluate(() => {
        const body = document.getElementById('learnBody');
        if (!body) return;
        delete body.dataset.panelFocus;
        body.classList.remove('chapter-overview-active', 'chapter-overview-split-active');
        // Force any pager refresh observer to recompute against the reset state.
        if (typeof window.__ftutorRefreshPager === 'function') {
            window.__ftutorRefreshPager();
        }
        window.dispatchEvent(new Event('resize'));
    });
    // One rAF + small slack for layout to settle.
    await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
    await page.waitForTimeout(100);
}

// Wait until MathJax typesetting + font loading + 2x rAF have all settled,
// so canvas-based interactive demos paint against a stable layout. Used by
// captureView before every screenshot.
async function settleLesson(page) {
    await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
    // Force chromium to materialize the system fallback fonts before screenshot.
    // document.fonts.ready resolves on font *load*; this forces *rasterization*
    // so a cold font cache run does not leak into pixel diffs. Once a page
    // has rasterized them, the cache is sticky for the page lifetime — gate
    // on a per-page sentinel so second-and-later settles skip this 50-150ms
    // round-trip. MathJax typesetting + rAFs + the 150ms slack below still
    // run on every call.
    if (!page.__ftutorFontsRasterized) {
        await page.evaluate(async () => {
            if (document.fonts && typeof document.fonts.load === 'function') {
                try {
                    await Promise.all([
                        document.fonts.load('1em sans-serif'),
                        document.fonts.load('400 1em sans-serif'),
                        document.fonts.load('400 1em serif'),
                        document.fonts.load('400 1em monospace'),
                    ]);
                } catch (_) {}
            }
        });
        page.__ftutorFontsRasterized = true;
    }
    await page.evaluate(async () => {
        if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
            try { await window.MathJax.startup.promise; } catch (_) {}
        }
        if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
            try { await window.MathJax.typesetPromise(); } catch (_) {}
        }
    });
    await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
    await page.waitForTimeout(150);
}

function assertOrThrow(condition, msg) {
    if (!condition) throw new Error(msg);
}

// Path to the on-disk feedback-board fixture used by /api/feedback GET.
// Matches the runtime path computed in ws-bridge.js L1237 (usersDir =
// path.join(__dirname, 'users')) + user-memory.js L46 (FEEDBACK_BOARD_PATH =
// path.join(USERS_DIR, 'feedback-board.json')). Hardcoded rather than
// recomputed via require('../app/...') to keep test-utils Node-only and
// avoid pulling in ws-bridge's module graph just to read one constant.
const FEEDBACK_BOARD_PATH = path.join(__dirname, '..', 'app', 'users', 'feedback-board.json');

// Canonical path to the Phase 3.5 v3 §9a populated fixture. Hoisted to
// test-utils.js (was inline in visual-diff.js view 14b setup per PR #69
// review finding #15) so a future sibling view (14c two-thread, 14d single-
// reply, …) and the §9c.x mistake-notebook fixtures share one resolution
// site.
const FEEDBACK_FIXTURE_POPULATED_PATH = path.join(__dirname, 'fixtures', 'feedback-board.populated.json');

// Backup directory for harness-mutated user files. Lives under tools/ rather
// than next to the production file (app/users/) per PR #69 review finding
// #20: snapshotting into app/users/feedback-board.harness-backup.json mixed
// harness state with real per-user state. tools/.harness-state/ is git-
// ignored and isolated from the runtime read path.
const HARNESS_STATE_DIR = path.join(__dirname, '.harness-state');
const FEEDBACK_BOARD_BACKUP_PATH = path.join(HARNESS_STATE_DIR, 'feedback-board.backup.json');

// Read a small JSON file and return its parsed content (or null on any error).
// Used by seedFeedbackFixture / restoreFeedbackBoard to compare board content
// against the fixture so we never destroy a developer's real feedback data.
// Synchronous + best-effort — failures fall back to null, callers handle.
function readJsonOrNull(p) {
    try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch (_) { return null; }
}

// Two boards are "the same" iff their normalized JSON bytes match. Catches
// the case where seedFeedbackFixture has already written the fixture (so the
// board content equals the fixture content) without falsely matching a board
// that happens to have similar items.
function jsonEquals(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

// Phase 3.5 v3 §9a — seed app/users/feedback-board.json from a fixture so
// view 14b can render populated thread/reply chrome (G.3.2's deleted
// `#feedbackView` rules + all tone-N/lane/target chrome). The bridge reads
// the file on every /api/feedback GET (no in-process cache), so seeding at
// view-setup time is sufficient — no bridge restart needed.
//
// Safety contract (PR #69 review findings #1, #11, #12, #20):
//   - Snapshots any pre-existing board into tools/.harness-state/ BEFORE
//     overwriting, so restoreFeedbackBoard can put it back byte-for-byte.
//   - Snapshot is skipped only when the existing board already matches the
//     fixture (idempotent re-seed within one run, or a crashed prior run
//     that left fixture in place — in which case the backup would be the
//     fixture too, defeating the purpose).
//   - If an old backup exists from a crashed prior run, it is PRESERVED
//     (never overwritten with fixture-as-original) so the dev's true
//     original data survives chains of failed runs.
function seedFeedbackFixture(fixturePath) {
    fs.mkdirSync(HARNESS_STATE_DIR, { recursive: true });
    const fixture = readJsonOrNull(fixturePath);
    if (!fixture) throw new Error(`seedFeedbackFixture: cannot read fixture at ${fixturePath}`);
    const existing = readJsonOrNull(FEEDBACK_BOARD_PATH);
    if (existing && !jsonEquals(existing, fixture) && !fs.existsSync(FEEDBACK_BOARD_BACKUP_PATH)) {
        // Real user data — snapshot it. (Existing equals fixture → we already
        // seeded this run; skip. Existing differs AND backup exists → some
        // prior run already preserved the original; preserve THAT, not the
        // current existing-which-might-be-fixture-from-a-clobbered-prior-run.)
        fs.copyFileSync(FEEDBACK_BOARD_PATH, FEEDBACK_BOARD_BACKUP_PATH);
    }
    fs.copyFileSync(fixturePath, FEEDBACK_BOARD_PATH);
}

// Restore app/users/feedback-board.json to its pre-harness state. Two paths:
//   1. Backup exists → copy backup back, delete backup. The dev's original
//      board is restored exactly.
//   2. No backup → ONLY delete the board if its content matches the fixture
//      we know about (the §9a populated fixture). Anything else — including
//      a board the dev created after the harness exited mid-run — is left
//      alone. Prevents the data-loss path from PR #69 review finding #1
//      where a dev runs --check on a tree that has real feedback data and
//      restoreFeedbackBoard silently deletes it.
function restoreFeedbackBoard() {
    if (fs.existsSync(FEEDBACK_BOARD_BACKUP_PATH)) {
        fs.copyFileSync(FEEDBACK_BOARD_BACKUP_PATH, FEEDBACK_BOARD_PATH);
        fs.unlinkSync(FEEDBACK_BOARD_BACKUP_PATH);
        return;
    }
    if (!fs.existsSync(FEEDBACK_BOARD_PATH)) return;
    // Compare current board content to every known fixture; only delete on
    // match. Keeps the safety check honest if more fixtures land later —
    // add their paths here.
    const known = [FEEDBACK_FIXTURE_POPULATED_PATH];
    const current = readJsonOrNull(FEEDBACK_BOARD_PATH);
    for (const p of known) {
        if (jsonEquals(current, readJsonOrNull(p))) {
            fs.unlinkSync(FEEDBACK_BOARD_PATH);
            return;
        }
    }
    // Unknown content — leave it alone. Don't touch the dev's real data.
}

// Resolve a lesson-cache file path using the same workspace-preferred fallback
// chain that ws-bridge.js uses. Returns the resolved absolute path or null.
function resolveLessonCachePath(repoRoot, sectionId) {
    const filename = 'new__aquarius_visual_latex_v2.aquarius_visual_latex_v2.en.md';
    const folder = sectionId.replace(/\./g, '_'); // 3.8-1 → 3_8-1
    const candidates = [
        path.join(repoRoot, 'workspace', 'materials', 'lesson-cache', folder, filename),
        path.join(repoRoot, 'materials', 'lesson-cache', folder, filename),
    ];
    for (const p of candidates) {
        if (fs.existsSync(p)) return p;
    }
    return null;
}

module.exports = {
    MASK_CSS,
    waitForHealth,
    enterGuestMode,
    enterLoginView,
    ensureSyllabusOpen,
    openSubtopic,
    resetHomeChromeState,
    resetLessonChromeState,
    settleLesson,
    assertOrThrow,
    resolveLessonCachePath,
    closeFeaturePopovers,
    FEEDBACK_BOARD_PATH,
    FEEDBACK_FIXTURE_POPULATED_PATH,
    HARNESS_STATE_DIR,
    seedFeedbackFixture,
    restoreFeedbackBoard,
};
