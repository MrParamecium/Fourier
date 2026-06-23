#!/usr/bin/env node
/**
 * Diagnostic probe for docs/visual-diff-harness-gap.md.
 *
 * Tests the hypothesis: visual-diff.js uses page.screenshot({ fullPage: false })
 * which clips to the 1280x800 viewport, so a CSS change on an element that
 * lives below the scroll fold produces 0 pixel diff even though the live page
 * paints it.
 *
 * What this probe does:
 *   1. Boot the bridge on port 9126 (avoid clashing with the harness on 9125).
 *   2. Launch Chromium with the SAME context flags the harness uses (viewport,
 *      timezone, locale, MASK_CSS via addInitScript).
 *   3. Reproduce view 14b setup: enter guest, nav to feedback view, seed the
 *      populated fixture, refresh, wait for 2 threads + 6 replies, click
 *      Charlie's reply + thread 2 body so both .is-target chips show.
 *   4. Geometry probe — for every #feedbackView .feedback-reply-context,
 *      report bounding rect + computed style + whether it intersects the
 *      visible 1280x800 viewport.
 *   5. Magenta probe — inject `border: 5px solid magenta !important;
 *      background: yellow !important` on .feedback-reply-context. Take BOTH
 *      a viewport screenshot AND a fullPage screenshot. Count magenta pixels
 *      in each PNG.
 *
 * Decisive outcomes:
 *   - viewport magenta > 0 AND fullPage magenta > 0  → screenshot is fine,
 *     bug is elsewhere (visibility / occlusion). Look at H2/H3.
 *   - viewport magenta == 0 AND fullPage magenta > 0 → H1 confirmed: the
 *     elements paint below the 800px fold; fullPage:false discards them.
 *   - viewport magenta == 0 AND fullPage magenta == 0 → element is hidden
 *     (display:none, visibility:hidden) or otherwise unpaintable. Look at H2.
 *
 * This file is ephemeral diagnostic instrumentation. Delete after the gap
 * is closed or move to tools/test-utils.js if a recurring probe is wanted.
 */
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { chromium } = require('playwright');
const { PNG } = require('pngjs');
const {
    MASK_CSS,
    waitForHealth,
    enterGuestMode,
    seedFeedbackFixture,
    restoreFeedbackBoard,
    FEEDBACK_FIXTURE_POPULATED_PATH,
    assertOrThrow,
} = require('./test-utils.js');

const PORT = Number(process.env.PROBE_PORT || 9126);
const BASE = `http://127.0.0.1:${PORT}`;
const VIEWPORT = { width: 1280, height: 800 };
const TMP = require('os').tmpdir();

function countMagenta(pngPath) {
    const png = PNG.sync.read(fs.readFileSync(pngPath));
    let mag = 0, yellow = 0;
    for (let i = 0; i < png.data.length; i += 4) {
        const r = png.data[i], g = png.data[i + 1], b = png.data[i + 2];
        if (r > 240 && g < 30 && b > 240) mag++;
        if (r > 240 && g > 240 && b < 30) yellow++;
    }
    return { width: png.width, height: png.height, magentaPx: mag, yellowPx: yellow };
}

async function main() {
    const repoRoot = path.resolve(__dirname, '..');
    const server = spawn('node', ['app/ws-bridge.js'], {
        cwd: repoRoot,
        env: { ...process.env, PORT: String(PORT) },
        stdio: ['ignore', 'pipe', 'pipe'],
    });
    server.stdout.on('data', () => {});
    server.stderr.on('data', d => process.stderr.write(`  [bridge-err] ${d}`));

    let browser;
    try {
        await waitForHealth(BASE);
        browser = await chromium.launch();
        const context = await browser.newContext({
            viewport: VIEWPORT,
            timezoneId: 'UTC',
            locale: 'en-US',
        });
        await context.addInitScript(({ css }) => {
            const inject = () => {
                const s = document.createElement('style');
                s.textContent = css;
                document.head.appendChild(s);
            };
            if (document.head) inject();
            else document.addEventListener('DOMContentLoaded', inject);
        }, { css: MASK_CSS });
        const page = await context.newPage();
        await enterGuestMode(page, BASE);

        // Replicate view 14 → view 14b setup
        restoreFeedbackBoard();
        await page.click('#navFeedbackBtn');
        await page.waitForSelector('#feedbackView:not(.hidden)', { timeout: 5000 });
        await page.waitForFunction(() => {
            const v = document.getElementById('feedbackView');
            return v && !v.classList.contains('hidden')
                && !v.textContent.includes('Loading suggestions');
        }, { timeout: 10000 });

        seedFeedbackFixture(FEEDBACK_FIXTURE_POPULATED_PATH);
        await page.click('#feedbackRefreshBtn');
        await page.waitForSelector('#feedbackView .feedback-thread', { timeout: 5000 });
        await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));

        const counts = await page.evaluate(() => ({
            threads: document.querySelectorAll('#feedbackView .feedback-thread').length,
            replies: document.querySelectorAll('#feedbackView .feedback-thread .feedback-reply').length,
        }));
        assertOrThrow(
            counts.threads === 2 && counts.replies === 6,
            `probe: expected 2 threads + 6 replies, got ${counts.threads}/${counts.replies}`,
        );
        await page.click('[data-feedback-reply-anchor="fb_reply_charlie"]');
        await page.waitForSelector('#feedbackView .feedback-reply.is-target', { timeout: 2000 });
        await page.click('article[data-feedback-id="fb_thread_fixture_02"] [data-feedback-reply-anchor="thread-body"]');
        await page.waitForSelector(
            'article[data-feedback-id="fb_thread_fixture_02"] .feedback-thread-body.is-target',
            { timeout: 2000 },
        );
        await page.waitForTimeout(300);

        // === Probe 1: geometry ===
        const geo = await page.evaluate(() => {
            const viewport = {
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight,
                scrollY: window.scrollY,
                scrollX: window.scrollX,
            };
            const docHeight = document.documentElement.scrollHeight;
            const els = Array.from(document.querySelectorAll('#feedbackView .feedback-reply-context'));
            const items = els.map((el, i) => {
                const rect = el.getBoundingClientRect();
                const cs = getComputedStyle(el);
                return {
                    i,
                    rect: {
                        top: Math.round(rect.top),
                        bottom: Math.round(rect.bottom),
                        left: Math.round(rect.left),
                        right: Math.round(rect.right),
                        width: Math.round(rect.width),
                        height: Math.round(rect.height),
                    },
                    intersectsViewport: rect.bottom > 0 && rect.top < viewport.innerHeight
                        && rect.right > 0 && rect.left < viewport.innerWidth,
                    fullyInsideViewport: rect.top >= 0 && rect.bottom <= viewport.innerHeight
                        && rect.left >= 0 && rect.right <= viewport.innerWidth,
                    style: {
                        display: cs.display,
                        visibility: cs.visibility,
                        opacity: cs.opacity,
                        position: cs.position,
                        transform: cs.transform,
                        clipPath: cs.clipPath,
                        borderColor: cs.borderColor,
                        backgroundColor: cs.backgroundColor,
                    },
                    snippet: el.textContent.replace(/\s+/g, ' ').trim().slice(0, 40),
                };
            });
            return { viewport, docHeight, items };
        });

        console.log('==================================================');
        console.log('=== Probe 1: geometry of .feedback-reply-context ===');
        console.log('==================================================');
        console.log(`viewport innerHeight = ${geo.viewport.innerHeight}`);
        console.log(`viewport scrollY     = ${geo.viewport.scrollY}`);
        console.log(`document scrollHeight= ${geo.docHeight}`);
        console.log(`elements found       = ${geo.items.length}`);
        for (const item of geo.items) {
            console.log(`  [${item.i}] top=${item.rect.top} bottom=${item.rect.bottom} h=${item.rect.height} ` +
                        `display=${item.style.display} visibility=${item.style.visibility} ` +
                        `intersects=${item.intersectsViewport} fullyInside=${item.fullyInsideViewport}`);
            console.log(`         text="${item.snippet}"`);
            console.log(`         borderColor=${item.style.borderColor}`);
        }

        // === Probe 2: identify the scrollable ancestor ===
        const ancestry = await page.evaluate(() => {
            const el = document.querySelector('#feedbackView .feedback-reply-context');
            if (!el) return null;
            const chain = [];
            let cur = el;
            while (cur && cur !== document.documentElement) {
                const cs = getComputedStyle(cur);
                const rect = cur.getBoundingClientRect();
                const isScrollable = (cs.overflowY === 'auto' || cs.overflowY === 'scroll'
                    || cs.overflow === 'auto' || cs.overflow === 'scroll');
                chain.push({
                    tag: cur.tagName.toLowerCase(),
                    id: cur.id || '',
                    cls: (cur.className && typeof cur.className === 'string' ? cur.className : '').slice(0, 80),
                    overflow: cs.overflow,
                    overflowY: cs.overflowY,
                    isScrollable,
                    scrollTop: cur.scrollTop,
                    scrollHeight: cur.scrollHeight,
                    clientHeight: cur.clientHeight,
                    rectTop: Math.round(rect.top),
                    rectHeight: Math.round(rect.height),
                });
                cur = cur.parentElement;
            }
            return chain;
        });
        console.log('');
        console.log('==================================================');
        console.log('=== Probe 2: ancestor chain of first context ===');
        console.log('==================================================');
        for (const a of ancestry) {
            const tag = `${a.tag}${a.id ? '#' + a.id : ''}${a.cls ? '.' + a.cls.split(/\s+/)[0] : ''}`;
            console.log(`  ${tag.padEnd(48)} overflow=${a.overflow}/${a.overflowY} scroll=${a.scrollTop}/${a.scrollHeight} client=${a.clientHeight} rectTop=${a.rectTop}`);
        }

        // === Probe 3: scrollIntoView THEN magenta override at correct specificity ===
        await page.evaluate(() => {
            document.querySelector('#feedbackView .feedback-reply-context')
                ?.scrollIntoView({ block: 'center', inline: 'center' });
        });
        await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));

        // Higher-specificity override (1,4,0) to win against L34743's tone-tint rule.
        await page.addStyleTag({ content: `
            #feedbackView .feedback-reply.is-left[class*="tone-"] .feedback-reply-context,
            #feedbackView .feedback-reply.is-right[class*="tone-"] .feedback-reply-context {
                border: 5px solid magenta !important;
                background: yellow !important;
            }
        ` });
        await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));

        const viewportPng = path.join(TMP, 'probe-viewport.png');
        const fullPng = path.join(TMP, 'probe-fullpage.png');
        await page.screenshot({ path: viewportPng, fullPage: false });
        await page.screenshot({ path: fullPng, fullPage: true });

        const viewportRes = countMagenta(viewportPng);
        const fullRes = countMagenta(fullPng);

        const computedAfter = await page.evaluate(() => {
            const el = document.querySelector('#feedbackView .feedback-reply-context');
            if (!el) return null;
            const cs = getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            return {
                borderColor: cs.borderColor,
                backgroundColor: cs.backgroundColor,
                rectTop: Math.round(rect.top),
                rectBottom: Math.round(rect.bottom),
                inViewport: rect.top >= 0 && rect.bottom <= window.innerHeight,
            };
        });

        console.log('');
        console.log('==================================================');
        console.log('=== Probe 2: magenta override paint coverage ====');
        console.log('==================================================');
        console.log(`computed after override: ${JSON.stringify(computedAfter)}`);
        console.log(`viewport PNG  ${viewportPng}: ${JSON.stringify(viewportRes)}`);
        console.log(`fullPage PNG  ${fullPng}: ${JSON.stringify(fullRes)}`);
        console.log('');
        console.log('--- diagnosis ---');
        if (viewportRes.magentaPx > 0 && fullRes.magentaPx > 0) {
            console.log('viewport AND fullPage paint magenta → bug is NOT below-fold');
        } else if (viewportRes.magentaPx === 0 && fullRes.magentaPx > 0) {
            console.log('ONLY fullPage paints magenta → H1 CONFIRMED: below-the-fold');
        } else if (viewportRes.magentaPx === 0 && fullRes.magentaPx === 0) {
            console.log('NEITHER paints magenta → element is hidden/clipped (H2/H3)');
        } else {
            console.log('viewport > 0 but fullPage == 0 → unexpected, investigate');
        }
    } finally {
        restoreFeedbackBoard();
        if (browser) await browser.close().catch(() => {});
        server.kill('SIGTERM');
    }
}

main().catch(e => { console.error(e); process.exitCode = 1; });
