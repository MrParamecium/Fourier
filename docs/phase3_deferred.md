# Phase 3 — Deferred Items

Drafted: 2026-06-21, end of the Phase 3 implementation session that landed
6 PRs / commits (PR #21, baseline refresh, PR #22, PR #20a, PR #20b, PR #20c).
Lists everything intentionally left unfinished, with the rationale and a
suggested next-session entry point. Use this as the starting point for
"Phase 3.5" (or fold the largest items into Phase 4 scoping).

---

## 1. PR #21 follow-ups

### 1a. Pass 2 — shared interactive-demos helpers

**What:** Create `app/interactive-demos/helpers.js` and consolidate the
per-family local closures (`drawArrow`, `sizeCanvas`, `formatNum`,
`getA`/`getB`/`getThetaRad`/`getThetaDeg`/`getR`/`getC`, `formatAngle`,
`drawGrid`, the `pendingFrame` rAF coalescing pattern, the control
wiring loop) that today live duplicated inside `complex-plane.js`,
`sinusoid-phasor.js`, `phasor.js`, and `matrix-conformability.js`.

**Why deferred:** Plan §4.4 Pass 2 calls out subtle per-branch
differences that block a naive consolidation:
- `drawArrow` signature: ctx-as-first-arg (sinusoid + phasor) vs
  outer-ctx-capture (complex_plane).
- `sizeCanvas` dpr/sizing math drift between sinusoid (uses
  `fallbackHeight`) and complex (computes height from width).

Pass 2 must reconcile these signatures and confirm no visual
regression. Estimated ~600 lines net delete (the per-family
duplicated closures total roughly 200 lines × 3 families).

**Entry point:** start by reading the §4.4 Pass 2 list in
`docs/phase3_plan.md`, then diff the existing `drawArrow` /
`sizeCanvas` implementations across the 3 large family modules.

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

Plan target: ~900 lines net delete. Same approach as 3a, with the
extra wrinkle that the duplicate "EOF FEEDBACK AUTHOR COLORS" banner
appears at both L35037 and L38774 — must read both before merging
either.

### 3c. PR #20c Pass 2 — Home Ask + answer workspace + login + intro

Plan target: ~3,500 lines net delete (the largest single payoff).
The top-4 duplicated selectors per plan §6.1 account for ~70 rule
occurrences alone:
- `#webSearchToggleBtnMain.home-ask-web-toggle` 21x
- `#homeModeMenu.home-mode-menu` 17x
- `#searchBox.home-ask-composer` 16x
- `.home-ask-stage` 15x

**Inverted preference for the intro/login surface** (banners 81-88):
the `.intro-*`, `.scrap-*`, `.proof-*` rules in
`app/css/inline-styles.css` are the canonical source; the style.css
copies are duplicates. Prefer keeping inline-styles.css and deleting
style.css copies — opposite to the rest of the strategy. Threshold
for this surface stays at 0.5% per plan §3 (animated noise from
`aquarius-glow`, `text-gradient-aurora`).

### 3d. PR #20c — RUNTIME-INJECTED CSS OVERRIDE banner deletion

**What:** Delete the L33581 and L43149 "RUNTIME-INJECTED CSS OVERRIDE"
banners that the plan decision #5 marked for removal in #20c.

**Why deferred from PR #20c Pass 1:** After PR #22 moved the runtime
`<style>` blocks to a static `<link>` (`runtime-collapsed.css`), the
banners may still be load-bearing via specificity (doubled-ID
`#x#x` selectors give ~6-ID specificity vs ~2-ID in
runtime-collapsed.css). Per-property cascade analysis required to
confirm they're truly obsolete vs still defending against
runtime-collapsed.css overrides on the same properties.

**Entry point:** for each banner, list every property it sets, then
grep `runtime-collapsed.css` for any rule that sets the same property
on a selector that would match the same element. Where there's
overlap, the banner is load-bearing and stays. Where there isn't,
the banner can be deleted.

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

## 6. Cumulative Phase 3 delivery (this session)

| PR  | Title                                      | Net lines |
| --- | ------------------------------------------ | --------- |
| #21 (PR #38) | hydrateInteractiveDemos split    | −2,894 in `app/app.js`; +19 family modules |
| —   | Visual-diff baseline refresh + 3 views     | tooling   |
| #22 (PR #39) | runtime inject*Styles → static CSS link | −2,111 in `app/app.js`; +1 CSS file |
| #20a (PR #40) | lesson + lecture orphan deletes  | −131 in `app/style.css` |
| #20b (PR #41) | preference + MN orphan strips    | −14 in `app/style.css` |
| #20c (PR #42) | mistake-draft-actions orphan delete | −20 in `app/style.css` |

`app/app.js`: **14,434 → 9,428 lines (−5,005, −34.7%)**.
`app/style.css`: **44,845 → 44,680 lines (−165)**.

The Phase 3 JS work is structurally complete. The CSS work landed Pass
1 across all 3 sub-PRs; Pass 2 is the next-session focus.

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
