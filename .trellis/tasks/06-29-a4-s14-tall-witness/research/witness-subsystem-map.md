# Witness subsystem map — S14 tall-content textbook witness

Synthesized from a 5-agent parallel read (2026-06-29). File:line backed.

## The witness is TWO tools, NOT a css-probe state

| Tool | File | Keys on | Witnesses which at-risk decl |
|---|---|---|---|
| **visual-diff** | `tools/visual-diff.js` | pixels (1280×800, `fullPage:false`) | `.textbook-pages-flow` **padding-bottom** (86px vs Band-1 58px, at scroll-bottom) |
| **arbiter** | `tools/_view-cascade-probe.js` | `offsetLeft/Top/Width/Height` (scroll-INVARIANT) + PROP_LIST values | `#learnExplainScroll` **height:100%** (offsetHeight) + `.textbook-pages-flow` **min-height/padding** (offsetHeight) |
| ~~css-probe~~ | `tools/css-probe.js` | literal cascade values (forbids USED values) | **NONE** — `height` resolves to a used px that drifts cross-machine → fail-open/non-deterministic. css-probe **S13 stays** as the Band-1 backstop. |

The A4 spec (`docs/REFACTOR_DONE.md` L223-230) and `css-probe.js` L265-308 both
prescribe **"visual-diff view + fresh arbiter keep-set"**, explicitly NOT a new
css-probe state.

## The 2 at-risk decls (style.css)

- **(a)** `#learnExplainScroll { height: 100% !important }` — **L24577**.
  Fallback if deleted = overview-alone `#learnBody.chapter-overview-active #learnExplainScroll { height: calc(100dvh - 60px) }` (L23115). **Band-1 sets NO height** → no Band-1 backstop.
- **(b)** `.textbook-pages-flow { min-height:100% !important; padding: … clamp(48px,8vh,86px) !important }` — **L24598-24599**.
  Base `.textbook-pages-flow` (L2196) has NO min-height, padding `20px 18px 28px`. Band-1 `.textbook-pages-flow` (L25142) has NO min-height, padding-bottom `clamp(32px,5vh,58px)`. → **no Band-1 backstop** for min-height; padding-bottom falls 86→58px (≈27px @900px vh).

The other 12 Band-2 occurrences ARE backstopped (Band-1-redundant under S13, inline-masked by app.js L2460/2469, or same-element `.learn-explain-scroll` class L12097-12105). Do NOT touch any of this — A4 proper de-doubles; THIS task only witnesses.

## THE geometric tension (drives the two-variant design)

- `height:100%` + `padding-bottom`: witnessable **only on TALL/overflowing** content (`scrollHeight > clientHeight`). On short content height:100% use-value-collapses to ~738px = the fallback → vacuous pass (fail-OPEN).
- `min-height:100%`: does work **only when content is SHORTER than the container** (pads the flow up to fill). On a maximally-overflowing flow it is **INERT** → a single tall fixture CANNOT witness it.
- ⇒ **Two fixture variants needed**: `tall` (overflow) for (a)+padding-bottom; `fill` (content just under container) for min-height:100%.

## Combined-state entry (app.js)

- `chapter-overview-active`: `setChapterOverviewLayoutActive(true)` (L1062) when `_learnLayoutMode==='overview'`; driven by `openChapterOverviewMode()` (L2111).
- `learn-textbook-active`: `_setLearnMode('textbook')` (L2449) when `supportsTextbookLayout` (true in overview layout); also adds `.textbook-mode` to `#learnExplainScroll` (L2457) → matches the 2nd Band-2 selector form (L24576).
- `.textbook-pages-flow` rendered ONLY by `_renderTextbookPages()` (L2589): `_bookOverlay.innerHTML = '<div class="textbook-pages-flow">' + N×'.textbook-page-card>img' + '</div>'` (L2595-2601).
- **Only top-level `function` decls are on `window`** (`openChapterOverviewMode`, `_setLearnMode`, `_renderTextbookPages`); const DOM handles + `let learnSectionId`/`_learnLayoutMode` are NOT — reach elements via `document.getElementById` inside `page.evaluate`.

## Determinism constraints (gotchas)

- **Page images exist only for page-001..329** (`materials/new-book-pages/`); ch4 (page-330+) 404s → zero-height → no overflow. In-range fixtures: `b`=58pp (001-058), `2.4-2`=13pp (178-190), `2.2`=11pp (151-161).
- Real-scan path has async decode + scroll-reset timers at **80/120/360ms** (L2446/2611-2612) → must settle past 360ms. **Synthetic fixed-height injection avoids all of it.**
- MASK_CSS (`test-utils.js` L42-43) masks `#textbookFocusDialog` imgs **only**, NOT `.textbook-pages-flow` imgs. Editing MASK_CSS re-baselines EVERY view → prefer fixed-size placeholder cards scoped to the new view.
- `resetLessonChromeState` (L219) clears overview/split classes but **NOT** `learn-textbook-active` → the new view must add both classes itself AND clean up `learn-textbook-active` on teardown (NO-TEARDOWN-CONTRACT, page reused across same-key views). Place LATE in the Page A schedule (near view 03b/26).
- `fullPage:false` clips to viewport; inner-overflow content is OFF-screen → copy **view 14c** pattern (`scrollIntoView({block})` + `getBoundingClientRect` `fullyIn` assert before screenshot). View 14c L694-775.

## Arbiter / keep-set wiring

- `_view-important.json` (built by `_extract-view-important.js`, VIEWS currently `['#feedbackView','.sidebar']`) feeds the arbiter PROP_LIST AND css-probe's `#feedbackView` floor. **Add learn selectors as a NEW key — do NOT drop #feedbackView** (css-probe L397-407 throws if it disappears). `height`/`min-height`/`padding` may need adding to the PROP_LIST staples (`_view-cascade-probe.js` L66-71).
- `_keep-important.json` = flat array of protected pristine line numbers; **Band-2 L24575-24609 confirmed ABSENT** (jumps 22927→24634). Witness adds MEASURED entries for the proven-load-bearing lines only.
- Arbiter baseline `_view-cascade-baseline.json` is **262MB**; keep the new view's subtree small (few TALL placeholder cards, not many short ones) and `interactions:[{label:'rest'}]`.
- **Re-derive the keep-set FRESH** (memory [[feedback-rederive-keepset]]; spec Rule 6.3 "commit the MINIMAL keep-set"). A zero/small yield = a successful floor-proof, not a failure. Either outcome (load-bearing → keep entry; or NOCOMP-safe even on tall overflow) closes the gap.
- None of `_view-cascade-probe.js` / `_strip` / `_grow` / `_extract` are in `npm run check` — run the tools themselves to validate syntax.

## A2 precedent (the de-double this witness unblocks)

`.trellis/tasks/archive/2026-06/06-28-a2-doubled-id-collapse/results.md` L31-52:
A2 ran the arbiter as a simple **before/after byte-compare** (NOT the strip-grow loop) and yielded N=2 NOCOMP de-doubled, M=10 kept-DEFENSIVE. "collapse-and-merge" = dedup the lock block TOGETHER WITH its later competitor + reorder; "piecemeal de-double" = drop one rule's doubled ID alone → ties the later competitor → regression. A4 will use the same arbiter before/after mode on THIS witness fixture.

## Full agent output (ephemeral)
`/tmp/claude-1000/-mnt-d-Github-fourier-tutor-agent/190d76f3-eae4-426b-941b-d837e7097107/tasks/wohyef2q0.output` (659 lines; will be GC'd).
