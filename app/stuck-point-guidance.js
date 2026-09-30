'use strict';

function normalizeQuestion(text) {
  return String(text || '').toLowerCase().replace(/[\s\p{P}\p{S}\p{M}]+/gu, ' ').trim();
}

// Explicit "I'm stuck" markers, zh + en.
const STUCK = [
  /\b(i (?:don'?t|do not) understand|still (?:don'?t|do not) understand|i'?m stuck|still stuck|i'?m confused|still confused|i can'?t (?:do|follow) (?:it|this)|still can'?t|don'?t know how|i'?m lost)\b/i,
  /(不懂|不理解|还是不会|不会做|卡住了?|困惑|搞不清|看不懂|没看懂|不知道怎么做|跟不上)/u,
];

// Markers that the question itself names the stumbling block (a specific
// operation, step, formula, ...). Such questions are locatable: answer them
// directly even when they also say "I don't understand".
const SPECIFIC = /(why|how (?:do|to|can|does|did)|\bwhat (?:is|are|was|were)\b|what(?:'s| is) the (?:difference|meaning|formula|result)|derive|derivation|prove|proof|formula|equation|integral|step|example|exercise|homework|practice|parameter|condition|flip|shift|overlap|convolve|invert|transform)/i;
const SPECIFIC_ZH = /(为什么|为何|什么是|是什么|何为|何谓|定义|含义|意思|怎么算|如何计算|怎么推|怎么求|推导|证明|公式|方程|积分式|步骤|例题|习题|作业|哪一步|第[一二三四五六七八九十\d]+\s*[步部分问节]|翻转|平移|反转|折叠|重叠|卷积积分|参数|条件|区别|关系|应用)/;

function stripStuckPhrases(text) {
  return String(text)
    .replace(/\b(i (?:don'?t|do not) understand|still (?:don'?t|do not) understand|i'?m stuck|still stuck|i'?m confused|still confused|i can'?t (?:do|follow) (?:it|this)|still can'?t (?:do it|follow)|don'?t know how(?: to)?|i'?m lost)\b/gi, ' ')
    .replace(/(不懂|不理解|还是不会|不会做|卡住了?|困惑|搞不清|看不懂|没看懂|不知道怎么做|跟不上)/gu, ' ');
}

// A vague ask is short and names no specific stumbling block.
function isShortVague(normalized) {
  const cjk = (normalized.match(/[\u4e00-\u9fff]/g) || []).length;
  const rest = normalized.replace(/[\u4e00-\u9fff]/g, '').replace(/\s+/g, ' ').trim();
  return cjk <= 10 && rest.length <= 24;
}

function shouldOfferStuckPointGuidance({ question, history = [], guidanceAlreadyShown = false } = {}) {
  if (guidanceAlreadyShown) return { offer: false, reason: null };
  const raw = String(question || '');
  const current = normalizeQuestion(raw);
  if (!current) return { offer: false, reason: null };

  // 1) Explicit stuck marker: only when the stuck point itself is not locatable.
  //    "我不懂卷积" → card; "还是不懂第3步为什么翻转" → answer directly.
  if (STUCK.some(pattern => pattern.test(raw))) {
    const remainder = normalizeQuestion(stripStuckPhrases(raw));
    if (SPECIFIC.test(raw) || SPECIFIC_ZH.test(raw) || !isShortVague(remainder)) {
      return { offer: false, reason: 'specific_stuck' };
    }
    return { offer: true, reason: 'explicit_stuck' };
  }

  // 2) The same vague question repeated back to back still cannot be located.
  const studentTurns = history.filter(item => item && item.role === 'user').slice(-2).map(item => normalizeQuestion(item.content));
  if (studentTurns.length >= 2
    && studentTurns[studentTurns.length - 1] === current
    && isShortVague(current)
    && !SPECIFIC.test(current)
    && !SPECIFIC_ZH.test(current)) {
    return { offer: true, reason: 'repeated' };
  }

  return { offer: false, reason: null };
}

// A clearly specific question re-arms the stuck-point flow after it fired once.
function isSpecificQuestion(text) {
  const raw = String(text || '');
  return Boolean(SPECIFIC.test(raw) || SPECIFIC_ZH.test(raw));
}

// Browser + Node dual export. The guarded module.exports keeps the browser
// path (plain <script>) from throwing on the missing `module` global.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { normalizeQuestion, shouldOfferStuckPointGuidance, isSpecificQuestion };
}
if (typeof window !== 'undefined') {
  window.stuckPointGuidance = { normalizeQuestion, shouldOfferStuckPointGuidance, isSpecificQuestion };
}
