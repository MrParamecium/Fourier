# Refactor — Definition of Done

Owner: FlyM1ss
Drafted: 2026-06-25
Companion + finish-line doc for `docs/REFACTOR_PLAN.md` (canonical history) and
`docs/PHASE3.6_SPEC.md` (CSS-collapse protocol). This document answers one
question: **what must be true to call the refactor finished, and what is the
shortest verified path to get there.**

It is grounded in a 6-agent read-only verification sweep (workflow `w5rd3xio0`,
2026-06-25) that re-counted every CSS surface, mapped the live `app.js`
extraction seams, confirmed the three "landmines" against current line numbers,
re-verified the six carry-forward demo bugs, inventoried the harness gaps, and
established the exact branch/PR state. Numbers below are grep/cascade-resolver
verified; treat per-surface `!important` figures as planning-grade.

The refactor "can go on forever." This doc draws the line at a state that
**re-organizes the project into a maintainable shape for at least a couple
months of dev**: the `!important`/doubled-ID CSS wall brought down to its
irreducible load-bearing floor, `app.js` reasonably split (~5K), and the loose
correctness threads tied off — with everything else parked in a clean,
triaged backlog.

---

> ## 🔄 RECONCILED 2026-06-27 (git HEAD `2d7a757` = origin/main)
>
> This doc's §1 checklist + §3 workstreams stay valid; only counts/status move since the 2026-06-25 draft:
> - **#118** (`2d7a757`) shipped a **partial** feedback+sidebar strip (feedback 528→472, sidebar 656→620) — so **A1 and A3 are STARTED, not complete**; A1 is no longer "the next untouched target."
> - **Workstream B is COMPLETE** — B4 (`app/lesson-render.js`) shipped in **#116**; `app/app.js` = **5,720** lines (marginally above the ~5,100 stretch target; "reasonably split" met). The §1 `app.js` box can be checked.
> - **Landmine C1** (unclosed `.learn-followup-bar {` brace, §C1) shipped in **#111** (`bd56ef9`). **C2** (panelFocus desync) **MERGED as #120 (`4d7b47b`)** — probe-neutral, baseline unchanged (see §C2). A4's C2 prerequisite is met; the S4–S11 composer-state harness (A4's second gate) **MERGED as #122 (`b3086c6`)** and the S13 `.learn-textbook-active` Band-1 probe **MERGED as #123 (`62ddf06`)** — A4's composer-state matrix is in place (S5 dropped as non-constructible, S1/S8 deferred; **S14 Band-2 dropped = named no-css-probe-witness gap**; see §A0).
> - Current metrics (supersede §2's 06-25 table): `app/style.css` **32,279** lines / **9,286** `!important`-lines / **402** doubled-IDs (A2 warm-up **#124** `3b4d7d8` de-doubled `.mistake-workspace` ×2, 404→402; N=2 de-doubled / M=10 MN-band proven-DEFENSIVE-kept); `runtime-collapsed.css` **1,523** / **876** / **58**.
> - §2 per-view dispositions are git-CONFIRMED (per-view trajectory in `PHASE3.6_SPEC.md` top STATUS block): settings & MN were ✅ stripped by #106 — **do not re-seed them**. A1 `#feedbackView` is now DONE (#119 guard + measured floor). **Genuinely-next = close the S14 Band-2 witness gap, then A4** (collapse-and-merge the §3d composer cluster vs `runtime-collapsed.css` — NOT piecemeal de-double).

---

## 0. Scope decisions (locked 2026-06-25 with FlyM1ss)

| # | Decision | Choice |
|---|---|---|
| 1 | CSS-collapse "done" line | **Full Phase 3.6** — the entire `!important` wall + all doubled-IDs + `.app .sidebar` + the §3d composer chain. The harness infra gates are therefore **in scope** (hard prerequisites, not optional). |
| 2 | `app.js` split target | **~5K** via the named seams (verified as **5** seams, see §3 Workstream B). |
| 3 | DB migration (Phase 4) | **Out of scope** — first item *after* DONE; needs its own design conversation. |
| 4 | Standalone landmines | **In scope** (small dedicated PRs). |
| 5 | Carry-forward demo bugs | **Out of scope** — fixed *after* refactor (one PR per module). |

> **Framing change (verified):** Phase 3.6 is **no longer "one big PR when
> complete."** PRs #101, #104, #105, #106 already merged to `origin/main`
> incrementally, each gated by the cascade arbiter + probe harness. Continue
> that pattern — ship one reviewed, individually-gated PR per surface. The
> AFK "branch-only until complete" constraint in `PHASE3.6_SPEC.md §6` is
> **superseded**.

---

## 1. Definition of DONE (the exit checklist)

The refactor is **DONE** when every box below is checked. CSS completion is
defined by **surface disposition**, not a magic line/`!important` target —
because de-doubling is ~0 net lines by design and the residual `!important`
floor *is* the load-bearing set we intend to keep.

### CSS structural collapse (Full Phase 3.6)
- [ ] **`#feedbackView`** — non-load-bearing `!important` stripped, arbiter-verified against a seeded multi-tone feedback fixture (§A1).
- [ ] **`.app .sidebar`** — non-load-bearing `!important` stripped, verified under multi-view + sidebar-collapsed-state probe coverage (§A3).
- [ ] **§3d composer chain** — the five cross-file war-pairs reconciled in lockstep; css-probe states S2–S12 byte-identical; the invariant *style.css effective specificity > runtime-collapsed effective specificity* preserved on every pair (§A4).
- [ ] **Doubled-ID inventory fully dispositioned** — every instance in `PHASE3.6_SPEC.md §6.2` is either collapsed (COLLAPSE-SAFE-NOW / NEEDS-NARROW / NEEDS-STATE / NEEDS-NEW-VIEW under its probe) or explicitly retained as one of the **20 LOAD-BEARING** "cite-and-skip" rules. Residual doubled-IDs == only that documented floor.
- [ ] **Media-gated dead-redeclaration slice** (78 style + 6 runtime) deleted under narrow/`@container` probe coverage, or documented as provably unreachable (§A5).
- [ ] **Both harnesses green at the full matrix** — `css-probe --check` and `visual-diff --check` pass across S1–S12 + N0–N4; pre-collapse baselines committed on `main`.

### `app.js` split
- [ ] **`app/app.js` ≤ ~5,100 lines** via the 5 seams in §B; `npm run check` green and 35-view `visual-diff` green per PR.

### Landmines (correctness)
- [ ] **Unclosed `.learn-followup-bar {` brace** (style.css L5464) resolved — dead block deleted, render-neutrality verified (§C1).
- [ ] **css-probe S2/S3 `panelFocus` desync** fixed — state driven through `applyLearnPanelFocusState()` rather than hand-poking the attribute (§C2; also unblocks the §3d composer probes).

### Bookkeeping
- [ ] `docs/REFACTOR_PLAN.md` status header updated to "refactor complete."
- [ ] `docs/phase3_deferred.md` pruned to only the **post-refactor backlog** enumerated in §4 of this doc.

---

## 2. Where we are now (verified 2026-06-25, `HEAD` == `origin/main`)

| File | Lines | `!important` | Doubled-ID `#X#X` |
|---|---:|---:|---:|
| `app/style.css` | 33,328 | 9,884 occ (9,694 lines) | 404 (`#learnView#learnView` = 246) |
| `app/css/runtime-collapsed.css` | 1,602 | 888 | — |
| `app/app.js` | 8,339 | — | — |
| `app/ws-bridge.js` | 5,348 | — | — |
| `app/index.html` | 1,655 | — | — |

> Methodology: `wc -l`, `grep -o '!important'` (occurrences) / `grep -c`
> (lines), `grep -oE '#id#id'`. Counts are methodology-sensitive — **always
> re-grep before quoting in a PR.**

**Per-surface `!important` (block-aware proxy, planning-grade):**

| Surface | style.css | Isolation | Disposition |
|---|---:|---|---|
| `#learnView` (core) | ~3,410 | shared (cross-file arms race) | mixed — §3d + doubled-ID tranches |
| `.app .sidebar` | ~639 | **shared** (syllabus tree + learn-collapsed layout) | **A3 — remaining** |
| `#feedbackView` | ~503 | isolated | **A1 — remaining (next)** |
| `#mistakeNotebookView` | ~237 | isolated | ✅ stripped −193 (#106) |
| `#settingsView` | ~64 | isolated | ✅ stripped −21 (#106) |
| `#courseTrackerView` | ~52 | isolated | ✅ stripped −384 CT+pref (#106) |
| `#preferenceView` | ~40 | isolated | ✅ (bundled above) |
| runtime `#learnFollowupBar` / `#learnChatCol` | 141 / 386 | cross-file | §3d composer (A4) |

**Already shipped on `origin/main` (Phase 3.6 so far):**
- `#101` computed-style `css-probe` harness; `#104` +4 narrow-viewport states (N1–N4).
- `#105` −10k-line collapse (dead-CSS deletion of renamed-away learn-chrome IDs — 6 sweeps, −4,138 lines — + top-level redeclaration-pileup sweep + empty husks).
- `#106` `!important` strip on the four DOM-isolated views (CT/pref/settings/MN = −598) via the `tools/_view-cascade-probe.js` arbiter (108–150 states byte-identical) + visual-diff 35/35.
- Doubled-ID COLLAPSE-SAFE-NOW tranches: page-corner −58, learn-topbar −11, mistake-cards −4, textbook Pilot 0 −35.

**The free-deletion vein (dead CSS) is exhausted** for the lecture/learn-chrome
family. What remains is the cascade-changing grind — every remaining surface
changes cascade *outcomes* and is verified render-neutral only via the
computed-style arbiter, never pixel-diff alone.

> **Already done — do NOT re-mine** (these appear "open" in older session
> summaries but `REFACTOR_PLAN.md` confirms them shipped): Phase 2 **#18**
> (interactive-demos subsystem → `app/interactive-demos/` family modules,
> −1,042 lines) and **#19** (Glass + chapter-overview CSS, PRs #63–#68) are
> **complete**. They are not part of any workstream below.

---

## 3. The remaining work

Three workstreams. **A (CSS)** is the long pole and is internally sequential.
**B (`app.js`)** runs fully in parallel — it never touches the cascade.
**C (landmines)** are independent small PRs.

### Workstream A — CSS structural collapse to completion (Full Phase 3.6)

The critical path is **harness infra → isolated strip → entangled strip →
composer last**, because pixel-diff is provably blind on these surfaces (the
PR #71 regression painted outside the 1280×800 capture and passed at
0/1,024,000 px *twice*).

#### A0 — Harness prerequisites (build these first; they gate A1–A5)

These are test-only, low-risk, and land on `main` separately so every surface
verifies against a `main` baseline. Source of truth: `PHASE3.6_SPEC.md §4`.

| Gate | What | Unblocks |
|---|---|---|
| Feedback probe state + fixture | A `css-probe` state that opens `#feedbackView` and reads computed style on a **seeded multi-tone feedback-thread fixture** (tone-0..5, is-left/is-right, reply-context, is-target). Mirror visual-diff view 14b's seeding. | **A1** (`#feedbackView` strip — mandatory, pixel-diff is blind here) |
| `css-probe` states S4/S6/S7/S9/S10/S11 | ✅ **SHIPPED (2026-06-28, pending PR; stacked on §C2).** S4 (normal + chat visible), S6 (empty-state not chat-active), S7 (is-chat-active), S9 (explain-collapsed), S10 (chapter-overview-active), S11 (chapter-overview-split-active) — each drives the **real** production fn (`openLearnQaSidebar` / `applyLearnPanelFocusState` / `updateLearnChatEmptyState` / `applyLearnExplainCollapsedState` / `setChapterOverviewLayoutActive`) + fail-closed winner sentinel, sentinels derived empirically. **S5 (`:focus-within`) DROPPED** — focus engages and `:focus-within` matches but every focus-within decl loses to the `!important` wall (no constructible winner → would be fail-open; visual-diff view 09 retains pixel cover). **S1/S8 deferred** (view 06 pixel-covers resting). Empirical finding: the §3d composer chrome is **panel-invariant** at desktop (S4≡S2 values), so the new states pin only the cascade each gates. | **A4** (composer chain) — gate now met |
| `panelFocus` desync fix (= §C2) | Drive S2/S3 through `applyLearnPanelFocusState()` (app.js:2725) instead of hand-setting `dataset.panelFocus`; have `resetLessonChromeState` also clear `chat-collapsed`/`explain-collapsed`. | **A4** (correct composer-state capture) |
| Narrow per-selector probes | Extend N0–N4 (currently only 3 learn-chrome selectors on a §1.1-1 DOM) to the home-ask / feedback / login / MN / chapter-overview / settings families; add ≤560px state + an `@container lecture-panel` panel-width driver. | **A2** (narrow tranches) + **A5** (media-gated slice) |

`css-probe` states on the branch today (21): `S2-qa-wide`, `S3-qa-full`,
`S4-normal-chat`, `S6-chat-empty`, `S7-chat-active`, `S9-explain-collapsed`,
`S10-overview-active`, `S11-overview-split`, `S12-textbook-qa-open`,
`S13-textbook-active`, `S-page-corner`, `N0–N4`, `S-feedback-*`. The S4–S11 baseline was captured
**additively** off the §C2 branch (which is itself off pre-collapse `main`):
`git diff css-probe-baseline.json` = +264/−0, every pre-existing key byte-identical.
**`S13-textbook-active` SHIPPED (2026-06-28, pending PR)** — drives the real `_setLearnMode('textbook')`
with `_learnLayoutMode='lesson'`; fail-closed sentinel = `#learnExplainScroll` Band-1 2-radial gradient
(L25124, empirically ≠ base ≠ overview); additive `+56/−0`. Covers the **7 Band-1 (textbook-normal)
`.learn-textbook-active` doubled-IDs** (L25118–25157). **`S14-textbook-overview` (the 7 Band-2
`.chapter-overview-active.learn-textbook-active` combined-band occurrences, L24575–24609) was DROPPED**
— no fail-closed sentinel constructible (every Band-2 winner used-value-collapses to the overview-alone
fallback, is inline-masked, is also provided by Band-1, or is `__MISSING__`; S5 discipline). **Named
coverage gap:** those 7 Band-2 doubled-IDs carry **no css-probe witness** → A2's Band-2 strip must lean
on visual-diff + a fresh arbiter keep-set. (Corrects earlier "13 explain-rail rules": the measured count
is **14 occurrences in two cascade bands**.)

#### A1 — `#feedbackView` `!important` strip (next target)

**Files:** `app/style.css` (feedbackView token blocks), `tools/_view-cascade-probe.js` (add a feedbackView VIEW with the seeded fixture).
**Shape:** identical to the four shipped isolated-view strips — downgrade only the NOCOMP `!important` decls (no surviving competitor ⇒ render-neutral); keep the load-bearing ones (a base/doubled-ID rule wins once the flag drops). ~503 candidates; strippable fraction unknown until the arbiter runs the fixture (MN came in at 43%, settings 24%, CT/pref ~81%).
**Gate:** the feedback `css-probe` state from A0 (MANDATORY — pixel-diff blindspot) + visual-diff views 14/14b.
**Why next:** cross-file isolated (0 refs in runtime-collapsed/ui-friction/inline), arbiter proven, only needs the fixture. Lowest-risk remaining strip.

#### A2 — Doubled-ID tranches (`PHASE3.6_SPEC.md §6.2` work-list)

De-doubling is ~0 net lines; progress is measured in doubled-ID count. Order
and gating:

| Tranche | Count | Gate | Notes |
|---|---:|---|---|
| Residual COLLAPSE-SAFE-NOW | ~3 | small new probes | close-btns L34088/34089 + composer `.bottom-actions` L33233 (z-index/overflow). |
| Dead-code deletion subset | 22 | DOM grep + visual-diff | `#learnLecturePageIndicator` / `#learnExplainBottomRail` / `#learnToolbarPagination` chains — IDs in **no HTML/JS**. **Line-reducing** (not collapse). Mostly cleared by #105 sweeps; finish the remainder. |
| NEEDS-NARROW-VIEWPORT | 12 | A0 narrow probes | MN L34808/34838/34842 + composer 33277 (≤1180); MN L34848+ + topbar L34297+ (≤820). |
| NEEDS-STATE-MATRIX | 28 | A0 S4–S11 + S13 | S10/S11 + `.is-chat-active` (S6/S7) + `.panel-normal` (S4) + `.learn-textbook-active` **Band 1** (S13, 7 occ) now **probe-covered** (2026-06-28). Remaining: the **7 Band-2** `.chapter-overview-active.learn-textbook-active` occurrences (**named gap — no css-probe witness**, S14 dropped; cover via visual-diff + a fresh arbiter keep-set) + `[data-custom-split]`. |
| NEEDS-NEW-VIEW | ~7 | isolated-view bootstraps | settings/preference/courseTracker close-btns; open-mode-menu composer. |
| LOAD-BEARING (never touch) | 20 | — | cite-and-skip: composer L33191/33213-16/33238/37415-26, MN L34770/34784/34816+, topbar L34088/34176-78/34193-94, close-btn L34091. |

#### A3 — `.app .sidebar` `!important` strip

**Files:** `app/style.css` (`.app .sidebar` chains + comma-grouped `.sidebar` arms).
**Risk:** **NOT isolated** — 169 `.app .sidebar` chains + 193 comma-grouped arms pair sidebar selectors with bare-class arms reachable from the **syllabus tree** (`.sidebar .syllabus-*, .syllabus-*`) and gate **learn-view layout** via `.app.sidebar-collapsed #learnView #learnBody.chat-collapsed .lesson-page-frame`. Stripping a sidebar `!important` can flip the cascade on the syllabus tree and on collapsed learn-view geometry.
**Gate:** multi-view arbiter coverage **including a sidebar-collapsed state** + the syllabus tree, before any strip. ~639 candidates; spec quotes 44.2% safe — the highest blast radius of the view strips.

#### A4 — §3d learn-view composer chain (HARDEST, mandatory-last)

**Files:** `app/style.css` ↔ `app/css/runtime-collapsed.css` in **lockstep**.
The only region where runtime-collapsed.css sets **different values on the same
selectors** — a true cross-file specificity war. Five named war-pairs
(`PHASE3.6_SPEC.md §3 Surface 6`):
1. Followup-bar geometry: style L41334 (12 IDs) ↔ rcc L1976 (8 IDs) — width `calc(100%-36px)` vs `min(820px,…)`, min-height 152 vs 112, radius 28 vs 18, pink vs white glass. Distinct depth is 4 **on both sides** — repetition is the *only* thing making style.css win; collapse to plain depth-4 → ties → runtime wins on source order → 8+ props regress.
2. Followup-bar z-index/overflow: style L33213 ↔ rcc L1634.
3. `#learnChatCol` background: L33191 (dead) ↔ L37417 (live, within-file) — co-transform preserving source order or the radial-gradient resurfaces.
4. `#learnModeMenu` position: style L33238 ↔ rcc L1790.
5. `#learnChatEmptyState` transform: runtime-internal (rcc L2036 beats style L33057).
**Invariant to preserve on every pair:** *style.css effective specificity > runtime-collapsed effective specificity* (runtime loads last).
**Gate:** full css-probe S2–S12 byte-identical (A0) — this is the load-bearing gate; visual-diff is catch-all only.

#### A5 — Media-gated dead-redeclaration slice (78 style + 6 runtime) — ✅ SHIPPED in #106

> **✅ DONE (#106, `6593c19`):** the media-gated sweep (`find-dead-redeclarations.js
> --media`, 78 dead style decls / 72 `!important` + 6 runtime) shipped as #106's first
> sub-commit. The prose below is historical; this box can be checked.


Deferred from #105 (which swept the ~98% top-level slice). The 78 sit on
**unprobed selectors** (home-ask/feedback/login/MN/chapter-overview/settings)
and unreachable contexts (`@media max-width:560px`, `@container lecture-panel`,
`prefers-reduced-motion`). **Gate:** the A0 narrow/`@container`/≤560px probes.
Marginal reward (~78 lines / ~72 `!important`); do it once the probes exist or
document the slice as provably unreachable and close it.

---

### Workstream B — split `app.js` → ~5,050 lines (5 seams)

Runs **fully in parallel** with Workstream A (never touches CSS). Extraction is
mechanical: the codebase already uses plain `<script>`-tag concatenation into
shared global scope (21 existing sibling modules). Cut a block, add a `<script>`
tag in `app/index.html` in the right order, bump the `app.js?v=` cache-buster,
`npm run check`, smoke-test, 35-view visual-diff. **Recommended order is
cleanest-first; the tangled lesson engine last once its boundary is clear.**

| # | Module | app.js lines | ~Lines | Risk | Entry points / notes |
|---|---|---|---:|---|---|
| 1 | `app/feedback-board.js` | 6172–6440 (+ helpers 487/489–517) | ~300 | low | Cleanest. `renderFeedbackBoard`, `loadFeedbackBoard`, `submitFeedbackItem`, `setFeedbackReplyTarget`, `feedbackAuthorName`, `formatFeedbackTime`. Only external caller is `loadFeedbackBoard` (in `showFeedbackView`); move the `feedbackReplyTargets` Map with it. Validate the extraction workflow here. |
| 2 | `app/textbook-focus.js` | 3043–3335 | ~293 | low | **Unnamed seam (found).** Full-page zoom/pan reader modal: `openTextbookFocusMode`/`close…`, `renderTextbookFocusPages`, transform/zoom HUD, pointer/wheel binding, QA passthrough. One external caller (`openTextbookFocusMode` at 4521). Move/relazily-query the 962–971 element consts. |
| 3 | `app/ui-friction-fixes.js` | 7929–8338 | ~410 | low | **Unnamed seam (found).** Already a self-contained `ftutorUiFrictionFixV123` IIFE with `typeof`/`window` guards — essentially a file-move. **Must load AFTER `app.js`** (it monkey-patches `renderSyllabus`). |
| 4 | `app/lesson-render.js` | 1505–3464 | ~1,950 | **high** | **Largest win, do LAST.** KP engine: `parseLessonKnowledgePoints`, `renderCurrentKnowledgePoint`, `setLearnLessonContent`, `runLearnPageTurn`, `renderLearnPages`, `decorateLectureContent`. **Quick-Check/Key-Takeaways KP rendering lives INSIDE `decorateLectureContent`/`parseLessonKnowledgePoints` — it extracts WITH this module, not separately.** Narrow public surface (5 entry points) but wide internal call graph; move module state `learnKnowledgePoints`/`currentKnowledgePointIndex`/`learnPages` with it. |
| 5 | `app/syllabus-view.js` | 786–1021 (+ helpers 3628–3810) | ~350 | medium | `renderSyllabus`, `findSyllabusSubsections`, overview-context helpers. Data half already in `data/syllabus-data.js`. `renderSyllabus` binds onclick → `openLearnMode`/`openChapterOverviewMode` (keep load order: this **before** `app.js`, ui-friction **after**). Leave the pagination half (`_sectionPageMap` inside `loadTextbookPages`) in `app.js`. |

**Estimate:** ~3,300 extractable → `app.js` ≈ **5,050 lines**. ~5K reachable
*with caveat* (the lesson engine's tangle with focus-mode/overview helpers may
leave a few hundred lines behind — acceptable for "reasonably split").

---

### Workstream C — Standalone landmines (in scope)

#### C1 — Unclosed `.learn-followup-bar {` brace (DELETE)

**File:** `app/style.css` L5464 (open) → L5640 (rebalance); dead region L5465–L5635.
**Finding (verified):** the brace never closes at its intended point; a comment
+ 23 nested rule-blocks (77 `!important`) covering `.explain-body` typography,
`.lecture-note-card*` variants, and the 55/45 col ratio are scoped one level too
deep and **do not apply as authored**. The rule's real declarations
(`display:flex; flex-direction:column; gap:6px; flex-shrink:0;`) sit at
L5636–5639. **Every swallowed selector already loses to a later equal/higher-
specificity rule** (`.explain-body p,li` → L9160; `.lecture-note-card-example`
→ L9209; col ratio → L14528), so the "keep this last to win" comment is
obsolete and the block is dead.
**Action:** **delete** L5465–L5635, keep `.learn-followup-bar { display:flex; flex-direction:column; gap:6px; flex-shrink:0; }`. Render-neutral (the activated decls still lose); verify with visual-diff + css-probe (expect text-AA noise floor only). Sev-3, standalone correctness PR.

#### C2 — css-probe S2/S3 `panelFocus` desync (FIX — also an A0 gate)

> **✅ FIXED on branch `fix/c2-panelfocus-desync` (2026-06-28, pending PR).** S2/S3
> `enter()` now drive the real `learnPanelFocus = '<focus>'; applyLearnPanelFocusState()`
> path and `resetLessonChromeState` clears `chat-collapsed`/`explain-collapsed`; the
> assert-as-entered was upgraded to a fail-closed state+winner check. Outcome was
> **probe-neutral — `css-probe --check` byte-identical incl. S2/S3, baseline unchanged**
> (the corrected DOM yields the same FOLLOWUP_PROBES values, confirming the desync was
> latent on the probed cascade). `visual-diff` render-neutral, proven via stash-trick on
> the 5 `resetLessonChromeState`-using views (15/16/20/21/26). `npm run check` green.
> Live line numbers re-measured (the L206–240 / app.js:2725 below had drifted post-B):
> S2/S3 enter `css-probe.js:383–418`, `applyLearnPanelFocusState` `app.js:1116`.

**File:** `tools/css-probe.js` L206–240 (S2/S3 enter), `tools/test-utils.js` L219–234 (`resetLessonChromeState`).
**Finding (verified):** enter() hand-sets only `dataset.panelFocus`, omitting the
`.panel-qa-*` class, the `chat-collapsed`/`explain-collapsed` reset, and the
`learnPanelFocus` JS var that the app's `applyLearnPanelFocusState()`
(app.js:2725) sets in lockstep. Currently **latent** (no CSS keys off
`.panel-qa-*`; the sentinel guards the winner) but a forward trap.
**Action:** drive the state through `applyLearnPanelFocusState()`; have
`resetLessonChromeState` also `classList.remove('chat-collapsed','explain-collapsed')`. **Land this before the A4 composer work** so its probes capture a DOM the app actually renders.

> **C3 (not a bug) — view-04 `#mistakeNotebookCloseBtn`:** verified to be
> `display:none` **by design** (style.css L25470, grouped with 6 sibling close
> buttons under "Home is now the global return path"). The working exit is the
> sidebar Home button. **Do NOT re-enable.** The only residue is harmless dead
> JS (7 click handlers on hidden elements). Optional dead-JS/markup tidy →
> **backlog** (§4); not a refactor-done requirement.

---

## 4. Explicitly OUT of scope — post-refactor backlog

Parked deliberately. Triage by the Gated Timebox protocol
(`knowledge/gated-timebox-protocol.md`: Sev-1 now, Sev-2 dev day, Sev-3 backlog).

1. **Phase 4 — user-data DB migration** (refactor-plan rule #3). **First item after DONE.** Filesystem JSON in `app/users/` breaks the multi-user case on Render's ephemeral FS. Needs its own design conversation; `app/user-memory.js` already pre-positions the swap.
2. **Six carry-forward interactive-demo bugs** (`phase3_deferred.md §1c`, all verified still present). One PR per module:
   - `sinusoid-phasor.js`: **SP-1** (Sev-2, rAF loop has no detach → racing second loop on re-hydration), **SP-2** (Sev-2, reset-while-paused freezes at t=0), **SP-3** (Sev-3, `updateControlLabels` null-deref latent), **SP-5** (Sev-3, hardcoded defaults ignore authored controls).
   - `phasor.js`: **PH-4** (Sev-2, reads `demoSpec.controls` only — ignores `demo.controls` fallback → empty control panel), **PH-6** (Sev-3, window `resize` listener leak on re-hydration).
3. **`@layer` migration** — explicitly a **trap** until the `!important` wall is down (`!important` inverts layer precedence; the Tailwind CDN runtime-JIT injects unlayered `<style>` that would flip 646 utility sites). A late anti-regression guardrail only, with little left to fix once Workstream A completes.
4. **Harness coverage hardening** (regression-safety, not blocking DONE):
   - 11 of 13 dispatcher family-keys never exercised (`§2b`, Sev-1 vs future renderer-table refactors) — add Page-C views opening Chapter-2+ subtopics per missing key.
   - `complex_plane` / `sinusoid_phasor` / `phasor` demos pixel-unverified (`§1a`).
   - §11 sidebar-drift **Option-B root fix** (a `lessonLayoutStable` sentinel) — today masked, not fixed; restoring sidebar coverage on lesson views needs it.
   - De-duplicate the css-probe/visual-diff shared bridge-spawn/mask/report machinery (`§13a`) to stop drift.
5. **View-04 dead-JS/markup tidy** (C3 above) — optional cleanup, do not re-enable the buttons.

---

## 5. Critical path & sequencing

```
CSS (Workstream A, sequential):
  A0 harness gates ─┬─> A1 #feedbackView ──┐
                    ├─> A2 doubled-ID tranches (per-gate)
                    ├─> A3 .app .sidebar (needs collapsed-state probe)
                    └─> A4 §3d composer (LAST; needs S4–S11) ──> A5 media-gated slice

app.js (Workstream B, parallel — never touches CSS):
  B1 feedback-board ─> B2 textbook-focus ─> B3 ui-friction ─> B4 lesson-render ─> B5 syllabus-view

Landmines (Workstream C, independent):
  C1 brace delete (anytime)   C2 panelFocus fix (BEFORE A4)
```

**Rules baked into the order (do not reorder without re-checking):**
- A4 (composer) is **mandatory-last** in CSS — it depends on the full S4–S11 probe matrix (A0) and on C2.
- A1 (`#feedbackView`) **cannot start** without its seeded-fixture probe (pixel-diff is blind on feedback).
- A3 (`.app .sidebar`) **cannot start** without sidebar-collapsed-state + syllabus-tree probe coverage.
- B4 (`lesson-render`) is **last** in the `app.js` split (widest internal call graph); B1 first (lowest risk, validates the workflow).
- Every CSS commit runs **both** `css-probe --check` (load-bearing for cascade) and `visual-diff --check` (catch-all). Neither is added to `npm run check` (they spawn Chromium, ~30s) — manual pre-merge gates.

**Effort (planning-grade, per `REFACTOR_PLAN.md` realistic-finish-line):**
- Workstream A: multi-session (~4–6 dev days), front-loaded by A0 harness build.
- Workstream B: ~1 dev day per seam × 5, but the 3 low-risk seams are near-mechanical.
- Workstream C: <½ day total.

---

## 6. Risk register (carried from `PHASE3.6_SPEC.md §5`, re-scoped)

| # | Risk | Pixel-diff blind? | Mitigation |
|---|---|---|---|
| R1 | Collapsing the 12-ID followup-bar below runtime's 8-ID ties → runtime wins → 8+ props regress (A4) | yes | css-probe S2/S3/S4 byte-identical on width(px)/min-height/radius/bg/backdrop-filter — MANDATORY |
| R2 | `@layer` inverts `!important` + flips 646 Tailwind sites | yes | do NOT migrate (backlog §4.3) |
| R3 | Stripping a feedback/sidebar `!important` in isolation regresses a state pixel-diff can't see | yes (off-screen / sub-threshold) | computed-style arbiter + **seeded fixture** (A1); collapsed-state probe (A3) |
| R4 | Editing `#mistakeNotebookView`/sidebar **by line range** corrupts interleaved rules | n/a (edit error) | scope ALL edits **by selector token**, never by line range |
| R5 | css-probe taken in the wrong state reads an inactive rule | n/a (false confidence) | `enter()` MUST assert-as-entered; fix C2 desync first |
| R6 | Within-file DEAD rule assumed live; de-doubling resurfaces it | maybe | co-transform DEAD/live pairs preserving source order (e.g. L33191↔L37417) |
| R7 | `app.js` extraction breaks load order (monkey-patch / global binding) | n/a (runtime) | keep `<script>` order: helpers before `app.js`, ui-friction after; `npm run check` + smoke per PR |

---

## 7. References

- `docs/REFACTOR_PLAN.md` — canonical multi-phase history; "Forward outlook" seeded Workstream B.
- `docs/PHASE3.6_SPEC.md` — CSS-collapse protocol: §3 surface order, §4 css-probe spec + state matrix, §6.2 per-instance doubled-ID work-list, §6.3 branch progress.
- `docs/phase3_deferred.md` — live deferred punch-list: §1c (demo bugs), §3d (composer war-pairs), §14/§14a (redecl lever + unclosed brace), §15 (panelFocus desync).
- `tools/css-probe.js`, `tools/_view-cascade-probe.js`, `tools/visual-diff.js`, `tools/test-utils.js` — the verification harness.
- `knowledge/gated-timebox-protocol.md` (central DB) — Sev-1/2/3 triage for the backlog.
- Ground-truth verification: workflow `w5rd3xio0` (2026-06-25, 6 read-only agents).
