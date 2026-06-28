# C2 — design

Harness-only change. Production app (`app.js`, `style.css`, `runtime-collapsed.css`)
is **not** touched. Files: `tools/css-probe.js`, `tools/test-utils.js`, and possibly
`tools/css-probe-baseline.json` (only if values shift — see §3).

## 1. Why drive through `applyLearnPanelFocusState()` (not replicate its DOM writes)

The whole point of §C2 is fidelity: the probe DOM must equal the app's rendered DOM.
Hand-replicating the class toggles in the probe would re-introduce drift the moment
`applyLearnPanelFocusState()` changes. So the probe calls the **real** function.

`applyLearnPanelFocusState()` (app.js:1116) reads the module-global `learnPanelFocus`
(app.js:847, top-level `let`) and applies it. Both are in the page's global lexical
scope under the codebase's `<script>`-concatenation model, so a `page.evaluate`
callback can assign `learnPanelFocus = 'qa-wide'` and call `applyLearnPanelFocusState()`
directly — the same path `advanceLearnPanelFocus()` (app.js:1183) uses in production.

The function already dispatches `resize` via `requestAnimationFrame` (app.js:1180),
so the explicit `window.dispatchEvent(new Event('resize'))` becomes redundant but is
harmless to keep for the settle.

### S2 `enter()` — before → after (illustrative)

```
// BEFORE
await resetLearnChrome(page);
await page.evaluate(() => {
    const shell = document.getElementById('learnBody');
    if (shell) shell.dataset.panelFocus = 'qa-wide';   // attribute only — desync
    window.dispatchEvent(new Event('resize'));
});

// AFTER
await resetLearnChrome(page);
await page.evaluate(() => {
    // Drive the real production path so the probe DOM == the app's rendered DOM.
    if (typeof applyLearnPanelFocusState === 'function') {
        learnPanelFocus = 'qa-wide';
        applyLearnPanelFocusState();
    } else {                                            // fail-closed fallback
        const shell = document.getElementById('learnBody');
        if (shell) { shell.dataset.panelFocus = 'qa-wide'; shell.classList.add('panel-qa-wide'); }
    }
    window.dispatchEvent(new Event('resize'));
});
```

> The `typeof ... === 'function'` guard fails *open to a closer approximation* rather
> than throwing if the symbol is ever renamed; the strengthened assert (§2) then
> fail-closes on a wrong DOM. Decide during implement whether to keep the guard or
> assert the symbol exists up front — leaning: assert it exists (a missing
> `applyLearnPanelFocusState` is itself a regression the harness should surface loudly).

## 2. Strengthen assert-as-entered (R8 / verification.md)

Current S2 assert only checks `dataset.panelFocus === 'qa-wide'` && bar present.
After the fix the DOM carries more truth to pin — assert all of:

- `dataset.panelFocus === 'qa-wide'`
- `learnBody.classList.contains('panel-qa-wide')`  ← the class the desync omitted
- `!learnBody.classList.contains('chat-collapsed')` ← proves the collapse cleared
- `#learnFollowupBar` present

`assertFollowupBarWinner` (min-height `152px`) stays as the cascade-winner sentinel.
This converts a fail-open presence check into a fail-closed state+winner assertion.

## 3. The empirical baseline fork (resolve by running, not by asking)

The fix changes the DOM the probes read. Whether that shifts the **probed values**
(`FOLLOWUP_PROBES`: `#learnChatCol` bg + `#learnFollowupBar` min-height/radius/bg/
box-shadow/backdrop-filter/z-index/overflow) is a cascade question we resolve
empirically:

1. The `.panel-qa-*` class addition is documented render-neutral (§C2: "no CSS keys
   off `.panel-qa-*`"), so that part should not move any value.
2. The **`chat-collapsed` removal** is the unknown: the current `resetLessonChromeState`
   never clears it, so today's S2/S3 may probe the followup bar in a residual
   `chat-collapsed` DOM. If any `FOLLOWUP_PROBES` property's winning rule keys off
   `chat-collapsed` (directly or via `.learn-body-inner` grid), the value shifts.

**Procedure:**
- Run `css-probe --check` after the edit.
- **Pass byte-identical** → fix is probe-neutral; baseline unchanged; C2 is a pure
  forward-trap/correctness fix. Done.
- **Fail on S2/S3** → the *old* baseline was capturing the desync DOM (wrong). Inspect
  the before→after diff, confirm each shifted value is the app's genuine `qa-wide`/
  `qa-full` composer geometry (sanity: matches what `applyLearnPanelFocusState` renders),
  then `css-probe --baseline` to re-capture and commit with a justification note. This
  is a baseline **correction**, not a regression. Other states (S12/N0–N4/S-feedback-*/
  S-page-corner) MUST remain byte-identical — only S2/S3 may move; any other delta is a
  real bug to investigate.

> Note on the §A4 sequencing rule ("Re-baseline S4–S11 on pre-collapse `main` before
> touching the composer"): re-baselining S2/S3 here is consistent with it — we are
> capturing pre-collapse composer truth on `main` against a **correct** DOM, which is
> exactly what A4 wants to diff against.

## 4. visual-diff

Production rendering is untouched, so `visual-diff --check` is unaffected. We still
spot-check the lesson views (06/08/09/15/16) to confirm 0.000% (sub-0.005% text-AA
noise tolerated per verification.md noise floor) — cheap insurance that nothing in
`test-utils.js` leaked into the visual-diff path (`resetLessonChromeState` is shared
with views 15/16).

## 5. Risk register (task-local)

| # | Risk | Mitigation |
|---|---|---|
| 1 | `learnPanelFocus` / `applyLearnPanelFocusState` not reachable from `page.evaluate` | top-level `let` + `function` are in the page global scope (script-concat model); verify with a one-liner probe before trusting; fail-closed assert catches a wrong DOM |
| 2 | Re-baseline silently masks a real composer regression | only S2/S3 may move; assert all other states byte-identical; eyeball each shifted value against the app's rendered geometry |
| 3 | `resetLessonChromeState` change ripples to views 15/16 (shared helper) | those views WANT a clean floor; visual-diff 15/16 spot-check confirms no regression |
| 4 | Editing S3 shifts S2's line numbers | edit bottom-up (S3 before S2) — though they're independent blocks |
