#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const BASE_MAP_PATH = path.join(ROOT, 'section-page-map-new.json');
const OUTPUT_MAP_PATH = path.join(ROOT, 'section-page-map-display-new.json');
const OUTPUT_ANCHOR_PATH = path.join(ROOT, 'section-page-anchor-new.json');
const OUTPUT_FIGURE_MAP_PATH = path.join(ROOT, 'section-figure-map-new.json');

const MATERIALS_CANDIDATES = [
  path.join(ROOT, 'tutor-materials'),
  path.join(path.dirname(ROOT), 'workspace_tutor_related_full', 'tutor-materials'),
  path.join(path.dirname(ROOT), 'tutor-materials')
];

function findMaterialsDir() {
  for (const candidate of MATERIALS_CANDIDATES) {
    if (fs.existsSync(path.join(candidate, 'new-book-ocr'))) return candidate;
  }
  throw new Error('Could not locate tutor-materials/new-book-ocr');
}

const MATERIALS_DIR = findMaterialsDir();
const META_DIR = path.join(MATERIALS_DIR, 'new-book-ocr');

function normalizeCode(value) {
  return String(value || '')
    .trim()
    .replace(/\s+/g, '')
    .toUpperCase();
}

function isSubsectionCode(code) {
  return /-\d+$/.test(code);
}

function parentSection(code) {
  return String(code || '').replace(/-\d+$/, '');
}

function pageNumber(pageName) {
  const m = String(pageName || '').match(/page-(\d+)/i);
  return m ? Number(m[1]) : Number.NaN;
}

function escapeRegex(value) {
  return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function headingPatternForCode(code) {
  const normalized = normalizeCode(code);
  if (!normalized) return null;
  const spacedCode = escapeRegex(normalized)
    .replace(/\\\./g, '\\s*\\.\\s*')
    .replace(/-/g, '\\s*[-‑–]\\s*');
  const suffixGuard = isSubsectionCode(normalized) ? '(?!\\s*[-‑–]\\s*\\d)' : '(?!\\s*[-‑–]\\s*\\d|\\s*\\.\\s*\\d)';
  return new RegExp(`^\\s*${spacedCode}${suffixGuard}\\b`, 'i');
}

function readPageLines(pageName) {
  const txtPath = path.join(META_DIR, `${pageName}.txt`);
  if (!fs.existsSync(txtPath)) return [];
  return fs.readFileSync(txtPath, 'utf8').split(/\r?\n/);
}

function findHeadingLineIndex(pageName, code) {
  const pattern = headingPatternForCode(code);
  if (!pattern) return -1;
  const lines = readPageLines(pageName);
  for (let i = 0; i < lines.length; i += 1) {
    if (pattern.test(lines[i])) return i;
  }
  return -1;
}

function findHeadingLineIndices(pageName, code) {
  const pattern = headingPatternForCode(code);
  if (!pattern) return [];
  const lines = readPageLines(pageName);
  const indices = [];
  for (let i = 0; i < lines.length; i += 1) {
    if (pattern.test(lines[i])) indices.push(i);
  }
  return indices;
}

function lineIndexToRatio(pageName, lineIndex) {
  const rawLines = readPageLines(pageName);
  if (!rawLines.length || lineIndex < 0) return 0;
  return clamp(lineIndex / Math.max(1, rawLines.length - 1), 0, 1);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function computeStartRatio(pageName, code) {
  const lines = readPageLines(pageName).filter(line => line.trim());
  if (!lines.length) return 0;
  const rawLines = readPageLines(pageName);
  const headingIndex = findHeadingLineIndex(pageName, code);
  if (headingIndex < 0) return 0;

  const textRatio = headingIndex / Math.max(1, rawLines.length - 1);
  // OCR line ratios slightly under-estimate the visual top margin on scanned pages.
  // Keeping a small lead-in makes the section heading visible instead of hidden under the toolbar.
  return Number(clamp(textRatio - 0.035, 0, 0.88).toFixed(3));
}

function loadMetaPages() {
  return fs.readdirSync(META_DIR)
    .filter(name => /^page-\d+\.meta\.json$/i.test(name))
    .map(name => {
      const page = name.replace(/\.meta\.json$/i, '');
      const meta = JSON.parse(fs.readFileSync(path.join(META_DIR, name), 'utf8'));
      return {
        page,
        pageNum: pageNumber(page),
        section: normalizeCode(meta.section),
        subsection: normalizeCode(meta.subsection),
        title: String(meta.title || '').trim(),
        pageType: String(meta.page_type || '').trim().toLowerCase()
      };
    })
    .sort((a, b) => a.pageNum - b.pageNum);
}

function uniquePages(pages) {
  const out = [];
  const seen = new Set();
  for (const page of pages) {
    if (!page || seen.has(page)) continue;
    seen.add(page);
    out.push(page);
  }
  return out;
}

function computeDisplayPagesForCode(code, metaPages, fallbackPages = []) {
  // Visual display should preserve boundary tail pages from the base section map.
  // OCR/figure inputs are sliced separately, so adjacent sections may share a page visually.
  return uniquePages(fallbackPages);
}

function nextCodeInBaseMap(rawCode, baseMap) {
  const pages = uniquePages(baseMap[rawCode] || []);
  if (!pages.length) return '';
  const lastPage = pages[pages.length - 1];
  const lastPageNum = pageNumber(lastPage);
  const normalized = normalizeCode(rawCode);
  let best = null;

  for (const [candidateCode, candidatePagesRaw] of Object.entries(baseMap)) {
    const candidate = normalizeCode(candidateCode);
    if (!candidate || candidate === normalized) continue;

    const candidatePages = uniquePages(candidatePagesRaw || []);
    if (!candidatePages.length) continue;
    const first = candidatePages[0];
    const firstPageNum = pageNumber(first);
    if (!Number.isFinite(firstPageNum) || firstPageNum < lastPageNum) continue;

    const headingIndices = findHeadingLineIndices(first, candidate);
    if (firstPageNum === lastPageNum && !headingIndices.length) continue;

    const headingIndex = headingIndices.length ? headingIndices[0] : 0;
    const score = firstPageNum * 10000 + headingIndex;
    if (!best || score < best.score) best = { code: candidateCode, score };
  }

  return best ? best.code : '';
}

function sectionSliceForPage(rawCode, pageName, baseMap) {
  const pages = uniquePages(baseMap[rawCode] || []);
  const pageIndex = pages.indexOf(pageName);
  if (pageIndex === -1) return null;

  const currentHeadingIndices = findHeadingLineIndices(pageName, rawCode);
  const startRatio = currentHeadingIndices.length
    ? lineIndexToRatio(pageName, currentHeadingIndices[0])
    : 0;

  let endRatio = 1;
  const nextCode = nextCodeInBaseMap(rawCode, baseMap);
  if (nextCode) {
    const nextHeadingIndices = findHeadingLineIndices(pageName, nextCode);
    const nextAfterStart = nextHeadingIndices.find(idx => lineIndexToRatio(pageName, idx) >= startRatio);
    if (typeof nextAfterStart === 'number') {
      endRatio = lineIndexToRatio(pageName, nextAfterStart);
    }
  }

  return {
    startRatio: clamp(startRatio, 0, 1),
    endRatio: clamp(endRatio, 0, 1)
  };
}

function figureBelongsToSection(fig, rawCode, pageName, baseMap) {
  const slice = sectionSliceForPage(rawCode, pageName, baseMap);
  if (!slice) return false;
  const top = Number(fig && fig.top);
  const bottom = Number(fig && fig.bottom);
  const mid = Number.isFinite(top) && Number.isFinite(bottom)
    ? (top + bottom) / 2
    : (Number.isFinite(top) ? top : 0.5);
  return mid >= Math.max(0, slice.startRatio - 0.015) && mid < Math.min(1, slice.endRatio + 0.015);
}

function computeFigureMap(baseMap) {
  const figureMap = {};

  for (const [rawCode, pagesRaw] of Object.entries(baseMap)) {
    const files = [];
    for (const pageName of uniquePages(pagesRaw || [])) {
      const metaPath = path.join(META_DIR, `${pageName}.meta.json`);
      if (!fs.existsSync(metaPath)) continue;
      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
      const figures = Array.isArray(meta.figures) ? meta.figures : [];
      for (const fig of figures) {
        const crop = path.basename(String(fig && fig.crop_file || ''));
        if (!crop) continue;
        if (figureBelongsToSection(fig, rawCode, pageName, baseMap)) files.push(crop);
      }
    }
    figureMap[rawCode] = [...new Set(files)].sort();
  }

  return figureMap;
}

function main() {
  const baseMap = JSON.parse(fs.readFileSync(BASE_MAP_PATH, 'utf8'));
  const metaPages = loadMetaPages();
  const displayMap = {};
  const anchorMap = {};
  const figureMap = computeFigureMap(baseMap);

  for (const [rawCode, fallbackPages] of Object.entries(baseMap)) {
    displayMap[rawCode] = computeDisplayPagesForCode(rawCode, metaPages, Array.isArray(fallbackPages) ? fallbackPages : []);
    const firstPage = displayMap[rawCode]?.[0];
    if (firstPage) {
      const startRatio = computeStartRatio(firstPage, rawCode);
      anchorMap[rawCode] = { page: firstPage, startRatio };
    }
  }

  fs.writeFileSync(OUTPUT_MAP_PATH, JSON.stringify(displayMap, null, 2) + '\n', 'utf8');
  fs.writeFileSync(OUTPUT_ANCHOR_PATH, JSON.stringify(anchorMap, null, 2) + '\n', 'utf8');
  fs.writeFileSync(OUTPUT_FIGURE_MAP_PATH, JSON.stringify(figureMap, null, 2) + '\n', 'utf8');

  console.log(`[display-map] wrote ${path.basename(OUTPUT_MAP_PATH)} with ${Object.keys(displayMap).length} entries`);
  console.log(`[anchor-map] wrote ${path.basename(OUTPUT_ANCHOR_PATH)} with ${Object.keys(anchorMap).length} entries`);
  console.log(`[figure-map] wrote ${path.basename(OUTPUT_FIGURE_MAP_PATH)} with ${Object.keys(figureMap).length} entries`);
  for (const key of ['b.1-1', 'b.1-2', 'b.3', 'b.3-1', 'b.3-2', 'b.5', 'b.5-1', 'b.5-2']) {
    if (displayMap[key]) console.log(`${key}: ${displayMap[key].join(',')}`);
    if (anchorMap[key]) console.log(`${key} anchor: ${anchorMap[key].page} @ ${anchorMap[key].startRatio}`);
    if (figureMap[key]) console.log(`${key} figures: ${figureMap[key].join(',') || 'none'}`);
  }
}

main();
