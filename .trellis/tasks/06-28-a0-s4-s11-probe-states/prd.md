# A0 — S4–S11 composer probe-state expansion

The **second A0 gate for A4** (REFACTOR_DONE §A0 / PHASE3.6_SPEC §4.2 + §4.4 item 2:
"Full S4–S11 state matrix in css-probe before touching the §3d composer chain").
Adds computed-style css-probe states for the composer / doubled-ID-gating DOM states
that today are pixel-only or uncovered, captured on pre-collapse `main` so A4 diffs
against true geometry. Builds directly on the **C2 fix (PR #120)** — the
`learnPanelFocus = '<focus>'; applyLearnPanelFocusState()` driver + fail-closed
state+winner assert pattern is now the established way to enter a composer state.

## State matrix (PHASE3.6_SPEC §4.2 — line numbers will be re-measured per [[feedback-reconcile-plans-against-git]])

Existing today: **S2** (qa-wide), **S3** (qa-full), **S12** (textbook modal),
**S-page-corner**, **N0–N4**, **S-feedback-***. To add:

| State | DOM state | Enter (driver) | Pixel cover today | Why it matters |
|---|---|---|---|---|
| S1/S8 | resting lesson (chat-collapsed) | open §1.1-1 non-overview (resting) | view 06 (pixel-only) | resting baseline for the composer / explain rail |
| **S4** | normal + chat visible (§3d radial war) | `panelFocus='normal'` + remove `chat-collapsed` | **NEW** | the §3d radial-gradient war core (highest priority, §4.3) |
| S5 | `#learnFollowupBar:focus-within` | focus `.input-field` while in S2/S3 | view 09 (partial) | focus-within composer geometry; needs anim freeze |
| **S6** | empty-state, NOT chat-active | S2/S3 with `#learnChatCol` not `.is-chat-active` | **NEW** | empty composer state |
| **S7** | empty-state hidden (is-chat-active) | toggle `#learnChatCol.is-chat-active` | **NEW** | active-chat composer state |
| **S9** | explain-collapsed (not chat-collapsed) | add `explain-collapsed`, remove `chat-collapsed` | **NEW** | explain-rail collapse cascade |
| S10 | chapter-overview-active | add `chapter-overview-active` | view 15 | the **13 explain-rail doubled-ID** unlock (§A2 biggest single tranche) |
| S11 | chapter-overview-split-active | add `chapter-overview-split-active` | view 16 | split-active doubled-ID cascade |

State-setting code (re-measure before use; C2 already found app.js drifted
2725→1116): `openLearnMode` / `applyLearnPanelFocusState` (app.js, formerly L2686-2738),
`is-chat-active` toggle (formerly app.js L3990-3992). DOM IDs: index.html
L655/674/713/732/760/1495.

## Disciplines (non-negotiable — from C2 + verification.md)

- **Drive via the real production functions**, not hand-poked classes (the C2 lesson).
  Where no production entry point exists for a state (e.g. `is-chat-active`), prefer the
  smallest faithful production call over a raw `classList.add`.
- **Each new state asserts an R8 winner sentinel** — a discriminating computed value the
  gated rule actually wins — BEFORE snapshot, so the baseline can't bake an inactive rule
  (fail-closed; verification.md "assert-as-entered").
- **Additive-only baseline.** Capture on this branch off pre-collapse `main`; every
  existing key (S2/S3/S12/N0–N4/S-feedback-*/S-page-corner) stays byte-identical —
  `git diff tools/css-probe-baseline.json` shows ONLY new keys.
- **Cross-view-nav / in-lesson ordering** rules from verification.md (feedback precedent):
  in-lesson states before any cross-view state; reset between states via the C2-fixed
  `resetLessonChromeState`.

## Scope (DECIDED 2026-06-28 with FlyM1ss → REVISED on evidence during implementation)

Originally **S4+S5+S6+S7+S9+S10+S11, defer S1/S8.** During implementation the empirical
exploration (`tools/_explore-s4-s11.js`) revised this:

- **SHIPPED: S4, S6, S7, S9, S10, S11** (6 states).
- **S5 (`:focus-within`) DROPPED** — focus engages and `:focus-within` matches, but every
  focus-within declaration loses to the `!important` wall (wrapper resolves to border:0 /
  box-shadow:none / transparent; bar chrome forced none by L19207). No gated rule wins →
  no fail-closed sentinel constructible → it would be a fail-open state. Pixel cover stays
  in visual-diff view 09.
- **S1/S8 deferred** (pre-decided; view 06 pixel-covers resting).

Empirical finding: the §3d composer chrome is **panel-invariant at desktop** (S4≡S2
values), so each state pins only the cascade it gates — not a redundant FOLLOWUP_PROBES
clone. See `results.md` for the full per-state sentinel table and verification.

## Out of scope

- A4 itself (the composer collapse) and any `app/style.css` / `runtime-collapsed.css` edit.
- The big A2 doubled-ID sweep (A4-gated).
- New *visual-diff* views (this is css-probe computed-style coverage; visual-diff already has 15/16/06/09).
