/*
 * LLM client wrappers (extracted from ws-bridge.js in Phase 1 #6).
 *
 * Owns:
 *   - OPENAI_API_URL / OPENROUTER_API_URL constants
 *   - process.env reads for OPENAI_API_KEY / OPENROUTER_API_KEY
 *   - callOpenRouterChat — primary path (Agents A/B, Haiku auxiliary)
 *   - callOpenAIChat — Agent A (gpt-5.5 / gpt-5.4-image-2 etc.); falls back
 *     to OpenRouter when OPENAI_API_KEY is missing (lets the bridge run
 *     with a single OpenRouter key)
 *   - tryParseJsonLoose + repairJsonLatexEscapes — JSON extraction from
 *     model output, including a LaTeX-escape repair pass (sqrt, pm, qquad,
 *     etc. produce invalid JSON escapes without it)
 *
 * Hard Invariant reminder: Sonnet 4.6 is Agent B. The Renderer model choice
 * is a cost/quality decision; do not silently upgrade to Opus inside the
 * wrappers — caller picks the model name.
 *
 * Factory pattern follows Phase 1 #4/#5: bridge injects httpRequestJson,
 * extractTextContent, appUrl, appName.
 */
'use strict';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

function getOpenAIKey() {
    return process.env.OPENAI_API_KEY || '';
}

function getOpenRouterKey() {
    return process.env.OPENROUTER_API_KEY || '';
}

/**
 * @param {{
 *   httpRequestJson: (url: string, options?: object, body?: string|null, timeoutMs?: number) => Promise<any>,
 *   extractTextContent: (content: any) => string,
 *   appUrl: string,
 *   appName: string,
 * }} deps
 */
module.exports = function createLlmClient(deps) {
    const httpRequestJson = deps && deps.httpRequestJson;
    const extractTextContent = deps && deps.extractTextContent;
    const APP_URL = deps && deps.appUrl;
    const APP_NAME = deps && deps.appName;
    if (typeof httpRequestJson !== 'function' || typeof extractTextContent !== 'function' || typeof APP_URL !== 'string' || typeof APP_NAME !== 'string') {
        throw new Error('llm-client: missing required deps {httpRequestJson, extractTextContent, appUrl, appName}');
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

    return {
        callOpenRouterChat,
        callOpenAIChat,
        tryParseJsonLoose,
    };
};
