# A0 `.learn-textbook-active` — results

Harness-only css-probe coverage for the 14 `.learn-textbook-active` doubled-ID
occurrences. Captured on pre-collapse `main` (HEAD `73dbf66`). Production bytes /
rendered pixels: **zero changed**. `git diff --stat` is the two-file set
(`tools/css-probe.js` +111, `tools/css-probe-baseline.json` +56; additive +167/−0).

## Decision (headline)

- **S13-textbook-active (Band 1) — SHIPPED.** Fail-closed Band-1 winner sentinel exists.
- **S14-textbook-overview (Band 2) — DROPPED** under the §3 ship/drop gate (the S5
  discipline). No fail-closed Band-2 sentinel is constructible in a §1.1-1 lesson DOM.
  This is a **named coverage gap**, not "covered" — see "S14 drop" below and flag it to A2.

## 1. Empirical matrix (`tools/_explore-textbook.js`, one Chromium run, now DELETED)

Four conditions, each driven through the **real** production fns (S10/S14 set
`_learnLayoutMode='overview'` FIRST — the overview driver only reads the mode):

| condition | `#learnBody` textbook/overview classes |
|---|---|
| base (lecture) | *(none)* |
| S13 (textbook+lesson) | `learn-textbook-active` |
| S10 (overview-alone) | `chapter-overview-active` |
| S14 (textbook+overview) | `chapter-overview-active learn-textbook-active` |

Candidate-property computed values across the four conditions:

| prop | base | S13 | S10 (ovw-alone) | S14 |
|---|---|---|---|---|
| `#learnExplainScroll` background-image | base 2-radial `20% 8% …0.86` + `82% 18% …(244,232,205,0.22)` | **Band-1 2-radial `18% 6% …0.82` + `82% 16% …0.44`** | overview 3-radial `780px 520px at 8% 0%` | **= S13 (Band-1 wins)** |
| `#learnExplainScroll` padding-top | `0px` | `0px` | `0px` | `0px` |
| `#learnExplainScroll` padding | `0px` | `0px` | `0px` | `0px` |
| `#learnExplainScroll` overflow-y | `auto` | `auto` | `hidden` | `auto` |
| `#learnExplainScroll` **height** | `738px` | `738px` | `738px` | `738px` |
| `#learnExplainScroll` **min-height** | `0px` | `0px` | `0px` | `0px` |
| `#learnBookOverlay` position | `absolute` | **`relative`** | `absolute` | `relative` |
| `#learnBookOverlay` display | `none` | `block` | `none` | `block` |
| `#learnBookOverlay` background-color | `rgba(0,0,0,0)` | `rgba(0,0,0,0)` | `rgba(0,0,0,0)` | `rgba(0,0,0,0)` |
| `#learnBookOverlay` **height** | `auto` | `738px` | `auto` | `738px` |
| `#learnBookOverlay` min-height | `0px` | `100%` | `0px` | `100%` |
| `#learnBookOverlay` padding | `12px 14px` | `0px` | `12px 14px` | `0px` |
| `.textbook-pages-flow` gap/padding/min-height | `__MISSING__` | `__MISSING__` | `__MISSING__` | `__MISSING__` |
| `#learnExplainContent` display | `flex` | `none` | `block` | `none` |
| `#learnChatCol` display | `flex` | `flex` | `none` | `none` |
| `#learnResizer` display | `block` | `block` | `none` | `none` |
| `#lecturePrev/NextOverlayBtn` display | `flex` | `none` | `flex` | `none` |

## 2. S13 sentinel selection (Band 1)

The Band-1 doubled-ID rules (`app/style.css` L25118-25157) become the live cascade
winners under `_setLearnMode('textbook')` with `_learnLayoutMode='lesson'`.

**Winner sentinel (asserted in `enter()`):** `#learnExplainScroll` `background-image`
carries the Band-1 2-radial signature (`circle at 18% 6% …rgba(255,255,255,0.82)` +
`circle at 82% 16% …rgba(255,255,255,0.44)`, L25124) — empirically **distinct from the
base 2-radial** (`20% 8% …0.86` + `82% 18% …(244,232,205,0.22)`, L24030) and from the
overview 3-radial. NOT JS-inlined (`_setLearnMode` never writes `learnExplainScroll.style.
backgroundImage`), so it can witness the rule's deletion → **fail-closed**.

### S13 per-probe sentinel table

| selector | property | value | role (style.css) |
|---|---|---|---|
| `#learnExplainScroll` | background-image | Band-1 2-radial signature | **winner sentinel** (L25124) |
| `#learnExplainScroll` | padding | `0px` | L25120 — **base-equal companion** (L24029/L24886 already force `0` at rest; NOT load-bearing, never asserted alone) |
| `#learnExplainScroll` | overflow-y | `auto` | L25122 |
| `#learnBookOverlay` | position | `relative` | L25131 — discriminates from base `absolute` |
| `#learnBookOverlay` | min-height | `100%` | L25135 |
| `#learnBookOverlay` | padding | `0px` | L25137 — discriminates from base `12px 14px` |
| `#learnBookOverlay` | background-color | `rgba(0,0,0,0)` | L25139 (`background:transparent`) |
| `#lecturePrevOverlayBtn` | display | `none` | L25151 — Band-1-exclusive, CSS-only (no JS inline write) |
| `#lectureNextOverlayBtn` | display | `none` | L25151 |

**Deliberately excluded** (inline-masked → non-discriminating, design §2 AVOID list):
`#learnExplainContent` `display` (`_setLearnMode` sets it inline `none`, app.js:2469) and
`#learnBookOverlay` `display` (inline `block`, app.js:2460). `.textbook-pages-flow` is
`__MISSING__` in a §1.1-1 lesson DOM (no rendered book-page-flow node) → not probed (a
`__MISSING__` baseline is refused fail-closed).

Coverage: S13 pins the cascade winners for **all 5 Band-1 rule-blocks / 7 occurrences**
(`#learnExplainScroll` bg/padding/overflow-y; `#learnBookOverlay` position/min-height/
padding/background; `#lecturePrev`/`#lectureNextOverlayBtn` display). The two
inline-masked `display` decls are pinned indirectly via the non-masked sibling decls in
the same rule blocks.

## 3. S14 ship/drop gate (Band 2 — DROPPED, S5 discipline)

The §3 gate requires a Band-2 `(6,2,0)` property (L24575-24609) whose value (a) differs
from base, (b) differs from the **post-deletion fallback** — the value with the Band-2
rule removed in the *same textbook+overview DOM* (so the still-present **Band-1** rules and
the overview-alone rules win the fallback), and (c) is not inline-masked. Every Band-2
candidate fails at least one clause:

| Band-2 decl | post-deletion fallback | verdict |
|---|---|---|
| `#learnExplainScroll` height:100% (L24577) | overview-alone `calc(100dvh−60px)` → **738px used** = S14 `738px` | **fail-open** (used-value collapse) |
| `#learnExplainScroll` min-height:0 (L24578) | base `0px` = S14 `0px` | **fail-open** (base-equal) |
| `#learnBookOverlay` height:auto (L24592) | Band-1 has no height → base `auto` → **738px used** = S14 `738px` | **fail-open** (used-value collapse) |
| `#learnBookOverlay` position/min-height/padding/bg | Band-1 (`.learn-textbook-active` still present) sets the SAME values | **not Band-2-exclusive** (survives Band-2 deletion → fail-open) |
| `#learnExplainContent` display:none (L24603) | inline-masked by `_setLearnMode` (app.js:2469) | **excluded** (inline-masked) |
| `#learnChatCol`/`#learnResizer` display:none (L24606-08) | overview-alone already hides them (S10 = `none`); also inline-masked by `setChapterOverviewLayoutActive` (Risk #5) | **fail-open** (fallback already `none`) |
| `.textbook-pages-flow` min-height/padding (L24598-99) | `__MISSING__` — no node in this lesson DOM | **unprobeable** |

No property satisfies all three clauses → **no fail-closed Band-2 sentinel is
constructible → S14 dropped.** A css-probe.js comment block (above `S13_PROBES`) records
this with the same per-clause rationale; it is the S5 precedent applied to Band 2.

## 4. Named coverage gap (prd "Residual risk")

Dropping S14 leaves the **7 Band-2 doubled-ID occurrences** (`#learnExplainScroll`,
`#learnBookOverlay`, `.textbook-pages-flow`, `#learnExplainContent`, `#learnChatCol`,
`#learnResizer` under the combined `.chapter-overview-active.learn-textbook-active`
selector, L24575-24609) with **NO computed-style witness**. This is an honest **named
gap**, not "covered":

> **A2 must not assume Band-2 is harness-guarded.** A2's Band-2 strip has to lean on
> `visual-diff --check` + the arbiter keep-set (a fresh arbiter pass per
> `[[feedback-rederive-keepset]]`), NOT a css-probe baseline. The 7 Band-1 occurrences
> (S13) ARE computed-style-guarded; the 7 Band-2 occurrences are not.

## 5. Process note — Risk #2 hit and resolved (the floor was NOT a no-op)

The first `resetLearnChrome` floor edit called `_setLearnMode('lecture')`
**unconditionally**. That broke pre-existing **S4** ("normal-split composer DOM not
rendered") and **S9** ("restore tab display none, expected flex") — because
`_setLearnMode('lecture')` re-runs the full lecture-chrome path
(`applyLearnPanelFocusState` + inline writes on `#learnExplainCol`/`#learnChatCol`/
`#learnBookCol`, app.js:2481-2524) that those states' own drivers do not expect to follow.
A clean-tool `--check` confirmed S4/S9 pass without the line, isolating the cause to the
floor edit (Risk #2 / design §6 rollback).

**Fix (re-scoped per design rollback):** gate the floor on
`#learnBody.classList.contains('learn-textbook-active')` so `_setLearnMode('lecture')`
fires **only** after S13 (the sole textbook state) and is a true no-op for every other
state. Post-fix `--check`: **0 probe diffs** on all pre-existing states; baseline diff is
additive **+56/−0** (only the `S13-textbook-active` key) — proving the floor is now a
genuine no-op (had any old key moved, the floor would still be perturbing them).

## 6. Validation gates (all run, verbatim)

| gate | result |
|---|---|
| `npm run check` | **PASS** (css-probe.js in the `node --check` set; runFlow smoke 7/7, harness-exports OK) |
| `css-probe --check` | **PASS — all probes byte-identical** (21 states incl. new S13; S2/S3/S4/S6/S7/S9/S10/S11/S12/N0–N4/S-feedback-*/S-page-corner all byte-identical) |
| `css-probe --baseline` → `git diff --stat` baseline | additive **+56/−0**, only `S13-textbook-active` key added; every pre-existing key byte-identical |
| `visual-diff --check` | **37/37 PASS** (exit 0); render-neutral. Max ratio = lesson text-AA noise (views 15/16 = 0.366%, 17 = 0.130%, 22 = 0.066%) — all under per-view thresholds, matching the documented noise floor |
| `git diff --stat` | ONLY `tools/css-probe.js` (+111) + `tools/css-probe-baseline.json` (+56); `_explore-textbook.js` deleted; report artifacts gitignored |

## 7. Files

- `tools/css-probe.js` — `S13_PROBES` const + S14-drop comment block + `S13-textbook-active`
  state object (after S11, before the cross-view feedback block) + gated `resetLearnChrome`
  textbook-mode floor.
- `tools/css-probe-baseline.json` — regenerated additive (+`S13-textbook-active`, +56/−0).
- `tools/_explore-textbook.js` — throwaway matrix tool, **deleted**.

## 8. S14 closure (2026-06-29 session, FlyM1ss)

Reopened the dropped S14 slice to decide whether to genuinely close the no-css-probe-witness
gap. Outcome: **deferred to A4 with a hard precondition — no speculative pre-build.**

- **Re-verification (didn't trust the prior drop).** Attacked the gap with a property the
  2026-06-28 matrix never evaluated: `#learnExplainScroll` `overscroll-behavior`. Band-2 sets
  `contain` (L24582) and the three S14-DOM competitors — overview-alone (L15024), base (L18832),
  Band-1 (L25118) — set none, so it *looked* fail-closed. It is not: `#learnExplainScroll` carries
  class `learn-explain-scroll` (`app/index.html:686`), and `.learn-explain-scroll`
  (L12102-12104, !important) already supplies `overscroll-behavior:contain` /
  `overflow-x:hidden` / `-webkit-overflow-scrolling:touch`. Deleting Band-2 leaves the **class
  rule** supplying the same values → **fail-OPEN**. This is a *fifth* death-mode (same-element
  class backstop), distinct from §3's (a)-(d). The no-witness conclusion is now **twice-verified**.
- **Risk surface narrowed to 2 decls.** Final pass over all 7 Band-2 decls: only
  `#learnExplainScroll` height:100% (scroll-cap vs content-grown `auto`) and `.textbook-pages-flow`
  min-height:100% + larger padding-bottom (L24598-99) are both Band-2-unique AND geometric. The
  other 5 are Band-1-redundant (and Band-1 is S13-computed-style-guarded) or inline-masked →
  **transitively backstopped** through a de-double.
- **No tool can witness those 2 in the current fixture.** css-probe (used-value), the arbiter
  (used-value + offset-rect, header L10-14), and visual-diff all need a fixture rendering a **tall**
  chapter-level textbook page flow before height:100% / `.textbook-pages-flow` become observable
  and distinct. `.textbook-pages-flow` is `__MISSING__` in a §1.1-1 lesson DOM.
- **Decision.** Building that fixture now is speculative pre-work for a strip A2 already deferred to
  A4. Recorded as a **hard A4 precondition** (`docs/REFACTOR_DONE.md` §A4) + a dated addendum in
  `tools/css-probe.js` S14 block. S13 ships; S14 stays a documented, scoped, twice-verified named
  gap with a concrete A4-time mitigation. **Task complete; advance to A4.**
