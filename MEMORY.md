# MEMORY.md - 核心记忆库

## 约定与习惯 (Conventions & Habits)
- **强制记忆规则**：主动记录每一次对话的核心内容或关键想法，确保在跨 Session 或模型切换间不丢失连续性。
- （2026-03-16 记录）：之前关于 tutor agent demo 的对话意外丢失。从今开始更频繁地、更具体地进行记录。
- （2026-03-18 新增用户偏好）：**只要是前端任务（页面/UI/样式改造），除非用户明确指定模型，否则默认切换到 `openrouter/google/gemini-3.1-pro-preview`（Gemini 3.1 Pro Preview）执行。**

## 项目 (Projects)
- **Tutor Agent Demo**：
  - **目标**：开发一个基于 OpenClaw 的 tutor agent demo。
  - **核心功能**：根据用户 prompt，生成算法/原理图解或 AI 视频讲解。
  - **当前切入点**：Graph algorithms (图算法) 和 Signal processing (信号处理) 的可视化 (Visualization)。
  - **初始课题**：BFS (广度优先搜索)、DFS (深度优先搜索)、傅立叶变换 (Fourier Transform)、最短路径算法 (Shortest Path Algorithms)。
  - **交付形态**：将其封装为一个标准的 OpenClaw **AgentSkill**（技能包），使得任何 OpenClaw 实例都能通过自然语言（如特定关键词）唤醒该技能。
  - **部署与访问方式**：将加载了 `tutor-agent` 技能的 OpenClaw Core 部署在云服务器（VPS）上，对外提供 HTTP/API 接口，用户（前端/客户端应用）直接通过网络调用，无需本地安装和部署 OpenClaw。
  - **Demo 演示方案**：先在本地 MacBook 环境运行 OpenClaw 作为“云服务器”，配合一个前端网页构成“高级版 Chatbot”向老师展示。
  - **核心优势辩护 (相对于纯对话 LLM)**：OpenClaw Agent 具备**环境操作能力**（执行代码、生成真实文件如 .mp4/.png、调用外部引擎如 Manim/Python），而不仅仅是输出文本形式的代码或文字解释。它可以真正做到“我说画图，它就产出一个图表文件并渲染到前端”，这是纯文本的 Gemini/ChatGPT-Web 无法独立做到的无缝体验。
  - **最终架构敲定 (2026-03-17)**：
    - **两条平行的产品线 (完全分开)**：
      1. **线一 (动画演示)**：Python 生成严谨的步骤推演动画 (Step-by-step Animation)。如用 NetworkX/Matplotlib 生成 `.gif`/`.mp4`。
      2. **线二 (静态图片)**：调用文生图 API（明确为 OpenRouter 中的 `google/gemini-3.1-flash-image-preview`，即用户提及的 nano banana 2 模型）**仅生成概念图片**，不做画蛇添足的废话播客讲稿，只做正常的硬核知识原理解释。
    - **当前任务**：技能重命名为 `image&animation generation` (目录名为 `image-animation-generation`)，已将其部署在用户的 `~/.agents/skills/image-animation-generation` 目录下。
  - **当前进行阶段：单点突破 (2026-03-17 18:44)**
    - 废除多轨并行的虚假繁荣，执行 **单功能全链路闭环 (MVP)**。
    - **目标功能**：只针对“轨道 2 (AIGC 生成静态配图)” 进行端到端打通。
    - **全链路流程**：用户在手机浏览器输入 Prompt (“请给我讲解 DFS 的原理”) -> 触发 AgentSkill `image-animation-generation` -> 提取用户的 Prompt -> **不经过任何润色**，直接通过 API 扔给 Nano Banana (`google/gemini-3.1-flash-image-preview`) -> Nano Banana 返回图片 URL 结果 -> Tutor Agent 组织语言 (讲解文字 + Markdown 图片链接) -> 原路返回显示在用户的手机网页上。