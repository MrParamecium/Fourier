# Phase 3.5 — Visual-Diff Harness Expansion (design)

Date: 2026-06-22
Owner: FlyM1ss
Status: revised after multi-lens review (2026-06-22)
Source plan: `docs/REFACTOR_PLAN.md` §"Phase 3.5" + "Roadmap from here" §A
Companion: `docs/phase3_deferred.md` §2b

## Revision log

- **2026-06-22 v1**: initial draft (single-PR, two Chapter 2+ families, extend
  views 01–09).
- **2026-06-22 v2** (this version): rewritten after a 5-lens adversarial
  review. Seven must-fix items folded into the spec; twelve should-fix items
  added as concrete implementation contracts; deferred section restructured.
  See revision-rationale section at bottom.

## Non-goals

This harness is **regression safety** for unattended Claude sessions, not
simulated-user discovery. Every view added must name the override surface
it locks down. View additions without a named, override-sensitive surface
are out of scope. Governance: central-db
`knowledge/aquarius-ui-testing-strategy.md`.

## Why

The 9-view harness opens exactly one lesson (Background §1 "Signal Energy"),
which short-circuits at `isChapterOneDemo` BEFORE
`INTERACTIVE_DEMO_FAMILY_RENDERERS`. None of the 13 lookup-table keys are
exercised, and override-sensitive surfaces in Home Ask, preference,
course-tracker, feedback-board, and lesson chrome are uncovered. `#20a/b/c
Pass 2` cannot land safely without pixel-diff coverage of those surfaces —
5,373 `!important` declarations in that range have visual-diff as their only
safety net.

This expansion closes the dispatcher coverage gap on 2 of 13 family keys,
captures 2 of the top-4 #20c-duplicated selectors in their *override-active*
state, the #20b surfaces in resting state, and 2 lesson-chrome
class-variant states (chapter-overview-active / split-active) that #20a
duplicates negate against.

## Decisions (locked)

| Decision | Choice |
|---|---|
| PR shape | **Single Phase 3.5 PR** — code + targeted rebaseline + new baselines. |
| Chapter 2+ family coverage | **Two views** — `convolution_lab` + `pole_zero_roc_lab` (with candidate fallback list). |
| Hover/focus/disabled | **Extend** views 01–09; do not modify their captures. |
| Login automation | **None.** All 4 view groups reachable from guest mode. |
| Page topology | **Page A / Page B / Page C** (Pages C₂+C₃ collapsed to one shared Page C). |
| Page execution | **Sequential per page** within this PR. Parallel-via-`Promise.all` is a should-fix optimization for the implementer if it doesn't introduce flake. |
| Mask injection | **Context-level via `addInitScript`** so masks cannot be skipped on a new page. |

## Stability invariants

- **Views 01–09 are frozen**: their `setup()` functions, names, and resulting
  PNG bytes do not change in this PR or future PRs unless paired with an
  explicit baseline-rebake commit, mirroring 589be97. Any pixel motion on
  these views from a mask change must be justified per-view in the rebaseline
  commit message.
- **Filenames 01–18 are stable**: renaming a view requires renaming its
  baseline PNG in the same commit.
- All harness changes must preserve the `Hard Invariants` of
  `docs/REFACTOR_PLAN.md` (Windows-illegal filenames, `AQUARIUS_CONFIG`,
  `aquarius_visual_latex_v2`, Sonnet 4.6 as Agent B, Node-built-ins-only).

## Architecture

Single `tools/visual-diff.js` runner. `sharedViews` becomes a structured
array of `{name, page, setup}` objects (replacing today's `{name, setup}`).
The runner maintains a `Map<pageKey, Page>` and lazily bootstraps on first
use. Concrete shape:

```js
const sharedViews = [
  { name: '01-guest-home',      page: 'A', setup: async (page) => { ... } },
  // ... 02-09 unchanged ...
  { name: '10-home-ask-focused',     page: 'B', setup: ... },
  { name: '11-home-mode-menu-open',  page: 'B', setup: ... },
  { name: '12-preference-page',      page: 'B', setup: ... },
  { name: '13-course-tracker',       page: 'B', setup: ... },
  { name: '14-feedback-board',       page: 'B', setup: ... },
  { name: '15-lesson-chapter-overview',       page: 'A', setup: ... },
  { name: '16-lesson-chapter-overview-split', page: 'A', setup: ... },
  { name: '17-lesson-convolution',   page: 'C', setup: ... },
  { name: '18-lesson-pole-zero-roc', page: 'C', setup: ... },
];
```

Pages:
- **Page A** (existing) — guest bootstrap → views 01–09 then 15–16. Views
  15–16 toggle `learnBody` chapter-overview state directly via dataset/
  classList (already loaded Chapter 1 §1.1-1 lesson). Each setup() first
  resets any previous panel-focus/class state via a single helper.
- **Page B** (new) — guest bootstrap → views 10–14. Views 10–11 target Home
  Ask composer & mode-menu. Views 12–14 navigate to preference,
  course-tracker, and feedback-board respectively.
- **Page C** (new, single page replacing v1's C₂+C₃) — guest bootstrap →
  view 17 (open Ch 3 §3.8-1, capture, close lesson via `#navSyllabusBtn` or
  state reset) → view 18 (open Ch 4 §4.11-1 or candidate fallback, capture).
  One bootstrap shared across both lesson loads.

Each Page B/C bootstrap pays ~5s. Estimated total runtime ~2 min sequential;
~70–90s if pipelines run in parallel.

### MASK_CSS at context level

```js
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
// All pages derived from context inherit the mask.
```

This makes masking a context-level invariant — a future Page D cannot skip
it by forgetting to call `enterGuestMode`.

### Shared test utilities

Extract `enterGuestMode`, `ensureSyllabusOpen`, `openSubtopic`,
`openSubtopicInFreshGuest`, `waitForHealth`, `MASK_CSS`,
`resetLessonChromeState`, and the family-routing helpers into
`tools/test-utils.js`. Both `visual-diff.js` and `smoke.js` import from it.
Removes the existing "kept independent on purpose" duplication tax (3 helpers
× 2 files today; would grow to 6 × 2 without the extraction).

## View additions (9 new → 18 total)

Filenames `01-…09-…` stay byte-identical (no setup or naming changes).

| # | Name | Page | Target selector / class state | What it locks down |
|---|------|------|--------------------------------|--------------------|
| 10 | `10-home-ask-focused` | B | `.home-ask-composer:focus-within` (triggered by focusing inner `#userInput`) | 10 #20c top-4 dup sites on focus-within (composer 15 occ) |
| 11 | `11-home-mode-menu-open` | B | `#homeModeMenu.home-mode-menu.show` (forced via `classList.add('show')` + `aria-expanded='true'`, bypassing the document-click auto-close handler) | 17 #20c top-4 dup sites + 7 ancestor `:has(...show)` cascade rules |
| 12 | `12-preference-page` | B | `#preferenceView:not(.hidden)` + a synced `.preference-profile-preview` child | #20b preference cluster resting state |
| 13 | `13-course-tracker` | B | `#courseTrackerView:not(.hidden)` + `courseTrackerTableBody` rendered rows | #20b course-tracker resting state |
| 14 | `14-feedback-board` | B | `#feedbackView:not(.hidden)` AND `loadFeedbackBoard` fetch settled (no `Loading suggestions...` placeholder) | #20b feedback-board resting state |
| 15 | `15-lesson-chapter-overview` | A | force `learnBody.classList.add('chapter-overview-active')` from inside §1.1-1; screenshot | Exercises the `:not(.chapter-overview-active)` negation against which 30+ #20a rules toggle |
| 16 | `16-lesson-chapter-overview-split` | A | force `learnBody.classList.add('chapter-overview-split-active')` from inside §1.1-1; screenshot | Exercises the `:not(.chapter-overview-split-active)` negation — companion to view 15 |
| 17 | `17-lesson-convolution` | C | Chapter 3 §3.8-1 routed to `convolution_lab` (hard-asserted) | Closes 1 of 13 dispatcher-gap keys |
| 18 | `18-lesson-pole-zero-roc` | C | Chapter 4 §4.11-1 routed to `pole_zero_roc_lab` (hard-asserted; candidate fallback list below) | Closes 2nd dispatcher-gap key |

### Why views 15/16 changed from v1

v1 picked "pager :focus" + "pager :disabled". Verified during review:
- `grep '#learnKpNextBtn:focus\|#lectureNextOverlayBtn:focus' app/style.css`
  returns **zero matches**. The pager surface has `:hover`, `:active`,
  `:disabled` rules but no `:focus` rules.
- Programmatic `.focus()` on a `<button>` triggers `:focus` but not always
  `:focus-visible` (Chromium gates `:focus-visible` on keyboard-origin
  focus), so the UA outline may not appear.
- The actual top-duplicated selectors in style.css L33346–35958 are
  `#learnView` / `#learnView#learnView` rules negated against
  `.chapter-overview-active` / `.chapter-overview-split-active`. Flipping
  the class is what exercises the override chain.

Pager focus/disabled coverage is recorded as deferred (state-variant gap).

### Page B linked-list

Each Page B view declares a `requires` prerequisite asserted in `setup()`:

| View | Requires | Recovery action in setup() |
|---|---|---|
| 10 | `home` | (default after enterGuestMode) |
| 11 | `home` | reset composer focus by blurring `#userInput`; force `.show` on menu |
| 12 | any | reset `#homeModeMenu.show` if present, click `#navPreferenceBtn`, wait `#preferenceView:not(.hidden)` |
| 13 | any | wait `#courseTrackerView:not(.hidden)` + `courseTrackerTableBody` non-empty |
| 14 | any | wait `#feedbackView:not(.hidden)` + `loadFeedbackBoard()` settled |

Failing the `requires` check throws (the runner converts to view-level error
and exit 1).

### Family verification (rewritten — was the single biggest flaw in v1)

The v1 family-eval scanned `.kc-interactive-demo` and called
`inferInteractiveDemoFamily` from the harness. That is the **same function**
the dispatcher calls — so it never proves the dispatcher branch executed.
The replaced design proves dispatcher execution by checking the rendered DOM
for evidence a family-specific renderer painted.

Steps Page C performs after `openSubtopic` returns for views 17/18:

1. **Cache-miss guard.** If `#learnExplainContent` contains the substring
   "This section has not been prepared yet." → throw. Cache miss is a hard
   fail, not a quiet pass.
2. **Walk all knowledge points.** Click `#learnKpNextBtn` (or use
   `window.__ftutorRefreshPager`) until every KP page in the section has
   been rendered at least once, accumulating the set of
   `.kc-interactive-demo` nodes seen across all pages. Hydration runs per
   current KP, so a single screenshot finds only one page's demos.
3. **Hydration evidence.** For every collected demo node, require
   `dataset.hydrated === '1'` AND a child `<canvas>` or `<svg>` element. The
   family-specific renderers (per `app/interactive-demos/*.js`) all paint a
   canvas or SVG; a brief-fallback renderer does not. Canvas/SVG presence is
   independent evidence the family renderer fired.
4. **Family assertion.** For each demo node, base64-decode its `data-demo-b64`
   via `window.decodeBase64Utf8` (exposed alongside
   `window.inferInteractiveDemoFamily`) and call
   `window.inferInteractiveDemoFamily(demo)`. Collect the set. View 17 MUST
   include `convolution_lab` in the set; view 18 MUST include the candidate
   family from the candidate list (default `pole_zero_roc_lab`). On
   mismatch, the runner throws with the actual family set in the message.
5. **Persisted evidence.** The chosen section ID + asserted family + actual
   family set are written into a "Dispatcher coverage" summary block below
   the main `visual-diff-report.md` table (NOT a 16-row-empty column).

### Candidate fallback list

If the primary section's routing assertion fails, the implementer rotates to
the next candidate in this list and **renames** the view file + table row to
match the routed family (auditable swap). The list is declared in the runner:

```js
const PAGE_C_VIEWS = [
  { id: '17-lesson-convolution',     candidates: [
      { sectionId: '3.8-1', expected: 'convolution_lab' },
      { sectionId: '3.8-2', expected: 'convolution_lab' },
      { sectionId: '3.8-3', expected: 'convolution_lab' },
      { sectionId: '3.11-4', expected: 'convolution_lab' },
  ]},
  { id: '18-lesson-pole-zero-roc',   candidates: [
      { sectionId: '4.11-1', expected: 'pole_zero_roc_lab' },
      { sectionId: '3.12',   expected: 'pole_zero_roc_lab' },
      { sectionId: '3.13',   expected: 'pole_zero_roc_lab' },
  ]},
];
```

The runner tries each candidate in order, breaking on the first whose
hydrated demos include the expected family. The chosen `sectionId` is
persisted to `visual-diff-report.md` and to a `tools/visual-diff-coverage.json`
artifact, so a future regression run that picks a different candidate is
visible in `git diff`.

### Window exports

Required permanent exports (added near their declarations in `app/app.js`):

```js
function inferInteractiveDemoFamily(demo = {}) { /* ... */ }
window.inferInteractiveDemoFamily = inferInteractiveDemoFamily; // harness export — do not remove without updating tools/visual-diff.js

function decodeBase64Utf8(b64) { /* ... */ }
window.decodeBase64Utf8 = decodeBase64Utf8; // harness export — do not remove without updating tools/visual-diff.js
```

The eval block in the harness uses `parseBase64JsonAttr` (which already
exists at `app/app.js` L1058–L1072 and goes through Uint8Array + TextDecoder
for UTF-8 safety) by exporting it on window the same way. The eval
**hard-fails** with a clear error if any of the three globals is missing —
no silent try/catch swallowing.

## Masking additions

Append to `MASK_CSS` (now injected at context level, not per-page):

```css
/* feedback meta line = author + " · " + timestamp; timestamp drifts
   between runs. Mask the entire meta line (real selectors verified
   against renderFeedbackBoard at app/app.js L7326+L7338). */
.feedback-thread-meta,
.feedback-reply-meta { color: transparent !important; text-shadow: none !important; }

/* input caret blink in focused-composer view (10) — scoped to input
   surfaces so non-input chrome stays subject to override-chain coverage. */
input, textarea, [contenteditable="true"] { caret-color: transparent !important; }

/* defensive: ensure the home-mode menu doesn't transition in/out of .show
   during view 11 capture. */
.home-mode-menu.show { transition: none !important; animation: none !important; }
```

The v1 universal `* { caret-color }` rule was rejected: it would hide
caret-color override regressions on non-input chrome — exactly the kind of
mistake #20c Pass 2 is meant to be gated against.

The v1 `.feedback-board-item time`, `.feedback-board-card .timestamp`
selectors were rejected: `grep` against `renderFeedbackBoard` confirms
neither exists in the rendered DOM. They are dead mask rules.

## Threshold strategy

Global `FAIL_RATIO = 0.005` (0.5%) unchanged. No per-view overrides in this
PR. If a new view exceeds 0.5% on the baseline-vs-baseline check, the cause
must be diagnosed (under-mask, over-mask, real flake) and addressed within
this PR before baseline is committed. Per-view threshold machinery is
deferred.

## Rebaseline rollout (split into 3 commits)

To keep mask-induced churn separable from new-view additions:

1. **Harness code commit** — `tools/visual-diff.js` restructure, new helpers,
   `tools/test-utils.js` extraction, the two `window.*` exports in
   `app/app.js`. NO new mask rules, NO new view captures. After this commit,
   `--check` against existing baseline still passes (proves the refactor is
   pixel-neutral on existing views).
2. **Mask + targeted rebaseline commit** — adds the new mask rules
   (`.feedback-thread-meta`, scoped caret, `.home-mode-menu.show` transition
   off). Runs `--check`, lists which existing baselines moved, rebakes ONLY
   those. The commit message lists each modified existing PNG with a one-line
   justification (e.g., "view 09 was already focusing `#userInput` — caret
   mask zeros the caret pixel"). Any modified existing PNG without a
   plausible justification blocks the commit pending investigation.
3. **New-views commit** — adds view entries 10–18, runs `--baseline` for
   just the new views (or runs `--baseline` whole and lets git capture only
   the 9 new PNGs because steps 1 + 2 made existing baselines stable). Final
   `--check` must show 0.000% across all 18 views.

If diagnosis in step 2 surfaces a real regression that isn't mask-induced,
the harness PR pauses until the regression is fixed (recorded in
`docs/phase3_deferred.md` if pre-existing).

## Error handling

Each view's `setup()` runs inside the existing try/catch in the runner; new
error modes added by this PR:

- Cache-miss (Page C) — throw with the section ID; runner marks view `error`.
- Family-routing mismatch (Page C) — throw with expected vs actual family.
- `requires` precondition fail (Page B) — throw with which precondition.
- Missing `window.inferInteractiveDemoFamily` / `decodeBase64Utf8` /
  `parseBase64JsonAttr` — throw at first family eval; the harness exits non-zero.

A new helper `assertOrThrow(condition, msg)` lives in `tools/test-utils.js`
so view setups state their preconditions inline.

## Cache prerequisite

Views 17/18 require lesson cache for the selected sections. Per
CLAUDE.md's materials-resolution chain, the bridge prefers
`workspace/materials/lesson-cache/` over `materials/lesson-cache/`. Verified:

- `workspace/materials/lesson-cache/3_8-1/new__aquarius_visual_latex_v2.aquarius_visual_latex_v2.en.md` — present ✓
- `workspace/materials/lesson-cache/4_11-1/new__aquarius_visual_latex_v2.aquarius_visual_latex_v2.en.md` — present ✓

The runner pre-flight-checks both files (via `fs.existsSync` against the
same resolution chain `ws-bridge.js` uses) and throws a clear "cache missing
— run pregen first" error before any browser launch if either is absent. This
protects teammates cloning fresh without `workspace/materials/`.

## Concurrency posture

Pages A/B/C are independent — no shared DOM, no shared auth, single bridge
server. The runner SHOULD launch the 3 pipelines via `Promise.all` to cut
wall-clock from ~2 min to ~70–90s. If implementation surfaces flake (e.g.,
the bridge serializes some routes), fall back to sequential and record the
reason in a code comment plus `docs/phase3_deferred.md`. Sequential
execution is acceptable in v1 of this PR.

## What this PR unblocks (downgraded from v1)

| Roadmap step | Unblock status post-PR |
|---|---|
| B — PR #20a Pass 2 (lesson + lecture override-chain collapse) | **partial** — views 15–16 exercise chapter-overview class negations; pager `:active`/`:focus-visible` state-variant remains uncovered. #20a top-duplicated selectors are layout-only and covered by view 06 default + 15/16 class flips, so the cascade-collapse risk is reduced but not eliminated. Hover state remains the only signal for some pager rules (view 07). |
| C — PR #20b Pass 2 (preference + MN + course-tracker + feedback-board) | **partial** — resting state covered; `:hover` / `:disabled` / `:focus` state variants on top selectors (`.feedback-board-card` 27×, `.preference-profile-preview` 18×, `.preference-preview-card` 14×, `.preference-primary-btn` 10×) NOT covered. Pass 2 must not touch state-variant overrides without expanding the harness. |
| D — PR #20c Pass 2 (Home Ask + answer-workspace + login + intro) | **partial** — composer `:focus-within` (view 10) + mode-menu `.show` cascade (view 11) covered. `#webSearchToggleBtnMain.home-ask-web-toggle` (21× — the single most-duplicated #20c selector) state variants NOT covered. login/intro NOT covered. |
| E — RUNTIME-INJECTED CSS OVERRIDE banner deletion | **partial** — banner selectors inside Home Ask / preference / course-tracker / feedback-board / lesson chrome resting state are covered. Banner selectors that only fire on login/intro remain unprotected; per-selector audit required. |
| F — PR #21 Pass 2 (shared interactive-demos helpers) | **partial — 2 of 13 families covered.** `drawArrow`/`sizeCanvas` reconciliation is regression-protected for `convolution_lab` and `pole_zero_roc_lab` paths only. The 11 other family renderers still require hand-walking per #43. |

The matrix replaces v1's "yes" rows — the synth review highlighted this as
the load-bearing inaccuracy of v1.

## Deferred (recorded for `docs/phase3_deferred.md` after this PR lands)

1. **Per-view threshold overrides** + per-view threshold machinery.
2. **Cross-viewport (mobile / narrow) coverage.**
3. **Authenticated-user (Clerk) views.** Guest mode covers the override
   surfaces #20a/b/c needs. If `#homeModeMenu` chrome turns out to differ
   between guest and auth'd modes (verified during implementation), add this
   to deferred immediately.
4. **The remaining 11 family-table keys** (`signal_transform`, `energy_power`,
   `sampling_quantization`, `system_property`, `exponential_envelope`,
   `matrix_locator`, `parameter_response`, `pointwise_multiplication`,
   `frequency_response_lab`, `transform_rule_lab`, `sequence_system_lab`).
   Add a dedicated view per family when a future PR touches dispatcher logic.
5. **State-variant coverage on `.preference-*`, `.course-tracker-*`,
   `.feedback-board-*`** (hover, disabled, focus, active). #20b Pass 2 MUST
   NOT touch state-variant overrides on these surfaces without expanding the
   harness.
6. **`#webSearchToggleBtnMain.home-ask-web-toggle` state variants** (21×).
   #20c Pass 2 MUST NOT collapse those override sites without expanding.
7. **Pager `:focus-visible` / `:active` state variants.** Visual-diff is
   poorly suited to capture `:active`; consider an interaction-trace
   captured via Playwright `trace` instead.
8. **Glass + chapter-overview surface coverage** for roadmap step G (Phase 2
   #19) — a separate harness expansion when G lands.
9. **Login + intro page coverage** for #20c Pass 2 D-tail and #20c step E.
10. **Page C scaling** if family-key coverage grows beyond 2 — refactor to a
    handler that opens lessons sequentially with closeSection between
    captures, rather than spawning one page per family.
11. **MathJax/canvas settle helper extraction.** This PR centralizes the
    wait in `captureView` for all 18 views; if future captures need
    customization, extract into `tools/test-utils.js`.

## Revision rationale (must-fix items addressed)

For traceability against the multi-lens review report:

| Must-fix | Where addressed |
|---|---|
| Fix view 10 + view 11 selector/state | Architecture: view 10 → `:focus-within` via `#userInput`; view 11 → `.show` via forced classList + aria-expanded. Per-view assertions documented. |
| Cache-miss + hydration evidence for views 17/18 | Family verification §1–4: cache-miss guard, all-KP walk, canvas/svg requirement, family assertion. |
| Views 15/16 #20a coverage | Replaced with chapter-overview-active / split-active class flips. Pager focus/disabled deferred. |
| sharedViews topology + runner | Architecture: `{name, page, setup}` schema + lazy `Map<pageKey, Page>` bootstrap. |
| Window export unconditional + self-defending + UTF-8 | Window exports section: 3 globals locked in, eval hard-fails on missing. |
| MASK_CSS fixes | Masking additions section: dead selectors removed, real selectors verified, caret scoped, transition guard added. |
| Rebaseline split | 3-commit rollout (code → mask + targeted rebaseline → new views). |

Should-fix items (parallel pipelines, MathJax settle helper, exact-text
chapter match, waitForSelector after nav, context-level MASK_CSS,
test-utils.js extraction, SIGTERM wait, cache pre-flight, Page B `requires`
field, candidate fallback list, report column display, stability invariants)
are folded into the relevant sections as concrete contracts the implementer
follows.
