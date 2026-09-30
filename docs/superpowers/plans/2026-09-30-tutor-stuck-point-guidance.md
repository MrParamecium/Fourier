# Fourier Tutor 卡点定位引导实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 Fourier 问答区已有教学路径功能上，加入克制的自动卡点定位触发，并支持三个选项、自由输入和“带我从头看”兜底，让选择结果真实影响 Tutor 回答。

**Architecture:** 保留现有 `app/guidance-service.js` 的教材检索和选项生成、`app/guidance-mode.js` 的卡片状态管理，以及 `app/ws-bridge.js` 的单轮 guidance 注入。新增一个纯函数触发策略，根据问题文本、对话历史和最近重复追问判断是否请求卡片；在 `app.js` 的主问答和 lesson follow-up 发送前调用。卡片仍嵌入消息流，选择或自由文本转成一次性 `guidance` 上下文，提交后清除当前卡片状态。

**Tech Stack:** Vanilla JavaScript, Node built-in test runner, Playwright, existing Tutor API and guidance modules.

**Spec:** `docs/superpowers/specs/2026-09-30-tutor-stuck-point-guidance-design.md`

## Global Constraints

- 明确问题直接回答，不显示卡片。
- 卡片只在问题模糊、学生明确表示不懂，或同一处连续追问仍无法定位时显示。
- 首版只做定位卡点，不把每次回答变成选择题。
- 卡片嵌入问答消息流，不使用阻断式全屏弹窗。
- 选择结果必须改变本轮回答起点，不写入长期教学偏好。
- 选项不预选、不标记推荐答案；自由输入为空时不能提交。

---

### Task 1: 定义并测试卡点定位触发策略

**Files:**
- Create: `app/stuck-point-guidance.js`
- Create: `tools/test-stuck-point-guidance.js`
- Modify: `package.json` (add `test:stuck-point-guidance`)

**Interfaces:**
- Produces `shouldOfferStuckPointGuidance({ question, history, guidanceAlreadyShown }) -> { offer: boolean, reason: 'ambiguous'|'explicit_stuck'|'repeated'|null }`.
- Produces `normalizeQuestion(text) -> string` for stable matching.

- [ ] **Step 1: Write failing tests** for explicit questions, vague stuck phrases, repeated unresolved questions, clear follow-up questions, and the one-card-per-turn guard.
- [ ] **Step 2: Run `node tools/test-stuck-point-guidance.js`** and verify it fails because the module does not exist.
- [ ] **Step 3: Implement the pure strategy** with bounded phrase lists in Chinese and English, repeated-question comparison against the last two student turns, and an explicit `guidanceAlreadyShown` guard.
- [ ] **Step 4: Run the focused test** and verify PASS.
- [ ] **Step 5: Add `"test:stuck-point-guidance": "node tools/test-stuck-point-guidance.js"`** and commit `test: define stuck-point guidance trigger`.

### Task 2: Add free-text and fallback submission to the guidance state machine

**Files:**
- Modify: `app/guidance-mode.js`
- Modify: `app/style.css`
- Modify: `tools/test-guidance-ui.js`

**Interfaces:**
- Extend `requestChoice(input)` result with `{ status: 'selected'|'custom'|'from_start'|'skipped'|'cancelled', guidance }`.
- `guidance` remains one-turn data: `{ id, title, instruction, source: 'choice'|'custom'|'from_start' }`.

- [ ] **Step 1: Add failing Playwright assertions** for a custom text field, disabled submit when empty, custom submission, and “还分不清，带我从头看”.
- [ ] **Step 2: Run `node tools/test-guidance-ui.js`** and verify the new assertions fail.
- [ ] **Step 3: Render a textarea/input below the three generated choices**, keep the existing skip/cancel actions, and add the fallback action without changing the existing API response shape.
- [ ] **Step 4: Convert custom text into a bounded instruction** prefixed with “Student’s own description of the stuck point”; convert fallback into a fixed from-basics instruction.
- [ ] **Step 5: Add keyboard behavior**: Tab moves through choices, input, fallback, skip, cancel; Enter submits the custom text only when non-empty.
- [ ] **Step 6: Run the focused Playwright test** and verify PASS; commit `feat: support custom stuck-point guidance`.

### Task 3: Trigger guidance only when the student needs help locating the problem

**Files:**
- Modify: `app/app.js` around `sendLearnFollowup`, main ask submission, and guidance initialization.
- Modify: `app/index.html` only if a lesson-scoped guidance mount is missing.
- Modify: `app/lesson-tour.css` only if the existing guidance panel needs message-stream spacing.

**Interfaces:**
- Consumes `shouldOfferStuckPointGuidance` from `stuck-point-guidance.js`.
- Consumes `window.guidanceMode.requestChoice({ scope, question, history, sectionId, sectionTitle, lessonContext, language, signal })`.
- Produces `selectedGuidance` or no guidance for the existing `callAsk` payload.

- [ ] **Step 1: Add a deterministic integration test fixture** covering “我不懂卷积”, “为什么要翻转 h(τ)?”, repeated “还是不会”, and a second question after a completed card.
- [ ] **Step 2: Wire the trigger before `callAsk`** in both main and lesson flows; when `offer` is false, preserve the current direct-answer path byte-for-byte.
- [ ] **Step 3: Mount the card inline after the student bubble**, await its result, and pass the returned one-turn guidance to `callAsk`.
- [ ] **Step 4: Record the original question and selected/custom result in the visible chat history**, without adding it to long-term preferences.
- [ ] **Step 5: Ensure one card maximum per submitted turn** and reset the scope after the resulting answer is rendered.
- [ ] **Step 6: Run `node tools/test-guidance-ui.js`, `node tools/test-ask-guidance.js`, and the integration fixture**; commit `feat: trigger tutor stuck-point guidance contextually`.

### Task 4: Validate answer-context behavior and regressions

**Files:**
- Modify: `tools/test-ask-guidance.js`
- Modify: `tools/test-guidance-ui.js`
- Create: `tools/test-stuck-point-guidance-integration.js`

- [ ] **Step 1: Assert the API receives choice, custom, and from-start guidance** and rejects empty or malformed custom data.
- [ ] **Step 2: Assert explicit questions bypass the card** and still call the normal answer path.
- [ ] **Step 3: Assert a selected “积分上下限” path produces a request whose guidance instruction contains that path and does not modify long-term teaching instructions.
- [ ] **Step 4: Run focused tests plus `npm run check` and `git diff --check`.
- [ ] **Step 5: Review the rendered lesson Q&A flow in Playwright**: card appears inline, no full-screen blocker, answer follows selected path, and the next turn is direct unless it independently meets the trigger rule.
- [ ] **Step 6: Commit `test: verify contextual stuck-point guidance` and report any browser-only limitation explicitly.
