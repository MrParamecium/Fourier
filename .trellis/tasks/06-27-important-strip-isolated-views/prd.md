# Permanent `#feedbackView` css-probe guard + measured floor proof (A1 closure)

> **Re-point log** (this Trellis-trial task was calibrated three times; kept legible
> on purpose). Each step was forced by *measuring* against git, not trusting plan prose:
> 1. Seeded as `#courseTrackerView`/`#preferenceView` `!important`-strip — **already merged (PR #106)**; redo = no-op.
> 2. Re-pointed to `#settingsView` — **also already merged (#106 stripped FOUR views: CT 254→52, pref 243→41, settings 100→66, MN 560→254)**; redo = no-op.
> 3. Re-pointed to `#feedbackView` strip completion (A1) — the committed `_keep-important.json`
>    (grown by #118's own arbiter run) currently protects **all 472** remaining feedback declarations
>    and **620/620** sidebar, so a strip *with the current keep-set in place* yields **0**.
>    Owner decision: re-target to the genuinely-undone **harness deliverable + a definitive floor proof**.

## Goal

Deliver the missing **permanent `#feedbackView` computed-style guard** and **measure** (not assume)
where feedback's `!important` floor actually is. Two coupled deliverables:

- **D1 — Durable guard:** add a committed feedback state to `tools/css-probe.js` (currently **0**
  feedback states) on the existing seeded multi-tone board fixture. This is REFACTOR_DONE §A0's
  "Feedback probe state + fixture" — the prerequisite that gates A1 — and the owner-chosen durable
  deliverable. It guards the feedback cascade floor against future regressions permanently.
- **D2 — Floor proof:** run one definitive fresh-reset arbiter pass on feedback — clear only the
  **arbiter-reachable** slice of the keep-set (preserving the 15 decls the arbiter cannot exercise; see
  Constraints), strip-all, grow keep from measured flips to convergence. If it converges back to 472
  (= 15 preserved + 457 re-grown) → the 457 reachable decls are **reproducibly load-bearing within the
  arbiter's coverage matrix** (not "absolute floor") and A1 closes; if a reachable decl fails to re-grow →
  confirm it is genuinely reachable, then strip that residual (render-neutral), completing A1.

## Current state (requirement-bounding facts — re-measured against git HEAD)

Authoritative source: `docs/REFACTOR_DONE.md` §A0/§A1, **not** the frozen `PHASE3.6_SPEC.md`.
Git-measured (`parseDeclarations`, incl. `@media`):

| View | pre-#105 | #106 | now | in current keep-set | status |
|---|--:|--:|--:|--:|---|
| courseTracker | 254 | 52 | 52 | — | DONE #106 |
| preference | 243 | 41 | 41 | — | DONE #106 |
| settings | 100 | 66 | 66 | — | DONE #106 |
| mistakeNotebook | 560 | 254 | 254 | — | DONE #106 |
| feedback | 651 | 528 | **472** | **472 (all)** | #118 stripped 56; rest kept |
| sidebar | 769 | — | 620 | **620 (all; on 617 lines)** | #118 stripped 36; rest kept (out of scope) |

- feedback `!important` = **472** declarations on 472 distinct lines (55 distinct floor-carrying
  properties per `_extract-view-important.js`); all 472 lines are in `_keep-important.json`, so a strip
  with the current keep-set yields **0**. Whether 472 equals the *true* floor is the **hypothesis D2 measures.**
- **What REFACTOR_DONE.md actually says (do not over-read):** §A1 titles `#feedbackView` the
  *"(next target)"* strip and the *"Lowest-risk remaining strip"*, and notes the strippable fraction is
  *"unknown until the arbiter runs the fixture."* (verbatim, REFACTOR_DONE.md L148/L151/L153). It does
  **not** declare feedback at-floor. The "at-floor" reading is *our* keep-set-derived
  hypothesis; D2 exists to confirm or refute it. (Provenance note: the reconcile commit `f4433ec` cited
  in earlier drafts is a *sibling* of HEAD off #118 and is **not checked out on `trial/trellis`** — the
  on-disk `docs/REFACTOR_DONE.md` is the pre-reconcile copy. Read the on-branch file, or merge `f4433ec`,
  before quoting it.)
- `tools/css-probe.js`: **0** feedback states (durable gap confirmed). This is the real undone work.
- Fixture infra EXISTS in `tools/test-utils.js`: `seedFeedbackFixture(FEEDBACK_FIXTURE_POPULATED_PATH)`
  + `restoreFeedbackBoard()` + `tools/fixtures/feedback-board.populated.json` (tone-0..5, is-left/is-right,
  reply-context). Note `is-target` is a **runtime JS class** (applied on reply-click), not encoded in
  the static fixture. visual-diff view 14b uses the same seeding.
- `tools/_view-cascade-probe.js` arbiter: feedback is already `VIEWS[0]` (seeded fixture, 9
  interactions incl. card/primary/secondary/refresh/pin hover + input/textarea/reply focus). Its
  `_view-cascade-baseline.json` is gitignored (local strip gate only).
- `_strip-view-important.js --view=feedback` exists; strips pristine HEAD (`git show HEAD:app/style.css`)
  minus `_keep-important.json` (a flat array of **line numbers**, not selectors — view membership is
  re-derived at runtime via `selector.includes('#feedbackView')`).
- **Arbiter-unreachable carve-out (15 decls — the load-bearing D2 hazard):** the arbiter can only flip a
  decl whose cascade state it *renders* (its 9 interactions = rest + 5 hovers + 3 focuses; no `:active`,
  `:disabled`, reply-click `.is-target`, or hover/focus on other controls). Measured at HEAD, **15 of the
  472** feedback keep lines are arbiter-unreachable: **1 cross-view** grouped rule (**L24702**, `border`,
  shared with `#learnView`/`#topbarCloseBtn`/`#settingsView`/`#preferenceView`/`#courseTrackerView`/
  `#mistakeNotebookView` close buttons), **11 pseudo/runtime-class** decls (submit `:active`/`:disabled`,
  `.is-target`, `.feedback-click-reply:hover/:focus-visible`), and **3 un-hovered** states. A naive D2
  keep-reset would drop these, the arbiter could never re-grow them, and `--view=feedback` would strip them
  untested — regressing four already-merged views (via L24702) and states no gate covers. They MUST be
  preserved by construction — see Constraints / Scope.
- Cross-file isolation: 0 `#feedbackView` refs in `app/css/{runtime-collapsed,ui-friction-v123,inline-styles}.css`
  (all 197 refs are in `app/style.css`) — the strip is genuinely single-file.
- visual-diff coverage: views 14/14b + STRICT (per-view `failRatio: 0.0005`) 14c/14d/14e/14f. The
  `#feedbackView` inner-scroll gap (PR #71) is **resolved** by 14c — visual-diff is no longer blind on
  feedback; the arbiter and visual-diff are now genuinely complementary gates (not "pixel-diff is blind").
- feedback doubled-ID: **1 selector** (`#feedbackView#feedbackView`) — out of scope (see below).

## Scope

**In scope**
- D1: a committed `S-feedback-*` state (rest + the interactive states that matter for the tone-lane /
  is-left|right / reply-context rules) in `tools/css-probe.js`, on the seeded fixture, asserting **the
  live cascade winner** (a real floor `!important` value), not mere thread presence, and probing every
  property the feedback floor touches.
- D1: regenerate `tools/css-probe-baseline.json` **additive-only** (see Constraints).
- D2: a fresh-reset feedback arbiter pass to convergence; record **measured** stripped/kept counts.
- D2 (conditional): if residual NOCOMP is found, strip it (token-scoped, render-neutral) and update
  `_keep-important.json`.
- Cosmetic: correct the **stale docstring** in `tools/_view-cascade-probe.js` (header says
  courseTracker/preference, the `VIEWS` comment says settings; the live `VIEWS[0]` is feedback) while the file is open for D2.

**Out of scope**
- Any feedback `!important` the arbiter proves competitor-backed (the 472) — keep it.
- `.sidebar` strip (620/620 kept, at floor), `#mistakeNotebookView`, A2 doubled-ID tranches, A4 composer chain.
- The 1 `#feedbackView#feedbackView` doubled-ID — **unconditionally out of scope** here (orthogonal to
  the floor proof; track under the A2 doubled-ID tranche).
- **The 15 arbiter-unreachable decls must not be stripped** (cross-view L24702 + state-gated
  `:active`/`:disabled`/`.is-target`/un-hovered); excluded from any D2 strip by construction (see Constraints).

## Constraints

- **Arbiter-unreachable carve-out guard (load-bearing):** when D2 clears the feedback slice of the keep-set,
  the **15 arbiter-unreachable decls must be preserved by construction** — derived programmatically at the
  **declaration level** (selector names a non-feedback view id, OR every comma-separated feedback compound
  carries a state the arbiter's 9 interactions cannot render: `:active`/`:disabled`/`:focus-visible`/`:checked`/
  `.is-target` or hover/focus on an un-driven control; a grouped decl sharing a driven control stays reachable —
  exact filter + the 15/457 assertion in `design.md` §3). The
  arbiter physically cannot flip them, so dropping them strips them untested — regressing four already-merged
  views (via cross-view L24702) and states no gate covers. Only the **457 arbiter-reachable** lines are reset
  and re-derived. Acceptance gate below enforces this. (Method/derivation in `design.md` §3.)
- **D1 fixture lifecycle (requirement; mechanism in `design.md` §2):** D1 is **test-only — no app change.**
  The new state must render the populated multi-tone board *without mutating any tracked file* and must leave
  the repo clean, with **restoration guaranteed by mechanism or by an explicit filesystem byte-equality
  assertion — NOT by `git status`**, because the live board `app/users/feedback-board.json` is **gitignored**
  (so `git status`/`git checkout` cannot catch a missed restore; the additive-only baseline diff proves only
  *no shared-chrome leak*, never restoration). The route-interception-vs-file-swap choice is in `design.md` §2.
- **Additive-only baseline:** before adding D1's state, `node tools/css-probe.js --check` must be clean
  on HEAD; after adding + `--baseline`, `git diff tools/css-probe-baseline.json` must show **only new
  feedback tuples** — zero existing-view value changes. (This proves D1 did not perturb shared chrome
  *within the snapshot*; it does **not** prove the live board was restored — that needs the filesystem
  assertion above.)
- **Both gates for any D2 strip:** arbiter byte-identical + visual-diff 14/14b + STRICT 14c–14f
  render-neutral. The visual-diff `--check` requires the lesson cache — run `npm run pregen:bg-ch1`
  (or sync `workspace/materials/lesson-cache/`) before it, else it fails closed on missing cache.
- Worktree has no `node_modules`: `npm install` + `npx playwright install chromium` before any gate.
- `npm run check` passes — its `check` script `node --check`s 53 files **including `tools/css-probe.js`**, so
  it covers the D1 edit (CLAUDE.md's "only ws-bridge.js + app.js" note is stale; `node --check tools/css-probe.js`
  standalone is just a fast iteration pre-check). Scope by selector token, never line range. Commit to
  `trial/trellis`, no PR to `main`.

## Acceptance Criteria

- [ ] `tools/css-probe.js` has a committed `S-feedback-*` state on the seeded fixture; `enter()` asserts a
      **discriminating floor `!important` value is the live cascade winner** (a tone-lane / is-left|right /
      reply-context value derived from `_extract-view-important.js`), not just `.feedback-thread` count > 0.
- [ ] D1 probes cover **all 55 floor-carrying properties** enumerated by `_extract-view-important.js`
      (its in-file `VIEWS` const set to `['#feedbackView']`) on representative tone/side/reply nodes. **Mutation
      check:** deleting one floor `!important` flips ≥1 probe under `--check` (proves the guard actually guards).
- [ ] `tools/css-probe-baseline.json` regenerated; `git diff` shows **only** added feedback tuples (additive-only proven).
- [ ] `css-probe.js --check` byte-identical; the live board is **restored** (route-interception leaves it
      untouched, or the filesystem assertion confirms byte-equality); `git status` shows no tracked-file edit.
- [ ] Fresh-reset feedback arbiter pass run with the **15 arbiter-unreachable decls preserved** (only the 457
      reachable lines reset/re-derived); **measured** stripped vs kept counts recorded. Result framed honestly:
      == 472 (= 15 carve-out + 457 re-grown) ⇒ "the 457 reachable decls are reproducibly load-bearing under the
      arbiter's coverage matrix; the 15 are preserved unmeasured"; < 472 ⇒ a reachable decl is candidate residual.
- [ ] **Action matches measurement:** the strip applied (if any) equals exactly the measured residual NOCOMP;
      if convergence returns 472, **no `style.css` change is made** (no manufactured strip).
- [ ] If residual stripped: each stripped line confirmed arbiter-reachable first; arbiter byte-identical +
      visual-diff 14/14b/14c–14f render-neutral; inline-style audit done; `_keep-important.json` updated; none of
      the 15 arbiter-unreachable carve-out decls (incl. cross-view L24702) removed.
- [ ] `npm run check` passes; `node --check tools/css-probe.js` passes; no orphan/empty selector block.

## Resolved decisions

- **Target (owner):** D1 permanent feedback probe + D2 floor proof — NOT a blind strip (a current-keep-set strip is a no-op).
- **Deliverable depth (owner, carried):** durable committed guard in `tools/css-probe.js`, not just the scratch arbiter.
- **Fixture mechanism:** default to `page.route` `/api/feedback` interception (no disk mutation → repo stays
  clean automatically); file-swap is the fallback and *requires* an explicit filesystem restore assertion.
- **D2 framing:** "==472" = 15 carve-out (preserved unmeasured) + 457 re-grown reachable; proves
  *reproducible-within-coverage* for the 457, not absolute floor (the 56 prior strips are baked normal in HEAD
  and not re-audited). Report with that qualifier; do not over-claim "PROVEN at floor".
- **Carve-out:** the 15 arbiter-unreachable feedback decls (cross-view L24702 + state-gated
  `:active`/`:disabled`/`.is-target`/un-hovered) are preserved by construction; only the 457 reachable lines
  are reset/re-derived. Derived programmatically, not hardcoded.
- **Landing:** commit to `trial/trellis`; no PR to `main` while Phase 3.6 incomplete.
- **Process guard (lesson, now standing):** before planning ANY surface, `git merge-base --is-ancestor`
  the cited commit AND measure the per-view `!important` count at the merge boundaries yourself; prefer
  `REFACTOR_DONE.md` over the frozen `PHASE3.6_SPEC.md`. This trap mis-aimed the trial three times.

## Planning status

Re-pointed PRD + `design.md` + `implement.md` rewritten and review-hardened twice (page.route fixture
mechanism, 15-decl arbiter-unreachable carve-out, winner-sentinel D1, reproducible-within-coverage D2,
measurable AC1, npm-check corrected). **Complex** task
(harness integration, conditional strip, two gates) — all three artifacts present; ready for owner review
gate, then `task.py start`. Do not begin implementation until approved.
