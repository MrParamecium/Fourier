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
    // Exact-text match — `:has-text` is substring-based and would prefix-match
    // future "Chapter 4" vs "Chapter 14" expansion.
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

async function openSubtopicInFreshGuest(page, sub, base) {
    await enterGuestMode(page, base);
    return openSubtopic(page, sub);
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
    ensureSyllabusOpen,
    openSubtopic,
    openSubtopicInFreshGuest,
    resetLessonChromeState,
    settleLesson,
    assertOrThrow,
    resolveLessonCachePath,
};
