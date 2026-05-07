# Agent A Preview: B.7-2 Matrix Equality

- Difficulty: beginner
- Estimated read minutes: 4

## Learning Objectives

- State the condition for two matrices to be equal.
- Compare matrices entry by entry using matching positions.
- Use matrix equality to solve for unknown entries.

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
  "rationale": "Matrix equality is definition-first, so the main teaching surface should be LaTeX. A custom static wrong-vs-right visual is still useful because students often compare values without checking matrix size or matching positions. No textbook figure is available, and a Wikipedia image is unnecessary for this symbolic concept.",
  "cram": "Use the visual to remember the fast exam trigger: same size first, then same positions.",
  "standard": "Use the visual after the formula to connect the definition to one representative comparison.",
  "top_score": "Use the visual to catch subtle traps: same numbers in different positions, or different dimensions."
}
```

## Planned Blocks

### Block 1: `text_explanation`
- **instruction**: Create a minimal overview page only. Use exactly these two headings: 'Section Objective' and 'Concepts In This Section'. Under 'Section Objective', write one sentence: 'Learn how to decide when two matrices are equal and how to use equality to find unknown entries.' Under 'Concepts In This Section', list only these concept names as bullets: 'same dimensions', 'entry-by-entry equality', 'unknown entries from matrix equality'. Do not add background paragraphs.

### Block 2: `text_explanation`
- **instruction**: Start a new concept page with the heading '## 1. What matrix equality means'. Explain in 70–100 words that two matrices are equal only when they have the same number of rows and columns, and every corresponding entry is equal. Emphasize 'corresponding' as same row and same column. Include this minimal example in prose: if the top-right entry of one matrix is 5, the top-right entry of the other must also be 5. Avoid discussing matrix operations; this page is only about equality.

### Block 3: `math_block`
- **latex**: \mathbf{A}=\mathbf{B}\quad\Longleftrightarrow\quad a_{ij}=b_{ij}\ \text{for every matching position }(i,j)
- **explanation_instruction**: Explain that \(\mathbf{A}\) and \(\mathbf{B}\) are matrices, and \(a_{ij}\), \(b_{ij}\) are entries in row \(i\), column \(j\). State the use case: use this formula when an exam asks whether two matrices are equal or gives an equation between matrices. State the exam trigger: compare size first, then compare entries at identical positions. State the common misuse: matching numbers anywhere in the matrix instead of matching row-column positions.

### Block 4: `generate_image`
- **tool**: openai/gpt-5.4-image-2
- **reason**: A custom wrong-vs-right teaching contrast is needed; matrix equality is symbolic, but this visual should expose the common trap of ignoring dimensions or positions. No ready textbook or Wikimedia figure is available for this exact exam misconception.
- **teaching_role**: trap_exposure
- **mode_specific_visual_use**:
```json
{
  "cram": "Use it as a one-glance checklist: same size, same positions.",
  "standard": "Use it to reinforce the definition immediately after the formula.",
  "top_score": "Use it to catch near-miss cases where the same numbers appear but not in corresponding entries."
}
```
- **prompt**: Pure white clean background, minimalist lecture-notes educational diagram, exactly one knowledge point: matrix equality. Show two small side-by-side comparisons. Left comparison: two 2 by 2 matrices with identical entries in matching positions, marked with a muted teal check label 'Equal'. Right comparison: two matrices that contain similar numbers but either a different shape or one swapped position, marked with a muted red warning label 'Not equal'. Use colored cell highlights to show matching row-column positions. Low-saturation academic palette, navy / muted teal / soft gray, muted red only for warning. Clean linework, no shadows, no decorative poster styling, no cartoon elements, no dense text blocks, no derivation.
- **style_hint**: lecture notes, academic, clean, restrained color boxes, exam-oriented, one concept only

### Block 5: `text_explanation`
- **instruction**: Start a new concept page with the heading '## 2. Using equality to solve unknown entries'. Explain in 80–120 words that a matrix equation creates separate scalar equations by matching entries in the same position. Then give one representative worked example using the displayed matrix equation in the next math block: show that \(x=7\) from the top-right position and \(y-1=3\), so \(y=4\), from the bottom-left position. End with the exam note: never solve by comparing rows as whole objects first; compare individual entries.

### Block 6: `math_block`
- **latex**: \begin{bmatrix}2 & x \\ y-1 & 5\end{bmatrix}=\begin{bmatrix}2 & 7 \\ 3 & 5\end{bmatrix}
- **explanation_instruction**: Use this as the representative example, not as a new formula. Explain that equal matrices let us set matching entries equal: top-right gives \(x=7\), bottom-left gives \(y-1=3\), so \(y=4\). Mention that the matching positions \((1,2)\) and \((2,1)\) are the important part.

### Block 7: `section_summary`
- **instruction**: Create a recap page titled '📌 Key Takeaways'. Include exactly 3 bullets, each no more than 22 words. The first bullet must explicitly include the core formula: \(\mathbf{A}=\mathbf{B}\Longleftrightarrow a_{ij}=b_{ij}\) for every matching \((i,j)\). The second bullet must state that matrices must have the same dimensions before entries can be compared. The third bullet must state that unknown entries are solved by matching corresponding positions. End with one sentence: 'Next, use this entry-by-entry thinking whenever a matrix equation contains variables.'

### Block 8: `quiz_plan`
- **target_questions**:
```json
5
```
- **question_range**:
```json
{
  "min": 4,
  "max": 5
}
```
- **knowledge_points**:
```json
[
  {
    "id": "matrix_equality_definition",
    "label": "Definition of matrix equality",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp1_q1",
        "type": "multiple_choice",
        "stem": "Which condition is required for two matrices \\(\\mathbf{A}\\) and \\(\\mathbf{B}\\) to be equal?",
        "options": [
          "A. They must contain the same numbers somewhere inside them.",
          "B. They must have the same dimensions and equal entries in every matching position.",
          "C. They must have the same number of nonzero entries.",
          "D. They must have the same determinant."
        ],
        "correct_option": "B",
        "explanation": "Matrix equality requires both the same size and equality of corresponding entries.",
        "wrong_option_explanations": {
          "A": "The entries must be in the same row-column positions, not just somewhere in the matrix.",
          "C": "The number of nonzero entries does not determine equality.",
          "D": "Equal determinants do not imply equal matrices."
        },
        "hint": "Check size first, then compare matching positions.",
        "needs_visual": false,
        "same_point_variant": true
      },
      {
        "id": "kp1_q2",
        "type": "multiple_choice",
        "stem": "Why are \\(\\begin{bmatrix}1&2\\\\3&4\\end{bmatrix}\\) and \\(\\begin{bmatrix}1&3\\\\2&4\\end{bmatrix}\\) not equal?",
        "options": [
          "A. Their dimensions are different.",
          "B. Their corresponding entries do not all match.",
          "C. They contain different total numbers of entries.",
          "D. Matrix equality does not apply to \\(2\\times2\\) matrices."
        ],
        "correct_option": "B",
        "explanation": "Both matrices are \\(2\\times2\\), but the entries 2 and 3 are swapped, so matching positions fail.",
        "wrong_option_explanations": {
          "A": "Both matrices have the same dimensions.",
          "C": "Both contain four entries.",
          "D": "Matrix equality applies to matrices of any size, as long as the sizes match."
        },
        "hint": "Compare top-right with top-right, not just the collection of numbers.",
        "needs_visual": true,
        "visual_type": "wrong_vs_right_visual_check",
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "dimension_check",
    "label": "Same dimensions must be checked first",
    "importance": "high",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp2_q1",
        "type": "multiple_choice",
        "stem": "Can a \\(2\\times3\\) matrix equal a \\(3\\times2\\) matrix?",
        "options": [
          "A. Yes, if they contain the same six numbers.",
          "B. Yes, if their entries add to the same total.",
          "C. No, because their dimensions are different.",
          "D. No, unless both matrices contain only zeros."
        ],
        "correct_option": "C",
        "explanation": "Matrices must have the same dimensions before entry-by-entry equality is even possible.",
        "wrong_option_explanations": {
          "A": "Same numbers are not enough if the shapes differ.",
          "B": "Equal sums do not imply matrix equality.",
          "D": "Even zero matrices must have the same dimensions to be equal."
        },
        "hint": "A \\(2\\times3\\) grid and a \\(3\\times2\\) grid have different positions.",
        "needs_visual": true,
        "visual_type": "structure_comparison_check",
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "solving_unknown_entries",
    "label": "Solving variables from matrix equality",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp3_q1",
        "type": "multiple_choice",
        "stem": "If \\(\\begin{bmatrix}4&x\\\\2&1\\end{bmatrix}=\\begin{bmatrix}4&9\\\\2&1\\end{bmatrix}\\), what is \\(x\\)?",
        "options": [
          "A. 1",
          "B. 2",
          "C. 4",
          "D. 9"
        ],
        "correct_option": "D",
        "explanation": "The unknown \\(x\\) is in the top-right position, so it must equal the top-right entry 9.",
        "wrong_option_explanations": {
          "A": "1 is the bottom-right entry, not the matching position for \\(x\\).",
          "B": "2 is the bottom-left entry.",
          "C": "4 is the top-left entry.",
          "D": "Correct."
        },
        "hint": "Match \\(x\\)'s position, not the nearest number.",
        "needs_visual": false,
        "same_point_variant": false
      },
      {
        "id": "kp3_q2",
        "type": "short_answer",
        "stem": "Given \\(\\begin{bmatrix}2&a+1\\\\b-3&0\\end{bmatrix}=\\begin{bmatrix}2&6\\\\4&0\\end{bmatrix}\\), find \\(a\\) and \\(b\\).",
        "ideal_answer": "\\(a+1=6\\), so \\(a=5\\). Also \\(b-3=4\\), so \\(b=7\\).",
        "grading_rubric": [
          "Must match the top-right entries to get \\(a+1=6\\).",
          "Must match the bottom-left entries to get \\(b-3=4\\).",
          "Must give final values \\(a=5\\) and \\(b=7\\)."
        ],
        "explanation": "Matrix equality turns matching entries into ordinary scalar equations.",
        "hint": "Use the position of each variable to decide which number it equals.",
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
  "section_id": "B.7-2",
  "section_title": "Matrix Equality",
  "difficulty": "beginner",
  "estimated_read_minutes": 4,
  "learning_objectives": [
    "State the condition for two matrices to be equal.",
    "Compare matrices entry by entry using matching positions.",
    "Use matrix equality to solve for unknown entries."
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
    "rationale": "Matrix equality is definition-first, so the main teaching surface should be LaTeX. A custom static wrong-vs-right visual is still useful because students often compare values without checking matrix size or matching positions. No textbook figure is available, and a Wikipedia image is unnecessary for this symbolic concept.",
    "cram": "Use the visual to remember the fast exam trigger: same size first, then same positions.",
    "standard": "Use the visual after the formula to connect the definition to one representative comparison.",
    "top_score": "Use the visual to catch subtle traps: same numbers in different positions, or different dimensions."
  },
  "blocks": [
    {
      "type": "text_explanation",
      "instruction": "Create a minimal overview page only. Use exactly these two headings: 'Section Objective' and 'Concepts In This Section'. Under 'Section Objective', write one sentence: 'Learn how to decide when two matrices are equal and how to use equality to find unknown entries.' Under 'Concepts In This Section', list only these concept names as bullets: 'same dimensions', 'entry-by-entry equality', 'unknown entries from matrix equality'. Do not add background paragraphs."
    },
    {
      "type": "text_explanation",
      "instruction": "Start a new concept page with the heading '## 1. What matrix equality means'. Explain in 70–100 words that two matrices are equal only when they have the same number of rows and columns, and every corresponding entry is equal. Emphasize 'corresponding' as same row and same column. Include this minimal example in prose: if the top-right entry of one matrix is 5, the top-right entry of the other must also be 5. Avoid discussing matrix operations; this page is only about equality."
    },
    {
      "type": "math_block",
      "latex": "\\mathbf{A}=\\mathbf{B}\\quad\\Longleftrightarrow\\quad a_{ij}=b_{ij}\\ \\text{for every matching position }(i,j)",
      "explanation_instruction": "Explain that \\(\\mathbf{A}\\) and \\(\\mathbf{B}\\) are matrices, and \\(a_{ij}\\), \\(b_{ij}\\) are entries in row \\(i\\), column \\(j\\). State the use case: use this formula when an exam asks whether two matrices are equal or gives an equation between matrices. State the exam trigger: compare size first, then compare entries at identical positions. State the common misuse: matching numbers anywhere in the matrix instead of matching row-column positions."
    },
    {
      "type": "generate_image",
      "tool": "openai/gpt-5.4-image-2",
      "reason": "A custom wrong-vs-right teaching contrast is needed; matrix equality is symbolic, but this visual should expose the common trap of ignoring dimensions or positions. No ready textbook or Wikimedia figure is available for this exact exam misconception.",
      "teaching_role": "trap_exposure",
      "mode_specific_visual_use": {
        "cram": "Use it as a one-glance checklist: same size, same positions.",
        "standard": "Use it to reinforce the definition immediately after the formula.",
        "top_score": "Use it to catch near-miss cases where the same numbers appear but not in corresponding entries."
      },
      "prompt": "Pure white clean background, minimalist lecture-notes educational diagram, exactly one knowledge point: matrix equality. Show two small side-by-side comparisons. Left comparison: two 2 by 2 matrices with identical entries in matching positions, marked with a muted teal check label 'Equal'. Right comparison: two matrices that contain similar numbers but either a different shape or one swapped position, marked with a muted red warning label 'Not equal'. Use colored cell highlights to show matching row-column positions. Low-saturation academic palette, navy / muted teal / soft gray, muted red only for warning. Clean linework, no shadows, no decorative poster styling, no cartoon elements, no dense text blocks, no derivation.",
      "style_hint": "lecture notes, academic, clean, restrained color boxes, exam-oriented, one concept only"
    },
    {
      "type": "text_explanation",
      "instruction": "Start a new concept page with the heading '## 2. Using equality to solve unknown entries'. Explain in 80–120 words that a matrix equation creates separate scalar equations by matching entries in the same position. Then give one representative worked example using the displayed matrix equation in the next math block: show that \\(x=7\\) from the top-right position and \\(y-1=3\\), so \\(y=4\\), from the bottom-left position. End with the exam note: never solve by comparing rows as whole objects first; compare individual entries."
    },
    {
      "type": "math_block",
      "latex": "\\begin{bmatrix}2 & x \\\\ y-1 & 5\\end{bmatrix}=\\begin{bmatrix}2 & 7 \\\\ 3 & 5\\end{bmatrix}",
      "explanation_instruction": "Use this as the representative example, not as a new formula. Explain that equal matrices let us set matching entries equal: top-right gives \\(x=7\\), bottom-left gives \\(y-1=3\\), so \\(y=4\\). Mention that the matching positions \\((1,2)\\) and \\((2,1)\\) are the important part."
    },
    {
      "type": "section_summary",
      "instruction": "Create a recap page titled '📌 Key Takeaways'. Include exactly 3 bullets, each no more than 22 words. The first bullet must explicitly include the core formula: \\(\\mathbf{A}=\\mathbf{B}\\Longleftrightarrow a_{ij}=b_{ij}\\) for every matching \\((i,j)\\). The second bullet must state that matrices must have the same dimensions before entries can be compared. The third bullet must state that unknown entries are solved by matching corresponding positions. End with one sentence: 'Next, use this entry-by-entry thinking whenever a matrix equation contains variables.'"
    },
    {
      "type": "quiz_plan",
      "target_questions": 5,
      "question_range": {
        "min": 4,
        "max": 5
      },
      "knowledge_points": [
        {
          "id": "matrix_equality_definition",
          "label": "Definition of matrix equality",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Which condition is required for two matrices \\(\\mathbf{A}\\) and \\(\\mathbf{B}\\) to be equal?",
              "options": [
                "A. They must contain the same numbers somewhere inside them.",
                "B. They must have the same dimensions and equal entries in every matching position.",
                "C. They must have the same number of nonzero entries.",
                "D. They must have the same determinant."
              ],
              "correct_option": "B",
              "explanation": "Matrix equality requires both the same size and equality of corresponding entries.",
              "wrong_option_explanations": {
                "A": "The entries must be in the same row-column positions, not just somewhere in the matrix.",
                "C": "The number of nonzero entries does not determine equality.",
                "D": "Equal determinants do not imply equal matrices."
              },
              "hint": "Check size first, then compare matching positions.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "Why are \\(\\begin{bmatrix}1&2\\\\3&4\\end{bmatrix}\\) and \\(\\begin{bmatrix}1&3\\\\2&4\\end{bmatrix}\\) not equal?",
              "options": [
                "A. Their dimensions are different.",
                "B. Their corresponding entries do not all match.",
                "C. They contain different total numbers of entries.",
                "D. Matrix equality does not apply to \\(2\\times2\\) matrices."
              ],
              "correct_option": "B",
              "explanation": "Both matrices are \\(2\\times2\\), but the entries 2 and 3 are swapped, so matching positions fail.",
              "wrong_option_explanations": {
                "A": "Both matrices have the same dimensions.",
                "C": "Both contain four entries.",
                "D": "Matrix equality applies to matrices of any size, as long as the sizes match."
              },
              "hint": "Compare top-right with top-right, not just the collection of numbers.",
              "needs_visual": true,
              "visual_type": "wrong_vs_right_visual_check",
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "dimension_check",
          "label": "Same dimensions must be checked first",
          "importance": "high",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "Can a \\(2\\times3\\) matrix equal a \\(3\\times2\\) matrix?",
              "options": [
                "A. Yes, if they contain the same six numbers.",
                "B. Yes, if their entries add to the same total.",
                "C. No, because their dimensions are different.",
                "D. No, unless both matrices contain only zeros."
              ],
              "correct_option": "C",
              "explanation": "Matrices must have the same dimensions before entry-by-entry equality is even possible.",
              "wrong_option_explanations": {
                "A": "Same numbers are not enough if the shapes differ.",
                "B": "Equal sums do not imply matrix equality.",
                "D": "Even zero matrices must have the same dimensions to be equal."
              },
              "hint": "A \\(2\\times3\\) grid and a \\(3\\times2\\) grid have different positions.",
              "needs_visual": true,
              "visual_type": "structure_comparison_check",
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "solving_unknown_entries",
          "label": "Solving variables from matrix equality",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "If \\(\\begin{bmatrix}4&x\\\\2&1\\end{bmatrix}=\\begin{bmatrix}4&9\\\\2&1\\end{bmatrix}\\), what is \\(x\\)?",
              "options": [
                "A. 1",
                "B. 2",
                "C. 4",
                "D. 9"
              ],
              "correct_option": "D",
              "explanation": "The unknown \\(x\\) is in the top-right position, so it must equal the top-right entry 9.",
              "wrong_option_explanations": {
                "A": "1 is the bottom-right entry, not the matching position for \\(x\\).",
                "B": "2 is the bottom-left entry.",
                "C": "4 is the top-left entry.",
                "D": "Correct."
              },
              "hint": "Match \\(x\\)'s position, not the nearest number.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp3_q2",
              "type": "short_answer",
              "stem": "Given \\(\\begin{bmatrix}2&a+1\\\\b-3&0\\end{bmatrix}=\\begin{bmatrix}2&6\\\\4&0\\end{bmatrix}\\), find \\(a\\) and \\(b\\).",
              "ideal_answer": "\\(a+1=6\\), so \\(a=5\\). Also \\(b-3=4\\), so \\(b=7\\).",
              "grading_rubric": [
                "Must match the top-right entries to get \\(a+1=6\\).",
                "Must match the bottom-left entries to get \\(b-3=4\\).",
                "Must give final values \\(a=5\\) and \\(b=7\\)."
              ],
              "explanation": "Matrix equality turns matching entries into ordinary scalar equations.",
              "hint": "Use the position of each variable to decide which number it equals.",
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
