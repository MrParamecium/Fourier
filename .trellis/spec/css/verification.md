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

## Sequencing (per tranche)

1. On the pre-change HEAD: `css-probe --baseline` + `visual-diff --baseline` together; commit both; **then** branch.
2. Make the scoped, token-based edit (bottom-up — highest line first — so edits don't shift later targets).
3. Run **both** `--check`s. css-probe is the load-bearing gate for §3d / cascade-outcome changes; visual-diff is the spatial catch-all. For dead-CSS deletes, also run the set-difference invariant.
4. `npm run check`.

## What runs where

- `npm run check` — `node --check` only; fast; every commit.
- `css-probe --check` / `visual-diff --check` — spawn a bridge subprocess + Chromium (~30s each); **manual pre-merge gates**, NOT part of `npm run check`. (Needs `npm install` + `npx playwright install chromium` in this worktree first — it has no `node_modules`.)
