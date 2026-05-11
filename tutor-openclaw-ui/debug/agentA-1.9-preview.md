# Agent A Preview: 1.9 1.9 Internal and External Descriptions of a System

- Difficulty: intermediate
- Estimated read minutes: 6

## Learning Objectives

- Distinguish an external input-output description from an internal system description.
- Explain why external measurements may fail to reveal hidden internal signals or components.
- Use the balanced bridge circuit example to compute the external input-output relation.
- Recognize the exam trap that an external description cannot always be inverted into an internal description.

## Visualization Need

```json
{
  "level": "static",
  "reason": [
    "classification_benefits_from_figure",
    "pattern_recognition_benefits_from_figure",
    "misconception_needs_visual_correction",
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
  "rationale": "The section is built around a textbook bridge-circuit diagram that is the canonical exam-facing example, plus local LaTeX formulas for the measured input-output relation. No Wikipedia reference or generated image is needed because the available textbook figure already shows the exact hidden-capacitor example students must recognize.",
  "cram": "Use the circuit figure to recognize the black-box trap quickly: same outside behavior does not guarantee same inside.",
  "standard": "Use the figure and two formulas to connect the visible terminal measurements to the hidden internal capacitor.",
  "top_score": "Use the figure to separate total external response from hidden internal state and initial-condition effects."
}
```

## Planned Blocks

### Block 1: `text_explanation`
- **instruction**: Create Page 1 as a minimal overview only. Use exactly two sections: 'Section Objective' and 'Concepts In This Section'. Under 'Section Objective', write one sentence: 'Learn why a system's input-output behavior may not reveal what is happening inside the system.' Under 'Concepts In This Section', list only these concept names as bullets, with no explanations: external description; internal description; black-box measurements; hidden internal signals; balanced bridge example.

### Block 2: `text_explanation`
- **instruction**: Start Page 2 with the heading '## 1. External vs internal description'. Explain the distinction in 100–140 words. Use this exact teaching angle: an external description is what can be learned from the input and output terminals only; an internal description must be able to determine every possible signal inside the system. Include one representative example: measuring output voltage for a known input voltage treats the system as a sealed black box. End with this exam note: 'Exam trigger: if the problem says only input and output terminals are accessible, think external description first.' Avoid long philosophical wording.

### Block 3: `book_image`
- **source_page**: page-120
- **fig_id**: Fig. 1.41
- **caption_instruction**: Write one sentence: 'Fig. 1.41 shows a balanced bridge circuit whose hidden capacitor cannot be detected from external input-output measurements.'
- **description_instruction**: In 2–3 sentences, describe the left circuit with the 3 Ω resistor, two balanced 2 Ω branches, capacitor between internal nodes a and b, input x(t), and output y(t). Then describe the right circuit as the externally equivalent circuit. Tell students to notice that the capacitor is internal and invisible to terminal-only measurements.
- **teaching_role**: concept_anchor
- **mode_specific_visual_use**:
```json
{
  "cram": "Use the figure to spot the hidden-component exam trap immediately.",
  "standard": "Use the figure to connect the black-box idea to the bridge-circuit computation.",
  "top_score": "Use the figure to reason about which internal quantities remain unknowable from terminal behavior."
}
```

### Block 4: `text_explanation`
- **instruction**: Continue Page 3 after Fig. 1.41 with the heading '## 2. The balanced bridge: why the capacitor disappears externally'. Explain in 100–150 words. State that with zero initial capacitor charge, the balanced branches split the current equally, so the capacitor voltage stays zero. Therefore, for the external input-output calculation, the capacitor can be removed or treated as irrelevant. Include a minimal worked example in words: if x(t) is applied at the input, the outside terminals behave like the simpler circuit in Fig. 1.41(b). End with the common mistake: 'Do not conclude that the capacitor is absent physically; conclude only that it is absent from the external description.'

### Block 5: `math_block`
- **latex**: i(t)=\frac{1}{5}x(t)
- **explanation_instruction**: Explain in 60–90 words. Say this formula comes from the external equivalent circuit: the input sees a total resistance of 5 Ω, so the measured current is one-fifth of the input voltage. Define \(i(t)\) as the current through the accessible external path and \(x(t)\) as the applied input voltage. Use it when the bridge is balanced and the input-output behavior is being computed. Exam trigger: 'input sees a load of 5 Ω.' Common misuse: using this formula to claim all internal branch currents are known.

### Block 6: `math_block`
- **latex**: y(t)=\frac{2}{5}x(t)
- **explanation_instruction**: Explain in 70–100 words. State that this is the external input-output relationship for the system in Fig. 1.41. Define \(y(t)\) as the output voltage and \(x(t)\) as the input voltage. Mention that \(y(t)=2i(t)\), and substituting \(i(t)=x(t)/5\) gives \(y(t)=2x(t)/5\). Use this formula when asked for the external description. Exam trigger: 'find the input-output relationship.' Common misuse: treating this as a complete internal model of the circuit.

### Block 7: `math_block`
- **latex**: y_{Q_0}(t)=0
- **explanation_instruction**: Explain in 60–90 words. Say this expresses the textbook's key observation: the capacitor's initial charge \(Q_0\) produces zero output voltage at the external terminals because the circuit is balanced. Define \(y_{Q_0}(t)\) as the output caused only by the initial capacitor charge, with the input set to zero. Use it when separating initial-condition response from input-driven response. Exam trigger: 'initial charge on hidden capacitor.' Common misuse: assuming zero external output means zero internal energy.

### Block 8: `text_explanation`
- **instruction**: Start Page 4 with the heading '## 3. Why external does not always determine internal'. Explain in 110–150 words. Make the core point explicit: every external description can be obtained from an internal description, but the reverse is not always possible. Use the bridge circuit as the representative example: terminal measurements reveal \(y(t)=\frac{2}{5}x(t)\), but they do not reveal the capacitor, its charge, or all internal currents and voltages. Include a quick check prompt inside the explanation: 'If two circuits produce the same y(t) for every x(t), must their internal signals be identical?' Immediately answer: 'No.' End with the exam note: 'Same transfer behavior is not proof of same internal structure.'

### Block 9: `section_summary`
- **instruction**: Create the recap page titled '📌 Key Takeaways'. Include exactly 4 bullets, each ≤24 words. The bullets must explicitly include these formulas: \(i(t)=\frac{1}{5}x(t)\), \(y(t)=\frac{2}{5}x(t)\), and \(y_{Q_0}(t)=0\). Also include the conclusion that external descriptions do not necessarily reveal internal signals. End with one bridge sentence: 'Next, state-space descriptions will formalize what an internal description looks like.'

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
    "id": "external_description_definition",
    "label": "External description as input-output behavior",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp1_q1",
        "type": "multiple_choice",
        "stem": "Which statement best describes an external description of a system?",
        "options": [
          "A. A description of every voltage, current, or signal inside the system",
          "B. A relationship obtainable from measurements at the input and output terminals",
          "C. A physical drawing of every component inside the system",
          "D. A description that is always enough to reconstruct the internal structure"
        ],
        "correct_option": "B",
        "explanation": "An external description is based on input-output behavior available at the external terminals.",
        "wrong_option_explanations": {
          "A": "That is closer to an internal description, not an external one.",
          "C": "A component drawing is structural information, not necessarily an input-output description.",
          "D": "The section's main point is that external behavior may not reveal internal structure."
        },
        "hint": "Ask what can be learned if the system is sealed inside a black box.",
        "needs_visual": false,
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "internal_description_definition",
    "label": "Internal description as complete signal information",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp2_q1",
        "type": "multiple_choice",
        "stem": "What must an internal description be capable of providing?",
        "options": [
          "A. Only the output signal for each input signal",
          "B. Only the system's equivalent resistance",
          "C. Complete information about all possible signals in the system",
          "D. Only the response to sinusoidal inputs"
        ],
        "correct_option": "C",
        "explanation": "An internal description must determine the signals inside the system, not only the terminal behavior.",
        "wrong_option_explanations": {
          "A": "That is an external input-output description.",
          "B": "Equivalent resistance is only one external or simplified property.",
          "D": "Sinusoidal response is one measurement method, not a full internal description."
        },
        "hint": "The word internal means more than input and output.",
        "needs_visual": false,
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "balanced_bridge_external_formula",
    "label": "External input-output formula for the balanced bridge",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp3_q1",
        "type": "multiple_choice",
        "stem": "For the balanced bridge example with zero initial capacitor charge, the input sees a 5 Ω load. What is \\(i(t)\\)?",
        "options": [
          "A. \\(i(t)=5x(t)\\)",
          "B. \\(i(t)=\\frac{1}{5}x(t)\\)",
          "C. \\(i(t)=\\frac{2}{5}x(t)\\)",
          "D. \\(i(t)=0\\)"
        ],
        "correct_option": "B",
        "explanation": "Using Ohm's-law reasoning for the external equivalent circuit, current equals voltage divided by resistance: \\(i(t)=x(t)/5\\).",
        "wrong_option_explanations": {
          "A": "This multiplies by resistance instead of dividing by it.",
          "C": "That is the output voltage relation, not the current relation.",
          "D": "The capacitor voltage stays zero, but the external current is not zero when input is applied."
        },
        "hint": "Current through a 5 Ω load is input voltage divided by 5.",
        "needs_visual": true,
        "visual_type": "book_figure_1_41",
        "same_point_variant": true
      },
      {
        "id": "kp3_q2",
        "type": "multiple_choice",
        "stem": "Using \\(i(t)=\\frac{1}{5}x(t)\\) and \\(y(t)=2i(t)\\), what is the external input-output relation?",
        "options": [
          "A. \\(y(t)=\\frac{2}{5}x(t)\\)",
          "B. \\(y(t)=\\frac{5}{2}x(t)\\)",
          "C. \\(y(t)=\\frac{1}{5}x(t)\\)",
          "D. \\(y(t)=2x(t)\\)"
        ],
        "correct_option": "A",
        "explanation": "Substitute \\(i(t)=x(t)/5\\) into \\(y(t)=2i(t)\\): \\(y(t)=2x(t)/5\\).",
        "wrong_option_explanations": {
          "B": "This inverts the ratio.",
          "C": "This gives the current relation, not the output voltage relation.",
          "D": "This forgets that \\(i(t)=x(t)/5\\)."
        },
        "hint": "Substitute the current expression into the output expression.",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "hidden_capacitor_trap",
    "label": "Hidden capacitor and zero external effect",
    "importance": "high",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp4_q1",
        "type": "multiple_choice",
        "stem": "In the balanced bridge, the initial capacitor charge \\(Q_0\\) produces \\(y_{Q_0}(t)=0\\). What is the correct conclusion?",
        "options": [
          "A. The capacitor must not exist physically",
          "B. The capacitor has no possible internal energy",
          "C. The capacitor's effect is not visible at the output terminals in this balanced setup",
          "D. The input voltage must always be zero"
        ],
        "correct_option": "C",
        "explanation": "The balanced circuit hides the capacitor's initial-charge effect from the output terminals, but the capacitor can still exist internally.",
        "wrong_option_explanations": {
          "A": "External invisibility does not prove physical absence.",
          "B": "A charged capacitor can store energy even if its effect is not visible externally.",
          "D": "The statement concerns the output due to initial charge, not all possible inputs."
        },
        "hint": "Zero external output does not mean zero internal phenomenon.",
        "needs_visual": true,
        "visual_type": "book_figure_1_41",
        "same_point_variant": true
      },
      {
        "id": "kp4_q2",
        "type": "short_answer",
        "stem": "A classmate says: 'Since the external relation is \\(y(t)=\\frac{2}{5}x(t)\\), the capacitor is not part of the system.' Explain why this is wrong.",
        "ideal_answer": "The formula is only the external input-output description. In the balanced bridge, the capacitor is internal and cannot be detected from terminal measurements, but it can still exist and have internal charge or voltage.",
        "grading_rubric": [
          "Must state that \\(y(t)=\\frac{2}{5}x(t)\\) is an external description",
          "Must explain that external measurements may fail to reveal internal components",
          "Must not claim the capacitor is physically absent"
        ],
        "explanation": "This checks the main misconception of the section: external invisibility is not the same as internal nonexistence.",
        "hint": "Distinguish 'not visible from terminals' from 'not inside the circuit.'",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "external_to_internal_noninvertibility",
    "label": "External descriptions do not always determine internal descriptions",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp5_q1",
        "type": "multiple_choice",
        "stem": "Two sealed systems produce the same output \\(y(t)\\) for every tested input \\(x(t)\\). What can you safely conclude?",
        "options": [
          "A. Their internal signals must be identical",
          "B. Their internal components must be identical",
          "C. Their external descriptions match for those tests",
          "D. Neither system has internal state"
        ],
        "correct_option": "C",
        "explanation": "Matching input-output behavior supports a matching external description, but it does not prove identical internal structure or signals.",
        "wrong_option_explanations": {
          "A": "The bridge example shows internal signals may be hidden from external measurements.",
          "B": "Different internal circuits can appear the same from outside.",
          "D": "A hidden internal state may exist even when terminal behavior does not reveal it."
        },
        "hint": "Same outside behavior is weaker than same inside behavior.",
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
  "section_id": "1.9",
  "section_title": "1.9 Internal and External Descriptions of a System",
  "difficulty": "intermediate",
  "estimated_read_minutes": 6,
  "learning_objectives": [
    "Distinguish an external input-output description from an internal system description.",
    "Explain why external measurements may fail to reveal hidden internal signals or components.",
    "Use the balanced bridge circuit example to compute the external input-output relation.",
    "Recognize the exam trap that an external description cannot always be inverted into an internal description."
  ],
  "visualization_need": {
    "level": "static",
    "reason": [
      "classification_benefits_from_figure",
      "pattern_recognition_benefits_from_figure",
      "misconception_needs_visual_correction",
      "wrong_vs_right_contrast_is_high_value"
    ],
    "recommended_assets": [
      "textbook_figure",
      "latex_native_visual"
    ]
  },
  "visual_plan": {
    "primary_anchor": "both",
    "rationale": "The section is built around a textbook bridge-circuit diagram that is the canonical exam-facing example, plus local LaTeX formulas for the measured input-output relation. No Wikipedia reference or generated image is needed because the available textbook figure already shows the exact hidden-capacitor example students must recognize.",
    "cram": "Use the circuit figure to recognize the black-box trap quickly: same outside behavior does not guarantee same inside.",
    "standard": "Use the figure and two formulas to connect the visible terminal measurements to the hidden internal capacitor.",
    "top_score": "Use the figure to separate total external response from hidden internal state and initial-condition effects."
  },
  "blocks": [
    {
      "type": "text_explanation",
      "instruction": "Create Page 1 as a minimal overview only. Use exactly two sections: 'Section Objective' and 'Concepts In This Section'. Under 'Section Objective', write one sentence: 'Learn why a system's input-output behavior may not reveal what is happening inside the system.' Under 'Concepts In This Section', list only these concept names as bullets, with no explanations: external description; internal description; black-box measurements; hidden internal signals; balanced bridge example."
    },
    {
      "type": "text_explanation",
      "instruction": "Start Page 2 with the heading '## 1. External vs internal description'. Explain the distinction in 100–140 words. Use this exact teaching angle: an external description is what can be learned from the input and output terminals only; an internal description must be able to determine every possible signal inside the system. Include one representative example: measuring output voltage for a known input voltage treats the system as a sealed black box. End with this exam note: 'Exam trigger: if the problem says only input and output terminals are accessible, think external description first.' Avoid long philosophical wording."
    },
    {
      "type": "book_image",
      "source_page": "page-120",
      "fig_id": "Fig. 1.41",
      "caption_instruction": "Write one sentence: 'Fig. 1.41 shows a balanced bridge circuit whose hidden capacitor cannot be detected from external input-output measurements.'",
      "description_instruction": "In 2–3 sentences, describe the left circuit with the 3 Ω resistor, two balanced 2 Ω branches, capacitor between internal nodes a and b, input x(t), and output y(t). Then describe the right circuit as the externally equivalent circuit. Tell students to notice that the capacitor is internal and invisible to terminal-only measurements.",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the figure to spot the hidden-component exam trap immediately.",
        "standard": "Use the figure to connect the black-box idea to the bridge-circuit computation.",
        "top_score": "Use the figure to reason about which internal quantities remain unknowable from terminal behavior."
      }
    },
    {
      "type": "text_explanation",
      "instruction": "Continue Page 3 after Fig. 1.41 with the heading '## 2. The balanced bridge: why the capacitor disappears externally'. Explain in 100–150 words. State that with zero initial capacitor charge, the balanced branches split the current equally, so the capacitor voltage stays zero. Therefore, for the external input-output calculation, the capacitor can be removed or treated as irrelevant. Include a minimal worked example in words: if x(t) is applied at the input, the outside terminals behave like the simpler circuit in Fig. 1.41(b). End with the common mistake: 'Do not conclude that the capacitor is absent physically; conclude only that it is absent from the external description.'"
    },
    {
      "type": "math_block",
      "latex": "i(t)=\\frac{1}{5}x(t)",
      "explanation_instruction": "Explain in 60–90 words. Say this formula comes from the external equivalent circuit: the input sees a total resistance of 5 Ω, so the measured current is one-fifth of the input voltage. Define \\(i(t)\\) as the current through the accessible external path and \\(x(t)\\) as the applied input voltage. Use it when the bridge is balanced and the input-output behavior is being computed. Exam trigger: 'input sees a load of 5 Ω.' Common misuse: using this formula to claim all internal branch currents are known."
    },
    {
      "type": "math_block",
      "latex": "y(t)=\\frac{2}{5}x(t)",
      "explanation_instruction": "Explain in 70–100 words. State that this is the external input-output relationship for the system in Fig. 1.41. Define \\(y(t)\\) as the output voltage and \\(x(t)\\) as the input voltage. Mention that \\(y(t)=2i(t)\\), and substituting \\(i(t)=x(t)/5\\) gives \\(y(t)=2x(t)/5\\). Use this formula when asked for the external description. Exam trigger: 'find the input-output relationship.' Common misuse: treating this as a complete internal model of the circuit."
    },
    {
      "type": "math_block",
      "latex": "y_{Q_0}(t)=0",
      "explanation_instruction": "Explain in 60–90 words. Say this expresses the textbook's key observation: the capacitor's initial charge \\(Q_0\\) produces zero output voltage at the external terminals because the circuit is balanced. Define \\(y_{Q_0}(t)\\) as the output caused only by the initial capacitor charge, with the input set to zero. Use it when separating initial-condition response from input-driven response. Exam trigger: 'initial charge on hidden capacitor.' Common misuse: assuming zero external output means zero internal energy."
    },
    {
      "type": "text_explanation",
      "instruction": "Start Page 4 with the heading '## 3. Why external does not always determine internal'. Explain in 110–150 words. Make the core point explicit: every external description can be obtained from an internal description, but the reverse is not always possible. Use the bridge circuit as the representative example: terminal measurements reveal \\(y(t)=\\frac{2}{5}x(t)\\), but they do not reveal the capacitor, its charge, or all internal currents and voltages. Include a quick check prompt inside the explanation: 'If two circuits produce the same y(t) for every x(t), must their internal signals be identical?' Immediately answer: 'No.' End with the exam note: 'Same transfer behavior is not proof of same internal structure.'"
    },
    {
      "type": "section_summary",
      "instruction": "Create the recap page titled '📌 Key Takeaways'. Include exactly 4 bullets, each ≤24 words. The bullets must explicitly include these formulas: \\(i(t)=\\frac{1}{5}x(t)\\), \\(y(t)=\\frac{2}{5}x(t)\\), and \\(y_{Q_0}(t)=0\\). Also include the conclusion that external descriptions do not necessarily reveal internal signals. End with one bridge sentence: 'Next, state-space descriptions will formalize what an internal description looks like.'"
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
          "id": "external_description_definition",
          "label": "External description as input-output behavior",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Which statement best describes an external description of a system?",
              "options": [
                "A. A description of every voltage, current, or signal inside the system",
                "B. A relationship obtainable from measurements at the input and output terminals",
                "C. A physical drawing of every component inside the system",
                "D. A description that is always enough to reconstruct the internal structure"
              ],
              "correct_option": "B",
              "explanation": "An external description is based on input-output behavior available at the external terminals.",
              "wrong_option_explanations": {
                "A": "That is closer to an internal description, not an external one.",
                "C": "A component drawing is structural information, not necessarily an input-output description.",
                "D": "The section's main point is that external behavior may not reveal internal structure."
              },
              "hint": "Ask what can be learned if the system is sealed inside a black box.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "internal_description_definition",
          "label": "Internal description as complete signal information",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "What must an internal description be capable of providing?",
              "options": [
                "A. Only the output signal for each input signal",
                "B. Only the system's equivalent resistance",
                "C. Complete information about all possible signals in the system",
                "D. Only the response to sinusoidal inputs"
              ],
              "correct_option": "C",
              "explanation": "An internal description must determine the signals inside the system, not only the terminal behavior.",
              "wrong_option_explanations": {
                "A": "That is an external input-output description.",
                "B": "Equivalent resistance is only one external or simplified property.",
                "D": "Sinusoidal response is one measurement method, not a full internal description."
              },
              "hint": "The word internal means more than input and output.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "balanced_bridge_external_formula",
          "label": "External input-output formula for the balanced bridge",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "For the balanced bridge example with zero initial capacitor charge, the input sees a 5 Ω load. What is \\(i(t)\\)?",
              "options": [
                "A. \\(i(t)=5x(t)\\)",
                "B. \\(i(t)=\\frac{1}{5}x(t)\\)",
                "C. \\(i(t)=\\frac{2}{5}x(t)\\)",
                "D. \\(i(t)=0\\)"
              ],
              "correct_option": "B",
              "explanation": "Using Ohm's-law reasoning for the external equivalent circuit, current equals voltage divided by resistance: \\(i(t)=x(t)/5\\).",
              "wrong_option_explanations": {
                "A": "This multiplies by resistance instead of dividing by it.",
                "C": "That is the output voltage relation, not the current relation.",
                "D": "The capacitor voltage stays zero, but the external current is not zero when input is applied."
              },
              "hint": "Current through a 5 Ω load is input voltage divided by 5.",
              "needs_visual": true,
              "visual_type": "book_figure_1_41",
              "same_point_variant": true
            },
            {
              "id": "kp3_q2",
              "type": "multiple_choice",
              "stem": "Using \\(i(t)=\\frac{1}{5}x(t)\\) and \\(y(t)=2i(t)\\), what is the external input-output relation?",
              "options": [
                "A. \\(y(t)=\\frac{2}{5}x(t)\\)",
                "B. \\(y(t)=\\frac{5}{2}x(t)\\)",
                "C. \\(y(t)=\\frac{1}{5}x(t)\\)",
                "D. \\(y(t)=2x(t)\\)"
              ],
              "correct_option": "A",
              "explanation": "Substitute \\(i(t)=x(t)/5\\) into \\(y(t)=2i(t)\\): \\(y(t)=2x(t)/5\\).",
              "wrong_option_explanations": {
                "B": "This inverts the ratio.",
                "C": "This gives the current relation, not the output voltage relation.",
                "D": "This forgets that \\(i(t)=x(t)/5\\)."
              },
              "hint": "Substitute the current expression into the output expression.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "hidden_capacitor_trap",
          "label": "Hidden capacitor and zero external effect",
          "importance": "high",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp4_q1",
              "type": "multiple_choice",
              "stem": "In the balanced bridge, the initial capacitor charge \\(Q_0\\) produces \\(y_{Q_0}(t)=0\\). What is the correct conclusion?",
              "options": [
                "A. The capacitor must not exist physically",
                "B. The capacitor has no possible internal energy",
                "C. The capacitor's effect is not visible at the output terminals in this balanced setup",
                "D. The input voltage must always be zero"
              ],
              "correct_option": "C",
              "explanation": "The balanced circuit hides the capacitor's initial-charge effect from the output terminals, but the capacitor can still exist internally.",
              "wrong_option_explanations": {
                "A": "External invisibility does not prove physical absence.",
                "B": "A charged capacitor can store energy even if its effect is not visible externally.",
                "D": "The statement concerns the output due to initial charge, not all possible inputs."
              },
              "hint": "Zero external output does not mean zero internal phenomenon.",
              "needs_visual": true,
              "visual_type": "book_figure_1_41",
              "same_point_variant": true
            },
            {
              "id": "kp4_q2",
              "type": "short_answer",
              "stem": "A classmate says: 'Since the external relation is \\(y(t)=\\frac{2}{5}x(t)\\), the capacitor is not part of the system.' Explain why this is wrong.",
              "ideal_answer": "The formula is only the external input-output description. In the balanced bridge, the capacitor is internal and cannot be detected from terminal measurements, but it can still exist and have internal charge or voltage.",
              "grading_rubric": [
                "Must state that \\(y(t)=\\frac{2}{5}x(t)\\) is an external description",
                "Must explain that external measurements may fail to reveal internal components",
                "Must not claim the capacitor is physically absent"
              ],
              "explanation": "This checks the main misconception of the section: external invisibility is not the same as internal nonexistence.",
              "hint": "Distinguish 'not visible from terminals' from 'not inside the circuit.'",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "external_to_internal_noninvertibility",
          "label": "External descriptions do not always determine internal descriptions",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp5_q1",
              "type": "multiple_choice",
              "stem": "Two sealed systems produce the same output \\(y(t)\\) for every tested input \\(x(t)\\). What can you safely conclude?",
              "options": [
                "A. Their internal signals must be identical",
                "B. Their internal components must be identical",
                "C. Their external descriptions match for those tests",
                "D. Neither system has internal state"
              ],
              "correct_option": "C",
              "explanation": "Matching input-output behavior supports a matching external description, but it does not prove identical internal structure or signals.",
              "wrong_option_explanations": {
                "A": "The bridge example shows internal signals may be hidden from external measurements.",
                "B": "Different internal circuits can appear the same from outside.",
                "D": "A hidden internal state may exist even when terminal behavior does not reveal it."
              },
              "hint": "Same outside behavior is weaker than same inside behavior.",
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
