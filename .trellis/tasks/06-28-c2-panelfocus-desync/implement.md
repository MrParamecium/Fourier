# C2 — implementation plan

Branch off `main` (we're on `main`; branch first). Suggested: `fix/c2-panelfocus-desync`.
Harness-only; small. Per-PR gate pattern from REFACTOR_DONE §5.

## Step 0 — branch + confirm pre-edit baseline is clean

- `git checkout -b fix/c2-panelfocus-desync`
- Sanity that the committed baseline reflects current `main`: `node tools/css-probe.js --check`
  should pass **before** any edit (proves the harness runs green here, so a post-edit
  failure is attributable to the edit). ~30s Chromium spawn.

## Step 1 — `tools/test-utils.js` `resetLessonChromeState` (L219)

Add `body.classList.remove('chat-collapsed', 'explain-collapsed')` alongside the
existing `delete body.dataset.panelFocus` + `chapter-overview-*` removals. Keep the
pager-refresh + resize + settle tail unchanged.

## Step 2 — `tools/css-probe.js` S2/S3 `enter()` (S3 L400-418 first, then S2 L383-398)

For each, replace the `dataset.panelFocus =` hand-poke with the
`learnPanelFocus = '<focus>'; applyLearnPanelFocusState();` drive (design §1), and
upgrade the assert to the state+winner form (design §2). Edit S3 before S2 so line
numbers don't shift under the first edit.

Quick reachability probe (run once, throwaway) to de-risk Risk #1 before committing to
the approach:
```
node -e "/* spawn bridge + page, evaluate typeof applyLearnPanelFocusState + typeof-read learnPanelFocus */"
```
or simpler: add a temporary `assertOrThrow(typeof applyLearnPanelFocusState==='function', ...)`
in S2 enter, run `--check`, confirm it doesn't throw, then finalize.

## Step 3 — `npm run check`

Fast `node --check` over the harness files (css-probe.js is in the check set; verify
test-utils.js is too). Must pass.

## Step 4 — `css-probe --check` (the load-bearing gate)

`node tools/css-probe.js --check`. Resolve the empirical fork (design §3):
- byte-identical → done, baseline unchanged.
- S2/S3 shift → inspect `tools/css-probe-report.md`, validate each shifted value is the
  genuine composer geometry, `node tools/css-probe.js --baseline`, `git diff` to confirm
  ONLY S2/S3 keys changed, commit the new baseline with justification.

## Step 5 — `visual-diff --check` spot-check

`npm run pregen:bg-ch1` first (visual-diff fails closed on missing lesson cache), then
`node tools/visual-diff.js --check` — confirm lesson views (06/08/09/15/16) render-neutral
(prove via with/without diff per noise-floor caveat if a view shows text-AA noise).

## Step 6 — commit + finish-work

- Commit harness change (+ baseline if re-captured). Short PR title (≤50 chars), e.g.
  `fix(harness): C2 css-probe panelFocus desync`. Phase tags / §refs in the body.
- `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>` trailer.
- Trellis: `task.py finish`; update REFACTOR_DONE §1 (`css-probe S2/S3 panelFocus desync`
  box) + the §C2 entry to ✅; note in workspace memory whether baseline shifted.
- Open PR to `main` only when FlyM1ss asks (per repo git rule).

## Done when

All `prd.md` acceptance criteria checked, both harness gates green (css-probe against
the correct baseline, visual-diff render-neutral on lesson views), `npm run check`
green, and the probe-neutral-vs-baseline-corrected outcome reported honestly.
