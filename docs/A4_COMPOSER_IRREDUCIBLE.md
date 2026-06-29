# A4 §3d composer chain — verified irreducible-by-design

**Status: CLOSED 2026-06-29 (task `06-29-a4-composer-chain`, docs-only).**
This is the authoritative proof that the §3d learn-view composer-chain doubled-ID
pattern is **the load-bearing cross-file specificity-war mechanism, not removable
debt**, and that A4's "collapse-and-merge to reduce doubled-IDs" goal has ~0 safe yield.
It exists so future sessions do **not** re-attack an irreducible target (the trap
`feedback-reconcile-plans-against-git` warns about).

Method: 24-agent adversarial workflow at HEAD `9c27ba0` — 8 surface mappers, each
verified by 2 independent skeptics (cascade-correctness lens + gate-coverage lens).
**Two mapper verdicts were overturned by the cascade skeptic** (WP4, WP7); the
corrections are folded in below. Task-local raw output: the task `research/` dir.

## Why "collapse-and-merge" cannot reduce the count

The cross-file invariant is *style.css effective specificity > runtime-collapsed.css
effective specificity* (rcc loads last, so it wins ties). The doubled/tripled-ID
repetition is the **only** thing holding that strict inequality on the conflicting
props. Removing it ties or loses to rcc on source order → regression by construction.
A "lockstep" reduction (shrink both files in tandem) is *possible* for a few pairs but
(a) yields only a modest reduction, (b) is a high-risk two-file coordinated rewrite,
and (c) requires building witnesses for currently fail-open props first. The cost/risk
vastly exceeds the near-zero yield → **document-and-close** (decision: FlyM1ss, 2026-06-29).

## Re-derived line anchors (fixes the stale §A4 / PHASE3.6_SPEC anchors)

The previous doc anchors were all out of range (`style L41334`, `rcc L1976/L2036`
on files of 32,514 / 1,562 lines). Correct anchors at HEAD `9c27ba0`:

| War-pair / surface | style.css (live winner) | runtime-collapsed.css competitor | STALE doc anchor |
|---|---|---|---|
| WP1 followup geometry | **L30901-30920** triple-id `(12,0,0)` | **L1435-1462** doubled `(8,0,0)` + L1089-1113 `(3,0,0)` | style L41334 / rcc L1976 |
| WP2 followup z-index/overflow | **L23940-23947** doubled `(8,0,0)` z-index:40 | **L1089-1113** `(4,0,0)` z-index:3 | style L33213 / rcc L1634 |
| WP3 #learnChatCol bg | **L27795-27801** doubled `(6,0,0)` LIVE (radials L17554…L23759 DEAD) | **L890-911** `(2,0,0)` *same value* | L33191 dead / L37417 live |
| WP4 #learnModeMenu pos | **L23954-23977** doubled `(8,1,0)` + grouped L23841 + later **L30860** `(4,1,0)` | **L1250-1276** `(2,1,0)` | style L33238 / rcc L1790 |
| WP5 #learnChatEmptyState transform | **L23795-23798** single `(4,1,0)` LOSER; L23930 doubled (no transform) | **L1494-1498** doubled arm `(7,1,0)`/`(8,2,0)` WINNER | style L33057 / rcc L2036 |
| Group A close-btn | **L24685-24706** grouped 7-arm; competitor L27005 | (same-file) | C3 said L25470 |
| Band-2 textbook | **L24575-24609**; fallback L23109-23118 (`calc` @L23115); Band-1 L25118-25145 | (none — rcc has no overview selectors) | L24575-24609 (was correct) |

## Per-surface FINAL verdicts (post-adversarial)

- **WP1 followup geometry — IRREDUCIBLE (isolation).** Winner = triple-id L30901
  `(12,0,0)` over rcc doubled L1435 `(8,0,0)` on width / min-height (152↔112) /
  border-radius (28↔18) / background (pink↔white glass) / backdrop-filter
  (blur36↔blur34). Both `!important` → specificity decides; a real 4-id gap, NOT a tie
  (refutes the spec's "distinct depth-4, repetition is the only tiebreak"). De-double →
  `(8,0,0)` ties rcc → rcc wins on source order → regress; `(4,0,0)` loses outright.
  Only safe path = coordinated multi-block lockstep (style L30901 + rcc L1435/L1089 +
  tail). **GATE GAP: `width` has no css-probe witness** (FOLLOWUP_PROBES omits it).

- **WP2 followup z-index/overflow — IRREDUCIBLE iso; LOCKSTEP-able; WELL-WITNESSED.**
  z-index:40 held only by doubled L23944 `(8,0,0)` over rcc L1094 `(4,0,0)` z-index:3;
  single-id ties rcc → regress 40→3. overflow is value-degenerate (`visible` everywhere).
  css-probe FOLLOWUP_PROBES pins z-index + overflow in S2/S3/S4 → a regression WOULD
  fail the load-bearing gate. The most tractable pair, *if* a lockstep is ever pursued.

- **WP3 #learnChatCol background — SAFE but ZERO NET BENEFIT.** LIVE winner L27795
  `(6,0,0)` sets `var(--theme-page-surface-soft)` — rcc L890-911 sets the IDENTICAL
  value, and all radial blocks (L17554…L23759) are DEAD. De-double is value-neutral and
  removes ≈0 doubled-ids. (visual-diff 17t/17f are vacuous here — Band-2 hides #learnChatCol.)

- **WP4 #learnModeMenu position — IRREDUCIBLE (mapper SAFE→REFUTED).** The "de-double to
  `(4,1,0)` still beats rcc `(2,1,0)`" claim missed a later same-file competitor
  **L30860 `#learnView #learnBody #learnChatCol #learnFollowupBar .edu-mode-menu` `(4,1,0)`**
  (DOM: index.html L760→L773→L781). De-double → ties L30860 → it wins (later) → right/bottom
  flip. **Fully fail-open**: no harness opens the menu (no `.show` class).

- **WP5 #learnChatEmptyState transform — NO_BENEFIT.** transform owned by rcc L1494-1498
  doubled arm `(7,1,0)` over style single L23795 `(4,1,0)` — rcc wins on spec AND source
  order. style.css is the permanent loser; de-doubling it is render-neutral. (fail-open but moot.)

- **Group A close-button — NO_BENEFIT.** One grouped 7-arm hide rule (L24685-24706);
  de-double can't remove it, splitting ADDS lines. The **#feedbackView arm (L24688) is
  IRREDUCIBLE** — its doubled id is the sole tiebreak for `border:0` over the later
  same-element competitor L27005 `(2,1,0)`.

- **Group C learn-internal — NO_BENEFIT (mapper LOCKSTEP→REFUTED).** The glass decls
  (L27803/L27810 bg/backdrop) are ALREADY DEAD: the triple-id L30901 `background`
  shorthand resets background-image at `(12,0,0)`, pre-empting both L27810 and rcc L1452.
  Remaining live decls are WP2/WP4 (already covered).

- **Band-2 textbook — IRREDUCIBLE (the 2 keep-set decls).** `.textbook-pages-flow`
  min-height:100% (L24598) + padding-bottom (L24599) — naive de-double drops the id-axis
  tiebreak to Band-1 L25142, which sets a different padding-bottom + no min-height →
  regress. No lockstep escape (rcc has no overview selectors). These are keep-set entries.
  `#learnExplainScroll height:100%` (L24577) is a **NOCOMP dead decl** (fallback =
  overview-alone `calc(100dvh−header)` @L23115 = identical 738px @800h) — **safe to remove
  anytime, but LEFT IN PLACE**: removing it yields 0 doubled-id reduction and shifts 564
  committed keep-set line-refs >24577 → pure churn (decision: FlyM1ss, 2026-06-29). If ever
  removed, first re-confirm the `calc==100%-of-parent` NOCOMP equivalence at a 2nd viewport
  height (700h/1000h) — it was MEASURED only at the pinned 800h (#125 review note).

## Pre-existing fail-open coverage gaps (regression-safety backlog — Sev-3)

A4 surfaced these; they are independent of this closure. Any future edit that touches
one of these props is unsafe until a witness exists (the S14-witness pattern, #125):

1. `#learnFollowupBar` **width** — load-bearing gate (css-probe FOLLOWUP_PROBES) has no
   width probe. *Witness:* add `width` to FOLLOWUP_PROBES in S2/S3/S4 (resolves px at 1280w).
2. `#learnModeMenu` **all position props** — no harness opens the menu. *Witness:* a
   css-probe state that adds `.show` and asserts right/bottom/z-index.
3. `#learnChatEmptyState` **transform** — omitted from CHAT_STATE_PROBES. *Witness:* add
   `transform` to CHAT_STATE_PROBES (freeze animation first).
4. 6 close-btn arms (display/visibility/size on #topbarCloseBtn / #settingsPageBackBtn /
   #preferencePageBackBtn / #courseTrackerCloseBtn / #mistakeNotebookCloseBtn / #learnClose)
   — no state positively asserts the hidden buttons. *Witness:* arbiter VIEW rooting those views.
5. `#learnChatCol` **background shorthand** (only background-image probed). *Witness:* add
   `background` to the #learnChatCol probe tuple.

## Bottom line

The doubled-ID count in the composer cluster is **largely the architecture**, not debt.
A4 closes with no production change; the multi-session gate investment (C2 #120, S4–S11
#122, S13 #123, S14 witness #125) remains as permanent regression-safety and is what made
this verdict measurable. Confirms the structural-ceiling lesson: *don't lean too
aggressively on cutting lines.*
