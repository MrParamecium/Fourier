# Agent A Preview: 1.4-2 1.4-2 The Unit Impulse Function δ(t)

- Difficulty: intermediate
- Estimated read minutes: 8

## Learning Objectives

- Define the unit impulse function by its zero-width, unit-area behavior.
- Recognize impulse approximations as pulses whose width shrinks while area stays fixed.
- Use the multiplication property to simplify expressions containing impulses.
- Use the sampling property to evaluate integrals containing impulses.
- Understand why the impulse is treated as a generalized function and how it connects to the unit step.

## Visualization Need

```json
{
  "level": "interactive",
  "reason": [
    "depends_on_parameter_change",
    "formula_to_phenomenon_gap",
    "student_should_manipulate_to_understand"
  ],
  "recommended_assets": [
    "textbook_figure",
    "react_canvas_demo"
  ]
}
```

## Visual Plan

```json
{
  "primary_anchor": "both",
  "rationale": "The section already includes a canonical textbook impulse diagram showing the arrow symbol and rectangular-pulse limit, so that should be used first. The limiting process is parameter-dependent, so a React Canvas demo is also needed to let students see width shrink, height grow, and area remain constant.",
  "cram": "Use the visuals to recognize that an impulse is judged by area and location, not by ordinary height.",
  "standard": "Use the textbook figure for the core picture, then the demo to connect shrinking pulse width with fixed unit area.",
  "top_score": "Use the demo to compare rectangular, exponential, triangular, and Gaussian approximations and notice that shape is not the defining feature."
}
```

## Planned Blocks

### Block 1: `text_explanation`
- **instruction**: Render a minimal overview page only. Use exactly two short sections: (1) 'Section Objective' with one sentence: 'Learn how the unit impulse \(\delta(t)\) represents a zero-duration signal with finite area, and how it samples functions inside products and integrals.' (2) 'Concepts In This Section' as a bullet list of concept names only: 'unit impulse definition', 'pulse approximations', 'impulse strength', 'multiplication property', 'sampling property', 'generalized function view', 'unit step connection'. Do not add any expanded background paragraph.

### Block 2: `book_image`
- **source_page**: page-086
- **fig_id**: unknown
- **teaching_role**: concept_anchor
- **mode_specific_visual_use**:
```json
{
  "cram": "Focus on the arrow at \\(t=0\\) and the phrase 'unit area'.",
  "standard": "Use the rectangular pulse limit to connect width, height, and area.",
  "top_score": "Emphasize that the impulse is not a normal finite-height function at \\(t=0\\)."
}
```
- **caption_instruction**: One sentence: show the unit impulse symbol and its rectangular-pulse limiting interpretation.
- **description_instruction**: Describe the left plot as a spear-like arrow at \(t=0\) representing \(\delta(t)\). Describe the right plot as a rectangle whose width \(\varepsilon\) shrinks while height \(1/\varepsilon\) grows, so the area remains 1. Tell students to notice that the area, not the height, is the meaningful quantity.

### Block 3: `math_block`
- **latex**: \delta(t)=0\ \text{for }t\ne 0,\qquad \int_{-\infty}^{\infty}\delta(t)\,dt=1\tag{1.9}
- **explanation_instruction**: Start this page with heading '## 1. Unit impulse definition'. Explain in 100-140 words that \(\delta(t)\) is zero everywhere except at \(t=0\), where it is not treated as an ordinary finite value. Define the unit impulse by its total area of 1. Explain symbols: \(t\) is time, \(\delta(t)\) is located at zero, and the integral gives area. State when to use it: when a problem contains an idealized instantaneous signal or an impulse in an integral. Exam trigger: look for \(\delta(t)\), \(\delta(t-T)\), or a very narrow unit-area pulse. Common misuse: saying the impulse has height 1; its area is 1, not its height. Include the minimal example: \(5\delta(t)\) has area 5, so its impulse strength is 5.

### Block 4: `interactive_demo`
- **tool**: react_canvas_demo
- **teaching_role**: concept_anchor
- **mode_specific_visual_use**:
```json
{
  "cram": "Use the slider to remember: narrower pulse means taller pulse, but area stays fixed.",
  "standard": "Let students compare one rectangular pulse and one exponential pulse while watching the area label remain 1.",
  "top_score": "Allow switching among rectangular, triangular, exponential, and Gaussian approximations to show that shape is not the defining property."
}
```
- **instruction**: Create a React + Canvas demo titled 'Impulse as a limit of unit-area pulses'. Include a slider labeled 'width parameter' or 'sharpness parameter'. Show a time axis centered at 0. Provide four selectable pulse types: rectangular, triangular, one-sided exponential \(\alpha e^{-\alpha t}u(t)\), and Gaussian. For each selected pulse, animate or redraw the pulse as the parameter changes so that it becomes narrower and taller while an on-screen area readout stays approximately 'Area = 1'. Include the supporting formula for the exponential case as display text near the demo: \(\int_0^\infty \alpha e^{-\alpha t}\,dt=1\). Add a short note below the demo: 'Different shapes can approach the same impulse if their duration goes to 0 while their area stays 1.' Do not add decorative effects.

### Block 5: `math_block`
- **latex**: \phi(t)\delta(t-T)=\phi(T)\delta(t-T)\tag{1.10}
- **explanation_instruction**: Start this page with heading '## 2. Multiplication property'. Explain in 100-140 words that an impulse located at \(t=T\) only keeps the value of the continuous function at that exact location. Define symbols: \(\phi(t)\) is any function continuous at \(T\), \(T\) is the impulse location, and \(\phi(T)\) becomes the impulse strength. When to use it: simplifying products such as \((t^3+3)\delta(t)\) or \(e^{-2t}\delta(t)\). Exam trigger: a function multiplying \(\delta(t-T)\). Common misuse: substituting \(t=0\) automatically even when the impulse is \(\delta(t-T)\). Include the representative example: \((t^3+3)\delta(t)=3\delta(t)\), because the impulse is at \(t=0\).

### Block 6: `math_block`
- **latex**: \int_{-\infty}^{\infty}\phi(t)\delta(t-T)\,dt=\phi(T)\tag{1.11}
- **explanation_instruction**: Start this page with heading '## 3. Sampling property'. Explain in 110-150 words that the impulse inside an integral 'samples' the value of the function at the impulse location. Define symbols clearly: \(\phi(t)\) is the sampled function, \(\delta(t-T)\) is an impulse at \(t=T\), and the integral collapses to \(\phi(T)\). When to use it: any integral over a range that includes \(T\). Exam trigger: \(\int \phi(t)\delta(t-T)dt\). Common misuse: evaluating at the wrong point or ignoring whether the integration interval includes the impulse location. Include the worked example: \(\int_{-\infty}^{\infty}\delta(t-2)\cos(\pi t/4)\,dt=\cos(\pi/2)=0\).

### Block 7: `math_block`
- **latex**: \frac{d}{dt}u(t)=\delta(t)
- **explanation_instruction**: Start this page with heading '## 4. Generalized-function view'. Explain in 100-140 words that the impulse is not an ordinary function because its important point, \(t=0\), is undefined in the usual value-by-value sense. Instead, it is defined by what it does inside integrals: it samples test functions. Then connect this to the unit step: the derivative of the jump in \(u(t)\) is an impulse, and integrating \(\delta(t)\) gives the unit step. Use one concise example: 'A jump of height 1 creates \(\delta(t)\); a jump of height 5 creates \(5\delta(t)\).' Exam note: do not treat \(\delta(0)\) as a normal number.

### Block 8: `section_summary`
- **instruction**: Create a recap page titled '📌 Key Takeaways'. Include 4-5 bullets, each ≤25 words. The summary must explicitly include these formulas: \(\delta(t)=0\) for \(t\ne0\), \(\int_{-\infty}^{\infty}\delta(t)dt=1\), \(\phi(t)\delta(t-T)=\phi(T)\delta(t-T)\), \(\int_{-\infty}^{\infty}\phi(t)\delta(t-T)dt=\phi(T)\), and \(\frac{d}{dt}u(t)=\delta(t)\). Also include the idea that \(k\delta(t)\) has area/strength \(k\). End with one bridge sentence: 'Next, we will use impulse and related singularity functions to model signals more compactly.'

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
    "id": "unit_impulse_definition",
    "label": "Unit impulse definition and strength",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp1_q1",
        "type": "multiple_choice",
        "stem": "Which statement best describes the unit impulse \\(\\delta(t)\\)?",
        "options": [
          "A. It has height 1 at \\(t=0\\) and is zero elsewhere.",
          "B. It is zero for \\(t\\ne0\\) and has total area 1.",
          "C. It is a rectangular pulse of fixed width 1.",
          "D. It is equal to the unit step function."
        ],
        "correct_option": "B",
        "explanation": "The unit impulse is defined by being zero away from its location and having unit area. Its value at the impulse location is not treated as an ordinary finite height.",
        "wrong_option_explanations": {
          "A": "The area is 1, not the height.",
          "C": "Rectangular pulses are only approximations when their width shrinks and height grows.",
          "D": "The unit step is related by integration/differentiation, but it is not the impulse."
        },
        "hint": "Ask whether the number 1 describes height or area.",
        "needs_visual": false,
        "same_point_variant": true
      },
      {
        "id": "kp1_q2",
        "type": "multiple_choice",
        "stem": "What is the strength, or area, of \\(7\\delta(t)\\)?",
        "options": [
          "A. 0",
          "B. 1",
          "C. 7",
          "D. Undefined, so it cannot have area"
        ],
        "correct_option": "C",
        "explanation": "Multiplying a unit impulse by 7 scales its area from 1 to 7.",
        "wrong_option_explanations": {
          "A": "The impulse is zero away from its location, but its total area is not zero.",
          "B": "Only \\(\\delta(t)\\) has unit area; \\(7\\delta(t)\\) has area 7.",
          "D": "The value at the impulse location is undefined, but the impulse strength is still defined."
        },
        "hint": "The coefficient in front of the impulse is its strength.",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "impulse_approximation",
    "label": "Pulse approximations to the impulse",
    "importance": "medium",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp2_q1",
        "type": "multiple_choice",
        "stem": "In the interactive demo, as a rectangular unit-area pulse becomes narrower, what must happen to its height?",
        "options": [
          "A. It must decrease so the area stays 1.",
          "B. It must increase so the area stays 1.",
          "C. It must stay exactly 1.",
          "D. It must become negative."
        ],
        "correct_option": "B",
        "explanation": "For a unit-area pulse, area equals width times height. If width shrinks, height must grow to keep area fixed.",
        "wrong_option_explanations": {
          "A": "If both width and height decrease, the area would go to 0.",
          "C": "Height 1 with shrinking width would make the area shrink.",
          "D": "A standard positive impulse approximation does not require negative height."
        },
        "hint": "For a rectangle, area = width × height.",
        "needs_visual": true,
        "visual_type": "demo_observation_check",
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "multiplication_property",
    "label": "Multiplication by an impulse",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp3_q1",
        "type": "multiple_choice",
        "stem": "Simplify \\((t^2+4)\\delta(t-3)\\).",
        "options": [
          "A. \\(4\\delta(t-3)\\)",
          "B. \\(13\\delta(t-3)\\)",
          "C. \\((t^2+4)\\delta(t)\\)",
          "D. \\(13\\)"
        ],
        "correct_option": "B",
        "explanation": "The impulse \\(\\delta(t-3)\\) is located at \\(t=3\\), so evaluate \\(t^2+4\\) at 3: \\(9+4=13\\).",
        "wrong_option_explanations": {
          "A": "This incorrectly evaluates at \\(t=0\\).",
          "C": "The impulse location does not change from \\(t=3\\) to \\(t=0\\).",
          "D": "The result is still an impulse; only its strength becomes 13."
        },
        "hint": "Use the location inside \\(\\delta(t-T)\\), not automatically zero.",
        "needs_visual": false,
        "same_point_variant": true
      },
      {
        "id": "kp3_q2",
        "type": "short_answer",
        "stem": "A student simplifies \\(\\sin(t)\\delta(t-\\pi)\\) as \\(0\\delta(t-\\pi)\\) because \\(\\sin(0)=0\\). Explain the mistake.",
        "ideal_answer": "The impulse \\(\\delta(t-\\pi)\\) is located at \\(t=\\pi\\), so the function must be evaluated at \\(t=\\pi\\), not at 0. Since \\(\\sin(\\pi)=0\\), the final result is still 0, but the reasoning was wrong.",
        "grading_rubric": [
          "Must identify the impulse location as \\(t=\\pi\\)",
          "Must state that the function should be evaluated at the impulse location",
          "Must distinguish correct answer from correct reasoning"
        ],
        "explanation": "This checks whether the student is applying the property deliberately rather than always plugging in zero.",
        "hint": "Look at the shift in \\(\\delta(t-T)\\).",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "sampling_property",
    "label": "Sampling property in integrals",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp4_q1",
        "type": "multiple_choice",
        "stem": "Evaluate \\(\\int_{-\\infty}^{\\infty} e^{-2t}\\delta(t-1)\\,dt\\).",
        "options": [
          "A. \\(1\\)",
          "B. \\(e^{-2}\\)",
          "C. \\(e^{2}\\)",
          "D. \\(0\\)"
        ],
        "correct_option": "B",
        "explanation": "The impulse samples the function at \\(t=1\\), so the integral equals \\(e^{-2(1)}=e^{-2}\\).",
        "wrong_option_explanations": {
          "A": "The integral of the impulse alone is 1, but here it samples \\(e^{-2t}\\).",
          "C": "The exponent sign was reversed.",
          "D": "The impulse lies inside the integration interval, so the result is not zero."
        },
        "hint": "Replace \\(t\\) in the non-impulse function by the impulse location.",
        "needs_visual": false,
        "same_point_variant": true
      },
      {
        "id": "kp4_q2",
        "type": "multiple_choice",
        "stem": "Evaluate \\(\\int_{-\\infty}^{\\infty}\\delta(t-2)\\cos(\\pi t/4)\\,dt\\).",
        "options": [
          "A. \\(0\\)",
          "B. \\(1\\)",
          "C. \\(\\cos(\\pi/4)\\)",
          "D. \\(2\\)"
        ],
        "correct_option": "A",
        "explanation": "The impulse is at \\(t=2\\), so the integral equals \\(\\cos(\\pi\\cdot2/4)=\\cos(\\pi/2)=0\\).",
        "wrong_option_explanations": {
          "B": "That would be the area of the impulse alone, not the sampled function value.",
          "C": "This evaluates at \\(t=1\\), not \\(t=2\\).",
          "D": "The impulse location is not the value of the integral."
        },
        "hint": "The answer is the function value at \\(t=2\\).",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "generalized_function_connection",
    "label": "Generalized function and unit step connection",
    "importance": "medium",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp5_q1",
        "type": "multiple_choice",
        "stem": "Why is \\(\\delta(t)\\) treated as a generalized function rather than an ordinary function?",
        "options": [
          "A. Because it is periodic.",
          "B. Because its ordinary value at \\(t=0\\) is not finite, but its effect inside integrals is well-defined.",
          "C. Because it is always equal to zero.",
          "D. Because it can only be used in discrete time."
        ],
        "correct_option": "B",
        "explanation": "The impulse is defined by its sampling action in integrals, not by an ordinary pointwise value at every time.",
        "wrong_option_explanations": {
          "A": "Periodicity is not the issue.",
          "C": "It is zero away from its location, but its area/effect is not zero.",
          "D": "This section is about continuous-time impulses."
        },
        "hint": "Think about what is undefined and what remains useful.",
        "needs_visual": false,
        "same_point_variant": false
      },
      {
        "id": "kp5_q2",
        "type": "multiple_choice",
        "stem": "Which relationship connects the unit step and the unit impulse?",
        "options": [
          "A. \\(u(t)=\\delta(t)\\)",
          "B. \\(\\frac{d}{dt}u(t)=\\delta(t)\\)",
          "C. \\(\\frac{d}{dt}\\delta(t)=u(t)\\)",
          "D. \\(u(t)\\delta(t)=0\\) always"
        ],
        "correct_option": "B",
        "explanation": "In the generalized-function sense, the derivative of the unit step is the unit impulse.",
        "wrong_option_explanations": {
          "A": "The unit step and impulse are related but not equal.",
          "C": "This reverses the relationship incorrectly.",
          "D": "Products involving discontinuities at the impulse location require care and are not the main relationship here."
        },
        "hint": "A jump creates an impulse when differentiated.",
        "needs_visual": true,
        "visual_type": "structure_comparison_check",
        "same_point_variant": false
      }
    ]
  }
]
```

## Raw JSON

```json
{
  "section_id": "1.4-2",
  "section_title": "1.4-2 The Unit Impulse Function δ(t)",
  "difficulty": "intermediate",
  "estimated_read_minutes": 8,
  "learning_objectives": [
    "Define the unit impulse function by its zero-width, unit-area behavior.",
    "Recognize impulse approximations as pulses whose width shrinks while area stays fixed.",
    "Use the multiplication property to simplify expressions containing impulses.",
    "Use the sampling property to evaluate integrals containing impulses.",
    "Understand why the impulse is treated as a generalized function and how it connects to the unit step."
  ],
  "visualization_need": {
    "level": "interactive",
    "reason": [
      "depends_on_parameter_change",
      "formula_to_phenomenon_gap",
      "student_should_manipulate_to_understand"
    ],
    "recommended_assets": [
      "textbook_figure",
      "react_canvas_demo"
    ]
  },
  "visual_plan": {
    "primary_anchor": "both",
    "rationale": "The section already includes a canonical textbook impulse diagram showing the arrow symbol and rectangular-pulse limit, so that should be used first. The limiting process is parameter-dependent, so a React Canvas demo is also needed to let students see width shrink, height grow, and area remain constant.",
    "cram": "Use the visuals to recognize that an impulse is judged by area and location, not by ordinary height.",
    "standard": "Use the textbook figure for the core picture, then the demo to connect shrinking pulse width with fixed unit area.",
    "top_score": "Use the demo to compare rectangular, exponential, triangular, and Gaussian approximations and notice that shape is not the defining feature."
  },
  "blocks": [
    {
      "type": "text_explanation",
      "instruction": "Render a minimal overview page only. Use exactly two short sections: (1) 'Section Objective' with one sentence: 'Learn how the unit impulse \\(\\delta(t)\\) represents a zero-duration signal with finite area, and how it samples functions inside products and integrals.' (2) 'Concepts In This Section' as a bullet list of concept names only: 'unit impulse definition', 'pulse approximations', 'impulse strength', 'multiplication property', 'sampling property', 'generalized function view', 'unit step connection'. Do not add any expanded background paragraph."
    },
    {
      "type": "book_image",
      "source_page": "page-086",
      "fig_id": "unknown",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Focus on the arrow at \\(t=0\\) and the phrase 'unit area'.",
        "standard": "Use the rectangular pulse limit to connect width, height, and area.",
        "top_score": "Emphasize that the impulse is not a normal finite-height function at \\(t=0\\)."
      },
      "caption_instruction": "One sentence: show the unit impulse symbol and its rectangular-pulse limiting interpretation.",
      "description_instruction": "Describe the left plot as a spear-like arrow at \\(t=0\\) representing \\(\\delta(t)\\). Describe the right plot as a rectangle whose width \\(\\varepsilon\\) shrinks while height \\(1/\\varepsilon\\) grows, so the area remains 1. Tell students to notice that the area, not the height, is the meaningful quantity."
    },
    {
      "type": "math_block",
      "latex": "\\delta(t)=0\\ \\text{for }t\\ne 0,\\qquad \\int_{-\\infty}^{\\infty}\\delta(t)\\,dt=1\\tag{1.9}",
      "explanation_instruction": "Start this page with heading '## 1. Unit impulse definition'. Explain in 100-140 words that \\(\\delta(t)\\) is zero everywhere except at \\(t=0\\), where it is not treated as an ordinary finite value. Define the unit impulse by its total area of 1. Explain symbols: \\(t\\) is time, \\(\\delta(t)\\) is located at zero, and the integral gives area. State when to use it: when a problem contains an idealized instantaneous signal or an impulse in an integral. Exam trigger: look for \\(\\delta(t)\\), \\(\\delta(t-T)\\), or a very narrow unit-area pulse. Common misuse: saying the impulse has height 1; its area is 1, not its height. Include the minimal example: \\(5\\delta(t)\\) has area 5, so its impulse strength is 5."
    },
    {
      "type": "interactive_demo",
      "tool": "react_canvas_demo",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the slider to remember: narrower pulse means taller pulse, but area stays fixed.",
        "standard": "Let students compare one rectangular pulse and one exponential pulse while watching the area label remain 1.",
        "top_score": "Allow switching among rectangular, triangular, exponential, and Gaussian approximations to show that shape is not the defining property."
      },
      "instruction": "Create a React + Canvas demo titled 'Impulse as a limit of unit-area pulses'. Include a slider labeled 'width parameter' or 'sharpness parameter'. Show a time axis centered at 0. Provide four selectable pulse types: rectangular, triangular, one-sided exponential \\(\\alpha e^{-\\alpha t}u(t)\\), and Gaussian. For each selected pulse, animate or redraw the pulse as the parameter changes so that it becomes narrower and taller while an on-screen area readout stays approximately 'Area = 1'. Include the supporting formula for the exponential case as display text near the demo: \\(\\int_0^\\infty \\alpha e^{-\\alpha t}\\,dt=1\\). Add a short note below the demo: 'Different shapes can approach the same impulse if their duration goes to 0 while their area stays 1.' Do not add decorative effects."
    },
    {
      "type": "math_block",
      "latex": "\\phi(t)\\delta(t-T)=\\phi(T)\\delta(t-T)\\tag{1.10}",
      "explanation_instruction": "Start this page with heading '## 2. Multiplication property'. Explain in 100-140 words that an impulse located at \\(t=T\\) only keeps the value of the continuous function at that exact location. Define symbols: \\(\\phi(t)\\) is any function continuous at \\(T\\), \\(T\\) is the impulse location, and \\(\\phi(T)\\) becomes the impulse strength. When to use it: simplifying products such as \\((t^3+3)\\delta(t)\\) or \\(e^{-2t}\\delta(t)\\). Exam trigger: a function multiplying \\(\\delta(t-T)\\). Common misuse: substituting \\(t=0\\) automatically even when the impulse is \\(\\delta(t-T)\\). Include the representative example: \\((t^3+3)\\delta(t)=3\\delta(t)\\), because the impulse is at \\(t=0\\)."
    },
    {
      "type": "math_block",
      "latex": "\\int_{-\\infty}^{\\infty}\\phi(t)\\delta(t-T)\\,dt=\\phi(T)\\tag{1.11}",
      "explanation_instruction": "Start this page with heading '## 3. Sampling property'. Explain in 110-150 words that the impulse inside an integral 'samples' the value of the function at the impulse location. Define symbols clearly: \\(\\phi(t)\\) is the sampled function, \\(\\delta(t-T)\\) is an impulse at \\(t=T\\), and the integral collapses to \\(\\phi(T)\\). When to use it: any integral over a range that includes \\(T\\). Exam trigger: \\(\\int \\phi(t)\\delta(t-T)dt\\). Common misuse: evaluating at the wrong point or ignoring whether the integration interval includes the impulse location. Include the worked example: \\(\\int_{-\\infty}^{\\infty}\\delta(t-2)\\cos(\\pi t/4)\\,dt=\\cos(\\pi/2)=0\\)."
    },
    {
      "type": "math_block",
      "latex": "\\frac{d}{dt}u(t)=\\delta(t)",
      "explanation_instruction": "Start this page with heading '## 4. Generalized-function view'. Explain in 100-140 words that the impulse is not an ordinary function because its important point, \\(t=0\\), is undefined in the usual value-by-value sense. Instead, it is defined by what it does inside integrals: it samples test functions. Then connect this to the unit step: the derivative of the jump in \\(u(t)\\) is an impulse, and integrating \\(\\delta(t)\\) gives the unit step. Use one concise example: 'A jump of height 1 creates \\(\\delta(t)\\); a jump of height 5 creates \\(5\\delta(t)\\).' Exam note: do not treat \\(\\delta(0)\\) as a normal number."
    },
    {
      "type": "section_summary",
      "instruction": "Create a recap page titled '📌 Key Takeaways'. Include 4-5 bullets, each ≤25 words. The summary must explicitly include these formulas: \\(\\delta(t)=0\\) for \\(t\\ne0\\), \\(\\int_{-\\infty}^{\\infty}\\delta(t)dt=1\\), \\(\\phi(t)\\delta(t-T)=\\phi(T)\\delta(t-T)\\), \\(\\int_{-\\infty}^{\\infty}\\phi(t)\\delta(t-T)dt=\\phi(T)\\), and \\(\\frac{d}{dt}u(t)=\\delta(t)\\). Also include the idea that \\(k\\delta(t)\\) has area/strength \\(k\\). End with one bridge sentence: 'Next, we will use impulse and related singularity functions to model signals more compactly.'"
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
          "id": "unit_impulse_definition",
          "label": "Unit impulse definition and strength",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Which statement best describes the unit impulse \\(\\delta(t)\\)?",
              "options": [
                "A. It has height 1 at \\(t=0\\) and is zero elsewhere.",
                "B. It is zero for \\(t\\ne0\\) and has total area 1.",
                "C. It is a rectangular pulse of fixed width 1.",
                "D. It is equal to the unit step function."
              ],
              "correct_option": "B",
              "explanation": "The unit impulse is defined by being zero away from its location and having unit area. Its value at the impulse location is not treated as an ordinary finite height.",
              "wrong_option_explanations": {
                "A": "The area is 1, not the height.",
                "C": "Rectangular pulses are only approximations when their width shrinks and height grows.",
                "D": "The unit step is related by integration/differentiation, but it is not the impulse."
              },
              "hint": "Ask whether the number 1 describes height or area.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "What is the strength, or area, of \\(7\\delta(t)\\)?",
              "options": [
                "A. 0",
                "B. 1",
                "C. 7",
                "D. Undefined, so it cannot have area"
              ],
              "correct_option": "C",
              "explanation": "Multiplying a unit impulse by 7 scales its area from 1 to 7.",
              "wrong_option_explanations": {
                "A": "The impulse is zero away from its location, but its total area is not zero.",
                "B": "Only \\(\\delta(t)\\) has unit area; \\(7\\delta(t)\\) has area 7.",
                "D": "The value at the impulse location is undefined, but the impulse strength is still defined."
              },
              "hint": "The coefficient in front of the impulse is its strength.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "impulse_approximation",
          "label": "Pulse approximations to the impulse",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "In the interactive demo, as a rectangular unit-area pulse becomes narrower, what must happen to its height?",
              "options": [
                "A. It must decrease so the area stays 1.",
                "B. It must increase so the area stays 1.",
                "C. It must stay exactly 1.",
                "D. It must become negative."
              ],
              "correct_option": "B",
              "explanation": "For a unit-area pulse, area equals width times height. If width shrinks, height must grow to keep area fixed.",
              "wrong_option_explanations": {
                "A": "If both width and height decrease, the area would go to 0.",
                "C": "Height 1 with shrinking width would make the area shrink.",
                "D": "A standard positive impulse approximation does not require negative height."
              },
              "hint": "For a rectangle, area = width × height.",
              "needs_visual": true,
              "visual_type": "demo_observation_check",
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "multiplication_property",
          "label": "Multiplication by an impulse",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "Simplify \\((t^2+4)\\delta(t-3)\\).",
              "options": [
                "A. \\(4\\delta(t-3)\\)",
                "B. \\(13\\delta(t-3)\\)",
                "C. \\((t^2+4)\\delta(t)\\)",
                "D. \\(13\\)"
              ],
              "correct_option": "B",
              "explanation": "The impulse \\(\\delta(t-3)\\) is located at \\(t=3\\), so evaluate \\(t^2+4\\) at 3: \\(9+4=13\\).",
              "wrong_option_explanations": {
                "A": "This incorrectly evaluates at \\(t=0\\).",
                "C": "The impulse location does not change from \\(t=3\\) to \\(t=0\\).",
                "D": "The result is still an impulse; only its strength becomes 13."
              },
              "hint": "Use the location inside \\(\\delta(t-T)\\), not automatically zero.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp3_q2",
              "type": "short_answer",
              "stem": "A student simplifies \\(\\sin(t)\\delta(t-\\pi)\\) as \\(0\\delta(t-\\pi)\\) because \\(\\sin(0)=0\\). Explain the mistake.",
              "ideal_answer": "The impulse \\(\\delta(t-\\pi)\\) is located at \\(t=\\pi\\), so the function must be evaluated at \\(t=\\pi\\), not at 0. Since \\(\\sin(\\pi)=0\\), the final result is still 0, but the reasoning was wrong.",
              "grading_rubric": [
                "Must identify the impulse location as \\(t=\\pi\\)",
                "Must state that the function should be evaluated at the impulse location",
                "Must distinguish correct answer from correct reasoning"
              ],
              "explanation": "This checks whether the student is applying the property deliberately rather than always plugging in zero.",
              "hint": "Look at the shift in \\(\\delta(t-T)\\).",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "sampling_property",
          "label": "Sampling property in integrals",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp4_q1",
              "type": "multiple_choice",
              "stem": "Evaluate \\(\\int_{-\\infty}^{\\infty} e^{-2t}\\delta(t-1)\\,dt\\).",
              "options": [
                "A. \\(1\\)",
                "B. \\(e^{-2}\\)",
                "C. \\(e^{2}\\)",
                "D. \\(0\\)"
              ],
              "correct_option": "B",
              "explanation": "The impulse samples the function at \\(t=1\\), so the integral equals \\(e^{-2(1)}=e^{-2}\\).",
              "wrong_option_explanations": {
                "A": "The integral of the impulse alone is 1, but here it samples \\(e^{-2t}\\).",
                "C": "The exponent sign was reversed.",
                "D": "The impulse lies inside the integration interval, so the result is not zero."
              },
              "hint": "Replace \\(t\\) in the non-impulse function by the impulse location.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp4_q2",
              "type": "multiple_choice",
              "stem": "Evaluate \\(\\int_{-\\infty}^{\\infty}\\delta(t-2)\\cos(\\pi t/4)\\,dt\\).",
              "options": [
                "A. \\(0\\)",
                "B. \\(1\\)",
                "C. \\(\\cos(\\pi/4)\\)",
                "D. \\(2\\)"
              ],
              "correct_option": "A",
              "explanation": "The impulse is at \\(t=2\\), so the integral equals \\(\\cos(\\pi\\cdot2/4)=\\cos(\\pi/2)=0\\).",
              "wrong_option_explanations": {
                "B": "That would be the area of the impulse alone, not the sampled function value.",
                "C": "This evaluates at \\(t=1\\), not \\(t=2\\).",
                "D": "The impulse location is not the value of the integral."
              },
              "hint": "The answer is the function value at \\(t=2\\).",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "generalized_function_connection",
          "label": "Generalized function and unit step connection",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp5_q1",
              "type": "multiple_choice",
              "stem": "Why is \\(\\delta(t)\\) treated as a generalized function rather than an ordinary function?",
              "options": [
                "A. Because it is periodic.",
                "B. Because its ordinary value at \\(t=0\\) is not finite, but its effect inside integrals is well-defined.",
                "C. Because it is always equal to zero.",
                "D. Because it can only be used in discrete time."
              ],
              "correct_option": "B",
              "explanation": "The impulse is defined by its sampling action in integrals, not by an ordinary pointwise value at every time.",
              "wrong_option_explanations": {
                "A": "Periodicity is not the issue.",
                "C": "It is zero away from its location, but its area/effect is not zero.",
                "D": "This section is about continuous-time impulses."
              },
              "hint": "Think about what is undefined and what remains useful.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp5_q2",
              "type": "multiple_choice",
              "stem": "Which relationship connects the unit step and the unit impulse?",
              "options": [
                "A. \\(u(t)=\\delta(t)\\)",
                "B. \\(\\frac{d}{dt}u(t)=\\delta(t)\\)",
                "C. \\(\\frac{d}{dt}\\delta(t)=u(t)\\)",
                "D. \\(u(t)\\delta(t)=0\\) always"
              ],
              "correct_option": "B",
              "explanation": "In the generalized-function sense, the derivative of the unit step is the unit impulse.",
              "wrong_option_explanations": {
                "A": "The unit step and impulse are related but not equal.",
                "C": "This reverses the relationship incorrectly.",
                "D": "Products involving discontinuities at the impulse location require care and are not the main relationship here."
              },
              "hint": "A jump creates an impulse when differentiated.",
              "needs_visual": true,
              "visual_type": "structure_comparison_check",
              "same_point_variant": false
            }
          ]
        }
      ]
    }
  ]
}
```
