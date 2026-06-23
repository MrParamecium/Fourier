# 2026-06-23 — Visual-diff harness gap RESOLVED

## 摘要

PR #71 留下的 visual-diff 盲区在本 session 内被诊断并修复。原推测
（Chromium HTTP cache / CSSOM staleness / playwright vs playwright-core
stylesheet caching）全部错误。真正 root cause 是 `#feedbackList` 的
inner `overflow: auto` 容器 — view 14b 在 click `.feedback-thread-body
[data-feedback-reply-anchor="thread-body"]` 时 Chromium 默认
`scrollIntoViewIfNeeded` 把内部容器滚到 scrollTop=1935 / scrollHeight=
2463，thread 1 的两个 `.feedback-reply-context` 落在 `top≈-1072` 和
`top≈-912`，超出 1280×800 capture viewport。

`page.screenshot({fullPage:true})` 也救不了 — document scrollHeight 等于
viewport，只有 inner container 在溢出。

## 交付

`tools/visual-diff.js`：

1. **新增 view 14c-feedback-board-thread1-contexts** —
   `scrollIntoView({block:'center'})` 在第一个 `.feedback-reply-context`，
   重新 click Charlie 的 reply 恢复 `.is-target`，断言两个 contexts
   全部 `fullyIn === true`。
2. **per-view `STRICT_FAIL_RATIO` 表** — 默认 `FAIL_RATIO=0.005`
   保持，view 14c 用 `0.0005`（0.05%）。Baseline-vs-baseline noise = 0
   pixels；§3a.i regression = 1002/1024000 = 0.098%（2× 安全余量）。
3. **报告新增 per-view threshold 列** + strict overrides 摘要行。

## 验证

| 场景 | View 14b | View 14c |
| --- | --- | --- |
| 干净 tree | 0.000% pass | 0.000% pass |
| §3a.i regression 复现 (L34743/L34744 删除) | 0.000% pass (gap reproduces) | 0.098% **fail** at 0.050% |
| 3 次连续 --check | 0/3 flake | 0/3 flake |

`tools/_probe-harness-gap.js` 留在 tree 内做 future regression
diagnostic — 文档化 in `docs/visual-diff-harness-gap.md`。

## 后续解锁

直接 unblock：
- §3b.i — feedback-board banner consolidation（~80 lines）
- §3a.i forward cleanup（~22 lines tone triplicate + reply-meta）

后续 followup（next session）：12-preference-page / 13-course-tracker /
03b-mistake-notebook-open-case / 24-answer-workspace 可能有相同
inner-scroll gap，需要单独 audit + 类似 scrollIntoView 处理。

## 工作流学到的事

1. **`addStyleTag` 的 selector specificity 不能被忽视**。原始
   gap-doc 的 diagnostic test (`#feedbackView .feedback-reply-context
   { border: 5px solid magenta !important }`) 用 (1,0,1) selector，
   被 L34743/L34744 的 (1,4,0) 完全 shadow，computed style 看起来
   "没变" — 误以为 CSS 没加载。实际上是 specificity 不够。Diagnostic
   override 必须匹配或超越目标规则的 specificity ladder。

2. **`fullPage:true` 不是万能的**。它只扩到 `document
   .documentElement.scrollHeight`。Inner `overflow:auto` 容器的
   隐藏内容它一样看不见。审 view 设计时要确认 cascade-relevant
   元素是否在 inner-scroll container 里，并且 scrollTop 是否把
   它们推出视野。

3. **Geometry probe 是 cascade-blindness 诊断的金标准**。
   `getBoundingClientRect()` + ancestor `overflow:auto` chain 一次
   probe 就把问题暴露。`tools/_probe-harness-gap.js` 是 reusable
   模板。

4. **per-view threshold 比 global threshold 更适合细粒度 cascade
   coverage**。Default 0.5% 对大区域 layout regression 合理，但
   thin chip 上的 border-color 翻转只产生 ~0.1% diff — 漏过 default
   threshold 是 silent gap。STRICT_FAIL_RATIO 映射表是 explicit、
   auditable 的解法。

Related: [[project-phase3-status]], [[reference-visual-diff-harness-gap]].
