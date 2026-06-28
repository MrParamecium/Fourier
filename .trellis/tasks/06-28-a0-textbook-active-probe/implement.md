# A0 `.learn-textbook-active` — execution plan

Ordered checklist for `trellis-implement`. css-probe.js ONLY (+ its baseline). Mirror the
S4–S11 state objects already in `tools/css-probe.js` (~L680–910).

## Steps

1. **Empirical matrix first (throwaway).** Add a temporary `tools/_explore-textbook.js` (one
   Chromium run, mirror the deleted `_explore-s4-s11.js`) that opens the §1.1-1 lesson and dumps
   `getComputedStyle` for the §2 candidate props across 4 conditions: **base (lecture)**, **S13**
   (`_learnLayoutMode='lesson'` → `_setLearnMode('textbook')`), **S10 overview-alone**
   (set `_learnLayoutMode='overview'` → `setChapterOverviewLayoutActive(true)`), **S14**
   (set `_learnLayoutMode='overview'` → `setChapterOverviewLayoutActive(true)` → `_setLearnMode('textbook')`).
   ⚠ S10 **and** S14 MUST set `_learnLayoutMode='overview'` explicitly (the driver does not) — otherwise
   both run in `'lesson'` and the matrix compares two non-production states that silently agree.
   Record the matrix in `results.md`. Pick: S13 discriminator(s) — expect `padding-top:0` to be
   base-equal (§2), so lead with `#learnExplainScroll` `background-image` — and, per the §3 gate, decide
   S14 ship/drop. **Delete `_explore-textbook.js` before finishing.**

2. **Extend the local `resetLearnChrome`** (css-probe.js ~L115, right after the `_learnLayoutMode`
   floor): add `try { if (typeof _setLearnMode === 'function') _setLearnMode('lecture'); } catch (_) {}`
   with a comment explaining it undoes textbook mode through the real path and is a no-op for the
   resting lesson. Do NOT touch the shared `resetLessonChromeState`.

3. **Add `S13_PROBES`** (and `S14_PROBES` if shipping) probe-set const(s) near the existing
   `FOLLOWUP_PROBES`/`CHAT_STATE_PROBES`, listing the Band-1 (Band-2) doubled-ID property tuples
   `['#sel', pseudo, 'prop']` from the empirical matrix — the props the doubled-ID rule wins.

4. **Add the S13 state object** after S10/S11, before the cross-view feedback block. Shape:
   `resetLearnChrome` → `page.evaluate` drives `_setLearnMode('textbook')` (fail-closed reachability
   return) → `assertOrThrow(driven, …)` → `waitForTimeout(400)` → assert `#learnBody` has
   `.learn-textbook-active` and NOT `.chapter-overview-active*` (fail-closed) → assert the empirical
   Band-1 winner sentinel(s) → `probes: S13_PROBES`.

5. **Add the S14 state object** (only if §3 gate passed): set `_learnLayoutMode='overview'` explicitly
   FIRST (mirroring production + the S10 probe at css-probe.js:854 — the overview driver does NOT set the
   mode), then drive `setChapterOverviewLayoutActive(true)`, then `_setLearnMode('textbook')`; assert BOTH
   classes present; assert the Band-2-distinct
   sentinel (`min-height:0px` + `height:100%`); `probes: S14_PROBES`. If dropped, add a comment block
   in css-probe.js mirroring the S5-drop comment (why no fail-closed sentinel exists).

6. **Regenerate baseline additive-only:** `node tools/css-probe.js --baseline`, then
   `git diff tools/css-probe-baseline.json` — confirm ONLY new S13 (+S14) keys; every pre-existing
   key byte-identical. If an old key moved, step 2's floor isn't a no-op → fix before continuing.

7. **Update `results.md`** with the per-state sentinel table, the empirical matrix, and the
   S13/S14 ship/drop decision (+ S5-style rationale if dropped, **and the named Band-2 coverage gap**
   per prd "Residual risk" when S14 is dropped).

## Validation commands

```bash
npm run check
node tools/css-probe.js --check          # S13(+S14) pass sentinels; old states byte-identical
git diff --stat tools/css-probe-baseline.json   # additive +N/-0
node tools/visual-diff.js --check        # 37/37 render-neutral
git diff --stat                          # ONLY tools/css-probe.js + baseline
```

## Risky points / rollback

- **Step 2 floor not a no-op** (Risk #2) → an old baseline key drifts. Rollback: revert the
  `_setLearnMode('lecture')` line; the resting lesson wasn't in lecture mode — re-scope (clear
  `.learn-textbook-active` directly as a last resort, still local).
- **S14 fail-open** (Risk #3) → drop S14, ship S13 only.
- Never edit `app/app.js`, `app/style.css`, `runtime-collapsed.css`, or `test-utils.js`.
