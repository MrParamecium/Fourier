'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'app/index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app/app.js'), 'utf8');
const server = fs.readFileSync(path.join(root, 'app/ws-bridge.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'app/style.css'), 'utf8');

const lessonComposer = html.match(/<div class="learn-followup-bar[\s\S]*?<input type="file" id="fileInputLearn"/)?.[0] || '';
assert.ok(lessonComposer, 'lesson Tutor composer must exist');
assert.ok(!lessonComposer.includes('id="learnModeToggleBtn"'), 'lesson Tutor must not expose an answer mode button');
assert.ok(!lessonComposer.includes('id="guidanceToggleBtnLearn"'), 'lesson Tutor must not expose Guided');
assert.ok(!lessonComposer.includes('id="webSearchToggleBtnLearn"'), 'lesson Tutor must not expose web search');
assert.ok(lessonComposer.includes('id="answerLengthToggleLearn"'), 'internal answer-length compatibility select must remain');
assert.ok(lessonComposer.includes('style="display:none;"'), 'internal answer-length select must remain hidden');

const popover = html.match(/<div class="learn-chat-popover[\s\S]*?<input type="file" id="fileInputLearnPopover"/)?.[0] || '';
assert.ok(!popover.includes('answerLengthToggleLearnPopover'), 'Tutor popover must not expose answer modes');
assert.ok(!popover.includes('guidanceToggleBtnLearnPopover'), 'Tutor popover must not expose Guided');
assert.ok(!popover.includes('webSearchToggleBtnLearnPopover'), 'Tutor popover must not expose web search');

const focusPanel = html.match(/<aside class="textbook-focus-qa-panel[\s\S]*?<\/aside>/)?.[0] || '';
assert.ok(!focusPanel.includes('answerLengthToggleTextbookFocus'), 'textbook focus Tutor must not expose answer modes');
assert.ok(!focusPanel.includes('guidanceToggleBtnTextbookFocus'), 'textbook focus Tutor must not expose Guided');
assert.ok(!focusPanel.includes('webSearchToggleBtnTextbookFocus'), 'textbook focus Tutor must not expose web search');

const followup = app.match(/async function sendLearnFollowup[\s\S]*?learnFollowupInput\.addEventListener\('keydown'/)?.[0] || '';
assert.ok(followup, 'sendLearnFollowup must exist');
assert.ok(!followup.includes('requestChoice'), 'lesson Tutor must not show per-turn teaching-path choices');
assert.ok(followup.includes('useWebSearch: false'), 'lesson Tutor must default to textbook-only retrieval');
assert.ok((followup.match(/buildSearchProgressMarkup\('learn-followup'/g) || []).length >= 2, 'lesson Tutor must use the compact thinking state');
assert.ok(app.includes('class="tutor-thinking"'), 'compact thinking markup must exist');

assert.ok(server.includes("origin: origin"), 'server must forward the Q&A origin to explanation generation');
assert.ok(server.includes('DEFAULT LESSON TUTOR TEACHING CONTRACT'), 'server must apply the built-in lesson Tutor teaching contract');

assert.ok(css.includes('TUTOR PANEL SIMPLIFICATION LOCK'), 'final Tutor simplification CSS must exist');
assert.ok(css.includes('TUTOR COMPACT CHAT LOCK'), 'compact message and composer CSS must exist');
assert.ok(css.includes('width: fit-content !important;'), 'user question bubble must hug its text');
assert.ok(css.includes('@keyframes tutor-thinking-float'), 'thinking indicator must animate');
assert.ok(css.includes('background: transparent !important;'), 'assistant answer surface must be transparent');
assert.ok(css.includes('box-shadow: none !important;'), 'assistant answer surface must not render a card shadow');

console.log('PASS: lesson Tutor uses one default teaching mode, no visible search control, and open assistant answers');
