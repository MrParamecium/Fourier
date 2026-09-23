// Lightweight UI i18n: dictionary lookup + data-i18n DOM binding.
// Scope: shell UI only (sidebar, settings, login, tour, overview navigation).
// Lesson content stays English — see docs note in i18n keys usage.
(() => {
  'use strict';

  const LANG_STORAGE_KEY = 'aquarius-lang';
  const listeners = [];

  const dicts = {
    en: {},
    zh: {}
  };

  // ── Dictionary ──────────────────────────────────────────────
  // en values double as the lookup keys for brevity at call sites.
  dicts.en = {
    'nav.home': 'Home',
    'nav.syllabus': 'Syllabus',
    'nav.recent': 'Recent chats',
    'nav.courseTracker': 'Course Tracker',
    'nav.mistakeNotebook': 'Mistake Notebook',
    'nav.settings': 'Settings',
    'recent.empty': 'No recent queries yet.',

    'intro.hero.openWorkspace': 'Open Workspace',
    'intro.hero.freeForStudents': '← Free for students!',
    'intro.signin': 'Sign In ➔',

    'login.guest': 'Continue as Guest',
    'login.signIn': 'Sign In',
    'login.or': 'OR',
    'login.email': 'EMAIL',
    'login.password': 'PASSWORD',
    'login.forgot': 'Forgot password?',

    'settings.eyebrow': 'Settings',
    'settings.title': 'Account & Learning',
    'settings.subtitle': 'Manage your account, sign-in state, and learning profile in one place.',
    'settings.appearance': 'Appearance',
    'settings.theme': 'Theme',
    'settings.theme.copy': 'Switch the whole workspace between the soft morning gradient and the warm dusk gradient.',
    'settings.theme.morning': 'Morning',
    'settings.theme.dusk': 'Dusk',
    'settings.language': 'Language',
    'settings.language.copy': 'Interface language. Lesson content stays in English.',
    'settings.account': 'Account',
    'settings.currentAccess': 'Current access',
    'settings.upgrade.copy': 'Sign in to keep your memory, learning track, and future progress across sessions. Guest mode stays lightweight for quick use.',
    'settings.signIn': 'Sign in / Create account',
    'settings.signOut': 'Sign out',
    'settings.exit': 'Exit',
    'settings.personalization': 'Personalization',
    'settings.teaching': 'Teaching instructions',
    'settings.teaching.copy': 'Tell Fourier how you prefer concepts, examples, and feedback to be explained.',
    'settings.teaching.label': 'How should Fourier explain things?',
    'settings.teaching.placeholder': 'Example: Start with intuition and diagrams, then provide a complete formula derivation; remind me when symbols are easy to confuse.',
    'settings.teaching.notSaved': 'Not saved',
    'settings.teaching.saving': 'Saving...',
    'settings.teaching.saved': 'Saved and active',
    'settings.teaching.savedTab': 'Saved in this tab',
    'settings.teaching.cleared': 'Cleared',
    'settings.teaching.unsaved': 'Unsaved changes',
    'settings.teaching.overLimit': 'Content exceeds 1000 characters. Shorten it before saving',
    'settings.teaching.exceeds': 'Teaching instructions cannot exceed 1000 characters',
    'settings.teaching.guestFirst': 'Sign in or continue as a guest first',
    'settings.teaching.saveFailed': 'Save failed',
    'settings.teaching.clearFailed': 'Clear failed',
    'settings.teaching.sessionExpired': 'Your session expired. Please sign in again',
    'settings.teaching.savedOn': 'Saved',
    'settings.save': 'Save',
    'settings.clear': 'Clear',
    'settings.about': 'About',
    'settings.version': 'Version',

    'tutor.new': 'New chat',
    'tutor.recent': 'Recent chats',
    'tutor.more': 'More',
    'tutor.settings': 'Settings',

    'learn.typeMessage': 'Type a message...',
    'overview.flip': 'Flip',
    'overview.shift': 'Shift',
    'overview.overlap': 'Overlap',
    'overview.integrate': 'Integrate',
    'learn.lecture': 'Lecture',
    'learn.textbook': 'Textbook',

    'overview.chapter2.summary': 'This chapter builds the time-domain picture of continuous-time systems: first separate internal and external causes, then use impulse response and convolution to predict how a system reacts. It closes by connecting response, stability, and system time constants.',
    'overview.chapterDefault.summary': 'This chapter follows the key ideas, models, and tools that connect signals to system behavior. The sequence moves from the core representation to analysis, interpretation, and practical examples.',
    'overview.section24.summary': 'This section explains how an external input produces the zero-state response. Start with the convolution integral, build a graphical way to evaluate overlap, then connect individual systems and combine the resulting responses.',
    'overview.sectionDefault.summary': 'This section introduces the central idea and examples needed for the lessons on the right. Read the short overview first, then choose the lesson that matches your next step.',
    'overview.beforeYouBegin': 'Before you begin',
    'overview.afterOverview': 'After this overview',
    'overview.onePicture': 'The idea in one picture',
    'overview.lesson242.summary': 'Convolution becomes easier to reason about when you draw the two signals, flip one, and slide it across the other. This section shows how overlap and signed area build one output value at a time.',
    'overview.goal1': 'Identify the interval where two signals overlap.',
    'overview.goal2': 'Track how shifting changes the product.',
    'overview.goal3': 'Use the signed area to explain the output.',
    'overview.caption': 'One output point comes from the signed product area over the current overlap.',

    'overview.studySequence': 'Study sequence',
    'overview.lessons': 'Lessons',
    'overview.back': 'Back',
    'overview.lessonOverview': 'Lesson overview',
    'overview.sectionOverview': 'Section overview',
    'overview.chapterOverview': 'Chapter overview',
    'overview.startLesson': 'Start lesson',
    'overview.goals': 'What you will be able to do',
    'overview.overview': 'Overview',
    'overview.progressDone': 'done',

    'home.ask.title': 'Ask your Tutor',
    'home.ask.sub': 'Paste a formula, a screenshot, or a confusing line.',
    'home.ask.placeholder': 'Ask a question about this course...',
    'home.tag.formula': 'Formula',
    'home.tag.screenshot': 'Screenshot',
    'home.tag.trap': 'Exam Trap',
    'home.feature.explain': 'Concept Explanation',
    'home.feature.materials': 'Study Materials',
    'home.feature.solve': 'Problem Solving',
    'home.feature.visual': 'Visualization',
    'home.feature.explain.prompt': 'Explain the key concept from the section I am studying.',
    'home.feature.materials.prompt': 'Generate personal study materials for this topic.',
    'home.feature.solve.prompt': 'Help me solve a problem step by step.',
    'home.feature.visual.prompt': 'Create a visualization for this concept.',

    'tracker.eyebrow': 'Fall 2025 Syllabus',
    'tracker.title': 'Course Tracker',
    'tracker.subtitle': 'Track Linear Systems & Signals lectures, exam milestones, and grading weights from the course syllabus.',
    'tracker.progress': 'Lecture Progress',
    'tracker.hero': 'Keep the semester moving.',
    'tracker.hero.body': 'Finish lectures, mark review spots, and keep the next exam visible without reading a wall of rows.',
    'tracker.nextUp': 'Next up',
    'tracker.gradePolicy': 'Grade Policy',
    'tracker.scoreRules': 'Score Rules',
    'tracker.roadmap': 'Roadmap',
    'tracker.schedule': 'Lecture Schedule',
    'tracker.reset': 'Reset Status',

    'nb.eyebrow': 'Mistake Review',
    'nb.title': 'Mistake Notebook',
    'nb.subtitle': 'Upload problem images, keep one note page per mistake, search your weak spots, and ask Fourier to solve or draft review notes.',
    'nb.add': 'Add Problem Image',
    'nb.addSmall': 'or paste screenshot',
    'nb.searchPh': 'Search title, tags, notes, AI draft, or AI answer...',
    'nb.count': '{n} problems',
    'nb.listMatch': 'No matching problems.',
    'nb.listEmpty': 'Upload your first problem image.',
    'nb.pages': 'Problem Pages',
    'nb.emptyTitle': 'Start with a screenshot',
    'nb.emptyBody': 'Upload a problem image. Fourier will keep it as a page you can annotate, solve, and review later.',
    'nb.current': 'Current Problem',
    'nb.titlePh': 'Problem title',
    'nb.prev': 'Prev',
    'nb.next': 'Next',

    'tracker.status.notStarted': 'Not started',
    'tracker.status.inProgress': 'In progress',
    'tracker.status.done': 'Done',
    'tracker.status.review': 'Review',
    'tracker.month.9': 'September',
    'tracker.month.10': 'October',
    'tracker.month.11': 'November',
    'tracker.month.12': 'December',
    'settings.replayTour': 'Replay tour',

    'nb.tags': 'Tags',
    'nb.tagsPh': 'Example: Fourier, sign error, exam',
    'nb.yourNotes': 'Your Notes',
    'nb.addImage': 'Add Image',
    'nb.notesPh': 'What went wrong? What should future-you remember?',
    'nb.aiNotes': 'AI Notes',
    'nb.noAiNotes': 'No AI notes yet.',
    'nb.solve': 'AI Solve Problem',
    'nb.generate': 'Generate AI Notes',
    'nb.delete': 'Delete',
    'nb.generating': 'Generating AI notes...',
    'nb.solving': 'Solving this problem...',

    'tour.openSyllabus': 'Open the syllabus',
    'tour.openSyllabus.body': 'Today we will study 2.4-2: graphical convolution. Click Syllabus to find the lesson.',
    'tour.openChapter2': 'Open Chapter 2',
    'tour.openChapter2.body': 'Click Chapter 2 to see its sections.',
    'tour.openSection24': 'Open section 2.4',
    'tour.openSection24.body': 'Click 2.4 to see its lesson list.',
    'tour.chooseLesson': 'Choose lesson 2.4-2',
    'tour.chooseLesson.body': 'In the chapter overview, click Graphical Understanding of Convolution Operation.',
    'tour.readOverview': 'Read the overview',
    'tour.readOverview.body': 'Read the introduction, then click Start lesson to enter the explanation.',
    'tour.oneGoal': 'Start with one goal',
    'tour.oneGoal.body': 'Choose a time, find the overlap, and calculate one output value. Read this goal before continuing.',
    'tour.readingMode': 'Choose a reading mode',
    'tour.readingMode.body': 'Use Scroll for a continuous lecture, or Pages to focus on one section at a time. You can switch whenever you want.',
    'tour.viewToggle': 'Lecture or Textbook',
    'tour.viewToggle.body': 'Lecture is the guided explanation; Textbook shows the original book pages. Switch anytime with the toggle at the top.',
    'tour.focus': 'Focus the lesson',
    'tour.focus.body': 'Use fullscreen when you want more room for the explanation and interactive figure. You can return to the normal workspace at any time.',
    'tour.moveSignal': 'Move the signal',
    'tour.moveSignal.body': 'Drag time t to see how the overlap and signed product area change.',
    'tour.askTutor': 'Ask your Tutor',
    'tour.askTutor.body': 'Try asking: "Why do we flip the signal first?" Enter your question in the Tutor panel.',
    'tour.skip': 'Skip tour',
    'tour.next': 'Next',
    'tour.openSyllabus.btn': 'Open syllabus',
    'tour.openChapter2.btn': 'Open Chapter 2',
    'tour.openSection24.btn': 'Open section 2.4',
    'tour.chooseLesson.btn': 'Open lesson overview',
    'tour.readOverview.btn': 'Start lesson',
    'tour.retry': 'Retry',
    'tour.loading': 'This section is still loading. Please try again.',
    'tour.startLearning': 'Start learning',

    'user.guest': 'Guest',
    'user.uid': 'UID',
    'user.id': 'ID'
  };

  dicts.zh = {
    'nav.home': '首页',
    'nav.syllabus': '课程目录',
    'nav.recent': '最近对话',
    'nav.courseTracker': '课程进度',
    'nav.mistakeNotebook': '错题本',
    'nav.settings': '设置',
    'recent.empty': '还没有查询记录。',

    'intro.hero.openWorkspace': '进入工作区',
    'intro.hero.freeForStudents': '← 学生免费！',
    'intro.signin': '登录 ➔',

    'login.guest': '以访客身份继续',
    'login.signIn': '登录',
    'login.or': '或',
    'login.email': '邮箱',
    'login.password': '密码',
    'login.forgot': '忘记密码？',

    'settings.eyebrow': '设置',
    'settings.title': '账号与学习',
    'settings.subtitle': '在一个页面管理账号、登录状态与学习偏好。',
    'settings.appearance': '外观',
    'settings.theme': '主题',
    'settings.theme.copy': '在整个工作区之间切换：清晨的柔和蓝绿渐变，或黄昏的暖红渐变。',
    'settings.theme.morning': '清晨',
    'settings.theme.dusk': '黄昏',
    'settings.language': '语言',
    'settings.language.copy': '界面显示语言。课程内容暂为英文。',
    'settings.account': '账号',
    'settings.currentAccess': '当前身份',
    'settings.upgrade.copy': '登录后可跨设备保存学习记忆、学习轨迹与进度。访客模式轻量即用。',
    'settings.signIn': '登录 / 注册',
    'settings.signOut': '退出登录',
    'settings.exit': '退出',
    'settings.personalization': '个性化',
    'settings.teaching': '教学指令',
    'settings.teaching.copy': '告诉 Fourier 你希望概念、例题和反馈怎样讲解。',
    'settings.teaching.label': '希望 Fourier 怎么讲解？',
    'settings.teaching.placeholder': '例如：先讲直觉和图形，再给出完整的公式推导；符号容易混淆时提醒我。',
    'settings.teaching.notSaved': '未保存',
    'settings.teaching.saving': '保存中…',
    'settings.teaching.saved': '已保存并生效',
    'settings.teaching.savedTab': '已保存（本标签页）',
    'settings.teaching.cleared': '已清除',
    'settings.teaching.unsaved': '有未保存的修改',
    'settings.teaching.overLimit': '内容超过 1000 字，请精简后再保存',
    'settings.teaching.exceeds': '教学指令不能超过 1000 字',
    'settings.teaching.guestFirst': '请先登录或以访客身份继续',
    'settings.teaching.saveFailed': '保存失败',
    'settings.teaching.clearFailed': '清除失败',
    'settings.teaching.sessionExpired': '登录已过期，请重新登录',
    'settings.teaching.savedOn': '已保存',
    'settings.save': '保存',
    'settings.clear': '清除',
    'settings.about': '关于',
    'settings.version': '版本',

    'tutor.new': '新对话',
    'tutor.recent': '最近对话',
    'tutor.more': '更多',
    'tutor.settings': '设置',

    'learn.typeMessage': '输入消息……',
    'overview.flip': '翻转',
    'overview.shift': '平移',
    'overview.overlap': '重叠',
    'overview.integrate': '积分',
    'learn.lecture': '讲解',
    'learn.textbook': '教材',

    'overview.chapter2.summary': '本章建立连续时间系统的时域图景：先区分内部原因与外部输入，再用冲激响应与卷积预测系统的反应，最后把响应、稳定性与时间常数联系起来。',
    'overview.chapterDefault.summary': '本章梳理连接信号与系统行为的核心思想、模型与工具，从基本表示出发，逐步进入分析、解释与实际例子。',
    'overview.section24.summary': '这一节讲解外部输入如何产生零状态响应：从卷积积分开始，建立判断重叠的图解方法，再把单个系统连接起来合成总响应。',
    'overview.sectionDefault.summary': '这一节介绍右侧课时所需的核心概念和例子。先阅读简短导读，再选择与你下一步匹配的课时。',
    'overview.beforeYouBegin': '开始之前',
    'overview.afterOverview': '读完本页你将',
    'overview.onePicture': '一图看懂',
    'overview.lesson242.summary': '把两个信号画出来、翻转其中一个、再让它滑过另一个信号，卷积就会直观很多。这一节展示重叠与带符号面积如何逐点构造出输出。',
    'overview.goal1': '找出两个信号重叠的区间。',
    'overview.goal2': '追踪平移如何改变乘积。',
    'overview.goal3': '用带符号面积解释输出值。',
    'overview.caption': '当前重叠区间上的带符号乘积面积，就是一个输出点的值。',

    'overview.studySequence': '学习路径',
    'overview.lessons': '课时',
    'overview.back': '返回',
    'overview.lessonOverview': '课时导读',
    'overview.sectionOverview': '小节导读',
    'overview.chapterOverview': '章节导读',
    'overview.startLesson': '开始学习',
    'overview.goals': '学完你将能够',
    'overview.overview': '导读',
    'overview.progressDone': '已完成',

    'home.ask.title': '向 Tutor 提问',
    'home.ask.sub': '粘贴公式、截图，或一句没看懂的话。',
    'home.ask.placeholder': '就本课程提问……',
    'home.tag.formula': '公式',
    'home.tag.screenshot': '截图',
    'home.tag.trap': '考试陷阱',
    'home.feature.explain': '概念讲解',
    'home.feature.materials': '学习资料',
    'home.feature.solve': '解题辅导',
    'home.feature.visual': '可视化',
    'home.feature.explain.prompt': '讲解我正在学习的这一节的核心概念。',
    'home.feature.materials.prompt': '为这个主题生成一份个人学习资料。',
    'home.feature.solve.prompt': '一步一步帮我解这道题。',
    'home.feature.visual.prompt': '为这个概念创建一个可视化。',

    'tracker.eyebrow': '2025 秋季学期课程大纲',
    'tracker.title': '课程进度',
    'tracker.subtitle': '追踪《线性系统与信号》的课程进度、考试节点与评分权重。',
    'tracker.progress': '课程进度',
    'tracker.hero': '让学期稳步推进。',
    'tracker.hero.body': '完成课程、标记复习点，让下一场考试始终可见，而不用面对一整屏表格。',
    'tracker.nextUp': '接下来',
    'tracker.gradePolicy': '评分政策',
    'tracker.scoreRules': '分数规则',
    'tracker.roadmap': '学习路线',
    'tracker.schedule': '课程表',
    'tracker.reset': '重置进度',

    'nb.eyebrow': '错题回顾',
    'nb.title': '错题本',
    'nb.subtitle': '上传题目图片，每道错题一页笔记，搜索薄弱点，还能让 Fourier 解题或起草复习笔记。',
    'nb.add': '添加题目图片',
    'nb.addSmall': '或直接粘贴截图',
    'nb.searchPh': '搜索标题、标签、笔记、AI 草稿或 AI 回答……',
    'nb.count': '{n} 道错题',
    'nb.listMatch': '没有匹配的题目。',
    'nb.listEmpty': '上传你的第一张题目图片。',
    'nb.pages': '题目页',
    'nb.emptyTitle': '从一张截图开始',
    'nb.emptyBody': '上传一张题目图片。Fourier 会把它保存为一页，你可以标注、求解、之后复习。',
    'nb.current': '当前题目',
    'nb.titlePh': '题目标题',
    'nb.prev': '上一页',
    'nb.next': '下一页',

    'tracker.status.notStarted': '未开始',
    'tracker.status.inProgress': '进行中',
    'tracker.status.done': '已完成',
    'tracker.status.review': '需复习',
    'tracker.month.9': '9 月',
    'tracker.month.10': '10 月',
    'tracker.month.11': '11 月',
    'tracker.month.12': '12 月',
    'settings.replayTour': '重播新手引导',

    'nb.tags': '标签',
    'nb.tagsPh': '例如：Fourier、符号错误、考试',
    'nb.yourNotes': '我的笔记',
    'nb.addImage': '添加图片',
    'nb.notesPh': '哪里出了错？要提醒未来的自己什么？',
    'nb.aiNotes': 'AI 笔记',
    'nb.noAiNotes': '还没有 AI 笔记。',
    'nb.solve': 'AI 解题',
    'nb.generate': '生成 AI 笔记',
    'nb.delete': '删除',
    'nb.generating': '正在生成 AI 笔记……',
    'nb.solving': '正在解题……',

    'tour.openSyllabus': '打开课程目录',
    'tour.openSyllabus.body': '今天我们学习 2.4-2：卷积的图解法。点击「课程目录」找到这一课。',
    'tour.openChapter2': '打开第 2 章',
    'tour.openChapter2.body': '点击 Chapter 2 查看它的小节。',
    'tour.openSection24': '打开小节 2.4',
    'tour.openSection24.body': '点击 2.4 查看它的课时列表。',
    'tour.chooseLesson': '选择课时 2.4-2',
    'tour.chooseLesson.body': '在章节导读里点击 Graphical Understanding of Convolution Operation。',
    'tour.readOverview': '阅读导读',
    'tour.readOverview.body': '阅读介绍后，点击 Start lesson 进入讲解。',
    'tour.oneGoal': '从一个目标开始',
    'tour.oneGoal.body': '选定一个时刻，找出重叠区间，算出一个输出值。继续之前先读懂这个目标。',
    'tour.readingMode': '选择阅读方式',
    'tour.readingMode.body': 'Scroll 是连续讲解，Pages 一次聚焦一节，随时可以切换。',
    'tour.viewToggle': '讲解还是教材',
    'tour.viewToggle.body': '「讲解」是引导式讲解，「教材」显示原书页面。随时可以用顶部的切换按钮互换。',
    'tour.focus': '进入专注模式',
    'tour.focus.body': '需要更大空间看讲解和交互图时可以使用全屏，随时可以返回正常工作区。',
    'tour.moveSignal': '移动信号',
    'tour.moveSignal.body': '拖动时间 t，观察重叠区域和带符号乘积面积的变化。',
    'tour.askTutor': '向 Tutor 提问',
    'tour.askTutor.body': '试着问：「为什么要先翻转信号？」在 Tutor 面板输入你的问题。',
    'tour.skip': '跳过引导',
    'tour.next': '下一步',
    'tour.openSyllabus.btn': '打开课程目录',
    'tour.openChapter2.btn': '打开第 2 章',
    'tour.openSection24.btn': '打开小节 2.4',
    'tour.chooseLesson.btn': '打开课时导读',
    'tour.readOverview.btn': '开始学习',
    'tour.retry': '重试',
    'tour.loading': '这一节还在加载，请重试。',
    'tour.startLearning': '开始学习',

    'user.guest': '访客',
    'user.uid': 'UID',
    'user.id': 'ID'
  };

  // Course title translations (chapters, sections, lessons). English originals
  // are the keys and stay in data-* attributes; only display text switches.
  const titleZh = {
    'B Background': 'B 背景知识',
    'Chapter 1: Signals and Systems': '第 1 章：信号与系统',
    'Chapter 2: Time-Domain Analysis of Continuous-Time Systems': '第 2 章：连续时间系统的时域分析',
    'Chapter 3: Time-Domain Analysis of Discrete-Time Systems': '第 3 章：离散时间系统的时域分析',
    'Chapter 4: Continuous-Time System Analysis Using the Laplace Transform': '第 4 章：用拉普拉斯变换分析连续时间系统',
    'Chapter 5: Discrete-Time System Analysis Using the z-Transform': '第 5 章：用 z 变换分析离散时间系统',
    'Chapter 6: Continuous-Time Signal Analysis: The Fourier Series': '第 6 章：连续时间信号分析：傅里叶级数',
    'Chapter 7: Continuous-Time Signal Analysis: The Fourier Transform': '第 7 章：连续时间信号分析：傅里叶变换',
    'Chapter 8: Sampling: The Bridge from Continuous to Discrete': '第 8 章：采样：从连续到离散的桥梁',
    'Chapter 9: Fourier Analysis of Discrete-Time Signals': '第 9 章：离散时间信号的傅里叶分析',
    'Chapter 10: State-Space Analysis': '第 10 章：状态空间分析',
    '2.1 Introduction': '2.1 引言',
    '2.2 System Response to Internal Conditions: The Zero-Input Response': '2.2 系统对内部条件的响应：零输入响应',
    '2.3 The Unit Impulse Response h(t)': '2.3 单位冲激响应 h(t)',
    '2.4 System Response to External Input: The Zero-State Response': '2.4 系统对外部输入的响应：零状态响应',
    '2.4-1 The Convolution Integral': '2.4-1 卷积积分',
    '2.4-2 Graphical Understanding of Convolution Operation': '2.4-2 卷积运算的图解理解',
    '2.4-3 Interconnected Systems': '2.4-3 互联系统',
    '2.4-4 A Very Special Function for LTIC Systems: The Everlasting Exponential e^st': '2.4-4 LTIC 系统的一个特殊函数：永恒指数函数 e^st',
    '2.4-5 Total Response': '2.4-5 总响应',
    '2.5 System Stability': '2.5 系统稳定性',
    '2.6 Intuitive Insights into System Behavior': '2.6 系统行为的直观理解',
    '2.7 MATLAB: M-Files': '2.7 MATLAB：M 文件',
    '2.8 Appendix: Determining the Impulse Response': '2.8 附录：确定冲激响应',
    '2.9 Summary': '2.9 小结'
  };

  // Tracker content translations: lecture topics, milestones, grade labels.
  const miscZh = {
    'Math background: complex numbers, sinusoids': '数学基础：复数、正弦信号',
    'Signal energy, power; signal classifications; basic signal operations': '信号能量与功率；信号分类；基本信号运算',
    'Useful signals; even and odd signals': '常用信号；奇信号与偶信号',
    'Systems classifications': '系统分类',
    'Convolution and its properties': '卷积及其性质',
    'Computing convolution: analytical and graphical methods': '卷积的计算：解析法与图解法',
    'Responses of an LTI system, initial conditions, unit impulse response, zero-state response': 'LTI 系统的响应、初始条件、单位冲激响应与零状态响应',
    'Signal approximation by orthogonal signal set; trigonometric Fourier series; compact form': '用正交信号集逼近信号；三角傅里叶级数；紧凑形式',
    'Existence conditions, determining fundamental frequency, exponential Fourier series': '存在条件、基频的确定、指数傅里叶级数',
    'Relationship among different forms; properties of Fourier series': '各种形式之间的关系；傅里叶级数的性质',
    "Properties of Fourier series (cont'd)": '傅里叶级数的性质（续）',
    'Fourier transform and inverse; useful Fourier transforms': '傅里叶变换及其逆；常用傅里叶变换对',
    'Problem session part 1; properties of Fourier transform': '习题课（一）；傅里叶变换的性质',
    'Problem session part 2; application to communications': '习题课（二）；在通信中的应用',
    'Midterm 1': '期中考试 1',
    'Midterm 2': '期中考试 2',
    'Properties of Fourier transform': '傅里叶变换的性质',
    'Frequency response of an LTI system, ideal filters, Paley-Wiener criterion': 'LTI 系统的频率响应、理想滤波器、Paley-Wiener 判据',
    'Fourier transform of periodic signals, LTI responses to periodic signals, Nyquist sampling theorem': '周期信号的傅里叶变换、LTI 系统对周期信号的响应、奈奎斯特采样定理',
    'Interpolation formula, aliasing and anti-aliasing filter, Laplace transform': '内插公式、混叠与抗混叠滤波器、拉普拉斯变换',
    'Properties of Laplace transform': '拉普拉斯变换的性质',
    'Inverse Laplace transform; calculating system response using Laplace transform': '拉普拉斯逆变换；用拉普拉斯变换计算系统响应',
    'Calculating impulse response, asymptotic stability, BIBO stability': '冲激响应的计算、渐近稳定性、BIBO 稳定性',
    'Block diagrams; state-space representations': '方框图；状态空间表示',
    'State equations from transfer function; frequency response and zero-pole locations': '由传递函数建立状态方程；频率响应与零极点分布',
    'Review session': '复习课',
    'Review': '复习课',
    'Homework': '作业',
    '10 HWs': '10 次作业',
    'Final': '期末考试',
    'Date TBA': '日期待定'
  };

  // ── Core API ────────────────────────────────────────────────
  function normalize(lang) {
    return lang === 'zh' ? 'zh' : 'en';
  }

  function currentLang() {
    // Default is English; Chinese only after an explicit choice in Settings.
    let stored = null;
    try { stored = localStorage.getItem(LANG_STORAGE_KEY); } catch (_) {}
    return normalize(stored);
  }

  function t(key) {
    const lang = currentLang();
    return (dicts[lang] && dicts[lang][key]) || dicts.en[key] || key;
  }

  function tt(title) {
    if (!title) return title;
    return currentLang() === 'zh' ? (titleZh[title] || miscZh[title] || title) : title;
  }
  function lectureLabel(text) {
    if (currentLang() !== 'zh') return text;
    return String(text || '').replace(/^Lecture #(\d+)/, '第 $1 讲');
  }
  function statusLabel(option) {
    const key = { 'Not started': 'tracker.status.notStarted', 'In progress': 'tracker.status.inProgress', 'Done': 'tracker.status.done', 'Review': 'tracker.status.review' }[option];
    return key ? t(key) : option;
  }

  function applyStatic() {
    document.documentElement.lang = currentLang() === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder));
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      el.setAttribute('title', t(el.dataset.i18nTitle));
    });
    document.querySelectorAll('[data-i18n-prompt]').forEach(el => {
      el.setAttribute('data-prompt', t(el.dataset.i18nPrompt));
    });
  }

  function setLang(lang) {
    const next = normalize(lang);
    try { localStorage.setItem(LANG_STORAGE_KEY, next); } catch (_) {}
    applyStatic();
    listeners.forEach(fn => { try { fn(next); } catch (_) {} });
    document.dispatchEvent(new CustomEvent('fourier:langchange', { detail: { lang: next } }));
  }

  function onChange(fn) { listeners.push(fn); }

  window.FourierI18N = { t, tt, lectureLabel, statusLabel, setLang, currentLang, applyStatic, onChange, normalize };
})();
