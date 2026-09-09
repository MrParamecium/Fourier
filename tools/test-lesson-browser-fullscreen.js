const fs = require('fs');

const indexHtml = fs.readFileSync('app/index.html', 'utf8');
const appJs = fs.readFileSync('app/app.js', 'utf8');
const styleCss = fs.readFileSync('app/style.css', 'utf8');
const lessonHtml = fs.readFileSync('app/lessons/2_4-2/lesson.html', 'utf8');
const lessonJs = fs.readFileSync('app/lessons/2_4-2/lesson.js', 'utf8');

const failures = [];
const requireMatch = (source, pattern, label) => {
  if (!pattern.test(source)) failures.push(label);
};

requireMatch(indexHtml, /id="learnFullscreenBtn"/, 'fullscreen button id');
requireMatch(indexHtml, /id="learnFullscreenBtn"[\s\S]{0,260}aria-controls="learnBody"/, 'fullscreen aria-controls');
requireMatch(indexHtml, /id="learnFullscreenBtn"[\s\S]{0,260}aria-pressed="false"/, 'fullscreen aria-pressed');
requireMatch(lessonHtml, /class="lesson-tools"><button id="lesson-fullscreen"/, 'fullscreen button in lesson tools');
requireMatch(indexHtml, /learn-fullscreen-icon-enter/, 'fullscreen icon');
requireMatch(indexHtml, /learn-fullscreen-label/, 'fullscreen accessible label');
requireMatch(appJs, /const labelNode = learnFullscreenBtn\.querySelector\('\.learn-fullscreen-label'\)/, 'fullscreen label node update');
requireMatch(appJs, /if \(learnChatContent\) learnChatContent\.innerHTML = ''/, 'clear Tutor history for fresh lesson');
requireMatch(appJs, /tutorEmpty\.classList\.remove\('hidden'\)/, 'restore Tutor empty state class');
requireMatch(lessonHtml, /class="moon"[\s\S]{0,260}fill="none"/, 'lesson crescent icon');
requireMatch(lessonJs, /切换到\$\{next==='dark'\?'浅色':'深色'\}模式/, 'lesson theme label');
requireMatch(appJs, /isLearnBrowserFullscreen/, 'fullscreen state');
requireMatch(appJs, /learnFullscreenSidebarState/, 'fullscreen sidebar state');
requireMatch(appJs, /learnFullscreenReturnFocus/, 'fullscreen return focus state');
requireMatch(appJs, /function requestLearnBrowserFullscreen\s*\(/, 'fullscreen request function');
requireMatch(appJs, /function exitLearnBrowserFullscreen\s*\(/, 'fullscreen exit function');
requireMatch(appJs, /function syncLearnBrowserFullscreenState\s*\(/, 'fullscreen sync function');
requireMatch(appJs, /syncLearnBrowserFullscreenState\s*\(\)[\s\S]{0,2600}applyLearnChatCollapsedState\(\)/, 'fullscreen Tutor state resync');

if (process.argv.includes('--css')) {
  requireMatch(styleCss, /\.app\.learn-browser-fullscreen/, 'fullscreen app class');
  requireMatch(styleCss, /\.app\.learn-browser-fullscreen[^}]*#leftSidebar/s, 'fullscreen left sidebar rule');
  requireMatch(styleCss, /\.learn-fullscreen-btn/, 'fullscreen button styles');
  requireMatch(styleCss, /\.learn-fullscreen-icon-enter/, 'fullscreen enter icon styles');
  requireMatch(
    styleCss,
    /\.app\.learn-browser-fullscreen\.app\.learn-browser-fullscreen[^,{]*#learnBody\.chat-collapsed #learnChatFab[\s\S]*?\{[^}]*position:\s*fixed\s*!important/,
    'fullscreen Tutor orb position'
  );
  requireMatch(
    styleCss,
    /\.app\.learn-browser-fullscreen\.app\.learn-browser-fullscreen[^,{]*#learnBody\.chat-collapsed #learnChatFab[\s\S]*?\{[^}]*visibility:\s*visible\s*!important/,
    'fullscreen Tutor orb visibility'
  );
}

if (failures.length) {
  console.error(`[lesson-browser-fullscreen] FAIL - ${failures.join(', ')}`);
  process.exit(1);
}

console.log('[lesson-browser-fullscreen] PASS');
