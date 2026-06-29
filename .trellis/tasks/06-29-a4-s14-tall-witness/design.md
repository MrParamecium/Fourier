# Design — S14 tall-content textbook witness

Grounded in `research/witness-subsystem-map.md` (5-agent read, 2026-06-29).
This task **builds and proves a measurement witness**; it does NOT de-double
anything (that is A4 proper).

## 1. What we are proving

The combined CSS state `#learnBody.chapter-overview-active.learn-textbook-active`
(Band-2, `style.css` L24575-24609) wins via doubled-ID tokens. A4 will later
de-double it. Twelve of its 14 occurrences are backstopped through a de-double;
**two are not** and are observable by no current tool because they
use-value-collapse on short content:

- **(a)** `#learnExplainScroll { height: 100% }` (L24577)
- **(b)** `.textbook-pages-flow { min-height: 100%; padding-bottom ∈ clamp(48,86) }` (L24598-24599)

The witness must create the rendering condition under which deleting each of
these is **detectable**, so the future A4 de-double can be proven render-neutral
(or a decl proven NOCOMP-safe). That closes the named S14 gap.

## 2. Tool boundaries (the contract)

| Tool | Owns | Stays untouched |
|---|---|---|
| `tools/visual-diff.js` | NEW witness view(s) + baseline PNG(s) | existing 25+ views, MASK_CSS (no global edit) |
| `tools/_view-cascade-probe.js` (arbiter) | NEW `learn-textbook-overview` VIEW + its baseline subtree | feedback/sidebar VIEWs |
| `tools/_view-important.json` | NEW learn key (additive) | `#feedbackView` / `.sidebar` keys (css-probe consumes #feedbackView) |
| `tools/_keep-important.json` | MEASURED entries for proven-load-bearing Band-2 lines | the other 1082 entries |
| `tools/css-probe.js` | **unchanged** — S13 remains the Band-1 backstop | all 21 states byte-identical |
| `app/style.css`, `app/app.js`, `app/index.html` | **unchanged** (production) | everything |

**Decision D1 — no css-probe state.** css-probe's contract pins literal cascade
values and forbids USED values (`css-probe.js` L18-26); `height:100%` resolves to
a used px that drifts across machines → a css-probe state would be fail-open or
non-deterministic. The witness is intentionally visual-diff + arbiter. *(Forced
by tooling; not a discretionary choice.)*

## 3. Fixture construction

**Decision D2 — synthetic fixed-height injection, not the production path.**
`page.evaluate` builds the exact CSS-targeted DOM directly:

1. `resetLessonChromeState(page)` (clears prior overview/split classes).
2. On `#learnBody`: `classList.add('chapter-overview-active','learn-textbook-active')`.
3. On `#learnExplainScroll`: `classList.add('textbook-mode')` (so the L24576 selector arm also matches); it already carries class `learn-explain-scroll` + id, per index.html L686.
4. `#learnExplainContent.style.display='none'`; `#learnBookOverlay` un-hide (`classList.remove('hidden')`, `style.display='block'`).
5. `#learnBookOverlay.innerHTML = '<div class="textbook-pages-flow">' + N × card + '</div>'`, where card = `<div class="textbook-page-card"><img src="<1×1 data-URI>" style="display:block;width:680px;height:Hpx"></div>` — **fixed H**, no network, instant deterministic layout, mirrors the exact structure `_renderTextbookPages` (app.js L2601) emits.

Rationale: avoids the `/api/section` prelude network, the `loadTextbookPages`
code-normalization, real-scan decode, and the 80/120/360ms scroll-reset timers;
sidesteps the MASK_CSS gap (placeholder is already pixel-neutral) so we never
re-baseline every view. Trade-off: synthetic DOM can drift from production DOM —
mitigated by the cascade-winner sentinel (§5) that fails closed if the Band-2
rule stops matching.

*Rejected alt:* real in-range scans (`b`=58pp / `2.4-2`=13pp) + `await img.decode()`
+ a new scoped MASK_CSS rule. More "realistic" but adds decode non-determinism
and forces a repo-wide re-baseline. Kept as fallback only.

## 4. The two-variant design (the core technical decision)

**Decision D3 — two state variants, because of the min-height/overflow tension.**

`min-height:100%` does work only when the flow content is **shorter** than the
scroll area (it pads the flow *up* to fill). On a maximally-overflowing fixture
it is **inert** — a single tall fixture reads it as "safe to delete" when it is
load-bearing on short content (fail-open for that decl). So:

- **View `NN-textbook-overview-tall`** — content ≫ container (e.g. 4 cards × 1400px ≈ 5600px flow vs ~900px viewport, overflow ≈6×). Witnesses **(a) height:100%** (scroll-cap; arbiter offsetHeight) and **(b) padding-bottom** (scroll to bottom; visible 86→58px whitespace delta). Capture scrolled to bottom + a top capture (or rely on arbiter for the top/height signal).
- **View `NN-textbook-overview-fill`** — content **just under** container (e.g. 1 card sized to ~70% of viewport). Witnesses **(b) min-height:100%** (flow padded up to fill vs content-height; the bg/last-card-bottom gap moves when deleted).
- **Arbiter VIEW `learn-textbook-overview`** covers both DOM states (offset-box, scroll-invariant) for the height/min-height/padding offsetHeight deltas.

*Rejected alt (D3-b):* one tall view only, documenting min-height:100% as
transitively-backstopped. Simpler, but min-height:100% has **no** Band-1/base
backstop (confirmed §2 of the research map) — accepting it unwitnessed re-opens
exactly the fail-open hole this task exists to close. **Recommend D3 (two
variants); flag for review.**

## 5. Fail-closed sentinel (per gate discipline)

Each view's `setup()` asserts, before screenshot, via `assertOrThrow`:
1. `#learnBody` has BOTH `chapter-overview-active` AND `learn-textbook-active` (and not the leaked split class).
2. **Band-2 is the live cascade winner**, not the overview-alone fallback: at the harness viewport, `getComputedStyle('.textbook-pages-flow').paddingBottom` resolves to the Band-2 `clamp(48,8vh,86)` value (≈72px @900px vh), **≠** Band-1's `clamp(32,5vh,58)` (≈45px). This is the discriminating sentinel for decl (b).
3. **Overflow present** (tall variant): `#learnExplainScroll.scrollHeight > clientHeight` by a wide margin (else use-value collapse → vacuous). **Fill present** (fill variant): content height < container so min-height is doing work.
4. (tall) `scrollIntoView` the bottom region + `getBoundingClientRect` `fullyIn` assert (view-14c pattern) before capture, so an off-screen regression fails fast instead of passing vacuously.

A mis-built fixture throws → exit 1. This is the fail-CLOSED property the whole
harness depends on.

## 6. Witnessing theory — what each deletion does

| Decl | Delete → fallback | Detectable signal | Tool |
|---|---|---|---|
| (a) `#learnExplainScroll height:100%` (L24577) | overview-alone `calc(100dvh-60px)` (L23115) | `#learnExplainScroll` offsetHeight delta **iff** 100%-of-parent ≠ calc(100dvh-60px) at the test layout | arbiter |
| (b) `.textbook-pages-flow padding-bottom` (L24599) | Band-1 `clamp(32,58)` (L25143) | ≈27px less bottom whitespace at scroll-end | visual-diff (+ arbiter offsetHeight) |
| (b) `.textbook-pages-flow min-height:100%` (L24598) | none (no Band-1/base min-height) | flow box no longer fills container on `fill` variant | arbiter (+ visual-diff) |

**Two equally-valid outcomes per decl** (both close the gap):
- deletion **detected** → decl is **load-bearing** → add its line to `_keep-important.json` (the "keep-set covering the 2 at-risk decls"); A4 must preserve it via collapse-and-merge.
- deletion **undetected even on the maximal fixture** → decl is **NOCOMP-safe** → A4 may de-double freely; documented in `results.md`.

The fixture content height (N, H) is **tuned empirically** in implementation
until each decl is individually exercised — §6 of implement.md.

## 7. Render-neutrality & scope guards

- **Render-neutral proof** (memory [[reference-visual-diff-baseline-noise]]): prove a *no-op* refactor keeps the new views within their floor by the **stash-trick** (diff report with-vs-without), NOT by chasing literal 0.000%. Per-view `STRICT_FAIL_RATIO` set from the measured baseline-vs-baseline noise of the new view.
- **Additive only**: no production CSS/JS edit; the temp deletions for the fail-closed proof (§6) are **reverted**; Band-2 region byte-identical to `main` at task end.
- **Gates** (`.trellis/spec/css/verification.md`): `npm run check` green; `css-probe --check` byte-identical on all 21 states; every pre-existing visual-diff view within floor; arbiter `--check` clean on existing VIEWs; inline-style audit (note `#learnExplainContent` display is JS-inlined at app.js L2469 — irrelevant here since we don't strip).

## 8. Rollout / rollback

- Pure additive harness change → rollback = delete the new views/VIEW + revert the `_view-important.json`/`_keep-important.json`/`_view-cascade-probe.js` deltas + drop the new baseline PNGs. No production surface touched.
- One PR, `base = main`, scope `css`. Branch suggestion: `a4/s14-tall-witness`.

## 9. Review-gate decisions — RESOLVED 2026-06-29 (FlyM1ss)

1. **D3 two-variant — CHOSEN.** Build BOTH `tall` (height:100% + padding-bottom) and `fill` (min-height:100%) variants. min-height:100% has no Band-1/base backstop, so leaving it unwitnessed would re-open a fail-open hole.
2. **Arbiter cost — ACCEPT with mitigation.** Few tall placeholder cards + `interactions:[{label:'rest'}]` keep the baseline-subtree small.
3. **D2 synthetic fixed-height injection — CHOSEN.** Real-scan path rejected (decode non-determinism + scroll-reset timers + repo-wide MASK_CSS re-baseline); kept only as a documented fallback.
