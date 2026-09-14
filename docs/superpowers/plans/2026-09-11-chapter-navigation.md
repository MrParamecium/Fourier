# Chapter navigation implementation plan

Goal: Preserve the existing classroom shell while replacing the sidebar tree with chapter navigation and adding lesson overview pages.

1. Keep syllabus nodes for existing progress tracking; hide descendant navigation and route chapter clicks to a flat chapter overview.
2. Render chapter and lesson overview content with existing overview classes. Use syllabus entries and existing section previews; never fetch lesson content until Start lesson.
3. Add explicit chapter/overview return controls. Route the English tour through Chapter 2, the 2.4-2 overview and Start lesson.
4. Verify syntax, diff whitespace and the real browser navigation/tour. Preserve all pre-existing changes and credentials.
