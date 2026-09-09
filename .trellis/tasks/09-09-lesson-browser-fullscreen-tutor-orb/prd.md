# PRD: Browser fullscreen lesson workspace and collapsible Tutor orb

## Requirements

- Add a lesson fullscreen button that invokes browser-native fullscreen and hides the address bar.
- Hide the left application navigation while fullscreen and restore its previous collapsed/expanded state on exit.
- Keep the lesson explanation as the primary full-width workspace.
- Let the right Tutor panel collapse into a small floating orb and restore on orb click.
- Support exit by button, browser Esc, lesson navigation, and close.
- Reuse the existing lesson and Tutor state instead of creating a parallel chat flow.
- Preserve current 2.4-2 content, typography, bottom fill, input composer, and empty state.

## Acceptance criteria

- Native fullscreen is confirmed by document.fullscreenElement after a user click.
- The left navigation is hidden only after fullscreen confirmation.
- The lesson fills the viewport and has no horizontal overflow.
- Tutor collapse/restore works in fullscreen and remains keyboard accessible.
- Esc and navigation restore the pre-entry sidebar state.
- Fullscreen failures leave the regular lesson layout usable.
- Existing visual checks remain passing.

