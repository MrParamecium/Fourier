# Codebase Map — fourier-tutor-agent (2026-06-19, PARTIAL)

> **STATUS: PARTIAL.** Built by a 15-agent discovery workflow. 6 agents failed on transient socket errors
> (app.js chunks 1-5000, 10000-15000, 15000-end; ws-bridge.js full; dead-css-detector; extraction-seams).
> Synthesis was run with the 9 successful reports. A resume run is in progress (task `wylsvupzp`) — the
> complete map will land at `codebase-map-2026-06-19.md` when retry finishes.
>
> **What's grounded in this partial map:** style.css characterization, index.html structure,
> external deps + integration contracts, materials/workspace tree shape, docs inventory,
> dead JS detection, json-data inventory, app.js lines 5000-10000 inventory.
>
> **What's INFERRED (treat with caution):** app.js coverage outside L5000-10000 (specific line
> numbers may be wrong or absent), ws-bridge.js coverage beyond the deps-grep findings, dead-CSS
> line estimates, the full extraction-seams ranking.

## The Four Monoliths

| File | Lines | Size | Pain | Dominant smell |
|---|---|---|---|---|
| `app/style.css` | **47,865** | 1.9 MB | critical | Chronological fix-pack stratification; **16,760 `!important`**, **453 `#learnView#learnView` double-ID hacks**, 30+ "FINAL/TRUE EOF/ABSOLUTE EOF LOCK" override clusters; same selectors redefined 9-19 times; no per-component organization |
| `app/app.js` | ~19,000 | 800 KB | critical | Kitchen-sink god-file; 5 runtime CSS-injection helpers (1430 lines), ~90 `getElementById` constants at module load, syllabus literals inlined ~600 lines, two competing recent-conversations APIs |
| `app/ws-bridge.js` | ~6,700 | 270 KB | high | Single `if(pathname===)` chain; dual-agent pipeline + RAG-lite + RAGFlow + Serper + Python subprocess + materials-resolution + cache all colocated; ~9 orphaned helpers incl. explicit `_legacyGenerateSectionLesson` |
| `app/index.html` | 3,147 | 200 KB | high | Single-file shell with **1,528-line inline `<style>` block** (L73-1600) for intro-landing only; 49 embedded SVGs; 8 view panels in one `<main>`; version v1.2.4 hardcoded twice (L1887 sidebar + L2484 Settings) |

## Cross-File Subsystems (13 identified)

1. **Lesson Cache subsystem** — `ws-bridge.js` L1150-1401 materials resolution + cache filename naming + legacy fallback reader; `app.js` section open flow. Cache miss returns fixed "not prepared" — NO live fallback. Coupling HIGH (filename pattern, materials fallback, prompt design interlocked).
2. **Dual-Agent Lesson Rendering Pipeline** — `ws-bridge.js` Agent A planner ~L4395-4447, Agent B renderer ~L4648-4745, model IDs at ~L3639-3640. Frozen cost decision: Sonnet 4.6, do NOT silently upgrade to Opus.
3. **Interactive Demo Subsystem** — `app.js` L7825-15000: `hydrateInteractiveDemos` dispatcher (1240 lines L8580-9819), `hydrateChapterOneDemo` (480 lines L8094-8578), 10+ `render*Fallback` functions past L10000. Coupling VERY HIGH; inline state, expandos, MathJax timing.
4. **Learn View / Lecture Pipeline** — `index.html#learnView` L2143-2400, `app.js` Learn-mode DOM constants L5768-5892, `inject*Styles` stack L5894-7327. Coupling VERY HIGH.
5. **Section-Map / Page-Map Resolution** — Five JSON maps at `app/` root. `SECTION_PAGE_MAP_VERSION = '1778673277'` at `app.js` L14693 is the cache-buster. Files MUST stay at `app/` root.
6. **Materials Resolution + Sync Policy** — Three independent resolvers (ws-bridge `resolveExistingDir` ~L86, `build-new-book-section-ocr.js`, `build-section-page-display-map.js`) that can disagree. `docs/sync-policy.md` is STALE.
7. **Frontend View Routing + Workspace Shell** — 8 panels in one `<main>`; sidebar drives navigation.
8. **Auth (Client-Only Clerk)** — Browser-side `@clerk/clerk-js@4`. Backend has NO Clerk verification.
9. **Python Subprocess Pipeline** — Two paths: `matplotlib_gen.py` (structured spec) + `process-python.js` (LLM scripts). `TUTOR_PYTHON_BIN` default = macOS Framework path (wrong on Linux/WSL).
10. **Retrieval (RAG-lite + RAGFlow Sidecar + Serper)** — Clean optional toggles; coupling LOW.
11. **Lightbox / Image Zoom** — `app.js` L7329-7364. Self-contained, ★ smallest clean seam.
12. **MathJax Preprocessing** — `index.html` inline scripts L3083-3129. Self-contained.
13. **Deployment / Release Pipeline** — Vercel auto-deploys on push to main (~1 min); 6+ version strings must move in lockstep.

## Dead Code

- **CSS estimate**: ~17,000 lines (~35%) dominated by later overrides. Highest-density area: Home Ask EOF cluster L33181-45296 (12+ named "TRUE EOF HOME ASK" passes with name-evolution keyframe chain).
- **JS estimate**: ~28 unreferenced top-level functions (~19 in `app.js`, ~9 in `ws-bridge.js`).
- **Notable dead JS**:
  - `ws-bridge.js` `_legacyGenerateSectionLesson` L5629 (explicitly "kept for reference, not used")
  - `app.js` `createIntroCosmos` L117 (stub returning `{destroy(){}}`)
  - `app.js` `renderHyperknowLinks` L127 (47-line orphan web-source renderer)
  - `app.js` `openLearnFocusMode` / `toggleLearnChatPanel` / `shrinkLearnQaToPopover` / `toggleLearnExplainPanel` (half-finished QA-panel state refactor)
  - `app.js` `startStepAnimation` L17781 (defined but never called; partner `stopStepAnimation` IS called twice)
  - `app.js` `buildTocFromSyllabus` L17255 (orphan; `buildTocFromContent` is live)
  - `app.js` `fallbackLocalUid` L2679 (replaced by `getUid()` L2731)
- **Notable dead CSS**: Trial intro glass skin L47431-47566 (comment says "easy to remove"); Edge tabs v3+v5 blocks L941-1248 (superseded by v6 final-final L1017)
- **Notable dead deps**: `pptxgenjs`, `ws` npm deps declared but no `require/import` found
- **Notable dead docs**: `docs/legacy/CODEX_PROJECT_GUIDE.md` references pre-rename paths and obsolete Opus-vs-Sonnet decisions; actively contradicts `CLAUDE.md`
- **Notable dead scripts**: `tools/tutor_craft.py` one-shot CSS regex rewriter, no callers

## Extraction Candidates (ranked by risk / payoff)

### Low risk, low/medium payoff (do these first to prove the pattern)

| # | Candidate | Location | Lines | Effort | Payoff |
|---|---|---|---|---|---|
| 1 | **Lightbox module** | `app.js` L7329-7364 | 36 | one-PR | small |
| 2 | **MathJax preprocessor** to `math-preprocess.js` | `index.html` L3083-3129 | 47 | one-PR | small |
| 3 | **v1.2.3 UI Friction Fix Pack** to its own CSS file | `style.css` L47659-47865 | 207 | one-PR | small |
| 4 | **Interactive-demo helpers + family inference** | `app.js` L7825-8092, 7938-8011 | 270 | one-PR | medium |
| 5 | **Syllabus + Section Preview datasets to JSON** | `app.js` L5062-5604 | 600 | one-PR | medium |
| 6 | **Single materialsDir resolver** shared by Node helpers | `ws-bridge.js` L86 + 2 helper scripts | 80 | one-PR | small |
| 7 | **Promote `build-section-page-display-map.js`** to `app/scripts/` + npm wrapper | new wrapper | 266 | one-PR | small |
| 8 | **Remove `pptxgenjs` + `ws` npm deps** | both package.jsons | 4 | one-PR | small |
| 9 | **Delete `_legacyGenerateSectionLesson` + prewarm cluster** | `ws-bridge.js` L5338-5670 | 350 | one-PR | small |
| 10 | **Remove `tools/tutor_craft.py` + `docs/legacy/CODEX_PROJECT_GUIDE.md`** | obvious | 220 | one-PR | small |
| 11 | **Clean `app/users/` + handle 0-byte file** | `app/users/`, `readUserMemory` | 30 | one-PR | small |
| 12 | **Set `TUTOR_PYTHON_BIN` default to empty + clear error** | `process-python.js` ~L6 | 15 | one-PR | small |
| 13 | **Consolidate 5 Google Fonts `<link>` stanzas** | `index.html` head | 5 | one-PR | small |

### Medium risk, medium/large payoff

| # | Candidate | Location | Lines | Effort | Payoff |
|---|---|---|---|---|---|
| 14 | **Intro-landing inline `<style>` + DOM to own files** | `index.html` L73-1796 | 1,722 | few-PRs | LARGE |
| 15 | **`hydrateChapterOneDemo` extraction** | `app.js` L8094-8578 | 480 | few-PRs | medium |
| 16 | **`render*Fallback` family to dispatched renderer** | `app.js` L10487-11743 | 1,300 | few-PRs | medium |
| 17 | **Decorate lecture content + visual metadata UI** | `app.js` L7399-7823 | 425 | one-PR | medium |
| 18 | **Pager override stack consolidation** | `style.css` L25561, L28700, L29038-29307, L29523-29566, L47665 | 800 | one-PR | medium |
| 19 | **Reconcile `section-page-map-new.json` vs `section-page-map-display-new.json`** | both JSONs | 50 | one-PR | medium |
| 20 | **Build regen-only mirror script** for root materials/ | new script | 60 | one-PR | medium |

### High risk, large payoff (multi-week)

| # | Candidate | Location | Lines | Effort | Payoff |
|---|---|---|---|---|---|
| 21 | **Consolidate 5 `inject*Styles` helpers + collapse with style.css** | `app.js` L5894-7327 | 1,430 | few-PRs | LARGE |
| 22 | **`hydrateInteractiveDemos` split per family** | `app.js` L8580-9819 | 1,240 | multi-week | LARGE |
| 23 | **Home Ask EOF cluster consolidation** | `style.css` L33181-45296 | 6,000 | multi-week | LARGE |

## Hard Constraints (load-bearing — must not violate)

- Node built-in modules only in `ws-bridge.js` — no Express, no fastify, no `ws` library at runtime (despite npm dep)
- Renderer model = `anthropic/claude-sonnet-4.6` (Agent B) — cost/quality decision, do NOT silently upgrade to Opus
- Planner model = `openai/gpt-5.5` (Agent A); auxiliary = `claude-haiku-4.5`; diagrams = `gpt-5.4-image-2`
- `aquarius_visual_latex_v2` cache filename suffix is LOAD-BEARING — renaming invalidates every cached lesson
- `AQUARIUS_CONFIG` global name is LOAD-BEARING — renaming breaks every deployed frontend config
- JSON maps MUST stay at `app/` root: `section-page-map*.json`, `section-figure-map-new.json`, `section-page-anchor*.json`
- No filenames may contain `: | ? * < > "` (Windows-WSL dual access)
- DO NOT delete Chapter 2 figure recrops (29 `figure_2_*.png` + 74 `page-150..223.meta.json` files; mirrored in both trees)
- Render backend port = 9000; Vercel serves `app/` statically; push to main auto-deploys in ~1 min
- `vercel.json` MUST NOT contain `"public": true` — legacy v2 field that causes silent deploy failures
- Materials resolution prefers `workspace/materials/` over root `materials/` when validated subdirs present
- Lesson cache miss returns fixed "not prepared yet" — NO live generation fallback
- `OPENROUTER_API_KEY` required; `TUTOR_PYTHON_BIN` must be set explicitly on Linux/WSL/Windows/Render
- `/api/tutor` is the LEGACY endpoint — do not delete without owner approval
- RAGFlow is retrieval-only; prompt assembly stays in `ws-bridge.js`
- Clerk auth is client-only — backend has no Clerk verification
- Gated Timebox protocol: Sev-1 immediate / Sev-2 batch / Sev-3 backlog

## Integration Contracts (frozen boundaries)

- `aquarius_visual_latex_v2` lesson-cache filename suffix
- `AQUARIUS_CONFIG` global (frontend)
- Root-relative JSON maps (5 files)
- Render port 9000 + URL `aquarius-5ss0.onrender.com`
- Vercel static deploy of `app/`
- Dual-agent rendering pipeline (Agent A → Blueprint JSON → Agent B)
- RAGFlow retrieval sidecar contract
- OpenRouter chat completions
- Clerk client-only auth contract
- Python `matplotlib_gen.py` subprocess
- MathJax preprocessor globals (`window.preprocessMath`, `window.typesetMath`)
- `/api/*` HTTP endpoint roster
- Materials fallback chain (`resolveExistingDir(workspace/materials, materials)`)
- `SECTION_PAGE_MAP_VERSION` cache-bust

## Cross-Cutting Risks

1. **5 of 15 reports came back null** — significant blind spots in lower app.js (L1-5000, L10000-15000, L15000-end), ws-bridge.js routing chain, full CSS dead-rule analysis. Closing these gaps via resume is in progress.
2. **style.css source ORDER is load-bearing** — splitting blocks into separate files changes their cascade position unless `<link>` order mirrors original file order exactly.
3. **app.js module-load side effects** mean the file cannot be loaded headless, cannot be tested in isolation; any HTML ID rename silently turns module-level constants into null.
4. **Cache-bust strings live in 5+ places** (style.css?v=1218, app.js?v=1218, config.js?v=1778524701, logo.png?v=1778674347, SECTION_PAGE_MAP_VERSION=1778673277, v1.2.4 in 2 index.html spots, 2 package.json files). Easy to forget one.
5. **Vercel auto-deploys on push to main with no preview gate.** Combined with the v=1218 cache-bust and `vercel.json` "public" landmine, a broken commit ships to production in ~1 minute.
6. **Three independent materials-dir resolvers** can disagree about which tree is live.
7. **Two near-identical section-page maps** with undocumented divergence (md5 differs; chapter-2 block extra in display-new).
8. **ResizeObservers attached as expandos** on demo nodes have no explicit teardown path — re-hydration may leak observers.
9. **No lint, no test framework, no visual regression** — only `npm run check` and one Playwright lesson-open-no-hang test.
10. **Two `package.json` files** share name and version but differ in scripts/devDeps; easy to drift.
11. **Pre-rename references linger** in `.dockerignore`, `docs/legacy/`, parts of `workspace/memory/MEMORY.md` — a new agent could follow stale instructions.

## Contradictions Detected

- **`docs/sync-policy.md` is STALE.** Says root `materials/` is runtime; bridge fallback prefers `workspace/materials/`. CLAUDE.md confirms workspace-preferred. **The doc needs to be rewritten OR root tree needs to be backfilled (131 missing lesson-cache dirs).**
- `docs/legacy/CODEX_PROJECT_GUIDE.md` contradicts CLAUDE.md (Opus vs Sonnet, pre-rename paths)
- Older sections of `workspace/memory/MEMORY.md` still mention Opus as lesson model — CLAUDE.md is authoritative
- CLAUDE.md mentions "three `package.json` versions" but only 2 were found (root + workspace/)
- Health flag conflict on root `materials/`: jsonData and CLAUDE.md describe it as runtime; materialsTree found it stale (42/173 lesson-cache sections)

## Open Questions (synth-flagged — need owner input)

1. **Materials-tree authority**: backfill root `materials/` to match `workspace/materials/` (131 missing dirs), or rewrite `docs/sync-policy.md` to declare `workspace/` as runtime?
2. Where is the "third" `package.json` CLAUDE.md mentions in release bumps?
3. Are the >10000 app.js render*Fallback functions and >15000 recent-conversations/mistake-notebook/homework code as clean as the 5000-10000 chunk? (BLIND SPOT — answered by retry)
4. Is divergence between `section-page-map-new.json` and `-display-new.json` intentional or regen drift?
5. Is legacy `/api/tutor` still hit by anyone?
6. Is RAGFlow currently wired up and serving traffic?
7. Is the in-page bottom-right pagination pill experiment fully reverted (per recent revert commits)?
8. Are `app/users/` guest profiles intended to be tracked in git or runtime-only?
9. Is the `pptxgenjs` and `ws` npm dep removal safe (no future plans)?
10. Should `docs/legacy/CODEX_PROJECT_GUIDE.md` be deleted or kept as historical record?
11. Are the duplicated `render*Fallback` functions identical-shape or behaviorally different?
12. Desired teardown contract for demo ResizeObserver expandos?
13. Does the formula-catalog/ pilot (only 1.1-1 and 1.1-2) have ongoing plans?

## Synthesis's Suggested Next Step (verbatim)

> Decide the materials tree authority: either (a) backfill root `materials/` to match `workspace/materials/`
> for the 131 missing lesson-cache directories so `docs/sync-policy.md` stays accurate and Render deploys
> that ship only root `materials/` behave correctly, OR (b) rewrite `docs/sync-policy.md` to declare
> `workspace/materials/` as the runtime tree and confirm the Render Docker build copies `workspace/`. This
> decision unblocks every subsequent refactor (because every per-section change must touch the "live"
> tree), forces a docs reality-check, and is the only one the codebase can't answer without owner input —
> every other extraction candidate can proceed in either world. Then close the report gap: re-run the
> per-area inventory for the 5 NULL reports before committing to any seam past Sonnet/Haiku boundaries.

---

## Appendix A — Source data

- Workflow run ID: `wf_e3ed2630-c06`
- Workflow script: `/home/flymiss/.claude/projects/-mnt-d-Github-fourier-tutor-agent/fbaa6726-52f1-4c76-81b7-d053082c62df/workflows/scripts/codebase-map-discovery-wf_e3ed2630-c06.js`
- Full synthesis output (truncated at 25k tokens): `/tmp/claude-1000/-mnt-d-Github-fourier-tutor-agent/fbaa6726-52f1-4c76-81b7-d053082c62df/tasks/wbsmfc3n8.output`
- Resume task ID: `wylsvupzp` (in progress at write time)

## Appendix B — Agent success/failure log

| Agent | Status | Notes |
|---|---|---|
| `app.js:1-5000` | FAILED | Socket close after stalling 442s + 1 schema retry |
| `app.js:5000-10000` | OK | Produced detailed inventory; biggest grounded chunk |
| `app.js:10000-15000` | FAILED | Socket close |
| `app.js:15000-end` | FAILED | Socket close |
| `ws-bridge.js` | FAILED | Socket close |
| `style.css` | OK | Bash-based characterization |
| `index.html` | OK | Detailed structural map |
| `tools+scripts` | OK | |
| `json-data` | OK | |
| `materials-tree` | OK | |
| `docs+meta` | OK | |
| `dead-css-detector` | FAILED | Socket close |
| `dead-js-detector` | OK | 28 orphans identified |
| `external-deps` | OK | Full env var + integration surface map |
| `extraction-seams` | FAILED | Socket close |
| `synthesis` | OK | Ran with 9 of 15 reports; flagged blind spots |
