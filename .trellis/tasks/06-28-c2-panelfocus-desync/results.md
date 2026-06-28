# C2 — results (2026-06-28)

**Outcome: FIXED, probe-neutral, baseline UNCHANGED.** The best-case fork from
design.md §3 — the corrected DOM produces byte-identical computed values, so the
committed `tools/css-probe-baseline.json` proof artifact stays valid and needed no
re-capture.

## What changed (harness-only; production CSS/JS untouched)

- `tools/test-utils.js` `resetLessonChromeState()` — now also
  `classList.remove('chat-collapsed', 'explain-collapsed')` so a sticky collapse
  cannot leak between probe/visual-diff states.
- `tools/css-probe.js` S2-qa-wide + S3-qa-full `enter()` — drive the real
  `learnPanelFocus = '<focus>'; applyLearnPanelFocusState();` path (app.js:1116)
  instead of poking `dataset.panelFocus`; assert-as-entered upgraded to a
  fail-closed state+winner check (`panel-qa-*` present AND `chat-collapsed` cleared
  AND `#learnFollowupBar` present AND min-height 152px winner).

## Verification (all green)

| Gate | Result |
|---|---|
| `npm run check` | PASS (both edited files in the check set; test-utils unit smoke 7/7) |
| `css-probe --check` | PASS — **byte-identical incl. S2/S3** (14 states / 488 probes). Proves `applyLearnPanelFocusState()` is reachable from `page.evaluate`, `.panel-qa-*` lands, `chat-collapsed` clears, and no FOLLOWUP_PROBE value moved. |
| `visual-diff --check` | PASS — all 35 views. Stash-trick (with vs without the test-utils change): helper-using views 15/16/20/21/26 byte-identical (0.366%/0.366%, 0/0/0) → render-neutral proven; the 0.366% is pre-existing lesson text-AA noise (same on non-helper views 06–09). |

## Acceptance criteria — status

- [x] S2/S3 enter() render the app's real qa-wide/qa-full composer DOM (class + collapse cleared + JS var synced).
- [x] resetLessonChromeState clears chat-/explain-collapsed.
- [x] Assert-as-entered upgraded to fail-closed state+winner (R8).
- [x] css-probe --check byte-identical against committed baseline (no re-baseline needed).
- [x] visual-diff unaffected — proven via stash-trick, not assumed.
- [x] npm run check passes.
- [x] Honest reporting: probe-neutral / baseline-unchanged (NOT baseline-correcting).

## Why this unblocks the chain

S2/S3 are now a trustworthy pre-collapse composer baseline (captured against the DOM
the app actually renders) — the §A4 prerequisite "Land C2 before the composer work."
A4 still also needs the S4–S11 harness expansion (separate A0 task) before the
composer war-pairs can be touched; A4 then unblocks ~371/404 doubled-IDs for the big
A2 sweep.

## Lines drifted vs REFACTOR_DONE §C2 (re-measured this session)

`applyLearnPanelFocusState` app.js 2725→**1116** (post-Workstream-B shrink); S2/S3
enter css-probe.js 206-240→**383-418**; resetLessonChromeState test-utils.js
219-234→**219** (stable). Re-derived per [[feedback-reconcile-plans-against-git]].
