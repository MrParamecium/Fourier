# Results — S14 tall-content textbook witness

Status: **COMPLETE** — all 6 ACs met; 5 gates green; trellis-check verdict SHIP.
Branch: `a4/s14-tall-witness` (base main).

## Done

### Step 1 — fixture helper (test-utils.js)
- Extended `resetLessonChromeState` to also tear down the textbook combined-state
  (`learn-textbook-active`, `textbook-mode`, un-hide/clear `#learnBookOverlay`,
  restore `#learnExplainContent`). Mirrors the C2 precedent. **Render-neutral for
  every committed baseline** (no pre-existing view sets these → clearing-when-unset
  is a no-op) — proven by the full visual-diff --check below.
- Added `enterTextbookOverflowState(page, {variant})` — synthetic fixed-height
  `.textbook-page-card>img` injection into `#learnBookOverlay`, fail-closed sentinel
  (both classes set + Band-2 winner via `paddingBottom===64px @800h` + overflow/fill
  precondition per variant). Exported.

### Step 2 — visual-diff views + baselines (visual-diff.js)
- Added `17t-textbook-overview-tall` (4×1400px cards → overflow; scroll-to-bottom via
  `scrollTo({behavior:'instant'})` — `#learnExplainScroll` inherits `scroll-behavior:smooth`,
  the view-14c trap; asserts `atBottom`+`lastBottomInView` before capture) and
  `17f-textbook-overview-fill` (1×220px card → min-height fills). Both `failRatio:0.0005`.
- Committed baselines: `tools/visual-baseline/17t-…png`, `17f-…png` (the other 10
  re-captured PNGs were noise-only and reverted).
- **`visual-diff --check`: 39/39 pass; 17t & 17f at 0.000% (0/1024000); every
  pre-existing view unperturbed.** (AC1, AC2, and the hard part of AC5 ✓.)

### Geometry proven (debug probe `tools/_s14-debug.js`, to be deleted)
- `#learnExplainScroll`: 738px bounded (=learnBody − 62px header), overflow-y:auto,
  scrollHeight 5752, scrolls to 5014. height:100% (Band-2 block 1) resolves vs a
  bounded parent → overflow. **MEASURED (Step 4): deleting it is render-neutral** — the
  overview-alone fallback `calc(100dvh − var(--header-height))` (3 IDs, style.css:23111)
  out-specifies `.learn-explain-scroll` height:auto and resolves to the IDENTICAL 738px → NOCOMP.
- flow: min-height:100%, padding-bottom 64px @800h (Band-2 winner), offsetHeight 5752
  (tall) / 738 (fill, min-height padding it up).
- Scroll persists through `settleLesson` (5014 after settle); the white 1×1 GIF img covers
  the gray `#9aa4b2` card bg → cards render white (deterministic, crisp edge on teal).

## Witnessing map (design intent → MEASURED verdict; see Step 4)
| At-risk decl | line | designed witness | MEASURED outcome |
|---|---|---|---|
| `#learnExplainScroll height:100%` | L24577 | arbiter offsetHeight/prop | **NOCOMP-safe** (fallback = identical 738px; no flip) |
| `.textbook-pages-flow padding-bottom` | L24599 | sentinel + arbiter | **load-bearing** (sentinel error 64→40px, both harnesses) |
| `.textbook-pages-flow min-height:100%` | L24598 | arbiter (prop) | **load-bearing** (prop flip 100%→0px, 30 cells) |

### Step 3 — arbiter VIEWs (_view-cascade-probe.js)
- Added `learn-textbook-overview-tall` + `-fill` VIEWs (root `#learnExplainScroll`),
  appended LAST (order-dependence). `s14EnsureLessonOpen` un-collapses the sidebar
  (the `sidebar-collapsed` VIEW left it collapsed → openSubtopic chapter-click failed)
  then opens §1.1-1 once; `s14ReassertState` re-injects per viewport (strict ≥1180,
  tolerant of narrow responsive layouts). NO `_view-important.json` regen (offset-box
  `rect` is captured per-element incl. the root — `els=[rootEl,...querySelectorAll('*')]`).
- `--baseline` clean: tall 15 states × 25 elements, fill 15 × 19 (270 states total).

### Step 4 — fail-closed proof (the MEASURED verdict)
Deletion tests (working-tree only, **reverted** — Band-2 byte-identical to main):

| At-risk decl | line | deletion result | verdict |
|---|---|---|---|
| `#learnExplainScroll height:100%` | **24577** | arbiter root `#learnExplainScroll` offsetHeight **unchanged** (no rect flip); visual-diff 0.000% | **NOCOMP-safe** |
| `.textbook-pages-flow min-height:100%` | **24598** | arbiter PROP flip `min-height "100%"→"0px"` × **30 cells** (tall+fill, 3 themes × 5 vp) | **LOAD-BEARING** |
| `.textbook-pages-flow padding-bottom` | **24599** | **sentinel error in BOTH harnesses** (`padding-bottom is 40px, expected 64px`) → Band-1 fallback wins | **LOAD-BEARING** |

**The witness corrected the plan.** The plan assumed `height:100%` deletion would
drop `#learnExplainScroll` to `height:auto` (content-grown → no scroll). The
MEASURED fallback is the **overview-alone** rule `height: calc(100dvh − var(--header-height))`
(3 IDs out-specify the `.learn-explain-scroll` `height:auto` class rule), which
resolves to the **identical 738px** → render-neutral. So `height:100%` is NOCOMP-safe,
not at-risk. ([[feedback-reconcile-plans-against-git]] / [[feedback-rederive-keepset]].)

Nuance recorded: `min-height:100%` is *geometrically* inert here (percentage min-height
vs the `height:auto` `#learnBookOverlay` parent doesn't resolve), but the arbiter flags
the **computed-value** change (100%→0px) → kept (over-keep is the safe direction; a
future definite-height parent would activate it). padding-bottom's witness is the
**sentinel** (a Band-2-winner discriminator that aborts setup → harness errors → A4
change rejected) — a tighter fail-closed guard than a pixel/offset diff.

### Step 5 — fresh, minimal keep-set
- `tools/_keep-important.json`: **1082 → 1084**, added **24598 + 24599** (the 2
  load-bearing lines), inserted sorted between 22927 and 24634. `24577` (height) EXCLUDED
  — measured NOCOMP (minimal keep-set, Rule 6.3; re-derived fresh, not seeded).

## TODO (remaining)
- Final gate sweep (running): npm check + css-probe 21 byte-identical (incl. S13) +
  arbiter --check CLEAN on reverted style.css (no-op control) + visual-diff 39/39.
- REFACTOR_DONE §A4 reconcile (mark witness built; record the corrected height finding).
- Delete `tools/_s14-debug.js`; branch + commit.
