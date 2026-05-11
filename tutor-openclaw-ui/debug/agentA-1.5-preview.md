# Agent A Preview: 1.5 1.5 Even and Odd Functions

- Difficulty: beginner
- Estimated read minutes: 5

## Learning Objectives

- Recognize an even function from its vertical-axis symmetry.
- Recognize an odd function from its antisymmetry about the vertical axis.
- Use the formulas x_e(t)=x_e(-t) and x_o(t)=-x_o(-t) to test signals.

## Visualization Need

```json
{
  "level": "static",
  "reason": [
    "pattern_recognition_benefits_from_figure",
    "classification_benefits_from_figure",
    "wrong_vs_right_contrast_is_high_value"
  ],
  "recommended_assets": [
    "textbook_figure",
    "latex_native_visual"
  ]
}
```

## Visual Plan

```json
{
  "primary_anchor": "both",
  "rationale": "The section is definition-first, so the core symmetry conditions must be taught with standalone LaTeX formulas. The textbook already provides the canonical time-domain symmetry diagrams for even and odd signals, so those figures should be used instead of generated images.",
  "cram": "Use the visuals to recognize mirror symmetry or sign-flipped mirror symmetry quickly.",
  "standard": "Use one formula and one matching textbook panel for each concept, followed by one representative example.",
  "top_score": "Use the visuals to separate true odd symmetry from merely crossing the origin or looking visually balanced."
}
```

## Planned Blocks

### Block 1: `text_explanation`
- **instruction**: Create a minimal first page only. Include the heading 'Section Objective' followed by one short sentence: 'Learn how to identify even and odd functions from symmetry and from formulas.' Then include the heading 'Concepts In This Section' followed by exactly three bullets with concept names only: 'Even function', 'Odd function', 'Formula test for symmetry'. Do not add background paragraphs or examples on this page.

### Block 2: `text_explanation`
- **instruction**: Start a new concept page with the heading '## 1. Even function: mirror symmetry'. In 60–90 words, explain that an even function has the same value at matching times t and -t. Use the phrase 'fold the graph along the vertical axis' to describe the visual test. Avoid discussing odd functions here except for one sentence saying that the next page handles the sign-flipped case.

### Block 3: `math_block`
- **latex**: x_e(t)=x_e(-t)
- **explanation_instruction**: Explain in 90–130 words. State that this is the even-function condition from equation (1.15). Define x_e(t) as the value of the even signal at time t and x_e(-t) as the value at the mirrored time. Include the representative example x_e(t)=t^2 because x_e(-t)=(-t)^2=t^2. State the exam trigger: if a graph or formula gives equal values at t and -t, test for even symmetry. State the common misuse: checking only one pair of points is not enough unless the problem only asks for a visual guess.

### Block 4: `book_image`
- **source_page**: page-092
- **fig_id**: Fig. 1.23a
- **caption_instruction**: One sentence: this panel shows an even signal whose values match at mirrored times t=-a and t=a.
- **description_instruction**: Describe the horizontal t-axis and the vertical axis at t=0. Point out that the left and right sides of x_e(t) match like a mirror image. Tell students to notice that the dashed guides at -a and a land at the same height, which visually confirms x_e(t)=x_e(-t).
- **teaching_role**: concept_anchor
- **mode_specific_visual_use**:
```json
{
  "cram": "Use the equal-height mirrored points as the instant recognition cue.",
  "standard": "Connect the formula x_e(t)=x_e(-t) directly to the matching graph heights.",
  "top_score": "Emphasize that the symmetry must hold for every mirrored pair, not just the marked pair."
}
```

### Block 5: `text_explanation`
- **instruction**: Start a new concept page with the heading '## 2. Odd function: sign-flipped mirror symmetry'. In 70–100 words, explain that an odd function does not simply mirror across the vertical axis; it mirrors and flips sign. Say that the value at t is the negative of the value at -t. Include a quick note that many students wrongly call any graph crossing the origin odd, but crossing the origin alone is not enough.

### Block 6: `math_block`
- **latex**: x_o(t)=-x_o(-t)
- **explanation_instruction**: Explain in 90–130 words. State that this is the odd-function condition from equation (1.15). Define x_o(t) as the value of the odd signal at time t and x_o(-t) as the value at the mirrored time. Include the representative example x_o(t)=t^3 because x_o(-t)=(-t)^3=-t^3, so -x_o(-t)=t^3. State the exam trigger: if mirrored points have equal magnitude but opposite sign, test for odd symmetry. State the common misuse: odd symmetry is not the same as ordinary mirror symmetry.

### Block 7: `book_image`
- **source_page**: page-092
- **fig_id**: Fig. 1.23b
- **caption_instruction**: One sentence: this panel shows an odd signal whose mirrored values have equal magnitude and opposite sign.
- **description_instruction**: Describe the t-axis, the vertical axis at t=0, and the values at t=-a and t=a. Point out that one marked value is above the axis while the mirrored value is below the axis by the same amount. Tell students to read this as x_o(t)=-x_o(-t), not as ordinary mirror symmetry.
- **teaching_role**: concept_anchor
- **mode_specific_visual_use**:
```json
{
  "cram": "Use opposite-side equal-magnitude points as the instant recognition cue.",
  "standard": "Connect the formula x_o(t)=-x_o(-t) to the sign-flipped graph heights.",
  "top_score": "Emphasize that origin crossing alone does not prove odd symmetry."
}
```

### Block 8: `text_explanation`
- **instruction**: Start a new concept page with the heading '## 3. Quick formula test'. In 100–140 words, teach a three-step exam method: replace t with -t, simplify, compare with the original function. If the result equals the original, it is even; if the result equals the negative of the original, it is odd; otherwise it is neither. Include one short worked example: for x(t)=t^2+1, x(-t)=t^2+1, so it is even. Include one near-miss: x(t)=t+1 gives x(-t)=-t+1, which is neither x(t) nor -x(t).

### Block 9: `section_summary`
- **instruction**: Create a recap page titled '📌 Key Takeaways'. Include exactly three bullets, each no more than 22 words. The bullets must explicitly include these formulas: x_e(t)=x_e(-t), x_o(t)=-x_o(-t), and the test x(-t)=x(t) for even / x(-t)=-x(t) for odd. End with one sentence: 'Next, use these symmetry tests whenever signal shape affects simplification or classification.'

### Block 10: `quiz_plan`
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
    "id": "even_function_definition",
    "label": "Even function symmetry",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "even_q1",
        "type": "multiple_choice",
        "stem": "Which condition defines an even function x_e(t)?",
        "options": [
          "A. x_e(t)=x_e(-t)",
          "B. x_e(t)=-x_e(-t)",
          "C. x_e(-t)=-x_e(t)+1",
          "D. x_e(t)=0 for all t"
        ],
        "correct_option": "A",
        "explanation": "An even function has the same value at mirrored times t and -t.",
        "wrong_option_explanations": {
          "B": "This is the odd-function condition, not the even-function condition.",
          "C": "Adding 1 is not part of the symmetry definition.",
          "D": "The zero function is even, but even functions do not have to be zero everywhere."
        },
        "hint": "Even means the graph matches after reflecting across the vertical axis.",
        "needs_visual": false,
        "same_point_variant": false
      },
      {
        "id": "even_q2_visual",
        "type": "multiple_choice",
        "stem": "In a graph, the points at t=-a and t=a have the same height for every a. What classification does this support?",
        "options": [
          "A. Even",
          "B. Odd",
          "C. Neither",
          "D. Periodic only"
        ],
        "correct_option": "A",
        "explanation": "Equal heights at mirrored times show x(t)=x(-t), which is the even-function test.",
        "wrong_option_explanations": {
          "B": "Odd symmetry requires opposite signs at mirrored times.",
          "C": "If the condition holds for every mirrored pair, the function is not neither.",
          "D": "Periodicity is about repeating after a shift, not mirror symmetry."
        },
        "hint": "Ask whether the left and right sides are mirror images.",
        "needs_visual": true,
        "visual_type": "book_figure_panel_even",
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "odd_function_definition",
    "label": "Odd function antisymmetry",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "odd_q1",
        "type": "multiple_choice",
        "stem": "Which condition defines an odd function x_o(t)?",
        "options": [
          "A. x_o(t)=x_o(-t)",
          "B. x_o(t)=-x_o(-t)",
          "C. x_o(t)=x_o(t-1)",
          "D. x_o(t)=|x_o(-t)|"
        ],
        "correct_option": "B",
        "explanation": "An odd function has values at mirrored times that are equal in magnitude and opposite in sign.",
        "wrong_option_explanations": {
          "A": "This is even symmetry.",
          "C": "This describes a shift relationship, not odd symmetry.",
          "D": "Absolute value removes sign information, but odd symmetry depends on sign reversal."
        },
        "hint": "Odd means mirrored values flip sign.",
        "needs_visual": false,
        "same_point_variant": false
      },
      {
        "id": "odd_q2_trap",
        "type": "multiple_choice",
        "stem": "A graph crosses the origin. A student immediately says it must be odd. Why is this reasoning wrong?",
        "options": [
          "A. Odd functions never cross the origin.",
          "B. Crossing the origin is not enough; every mirrored pair must have opposite values.",
          "C. Crossing the origin proves the function is even.",
          "D. Odd functions must always be straight lines."
        ],
        "correct_option": "B",
        "explanation": "Odd symmetry requires x(t)=-x(-t) for all t, not just one point at the origin.",
        "wrong_option_explanations": {
          "A": "Many odd functions do cross the origin.",
          "C": "Even symmetry is about equal mirrored values, not simply crossing the origin.",
          "D": "Functions like t^3 are odd but not straight lines."
        },
        "hint": "One point cannot prove a condition that must hold for every t.",
        "needs_visual": true,
        "visual_type": "wrong_vs_right_visual_check",
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "formula_test",
    "label": "Testing a formula by substituting -t",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "test_q1",
        "type": "multiple_choice",
        "stem": "Classify x(t)=t^2+3.",
        "options": [
          "A. Even",
          "B. Odd",
          "C. Neither",
          "D. Cannot be classified without a graph"
        ],
        "correct_option": "A",
        "explanation": "x(-t)=(-t)^2+3=t^2+3=x(t), so the function is even.",
        "wrong_option_explanations": {
          "B": "Odd would require x(-t)=-x(t), which is not true here.",
          "C": "The even condition is satisfied exactly.",
          "D": "A graph is helpful, but the formula test is enough."
        },
        "hint": "Replace t with -t and simplify.",
        "needs_visual": false,
        "same_point_variant": false
      },
      {
        "id": "test_q2",
        "type": "short_answer",
        "stem": "Classify x(t)=t+1 as even, odd, or neither. Show the substitution step.",
        "ideal_answer": "x(-t)=-t+1. This is not equal to x(t)=t+1 and not equal to -x(t)=-t-1, so x(t)=t+1 is neither even nor odd.",
        "grading_rubric": [
          "Must compute x(-t)=-t+1",
          "Must compare against x(t)",
          "Must compare against -x(t)",
          "Must conclude neither"
        ],
        "explanation": "This checks whether the student uses the full formula test rather than guessing from appearance.",
        "hint": "For odd, compare x(-t) to -x(t), not just to a negative-looking expression.",
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
  "section_id": "1.5",
  "section_title": "1.5 Even and Odd Functions",
  "difficulty": "beginner",
  "estimated_read_minutes": 5,
  "learning_objectives": [
    "Recognize an even function from its vertical-axis symmetry.",
    "Recognize an odd function from its antisymmetry about the vertical axis.",
    "Use the formulas x_e(t)=x_e(-t) and x_o(t)=-x_o(-t) to test signals."
  ],
  "visualization_need": {
    "level": "static",
    "reason": [
      "pattern_recognition_benefits_from_figure",
      "classification_benefits_from_figure",
      "wrong_vs_right_contrast_is_high_value"
    ],
    "recommended_assets": [
      "textbook_figure",
      "latex_native_visual"
    ]
  },
  "visual_plan": {
    "primary_anchor": "both",
    "rationale": "The section is definition-first, so the core symmetry conditions must be taught with standalone LaTeX formulas. The textbook already provides the canonical time-domain symmetry diagrams for even and odd signals, so those figures should be used instead of generated images.",
    "cram": "Use the visuals to recognize mirror symmetry or sign-flipped mirror symmetry quickly.",
    "standard": "Use one formula and one matching textbook panel for each concept, followed by one representative example.",
    "top_score": "Use the visuals to separate true odd symmetry from merely crossing the origin or looking visually balanced."
  },
  "blocks": [
    {
      "type": "text_explanation",
      "instruction": "Create a minimal first page only. Include the heading 'Section Objective' followed by one short sentence: 'Learn how to identify even and odd functions from symmetry and from formulas.' Then include the heading 'Concepts In This Section' followed by exactly three bullets with concept names only: 'Even function', 'Odd function', 'Formula test for symmetry'. Do not add background paragraphs or examples on this page."
    },
    {
      "type": "text_explanation",
      "instruction": "Start a new concept page with the heading '## 1. Even function: mirror symmetry'. In 60–90 words, explain that an even function has the same value at matching times t and -t. Use the phrase 'fold the graph along the vertical axis' to describe the visual test. Avoid discussing odd functions here except for one sentence saying that the next page handles the sign-flipped case."
    },
    {
      "type": "math_block",
      "latex": "x_e(t)=x_e(-t)",
      "explanation_instruction": "Explain in 90–130 words. State that this is the even-function condition from equation (1.15). Define x_e(t) as the value of the even signal at time t and x_e(-t) as the value at the mirrored time. Include the representative example x_e(t)=t^2 because x_e(-t)=(-t)^2=t^2. State the exam trigger: if a graph or formula gives equal values at t and -t, test for even symmetry. State the common misuse: checking only one pair of points is not enough unless the problem only asks for a visual guess."
    },
    {
      "type": "book_image",
      "source_page": "page-092",
      "fig_id": "Fig. 1.23a",
      "caption_instruction": "One sentence: this panel shows an even signal whose values match at mirrored times t=-a and t=a.",
      "description_instruction": "Describe the horizontal t-axis and the vertical axis at t=0. Point out that the left and right sides of x_e(t) match like a mirror image. Tell students to notice that the dashed guides at -a and a land at the same height, which visually confirms x_e(t)=x_e(-t).",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the equal-height mirrored points as the instant recognition cue.",
        "standard": "Connect the formula x_e(t)=x_e(-t) directly to the matching graph heights.",
        "top_score": "Emphasize that the symmetry must hold for every mirrored pair, not just the marked pair."
      }
    },
    {
      "type": "text_explanation",
      "instruction": "Start a new concept page with the heading '## 2. Odd function: sign-flipped mirror symmetry'. In 70–100 words, explain that an odd function does not simply mirror across the vertical axis; it mirrors and flips sign. Say that the value at t is the negative of the value at -t. Include a quick note that many students wrongly call any graph crossing the origin odd, but crossing the origin alone is not enough."
    },
    {
      "type": "math_block",
      "latex": "x_o(t)=-x_o(-t)",
      "explanation_instruction": "Explain in 90–130 words. State that this is the odd-function condition from equation (1.15). Define x_o(t) as the value of the odd signal at time t and x_o(-t) as the value at the mirrored time. Include the representative example x_o(t)=t^3 because x_o(-t)=(-t)^3=-t^3, so -x_o(-t)=t^3. State the exam trigger: if mirrored points have equal magnitude but opposite sign, test for odd symmetry. State the common misuse: odd symmetry is not the same as ordinary mirror symmetry."
    },
    {
      "type": "book_image",
      "source_page": "page-092",
      "fig_id": "Fig. 1.23b",
      "caption_instruction": "One sentence: this panel shows an odd signal whose mirrored values have equal magnitude and opposite sign.",
      "description_instruction": "Describe the t-axis, the vertical axis at t=0, and the values at t=-a and t=a. Point out that one marked value is above the axis while the mirrored value is below the axis by the same amount. Tell students to read this as x_o(t)=-x_o(-t), not as ordinary mirror symmetry.",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use opposite-side equal-magnitude points as the instant recognition cue.",
        "standard": "Connect the formula x_o(t)=-x_o(-t) to the sign-flipped graph heights.",
        "top_score": "Emphasize that origin crossing alone does not prove odd symmetry."
      }
    },
    {
      "type": "text_explanation",
      "instruction": "Start a new concept page with the heading '## 3. Quick formula test'. In 100–140 words, teach a three-step exam method: replace t with -t, simplify, compare with the original function. If the result equals the original, it is even; if the result equals the negative of the original, it is odd; otherwise it is neither. Include one short worked example: for x(t)=t^2+1, x(-t)=t^2+1, so it is even. Include one near-miss: x(t)=t+1 gives x(-t)=-t+1, which is neither x(t) nor -x(t)."
    },
    {
      "type": "section_summary",
      "instruction": "Create a recap page titled '📌 Key Takeaways'. Include exactly three bullets, each no more than 22 words. The bullets must explicitly include these formulas: x_e(t)=x_e(-t), x_o(t)=-x_o(-t), and the test x(-t)=x(t) for even / x(-t)=-x(t) for odd. End with one sentence: 'Next, use these symmetry tests whenever signal shape affects simplification or classification.'"
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
          "id": "even_function_definition",
          "label": "Even function symmetry",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "even_q1",
              "type": "multiple_choice",
              "stem": "Which condition defines an even function x_e(t)?",
              "options": [
                "A. x_e(t)=x_e(-t)",
                "B. x_e(t)=-x_e(-t)",
                "C. x_e(-t)=-x_e(t)+1",
                "D. x_e(t)=0 for all t"
              ],
              "correct_option": "A",
              "explanation": "An even function has the same value at mirrored times t and -t.",
              "wrong_option_explanations": {
                "B": "This is the odd-function condition, not the even-function condition.",
                "C": "Adding 1 is not part of the symmetry definition.",
                "D": "The zero function is even, but even functions do not have to be zero everywhere."
              },
              "hint": "Even means the graph matches after reflecting across the vertical axis.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "even_q2_visual",
              "type": "multiple_choice",
              "stem": "In a graph, the points at t=-a and t=a have the same height for every a. What classification does this support?",
              "options": [
                "A. Even",
                "B. Odd",
                "C. Neither",
                "D. Periodic only"
              ],
              "correct_option": "A",
              "explanation": "Equal heights at mirrored times show x(t)=x(-t), which is the even-function test.",
              "wrong_option_explanations": {
                "B": "Odd symmetry requires opposite signs at mirrored times.",
                "C": "If the condition holds for every mirrored pair, the function is not neither.",
                "D": "Periodicity is about repeating after a shift, not mirror symmetry."
              },
              "hint": "Ask whether the left and right sides are mirror images.",
              "needs_visual": true,
              "visual_type": "book_figure_panel_even",
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "odd_function_definition",
          "label": "Odd function antisymmetry",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "odd_q1",
              "type": "multiple_choice",
              "stem": "Which condition defines an odd function x_o(t)?",
              "options": [
                "A. x_o(t)=x_o(-t)",
                "B. x_o(t)=-x_o(-t)",
                "C. x_o(t)=x_o(t-1)",
                "D. x_o(t)=|x_o(-t)|"
              ],
              "correct_option": "B",
              "explanation": "An odd function has values at mirrored times that are equal in magnitude and opposite in sign.",
              "wrong_option_explanations": {
                "A": "This is even symmetry.",
                "C": "This describes a shift relationship, not odd symmetry.",
                "D": "Absolute value removes sign information, but odd symmetry depends on sign reversal."
              },
              "hint": "Odd means mirrored values flip sign.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "odd_q2_trap",
              "type": "multiple_choice",
              "stem": "A graph crosses the origin. A student immediately says it must be odd. Why is this reasoning wrong?",
              "options": [
                "A. Odd functions never cross the origin.",
                "B. Crossing the origin is not enough; every mirrored pair must have opposite values.",
                "C. Crossing the origin proves the function is even.",
                "D. Odd functions must always be straight lines."
              ],
              "correct_option": "B",
              "explanation": "Odd symmetry requires x(t)=-x(-t) for all t, not just one point at the origin.",
              "wrong_option_explanations": {
                "A": "Many odd functions do cross the origin.",
                "C": "Even symmetry is about equal mirrored values, not simply crossing the origin.",
                "D": "Functions like t^3 are odd but not straight lines."
              },
              "hint": "One point cannot prove a condition that must hold for every t.",
              "needs_visual": true,
              "visual_type": "wrong_vs_right_visual_check",
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "formula_test",
          "label": "Testing a formula by substituting -t",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "test_q1",
              "type": "multiple_choice",
              "stem": "Classify x(t)=t^2+3.",
              "options": [
                "A. Even",
                "B. Odd",
                "C. Neither",
                "D. Cannot be classified without a graph"
              ],
              "correct_option": "A",
              "explanation": "x(-t)=(-t)^2+3=t^2+3=x(t), so the function is even.",
              "wrong_option_explanations": {
                "B": "Odd would require x(-t)=-x(t), which is not true here.",
                "C": "The even condition is satisfied exactly.",
                "D": "A graph is helpful, but the formula test is enough."
              },
              "hint": "Replace t with -t and simplify.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "test_q2",
              "type": "short_answer",
              "stem": "Classify x(t)=t+1 as even, odd, or neither. Show the substitution step.",
              "ideal_answer": "x(-t)=-t+1. This is not equal to x(t)=t+1 and not equal to -x(t)=-t-1, so x(t)=t+1 is neither even nor odd.",
              "grading_rubric": [
                "Must compute x(-t)=-t+1",
                "Must compare against x(t)",
                "Must compare against -x(t)",
                "Must conclude neither"
              ],
              "explanation": "This checks whether the student uses the full formula test rather than guessing from appearance.",
              "hint": "For odd, compare x(-t) to -x(t), not just to a negative-looking expression.",
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
