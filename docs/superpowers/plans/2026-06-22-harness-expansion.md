# Phase 3.5 Visual-Diff Harness Expansion — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand `tools/visual-diff.js` from 9 to 18 views so PRs #20a/b/c Pass 2 and #21 Pass 2 land with pixel-diff regression cover on Home Ask, preference/tracker/feedback, lesson chapter-overview class flips, and 2 of 13 dispatcher family-table keys.

**Architecture:** Single `tools/visual-diff.js` runner. `sharedViews` becomes `{name, page, setup}` so the runner can route views across 3 Playwright pages (A/B/C) via a lazy `Map<pageKey, Page>` bootstrap. Three shared helpers (`enterGuestMode`, `ensureSyllabusOpen`, `openSubtopic`) move out into a new `tools/test-utils.js` (also imported by `tools/smoke.js`, removing existing duplication). The runner gains: context-level `MASK_CSS` injection via `addInitScript`, a centralized MathJax/canvas-settle wait in `captureView`, a cache-prereq pre-flight, and a hard-fail family-routing assertion (canvas/svg evidence required) for the 2 Chapter 2+ lesson views.

Rebaseline rollout: 3 commits (code-only pixel-neutral → mask + targeted existing-baseline rebake → new view definitions + new baselines + report). Then PR.

**Tech Stack:** Node.js (built-ins only — no Express, no body-parser), Playwright (chromium), pixelmatch, pngjs.

**Source spec:** `docs/superpowers/specs/2026-06-22-harness-expansion-design.md`.

**Files this plan touches:**

- Create: `tools/test-utils.js` — shared Playwright bootstrap helpers (`MASK_CSS`, `waitForHealth`, `enterGuestMode`, `ensureSyllabusOpen`, `openSubtopic`, `openSubtopicInFreshGuest`, `resetLessonChromeState`, `assertOrThrow`, `settleLesson`).
- Modify: `tools/visual-diff.js` — `sharedViews` schema, lazy page-Map runner, context-level mask, new MathJax/canvas wait, 9 new views, pre-flight cache check, candidate-fallback machinery, Dispatcher-coverage summary in report.
- Modify: `tools/smoke.js` — import shared helpers from `tools/test-utils.js` (delete local copies).
- Modify: `app/app.js` — 3 one-line `window.*` exports near `decodeBase64Utf8` (L1058), `parseBase64JsonAttr` (L1074), and `inferInteractiveDemoFamily` (L1616) with comments tying them to the harness.
- Create: `tools/visual-baseline/10-*.png` … `18-*.png` (9 new PNGs).
- May modify: `tools/visual-baseline/01-*.png` … `09-*.png` (only the ones the new mask rules visibly affect — typically view 09 because it focuses `#learnFollowupBar` input).
- Create: `tools/visual-diff-coverage.json` — persists chosen `sectionId` + asserted family per Page C view (audit trail for candidate fallbacks).

---

## Task 1: Pre-flight verification

**Files:** read-only.

- [ ] **Step 1: Verify required lesson cache files exist on disk.**

Run from repo root:

```bash
ls workspace/materials/lesson-cache/3_8-1/new__aquarius_visual_latex_v2.aquarius_visual_latex_v2.en.md \
   workspace/materials/lesson-cache/4_11-1/new__aquarius_visual_latex_v2.aquarius_visual_latex_v2.en.md
```

Expected: both paths exist (no `No such file`). If either is missing, stop and `npm run pregen:bg-ch1` (or copy from a teammate) before proceeding — the harness's Page C views will hard-fail otherwise.

- [ ] **Step 2: Confirm chromium is installed for Playwright.**

```bash
node -e "require('playwright').chromium.executablePath() && console.log('chromium-ok')"
```

Expected: prints `chromium-ok`. If it throws `Executable doesn't exist`, run `npx playwright install chromium` first.

- [ ] **Step 3: Capture starting state.**

```bash
node tools/visual-diff.js --check && echo "BASELINE-CLEAN"
```

Expected: prints `BASELINE-CLEAN`. All 9 existing views diff at 0.000%. If they don't, the existing baseline is dirty — investigate before starting; do not begin restructure on a moving baseline.

- [ ] **Step 4: Verify the three app.js identifiers exist at the expected lines (will shift if app.js is edited between session start and this task).**

```bash
grep -nE '^(function decodeBase64Utf8|function parseBase64JsonAttr|function inferInteractiveDemoFamily)' app/app.js
```

Expected: three matches. Note the line numbers — Task 4 will edit each.

---

## Task 2: Create `tools/test-utils.js`

**Files:**
- Create: `tools/test-utils.js`

This task extracts the helpers currently duplicated between `tools/visual-diff.js` and `tools/smoke.js`. After this task, both consumers will import from the new module (smoke.js in Task 3, visual-diff.js in Task 5).

- [ ] **Step 1: Create the new module with the consolidated helper set.**

Create `tools/test-utils.js` with this content (one canonical implementation per helper — copy verbatim, do not paraphrase signatures):

```js
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
```

- [ ] **Step 2: Static-check the new module.**

```bash
node --check tools/test-utils.js
```

Expected: silent (exit 0). Any syntax error: fix in place.

- [ ] **Step 3: Confirm the module loads without throwing.**

```bash
node -e "const u = require('./tools/test-utils.js'); console.log(Object.keys(u).join(','))"
```

Expected: `MASK_CSS,waitForHealth,enterGuestMode,ensureSyllabusOpen,openSubtopic,openSubtopicInFreshGuest,resetLessonChromeState,settleLesson,assertOrThrow,resolveLessonCachePath`.

- [ ] **Step 4: Do not commit yet** — commits are batched per the 3-commit rollout. (Commit 1 lands after Tasks 2–10.)

---

## Task 3: Convert `tools/smoke.js` to import from `tools/test-utils.js`

**Files:**
- Modify: `tools/smoke.js` (lines 50–86 cluster: `waitForHealth`, `enterGuestMode`, `ensureSyllabusOpen`, `openSubtopic`)

- [ ] **Step 1: Add the require near the top of `tools/smoke.js`** (immediately after the existing `chromium` require, around L21):

Insert this line:

```js
const { waitForHealth, enterGuestMode, ensureSyllabusOpen, openSubtopic } = require('./test-utils.js');
```

- [ ] **Step 2: Delete the now-duplicated function bodies** in `tools/smoke.js` for `waitForHealth`, `enterGuestMode`, `ensureSyllabusOpen`, `openSubtopic`. Leave SUBTOPICS, CONSOLE_NOISE, and the call sites unchanged.

- [ ] **Step 3: Update the 4 call sites in `tools/smoke.js`** to pass `BASE` to the helpers that now need it:

- `waitForHealth()` → `waitForHealth(BASE)`
- `enterGuestMode(page)` → `enterGuestMode(page, BASE)`
- `ensureSyllabusOpen(page)` → unchanged (no signature change)
- `openSubtopic(page, sub)` → unchanged (no signature change)

`grep -n` to locate every call site:

```bash
grep -n 'waitForHealth\|enterGuestMode\|ensureSyllabusOpen\|openSubtopic' tools/smoke.js
```

Update every call site that matches the changed signatures.

- [ ] **Step 4: Static-check smoke.js.**

```bash
node --check tools/smoke.js
```

Expected: silent exit 0.

- [ ] **Step 5: Run the smoke suite to confirm parity.**

```bash
node tools/smoke.js
```

Expected: every smoke check passes. If a check fails because a helper call site signature is wrong, fix in place and rerun. Do not proceed to Task 4 until smoke is green.

---

## Task 4: Add `window.*` exports in `app/app.js`

**Files:**
- Modify: `app/app.js` (3 single-line additions next to existing declarations)

The harness's family-routing eval depends on three identifiers being reachable from `window`. Make the exports unconditional + commented so a future module-extraction refactor (roadmap step F) can't silently break them.

- [ ] **Step 1: Add the `decodeBase64Utf8` export immediately after its declaration.**

Find the closing `}` of `function decodeBase64Utf8(raw)` around L1072 (verify with `grep -n 'function decodeBase64Utf8' app/app.js`).

Insert immediately after the closing brace:

```js
// Exposed for tools/visual-diff.js family-verification eval — do not remove
// without updating tools/test-utils.js / tools/visual-diff.js.
window.decodeBase64Utf8 = decodeBase64Utf8;
```

- [ ] **Step 2: Add the `parseBase64JsonAttr` export immediately after its declaration.**

Find its closing `}` (around L1080+; verify with `grep -n 'function parseBase64JsonAttr' app/app.js`).

Insert immediately after:

```js
// Exposed for tools/visual-diff.js family-verification eval — do not remove
// without updating tools/test-utils.js / tools/visual-diff.js.
window.parseBase64JsonAttr = parseBase64JsonAttr;
```

- [ ] **Step 3: Add the `inferInteractiveDemoFamily` export immediately after its declaration.**

Find its closing `}` near L1689 (verify with `grep -n 'function inferInteractiveDemoFamily' app/app.js`).

Insert immediately after:

```js
// Exposed for tools/visual-diff.js family-verification eval — do not remove
// without updating tools/test-utils.js / tools/visual-diff.js.
window.inferInteractiveDemoFamily = inferInteractiveDemoFamily;
```

- [ ] **Step 4: Static-check.**

```bash
npm run check
```

Expected: passes (the project's only static-check command — runs `node --check` on `ws-bridge.js` and `app.js`).

- [ ] **Step 5: Smoke-verify the exports are live.**

```bash
node tools/visual-diff.js --check 2>&1 | tail -20
```

Expected: existing 9 views still all pass at 0.000%. The new window globals exist but the harness doesn't use them yet — this is the pixel-neutral floor.

If a view diff regresses, the `app/app.js` edit landed elsewhere — `git diff app/app.js` and fix in place.

---

## Task 5: Refactor `tools/visual-diff.js` to use `{name, page, setup}` schema + lazy page Map

**Files:**
- Modify: `tools/visual-diff.js` (sharedViews definition + runner loop + bridge teardown)

This is the load-bearing structural change. After this task, the runner can dispatch new views to Pages B and C without further restructuring.

- [ ] **Step 1: Replace the inline helper imports.**

At the top of `tools/visual-diff.js`, find the current require block (around L19–24) and replace the inline helpers section (the `MASK_CSS` constant, `waitForHealth`, `enterGuestMode`, `ensureSyllabusOpen`, `openSubtopic` definitions later in the file) with this import line, placed immediately after the existing `pngjs` require:

```js
const {
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
} = require('./test-utils.js');
```

- [ ] **Step 2: Delete the now-duplicated `MASK_CSS` constant and helper functions.**

In `tools/visual-diff.js`, delete:
- The `MASK_CSS` template literal block (around L48–L56).
- `function waitForHealth(...)` (around L155–L167).
- `async function enterGuestMode(page) { ... }` (around L169–L176).
- `async function ensureSyllabusOpen(page) { ... }` (around L178–L189).
- `async function openSubtopic(page, sub, waitMs = 25000) { ... }` (around L191–L222).

Leave SUBTOPIC, view definitions, `readPng`/`comparePng`, and the main runner.

- [ ] **Step 3: Update every internal call site to match the new signatures.**

Replace:
- `waitForHealth()` → `waitForHealth(BASE)` (one call inside the runner).
- `enterGuestMode(page)` → `enterGuestMode(page, BASE)` (one call inside the runner).

```bash
grep -n 'waitForHealth\|enterGuestMode' tools/visual-diff.js
```

Update each call. `ensureSyllabusOpen` and `openSubtopic` keep their existing signatures.

- [ ] **Step 4: Convert `sharedViews` from `{name, setup}` to `{name, page, setup}`.**

For every existing view in the `sharedViews` array (01 through 09), add `page: 'A',` immediately after `name`. Do not change setup bodies. Example:

```js
{ name: '01-guest-home', page: 'A', setup: async (page) => {
    await page.evaluate(() => { ... });
    await page.waitForTimeout(300);
} },
```

- [ ] **Step 5: Replace the per-page runner with a lazy `Map<pageKey, Page>` bootstrap.**

Find the runner block at the bottom of `tools/visual-diff.js` (around L264–L309). Replace the section from `const sharedPage = await browser.newPage(...)` through `await sharedPage.close().catch(() => {});` with this structured pattern:

```js
        // One BrowserContext owns the MASK_CSS via addInitScript so every page
        // derived from the context inherits the mask before first paint.
        const context = await browser.newContext({ viewport: VIEWPORT });
        await context.addInitScript(({ css }) => {
            const inject = () => {
                const s = document.createElement('style');
                s.textContent = css;
                document.head.appendChild(s);
            };
            if (document.head) inject();
            else document.addEventListener('DOMContentLoaded', inject);
        }, { css: MASK_CSS });

        // Lazy per-page bootstraps. Each pageKey is bootstrapped on first
        // request and reused for subsequent views with the same key.
        const PAGE_BOOTSTRAPS = {
            A: async () => {
                const p = await context.newPage();
                await enterGuestMode(p, BASE);
                return p;
            },
            B: async () => {
                const p = await context.newPage();
                await enterGuestMode(p, BASE);
                return p;
            },
            C: async () => {
                const p = await context.newPage();
                await enterGuestMode(p, BASE);
                return p;
            },
        };
        const pageMap = new Map();
        const getPage = async (key) => {
            if (pageMap.has(key)) return pageMap.get(key);
            const factory = PAGE_BOOTSTRAPS[key];
            if (!factory) throw new Error(`unknown page key "${key}"`);
            const p = await factory();
            pageMap.set(key, p);
            return p;
        };

        for (const view of sharedViews) {
            const pageKey = view.page || 'A';
            const page = await getPage(pageKey);
            await captureView(view, page);
        }

        for (const p of pageMap.values()) {
            await p.close().catch(() => {});
        }
        await context.close().catch(() => {});
        await browser.close();
```

- [ ] **Step 6: Centralize the settle wait inside `captureView`.**

Find the existing `captureView` function inside the runner (around L267–L293). Locate the line `await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});` and replace it with a single `settleLesson` call:

```js
                await settleLesson(page);
```

This replaces the existing fonts-only wait with the full MathJax + 2× rAF + slack wait. Existing views 01–09 should still pass at 0.000% because settle is additive (waits for MORE conditions, never fewer).

- [ ] **Step 7: Replace the 500ms post-SIGTERM sleep with a deterministic `exit` wait.**

Find the `finally` block at the bottom of the runner (around L306–L309). Replace:

```js
    } finally {
        server.kill('SIGTERM');
        await new Promise(r => setTimeout(r, 500));
    }
```

with:

```js
    } finally {
        server.kill('SIGTERM');
        await new Promise((resolve) => {
            const t = setTimeout(resolve, 2000);
            server.once('exit', () => { clearTimeout(t); resolve(); });
        });
    }
```

- [ ] **Step 8: Static-check.**

```bash
node --check tools/visual-diff.js
```

Expected: silent exit 0.

- [ ] **Step 9: Run --check to confirm pixel-neutral restructure.**

```bash
node tools/visual-diff.js --check
```

Expected: all 9 existing views pass at 0.000%. If any view shifts, the restructure inadvertently changed timing or context — diagnose via the per-view diff PNG in `tools/visual-diff/`. Do NOT proceed to mask additions until restructure is pixel-neutral.

---

## Task 6: Add the cache pre-flight check + candidate-fallback declaration

**Files:**
- Modify: `tools/visual-diff.js` (new constant near the top + pre-flight inside runner)

This makes Page C views fail loudly on cache miss instead of timing out at the 25-second mark on a "section not prepared" banner.

- [ ] **Step 1: Add the `PAGE_C_VIEWS` constant near the top of `tools/visual-diff.js`** (after the `SUBTOPIC` const, around L60):

```js
// Page C lesson candidates per view. Each view tries candidates in order;
// the first whose hydrated demos include `expected` family is used.
// On swap, the view file MUST be renamed to reflect the actual family
// (see docs/superpowers/specs/2026-06-22-harness-expansion-design.md).
const PAGE_C_VIEWS = [
    {
        viewName: '17-lesson-convolution',
        candidates: [
            { sectionId: '3.8-1', expected: 'convolution_lab',
              chapter: 'Chapter 3: Time-Domain Analysis of Discrete-Time Systems',
              section: '3.8 System Response to External Input: The Zero-State Response',
              title:   '3.8-1 Graphical Procedure for the Convolution Sum' },
            { sectionId: '3.8-2', expected: 'convolution_lab',
              chapter: 'Chapter 3: Time-Domain Analysis of Discrete-Time Systems',
              section: '3.8 System Response to External Input: The Zero-State Response',
              title:   '3.8-2 Interconnected Systems' },
            { sectionId: '3.8-3', expected: 'convolution_lab',
              chapter: 'Chapter 3: Time-Domain Analysis of Discrete-Time Systems',
              section: '3.8 System Response to External Input: The Zero-State Response',
              title:   '3.8-3 Total Response' },
        ],
    },
    {
        viewName: '18-lesson-pole-zero-roc',
        candidates: [
            { sectionId: '4.11-1', expected: 'pole_zero_roc_lab',
              chapter: 'Chapter 4: Continuous-Time System Analysis Using the Laplace Transform',
              section: '4.11 The Bilateral Laplace Transform',
              title:   '4.11-1 Properties of the Bilateral Laplace Transform' },
            { sectionId: '4.11-2', expected: 'pole_zero_roc_lab',
              chapter: 'Chapter 4: Continuous-Time System Analysis Using the Laplace Transform',
              section: '4.11 The Bilateral Laplace Transform',
              title:   '4.11-2 Using the Bilateral Transform for Linear System Analysis' },
        ],
    },
];

const COVERAGE_REPORT_PATH = path.join(TOOLS, 'visual-diff-coverage.json');
```

- [ ] **Step 2: Add a `preFlightCacheCheck` function near the diff-core block** (after `comparePng`, before the runner IIFE):

```js
function preFlightCacheCheck(repoRoot) {
    const missing = [];
    for (const view of PAGE_C_VIEWS) {
        for (const candidate of view.candidates) {
            const resolved = resolveLessonCachePath(repoRoot, candidate.sectionId);
            if (!resolved) missing.push(`${view.viewName} candidate ${candidate.sectionId}`);
        }
    }
    if (missing.length === PAGE_C_VIEWS.reduce((n, v) => n + v.candidates.length, 0)) {
        throw new Error('cache missing for ALL Page C candidates — run pregen or sync workspace/materials/lesson-cache/ before --baseline or --check');
    }
    if (missing.length > 0) {
        console.warn(`[visual-diff] cache missing for some candidates (will be skipped during fallback): ${missing.join(', ')}`);
    }
}
```

- [ ] **Step 3: Call `preFlightCacheCheck(repoRoot)` at the top of the runner IIFE**, immediately after the `const repoRoot = ...` line:

```js
    preFlightCacheCheck(repoRoot);
```

- [ ] **Step 4: Static-check + re-run --check** (still no new views, so 9 should still pass):

```bash
node --check tools/visual-diff.js && node tools/visual-diff.js --check
```

Expected: 9 views at 0.000%. The pre-flight runs but Page C views don't exist yet so it's no-op against the existing run. If pre-flight throws, the `resolveLessonCachePath` chain is wrong — `git diff tools/test-utils.js` and fix.

---

## Task 7: Commit 1 — pixel-neutral restructure

**Files:** none new in this task; commits the work from Tasks 2–6.

- [ ] **Step 1: Inspect what's about to be committed.**

```bash
git status
git diff --stat
```

Expected: 3 modified (`tools/visual-diff.js`, `tools/smoke.js`, `app/app.js`), 1 new (`tools/test-utils.js`). No PNG changes.

- [ ] **Step 2: Re-confirm both suites pass.**

```bash
node tools/smoke.js && node tools/visual-diff.js --check
```

Expected: smoke green; visual-diff 9/9 at 0.000%. If either fails, fix BEFORE committing — do not commit a broken floor.

- [ ] **Step 3: Stage and commit.**

```bash
git add tools/test-utils.js tools/smoke.js tools/visual-diff.js app/app.js
git commit -m "$(cat <<'EOF'
test(harness): extract test-utils + restructure visual-diff for multi-page

Foundation commit for Phase 3.5 harness expansion (see
docs/superpowers/specs/2026-06-22-harness-expansion-design.md and the
companion plan). Pixel-neutral: --check still passes 9/9 at 0.000% against
the existing baseline.

- Create tools/test-utils.js with shared Playwright helpers
  (MASK_CSS, waitForHealth, enterGuestMode, ensureSyllabusOpen,
  openSubtopic, openSubtopicInFreshGuest, resetLessonChromeState,
  settleLesson, assertOrThrow, resolveLessonCachePath). Removes the
  "kept independent on purpose" duplication tax with smoke.js.
- tools/smoke.js + tools/visual-diff.js import the shared helpers.
- visual-diff.js: sharedViews entries gain a `page: 'A'` field; runner
  uses one BrowserContext (mask via addInitScript so derived pages
  inherit it) and a lazy Map<pageKey, Page> bootstrap (A/B/C). Sets up
  the structural prereq for views 10-18.
- captureView() now awaits settleLesson() (MathJax + fonts + 2x rAF +
  slack) before screenshot, replacing the fonts-only wait. Additive —
  pixel-neutral.
- Bridge teardown waits for actual 'exit' event (with 2s timeout race)
  instead of unconditional 500ms sleep.
- :has-text chapter match replaced with exact-text + .count() === 1
  assertion in openSubtopic to prevent future "Chapter 4" vs
  "Chapter 14" prefix-match flake.
- app/app.js: window.decodeBase64Utf8 / window.parseBase64JsonAttr /
  window.inferInteractiveDemoFamily exported for the upcoming family-
  verification eval. Each annotated with a comment naming the consumer.
- Pre-flight cache check + PAGE_C_VIEWS candidate-fallback declaration
  added; not yet wired into a view setup.

Next commits in the same PR: (2) mask additions + targeted rebake of
existing baselines moved by the new masks; (3) view definitions 10-18
+ new baselines + Dispatcher coverage report block.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Diagnose which existing baselines move under the new MASK_CSS

**Files:** none modified. Inspection task.

The new mask rules (`.feedback-thread-meta`, `.feedback-reply-meta`, scoped caret, `.home-mode-menu.show` transition guard) already landed in `tools/test-utils.js` MASK_CSS via Task 2. Task 7's `--check` passed because none of the existing views render `.feedback-thread-meta` or focus `#userInput` in the baseline path that's currently captured. View 09 focuses `#learnFollowupBar input/textarea` (visual-diff.js view 09 setup) — the caret mask WILL likely zero a caret pixel cluster there.

- [ ] **Step 1: Run `--check` and capture the per-view diff ratios.**

```bash
node tools/visual-diff.js --check 2>&1 | tail -30
```

Inspect `tools/visual-diff-report.md`. For each view with a non-zero ratio, open `tools/visual-diff/<viewName>.png` and verify the diff pixels are caret-related (one or two cells of color near the focused input position). If yes → mask is working as intended on that view. If no → an unrelated regression slipped in; halt and investigate before continuing.

- [ ] **Step 2: List the existing views that moved.**

Read `tools/visual-diff-report.md`. List the views in `status: fail` (or with non-zero ratio if any are sub-threshold). Each is a candidate for targeted rebake.

Expected outcome: typically only view 09 moves; possibly view 04 (recent conversations has search-like UI but no input focus by default). Anything else needs an explanation.

- [ ] **Step 3: Note the list for Task 9.**

If the list is empty (no existing view moved), skip Task 9 and proceed directly to Task 10 — no rebake needed, no commit 2 to make.

---

## Task 9: Targeted rebake of mask-affected existing baselines (commit 2)

**Files:**
- Modify (only for moved views): `tools/visual-baseline/<viewName>.png`

- [ ] **Step 1: For each moved view, rebake by capturing fresh.**

The current `--baseline` flag rebakes ALL views. To rebake only specific views, run `--baseline` and then `git checkout` the unmoved PNGs to preserve byte-identity:

```bash
node tools/visual-diff.js --baseline
# Restore unmoved baselines so commit diff is minimal:
git checkout tools/visual-baseline/01-guest-home.png \
             tools/visual-baseline/02-syllabus-open.png \
             tools/visual-baseline/03-mistake-notebook.png \
             tools/visual-baseline/04-recent-conversations.png \
             tools/visual-baseline/05-settings.png \
             tools/visual-baseline/06-lesson-view.png \
             tools/visual-baseline/07-lesson-pager-states.png \
             tools/visual-baseline/08-lesson-lecture-toolbar.png
# Keep 09 (or whatever Task 8 surfaced).
```

Adjust the `git checkout` list: remove any view that Task 8 confirmed moved (so its rebake stays), keep every view that did NOT move.

- [ ] **Step 2: Verify rebake-then-check passes.**

```bash
node tools/visual-diff.js --check
```

Expected: all 9 existing views at 0.000%. If any baseline still shows non-zero diff after rebake, the mask is unstable — investigate before proceeding.

- [ ] **Step 3: Inspect the staged change.**

```bash
git status
git diff --stat tools/visual-baseline/
```

Expected: a small number (1–3) modified PNGs.

- [ ] **Step 4: Commit.**

```bash
git add tools/visual-baseline/
git commit -m "$(cat <<'EOF'
test(harness): rebake existing baselines moved by new MASK_CSS rules

Targeted rebake — only baselines that visibly moved when the new mask
rules landed in tools/test-utils.js are refreshed. Unmoved PNGs are
byte-identical to commit 1.

Justifications per modified view:
- view 09 (lesson-qa-column): focuses #learnFollowupBar input/textarea;
  the new `input, textarea, [contenteditable=true] { caret-color:
  transparent !important }` mask zeros the caret pixel cluster captured
  in the previous baseline. Expected mask side-effect.

[Update list above per actual Task 8 findings. If a view's motion is
NOT explained by the mask, do not include it here — investigate first.]

Companion: docs/superpowers/specs/2026-06-22-harness-expansion-design.md
§Rebaseline rollout.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

Edit the justification list in the commit message to reflect Task 8's actual findings before committing.

---

## Task 10: Add view 10 — `10-home-ask-focused` (Page B)

**Files:**
- Modify: `tools/visual-diff.js` (append to `sharedViews`)

- [ ] **Step 1: Append the view definition.**

Insert at the end of the `sharedViews` array, immediately before the closing `]`:

```js
    // View 10 — Page B — focuses #userInput inside #searchBox.home-ask-composer
    // so the :focus-within cascade fires on the composer (10 #20c top-4 sites).
    // #searchBox itself is a <div> and not focusable — focusing the inner
    // textarea is what triggers :focus-within.
    { name: '10-home-ask-focused', page: 'B', setup: async (page) => {
        // Close any feature popovers and reset menu state.
        await page.evaluate(() => {
            document.querySelectorAll('.feature-close-btn').forEach(b => {
                if (b.offsetParent !== null) b.click();
            });
            document.getElementById('homeModeMenu')?.classList.remove('show');
        });
        await page.focus('#userInput');
        const focused = await page.evaluate(() =>
            !!document.querySelector('#searchBox.home-ask-composer')?.matches(':focus-within')
        );
        assertOrThrow(focused, 'view 10: #searchBox.home-ask-composer does not match :focus-within after focusing #userInput');
        await page.waitForTimeout(150);
    } },
```

- [ ] **Step 2: Static-check.**

```bash
node --check tools/visual-diff.js
```

Expected: silent exit 0.

- [ ] **Step 3: Baseline-capture view 10.**

```bash
node tools/visual-diff.js --baseline
```

Expected: prints `✓ 10-home-ask-focused`. The Page B bootstrap also runs (one new browser page); existing views 01–09 also re-capture (byte-identical because no mask change).

If the assertion in setup throws, the focus didn't take — inspect `tools/visual-baseline/10-home-ask-focused.png` to confirm composer chrome is visible and `#userInput` exists in the DOM.

- [ ] **Step 4: Verify --check finds view 10.**

```bash
node tools/visual-diff.js --check
```

Expected: view 10 passes at 0.000%. If not, the capture is unstable — diagnose before adding view 11.

---

## Task 11: Add view 11 — `11-home-mode-menu-open` (Page B)

**Files:**
- Modify: `tools/visual-diff.js` (append to `sharedViews`)

- [ ] **Step 1: Append the view definition** immediately after view 10:

```js
    // View 11 — Page B — forces #homeModeMenu.home-mode-menu.show via
    // classList.add (bypasses #homeModeToggleBtn click handler so a stray
    // document.click cannot auto-close the menu mid-screenshot). The
    // MASK_CSS .home-mode-menu.show transition guard ensures we don't
    // capture mid-transition.
    { name: '11-home-mode-menu-open', page: 'B', setup: async (page) => {
        await page.evaluate(() => {
            // Reset composer focus from previous view; otherwise the focused
            // textarea cursor leaks into this capture.
            document.activeElement?.blur?.();
            const menu = document.getElementById('homeModeMenu');
            const toggle = document.getElementById('homeModeToggleBtn');
            menu?.classList.add('show');
            toggle?.setAttribute('aria-expanded', 'true');
        });
        const open = await page.evaluate(() =>
            document.getElementById('homeModeMenu')?.classList.contains('show')
        );
        assertOrThrow(open, 'view 11: #homeModeMenu does not have .show class after forcing');
        await page.waitForTimeout(200);
    } },
```

- [ ] **Step 2: Static-check + baseline-capture + verify.**

```bash
node --check tools/visual-diff.js && node tools/visual-diff.js --baseline && node tools/visual-diff.js --check 2>&1 | tail -15
```

Expected: view 11 passes at 0.000%. If the menu isn't visible in the captured PNG, `#homeModeToggleBtn` may be hidden in guest mode — inspect the DOM via:

```bash
node -e "(async () => {
  const { chromium } = require('playwright');
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('http://127.0.0.1:9125', { waitUntil: 'domcontentloaded' });
  console.log(await p.evaluate(() => !!document.getElementById('homeModeToggleBtn')));
  await b.close();
})()"
```

(Spin up the bridge separately if needed.)

---

## Task 12: Add view 12 — `12-preference-page` (Page B)

**Files:**
- Modify: `tools/visual-diff.js` (append to `sharedViews`)

- [ ] **Step 1: Append the view definition** immediately after view 11:

```js
    // View 12 — Page B — preference profile resting state.
    { name: '12-preference-page', page: 'B', setup: async (page) => {
        await page.evaluate(() => {
            document.getElementById('homeModeMenu')?.classList.remove('show');
        });
        await page.click('#navPreferenceBtn');
        await page.waitForSelector('#preferenceView:not(.hidden)', { timeout: 5000 });
        // Wait for the markdown preview to render at least one signal block.
        await page.waitForSelector('#preferenceProfilePreview', { timeout: 5000 });
        await page.waitForTimeout(300);
    } },
```

- [ ] **Step 2: Static-check + baseline + verify.**

```bash
node --check tools/visual-diff.js && node tools/visual-diff.js --baseline && node tools/visual-diff.js --check 2>&1 | tail -15
```

Expected: view 12 passes at 0.000%.

---

## Task 13: Add view 13 — `13-course-tracker` (Page B)

**Files:**
- Modify: `tools/visual-diff.js` (append to `sharedViews`)

- [ ] **Step 1: Append the view definition** immediately after view 12:

```js
    // View 13 — Page B — course tracker resting state.
    { name: '13-course-tracker', page: 'B', setup: async (page) => {
        await page.click('#navCourseTrackerBtn');
        await page.waitForSelector('#courseTrackerView:not(.hidden)', { timeout: 5000 });
        // Tracker table renders synchronously from COURSE_SCHEDULE — wait for
        // at least one row.
        await page.waitForFunction(
            () => document.querySelectorAll('#courseTrackerTableBody tr').length > 0,
            { timeout: 5000 }
        );
        await page.waitForTimeout(200);
    } },
```

- [ ] **Step 2: Static-check + baseline + verify.**

```bash
node --check tools/visual-diff.js && node tools/visual-diff.js --baseline && node tools/visual-diff.js --check 2>&1 | tail -15
```

Expected: view 13 passes at 0.000%.

---

## Task 14: Add view 14 — `14-feedback-board` (Page B)

**Files:**
- Modify: `tools/visual-diff.js` (append to `sharedViews`)

- [ ] **Step 1: Append the view definition** immediately after view 13:

```js
    // View 14 — Page B — feedback board resting state. loadFeedbackBoard()
    // is async; wait until the "Loading suggestions..." placeholder is gone.
    { name: '14-feedback-board', page: 'B', setup: async (page) => {
        await page.click('#navFeedbackBtn');
        await page.waitForSelector('#feedbackView:not(.hidden)', { timeout: 5000 });
        await page.waitForFunction(() => {
            const v = document.getElementById('feedbackView');
            if (!v || v.classList.contains('hidden')) return false;
            return !v.textContent.includes('Loading suggestions');
        }, { timeout: 10000 });
        await page.waitForTimeout(300);
    } },
```

- [ ] **Step 2: Static-check + baseline + verify.**

```bash
node --check tools/visual-diff.js && node tools/visual-diff.js --baseline && node tools/visual-diff.js --check 2>&1 | tail -15
```

Expected: view 14 passes at 0.000%. If feedback fetch fails (network), the placeholder stays — verify the bridge `/api/feedback` endpoint responds.

---

## Task 15: Add view 15 — `15-lesson-chapter-overview` (Page A)

**Files:**
- Modify: `tools/visual-diff.js` (append to `sharedViews`)

- [ ] **Step 1: Append the view definition** immediately after view 14:

```js
    // View 15 — Page A — forces learnBody.classList.add('chapter-overview-active')
    // to flip the `:not(.chapter-overview-active)` negation that 30+ #20a rules
    // toggle against. Runs after view 09 (qa-full state) — uses
    // resetLessonChromeState to recover.
    { name: '15-lesson-chapter-overview', page: 'A', setup: async (page) => {
        await resetLessonChromeState(page);
        await page.evaluate(() => {
            document.getElementById('learnBody')?.classList.add('chapter-overview-active');
            if (typeof window.__ftutorRefreshPager === 'function') window.__ftutorRefreshPager();
        });
        await page.waitForTimeout(300);
    } },
```

- [ ] **Step 2: Static-check + baseline + verify.**

```bash
node --check tools/visual-diff.js && node tools/visual-diff.js --baseline && node tools/visual-diff.js --check 2>&1 | tail -15
```

Expected: view 15 passes at 0.000%. The captured PNG should show distinctly different lesson chrome from view 06 (overview-mode treatment).

---

## Task 16: Add view 16 — `16-lesson-chapter-overview-split` (Page A)

**Files:**
- Modify: `tools/visual-diff.js` (append to `sharedViews`)

- [ ] **Step 1: Append the view definition** immediately after view 15:

```js
    // View 16 — Page A — forces learnBody.classList.add('chapter-overview-split-active')
    // — companion to view 15, exercises the split-active class negations.
    // resetLessonChromeState removes chapter-overview-active from view 15
    // before adding split-active so the captures stay distinct.
    { name: '16-lesson-chapter-overview-split', page: 'A', setup: async (page) => {
        await resetLessonChromeState(page);
        await page.evaluate(() => {
            document.getElementById('learnBody')?.classList.add('chapter-overview-split-active');
            if (typeof window.__ftutorRefreshPager === 'function') window.__ftutorRefreshPager();
        });
        await page.waitForTimeout(300);
    } },
```

- [ ] **Step 2: Static-check + baseline + verify.**

```bash
node --check tools/visual-diff.js && node tools/visual-diff.js --baseline && node tools/visual-diff.js --check 2>&1 | tail -15
```

Expected: view 16 passes at 0.000%.

---

## Task 17: Add the family-routing eval helper

**Files:**
- Modify: `tools/visual-diff.js` (new helper between the diff core and runner)

This adds the hard-fail family-routing assertion that views 17/18 rely on. Per spec: cache-miss guard → all-KP walk → canvas/svg evidence → family-set assertion.

- [ ] **Step 1: Add the helper above the runner IIFE.**

Insert after `function preFlightCacheCheck(...)`:

```js
// Walk every knowledge-point page in the currently-loaded lesson, accumulate
// the set of inferred families for hydrated `.kc-interactive-demo` nodes that
// also have a child <canvas> or <svg> (proof a family-specific renderer
// painted, not the brief-fallback). Throws on cache-miss or empty hydration.
async function collectLessonFamilies(page) {
    const text = await page.locator('#learnExplainContent').innerText().catch(() => '');
    if (text.includes('This section has not been prepared yet')) {
        throw new Error('cache miss — lesson rendered the "section not prepared" banner');
    }

    const families = new Set();
    const seenKpKeys = new Set();
    const maxIters = 25; // safety against infinite loops on broken pagers
    for (let i = 0; i < maxIters; i++) {
        await settleLesson(page);
        // Collect families on the current KP page.
        const pageFamilies = await page.evaluate(() => {
            if (typeof window.inferInteractiveDemoFamily !== 'function') {
                throw new Error('window.inferInteractiveDemoFamily missing — app.js export removed?');
            }
            if (typeof window.parseBase64JsonAttr !== 'function') {
                throw new Error('window.parseBase64JsonAttr missing — app.js export removed?');
            }
            const out = [];
            document.querySelectorAll('.kc-interactive-demo').forEach((n) => {
                if (n.dataset.hydrated !== '1') return;
                if (!n.querySelector('canvas, svg')) return;
                const b64 = n.dataset.demoB64 || n.getAttribute('data-demo-b64');
                const demo = window.parseBase64JsonAttr(b64);
                if (!demo) return;
                out.push(window.inferInteractiveDemoFamily(demo));
            });
            return out;
        });
        pageFamilies.forEach((f) => families.add(f));

        // Record current KP signature to detect end-of-pager.
        const kpKey = await page.evaluate(() => {
            const ind = document.getElementById('learnLecturePageIndicator');
            return ind ? ind.textContent : null;
        });
        if (kpKey && seenKpKeys.has(kpKey)) break; // pager looped back
        if (kpKey) seenKpKeys.add(kpKey);

        // Try to advance to the next KP. If pager is at-end, the button is
        // disabled — bail.
        const advanced = await page.evaluate(() => {
            const btn = document.querySelector('#learnKpNextBtn:not([disabled])');
            if (!btn) return false;
            btn.click();
            return true;
        });
        if (!advanced) break;
        await page.waitForTimeout(300);
    }
    return families;
}
```

- [ ] **Step 2: Static-check.**

```bash
node --check tools/visual-diff.js
```

Expected: silent exit 0.

---

## Task 18: Add view 17 — `17-lesson-convolution` (Page C)

**Files:**
- Modify: `tools/visual-diff.js` (append to `sharedViews` + update coverage report write)

- [ ] **Step 1: Append the view definition** immediately after view 16:

```js
    // View 17 — Page C — Chapter 3 §3.8-1 with hard-asserted family routing
    // to convolution_lab. Tries candidates in PAGE_C_VIEWS[0].candidates
    // in order; on success the chosen section ID + asserted family are
    // written to tools/visual-diff-coverage.json + the dispatcher-coverage
    // report block.
    { name: '17-lesson-convolution', page: 'C', setup: async (page) => {
        const view = PAGE_C_VIEWS.find(v => v.viewName === '17-lesson-convolution');
        assertOrThrow(view, 'view 17 missing from PAGE_C_VIEWS');
        let lastErr;
        for (const candidate of view.candidates) {
            if (!resolveLessonCachePath(path.resolve(__dirname, '..'), candidate.sectionId)) {
                continue;
            }
            try {
                // Reset by reopening fresh — page C may have stale lesson from prior candidate.
                await page.goto(BASE, { waitUntil: 'domcontentloaded' });
                await enterGuestMode(page, BASE);
                await openSubtopic(page, {
                    chapter: candidate.chapter,
                    section: candidate.section,
                    title: candidate.title,
                });
                const families = await collectLessonFamilies(page);
                if (!families.has(candidate.expected)) {
                    lastErr = new Error(`expected ${candidate.expected}, got [${Array.from(families).join(',')}]`);
                    continue;
                }
                __pageCResults.push({ viewName: view.viewName, sectionId: candidate.sectionId,
                    expected: candidate.expected, families: Array.from(families) });
                return; // success
            } catch (err) {
                lastErr = err;
            }
        }
        throw new Error(`view 17 exhausted candidates: ${lastErr && lastErr.message}`);
    } },
```

- [ ] **Step 2: Declare the `__pageCResults` collector near the top of the runner IIFE.**

Find the runner IIFE (`(async () => { ... })()`). Add this declaration immediately after `const repoRoot = ...`:

```js
    const __pageCResults = [];
    // Hoist into module scope so view setups can push without closure mess.
    global.__pageCResults = __pageCResults;
```

Then in view 17 (and view 18 in Task 19), `__pageCResults` references this collector via `global.__pageCResults`.

Alternative: declare `let __pageCResults = [];` at module top (above `(async () => {`). Pick whichever fits cleaner; declare it BEFORE any view setup references it.

- [ ] **Step 3: Static-check + baseline + verify.**

```bash
node --check tools/visual-diff.js && node tools/visual-diff.js --baseline && node tools/visual-diff.js --check 2>&1 | tail -20
```

Expected: view 17 passes at 0.000% AND prints (via the soon-to-be-added coverage block) `17-lesson-convolution → sectionId=3.8-1, family=convolution_lab`.

If the family assertion throws ("expected convolution_lab, got [...]"), the regex priority at `inferInteractiveDemoFamily` produced a different routing than predicted. Try the next candidate manually:

```bash
# Quick sanity check of what family the §3.8-1 cache content infers to:
grep -c -iE 'convol|sliding overlap|overlap.*sum' workspace/materials/lesson-cache/3_8-1/new__aquarius_visual_latex_v2.aquarius_visual_latex_v2.en.md
```

If the convolution regex hits zero, the cache content changed since the design step — promote the next candidate in `PAGE_C_VIEWS[0].candidates` to first, rename the view filename + table row, then re-run.

---

## Task 19: Add view 18 — `18-lesson-pole-zero-roc` (Page C)

**Files:**
- Modify: `tools/visual-diff.js` (append to `sharedViews`)

- [ ] **Step 1: Append the view definition** immediately after view 17:

```js
    // View 18 — Page C — Chapter 4 §4.11-1 with hard-asserted family routing
    // to pole_zero_roc_lab. Same candidate-fallback pattern as view 17.
    { name: '18-lesson-pole-zero-roc', page: 'C', setup: async (page) => {
        const view = PAGE_C_VIEWS.find(v => v.viewName === '18-lesson-pole-zero-roc');
        assertOrThrow(view, 'view 18 missing from PAGE_C_VIEWS');
        let lastErr;
        for (const candidate of view.candidates) {
            if (!resolveLessonCachePath(path.resolve(__dirname, '..'), candidate.sectionId)) {
                continue;
            }
            try {
                await page.goto(BASE, { waitUntil: 'domcontentloaded' });
                await enterGuestMode(page, BASE);
                await openSubtopic(page, {
                    chapter: candidate.chapter,
                    section: candidate.section,
                    title: candidate.title,
                });
                const families = await collectLessonFamilies(page);
                if (!families.has(candidate.expected)) {
                    lastErr = new Error(`expected ${candidate.expected}, got [${Array.from(families).join(',')}]`);
                    continue;
                }
                global.__pageCResults.push({ viewName: view.viewName, sectionId: candidate.sectionId,
                    expected: candidate.expected, families: Array.from(families) });
                return;
            } catch (err) {
                lastErr = err;
            }
        }
        throw new Error(`view 18 exhausted candidates: ${lastErr && lastErr.message}`);
    } },
```

- [ ] **Step 2: Static-check + baseline + verify.**

```bash
node --check tools/visual-diff.js && node tools/visual-diff.js --baseline && node tools/visual-diff.js --check 2>&1 | tail -20
```

Expected: view 18 passes at 0.000% AND coverage shows `18-lesson-pole-zero-roc → sectionId=4.11-1, family=pole_zero_roc_lab`.

If the assertion fails (likely candidate: `hasTransformRuleIntent` fires before `hasPoleRocIntent` and routes to `transform_rule_lab`), promote the next candidate (4.11-2) — and per spec, **rename the view file** to reflect the actually-routed family (e.g., `18-lesson-transform-rule.png`) to keep the file name + coverage auditable.

---

## Task 20: Add the Dispatcher coverage summary block to the report

**Files:**
- Modify: `tools/visual-diff.js` (extend the report writer at the end of the runner IIFE)

- [ ] **Step 1: Find the existing report writer** at the bottom of the runner IIFE (around the new line count post-Task 5; was L311–L322 originally) — the block that builds `lines` and writes `REPORT_PATH`.

- [ ] **Step 2: Append the Dispatcher coverage block + coverage.json write** immediately after `fs.writeFileSync(REPORT_PATH, lines.join('\n') + '\n');`:

```js
        // Dispatcher coverage summary — separate from the main table to keep
        // the per-view list dense rather than 16 empty cells.
        const coverageLines = ['', '## Dispatcher coverage', '',
            'Family-table renderer routing confirmed for the following Chapter 2+ views:',
            ''];
        if (global.__pageCResults && global.__pageCResults.length) {
            for (const r of global.__pageCResults) {
                coverageLines.push(`- **${r.viewName}** → sectionId \`${r.sectionId}\`, families seen \`[${r.families.join(', ')}]\`, asserted \`${r.expected}\` ✓`);
            }
        } else {
            coverageLines.push('- (no Page C views ran or all errored)');
        }
        fs.appendFileSync(REPORT_PATH, coverageLines.join('\n') + '\n');

        // Persist machine-readable coverage so a future regression run that
        // picks a different candidate is visible in `git diff`.
        const coverage = {
            generatedAt: 'static',  // not a timestamp — Workflow rule
            mode: MODE,
            entries: global.__pageCResults || [],
        };
        fs.writeFileSync(COVERAGE_REPORT_PATH, JSON.stringify(coverage, null, 2) + '\n');
```

- [ ] **Step 3: Static-check + run.**

```bash
node --check tools/visual-diff.js && node tools/visual-diff.js --check 2>&1 | tail -25
```

Expected: report ends with the new "Dispatcher coverage" section listing views 17 + 18 with their resolved sectionId and asserted family. `tools/visual-diff-coverage.json` is written.

- [ ] **Step 4: Inspect the new coverage artifact.**

```bash
cat tools/visual-diff-coverage.json
```

Expected: JSON listing the two Page C entries with their sectionId, asserted family, and families seen.

---

## Task 21: Commit 3 — new view definitions + baselines + report block

**Files:** none new in this task; commits work from Tasks 8 (if applicable), 10–20.

Wait — Task 9 already created commit 2 if any existing baselines moved. Tasks 10–20 each ran `--baseline` after adding their view; the baseline PNGs accumulated into the working tree as we went. This task makes ONE commit bundling all 9 new view PNGs + the visual-diff.js view additions + the coverage.json artifact + visual-diff-report.md.

- [ ] **Step 1: Confirm state.**

```bash
git status
git diff --stat
```

Expected:
- Modified: `tools/visual-diff.js` (new view entries + coverage writer).
- New: 9 PNGs in `tools/visual-baseline/` named `10-…` through `18-…`.
- New: `tools/visual-diff-coverage.json`.
- Modified: `tools/visual-diff-report.md` (rebuilt with all 18 views + dispatcher-coverage block).

- [ ] **Step 2: Final full-suite verification.**

```bash
node tools/visual-diff.js --check 2>&1 | tail -30
```

Expected: 18/18 views pass at 0.000%. Dispatcher-coverage block shows both Page C entries. If any view fails, halt and diagnose — do not commit a red harness.

- [ ] **Step 3: Stage and commit.**

```bash
git add tools/visual-diff.js tools/visual-baseline/ tools/visual-diff-coverage.json tools/visual-diff-report.md
git commit -m "$(cat <<'EOF'
test(harness): add 9 views — home-ask, sidebar, chapter-overview, dispatcher

Phase 3.5 harness expansion — final commit of 3. Brings the visual-diff
harness from 9 to 18 views per
docs/superpowers/specs/2026-06-22-harness-expansion-design.md.

New views:
- 10-home-ask-focused (Page B) — composer :focus-within via #userInput
- 11-home-mode-menu-open (Page B) — #homeModeMenu.show, forced via
  classList to bypass the document-click auto-close handler
- 12-preference-page, 13-course-tracker, 14-feedback-board (Page B) —
  resting-state coverage of #20b surfaces
- 15-lesson-chapter-overview (Page A) — flips
  learnBody.classList.add('chapter-overview-active') from inside §1.1-1
  to exercise the :not(.chapter-overview-active) negation that 30+ #20a
  rules toggle against
- 16-lesson-chapter-overview-split (Page A) — companion split-active flip
- 17-lesson-convolution (Page C) — Chapter 3 §3.8-1, hard-asserted family
  routing to convolution_lab via canvas/svg-evidence eval
- 18-lesson-pole-zero-roc (Page C) — Chapter 4 §4.11-1, hard-asserted
  family routing to pole_zero_roc_lab

Page C views walk every knowledge-point page, accumulate families from
hydrated demos that also have a child <canvas> or <svg> (proof a family-
specific renderer painted, not the brief-fallback), and assert the
expected family is present. The chosen sectionId + asserted family are
persisted to tools/visual-diff-coverage.json and rendered as a
"Dispatcher coverage" block below the main table in
visual-diff-report.md.

Unblocks Roadmap step B/C/D/E/F at PARTIAL — state-variant coverage and
the remaining 11 family keys remain deferred per the spec.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

## Task 22: Pre-PR sanity sweep

**Files:** none modified.

- [ ] **Step 1: Verify all three commits on the branch are accounted for.**

```bash
git log --oneline origin/main..HEAD
```

Expected: 2 or 3 commits (commit 1 always; commit 2 only if any existing baseline moved; commit 3 always). Each has a clear subject line referencing Phase 3.5 / harness.

- [ ] **Step 2: Full check + smoke once more.**

```bash
node tools/visual-diff.js --check && node tools/smoke.js
```

Expected: visual-diff 18/18 at 0.000%; smoke green.

- [ ] **Step 3: Verify the deferred punch-list is captured.**

Open `docs/superpowers/specs/2026-06-22-harness-expansion-design.md`. The §Deferred section lists 11 items. If any deferred item from the spec is missing from `docs/phase3_deferred.md`, copy it across now (separate doc commit — direct to main per project pattern). The 11 items are:

1. Per-view threshold overrides
2. Cross-viewport coverage
3. Authenticated-user (Clerk) views
4. Remaining 11 family-table keys
5. State-variant coverage on `.preference-*` / `.course-tracker-*` / `.feedback-board-*`
6. `#webSearchToggleBtnMain.home-ask-web-toggle` state variants
7. Pager `:focus-visible` / `:active`
8. Glass + chapter-overview surface coverage for step G
9. Login + intro page coverage for #20c Pass 2 D-tail + step E
10. Page C scaling refactor when family-key count grows
11. MathJax/canvas settle helper extraction

If any of these are missing from `docs/phase3_deferred.md`, add a "Phase 3.5 follow-ups" subsection that lists them. Commit directly to main with a `chore(phase-3.5)` prefix.

---

## Task 23: Open the PR

**Files:** none.

- [ ] **Step 1: Push the branch.**

If working in a worktree branch:

```bash
git push -u origin HEAD
```

If on main (per project pattern, planning docs go direct to main but feature work goes via PR — verify which branch you're on):

```bash
git branch --show-current
```

If on main, the implementation commits should have gone to a feature branch instead. Move them: create branch from current HEAD, reset main to origin/main, then push the feature branch.

- [ ] **Step 2: Open the PR via `gh`.**

```bash
gh pr create --title "Phase 3.5: visual-diff harness expansion (9 → 18 views)" --body "$(cat <<'EOF'
## Summary

- Expands `tools/visual-diff.js` from 9 to 18 views per the multi-lens-reviewed spec at `docs/superpowers/specs/2026-06-22-harness-expansion-design.md`.
- Closes the dispatcher-coverage gap on 2 of 13 `INTERACTIVE_DEMO_FAMILY_RENDERERS` keys (`convolution_lab`, `pole_zero_roc_lab`) with canvas/svg evidence — not just inference-fn-shared inference.
- Adds Home Ask `:focus-within` + mode-menu `.show` (top-4 #20c selectors), `#20b` resting-state surfaces (preference, course-tracker, feedback-board), and chapter-overview class-flip captures (#20a class negations).
- Extracts shared Playwright bootstrap helpers into new `tools/test-utils.js`, dedupes with `tools/smoke.js`.
- Adds 3 `window.*` exports in `app/app.js` for the family-routing eval; eval hard-fails (no silent try/catch) if any export goes missing in a future refactor.

## Roadmap impact

| Step | Status |
|---|---|
| B — PR #20a Pass 2 | partial unblock (pager state-variant deferred) |
| C — PR #20b Pass 2 | partial unblock (state-variants deferred) |
| D — PR #20c Pass 2 | partial unblock (web-toggle states + login/intro deferred) |
| E — banner deletion | partial unblock (login/intro selectors uncovered) |
| F — PR #21 Pass 2 | partial — 2/13 families covered |

Detailed deferred punch-list lives in the spec's §Deferred section and is mirrored in `docs/phase3_deferred.md` (added in same PR cycle).

## Test plan

- [x] `node tools/visual-diff.js --check` returns 18/18 at 0.000%
- [x] `node tools/smoke.js` green
- [x] `npm run check` green
- [x] `tools/visual-diff-coverage.json` shows 2 Page C entries with asserted families ✓
- [x] `tools/visual-diff-report.md` has a Dispatcher coverage block listing both Page C results
- [ ] Manual: open `app/index.html` in browser, verify the 3 `window.*` exports are non-undefined in DevTools console

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 3: Note the PR URL.**

The command prints the URL. Save it; the next phase (review + address + merge) starts from there per the user's standing directive.

---

## Self-review

Spec coverage check (each spec section → at least one task):

| Spec section | Implementing task(s) |
|---|---|
| Non-goals | (documentation only; preserved in spec, not re-implemented) |
| Stability invariants | Task 3 (smoke imports), Task 5 (sharedViews keeps 01–09 byte-stable), Task 22 final check |
| Architecture (Pages A/B/C) | Task 5 (lazy Map), Tasks 10–19 (view dispatch by `page` field) |
| Context-level MASK_CSS | Task 5 step 5 |
| Shared test utilities | Tasks 2 + 3 + 5 |
| View 10 → `:focus-within` | Task 10 |
| View 11 → forced `.show` | Task 11 |
| Views 12–14 → #20b surfaces | Tasks 12–14 |
| Views 15–16 → chapter-overview class flips | Tasks 15–16 |
| Family verification (cache-miss + KP walk + canvas/svg + assertion) | Task 17 (helper) + Tasks 18–19 (consumers) |
| Window exports | Task 4 |
| MASK_CSS additions | Task 2 (already in MASK_CSS string) |
| Threshold strategy | (unchanged; no task needed) |
| 3-commit rebaseline rollout | Tasks 7, 9, 21 |
| Error handling | Task 17 (collectLessonFamilies throws on cache-miss + missing-window); Tasks 18–19 (candidate exhaustion error) |
| Cache prerequisite | Task 1 (verification), Task 6 (pre-flight check) |
| Concurrency posture | Sequential in v1; spec acknowledges parallel as deferred — no task needed |
| What this PR unblocks (downgraded) | Task 23 PR body |
| Deferred punch-list | Task 22 step 3 |

Placeholder scan: none — every code step contains the exact lines to insert; every command names exact paths; every commit message is HEREDOC-ready.

Type consistency: helpers are named identically across tasks (`MASK_CSS`, `enterGuestMode`, `openSubtopic`, `settleLesson`, `resetLessonChromeState`, `assertOrThrow`, `resolveLessonCachePath`, `collectLessonFamilies`). The view collector is named `__pageCResults` and hoisted via `global` for cross-setup access.

Gaps: none found. Each spec requirement maps to one or more tasks.
