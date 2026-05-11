# Agent A Preview: 1.7-8 1.7-8 Stable and Unstable Systems

- Difficulty: intermediate
- Estimated read minutes: 6

## Learning Objectives

- Define external stability in the BIBO sense.
- Use bounded-input bounded-output logic to prove a system is stable.
- Use one bounded counterexample input to prove a system is unstable.
- Recognize why squaring, multiplying by time, and differentiating can behave differently under BIBO stability.

## Visualization Need

```json
{
  "level": "interactive",
  "reason": [
    "input_output_response_is_visual",
    "formula_to_phenomenon_gap",
    "student_should_manipulate_to_understand",
    "misconception_needs_visual_correction"
  ],
  "recommended_assets": [
    "react_canvas_demo"
  ]
}
```

## Visual Plan

```json
{
  "primary_anchor": "react_demo",
  "rationale": "BIBO stability is a definition-first concept, but students understand it faster when they can test bounded inputs against different systems and watch whether the output remains bounded. There is no textbook figure on the available page, and a static reference image would not show the input-output test as well as an interactive demo.",
  "cram": "Use the demo to memorize the exam trigger: bounded input plus unbounded output means unstable.",
  "standard": "Use the demo to connect the BIBO definition to one stable example and two unstable counterexamples.",
  "top_score": "Use the demo to separate amplitude boundedness from smoothness, growth with time, and impulse behavior."
}
```

## Planned Blocks

### Block 1: `text_explanation`
- **instruction**: Render Page 1 as a minimal overview only. Include exactly two parts: (1) a heading 'Section Objective' followed by one sentence: 'Decide whether a system is BIBO-stable by checking whether every bounded input always produces a bounded output.' (2) a heading 'Concepts In This Section' followed by a bullet list of concept names only: 'external stability', 'BIBO stability', 'bounded-input test', 'counterexample for instability', 'stable squaring system', 'unstable time-multiplier system', 'unstable differentiator'. Do not add background paragraphs or explanations on this page.

### Block 2: `math_block`
- **latex**: |x(t)| \le M_x < \infty \ \text{for all } t \quad \Longrightarrow \quad |y(t)| \le M_y < \infty \ \text{for all } t
- **explanation_instruction**: Start Page 2 with the heading '## 1. BIBO stability: the input-output test'. Explain in 100–140 words that this is external stability: we only inspect the input terminal and output terminal, not the internal state of the system. Define \(M_x\) as a finite input bound and \(M_y\) as a finite output bound. State when to use the formula: whenever the question asks whether a system is stable in the BIBO sense. State the exam trigger: 'bounded input' plus 'guaranteed bounded output for every such input'. State the common misuse: testing only one friendly input cannot prove stability, but one bounded input that creates an unbounded output can prove instability. Include one minimal example sentence: 'If \(|x(t)|\le 3\), the input amplitude never exceeds 3.'

### Block 3: `interactive_demo`
- **teaching_role**: concept_anchor
- **mode_specific_visual_use**:
```json
{
  "cram": "Let students quickly classify each system by watching whether the output escapes the bound box.",
  "standard": "Use the demo after the BIBO formula to connect the definition to the three textbook examples.",
  "top_score": "Use toggles to expose the difference between bounded amplitude, growing time factors, and impulse-like derivative behavior."
}
```
- **instruction**: Create a React + Canvas interactive demo titled 'BIBO Test Bench'. Show two stacked plots: input \(x(t)\) on top and output \(y(t)\) below. Add horizontal shaded bound bands labeled 'bounded amplitude range'. Provide a dropdown with exactly these systems: \(y(t)=x^2(t)\), \(y(t)=t x(t)\), and \(y(t)=\frac{d}{dt}x(t)\). Provide input buttons: bounded sinusoid, unit step \(u(t)\), and bounded pulse. For \(y=x^2\), show the output staying within a finite nonnegative band. For \(y=t x(t)\) with \(x(t)=u(t)\), show a ramp growing outside the bound band and label it 'unbounded as \(t\to\infty\)'. For the differentiator with \(x(t)=u(t)\), show a narrow spike at \(t=0\) labeled '\(\delta(t)\): not bounded'. Include a small conclusion panel that updates to 'BIBO-stable' or 'BIBO-unstable' with one sentence explaining why.

### Block 4: `math_block`
- **latex**: |y(t)| = |x^2(t)| = |x(t)|^2 \le M_x^2 < \infty
- **explanation_instruction**: Start Page 3 with the heading '## 2. Proving stability: square a bounded input'. Explain in 100–140 words that \(y(t)=x^2(t)\) is BIBO-stable because every bounded input remains bounded after squaring. Define \(M_x\) as the maximum possible magnitude of the input. Explain that the output bound can be chosen as \(M_y=M_x^2\). Include the representative worked example: if \(|x(t)|\le 4\), then \(|y(t)|\le 16\), so the output is bounded. State the exam note: to prove stability, do not use only one sample input; show a bound that works for any bounded input. Common misuse: thinking squaring is unstable because values get larger; larger is still stable if it is finite.

### Block 5: `math_block`
- **latex**: x(t)=u(t) \quad \Longrightarrow \quad y(t)=t u(t)
- **explanation_instruction**: Start Page 4 with the heading '## 3. Proving instability: one bounded counterexample is enough'. Explain in 100–140 words that the system \(y(t)=t x(t)\) is BIBO-unstable. Use the unit step \(u(t)\) as the representative bounded input: its amplitude is never bigger than 1. But the output \(t u(t)\) grows without limit as \(t\to\infty\), so no finite \(M_y\) can bound it. State the exam trigger: if the system multiplies by an unbounded time factor, try a bounded input that does not decay, such as \(u(t)\). State the common misuse: do not say the system is stable just because the input is bounded; the output must also be bounded.

### Block 6: `math_block`
- **latex**: x(t)=u(t) \quad \Longrightarrow \quad y(t)=\frac{d}{dt}u(t)=\delta(t)
- **explanation_instruction**: Start Page 5 with the heading '## 4. Differentiation can destroy BIBO stability'. Explain in 100–140 words that the differentiator \(y(t)=\frac{d}{dt}x(t)\) is BIBO-unstable in the BIBO sense. Use the bounded input \(x(t)=u(t)\). Its derivative is the impulse \(\delta(t)\), which is not a bounded ordinary-amplitude signal at \(t=0\). Briefly remind students that \(\delta(t)\) is an ideal spike used in signals and systems, not a finite-height pulse. State the exam trigger: a sudden jump in a bounded input can become an impulse after differentiation. State the common misuse: confusing 'finite area' of an impulse with 'bounded amplitude'.

### Block 7: `text_explanation`
- **instruction**: Start Page 6 with the heading '## 5. External vs internal stability'. Write 80–110 words. Explain that this section only uses external stability, also called BIBO stability, because it can be checked from input and output behavior. Mention that internal stability depends on what happens inside the system and is postponed until internal system behavior is introduced later. Include one exam note: if the problem says 'BIBO' or gives only an input-output equation, use the external bounded-input bounded-output test, not internal state arguments. Keep this page short and do not introduce new formulas.

### Block 8: `section_summary`
- **instruction**: Create the recap page titled '📌 Key Takeaways'. Include 4 bullets, each no more than 22 words. The bullets must explicitly include these core formulas: \(|x(t)|\le M_x<\infty \Rightarrow |y(t)|\le M_y<\infty\), \(|x^2(t)|\le M_x^2\), \(x(t)=u(t)\Rightarrow y(t)=tu(t)\) is unbounded, and \(\frac{d}{dt}u(t)=\delta(t)\) is not BIBO-bounded. End with one bridge sentence: 'Next, you will use these classification tests to recognize system properties quickly from equations.'

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
    "id": "bibo_definition",
    "label": "BIBO stability definition",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "bibo_def_q1",
        "type": "multiple_choice",
        "stem": "Which statement correctly describes BIBO stability?",
        "options": [
          "A. Every input must produce a zero output.",
          "B. Every bounded input must produce a bounded output.",
          "C. At least one bounded input must produce a bounded output.",
          "D. Every unbounded input must produce an unbounded output."
        ],
        "correct_option": "B",
        "explanation": "BIBO means bounded-input bounded-output: every bounded input must lead to a bounded output.",
        "wrong_option_explanations": {
          "A": "Stability does not require the output to be zero.",
          "C": "One successful input is not enough to prove BIBO stability.",
          "D": "BIBO stability does not classify what must happen for unbounded inputs."
        },
        "hint": "Focus on the word 'every'.",
        "needs_visual": false,
        "same_point_variant": false
      },
      {
        "id": "bibo_def_q2",
        "type": "multiple_choice",
        "stem": "A system is tested with one bounded input, and the output is bounded. What can you conclude?",
        "options": [
          "A. The system is definitely BIBO-stable.",
          "B. The system is definitely BIBO-unstable.",
          "C. This single test does not prove BIBO stability.",
          "D. The system must be internally stable."
        ],
        "correct_option": "C",
        "explanation": "To prove BIBO stability, the output must be bounded for every bounded input, not just one selected input.",
        "wrong_option_explanations": {
          "A": "One friendly input cannot prove the universal condition.",
          "B": "A bounded output for one input does not prove instability either.",
          "D": "Internal stability is a different idea and is not determined by this external test alone."
        },
        "hint": "One counterexample can disprove; one successful example cannot prove.",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "stable_square_system",
    "label": "Proving that y(t)=x^2(t) is BIBO-stable",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "square_q1",
        "type": "multiple_choice",
        "stem": "If \\(|x(t)|\\le 5\\) for all \\(t\\), what output bound proves \\(y(t)=x^2(t)\\) is bounded?",
        "options": [
          "A. \\(|y(t)|\\le 5\\)",
          "B. \\(|y(t)|\\le 10\\)",
          "C. \\(|y(t)|\\le 25\\)",
          "D. \\(|y(t)|\\le t^2\\)"
        ],
        "correct_option": "C",
        "explanation": "Since \\(|y(t)|=|x(t)|^2\\), the output is bounded by \\(5^2=25\\).",
        "wrong_option_explanations": {
          "A": "Squaring a value with magnitude up to 5 can produce values up to 25.",
          "B": "10 is not the guaranteed bound from squaring the input bound.",
          "D": "A bound depending on \\(t\\) is not a fixed finite amplitude bound for all time."
        },
        "hint": "Square the input amplitude bound.",
        "needs_visual": false,
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "unstable_counterexample",
    "label": "Using one bounded counterexample to prove instability",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "counterexample_q1",
        "type": "multiple_choice",
        "stem": "For the system \\(y(t)=t x(t)\\), which bounded input is enough to prove BIBO instability?",
        "options": [
          "A. \\(x(t)=0\\), because the output is zero",
          "B. \\(x(t)=u(t)\\), because the output is \\(t u(t)\\)",
          "C. \\(x(t)=e^{-t}u(t)\\), because the output decays",
          "D. \\(x(t)=\\delta(t)\\), because impulses are always bounded"
        ],
        "correct_option": "B",
        "explanation": "\\(u(t)\\) is bounded, but \\(t u(t)\\) grows without limit, so the system is BIBO-unstable.",
        "wrong_option_explanations": {
          "A": "The zero input gives a bounded output, but that does not prove stability or instability.",
          "C": "This input may not expose the unbounded time multiplier clearly.",
          "D": "An impulse is not bounded in ordinary amplitude, so it is not a valid bounded-input counterexample."
        },
        "hint": "Find a bounded input that does not shrink as \\(t\\) grows.",
        "needs_visual": false,
        "same_point_variant": false
      },
      {
        "id": "counterexample_q2",
        "type": "multiple_choice",
        "stem": "Observe the BIBO Test Bench with system \\(y(t)=t x(t)\\) and input \\(x(t)=u(t)\\). The output ramp leaves every fixed bound as time increases. What is the correct conclusion?",
        "options": [
          "A. The system is BIBO-stable because the input is bounded.",
          "B. The system is BIBO-unstable because a bounded input creates an unbounded output.",
          "C. The system is BIBO-stable because the ramp is continuous.",
          "D. No conclusion is possible because only sinusoidal inputs count."
        ],
        "correct_option": "B",
        "explanation": "One bounded input that produces an unbounded output is enough to disprove BIBO stability.",
        "wrong_option_explanations": {
          "A": "The output also has to be bounded.",
          "C": "Continuity does not imply boundedness.",
          "D": "BIBO stability must hold for all bounded inputs, not only sinusoids."
        },
        "hint": "BIBO instability needs only one bounded counterexample.",
        "needs_visual": true,
        "visual_type": "demo_observation_check",
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "differentiator_instability",
    "label": "Differentiator instability with a step input",
    "importance": "medium",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "diff_q1",
        "type": "multiple_choice",
        "stem": "Why does the input \\(x(t)=u(t)\\) show that \\(y(t)=\\frac{d}{dt}x(t)\\) is not BIBO-stable?",
        "options": [
          "A. \\(u(t)\\) is unbounded, so it violates the BIBO test.",
          "B. \\(\\frac{d}{dt}u(t)=\\delta(t)\\), and the impulse is not bounded in amplitude.",
          "C. The derivative of every bounded signal is always zero.",
          "D. The output is bounded because the impulse has finite area."
        ],
        "correct_option": "B",
        "explanation": "The unit step is bounded, but its derivative is an ideal impulse, which is not bounded in amplitude.",
        "wrong_option_explanations": {
          "A": "\\(u(t)\\) is bounded between 0 and 1.",
          "C": "Bounded signals can have nonzero derivatives, especially at jumps.",
          "D": "Finite area is not the same as bounded amplitude."
        },
        "hint": "Do not confuse impulse area with impulse height.",
        "needs_visual": true,
        "visual_type": "visual_pattern_recognition_check",
        "same_point_variant": false
      },
      {
        "id": "diff_q2",
        "type": "short_answer",
        "stem": "A classmate says: 'The differentiator is BIBO-stable because the impulse \\(\\delta(t)\\) has finite area.' Explain the mistake in one or two sentences.",
        "ideal_answer": "BIBO stability is about bounded amplitude, not finite area. The bounded input \\(u(t)\\) produces \\(\\delta(t)\\), which is an ideal infinite-height spike, so the output is not bounded.",
        "grading_rubric": [
          "Must state that BIBO uses amplitude boundedness.",
          "Must identify \\(u(t)\\) as a bounded input.",
          "Must state that \\(\\delta(t)\\) is not bounded in amplitude.",
          "Must not claim that finite area implies BIBO stability."
        ],
        "explanation": "This checks whether the student understands the exact stability condition rather than relying on impulse area intuition.",
        "hint": "Ask whether there is a finite \\(M_y\\) that bounds the impulse height.",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  }
]
```

## Raw JSON

```json
{
  "section_id": "1.7-8",
  "section_title": "1.7-8 Stable and Unstable Systems",
  "difficulty": "intermediate",
  "estimated_read_minutes": 6,
  "learning_objectives": [
    "Define external stability in the BIBO sense.",
    "Use bounded-input bounded-output logic to prove a system is stable.",
    "Use one bounded counterexample input to prove a system is unstable.",
    "Recognize why squaring, multiplying by time, and differentiating can behave differently under BIBO stability."
  ],
  "visualization_need": {
    "level": "interactive",
    "reason": [
      "input_output_response_is_visual",
      "formula_to_phenomenon_gap",
      "student_should_manipulate_to_understand",
      "misconception_needs_visual_correction"
    ],
    "recommended_assets": [
      "react_canvas_demo"
    ]
  },
  "visual_plan": {
    "primary_anchor": "react_demo",
    "rationale": "BIBO stability is a definition-first concept, but students understand it faster when they can test bounded inputs against different systems and watch whether the output remains bounded. There is no textbook figure on the available page, and a static reference image would not show the input-output test as well as an interactive demo.",
    "cram": "Use the demo to memorize the exam trigger: bounded input plus unbounded output means unstable.",
    "standard": "Use the demo to connect the BIBO definition to one stable example and two unstable counterexamples.",
    "top_score": "Use the demo to separate amplitude boundedness from smoothness, growth with time, and impulse behavior."
  },
  "blocks": [
    {
      "type": "text_explanation",
      "instruction": "Render Page 1 as a minimal overview only. Include exactly two parts: (1) a heading 'Section Objective' followed by one sentence: 'Decide whether a system is BIBO-stable by checking whether every bounded input always produces a bounded output.' (2) a heading 'Concepts In This Section' followed by a bullet list of concept names only: 'external stability', 'BIBO stability', 'bounded-input test', 'counterexample for instability', 'stable squaring system', 'unstable time-multiplier system', 'unstable differentiator'. Do not add background paragraphs or explanations on this page."
    },
    {
      "type": "math_block",
      "latex": "|x(t)| \\le M_x < \\infty \\ \\text{for all } t \\quad \\Longrightarrow \\quad |y(t)| \\le M_y < \\infty \\ \\text{for all } t",
      "explanation_instruction": "Start Page 2 with the heading '## 1. BIBO stability: the input-output test'. Explain in 100–140 words that this is external stability: we only inspect the input terminal and output terminal, not the internal state of the system. Define \\(M_x\\) as a finite input bound and \\(M_y\\) as a finite output bound. State when to use the formula: whenever the question asks whether a system is stable in the BIBO sense. State the exam trigger: 'bounded input' plus 'guaranteed bounded output for every such input'. State the common misuse: testing only one friendly input cannot prove stability, but one bounded input that creates an unbounded output can prove instability. Include one minimal example sentence: 'If \\(|x(t)|\\le 3\\), the input amplitude never exceeds 3.'"
    },
    {
      "type": "interactive_demo",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Let students quickly classify each system by watching whether the output escapes the bound box.",
        "standard": "Use the demo after the BIBO formula to connect the definition to the three textbook examples.",
        "top_score": "Use toggles to expose the difference between bounded amplitude, growing time factors, and impulse-like derivative behavior."
      },
      "instruction": "Create a React + Canvas interactive demo titled 'BIBO Test Bench'. Show two stacked plots: input \\(x(t)\\) on top and output \\(y(t)\\) below. Add horizontal shaded bound bands labeled 'bounded amplitude range'. Provide a dropdown with exactly these systems: \\(y(t)=x^2(t)\\), \\(y(t)=t x(t)\\), and \\(y(t)=\\frac{d}{dt}x(t)\\). Provide input buttons: bounded sinusoid, unit step \\(u(t)\\), and bounded pulse. For \\(y=x^2\\), show the output staying within a finite nonnegative band. For \\(y=t x(t)\\) with \\(x(t)=u(t)\\), show a ramp growing outside the bound band and label it 'unbounded as \\(t\\to\\infty\\)'. For the differentiator with \\(x(t)=u(t)\\), show a narrow spike at \\(t=0\\) labeled '\\(\\delta(t)\\): not bounded'. Include a small conclusion panel that updates to 'BIBO-stable' or 'BIBO-unstable' with one sentence explaining why."
    },
    {
      "type": "math_block",
      "latex": "|y(t)| = |x^2(t)| = |x(t)|^2 \\le M_x^2 < \\infty",
      "explanation_instruction": "Start Page 3 with the heading '## 2. Proving stability: square a bounded input'. Explain in 100–140 words that \\(y(t)=x^2(t)\\) is BIBO-stable because every bounded input remains bounded after squaring. Define \\(M_x\\) as the maximum possible magnitude of the input. Explain that the output bound can be chosen as \\(M_y=M_x^2\\). Include the representative worked example: if \\(|x(t)|\\le 4\\), then \\(|y(t)|\\le 16\\), so the output is bounded. State the exam note: to prove stability, do not use only one sample input; show a bound that works for any bounded input. Common misuse: thinking squaring is unstable because values get larger; larger is still stable if it is finite."
    },
    {
      "type": "math_block",
      "latex": "x(t)=u(t) \\quad \\Longrightarrow \\quad y(t)=t u(t)",
      "explanation_instruction": "Start Page 4 with the heading '## 3. Proving instability: one bounded counterexample is enough'. Explain in 100–140 words that the system \\(y(t)=t x(t)\\) is BIBO-unstable. Use the unit step \\(u(t)\\) as the representative bounded input: its amplitude is never bigger than 1. But the output \\(t u(t)\\) grows without limit as \\(t\\to\\infty\\), so no finite \\(M_y\\) can bound it. State the exam trigger: if the system multiplies by an unbounded time factor, try a bounded input that does not decay, such as \\(u(t)\\). State the common misuse: do not say the system is stable just because the input is bounded; the output must also be bounded."
    },
    {
      "type": "math_block",
      "latex": "x(t)=u(t) \\quad \\Longrightarrow \\quad y(t)=\\frac{d}{dt}u(t)=\\delta(t)",
      "explanation_instruction": "Start Page 5 with the heading '## 4. Differentiation can destroy BIBO stability'. Explain in 100–140 words that the differentiator \\(y(t)=\\frac{d}{dt}x(t)\\) is BIBO-unstable in the BIBO sense. Use the bounded input \\(x(t)=u(t)\\). Its derivative is the impulse \\(\\delta(t)\\), which is not a bounded ordinary-amplitude signal at \\(t=0\\). Briefly remind students that \\(\\delta(t)\\) is an ideal spike used in signals and systems, not a finite-height pulse. State the exam trigger: a sudden jump in a bounded input can become an impulse after differentiation. State the common misuse: confusing 'finite area' of an impulse with 'bounded amplitude'."
    },
    {
      "type": "text_explanation",
      "instruction": "Start Page 6 with the heading '## 5. External vs internal stability'. Write 80–110 words. Explain that this section only uses external stability, also called BIBO stability, because it can be checked from input and output behavior. Mention that internal stability depends on what happens inside the system and is postponed until internal system behavior is introduced later. Include one exam note: if the problem says 'BIBO' or gives only an input-output equation, use the external bounded-input bounded-output test, not internal state arguments. Keep this page short and do not introduce new formulas."
    },
    {
      "type": "section_summary",
      "instruction": "Create the recap page titled '📌 Key Takeaways'. Include 4 bullets, each no more than 22 words. The bullets must explicitly include these core formulas: \\(|x(t)|\\le M_x<\\infty \\Rightarrow |y(t)|\\le M_y<\\infty\\), \\(|x^2(t)|\\le M_x^2\\), \\(x(t)=u(t)\\Rightarrow y(t)=tu(t)\\) is unbounded, and \\(\\frac{d}{dt}u(t)=\\delta(t)\\) is not BIBO-bounded. End with one bridge sentence: 'Next, you will use these classification tests to recognize system properties quickly from equations.'"
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
          "id": "bibo_definition",
          "label": "BIBO stability definition",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "bibo_def_q1",
              "type": "multiple_choice",
              "stem": "Which statement correctly describes BIBO stability?",
              "options": [
                "A. Every input must produce a zero output.",
                "B. Every bounded input must produce a bounded output.",
                "C. At least one bounded input must produce a bounded output.",
                "D. Every unbounded input must produce an unbounded output."
              ],
              "correct_option": "B",
              "explanation": "BIBO means bounded-input bounded-output: every bounded input must lead to a bounded output.",
              "wrong_option_explanations": {
                "A": "Stability does not require the output to be zero.",
                "C": "One successful input is not enough to prove BIBO stability.",
                "D": "BIBO stability does not classify what must happen for unbounded inputs."
              },
              "hint": "Focus on the word 'every'.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "bibo_def_q2",
              "type": "multiple_choice",
              "stem": "A system is tested with one bounded input, and the output is bounded. What can you conclude?",
              "options": [
                "A. The system is definitely BIBO-stable.",
                "B. The system is definitely BIBO-unstable.",
                "C. This single test does not prove BIBO stability.",
                "D. The system must be internally stable."
              ],
              "correct_option": "C",
              "explanation": "To prove BIBO stability, the output must be bounded for every bounded input, not just one selected input.",
              "wrong_option_explanations": {
                "A": "One friendly input cannot prove the universal condition.",
                "B": "A bounded output for one input does not prove instability either.",
                "D": "Internal stability is a different idea and is not determined by this external test alone."
              },
              "hint": "One counterexample can disprove; one successful example cannot prove.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "stable_square_system",
          "label": "Proving that y(t)=x^2(t) is BIBO-stable",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "square_q1",
              "type": "multiple_choice",
              "stem": "If \\(|x(t)|\\le 5\\) for all \\(t\\), what output bound proves \\(y(t)=x^2(t)\\) is bounded?",
              "options": [
                "A. \\(|y(t)|\\le 5\\)",
                "B. \\(|y(t)|\\le 10\\)",
                "C. \\(|y(t)|\\le 25\\)",
                "D. \\(|y(t)|\\le t^2\\)"
              ],
              "correct_option": "C",
              "explanation": "Since \\(|y(t)|=|x(t)|^2\\), the output is bounded by \\(5^2=25\\).",
              "wrong_option_explanations": {
                "A": "Squaring a value with magnitude up to 5 can produce values up to 25.",
                "B": "10 is not the guaranteed bound from squaring the input bound.",
                "D": "A bound depending on \\(t\\) is not a fixed finite amplitude bound for all time."
              },
              "hint": "Square the input amplitude bound.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "unstable_counterexample",
          "label": "Using one bounded counterexample to prove instability",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "counterexample_q1",
              "type": "multiple_choice",
              "stem": "For the system \\(y(t)=t x(t)\\), which bounded input is enough to prove BIBO instability?",
              "options": [
                "A. \\(x(t)=0\\), because the output is zero",
                "B. \\(x(t)=u(t)\\), because the output is \\(t u(t)\\)",
                "C. \\(x(t)=e^{-t}u(t)\\), because the output decays",
                "D. \\(x(t)=\\delta(t)\\), because impulses are always bounded"
              ],
              "correct_option": "B",
              "explanation": "\\(u(t)\\) is bounded, but \\(t u(t)\\) grows without limit, so the system is BIBO-unstable.",
              "wrong_option_explanations": {
                "A": "The zero input gives a bounded output, but that does not prove stability or instability.",
                "C": "This input may not expose the unbounded time multiplier clearly.",
                "D": "An impulse is not bounded in ordinary amplitude, so it is not a valid bounded-input counterexample."
              },
              "hint": "Find a bounded input that does not shrink as \\(t\\) grows.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "counterexample_q2",
              "type": "multiple_choice",
              "stem": "Observe the BIBO Test Bench with system \\(y(t)=t x(t)\\) and input \\(x(t)=u(t)\\). The output ramp leaves every fixed bound as time increases. What is the correct conclusion?",
              "options": [
                "A. The system is BIBO-stable because the input is bounded.",
                "B. The system is BIBO-unstable because a bounded input creates an unbounded output.",
                "C. The system is BIBO-stable because the ramp is continuous.",
                "D. No conclusion is possible because only sinusoidal inputs count."
              ],
              "correct_option": "B",
              "explanation": "One bounded input that produces an unbounded output is enough to disprove BIBO stability.",
              "wrong_option_explanations": {
                "A": "The output also has to be bounded.",
                "C": "Continuity does not imply boundedness.",
                "D": "BIBO stability must hold for all bounded inputs, not only sinusoids."
              },
              "hint": "BIBO instability needs only one bounded counterexample.",
              "needs_visual": true,
              "visual_type": "demo_observation_check",
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "differentiator_instability",
          "label": "Differentiator instability with a step input",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "diff_q1",
              "type": "multiple_choice",
              "stem": "Why does the input \\(x(t)=u(t)\\) show that \\(y(t)=\\frac{d}{dt}x(t)\\) is not BIBO-stable?",
              "options": [
                "A. \\(u(t)\\) is unbounded, so it violates the BIBO test.",
                "B. \\(\\frac{d}{dt}u(t)=\\delta(t)\\), and the impulse is not bounded in amplitude.",
                "C. The derivative of every bounded signal is always zero.",
                "D. The output is bounded because the impulse has finite area."
              ],
              "correct_option": "B",
              "explanation": "The unit step is bounded, but its derivative is an ideal impulse, which is not bounded in amplitude.",
              "wrong_option_explanations": {
                "A": "\\(u(t)\\) is bounded between 0 and 1.",
                "C": "Bounded signals can have nonzero derivatives, especially at jumps.",
                "D": "Finite area is not the same as bounded amplitude."
              },
              "hint": "Do not confuse impulse area with impulse height.",
              "needs_visual": true,
              "visual_type": "visual_pattern_recognition_check",
              "same_point_variant": false
            },
            {
              "id": "diff_q2",
              "type": "short_answer",
              "stem": "A classmate says: 'The differentiator is BIBO-stable because the impulse \\(\\delta(t)\\) has finite area.' Explain the mistake in one or two sentences.",
              "ideal_answer": "BIBO stability is about bounded amplitude, not finite area. The bounded input \\(u(t)\\) produces \\(\\delta(t)\\), which is an ideal infinite-height spike, so the output is not bounded.",
              "grading_rubric": [
                "Must state that BIBO uses amplitude boundedness.",
                "Must identify \\(u(t)\\) as a bounded input.",
                "Must state that \\(\\delta(t)\\) is not bounded in amplitude.",
                "Must not claim that finite area implies BIBO stability."
              ],
              "explanation": "This checks whether the student understands the exact stability condition rather than relying on impulse area intuition.",
              "hint": "Ask whether there is a finite \\(M_y\\) that bounds the impulse height.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        }
      ]
    }
  ]
}
```
