/*
 * Web/image search helpers (extracted from ws-bridge.js in Phase 1 #9).
 *
 * Owns:
 *   - duckDuckGoSearch — DuckDuckGo Instant Answer API (text results)
 *   - wikipediaSearch — Wikipedia article title + snippet search
 *   - wikimediaCommonsImageSearch — Wikimedia Commons image search via the
 *     MediaWiki API (server-side; bypasses CORS)
 *   - wikipediaPageImageSearch — Wikipedia page-image search (one HTTP call
 *     per result page, intentional N+1 over a small N)
 *
 * Private helpers stay inside the module:
 *   - extractDuckDuckGoResults — payload parser (handles Topics recursion)
 *   - normalizeWikiImageCandidate — normalize { title, url, mime, source,
 *     descriptionUrl } shape across the two wiki sources
 *   - WIKIMEDIA_HEADERS — shared Accept + User-Agent for the MediaWiki API
 *
 * Query-relevance scoring and tutor-specific filtering (the matrix/identity
 * heuristics, particle-physics blocklists) stay in ws-bridge.js because they
 * carry product-domain knowledge — not "search wrapper" concerns.
 *
 * Factory pattern follows Phase 1 #4-#8. Bridge injects httpRequestJson,
 * compactWhitespace, normalizeUrl.
 */
'use strict';

/**
 * @param {{
 *   httpRequestJson: (url: string, options?: object, body?: string|null, timeoutMs?: number) => Promise<any>,
 *   compactWhitespace: (value: any) => string,
 *   normalizeUrl: (u: string) => string,
 * }} deps
 */
module.exports = function createSearchHelpers(deps) {
    const httpRequestJson = deps && deps.httpRequestJson;
    const compactWhitespace = deps && deps.compactWhitespace;
    const normalizeUrl = deps && deps.normalizeUrl;
    if (typeof httpRequestJson !== 'function' || typeof compactWhitespace !== 'function' || typeof normalizeUrl !== 'function') {
        throw new Error('search-helpers: missing required deps {httpRequestJson, compactWhitespace, normalizeUrl}');
    }

    const WIKIMEDIA_HEADERS = {
        'Accept': 'application/json',
        'User-Agent': 'TutorAgent/1.0 (educational-app; contact: tutor@example.com)'
    };

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
            const payload = await httpRequestJson(endpoint, { method: 'GET', headers: WIKIMEDIA_HEADERS }, null, 10000);
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

    function normalizeWikiImageCandidate(item = {}) {
        return {
            title: compactWhitespace(item.title || ''),
            url: compactWhitespace(item.url || ''),
            mime: compactWhitespace(item.mime || ''),
            source: compactWhitespace(item.source || 'wikimedia'),
            descriptionUrl: compactWhitespace(item.descriptionUrl || '')
        };
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

    return {
        duckDuckGoSearch,
        wikipediaSearch,
        wikimediaCommonsImageSearch,
        wikipediaPageImageSearch,
    };
};
