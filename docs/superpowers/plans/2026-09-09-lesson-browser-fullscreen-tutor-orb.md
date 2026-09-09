# Browser Fullscreen Lesson Workspace and Collapsible Tutor Orb Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (\`- [ ]\`) syntax for tracking.

**Goal:** Add a browser-native fullscreen lesson mode that hides the address bar and left navigation while preserving a collapsible right-side Tutor panel with a floating restore orb.

**Architecture:** Extend the existing lesson top-bar markup and \`app/app.js\` lesson state. The browser \`fullscreenchange\` event is the source of truth; a confirmed fullscreen state toggles an explicit app class, stores/restores the pre-entry sidebar state, and reuses \`isLearnChatCollapsed\`, \`#learnTutorMinimizeBtn\`, and \`#learnChatFab\`. CSS adds only the fullscreen layout contract and keeps existing mobile single-panel behavior.

**Tech Stack:** Existing HTML, vanilla JavaScript, CSS, browser Fullscreen API, Playwright-based Node checks.

**Spec:** \`docs/superpowers/specs/2026-09-09-lesson-browser-fullscreen-tutor-orb-design.md\`

## Global Constraints

- Use the browser Fullscreen API with \`navigationUI: 'hide'\` from an explicit user click.
- Apply the app fullscreen state only after \`fullscreenchange\` confirms \`document.fullscreenElement\`.
- Restore the app/sidebar/TOC collapsed flags captured before fullscreen entry.
- Reuse the existing Tutor panel, collapse state, and orb; do not create a second chat flow.
- Preserve the existing 2.4-2 content, typography, bottom fill, composer behavior, and empty state.
- Keep narrow viewport behavior on the existing one-column lecture/Tutor switch.
- Do not persist fullscreen state across reloads.

## File Map

- Modify \`app/index.html:619-635\` to add the fullscreen toggle to the existing lesson top-bar actions.
- Modify \`app/app.js:716-1455, 2530-2545, 4350-4520\` to add fullscreen state, Fullscreen API synchronization, cleanup hooks, and button wiring.
- Modify \`app/style.css:32970-33705\` to add fullscreen layout selectors, button styling, and viewport overflow rules.
- Modify \`tools/check-convolution-lesson-visuals.js\` or add a focused static check in \`tools/test-lesson-browser-fullscreen.js\` to assert the new DOM contract and cleanup/listener code.
- Create \`tools/test-lesson-browser-fullscreen.js\` for fast source-level checks that do not require browser permission to enter fullscreen.
- Update \`.trellis/tasks/09-09-lesson-browser-fullscreen-tutor-orb/implement.md\` with the executed checklist and validation results.

### Task 1: Add fullscreen control and explicit state contract

**Files:**
- Modify: \`app/index.html:619-635\`
- Modify: \`app/app.js:716-760\`
- Test: \`tools/test-lesson-browser-fullscreen.js\`

**Interfaces:**
- Produces DOM id \`learnFullscreenBtn\` with \`aria-controls="learnBody"\` and \`aria-pressed\`.
- Produces state variables \`isLearnBrowserFullscreen\`, \`learnFullscreenSidebarState\`, and \`learnFullscreenReturnFocus\`.
- Produces \`updateLearnFullscreenButton()\` for later fullscreen event handlers and cleanup.

- [ ] **Step 1: Write the failing static contract test**

Create \`tools/test-lesson-browser-fullscreen.js\` that reads \`app/index.html\` and \`app/app.js\`, then fails unless:
  - \`learnFullscreenBtn\` is present once in the lesson top bar;
  - \`aria-controls="learnBody"\` and \`aria-pressed="false"\` are present;
  - the JS declares the three explicit state names;
  - the JS contains \`requestLearnBrowserFullscreen\`, \`exitLearnBrowserFullscreen\`, and \`syncLearnBrowserFullscreenState\`.

Run:
\`\`\`bash
node tools/test-lesson-browser-fullscreen.js
\`\`\`
Expected: FAIL because the new button and functions do not exist.

- [ ] **Step 2: Add the fullscreen button markup**

Insert a \`type="button"\` button before the existing Back button in \`#learnView .learn-topbar-actions\`:

\`\`\`html
<button class="learn-fullscreen-btn" id="learnFullscreenBtn"
        type="button" aria-controls="learnBody" aria-pressed="false"
        title="Enter fullscreen">Fullscreen</button>
\`\`\`

- [ ] **Step 3: Add state declarations and button reference**

Near the existing lesson panel state, add:

\`\`\`js
const learnFullscreenBtn = document.getElementById('learnFullscreenBtn');
let isLearnBrowserFullscreen = false;
let learnFullscreenSidebarState = null;
let learnFullscreenReturnFocus = null;
let learnFullscreenPending = false;
\`\`\`

Implement \`updateLearnFullscreenButton()\` so unsupported, pending, active, and inactive states set the button's text, title, \`aria-label\`, \`aria-pressed\`, and \`disabled\` value without changing unrelated controls.

- [ ] **Step 4: Run the static test**

Run:
\`\`\`bash
node tools/test-lesson-browser-fullscreen.js
\`\`\`
Expected: PASS for the markup, state, and function contract.

- [ ] **Step 5: Commit the focused control contract**

\`\`\`bash
git add app/index.html app/app.js tools/test-lesson-browser-fullscreen.js
git commit -m "feat: add lesson fullscreen control contract"
\`\`\`

### Task 2: Implement native fullscreen lifecycle and sidebar restoration

**Files:**
- Modify: \`app/app.js:1290-1395, 4350-4520\`
- Test: \`tools/test-lesson-browser-fullscreen.js\`

**Interfaces:**
- Consumes \`readConvolutionFocusSidebarState()\`, \`syncConvolutionFocusSidebarControls()\`, and existing lesson navigation hooks.
- Produces \`requestLearnBrowserFullscreen()\`, \`exitLearnBrowserFullscreen()\`, \`syncLearnBrowserFullscreenState()\`, \`restoreLearnFullscreenSidebarState()\`, and \`cleanupLearnBrowserFullscreen()\`.

- [ ] **Step 1: Extend the static test with lifecycle assertions**

Assert that \`app/app.js\` includes:
  - \`document.documentElement.requestFullscreen\`;
  - \`document.exitFullscreen\`;
  - \`fullscreenchange\` and \`fullscreenerror\` listeners;
  - \`learn-browser-fullscreen\` class;
  - cleanup calls from \`leaveConvolutionFocusBeforeWorkspaceNavigation\` or the lesson-close path.

Run the test and expect FAIL until the lifecycle is implemented.

- [ ] **Step 2: Implement sidebar capture and restoration**

Use the existing sidebar snapshot shape:

\`\`\`js
function restoreLearnFullscreenSidebarState() {
  const saved = learnFullscreenSidebarState;
  if (!saved) return;
  const appContainer = document.querySelector('.app');
  const leftSidebar = document.getElementById('leftSidebar');
  const tocSidebar = document.getElementById('tocSidebar');
  appContainer?.classList.toggle('sidebar-collapsed', saved.appCollapsed);
  leftSidebar?.classList.toggle('collapsed', saved.sidebarCollapsed);
  tocSidebar?.classList.toggle('collapsed', saved.tocCollapsed);
  syncConvolutionFocusSidebarControls(saved.appCollapsed || saved.sidebarCollapsed);
  learnFullscreenSidebarState = null;
}
\`\`\`

- [ ] **Step 3: Implement the confirmed fullscreen state sync**

Implement \`syncLearnBrowserFullscreenState()\` as the only function that changes the active state:

\`\`\`js
function syncLearnBrowserFullscreenState() {
  const root = document.documentElement;
  const active = document.fullscreenElement === root;
  const appContainer = document.querySelector('.app');
  const inLesson = learnView && !learnView.classList.contains('hidden');
  if (active && inLesson) {
    isLearnBrowserFullscreen = true;
    learnFullscreenPending = false;
    appContainer?.classList.add('learn-browser-fullscreen');
    appContainer?.classList.add('sidebar-collapsed');
    document.getElementById('leftSidebar')?.classList.add('collapsed');
    document.getElementById('tocSidebar')?.classList.add('collapsed');
  } else {
    isLearnBrowserFullscreen = false;
    learnFullscreenPending = false;
    appContainer?.classList.remove('learn-browser-fullscreen');
    restoreLearnFullscreenSidebarState();
  }
  updateLearnFullscreenButton();
  notifyConvolutionFocusLayoutChange();
}
\`\`\`

Keep the saved sidebar state until the confirmed exit cleanup completes; if the browser exits before confirmation, remove pending state without clobbering the pre-entry layout.

- [ ] **Step 4: Implement request, exit, and error paths**

\`\`\`js
async function requestLearnBrowserFullscreen() {
  if (!learnFullscreenBtn || !document.documentElement.requestFullscreen) return;
  learnFullscreenSidebarState = readConvolutionFocusSidebarState();
  learnFullscreenReturnFocus = document.activeElement;
  learnFullscreenPending = true;
  updateLearnFullscreenButton();
  try {
    await document.documentElement.requestFullscreen({ navigationUI: 'hide' });
  } catch (error) {
    learnFullscreenPending = false;
    learnFullscreenSidebarState = null;
    updateLearnFullscreenButton();
    console.warn('[lesson] fullscreen request failed', error);
  }
}

async function exitLearnBrowserFullscreen() {
  if (document.fullscreenElement) await document.exitFullscreen();
  else syncLearnBrowserFullscreenState();
}

function cleanupLearnBrowserFullscreen() {
  if (document.fullscreenElement === document.documentElement) {
    document.exitFullscreen().catch(() => {});
  } else {
    syncLearnBrowserFullscreenState();
  }
  learnFullscreenPending = false;
  learnFullscreenReturnFocus = null;
}
\`\`\`

Add one-time global listeners for \`fullscreenchange\` and \`fullscreenerror\`. On exit, restore focus to \`learnFullscreenReturnFocus\` if it is still connected; otherwise focus the fullscreen button. Do not register listeners every time the lesson opens.

- [ ] **Step 5: Wire button and navigation cleanup**

Add a click handler for \`learnFullscreenBtn\`. Call \`cleanupLearnBrowserFullscreen()\` before \`showWelcome\`, \`showAnswer\`, settings/workspace navigation, and \`closeLearnMode\` through the existing \`leaveConvolutionFocusBeforeWorkspaceNavigation()\` path. On lesson open, call \`updateLearnFullscreenButton()\` without entering fullscreen automatically.

- [ ] **Step 6: Run static and syntax checks**

Run:
\`\`\`bash
node tools/test-lesson-browser-fullscreen.js
node --check app/app.js
\`\`\`
Expected: PASS.

- [ ] **Step 7: Commit lifecycle behavior**

\`\`\`bash
git add app/app.js tools/test-lesson-browser-fullscreen.js
git commit -m "feat: sync lesson browser fullscreen lifecycle"
\`\`\`

### Task 3: Add fullscreen layout and Tutor button presentation

**Files:**
- Modify: \`app/style.css:32970-33705\`
- Test: \`tools/test-lesson-browser-fullscreen.js\`

**Interfaces:**
- Consumes the \`learn-browser-fullscreen\` class and existing \`convolution-focus-workspace-active\`, \`chat-collapsed\`, and \`#learnChatFab\` contracts.
- Produces visual states for normal fullscreen, Tutor-expanded fullscreen, Tutor-collapsed fullscreen, and narrow fullscreen.

- [ ] **Step 1: Extend the static test with CSS assertions**

Assert that \`app/style.css\` contains rules for:
  - \`.app.learn-browser-fullscreen\`;
  - hidden \`#leftSidebar\` and \`#tocSidebar\`;
  - full-width \`#mainContent\`, \`#learnView\`, and \`#learnBody\`;
  - \`.learn-fullscreen-btn\` active/focus styles;
  - fullscreen Tutor orb positioning.

Run and expect FAIL until the CSS is added.

- [ ] **Step 2: Add fullscreen layout rules**

Add a focused block after existing convolution workspace CSS:

\`\`\`css
.app.learn-browser-fullscreen {
  display: block !important;
  width: 100vw !important;
  min-width: 0 !important;
  min-height: 100dvh !important;
  overflow: hidden !important;
}
.app.learn-browser-fullscreen #leftSidebar,
.app.learn-browser-fullscreen #tocSidebar {
  display: none !important;
}
.app.learn-browser-fullscreen > .main,
.app.learn-browser-fullscreen #mainContent,
.app.learn-browser-fullscreen #learnView,
.app.learn-browser-fullscreen #learnBody {
  width: 100% !important;
  min-width: 0 !important;
  max-width: none !important;
  min-height: 100dvh !important;
}
.app.learn-browser-fullscreen #learnBody {
  height: calc(100dvh - var(--learn-topbar-height, 68px)) !important;
  overflow: hidden !important;
}
html:fullscreen,
html:fullscreen body {
  overflow: hidden !important;
}
\`\`\`

Use a single, stable grid for the desktop lesson body and leave the existing \`@media (max-width: 900px)\` one-column rules authoritative. Keep \`#learnChatFab\` above the fullscreen safe area with \`inset: auto 24px 24px auto\`.

- [ ] **Step 3: Style and label the fullscreen button**

Use existing compact top-bar button conventions. The button must have a visible label, a minimum 40px hit target, focus ring, and active state. On narrow screens, keep the label short while preserving an accessible title.

- [ ] **Step 4: Run the static test and visual asset check**

Run:
\`\`\`bash
node tools/test-lesson-browser-fullscreen.js
node tools/check-convolution-lesson-visuals.js
\`\`\`
Expected: PASS.

- [ ] **Step 5: Commit layout behavior**

\`\`\`bash
git add app/style.css tools/test-lesson-browser-fullscreen.js
git commit -m "feat: style fullscreen lesson workspace and Tutor orb"
\`\`\`

### Task 4: Browser interaction verification and regression checks

**Files:**
- Modify: \`tools/test-lesson-browser-fullscreen.js\` only if assertions need correction.
- Update: \`.trellis/tasks/09-09-lesson-browser-fullscreen-tutor-orb/implement.md\`

**Interfaces:**
- Verifies the completed DOM, JS, and CSS contracts.
- Verifies the current local server at \`http://localhost:9010/\`.

- [ ] **Step 1: Run syntax and focused checks**

\`\`\`bash
node --check app/app.js
node tools/test-lesson-browser-fullscreen.js
node tools/check-convolution-lesson-visuals.js
\`\`\`

Expected: all PASS.

- [ ] **Step 2: Run existing lesson checks**

\`\`\`bash
npm run test:convolution-layout
npm run test:convolution-micro
npm run test:mobile-learn-panels
\`\`\`

Expected: PASS. If a check requires a browser that is unavailable, record the exact limitation in \`implement.md\` rather than masking it.

- [ ] **Step 3: Exercise the real browser**

Using the open local app:
  1. Open 2.4-2 at \`http://localhost:9010/\`.
  2. Confirm normal state shows the left sidebar, lesson, and Tutor.
  3. Click \`Fullscreen\`; verify \`document.fullscreenElement === document.documentElement\`, address bar disappears, the left sidebar is absent, and the lesson fills the viewport.
  4. Click Tutor minimize; verify the Tutor column disappears and exactly one floating orb is visible.
  5. Click the orb; verify the Tutor column returns and the orb is hidden.
  6. Press \`Esc\`; verify browser fullscreen exits and the pre-entry sidebar state returns.
  7. Navigate away and reopen 2.4-2; verify no stale fullscreen class or duplicated controls remain.
  8. Capture screenshots for normal, fullscreen, collapsed Tutor, restored Tutor, and exited states.
  9. Repeat the fullscreen and Tutor checks at a narrow viewport and assert \\`document.documentElement.scrollWidth <= window.innerWidth\\` so no horizontal overflow is introduced.

- [ ] **Step 4: Update implementation record**

Record commands, observed browser behavior, screenshots, and any Fullscreen API limitation in \`.trellis/tasks/09-09-lesson-browser-fullscreen-tutor-orb/implement.md\`.

- [ ] **Step 5: Commit verification record**

\`\`\`bash
git add .trellis/tasks/09-09-lesson-browser-fullscreen-tutor-orb/implement.md tools/test-lesson-browser-fullscreen.js
git commit -m "test: verify lesson fullscreen and Tutor orb states"
\`\`\`

## Verification Matrix

| Behavior | Source check | Browser check |
|---|---|---|
| Fullscreen button | \`learnFullscreenBtn\` markup and JS contract | Address bar hidden; \`document.fullscreenElement\` is root |
| Sidebar hide/restore | class and restore functions | Hidden in fullscreen; pre-entry state after Esc |
| Tutor collapse | existing state names and CSS selectors | panel -> orb -> panel |
| Cleanup | navigation hook and fullscreen listeners | navigate away/reopen has one clean control |
| Layout | full-width, overflow-hidden, and narrow-viewport CSS | wide and narrow screenshots plus the \\`scrollWidth <= innerWidth\\` assertion |
