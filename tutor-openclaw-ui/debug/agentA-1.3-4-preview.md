# Agent A Preview: 1.3-4 1.3-4 Energy and Power Signals

- Difficulty: intermediate
- Estimated read minutes: 6

## Learning Objectives

- Classify a signal as an energy signal, a power signal, or neither.
- Use the definitions of total energy and average power correctly.
- Recognize why finite-energy signals have zero average power and true power signals require infinite duration.
- Apply the periodic-signal power shortcut and the exponential-signal drill result.

## Visualization Need

```json
{
  "level": "interactive",
  "reason": [
    "depends_on_parameter_change",
    "formula_to_phenomenon_gap",
    "student_should_manipulate_to_understand",
    "input_output_response_is_visual"
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
  "rationale": "Energy and power classification is about what happens as the observation window grows without bound. A static picture can show signal shape, but an interactive running-window demo makes the key limiting behavior visible: finite accumulated energy, linearly growing energy with stable average power, or unbounded growth that prevents classification.",
  "cram": "Use the demo to memorize the recognition patterns: decaying finite-duration-like signals are energy, periodic constant-size signals are power, ramps/growing exponentials are neither.",
  "standard": "Use the demo after the formulas to connect total energy and average power to one representative example for each classification.",
  "top_score": "Use the demo to inspect borderline cases, especially nonzero real exponentials versus pure imaginary exponentials."
}
```

## Planned Blocks

### Block 1: `text_explanation`
- **instruction**: Render the first page as a compact outline only. Include exactly two parts: (1) 'Section Objective' with one sentence of 25 words or fewer: classify signals by total energy and long-term average power. (2) 'Concepts In This Section' as a bullet list of concept names only: energy signal; power signal; average power; mutual exclusivity; periodic signals; neither energy nor power; everlasting exponential drill. Do not add expanded background, examples, or paragraphs on this page.

### Block 2: `math_block`
- **latex**: E_x = \int_{-\infty}^{\infty} |x(t)|^2\,dt
- **explanation_instruction**: Start this page with the heading '## 1. Energy signal: finite total energy'. Explain in 100–140 words that \(E_x\) adds up the squared magnitude of the signal over all time. State the definition: \(x(t)\) is an energy signal when \(0<E_x<\infty\). Explain each symbol: \(x(t)\) is the signal, \(|x(t)|^2\) is instantaneous energy density in this textbook convention, and \(dt\) means summing continuously over time. When to use it: use this formula when the exam asks for total energy, finite energy, or whether a decaying/pulse-like signal is an energy signal. Common misuse: do not call a signal an energy signal just because its amplitude is small; the integral over all time must be finite and nonzero. Include one minimal example: for \(x(t)=e^{-t}u(t)\), the energy is finite, so it is an energy signal.

### Block 3: `math_block`
- **latex**: P_x = \lim_{T\to\infty}\frac{1}{2T}\int_{-T}^{T}|x(t)|^2\,dt
- **explanation_instruction**: Start this page with the heading '## 2. Power signal: finite nonzero long-term average'. Explain in 110–150 words that power is the time average of energy over a window from \(-T\) to \(T\), then the window expands forever. State the definition: \(x(t)\) is a power signal when \(0<P_x<\infty\). Explain each symbol: \(2T\) is the window length, the integral is energy inside that window, and the limit asks what the average becomes over infinite time. Exam trigger: use this when the signal lasts forever with sustained size, especially constants, sinusoids, and periodic signals. Common misuse: do not compute energy over one period and call it total energy. Include one representative example: a sinusoid has infinite total energy but finite average power.

### Block 4: `interactive_demo`
- **teaching_role**: concept_anchor
- **mode_specific_visual_use**:
```json
{
  "cram": "Let students quickly match each signal shape to its classification by watching the running curves.",
  "standard": "Use the demo to connect the energy and power formulas to visible limiting behavior.",
  "top_score": "Let students test borderline cases such as real versus imaginary exponentials."
}
```
- **title**: Running energy and average power classifier
- **purpose**: Show how classification depends on what happens as the observation window grows.
- **demo_spec**:
```json
{
  "rendering": "React + Canvas interactive demo with three stacked panels on a white background.",
  "panels": [
    "Top panel: plot the selected signal \\(x(t)\\) over a symmetric time window.",
    "Middle panel: plot running energy \\(E(T)=\\int_{-T}^{T}|x(t)|^2dt\\) as T increases.",
    "Bottom panel: plot running average power \\(P(T)=E(T)/(2T)\\) as T increases."
  ],
  "controls": [
    "Signal dropdown with options: decaying one-sided pulse \\(e^{-t}u(t)\\), cosine \\(\\cos t\\), ramp \\(t u(t)\\), real everlasting exponential \\(e^{-at}\\) with nonzero real \\(a\\), pure imaginary exponential \\(e^{-j\\omega t}\\).",
    "Slider for observation half-window \\(T\\), from small to large.",
    "Slider for real exponential parameter \\(a\\), excluding zero in the real-exponential mode.",
    "Slider for \\(\\omega\\) in the imaginary-exponential mode."
  ],
  "required_visual_behavior": [
    "For \\(e^{-t}u(t)\\), running energy levels off and running power tends to 0.",
    "For \\(\\cos t\\), running energy grows roughly linearly and running power settles to a finite nonzero value.",
    "For \\(t u(t)\\), both running energy and running average power grow without approaching a finite nonzero constant.",
    "For nonzero real \\(e^{-at}\\), growth in one time direction prevents finite energy or finite nonzero average power.",
    "For \\(e^{-j\\omega t}\\), magnitude stays 1 and average power is 1."
  ]
}
```
- **student_instruction**: After students move the T slider, ask them to say which curve matters: leveling-off energy means energy signal; stable nonzero average power means power signal; neither behavior means neither.
- **fallback**: If an interactive renderer is unavailable, create a simple generated lecture-note visual with three separate mini-graphs: finite-energy pulse, sinusoid power signal, and ramp neither. Use GPTImage2 only as this fallback.

### Block 5: `math_block`
- **latex**: P_x = \frac{1}{T_0}\int_{t_0}^{t_0+T_0}|x(t)|^2\,dt
- **explanation_instruction**: Start this page with the heading '## 3. Periodic signals: use one period'. Explain in 90–130 words that for a periodic signal, the same energy pattern repeats forever, so average power can be computed from any one full period. Define \(T_0\) as the period and \(t_0\) as any starting time. State that the area under \(|x(t)|^2\) over one period must be finite. When to use it: exam phrases like 'periodic', 'sinusoidal', or 'over one period' should trigger this shortcut. Common misuse: do not say every power signal is periodic; the textbook says periodic finite-per-period signals are power signals, but not all power signals are periodic. Include a minimal example: for \(x(t)=\cos t\), the average of \(\cos^2 t\) over one period is \(1/2\).

### Block 6: `math_block`
- **latex**: x(t)=e^{-at},\quad -\infty<t<\infty
- **explanation_instruction**: Start this page with the heading '## 4. Drill case: everlasting exponential'. Explain in 100–140 words that the word 'everlasting' means the exponential exists for all time, not just for \(t\ge 0\). For nonzero real \(a\), the signal decays in one time direction but grows without bound in the other, so it is not an energy signal and does not have finite nonzero average power. For purely imaginary \(a=j\omega\), the signal is \(e^{-j\omega t}\), whose magnitude is always 1, so it is a power signal with \(P_x=1\). Include the exam note: the trap is treating every exponential as a decaying energy signal; that only works for one-sided decays such as \(e^{-t}u(t)\), not everlasting real exponentials.

### Block 7: `section_summary`
- **instruction**: Create a recap page titled '📌 Key Takeaways'. Include 5 concise bullets. The bullets must explicitly include these formulas: \(E_x=\int_{-\infty}^{\infty}|x(t)|^2dt\), \(P_x=\lim_{T\to\infty}\frac{1}{2T}\int_{-T}^{T}|x(t)|^2dt\), and for periodic signals \(P_x=\frac{1}{T_0}\int_{t_0}^{t_0+T_0}|x(t)|^2dt\). Also include the classification facts: finite nonzero energy gives zero average power; finite nonzero power implies infinite energy; a signal cannot be both; some signals are neither. End with one bridge sentence: 'Next, we will use these classifications to reason about common signal models more quickly.'

### Block 8: `quiz_plan`
- **target_questions**:
```json
8
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
    "id": "energy_signal_definition",
    "label": "Energy signal definition and formula trigger",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "energy_q1",
        "type": "multiple_choice",
        "stem": "Which condition correctly defines an energy signal?",
        "options": [
          "A. \\(E_x=0\\)",
          "B. \\(0<E_x<\\infty\\)",
          "C. \\(P_x=\\infty\\)",
          "D. \\(E_x=P_x\\)"
        ],
        "correct_option": "B",
        "explanation": "An energy signal has finite, nonzero total energy.",
        "wrong_option_explanations": {
          "A": "Zero energy would mean the signal is zero almost everywhere, not a useful energy signal.",
          "C": "Infinite power is not the definition of an energy signal.",
          "D": "Energy and power are different quantities and usually do not have the same value."
        },
        "hint": "Look for the finite and nonzero total-energy condition.",
        "needs_visual": false,
        "same_point_variant": false
      },
      {
        "id": "energy_q2",
        "type": "multiple_choice",
        "stem": "An exam gives \\(x(t)=e^{-t}u(t)\\) and asks whether it has finite energy. Which formula should you reach for first?",
        "options": [
          "A. \\(E_x=\\int_{-\\infty}^{\\infty}|x(t)|^2dt\\)",
          "B. \\(P_x=\\frac{1}{T_0}\\int_{t_0}^{t_0+T_0}|x(t)|^2dt\\)",
          "C. \\(x(t+T)=x(t)\\)",
          "D. \\(P_x=E_x\\)"
        ],
        "correct_option": "A",
        "explanation": "The phrase 'finite energy' directly triggers the total-energy integral.",
        "wrong_option_explanations": {
          "B": "That is the periodic-signal power shortcut, not the general energy test.",
          "C": "This checks periodicity, not total energy.",
          "D": "Power is not generally equal to energy."
        },
        "hint": "The question asks about total accumulated squared magnitude.",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "power_signal_definition",
    "label": "Power signal definition and periodic shortcut",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "power_q1",
        "type": "multiple_choice",
        "stem": "Which expression is the general average-power definition for a continuous-time signal?",
        "options": [
          "A. \\(P_x=\\int_{-\\infty}^{\\infty}|x(t)|^2dt\\)",
          "B. \\(P_x=\\lim_{T\\to\\infty}\\frac{1}{2T}\\int_{-T}^{T}|x(t)|^2dt\\)",
          "C. \\(P_x=\\lim_{T\\to 0}\\int_{-T}^{T}|x(t)|dt\\)",
          "D. \\(P_x=|x(0)|^2\\)"
        ],
        "correct_option": "B",
        "explanation": "Average power is energy in a symmetric window divided by the window length, then the window grows forever.",
        "wrong_option_explanations": {
          "A": "That is total energy, not average power.",
          "C": "The limit must go to infinity, and the formula should square the magnitude.",
          "D": "One sample value cannot determine long-term average power."
        },
        "hint": "Power is time-averaged energy over an infinitely long interval.",
        "needs_visual": false,
        "same_point_variant": false
      },
      {
        "id": "power_q2",
        "type": "multiple_choice",
        "stem": "A signal is periodic with period \\(T_0\\), and \\(\\int_{t_0}^{t_0+T_0}|x(t)|^2dt\\) is finite. What is the best classification?",
        "options": [
          "A. It is a power signal.",
          "B. It is an energy signal.",
          "C. It must be neither energy nor power.",
          "D. It is both energy and power."
        ],
        "correct_option": "A",
        "explanation": "A periodic signal with finite energy over one period has finite nonzero average power, assuming the signal is not identically zero.",
        "wrong_option_explanations": {
          "B": "Repeating forever usually makes total energy infinite, not finite.",
          "C": "The finite one-period squared area gives a finite average power.",
          "D": "A signal cannot be both an energy signal and a power signal."
        },
        "hint": "For periodic signals, average over one full period.",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "classification_exclusivity",
    "label": "Energy, power, or neither",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "class_q1",
        "type": "multiple_choice",
        "stem": "If a signal has finite nonzero total energy, what is its average power?",
        "options": [
          "A. Zero",
          "B. Finite and nonzero",
          "C. Infinite",
          "D. Equal to its energy"
        ],
        "correct_option": "A",
        "explanation": "Finite energy divided across an infinitely long averaging interval gives zero average power.",
        "wrong_option_explanations": {
          "B": "Finite nonzero average power would imply infinite total energy.",
          "C": "The energy is finite, so the average cannot blow up.",
          "D": "Energy and power are not the same quantity."
        },
        "hint": "Ask what happens when a fixed finite amount is averaged over infinite time.",
        "needs_visual": false,
        "same_point_variant": false
      },
      {
        "id": "class_q2",
        "type": "multiple_choice",
        "stem": "In the running-window demo, a signal's running energy keeps growing faster and faster, and its running average power does not settle to a finite nonzero value. What classification is most appropriate?",
        "options": [
          "A. Energy signal",
          "B. Power signal",
          "C. Neither energy nor power",
          "D. Both energy and power"
        ],
        "correct_option": "C",
        "explanation": "It fails the finite-energy test and also fails the finite nonzero average-power test.",
        "wrong_option_explanations": {
          "A": "An energy signal needs finite total energy.",
          "B": "A power signal needs average power to approach a finite nonzero limit.",
          "D": "The textbook rule says a signal cannot be both."
        },
        "hint": "Classification requires passing one definition, not merely having a nonzero waveform.",
        "needs_visual": true,
        "visual_type": "react_canvas_demo",
        "visual_prompt": "Use the interactive demo with the ramp signal selected; show running energy and running average power increasing without settling.",
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "everlasting_exponential_drill",
    "label": "Everlasting exponential drill",
    "importance": "high",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "exp_q1",
        "type": "multiple_choice",
        "stem": "For the everlasting signal \\(x(t)=e^{-at}\\) over \\(-\\infty<t<\\infty\\), with nonzero real \\(a\\), what is the classification?",
        "options": [
          "A. Energy signal",
          "B. Power signal with \\(P_x=1\\)",
          "C. Neither energy nor power",
          "D. Both energy and power"
        ],
        "correct_option": "C",
        "explanation": "With nonzero real \\(a\\), the signal grows without bound in one time direction, so it does not have finite energy or finite nonzero average power.",
        "wrong_option_explanations": {
          "A": "That would be true for some one-sided decays, not for an everlasting real exponential.",
          "B": "Power \\(1\\) belongs to the pure imaginary exponential case, where magnitude is constant.",
          "D": "A signal cannot be both energy and power."
        },
        "hint": "Do not forget the signal exists for all time, including the direction where it grows.",
        "needs_visual": true,
        "visual_type": "react_canvas_demo",
        "visual_prompt": "Use the interactive demo with nonzero real exponential mode selected.",
        "same_point_variant": false
      },
      {
        "id": "exp_q2",
        "type": "short_answer",
        "stem": "Why is \\(x(t)=e^{-j\\omega t}\\) a power signal with \\(P_x=1\\)?",
        "ideal_answer": "Its magnitude is always \\(|e^{-j\\omega t}|=1\\), so \\(|x(t)|^2=1\\). The average of 1 over any time interval is 1, giving \\(P_x=1\\), while total energy over infinite time is infinite.",
        "grading_rubric": [
          "Must state that the magnitude is always 1.",
          "Must connect \\(|x(t)|^2=1\\) to average power 1.",
          "Must distinguish finite average power from infinite total energy."
        ],
        "explanation": "This checks the key difference between real exponentials and pure imaginary exponentials.",
        "hint": "For complex exponentials, start by finding the magnitude.",
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
  "section_id": "1.3-4",
  "section_title": "1.3-4 Energy and Power Signals",
  "difficulty": "intermediate",
  "estimated_read_minutes": 6,
  "learning_objectives": [
    "Classify a signal as an energy signal, a power signal, or neither.",
    "Use the definitions of total energy and average power correctly.",
    "Recognize why finite-energy signals have zero average power and true power signals require infinite duration.",
    "Apply the periodic-signal power shortcut and the exponential-signal drill result."
  ],
  "visualization_need": {
    "level": "interactive",
    "reason": [
      "depends_on_parameter_change",
      "formula_to_phenomenon_gap",
      "student_should_manipulate_to_understand",
      "input_output_response_is_visual"
    ],
    "recommended_assets": [
      "react_canvas_demo"
    ]
  },
  "visual_plan": {
    "primary_anchor": "react_demo",
    "rationale": "Energy and power classification is about what happens as the observation window grows without bound. A static picture can show signal shape, but an interactive running-window demo makes the key limiting behavior visible: finite accumulated energy, linearly growing energy with stable average power, or unbounded growth that prevents classification.",
    "cram": "Use the demo to memorize the recognition patterns: decaying finite-duration-like signals are energy, periodic constant-size signals are power, ramps/growing exponentials are neither.",
    "standard": "Use the demo after the formulas to connect total energy and average power to one representative example for each classification.",
    "top_score": "Use the demo to inspect borderline cases, especially nonzero real exponentials versus pure imaginary exponentials."
  },
  "blocks": [
    {
      "type": "text_explanation",
      "instruction": "Render the first page as a compact outline only. Include exactly two parts: (1) 'Section Objective' with one sentence of 25 words or fewer: classify signals by total energy and long-term average power. (2) 'Concepts In This Section' as a bullet list of concept names only: energy signal; power signal; average power; mutual exclusivity; periodic signals; neither energy nor power; everlasting exponential drill. Do not add expanded background, examples, or paragraphs on this page."
    },
    {
      "type": "math_block",
      "latex": "E_x = \\int_{-\\infty}^{\\infty} |x(t)|^2\\,dt",
      "explanation_instruction": "Start this page with the heading '## 1. Energy signal: finite total energy'. Explain in 100–140 words that \\(E_x\\) adds up the squared magnitude of the signal over all time. State the definition: \\(x(t)\\) is an energy signal when \\(0<E_x<\\infty\\). Explain each symbol: \\(x(t)\\) is the signal, \\(|x(t)|^2\\) is instantaneous energy density in this textbook convention, and \\(dt\\) means summing continuously over time. When to use it: use this formula when the exam asks for total energy, finite energy, or whether a decaying/pulse-like signal is an energy signal. Common misuse: do not call a signal an energy signal just because its amplitude is small; the integral over all time must be finite and nonzero. Include one minimal example: for \\(x(t)=e^{-t}u(t)\\), the energy is finite, so it is an energy signal."
    },
    {
      "type": "math_block",
      "latex": "P_x = \\lim_{T\\to\\infty}\\frac{1}{2T}\\int_{-T}^{T}|x(t)|^2\\,dt",
      "explanation_instruction": "Start this page with the heading '## 2. Power signal: finite nonzero long-term average'. Explain in 110–150 words that power is the time average of energy over a window from \\(-T\\) to \\(T\\), then the window expands forever. State the definition: \\(x(t)\\) is a power signal when \\(0<P_x<\\infty\\). Explain each symbol: \\(2T\\) is the window length, the integral is energy inside that window, and the limit asks what the average becomes over infinite time. Exam trigger: use this when the signal lasts forever with sustained size, especially constants, sinusoids, and periodic signals. Common misuse: do not compute energy over one period and call it total energy. Include one representative example: a sinusoid has infinite total energy but finite average power."
    },
    {
      "type": "interactive_demo",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Let students quickly match each signal shape to its classification by watching the running curves.",
        "standard": "Use the demo to connect the energy and power formulas to visible limiting behavior.",
        "top_score": "Let students test borderline cases such as real versus imaginary exponentials."
      },
      "title": "Running energy and average power classifier",
      "purpose": "Show how classification depends on what happens as the observation window grows.",
      "demo_spec": {
        "rendering": "React + Canvas interactive demo with three stacked panels on a white background.",
        "panels": [
          "Top panel: plot the selected signal \\(x(t)\\) over a symmetric time window.",
          "Middle panel: plot running energy \\(E(T)=\\int_{-T}^{T}|x(t)|^2dt\\) as T increases.",
          "Bottom panel: plot running average power \\(P(T)=E(T)/(2T)\\) as T increases."
        ],
        "controls": [
          "Signal dropdown with options: decaying one-sided pulse \\(e^{-t}u(t)\\), cosine \\(\\cos t\\), ramp \\(t u(t)\\), real everlasting exponential \\(e^{-at}\\) with nonzero real \\(a\\), pure imaginary exponential \\(e^{-j\\omega t}\\).",
          "Slider for observation half-window \\(T\\), from small to large.",
          "Slider for real exponential parameter \\(a\\), excluding zero in the real-exponential mode.",
          "Slider for \\(\\omega\\) in the imaginary-exponential mode."
        ],
        "required_visual_behavior": [
          "For \\(e^{-t}u(t)\\), running energy levels off and running power tends to 0.",
          "For \\(\\cos t\\), running energy grows roughly linearly and running power settles to a finite nonzero value.",
          "For \\(t u(t)\\), both running energy and running average power grow without approaching a finite nonzero constant.",
          "For nonzero real \\(e^{-at}\\), growth in one time direction prevents finite energy or finite nonzero average power.",
          "For \\(e^{-j\\omega t}\\), magnitude stays 1 and average power is 1."
        ]
      },
      "student_instruction": "After students move the T slider, ask them to say which curve matters: leveling-off energy means energy signal; stable nonzero average power means power signal; neither behavior means neither.",
      "fallback": "If an interactive renderer is unavailable, create a simple generated lecture-note visual with three separate mini-graphs: finite-energy pulse, sinusoid power signal, and ramp neither. Use GPTImage2 only as this fallback."
    },
    {
      "type": "math_block",
      "latex": "P_x = \\frac{1}{T_0}\\int_{t_0}^{t_0+T_0}|x(t)|^2\\,dt",
      "explanation_instruction": "Start this page with the heading '## 3. Periodic signals: use one period'. Explain in 90–130 words that for a periodic signal, the same energy pattern repeats forever, so average power can be computed from any one full period. Define \\(T_0\\) as the period and \\(t_0\\) as any starting time. State that the area under \\(|x(t)|^2\\) over one period must be finite. When to use it: exam phrases like 'periodic', 'sinusoidal', or 'over one period' should trigger this shortcut. Common misuse: do not say every power signal is periodic; the textbook says periodic finite-per-period signals are power signals, but not all power signals are periodic. Include a minimal example: for \\(x(t)=\\cos t\\), the average of \\(\\cos^2 t\\) over one period is \\(1/2\\)."
    },
    {
      "type": "math_block",
      "latex": "x(t)=e^{-at},\\quad -\\infty<t<\\infty",
      "explanation_instruction": "Start this page with the heading '## 4. Drill case: everlasting exponential'. Explain in 100–140 words that the word 'everlasting' means the exponential exists for all time, not just for \\(t\\ge 0\\). For nonzero real \\(a\\), the signal decays in one time direction but grows without bound in the other, so it is not an energy signal and does not have finite nonzero average power. For purely imaginary \\(a=j\\omega\\), the signal is \\(e^{-j\\omega t}\\), whose magnitude is always 1, so it is a power signal with \\(P_x=1\\). Include the exam note: the trap is treating every exponential as a decaying energy signal; that only works for one-sided decays such as \\(e^{-t}u(t)\\), not everlasting real exponentials."
    },
    {
      "type": "section_summary",
      "instruction": "Create a recap page titled '📌 Key Takeaways'. Include 5 concise bullets. The bullets must explicitly include these formulas: \\(E_x=\\int_{-\\infty}^{\\infty}|x(t)|^2dt\\), \\(P_x=\\lim_{T\\to\\infty}\\frac{1}{2T}\\int_{-T}^{T}|x(t)|^2dt\\), and for periodic signals \\(P_x=\\frac{1}{T_0}\\int_{t_0}^{t_0+T_0}|x(t)|^2dt\\). Also include the classification facts: finite nonzero energy gives zero average power; finite nonzero power implies infinite energy; a signal cannot be both; some signals are neither. End with one bridge sentence: 'Next, we will use these classifications to reason about common signal models more quickly.'"
    },
    {
      "type": "quiz_plan",
      "target_questions": 8,
      "question_range": {
        "min": 6,
        "max": 8
      },
      "knowledge_points": [
        {
          "id": "energy_signal_definition",
          "label": "Energy signal definition and formula trigger",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "energy_q1",
              "type": "multiple_choice",
              "stem": "Which condition correctly defines an energy signal?",
              "options": [
                "A. \\(E_x=0\\)",
                "B. \\(0<E_x<\\infty\\)",
                "C. \\(P_x=\\infty\\)",
                "D. \\(E_x=P_x\\)"
              ],
              "correct_option": "B",
              "explanation": "An energy signal has finite, nonzero total energy.",
              "wrong_option_explanations": {
                "A": "Zero energy would mean the signal is zero almost everywhere, not a useful energy signal.",
                "C": "Infinite power is not the definition of an energy signal.",
                "D": "Energy and power are different quantities and usually do not have the same value."
              },
              "hint": "Look for the finite and nonzero total-energy condition.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "energy_q2",
              "type": "multiple_choice",
              "stem": "An exam gives \\(x(t)=e^{-t}u(t)\\) and asks whether it has finite energy. Which formula should you reach for first?",
              "options": [
                "A. \\(E_x=\\int_{-\\infty}^{\\infty}|x(t)|^2dt\\)",
                "B. \\(P_x=\\frac{1}{T_0}\\int_{t_0}^{t_0+T_0}|x(t)|^2dt\\)",
                "C. \\(x(t+T)=x(t)\\)",
                "D. \\(P_x=E_x\\)"
              ],
              "correct_option": "A",
              "explanation": "The phrase 'finite energy' directly triggers the total-energy integral.",
              "wrong_option_explanations": {
                "B": "That is the periodic-signal power shortcut, not the general energy test.",
                "C": "This checks periodicity, not total energy.",
                "D": "Power is not generally equal to energy."
              },
              "hint": "The question asks about total accumulated squared magnitude.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "power_signal_definition",
          "label": "Power signal definition and periodic shortcut",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "power_q1",
              "type": "multiple_choice",
              "stem": "Which expression is the general average-power definition for a continuous-time signal?",
              "options": [
                "A. \\(P_x=\\int_{-\\infty}^{\\infty}|x(t)|^2dt\\)",
                "B. \\(P_x=\\lim_{T\\to\\infty}\\frac{1}{2T}\\int_{-T}^{T}|x(t)|^2dt\\)",
                "C. \\(P_x=\\lim_{T\\to 0}\\int_{-T}^{T}|x(t)|dt\\)",
                "D. \\(P_x=|x(0)|^2\\)"
              ],
              "correct_option": "B",
              "explanation": "Average power is energy in a symmetric window divided by the window length, then the window grows forever.",
              "wrong_option_explanations": {
                "A": "That is total energy, not average power.",
                "C": "The limit must go to infinity, and the formula should square the magnitude.",
                "D": "One sample value cannot determine long-term average power."
              },
              "hint": "Power is time-averaged energy over an infinitely long interval.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "power_q2",
              "type": "multiple_choice",
              "stem": "A signal is periodic with period \\(T_0\\), and \\(\\int_{t_0}^{t_0+T_0}|x(t)|^2dt\\) is finite. What is the best classification?",
              "options": [
                "A. It is a power signal.",
                "B. It is an energy signal.",
                "C. It must be neither energy nor power.",
                "D. It is both energy and power."
              ],
              "correct_option": "A",
              "explanation": "A periodic signal with finite energy over one period has finite nonzero average power, assuming the signal is not identically zero.",
              "wrong_option_explanations": {
                "B": "Repeating forever usually makes total energy infinite, not finite.",
                "C": "The finite one-period squared area gives a finite average power.",
                "D": "A signal cannot be both an energy signal and a power signal."
              },
              "hint": "For periodic signals, average over one full period.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "classification_exclusivity",
          "label": "Energy, power, or neither",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "class_q1",
              "type": "multiple_choice",
              "stem": "If a signal has finite nonzero total energy, what is its average power?",
              "options": [
                "A. Zero",
                "B. Finite and nonzero",
                "C. Infinite",
                "D. Equal to its energy"
              ],
              "correct_option": "A",
              "explanation": "Finite energy divided across an infinitely long averaging interval gives zero average power.",
              "wrong_option_explanations": {
                "B": "Finite nonzero average power would imply infinite total energy.",
                "C": "The energy is finite, so the average cannot blow up.",
                "D": "Energy and power are not the same quantity."
              },
              "hint": "Ask what happens when a fixed finite amount is averaged over infinite time.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "class_q2",
              "type": "multiple_choice",
              "stem": "In the running-window demo, a signal's running energy keeps growing faster and faster, and its running average power does not settle to a finite nonzero value. What classification is most appropriate?",
              "options": [
                "A. Energy signal",
                "B. Power signal",
                "C. Neither energy nor power",
                "D. Both energy and power"
              ],
              "correct_option": "C",
              "explanation": "It fails the finite-energy test and also fails the finite nonzero average-power test.",
              "wrong_option_explanations": {
                "A": "An energy signal needs finite total energy.",
                "B": "A power signal needs average power to approach a finite nonzero limit.",
                "D": "The textbook rule says a signal cannot be both."
              },
              "hint": "Classification requires passing one definition, not merely having a nonzero waveform.",
              "needs_visual": true,
              "visual_type": "react_canvas_demo",
              "visual_prompt": "Use the interactive demo with the ramp signal selected; show running energy and running average power increasing without settling.",
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "everlasting_exponential_drill",
          "label": "Everlasting exponential drill",
          "importance": "high",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "exp_q1",
              "type": "multiple_choice",
              "stem": "For the everlasting signal \\(x(t)=e^{-at}\\) over \\(-\\infty<t<\\infty\\), with nonzero real \\(a\\), what is the classification?",
              "options": [
                "A. Energy signal",
                "B. Power signal with \\(P_x=1\\)",
                "C. Neither energy nor power",
                "D. Both energy and power"
              ],
              "correct_option": "C",
              "explanation": "With nonzero real \\(a\\), the signal grows without bound in one time direction, so it does not have finite energy or finite nonzero average power.",
              "wrong_option_explanations": {
                "A": "That would be true for some one-sided decays, not for an everlasting real exponential.",
                "B": "Power \\(1\\) belongs to the pure imaginary exponential case, where magnitude is constant.",
                "D": "A signal cannot be both energy and power."
              },
              "hint": "Do not forget the signal exists for all time, including the direction where it grows.",
              "needs_visual": true,
              "visual_type": "react_canvas_demo",
              "visual_prompt": "Use the interactive demo with nonzero real exponential mode selected.",
              "same_point_variant": false
            },
            {
              "id": "exp_q2",
              "type": "short_answer",
              "stem": "Why is \\(x(t)=e^{-j\\omega t}\\) a power signal with \\(P_x=1\\)?",
              "ideal_answer": "Its magnitude is always \\(|e^{-j\\omega t}|=1\\), so \\(|x(t)|^2=1\\). The average of 1 over any time interval is 1, giving \\(P_x=1\\), while total energy over infinite time is infinite.",
              "grading_rubric": [
                "Must state that the magnitude is always 1.",
                "Must connect \\(|x(t)|^2=1\\) to average power 1.",
                "Must distinguish finite average power from infinite total energy."
              ],
              "explanation": "This checks the key difference between real exponentials and pure imaginary exponentials.",
              "hint": "For complex exponentials, start by finding the magnitude.",
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
