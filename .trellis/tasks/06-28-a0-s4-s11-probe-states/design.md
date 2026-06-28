# A0 S4–S11 — design

> **IMPLEMENTED 2026-06-28 — see `results.md` for the final outcome.** Scope revised on
> evidence during implementation: **S5 DROPPED** (focus-within wins nothing under the
> `!important` wall → no constructible fail-closed sentinel). Shipped: **S4, S6, S7, S9,
> S10, S11**. All sentinels were derived empirically per §2 below (throwaway
> `tools/_explore-s4-s11.js`, now deleted). The §3d composer chrome proved
> panel-invariant at desktop, so the §1 plan to "start S4–S7 from FOLLOWUP_PROBES" was
> narrowed to pin only each state's actual cascade winner.

**Scope (decided):** S4, S5, S6, S7, S9, S10, S11. **S1/S8 deferred** (view 06 pixel-covers
resting; add later only if A4's gate needs a computed-style resting baseline).

Harness-only: `tools/css-probe.js` (new `PROBE_STATES` entries) + additive
`tools/css-probe-baseline.json`. No production edits. Captured on this branch off
pre-collapse `main`. Builds on the C2 pattern: drive the **real** production state
function from `page.evaluate`, then fail-closed assert-as-entered + R8 winner sentinel.

## 1. State drivers (all are top-level fns / `let` → reachable from page.evaluate, proven by C2)

| State | Production driver (verified, live line) | Resulting DOM |
|---|---|---|
| **S4** normal+chat-visible | `openLearnQaSidebar()` (app.js:1277): sets `learnPanelFocus='normal'; isLearnChatCollapsed=false` → `applyLearnChatCollapsedState()` | `#learnBody` no panel-* / not chat-collapsed; chat col visible — the §3d radial war in *normal* split |
| **S5** focus-within | enter S2 (qa-wide, C2 driver) → `page.focus('#learnFollowupInput')` (the `.input-field`) → freeze anims | `#learnFollowupBar:focus-within` active |
| **S6** empty, not chat-active | enter S2 → `learnChatContent.replaceChildren()` → `updateLearnChatEmptyState()` (app.js:2077) | `#learnChatCol` NOT `.is-chat-active`; empty-state shown |
| **S7** is-chat-active | enter S2 → append a child to `learnChatContent` → `updateLearnChatEmptyState()` | `#learnChatCol.is-chat-active`; empty-state hidden |
| **S9** explain-collapsed | `openLearnQaSidebar()` (clears chat-collapsed) → `isLearnExplainCollapsed=true; applyLearnExplainCollapsedState()` (app.js:1292) | `#learnBody.explain-collapsed` not `.chat-collapsed` |
| **S10** chapter-overview | `_learnLayoutMode='overview'; setChapterOverviewLayoutActive(true)` (app.js:1062) | `#learnBody.chapter-overview-active` |
| **S11** overview-split | `_learnLayoutMode='overview_lesson'; setChapterOverviewLayoutActive(true)` | `#learnBody.chapter-overview-split-active` |

> `_learnLayoutMode` (app.js:850) and `learnPanelFocus`/`isLearnChatCollapsed`/
> `isLearnExplainCollapsed` are top-level `let`s — assign them in the `page.evaluate`
> body before calling the driver, exactly as C2 does for `learnPanelFocus`.

## 2. Sentinels + property sets (per-state; the fail-open-risk surface)

Each state's `enter()` MUST assert a **discriminating computed value the gated rule
wins** before snapshot (R8 / verification.md). These are derived **empirically** during
implementation — write the driver, run a throwaway probe to read the live computed
values, pick the value that proves the state-gated rule (not a base rule) is the winner,
bake it as the sentinel. Plan:

- **S4/S5/S6/S7 (§3d composer):** start from `FOLLOWUP_PROBES` (the existing §3d set:
  `#learnChatCol` bg + `#learnFollowupBar` min-height/radius/bg/box-shadow/backdrop-filter/
  z-index/overflow). **Do NOT blindly reuse S2's `assertFollowupBarWinner` (152px)** — the
  followup-bar winner/value may differ in *normal* split (S4) vs qa-focus (S2). Derive each
  state's sentinel from its own live computed value. S5 additionally probes any
  `:focus-within`-gated composer property (settle the transition first per verification.md).
  S6 probes the empty-state node visibility cascade; S7 the `.is-chat-active` variant.
- **S9/S10/S11 (explain-rail / overview doubled-IDs):** property set = the explain-rail +
  chapter-overview doubled-ID rules from `PHASE3.6_SPEC.md §6.2` (the 13 explain-rail rules
  + S10/S11 negation rules). Sentinel = a discriminating value on `#learnExplainScroll` /
  `#learnExplainContent` / the explain rail that the doubled-ID rule wins. Cross-check
  against the `#learnView#learnView` doubled-ID inventory so the probe actually pins the
  ID-inflated selector A2 will later collapse.

> Derivation tooling: a temporary state added to `css-probe.js` + a one-off
> `node -e`/`--baseline`-to-scratch run that dumps `getComputedStyle` for the candidate
> properties; pick the discriminator, then finalize the sentinel and probe list.

## 3. Baseline = additive-only

- Capture with `node tools/css-probe.js --baseline` on this branch (off pre-collapse main).
- `git diff tools/css-probe-baseline.json` must show **only new S4–S11 keys**; every existing
  key (S2/S3/S12/S-page-corner/N0–N4/S-feedback-*) byte-identical. If an existing key moves,
  a new state leaked shared chrome (ordering bug) — fix before committing.
- New states are in-lesson (they mutate the one open lesson page), so they slot **before** the
  cross-view S-feedback-* block, after N4 — same ordering contract as verification.md.

## 4. Reset / ordering

Between states use the **C2-fixed `resetLessonChromeState`** (now clears chat-/explain-
collapsed) + `resetLearnChrome`. S10/S11 set `_learnLayoutMode` — reset must restore it to
`'lesson'` (extend `resetLessonChromeState` or reset inline in each overview state's enter)
so a later composer state isn't captured in overview mode. **This is the one place the C2
helper may need a follow-on tweak** — confirm `_learnLayoutMode` is floored between states.

## 5. Verification (per the 5-gate discipline, adapted — test-only additive)

1. `npm run check` (css-probe.js in the set).
2. `css-probe --check` — all NEW states pass their own sentinel; all OLD states byte-identical.
3. `css-probe --baseline` then `git diff` proves additive-only.
4. `visual-diff --check` — render-neutral (production untouched; but S10/S11 reuse the
   `resetLessonChromeState`/overview path shared with views 15/16 — stash-trick spot-check those).
5. No production code touched (grep the diff: only `tools/css-probe.js` + baseline).

## 6. Risks

| # | Risk | Mitigation |
|---|---|---|
| 1 | Reusing S2's 152px sentinel where the state's real winner differs → fail-open baseline | derive each sentinel empirically from live computed values; never copy across states |
| 2 | `_learnLayoutMode` leaks overview mode into a later state | floor it in reset; assert `chapter-overview-*` absent in non-overview states' enter |
| 3 | S7's injected chat child pollutes a later state | use `replaceChildren()` in reset / S6 to clear; S7's child is removed by the next reset |
| 4 | S5 focus-within read mid-tween | settle: wait > transition dur + `getAnimations().finish()` + double-rAF (feedback-hover precedent) |
| 5 | A new state's sentinel pins a base rule, not the gated doubled-ID rule (S9/S10/S11) | cross-check the discriminator against the §6.2 doubled-ID inventory; pick a value only the ID-inflated rule produces |
