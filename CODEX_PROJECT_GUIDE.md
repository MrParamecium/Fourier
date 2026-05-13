# CODEX_PROJECT_GUIDE.md

给接手这个项目的 Codex：请先读这份文件，再开始改代码。

## 0. 这份文件是干什么的

这不是产品文案，而是**接手说明**。

目标：让你快速搞清楚这份 `tutor agent` 文件夹里：
- 哪些内容最重要
- 哪些是主项目
- 哪些是教材/生成素材/缓存
- 哪些是历史修补脚本
- 应该按什么顺序阅读和接手

---

## 1. 先看结论

### 最重要的主干目录/文件
请优先看：

1. `tutor-openclaw-ui/`
2. `tutor_craft.py`
3. `workspace_tutor_related_full/tutor-materials/`
4. `workspace_tutor_related_full/project-memory/`
5. `workspace_tutor_related_full/workspace-root-related/`

如果时间非常有限，至少先读：
- `tutor-openclaw-ui/index.html`
- `tutor-openclaw-ui/app.js`
- `tutor-openclaw-ui/style.css`
- `tutor_craft.py`
- `workspace_tutor_related_full/project-memory/MEMORY.md`

---

## 2. 这个项目是什么

这是一个面向 **Signal Processing and Linear Systems（信号与线性系统）** 学习场景的 **Tutor Agent** 项目。

它不是纯聊天 demo，而是想做成一个真正能用的教学产品：
- 帮学生更快学懂
- 让进度可见
- 强考试导向
- 支持图解/讲解/题目/教材内容联动

用户特别在意：
- 产品要真的能教学，不只是“能演示”
- 改动要符合学习效率与高分导向
- UI/内容设计要贴近“懒得学但想高分”的学生

---

## 3. 文件夹结构说明

### A. `tutor-openclaw-ui/`
这是**主项目代码目录**，优先级最高。

你可以把它理解成当前最直接可操作的主工程。

里面重点关注：
- `index.html`：页面结构
- `app.js`：主前端逻辑，项目最关键文件之一
- `style.css`：样式
- `ws-bridge.js`：桥接逻辑
- `process-python.js`：可能与 Python 处理流程相关
- `section-page-map*.json` / `section-figure-map-new.json`：章节与内容映射数据

可能还会看到：
- `generated/`：生成结果/运行产物
- `backup/`：历史备份
- `users/`：运行期数据
- 一些 `fix-*.py/js`：临时修补脚本

这些不是都同等重要。

### B. `tutor_craft.py`
这是根目录下单独的 tutor 相关脚本，属于项目逻辑的一部分，建议早看。

### C. `workspace_tutor_related_full/tutor-materials/`
这是**教材与内容处理资产库**，也非常关键。

里面包括：
- 教材 PDF
- OCR 文本
- background pages / split pages
- section map
- metadata
- previews
- lesson cache
- prompts
- 提取/预处理脚本

如果你要改：
- 教材映射
- 章节预览
- OCR 结果
- 内容预生成
- lesson cache

那这里很重要。

### D. `workspace_tutor_related_full/project-memory/`
这是项目记忆摘录。

这里不是代码，但**非常值得读**，因为它会告诉你：
- 用户偏好
- 项目阶段性状态
- 已做过哪些关键决策
- 哪些坑已经踩过

尤其优先看：
- `MEMORY.md`
- 较新的日期文件

### E. `workspace_tutor_related_full/workspace-root-related/`
这是从原 workspace 根目录抓出来的一批**相关辅助脚本**。

特点：
- 很多是临时 patch / fix / layout / style 调整脚本
- 有些很可能只在某个阶段用过一次
- 但它们能反映项目是怎么被逐步修出来的

如果你在主代码里看到一些难理解的历史痕迹，来这里找上下文可能有帮助。

### F. `workspace_tutor_related_full/tmp/`
临时输出或预览性文件，不一定是主线，但可能有参考价值。

---

## 4. 你应该怎么接手

推荐顺序：

### 第一轮：先建立全局理解
1. 读 `workspace_tutor_related_full/project-memory/MEMORY.md`
2. 看 `tutor-openclaw-ui/index.html`
3. 看 `tutor-openclaw-ui/app.js`
4. 看 `tutor-openclaw-ui/style.css`
5. 看 `tutor_craft.py`

### 第二轮：补足教材/内容处理链路
6. 看 `workspace_tutor_related_full/tutor-materials/`
7. 优先关注其中的：
   - 预处理脚本
   - section map
   - metadata
   - previews
   - lesson cache
   - prompts

### 第三轮：理解历史修补痕迹
8. 再看 `workspace_tutor_related_full/workspace-root-related/`
9. 最后按需看 `generated/`、`backup/`、`tmp/`

---

## 5. 这个项目里“什么是核心，什么不是”

### 核心
- `tutor-openclaw-ui/` 中真正驱动界面和逻辑的文件
- `tutor-materials/` 中支持教材映射/预览/内容生成的资产和脚本
- `tutor_craft.py`
- 项目记忆中的关键产品/技术决策

### 半核心
- `workspace-root-related/` 中与主工程强相关的 patch/fix 脚本
- lesson cache
- section map / preview / metadata 文件

### 非核心但可能有用
- `generated/`
- `backup/`
- `tmp/`
- 各种一次性测试脚本

---

## 6. 用户的重要偏好（非常重要）

用户 Harrison 有几个很强的偏好：

1. **默认用中文沟通**
2. **绝对不要出现韩语**
3. 回复可以自然一点、像真人一点、可以带少量表情 😊
4. 不喜欢空话，喜欢直接、可执行、能落地
5. 一个很关键的硬规则：

> 每次对话都先评估合理性，先说打算怎么做，但先不要执行；等他明确下令后再动手。

如果你忽略这一条，用户会觉得你没对齐。

---

## 7. 项目目标与设计原则

这个项目的目标用户不是“研究员”，而是更偏向：
- 学习动力没那么强
- 想尽快搞懂
- 更看重考试分数
- 需要很低启动门槛

设计原则大致是：
1. 进度可见
2. 极度精简
3. 考试导向
4. 即时测验
5. 时间承诺
6. 最短路径

所以如果你要改产品/内容流，不要只从“技术更优雅”出发，也要从“学生更容易学下去”出发。

---

## 8. 已知状态（简版）

根据已有项目记忆，可知项目已经做过这些重要进展：
- 双书切换
- 新书处理完成（文字提取、图片渲染、metadata、section map）
- 预览已预生成并注入
- 语言切换问题修复
- 静态文件 no-cache 处理
- 附件上传支持
- 用户画像问卷优化
- IME 回车误发送修复
- Markdown 表格渲染修复

但还要留意：
- 新书章节 preview loading 是否彻底稳定
- 讲解内容预生成缓存还可能是后续工作点

---

## 9. 如果你要开始真正动手

建议你先回答自己这几个问题：
1. 当前要改的是 UI，还是教材处理链路？
2. 改动会落在 `tutor-openclaw-ui/`，还是 `tutor-materials/`？
3. 相关 patch/fix 历史脚本里有没有前人已经试过的方案？
4. 这个改动是否符合“进度可见、考试导向、极度精简”的原则？

---

## 10. 一句话交接

别把这个项目当成普通前端 demo。

它其实是：
- 一个教学产品原型
- 一套教材内容处理流水线
- 一堆为产品体验迭代出来的前端/脚本/缓存/修补痕迹
- 再加上一份很重要的用户偏好与项目记忆

先读主线，再碰细枝末节。