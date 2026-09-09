# 2.4-2 Browser Fullscreen Lesson Workspace and Collapsible Tutor

## Problem

The lesson view currently has a persistent application sidebar and a right-side Tutor panel. For the long-form 2.4-2 explanation, the user needs a reading mode that behaves like the standalone lesson HTML: the browser address bar should disappear, the lesson should fill the viewport, and Tutor should be available without permanently taking space.

## Outcome

Add a browser-native fullscreen control to the lesson view. Entering fullscreen hides the left navigation and expands the lesson workspace. Tutor remains available on the right and can be collapsed into a small floating orb; clicking the orb restores the Tutor panel. Exiting fullscreen with the button or Esc restores the prior application layout.

## Scope

### In scope

- A fullscreen toggle in the lesson top bar.
- Browser Fullscreen API integration using a user gesture.
- Hiding and restoring the left application sidebar while the lesson is fullscreen.
- A fullscreen lesson layout that fills the viewport.
- Tutor collapse and restore in fullscreen:
  - visible right panel -> click collapse -> hidden panel plus floating orb;
  - click orb -> right panel restored.
- Synchronization with browser fullscreenchange and fullscreenerror events.
- Cleanup when leaving the lesson, navigating to another workspace, or closing the lesson.
- Keyboard and screen-reader labels for all new state changes.
- Desktop and narrow viewport behavior.

### Out of scope

- A second Tutor implementation or a new chat data flow.
- Replacing the existing Tutor popover.
- Persisting fullscreen state across reloads.
- Changing the lesson content, typography, or input composer behavior.
- Automatically entering fullscreen without an explicit click.

## Existing contracts to preserve

The implementation must reuse the current lesson state and controls:

- #learnView, #learnBody, #learnBody .learn-body-inner
- #leftSidebar, #tocSidebar, and the app sidebar-collapsed state
- isLearnChatCollapsed
- #learnTutorMinimizeBtn
- #learnChatFab
- syncConvolutionFocusWorkspace() and resetConvolutionFocusWorkspace()
- Existing mobile single-panel behavior

The change must not remove the existing Tutor collapse/orb behavior or reset unrelated sidebar state.

## Proposed interaction design

### Fullscreen entry

1. User clicks Fullscreen in the lesson top bar.
2. The app records the current left-sidebar and TOC-sidebar state plus the element that should regain focus.
3. The app calls document.documentElement.requestFullscreen({ navigationUI: 'hide' }).
4. After fullscreenchange confirms the document is fullscreen, the app adds the fullscreen lesson state and hides the left sidebar.
5. The button changes to Exit fullscreen and exposes aria-pressed="true".

The lesson top bar remains visible so the exit action is always discoverable. The reading surface and Tutor area use the full viewport below it.

### Fullscreen exit

- Clicking Exit fullscreen calls document.exitFullscreen().
- Pressing Esc is handled by the browser; the fullscreenchange listener then removes the fullscreen lesson state and restores the saved sidebar state.
- Leaving the lesson calls the same cleanup path before the view is hidden.
- If the browser rejects the request, the app keeps its normal layout and returns the button to the enter state. No partial fullscreen class may remain.

### Tutor collapse

- In fullscreen, the existing Tutor minimize button is visible at the top-right of the Tutor panel.
- Clicking it sets the existing chat-collapsed state, hides the Tutor column, and shows #learnChatFab as a small fixed orb at the lower-right safe area.
- The orb carries Open Tutor, aria-controls="learnChatCol", and aria-expanded="false".
- Clicking the orb restores the Tutor column, hides the orb, and returns focus to the Tutor panel.
- The collapse state is independent from browser fullscreen: exiting fullscreen does not silently reopen Tutor.

## Technical design

### DOM

Add one button inside #learnView .learn-topbar-actions:

- id: learnFullscreenBtn
- initial label: Fullscreen
- exit label: Exit fullscreen
- type="button"
- aria-controls="learnBody"
- aria-pressed="false"

Use the existing Tutor controls and orb; do not add duplicate chat markup.

### State

Add explicit state near the existing lesson panel state:

- isLearnBrowserFullscreen
- learnFullscreenSidebarState
- learnFullscreenReturnFocus

The saved sidebar state must include the app/sidebar/TOC collapsed flags already returned by readConvolutionFocusSidebarState(). It is captured only on entry and cleared after cleanup.

### Fullscreen functions

Implement small, testable functions:

- requestLearnBrowserFullscreen()
- exitLearnBrowserFullscreen()
- syncLearnBrowserFullscreenState()
- restoreLearnFullscreenSidebarState()
- updateLearnFullscreenButton()

The fullscreenchange listener is the source of truth. It must compare document.fullscreenElement to the requested root and handle external exits such as Esc.

The request path must not mark the app as fullscreen before the browser confirms success.

### Layout and CSS

Add a single app/lesson state class, for example learn-browser-fullscreen, only after Fullscreen API confirmation.

When active:

- the app uses one full-width main column;
- #leftSidebar and #tocSidebar are hidden;
- #mainContent, #learnView, and #learnBody fill the viewport;
- the lesson body retains its two-column lecture/Tutor layout on wide screens;
- on narrow screens the existing one-column lecture/Tutor switching rules remain active;
- the Tutor orb is fixed above the bottom/right safe area and remains keyboard reachable.

Use :fullscreen selectors only for browser fullscreen-specific viewport rules. Keep the explicit state class for JavaScript-driven layout and accessibility synchronization.

### Error handling

- fullscreenerror removes the pending/active state and restores the button label.
- A missing Fullscreen API must leave the regular lesson view usable.
- Existing sidebar state is restored even if a lesson navigation action occurs immediately after an exit event.

### Accessibility

- Fullscreen button has visible text or an accessible label for both states.
- Tutor minimize and orb controls update title, aria-label, and aria-expanded.
- Focus returns to the fullscreen button after exit when it still exists; focus moves to the Tutor panel/orb after the corresponding Tutor action.
- Esc remains the standard browser exit affordance.

## Acceptance criteria

1. Clicking the lesson fullscreen button hides the browser address bar through the native Fullscreen API.
2. After entry, the left sidebar is hidden and the lesson fills the viewport without a second page scrollbar.
3. The fullscreen button changes to an exit state and is keyboard/screen-reader labeled correctly.
4. Clicking Tutor minimize hides the right panel and shows one small floating orb.
5. Clicking the orb restores the right Tutor panel and hides the orb.
6. Pressing Esc exits browser fullscreen and restores the sidebar state that existed before entry.
7. Leaving the lesson clears fullscreen classes, listeners do not duplicate, and the next lesson opens normally.
8. A rejected or unavailable fullscreen request leaves the lesson in its prior layout.
9. Existing 2.4-2 content, bottom fill, input composer, and Tutor empty state remain intact.
10. The behavior works on wide and narrow viewports without introducing horizontal overflow.

## Validation plan

- Static checks for the new DOM id, event listeners, and state cleanup.
- Existing visual asset check: node tools/check-convolution-lesson-visuals.js.
- Real browser interaction using the open local app:
  1. open 2.4-2;
  2. click fullscreen;
  3. inspect fullscreen state/sidebar/viewport;
  4. minimize Tutor and restore it through the orb;
  5. press Esc;
  6. navigate away and reopen the lesson.
- Capture screenshots for normal, fullscreen, Tutor-collapsed, and restored states.

