# Agent A Preview: 1.4-1 1.4-1 The Unit Step Function u(t)

- Difficulty: beginner
- Estimated read minutes: 7

## Learning Objectives

- Define the unit step function and read its value from time intervals.
- Use shifted step functions to turn signal pieces on and off.
- Represent rectangular pulses and simple piecewise signals with unit step functions.
- Recognize reflected step functions such as u(-t) and left-sided signals.

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
    "react_canvas_demo",
    "textbook_figures",
    "latex_native_visuals"
  ]
}
```

## Visual Plan

```json
{
  "primary_anchor": "both",
  "rationale": "The unit step is definition-first, so the exact formula should be taught with LaTeX first. But shifted and reflected steps are much easier to understand by seeing the jump move along the time axis, so an interactive time-domain demo is justified. The textbook already provides a strong canonical rectangular-pulse figure, so use that instead of generating a replacement image.",
  "cram": "Use the visual jump locations to quickly identify which u(t-a) terms start or stop each interval.",
  "standard": "Use the formula, demo, and Fig. 1.15 together: define the step, move it, then build one representative pulse.",
  "top_score": "Use the demo to test subtle cases: negative shifts, u(-t), and whether an endpoint belongs to the left or right interval."
}
```

## Planned Blocks

### Block 1: `text_explanation`
- **instruction**: Create the first lesson page as a compact outline only. Use exactly two short sections: 'Section Objective' and 'Concepts In This Section'. Under Section Objective, write one sentence: 'Learn how the unit step function u(t) turns signals on, off, shifts them in time, and represents piecewise waveforms.' Under Concepts In This Section, list only these concept names as bullets: unit step function; shifted steps; rectangular pulse; piecewise signal gating; reflected step u(-t). Do not add background paragraphs or explanations.

### Block 2: `math_block`
- **latex**: u(t)=\begin{cases}0, & t<0\\1, & t\ge 0\end{cases}
- **explanation_instruction**: Start a new knowledge-point page titled '## 1. The unit step: an on-switch at t=0'. Explain in 90-130 words that u(t) is a switch: before t=0 it is off, and at/after t=0 it is on. Define t as time and u(t) as the signal value. State that the textbook uses the common convention u(0)=1. Use a minimal example: u(-2)=0 and u(3)=1. Exam trigger: whenever a signal starts at a specific time, expect a unit step. Common misuse: treating u(t) like a smooth ramp; it jumps instantly.

### Block 3: `interactive_demo`
- **title**: Move and flip the unit step
- **teaching_role**: concept_anchor
- **mode_specific_visual_use**:
```json
{
  "cram": "Drag the shift slider until the jump location matches the exam graph.",
  "standard": "Use the slider to connect u(t-a) with a jump at t=a, then compare with u(-t).",
  "top_score": "Test negative a values and the reflected case to avoid sign errors."
}
```
- **demo_instruction**: Build a React + Canvas time-domain demo with a horizontal t-axis from -6 to 6 and vertical levels 0 and 1. Include three selectable modes: u(t-a), -u(t-a), and u(-t). Include a slider for a from -4 to 4 in steps of 0.5. Draw the step in navy, mark the jump location with a muted red vertical dashed line, and display the active formula above the graph. Add a short observation box: 'For u(t-a), the jump happens where t-a=0, so t=a.' Keep the demo visually clean and lecture-note styled.

### Block 4: `math_block`
- **latex**: x(t)=u(t-2)-u(t-4)
- **explanation_instruction**: Start a new knowledge-point page titled '## 2. Build a rectangular pulse by subtracting steps'. Explain in 100-150 words that u(t-2) turns the signal on at t=2, while -u(t-4) turns it off at t=4. Show the representative example in words: before 2 both terms give 0, from 2 to 4 only u(t-2) contributes 1, and after 4 the two terms cancel to 0. Exam trigger: a flat pulse from a to b usually looks like u(t-a)-u(t-b). Common misuse: writing u(t+2)-u(t+4), which shifts the pulse to the left instead of placing it at t=2 to t=4.

### Block 5: `book_image`
- **source_page**: page-083
- **fig_id**: Fig. 1.15
- **teaching_role**: example_support
- **mode_specific_visual_use**:
```json
{
  "cram": "Recognize the pulse as 'turn on at 2, turn off at 4'.",
  "standard": "Connect the formula x(t)=u(t-2)-u(t-4) to the graph panel by panel.",
  "top_score": "Use the component plot to explain cancellation after t=4."
}
```
- **caption_instruction**: One sentence: Fig. 1.15 shows how x(t)=u(t-2)-u(t-4) creates a unit-height rectangular pulse from t=2 to t=4.
- **description_instruction**: Describe the two panels clearly. Panel (a) is the resulting pulse: zero before t=2, height 1 from t=2 to t=4, and zero after t=4. Panel (b) shows the two component steps, u(t-2) and -u(t-4), whose sum creates the pulse. Tell students to notice that the second step does not create a negative final value; it cancels the first step after t=4.

### Block 6: `math_block`
- **latex**: x(t)=t\,[u(t)-u(t-2)]-2(t-3)\,[u(t-2)-u(t-3)]
- **explanation_instruction**: Start a new knowledge-point page titled '## 3. Gate each piece of a piecewise signal'. Explain in 110-160 words that a bracket like u(t-a)-u(t-b) acts like a time window: it keeps the attached formula active between a and b and shuts it off elsewhere. Use the triangle example from the textbook: t is active from 0 to 2, and -2(t-3) is active from 2 to 3. Define the symbols: t is time, each bracket is an on/off gate, and the expression beside the bracket is the local formula for that interval. Exam trigger: when a graph has different formulas on different intervals, multiply each interval formula by a step-window. Common misuse: forgetting the window and letting a line continue outside its intended interval.

### Block 7: `math_block`
- **latex**: u(-t)=\begin{cases}1, & t\le 0\\0, & t>0\end{cases}
- **explanation_instruction**: Start a new knowledge-point page titled '## 4. Reflected steps are left-sided'. Explain in 90-130 words that replacing t by -t flips the step around the vertical axis. So u(-t) is on for times to the left of zero and off after zero. Give the representative example: u(-3)=1 because -3 is left of zero, but u(2)=0 for the reflected step. Add the related signal e^{-at}u(-t): the exponential is kept only for t≤0 because u(-t) gates out everything for t>0. Exam trigger: u(-t) means left-sided support. Common misuse: thinking the minus sign changes the height instead of reversing the time direction.

### Block 8: `section_summary`
- **instruction**: Create a recap page titled '📌 Key Takeaways'. Use 5 compact bullets, each ≤24 words, and include the core formulas explicitly. Include these formulas exactly: \(u(t)=0\) for \(t<0\), \(u(t)=1\) for \(t\ge0\); \(u(t-a)\) jumps at \(t=a\); \(u(t-a)-u(t-b)\) gates the interval from \(a\) to \(b\); \(x(t)=u(t-2)-u(t-4)\) makes a pulse from 2 to 4; \(u(-t)=1\) for \(t\le0\) and \(0\) for \(t>0\). End with one sentence: 'Next, the unit impulse will let us model signals concentrated at a single instant.'

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
    "id": "unit_step_definition",
    "label": "Definition and values of u(t)",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp1_q1",
        "type": "multiple_choice",
        "stem": "Using the textbook convention, what are u(-1), u(0), and u(5)?",
        "options": [
          "A. 0, 0, 1",
          "B. 0, 1, 1",
          "C. 1, 1, 0",
          "D. 1, 0, 0"
        ],
        "correct_option": "B",
        "explanation": "The unit step is 0 for t<0 and 1 for t≥0, so u(-1)=0, u(0)=1, and u(5)=1.",
        "wrong_option_explanations": {
          "A": "This uses u(0)=0, but the lesson uses the textbook convention u(0)=1.",
          "C": "This reverses the off/on regions.",
          "D": "This reverses the step and also gives the wrong value at t=0."
        },
        "hint": "Check whether the time is before zero or at/after zero.",
        "needs_visual": false,
        "same_point_variant": true
      },
      {
        "id": "kp1_q2",
        "type": "multiple_choice",
        "stem": "Which statement best describes u(t) as a signal?",
        "options": [
          "A. A ramp that increases linearly after t=0",
          "B. A switch that jumps from 0 to 1 at t=0",
          "C. A pulse that is 1 only between two finite times",
          "D. A signal that is always equal to 1"
        ],
        "correct_option": "B",
        "explanation": "The unit step is an on-switch: it is 0 before t=0 and 1 at and after t=0.",
        "wrong_option_explanations": {
          "A": "A ramp grows gradually; a unit step jumps instantly.",
          "C": "A finite pulse usually needs two step functions, not just u(t).",
          "D": "u(t) is not 1 for negative time."
        },
        "hint": "A step changes level suddenly; it does not slope.",
        "needs_visual": true,
        "visual_type": "latex_native_step_sketch",
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "shifted_step",
    "label": "Shifted unit step u(t-a)",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp2_q1",
        "type": "multiple_choice",
        "stem": "At what time does u(t-3) jump from 0 to 1?",
        "options": [
          "A. t=-3",
          "B. t=0",
          "C. t=3",
          "D. It never jumps"
        ],
        "correct_option": "C",
        "explanation": "Set the inside equal to zero: t-3=0, so the jump occurs at t=3.",
        "wrong_option_explanations": {
          "A": "That would match u(t+3), not u(t-3).",
          "B": "Only u(t) jumps at zero.",
          "D": "A shifted step still has one jump."
        },
        "hint": "Solve t-a=0.",
        "needs_visual": true,
        "visual_type": "interactive_demo_observation",
        "same_point_variant": true
      },
      {
        "id": "kp2_q2",
        "type": "multiple_choice",
        "stem": "Which expression turns on at t=-2?",
        "options": [
          "A. u(t-2)",
          "B. u(t+2)",
          "C. u(2-t)",
          "D. -u(t-2)"
        ],
        "correct_option": "B",
        "explanation": "u(t+2) jumps when t+2=0, so the jump is at t=-2.",
        "wrong_option_explanations": {
          "A": "u(t-2) turns on at t=2.",
          "C": "u(2-t) is reflected; it is on to the left of t=2, not a normal right-sided turn-on at -2.",
          "D": "-u(t-2) changes the sign of the height, not the jump location."
        },
        "hint": "Find where the argument of u equals zero.",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "rectangular_pulse",
    "label": "Rectangular pulse from two steps",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp3_q1",
        "type": "multiple_choice",
        "stem": "Which expression represents a unit-height pulse that is on from t=2 to t=4 and zero elsewhere?",
        "options": [
          "A. u(t-2)+u(t-4)",
          "B. u(t-2)-u(t-4)",
          "C. u(t+2)-u(t+4)",
          "D. u(t-4)-u(t-2)"
        ],
        "correct_option": "B",
        "explanation": "u(t-2) turns the pulse on at 2, and -u(t-4) turns it back off at 4.",
        "wrong_option_explanations": {
          "A": "After t=4, the value becomes 2, not 0.",
          "C": "This creates a pulse from -2 to -4 in the wrong time region.",
          "D": "This gives a negative pulse between 2 and 4."
        },
        "hint": "Use first step to turn on, second step to cancel.",
        "needs_visual": true,
        "visual_type": "book_figure_Fig_1_15",
        "same_point_variant": true
      },
      {
        "id": "kp3_q2",
        "type": "short_answer",
        "stem": "Explain why x(t)=u(t-2)-u(t-4) becomes zero again after t=4.",
        "ideal_answer": "After t=4, both u(t-2) and u(t-4) equal 1, so their difference is 1-1=0. The second step cancels the first step.",
        "grading_rubric": [
          "Must state that both steps equal 1 after t=4",
          "Must compute or describe the cancellation",
          "Must not say the signal stays at 1 after t=4"
        ],
        "explanation": "This checks whether the student understands subtraction of steps instead of memorizing the pulse formula.",
        "hint": "Evaluate both step functions for a time such as t=5.",
        "needs_visual": true,
        "visual_type": "book_figure_Fig_1_15",
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "piecewise_gating",
    "label": "Using step windows for piecewise signals",
    "importance": "medium",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp4_q1",
        "type": "multiple_choice",
        "stem": "What does the factor [u(t)-u(t-2)] do in t[u(t)-u(t-2)]?",
        "options": [
          "A. It keeps t active only from t=0 to t=2",
          "B. It shifts t two units to the right",
          "C. It changes the slope from +1 to -1",
          "D. It makes the signal nonzero for all t>2"
        ],
        "correct_option": "A",
        "explanation": "The bracket is a window: u(t) turns on at 0, and -u(t-2) turns it off at 2.",
        "wrong_option_explanations": {
          "B": "The t outside the bracket is not shifted; the bracket gates it.",
          "C": "The bracket controls the interval, not the slope of t.",
          "D": "For t>2, both steps are 1, so the bracket becomes 0."
        },
        "hint": "Evaluate the bracket before 0, between 0 and 2, and after 2.",
        "needs_visual": false,
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "reflected_step",
    "label": "Reflected step u(-t)",
    "importance": "medium",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp5_q1",
        "type": "multiple_choice",
        "stem": "Which statement correctly describes u(-t)?",
        "options": [
          "A. It is 1 for t≤0 and 0 for t>0",
          "B. It is 0 for t≤0 and 1 for t>0",
          "C. It is -1 for t≥0",
          "D. It is a ramp with negative slope"
        ],
        "correct_option": "A",
        "explanation": "u(-t) is the time-reflected unit step, so it is left-sided: on for t≤0 and off for t>0.",
        "wrong_option_explanations": {
          "B": "That describes the usual right-sided step u(t), not u(-t).",
          "C": "The minus sign is inside the argument, so it reflects time; it does not make the height negative.",
          "D": "A reflected step still jumps; it does not become a ramp."
        },
        "hint": "The minus sign inside u( ) flips time, not amplitude.",
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
  "section_id": "1.4-1",
  "section_title": "1.4-1 The Unit Step Function u(t)",
  "difficulty": "beginner",
  "estimated_read_minutes": 7,
  "learning_objectives": [
    "Define the unit step function and read its value from time intervals.",
    "Use shifted step functions to turn signal pieces on and off.",
    "Represent rectangular pulses and simple piecewise signals with unit step functions.",
    "Recognize reflected step functions such as u(-t) and left-sided signals."
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
      "react_canvas_demo",
      "textbook_figures",
      "latex_native_visuals"
    ]
  },
  "visual_plan": {
    "primary_anchor": "both",
    "rationale": "The unit step is definition-first, so the exact formula should be taught with LaTeX first. But shifted and reflected steps are much easier to understand by seeing the jump move along the time axis, so an interactive time-domain demo is justified. The textbook already provides a strong canonical rectangular-pulse figure, so use that instead of generating a replacement image.",
    "cram": "Use the visual jump locations to quickly identify which u(t-a) terms start or stop each interval.",
    "standard": "Use the formula, demo, and Fig. 1.15 together: define the step, move it, then build one representative pulse.",
    "top_score": "Use the demo to test subtle cases: negative shifts, u(-t), and whether an endpoint belongs to the left or right interval."
  },
  "blocks": [
    {
      "type": "text_explanation",
      "instruction": "Create the first lesson page as a compact outline only. Use exactly two short sections: 'Section Objective' and 'Concepts In This Section'. Under Section Objective, write one sentence: 'Learn how the unit step function u(t) turns signals on, off, shifts them in time, and represents piecewise waveforms.' Under Concepts In This Section, list only these concept names as bullets: unit step function; shifted steps; rectangular pulse; piecewise signal gating; reflected step u(-t). Do not add background paragraphs or explanations."
    },
    {
      "type": "math_block",
      "latex": "u(t)=\\begin{cases}0, & t<0\\\\1, & t\\ge 0\\end{cases}",
      "explanation_instruction": "Start a new knowledge-point page titled '## 1. The unit step: an on-switch at t=0'. Explain in 90-130 words that u(t) is a switch: before t=0 it is off, and at/after t=0 it is on. Define t as time and u(t) as the signal value. State that the textbook uses the common convention u(0)=1. Use a minimal example: u(-2)=0 and u(3)=1. Exam trigger: whenever a signal starts at a specific time, expect a unit step. Common misuse: treating u(t) like a smooth ramp; it jumps instantly."
    },
    {
      "type": "interactive_demo",
      "title": "Move and flip the unit step",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Drag the shift slider until the jump location matches the exam graph.",
        "standard": "Use the slider to connect u(t-a) with a jump at t=a, then compare with u(-t).",
        "top_score": "Test negative a values and the reflected case to avoid sign errors."
      },
      "demo_instruction": "Build a React + Canvas time-domain demo with a horizontal t-axis from -6 to 6 and vertical levels 0 and 1. Include three selectable modes: u(t-a), -u(t-a), and u(-t). Include a slider for a from -4 to 4 in steps of 0.5. Draw the step in navy, mark the jump location with a muted red vertical dashed line, and display the active formula above the graph. Add a short observation box: 'For u(t-a), the jump happens where t-a=0, so t=a.' Keep the demo visually clean and lecture-note styled."
    },
    {
      "type": "math_block",
      "latex": "x(t)=u(t-2)-u(t-4)",
      "explanation_instruction": "Start a new knowledge-point page titled '## 2. Build a rectangular pulse by subtracting steps'. Explain in 100-150 words that u(t-2) turns the signal on at t=2, while -u(t-4) turns it off at t=4. Show the representative example in words: before 2 both terms give 0, from 2 to 4 only u(t-2) contributes 1, and after 4 the two terms cancel to 0. Exam trigger: a flat pulse from a to b usually looks like u(t-a)-u(t-b). Common misuse: writing u(t+2)-u(t+4), which shifts the pulse to the left instead of placing it at t=2 to t=4."
    },
    {
      "type": "book_image",
      "source_page": "page-083",
      "fig_id": "Fig. 1.15",
      "teaching_role": "example_support",
      "mode_specific_visual_use": {
        "cram": "Recognize the pulse as 'turn on at 2, turn off at 4'.",
        "standard": "Connect the formula x(t)=u(t-2)-u(t-4) to the graph panel by panel.",
        "top_score": "Use the component plot to explain cancellation after t=4."
      },
      "caption_instruction": "One sentence: Fig. 1.15 shows how x(t)=u(t-2)-u(t-4) creates a unit-height rectangular pulse from t=2 to t=4.",
      "description_instruction": "Describe the two panels clearly. Panel (a) is the resulting pulse: zero before t=2, height 1 from t=2 to t=4, and zero after t=4. Panel (b) shows the two component steps, u(t-2) and -u(t-4), whose sum creates the pulse. Tell students to notice that the second step does not create a negative final value; it cancels the first step after t=4."
    },
    {
      "type": "math_block",
      "latex": "x(t)=t\\,[u(t)-u(t-2)]-2(t-3)\\,[u(t-2)-u(t-3)]",
      "explanation_instruction": "Start a new knowledge-point page titled '## 3. Gate each piece of a piecewise signal'. Explain in 110-160 words that a bracket like u(t-a)-u(t-b) acts like a time window: it keeps the attached formula active between a and b and shuts it off elsewhere. Use the triangle example from the textbook: t is active from 0 to 2, and -2(t-3) is active from 2 to 3. Define the symbols: t is time, each bracket is an on/off gate, and the expression beside the bracket is the local formula for that interval. Exam trigger: when a graph has different formulas on different intervals, multiply each interval formula by a step-window. Common misuse: forgetting the window and letting a line continue outside its intended interval."
    },
    {
      "type": "math_block",
      "latex": "u(-t)=\\begin{cases}1, & t\\le 0\\\\0, & t>0\\end{cases}",
      "explanation_instruction": "Start a new knowledge-point page titled '## 4. Reflected steps are left-sided'. Explain in 90-130 words that replacing t by -t flips the step around the vertical axis. So u(-t) is on for times to the left of zero and off after zero. Give the representative example: u(-3)=1 because -3 is left of zero, but u(2)=0 for the reflected step. Add the related signal e^{-at}u(-t): the exponential is kept only for t≤0 because u(-t) gates out everything for t>0. Exam trigger: u(-t) means left-sided support. Common misuse: thinking the minus sign changes the height instead of reversing the time direction."
    },
    {
      "type": "section_summary",
      "instruction": "Create a recap page titled '📌 Key Takeaways'. Use 5 compact bullets, each ≤24 words, and include the core formulas explicitly. Include these formulas exactly: \\(u(t)=0\\) for \\(t<0\\), \\(u(t)=1\\) for \\(t\\ge0\\); \\(u(t-a)\\) jumps at \\(t=a\\); \\(u(t-a)-u(t-b)\\) gates the interval from \\(a\\) to \\(b\\); \\(x(t)=u(t-2)-u(t-4)\\) makes a pulse from 2 to 4; \\(u(-t)=1\\) for \\(t\\le0\\) and \\(0\\) for \\(t>0\\). End with one sentence: 'Next, the unit impulse will let us model signals concentrated at a single instant.'"
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
          "id": "unit_step_definition",
          "label": "Definition and values of u(t)",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Using the textbook convention, what are u(-1), u(0), and u(5)?",
              "options": [
                "A. 0, 0, 1",
                "B. 0, 1, 1",
                "C. 1, 1, 0",
                "D. 1, 0, 0"
              ],
              "correct_option": "B",
              "explanation": "The unit step is 0 for t<0 and 1 for t≥0, so u(-1)=0, u(0)=1, and u(5)=1.",
              "wrong_option_explanations": {
                "A": "This uses u(0)=0, but the lesson uses the textbook convention u(0)=1.",
                "C": "This reverses the off/on regions.",
                "D": "This reverses the step and also gives the wrong value at t=0."
              },
              "hint": "Check whether the time is before zero or at/after zero.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "Which statement best describes u(t) as a signal?",
              "options": [
                "A. A ramp that increases linearly after t=0",
                "B. A switch that jumps from 0 to 1 at t=0",
                "C. A pulse that is 1 only between two finite times",
                "D. A signal that is always equal to 1"
              ],
              "correct_option": "B",
              "explanation": "The unit step is an on-switch: it is 0 before t=0 and 1 at and after t=0.",
              "wrong_option_explanations": {
                "A": "A ramp grows gradually; a unit step jumps instantly.",
                "C": "A finite pulse usually needs two step functions, not just u(t).",
                "D": "u(t) is not 1 for negative time."
              },
              "hint": "A step changes level suddenly; it does not slope.",
              "needs_visual": true,
              "visual_type": "latex_native_step_sketch",
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "shifted_step",
          "label": "Shifted unit step u(t-a)",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "At what time does u(t-3) jump from 0 to 1?",
              "options": [
                "A. t=-3",
                "B. t=0",
                "C. t=3",
                "D. It never jumps"
              ],
              "correct_option": "C",
              "explanation": "Set the inside equal to zero: t-3=0, so the jump occurs at t=3.",
              "wrong_option_explanations": {
                "A": "That would match u(t+3), not u(t-3).",
                "B": "Only u(t) jumps at zero.",
                "D": "A shifted step still has one jump."
              },
              "hint": "Solve t-a=0.",
              "needs_visual": true,
              "visual_type": "interactive_demo_observation",
              "same_point_variant": true
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "Which expression turns on at t=-2?",
              "options": [
                "A. u(t-2)",
                "B. u(t+2)",
                "C. u(2-t)",
                "D. -u(t-2)"
              ],
              "correct_option": "B",
              "explanation": "u(t+2) jumps when t+2=0, so the jump is at t=-2.",
              "wrong_option_explanations": {
                "A": "u(t-2) turns on at t=2.",
                "C": "u(2-t) is reflected; it is on to the left of t=2, not a normal right-sided turn-on at -2.",
                "D": "-u(t-2) changes the sign of the height, not the jump location."
              },
              "hint": "Find where the argument of u equals zero.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "rectangular_pulse",
          "label": "Rectangular pulse from two steps",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "Which expression represents a unit-height pulse that is on from t=2 to t=4 and zero elsewhere?",
              "options": [
                "A. u(t-2)+u(t-4)",
                "B. u(t-2)-u(t-4)",
                "C. u(t+2)-u(t+4)",
                "D. u(t-4)-u(t-2)"
              ],
              "correct_option": "B",
              "explanation": "u(t-2) turns the pulse on at 2, and -u(t-4) turns it back off at 4.",
              "wrong_option_explanations": {
                "A": "After t=4, the value becomes 2, not 0.",
                "C": "This creates a pulse from -2 to -4 in the wrong time region.",
                "D": "This gives a negative pulse between 2 and 4."
              },
              "hint": "Use first step to turn on, second step to cancel.",
              "needs_visual": true,
              "visual_type": "book_figure_Fig_1_15",
              "same_point_variant": true
            },
            {
              "id": "kp3_q2",
              "type": "short_answer",
              "stem": "Explain why x(t)=u(t-2)-u(t-4) becomes zero again after t=4.",
              "ideal_answer": "After t=4, both u(t-2) and u(t-4) equal 1, so their difference is 1-1=0. The second step cancels the first step.",
              "grading_rubric": [
                "Must state that both steps equal 1 after t=4",
                "Must compute or describe the cancellation",
                "Must not say the signal stays at 1 after t=4"
              ],
              "explanation": "This checks whether the student understands subtraction of steps instead of memorizing the pulse formula.",
              "hint": "Evaluate both step functions for a time such as t=5.",
              "needs_visual": true,
              "visual_type": "book_figure_Fig_1_15",
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "piecewise_gating",
          "label": "Using step windows for piecewise signals",
          "importance": "medium",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp4_q1",
              "type": "multiple_choice",
              "stem": "What does the factor [u(t)-u(t-2)] do in t[u(t)-u(t-2)]?",
              "options": [
                "A. It keeps t active only from t=0 to t=2",
                "B. It shifts t two units to the right",
                "C. It changes the slope from +1 to -1",
                "D. It makes the signal nonzero for all t>2"
              ],
              "correct_option": "A",
              "explanation": "The bracket is a window: u(t) turns on at 0, and -u(t-2) turns it off at 2.",
              "wrong_option_explanations": {
                "B": "The t outside the bracket is not shifted; the bracket gates it.",
                "C": "The bracket controls the interval, not the slope of t.",
                "D": "For t>2, both steps are 1, so the bracket becomes 0."
              },
              "hint": "Evaluate the bracket before 0, between 0 and 2, and after 2.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "reflected_step",
          "label": "Reflected step u(-t)",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp5_q1",
              "type": "multiple_choice",
              "stem": "Which statement correctly describes u(-t)?",
              "options": [
                "A. It is 1 for t≤0 and 0 for t>0",
                "B. It is 0 for t≤0 and 1 for t>0",
                "C. It is -1 for t≥0",
                "D. It is a ramp with negative slope"
              ],
              "correct_option": "A",
              "explanation": "u(-t) is the time-reflected unit step, so it is left-sided: on for t≤0 and off for t>0.",
              "wrong_option_explanations": {
                "B": "That describes the usual right-sided step u(t), not u(-t).",
                "C": "The minus sign is inside the argument, so it reflects time; it does not make the height negative.",
                "D": "A reflected step still jumps; it does not become a ramp."
              },
              "hint": "The minus sign inside u( ) flips time, not amplitude.",
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
