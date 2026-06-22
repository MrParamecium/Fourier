# Phase 3 — Deferred Items

Drafted: 2026-06-21, end of the Phase 3 implementation session that landed
6 PRs / commits (PR #21, baseline refresh, PR #22, PR #20a, PR #20b, PR #20c).
Lists everything intentionally left unfinished, with the rationale and a
suggested next-session entry point. Use this as the starting point for
"Phase 3.5" (or fold the largest items into Phase 4 scoping).

---

## 1. PR #21 follow-ups

### 1a. Pass 2 — shared interactive-demos helpers

**Status: shipped 2026-06-22 in PR #59 (82d4ade).**

`app/interactive-demos/helpers.js` created. Three free-name helpers
extracted across complex-plane / sinusoid-phasor / phasor + the
chapter-one demo rerender in app.js:

- `applyCanvasDpr(canvas, ctx, width, height)` — replaces the
  shared dpr+setTransform tail of each family's `sizeCanvas`.
- `drawCanvasArrow(ctx, x1, y1, x2, y2, color, opts)` — reconciles
  the three divergent `drawArrow` closures. `opts.headLength`
  defaults to 10 (sinusoid/phasor); complex-plane passes 11.
- `coalesceFrames(callback)` — replaces the `pendingFrame` rAF
  coalesce pattern.

**Plan-inventory correction:** the original §1a estimate of "~600
lines net delete" was wildly aspirational. Realistic measurement:

| File | Before | After | Delta |
|---|---|---|---|
| complex-plane.js | 291 | 261 | −30 |
| sinusoid-phasor.js | 292 | 266 | −26 |
| phasor.js | 323 | 295 | −28 |
| app.js (chapter-one rerender) | — | — | −8 |
| helpers.js | 0 | 72 | +72 |
| **Net** |  |  | **−18** |

The 600-line estimate counted full per-family closure consolidation
across 4 modules (including `matrix-conformability.js`), but the
following did NOT consolidate per-family divergence is intentional:

- `formatNum` / `formatValue` precision (toFixed 3 vs 2)
- `getA` / `getB` / `getThetaRad` / `getC` defaults + sign
  conventions (phasor flips b via `atan2(-b, a)`)
- `sizeCanvas` width/height calc (min 320 / 180 / 160; height-from-
  width vs fallback-height vs parent-padding subtraction)
- `drawGrid` (single-use in sinusoid-phasor)
- Control-wiring loop (per-family CSS class names —
  parameterization exceeds savings)
- `matrix-conformability.js` (no canvas helpers at all — only
  shares the broader control-wiring loop pattern)

The structural win is **one-place-to-change** for future `drawArrow`
/ dpr tweaks, not the line count.

**Harness gap (recorded for future work):** the visual-diff harness
covers `convolution_lab` + `pole_zero_roc_lab` family keys only.
The 3 modified families (`complex_plane`, `sinusoid_phasor_projection`,
`phasor`) are NOT pixel-verified by the harness. Save/restore behavior
of `drawCanvasArrow` is benign because every post-`drawArrow` callsite
in sinusoid/phasor explicitly resets fillStyle/strokeStyle/lineWidth
before next use (hand-verified in self-review).

### 1b. Dispatcher simplification: 13 family arms → lookup table

**What:** Replace the 13 sequential `if (family === 'X') { renderX(...); return; }`
arms in `hydrateInteractiveDemos` (`app/app.js` L3720-L3792) with a
single lookup table:

```js
const FAMILY_RENDERERS = {
  signal_transform: renderSignalTransformFallback,
  energy_power:     renderEnergyPowerFallback,
  ...
};
const fn = FAMILY_RENDERERS[family];
if (fn) { fn(node, demo); return; }
```

**Why deferred:** Surfaced by PR #21's self-review (Reuse #1). Trivial
mechanical change, but it restructures the dispatcher pattern. Per the
plan's "mechanical move only" Pass-1 philosophy, kept out of #21.
Net delete: ~50 lines.

**Entry point:** drop into `hydrateInteractiveDemos` and replace the
13-arm block. Verify with the visual-diff harness (no chrome change
expected) and the lesson-open-no-hang test.

### 1c. Carry-forward pre-existing bugs in family modules

Surfaced by PR #21's adversarial review. All pre-existing (the
extraction faithfully preserved them). Each is Sev-2 or below:

- **`sinusoid-phasor.js` rAF tick has no detach hook.** Re-hydrating
  a sinusoid section without a full page reload starts a second tick
  loop that races the first. The `if (!node.isConnected) return;`
  guard fires only on detach, not on innerHTML wipe of a still-connected
  node. Real-world trigger rare but possible.
- **`sinusoid-phasor.js` Reset-while-paused freezes the wave at t=0.**
  Reset handler doesn't also set `state.running = true` or update the
  Play/Pause button label. User clicks Pause to inspect, then Reset
  to revert sliders, then the wave never animates again until they
  explicitly click Play.
- **`sinusoid-phasor.js` `updateControlLabels` doesn't null-check
  `querySelector` results.** If a future spec variant omits any of
  the three `data-demo-value` strong elements, throws
  `Cannot set properties of null`.
- **`phasor.js` ignores the dispatcher's `demoControls` fallback chain.**
  Reads `demoSpec.controls` directly; if an author writes a phasor
  demo with controls at the top-level `demo.controls` (with phasor
  panels still in `demoSpec.panels`), controls silently render
  empty with hardcoded defaults `slider_a=1`, `slider_b=-1.732`.
- **`sinusoid-phasor.js` hardcodes amplitude/freq/phase defaults**,
  ignoring authored `demo.controls`/`demoSpec.controls` entirely.
- **All large family modules leak resize listeners.** Per-family
  `window.addEventListener('resize', rerender, { passive: true })`
  is never removed. Pre-existing leak; PR #21 plan explicitly said
  to preserve.

**Why deferred:** All pre-existing; not caused by the refactor. Fixing
them inside #21 would have muddied the diff. Each is small enough
to fit a single follow-up PR but should be batched: one PR per
module (sinusoid, phasor) with explicit `before / after` repro steps.

---

## 2. PR #22 follow-ups

No deferrals identified. Self-review came back clean. The 2,111-line
CSS extraction is byte-fidelity verified and visual-diff confirmed.

---

## 2b. PR #23 (interactive-demos family lookup) follow-ups

PR #23 (deferred 1b) shipped — the 13 `if (family === 'X')` arms in
`hydrateInteractiveDemos` collapsed into `INTERACTIVE_DEMO_FAMILY_RENDERERS`.
Net `app/app.js` −43 lines. Self-review (4-lens adversarial) approved.

**Harness coverage gap surfaced during review — Sev-1 against future
refactors of this code path, not this PR.** The 9-view visual-diff harness
opens exactly one lesson (1.1-1 Signal Energy), whose only
`kc-interactive-demo` has `demo_type: energy_cross_term`, which is in
`CHAPTER_ONE_DEMO_TYPES`. The dispatcher short-circuits at the
`if (isChapterOneDemo)` branch BEFORE the new lookup is reached. None of
the 13 family keys are exercised by views 06/07/08/09. A typo in any key
(e.g., `pole_zero_roc_lab` → `pole_zero_ROC_lab`) or a renderer-name
mismatch would silently fall through to `renderBriefDemoFallback` and
visual-diff would still report 0.000% green. PR #23 was confirmed safe
by hand-walking all 13 mappings against `app/interactive-demos/*.js`
function declarations during review; future PRs touching this code MUST
NOT rely on visual-diff alone.

**Entry point for harness expansion:** add a 10th view that opens a
Chapter-2+ subtopic whose primary demo's `family` is one of the 13
table keys (e.g., a `convolution_lab` or `pole_zero_roc_lab` subtopic
with a cached lesson). Then this code path becomes regression-covered.
The user has explicitly scheduled visual-diff harness expansion as the
next session focus.

Secondary nits (Sev-3, not in this PR):
- Optional `Object.create(null)` for the table (prototype-pollution
  hardening). Today safe — `inferInteractiveDemoFamily` returns a closed
  enum of literal strings, none collide with `Object.prototype`.
- Optional registry module extraction (`app/interactive-demos/registry.js`).
  Defers an eventual interactive-demos subsystem extraction (Phase 2 #18
  candidate per §5).
- The 6 non-table family values that legitimately miss the lookup are
  fully handled elsewhere in the dispatcher — coverage is complete:
  - `opposite_rotations` — `isOppositeRotationDemo` branch ABOVE the lookup.
  - `complex_plane` — `isComplexPlaneDemo` branch ABOVE.
  - `sinusoid` — `isSinusoidDemo` branch ABOVE.
  - `matrix_conformability` — final unconditional
    `renderMatrixConformabilityDemo` after the `!isMatrixDemo` check.
  - `algebra_brief` and `brief` — `renderBriefDemoFallback` via the
    `!isMatrixDemo` branch.
  Not documented in-code per project style; this entry is the record.

---

## 3. PR #20a/b/c Pass 2 follow-ups (the bulk of the deferred work)

The original plan §6 target for PR #20 was **~5,600 net lines deleted**
across 3 sub-PRs. Pass 1 work shipped delivered **165 lines** (#20a 131 +
#20b 14 + #20c 20). The remaining **~5,400 lines** are in Pass 2
work that requires per-property override-chain analysis.

### 3a. PR #20a Pass 2 — lesson + lecture surface override collapse

**Status (2026-06-22): partially complete.** Step B in the
`REFACTOR_PLAN.md` roadmap shipped 5 sections (S1+S2+S3+S4+S6+wrap-up)
plus the original plan target was rescoped after discovery work
surfaced that the 1,200-line plan estimate was structurally
unreachable. Deferred follow-ups: §3a.i (S5 feedback-tones — the
5-banner cascade analysis described below) and §3a.ii (B25 textbook
mode lock + remaining low/medium-confidence cluster-G findings).

#### What shipped in Step B (Pass 2, 2026-06-22)

- **PR #46 — S1 title-scale collapse** — delete byte-identical
  duplicate banner (11 lines).
- **PR #47 — S2 sidebar-home icon collapse** — 3 banners (B14/B16/B24)
  → 1 base + 1 minimal state-variant. Caught a dead-code finding:
  B24's gradient + colored box-shadow on the icon never rendered
  (B14's higher-spec `:not(.active)` resets always won). Synthesis's
  "preserve every property mention" generator was wrong; correct
  collapse drops the dead gradient (24 lines).
- **PR #48 — S3 Q&A docked container merge** — fold B8 container-type
  + container-name into B7 (6 lines).
- **PR #49 — S4 mistake-notebook duplicate cleanup** — INVERTED from
  the synthesis's recommended direction. B28's doubled-ID
  `#mistakeNotebookView#mistakeNotebookView` (2, 1, 0) is actively
  beating the LATER liquid-glass-redesign rules at L36408+ which set
  a 2-column grid, different margin-top, different alignment. The
  actual dead code is B30 (single-ID, every property either
  identical to B28 or overridden by B28 at higher spec). 84 lines.
- **PR #50 — S6 BOOK SURFACE cascade dedup** — 4 of 5 high-confidence
  cluster-G findings (3 dead declarations in B2 already losing to B5
  in the cascade, 1 dead `.lecture-overlay-btn` selector in B5, 1
  longhand-shorthand redundancy in B5, 1 duplicate disabled/hidden
  rule in B6) (20 lines).
- **PR #51 — Step B wrap-up** — final cluster-G finding B15 [1]
  (#learnViewSelector margin-right superseded by B17's margin shorthand)
  + this doc refresh + project memory bump (4 lines).

**Cumulative Step B delta: ~169 lines deleted, not the 1,200 plan
estimate.**

#### Why the 1,200-line plan target proved unreachable

The plan §6.1 target was set before per-property timeline analysis
revealed the structure of the cluster:
- Pass 1 (#40/#41/#42) already shipped 165 lines of orphan deletes —
  the easy wins were already taken before Pass 2 started.
- L33581 LEARN Q&A RUNTIME INJECTION OVERRIDE banner (~90 lines) was
  deferred §3d, removing it from the available pool.
- Banner 32 (Preference page liquid glass) starts at L35828, not
  L35958. The plan's L35958 line cutoff was off by ~130 lines.
- Most "duplicates" in this cluster are NOT byte-identical — they are
  banners at different specificities defending against each other's
  later overrides. The cascade is structurally load-bearing in many
  places that look duplicated on selector-text inspection alone.
- The 7-cluster discovery missed cross-banner interactions with the
  LATER #20b range (L36408+ for mistake-notebook, L38504+ for
  feedback tones). Two of the originally proposed S4/S5 sections
  needed direction inversion (S4 shipped inverted) or full deferral
  (S5).

Realistic Step B ceiling, post-analysis: ~320 lines if all 5 sections
shipped + a polished S5. The 880-line gap to the original 1,200 target
is structural, not a deferral.

#### 3a.i — DEFERRED: S5 feedback-author-tones (5-banner cascade)

Banners B19 (EOF FEEDBACK AUTHOR COLORS), B20 (TRUE FINAL FEEDBACK
AUTHOR TONES), B22 (FINAL FEEDBACK AUTHOR COLOR LOCK), B23 (FEEDBACK
AUTHOR TONE LOCK), plus a DUPLICATE "EOF FEEDBACK AUTHOR COLORS"
banner at L38504+ in the #20b range — all interact. Cluster C's
discovery scoped to L33346–L35828 and missed the L38504+ banner just
like cluster E missed L36408+ (the bug that surfaced the S4 inversion).

**Specific cascade risk:** B19's
`.feedback-reply.is-left[class*="tone-"] .feedback-reply-context` rule
at (1, 5, 0) sets `border-color: rgba(var(--author-rgb), 0.22)`
LITERAL. B22 at (1, 4, 0) sets `border-color: var(--author-mid)`,
which B23 resolves to `rgba(var(--author-rgb), 0.24)` — deleting B19's
context rule shifts the border alpha 0.22 → 0.24. The single
`14-feedback-board` harness view doesn't exercise tone-1..5 hover or
active variants, so a 0.02-alpha border shift may not register at
0.20% threshold but is a real visual change.

**Entry point for next session:** scope the property-timeline
workflow to L34893–L38565 (not just the cluster's banner range).
Walk every `.feedback-thread`, `.feedback-reply`,
`.feedback-reply-meta`, `.feedback-reply-context`,
`.feedback-thread::after`, `.feedback-reply::before` declaration; tag
by (specificity, source-line). Identify what's safe to collapse vs
what's beating the L38504+ duplicate banner. Estimate: ~140 lines
recoverable.

#### 3a.ii — DEFERRED: cluster-G low/medium-confidence findings

- **B25 (Textbook mode lock):** background shorthand allegedly
  overridden by background-image. Synthesis was vague about the
  property and the line numbers were partially drifted. Need a
  fresh per-property check. ~4 lines.
- **B15 [2]:** `.learn-topbar-actions:has(#learnClose.learn-close)`
  rule looked dead because `#learnClose { display: none }`, but
  `#learnClose` IS rendered in the DOM (HTML L629; JS at app.js:891
  + 5334 wires it), so `:has()` still matches. NOT a delete.
- **B17 [1]:** dead `:not()` selectors in a grouped rule — line
  references drifted post-merge and the selector pattern couldn't
  be re-located; needs a fresh grep. ~2 lines if real.
- **B18 [1]:** `.home-mode-menu-icon i { font-size }` redundancy
  with parent — but 3 LATER identical-selector rules at L39324,
  L40268, L40829 each set a DIFFERENT font-size (30/25/22px),
  defeating both inheritance and the cluster-G assumption. The
  cluster of 4 duplicate selectors should be its own deferred item.
  ~4 lines if rationalized.

**Discovery-agent scoping lesson:** for any banner-cluster discovery,
the property-timeline analysis must walk the cascade to file end, not
stop at the cluster's banner boundary. Both the cluster-E and cluster-C
discovery missed cross-banner overrides outside the cluster range.
Future Step C / Step D discovery prompts should explicitly require
"grep the full file for every selector before declaring a rule dead."

### 3b. PR #20b Pass 2 — preference + MN + course-tracker + feedback-board

**Status (2026-06-22, late session): partially complete.** Step C shipped
4 sub-PRs (#52/#53/#54/#55) totalling **−123 lines** in `app/style.css`,
all visual-diff-verified at 0.000% on all 18 baseline views.

#### What shipped in Step C

- **PR #52 — S1 feedback-thread tone-background dedup** — delete
  byte-identical duplicate of `#feedbackView .feedback-thread[class*="tone-"]
  { background: ... }` between the two "EOF FEEDBACK AUTHOR COLORS" and
  "TRUE FINAL FEEDBACK AUTHOR TONES" banners (6 lines incl. blank).
- **PR #53 — S2 course-tracker originals superseded by redesign** —
  delete `.course-tracker-stat-value` + `span:last-child` (unused),
  `.course-tracker-stat-card, .course-tracker-card` background/border
  group + padding group (overridden by L36989/L37147 with !important),
  `.course-tracker-table-wrap` (replaced by `.course-tracker-timeline`
  in redesign) (37 lines).
- **PR #54 — S3 Mistake Notebook tail dead overrides** — delete
  horizontal-split layout using never-wired `--mistake-note-left/--right`,
  `min-height: 150px` overridden by `210px` 30 lines later, mobile
  `@media` block byte-identical to a sibling 17 lines later (29 lines).
- **PR #55 — S4 Preference PIN LOCK + save-state tones** — delete
  `.preference-profile-card .preference-card-tape` overridden by
  `#preferenceView .preference-card-tape { display: none !important }`
  at L35781, and unscoped `.preference-save-state[data-tone="*"]`
  variants overridden by `#preferenceView`-scoped rules at L35830+
  (51 lines incl. banner).

**Cumulative Step C delta: −123 lines (plan target was ~900).**

#### Why the 900-line plan target proved unreachable

Same structural-ceiling pattern as Step B (#20a Pass 2 hit 169 vs
1,200 target). Per-property cascade analysis surfaced:

- Pass 1 (#41) had already harvested orphan deletes from this range
  (14 lines), removing the easy wins before Pass 2 started.
- Most "duplicate" rules in the cluster are NOT dead — they defend
  against later overrides at higher specificity. The 4 surfaces have
  bona-fide redesign passes (liquid-glass, glass refresh, glass
  intensity, etc.) where the cascade is structurally load-bearing.
- The harness coverage gate (resting state only — Roadmap matrix
  Step C explicitly notes :hover / :disabled / :focus on
  `.feedback-board-card` 27×, `.preference-profile-preview` 18×,
  `.preference-preview-card` 14×, `.preference-primary-btn` 10× are
  NOT covered) blocks roughly 60–70% of the candidate pool.
- Tripled byte-identical duplications (e.g. `.feedback-reply[class*="tone-"]::before`
  at L34909 / L34992 / L38513) require coordinated banner-consolidation
  refactoring, not simple per-rule delete; discovery flagged these as
  needing more cascade reasoning than safe within a single Pass-2 PR.

Realistic Step C ceiling, post-analysis: ~125 lines for the no-state-variant
no-banner-rewrite subset. The 775-line gap to the original 900 target is
structural (harness gap + banner-rewrite complexity), not a deferral.

#### 3b.i — DEFERRED: feedback-board banner consolidation

Tripled byte-identical `.feedback-reply[class*="tone-"]::before` rules
at L34909-L34923 / L34992-L35006 / L38513-L38527 (and matching
`.is-left::before` / `.is-right::before` variants). Plus duplicate
tone-variable declarations at L34870-L34881 vs L34944-L34955
(`#feedbackView .feedback-thread.tone-N, #feedbackView .feedback-reply.tone-N
{ --author-rgb: ...; --author-ink: ...; }`) — both byte-for-byte
identical 12-line blocks.

These require a coordinated banner-consolidation refactor (merge
"EOF FEEDBACK AUTHOR COLORS" + "TRUE FINAL FEEDBACK AUTHOR TONES" +
"EOF FEEDBACK AUTHOR COLORS (duplicate at L38480)" into a single tone
definition section) rather than per-rule cascade-collapse. Estimated
~80 lines recoverable.

**Entry point:** read L34869-L35275 + L38480-L38565 in parallel,
diff each banner pair, propose a single canonical placement
(probably the L38480 location since it's after the lane overrides at
L38122-L38275 that need to lose to per-author tones).

#### 3b.ii — DEFERRED: course-tracker overview + grid bundle

`.course-tracker-overview` and `.course-tracker-grid` share a media
query at (originally L14869, post-S2 shifted to ~L14832). Discovery
intentionally excluded these from S2 to avoid an orphaned media-query
block. Re-verify the media-query and bundle the deletion as a
single follow-up. ~25 lines.

#### 3b.iii — DEFERRED: MN doubled-ID specificity patterns

Discovery noted "Doubled-ID specificity patterns checked at L35492-L35493
(True EOF layout lock): those use #id#id.selector syntax and beat
single-ID at L35604; no collapse opportunity there (out of scope for
0.2% harness)." Pattern is similar to Step B's S4 (PR #49) but for
MN, not the sidebar. Needs separate harness expansion before any
action — leave as-is.

#### 3b.iv — DEFERRED: state-variant override collapses (#20b)

Per Roadmap matrix Step C, the following state-variant override stacks
are NOT covered by the current harness and were intentionally skipped:
- `:hover`/`:disabled`/`:focus` on `.feedback-board-card` (27×)
- `:hover`/`:disabled`/`:focus` on `.preference-profile-preview` (18×)
- `:hover`/`:disabled`/`:focus` on `.preference-preview-card` (14×)
- `:hover`/`:disabled`/`:focus` on `.preference-primary-btn` (10×)

Pre-req: harness expansion to capture these states on views 12/14
(probably as additional Page-B views: `12b-preference-hover`,
`14b-feedback-hover`, …). Estimate net delete after harness lands:
~150-200 lines.

### 3c. PR #20c Pass 2 — Home Ask + answer workspace + login + intro

**Status (2026-06-22, end of session): partially complete.** Step D
shipped 3 PRs (#56/#57/#58) totalling **−147 lines** in `app/style.css`,
all visual-diff-verified at 0.000% on all 18 baseline views. Plan target
was ~3,500 lines; 4.2% of plan was reachable, well below even the
Step B/C 14% structural ceiling because S3 (login + intro) and S4
(RUNTIME-INJECTED banners) were both verified at **0 deletable lines**.

#### What shipped in Step D

- **PR #56 — S1 RIGHT-QA REDESIGN dead overrides** — 14 home-Ask rules
  inside `TRUE EOF HOME ASK RIGHT-QA REDESIGN` banner fully shadowed
  by later `SCREENSHOT MATCH` (L41542+) + `GLOBAL SHRINK` (L41833+)
  banners at identical specificity, !important. Per-property timeline
  built for each rule (`.home-ask-icon`, `.home-ask-empty h1/p`,
  `.home-ask-tag`, `.home-ask-tag svg`, `.home-ask-attach/.send`,
  `.home-mode-icon`, `web-toggle svg`, `#homeModeMenu .home-mode-option`,
  `.home-feature-actions`, `.home-feature-chip` + svg + span,
  `:has(.home-mode-menu.show)`). 115 lines.
- **PR #57 — S1b SCREENSHOT MATCH tail** — 5 more home-Ask rules in
  the `SCREENSHOT MATCH` banner shadowed by `GLOBAL SHRINK` (L41754+
  post-#56). Includes `.home-ask-tag svg`, `.home-ask-input-row` (with
  align-items: start fallback to L41225's RIGHT-QA REDESIGN survivor),
  `#homeModeCurrentText`, `web-toggle` standalone, `#homeModeMenu`
  positional. 28 lines.
- **PR #58 — S2 followup-bar-row gap** — bare `.followup-bar-row
  { gap: 16px !important }` (specificity 0,0,1,0) shadowed by
  `.answer .followup-bar-row { gap: 8px !important }` (0,0,2,0) at
  L43811. DOM coverage verified: `.followup-bar-row` only renders
  inside `.answer` per `app/index.html` L518/L572. The discovery +
  2-skeptic adversarial verify workflow found ONLY this candidate
  across the full Section 2 surface (~1,400 lines pre-scan). 4 lines.

**Cumulative Step D delta: −147 lines (44408 → 44261).**

#### Why the 3,500-line plan target proved unreachable

Same structural-ceiling pattern as Step B/C, plus two surfaces with
verified zero recoverable lines:

- Pass 1 (#42) had already shipped −20 in this range — easy wins
  taken. The L33490 / L42594 RUNTIME-INJECTED banners were deferred
  to S4 (see §3d below) — removing them from the available pool.
- After PR #56 + #57 took ~143 lines from the home-Ask cascade,
  remaining home-Ask candidates from the discovery workflow are
  state-variant-only (`:focus-within` transform/animation deletes)
  which the 18-view harness cannot pixel-verify. Deferred to §3c.i
  below.
- **Section 3 (login + intro/trial scrapbook) = 0 lines deletable.**
  The plan's "inverted preference" claim that `app/css/inline-styles.css`
  is a canonical source for `.intro-*`, `.scrap-*`, `.proof-*`, and
  `.login-*` rules is wrong against the current file state. Verified:
  inline-styles.css has ZERO `.login-*` rules at all. The
  `.intro-landing-new .scrap-*` rules in inline-styles.css define
  base structure (position, dimensions, base background-color #fff,
  animations); the style.css L44048+ "Trial intro glass skin" banner
  OVERLAYS them with glass effects (background gradients,
  backdrop-filter, box-shadow). Both layers are live; neither is
  dead. See §3c.ii below.
- **Section 4 (RUNTIME-INJECTED CSS OVERRIDE banners L33490 + L42594)
  = 0 lines deletable.** Verified load-bearing — see §3d below.

Realistic Step D ceiling post-analysis: ~165 lines if the remaining
state-variant candidates were ship-able. The ~3,350-line gap to the
original 3,500 target is structural (S3 + S4 both verified zero,
state-variant blind spot blocks remaining home-Ask).

#### 3c.i — DEFERRED: remaining home-Ask state-variant candidates

The discovery workflow for S1 surfaced ~145 additional safe-on-cascade
lines that were intentionally not shipped:

- **`:focus-within` transform/animation deletes** in cluster-B/C/D
  banners (L40492, L40681, L40890 — pre-#56 lines; ~52 lines total).
  Each is byte-identical to a later same-selector same-specificity
  rule, so deletion does not change the active value. But the
  harness has NO `:focus-within` coverage on the home-Ask composer
  (view 10 captures focus state on the composer container, not on
  the dropdown sub-state). Safe by cascade analysis, unverifiable
  by pixel diff. Held back to keep the "every Step D PR hit 0.000%
  on 18 views" invariant intact.
- **DEBUG LOCK / INTERACTION LOCK tail** (~45 lines from L39192,
  L40081 pre-#56 lines). Cluster-A/B candidates verified by both
  cascade and harness lenses but not yet shipped — all are tightly
  shadowed by later GLOBAL SHRINK / MODE GLASS overrides.
- **Cluster-A initial `.home-mode-icon i`, `.qa-caret-icon`,
  web-toggle svg, `.home-mode-option.selected`** (~18 lines from
  L38762-L38818). Earlier control glass banner. Safe on cascade,
  state-variant-free, but small enough that ROI on the PR ceremony
  is poor.

**Entry point:** rebase the existing discovery output
(`/tmp/claude-1000/-mnt-d-Github-fourier-tutor-agent/.../wzd6pqscb.output`)
against post-#58 line numbers (each candidate shifts down by 4 lines
in the L42278+ region only; everything below L41434 is shifted by 115
from #56 and 28 from #57; everything below L42278 is also shifted by
4 from #58). Re-verify each candidate's cited override line in the
post-merge file before edit.

#### 3c.ii — Plan-inventory correction: inverted-preference S3 is wrong

Plan §6.1 says: "Inverted preference for the intro/login surface
(banners 81-88): the `.intro-*`, `.scrap-*`, `.proof-*` rules in
`app/css/inline-styles.css` are the canonical source; the style.css
copies are duplicates."

**This is wrong against the current file state.** Verified during
Step D Section 3:

1. `app/css/inline-styles.css` has ZERO `.login-*` selectors. The
   plan's premise that login rules duplicate inline-styles.css does
   not match reality.
2. The `.intro-landing-new .scrap-window/sticky/polaroid/paper/
   proof-card` rules ARE in inline-styles.css (L443-L666 area), but
   they set BASE structure: `position: absolute; background: #fff;
   transform: rotate(Xdeg); animation: float ...`.
3. The corresponding rules in style.css L44049+ ("Trial intro glass
   skin") set DIFFERENT properties: glass gradients, backdrop-filter,
   box-shadow. They are layered OVERLAYS, not duplicates.

Conclusion: no Section 3 deletes are possible under the inverted-
preference rule. Future Phase 4 work on this surface should be
scoped as "consolidate the L44048+ glass skin into inline-styles.css"
(a STRUCTURAL refactor, not a delete), and that's only worth doing
if the visual-diff harness gains login + intro coverage first.

### 3d. PR #20c — RUNTIME-INJECTED CSS OVERRIDE banner deletion

**Status (2026-06-22, end of session): VERIFIED LOAD-BEARING — stays.**

Per plan §3d entry point, listed every property each banner sets and
grep'd `runtime-collapsed.css` for overlap on the same elements:

- **L33490 banner (`LEARN Q&A RUNTIME INJECTION OVERRIDE`)** — uses
  doubled-ID specificity (`#learnView#learnView #learnBody#learnBody
  #learnChatCol#learnChatCol` = 6 IDs). `runtime-collapsed.css`
  L1430-L1451 sets `background: var(--theme-page-surface-soft)
  !important` on `#learnView #learnChatCol` (2 IDs). Style.css's
  6-ID rule beats with a custom radial-gradient cyan/green
  background. Deleting the banner reverts to the runtime-collapsed
  background-color — visible regression.
- **L42594 banner (`RUNTIME-INJECTED CSS OVERRIDE`)** — uses tripled-
  ID specificity (`#learnView#learnView#learnView ... #learnFollowupBar
  #learnFollowupBar #learnFollowupBar` = 12 IDs). `runtime-collapsed.css`
  L1975-L2002 has a doubled-ID rule (8 IDs) on the same selector with
  DIFFERENT values: width `min(820px, calc(100% - 36px))` vs banner's
  `calc(100% - 36px)`, min-height 112 vs 152, border-radius 18 vs 28,
  different background gradient. Deleting the banner regresses 8+
  properties on the followup-bar.

Plan decision #5 ("delete in #20c") was based on the assumption that
the runtime-injected `<style>` blocks were the SOLE source of the
duplicated-ID rules. PR #22 actually MOVED those doubled-ID rules into
runtime-collapsed.css (not just the targeted overrides). So the
defended-against rules came along with the moved blocks, and the
banners still need higher specificity to beat them.

**No follow-up entry — both banners stay.**

---

## 4. Plan-inventory corrections to fold into the next Pass 2 PR

The plan §6.2 Pass 1 list contained inaccurate "orphan" flags:

- **`.preference-signal-card` and `.preference-signal-label`** (claimed
  orphan for #20b) — actually **LIVE**, used in
  `app/preference-profile.js` as static `class="..."` strings.
- **`.mistake-note-image-empty` and `.mistake-note-image-chip`**
  (claimed orphan for #20c) — actually **LIVE**, used in
  `app/mistake-notebook.js`.

Both pairs were verified during the Pass 1 work and skipped. Update
`docs/phase3_plan.md` §6.2 when the next #20b/#20c Pass 2 PR ships.

---

## 5. Phase-4 candidates unblocked by Phase 3

- **Phase 2 #18 — Interactive demos subsystem extraction.** Per
  `docs/phase3_plan.md` §7: was 4,018 lines; after #21 lands the
  family modules, the remaining scope is ~1,500 lines (demo
  registration, state stores, control wiring).
- **Phase 2 #19 — Glass + chapter-overview CSS** (16,402 lines).
  Schedule once the visual-diff harness has expanded view coverage
  beyond the current 9 baseline views.
- **Phase 4 user-data DB migration** for `app/users/` (rule #3 of
  the refactor plan).

---

## 6. Cumulative Phase 3 delivery (all sessions)

| PR / step | Title | Net lines |
| --- | --- | --- |
| #21 (PR #38) | hydrateInteractiveDemos split | −2,894 in `app/app.js`; +19 family modules |
| — | Visual-diff baseline refresh + 3 views | tooling |
| #22 (PR #39) | runtime inject*Styles → static CSS link | −2,111 in `app/app.js`; +1 CSS file |
| #20a (PR #40) | lesson + lecture orphan deletes | −131 in `app/style.css` |
| #20b (PR #41) | preference + MN orphan strips | −14 in `app/style.css` |
| #20c (PR #42) | mistake-draft-actions orphan delete | −20 in `app/style.css` |
| #23 (PR #43) | interactive-demos family lookup table | −43 in `app/app.js` |
| Step B (Pass 2 PRs #46–#51) | lesson + lecture override collapse | −169 in `app/style.css` |
| Step C (Pass 2 PRs #52–#55) | preference + MN + course-tracker + feedback-board | −123 in `app/style.css` |
| **Step D (Pass 2 PRs #56–#58)** | **home Ask + answer-workspace cascade collapse** | **−147 in `app/style.css`** |

`app/app.js`: **14,434 → 9,385 lines (−5,049, −35.0%)**.
`app/style.css`: **44,845 → 44,261 lines (−584, −1.3%)**.

The Phase 3 JS work is structurally complete. CSS Pass 1 + Pass 2
Steps A through D shipped; the structural ceiling on the L33181–L44261
cluster is ~12% of the original ~5,600-line target (Pass 1 + Pass 2 =
584 lines actual). The remaining ~5,000 lines on this cluster are
specificity-graded defenses, state-variant override stacks not covered
by the harness, banner-rewrite candidates requiring coordinated multi-
banner refactors, or canonical-source-clash candidates where the
plan's inverted-preference assumption did not match the file state.

---

## 7. Phase 3.5 follow-ups (PR #44 review-deferred)

Drafted 2026-06-22 after the PR #44 5-lens review. PR #44 (Phase 3.5
visual-diff harness expansion, 9 → 18 views) shipped at f28055b after
must-fixes 1–12 and should-fixes A–G,I–M were folded in. The items
below were intentionally left out of PR #44 as out-of-scope follow-ups.

### 7a. Harness architecture (defer for v2)

- **Parallel pipelines per Page A/B/C via `Promise.all`.** Spec v2
  permitted sequential v1 as acceptable. The bridge serializes
  internally and the wall-clock saving (~30–50s) is not worth the
  flake risk without a separate spec for bridge concurrency.
- **`global.__pageCResults` → closure-threaded `runCtx`.** Acceptable
  smell for serial execution; refactor when concurrency lands.
- **PAGE_C scaling beyond 2 family-key coverage** — if a future PR
  adds views 19+ for additional dispatcher keys, refactor PAGE_C to a
  handler that opens lessons sequentially with closeSection between
  captures rather than one page per family (spec deferred §10).
- **Page B `requires` field for declarative preconditions.** Spec table
  pattern lists per-view preconditions; today implemented as imperative
  recovery in each setup(). Works, but a `requires` table would make
  the preconditions auditable in one place.

### 7b. settleLesson / masking polish

- **settleLesson font warmup loads generics only, not real webfonts.**
  Calls `document.fonts.load('1em sans-serif')` etc.; real fix is
  enumerating `document.fonts` and forcing each face. Current
  implementation is good enough — no observed pixel drift.
- **settleLesson re-runs font warmup on every screenshot.** Sentinel-
  gating possible (skip if a "fonts warmed up" flag is set on the
  page) but adds complexity for a one-time cost.
- **Feedback meta locale-stable timestamp width** (latent CI flake).
  Today masked via `color:transparent !important; text-shadow:none`;
  if a future regression involves text-shape regression it might leak.
  Real fix: tabular-nums + min-width on the meta line.
- **MASK_CSS UID length variable** — the masked `.settings-user-meta`
  line still occupies space proportional to the random UID's length.
  Today no observed drift, but a seeded random or fixed-width clamp
  would harden it.
- **settleLesson + resetLessonChromeState arbitrary 150ms / 100ms
  tails.** Replace with `waitForFunction` on `.is-animating` absence;
  mild — current sleeps work.

### 7c. Self-test + cross-reference

- **Add startup self-test for `window.*` harness exports to
  `npm run check`.** A `node tools/check-harness-exports.js` that
  greps `app/app.js` for the harness-relied-on window exports
  (`window.parseBase64JsonAttr`, `window.inferInteractiveDemoFamily`)
  would surface a deleted export at lint time instead of at first
  --check run. Good idea; requires new script + package.json wire-up.
- **Cross-reference comment on `window.__ftutorRefreshPager`.**
  Consistency only — already exposed in app/app.js without a "harness
  export" comment band like the other window.* exports.
- **View 11 `.show` re-apply across 2 rAFs.** Defensive against a stray
  document.click race auto-closing the menu mid-screenshot. Today not
  observed flaking. Add a 2-rAF re-apply if intermittent failure ever
  surfaces.

### 7d. Test fixture organization

- **SUBTOPIC fixture centralization between smoke.js + visual-diff.js.**
  Both files hard-code `1_1-1 Signal Energy` as the canonical test
  subtopic. Minor duplication; move to `tools/test-utils.js` as
  `CANONICAL_SUBTOPIC` if a third caller appears.
- **3.12 / 3.13 Page C candidates blocked by openSubtopic shape.**
  Spec v2's view 18 fallback list included `3.12` / `3.13` (cache
  present in `workspace/materials/lesson-cache/`), but those sections
  live as standalone entries in `syllabus-data.js` without
  `subsections:` — openSubtopic's 3-tuple `(chapter, section, title)`
  shape cannot navigate to them. The implementation drops them from
  the candidate list with an inline comment. To re-enable, teach
  openSubtopic to fall through `card.click()` when no subsection card
  is present and click the section row directly.

### 7e. PR description hygiene

- **Update PR #44 description** noting Commit 1 was not strictly
  pixel-neutral — the MASK_CSS additions in Commit 2 followed because
  the BrowserContext-level injection in Commit 1 exposed mask gaps
  that the old per-page injection had hidden. Spec § "Rebaseline
  rollout" promised strict pixel-neutrality on Commit 1; the actual
  experience was 6 baselines moved on Commit 1. Document this once
  the PR merges.

---

## 8. Phase 3.5 v2 follow-ups (Glass coverage expansion)

Drafted 2026-06-22 after Phase 3.5 v2 self-review. PR (TBD on merge)
extended the harness from 18 → 25 views, closing the Glass-surface gap
that gated Step G.3 (Phase 2 #19, app/style.css L31257–L47658).

### What shipped in Phase 3.5 v2

7 new views, all 0.000% pixel-diff across two consecutive `--check`
runs:

- **View 19** — `19-login-screen` (Page D, new bootstrap via
  `enterLoginView`). Covers FINAL LOGIN LIQUID GLASS L43321+.
- **View 20** — `20-sidebar-collapsed` (Page A late). Covers FINAL
  COLLAPSED SIDEBAR GLASS FIX L43241+ via direct `.app.sidebar-collapsed`
  + `#leftSidebar.collapsed` class flips.
- **View 21** — `21-lesson-key-takeaways` (Page A, paginates to summary
  KP via the shared `advanceLessonUntil` helper). Covers ABSOLUTE EOF
  KEY TAKEAWAYS GLASS LOCK L39295+.
- **View 22** — `22-lesson-quick-check` (Page A, continues pagination
  to quiz KP). Covers ABSOLUTE EOF QUICK CHECK GLASS LOCK L39494+.
- **View 23** — `23-textbook-focus` (Page A overlay). Covers TEXTBOOK
  FOCUS GLASS LOCK L42981+ via forced modal show + mock-image stub.
- **View 24** — `24-answer-workspace` (Page B late). Covers ANSWER
  WORKSPACE LIQUID GLASS L41934+ via showAnswer subset replay
  (including topbar.classList.remove('hidden') to match production).
- **View 25** — `25-quick-setup-modal` (Page B overlay). Covers TRUE
  EOF QUICK SETUP GLASS MODAL L40258+ via inline `display:flex` on
  `#quizOverlay` — chrome only; option-card descendants deferred.

Also extended `tools/test-utils.js`: new `enterLoginView()` helper for
Page D bootstrap, new MASK_CSS rules for the login WebGL canvas + login
decorative motion + textbook-focus raster pages.

Also extended `tools/visual-diff.js`: new module-scope
`advanceLessonUntil(page, sentinelSelector)` pagination helper used by
views 21/22 to walk the lesson pager until a target Glass card lands.

### 8a — DEFERRED: Quick Setup modal #quizSteps content

View 25 force-shows `#quizOverlay` via inline `style.display='flex'`
but leaves `#quizSteps` empty. The Glass chrome (card, backdrop, title)
is pixel-locked; the per-step option-card and progress-indicator
descendants rendered by `renderQuizStep` (app.js L271+) are NOT. A
future PR touching the quiz modal styling could regress these inner
selectors without --check noticing.

**Entry point:** stub minimal option-card HTML into `#quizSteps` before
the screenshot — match the structure `renderQuizStep` emits but with
deterministic placeholder text. Risk: stub drift if `renderQuizStep`
restructures its output. Mitigation: expose `window.__ftutorRenderQuizStep
= renderQuizStep` (matches the existing `window.parseBase64JsonAttr` /
`window.inferInteractiveDemoFamily` pattern) and call it directly with
a fixture step.

### 8b — DEFERRED: window.* exposure pattern for force-flip views

Views 20 (sidebar-collapsed), 23 (textbook-focus), 24 (answer-workspace)
all bypass real production trigger functions (`setWorkspaceSidebarCollapsed`
at app.js L7443, `openTextbookFocusMode` at L3293, `showAnswer` at L6080)
and instead reproduce a subset of each function's DOM mutations inline.
This works but creates a divergence channel: when production adds a
new sibling-panel hide or aria attribute, the harness silently drifts.

**Entry point:** in `app/app.js`, expose the three trigger functions on
window using the same band-comment pattern as
`window.parseBase64JsonAttr` (L1084) and `window.inferInteractiveDemoFamily`
(near the dispatcher). Then rewrite views 20/23/24's `setup()` to call
`window.__ftutor*` directly. Eliminates ~25 lines of replicated logic
across the three views.

### 8c — DEFERRED: textbook-focus real-section coverage

View 23 injects a mock textbook page (1×1 PNG) into `#textbookFocusContent`
because §1.1-1 has no `#learnBookOverlay` images registered, so
`openTextbookFocusMode` (which reads `_bookOverlay.querySelectorAll('.textbook-page-card img')`)
cannot run. The current force-show + mock-HTML stub captures the Glass
modal chrome but bypasses any future CSS that depends on real
textbook-state attributes (e.g. `[data-page-mode]`, `:has(.is-zoomed)`).

**Entry point:** identify a cached section in `workspace/materials/` that
has `new-book-figures/` data registered and use it for view 23 instead
of stubbing. Tradeoff: loads more lesson chrome into the captured area
+ ties view 23 to a different SUBTOPIC than §1.1-1, complicating
sequencing on Page A.

### 8d — DEFERRED: enterLoginView + enterGuestMode intro-dismiss dedup

Both helpers do `page.goto(base)` + `page.click('#introGetStartedBtn')`
in their first two lines, then diverge. If `#introGetStartedBtn` is
renamed or the intro flow gains a confirmation step, both helpers must
be updated in lockstep. Drift surfaces only when `--check` fails.

**Entry point:** extract `dismissIntro(page, base)` to `tools/test-utils.js`
and have both `enterGuestMode` and `enterLoginView` call it before their
divergent next-step. ~6 lines saved + closes the drift channel.

### 8e — DEFERRED: MASK_CSS per-view organization

`MASK_CSS` is now a 50-line shared block covering 6 distinct UI surfaces
(introWebglContainer, recent timestamps, feedback meta, input caret,
home-mode menu, settings UID, login WebGL, login motion, textbook
raster). Future contributors adding view 26+ have no convention for
"add mask here or scope locally?".

**Entry point:** split `MASK_CSS` into `GLOBAL_MASK_CSS` (timestamps,
captions, `.is-animating`) and `PER_VIEW_MASKS = { '19-login-screen':
'...', '23-textbook-focus': '...' }`. `captureView` injects the
per-view block before screenshot via `page.addStyleTag` and removes it
after.  Defers a noisy file diff for marginal organization gain — skip
unless Phase 4 adds 5+ more views.

### 8f — DEFERRED: advanceLessonUntil sharing with collectLessonFamilies

`advanceLessonUntil` (visual-diff.js module scope) walks the lesson
pager until a sentinel selector lands. `collectLessonFamilies`
(visual-diff.js L423-L524) walks the lesson pager accumulating families
across all KPs. Both use the same `data-lesson-page` change-watcher
pattern. Two divergent copies of the pager-walking contract.

**Entry point:** generalize either into a single walker with a
configurable `stopWhen` predicate. Defer until a third caller appears
(test-utils.js `paginateLesson(page, opts)` with `mode: 'until' |
'collect'`). Saves ~25 lines + single-point-of-truth for pager timing.
