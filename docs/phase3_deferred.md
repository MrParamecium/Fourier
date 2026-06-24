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

#### 3a.i — SHIPPED PR #71: S5 feedback-author-tones (-95 lines)

Per-property cascade walk of L34000–L39200 via dispatched workflow
(109 agents, 1080 declarations tagged, 94 candidates → 23 confirmed-safe
blocks → 22 blocks shipped after adversarial review caught one false-
positive). Initial squash-merge (bc03542) deleted 95 lines net; the
PR description listed a projected 103 but a (1,4,0) selector restore
landed mid-review (see "Regression caught + fixed" below).

**Regression caught + fixed.** The cascade-analysis workflow flagged
L34742-L34748 as a duplicate of L34825-L34829 — true ONLY for the
single (1,3,0) selector `.feedback-reply[class*="tone-"]
.feedback-reply-context`. The (1,4,0) selectors at L34743/L34744
(`.is-left[class*="tone-"] .feedback-reply-context` + `.is-right`
variant) were UNIQUELY defined and had no later duplicate. Deleting
them dropped the cascade to two (1,3,0) candidates — the preserved
tone-tint L34775 and the lane-lock at L37725 (FEEDBACK CONVERSATION
COLOR LANES). Source-order tiebreak went to L37725 — chip border
flipped from `rgba(var(--author-rgb), 0.22)` (tone-tinted teal/orange)
to `rgba(52,211,153,0.34)` (lane green) / `rgba(244,114,182,0.32)`
(lane pink). Background and color shifted analogously. Restored in
commit 8d8bce6 with a load-bearing DO-NOT-DELETE comment.

**Visual-diff harness FAILED to catch the regression.** The harness
reported 14b at 0/1024000 pixels diff across two `--check` runs.
A diagnostic test with `border: 5px solid magenta + background: yellow`
on `.feedback-reply-context` also slipped past as 0%. The harness
DOES detect total-removal changes (`display: none` produced 2.821%
diff on view 14), so the bug is property/selector-specific, NOT
total-blindness — possibly a Playwright/Chromium CSS-loading or
disk-cache issue. **Direct Playwright computed-style probe was the
load-bearing verification** for §3a.i (see docs/visual-diff-harness-
gap.md if filed). All future #feedbackView CSS-cascade work MUST
use direct computed-style probes until the harness gap is fixed.

**Discovery-agent scoping lesson confirmed.** The deferred-doc warning
"discovery agents stop at the cluster's banner boundary" turned out
to be the wrong threat model. The actual failure mode was: workflow
correctly walked the full L34000-L39200 range, found L34825 as the
"byte-identical duplicate" — but failed to verify that the deleted
RULE GROUP contained two (1,4,0) selectors that the duplicate at
L34825 did NOT carry. The byte-identical check passed at the rule
level but not the selector level. Future cascade-analysis prompts
should explicitly compare comma-separated selector lists, not just
declaration bodies, when claiming "duplicate."

**Forward cleanup status (2026-06-24):**

- **L37980-L37991 tone-0..5 `--author-rgb`/`--author-ink` triplicate:**
  ALREADY REMOVED by PRs #80/#81 cleanup of the feedback cluster — only
  one definition set at L34710-L34715 remains in the post-#83 file.
  No further work.
- **L38006 `.feedback-reply-meta` tone-aware:** SHIPPED PR #87 (2026-06-24).
  Dropped `#feedbackView .feedback-reply[class*="tone-"] .feedback-reply-meta`
  from the L34655 grouped selector (byte-identical to L37790's first
  selector, same 1,2,1 spec, source-order shadow). Also bundled: L29817
  `font-size: 12px !important` dropped (byte-identical to L37088 same-group
  same-spec). −2 lines net.
- **L34751-L34762 4-selector deletes:** ALREADY REMOVED by PR #80
  (§3b.i `.feedback-reply.is-left::before { right: auto !important }`
  + L34786 `.feedback-reply-context` triple-group) and PR #81
  (`.feedback-thread` zero-match selector + remaining triple-group).
  The comma-group atomic-delete tooling was never needed because the
  enclosing rules became fully-shadowed and were deletable as full
  blocks. No further work.

#### 3a.ii — SHIPPED PR #76 (2026-06-24): B17/B18/B25 cluster-G remnants (-11 lines)

- **B25 (Textbook mode lock) — SHIPPED.** The `background:` shorthand
  at L34982-34985 was deleted. Inside the same rule, the surviving
  `background-image:` longhand at L34986-34989 carries the identical
  gradient list at identical `!important` weight, winning the image
  leg by source order. The shorthand's implicit color/position/repeat/
  size/origin/clip resets fall through to the lower-specificity
  `background:` shorthands at L32942 + L33583, which apply the same
  resets in both `.learn-textbook-active` and
  `.chapter-overview-active.learn-textbook-active` states.
  Code-smell note for future textbook-lock edits: pick shorthand-only
  OR longhand-only, not both — carrying both in one rule was the exact
  pattern that produced this dead code. 4 lines net.
- **B15 [2]:** `.learn-topbar-actions:has(#learnClose.learn-close)`
  rule looked dead because `#learnClose { display: none }`, but
  `#learnClose` IS rendered in the DOM (HTML L629; JS at app.js:891
  + 5334 wires it), so `:has()` still matches. NOT a delete.
- **B17 [1] — SHIPPED (1 of 9).** L25982-L25983 dead `:not()` selectors
  in the `#learnViewSelector` grouped rule were deleted. The third
  co-selector `#learnView #learnViewSelector` matches every instance
  unconditionally because `#learnViewSelector` lives in
  `.learn-topbar-actions` (sibling of `#learnBody` per `index.html:625`
  + `app.js:943-946`), so the two `#learnBody`-descendant selectors
  match zero elements in every DOM state. 2 lines net.
- **B17 extension — SHIPPED PR #77 (2026-06-24).** Remaining 8 sites of
  the same dead-`:not()` pattern cleared: L20731, L26114, L26175, L26243,
  L26416, L26616, L26672, L26956 (post-PR-#76 line numbers). Two sites
  live inside `@container lecture-panel (max-width: 760px)` queries
  (L20731 + L26114); the rest are top-level. All grep occurrences of
  `#learnBody:not(.chapter-overview-active) #learnViewSelector` and
  `.chapter-overview-split-active #learnViewSelector` in the file are
  now gone. Visual-diff harness 28 views: runs 2+3 stable, all pass.
  Run 1 view-22 0.765% flake confirmed to be Glass-card text-glyph
  anti-aliasing via diff-PNG inspection (not topbar). 16 lines net.
- **B18 [1] — SHIPPED.** L34702-L34705 deleted. Same selector
  (`.welcome.home-ask-workspace #homeModeMenu .home-mode-menu-icon i`),
  same specificity (0,1,3,1), both `!important`, both top-level (verified
  no enclosing `@media`) — L40073's `font-size: 22px` wins by source
  order over the deleted `font-size: 24px`. `line-height: 1` is
  covered by unitless inheritance from the parent `.home-mode-menu-icon`
  at L34689 (still live, `!important`). Doc B18's mention of L39324/
  L40268/L40829 was based on stale line numbers — only 2 occurrences
  existed at PR time, not 4. 4 lines net.

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

#### 3b.i — SHIPPED PR #80 (2026-06-24): feedback-cluster shadowed-block cleanup (-48 lines)

The original §3b.i scope (banner-rewrite of "EOF FEEDBACK AUTHOR COLORS"
+ "TRUE FINAL FEEDBACK AUTHOR TONES" + "EOF FEEDBACK AUTHOR COLORS
duplicate at L38480") was obsoleted by interim PRs #71-#79: the third
"duplicate at L38480" banner had already been removed, and the
"TRUE FINAL FEEDBACK AUTHOR TONES" banner was retitled / consolidated.
The remaining work surfaced as 6 individual cascade-shadowed blocks
inside the L34660-L34858 cluster, not a coordinated banner rewrite.

PR #80 deleted 6 shadowed blocks (line numbers pre-deletion):

- L34676-L34682 `#feedbackView .feedback-reply.tone-0..5` per-author
  vars — strict duplicate of broader L34772-L34777 `.tone-0..5`.
  Specificity drops (1,2,0) → (1,1,0); values byte-identical so final
  computed value on every reply is unchanged.
- L34706-L34710 `.feedback-reply[class*="tone-"] .feedback-reply-context`
  single-sel — strict subset of the load-bearing L34668 triple-group.
- L34712-L34716 `.feedback-thread::after` width/background — shadowed
  by L34690 `[class*="tone-"]` at (1,2,1) since every thread per
  app.js:6276 has `tone-N`.
- L34786-L34790 `.feedback-thread::after` width/background/opacity —
  same shadow chain as L34712; opacity falls through to L37552's 0.82.
- L34805-L34814 `.feedback-reply::before` single-sel — every property
  duplicated by L34725 triple-group; L37384's later `display:none`
  made the bare hypothetical unreachable.
- L34852-L34858 `@media (max-width:760px)` block — byte-identical
  (verified via `diff`) to L34754 + L37678; third copy still present.

Verification: per-property cascade walk + 3-lens adversarial review
(specificity-tuple-arithmetic, JS-template-class-discovery, media-query-
and-pseudo-element-edge-cases) — all 6 candidates returned `safe-delete`
with zero refutations. Plus 9-angle high-effort `/code-review` with
1-vote verify + sweep — 4 returned findings, all PR-description precision
asks or runtime-unreachable hypotheticals, no defects. Visual-diff
harness: 33 views @ 0.000% across two consecutive `--check` runs,
including strict-0.05% view 14c (the §3a.i regression-detector).

Also dropped the stale `/* Per-author tint at (1,2,0)… */` comment at
L34676 explaining the now-deleted block. 48 lines net.

#### 3b.i.followup — SHIPPED PR #82 (2026-06-24): banner-comment hardening (+13 lines)

Review finding #2 (PR #80 `/code-review`): the L34660-L34667
"EOF FEEDBACK AUTHOR COLORS" banner comment carries a DO-NOT-DELETE
warning specifically about the (1,4,0) `.feedback-reply-context`
triple-group at L34668-L34674, but does not mention the surviving
`.feedback-reply::before` triple-group immediately below
(at L34705 post-deletion / L34725 pre-deletion). A future maintainer
inspecting the cluster could misread the `.feedback-reply::before` group
as accidentally retained and delete it, breaking the dot-marker chrome
on left/right reply pseudo-elements.

**Why deferred (D1 — Unrelated):** the `.feedback-reply::before` group
was not modified by PR #80; expanding the banner comment to cover
adjacent rules is scope creep relative to the cascade-collapse goal of
the PR.

**Next-session entry point:** `app/style.css:34660` — add a brief
"plus the .feedback-reply::before group at L34705 is the live source
of dot-marker chrome" line to the existing DO-NOT-DELETE block. ≤5
line doc-only edit; no cascade impact.

**Update (2026-06-24, post-PR-#81):** the 9-angle `/code-review` of
PR #81 surfaced 6 additional comment-hardening / formatting concerns
on the same feedback + mistake-notebook cluster, all on pre-existing
untouched code. **Bundle these together as the same D1 follow-up:**

- `app/style.css:34660` — banner comment doesn't cross-reference
  L37552-L37562 lane-color overrides (only mentions L37452 in older
  language). Add: "The (1,4,0) tone-rules here shadow the (1,3,0)
  lane-color overrides at L37552+ — deleting them lets lane green/pink
  win over per-author tones."
- `app/style.css:34705` — `.feedback-reply::before` triple-group has
  no guard comment despite being load-bearing positioning for is-left/
  is-right dot markers. Add a short header noting "sets position:
  absolute + content for L34777 / L34781 offsets."
- `app/style.css:34729` — "FEEDBACK AUTHOR TONE LOCK" comment doesn't
  cross-reference L34660-L34667's specificity explanation. Add: "see
  L34660 banner for the (1,4,0) > (1,3,0) cascade rationale."
- `app/style.css:34735` — `--author-mid` definition lacks a "still
  consumed by L34699 (feedback-reply-count border) after PR #81 deleted
  the L34786 consumer" note. Add: "consumers: .feedback-reply-count
  (L34699)."
- `app/style.css:35077` — "Mistake Notebook layout shuffle" comment was
  written when the section header preceded shell + header + toolbar +
  styling rules; after PR #81 deleted the shell + header, the section
  now starts at the toolbar. Comment is still accurate as a generic
  layout header but consider tightening to "Mistake Notebook toolbar
  + list-card layout."
- `app/style.css:36078` — "True tail lock 2: remove the remaining
  lecture-page gutters" comment describes width/max-width/margin
  rules, but the deleted L36141-L36145 padding-left/right resets were
  the more on-point "gutter removal" rules. Comment now slightly
  mismatches what follows.
- `app/style.css:35073` — pre-existing indentation inconsistency
  inside the `@media (max-width:820px)` block (the `.mistake-list`
  rule's selector starts at column 0 while siblings are indented).
  Quick whitespace fix, not cascade-impacting.

All 7 sub-items are doc/whitespace-only, no cascade risk, no harness
impact. Bundle into a single ~25-line cosmetic-cleanup PR when
visiting this cluster next.

**Shipped 2026-06-24 in PR #82** (chore/style-comment-hardening, +24/-11
= +13 lines net). All 7 sub-items addressed. Light Explore-agent review
caught one line-number error (L37552 → L37461) which was fixed before
merge. Visual-diff unchanged (33 views — 30 at 0.000%, 3 known-noise
unrelated). Harness coverage confirms comment edits + 1 indentation
fix had zero rendering impact.

#### 3b.ii — SHIPPED PR #75 (2026-06-24): course-tracker overview + grid bundle (-21 lines)

Three orphan blocks deleted: `.course-tracker-overview { ... }`
(L14139-L14145), `.course-tracker-grid { ... }` (L14204-L14210), and
their shared `@media (max-width: 1100px)` wrapper (L14813-L14820).
All three target classes that no live DOM element carries — the
redesign replaced them with `.course-tracker-command` +
`.course-tracker-hero-card` + `.course-tracker-layout` +
`.course-tracker-side-rail`. Discovery + 3× adversarial verify
confirmed `app/index.html`, `app.js`, and runtime-CSS files all
contain zero references. The PR #53 cited `!important` shadowers
(L36989/L37147) no longer match current line numbers but it does not
matter — the rules are dead by element-absence, not cascade override.
21 lines net (one blank separator preserved per block).

**Workspace-mirror note:** `workspace/app-mirror/index.html` + `.css`
still reference the old classes. Per `docs/sync-policy.md` the mirror
is not served at runtime, so this is a non-issue today. If the mirror
ever gets synced back into `app/`, drop the orphan classes from the
mirror too.

#### 3a.i++ / 3a.ii++ — SHIPPED PR #81 (2026-06-24): cross-cluster shadowed cleanup (-41 lines)

Fresh-discovery pass against post-PR-#80 file state surfaced 7 more
cascade-shadowed blocks across the feedback, mistake-notebook, and
lesson-page surfaces:

- `app/style.css:34721-34723` `.feedback-reply.is-left::before
  { right: auto !important }` — CSS default for position:absolute
  pseudo-elements is right:auto; L34705 base group sets position
  without right; L34777 sets left:-5px. Deletion produces identical
  computed values.
- `app/style.css:34725-34730` `.feedback-reply-context` triple-group
  (background + color) — same selector + same (1,3,0) spec as the
  L34786 block (also deleted); for real DOM, L34668 [class*="tone-"]
  at (1,4,0) wins on both props anyway.
- `app/style.css:34757-34762` `.feedback-thread`
  (border-color + background) — zero-match selector because
  app.js:6276 always emits tone-N on threads; L34676 covers all real
  threads.
- `app/style.css:34786-34792` `.feedback-reply-context` triple-group
  (border + background + color) — L34668 (1,4,0) wins for every real
  reply (each has tone-N + is-left|is-right per app.js:6292).
- `app/style.css:35104-35107` `.mistake-notebook-shell`
  (width + padding-top) — L35578 (later same-spec) shorthand was
  already winning pre-deletion via shorthand-overrides-longhand.
- `app/style.css:35109-35111` `.mistake-notebook-header`
  (margin-bottom) — L35589 `margin: 0 0 clamp(...)` shorthand was
  already winning.
- `app/style.css:36141-36145` `.lesson-page-content p, li`
  (padding-left/right: 0) — byte-for-byte duplicate of L36107-L36111
  (verified via `diff`).

Verification: 5-subrange parallel discovery → 15 raw → 15 verified →
7 confirmed safe-delete after 1-skeptic adversarial review. Visual-
diff: 33 views @ 0.000% across two consecutive `--check` runs,
including strict-0.05% view 14c. 41 lines net.

#### 3b.iii — DEFERRED: MN doubled-ID specificity patterns

Discovery noted "Doubled-ID specificity patterns checked at L35492-L35493
(True EOF layout lock): those use #id#id.selector syntax and beat
single-ID at L35604; no collapse opportunity there (out of scope for
0.2% harness)." Pattern is similar to Step B's S4 (PR #49) but for
MN, not the sidebar. Needs separate harness expansion before any
action — leave as-is.

#### 3b.iv — PARTIALLY SHIPPED: state-variant override collapses (#20b)

Per Roadmap matrix Step C, the following state-variant override stacks
were NOT covered by the 28-view harness and were intentionally skipped:
- `:hover`/`:disabled`/`:focus` on `.feedback-board-card` (27×)
- `:hover`/`:disabled`/`:focus` on `.preference-profile-preview` (18×)
- `:hover`/`:disabled`/`:focus` on `.preference-preview-card` (14×)
- `:hover`/`:disabled`/`:focus` on `.preference-primary-btn` (10×)

**Phase 3.5 v4 harness expansion — SHIPPED PR #78 (2026-06-24).**
Added 5 state-variant capture views (28 → 33 views):
- `12b-preference-primary-btn-hover` — `page.hover('#preferenceSaveBtn')`
- `12c-preference-editor-focused` — `page.focus('#preferenceProfileEditor')`
- `12d-preference-secondary-btn-hover` — `page.hover('#preferenceResetBtn')`
  (closes the L13985 / L35558 grouped-selector blind spot from primary-only)
- `14d-feedback-compose-input-focused` — `page.focus('#feedbackBodyInput')`
- `14e-feedback-compose-btn-hover` — `page.hover('#feedbackSubmitBtn')`
  + child icon `i` (covers both the L35040 parent and L35050 child cascade)

Each new view uses **exact-match transform asserts** (`matrix(1, 0, 0, 1, 0, -1)`
literal) plus `failRatio: 0.0005` (0.05% strict) — not the weak `t !== 'none'`
check. The pre-review iteration found the loose assert would silently pass
cascade-arm swaps (1-2 px translateY shifts diff at ~0.023% of the 1280×800
frame, well under the default 0.5%). Review caught 6 sev1 / 2 sev2 findings
before the PR landed; all fixed.

**§3b.iv first refactor pass — SHIPPED PR #79 (2026-06-24): −30 lines.**
Deleted 4 fully-shadowed cascade blocks:
- L13985 `.preference-primary-btn:hover, .preference-secondary-btn:hover
  { transform: translateY(-2px) }` — shadowed by L35558 (3-ID + !important,
  -1px wins). Verified by views 12b + 12d at 0.000%.
- L13998 `.preference-primary-btn:active, .preference-secondary-btn:active
  { transform + box-shadow }` — shadowed by L35563. **Cascade-only:** no
  `:active` capture view exists (see §3b.iv.followup below).
- L16757 `.feedback-input:focus, .feedback-textarea:focus, ...:focus
  { border-color + box-shadow }` — shadowed by L29380 → L37095. Verified
  by view 14d at 0.000%.
- L29380 `.feedback-input:focus, ...:focus { border-color + background +
  box-shadow !important }` — shadowed by L37095 (1-ID `#feedbackView` +
  !important). Verified by view 14d.

**Remaining §3b.iv candidates (estimated ~120-170 lines):** the
`.feedback-board-card` 27×, `.preference-profile-preview` 18×,
`.preference-preview-card` 14× rules listed above. These are mostly
property duplicates across the 5 banners in the L33181-L44261 cluster;
each needs per-block cascade-shadow analysis like §3a.i / §3a.ii had.
Some are covered by existing views 14 / 14b / 12 (resting state) since
deletions to non-state-variant property duplicates don't require state
capture.

#### 3b.iv.followup — Harness gaps surfaced by PR #79 self-review

Three sev3 latent blind spots in the v4 harness (none block any landed
work; they apply to FUTURE refactors of the same cluster):

- **No `:active` view** for any button. PR #79's deletion of L13998
  (`.preference-primary-btn:active` block) was cascade-shadow-only.
  A future delete or reorder of L35563 (the current winner) would
  silently regress mousedown chrome on `#preferenceSaveBtn` and
  siblings. Add a `12e-preference-primary-btn-active` view that holds
  `page.mouse.down()` over the button bounding box (or addStyleTag
  forces `.preference-primary-btn:active`) and asserts
  `matrix(1, 0, 0, 1, 0, 1)` from L35563.
- **View 14d only covers `.feedback-textarea:focus`** (the textarea
  arm). The L37095 grouped selector also covers `.feedback-input`,
  `.feedback-reply-name`, `.feedback-reply-input`. Add a
  `14f-feedback-input-focused` view focusing `#feedbackNameInput`
  (or `#feedbackTitleInput`) to validate the `.feedback-input` arm;
  the reply-input arms only appear when a thread is rendered AND
  the user clicks "Reply", so a `14g-feedback-reply-input-focused`
  view would need 14b's seeded fixture + a click-to-open-reply step.
- **L37095 sets `outline: none !important`** — not present in any
  view's assertion. A future delete of L37095 leaves the textarea
  with the default browser focus ring, a ~2-3 px outline that would
  diff visibly but is hard to assert precisely. View 14d's pixel
  diff IS the guard; document the dependency.

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
| Step D (Pass 2 PRs #56–#58) | home Ask + answer-workspace cascade collapse | −147 in `app/style.css` |
| §3a.i (PR #71) | feedback author-tones cascade dedup | −95 in `app/style.css` |
| §3a.i forward (PR #74) | feedback-cluster cleanup | −54 in `app/style.css` |
| §3b.ii (PR #75) | orphan course-tracker bundle | −21 in `app/style.css` |
| §3a.ii (PR #76) | B17/B18/B25 cluster-G remnants | −11 in `app/style.css` |
| §3a.ii extension (PR #77) | B17 mechanical 8-site sweep | −16 in `app/style.css` |
| §3.5 v4 harness (PR #78) | +5 state-variant views (12b/12c/12d/14d/14e) | +245 in `tools/visual-diff.js` |
| §3b.iv pass 1 (PR #79) | 4 shadowed `:hover` / `:focus` / `:active` blocks | −30 in `app/style.css` |
| §3b.i (PR #80) | feedback-cluster shadowed-block cleanup | −48 in `app/style.css` |
| §3a.i++/§3a.ii++ (PR #81) | cross-cluster shadowed cleanup (feedback + MN + lesson-page) | −41 in `app/style.css` |
| **§3b.i.followup (PR #82)** | **bundled comment-hardening + indentation fix** | **+13 in `app/style.css` (doc)** |

`app/app.js`: **14,434 → 9,385 lines (−5,049, −35.0%)**.
`app/style.css`: **44,845 → 43,427 lines (−1,418, −3.16%)**.

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

## 9. Phase 3.5 v3 follow-ups (G.3.2 + G.3.3 coverage gaps)

Identified during PR #64 (Step G.3.2) and PR #65 (Step G.3.3) adversarial
reviews on 2026-06-22. Two of three gaps closed on 2026-06-23 via PRs #69
+ #70; one (§9c gap 2 narrow-viewport) remains deferred.

### 9a — SHIPPED (PR #69, 2026-06-23): populated feedback-board view

View 14 (`14-feedback-board`) captures the EMPTY feedback board state:
`app/users/feedback-board.json` does not exist, `readFeedbackBoard()`
returns `{items:[]}`, and `renderFeedbackBoard` (app.js:6249) emits
`<div class="feedback-empty">No suggestions yet.</div>`. NO
`.feedback-thread`, `.feedback-reply`, `.tone-N`, `.is-left`, `.is-right`,
`.feedback-replies`, or `.feedback-click-reply` node ever materializes.

**Consequence:** Step G.3.2 (PR #64) shipped 121 lines of `#feedbackView`
deletions with ZERO pixel coverage on the deleted selectors. The
0/25-views-at-0.000% result is mechanically correct but vacuous for
those rules. Cascade-shadow analysis (every deleted rule verified to
have a same-or-higher specificity later shadower in the same file) is
the sole correctness guarantee.

**Risk envelope:** if the cascade analysis is wrong on any of those 13
rules, the regression only surfaces once a real user seeds threads.
Most-likely regression shapes: author-identity tints disappear or shift
(sky-blue base instead of tone-N color), per-tone reply backgrounds
flatten, lane-side dot markers vanish, `.feedback-click-reply.is-target`
loses its selected-ring chrome.

**Entry point:** seed a fixture `app/users/feedback-board.json` with
2-3 threads (different `tone-N` classes, mixed `is-left`/`is-right`
reply lanes, at least one `.feedback-thread-click-target` clicked into
`is-target`). Add `14b-feedback-board-populated` view that loads the
fixture and captures the rendered board. Then re-run G.3.2's
visual-diff against the populated baseline as a retroactive empirical
check. If the deletions hold up, this stays a one-time validation; if
any view regresses, the affected rules get restored.

**Shipped in PR #69 (2026-06-23):** Fixture seeded via filesystem path
`tools/fixtures/feedback-board.populated.json`. View 14b uses
`seedFeedbackFixture` + `restoreFeedbackBoard` helpers (test-utils.js,
content-comparison safety to prevent dev-data loss + tools/.harness-state/
backup dir). Captures 2 threads + 6 replies covering tone-0..5,
both `is-left`/`is-right` lanes carrying `replyTo` (for
`.feedback-reply-context` chrome on both lanes), `.feedback-reply.is-target`
(via Charlie's reply click) + `.feedback-thread-body.is-target` (via
thread 2's body click). Note: `.feedback-thread-click-target.is-target`
is UNREACHABLE — setFeedbackReplyTarget's `[data-feedback-reply-anchor="${target.id}"]`
lookup doesn't match the thread-head div's `data-feedback-reply-anchor="thread"`
literal anchor. Documented in view 14b setup comment.

TZ + locale pinned via `chromium.newContext({ timezoneId: 'UTC',
locale: 'en-US' })` so `formatFeedbackTime` (toLocaleString) renders
deterministically across runners.

### 9b — DEFERRED: G.3.2 commit message precision

PR #64 commit message says the FINAL FEEDBACK AUTHOR COLOR LOCK
`--author-soft/-mid/-line` declarations were "shadowed by FEEDBACK
AUTHOR TONE LOCK identical declarations." TONE LOCK's values
(0.11/0.24/0.40) actually differ from FINAL LOCK's (0.10/0.22/0.42)
by 0.01-0.02. The deletion is behaviorally safe because TONE LOCK
wins by source order regardless, but the word "identical" is imprecise.

**Consequence (per altitude reviewer):** A future reader trusting the
"identical" phrasing might assume the TONE LOCK block is also a
duplicate and silently shift tints by 0.01-0.02 across every author
bubble.

**Entry point:** if Phase 4 ever touches the TONE LOCK block, verify
the value-diff before treating it as a duplicate of FINAL LOCK.

### 9c — MIXED: opened-mistake-case view (SHIPPED PR #70) + narrow-viewport (DEFERRED)

Identified during PR #65 (Step G.3.3) adversarial review on 2026-06-22.

**Coverage gap 1 — view 03 mistake-notebook never opens a case. SHIPPED PR #70 (2026-06-23).**
View 03 (`03-mistake-notebook`) only captures the landing surface. It
does not click a case to open `.mistake-workspace`, so the
`.mistake-workspace` (display + grid-template-columns), `.mistake-ai-
instruction` (min-height), and `.mistake-note-columns` (min-height +
height + grid-template-rows) deletions in PR #65 are NOT pixel-
validated. Cascade analysis is the sole correctness guarantee for
these 3 deletions:

- `.mistake-workspace` candidate shadowed by EARLIER doubled-
  `#mistakeNotebookView#mistakeNotebookView .mistake-workspace` at
  strictly higher specificity (0,2,1,0 vs 0,1,1,0) — always wins
- `.mistake-ai-instruction min-height: 94px` shadowed by same-spec
  later rule with min-height: 96px
- `.mistake-note-columns` first declaration shadowed by same-spec
  later declaration with different clamp values

**Entry point:** add a `03b-mistake-notebook-open-case` view that
seeds a fixture mistake case (`app/users/mistakes.json` or similar),
opens it, and captures the workspace. Then re-run all 3 deletions
against the populated baseline as a retroactive empirical check.

**Shipped in PR #70 (2026-06-23):** View 03b seeds
`localStorage[aquariusMistakeNotebook.v1]` with a single fixture
mistake (id, title, tags, notes, empty arrays + empty AI fields,
`problemText` only — no `imageDataUrl` to avoid embedding a raster
blob). Two of the three PR #65 deletes are pixel-validated; the third
(`.mistake-ai-instruction`) was verified ORPHAN — no DOM ever matches
the selector (grep against `index.html` + `app.js` + `mistake-notebook.js`
returns zero rendering paths). Cannot be pixel-validated by any harness
coverage.

**Side-discovery from PR #70 diagnostic instrumentation:** view 04
(`04-recent-conversations`) setup's `page.click('#mistakeNotebookCloseBtn')`
has been silently failing since the harness was created. The button is
hidden by the doubled-ID rule at `app/style.css:34394` (`display: none
!important; visibility: hidden !important; width: 0 !important; ...`).
Playwright's click times out, the `.catch(() => {})` swallows the error,
the subsequent `waitForSelector('#mistakeNotebookView.hidden')` also
silently times out. View 04 has ALWAYS captured mistake-notebook view
+ sidebar recent-panel open, NOT welcomeScreen. Real production
implication: this might be a user-visible UX bug (clicking ✕ on the
mistake notebook should close it, but it cannot be clicked — though
users probably navigate away via the sidebar nav anyway). Documented
in view 04 setup; a future PR could fix the visibility rule + rebaseline
view 04. Tracked here for visibility.

03b is scheduled at the END of the Page A view list (after view 25)
rather than adjacent to view 03. Reason: with 03b preceding view 04,
view 04's broken close-button click leaves mistake-notebook in the
POPULATED state (workspace visible), causing a ~4.2% drift on view 04's
"mistake-notebook empty + recent panel open" baseline. Running 03b at
end means no Page A view inherits the populated state. View 03's
INVARIANT comment documents this constraint for future contributors.

**Coverage gap 2 — narrow-viewport @media never captured.**
Harness viewport is 1280x800 (`tools/visual-diff.js` L42, > 1180px).
The `@media (max-width: 1180px) #preferenceView .preference-page-grid`
deletion in PR #65 is INVISIBLE to the harness. Cascade-shadow
analysis confirmed the rule is dead (later same-query block with
identical selector + property set wins by source order), but no
pixel-diff can validate.

**Entry point:** either add a separate narrow-viewport visual-diff
sweep (run at 800x600 or similar against all preference / chapter
overview / responsive surfaces), or document that ALL `@media (max-
width)` deletions are cascade-only-verified for future sub-PR reviews.

**Status (2026-06-23): DOCUMENTATION-ONLY CLOSE.** No separate
narrow-viewport sweep is planned. Future cascade-shadow work that
touches `@media (max-width: ...)` rules at `app/style.css:36230`
(`#preferenceView .preference-page-grid` at ≤1180px),
`app/style.css:38335` (`.mistake-note-columns { grid-template-columns:
1fr }` at ≤980px), `app/style.css:36240` (notebook-shell padding at
≤820px), and the broader `@media` cluster from L11000+ MUST treat
those deletions as cascade-only-verified — the 1280×800 fixed harness
viewport cannot pixel-validate them. Cascade-shadow analysis (specificity
tuples + source order + !important precedence on the same selector)
is the sole correctness guarantee. If a future round of CSS deletion
proposes a narrow-viewport @media block as dead, surface it explicitly
in the PR description as "cascade-shadow only, no harness coverage."

Implementing the actual sweep would need: (a) a parallel BrowserContext
at a narrow viewport (e.g. 800×800 to also cover ≤820 + ≤980 breakpoints
in one width), (b) a curated subset of views that exercise responsive
surfaces (preference, course-tracker, mistake-notebook, feedback-board
— roughly 6-10 views), (c) new baselines + signal-handling. ~150-line
implementation, ~half-session of work. Worth doing only if a future
Phase 4 cascade-shadow round proposes 5+ @media deletions in one PR.

---

## 10. Phase 3.5 v5 follow-up (state-variant harness gaps closed)

Drafted 2026-06-24 after PRs #83 + #84 landed.

PR #83 closed the 3 sev3 latent blind spots flagged in §3b.iv.followup:

- **View 12e (`12e-preference-primary-btn-active`)** — `page.mouse.down()`
  over `#preferenceSaveBtn` bounding box, asserts the
  `matrix(1, 0, 0, 1, 0, 1)` (+1px translateY) from L35563's `:active`
  rule. STRICT_FAIL_RATIO = 0.05%.
- **View 14f (`14f-feedback-input-focused`)** — focuses
  `#feedbackTitleInput` so the L37095 grouped selector's
  `.feedback-input` arm is pixel-covered (view 14d only exercised the
  `.feedback-textarea` arm). STRICT_FAIL_RATIO = 0.05%.
- **View 14d outline assert** — added `outline-style/-width/-color`
  computed-style probe so a deletion of L37095's `outline: none
  !important` (or the L9405 broad reset that backs it up) would
  fail-fast on the assertion rather than waiting for a pixel-diff
  fluke. See [[reference-feedback-input-outline-cascade]] for the
  cascade rationale.

PR #84 (§3b.iv pass 2) shipped −42 lines bundled with PR #83's harness
work — all 4 deleted blocks were verified safe by the new state-variant
views.

No remaining items in §10. State-variant harness coverage on the
preference primary-btn / secondary-btn / editor / feedback compose
input + textarea / feedback-board thread bodies is complete for the
35-view bar set today.

---

## 11. Lesson + mistake-notebook baseline refresh (Phase 3.5 v6) — SHIPPED PR #86 (2026-06-24)

**Drafted 2026-06-24.** Discovered while planning a "should we refresh
the drifted baselines?" PR. **Shipped 2026-06-24 in PR #86** via
Option A (mask `#sidebarSyllabusPanel` with `display: none` from view
06 onward on Page A) + refresh of the 9 affected baselines. Verified
by 5 consecutive `--check` runs all 35/35 green. View 22 still shows
~0.3% cold-cache flake (§11a) under the 0.5% default threshold.

### Root cause

9 baselines drift consistently at 1.3-1.4% on every `--check` run
(reproduced 2× on clean post-PR-#83/#84 main, commit 48fdddc):

| View | Drift (px) | Drift (%) |
| --- | --- | --- |
| 06-lesson-view | 13645 / 1024000 | 1.333% |
| 07-lesson-pager-states | 13645 | 1.333% |
| 08-lesson-lecture-toolbar | 13645 | 1.333% |
| 09-lesson-qa-column | 13645 | 1.333% |
| 15-lesson-chapter-overview | 13645 | 1.333% |
| 16-lesson-chapter-overview-split | 13645 | 1.333% |
| 21-lesson-key-takeaways | 13715 | 1.339% |
| 22-lesson-quick-check | 13706 (±~0.4% extra cold-cache flake) | 1.338% |
| 03b-mistake-notebook-open-case | 14100 | 1.377% |

All 9 share the same root cause: the **left sidebar's vertical
layout shifted ~1-2px per row** between the baseline capture (PR #70,
commit 9c2329b on 2026-06-22) and HEAD (commit 48fdddc on 2026-06-24).
Diff inspection (`tools/visual-diff/06-lesson-view.png`) shows
overlapping `Background` / `Chapter 1 (Signals and Systems)` /
`1.1 Size of a Signal` text at the same horizontal position but
offset vertically — exactly the signature of a per-row padding /
line-height / margin shift accumulating down the list.

Source: 9 cascade-shadow-removal PRs landed between PR #70 and HEAD
(#71 −95, #74 −54, #76 −11, #77 −16, #79 −30, #80 −48, #81 −41,
#82 +13, #83 −42). Every one was adversarial-reviewed and harness-
verified at 0.000% on its **then-current baseline set**, but no PR
re-baselined the lesson-page sidebar surface. The accumulated
rounding error is the visible drift.

**MEMORY mischaracterization correction:**
[[project-phase3-status]] Step G.3 finding #3 claims this is a
"first-run cold-cache sidebar flake" that resolves on the second
`--check` run. Falsified 2026-06-24: both runs land at identical
pixel counts on the deterministic views (06/07/08/09/15/16 = 13645
px exactly, 03b = 14100 px exactly, 21 = 13715 px stable, 22 = 13706
px ±~0.4% extra cold-cache flake on the quick-check rendering only).
The "run twice" mitigation never worked on these views — it papered
over a real drift.

### Why deferred (defer rule D2 — Harness blindspot)

The baseline files are STALE artifacts, not a code problem. Refreshing
them is the right move *iff* every shipped PR (#71-#83) actually was
safe on the rendering surface it claimed not to affect. That assumption
holds: each PR's cascade-shadow analysis cited the specific later-source
or higher-specificity rule that wins after deletion, and all 35 views
remained green against their then-current baselines. The drift is
expected layout micro-shift, not a real regression.

### Plan (REVISED 2026-06-24 after attempted fix in PR #85)

**Original plan: baseline-only PR.** Refuted on first attempt — the
captures themselves are non-deterministic across runs, so any baseline
becomes immediately stale.

**Attempt 1 — PR #85 (closed unmerged):** added
`normalizeSidebarSyllabusScroll(page)` helper in `tools/test-utils.js`
called at the end of `openSubtopic`. Pinned scrollTop=0 on
`#sidebarSyllabusPanel` + `.sidebar-syllabus-panel-inner` + every
scrollable descendant. Also tried (in later iteration) `waitForFunction`
on `.is-animating` clearing, and double-rAF settle. Result: REDUCED
drift from ~13645 px to ~12379 px but did NOT eliminate it. Three
consecutive `--check` runs produced different MD5s on the same code:

| Run | View 06 px-diff | View 22 px-diff |
| --- | --- | --- |
| 1 | 12379 | 16136 |
| 2 | 12379 (vs Run-1 baseline) | 12423 |
| 3 | 13346 (vs Run-2 baseline) | 12423 |

The two-state-attractor hypothesis (oscillation between two specific
post-openSubtopic sidebar layouts) is partly explained but not fully
characterized — even between two runs with identical-MD5 captures, a
third run flips to a different state. Closed PR #85 without merging
2026-06-24.

### Real root cause hypothesis (next-session entry point)

The drift is in the sidebar's vertical layout — `tools/visual-diff/06-*.png`
diff inspection shows sidebar text rendered at slightly different
vertical positions, NOT lesson content drift. Three contributors,
ordered by likelihood:

1. **Chapter accordion height jitter.** `setAccordionOpen` at
   `app.js:522` uses `max-height` transition that ends with
   `.is-animating` removed, but the FINAL height depends on the
   transition's animation phase quantization at the moment the
   transition-end listener fires. Subpixel rounding produces ±1 px on
   the panel's settled height, which shifts every sidebar row below
   it.
2. **Font subpixel hinting variance.** Chromium's font rasterization is
   not bit-exact deterministic across BrowserContext fresh-starts even
   with same font + same DPI. May explain the high-frequency 1-2 px
   row-by-row offset across the whole sidebar.
3. **MathJax typeset re-flow.** `settleLesson` waits for
   `MathJax.typesetPromise`, but only at the CALLER time — if MathJax
   does deferred work after settle resolves, layout can re-shift
   after the screenshot.

### Revised plan

Three options, in order of ambition:

**Option A — Mask the sidebar entirely on lesson views.** Add a
`PER_VIEW_MASKS['06-lesson-view'] = '#sidebarSyllabusPanel * { visibility: hidden !important }'`
(and same for 07/08/09/15/16/21/22/03b). The harness then ignores
sidebar pixel state for these views, focuses on lesson chrome
correctness. Loses sidebar regression coverage on lesson views; gains
back to other views (12-preference etc.) which already cover sidebar
rendering separately. **~15 line PR, fixes drift, ships in 30 min.**

**Option B — Replace settleLesson's MathJax wait with a layout-stable
sentinel.** Have app.js emit a `document.documentElement.dataset.lessonLayoutStable = '1'`
attribute after MathJax + chapter accordion + scrollIntoViewIfNeeded
have ALL fully resolved (probably gated on `requestIdleCallback` +
2× rAF). settleLesson waits for that attribute instead of inferring
from MathJax + rAFs. Heavier — needs app.js instrumentation. **~60
line PR across app.js + test-utils.js, ships in 1-2h.**

**Option C — Per-view loose threshold.** Set per-view
`failRatio = 0.015` (1.5%) on the 9 lesson views. Mechanical;
deceives the harness into "passing" with deeply-degraded coverage.
**Not recommended** — defeats the purpose of regression coverage on
exactly the surface where Phase 3 cascade work happens.

**Recommendation:** Option A is the cheapest reasonable fix. The
sidebar rendering is exercised by views 12/13/14 (preference,
course-tracker, feedback-board) which all show the sidebar in
deterministic resting states. Lesson views care about lesson chrome,
not sidebar chrome.

### Why ultimately deferred (defer rule D2 — Harness blindspot)

Each option needs harness expansion + verification + per-view
threshold tuning. Out of scope for a baseline-only PR. Schedule as
its own focused session.

### 11a — DEFERRED follow-up: view 22 cold-cache ~0.4% flake

View 22 (`22-lesson-quick-check`) shows ~0.4% additional pixel drift
on the first `--check` of a session vs subsequent runs. Likely
quick-check-KP-specific (probably KaTeX render or
`advanceLessonUntil(#testBannerCard)` sentinel timing). Subsumed by
the §11 main investigation if Option B above is pursued (Option A
also masks it via sidebar-hidden; Option C absorbs it via loose
threshold).
