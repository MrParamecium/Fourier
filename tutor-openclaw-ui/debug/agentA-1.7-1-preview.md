# Agent A Preview: 1.7-1 1.7-1 Linear and Nonlinear Systems

- Difficulty: intermediate
- Estimated read minutes: 9

## Learning Objectives

- State the two required properties of a linear system: homogeneity and additivity.
- Use the superposition formula to predict outputs for scaled and summed inputs.
- Recognize common nonlinear traps, especially offsets, products, powers, and input-dependent coefficients.
- Separate a linear system response into zero-input and zero-state parts.
- Recognize why linear differential equations are linear systems.
- Explain why impulse, step, sinusoid, or exponential decompositions are useful in linear-system analysis.

## Visualization Need

```json
{
  "level": "interactive",
  "reason": [
    "formula_to_phenomenon_gap",
    "input_output_response_is_visual",
    "student_should_manipulate_to_understand",
    "pattern_recognition_benefits_from_figure"
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
  "rationale": "Use the textbook Figure 1.27 because it is the section's canonical visual for representing an arbitrary signal as simpler components. Add one React + Canvas superposition tester because linearity is easiest to understand by actively comparing S{a x1 + b x2} with aS{x1}+bS{x2}. Do not use generated images because the available textbook figure and an interactive symbolic/waveform demo cover the visual needs more precisely.",
  "cram": "Use the demo to recognize the exam pattern: scaling plus adding inputs must produce the same scaling plus adding outputs.",
  "standard": "Use the figure and demo to connect the formula to one representative example of decomposing an input and recombining responses.",
  "top_score": "Use the demo to expose near-miss systems such as y=x+1 and y=x^2 that may look simple but fail linearity."
}
```

## Planned Blocks

### Block 1: `text_explanation`
- **instruction**: Create the first lesson page only as a compact outline. Include exactly two sections: 'Section Objective' and 'Concepts In This Section'. Under Section Objective, write one sentence: 'Decide whether a system is linear by testing scaling and additivity, then use superposition to simplify system response analysis.' Under Concepts In This Section, list only these concept names as bullets: homogeneity, additivity, superposition, nonlinear traps, zero-input and zero-state response, linear differential-equation systems, signal decomposition. Do not add examples or expanded explanations on this first page.

### Block 2: `math_block`
- **latex**: x(t) \to y(t) \quad \Longrightarrow \quad kx(t) \to ky(t) \qquad \text{(homogeneity, Eq. 1.21)}
- **explanation_instruction**: Start this page with the heading '## 1. Homogeneity: scaling the input scales the output'. Explain in 90–130 words that x(t) is the input signal, y(t) is the output signal, k is any real or complex constant, and the arrow means 'produces'. Say that this formula means a linear system does not distort a pure scale change: doubling the input doubles the output, multiplying the input by j multiplies the output by j, and using k=0 forces zero input to produce zero output. Include one minimal example: if x(t) produces y(t), then 3x(t) must produce 3y(t). Exam trigger: look for constants multiplying inputs. Common misuse: testing only scaling is not enough; additivity must also hold.

### Block 3: `math_block`
- **latex**: x(t)=\sum_{k=1}^{m} a_k x_k(t) \quad \Longrightarrow \quad y(t)=\sum_{k=1}^{m} a_k y_k(t)
- **explanation_instruction**: Start this page with the heading '## 2. Superposition: split the input, then add the responses'. Explain in 110–150 words that a linear system lets us analyze each component x_k(t) separately, find its zero-state response y_k(t), multiply by the same coefficient a_k, and add the results. State that this single formula combines additivity and homogeneity. Include one representative worked example: if x1(t) produces y1(t) and x2(t) produces y2(t), then 2x1(t)-5x2(t) produces 2y1(t)-5y2(t). Exam trigger: the input is written as a sum of simpler signals. Common misuse: applying this to nonlinear systems before proving linearity.

### Block 4: `book_image`
- **source_page**: page-101
- **fig_id**: Figure 1.27
- **teaching_role**: concept_anchor
- **mode_specific_visual_use**:
```json
{
  "cram": "Use the figure to recognize that arbitrary inputs can be replaced by weighted impulse-like or step-like pieces.",
  "standard": "Use the figure to connect the superposition formula to the idea of adding many simple component responses.",
  "top_score": "Use the figure to notice that the approximation improves as the spacing becomes smaller, leading toward impulse and step response methods."
}
```
- **caption_instruction**: Write one sentence: 'Figure 1.27 shows the same signal approximated by impulse-like slices in panel (a) and step-like components in panel (b).'
- **description_instruction**: Describe the two panels in 2–3 sentences. Mention that both plots show x(t) versus time t, and that the spacing Δt marks how finely the signal is broken into simple pieces. Tell students to notice that, for a linear system, knowing the response to each simple piece lets us build the response to the full input by superposition.

### Block 5: `interactive_demo`
- **title**: Superposition tester
- **teaching_role**: example_support
- **mode_specific_visual_use**:
```json
{
  "cram": "Let students quickly test whether the two output curves overlap; overlap means the superposition test passes.",
  "standard": "Let students compare one linear system and two nonlinear near-misses using the same input combination.",
  "top_score": "Let students vary coefficients and see that a system may pass one accidental case but fail the general linearity test."
}
```
- **demo_instruction**: Build a React + Canvas interactive demo with two selectable input signals x1(t) and x2(t), coefficient sliders a and b from -3 to 3, and a system selector with exactly three choices: S{x}=2x, S{x}=x^2, and S{x}=x+1. Show two curves on the same axes: Curve A labeled S{a x1 + b x2}; Curve B labeled aS{x1}+bS{x2}. Use muted teal for Curve A and navy for Curve B. Add a small verdict box: 'Passes this test' when the two curves overlap numerically, otherwise 'Fails this test'. Default to S{x}=2x, a=2, b=-1. Include one short note under the canvas: 'A system is linear only if this equality works for every input pair and every constants a and b.'

### Block 6: `math_block`
- **latex**: S\{0\}=0
- **explanation_instruction**: Start this page with the heading '## 3. Nonlinear traps: the zero-input shortcut'. Explain in 90–130 words that every linear system must send zero input to zero output. Define S{·} as the system rule. Use this as a fast necessary test, not a complete proof of linearity. Include two minimal examples: S{x}=x+1 fails because S{0}=1, so it is nonlinear; S{x}=x^2 passes S{0}=0 but is still nonlinear because S{2x}=4x^2, not 2x^2. Exam trigger: equations with offsets, powers, products of signals, or coefficients depending on x usually signal nonlinearity. Common misuse: assuming 'simple-looking' means linear.

### Block 7: `math_block`
- **latex**: y(t)=y_{\mathrm{ZIR}}(t)+y_{\mathrm{ZSR}}(t)
- **explanation_instruction**: Start this page with the heading '## 4. Decomposition property: initial conditions vs input'. Explain in 100–140 words that, for a linear system, the total response can be separated into two parts: the zero-input response y_ZIR(t), caused only by initial conditions with the input set to zero, and the zero-state response y_ZSR(t), caused only by the input with initial conditions set to zero. Include one minimal example: in an RC circuit, stored capacitor voltage contributes to y_ZIR(t), while the applied source contributes to y_ZSR(t). Exam trigger: a problem asks for response due to initial energy and response due to forcing separately. Common misuse: using this split for a nonlinear system.

### Block 8: `math_block`
- **latex**: \sum_{n=0}^{N} a_n(t)\frac{d^n y(t)}{dt^n}=\sum_{m=0}^{M} b_m(t)\frac{d^m x(t)}{dt^m}
- **explanation_instruction**: Start this page with the heading '## 5. Linear differential equations define linear systems'. Explain in 110–150 words that this compact equation represents an Nth-order linear differential equation: y(t) and its derivatives appear only to the first power, x(t) and its derivatives appear only to the first power, and the coefficients a_n(t), b_m(t) may be constants or functions of time. Briefly re-explain that a derivative such as dy/dt measures how fast the signal changes. Include one representative example of a linear term, 3 dy/dt, and one nonlinear trap, y^2(t) or x(t)y(t). Exam trigger: inspect the equation structure. Common misuse: thinking time-varying coefficients automatically make the system nonlinear; they do not.

### Block 9: `section_summary`
- **instruction**: Create a recap page titled '📌 Key Takeaways'. Include exactly five bullets, each ≤24 words, and include the formulas explicitly: 1) homogeneity: \(x(t)\to y(t)\Rightarrow kx(t)\to ky(t)\); 2) superposition: \(x=\sum a_kx_k\Rightarrow y=\sum a_ky_k\); 3) zero-input necessary test: \(S\{0\}=0\); 4) decomposition: \(y=y_{\mathrm{ZIR}}+y_{\mathrm{ZSR}}\); 5) linear ODE structure: derivatives of x and y appear only linearly. End with one sentence: 'Next, we will use a similar input-output idea to classify time-invariant and time-varying systems.'

### Block 10: `quiz_plan`
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
    "id": "homogeneity",
    "label": "Homogeneity / scaling",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "homogeneity_q1",
        "type": "multiple_choice",
        "stem": "A system is known to be linear. If input x(t) produces output y(t), what must input -4x(t) produce?",
        "options": [
          "A. y(t)-4",
          "B. -4y(t)",
          "C. y(-4t)",
          "D. 16y(t)"
        ],
        "correct_option": "B",
        "explanation": "Homogeneity says scaling the input by k scales the output by the same k. Here k=-4.",
        "wrong_option_explanations": {
          "A": "Subtracting 4 is an offset, not a scaling operation.",
          "C": "y(-4t) is time scaling and reversal, not amplitude scaling.",
          "D": "Squaring the scale factor is a nonlinear behavior, not homogeneity."
        },
        "hint": "Use Eq. 1.21: x(t)→y(t) implies kx(t)→ky(t).",
        "needs_visual": false,
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "superposition",
    "label": "Superposition of component responses",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "superposition_q1",
        "type": "multiple_choice",
        "stem": "For a linear system, x1(t) produces y1(t) and x2(t) produces y2(t). What is the response to 3x1(t)+2x2(t)?",
        "options": [
          "A. 3y1(t)+2y2(t)",
          "B. y1(3t)+y2(2t)",
          "C. 5[y1(t)+y2(t)]",
          "D. 6y1(t)y2(t)"
        ],
        "correct_option": "A",
        "explanation": "Superposition keeps the same coefficients from the input combination and applies them to the corresponding outputs.",
        "wrong_option_explanations": {
          "B": "This changes the time variable; the given operation scales amplitudes, not time.",
          "C": "The coefficients must stay attached to their own component responses.",
          "D": "Multiplying outputs is not part of superposition."
        },
        "hint": "Match each input component with its own output component.",
        "needs_visual": false,
        "same_point_variant": true
      },
      {
        "id": "superposition_q2_demo",
        "type": "multiple_choice",
        "stem": "In the superposition tester, the two curves S{a x1+b x2} and aS{x1}+bS{x2} overlap for S{x}=2x for many different a, b, x1, and x2. What does that observation support?",
        "options": [
          "A. The system passes the superposition test for linearity.",
          "B. The system is time-invariant but not necessarily linear.",
          "C. The system is nonlinear because the output is doubled.",
          "D. The system only works for zero input."
        ],
        "correct_option": "A",
        "explanation": "If applying the system after combining inputs matches combining the individual outputs, the system satisfies the superposition pattern.",
        "wrong_option_explanations": {
          "B": "The demo tests linearity, not time invariance.",
          "C": "Doubling is a valid linear scaling operation.",
          "D": "The observation concerns many inputs, not only zero input."
        },
        "hint": "Overlapping curves mean the two sides of the superposition equation agree.",
        "needs_visual": true,
        "visual_type": "interactive_demo_observation",
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "nonlinear_traps",
    "label": "Common nonlinear traps",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "nonlinear_q1",
        "type": "multiple_choice",
        "stem": "Which system definitely fails the necessary zero-input test for linearity?",
        "options": [
          "A. y(t)=3x(t)",
          "B. y(t)=x(t)+5",
          "C. y(t)=t x(t)",
          "D. y(t)=dx(t)/dt"
        ],
        "correct_option": "B",
        "explanation": "For x(t)=0, the system y(t)=x(t)+5 gives y(t)=5, so S{0}≠0. A linear system must have S{0}=0.",
        "wrong_option_explanations": {
          "A": "This is a pure scaling operation and can be linear.",
          "C": "A time-varying coefficient t does not by itself make the system nonlinear.",
          "D": "Differentiation is a linear operation."
        },
        "hint": "Set x(t)=0 and see whether y(t) becomes zero.",
        "needs_visual": false,
        "same_point_variant": true
      },
      {
        "id": "nonlinear_q2",
        "type": "multiple_choice",
        "stem": "A student says y(t)=x^2(t) is linear because zero input gives zero output. What is wrong with that reasoning?",
        "options": [
          "A. Passing S{0}=0 is necessary but not sufficient for linearity.",
          "B. The system is linear only when x(t) is positive.",
          "C. Squaring a signal always creates a time delay.",
          "D. The system is linear because x^2(t) has no constant offset."
        ],
        "correct_option": "A",
        "explanation": "The zero-input test catches some nonlinear systems, but it does not prove linearity. y=x^2 fails homogeneity because S{2x}=4x^2, while 2S{x}=2x^2.",
        "wrong_option_explanations": {
          "B": "Linearity is not restricted to positive inputs.",
          "C": "Squaring changes amplitude values, not the time variable.",
          "D": "Having no constant offset is not enough; powers of the input break linearity."
        },
        "hint": "Test scaling with k=2.",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "decomposition_property",
    "label": "Zero-input and zero-state decomposition",
    "importance": "medium",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "decomposition_q1",
        "type": "multiple_choice",
        "stem": "For a linear system, what does y(t)=y_ZIR(t)+y_ZSR(t) mean?",
        "options": [
          "A. Total response equals response from initial conditions plus response from the input.",
          "B. Total response equals input plus output.",
          "C. Zero-input response means the input is delayed by zero seconds.",
          "D. Zero-state response means the output is always zero."
        ],
        "correct_option": "A",
        "explanation": "The decomposition property separates the response caused by stored initial energy from the response caused by the applied input.",
        "wrong_option_explanations": {
          "B": "The formula separates two response components, not input plus output.",
          "C": "Zero-input means the external input is set to zero, not delayed by zero.",
          "D": "Zero-state means initial conditions are zero; the input can still produce output."
        },
        "hint": "ZIR comes from initial conditions; ZSR comes from the input.",
        "needs_visual": false,
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "linear_differential_equations",
    "label": "Linear differential-equation structure",
    "importance": "medium",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "ode_q1",
        "type": "multiple_choice",
        "stem": "Which equation has the structure of a linear system equation?",
        "options": [
          "A. dy/dt + 4y(t) = 2x(t)",
          "B. dy/dt + y^2(t) = x(t)",
          "C. y(t)=x(t)y(t)",
          "D. y(t)=x^2(t)+x(t)"
        ],
        "correct_option": "A",
        "explanation": "In a linear differential equation, y, x, and their derivatives appear only to the first power and are not multiplied together.",
        "wrong_option_explanations": {
          "B": "The y^2(t) term is nonlinear.",
          "C": "The product x(t)y(t) is nonlinear.",
          "D": "The x^2(t) term is nonlinear."
        },
        "hint": "Look for powers or products involving x or y.",
        "needs_visual": false,
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "signal_decomposition_visual",
    "label": "Signal decomposition into simple components",
    "importance": "medium",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "figure127_q1",
        "type": "multiple_choice",
        "stem": "In Figure 1.27, why is it useful to approximate x(t) as many impulse-like or step-like components?",
        "options": [
          "A. For a linear system, the response to the full input can be built by adding the responses to the components.",
          "B. It proves every system is linear.",
          "C. It removes the need to know any system response.",
          "D. It changes a nonlinear system into a linear one."
        ],
        "correct_option": "A",
        "explanation": "The figure supports the superposition idea: decompose the input into simple pieces, find each component response, then add the responses.",
        "wrong_option_explanations": {
          "B": "The decomposition is useful after linearity is known; it does not prove all systems are linear.",
          "C": "You still need the system response to the chosen basic component, such as an impulse or step.",
          "D": "Decomposing the input does not change the system's linearity."
        },
        "hint": "Connect the visual approximation to the superposition formula.",
        "needs_visual": true,
        "visual_type": "book_figure_observation",
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "integrated_linearity_check",
    "label": "Full linearity decision",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "integrated_q1",
        "type": "short_answer",
        "stem": "A system is defined by S{x(t)}=t x(t). In 2–3 sentences, decide whether this system is linear and justify using the superposition idea.",
        "ideal_answer": "The system is linear. For inputs x1 and x2 and constants a and b, S{a x1+b x2}=t[a x1(t)+b x2(t)]=a t x1(t)+b t x2(t)=aS{x1}+bS{x2}. The time-varying coefficient t does not break linearity because it does not depend on x and does not multiply signals together.",
        "grading_rubric": [
          "Must state that the system is linear.",
          "Must use or clearly describe the superposition test.",
          "Must explain that a time-varying coefficient alone is not the same as nonlinearity.",
          "Must not claim the system is nonlinear merely because t appears."
        ],
        "explanation": "This checks the important distinction between linearity and time invariance. A system can be linear but time-varying.",
        "hint": "Compute S{a x1+b x2} and compare it with aS{x1}+bS{x2}.",
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
  "section_id": "1.7-1",
  "section_title": "1.7-1 Linear and Nonlinear Systems",
  "difficulty": "intermediate",
  "estimated_read_minutes": 9,
  "learning_objectives": [
    "State the two required properties of a linear system: homogeneity and additivity.",
    "Use the superposition formula to predict outputs for scaled and summed inputs.",
    "Recognize common nonlinear traps, especially offsets, products, powers, and input-dependent coefficients.",
    "Separate a linear system response into zero-input and zero-state parts.",
    "Recognize why linear differential equations are linear systems.",
    "Explain why impulse, step, sinusoid, or exponential decompositions are useful in linear-system analysis."
  ],
  "visualization_need": {
    "level": "interactive",
    "reason": [
      "formula_to_phenomenon_gap",
      "input_output_response_is_visual",
      "student_should_manipulate_to_understand",
      "pattern_recognition_benefits_from_figure"
    ],
    "recommended_assets": [
      "textbook_figure",
      "react_canvas_demo"
    ]
  },
  "visual_plan": {
    "primary_anchor": "both",
    "rationale": "Use the textbook Figure 1.27 because it is the section's canonical visual for representing an arbitrary signal as simpler components. Add one React + Canvas superposition tester because linearity is easiest to understand by actively comparing S{a x1 + b x2} with aS{x1}+bS{x2}. Do not use generated images because the available textbook figure and an interactive symbolic/waveform demo cover the visual needs more precisely.",
    "cram": "Use the demo to recognize the exam pattern: scaling plus adding inputs must produce the same scaling plus adding outputs.",
    "standard": "Use the figure and demo to connect the formula to one representative example of decomposing an input and recombining responses.",
    "top_score": "Use the demo to expose near-miss systems such as y=x+1 and y=x^2 that may look simple but fail linearity."
  },
  "blocks": [
    {
      "type": "text_explanation",
      "instruction": "Create the first lesson page only as a compact outline. Include exactly two sections: 'Section Objective' and 'Concepts In This Section'. Under Section Objective, write one sentence: 'Decide whether a system is linear by testing scaling and additivity, then use superposition to simplify system response analysis.' Under Concepts In This Section, list only these concept names as bullets: homogeneity, additivity, superposition, nonlinear traps, zero-input and zero-state response, linear differential-equation systems, signal decomposition. Do not add examples or expanded explanations on this first page."
    },
    {
      "type": "math_block",
      "latex": "x(t) \\to y(t) \\quad \\Longrightarrow \\quad kx(t) \\to ky(t) \\qquad \\text{(homogeneity, Eq. 1.21)}",
      "explanation_instruction": "Start this page with the heading '## 1. Homogeneity: scaling the input scales the output'. Explain in 90–130 words that x(t) is the input signal, y(t) is the output signal, k is any real or complex constant, and the arrow means 'produces'. Say that this formula means a linear system does not distort a pure scale change: doubling the input doubles the output, multiplying the input by j multiplies the output by j, and using k=0 forces zero input to produce zero output. Include one minimal example: if x(t) produces y(t), then 3x(t) must produce 3y(t). Exam trigger: look for constants multiplying inputs. Common misuse: testing only scaling is not enough; additivity must also hold."
    },
    {
      "type": "math_block",
      "latex": "x(t)=\\sum_{k=1}^{m} a_k x_k(t) \\quad \\Longrightarrow \\quad y(t)=\\sum_{k=1}^{m} a_k y_k(t)",
      "explanation_instruction": "Start this page with the heading '## 2. Superposition: split the input, then add the responses'. Explain in 110–150 words that a linear system lets us analyze each component x_k(t) separately, find its zero-state response y_k(t), multiply by the same coefficient a_k, and add the results. State that this single formula combines additivity and homogeneity. Include one representative worked example: if x1(t) produces y1(t) and x2(t) produces y2(t), then 2x1(t)-5x2(t) produces 2y1(t)-5y2(t). Exam trigger: the input is written as a sum of simpler signals. Common misuse: applying this to nonlinear systems before proving linearity."
    },
    {
      "type": "book_image",
      "source_page": "page-101",
      "fig_id": "Figure 1.27",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the figure to recognize that arbitrary inputs can be replaced by weighted impulse-like or step-like pieces.",
        "standard": "Use the figure to connect the superposition formula to the idea of adding many simple component responses.",
        "top_score": "Use the figure to notice that the approximation improves as the spacing becomes smaller, leading toward impulse and step response methods."
      },
      "caption_instruction": "Write one sentence: 'Figure 1.27 shows the same signal approximated by impulse-like slices in panel (a) and step-like components in panel (b).'",
      "description_instruction": "Describe the two panels in 2–3 sentences. Mention that both plots show x(t) versus time t, and that the spacing Δt marks how finely the signal is broken into simple pieces. Tell students to notice that, for a linear system, knowing the response to each simple piece lets us build the response to the full input by superposition."
    },
    {
      "type": "interactive_demo",
      "title": "Superposition tester",
      "teaching_role": "example_support",
      "mode_specific_visual_use": {
        "cram": "Let students quickly test whether the two output curves overlap; overlap means the superposition test passes.",
        "standard": "Let students compare one linear system and two nonlinear near-misses using the same input combination.",
        "top_score": "Let students vary coefficients and see that a system may pass one accidental case but fail the general linearity test."
      },
      "demo_instruction": "Build a React + Canvas interactive demo with two selectable input signals x1(t) and x2(t), coefficient sliders a and b from -3 to 3, and a system selector with exactly three choices: S{x}=2x, S{x}=x^2, and S{x}=x+1. Show two curves on the same axes: Curve A labeled S{a x1 + b x2}; Curve B labeled aS{x1}+bS{x2}. Use muted teal for Curve A and navy for Curve B. Add a small verdict box: 'Passes this test' when the two curves overlap numerically, otherwise 'Fails this test'. Default to S{x}=2x, a=2, b=-1. Include one short note under the canvas: 'A system is linear only if this equality works for every input pair and every constants a and b.'"
    },
    {
      "type": "math_block",
      "latex": "S\\{0\\}=0",
      "explanation_instruction": "Start this page with the heading '## 3. Nonlinear traps: the zero-input shortcut'. Explain in 90–130 words that every linear system must send zero input to zero output. Define S{·} as the system rule. Use this as a fast necessary test, not a complete proof of linearity. Include two minimal examples: S{x}=x+1 fails because S{0}=1, so it is nonlinear; S{x}=x^2 passes S{0}=0 but is still nonlinear because S{2x}=4x^2, not 2x^2. Exam trigger: equations with offsets, powers, products of signals, or coefficients depending on x usually signal nonlinearity. Common misuse: assuming 'simple-looking' means linear."
    },
    {
      "type": "math_block",
      "latex": "y(t)=y_{\\mathrm{ZIR}}(t)+y_{\\mathrm{ZSR}}(t)",
      "explanation_instruction": "Start this page with the heading '## 4. Decomposition property: initial conditions vs input'. Explain in 100–140 words that, for a linear system, the total response can be separated into two parts: the zero-input response y_ZIR(t), caused only by initial conditions with the input set to zero, and the zero-state response y_ZSR(t), caused only by the input with initial conditions set to zero. Include one minimal example: in an RC circuit, stored capacitor voltage contributes to y_ZIR(t), while the applied source contributes to y_ZSR(t). Exam trigger: a problem asks for response due to initial energy and response due to forcing separately. Common misuse: using this split for a nonlinear system."
    },
    {
      "type": "math_block",
      "latex": "\\sum_{n=0}^{N} a_n(t)\\frac{d^n y(t)}{dt^n}=\\sum_{m=0}^{M} b_m(t)\\frac{d^m x(t)}{dt^m}",
      "explanation_instruction": "Start this page with the heading '## 5. Linear differential equations define linear systems'. Explain in 110–150 words that this compact equation represents an Nth-order linear differential equation: y(t) and its derivatives appear only to the first power, x(t) and its derivatives appear only to the first power, and the coefficients a_n(t), b_m(t) may be constants or functions of time. Briefly re-explain that a derivative such as dy/dt measures how fast the signal changes. Include one representative example of a linear term, 3 dy/dt, and one nonlinear trap, y^2(t) or x(t)y(t). Exam trigger: inspect the equation structure. Common misuse: thinking time-varying coefficients automatically make the system nonlinear; they do not."
    },
    {
      "type": "section_summary",
      "instruction": "Create a recap page titled '📌 Key Takeaways'. Include exactly five bullets, each ≤24 words, and include the formulas explicitly: 1) homogeneity: \\(x(t)\\to y(t)\\Rightarrow kx(t)\\to ky(t)\\); 2) superposition: \\(x=\\sum a_kx_k\\Rightarrow y=\\sum a_ky_k\\); 3) zero-input necessary test: \\(S\\{0\\}=0\\); 4) decomposition: \\(y=y_{\\mathrm{ZIR}}+y_{\\mathrm{ZSR}}\\); 5) linear ODE structure: derivatives of x and y appear only linearly. End with one sentence: 'Next, we will use a similar input-output idea to classify time-invariant and time-varying systems.'"
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
          "id": "homogeneity",
          "label": "Homogeneity / scaling",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "homogeneity_q1",
              "type": "multiple_choice",
              "stem": "A system is known to be linear. If input x(t) produces output y(t), what must input -4x(t) produce?",
              "options": [
                "A. y(t)-4",
                "B. -4y(t)",
                "C. y(-4t)",
                "D. 16y(t)"
              ],
              "correct_option": "B",
              "explanation": "Homogeneity says scaling the input by k scales the output by the same k. Here k=-4.",
              "wrong_option_explanations": {
                "A": "Subtracting 4 is an offset, not a scaling operation.",
                "C": "y(-4t) is time scaling and reversal, not amplitude scaling.",
                "D": "Squaring the scale factor is a nonlinear behavior, not homogeneity."
              },
              "hint": "Use Eq. 1.21: x(t)→y(t) implies kx(t)→ky(t).",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "superposition",
          "label": "Superposition of component responses",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "superposition_q1",
              "type": "multiple_choice",
              "stem": "For a linear system, x1(t) produces y1(t) and x2(t) produces y2(t). What is the response to 3x1(t)+2x2(t)?",
              "options": [
                "A. 3y1(t)+2y2(t)",
                "B. y1(3t)+y2(2t)",
                "C. 5[y1(t)+y2(t)]",
                "D. 6y1(t)y2(t)"
              ],
              "correct_option": "A",
              "explanation": "Superposition keeps the same coefficients from the input combination and applies them to the corresponding outputs.",
              "wrong_option_explanations": {
                "B": "This changes the time variable; the given operation scales amplitudes, not time.",
                "C": "The coefficients must stay attached to their own component responses.",
                "D": "Multiplying outputs is not part of superposition."
              },
              "hint": "Match each input component with its own output component.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "superposition_q2_demo",
              "type": "multiple_choice",
              "stem": "In the superposition tester, the two curves S{a x1+b x2} and aS{x1}+bS{x2} overlap for S{x}=2x for many different a, b, x1, and x2. What does that observation support?",
              "options": [
                "A. The system passes the superposition test for linearity.",
                "B. The system is time-invariant but not necessarily linear.",
                "C. The system is nonlinear because the output is doubled.",
                "D. The system only works for zero input."
              ],
              "correct_option": "A",
              "explanation": "If applying the system after combining inputs matches combining the individual outputs, the system satisfies the superposition pattern.",
              "wrong_option_explanations": {
                "B": "The demo tests linearity, not time invariance.",
                "C": "Doubling is a valid linear scaling operation.",
                "D": "The observation concerns many inputs, not only zero input."
              },
              "hint": "Overlapping curves mean the two sides of the superposition equation agree.",
              "needs_visual": true,
              "visual_type": "interactive_demo_observation",
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "nonlinear_traps",
          "label": "Common nonlinear traps",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "nonlinear_q1",
              "type": "multiple_choice",
              "stem": "Which system definitely fails the necessary zero-input test for linearity?",
              "options": [
                "A. y(t)=3x(t)",
                "B. y(t)=x(t)+5",
                "C. y(t)=t x(t)",
                "D. y(t)=dx(t)/dt"
              ],
              "correct_option": "B",
              "explanation": "For x(t)=0, the system y(t)=x(t)+5 gives y(t)=5, so S{0}≠0. A linear system must have S{0}=0.",
              "wrong_option_explanations": {
                "A": "This is a pure scaling operation and can be linear.",
                "C": "A time-varying coefficient t does not by itself make the system nonlinear.",
                "D": "Differentiation is a linear operation."
              },
              "hint": "Set x(t)=0 and see whether y(t) becomes zero.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "nonlinear_q2",
              "type": "multiple_choice",
              "stem": "A student says y(t)=x^2(t) is linear because zero input gives zero output. What is wrong with that reasoning?",
              "options": [
                "A. Passing S{0}=0 is necessary but not sufficient for linearity.",
                "B. The system is linear only when x(t) is positive.",
                "C. Squaring a signal always creates a time delay.",
                "D. The system is linear because x^2(t) has no constant offset."
              ],
              "correct_option": "A",
              "explanation": "The zero-input test catches some nonlinear systems, but it does not prove linearity. y=x^2 fails homogeneity because S{2x}=4x^2, while 2S{x}=2x^2.",
              "wrong_option_explanations": {
                "B": "Linearity is not restricted to positive inputs.",
                "C": "Squaring changes amplitude values, not the time variable.",
                "D": "Having no constant offset is not enough; powers of the input break linearity."
              },
              "hint": "Test scaling with k=2.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "decomposition_property",
          "label": "Zero-input and zero-state decomposition",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "decomposition_q1",
              "type": "multiple_choice",
              "stem": "For a linear system, what does y(t)=y_ZIR(t)+y_ZSR(t) mean?",
              "options": [
                "A. Total response equals response from initial conditions plus response from the input.",
                "B. Total response equals input plus output.",
                "C. Zero-input response means the input is delayed by zero seconds.",
                "D. Zero-state response means the output is always zero."
              ],
              "correct_option": "A",
              "explanation": "The decomposition property separates the response caused by stored initial energy from the response caused by the applied input.",
              "wrong_option_explanations": {
                "B": "The formula separates two response components, not input plus output.",
                "C": "Zero-input means the external input is set to zero, not delayed by zero.",
                "D": "Zero-state means initial conditions are zero; the input can still produce output."
              },
              "hint": "ZIR comes from initial conditions; ZSR comes from the input.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "linear_differential_equations",
          "label": "Linear differential-equation structure",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "ode_q1",
              "type": "multiple_choice",
              "stem": "Which equation has the structure of a linear system equation?",
              "options": [
                "A. dy/dt + 4y(t) = 2x(t)",
                "B. dy/dt + y^2(t) = x(t)",
                "C. y(t)=x(t)y(t)",
                "D. y(t)=x^2(t)+x(t)"
              ],
              "correct_option": "A",
              "explanation": "In a linear differential equation, y, x, and their derivatives appear only to the first power and are not multiplied together.",
              "wrong_option_explanations": {
                "B": "The y^2(t) term is nonlinear.",
                "C": "The product x(t)y(t) is nonlinear.",
                "D": "The x^2(t) term is nonlinear."
              },
              "hint": "Look for powers or products involving x or y.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "signal_decomposition_visual",
          "label": "Signal decomposition into simple components",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "figure127_q1",
              "type": "multiple_choice",
              "stem": "In Figure 1.27, why is it useful to approximate x(t) as many impulse-like or step-like components?",
              "options": [
                "A. For a linear system, the response to the full input can be built by adding the responses to the components.",
                "B. It proves every system is linear.",
                "C. It removes the need to know any system response.",
                "D. It changes a nonlinear system into a linear one."
              ],
              "correct_option": "A",
              "explanation": "The figure supports the superposition idea: decompose the input into simple pieces, find each component response, then add the responses.",
              "wrong_option_explanations": {
                "B": "The decomposition is useful after linearity is known; it does not prove all systems are linear.",
                "C": "You still need the system response to the chosen basic component, such as an impulse or step.",
                "D": "Decomposing the input does not change the system's linearity."
              },
              "hint": "Connect the visual approximation to the superposition formula.",
              "needs_visual": true,
              "visual_type": "book_figure_observation",
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "integrated_linearity_check",
          "label": "Full linearity decision",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "integrated_q1",
              "type": "short_answer",
              "stem": "A system is defined by S{x(t)}=t x(t). In 2–3 sentences, decide whether this system is linear and justify using the superposition idea.",
              "ideal_answer": "The system is linear. For inputs x1 and x2 and constants a and b, S{a x1+b x2}=t[a x1(t)+b x2(t)]=a t x1(t)+b t x2(t)=aS{x1}+bS{x2}. The time-varying coefficient t does not break linearity because it does not depend on x and does not multiply signals together.",
              "grading_rubric": [
                "Must state that the system is linear.",
                "Must use or clearly describe the superposition test.",
                "Must explain that a time-varying coefficient alone is not the same as nonlinearity.",
                "Must not claim the system is nonlinear merely because t appears."
              ],
              "explanation": "This checks the important distinction between linearity and time invariance. A system can be linear but time-varying.",
              "hint": "Compute S{a x1+b x2} and compare it with aS{x1}+bS{x2}.",
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
