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
try { if (!fs.existsSync(LESSON_CACHE_DIR)) fs.mkdirSync(LESSON_CACHE_DIR, { recursive: true }); } catch (_) {}

/**
 * Returns cached lesson markdown or null.
 * Cache key = sectionId (dots→underscores) / <goal>|<math>|<timeline>.en.md
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

function readLessonCache(sectionId, memory) {
    if (!memory || !memory.quiz) return null;
    const q = memory.quiz;
    if (!q.goal || !q.math || !q.timeline) return null;
    const key = `${q.goal}|${q.math}|${q.timeline}`;
    const normId = normalizeSectionId(sectionId);
    const dir = path.join(LESSON_CACHE_DIR, normId);
    const file = path.join(dir, `${key}.en.md`);
    console.log(`[LessonCache] lookup: ${sectionId} → ${normId} / ${key}`);
    if (!fs.existsSync(file)) return null;
    try {
        const content = fs.readFileSync(file, 'utf8');
        console.log(`[LessonCache] HIT: ${normId} / ${key}`);
        return content;
    } catch (_) { return null; }
}

function writeLessonCache(sectionId, memory, lesson) {
    if (!memory || !memory.quiz) return;
    const q = memory.quiz;
    if (!q.goal || !q.math || !q.timeline) return;
    const key = `${q.goal}|${q.math}|${q.timeline}`;
    const normId = normalizeSectionId(sectionId);
    const dir = path.join(LESSON_CACHE_DIR, normId);
    try {
        fs.mkdirSync(dir, { recursive: true });
        const file = path.join(dir, `${key}.en.md`);
        fs.writeFileSync(file, lesson, 'utf8');
        console.log(`[LessonCache] SAVED: ${normId} / ${key}`);
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
        return JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch (_) {
        return null;
    }
}

function writeUserMemory(uid, data) {
    const p = getUserMemoryPath(uid);
    if (!p) return;
    fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
}

/**
 * Build a concise prompt injection string from user memory.
 * This gets prepended to system prompts for lesson/ask calls.
 */
function buildUserProfilePrompt(memory) {
    if (!memory) return '';
    const lines = [];
    const quiz = memory.quiz || {};

    const GOAL_MAP = {
        just_pass:   'Student goal: just pass (C or above). Be concise and exam-focused.',
        solid_b:     'Student goal: solid B/B+. Balance depth and exam prep.',
        going_for_a: 'Student goal: A grade. Provide rigorous explanations with full derivations.',
        getting_ahead: 'Student is previewing — assume zero prior exposure. Start from scratch.'
    };
    const MATH_MAP = {
        all_solid:     'Math background: strong (calculus, ODEs, complex numbers). Use freely.',
        calculus_ok:   'Math background: calculus OK but ODEs/complex numbers shaky. Briefly revisit before using.',
        math_weak:     'Math background: weak. Avoid heavy derivations. Use intuition and diagrams first.'
    };
    const STYLE_MAP = {
        example_first:  'Learning style: example first. Always lead with a concrete example before the general rule.',
        principle_first:'Learning style: principle first. State concept clearly, then illustrate.',
        visual:         'Learning style: visual. Prioritize diagrams, sketches, and visual analogies.',
        step_by_step:   'Learning style: step-by-step. Never skip steps. Explain every line explicitly.'
    };
    const TIMELINE_MAP = {
        midterm_week: 'PRIORITY MODE — midterm in < 1 week. Focus only on high-frequency exam topics. Be very concise.',
        final_week:   'EXAM CRUNCH — final in < 1 week. Cover all testable material efficiently. No fluff.',
        few_weeks:    'A few weeks until exam. Moderate pace. Cover key concepts with 1-2 practice problems.',
        keeping_up:   'Keeping up with lectures. Normal pace. Full explanation with extensions.',
        self_study:   'Self-studying with no exam pressure. Go deep, explore connections.'
    };
    const STRUGGLE_MAP = {
        too_many_formulas: 'Historical struggle: too many formulas. Always explain where formulas come from — never just state them.',
        too_abstract:      'Historical struggle: concepts feel abstract. Always connect to real-world application or physical meaning.',
        cant_do_problems:  'Historical struggle: understands but cannot do problems. After each concept, show a fully worked example.',
        mostly_lazy:       'Student is self-aware about motivation. Keep sections short and punchy. Show the payoff early.'
    };
    const OUTCOME_MAP = {
        one_liner:      'End each section with a one-liner core takeaway summary.',
        worked_example: 'Always include at least one fully worked example with complete step-by-step solution.',
        exam_cheatsheet:'End each section with a bullet-point exam cheat-sheet: key facts and likely exam question types.',
        formula_ref:    'Include a concise formula reference box at the end of each explanation.'
    };

    if (GOAL_MAP[quiz.goal])         lines.push(GOAL_MAP[quiz.goal]);
    if (MATH_MAP[quiz.math])         lines.push(MATH_MAP[quiz.math]);
    if (TIMELINE_MAP[quiz.timeline]) lines.push(TIMELINE_MAP[quiz.timeline]);
    if (STRUGGLE_MAP[quiz.struggle]) lines.push(STRUGGLE_MAP[quiz.struggle]);

    // style: may be a single string (old) or array (multi-select)
    const styles = Array.isArray(quiz.style) ? quiz.style : (quiz.style ? [quiz.style] : []);
    // also check dynamically inferred style updates stored in memory.inferredStyle
    const allStyles = [...new Set([...styles, ...(Array.isArray(memory.inferredStyle) ? memory.inferredStyle : [])])];
    allStyles.forEach(s => { if (STYLE_MAP[s]) lines.push(STYLE_MAP[s]); });

    // outcome: may be array (multi-select)
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
    return `\n\n[Student Profile]\n${lines.join('\n')}`;
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

async function generateSearchAngles(question) {
    try {
        const text = await callOpenRouterChat({
            model: 'openai/gpt-5.4',
            timeoutMs: 30000,
            temperature: 0.1,
            maxTokens: 220,
            messages: [
                {
                    role: 'system',
                    content: 'Generate exactly 3 short English web search queries for learning research. Return a strict JSON array of strings only. No markdown.'
                },
                {
                    role: 'user',
                    content: `Question: ${question}`
                }
            ]
        });

        const parsed = tryParseJsonLoose(text);
        if (Array.isArray(parsed)) {
            const queries = uniqueStrings(parsed, 3);
            if (queries.length) return queries;
        }
    } catch (err) {
        console.warn('[Search] Search-angle fallback:', err.message);
    }

    return uniqueStrings([
        `${question} explained`,
        `${question} tutorial`,
        `${question} worked example`
    ], 3);
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
            domain
        };
    });
}

async function collectWebSources(searchAngles) {
    const merged = [];
    const seen = new Set();

    for (const angle of searchAngles) {
        const items = await duckDuckGoSearch(angle);
        for (const item of items) {
            const key = normalizeUrl(item.url).toLowerCase();
            if (!key || seen.has(key)) continue;
            seen.add(key);
            merged.push(item);
            if (merged.length >= 15) break;
        }
        if (merged.length >= 15) break;
    }

    return enrichSources(merged.slice(0, 12));
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
        language === 'zh' ? '1. 用中文回答，适合初学者。' : '1. Answer in clear beginner-friendly English.',
        '2. 用 Markdown 输出。',
        '3. 如果这是继续追问，必须优先承接上文，不要把它当成全新的陌生问题。',
        '4. 如果用户用了代词（比如“这个”“刚才那个”“q1”），优先根据历史对话和当前讲解内容解析指代。',
        '5. 引用时只使用 [书页N] / [来源N] 这样的标注。',
        '6. 如果出现数学公式，使用 LaTeX，块级公式写成 $$...$$，行内公式写成 $...$。',
        '7. 需要表格时必须用标准 Markdown 表格语法（| 列 | 列 | 换行 |---|---| 换行 | 值 | 值 |），禁止用 ASCII 字符堆砌，表格内数学符号用 $...$ 包裹。',
        '8. 优先结合教材，再补充联网资料。',
        '9. 如果联网资料为空，也照常基于书页完成讲解。',
        '10. 结尾加一个“来源列表”小节，列出所有实际引用到的来源。'
    ].filter(Boolean).join('\n');

    // Build user message content — supports multimodal (text + images)
    let userContent;
    const imageAttachments = attachments.filter(a => a.type === 'image' && a.dataUrl);
    const pdfAttachments = attachments.filter(a => a.type === 'pdf' && a.dataUrl);

    // Append PDF content as text
    let pdfContext = '';
    for (const pdf of pdfAttachments) {
        const base64 = pdf.dataUrl.split(',')[1] || '';
        pdfContext += `\n\n[Attached document: ${pdf.name}]\n(PDF content will be analyzed by the model)\n`;
    }

    if (imageAttachments.length > 0) {
        // Multimodal message
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

    return callOpenRouterChat({
        model: 'anthropic/claude-sonnet-4.6',
        timeoutMs: 120000,
        temperature: 0.35,
        maxTokens: 3200,
        messages: [
            {
                role: 'system',
                content: language === 'zh'
                    ? '你是一位耐心、准确、会讲人话的理工科导师。请基于给定教材 OCR、网页摘要和已有对话上下文生成结构化讲解，不要编造未给出的参考文献。对于 follow-up 问题，必须延续上下文。' + userProfilePrompt
                    : 'You are a patient, accurate, and approachable STEM tutor. Generate structured explanations based on the given textbook OCR, web summaries, and conversation history. Do not fabricate references not provided. For follow-up questions, always continue from the existing context. Always respond in English.' + userProfilePrompt
            },
            {
                role: 'user',
                content: userContent
            }
        ]
    });
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
        model: 'anthropic/claude-sonnet-4.6',
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
// Agent A (Planner):  gemini-3.1-pro-preview  — produces Rendering Blueprint JSON
// Agent B (Executor): claude-sonnet-4.6        — executes each block into final MD
// ─────────────────────────────────────────────────────────────────────────────

const AGENT_A_MODEL = 'google/gemini-3.1-pro-preview';
const AGENT_B_MODEL = 'anthropic/claude-sonnet-4.6';

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
        const metaPath = path.join(OCR_DIR, `${p.page}.meta.json`);
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
        rendered.rendered_blocks.forEach((b, i) => {
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
                const metaPath = sourcePage ? path.join(OCR_DIR, `${sourcePage}.meta.json`) : null;
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
                        cropUrl = `/api/crop?page=${encodeURIComponent(sourcePage)}&fig=${encodeURIComponent(fig.fig_id)}`;
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
                } else if (block.tool === 'nano_banana2') {
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

            case 'knowledge_check':
                parts.push(`---\n**✏️ Quick Check**\n\n${block.question}\n\n<details><summary>Show answer</summary>\n\n**Answer:** ${block.answer}\n\n${block.hint ? `*Hint: ${block.hint}*` : ''}\n\n</details>`);
                break;

            case 'section_summary':
                parts.push('---\n**📌 Key Takeaways**');
                if (Array.isArray(block.bullets)) {
                    block.bullets.forEach(b => parts.push(`- ${b}`));
                }
                if (block.transition) parts.push(`\n*${block.transition}*`);
                break;

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
            'Use Markdown. LaTeX for math ($$...$$). End with 1-2 quick-check questions.'
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
        model: 'anthropic/claude-sonnet-4.6',
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
                if (data.quiz) existing.quiz = Object.assign({}, existing.quiz || {}, data.quiz);
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

    if (pathname === '/api/section' && req.method === 'POST') {
        try {
            const data = await readJsonBody(req);
            const sectionId = compactWhitespace(data.sectionId || '');
            const sectionTitle = compactWhitespace(data.sectionTitle || sectionId);
            const mode = data.mode || 'intro'; // 'intro' | 'lesson'
            const language = (data.language === 'zh') ? 'zh' : 'en'; // default EN
            const uid = data.uid || null;
            const userMemory = uid ? readUserMemory(uid) : null;
            // profileMemory: prefer uid-based memory; fall back to inline profileOverride
            const profileMemory = userMemory
                || (data.profileOverride ? { quiz: data.profileOverride } : null);
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
                const cachedLesson = readLessonCache(sectionId, profileMemory);
                if (cachedLesson) {
                    console.log(`[SECTION] Cache hit for ${sectionId}, skipping pipeline.`);
                    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({
                        sectionId, sectionTitle,
                        lesson: cachedLesson,
                        cached: true,
                        bookPages: bookPages.map(p => ({
                            page: p.page, image: p.image,
                            subsection: p.subsection, title: p.title, summary: p.summary
                        })),
                        webSources: []
                    }));
                    return;
                }

                // Allow caller to pass webSources directly (empty = skip search, e.g. pre-generation)
                let webSources;
                if (Array.isArray(data.webSources)) {
                    webSources = data.webSources;  // use as-is (can be [])
                } else {
                    const searchAngles = [`${sectionTitle} signal processing explained`, `${sectionTitle} linear systems tutorial`];
                    webSources = await collectWebSources(searchAngles);
                }
                console.log(`[SECTION] Starting dual-agent pipeline for ${sectionId} (lang=${language}, uid=${uid})…`);
                const lesson = await generateSectionLesson(sectionId, sectionTitle, rawPages, webSources, language, userProfilePrompt);
                // ── Auto-save to lesson cache ───────────────────────────────
                if (lesson && profileMemory) {
                    writeLessonCache(sectionId, profileMemory, lesson);
                }
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
                    webSources
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
            if (!webSources.length && mode !== 'followup') {
                searchAngles = await generateSearchAngles(question);
                webSources = await collectWebSources(searchAngles);
            }

            const explanation = await generateExplanation(question, relatedBooks, webSources, {
                history,
                sectionTitle: sectionTitle || sectionId,
                lessonContext,
                language,
                mode,
                userProfilePrompt,
                attachments
            });

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
                steps: [
                    `✅ 找到 ${relatedBooks.length} 个相关书页`,
                    `✅ 搜索到 ${webSources.length} 个网页来源`,
                    '✅ Claude Opus 讲解生成完毕'
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
