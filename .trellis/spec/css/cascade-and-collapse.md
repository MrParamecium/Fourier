# Cascade & Collapse Rules

> Why the mess exists, and the rules for collapsing it safely. Grounded in the
> `docs/PHASE3.6_SPEC.md` inventory workflow (grep/cascade-resolver verified).

## The two mechanisms that created the mess

1. **Iterative "FINAL / EOF / LOCK" tuning passes** piled identical-specificity `!important` overrides without removing the old ones. Example: `.learn-explain-toggle-btn` `height` is redeclared **11 times at the same (0,1,0) specificity** — only the last wins; the other 10 are dead.
2. **A cross-file specificity arms race.** There is no build step and no `@layer`, and `runtime-collapsed.css` loads *after* `style.css` (so it wins ties). So `style.css` multiplies IDs (`#learnView#learnView#learnView` … up to 12-ID selectors) to out-specify `runtime-collapsed.css`'s own doubled-ID rules that set *different values on the same selectors*.

## Rule 1 — Scope by selector token, NEVER by line range

Scope every edit by selector token (`#courseTrackerView`, `mistake-*`, `#textbookFocusModal`).
Several banner spans are **mislabeled** and physically interleave unrelated rules (e.g. the
`#mistakeNotebookView` span L14218-18292 interleaves learn-collapsed rules). Editing by line
range corrupts interleaved rules. No global `replace_all` is safe across the `#learnView#learnView`
core (353 instances) because it interleaves the load-bearing §3d composer chain with safe instances.

## Rule 2 — `@layer` is a TRAP right now (do NOT migrate)

`@layer` cannot dissolve the arms race while `!important` stands, because **`!important` inverts
layer precedence**: for important declarations the *earliest/lowest* layer wins (opposite of normal
declarations), and unlayered `!important` loses to every layer's `!important`.

- `@layer runtime, base` (intent: style.css wins) → for `!important`, runtime (lower) wins → exact inversion; every doubled-ID win flips.
- `@layer base, runtime` → base's *normal* declarations lose to runtime's normal declarations and to Tailwind utilities.

No single ordering satisfies both important-conflicts and normal-conflicts. **Tailwind landmine**: `index.html`
loads the Tailwind CDN runtime JIT, injecting an *unlayered* `<style>`; moving `style.css` into any layer flips
~646 utility-class sites — a wide blast radius in the pixel-diff blindspot. Dependency order if `@layer` is ever
attempted: (1) remove `!important` per surface; (2) drop ID multiplication; (3) only then replace the Tailwind CDN
with a compiled, layerable build. By the time `!important` is gone the doubled-ID weapon is obsolete on its own.

## Rule 3 — Classify before you strip

| Class | Meaning | Action |
|-------|---------|--------|
| `NOCOMP` | `!important` with no competitor — safe in isolation | Strip the `!important` (verify per-property) |
| `LOSES` | whole rule is dead (later same-specificity rule wins) | Whole-rule delete (this is where line savings come from) |
| `DEFENSIVE` | load-bearing — the `!important` or specificity is doing real work | **Keep.** Never strip in isolation. |

Only de-`!important` a `DEFENSIVE`-looking decl when its competitor is removed in the **same step**, and probe
every touched property. Per-surface NOCOMP ratios (planning-grade): `#courseTrackerView` 74.9%, `#preferenceView`
69.8%, `#mistakeNotebookView` 45.7%, settings 39.8%, sidebar 44.2% (but sidebar shares `.app .sidebar …` chains
with many surfaces — do not assume isolation).

## Rule 4 — Cross-file pairs move in LOCKSTEP

The only region where `runtime-collapsed.css` sets *different values on the same selectors* is the learn-view
§3d composer chain (followup-bar geometry, `#learnChatCol` background, `#learnModeMenu` position, empty-state
transform). Transform each war-pair preserving the invariant **style.css effective specificity >
runtime-collapsed effective specificity**. Collapsing a 12-ID `style.css` rule to plain depth-4 *ties* the 8-ID
runtime rule → runtime wins on source order → props regress. This is the hardest, last tranche; gate it with the
full css-probe state matrix.

## Rule 5 — Dead-orphan deletion protocol (the richest SAFE line-reduction vein)

Renamed-away orphan classes/IDs (0 refs in `app/index.html` + 0 across all `app/**/*.js`, not template-built)
are the highest-value safe target: they reduce both line count and `!important` count with no cascade rewrite.

- **Strict ARM-REMOVAL**: delete only dead arm-lines. Whole-rule delete **only when EVERY arm is dead**. For a mixed group, keep the live arm (it may need re-emitting in `{`-form if the dead arm was last).
- **Template-literal aware**: `tone-${n}`, `is-${align}`, `lecture-note-card-${type}`, `*-demo-*` families are LIVE despite 0 *literal* refs — never delete these. `tools/scan-unused-css.js` exists but is scoped to L33181+; extend it or scan carefully whole-file.
- **Safety invariant** (load-bearing, see verification.md): the SET of distinct live-selector-contexts must be UNCHANGED before/after the delete. This catches loss in harness-uncaptured states that a raw line-diff or pixel-diff misses.

Known phantom IDs (exist in NO HTML/JS — dead-CSS deletion candidates, big line win): `#learnLecturePageIndicator`,
`#learnExplainBottomRail`, `#learnToolbarPagination`. The real one is `#learnFocusPageIndicator`. Treat all three
phantoms as dead together (the per-ID plans mislabel sibling phantoms as "live").

## State-gating reality

Doubled-ID rules are gated by classes on `#learnBody` (`data-panel-focus`, `chat-collapsed`, `explain-collapsed`,
`is-chat-active`, `chapter-overview-active`, …) and by `@media` breakpoints. A selector that looks single-occurrence
at 1280/resting may have `@media`/state-variant duplicates that are NOT safe to de-double at the same depth. Verify
per-occurrence, not per-token.
