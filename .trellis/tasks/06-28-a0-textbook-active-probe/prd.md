# A0 — `.learn-textbook-active` css-probe state(s) S13/S14

The **last known A0 harness gate** before the big A2 doubled-ID sweep. Adds
computed-style css-probe coverage for the 14 `.learn-textbook-active` doubled-ID
occurrences in `app/style.css`, captured on pre-collapse `main` so a later A2 strip
diffs against true geometry. Direct sibling of the S4–S11 task
(`06-28-a0-s4-s11-probe-states`, PR #122) — same additive, css-probe-only,
drive-the-real-fn + fail-closed-sentinel pattern established by the C2 fix (PR #120).

## Confirmed facts (ground-truth, measured this session at HEAD `73dbf66` — NOT from docs)

- **14 `.learn-textbook-active` doubled-ID occurrences** in `app/style.css`
  (`grep -n "learn-textbook-active"`), in **two cascade bands**:
  - **Band 1 — textbook-mode (normal), L25118–25157** — 7 occurrences / 5 rule-blocks:
    `#learnExplainScroll` (+`.textbook-mode`) padding:0 + 2-radial bg-image + overflow-y:auto;
    `#learnBookOverlay` position:relative/display:block/background:transparent;
    `.textbook-pages-flow` padding+gap clamp; `#learnExplainContent` display:none;
    `#lecturePrevOverlayBtn`/`#lectureNextOverlayBtn` display:none.
  - **Band 2 — textbook + chapter-overview combined, L24575–24609** — 7 occurrences / 5 rule-blocks:
    selector `…#learnBody#learnBody.chapter-overview-active.learn-textbook-active…` (specificity
    `(6,2,0)`, beats both Band-1 `(6,1,0)` and the overview-alone `(6,1,0)` on source order +
    specificity). Winners: `#learnExplainScroll` height:100%/min-height:0/padding:0;
    `#learnBookOverlay` …/height:auto; `.textbook-pages-flow` min-height+padding;
    `#learnExplainContent` display:none; `#learnChatCol`/`#learnResizer` display:none.
- **Production driver = `_setLearnMode(mode)`** (`app/app.js:2449`, a top-level fn → reachable in
  page scope like S10/S11's `setChapterOverviewLayoutActive`). At L2456 it runs
  `learnBody.classList.toggle('learn-textbook-active', mode === 'textbook' && supportsTextbookLayout)`,
  where `supportsTextbookLayout` is true for `_learnLayoutMode ∈ {lesson, overview_lesson, overview}`
  (default `'lesson'`, app.js:850). So **Band 1** = `_learnLayoutMode='lesson'` → `_setLearnMode('textbook')`;
  **Band 2** = set `_learnLayoutMode='overview'` explicitly **first** → `setChapterOverviewLayoutActive(true)`
  (adds `chapter-overview-active`; the fn READS but does NOT set `_learnLayoutMode` — the caller does,
  app.js:2123) → `_setLearnMode('textbook')`.
- **`S12` is already taken** by an unrelated surface (`#textbookFocusModal` / `body.textbook-focus-active`,
  the focus-reading modal) — so the new states are **S13** (Band 1) and **S14** (Band 2).
- **Doc correction (honesty):** REFACTOR_DONE §A0 implied "S10 unlocks the 13 explain-rail
  doubled-ID rules" — wrong twice over: it's **14** occurrences (not 13), and they're gated by
  `.learn-textbook-active` (a separate state S10/overview does NOT set), confirmed during the
  S4–S11 task. This task closes that gap.

## Disciplines (non-negotiable — from C2 + S4–S11 + verification.md)

- **Drive via the real production fn** (`_setLearnMode` / `setChapterOverviewLayoutActive`), not a
  hand-poked `classList.add` — the C2 lesson. Assert the fn is reachable (fail-closed) before driving.
- **Each new state asserts a fail-closed winner sentinel** — a discriminating computed value the gated
  rule actually wins (e.g. Band-1 `#learnExplainScroll` padding `0px` + 2-radial bg signature; Band-2
  `#learnExplainScroll` `min-height:0px` + `height:100%`, distinct from Band-1's no-height) — BEFORE
  snapshot, so the baseline cannot bake an inactive rule.
- **Empirical winner verification before shipping S14** (the S5-drop discipline): confirm via a throwaway
  computed-value matrix that Band-2's combined-selector winners are observable and distinct from Band-1 /
  overview-alone. If no fail-closed winner is constructible, **drop S14** and document — shipping S13 only
  is a success, not a failure (honest-yield).
- **Additive-only baseline.** Capture off pre-collapse `main`; every existing key
  (S2/S3/S4/S6/S7/S9/S10/S11/S12/N0–N4/S-feedback-*/S-page-corner) stays byte-identical —
  `git diff tools/css-probe-baseline.json` shows ONLY new keys (`+N/−0`).
- **Local-helper floor only** — if state setup needs a reset, floor it in css-probe's LOCAL
  `resetLearnChrome`, NOT the shared `resetLessonChromeState` (which fans out to visual-diff views) →
  zero visual-diff blast radius, no stash-trick needed (the S4–S11 process note).

## Requirements

- R1. Add **S13-textbook-active** (Band 1): driven by `_setLearnMode('textbook')` with
  `_learnLayoutMode='lesson'`; fail-closed reachability + `#learnBody.learn-textbook-active` assert +
  Band-1 winner sentinel(s); pins the 7 Band-1 occurrences' cascade winners.
- R2. Add **S14-textbook-overview** (Band 2) *iff* empirically winner-constructible: set
  `_learnLayoutMode='overview'` **first** → `setChapterOverviewLayoutActive(true)` → `_setLearnMode('textbook')`;
  fail-closed asserts on BOTH classes present + Band-2-distinct winner sentinel; pins the 7 Band-2
  occurrences. Drop + document if not.
- R3. css-probe.js **only** — no `app/app.js`, `app/style.css`, `runtime-collapsed.css`, or
  `test-utils.js` (shared-helper) edits. Baseline regenerated additive-only.
- R4. Document the per-state sentinel table + any S14 drop rationale in `results.md`.

## Acceptance Criteria — MET (S13 shipped, S14 dropped on evidence)

- [x] `css-probe --check` byte-identical on ALL pre-existing states; new `S13-textbook-active`
  key populated with its winner sentinel; `git diff tools/css-probe-baseline.json` is additive `+56/−0`.
- [x] `visual-diff --check` 37/37 (provably unaffected — css-probe.js-only, no shared-helper edit).
- [x] `npm run check` green.
- [x] 7 Band-1 occurrences harness-covered via **S13**. **S14 (7 Band-2 occurrences) DROPPED** under
  the §3 ship/drop gate — no fail-closed sentinel constructible (every Band-2 winner used-value-collapses
  to the overview-alone fallback, is inline-masked, is also provided by Band-1, or is `__MISSING__`).
  Recorded as a **named coverage gap** (not "covered"): A2's Band-2 strip must lean on visual-diff + a
  fresh arbiter keep-set — see **Residual risk**.
- [x] `results.md` records the empirical sentinel matrix and the S13-ship / S14-drop decision.

## Residual risk

- **An S14 drop is a real coverage gap, not a covered state.** If the §3 empirical gate finds no
  fail-closed Band-2 sentinel and S14 is dropped, the **7 Band-2 doubled-ID occurrences carry NO
  css-probe witness** — A2's later Band-2 strip must then lean on `visual-diff` + the arbiter
  keep-set instead of a computed-style baseline. "documented-dropped" is an honest **named gap**, not
  equivalent to "covered"; record it as such in `results.md` and flag it to the A2 task.

## Out of scope

- **Any de-doubling / `!important` strip of the 14 occurrences** — that is the A2 task
  (`06-28-a2-doubled-id-collapse`), gated by a fresh arbiter pass per `[[feedback-rederive-keepset]]`.
  This task only builds the harness coverage that A2 will later need.
- A4 (§3d composer chain) and any `app/style.css` / `runtime-collapsed.css` edit.
- New *visual-diff* views (this is css-probe computed-style coverage).
- The `.learn-textbook-active` `_learnLayoutMode='overview_lesson'` permutation (same class outcome as
  `'lesson'` for Band 1 — no distinct doubled-ID band; not a separate state).
