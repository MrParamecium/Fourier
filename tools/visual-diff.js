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
const {
    MASK_CSS,
    waitForHealth,
    enterGuestMode,
    ensureSyllabusOpen,
    openSubtopic,
    resetHomeChromeState,
    resetLessonChromeState,
    settleLesson,
    assertOrThrow,
    resolveLessonCachePath,
} = require('./test-utils.js');

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

const SUBTOPIC = { id: '1_1-1', title: '1.1-1 Signal Energy',
    chapter: 'Chapter 1: Signals and Systems',
    section: '1.1 Size of a Signal' };

// Page C lesson candidates per view. Each view tries candidates in order;
// the first whose hydrated demos include `expected` family is used.
// On swap, the view file MUST be renamed to reflect the actual family
// (see docs/superpowers/specs/2026-06-22-harness-expansion-design.md).
//
// chapter/section/title MUST match app/data/syllabus-data.js exactly;
// openSubtopic uses substring `hasText` + a `data-section` attr lookup.
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
            { sectionId: '3.11-4', expected: 'convolution_lab',
              chapter: 'Chapter 3: Time-Domain Analysis of Discrete-Time Systems',
              section: '3.11 MATLAB: Discrete-Time Signals and Systems',
              title:   '3.11-4 Discrete-Time Convolution' },
        ],
    },
    {
        viewName: '18-lesson-pole-zero-roc',
        candidates: [
            { sectionId: '4.11-1', expected: 'pole_zero_roc_lab',
              chapter: 'Chapter 4: Continuous-Time System Analysis Using the Laplace Transform',
              section: '4.11 The Bilateral Laplace Transform',
              title:   '4.11-1 Properties of the Bilateral Laplace Transform' },
            // 3.12 / 3.13 are present in cache but live as section-level
            // entries (no `subsections` in syllabus-data.js), so openSubtopic
            // cannot navigate to them with the current (chapter+section+title)
            // 3-tuple shape. They appear in the spec's fallback list and stay
            // here for visibility; preFlightCacheCheck treats their cache
            // presence as adequate. If 4.11-1 ever drops out, the implementer
            // must teach openSubtopic to handle section-card entries before
            // these become usable. Tracked in docs/phase3_deferred.md.
            // { sectionId: '3.12', expected: 'pole_zero_roc_lab', ... },
            // { sectionId: '3.13', expected: 'pole_zero_roc_lab', ... },
        ],
    },
];

const COVERAGE_REPORT_PATH = path.join(TOOLS, 'visual-diff-coverage.json');

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
//
// Views 01-09 = Phase 3 PR #21 baseline. Views 10-18 = Phase 3.5 PR #44
// expansion. See docs/superpowers/specs/2026-06-22-harness-expansion-design.md.
const sharedViews = [
    // ----- Page A (lesson-loaded guest mode) -----
    { name: '01-guest-home', page: 'A', setup: async (page) => {
        await page.evaluate(() => {
            document.querySelectorAll('.feature-close-btn').forEach(b => {
                if (b.offsetParent !== null) b.click();
            });
        });
        await page.waitForTimeout(300);
    } },
    { name: '02-syllabus-open', page: 'A', setup: async (page) => {
        await ensureSyllabusOpen(page);
        await page.waitForTimeout(400);
    } },
    { name: '03-mistake-notebook', page: 'A', setup: async (page) => {
        await page.click('#navMistakeNotebookBtn');
        await page.waitForSelector('#mistakeNotebookView:not(.hidden)', { timeout: 5000 });
        await page.waitForTimeout(400);
    } },
    { name: '04-recent-conversations', page: 'A', setup: async (page) => {
        await page.click('#mistakeNotebookCloseBtn').catch(() => {});
        await page.waitForSelector('#mistakeNotebookView.hidden', { timeout: 3000 }).catch(() => {});
        await page.click('#navRecentBtn');
        await page.waitForTimeout(700);
    } },
    { name: '05-settings', page: 'A', setup: async (page) => {
        await page.click('#sidebarSettingsBtn');
        await page.waitForSelector('.settings-page-version', { timeout: 5000 });
        await page.waitForTimeout(400);
    } },
    { name: '06-lesson-view', page: 'A', setup: async (page) => {
        await page.evaluate(() => {
            document.querySelectorAll('.feature-close-btn').forEach(b => {
                if (b.offsetParent !== null) b.click();
            });
        });
        await openSubtopic(page, SUBTOPIC);
        await page.waitForTimeout(800); // let KaTeX settle
    } },
    { name: '07-lesson-pager-states', page: 'A', setup: async (page) => {
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
    { name: '08-lesson-lecture-toolbar', page: 'A', setup: async (page) => {
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
    { name: '09-lesson-qa-column', page: 'A', setup: async (page) => {
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
    // ----- Page B (Home Ask + sidebar destinations) -----
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
        });
        await resetHomeChromeState(page);
        await page.focus('#userInput');
        const focused = await page.evaluate(() =>
            !!document.querySelector('#searchBox.home-ask-composer')?.matches(':focus-within')
        );
        assertOrThrow(focused, 'view 10: #searchBox.home-ask-composer does not match :focus-within after focusing #userInput');
        await page.waitForTimeout(150);
    } },
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
    // View 12 — Page B — preference profile resting state.
    // Uses resetHomeChromeState to strip view 11's aria-expanded='true' +
    // .show in one place (selector-keying off either today is harmless but
    // the harness shouldn't be silently order-dependent).
    { name: '12-preference-page', page: 'B', setup: async (page) => {
        await resetHomeChromeState(page);
        await page.click('#navPreferenceBtn');
        await page.waitForSelector('#preferenceView:not(.hidden)', { timeout: 5000 });
        // Wait for the markdown preview to render at least one signal block.
        await page.waitForSelector('#preferenceProfilePreview', { timeout: 5000 });
        await page.waitForTimeout(300);
    } },
    // View 13 — Page B — course tracker resting state.
    { name: '13-course-tracker', page: 'B', setup: async (page) => {
        await page.click('#navCourseTrackerBtn');
        await page.waitForSelector('#courseTrackerView:not(.hidden)', { timeout: 5000 });
        // Tracker timeline renders synchronously from COURSE_SCHEDULE — wait
        // for at least one .course-timeline-item article (the body is a div,
        // not a <table>, so we walk children rather than `tr`).
        await page.waitForFunction(
            () => document.querySelectorAll('#courseTrackerTableBody .course-timeline-item').length > 0,
            { timeout: 5000 }
        );
        await page.waitForTimeout(200);
    } },
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
    // ----- Page A (continued — lesson chrome class flips) -----
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
    // ----- Page C (Chapter 2+ family-routed lessons) -----
    // View 17 — Page C — Chapter 3 §3.8-1 with hard-asserted family routing
    // to convolution_lab. Tries candidates in PAGE_C_VIEWS[0].candidates
    // in order; on success the chosen section ID + asserted family are
    // written to tools/visual-diff-coverage.json + the dispatcher-coverage
    // report block. Page C bootstrap (enterGuestMode) already ran for the
    // first candidate — runPageCView handles the re-enter for the rest.
    {
        name: '17-lesson-convolution', page: 'C', alreadySettled: true,
        setup: async (page) => runPageCView(page, '17-lesson-convolution', { isFirstPageCView: true }),
    },
    // View 18 — Page C — Chapter 4 §4.11-1 with hard-asserted family routing
    // to pole_zero_roc_lab. Page C is sticky from view 17, so we always need
    // to re-enter cleanly — runPageCView treats this as not-first.
    {
        name: '18-lesson-pole-zero-roc', page: 'C', alreadySettled: true,
        setup: async (page) => runPageCView(page, '18-lesson-pole-zero-roc', { isFirstPageCView: false }),
    },
];

// ---------- helpers (visual-diff-specific) ----------
// Helpers below are visual-diff-specific. General-purpose Playwright helpers
// shared with smoke.js / other tools belong in tools/test-utils.js.

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
    const total = a.width * a.height;
    // On a clean run (all 18 at 0.000%) we'd otherwise serialize ~3.7MB
    // through PNG.sync.write + writeFileSync per view for zero diagnostic
    // value. Only write when there's actual divergence.
    if (mismatch > 0) {
        fs.writeFileSync(diffPath, PNG.sync.write(diff));
    }
    return { mismatch, ratio: mismatch / total, total };
}

// Returns the Set<sectionId> of Page C candidates whose cache files exist.
// Single source of truth for cache presence — view 17/18 setups consult this
// set instead of re-resolving paths inside their candidate loops.
function preFlightCacheCheck(repoRoot) {
    const present = new Set();
    const missing = [];
    for (const view of PAGE_C_VIEWS) {
        for (const candidate of view.candidates) {
            const resolved = resolveLessonCachePath(repoRoot, candidate.sectionId);
            if (resolved) present.add(candidate.sectionId);
            else missing.push(`${view.viewName} candidate ${candidate.sectionId}`);
        }
    }
    const total = PAGE_C_VIEWS.reduce((n, v) => n + v.candidates.length, 0);
    if (missing.length === total) {
        throw new Error('cache missing for ALL Page C candidates — run pregen or sync workspace/materials/lesson-cache/ before --baseline or --check');
    }
    if (missing.length > 0) {
        console.warn(`[visual-diff] cache missing for some candidates (will be skipped during fallback): ${missing.join(', ')}`);
    }
    return present;
}

// Clear guest-mode session state (sessionStorage `guestUid` +
// `aquarius-auth-return-intent`) and re-enter guest mode from the intro
// screen. Needed by Page C views because: a) the bootstrap calls
// enterGuestMode once and we need to swap lessons between candidates, and
// b) on plain reload the app skips the intro (`aquarius-auth-return-intent`
// triggers hasPendingAuthReturnIntent → shouldShowIntroLanding returns false).
//
// localStorage is also wiped because view 17 may have called the section
// completion path (`__ftutorMarkCompleted` → `aquariusCompletedSubsections.v1`
// at app/app.js L8985), and that state would bleed into view 18's syllabus
// render. Today `closeSyllabusForCapture` hides the syllabus surface entirely
// so the bleed doesn't show up under diff, but any future Page C view that
// captures with the syllabus open would diff.
async function clearGuestSessionAndReenter(page) {
    await page.evaluate(() => {
        try { localStorage.clear(); } catch (_) {}
        try { sessionStorage.clear(); } catch (_) {}
    });
    await enterGuestMode(page, BASE);
}

// Collapse the syllabus panel before a Page C capture. openSubtopic leaves
// the syllabus open with the chosen chapter + sibling chapters expanded; on
// re-runs the sibling expansion state can drift (e.g. §4.12 chevron-open vs
// chevron-closed) which leaks into the diff. Closing the panel removes the
// syllabus surface entirely so only lesson chrome remains under pixel diff.
async function closeSyllabusForCapture(page) {
    // Wait for any in-flight open-animation to finish before we click —
    // clicking during is-animating can re-toggle to is-open instead of closing.
    await page.waitForSelector('#sidebarSyllabusPanel:not(.is-animating)', { timeout: 3000 }).catch(() => {});
    await page.evaluate(() => {
        const panel = document.getElementById('sidebarSyllabusPanel');
        if (!panel) return;
        // Re-read state inside evaluate so we don't act on a stale snapshot.
        if (!panel.classList.contains('is-open')) return;
        // Prefer the toggle button so app state stays consistent; fall
        // back to direct classList removal if the button isn't present.
        const btn = document.getElementById('navSyllabusBtn');
        if (btn) btn.click();
        else panel.classList.remove('is-open');
    });
    // Wait for the close animation to finish. Hard-fail if the panel never
    // closes — silent timeout would hide a real regression on the visible
    // syllabus chrome. assertOrThrow gives a clear error rather than a
    // silently-suppressed Playwright timeout.
    try {
        await page.waitForSelector('#sidebarSyllabusPanel:not(.is-open):not(.is-animating)', { timeout: 3000 });
    } catch (err) {
        // Tolerate the case where the panel is already closed/missing —
        // openSubtopic does not leave the panel open in all flows, and the
        // earlier evaluate would have early-returned. Only fail loudly if
        // the panel exists AND is still .is-open.
        const stillOpen = await page.evaluate(() =>
            document.getElementById('sidebarSyllabusPanel')?.classList.contains('is-open')
        );
        assertOrThrow(!stillOpen, `closeSyllabusForCapture: panel still .is-open after 3s (${err.message})`);
    }
    await page.waitForTimeout(200);
}

// Walk every knowledge-point page in the currently-loaded lesson, accumulate
// the set of inferred families for hydrated `.kc-interactive-demo` nodes that
// also have a child <canvas> or <svg> (proof a family-specific renderer
// painted, not the brief-fallback). Throws on cache-miss or empty hydration.
//
// `earlyExitOn` (optional family string): break the pager walk as soon as
// that family has been seen. Saves 20-40s on --check runs where view 17/18
// only need to confirm one family is reachable.
async function collectLessonFamilies(page, { earlyExitOn } = {}) {
    const text = await page.locator('#learnExplainContent').innerText().catch(() => '');
    if (text.includes('This section has not been prepared yet')) {
        throw new Error('cache miss — lesson rendered the "section not prepared" banner');
    }

    const families = new Set();
    const seenKpKeys = new Set();
    // Largest real lesson ≈ 10 KPs; cap at 15 to fail fast on broken pagers.
    const maxIters = 15;
    for (let i = 0; i < maxIters; i++) {
        await settleLesson(page);
        // hydrateInteractiveDemos sets dataset.hydrated='1' synchronously
        // but the family-specific renderers paint their <canvas>/<svg>
        // children via rAF/setTimeout. Wait briefly for at least one
        // .kc-interactive-demo to grow a canvas/svg child; tolerate the
        // no-demo case (some KPs have no interactive demo at all).
        await page.waitForFunction(
            () => {
                const nodes = document.querySelectorAll('.kc-interactive-demo');
                if (!nodes.length) return true; // no demos on this KP — proceed
                return Array.from(nodes).some((n) => n.dataset.hydrated === '1' && n.querySelector('canvas, svg'));
            },
            null,
            { timeout: 2000 }
        ).catch(() => {}); // best-effort — collect what's there
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

        if (earlyExitOn && families.has(earlyExitOn)) break;

        // Record current KP signature via the article.lesson-page-frame's
        // data-lesson-page attribute (set in buildLessonPageFrameHtml at
        // app/app.js L3308 = `${currentKnowledgePointIndex + 1}`). The IDs
        // #learnFocusPageIndicator / #learnLecturePageIndicator are only
        // populated by the learn-focus modal flow, not the regular pager.
        const priorKey = await page.evaluate(() => {
            const frame = document.querySelector('#learnExplainContent .lesson-page-frame');
            return frame ? frame.getAttribute('data-lesson-page') : null;
        });
        if (priorKey && seenKpKeys.has(priorKey)) break; // pager looped back
        if (priorKey) seenKpKeys.add(priorKey);

        // Try to advance to the next KP. If pager is at-end, the button is
        // disabled — bail. Note: `learnKpNextBtn` lives inside the lesson
        // shell but `moveLearnKnowledgePoint` early-returns when
        // `isLearnPageTurning` is true; the 150ms tail after each successful
        // turn below + settleLesson at loop top keep the lock clear.
        const advanced = await page.evaluate(() => {
            const btn = document.querySelector('#learnKpNextBtn:not([disabled])');
            if (!btn) return false;
            btn.click();
            return true;
        });
        if (!advanced) break;
        // Confirm the pager actually advanced. If `data-lesson-page` never
        // changes within 3s, treat that as end-of-pager (the click was a
        // no-op — `moveLearnKnowledgePoint` returns false when nextIndex
        // equals the current one). The original code relied on the disabled
        // attribute alone for this; we keep the soft-break behavior so a
        // race between "button enabled" + "single-KP lesson committed" still
        // terminates instead of throwing. seenKpKeys catches the "looped"
        // pathological case on the next iteration.
        if (priorKey) {
            const changed = await page.waitForFunction(
                (prior) => {
                    const frame = document.querySelector('#learnExplainContent .lesson-page-frame');
                    return frame && frame.getAttribute('data-lesson-page') !== prior;
                },
                priorKey,
                { timeout: 3000 }
            ).then(() => true).catch(() => false);
            if (!changed) break;
        }
        await page.waitForTimeout(150);
    }
    return families;
}

// Run a Page C view: iterate candidates, re-entering guest mode between
// attempts (skipping re-enter on the very first run since Page C bootstrap
// already did it). On the first candidate whose hydrated demos include the
// expected family, record coverage, close the syllabus, and return.
// Throws if no candidate routes to the expected family.
async function runPageCView(page, viewName, { isFirstPageCView }) {
    const view = PAGE_C_VIEWS.find(v => v.viewName === viewName);
    assertOrThrow(view, `${viewName} missing from PAGE_C_VIEWS`);
    let lastErr;
    let firstAttempt = isFirstPageCView;
    for (const candidate of view.candidates) {
        if (!cachePresent.has(candidate.sectionId)) continue;
        try {
            if (!firstAttempt) {
                await clearGuestSessionAndReenter(page);
            }
            firstAttempt = false;
            await openSubtopic(page, {
                chapter: candidate.chapter,
                section: candidate.section,
                title: candidate.title,
            });
            const families = await collectLessonFamilies(page, { earlyExitOn: candidate.expected });
            if (!families.has(candidate.expected)) {
                lastErr = new Error(`expected ${candidate.expected}, got [${Array.from(families).join(',')}]`);
                continue;
            }
            global.__pageCResults.push({
                viewName: view.viewName,
                sectionId: candidate.sectionId,
                expected: candidate.expected,
                families: Array.from(families),
            });
            await closeSyllabusForCapture(page);
            return; // success
        } catch (err) {
            lastErr = err;
        }
    }
    throw new Error(`${viewName} exhausted candidates: ${lastErr && lastErr.message}`);
}

// Populated by preFlightCacheCheck before the runner enters its view loop.
// Module-scope so runPageCView (called from setup closures) can consult it
// without threading through captureView's signature.
let cachePresent = new Set();

// ---------- runner ----------
(async () => {
    const repoRoot = path.resolve(__dirname, '..');
    cachePresent = preFlightCacheCheck(repoRoot);

    // Collector for Page C family-routing assertions. Hoisted via `global`
    // so view setups (closures) can push without threading the array through
    // captureView's signature. Read by the report-writer at the bottom of
    // this IIFE.
    const __pageCResults = [];
    global.__pageCResults = __pageCResults;
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
        await waitForHealth(BASE);
        const browser = await chromium.launch();
        const captureView = async (view, page) => {
            const dest = path.join(outDir, `${view.name}.png`);
            try {
                await view.setup(page);
                // Page C views call settleLesson inside collectLessonFamilies
                // (per KP) + a 200ms slack via closeSyllabusForCapture. Skip
                // the redundant ~300-400ms settle here when the view opts in.
                if (!view.alreadySettled) {
                    await settleLesson(page);
                }
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

        // One BrowserContext owns the MASK_CSS via addInitScript so every page
        // derived from the context inherits the mask before first paint.
        // addInitScript runs immediately after document creation (BEFORE the
        // app's <link rel=stylesheet>); the mask CSS leans on `!important` +
        // selector specificity to win the cascade regardless of order.
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
        // request and reused for subsequent views with the same key. The
        // three factories are identical today; the map shape is intentional
        // so a future Page can diverge (e.g. log in as a real user, seed
        // local storage) without rewriting the dispatch loop.
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
    } catch (err) {
        console.error('[visual-diff] FATAL', err);
        exitCode = 1;
    } finally {
        // Attach the exit listener BEFORE sending SIGTERM so a fast-exiting
        // bridge can't race the listener; race against a 2s timeout and warn
        // if it hits so "real exit" and "never exited" don't look identical.
        const exited = new Promise((resolve) => server.once('exit', resolve));
        server.kill('SIGTERM');
        await Promise.race([
            exited,
            new Promise((resolve) => setTimeout(() => {
                console.warn('[visual-diff] bridge did not exit within 2s after SIGTERM');
                resolve();
            }, 2000)),
        ]);
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

        // Dispatcher coverage summary — separate from the main table to keep
        // the per-view list dense rather than 16 empty cells.
        const coverageLines = ['', '## Dispatcher coverage', '',
            'Family-table renderer routing confirmed for the following Chapter 2+ views',
            '(early-exit on first matching family — additional families on later KPs',
            'are not enumerated):',
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
        // picks a different candidate is visible in `git diff`. No timestamp,
        // no mode field: re-running --check shouldn't dirty the working tree
        // beyond the candidate-rotation diff that's the actual signal.
        const coverage = {
            entries: global.__pageCResults || [],
        };
        fs.writeFileSync(COVERAGE_REPORT_PATH, JSON.stringify(coverage, null, 2) + '\n');

        console.log(`\n[visual-diff] report → ${REPORT_PATH}`);
    }
    process.exit(exitCode);
})();
