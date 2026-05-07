# Agent A Preview: B.2-2 B.2-2 Sinusoids in Terms of Exponentials

- Difficulty: intermediate
- Estimated read minutes: 6

## Learning Objectives

- Use Euler's formula to rewrite sinusoids as complex exponentials.
- Recognize cosine and sine as combinations of opposite complex rotations.
- Convert a cosine-sine combination into one phase-shifted sinusoid.

## Visualization Need

```json
{
  "level": "interactive",
  "reason": [
    "depends_on_parameter_change",
    "formula_to_phenomenon_gap",
    "student_should_manipulate_to_understand",
    "students_commonly_confuse_phase_sign"
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
  "rationale": "This section is about seeing sinusoids as sums of rotating complex exponentials. A static figure can show one angle, but an interactive phasor demo lets students move phase and coefficients and immediately see what stays real, what becomes imaginary, and how phase sign changes the final sinusoid.",
  "cram": "Use the demo to memorize the exam triggers: opposite rotations produce cosine; their scaled difference produces sine; coefficient signs set phase direction.",
  "standard": "Use the demo beside the formulas to connect Euler's identities to one representative compression example.",
  "top_score": "Use the demo to test sign conventions, quadrant behavior, and why amplitude alone is not a complete answer."
}
```

## Planned Blocks

### Block 1: `text_explanation`
- **instruction**: Render Page 1 as a minimal overview only. Include exactly two short sections: 'Section Objective' and 'Concepts In This Section'. Under 'Section Objective', write one sentence: 'Rewrite sinusoids using complex exponentials so amplitude and phase become easier to combine.' Under 'Concepts In This Section', list only these concept names as bullets: Euler's formula; cosine from exponentials; sine from exponentials; combining cosine and sine into one sinusoid. Do not add background paragraphs, examples, or extra explanation on this page.

### Block 2: `math_block`
- **latex**: e^{j\phi}=\cos\phi+j\sin\phi
- **explanation_instruction**: Start Page 2 with heading '## 1. Euler's formula: one rotating exponential'. Explain in 90–130 words that this formula turns an angle \(\phi\) into a point on the unit circle: the real coordinate is \(\cos\phi\), the vertical component is \(\sin\phi\), and \(j\) marks the vertical direction. State that \(\phi\) is in radians unless told otherwise. Use case: when a sinusoid or phasor needs to be handled with complex algebra. Exam trigger: expressions involving phase, phasors, or sums of sinusoids. Common misuse: treating \(j\sin\phi\) as a separate physical signal instead of the vertical component of the rotating complex number. Include one minimal example: at \(\phi=0\), \(e^{j0}=1\).

### Block 3: `math_block`
- **latex**: e^{-j\phi}=\cos\phi-j\sin\phi
- **explanation_instruction**: Continue Page 2. Explain in 60–90 words that the negative exponent gives the conjugate rotation: same real coordinate, opposite vertical component. Define every symbol briefly: \(e\) is the exponential base, \(j\) is the imaginary-axis marker, and \(\phi\) is the angle. Use case: pair this with \(e^{j\phi}\) to isolate cosine or sine. Exam trigger: whenever both \(e^{j\phi}\) and \(e^{-j\phi}\) appear. Common misuse: forgetting the minus sign only changes the sine term, not the cosine term.

### Block 4: `interactive_demo`
- **teaching_role**: concept_anchor
- **mode_specific_visual_use**:
```json
{
  "cram": "Move the angle slider and memorize which parts cancel or reinforce.",
  "standard": "Use the sliders to connect each displayed formula to the moving phasors.",
  "top_score": "Test positive and negative phase values to catch sign and quadrant mistakes."
}
```
- **title**: Opposite Rotations Create Sine and Cosine
- **purpose**: Show how \(e^{j\phi}\) and \(e^{-j\phi}\) rotate in opposite directions and combine to create real cosine and sine expressions.
- **render_instruction**: Build a React + Canvas demo with a white background and two panels. Left panel: unit circle with real axis horizontal and imaginary axis vertical. Draw one muted teal vector for \(e^{j\phi}\) and one navy vector for \(e^{-j\phi}\). Show their current coordinates as \((\cos\phi,\sin\phi)\) and \((\cos\phi,-\sin\phi)\). Right panel: display two live result bars: average \((e^{j\phi}+e^{-j\phi})/2\) labeled 'cosine part' and scaled difference \((e^{j\phi}-e^{-j\phi})/(2j)\) labeled 'sine part'.
- **controls**:
```json
[
  {
    "name": "angle_phi",
    "label": "Angle \\(\\phi\\)",
    "min": -6.283185307,
    "max": 6.283185307,
    "default": 1.047197551,
    "step": 0.01
  },
  {
    "name": "show_trails",
    "label": "Show rotation trails",
    "type": "toggle",
    "default": true
  }
]
```
- **observation_prompts**:
```json
[
  "When the two exponentials are added, the vertical parts cancel.",
  "When they are subtracted, the real parts cancel.",
  "The divisor \\(2j\\) in the sine formula is not optional; it converts the remaining vertical quantity back to a real sine value."
]
```

### Block 5: `math_block`
- **latex**: \cos\phi=\frac{e^{j\phi}+e^{-j\phi}}{2}
- **explanation_instruction**: Start Page 3 with heading '## 2. Cosine as two opposite exponentials'. Explain in 90–130 words that adding the two Euler formulas cancels the \(j\sin\phi\) terms and leaves two copies of \(\cos\phi\), so division by 2 isolates cosine. Define \(\phi\) as the angle or phase argument; in signals it may be \(\omega t+\theta\). Use case: convert a cosine into exponential form before combining phasors or solving linear signal problems. Exam trigger: a cosine inside algebra where exponentials would be easier. Common misuse: forgetting the factor \(1/2\). Include one minimal example: \(\cos(\omega t)=\frac{e^{j\omega t}+e^{-j\omega t}}{2}\).

### Block 6: `math_block`
- **latex**: \sin\phi=\frac{e^{j\phi}-e^{-j\phi}}{2j}
- **explanation_instruction**: Continue Page 3 under the same concept page. Explain in 90–130 words that subtracting the two Euler formulas cancels the cosine terms and leaves \(2j\sin\phi\), so dividing by \(2j\) isolates sine. Define \(j\) as the imaginary-axis marker and stress that the final sine value is real when \(\phi\) is real. Use case: convert sine terms into exponential form before phasor addition. Exam trigger: sine terms mixed with cosine terms at the same frequency. Common misuse: writing \((e^{j\phi}-e^{-j\phi})/2\) and forgetting the \(j\), which leaves the wrong type of quantity.

### Block 7: `math_block`
- **latex**: a\cos(\omega t)+b\sin(\omega t)=R\cos(\omega t-\theta)
- **explanation_instruction**: Start Page 4 with heading '## 3. Compress a cosine-sine pair into one sinusoid'. Explain in 100–150 words that same-frequency cosine and sine terms can be combined into one cosine with amplitude \(R\) and phase shift \(\theta\). Define \(a\) as the cosine coefficient, \(b\) as the sine coefficient, \(\omega\) as angular frequency, and \(t\) as time. State inline that \(R=\sqrt{a^2+b^2}\) and \(\theta=\operatorname{atan2}(b,a)\). Use case: when an exam asks to 'combine into one sinusoid' or 'find amplitude and phase'. Common misuse: giving only \(R\) and forgetting the final phase-shifted sinusoid. Warn that the sign in \(\omega t-\theta\) is where many wrong answers happen.

### Block 8: `text_explanation`
- **instruction**: Continue Page 4 with a representative worked example and one exam note. Target 120–160 words. Work through: combine \(x(t)=\cos(\omega t)+2\sin(\omega t)\) into one cosine. Show the coefficient match: \(a=1\), \(b=2\), \(R=\sqrt{5}\), and \(\theta=\operatorname{atan2}(2,1)\). State the final answer clearly: \(x(t)=\sqrt{5}\cos(\omega t-\operatorname{atan2}(2,1))\). Then add a quick check sentence: because \(b\) is positive, the phase angle \(\theta\) is positive in the formula \(\omega t-\theta\). Add one exam note using the second required pattern: for \(3\cos(\omega t)-4\sin(\omega t)\), \(b=-4\), so the final phase sign must change accordingly. Do not expand into a long derivation.

### Block 9: `section_summary`
- **instruction**: Create the recap page titled '📌 Key Takeaways'. Include exactly 4 bullets, each ≤25 words, and include the core formulas explicitly. Bullets must cover: \(e^{j\phi}=\cos\phi+j\sin\phi\); \(e^{-j\phi}=\cos\phi-j\sin\phi\); \(\cos\phi=(e^{j\phi}+e^{-j\phi})/2\); \(\sin\phi=(e^{j\phi}-e^{-j\phi})/(2j)\); and \(a\cos(\omega t)+b\sin(\omega t)=R\cos(\omega t-\theta)\), with \(R=\sqrt{a^2+b^2}\), \(\theta=\operatorname{atan2}(b,a)\). End with one bridge sentence: 'Next, these exponential forms will make phasor and signal calculations faster.'

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
    "id": "euler_pair",
    "label": "Euler's positive and negative exponential forms",
    "importance": "high",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp1_q1",
        "type": "multiple_choice",
        "stem": "Using Euler's formula, which expression is correct?",
        "options": [
          "A. \\(e^{-j\\phi}=\\cos\\phi+j\\sin\\phi\\)",
          "B. \\(e^{-j\\phi}=\\cos\\phi-j\\sin\\phi\\)",
          "C. \\(e^{-j\\phi}=-\\cos\\phi+j\\sin\\phi\\)",
          "D. \\(e^{-j\\phi}=-\\cos\\phi-j\\sin\\phi\\)"
        ],
        "correct_option": "B",
        "explanation": "Changing \\(j\\phi\\) to \\(-j\\phi\\) keeps the cosine term the same and flips the sign of the sine term.",
        "wrong_option_explanations": {
          "A": "This is the positive-exponent formula, not the negative-exponent formula.",
          "C": "The cosine term does not become negative when the angle sign changes.",
          "D": "Both signs are not flipped; only the sine term changes sign."
        },
        "hint": "Cosine is even; sine is odd.",
        "needs_visual": false,
        "same_point_variant": false
      },
      {
        "id": "kp1_q2",
        "type": "multiple_choice",
        "stem": "In the interactive phasor demo, the two vectors \\(e^{j\\phi}\\) and \\(e^{-j\\phi}\\) are added. What should you observe?",
        "options": [
          "A. The real parts cancel and the result is purely imaginary.",
          "B. The vertical parts cancel and the result lies on the real axis.",
          "C. Both parts cancel and the result is always zero.",
          "D. The result rotates twice as fast."
        ],
        "correct_option": "B",
        "explanation": "The vectors have equal real parts and opposite vertical parts, so the vertical components cancel when added.",
        "wrong_option_explanations": {
          "A": "Real parts cancel when the exponentials are subtracted, not added.",
          "C": "The real parts reinforce, so the sum is not zero except in special cases where \\(\\cos\\phi=0\\).",
          "D": "Adding the two vectors does not double the angular speed."
        },
        "hint": "Compare \\((\\cos\\phi,\\sin\\phi)\\) with \\((\\cos\\phi,-\\sin\\phi)\\).",
        "needs_visual": true,
        "visual_type": "interactive_demo_observation",
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "sinusoid_exponential_conversion",
    "label": "Cosine and sine in exponential form",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp2_q1",
        "type": "multiple_choice",
        "stem": "Which formula correctly rewrites \\(\\cos\\phi\\) using complex exponentials?",
        "options": [
          "A. \\(\\cos\\phi=\\frac{e^{j\\phi}+e^{-j\\phi}}{2}\\)",
          "B. \\(\\cos\\phi=\\frac{e^{j\\phi}-e^{-j\\phi}}{2}\\)",
          "C. \\(\\cos\\phi=\\frac{e^{j\\phi}-e^{-j\\phi}}{2j}\\)",
          "D. \\(\\cos\\phi=e^{j\\phi}+e^{-j\\phi}\\)"
        ],
        "correct_option": "A",
        "explanation": "Adding the two exponentials cancels the sine terms and gives \\(2\\cos\\phi\\), so divide by 2.",
        "wrong_option_explanations": {
          "B": "The difference isolates the sine-related part, not cosine.",
          "C": "This is the sine formula.",
          "D": "This misses the factor of \\(1/2\\)."
        },
        "hint": "Cosine comes from the sum, not the difference.",
        "needs_visual": false,
        "same_point_variant": true
      },
      {
        "id": "kp2_q2",
        "type": "multiple_choice",
        "stem": "Which formula correctly rewrites \\(\\sin\\phi\\) using complex exponentials?",
        "options": [
          "A. \\(\\sin\\phi=\\frac{e^{j\\phi}+e^{-j\\phi}}{2}\\)",
          "B. \\(\\sin\\phi=\\frac{e^{j\\phi}-e^{-j\\phi}}{2}\\)",
          "C. \\(\\sin\\phi=\\frac{e^{j\\phi}-e^{-j\\phi}}{2j}\\)",
          "D. \\(\\sin\\phi=\\frac{e^{-j\\phi}-e^{j\\phi}}{2}\\)"
        ],
        "correct_option": "C",
        "explanation": "Subtracting the exponentials gives \\(2j\\sin\\phi\\), so division by \\(2j\\) is required.",
        "wrong_option_explanations": {
          "A": "This is the cosine formula.",
          "B": "This forgets the required division by \\(j\\).",
          "D": "This has both the wrong sign convention and no division by \\(j\\)."
        },
        "hint": "The sine formula must contain \\(2j\\) in the denominator.",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "combine_same_frequency_terms",
    "label": "Combine cosine and sine into one sinusoid",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp3_q1",
        "type": "multiple_choice",
        "stem": "Combine \\(x(t)=\\cos(\\omega t)+2\\sin(\\omega t)\\) into the form \\(R\\cos(\\omega t-\\theta)\\).",
        "options": [
          "A. \\(\\sqrt{5}\\cos(\\omega t-\\operatorname{atan2}(2,1))\\)",
          "B. \\(\\sqrt{5}\\cos(\\omega t+\\operatorname{atan2}(2,1))\\)",
          "C. \\(3\\cos(\\omega t-2)\\)",
          "D. \\(\\sqrt{3}\\cos(\\omega t-\\operatorname{atan2}(1,2))\\)"
        ],
        "correct_option": "A",
        "explanation": "Here \\(a=1\\), \\(b=2\\), so \\(R=\\sqrt{1^2+2^2}=\\sqrt{5}\\) and \\(\\theta=\\operatorname{atan2}(2,1)\\).",
        "wrong_option_explanations": {
          "B": "The standard form is \\(\\omega t-\\theta\\); using plus flips the phase sign.",
          "C": "Amplitudes do not add directly, and the phase is not simply 2.",
          "D": "The amplitude and atan2 argument order are both wrong."
        },
        "hint": "Match \\(a\\cos(\\omega t)+b\\sin(\\omega t)\\) with \\(R\\cos(\\omega t-\\theta)\\).",
        "needs_visual": true,
        "visual_type": "phasor_triangle_or_interactive_demo",
        "same_point_variant": true
      },
      {
        "id": "kp3_q2",
        "type": "multiple_choice",
        "stem": "For \\(x(t)=3\\cos(\\omega t)-4\\sin(\\omega t)\\), which final form is correct?",
        "options": [
          "A. \\(5\\cos(\\omega t-\\operatorname{atan2}(4,3))\\)",
          "B. \\(5\\cos(\\omega t-\\operatorname{atan2}(-4,3))\\)",
          "C. \\(7\\cos(\\omega t-\\operatorname{atan2}(-4,3))\\)",
          "D. \\(5\\cos(\\omega t-\\operatorname{atan2}(3,-4))\\)"
        ],
        "correct_option": "B",
        "explanation": "Here \\(a=3\\), \\(b=-4\\), so \\(R=5\\) and \\(\\theta=\\operatorname{atan2}(-4,3)\\). The negative sine coefficient must appear in the phase calculation.",
        "wrong_option_explanations": {
          "A": "This ignores the negative sign on the sine coefficient.",
          "C": "The amplitude is \\(\\sqrt{3^2+(-4)^2}=5\\), not 7.",
          "D": "The atan2 inputs are reversed; use \\(\\operatorname{atan2}(b,a)\\)."
        },
        "hint": "The sine coefficient is \\(b=-4\\), not \\(+4\\).",
        "needs_visual": true,
        "visual_type": "phasor_triangle_or_interactive_demo",
        "same_point_variant": true
      },
      {
        "id": "kp3_q3",
        "type": "short_answer",
        "stem": "A student says \\(3\\cos(\\omega t)-4\\sin(\\omega t)\\) has amplitude 5, so the final answer is just \\(5\\cos(\\omega t)\\). Explain why this is incomplete.",
        "ideal_answer": "The amplitude 5 is correct, but the sine term also changes the phase. A complete single-sinusoid answer must include the phase: \\(5\\cos(\\omega t-\\operatorname{atan2}(-4,3))\\).",
        "grading_rubric": [
          "States that amplitude alone is not enough",
          "Mentions that the sine coefficient creates a phase shift",
          "Provides or correctly describes the final phase-adjusted sinusoid",
          "Does not ignore the negative sign on the sine coefficient"
        ],
        "explanation": "This checks the common exam trap: students often compute magnitude correctly but fail to give the required phase-shifted sinusoid.",
        "hint": "A single sinusoid needs both amplitude and phase.",
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
  "section_id": "B.2-2",
  "section_title": "B.2-2 Sinusoids in Terms of Exponentials",
  "difficulty": "intermediate",
  "estimated_read_minutes": 6,
  "learning_objectives": [
    "Use Euler's formula to rewrite sinusoids as complex exponentials.",
    "Recognize cosine and sine as combinations of opposite complex rotations.",
    "Convert a cosine-sine combination into one phase-shifted sinusoid."
  ],
  "visualization_need": {
    "level": "interactive",
    "reason": [
      "depends_on_parameter_change",
      "formula_to_phenomenon_gap",
      "student_should_manipulate_to_understand",
      "students_commonly_confuse_phase_sign"
    ],
    "recommended_assets": [
      "react_canvas_demo"
    ]
  },
  "visual_plan": {
    "primary_anchor": "react_demo",
    "rationale": "This section is about seeing sinusoids as sums of rotating complex exponentials. A static figure can show one angle, but an interactive phasor demo lets students move phase and coefficients and immediately see what stays real, what becomes imaginary, and how phase sign changes the final sinusoid.",
    "cram": "Use the demo to memorize the exam triggers: opposite rotations produce cosine; their scaled difference produces sine; coefficient signs set phase direction.",
    "standard": "Use the demo beside the formulas to connect Euler's identities to one representative compression example.",
    "top_score": "Use the demo to test sign conventions, quadrant behavior, and why amplitude alone is not a complete answer."
  },
  "blocks": [
    {
      "type": "text_explanation",
      "instruction": "Render Page 1 as a minimal overview only. Include exactly two short sections: 'Section Objective' and 'Concepts In This Section'. Under 'Section Objective', write one sentence: 'Rewrite sinusoids using complex exponentials so amplitude and phase become easier to combine.' Under 'Concepts In This Section', list only these concept names as bullets: Euler's formula; cosine from exponentials; sine from exponentials; combining cosine and sine into one sinusoid. Do not add background paragraphs, examples, or extra explanation on this page."
    },
    {
      "type": "math_block",
      "latex": "e^{j\\phi}=\\cos\\phi+j\\sin\\phi",
      "explanation_instruction": "Start Page 2 with heading '## 1. Euler's formula: one rotating exponential'. Explain in 90–130 words that this formula turns an angle \\(\\phi\\) into a point on the unit circle: the real coordinate is \\(\\cos\\phi\\), the vertical component is \\(\\sin\\phi\\), and \\(j\\) marks the vertical direction. State that \\(\\phi\\) is in radians unless told otherwise. Use case: when a sinusoid or phasor needs to be handled with complex algebra. Exam trigger: expressions involving phase, phasors, or sums of sinusoids. Common misuse: treating \\(j\\sin\\phi\\) as a separate physical signal instead of the vertical component of the rotating complex number. Include one minimal example: at \\(\\phi=0\\), \\(e^{j0}=1\\)."
    },
    {
      "type": "math_block",
      "latex": "e^{-j\\phi}=\\cos\\phi-j\\sin\\phi",
      "explanation_instruction": "Continue Page 2. Explain in 60–90 words that the negative exponent gives the conjugate rotation: same real coordinate, opposite vertical component. Define every symbol briefly: \\(e\\) is the exponential base, \\(j\\) is the imaginary-axis marker, and \\(\\phi\\) is the angle. Use case: pair this with \\(e^{j\\phi}\\) to isolate cosine or sine. Exam trigger: whenever both \\(e^{j\\phi}\\) and \\(e^{-j\\phi}\\) appear. Common misuse: forgetting the minus sign only changes the sine term, not the cosine term."
    },
    {
      "type": "interactive_demo",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Move the angle slider and memorize which parts cancel or reinforce.",
        "standard": "Use the sliders to connect each displayed formula to the moving phasors.",
        "top_score": "Test positive and negative phase values to catch sign and quadrant mistakes."
      },
      "title": "Opposite Rotations Create Sine and Cosine",
      "purpose": "Show how \\(e^{j\\phi}\\) and \\(e^{-j\\phi}\\) rotate in opposite directions and combine to create real cosine and sine expressions.",
      "render_instruction": "Build a React + Canvas demo with a white background and two panels. Left panel: unit circle with real axis horizontal and imaginary axis vertical. Draw one muted teal vector for \\(e^{j\\phi}\\) and one navy vector for \\(e^{-j\\phi}\\). Show their current coordinates as \\((\\cos\\phi,\\sin\\phi)\\) and \\((\\cos\\phi,-\\sin\\phi)\\). Right panel: display two live result bars: average \\((e^{j\\phi}+e^{-j\\phi})/2\\) labeled 'cosine part' and scaled difference \\((e^{j\\phi}-e^{-j\\phi})/(2j)\\) labeled 'sine part'.",
      "controls": [
        {
          "name": "angle_phi",
          "label": "Angle \\(\\phi\\)",
          "min": -6.283185307,
          "max": 6.283185307,
          "default": 1.047197551,
          "step": 0.01
        },
        {
          "name": "show_trails",
          "label": "Show rotation trails",
          "type": "toggle",
          "default": true
        }
      ],
      "observation_prompts": [
        "When the two exponentials are added, the vertical parts cancel.",
        "When they are subtracted, the real parts cancel.",
        "The divisor \\(2j\\) in the sine formula is not optional; it converts the remaining vertical quantity back to a real sine value."
      ]
    },
    {
      "type": "math_block",
      "latex": "\\cos\\phi=\\frac{e^{j\\phi}+e^{-j\\phi}}{2}",
      "explanation_instruction": "Start Page 3 with heading '## 2. Cosine as two opposite exponentials'. Explain in 90–130 words that adding the two Euler formulas cancels the \\(j\\sin\\phi\\) terms and leaves two copies of \\(\\cos\\phi\\), so division by 2 isolates cosine. Define \\(\\phi\\) as the angle or phase argument; in signals it may be \\(\\omega t+\\theta\\). Use case: convert a cosine into exponential form before combining phasors or solving linear signal problems. Exam trigger: a cosine inside algebra where exponentials would be easier. Common misuse: forgetting the factor \\(1/2\\). Include one minimal example: \\(\\cos(\\omega t)=\\frac{e^{j\\omega t}+e^{-j\\omega t}}{2}\\)."
    },
    {
      "type": "math_block",
      "latex": "\\sin\\phi=\\frac{e^{j\\phi}-e^{-j\\phi}}{2j}",
      "explanation_instruction": "Continue Page 3 under the same concept page. Explain in 90–130 words that subtracting the two Euler formulas cancels the cosine terms and leaves \\(2j\\sin\\phi\\), so dividing by \\(2j\\) isolates sine. Define \\(j\\) as the imaginary-axis marker and stress that the final sine value is real when \\(\\phi\\) is real. Use case: convert sine terms into exponential form before phasor addition. Exam trigger: sine terms mixed with cosine terms at the same frequency. Common misuse: writing \\((e^{j\\phi}-e^{-j\\phi})/2\\) and forgetting the \\(j\\), which leaves the wrong type of quantity."
    },
    {
      "type": "math_block",
      "latex": "a\\cos(\\omega t)+b\\sin(\\omega t)=R\\cos(\\omega t-\\theta)",
      "explanation_instruction": "Start Page 4 with heading '## 3. Compress a cosine-sine pair into one sinusoid'. Explain in 100–150 words that same-frequency cosine and sine terms can be combined into one cosine with amplitude \\(R\\) and phase shift \\(\\theta\\). Define \\(a\\) as the cosine coefficient, \\(b\\) as the sine coefficient, \\(\\omega\\) as angular frequency, and \\(t\\) as time. State inline that \\(R=\\sqrt{a^2+b^2}\\) and \\(\\theta=\\operatorname{atan2}(b,a)\\). Use case: when an exam asks to 'combine into one sinusoid' or 'find amplitude and phase'. Common misuse: giving only \\(R\\) and forgetting the final phase-shifted sinusoid. Warn that the sign in \\(\\omega t-\\theta\\) is where many wrong answers happen."
    },
    {
      "type": "text_explanation",
      "instruction": "Continue Page 4 with a representative worked example and one exam note. Target 120–160 words. Work through: combine \\(x(t)=\\cos(\\omega t)+2\\sin(\\omega t)\\) into one cosine. Show the coefficient match: \\(a=1\\), \\(b=2\\), \\(R=\\sqrt{5}\\), and \\(\\theta=\\operatorname{atan2}(2,1)\\). State the final answer clearly: \\(x(t)=\\sqrt{5}\\cos(\\omega t-\\operatorname{atan2}(2,1))\\). Then add a quick check sentence: because \\(b\\) is positive, the phase angle \\(\\theta\\) is positive in the formula \\(\\omega t-\\theta\\). Add one exam note using the second required pattern: for \\(3\\cos(\\omega t)-4\\sin(\\omega t)\\), \\(b=-4\\), so the final phase sign must change accordingly. Do not expand into a long derivation."
    },
    {
      "type": "section_summary",
      "instruction": "Create the recap page titled '📌 Key Takeaways'. Include exactly 4 bullets, each ≤25 words, and include the core formulas explicitly. Bullets must cover: \\(e^{j\\phi}=\\cos\\phi+j\\sin\\phi\\); \\(e^{-j\\phi}=\\cos\\phi-j\\sin\\phi\\); \\(\\cos\\phi=(e^{j\\phi}+e^{-j\\phi})/2\\); \\(\\sin\\phi=(e^{j\\phi}-e^{-j\\phi})/(2j)\\); and \\(a\\cos(\\omega t)+b\\sin(\\omega t)=R\\cos(\\omega t-\\theta)\\), with \\(R=\\sqrt{a^2+b^2}\\), \\(\\theta=\\operatorname{atan2}(b,a)\\). End with one bridge sentence: 'Next, these exponential forms will make phasor and signal calculations faster.'"
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
          "id": "euler_pair",
          "label": "Euler's positive and negative exponential forms",
          "importance": "high",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Using Euler's formula, which expression is correct?",
              "options": [
                "A. \\(e^{-j\\phi}=\\cos\\phi+j\\sin\\phi\\)",
                "B. \\(e^{-j\\phi}=\\cos\\phi-j\\sin\\phi\\)",
                "C. \\(e^{-j\\phi}=-\\cos\\phi+j\\sin\\phi\\)",
                "D. \\(e^{-j\\phi}=-\\cos\\phi-j\\sin\\phi\\)"
              ],
              "correct_option": "B",
              "explanation": "Changing \\(j\\phi\\) to \\(-j\\phi\\) keeps the cosine term the same and flips the sign of the sine term.",
              "wrong_option_explanations": {
                "A": "This is the positive-exponent formula, not the negative-exponent formula.",
                "C": "The cosine term does not become negative when the angle sign changes.",
                "D": "Both signs are not flipped; only the sine term changes sign."
              },
              "hint": "Cosine is even; sine is odd.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "In the interactive phasor demo, the two vectors \\(e^{j\\phi}\\) and \\(e^{-j\\phi}\\) are added. What should you observe?",
              "options": [
                "A. The real parts cancel and the result is purely imaginary.",
                "B. The vertical parts cancel and the result lies on the real axis.",
                "C. Both parts cancel and the result is always zero.",
                "D. The result rotates twice as fast."
              ],
              "correct_option": "B",
              "explanation": "The vectors have equal real parts and opposite vertical parts, so the vertical components cancel when added.",
              "wrong_option_explanations": {
                "A": "Real parts cancel when the exponentials are subtracted, not added.",
                "C": "The real parts reinforce, so the sum is not zero except in special cases where \\(\\cos\\phi=0\\).",
                "D": "Adding the two vectors does not double the angular speed."
              },
              "hint": "Compare \\((\\cos\\phi,\\sin\\phi)\\) with \\((\\cos\\phi,-\\sin\\phi)\\).",
              "needs_visual": true,
              "visual_type": "interactive_demo_observation",
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "sinusoid_exponential_conversion",
          "label": "Cosine and sine in exponential form",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "Which formula correctly rewrites \\(\\cos\\phi\\) using complex exponentials?",
              "options": [
                "A. \\(\\cos\\phi=\\frac{e^{j\\phi}+e^{-j\\phi}}{2}\\)",
                "B. \\(\\cos\\phi=\\frac{e^{j\\phi}-e^{-j\\phi}}{2}\\)",
                "C. \\(\\cos\\phi=\\frac{e^{j\\phi}-e^{-j\\phi}}{2j}\\)",
                "D. \\(\\cos\\phi=e^{j\\phi}+e^{-j\\phi}\\)"
              ],
              "correct_option": "A",
              "explanation": "Adding the two exponentials cancels the sine terms and gives \\(2\\cos\\phi\\), so divide by 2.",
              "wrong_option_explanations": {
                "B": "The difference isolates the sine-related part, not cosine.",
                "C": "This is the sine formula.",
                "D": "This misses the factor of \\(1/2\\)."
              },
              "hint": "Cosine comes from the sum, not the difference.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "Which formula correctly rewrites \\(\\sin\\phi\\) using complex exponentials?",
              "options": [
                "A. \\(\\sin\\phi=\\frac{e^{j\\phi}+e^{-j\\phi}}{2}\\)",
                "B. \\(\\sin\\phi=\\frac{e^{j\\phi}-e^{-j\\phi}}{2}\\)",
                "C. \\(\\sin\\phi=\\frac{e^{j\\phi}-e^{-j\\phi}}{2j}\\)",
                "D. \\(\\sin\\phi=\\frac{e^{-j\\phi}-e^{j\\phi}}{2}\\)"
              ],
              "correct_option": "C",
              "explanation": "Subtracting the exponentials gives \\(2j\\sin\\phi\\), so division by \\(2j\\) is required.",
              "wrong_option_explanations": {
                "A": "This is the cosine formula.",
                "B": "This forgets the required division by \\(j\\).",
                "D": "This has both the wrong sign convention and no division by \\(j\\)."
              },
              "hint": "The sine formula must contain \\(2j\\) in the denominator.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "combine_same_frequency_terms",
          "label": "Combine cosine and sine into one sinusoid",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "Combine \\(x(t)=\\cos(\\omega t)+2\\sin(\\omega t)\\) into the form \\(R\\cos(\\omega t-\\theta)\\).",
              "options": [
                "A. \\(\\sqrt{5}\\cos(\\omega t-\\operatorname{atan2}(2,1))\\)",
                "B. \\(\\sqrt{5}\\cos(\\omega t+\\operatorname{atan2}(2,1))\\)",
                "C. \\(3\\cos(\\omega t-2)\\)",
                "D. \\(\\sqrt{3}\\cos(\\omega t-\\operatorname{atan2}(1,2))\\)"
              ],
              "correct_option": "A",
              "explanation": "Here \\(a=1\\), \\(b=2\\), so \\(R=\\sqrt{1^2+2^2}=\\sqrt{5}\\) and \\(\\theta=\\operatorname{atan2}(2,1)\\).",
              "wrong_option_explanations": {
                "B": "The standard form is \\(\\omega t-\\theta\\); using plus flips the phase sign.",
                "C": "Amplitudes do not add directly, and the phase is not simply 2.",
                "D": "The amplitude and atan2 argument order are both wrong."
              },
              "hint": "Match \\(a\\cos(\\omega t)+b\\sin(\\omega t)\\) with \\(R\\cos(\\omega t-\\theta)\\).",
              "needs_visual": true,
              "visual_type": "phasor_triangle_or_interactive_demo",
              "same_point_variant": true
            },
            {
              "id": "kp3_q2",
              "type": "multiple_choice",
              "stem": "For \\(x(t)=3\\cos(\\omega t)-4\\sin(\\omega t)\\), which final form is correct?",
              "options": [
                "A. \\(5\\cos(\\omega t-\\operatorname{atan2}(4,3))\\)",
                "B. \\(5\\cos(\\omega t-\\operatorname{atan2}(-4,3))\\)",
                "C. \\(7\\cos(\\omega t-\\operatorname{atan2}(-4,3))\\)",
                "D. \\(5\\cos(\\omega t-\\operatorname{atan2}(3,-4))\\)"
              ],
              "correct_option": "B",
              "explanation": "Here \\(a=3\\), \\(b=-4\\), so \\(R=5\\) and \\(\\theta=\\operatorname{atan2}(-4,3)\\). The negative sine coefficient must appear in the phase calculation.",
              "wrong_option_explanations": {
                "A": "This ignores the negative sign on the sine coefficient.",
                "C": "The amplitude is \\(\\sqrt{3^2+(-4)^2}=5\\), not 7.",
                "D": "The atan2 inputs are reversed; use \\(\\operatorname{atan2}(b,a)\\)."
              },
              "hint": "The sine coefficient is \\(b=-4\\), not \\(+4\\).",
              "needs_visual": true,
              "visual_type": "phasor_triangle_or_interactive_demo",
              "same_point_variant": true
            },
            {
              "id": "kp3_q3",
              "type": "short_answer",
              "stem": "A student says \\(3\\cos(\\omega t)-4\\sin(\\omega t)\\) has amplitude 5, so the final answer is just \\(5\\cos(\\omega t)\\). Explain why this is incomplete.",
              "ideal_answer": "The amplitude 5 is correct, but the sine term also changes the phase. A complete single-sinusoid answer must include the phase: \\(5\\cos(\\omega t-\\operatorname{atan2}(-4,3))\\).",
              "grading_rubric": [
                "States that amplitude alone is not enough",
                "Mentions that the sine coefficient creates a phase shift",
                "Provides or correctly describes the final phase-adjusted sinusoid",
                "Does not ignore the negative sign on the sine coefficient"
              ],
              "explanation": "This checks the common exam trap: students often compute magnitude correctly but fail to give the required phase-shifted sinusoid.",
              "hint": "A single sinusoid needs both amplitude and phase.",
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
