// Static data: QUIZ_QUESTIONS for the learning-mode preference quiz.
// Loaded as a classic <script> before app.js. Pure data, no closures.
// Extracted in Phase 1 #2 of the refactor plan.

const QUIZ_QUESTIONS = [
  {
    key: 'track',
    zh: '这节你想怎么学?',
    en: 'LEARNING MODE · Choose how you want to learn this section.',
    multi: false,
    options: [
      { value: 'cram', zh: '速通保分：先抓最常考，最快进入会做题状态 🚀', en: 'Cram mode: focus on the most tested ideas first 🚀' },
      { value: 'standard', zh: '标准提分：概念、例题、检查题一起走，稳稳提分 📘', en: 'Standard mode: concept + example + quick check 📘' },
      { value: 'top_score', zh: '冲刺高分：补足易混点、变式题和高分思路 🏆', en: 'Top-score mode: tricky variants + high-score reasoning 🏆' }
    ]
  },
  {
    key: 'math',
    zh: '你的数学基础怎么样?',
    en: 'MATH BACKGROUND · Tell me where math might slow you down.',
    multi: false,
    options: [
      { value: 'all_solid', zh: '基础比较稳：微积分、微分方程、复数这些都还可以', en: 'Math is solid: calculus, ODEs, and complex numbers are okay' },
      { value: 'calculus_ok', zh: '有些地方不太稳：微积分还行，但微分方程 / 复数会卡住', en: 'Some weak spots: calculus is okay, but ODEs / complex numbers can be shaky' },
      { value: 'math_weak', zh: '数学偏弱：希望少一点公式，多一点直觉和图像', en: 'Math feels weak: fewer formulas, more intuition and visuals' }
    ]
  },
  {
    key: 'timeline',
    zh: '距离这门课最近一次重要考试，还有多久?',
    en: 'EXAM TIMELINE · How soon do you need results?',
    multi: false,
    options: [
      { value: 'this_week', zh: '这周内', en: 'Within this week' },
      { value: 'two_weeks', zh: '两周左右', en: 'About two weeks' },
      { value: 'one_month', zh: '一个多月', en: 'About a month or more' },
      { value: 'early_stage', zh: '还比较早，先打基础', en: 'It is still early — build foundations first' }
    ]
  },
  {
    key: 'preference',
    zh: '这节开始时，你最想先看到什么?',
    en: 'LEARNING PREFERENCE · What do you want to see first when this lesson begins?',
    multi: true,
    maxSelect: 2,
    options: [
      { value: 'exam_first', zh: '先看这节最重要的考点', en: 'Show me the key tested ideas first' },
      { value: 'example_first', zh: '先看一个例子', en: 'Start with an example' },
      { value: 'step_by_step', zh: '先把步骤拆开', en: 'Break the steps down first' }
    ]
  },
  {
    key: 'priority',
    zh: '你现在最想优先解决哪件事?',
    en: 'YOUR PRIORITY · What do you want to improve first?',
    multi: true,
    maxSelect: 2,
    options: [
      { value: 'understand_concepts', zh: '先把概念听懂', en: 'Understand the concepts first' },
      { value: 'solve_faster', zh: '做题更快一点', en: 'Solve problems faster' },
      { value: 'avoid_careless', zh: '少犯低级错误', en: 'Make fewer careless mistakes' },
      { value: 'harder_problems', zh: '搞定更难的题', en: 'Handle harder problems' },
      { value: 'connect_topics', zh: '把知识点串起来', en: 'Connect the ideas across topics' },
      { value: 'exam_confidence', zh: '更有把握地上考场', en: 'Feel more confident in the exam' }
    ]
  }
];
