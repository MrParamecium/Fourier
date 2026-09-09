# Design: Browser fullscreen lesson workspace and collapsible Tutor orb

The full design is documented in docs/superpowers/specs/2026-09-09-lesson-browser-fullscreen-tutor-orb-design.md.

Implementation will extend the current lesson top-bar controls and the existing Tutor collapse/orb state. The browser fullscreenchange event is the source of truth; sidebar state is captured before entry and restored on exit. No duplicate Tutor markup or new chat data flow is introduced.

