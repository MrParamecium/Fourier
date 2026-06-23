# Visual-diff harness gap — opened 2026-06-23 (PR #71), RESOLVED 2026-06-23

## Status

**Resolved 2026-06-23** by adding view 14c
(`14c-feedback-board-thread1-contexts`) and per-view strict thresholds in
`tools/visual-diff.js`. Direct Playwright computed-style probes are NO
LONGER load-bearing for #feedbackView cascade work — the harness now
catches the §3a.i class of regression. This document is kept as the
written record of the diagnosis; do NOT delete (the diagnosis informs
future view expansions where cascade-relevant chrome may sit inside an
inner `overflow:auto` container).

## Original symptom

`tools/visual-diff.js --check` reported 0/1024000 pixel diff on
`14b-feedback-board-populated` EVEN WHEN
`.feedback-reply.is-left/.is-right .feedback-reply-context` border-color
shifted from `rgba(var(--author-rgb), 0.22)` (tone-tinted) to
`rgba(52, 211, 153, 0.34)` / `rgba(244, 114, 182, 0.32)` (lane-color
green/pink) — the §3a.i regression that slipped through two `--check`
runs (PR #71, commit bc03542 → restored in 8d8bce6).

A diagnostic magenta + yellow border on `.feedback-reply-context` also
slipped past as 0% diff. A second-source Playwright `getComputedStyle`
probe via `playwright-core` confirmed the live page DID render the
modified CSS, so the bug seemed to live "between `page.click(...)` and
`page.screenshot(...)`" — initial guesses pointed at Chromium HTTP cache,
CSSOM staleness, or playwright vs playwright-core stylesheet behavior.

**All those guesses were wrong.**

## Actual root cause

`page.screenshot({fullPage:false})` clips to the 1280×800 viewport.
`page.screenshot({fullPage:true})` extends to the document scrollHeight
— which on view 14b equals the viewport exactly (`document.documentElement
.scrollHeight === 800`). The bug is that `.feedback-reply-context` lives
inside `#feedbackList.feedback-list { overflow: auto }` — an **inner
scroll container** orthogonal to document-level scroll.

After view 14b's setup clicks
`article[data-feedback-id="fb_thread_fixture_02"] [data-feedback-reply-anchor="thread-body"]`
to apply `.feedback-thread-body.is-target`, Chromium's default
`scrollIntoViewIfNeeded` on the click target leaves `#feedbackList` at
`scrollTop=1935 / scrollHeight=2463 / clientHeight=528` — i.e. thread 2
in view at the bottom, thread 1 (with Bravo's `.is-left` and Charlie's
`.is-right` `.feedback-reply-context`) scrolled OFF the top. The
contexts' `getBoundingClientRect()` reads `top ≈ -1072` and `top ≈ -912`
respectively. They are painted by Chromium (computed style is current,
which is why the diagnostic probes saw the magenta value), but they
fall OUTSIDE the 1280×800 capture region. Neither `fullPage:false` nor
`fullPage:true` catches them.

The diagnostic probe (lives at `tools/_probe-harness-gap.js`, kept for
re-use) confirmed: with `scrollIntoView({block:'center'})` on the first
`.feedback-reply-context` AND a correctly-specified (1,4,0) magenta
override, the viewport screenshot paints 4234 magenta + 7608 yellow
pixels. The harness mechanism is fine — it was simply pointed at the
wrong region.

## What broke during the original investigation

Two false leads slowed diagnosis:

1. **`fullPage:true` looked like the obvious fix.** It isn't — document
   scrollHeight equals the viewport, so fullPage and viewport screenshots
   produce identical bytes. Only inner-scroll-container content was
   hidden.
2. **`addStyleTag` with `#feedbackView .feedback-reply-context` had
   specificity (1,0,1) — losing to L34743/L34744's (1,4,0).** A magenta
   override applied via that selector returned `borderColor: rgba(45,212,
   191, 0.22)` (unchanged) in `getComputedStyle`, suggesting CSS wasn't
   loading. The probe was overridden at the cascade level, not lost to
   caching. The earlier playwright-core diagnostic
   `/tmp/probe_feedback_context.js` used inline style attribute writes
   (always wins) so it confirmed Chromium parsed CSS correctly — without
   surfacing the specificity-ladder pitfall.

## The fix

**`tools/visual-diff.js`:**

1. Added `14c-feedback-board-thread1-contexts` view immediately after
   view 14b on Page B. The setup:
   - Re-applies `.feedback-reply.is-target` on Charlie's reply (view 14b's
     thread-2-body click had transferred `.is-target` away from
     Charlie — `setFeedbackReplyTarget` allows only one).
   - Calls `target.scrollIntoView({block:'center', inline:'center',
     behavior:'instant'})` on the first `.feedback-reply-context`
     (Bravo's `.is-left`). At ~25px tall and ~160px between the two
     contexts, both land fully inside the 800px viewport.
   - Asserts BOTH contexts return `fullyIn === true` via
     `getBoundingClientRect()` against `window.innerHeight/innerWidth`
     so a future layout regression that pushes them out fails
     LOUDLY instead of producing a vacuously-passing screenshot.

2. Added `STRICT_FAIL_RATIO` lookup keyed on `view.name`. Default
   `FAIL_RATIO` stays at 0.005 (0.5%). View 14c uses 0.0005 (0.05%) —
   measured baseline-vs-baseline noise on this view is 0 pixels (no
   animated regions; MASK_CSS already covers the
   `.feedback-thread-meta` / `.feedback-reply-meta` timestamps that
   would otherwise drift). The §3a.i regression produces 1002/1024000
   = 0.098%, which is 2× the strict threshold — clear fail with no
   flake margin sacrificed.

3. Report writer extended to include the per-view threshold column so
   future readers can see which views are running tight.

## Validation

| Scenario                                          | View 14b              | View 14c                       |
| ---                                               | ---                   | ---                            |
| Clean tree (load-bearing fix in place)            | 0.000% pass           | 0.000% pass                    |
| §3a.i regression reverted (L34743/L34744 deleted) | 0.000% pass (gap!)    | 0.098% **fail** at 0.050%      |
| 3 sequential --check runs on clean tree           | 0/3 flake             | 0/3 flake                      |

The harness now catches the §3a.i class of regression. View 14b's
0.000% on the regression is the original gap reproducing — preserved
intentionally so any future "harness regression" is easy to spot.

## What this enables downstream

Re-opens cascade-collapse work on `#feedbackView` that was blocked since
PR #71:

- **§3b.i (feedback-board banner consolidation, ~80 lines).** Tripled
  `::before` rule blocks at L34909-L34923 / L34992-L35006 /
  L38513-L38527 + duplicated tone-variable declarations at
  L34870-L34881 vs L34944-L34955 can now be merged with pixel
  verification.
- **§3a.i forward cleanup (~22 lines).** Adversarial-review-flagged
  tone-0..5 `--author-rgb` / `--author-ink` triplicate at
  L37980-L37991, `.feedback-reply-meta` tone-aware at L38006, and
  selector-only deletes in L34751-L34762 are recoverable now that
  view 14c covers their cascade.

## Latent-gap audit needed (followup, not blocking)

Other harness views may have the same inner-scroll problem. **Likely
candidates to audit** before any cascade-collapse work touches their
surfaces:

- `12-preference-page` — long form; §3b.iv state-variant collapses on
  `.preference-profile-preview` (18×), `.preference-preview-card`
  (14×), `.preference-primary-btn` (10×) need verification. If the
  default 12 view shows only the top of the page, hover/focus state
  expansions of those rules may be hidden.
- `13-course-tracker` — `.course-tracker-timeline` likely scrollable;
  course timeline cards beyond the first ~6 may be off-screen.
- `03b-mistake-notebook-open-case` — `.mistake-workspace` has a
  multi-column layout; column-internal scroll likely.
- `24-answer-workspace` — `#answer .answer-body` may scroll.

The mitigation pattern is the same: `scrollIntoView` on the
cascade-relevant target + per-view strict threshold + assertion that
the target lands fully inside the viewport. Add views with `b`/`c`
suffixes (`12b-preference-state-variants`, `13b-...`) rather than
overloading the existing view.

## Diagnostic re-use

`tools/_probe-harness-gap.js` is kept in tree. To diagnose a future
"--check passes but the regression slipped" suspicion:

1. Add a probe variant for the suspected view's setup.
2. Probe (a) `getBoundingClientRect()` of the cascade-relevant
   selectors vs `window.innerHeight/innerWidth`, (b) the ancestor
   chain looking for `overflow:auto|scroll`.
3. If any cascade-relevant selector has `top < 0` or `top > viewport
   height`, the harness needs a new view that scrolls them into the
   capture region.
