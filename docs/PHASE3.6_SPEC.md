# Phase 3.6 — CSS structural collapse (`!important` wall + doubled-ID pattern)

Owner: FlyM1ss
Drafted: 2026-06-24 (AFK overnight session)
Companion to `docs/REFACTOR_PLAN.md` ("The right sequence from here", step 3) and
`docs/phase3_deferred.md` (§12 entry + §3d cross-file finding).

This spec is grounded in a 6-agent inventory workflow (read-only, ~419k tokens)
that parsed all four loaded stylesheets in cascade order, classified every
doubled-ID and `!important` declaration, and stress-tested the `@layer`
alternative. Numbers below are grep/cascade-resolver verified; treat per-surface
percentages as planning-grade, not per-line ground truth.

## 0. Problem statement

`app/style.css` is 42,991 lines carrying **14,948 `!important` lines**
(34,172 declaration-instances) and **608 doubled-ID `#X#X` selectors**
(353 `#learnView#learnView`, plus 91 tripled `#X#X#X`). `app/css/runtime-collapsed.css`
(loaded LAST) carries **1,158 `!important`** and **58 doubled-IDs** of its own.

These are not random cruft. They are the residue of two mechanisms:

1. **Iterative "FINAL / EOF / LOCK" tuning passes** that piled identical-specificity
   `!important` overrides without removing the old ones (e.g. `.learn-explain-toggle-btn`
   `height` is redeclared **11 times at the same (0,1,0) specificity** — only the last
   wins; the other 10 are dead).
2. **A cross-file specificity arms race.** Because there is no build step and no
   `@layer`, and `runtime-collapsed.css` loads *after* `style.css` (so it wins ties),
   `style.css` multiplies IDs (`#learnView#learnView#learnView` = 12-ID selectors) to
   out-specify `runtime-collapsed.css`'s own doubled-ID rules that set **different
   values on the same selectors**. This is the §3d finding, now quantified.

The goal: collapse both with **zero visual regression**, verified by computed-style
probes (pixel-diff has documented blindspots — see §4).

## 1. Strategy decision — hand-collapse surface-by-surface; `@layer` is a TRAP (now)

**Recommended: hand-collapse one surface per change, NOT a `@layer` migration.**

`@layer` cannot dissolve the arms race while the `!important` wall stands, because
**`!important` inverts layer precedence**: for important declarations the *earliest/
lowest* layer wins (the opposite of normal declarations), and unlayered `!important`
loses to every layer's `!important`. The §3d wars are `!important`-vs-`!important`
specificity tie-breaks, so:

- `@layer runtime, base` (intent: style.css wins) → for `!important`, runtime (lower)
  now wins → **exact inversion of intent; every doubled-ID win flips.**
- `@layer base, runtime` → base's *normal* declarations lose to runtime's normal
  declarations and to Tailwind utilities.
- No single ordering satisfies both important-conflicts and normal-conflicts; the two
  precedence rules run in opposite directions.

**Tailwind landmine:** `app/index.html` L14 loads the Tailwind CDN *runtime JIT* (not a
compiled sheet); it injects an **unlayered** `<style>` after the `<link>`s. Unlayered
normal declarations beat every layer's normal declarations, so moving `style.css` into
any layer flips 646 utility-class sites — a wide blast radius squarely in the pixel-diff
blindspot.

**Dependency ordering (hard prerequisites):** (1) remove `!important` per surface,
reconciling the style.css block and runtime-collapsed.css block into one source of
truth; (2) drop the now-unneeded ID multiplication; (3) *only if* `@layer` is ever
attempted — first replace the runtime Tailwind CDN with a compiled, layerable build.
By the time `!important` is gone, the doubled-ID weapon is obsolete on its own, so
`@layer` is at best a late-phase anti-regression guardrail with little left to fix.

`@layer` browser support is NOT the blocker (Baseline 2022, evergreen Chromium target).

## 2. Savings estimate (planning-grade)

| Metric | Total | Safely collapsible | Load-bearing |
|---|---|---|---|
| doubled-ID tokens (style.css) | 608 (549 learn + 59 non-learn) | ~429/549 learn (~78%) + most non-learn | ~120/549 learn (~22%) + all 58 runtime |
| tripled-ID `#learnView×3` | 49 | reduce to single/double | (within the 120) |
| `!important` decl-instances | 34,172 | 7,833 NOCOMP (23%) safe-in-isolation + much of 18,734 LOSES (55%) as whole-rule deletes | 6,986 DEFENSIVE (20%) |

**Line savings caveat:** doubled-ID collapse is ~0 net lines (selector text shrinks,
rules stay). The real line reduction comes from deleting `DROPPABLE_LOSES` dead rules
(the 10-of-11 toggle-height pileup pattern), which dovetails with the §3c.i
shadow-removal series. **Progress here is measured in `!important`-count and
doubled-ID-count reduction, not primarily line count.**

## 3. Surface execution order (safest-first)

Scope every edit **by selector token** (`#courseTrackerView`, `mistake-*`,
`#textbookFocusModal`), **NEVER by banner line range** — several banner spans are
mislabeled and physically interleave unrelated rules (e.g. the `#mistakeNotebookView`
span L14218-18292 interleaves learn-collapsed rules).

### Pilot 0 — `#textbookFocusModal` (FIRST; proves the technique, near-zero risk)
- 32 doubled-IDs in "TEXTBOOK FOCUS GLASS LOCK" (`style.css` L41720-41978), all `!important`.
- **Cross-file competitor: NONE** (grep-verified ZERO in runtime-collapsed.css /
  ui-friction-v123.css / inline-styles.css). No §3d war here.
- **Two within-file load-bearing constraints:**
  1. Page indicator (L41944/L41963/L41964): doubled-ID `!important` at (0,4,0) must
     out-rank the single-ID `!important` "paper-tag" multi-surface rule at L23398/
     L23441/L23461 (0,1,0). Flatten only to `#textbookFocusModal #textbookFocusPageIndicator`
     (0,2,0) — still beats (0,1,0); do NOT flatten to bare ID (ties, then loses on source order).
  2. All other 29 rules win over Block-1 base **class** rules (L3115-3332, no `!important`)
     **purely via the `!important` flag** — the ID-doubling is decorative there.
- **Transform:** Step 1 — de-double the 29 non-indicator rules (`#textbookFocusModal#textbookFocusModal`
  → `#textbookFocusModal`; `.class#id` → `#id`), **keep every `!important`**. Step 2 —
  page-indicator to the 0-2-0 minimum-safe form.
- **Verify:** css-probe state S12 (panel un-hidden + toggle `.is-open`) asserts page-indicator
  bg is glass radial-gradient (not paper `#fff8dd`), `#textbookFocusQaPanel` border-radius
  `24px` + glass bg, toggle width per breakpoint. View 23 pixel-diff as catch-all.
- **Expected line delta ≈ 0.** Removes 32 doubled-IDs.

### Surfaces 1-3 — DOM-isolated views (best `!important`-removal pilots)
| Surface | decl-instances | NOCOMP-safe | DEFENSIVE | Note |
|---|---|---|---|---|
| `#courseTrackerView` | 342 | 74.9% | 10.5% | lowest blast radius — best `!important` pilot |
| `#preferenceView` | 381 | 69.8% | 12.9% | same isolation profile |
| `#mistakeNotebookView` | 974 | 45.7% | 20.1% | **mislabeled banner span; scope by token only** |

Transform: strip `!important` from the NOCOMP decls; de-double the `#XView#XView`
prefixes. Verify: per-surface css-probe state opening the view, probing **every property
touched by a stripped `!important`** (not just the visible pixel), plus the existing
pixel view as layout catch-all.

### Surface 4 — settings / sidebar (moderate; verify per-property)
settings 585 (39.8% safe); sidebar 1,291 (44.2% safe) — but sidebar shares
`.app .sidebar …` chains with many surfaces; do not assume isolation.

### Surface 5 — GRATUITOUS / UNIFORM-FLOOR doubled-ID families (zero runtime competitor)
Within-style.css ladders, grep-verified zero runtime-collapsed.css competitor; safe
transform `#X#X(#X) → #X` because the doubled rule is later in source order.
**Collapse each whole family in one change** to preserve the winner.
- Page-corner / page-turner (GRATUITOUS, ~99 tokens): L33442-33498, L35840-36060,
  L37477-37581, L36042 (only `#learnView` doubled; classes target; pill skin L24142
  already crushed; corner DOM index.html L694-699, siblings of `#learnExplainScroll`).
- lesson-test-banner / key-takeaways / lecture-note-card (UNIFORM-FLOOR, ~128): DBL
  L38201-38985 + TRP L41429-41586; border-radius winner L41508.
- learn-topbar / close / title / toolbar / btnLectureView (~25): L34085-34320.
- textbook-active explain/book/bottomRail/scroll/content (~133): L33946-34060,
  L34606-34660, L34749-34965, L38201-38284 — **keep distinct-depth-5 floor** (singles
  at L24098/L26953 are earlier at equal depth; do NOT reduce to class-only).
- panel-normal (~12): L42959-42990.

### Surface 6 — learn-view §3d composer chain (LAST; cross-file LOCKSTEP, mandatory)
The only region where runtime-collapsed.css sets DIFFERENT values on the SAME selectors.
Transform each war-pair in lockstep, preserving the invariant
**style.css effective specificity > runtime-collapsed effective specificity**
(runtime loads last). ~120 learn-target load-bearing tokens + all 58 runtime tokens.
1. **Followup-bar geometry:** `style.css` L41334 (**12 IDs**; width `calc(100%-36px)`,
   min-height `152px`, border-radius `28px`, pink glass) ↔ `runtime-collapsed.css` L1976
   (**8 IDs**; width `min(820px,…)`, min-height `112px`, border-radius `18px`, white
   glass). *(Correction to §3d L1024: live source is 12-vs-8 IDs, not "tripled vs 8-ID.")*
   Distinct depth is 4 on both sides — repetition is the ONLY thing making style.css win;
   collapsing to plain depth-4 ties → runtime wins on source order → 8+ props regress.
2. **Followup-bar z-index/overflow:** L33213 (8-ID, `z-index:40; overflow:visible`) ↔
   runtime L1634 (`z-index:3`). Its bg/border are DEAD (superseded by L41334); z-index/
   overflow are live, must stay > runtime's 3-ID.
3. **`#learnChatCol` background (within-file; CORRECTS §3d):** L33191 (6-ID radial-gradient)
   is **DEAD** — beaten by L37417 (6-ID flat `var(--theme-page-surface-soft)`, later
   source). Live pair is **L33191 ↔ L37417**; de-double TOGETHER to equal depth preserving
   L37417-after-L33191 order, else the radial-gradient resurfaces.
4. **`#learnModeMenu` position:** L33238 (8-ID + class, `right:66px`) ↔ runtime L1790
   (2,1,0, `right:58px`). Reducible to depth-3-single `#learnView #learnChatCol
   #learnModeMenu.edu-mode-menu` (3,1,0) — beats (2,1,0) — but NOT to class-only.
5. **`#learnChatEmptyState` transform (runtime-internal):** runtime L2036 (DBL,
   `translateY(clamp(38px,5.2vh,62px))`) beats style.css L33057 (single, 18px). De-doubling
   runtime here surfaces the 18px value.

## 4. Verification protocol — `tools/css-probe.js`

### 4.0 Why pixel-diff alone is insufficient
- **Off-screen/clipped chrome:** `page.screenshot({fullPage:false})` clips to 1280×800;
  the §3a.i regression (PR #71) painted outside the captured region and passed at
  0/1024000 px through two `--check` runs.
- **Sub-threshold property swaps:** a cascade flip (`min-height:152→112`,
  `radial-gradient→flat`) can dirty fewer pixels than even the 0.05% strict threshold
  when the element is clipped or the delta is low-contrast alpha-on-glass.
- The harness already encodes the mitigation (views 12b-12e/14d-14f read literal
  `getComputedStyle` and assert exact-string equality). This generalizes it.

### 4.1 Mechanism
Standalone `tools/css-probe.js` mirroring `visual-diff.js`'s `--baseline`/`--check`
lifecycle; output is a JSON snapshot diff, not PNG. Artifacts:
`tools/css-probe-baseline.json` (committed proof artifact) + `tools/css-probe-report.md`
(written by `--check`). Reuses `tools/test-utils.js` helpers verbatim (`enterGuestMode`,
`openSubtopic`, `resetLessonChromeState`, `settleLesson`, `assertOrThrow`,
`maskLessonSidebar`, `MASK_CSS`) and spawns its own bridge subprocess like visual-diff.js.

Data structure: `PROBE_STATES = [{ state, enter(page), probes: [[selector, pseudo, property], …] }]`.
Each `enter()` MUST **assert-as-entered** — prove the gated rule actually matches (e.g.
`panelFocus==='qa-wide'` AND chat not collapsed AND `#learnChatCol` display ≠ none) —
before snapshotting, or the probe reads an inactive rule and proves nothing.

Snapshot: `getComputedStyle(el, pseudo).getPropertyValue(prop)` for every tuple; missing
element → `__MISSING__`. `--baseline` writes the snapshot (commit BEFORE touching CSS);
`--check` compares **byte-identical**, exits 1 on any string diff or `__MISSING__`,
reporting `(state, selector, property, before → after)`.

Why it beats pixel-diff: (1) no clipping — reads resolved value regardless of viewport;
(2) pseudo-element coverage (`::before`/`::after` glass overlays invisible to pixelmatch);
(3) `calc()`/`min()` resolve to different px at 1280-width — exactly what distinguishes
the 12-ID winner (`calc(100%-36px)`) from the 8-ID one (`min(820px,…)`); (4) self-documenting
cascade contract.

Do NOT add `--check` to `npm run check` (spawns bridge + Chromium, ~30s); keep it a manual
pre-merge gate like `visual-diff`. For `:focus-within` animation states, freeze with
`* { animation: none !important }` before snapshot OR probe `animation-name` (stable string).

### 4.2 State matrix (doubled-ID rules are state-gated by classes on `#learnBody`)
| # | State | How to enter | Existing pixel view |
|---|---|---|---|
| S1/S8 | resting lesson (chat-collapsed) | open §1.1-1 non-overview | 06 |
| S2 | `data-panel-focus="qa-wide"` | set `learnBody.dataset.panelFocus='qa-wide'`, remove `chat-collapsed`, dispatch resize | 08 |
| S3 | `data-panel-focus="qa-full"` | `panelFocus='qa-full'` | 09 |
| S4 | normal + chat visible (§3d radial war) | `panelFocus='normal'` + remove `chat-collapsed` | NEW |
| S5 | `#learnFollowupBar:focus-within` | focus `.input-field` in S2/S3 | 09 (partial) |
| S6 | empty-state (not chat-active) | S2/S3, `#learnChatCol` NOT `.is-chat-active` | NEW |
| S7 | empty-state hidden (is-chat-active) | toggle `#learnChatCol.is-chat-active` | NEW |
| S9 | explain-collapsed (not chat-collapsed) | add `explain-collapsed`, remove `chat-collapsed` | NEW |
| S10 | chapter-overview-active | add `chapter-overview-active` | 15 |
| S11 | chapter-overview-split-active | add `chapter-overview-split-active` | 16 |
| S12 | textbook-focus modal | `#textbookFocusModal` remove `.hidden` + body `textbook-focus-active`; un-hide QA panel + toggle `.is-open` for the pilot | 23 |

State-setting code: `app.js` L2686-2738 (`openLearnMode`/`applyLearnPanelFocusState`),
L3990-3992 (`is-chat-active` toggle). DOM IDs: `index.html` L655/674/713/732/760/1495.

### 4.3 Highest-priority probe tuples (S2/S3/S4 §3d core)
- `#learnChatCol`: **`background-image`** (3-layer radial+linear vs `var(--theme-page-surface-soft)`),
  `background-color`, `isolation`, `overflow`, `border-radius`, `box-shadow`.
- `#learnFollowupBar`: **`width`** (resolved px), **`min-height`** (152 vs 112),
  **`border-top-left-radius`** (28 vs 18), `border-top-color`, `background-image`,
  `box-shadow`, `backdrop-filter`/`-webkit-backdrop-filter`, `margin`, `padding`, `z-index`, `overflow`.
- `#learnFollowupBar::before` / `::after`: `content`, `display`, `opacity`,
  `background-image`, `transform` (`::after` `rotate(-12deg)`).
- `#learnFollowupBar .input-wrapper`: `grid-template-columns`, `min-height`, `gap`.
- `#learnFollowupBar .input-field`: `min-height`, `font-size`, `font-weight`.

### 4.4 Sequencing
Run `css-probe --baseline` + `visual-diff --baseline` together, commit both, THEN branch.
After each collapse commit run BOTH `--check`s: css-probe is the load-bearing gate for the
§3d surfaces; visual-diff is the catch-all for layout/positioning (complementary:
property-identity + spatial-identity).

## 5. Risk register

| # | Risk | Pixel-diff blind? | Mitigation |
|---|---|---|---|
| R1 | Collapsing L41334 (12-ID) below runtime L1976 (8-ID) ties → runtime wins → 8+ followup-bar props regress | yes (clipped / sub-threshold) | css-probe S2/S3 byte-identical on width(px)/min-height/border-radius/bg/backdrop-filter — MANDATORY |
| R2 | `@layer` migration inverts `!important` + flips 646 Tailwind sites | yes (cross-cutting) | do NOT migrate now (§1) |
| R3 | Stripping a DEFENSIVE `!important` in isolation regresses panel sizing | maybe | only de-`!important` when competitor removed same step; probe every touched property |
| R4 | textbook page-indicator flattened to bare ID ties paper-tag → glass→paper regression | partial (panel `.hidden`) | keep ≥ 0-2-0; css-probe with panel un-hidden + toggle `.is-open` |
| R5 | Editing `#mistakeNotebookView` by LINE RANGE corrupts interleaved learn-collapsed rules | n/a (edit error) | scope ALL edits by selector token, never by line range |
| R6 | Pseudo-element glass overlay lost | yes | css-probe `::before`/`::after` content/opacity/bg/transform |
| R7 | Off-screen paint passes at 0px (§3a.i precedent) | yes | css-probe reads resolved value regardless of viewport |
| R8 | css-probe taken in wrong state reads inactive rule | n/a (false-confidence) | `enter()` MUST assert-as-entered |
| R9 | Within-file DEAD rule (L33191) assumed live; de-doubling resurfaces it | maybe | co-transform DEAD/live pairs (L33191↔L37417) preserving order |
| R10 | `/code-review` gives inverted-cascade false-positives | n/a | css-probe is load-bearing, not the reviewer's verdict |

## 6. Execution plan + status

**AFK constraint (FlyM1ss, 2026-06-24):** the risky cross-file CSS (Surface 6 §3d
lockstep) and the broad `!important` strips must NOT merge to main tonight. Tonight builds
the **verification infrastructure** + executes the provably-safe pilot, all on a branch.
Per FlyM1ss: Phase 3.6 ships as ONE massive PR only when COMPLETE; while incomplete it
stays branch-only (no PR).

**Verification harness lands on `main` separately** (test-only, low-risk) so the
pre-collapse baseline is captured against `main` and every future surface verifies against it.

| # | Commit | Where | Risk | Status |
|---|---|---|---|---|
| spec | this document | main (docs) | none | ✅ `1598c6f` |
| H | `tools/css-probe.js` + `css-probe-baseline.json` | main (PR #101) | none (test-only) | ✅ merged `a6c8b5b` (reviewed: 10-agent /code-review caught false-confidence holes, all fixed) |
| 1 | textbook Step 1: de-double 29 non-indicator rules, keep `!important` | branch | provably safe (zero cross-file competitor) | ✅ `bac31d2` — css-probe --check PASS, −32 doubled-IDs |
| 2 | textbook Step 2: page-indicator → 0-2-0 | branch | safe (specificity pre-verified + probe) | ✅ `6f939a2` — PASS, −3 doubled-IDs (textbook = 0 doubled-IDs) |
| 3+ | courseTracker / preference `!important`-NOCOMP strip | branch | needs per-view probe coverage first | ⏸ deferred — see §6.1 |
| 6 | §3d composer chain lockstep | branch (later nights) | high — full css-probe S2-S12 gate | deferred |

Branch: `refactor/phase3.6-css-collapse` (2 commits; **no PR** — Phase 3.6 incomplete).
Doubled-IDs: **608 → 573** (textbook pilot). `!important`: 14,948 (untouched — no `!important` work shipped yet).

## 6.1 Post-pilot finding (2026-06-24) — the textbook pilot was the clean EXCEPTION

The textbook surface had **zero cross-file competitors AND zero within-file `@media`
competitors**, so its 35 doubled-IDs collapsed as a provable no-op (css-probe-verified,
incl. a true-positive negative test: a deliberate 24px→25px regression was correctly
caught). **Every remaining doubled-ID surface is entangled** and is NOT a clean de-double:

- **`#mistakeNotebookView#mistakeNotebookView`** (17, DOM-isolated, zero cross-file): but
  `.mistake-workspace` L34808 (doubled, 0,3,0) has a LATER single-ID competitor at L35745
  (0,2,0) **inside an `@media`**. De-doubling L34808 → (0,2,0) ties L35745, which wins by
  source order at narrow viewports — a regression the 1280px harness **cannot see** (§9c
  blindspot). Other MN targets have 4-8 single-ID/bare competitors each.
- **page-corner / lecture-overlay** (~99, GRATUITOUS bucket): **272 selector lines**, deeply
  nested (`#learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar #lecture*OverlayBtn`),
  multi-state, many `@media`-wrapped. Per-property/per-state/per-viewport analysis required.
- **`#learnView#learnView` core** (353): interleaves the LOAD-BEARING §3d composer chain
  (~120 tokens, Report 1 §4) with safe UNIFORM-FLOOR/GRATUITOUS instances. No global
  `replace_all` is safe.

**Prerequisite for the bulk (next-session entry point):**
1. **Narrow-viewport probe coverage** — add a second BrowserContext at ~800px to `css-probe.js`
   (or a sibling harness) so `@media (max-width:…)` competitors (L35745 etc.) are verifiable.
   This is the §9c-deferred ~150-line task; it is the gate for de-doubling MN + learn-view.
2. **Full S4-S11 state matrix** in css-probe (spec §4.2) before touching the §3d composer chain.
3. **Per-instance cascade classification** of the 573 remaining doubled-IDs (extend the
   inventory workflow to instance granularity) → the exact safe-collapse work-list.
Only the **DOM-isolated single-instance** doubled-IDs (`#courseTrackerView#courseTrackerView`,
`#preferenceView#preferenceView`, `#settingsView#settingsView`, `#feedbackView#feedbackView`
— 1 each) might be quick wins once their view has probe coverage; verify each, do not assume.

## 6.2 Per-instance work-list (instance-classification workflow `wbnwmiwqx`, 2026-06-25)

A 7-agent read-only per-instance classification of 133 doubled-ID selector blocks across 6
surfaces **overturned the §6.1 pessimism**: page-corner is overwhelmingly *over-specified*, not
entangled. **44 blocks are COLLAPSE-SAFE-NOW** (verifiable at 1280/resting with existing harness
views; no competitor wins after reduction).

| Classification | mistake-nb | page-corner | learn-topbar | close-btns | explain-rail | composer-§3d | TOTAL |
|---|--:|--:|--:|--:|--:|--:|--:|
| COLLAPSE-SAFE-NOW | 5 | 27 | 9 | 2 | 0 | 1 | **44** |
| NEEDS-NARROW-VIEWPORT | 6 | 0 | 5 | 0 | 0 | 1 | 12 |
| NEEDS-STATE-MATRIX | 0 | 7 | 0 | 0 | 13 | 8 | 28 |
| NEEDS-NEW-VIEW | 0 | 0 | 1 | 4 | 22 | 2 | 29 |
| LOAD-BEARING (never touch) | 6 | 0 | 6 | 1 | 0 | 7 | 20 |

**COLLAPSE-SAFE-NOW work-list (style.css line numbers):**
- **page-corner (27)** — verified by visual-diff views 06/17/18/21/22; turner-content rests at
  `opacity:0` so **css-probe (computed-style) is mandatory** (pixel-diff blind): L33443, 33474,
  33479, 33484, 33791, 33830, 33836, 33856, 33875, 33879, 33883, 33899, 33905, 33911, 33931,
  33935, 37479, 37505, 37511, 37531, 37539, 37543, 37547, 37553, 37559, 37570, 37574. Drop one
  redundant `#learnView` → (0,2,2,0) still beats the pill skin (0,2,0,0); toolbar-descendant
  rivals never match (buttons are toolbar siblings).
- **learn-topbar (9)** — L34111, 34134, 34151, 34157, 34167, 34189, 34220, 34243, 34253.
  **Skip the LOAD-BEARING atomic groups** L34176-34178 and L34193-34194, and the L34088 member.
- **mistake-notebook (5)** — L34778, 34779, 34797, 34802, 34094 (covered by views 03 + 03b).
- **close-buttons (2)** — L34088 (`#learnClose`), L34089 (`#topbarCloseBtn`). **Line-precise edits
  only** — they share the grouped rule L34088-L34094; **do NOT touch L34091 (feedback) = LOAD-BEARING**
  (border flips to L36596), and the other view lines are NEEDS-NEW-VIEW.
- **composer (1)** — L33233 (`.bottom-actions` z-index/overflow; no competitor on those props).

**LOAD-BEARING — never collapse (cite-and-skip):** mistake-nb L34770/34784/34816/34820/34826/34831;
learn-topbar L34088/34176-34178/34193-34194; close-btns L34091 (feedback→L36596); composer
L33191/33192/33213-33216/33238/37415/37416/37423-37426 (the §3d runtime-collapsed.css war).

**Coverage roadmap for blocked tranches:**
- **Tranche A (narrow-viewport, 12):** add ≤1180px probe (unblocks MN 34808/34838/34842 + composer
  33277) and ≤820px probe (unblocks MN 34848/34849/34853 + topbar 34297/34302/34303/34307/34311).
- **Tranche B (state-matrix, 28-30):** a **`.learn-textbook-active` css-probe state** is the single
  biggest unlock (13 explain-rail rules); plus S10/S11 chapter-overview, `.is-chat-active`, and
  `[data-custom-split]`/`.panel-normal` states for the composer.
- **Tranche C (new-view + dead-code, 29):** settings/preference/courseTracker view bootstraps (3
  close-btns); open mode-menu (2 composer). **DEAD-CODE TRIAGE (22):** L33949-33952, 34752-34755,
  34899-34902, 34929-34934, 38204-38207 target `#learnLecturePageIndicator`/`#learnExplainBottomRail`/
  `#learnToolbarPagination` — IDs that exist in **NO HTML/JS** (only `#learnFocusPageIndicator` is
  real). These are dead-CSS DELETION candidates (big line reduction), not collapse — confirm against
  DOM, then delete whole chains.

**Recommended order:** (1) page-corner 27 — highest value/lowest risk; (2) learn-topbar 9;
(3) mistake-nb 5; (4) close-btns 2 + composer 1; (5) narrow-viewport probes → Tranche A;
(6) textbook-mode state → Tranche B; (7) dead-code triage of the 22; (8) isolated-view bootstraps.

## 6.3 Branch progress (refactor/phase3.6-css-collapse, 2026-06-24/25)

Doubled-IDs: **608 → 515** (textbook 35 + page-corner 58). All double-verified
(css-probe byte-identical + visual-diff 36 views all green, incl. the `opacity:0`
turner-content via css-probe state S-page-corner).

| Commit | Tranche | Δ doubled-IDs | Verification |
|---|---|---|---|
| `bac31d2` + `6f939a2` | textbook (Pilot 0) | −35 (608→573) | css-probe S12 + negative-tested gate |
| `7fc0350` | page-corner (§6.2 #1) | −58 (573→515) | css-probe S-page-corner + visual-diff 06/17/18/21/22 @ 0.000% |

css-probe states on the branch: S2/S3 (§3d baseline), **S-page-corner** (NEW), S12.

**Next clean tranches (no new infra):** learn-topbar 9 (line-precise — skip LOAD-BEARING
groups L34176-34178, L34193-34194, L34088), MN 5 (add an MN-open-case probe state à la
visual-diff view 03b), close-btns 2 + composer 1 (add probes).

### 6.3a — VERIFIED dead-CSS tranche (highest line-value; the only line-reducing one)

Grep-confirmed 2026-06-25 that three IDs are **renamed-away orphans** — `0` references in
`app/index.html` and `0` across all `app/**/*.js` (vs the real `#learnFocusPageIndicator` =
1 + 3):
- `#learnLecturePageIndicator` — 79 selector-lines in style.css, 0 in runtime-collapsed.
- `#learnExplainBottomRail` — 86 selector-lines in style.css, 0 in runtime-collapsed.
- `#learnToolbarPagination` — 90 selector-lines in style.css, **31 in runtime-collapsed.css**.

≈255 style.css lines + 31 runtime-collapsed lines of **dead CSS** (refactor-plan rule #1:
delete unused directly). Unlike doubled-ID collapse (line-neutral), this REDUCES line count.
**Execution care:** delete whole rules where the dead ID is the sole selector; for GROUPED
selectors, remove ONLY the dead arm (some group with the live `#learnFocusPageIndicator` /
other live selectors — deleting a live arm regresses real chrome). **Verifiable**: the live
`#learnFocusPageIndicator` is covered by lesson views 06/08, so visual-diff --check (0.000%)
confirms no live arm was clipped. Recommended as the next high-value tranche.

## References
- `docs/REFACTOR_PLAN.md` — "The right sequence from here" (step 3 = this spec).
- `docs/phase3_deferred.md` §12 (entry), §3d (cross-file finding, with corrections folded in here).
- Inventory workflow transcript: 6-agent run `wf_99113351-aac`.
- §3d banners: `style.css` L33190-33280 (chatCol/followup 6-ID), L41333-41427 (followup 12-ID).
- Competitors: `runtime-collapsed.css` L1430-1451, L1629-1653, L1976-2002, L2034-2059.
