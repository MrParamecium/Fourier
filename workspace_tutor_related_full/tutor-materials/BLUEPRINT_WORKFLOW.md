# Blueprint Workflow

## Purpose

The lesson pipeline now supports **editor-authored external blueprint JSON files**.

This means a section can skip live Agent A planning and directly use a curated blueprint file before Agent B execution.

## Current behavior

When `generateSectionLesson(sectionId, ...)` runs, it now:

1. tries to load an external blueprint JSON for that section
2. if found, uses it directly
3. if not found, falls back to live Agent A planning
4. Agent B still executes the final blueprint into lesson markdown

## Naming convention

Current external blueprint filenames should follow this pattern:

- `B6_1_BLUEPRINT_EXECUTABLE.json`
- `B6_2_BLUEPRINT_EXECUTABLE.json`

The loader is tolerant and tries multiple candidates derived from `sectionId`, but the clean editorial convention should be:

- uppercase
- dots replaced with underscores
- hyphens kept as underscores when convenient
- suffix: `_BLUEPRINT_EXECUTABLE.json`

## Current confirmed examples

- `B6_1_BLUEPRINT_EXECUTABLE.json`
- `B6_2_BLUEPRINT_EXECUTABLE.json`

## Recommended workflow

1. write editorial brief
2. write blueprint draft
3. convert to executable blueprint JSON
4. place blueprint JSON in `tutor-materials/`
5. let generation pipeline pick it up automatically
6. use Agent B to execute the blueprint
7. save result into `aquarius_std_v1` lesson cache

## Important note

Current runtime lesson delivery is in **cache-only mode**.

So:

- external blueprints are now part of the editorial / pre-generation pipeline
- but sections still need explicit pre-generation into cache before students will see the lesson
