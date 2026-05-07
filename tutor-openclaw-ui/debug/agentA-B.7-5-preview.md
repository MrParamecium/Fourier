# Agent A Preview: B.7-5 Element-by-Element Operations

- Difficulty: beginner
- Estimated read minutes: 6

## Learning Objectives

- Distinguish MATLAB matrix multiplication from element-by-element multiplication
- Use matching vector dimensions before applying element-by-element operations
- Use MATLAB operators .*, ./, and .^ correctly
- Interpret h(t) = f(t)g(t) as point-by-point waveform scaling

## Visualization Need

```json
{
  "level": "interactive",
  "reason": [
    "formula_to_phenomenon_gap",
    "input_output_response_is_visual",
    "student_should_manipulate_to_understand"
  ],
  "recommended_assets": [
    "react_canvas_demo",
    "textbook_figure",
    "latex_native_formula_visual"
  ]
}
```

## Visual Plan

```json
{
  "primary_anchor": "both",
  "rationale": "This section is mostly symbolic MATLAB syntax, so formulas should be LaTeX-native. However, the main idea h(t)=f(t)g(t) is easier to understand by seeing each sample of f(t) scaled by g(t). Use a React Canvas demo for the point-by-point process and the available textbook Fig. B.14 for the final waveform comparison.",
  "cram": "Use visuals to make the exam trigger obvious: use .* when each sample must pair with the matching sample.",
  "standard": "Use the demo and Fig. B.14 to connect MATLAB syntax h=f.*g with the waveform h(t)=f(t)g(t).",
  "top_score": "Use visuals to stress the trap: same-looking vectors may fail if one is a row vector and the other is a column vector."
}
```

## Planned Blocks

### Block 1: `text_explanation`
- **instruction**: Page 1 only. Write a compact overview with exactly two parts: (1) heading 'Section Objective' followed by one sentence: 'Learn when MATLAB needs element-by-element operations instead of ordinary matrix multiplication.' (2) heading 'Concepts In This Section' followed by only these concept names as bullets: 'standard matrix multiplication', 'element-by-element multiplication', 'matching dimensions', 'period operators', 'waveform comparison'. Do not add background paragraphs.

### Block 2: `text_explanation`
- **instruction**: Start Page 2 with heading '## 1. Why ordinary * is not the right tool here'. Explain that MATLAB's * follows matrix algebra, not point-by-point pairing. Use 90-130 words. Include one minimal example: a 1×N row vector times an N×1 column vector is allowed and gives one scalar, but two 1×N row vectors cannot be multiplied using *. End with exam note: 'If the problem asks for matching entries or matching time samples, ordinary * is probably the wrong operator.'

### Block 3: `math_block`
- **latex**: (1\times N)(N\times 1)\rightarrow 1\times 1
- **explanation_instruction**: Explain in 3-5 bullets: this is the inner product case; N matching entries collapse into one scalar; use it when the goal is one accumulated value; exam trigger is 'dot product' or 'inner product'; common misuse is using * when the desired output should still be a vector.

### Block 4: `math_block`
- **latex**: (N\times 1)(1\times M)\rightarrow N\times M
- **explanation_instruction**: Explain in 3-5 bullets: this is the outer product case; it creates a full matrix from a column vector and a row vector; use it when every row entry must pair with every column entry; exam trigger is a requested table/grid of all pairings; common misuse is expecting a same-sized vector result.

### Block 5: `text_explanation`
- **instruction**: Start Page 3 with heading '## 2. Element-by-element operations pair matching entries'. Explain that element-by-element operations keep the same shape as the input vectors because each output entry is made from the corresponding input entries. Use 100-150 words. Include the representative MATLAB example from the OCR: g = exp(-10*t); h = f.*g;. State that f and g must have the same dimensions. Include the trap: a row vector and a column vector with the same number of entries are still not the same dimensions.

### Block 6: `math_block`
- **latex**: h_k=f_k g_k,\quad k=1,2,\ldots,N
- **explanation_instruction**: Explain in bullets: h_k is the kth output sample; f_k and g_k are the kth samples of the two input vectors; use this when each time sample should be scaled by the matching time sample; exam trigger is wording like 'element-by-element', 'pointwise', 'sample-by-sample', or MATLAB syntax using a period; common misuse is writing h=f*g, which asks MATLAB for matrix multiplication instead.

### Block 7: `interactive_demo`
- **teaching_role**: concept_anchor
- **mode_specific_visual_use**:
```json
{
  "cram": "Let students drag one slider and immediately see that .* preserves vector length while scaling each sample.",
  "standard": "Show f(t), g(t)=e^{-10t}, and h(t)=f(t)g(t) together so the syntax h=f.*g becomes visual.",
  "top_score": "Add a row-vs-column toggle to expose why equal entry count is not enough when dimensions differ."
}
```
- **demo_spec**:
```json
{
  "title": "Point-by-point multiplication demo",
  "rendering": "React + Canvas line plot with pure white background and three clearly labeled curves: f(t), g(t)=e^{-10t}, and h(t)=f(t)g(t).",
  "controls": [
    "Slider for decay rate in g(t)=e^{-at), labeled a",
    "Toggle: show matching row vectors vs mismatched row/column vectors",
    "Checkbox: highlight one sample index k and draw vertical guide lines from f_k and g_k to h_k"
  ],
  "student_task": "Ask students to move the decay slider and notice that h(t) changes sample-by-sample, not by one global matrix product.",
  "implementation_note": "Correct the displayed formula to g(t)=e^{-at}; do not include the typo e^{-at) in the final rendered demo."
}
```

### Block 8: `book_image`
- **source_page**: page-049
- **fig_id**: Fig. B.14
- **caption_instruction**: One sentence: 'Fig. B.14 compares the original sinusoid f(t) with the element-by-element product h(t)=f(t)g(t).' 
- **description_instruction**: Describe the horizontal axis t from 0 to 0.2 and the vertical axis Amplitude. Point out that h(t) follows the same general oscillation pattern as f(t), but its amplitude is reduced by the exponential envelope. Tell students to connect the dotted curve h(t) to the MATLAB command h = f.*g, not h = f*g.
- **teaching_role**: example_support
- **mode_specific_visual_use**:
```json
{
  "cram": "Use the dotted smaller-amplitude curve as the fast visual cue for element-by-element scaling.",
  "standard": "Use the figure as the representative result of multiplying f(t) and g(t) point by point.",
  "top_score": "Ask students to explain why the output remains a time vector rather than becoming a scalar or matrix."
}
```

### Block 9: `text_explanation`
- **instruction**: Start Page 4 with heading '## 3. MATLAB period operators'. Explain the operator pattern in 80-120 words. State exactly: 'Use .*, ./, and .^ when multiplication, division, or powers must happen entry by entry.' Also state: 'Addition and subtraction are already element-by-element in MATLAB, so they do not use a period.' Include one quick check example: if f and g are same-sized row vectors, h=f.*g is valid; h=f*g is not valid for two row vectors.

### Block 10: `section_summary`
- **instruction**: Create the recap page titled '📌 Key Takeaways'. Include exactly 4 bullets, each ≤24 words, and include these core formulas or syntax explicitly: '(1×N)(N×1)→1×1', '(N×1)(1×M)→N×M', 'h_k=f_k g_k', and 'h = f.*g'. End with one sentence: 'Next, matrix operations use MATLAB commands to build and manipulate vectors and matrices.'

### Block 11: `quiz_plan`
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
    "id": "standard_vs_elementwise_multiplication",
    "label": "Ordinary * versus element-by-element .*",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp1_q1",
        "type": "multiple_choice",
        "stem": "In MATLAB, f and g are both 1×N row vectors, and you want h to contain h_k = f_k g_k. Which command is correct?",
        "options": [
          "A. h = f*g",
          "B. h = f.*g",
          "C. h = f/g",
          "D. h = f^g"
        ],
        "correct_option": "B",
        "explanation": "Element-by-element multiplication uses .*, so each entry of f is multiplied by the matching entry of g.",
        "wrong_option_explanations": {
          "A": "This asks for matrix multiplication, and two row vectors are not conformable for *.",
          "C": "This is matrix right division, not point-by-point multiplication.",
          "D": "This is not the MATLAB syntax for multiplying matching vector entries."
        },
        "hint": "Look for the period before the multiplication symbol.",
        "needs_visual": false,
        "same_point_variant": true
      },
      {
        "id": "kp1_q2",
        "type": "multiple_choice",
        "stem": "Which wording is the strongest trigger for using .* instead of *?",
        "options": [
          "A. Compute one scalar inner product",
          "B. Multiply every sample by the matching sample of another vector",
          "C. Create an N×M table of all pairings",
          "D. Transpose a row vector into a column vector"
        ],
        "correct_option": "B",
        "explanation": "Matching-sample multiplication is exactly element-by-element multiplication.",
        "wrong_option_explanations": {
          "A": "A scalar inner product uses ordinary matrix multiplication with conformable dimensions.",
          "C": "A table of all pairings describes an outer product, not element-by-element multiplication.",
          "D": "Transposition changes vector orientation; it does not multiply entries."
        },
        "hint": "Ask whether the output should stay the same size as the input vectors.",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "dimension_conformability",
    "label": "Dimension rules for vector multiplication",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp2_q1",
        "type": "multiple_choice",
        "stem": "What is the result size of ordinary matrix multiplication (1×N)(N×1)?",
        "options": [
          "A. 1×1",
          "B. 1×N",
          "C. N×1",
          "D. N×N"
        ],
        "correct_option": "A",
        "explanation": "A row vector times a conformable column vector gives the inner product, which is one scalar.",
        "wrong_option_explanations": {
          "B": "That would be the original row-vector size, not the result of an inner product.",
          "C": "That would be a column vector, but the inner dimensions collapse to one scalar.",
          "D": "N×N would come from multiplying an N×1 column vector by a 1×N row vector."
        },
        "hint": "Outer dimensions give the result size.",
        "needs_visual": false,
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "waveform_interpretation",
    "label": "Visual meaning of h(t)=f(t)g(t)",
    "importance": "medium",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp3_q1",
        "type": "multiple_choice",
        "stem": "Observe Fig. B.14 or the demo: h(t) is produced from f(t) using g(t)=e^{-10t}. What should happen to the amplitude of h(t) as t increases?",
        "options": [
          "A. It generally shrinks because the exponential factor decreases",
          "B. It becomes a constant scalar",
          "C. It becomes an N×N matrix",
          "D. It must have larger peaks than f(t)"
        ],
        "correct_option": "A",
        "explanation": "The exponential envelope decreases with t, so multiplying point by point reduces the sinusoid's amplitude over time.",
        "wrong_option_explanations": {
          "B": "Element-by-element multiplication keeps a vector of time samples, not one scalar.",
          "C": "An N×N matrix would come from an outer product, not point-by-point multiplication.",
          "D": "A decaying exponential factor does not force larger peaks."
        },
        "hint": "Focus on what e^{-10t} does as t grows.",
        "needs_visual": true,
        "visual_type": "book_figure_or_demo_observation",
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "period_operator_syntax",
    "label": "MATLAB period operators",
    "importance": "medium",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp4_q1",
        "type": "short_answer",
        "stem": "A student writes y = x^2 to square every entry of vector x. Write the corrected MATLAB command and explain the mistake.",
        "ideal_answer": "The corrected command is y = x.^2. The period tells MATLAB to square each entry separately; x^2 asks for matrix power, which is not element-by-element vector squaring.",
        "grading_rubric": [
          "Must write y = x.^2",
          "Must identify .^ as element-by-element exponentiation",
          "Must distinguish element-by-element power from matrix power"
        ],
        "explanation": "This checks whether the student can transfer the period-operator rule beyond multiplication.",
        "hint": "Multiplication uses .*, division uses ./, and powers use .^.",
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
  "section_id": "B.7-5",
  "section_title": "Element-by-Element Operations",
  "difficulty": "beginner",
  "estimated_read_minutes": 6,
  "learning_objectives": [
    "Distinguish MATLAB matrix multiplication from element-by-element multiplication",
    "Use matching vector dimensions before applying element-by-element operations",
    "Use MATLAB operators .*, ./, and .^ correctly",
    "Interpret h(t) = f(t)g(t) as point-by-point waveform scaling"
  ],
  "visualization_need": {
    "level": "interactive",
    "reason": [
      "formula_to_phenomenon_gap",
      "input_output_response_is_visual",
      "student_should_manipulate_to_understand"
    ],
    "recommended_assets": [
      "react_canvas_demo",
      "textbook_figure",
      "latex_native_formula_visual"
    ]
  },
  "visual_plan": {
    "primary_anchor": "both",
    "rationale": "This section is mostly symbolic MATLAB syntax, so formulas should be LaTeX-native. However, the main idea h(t)=f(t)g(t) is easier to understand by seeing each sample of f(t) scaled by g(t). Use a React Canvas demo for the point-by-point process and the available textbook Fig. B.14 for the final waveform comparison.",
    "cram": "Use visuals to make the exam trigger obvious: use .* when each sample must pair with the matching sample.",
    "standard": "Use the demo and Fig. B.14 to connect MATLAB syntax h=f.*g with the waveform h(t)=f(t)g(t).",
    "top_score": "Use visuals to stress the trap: same-looking vectors may fail if one is a row vector and the other is a column vector."
  },
  "blocks": [
    {
      "type": "text_explanation",
      "instruction": "Page 1 only. Write a compact overview with exactly two parts: (1) heading 'Section Objective' followed by one sentence: 'Learn when MATLAB needs element-by-element operations instead of ordinary matrix multiplication.' (2) heading 'Concepts In This Section' followed by only these concept names as bullets: 'standard matrix multiplication', 'element-by-element multiplication', 'matching dimensions', 'period operators', 'waveform comparison'. Do not add background paragraphs."
    },
    {
      "type": "text_explanation",
      "instruction": "Start Page 2 with heading '## 1. Why ordinary * is not the right tool here'. Explain that MATLAB's * follows matrix algebra, not point-by-point pairing. Use 90-130 words. Include one minimal example: a 1×N row vector times an N×1 column vector is allowed and gives one scalar, but two 1×N row vectors cannot be multiplied using *. End with exam note: 'If the problem asks for matching entries or matching time samples, ordinary * is probably the wrong operator.'"
    },
    {
      "type": "math_block",
      "latex": "(1\\times N)(N\\times 1)\\rightarrow 1\\times 1",
      "explanation_instruction": "Explain in 3-5 bullets: this is the inner product case; N matching entries collapse into one scalar; use it when the goal is one accumulated value; exam trigger is 'dot product' or 'inner product'; common misuse is using * when the desired output should still be a vector."
    },
    {
      "type": "math_block",
      "latex": "(N\\times 1)(1\\times M)\\rightarrow N\\times M",
      "explanation_instruction": "Explain in 3-5 bullets: this is the outer product case; it creates a full matrix from a column vector and a row vector; use it when every row entry must pair with every column entry; exam trigger is a requested table/grid of all pairings; common misuse is expecting a same-sized vector result."
    },
    {
      "type": "text_explanation",
      "instruction": "Start Page 3 with heading '## 2. Element-by-element operations pair matching entries'. Explain that element-by-element operations keep the same shape as the input vectors because each output entry is made from the corresponding input entries. Use 100-150 words. Include the representative MATLAB example from the OCR: g = exp(-10*t); h = f.*g;. State that f and g must have the same dimensions. Include the trap: a row vector and a column vector with the same number of entries are still not the same dimensions."
    },
    {
      "type": "math_block",
      "latex": "h_k=f_k g_k,\\quad k=1,2,\\ldots,N",
      "explanation_instruction": "Explain in bullets: h_k is the kth output sample; f_k and g_k are the kth samples of the two input vectors; use this when each time sample should be scaled by the matching time sample; exam trigger is wording like 'element-by-element', 'pointwise', 'sample-by-sample', or MATLAB syntax using a period; common misuse is writing h=f*g, which asks MATLAB for matrix multiplication instead."
    },
    {
      "type": "interactive_demo",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Let students drag one slider and immediately see that .* preserves vector length while scaling each sample.",
        "standard": "Show f(t), g(t)=e^{-10t}, and h(t)=f(t)g(t) together so the syntax h=f.*g becomes visual.",
        "top_score": "Add a row-vs-column toggle to expose why equal entry count is not enough when dimensions differ."
      },
      "demo_spec": {
        "title": "Point-by-point multiplication demo",
        "rendering": "React + Canvas line plot with pure white background and three clearly labeled curves: f(t), g(t)=e^{-10t}, and h(t)=f(t)g(t).",
        "controls": [
          "Slider for decay rate in g(t)=e^{-at), labeled a",
          "Toggle: show matching row vectors vs mismatched row/column vectors",
          "Checkbox: highlight one sample index k and draw vertical guide lines from f_k and g_k to h_k"
        ],
        "student_task": "Ask students to move the decay slider and notice that h(t) changes sample-by-sample, not by one global matrix product.",
        "implementation_note": "Correct the displayed formula to g(t)=e^{-at}; do not include the typo e^{-at) in the final rendered demo."
      }
    },
    {
      "type": "book_image",
      "source_page": "page-049",
      "fig_id": "Fig. B.14",
      "caption_instruction": "One sentence: 'Fig. B.14 compares the original sinusoid f(t) with the element-by-element product h(t)=f(t)g(t).' ",
      "description_instruction": "Describe the horizontal axis t from 0 to 0.2 and the vertical axis Amplitude. Point out that h(t) follows the same general oscillation pattern as f(t), but its amplitude is reduced by the exponential envelope. Tell students to connect the dotted curve h(t) to the MATLAB command h = f.*g, not h = f*g.",
      "teaching_role": "example_support",
      "mode_specific_visual_use": {
        "cram": "Use the dotted smaller-amplitude curve as the fast visual cue for element-by-element scaling.",
        "standard": "Use the figure as the representative result of multiplying f(t) and g(t) point by point.",
        "top_score": "Ask students to explain why the output remains a time vector rather than becoming a scalar or matrix."
      }
    },
    {
      "type": "text_explanation",
      "instruction": "Start Page 4 with heading '## 3. MATLAB period operators'. Explain the operator pattern in 80-120 words. State exactly: 'Use .*, ./, and .^ when multiplication, division, or powers must happen entry by entry.' Also state: 'Addition and subtraction are already element-by-element in MATLAB, so they do not use a period.' Include one quick check example: if f and g are same-sized row vectors, h=f.*g is valid; h=f*g is not valid for two row vectors."
    },
    {
      "type": "section_summary",
      "instruction": "Create the recap page titled '📌 Key Takeaways'. Include exactly 4 bullets, each ≤24 words, and include these core formulas or syntax explicitly: '(1×N)(N×1)→1×1', '(N×1)(1×M)→N×M', 'h_k=f_k g_k', and 'h = f.*g'. End with one sentence: 'Next, matrix operations use MATLAB commands to build and manipulate vectors and matrices.'"
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
          "id": "standard_vs_elementwise_multiplication",
          "label": "Ordinary * versus element-by-element .*",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "In MATLAB, f and g are both 1×N row vectors, and you want h to contain h_k = f_k g_k. Which command is correct?",
              "options": [
                "A. h = f*g",
                "B. h = f.*g",
                "C. h = f/g",
                "D. h = f^g"
              ],
              "correct_option": "B",
              "explanation": "Element-by-element multiplication uses .*, so each entry of f is multiplied by the matching entry of g.",
              "wrong_option_explanations": {
                "A": "This asks for matrix multiplication, and two row vectors are not conformable for *.",
                "C": "This is matrix right division, not point-by-point multiplication.",
                "D": "This is not the MATLAB syntax for multiplying matching vector entries."
              },
              "hint": "Look for the period before the multiplication symbol.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "Which wording is the strongest trigger for using .* instead of *?",
              "options": [
                "A. Compute one scalar inner product",
                "B. Multiply every sample by the matching sample of another vector",
                "C. Create an N×M table of all pairings",
                "D. Transpose a row vector into a column vector"
              ],
              "correct_option": "B",
              "explanation": "Matching-sample multiplication is exactly element-by-element multiplication.",
              "wrong_option_explanations": {
                "A": "A scalar inner product uses ordinary matrix multiplication with conformable dimensions.",
                "C": "A table of all pairings describes an outer product, not element-by-element multiplication.",
                "D": "Transposition changes vector orientation; it does not multiply entries."
              },
              "hint": "Ask whether the output should stay the same size as the input vectors.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "dimension_conformability",
          "label": "Dimension rules for vector multiplication",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "What is the result size of ordinary matrix multiplication (1×N)(N×1)?",
              "options": [
                "A. 1×1",
                "B. 1×N",
                "C. N×1",
                "D. N×N"
              ],
              "correct_option": "A",
              "explanation": "A row vector times a conformable column vector gives the inner product, which is one scalar.",
              "wrong_option_explanations": {
                "B": "That would be the original row-vector size, not the result of an inner product.",
                "C": "That would be a column vector, but the inner dimensions collapse to one scalar.",
                "D": "N×N would come from multiplying an N×1 column vector by a 1×N row vector."
              },
              "hint": "Outer dimensions give the result size.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "waveform_interpretation",
          "label": "Visual meaning of h(t)=f(t)g(t)",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "Observe Fig. B.14 or the demo: h(t) is produced from f(t) using g(t)=e^{-10t}. What should happen to the amplitude of h(t) as t increases?",
              "options": [
                "A. It generally shrinks because the exponential factor decreases",
                "B. It becomes a constant scalar",
                "C. It becomes an N×N matrix",
                "D. It must have larger peaks than f(t)"
              ],
              "correct_option": "A",
              "explanation": "The exponential envelope decreases with t, so multiplying point by point reduces the sinusoid's amplitude over time.",
              "wrong_option_explanations": {
                "B": "Element-by-element multiplication keeps a vector of time samples, not one scalar.",
                "C": "An N×N matrix would come from an outer product, not point-by-point multiplication.",
                "D": "A decaying exponential factor does not force larger peaks."
              },
              "hint": "Focus on what e^{-10t} does as t grows.",
              "needs_visual": true,
              "visual_type": "book_figure_or_demo_observation",
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "period_operator_syntax",
          "label": "MATLAB period operators",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp4_q1",
              "type": "short_answer",
              "stem": "A student writes y = x^2 to square every entry of vector x. Write the corrected MATLAB command and explain the mistake.",
              "ideal_answer": "The corrected command is y = x.^2. The period tells MATLAB to square each entry separately; x^2 asks for matrix power, which is not element-by-element vector squaring.",
              "grading_rubric": [
                "Must write y = x.^2",
                "Must identify .^ as element-by-element exponentiation",
                "Must distinguish element-by-element power from matrix power"
              ],
              "explanation": "This checks whether the student can transfer the period-operator rule beyond multiplication.",
              "hint": "Multiplication uses .*, division uses ./, and powers use .^.",
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
