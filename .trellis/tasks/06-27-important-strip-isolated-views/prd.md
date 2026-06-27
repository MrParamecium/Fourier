# Strip safe `!important` on courseTracker + preference views

> Converted from `docs/PHASE3.6_SPEC.md` (§3 Surfaces 1–3, §6.3 "natural seam",
> §4 verification, §5 risk register) into a Trellis task PRD. This is the next
> tranche of the Phase 3.6 CSS structural collapse, framed as a single
> independently-verifiable unit of work.

## Goal

Remove the **safe (`NOCOMP`) `!important` declarations** and collapse the decorative
doubled-ID prefixes on two DOM-isolated views — `#courseTrackerView` and
`#preferenceView` — in `app/style.css`, with **zero visual regression** proven by
both verification gates. These two views are the lowest-blast-radius `!important`
removal pilots (`#courseTrackerView` 74.9% NOCOMP-safe, `#preferenceView` 69.8%).

## Background / why now

§6.3 of the spec names this "the natural seam to hand back for steering": the
dead-orphan line-reduction vein is exhausted, and the remaining work is the
careful `!important`-strip on DOM-isolated views. It is **line-neutral** (the value
is `!important`-count and doubled-ID-count reduction, not lines) and it **changes
cascade outcomes**, so it requires owner risk-appetite sign-off and per-view
computed-style coverage that does not yet exist.

## Scope

**In scope**
- `#courseTrackerView` declarations classified `NOCOMP` → strip `!important`.
- `#preferenceView` declarations classified `NOCOMP` → strip `!important`.
- De-double the `#XView#XView` prefixes on these two views where collapsing does not change the winner.
- A new per-view css-probe state for each view (open the view, assert-as-entered, probe every property touched by a stripped `!important`).

**Out of scope (do not touch in this task)**
- Any `DEFENSIVE` (load-bearing) `!important` on these views — keep them.
- The §3d learn-view composer chain / cross-file `runtime-collapsed.css` war (separate, hardest tranche).
- `#mistakeNotebookView`, settings, sidebar, and any surface sharing `.app .sidebar …` chains.
- `@layer` migration (a trap while `!important` stands — see `css/cascade-and-collapse.md`).

## Requirements

1. Edit **by selector token** (`#courseTrackerView`, `#preferenceView`), never by banner line range.
2. Strip `!important` **only** from declarations proven `NOCOMP` (no competitor) for these views; never strip a `DEFENSIVE` declaration in isolation.
3. Preserve every load-bearing cascade outcome: for any declaration with a competitor, the effective specificity ordering that produces the current computed value must be unchanged.
4. Add per-view css-probe states that probe **every property touched by a stripped `!important`** (not just the visually obvious one), each with an assert-as-entered guard.
5. Capture `css-probe --baseline` + `visual-diff --baseline` on the pre-change HEAD and commit them **before** editing CSS.

## Constraints

- Both verification gates are mandatory (see `css/verification.md`); css-probe is load-bearing here because the change alters cascade outcomes that pixel-diff can miss.
- The worktree has no `node_modules` — before running the harness: `npm install` then `npx playwright install chromium`.
- `npm run check` must pass.
- No Windows-illegal filenames; do not rename `aquarius_visual_latex_v2` / `AQUARIUS_CONFIG` (irrelevant to CSS but a standing repo rule).

## Acceptance Criteria

- [ ] `#courseTrackerView` + `#preferenceView` `NOCOMP` `!important` declarations removed; count reduction recorded.
- [ ] Decorative doubled-ID prefixes on these two views collapsed where safe; doubled-ID count reduction recorded.
- [ ] New per-view css-probe states exist for both views, each asserting-as-entered, covering every property touched by a stripped `!important`.
- [ ] `css-probe --check` byte-identical (exit 0, no `__MISSING__`).
- [ ] `visual-diff --check` render-neutral on the relevant views (proven via with/without-change report diff, accounting for the text-AA noise floor — see `css/verification.md`).
- [ ] `npm run check` passes; no orphan/empty selector block left behind.
- [ ] No `DEFENSIVE` declaration was stripped (spot-checked against the classification).

## Open questions to resolve in `trellis-brainstorm` (Phase 1)

- Per-instance `NOCOMP` vs `DEFENSIVE` classification for these two views is planning-grade in the spec — does it need a fresh per-instance inventory pass before editing, or is the existing classification trusted?
- Does this tranche ship as its own PR, or accumulate on the `refactor/phase3.6-css-collapse` branch per the "Phase 3.6 ships as ONE massive PR when complete" rule? (Owner decision.)
- Both views in one task, or split into a parent + two children (each view independently verifiable)?

## Planning status

PRD-only so far. This is a **complex** task: `design.md` (probe-state design, exact NOCOMP work-list,
cross-file checks) and `implement.md` (ordered bottom-up edit checklist, baseline→edit→check sequencing,
rollback points) must be produced via `trellis-brainstorm` and reviewed **before** `task.py start`.
