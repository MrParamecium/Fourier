{
  "section_id": "b.1-1",
  "section_title": "B.1-1 Complex Numbers - A Historical Note",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.1-1 复数——历史说明\n\n> **本节目标：** 快速锁定历史部分的考试落点，理解复数被引入的真正原因，并认识复平面的基本表示。\n\n---\n\n冲刺提醒：这节历史部分真正会考的不多，但有 **3 个结论必须记住**：\n\n1. \(j^2 = -1\)（复数单位的核心定义）\n2. 复数被引入，是为了让实数里难处理的问题变得好做——不是为了好玩\n3. 复数最终要落实到复平面表示：\(z = a + jb\)，对应平面上的点 \((a, b)\)\n\n历史细节（人物、年份）**不需要背**。考试更喜欢考定义、表示、实部虚部、共轭、模与角。不要把历史人物当主考点，把精力放在公式和图形上。\n\n#### 注意\n\n唯一值得记的人物细节：数学上用 \(i\) 表示虚数单位（Euler 的记法），工科教材（包括本书）改用 \(j\)，避免与电流符号混淆。\n\n本节后半会自然过渡到 \(z = a + jb\) 的图形表示，请带着这 3 个结论继续往下读。"
    },
    {
      "type": "text_explanation",
      "content": "## 1. 历史部分到底要记什么\n\n数系的扩展有一条统一逻辑：**旧系统解不了题，就扩展数系**。\n\n- 自然数 → 分数：需要表示"半个"或"三分之一"\n- 分数 → 无理数：需要表示 \(\\sqrt{2}\) 这类无法用分数精确表达的量\n- 正数 → 负数：需要表示"欠债"或"反方向"\n- 实数 → 复数：需要解 \(x^2 = -1\)，实数范围内无解\n\n**最快记忆法：旧系统解不了题 → 扩展数系。**\n\n复数的关键触发点就是 \(x^2 = -1\) 在实数范围内无解，因此引入满足平方为 \(-1\) 的新单位 \(j\)。工科用 \(j\)（而非数学里的 \(i\)）是本书的约定，这是唯一值得记的人物/符号细节。"
    },
    {
      "type": "math_block",
      "latex": "j^2=-1,\\qquad \\sqrt{-1}=\\pm j,\\qquad \\sqrt{-4}=\\pm 2j",
      "explanation": "这组公式是历史部分里最值得记住的可计算结论——考试若从历史过渡到运算，通常就从这里起步，务必做到看到 \(\\sqrt{-n}\) 就能立刻写出 \(\\pm\\sqrt{n}\\,j\)。"
    },
    {
      "type": "book_image",
      "source_page": "page-004",
      "fig_id": "unknown",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "只借这张图记住一个结论：经过"复数中间层"常常比全程死守实数更省步骤。",
        "standard": "用这张图解释教材为何把复数比作跨境捷径，再连接到数学求解更简洁。",
        "top_score": "用这张图强调"中间经过复数、结果仍回到实数"这一高阶理解，避免把复数当成脱离实际的符号游戏。"
      },
      "caption": "这张图把复数的作用比作一条更短的跨境路线——引入复数往往是为了简化求解，而不是为了把答案永久留在复数世界。"
    },
    {
      "type": "text_explanation",
      "content": "## 2. 考试真正落点：复平面表示\n\n历史引入最终都落到这里：复数 \(z = a + jb\) 对应复平面上的点 \((a, b)\)。\n\n- **横轴**（实轴）：对应实部 \(a = \\operatorname{Re} z\)\n- **纵轴**（虚轴）：对应虚部 \(b = \\operatorname{Im} z\)\n\n### 易错提醒\n\n> \(\\operatorname{Im} z = b\)，**不要写成 \(bj\)**。虚部是 \(j\) 前面的系数，是一个实数，不带 \(j\)。\n\n例如：\(z = 3 - 2j\) 时，\(\\operatorname{Re} z = 3\)，\(\\operatorname{Im} z = -2\)（不是 \(-2j\)）。\n\n同一个复数还可以用模 \(r\) 和角度 \(\\theta\) 来描述（极坐标式），这与矩形式是同一个点的两种读法。很多历史引入最后都落到这个图形表示，所以图一定要看懂。"
    },
    {
      "type": "book_image",
      "source_page": "page-005",
      "fig_id": "Fig. B.2",
      "teaching_role": "exam_pattern_anchor",
      "mode_specific_visual_use": {
        "cram": "用这张图快速识别 \(a\)、\(b\)、\(r\)、\(\\theta\)、\(z^*\) 各自对应什么，优先服务做题读图。",
        "standard": "用这张图解释矩形式、极坐标、共轭和坐标位置之间的关系。",
        "top_score": "用这张图强调共轭关于实轴对称，以及 \(a, b\) 与 \(r, \\theta\) 是同一点的两种参数表示。"
      },
      "caption": "这张图把复数 \(z = a + jb\) 的坐标、模 \(r\)、角度 \(\\theta\) 和共轭 \(z^* = a - jb\) 一次性放在同一张图里，是本节最重要的识图锚点。"
    },
    {
      "type": "math_block",
      "latex": "z=a+jb,\\qquad \\operatorname{Re}z=a,\\qquad \\operatorname{Im}z=b,\\qquad z=r(\\cos\\theta + j\\sin\\theta)",
      "explanation": "前三个式子是读矩形式时最常考的定义：实部取 \(a\)，虚部取系数 \(b\)（不带 \(j\)）。最后一个式子提醒我们：同一个复数也可以用模 \(r\) 和角度 \(\\theta\) 来描述，矩形式与极坐标式是同一对象的两种读法。"
    },
    {
      "type": "section_summary",
      "bullets": [
        "旧数系解不了题时扩展数系，复数因 \(x^2=-1\) 无实数解而引入",
        "复数单位满足 \(j^2=-1\)，\(\\sqrt{-n}=\\pm\\sqrt{n}\\,j\)",
        "复平面中 \(z=a+jb\) 对应点 \((a,b)\)，虚部是 \(b\) 不是 \(bj\)"
      ],
      "transition": "下一节我们将正式学习复数的代数表示与基本运算。"
    },
    {
      "type": "quiz_plan",
      "target_questions": 6,
      "question_range": { "min": 5, "max": 7 },
      "knowledge_points": [
        {
          "id": "number_system_extension_logic",
          "label": "数系扩展的核心逻辑",
          "importance": "high",
          "exam_weight": "medium",
          "mastery_rule": { "correct_streak_required": 1 },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "这段历史说明最想让你记住的核心观点是什么？",
              "options": [
                "A. 复数主要是为了记住数学史人物",
                "B. 每次数系扩展都是因为旧数系已足够解决所有问题",
                "C. 当旧数系无法解决新问题时，数系会被扩展",
                "D. 复数只适用于纯理论，不适用于计算"
              ],
              "correct_option": "C",
              "explanation": "教材用从自然数到复数的历史，强调一个统一逻辑：旧系统不够用，就扩展系统。",
              "wrong_option_explanations": {
                "A": "人物和年份不是本节主线，也不是考试高频落点。",
                "B": "恰恰相反，是因为旧数系不够用才扩展。",
                "D": "教材明确强调复数能减少工作量，提升求解效率。"
              },
              "hint": "抓住一句最快记忆法：解不了题，就扩展数系。",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "下列哪一个问题最直接推动了复数的引入？",
              "options": [
                "A. \(x + 5 = 0\)",
                "B. \(x^2 = -1\)",
                "C. \(x = 3/4\)",
                "D. \(x > 0\)"
              ],
              "correct_option": "B",
              "explanation": "在实数范围内，\(x^2\) 不可能等于负数，因此需要引入平方为 \(-1\) 的新单位 \(j\)。",
              "wrong_option_explanations": {
                "A": "这个方程在实数中已有解 \(x = -5\)。",
                "C": "分数早已能在已有数系中表示。",
                "D": "这只是一个不等式条件，不会推动新数系产生。"
              },
              "hint": "想想哪一个式子在实数里无解。",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "basic_j_facts",
          "label": "j 的基本性质与负数平方根",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": { "correct_streak_required": 2 },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "下列哪一项正确？",
              "options": [
                "A. \(j = -1\)",
                "B. \(j^2 = 1\)",
                "C. \(j^2 = -1\)",
                "D. \(\\sqrt{-1} = j\) 只有一个值"
              ],
              "correct_option": "C",
              "explanation": "复数单位 \(j\) 的定义就是平方等于 \(-1\)。",
              "wrong_option_explanations": {
                "A": "\(j\) 不是 \(-1\)，本身是满足平方为 \(-1\) 的单位。",
                "B": "若平方为 \(1\)，就不是复数单位的定义了。",
                "D": "按教材写法，\(\\sqrt{-1} = \\pm j\)。"
              },
              "hint": "先背最核心定义：\(j^2 = -1\)。",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "\(\\sqrt{-4}\) 等于什么？",
              "options": [
                "A. \(\\pm 4j\)",
                "B. \(\\pm 2j\)",
                "C. \(-2j\)",
                "D. \(2\)"
              ],
              "correct_option": "B",
              "explanation": "\(\\sqrt{-4} = \\sqrt{4}\\cdot\\sqrt{-1} = \\pm 2j\)。",
              "wrong_option_explanations": {
                "A": "把 \(4\) 的平方根误写成 \(4\)。",
                "C": "漏掉了正负两个值。",
                "D": "\(2\) 的平方是 \(4\)，不是 \(-4\)。"
              },
              "hint": "先拆成 \(\\sqrt{4}\\cdot\\sqrt{-1}\)。",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "complex_plane_reading",
          "label": "复平面读图与基本定义",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": { "correct_streak_required": 2 },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "若 \(z = 3 - 2j\)，则下列说法正确的是：",
              "options": [
                "A. \(\\operatorname{Re} z = 3\)，\(\\operatorname{Im} z = -2\)",
                "B. \(\\operatorname{Re} z = 3\)，\(\\operatorname{Im} z = -2j\)",
                "C. \(\\operatorname{Re} z = -2\)，\(\\operatorname{Im} z = 3\)",
                "D. \(z\) 在虚轴上"
              ],
              "correct_option": "A",
              "explanation": "矩形式 \(z = a + jb\) 中，实部是 \(a\)，虚部是 \(j\) 的系数 \(b\)，所以 \(\\operatorname{Im} z = -2\)。",
              "wrong_option_explanations": {
                "B": "常见陷阱：虚部是系数 \(-2\)，不是整项 \(-2j\)。",
                "C": "把实部和虚部位置读反了。",
                "D": "实部不为 \(0\)，所以不在虚轴上。"
              },
              "hint": "虚部看 \(j\) 前面的系数，不把 \(j\) 一起带上。",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp3_q2",
              "type": "multiple_choice",
              "stem": "在复平面中，\(z = a + jb\) 对应的点是：",
              "options": [
                "A. \((b,\\, a)\)",
                "B. \((a,\\, b)\)",
                "C. \((a,\\, jb)\)",
                "D. \((r,\\, \\theta)\)"
              ],
              "correct_option": "B",
              "explanation": "复平面的横坐标是实部 \(a\)，纵坐标是虚部 \(b\)，所以点坐标是 \((a, b)\)。",
              "wrong_option_explanations": {
                "A": "把横纵轴顺序颠倒了。",
                "C": "坐标值写的是实数坐标，不直接写符号 \(jb\)。",
                "D": "这是极坐标描述，不是直角坐标点写法。"
              },
              "hint": "横轴实部，纵轴虚部。",
              "needs_visual": true,
              "visual_type": "complex_plane_point_reading",
              "same_point_variant": true
            }
          ]
        }
      ]
    }
  ]
}