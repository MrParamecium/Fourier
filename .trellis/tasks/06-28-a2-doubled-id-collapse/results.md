# A2 — doubled-ID collapse: results (warm-up tranche)

**Outcome:** N=2 de-doubled, M=10 MN-band proven-DEFENSIVE-kept. Count 404 → 402.
**Branch:** `a2/mn-workspace-dedouble` off squashed `origin/main` (62ddf06).

## What shipped

De-doubled `#mistakeNotebookView#mistakeNotebookView .mistake-workspace` → single-ID at both
occurrences (style.css L25297 top-level + L25327 `@media (max-width:1180px)`). 2-line diff.

## Why only 2 (the honest yield)

Re-derived at HEAD (zero drift from PRD): 404 occ / 264 lines / 19 IDs. The 33 "actionable"
(not in `runtime-collapsed.css`) decompose into three groups, and the surface collapses to 2:

- **Group A — close-button rule (6 occ, L24685–24706):** ONE grouped 7-arm rule, all `display:none`.
  `#feedbackView` arm DEFENSIVE (ties L27005 `border:1px`). De-doubling the other 5 needs a rule split
  on hidden buttons → ≈0 benefit. **CARVE-OUT.**
- **Group B — `#mistakeNotebookView` band (12 layout occ + 1 close-arm):** proven a same-file
  *"True EOF layout lock"* (comment, L25258) — ID-doubling makes a small lock block (L25259) win over a
  *later, larger* single-ID block (L25800–26200) without reordering it. 10 of 12 are load-bearing:
  - grid (L25259→L25971 cols/gap), list (L25273→L25986 max-height/overflow), image-frame
    (L25305→L26069 min-height), notes-panel (L25309→L27966 `grid`→`flex`), actions (L25315→L26120 cols),
    ai-answer-panel (L25320→L26134 margin-top) + their `@media` twins = **DEFENSIVE**.
  - `.mistake-workspace` (L25297 + L25327) = **NOCOMP** — only later competitor (L26163) is `@media`-gated
    with identical `1fr`; >1180px L25297 stays latest top-level winner (two-col). **← shipped.**
- **Group C — learn-internal (15 occ, L23954–25147):** every occurrence is a tail-ID on the A4-blocked
  `#learnView#learnView #learnBody#learnBody #learnChatCol#learnChatCol` prefix; ~7 sit in the Band-2
  `.chapter-overview-active.learn-textbook-active` **no-css-probe-witness gap** (A0 S14 dropped). **DEFER TO A4.**

## Gates (all five green)

1. **Cascade-competitor (static):** NOCOMP. `.mistake-workspace` competitors exhaustively: L11453/L11610
   (earlier, ≤(1,1,0)), L25297/L25327 (de-doubled→(1,1,0)), L26163 (`@media`≤1180, `1fr`). >1180px →
   L25297 wins two-col; ≤1180px → L26163 wins `1fr` (== old doubled value). Viewport+state independent.
2. **Arbiter** `_view-cascade-probe.js --check`: PASS — 240 states byte-identical.
3. **css-probe** `--check`: PASS — byte-identical (no MN-workspace probe → no-leak-elsewhere check, NOT the witness).
4. **visual-diff** `--check`: view **03b-mistake-notebook-open-case** = 0.000% before & after (the empirical
   witness, 1280px arm). View 03 = 0.000%. (View 22 0.422%→0.066% = unrelated text-AA noise.)
5. **Inline-style audit:** no `app/*.js` writes inline style to `.mistake-workspace`; `@media` only at 1180 (probed).

Plus `npm run check` PASS.

**Proof provenance (honest):** the witness is gate 4 (empirical, >1180px) + gate 1 (static, covers the
≤1180px arm view 03b can't render). css-probe does NOT witness this selector — claiming it did would be a fail-open.

## Next

A4 is now UNBLOCKED (C2 merged `4d7b47b`/#120; A0 harness complete S4–S11 #122 + S13 #123). The
doubled-ID pattern is pervasively load-bearing (cross-file composer→runtime + same-file MN EOF lock), so
A4 needs collapse-and-merge (dedup the lock block WITH its competitor block), not piecemeal de-doubling.
Groups A & C fold into / wait for A4.
