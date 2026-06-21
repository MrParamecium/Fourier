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

## 3. PR #20a/b/c Pass 2 follow-ups (the bulk of the deferred work)

The original plan §6 target for PR #20 was **~5,600 net lines deleted**
across 3 sub-PRs. Pass 1 work shipped delivered **165 lines** (#20a 131 +
#20b 14 + #20c 20). The remaining **~5,400 lines** are in Pass 2
work that requires per-property override-chain analysis.

### 3a. PR #20a Pass 2 — lesson + lecture surface override collapse

**What:** Per plan §6.2 Pass 2, for each top-21 duplicated selector
inside style.css L33346-35958 (post-PR adjusted range):
1. Read every override of the selector top-to-bottom.
2. Compute the effective final declaration per property (last
   `!important` value per property wins — all overrides use `!important`).
3. Move the collapsed rule UP to the first banner where the selector
   appears.
4. Delete the now-redundant later passes.

Plan target: ~1,200 lines net delete.

**Why deferred:** The plan acknowledges this is the riskiest sub-step:
the 9-view visual-diff harness covers only the default state of each
view (no exhaustive hover / focus / disabled / narrow-viewport
combinatorics). A naive "consolidate at first declaration site"
LOSES property overrides if a later banner re-declares only a subset
of properties. Per-property timeline construction is mandatory.

**Entry point:** identify the duplicated selectors first
(`grep -oE '^[#\.][^{,]+,?\s*$' app/style.css | sort | uniq -c | sort -rn`
filtered to the #20a range). Build a per-selector property-timeline
table before any edit.

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
