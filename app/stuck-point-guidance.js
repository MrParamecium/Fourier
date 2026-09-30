'use strict';

function normalizeQuestion(text) {
  return String(text || '').toLowerCase().replace(/[\s\p{P}\p{S}]+/gu, ' ').trim();
}

const STUCK = [
  /\b(i (?:don'?t|do not) understand|still (?:don'?t|do not) understand|i'?m stuck|still stuck|i'?m confused|still confused|i can'?t do it|still can'?t|don'?t know how)\b/i,
  /(不懂|不理解|还是不会|不会做|卡住|困惑|搞不清|看不懂|不知道怎么做|没看懂)/u,
];
const AMBIGUOUS = [/^(what is|explain|help me with|how do i learn)\b/i, /^(这是什么|讲一下|帮我看看|怎么学|不会)\s*$/u];

function shouldOfferStuckPointGuidance({ question, history = [], guidanceAlreadyShown = false } = {}) {
  if (guidanceAlreadyShown) return { offer: false, reason: null };
  const current = normalizeQuestion(question);
  if (!current) return { offer: false, reason: null };
  if (STUCK.some(pattern => pattern.test(String(question)))) return { offer: true, reason: 'explicit_stuck' };
  if (AMBIGUOUS.some(pattern => pattern.test(String(question)))) return { offer: true, reason: 'ambiguous' };
  const studentTurns = history.filter(item => item && item.role === 'user').slice(-2).map(item => normalizeQuestion(item.content));
  if (studentTurns.length >= 2 && studentTurns[studentTurns.length - 1] === current) return { offer: true, reason: 'repeated' };
  return { offer: false, reason: null };
}

module.exports = { normalizeQuestion, shouldOfferStuckPointGuidance };
