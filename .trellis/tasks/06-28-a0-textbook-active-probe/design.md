# A0 `.learn-textbook-active` — design

Harness-only: `tools/css-probe.js` (new `PROBE_STATES` entries + their probe-set consts,
+ a local `resetLearnChrome` floor) and additive `tools/css-probe-baseline.json`. No
production edits. Captured on this branch off pre-collapse `main`. Builds directly on the
S4–S11 / C2 pattern: drive the **real** production fn from `page.evaluate`, then fail-closed
assert-as-entered + a discriminating winner sentinel before snapshot.

## 1. State drivers (both fns are top-level → reachable from page.evaluate)

| State | Production driver (verified, live line) | Resulting DOM |
|---|---|---|
| **S13** textbook-normal | `resetLearnChrome` floors `_learnLayoutMode='lesson'` → `_setLearnMode('textbook')` (app.js:2449) | `#learnBody.learn-textbook-active`, NOT `.chapter-overview-active*` |
| **S14** textbook+overview (conditional) | set `_learnLayoutMode='overview'` (the **caller** sets it — app.js:2123) → `setChapterOverviewLayoutActive(true)` (app.js:1062 only **reads** `_learnLayoutMode`, adds `chapter-overview-active`) → `_setLearnMode('textbook')` | `#learnBody.chapter-overview-active.learn-textbook-active` |

> `_setLearnMode(mode)` toggles `.learn-textbook-active` on `#learnBody` iff
> `mode==='textbook' && supportsTextbookLayout`, where `supportsTextbookLayout` ⇔
> `_learnLayoutMode ∈ {lesson, overview_lesson, overview}` (app.js:2453). S13 relies on the
> `resetLearnChrome` floor leaving `_learnLayoutMode='lesson'`; S14 must **assign
> `_learnLayoutMode='overview'` itself FIRST** — the overview driver only adds the class, it does
> NOT set the mode (production sets it on a separate caller line, app.js:2123; the S10 probe at
> css-probe.js:854 does the same) — then `setChapterOverviewLayoutActive(true)` →
> `_setLearnMode('textbook')` so both classes coexist **in the production-correct layout mode**.

## 2. Sentinels — the fail-open-risk surface (derive empirically; AVOID inline-masked props)

`_setLearnMode` writes several **inline styles** that mask the very CSS the doubled-ID rule
sets — an inline-masked prop cannot witness a CSS change, so it is a non-discriminating
sentinel (the S7 lesson). Specifically AVOID:
- `#learnExplainContent` `display` — CSS L25148 `display:none !important` **and** JS inline
  `_explainContent.style.display='none'` (app.js:2469) both resolve `none`.
- `#learnBookOverlay` `display` — CSS L25133 `display:block !important` **and** JS inline
  `_bookOverlay.style.display='block'` (app.js:2460) both resolve `block`.

PREFER CSS-only props the doubled-ID rule wins that JS never inlines:

- **S13 (Band 1) candidates:** `#learnExplainScroll` `background-image` = the Band-1 2-radial
  signature (L25124: `circle at 18% 6% rgba(255,255,255,0.82)` + `circle at 82% 16% rgba(255,255,255,0.44)`)
  · `#learnBookOverlay` `background-color:transparent` / `position:relative` (L25131/39) ·
  `.textbook-pages-flow` `gap` clamp (L25144). **Primary sentinel: `#learnExplainScroll`
  `background-image` matching the Band-1 gradient params** (proves Band-1 cascade, not base, is live).
  - ⚠ **`padding-top:0px` is NOT a discriminator (fail-OPEN).** The resting-lecture base ALSO forces
    `padding:0 !important` (L24029) + `padding-top:0 !important` (L24886) on `#learnExplainScroll`, so
    Band-1's `padding-top:0` (L25120) is **base-equal** and cannot witness the rule's deletion. Keep it
    only as a non-load-bearing companion; never assert it alone.
  - ⚠ **Same-element bg competitor is the base, not "5-layer".** The base `#learnExplainScroll` bg is
    itself 2-radial (L24030: `circle at 20% 8% rgba(.86)` + `circle at 82% 18% rgba(.22)`), NOT the
    unrelated 5-layer S4 *chat* bg — discriminate by **exact gradient params**, and let
    implement-step-1's matrix confirm base ≠ Band-1 before asserting.
- **S14 (Band 2) candidates — must be DISTINCT from Band 1 and overview-alone:**
  `#learnExplainScroll` `min-height:0px` + `height:100%` (L24577-78 — Band 1 sets NEITHER, so
  these discriminate S14 from S13) · `#learnBookOverlay` `height:auto` (L24592, Band 1 has no
  height) · `#learnChatCol`/`#learnResizer` `display:none` (L24606-08 — verify NOT inline-masked
  and distinct from S10/overview-alone). **Primary sentinel: `#learnExplainScroll` `min-height
  0px` AND `height 100%`** — uniquely the combined `(6,2,0)` rule.

**Derivation tooling:** a throwaway `tools/_explore-textbook.js` (one Chromium run, cross-state
computed-value matrix: base / S13 / S10-overview-alone / S14), pick the discriminators, then
delete it (mirror the deleted `tools/_explore-s4-s11.js`).

## 3. S14 ship/drop gate (the S5 discipline)

Ship S14 **only if** the matrix shows a property where the Band-2 `(6,2,0)` rule produces a
value that (a) differs from base, (b) differs from the value the property takes when the Band-2
rule is **removed in the same textbook+overview DOM** — the post-deletion fallback, e.g. the
overview-alone `#learnExplainScroll` height/min-height at L23109/L23111 (this is the true
deletion-witness target; "differs from S13's Band-1 value" is only a weaker proxy) — and (c) is
NOT inline-masked. If every Band-2 winner is either inline-masked or equal to that fallback
(no constructible fail-closed sentinel) → **drop S14**, document in `results.md` exactly like
S5, and leave the 7 Band-2 occurrences for a future probe. S13-only is a valid success.

## 4. Reset / ordering (local-helper floor — within R3)

- New states slot **after S10/S11** (the last in-lesson states) and **before** the cross-view
  S-feedback-* block — same in-lesson-before-cross-view contract as S4–S11.
- `resetLearnChrome` (LOCAL to css-probe, not the shared `resetLessonChromeState`) gains one
  line: after the existing `_learnLayoutMode='lesson'` floor, call
  `if (typeof _setLearnMode === 'function') _setLearnMode('lecture')` to undo textbook mode
  (clears `.learn-textbook-active`, restores `_explainContent`/`_bookOverlay` inline styles)
  through the real production path. This is a **no-op for the resting §1.1-1 lesson** (it opens
  in lecture mode) → pre-existing state keys stay byte-identical (proven by `--check`). Zero
  visual-diff blast radius (local helper, not the shared one) → no stash-trick needed.
- S14 (if shipped) runs after S13 and sets `_learnLayoutMode='overview'`; the next
  `resetLearnChrome` floors it back to `'lesson'` (existing line) + `_setLearnMode('lecture')`.
- **Capture timing (vs A2):** the baseline MUST be captured on **pre-collapse `main`** before A2
  lands its Band-1/Band-2 strip. Do NOT rebase this task onto the A2 strip — capturing post-collapse
  would bake the stripped geometry, and the baseline could no longer witness the deletion it exists to guard.

## 5. Verification (5-gate, test-only additive)

1. `npm run check` (css-probe.js is in the node --check set).
2. `css-probe --check` — S13 (+S14) pass their own sentinels; ALL pre-existing states byte-identical.
3. `css-probe --baseline` then `git diff tools/css-probe-baseline.json` proves additive `+N/−0`.
4. `visual-diff --check` 37/37 — render-neutral (only the LOCAL `resetLearnChrome` changed, and
   it is a no-op for the resting lesson; spot-confirm with the stash-trick only if any old key moves).
5. `git diff --stat` shows ONLY `tools/css-probe.js` + `tools/css-probe-baseline.json`.

## 6. Risks

| # | Risk | Mitigation |
|---|---|---|
| 1 | Sentinel pins an inline-masked prop (`display`) → fail-open baseline that can't witness a CSS change | §2 AVOID list; pick padding/background/position/min-height; verify empirically |
| 2 | `_setLearnMode('lecture')` floor is NOT a no-op on the resting lesson → an old key moves | run `--check` after the reset edit; if any pre-existing key drifts, the lesson didn't rest in lecture mode — re-scope the floor |
| 3 | S14 winner not distinct from S13/overview-alone → fail-open | §3 gate: drop S14 (S5 precedent) rather than force it |
| 4 | `_learnLayoutMode='overview'` from S14 leaks into a later state | existing `resetLearnChrome` floor restores `'lesson'`; assert `chapter-overview-*` absent in S13's enter |
| 5 | Band-2 `#learnChatCol`/`#learnResizer` `display:none` is inline-masked by `setChapterOverviewLayoutActive` itself (app.js:1105/1109), NOT by `_setLearnMode` | treat it as a secondary sentinel; lead with the non-masked `min-height:0`/`height:100%` |
