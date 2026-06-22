# Project Structure

This file describes the organized project layout after the first cleanup pass on 2026-05-15.

## Runtime App

```text
app/
├── index.html
├── app.js
├── style.css
├── ws-bridge.js
├── process-python.js
├── matplotlib_gen.py
├── config.js
├── scripts/
├── src/
├── section-page-map.json
├── section-page-map-new.json
├── section-page-map-display-new.json
├── section-page-anchor-new.json
└── section-figure-map-new.json
```

`app/` is the running application. Some assets and map files still live at the UI root because the existing frontend and bridge load them from root-relative paths.

## Runtime Materials

The running app reads materials from **`workspace/materials/`** by default (verified by
`app/ws-bridge.js:86` `resolveExistingDir`). Root `materials/` is a legacy fallback mirror kept for
backward compatibility — see `docs/sync-policy.md` for the full sync rules.

Canonical tree (read by the bridge):

```text
workspace/materials/
├── new-book-pages/
├── new-book-ocr/
├── new-book-section-ocr/
├── new-book-figures/
├── lesson-cache/                  (173 section directories — live)
├── background-ocr-v3/
├── background-pages-split/
├── prompts/                       (agent-a-planner.md, agent-b-tutor.md, schemas)
├── exam-priority/
├── formula-catalog/
├── build_new_section_map.py
├── generate_chapter_ocr_local.py
└── extract_new_book_figs.py
```

Legacy fallback mirror (kept but not currently read):

```text
materials/
├── new-book-pages/
├── new-book-ocr/
├── new-book-figures/
├── lesson-cache/                  (42 section directories — stale, 131 dirs behind workspace)
├── build_new_section_map.py
├── generate_chapter_ocr_local.py
└── extract_new_book_figs.py
```

The bridge prefers `workspace/materials/` when either `background-ocr-v3/` or `new-book-ocr/`
exists under it. Both subdirs exist in a normal checkout, so workspace wins. Writing to root
`materials/` has no runtime effect.

## Tools

```text
tools/
├── test-utils.js                  (shared Playwright helpers)
├── visual-diff.js                 (pixel-diff harness, 18 views across pages A/B/C)
├── visual-baseline/               (committed PNGs — the regression reference)
├── visual-current/                (last --check capture; git-ignored)
├── visual-diff/                   (per-view PNG diff for failing views; git-ignored)
├── visual-diff-report.md          (last --check pass/fail table + dispatcher coverage block)
├── visual-diff-coverage.json      (machine-readable Page C family-routing record)
├── smoke.js                       (deterministic UI smoke suite, ~12s)
├── smoke-report.md                (last smoke.js result)
├── test-lesson-open-no-hang.js    (legacy Playwright regression: lesson open must not hang)
├── test-ui-friction-v123.js       (legacy UI friction regression)
├── test-data-modules-shape.js     (assertion suite for app/data/*.js exports)
├── scan-unused-css.js             (CSS orphan-selector finder, feeds Phase 3 #20 work)
└── unused-css-report.md           (last scan-unused-css.js output)
```

`tools/` contains Playwright e2e regression scripts. These are not the app entry point and require `npx playwright install chromium` before they run.

`visual-diff.js` and `smoke.js` share their Playwright helpers (`enterGuestMode`, `openSubtopic`, `MASK_CSS`, `settleLesson`, the `resolveLessonCachePath` workspace-preferred materials chain, etc.) via `test-utils.js`. The split rule is intentional: visual-diff-specific helpers (the Page C family-routing walker, the syllabus-close-for-capture helper, the PNG diff core) live in `visual-diff.js`; anything a second tool can reuse belongs in `test-utils.js`. Adding a new shared helper without a second consumer is premature centralization — keep it module-private until a real reuse case appears.

To baseline the harness against the current code: `node tools/visual-diff.js --baseline` (writes PNGs into `tools/visual-baseline/`; commit them). To check current state vs the committed baseline: `node tools/visual-diff.js --check` (writes `tools/visual-current/` + `tools/visual-diff/` + the report files; exit 0 iff every view diffs under 0.5%). The full harness-design spec is `docs/superpowers/specs/2026-06-22-harness-expansion-design.md`.

## Working Materials And Memory

```text
workspace/
├── memory/
├── materials/
└── app-mirror/
```

This directory is the broader workbench and the **canonical materials tree**: project memory,
the live materials/ subtree (preferred by the bridge), mirrored prompts and OCR data, and
extraction experiments. The running app uses root `app/` (UI + bridge code) and
`workspace/materials/` (assets). Root `materials/` is a legacy fallback mirror — see
`docs/sync-policy.md`.

## Local-Only Files

```text
.local/
├── archive/2026-05-15-cleanup/
├── archive/2026-05-15-unused-candidates/
└── visual-audit-20260514/
```

`.local/` is intentionally ignored by Git. It keeps local historical files, visual audit sheets, generated images, local user data, logs, and one-off repair scripts available without making collaborators pull them.

## First Cleanup Pass

Moved into the local archive:

- `app/debug/`
- `app/generated/`
- `app/users/`
- `app/tmp-track-samples/`
- `app/backup-codex-20260505-034837/`
- `app/*.log`
- old one-off scripts such as `fix-html.py`, `fix-intro.py`, `insert_modal.py`, `pregenerate_test.js`, `test_process_python.js`, and `verify_section_visuals.py`
- root legacy notes and the old root `style.css` moved to `docs/legacy/`
- local visual audit sheets moved to `.local/visual-audit-20260514/`

Kept in place:

- running UI files
- Node bridge files
- material folders
- Chapter 2 recrops and metadata
- UI section maps
- scripts that are still location-dependent

## Second Cleanup Pass

Moved into `.local/archive/2026-05-15-unused-candidates/`:

- `workspace/root-scripts/`
- `workspace/tmp/`
- duplicate `workspace/tutor_craft.py`
- app mirror logs, backups, temporary track samples, debug output, generated output, local users data, and old one-off app mirror scripts
- empty local runtime directories `app/debug/`, `app/generated/`, and `app/users/`
- `.DS_Store` files removed

Kept `workspace/app-mirror/` as a lightweight code mirror for reference, but removed its local generated/debug/user payloads.

## Before Broad Edits

1. Read `workspace/memory/MEMORY.md`.
2. Read the newest files in `workspace/memory/`.
3. Run `npm run check`.
4. Avoid deleting Chapter 2 figure crops or metadata unless FlyM1ss explicitly asks.
