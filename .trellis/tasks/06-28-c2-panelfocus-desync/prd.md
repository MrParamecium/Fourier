# C2 — css-probe S2/S3 `panelFocus` desync fix

Workstream C landmine **and** an A0 harness gate (REFACTOR_DONE §C2 / §A0). Drive
the css-probe composer states through the production `applyLearnPanelFocusState()`
path instead of hand-poking `dataset.panelFocus`, so the S2/S3 probes capture the
DOM the app actually renders.

## Why now (the leverage chain — verified this session against git HEAD `e2f3431`)

- **C2 gates A4.** §A0 / §C2: "Land this before the A4 composer work so its probes
  capture a DOM the app actually renders." The S2/S3 states are the §3d composer-war
  probes (followup-bar geometry, `#learnChatCol` background) — the exact cascade A4
  must keep byte-identical.
- **A4 unblocks the bulk of A2.** Measured in the A2 task: **~371 of 404 doubled-IDs
  (92%)** are the `#learnView` §3d composer cluster, collapsible only once A4
  reconciles the cross-file war-pairs. Today A2 can touch only ~33 occurrences.
- So **C2 → A4 → ~92% of A2**. C2 is the smallest, lowest-risk unblock on that path.
  (C2 is necessary-not-sufficient for A4: the S4–S11 harness expansion is the other
  A0 prerequisite — a separate task.)

## The defect (verified against live code, line numbers re-measured — NOT from doc)

`tools/css-probe.js` S2 (`L383-398`) and S3 (`L400-418`) `enter()` set **only**
`shell.dataset.panelFocus = 'qa-wide'|'qa-full'`. The production
`applyLearnPanelFocusState()` (`app/app.js:1116`) does much more in lockstep:

- adds the `.panel-qa-wide` / `.panel-qa-full` class (`states.forEach(... classList.toggle)`),
- `classList.remove('chat-collapsed', 'explain-collapsed')`,
- sets the module-global `learnPanelFocus` JS var + `isLearnChatCollapsed=false` / `isLearnExplainCollapsed=false`,
- un-hides the chat / explain / resizer panels, hides the book col, dispatches `resize`.

`resetLessonChromeState()` (`tools/test-utils.js:219`) — the floor between states —
deletes `dataset.panelFocus` but does **not** clear `chat-collapsed` / `explain-collapsed`.

**Status today:** latent (REFACTOR_DONE §C2: "no CSS keys off `.panel-qa-*`; the
sentinel guards the winner"). The `assertFollowupBarWinner` sentinel (min-height
`152px`) currently passes — but the probe runs against a DOM that does NOT match
the app's rendered composer state. It is a **forward trap for A4**: A4 will diff
composer geometry against this baseline, and a baseline captured in the wrong DOM
proves nothing (Risk R5: "css-probe taken in the wrong state reads an inactive rule").

## Scope

**In scope (C2 proper — the desync fix only):**
- `tools/css-probe.js`: S2/S3 `enter()` drive through `applyLearnPanelFocusState()`.
- `tools/test-utils.js`: `resetLessonChromeState()` also clears `chat-collapsed` / `explain-collapsed`.
- Strengthen the S2/S3 assert-as-entered (verify `.panel-qa-*` present + `chat-collapsed` absent, not just the attribute).
- Re-baseline `tools/css-probe-baseline.json` **only if** the corrected DOM shifts probed values (empirical — see design.md).

**Out of scope:**
- The S4–S11 composer-state harness expansion (the *other* A0 gate for A4) — separate, larger task.
- Any `app/style.css` / `app/css/runtime-collapsed.css` change — this is harness-only, production CSS untouched.
- A4 itself; the big A2 composer-cluster sweep.

## Acceptance criteria

- [ ] S2/S3 `enter()` produce the same DOM the app renders for `qa-wide`/`qa-full` (panel class present, `chat-collapsed`/`explain-collapsed` cleared, `learnPanelFocus` JS var in sync).
- [ ] `resetLessonChromeState()` clears `chat-collapsed`/`explain-collapsed` so a sticky collapse cannot leak between states.
- [ ] Assert-as-entered upgraded to a real winner+state assertion (R8 / verification.md).
- [ ] `css-probe --check` is byte-identical against the committed baseline **OR** the baseline is re-captured with a documented justification (old baseline captured the desync DOM). Either is a valid C2 completion.
- [ ] `visual-diff --check` unaffected (production rendering untouched) — spot-checked on the lesson views, expected render-neutral.
- [ ] `npm run check` passes.
- [ ] Honest reporting: state explicitly whether the fix was probe-neutral (baseline unchanged) or baseline-correcting (values shifted), with the before→after diff if shifted.

## Open questions

None blocking. The single empirical fork (baseline shifts or not) is resolved by
running `css-probe --check` after the edit — not a decision to ask.
