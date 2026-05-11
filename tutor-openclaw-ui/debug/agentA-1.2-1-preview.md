# Agent A Preview: 1.2-1 1.2-1 Time Shifting

- Difficulty: beginner
- Estimated read minutes: 6

## Learning Objectives

- Recognize time delay and time advance from the expression inside a signal.
- Use the replacement rule for time shifting: replace t by t - T.
- Sketch delayed and advanced versions of a signal without changing its shape.
- Write shifted versions of a unit-step-supported exponential signal.

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
    "book_figure",
    "react_canvas_demo"
  ]
}
```

## Visual Plan

```json
{
  "primary_anchor": "both",
  "rationale": "Time shifting is easiest to understand by seeing the whole waveform slide left or right while its shape and amplitude stay unchanged. The textbook already provides the canonical delay/advance diagrams, so those should be used first. Add an interactive React + Canvas slider because students benefit from changing T and immediately seeing how x(t - T) moves.",
  "cram": "Use the visuals to memorize the sign rule quickly: minus inside means right shift, plus inside means left shift.",
  "standard": "Use the textbook figures and slider to connect the formula x(t - T) with one representative delayed and advanced waveform.",
  "top_score": "Use visuals to catch subtle mistakes: shifting the graph the wrong direction, changing amplitude, or forgetting the support boundary also shifts."
}
```

## Planned Blocks

### Block 1: `text_explanation`
- **page_role**: overview
- **instruction**: Render only a compact overview page. Use the heading 'Section Objective' followed by one sentence: 'Learn how replacing t by t - T moves a signal in time without changing its shape.' Then use the heading 'Concepts In This Section' and list only these concept names as bullets: time delay, time advance, sign rule for x(t - T), shifted support boundary, exponential example. Do not add background paragraphs or expanded explanations.

### Block 2: `math_block`
- **page_role**: knowledge_point
- **page_title**: ## 1. The time-shift rule
- **latex**: \phi(t+T)=x(t)
- **explanation_instruction**: Start this concept page by explaining in 40–60 words that if the same event in x(t) occurs T seconds later in phi(t), then the delayed signal must satisfy phi(t+T)=x(t). Emphasize that this equation compares the same waveform event at two different clock times.

### Block 3: `math_block`
- **page_role**: knowledge_point
- **page_title**: ## 1. The time-shift rule
- **latex**: \phi(t)=x(t-T)
- **explanation_instruction**: Explain in 80–120 words: this is the main time-shifting formula. Define x(t) as the original signal, phi(t) as the shifted signal, T as the shift amount in seconds, and t as the time variable. State the exam trigger: whenever the argument is t - T, the waveform is shifted right by T if T is positive. State the most common misuse: students see the minus sign and shift left, but for x(t-T) the graph moves right. Include one minimal example: x(t-3) is x(t) delayed by 3 seconds.

### Block 4: `book_image`
- **page_role**: knowledge_point
- **source_page**: page-071
- **fig_id**: Fig. 1.4
- **teaching_role**: concept_anchor
- **mode_specific_visual_use**:
```json
{
  "cram": "Use it to lock in right shift for x(t - T) and left shift for x(t + T).",
  "standard": "Use it to show that delay and advance move the whole waveform horizontally while preserving shape.",
  "top_score": "Use it to verify that every feature, including peaks and edges, shifts by the same amount."
}
```
- **caption_instruction**: One sentence: show the original signal, the delayed signal x(t - T), and the advanced signal x(t + T).
- **description_instruction**: Describe the three stacked time-domain plots. Point out that the delayed version is shifted right by T and the advanced version is shifted left by T. Tell students to notice that the waveform shape and amplitude do not change; only the time location changes.

### Block 5: `interactive_demo`
- **page_role**: knowledge_point
- **page_title**: ## 2. Watch the sign rule move the graph
- **teaching_role**: exam_pattern_anchor
- **mode_specific_visual_use**:
```json
{
  "cram": "Move T to positive and negative values until the direction rule becomes automatic.",
  "standard": "Use the slider to connect x(t - T) with right shifts and x(t + T) with left shifts.",
  "top_score": "Check that all landmarks shift together and that support intervals move with the waveform."
}
```
- **demo_spec**:
```json
{
  "tool": "react_canvas_demo",
  "canvas_objects": [
    "A fixed original waveform x(t) drawn in muted gray.",
    "A shifted waveform y(t)=x(t-T) drawn in navy.",
    "A horizontal time axis labeled t with tick marks at -4, -2, 0, 2, 4.",
    "A vertical reference line at t=0.",
    "A slider labeled T from -3 to 3 in increments of 0.5.",
    "A live formula label that displays y(t)=x(t-T).",
    "A live direction label: if T>0 show 'delay: shift right'; if T<0 show 'advance: shift left'; if T=0 show 'no shift'."
  ],
  "interaction": "When the student drags T, keep the gray original waveform fixed and slide only the navy waveform horizontally. Do not change amplitude or shape.",
  "default_T": 1,
  "waveform": "Use a simple triangular pulse from t=-1 to t=1 with peak at t=0 so the shift is visually obvious.",
  "student_prompt": "Drag T. What changes? What stays the same?"
}
```
- **instruction**: After the demo, write a 50–80 word observation note. Say that positive T in x(t-T) delays the signal, negative T advances it, and the entire graph moves as one object. Include the exam note: do not shift only one point or change the height.

### Block 6: `math_block`
- **page_role**: knowledge_point
- **page_title**: ## 3. Representative example: delaying an exponential
- **latex**: x(t)=e^{-2t}u(t)
- **explanation_instruction**: Introduce Example 1.3 in 50–70 words. Explain that u(t) makes the exponential start at t=0 and remain zero before t=0. Keep the ODE or complex-number background out; this is only about moving the start time of the signal.

### Block 7: `math_block`
- **page_role**: knowledge_point
- **page_title**: ## 3. Representative example: delaying an exponential
- **latex**: x_d(t)=x(t-1)=e^{-2(t-1)}u(t-1)
- **explanation_instruction**: Explain in 90–130 words that replacing t by t-1 delays the signal by 1 second. State that the exponential now starts at t=1 because u(t-1) turns on when t-1 >= 0. Include the equivalent support statement in prose: the signal is zero for t<1 and follows e^{-2(t-1)} for t>=1. Common trap: writing e^{-2t}u(t-1) shifts only the step boundary but not the exponential's time origin.

### Block 8: `math_block`
- **page_role**: knowledge_point
- **page_title**: ## 4. Representative example: advancing the same exponential
- **latex**: x_a(t)=x(t+1)=e^{-2(t+1)}u(t+1)
- **explanation_instruction**: Explain in 80–110 words that x(t+1) is the same as x(t-(-1)), so it is an advance by 1 second. State that the waveform starts at t=-1 because u(t+1) turns on when t+1 >= 0. Include a quick check: x(t+2) means advance by 2 seconds, not delay by 2 seconds.

### Block 9: `book_image`
- **page_role**: knowledge_point
- **source_page**: page-072
- **fig_id**: Fig. 1.5
- **teaching_role**: example_support
- **mode_specific_visual_use**:
```json
{
  "cram": "Use it to recognize the shifted start time immediately: 0, 1, or -1.",
  "standard": "Use it to connect the formulas x(t-1) and x(t+1) with the plotted exponential shifts.",
  "top_score": "Use it to check that both the step boundary and the exponential curve shift together."
}
```
- **caption_instruction**: One sentence: show x(t)=e^{-2t}u(t), its 1-second delay x(t-1), and its 1-second advance x(t+1).
- **description_instruction**: Describe the three plots: the original begins at t=0, the delayed signal begins at t=1, and the advanced signal begins at t=-1. Point out that the exponential shape and starting value are preserved while the start time changes.

### Block 10: `section_summary`
- **page_role**: recap
- **instruction**: Create a recap page titled '📌 Key Takeaways'. Include exactly 4 bullets, each ≤25 words. The bullets must explicitly include these formulas: \(\phi(t+T)=x(t)\), \(\phi(t)=x(t-T)\), \(x_d(t)=x(t-1)\), and \(x_a(t)=x(t+1)\). Also state the direction rule: positive T in x(t-T) shifts right; plus inside shifts left. End with one sentence: 'Next, we will use similar thinking to understand time scaling.'

### Block 11: `quiz_plan`
- **page_role**: quiz
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
    "id": "time_shift_rule",
    "label": "Core time-shift formula",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "shift_rule_q1",
        "type": "multiple_choice",
        "stem": "If \\(\\phi(t) = x(t - T)\\) and \\(T>0\\), what happened to \\(x(t)\\)?",
        "options": [
          "A. It shifted left by T seconds.",
          "B. It shifted right by T seconds.",
          "C. It was compressed by a factor of T.",
          "D. Its amplitude increased by T."
        ],
        "correct_option": "B",
        "explanation": "\\(x(t-T)\\) is the standard delay form when \\(T>0\\), so the graph moves right by T seconds.",
        "wrong_option_explanations": {
          "A": "This is the most common sign mistake. A plus inside, such as \\(x(t+T)\\), shifts left.",
          "C": "Compression is time scaling, not time shifting.",
          "D": "Time shifting changes time location, not amplitude."
        },
        "hint": "For \\(x(t-T)\\), positive T means delay.",
        "needs_visual": false,
        "same_point_variant": true
      },
      {
        "id": "shift_rule_q2",
        "type": "multiple_choice",
        "stem": "Which expression represents \\(x(t)\\) advanced by 2 seconds?",
        "options": [
          "A. \\(x(t-2)\\)",
          "B. \\(x(t+2)\\)",
          "C. \\(2x(t)\\)",
          "D. \\(x(2t)\\)"
        ],
        "correct_option": "B",
        "explanation": "An advance moves the graph left, and \\(x(t+2)\\) is the left-shifted version by 2 seconds.",
        "wrong_option_explanations": {
          "A": "\\(x(t-2)\\) is a delay by 2 seconds.",
          "C": "\\(2x(t)\\) changes amplitude, not time location.",
          "D": "\\(x(2t)\\) is time scaling, not a pure shift."
        },
        "hint": "Advance means the event happens earlier.",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "visual_direction_recognition",
    "label": "Recognizing delay versus advance from a graph",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "visual_direction_q1",
        "type": "multiple_choice",
        "stem": "In a graph, every peak and edge of a waveform appears 3 seconds later than in \\(x(t)\\), with the same shape and height. Which expression matches it?",
        "options": [
          "A. \\(x(t-3)\\)",
          "B. \\(x(t+3)\\)",
          "C. \\(x(3t)\\)",
          "D. \\(3x(t)\\)"
        ],
        "correct_option": "A",
        "explanation": "Events happening later mean a delay, and delay by 3 seconds is \\(x(t-3)\\).",
        "wrong_option_explanations": {
          "B": "\\(x(t+3)\\) moves events earlier by 3 seconds.",
          "C": "\\(x(3t)\\) changes time scale and compresses the waveform.",
          "D": "\\(3x(t)\\) changes height, not timing."
        },
        "hint": "Later in time means right shift.",
        "needs_visual": true,
        "visual_type": "book_figure_or_interactive_demo",
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "shifted_exponential_example",
    "label": "Shifting an exponential with a unit step",
    "importance": "high",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "exp_shift_q1",
        "type": "multiple_choice",
        "stem": "For \\(x(t)=e^{-2t}u(t)\\), which formula correctly describes a 1-second delay?",
        "options": [
          "A. \\(e^{-2t}u(t-1)\\)",
          "B. \\(e^{-2(t-1)}u(t-1)\\)",
          "C. \\(e^{-2(t+1)}u(t+1)\\)",
          "D. \\(e^{-2t}u(t+1)\\)"
        ],
        "correct_option": "B",
        "explanation": "A delay replaces every t in the signal with t-1, giving \\(e^{-2(t-1)}u(t-1)\\).",
        "wrong_option_explanations": {
          "A": "This shifts the step boundary but not the exponential's time origin.",
          "C": "This is an advance by 1 second.",
          "D": "This shifts only the step boundary in the advance direction."
        },
        "hint": "Replace every occurrence of t by t-1.",
        "needs_visual": false,
        "same_point_variant": true
      },
      {
        "id": "exp_shift_q2",
        "type": "multiple_choice",
        "stem": "For \\(x(t)=e^{-2t}u(t)\\), when does \\(x(t+1)\\) start being nonzero?",
        "options": [
          "A. At \\(t=1\\)",
          "B. At \\(t=0\\)",
          "C. At \\(t=-1\\)",
          "D. It is never nonzero"
        ],
        "correct_option": "C",
        "explanation": "\\(u(t+1)\\) turns on when \\(t+1\\ge 0\\), so the advanced signal starts at \\(t=-1\\).",
        "wrong_option_explanations": {
          "A": "That would be the start time for \\(x(t-1)\\), a delay.",
          "B": "That is the original start time before shifting.",
          "D": "The shifted unit step is nonzero after its new start time."
        },
        "hint": "Solve \\(t+1\\ge 0\\).",
        "needs_visual": true,
        "visual_type": "book_figure_Fig_1_5",
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "demo_observation",
    "label": "What changes and what stays fixed during a time shift",
    "importance": "medium",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "demo_observation_q1",
        "type": "short_answer",
        "stem": "In the interactive demo, set \\(T=2\\) for \\(y(t)=x(t-T)\\). Describe what changes and what stays the same.",
        "ideal_answer": "The waveform shifts right by 2 seconds. Its shape, height, and duration stay the same; only the time location changes.",
        "grading_rubric": [
          "Must state that the shift is right by 2 seconds.",
          "Must state that shape or amplitude does not change.",
          "Must describe this as a time-location change, not scaling."
        ],
        "explanation": "This checks whether the student connects the formula to the visual motion instead of only memorizing the sign rule.",
        "hint": "Watch the navy waveform compared with the gray original.",
        "needs_visual": true,
        "visual_type": "interactive_demo",
        "same_point_variant": false
      }
    ]
  }
]
```

## Raw JSON

```json
{
  "section_id": "1.2-1",
  "section_title": "1.2-1 Time Shifting",
  "difficulty": "beginner",
  "estimated_read_minutes": 6,
  "learning_objectives": [
    "Recognize time delay and time advance from the expression inside a signal.",
    "Use the replacement rule for time shifting: replace t by t - T.",
    "Sketch delayed and advanced versions of a signal without changing its shape.",
    "Write shifted versions of a unit-step-supported exponential signal."
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
      "book_figure",
      "react_canvas_demo"
    ]
  },
  "visual_plan": {
    "primary_anchor": "both",
    "rationale": "Time shifting is easiest to understand by seeing the whole waveform slide left or right while its shape and amplitude stay unchanged. The textbook already provides the canonical delay/advance diagrams, so those should be used first. Add an interactive React + Canvas slider because students benefit from changing T and immediately seeing how x(t - T) moves.",
    "cram": "Use the visuals to memorize the sign rule quickly: minus inside means right shift, plus inside means left shift.",
    "standard": "Use the textbook figures and slider to connect the formula x(t - T) with one representative delayed and advanced waveform.",
    "top_score": "Use visuals to catch subtle mistakes: shifting the graph the wrong direction, changing amplitude, or forgetting the support boundary also shifts."
  },
  "blocks": [
    {
      "type": "text_explanation",
      "page_role": "overview",
      "instruction": "Render only a compact overview page. Use the heading 'Section Objective' followed by one sentence: 'Learn how replacing t by t - T moves a signal in time without changing its shape.' Then use the heading 'Concepts In This Section' and list only these concept names as bullets: time delay, time advance, sign rule for x(t - T), shifted support boundary, exponential example. Do not add background paragraphs or expanded explanations."
    },
    {
      "type": "math_block",
      "page_role": "knowledge_point",
      "page_title": "## 1. The time-shift rule",
      "latex": "\\phi(t+T)=x(t)",
      "explanation_instruction": "Start this concept page by explaining in 40–60 words that if the same event in x(t) occurs T seconds later in phi(t), then the delayed signal must satisfy phi(t+T)=x(t). Emphasize that this equation compares the same waveform event at two different clock times."
    },
    {
      "type": "math_block",
      "page_role": "knowledge_point",
      "page_title": "## 1. The time-shift rule",
      "latex": "\\phi(t)=x(t-T)",
      "explanation_instruction": "Explain in 80–120 words: this is the main time-shifting formula. Define x(t) as the original signal, phi(t) as the shifted signal, T as the shift amount in seconds, and t as the time variable. State the exam trigger: whenever the argument is t - T, the waveform is shifted right by T if T is positive. State the most common misuse: students see the minus sign and shift left, but for x(t-T) the graph moves right. Include one minimal example: x(t-3) is x(t) delayed by 3 seconds."
    },
    {
      "type": "book_image",
      "page_role": "knowledge_point",
      "source_page": "page-071",
      "fig_id": "Fig. 1.4",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use it to lock in right shift for x(t - T) and left shift for x(t + T).",
        "standard": "Use it to show that delay and advance move the whole waveform horizontally while preserving shape.",
        "top_score": "Use it to verify that every feature, including peaks and edges, shifts by the same amount."
      },
      "caption_instruction": "One sentence: show the original signal, the delayed signal x(t - T), and the advanced signal x(t + T).",
      "description_instruction": "Describe the three stacked time-domain plots. Point out that the delayed version is shifted right by T and the advanced version is shifted left by T. Tell students to notice that the waveform shape and amplitude do not change; only the time location changes."
    },
    {
      "type": "interactive_demo",
      "page_role": "knowledge_point",
      "page_title": "## 2. Watch the sign rule move the graph",
      "teaching_role": "exam_pattern_anchor",
      "mode_specific_visual_use": {
        "cram": "Move T to positive and negative values until the direction rule becomes automatic.",
        "standard": "Use the slider to connect x(t - T) with right shifts and x(t + T) with left shifts.",
        "top_score": "Check that all landmarks shift together and that support intervals move with the waveform."
      },
      "demo_spec": {
        "tool": "react_canvas_demo",
        "canvas_objects": [
          "A fixed original waveform x(t) drawn in muted gray.",
          "A shifted waveform y(t)=x(t-T) drawn in navy.",
          "A horizontal time axis labeled t with tick marks at -4, -2, 0, 2, 4.",
          "A vertical reference line at t=0.",
          "A slider labeled T from -3 to 3 in increments of 0.5.",
          "A live formula label that displays y(t)=x(t-T).",
          "A live direction label: if T>0 show 'delay: shift right'; if T<0 show 'advance: shift left'; if T=0 show 'no shift'."
        ],
        "interaction": "When the student drags T, keep the gray original waveform fixed and slide only the navy waveform horizontally. Do not change amplitude or shape.",
        "default_T": 1,
        "waveform": "Use a simple triangular pulse from t=-1 to t=1 with peak at t=0 so the shift is visually obvious.",
        "student_prompt": "Drag T. What changes? What stays the same?"
      },
      "instruction": "After the demo, write a 50–80 word observation note. Say that positive T in x(t-T) delays the signal, negative T advances it, and the entire graph moves as one object. Include the exam note: do not shift only one point or change the height."
    },
    {
      "type": "math_block",
      "page_role": "knowledge_point",
      "page_title": "## 3. Representative example: delaying an exponential",
      "latex": "x(t)=e^{-2t}u(t)",
      "explanation_instruction": "Introduce Example 1.3 in 50–70 words. Explain that u(t) makes the exponential start at t=0 and remain zero before t=0. Keep the ODE or complex-number background out; this is only about moving the start time of the signal."
    },
    {
      "type": "math_block",
      "page_role": "knowledge_point",
      "page_title": "## 3. Representative example: delaying an exponential",
      "latex": "x_d(t)=x(t-1)=e^{-2(t-1)}u(t-1)",
      "explanation_instruction": "Explain in 90–130 words that replacing t by t-1 delays the signal by 1 second. State that the exponential now starts at t=1 because u(t-1) turns on when t-1 >= 0. Include the equivalent support statement in prose: the signal is zero for t<1 and follows e^{-2(t-1)} for t>=1. Common trap: writing e^{-2t}u(t-1) shifts only the step boundary but not the exponential's time origin."
    },
    {
      "type": "math_block",
      "page_role": "knowledge_point",
      "page_title": "## 4. Representative example: advancing the same exponential",
      "latex": "x_a(t)=x(t+1)=e^{-2(t+1)}u(t+1)",
      "explanation_instruction": "Explain in 80–110 words that x(t+1) is the same as x(t-(-1)), so it is an advance by 1 second. State that the waveform starts at t=-1 because u(t+1) turns on when t+1 >= 0. Include a quick check: x(t+2) means advance by 2 seconds, not delay by 2 seconds."
    },
    {
      "type": "book_image",
      "page_role": "knowledge_point",
      "source_page": "page-072",
      "fig_id": "Fig. 1.5",
      "teaching_role": "example_support",
      "mode_specific_visual_use": {
        "cram": "Use it to recognize the shifted start time immediately: 0, 1, or -1.",
        "standard": "Use it to connect the formulas x(t-1) and x(t+1) with the plotted exponential shifts.",
        "top_score": "Use it to check that both the step boundary and the exponential curve shift together."
      },
      "caption_instruction": "One sentence: show x(t)=e^{-2t}u(t), its 1-second delay x(t-1), and its 1-second advance x(t+1).",
      "description_instruction": "Describe the three plots: the original begins at t=0, the delayed signal begins at t=1, and the advanced signal begins at t=-1. Point out that the exponential shape and starting value are preserved while the start time changes."
    },
    {
      "type": "section_summary",
      "page_role": "recap",
      "instruction": "Create a recap page titled '📌 Key Takeaways'. Include exactly 4 bullets, each ≤25 words. The bullets must explicitly include these formulas: \\(\\phi(t+T)=x(t)\\), \\(\\phi(t)=x(t-T)\\), \\(x_d(t)=x(t-1)\\), and \\(x_a(t)=x(t+1)\\). Also state the direction rule: positive T in x(t-T) shifts right; plus inside shifts left. End with one sentence: 'Next, we will use similar thinking to understand time scaling.'"
    },
    {
      "type": "quiz_plan",
      "page_role": "quiz",
      "target_questions": 6,
      "question_range": {
        "min": 5,
        "max": 7
      },
      "knowledge_points": [
        {
          "id": "time_shift_rule",
          "label": "Core time-shift formula",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "shift_rule_q1",
              "type": "multiple_choice",
              "stem": "If \\(\\phi(t) = x(t - T)\\) and \\(T>0\\), what happened to \\(x(t)\\)?",
              "options": [
                "A. It shifted left by T seconds.",
                "B. It shifted right by T seconds.",
                "C. It was compressed by a factor of T.",
                "D. Its amplitude increased by T."
              ],
              "correct_option": "B",
              "explanation": "\\(x(t-T)\\) is the standard delay form when \\(T>0\\), so the graph moves right by T seconds.",
              "wrong_option_explanations": {
                "A": "This is the most common sign mistake. A plus inside, such as \\(x(t+T)\\), shifts left.",
                "C": "Compression is time scaling, not time shifting.",
                "D": "Time shifting changes time location, not amplitude."
              },
              "hint": "For \\(x(t-T)\\), positive T means delay.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "shift_rule_q2",
              "type": "multiple_choice",
              "stem": "Which expression represents \\(x(t)\\) advanced by 2 seconds?",
              "options": [
                "A. \\(x(t-2)\\)",
                "B. \\(x(t+2)\\)",
                "C. \\(2x(t)\\)",
                "D. \\(x(2t)\\)"
              ],
              "correct_option": "B",
              "explanation": "An advance moves the graph left, and \\(x(t+2)\\) is the left-shifted version by 2 seconds.",
              "wrong_option_explanations": {
                "A": "\\(x(t-2)\\) is a delay by 2 seconds.",
                "C": "\\(2x(t)\\) changes amplitude, not time location.",
                "D": "\\(x(2t)\\) is time scaling, not a pure shift."
              },
              "hint": "Advance means the event happens earlier.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "visual_direction_recognition",
          "label": "Recognizing delay versus advance from a graph",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "visual_direction_q1",
              "type": "multiple_choice",
              "stem": "In a graph, every peak and edge of a waveform appears 3 seconds later than in \\(x(t)\\), with the same shape and height. Which expression matches it?",
              "options": [
                "A. \\(x(t-3)\\)",
                "B. \\(x(t+3)\\)",
                "C. \\(x(3t)\\)",
                "D. \\(3x(t)\\)"
              ],
              "correct_option": "A",
              "explanation": "Events happening later mean a delay, and delay by 3 seconds is \\(x(t-3)\\).",
              "wrong_option_explanations": {
                "B": "\\(x(t+3)\\) moves events earlier by 3 seconds.",
                "C": "\\(x(3t)\\) changes time scale and compresses the waveform.",
                "D": "\\(3x(t)\\) changes height, not timing."
              },
              "hint": "Later in time means right shift.",
              "needs_visual": true,
              "visual_type": "book_figure_or_interactive_demo",
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "shifted_exponential_example",
          "label": "Shifting an exponential with a unit step",
          "importance": "high",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "exp_shift_q1",
              "type": "multiple_choice",
              "stem": "For \\(x(t)=e^{-2t}u(t)\\), which formula correctly describes a 1-second delay?",
              "options": [
                "A. \\(e^{-2t}u(t-1)\\)",
                "B. \\(e^{-2(t-1)}u(t-1)\\)",
                "C. \\(e^{-2(t+1)}u(t+1)\\)",
                "D. \\(e^{-2t}u(t+1)\\)"
              ],
              "correct_option": "B",
              "explanation": "A delay replaces every t in the signal with t-1, giving \\(e^{-2(t-1)}u(t-1)\\).",
              "wrong_option_explanations": {
                "A": "This shifts the step boundary but not the exponential's time origin.",
                "C": "This is an advance by 1 second.",
                "D": "This shifts only the step boundary in the advance direction."
              },
              "hint": "Replace every occurrence of t by t-1.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "exp_shift_q2",
              "type": "multiple_choice",
              "stem": "For \\(x(t)=e^{-2t}u(t)\\), when does \\(x(t+1)\\) start being nonzero?",
              "options": [
                "A. At \\(t=1\\)",
                "B. At \\(t=0\\)",
                "C. At \\(t=-1\\)",
                "D. It is never nonzero"
              ],
              "correct_option": "C",
              "explanation": "\\(u(t+1)\\) turns on when \\(t+1\\ge 0\\), so the advanced signal starts at \\(t=-1\\).",
              "wrong_option_explanations": {
                "A": "That would be the start time for \\(x(t-1)\\), a delay.",
                "B": "That is the original start time before shifting.",
                "D": "The shifted unit step is nonzero after its new start time."
              },
              "hint": "Solve \\(t+1\\ge 0\\).",
              "needs_visual": true,
              "visual_type": "book_figure_Fig_1_5",
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "demo_observation",
          "label": "What changes and what stays fixed during a time shift",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "demo_observation_q1",
              "type": "short_answer",
              "stem": "In the interactive demo, set \\(T=2\\) for \\(y(t)=x(t-T)\\). Describe what changes and what stays the same.",
              "ideal_answer": "The waveform shifts right by 2 seconds. Its shape, height, and duration stay the same; only the time location changes.",
              "grading_rubric": [
                "Must state that the shift is right by 2 seconds.",
                "Must state that shape or amplitude does not change.",
                "Must describe this as a time-location change, not scaling."
              ],
              "explanation": "This checks whether the student connects the formula to the visual motion instead of only memorizing the sign rule.",
              "hint": "Watch the navy waveform compared with the gray original.",
              "needs_visual": true,
              "visual_type": "interactive_demo",
              "same_point_variant": false
            }
          ]
        }
      ]
    }
  ]
}
```
