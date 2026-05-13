Tutor Agent 全量相关文件整理（基于 workspace 全扫描）

这一次不是只挑“主代码”，而是按“宁可全一点，不再漏”的标准整理。

已纳入的主要类别：
1. tutor-openclaw-ui/
   - 前端/运行桥接/生成目录/backup/users 等项目目录内全部相关内容（仅排除 .DS_Store、node_modules、__pycache__）
2. tutor-materials/
   - 教材 PDF、OCR 文本、背景页图片、预览图、lesson cache、prompts、提取脚本、metadata、section map 等
3. tutor_craft.py
4. workspace-root-related/
   - workspace 根目录下命中 tutor-openclaw/tutor agent 的辅助脚本、修补脚本、package.json、Dockerfile、重启脚本等
5. tmp/b5-preview-20260426-1720-en/
   - 与 tutor agent 预览内容相关的临时输出
6. project-memory/
   - 与 tutor agent 项目相关的长期/阶段性记忆摘录

说明：
- 这份是“项目相关全量版”，不是“最干净代码版”
- 如果后续要给 Codex/别人交接，建议优先看：
  1) tutor-openclaw-ui/
  2) tutor-materials/
  3) tutor_craft.py
  4) workspace-root-related/
  5) project-memory/
