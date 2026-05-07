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

function loadLocalEnvFile() {
    try {
        const envPath = path.join(__dirname, '.env');
        if (!fs.existsSync(envPath)) return;
        const raw = fs.readFileSync(envPath, 'utf8');
        raw.split(/\r?\n/).forEach((line) => {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) return;
            const eqIndex = trimmed.indexOf('=');
            if (eqIndex === -1) return;
            const key = trimmed.slice(0, eqIndex).trim();
            if (!key || process.env[key]) return;
            let value = trimmed.slice(eqIndex + 1).trim();
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            process.env[key] = value;
        });
    } catch (err) {
        console.warn('[env] failed to load local .env:', err.message);
    }
}

loadLocalEnvFile();

const HTTP_PORT = process.env.PORT || 9000;
const APP_NAME = 'Tutor Agent';
const APP_URL = `http://localhost:${HTTP_PORT}`;

function resolveExistingDir(candidates, label, validator = null) {
    for (const candidate of candidates) {
        if (!candidate || !fs.existsSync(candidate)) continue;
        if (typeof validator === 'function' && !validator(candidate)) continue;
        return candidate;
    }
    throw new Error(`[PathConfig] Missing ${label}. Tried: ${candidates.join(', ')}`);
}

const PROJECT_ROOT = path.resolve(__dirname, '..');
const TUTOR_MATERIALS_DIR = resolveExistingDir([
    path.join(PROJECT_ROOT, 'workspace_tutor_related_full', 'tutor-materials'),
    path.join(PROJECT_ROOT, 'tutor-materials')
], 'tutor-materials directory', (candidate) => {
    return fs.existsSync(path.join(candidate, 'background-ocr-v3'))
        || fs.existsSync(path.join(candidate, 'new-book-ocr'));
});

const OCR_DIR_OLD = path.join(TUTOR_MATERIALS_DIR, 'background-ocr-v3');
const PAGE_IMAGE_DIR_OLD = path.join(TUTOR_MATERIALS_DIR, 'background-pages-split');
const OCR_DIR_NEW = path.join(TUTOR_MATERIALS_DIR, 'new-book-ocr');
const PAGE_IMAGE_DIR_NEW = path.join(TUTOR_MATERIALS_DIR, 'new-book-pages');
const FIGURE_IMAGE_DIR_NEW = path.join(TUTOR_MATERIALS_DIR, 'new-book-figures');
const PYTHON_BIN = process.env.TUTOR_PYTHON_BIN || '/Library/Frameworks/Python.framework/Versions/3.12/bin/python3';

// Helper: resolve dirs based on bookSource param
function getBookDirs(bookSource) {
    if (bookSource === 'new') {
        return { ocrDir: OCR_DIR_NEW, pageImageDir: PAGE_IMAGE_DIR_NEW };
    }
    return { ocrDir: OCR_DIR_OLD, pageImageDir: PAGE_IMAGE_DIR_OLD };
}

function getPageImageUrl(bookSource, pageImage) {
    const filename = path.basename(String(pageImage || ''));
    if (!filename) return '';
    return bookSource === 'new'
        ? `/new-pages/${filename}`
        : `/old-pages/${filename}`;
}

// Default (backward compat)
const OCR_DIR = OCR_DIR_OLD;
const PAGE_IMAGE_DIR = PAGE_IMAGE_DIR_OLD;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

function getOpenAIKey() {
    loadLocalEnvFile();
    return process.env.OPENAI_API_KEY || '';
}

function getOpenRouterKey() {
    loadLocalEnvFile();
    return process.env.OPENROUTER_API_KEY || '';
}

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
const DEBUG_DIR = path.join(__dirname, 'debug');
try { if (!fs.existsSync(DEBUG_DIR)) fs.mkdirSync(DEBUG_DIR, { recursive: true }); } catch (_) {}

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

function writeDebugFile(filename, content) {
    try {
        fs.writeFileSync(path.join(DEBUG_DIR, filename), String(content || ''), 'utf8');
    } catch (err) {
        console.warn('[debug] failed to write debug file:', filename, err.message);
    }
}

function formatAgentABlockForPreview(block, index) {
    if (!block || typeof block !== 'object') return `### Block ${index + 1}\n\nInvalid block\n`;
    const lines = [`### Block ${index + 1}: \`${block.type || 'unknown'}\``];
    const entries = Object.entries(block).filter(([key]) => key !== 'type');
    for (const [key, value] of entries) {
        if (value == null || value === '') continue;
        if (typeof value === 'string') {
            lines.push(`- **${key}**: ${value}`);
            continue;
        }
        lines.push(`- **${key}**:`);
        lines.push('```json');
        lines.push(JSON.stringify(value, null, 2));
        lines.push('```');
    }
    return `${lines.join('\n')}\n`;
}

function buildAgentAPreviewMarkdown(blueprint, raw = '') {
    if (!blueprint || typeof blueprint !== 'object') return raw || '';
    const lines = [
        `# Agent A Preview: ${blueprint.section_id || ''} ${blueprint.section_title || ''}`.trim(),
        '',
        `- Difficulty: ${blueprint.difficulty || 'unknown'}`,
        `- Estimated read minutes: ${blueprint.estimated_read_minutes || 'unknown'}`,
        ''
    ];

    if (Array.isArray(blueprint.learning_objectives) && blueprint.learning_objectives.length) {
        lines.push('## Learning Objectives', '');
        blueprint.learning_objectives.forEach((item) => lines.push(`- ${item}`));
        lines.push('');
    }

    if (blueprint.visualization_need) {
        lines.push('## Visualization Need', '', '```json', JSON.stringify(blueprint.visualization_need, null, 2), '```', '');
    }

    if (blueprint.visual_plan) {
        lines.push('## Visual Plan', '', '```json', JSON.stringify(blueprint.visual_plan, null, 2), '```', '');
    }

    if (Array.isArray(blueprint.blocks) && blueprint.blocks.length) {
        lines.push('## Planned Blocks', '');
        blueprint.blocks.forEach((block, index) => {
            lines.push(formatAgentABlockForPreview(block, index));
        });
    }

    if (raw) {
        lines.push('## Raw JSON', '', '```json', raw, '```', '');
    }

    return lines.join('\n');
}

function hasStudentFacingVisualBlock(blueprint) {
    if (!blueprint || !Array.isArray(blueprint.blocks)) return false;
    return blueprint.blocks.some((block) => {
        const type = String(block && block.type || '');
        return type === 'book_image' || type === 'web_search_image' || type === 'generate_image' || type === 'interactive_demo';
    });
}

function normalizeVisualPurposeKey(value = '') {
    return compactWhitespace(String(value || ''))
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();
}

function getVisualPurposeKey(block = null) {
    if (!block || typeof block !== 'object') return '';
    const candidates = [
        block.purpose,
        block.reason,
        block.search_query,
        block.prompt,
        block.caption_instruction,
        block.caption,
        block.explanation_instruction,
        block.instruction,
        block.title
    ];
    for (const candidate of candidates) {
        const key = normalizeVisualPurposeKey(candidate);
        if (key) return key;
    }
    return '';
}

function isReadyMadeImageVisualBlock(block = null) {
    const type = String(block && block.type || '');
    return type === 'book_image' || type === 'web_search_image';
}

function buildComplexPlaneInteractiveDemoBlock(sectionId = '', sectionTitle = '') {
    return {
        type: 'interactive_demo',
        title: 'Drag the complex number',
        content: 'Move the real and imaginary components. Watch the same point become rectangular form, magnitude, and angle.',
        explanation: 'This demo links coordinates to polar form and quadrant-safe phase.',
        teaching_role: 'interactive_demo',
        mode_specific_visual_use: {
            cram: 'Use it to recognize the conversion pattern quickly.',
            standard: 'Use it to connect \(a\), \(b\), \(r\), and \(\theta\).',
            top_score: 'Use it to catch quadrant and sign mistakes.'
        },
        demo_spec: {
            framework: 'react_canvas',
            panels: [
                { id: 'phasor_panel', title: 'Complex plane' },
                { id: 'wave_panel', title: 'Equivalent phase view' }
            ],
            controls: [
                { id: 'slider_a', label: 'a', min: -5, max: 5, step: 0.1, default: 3 },
                { id: 'slider_b', label: 'b', min: -5, max: 5, step: 0.1, default: 4 },
                { id: 'angle_toggle', label: 'angle units', options: ['degrees', 'radians'], default: 'degrees' },
                { id: 'reset_demo', label: 'Reset', action: 'set defaults' }
            ]
        },
        section_id: sectionId,
        section_title: sectionTitle
    };
}

function ensureRequiredInteractiveDemoBlocks(blueprint, sectionId = '', sectionTitle = '') {
    if (!blueprint || !Array.isArray(blueprint.blocks)) return blueprint;
    const sid = compactWhitespace(sectionId || blueprint.section_id || '').toLowerCase();
    const title = compactWhitespace(sectionTitle || blueprint.section_title || '').toLowerCase();
    const needsComplexPlaneDemo = sid === 'b.1-2'
        || /complex numbers|complex plane|polar|exponential form|phasor/.test(title);
    if (!needsComplexPlaneDemo) return blueprint;

    const hasInteractiveDemo = blueprint.blocks.some((block) => String(block && block.type || '') === 'interactive_demo');
    if (hasInteractiveDemo) return blueprint;

    const insertAt = Math.min(blueprint.blocks.length, Math.max(2, blueprint.blocks.findIndex(b => String(b && b.type || '') === 'section_summary')));
    const block = buildComplexPlaneInteractiveDemoBlock(sectionId, sectionTitle);
    if (insertAt >= 2 && insertAt < blueprint.blocks.length) blueprint.blocks.splice(insertAt, 0, block);
    else blueprint.blocks.splice(Math.min(blueprint.blocks.length, 4), 0, block);

    if (!blueprint.visual_plan) blueprint.visual_plan = {};
    blueprint.visual_plan.primary_anchor = blueprint.visual_plan.primary_anchor || 'both';
    blueprint.visual_plan.rationale = blueprint.visual_plan.rationale || 'Use textbook figures and an interactive complex-plane demo so formulas stay tied to geometry.';
    return blueprint;
}

function pruneForbiddenGenerateImageBlocks(blueprint) {
    if (!blueprint || !Array.isArray(blueprint.blocks)) return blueprint;

    const seenReadyMadeImagePurposes = new Set();
    for (const block of blueprint.blocks) {
        if (!isReadyMadeImageVisualBlock(block)) continue;
        const key = getVisualPurposeKey(block);
        if (key) seenReadyMadeImagePurposes.add(key);
    }

    let hasBookImage = blueprint.blocks.some(block => String(block && block.type || '') === 'book_image');
    let hasWebSearchImage = blueprint.blocks.some(block => String(block && block.type || '') === 'web_search_image');

    blueprint.blocks = blueprint.blocks.filter((block) => {
        if (!block || block.type !== 'generate_image') return true;

        const key = getVisualPurposeKey(block);
        const duplicatedPurpose = key && seenReadyMadeImagePurposes.has(key);
        const readyMadeImageAlternativeExists = duplicatedPurpose || hasBookImage || hasWebSearchImage;
        if (!readyMadeImageAlternativeExists) return true;

        console.log(`[Agent A] Pruned forbidden generate_image block for ${blueprint.section_id || 'unknown'} because a ready-made image asset already exists.`);
        return false;
    });

    if (blueprint.visual_plan && blueprint.visual_plan.primary_anchor === 'generated_image') {
        if (hasBookImage) blueprint.visual_plan.primary_anchor = 'book_figure';
        else if (hasWebSearchImage) blueprint.visual_plan.primary_anchor = 'wiki_reference';
    }

    return blueprint;
}

function compactWhitespace(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
}

const LESSON_GENERATION_RULES_TEXT = `
NON-NEGOTIABLE LESSON RULES:
1. The first lesson page must be minimal. It may contain only:
   - one short "Section Objective"
   - one short concept list for "Concepts In This Section"
   Do NOT add expanded introductory paragraphs, long background explanation, or multiple overview sections on the first page.
   In "Concepts In This Section", list concept names only, not explanations. Good examples: "zero matrix", "diagonal matrix", "identity matrix", "transpose". Bad examples: "diagonal means off-diagonal entries are zero".
2. If a section introduces two distinct concepts that students must not confuse (for example diagonal matrix vs identity matrix), do NOT merge them into one visual explanation block. Split them into separate concept blocks and give each concept its own dedicated visual/example.
3. For abstract definition pages, do not stop at the definition alone. Add one minimal concrete example immediately after the definition, before exam tips or triggers.
4. Keep every page focused on exactly one major knowledge point. One page, one main idea, one clear reading path.
5. Visuals should help distinction, not decoration. When two concepts differ by a subtle condition, the visuals must make that difference explicit.
6. GPTImage2 is a last-resort visual tool only. Prefer, in order:
   - textbook figure when available
   - Wikipedia / Wikimedia reference image when it accurately demonstrates the concept
   - LaTeX / equation-native visual when the concept is best shown through clean symbolic structure
   - interactive demo when the concept depends on manipulation, variation, or parameter change
   Use GPTImage2 only if those options cannot accurately demonstrate the idea.
7. If GPTImage2 is used, one image must teach exactly one knowledge point. Do not combine multiple concepts, multiple subtopics, or a collage of ideas into one teaching image.
8. Whenever a lesson is regenerated or rewritten, regenerate the quiz_plan too. Never keep an old quiz block attached to a newly rewritten lesson body. The assessment must match the latest explanation pages and concept ordering.
9. Never substitute a manually written low-quality draft, shortcut cache edit, or partial fallback as if it were the standard Agent A -> Agent B generated lesson. If the normal generation chain fails, is bypassed, or produces unusable output, report that failure explicitly instead of pretending a hand-written substitute is the proper generated result.
10. If Agent A fails, stop the generation chain immediately and surface the Agent A failure to the user. Do not continue into fallback blueprint synthesis, external blueprint loading, or Agent B execution after an Agent A failure.
11. If a ready-made image asset is available for a knowledge point — textbook figure or Wikipedia/Wikimedia reference image — then GPTImage2 / generate_image is forbidden for that knowledge point. Do not use GPTImage2 as a cleaner remake, stylistic replacement, or duplicated version of an already-available image asset.
12. Every section summary under "📌 Key Takeaways" must include the section's core formulas explicitly. Do not summarize formulas away into prose only. Preserve the key equations, identities, conversions, or symbolic rules that a student would need for review.
13. Do not create a formula dump page. Never group all section formulas at the top and then explain them later. Each key formula must appear concept-local: short context first, then a standalone display LaTeX formula, then symbol meaning / use case / exam trigger / common misuse.
13a. Display formulas must use the B.2-1 lecture-note style: large, centered, one readable equation per display block. Do not output aligned/gathered environments or \\[4pt] chains for ordinary formula lists; split them into separate display blocks so no horizontal scrolling is needed.
14. "Concise" means no filler, not no teaching. Each major knowledge page must still contain enough explanation to learn from: normally 80-160 words of supporting explanation around the formula, plus at least one minimal example, near-miss, or trap when the concept is exam-relevant.
15. Textbook-numbered equations such as "(B.16)" are high-priority formula signals. If OCR shows an equation label like (B.16), treat that equation as a likely key formula: preserve the label when useful, teach it locally, and consider it for the final summary.
16. Key Takeaways must be complete but selective: include all numbered/canonical/exam-trigger formulas and core conceptual conclusions, but exclude worked-example intermediate calculations and low-value algebra steps.
`;

const VISUAL_SELECTION_DECISION_LADDER = `
VISUAL SELECTION DECISION LADDER:
A. Use a textbook figure first when the book already contains the canonical diagram, notation, or exam-facing representation the student is expected to recognize.
B. Use Wikipedia / Wikimedia reference images when the concept is best explained by a real canonical static visual reference, such as:
   - standard coordinate-plane illustrations
   - complex-plane / phasor / geometry visuals
   - well-known signal shapes or system diagrams
   - historical / standard scientific diagrams that are already clean and accurate
C. Use LaTeX-native visuals instead of GPTImage2 when the core object is symbolic, structural, or matrix-based, such as:
   - matrix forms (zero, diagonal, identity, symmetric, transpose, equality)
   - equations, transforms, summations, determinants
   - entry-wise comparisons
   - piecewise symbolic structures
   If the student mainly needs to read exact symbols and positions, LaTeX is preferred.
D. Use an interactive demo when understanding depends on changing parameters or testing validity, such as:
   - conformability of matrix multiplication
   - time shift / scaling / reflection
   - parameter-driven geometry or signal changes
   - cases where the student benefits from seeing what changes and what stays invariant
E. Use GPTImage2 only when all other routes are insufficient, for example:
   - a custom pedagogical image is required for one specific concept
   - no accurate textbook / wiki / LaTeX / interactive-demo route can show the concept well
   - if a ready-made textbook / Wikipedia / Wikimedia image is already available, GPTImage2 must not be used
F. Never choose GPTImage2 for a concept that can already be shown more precisely with LaTeX or a simple interactive demo.
G. For paired concepts that are easily confused, prefer separate visuals over one combined visual unless the entire teaching goal is comparison.
H. Never make a GPTImage2 collage, dashboard, or multi-idea poster. One GPTImage2 image = one knowledge point only.
`;

const AGENT_A_RULES_APPENDIX = `
PLANNING OVERRIDES:
- Plan the overview page as a compact outline only.
- When concept pairs are easily confused, allocate separate blocks and separate student-facing visuals.
- If a knowledge point is primarily definitional, reserve room for one minimal worked example in the execution stage.
- If a textbook figure is chosen for a knowledge point, keep that figure on the same page as the explanation it supports. Do not strand the figure on the overview while the real explanation appears later.
- Treat generate_image / GPTImage2 as the weakest visual option. Plan it only when textbook figures, wiki/wikimedia references, LaTeX-native visuals, and interactive demos are not accurate enough for the teaching goal.
- If a textbook figure or wiki/wikimedia reference image is available, do not plan generate_image for the same knowledge point. GPTImage2 is not allowed as a prettier remake of an already-available image asset.
- For matrix definitions and equation-structure concepts, default to LaTeX-native visuals first.
- For parameter-sensitive concepts, default to interactive demos first.
- For canonical static diagrams already well represented in public references, default to textbook or wiki/wikimedia first.
- If generate_image is unavoidable, scope each generated image to one concept only. Never ask one generated image to explain multiple ideas at once.
- If you cannot produce a valid planning result, fail clearly. Do not rely on hidden downstream fallback behavior.
- Plan the final "📌 Key Takeaways" so it includes a compact but explicit list of the section's core formulas, not just verbal summaries.
- Plan formulas in a B.2-1-style lecture-note rhythm: introduce the concept, show the formula as a standalone LaTeX block, explain the symbols and use case, then add a short example or trap. Do not plan a top-of-page formula bank.
- Treat textbook equation labels like (B.16) as "key formula" markers. Prefer including those formulas in math_block pages and in the final summary when they are central to the section.
- Do not over-compress teaching text. Remove filler, but preserve enough words for a student to understand why the formula works and when to use it.
`;

const AGENT_B_RULES_APPENDIX = `
WRITING OVERRIDES:
- Page 1 must stay compact: one short objective + one short concept list only.
- Do not write long introductory prose on the overview page.
- If two concepts are distinct but adjacent, render them as separate sub-blocks with separate visuals/examples.
- For definition-heavy pages, always include one minimal example right after the definition and before any "Exam Trigger" or summary coaching.
- Favor short, exam-relevant wording over long narrative explanation.
- Keep each textbook figure on the same knowledge-point page as the explanation it teaches. If a figure explains a later concept, move it with that concept instead of leaving it near the overview.
- When executing visuals, prefer textbook / wiki / LaTeX / interactive-demo routes first. Use GPTImage2 only as the final fallback when those routes cannot accurately show the concept.
- If a textbook figure or wiki/wikimedia reference image already exists for the same knowledge point, do not execute GPTImage2 for that same image job.
- If the concept is mostly symbolic, choose precision over prettiness.
- If the concept is mostly about change, choose interaction over static illustration.
- If GPTImage2 is used, the prompt must target one concept only. No combined-concept teaching posters, no multi-panel concept bundles, no idea collages.
- In the section summary, preserve the most exam-sensitive symbolic detail from the section when one exists. Do not compress away sign-sensitive facts such as "sqrt(-1) = ±j".
- In every section summary, list the core formulas explicitly as formula bullets. Do not replace the formulas with prose-only paraphrases.
- Never execute a "formula dump" where all formulas appear before the real teaching. Keep each formula next to the concept it teaches.
- Around every important formula, provide enough explanation to be useful: what it means, what the symbols represent, when to use it, one short example or trap if applicable.
- If OCR or the blueprint includes textbook equation labels such as "(B.16)", preserve the important labels when helpful and make sure those labeled formulas are considered for Key Takeaways.
- Key Takeaways should include all key formulas and core concept rules, but should not include every worked-example calculation step.
`;

function escapeHtmlAttr(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function escapeHtmlInline(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
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

function splitDisplayMathForLectureNotes(inner = '') {
    const raw = String(inner || '').trim();
    if (!raw) return [];

    const stripLineSpacing = (value) => String(value || '')
        .replace(/^(?:\\\\|\\)\s*\[\s*-?\d+(?:\.\d+)?(?:pt|em|ex|mm|cm|in|pc|px)\s*\]\s*/g, '')
        .replace(/\s*(?:\\\\|\\)\s*\[\s*-?\d+(?:\.\d+)?(?:pt|em|ex|mm|cm|in|pc|px)\s*\]$/g, '')
        .trim();

    let body = stripLineSpacing(raw);
    body = body.replace(/\s*\\qquad\s*(\\text\{\([A-Za-z]?\.\d+\)\})/g, ' \\quad $1');

    const hasDisplayLineBreak = /\\\\(?:\[[^\]]+\])?/.test(body);
    const hasSimpleLineEnv = /\\begin\{(?:aligned|gathered)\}/.test(body);
    if (!hasDisplayLineBreak && !hasSimpleLineEnv) {
        const stripParts = body
            .split(/\s*,?\s*\\qquad\s*/g)
            .map(part => stripLineSpacing(part).replace(/&/g, '').replace(/\s+/g, ' ').trim())
            .filter(Boolean);
        const equationParts = stripParts.filter(part => /(?:=|\\operatorname\{(?:Re|Im)\})/.test(part));
        if (stripParts.length > 1 && equationParts.length >= 1) return stripParts;
        return [body];
    }

    body = body
        .replace(/\\begin\{(?:aligned|gathered)\}/g, '')
        .replace(/\\end\{(?:aligned|gathered)\}/g, '')
        .trim();

    const parts = body
        .split(/\\\\(?:\[[^\]]+\])?/)
        .map(part => stripLineSpacing(part).replace(/&/g, '').replace(/\s+/g, ' ').trim())
        .filter(Boolean);

    return parts.length ? parts : [raw];
}

function normalizeMathMarkdown(markdown) {
    let src = String(markdown || '');
    if (!src) return src;

    src = src
        .replace(/\\qquad\s*(\\text\{\([A-Za-z]?\.\d+\)\})/g, '\\quad $1')
        .replace(/\\qquad/g, '\\quad')
        .replace(/\\\\\(/g, '\\(')
        .replace(/\\\\\)/g, '\\)')
        .replace(/\\\\\[(?!\s*\d+(?:\.\d+)?(?:pt|em|ex|mm|cm|in|pc|px)\])/g, '\\[')
        .replace(/\\\\\]/g, '\\]')
        .replace(/(^|\n)\s*\\\[\s*([^\n]+?)\s*\\\]\s*(?=\n|$)/g, '$1$$\n$2\n$$')
        .replace(/(^|\n)\s*\\\[\s*(?=\n)/g, '$1$$\n')
        .replace(/(^|\n)\s*\\\]\s*(?=\n|$)/g, '$1$$')
        .replace(/\\[ \t]+\(/g, '\\(')
        .replace(/\\[ \t]+\)/g, '\\)')
        .replace(/\\[ \t]+\[/g, '\\[')
        .replace(/\\[ \t]+\]/g, '\\]');

    src = src.replace(/\$\$([\s\S]*?)\$\$/g, (_match, inner) => {
        const fixedInner = String(inner || '');
        if (/\\begin\{(?:array|cases|matrix|bmatrix|pmatrix|vmatrix|Vmatrix|split|align\*?)\}/.test(fixedInner)) {
            return `$$${fixedInner}$$`;
        }
        const displayLines = splitDisplayMathForLectureNotes(fixedInner);
        return displayLines.map(line => `$$${line}$$`).join('\n\n');
    });

    src = src.replace(/(?<!\$)\$(?!\$)([^\n$]+?)(?<!\$)\$(?!\$)/g, (_m, expr) => {
        const inner = String(expr || '').trim();
        if (!inner) return _m;
        return `\\(${inner}\\)`;
    });

    // Normalize broken model output where display math is emitted as a single "$" line,
    // followed by latex content, then another single "$" line.
    src = src.replace(/(^|\n)\s*\$\s*\n([\s\S]*?)\n\s*\$\s*(?=\n|$)/g, (_m, lead, body) => {
        const inner = String(body || '').trim();
        if (!inner) return `${lead}$$\n$$`;
        return `${lead}$$\n${inner}\n$$`;
    });

    // Repair common malformed inline latex missing the leading backslash after JSON / model cleanup.
    src = src
        .replace(/(^|[^\w\\])theta(?=[^a-zA-Z]|$)/g, '$1\\\\theta')
        .replace(/(^|[^\w\\])lambda(?=[^a-zA-Z]|$)/g, '$1\\\\lambda')
        .replace(/(^|[^\w\\])cos(?=\s*\\theta|\s*\(|[^a-zA-Z]|$)/g, '$1\\\\cos')
        .replace(/(^|[^\w\\])sin(?=\s*\\theta|\s*\(|[^a-zA-Z]|$)/g, '$1\\\\sin')
        .replace(/(^|[^\w\\])tan(?=\s*\\theta|\s*\(|[^a-zA-Z]|$)/g, '$1\\\\tan')
        .replace(/(^|[^\w\\])sqrt(?=\s*\{|\s*\(|[^a-zA-Z]|$)/g, '$1\\\\sqrt')
        .replace(/(^|[^\w\\])quad(?=[^a-zA-Z]|$)/g, '$1\\\\quad')
        .replace(/(^|[^\w\\])operatorname(?=\s*\{)/g, '$1\\\\operatorname');

    return src;
}

function collectLessonFormatIssues(markdown = '') {
    const src = String(markdown || '');
    const issues = [];
    if (!src.trim()) issues.push('empty_lesson');
    const displayDelimiterCount = (src.match(/\$\$/g) || []).length;
    if (displayDelimiterCount % 2 !== 0) issues.push('unbalanced_display_math');
    if (/\\begin\{(?:gathered|aligned)\}/.test(src)) issues.push('packed_formula_environment');
    if (/\\\\\[[^\]]*(?:pt|em|ex|mm|cm|in|pc|px)\]/.test(src)) issues.push('visible_line_spacing_token');
    if (/\\qquad/.test(src)) issues.push('horizontal_formula_strip');
    if (/(^|\n)\s*\\\[[\s\S]*?\\\]\s*(?=\n|$)/.test(src)) issues.push('raw_display_delimiter');
    if (/(^|[^\w\\])(?:sqrt|theta|lambda|operatorname)\s*(?:\{|\\theta|\(|$)/.test(src)) issues.push('bare_latex_command');
    if (/(^|[^\w\\])(?:cos|sin|tan)\s*(?:\\theta|\(|$)/.test(src)) issues.push('bare_trig_command');
    return [...new Set(issues)];
}

function prepareLessonForCache(sectionId = '', lesson = '') {
    let normalized = normalizeMathMarkdown(convertLegacyQuickCheckToKcBlocks(lesson));
    normalized = enforceSectionSpecificLessonPolish(sectionId, normalized);
    normalized = normalizeMathMarkdown(normalized);
    return normalized;
}

function assertLessonFormatClean(sectionId = '', lesson = '', phase = 'lesson') {
    const issues = collectLessonFormatIssues(lesson);
    if (!issues.length) return;
    throw new Error(`[LessonFormat:${phase}] ${sectionId || 'unknown'} failed format validation: ${issues.join(', ')}`);
}

function shouldPreferLatexConceptVisual(query = '', title = '') {
    const text = `${compactWhitespace(query)} ${compactWhitespace(title)}`.toLowerCase();
    return /\b(identity matrix|unit matrix)\b/.test(text)
        || /number system hierarchy|natural integers rational irrational real complex|number system expansion|natural numbers.*complex numbers/.test(text);
}

function buildLatexConceptVisualMarkdown(query = '', language = 'en') {
    const text = `${compactWhitespace(query)}`.toLowerCase();
    if (/number system hierarchy|natural integers rational irrational real complex|number system expansion|natural numbers.*complex numbers/.test(text)) {
        return [
            '$$',
            '1,2,3,\\ldots \\;\\rightarrow\\; \\frac{a}{b} \\;\\rightarrow\\; \\sqrt{2} \\;\\rightarrow\\; -5 \\;\\rightarrow\\; j',
            '$$',
            language === 'zh'
                ? '*这条链不是计算公式，而是历史线索：每当旧数系表达不了有用问题，数系就继续扩张。*'
                : '*This is a historical map, not a calculation formula: each new symbol marks a useful problem older numbers could not express cleanly.*'
        ].join('\n');
    }
    if (/\b(identity matrix|unit matrix)\b/.test(text)) {
        return [
            '$$',
            'I_3 =',
            '\\begin{bmatrix}',
            '1 & 0 & 0 \\\\',
            '0 & 1 & 0 \\\\',
            '0 & 0 & 1',
            '\\end{bmatrix}',
            '$$',
            language === 'zh'
                ? '*这里直接用 LaTeX 展示更清楚：单位矩阵的本质就是“主对角线全是 1，其余全是 0”。*'
                : '*LaTeX is clearer here: an identity matrix is defined by 1s on the main diagonal and 0s everywhere else.*'
        ].join('\n');
    }
    return '';
}

function normalizeLessonVisualPolicy(markdown, language = 'en') {
    let src = normalizeMathMarkdown(String(markdown || ''));
    if (!src) return src;

    const identityVisualBlockRegex = /%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="web_reference_image"[\s\S]*?%%KC_END%%\s*!\[[^\]]*Identity matrix[^\]]*\]\([^)]+\)\s*\*Reference visual from Wikimedia Commons:[^*]+\*\s*<div class="kc-reference-source">[\s\S]*?<\/div>\s*/i;
    if (identityVisualBlockRegex.test(src)) {
        src = src.replace(identityVisualBlockRegex, `${buildLatexConceptVisualMarkdown('identity matrix', language)}\n\n`);
    }

    const numberSystemVisualBlockRegex = /%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="web_reference_image"[\s\S]*?%%KC_END%%\s*!\[[^\]]*(?:Natural number|number system|Reference illustration)[^\]]*\]\([^)]+\)\s*\*The nested hierarchy of number systems:[^*]+\*\s*<div class="kc-reference-source">[\s\S]*?<\/div>\s*/i;
    if (numberSystemVisualBlockRegex.test(src)) {
        src = src.replace(numberSystemVisualBlockRegex, `${buildLatexConceptVisualMarkdown('number system hierarchy natural numbers complex numbers', language)}\n\n`);
    }

    const latexIdentity = '$$I_3 =';
    if (!src.includes(latexIdentity)) {
        const identityAnchorRegex = /(\*The identity matrix \\\(I\\\) is the matrix equivalent of the number \\\(1\\\) in ordinary multiplication\.[\s\S]*?does nothing to the matrix it multiplies\.\*)/i;
        if (identityAnchorRegex.test(src)) {
            src = src.replace(identityAnchorRegex, `$1\n\n${buildLatexConceptVisualMarkdown('identity matrix', language)}`);
        }
    }

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
    if (!mapKey) {
        const fallback = new Set();
        (Array.isArray(bookPages) ? bookPages : []).forEach(page => {
            const pageKey = String(page && page.page || '').trim().toLowerCase();
            (NEW_BOOK_FIGURE_INDEX[pageKey] || []).forEach(file => fallback.add(path.basename(String(file || ''))));
        });
        return fallback;
    }

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

function normalizeFormulaCandidate(formula = '') {
    return String(formula || '')
        .replace(/\$+/g, '')
        .replace(/^\s*\\text\{[^}]*\}\s*/g, '')
        .replace(/&/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/[.;,:]+$/, '');
}

function shouldKeepFormulaCandidate(formula = '') {
    const normalized = normalizeFormulaCandidate(formula);
    if (!normalized) return false;
    if (normalized.length < 5) return false;
    if (/^\\?(?:mathbb|mathrm|text)\{[^}]+\}$/.test(normalized)) return false;
    if (/^(?:[a-zA-Z]|\\[a-zA-Z]+)\s*$/.test(normalized)) return false;
    return /[=<>]|\\(?:sqrt|frac|tan|ln|log|operatorname|angle|cdot|pm|mp|pi|theta|omega|cos|sin|exp|Rightarrow|to)|\||\^|\/|e\^\{j/.test(normalized);
}

function splitDisplayMathIntoFormulas(content = '') {
    const raw = String(content || '').trim();
    if (!raw) return [];
    let cleaned = raw
        .replace(/\\begin\{(?:aligned|gathered|cases|array)\}/g, '')
        .replace(/\\end\{(?:aligned|gathered|cases|array)\}/g, '')
        .trim();
    const parts = cleaned
        .split(/\\\\/)
        .map(part => normalizeFormulaCandidate(part))
        .filter(shouldKeepFormulaCandidate);
    return parts.length ? parts : (shouldKeepFormulaCandidate(cleaned) ? [normalizeFormulaCandidate(cleaned)] : []);
}

function isCoreFormulaBlockContext(nextText = '', prevText = '') {
    const next = compactWhitespace(nextText).toLowerCase();
    const prev = compactWhitespace(prevText).toLowerCase();
    if (/^##\s+/.test(nextText)) return true;
    if (/^(?:###[^a-z]|###\s+(?:when to use|key rule|worked example|representative example|exam trigger|common mistake))/i.test(nextText)) return false;
    if (/^(?:\|.*\|)$/.test(nextText)) return false;
    if (/^(?:for |let |consider |convert |example\b|step \d|calculator |numerator |denominator )/i.test(prevText)) return false;
    if (/(worked example|representative example|example a|example b|step 1|step 2|step 3|common mistake|exam trigger)/i.test(prev)) return false;
    return /^##\s+/.test(nextText) || /^(?:#|##)\s+/.test(nextText);
}

function extractCoreFormulaBullets(markdown = '') {
    const src = String(markdown || '');
    if (!src) return [];

    const stopAtSummary = src.split(/(?:\n---\n)?\*\*📌 Key Takeaways\*\*/)[0] || src;
    const formulas = [];
    const seen = new Set();

    const addFormula = (formula) => {
        const normalized = normalizeFormulaCandidate(formula);
        if (!shouldKeepFormulaCandidate(normalized)) return;
        const key = normalized.toLowerCase();
        if (seen.has(key)) return;
        seen.add(key);
        formulas.push(normalized);
    };

    const displayMatches = [...stopAtSummary.matchAll(/\$\$([\s\S]*?)\$\$/g)];
    displayMatches.forEach((match) => {
        const fullMatch = match[0] || '';
        const start = match.index || 0;
        const end = start + fullMatch.length;
        const before = stopAtSummary.slice(0, start);
        const after = stopAtSummary.slice(end);
        const prevText = before.split('\n').slice(-3).join('\n').trim();
        const nextText = (after.match(/\S.*(?:\n|$)/) || [''])[0].trim();
        if (!isCoreFormulaBlockContext(nextText, prevText)) return;
        splitDisplayMathIntoFormulas(match[1]).forEach(addFormula);
    });

    const specialInlinePatterns = [
        /\\\(j\^2\s*=\s*-1\\\)/g,
        /\\\(\\sqrt\{-1\}\s*=\s*\\pm\s*j\\\)/g,
        /\\\(\\sqrt\{-4\}\s*=\s*\\pm\s*2j\\\)/g
    ];
    specialInlinePatterns.forEach((pattern) => {
        for (const match of stopAtSummary.matchAll(pattern)) {
            addFormula(match[0].replace(/^\\\(/, '').replace(/\\\)$/, ''));
        }
    });

    const preferred = formulas.filter((formula) => !/^[a-z](?:\s*[<>]=?\s*0)?$/i.test(formula));
    if (preferred.length) {
        return preferred.map(formula => `- Core formula: \\(${formula}\\).`);
    }

    return formulas.map(formula => `- Core formula: \\(${formula}\\).`);
}

function mergeCoreFormulaBulletsIntoSummary(markdown = '') {
    const src = String(markdown || '');
    if (!/(\*\*📌 Key Takeaways\*\*|📌 Key Takeaways)/.test(src)) return src;

    const extractedFormulaBullets = extractCoreFormulaBullets(src);
    if (!extractedFormulaBullets.length) return src;

    return src.replace(
        /(\*\*📌 Key Takeaways\*\*[\s\S]*?)(\n\*In the next section)/,
        (_m, summaryStart, nextSection) => {
            let updated = summaryStart;
            extractedFormulaBullets.forEach((bullet) => {
                const formulaBody = bullet.replace(/^- Core formula:\s*/, '').replace(/\.$/, '').trim();
                const formulaKey = normalizeFormulaCandidate(formulaBody).toLowerCase();
                if (formulaKey && updated.toLowerCase().includes(formulaKey)) return;
                updated += `\n${bullet}`;
            });
            updated = updated.replace(/\n{3,}/g, '\n\n');
            return `${updated}${nextSection}`;
        }
    );
}

function enforceSectionSpecificLessonPolish(sectionId = '', markdown = '') {
    let src = mergeCoreFormulaBulletsIntoSummary(markdown);
    const sid = String(sectionId || '').trim().toLowerCase();
    if (!src) return src;

    if (sid === 'b.1-1') {
        if (/(\*\*📌 Key Takeaways\*\*|📌 Key Takeaways)/.test(src)) {
            src = src.replace(
                /(\*\*📌 Key Takeaways\*\*[\s\S]*?)(\n\*In the next section)/,
                (_m, summaryStart, nextSection) => {
                    let updated = summaryStart;
                    updated = updated.replace(/- The symbol \\\(j\\\) satisfies \\\(j\^2 = -1\\\) and handles square roots of negative numbers\./g, '');
                    updated = updated.replace(/- \\?\(j\^2 = -1\\?\).*$/gm, '');
                    updated = updated.replace(/- \\?\(\\sqrt\{-1\} = \\pm j\\?\).*$/gm, '');
                    updated = updated.replace(/- Minimal example: \\?\(\\sqrt\{-4\} = \\pm 2j\\?\).*$/gm, '');
                    updated += '\n- \\(j^2 = -1\\) defines the imaginary unit used in engineering notation.';
                    updated += '\n- \\(\\sqrt{-1} = \\pm j\\), so the square root of a negative number has two imaginary values.';
                    updated += '\n- Minimal example: \\(\\sqrt{-4} = \\pm 2j\\).';
                    updated = updated.replace(/\n{3,}/g, '\n\n');
                    return `${updated}${nextSection}`;
                }
            );
        }
    }

    return src;
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

function loadBookIndexForDir(ocrDir, pagePattern = /^book-\d{3}\.meta\.json$/i) {
    const files = fs.readdirSync(ocrDir)
        .filter(name => pagePattern.test(name))
        .sort();

    const entries = [];

    for (const file of files) {
        const metaPath = path.join(ocrDir, file);
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
            textPath: path.join(ocrDir, `${page}.txt`),
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

const BOOK_INDEX_OLD = loadBookIndexForDir(OCR_DIR_OLD, /^book-\d{3}\.meta\.json$/i);
const BOOK_INDEX_NEW = loadBookIndexForDir(OCR_DIR_NEW, /^page-\d{3}\.meta\.json$/i);

function getBookIndex(ocrDir = OCR_DIR_OLD) {
    return ocrDir === OCR_DIR_NEW ? BOOK_INDEX_NEW : BOOK_INDEX_OLD;
}

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
const FEEDBACK_BOARD_PATH = path.join(USERS_DIR, 'feedback-board.json');

const LESSON_CACHE_DIR = path.join(TUTOR_MATERIALS_DIR, 'lesson-cache');
const LESSON_CACHE_VERSION = 'aquarius_visual_latex_v2';
const LESSON_CACHE_MISS_MESSAGE = 'This section has not been prepared yet.';
const BLUEPRINT_DIR = path.join(TUTOR_MATERIALS_DIR, '');
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

function getB8FormulaAppendix(sectionId = '', sectionTitle = '') {
    const text = compactWhitespace(`${sectionId} ${sectionTitle}`);
    if (!/B\.8\b/i.test(text)) return null;
    const pages = [
        {
            title: 'B.8-1 Mathematical Constants',
            formulas: [
                '\\pi \\approx 3.14159',
                'e \\approx 2.71828',
                'e^{-1}=\\frac{1}{e} \\approx 0.36788',
                '\\log_{10}2 \\approx 0.30103',
                '\\log_{10}3 \\approx 0.47712'
            ]
        },
        {
            title: 'B.8-2 Complex-Number Identities',
            formulas: [
                'e^{\\pm j\\theta}=\\cos\\theta \\pm j\\sin\\theta',
                'a+jb = r e^{j\\theta}',
                'r=\\sqrt{a^2+b^2}',
                '\\theta=\\tan^{-1}\\left(\\frac{b}{a}\\right)\\quad\\text{with quadrant check}',
                'e^{\\pm j\\pi/2}=\\pm j',
                'e^{\\pm jn\\pi}=(-1)^n'
            ]
        },
        {
            title: 'B.8-3 Summation Formulas',
            formulas: [
                '\\sum_{k=m}^{n} r^k = \\frac{r^{n+1}-r^m}{r-1},\\quad r\\ne 1',
                '\\sum_{k=0}^{n} k = \\frac{n(n+1)}{2}',
                '\\sum_{k=0}^{n} k^2 = \\frac{n(n+1)(2n+1)}{6}',
                '\\sum_{k=0}^{n} kr^k = \\frac{r+[n(r-1)-1]r^{n+1}}{(r-1)^2},\\quad r\\ne1'
            ]
        },
        {
            title: 'B.8-4 Taylor and Maclaurin Series',
            formulas: [
                'f(x)=\\sum_{n=0}^{\\infty}\\frac{f^{(n)}(a)}{n!}(x-a)^n',
                'f(x)=\\sum_{n=0}^{\\infty}\\frac{f^{(n)}(0)}{n!}x^n',
                'e^x=\\sum_{n=0}^{\\infty}\\frac{x^n}{n!}',
                '\\ln(1+x)=\\sum_{n=1}^{\\infty}(-1)^{n+1}\\frac{x^n}{n}'
            ]
        },
        {
            title: 'B.8-5 Power Series',
            formulas: [
                '\\sin x=\\sum_{n=0}^{\\infty}(-1)^n\\frac{x^{2n+1}}{(2n+1)!}',
                '\\cos x=\\sum_{n=0}^{\\infty}(-1)^n\\frac{x^{2n}}{(2n)!}',
                '\\frac{1}{1-x}=\\sum_{n=0}^{\\infty}x^n,\\quad |x|<1',
                '(1+x)^\\alpha=1+\\alpha x+\\frac{\\alpha(\\alpha-1)}{2!}x^2+\\cdots'
            ]
        },
        {
            title: 'B.8-6 Trigonometric Identities',
            formulas: [
                '\\sin^2 x+\\cos^2 x=1',
                '\\sin(\\alpha\\pm\\beta)=\\sin\\alpha\\cos\\beta\\pm\\cos\\alpha\\sin\\beta',
                '\\cos(\\alpha\\pm\\beta)=\\cos\\alpha\\cos\\beta\\mp\\sin\\alpha\\sin\\beta',
                '\\sin 2x=2\\sin x\\cos x',
                '\\cos 2x=\\cos^2x-\\sin^2x=1-2\\sin^2x=2\\cos^2x-1'
            ]
        },
        {
            title: 'B.8-7 Common Derivative Formulas',
            formulas: [
                '\\frac{d}{dx}x^n=nx^{n-1}',
                '\\frac{d}{dx}e^{ax}=ae^{ax}',
                '\\frac{d}{dx}\\ln x=\\frac{1}{x}',
                '\\frac{d}{dx}\\sin ax=a\\cos ax',
                '\\frac{d}{dx}\\cos ax=-a\\sin ax',
                '\\frac{d}{dx}\\tan ax=a\\sec^2 ax'
            ]
        },
        {
            title: 'B.8-8 Indefinite Integrals',
            formulas: [
                '\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C,\\quad n\\ne -1',
                '\\int e^{ax}\\,dx=\\frac{1}{a}e^{ax}+C',
                '\\int \\sin ax\\,dx=-\\frac{1}{a}\\cos ax+C',
                '\\int \\cos ax\\,dx=\\frac{1}{a}\\sin ax+C',
                '\\int u\\,dv=uv-\\int v\\,du'
            ]
        },
        {
            title: "B.8-9 L'Hôpital's Rule",
            formulas: [
                "\\lim_{x\\to a}\\frac{f(x)}{g(x)}=\\lim_{x\\to a}\\frac{f'(x)}{g'(x)}",
                '\\text{Valid for indeterminate forms }0/0\\text{ or }\\infty/\\infty',
                "g'(x)\\ne 0\\text{ near }a"
            ]
        },
        {
            title: 'B.8-10 Solution of Quadratic and Cubic Equations',
            formulas: [
                'ax^2+bx+c=0',
                'x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}',
                'ax^3+bx^2+cx+d=0',
                'x=y-\\frac{b}{3a}',
                'y^3+py+q=0',
                'y=\\sqrt[3]{-\\frac{q}{2}+\\sqrt{\\left(\\frac{q}{2}\\right)^2+\\left(\\frac{p}{3}\\right)^3}}+\\sqrt[3]{-\\frac{q}{2}-\\sqrt{\\left(\\frac{q}{2}\\right)^2+\\left(\\frac{p}{3}\\right)^3}}'
            ]
        }
    ];
    return pages.map((page) => {
        const formulas = page.formulas.map((formula, i) => `${i + 1}.\n\n$$\n${formula}\n$$`).join('\n\n');
        return `## ${page.title}\n\n${formulas}`;
    }).join('\n\n');
}

function buildLessonCacheKey(_memory, bookSource = 'old', cacheVariant = 'lesson') {
    const sourceKey = bookSource === 'new' ? 'new' : 'old';
    const variantKey = cacheVariant && cacheVariant !== 'lesson' ? `__${cacheVariant}` : '';
    return `${sourceKey}${variantKey}__${LESSON_CACHE_VERSION}`;
}

function readLessonCache(sectionId, memory, bookSource = 'old', cacheVariant = 'lesson') {
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

function writeLessonCache(sectionId, memory, lesson, bookSource = 'old', cacheVariant = 'lesson') {
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

function scoreLegacyLessonCacheFile(fileName, memory, bookSource = 'old') {
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

function cleanFeedbackText(value, maxLen = 1200) {
    return compactWhitespace(String(value || '').replace(/\r/g, '\n')).slice(0, maxLen);
}

function readFeedbackBoard() {
    try {
        const parsed = JSON.parse(fs.readFileSync(FEEDBACK_BOARD_PATH, 'utf8'));
        const items = Array.isArray(parsed.items) ? parsed.items : [];
        return { items };
    } catch (_) {
        return { items: [] };
    }
}

function writeFeedbackBoard(board) {
    const items = Array.isArray(board && board.items) ? board.items : [];
    fs.writeFileSync(FEEDBACK_BOARD_PATH, JSON.stringify({ items }, null, 2), 'utf8');
}

function publicFeedbackItem(item) {
    return {
        id: item.id,
        title: item.title,
        body: item.body,
        author: item.author,
        createdAt: item.createdAt,
        replies: Array.isArray(item.replies) ? item.replies.map(reply => ({
            id: reply.id,
            body: reply.body,
            author: reply.author,
            createdAt: reply.createdAt
        })) : []
    };
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
        'If the concept is definition-first and fully legible in symbolic form, prefer LaTeX over any fetched reference image.',
        'For identity matrix / unit matrix style content, do not force an external image when a clean LaTeX matrix communicates the idea better.',
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
    if (memory.preferenceProfile && typeof memory.preferenceProfile.markdown === 'string' && memory.preferenceProfile.markdown.trim()) {
        lines.push(`Saved editable preference profile:\n${memory.preferenceProfile.markdown.trim()}`);
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
    const OPENROUTER_API_KEY = getOpenRouterKey();
    if (!OPENROUTER_API_KEY) {
        throw new Error('Missing OpenRouter API key');
    }

    const payload = JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: maxTokens
    });

    const startedAt = Date.now();
    console.log(`[OpenRouterChat] start model=${model} timeoutMs=${timeoutMs} maxTokens=${maxTokens} payloadBytes=${Buffer.byteLength(payload)}`);

    let data;
    try {
        data = await httpRequestJson(
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
    } catch (err) {
        console.error(`[OpenRouterChat] failed model=${model} after ${Date.now() - startedAt}ms:`, err && err.stack ? err.stack : err);
        throw err;
    }

    const choice = data && Array.isArray(data.choices) ? data.choices[0] : null;
    if (choice && choice.finish_reason === 'length') {
        console.warn(`[OpenRouterChat] Response for ${model} hit finish_reason=length; output may be truncated.`);
    }
    const text = extractTextContent(choice && choice.message && choice.message.content);

    console.log(`[OpenRouterChat] done model=${model} in ${Date.now() - startedAt}ms finish_reason=${choice && choice.finish_reason ? choice.finish_reason : 'unknown'} textLength=${text ? text.length : 0}`);

    if (!text) {
        throw new Error(`Empty model response from ${model}`);
    }

    return text;
}

async function callOpenAIChat({ model, messages, timeoutMs, temperature = 0.2, maxTokens = 1200 }) {
    const OPENAI_API_KEY = getOpenAIKey();
    const OPENROUTER_API_KEY = getOpenRouterKey();
    if (!OPENAI_API_KEY) {
        if (OPENROUTER_API_KEY) {
            console.warn(`[OpenAIChat] Missing OPENAI_API_KEY; falling back to OpenRouter for model ${model}.`);
            try {
                return await callOpenRouterChat({ model, messages, timeoutMs, temperature, maxTokens });
            } catch (err) {
                throw new Error(`[OpenAIChat-fallback:${model}] ${err.message}`);
            }
        }
        throw new Error('Missing OpenAI API key');
    }

    const payload = JSON.stringify({
        model,
        messages,
        temperature,
        max_completion_tokens: maxTokens
    });

    let data;
    try {
        data = await httpRequestJson(
            OPENAI_API_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(payload),
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                }
            },
            payload,
            timeoutMs
        );
    } catch (err) {
        throw new Error(`[OpenAIChat:${model}] ${err.message}`);
    }

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
            try {
                const repaired = repairJsonLatexEscapes(candidate);
                if (repaired && repaired !== candidate) {
                    return JSON.parse(repaired);
                }
            } catch (_) {
                // continue
            }
        }
    }

    return null;
}

function repairJsonLatexEscapes(input) {
    const src = String(input || '');
    let out = '';
    let inString = false;
    let escaped = false;

    for (let i = 0; i < src.length; i += 1) {
        const ch = src[i];

        if (!inString) {
            out += ch;
            if (ch === '"') {
                inString = true;
                escaped = false;
            }
            continue;
        }

        if (escaped) {
            out += ch;
            escaped = false;
            continue;
        }

        if (ch === '\\') {
            const next = src[i + 1] || '';
            if (/["\\/bfnrtu]/.test(next)) {
                out += ch;
                escaped = true;
            } else {
                // Repair invalid JSON escape inside strings, common with LaTeX like \sqrt, \pm, \qquad.
                out += '\\\\';
            }
            continue;
        }

        out += ch;
        if (ch === '"') {
            inString = false;
        }
    }

    return out;
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
    const activeIndex = getBookIndex(ocrDir);
    const ranked = activeIndex
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

const WIKIMEDIA_HEADERS = {
    'Accept': 'application/json',
    'User-Agent': 'TutorAgent/1.0 (educational-app; contact: tutor@example.com)'
};

function scoreReferenceImageCandidate(item = {}, query = '') {
    const title = compactWhitespace(item.title || '').toLowerCase();
    const mime = compactWhitespace(item.mime || '').toLowerCase();
    const urlValue = compactWhitespace(item.url || '');
    const q = compactWhitespace(query || '').toLowerCase();
    const qTokens = q.split(/[^a-z0-9]+/i).filter(Boolean);

    let score = 0;
    if (/\.gif$/i.test(urlValue) || mime === 'image/gif') score += 45;
    if (mime === 'image/svg+xml') score += 28;
    if (mime === 'image/png') score += 18;
    if (/diagram|matrix|identity|transpose|fourier|signal|plot|graph|wave|vector|animation/i.test(title)) score += 16;
    if (/icon|logo|nuvola|wiktionary|disambig|audio/i.test(title)) score -= 40;
    const overlap = qTokens.filter(tok => tok.length > 2 && title.includes(tok)).length;
    score += overlap * 8;
    if (q && title.includes(q.split(/\s+/)[0] || '')) score += 8;
    if (q.includes('matrix') && !title.includes('matrix')) score -= 60;
    if (q.includes('identity matrix') && !title.includes('identity matrix')) score -= 40;
    if (q.includes('inverse matrix') && !(/inverse/.test(title) && /matrix/.test(title))) score -= 30;
    if (q.includes('diagonal matrix') && !(/diagonal/.test(title) && /matrix/.test(title))) score -= 30;
    if (q.includes('symmetric matrix') && !(/symmetric/.test(title) && /matrix/.test(title))) score -= 30;
    if (q.includes('rows columns') && !(/matrix|row|column/.test(title))) score -= 30;
    if (/matrix multiplication|row column|dot product|conformability/.test(q) && !(/matrix|multiplication|row|column|dot product|linear algebra/.test(title))) score -= 90;
    if (/feynman|gluon|quark|electron|photon|boson|radiation|particle physics|gamma ray/i.test(title)) score -= 220;
    if (/document|passport|card|biometric|dni|seal/i.test(title)) score -= 120;
    return score;
}

function normalizeWikiImageCandidate(item = {}) {
    return {
        title: compactWhitespace(item.title || ''),
        url: compactWhitespace(item.url || ''),
        mime: compactWhitespace(item.mime || ''),
        source: compactWhitespace(item.source || 'wikimedia'),
        descriptionUrl: compactWhitespace(item.descriptionUrl || '')
    };
}

function filterReferenceCandidatesForQuery(candidates = [], query = '') {
    const q = compactWhitespace(query || '').toLowerCase();
    let filtered = Array.isArray(candidates) ? candidates.slice() : [];

    const withTitle = (predicate) => filtered.filter(item => predicate(compactWhitespace(item && item.title || '').toLowerCase()));

    if (/identity matrix/.test(q)) {
        const strict = withTitle(title => title.includes('identity') && title.includes('matrix'));
        if (strict.length) filtered = strict;
    }
    if (/inverse matrix/.test(q)) {
        const strict = withTitle(title => /inverse|invertible/.test(title) && title.includes('matrix'));
        if (strict.length) filtered = strict;
    }
    if (/diagonal matrix/.test(q)) {
        const strict = withTitle(title => title.includes('diagonal') && title.includes('matrix'));
        if (strict.length) filtered = strict;
    }
    if (/symmetric matrix/.test(q)) {
        const strict = withTitle(title => title.includes('symmetric') && title.includes('matrix'));
        if (strict.length) filtered = strict;
    }
    if (/rows columns labeled|matrix notation/.test(q)) {
        const strict = withTitle(title => /matrix|row|column/.test(title));
        if (strict.length) filtered = strict;
    }
    if (/matrix multiplication|row column|dot product|conformability/.test(q)) {
        const strict = withTitle(title =>
            /matrix|multiplication|row|column|dot product|linear algebra/.test(title)
            && !/feynman|gluon|quark|electron|photon|boson|radiation|particle physics|gamma ray/.test(title)
        );
        if (strict.length) {
            filtered = strict;
        } else {
            filtered = [];
        }
    }

    filtered = filtered.filter(item => {
        const title = compactWhitespace(item && item.title || '').toLowerCase();
        return !/feynman|gluon|quark|electron|photon|boson|radiation|particle physics|gamma ray/.test(title);
    });

    return filtered;
}

async function wikimediaCommonsImageSearch(query, limit = 6) {
    try {
        const endpoint = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=${Math.max(1, Math.min(limit, 8))}&prop=imageinfo|info&iiprop=url|mime&inprop=url&format=json&origin=*`;
        const payload = await httpRequestJson(endpoint, {
            method: 'GET',
            headers: WIKIMEDIA_HEADERS
        }, null, 15000);
        const pages = payload && payload.query && payload.query.pages ? Object.values(payload.query.pages) : [];
        return pages
            .map(page => {
                const info = Array.isArray(page.imageinfo) ? page.imageinfo[0] : null;
                if (!info || !info.url) return null;
                return normalizeWikiImageCandidate({
                    title: page.title || '',
                    url: info.url || '',
                    mime: info.mime || '',
                    source: 'wikimedia',
                    descriptionUrl: page.fullurl || info.descriptionurl || ''
                });
            })
            .filter(item => item && item.url && /^image\//i.test(item.mime || ''));
    } catch (err) {
        console.warn('[Search] Wikimedia Commons image search failed:', query, err.message);
        return [];
    }
}

async function wikipediaPageImageSearch(query, limit = 4) {
    try {
        const searchEndpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=${Math.max(1, Math.min(limit, 5))}&format=json&origin=*`;
        const searchPayload = await httpRequestJson(searchEndpoint, { method: 'GET', headers: WIKIMEDIA_HEADERS }, null, 12000);
        const results = Array.isArray(searchPayload && searchPayload.query && searchPayload.query.search) ? searchPayload.query.search : [];
        const images = [];
        for (const item of results) {
            const title = compactWhitespace(item && item.title);
            if (!title) continue;
            const pageEndpoint = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&piprop=original&format=json&origin=*`;
            const pagePayload = await httpRequestJson(pageEndpoint, { method: 'GET', headers: WIKIMEDIA_HEADERS }, null, 12000);
            const pages = pagePayload && pagePayload.query && pagePayload.query.pages ? Object.values(pagePayload.query.pages) : [];
            for (const page of pages) {
                const original = page && page.original;
                if (!original || !original.source) continue;
                images.push(normalizeWikiImageCandidate({
                    title,
                    url: original.source,
                    mime: /\.svg(\?|$)/i.test(original.source) ? 'image/svg+xml'
                        : (/\.gif(\?|$)/i.test(original.source) ? 'image/gif'
                            : (/\.png(\?|$)/i.test(original.source) ? 'image/png' : 'image/jpeg')),
                    source: 'wikipedia',
                    descriptionUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`
                }));
            }
        }
        return images.filter(item => item && item.url && /^image\//i.test(item.mime || ''));
    } catch (err) {
        console.warn('[Search] Wikipedia page image search failed:', query, err.message);
        return [];
    }
}

async function resolveReferenceImageForQuery(query = '', options = {}) {
    const cleanQuery = compactWhitespace(query || '');
    if (!cleanQuery) return null;
    if (shouldPreferLatexConceptVisual(cleanQuery)) return null;
    const preferAnimated = Boolean(options && options.preferAnimated);
    if (/matrix addition/i.test(cleanQuery) && /valid invalid|dimensions/i.test(cleanQuery)) {
        return null;
    }
    const heuristicQueries = [cleanQuery];
    if (/identity matrix/i.test(cleanQuery)) {
        heuristicQueries.unshift('Identity matrix');
    }
    if (/identity matrix inverse matrix/i.test(cleanQuery)) {
        heuristicQueries.unshift('Identity matrix');
        heuristicQueries.push('Invertible matrix');
    }
    if (/symmetric matrix/i.test(cleanQuery)) {
        heuristicQueries.push('Symmetric matrix');
    }
    if (/diagonal matrix/i.test(cleanQuery)) {
        heuristicQueries.push('Diagonal matrix');
    }
    if (/matrix notation|rows columns labeled/i.test(cleanQuery)) {
        heuristicQueries.push('Matrix (mathematics)');
    }
    const candidates = [
        ...(await wikimediaCommonsImageSearch(heuristicQueries[0], 8)),
        ...(await wikipediaPageImageSearch(heuristicQueries[0], 4))
    ];
    for (const extraQuery of heuristicQueries.slice(1)) {
        candidates.push(...(await wikipediaPageImageSearch(extraQuery, 3)));
        candidates.push(...(await wikimediaCommonsImageSearch(extraQuery, 4)));
    }
    if (!candidates.length) return null;
    const narrowed = filterReferenceCandidatesForQuery(candidates, cleanQuery);
    const ranked = narrowed
        .filter(item => item && item.url)
        .sort((a, b) => {
            const aGif = String(a && a.mime || '').toLowerCase().includes('gif') ? 1 : 0;
            const bGif = String(b && b.mime || '').toLowerCase().includes('gif') ? 1 : 0;
            if (preferAnimated && aGif !== bGif) return bGif - aGif;
            return scoreReferenceImageCandidate(b, cleanQuery) - scoreReferenceImageCandidate(a, cleanQuery);
        });
    return ranked[0] || null;
}

async function serperSearch(query, num = 8) {
    const apiKey = process.env.SERPER_API_KEY || '';
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

function matchesBookSourcePageId(pageId = '', bookSource = 'old') {
    const page = compactWhitespace(pageId || '').toLowerCase();
    if (!page) return false;
    return bookSource === 'new'
        ? /^page-\d{3}$/.test(page)
        : /^book-\d{3}$/.test(page);
}

function filterPagesForBookSource(items = [], bookSource = 'old') {
    return (Array.isArray(items) ? items : []).filter(item => matchesBookSourcePageId(item && item.page, bookSource));
}

function getPagesForSection(sectionId, ocrDir = OCR_DIR_OLD) {
    const code = extractSectionCode(sectionId);
    if (!code) return [];

    const isNewBook = ocrDir === OCR_DIR_NEW;
    const activeMap = isNewBook ? SECTION_PAGE_MAP_NEW : SECTION_PAGE_MAP;
    const activeIndex = getBookIndex(ocrDir);

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
                image: getPageImageUrl('new', `${pn}.png`),
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
                    image: getPageImageUrl('new', `${pn}.png`),
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
        const pages = pageNames.map(pn => activeIndex.find(e => e.page === pn)).filter(Boolean);
        if (pages.length > 0) return pages;
    }

    const parentCode = code.replace(/-\d+$/, '');
    if (parentCode !== code) {
        const parentKey = Object.keys(SECTION_PAGE_MAP).find(
            k => k.toLowerCase() === parentCode
        );
        if (parentKey) {
            const pageNames = SECTION_PAGE_MAP[parentKey];
            const pages = pageNames.map(pn => activeIndex.find(e => e.page === pn)).filter(Boolean);
            if (pages.length > 0) return pages;
        }
    }

    const exact = activeIndex.filter(entry => {
        const sub = extractSectionCode(entry.subsection);
        return sub === code || sub.startsWith(code + '-');
    });
    if (exact.length > 0) return exact;

    const raw = compactWhitespace(sectionId || '').toLowerCase();
    return activeIndex.filter(entry => entry.searchBlob.includes(raw));
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
// Agent A (Planner):  OpenAI gpt-5.5  — produces Rendering Blueprint JSON
// Agent B (Executor): OpenRouter Claude Sonnet 4.6 — executes each block into final MD
// ─────────────────────────────────────────────────────────────────────────────

const AGENT_A_MODEL = 'gpt-5.5';
const AGENT_B_MODEL = 'anthropic/claude-sonnet-4.6';
const EXAM_PRIORITY_DIR = path.join(TUTOR_MATERIALS_DIR, 'exam-priority');

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

function isBackgroundSection(sectionId = '', sectionTitle = '') {
    const id = compactWhitespace(String(sectionId || ''));
    const title = compactWhitespace(String(sectionTitle || ''));
    return /^B(?:[.-]|$)/i.test(id) || /\bbackground\b/i.test(title);
}

function isHistoricalBackgroundNote(sectionId = '', sectionTitle = '') {
    const id = compactWhitespace(String(sectionId || ''));
    const title = compactWhitespace(String(sectionTitle || ''));
    return /^B[.\-]?1[.\-]?1$/i.test(id) || /\bhistorical note\b/i.test(title);
}

function classifyBackgroundSection(sectionId = '', sectionTitle = '') {
    const id = compactWhitespace(String(sectionId || ''));
    const title = compactWhitespace(String(sectionTitle || '')).toLowerCase();

    if (isHistoricalBackgroundNote(id, title)) return 'historical_note';
    if (/sinusoid|phasor|exponential/i.test(title) || /^B[.\-]?2(?:[.\-]|$)/i.test(id)) return 'computational_core';
    if (/algebra of complex numbers|complex numbers and their algebra|complex algebra/i.test(title) || /^B[.\-]?1[.\-]?2$/i.test(id)) return 'computational_core';
    if (/introduction|overview|background/i.test(title)) return 'conceptual_intro';
    return 'background_general';
}

function getExamPriorityTopicBuckets() {
    return {
        complex_algebra: {
            label: 'Complex-number representation and algebra',
            sectionHints: ['B.1-2'],
            includeWhen: (sectionId = '', sectionTitle = '') => {
                const code = extractSectionCode(sectionId || sectionTitle).toLowerCase();
                const title = compactWhitespace(sectionTitle).toLowerCase();
                return /^b[.\-]?1[.\-]?2$/i.test(code)
                    || /algebra of complex numbers|complex algebra/.test(title);
            },
            concepts: [
                'Cartesian form of complex numbers',
                'Polar / exponential form of complex numbers',
                'Complex-plane interpretation',
                'Conversion between Cartesian and polar forms',
                'Multiplication and division of complex numbers',
                'Powers and reciprocals of complex numbers',
                'Real and imaginary parts of a complex-valued function',
                'Magnitude and phase of a complex-valued function'
            ],
            problemTypes: [
                'Convert Cartesian to polar',
                'Convert polar/exponential to Cartesian',
                'Place numbers on the complex plane',
                'Compute product and quotient in both forms',
                'Compute scalar multiples, powers, and reciprocals',
                'Rewrite a rational complex function in Cartesian form',
                'Extract real and imaginary parts',
                'Rewrite a complex function in polar form and compute magnitude/angle'
            ],
            examplePatterns: [
                'a + jb to r*e^(jθ)',
                'r*e^(jθ) to a + jb',
                'nontrivial multiplication and division',
                'reciprocal in polar form',
                'power in polar form',
                'real/imaginary/magnitude/angle extraction from F(ω)'
            ],
            traps: [
                'Wrong quadrant when computing angle',
                'Forgetting magnitude must be nonnegative',
                'Dropping the sign of the imaginary part',
                'Doing invalid termwise multiplication in Cartesian form',
                'Forgetting argument subtraction in division',
                'Missing conjugate logic in simplification'
            ]
        },
        sinusoid_phasor: {
            label: 'Sinusoid and phasor compression',
            sectionHints: ['B.2', 'B.2-1'],
            includeWhen: (sectionId = '', sectionTitle = '') => {
                const code = extractSectionCode(sectionId || sectionTitle).toLowerCase();
                const title = compactWhitespace(sectionTitle).toLowerCase();
                return /^b[.\-]?2(?:[.\-]?1)?$/i.test(code)
                    || /sinusoid|phasor|addition of sinusoids/.test(title);
            },
            concepts: [
                'Phasor interpretation of sinusoidal terms',
                'Converting a cosine-sine combination into a single sinusoid'
            ],
            problemTypes: [
                'Combine sinusoidal terms into one sinusoid'
            ],
            examplePatterns: [
                'cos(ωt) + k sin(ωt) to one sinusoid',
                'a cos(ωt) - b sin(ωt) to one sinusoid with phase explanation'
            ],
            traps: [
                'Confusing radians and informal degree intuition',
                'Getting phase sign wrong in sinusoid compression',
                'Giving amplitude without final phase-adjusted sinusoid'
            ]
        }
    };
}

function filterExamPriorityGuidanceForSection(sectionId = '', sectionTitle = '', rawGuidance = {}) {
    const buckets = getExamPriorityTopicBuckets();
    const relevantTopics = Object.entries(buckets)
        .filter(([, bucket]) => bucket.includeWhen(sectionId, sectionTitle))
        .map(([id, bucket]) => ({ id, ...bucket, includeWhen: undefined }));
    const previewOnlyTopics = Object.entries(buckets)
        .filter(([id]) => !relevantTopics.some(topic => topic.id === id))
        .map(([id, bucket]) => ({ id, label: bucket.label, sectionHints: bucket.sectionHints }));

    const sectionType = classifyBackgroundSection(sectionId, sectionTitle);
    if (!relevantTopics.length || sectionType === 'historical_note') return null;

    const flatten = (key) => [...new Set(relevantTopics.flatMap(topic => topic[key] || []))];
    return {
        ...rawGuidance,
        filtered: true,
        sectionId,
        sectionTitle,
        relevantTopics,
        previewOnlyTopics,
        json: {
            source_pdf: rawGuidance?.json?.source_pdf,
            scope: rawGuidance?.json?.scope || 'background',
            topic_filter: {
                section_id: sectionId,
                section_title: sectionTitle,
                relevant_topic_ids: relevantTopics.map(topic => topic.id),
                preview_only_topic_ids: previewOnlyTopics.map(topic => topic.id),
                rule: 'Only relevant topics may shape lesson structure, examples, quizzes, and Key Takeaways. Preview-only topics may receive at most one short bridge sentence and must not be listed as core formulas.'
            },
            high_priority_concepts: flatten('concepts'),
            high_priority_problem_types: flatten('problemTypes'),
            required_example_patterns: flatten('examplePatterns'),
            common_traps: flatten('traps'),
            explanation_bias: rawGuidance?.json?.explanation_bias || null,
            quiz_bias: rawGuidance?.json?.quiz_bias || null
        },
        markdown: [
            '# Background HW1 Distillation — Section Filtered',
            '',
            `Current section: ${sectionId || sectionTitle}`,
            `Relevant topic buckets: ${relevantTopics.map(topic => topic.id).join(', ')}`,
            previewOnlyTopics.length ? `Preview-only topic buckets: ${previewOnlyTopics.map(topic => topic.id).join(', ')}` : 'Preview-only topic buckets: none',
            '',
            '## Relevant Concepts',
            ...flatten('concepts').map(item => `- ${item}`),
            '',
            '## Relevant Problem Types',
            ...flatten('problemTypes').map(item => `- ${item}`),
            '',
            '## Required Example Patterns',
            ...flatten('examplePatterns').map(item => `- ${item}`),
            '',
            '## Common Traps',
            ...flatten('traps').map(item => `- ${item}`),
            '',
            '## Hard Rule',
            '- Section identity wins. Do not import formulas, examples, quiz bias, or Key Takeaways from non-relevant topic buckets.',
            '- Preview-only topics are limited to one short bridge sentence and must not become a teaching page.'
        ].join('\n')
    };
}

function loadExamPriorityGuidance(sectionId = '', sectionTitle = '') {
    if (!isBackgroundSection(sectionId, sectionTitle)) return null;

    const sectionType = classifyBackgroundSection(sectionId, sectionTitle);
    if (sectionType === 'historical_note') return null;

    const mdPath = path.join(EXAM_PRIORITY_DIR, 'background_hw1_distilled.md');
    const jsonPath = path.join(EXAM_PRIORITY_DIR, 'background_hw1_distilled.json');
    if (!fs.existsSync(mdPath) && !fs.existsSync(jsonPath)) return null;

    let markdown = '';
    let json = null;

    try {
        if (fs.existsSync(mdPath)) markdown = fs.readFileSync(mdPath, 'utf8');
    } catch (_) {}

    try {
        if (fs.existsSync(jsonPath)) json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    } catch (_) {}

    const rawGuidance = {
        source: 'background_hw1_distilled',
        markdown,
        json,
        sectionType
    };
    return filterExamPriorityGuidanceForSection(sectionId, sectionTitle, rawGuidance);
}

function buildSectionSpecificPromptSection(sectionId = '', sectionTitle = '') {
    const sectionType = classifyBackgroundSection(sectionId, sectionTitle);
    const id = compactWhitespace(String(sectionId || ''));
    const title = compactWhitespace(String(sectionTitle || '')).toLowerCase();

    if (/^B[.\-]?1[.\-]?2(?:\b|$)/i.test(id) || /algebra of complex numbers/i.test(title)) {
        return [
            'section_specific_rules:',
            '- This section teaches the algebra of complex numbers. Use a B.2-1-style lecture-note rhythm: context -> standalone formula -> symbol/use-case explanation -> example/trap.',
            '- Absolutely do not place a bank of all formulas immediately after the overview. No formula dump at the top.',
            '- Split the early representation formulas into separate concept-local pages: rectangular form, polar/exponential form, Euler bridge, magnitude/angle/quadrant check.',
            '- Display formulas must look like B.2-1: centered, big, and separated line-by-line. Do not use horizontal-scrolling formula strips, gathered blocks, aligned blocks, or \\\\[4pt] chains for ordinary formula lists.',
            '- Each page may contain at most one small formula family, but each equation inside the family should be its own standalone display formula when possible.',
            '- Textbook-numbered formulas like (B.1), (B.2), (B.3), etc. are key formula signals, but they must be taught locally rather than collected in one table.',
            '- Preserve enough explanation. Each formula page should explain what the symbols mean, when to use the formula, one representative example or near-miss, and one common trap when relevant.',
            '- Keep Key Takeaways complete but selective: include the core representation, conjugate, arithmetic, roots/log formulas and the quadrant rule; exclude worked-example intermediate arithmetic.'
        ].join('\n');
    }

    if (sectionType === 'historical_note') {
        return [
            'section_specific_rules:',
            '- This section is a historical note, not a complex-number skills section.',
            '- Ignore any parent-section overview text that appears before the subsection heading itself. If the OCR page begins with a broader "B.1 Complex Numbers" introduction, treat that only as setup context, not as the lesson body.',
            '- Center the lesson on how the number system expanded over time: natural numbers, fractions, irrational numbers, negative numbers, then complex numbers.',
            '- Highlight Cardano, Bombelli, and Gauss only for their historical role in making complex numbers acceptable.',
            '- Do NOT turn this lesson into Cartesian form, polar form, Euler formula, quadrant-trap, or complex-arithmetic training. Those belong to later subsections.',
            '- Do NOT teach rectangular form, real part vs imaginary part, complex-plane plotting, polar form, exponential form, Euler formula, or angle-finding in this lesson.',
            '- A brief forward-looking sentence is allowed, but the body of the lesson must stay historical and conceptual.',
            '- The concept list should contain historical milestones or acceptance milestones, not later operational tools.',
            '- Worked examples, if any, should support the historical storyline (for example, equations that forced number-system expansion), not later conversion drills.',
            '- De-emphasize exam-coaching labels such as EXAM NOTE or COMMON MISTAKE unless the OCR itself makes them central.',
            '- The formulas \\(j^2=-1\\) and \\(\\sqrt{-1}=\\pm j\\) are mandatory for B.1-1 and must appear both in the local teaching page and in Key Takeaways.'
        ].join('\n');
    }

    if (sectionType === 'conceptual_intro') {
        return [
            'section_specific_rules:',
            '- This section is a conceptual introduction, not a full computational drill.',
            '- Use exam-priority guidance only as a light weighting signal.',
            '- Keep the core identity of the section intact; do not let worked examples or trap warnings dominate the lesson.',
            '- Include at most one representative worked example unless the OCR strongly suggests more.'
        ].join('\n');
    }

    if (sectionType === 'computational_core') {
        return [
            'section_specific_rules:',
            '- This section is computationally central and may receive strong exam-priority weighting.',
            '- Favor worked examples, conversion fluency, trap warnings, and quiz alignment.'
        ].join('\n');
    }

    return '';
}

function buildExamPriorityPromptSection(guidance) {
    if (!guidance) return '';
    const parts = [
        'exam_priority_guidance_source:',
        guidance.source || 'unknown'
    ];
    if (guidance.markdown) {
        parts.push('', 'exam_priority_guidance_markdown:', guidance.markdown.trim());
    }
    if (guidance.json) {
        parts.push('', 'exam_priority_guidance_json:', JSON.stringify(guidance.json, null, 2));
    }
    parts.push(
        '',
        'exam_priority_instructions:',
        '- Treat this guidance as a weighting signal for what is likely exam-relevant.',
        '- This guidance has already been filtered by current section/topic; do not restore omitted homework topics.',
        '- Key Takeaways, formulas, worked examples, and quiz bias must come only from relevant topic buckets.',
        '- Preview-only topics may get at most one short bridge sentence and must not become a teaching page.',
        '- Do not force every page to mention the homework explicitly.',
        '- Use it to decide which concepts deserve more explanation, worked examples, trap warnings, and quiz emphasis.',
        '- Respect section identity first: historical notes stay historical, conceptual intros stay conceptual, and computational core sections may receive the strongest exam-style weighting.',
        '- For Background sections, prefer exam-style worked examples and operational fluency only when the section type is computational_core or the OCR strongly supports that emphasis.'
    );
    return parts.join('\n');
}

function buildSectionCodeRegex(sectionId = '') {
    const code = extractSectionCode(sectionId || '');
    if (!code) return null;
    const source = code
        .split('')
        .map(ch => {
            if (ch === '.' || ch === '-') return '[.\\-]?';
            return ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        })
        .join('');
    return new RegExp(source, 'i');
}

function buildHeadingTitleTokenRegex(sectionTitle = '') {
    const title = compactWhitespace(String(sectionTitle || ''))
        .replace(/^[A-Za-z]?\d+(?:[.\-]\d+)*\s*/i, '')
        .trim();
    if (!title) return null;
    const tokens = title
        .split(/[\s/:,()[\]-]+/)
        .map(token => token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .filter(token => token.length >= 3);
    if (!tokens.length) return null;
    return new RegExp(tokens.join('.*'), 'i');
}

function extractHeadingCodeFromLine(line = '') {
    const match = String(line || '').match(/^\s*([A-Za-z]?\.?\d+(?:[.\-]\d+)*)\s+\S/);
    return match ? match[1] : '';
}

function looksLikeSectionHeadingLine(line = '') {
    const text = String(line || '').trim();
    if (!text || text.length > 140) return false;
    if (/^(chapter|contents?)\b/i.test(text)) return false;
    return /^\s*[A-Za-z]?\.?\d+(?:[.\-]\d+)*\s+\S/.test(text);
}

function normalizeHeadingCompareText(text = '') {
    return String(text || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function stripHeadingCode(text = '') {
    return String(text || '').replace(/^\s*[A-Za-z]?\.?\d+(?:[.\-]\d+)*\s*/i, '').trim();
}

function isLikelyRunningSectionHeader(line = '', code = '') {
    const text = String(line || '').trim();
    if (!text) return false;
    const headingCode = extractHeadingCodeFromLine(text).toLowerCase();
    if (headingCode !== String(code || '').toLowerCase()) return false;
    return /\s+\d+\s*$/.test(text);
}

function cropOcrTextToSectionBoundaries(sectionId = '', sectionTitle = '', rawText = '') {
    const text = String(rawText || '');
    if (!text) return text;

    const lines = text.split(/\r?\n/);
    if (!lines.length) return text;

    const sectionCodeRegex = buildSectionCodeRegex(sectionId);
    const titleRegex = buildHeadingTitleTokenRegex(sectionTitle);
    const currentCode = extractSectionCode(sectionId || '');

    let startIndex = 0;
    for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i];
        if (!looksLikeSectionHeadingLine(line)) continue;
        if (!sectionCodeRegex || !sectionCodeRegex.test(line)) continue;
        if (titleRegex && !titleRegex.test(line)) continue;
        startIndex = i;
        break;
    }

    let endIndex = lines.length;
    for (let i = startIndex + 1; i < lines.length; i += 1) {
        const line = lines[i];
        if (!looksLikeSectionHeadingLine(line)) continue;
        const candidateCode = extractHeadingCodeFromLine(line);
        if (!candidateCode) continue;
        if (currentCode && candidateCode.toLowerCase() === currentCode.toLowerCase()) continue;
        endIndex = i;
        break;
    }

    const cropped = lines.slice(startIndex, endIndex).join('\n').trim();
    if (!cropped) return text;
    if (cropped.length < 160 && text.length > cropped.length * 2) return text;
    return cropped;
}

function cropOcrTextToParentPrelude(sectionId = '', sectionTitle = '', rawText = '') {
    const text = String(rawText || '');
    if (!text) return '';

    const code = extractSectionCode(sectionId || sectionTitle || '');
    if (!code || /-\d+$/.test(code)) return '';

    const lines = text.split(/\r?\n/);
    if (!lines.length) return '';

    const titleCompare = normalizeHeadingCompareText(stripHeadingCode(sectionTitle || sectionId || ''));
    let startIndex = -1;
    for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i];
        if (!looksLikeSectionHeadingLine(line)) continue;
        const headingCode = extractHeadingCodeFromLine(line).toLowerCase();
        if (headingCode !== code) continue;
        if (isLikelyRunningSectionHeader(line, code)) continue;
        if (titleCompare) {
            const lineCompare = normalizeHeadingCompareText(stripHeadingCode(line));
            if (!lineCompare.includes(titleCompare)) continue;
        }
        startIndex = i;
        break;
    }
    if (startIndex < 0) return '';

    let endIndex = lines.length;
    for (let i = startIndex + 1; i < lines.length; i += 1) {
        const line = lines[i];
        if (!looksLikeSectionHeadingLine(line)) continue;
        const candidateCode = extractHeadingCodeFromLine(line).toLowerCase();
        if (!candidateCode || candidateCode === code) continue;
        if (candidateCode.startsWith(code + '-')) {
            endIndex = i;
            break;
        }
        endIndex = i;
        break;
    }

    const cropped = lines.slice(startIndex, endIndex).join('\n').trim();
    return cropped;
}

function hasSubstantiveParentPrelude(sectionId = '', sectionTitle = '', rawText = '') {
    const prelude = cropOcrTextToParentPrelude(sectionId, sectionTitle, rawText);
    if (!prelude) return false;

    const withoutHeading = prelude
        .split(/\r?\n/)
        .filter(line => !looksLikeSectionHeadingLine(line))
        .join('\n')
        .trim();
    const compact = compactWhitespace(withoutHeading);
    const equationCount = (prelude.match(/\(B\.\d+\)|\(\d+\.\d+\)|=\s*|\\omega|ω|π|theta|θ|cos|sin/gi) || []).length;
    const sentenceCount = (compact.match(/[.!?]\s+/g) || []).length;

    return equationCount >= 3 || (compact.length >= 520 && equationCount >= 1 && sentenceCount >= 3);
}

function focusOcrTextForSection(sectionId = '', sectionTitle = '', rawText = '') {
    const text = String(rawText || '');
    if (!text) return text;

    const cropped = cropOcrTextToSectionBoundaries(sectionId, sectionTitle, text);
    const sectionType = classifyBackgroundSection(sectionId, sectionTitle);
    if (sectionType !== 'historical_note') return cropped;

    const headingPatterns = [
        new RegExp(String(sectionId || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/[.\-]/g, '[.\\-]?') + '\\s+.*historical\\s+note', 'i'),
        /\bB[.\-]?1[.\-]?1\s+.*historical\s+note/i,
        /\bhistorical\s+note\b/i
    ];

    let start = -1;
    for (const pattern of headingPatterns) {
        const match = cropped.match(pattern);
        if (match && typeof match.index === 'number') {
            start = match.index;
            break;
        }
    }

    if (start <= 0) return cropped;
    return cropped.slice(start).trim();
}

/**
 * Agent A — Lesson Architect (OpenAI GPT-5.4)
 * Reads OCR + existing page images, outputs a Rendering Blueprint JSON.
 */
async function agentA_plan(sectionId, sectionTitle, bookPages, webSources, language = 'en', userProfilePrompt = '', bookSource = 'old') {
    const ocrPages = bookPages.map(p => ({
        pageId: p.page,
        text: p.ocrOverrideText || focusOcrTextForSection(sectionId, sectionTitle, readOCRText(p.textPath, 3000))
    }));
    const existingPageImages = bookPages.map(p => p.page);
    const allowedNewBookFigures = getAllowedNewBookFigures(sectionId, bookPages, bookSource);
    const examPriorityGuidance = loadExamPriorityGuidance(sectionId, sectionTitle);
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
                            availableFigures[p.page] = filteredFigures.map(f => ({
                                fig_id: f.fig_id,
                                caption: f.caption,
                                description: f.description || f.visual_description || f.image_description || ''
                            }));
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
        path.join(TUTOR_MATERIALS_DIR, 'prompts', 'agent-a-planner.md'),
        'utf8'
    ) + '\n\n' + LESSON_GENERATION_RULES_TEXT + '\n' + AGENT_A_RULES_APPENDIX;

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
        ocrPages.map(p => `=== ${p.pageId} ===\n${p.text}`).join('\n\n'),
        '',
        VISUAL_SELECTION_DECISION_LADDER.trim(),
        buildSectionSpecificPromptSection(sectionId, sectionTitle),
        examPriorityGuidance ? `\n${buildExamPriorityPromptSection(examPriorityGuidance)}` : ''
    ].join('\n');

    console.log(`[Agent A] Planning lesson for ${sectionId} (lang=${language})…`);

    let raw = await callOpenAIChat({
        model: AGENT_A_MODEL,
        timeoutMs: 90000,
        temperature: 0.2,
        maxTokens: 18000,
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMsg }
        ]
    });

    let blueprint = tryParseJsonLoose(raw);
    if (!blueprint || !Array.isArray(blueprint.blocks)) {
        console.warn('[Agent A] Failed to parse blueprint JSON; retrying with compact visual-first contract.');
        writeDebugFile(`agentA-${sectionId.replace(/[^a-z0-9._-]/gi, '_')}-raw.txt`, raw);
        raw = await callOpenAIChat({
            model: AGENT_A_MODEL,
            timeoutMs: 90000,
            temperature: 0,
            maxTokens: 14000,
            messages: [
                {
                    role: 'system',
                    content: `${systemPrompt}\n\nRETRY CONTRACT: Return strict JSON only. Use a manageable number of blocks. Keep quiz_plan to max 5 questions unless the section genuinely needs more. Keep instructions concise but pedagogically complete: no filler, but enough explanation, examples, formula-local teaching, and trap coverage for a student to learn. Visual-first and formula-local; never formula-dump-first.`
                },
                {
                    role: 'user',
                    content: `${userMsg}\n\nYour previous output was too long or invalid. Re-plan this section as strict JSON only: overview, concept-local teaching pages where formulas appear beside their explanations, recap with key formulas only, quiz_plan with at most 5 questions unless more are essential.`
                }
            ]
        });
        blueprint = tryParseJsonLoose(raw);
        if (!blueprint || !Array.isArray(blueprint.blocks)) {
            console.warn('[Agent A] Compact retry also failed to parse JSON.');
            writeDebugFile(`agentA-${sectionId.replace(/[^a-z0-9._-]/gi, '_')}-retry-raw.txt`, raw);
            return { raw, blueprint: null };
        }
    }

    const safeSectionId = sectionId.replace(/[^a-z0-9._-]/gi, '_');
    writeDebugFile(`agentA-${safeSectionId}-raw.txt`, raw);
    writeDebugFile(`agentA-${safeSectionId}-preview.md`, buildAgentAPreviewMarkdown(blueprint, raw));

    if (!hasStudentFacingVisualBlock(blueprint)) {
        throw new Error(`Agent A planned no student-facing visual block for ${sectionId}. This is invalid under aquarius_std_v1.`);
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
                    caption: canonical.caption || '',
                    description: canonical.description || '',
                    caption_instruction: 'Add a one-sentence caption explaining what this textbook figure shows and why it matters for the core concept of this section.',
                    description_instruction: 'Use the stored figure description to describe axes, objects, relationships, and what students should notice.'
                });
                console.log(`[Agent A] Injected canonical book_image for ${sectionId}: ${page} / ${canonical.fig_id}`);
                injected = true;
                break;
            }
        }
    }

    blueprint = ensureRequiredInteractiveDemoBlocks(blueprint, sectionId, sectionTitle);
    blueprint = pruneForbiddenGenerateImageBlocks(blueprint);

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

function normalizeHistoricalBookImagePlacement(renderedBlocks, sectionId = '') {
    if (!Array.isArray(renderedBlocks) || renderedBlocks.length < 3) return renderedBlocks;
    if (String(sectionId || '').trim().toLowerCase() !== 'b.1-1') return renderedBlocks;

    const blocks = renderedBlocks.slice();
    const bookImageIndex = blocks.findIndex(block => block && block.type === 'book_image');
    if (bookImageIndex < 0) return blocks;

    const targetTextIndex = blocks.findIndex((block, index) => {
        if (!block || block.type !== 'text_explanation' || index <= bookImageIndex) return false;
        return /country x|country y|detour|city a|city b/i.test(String(block.content || ''));
    });

    if (targetTextIndex < 0 || targetTextIndex === bookImageIndex + 1) return blocks;

    const [moved] = blocks.splice(bookImageIndex, 1);
    let insertAt = targetTextIndex;
    if (bookImageIndex < insertAt) insertAt -= 1;
    blocks.splice(insertAt, 0, moved);
    console.log(`[Agent B] Repositioned historical book_image for ${sectionId} from block ${bookImageIndex} to ${insertAt}.`);
    return blocks;
}

function getSummaryHintForSection(sectionId = '', sectionTitle = '') {
    const sid = String(sectionId || '').trim().toLowerCase();
    const title = String(sectionTitle || '').trim().toLowerCase();

    if (sid === 'b.1-1' || /complex numbers|historical note/.test(title)) {
        return 'Preserve the sign-sensitive detail that sqrt(-1) = ±j and sqrt(-4) = ±2j. Do not reduce this to only j^2 = -1.';
    }

    return '';
}

async function agentB_execute(sectionId, blueprint, bookPages, webSources, language = 'en', bookSource = 'old') {
    const systemPrompt = fs.readFileSync(
        path.join(TUTOR_MATERIALS_DIR, 'prompts', 'agent-b-tutor.md'),
        'utf8'
    ) + '\n\n' + LESSON_GENERATION_RULES_TEXT + '\n' + VISUAL_SELECTION_DECISION_LADDER + '\n' + AGENT_B_RULES_APPENDIX;
    const examPriorityGuidance = loadExamPriorityGuidance(sectionId, blueprint?.section_title || sectionId);
    const summaryHint = getSummaryHintForSection(sectionId, blueprint?.section_title || sectionId);

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
                    availableFigures[p.page] = filteredFigures.map(f => ({
                        fig_id: f.fig_id,
                        caption: f.caption,
                        description: f.description || f.visual_description || f.image_description || ''
                    }));
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
        },
        section_specific_rules: buildSectionSpecificPromptSection(sectionId, blueprint?.section_title || sectionId) || null,
        summary_hint: summaryHint || null,
        exam_priority_guidance: examPriorityGuidance ? {
            source: examPriorityGuidance.source,
            markdown: examPriorityGuidance.markdown || '',
            json: examPriorityGuidance.json || null,
            usage_instruction: 'Use this only as a weighting signal for emphasis, worked examples, trap warnings, and quiz bias in Background sections.'
        } : null
    };

    const userMsg = JSON.stringify(payload, null, 2);
    const safeSectionId = sectionId.replace(/[^a-z0-9._-]/gi, '_');
    writeDebugFile(`agentB-${safeSectionId}-input.json`, userMsg);

    console.log(`[Agent B] Executing ${blueprint.blocks.length} blocks…`);

    let raw;
    const agentBStartTs = Date.now();
    try {
        console.log(`[Agent B] Request start for ${sectionId} using model ${AGENT_B_MODEL} at ${new Date(agentBStartTs).toISOString()}`);
        raw = await callOpenRouterChat({
            model: AGENT_B_MODEL,
            timeoutMs: 120000,
            temperature: 0.2,
            maxTokens: 12000,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userMsg }
            ]
        });
        console.log(`[Agent B] Request done for ${sectionId} in ${Date.now() - agentBStartTs}ms; raw length=${String(raw || '').length}`);
    } catch (err) {
        throw new Error(`[Agent B:${sectionId}] ${err.message}`);
    }

    // Try to parse Agent B's JSON output and convert to Markdown
    let rendered = tryParseJsonLoose(raw);
    if (!rendered || !Array.isArray(rendered.rendered_blocks)) {
        console.warn('[Agent B] First pass was not valid JSON. Retrying with strict compact-output instruction.');
        try {
            const agentBRetryStartTs = Date.now();
            console.log(`[Agent B] Retry start for ${sectionId} at ${new Date(agentBRetryStartTs).toISOString()}`);
            raw = await callOpenRouterChat({
                model: AGENT_B_MODEL,
                timeoutMs: 120000,
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
            console.log(`[Agent B] Retry done for ${sectionId} in ${Date.now() - agentBRetryStartTs}ms; raw length=${String(raw || '').length}`);
        } catch (err) {
            throw new Error(`[Agent B:${sectionId}:retry] ${err.message}`);
        }
        rendered = tryParseJsonLoose(raw);
    }

    if (rendered && Array.isArray(rendered.rendered_blocks)) {
        console.log(`[Agent B] JSON OK — ${rendered.rendered_blocks.length} blocks`);
        if (blueprint.visual_plan && !rendered.visual_plan) rendered.visual_plan = blueprint.visual_plan;
        rendered.rendered_blocks = normalizePairedVisualPlacement(rendered.rendered_blocks, rendered.visual_plan || blueprint.visual_plan || null);
        rendered.rendered_blocks = normalizeHistoricalBookImagePlacement(rendered.rendered_blocks, sectionId);
        // Auto-fill missing fig_id for book_image blocks using metadata
        rendered.rendered_blocks.forEach((b, i) => {
            const planned = (blueprint.blocks || [])[i] || null;
            if (planned && !b.teaching_role && planned.teaching_role) b.teaching_role = planned.teaching_role;
            if (planned && !b.mode_specific_visual_use && planned.mode_specific_visual_use) {
                b.mode_specific_visual_use = planned.mode_specific_visual_use;
            }
            if (planned && b.type === 'web_search_image') {
                if (!b.search_query && planned.search_query) b.search_query = planned.search_query;
                if (!b.query && planned.query) b.query = planned.query;
                if (!b.purpose && planned.purpose) b.purpose = planned.purpose;
                if (!b.caption && planned.caption) b.caption = planned.caption;
                if (!b.fallback && planned.fallback) b.fallback = planned.fallback;
            }
            if (planned && b.type === 'book_image') {
                if (!b.source_page && planned.source_page) b.source_page = planned.source_page;
                if (!b.caption && planned.caption) b.caption = planned.caption;
                if (!b.description && planned.description) b.description = planned.description;
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
        const markdownStartTs = Date.now();
        const lessonMarkdown = await blueprintToMarkdown(
            rendered.rendered_blocks,
            existingPageImages,
            rendered.visual_plan || blueprint.visual_plan || null,
            bookPages,
            sectionId,
            bookSource,
            blueprint.blocks || []
        );
        console.log(`[Agent B] blueprintToMarkdown done for ${sectionId} in ${Date.now() - markdownStartTs}ms; markdown length=${String(lessonMarkdown || '').length}`);
        return lessonMarkdown;
    }

    console.warn('[Agent B] Refusing raw markdown fallback. First 400 chars:', raw.slice(0, 400));
    throw new Error(`[Agent B:${sectionId}] invalid JSON after retry; refusing raw markdown fallback to avoid malformed lesson formatting.`);
}

async function collectSectionWebSources(sectionId, sectionTitle, bookSource = 'old') {
    const queries = [];
    const cleanTitle = compactWhitespace(sectionTitle || '');
    if (cleanTitle) {
        queries.push(`${cleanTitle} site:wikipedia.org`);
        queries.push(`${cleanTitle} site:wikimedia.org`);
    }
    queries.push(`${sectionId} signal processing site:wikipedia.org`);

    const results = [];
    const seen = new Set();
    for (const query of queries) {
        const batch = [
            ...(await wikipediaSearch(query)),
            ...(await duckDuckGoSearch(query))
        ];
        for (const item of batch) {
            const urlValue = normalizeUrl(item && item.url ? item.url : '');
            if (!urlValue || seen.has(urlValue)) continue;
            seen.add(urlValue);
            results.push({
                title: compactWhitespace(item.title || ''),
                url: urlValue,
                snippet: compactWhitespace(item.snippet || '')
            });
            if (results.length >= 8) return sortSourcesByType(results);
        }
    }
    return sortSourcesByType(results);
}

async function preGenerateSectionLesson(sectionId, sectionTitle, options = {}) {
    const language = options.language === 'zh' ? 'zh' : 'en';
    const bookSource = options.bookSource === 'new' ? 'new' : 'old';
    const cacheVariant = options.cacheVariant || 'lesson';
    const uid = options.uid || null;
    const profileMemory = options.profileMemory || (uid ? readUserMemory(uid) : null) || { quiz: {} };
    const userProfilePrompt = buildUserProfilePrompt(profileMemory);
    const { ocrDir: secOcrDir } = getBookDirs(bookSource);

    const mappedPages = getPagesForSection(sectionId, secOcrDir);
    if (!mappedPages.length) {
        throw new Error(`No pages mapped for section ${sectionId}`);
    }
    const preludePages = shouldGenerateParentPreludeLesson(sectionId, sectionTitle, mappedPages)
        ? getParentPreludePages(sectionId, sectionTitle, mappedPages)
        : [];
    const rawPages = preludePages.length ? preludePages : mappedPages;

    const cachedLesson = readLessonCache(sectionId, profileMemory, bookSource, cacheVariant);
    if (cachedLesson && !options.force) {
        return {
            sectionId,
            sectionTitle,
            cacheVersion: LESSON_CACHE_VERSION,
            cached: true,
            skipped: true,
            lesson: prepareLessonForCache(sectionId, cachedLesson),
            webSources: []
        };
    }

    let webSources = [];
    try {
        webSources = await collectSectionWebSources(sectionId, sectionTitle, bookSource);
    } catch (err) {
        console.error(`[Pregen:${sectionId}] collectSectionWebSources failed:`, err && err.stack ? err.stack : err);
        throw err;
    }

    let lesson = '';
    try {
        lesson = await generateSectionLesson(
            sectionId,
            sectionTitle,
            rawPages,
            webSources,
            language,
            userProfilePrompt,
            bookSource
        );
    } catch (err) {
        console.error(`[Pregen:${sectionId}] generateSectionLesson failed:`, err && err.stack ? err.stack : err);
        throw err;
    }

    let normalizedLesson = '';
    try {
        normalizedLesson = prepareLessonForCache(sectionId, lesson);
        assertLessonFormatClean(sectionId, normalizedLesson, 'pregenerate');
    } catch (err) {
        console.error(`[Pregen:${sectionId}] post-normalization failed:`, err && err.stack ? err.stack : err);
        throw err;
    }

    try {
        writeLessonCache(sectionId, profileMemory, normalizedLesson, bookSource, cacheVariant);
    } catch (err) {
        console.error(`[Pregen:${sectionId}] writeLessonCache failed:`, err && err.stack ? err.stack : err);
        throw err;
    }

    return {
        sectionId,
        sectionTitle,
        cacheVersion: LESSON_CACHE_VERSION,
        cached: false,
        skipped: false,
        lesson: normalizedLesson,
        webSources
    };
}

function getParentPreludePages(sectionId, sectionTitle, bookPages = []) {
    const out = [];
    for (const page of bookPages || []) {
        const raw = readOCRText(page.textPath, 7000);
        const preludeText = cropOcrTextToParentPrelude(sectionId, sectionTitle, raw);
        if (!preludeText) continue;
        out.push({
            ...page,
            ocrOverrideText: preludeText,
            title: `${sectionTitle} prelude`
        });
    }
    return out;
}

function shouldGenerateParentPreludeLesson(sectionId, sectionTitle, bookPages = []) {
    const code = extractSectionCode(sectionId || sectionTitle || '');
    if (!code || /-\d+$/.test(code)) return false;
    return (bookPages || []).some(page => hasSubstantiveParentPrelude(sectionId, sectionTitle, readOCRText(page.textPath, 7000)));
}

/**
 * Convert Agent B's rendered_blocks JSON → Markdown string for the frontend.
 */
function extractPlannedKnowledgeHeading(plannedBlock = null) {
    if (!plannedBlock || typeof plannedBlock !== 'object') return '';
    const candidates = [
        plannedBlock.page_title,
        plannedBlock.explanation_instruction,
        plannedBlock.instruction,
        plannedBlock.heading,
        plannedBlock.title
    ].filter(Boolean).map(v => String(v));

    for (const text of candidates) {
        const quotedMatch = text.match(/heading[:\s]+['"]?(##\s+[^'"\n]+)['"]?/i);
        if (quotedMatch && quotedMatch[1]) return compactWhitespace(quotedMatch[1]).trim();
        const titledMatch = text.match(/\btitled\s+['"]?(##\s+[^'"\n]+)['"]?/i);
        if (titledMatch && titledMatch[1]) return compactWhitespace(titledMatch[1]).trim();
        const lineMatch = text.match(/^\s*(##\s+[^\n]+)/m);
        if (lineMatch && lineMatch[1]) return compactWhitespace(lineMatch[1]).trim();
    }
    return '';
}

function renderedBlockStartsWithKnowledgeHeading(block = null) {
    if (!block || typeof block !== 'object') return false;
    if (block.type !== 'text_explanation' && block.type !== 'analogy') return false;
    return /^\s*##\s+/.test(String(block.content || ''));
}

function normalizeKnowledgeHeadingText(text = '') {
    return compactWhitespace(String(text || ''))
        .replace(/^\s*##\s+/, '')
        .replace(/[“”"']/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
}

function extractRenderedKnowledgeHeading(block = null) {
    if (!block || typeof block !== 'object') return '';

    const candidates = [];
    if (block.type === 'text_explanation' || block.type === 'analogy') {
        candidates.push(String(block.content || ''));
    }
    if (block.type === 'math_block') {
        candidates.push(String(block.explanation || ''));
    }

    for (const text of candidates) {
        const lineMatch = text.match(/^\s*(##\s+[^\n]+)/m);
        if (lineMatch && lineMatch[1]) return compactWhitespace(lineMatch[1]).trim();
    }
    return '';
}

function stripLeadingKnowledgeHeading(text = '') {
    const raw = String(text || '');
    return raw.replace(/^\s*##\s+[^\n]+\n*/, '').trimStart();
}

function pushMathBlockExplanation(parts, explanationText = '', options = {}) {
    const text = String(explanationText || '').trim();
    if (!text) return;
    if (options.asProse) {
        parts.push(text);
        return;
    }
    if (/^\s*##\s+/m.test(text) || /^\s*###\s+/m.test(text)) {
        parts.push(text);
    } else {
        parts.push(`*${text}*`);
    }
}

function isOverviewLikeContent(text = '') {
    const raw = String(text || '');
    return /^\s*#\s+/m.test(raw)
        || /section objective/i.test(raw)
        || /concepts in this section/i.test(raw);
}

function isKnowledgeBearingRenderedBlock(block = null) {
    if (!block || typeof block !== 'object') return false;
    if (block.type === 'math_block') return true;
    if (block.type === 'text_explanation' || block.type === 'analogy') {
        return !isOverviewLikeContent(block.content || '');
    }
    return false;
}

async function blueprintToMarkdown(blocks, pageImages, visualPlan = null, bookPages = [], sectionId = '', bookSource = 'old', plannedBlocks = []) {
    const parts = [];
    const allowedSourcePages = new Set((Array.isArray(bookPages) ? bookPages : []).map(p => compactWhitespace((p && p.page) || '')));
    const allowedNewBookFigures = getAllowedNewBookFigures(sectionId, bookPages, bookSource);
    const plannedKnowledgeHeadings = (Array.isArray(plannedBlocks) ? plannedBlocks : [])
        .map(extractPlannedKnowledgeHeading)
        .filter(Boolean);
    let plannedHeadingCursor = 0;

    if (visualPlan) {
        const b64 = Buffer.from(JSON.stringify(visualPlan || {})).toString('base64');
        parts.push(`%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="${b64}" style="display:none;"></div>%%KC_END%%`);
    }

    let skipNextGeneratedFallback = false;
    for (let idx = 0; idx < blocks.length; idx += 1) {
        const block = blocks[idx];
        if (isKnowledgeBearingRenderedBlock(block)) {
            const embeddedHeading = extractRenderedKnowledgeHeading(block);
            const nextPlannedHeading = plannedKnowledgeHeadings[plannedHeadingCursor] || '';
            const embeddedKey = normalizeKnowledgeHeadingText(embeddedHeading);
            const plannedKey = normalizeKnowledgeHeadingText(nextPlannedHeading);

            if (embeddedHeading) {
                if (plannedKey && embeddedKey === plannedKey) {
                    plannedHeadingCursor += 1;
                    if (block.type === 'math_block') {
                        block.__knowledgeHeadingBeforeMath = embeddedHeading;
                        block.explanation = stripLeadingKnowledgeHeading(block.explanation || '');
                    }
                } else if (nextPlannedHeading) {
                    if (block.type === 'text_explanation' || block.type === 'analogy') {
                        block.content = stripLeadingKnowledgeHeading(block.content || '');
                    } else if (block.type === 'math_block') {
                        block.explanation = stripLeadingKnowledgeHeading(block.explanation || '');
                    }
                    parts.push(nextPlannedHeading);
                    parts.push('');
                    if (block.type === 'math_block') {
                        block.__mathHasPriorKnowledgeHeading = true;
                    }
                    plannedHeadingCursor += 1;
                } else if (block.type === 'math_block') {
                    block.__knowledgeHeadingBeforeMath = embeddedHeading;
                    block.explanation = stripLeadingKnowledgeHeading(block.explanation || '');
                }
            } else if (nextPlannedHeading) {
                parts.push(nextPlannedHeading);
                parts.push('');
                if (block.type === 'math_block') {
                    block.__mathHasPriorKnowledgeHeading = true;
                }
                plannedHeadingCursor += 1;
            }
        }
        switch (block.type) {
            case 'text_explanation':
            case 'analogy':
                parts.push(block.content || '');
                break;

            case 'math_block':
                if (block.__knowledgeHeadingBeforeMath) {
                    parts.push(block.__knowledgeHeadingBeforeMath);
                    parts.push('');
                }
                if ((block.__knowledgeHeadingBeforeMath || block.__mathHasPriorKnowledgeHeading) && block.explanation) {
                    pushMathBlockExplanation(parts, block.explanation, { asProse: true });
                    parts.push('');
                }
                parts.push(`$$${block.latex}$$`);
                if (block.explanation && !block.__knowledgeHeadingBeforeMath && !block.__mathHasPriorKnowledgeHeading) {
                    pushMathBlockExplanation(parts, block.explanation);
                }
                break;

            case 'book_image': {
                let sourcePage = compactWhitespace(block.source_page || '');
                const figId = block.fig_id || '';
                const cropHint = block.crop_hint || 'full'; // left_half | right_half | full | top_third

                if (!sourcePage && block.file_path) {
                    const pageMatch = String(block.file_path).match(/page[-_](\d{3})/i);
                    if (pageMatch) sourcePage = `page-${pageMatch[1]}`;
                }

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
                        block.description = block.description || fig.description || fig.visual_description || fig.image_description || '';
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
                    if (block.description) {
                        parts.push(`<div class="lesson-figure-description">${escapeHtmlInline(block.description)}</div>`);
                    }
                } else if (bookSource !== 'new') {
                    const reason = block.warning || `no allowed figure or page image found for ${sourcePage}${figId ? ` (${figId})` : ''}`;
                    parts.push(`*(Figure unavailable: ${reason})*`);
                }
                break;
            }

            case 'web_search_image':
                try {
                    const query = compactWhitespace(block.search_query || block.query || '');
                    if (shouldPreferLatexConceptVisual(query, block.title || '')) {
                        const latexMarkdown = buildLatexConceptVisualMarkdown(query);
                        if (latexMarkdown) {
                            parts.push(latexMarkdown);
                            skipNextGeneratedFallback = true;
                            break;
                        }
                    }
                    const resolved = await resolveReferenceImageForQuery(query, {
                        preferAnimated: Boolean(block.prefer_animated)
                    });
                    if (resolved && resolved.url) {
                        block.selected_url = resolved.url;
                        block.selected_source = resolved.source;
                        block.selected_title = resolved.title;
                        block.selected_mime = resolved.mime;
                        block.fallback_triggered = false;
                        const metaHtml = `<div class="kc-visual-meta" data-visual-kind="web_reference_image" data-teaching-role="${escapeHtmlAttr(block.teaching_role || 'reference_anchor')}" data-visual-use-b64="${Buffer.from(JSON.stringify(block.mode_specific_visual_use || {})).toString('base64')}" style="display:none;"></div>`;
                        parts.push(`%%KC_BLOCK%%${metaHtml}%%KC_END%%`);
                        const altText = String(resolved.title || 'Reference illustration').replace(/[\]\[]/g, '');
                        parts.push(`![${altText}](${resolved.url})`);
                        const sourceLabel = resolved.source === 'wikimedia' ? 'Wikimedia Commons' : 'Wikipedia';
                        if (block.caption) {
                            parts.push(`*${block.caption}*`);
                        } else if (resolved.title) {
                            parts.push(`*Reference visual from ${sourceLabel}: ${resolved.title}*`);
                        }
                        const mediaNote = String(resolved.mime || '').toLowerCase().includes('gif')
                            ? 'Animated reference'
                            : 'Reference image';
                        parts.push(`%%KC_BLOCK%%<div class="kc-reference-source"><a href="${resolved.url}" target="_blank" rel="noopener noreferrer">${mediaNote} from ${sourceLabel}</a></div>%%KC_END%%`);
                        skipNextGeneratedFallback = true;
                    } else {
                        block.fallback_triggered = true;
                        skipNextGeneratedFallback = block.fallback !== 'generate_image';
                    }
                } catch (err) {
                    console.warn('[LessonImage] web_search_image failed; falling back silently:', err.message);
                    block.fallback_triggered = true;
                    skipNextGeneratedFallback = block.fallback !== 'generate_image';
                }
                break;

            case 'generate_image': {
                if (skipNextGeneratedFallback) {
                    skipNextGeneratedFallback = false;
                    break;
                }
                const rawPrompt = block.prompt || block.spec || (block.python_spec && (block.python_spec.description || block.python_spec.title)) || block.reason || 'educational illustration';
                if (shouldPreferLatexConceptVisual(rawPrompt, block.title || '')) {
                    const latexMarkdown = buildLatexConceptVisualMarkdown(rawPrompt);
                    if (latexMarkdown) {
                        parts.push(latexMarkdown);
                        break;
                    }
                }
                const metaHtml = (block.teaching_role || block.mode_specific_visual_use)
                    ? `<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="${escapeHtmlAttr(block.teaching_role || '')}" data-visual-use-b64="${Buffer.from(JSON.stringify(block.mode_specific_visual_use || {})).toString('base64')}" style="display:none;"></div>`
                    : '';
                const stylePrefix = 'Use this only as a last-resort fallback after textbook figure, wiki/wikimedia, LaTeX-native visual, and interactive-demo options are judged insufficient. Exactly one knowledge point only. Never combine multiple concepts into one image. No collage, no dashboard, no multi-topic poster, no multi-panel concept bundle. Pure white clean background, minimalist lecture-notes educational diagram, centered academic layout, single clear reading path, low-saturation academic palette, navy / muted teal / soft gray with muted red only for warnings, clean linework, restrained colored teaching boxes, no poster styling, no cartoon elements, no dense text blocks, no full derivation, no extra examples, exam-oriented concept clarity. ';
                const prompt = `${stylePrefix}${rawPrompt}`.trim();
                try {
                    const imageTimeoutMs = Number(block.timeout_ms || (block.optional ? 120000 : 240000));
                    const imgResult = await callTutorSkillRaw(prompt, { timeoutMs: imageTimeoutMs });
                    const urls = extractRenderableImageUrls(imgResult);
                    if (urls.length > 0) {
                        if (metaHtml) parts.push(`%%KC_BLOCK%%${metaHtml}%%KC_END%%`);
                        if (block.caption) parts.push(`*🎨 ${block.caption}*`);
                        parts.push(`![Illustration](${urls[0]})`);
                    } else {
                        throw new Error('generate_image returned no renderable URL');
                    }
                } catch (e) {
                    console.warn('[LessonImage] generate_image failed; continuing without image:', e.message);
                    if (block.caption) {
                        parts.push(`*${block.caption}*`);
                    }
                    parts.push(`*(Illustration unavailable: ${escapeHtmlInline(e.message || 'image generation failed')})*`);
                }
                break;
            }

            case 'interactive_demo': {
                const demoB64 = Buffer.from(JSON.stringify(block || {})).toString('base64');
                const metaHtml = `<div class="kc-visual-meta" data-visual-kind="interactive_demo" data-teaching-role="${escapeHtmlAttr(block.teaching_role || 'interactive_demo')}" data-visual-use-b64="${Buffer.from(JSON.stringify(block.mode_specific_visual_use || {})).toString('base64')}" style="display:none;"></div>`;
                const shell = `<div class="kc-interactive-demo" data-demo-b64="${demoB64}"></div>`;
                parts.push(`%%KC_BLOCK%%${metaHtml}${shell}%%KC_END%%`);
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

function sectionIdToBlueprintCandidates(sectionId = '') {
    const raw = compactWhitespace(sectionId || '');
    if (!raw) return [];

    const normalized = raw
        .replace(/\s+/g, ' ')
        .replace(/_/g, '-')
        .trim();

    const variants = new Set();
    variants.add(normalized);
    variants.add(normalized.replace(/\./g, '_'));
    variants.add(normalized.replace(/\./g, '_').replace(/-/g, '_'));
    variants.add(normalized.replace(/\./g, '-'));
    variants.add(normalized.toUpperCase());
    const compactAlphaNumeric = normalized.replace(/\./g, '').replace(/-/g, '_');
    variants.add(compactAlphaNumeric);
    variants.add(compactAlphaNumeric.toUpperCase());

    const files = [];
    for (const base of variants) {
        const upper = base.toUpperCase();
        files.push(`${upper}_BLUEPRINT_EXECUTABLE.json`);
    }
    return [...new Set(files)];
}

function loadExternalBlueprint(sectionId = '') {
    console.log(`[Blueprint] External blueprint disabled globally for ${sectionId}; forcing Agent A -> Agent B pipeline.`);
    return null;
}

async function prewarmLessonVariants(sectionId, sectionTitle, bookPages, baseMemory, bookSource = 'new', language = 'en') {
    return { scheduled: 0, generated: 0, disabled: true };
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
    const finalizeLesson = (markdown) => normalizeLessonVisualPolicy(markdown, language);

    try {
        const result = await agentA_plan(sectionId, sectionTitle, bookPages, webSources, language, userProfilePrompt, bookSource);
        blueprint = result.blueprint;
        agentARaw = String(result.raw || '');
    } catch (err) {
        console.error('[Agent A] Error:', err.message);
        throw new Error(`Agent A planning failed for ${sectionId}: ${err.message}`);
    }

    if (!blueprint) {
        throw new Error(`Agent A planning failed for ${sectionId}: no blueprint returned.`);
    }

    // ── Agent B: Execute ───────────────────────────────────────────────────────
    let lesson = '';
    try {
        lesson = await agentB_execute(sectionId, blueprint, bookPages, webSources, language, bookSource);
    } catch (err) {
        console.error(`[Agent B:${sectionId}] execute failed:`, err && err.stack ? err.stack : err);
        throw err;
    }

    try {
        return finalizeLesson(lesson);
    } catch (err) {
        console.error(`[LessonFinalize:${sectionId}] finalizeLesson failed:`, err && err.stack ? err.stack : err);
        throw err;
    }
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
async function callTutorSkillRaw(prompt, options = {}) {
    return new Promise((resolve, reject) => {
        const timeoutMs = Number(options.timeoutMs || process.env.TUTOR_SKILL_TIMEOUT_MS || 45000);
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
            if (code !== 0) {
                writeDebugFile('image-skill-last-error.log', stderr || `Skill exited with code ${code}`);
                return reject(new Error((stderr || `Skill exited with code ${code}`).trim()));
            }

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
                if (data.preferenceProfile && typeof data.preferenceProfile === 'object') {
                    existing.preferenceProfile = {
                        ...(existing.preferenceProfile || {}),
                        ...data.preferenceProfile
                    };
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
            const b8FormulaAppendix = getB8FormulaAppendix(sectionId, sectionTitle);
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
                image: getPageImageUrl(data.bookSource, item.pageImage)
            }));

            if (b8FormulaAppendix && mode === 'lesson') {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    sectionId,
                    sectionTitle,
                    lesson: b8FormulaAppendix,
                    cached: true,
                    formulaAppendix: true,
                    bookPages: bookPages.map(p => ({
                        page: p.page,
                        image: p.image,
                        subsection: p.subsection,
                        title: p.title,
                        summary: p.summary
                    })),
                    webSources: []
                }));
                return;
            }

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
            } else if (mode === 'overview') {
                const hasPrelude = shouldGenerateParentPreludeLesson(sectionId, sectionTitle, rawPages);
                let cachedLesson = hasPrelude ? readLessonCache(sectionId, profileMemory, data.bookSource, 'parent_prelude') : null;
                const normalizedCachedLesson = cachedLesson
                    ? normalizeMathMarkdown(convertLegacyQuickCheckToKcBlocks(cachedLesson))
                    : '';
                const responseFormatIssues = normalizedCachedLesson ? collectLessonFormatIssues(normalizedCachedLesson) : [];
                let generatedResult = null;

                if (hasPrelude && (!normalizedCachedLesson || responseFormatIssues.length)) {
                    generatedResult = await preGenerateSectionLesson(sectionId, sectionTitle, {
                        language,
                        bookSource: data.bookSource,
                        uid,
                        profileMemory,
                        cacheVariant: 'parent_prelude',
                        force: Boolean(responseFormatIssues.length)
                    });
                    cachedLesson = generatedResult.lesson || readLessonCache(sectionId, profileMemory, data.bookSource, 'parent_prelude');
                }

                const finalLesson = cachedLesson
                    ? normalizeMathMarkdown(convertLegacyQuickCheckToKcBlocks(cachedLesson))
                    : '';
                const finalIssues = finalLesson ? collectLessonFormatIssues(finalLesson) : [];

                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    sectionId,
                    sectionTitle,
                    hasPrelude,
                    cached: Boolean(normalizedCachedLesson && !responseFormatIssues.length),
                    generated: Boolean(generatedResult && !generatedResult.skipped),
                    cacheMiss: Boolean(hasPrelude && (!finalLesson || finalIssues.length)),
                    cacheVersion: LESSON_CACHE_VERSION,
                    lesson: finalLesson && !finalIssues.length ? finalLesson : '',
                    bookPages: bookPages.map(p => ({
                        page: p.page,
                        image: p.image,
                        subsection: p.subsection,
                        title: p.title,
                        summary: p.summary
                    })),
                    webSources: []
                }));
            } else if (mode === 'lesson') {
                // ── Check lesson cache first ──────────────────────────────
                const cachedLesson = readLessonCache(sectionId, profileMemory, data.bookSource);
                if (cachedLesson) {
                    console.log(`[SECTION] Cache hit for ${sectionId}, skipping pipeline.`);
                    const normalizedCachedLesson = normalizeMathMarkdown(convertLegacyQuickCheckToKcBlocks(cachedLesson));
                    const responseFormatIssues = collectLessonFormatIssues(normalizedCachedLesson);
                    if (responseFormatIssues.length) {
                        console.warn(`[SECTION] Cache response rejected for ${sectionId}: ${responseFormatIssues.join(', ')}`);
                    } else {
                        if (normalizedCachedLesson !== cachedLesson && profileMemory) {
                            writeLessonCache(sectionId, profileMemory, normalizedCachedLesson, data.bookSource);
                        }
                        const activeCacheExists = !!buildLessonCacheKey(profileMemory, data.bookSource)
                            && fs.existsSync(path.join(LESSON_CACHE_DIR, normalizeSectionId(sectionId), `${buildLessonCacheKey(profileMemory, data.bookSource)}.${LESSON_CACHE_VERSION}.en.md`));

                        if (hasVisualMetadataMarkup(normalizedCachedLesson)
                            && !hasDisallowedNewBookPageFallback(normalizedCachedLesson, sectionId, rawPages, data.bookSource)
                            && !hasDisallowedNewBookFigureRefs(normalizedCachedLesson, sectionId, rawPages, data.bookSource)
                            && !hasNewBookFigureUnavailablePlaceholder(normalizedCachedLesson, data.bookSource)
                            && !hasIllustrationUnavailablePlaceholder(normalizedCachedLesson)
                            && (!activeCacheExists || !hasLegacyGeneratedVisualArtifacts(normalizedCachedLesson))) {
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
                    }
                    console.warn(`[SECTION] Cache for ${sectionId} is stale or invalid under ${LESSON_CACHE_VERSION}; treating as miss.`);
                }
                console.log(`[SECTION] Cache miss for ${sectionId} under ${LESSON_CACHE_VERSION}; runtime generation disabled.`);
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    sectionId,
                    sectionTitle,
                    lesson: LESSON_CACHE_MISS_MESSAGE,
                    cached: false,
                    cacheMiss: true,
                    cacheVersion: LESSON_CACHE_VERSION,
                    bookPages: bookPages.map(p => ({
                        page: p.page,
                        image: p.image,
                        subsection: p.subsection,
                        title: p.title,
                        summary: p.summary
                    })),
                    webSources: []
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

    if (pathname === '/api/pregen/section' && req.method === 'POST') {
        try {
            const data = await readJsonBody(req);
            const sectionId = compactWhitespace(data.sectionId || '');
            const sectionTitle = compactWhitespace(data.sectionTitle || sectionId);
            if (!sectionId) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Missing sectionId' }));
                return;
            }

            const result = await preGenerateSectionLesson(sectionId, sectionTitle, {
                language: data.language,
                bookSource: data.bookSource,
                uid: data.uid,
                force: !!data.force,
                cacheVariant: data.cacheVariant
            });

            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({
                ok: true,
                ...result,
                lessonPreview: String(result.lesson || '').slice(0, 600)
            }));
        } catch (err) {
            console.error('[API /api/pregen/section] Error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: err.message || 'Unknown error' }));
        }
        return;
    }

    if (pathname === '/api/preference/draft' && req.method === 'POST') {
        try {
            const data = await readJsonBody(req);
            const currentProfile = compactWhitespace(data.currentProfile || '').slice(0, 6000);
            const instruction = compactWhitespace(data.instruction || '').slice(0, 1200);
            if (!instruction) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Missing instruction' }));
                return;
            }
            const messages = [
                {
                    role: 'system',
                    content: [
                        'You rewrite a student learning preference profile for an AI tutor.',
                        'Return ONLY the rewritten Markdown profile.',
                        'Do not add commentary, explanations, code fences, YAML, JSON, or version history.',
                        'Keep it practical for prompt injection: goals, preferred teaching style, friction points, and tutor behavior.',
                        'Preserve useful existing details unless the user asks to change them.',
                        'Use concise Markdown headings and bullets.'
                    ].join(' ')
                },
                {
                    role: 'user',
                    content: [
                        '[Current Profile]',
                        currentProfile || '(empty)',
                        '',
                        '[Student Edit Request]',
                        instruction
                    ].join('\n')
                }
            ];
            const draft = await callOpenRouterChat({
                model: 'anthropic/claude-haiku-4.5',
                messages,
                timeoutMs: 45000,
                temperature: 0.25,
                maxTokens: 1100
            });
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ ok: true, draft: draft.trim() }));
        } catch (err) {
            console.error('[API /api/preference/draft] Error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: err.message || 'Preference draft failed' }));
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
            const incomingBookPages = filterPagesForBookSource(data.bookPages, data.bookSource);
            if (Array.isArray(data.bookPages) && data.bookPages.length && !incomingBookPages.length) {
                console.warn(`[ASK] Dropped ${data.bookPages.length} stale bookPages due to bookSource=${data.bookSource || 'old'} mismatch`);
            }

            if (incomingBookPages.length) {
                relatedBooks = incomingBookPages.map(item => ({
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
                    image: item.image || getPageImageUrl(data.bookSource, item.pageImage),
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
            indexedPages: {
                old: getBookIndex(OCR_DIR_OLD).length,
                new: getBookIndex(OCR_DIR_NEW).length
            },
            apiAsk: true,
            apiTutor: true,
            skillScript: SKILL_SCRIPT
        }));
        return;
    }

    if (pathname === '/api/feedback' && req.method === 'GET') {
        const board = readFeedbackBoard();
        const items = board.items
            .slice()
            .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
            .map(publicFeedbackItem);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ items }));
        return;
    }

    if (pathname === '/api/feedback' && req.method === 'POST') {
        try {
            const data = await readJsonBody(req);
            const title = cleanFeedbackText(data.title, 120);
            const body = cleanFeedbackText(data.body, 1200);
            const author = cleanFeedbackText(data.author, 60) || 'Anonymous';
            if (!title || !body) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'title and body are required' }));
                return;
            }
            const board = readFeedbackBoard();
            const item = {
                id: `fb_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
                title,
                body,
                author,
                createdAt: new Date().toISOString(),
                replies: []
            };
            board.items.unshift(item);
            board.items = board.items.slice(0, 300);
            writeFeedbackBoard(board);
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ item: publicFeedbackItem(item) }));
        } catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: err.message || 'bad request' }));
        }
        return;
    }

    const feedbackReplyMatch = pathname.match(/^\/api\/feedback\/([^/]+)\/replies$/);
    if (feedbackReplyMatch && req.method === 'POST') {
        try {
            const id = decodeURIComponent(feedbackReplyMatch[1] || '');
            const data = await readJsonBody(req);
            const body = cleanFeedbackText(data.body, 800);
            const author = cleanFeedbackText(data.author, 60) || 'Anonymous';
            if (!id || !body) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'feedback id and body are required' }));
                return;
            }
            const board = readFeedbackBoard();
            const item = board.items.find(entry => entry.id === id);
            if (!item) {
                res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'feedback item not found' }));
                return;
            }
            const reply = {
                id: `rp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
                body,
                author,
                createdAt: new Date().toISOString()
            };
            item.replies = Array.isArray(item.replies) ? item.replies : [];
            item.replies.push(reply);
            item.replies = item.replies.slice(-200);
            writeFeedbackBoard(board);
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ item: publicFeedbackItem(item), reply }));
        } catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: err.message || 'bad request' }));
        }
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

    if (pathname.startsWith('/old-pages/')) {
        const filename = pathname.replace(/^\/old-pages\//, '');
        serveStaticFromDir(res, PAGE_IMAGE_DIR_OLD, filename);
        return;
    }

    if (pathname.startsWith('/new-pages/')) {
        const filename = pathname.replace(/^\/new-pages\//, '');
        serveStaticFromDir(res, PAGE_IMAGE_DIR_NEW, filename);
        return;
    }

    if (pathname.startsWith('/pages/')) {
        const filename = pathname.replace(/^\/pages\//, '');
        // Backward compatibility for existing cached markdown/images.
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
        const figurePath = path.join(TUTOR_MATERIALS_DIR, 'new-book-figures', filename);
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

const IS_PREGEN_CLI = require.main === module && process.argv[2] === '--pregen-section';

if (IS_PREGEN_CLI) {
    const sectionId = compactWhitespace(process.argv[3] || '');
    const sectionTitle = compactWhitespace(process.argv[4] || sectionId);
    const bookSource = process.argv[5] === 'new' ? 'new' : 'old';
    if (!sectionId) {
        console.error('Usage: node ws-bridge.js --pregen-section <sectionId> [sectionTitle] [bookSource]');
        process.exit(1);
    }
    preGenerateSectionLesson(sectionId, sectionTitle, { bookSource, force: true })
        .then((result) => {
            console.log(JSON.stringify({
                ok: true,
                sectionId: result.sectionId,
                sectionTitle: result.sectionTitle,
                cacheVersion: result.cacheVersion,
                skipped: result.skipped,
                webSourceCount: Array.isArray(result.webSources) ? result.webSources.length : 0
            }, null, 2));
            process.exit(0);
        })
        .catch((err) => {
            console.error(err.message || String(err));
            process.exit(1);
        });
} else {
    server.listen(HTTP_PORT, () => {
        console.log('='.repeat(64));
        console.log('Tutor Agent Bridge');
        console.log('='.repeat(64));
        console.log(`HTTP Server : http://localhost:${HTTP_PORT}`);
        console.log(`Indexed OCR : old=${BOOK_INDEX_OLD.length}, new=${BOOK_INDEX_NEW.length} pages`);
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
}
