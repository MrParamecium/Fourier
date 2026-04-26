#!/usr/bin/env node
/**
 * Tutor Agent Bridge
 *
 * 保留旧接口 /api/tutor
 * 新增学习问答接口 /api/ask
 * 静态书页图片路由 /pages/:filename
 *
 * 约束：仅使用 Node.js 内置模块
 */

const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const HTTP_PORT = process.env.PORT || 9000;
const APP_NAME = 'Tutor Agent';
const APP_URL = `http://localhost:${HTTP_PORT}`;

const OCR_DIR_OLD = '/Users/chenghaoxiang/.openclaw/workspace/tutor-materials/background-ocr-v3';
const PAGE_IMAGE_DIR_OLD = '/Users/chenghaoxiang/.openclaw/workspace/tutor-materials/background-pages-split';
const OCR_DIR_NEW = '/Users/chenghaoxiang/.openclaw/workspace/tutor-materials/new-book-ocr';
const PAGE_IMAGE_DIR_NEW = '/Users/chenghaoxiang/.openclaw/workspace/tutor-materials/new-book-pages';
const FIGURE_IMAGE_DIR_NEW = '/Users/chenghaoxiang/.openclaw/workspace/tutor-materials/new-book-figures';
const PYTHON_BIN = process.env.TUTOR_PYTHON_BIN || '/Library/Frameworks/Python.framework/Versions/3.12/bin/python3';

// Helper: resolve dirs based on bookSource param
function getBookDirs(bookSource) {
    if (bookSource === 'new') {
        return { ocrDir: OCR_DIR_NEW, pageImageDir: PAGE_IMAGE_DIR_NEW };
    }
    return { ocrDir: OCR_DIR_OLD, pageImageDir: PAGE_IMAGE_DIR_OLD };
}

// Default (backward compat)
const OCR_DIR = OCR_DIR_OLD;
const PAGE_IMAGE_DIR = PAGE_IMAGE_DIR_OLD;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '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';

function resolveHomePath(p) {
    if (!p || typeof p !== 'string') return p;
    if (p === '~') return os.homedir();
    if (p.startsWith('~/')) return path.join(os.homedir(), p.slice(2));
    return p;
}

const SKILL_SCRIPT = resolveHomePath(
    process.env.TUTOR_SKILL_SCRIPT || '~/.agents/skills/image-animation-generation/scripts/gen_image.py'
);
const MATPLOTLIB_GEN = path.join(__dirname, 'matplotlib_gen.py');
const GENERATED_DIR = path.join(__dirname, 'generated');
try { if (!fs.existsSync(GENERATED_DIR)) fs.mkdirSync(GENERATED_DIR, { recursive: true }); } catch (_) {}

const { processEmbeddedPython, normalizePythonCode } = require('./process-python.js');

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
    '.txt': 'text/plain; charset=utf-8'
};

function setCORSHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function safeReadJSON(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
        console.warn('[Index] Failed to read JSON:', filePath, err.message);
        return null;
    }
}

function titleCase(value) {
    if (!value) return '';
    return String(value)
        .split(/\s+/)
        .filter(Boolean)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

function compactWhitespace(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
}

function escapeHtmlAttr(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function persistDataImageUrl(dataUrl) {
    const match = String(dataUrl || '').match(/^data:image\/([a-zA-Z0-9.+-]+);base64,([A-Za-z0-9+/=\r\n]+)$/);
    if (!match) return null;

    const rawType = match[1].toLowerCase();
    const base64 = match[2].replace(/\s+/g, '');
    const extMap = {
        'jpeg': 'jpg',
        'jpg': 'jpg',
        'png': 'png',
        'webp': 'webp',
        'gif': 'gif',
        'svg+xml': 'svg'
    };
    const ext = extMap[rawType] || 'png';
    const filename = `gptimage2-${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
    const targetPath = path.join(GENERATED_DIR, filename);
    fs.writeFileSync(targetPath, Buffer.from(base64, 'base64'));
    return `/generated/${filename}`;
}

function extractRenderableImageUrls(output) {
    const text = String(output || '');
    const candidates = [];

    const markdownImageRegex = /!\[[^\]]*\]\((data:image\/[^)]+|https?:\/\/[^)\s]+|\/generated\/[^)\s]+)\)/gi;
    let match;
    while ((match = markdownImageRegex.exec(text)) !== null) {
        candidates.push(match[1]);
    }

    const rawHttpRegex = /https?:\/\/[^\s)"']+/gi;
    while ((match = rawHttpRegex.exec(text)) !== null) {
        candidates.push(match[0]);
    }

    const rawDataUrlRegex = /data:image\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/=\r\n]+/gi;
    while ((match = rawDataUrlRegex.exec(text)) !== null) {
        candidates.push(match[0]);
    }

    const resolved = [];
    for (const src of candidates) {
        let finalSrc = String(src || '').trim();
        if (!finalSrc) continue;
        if (finalSrc.startsWith('data:image/')) {
            try {
                finalSrc = persistDataImageUrl(finalSrc) || '';
            } catch (err) {
                console.warn('[ImageExtract] Failed to persist data URL image:', err.message);
                finalSrc = '';
            }
        }
        if (!finalSrc) continue;
        if (!resolved.includes(finalSrc)) resolved.push(finalSrc);
    }

    return resolved;
}

function stripDiagramFallbackBlocks(markdown) {
    let text = String(markdown || '');
    if (!text) return text;

    text = text.replace(/```[\s\S]*?[┌┐└┘│─►←↓↑][\s\S]*?```/g, '');
    text = text.replace(/(?:^|\n)##*\s*(?:Teaching|Pipeline|Visual) Diagram[\s\S]*?(?=\n##\s|\n---\n|$)/gi, '\n');
    text = text.replace(/(?:^|\n)\|[^\n]*\|\n\|(?:\s*:?-+:?\s*\|)+\n(?:\|[^\n]*\|\n){1,12}/g, '\n');
    text = text.replace(/\n{3,}/g, '\n\n').trim();
    return text;
}

function convertLegacyQuickCheckToKcBlocks(markdown) {
    const src = String(markdown || '');
    const quickCheckRegex = /(?:^|\n)---\s*\n\*\*✏️ Quick Check\*\*\s*\n\s*([\s\S]*?)\n\s*<details><summary>Show answer<\/summary>\s*\n\s*\*\*Answer:\*\*\s*([\s\S]*?)\n\s*(?:\*Hint:\s*([\s\S]*?)\*)?\s*\n\s*<\/details>/g;

    return src.replace(quickCheckRegex, (_match, question, answer, hint) => {
        const q = compactWhitespace(question);
        const a = compactWhitespace(answer);
        const h = compactWhitespace(hint || '');
        const kcHtml = `<div class="kc-container" data-question="${escapeHtmlAttr(q)}" data-answer="${escapeHtmlAttr(a)}" data-hint="${escapeHtmlAttr(h)}" style="display:none;"></div>`;
        return `\n---\n%%KC_BLOCK%%${kcHtml}%%KC_END%%\n`;
    });
}

function hasVisualMetadataMarkup(markdown) {
    const src = String(markdown || '');
    return src.includes('kc-visual-plan') || src.includes('kc-visual-meta');
}

function normalizeFigureId(value) {
    return compactWhitespace(value || '')
        .toLowerCase()
        .replace(/[（）()\[\]{}]/g, ' ')
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();
}

function normalizeMathMarkdown(markdown) {
    let src = String(markdown || '');
    if (!src) return src;

    src = src
        .replace(/\\\\\(/g, '\\(')
        .replace(/\\\\\)/g, '\\)')
        .replace(/\\\\\[/g, '\\[')
        .replace(/\\\\\]/g, '\\]')
        .replace(/\\\s+\(/g, '\\(')
        .replace(/\\\s+\)/g, '\\)')
        .replace(/\\\s+\[/g, '\\[')
        .replace(/\\\s+\]/g, '\\]');

    src = src.replace(/(?<!\$)\$(?!\$)([^\n$]+?)(?<!\$)\$(?!\$)/g, (_m, expr) => {
        const inner = String(expr || '').trim();
        if (!inner) return _m;
        return `\\(${inner}\\)`;
    });

    return src;
}

function loadNewBookFigureIndex() {
    try {
        if (!fs.existsSync(FIGURE_IMAGE_DIR_NEW)) return {};
        const index = {};
        const files = fs.readdirSync(FIGURE_IMAGE_DIR_NEW)
            .filter(name => /^page-\d{3}-.+\.(png|jpg|jpeg|webp)$/i.test(name));
        for (const fileName of files) {
            const m = fileName.match(/^(page-\d{3})-/i);
            if (!m) continue;
            const page = m[1].toLowerCase();
            if (!index[page]) index[page] = [];
            index[page].push(fileName);
        }
        Object.values(index).forEach(arr => arr.sort());
        return index;
    } catch (err) {
        console.warn(`[Index] Failed to load new-book figure index: ${err.message}`);
        return {};
    }
}

function getAllowedNewBookFigures(sectionId = '', bookPages = [], bookSource = 'old') {
    if (bookSource !== 'new') return new Set();

    const code = extractSectionCode(sectionId);
    if (!code) return new Set();

    const mapKey = Object.keys(SECTION_FIGURE_MAP_NEW).find(k => k.toLowerCase() === code.toLowerCase());
    if (!mapKey) return new Set();

    return new Set((SECTION_FIGURE_MAP_NEW[mapKey] || []).map(file => path.basename(String(file || ''))).filter(Boolean));
}

function findAllowedFigureForBlock(figures, block, allowedFigureFiles) {
    const allowed = allowedFigureFiles instanceof Set ? allowedFigureFiles : new Set();
    const list = Array.isArray(figures) ? figures : [];
    if (!list.length) return null;

    const requestedFigId = normalizeFigureId(block && block.fig_id);
    if (requestedFigId) {
        const matchedById = list.find(fig => {
            const crop = path.basename(String((fig && fig.crop_file) || ''));
            if (!crop || !allowed.has(crop)) return false;
            const normalized = normalizeFigureId(fig && fig.fig_id);
            return normalized === requestedFigId || normalized.includes(requestedFigId) || requestedFigId.includes(normalized);
        });
        if (matchedById) return matchedById;
    }

    const explicitFile = path.basename(String((block && block.file_path) || ''));
    if (explicitFile && allowed.has(explicitFile)) {
        const matchedByFile = list.find(fig => path.basename(String((fig && fig.crop_file) || '')) === explicitFile);
        if (matchedByFile) return matchedByFile;
    }

    return list.find(fig => {
        const crop = path.basename(String((fig && fig.crop_file) || ''));
        return crop && allowed.has(crop);
    }) || null;
}

function hasDisallowedNewBookPageFallback(markdown, sectionId = '', bookPages = [], bookSource = 'old') {
    if (bookSource !== 'new') return false;
    const src = String(markdown || '');
    return /\]\(\/pages\/page-\d+\.png\)/.test(src);
}

function hasDisallowedNewBookFigureRefs(markdown, sectionId = '', bookPages = [], bookSource = 'old') {
    if (bookSource !== 'new') return false;
    const src = String(markdown || '');
    const allowed = getAllowedNewBookFigures(sectionId, bookPages, bookSource);
    const refs = [...src.matchAll(/\]\(\/figures\/([^\)]+)\)/g)].map(m => decodeURIComponent(m[1] || ''));
    return refs.some(file => !allowed.has(path.basename(file)));
}

function hasNewBookFigureUnavailablePlaceholder(markdown, bookSource = 'old') {
    if (bookSource !== 'new') return false;
    return /\*\(Figure unavailable:/i.test(String(markdown || ''));
}

function hasIllustrationUnavailablePlaceholder(markdown) {
    return /Illustration unavailable:/i.test(String(markdown || ''));
}

function extractEmbeddedVisualPlan(markdown) {
    const src = String(markdown || '');
    const match = src.match(/data-visual-plan-b64="([^"]+)"/i);
    if (!match) return null;
    try {
        return JSON.parse(Buffer.from(match[1], 'base64').toString('utf8'));
    } catch (_) {
        return null;
    }
}

function hasLegacyGeneratedVisualArtifacts(markdown) {
    const src = String(markdown || '');
    if (/\/generated\/(?:fig|chart)-[^)\s"']+/i.test(src)) return true;
    if (/python_matplotlib/i.test(src)) return true;

    const visualPlan = extractEmbeddedVisualPlan(src);
    if (!visualPlan) return false;

    const primaryAnchor = compactWhitespace(visualPlan.primary_anchor || '').toLowerCase();
    if (primaryAnchor === 'matplotlib') return true;

    try {
        const serialized = JSON.stringify(visualPlan).toLowerCase();
        return serialized.includes('matplotlib');
    } catch (_) {
        return false;
    }
}

function inferPageTitle(meta, page) {
    const subsection = compactWhitespace(meta.subsection || '');
    const firstKeyword = Array.isArray(meta.keywords) && meta.keywords.length
        ? titleCase(meta.keywords[0])
        : '';

    if (subsection && firstKeyword) return `${subsection} ${firstKeyword}`;
    if (subsection) return subsection;
    if (firstKeyword) return firstKeyword;
    return page;
}

function loadBookIndex() {
    const files = fs.readdirSync(OCR_DIR)
        .filter(name => /^book-\d{3}\.meta\.json$/i.test(name))
        .sort();

    const entries = [];

    for (const file of files) {
        const metaPath = path.join(OCR_DIR, file);
        const meta = safeReadJSON(metaPath);
        if (!meta) continue;

        const page = meta.book_page || file.replace(/\.meta\.json$/i, '');
        const keywords = Array.isArray(meta.keywords) ? meta.keywords.filter(Boolean) : [];
        const summary = compactWhitespace(meta.summary || '');
        const subsection = compactWhitespace(meta.subsection || '');
        const searchBlob = [page, subsection, summary, keywords.join(' ')].join(' ').toLowerCase();

        entries.push({
            page,
            pageImage: `${page}.png`,
            metaPath,
            textPath: path.join(OCR_DIR, `${page}.txt`),
            subsection,
            summary,
            keywords,
            keywordsLower: keywords.map(v => String(v).toLowerCase()),
            searchBlob,
            title: inferPageTitle(meta, page)
        });
    }

    return entries;
}

let BOOK_INDEX = loadBookIndex();

// section-page-map.json: 精确的小节->书页映射（由 OCR 文本扫描生成）
function loadSectionPageMap(filename = 'section-page-map.json') {
    const mapPath = path.join(__dirname, filename);
    try {
        return JSON.parse(fs.readFileSync(mapPath, 'utf8'));
    } catch (e) {
        console.warn(`[Index] ${filename} not found, falling back to metadata search`);
        return {};
    }
}
const SECTION_PAGE_MAP = loadSectionPageMap('section-page-map.json');
const SECTION_PAGE_MAP_NEW = loadSectionPageMap('section-page-map-new.json');
const SECTION_FIGURE_MAP_NEW = loadSectionPageMap('section-figure-map-new.json');
const NEW_BOOK_FIGURE_INDEX = loadNewBookFigureIndex();
console.log(`[Index] Section maps loaded: old=${Object.keys(SECTION_PAGE_MAP).length}, new=${Object.keys(SECTION_PAGE_MAP_NEW).length}`);
console.log(`[Index] Section figure map loaded: new=${Object.keys(SECTION_FIGURE_MAP_NEW).length}`);
console.log(`[Index] New-book figure index loaded: pages=${Object.keys(NEW_BOOK_FIGURE_INDEX).length}`);

// ─────────────────────────────────────────────────────────────────────────────
// USER MEMORY
// ─────────────────────────────────────────────────────────────────────────────
const USERS_DIR = path.join(__dirname, 'users');
try { if (!fs.existsSync(USERS_DIR)) fs.mkdirSync(USERS_DIR, { recursive: true }); } catch (_) {}

const LESSON_CACHE_DIR = path.join(__dirname, '../tutor-materials/lesson-cache');
const LESSON_CACHE_VERSION = 'v20'; // bump cache after math-normalization + hidden image-timeout fallback changes
try { if (!fs.existsSync(LESSON_CACHE_DIR)) fs.mkdirSync(LESSON_CACHE_DIR, { recursive: true }); } catch (_) {}

/**
 * Returns cached lesson markdown or null.
 * Cache key = sectionId (dots→underscores) / <book>__<goal>|<math>|<timeline>|s:<style>|o:<outcome>.en.md
 */
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

function normalizePreferenceList(value) {
    const arr = Array.isArray(value) ? value : (value ? [value] : []);
    return [...new Set(arr.map(v => compactWhitespace(String(v || '')).toLowerCase()).filter(Boolean))].sort();
}

function normalizeQuizProfile(quiz = {}) {
    const next = { ...(quiz || {}) };
    const track = compactWhitespace(next.track || '').toLowerCase();
    const legacyGoal = compactWhitespace(next.goal || '').toLowerCase();

    if (!next.track) {
        if (track) next.track = track;
        else if (legacyGoal === 'just_pass') next.track = 'cram';
        else if (legacyGoal === 'going_for_a' || legacyGoal === 'getting_ahead') next.track = 'top_score';
        else if (legacyGoal === 'solid_b') next.track = 'standard';
    }

    if (!next.track) next.track = 'standard';
    if (!next.math) next.math = 'calculus_ok';
    if (!next.timeline) next.timeline = 'few_weeks';
    if (!next.goal) next.goal = next.track;
    next.style = normalizePreferenceList(next.style);
    next.outcome = normalizePreferenceList(next.outcome);
    return next;
}

function buildLessonCacheKey(memory, bookSource = 'old') {
    if (!memory || !memory.quiz) return null;
    const q = normalizeQuizProfile(memory.quiz);
    const sourceKey = bookSource === 'new' ? 'new' : 'old';
    return `${sourceKey}__track:${q.track}|math:${q.math}`;
}

function readLessonCache(sectionId, memory, bookSource = 'old') {
    const key = buildLessonCacheKey(memory, bookSource);
    if (!key) return null;
    const normId = normalizeSectionId(sectionId);
    const dir = path.join(LESSON_CACHE_DIR, normId);
    const file = path.join(dir, `${key}.${LESSON_CACHE_VERSION}.en.md`);
    console.log(`[LessonCache] lookup: ${sectionId} → ${normId} / ${key} / ${LESSON_CACHE_VERSION}`);
    if (!fs.existsSync(file)) return null;
    try {
        const content = fs.readFileSync(file, 'utf8');
        console.log(`[LessonCache] HIT: ${normId} / ${key}`);
        return content;
    } catch (_) { return null; }
}

function writeLessonCache(sectionId, memory, lesson, bookSource = 'old') {
    const key = buildLessonCacheKey(memory, bookSource);
    if (!key) return;
    const normId = normalizeSectionId(sectionId);
    const dir = path.join(LESSON_CACHE_DIR, normId);
    try {
        fs.mkdirSync(dir, { recursive: true });
        const file = path.join(dir, `${key}.${LESSON_CACHE_VERSION}.en.md`);
        fs.writeFileSync(file, lesson, 'utf8');
        console.log(`[LessonCache] SAVED: ${normId} / ${key} / ${LESSON_CACHE_VERSION}`);
    } catch (e) {
        console.error('[LessonCache] write error:', e.message);
    }
}

function scoreLegacyLessonCacheFile(fileName, memory, bookSource = 'old') {
    if (!fileName || !fileName.endsWith('.en.md')) return -Infinity;
    if (fileName.includes(`.${LESSON_CACHE_VERSION}.`)) return -Infinity;

    const q = normalizeQuizProfile((memory && memory.quiz) ? memory.quiz : {});
    const sourceKey = bookSource === 'new' ? 'new' : 'old';
    if (!fileName.startsWith(`${sourceKey}__`)) return -Infinity;

    let score = 0;
    if (q.math && fileName.includes(`|${q.math}|`)) score += 40;
    if (q.timeline && fileName.includes(`|${q.timeline}`)) score += 10;

    const track = q.track || 'standard';
    if (track === 'cram') {
        if (fileName.includes('__solid_b|')) score += 60;
        if (fileName.includes('o:one_liner')) score += 35;
        if (fileName.includes('o:exam_cheatsheet')) score += 20;
        if (!fileName.includes('s:step_by_step')) score += 5;
    } else if (track === 'top_score') {
        if (fileName.includes('__going_for_a|')) score += 60;
        if (fileName.includes('s:step_by_step')) score += 35;
        if (fileName.includes('o:worked_example')) score += 25;
        if (fileName.includes('s:principle_first')) score += 15;
        if (fileName.includes('s:visual')) score += 10;
    } else {
        if (fileName.includes('__solid_b|')) score += 55;
        if (fileName.includes('o:worked_example')) score += 30;
        if (fileName.includes('s:example_first')) score += 10;
        if (fileName.includes('o:one_liner')) score += 5;
    }

    if (fileName.includes('__going_for_a|') && track !== 'top_score') score -= 10;
    if (fileName.includes('__solid_b|') && track === 'top_score') score -= 5;
    return score;
}

function readLegacyLessonCacheFallback(sectionId, memory, bookSource = 'old') {
    if (!memory || !memory.quiz) return null;
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
        const content = fs.readFileSync(path.join(dir, best.fileName), 'utf8');
        console.warn(`[LessonCache] LEGACY FALLBACK: ${normId} / ${best.fileName} -> ${targetKey}`);
        return content;
    } catch (e) {
        console.warn(`[LessonCache] LEGACY FALLBACK READ FAILED: ${normId} / ${best.fileName}: ${e.message}`);
        return null;
    }
}

function getUserMemoryPath(uid) {
    const safe = String(uid || '').replace(/[^a-zA-Z0-9_\-]/g, '_').slice(0, 64);
    if (!safe) return null;
    return path.join(USERS_DIR, `${safe}.json`);
}

function readUserMemory(uid) {
    const p = getUserMemoryPath(uid);
    if (!p) return null;
    try {
        const parsed = JSON.parse(fs.readFileSync(p, 'utf8'));
        if (parsed && parsed.quiz) parsed.quiz = normalizeQuizProfile(parsed.quiz);
        return parsed;
    } catch (_) {
        return null;
    }
}

function writeUserMemory(uid, data) {
    const p = getUserMemoryPath(uid);
    if (!p) return;
    fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
}

function deriveMemoryFromSessions(uid, sessions, existing = {}) {
    const next = {
        uid,
        createdAt: existing.createdAt || new Date().toISOString(),
        quiz: existing.quiz || {},
        knownConcepts: [],
        weakConcepts: [],
        inferredStyle: [],
        sessionSummaries: []
    };

    const knownSet = new Set();
    const weakSet = new Set();
    const styleSet = new Set(Array.isArray(existing.inferredStyle) ? existing.inferredStyle : []);
    const summarySet = new Set();

    (Array.isArray(sessions) ? sessions : []).forEach(session => {
        if (!session || !Array.isArray(session.history)) return;
        const sectionTitle = compactWhitespace(session.sectionTitle || session.sectionId || '');
        const historyText = session.history
            .map(msg => compactWhitespace(msg && msg.content ? msg.content : ''))
            .filter(Boolean)
            .join(' \n ')
            .toLowerCase();

        if (sectionTitle) {
            summarySet.add(`${new Date(session.timestamp || Date.now()).toISOString().slice(0,10)}: Studied section "${sectionTitle}".`);
        }

        if (/step by step|step-by-step/.test(historyText)) styleSet.add('step_by_step');
        if (/example/.test(historyText)) styleSet.add('example_first');
        if (/draw|diagram|visual|plot|graph/.test(historyText)) styleSet.add('visual');
        if (/principle|intuition|why /.test(historyText)) styleSet.add('principle_first');

        if (/magnitude/.test(historyText)) weakSet.add('magnitude calculation');
        if (/polar/.test(historyText)) weakSet.add('polar form conversion');
        if (/real and imaginary|imaginary part|real part/.test(historyText)) weakSet.add('real and imaginary parts');
        if (/complex plane|a\+jb|a \+ jb|a\+bi|a \+ bi/.test(historyText)) knownSet.add('complex number representation');
    });

    next.knownConcepts = [...knownSet].slice(-30);
    next.weakConcepts = [...weakSet].filter(c => !knownSet.has(c)).slice(-20);
    next.inferredStyle = [...styleSet];
    next.sessionSummaries = [...summarySet].slice(-30);
    next.lastUpdated = new Date().toISOString();
    return next;
}

/**
 * Build a concise prompt injection string from user memory.
 * This gets prepended to system prompts for lesson/ask calls.
 */
function buildUserProfilePrompt(memory) {
    if (!memory) return '';
    const lines = [];
    const quiz = normalizeQuizProfile(memory.quiz || {});

    const TRACK_MAP = {
        cram: [
            'TRACK = CRAM.',
            'This lesson must feel like a fast exam sprint, not a full lecture.',
            'Open with: what gets tested, what to memorize, and what pattern to recognize.',
            'Cut historical/background explanation unless it directly improves score on likely exam questions.',
            'Prefer shortest-solution patterns, parameter-reading tricks, and common traps.',
            'Keep derivations minimal; if a derivation is not needed for solving standard problems, compress it hard.'
        ].join(' '),
        standard: [
            'TRACK = STANDARD.',
            'This lesson should be the default balanced teaching version.',
            'Structure each major idea as: concept -> one representative example -> quick check / exam note.',
            'Explain enough to understand, but do not over-teach edge cases.',
            'Keep the pace moderate and the structure clean.'
        ].join(' '),
        top_score: [
            'TRACK = TOP SCORE.',
            'This lesson should aim for strong exam performance and clearer high-score differentiation.',
            'Highlight tricky variants, easy-to-miss distinctions, and what separates a safe answer from a high-scoring one.',
            'Keep the explanation efficient, but add sharper precision around common traps and better answer framing.',
            'Do not bloat the lesson; make it feel smarter, not just longer.'
        ].join(' ')
    };
    const TRACK_RULES = {
        cram: [
            'STRICT DIFFERENTIATION RULES FOR CRAM:',
            '- The first page must foreground exam payoff and high-frequency question types.',
            '- Prefer fewer knowledge-point pages and tighter summaries.',
            '- Include explicit exam traps / fastest recognition rules.',
            '- Avoid long intuition-building analogies unless they directly help answer exam questions faster.'
        ].join('\n'),
        standard: [
            'STRICT DIFFERENTIATION RULES FOR STANDARD:',
            '- Maintain the normal overview -> concept pages -> recap -> quiz flow.',
            '- Include one representative worked example for the main idea.',
            '- Keep explanation and exam utility balanced.',
            '- This is the baseline version; neither rushed nor overly remedial.'
        ].join('\n'),
        top_score: [
            'STRICT DIFFERENTIATION RULES FOR TOP SCORE:',
            '- Surface high-yield distinctions, harder variants, and where strong students separate themselves.',
            '- Explicitly call out easy point-loss traps and how to avoid them.',
            '- Add at least one deeper exam-facing insight beyond the baseline explanation.',
            '- Keep the tone high-precision and exam-smart, not bloated or textbook-like.'
        ].join('\n')
    };
    const MATH_MAP = {
        all_solid: 'Math background: strong. You may use calculus, ODEs, and complex numbers normally.',
        calculus_ok: 'Math background: mixed. Re-explain ODEs or complex-number steps briefly before relying on them.',
        math_weak: 'Math background: weak. Prefer intuition first, lighter algebra, and explicit intermediate steps.'
    };
    const TIMELINE_MAP = {
        this_week: 'Time pressure: very high. Compress aggressively and prioritize exam payoff first.',
        two_weeks: 'Time pressure: moderate. Stay exam-oriented, but still leave room for one layer of explanation.',
        one_month: 'Time pressure: moderate-low. Balance exam readiness with cleaner understanding.',
        early_stage: 'Time pressure: low. Build foundations well before compressing for exam speed.'
    };
    const PREFERENCE_MAP = {
        exam_first: 'Lesson opening preference: begin with the most important tested ideas and exam relevance.',
        example_first: 'Lesson opening preference: start with a concrete example before abstraction when possible.',
        step_by_step: 'Lesson opening preference: break the setup and steps down clearly before moving fast.'
    };
    const PRIORITY_MAP = {
        understand_concepts: 'Current priority: help the student truly understand the core concept before optimizing speed.',
        solve_faster: 'Current priority: improve solving speed and pattern recognition.',
        avoid_careless: 'Current priority: reduce careless mistakes, notation slips, sign errors, and easy point loss.',
        harder_problems: 'Current priority: prepare for harder variants and higher-difficulty exam questions.',
        connect_topics: 'Current priority: connect this topic to nearby ideas so the course feels less fragmented.',
        exam_confidence: 'Current priority: improve exam confidence, answer framing, and readiness under test conditions.'
    };

    if (TRACK_MAP[quiz.track]) lines.push(TRACK_MAP[quiz.track]);
    if (TRACK_RULES[quiz.track]) lines.push(TRACK_RULES[quiz.track]);
    lines.push([
        'VISUAL POLICY = DEFAULT ON.',
        'Visualization is not optional decoration in this product.',
        'If a concept is easier to see than to read, plan a visual block for it.',
        'Prefer a textbook figure first when the book already has a high-value explanatory diagram.',
        'When the textbook figure is missing, too dense, or not enough to make the idea intuitive, add a gptimage2-generated teaching visual.',
        'Prefer openai/gpt-5.4-image-2 for planes, waveforms, signal transforms, comparisons, system sketches, parameter changes, and other STEM diagrams.',
        'Use clean lecture-note style visuals: pure white background, one knowledge point only, one clear reading path, restrained low-saturation color accents, and colored teaching boxes only when they sharpen understanding.',
        'Use visuals to make the lesson feel clearer and more direct, not just prettier.'
    ].join(' '));
    if (MATH_MAP[quiz.math]) lines.push(MATH_MAP[quiz.math]);
    if (TIMELINE_MAP[quiz.timeline]) lines.push(TIMELINE_MAP[quiz.timeline]);

    const prefs = Array.isArray(quiz.preference) ? quiz.preference : (quiz.preference ? [quiz.preference] : []);
    const allPrefs = [...new Set([...prefs, ...(Array.isArray(memory.inferredStyle) ? memory.inferredStyle : [])])];
    allPrefs.forEach(s => { if (PREFERENCE_MAP[s]) lines.push(PREFERENCE_MAP[s]); });

    const priorities = Array.isArray(quiz.priority) ? quiz.priority : (quiz.priority ? [quiz.priority] : []);
    priorities.forEach(p => { if (PRIORITY_MAP[p]) lines.push(PRIORITY_MAP[p]); });

    if (Array.isArray(memory.knownConcepts) && memory.knownConcepts.length) {
        lines.push(`Already mastered: ${memory.knownConcepts.join(', ')}. Do not over-explain these.`);
    }
    if (Array.isArray(memory.weakConcepts) && memory.weakConcepts.length) {
        lines.push(`Weak areas: ${memory.weakConcepts.join(', ')}. Spend extra time on these.`);
    }
    if (Array.isArray(memory.sessionSummaries) && memory.sessionSummaries.length) {
        const recent = memory.sessionSummaries.slice(-3);
        lines.push(`Recent sessions:\n${recent.map(s => `- ${s}`).join('\n')}`);
    }

    if (!lines.length) return '';
    return `\n\n[Student Profile]\n${lines.join('\n\n')}`;
}

/**
 * Fire-and-forget: analyse one Q&A turn and update user memory.
 * Detects: weak/known concepts, inferred style signals.
 */
async function updateUserMemoryFromQA(uid, question, answer, sectionId) {
    const prompt = [
        'You are analysing a student\'s question and the tutor\'s answer to update the student\'s learning profile.',
        '',
        `Section: ${sectionId || 'unknown'}`,
        `Student question: ${question}`,
        `Tutor answer (first 600 chars): ${String(answer).slice(0, 600)}`,
        '',
        'Output ONLY valid JSON (no markdown, no explanation):',
        '{',
        '  "weakConcepts": [],      // concepts the student seems confused about (max 3, short labels)',
        '  "knownConcepts": [],     // concepts student clearly already understands (max 3)',
        '  "inferredStyle": [],     // inferred learning style signals: one or more of ["example_first","visual","step_by_step","principle_first"] — empty if no clear signal',
        '  "note": ""               // one-line observation about this student (optional, empty string if nothing notable)',
        '}',
        '',
        'Rules:',
        '- weakConcepts: add ONLY if the question shows clear confusion (e.g. "I don\'t understand", "why does", asking same thing again)',
        '- knownConcepts: add ONLY if student explicitly says they know it or question shows mastery',
        '- inferredStyle: add ONLY if question wording strongly implies a style (e.g. "can you draw" → visual, "step by step" → step_by_step)',
        '- Keep all arrays empty [] if no strong signal. Never guess.'
    ].join('\n');

    const raw = await callOpenRouterChat({
        model: 'anthropic/claude-haiku-4.5',
        timeoutMs: 15000,
        temperature: 0.1,
        maxTokens: 200,
        messages: [{ role: 'user', content: prompt }]
    });

    let update;
    try {
        const s = raw.indexOf('{'), e = raw.lastIndexOf('}');
        if (s === -1 || e === -1) return;
        update = JSON.parse(raw.slice(s, e + 1));
    } catch (_) { return; }

    const mem = readUserMemory(uid) || { uid };

    // Merge weakConcepts (cap at 20)
    if (Array.isArray(update.weakConcepts) && update.weakConcepts.length) {
        const existing = new Set(mem.weakConcepts || []);
        update.weakConcepts.forEach(c => existing.add(c));
        mem.weakConcepts = [...existing].slice(-20);
    }
    // Merge knownConcepts (cap at 30) — also remove from weak
    if (Array.isArray(update.knownConcepts) && update.knownConcepts.length) {
        const known = new Set(mem.knownConcepts || []);
        update.knownConcepts.forEach(c => {
            known.add(c);
            // graduate from weak to known
            if (Array.isArray(mem.weakConcepts)) {
                mem.weakConcepts = mem.weakConcepts.filter(w => w !== c);
            }
        });
        mem.knownConcepts = [...known].slice(-30);
    }
    // Merge inferredStyle (deduplicated)
    if (Array.isArray(update.inferredStyle) && update.inferredStyle.length) {
        const styleSet = new Set(mem.inferredStyle || []);
        update.inferredStyle.forEach(s => styleSet.add(s));
        mem.inferredStyle = [...styleSet];
    }
    // Append note to sessionSummaries
    if (update.note && update.note.trim()) {
        if (!Array.isArray(mem.sessionSummaries)) mem.sessionSummaries = [];
        mem.sessionSummaries.push(`[${sectionId}] ${update.note.trim()}`);
        mem.sessionSummaries = mem.sessionSummaries.slice(-20);
    }

    mem.lastUpdated = new Date().toISOString();
    writeUserMemory(uid, mem);
    console.log(`[MemoryUpdate] uid=${uid} weak=${JSON.stringify(mem.weakConcepts?.slice(-3))} known=${JSON.stringify(mem.knownConcepts?.slice(-3))}`);
}

function serveStaticFile(res, filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    // No-cache for JS/HTML/CSS to ensure fresh code always loads
    const noCache = ['.js', '.html', '.css'].includes(ext);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Not found');
            return;
        }

        const headers = { 'Content-Type': contentType };
        if (noCache) {
            headers['Cache-Control'] = 'no-store, no-cache, must-revalidate';
            headers['Pragma'] = 'no-cache';
        }
        res.writeHead(200, headers);
        res.end(data);
    });
}

function serveStaticFromDir(res, baseDir, requestedName) {
    const safeName = path.basename(requestedName || '');
    const filePath = path.join(baseDir, safeName);

    if (!filePath.startsWith(baseDir)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Forbidden');
        return;
    }

    serveStaticFile(res, filePath);
}

async function readRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
            if (body.length > 2 * 1024 * 1024) {
                reject(new Error('Request body too large'));
                req.destroy();
            }
        });
        req.on('end', () => resolve(body));
        req.on('error', reject);
    });
}

async function readJsonBody(req) {
    const raw = await readRequestBody(req);
    try {
        return JSON.parse(raw || '{}');
    } catch (err) {
        throw new Error('Invalid JSON body');
    }
}

function normalizeUrl(u) {
    return String(u || '').replace(/#.*$/, '').replace(/\/$/, '');
}

function httpRequestJson(targetUrl, options = {}, body = null, timeoutMs = 30000) {
    return new Promise((resolve, reject) => {
        const parsed = new URL(targetUrl);
        const req = https.request({
            protocol: parsed.protocol,
            hostname: parsed.hostname,
            port: parsed.port || 443,
            path: `${parsed.pathname}${parsed.search}`,
            method: options.method || (body ? 'POST' : 'GET'),
            headers: options.headers || {}
        }, (res) => {
            let raw = '';
            res.setEncoding('utf8');
            res.on('data', chunk => raw += chunk);
            res.on('end', () => {
                const ok = res.statusCode >= 200 && res.statusCode < 300;
                let parsedBody = null;

                try {
                    parsedBody = raw ? JSON.parse(raw) : null;
                } catch (err) {
                    if (!ok) {
                        reject(new Error(`HTTP ${res.statusCode}: ${raw.slice(0, 400)}`));
                        return;
                    }
                    reject(new Error(`Invalid JSON response: ${raw.slice(0, 300)}`));
                    return;
                }

                if (!ok) {
                    const detail = parsedBody && (parsedBody.error?.message || parsedBody.error || parsedBody.message);
                    reject(new Error(`HTTP ${res.statusCode}: ${detail || raw.slice(0, 400)}`));
                    return;
                }

                resolve(parsedBody);
            });
        });

        req.setTimeout(timeoutMs, () => {
            req.destroy(new Error(`Request timeout (${timeoutMs}ms)`));
        });

        req.on('error', reject);

        if (body) req.write(body);
        req.end();
    });
}

function extractTextContent(content) {
    if (typeof content === 'string') return content.trim();
    if (Array.isArray(content)) {
        return content
            .map(part => {
                if (typeof part === 'string') return part;
                if (part && typeof part.text === 'string') return part.text;
                return '';
            })
            .join('')
            .trim();
    }
    return '';
}

async function callOpenRouterChat({ model, messages, timeoutMs, temperature = 0.2, maxTokens = 1200 }) {
    if (!OPENROUTER_API_KEY) {
        throw new Error('Missing OpenRouter API key');
    }

    const payload = JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: maxTokens
    });

    const data = await httpRequestJson(
        OPENROUTER_API_URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload),
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'HTTP-Referer': APP_URL,
                'X-Title': APP_NAME
            }
        },
        payload,
        timeoutMs
    );

    const choice = data && Array.isArray(data.choices) ? data.choices[0] : null;
    const text = extractTextContent(choice && choice.message && choice.message.content);

    if (!text) {
        throw new Error(`Empty model response from ${model}`);
    }

    return text;
}

function tryParseJsonLoose(text) {
    if (!text) return null;

    const candidates = [];
    const trimmed = String(text).trim();
    candidates.push(trimmed);

    const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fenced) candidates.push(fenced[1].trim());

    const strippedOpenFence = trimmed
        .replace(/^```(?:json)?\s*/i, '')
        .replace(/\s*```\s*$/i, '')
        .trim();
    if (strippedOpenFence && strippedOpenFence !== trimmed) candidates.push(strippedOpenFence);

    const firstObj = trimmed.indexOf('{');
    const lastObj = trimmed.lastIndexOf('}');
    if (firstObj !== -1 && lastObj !== -1 && lastObj > firstObj) {
        candidates.push(trimmed.slice(firstObj, lastObj + 1));
    }

    const firstArr = trimmed.indexOf('[');
    const lastArr = trimmed.lastIndexOf(']');
    if (firstArr !== -1 && lastArr !== -1 && lastArr > firstArr) {
        candidates.push(trimmed.slice(firstArr, lastArr + 1));
    }

    for (const candidate of candidates) {
        try {
            return JSON.parse(candidate);
        } catch (err) {
            // continue
        }
    }

    return null;
}

function uniqueStrings(values, maxItems = 8) {
    const seen = new Set();
    const result = [];

    for (const value of values || []) {
        const cleaned = compactWhitespace(value);
        if (!cleaned) continue;
        const key = cleaned.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        result.push(cleaned);
        if (result.length >= maxItems) break;
    }

    return result;
}

function fallbackKeywordExtraction(question) {
    const tokens = [];
    const chinese = String(question).match(/[\u4e00-\u9fff]{2,12}/g) || [];
    const english = String(question).match(/[A-Za-z][A-Za-z0-9\-]{2,}/g) || [];
    tokens.push(question);
    tokens.push(...chinese);
    tokens.push(...english);
    return uniqueStrings(tokens, 8);
}

async function extractKeywords(question) {
    try {
        const text = await callOpenRouterChat({
            model: 'openai/gpt-5.4',
            timeoutMs: 30000,
            temperature: 0,
            maxTokens: 220,
            messages: [
                {
                    role: 'system',
                    content: 'You extract textbook retrieval keywords. Return strict JSON only in the shape {"keywords": ["..."]}. Keep 5-8 concise phrases. Mix Chinese and English only when helpful. No commentary.'
                },
                {
                    role: 'user',
                    content: `Question: ${question}`
                }
            ]
        });

        const parsed = tryParseJsonLoose(text);
        const keywords = uniqueStrings(parsed && parsed.keywords, 8);
        if (keywords.length) return keywords;
    } catch (err) {
        console.warn('[RAG] Keyword extraction fallback:', err.message);
    }

    return fallbackKeywordExtraction(question);
}

/**
 * Context-aware search: uses LLM to understand what user ACTUALLY means
 * given the full conversation context, then returns both:
 *   - resolvedQuery: a single clear search phrase (used by buildSearchPlan)
 *   - searchAngles: 5 diverse queries for different source types
 */
async function generateSearchAngles(question, options = {}) {
    const base = compactWhitespace(question || '');
    const history = Array.isArray(options.history) ? options.history : [];
    const sectionTitle = compactWhitespace(options.sectionTitle || '');
    const lessonContext = compactWhitespace(options.lessonContext || '').slice(0, 2500);
    const userProfilePrompt = compactWhitespace(options.userProfilePrompt || '').slice(0, 1200);

    const historyText = history
        .slice(-8)
        .map(msg => {
            const role = msg.role || msg.sender || 'unknown';
            const text = compactWhitespace(typeof msg.content === 'string' ? msg.content : (msg.text || msg.message || ''));
            return text ? `${role}: ${text.slice(0, 300)}` : '';
        })
        .filter(Boolean)
        .join('\n');

    try {
        const text = await callOpenRouterChat({
            model: 'openai/gpt-5.4',
            timeoutMs: 30000,
            temperature: 0.1,
            maxTokens: 500,
            messages: [
                {
                    role: 'system',
                    content: [
                        'You are a search query generator for an educational tutoring agent about Signal Processing and Linear Systems.',
                        'Given the conversation context, section topic, lesson content, and the user\'s latest message, you must:',
                        '1. FIRST: Figure out what the user actually means. "again" might mean "explain sinusoids in terms of exponentials again". "why" might mean "why does Euler\'s formula work". Resolve ALL ambiguity using the conversation history and lesson context.',
                        '2. Output a JSON object with two fields:',
                        '   - "resolvedQuery": a single clear English phrase (5-15 words) describing what the user is actually asking about, suitable as a web search query. This must NEVER be a single vague word.',
                        '   - "angles": an array of exactly 5 short English search queries, diversified across: intuition/visual, tutorial/lecture, worked example, university notes, reference.',
                        'All queries MUST be specific to the educational topic. Never generate queries that could match songs, movies, pop culture, or anything unrelated to the course.',
                        'Return ONLY a JSON object. No markdown.'
                    ].join(' ')
                },
                {
                    role: 'user',
                    content: [
                        `Course: Signal Processing and Linear Systems`,
                        `Current section: ${sectionTitle || 'unknown'}`,
                        userProfilePrompt ? `Student profile: ${userProfilePrompt}` : '',
                        lessonContext ? `Recent lesson content (excerpt): ${lessonContext}` : '',
                        historyText ? `Recent conversation:\n${historyText}` : '',
                        `\nUser's latest message: "${base}"`
                    ].filter(Boolean).join('\n\n')
                }
            ]
        });

        const parsed = tryParseJsonLoose(text);
        if (parsed && typeof parsed === 'object') {
            const resolved = compactWhitespace(parsed.resolvedQuery || parsed.resolved_query || '');
            const angles = Array.isArray(parsed.angles) ? parsed.angles : (Array.isArray(parsed.queries) ? parsed.queries : []);
            const cleaned = uniqueStrings(angles.map(item => compactWhitespace(String(item || ''))).filter(Boolean), 5);
            if (resolved && cleaned.length) {
                console.log(`[Search] Resolved "${base}" → "${resolved}" with ${cleaned.length} angles`);
                return { resolvedQuery: resolved, angles: cleaned };
            }
            if (cleaned.length) {
                console.log(`[Search] Got ${cleaned.length} angles (no resolved query)`);
                return { resolvedQuery: cleaned[0], angles: cleaned };
            }
        }
    } catch (err) {
        console.warn('[Search] Search-angle LLM fallback:', err.message);
    }

    const fallbackBase = [sectionTitle, base].filter(Boolean).join(' ').trim() || 'signal processing linear systems';
    console.log(`[Search] Using fallback queries based on: "${fallbackBase}"`);
    return {
        resolvedQuery: fallbackBase,
        angles: uniqueStrings([
            `${fallbackBase} intuition`,
            `${fallbackBase} visual explanation`,
            `${fallbackBase} worked example`,
            `${fallbackBase} university notes`,
            `${fallbackBase} reference`
        ], 5)
    };
}

function scoreBookEntry(entry, keywords, question) {
    let score = 0;
    const haystack = entry.searchBlob;

    keywords.forEach((keyword, index) => {
        const kw = String(keyword || '').toLowerCase();
        if (!kw) return;

        if (entry.keywordsLower.some(item => item.includes(kw) || kw.includes(item))) {
            score += 20 - Math.min(index * 2, 10);
        }

        if (haystack.includes(kw)) {
            score += 10 - Math.min(index, 5);
        }

        const parts = kw.split(/\s+/).filter(part => part.length > 2);
        for (const part of parts) {
            if (haystack.includes(part)) score += 2;
        }
    });

    const fallbackParts = fallbackKeywordExtraction(question)
        .map(item => item.toLowerCase())
        .slice(0, 6);

    for (const token of fallbackParts) {
        if (token && haystack.includes(token)) score += 2;
    }

    if (/table of contents/i.test(entry.summary)) score -= 6;

    return score;
}

function selectRelevantBooks(question, keywords, minCount = 3, maxCount = 5, ocrDir = OCR_DIR_OLD) {
    const ranked = BOOK_INDEX
        .map(entry => ({ entry, score: scoreBookEntry(entry, keywords, question) }))
        .sort((a, b) => b.score - a.score);

    const positive = ranked.filter(item => item.score > 0).slice(0, maxCount);
    if (positive.length >= minCount) return positive.map(item => item.entry);

    const fallback = ranked.slice(0, Math.max(minCount, Math.min(maxCount, 4)));
    return fallback.map(item => item.entry);
}

function readOCRText(filePath, maxChars = 5000) {
    try {
        const raw = fs.readFileSync(filePath, 'utf8');
        return raw.slice(0, maxChars);
    } catch (err) {
        return '';
    }
}

function extractDuckDuckGoResults(payload) {
    const results = [];

    function pushResult(item) {
        if (!item) return;
        const urlValue = normalizeUrl(item.FirstURL || item.url || item.URL || '');
        const textValue = compactWhitespace(item.Text || item.snippet || item.AbstractText || '');
        const titleValue = compactWhitespace(item.title || item.Heading || (textValue.includes(' - ') ? textValue.split(' - ')[0] : textValue));
        const snippetValue = compactWhitespace(item.snippet || item.AbstractText || (textValue.includes(' - ') ? textValue.split(' - ').slice(1).join(' - ') : textValue));

        if (!urlValue || !titleValue) return;

        results.push({
            title: titleValue,
            url: urlValue,
            snippet: snippetValue || textValue || titleValue
        });
    }

    function walk(items) {
        if (!Array.isArray(items)) return;
        for (const item of items) {
            if (Array.isArray(item.Topics)) {
                walk(item.Topics);
            } else {
                pushResult(item);
            }
        }
    }

    if (payload.AbstractURL && payload.AbstractText) {
        pushResult({
            title: payload.Heading || payload.AbstractSource || 'DuckDuckGo Result',
            url: payload.AbstractURL,
            snippet: payload.AbstractText
        });
    }

    if (Array.isArray(payload.Results)) walk(payload.Results);
    if (Array.isArray(payload.RelatedTopics)) walk(payload.RelatedTopics);

    return results;
}

async function duckDuckGoSearch(query) {
    try {
        const endpoint = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
        const payload = await httpRequestJson(endpoint, { method: 'GET', headers: { 'Accept': 'application/json' } }, null, 15000);
        return extractDuckDuckGoResults(payload).slice(0, 4);
    } catch (err) {
        console.warn('[Search] DuckDuckGo failed:', query, err.message);
        return [];
    }
}

async function wikipediaSearch(query) {
    try {
        const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=2&format=json&origin=*`;
        const payload = await httpRequestJson(endpoint, { method: 'GET', headers: { 'Accept': 'application/json', 'User-Agent': 'TutorAgent/1.0 (educational-app; contact@example.com)' } }, null, 10000);
        if (!payload || !payload.query || !Array.isArray(payload.query.search)) return [];
        return payload.query.search.map(item => ({
            title: item.title || '',
            url: `https://en.wikipedia.org/wiki/${encodeURIComponent((item.title || '').replace(/ /g, '_'))}`,
            snippet: (item.snippet || '').replace(/<[^>]*>/g, '').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').trim()
        }));
    } catch (err) {
        console.warn('[Search] Wikipedia failed:', query, err.message);
        return [];
    }
}

async function serperSearch(query, num = 8) {
    const apiKey = process.env.SERPER_API_KEY || 'f2b8ffdb2fdb7f4f59e167810c87f8af49bc01b6';
    if (!apiKey) return [];
    try {
        const payload = await httpRequestJson('https://google.serper.dev/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey
            }
        }, JSON.stringify({ q: query, num }), 15000);
        const organic = Array.isArray(payload && payload.organic) ? payload.organic : [];
        return organic.map(item => ({
            title: item.title || '',
            url: item.link || '',
            snippet: compactWhitespace(item.snippet || '')
        })).filter(item => item.url);
    } catch (err) {
        console.warn('[Search] Serper failed:', query, err.message);
        return [];
    }
}

function classifySourceType(url = '', title = '') {
    const text = `${url} ${title}`.toLowerCase();
    if (/youtube\.com|youtu\.be/.test(text)) return 'video';
    if (/3blue1brown|desmos|geogebra|interactive|visual/.test(text)) return 'visual';
    if (/wikipedia\.org|mathworld|wolfram/.test(text)) return 'reference';
    if (/edu\b|mit|stanford|berkeley|cmu|ox\.ac|cam\.ac|lecture|course|notes|pdf/.test(text)) return 'course';
    if (/insight|betterexplained|brilliant|tutorial|guide|explained/.test(text)) return 'insight';
    if (/medium\.com|substack|blog|towardsdatascience/.test(text)) return 'blog';
    if (/stackexchange|reddit|quora/.test(text)) return 'community';
    return 'web';
}

function sourceTypeRank(type = 'web') {
    return {
        video: 1,
        visual: 2,
        course: 3,
        reference: 4,
        insight: 5,
        blog: 6,
        community: 7,
        web: 8
    }[type] || 99;
}

function enrichSources(sources) {
    return sources.map(item => {
        let domain = '';
        try {
            domain = new URL(item.url).hostname.replace(/^www\./, '');
        } catch (err) {
            domain = '';
        }

        return {
            title: compactWhitespace(item.title),
            url: item.url,
            snippet: compactWhitespace(item.snippet),
            domain,
            sourceType: classifySourceType(item.url, item.title)
        };
    });
}

function sortSourcesByType(sources = []) {
    return [...sources].sort((a, b) => {
        const ra = sourceTypeRank(a.sourceType);
        const rb = sourceTypeRank(b.sourceType);
        if (ra !== rb) return ra - rb;
        const aWiki = /wikipedia\.org$/i.test(a.domain || '');
        const bWiki = /wikipedia\.org$/i.test(b.domain || '');
        if (aWiki !== bWiki) return aWiki ? 1 : -1;
        return (a.domain || '').localeCompare(b.domain || '');
    });
}

function buildSearchPlan(question, searchAngles = []) {
    const q = compactWhitespace(question || '');
    return [
        { label: 'video', provider: 'serper', query: `${q} site:youtube.com` },
        { label: 'visual', provider: 'serper', query: `${q} 3blue1brown OR interactive OR visual explanation OR desmos OR geogebra` },
        { label: 'course', provider: 'serper', query: `${q} lecture notes OR university OR site:.edu OR pdf` },
        { label: 'insight', provider: 'serper', query: `${q} intuition OR betterexplained OR brilliant OR tutorial` },
        { label: 'general', provider: 'serper', query: q },
        { label: 'reference', provider: 'wikipedia', query: `${q} wikipedia OR mathworld OR wolfram` },
        ...searchAngles.map(angle => ({ label: 'general', provider: 'serper', query: angle }))
    ];
}

async function collectWebSources(searchAngles, options = {}) {
    const merged = [];
    const seen = new Set();
    const onSource = typeof options.onSource === 'function' ? options.onSource : null;
    const question = options.question || '';

    const addItems = (items, bucket = 'general') => {
        const enriched = sortSourcesByType(enrichSources(items));
        for (const item of enriched) {
            const key = normalizeUrl(item.url).toLowerCase();
            if (!key || seen.has(key)) continue;
            seen.add(key);
            const source = { ...item, bucket };
            merged.push(source);
            if (onSource) onSource(source, sortSourcesByType(merged));
            if (merged.length >= 18) break;
        }
    };

    const plan = buildSearchPlan(question, searchAngles);
    for (const entry of plan) {
        let items = [];
        if (entry.provider === 'wikipedia') {
            items = await wikipediaSearch(entry.query);
        } else if (entry.provider === 'serper') {
            items = await serperSearch(entry.query, entry.label === 'general' ? 10 : 6);
        } else {
            items = await duckDuckGoSearch(entry.query);
        }
        addItems(items, entry.label);
        if (merged.length >= 18) break;
    }

    if (merged.length < 8) {
        for (const angle of uniqueStrings([
            `${question} site:youtube.com`,
            `${question} lecture notes`,
            `${question} intuitive explanation`,
            `${question} 3blue1brown`,
            `${question} site:.edu`,
            `${question} betterexplained`
        ], 6)) {
            const items = await serperSearch(angle, 6);
            addItems(items, 'fallback');
            if (merged.length >= 18) break;
        }
    }

    const diverse = [];
    const domainCount = new Map();
    for (const item of sortSourcesByType(merged)) {
        const d = item.domain || 'unknown';
        const count = domainCount.get(d) || 0;
        if (count >= 2) continue;
        domainCount.set(d, count + 1);
        diverse.push(item);
        if (diverse.length >= 14) break;
    }

    const finalSources = diverse;
    console.log(`[Search] collectWebSources: ${finalSources.length} sources for question: ${question || searchAngles.join(' | ')}`);
    return finalSources;
}

function buildBookContext(bookPages) {
    return bookPages.map((page, index) => {
        return [
            `[书页${index + 1}] ${page.page}`,
            `标题: ${page.title || page.page}`,
            `小节: ${page.subsection || '未标注'}`,
            `摘要: ${page.summary || '无摘要'}`,
            `关键词: ${(page.keywords || []).join(', ') || '无'}`,
            'OCR:',
            page.ocrText || '无 OCR 内容'
        ].join('\n');
    }).join('\n\n----------------\n\n');
}

function buildWebContext(webSources) {
    if (!webSources.length) return '无网页来源。';
    return webSources.map((item, index) => {
        return [
            `[来源${index + 1}] ${item.title}`,
            `URL: ${item.url}`,
            `摘要: ${item.snippet || '无摘要'}`
        ].join('\n');
    }).join('\n\n----------------\n\n');
}

async function generateExplanation(question, bookPages, webSources, options = {}) {
    const history = Array.isArray(options.history) ? options.history : [];
    const sectionTitle = compactWhitespace(options.sectionTitle || '');
    const lessonContext = compactWhitespace(options.lessonContext || '');
    const language = options.language === 'zh' ? 'zh' : 'en';
    const mode = options.mode || 'ask';
    const userProfilePrompt = options.userProfilePrompt || '';
    const attachments = Array.isArray(options.attachments) ? options.attachments : [];
    const answerLength = options.answerLength || 'medium';

    let lengthInstruction = '';
    if (answerLength === 'short') {
        lengthInstruction = language === 'zh'
            ? '10. [CRITICAL] 用户选择了 SHORT。最终答案必须控制在 1-2 句内，优先 1 句；总长度尽量不超过 60 个中文字符。禁止分点、禁止长公式推导、禁止举多个例子、禁止开场白、禁止总结段。只保留最核心的直接回答。'
            : '10. [CRITICAL CONSTRAINT] The user selected SHORT. The final answer MUST be only 1-2 sentences, ideally 1 sentence, and should stay under ~35 words. No bullets, no long derivations, no multiple examples, no intro, no recap. Only the core answer.';
    } else if (answerLength === 'long') {
        lengthInstruction = language === 'zh'
            ? '10. 长度要求：必须极其详细地展开教学，包括直觉类比、初学者容易犯的误区、步骤完整的公式推导。'
            : '10. Length preference: The user selected LONG. You must instruct in an extremely detailed manner, including intuitive analogies, common beginner pitfalls, and comprehensive step-by-step formula derivations.';
    } else {
        lengthInstruction = language === 'zh'
            ? '10. 长度要求：标准精炼讲解，控制在 2 小段内。'
            : '10. Length preference: Standard lecture length, with necessary formulas and clear explanation in at most 2 short paragraphs.';
    }


    const historyText = history.length
        ? history.map((item, idx) => `[${idx + 1}] ${item.role === 'assistant' ? '老师' : '学生'}: ${compactWhitespace(item.content || '')}`).join('\n')
        : '无历史对话。';

    const prompt = [
        sectionTitle ? `当前小节：${sectionTitle}` : '',
        `当前模式：${mode === 'followup' ? '继续追问' : '新问题'}`,
        `学生问题：${question}`,
        '',
        '历史对话：',
        historyText,
        '',
        lessonContext ? `当前讲解内容摘要：\n${lessonContext}` : '当前讲解内容摘要：无',
        '',
        '教材上下文：',
        buildBookContext(bookPages),
        '',
        '联网资料：',
        buildWebContext(webSources),
        '',
        '输出要求：',
        language === 'zh' ? '1. 用中文回答，优先用通俗易懂的方式讲解。' : '1. Answer in clear beginner-friendly English.',
        language === 'zh' ? '2. 用 Markdown 输出。' : '2. Use Markdown formatting.',
        language === 'zh' ? '3. 如果这是继续追问，必须优先承接上文，不要把它当成全新的陌生问题。' : '3. Prioritize context if this is a follow-up question.',
        language === 'zh' ? '4. 引用时只使用 [书页N] / [来源N] 这样的标注，自然嵌入正文中，**千万不要在结尾专门罗列来源列表**。' : '4. Cite sources naturally inline as [PageN] or [SourceN]. **Do not list sources at the end.**',
        language === 'zh' ? '5. 如果需要图示，请在正文自然解释，但不要自己输出 Python 代码块。实际图片会由后置的 gptimage2 绘图模型生成。' : '5. If a diagram would help, explain it naturally in the answer, but do NOT generate Python code blocks yourself. The actual image will be rendered later by gptimage2.',
        language === 'zh' ? '6. 如果出现数学公式，使用 LaTeX，块级公式写成 $$...$$，行内公式写成 $...$。' : '6. Use LaTeX for math. $$...$$ for block, $...$ for inline.',
        language === 'zh' ? '7. 优先结合教材，再补充联网资料。' : '7. Prioritize textbook content, then web sources.',
        language === 'zh' ? '8. 如果联网资料为空，也照常基于书页完成讲解。' : '8. Answer using book context if web sources are empty.',
        lengthInstruction
    ].filter(Boolean).join('\n');

    let userContent;
    const imageAttachments = attachments.filter(a => a.type === 'image' && a.dataUrl);
    const pdfAttachments = attachments.filter(a => a.type === 'pdf' && a.dataUrl);

    let pdfContext = '';
    for (const pdf of pdfAttachments) {
        pdfContext += `\n\n[Attached document: ${pdf.name}]\n(PDF content will be analyzed by the model)\n`;
    }

    if (imageAttachments.length > 0) {
        userContent = [
            { type: 'text', text: prompt + pdfContext || '(Please analyze the attached image(s))' },
            ...imageAttachments.map(img => ({
                type: 'image_url',
                image_url: { url: img.dataUrl }
            }))
        ];
    } else {
        userContent = prompt + pdfContext;
    }

    console.log('[ASK] Pipeline Step 1/3: Generating teaching plan with Gemini...');
    let teachingPlan = '';
    try {
        const planFormat = language === 'zh'
            ? `请你作为课程策划，基于上述用户的提问、教材上下文、历史对话，设计一份分步骤的讲解指导计划。另外，当前用户指定的长短要求是【${answerLength}】，如果要求极简请出 1-2 步重点，如果要求巨细说明请列全面大纲。不要直接写答案，只输出【解答策略】和【逻辑提纲】。`
            : 'As an educational planner, read the user question, textbook context, and history, then create a step-by-step teaching blueprint. This will be passed to another model for the final generation. Do NOT output the final answer to the user. Output ONLY the [Response Strategy] and [Logical Outline].';

        const planPrompt = typeof userContent === 'string'
            ? userContent + `\n\n【Planner Instructions】\n${planFormat}`
            : [{ type: 'text', text: `【Planner Instructions】\n${planFormat}\n\n` }].concat(userContent);

        teachingPlan = await callOpenRouterChat({
            model: 'openai/gpt-5.4',
            timeoutMs: 60000,
            temperature: 0.3,
            maxTokens: 1000,
            messages: [{ role: 'user', content: planPrompt }]
        });
        console.log('[ASK] Plan generated successfully.');
    } catch (err) {
        console.warn('[ASK] Plan generation failed, falling back to direct generation.', err.message);
    }

    let finalPrompt = userContent;
    if (teachingPlan) {
        const planInsert = `\n\n【Tutor Blueprint (Follow this plan strictly)】\n${teachingPlan}\n\n`;
        if (typeof finalPrompt === 'string') finalPrompt += planInsert;
        else finalPrompt[0].text += planInsert;
    }

    console.log('[ASK] Pipeline Step 2/3: Generating final explanation with Haiku (fast follow-up)...');
    let explanation = await callOpenRouterChat({
        model: 'anthropic/claude-haiku-4.5',
        timeoutMs: 120000,
        temperature: 0.35,
        maxTokens: 3200,
        messages: [
            {
                role: 'system',
                content: language === 'zh'
                    ? '你是一位耐心、准确、会讲人话的理工科导师，但**你绝对不要做无痛喂饭的复读机**。请基于给定教材 OCR、网页摘要和已有对话上下文生成结构化讲解。\n【追问处理必须遵循的核心法则】：\n当学生答错测验题、或者对概念理解有偏差（哪怕只有一点点）时，**绝对不要直接给出正确答案或马上把定义贴给他**。你必须：\n1. 指出他结论中哪个环节的逻辑断链了；\n2. 抛出一个基于他当前错误逻辑的**反例或极其刁钻的反问**，逼他自己发现矛盾；\n3. 像苏格拉底一样，一层一层用提问扒光他的盲点，直到他自己说出正确的推演逻辑，你再帮他总结。\n（对于 follow-up 问题，必须延续上下文。绝对不要输出 ```python 代码块...）\n绝对不要输出 ASCII 图、纯文本示意图、字符画坐标轴，**严禁**自己伪造 `![Generated Visualization](/generated/...)` 这类的图片链接；如果需要图示，只能在正文里用文字说明，后置的 gptimage2 绘图模型会自动接管画图。' + userProfilePrompt
                    : 'You are a STEM tutor with a strict Socratic method. Generate structured explanations based on the given textbook OCR, web summaries, and conversation history.\n**Crucial rule for follow-ups/wrong answers:**\nIf the student is wrong or misunderstands a concept, DO NOT give away the answer immediately or copy-paste definitions. Instead:\n1. Identify the exact flaw in their logic.\n2. Present a "gotcha" counter-example or probing question based on their own flawed reasoning to expose the contradiction.\n3. Make them realize their own mistake and guide them to the correct conclusion via questions step-by-step.\nNever output ```python code blocks, ASCII diagrams, plain-text sketches, or character-drawn axes, and **NEVER** hallucinate or output markdown image links like `![Generated Visualization](/generated/...)` yourself; if a figure is needed, mention it in prose only and leave the actual image rendering to the subsequent gptimage2 drawing model.' + userProfilePrompt
            },
            {
                role: 'user',
                content: finalPrompt
            }
        ]
    });

    // Remove any hallucinated static image tags if the first agent incorrectly fabricated them
    explanation = explanation.replace(/!\[[^\]]*\]\(\/generated\/[^)]+\)/g, '');
    explanation = stripDiagramFallbackBlocks(explanation);

    const explicitDiagramRequest = /配图讲解|配图|画图讲解|请画图|给我画图|给我一张图|画个图|出图|示意图|帮我画|配一张图|附图|图解|带图讲解|用图讲解|illustrate|illustration|with diagram|with a diagram|with figure|with a figure|show me a diagram|show me a figure|give me a diagram|give me a figure|add a diagram|add a figure|include a diagram|include a figure|draw (?:me )?(?:a )?diagram|draw (?:me )?(?:a )?figure|visual aid|visual explanation/i.test(question);
    if (!explicitDiagramRequest) return explanation;

    console.log('[ASK] Pipeline Step 3/3: Generating gptimage2 visual brief...');
    try {
        const imagePromptRequest = [
            language === 'zh'
                ? '你是一位只负责教学图设计的学术可视化导演。不要写正文讲解，只输出一段可以直接交给 gptimage2 的英文图片 prompt。'
                : 'You are an academic visualization director. Do not write lesson prose. Output only one English image prompt that can be sent directly to gptimage2.',
            language === 'zh'
                ? '硬性要求：纯白干净背景；lecture notes 风格；只讲一个知识点；必须有唯一阅读路径；使用少量低饱和彩色框框和标注；颜色仅限 navy / muted teal / soft gray，warning 可用 muted red；无卡通、无海报感、无花哨装饰、无 dense text blocks、无 full derivation、无 extra examples。'
                : 'Hard requirements: pure white clean background; lecture-notes style; teach exactly one knowledge point; enforce a single clear reading path; use a small amount of low-saturation colored boxes and callouts; colors limited to navy, muted teal, soft gray, with muted red only for warnings; no cartoon feel, no poster feel, no decorative clutter, no dense text blocks, no full derivation, no extra examples.',
            language === 'zh'
                ? '输出必须是英文图片 prompt，不要加引号，不要解释，不要编号。'
                : 'Output must be a plain English image prompt only. No quotes, no explanations, no numbering.',
            '',
            `Question: ${question}`,
            '',
            'Textbook context:',
            buildBookContext(bookPages),
            '',
            'Explanation to support:',
            explanation
        ].join('\n');

        const imagePrompt = await callOpenRouterChat({
            model: 'anthropic/claude-haiku-4.5',
            timeoutMs: 90000,
            temperature: 0.2,
            maxTokens: 700,
            messages: [
                {
                    role: 'system',
                    content: language === 'zh'
                        ? '你专门把教学内容改写成适合 gptimage2 的图片提示词。输出必须短、准、可渲染。'
                        : 'You rewrite teaching intent into concise, renderable prompts for gptimage2. Output must be short, precise, and directly usable.'
                },
                { role: 'user', content: imagePromptRequest }
            ]
        });

        const finalImagePrompt = String(imagePrompt || '').trim();
        if (finalImagePrompt) {
            console.log('[ASK] gptimage2 final image prompt:', finalImagePrompt.slice(0, 400));
            const imgResult = await callTutorSkillRaw(finalImagePrompt);
            const urls = extractRenderableImageUrls(imgResult);
            console.log('[ASK] gptimage2 extracted image count:', urls.length);
            if (urls.length > 0) {
                explanation += `\n\n![Generated Visualization](${urls[0]})\n`;
            } else {
                console.warn('[ASK] gptimage2 returned no renderable image URLs. Raw prefix:', String(imgResult || '').slice(0, 500));
                explanation = stripDiagramFallbackBlocks(explanation);
            }
        }
    } catch (err) {
        console.warn('[ASK] gptimage2 diagram generation failed:', err.message);
        explanation = stripDiagramFallbackBlocks(explanation);
    }

    return explanation;
}


/**
 * 根据小节ID精确查找对应书页
 */
function extractSectionCode(sectionId) {
    // 从 "B.2 Sinusoids" / "1.3-1 Time Shifting" 等格式中提取编号部分
    // 匹配 B.x, B.x-y, x.y, x.y-z 等格式
    const m = String(sectionId || '').match(/^([A-Za-z]?\.?\d+(?:[.-]\d+)*)/);
    return m ? m[1].toLowerCase() : compactWhitespace(sectionId || '').toLowerCase();
}

function getPagesForSection(sectionId, ocrDir = OCR_DIR_OLD) {
    const code = extractSectionCode(sectionId);
    if (!code) return [];

    const isNewBook = ocrDir === OCR_DIR_NEW;
    const activeMap = isNewBook ? SECTION_PAGE_MAP_NEW : SECTION_PAGE_MAP;

    // For new book: build pages from OCR dir directly
    if (isNewBook) {
        const codeUpper = code.toUpperCase().replace(/^([a-z])/, c => c.toUpperCase());
        const mapKey = Object.keys(activeMap).find(
            k => k.toLowerCase() === code.toLowerCase() || k.toLowerCase() === codeUpper.toLowerCase()
        );
        if (mapKey) {
            const pageNames = activeMap[mapKey];
            return pageNames.map(pn => ({
                page: pn,
                pageImage: pn + '.png',
                image: `/pages/${pn}.png`,
                textPath: path.join(OCR_DIR_NEW, `${pn}.txt`),
                subsection: code,
                title: sectionId,
                summary: '',
                keywords: []
            }));
        }
        // parent fallback
        const parentCode = code.replace(/-\d+$/, '');
        if (parentCode !== code) {
            const parentKey = Object.keys(activeMap).find(k => k.toLowerCase() === parentCode.toLowerCase());
            if (parentKey) {
                return activeMap[parentKey].map(pn => ({
                    page: pn,
                    pageImage: pn + '.png',
                    image: `/pages/${pn}.png`,
                    textPath: path.join(OCR_DIR_NEW, `${pn}.txt`),
                    subsection: parentCode,
                    title: sectionId,
                    summary: '',
                    keywords: []
                }));
            }
        }
        return [];
    }

    // Old book: existing logic
    const codeUpper = code.toUpperCase().replace(/^([a-z])/, c => c.toUpperCase());
    const mapKey = Object.keys(SECTION_PAGE_MAP).find(
        k => k.toLowerCase() === code || k.toLowerCase() === codeUpper.toLowerCase()
    );
    if (mapKey) {
        const pageNames = SECTION_PAGE_MAP[mapKey];
        const pages = pageNames.map(pn => BOOK_INDEX.find(e => e.page === pn)).filter(Boolean);
        if (pages.length > 0) return pages;
    }

    const parentCode = code.replace(/-\d+$/, '');
    if (parentCode !== code) {
        const parentKey = Object.keys(SECTION_PAGE_MAP).find(
            k => k.toLowerCase() === parentCode
        );
        if (parentKey) {
            const pageNames = SECTION_PAGE_MAP[parentKey];
            const pages = pageNames.map(pn => BOOK_INDEX.find(e => e.page === pn)).filter(Boolean);
            if (pages.length > 0) return pages;
        }
    }

    const exact = BOOK_INDEX.filter(entry => {
        const sub = extractSectionCode(entry.subsection);
        return sub === code || sub.startsWith(code + '-');
    });
    if (exact.length > 0) return exact;

    const raw = compactWhitespace(sectionId || '').toLowerCase();
    return BOOK_INDEX.filter(entry => entry.searchBlob.includes(raw));
}

/**
 * 生成小节导读（2-3 句话）
 */
async function generateSectionIntro(sectionId, sectionTitle, bookPages, language = 'en') {
    const ocrSnippets = bookPages.slice(0, 3).map((p, i) => {
        const txt = readOCRText(p.textPath, 1200);
        return `[Page ${i+1}]\n${txt}`;
    }).join('\n\n');

    const isZh = language === 'zh';
    const prompt = isZh ? [
        `小节：${sectionTitle || sectionId}`,
        '',
        '以下是教材原文节选：',
        ocrSnippets,
        '',
        '请用 2-3 句话回答以下三点（每点一句，用中文，面向零基础学生）：',
        '1. 这节讲什么？',
        '2. 为什么重要？',
        '3. 学完你能做什么？',
        '',
        '直接输出三句话，不要标题、不要编号、不要多余内容。'
    ].join('\n') : [
        `Section: ${sectionTitle || sectionId}`,
        '',
        'Textbook excerpt:',
        ocrSnippets,
        '',
        'In 2-3 sentences for a beginner student, answer:',
        '1. What does this section cover?',
        '2. Why does it matter?',
        '3. What will you be able to do after learning it?',
        '',
        'Output the sentences directly, no headers, no numbering, no extra content.'
    ].join('\n');

    const systemPrompt = isZh
        ? '你是一位理工科教师，擅长用简单语言介绍知识点。'
        : 'You are an engineering tutor who explains topics clearly and concisely for beginners. Always respond in English.';

    return callOpenRouterChat({
        model: 'anthropic/claude-haiku-4.5',
        timeoutMs: 30000,
        temperature: 0.3,
        maxTokens: 200,
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
        ]
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// DUAL-AGENT PIPELINE
// Agent A (Planner):  openai/gpt-5.4  — produces Rendering Blueprint JSON
// Agent B (Executor): claude-sonnet-4.6        — executes each block into final MD
// ─────────────────────────────────────────────────────────────────────────────

const AGENT_A_MODEL = 'openai/gpt-5.4';
const AGENT_B_MODEL = 'anthropic/claude-sonnet-4.6';

const PREGEN_STYLE_COMBOS = [
    ['example_first'],
    ['principle_first'],
    ['visual'],
    ['step_by_step'],
    ['example_first', 'visual'],
    ['principle_first', 'step_by_step']
];

const PREGEN_OUTCOME_COMBOS = [
    ['one_liner'],
    ['worked_example'],
    ['exam_cheatsheet'],
    ['formula_ref'],
    ['one_liner', 'worked_example'],
    ['exam_cheatsheet', 'formula_ref']
];

/**
 * Agent A — Lesson Architect (Gemini 3.1 Pro Preview)
 * Reads OCR + existing page images, outputs a Rendering Blueprint JSON.
 */
async function agentA_plan(sectionId, sectionTitle, bookPages, webSources, language = 'en', userProfilePrompt = '', bookSource = 'old') {
    const ocrPages = bookPages.map(p => ({
        pageId: p.page,
        text: readOCRText(p.textPath, 3000)
    }));
    const existingPageImages = bookPages.map(p => p.page);
    const allowedNewBookFigures = getAllowedNewBookFigures(sectionId, bookPages, bookSource);
    const availableFigures = {};
    // pageInfo: page -> { page_type, has_math, has_figures, summary_excerpt }
    // Gives Agent A full context even for math-heavy pages with no extracted figure crops.
    const pageInfo = {};
    for (const p of bookPages) {
        const metaPath = path.join((p.textPath ? path.dirname(p.textPath) : OCR_DIR), `${p.page}.meta.json`);
        if (fs.existsSync(metaPath)) {
            const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
            if (meta.figures && meta.figures.length) {
                const filteredFigures = meta.figures.filter(f => {
                    const crop = path.basename(String((f && f.crop_file) || ''));
                    return !crop || bookSource !== 'new' || allowedNewBookFigures.has(crop);
                });
                if (filteredFigures.length) {
                    availableFigures[p.page] = filteredFigures.map(f => ({ fig_id: f.fig_id, caption: f.caption }));
                }
            }
            pageInfo[p.page] = {
                page_type: meta.page_type || 'unknown',
                has_math: !!meta.has_math,
                has_figures: !!(meta.figures && meta.figures.length),
                summary_excerpt: (meta.summary || '').slice(0, 180)
            };
        }
    }

    const systemPrompt = fs.readFileSync(
        path.join(__dirname, '../tutor-materials/prompts/agent-a-planner.md'),
        'utf8'
    );

    const userMsg = [
        `section_id: ${sectionId}`,
        `section_title: ${sectionTitle}`,
        `language: ${language}`,
        userProfilePrompt ? `student_profile: ${userProfilePrompt.trim()}` : '',
        '',
        'existing_page_images:',
        existingPageImages.join(', '),
        '',
        'available_figures:',
        JSON.stringify(availableFigures, null, 2),
        '',
        'page_info (page_type / has_math / has_figures / summary_excerpt):',
        JSON.stringify(pageInfo, null, 2),
        '',
        'web_sources_available:',
        webSources.slice(0, 6).map((w, i) => `[${i+1}] ${w.title} — ${w.url}`).join('\n') || 'none',
        '',
        'ocr_pages:',
        ocrPages.map(p => `=== ${p.pageId} ===\n${p.text}`).join('\n\n')
    ].join('\n');

    console.log(`[Agent A] Planning lesson for ${sectionId} (lang=${language})…`);

    const raw = await callOpenRouterChat({
        model: AGENT_A_MODEL,
        timeoutMs: 90000,
        temperature: 0.2,
        maxTokens: 4000,
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMsg }
        ]
    });

    const blueprint = tryParseJsonLoose(raw);
    if (!blueprint || !Array.isArray(blueprint.blocks)) {
        console.warn('[Agent A] Failed to parse blueprint JSON, falling back to raw text.');
        return { raw, blueprint: null };
    }

    // Post-process: enforce at least one canonical textbook figure when available.
    const hasBookImage = blueprint.blocks.some(b => b && b.type === 'book_image');
    if (!hasBookImage) {
        const candidatePages = Object.keys(availableFigures);
        let injected = false;
        for (const page of candidatePages) {
            const figs = availableFigures[page] || [];
            const canonical = figs.find(f => /complex plane|real axis|imaginary axis|signal|system|block diagram|unit step|impulse|phasor|polar/i.test(`${f.fig_id || ''} ${f.caption || ''}`)) || figs[0];
            if (canonical) {
                blueprint.blocks.splice(Math.min(2, blueprint.blocks.length), 0, {
                    type: 'book_image',
                    source_page: page,
                    fig_id: canonical.fig_id,
                    crop_hint: 'full',
                    caption_instruction: 'Add a one-sentence caption explaining what this textbook figure shows and why it matters for the core concept of this section.'
                });
                console.log(`[Agent A] Injected canonical book_image for ${sectionId}: ${page} / ${canonical.fig_id}`);
                injected = true;
                break;
            }
        }
    }

    if (!blueprint.visual_plan) {
        const hasBookImage = blueprint.blocks.some(b => b && b.type === 'book_image');
        const hasGeneratedImage = blueprint.blocks.some(b => b && b.type === 'generate_image');
        blueprint.visual_plan = {
            primary_anchor: hasBookImage && hasGeneratedImage ? 'both' : (hasBookImage ? 'book_figure' : 'generated_image'),
            rationale: hasBookImage && hasGeneratedImage
                ? 'Use the textbook figure as the factual anchor and a generated gptimage2 visual to clarify the relationship visually.'
                : (hasBookImage
                    ? 'Use the textbook figure as the main visual anchor because the book already contains a strong explanatory diagram.'
                    : 'Use a generated gptimage2 lecture-note visual because the key relationship is easier to understand through a clean custom visual.'),
            cram: 'Use visuals to make the pattern or exam move recognizable fast.',
            standard: 'Use visuals to clarify the core idea and support one representative example.',
            top_score: 'Use visuals to expose subtle distinctions, traps, or higher-precision comparisons.'
        };
    }

    blueprint.blocks = blueprint.blocks.map(block => {
        if (!block || (block.type !== 'book_image' && block.type !== 'generate_image')) return block;
        if (!block.teaching_role) {
            block.teaching_role = block.type === 'book_image' ? 'concept_anchor' : 'comparison_anchor';
        }
        if (!block.mode_specific_visual_use) {
            block.mode_specific_visual_use = {
                cram: 'Use this visual for fast recognition of the key pattern.',
                standard: 'Use this visual to clarify the main concept.',
                top_score: 'Use this visual to surface a subtle distinction, trap, or variant.'
            };
        }
        return block;
    });

    console.log(`[Agent A] Blueprint ready — ${blueprint.blocks.length} blocks. visual_plan=${blueprint.visual_plan?.primary_anchor || 'none'}`);
    return { raw, blueprint };
}

/**
 * Agent B — Tutor Writer (Claude Sonnet 4.6)
 * Takes the Blueprint and executes each block into final Markdown.
 * Returns a Markdown string ready for the frontend.
 */
function isMajorKnowledgePointRenderedBlock(block) {
    if (!block || block.type !== 'text_explanation') return false;
    const content = String(block.content || '');
    return /^\s*##\s+/.test(content);
}

function normalizePairedVisualPlacement(renderedBlocks, visualPlan = null) {
    if (!Array.isArray(renderedBlocks) || renderedBlocks.length < 3) return renderedBlocks;
    if (!visualPlan || visualPlan.primary_anchor !== 'both') return renderedBlocks;

    const blocks = renderedBlocks.slice();
    const sections = [];
    let current = {
        startIndex: 0,
        indices: [],
        visualIndices: [],
        visualKinds: new Set(),
        isOverview: true
    };
    sections.push(current);

    blocks.forEach((block, index) => {
        if (isMajorKnowledgePointRenderedBlock(block)) {
            current = {
                startIndex: index,
                indices: [index],
                visualIndices: [],
                visualKinds: new Set(),
                isOverview: false
            };
            sections.push(current);
            return;
        }

        current.indices.push(index);
        if (block && (block.type === 'book_image' || block.type === 'generate_image')) {
            current.visualIndices.push(index);
            current.visualKinds.add(block.type);
        }
    });

    if (sections.length < 2) return blocks;

    for (let s = 0; s < sections.length - 1; s += 1) {
        const left = sections[s];
        const right = sections[s + 1];
        if (left.visualIndices.length !== 1 || right.visualIndices.length !== 1) continue;

        const leftKind = Array.from(left.visualKinds)[0] || '';
        const rightKind = Array.from(right.visualKinds)[0] || '';
        if (!leftKind || !rightKind || leftKind === rightKind) continue;

        const fromIndex = left.visualIndices[0];
        const headingIndex = right.startIndex;
        const [moved] = blocks.splice(fromIndex, 1);
        let insertAt = headingIndex + 1;
        if (fromIndex < insertAt) insertAt -= 1;
        blocks.splice(insertAt, 0, moved);
        console.log(`[Agent B] Co-located paired visuals by moving ${moved.type} from block ${fromIndex} to ${insertAt}. overviewSource=${left.isOverview}`);
        return blocks;
    }

    return blocks;
}

async function agentB_execute(sectionId, blueprint, bookPages, webSources, language = 'en', bookSource = 'old') {
    const systemPrompt = fs.readFileSync(
        path.join(__dirname, '../tutor-materials/prompts/agent-b-tutor.md'),
        'utf8'
    );

    const existingPageImages = {};
    const allowedNewBookFigures = getAllowedNewBookFigures(sectionId, bookPages, bookSource);
    const availableFigures = {};   // page -> [{fig_id, caption}]
    for (const p of bookPages) {
        existingPageImages[p.page] = `/pages/${p.pageImage}`;
        // Load figure metadata for precision crop
        const metaPath = path.join((p.textPath ? path.dirname(p.textPath) : OCR_DIR), `${p.page}.meta.json`);
        if (fs.existsSync(metaPath)) {
            const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
            if (meta.figures && meta.figures.length) {
                const filteredFigures = meta.figures.filter(f => {
                    const crop = path.basename(String((f && f.crop_file) || ''));
                    return !crop || bookSource !== 'new' || allowedNewBookFigures.has(crop);
                });
                if (filteredFigures.length) {
                    availableFigures[p.page] = filteredFigures.map(f => ({ fig_id: f.fig_id, caption: f.caption }));
                }
            }
        }
    }

    const payload = {
        blueprint,
        existing_page_images: existingPageImages,
        available_figures: availableFigures,
        web_sources: webSources.slice(0, 8).map((w, i) => ({
            index: i + 1,
            title: w.title,
            url: w.url,
            snippet: w.snippet || ''
        })),
        output_contract: {
            format: 'single_json_object',
            no_markdown_fences: true,
            no_prose: true,
            compact_json_preferred: true
        }
    };

    const userMsg = JSON.stringify(payload, null, 2);

    console.log(`[Agent B] Executing ${blueprint.blocks.length} blocks…`);

    let raw = await callOpenRouterChat({
        model: AGENT_B_MODEL,
        timeoutMs: 180000,
        temperature: 0.2,
        maxTokens: 12000,
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMsg }
        ]
    });

    // Try to parse Agent B's JSON output and convert to Markdown
    let rendered = tryParseJsonLoose(raw);
    if (!rendered || !Array.isArray(rendered.rendered_blocks)) {
        console.warn('[Agent B] First pass was not valid JSON. Retrying with strict compact-output instruction.');
        raw = await callOpenRouterChat({
            model: AGENT_B_MODEL,
            timeoutMs: 180000,
            temperature: 0,
            maxTokens: 14000,
            messages: [
                {
                    role: 'system',
                    content: `${systemPrompt}\n\nCRITICAL OUTPUT CONTRACT: Return exactly one complete JSON object. Do not wrap in markdown fences. Do not add commentary. Keep JSON compact.`
                },
                {
                    role: 'user',
                    content: `${userMsg}\n\nYour previous attempt was invalid or truncated. Re-output the full result as one complete JSON object only.`
                }
            ]
        });
        rendered = tryParseJsonLoose(raw);
    }

    if (rendered && Array.isArray(rendered.rendered_blocks)) {
        console.log(`[Agent B] JSON OK — ${rendered.rendered_blocks.length} blocks`);
        if (blueprint.visual_plan && !rendered.visual_plan) rendered.visual_plan = blueprint.visual_plan;
        rendered.rendered_blocks = normalizePairedVisualPlacement(rendered.rendered_blocks, rendered.visual_plan || blueprint.visual_plan || null);
        // Auto-fill missing fig_id for book_image blocks using metadata
        rendered.rendered_blocks.forEach((b, i) => {
            const planned = (blueprint.blocks || [])[i] || null;
            if (planned && !b.teaching_role && planned.teaching_role) b.teaching_role = planned.teaching_role;
            if (planned && !b.mode_specific_visual_use && planned.mode_specific_visual_use) {
                b.mode_specific_visual_use = planned.mode_specific_visual_use;
            }
            if (b.type === 'book_image' && b.source_page && !b.fig_id) {
                const metaPath = fs.existsSync(path.join(OCR_DIR_NEW, `${b.source_page}.meta.json`))
                    ? path.join(OCR_DIR_NEW, `${b.source_page}.meta.json`)
                    : path.join(OCR_DIR_OLD, `${b.source_page}.meta.json`);
                if (fs.existsSync(metaPath)) {
                    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
                    const figs = meta.figures || [];
                    if (figs.length === 1) {
                        b.fig_id = figs[0].fig_id;
                        if (!b.caption) b.caption = figs[0].caption;
                        console.log(`[Agent B] Auto-filled fig_id for block[${i}]: ${figs[0].fig_id}`);
                    }
                }
            }
            if (b.type === 'book_image')
                console.log(`[Agent B] block[${i}] book_image: page=${b.source_page} fig_id=${b.fig_id} file_path=${b.file_path}`);
        });
        return await blueprintToMarkdown(rendered.rendered_blocks, existingPageImages, rendered.visual_plan || blueprint.visual_plan || null, bookPages, sectionId, bookSource);
    }

    // Raw fallback — strip whole-page book image refs
    console.warn('[Agent B] Not JSON, raw fallback. First 400 chars:', raw.slice(0, 400));
    return raw.replace(/!\[Book page\]\(\/pages\/book-\d+\.png\)/g, '');
}

/**
 * Convert Agent B's rendered_blocks JSON → Markdown string for the frontend.
 */
async function blueprintToMarkdown(blocks, pageImages, visualPlan = null, bookPages = [], sectionId = '', bookSource = 'old') {
    const parts = [];
    const allowedSourcePages = new Set((Array.isArray(bookPages) ? bookPages : []).map(p => compactWhitespace((p && p.page) || '')));
    const allowedNewBookFigures = getAllowedNewBookFigures(sectionId, bookPages, bookSource);

    if (visualPlan) {
        const b64 = Buffer.from(JSON.stringify(visualPlan || {})).toString('base64');
        parts.push(`%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="${b64}" style="display:none;"></div>%%KC_END%%`);
    }

    for (const block of blocks) {
        switch (block.type) {
            case 'text_explanation':
            case 'analogy':
                parts.push(block.content || '');
                break;

            case 'math_block':
                parts.push(`$$${block.latex}$$`);
                if (block.explanation) parts.push(`*${block.explanation}*`);
                break;

            case 'book_image': {
                const sourcePage = compactWhitespace(block.source_page || '');
                const figId = block.fig_id || '';
                const cropHint = block.crop_hint || 'full'; // left_half | right_half | full | top_third

                if (sourcePage && allowedSourcePages.size && !allowedSourcePages.has(sourcePage)) {
                    parts.push(`*(Figure unavailable: source page ${sourcePage} is outside this section's allowed pages)*`);
                    break;
                }

                const metaPath = sourcePage
                    ? (fs.existsSync(path.join(OCR_DIR_NEW, `${sourcePage}.meta.json`))
                        ? path.join(OCR_DIR_NEW, `${sourcePage}.meta.json`)
                        : path.join(OCR_DIR_OLD, `${sourcePage}.meta.json`))
                    : null;
                let cropUrl = null;

                // --- Tier 1: extracted figure crop (fig_id match within allowlist) ---
                if (metaPath && fs.existsSync(metaPath)) {
                    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
                    const figures = meta.figures || [];
                    const fig = findAllowedFigureForBlock(figures, block, allowedNewBookFigures);
                    if (fig) {
                        block.fig_id = block.fig_id || fig.fig_id || '';
                        block.caption = block.caption || fig.caption || '';
                        block.file_path = block.file_path || fig.crop_file || '';
                        if (fig.crop_file && allowedNewBookFigures.has(path.basename(fig.crop_file)) && fs.existsSync(path.join(FIGURE_IMAGE_DIR_NEW, fig.crop_file))) {
                            cropUrl = `/figures/${encodeURIComponent(fig.crop_file)}`;
                        } else if (fig.crop_file) {
                            const generatedCropPath = path.join(GENERATED_DIR, 'crops', fig.crop_file);
                            if (fs.existsSync(generatedCropPath)) {
                                cropUrl = `/generated/crops/${encodeURIComponent(fig.crop_file)}`;
                            }
                        }
                    }
                }

                // --- Tier 1b: explicit file_path (figure from new-book-figures dir) ---
                if (!cropUrl && block.file_path) {
                    const fileName = path.basename(String(block.file_path || ''));
                    if (fileName && allowedNewBookFigures.has(fileName) && fs.existsSync(path.join(FIGURE_IMAGE_DIR_NEW, fileName))) {
                        cropUrl = `/figures/${encodeURIComponent(fileName)}`;
                    }
                }

                if (cropUrl && !block.warning) {
                    const altText = block.fig_id || figId || block.caption || 'Textbook page';
                    const metaHtml = (block.teaching_role || block.mode_specific_visual_use)
                        ? `<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="${escapeHtmlAttr(block.teaching_role || '')}" data-visual-use-b64="${Buffer.from(JSON.stringify(block.mode_specific_visual_use || {})).toString('base64')}" style="display:none;"></div>`
                        : '';
                    if (metaHtml) parts.push(`%%KC_BLOCK%%${metaHtml}%%KC_END%%`);
                    parts.push(`![${altText}](${cropUrl})`);
                    if (block.caption && block.caption !== (block.fig_id || figId)) parts.push(`*${block.caption}*`);
                } else if (bookSource !== 'new') {
                    const reason = block.warning || `no allowed figure or page image found for ${sourcePage}${figId ? ` (${figId})` : ''}`;
                    parts.push(`*(Figure unavailable: ${reason})*`);
                }
                break;
            }

            case 'web_search_image':
                if (block.selected_url) {
                    parts.push(`![Web image](${block.selected_url})`);
                    if (block.caption) parts.push(`*${block.caption}*`);
                } else if (block.fallback_triggered) {
                    // The generate_image fallback will appear as the next block
                    parts.push(`*(Web image search: no result, see generated image below)*`);
                }
                break;

            case 'generate_image': {
                const metaHtml = (block.teaching_role || block.mode_specific_visual_use)
                    ? `<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="${escapeHtmlAttr(block.teaching_role || '')}" data-visual-use-b64="${Buffer.from(JSON.stringify(block.mode_specific_visual_use || {})).toString('base64')}" style="display:none;"></div>`
                    : '';
                const rawPrompt = block.prompt || block.spec || (block.python_spec && (block.python_spec.description || block.python_spec.title)) || block.reason || 'educational illustration';
                const stylePrefix = 'Pure white clean background, minimalist lecture-notes educational diagram, centered academic layout, exactly one knowledge point, single clear reading path, low-saturation academic palette, navy / muted teal / soft gray with muted red only for warnings, clean linework, restrained colored teaching boxes, no poster styling, no cartoon elements, no dense text blocks, no full derivation, no extra examples, exam-oriented concept clarity. ';
                const prompt = `${stylePrefix}${rawPrompt}`.trim();
                try {
                    const imgResult = await callTutorSkillRaw(prompt);
                    const urls = extractRenderableImageUrls(imgResult);
                    if (urls.length > 0) {
                        if (metaHtml) parts.push(`%%KC_BLOCK%%${metaHtml}%%KC_END%%`);
                        if (block.caption) parts.push(`*🎨 ${block.caption}*`);
                        parts.push(`![Illustration](${urls[0]})`);
                    } else {
                        console.warn('[LessonImage] generate_image returned no renderable URL; omitting student-facing placeholder.');
                    }
                } catch (e) {
                    console.warn('[LessonImage] generate_image failed; omitting student-facing placeholder:', e.message);
                }
                break;
            }

            case 'knowledge_check': {
                // Legacy single-question support
                const kcHtml = `<div class="kc-container" data-question="${block.question.replace(/"/g,'&quot;')}" data-answer="${block.answer.replace(/"/g,'&quot;')}" data-hint="${(block.hint||'').replace(/"/g,'&quot;')}" style="display:none;"></div>`;
                parts.push(`%%KC_BLOCK%%${kcHtml}%%KC_END%%`);
                break;
            }

            case 'section_summary':
                parts.push('---\n**📌 Key Takeaways**');
                if (Array.isArray(block.bullets)) {
                    block.bullets.forEach(b => parts.push(`- ${b}`));
                }
                if (block.transition) parts.push(`\n*${block.transition}*`);
                break;

            case 'quiz_plan': {
                const b64Json = Buffer.from(JSON.stringify(block || {})).toString('base64');
                const quizHtml = `<div class="kc-quiz-plan" data-quiz-b64="${b64Json}" style="display:none;"></div>`;
                parts.push(`%%KC_BLOCK%%${quizHtml}%%KC_END%%`);
                break;
            }

            default:
                if (block.content) parts.push(block.content);
                break;
        }
        parts.push(''); // spacer between blocks
    }

    return parts.join('\n');
}

/**
 * 生成小节完整讲解 — now powered by dual-agent pipeline
 */
function buildSyntheticProfileMemory(baseMemory, overrides = {}) {
    const baseQuiz = normalizeQuizProfile((baseMemory && baseMemory.quiz) ? baseMemory.quiz : {});
    const nextQuiz = normalizeQuizProfile({ ...baseQuiz, ...overrides });
    return { ...(baseMemory || {}), quiz: nextQuiz };
}

async function prewarmLessonVariants(sectionId, sectionTitle, bookPages, baseMemory, bookSource = 'new', language = 'en') {
    if (bookSource !== 'new') return { scheduled: 0, generated: 0 };
    if (!baseMemory || !baseMemory.quiz) return { scheduled: 0, generated: 0 };

    const math = normalizeQuizProfile(baseMemory.quiz).math;
    const candidates = ['cram', 'standard', 'top_score'].map(track =>
        buildSyntheticProfileMemory(baseMemory, { track, goal: track, math })
    );

    setTimeout(async () => {
        let generated = 0;
        for (const memory of candidates) {
            const cacheKey = buildLessonCacheKey(memory, bookSource);
            if (!cacheKey) continue;
            if (readLessonCache(sectionId, memory, bookSource)) continue;
            try {
                const profilePrompt = buildUserProfilePrompt(memory);
                const lesson = await generateSectionLesson(sectionId, sectionTitle, bookPages, [], language, profilePrompt, bookSource);
                if (lesson) {
                    writeLessonCache(sectionId, memory, lesson, bookSource);
                    generated += 1;
                }
            } catch (err) {
                console.warn(`[LessonCache] prewarm failed for ${sectionId} / ${cacheKey}: ${err.message}`);
            }
        }
        console.log(`[LessonCache] prewarm finished for ${sectionId}: generated=${generated}`);
    }, 0);

    return { scheduled: candidates.length, generated: 0 };
}

function findFallbackBookImageBlock(sectionId, bookPages, language = 'en', bookSource = 'old') {
    const allowedNewBookFigures = getAllowedNewBookFigures(sectionId, bookPages, bookSource);

    for (const page of bookPages || []) {
        const metaPath = path.join((page && page.textPath ? path.dirname(page.textPath) : OCR_DIR), `${page.page}.meta.json`);
        if (!fs.existsSync(metaPath)) continue;
        try {
            const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
            const figures = Array.isArray(meta.figures) ? meta.figures.filter((fig) => {
                const crop = path.basename(String((fig && fig.crop_file) || ''));
                return !crop || bookSource !== 'new' || allowedNewBookFigures.has(crop);
            }) : [];
            if (!figures.length) continue;
            const canonical = figures.find(f => /complex plane|real axis|imaginary axis|signal|system|block diagram|unit step|impulse|phasor|polar|fraction|pole|zero|response|waveform/i.test(`${f.fig_id || ''} ${f.caption || ''}`)) || figures[0];
            return {
                type: 'book_image',
                source_page: page.page,
                fig_id: canonical.fig_id || null,
                crop_hint: 'full',
                teaching_role: 'concept_anchor',
                mode_specific_visual_use: {
                    cram: 'Use this textbook figure for fast pattern recognition.',
                    standard: 'Use this textbook figure to anchor the core concept before the generated teaching visual refines it.',
                    top_score: 'Use this textbook figure to compare notation details, traps, and edge cases.'
                },
                caption_instruction: language === 'zh'
                    ? '写一句中文 caption，说明这张教材图展示了什么，以及它为什么能锚定本节的核心概念。'
                    : 'Write a one-sentence caption explaining what this textbook figure shows and why it anchors the core idea of this section.'
            };
        } catch (err) {
            console.warn(`[Pipeline] Failed to inspect figure metadata for ${sectionId} / ${page.page}: ${err.message}`);
        }
    }

    return null;
}

function buildFallbackQuizPlan(sectionId, sectionTitle, language = 'en') {
    const label = compactWhitespace(sectionTitle || sectionId || 'this section');
    const isZh = language === 'zh';
    return {
        type: 'quiz_plan',
        target_questions: 4,
        question_range: { min: 4, max: 5 },
        knowledge_points: [
            {
                id: `${String(sectionId || 'section').replace(/[^a-zA-Z0-9]+/g, '_').toLowerCase()}_core`,
                label,
                importance: 'high',
                exam_weight: 'high',
                mastery_rule: { correct_streak_required: 2 },
                questions: isZh ? [
                    {
                        id: 'core_q1',
                        type: 'multiple_choice',
                        stem: `关于 ${label}，下面哪种说法最准确？`,
                        options: [
                            'A. 只要记结论，不需要理解图像和公式之间的关系',
                            'B. 要同时看懂定义、图像/结构含义，以及题目里怎么考',
                            'C. 这节内容只能靠死记硬背，无法用结构理解',
                            'D. 这节重点只是符号变形，和实际题型无关'
                        ],
                        correct_option: 'B',
                        explanation: '本节应把定义、结构/图像以及考试中的识别方式连起来理解。',
                        wrong_option_explanations: {
                            A: '只背结论很容易在变式题里出错。',
                            C: '这节通常存在可理解的结构关系，不只是死记。',
                            D: '考试会直接考你是否理解这些结构含义。'
                        },
                        hint: '想想这节真正想让学生“看懂什么、会判断什么”。',
                        needs_visual: false,
                        same_point_variant: false
                    },
                    {
                        id: 'core_q2',
                        type: 'short_answer',
                        stem: `用 1-2 句话说明：学习 ${label} 时，最应该先抓住的核心关系是什么？`,
                        ideal_answer: '应先抓住本节的核心定义或结构关系，再把它和图像/公式表示对应起来，最后知道考试会怎么变形来考。',
                        grading_rubric: [
                            '提到核心定义或结构关系',
                            '提到图像/公式表示的对应',
                            '提到考试或题型中的应用判断'
                        ],
                        explanation: '这题检查学生是否真的抓住了本节主线，而不是只抄局部结论。',
                        hint: '不要背细节，先说“这节最核心的关系”是什么。',
                        needs_visual: false,
                        same_point_variant: false
                    }
                ] : [
                    {
                        id: 'core_q1',
                        type: 'multiple_choice',
                        stem: `Which statement best captures the main learning goal of ${label}?`,
                        options: [
                            'A. Memorize the final result without connecting it to the visual or structural meaning',
                            'B. Understand the core definition, the visual/structural meaning, and how the idea appears in exam questions',
                            'C. Treat the topic as pure symbol manipulation with no conceptual structure',
                            'D. Focus only on terminology because the exam never tests interpretation'
                        ],
                        correct_option: 'B',
                        explanation: 'Strong understanding in this section means connecting the definition, the structure/visual meaning, and the exam-facing interpretation.',
                        wrong_option_explanations: {
                            A: 'Memorization alone usually breaks on variants and trap questions.',
                            C: 'The section is meant to be understood structurally, not as empty symbol pushing.',
                            D: 'Interpretation is exactly what many exam questions probe.'
                        },
                        hint: 'Pick the option that combines meaning, representation, and exam use.',
                        needs_visual: false,
                        same_point_variant: false
                    },
                    {
                        id: 'core_q2',
                        type: 'short_answer',
                        stem: `In 1-2 sentences, explain the core relationship a student should notice first when learning ${label}.`,
                        ideal_answer: 'The student should first identify the section\'s central definition or structural relationship, then connect it to the visual or symbolic representation and to the typical exam interpretation.',
                        grading_rubric: [
                            'Must mention the core definition or structural relationship',
                            'Must connect it to a visual or symbolic representation',
                            'Must mention exam interpretation or problem-solving use'
                        ],
                        explanation: 'This checks whether the student sees the main thread of the section instead of isolated facts.',
                        hint: 'Start with “the main relationship is...” rather than listing details.',
                        needs_visual: false,
                        same_point_variant: false
                    }
                ]
            }
        ]
    };
}

function buildFallbackBlueprint(sectionId, sectionTitle, bookPages, language = 'en', rawAgentAOutput = '', bookSource = 'old') {
    const isZh = language === 'zh';
    const title = compactWhitespace(sectionTitle || sectionId || 'Untitled section');
    const ocrSnippets = (bookPages || []).slice(0, 3).map((page) => readOCRText(page.textPath, 900)).filter(Boolean);
    const summaryBits = uniqueStrings([
        title,
        ...((bookPages || []).map(page => page && page.summary).filter(Boolean)),
        ...((bookPages || []).flatMap(page => Array.isArray(page && page.keywords) ? page.keywords : [])),
        compactWhitespace(String(rawAgentAOutput || '').replace(/[{}\[\]`*_>#]/g, ' ')).slice(0, 240)
    ], 8);
    const conceptHints = summaryBits.filter(Boolean).slice(0, 4).join('; ');
    const bookImageBlock = findFallbackBookImageBlock(sectionId, bookPages, language, bookSource);
    const visualPromptTail = isZh
        ? `围绕知识点“${title}”制作一张讲义风格教学图。优先表达核心关系、结构变化或做题时最容易混淆的对比。可参考这些线索：${conceptHints || title}。`
        : `Create a lecture-notes teaching visual for the knowledge point "${title}". Focus on the core relationship, structural change, or most exam-relevant contrast. Helpful context: ${conceptHints || title}.`;

    const blocks = [
        {
            type: 'text_explanation',
            instruction: isZh
                ? `以“## Overview”开头，用中文写 90-130 字的小节总览，面向零基础学生。说明这节在讲什么、为什么重要、学完后会什么。尽量贴近教材原文，不要空泛。可以参考这些 OCR 线索：${ocrSnippets.join(' / ') || title}`
                : `Start with "## Overview" and write a 90-130 word beginner-friendly overview in English. Explain what this section is about, why it matters, and what the student will be able to do after it. Stay grounded in the textbook wording. OCR hints: ${ocrSnippets.join(' / ') || title}`
        }
    ];

    if (bookImageBlock) blocks.push(bookImageBlock);

    blocks.push(
        {
            type: 'generate_image',
            tool: 'openai/gpt-5.4-image-2',
            reason: bookImageBlock
                ? 'Agent A failed to return valid JSON, so generate a clean teaching visual while preserving textbook anchoring.'
                : 'Agent A failed to return valid JSON, so synthesize the missing visual anchor with gptimage2 instead of returning a text-only lesson.',
            teaching_role: bookImageBlock ? 'comparison_anchor' : 'concept_anchor',
            mode_specific_visual_use: {
                cram: 'Use this generated visual to recognize the pattern or move within seconds.',
                standard: 'Use this generated visual to make the core idea intuitive with one clear reading path.',
                top_score: 'Use this generated visual to expose subtle distinctions, traps, or parameter changes.'
            },
            prompt: `${visualPromptTail}`,
            style_hint: 'lecture notes, academic, clean, restrained color boxes, exam-oriented, one concept only'
        },
        {
            type: 'text_explanation',
            instruction: isZh
                ? `以“## Core idea”开头，用中文写 120-180 字，抓住 ${title} 的一个核心关系来讲清楚。要把定义/结构、图像直觉、以及考试里最容易出错的点连起来，最多举一个最小例子。`
                : `Start with "## Core idea" and write 120-180 words that teach one central relationship in ${title}. Connect the definition or structure, the visual intuition, and the most likely exam trap. Use at most one minimal example.`
        },
        {
            type: 'section_summary',
            instruction: isZh
                ? '总结本节最关键的 3 个 takeaway，每条尽量不超过 20 个字，并补一句过渡到下一节的话。'
                : 'Summarize the 3 most critical takeaways from this section in bullets of at most 20 words each, then add one transition sentence to the next section.'
        },
        buildFallbackQuizPlan(sectionId, title, language)
    );

    const visualPlan = {
        primary_anchor: bookImageBlock ? 'both' : 'generated_image',
        rationale: bookImageBlock
            ? 'Agent A JSON failed, so keep one textbook figure as the factual anchor and add one generated gptimage2 teaching visual to preserve clarity.'
            : 'Agent A JSON failed, so rely on one generated gptimage2 teaching visual instead of returning a text-only lesson.',
        cram: 'Use the visual to recognize the exam pattern quickly.',
        standard: 'Use the visual to clarify the core concept with a single clear path.',
        top_score: 'Use the visual to highlight subtle distinctions, traps, or variants.'
    };

    return {
        section_id: sectionId,
        section_title: title,
        difficulty: 'beginner',
        estimated_read_minutes: 5,
        learning_objectives: isZh
            ? [`理解 ${title} 的核心关系`, '能把图像/结构和公式意义对上', '知道题目里最容易怎么考']
            : [`Understand the core relationship in ${title}`, 'Connect the visual or structural meaning to the formula or notation', 'Recognize the most exam-relevant interpretation or trap'],
        visual_plan: visualPlan,
        blocks
    };
}

async function generateSectionLesson(sectionId, sectionTitle, bookPages, webSources, language = 'en', userProfilePrompt = '', bookSource = 'old') {
    // ── Agent A: Plan ──────────────────────────────────────────────────────────
    let blueprint = null;
    let agentARaw = '';
    const finalizeLesson = (markdown) => normalizeMathMarkdown(markdown);
    try {
        const result = await agentA_plan(sectionId, sectionTitle, bookPages, webSources, language, userProfilePrompt, bookSource);
        blueprint = result.blueprint;
        agentARaw = String(result.raw || '');
    } catch (err) {
        console.error('[Agent A] Error:', err.message);
    }

    // ── Fallback: synthesize a minimal blueprint so the lesson still goes through the visual pipeline ──
    if (!blueprint) {
        try {
            blueprint = buildFallbackBlueprint(sectionId, sectionTitle, bookPages, language, agentARaw, bookSource);
            console.warn(`[Pipeline] Agent A blueprint failed — synthesized fallback blueprint with ${Array.isArray(blueprint && blueprint.blocks) ? blueprint.blocks.length : 0} blocks.`);
        } catch (err) {
            console.error('[Pipeline] Failed to synthesize fallback blueprint:', err.message);
        }
    }

    // ── Last-resort fallback: keep old direct markdown path only if blueprint synthesis also failed ───────
    if (!blueprint) {
        console.warn('[Pipeline] Fallback blueprint synthesis failed — running Agent B in direct mode as last resort.');
        const bookContext = buildBookContext(bookPages.map(p => ({
            ...p,
            ocrText: readOCRText(p.textPath, 4000)
        })));
        const webContext = buildWebContext(webSources);
        const langNote = language === 'zh'
            ? '用中文，面向零基础学生，语气亲切。'
            : 'Write in clear English for native English-speaking beginners. Friendly, conversational tone.';
        const prompt = [
            `Section: ${sectionTitle || sectionId}`,
            '', 'Textbook OCR:', bookContext,
            '', 'Web sources:', webContext,
            '', 'Instructions:', langNote,
            'This lesson is page-based. Page 1 must be a section overview. Middle pages should be one major knowledge point per page. The second-to-last page must be a recap/summary. The final page must be a dedicated exam-oriented quiz_plan page only.',
            'Use Markdown. LaTeX for math ($$...$$). Also include one exam-oriented quiz_plan that covers the section\'s important knowledge points, uses mostly multiple-choice questions, and adds short-answer only when needed.'
        ].join('\n');
        const fallbackLesson = await callOpenRouterChat({
            model: AGENT_B_MODEL, timeoutMs: 120000, temperature: 0.3, maxTokens: 5000,
            messages: [
                { role: 'system', content: 'You are a patient, precise tutor for Signal Processing and Linear Systems. Explain everything from scratch.' },
                { role: 'user', content: prompt }
            ]
        });
        return finalizeLesson(fallbackLesson);
    }

    // ── Agent B: Execute ───────────────────────────────────────────────────────
    const lesson = await agentB_execute(sectionId, blueprint, bookPages, webSources, language, bookSource);
    return finalizeLesson(lesson);
}

/** Legacy single-agent lesson (kept for reference, not used) */
async function _legacyGenerateSectionLesson(sectionId, sectionTitle, bookPages, webSources) {
    const bookContext = buildBookContext(bookPages.map(p => ({
        ...p,
        ocrText: readOCRText(p.textPath, 4000)
    })));
    const webContext = buildWebContext(webSources);

    const prompt = [
        `学生正在学习小节：${sectionTitle || sectionId}`,
        '',
        '教材原文：',
        bookContext,
        '',
        '联网补充资料：',
        webContext,
        '',
        '输出要求：',
        '1. 用中文，面向完全零基础的学生，语气亲切自然。',
        '2. 用 Markdown 输出，结构清晰。',
        '3. 按书本顺序逐块讲解，每块对应一个知识点。',
        '4. 数学公式用 LaTeX，块级公式写成 $$...$$，行内公式写成 $...$。',
        '5. 优先基于教材，网页资料作为延伸补充，在结尾单独一节"延伸阅读"里提及。',
        '6. 最后给出 1-2 道"理解检验"小问题（不是考试题，是帮助学生自查的）。',
        '7. 不要出现 [书页N] / [来源N] 引用标注。'
    ].join('\n');

    return callOpenRouterChat({
        model: 'anthropic/claude-haiku-4.5',
        timeoutMs: 120000,
        temperature: 0.3,
        maxTokens: 4000,
        messages: [
            { role: 'system', content: '你是一位耐心、准确、会讲人话的理工科导师。你的目标是让完全没学过这门课的学生在短时间内真正理解这个知识点。' },
            { role: 'user', content: prompt }
        ]
    });
}

/**
 * 通用 Python3 runner — executes scriptPath with a single string argument
 */
function runPython3(scriptPath, arg, timeoutMs = 30000) {
    return new Promise((resolve, reject) => {
        const child = spawn(PYTHON_BIN, [scriptPath, arg], {
            env: { ...process.env, MPLBACKEND: 'Agg' },
            stdio: ['ignore', 'pipe', 'pipe']
        });
        let stdout = '';
        let stderr = '';
        const timer = setTimeout(() => { child.kill('SIGKILL'); reject(new Error(`${PYTHON_BIN} timeout`)); }, timeoutMs);
        child.stdout.on('data', d => { stdout += d.toString('utf8'); });
        child.stderr.on('data', d => { stderr += d.toString('utf8'); });
        child.on('error', e => { clearTimeout(timer); reject(e); });
        child.on('close', code => {
            clearTimeout(timer);
            if (code !== 0) return reject(new Error(stderr || `exit ${code}`));
            resolve(stdout.trim());
        });
    });
}

/**
 * 直接运行技能脚本（保留旧接口能力）
 */
async function callTutorSkillRaw(prompt) {
    return new Promise((resolve, reject) => {
        const timeoutMs = Number(process.env.TUTOR_SKILL_TIMEOUT_MS || 240000);
        const maxOutputBytes = 12 * 1024 * 1024;

        const child = spawn(PYTHON_BIN, [SKILL_SCRIPT, prompt], {
            env: { ...process.env, MPLBACKEND: 'Agg', TUTOR_GENERATED_DIR: GENERATED_DIR, TUTOR_IMAGE_ONLY: '1' },
            stdio: ['ignore', 'pipe', 'pipe']
        });

        let stdout = '';
        let stderr = '';
        let outputTooLarge = false;
        let timedOut = false;

        const timer = setTimeout(() => {
            timedOut = true;
            child.kill('SIGKILL');
        }, timeoutMs);

        child.stdout.on('data', (chunk) => {
            stdout += chunk.toString('utf8');
            if (Buffer.byteLength(stdout, 'utf8') > maxOutputBytes) {
                outputTooLarge = true;
                child.kill('SIGKILL');
            }
        });

        child.stderr.on('data', (chunk) => {
            stderr += chunk.toString('utf8');
        });

        child.on('error', (err) => {
            clearTimeout(timer);
            reject(new Error(`Failed to start skill script: ${err.message}`));
        });

        child.on('close', (code) => {
            clearTimeout(timer);

            if (timedOut) return reject(new Error(`Request timeout (${Math.round(timeoutMs / 1000)}s)`));
            if (outputTooLarge) return reject(new Error('Skill output too large (>12MB)'));
            if (code !== 0) return reject(new Error((stderr || `Skill exited with code ${code}`).trim()));

            resolve(stdout.trim() || '处理完成（无文本输出）');
        });
    });
}

const server = http.createServer(async (req, res) => {
    setCORSHeaders(res);

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname || '/';
    console.log(`[HTTP] ${req.method} ${pathname}`);

    if (pathname === '/api/tutor' && req.method === 'POST') {
        try {
            const data = await readJsonBody(req);
            const prompt = data.prompt;

            if (typeof prompt !== 'string' || !prompt.trim()) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Missing prompt' }));
                return;
            }

            const result = await callTutorSkillRaw(prompt);
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({
                response: result,
                mode: 'direct-skill-script',
                promptPassthrough: true
            }));
        } catch (err) {
            console.error('[API /api/tutor] Error:', err.message);
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: err.message }));
        }
        return;
    }


    // ──────────────────────────────────────────────────
    // GET /api/memory?uid=xxx  →  return user memory
    // POST /api/memory          →  create or patch user memory
    // ──────────────────────────────────────────────────
    if (pathname === '/api/memory') {
        if (req.method === 'GET') {
            const uid = parsedUrl.query.uid;
            if (!uid) { res.writeHead(400); res.end(JSON.stringify({ error: 'Missing uid' })); return; }
            const mem = readUserMemory(uid);
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(mem || {}));
            return;
        }
        if (req.method === 'POST') {
            try {
                const data = await readJsonBody(req);
                const uid = data.uid;
                if (!uid) { res.writeHead(400); res.end(JSON.stringify({ error: 'Missing uid' })); return; }
                const existing = readUserMemory(uid) || { uid, createdAt: new Date().toISOString() };
                // Merge patch: quiz, knownConcepts, weakConcepts, sessionSummaries
                if (data.quiz) existing.quiz = normalizeQuizProfile(Object.assign({}, existing.quiz || {}, data.quiz));
                if (Array.isArray(data.knownConcepts)) {
                    const set = new Set([...(existing.knownConcepts || []), ...data.knownConcepts]);
                    existing.knownConcepts = [...set];
                }
                if (Array.isArray(data.weakConcepts)) {
                    const set = new Set([...(existing.weakConcepts || []), ...data.weakConcepts]);
                    existing.weakConcepts = [...set];
                }
                if (typeof data.sessionSummary === 'string' && data.sessionSummary.trim()) {
                    existing.sessionSummaries = existing.sessionSummaries || [];
                    existing.sessionSummaries.push(
                        `${new Date().toISOString().slice(0,10)}: ${data.sessionSummary.trim()}`
                    );
                    // Keep last 30 summaries
                    if (existing.sessionSummaries.length > 30) existing.sessionSummaries = existing.sessionSummaries.slice(-30);
                }
                existing.lastUpdated = new Date().toISOString();
                writeUserMemory(uid, existing);
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ ok: true, memory: existing }));
            } catch (err) {
                res.writeHead(500); res.end(JSON.stringify({ error: err.message }));
            }
            return;
        }
    }

    if (pathname === '/api/memory/rebuild' && req.method === 'POST') {
        try {
            const data = await readJsonBody(req);
            const uid = data.uid;
            if (!uid) { res.writeHead(400); res.end(JSON.stringify({ error: 'Missing uid' })); return; }
            const existing = readUserMemory(uid) || { uid, createdAt: new Date().toISOString() };
            const rebuilt = deriveMemoryFromSessions(uid, data.sessions, existing);
            writeUserMemory(uid, rebuilt);
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ ok: true, memory: rebuilt }));
        } catch (err) {
            res.writeHead(500); res.end(JSON.stringify({ error: err.message }));
        }
        return;
    }

    if (pathname === '/api/section' && req.method === 'POST') {
        try {
            const data = await readJsonBody(req);
            const sectionId = compactWhitespace(data.sectionId || '');
            const sectionTitle = compactWhitespace(data.sectionTitle || sectionId);
            const mode = data.mode || 'intro'; // 'intro' | 'lesson'
            const language = (data.language === 'zh') ? 'zh' : 'en'; // default EN
            const uid = data.uid || null;
            const userMemory = uid ? readUserMemory(uid) : null;
            const requestProfileMemory = data.profileOverride ? { quiz: normalizeQuizProfile(data.profileOverride) } : null;
            // profileMemory: explicit override wins; otherwise fall back to persisted uid-based memory
            const profileMemory = requestProfileMemory
                || (userMemory ? { ...userMemory, quiz: normalizeQuizProfile(userMemory.quiz || {}) } : null);
            const userProfilePrompt = buildUserProfilePrompt(profileMemory);
            const { ocrDir: secOcrDir } = getBookDirs(data.bookSource);

            if (!sectionId) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Missing sectionId' }));
                return;
            }

            console.log(`[SECTION] sectionId=${sectionId} mode=${mode} book=${data.bookSource||'old'}`);
            const rawPages = getPagesForSection(sectionId, secOcrDir);
            const bookPages = rawPages.map(item => ({
                ...item,
                image: `/pages/${item.pageImage}`
            }));

            if (mode === 'intro') {
                const intro = await generateSectionIntro(sectionId, sectionTitle, rawPages, language);
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    sectionId,
                    sectionTitle,
                    intro,
                    bookPages: bookPages.map(p => ({
                        page: p.page,
                        image: p.image,
                        subsection: p.subsection,
                        title: p.title,
                        summary: p.summary
                    }))
                }));
            } else if (mode === 'lesson') {
                // ── Check lesson cache first ──────────────────────────────
                const cachedLesson = readLessonCache(sectionId, profileMemory, data.bookSource);
                if (cachedLesson) {
                    console.log(`[SECTION] Cache hit for ${sectionId}, skipping pipeline.`);
                    const normalizedCachedLesson = normalizeMathMarkdown(convertLegacyQuickCheckToKcBlocks(cachedLesson));
                    if (normalizedCachedLesson !== cachedLesson && profileMemory) {
                        writeLessonCache(sectionId, profileMemory, normalizedCachedLesson, data.bookSource);
                    }
                    if (hasVisualMetadataMarkup(normalizedCachedLesson)
                        && !hasDisallowedNewBookPageFallback(normalizedCachedLesson, sectionId, rawPages, data.bookSource)
                        && !hasDisallowedNewBookFigureRefs(normalizedCachedLesson, sectionId, rawPages, data.bookSource)
                        && !hasNewBookFigureUnavailablePlaceholder(normalizedCachedLesson, data.bookSource)
                        && !hasIllustrationUnavailablePlaceholder(normalizedCachedLesson)
                        && !hasLegacyGeneratedVisualArtifacts(normalizedCachedLesson)) {
                        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                        res.end(JSON.stringify({
                            sectionId, sectionTitle,
                            lesson: normalizedCachedLesson,
                            cached: true,
                            bookPages: bookPages.map(p => ({
                                page: p.page, image: p.image,
                                subsection: p.subsection, title: p.title, summary: p.summary
                            })),
                            webSources: []
                        }));
                        return;
                    }
                    console.warn(`[SECTION] Cache for ${sectionId} is stale, legacy-generated, or lacks valid visual metadata; regenerating through pipeline.`);
                }

                const legacyFallbackLesson = readLegacyLessonCacheFallback(sectionId, profileMemory, data.bookSource);
                if (legacyFallbackLesson) {
                    const normalizedLegacyLesson = normalizeMathMarkdown(convertLegacyQuickCheckToKcBlocks(legacyFallbackLesson));
                    if (hasVisualMetadataMarkup(normalizedLegacyLesson)
                        && !hasDisallowedNewBookPageFallback(normalizedLegacyLesson, sectionId, rawPages, data.bookSource)
                        && !hasDisallowedNewBookFigureRefs(normalizedLegacyLesson, sectionId, rawPages, data.bookSource)
                        && !hasNewBookFigureUnavailablePlaceholder(normalizedLegacyLesson, data.bookSource)
                        && !hasIllustrationUnavailablePlaceholder(normalizedLegacyLesson)
                        && !hasLegacyGeneratedVisualArtifacts(normalizedLegacyLesson)) {
                        if (profileMemory) {
                            writeLessonCache(sectionId, profileMemory, normalizedLegacyLesson, data.bookSource);
                        }
                        console.log(`[SECTION] Legacy fallback cache used for ${sectionId}.`);
                        const prewarm = await prewarmLessonVariants(sectionId, sectionTitle, rawPages, profileMemory, data.bookSource === 'new' ? 'new' : 'old', language);
                        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                        res.end(JSON.stringify({
                            sectionId,
                            sectionTitle,
                            lesson: normalizedLegacyLesson,
                            cached: true,
                            fallback: 'legacy-cache',
                            bookPages: bookPages.map(p => ({
                                page: p.page,
                                image: p.image,
                                subsection: p.subsection,
                                title: p.title,
                                summary: p.summary
                            })),
                            webSources: [],
                            prewarm
                        }));
                        return;
                    }
                    console.warn(`[SECTION] Legacy fallback for ${sectionId} is stale, legacy-generated, or lacks valid visual metadata; regenerating.`);
                }

                // Lesson generation should be textbook-first. Passing [] means: do NOT search the web.
                let webSources;
                if (Array.isArray(data.webSources)) {
                    webSources = data.webSources;  // use as-is (can be [])
                } else {
                    webSources = [];
                }
                console.log(`[SECTION] Starting dual-agent pipeline for ${sectionId} (lang=${language}, uid=${uid}, book=${data.bookSource || 'old'}, web=${webSources.length ? 'on' : 'off'})…`);
                let lesson = await generateSectionLesson(sectionId, sectionTitle, rawPages, webSources, language, userProfilePrompt, data.bookSource === 'new' ? 'new' : 'old');
                lesson = normalizeMathMarkdown(convertLegacyQuickCheckToKcBlocks(lesson));
                // ── Auto-save to lesson cache ───────────────────────────────
                if (lesson && profileMemory) {
                    writeLessonCache(sectionId, profileMemory, lesson, data.bookSource);
                }
                const prewarm = await prewarmLessonVariants(sectionId, sectionTitle, rawPages, profileMemory, data.bookSource === 'new' ? 'new' : 'old', language);
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    sectionId,
                    sectionTitle,
                    lesson,
                    bookPages: bookPages.map(p => ({
                        page: p.page,
                        image: p.image,
                        subsection: p.subsection,
                        title: p.title,
                        summary: p.summary
                    })),
                    webSources,
                    prewarm
                }));
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Invalid mode' }));
            }
        } catch (err) {
            console.error('[API /api/section] Error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: err.message || 'Unknown error' }));
        }
        return;
    }

    if (pathname === '/api/ask' && req.method === 'POST') {
        try {
            const data = await readJsonBody(req);
            const question = compactWhitespace(data.prompt || data.question || '');
            const mode = data.mode === 'followup' ? 'followup' : 'ask';
            const history = Array.isArray(data.history) ? data.history : [];
            const sectionId = compactWhitespace(data.sectionId || '');
            const sectionTitle = compactWhitespace(data.sectionTitle || '');
            const lessonContext = compactWhitespace(data.lessonContext || '');
            const language = data.language === 'zh' ? 'zh' : 'en';
            const uid = data.uid || null;
            const userMemory = uid ? readUserMemory(uid) : null;
            const userProfilePrompt = buildUserProfilePrompt(userMemory);
            const userPrefs = userMemory && userMemory.quiz ? userMemory.quiz : {};
            const answerLength = userPrefs.length || data.answerLength || 'medium';
            const attachments = Array.isArray(data.attachments) ? data.attachments : [];
            const { ocrDir, pageImageDir } = getBookDirs(data.bookSource);

            if (!question) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Missing prompt/question' }));
                return;
            }

            console.log('[ASK] Question:', question, 'mode=', mode);
            let relatedBooks = [];
            if (Array.isArray(data.bookPages) && data.bookPages.length) {
                relatedBooks = data.bookPages.map(item => ({
                    ...item,
                    pageImage: item.pageImage || `${item.page}.png`,
                    textPath: path.join(ocrDir, `${item.page}.txt`),
                    ocrText: readOCRText(path.join(ocrDir, `${item.page}.txt`), 5500)
                }));
            } else if (sectionId || sectionTitle) {
                relatedBooks = getPagesForSection(sectionId || sectionTitle, ocrDir).slice(0, 5).map(item => ({
                    ...item,
                    ocrText: readOCRText(item.textPath, 5500)
                }));
            } else {
                const keywords = await extractKeywords(question);
                relatedBooks = selectRelevantBooks(question, keywords, 3, 5, ocrDir).map(item => ({
                    ...item,
                    ocrText: readOCRText(item.textPath, 5500)
                }));
            }

            let webSources = Array.isArray(data.webSources) && data.webSources.length
                ? data.webSources
                : [];
            let searchAngles = [];
            let liveSearchEvents = [];
            
            // Check if web search is enabled from UI
            const useWebSearch = data.useWebSearch !== false;

            if (useWebSearch && (!webSources.length || mode === 'followup')) {
                const searchResult = await generateSearchAngles(question, {
                    history,
                    sectionTitle: sectionTitle || sectionId,
                    lessonContext,
                    userProfilePrompt
                });
                searchAngles = searchResult.angles || [];
                const resolvedQuestion = searchResult.resolvedQuery || question;
                console.log(`[ASK] Search resolved: "${question}" → "${resolvedQuestion}"`);
                const newWebSources = await collectWebSources(searchAngles, {
                    question: resolvedQuestion,
                    onSource: (source, currentSorted) => {
                        liveSearchEvents.push({ type: 'source', source, sources: currentSorted.slice(0, 8) });
                    }
                });
                // merge avoiding duplicates by url
                const seenUrls = new Set(webSources.map(w => w.url));
                for (const w of newWebSources) {
                    if (!seenUrls.has(w.url)) {
                        seenUrls.add(w.url);
                        webSources.push(w);
                    }
                }
                webSources = sortSourcesByType(webSources);
            } else if (!useWebSearch) {
                console.log('[ASK] Web search bypassed due to useWebSearch=false');
                liveSearchEvents.push({ type: 'status', message: 'Web search bypassed via toggle' });
            }

            let explanation = await generateExplanation(question, relatedBooks, webSources, {
                history,
                sectionTitle: sectionTitle || sectionId,
                lessonContext,
                language,
                mode,
                userProfilePrompt,
                attachments,
                answerLength
            });

            if (answerLength === 'short' && !explanation.includes('```')) {
                // 极致截断：保留第一行或第一句
                const parts = explanation.split(/[。！？\n]/);
                if (parts.length > 1 && parts[0].length > 10) {
                    explanation = parts[0] + (explanation.includes('。') ? '。' : '');
                }
            }

            // Post-process pure python outputs into images
            explanation = await processEmbeddedPython(explanation, GENERATED_DIR);

            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({
                explanation,
                bookPages: relatedBooks.map(item => ({
                    page: item.page,
                    image: item.image || `/pages/${item.pageImage}`,
                    subsection: item.subsection,
                    title: item.title,
                    summary: item.summary,
                    keywords: item.keywords
                })),
                webSources,
                liveSearchEvents,
                steps: [
                    `✅ 找到 ${relatedBooks.length} 个相关书页`,
                    `✅ 搜索到 ${webSources.length} 个网页来源`,
                    '✅ Haiku 讲解生成完毕'
                ],
                debug: {
                    mode,
                    searchAngles,
                    historyCount: history.length,
                    sectionTitle: sectionTitle || sectionId
                }
            }));

            // ── Async: update user memory based on this Q&A turn ─────────────
            // Fire-and-forget: does NOT block the response
            if (uid) {
                updateUserMemoryFromQA(uid, question, explanation, sectionId).catch(e =>
                    console.warn('[MemoryUpdate] failed:', e.message)
                );
            }
            return;
        } catch (err) {
            console.error('[API /api/ask] Error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: err.message || 'Unknown error' }));
        }
        return;
    }

    if (pathname === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
            status: 'ok',
            mode: 'tutor-rag-ui',
            indexedPages: BOOK_INDEX.length,
            apiAsk: true,
            apiTutor: true,
            skillScript: SKILL_SCRIPT
        }));
        return;
    }

    if (pathname === '/api/favicon') {
        const query = url.parse(req.url, true).query;
        const target = compactWhitespace(query.url || '');
        const domain = compactWhitespace(query.domain || '');
        const rawTarget = target || (domain ? `https://${domain}` : '');
        if (!rawTarget) {
            res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('missing url/domain');
            return;
        }
        let normalized;
        try {
            normalized = new URL(rawTarget.startsWith('http') ? rawTarget : `https://${rawTarget}`);
        } catch (_) {
            res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('bad url');
            return;
        }

        const candidates = [
            `https://www.google.com/s2/favicons?sz=32&domain_url=${encodeURIComponent(normalized.toString())}`,
            `https://icons.duckduckgo.com/ip3/${encodeURIComponent(normalized.hostname)}.ico`
        ];

        let sent = false;
        for (const candidate of candidates) {
            try {
                const parsed = new URL(candidate);
                const body = await new Promise((resolve, reject) => {
                    const chunks = [];
                    const r = https.request({
                        protocol: parsed.protocol,
                        hostname: parsed.hostname,
                        path: `${parsed.pathname}${parsed.search}`,
                        method: 'GET',
                        headers: {
                            'User-Agent': 'TutorAgent/1.0 favicon-proxy'
                        }
                    }, resp => {
                        if ((resp.statusCode || 0) < 200 || (resp.statusCode || 0) >= 300) {
                            resp.resume();
                            reject(new Error(`status ${resp.statusCode}`));
                            return;
                        }
                        resp.on('data', c => chunks.push(c));
                        resp.on('end', () => resolve({
                            body: Buffer.concat(chunks),
                            contentType: resp.headers['content-type'] || 'image/png'
                        }));
                    });
                    r.on('error', reject);
                    r.setTimeout(8000, () => r.destroy(new Error('timeout')));
                    r.end();
                });
                // Validate: must be >100 bytes and look like an image
                if (body.body.length > 100 && (body.contentType || '').startsWith('image/')) {
                    res.writeHead(200, {
                        'Content-Type': body.contentType,
                        'Cache-Control': 'public, max-age=86400'
                    });
                    res.end(body.body);
                    sent = true;
                    break;
                }
            } catch (_) {}
        }
        if (!sent) {
            // Return a 1x1 transparent PNG so <img> doesn't show broken icon
            const TRANSPARENT_1x1_PNG = Buffer.from(
                'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQABNjN9GQAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC41ZYUyZQAAAA1JREFUGFdjYGBg+A8AAQIBAEK0UNwAAAAASUVORK5CYII=',
                'base64'
            );
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Cache-Control': 'public, max-age=3600'
            });
            res.end(TRANSPARENT_1x1_PNG);
        }
        return;
    }

    if (pathname.startsWith('/generated/')) {
        const filename = pathname.replace(/^\/generated\//, '');
        serveStaticFile(res, path.join(GENERATED_DIR, filename));
        return;
    }

    if (pathname.startsWith('/pages/')) {
        const filename = pathname.replace(/^\/pages\//, '');
        // Try old pages dir first, then new
        const oldPath = path.join(PAGE_IMAGE_DIR_OLD, filename);
        const newPath = path.join(PAGE_IMAGE_DIR_NEW, filename);
        if (fs.existsSync(oldPath)) {
            serveStaticFromDir(res, PAGE_IMAGE_DIR_OLD, filename);
        } else {
            serveStaticFromDir(res, PAGE_IMAGE_DIR_NEW, filename);
        }
        return;
    }

    if (pathname.startsWith('/figures/')) {
        const filename = pathname.replace(/^\/figures\//, '');
        const figurePath = path.join(__dirname, '../tutor-materials/new-book-figures', filename);
        serveStaticFile(res, figurePath);
        return;
    }

    // /api/crop?page=book-016&fig=Fig.+B.6  — serves pre-cropped figure PNG
    if (pathname === '/api/crop') {
        const query  = url.parse(req.url, true).query;
        const pageId = (query.page || '').replace(/[^a-zA-Z0-9-_]/g, '');
        const figId  = query.fig || '';
        if (!pageId) { res.writeHead(400); res.end('missing page'); return; }

        const CROPS_DIR = path.join(GENERATED_DIR, 'crops');

        // Build expected pre-cropped filename: book-016--Fig--B-6.png
        const safeFigId = figId.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        const cropFile  = `${pageId}--${safeFigId}.png`;
        const cropPath  = path.join(CROPS_DIR, cropFile);

        if (fs.existsSync(cropPath)) {
            serveStaticFromDir(res, CROPS_DIR, cropFile);
            return;
        }

        // Fuzzy fallback: find any crop for this page
        if (fs.existsSync(CROPS_DIR)) {
            const all = fs.readdirSync(CROPS_DIR);
            const match = all.find(f => f.startsWith(pageId + '--'));
            if (match) { serveStaticFromDir(res, CROPS_DIR, match); return; }
        }

        // Last resort: full page
        serveStaticFromDir(res, PAGE_IMAGE_DIR, `${pageId}.png`);
        return;
    }

    if (pathname.startsWith('/generated/')) {
        const filename = pathname.replace(/^\/generated\//, '');
        serveStaticFromDir(res, GENERATED_DIR, filename);
        return;
    }

    const staticDir = __dirname;
    const requestedFile = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');
    const filePath = path.join(staticDir, requestedFile);

    if (!filePath.startsWith(staticDir)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Forbidden');
        return;
    }

    serveStaticFile(res, filePath);
});

server.listen(HTTP_PORT, () => {
    console.log('='.repeat(64));
    console.log('Tutor Agent Bridge');
    console.log('='.repeat(64));
    console.log(`HTTP Server : http://localhost:${HTTP_PORT}`);
    console.log(`Indexed OCR : ${BOOK_INDEX.length} pages`);
    console.log(`Skill Script: ${SKILL_SCRIPT}`);
    console.log('');
    console.log('Endpoints:');
    console.log(`  - http://localhost:${HTTP_PORT}/           (Web UI)`);
    console.log(`  - http://localhost:${HTTP_PORT}/api/ask    (RAG + Web + Claude Opus)`);
    console.log(`  - http://localhost:${HTTP_PORT}/api/tutor  (Legacy API preserved)`);
    console.log(`  - http://localhost:${HTTP_PORT}/health     (Health check)`);
    console.log('='.repeat(64));
});

process.on('SIGINT', () => {
    console.log('\n[Server] Shutting down...');
    server.close(() => process.exit(0));
});
