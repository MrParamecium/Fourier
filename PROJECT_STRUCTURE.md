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
└── tools/tutor_craft.py
```

`tools/` contains optional maintenance scripts. These are not the app entry point.

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
