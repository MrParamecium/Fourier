/*
 * Lesson cache reader/writer (extracted from ws-bridge.js in Phase 1 #7).
 *
 * Hard Invariant: this module owns the LESSON_CACHE_VERSION string
 * `aquarius_visual_latex_v2`. Renaming this string invalidates every
 * cached lesson file on disk (~hundreds of files, days of LLM cost to
 * regenerate). See CLAUDE.md "Hard Constraints".
 *
 * On-disk layout under TUTOR_MATERIALS_DIR/lesson-cache/:
 *   <normalized-section-id>/<key>.aquarius_visual_latex_v2.en.md
 *   where key = `<bookSource>[__<cacheVariant>]__aquarius_visual_latex_v2`
 *   and normalized-section-id = lowercase, dots replaced with underscores
 *   (e.g. 'B.1-2 Complex Numbers' -> 'b_1-2')
 *
 * Cache-miss returns null (caller surfaces LESSON_CACHE_MISS_MESSAGE);
 * the bridge does NOT generate live on miss — owner regenerates via
 * pregen scripts.
 *
 * Legacy fallback: when the active key isn't on disk, scoreLegacyLessonCacheFile
 * picks the best stale-but-survivable file (Phase 0 retire is partial —
 * some legacy keys still serve real users). The legacy reader strips
 * outdated gptimage2 image blocks and re-validates format before returning.
 *
 * Factory pattern follows Phase 1 #4-#6. Bridge injects the materials dir
 * and the lesson-format helpers (those stay in ws-bridge.js because they
 * are used outside the cache path too, notably during live generation).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const LESSON_CACHE_VERSION = 'aquarius_visual_latex_v2';
const LESSON_CACHE_MISS_MESSAGE = 'This section has not been prepared yet.';

/**
 * @param {{
 *   tutorMaterialsDir: string,
 *   normalizeQuizProfile: (quiz?: object) => object,
 *   prepareLessonForCache: (sectionId: string, lesson: string) => string,
 *   collectLessonFormatIssues: (markdown: string) => string[],
 *   assertLessonFormatClean: (sectionId: string, lesson: string, phase?: string) => void,
 * }} deps
 */
module.exports = function createLessonCache(deps) {
    const tutorMaterialsDir = deps && deps.tutorMaterialsDir;
    const normalizeQuizProfile = deps && deps.normalizeQuizProfile;
    const prepareLessonForCache = deps && deps.prepareLessonForCache;
    const collectLessonFormatIssues = deps && deps.collectLessonFormatIssues;
    const assertLessonFormatClean = deps && deps.assertLessonFormatClean;
    if (typeof tutorMaterialsDir !== 'string' || !tutorMaterialsDir
        || typeof normalizeQuizProfile !== 'function'
        || typeof prepareLessonForCache !== 'function'
        || typeof collectLessonFormatIssues !== 'function'
        || typeof assertLessonFormatClean !== 'function') {
        throw new Error('lesson-cache: missing required deps {tutorMaterialsDir, normalizeQuizProfile, prepareLessonForCache, collectLessonFormatIssues, assertLessonFormatClean}');
    }

    const LESSON_CACHE_DIR = path.join(tutorMaterialsDir, 'lesson-cache');
    try { if (!fs.existsSync(LESSON_CACHE_DIR)) fs.mkdirSync(LESSON_CACHE_DIR, { recursive: true }); } catch (_) {}

    /**
     * Normalize sectionId to a consistent cache directory name.
     * 'B.1-2 Algebra of Complex Numbers' → 'b_1-2'
     * 'b.1-2' → 'b_1-2'
     * '1.2-3 Time Reversal' → '1_2-3'
     */
    function normalizeSectionId(raw) {
        const m = String(raw || '').match(/^([A-Za-z]?[0-9]*(?:[.\-][0-9]+)*)/);
        const code = m ? m[1] : raw;
        return code.toLowerCase().replace(/\./g, '_');
    }

    function buildLessonCacheKey(_memory, bookSource = 'new', cacheVariant = 'lesson') {
        const sourceKey = bookSource === 'new' ? 'new' : 'old';
        const variantKey = cacheVariant && cacheVariant !== 'lesson' ? `__${cacheVariant}` : '';
        return `${sourceKey}${variantKey}__${LESSON_CACHE_VERSION}`;
    }

    function hasLessonCacheFile(sectionId, memory, bookSource = 'new', cacheVariant = 'lesson') {
        const key = buildLessonCacheKey(memory, bookSource, cacheVariant);
        if (!key) return false;
        const normId = normalizeSectionId(sectionId);
        const file = path.join(LESSON_CACHE_DIR, normId, `${key}.${LESSON_CACHE_VERSION}.en.md`);
        return fs.existsSync(file);
    }

    function readLessonCache(sectionId, memory, bookSource = 'new', cacheVariant = 'lesson') {
        const key = buildLessonCacheKey(memory, bookSource, cacheVariant);
        if (!key) return null;
        const normId = normalizeSectionId(sectionId);
        const dir = path.join(LESSON_CACHE_DIR, normId);
        const file = path.join(dir, `${key}.${LESSON_CACHE_VERSION}.en.md`);
        console.log(`[LessonCache] lookup: ${sectionId} → ${normId} / ${key} / ${LESSON_CACHE_VERSION}`);
        if (!fs.existsSync(file)) {
            const fallback = cacheVariant === 'lesson' ? readLegacyLessonCacheFallback(sectionId, memory, bookSource) : null;
            if (fallback) {
                console.warn(`[LessonCache] MISS → LEGACY CONTENT USED: ${normId} / ${key}`);
                const normalizedFallback = prepareLessonForCache(sectionId, fallback);
                const fallbackIssues = collectLessonFormatIssues(normalizedFallback);
                if (fallbackIssues.length) {
                    console.warn(`[LessonCache] LEGACY FALLBACK rejected: ${normId} / ${key}: ${fallbackIssues.join(', ')}`);
                    return null;
                }
                return normalizedFallback;
            }
            return null;
        }
        try {
            const content = fs.readFileSync(file, 'utf8');
            console.log(`[LessonCache] HIT: ${normId} / ${key}`);
            const normalized = prepareLessonForCache(sectionId, content);
            const issues = collectLessonFormatIssues(normalized);
            if (issues.length) {
                console.warn(`[LessonCache] HIT but invalid format: ${normId} / ${key}: ${issues.join(', ')}`);
                return null;
            }
            return normalized;
        } catch (_) { return null; }
    }

    function writeLessonCache(sectionId, memory, lesson, bookSource = 'new', cacheVariant = 'lesson') {
        const key = buildLessonCacheKey(memory, bookSource, cacheVariant);
        if (!key) return;
        const normId = normalizeSectionId(sectionId);
        const dir = path.join(LESSON_CACHE_DIR, normId);
        try {
            fs.mkdirSync(dir, { recursive: true });
            const file = path.join(dir, `${key}.${LESSON_CACHE_VERSION}.en.md`);
            const normalized = prepareLessonForCache(sectionId, lesson);
            assertLessonFormatClean(sectionId, normalized, 'write-cache');
            fs.writeFileSync(file, normalized, 'utf8');
            console.log(`[LessonCache] SAVED: ${normId} / ${key} / ${LESSON_CACHE_VERSION}`);
        } catch (e) {
            console.error('[LessonCache] write error:', e.message);
            throw e;
        }
    }

    function scoreLegacyLessonCacheFile(fileName, memory, bookSource = 'new') {
        // On disk, legacy cache names use '=' for ':' and '~' for '|' (Windows-safe);
        // decode so the substring patterns below match the original key format.
        fileName = String(fileName || '').replace(/=/g, ':').replace(/~/g, '|');
        if (!fileName || !fileName.endsWith('.en.md')) return -Infinity;
        if (fileName.includes(`.${LESSON_CACHE_VERSION}.`)) return -Infinity;

        const q = normalizeQuizProfile((memory && memory.quiz) ? memory.quiz : {});
        const sourceKey = bookSource === 'new' ? 'new' : 'old';
        if (!fileName.startsWith(`${sourceKey}__`)) return -Infinity;

        let score = 0;
        const versionMatch = fileName.match(/\.v(\d+)\.en\.md$/i);
        if (versionMatch) score += Math.min(25, Number(versionMatch[1]) || 0);

        if (q.math && fileName.includes(`|${q.math}|`)) score += 40;
        if (q.math && !fileName.includes(`|${q.math}|`) && fileName.includes('|math:calculus_ok')) score += 4;
        if (q.timeline && fileName.includes(`|${q.timeline}`)) score += 10;

        const track = q.track || 'standard';
        if (fileName.includes(`track:${track}`)) score += 70;
        if (track === 'cram') {
            if (fileName.includes('track:cram')) score += 70;
            if (fileName.includes('__solid_b|')) score += 60;
            if (fileName.includes('o:one_liner')) score += 35;
            if (fileName.includes('o:exam_cheatsheet')) score += 20;
            if (!fileName.includes('s:step_by_step')) score += 5;
        } else if (track === 'top_score') {
            if (fileName.includes('track:top_score')) score += 70;
            if (fileName.includes('__going_for_a|')) score += 60;
            if (fileName.includes('s:step_by_step')) score += 35;
            if (fileName.includes('o:worked_example')) score += 25;
            if (fileName.includes('s:principle_first')) score += 15;
            if (fileName.includes('s:visual')) score += 10;
        } else {
            if (fileName.includes('track:standard')) score += 70;
            if (fileName.includes('__solid_b|')) score += 55;
            if (fileName.includes('o:worked_example')) score += 30;
            if (fileName.includes('s:example_first')) score += 10;
            if (fileName.includes('o:one_liner')) score += 5;
        }

        if (fileName.includes('__going_for_a|') && track !== 'top_score') score -= 10;
        if (fileName.includes('__solid_b|') && track === 'top_score') score -= 5;
        return score;
    }

    function stripLegacyGeneratedImageBlocks(markdown) {
        let src = String(markdown || '');
        if (!src) return src;

        src = src.replace(
            /\n*%%KC_BLOCK%%<div class="kc-visual-meta"[^>]*data-visual-kind="generate_image"[\s\S]*?%%KC_END%%\s*(?:\n\*🎨[^\n]*\*)?\s*\n!\[[^\]]*\]\(\/generated\/gptimage2-[^)]+\)\s*/gi,
            '\n\n'
        );
        src = src.replace(/\/generated\/gptimage2-[^) \n"']+/gi, '');
        src = src.replace(/\n{3,}/g, '\n\n').trim();
        return src;
    }

    function readLegacyLessonCacheFallback(sectionId, memory, bookSource = 'new') {
        // Anonymous requests (memory=null, the /api/section default) still get the
        // best generic legacy lesson: scoreLegacyLessonCacheFile defaults to the
        // standard track via normalizeQuizProfile({}).
        const normId = normalizeSectionId(sectionId);
        const dir = path.join(LESSON_CACHE_DIR, normId);
        if (!fs.existsSync(dir)) return null;

        let best = null;
        for (const fileName of fs.readdirSync(dir)) {
            const score = scoreLegacyLessonCacheFile(fileName, memory, bookSource);
            if (!Number.isFinite(score)) continue;
            if (!best || score > best.score) best = { fileName, score };
        }
        if (!best || best.score < 0) return null;

        try {
            const targetKey = buildLessonCacheKey(memory, bookSource) || 'unknown';
            const content = stripLegacyGeneratedImageBlocks(fs.readFileSync(path.join(dir, best.fileName), 'utf8'));
            const normalized = prepareLessonForCache(sectionId, content);
            const issues = collectLessonFormatIssues(normalized);
            if (issues.length) {
                console.warn(`[LessonCache] LEGACY FALLBACK INVALID: ${normId} / ${best.fileName}: ${issues.join(', ')}`);
                return null;
            }
            console.warn(`[LessonCache] LEGACY FALLBACK: ${normId} / ${best.fileName} -> ${targetKey}`);
            return normalized;
        } catch (e) {
            console.warn(`[LessonCache] LEGACY FALLBACK READ FAILED: ${normId} / ${best.fileName}: ${e.message}`);
            return null;
        }
    }

    return {
        LESSON_CACHE_VERSION,
        LESSON_CACHE_MISS_MESSAGE,
        LESSON_CACHE_DIR,
        normalizeSectionId,
        buildLessonCacheKey,
        hasLessonCacheFile,
        readLessonCache,
        writeLessonCache,
    };
};
