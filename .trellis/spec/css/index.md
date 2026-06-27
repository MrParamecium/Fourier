# CSS — `!important` / doubled-ID Collapse

> The durable rules for Phase 3.6 CSS structural collapse. Distilled from
> `docs/PHASE3.6_SPEC.md` and the branch history. This layer governs any edit to
> `app/style.css` or `app/css/runtime-collapsed.css`.

The goal of all CSS-collapse work: **collapse the `!important` wall and doubled-ID
selectors with ZERO visual regression**, proven by computed-style probes (pixel-diff
has documented blindspots). Progress is measured in **`!important`-count and
doubled-ID-count reduction**, not primarily line count (de-doubling is ~0 net lines;
line reduction comes from deleting dead rules).

---

## Guidelines in this layer

| Guide | Read it before |
|-------|----------------|
| [cascade-and-collapse.md](./cascade-and-collapse.md) | Any selector edit — the cascade theory, the `@layer` trap, the scope-by-token rule, the safe/load-bearing classification |
| [verification.md](./verification.md) | **Every** CSS change — css-probe + visual-diff are mandatory gates, not optional |

---

## Pre-Development Checklist (CSS)

- [ ] Captured baseline on `main`/pre-change HEAD: `css-probe --baseline` **and** `visual-diff --baseline`, committed, **then** branched. (You cannot verify byte-identity without a baseline taken before the edit.)
- [ ] Scoped the edit **by selector token** (`#courseTrackerView`, `mistake-*`), **never by banner line range** — several banner spans are mislabeled and interleave unrelated rules.
- [ ] Classified each target declaration: `NOCOMP` (safe in isolation) vs `LOSES` (whole-rule dead) vs `DEFENSIVE` (load-bearing — keep). Only strip `!important` you can prove is not load-bearing.
- [ ] For cross-file pairs (`style.css` ↔ `runtime-collapsed.css`), preserved the invariant **style.css effective specificity > runtime-collapsed effective specificity** (runtime loads last).
- [ ] For dead-CSS deletion, confirmed the ID/class has **0 refs in `app/index.html` AND 0 across all `app/**/*.js`**, and that it is not template-literal-built.

## Quality Check (CSS) — both gates must pass

- [ ] `css-probe --check` is **byte-identical** for every probed (state, selector, property) tuple (exit 0, no `__MISSING__`).
- [ ] `visual-diff --check` is render-neutral (0.000% on the relevant views; sub-0.005% text-antialiasing noise on text-heavy lesson views is tolerable — see verification.md noise floor).
- [ ] For dead-CSS deletes: the **distinct-live-selector-context set-difference** is empty (no live arm lost in a harness-uncaptured state).
- [ ] `npm run check` passes.
- [ ] No empty/orphan selector block (`{` with no preceding selector) left behind.
