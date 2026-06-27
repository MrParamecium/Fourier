# Verification Protocol (mandatory for every CSS change)

> Two complementary gates: **css-probe** (property identity) + **visual-diff**
> (spatial identity). Neither alone is sufficient. Distilled from
> `docs/PHASE3.6_SPEC.md` §4 and the branch history.

## Why pixel-diff alone is insufficient

- **Off-screen / clipped chrome**: `page.screenshot({fullPage:false})` clips to 1280×800; a regression painted outside the captured region passed at 0px through two `--check` runs (PR #71 precedent).
- **Sub-threshold property swaps**: a cascade flip (`min-height:152→112`, `radial-gradient→flat`) can dirty fewer pixels than even the 0.05% strict threshold when the element is clipped or the delta is low-contrast alpha-on-glass.
- **`opacity:0` / pseudo-element states**: `::before`/`::after` glass overlays and elements resting at `opacity:0` (e.g. turner-content) are invisible to pixelmatch — css-probe (computed-style) is mandatory there.

## css-probe — property identity

`tools/css-probe.js` mirrors `visual-diff.js`'s `--baseline` / `--check` lifecycle; output is a JSON snapshot diff,
not PNG. Artifacts: `tools/css-probe-baseline.json` (committed proof artifact) + `tools/css-probe-report.md`.

- Data structure: `PROBE_STATES = [{ state, enter(page), probes: [[selector, pseudo, property], …] }]`.
- Each `enter()` MUST **assert-as-entered** — prove the gated rule actually matches (e.g. `panelFocus==='qa-wide'` AND chat not collapsed AND `#learnChatCol` display ≠ none) — **before** snapshotting, or the probe reads an inactive rule and proves nothing.
- Snapshot: `getComputedStyle(el, pseudo).getPropertyValue(prop)` for every tuple; missing element → `__MISSING__`.
- `--baseline` writes the snapshot (commit BEFORE touching CSS); `--check` compares **byte-identical**, exits 1 on any string diff or `__MISSING__`, reporting `(state, selector, property, before → after)`.
- `calc()` / `min()` resolve to different px at 1280-width — exactly what distinguishes a 12-ID winner (`calc(100%-36px)`) from an 8-ID one (`min(820px,…)`).
- For `:focus-within` / animation states, freeze with `* { animation: none !important }` before snapshot OR probe `animation-name` (stable string).

**Adding a new probe state** (e.g. for a per-view `!important` strip): add a `PROBE_STATES` entry whose `enter()`
opens the view and asserts it is active, and list **every property touched by a stripped `!important`** (not just
the visible pixel). State-setting code lives at `app.js` L2686-2738 (`openLearnMode` / `applyLearnPanelFocusState`)
and L3990-3992 (`is-chat-active`); DOM IDs at `index.html` L655/674/713/732/760/1495.

### Authoring a cross-view probe state (the `#feedbackView` precedent)

Every pre-existing probe state mutates the **same lesson page** the runner opens once at startup. A state that
**navigates to a different top-level view** (the feedback board was the first such state added) carries four extra
contracts, learned building the permanent `#feedbackView` floor guard:

1. **Append it LAST in `PROBE_STATES`.** The runner enters guest mode + opens a subtopic once, then loops the states
   in array order. A cross-view-nav state hides `#learnView`; any in-lesson state running *after* it reads
   `__MISSING__` and the run fails closed. All cross-view states go after the last in-lesson state (`N4`).
2. **Assert a WINNER sentinel, not presence.** The `enter()` assert-as-entered must pin a **discriminating floor
   value the `!important` actually wins** — e.g. `getComputedStyle(isLeftBefore,'::before').left === '-5px'` (the
   `!important` rule) vs the base `-9px` it beats — NOT a presence check like `.feedback-thread count > 0`. A
   presence assert **fails open**: the baseline bakes whatever value is live (even a broken or inactive floor) and
   `--check` forever-passes it. Derive the sentinel from `_extract-view-important.js` output so it pins a real
   load-bearing decl that has a known competitor.
3. **Server-fetched data → `page.route` interception, never localStorage.** If the view re-fetches its data on every
   navigation (feedback: `showFeedbackView()` → `loadFeedbackBoard()` → `fetch('/api/feedback')`), any localStorage
   or pre-render injection is clobbered by the nav fetch. Register
   `await page.route('**/api/<endpoint>', r => r.fulfill({ contentType:'application/json', body: JSON.stringify(fixture) }))`
   **before** the nav click. This touches no disk, so there is **no restore step and no restore failure mode.**
4. **Settle hover/focus transforms before snapshot.** A `:hover`/`:focus` state whose floor decl carries a
   `transition` reads **mid-tween** at snapshot (`translateY(-0.9px)` instead of the resting `-2px`). Wait past the
   transition duration, then `el.getAnimations().forEach(a => a.finish())` + a double-`requestAnimationFrame` before
   probing — distinct from the `animation:none` freeze used for CSS `@keyframes` states above.

> **Additive-only ≠ restore proof.** After adding a state, `git diff tools/css-probe-baseline.json` showing only the
> new keys proves *no shared-chrome leak within the snapshot* — it does **NOT** prove any seeded fixture was
> restored. A view's live data file may be **gitignored** (feedback: `app/users/feedback-board.json`), so a missed
> restore is invisible to `git status` and `git checkout`. Guarantee restoration by *mechanism* (route interception
> writes nothing) or by an explicit filesystem byte-equality assertion — never by `git status`.

> **Gotcha — `_extract-view-important.js` writes its output.** Running it to read a view's floor property list
> **overwrites `tools/_view-important.json`** as a side-effect (and a fresh extract may differ from the committed
> copy — e.g. `.sidebar` 656→620). For inspection, read its stdout; after any intentional-or-accidental regen,
> `git checkout tools/_view-important.json` to keep the change set scoped — `css-probe.js` consumes only the
> `#feedbackView` key, so the `.sidebar` drift is correctness-neutral for a feedback task.

> **Gotcha — regenerating `_view-important.json` after a strip silently shrinks css-probe coverage.**
> `css-probe.js` derives its rest-probe set from `_view-important.json['#feedbackView']`. After a strip removes
> `!important` from a decl, a fresh `_extract-view-important.js` run drops that decl from the floor list — so
> re-extracting **and** re-baselining together would silently remove that property's probe from the durable guard
> (e.g. the 7 D2 `border-radius` probes). The committed stale `_view-important.json` is currently **fail-closed
> and beneficial** (it keeps those probes; a run missing them yields `__MISSING__` ≠ baseline → `--check` FAIL).
> **Rule:** never regenerate `_view-important.json` + re-baseline `css-probe` in the same step without confirming
> every previously-stripped property still appears in the rest-probe set.

## visual-diff — spatial identity (catch-all)

`visual-diff --check` is the layout/positioning catch-all. 35 views cover live chrome. Render-neutral = 0.000% on
the relevant views.

**Noise floor caveat (do not chase literal 0.000% everywhere):** `--check` is NOT 0.000% on every view even for a
render-neutral change. Text-heavy lesson views carry ~0.061% text-antialiasing noise (view 22 ≈ 0.127%, view 12 ≈
0.004%), well under the strict threshold. To prove render-neutrality of a change, **diff the report with-vs-without
your change** (stash trick), not by demanding literal 0.000%.

## The set-difference invariant (for dead-CSS deletion)

For any dead-CSS deletion, the definitive viewport-independent safety check is:

```
the SET of distinct live-selector-contexts (e.g. grep '#liveId' | sed 's/[,{].*//' | sort -u)
must be UNCHANGED before/after the edit
```

This catches loss in harness-uncaptured states (e.g. `data-panel-focus="lecture-full"`) that a raw `-`-line diff
or pixel-diff will MISS. Run it for every live sibling of a deleted orphan.

## Gates for a residual per-view `!important` strip (all five — none sufficient alone)

When a measured-floor pass (cascade-and-collapse.md Rule 6) finds strippable residual, a render-neutral strip
needs **all five**:

1. **Cascade competitor analysis** — the only gate that covers *unprobed* states. For each stripped decl,
   enumerate every same-property rule on that element (`parseDeclarations` from `find-dead-redeclarations.js`
   on `git show HEAD:app/style.css`) and confirm the post-strip winner resolves the **same value**: `NOCOMP`
   (sole rule), higher-specificity-same-value normal rule, or a surviving same-value `!important` competitor.
   **CRITICAL: confirm every competitor is top-level (`ctx==""` — no `@media`, no extra state pseudo).** Only
   then is neutrality viewport- and state-independent rather than merely true at the probed states. A
   competitor in an `@media` block, or with a different value, means NOT neutral → keep the `!important`.
2. **arbiter `_view-cascade-probe.js --check`** byte-identical (empirical, 240 states).
3. **css-probe `--check`** byte-identical against the **committed pre-strip baseline** — the baseline taken
   *before* the edit is what makes this a true before/after computed-value comparison (the durable guard).
4. **visual-diff `--check`** render-neutral on the view's STRICT (0.050%) states. Run `npm run pregen:bg-ch1`
   first — visual-diff fails closed on a missing lesson cache.
5. **Inline-style audit** — grep all `app/*.js` for `.style` / `.setProperty` / `.cssText` /
   `setAttribute('style'` writing the stripped property on the affected elements (a JS inline write would
   interact with the cascade change), and confirm the stripped prop's `@media` breakpoints fall within the
   probed viewports {1280,1180,980,820,760}.

> **Worked example (`#feedbackView` D2):** stripped 7 `border-radius !important` (4 NOCOMP, 1
> higher-spec-same-value, 2 same-value-`!important`-competitor; **all competitors top-level**). All five gates
> green; feedback `!important` 472 → 465. The 2 same-value-`!important` cases are the subtle ones: removing
> `!important` drops the rule out of the important tier, but the cascade then picks the *later of the equal-spec
> surviving `!important` rules* (same value), not a lower different-valued rule — provable only because every
> competitor is top-level.

## Sequencing (per tranche)

1. On the pre-change HEAD: `css-probe --baseline` + `visual-diff --baseline` together; commit both; **then** branch.
2. Make the scoped, token-based edit (bottom-up — highest line first — so edits don't shift later targets).
3. Run **both** `--check`s. css-probe is the load-bearing gate for §3d / cascade-outcome changes; visual-diff is the spatial catch-all. For dead-CSS deletes, also run the set-difference invariant.
4. `npm run check`.

## What runs where

- `npm run check` — `node --check` only; fast; every commit.
- `css-probe --check` / `visual-diff --check` — spawn a bridge subprocess + Chromium (~30s each); **manual pre-merge gates**, NOT part of `npm run check`. (Needs `npm install` + `npx playwright install chromium` in this worktree first — it has no `node_modules`.)
