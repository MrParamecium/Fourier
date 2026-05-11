# Agent A Preview: 1.7-5 Continuous-Time and Discrete-Time Systems

- Difficulty: beginner
- Estimated read minutes: 5

## Learning Objectives

- Distinguish continuous-time signals from discrete-time signals by notation and domain.
- Use uniform sampling notation correctly, especially x[n] = x(nT).
- Explain how a discrete-time system processes a sequence of samples.
- Recognize the C/D → discrete-time system → D/C processing pipeline.

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
    "book_figure"
  ]
}
```

## Visual Plan

```json
{
  "primary_anchor": "both",
  "rationale": "The sampling formula x[n] = x(nT) is easiest to understand by manipulating the sampling interval T, so use an interactive React + Canvas demo for the sample-spacing idea. The textbook already provides the canonical processing pipeline in Figure 1.32, so use that book figure for the C/D → discrete-time system → D/C architecture instead of generating a replacement.",
  "cram": "Use the visuals to instantly recognize whether a problem is asking about continuous time, discrete time, sampling, or a C/D-D/C processing chain.",
  "standard": "Use the interactive demo to connect x[n] = x(nT) to actual sample points, then use Figure 1.32 to understand one representative processing workflow.",
  "top_score": "Use the visuals to separate three ideas students often blend together: the original continuous signal, the sampled sequence, and the system that processes the sequence."
}
```

## Planned Blocks

### Block 1: `text_explanation`
- **instruction**: Create a minimal first page only. Include exactly two short sections: 'Section Objective' and 'Concepts In This Section'. For 'Section Objective', write one sentence: 'Learn how continuous-time signals, discrete-time signals, and discrete-time systems are represented and connected through sampling.' For 'Concepts In This Section', list only these concept names as bullets with no explanations: continuous-time signal, discrete-time signal, uniform sampling, sample notation x[n] = x(nT), discrete-time system, C/D and D/C conversion.

### Block 2: `math_block`
- **latex**: \text{continuous-time signal: } x(t),\quad t\in\mathbb{R}
- **explanation_instruction**: Start the page with the heading '## 1. Continuous-time signals and systems'. Explain in 90-130 words that x(t) means the signal is defined over a continuous range of time values, not just at isolated points. State that t is a real-valued time variable and x(t), y(t) are typical continuous-time signal notations. Define a continuous-time system as a system whose input and output are both continuous-time signals. Include one minimal example: a microphone voltage waveform v(t) changing continuously over time. Add an exam note: if the variable is written in parentheses, such as x(t), the problem is usually using continuous-time notation. Common misuse to mention: do not replace t with an integer index unless the signal has been sampled.

### Block 3: `math_block`
- **latex**: t_{k+1}-t_k=T
- **explanation_instruction**: Start a new page with the heading '## 2. Uniform sampling instants'. Explain in 80-120 words that discrete-time signals in this section come from samples taken at time instants t_0, t_1, t_2, and so on. This formula means consecutive sampling instants are equally spaced by the same sampling period T. Define t_k as the kth sampling time, k as an integer counter, and T as the constant time spacing between samples. Use it when a problem says samples are uniformly spaced or taken every T seconds. Add a tiny example: if T = 0.01 s, then samples are 0.01 s apart. Common misuse: T is not the sample value; it is the time spacing.

### Block 4: `math_block`
- **latex**: x[n]=x(nT)
- **explanation_instruction**: Keep this on the same sampling page after the uniform-spacing formula. Explain in 100-150 words that x[n] is the discrete-time sequence obtained by taking the continuous-time signal x(t) at t = nT. Define n as an integer sample index, T as the sampling period, x(nT) as the actual continuous-time value at the nth sampling instant, and x[n] as the simplified discrete-time notation. Include one representative worked example: if T = 0.01 and n = 5, then x[5] = x(0.05). Add an exam trigger: when the problem asks for a sampled version of x(t), immediately look for x[n] = x(nT). Common misuse: x[n] is not a function of continuous time; it is a sequence indexed by integers.

### Block 5: `interactive_demo`
- **teaching_role**: concept_anchor
- **mode_specific_visual_use**:
```json
{
  "cram": "Move T quickly and notice that larger T means fewer sample stems per same time window.",
  "standard": "Use the demo to connect each stem x[n] to the continuous value x(nT).",
  "top_score": "Use the demo to separate the index n from the physical time nT and avoid treating them as identical."
}
```
- **demo_title**: Sampling a continuous-time signal
- **instruction**: Build a React + Canvas demo with a smooth continuous curve labeled x(t) in muted gray and vertical sample stems labeled x[n] in navy. Include a slider for sampling period T with three values: small T, medium T, large T. When the student changes T, keep the underlying x(t) curve fixed while the sample stems move farther apart or closer together. Display the current formula x[n] = x(nT) below the canvas. Add a small readout for one highlighted sample: choose n = 3 and show t = 3T, then show x[3] = x(3T).
- **controls**:
```json
[
  {
    "name": "Sampling period T",
    "type": "slider",
    "values": [
      "small",
      "medium",
      "large"
    ],
    "default": "medium"
  },
  {
    "name": "Highlight sample index n",
    "type": "fixed_marker",
    "value": 3
  }
]
```
- **visual_elements**:
```json
[
  "smooth continuous curve x(t)",
  "vertical stems at t = nT",
  "highlighted stem for n = 3",
  "formula label x[n] = x(nT)",
  "short note: changing T changes sample times, not the original curve"
]
```
- **student_tasks**:
```json
[
  "Set T to large and observe whether the stems become closer together or farther apart.",
  "Identify the physical time corresponding to n = 3.",
  "Explain why x[3] is a sample value, not a time value."
]
```

### Block 6: `book_image`
- **source_page**: page-108
- **fig_id**: Figure 1.32
- **teaching_role**: concept_anchor
- **mode_specific_visual_use**:
```json
{
  "cram": "Memorize the left-to-right pipeline: x(t) → C/D → x[n] → discrete-time system → y[n] → D/C → y(t).",
  "standard": "Use the figure to see how a continuous-time signal can be processed by a discrete-time system.",
  "top_score": "Use the figure to distinguish representation conversion from the actual system processing step."
}
```
- **caption_instruction**: One sentence: Figure 1.32 shows how a continuous-time signal is converted to samples, processed by a discrete-time system, and converted back to continuous time.
- **description_instruction**: Describe the diagram as a left-to-right processing chain. Point out that x(t) and y(t) are continuous-time signals, while x[n] and y[n] are discrete-time sequences. Emphasize that the discrete-time system processes the sequence x[n], not the original continuous curve directly.

### Block 7: `math_block`
- **latex**: x[n]\;\xrightarrow{\;\text{discrete-time system}\;}\;y[n]
- **explanation_instruction**: Start a new page with the heading '## 3. Discrete-time systems and sampled-data processing'. Explain in 110-160 words that a discrete-time system takes a sequence of numbers x[n] as input and produces another sequence y[n] as output. Connect this directly to Figure 1.32: C/D converts x(t) into x[n], the discrete-time system processes x[n] into y[n], and D/C converts y[n] back into y(t). Include one representative example: a digital filter in a computer may smooth noisy samples by computing each output sample from nearby input samples. Add a quick check: if both input and output are written with square brackets, the system is discrete-time. Common misuse: do not call the whole C/D-D/C chain a purely discrete-time system; the middle processing block is discrete-time, while the full chain touches continuous-time signals too.

### Block 8: `section_summary`
- **instruction**: Create a recap page titled '📌 Key Takeaways'. Use 4 bullets, each no more than 24 words. Include these formulas explicitly: \(x(t),\ t\in\mathbb{R}\), \(t_{k+1}-t_k=T\), \(x[n]=x(nT)\), and \(x[n]\to y[n]\). Mention that C/D converts continuous-time to discrete-time and D/C converts back. End with one sentence: 'Next, systems can also be classified as analog or digital depending on the type of signal values they use.'

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
    "id": "continuous_vs_discrete_notation",
    "label": "Continuous-time versus discrete-time notation",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp1_q1",
        "type": "multiple_choice",
        "stem": "Which notation most strongly indicates a continuous-time signal?",
        "options": [
          "A. x[n]",
          "B. x(t)",
          "C. x_k only",
          "D. x[3]"
        ],
        "correct_option": "B",
        "explanation": "A continuous-time signal is written as x(t), where t can vary continuously over a range of real time values.",
        "wrong_option_explanations": {
          "A": "Square brackets usually indicate a discrete-time sequence indexed by integers.",
          "C": "A subscripted variable may be an index, but it is not the standard continuous-time signal notation here.",
          "D": "x[3] is one discrete-time sample value at index 3."
        },
        "hint": "Look for parentheses versus square brackets.",
        "needs_visual": false,
        "same_point_variant": false
      },
      {
        "id": "kp1_q2",
        "type": "multiple_choice",
        "stem": "A system has input x(t) and output y(t). Based only on this notation, how should it be classified?",
        "options": [
          "A. Continuous-time system",
          "B. Discrete-time system",
          "C. Digital system",
          "D. Invertible system"
        ],
        "correct_option": "A",
        "explanation": "If both input and output are continuous-time signals, the system is a continuous-time system.",
        "wrong_option_explanations": {
          "B": "A discrete-time system would normally use x[n] and y[n].",
          "C": "Digital refers to signal value quantization, not merely the time variable notation.",
          "D": "Invertibility cannot be determined from x(t) and y(t) notation alone."
        },
        "hint": "Classify by the time domain of the input and output.",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "uniform_sampling_and_sample_notation",
    "label": "Uniform sampling and x[n] = x(nT)",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp2_q1",
        "type": "multiple_choice",
        "stem": "If samples are uniformly spaced by T = 0.02 s, what does x[4] equal?",
        "options": [
          "A. x(4)",
          "B. x(0.02)",
          "C. x(0.08)",
          "D. 4x(0.02)"
        ],
        "correct_option": "C",
        "explanation": "Using x[n] = x(nT), x[4] = x(4T) = x(4 · 0.02) = x(0.08).",
        "wrong_option_explanations": {
          "A": "This treats n as the physical time instead of using nT.",
          "B": "This is x[1], not x[4], when T = 0.02.",
          "D": "Sampling evaluates the signal at a time; it does not multiply the sample value by n."
        },
        "hint": "Use t = nT before evaluating the sample.",
        "needs_visual": false,
        "same_point_variant": false
      },
      {
        "id": "kp2_q2",
        "type": "multiple_choice",
        "stem": "In the sampling formula x[n] = x(nT), what does n represent?",
        "options": [
          "A. A continuous time variable",
          "B. The sample index, usually an integer",
          "C. The sampling period in seconds",
          "D. The output sequence"
        ],
        "correct_option": "B",
        "explanation": "n is the integer sample index. The physical sampling time is nT.",
        "wrong_option_explanations": {
          "A": "The continuous time variable is t, not n.",
          "C": "The sampling period is T.",
          "D": "The output sequence is usually written y[n]."
        },
        "hint": "Separate the index n from the time nT.",
        "needs_visual": false,
        "same_point_variant": true
      },
      {
        "id": "kp2_q3",
        "type": "multiple_choice",
        "stem": "Observe the sampling demo. When T is increased while x(t) stays fixed, what should happen to the sample stems over the same time window?",
        "options": [
          "A. They become farther apart, so fewer samples appear.",
          "B. They become closer together, so more samples appear.",
          "C. The continuous curve changes shape.",
          "D. The sample index n becomes a continuous variable."
        ],
        "correct_option": "A",
        "explanation": "T is the spacing between sample times. Increasing T spreads the sample times farther apart.",
        "wrong_option_explanations": {
          "B": "This would happen when T decreases, not when T increases.",
          "C": "The demo keeps x(t) fixed; only the sample times change.",
          "D": "n remains an integer index in discrete-time notation."
        },
        "hint": "T controls spacing between sample times.",
        "needs_visual": true,
        "visual_type": "interactive_demo_observation",
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "discrete_time_system_mapping",
    "label": "Discrete-time system maps x[n] to y[n]",
    "importance": "medium",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp3_q1",
        "type": "multiple_choice",
        "stem": "Which statement best describes a discrete-time system?",
        "options": [
          "A. It takes x(t) directly and always outputs y(t).",
          "B. It processes a sequence x[n] and produces a sequence y[n].",
          "C. It only changes signal amplitudes, never time indices.",
          "D. It must be implemented with analog hardware."
        ],
        "correct_option": "B",
        "explanation": "A discrete-time system operates on indexed sequences such as x[n] and y[n].",
        "wrong_option_explanations": {
          "A": "That describes continuous-time input and output, not the core discrete-time system notation.",
          "C": "Discrete-time systems can involve index shifts, filtering, accumulation, and other sequence operations.",
          "D": "Discrete-time systems are often implemented digitally, but the definition is about sequence input and output."
        },
        "hint": "Look for square-bracket sequence notation.",
        "needs_visual": false,
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "cd_dt_dc_pipeline",
    "label": "C/D, discrete-time processing, and D/C pipeline",
    "importance": "high",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp4_q1",
        "type": "short_answer",
        "stem": "In Figure 1.32, explain the processing chain from x(t) to y(t) in one or two sentences.",
        "ideal_answer": "The continuous-time signal x(t) is converted by a C/D converter into the sequence x[n]. A discrete-time system processes x[n] to produce y[n], and then a D/C converter reconstructs a continuous-time output y(t).",
        "grading_rubric": [
          "Must mention C/D converts x(t) to x[n].",
          "Must mention the discrete-time system processes x[n] into y[n].",
          "Must mention D/C converts y[n] into y(t).",
          "Must not claim that the discrete-time system directly processes x(t)."
        ],
        "explanation": "This checks whether the student can read the block diagram and separate conversion from discrete-time processing.",
        "hint": "Follow the arrows left to right and name each signal format.",
        "needs_visual": true,
        "visual_type": "book_figure",
        "same_point_variant": false
      }
    ]
  }
]
```

## Raw JSON

```json
{
  "section_id": "1.7-5",
  "section_title": "Continuous-Time and Discrete-Time Systems",
  "difficulty": "beginner",
  "estimated_read_minutes": 5,
  "learning_objectives": [
    "Distinguish continuous-time signals from discrete-time signals by notation and domain.",
    "Use uniform sampling notation correctly, especially x[n] = x(nT).",
    "Explain how a discrete-time system processes a sequence of samples.",
    "Recognize the C/D → discrete-time system → D/C processing pipeline."
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
      "book_figure"
    ]
  },
  "visual_plan": {
    "primary_anchor": "both",
    "rationale": "The sampling formula x[n] = x(nT) is easiest to understand by manipulating the sampling interval T, so use an interactive React + Canvas demo for the sample-spacing idea. The textbook already provides the canonical processing pipeline in Figure 1.32, so use that book figure for the C/D → discrete-time system → D/C architecture instead of generating a replacement.",
    "cram": "Use the visuals to instantly recognize whether a problem is asking about continuous time, discrete time, sampling, or a C/D-D/C processing chain.",
    "standard": "Use the interactive demo to connect x[n] = x(nT) to actual sample points, then use Figure 1.32 to understand one representative processing workflow.",
    "top_score": "Use the visuals to separate three ideas students often blend together: the original continuous signal, the sampled sequence, and the system that processes the sequence."
  },
  "blocks": [
    {
      "type": "text_explanation",
      "instruction": "Create a minimal first page only. Include exactly two short sections: 'Section Objective' and 'Concepts In This Section'. For 'Section Objective', write one sentence: 'Learn how continuous-time signals, discrete-time signals, and discrete-time systems are represented and connected through sampling.' For 'Concepts In This Section', list only these concept names as bullets with no explanations: continuous-time signal, discrete-time signal, uniform sampling, sample notation x[n] = x(nT), discrete-time system, C/D and D/C conversion."
    },
    {
      "type": "math_block",
      "latex": "\\text{continuous-time signal: } x(t),\\quad t\\in\\mathbb{R}",
      "explanation_instruction": "Start the page with the heading '## 1. Continuous-time signals and systems'. Explain in 90-130 words that x(t) means the signal is defined over a continuous range of time values, not just at isolated points. State that t is a real-valued time variable and x(t), y(t) are typical continuous-time signal notations. Define a continuous-time system as a system whose input and output are both continuous-time signals. Include one minimal example: a microphone voltage waveform v(t) changing continuously over time. Add an exam note: if the variable is written in parentheses, such as x(t), the problem is usually using continuous-time notation. Common misuse to mention: do not replace t with an integer index unless the signal has been sampled."
    },
    {
      "type": "math_block",
      "latex": "t_{k+1}-t_k=T",
      "explanation_instruction": "Start a new page with the heading '## 2. Uniform sampling instants'. Explain in 80-120 words that discrete-time signals in this section come from samples taken at time instants t_0, t_1, t_2, and so on. This formula means consecutive sampling instants are equally spaced by the same sampling period T. Define t_k as the kth sampling time, k as an integer counter, and T as the constant time spacing between samples. Use it when a problem says samples are uniformly spaced or taken every T seconds. Add a tiny example: if T = 0.01 s, then samples are 0.01 s apart. Common misuse: T is not the sample value; it is the time spacing."
    },
    {
      "type": "math_block",
      "latex": "x[n]=x(nT)",
      "explanation_instruction": "Keep this on the same sampling page after the uniform-spacing formula. Explain in 100-150 words that x[n] is the discrete-time sequence obtained by taking the continuous-time signal x(t) at t = nT. Define n as an integer sample index, T as the sampling period, x(nT) as the actual continuous-time value at the nth sampling instant, and x[n] as the simplified discrete-time notation. Include one representative worked example: if T = 0.01 and n = 5, then x[5] = x(0.05). Add an exam trigger: when the problem asks for a sampled version of x(t), immediately look for x[n] = x(nT). Common misuse: x[n] is not a function of continuous time; it is a sequence indexed by integers."
    },
    {
      "type": "interactive_demo",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Move T quickly and notice that larger T means fewer sample stems per same time window.",
        "standard": "Use the demo to connect each stem x[n] to the continuous value x(nT).",
        "top_score": "Use the demo to separate the index n from the physical time nT and avoid treating them as identical."
      },
      "demo_title": "Sampling a continuous-time signal",
      "instruction": "Build a React + Canvas demo with a smooth continuous curve labeled x(t) in muted gray and vertical sample stems labeled x[n] in navy. Include a slider for sampling period T with three values: small T, medium T, large T. When the student changes T, keep the underlying x(t) curve fixed while the sample stems move farther apart or closer together. Display the current formula x[n] = x(nT) below the canvas. Add a small readout for one highlighted sample: choose n = 3 and show t = 3T, then show x[3] = x(3T).",
      "controls": [
        {
          "name": "Sampling period T",
          "type": "slider",
          "values": [
            "small",
            "medium",
            "large"
          ],
          "default": "medium"
        },
        {
          "name": "Highlight sample index n",
          "type": "fixed_marker",
          "value": 3
        }
      ],
      "visual_elements": [
        "smooth continuous curve x(t)",
        "vertical stems at t = nT",
        "highlighted stem for n = 3",
        "formula label x[n] = x(nT)",
        "short note: changing T changes sample times, not the original curve"
      ],
      "student_tasks": [
        "Set T to large and observe whether the stems become closer together or farther apart.",
        "Identify the physical time corresponding to n = 3.",
        "Explain why x[3] is a sample value, not a time value."
      ]
    },
    {
      "type": "book_image",
      "source_page": "page-108",
      "fig_id": "Figure 1.32",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Memorize the left-to-right pipeline: x(t) → C/D → x[n] → discrete-time system → y[n] → D/C → y(t).",
        "standard": "Use the figure to see how a continuous-time signal can be processed by a discrete-time system.",
        "top_score": "Use the figure to distinguish representation conversion from the actual system processing step."
      },
      "caption_instruction": "One sentence: Figure 1.32 shows how a continuous-time signal is converted to samples, processed by a discrete-time system, and converted back to continuous time.",
      "description_instruction": "Describe the diagram as a left-to-right processing chain. Point out that x(t) and y(t) are continuous-time signals, while x[n] and y[n] are discrete-time sequences. Emphasize that the discrete-time system processes the sequence x[n], not the original continuous curve directly."
    },
    {
      "type": "math_block",
      "latex": "x[n]\\;\\xrightarrow{\\;\\text{discrete-time system}\\;}\\;y[n]",
      "explanation_instruction": "Start a new page with the heading '## 3. Discrete-time systems and sampled-data processing'. Explain in 110-160 words that a discrete-time system takes a sequence of numbers x[n] as input and produces another sequence y[n] as output. Connect this directly to Figure 1.32: C/D converts x(t) into x[n], the discrete-time system processes x[n] into y[n], and D/C converts y[n] back into y(t). Include one representative example: a digital filter in a computer may smooth noisy samples by computing each output sample from nearby input samples. Add a quick check: if both input and output are written with square brackets, the system is discrete-time. Common misuse: do not call the whole C/D-D/C chain a purely discrete-time system; the middle processing block is discrete-time, while the full chain touches continuous-time signals too."
    },
    {
      "type": "section_summary",
      "instruction": "Create a recap page titled '📌 Key Takeaways'. Use 4 bullets, each no more than 24 words. Include these formulas explicitly: \\(x(t),\\ t\\in\\mathbb{R}\\), \\(t_{k+1}-t_k=T\\), \\(x[n]=x(nT)\\), and \\(x[n]\\to y[n]\\). Mention that C/D converts continuous-time to discrete-time and D/C converts back. End with one sentence: 'Next, systems can also be classified as analog or digital depending on the type of signal values they use.'"
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
          "id": "continuous_vs_discrete_notation",
          "label": "Continuous-time versus discrete-time notation",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Which notation most strongly indicates a continuous-time signal?",
              "options": [
                "A. x[n]",
                "B. x(t)",
                "C. x_k only",
                "D. x[3]"
              ],
              "correct_option": "B",
              "explanation": "A continuous-time signal is written as x(t), where t can vary continuously over a range of real time values.",
              "wrong_option_explanations": {
                "A": "Square brackets usually indicate a discrete-time sequence indexed by integers.",
                "C": "A subscripted variable may be an index, but it is not the standard continuous-time signal notation here.",
                "D": "x[3] is one discrete-time sample value at index 3."
              },
              "hint": "Look for parentheses versus square brackets.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "A system has input x(t) and output y(t). Based only on this notation, how should it be classified?",
              "options": [
                "A. Continuous-time system",
                "B. Discrete-time system",
                "C. Digital system",
                "D. Invertible system"
              ],
              "correct_option": "A",
              "explanation": "If both input and output are continuous-time signals, the system is a continuous-time system.",
              "wrong_option_explanations": {
                "B": "A discrete-time system would normally use x[n] and y[n].",
                "C": "Digital refers to signal value quantization, not merely the time variable notation.",
                "D": "Invertibility cannot be determined from x(t) and y(t) notation alone."
              },
              "hint": "Classify by the time domain of the input and output.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "uniform_sampling_and_sample_notation",
          "label": "Uniform sampling and x[n] = x(nT)",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "If samples are uniformly spaced by T = 0.02 s, what does x[4] equal?",
              "options": [
                "A. x(4)",
                "B. x(0.02)",
                "C. x(0.08)",
                "D. 4x(0.02)"
              ],
              "correct_option": "C",
              "explanation": "Using x[n] = x(nT), x[4] = x(4T) = x(4 · 0.02) = x(0.08).",
              "wrong_option_explanations": {
                "A": "This treats n as the physical time instead of using nT.",
                "B": "This is x[1], not x[4], when T = 0.02.",
                "D": "Sampling evaluates the signal at a time; it does not multiply the sample value by n."
              },
              "hint": "Use t = nT before evaluating the sample.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "In the sampling formula x[n] = x(nT), what does n represent?",
              "options": [
                "A. A continuous time variable",
                "B. The sample index, usually an integer",
                "C. The sampling period in seconds",
                "D. The output sequence"
              ],
              "correct_option": "B",
              "explanation": "n is the integer sample index. The physical sampling time is nT.",
              "wrong_option_explanations": {
                "A": "The continuous time variable is t, not n.",
                "C": "The sampling period is T.",
                "D": "The output sequence is usually written y[n]."
              },
              "hint": "Separate the index n from the time nT.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp2_q3",
              "type": "multiple_choice",
              "stem": "Observe the sampling demo. When T is increased while x(t) stays fixed, what should happen to the sample stems over the same time window?",
              "options": [
                "A. They become farther apart, so fewer samples appear.",
                "B. They become closer together, so more samples appear.",
                "C. The continuous curve changes shape.",
                "D. The sample index n becomes a continuous variable."
              ],
              "correct_option": "A",
              "explanation": "T is the spacing between sample times. Increasing T spreads the sample times farther apart.",
              "wrong_option_explanations": {
                "B": "This would happen when T decreases, not when T increases.",
                "C": "The demo keeps x(t) fixed; only the sample times change.",
                "D": "n remains an integer index in discrete-time notation."
              },
              "hint": "T controls spacing between sample times.",
              "needs_visual": true,
              "visual_type": "interactive_demo_observation",
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "discrete_time_system_mapping",
          "label": "Discrete-time system maps x[n] to y[n]",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "Which statement best describes a discrete-time system?",
              "options": [
                "A. It takes x(t) directly and always outputs y(t).",
                "B. It processes a sequence x[n] and produces a sequence y[n].",
                "C. It only changes signal amplitudes, never time indices.",
                "D. It must be implemented with analog hardware."
              ],
              "correct_option": "B",
              "explanation": "A discrete-time system operates on indexed sequences such as x[n] and y[n].",
              "wrong_option_explanations": {
                "A": "That describes continuous-time input and output, not the core discrete-time system notation.",
                "C": "Discrete-time systems can involve index shifts, filtering, accumulation, and other sequence operations.",
                "D": "Discrete-time systems are often implemented digitally, but the definition is about sequence input and output."
              },
              "hint": "Look for square-bracket sequence notation.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "cd_dt_dc_pipeline",
          "label": "C/D, discrete-time processing, and D/C pipeline",
          "importance": "high",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp4_q1",
              "type": "short_answer",
              "stem": "In Figure 1.32, explain the processing chain from x(t) to y(t) in one or two sentences.",
              "ideal_answer": "The continuous-time signal x(t) is converted by a C/D converter into the sequence x[n]. A discrete-time system processes x[n] to produce y[n], and then a D/C converter reconstructs a continuous-time output y(t).",
              "grading_rubric": [
                "Must mention C/D converts x(t) to x[n].",
                "Must mention the discrete-time system processes x[n] into y[n].",
                "Must mention D/C converts y[n] into y(t).",
                "Must not claim that the discrete-time system directly processes x(t)."
              ],
              "explanation": "This checks whether the student can read the block diagram and separate conversion from discrete-time processing.",
              "hint": "Follow the arrows left to right and name each signal format.",
              "needs_visual": true,
              "visual_type": "book_figure",
              "same_point_variant": false
            }
          ]
        }
      ]
    }
  ]
}
```
