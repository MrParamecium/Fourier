#!/usr/bin/env node
/**
 * Test: generate lesson for b.1-1 and b.1-2 with one profile.
 * Usage: node pregenerate_test.js
 */
'use strict';
const fs   = require('fs');
const path = require('path');
const http = require('http');

const API_BASE = 'http://localhost:9000';
const OUT_DIR  = path.join(__dirname, '../tutor-materials/lesson-cache');
fs.mkdirSync(OUT_DIR, { recursive: true });

// Profile key: goal|math|timeline
const PROFILE = {
    goal:     'solid_b',
    math:     'calculus_ok',
    timeline: 'few_weeks',
    style:    ['example_first', 'visual'],
    outcome:  ['worked_example', 'exam_cheatsheet']
};
const PROFILE_KEY = `${PROFILE.goal}|${PROFILE.math}|${PROFILE.timeline}`;

const SECTIONS = [
    { id: 'b.1-1', title: 'B.1-1 A Historical Note' },
    { id: 'b.1-2', title: 'B.1-2 Algebra of Complex Numbers' },
];

function post(urlPath, body) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(body);
        const opts = {
            hostname: 'localhost', port: 9000,
            path: urlPath, method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
        };
        const req = http.request(opts, res => {
            let raw = '';
            res.on('data', c => raw += c);
            res.on('end', () => {
                try { resolve(JSON.parse(raw)); }
                catch(e) { reject(new Error('JSON parse fail: ' + raw.slice(0, 200))); }
            });
        });
        req.on('error', reject);
        req.setTimeout(180000, () => { req.destroy(); reject(new Error('timeout')); });
        req.write(data);
        req.end();
    });
}

async function generateLesson(sectionId, sectionTitle) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Generating: ${sectionId} — "${sectionTitle}"`);
    console.log(`Profile: ${PROFILE_KEY}`);
    console.log('='.repeat(60));
    const t0 = Date.now();

    const result = await post('/api/section', {
        sectionId,
        sectionTitle,
        mode: 'lesson',
        language: 'en',
        bookSource: 'new',
        webSources: [],   // no web search for pre-generation
        uid: null,
        // Inject profile directly (server reads quiz from memory, but we pass profile inline)
        profileOverride: PROFILE
    });

    const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
    console.log(`Done in ${elapsed}s`);

    if (result.error) {
        console.error('ERROR:', result.error);
        return;
    }

    // Save to lesson-cache/<sectionId>/<profileKey>.v5.en.md  (v5 = b64 quiz encoding)
    const dir = path.join(OUT_DIR, sectionId.replace(/\./g, '_'));
    fs.mkdirSync(dir, { recursive: true });
    const outPath = path.join(dir, `${PROFILE_KEY}.v5.en.md`);
    fs.writeFileSync(outPath, result.lesson || result.explanation || JSON.stringify(result, null, 2));
    console.log(`Saved: ${outPath}`);
    console.log('Preview (first 500 chars):');
    console.log((result.lesson || result.explanation || '').slice(0, 500));
}

(async () => {
    for (const sec of SECTIONS) {
        await generateLesson(sec.id, sec.title);
    }
    console.log('\n✅ Done!');
})().catch(e => { console.error(e); process.exit(1); });
