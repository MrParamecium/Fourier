# Agent A Preview: 1.2-2 Time Scaling

- Difficulty: intermediate
- Estimated read minutes: 7

## Learning Objectives

- Recognize time compression and time expansion from expressions like x(2t) and x(t/2).
- Map time landmarks correctly after scaling.
- Apply time scaling to a piecewise signal.
- Explain how time scaling changes sinusoid frequency without changing amplitude or phase.

## Visualization Need

```json
{
  "level": "interactive",
  "reason": [
    "depends_on_parameter_change",
    "formula_to_phenomenon_gap",
    "student_should_manipulate_to_understand",
    "pattern_recognition_benefits_from_figure"
  ],
  "recommended_assets": [
    "react_canvas_demo"
  ]
}
```

## Visual Plan

```json
{
  "primary_anchor": "both",
  "rationale": "Use the textbook's Figure 1.7 because it is the exact exam-facing piecewise time-scaling example from the section. Add a React Canvas demo because students understand time scaling faster when they can vary the scaling factor and watch landmarks move while amplitude stays fixed. Do not use generated images because the available textbook figure and interactive demo are stronger and more precise for this concept.",
  "cram": "Use visuals to instantly recognize whether x(at) compresses or expands and where endpoints move.",
  "standard": "Use Figure 1.7 plus one slider demo to connect the formula, the graph, and one representative worked example.",
  "top_score": "Use the demo to test subtle cases: negative time landmarks, origin anchoring, and sinusoid frequency changes."
}
```

## Planned Blocks

### Block 1: `text_explanation`
- **instruction**: Create a minimal Page 1 overview only. Use exactly two short sections: 'Section Objective' and 'Concepts In This Section'. Under 'Section Objective', write one sentence: 'Learn how replacing t inside x(t) compresses or expands a signal in time.' Under 'Concepts In This Section', list concept names only as bullets: 'time compression', 'time expansion', 'time landmark mapping', 'piecewise signal scaling', 'sinusoid frequency change'. Do not add background paragraphs, examples, or explanations on this page.

### Block 2: `math_block`
- **latex**: \phi(t)=x(nt),\quad n>1
- **explanation_instruction**: Start the page with heading '## 1. Time compression'. Explain in 100–140 words that replacing t by nt makes the graph happen n times faster, so the same events occur closer to the origin. Define \(\phi(t)\) as the scaled signal, \(x(t)\) as the original signal, and \(n\) as the compression factor. State when to use it: when the problem says 'compressed by factor n' or shows \(x(nt)\). Give the minimal example: if a corner of \(x(t)\) was at \(t=6\), then in \(x(3t)\) it appears at \(t=2\). Exam trigger: inside multiplier greater than 1. Common misuse: thinking the amplitude changes; it does not.

### Block 3: `math_block`
- **latex**: \phi(t)=x\left(\frac{t}{n}\right),\quad n>1
- **explanation_instruction**: Start the page with heading '## 2. Time expansion'. Explain in 100–140 words that replacing t by \(t/n\) makes the graph happen n times slower, so the same events move farther from the origin. Define \(n\) as the expansion factor. State when to use it: when the problem says 'expanded by factor n', 'slowed down by factor n', or shows \(x(t/n)\). Give the minimal example: if a jump of \(x(t)\) was at \(t=-2\), then in \(x(t/4)\) it appears at \(t=-8\). Exam trigger: t is divided inside the argument. Common misuse: moving only positive-time points correctly but forgetting negative-time points also move away from zero.

### Block 4: `math_block`
- **latex**: x(t)=\begin{cases}2, & -1.5\le t<0\\2e^{-t/2}, & 0\le t<3\\0, & \text{otherwise}\end{cases}\tag{1.6}
- **explanation_instruction**: Start the page with heading '## 3. Worked example: scale a piecewise signal'. Use Eq. (1.6) as the original signal from Example 1.4. Explain in 130–170 words how to scale it without redrawing from scratch: replace every t inside the condition and formula. For compression by 3, write that \(x_c(t)=x(3t)\), so \(-1.5\le 3t<0\) becomes \(-0.5\le t<0\), and \(0\le 3t<3\) becomes \(0\le t<1\). For expansion by 2, write that \(x_e(t)=x(t/2)\), so the support stretches from \([-1.5,3)\) to \([-3,6)\). Exam note: solve the inequalities after substitution; do not just change the exponent.

### Block 5: `book_image`
- **source_page**: page-075
- **fig_id**: Figure 1.7
- **teaching_role**: example_support
- **mode_specific_visual_use**:
```json
{
  "cram": "Use it to memorize the endpoint movement pattern: compression pulls endpoints inward; expansion pushes them outward.",
  "standard": "Use it as the main worked-example visual connecting the piecewise formula to the graph.",
  "top_score": "Use it to check negative endpoints, exponential-rate changes, and unchanged vertical amplitude."
}
```
- **caption_instruction**: One sentence: Figure 1.7 shows the original signal x(t), its compressed version x(3t), and its expanded version x(t/2).
- **description_instruction**: Describe the three stacked plots. Emphasize that the amplitude level 2 stays the same, while time landmarks move from -1.5 and 3 to -0.5 and 1 for compression, and to -3 and 6 for expansion. Point out that the exponential segment becomes faster in x(3t) and slower in x(t/2).

### Block 6: `math_block`
- **latex**: A\sin(\omega t+\theta)\ \longrightarrow\ A\sin(n\omega t+\theta),\quad n>1
- **explanation_instruction**: Start the page with heading '## 4. Sinusoids under time scaling'. Explain in 100–140 words that compressing a sinusoid by factor \(n\) multiplies its angular frequency by \(n\), while amplitude \(A\) and phase \(\theta\) stay the same. Use Drill 1.5's idea: \(\sin(2t)\) compressed by 3 becomes \(\sin(6t)\), so it completes cycles faster. Also state the expansion counterpart in words: expanding by factor \(n\) divides the frequency by \(n\). Exam trigger: if the factor is inside the sine argument multiplying t, it changes frequency, not amplitude. Common misuse: saying compression makes the peaks taller.

### Block 7: `interactive_demo`
- **title**: Time-scaling slider: watch landmarks move
- **teaching_role**: concept_anchor
- **mode_specific_visual_use**:
```json
{
  "cram": "Drag the slider and memorize the visual rule: bigger inside factor means narrower graph.",
  "standard": "Use the slider after the worked example to connect formulas, endpoints, and sinusoid frequency.",
  "top_score": "Test mixed landmarks and sinusoid mode to verify exactly what changes and what stays invariant."
}
```
- **instruction**: Build a React + Canvas interactive demo with a pure white background and two stacked plots: original x(t) on top and scaled y(t)=x(a t) below. Include a slider for a from 0.25 to 4 with labeled presets a=0.5, a=1, a=2, a=3. Include a toggle between 'piecewise example' and 'sinusoid'. For the piecewise example, use the same shape as Eq. (1.6): level 2 from -1.5 to 0, then decaying exponential until 3. Mark original landmarks -1.5, 0, and 3 with small vertical guide lines. In the scaled plot, show the corresponding landmarks -1.5/a, 0, and 3/a. For the sinusoid mode, show that increasing a increases the number of cycles in the same time window. Add a small note beside the plots: 'Time changes; amplitude does not.' Do not include decorative art or extra formulas.

### Block 8: `section_summary`
- **instruction**: Create the recap page titled '📌 Key Takeaways'. Include 4 concise bullets, each under 24 words, and include formulas explicitly. Must include: compression \(\phi(t)=x(nt), n>1\); expansion \(\phi(t)=x(t/n), n>1\); landmark rule \(t_{new}=t_{old}/a\) for \(x(at)\); sinusoid rule \(A\sin(\omega t+\theta)\to A\sin(a\omega t+\theta)\). End with one sentence: 'Next, time reversal will show what happens when the time axis is reflected.'

### Block 9: `quiz_plan`
- **target_questions**:
```json
7
```
- **question_range**:
```json
{
  "min": 6,
  "max": 8
}
```
- **knowledge_points**:
```json
[
  {
    "id": "compression_vs_expansion",
    "label": "Recognizing compression and expansion from x(at)",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp1_q1",
        "type": "multiple_choice",
        "stem": "Which expression represents x(t) compressed in time by a factor of 4?",
        "options": [
          "A. x(t/4)",
          "B. x(4t)",
          "C. 4x(t)",
          "D. x(t)+4"
        ],
        "correct_option": "B",
        "explanation": "Compression by factor 4 means the signal happens 4 times faster, so t is replaced by 4t.",
        "wrong_option_explanations": {
          "A": "x(t/4) expands the signal by factor 4.",
          "C": "4x(t) changes amplitude, not time scale.",
          "D": "x(t)+4 shifts amplitude upward, not time."
        },
        "hint": "Time scaling changes the input t, not the outside height.",
        "needs_visual": false,
        "same_point_variant": true
      },
      {
        "id": "kp1_q2",
        "type": "multiple_choice",
        "stem": "A signal y(t)=x(t/5) is best described as:",
        "options": [
          "A. x(t) compressed by factor 5",
          "B. x(t) expanded by factor 5",
          "C. x(t) shifted right by 5",
          "D. x(t) multiplied vertically by 5"
        ],
        "correct_option": "B",
        "explanation": "Dividing t by 5 makes the signal happen 5 times slower, so it expands in time.",
        "wrong_option_explanations": {
          "A": "Compression by 5 would be x(5t).",
          "C": "A shift would look like x(t-5) or x(t+5).",
          "D": "Vertical multiplication would look like 5x(t)."
        },
        "hint": "Look inside the parentheses: is t multiplied or divided?",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "landmark_mapping",
    "label": "Mapping time landmarks under scaling",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp2_q1",
        "type": "multiple_choice",
        "stem": "If x(t) has a corner at t=6, where does that corner appear in y(t)=x(3t)?",
        "options": [
          "A. t=18",
          "B. t=9",
          "C. t=2",
          "D. t=-2"
        ],
        "correct_option": "C",
        "explanation": "Set 3t=6, so t=2. Landmarks divide by the inside scaling factor.",
        "wrong_option_explanations": {
          "A": "Multiplying the landmark by 3 is the common backwards error.",
          "B": "Adding 3 would be a shift-style mistake.",
          "D": "There is no sign reversal here."
        },
        "hint": "Solve inside argument = old landmark.",
        "needs_visual": true,
        "visual_type": "simple_axis_landmark_check",
        "same_point_variant": true
      },
      {
        "id": "kp2_q2",
        "type": "multiple_choice",
        "stem": "If x(t) is nonzero on -2 ≤ t < 4, then x(t/2) is nonzero on:",
        "options": [
          "A. -1 ≤ t < 2",
          "B. -4 ≤ t < 8",
          "C. 0 ≤ t < 8",
          "D. -2 ≤ t < 4"
        ],
        "correct_option": "B",
        "explanation": "For x(t/2), solve -2 ≤ t/2 < 4. Multiplying through by 2 gives -4 ≤ t < 8.",
        "wrong_option_explanations": {
          "A": "That would match x(2t), not x(t/2).",
          "C": "The negative endpoint must also scale.",
          "D": "That would mean no time scaling occurred."
        },
        "hint": "Apply the inequality to the inside argument t/2.",
        "needs_visual": true,
        "visual_type": "interval_scaling_axis_visual",
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "piecewise_scaling",
    "label": "Applying time scaling to a piecewise signal",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp3_q1",
        "type": "multiple_choice",
        "stem": "In Eq. (1.6), the segment 0 ≤ t < 3 contains 2e^{-t/2}. In x(3t), what happens to that segment?",
        "options": [
          "A. It becomes 2e^{-3t/2} on 0 ≤ t < 1",
          "B. It becomes 6e^{-t/2} on 0 ≤ t < 3",
          "C. It becomes 2e^{-t/6} on 0 ≤ t < 9",
          "D. It becomes 2e^{-t/2} on 0 ≤ t < 1"
        ],
        "correct_option": "A",
        "explanation": "Replace t by 3t in both the formula and the interval: 2e^{-(3t)/2}, with 0 ≤ 3t < 3 giving 0 ≤ t < 1.",
        "wrong_option_explanations": {
          "B": "This incorrectly changes amplitude and fails to scale the interval.",
          "C": "That corresponds to expansion, not compression by 3.",
          "D": "This scales the interval but forgets to substitute 3t into the exponent."
        },
        "hint": "Substitute into the condition and the expression.",
        "needs_visual": true,
        "visual_type": "textbook_figure_1_7_reference",
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "sinusoid_frequency_scaling",
    "label": "Effect of time scaling on sinusoid frequency",
    "importance": "medium",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp4_q1",
        "type": "multiple_choice",
        "stem": "If x(t)=sin(2t), what is x(3t)?",
        "options": [
          "A. sin(6t)",
          "B. 3sin(2t)",
          "C. sin(2t+3)",
          "D. sin(2t/3)"
        ],
        "correct_option": "A",
        "explanation": "Substitute 3t for t: sin(2(3t))=sin(6t). The frequency triples.",
        "wrong_option_explanations": {
          "B": "That changes amplitude, not time scale.",
          "C": "That is a phase or time-shift style error.",
          "D": "That would reduce frequency, matching expansion rather than compression."
        },
        "hint": "Put 3t wherever t appeared in the original expression.",
        "needs_visual": false,
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "demo_observation",
    "label": "What changes and what stays fixed during scaling",
    "importance": "medium",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp5_q1",
        "type": "short_answer",
        "stem": "In the time-scaling demo, when the slider a increases from 1 to 3 for y(t)=x(at), what happens to the time width, the landmark positions, and the amplitude?",
        "ideal_answer": "The signal becomes three times narrower in time. Each time landmark moves to one-third of its original time value, while the amplitude values stay unchanged.",
        "grading_rubric": [
          "Must state that the graph compresses or becomes narrower",
          "Must state that landmarks divide by 3",
          "Must state that amplitude does not change"
        ],
        "explanation": "This checks whether the student interpreted the visual effect, not just memorized the formula.",
        "hint": "Ask what moves horizontally and what changes vertically.",
        "needs_visual": true,
        "visual_type": "interactive_demo_observation",
        "same_point_variant": false
      }
    ]
  }
]
```

## Raw JSON

```json
{
  "section_id": "1.2-2",
  "section_title": "Time Scaling",
  "difficulty": "intermediate",
  "estimated_read_minutes": 7,
  "learning_objectives": [
    "Recognize time compression and time expansion from expressions like x(2t) and x(t/2).",
    "Map time landmarks correctly after scaling.",
    "Apply time scaling to a piecewise signal.",
    "Explain how time scaling changes sinusoid frequency without changing amplitude or phase."
  ],
  "visualization_need": {
    "level": "interactive",
    "reason": [
      "depends_on_parameter_change",
      "formula_to_phenomenon_gap",
      "student_should_manipulate_to_understand",
      "pattern_recognition_benefits_from_figure"
    ],
    "recommended_assets": [
      "react_canvas_demo"
    ]
  },
  "visual_plan": {
    "primary_anchor": "both",
    "rationale": "Use the textbook's Figure 1.7 because it is the exact exam-facing piecewise time-scaling example from the section. Add a React Canvas demo because students understand time scaling faster when they can vary the scaling factor and watch landmarks move while amplitude stays fixed. Do not use generated images because the available textbook figure and interactive demo are stronger and more precise for this concept.",
    "cram": "Use visuals to instantly recognize whether x(at) compresses or expands and where endpoints move.",
    "standard": "Use Figure 1.7 plus one slider demo to connect the formula, the graph, and one representative worked example.",
    "top_score": "Use the demo to test subtle cases: negative time landmarks, origin anchoring, and sinusoid frequency changes."
  },
  "blocks": [
    {
      "type": "text_explanation",
      "instruction": "Create a minimal Page 1 overview only. Use exactly two short sections: 'Section Objective' and 'Concepts In This Section'. Under 'Section Objective', write one sentence: 'Learn how replacing t inside x(t) compresses or expands a signal in time.' Under 'Concepts In This Section', list concept names only as bullets: 'time compression', 'time expansion', 'time landmark mapping', 'piecewise signal scaling', 'sinusoid frequency change'. Do not add background paragraphs, examples, or explanations on this page."
    },
    {
      "type": "math_block",
      "latex": "\\phi(t)=x(nt),\\quad n>1",
      "explanation_instruction": "Start the page with heading '## 1. Time compression'. Explain in 100–140 words that replacing t by nt makes the graph happen n times faster, so the same events occur closer to the origin. Define \\(\\phi(t)\\) as the scaled signal, \\(x(t)\\) as the original signal, and \\(n\\) as the compression factor. State when to use it: when the problem says 'compressed by factor n' or shows \\(x(nt)\\). Give the minimal example: if a corner of \\(x(t)\\) was at \\(t=6\\), then in \\(x(3t)\\) it appears at \\(t=2\\). Exam trigger: inside multiplier greater than 1. Common misuse: thinking the amplitude changes; it does not."
    },
    {
      "type": "math_block",
      "latex": "\\phi(t)=x\\left(\\frac{t}{n}\\right),\\quad n>1",
      "explanation_instruction": "Start the page with heading '## 2. Time expansion'. Explain in 100–140 words that replacing t by \\(t/n\\) makes the graph happen n times slower, so the same events move farther from the origin. Define \\(n\\) as the expansion factor. State when to use it: when the problem says 'expanded by factor n', 'slowed down by factor n', or shows \\(x(t/n)\\). Give the minimal example: if a jump of \\(x(t)\\) was at \\(t=-2\\), then in \\(x(t/4)\\) it appears at \\(t=-8\\). Exam trigger: t is divided inside the argument. Common misuse: moving only positive-time points correctly but forgetting negative-time points also move away from zero."
    },
    {
      "type": "math_block",
      "latex": "x(t)=\\begin{cases}2, & -1.5\\le t<0\\\\2e^{-t/2}, & 0\\le t<3\\\\0, & \\text{otherwise}\\end{cases}\\tag{1.6}",
      "explanation_instruction": "Start the page with heading '## 3. Worked example: scale a piecewise signal'. Use Eq. (1.6) as the original signal from Example 1.4. Explain in 130–170 words how to scale it without redrawing from scratch: replace every t inside the condition and formula. For compression by 3, write that \\(x_c(t)=x(3t)\\), so \\(-1.5\\le 3t<0\\) becomes \\(-0.5\\le t<0\\), and \\(0\\le 3t<3\\) becomes \\(0\\le t<1\\). For expansion by 2, write that \\(x_e(t)=x(t/2)\\), so the support stretches from \\([-1.5,3)\\) to \\([-3,6)\\). Exam note: solve the inequalities after substitution; do not just change the exponent."
    },
    {
      "type": "book_image",
      "source_page": "page-075",
      "fig_id": "Figure 1.7",
      "teaching_role": "example_support",
      "mode_specific_visual_use": {
        "cram": "Use it to memorize the endpoint movement pattern: compression pulls endpoints inward; expansion pushes them outward.",
        "standard": "Use it as the main worked-example visual connecting the piecewise formula to the graph.",
        "top_score": "Use it to check negative endpoints, exponential-rate changes, and unchanged vertical amplitude."
      },
      "caption_instruction": "One sentence: Figure 1.7 shows the original signal x(t), its compressed version x(3t), and its expanded version x(t/2).",
      "description_instruction": "Describe the three stacked plots. Emphasize that the amplitude level 2 stays the same, while time landmarks move from -1.5 and 3 to -0.5 and 1 for compression, and to -3 and 6 for expansion. Point out that the exponential segment becomes faster in x(3t) and slower in x(t/2)."
    },
    {
      "type": "math_block",
      "latex": "A\\sin(\\omega t+\\theta)\\ \\longrightarrow\\ A\\sin(n\\omega t+\\theta),\\quad n>1",
      "explanation_instruction": "Start the page with heading '## 4. Sinusoids under time scaling'. Explain in 100–140 words that compressing a sinusoid by factor \\(n\\) multiplies its angular frequency by \\(n\\), while amplitude \\(A\\) and phase \\(\\theta\\) stay the same. Use Drill 1.5's idea: \\(\\sin(2t)\\) compressed by 3 becomes \\(\\sin(6t)\\), so it completes cycles faster. Also state the expansion counterpart in words: expanding by factor \\(n\\) divides the frequency by \\(n\\). Exam trigger: if the factor is inside the sine argument multiplying t, it changes frequency, not amplitude. Common misuse: saying compression makes the peaks taller."
    },
    {
      "type": "interactive_demo",
      "title": "Time-scaling slider: watch landmarks move",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Drag the slider and memorize the visual rule: bigger inside factor means narrower graph.",
        "standard": "Use the slider after the worked example to connect formulas, endpoints, and sinusoid frequency.",
        "top_score": "Test mixed landmarks and sinusoid mode to verify exactly what changes and what stays invariant."
      },
      "instruction": "Build a React + Canvas interactive demo with a pure white background and two stacked plots: original x(t) on top and scaled y(t)=x(a t) below. Include a slider for a from 0.25 to 4 with labeled presets a=0.5, a=1, a=2, a=3. Include a toggle between 'piecewise example' and 'sinusoid'. For the piecewise example, use the same shape as Eq. (1.6): level 2 from -1.5 to 0, then decaying exponential until 3. Mark original landmarks -1.5, 0, and 3 with small vertical guide lines. In the scaled plot, show the corresponding landmarks -1.5/a, 0, and 3/a. For the sinusoid mode, show that increasing a increases the number of cycles in the same time window. Add a small note beside the plots: 'Time changes; amplitude does not.' Do not include decorative art or extra formulas."
    },
    {
      "type": "section_summary",
      "instruction": "Create the recap page titled '📌 Key Takeaways'. Include 4 concise bullets, each under 24 words, and include formulas explicitly. Must include: compression \\(\\phi(t)=x(nt), n>1\\); expansion \\(\\phi(t)=x(t/n), n>1\\); landmark rule \\(t_{new}=t_{old}/a\\) for \\(x(at)\\); sinusoid rule \\(A\\sin(\\omega t+\\theta)\\to A\\sin(a\\omega t+\\theta)\\). End with one sentence: 'Next, time reversal will show what happens when the time axis is reflected.'"
    },
    {
      "type": "quiz_plan",
      "target_questions": 7,
      "question_range": {
        "min": 6,
        "max": 8
      },
      "knowledge_points": [
        {
          "id": "compression_vs_expansion",
          "label": "Recognizing compression and expansion from x(at)",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Which expression represents x(t) compressed in time by a factor of 4?",
              "options": [
                "A. x(t/4)",
                "B. x(4t)",
                "C. 4x(t)",
                "D. x(t)+4"
              ],
              "correct_option": "B",
              "explanation": "Compression by factor 4 means the signal happens 4 times faster, so t is replaced by 4t.",
              "wrong_option_explanations": {
                "A": "x(t/4) expands the signal by factor 4.",
                "C": "4x(t) changes amplitude, not time scale.",
                "D": "x(t)+4 shifts amplitude upward, not time."
              },
              "hint": "Time scaling changes the input t, not the outside height.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "A signal y(t)=x(t/5) is best described as:",
              "options": [
                "A. x(t) compressed by factor 5",
                "B. x(t) expanded by factor 5",
                "C. x(t) shifted right by 5",
                "D. x(t) multiplied vertically by 5"
              ],
              "correct_option": "B",
              "explanation": "Dividing t by 5 makes the signal happen 5 times slower, so it expands in time.",
              "wrong_option_explanations": {
                "A": "Compression by 5 would be x(5t).",
                "C": "A shift would look like x(t-5) or x(t+5).",
                "D": "Vertical multiplication would look like 5x(t)."
              },
              "hint": "Look inside the parentheses: is t multiplied or divided?",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "landmark_mapping",
          "label": "Mapping time landmarks under scaling",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "If x(t) has a corner at t=6, where does that corner appear in y(t)=x(3t)?",
              "options": [
                "A. t=18",
                "B. t=9",
                "C. t=2",
                "D. t=-2"
              ],
              "correct_option": "C",
              "explanation": "Set 3t=6, so t=2. Landmarks divide by the inside scaling factor.",
              "wrong_option_explanations": {
                "A": "Multiplying the landmark by 3 is the common backwards error.",
                "B": "Adding 3 would be a shift-style mistake.",
                "D": "There is no sign reversal here."
              },
              "hint": "Solve inside argument = old landmark.",
              "needs_visual": true,
              "visual_type": "simple_axis_landmark_check",
              "same_point_variant": true
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "If x(t) is nonzero on -2 ≤ t < 4, then x(t/2) is nonzero on:",
              "options": [
                "A. -1 ≤ t < 2",
                "B. -4 ≤ t < 8",
                "C. 0 ≤ t < 8",
                "D. -2 ≤ t < 4"
              ],
              "correct_option": "B",
              "explanation": "For x(t/2), solve -2 ≤ t/2 < 4. Multiplying through by 2 gives -4 ≤ t < 8.",
              "wrong_option_explanations": {
                "A": "That would match x(2t), not x(t/2).",
                "C": "The negative endpoint must also scale.",
                "D": "That would mean no time scaling occurred."
              },
              "hint": "Apply the inequality to the inside argument t/2.",
              "needs_visual": true,
              "visual_type": "interval_scaling_axis_visual",
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "piecewise_scaling",
          "label": "Applying time scaling to a piecewise signal",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "In Eq. (1.6), the segment 0 ≤ t < 3 contains 2e^{-t/2}. In x(3t), what happens to that segment?",
              "options": [
                "A. It becomes 2e^{-3t/2} on 0 ≤ t < 1",
                "B. It becomes 6e^{-t/2} on 0 ≤ t < 3",
                "C. It becomes 2e^{-t/6} on 0 ≤ t < 9",
                "D. It becomes 2e^{-t/2} on 0 ≤ t < 1"
              ],
              "correct_option": "A",
              "explanation": "Replace t by 3t in both the formula and the interval: 2e^{-(3t)/2}, with 0 ≤ 3t < 3 giving 0 ≤ t < 1.",
              "wrong_option_explanations": {
                "B": "This incorrectly changes amplitude and fails to scale the interval.",
                "C": "That corresponds to expansion, not compression by 3.",
                "D": "This scales the interval but forgets to substitute 3t into the exponent."
              },
              "hint": "Substitute into the condition and the expression.",
              "needs_visual": true,
              "visual_type": "textbook_figure_1_7_reference",
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "sinusoid_frequency_scaling",
          "label": "Effect of time scaling on sinusoid frequency",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp4_q1",
              "type": "multiple_choice",
              "stem": "If x(t)=sin(2t), what is x(3t)?",
              "options": [
                "A. sin(6t)",
                "B. 3sin(2t)",
                "C. sin(2t+3)",
                "D. sin(2t/3)"
              ],
              "correct_option": "A",
              "explanation": "Substitute 3t for t: sin(2(3t))=sin(6t). The frequency triples.",
              "wrong_option_explanations": {
                "B": "That changes amplitude, not time scale.",
                "C": "That is a phase or time-shift style error.",
                "D": "That would reduce frequency, matching expansion rather than compression."
              },
              "hint": "Put 3t wherever t appeared in the original expression.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "demo_observation",
          "label": "What changes and what stays fixed during scaling",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp5_q1",
              "type": "short_answer",
              "stem": "In the time-scaling demo, when the slider a increases from 1 to 3 for y(t)=x(at), what happens to the time width, the landmark positions, and the amplitude?",
              "ideal_answer": "The signal becomes three times narrower in time. Each time landmark moves to one-third of its original time value, while the amplitude values stay unchanged.",
              "grading_rubric": [
                "Must state that the graph compresses or becomes narrower",
                "Must state that landmarks divide by 3",
                "Must state that amplitude does not change"
              ],
              "explanation": "This checks whether the student interpreted the visual effect, not just memorized the formula.",
              "hint": "Ask what moves horizontally and what changes vertically.",
              "needs_visual": true,
              "visual_type": "interactive_demo_observation",
              "same_point_variant": false
            }
          ]
        }
      ]
    }
  ]
}
```
