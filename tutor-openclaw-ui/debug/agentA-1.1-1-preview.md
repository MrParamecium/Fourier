# Agent A Preview: 1.1-1 1.1-1 Signal Energy

- Difficulty: beginner
- Estimated read minutes: 5

## Learning Objectives

- Explain why ordinary signed area is a poor measure of signal size
- Use the signal energy formula to measure the size of a continuous-time signal
- Apply the real-valued simplification of signal energy
- Recognize the exam trigger for integrating squared magnitude

## Visualization Need

```json
{
  "level": "static",
  "reason": [
    "misconception_needs_visual_correction",
    "wrong_vs_right_contrast_is_high_value",
    "pattern_recognition_benefits_from_figure"
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
  "rationale": "The page has no textbook figure, and the key misconception is visual: positive and negative signed areas can cancel even when the signal is large. A custom lecture-note visual is justified because it must compare signed area with squared magnitude for one specific teaching point. Wikipedia-style reference images are unlikely to show this exact exam-relevant contrast cleanly.",
  "cram": "Use the visual to remember: if size is asked, do not integrate x(t); integrate squared magnitude.",
  "standard": "Use the visual to connect the formula to the idea that squaring prevents cancellation.",
  "top_score": "Use the visual to separate three ideas: signed area, absolute-area size, and energy via squared magnitude."
}
```

## Planned Blocks

### Block 1: `text_explanation`
- **instruction**: Render Page 1 as a compact outline only. Use exactly these two sections and no expanded introduction: Section Objective: 'Define signal energy and understand why it uses squared magnitude instead of ordinary area.' Concepts In This Section: list only these concept names as bullets: 'signed-area cancellation', 'signal energy', 'real-valued signal simplification', 'representative energy calculation'.

### Block 2: `text_explanation`
- **instruction**: Start a new concept page with the heading '## 1. Why ordinary area fails'. Explain in 90–120 words that measuring signal size by the area under x(t) seems tempting because it includes both amplitude and duration, but it fails when positive and negative parts cancel. Use one simple example verbally: a waveform with a positive lobe followed by an equal negative lobe may have total signed area near zero even though the signal is clearly not small. End with the exam note: 'When the question asks for signal size or energy, signed area is the trap.'

### Block 3: `generate_image`
- **tool**: openai/gpt-5.4-image-2
- **reason**: No textbook figure is available, and the teaching need is a custom wrong-vs-right comparison showing signed-area cancellation versus squared-magnitude accumulation for one waveform.
- **teaching_role**: trap_exposure
- **mode_specific_visual_use**:
```json
{
  "cram": "Make the cancellation trap instantly recognizable before exams.",
  "standard": "Show why the energy formula squares the signal before integrating.",
  "top_score": "Help distinguish signed area, absolute area, and squared-magnitude energy."
}
```
- **prompt**: Pure white clean background, minimalist lecture-notes educational diagram, one knowledge point only: signed-area cancellation versus energy from squared magnitude. Show two stacked panels. Top panel: a simple continuous-time signal x(t) with one positive lobe shaded muted teal and one equal negative lobe shaded muted red; label the top panel 'Signed area can cancel'. Include a small note: '+ area and - area may sum to 0'. Bottom panel: show |x(t)|^2 for the same signal, entirely above the time axis, shaded muted teal; label the bottom panel 'Energy adds positive size'. Include the formula E_x = integral of |x(t)|^2 dt in clean LaTeX-style typography. Use navy axes, soft gray grid only if needed, no decorative elements, no dense text, no cartoon style, no extra examples.
- **style_hint**: lecture notes, academic, clean, restrained color boxes, exam-oriented, one concept only

### Block 4: `math_block`
- **latex**: E_x = \int_{-\infty}^{\infty} |x(t)|^2\,dt \qquad \text{(1.1)}
- **explanation_instruction**: Start a new concept page with the heading '## 2. Signal energy'. Explain in 120–150 words. State that this is the textbook definition of continuous-time signal energy. Define every symbol: E_x is the energy of signal x, x(t) is the signal value at time t, |x(t)| is magnitude, |x(t)|^2 is squared magnitude, and the limits mean all time. Explain when to use it: when an exam asks for energy, size, or total squared magnitude of a continuous-time signal. State the common misuse: integrating x(t) instead of |x(t)|^2. Include one short sentence that for complex-valued signals, magnitude is essential because x(t)^2 is not the same as |x(t)|^2.

### Block 5: `math_block`
- **latex**: E_x = A^2T
- **explanation_instruction**: Continue the same concept page with a minimal representative example. Say: 'If a rectangular pulse has constant value A for a duration T and is zero elsewhere, then its energy is A^2T.' Explain in 70–100 words why: the squared magnitude is A^2 only during the active interval, and integrating a constant over length T multiplies by T. Use this as the main example for the section. Include the exam note: doubling amplitude multiplies energy by 4, while doubling duration multiplies energy by 2.

### Block 6: `math_block`
- **latex**: E_x = \int_{-\infty}^{\infty} x^2(t)\,dt \qquad \text{for real-valued } x(t)
- **explanation_instruction**: Start a new concept page with the heading '## 3. Real-valued signal simplification'. Explain in 90–120 words that when x(t) is real-valued, the magnitude-squared expression simplifies to x^2(t). Make clear that this is not a new definition; it is the same energy formula written in a simpler form for real signals. Include one minimal example: if x(t) = -3 at some instant, the contribution to energy density is (-3)^2 = 9, not -3. End with the common mistake: do not drop the square just because the signal is real.

### Block 7: `text_explanation`
- **instruction**: Start a new short exam-note page with the heading '## 4. What the formula is really measuring'. In 80–110 words, explain that signal energy measures accumulated squared magnitude across time, so it rewards both larger amplitude and longer duration. Contrast it briefly with the area under |x(t)|: that is another possible size measure, but this textbook uses energy because squared magnitude is mathematically tractable and physically meaningful. Keep the tone practical. End with a quick check prompt: 'If two signals have the same duration but one has twice the amplitude, which has more energy and by what factor?' Then give the answer immediately: 'The larger-amplitude signal has 4 times the energy.'

### Block 8: `section_summary`
- **instruction**: Create the recap page titled '📌 Key Takeaways'. Use 4 concise bullets, each no more than 24 words. The recap must explicitly include these formulas: E_x = \int_{-\infty}^{\infty}|x(t)|^2\,dt, E_x = \int_{-\infty}^{\infty}x^2(t)\,dt for real-valued x(t), and E_x = A^2T for a constant rectangular pulse. Also include the warning that signed area can cancel. End with one bridge sentence: 'Next, we will use this energy idea to classify signals more precisely.'

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
    "id": "signed_area_cancellation",
    "label": "Why signed area is not signal energy",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp1_q1",
        "type": "multiple_choice",
        "stem": "A signal has one positive lobe and one equal negative lobe, so its signed area is 0. What should you conclude?",
        "options": [
          "A. The signal has zero energy",
          "B. The signal must be identically zero",
          "C. Signed area is not a reliable measure of signal size",
          "D. The energy is the integral of x(t)"
        ],
        "correct_option": "C",
        "explanation": "Positive and negative signed areas can cancel even when the signal has nonzero amplitude over time.",
        "wrong_option_explanations": {
          "A": "Zero signed area does not imply zero energy.",
          "B": "A nonzero waveform can still have total signed area 0.",
          "D": "Energy uses squared magnitude, not the raw signal."
        },
        "hint": "Ask whether cancellation means the waveform was actually absent.",
        "needs_visual": false,
        "same_point_variant": true
      },
      {
        "id": "kp1_q2",
        "type": "multiple_choice",
        "stem": "In the lesson visual, the top waveform's positive and negative shaded areas cancel. What does the bottom |x(t)|^2 plot show?",
        "options": [
          "A. All contributions become nonnegative before integration",
          "B. The negative lobe disappears from the signal",
          "C. Energy only counts positive-time values",
          "D. The signal's duration no longer matters"
        ],
        "correct_option": "A",
        "explanation": "Squaring the magnitude makes the contribution to energy nonnegative, so negative signal values still add to energy.",
        "wrong_option_explanations": {
          "B": "The negative part does not disappear; its magnitude contributes positively.",
          "C": "Energy integrates over all time, not just positive time.",
          "D": "Duration still matters because the integral accumulates over time."
        },
        "hint": "Look at whether the squared plot goes below the axis.",
        "needs_visual": true,
        "visual_type": "wrong_vs_right_visual_check",
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "energy_formula",
    "label": "Continuous-time signal energy formula",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp2_q1",
        "type": "multiple_choice",
        "stem": "Which formula is the textbook definition of continuous-time signal energy?",
        "options": [
          "A. E_x = \\int_{-\\infty}^{\\infty} x(t)\\,dt",
          "B. E_x = \\int_{-\\infty}^{\\infty} |x(t)|^2\\,dt",
          "C. E_x = \\int_{0}^{\\infty} |x(t)|\\,dt",
          "D. E_x = |\\int_{-\\infty}^{\\infty} x(t)\\,dt|^2"
        ],
        "correct_option": "B",
        "explanation": "Signal energy is the integral of squared magnitude over all time.",
        "wrong_option_explanations": {
          "A": "That is signed area, which can cancel.",
          "C": "This uses magnitude but not squared magnitude, and only integrates from 0 to infinity.",
          "D": "Squaring the final signed area is not the same as integrating squared magnitude."
        },
        "hint": "Energy accumulates local squared magnitude, not final net area.",
        "needs_visual": false,
        "same_point_variant": true
      },
      {
        "id": "kp2_q2",
        "type": "short_answer",
        "stem": "A classmate computes signal energy using \\(\\int x(t)\\,dt\\). Explain precisely why this is wrong.",
        "ideal_answer": "That computes signed area, not energy. Positive and negative parts can cancel. Energy must integrate squared magnitude: \\(E_x = \\int_{-\\infty}^{\\infty}|x(t)|^2\\,dt\\).",
        "grading_rubric": [
          "Must identify \\(\\int x(t)\\,dt\\) as signed area",
          "Must mention cancellation of positive and negative parts",
          "Must give the correct squared-magnitude energy formula"
        ],
        "explanation": "This checks whether the student understands why the square is present, not just the memorized formula.",
        "hint": "What happens if a positive lobe and negative lobe have equal area?",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "real_signal_simplification",
    "label": "Energy formula for real-valued signals",
    "importance": "medium",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp3_q1",
        "type": "multiple_choice",
        "stem": "For a real-valued signal x(t), which expression correctly simplifies the energy formula?",
        "options": [
          "A. E_x = \\int_{-\\infty}^{\\infty} x(t)\\,dt",
          "B. E_x = \\int_{-\\infty}^{\\infty} x^2(t)\\,dt",
          "C. E_x = \\left(\\int_{-\\infty}^{\\infty} x(t)\\,dt\\right)^2",
          "D. E_x = \\int_{-\\infty}^{\\infty} |x(t)|\\,dt"
        ],
        "correct_option": "B",
        "explanation": "For real-valued signals, \\(|x(t)|^2 = x^2(t)\\), so energy becomes the integral of \\(x^2(t)\\).",
        "wrong_option_explanations": {
          "A": "This drops the square and becomes signed area.",
          "C": "Squaring after integration is not the same as integrating the square.",
          "D": "This is an absolute-area measure, not the energy definition used here."
        },
        "hint": "Real-valued simplification keeps the square.",
        "needs_visual": false,
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "rectangular_pulse_example",
    "label": "Representative energy calculation",
    "importance": "high",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp4_q1",
        "type": "multiple_choice",
        "stem": "A rectangular pulse has amplitude 3 for 2 seconds and is zero elsewhere. What is its energy?",
        "options": [
          "A. 6",
          "B. 9",
          "C. 18",
          "D. 36"
        ],
        "correct_option": "C",
        "explanation": "For a constant rectangular pulse, \\(E_x = A^2T = 3^2 \\cdot 2 = 18\\).",
        "wrong_option_explanations": {
          "A": "This uses amplitude times duration, not squared amplitude times duration.",
          "B": "This squares the amplitude but forgets duration.",
          "D": "This incorrectly squares both amplitude and duration."
        },
        "hint": "Use \\(A^2T\\), not \\(AT\\).",
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
  "section_id": "1.1-1",
  "section_title": "1.1-1 Signal Energy",
  "difficulty": "beginner",
  "estimated_read_minutes": 5,
  "learning_objectives": [
    "Explain why ordinary signed area is a poor measure of signal size",
    "Use the signal energy formula to measure the size of a continuous-time signal",
    "Apply the real-valued simplification of signal energy",
    "Recognize the exam trigger for integrating squared magnitude"
  ],
  "visualization_need": {
    "level": "static",
    "reason": [
      "misconception_needs_visual_correction",
      "wrong_vs_right_contrast_is_high_value",
      "pattern_recognition_benefits_from_figure"
    ],
    "recommended_assets": [
      "generated_image"
    ]
  },
  "visual_plan": {
    "primary_anchor": "generated_image",
    "rationale": "The page has no textbook figure, and the key misconception is visual: positive and negative signed areas can cancel even when the signal is large. A custom lecture-note visual is justified because it must compare signed area with squared magnitude for one specific teaching point. Wikipedia-style reference images are unlikely to show this exact exam-relevant contrast cleanly.",
    "cram": "Use the visual to remember: if size is asked, do not integrate x(t); integrate squared magnitude.",
    "standard": "Use the visual to connect the formula to the idea that squaring prevents cancellation.",
    "top_score": "Use the visual to separate three ideas: signed area, absolute-area size, and energy via squared magnitude."
  },
  "blocks": [
    {
      "type": "text_explanation",
      "instruction": "Render Page 1 as a compact outline only. Use exactly these two sections and no expanded introduction: Section Objective: 'Define signal energy and understand why it uses squared magnitude instead of ordinary area.' Concepts In This Section: list only these concept names as bullets: 'signed-area cancellation', 'signal energy', 'real-valued signal simplification', 'representative energy calculation'."
    },
    {
      "type": "text_explanation",
      "instruction": "Start a new concept page with the heading '## 1. Why ordinary area fails'. Explain in 90–120 words that measuring signal size by the area under x(t) seems tempting because it includes both amplitude and duration, but it fails when positive and negative parts cancel. Use one simple example verbally: a waveform with a positive lobe followed by an equal negative lobe may have total signed area near zero even though the signal is clearly not small. End with the exam note: 'When the question asks for signal size or energy, signed area is the trap.'"
    },
    {
      "type": "generate_image",
      "tool": "openai/gpt-5.4-image-2",
      "reason": "No textbook figure is available, and the teaching need is a custom wrong-vs-right comparison showing signed-area cancellation versus squared-magnitude accumulation for one waveform.",
      "teaching_role": "trap_exposure",
      "mode_specific_visual_use": {
        "cram": "Make the cancellation trap instantly recognizable before exams.",
        "standard": "Show why the energy formula squares the signal before integrating.",
        "top_score": "Help distinguish signed area, absolute area, and squared-magnitude energy."
      },
      "prompt": "Pure white clean background, minimalist lecture-notes educational diagram, one knowledge point only: signed-area cancellation versus energy from squared magnitude. Show two stacked panels. Top panel: a simple continuous-time signal x(t) with one positive lobe shaded muted teal and one equal negative lobe shaded muted red; label the top panel 'Signed area can cancel'. Include a small note: '+ area and - area may sum to 0'. Bottom panel: show |x(t)|^2 for the same signal, entirely above the time axis, shaded muted teal; label the bottom panel 'Energy adds positive size'. Include the formula E_x = integral of |x(t)|^2 dt in clean LaTeX-style typography. Use navy axes, soft gray grid only if needed, no decorative elements, no dense text, no cartoon style, no extra examples.",
      "style_hint": "lecture notes, academic, clean, restrained color boxes, exam-oriented, one concept only"
    },
    {
      "type": "math_block",
      "latex": "E_x = \\int_{-\\infty}^{\\infty} |x(t)|^2\\,dt \\qquad \\text{(1.1)}",
      "explanation_instruction": "Start a new concept page with the heading '## 2. Signal energy'. Explain in 120–150 words. State that this is the textbook definition of continuous-time signal energy. Define every symbol: E_x is the energy of signal x, x(t) is the signal value at time t, |x(t)| is magnitude, |x(t)|^2 is squared magnitude, and the limits mean all time. Explain when to use it: when an exam asks for energy, size, or total squared magnitude of a continuous-time signal. State the common misuse: integrating x(t) instead of |x(t)|^2. Include one short sentence that for complex-valued signals, magnitude is essential because x(t)^2 is not the same as |x(t)|^2."
    },
    {
      "type": "math_block",
      "latex": "E_x = A^2T",
      "explanation_instruction": "Continue the same concept page with a minimal representative example. Say: 'If a rectangular pulse has constant value A for a duration T and is zero elsewhere, then its energy is A^2T.' Explain in 70–100 words why: the squared magnitude is A^2 only during the active interval, and integrating a constant over length T multiplies by T. Use this as the main example for the section. Include the exam note: doubling amplitude multiplies energy by 4, while doubling duration multiplies energy by 2."
    },
    {
      "type": "math_block",
      "latex": "E_x = \\int_{-\\infty}^{\\infty} x^2(t)\\,dt \\qquad \\text{for real-valued } x(t)",
      "explanation_instruction": "Start a new concept page with the heading '## 3. Real-valued signal simplification'. Explain in 90–120 words that when x(t) is real-valued, the magnitude-squared expression simplifies to x^2(t). Make clear that this is not a new definition; it is the same energy formula written in a simpler form for real signals. Include one minimal example: if x(t) = -3 at some instant, the contribution to energy density is (-3)^2 = 9, not -3. End with the common mistake: do not drop the square just because the signal is real."
    },
    {
      "type": "text_explanation",
      "instruction": "Start a new short exam-note page with the heading '## 4. What the formula is really measuring'. In 80–110 words, explain that signal energy measures accumulated squared magnitude across time, so it rewards both larger amplitude and longer duration. Contrast it briefly with the area under |x(t)|: that is another possible size measure, but this textbook uses energy because squared magnitude is mathematically tractable and physically meaningful. Keep the tone practical. End with a quick check prompt: 'If two signals have the same duration but one has twice the amplitude, which has more energy and by what factor?' Then give the answer immediately: 'The larger-amplitude signal has 4 times the energy.'"
    },
    {
      "type": "section_summary",
      "instruction": "Create the recap page titled '📌 Key Takeaways'. Use 4 concise bullets, each no more than 24 words. The recap must explicitly include these formulas: E_x = \\int_{-\\infty}^{\\infty}|x(t)|^2\\,dt, E_x = \\int_{-\\infty}^{\\infty}x^2(t)\\,dt for real-valued x(t), and E_x = A^2T for a constant rectangular pulse. Also include the warning that signed area can cancel. End with one bridge sentence: 'Next, we will use this energy idea to classify signals more precisely.'"
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
          "id": "signed_area_cancellation",
          "label": "Why signed area is not signal energy",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "A signal has one positive lobe and one equal negative lobe, so its signed area is 0. What should you conclude?",
              "options": [
                "A. The signal has zero energy",
                "B. The signal must be identically zero",
                "C. Signed area is not a reliable measure of signal size",
                "D. The energy is the integral of x(t)"
              ],
              "correct_option": "C",
              "explanation": "Positive and negative signed areas can cancel even when the signal has nonzero amplitude over time.",
              "wrong_option_explanations": {
                "A": "Zero signed area does not imply zero energy.",
                "B": "A nonzero waveform can still have total signed area 0.",
                "D": "Energy uses squared magnitude, not the raw signal."
              },
              "hint": "Ask whether cancellation means the waveform was actually absent.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "In the lesson visual, the top waveform's positive and negative shaded areas cancel. What does the bottom |x(t)|^2 plot show?",
              "options": [
                "A. All contributions become nonnegative before integration",
                "B. The negative lobe disappears from the signal",
                "C. Energy only counts positive-time values",
                "D. The signal's duration no longer matters"
              ],
              "correct_option": "A",
              "explanation": "Squaring the magnitude makes the contribution to energy nonnegative, so negative signal values still add to energy.",
              "wrong_option_explanations": {
                "B": "The negative part does not disappear; its magnitude contributes positively.",
                "C": "Energy integrates over all time, not just positive time.",
                "D": "Duration still matters because the integral accumulates over time."
              },
              "hint": "Look at whether the squared plot goes below the axis.",
              "needs_visual": true,
              "visual_type": "wrong_vs_right_visual_check",
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "energy_formula",
          "label": "Continuous-time signal energy formula",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "Which formula is the textbook definition of continuous-time signal energy?",
              "options": [
                "A. E_x = \\int_{-\\infty}^{\\infty} x(t)\\,dt",
                "B. E_x = \\int_{-\\infty}^{\\infty} |x(t)|^2\\,dt",
                "C. E_x = \\int_{0}^{\\infty} |x(t)|\\,dt",
                "D. E_x = |\\int_{-\\infty}^{\\infty} x(t)\\,dt|^2"
              ],
              "correct_option": "B",
              "explanation": "Signal energy is the integral of squared magnitude over all time.",
              "wrong_option_explanations": {
                "A": "That is signed area, which can cancel.",
                "C": "This uses magnitude but not squared magnitude, and only integrates from 0 to infinity.",
                "D": "Squaring the final signed area is not the same as integrating squared magnitude."
              },
              "hint": "Energy accumulates local squared magnitude, not final net area.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp2_q2",
              "type": "short_answer",
              "stem": "A classmate computes signal energy using \\(\\int x(t)\\,dt\\). Explain precisely why this is wrong.",
              "ideal_answer": "That computes signed area, not energy. Positive and negative parts can cancel. Energy must integrate squared magnitude: \\(E_x = \\int_{-\\infty}^{\\infty}|x(t)|^2\\,dt\\).",
              "grading_rubric": [
                "Must identify \\(\\int x(t)\\,dt\\) as signed area",
                "Must mention cancellation of positive and negative parts",
                "Must give the correct squared-magnitude energy formula"
              ],
              "explanation": "This checks whether the student understands why the square is present, not just the memorized formula.",
              "hint": "What happens if a positive lobe and negative lobe have equal area?",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "real_signal_simplification",
          "label": "Energy formula for real-valued signals",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "For a real-valued signal x(t), which expression correctly simplifies the energy formula?",
              "options": [
                "A. E_x = \\int_{-\\infty}^{\\infty} x(t)\\,dt",
                "B. E_x = \\int_{-\\infty}^{\\infty} x^2(t)\\,dt",
                "C. E_x = \\left(\\int_{-\\infty}^{\\infty} x(t)\\,dt\\right)^2",
                "D. E_x = \\int_{-\\infty}^{\\infty} |x(t)|\\,dt"
              ],
              "correct_option": "B",
              "explanation": "For real-valued signals, \\(|x(t)|^2 = x^2(t)\\), so energy becomes the integral of \\(x^2(t)\\).",
              "wrong_option_explanations": {
                "A": "This drops the square and becomes signed area.",
                "C": "Squaring after integration is not the same as integrating the square.",
                "D": "This is an absolute-area measure, not the energy definition used here."
              },
              "hint": "Real-valued simplification keeps the square.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "rectangular_pulse_example",
          "label": "Representative energy calculation",
          "importance": "high",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp4_q1",
              "type": "multiple_choice",
              "stem": "A rectangular pulse has amplitude 3 for 2 seconds and is zero elsewhere. What is its energy?",
              "options": [
                "A. 6",
                "B. 9",
                "C. 18",
                "D. 36"
              ],
              "correct_option": "C",
              "explanation": "For a constant rectangular pulse, \\(E_x = A^2T = 3^2 \\cdot 2 = 18\\).",
              "wrong_option_explanations": {
                "A": "This uses amplitude times duration, not squared amplitude times duration.",
                "B": "This squares the amplitude but forgets duration.",
                "D": "This incorrectly squares both amplitude and duration."
              },
              "hint": "Use \\(A^2T\\), not \\(AT\\).",
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
