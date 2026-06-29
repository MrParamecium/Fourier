# Implement — S14 tall-content textbook witness

Execution plan. Read `design.md` first. Every step is additive harness/tooling;
**no production CSS/JS edit ships**. Validation commands assume WSL with
`TUTOR_PYTHON_BIN` set and Playwright chromium installed.

## Pre-flight
- [ ] Branch `a4/s14-tall-witness` off `main` (clean tree).
- [ ] Confirm port hygiene (memory [[stale-test-bridge-processes]]): no stale ws-bridge on 9125/9126/9127 (`pkill -f ws-bridge` if EADDRINUSE risk).
- [ ] Baseline-truth snapshot: run `node tools/css-probe.js --check` and `node tools/visual-diff.js --check` on pristine `main` → record current PASS state (so any later drift is attributable).

## Step 1 — Build the synthetic fixture helper (test-utils)
- [ ] Add `enterTextbookOverflowState(page, { cards, cardHeight })` to `tools/test-utils.js`, mirroring `design.md §3`. It: resetLessonChromeState → add both `#learnBody` classes → `#learnExplainScroll.classList.add('textbook-mode')` → hide `#learnExplainContent` → un-hide `#learnBookOverlay` → inject `.textbook-pages-flow` with `cards` × fixed-`cardHeight` `.textbook-page-card>img` (1×1 data-URI, inline `width:680px;height:${cardHeight}px;display:block`).
- [ ] Add the **fail-closed sentinel** (`design.md §5`) inside the helper: assertOrThrow on both classes present + `.textbook-pages-flow` paddingBottom == Band-2 value (≠ Band-1) + (tall) `scrollHeight>clientHeight`.
- [ ] Add a teardown `exitTextbookOverflowState(page)` that removes `learn-textbook-active` + `textbook-mode` + clears the injected overlay (so it can't leak to later same-key Page A views).
- [ ] `node -e` smoke the helper logic offline where possible; `npm run check` (syntax gate on test-utils.js).

## Step 2 — Add the visual-diff witness view(s)
- [ ] In `tools/visual-diff.js sharedViews`, append LATE in the Page A schedule (near view 03b/26), per the NO-TEARDOWN-CONTRACT:
  - `NN-textbook-overview-tall` — `enterTextbookOverflowState({cards:4, cardHeight:1400})`; scroll to bottom + view-14c `fullyIn` assert; own `failRatio`.
  - (D3) `NN-textbook-overview-fill` — content just under viewport so min-height:100% is doing work; own `failRatio`.
- [ ] Capture baselines: `node tools/visual-diff.js --baseline`; eyeball the new PNG(s) in `tools/visual-baseline/` (genuinely overflowing? bottom padding visible? fill variant filled?).
- [ ] Calibrate each `failRatio` from a **measured** noise floor: run `--check` twice (baseline vs baseline) and set the ratio just above the observed AA noise (memory [[reference-visual-diff-baseline-noise]]), never a guessed 0.000%.
- [ ] `node tools/visual-diff.js --check` → all views PASS, new view(s) within floor, **no pre-existing view perturbed**.

## Step 3 — Wire the arbiter
- [ ] `tools/_extract-view-important.js`: add a NEW learn key (`#learnExplainScroll`, `#learnBookOverlay`, `.textbook-pages-flow`) to its `VIEWS` — **do NOT drop `#feedbackView` / `.sidebar`**. Re-run; `git diff tools/_view-important.json` to confirm L24577 (height) / L24598 (min-height) / L24599 (padding) now appear and the `#feedbackView` border-radius probes are unchanged.
- [ ] If `height`/`min-height`/`padding` aren't in the arbiter PROP_LIST, add them to the staple list (`_view-cascade-probe.js` L66-71).
- [ ] Add VIEW `{ id:'learn-textbook-overview', root:'#learnExplainScroll', preNav: drive enterTextbookOverflowState (both DOM variants if needed), ready: assert combined classes + overflow + Band-2 winner, interactions:[{label:'rest'}] }`. Append LAST; reset textbook state in a finally.
- [ ] `node tools/_view-cascade-probe.js --baseline` (on pristine HEAD CSS) → bakes the doubled-ID, !important-on, tall geometry into `_view-cascade-baseline.json`. Note baseline size delta.

## Step 4 — Fail-closed proof (R4/AC4) — the acceptance gate
For EACH at-risk decl (height:100% L24577; min-height:100% L24598; padding-bottom L24599):
- [ ] Temporarily delete the decl from `app/style.css` (working tree only).
- [ ] `node tools/_view-cascade-probe.js --check` and `node tools/visual-diff.js --check`.
- [ ] Record the result in `results.md`: **detected** (offsetHeight/pixel delta above ratio → load-bearing) or **undetected even on the maximal fixture** (→ NOCOMP-safe). If undetected, TUNE the fixture (↑cards/cardHeight for height+padding; adjust fill height for min-height) and retry; if still undetected at a plausibly-maximal fixture, document NOCOMP-safe.
- [ ] `git checkout -- app/style.css` (REVERT — Band-2 must end byte-identical to `main`).
- [ ] Verify revert: `git diff app/style.css` empty.

## Step 5 — Derive the FRESH keep-set (only for decls proven load-bearing)
- [ ] For each decl Step 4 proved load-bearing, add its pristine line number to `tools/_keep-important.json` — **re-derived from THIS pass**, not seeded from a prior file (memory [[feedback-rederive-keepset]]; spec Rule 6.3 "commit the MINIMAL keep-set"). A zero/small yield is a successful floor-proof.
- [ ] Re-run `_view-cascade-probe.js --check` clean with the keep entries present.

## Step 6 — Render-neutrality control
- [ ] Apply a **no-op** control de-double of the 2 at-risk rules (preserve the winning value), run both `--check`s, confirm the new view(s) stay within floor and the report is otherwise byte-identical (stash-trick); then revert the control. (Proves the witness passes a true no-op, not just fails a deletion.)

## Step 7 — Full gate sweep + docs
- [ ] `npm run check` green.
- [ ] `node tools/css-probe.js --check` → 21 states byte-identical (unchanged).
- [ ] `node tools/visual-diff.js --check` → all PASS, pre-existing views within floor.
- [ ] `node tools/_view-cascade-probe.js --check` → clean.
- [ ] Inline-style audit: confirm no app/*.js writes the witnessed props on these elements in unprobed states (we don't strip, so this is a sanity check).
- [ ] Update `docs/REFACTOR_DONE.md` §A4 precondition: mark the witness built, reference the new view id(s) + arbiter VIEW, reconcile the S14 gap entry (§A0). Update the project memory pointer if the A4 precondition status changes.
- [ ] Fill `results.md` (per-decl verdict table, baseline-size delta, calibrated failRatios, the fail-closed numbers).

## Validation command reference
```bash
npm run check
node tools/css-probe.js --check          # 21 states byte-identical
node tools/visual-diff.js --baseline     # write new PNGs (commit them)
node tools/visual-diff.js --check        # spatial gate
node tools/_view-cascade-probe.js --baseline   # arbiter baseline (262MB+)
node tools/_view-cascade-probe.js --check      # arbiter gate
```

## Rollback points
- After Step 2: new views isolated → delete to revert.
- After Step 4: ANY failure to revert `app/style.css` is a STOP — re-`git checkout` before proceeding.
- Whole task: pure additive; rollback = drop new views/VIEW + revert the 3 json/tool deltas + new PNGs.

## Definition of done (maps to PRD AC)
- AC1 overflow asserted in-code; AC2 baseline + calibrated failRatio committed; AC3 fresh keep-set covers the load-bearing at-risk decls; AC4 fail-closed numbers recorded + Band-2 reverted byte-identical; AC5 all gates green + 21 css-probe states unchanged; AC6 REFACTOR_DONE §A4 reconciled.
