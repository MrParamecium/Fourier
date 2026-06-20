# Fourier Tutor Agent — Refactor Plan

Owner: FlyM1ss
Started: 2026-06-19
Status: Phase 0 merged (#15). Phase 1 #1 merged (#17, markdown engine).
Phase 1 #2 merged (#20, static data islands). Phase 1 #3 merged (#21, UI
Friction CSS). Phase 1 #4 merged (#22, RAGFlow client). Phase 1 #5 merged
(#23, user memory + feedback + sessions). Phase 1 #6 merged (#24, LLM
client wrappers). Phase 1 #7 merged (#25, lesson cache). Phase 1 #8 in
PR (static routes). Phase 1 #9+ not yet started.

This is the single source of truth for the multi-phase refactor of the
Fourier Tutor Agent repo. It is the canonical document — `workspace/memory/`
holds the source map and session logs, but the plan you act on lives here.

## Rules

These rules from FlyM1ss govern every phase. They are stricter than usual
refactor heuristics; do not relax them without an explicit instruction.

0. **Lean aggressive.** When in doubt between conservative-and-safe and
   aggressive-and-correct, pick aggressive — but verify with grep first.
1. **Unused code is dead code; delete directly.** If a function, file, or
   selector is not referenced by the running app or any committed test,
   delete it. Recover from git history if a future task needs it.
2. **Running, active code is the sole source of truth.** Documentation that
   disagrees with code gets updated to match the code, not the other way
   around. Exception: rule #4.
3. **User data belongs in a database.** Filesystem JSON in `app/users/` is
   tolerated only until the DB design conversation. Deferred until after
   Phase 3.
4. **Keep legacy documentation.** `docs/legacy/` is read-only — never edit
   or delete files there even when their content is wrong.
5. **Keep existing plans.** Plans live as long as they describe intent. Mark
   them done; do not delete them.

## Hard Invariants

Every commit in this refactor must preserve these. They are not negotiable.

- **No Windows-illegal filenames.** Never write paths containing
  `:` `|` `?` `*` `<` `>` `"`. Repo is used from Windows + WSL.
- **`aquarius_visual_latex_v2`** is the lesson-cache key suffix. Renaming
  invalidates every cached lesson.
- **`AQUARIUS_CONFIG`** is the deployed frontend config global. Renaming
  invalidates every deployed frontend.
- **Sonnet 4.6 is Agent B.** The Renderer model choice is a cost/quality
  decision; do not silently upgrade to Opus.
- **`ws-bridge.js` uses Node built-ins only.** No Express, no extra HTTP
  framework, no body-parser.
- **Materials resolution.** Bridge prefers `workspace/materials/` over root
  `materials/`. Both trees must stay in sync per `docs/sync-policy.md`.
- **Root-relative JSON maps.** `section-page-map-new.json`,
  `section-page-map-display-new.json`, `section-page-anchor-new.json`,
  `section-figure-map-new.json` are loaded by root-relative paths.
  Do not move them into subfolders.
- **Chapter 2 figure recrops** (`materials/new-book-figures/page-*-figure_2_*.png`
  + their meta JSONs, mirrored in `workspace/`) must not be deleted or replaced
  unless explicitly asked.
- **Teaching design rules** in `workspace/memory/MEMORY.md` (exam-oriented
  brevity, progress visibility, every concept gets an example, visual-first
  hierarchy) apply to all lesson-generation prompt changes.

## Phase 0 — Doc-vs-code conflicts + aggressive purge + 2nd-Ed retire

**Status: in PR (`cleanup/aggressive-purge-2026-06-19`, 6 commits).**

Goal: clear noise so structural work has clean ground. No module
extractions yet; only deletions, bug fixes, and the 2nd Edition retire.

Landed:

- `e3e47d2` — sync-policy.md, WINDOWS_RAG_HANDOFF.md, PROJECT_STRUCTURE.md
  brought into sync with code (workspace-preferred materials,
  RAGFLOW_* env vars, retrieveFromRagFlow function name).
- `96c6880` — duplicate `/generated/` route in ws-bridge.js deleted.
- `1d31351` — duplicate Clerk `addListener` in initClerk fixed.
- `96740c3` — aggressive cleanup + 2nd Edition retire:
  - 8 orphan ws-bridge.js helpers (~336 lines)
  - 19 orphan app.js functions (~224 lines)
  - 50 unreferenced `.homework-*` CSS selectors (~1,740 lines)
  - 10 misc dead CSS selector families (~630 lines)
  - `pptxgenjs` + `ws` npm deps (no callers)
  - `app/users/guest_qh2romk1.json` (0-byte residue)
  - 2nd Edition data + routes + book switcher
    (`syllabusDataOld`, `SECTION_PREVIEWS`, `setBook`, `OCR_DIR_OLD`,
    `BOOK_INDEX_OLD`, `SECTION_PAGE_MAP`, `/old-pages` route)
  - Cross-boundary near-duplicates documented as
    `KNOWN DIVERGENCE` (sortSourcesByType differs intentionally)
- `6ec6eab` — canonical codebase structural map persisted to
  `workspace/memory/codebase-map-2026-06-19.md`.
- `63b1a8f` — release bump v1.2.4 → v1.2.5 with cache-buster query params.

Net: 379 files changed, 964 insertions, 12,995 deletions (~-12 k LOC).
`npm run check` green throughout.

## Phase 1 — Tier 1 extractions (low risk, immediate wins)

**Status: not started. Run after Phase 0 merges.**

Goal: extract self-contained modules with clean boundaries and low blast
radius. Ordered by dependency — extract #1 first because four Phase 2
candidates depend on `markdownToHtml`.

| # | Extraction | Location | Lines | Notes |
|---|---|---|---|---|
| 1 | Markdown engine (`markdownToHtml`, `inlineFormat`, `parseMdTable`, `decodeHtmlEntities`) | `app/app.js` L15310–15600 | 290 | **Merged in #17.** Leverage move — unlocks Phase 2 #12-14, #17. |
| 2 | Static-data islands (`DEFAULT_PREFERENCE_PROFILE`, `SECTION_PREVIEWS_NEW`, `syllabusDataNew`, `QUIZ_QUESTIONS`, course tables) | `app/app.js` (scattered) | ~1,250 | **In PR.** Plan's original ~4,500 estimate counted surrounding render functions; islands themselves are ~1,250 lines of pure read-only data. Extracted as classic-script JS data modules under `app/data/` instead of JSON because consumers run on the initial-render path; async JSON loading would force gating across ~30 read sites and push the PR out of Tier 1. Hard invariant "root-relative" interpretation: data files live at `app/data/`, served at `/data/*`. |
| 3 | UI Friction Fix Pack v1.2.3 CSS | `app/style.css` L45288–45494 (was L47659–47865 before Phase 0/1 deletions) | 207 | **Merged in #21.** Extracted to `app/css/ui-friction-v123.css`, loaded after `style.css` to preserve cascade order. `test-ui-friction-v123.js` re-verified the pager rule + Quick-Check `kc-option-btn` override resolve from the new file. |
| 4 | RAGFlow client | `app/ws-bridge.js` L112-129 (env consts) + L3120-3279 (functions) | 178 | **In PR.** Extracted to `app/ragflow-client.js` as a factory module — bridge injects `compactWhitespace` / `normalizeUrl` / `httpRequestJson` to avoid a premature shared-utils module. **Pattern precedent for #5+**: when an extracted module needs ws-bridge utilities, prefer dep-injection via a factory over re-defining the utility or pulling it from a not-yet-extracted utils module. Plan's original L3054–3215 estimate was off by ~70 lines due to Phase 0 deletions; functions actually sat at L3120-3279 with the env constants at L112-129. |
| 5 | User memory + feedback + sessions IO | `app/ws-bridge.js` L1387-1800 | 414 | **In PR.** Extracted to `app/user-memory.js` as a factory module (same pattern as #4). Co-extracted the per-uid sessions interface added in PR #18, since `persistSessionTurn` and `readSessionFile` are part of the same on-disk JSON layout under `USERS_DIR`. Scope grew from the plan's 314 lines because the sessions interface (~150 lines) and the `USERS_DIR`/`FEEDBACK_BOARD_PATH`/`SESSIONS_DIR` constants weren't part of the original count. Pre-positions Phase 4 DB swap. |
| 6 | LLM client wrappers (`callOpenRouterChat`, `callOpenAIChat`, JSON repair) | `app/ws-bridge.js` L109-118 (URLs + key getters) + L1744-1937 (4 functions) | 204 | **In PR.** Extracted to `app/llm-client.js` as a factory module. `tryParseJsonLoose` and the private `repairJsonLatexEscapes` helper move together because the LaTeX-escape repair is only meaningful for model JSON output. ws-bridge llm-client require is placed BEFORE the user-memory require so the latter's destructure of `callOpenRouterChat` sees a defined `const` binding (function-decl hoisting no longer covers it). |
| 7 | Lesson cache reader/writer + filename hygiene | `app/ws-bridge.js` L1093-1098 (constants) + L1152-1375 (8 functions, interleaved) | ~165 | **In PR.** Extracted to `app/lesson-cache.js` as a factory module. **Owns the `aquarius_visual_latex_v2` LESSON_CACHE_VERSION string** — the Hard Invariant. Lesson-format helpers (`prepareLessonForCache`, `collectLessonFormatIssues`, `assertLessonFormatClean`) stay in ws-bridge.js and are injected as deps, because they're also called outside the cache path (live generation, pregen). `FORMULA_CATALOG_DIR` and `BLUEPRINT_DIR` constants stay in ws-bridge.js — different concern. |
| 8 | Static-file route handlers | `app/ws-bridge.js` L1234-1268 (helpers) + L5538-5615 (routes) | ~110 | **In PR.** Extracted to `app/static-routes.js`. Module exposes a single `handleStaticRoute(req, res, pathname) → bool` consolidator; the bridge's request handler now calls it once near the end of the chain instead of inlining 5 if-blocks. `serveStaticFile` / `serveStaticFromDir` stay private to the module (no external callers after the consolidation). Plan's original 278-line estimate counted surrounding handler context that hadn't yet been factored out of the request handler. |
| 9 | Search helpers (DuckDuckGo + Wikipedia + Wikimedia) | `app/ws-bridge.js` L2546–2810 | 265 | Pure HTTP wrappers. |
| 10 | Login intro / cosmos / landing experience | `app/app.js` L41–126, L498–639 + `app/index.html` L1603–1797 | 350 | Decorative, fails visibly if broken. |
| 11 | Inline `<style>` block in `index.html` | `app/index.html` L73–1600 | 1,528 | Halves `index.html`. Clean `.intro-landing-new` boundary. |

Plus 4 small items (section-preview helpers ~76 lines, splash/loading UI
~41 lines, web-sources rendering ~143 lines, build orchestration in
`package.json` scripts).

**Per-extraction checklist:** (1) write the module, (2) replace inline
copies with imports, (3) `npm run check`, (4) manual smoke test of the
affected feature, (5) commit. One PR per extraction unless two are
trivially small.

## Phase 2 — Tier 2 extractions (few-PRs, medium risk)

**Status: not started.**

Big payoff per item but each owns state, persistence, or runtime DOM.
Plan one-PR-per-item; expect 2-3 review rounds per.

| # | Extraction | Location | Lines |
|---|---|---|---|
| 12 | Mistake Notebook subsystem | `app/app.js` L1779–2270 + index.html view | 491 |
| 13 | Homework subsystem | `app/app.js` L1288–1778 + `/api/homework` | 491 |
| 14 | Preference profile subsystem | `app/app.js` L1007–1152, L2271–2399 | 274 |
| 15 | Attachments pipeline (parse + preview + DOCX) | `app/app.js` L3216–3760 | 545 |
| 16 | Clerk auth + return-intent state machine | `app/app.js` L147–855 | 700 |
| 17 | Recent-conversations storage | `app/app.js` L18653–19200 | 547 |
| 18 | Interactive demos subsystem (split per family) | `app/app.js` L7825–11842 | 4,018 |
| 19 | Glass + chapter-overview CSS blocks | `app/style.css` L31257–47658 | 16,402 |

## Phase 3 — Tier 3 (multi-week, high payoff)

**Status: not started.**

Largest cleanups. All CSS or runtime-style-injection.

| # | Extraction | Location | Lines |
|---|---|---|---|
| 20 | Home Ask EOF cluster consolidation | `app/style.css` L33181–45296 (12+ named passes) | ~6,000 |
| 21 | `hydrateInteractiveDemos` dispatcher split | `app/app.js` L8580–9819 | 1,240 |
| 22 | 5 `inject*Styles` runtime CSS-injection helpers (collapse with style.css) | `app/app.js` L5894–7327 | 1,430 |

## Phase 4 — Deferred

Out of scope until after Phase 3.

- **Database for user data** (rule #3). Currently filesystem JSON in
  `app/users/`. Render free-tier ephemeral filesystem already breaks the
  multi-user case. Schedule the design conversation when Phase 3 lands.

## Sequence Rules

These dependencies are baked into the order above; do not reorder without
re-checking them.

- Phase 1 #1 (markdown engine) must come before Phase 2 #12-14 and #17.
- Phase 1 #2 (static data) must come before Phase 1 #11 and any
  syllabus-helper extraction.
- Phase 2 #18 (interactive demos) depends on Phase 3 #21 helper extraction
  landing first.
- Phase 2 #19 (glass + overview CSS) must respect cascade order — each
  split file must keep its `<link>` slot in the same position.
- Every extraction preserves the Hard Invariants section above.

## References

- `workspace/memory/codebase-map-2026-06-19.md` — full source map with
  per-candidate effort/risk/payoff scores and `mustNotBreak` checklists.
- `workspace/memory/2026-06-19.md` — Phase 0 session log.
- `docs/sync-policy.md` — workspace ↔ root materials sync rules.
- `docs/WINDOWS_RAG_HANDOFF.md` — RAGFlow sidecar handoff.
- `PROJECT_STRUCTURE.md` — runtime layout snapshot.
- `knowledge/gated-timebox-protocol.md` (central DB) — Sev-1/2/3 triage.
