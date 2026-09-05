# Align Local Product Work with GitHub Main Design

Date: 2026-09-05
Status: Approved approach; detailed design pending user review

## Goal

Use the current GitHub `main` branch as the only integration baseline, then
migrate the useful local work as three independently testable pull requests.
The result should preserve all capabilities already merged on GitHub while
bringing the locally validated UI and lesson improvements to the public main
branch.

All product and code-facing copy remains English. Collaboration and review
remain Chinese.

## Baseline rule

Create every implementation branch from the latest `origin/main`, currently
containing the session intent-routing work, README showcase, and the merged
past-effects convolution illustration. Never merge the stale local branch as a
whole and never force-update `main`.

## Three-PR migration

### PR 1 — Tutor controls and state clarity

Bring over only the interaction changes that make Guided, Web Search, and the
Tutor bubble understandable and synchronized:

- replace the icon-only Guided controls with the labelled `Guided` switch;
- expose explicit ON/OFF state for Web Search in every supported entry point;
- keep the main, follow-up, lesson, popover, and textbook-focus controls in sync;
- expose Tutor bubble/open/collapse state through labels, titles, and ARIA
  attributes;
- preserve the remote session intent-routing implementation unchanged.

Expected files are the relevant portions of `app/app.js`,
`app/guidance-mode.js`, `app/index.html`, `app/style.css`, and
`tools/test-guidance-ui.js`. Do not copy the local deletion of
`app/intent-routing.js`, `tools/test-intent-routing.js`, or the package script
that runs that test.

Acceptance:

- Guided controls visibly communicate their state without clipped text;
- Web Search state is visually and semantically synchronized across entry
  points;
- Tutor open/collapse controls expose the correct state;
- the existing intent-routing test remains present and passes;
- `npm run test:guidance-ui` and `npm run test:intent-routing` pass.

### PR 2 — Focus workspace and visual shell

Bring over the layout-only improvements that make the lesson workspace use the
available screen area without changing the learning content:

- compact the persistent focus-mode icon rail to the approved width;
- keep the lesson as the dominant area and the Tutor panel collapsible;
- preserve the Tutor orb and return path when the panel is collapsed;
- retain the transparent glass progress treatment;
- keep focus-mode, resize, hover, and responsive behavior covered by the
  existing layout tests and visual baselines.

Expected files are the relevant portions of `app/app.js`, `app/index.html`,
`app/style.css`, `app/lesson-render.js`, and the layout/visual test fixtures.
Do not include new lesson copy, generated lesson assets, or intent-routing
files in this PR.

Acceptance:

- the compact rail remains usable and does not cover the lesson;
- the Tutor panel can collapse to the orb and reopen;
- the 2:1 lesson-to-Tutor workspace remains readable;
- desktop and mobile layout tests pass;
- visual baselines are updated only when the approved shell change requires it.

### PR 3 — Graphical convolution lesson content

Bring over the content and assets for the revised 2.4-2 lesson:

- make page 1 the concise WHY introduction with the approved bullet points;
- include the local lightbulb illustration as a tracked lesson asset;
- preserve the already merged past-effects illustration from `origin/main`;
- keep the remaining lesson pages, demos, and English-only copy intact;
- update convolution visual contracts and lesson-cache checks for the revised
  page phase and image dimensions.

Expected files are the 2.4-2 lesson cache, the new lightbulb PNG, and the
convolution-specific checker/test files. The past-effects PNG must not be
reintroduced as a deletion because it already exists on `origin/main`.

Acceptance:

- page 1 renders WHY content and its illustration;
- all 18 lesson pages and ten controlled demos remain ordered;
- all referenced illustration assets resolve;
- `npm run check:convolution-visuals`, convolution layout tests, and the full
  `npm run check` pass.

## Explicit exclusions

Do not migrate these local-only artifacts:

- `.trellis/tasks/.../artifacts/*.png` visual evidence files;
- `workspace/memory/*.md` session journals;
- unrelated temporary design drafts;
- local visual-baseline byte changes not required by PR 2;
- `workspace/materials/lesson-cache/2_4/` until its provenance and intended
  consumer are verified separately.

## Integration and verification

For each PR:

1. branch from the latest `origin/main`;
2. cherry-pick only the files belonging to that PR;
3. run the PR-specific tests and the relevant full checks;
4. inspect the diff against `origin/main` for accidental deletions;
5. push and open a PR;
6. merge only after CI is green.

After all three PRs are merged, fetch `origin/main` and verify that the local
clean integration worktree contains the remote features and that the original
working tree's unrelated changes remain untouched.
