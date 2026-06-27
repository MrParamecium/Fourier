# Design — permanent feedback css-probe guard + measured floor proof

Two coupled deliverables. **D1** is the durable, always-valuable artifact; **D2** turns the
keep-set proxy ("all 472 feedback decls are kept ⇒ at floor") into a *measured* fact and strips any
residual it surprises us with. Reference method: PR #106 / #118 empirical loop.

## 1. What changes

| File | Change | Tracked |
|---|---|---|
| `tools/css-probe.js` | **NEW** committed `S-feedback-*` state(s) on the seeded fixture (route-intercepted) | committed |
| `tools/css-probe-baseline.json` | Regenerated **additive-only** (feedback tuples appended) | committed |
| `tools/_view-cascade-probe.js` | Feedback-configured (`VIEWS[0]`); fix stale docstring; no logic change unless D2 needs more interactions | committed |
| `tools/_keep-important.json` | D2: reset ONLY the 457 arbiter-reachable feedback lines; preserve all 15 arbiter-unreachable carve-out decls (cross-view L24702 + state-gated `:active`/`:disabled`/`.is-target`/un-hovered); re-converge (may end identical, == 472 = 15 + 457) | committed |
| `app/style.css` | **Only if** D2 finds residual NOCOMP — strip it, token-scoped, never L24702 | committed |

**Boundaries:** no `.sidebar` / MN / learn-view edits; keep the 472 kept feedback decls; the 1
`#feedbackView#feedbackView` doubled-ID stays (unconditionally out of scope); **L24702 is never stripped.**

## 2. D1 — the permanent feedback css-probe guard

**Why css-probe.js and not just the arbiter:** the arbiter (`_view-cascade-probe.js`) is a *scratch*
tool — its `VIEWS` is reassigned per surface and its baseline is gitignored. `css-probe.js`'s baseline
(`css-probe-baseline.json`) is the committed proof artifact and the durable regression guard. #118 left
0 feedback states there, so the feedback floor is currently unguarded against future edits.

### 2.1 Runner integration (the constraints it imposes)

- The runner enters guest mode + opens a subtopic **once** (`css-probe.js` ~L490), then loops
  `PROBE_STATES`; each state self-navigates in `enter()`. **No existing state does a cross-view
  navigation** — every current state mutates the same lesson page in place. A feedback state is the
  **first** to leave the lesson page, so its `enter()` cannot be copied verbatim from an existing state,
  and feedback states **must be appended LAST** in `PROBE_STATES` (after `N4`) — a learn/band state
  running *after* a feedback nav would find `#learnView` hidden → `__MISSING__`.
- Baseline **fails closed** on `__MISSING__`/`__ABSENT__` (`--baseline` L530-547, `--check` L590-606) —
  so the fixture must reliably render the multi-tone threads before snapshot, or baseline refuses to write.

### 2.2 Fixture lifecycle — RESOLVED (was the one real design fork)

The board is **server-fetched**, not localStorage-backed: `app/feedback-board.js` `loadFeedbackBoard()`
(L254-265) does `fetch(\`${API_BASE}/api/feedback\`)` then `renderFeedbackBoard(data.items)`, and
`showFeedbackView()` (`app.js` L4222-4238) **always re-runs `loadFeedbackBoard()` on navigation**. So any
pre-injection (localStorage or an early `renderFeedbackBoard` call) is clobbered by the navigation fetch —
the earlier-drafted "inject via localStorage / app accepts an injected board source" mechanism is
**infeasible and is deleted.** The viable mechanisms:

- **(A) Route interception — DEFAULT.** In `enter()`, *before* clicking `#navFeedbackBtn`, register
  `await page.route('**/api/feedback', r => r.fulfill({ contentType: 'application/json',
  body: JSON.stringify(boardJson) }))` where `boardJson` is the parsed fixture payload — `enter()` loads it
  by importing `FEEDBACK_FIXTURE_POPULATED_PATH` from `test-utils.js` (one import) or `require`-ing
  `tools/fixtures/feedback-board.populated.json` directly. (The bridge's GET `/api/feedback` actually maps
  items through `publicFeedbackItem` + `createdAt`-sort before serving; the raw fixture carries every field
  `renderFeedbackBoard` reads and is already `createdAt`-descending, so it renders identically — no mapping
  needed in the stub.) The **production** `loadFeedbackBoard → renderFeedbackBoard` path then runs normally
  against the intercepted response. **No on-disk file is touched → the repo (`app/users/`, `tools/fixtures/`)
  stays clean automatically → there is no restore step and no restore failure mode.** Set the route before
  nav; since feedback states are last and learn states never fetch `/api/feedback`, leaving the route
  registered is harmless (optionally `page.unroute` at state end).
- **(B) File-swap — FALLBACK (proven; the arbiter uses it).** Call
  `seedFeedbackFixture(FEEDBACK_FIXTURE_POPULATED_PATH)` in `enter()` before nav, and add
  `restoreFeedbackBoard()` to the runner's existing `finally` (`css-probe.js` L511, beside
  `server.kill('SIGTERM')` L513) plus the three test-utils imports (`seedFeedbackFixture`,
  `restoreFeedbackBoard`, `FEEDBACK_FIXTURE_POPULATED_PATH`). **Mandatory if chosen:** an explicit
  **filesystem assertion** in `finally` after restore — read `app/users/feedback-board.json` and assert it
  is byte-equal to its pre-run snapshot (or absent if it did not exist), failing loudly otherwise — because
  the file is **gitignored** and a missed restore is invisible to `git status` and to `git checkout`.

Default to (A): it removes the restore question entirely. (B) exists only if route interception proves
fragile against the app's fetch path.

### 2.3 Winner-sentinel assertion (R8 — non-negotiable)

`css-probe.js`'s core contract is that each `enter()` asserts a **discriminating computed SENTINEL value**
proving the load-bearing rule is the **live cascade winner** *before* any probe is trusted —
`assertFollowupBarWinner` checks `min-height: 152px`; `S12` checks the glass token `253, 224, 71` and
`border-radius: 24px`. A **presence-only** assert (`.feedback-thread` count > 0) violates this: the baseline
could bake an *inactive or wrong* winner and `--check` would forever-pass a broken floor (**fail-open**) —
exactly the "looks-done but isn't load-bearing" trap. So `S-feedback-rest.enter()` must, after render,
`assertOrThrow` that a real floor `!important` declaration won — e.g. a tone-N lane `background`/
`background-image`, an `is-left`/`is-right` `justify-content`/`transform`, or a `reply-context` `border` —
equals its expected `!important`-won value, with the sentinel derived from the `_extract-view-important.js`
output so it pins an actual load-bearing decl.

### 2.4 Coverage

- **Properties:** probe **all 55** floor-carrying properties reported by `_extract-view-important.js`
  (its in-file `VIEWS` const set to `['#feedbackView']`) on representative tone/side/reply nodes, plus layout staples.
- **Interaction states:** the floor's competitors live on tone lanes / is-left|right / reply-context (rest)
  and on control `:hover`/`:focus`. Mirror the load-bearing subset as separate states
  (`S-feedback-rest`, plus hover/focus states only for controls whose floor `!important` could be lost to a
  global interactive rule). Keep it proportionate — the arbiter remains the exhaustive strip gate;
  css-probe.js is the durable *guard*.

### 2.5 Additive-only baseline discipline — what it does and does NOT prove

`css-probe.js --check` clean on HEAD → add state → `--baseline` → `git diff tools/css-probe-baseline.json`
must show **only new feedback keys**. **It proves:** the new state did not perturb any *other* state's
snapshot (no shared-chrome leak *within the captured computed styles*). **It does NOT prove** the live board
was restored: every existing PROBE_STATE is a learn-view state that never fetches `/api/feedback`, so a
left-seeded board cannot change any existing probe value — the diff is clean either way (and feedback rows
are new keys by construction, so the diff is near-tautologically additive). Restoration is guaranteed by
mechanism (A leaves nothing on disk) or asserted explicitly (B's filesystem check), **not** by this diff.

## 3. D2 — measured floor proof (fresh-reset arbiter pass)

The current `_keep-important.json` already lists all 472 feedback lines, so a strip with it in place is a
no-op. To MEASURE the floor (vs. inherit #118's conclusion), reset and re-derive — **but only the subset
the arbiter can actually exercise.**

**The carve-out (the load-bearing generalization of the L24702 hazard):** the arbiter can only flip a
declaration whose cascade state it *renders*. Its 9 feedback interactions are `rest` + hover on
{card, primary-btn, secondary-btn, refresh-icon-btn, thread-pin} + focus on {input, textarea, reply-input}
— it has **no** `:active`, `:disabled`, reply-click (`.is-target`), or hover/focus on any other control.
A keep line whose selector carries such a state therefore **can never flip**, so a reset-and-regrow would
drop it and never re-add it → it gets stripped, untested. Measured against HEAD, **15 of the 472** feedback
keep lines are arbiter-unreachable and MUST be preserved by construction:

- **1 cross-view** grouped rule — **L24702** (`border`), shared with `#learnView`/`#topbarCloseBtn`/
  `#settingsView`/`#preferenceView`/`#courseTrackerView`/`#mistakeNotebookView` close/back buttons.
  Dropping it lets `--view=feedback` strip a `!important` shared with four already-merged at-floor views.
- **11 pseudo-class / runtime-class** decls the arbiter cannot drive — submit `:active` (L25240) +
  `:disabled` (L25244-47), `.is-target` (L27727/27728/27731), `.feedback-click-reply` `:hover`/`:focus-visible`
  (and the related state rows the programmatic filter finds). The arbiter's own comment (`_view-cascade-probe.js`
  L99-102) confirms it deliberately does **not** probe submit `:active`/`:disabled` (synthetic events gave
  false positives) — they are force-kept by `_keep-important.json` precisely because it can't measure them.
- **3 un-hovered hover/focus** states on controls outside the interaction set.

Procedure:

1. Snapshot the current keep-set (to a **gitignored** path). Map line→selector via `parseDeclarations` on
   pristine HEAD (`git show HEAD:app/style.css`). **Derive the carve-out programmatically** (do not hardcode
   the 15 lines): a feedback keep line is carved out (preserved) if its selector (a) names a non-feedback
   view id (cross-view grouped, e.g. L24702), or (b) contains a state the arbiter's 9 interactions do not
   render — `:active`, `:disabled`, `:focus-visible`, `:checked`, `.is-target`, or a `:hover`/`:focus` on an
   element not in {card, primary-btn, secondary-btn, refresh-icon-btn, thread-pin, input, textarea,
   reply-input}. **Evaluate reachability at the DECLARATION level, not per comma-part:** a decl is carved out
   only if NONE of its comma-separated feedback compounds is arbiter-driven — a grouped rule that *also* lists
   a driven control (e.g. L27170 groups `.feedback-input/.feedback-textarea/.feedback-reply-input:focus`;
   L27211 groups `.feedback-primary-btn/.feedback-secondary-btn:hover`) is REACHABLE and stays in the 457. (A
   naive per-substring reading wrongly carves out 21; the correct decl-level filter yields exactly **15 carve-out
   / 457 reachable** at HEAD — verify this number.) Remove **only the 457 arbiter-reachable feedback lines** from
   the keep-set; keep all 15 carve-out lines throughout.
2. `_view-cascade-probe.js --baseline` (feedback `VIEWS[0]`, local/gitignored).
3. Loop: `_strip-view-important.js --view=feedback` → `--check` → `_grow-keep-from-report.js` on flips →
   repeat until byte-identical. The converged keep-set = the 15 carve-out + the re-grown reachable subset =
   the **measured** load-bearing set for the arbiter-reachable states.
4. Compare converged count to 472 (expected = 15 carve-out + 457 re-grown reachable):
   - **== 472 (expected):** every arbiter-reachable feedback decl re-grew; the 15 state-gated/cross-view
     decls are **preserved by construction (neither #118 nor D2 can measure them).** The 457 are
     **reproducibly load-bearing under the arbiter's coverage matrix** (see §3.1 — *not* "absolute floor").
     No `style.css` change. Restore keep-set (identical except possibly re-ordered). A1 closes as
     "verified-within-coverage." Record the proof.
   - **< 472:** the delta is a *reachable* decl that genuinely did not flip — candidate residual NOCOMP.
     Before stripping, **confirm its selector state is arbiter-reachable** (else it is a carve-out the filter
     missed — preserve it, fix the filter). Keep only confirmed-reachable strips (render-neutral), gated by
     D1's new state + the arbiter + visual-diff. Record stripped count.
5. **Inline-style audit** (if any residual stripped): grep **all `app/*.js`** (not only
   `feedback-board.js` + app.js feedback code) for `.style`/`.setProperty`/`.cssText`/`setAttribute('style'`
   writes of a stripped prop; keep those (`!important` > inline > normal). Confirm every feedback
   `!important` `@media` breakpoint falls within the arbiter's probed viewports {1280,1180,980,820,760}; a
   rule gated below 760 or between bands would be unprobed — add a band or document the gap before stripping.

### 3.1 What D2 proves — and its honest limits

D2 re-runs the **identical** arbiter as #118: same fixture (`feedback-board.populated.json`), same
THEMES{dawn,dusk,dark} × VIEWPORTS{1280,1180,980,820,760} × the same 9 interactions, with `PROP_LIST`
rebuilt from the same `#feedbackView` extract. So "==472" proves **determinism + reproducibility +
load-bearing within this coverage matrix** for the **457 arbiter-reachable** decls — *not* an absolute
floor, and *not* a re-measurement of the 15 carve-out decls. Three documented limits:
(a) the **15 carve-out** decls (`:active`/`:disabled`/`.is-target`/un-hovered states + the L24702 cross-view
rule) are **preserved by construction, never measured** — the arbiter can't render their state, so D2 takes
#118's keep on faith for them (this is why §3's reset must exclude them — see the carve-out above);
(b) a competitor gated on a state **outside** the matrix is invisible (exactly how the `#feedbackView`
empty-board flip slipped the probe in PR #71 and was caught only by visual-diff);
(c) the 56 already stripped by #118 are baked **normal** in HEAD, and `_strip-view-important.js` operates on
`git show HEAD:app/style.css`, so D2 **cannot re-audit** whether any of the 56 was load-bearing — its
universe is only the 472, and the converged count cannot exceed 472. **Honest framing:** report "the 457
arbiter-reachable feedback decls are reproducibly load-bearing under {themes × 5 viewports × 9 interactions ×
populated fixture}; the 15 state-gated/cross-view decls are preserved unmeasured; the 56 prior strips are not
re-audited." To add genuine marginal coverage over #118, optionally widen one axis (e.g. add `:active`/
`:disabled`/`.is-target` interactions so part of the carve-out becomes measurable, a sub-760 viewport band,
or the empty-board state) — but that is enhancement, not a blocker for the proof as scoped.

## 4. Gates, rollback, tradeoffs

- **Gates:** D1 — `css-probe.js --check` byte-identical + additive-only `git diff` + (mechanism B only)
  filesystem restore assertion + the mutation check (deleting one floor `!important` flips ≥1 probe).
  D2 strip (if any) — arbiter byte-identical + visual-diff 14/14b + STRICT 14c–14f (`npm run pregen:bg-ch1`
  first — visual-diff fails closed on a missing lesson cache).
- **Rollback:** all deliverables are per-file `git checkout`. D1 is test-only (no app change) → trivially
  safe; `git checkout tools/` reverts it (mechanism A touches no other file; mechanism B's restore must have
  run, since the gitignored board is not reverted by checkout). D2 touches `style.css` only if residual found
  → `git checkout app/style.css` reverts. The keep-set backup must live in a **gitignored** path (e.g.
  `tools/.harness-state/`), never committed.
- **Tradeoff accepted:** keeping BOTH the scratch arbiter (exhaustive strip/proof gate) and the permanent
  css-probe state (durable but static guard) — each covers the other's weakness (arbiter too heavy to keep;
  css-probe too static to gate a strip). Matches the #106/#118 precedent + the owner's durable-guard choice.
- **Honest-outcome rule:** if D2 measures == 472, the task's headline result is "feedback floor verified
  reproducible-within-coverage; no strip" + the new permanent guard. That is a real, valuable outcome — not a
  failure — and must be reported as such (no manufacturing a strip to look productive).
