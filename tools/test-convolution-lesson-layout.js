'use strict';

const path = require('path');
const { chromium } = require('playwright');
const {
  spawnBridge,
  stopBridge,
  waitForHealth,
  enterGuestMode,
  ensureSyllabusOpen,
} = require('./test-utils.js');

const PORT = Number(process.env.TUTOR_CONVOLUTION_LAYOUT_PORT || 9154);
const BASE = `http://127.0.0.1:${PORT}`;
const ROOT = path.resolve(__dirname, '..');
const LESSON_URL = `${BASE}/lessons/2_4-2/lesson.html`;
const SUBTOPIC = {
  chapter: 'Chapter 2',
  section: '2.4 System Response to External Input: The Zero-State Response',
  title: '2.4-2 Graphical Understanding of Convolution Operation',
};
const HEADINGS = [
  'Why draw a convolution?',
  'Two time variables, two different jobs',
  'Four actions for one output point',
  'Example 2.10 · Two causal exponentials',
  'Example 2.11 · Positive and negative contributions',
  'Example 2.12 · Edges decide the cases',
  'Transfer the method',
];
const DEMOS = ['figure27', 'example210', 'example211', 'example212'];
const results = [];

function record(name, ok, detail = '') {
  results.push({ name, ok });
  console.log(`  ${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ` - ${detail}` : ''}`);
}

async function settle(page) {
  await page.evaluate(() => new Promise(resolve => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  }));
}

async function inspectLesson(page) {
  return page.evaluate(() => {
    const visible = element => {
      if (!element) return false;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== 'none'
        && style.visibility !== 'hidden'
        && Number(style.opacity) > 0
        && rect.width > 0
        && rect.height > 0;
    };
    const themeButton = document.getElementById('theme-toggle');
    const main = document.querySelector('main');
    const mainRect = main?.getBoundingClientRect();
    const buttonRect = themeButton?.getBoundingClientRect();
    const headings = Array.from(document.querySelectorAll('h2[data-section]'));
    const demos = Array.from(document.querySelectorAll('[data-demo]'));
    return {
      revision: document.body.dataset.lessonRevision || '',
      headings: headings.map(heading => heading.textContent.replace(/^\d+\.\s*/, '').trim()),
      headingNumbers: headings.map(heading => Number(heading.dataset.section || 0)),
      demos: demos.map(demo => demo.dataset.demo),
      plotHosts: document.querySelectorAll('.plot-host').length,
      checkpoints: document.querySelectorAll('[data-checkpoint]').length,
      themeButtonVisible: visible(themeButton),
      moonVisible: visible(themeButton?.querySelector('.moon')),
      sunVisible: visible(themeButton?.querySelector('.sun')),
      themeLabel: themeButton?.getAttribute('aria-label') || '',
      progressPosition: document.getElementById('progress-position')?.textContent.trim() || '',
      progressPercent: document.getElementById('progress-percent')?.textContent.trim() || '',
      progressPositionMode: getComputedStyle(document.querySelector('.progress-shell')).position,
      horizontalOverflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
      continuousScroll: document.documentElement.scrollHeight > window.innerHeight * 2,
      mainWidth: mainRect?.width || 0,
      mainInsideViewport: Boolean(mainRect && mainRect.left >= -1 && mainRect.right <= window.innerWidth + 1),
      themeButtonInsideViewport: Boolean(buttonRect
        && buttonRect.left >= 0
        && buttonRect.right <= window.innerWidth
        && buttonRect.top >= 0),
    };
  });
}

async function openEmbeddedLesson(page) {
  await enterGuestMode(page, BASE);
  await ensureSyllabusOpen(page);

  const chapter = page.locator('#courseSyllabus .syllabus-chapter', { hasText: SUBTOPIC.chapter });
  const chapterIndex = await chapter.first().getAttribute('data-idx');
  const panel = page.locator(`#courseSyllabus #syllabus-${chapterIndex}`);
  if (!await panel.evaluate(node => node.classList.contains('is-open'))) {
    await chapter.first().click();
    await panel.waitFor({ state: 'visible', timeout: 5000 });
  }

  await page.locator(`#courseSyllabus .syllabus-section[data-section="${SUBTOPIC.section}"]`).click();
  const card = page.locator(`.chapter-overview-subcard[data-sublesson-title="${SUBTOPIC.title}"]`);
  await card.waitFor({ state: 'visible', timeout: 10000 });

  const frame = page.locator('#learnExplainContent iframe.embedded-lesson-frame');
  for (let attempt = 0; attempt < 3 && !await frame.count(); attempt += 1) {
    await card.click();
    await page.waitForTimeout(350);
  }
  await frame.waitFor({ state: 'visible', timeout: 10000 });
  await frame.contentFrame().locator('body[data-lesson-revision="fresh-20260909"]').waitFor({ timeout: 10000 });
}

async function inspectEmbeddedShell(page) {
  return page.evaluate(() => {
    const visible = element => {
      if (!element) return false;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== 'none'
        && style.visibility !== 'hidden'
        && Number(style.opacity) > 0
        && rect.width > 0
        && rect.height > 0;
    };
    const frame = document.querySelector('#learnExplainContent iframe.embedded-lesson-frame');
    const explain = document.getElementById('learnExplainCol');
    const empty = document.getElementById('learnChatEmptyState');
    const chat = document.getElementById('learnChatCol');
    const fullscreen = document.getElementById('lesson-fullscreen');
    const theme = document.getElementById('theme-toggle');
    const fullRect = fullscreen?.getBoundingClientRect();
    const themeRect = theme?.getBoundingClientRect();
    const frameRect = frame?.getBoundingClientRect();
    const explainRect = explain?.getBoundingClientRect();
    return {
      frameVisible: visible(frame),
      frameFillsExplanation: Boolean(frameRect && explainRect
        && frameRect.width >= explainRect.width - 2
        && frameRect.height >= explainRect.height - 2),
      tutorVisible: visible(chat) && visible(empty),
      tutorTitle: empty?.querySelector('.empty-title')?.textContent.trim() || '',
      tutorEmptyAria: empty?.getAttribute('aria-hidden') || '',
      tutorHistoryEmpty: document.getElementById('learnChatContent')?.childElementCount === 0,
      fullscreenVisible: visible(fullscreen),
      fullscreenIconOnly: Boolean(fullscreen?.querySelector('svg')) && !fullscreen?.textContent.trim(),
      fullscreenChineseLabel: fullscreen?.getAttribute('aria-label') === '进入全屏',
      fullscreenAboveTheme: Boolean(fullRect && themeRect && Math.abs(fullRect.top - themeRect.top) < 1
        && fullscreen.closest('.learn-topbar') && theme.closest('.learn-topbar')),
    };
  });
}

async function main() {
  const server = spawnBridge(ROOT, PORT);
  let browser;
  try {
    await waitForHealth(BASE);
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    await context.addInitScript(() => localStorage.setItem('fourier-theme', 'light'));

    const lesson = await context.newPage();
    await lesson.goto(LESSON_URL, { waitUntil: 'domcontentloaded' });
    await lesson.locator('body[data-lesson-revision="fresh-20260909"]').waitFor();
    await settle(lesson);

    const desktop = await inspectLesson(lesson);
    record('current lesson uses the fresh seven-section continuous document',
      desktop.revision === 'fresh-20260909'
        && desktop.headings.join('|') === HEADINGS.join('|')
        && desktop.headingNumbers.join(',') === '1,2,3,4,5,6,7'
        && desktop.continuousScroll,
      JSON.stringify({ revision: desktop.revision, headings: desktop.headings }));
    record('current lesson contains the four reviewed interactive demos',
      desktop.demos.join(',') === DEMOS.join(',')
        && desktop.plotHosts === DEMOS.length * 2
        && desktop.checkpoints >= HEADINGS.length,
      JSON.stringify({ demos: desktop.demos, plotHosts: desktop.plotHosts, checkpoints: desktop.checkpoints }));
    record('desktop lesson fits the viewport and keeps its sticky progress header',
      desktop.horizontalOverflow <= 1
        && desktop.mainInsideViewport
        && desktop.themeButtonInsideViewport
        && desktop.progressPositionMode === 'sticky'
        && desktop.progressPosition === 'Current 1/7'
        && desktop.progressPercent === '14%',
      JSON.stringify(desktop));
    record('light mode shows a visible crescent icon with a Chinese action label',
      desktop.themeButtonVisible
        && desktop.moonVisible
        && !desktop.sunVisible
        && desktop.themeLabel === '切换到深色模式',
      JSON.stringify({ moon: desktop.moonVisible, sun: desktop.sunVisible, label: desktop.themeLabel }));

    await lesson.locator('#theme-toggle').click();
    await lesson.locator('html[data-theme="dark"]').waitFor();
    const dark = await inspectLesson(lesson);
    record('dark mode swaps to the sun icon and updates its label',
      dark.sunVisible && !dark.moonVisible && dark.themeLabel === '切换到浅色模式',
      JSON.stringify({ moon: dark.moonVisible, sun: dark.sunVisible, label: dark.themeLabel }));

    const firstCorrect = lesson.locator('[data-checkpoint]').first().locator('[data-correct="true"]');
    await firstCorrect.click();
    const checkpoint = await lesson.locator('[data-checkpoint]').first().evaluate(node => ({
      passed: node.dataset.passed,
      feedback: node.querySelector('.feedback')?.textContent.trim() || '',
    }));
    record('checkpoint feedback updates in place',
      checkpoint.passed === 'true' && checkpoint.feedback.startsWith('Correct.'),
      JSON.stringify(checkpoint));

    await lesson.locator('#section-7').scrollIntoViewIfNeeded();
    await lesson.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await lesson.waitForFunction(() => document.getElementById('progress-position')?.textContent === 'Current 7/7');
    const completedProgress = await lesson.evaluate(() => ({
      position: document.getElementById('progress-position')?.textContent.trim(),
      percent: document.getElementById('progress-percent')?.textContent.trim(),
      barWidth: document.getElementById('progress-bar')?.style.width || '',
    }));
    record('scrolling to the end reports section seven at 100 percent',
      completedProgress.position === 'Current 7/7'
        && completedProgress.percent === '100%'
        && completedProgress.barWidth === '100%',
      JSON.stringify(completedProgress));

    await lesson.setViewportSize({ width: 390, height: 844 });
    await lesson.evaluate(() => window.scrollTo(0, 0));
    await settle(lesson);
    const mobile = await inspectLesson(lesson);
    record('390px layout stays inside the viewport with usable controls',
      mobile.horizontalOverflow <= 1
        && mobile.mainInsideViewport
        && mobile.themeButtonInsideViewport
        && mobile.themeButtonVisible,
      JSON.stringify({ overflow: mobile.horizontalOverflow, mainWidth: mobile.mainWidth }));

    const shell = await context.newPage();
    await shell.setViewportSize({ width: 1440, height: 960 });
    await openEmbeddedLesson(shell);
    await settle(shell);
    const embedded = await inspectEmbeddedShell(shell);
    const composerBounds = () => shell.locator('#learnFollowupBar').boundingBox();
    const resting = await composerBounds();
    await shell.locator('#learnFollowupInput').focus();
    await settle(shell);
    const focused = await composerBounds();
    await shell.locator('#learnFollowupInput').fill('Hello');
    await settle(shell);
    const singleLine = await composerBounds();
    await shell.locator('#learnFollowupInput').fill(Array(20).fill('A longer question').join('\n'));
    await settle(shell);
    const multiline = await composerBounds();
    await shell.locator('#learnFollowupInput').fill('');
    await shell.locator('#learnTitle').click();
    await settle(shell);
    const cleared = await composerBounds();
    record('composer stays stable on focus, typing one line, and clearing',
      [focused, singleLine, cleared].every(box => Math.abs(box.y - resting.y) < 1 && Math.abs(box.height - resting.height) < 1),
      JSON.stringify({ resting, focused, singleLine, cleared }));
    record('multiline composer grows upward with its bottom anchored',
      multiline.height > resting.height && Math.abs(multiline.y + multiline.height - resting.y - resting.height) < 1);
    if (process.env.TUTOR_LAYOUT_SCREENSHOT) await shell.screenshot({ path: process.env.TUTOR_LAYOUT_SCREENSHOT });
    record('Fourier embeds the fresh lesson without a blank strip below it',
      embedded.frameVisible && embedded.frameFillsExplanation,
      JSON.stringify(embedded));
    record('fresh lesson opens with Ask your Tutor visible and empty',
      embedded.tutorVisible
        && embedded.tutorTitle === 'Ask your Tutor'
        && embedded.tutorEmptyAria === 'false'
        && embedded.tutorHistoryEmpty,
      JSON.stringify(embedded));
    record('fullscreen and theme controls share the top title bar',
      embedded.fullscreenVisible
        && embedded.fullscreenIconOnly
        && embedded.fullscreenChineseLabel
        && embedded.fullscreenAboveTheme,
      JSON.stringify(embedded));

    await shell.evaluate(() => document.querySelector('.app').classList.add('learn-browser-fullscreen'));
    for (const viewport of [{ width: 1440, height: 900 }, { width: 1280, height: 720 }]) {
      await shell.setViewportSize(viewport);
      await settle(shell);
      const bounds = await shell.evaluate(() => {
        const composer = document.getElementById('learnFollowupBar').getBoundingClientRect();
        const input = document.getElementById('learnFollowupInput').getBoundingClientRect();
        return { bottom: composer.bottom, inputBottom: input.bottom, height: innerHeight };
      });
      record('fullscreen composer fits at ' + viewport.width + 'x' + viewport.height,
        bounds.bottom <= bounds.height - 8 && bounds.inputBottom <= bounds.height - 8, JSON.stringify(bounds));
    }
    if (process.env.TUTOR_LAYOUT_SCREENSHOT) await shell.screenshot({ path: process.env.TUTOR_LAYOUT_SCREENSHOT });
    await context.close();
  } catch (error) {
    record('test harness completed', false, error.stack || error.message);
  } finally {
    if (browser) await browser.close();
    await stopBridge(server, { label: 'convolution-lesson-layout' });
  }

  const passed = results.filter(result => result.ok).length;
  console.log(`\n[convolution-lesson-layout] ${passed}/${results.length} passed`);
  if (passed !== results.length) process.exitCode = 1;
}

main();
