# Implement — feedback permanent guard (D1) + measured floor proof (D2)

Ordered, resumable. All edits scoped by selector token (`#feedbackView`). Execute only after
`task.py start` (status → in_progress). D1 first (durable + the gate for any D2 strip), then D2.

## Phase 0 — worktree prep (once)

- [ ] `npm install`; `npx playwright install chromium`.
- [ ] `node --check tools/css-probe.js`; `node tools/css-probe.js --check` → **clean on HEAD** (confirms the
      pre-change baseline is valid; required before any additive edit). *(Confirmed runnable: css-probe self-spawns
      the bridge and tolerates a missing `app/.env`.)*
- [ ] Record facts: feedback `!important` = 472 (55 distinct properties); all 472 lines in `_keep-important.json`;
      css-probe.js feedback states = 0; L24702 = the shared close-button `border` (do not strip).

## Phase 1 — D1: permanent feedback css-probe guard

- [ ] Read `app/feedback-board.js` `loadFeedbackBoard` (L254) + `app.js` `showFeedbackView` (L4222) to confirm
      the board is server-fetched (`/api/feedback`). **Fixture mechanism = (A) route interception (default):**
      `await page.route('**/api/feedback', r => r.fulfill({ contentType:'application/json',
      body: JSON.stringify(require(FEEDBACK_FIXTURE_POPULATED_PATH)) }))` in `enter()` **before** clicking nav.
      No disk write → no restore. *(Fallback (B): `seedFeedbackFixture` in `enter()` + `restoreFeedbackBoard()` in
      the runner `finally` (L511) + 3 test-utils imports + a filesystem byte-equality assertion in `finally`,
      because `app/users/feedback-board.json` is gitignored. Do NOT use the deleted localStorage option.)*
- [ ] `node tools/_extract-view-important.js` with the in-file `VIEWS` const set to `['#feedbackView']`
      (`_extract-view-important.js:26` — it is a **source constant, not an env var or CLI flag**) → the 55-property
      floor list. *(Optional: the committed `tools/_view-important.json` already carries the feedback prop list, so
      this step can be skipped; if you run it, `git checkout tools/_view-important.json` afterward to avoid committing
      a scratch regen + restore the `.sidebar` key.)*
- [ ] Add `S-feedback-rest` to `PROBE_STATES` in `tools/css-probe.js`, **appended LAST (after `N4`)** since it is
      the first cross-view-navigating state: `enter()` registers the route, clicks `#navFeedbackBtn`, waits for
      `#feedbackView:not(.hidden)` + `#feedbackView .feedback-thread` count > 0, then **`assertOrThrow` a winner
      sentinel** — a real floor `!important` value (tone-lane background / is-left|right justify|transform /
      reply-context border) equals its expected `!important`-won computed value (R8 contract; mirror
      `assertFollowupBarWinner`/`S12`). `probes` cover **all 55** floor-touched properties on representative
      tone/side/reply nodes.
- [ ] Add focused interactive states (`S-feedback-*-hover`/`-focus`) only for controls whose floor `!important`
      could lose to a global interactive rule (mirror the arbiter's load-bearing subset; keep proportionate).
- [ ] `node --check tools/css-probe.js`; `node tools/css-probe.js --baseline` → regenerate `css-probe-baseline.json`.
- [ ] **Additive-only proof:** `git diff tools/css-probe-baseline.json` shows ONLY new feedback keys — no existing
      view value changed. *(This proves no shared-chrome leak within the snapshot; it does NOT prove board restore —
      see below.)*
- [ ] **Restore proof:** mechanism (A) leaves nothing on disk (confirm `git status` shows no tracked edit AND
      `app/users/feedback-board.json` is unchanged/absent). Mechanism (B): the `finally` filesystem assertion must
      pass (byte-equal to pre-run snapshot) — `git status` alone cannot catch this (file is gitignored).
- [ ] **Mutation check:** temporarily delete one floor `!important` in `app/style.css`, run `css-probe.js --check`,
      confirm ≥1 probe flips (the guard actually guards), then `git checkout app/style.css`.
- [ ] Fix the stale docstring in `tools/_view-cascade-probe.js` (header says courseTracker/preference, the
      `VIEWS` comment says settings, and "gitignored `_view-important.json`"; live code is feedback / file is tracked).
- [ ] **Commit checkpoint A** (test-only): `css-probe.js` + `css-probe-baseline.json` + the docstring fix
      (+ extract scratch if regenerated and intentionally kept). No app change. *(Rollback: `git checkout tools/`.)*

## Phase 2 — D2: measured floor proof (fresh-reset arbiter pass)

- [ ] Back up `_keep-important.json` to a **gitignored** path (e.g. `tools/.harness-state/`). Map
      line→selector via `parseDeclarations` on `git show HEAD:app/style.css`. **Derive the carve-out
      programmatically** (15 lines at HEAD — do not hardcode): preserve any feedback keep line whose selector
      (a) names a non-feedback view id (cross-view grouped, e.g. **L24702** `border` shared with learn/topbar/
      settings/preference/courseTracker/mistakeNotebook close-buttons — four already-merged at-floor views), or
      (b) carries a state the arbiter's 9 interactions cannot render — `:active`, `:disabled`, `:focus-visible`,
      `:checked`, `.is-target`, or `:hover`/`:focus` on an element outside {card, primary-btn, secondary-btn,
      refresh-icon-btn, thread-pin, input, textarea, reply-input}. **Evaluate at the DECLARATION level:** a decl
      is carve-out only if NONE of its comma-separated feedback compounds is arbiter-driven (a grouped rule that
      also lists a driven control — e.g. L27170, L27211 — is REACHABLE; a naive per-substring filter wrongly
      gives 21). **Assert the filter outputs exactly 15 carve-out / 457 reachable at HEAD before proceeding.**
      Remove from the keep-set **only the 457 arbiter-reachable feedback lines**; keep all 15 carve-out lines
      throughout. (Rationale: the
      arbiter physically cannot flip a carve-out decl, so a reset-and-regrow would strip it untested — see
      design.md §3; the arbiter's own comment force-keeps the submit `:active`/`:disabled` for this reason.)
- [ ] `node tools/_view-cascade-probe.js --baseline` (feedback `VIEWS[0]`; local, gitignored).
- [ ] Loop to convergence: `node tools/_strip-view-important.js --view=feedback` →
      `node tools/_view-cascade-probe.js --check` → on flips `node tools/_grow-keep-from-report.js` → repeat
      until byte-identical. Record converged stripped/kept counts.

### Branch on the measurement

- [ ] **If converged kept == 472 (expected = 15 carve-out + 457 re-grown reachable):** revert any `style.css`
      change (`git checkout app/style.css`); confirm `_keep-important.json` matches the original 472 set (restore
      the backup if the fresh pass reordered it). **A1 = verified-within-coverage, no strip.** Document the proof
      with the qualifier (the 457 arbiter-reachable decls are reproducibly load-bearing under themes × 5 viewports ×
      9 interactions × populated fixture; the 15 state-gated/cross-view decls are preserved unmeasured; 56 prior
      strips not re-audited). Skip Phase 3.
- [ ] **If converged kept < 472 (a reachable decl did not re-grow):** for each candidate-stripped line, **confirm
      its selector state is arbiter-reachable** — if not, it is a carve-out the filter missed (preserve it; fix the
      filter), never strip it. Strip only confirmed-reachable residual; never the 15 carve-out. Inline-style audit
      (grep all `app/*.js` for `.style`/`.setProperty`/`.cssText`/`setAttribute('style'` of any stripped prop; keep
      those). Confirm each stripped prop's `@media` breakpoints fall within probed viewports {1280,1180,980,820,760}.
      Proceed to Phase 3.

## Phase 3 — gates for a residual strip (only if Phase 2 found headroom)

- [ ] `node tools/_view-cascade-probe.js --check` byte-identical.
- [ ] `node tools/css-probe.js --check` byte-identical (D1's new state guards the stripped props).
- [ ] `npm run pregen:bg-ch1` (or sync `workspace/materials/lesson-cache/`) **before** visual-diff — it fails
      closed on a missing lesson cache.
- [ ] `node tools/visual-diff.js --check` render-neutral on 14/14b + STRICT 14c–14f (report-diff / stash trick;
      text-AA noise floor OK, a feedback spatial delta is not).
- [ ] No orphan/empty selector block introduced; all 15 carve-out decls (incl. L24702) still present and unchanged.

## Phase 4 — finalize

- [ ] `npm run check` passes — its `check` script `node --check`s 53 files **including `tools/css-probe.js`**
      (verified in package.json; CLAUDE.md's "only ws-bridge.js + app.js" one-liner is stale), so it IS the D1
      syntax gate. (`node --check tools/css-probe.js` standalone is a fast pre-check during iteration, not a
      separate required gate.)
- [ ] Re-confirm acceptance criteria in `prd.md` (D1: winner sentinel + 55-prop coverage + mutation check +
      additive-only + restore proven; D2: counts recorded with coverage qualifier; L24702 preserved).
- [ ] Commit to `trial/trellis` (D1 test-only + docstring fix, plus D2 strip + `_keep-important.json` if residual).
      **No PR to main.**
- [ ] `/trellis:finish-work`: report honestly — "feedback floor reproducibly load-bearing at 472 within coverage,
      durable guard added" is the expected, successful outcome; do not manufacture a strip. Spec-update if anything
      was learned (esp. the keep-set/strip-grow loop + additive-only discipline, which currently live only in these
      task docs + tool headers, not in `.trellis/spec`).

## Validation command summary

```bash
npm install && npx playwright install chromium      # once
node tools/css-probe.js --check                     # clean on HEAD before editing
# _extract-view-important.js: edit VIEWS const to ['#feedbackView'] in-file (no flag); optional
node tools/css-probe.js --baseline                  # after adding S-feedback-* (route-intercepted, winner sentinel)
git diff tools/css-probe-baseline.json              # MUST be feedback-only (no-chrome-leak proof, NOT restore proof)
node tools/_view-cascade-probe.js --baseline        # D2 fresh pass (reset ONLY the 457 arbiter-reachable feedback keep lines; preserve the 15 carve-out)
node tools/_strip-view-important.js --view=feedback # loop
node tools/_view-cascade-probe.js --check
node tools/_grow-keep-from-report.js                # on flips
npm run pregen:bg-ch1 && node tools/visual-diff.js --check   # only if residual stripped
node --check tools/css-probe.js && npm run check
```

## Rollback points

- After Phase 1 (checkpoint A): `git checkout tools/` (test-only; mechanism A touches no other file, mechanism B
  must have restored the gitignored board — checkout will not).
- Phase 2/3: `git checkout app/style.css` + restore the gitignored `_keep-important.json` backup.
- Whole task: D1 can stand alone (the durable guard is valuable even if D2 finds nothing).
