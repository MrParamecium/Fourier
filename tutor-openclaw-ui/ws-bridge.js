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

const OCR_DIR = '/Users/chenghaoxiang/.openclaw/workspace/tutor-materials/background-ocr-v3';
const PAGE_IMAGE_DIR = '/Users/chenghaoxiang/.openclaw/workspace/tutor-materials/background-pages-split';
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
function loadSectionPageMap() {
    const mapPath = path.join(__dirname, 'section-page-map.json');
    try {
        return JSON.parse(fs.readFileSync(mapPath, 'utf8'));
    } catch (e) {
        console.warn('[Index] section-page-map.json not found, falling back to metadata search');
        return {};
    }
}
const SECTION_PAGE_MAP = loadSectionPageMap();
console.log(`[Index] Section map loaded: ${Object.keys(SECTION_PAGE_MAP).length} sections`);

function serveStaticFile(res, filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Not found');
            return;
        }

        res.writeHead(200, { 'Content-Type': contentType });
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

function selectRelevantBooks(question, keywords, minCount = 3, maxCount = 5) {
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
        '6. 如果出现数学公式，使用 LaTeX，块级公式写成 $$...$$。',
        '7. 优先结合教材，再补充联网资料。',
        '8. 如果联网资料为空，也照常基于书页完成讲解。',
        '9. 结尾加一个“来源列表”小节，列出所有实际引用到的来源。'
    ].filter(Boolean).join('\n');

    return callOpenRouterChat({
        model: 'anthropic/claude-opus-4.6',
        timeoutMs: 120000,
        temperature: 0.35,
        maxTokens: 3200,
        messages: [
            {
                role: 'system',
                content: '你是一位耐心、准确、会讲人话的理工科导师。请基于给定教材 OCR、网页摘要和已有对话上下文生成结构化讲解，不要编造未给出的参考文献。对于 follow-up 问题，必须延续上下文。'
            },
            {
                role: 'user',
                content: prompt
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

function getPagesForSection(sectionId) {
    const code = extractSectionCode(sectionId);
    if (!code) return [];

    // 优先用 section-page-map.json（由 OCR 文本扫描生成，最准确）
    const codeUpper = code.toUpperCase().replace(/^([a-z])/, c => c.toUpperCase());
    // 尝试小写和大写
    const mapKey = Object.keys(SECTION_PAGE_MAP).find(
        k => k.toLowerCase() === code || k.toLowerCase() === codeUpper.toLowerCase()
    );
    if (mapKey) {
        const pageNames = SECTION_PAGE_MAP[mapKey];
        const pages = pageNames.map(pn => BOOK_INDEX.find(e => e.page === pn)).filter(Boolean);
        if (pages.length > 0) return pages;
    }

    // 回退父节：1.2-2 → 1.2
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

    // 最后回退：用旧的 metadata 匹配逻辑
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
async function generateSectionIntro(sectionId, sectionTitle, bookPages) {
    const ocrSnippets = bookPages.slice(0, 3).map((p, i) => {
        const txt = readOCRText(p.textPath, 1200);
        return `[书页${i+1}]\n${txt}`;
    }).join('\n\n');

    const prompt = [
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
    ].join('\n');

    return callOpenRouterChat({
        model: 'anthropic/claude-sonnet-4.6',
        timeoutMs: 30000,
        temperature: 0.3,
        maxTokens: 200,
        messages: [
            { role: 'system', content: '你是一位理工科教师，擅长用简单语言介绍知识点。' },
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
async function agentA_plan(sectionId, sectionTitle, bookPages, webSources, language = 'en') {
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
    for (const p of bookPages) {
        // full page
        existingPageImages[p.page] = `/pages/${p.pageImage}`;
        // half-page splits if they exist
        const leftFile = `${p.page}-left.png`;
        const rightFile = `${p.page}-right.png`;
        if (fs.existsSync(path.join(PAGE_IMAGE_DIR, leftFile))) {
            existingPageImages[`${p.page}-left`] = `/pages/${leftFile}`;
        }
        if (fs.existsSync(path.join(PAGE_IMAGE_DIR, rightFile))) {
            existingPageImages[`${p.page}-right`] = `/pages/${rightFile}`;
        }
    }

    const userMsg = JSON.stringify({
        blueprint,
        existing_page_images: existingPageImages,
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
        return await blueprintToMarkdown(rendered.rendered_blocks, existingPageImages);
    }

    // If not valid JSON, return raw (it may already be Markdown)
    console.warn('[Agent B] Output was not JSON — using raw text as Markdown.');
    return raw;
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
                const imgPath = block.file_path || (pageImages && pageImages[block.source_page]) || null;
                if (imgPath && !block.warning) {
                    parts.push(`![Book page](${imgPath})`);
                    if (block.caption) parts.push(`*${block.caption}*`);
                } else {
                    parts.push(`*(Book image: ${block.source_page || 'unknown'} — ${block.warning || 'not available'})*`);
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
async function generateSectionLesson(sectionId, sectionTitle, bookPages, webSources, language = 'en') {
    // ── Agent A: Plan ──────────────────────────────────────────────────────────
    let blueprint = null;
    try {
        const result = await agentA_plan(sectionId, sectionTitle, bookPages, webSources, language);
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


    if (pathname === '/api/section' && req.method === 'POST') {
        try {
            const data = await readJsonBody(req);
            const sectionId = compactWhitespace(data.sectionId || '');
            const sectionTitle = compactWhitespace(data.sectionTitle || sectionId);
            const mode = data.mode || 'intro'; // 'intro' | 'lesson'
            const language = (data.language === 'zh') ? 'zh' : 'en'; // default EN

            if (!sectionId) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Missing sectionId' }));
                return;
            }

            console.log(`[SECTION] sectionId=${sectionId} mode=${mode}`);
            const rawPages = getPagesForSection(sectionId);
            const bookPages = rawPages.map(item => ({
                ...item,
                image: `/pages/${item.pageImage}`
            }));

            if (mode === 'intro') {
                const intro = await generateSectionIntro(sectionId, sectionTitle, rawPages);
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
                const searchAngles = [`${sectionTitle} signal processing explained`, `${sectionTitle} linear systems tutorial`];
                const webSources = await collectWebSources(searchAngles);
                console.log(`[SECTION] Starting dual-agent pipeline for ${sectionId} (lang=${language})…`);
                const lesson = await generateSectionLesson(sectionId, sectionTitle, rawPages, webSources, language);
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
                    textPath: path.join(OCR_DIR, `${item.page}.txt`),
                    ocrText: readOCRText(path.join(OCR_DIR, `${item.page}.txt`), 5500)
                }));
            } else if (sectionId || sectionTitle) {
                relatedBooks = getPagesForSection(sectionId || sectionTitle).slice(0, 5).map(item => ({
                    ...item,
                    ocrText: readOCRText(item.textPath, 5500)
                }));
            } else {
                const keywords = await extractKeywords(question);
                relatedBooks = selectRelevantBooks(question, keywords, 3, 5).map(item => ({
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
                mode
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
        serveStaticFromDir(res, PAGE_IMAGE_DIR, filename);
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
