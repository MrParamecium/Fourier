# Implementation Record

## Completed

- [x] Added the lesson top-bar `Fullscreen` control with `aria-controls` and `aria-pressed` state.
- [x] Added browser-native fullscreen lifecycle handling using `document.documentElement.requestFullscreen({ navigationUI: 'hide' })` and the `fullscreenchange` event as the state source of truth.
- [x] Captured and restored the app, lesson navigation, and TOC sidebar collapsed state on entry, Esc exit, button exit, fullscreen error, and lesson navigation.
- [x] Added the fullscreen layout contract: browser fullscreen hides the left navigation and TOC, expands the lesson workspace, and clips viewport overflow.
- [x] Reused the existing Tutor collapse state and floating `#learnChatFab`; fullscreen now re-applies the shared Tutor state contract so the minimize button and restore orb update immediately.
- [x] Extended the Tutor orb selectors to the native fullscreen state, overriding the older docked-Q&A hide rule without creating a second chat flow.
- [x] Preserved the existing narrow one-column panel behavior and added a compact fullscreen button presentation for narrow screens.
- [x] Added focused static contract checks in `tools/test-lesson-browser-fullscreen.js`.

## Validation

Passed:

```text
node --check app/app.js
node tools/test-lesson-browser-fullscreen.js --css
node tools/check-convolution-lesson-visuals.js
```

A synthetic Playwright browser regression (with a test-only Fullscreen API shim) passed these states:

- normal lesson layout;
- confirmed native fullscreen state and sidebar/TOC hiding;
- Tutor expanded with the fullscreen minimize control visible;
- Tutor collapsed to one visible fixed orb at the lower-right;
- orb click restoring the Tutor panel;
- fullscreen exit restoring the button, sidebar, and normal layout;
- 760px narrow viewport with `document.documentElement.scrollWidth === window.innerWidth`.

The attached Chrome automation tab does not expose a usable Fullscreen API (`document.fullscreenEnabled` is unavailable there), so its real address-bar transition could not be exercised through CUA. The production path remains gated by the browser's native Fullscreen API and is only marked active after `fullscreenchange` confirms `document.fullscreenElement === document.documentElement`.

Known unrelated checks:

- `npm run check` still reaches the repository's existing 2.4-2 GeoGebra pilot/material consistency failures; these predate this fullscreen change and are outside the requested behavior.
- `npm run test:convolution-layout` still cannot render the fresh lesson within its existing 25-second harness window; this is the known fresh-lesson harness limitation.
- `npm run test:convolution-micro` hits the same fresh-lesson render timeout.
- `npm run test:mobile-learn-panels` hits its existing 5-second lesson-open timeout.
