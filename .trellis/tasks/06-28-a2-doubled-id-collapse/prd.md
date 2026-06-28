# A2 — doubled-ID collapse (safe-now subset)

CSS-collapse Workstream A, section A2. De-double `#x#x` ID-inflation selectors in
`app/style.css` where the extra specificity is **not** load-bearing, with zero
visual regression (computed-style-proven).

## Goal

Reduce the doubled-ID count in `app/style.css` by collapsing the subset that is
provably redundant (not defending a cascade competitor and not part of the
A4-blocked cross-file arms race), gated by css-probe + visual-diff + arbiter.

## Confirmed facts (ground-truth, HEAD `62ddf06`, measured this session — NOT from docs)

- **404 doubled-ID occurrences / 264 selector lines / 19 distinct IDs** in `app/style.css`
  (`grep -E '#(id)#\1'`). Matches the doc's "404" — but that is the only number that matched; the
  *shape* below was re-derived per `[[feedback-reconcile-plans-against-git]]`.
- **~371 (92%) are the `#learnView` §3d composer cluster** (`#learnView` 246, `#learnBody` 54,
  `#learnChatCol` 34, `#learnFollowupBar` 21, `#learnChatContent` 13, lecture overlays). Every one
  of these IDs **also appears in `app/css/runtime-collapsed.css`** → they are the cross-file
  specificity weapon (cascade-and-collapse Rule 4). Collapsing them now ties the runtime rule →
  runtime wins on source order → regression. **A4-blocked** (and A4 is itself gated on open
  landmine **C2**, the css-probe panelFocus desync). OUT OF SCOPE here.
- **~33 are NOT in `runtime-collapsed.css`** — the only A2 surface actionable before A4:
  - **Close-button group, L24685–24706** — ONE grouped 7-arm rule (learn/topbar/settings/feedback/
    preference/courseTracker/mistakeNotebook close buttons). This is the named **L24702 carve-out**
    (`border:0 !important`). The `#feedbackView#feedbackView` arm is **proven DEFENSIVE**: de-doubling
    it to (2,1,0) ties L27005 `#feedbackView #feedbackCloseBtn.feature-close-btn` (also (2,1,0), but
    *later* in source) which sets `border:1px solid !important` → css-probe regression on `border`
    (display:none hides it from pixel-diff — exactly the spec's css-probe-over-pixel rationale). The
    other 5 arms have no same-ID competitor but share the grouped declaration block → selective
    de-doubling needs a rule split.
  - **`#mistakeNotebookView` — 13** (L24691 close-arm + L25259–25342 grid/list/workspace layout band;
    5 of 13 are `@media`-gated). MN view is DOM-isolated; harness has MN coverage (view 03/04). Best
    candidate cluster. Requires per-occurrence cascade-competitor analysis (Rule 3 + Rule 6).
  - **Learn-internal non-cross-file — ~15** (`#learnExplainScroll` 4, `#learnBookOverlay` 4,
    `#learnExplainContent` 2, `#learnModeMenu` 4, `#learnResizer` 1). State-gated by `data-panel-focus`;
    `#learnModeMenu` is a composer-named selector (Rule 4 risk). Higher risk (state matrix), lower confidence.

## Disciplines (non-negotiable, from spec + memory)

- **Classify before strip** (Rule 3): per-occurrence `NOCOMP` / `LOSES` / `DEFENSIVE`. De-double only
  proven-redundant occurrences. **Verify per-occurrence, never per-token** (State-gating reality).
- **Re-derive, never trust the doc breakdown** (`[[feedback-rederive-keepset]]`): the "12 narrow / 28
  state-matrix / 7 new-view" split in REFACTOR_DONE is NOT to be trusted — re-derive each occurrence.
- Preserve the cross-file invariant: style.css effective specificity > runtime-collapsed (Rule 4).
- **5-gate verification** for any change: cascade-competitor (top-level only) + arbiter `--check` +
  css-probe `--check` + visual-diff `--check` + inline-style/`@media` audit (verification.md).

## Scope decision (SETTLED 2026-06-28, re-derived at HEAD `62ddf06`)

Numbers reproduce **exactly** at HEAD (404 / 264 lines / 19 IDs — zero drift). Per-occurrence line
inspection (not token counts) decomposes the 33 "actionable" into three groups:

- **Group A — close-button grouped rule (6 occ, L24685–24706):** ONE 7-arm rule, all `display:none`;
  `#feedbackView` arm proven DEFENSIVE (ties L27005 `border:1px`). De-doubling the other 5 needs a
  **rule split** = structural surgery on hidden buttons, ≈0 benefit. → **CARVE-OUT** (documented, deferred).
- **Group B — `#mistakeNotebookView` band (13 occ: L24691 close-arm + L25259–25342 layout):** DOM-isolated
  view, harness coverage (views 03/04), 5 `@media`-gated. → **THIS TRANCHE.**
- **Group C — learn-internal (15 occ, L23954–25147):** every occurrence is a tail-ID on the A4-blocked
  `#learnView#learnView #learnBody#learnBody #learnChatCol#learnChatCol` prefix; ~7 sit in the Band-2
  `.chapter-overview-active.learn-textbook-active` **no-css-probe-witness gap** (S14 dropped). → **DEFER TO A4.**

**Decision (FlyM1ss):** *MN-band warm-up → A4.* Ship Group B as ONE small 5-gate PR to exercise the
classify→5-gate→ship pipeline on safe ground, then immediately start A4 (now UNBLOCKED: C2 merged
`4d7b47b`/#120; A0 harness complete S4–S11 #122 + S13 #123). The "safe-now subset" premise (progress
*while A4 blocked*) is now obsolete — Groups A & C fold into / wait for A4.

## Acceptance Criteria

- [x] Every de-doubled MN occurrence (Group B) passes all five gates byte-identical. → `.mistake-workspace` ×2, all 5 green (see results.md).
- [x] doubled-ID count drops by the de-doubled occurrences; `npm run check` passes. → 404→402, check PASS.
- [x] Carve-outs (Group A close-button rule / Group C learn-internal / A4-blocked composer cluster) documented, not silently skipped. → results.md.
- [x] Honest-yield reporting: "N de-doubled, M proven-DEFENSIVE-kept" — a small N is success, not failure. → N=2, M=10 (MN-band DEFENSIVE).

## Out of scope

- The ~371 `#learnView` §3d composer-cluster doubled-IDs (A4 — now unblocked, next workstream).
- Group A close-button rule-split + Group C learn-internal (deferred per scope decision above).
- Any `!important` strip (A1/A3/A4 territory) — this task is doubled-ID specificity only.

## Open questions (blocking)

- ~~Scope of this tranche~~ — RESOLVED above: Group B (`#mistakeNotebookView` band) only.
