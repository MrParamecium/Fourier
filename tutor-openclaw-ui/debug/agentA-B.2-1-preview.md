# Agent A Preview: B.2-1 B.2-1 Addition of Sinusoids

- Difficulty: intermediate
- Estimated read minutes: 6

## Learning Objectives

- Convert a same-frequency cosine-sine sum into one sinusoid.
- Use phasor magnitude and angle to find amplitude and phase.
- Avoid common phase-sign and quadrant mistakes.

## Visualization Need

```json
{
  "level": "static",
  "reason": [
    "pattern_recognition_benefits_from_figure",
    "wikipedia_has_standard_reference_visual",
    "wrong_vs_right_contrast_is_high_value"
  ],
  "recommended_assets": [
    "book_figure",
    "latex_native_visual"
  ]
}
```

## Visual Plan

```json
{
  "primary_anchor": "both",
  "rationale": "This section is best taught through local LaTeX formulas plus the textbook phasor diagrams, because students must connect the algebraic coefficients a and b to a complex-plane vector whose length and angle become the final sinusoid. The available textbook figures are canonical for this exact notation, so do not replace them with generated images.",
  "cram": "Use the phasor diagrams to recognize the exam pattern: same frequency, cosine plus sine, convert to one cosine with amplitude and phase.",
  "standard": "Use the formulas and Fig. B.7/B.8 together: first read a and b, then compute C and theta, then verify the direction visually.",
  "top_score": "Use the visual quadrant information to catch phase-sign errors and calculator arctangent mistakes."
}
```

## Planned Blocks

### Block 1: `text_explanation`
- **instruction**: Create a minimal overview page only. Use exactly two short sections: 'Section Objective' and 'Concepts In This Section'. Under Section Objective, write one sentence: 'Compress two same-frequency sinusoids into one sinusoid using phasors.' Under Concepts In This Section, list only these concept names as bullets: same-frequency sinusoid addition; amplitude C; phase theta; phasor representation; quadrant/sign check. Do not add examples, background, or extended explanation on this first page.

### Block 2: `book_image`
- **source_page**: page-018
- **fig_id**: Figure B.7
- **teaching_role**: concept_anchor
- **mode_specific_visual_use**:
```json
{
  "cram": "Show that horizontal and vertical phasor components combine into one resultant phasor.",
  "standard": "Use the diagram to connect a cos term, b sin term, and the final C at angle theta.",
  "top_score": "Use the diagram to check the sign of b and the quadrant of theta before trusting a calculator."
}
```
- **caption_instruction**: Write one sentence: Figure B.7 shows how the cosine and sine components add as phasors to produce one resultant sinusoid.
- **description_instruction**: Describe the horizontal real-axis component as the cosine term and the vertical component as the sine-related term. Point out that the resultant vector has length C and angle theta, which become the amplitude and phase in the final sinusoid. Emphasize that the sign of the sine coefficient determines whether the vertical phasor points up or down.

### Block 3: `text_explanation`
- **instruction**: Start a new concept page with heading '## 1. Same-frequency sinusoids collapse into one sinusoid'. Explain in 90–130 words that two sinusoids can be compressed only because they share the same angular frequency omega_0. Use the phrase 'same frequency is the trigger condition'. Explain that the result is not a new frequency; it is the same frequency with a new amplitude and phase. Include one minimal example pattern: '3 cos(omega_0 t) - 4 sin(omega_0 t)' has the right form, but '3 cos(omega_0 t) - 4 sin(2 omega_0 t)' does not. End with the exam note: 'On exams, first check that both terms have the same omega_0.'

### Block 4: `math_block`
- **latex**: a\cos(\omega_0 t)+b\sin(\omega_0 t)=C\cos(\omega_0 t+\theta) \quad \text{(B.16)}
- **explanation_instruction**: Explain this as the central compression formula. Define a as the coefficient of cos(omega_0 t), b as the coefficient of sin(omega_0 t), C as the final amplitude, theta as the final phase, and omega_0 as the shared angular frequency. State when to use it: when a cosine term and sine term have the same omega_0. State the common misuse: applying it when the two frequencies are different.

### Block 5: `math_block`
- **latex**: C=\sqrt{a^2+b^2}
- **explanation_instruction**: Explain that C is the phasor length and therefore the amplitude of the final sinusoid. Mention that C is never negative. Use the mini-example a = 3, b = -4 to show C = 5 in one sentence. State the exam trigger: after identifying a and b, compute the amplitude with the Pythagorean length formula. State the common misuse: stopping after C and forgetting to find theta.

### Block 6: `math_block`
- **latex**: \theta=\tan^{-1}\!\left(\frac{-b}{a}\right) \quad \text{(B.17)}
- **explanation_instruction**: Explain that theta is the angle of the complex number a - jb, not simply a blind calculator output. Define a and b again briefly. State that the sign minus b comes from rewriting the sine contribution inside C cos(omega_0 t + theta). Emphasize quadrant care: if a is negative, the angle may need adjustment. State the common misuse: using tan^{-1}(b/a) or ignoring the quadrant.

### Block 7: `text_explanation`
- **instruction**: Start a new concept page with heading '## 2. Representative example: compress one sinusoid'. Work the example x(t) = cos(omega_0 t) - sqrt(3) sin(omega_0 t). Keep it to 120–160 words. Identify a = 1 and b = -sqrt(3). Compute C = 2. Compute theta = tan^{-1}(sqrt(3)) = 60 degrees. Write the final answer exactly as x(t) = 2 cos(omega_0 t + 60 degrees). Add a quick check: the negative sine coefficient creates a positive phase in this convention because theta uses -b/a. End with the exam note: 'Final answers must include both amplitude and phase; C alone is incomplete.'

### Block 8: `book_image`
- **source_page**: page-019
- **fig_id**: Fig. B.8
- **teaching_role**: example_support
- **mode_specific_visual_use**:
```json
{
  "cram": "Use the two diagrams to see the final amplitude and phase directly after computing a and b.",
  "standard": "Use Fig. B.8a to verify the worked example and Fig. B.8b to show why quadrant adjustment matters.",
  "top_score": "Use Fig. B.8b as the warning case: negative real and imaginary components require careful angle placement."
}
```
- **caption_instruction**: Write one sentence: Figure B.8 verifies sinusoid addition by showing the resulting phasor for two worked cases.
- **description_instruction**: Describe Fig. B.8a as the case where the components add to a phasor of length 2 at 60 degrees. Describe Fig. B.8b as the case where negative components place the resultant in the third quadrant with magnitude 5 and angle about -126.9 degrees. Tell students to use the diagram as a sign and quadrant check, not as a replacement for calculation.

### Block 9: `math_block`
- **latex**: C\cos(\omega_0 t+\theta)=C\cos\theta\cos(\omega_0 t)-C\sin\theta\sin(\omega_0 t)
- **explanation_instruction**: Start a short final concept page with heading '## 3. Reverse operation: expand one sinusoid'. Explain that the same identity works backward: from one phase-shifted cosine, recover the cosine coefficient C cos theta and sine coefficient -C sin theta. State when to use it: when a problem gives amplitude and phase but asks for separate cos and sin terms. Give one minimal example in words only: if C = 2 and theta = 60 degrees, the cosine coefficient is 1 and the sine coefficient is -sqrt(3). State the common misuse: forgetting the minus sign before C sin theta.

### Block 10: `section_summary`
- **instruction**: Create a recap page titled '📌 Key Takeaways'. Include 4 bullets, each no more than 24 words. The bullets must explicitly include these formulas: a cos(omega_0 t)+b sin(omega_0 t)=C cos(omega_0 t+theta); C=sqrt(a^2+b^2); theta=tan^{-1}(-b/a); C cos(omega_0 t+theta)=C cos theta cos(omega_0 t)-C sin theta sin(omega_0 t). Include one bullet warning that theta needs quadrant/sign care. End with one bridge sentence: 'Next, this phasor idea connects naturally to complex exponentials and Euler's formula.'

### Block 11: `quiz_plan`
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
    "id": "same_frequency_trigger",
    "label": "Recognizing when sinusoid compression applies",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp1_q1",
        "type": "multiple_choice",
        "stem": "Which expression can be compressed using Eq. (B.16) into one sinusoid of the form C cos(omega_0 t + theta)?",
        "options": [
          "A. 2 cos(omega_0 t) - 5 sin(omega_0 t)",
          "B. 2 cos(omega_0 t) - 5 sin(2 omega_0 t)",
          "C. 2 cos(omega_0 t) - 5 cos(3 omega_0 t)",
          "D. 2 cos(t) - 5 sin(t^2)"
        ],
        "correct_option": "A",
        "explanation": "Eq. (B.16) applies when the cosine and sine terms share the same angular frequency.",
        "wrong_option_explanations": {
          "B": "The sine term has angular frequency 2 omega_0, not omega_0.",
          "C": "The two cosine terms have different frequencies.",
          "D": "sin(t^2) is not a sinusoid with the same angular frequency as cos(t)."
        },
        "hint": "Check the argument of each trig function before calculating.",
        "needs_visual": false,
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "amplitude_formula",
    "label": "Computing final amplitude C",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp2_q1",
        "type": "multiple_choice",
        "stem": "For x(t) = 3 cos(omega_0 t) - 4 sin(omega_0 t), what is the amplitude C of the single sinusoid?",
        "options": [
          "A. 1",
          "B. 5",
          "C. 7",
          "D. -5"
        ],
        "correct_option": "B",
        "explanation": "Here a = 3 and b = -4, so C = sqrt(3^2 + (-4)^2) = 5.",
        "wrong_option_explanations": {
          "A": "This subtracts the magnitudes instead of using phasor length.",
          "C": "This adds magnitudes directly instead of using sqrt(a^2+b^2).",
          "D": "Amplitude is a magnitude, so it is not negative."
        },
        "hint": "Amplitude is the length of the phasor.",
        "needs_visual": false,
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "phase_formula_sign",
    "label": "Using theta = tan^{-1}(-b/a) with the correct sign",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp3_q1",
        "type": "multiple_choice",
        "stem": "For x(t) = cos(omega_0 t) - sqrt(3) sin(omega_0 t), what is the correct single-sinusoid form?",
        "options": [
          "A. 2 cos(omega_0 t + 60 degrees)",
          "B. 2 cos(omega_0 t - 60 degrees)",
          "C. 2 cos(omega_0 t + 30 degrees)",
          "D. sqrt(3) cos(omega_0 t + 60 degrees)"
        ],
        "correct_option": "A",
        "explanation": "a = 1 and b = -sqrt(3), so C = 2 and theta = tan^{-1}(sqrt(3)) = 60 degrees.",
        "wrong_option_explanations": {
          "B": "This uses the wrong phase sign.",
          "C": "tan^{-1}(sqrt(3)) is 60 degrees, not 30 degrees.",
          "D": "The amplitude is sqrt(1+3)=2, not sqrt(3)."
        },
        "hint": "Use -b/a, not b/a.",
        "needs_visual": true,
        "visual_type": "phasor_diagram_reference",
        "same_point_variant": true
      },
      {
        "id": "kp3_q2",
        "type": "short_answer",
        "stem": "A student writes cos(omega_0 t) - sqrt(3) sin(omega_0 t) = 2 cos(omega_0 t - 60 degrees). Explain the mistake.",
        "ideal_answer": "The sign of the phase is wrong. In Eq. (B.17), theta = tan^{-1}(-b/a). Here b = -sqrt(3), so -b/a = sqrt(3), giving theta = +60 degrees.",
        "grading_rubric": [
          "Must identify b = -sqrt(3)",
          "Must use theta = tan^{-1}(-b/a)",
          "Must state that the correct phase is +60 degrees",
          "Must give the corrected final sinusoid"
        ],
        "explanation": "This checks whether the student understands the sign convention, not just the amplitude.",
        "hint": "Look at the minus sign in theta = tan^{-1}(-b/a).",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "quadrant_care",
    "label": "Quadrant and arctangent trap",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp4_q1",
        "type": "multiple_choice",
        "stem": "For x(t) = -3 cos(omega_0 t) + 4 sin(omega_0 t), the phasor uses a - jb = -3 - j4. Which final phase is consistent with the textbook phasor diagram?",
        "options": [
          "A. +53.1 degrees",
          "B. -53.1 degrees",
          "C. -126.9 degrees",
          "D. +126.9 degrees"
        ],
        "correct_option": "C",
        "explanation": "The point -3 - j4 lies in the third quadrant if measured as a negative angle from the positive real axis, giving about -126.9 degrees.",
        "wrong_option_explanations": {
          "A": "This is the reference angle only and ignores the quadrant.",
          "B": "This has the wrong quadrant for negative real and negative imaginary parts.",
          "D": "This angle points to the second quadrant, not the third/fourth-direction representation used here."
        },
        "hint": "Do not trust tan^{-1} alone; locate the phasor first.",
        "needs_visual": true,
        "visual_type": "wrong_vs_right_phasor_quadrant_check",
        "same_point_variant": true
      },
      {
        "id": "kp4_q2",
        "type": "multiple_choice",
        "stem": "Why is tan^{-1}((-4)/(-3)) = 53.1 degrees not the final phase for a - jb = -3 - j4?",
        "options": [
          "A. Because the magnitude must be negative",
          "B. Because arctangent gives a reference angle and does not by itself identify the quadrant",
          "C. Because theta must always be between 0 and 90 degrees",
          "D. Because sine terms cannot be represented by phasors"
        ],
        "correct_option": "B",
        "explanation": "The ratio gives the reference angle, but the signs of both components place the phasor in a different quadrant.",
        "wrong_option_explanations": {
          "A": "Magnitude is never negative.",
          "C": "Phases can be outside the first quadrant.",
          "D": "The whole section uses phasors to represent sine and cosine terms."
        },
        "hint": "Ask where the point lies on the complex plane.",
        "needs_visual": true,
        "visual_type": "phasor_quadrant_reference",
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "reverse_expansion",
    "label": "Expanding one phase-shifted cosine into cos and sin terms",
    "importance": "medium",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp5_q1",
        "type": "multiple_choice",
        "stem": "Which expansion is correct for C cos(omega_0 t + theta)?",
        "options": [
          "A. C cos theta cos(omega_0 t) - C sin theta sin(omega_0 t)",
          "B. C cos theta cos(omega_0 t) + C sin theta sin(omega_0 t)",
          "C. C sin theta cos(omega_0 t) - C cos theta sin(omega_0 t)",
          "D. C cos(omega_0 t) + theta"
        ],
        "correct_option": "A",
        "explanation": "The cosine angle-addition identity gives cos(A+B)=cos A cos B - sin A sin B.",
        "wrong_option_explanations": {
          "B": "The sign before the sine product should be negative.",
          "C": "The sine and cosine coefficients are swapped.",
          "D": "Phase cannot be added outside the cosine like a separate term."
        },
        "hint": "Use the cosine angle-addition identity.",
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
  "section_id": "B.2-1",
  "section_title": "B.2-1 Addition of Sinusoids",
  "difficulty": "intermediate",
  "estimated_read_minutes": 6,
  "learning_objectives": [
    "Convert a same-frequency cosine-sine sum into one sinusoid.",
    "Use phasor magnitude and angle to find amplitude and phase.",
    "Avoid common phase-sign and quadrant mistakes."
  ],
  "visualization_need": {
    "level": "static",
    "reason": [
      "pattern_recognition_benefits_from_figure",
      "wikipedia_has_standard_reference_visual",
      "wrong_vs_right_contrast_is_high_value"
    ],
    "recommended_assets": [
      "book_figure",
      "latex_native_visual"
    ]
  },
  "visual_plan": {
    "primary_anchor": "both",
    "rationale": "This section is best taught through local LaTeX formulas plus the textbook phasor diagrams, because students must connect the algebraic coefficients a and b to a complex-plane vector whose length and angle become the final sinusoid. The available textbook figures are canonical for this exact notation, so do not replace them with generated images.",
    "cram": "Use the phasor diagrams to recognize the exam pattern: same frequency, cosine plus sine, convert to one cosine with amplitude and phase.",
    "standard": "Use the formulas and Fig. B.7/B.8 together: first read a and b, then compute C and theta, then verify the direction visually.",
    "top_score": "Use the visual quadrant information to catch phase-sign errors and calculator arctangent mistakes."
  },
  "blocks": [
    {
      "type": "text_explanation",
      "instruction": "Create a minimal overview page only. Use exactly two short sections: 'Section Objective' and 'Concepts In This Section'. Under Section Objective, write one sentence: 'Compress two same-frequency sinusoids into one sinusoid using phasors.' Under Concepts In This Section, list only these concept names as bullets: same-frequency sinusoid addition; amplitude C; phase theta; phasor representation; quadrant/sign check. Do not add examples, background, or extended explanation on this first page."
    },
    {
      "type": "book_image",
      "source_page": "page-018",
      "fig_id": "Figure B.7",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Show that horizontal and vertical phasor components combine into one resultant phasor.",
        "standard": "Use the diagram to connect a cos term, b sin term, and the final C at angle theta.",
        "top_score": "Use the diagram to check the sign of b and the quadrant of theta before trusting a calculator."
      },
      "caption_instruction": "Write one sentence: Figure B.7 shows how the cosine and sine components add as phasors to produce one resultant sinusoid.",
      "description_instruction": "Describe the horizontal real-axis component as the cosine term and the vertical component as the sine-related term. Point out that the resultant vector has length C and angle theta, which become the amplitude and phase in the final sinusoid. Emphasize that the sign of the sine coefficient determines whether the vertical phasor points up or down."
    },
    {
      "type": "text_explanation",
      "instruction": "Start a new concept page with heading '## 1. Same-frequency sinusoids collapse into one sinusoid'. Explain in 90–130 words that two sinusoids can be compressed only because they share the same angular frequency omega_0. Use the phrase 'same frequency is the trigger condition'. Explain that the result is not a new frequency; it is the same frequency with a new amplitude and phase. Include one minimal example pattern: '3 cos(omega_0 t) - 4 sin(omega_0 t)' has the right form, but '3 cos(omega_0 t) - 4 sin(2 omega_0 t)' does not. End with the exam note: 'On exams, first check that both terms have the same omega_0.'"
    },
    {
      "type": "math_block",
      "latex": "a\\cos(\\omega_0 t)+b\\sin(\\omega_0 t)=C\\cos(\\omega_0 t+\\theta) \\quad \\text{(B.16)}",
      "explanation_instruction": "Explain this as the central compression formula. Define a as the coefficient of cos(omega_0 t), b as the coefficient of sin(omega_0 t), C as the final amplitude, theta as the final phase, and omega_0 as the shared angular frequency. State when to use it: when a cosine term and sine term have the same omega_0. State the common misuse: applying it when the two frequencies are different."
    },
    {
      "type": "math_block",
      "latex": "C=\\sqrt{a^2+b^2}",
      "explanation_instruction": "Explain that C is the phasor length and therefore the amplitude of the final sinusoid. Mention that C is never negative. Use the mini-example a = 3, b = -4 to show C = 5 in one sentence. State the exam trigger: after identifying a and b, compute the amplitude with the Pythagorean length formula. State the common misuse: stopping after C and forgetting to find theta."
    },
    {
      "type": "math_block",
      "latex": "\\theta=\\tan^{-1}\\!\\left(\\frac{-b}{a}\\right) \\quad \\text{(B.17)}",
      "explanation_instruction": "Explain that theta is the angle of the complex number a - jb, not simply a blind calculator output. Define a and b again briefly. State that the sign minus b comes from rewriting the sine contribution inside C cos(omega_0 t + theta). Emphasize quadrant care: if a is negative, the angle may need adjustment. State the common misuse: using tan^{-1}(b/a) or ignoring the quadrant."
    },
    {
      "type": "text_explanation",
      "instruction": "Start a new concept page with heading '## 2. Representative example: compress one sinusoid'. Work the example x(t) = cos(omega_0 t) - sqrt(3) sin(omega_0 t). Keep it to 120–160 words. Identify a = 1 and b = -sqrt(3). Compute C = 2. Compute theta = tan^{-1}(sqrt(3)) = 60 degrees. Write the final answer exactly as x(t) = 2 cos(omega_0 t + 60 degrees). Add a quick check: the negative sine coefficient creates a positive phase in this convention because theta uses -b/a. End with the exam note: 'Final answers must include both amplitude and phase; C alone is incomplete.'"
    },
    {
      "type": "book_image",
      "source_page": "page-019",
      "fig_id": "Fig. B.8",
      "teaching_role": "example_support",
      "mode_specific_visual_use": {
        "cram": "Use the two diagrams to see the final amplitude and phase directly after computing a and b.",
        "standard": "Use Fig. B.8a to verify the worked example and Fig. B.8b to show why quadrant adjustment matters.",
        "top_score": "Use Fig. B.8b as the warning case: negative real and imaginary components require careful angle placement."
      },
      "caption_instruction": "Write one sentence: Figure B.8 verifies sinusoid addition by showing the resulting phasor for two worked cases.",
      "description_instruction": "Describe Fig. B.8a as the case where the components add to a phasor of length 2 at 60 degrees. Describe Fig. B.8b as the case where negative components place the resultant in the third quadrant with magnitude 5 and angle about -126.9 degrees. Tell students to use the diagram as a sign and quadrant check, not as a replacement for calculation."
    },
    {
      "type": "math_block",
      "latex": "C\\cos(\\omega_0 t+\\theta)=C\\cos\\theta\\cos(\\omega_0 t)-C\\sin\\theta\\sin(\\omega_0 t)",
      "explanation_instruction": "Start a short final concept page with heading '## 3. Reverse operation: expand one sinusoid'. Explain that the same identity works backward: from one phase-shifted cosine, recover the cosine coefficient C cos theta and sine coefficient -C sin theta. State when to use it: when a problem gives amplitude and phase but asks for separate cos and sin terms. Give one minimal example in words only: if C = 2 and theta = 60 degrees, the cosine coefficient is 1 and the sine coefficient is -sqrt(3). State the common misuse: forgetting the minus sign before C sin theta."
    },
    {
      "type": "section_summary",
      "instruction": "Create a recap page titled '📌 Key Takeaways'. Include 4 bullets, each no more than 24 words. The bullets must explicitly include these formulas: a cos(omega_0 t)+b sin(omega_0 t)=C cos(omega_0 t+theta); C=sqrt(a^2+b^2); theta=tan^{-1}(-b/a); C cos(omega_0 t+theta)=C cos theta cos(omega_0 t)-C sin theta sin(omega_0 t). Include one bullet warning that theta needs quadrant/sign care. End with one bridge sentence: 'Next, this phasor idea connects naturally to complex exponentials and Euler's formula.'"
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
          "id": "same_frequency_trigger",
          "label": "Recognizing when sinusoid compression applies",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Which expression can be compressed using Eq. (B.16) into one sinusoid of the form C cos(omega_0 t + theta)?",
              "options": [
                "A. 2 cos(omega_0 t) - 5 sin(omega_0 t)",
                "B. 2 cos(omega_0 t) - 5 sin(2 omega_0 t)",
                "C. 2 cos(omega_0 t) - 5 cos(3 omega_0 t)",
                "D. 2 cos(t) - 5 sin(t^2)"
              ],
              "correct_option": "A",
              "explanation": "Eq. (B.16) applies when the cosine and sine terms share the same angular frequency.",
              "wrong_option_explanations": {
                "B": "The sine term has angular frequency 2 omega_0, not omega_0.",
                "C": "The two cosine terms have different frequencies.",
                "D": "sin(t^2) is not a sinusoid with the same angular frequency as cos(t)."
              },
              "hint": "Check the argument of each trig function before calculating.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "amplitude_formula",
          "label": "Computing final amplitude C",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "For x(t) = 3 cos(omega_0 t) - 4 sin(omega_0 t), what is the amplitude C of the single sinusoid?",
              "options": [
                "A. 1",
                "B. 5",
                "C. 7",
                "D. -5"
              ],
              "correct_option": "B",
              "explanation": "Here a = 3 and b = -4, so C = sqrt(3^2 + (-4)^2) = 5.",
              "wrong_option_explanations": {
                "A": "This subtracts the magnitudes instead of using phasor length.",
                "C": "This adds magnitudes directly instead of using sqrt(a^2+b^2).",
                "D": "Amplitude is a magnitude, so it is not negative."
              },
              "hint": "Amplitude is the length of the phasor.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "phase_formula_sign",
          "label": "Using theta = tan^{-1}(-b/a) with the correct sign",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "For x(t) = cos(omega_0 t) - sqrt(3) sin(omega_0 t), what is the correct single-sinusoid form?",
              "options": [
                "A. 2 cos(omega_0 t + 60 degrees)",
                "B. 2 cos(omega_0 t - 60 degrees)",
                "C. 2 cos(omega_0 t + 30 degrees)",
                "D. sqrt(3) cos(omega_0 t + 60 degrees)"
              ],
              "correct_option": "A",
              "explanation": "a = 1 and b = -sqrt(3), so C = 2 and theta = tan^{-1}(sqrt(3)) = 60 degrees.",
              "wrong_option_explanations": {
                "B": "This uses the wrong phase sign.",
                "C": "tan^{-1}(sqrt(3)) is 60 degrees, not 30 degrees.",
                "D": "The amplitude is sqrt(1+3)=2, not sqrt(3)."
              },
              "hint": "Use -b/a, not b/a.",
              "needs_visual": true,
              "visual_type": "phasor_diagram_reference",
              "same_point_variant": true
            },
            {
              "id": "kp3_q2",
              "type": "short_answer",
              "stem": "A student writes cos(omega_0 t) - sqrt(3) sin(omega_0 t) = 2 cos(omega_0 t - 60 degrees). Explain the mistake.",
              "ideal_answer": "The sign of the phase is wrong. In Eq. (B.17), theta = tan^{-1}(-b/a). Here b = -sqrt(3), so -b/a = sqrt(3), giving theta = +60 degrees.",
              "grading_rubric": [
                "Must identify b = -sqrt(3)",
                "Must use theta = tan^{-1}(-b/a)",
                "Must state that the correct phase is +60 degrees",
                "Must give the corrected final sinusoid"
              ],
              "explanation": "This checks whether the student understands the sign convention, not just the amplitude.",
              "hint": "Look at the minus sign in theta = tan^{-1}(-b/a).",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "quadrant_care",
          "label": "Quadrant and arctangent trap",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp4_q1",
              "type": "multiple_choice",
              "stem": "For x(t) = -3 cos(omega_0 t) + 4 sin(omega_0 t), the phasor uses a - jb = -3 - j4. Which final phase is consistent with the textbook phasor diagram?",
              "options": [
                "A. +53.1 degrees",
                "B. -53.1 degrees",
                "C. -126.9 degrees",
                "D. +126.9 degrees"
              ],
              "correct_option": "C",
              "explanation": "The point -3 - j4 lies in the third quadrant if measured as a negative angle from the positive real axis, giving about -126.9 degrees.",
              "wrong_option_explanations": {
                "A": "This is the reference angle only and ignores the quadrant.",
                "B": "This has the wrong quadrant for negative real and negative imaginary parts.",
                "D": "This angle points to the second quadrant, not the third/fourth-direction representation used here."
              },
              "hint": "Do not trust tan^{-1} alone; locate the phasor first.",
              "needs_visual": true,
              "visual_type": "wrong_vs_right_phasor_quadrant_check",
              "same_point_variant": true
            },
            {
              "id": "kp4_q2",
              "type": "multiple_choice",
              "stem": "Why is tan^{-1}((-4)/(-3)) = 53.1 degrees not the final phase for a - jb = -3 - j4?",
              "options": [
                "A. Because the magnitude must be negative",
                "B. Because arctangent gives a reference angle and does not by itself identify the quadrant",
                "C. Because theta must always be between 0 and 90 degrees",
                "D. Because sine terms cannot be represented by phasors"
              ],
              "correct_option": "B",
              "explanation": "The ratio gives the reference angle, but the signs of both components place the phasor in a different quadrant.",
              "wrong_option_explanations": {
                "A": "Magnitude is never negative.",
                "C": "Phases can be outside the first quadrant.",
                "D": "The whole section uses phasors to represent sine and cosine terms."
              },
              "hint": "Ask where the point lies on the complex plane.",
              "needs_visual": true,
              "visual_type": "phasor_quadrant_reference",
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "reverse_expansion",
          "label": "Expanding one phase-shifted cosine into cos and sin terms",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp5_q1",
              "type": "multiple_choice",
              "stem": "Which expansion is correct for C cos(omega_0 t + theta)?",
              "options": [
                "A. C cos theta cos(omega_0 t) - C sin theta sin(omega_0 t)",
                "B. C cos theta cos(omega_0 t) + C sin theta sin(omega_0 t)",
                "C. C sin theta cos(omega_0 t) - C cos theta sin(omega_0 t)",
                "D. C cos(omega_0 t) + theta"
              ],
              "correct_option": "A",
              "explanation": "The cosine angle-addition identity gives cos(A+B)=cos A cos B - sin A sin B.",
              "wrong_option_explanations": {
                "B": "The sign before the sine product should be negative.",
                "C": "The sine and cosine coefficients are swapped.",
                "D": "Phase cannot be added outside the cosine like a separate term."
              },
              "hint": "Use the cosine angle-addition identity.",
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
