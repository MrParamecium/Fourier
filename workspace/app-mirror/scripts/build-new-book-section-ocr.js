#!/usr/bin/env node
/*
 * Build strict per-section OCR files for the new Lathi book.
 *
 * Source pages come from section-page-map-display-new.json because Harrison
 * curates that file while checking the Textbook view. The generated files are
 * consumed by lesson generation; the original page OCR remains the fallback.
 */

const fs = require('fs');
const path = require('path');

const UI_DIR = path.resolve(__dirname, '..');
const PROJECT_ROOT = path.resolve(UI_DIR, '..');
const DISPLAY_MAP_PATH = path.join(UI_DIR, 'section-page-map-display-new.json');
const WORKSPACE_MATERIALS_DIR = path.join(PROJECT_ROOT, 'workspace', 'materials');
const ROOT_MATERIALS_DIR = path.join(PROJECT_ROOT, 'materials');

function resolveMaterialsDir() {
  if (fs.existsSync(path.join(WORKSPACE_MATERIALS_DIR, 'new-book-ocr'))) return WORKSPACE_MATERIALS_DIR;
  if (fs.existsSync(path.join(ROOT_MATERIALS_DIR, 'new-book-ocr'))) return ROOT_MATERIALS_DIR;
  throw new Error(`Cannot find new-book-ocr under ${WORKSPACE_MATERIALS_DIR} or ${ROOT_MATERIALS_DIR}`);
}

const MATERIALS_DIR = resolveMaterialsDir();
const PAGE_OCR_DIR = path.join(MATERIALS_DIR, 'new-book-ocr');
const SECTION_OCR_DIR = path.join(MATERIALS_DIR, 'new-book-section-ocr');

function compactWhitespace(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function escapeRegex(value) {
  return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extractSectionCode(sectionId = '') {
  const m = String(sectionId || '').match(/^([A-Za-z]?\.?\d+(?:[.-]\d+)*)/);
  return m ? m[1].toLowerCase() : compactWhitespace(sectionId).toLowerCase();
}

function codeTokens(code = '') {
  return extractSectionCode(code)
    .replace(/^([a-z])(\d)/i, '$1.$2')
    .split(/[.-]/)
    .map(token => token.toLowerCase())
    .filter(Boolean);
}

function isSameCode(a, b) {
  const aa = codeTokens(a);
  const bb = codeTokens(b);
  return aa.length === bb.length && aa.every((token, idx) => token === bb[idx]);
}

function isAncestorCode(ancestor, child) {
  const aa = codeTokens(ancestor);
  const bb = codeTokens(child);
  return aa.length > 0
    && aa.length < bb.length
    && aa.every((token, idx) => token === bb[idx]);
}

function hasLetterPrefix(code = '') {
  return /^[a-z]/i.test(extractSectionCode(code));
}

function sameChapterRoot(candidate = '', current = '') {
  const cc = codeTokens(candidate);
  const cur = codeTokens(current);
  if (!cc.length || !cur.length) return false;
  if (hasLetterPrefix(current)) {
    return hasLetterPrefix(candidate) && cc[0] === cur[0];
  }
  return !hasLetterPrefix(candidate) && cc[0] === cur[0];
}

function buildSectionCodeRegex(sectionId = '') {
  const code = extractSectionCode(sectionId || '');
  if (!code) return null;
  const source = code
    .split('')
    .map(ch => {
      if (ch === '.' || ch === '-') return '[.\\-]?';
      return escapeRegex(ch);
    })
    .join('');
  return new RegExp(`^\\s*${source}(?=\\s|$|[-:：–—])`, 'i');
}

function extractHeadingCodeFromLine(line = '') {
  const match = String(line || '').match(/^\s*([A-Za-z]?\.?\d+(?:[.\-]\d+)*)\s+\S/);
  return match ? match[1].toLowerCase() : '';
}

function looksLikeSectionHeadingLine(line = '') {
  const text = String(line || '').trim();
  if (!text || text.length > 150) return false;
  if (/^(chapter|contents?)\b/i.test(text)) return false;
  return /^\s*[A-Za-z]?\.?\d+(?:[.\-]\d+)*\s+\S/.test(text);
}

function isLikelyRunningHeader(line = '', candidateCode = '', currentCode = '') {
  const text = compactWhitespace(line);
  if (!text) return false;
  if (/^\d+\s+CHAPTER\b/i.test(text)) return true;
  if (!/\s+\d+\s*$/.test(text)) return false;
  return isSameCode(candidateCode, currentCode) || isAncestorCode(candidateCode, currentCode);
}

function pageBaseName(pageName = '') {
  const match = String(pageName || '').match(/page-\d{3}/i);
  return match ? match[0].toLowerCase() : String(pageName || '').toLowerCase();
}

function readMappedPages(pageNames = []) {
  const chunks = [];
  const missingPages = [];
  const usedPages = [];
  for (const rawPage of pageNames) {
    const page = pageBaseName(rawPage);
    const textPath = path.join(PAGE_OCR_DIR, `${page}.txt`);
    if (!fs.existsSync(textPath)) {
      missingPages.push(rawPage);
      continue;
    }
    usedPages.push(page);
    chunks.push({
      page,
      text: fs.readFileSync(textPath, 'utf8')
    });
  }
  return { chunks, missingPages, usedPages };
}

function findSectionStart(lines, sectionId) {
  const currentCode = extractSectionCode(sectionId);
  const currentRegex = buildSectionCodeRegex(sectionId);
  if (!currentRegex) return { index: 0, found: false };
  if (codeTokens(currentCode).length === 1 && !/[a-z]/i.test(currentCode)) {
    return { index: 0, found: false };
  }
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!looksLikeSectionHeadingLine(line)) continue;
    if (!currentRegex.test(line)) continue;
    const candidate = extractHeadingCodeFromLine(line);
    if (!candidate || !isSameCode(candidate, currentCode)) continue;
    if (!sameChapterRoot(candidate, currentCode)) continue;
    return { index: i, found: true, line: compactWhitespace(line) };
  }
  return { index: 0, found: false };
}

function findSectionEnd(lines, sectionId, startIndex) {
  const currentCode = extractSectionCode(sectionId);
  for (let i = startIndex + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (!looksLikeSectionHeadingLine(line)) continue;
    const candidate = extractHeadingCodeFromLine(line);
    if (!candidate) continue;
    if (!sameChapterRoot(candidate, currentCode)) continue;
    if (isSameCode(candidate, currentCode)) continue;
    if (isAncestorCode(candidate, currentCode)) continue;
    if (isLikelyRunningHeader(line, candidate, currentCode)) continue;
    return { index: i, found: true, line: compactWhitespace(line), nextCode: candidate };
  }
  return { index: lines.length, found: false };
}

function buildCombinedText(chunks = []) {
  return chunks
    .map(chunk => `[[PAGE ${chunk.page}]]\n${String(chunk.text || '').trim()}`)
    .join('\n\n')
    .trim();
}

function buildSectionOcr(sectionId, pageNames = []) {
  const { chunks, missingPages, usedPages } = readMappedPages(pageNames);
  const combined = buildCombinedText(chunks);
  const lines = combined.split(/\r?\n/);
  const start = findSectionStart(lines, sectionId);
  const end = findSectionEnd(lines, sectionId, start.index);
  const body = lines.slice(start.index, end.index).join('\n').trim();
  const status = {
    sectionId,
    sourcePages: pageNames,
    usedPages,
    missingPages,
    foundStart: start.found,
    startLine: start.line || '',
    foundEnd: end.found,
    endBeforeLine: end.line || '',
    endBeforeCode: end.nextCode || '',
    charCount: body.length
  };
  const header = [
    '# Fourier section OCR',
    `section_id: ${sectionId}`,
    `source_pages: ${usedPages.join(', ') || 'none'}`,
    `cut_start_found: ${start.found ? 'yes' : 'no'}`,
    `cut_end_found: ${end.found ? 'yes' : 'no'}`,
    '',
    '--- OCR ---',
    ''
  ].join('\n');
  return { text: `${header}${body}\n`, status };
}

function safeFilename(sectionId = '') {
  return `${extractSectionCode(sectionId).replace(/[^a-z0-9._-]+/gi, '_')}.txt`;
}

function main() {
  const displayMap = JSON.parse(fs.readFileSync(DISPLAY_MAP_PATH, 'utf8'));
  fs.mkdirSync(SECTION_OCR_DIR, { recursive: true });

  const manifest = {
    generatedAt: new Date().toISOString(),
    sourceMap: path.relative(PROJECT_ROOT, DISPLAY_MAP_PATH),
    pageOcrDir: path.relative(PROJECT_ROOT, PAGE_OCR_DIR),
    sectionOcrDir: path.relative(PROJECT_ROOT, SECTION_OCR_DIR),
    sections: {}
  };
  const reportLines = [
    '# New Book Section OCR Build Report',
    '',
    `Generated: ${manifest.generatedAt}`,
    `Source map: ${manifest.sourceMap}`,
    ''
  ];

  let count = 0;
  for (const [sectionId, pageNames] of Object.entries(displayMap)) {
    if (!Array.isArray(pageNames) || !pageNames.length) continue;
    const { text, status } = buildSectionOcr(sectionId, pageNames);
    const filename = safeFilename(sectionId);
    fs.writeFileSync(path.join(SECTION_OCR_DIR, filename), text, 'utf8');
    fs.writeFileSync(path.join(SECTION_OCR_DIR, filename.replace(/\.txt$/i, '.meta.json')), `${JSON.stringify(status, null, 2)}\n`, 'utf8');
    manifest.sections[sectionId] = {
      file: filename,
      meta: filename.replace(/\.txt$/i, '.meta.json'),
      ...status
    };
    count += 1;
    if (!status.foundStart || !status.foundEnd || status.missingPages.length || status.charCount < 120) {
      reportLines.push(`- ${sectionId}: start=${status.foundStart ? 'yes' : 'NO'}, end=${status.foundEnd ? 'yes' : 'NO'}, chars=${status.charCount}, pages=${status.usedPages.join(',') || 'none'}${status.missingPages.length ? `, missing=${status.missingPages.join(',')}` : ''}`);
      if (status.startLine) reportLines.push(`  start: ${status.startLine}`);
      if (status.endBeforeLine) reportLines.push(`  end before: ${status.endBeforeLine}`);
    }
  }

  manifest.count = count;
  fs.writeFileSync(path.join(SECTION_OCR_DIR, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  fs.writeFileSync(path.join(SECTION_OCR_DIR, 'REPORT.md'), `${reportLines.join('\n')}\n`, 'utf8');
  console.log(`Built ${count} section OCR files in ${SECTION_OCR_DIR}`);
  console.log(`Review report: ${path.join(SECTION_OCR_DIR, 'REPORT.md')}`);
}

main();
