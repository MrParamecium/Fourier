# A4 precondition: S14 tall-content textbook witness

## Goal

Build the **tall-content combined-state witness** that closes the named S14
coverage gap, so that the later A4 composer task is *allowed* to de-double the
7 Band-2 `#learnBody.chapter-overview-active.learn-textbook-active` doubled-ID
rules (`style.css` ~L24575-24609) without flying blind.

This task **builds and proves a witness only**. It does **not** de-double any
Band-2 rule, does **not** touch the §3d composer war-pairs, and does **not**
strip any `!important`. Those are A4 proper (a separate, later task). Shipping
this witness is the HARD PRECONDITION recorded in `docs/REFACTOR_DONE.md` §A4.

## Background (the gap being closed)

Of the 14 Band-2 occurrences (7 doubled-ID rules) in the combined
overview+textbook state, 12 are already backstopped through a de-double
(Band-1-redundant under the S13 probe, inline-masked, or covered by the
same-element `.learn-explain-scroll` class rule). **Two are not** and are
witnessable by *no current tool* — css-probe, arbiter, and visual-diff all
**use-value-collapse** them on short content:

1. `#learnExplainScroll { height: 100% }` (~L24598)
2. `.textbook-pages-flow { min-height: …; padding-bottom: … }` (~L24598-24599)

They only become observable when the textbook page flow is **tall enough to
overflow** its scroll container. The witness must create exactly that
condition and prove these two decls are observable there.

## Requirements

### R1 — Deterministic tall-overflow fixture
A new harness fixture drives the app into the **real** combined state
`learnBody.chapter-overview-active` + `learnBody.learn-textbook-active`, with a
`.textbook-pages-flow` rendered **tall enough to overflow** `#learnExplainScroll`
at the harness's desktop viewport. Overflow must be deterministic and stable
across runs (no dependence on un-settled async, lazy media, or font swap).

### R2 — Visual-diff witness view + committed baseline
The fixture is wired as a new `tools/visual-diff.js` view with its own
per-view `STRICT_FAIL_RATIO` (set from a measured noise floor, not guessed),
and a committed baseline. `visual-diff --check` passes on the new view at
baseline.

### R3 — Fresh arbiter keep-set covering the 2 at-risk decls
A **freshly re-derived** arbiter keep-set (NOT seeded from any prior
`_keep-important.json`) is captured over this fixture and contains entries that
make the two at-risk decls' load-bearing status determinable — i.e. the decls
now carry a tool witness instead of being `__MISSING__`/collapsed.

### R4 — Fail-closed sensitivity proof (the critical requirement)
Demonstrate the witness can actually **catch the regression it guards**:
temporarily removing each at-risk decl (`height:100%`; `.textbook-pages-flow`
min-height/padding-bottom) must move the witness **above** its `STRICT_FAIL_RATIO`
(visual-diff) and/or change the arbiter verdict. A witness that stays green when
these decls are deleted is fail-open and unacceptable. The proof is recorded
(numbers in `results.md`); the temporary edits are reverted — **nothing in the
Band-2 region is left modified**.

### R5 — Render-neutral, additive-only
Adding the witness changes only harness/tooling + baseline artifacts. No change
to `app/style.css`, `app/app.js`, `app/index.html` production behavior beyond a
test-only entry path if unavoidable (justify in design.md if so). The existing
21 css-probe states stay **byte-identical** (`css-probe --check` unchanged), and
every pre-existing visual-diff view stays within its noise floor.

## Constraints

- **No Band-2 de-double in this task.** De-doubling is A4 proper. Touching the
  Band-2 rules here violates scope.
- **Hard Invariants** (CLAUDE.md): never create Windows-illegal filenames
  (`: | ? * < > "`); do not rename `aquarius_visual_latex_v2` / `AQUARIUS_CONFIG`;
  do not move the root-level JSON map assets; do not delete Chapter-2 figure
  recrops.
- **Lesson-cache truth**: the fixture must render a section the app *actually
  hits* from `<materials>/lesson-cache/`; a cache miss renders "not prepared
  yet" and would defeat overflow. Pick a section with a verified long cache.
- `npm run check` must stay green (it does **not** cover the arbiter/strip
  tools; those are exercised manually per their own runbook).
- Follow the established harness conventions (BrowserContext-level `MASK_CSS`
  via `addInitScript`, `settleLesson`, per-view `STRICT_FAIL_RATIO`).

## Acceptance Criteria

- [ ] **AC1** New visual-diff view renders the combined
  `chapter-overview-active.learn-textbook-active` state with a
  `.textbook-pages-flow` that demonstrably **overflows** `#learnExplainScroll`
  (assert scrollHeight > clientHeight in the enter()/probe, not by eye).
- [ ] **AC2** The new view has a committed baseline and passes
  `visual-diff --check` at a per-view `STRICT_FAIL_RATIO` derived from a measured
  render-neutral noise floor (stash-trick diff, per
  [[reference-visual-diff-baseline-noise]]).
- [ ] **AC3** A fresh arbiter pass over the fixture yields a keep-set in which
  `#learnExplainScroll height:100%` and `.textbook-pages-flow`
  min-height/padding-bottom are present and classified (not collapsed/missing).
- [ ] **AC4** Fail-closed proof recorded: deleting each at-risk decl moves the
  witness above its fail ratio (and/or flips the arbiter verdict); the deletions
  are reverted; Band-2 region is byte-identical to `main` at task end.
- [ ] **AC5** `npm run check` green; `css-probe --check` byte-identical on the
  existing 21 states; every pre-existing visual-diff view within noise floor.
- [ ] **AC6** `docs/REFACTOR_DONE.md` §A4 precondition updated to mark the
  witness built and reference the new view id; the S14 gap entry reconciled.

## Out of scope (explicitly)

- Any Band-2 de-double or §3d composer war-pair reconciliation (A4 proper).
- Any `!important` strip; any change to runtime-collapsed.css values.
- Groups A (close-btn rule) and C (learn-internal tail-IDs) carve-outs.

## Notes

- Sequencing: this witness is mandatory-FIRST within A4; the composer war-pairs
  and the Band-2 strip are blocked on it. See `docs/REFACTOR_DONE.md` §A4.
- Sibling memory: [[feedback-rederive-keepset]] (re-derive, never trust
  "converged"), [[reference-visual-diff-baseline-noise]] (prove render-neutrality
  by stash-diff, not literal 0.000%), [[feedback-reconcile-plans-against-git]].
