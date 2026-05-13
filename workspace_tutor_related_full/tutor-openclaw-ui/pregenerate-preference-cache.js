#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');

const API_BASE = 'http://localhost:9000';
const MAP_PATH = path.join(__dirname, 'section-page-map-new.json');

const TRACKS = String(process.env.PREGEN_TRACKS || 'cram,standard,top_score')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);
const MATH = process.env.PREGEN_MATH || 'calculus_ok';
const LIMIT = Number(process.env.PREGEN_LIMIT || 6);
const SECTION_FILTER = String(process.env.PREGEN_SECTION_FILTER || '');
const REQUEST_TIMEOUT_MS = Number(process.env.PREGEN_TIMEOUT_MS || 600000);

function post(urlPath, body, timeoutMs = REQUEST_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request({
      hostname: 'localhost',
      port: 9000,
      path: urlPath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(raw || '{}'));
        } catch (err) {
          reject(new Error(`JSON parse fail: ${raw.slice(0, 300)}`));
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(timeoutMs, () => {
      req.destroy(new Error(`timeout after ${timeoutMs}ms`));
    });
    req.write(data);
    req.end();
  });
}

function loadSections() {
  const map = JSON.parse(fs.readFileSync(MAP_PATH, 'utf8'));
  let keys = Object.keys(map)
    .filter(key => /^([A-Za-z]?\.?\d+(?:[.-]\d+)*)$/.test(key))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (SECTION_FILTER) {
    const needle = SECTION_FILTER.toLowerCase();
    keys = keys.filter(key => key.toLowerCase().startsWith(needle));
  } else {
    keys = keys.slice(0, LIMIT);
  }

  return keys.map(id => ({ id, title: id }));
}

function buildProfiles() {
  return TRACKS.map(track => ({
    track,
    goal: track,
    math: MATH,
    timeline: 'few_weeks',
    style: [],
    outcome: []
  }));
}

async function generateOne(section, profile, index, total) {
  const startedAt = Date.now();
  console.log(`\n[${index}/${total}] ${section.id} | track=${profile.track} | math=${profile.math}`);

  const result = await post('/api/section', {
    sectionId: section.id,
    sectionTitle: section.title,
    mode: 'lesson',
    language: 'en',
    bookSource: 'new',
    webSources: [],
    uid: null,
    profileOverride: profile
  });

  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
  if (result.error) {
    throw new Error(`${section.id} failed in ${elapsed}s: ${result.error}`);
  }
  const len = (result.lesson || '').length;
  console.log(`✓ done in ${elapsed}s | lesson_len=${len} | cached=${result.cached === true ? 'yes' : 'no'}`);
}

async function main() {
  const sections = loadSections();
  const profiles = buildProfiles();
  const jobs = [];
  sections.forEach(section => {
    profiles.forEach(profile => jobs.push({ section, profile }));
  });

  console.log(`Preparing third-edition textbook-only lesson cache...`);
  console.log(`Section filter: ${SECTION_FILTER || '(none)'}`);
  console.log(`Sections: ${sections.length}`);
  console.log(`Profiles: ${profiles.length}`);
  console.log(`Jobs: ${jobs.length}`);
  console.log(`Base math: ${MATH}`);
  console.log(`Tracks: ${TRACKS.join(', ')}`);

  let i = 0;
  for (const job of jobs) {
    i += 1;
    try {
      await generateOne(job.section, job.profile, i, jobs.length);
    } catch (err) {
      console.error(`✗ ${err.message}`);
    }
  }

  console.log('\n✅ pre-generation finished');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
