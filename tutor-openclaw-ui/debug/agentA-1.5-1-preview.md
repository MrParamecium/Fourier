# Agent A Preview: 1.5-1 Some Properties of Even and Odd Functions

- Difficulty: beginner
- Estimated read minutes: 6

## Learning Objectives

- Recognize even and odd symmetry from formulas and plots.
- Use parity rules to predict whether a product of functions is even or odd.
- Use symmetric-interval integral shortcuts for even and odd functions.
- Avoid the common mistake of applying the integral shortcuts when the interval is not symmetric or when an impulse is at the origin.

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
    "latex_native_formula"
  ]
}
```

## Visual Plan

```json
{
  "primary_anchor": "both",
  "rationale": "Use the available textbook figure on page-092 as the main visual anchor because it directly shows the even component symmetric about the vertical axis and the odd component antisymmetric about the vertical axis. Use LaTeX-native formula blocks for the product and integral properties because the exact symbolic conditions are the exam-facing content. Do not use GPTImage2 because the textbook already supplies the canonical visual and the remaining ideas are best shown symbolically.",
  "cram": "Use the figure to recognize mirror symmetry quickly, then memorize the product and integral shortcuts.",
  "standard": "Use the figure to connect symmetry with formulas, then work one representative product example and one integral shortcut example.",
  "top_score": "Use the figure and formulas to catch edge conditions: symmetric limits, sign cancellation, and the no-impulse-at-origin assumption."
}
```

## Planned Blocks

### Block 1: `text_explanation`
- **page_group**: page_1_overview
- **instruction**: Render only a compact overview page. Include exactly two short sections: 'Section Objective' and 'Concepts In This Section'. Under 'Section Objective', write one sentence: 'Use even/odd symmetry to predict products and simplify integrals over symmetric intervals.' Under 'Concepts In This Section', list only these concept names as bullets: 'even symmetry', 'odd symmetry', 'product parity rules', 'symmetric-interval integrals', 'origin impulse exception'. Do not add any extra background paragraph.

### Block 2: `math_block`
- **page_group**: page_2_even_symmetry
- **latex**: x_e(t)=x_e(-t)
- **explanation_instruction**: Begin with the heading '## 1. Even symmetry'. Explain in 80–120 words that an even function gives the same value at mirrored times \(t\) and \(-t\). Define \(x_e(t)\) as an even signal/function and state that the vertical axis \(t=0\) acts like a mirror. Include one minimal example: \(\cos t\) is even because \(\cos(-t)=\cos t\). Include the exam trigger: if the graph has left-right mirror symmetry or the formula is unchanged after replacing \(t\) by \(-t\), use the even-function shortcut. Include the common misuse: do not call a function even just because it is positive.

### Block 3: `math_block`
- **page_group**: page_3_odd_symmetry
- **latex**: x_o(t)=-x_o(-t)
- **explanation_instruction**: Begin with the heading '## 2. Odd symmetry'. Explain in 80–120 words that an odd function has equal magnitude but opposite sign at mirrored times. Define \(x_o(t)\) as an odd signal/function. Say that reflecting across the vertical axis and then flipping vertically gives the same curve. Include one minimal example: \(t^3\) is odd because \((-t)^3=-t^3\). Include the exam trigger: if substituting \(-t\) produces the negative of the original expression, use odd-function properties. Include the common misuse: odd symmetry is not the same as being visually irregular or having an odd-looking shape.

### Block 4: `book_image`
- **page_group**: page_4_symmetry_visual_anchor
- **source_page**: page-092
- **fig_id**: unknown
- **teaching_role**: comparison_anchor
- **mode_specific_visual_use**:
```json
{
  "cram": "Use the side-by-side plots to memorize mirror symmetry versus sign-flipped mirror symmetry.",
  "standard": "Use the plots to connect the formulas \\(x_e(t)=x_e(-t)\\) and \\(x_o(t)=-x_o(-t)\\) to what the graph looks like.",
  "top_score": "Use the marked points at \\(-a\\) and \\(a\\) to prepare for integral cancellation and doubling arguments."
}
```
- **caption_instruction**: One sentence: this figure compares an even signal with mirror symmetry and an odd signal with opposite-sign mirror symmetry.
- **description_instruction**: Describe the two panels in 2–3 sentences. Panel (a) shows \(x_e(t)\) with matching values at \(-a\) and \(a\), so the left and right sides mirror each other. Panel (b) shows \(x_o(t)\) with equal magnitude and opposite sign at mirrored times, which explains why odd parts cancel over symmetric intervals.

### Block 5: `math_block`
- **page_group**: page_5_product_parity_rules
- **latex**: p(fg)=p(f)p(g),\qquad p(\text{even})=+1,\quad p(\text{odd})=-1
- **explanation_instruction**: Begin with the heading '## 3. Product parity rules'. Explain in 120–160 words that this compact parity formula encodes the textbook rules: even times odd is odd, odd times odd is even, and even times even is even. Define \(p(f)\) as a parity label, not a function value. Explain that multiplying signs works because replacing \(t\) by \(-t\) either keeps a factor unchanged or adds a minus sign. Include one representative worked example: \(\cos t\) is even and \(t\) is odd, so \(t\cos t\) is odd; verify briefly by substituting \(-t\). Include the exam note: when asked for the parity of a product, classify each factor first, then multiply the parity labels. Include the common misuse: do not expand or integrate before checking parity.

### Block 6: `math_block`
- **page_group**: page_6_even_integral_rule
- **latex**: \int_{-a}^{a}x_e(t)\,dt=2\int_{0}^{a}x_e(t)\,dt\qquad \text{(1.16)}
- **explanation_instruction**: Begin with the heading '## 4. Integrals over symmetric intervals: even functions'. Explain in 100–140 words that the area from \(-a\) to \(0\) equals the area from \(0\) to \(a\) for an even function, so the full integral is twice the right-half integral. Define \(a\) as a positive endpoint and \(x_e(t)\) as an even function. Include one minimal example: \(\int_{-2}^{2}\cos t\,dt=2\int_0^2\cos t\,dt\). Include the exam trigger: symmetric limits \([-a,a]\) plus an even integrand. Include the common misuse: this shortcut does not apply to nonsymmetric limits such as \([0,a]\) or \([-a,b]\) when \(a\ne b\).

### Block 7: `math_block`
- **page_group**: page_7_odd_integral_rule
- **latex**: \int_{-a}^{a}x_o(t)\,dt=0\qquad \text{(1.16)}
- **explanation_instruction**: Begin with the heading '## 5. Integrals over symmetric intervals: odd functions'. Explain in 100–140 words that an odd function has equal and opposite signed area on the left and right of the origin, so the areas cancel. Define \(x_o(t)\) as an odd function and \([-a,a]\) as a symmetric interval. Include one minimal example: \(\int_{-3}^{3}t^3\,dt=0\). Include the exam trigger: symmetric limits plus an odd integrand means the answer is immediately zero. Include the textbook exception clearly: these results assume there is no impulse or derivative of an impulse at the origin. Include the common misuse: do not set an integral to zero just because the integrand contains an odd factor if another factor changes the overall parity.

### Block 8: `section_summary`
- **page_group**: page_8_recap
- **instruction**: Create a recap page titled '📌 Key Takeaways'. Include 5 concise bullets, each no more than 22 words. The bullets must explicitly include these formulas: \(x_e(t)=x_e(-t)\), \(x_o(t)=-x_o(-t)\), \(\text{even}\times\text{odd}=\text{odd}\), \(\text{odd}\times\text{odd}=\text{even}\), \(\text{even}\times\text{even}=\text{even}\), \(\int_{-a}^{a}x_e(t)dt=2\int_0^a x_e(t)dt\), and \(\int_{-a}^{a}x_o(t)dt=0\). Also include the condition: symmetric limits and no impulse at the origin. End with one bridge sentence: 'Next, these symmetry shortcuts will help simplify signal calculations before doing heavier algebra.'

### Block 9: `quiz_plan`
- **page_group**: page_9_quiz
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
    "id": "even_odd_recognition",
    "label": "Recognizing even and odd symmetry",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp1_q1",
        "type": "multiple_choice",
        "stem": "A function satisfies \\(x(-t)=x(t)\\) for every \\(t\\). What can you conclude?",
        "options": [
          "A. The function is even.",
          "B. The function is odd.",
          "C. The function must be positive.",
          "D. The function must be zero at the origin."
        ],
        "correct_option": "A",
        "explanation": "The condition \\(x(-t)=x(t)\\) is exactly even symmetry: mirrored time values have the same function value.",
        "wrong_option_explanations": {
          "B": "Odd symmetry requires \\(x(-t)=-x(t)\\), not the same value.",
          "C": "Even functions may be positive, negative, or change sign.",
          "D": "Odd functions must satisfy \\(x(0)=0\\) if ordinary and finite; even functions do not have to."
        },
        "hint": "Ask whether replacing \\(t\\) by \\(-t\\) changes the value.",
        "needs_visual": false,
        "same_point_variant": true
      },
      {
        "id": "kp1_q2",
        "type": "multiple_choice",
        "stem": "In a graph, the point at \\(t=a\\) has value 5 and the point at \\(t=-a\\) has value -5. Which symmetry does this match?",
        "options": [
          "A. Even symmetry",
          "B. Odd symmetry",
          "C. Neither even nor odd symmetry",
          "D. Both even and odd symmetry for any nonzero function"
        ],
        "correct_option": "B",
        "explanation": "Odd symmetry means mirrored points have equal magnitude and opposite sign.",
        "wrong_option_explanations": {
          "A": "Even symmetry would require the two values to be equal, not opposite.",
          "C": "The given pair is consistent with odd symmetry.",
          "D": "A nonzero function cannot generally be both even and odd."
        },
        "hint": "Compare the signs at \\(-a\\) and \\(a\\).",
        "needs_visual": true,
        "visual_type": "textbook_even_odd_symmetry_plot",
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "product_parity",
    "label": "Product parity rules",
    "importance": "high",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp2_q1",
        "type": "multiple_choice",
        "stem": "\\(f(t)\\) is odd and \\(g(t)\\) is odd. What is the parity of \\(f(t)g(t)\\)?",
        "options": [
          "A. Odd",
          "B. Even",
          "C. Neither even nor odd",
          "D. It depends on whether the functions are positive"
        ],
        "correct_option": "B",
        "explanation": "Odd times odd is even because the two sign changes cancel.",
        "wrong_option_explanations": {
          "A": "One odd factor gives a sign change; two odd factors give two sign changes, which cancel.",
          "C": "The product of two odd functions has a definite parity: even.",
          "D": "Parity is about behavior under \\(t\\mapsto -t\\), not positivity."
        },
        "hint": "Use the sign-label idea: odd is like \\(-1\\), and \\((-1)(-1)=+1\\).",
        "needs_visual": false,
        "same_point_variant": false
      },
      {
        "id": "kp2_q2",
        "type": "multiple_choice",
        "stem": "Which product is guaranteed to be odd?",
        "options": [
          "A. even function × even function",
          "B. odd function × odd function",
          "C. even function × odd function",
          "D. even function × even function × odd function × odd function"
        ],
        "correct_option": "C",
        "explanation": "A product with exactly one odd-parity sign change is odd. Even times odd is odd.",
        "wrong_option_explanations": {
          "A": "Even times even remains even.",
          "B": "Odd times odd becomes even because the two sign changes cancel.",
          "D": "Two odd factors produce even parity overall."
        },
        "hint": "Count how many odd factors appear.",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "symmetric_interval_integrals",
    "label": "Integral shortcuts over symmetric intervals",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp3_q1",
        "type": "multiple_choice",
        "stem": "If \\(x(t)\\) is odd and has no impulse at the origin, what is \\(\\int_{-4}^{4}x(t)\\,dt\\)?",
        "options": [
          "A. \\(0\\)",
          "B. \\(2\\int_0^4x(t)\\,dt\\)",
          "C. \\(\\int_0^4x(t)\\,dt\\)",
          "D. Cannot be simplified because the limits contain negative numbers"
        ],
        "correct_option": "A",
        "explanation": "An odd function has equal and opposite signed areas on symmetric limits, so the integral is zero.",
        "wrong_option_explanations": {
          "B": "That doubling rule is for even functions, not odd functions.",
          "C": "The right-half integral is canceled by the left-half integral.",
          "D": "Negative limits are exactly what make the symmetry shortcut useful."
        },
        "hint": "Odd function plus symmetric interval means cancellation.",
        "needs_visual": true,
        "visual_type": "area_cancellation_on_odd_symmetry_plot",
        "same_point_variant": true
      },
      {
        "id": "kp3_q2",
        "type": "multiple_choice",
        "stem": "Which simplification is valid for an even function \\(x_e(t)\\)?",
        "options": [
          "A. \\(\\int_{-a}^{a}x_e(t)dt=0\\)",
          "B. \\(\\int_{-a}^{a}x_e(t)dt=2\\int_0^a x_e(t)dt\\)",
          "C. \\(\\int_{0}^{a}x_e(t)dt=0\\)",
          "D. \\(\\int_{-a}^{b}x_e(t)dt=2\\int_0^a x_e(t)dt\\) for any \\(b\\)"
        ],
        "correct_option": "B",
        "explanation": "For an even function, the left and right halves over \\([-a,a]\\) have equal area, so the full integral is twice the right half.",
        "wrong_option_explanations": {
          "A": "Zero over symmetric limits is the odd-function shortcut.",
          "C": "Even symmetry does not make the right-half area zero.",
          "D": "The interval must be symmetric: \\([-a,a]\\), not \\([-a,b]\\) with arbitrary \\(b\\)."
        },
        "hint": "Even functions double over symmetric intervals; odd functions cancel.",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "exception_and_exam_traps",
    "label": "Conditions and common traps",
    "importance": "medium",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp4_q1",
        "type": "short_answer",
        "stem": "A student says: 'The integrand is odd, so \\(\\int_{0}^{5}x_o(t)dt=0\\).' Explain precisely what is wrong.",
        "ideal_answer": "The zero shortcut for odd functions requires symmetric limits, such as \\([-5,5]\\). The interval \\([0,5]\\) only covers one side, so the cancellation between left and right sides is missing.",
        "grading_rubric": [
          "Must state that odd-function cancellation requires symmetric limits.",
          "Must identify \\([0,5]\\) as not symmetric about the origin.",
          "Must explain that the missing left side prevents cancellation."
        ],
        "explanation": "This checks whether the student knows the condition behind the shortcut, not just the shortcut result.",
        "hint": "Where is the negative-time interval that would cancel the positive-time area?",
        "needs_visual": true,
        "visual_type": "wrong_vs_right_symmetric_interval_comparison",
        "same_point_variant": false
      }
    ]
  }
]
```

## Raw JSON

```json
{
  "section_id": "1.5-1",
  "section_title": "Some Properties of Even and Odd Functions",
  "difficulty": "beginner",
  "estimated_read_minutes": 6,
  "learning_objectives": [
    "Recognize even and odd symmetry from formulas and plots.",
    "Use parity rules to predict whether a product of functions is even or odd.",
    "Use symmetric-interval integral shortcuts for even and odd functions.",
    "Avoid the common mistake of applying the integral shortcuts when the interval is not symmetric or when an impulse is at the origin."
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
      "latex_native_formula"
    ]
  },
  "visual_plan": {
    "primary_anchor": "both",
    "rationale": "Use the available textbook figure on page-092 as the main visual anchor because it directly shows the even component symmetric about the vertical axis and the odd component antisymmetric about the vertical axis. Use LaTeX-native formula blocks for the product and integral properties because the exact symbolic conditions are the exam-facing content. Do not use GPTImage2 because the textbook already supplies the canonical visual and the remaining ideas are best shown symbolically.",
    "cram": "Use the figure to recognize mirror symmetry quickly, then memorize the product and integral shortcuts.",
    "standard": "Use the figure to connect symmetry with formulas, then work one representative product example and one integral shortcut example.",
    "top_score": "Use the figure and formulas to catch edge conditions: symmetric limits, sign cancellation, and the no-impulse-at-origin assumption."
  },
  "blocks": [
    {
      "type": "text_explanation",
      "page_group": "page_1_overview",
      "instruction": "Render only a compact overview page. Include exactly two short sections: 'Section Objective' and 'Concepts In This Section'. Under 'Section Objective', write one sentence: 'Use even/odd symmetry to predict products and simplify integrals over symmetric intervals.' Under 'Concepts In This Section', list only these concept names as bullets: 'even symmetry', 'odd symmetry', 'product parity rules', 'symmetric-interval integrals', 'origin impulse exception'. Do not add any extra background paragraph."
    },
    {
      "type": "math_block",
      "page_group": "page_2_even_symmetry",
      "latex": "x_e(t)=x_e(-t)",
      "explanation_instruction": "Begin with the heading '## 1. Even symmetry'. Explain in 80–120 words that an even function gives the same value at mirrored times \\(t\\) and \\(-t\\). Define \\(x_e(t)\\) as an even signal/function and state that the vertical axis \\(t=0\\) acts like a mirror. Include one minimal example: \\(\\cos t\\) is even because \\(\\cos(-t)=\\cos t\\). Include the exam trigger: if the graph has left-right mirror symmetry or the formula is unchanged after replacing \\(t\\) by \\(-t\\), use the even-function shortcut. Include the common misuse: do not call a function even just because it is positive."
    },
    {
      "type": "math_block",
      "page_group": "page_3_odd_symmetry",
      "latex": "x_o(t)=-x_o(-t)",
      "explanation_instruction": "Begin with the heading '## 2. Odd symmetry'. Explain in 80–120 words that an odd function has equal magnitude but opposite sign at mirrored times. Define \\(x_o(t)\\) as an odd signal/function. Say that reflecting across the vertical axis and then flipping vertically gives the same curve. Include one minimal example: \\(t^3\\) is odd because \\((-t)^3=-t^3\\). Include the exam trigger: if substituting \\(-t\\) produces the negative of the original expression, use odd-function properties. Include the common misuse: odd symmetry is not the same as being visually irregular or having an odd-looking shape."
    },
    {
      "type": "book_image",
      "page_group": "page_4_symmetry_visual_anchor",
      "source_page": "page-092",
      "fig_id": "unknown",
      "teaching_role": "comparison_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the side-by-side plots to memorize mirror symmetry versus sign-flipped mirror symmetry.",
        "standard": "Use the plots to connect the formulas \\(x_e(t)=x_e(-t)\\) and \\(x_o(t)=-x_o(-t)\\) to what the graph looks like.",
        "top_score": "Use the marked points at \\(-a\\) and \\(a\\) to prepare for integral cancellation and doubling arguments."
      },
      "caption_instruction": "One sentence: this figure compares an even signal with mirror symmetry and an odd signal with opposite-sign mirror symmetry.",
      "description_instruction": "Describe the two panels in 2–3 sentences. Panel (a) shows \\(x_e(t)\\) with matching values at \\(-a\\) and \\(a\\), so the left and right sides mirror each other. Panel (b) shows \\(x_o(t)\\) with equal magnitude and opposite sign at mirrored times, which explains why odd parts cancel over symmetric intervals."
    },
    {
      "type": "math_block",
      "page_group": "page_5_product_parity_rules",
      "latex": "p(fg)=p(f)p(g),\\qquad p(\\text{even})=+1,\\quad p(\\text{odd})=-1",
      "explanation_instruction": "Begin with the heading '## 3. Product parity rules'. Explain in 120–160 words that this compact parity formula encodes the textbook rules: even times odd is odd, odd times odd is even, and even times even is even. Define \\(p(f)\\) as a parity label, not a function value. Explain that multiplying signs works because replacing \\(t\\) by \\(-t\\) either keeps a factor unchanged or adds a minus sign. Include one representative worked example: \\(\\cos t\\) is even and \\(t\\) is odd, so \\(t\\cos t\\) is odd; verify briefly by substituting \\(-t\\). Include the exam note: when asked for the parity of a product, classify each factor first, then multiply the parity labels. Include the common misuse: do not expand or integrate before checking parity."
    },
    {
      "type": "math_block",
      "page_group": "page_6_even_integral_rule",
      "latex": "\\int_{-a}^{a}x_e(t)\\,dt=2\\int_{0}^{a}x_e(t)\\,dt\\qquad \\text{(1.16)}",
      "explanation_instruction": "Begin with the heading '## 4. Integrals over symmetric intervals: even functions'. Explain in 100–140 words that the area from \\(-a\\) to \\(0\\) equals the area from \\(0\\) to \\(a\\) for an even function, so the full integral is twice the right-half integral. Define \\(a\\) as a positive endpoint and \\(x_e(t)\\) as an even function. Include one minimal example: \\(\\int_{-2}^{2}\\cos t\\,dt=2\\int_0^2\\cos t\\,dt\\). Include the exam trigger: symmetric limits \\([-a,a]\\) plus an even integrand. Include the common misuse: this shortcut does not apply to nonsymmetric limits such as \\([0,a]\\) or \\([-a,b]\\) when \\(a\\ne b\\)."
    },
    {
      "type": "math_block",
      "page_group": "page_7_odd_integral_rule",
      "latex": "\\int_{-a}^{a}x_o(t)\\,dt=0\\qquad \\text{(1.16)}",
      "explanation_instruction": "Begin with the heading '## 5. Integrals over symmetric intervals: odd functions'. Explain in 100–140 words that an odd function has equal and opposite signed area on the left and right of the origin, so the areas cancel. Define \\(x_o(t)\\) as an odd function and \\([-a,a]\\) as a symmetric interval. Include one minimal example: \\(\\int_{-3}^{3}t^3\\,dt=0\\). Include the exam trigger: symmetric limits plus an odd integrand means the answer is immediately zero. Include the textbook exception clearly: these results assume there is no impulse or derivative of an impulse at the origin. Include the common misuse: do not set an integral to zero just because the integrand contains an odd factor if another factor changes the overall parity."
    },
    {
      "type": "section_summary",
      "page_group": "page_8_recap",
      "instruction": "Create a recap page titled '📌 Key Takeaways'. Include 5 concise bullets, each no more than 22 words. The bullets must explicitly include these formulas: \\(x_e(t)=x_e(-t)\\), \\(x_o(t)=-x_o(-t)\\), \\(\\text{even}\\times\\text{odd}=\\text{odd}\\), \\(\\text{odd}\\times\\text{odd}=\\text{even}\\), \\(\\text{even}\\times\\text{even}=\\text{even}\\), \\(\\int_{-a}^{a}x_e(t)dt=2\\int_0^a x_e(t)dt\\), and \\(\\int_{-a}^{a}x_o(t)dt=0\\). Also include the condition: symmetric limits and no impulse at the origin. End with one bridge sentence: 'Next, these symmetry shortcuts will help simplify signal calculations before doing heavier algebra.'"
    },
    {
      "type": "quiz_plan",
      "page_group": "page_9_quiz",
      "target_questions": 6,
      "question_range": {
        "min": 5,
        "max": 7
      },
      "knowledge_points": [
        {
          "id": "even_odd_recognition",
          "label": "Recognizing even and odd symmetry",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "A function satisfies \\(x(-t)=x(t)\\) for every \\(t\\). What can you conclude?",
              "options": [
                "A. The function is even.",
                "B. The function is odd.",
                "C. The function must be positive.",
                "D. The function must be zero at the origin."
              ],
              "correct_option": "A",
              "explanation": "The condition \\(x(-t)=x(t)\\) is exactly even symmetry: mirrored time values have the same function value.",
              "wrong_option_explanations": {
                "B": "Odd symmetry requires \\(x(-t)=-x(t)\\), not the same value.",
                "C": "Even functions may be positive, negative, or change sign.",
                "D": "Odd functions must satisfy \\(x(0)=0\\) if ordinary and finite; even functions do not have to."
              },
              "hint": "Ask whether replacing \\(t\\) by \\(-t\\) changes the value.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "In a graph, the point at \\(t=a\\) has value 5 and the point at \\(t=-a\\) has value -5. Which symmetry does this match?",
              "options": [
                "A. Even symmetry",
                "B. Odd symmetry",
                "C. Neither even nor odd symmetry",
                "D. Both even and odd symmetry for any nonzero function"
              ],
              "correct_option": "B",
              "explanation": "Odd symmetry means mirrored points have equal magnitude and opposite sign.",
              "wrong_option_explanations": {
                "A": "Even symmetry would require the two values to be equal, not opposite.",
                "C": "The given pair is consistent with odd symmetry.",
                "D": "A nonzero function cannot generally be both even and odd."
              },
              "hint": "Compare the signs at \\(-a\\) and \\(a\\).",
              "needs_visual": true,
              "visual_type": "textbook_even_odd_symmetry_plot",
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "product_parity",
          "label": "Product parity rules",
          "importance": "high",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "\\(f(t)\\) is odd and \\(g(t)\\) is odd. What is the parity of \\(f(t)g(t)\\)?",
              "options": [
                "A. Odd",
                "B. Even",
                "C. Neither even nor odd",
                "D. It depends on whether the functions are positive"
              ],
              "correct_option": "B",
              "explanation": "Odd times odd is even because the two sign changes cancel.",
              "wrong_option_explanations": {
                "A": "One odd factor gives a sign change; two odd factors give two sign changes, which cancel.",
                "C": "The product of two odd functions has a definite parity: even.",
                "D": "Parity is about behavior under \\(t\\mapsto -t\\), not positivity."
              },
              "hint": "Use the sign-label idea: odd is like \\(-1\\), and \\((-1)(-1)=+1\\).",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "Which product is guaranteed to be odd?",
              "options": [
                "A. even function × even function",
                "B. odd function × odd function",
                "C. even function × odd function",
                "D. even function × even function × odd function × odd function"
              ],
              "correct_option": "C",
              "explanation": "A product with exactly one odd-parity sign change is odd. Even times odd is odd.",
              "wrong_option_explanations": {
                "A": "Even times even remains even.",
                "B": "Odd times odd becomes even because the two sign changes cancel.",
                "D": "Two odd factors produce even parity overall."
              },
              "hint": "Count how many odd factors appear.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "symmetric_interval_integrals",
          "label": "Integral shortcuts over symmetric intervals",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "If \\(x(t)\\) is odd and has no impulse at the origin, what is \\(\\int_{-4}^{4}x(t)\\,dt\\)?",
              "options": [
                "A. \\(0\\)",
                "B. \\(2\\int_0^4x(t)\\,dt\\)",
                "C. \\(\\int_0^4x(t)\\,dt\\)",
                "D. Cannot be simplified because the limits contain negative numbers"
              ],
              "correct_option": "A",
              "explanation": "An odd function has equal and opposite signed areas on symmetric limits, so the integral is zero.",
              "wrong_option_explanations": {
                "B": "That doubling rule is for even functions, not odd functions.",
                "C": "The right-half integral is canceled by the left-half integral.",
                "D": "Negative limits are exactly what make the symmetry shortcut useful."
              },
              "hint": "Odd function plus symmetric interval means cancellation.",
              "needs_visual": true,
              "visual_type": "area_cancellation_on_odd_symmetry_plot",
              "same_point_variant": true
            },
            {
              "id": "kp3_q2",
              "type": "multiple_choice",
              "stem": "Which simplification is valid for an even function \\(x_e(t)\\)?",
              "options": [
                "A. \\(\\int_{-a}^{a}x_e(t)dt=0\\)",
                "B. \\(\\int_{-a}^{a}x_e(t)dt=2\\int_0^a x_e(t)dt\\)",
                "C. \\(\\int_{0}^{a}x_e(t)dt=0\\)",
                "D. \\(\\int_{-a}^{b}x_e(t)dt=2\\int_0^a x_e(t)dt\\) for any \\(b\\)"
              ],
              "correct_option": "B",
              "explanation": "For an even function, the left and right halves over \\([-a,a]\\) have equal area, so the full integral is twice the right half.",
              "wrong_option_explanations": {
                "A": "Zero over symmetric limits is the odd-function shortcut.",
                "C": "Even symmetry does not make the right-half area zero.",
                "D": "The interval must be symmetric: \\([-a,a]\\), not \\([-a,b]\\) with arbitrary \\(b\\)."
              },
              "hint": "Even functions double over symmetric intervals; odd functions cancel.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "exception_and_exam_traps",
          "label": "Conditions and common traps",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp4_q1",
              "type": "short_answer",
              "stem": "A student says: 'The integrand is odd, so \\(\\int_{0}^{5}x_o(t)dt=0\\).' Explain precisely what is wrong.",
              "ideal_answer": "The zero shortcut for odd functions requires symmetric limits, such as \\([-5,5]\\). The interval \\([0,5]\\) only covers one side, so the cancellation between left and right sides is missing.",
              "grading_rubric": [
                "Must state that odd-function cancellation requires symmetric limits.",
                "Must identify \\([0,5]\\) as not symmetric about the origin.",
                "Must explain that the missing left side prevents cancellation."
              ],
              "explanation": "This checks whether the student knows the condition behind the shortcut, not just the shortcut result.",
              "hint": "Where is the negative-time interval that would cancel the positive-time area?",
              "needs_visual": true,
              "visual_type": "wrong_vs_right_symmetric_interval_comparison",
              "same_point_variant": false
            }
          ]
        }
      ]
    }
  ]
}
```
