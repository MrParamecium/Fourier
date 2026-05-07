# Agent A Preview: B.5-4 B.5-4 A Combination of Heaviside and Clearing Fractions

- Difficulty: intermediate
- Estimated read minutes: 6

## Learning Objectives

- Use the Heaviside cover-up method only for the coefficients it finds quickly.
- Clear fractions to solve the remaining unknown coefficients in a repeated-root partial fraction expansion.
- Recognize when an improper rational function needs a constant term before partial fraction expansion.

## Visualization Need

```json
{
  "level": "static",
  "reason": [
    "pattern_recognition_benefits_from_figure",
    "misconception_needs_visual_correction",
    "wrong_vs_right_contrast_is_high_value"
  ],
  "recommended_assets": [
    "generated_image"
  ]
}
```

## Visual Plan

```json
{
  "primary_anchor": "generated_image",
  "rationale": "This section has no textbook figures and the core skill is a symbolic workflow: use cover-up for easy coefficients, then clear denominators for the rest. A custom lecture-note flowchart is more useful than a generic web image because students need to see the exact exam decision sequence, not a decorative partial-fractions graphic.",
  "cram": "Use the flowchart to recognize when repeated roots make pure Heaviside differentiation inefficient.",
  "standard": "Use the visual as the main process map, then follow one representative example from setup to final coefficients.",
  "top_score": "Use the visual to separate three cases: simple cover-up, repeated-root leftovers, and improper rational functions with a constant term."
}
```

## Planned Blocks

### Block 1: `text_explanation`
- **instruction**: Render Page 1 as a compact outline only. Title it 'Section Objective' and write one sentence: 'Learn how to combine Heaviside cover-up with clearing fractions so repeated-root partial fraction expansions are faster.' Then add 'Concepts In This Section' as a short list of concept names only: 'repeated-root partial fractions', 'Heaviside cover-up for easy coefficients', 'clearing fractions for remaining coefficients', 'improper rational functions with equal degrees'. Do not add background paragraphs.

### Block 2: `text_explanation`
- **instruction**: Start a new knowledge-point page with heading '## 1. Why combine Heaviside with clearing fractions?' Explain in 90–130 words. Emphasize: pure Heaviside works well for simple cover-up coefficients, but repeated roots of higher order can require repeated differentiation, which is slow and error-prone. The hybrid strategy is: find the coefficients that are easy by cover-up, leave the hard repeated-root coefficients as symbols, then multiply through by the denominator and solve the remaining algebra. Include this exam note: 'If you see repeated factors like \((x+2)^3\), expect more than one coefficient over the same factor.' Avoid over-teaching derivations.

### Block 3: `math_block`
- **latex**: \frac{N(x)}{(x+a)^r Q(x)}=\frac{A_1}{x+a}+\frac{A_2}{(x+a)^2}+\cdots+\frac{A_r}{(x+a)^r}+\text{other terms}
- **explanation_instruction**: Explain this as the required repeated-root partial fraction pattern. Define \(N(x)\) as the numerator, \((x+a)^r\) as a repeated factor of order \(r\), \(Q(x)\) as the rest of the denominator, and \(A_1,\ldots,A_r\) as constants to find. Use it when a denominator contains a repeated linear factor. Exam trigger: a power such as \((x+2)^3\). Common misuse: writing only one term over \((x+2)^3\) and forgetting the lower powers.

### Block 4: `generate_image`
- **tool**: openai/gpt-5.4-image-2
- **reason**: No textbook figure is available, and a generic web reference would not show the exact hybrid exam workflow. A custom single-concept process visual is needed.
- **teaching_role**: exam_pattern_anchor
- **mode_specific_visual_use**:
```json
{
  "cram": "Use it as a fast decision checklist for repeated-root partial fractions.",
  "standard": "Use it to follow the representative example step by step.",
  "top_score": "Use it to notice where students usually switch methods too early or too late."
}
```
- **prompt**: Pure white clean background, minimalist lecture-notes educational flowchart, one knowledge point only: the hybrid method for repeated-root partial fraction expansion. Show four boxes in one left-to-right path: 1. 'Write all repeated-root terms' with small example '(x+2)^3 gives A/(x+2)+B/(x+2)^2+C/(x+2)^3'; 2. 'Use cover-up only for easy coefficients'; 3. 'Clear denominators'; 4. 'Solve remaining constants by substitution or coefficient matching'. Add one muted red warning box: 'Do not force repeated differentiation if clearing fractions is shorter.' Low-saturation academic palette, navy, muted teal, soft gray, muted red only for warning. No decorative art, no cartoon elements, no dense text, no extra examples.
- **style_hint**: lecture notes, academic, clean, restrained color boxes, exam-oriented, one concept only

### Block 5: `math_block`
- **latex**: \frac{4x^3+16x^2+23x+13}{(x+1)(x+2)^3}=\frac{2}{x+1}+\frac{A}{x+2}+\frac{B}{(x+2)^2}+\frac{1}{(x+2)^3}
- **explanation_instruction**: Start a new page with heading '## 2. Representative example: keep the easy coefficients, solve the rest'. Explain that the cover-up part has already given the easy coefficients \(2\) and \(1\), so only \(A\) and \(B\) remain unknown. Define every symbol briefly. Use this formula when the denominator has one simple factor and one repeated factor. Exam trigger: the problem asks for a partial fraction expansion but repeated differentiation would take too long. Common misuse: changing the denominator powers or skipping \(B/(x+2)^2\).

### Block 6: `math_block`
- **latex**: 4x^3+16x^2+23x+13=2(x+2)^3+A(x+1)(x+2)^2+B(x+1)(x+2)+(x+1)
- **explanation_instruction**: Continue the same example. Explain that this is obtained by multiplying both sides by \((x+1)(x+2)^3\), so all fractions disappear. Then give the short solution path: compare the \(x^3\) coefficient to get \(A=2\); then set \(x=0\) to get \(13=25+2B\), so \(B=-6\). State the final expansion in one sentence: the missing terms are \(2/(x+2)\) and \(-6/(x+2)^2\). Common mistake: clearing only some denominators and leaving a fraction behind.

### Block 7: `math_block`
- **latex**: \frac{N(x)}{D(x)}=k+\frac{R(x)}{D(x)}
- **explanation_instruction**: Start a new page with heading '## 3. Equal degrees: include the constant first'. Explain in 90–130 words that when the numerator and denominator have the same degree, the rational function is not proper, so the expansion starts with a constant \(k\). Define \(k\) as the ratio of leading coefficients when the degrees are equal, and \(R(x)\) as the remainder numerator after subtracting \(kD(x)\). Use this before partial fractions when \(\deg N=\deg D\). Exam trigger: numerator degree equals denominator degree. Common misuse: starting partial fractions immediately and forgetting the constant term.

### Block 8: `section_summary`
- **instruction**: Create a recap page titled '📌 Key Takeaways'. Use exactly 4 bullet points, each concise but complete. Include these formulas explicitly: repeated-root pattern \(A_1/(x+a)+A_2/(x+a)^2+\cdots+A_r/(x+a)^r\); the example setup \(\frac{4x^3+16x^2+23x+13}{(x+1)(x+2)^3}=\frac{2}{x+1}+\frac{A}{x+2}+\frac{B}{(x+2)^2}+\frac{1}{(x+2)^3}\); the cleared identity idea 'multiply by the full denominator'; and the improper equal-degree form \(N(x)/D(x)=k+R(x)/D(x)\). End with one sentence: 'In the next section we will use partial fraction expansions to make inverse transforms and system calculations easier.'

### Block 9: `quiz_plan`
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
    "id": "repeated_root_pattern",
    "label": "Repeated-root partial fraction pattern",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp1_q1",
        "type": "multiple_choice",
        "stem": "If the denominator contains \\((x+2)^3\\), which set of terms must appear in the partial fraction expansion?",
        "options": [
          "A. \\(\\frac{A}{(x+2)^3}\\) only",
          "B. \\(\\frac{A}{x+2}+\\frac{B}{(x+2)^2}+\\frac{C}{(x+2)^3}\\)",
          "C. \\(\\frac{A}{x+2}+\\frac{B}{x+3}\\)",
          "D. \\(\\frac{A}{(x+2)^2}+\\frac{B}{(x+2)^3}\\) only"
        ],
        "correct_option": "B",
        "explanation": "A repeated factor of order 3 requires one term for each power from 1 through 3.",
        "wrong_option_explanations": {
          "A": "This skips the lower powers, so it cannot represent the general expansion.",
          "C": "The factor is repeated at \\(x+2\\), not split into \\(x+2\\) and \\(x+3\\).",
          "D": "This still skips the first-power term \\(A/(x+2)\\)."
        },
        "hint": "A repeated factor of order \\(r\\) gives \\(r\\) separate terms.",
        "needs_visual": false,
        "same_point_variant": true
      },
      {
        "id": "kp1_q2",
        "type": "multiple_choice",
        "stem": "What is the most common setup error for a factor like \\((x-a)^4\\)?",
        "options": [
          "A. Including four terms with powers 1, 2, 3, and 4",
          "B. Using constants in the numerators",
          "C. Writing only one term over \\((x-a)^4\\)",
          "D. Clearing fractions after writing the expansion"
        ],
        "correct_option": "C",
        "explanation": "For repeated linear factors, writing only the highest-power denominator misses necessary terms.",
        "wrong_option_explanations": {
          "A": "That is the correct structure for a fourth-order repeated factor.",
          "B": "Constants are correct for repeated linear factors.",
          "D": "Clearing fractions is a valid way to solve unknown coefficients."
        },
        "hint": "Count the power on the repeated factor.",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "hybrid_method_trigger",
    "label": "When to combine Heaviside and clearing fractions",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp2_q1",
        "type": "multiple_choice",
        "stem": "Why does this section recommend combining Heaviside cover-up with clearing fractions for repeated roots?",
        "options": [
          "A. Cover-up never works for repeated roots",
          "B. Repeated roots may require repeated differentiation, so clearing fractions can be faster for leftover coefficients",
          "C. Clearing fractions can only be used after all coefficients are known",
          "D. The method avoids writing a partial fraction expansion"
        ],
        "correct_option": "B",
        "explanation": "The hybrid method keeps the easy cover-up coefficients and uses algebra for the remaining repeated-root coefficients.",
        "wrong_option_explanations": {
          "A": "Cover-up can still find some coefficients, especially convenient ones.",
          "C": "Clearing fractions is used precisely because some coefficients are still unknown.",
          "D": "You still must write the partial fraction expansion first."
        },
        "hint": "The point is efficiency, not replacing the expansion.",
        "needs_visual": true,
        "visual_type": "flowchart_observation",
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "clearing_fractions_step",
    "label": "Clearing denominators to solve unknown coefficients",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp3_q1",
        "type": "multiple_choice",
        "stem": "For \\(\\frac{4x^3+16x^2+23x+13}{(x+1)(x+2)^3}=\\frac{2}{x+1}+\\frac{A}{x+2}+\\frac{B}{(x+2)^2}+\\frac{1}{(x+2)^3}\\), what should you multiply by to clear fractions?",
        "options": [
          "A. \\((x+1)(x+2)^3\\)",
          "B. \\((x+1)(x+2)\\)",
          "C. \\((x+2)^3\\) only",
          "D. \\(x+1\\) only"
        ],
        "correct_option": "A",
        "explanation": "You multiply by the full denominator so every term becomes polynomial.",
        "wrong_option_explanations": {
          "B": "This leaves denominators for terms with \\((x+2)^2\\) or \\((x+2)^3\\).",
          "C": "This does not clear the \\(x+1\\) denominator.",
          "D": "This leaves all \\((x+2)\\)-based denominators."
        },
        "hint": "Use the original full denominator.",
        "needs_visual": false,
        "same_point_variant": true
      },
      {
        "id": "kp3_q2",
        "type": "short_answer",
        "stem": "After clearing fractions in the example, the identity is \\(4x^3+16x^2+23x+13=2(x+2)^3+A(x+1)(x+2)^2+B(x+1)(x+2)+(x+1)\\). Compare the \\(x^3\\) coefficient to find \\(A\\).",
        "ideal_answer": "\\(A=2\\). The \\(x^3\\) coefficient on the right is \\(2+A\\), and it must equal \\(4\\), so \\(A=2\\).",
        "grading_rubric": [
          "Must identify the right-side \\(x^3\\) coefficient as \\(2+A\\)",
          "Must set \\(2+A=4\\)",
          "Must conclude \\(A=2\\)"
        ],
        "explanation": "Coefficient matching is one of the fastest ways to finish the cleared identity.",
        "hint": "Only terms that can produce \\(x^3\\) matter.",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "improper_equal_degree_case",
    "label": "Equal numerator and denominator degrees",
    "importance": "medium",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp4_q1",
        "type": "multiple_choice",
        "stem": "If \\(\\deg N=\\deg D\\), what should the partial fraction expansion include before the proper fraction terms?",
        "options": [
          "A. A constant term \\(k\\)",
          "B. An extra repeated-root term automatically",
          "C. No numerator terms",
          "D. Only the highest-power denominator"
        ],
        "correct_option": "A",
        "explanation": "When the degrees are equal, the rational function is improper and starts with a constant \\(k\\), usually the ratio of leading coefficients.",
        "wrong_option_explanations": {
          "B": "Repeated-root terms depend on the denominator factors, not just degree equality.",
          "C": "Partial fractions still have numerator constants over denominator factors.",
          "D": "That repeats the common error of skipping required lower-power terms."
        },
        "hint": "Equal degrees mean there is a nonzero quotient.",
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
  "section_id": "B.5-4",
  "section_title": "B.5-4 A Combination of Heaviside and Clearing Fractions",
  "difficulty": "intermediate",
  "estimated_read_minutes": 6,
  "learning_objectives": [
    "Use the Heaviside cover-up method only for the coefficients it finds quickly.",
    "Clear fractions to solve the remaining unknown coefficients in a repeated-root partial fraction expansion.",
    "Recognize when an improper rational function needs a constant term before partial fraction expansion."
  ],
  "visualization_need": {
    "level": "static",
    "reason": [
      "pattern_recognition_benefits_from_figure",
      "misconception_needs_visual_correction",
      "wrong_vs_right_contrast_is_high_value"
    ],
    "recommended_assets": [
      "generated_image"
    ]
  },
  "visual_plan": {
    "primary_anchor": "generated_image",
    "rationale": "This section has no textbook figures and the core skill is a symbolic workflow: use cover-up for easy coefficients, then clear denominators for the rest. A custom lecture-note flowchart is more useful than a generic web image because students need to see the exact exam decision sequence, not a decorative partial-fractions graphic.",
    "cram": "Use the flowchart to recognize when repeated roots make pure Heaviside differentiation inefficient.",
    "standard": "Use the visual as the main process map, then follow one representative example from setup to final coefficients.",
    "top_score": "Use the visual to separate three cases: simple cover-up, repeated-root leftovers, and improper rational functions with a constant term."
  },
  "blocks": [
    {
      "type": "text_explanation",
      "instruction": "Render Page 1 as a compact outline only. Title it 'Section Objective' and write one sentence: 'Learn how to combine Heaviside cover-up with clearing fractions so repeated-root partial fraction expansions are faster.' Then add 'Concepts In This Section' as a short list of concept names only: 'repeated-root partial fractions', 'Heaviside cover-up for easy coefficients', 'clearing fractions for remaining coefficients', 'improper rational functions with equal degrees'. Do not add background paragraphs."
    },
    {
      "type": "text_explanation",
      "instruction": "Start a new knowledge-point page with heading '## 1. Why combine Heaviside with clearing fractions?' Explain in 90–130 words. Emphasize: pure Heaviside works well for simple cover-up coefficients, but repeated roots of higher order can require repeated differentiation, which is slow and error-prone. The hybrid strategy is: find the coefficients that are easy by cover-up, leave the hard repeated-root coefficients as symbols, then multiply through by the denominator and solve the remaining algebra. Include this exam note: 'If you see repeated factors like \\((x+2)^3\\), expect more than one coefficient over the same factor.' Avoid over-teaching derivations."
    },
    {
      "type": "math_block",
      "latex": "\\frac{N(x)}{(x+a)^r Q(x)}=\\frac{A_1}{x+a}+\\frac{A_2}{(x+a)^2}+\\cdots+\\frac{A_r}{(x+a)^r}+\\text{other terms}",
      "explanation_instruction": "Explain this as the required repeated-root partial fraction pattern. Define \\(N(x)\\) as the numerator, \\((x+a)^r\\) as a repeated factor of order \\(r\\), \\(Q(x)\\) as the rest of the denominator, and \\(A_1,\\ldots,A_r\\) as constants to find. Use it when a denominator contains a repeated linear factor. Exam trigger: a power such as \\((x+2)^3\\). Common misuse: writing only one term over \\((x+2)^3\\) and forgetting the lower powers."
    },
    {
      "type": "generate_image",
      "tool": "openai/gpt-5.4-image-2",
      "reason": "No textbook figure is available, and a generic web reference would not show the exact hybrid exam workflow. A custom single-concept process visual is needed.",
      "teaching_role": "exam_pattern_anchor",
      "mode_specific_visual_use": {
        "cram": "Use it as a fast decision checklist for repeated-root partial fractions.",
        "standard": "Use it to follow the representative example step by step.",
        "top_score": "Use it to notice where students usually switch methods too early or too late."
      },
      "prompt": "Pure white clean background, minimalist lecture-notes educational flowchart, one knowledge point only: the hybrid method for repeated-root partial fraction expansion. Show four boxes in one left-to-right path: 1. 'Write all repeated-root terms' with small example '(x+2)^3 gives A/(x+2)+B/(x+2)^2+C/(x+2)^3'; 2. 'Use cover-up only for easy coefficients'; 3. 'Clear denominators'; 4. 'Solve remaining constants by substitution or coefficient matching'. Add one muted red warning box: 'Do not force repeated differentiation if clearing fractions is shorter.' Low-saturation academic palette, navy, muted teal, soft gray, muted red only for warning. No decorative art, no cartoon elements, no dense text, no extra examples.",
      "style_hint": "lecture notes, academic, clean, restrained color boxes, exam-oriented, one concept only"
    },
    {
      "type": "math_block",
      "latex": "\\frac{4x^3+16x^2+23x+13}{(x+1)(x+2)^3}=\\frac{2}{x+1}+\\frac{A}{x+2}+\\frac{B}{(x+2)^2}+\\frac{1}{(x+2)^3}",
      "explanation_instruction": "Start a new page with heading '## 2. Representative example: keep the easy coefficients, solve the rest'. Explain that the cover-up part has already given the easy coefficients \\(2\\) and \\(1\\), so only \\(A\\) and \\(B\\) remain unknown. Define every symbol briefly. Use this formula when the denominator has one simple factor and one repeated factor. Exam trigger: the problem asks for a partial fraction expansion but repeated differentiation would take too long. Common misuse: changing the denominator powers or skipping \\(B/(x+2)^2\\)."
    },
    {
      "type": "math_block",
      "latex": "4x^3+16x^2+23x+13=2(x+2)^3+A(x+1)(x+2)^2+B(x+1)(x+2)+(x+1)",
      "explanation_instruction": "Continue the same example. Explain that this is obtained by multiplying both sides by \\((x+1)(x+2)^3\\), so all fractions disappear. Then give the short solution path: compare the \\(x^3\\) coefficient to get \\(A=2\\); then set \\(x=0\\) to get \\(13=25+2B\\), so \\(B=-6\\). State the final expansion in one sentence: the missing terms are \\(2/(x+2)\\) and \\(-6/(x+2)^2\\). Common mistake: clearing only some denominators and leaving a fraction behind."
    },
    {
      "type": "math_block",
      "latex": "\\frac{N(x)}{D(x)}=k+\\frac{R(x)}{D(x)}",
      "explanation_instruction": "Start a new page with heading '## 3. Equal degrees: include the constant first'. Explain in 90–130 words that when the numerator and denominator have the same degree, the rational function is not proper, so the expansion starts with a constant \\(k\\). Define \\(k\\) as the ratio of leading coefficients when the degrees are equal, and \\(R(x)\\) as the remainder numerator after subtracting \\(kD(x)\\). Use this before partial fractions when \\(\\deg N=\\deg D\\). Exam trigger: numerator degree equals denominator degree. Common misuse: starting partial fractions immediately and forgetting the constant term."
    },
    {
      "type": "section_summary",
      "instruction": "Create a recap page titled '📌 Key Takeaways'. Use exactly 4 bullet points, each concise but complete. Include these formulas explicitly: repeated-root pattern \\(A_1/(x+a)+A_2/(x+a)^2+\\cdots+A_r/(x+a)^r\\); the example setup \\(\\frac{4x^3+16x^2+23x+13}{(x+1)(x+2)^3}=\\frac{2}{x+1}+\\frac{A}{x+2}+\\frac{B}{(x+2)^2}+\\frac{1}{(x+2)^3}\\); the cleared identity idea 'multiply by the full denominator'; and the improper equal-degree form \\(N(x)/D(x)=k+R(x)/D(x)\\). End with one sentence: 'In the next section we will use partial fraction expansions to make inverse transforms and system calculations easier.'"
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
          "id": "repeated_root_pattern",
          "label": "Repeated-root partial fraction pattern",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "If the denominator contains \\((x+2)^3\\), which set of terms must appear in the partial fraction expansion?",
              "options": [
                "A. \\(\\frac{A}{(x+2)^3}\\) only",
                "B. \\(\\frac{A}{x+2}+\\frac{B}{(x+2)^2}+\\frac{C}{(x+2)^3}\\)",
                "C. \\(\\frac{A}{x+2}+\\frac{B}{x+3}\\)",
                "D. \\(\\frac{A}{(x+2)^2}+\\frac{B}{(x+2)^3}\\) only"
              ],
              "correct_option": "B",
              "explanation": "A repeated factor of order 3 requires one term for each power from 1 through 3.",
              "wrong_option_explanations": {
                "A": "This skips the lower powers, so it cannot represent the general expansion.",
                "C": "The factor is repeated at \\(x+2\\), not split into \\(x+2\\) and \\(x+3\\).",
                "D": "This still skips the first-power term \\(A/(x+2)\\)."
              },
              "hint": "A repeated factor of order \\(r\\) gives \\(r\\) separate terms.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "What is the most common setup error for a factor like \\((x-a)^4\\)?",
              "options": [
                "A. Including four terms with powers 1, 2, 3, and 4",
                "B. Using constants in the numerators",
                "C. Writing only one term over \\((x-a)^4\\)",
                "D. Clearing fractions after writing the expansion"
              ],
              "correct_option": "C",
              "explanation": "For repeated linear factors, writing only the highest-power denominator misses necessary terms.",
              "wrong_option_explanations": {
                "A": "That is the correct structure for a fourth-order repeated factor.",
                "B": "Constants are correct for repeated linear factors.",
                "D": "Clearing fractions is a valid way to solve unknown coefficients."
              },
              "hint": "Count the power on the repeated factor.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "hybrid_method_trigger",
          "label": "When to combine Heaviside and clearing fractions",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "Why does this section recommend combining Heaviside cover-up with clearing fractions for repeated roots?",
              "options": [
                "A. Cover-up never works for repeated roots",
                "B. Repeated roots may require repeated differentiation, so clearing fractions can be faster for leftover coefficients",
                "C. Clearing fractions can only be used after all coefficients are known",
                "D. The method avoids writing a partial fraction expansion"
              ],
              "correct_option": "B",
              "explanation": "The hybrid method keeps the easy cover-up coefficients and uses algebra for the remaining repeated-root coefficients.",
              "wrong_option_explanations": {
                "A": "Cover-up can still find some coefficients, especially convenient ones.",
                "C": "Clearing fractions is used precisely because some coefficients are still unknown.",
                "D": "You still must write the partial fraction expansion first."
              },
              "hint": "The point is efficiency, not replacing the expansion.",
              "needs_visual": true,
              "visual_type": "flowchart_observation",
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "clearing_fractions_step",
          "label": "Clearing denominators to solve unknown coefficients",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "For \\(\\frac{4x^3+16x^2+23x+13}{(x+1)(x+2)^3}=\\frac{2}{x+1}+\\frac{A}{x+2}+\\frac{B}{(x+2)^2}+\\frac{1}{(x+2)^3}\\), what should you multiply by to clear fractions?",
              "options": [
                "A. \\((x+1)(x+2)^3\\)",
                "B. \\((x+1)(x+2)\\)",
                "C. \\((x+2)^3\\) only",
                "D. \\(x+1\\) only"
              ],
              "correct_option": "A",
              "explanation": "You multiply by the full denominator so every term becomes polynomial.",
              "wrong_option_explanations": {
                "B": "This leaves denominators for terms with \\((x+2)^2\\) or \\((x+2)^3\\).",
                "C": "This does not clear the \\(x+1\\) denominator.",
                "D": "This leaves all \\((x+2)\\)-based denominators."
              },
              "hint": "Use the original full denominator.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp3_q2",
              "type": "short_answer",
              "stem": "After clearing fractions in the example, the identity is \\(4x^3+16x^2+23x+13=2(x+2)^3+A(x+1)(x+2)^2+B(x+1)(x+2)+(x+1)\\). Compare the \\(x^3\\) coefficient to find \\(A\\).",
              "ideal_answer": "\\(A=2\\). The \\(x^3\\) coefficient on the right is \\(2+A\\), and it must equal \\(4\\), so \\(A=2\\).",
              "grading_rubric": [
                "Must identify the right-side \\(x^3\\) coefficient as \\(2+A\\)",
                "Must set \\(2+A=4\\)",
                "Must conclude \\(A=2\\)"
              ],
              "explanation": "Coefficient matching is one of the fastest ways to finish the cleared identity.",
              "hint": "Only terms that can produce \\(x^3\\) matter.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "improper_equal_degree_case",
          "label": "Equal numerator and denominator degrees",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp4_q1",
              "type": "multiple_choice",
              "stem": "If \\(\\deg N=\\deg D\\), what should the partial fraction expansion include before the proper fraction terms?",
              "options": [
                "A. A constant term \\(k\\)",
                "B. An extra repeated-root term automatically",
                "C. No numerator terms",
                "D. Only the highest-power denominator"
              ],
              "correct_option": "A",
              "explanation": "When the degrees are equal, the rational function is improper and starts with a constant \\(k\\), usually the ratio of leading coefficients.",
              "wrong_option_explanations": {
                "B": "Repeated-root terms depend on the denominator factors, not just degree equality.",
                "C": "Partial fractions still have numerator constants over denominator factors.",
                "D": "That repeats the common error of skipping required lower-power terms."
              },
              "hint": "Equal degrees mean there is a nonzero quotient.",
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
