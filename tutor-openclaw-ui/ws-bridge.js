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

const HTTP_PORT = 9000;
const APP_NAME = 'Tutor Agent';
const APP_URL = `http://localhost:${HTTP_PORT}`;

const OCR_DIR_OLD = '/Users/chenghaoxiang/.openclaw/workspace/tutor-materials/background-ocr-v3';
const PAGE_IMAGE_DIR_OLD = '/Users/chenghaoxiang/.openclaw/workspace/tutor-materials/background-pages-split';
const OCR_DIR_NEW = '/Users/chenghaoxiang/.openclaw/workspace/tutor-materials/new-book-ocr';
const PAGE_IMAGE_DIR_NEW = '/Users/chenghaoxiang/.openclaw/workspace/tutor-materials/new-book-pages';

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

const { processEmbeddedPython } = require('./process-python.js');

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
console.log(`[Index] Section maps loaded: old=${Object.keys(SECTION_PAGE_MAP).length}, new=${Object.keys(SECTION_PAGE_MAP_NEW).length}`);

// ─────────────────────────────────────────────────────────────────────────────
// USER MEMORY
// ─────────────────────────────────────────────────────────────────────────────
const USERS_DIR = path.join(__dirname, 'users');
try { if (!fs.existsSync(USERS_DIR)) fs.mkdirSync(USERS_DIR, { recursive: true }); } catch (_) {}

const LESSON_CACHE_DIR = path.join(__dirname, '../tutor-materials/lesson-cache');
const LESSON_CACHE_VERSION = 'v9'; // 3-track lesson cache: only content track + math + book source affect cache identity
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
        else if (legacyGoal === 'going_for_a' || legacyGoal === 'getting_ahead') next.track = 'foundation';
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
        foundation: [
            'TRACK = FOUNDATION.',
            'This lesson must feel noticeably slower, safer, and more beginner-protective than standard.',
            'Assume the student may be shaky on prerequisites and notation.',
            'Before using a prerequisite idea (phase shift, complex-number angle, trig relation, etc.), briefly patch it first.',
            'Use smaller steps, more explicit intermediate wording, and simpler sentences.',
            'Do not sound like an advanced student should already know the setup.'
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
        foundation: [
            'STRICT DIFFERENTIATION RULES FOR FOUNDATION:',
            '- Add prerequisite patching before the main explanation when needed.',
            '- Use more step-by-step unpacking than standard.',
            '- Explicitly name what each symbol means before manipulating formulas.',
            '- Prefer one tiny win at a time over dense compression.',
            '- If standard would assume a leap, foundation must spell it out.'
        ].join('\n')
    };
    const MATH_MAP = {
        all_solid: 'Math background: strong. You may use calculus, ODEs, and complex numbers normally.',
        calculus_ok: 'Math background: mixed. Re-explain ODEs or complex-number steps briefly before relying on them.',
        math_weak: 'Math background: weak. Prefer intuition first, lighter algebra, and explicit intermediate steps.'
    };
    const STYLE_MAP = {
        example_first: 'Presentation preference only: if possible, lead with a concrete example before abstraction.',
        principle_first: 'Presentation preference only: state the clean rule first, then illustrate it.',
        visual: 'Presentation preference only: add visual cues, diagrams, or plotting suggestions when useful.',
        step_by_step: 'Presentation preference only: visibly show intermediate steps instead of skipping them.'
    };
    const OUTCOME_MAP = {
        one_liner: 'Lightweight ending preference only: include a one-line takeaway when natural.',
        worked_example: 'Lightweight ending preference only: surface a worked example if one already fits the planned lesson.',
        exam_cheatsheet: 'Lightweight ending preference only: end with a short exam-oriented reminder list when useful.',
        formula_ref: 'Lightweight ending preference only: include a concise formula reference box when relevant.'
    };

    if (TRACK_MAP[quiz.track]) lines.push(TRACK_MAP[quiz.track]);
    if (TRACK_RULES[quiz.track]) lines.push(TRACK_RULES[quiz.track]);
    if (MATH_MAP[quiz.math]) lines.push(MATH_MAP[quiz.math]);

    const styles = Array.isArray(quiz.style) ? quiz.style : (quiz.style ? [quiz.style] : []);
    const allStyles = [...new Set([...styles, ...(Array.isArray(memory.inferredStyle) ? memory.inferredStyle : [])])];
    allStyles.forEach(s => { if (STYLE_MAP[s]) lines.push(STYLE_MAP[s]); });

    const outcomes = Array.isArray(quiz.outcome) ? quiz.outcome : (quiz.outcome ? [quiz.outcome] : []);
    outcomes.forEach(o => { if (OUTCOME_MAP[o]) lines.push(OUTCOME_MAP[o]); });

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
    // No-cache for JS/HTML to ensure fresh code always loads
    const noCache = ['.js', '.html'].includes(ext);

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
        language === 'zh' ? '5. 如果需要图示，请在正文自然解释，但不要自己输出 Python 代码块。图代码将由单独的代码模型生成。' : '5. If a diagram would help, explain it naturally in the answer, but do NOT generate Python code blocks yourself. Diagram code will be generated by a separate coding model.',
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
                    ? '你是一位耐心、准确、会讲人话的理工科导师，但**你绝对不要做无痛喂饭的复读机**。请基于给定教材 OCR、网页摘要和已有对话上下文生成结构化讲解。\n【追问处理必须遵循的核心法则】：\n当学生答错测验题、或者对概念理解有偏差（哪怕只有一点点）时，**绝对不要直接给出正确答案或马上把定义贴给他**。你必须：\n1. 指出他结论中哪个环节的逻辑断链了；\n2. 抛出一个基于他当前错误逻辑的**反例或极其刁钻的反问**，逼他自己发现矛盾；\n3. 像苏格拉底一样，一层一层用提问扒光他的盲点，直到他自己说出正确的推演逻辑，你再帮他总结。\n（对于 follow-up 问题，必须延续上下文。绝对不要输出 ```python 代码块...）\n绝对不要输出 ASCII 图、纯文本示意图、字符画坐标轴，**严禁**自己伪造 `![Generated Visualization](/generated/...)` 这类的图片链接；如果需要图示，只能在正文里用文字说明，后置的绘图模型会自动接管画图。' + userProfilePrompt
                    : 'You are a STEM tutor with a strict Socratic method. Generate structured explanations based on the given textbook OCR, web summaries, and conversation history.\n**Crucial rule for follow-ups/wrong answers:**\nIf the student is wrong or misunderstands a concept, DO NOT give away the answer immediately or copy-paste definitions. Instead:\n1. Identify the exact flaw in their logic.\n2. Present a "gotcha" counter-example or probing question based on their own flawed reasoning to expose the contradiction.\n3. Make them realize their own mistake and guide them to the correct conclusion via questions step-by-step.\nNever output ```python code blocks, ASCII diagrams, plain-text sketches, or character-drawn axes, and **NEVER** hallucinate or output markdown image links like `![Generated Visualization](/generated/...)` yourself; if a figure is needed, mention it in prose only and leave the actual image rendering to the subsequent drawing model.' + userProfilePrompt
            },
            {
                role: 'user',
                content: finalPrompt
            }
        ]
    });

    // Remove any hallucinated static image tags if the first agent incorrectly fabricated them
    explanation = explanation.replace(/!\[[^\]]*\]\(\/generated\/[^)]+\)/g, '');

    const wantsDiagram = /complex plane|phasor|plot|graph|diagram|visual|sketch|draw|坐标|图示|画图|复平面|波形|图像/i.test(question + '\n' + explanation);
    if (!wantsDiagram) return explanation;

    console.log('[ASK] Pipeline Step 3/3: Generating diagram code with a second Sonnet...');
    try {
        const codePrompt = [
            language === 'zh'
                ? '你是一位只负责教学图绘制的理工科导师兼 Python 绘图工程师。现在不要讲解正文，只负责输出图。必须仅输出一个合法的 ```python ... ``` 代码块，没有任何额外多余的废话。'
                : 'You are a STEM tutor and Python plotting engineer dedicated only to educational diagrams. Do not explain the lesson text here; only produce the figure code. You MUST return exactly one valid ```python ... ``` code block and nothing else.',
            language === 'zh'
                ? '硬性要求：只输出一个 ```python 代码块；不要输出任何解释文字；代码开头必须且只能安全导入 matplotlib.pyplot (如 import matplotlib.pyplot as plt) 和 numpy (如 import numpy as np)，不要直接使用 import matplotlib 避免路径或缺少属性的错误；必须包含 plt.savefig("/tmp/tutor-plot-auto.png", dpi=150)；不要使用 plt.show()；字符串和括号必须闭合；图必须简洁，只保留必要标签；严禁在图里放大段说明文字、顶部大文本框、长标题、规则列表；默认优先使用更小的 figsize（如 4.2x3.2、4.4x3.4、4.6x3.6，最多不超过 4.8x3.8，除非绝对必要），让图在聊天中自然嵌入，不要占满整块区域；坐标轴范围只包住必要内容；所有标签必须避开线条、轴和点，不能重叠，轴名称放边缘；使用 tight_layout(pad=0.25)。'
                : 'Hard requirements: output exactly one ```python code block; no explanatory text; at the top, safely import matplotlib.pyplot as plt and numpy as np (do not simply use "import matplotlib" to avoid attribute/path errors); include plt.savefig("/tmp/tutor-plot-auto.png", dpi=150); do not use plt.show(); all strings and parentheses must be closed; keep the figure compact with only essential labels; do NOT put long explanatory text, top text boxes, rule lists, or oversized titles inside the figure; strongly prefer a smaller figsize (like 4.2x3.2, 4.4x3.4, or 4.6x3.6, and do not exceed 4.8x3.8 unless absolutely necessary); keep axis limits tight; all labels must avoid lines, axes, and points, and must not overlap; put axis names near the edges; use tight_layout(pad=0.25).',
            language === 'zh'
                ? '图像排版与 API 强制要求：1. 严禁用 ax.text 去标记坐标轴名称，必须且只能用 ax.set_xlabel 和 ax.set_ylabel，把它们安分地放在图的边缘。 2. 避免在图中央（特别是原点附近）挤一堆字，必须要给数据点加注释时强制且必须使用 ax.annotate 并配合 xytext=(x_offset, y_offset) 和 textcoords="offset points" 来进行推离防止压盖数据点。3. 使用 `ax.spines["bottom"].set_position(("data", 0))` 和 `ax.spines["left"].set_position(("data", 0))` 让轴过原点，同时必须隐藏 top 和 right 边框 `ax.spines["top"].set_color("none")`。4. 取消或者极度缩短整体图表大主标题（ax.set_title），不得写超长说明句。5. 图内绝不允许写框型或者长句文本，只允许保留符号本身和值（例如 z=3+4j），多余解释必须丢掉。'
                : 'Figure layout and mandatory API rules: 1. NEVER use `ax.text` to label the axes "Real" or "Imag"; you MUST strictly use `ax.set_xlabel()` and `ax.set_ylabel()` to place them safely at the edges. 2. When labeling points, strictly use `ax.annotate` with `xytext=(offset_x, offset_y)` and `textcoords="offset points"` to push the text away from the data point to avoid overlap. Do not use absolute `ax.text`. 3. Set the axes to cross at the origin via `ax.spines["bottom"].set_position(("data", 0))` and `ax.spines["left"].set_position(("data", 0))`, and MUST explicitly hide the top and right spines using `.set_color("none")`. 4. Do not use long `ax.set_title` sentences; remove the title or keep it extremely short. 5. NO explanation boxes, formula boxes, or long text sentences inside the figure area; keep only math symbols (e.g. z=3+4j).',
            '',
            `Question: ${question}`,
            '',
            'Textbook context:',
            buildBookContext(bookPages),
            '',
            'Explanation plan to align with:',
            explanation
        ].join('\n');

        const diagramCode = await callOpenRouterChat({
            model: 'anthropic/claude-haiku-4.5',
            timeoutMs: 90000,
            temperature: 0.1,
            maxTokens: 1400,
            messages: [
                {
                    role: 'system',
                    content: language === 'zh'
                        ? '你现在是第二个 Sonnet 实例，专门负责绘图代码，不负责文字讲解。你的职责是生成干净、紧凑、标签不冲突的 matplotlib 教学图。'
                        : 'You are the second Sonnet instance, dedicated only to plotting code, not lesson prose. Your job is to generate clean, compact matplotlib educational figures with non-overlapping labels.'
                },
                { role: 'user', content: codePrompt }
            ]
        });

        if (/```python[\s\S]*?```/i.test(diagramCode)) {
            explanation += `\n\n${diagramCode.trim()}\n`;
        }
    } catch (err) {
        console.warn('[ASK] Sonnet diagram generation failed:', err.message);
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
            return pageNames.slice(0, 6).map(pn => ({
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
                return activeMap[parentKey].slice(0, 6).map(pn => ({
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
async function agentA_plan(sectionId, sectionTitle, bookPages, webSources, language = 'en', userProfilePrompt = '') {
    const ocrPages = bookPages.map(p => ({
        pageId: p.page,
        text: readOCRText(p.textPath, 3000)
    }));
    const existingPageImages = bookPages.map(p => p.page);
    const availableFigures = {};
    for (const p of bookPages) {
        const metaPath = path.join((p.textPath ? path.dirname(p.textPath) : OCR_DIR), `${p.page}.meta.json`);
        if (fs.existsSync(metaPath)) {
            const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
            if (meta.figures && meta.figures.length) {
                availableFigures[p.page] = meta.figures.map(f => ({ fig_id: f.fig_id, caption: f.caption }));
            }
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
                break;
            }
        }
    }

    console.log(`[Agent A] Blueprint ready — ${blueprint.blocks.length} blocks.`);
    return { raw, blueprint };
}

/**
 * Agent B — Tutor Writer (Claude Sonnet 4.6)
 * Takes the Blueprint and executes each block into final Markdown.
 * Returns a Markdown string ready for the frontend.
 */
async function agentB_execute(blueprint, bookPages, webSources, language = 'en') {
    const systemPrompt = fs.readFileSync(
        path.join(__dirname, '../tutor-materials/prompts/agent-b-tutor.md'),
        'utf8'
    );

    const existingPageImages = {};
    const availableFigures = {};   // page -> [{fig_id, caption}]
    for (const p of bookPages) {
        existingPageImages[p.page] = `/pages/${p.pageImage}`;
        // Load figure metadata for precision crop
        const metaPath = path.join((p.textPath ? path.dirname(p.textPath) : OCR_DIR), `${p.page}.meta.json`);
        if (fs.existsSync(metaPath)) {
            const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
            if (meta.figures && meta.figures.length) {
                availableFigures[p.page] = meta.figures.map(f => ({ fig_id: f.fig_id, caption: f.caption }));
            }
        }
    }

    const userMsg = JSON.stringify({
        blueprint,
        existing_page_images: existingPageImages,
        available_figures: availableFigures,
        web_sources: webSources.slice(0, 8).map((w, i) => ({
            index: i + 1,
            title: w.title,
            url: w.url,
            snippet: w.snippet || ''
        }))
    }, null, 2);

    console.log(`[Agent B] Executing ${blueprint.blocks.length} blocks…`);

    const raw = await callOpenRouterChat({
        model: AGENT_B_MODEL,
        timeoutMs: 150000,
        temperature: 0.3,
        maxTokens: 6000,
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMsg }
        ]
    });

    // Try to parse Agent B's JSON output and convert to Markdown
    const rendered = tryParseJsonLoose(raw);
    if (rendered && Array.isArray(rendered.rendered_blocks)) {
        console.log(`[Agent B] JSON OK — ${rendered.rendered_blocks.length} blocks`);
        // Auto-fill missing fig_id for book_image blocks using metadata
        rendered.rendered_blocks.forEach((b, i) => {
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
        return await blueprintToMarkdown(rendered.rendered_blocks, existingPageImages);
    }

    // Raw fallback — strip whole-page book image refs
    console.warn('[Agent B] Not JSON, raw fallback. First 400 chars:', raw.slice(0, 400));
    return raw.replace(/!\[Book page\]\(\/pages\/book-\d+\.png\)/g, '');
}

/**
 * Convert Agent B's rendered_blocks JSON → Markdown string for the frontend.
 */
async function blueprintToMarkdown(blocks, pageImages) {
    const parts = [];

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
                const sourcePage = block.source_page || '';
                const figId = block.fig_id || block.caption || '';

                // Try to find the figure in metadata for a precision crop
                const metaPath = sourcePage
                    ? (fs.existsSync(path.join(OCR_DIR_NEW, `${sourcePage}.meta.json`))
                        ? path.join(OCR_DIR_NEW, `${sourcePage}.meta.json`)
                        : path.join(OCR_DIR_OLD, `${sourcePage}.meta.json`))
                    : null;
                let cropUrl = null;
                if (metaPath && fs.existsSync(metaPath)) {
                    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
                    const figures = meta.figures || [];
                    let fig = figId ? figures.find(f => f.fig_id === figId) : null;
                    if (!fig && figId) {
                        const needle = figId.toLowerCase().replace(/\s+/g, '');
                        fig = figures.find(f => f.fig_id.toLowerCase().replace(/\s+/g, '').includes(needle));
                    }
                    if (!fig && figures.length === 1) fig = figures[0];
                    if (fig) {
                        cropUrl = fig.crop_file
                            ? `/figures/${encodeURIComponent(fig.crop_file)}`
                            : `/api/crop?page=${encodeURIComponent(sourcePage)}&fig=${encodeURIComponent(fig.fig_id)}`;
                    }
                }

                // Fallback to full page if no crop available
                const finalUrl = cropUrl || block.file_path || (pageImages && pageImages[sourcePage]) || null;
                if (finalUrl && !block.warning) {
                    const altText = figId || block.caption || 'Figure';
                    parts.push(`![${altText}](${finalUrl})`);
                    if (block.caption && block.caption !== figId) parts.push(`*${block.caption}*`);
                } else if (block.warning) {
                    parts.push(`*(Figure: ${sourcePage} — ${block.warning})*`);
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

            case 'generate_image':
                if (block.tool === 'python_matplotlib') {
                    const chartFile = `chart-${Date.now()}-${Math.random().toString(36).slice(2,7)}.png`;
                    const chartPath = path.join(GENERATED_DIR, chartFile);
                    const spec = Object.assign({}, block.python_spec || {}, { output_path: chartPath });
                    try {
                        const result = await runPython3(MATPLOTLIB_GEN, JSON.stringify(spec));
                        const parsed = JSON.parse(result);
                        if (parsed.ok) {
                            if (block.caption) parts.push(`*📊 ${block.caption}*`);
                            parts.push(`![Chart](/generated/${chartFile})`);
                        } else {
                            parts.push(`> ⚠️ Chart render failed: ${parsed.error || 'unknown'}`);
                        }
                    } catch (e) {
                        parts.push(`> ⚠️ Chart render error: ${e.message}`);
                    }
                } else if (block.tool === 'openai/gpt-5.4-image-2') {
                    const prompt = block.prompt || block.spec || (block.python_spec && block.python_spec.description) || block.reason || 'educational illustration';
                    try {
                        const imgResult = await callTutorSkillRaw(prompt);
                        const urls = (imgResult.match(/https?:\/\/[^\s)"']+\.(?:png|jpg|jpeg|webp|gif)[^\s)"']*/gi) || []);
                        if (urls.length > 0) {
                            if (block.caption) parts.push(`*🎨 ${block.caption}*`);
                            parts.push(`![Illustration](${urls[0]})`);
                        } else {
                            parts.push(`> *(Illustration generation attempted — no image returned)*`);
                        }
                    } catch (e) {
                        parts.push(`> *(Illustration unavailable: ${e.message})*`);
                    }
                }
                break;

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
    const candidates = ['cram', 'standard', 'foundation'].map(track =>
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
                const lesson = await generateSectionLesson(sectionId, sectionTitle, bookPages, [], language, profilePrompt);
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

async function generateSectionLesson(sectionId, sectionTitle, bookPages, webSources, language = 'en', userProfilePrompt = '') {
    // ── Agent A: Plan ──────────────────────────────────────────────────────────
    let blueprint = null;
    try {
        const result = await agentA_plan(sectionId, sectionTitle, bookPages, webSources, language, userProfilePrompt);
        blueprint = result.blueprint;
    } catch (err) {
        console.error('[Agent A] Error:', err.message);
    }

    // ── Fallback: if Agent A failed, generate directly with Agent B ────────────
    if (!blueprint) {
        console.warn('[Pipeline] Agent A blueprint failed — running Agent B in direct mode.');
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
        return callOpenRouterChat({
            model: AGENT_B_MODEL, timeoutMs: 120000, temperature: 0.3, maxTokens: 5000,
            messages: [
                { role: 'system', content: 'You are a patient, precise tutor for Signal Processing and Linear Systems. Explain everything from scratch.' },
                { role: 'user', content: prompt }
            ]
        });
    }

    // ── Agent B: Execute ───────────────────────────────────────────────────────
    return agentB_execute(blueprint, bookPages, webSources, language);
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
        const child = spawn('python3', [scriptPath, arg], {
            env: process.env,
            stdio: ['ignore', 'pipe', 'pipe']
        });
        let stdout = '';
        let stderr = '';
        const timer = setTimeout(() => { child.kill('SIGKILL'); reject(new Error('python3 timeout')); }, timeoutMs);
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
        const timeoutMs = 90000;
        const maxOutputBytes = 12 * 1024 * 1024;

        const child = spawn('/usr/local/bin/python3', [SKILL_SCRIPT, prompt], {
            env: process.env,
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

            if (timedOut) return reject(new Error('Request timeout (90s)'));
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
                    const normalizedCachedLesson = convertLegacyQuickCheckToKcBlocks(cachedLesson);
                    if (normalizedCachedLesson !== cachedLesson && profileMemory) {
                        writeLessonCache(sectionId, profileMemory, normalizedCachedLesson, data.bookSource);
                    }
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

                // Lesson generation should be textbook-first. Passing [] means: do NOT search the web.
                let webSources;
                if (Array.isArray(data.webSources)) {
                    webSources = data.webSources;  // use as-is (can be [])
                } else {
                    webSources = [];
                }
                console.log(`[SECTION] Starting dual-agent pipeline for ${sectionId} (lang=${language}, uid=${uid}, book=${data.bookSource || 'old'}, web=${webSources.length ? 'on' : 'off'})…`);
                let lesson = await generateSectionLesson(sectionId, sectionTitle, rawPages, webSources, language, userProfilePrompt);
                lesson = convertLegacyQuickCheckToKcBlocks(lesson);
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
