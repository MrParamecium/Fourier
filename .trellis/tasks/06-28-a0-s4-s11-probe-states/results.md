# A0 S4–S11 — results (2026-06-28)

**Outcome: SHIPPED, additive-only baseline, all gates green.** 6 new css-probe
states added (S4/S6/S7/S9/S10/S11), each driving the **real** production function
with a fail-closed winner sentinel. Harness-only — zero production/`test-utils.js`
edits, so visual-diff is provably unaffected.

## Scope outcome (vs the decided S4/S5/S6/S7/S9/S10/S11)

The empirical exploration (`tools/_explore-s4-s11.js`, throwaway, deleted) drove all
7 candidate states and dumped a cross-state computed-value matrix. It reshaped the
plan on evidence — exactly the review→adjust the task called for:

- **S5 (`:focus-within`) DROPPED.** Focus genuinely engages (`activeElement =
  TEXTAREA#learnFollowupInput`, `.input-wrapper:focus-within` matches `true`), but
  every focus-within declaration LOSES to the `!important` wall — the wrapper resolves
  to `border:0` / `box-shadow:none` / transparent bg, byte-identical to non-focus, and
  the `#learnFollowupBar` chrome is forced `none` by the L19207 grouped rule. No gated
  rule wins → **no fail-closed sentinel is constructible** → a probe state would be
  fail-open (forever-passing), which the harness header explicitly forbids. Pixel
  coverage of the focused composer stays in **visual-diff view 09**.
- **S1/S8 (resting lesson) deferred** (pre-decided) — view 06 pixel-covers resting.
- **S4/S6/S7/S9/S10/S11 shipped.** Each has a proven, pure-CSS, **non-inline-masked**
  discriminating winner.

**Key empirical finding:** the §3d composer chrome (`#learnFollowupBar`
min-height/radius/bg/shadow/backdrop/z-index, `#learnChatCol` bg/shadow/isolation) is
**panel-invariant at desktop** — byte-identical across S2/S3/S4/S6/S7/S9/S10/S11. So
the new states pin only what each gates, never a 5th redundant copy of FOLLOWUP_PROBES.

## States + sentinels (all empirically derived)

| State | Driver (real production fn) | Winner sentinel (R8, pure-CSS) |
|---|---|---|
| S4-normal-chat | `openLearnQaSidebar()` | `#learnFollowupBar` min-height 152px + no panel-focus/collapse/overview class |
| S6-chat-empty | `applyLearnPanelFocusState()` + `replaceChildren()` + `updateLearnChatEmptyState()` | `#learnChatEmptyState` display:flex + visibility:visible (not-is-chat-active branch) |
| S7-chat-active | …+ append `.followup-bubble` + `updateLearnChatEmptyState()` | `#learnChatCol` padding `0px 0px 18px` (L19955) + `#learnChatContent` min-height 0px (L19966) |
| S9-explain-collapsed | `openLearnQaSidebar()` → `applyLearnExplainCollapsedState()` | `#learnExplainRestoreBtn` display:flex (restore tab unique to explain-collapsed) |
| S10-overview-active | `_learnLayoutMode='overview'` → `setChapterOverviewLayoutActive(true)` | `#learnExplainScroll` bg ⊇ `780px 520px at 8% 0%` (3-layer overview gradient) |
| S11-overview-split | `_learnLayoutMode='overview_lesson'` → `setChapterOverviewLayoutActive(true)` | overview gradient + chat col display ≠ none (distinguishes from S10) |

## Harness changes (css-probe.js only)

- `resetLearnChrome` (css-probe-LOCAL, not the shared `resetLessonChromeState`):
  floors `_learnLayoutMode='lesson'` (an overview state else leaks it into a later
  composer driver's `=== 'overview'` branch — app.js:1200/2086) and clears
  `learnChatContent` + re-syncs `updateLearnChatEmptyState` (else S7's bubble pollutes
  later states). Kept local → **zero visual-diff blast radius**.
- 6 new `PROBE_STATES` slotted after N4, before the cross-view feedback block
  (in-lesson-before-cross-view ordering); overview states (S10/S11) run LAST so their
  `_learnLayoutMode`/inline residue can't reach a composer state.
- 4 new probe-set consts (`S4_PROBES`, `CHAT_STATE_PROBES`, `EXPLAIN_COLLAPSE_PROBES`,
  `OVERVIEW_PROBES`).

## Verification (all green)

| Gate | Result |
|---|---|
| `npm run check` | PASS (css-probe.js in the set) |
| `css-probe --check` (pre-baseline) | 6 new states ENTER + pass their own sentinels; **0 probe diffs** on all 14 existing states → the reset-floor change is additive-neutral |
| `css-probe --baseline` + `git diff` | **+264 / −0** — only the 6 new state keys added; every pre-existing key byte-identical |
| `css-probe --check` (final) | **PASS — all 20 states byte-identical** |
| `visual-diff --check` | **37/37 pass** (production + test-utils untouched; 15/16 at 0.366% = pre-existing lesson text-AA noise, under 0.500%) |
| git scope | only `tools/css-probe.js` + `tools/css-probe-baseline.json` |

## Acceptance criteria

- [x] S4/S6/S7/S9/S10/S11 each render the real DOM via a production fn + fail-closed sentinel.
- [x] Sentinels derived empirically from live computed values (not guessed from CSS).
- [x] Pure-CSS, non-inline-masked winners (S7 keys off padding/min-height, not the JS-forced empty-state display).
- [x] S5 dropped with documented evidence (not silently); S1/S8 deferred.
- [x] Additive-only baseline proven (+264/−0); existing states byte-identical.
- [x] visual-diff render-neutral (no production/test-utils change).
- [x] `_learnLayoutMode` floor + chat-content reset kept local to css-probe (no shared-helper blast radius).

## What this unblocks / what remains

- **A4 (§3d composer) — second gate now MET.** Composer-state matrix in place
  (S4/S6/S7/S9 + S10/S11; S5 non-constructible, S1/S8 deferred). With §C2, A4 is unblocked.
- **A2 NEEDS-STATE-MATRIX (28 doubled-IDs):** S10/S11 + `.is-chat-active` (S6/S7) +
  `.panel-normal` (S4) now probe-covered. **Still needs a `.learn-textbook-active`
  state** (the 13 explain-rail rules — gated by textbook-active, NOT chapter-overview;
  the prd's original "S10 unlocks the 13" was a mis-attribution, corrected here) +
  `[data-custom-split]`.

## Lines re-measured this session (reconcile-against-git)

`applyLearnPanelFocusState` app.js **1116**; `setChapterOverviewLayoutActive` **1062**;
`openLearnQaSidebar` **1277**; `applyLearnExplainCollapsedState` **1292**;
`updateLearnChatEmptyState` **2077**; `_learnLayoutMode` decl **850**, readers 1200/2086.
is-chat-active floor L19955/19966; `#learnFollowupInput` index.html L767.
