# Agent A Preview: B.5-3 B.5-3 Repeated Factors of Q(x)

- Difficulty: intermediate
- Estimated read minutes: 6

## Learning Objectives

- Recognize when a denominator contains a repeated factor.
- Write the correct partial-fraction template for a repeated factor.
- Use the derivative form of the Heaviside method to find repeated-factor coefficients.
- Apply the method to a representative example like Example B.10.

## Visualization Need

```json
{
  "level": "interactive",
  "reason": [
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
  "primary_anchor": "react_demo",
  "rationale": "This section has no textbook figures and is mainly symbolic. A Wikipedia-style static image is not useful here. The best visual support is an interactive term-ladder demo that makes the repeated-factor structure visible: one repeated factor of power r creates r separate partial-fraction terms, one for each power from 1 to r.",
  "cram": "Use the demo to recognize the exam template immediately: repeated power r means r stacked denominator powers.",
  "standard": "Use the demo beside the formulas to connect the algebraic template with one representative worked example.",
  "top_score": "Use the demo to expose the trap of keeping only the highest-power term or applying simple cover-up to every coefficient."
}
```

## Planned Blocks

### Block 1: `text_explanation`
- **instruction**: Render a minimal first page only. Use the heading 'Section Objective' followed by one sentence: 'Learn how partial fractions change when Q(x) contains a repeated linear factor.' Then use the heading 'Concepts In This Section' and list only these concept names as bullets: repeated denominator factor; repeated-factor partial-fraction template; derivative Heaviside coefficient formula; Example B.10 expansion. Do not add background paragraphs or explanations on this page.

### Block 2: `math_block`
- **latex**: F(x)=\frac{P(x)}{(x-\lambda)^r(x-\alpha_1)(x-\alpha_2)\cdots(x-\alpha_j)}
- **explanation_instruction**: Start the page with heading '## 1. Recognize the repeated factor'. Explain in 80-120 words that \((x-\lambda)^r\) is the repeated factor and the other \((x-\alpha_i)\) terms are ordinary distinct linear factors. Define \(P(x)\), \(\lambda\), \(r\), and \(\alpha_i\). Include the minimal example: in \((x+1)^3(x+2)\), the repeated factor is \((x+1)^3\), so \(\lambda=-1\) and \(r=3\). Exam trigger: a denominator power greater than 1. Common misuse: treating \((x+1)^3\) as if it creates only one partial-fraction term.

### Block 3: `math_block`
- **latex**: F(x)=\frac{A_1}{x-\lambda}+\frac{A_2}{(x-\lambda)^2}+\cdots+\frac{A_r}{(x-\lambda)^r}+\frac{B_1}{x-\alpha_1}+\cdots+\frac{B_j}{x-\alpha_j}
- **explanation_instruction**: Start a new page with heading '## 2. Build the repeated-factor template'. Explain in 100-140 words that a repeated factor of order \(r\) produces one term for every denominator power from \(1\) through \(r\). Explain that \(A_1,\ldots,A_r\) belong to the repeated factor, while \(B_1,\ldots,B_j\) belong to the remaining distinct factors. Use the concrete template for \((x+1)^3(x+2)\): say it must have terms over \(x+1\), \((x+1)^2\), \((x+1)^3\), and \(x+2\). Exam note: write the template before solving coefficients. Common trap: skipping the lower-power terms.

### Block 4: `interactive_demo`
- **teaching_role**: concept_anchor
- **mode_specific_visual_use**:
```json
{
  "cram": "Make the repeated-factor template recognizable in seconds.",
  "standard": "Let students connect the denominator power r to the exact number of required terms.",
  "top_score": "Use the changing r value to catch missing-term errors and indexing confusion."
}
```
- **title**: Repeated-Factor Term Ladder
- **instruction**: Create a React + Canvas interactive demo on the same page as the repeated-factor template. Show a denominator factor \((x-\lambda)^r\) on the left and a vertical ladder of partial-fraction terms on the right. Include a slider for \(r=1,2,3,4,5\). When the student changes \(r\), the right side should update to show exactly \(r\) terms: \(A_1/(x-\lambda)\), \(A_2/(x-\lambda)^2\), continuing through \(A_r/(x-\lambda)^r\). Highlight newly added terms in muted teal. Add a small warning box: 'Power r means r terms, not one term.' Keep the display clean, symbolic, and exam-oriented.

### Block 5: `math_block`
- **latex**: A_{r-k}=\frac{1}{k!}\left.\frac{d^k}{dx^k}\left[(x-\lambda)^rF(x)\right]\right|_{x=\lambda}
- **explanation_instruction**: Start a new page with heading '## 3. Find the repeated-factor coefficients'. Explain in 120-160 words that this is the repeated-factor version of Heaviside cover-up. State that \(k=0,1,\ldots,r-1\). Explain each symbol: \(A_{r-k}\) is the coefficient being found, \(k\) is the derivative order, \(r\) is the repeated-factor power, and \(\lambda\) is the root of the repeated factor. Mention that \(k=0\) gives the highest-power coefficient \(A_r\), while derivatives give the lower-power coefficients. Exam trigger: use this when cover-up leaves a repeated factor. Common misuse: trying ordinary cover-up separately for \(A_1,A_2,\ldots,A_r\) without derivatives.

### Block 6: `math_block`
- **latex**: F(x)=\frac{3}{x+1}+\frac{1}{(x+1)^2}+\frac{2}{(x+1)^3}+\frac{1}{x+2}
- **explanation_instruction**: Start a new page with heading '## 4. Representative example: Example B.10'. State the original function in text: \(F(x)=(4x^3+16x^2+23x+13)/((x+1)^3(x+2))\). In 120-160 words, walk through the template first: \(A_1/(x+1)+A_2/(x+1)^2+A_3/(x+1)^3+B_1/(x+2)\). Then state the coefficient results clearly: \(A_3=2\), \(A_2=1\), \(A_1=3\), and \(B_1=1\). Do not show a long derivation; include one sentence that \(A_3\) comes from evaluating \((x+1)^3F(x)\) at \(x=-1\). Exam note: coefficient solving is easier after the full template is written correctly.

### Block 7: `section_summary`
- **instruction**: Create a recap page titled '📌 Key Takeaways'. Include 4 bullets, each 20 words or fewer if possible. The summary must explicitly include these formulas: \(F(x)=P(x)/[(x-\lambda)^r(x-\alpha_1)\cdots(x-\alpha_j)]\); the repeated-factor expansion \(A_1/(x-\lambda)+\cdots+A_r/(x-\lambda)^r\); the coefficient formula \(A_{r-k}=\frac{1}{k!}\left.\frac{d^k}{dx^k}[(x-\lambda)^rF(x)]\right|_{x=\lambda}\); and the Example B.10 final expansion. End with one bridge sentence: 'Next, use this repeated-factor skill whenever inverse transforms or differential-equation solutions produce repeated roots.'

### Block 8: `quiz_plan`
- **target_questions**:
```json
6
```
- **question_range**:
```json
{
  "min": 5,
  "max": 7
}
```
- **knowledge_points**:
```json
[
  {
    "id": "recognize_repeated_factor",
    "label": "Recognizing the repeated factor and its order",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp1_q1",
        "type": "multiple_choice",
        "stem": "In the denominator \\((x-4)^2(x+3)(x-1)\\), which factor is repeated and what is its order?",
        "options": [
          "A. \\((x-4)\\), order 2",
          "B. \\((x+3)\\), order 2",
          "C. \\((x-1)\\), order 3",
          "D. No factor is repeated"
        ],
        "correct_option": "A",
        "explanation": "\\((x-4)^2\\) has exponent 2, so \\((x-4)\\) is the repeated factor of order 2.",
        "wrong_option_explanations": {
          "B": "\\((x+3)\\) appears only to the first power.",
          "C": "\\((x-1)\\) appears only to the first power, not order 3.",
          "D": "A factor with exponent greater than 1 is repeated."
        },
        "hint": "Look for the denominator factor with exponent greater than 1.",
        "needs_visual": false,
        "same_point_variant": true
      },
      {
        "id": "kp1_q2",
        "type": "multiple_choice",
        "stem": "For \\(F(x)=P(x)/[(x+5)^4(x-2)]\\), what are \\(\\lambda\\) and \\(r\\) for the repeated factor \\((x-\\lambda)^r\\)?",
        "options": [
          "A. \\(\\lambda=5, r=4\\)",
          "B. \\(\\lambda=-5, r=4\\)",
          "C. \\(\\lambda=-5, r=1\\)",
          "D. \\(\\lambda=2, r=4\\)"
        ],
        "correct_option": "B",
        "explanation": "\\((x+5)^4=(x-(-5))^4\\), so \\(\\lambda=-5\\) and \\(r=4\\).",
        "wrong_option_explanations": {
          "A": "The sign is wrong: \\(x+5\\) means \\(x-(-5)\\).",
          "C": "The exponent is 4, so the order is not 1.",
          "D": "\\((x-2)\\) is the distinct first-order factor, not the repeated one."
        },
        "hint": "Rewrite \\(x+5\\) as \\(x-(-5)\\).",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "write_template",
    "label": "Writing the correct repeated-factor partial-fraction template",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp2_q1",
        "type": "multiple_choice",
        "stem": "Which is the correct partial-fraction template for a denominator \\((x+1)^3(x+2)\\)?",
        "options": [
          "A. \\(\\frac{A}{(x+1)^3}+\\frac{B}{x+2}\\)",
          "B. \\(\\frac{A}{x+1}+\\frac{B}{x+2}\\)",
          "C. \\(\\frac{A_1}{x+1}+\\frac{A_2}{(x+1)^2}+\\frac{A_3}{(x+1)^3}+\\frac{B}{x+2}\\)",
          "D. \\(\\frac{A_1}{x+1}+\\frac{A_2}{x+2}+\\frac{A_3}{(x+2)^2}\\)"
        ],
        "correct_option": "C",
        "explanation": "A repeated factor of order 3 requires three terms: powers 1, 2, and 3 of \\((x+1)\\), plus one term for \\((x+2)\\).",
        "wrong_option_explanations": {
          "A": "This keeps only the highest-power repeated term and skips lower powers.",
          "B": "This treats \\((x+1)^3\\) as if it were first-order.",
          "D": "The repeated factor is \\((x+1)^3\\), not \\((x+2)^2\\)."
        },
        "hint": "Power 3 means three separate terms for \\(x+1\\).",
        "needs_visual": true,
        "visual_type": "interactive_demo_term_ladder",
        "same_point_variant": true
      },
      {
        "id": "kp2_q2",
        "type": "multiple_choice",
        "stem": "Observe the term-ladder demo at \\(r=4\\). What should appear on the repeated-factor side?",
        "options": [
          "A. Only \\(A_4/(x-\\lambda)^4\\)",
          "B. \\(A_1/(x-\\lambda)+A_2/(x-\\lambda)^2+A_3/(x-\\lambda)^3+A_4/(x-\\lambda)^4\\)",
          "C. Four copies of \\(A/(x-\\lambda)\\)",
          "D. \\(A_1/(x-\\lambda)+A_4/(x-\\lambda)^4\\) only"
        ],
        "correct_option": "B",
        "explanation": "For order \\(r=4\\), the expansion needs every power from 1 through 4.",
        "wrong_option_explanations": {
          "A": "The highest-power term alone is not enough.",
          "C": "The denominators must have increasing powers, not four identical first-power terms.",
          "D": "The middle powers 2 and 3 cannot be skipped."
        },
        "hint": "The ladder should not skip any rung.",
        "needs_visual": true,
        "visual_type": "demo_observation_check",
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "coefficient_formula",
    "label": "Using the derivative coefficient formula",
    "importance": "high",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp3_q1",
        "type": "multiple_choice",
        "stem": "For a repeated factor \\((x-\\lambda)^3\\), which coefficient is found by evaluating \\([(x-\\lambda)^3F(x)]\\) at \\(x=\\lambda\\) with no derivative?",
        "options": [
          "A. \\(A_1\\)",
          "B. \\(A_2\\)",
          "C. \\(A_3\\)",
          "D. All coefficients at once"
        ],
        "correct_option": "C",
        "explanation": "In \\(A_{r-k}\\), setting \\(k=0\\) gives \\(A_r\\). For \\(r=3\\), that is \\(A_3\\).",
        "wrong_option_explanations": {
          "A": "\\(A_1\\) requires higher derivative work, not the no-derivative evaluation.",
          "B": "\\(A_2\\) corresponds to one derivative when \\(r=3\\).",
          "D": "The no-derivative step gives only the highest-power coefficient."
        },
        "hint": "Set \\(k=0\\) in \\(A_{r-k}\\).",
        "needs_visual": false,
        "same_point_variant": false
      },
      {
        "id": "kp3_q2",
        "type": "short_answer",
        "stem": "A classmate writes only \\(A/(x+1)^3+B/(x+2)\\) for Example B.10. Explain why this is wrong.",
        "ideal_answer": "Because \\((x+1)^3\\) is a repeated factor of order 3, the expansion must include terms for \\(1/(x+1)\\), \\(1/(x+1)^2\\), and \\(1/(x+1)^3\\). Writing only the highest-power term skips required lower-power terms.",
        "grading_rubric": [
          "Must identify \\((x+1)^3\\) as repeated of order 3",
          "Must state that all powers 1 through 3 are required",
          "Must explain that the highest-power term alone is incomplete"
        ],
        "explanation": "This checks the most common repeated-factor template error.",
        "hint": "Power 3 means three denominator powers must appear.",
        "needs_visual": false,
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "example_b10_result",
    "label": "Applying the method to Example B.10",
    "importance": "medium",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp4_q1",
        "type": "multiple_choice",
        "stem": "Which final expansion matches Example B.10 for \\(F(x)=(4x^3+16x^2+23x+13)/[(x+1)^3(x+2)]\\)?",
        "options": [
          "A. \\(\\frac{2}{x+1}+\\frac{1}{(x+1)^2}+\\frac{3}{(x+1)^3}+\\frac{1}{x+2}\\)",
          "B. \\(\\frac{3}{x+1}+\\frac{1}{(x+1)^2}+\\frac{2}{(x+1)^3}+\\frac{1}{x+2}\\)",
          "C. \\(\\frac{3}{(x+1)^3}+\\frac{1}{x+2}\\)",
          "D. \\(\\frac{1}{x+1}+\\frac{2}{x+2}+\\frac{3}{(x+2)^2}\\)"
        ],
        "correct_option": "B",
        "explanation": "Example B.10 gives coefficients \\(A_1=3\\), \\(A_2=1\\), \\(A_3=2\\), and \\(B=1\\).",
        "wrong_option_explanations": {
          "A": "This swaps the coefficients on \\(1/(x+1)\\) and \\(1/(x+1)^3\\).",
          "C": "This skips required lower-power repeated-factor terms.",
          "D": "This incorrectly treats \\((x+2)\\) as repeated."
        },
        "hint": "Match each coefficient to the correct denominator power.",
        "needs_visual": false,
        "same_point_variant": false
      }
    ]
  }
]
```

## Raw JSON

```json
{
  "section_id": "B.5-3",
  "section_title": "B.5-3 Repeated Factors of Q(x)",
  "difficulty": "intermediate",
  "estimated_read_minutes": 6,
  "learning_objectives": [
    "Recognize when a denominator contains a repeated factor.",
    "Write the correct partial-fraction template for a repeated factor.",
    "Use the derivative form of the Heaviside method to find repeated-factor coefficients.",
    "Apply the method to a representative example like Example B.10."
  ],
  "visualization_need": {
    "level": "interactive",
    "reason": [
      "formula_to_phenomenon_gap",
      "student_should_manipulate_to_understand",
      "pattern_recognition_benefits_from_figure"
    ],
    "recommended_assets": [
      "react_canvas_demo"
    ]
  },
  "visual_plan": {
    "primary_anchor": "react_demo",
    "rationale": "This section has no textbook figures and is mainly symbolic. A Wikipedia-style static image is not useful here. The best visual support is an interactive term-ladder demo that makes the repeated-factor structure visible: one repeated factor of power r creates r separate partial-fraction terms, one for each power from 1 to r.",
    "cram": "Use the demo to recognize the exam template immediately: repeated power r means r stacked denominator powers.",
    "standard": "Use the demo beside the formulas to connect the algebraic template with one representative worked example.",
    "top_score": "Use the demo to expose the trap of keeping only the highest-power term or applying simple cover-up to every coefficient."
  },
  "blocks": [
    {
      "type": "text_explanation",
      "instruction": "Render a minimal first page only. Use the heading 'Section Objective' followed by one sentence: 'Learn how partial fractions change when Q(x) contains a repeated linear factor.' Then use the heading 'Concepts In This Section' and list only these concept names as bullets: repeated denominator factor; repeated-factor partial-fraction template; derivative Heaviside coefficient formula; Example B.10 expansion. Do not add background paragraphs or explanations on this page."
    },
    {
      "type": "math_block",
      "latex": "F(x)=\\frac{P(x)}{(x-\\lambda)^r(x-\\alpha_1)(x-\\alpha_2)\\cdots(x-\\alpha_j)}",
      "explanation_instruction": "Start the page with heading '## 1. Recognize the repeated factor'. Explain in 80-120 words that \\((x-\\lambda)^r\\) is the repeated factor and the other \\((x-\\alpha_i)\\) terms are ordinary distinct linear factors. Define \\(P(x)\\), \\(\\lambda\\), \\(r\\), and \\(\\alpha_i\\). Include the minimal example: in \\((x+1)^3(x+2)\\), the repeated factor is \\((x+1)^3\\), so \\(\\lambda=-1\\) and \\(r=3\\). Exam trigger: a denominator power greater than 1. Common misuse: treating \\((x+1)^3\\) as if it creates only one partial-fraction term."
    },
    {
      "type": "math_block",
      "latex": "F(x)=\\frac{A_1}{x-\\lambda}+\\frac{A_2}{(x-\\lambda)^2}+\\cdots+\\frac{A_r}{(x-\\lambda)^r}+\\frac{B_1}{x-\\alpha_1}+\\cdots+\\frac{B_j}{x-\\alpha_j}",
      "explanation_instruction": "Start a new page with heading '## 2. Build the repeated-factor template'. Explain in 100-140 words that a repeated factor of order \\(r\\) produces one term for every denominator power from \\(1\\) through \\(r\\). Explain that \\(A_1,\\ldots,A_r\\) belong to the repeated factor, while \\(B_1,\\ldots,B_j\\) belong to the remaining distinct factors. Use the concrete template for \\((x+1)^3(x+2)\\): say it must have terms over \\(x+1\\), \\((x+1)^2\\), \\((x+1)^3\\), and \\(x+2\\). Exam note: write the template before solving coefficients. Common trap: skipping the lower-power terms."
    },
    {
      "type": "interactive_demo",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Make the repeated-factor template recognizable in seconds.",
        "standard": "Let students connect the denominator power r to the exact number of required terms.",
        "top_score": "Use the changing r value to catch missing-term errors and indexing confusion."
      },
      "title": "Repeated-Factor Term Ladder",
      "instruction": "Create a React + Canvas interactive demo on the same page as the repeated-factor template. Show a denominator factor \\((x-\\lambda)^r\\) on the left and a vertical ladder of partial-fraction terms on the right. Include a slider for \\(r=1,2,3,4,5\\). When the student changes \\(r\\), the right side should update to show exactly \\(r\\) terms: \\(A_1/(x-\\lambda)\\), \\(A_2/(x-\\lambda)^2\\), continuing through \\(A_r/(x-\\lambda)^r\\). Highlight newly added terms in muted teal. Add a small warning box: 'Power r means r terms, not one term.' Keep the display clean, symbolic, and exam-oriented."
    },
    {
      "type": "math_block",
      "latex": "A_{r-k}=\\frac{1}{k!}\\left.\\frac{d^k}{dx^k}\\left[(x-\\lambda)^rF(x)\\right]\\right|_{x=\\lambda}",
      "explanation_instruction": "Start a new page with heading '## 3. Find the repeated-factor coefficients'. Explain in 120-160 words that this is the repeated-factor version of Heaviside cover-up. State that \\(k=0,1,\\ldots,r-1\\). Explain each symbol: \\(A_{r-k}\\) is the coefficient being found, \\(k\\) is the derivative order, \\(r\\) is the repeated-factor power, and \\(\\lambda\\) is the root of the repeated factor. Mention that \\(k=0\\) gives the highest-power coefficient \\(A_r\\), while derivatives give the lower-power coefficients. Exam trigger: use this when cover-up leaves a repeated factor. Common misuse: trying ordinary cover-up separately for \\(A_1,A_2,\\ldots,A_r\\) without derivatives."
    },
    {
      "type": "math_block",
      "latex": "F(x)=\\frac{3}{x+1}+\\frac{1}{(x+1)^2}+\\frac{2}{(x+1)^3}+\\frac{1}{x+2}",
      "explanation_instruction": "Start a new page with heading '## 4. Representative example: Example B.10'. State the original function in text: \\(F(x)=(4x^3+16x^2+23x+13)/((x+1)^3(x+2))\\). In 120-160 words, walk through the template first: \\(A_1/(x+1)+A_2/(x+1)^2+A_3/(x+1)^3+B_1/(x+2)\\). Then state the coefficient results clearly: \\(A_3=2\\), \\(A_2=1\\), \\(A_1=3\\), and \\(B_1=1\\). Do not show a long derivation; include one sentence that \\(A_3\\) comes from evaluating \\((x+1)^3F(x)\\) at \\(x=-1\\). Exam note: coefficient solving is easier after the full template is written correctly."
    },
    {
      "type": "section_summary",
      "instruction": "Create a recap page titled '📌 Key Takeaways'. Include 4 bullets, each 20 words or fewer if possible. The summary must explicitly include these formulas: \\(F(x)=P(x)/[(x-\\lambda)^r(x-\\alpha_1)\\cdots(x-\\alpha_j)]\\); the repeated-factor expansion \\(A_1/(x-\\lambda)+\\cdots+A_r/(x-\\lambda)^r\\); the coefficient formula \\(A_{r-k}=\\frac{1}{k!}\\left.\\frac{d^k}{dx^k}[(x-\\lambda)^rF(x)]\\right|_{x=\\lambda}\\); and the Example B.10 final expansion. End with one bridge sentence: 'Next, use this repeated-factor skill whenever inverse transforms or differential-equation solutions produce repeated roots.'"
    },
    {
      "type": "quiz_plan",
      "target_questions": 6,
      "question_range": {
        "min": 5,
        "max": 7
      },
      "knowledge_points": [
        {
          "id": "recognize_repeated_factor",
          "label": "Recognizing the repeated factor and its order",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "In the denominator \\((x-4)^2(x+3)(x-1)\\), which factor is repeated and what is its order?",
              "options": [
                "A. \\((x-4)\\), order 2",
                "B. \\((x+3)\\), order 2",
                "C. \\((x-1)\\), order 3",
                "D. No factor is repeated"
              ],
              "correct_option": "A",
              "explanation": "\\((x-4)^2\\) has exponent 2, so \\((x-4)\\) is the repeated factor of order 2.",
              "wrong_option_explanations": {
                "B": "\\((x+3)\\) appears only to the first power.",
                "C": "\\((x-1)\\) appears only to the first power, not order 3.",
                "D": "A factor with exponent greater than 1 is repeated."
              },
              "hint": "Look for the denominator factor with exponent greater than 1.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "For \\(F(x)=P(x)/[(x+5)^4(x-2)]\\), what are \\(\\lambda\\) and \\(r\\) for the repeated factor \\((x-\\lambda)^r\\)?",
              "options": [
                "A. \\(\\lambda=5, r=4\\)",
                "B. \\(\\lambda=-5, r=4\\)",
                "C. \\(\\lambda=-5, r=1\\)",
                "D. \\(\\lambda=2, r=4\\)"
              ],
              "correct_option": "B",
              "explanation": "\\((x+5)^4=(x-(-5))^4\\), so \\(\\lambda=-5\\) and \\(r=4\\).",
              "wrong_option_explanations": {
                "A": "The sign is wrong: \\(x+5\\) means \\(x-(-5)\\).",
                "C": "The exponent is 4, so the order is not 1.",
                "D": "\\((x-2)\\) is the distinct first-order factor, not the repeated one."
              },
              "hint": "Rewrite \\(x+5\\) as \\(x-(-5)\\).",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "write_template",
          "label": "Writing the correct repeated-factor partial-fraction template",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "Which is the correct partial-fraction template for a denominator \\((x+1)^3(x+2)\\)?",
              "options": [
                "A. \\(\\frac{A}{(x+1)^3}+\\frac{B}{x+2}\\)",
                "B. \\(\\frac{A}{x+1}+\\frac{B}{x+2}\\)",
                "C. \\(\\frac{A_1}{x+1}+\\frac{A_2}{(x+1)^2}+\\frac{A_3}{(x+1)^3}+\\frac{B}{x+2}\\)",
                "D. \\(\\frac{A_1}{x+1}+\\frac{A_2}{x+2}+\\frac{A_3}{(x+2)^2}\\)"
              ],
              "correct_option": "C",
              "explanation": "A repeated factor of order 3 requires three terms: powers 1, 2, and 3 of \\((x+1)\\), plus one term for \\((x+2)\\).",
              "wrong_option_explanations": {
                "A": "This keeps only the highest-power repeated term and skips lower powers.",
                "B": "This treats \\((x+1)^3\\) as if it were first-order.",
                "D": "The repeated factor is \\((x+1)^3\\), not \\((x+2)^2\\)."
              },
              "hint": "Power 3 means three separate terms for \\(x+1\\).",
              "needs_visual": true,
              "visual_type": "interactive_demo_term_ladder",
              "same_point_variant": true
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "Observe the term-ladder demo at \\(r=4\\). What should appear on the repeated-factor side?",
              "options": [
                "A. Only \\(A_4/(x-\\lambda)^4\\)",
                "B. \\(A_1/(x-\\lambda)+A_2/(x-\\lambda)^2+A_3/(x-\\lambda)^3+A_4/(x-\\lambda)^4\\)",
                "C. Four copies of \\(A/(x-\\lambda)\\)",
                "D. \\(A_1/(x-\\lambda)+A_4/(x-\\lambda)^4\\) only"
              ],
              "correct_option": "B",
              "explanation": "For order \\(r=4\\), the expansion needs every power from 1 through 4.",
              "wrong_option_explanations": {
                "A": "The highest-power term alone is not enough.",
                "C": "The denominators must have increasing powers, not four identical first-power terms.",
                "D": "The middle powers 2 and 3 cannot be skipped."
              },
              "hint": "The ladder should not skip any rung.",
              "needs_visual": true,
              "visual_type": "demo_observation_check",
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "coefficient_formula",
          "label": "Using the derivative coefficient formula",
          "importance": "high",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "For a repeated factor \\((x-\\lambda)^3\\), which coefficient is found by evaluating \\([(x-\\lambda)^3F(x)]\\) at \\(x=\\lambda\\) with no derivative?",
              "options": [
                "A. \\(A_1\\)",
                "B. \\(A_2\\)",
                "C. \\(A_3\\)",
                "D. All coefficients at once"
              ],
              "correct_option": "C",
              "explanation": "In \\(A_{r-k}\\), setting \\(k=0\\) gives \\(A_r\\). For \\(r=3\\), that is \\(A_3\\).",
              "wrong_option_explanations": {
                "A": "\\(A_1\\) requires higher derivative work, not the no-derivative evaluation.",
                "B": "\\(A_2\\) corresponds to one derivative when \\(r=3\\).",
                "D": "The no-derivative step gives only the highest-power coefficient."
              },
              "hint": "Set \\(k=0\\) in \\(A_{r-k}\\).",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp3_q2",
              "type": "short_answer",
              "stem": "A classmate writes only \\(A/(x+1)^3+B/(x+2)\\) for Example B.10. Explain why this is wrong.",
              "ideal_answer": "Because \\((x+1)^3\\) is a repeated factor of order 3, the expansion must include terms for \\(1/(x+1)\\), \\(1/(x+1)^2\\), and \\(1/(x+1)^3\\). Writing only the highest-power term skips required lower-power terms.",
              "grading_rubric": [
                "Must identify \\((x+1)^3\\) as repeated of order 3",
                "Must state that all powers 1 through 3 are required",
                "Must explain that the highest-power term alone is incomplete"
              ],
              "explanation": "This checks the most common repeated-factor template error.",
              "hint": "Power 3 means three denominator powers must appear.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "example_b10_result",
          "label": "Applying the method to Example B.10",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp4_q1",
              "type": "multiple_choice",
              "stem": "Which final expansion matches Example B.10 for \\(F(x)=(4x^3+16x^2+23x+13)/[(x+1)^3(x+2)]\\)?",
              "options": [
                "A. \\(\\frac{2}{x+1}+\\frac{1}{(x+1)^2}+\\frac{3}{(x+1)^3}+\\frac{1}{x+2}\\)",
                "B. \\(\\frac{3}{x+1}+\\frac{1}{(x+1)^2}+\\frac{2}{(x+1)^3}+\\frac{1}{x+2}\\)",
                "C. \\(\\frac{3}{(x+1)^3}+\\frac{1}{x+2}\\)",
                "D. \\(\\frac{1}{x+1}+\\frac{2}{x+2}+\\frac{3}{(x+2)^2}\\)"
              ],
              "correct_option": "B",
              "explanation": "Example B.10 gives coefficients \\(A_1=3\\), \\(A_2=1\\), \\(A_3=2\\), and \\(B=1\\).",
              "wrong_option_explanations": {
                "A": "This swaps the coefficients on \\(1/(x+1)\\) and \\(1/(x+1)^3\\).",
                "C": "This skips required lower-power repeated-factor terms.",
                "D": "This incorrectly treats \\((x+2)\\) as repeated."
              },
              "hint": "Match each coefficient to the correct denominator power.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        }
      ]
    }
  ]
}
```
