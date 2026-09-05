# Align Local Work with GitHub Main Implementation Plan

> For agentic workers: REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Start from the latest GitHub main and migrate the approved local work as three independently tested pull requests without deleting remote session-routing functionality.

**Architecture:** Use origin/main as the immutable integration baseline. Build three clean branches in sequence: PR 1 for Tutor controls and state clarity, PR 2 for the focus workspace shell, and PR 3 for graphical-convolution lesson content. Each branch contains only its bounded files and is merged before the next branch is created.

**Tech Stack:** Git worktrees, GitHub CLI, Vanilla JavaScript, CSS, Markdown lesson cache, PNG assets, Node checks, Playwright

**Spec:** docs/superpowers/specs/2026-09-05-align-local-with-main-design.md

## Global Constraints

- Every implementation branch starts from the latest origin/main.
- Preserve app/intent-routing.js, tools/test-intent-routing.js, and the test:intent-routing package script from origin/main.
- Preserve the already merged convolution-past-effects-v1.png; never reintroduce it as a deletion.
- Keep application and repository-facing copy in English.
- Exclude .trellis artifacts, workspace/memory, unrelated drafts, and workspace/materials/lesson-cache/2_4/.
- Never force-push or rewrite main.
- Before each PR is opened, inspect git diff origin/main...HEAD --name-status for accidental deletions.

---

### Task 1: Create a clean integration baseline and migration ledger

**Files:**
- Create: /tmp/fourier-main-alignment-20260905/ worktree only
- Verify: origin/main
- Do not modify: the original feedback-board worktree

**Interfaces:**
- Consumes: the current local worktree diff and the latest GitHub origin/main.
- Produces: a clean worktree from which PR 1, PR 2, and PR 3 branches can be created.

- [ ] Step 1: Fetch the remote baseline

~~~bash
git fetch origin --prune
git log -1 --oneline --decorate origin/main
~~~

Expected: origin/main points to the latest GitHub merge commit.

- [ ] Step 2: Record the local worktree ledger without staging it

~~~bash
git status --short --untracked-files=all
git diff --stat origin/main
git diff --name-status origin/main
~~~

Classify each entry as PR 1, PR 2, PR 3, or excluded. The ledger must show that local deletion of app/intent-routing.js, tools/test-intent-routing.js, and the package test script is excluded.

- [ ] Step 3: Create the clean worktree from origin/main

~~~bash
git worktree add -b codex/align-pr-1-tutor-controls /tmp/fourier-main-alignment-20260905 origin/main
~~~

Expected: the new worktree is clean and contains the remote session-routing files.

- [ ] Step 4: Verify the remote baseline before applying local patches

~~~bash
test -f app/intent-routing.js
test -f tools/test-intent-routing.js
node -e "const p=require('./package.json'); if (!p.scripts['test:intent-routing']) process.exit(1)"
git status --short
~~~

Expected: all checks succeed and git status prints nothing.

### Task 2: PR 1 — migrate Tutor controls and state clarity

**Files:**
- Modify: app/app.js
- Modify: app/guidance-mode.js
- Modify: app/index.html
- Modify: app/style.css (only Guided/Web Search/Tutor-control selectors)
- Modify: tools/test-guidance-ui.js
- Preserve unchanged: app/intent-routing.js, tools/test-intent-routing.js, package.json intent-routing script

**Interfaces:**
- Consumes: the clean origin/main worktree from Task 1.
- Produces: readable Guided and Web Search controls with synchronized state, plus accessible Tutor bubble controls.

- [ ] Step 1: Add the PR 1 fixture assertions before implementation

Extend tools/test-guidance-ui.js so it asserts:

~~~
- every Guided control contains .guidance-toggle-label and .guidance-toggle-switch;
- the rendered Guided control is at least 84px wide and contains both children;
- every Web Search control exposes aria-pressed, aria-label, and data-web-search-state;
- chapter progress uses the transparent glass treatment;
- app/intent-routing.js remains present and is not replaced by a stub.
~~~

- [ ] Step 2: Run the focused test to capture the baseline failure

~~~bash
npm run test:guidance-ui
~~~

Expected: the new fixture assertions fail on the clean baseline because the labelled Guided markup and synchronized state are not yet present.

- [ ] Step 3: Apply only the Tutor-control implementation hunks

In app/index.html, replace the icon-only Guided markup at the main, follow-up, lesson, learn-popover, and textbook-focus entry points with:

~~~html
<span class="guidance-toggle-label">Guided</span>
<span class="guidance-toggle-switch" aria-hidden="true"><span></span></span>
~~~

In app/guidance-mode.js, add the guidance-on class and state-specific aria-label/title. In app/app.js, add syncWebSearchButtonState(button, isActive) and use it for every Web Search entry point; add aria-expanded, Open Tutor, and Collapse Tutor state to the Tutor orb and collapse button. In app/style.css, add only the Guided/Web Search/Tutor-control rules and responsive overrides. Do not copy any deletion of the remote intent-routing implementation.

- [ ] Step 4: Run PR 1 tests and the preserved remote routing test

~~~bash
npm run test:guidance-ui
npm run test:intent-routing
npm run check
~~~

Expected: all commands pass; test:intent-routing remains available on the branch.

- [ ] Step 5: Inspect the PR 1 boundary and commit

~~~bash
git diff --name-status origin/main...HEAD
git diff --check
git status --short
git add app/app.js app/guidance-mode.js app/index.html app/style.css tools/test-guidance-ui.js
git commit -m "fix: clarify tutor controls and synchronized search state"
~~~

Expected: only the five PR 1 files are committed; no intent-routing or package.json deletion appears.

- [ ] Step 6: Push, open, and merge PR 1 after CI is green

~~~bash
git push -u origin codex/align-pr-1-tutor-controls
PR_NUMBER=$(gh pr create --repo MrParamecium/Fourier --base main --head codex/align-pr-1-tutor-controls --title "fix: clarify Tutor controls and search state" --body "Preserve session intent routing while making Guided, Web Search, and Tutor collapse state explicit." --json number --jq .number)
gh pr checks "$PR_NUMBER" --repo MrParamecium/Fourier
gh pr merge "$PR_NUMBER" --repo MrParamecium/Fourier --merge --delete-branch
~~~

Replace PR_NUMBER with the number returned by gh pr create. Expected: PR 1 merges into main with green checks.

### Task 3: PR 2 — migrate the focus workspace and visual shell

**Files:**
- Modify: app/app.js (only focus/Tutor collapse state touched by the shell)
- Modify: app/index.html (only focus/Tutor collapse attributes if required)
- Modify: app/style.css (focus workspace, compact rail, Tutor collapse, glass progress)
- Modify: tools/test-convolution-lesson-layout.js
- Modify: tools/test-guidance-ui.js only if the glass-progress fixture is required by the existing test contract
- Verify: tools/visual-baseline/17-lesson-convolution.png, 22-lesson-quick-check.png, 23-textbook-focus.png, 26-kp-pager-advance.png
- Do not modify: lesson-cache files, illustration assets, intent-routing files

**Interfaces:**
- Consumes: the merged PR 1 origin/main baseline.
- Produces: a compact focus-mode rail, a collapsible Tutor panel/orb path, and the approved readable lesson-dominant workspace.

- [ ] Step 1: Create PR 2 from the newly merged main

~~~bash
git fetch origin --prune
git worktree add -b codex/align-pr-2-focus-shell /tmp/fourier-main-alignment-pr2-20260905 origin/main
~~~

- [ ] Step 2: Add or update the layout contract for the approved shell

Update tools/test-convolution-lesson-layout.js to assert:

~~~
- focus mode uses a 68px rail;
- rail hover and keyboard focus do not expand or cover the lesson;
- collapsed Tutor remains in the grid at zero width/hidden opacity;
- the Tutor orb exposes Open Tutor and aria-expanded="false";
- reopening shows the panel and Collapse Tutor with aria-expanded="true";
- the lesson-to-Tutor ratio remains at or below 2.05:1;
- no horizontal overflow occurs.
~~~

- [ ] Step 3: Run the layout test before applying the shell patch

~~~bash
npm run test:convolution-layout
~~~

Expected: the tightened 68px/collapse assertions fail on the PR 1 baseline.

- [ ] Step 4: Apply only the focus-shell hunks

In app/style.css, migrate the compact 68px rail dimensions, Tutor collapse transitions, zero-width hidden panel, focus-visible treatment, and transparent glass progress selectors. In app/app.js and app/index.html, keep only the focus/Tutor accessibility attributes needed by those selectors. Leave Guided/Web Search behavior from PR 1 intact.

- [ ] Step 5: Run PR 2 checks and inspect visuals

~~~bash
npm run test:convolution-layout
npm run test:mobile-learn-panels
npm run test:guidance-ui
npm run check
~~~

Inspect the four existing visual baselines at desktop and mobile sizes. Update a baseline only when the compact shell changes that exact capture; do not include byte-only baseline changes unrelated to the shell.

- [ ] Step 6: Commit, push, and merge PR 2

~~~bash
git diff --name-status origin/main...HEAD
git diff --check
git add app/app.js app/index.html app/style.css tools/test-convolution-lesson-layout.js tools/test-guidance-ui.js tools/visual-baseline/17-lesson-convolution.png tools/visual-baseline/22-lesson-quick-check.png tools/visual-baseline/23-textbook-focus.png tools/visual-baseline/26-kp-pager-advance.png
git commit -m "style: compact focus workspace and tutor shell"
git push -u origin codex/align-pr-2-focus-shell
PR_NUMBER=$(gh pr create --repo MrParamecium/Fourier --base main --head codex/align-pr-2-focus-shell --title "style: compact focus workspace and Tutor shell" --body "Keep the lesson dominant while making the focus rail and Tutor collapse path compact and accessible." --json number --jq .number)
gh pr checks "$PR_NUMBER" --repo MrParamecium/Fourier
gh pr merge "$PR_NUMBER" --repo MrParamecium/Fourier --merge --delete-branch
~~~

Expected: PR 2 merges with only shell-related files and required visual baselines.

### Task 4: PR 3 — migrate graphical-convolution lesson content

**Files:**
- Modify: workspace/materials/lesson-cache/2_4-2/new__aquarius_visual_latex_v2.aquarius_visual_latex_v2.en.md
- Create: workspace/materials/lesson-illustrations/2_4-2/convolution-why-lightbulb-v1.png
- Modify: tools/check-convolution-lesson-visuals.js
- Modify: tools/check-geogebra-pilot.js
- Modify: tools/test-convolution-lesson-layout.js only for page-1 WHY expectations
- Preserve unchanged: workspace/materials/lesson-illustrations/2_4-2/convolution-past-effects-v1.png
- Exclude: workspace/materials/lesson-cache/2_4/

**Interfaces:**
- Consumes: the merged PR 2 origin/main baseline and the local lightbulb image.
- Produces: the approved 2.4-2 WHY page with a tracked illustration and updated content contracts.

- [ ] Step 1: Create PR 3 from the newly merged main

~~~bash
git fetch origin --prune
git worktree add -b codex/align-pr-3-convolution-content /tmp/fourier-main-alignment-pr3-20260905 origin/main
~~~

- [ ] Step 2: Add the page-1 content contract before implementation

Update the convolution checks to require:

~~~
- page 1 heading Why Use Graphical Convolution?;
- exactly three concise WHY bullets;
- the lightbulb image on page 1 with its expected dimensions and alt token;
- page 2 as the only WHAT page;
- pages 3–4 as WHY and pages 5–18 as HOW;
- all 18 pages and ten controlled demos remain ordered;
- the four approved lesson illustrations resolve in their existing order.
~~~

- [ ] Step 3: Run convolution checks before applying the content patch

~~~bash
npm run check:convolution-visuals
npm run test:convolution-layout
npm run test:geogebra
~~~

Expected: page-1 WHY and lightbulb assertions fail on the PR 2 baseline.

- [ ] Step 4: Apply the lesson cache and lightbulb image

Replace only page 1 in the 2.4-2 English lesson cache with the approved concise WHY bullets and the /lesson-illustrations/2_4-2/convolution-why-lightbulb-v1.png reference. Copy the local lightbulb PNG into the tracked illustration directory. Do not copy the local past-effects PNG over the one already present on origin/main.

- [ ] Step 5: Update contracts and run the complete PR 3 checks

~~~bash
npm run check:convolution-visuals
npm run test:convolution-layout
npm run test:geogebra
npm run check
~~~

Expected: all checks pass, including the remote test:intent-routing script preserved through PR 1 and PR 2.

- [ ] Step 6: Commit, push, and merge PR 3

~~~bash
git diff --name-status origin/main...HEAD
git diff --check
git add workspace/materials/lesson-cache/2_4-2/new__aquarius_visual_latex_v2.aquarius_visual_latex_v2.en.md workspace/materials/lesson-illustrations/2_4-2/convolution-why-lightbulb-v1.png tools/check-convolution-lesson-visuals.js tools/check-geogebra-pilot.js tools/test-convolution-lesson-layout.js
git commit -m "feat: add graphical convolution why lesson visual"
git push -u origin codex/align-pr-3-convolution-content
PR_NUMBER=$(gh pr create --repo MrParamecium/Fourier --base main --head codex/align-pr-3-convolution-content --title "feat: add graphical convolution WHY lesson visual" --body "Add the approved page-1 WHY content and lightbulb illustration while preserving the existing lesson flow." --json number --jq .number)
gh pr checks "$PR_NUMBER" --repo MrParamecium/Fourier
gh pr merge "$PR_NUMBER" --repo MrParamecium/Fourier --merge --delete-branch
~~~

Expected: PR 3 merges with the lightbulb asset and no duplicate/deleted past-effects asset.

### Task 5: Verify final alignment and clean up temporary worktrees

**Files:**
- Verify: origin/main
- Verify: original feedback-board worktree status
- Remove: /tmp/fourier-main-alignment-* worktrees after all PRs merge

**Interfaces:**
- Consumes: the three merged PRs.
- Produces: evidence that GitHub main contains the approved local work and that unrelated local changes remain untouched.

- [ ] Step 1: Fetch and verify the final remote baseline

~~~bash
git fetch origin --prune
git log -1 --oneline --decorate origin/main
git ls-tree -r --name-only origin/main -- app/intent-routing.js tools/test-intent-routing.js workspace/materials/lesson-illustrations/2_4-2 | rg 'intent-routing|convolution-(past-effects|why-lightbulb)-v1'
~~~

Expected: both intent-routing files and both convolution illustration files exist on origin/main.

- [ ] Step 2: Run final remote checks from a clean origin/main worktree

~~~bash
git worktree add /tmp/fourier-main-alignment-final-20260905 origin/main
cd /tmp/fourier-main-alignment-final-20260905
npm run check
npm run test:guidance-ui
npm run test:intent-routing
npm run test:geogebra
~~~

Expected: all commands pass from the merged GitHub baseline.

- [ ] Step 3: Confirm the original worktree stayed isolated

~~~bash
git -C /Users/chenghaoxiang/Documents/Codex/2026-07-20/tutor-agent/work/Fourier-loop-05-feedback-board status --short --untracked-files=all
~~~

Expected: the original local application, lesson, test, memory, and artifact changes remain present and none were overwritten by the migration.

- [ ] Step 4: Remove only temporary integration worktrees

~~~bash
git worktree remove /tmp/fourier-main-alignment-20260905
git worktree remove /tmp/fourier-main-alignment-pr2-20260905
git worktree remove /tmp/fourier-main-alignment-pr3-20260905
git worktree remove /tmp/fourier-main-alignment-final-20260905
~~~

Expected: the original feedback-board worktree remains intact.
