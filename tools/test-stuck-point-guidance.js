'use strict';
const assert = require('node:assert/strict');
const { normalizeQuestion, shouldOfferStuckPointGuidance, isSpecificQuestion } = require('../app/stuck-point-guidance');
assert.equal(normalizeQuestion(' Why?  h(τ)! '), 'why h τ');

// 明确卡点 + 模糊 → 弹卡
assert.equal(shouldOfferStuckPointGuidance({ question: '我不懂卷积' }).reason, 'explicit_stuck');
assert.equal(shouldOfferStuckPointGuidance({ question: '看不懂，卡住了' }).reason, 'explicit_stuck');

// 明确卡点 + 具体知识点/操作 → 直接回答，不弹卡
assert.equal(shouldOfferStuckPointGuidance({ question: '为什么要把 h(τ) 翻转?' }).offer, false);
assert.equal(shouldOfferStuckPointGuidance({ question: '还是不懂第3步为什么要翻转' }).offer, false);
assert.equal(shouldOfferStuckPointGuidance({ question: 'I still don\'t understand how to set up the integral' }).offer, false);
assert.equal(shouldOfferStuckPointGuidance({ question: '为什么我不懂卷积积分的推导' }).offer, false);

// 裸话题提问（what is / explain）属于明确问题 → 直接回答，不弹卡
assert.equal(shouldOfferStuckPointGuidance({ question: 'what is convolution' }).offer, false);
assert.equal(shouldOfferStuckPointGuidance({ question: 'explain the convolution integral with an example' }).offer, false);

// 重复追问且模糊 → 弹卡；重复但具体 → 不弹
assert.equal(shouldOfferStuckPointGuidance({ question: '卷积怎么理解', history: [{ role: 'user', content: '卷积怎么理解' }, { role: 'user', content: '卷积怎么理解' }] }).reason, 'repeated');
assert.equal(shouldOfferStuckPointGuidance({ question: '卷积怎么算', history: [{ role: 'user', content: '卷积怎么算' }, { role: 'user', content: '卷积怎么算' }] }).offer, false);

// 一次定位后不再连续弹卡
assert.equal(shouldOfferStuckPointGuidance({ question: '我不懂', guidanceAlreadyShown: true }).offer, false);

// 具体问题重置流程标记
assert.equal(isSpecificQuestion('为什么要把 h(τ) 翻转?'), true);
assert.equal(isSpecificQuestion('我不懂卷积'), false);
console.log('[stuck-point-guidance] PASS');
