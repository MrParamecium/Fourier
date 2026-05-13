```json
{
  "section_id": "b.2",
  "section_title": "B.2 Sinusoids",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.2 Sinusoids\n\n> **Section Objective:** Learn to read every parameter from a sinusoidal expression, convert freely among period, frequency, and radian frequency, and combine cosine and sine terms of the same frequency into a single sinusoid.\n\n---\n\nConsider the signal x(t) = 3 cos(2π·50t − 30°). Breaking it apart:\n\n- **3** is the amplitude — the peak value the signal reaches.\n- **50** is the frequency f₀ in hertz — the signal completes 50 full cycles every second.\n- **−30°** is the phase — it shifts the entire waveform 30° to the right relative to a pure cosine.\n\nThe signal repeats endlessly, which is the defining feature of a sinusoid. In general, any sinusoid can be written as:\n\nx(t) = C cos(ω₀t + θ)\n\nwhere C is amplitude, ω₀ is radian frequency, and θ is phase.\n\nThis section has two main jobs: **reading a sinusoid's parameters correctly**, and **adding two same-frequency sinusoids into one**."
    },
    {
      "type": "math_block",
      "latex": "x(t)=C\\cos(2\\pi f_0 t+\\theta),\\qquad T_0=\\frac{1}{f_0},\\qquad \\omega_0=2\\pi f_0,\\qquad T_0=\\frac{2\\pi}{\\omega_0}",
      "explanation": "These four formulas connect the three standard ways to describe how fast a sinusoid repeats: the period T₀ (in seconds per cycle), the frequency f₀ (in cycles per second, or hertz), and the radian frequency ω₀ (in radians per second). A critical warning: ω₀ is **not** in hertz — if you read ω₀ = 200π from an expression, the hertz frequency is f₀ = ω₀ / (2π) = 100 Hz, not 200π Hz. Always divide by 2π before reporting a frequency in hertz."
    },
    {
      "type": "book_image",
      "source_page": "page-017",
      "fig_id": "Fig. B.6",
      "caption": "This figure compares C cos ω₀t, C sin ω₀t, and C cos(ω₀t − 60°) side by side, making the phase shift visible as a horizontal time delay of T₀/6 to the right."
    },
    {
      "type": "text_explanation",
      "content": "## 1. Reading and Sketching Sinusoids from Parameters\n\nA sinusoid is completely determined by three things: its **amplitude**, its **repetition rate**, and its **horizontal shift**. Given C cos(ω₀t + θ):\n\n- **Amplitude** = |C| — the peak height above zero.\n- **Period** T₀ = 2π / ω₀ — the duration of one complete cycle.\n- **Phase** θ — a positive θ shifts the graph to the **left** (earlier); a negative θ shifts it to the **right** (later, i.e., a delay).\n\nSo in C cos(ω₀t − 60°), the minus sign means the waveform is delayed — it reaches its peak 60° later than a pure cosine would.\n\n### SINE VS. COSINE: LEAD AND LAG\n\nThe textbook identity is:\n\nC cos(ω₀t − π/2) = C sin(ω₀t)\n\nReading this carefully: sine is cosine **delayed by π/2 radians (90°)**. A delay means **lag**. Therefore:\n\n> **Sine lags cosine by 90°. Cosine leads sine by 90.**\n\n### WORKED EXAMPLE\n\nFor x(t) = 2 cos(100πt − 60°):\n\n1. ω₀ = 100π rad/s\n2. f₀ = ω₀ / (2π) = 100π / (2π) = **50 Hz**\n3. T₀ = 1 / f₀ = 1 / 50 = **0.02 s**\n4. The phase −60° means the waveform is delayed by 60°/360° × T₀ = T₀/6 to the right.\n\n### FORMULA REFERENCE\n\nAmplitude = |C|. Frequency f₀ = ω₀/(2π). Period T₀ = 1/f₀. Negative phase = delay (shift right). Sine lags cosine by 90°; cosine leads sine by 90°."
    },
    {
      "type": "text_explanation",
      "content": "## 2. Adding Same-Frequency Sinusoids\n\nIf two sinusoids share the same ω₀, they can always be combined into a single cosine:\n\na cos ω₀t + b sin ω₀t = C cos(ω₀t + θ)\n\n### DERIVATION\n\nExpand the right side using the cosine addition formula:\n\nC cos(ω₀t + θ) = C cos θ · cos ω₀t − C sin θ · sin ω₀t\n\nMatching coefficients with the left side:\n\n- Cosine coefficient: **a = C cos θ**\n- Sine coefficient: **b = −C sin θ**\n\nFrom these two equations:\n\nC = √(a² + b²),     θ = tan⁻¹(−b / a)\n\n### QUADRANT WARNING\n\nThe formula θ = tan⁻¹(−b/a) is **not sufficient on its own**. A calculator's arctangent always returns a value in (−90°, 90°), but the true angle may lie in any quadrant. You must determine the correct quadrant from the **signs of a and −b** together:\n\n- a > 0 and −b > 0 → Quadrant I\n- a < 0 and −b > 0 → Quadrant II\n- a < 0 and −b < 0 → Quadrant III\n- a > 0 and −b < 0 → Quadrant IV\n\n### KEY INSIGHT\n\nC is **not** the cosine coefficient a. It is the resultant length of both components together: C = √(a² + b²). Think of a right triangle where a and −b are the two legs; C is the hypotenuse.\n\n### FORMULA REFERENCE\n\nC = √(a² + b²). θ = tan⁻¹(−b/a) with quadrant from signs of (a, −b). a = C cos θ. b = −C sin θ."
    },
    {
      "type": "book_image",
      "source_page": "page-019",
      "fig_id": "Fig. B.8",
      "caption": "The phasor diagram turns sinusoid addition into vector addition: the resultant vector's length gives the combined amplitude C, and its angle from the positive real axis gives the phase θ."
    },
    {
      "type": "text_explanation",
      "content": "## 3. Worked Examples\n\n---\n\n### EXAMPLE 1: x(t) = cos ω₀t − √3 sin ω₀t\n\n**Step 1 — Identify coefficients.**\na = 1 (cosine coefficient), b = −√3 (sine coefficient).\n\n**Step 2 — Compute C.**\nC = √(a² + b²) = √(1² + (−√3)²) = √(1 + 3) = **2**\n\n**Step 3 — Find θ using coefficient matching.**\nFrom a = C cos θ: cos θ = 1/2, so θ = 60° or θ = −60°.\nFrom b = −C sin θ: −√3 = −2 sin θ, so sin θ = √3/2 > 0.\nSince cos θ > 0 and sin θ > 0, θ is in Quadrant I: **θ = 60°**.\n\n**Result:** x(t) = **2 cos(ω₀t + 60°)**\n\n---\n\n### EXAMPLE 2: x(t) = −3 cos ω₀t + 4 sin ω₀t\n\n**Step 1 — Identify coefficients.**\na = −3, b = 4.\n\n**Step 2 — Compute C.**\nC = √((−3)² + 4²) = √(9 + 16) = **5**\n\n**Step 3 — Find θ using the point (a, −b).**\nThe point to locate is (a, −b) = (−3, −4).\nThis point lies in **Quadrant III** (both coordinates negative).\nThe reference angle is tan⁻¹(4/3) ≈ 53.1°.\nIn Quadrant III the angle is −180° + 53.1° = **−126.9°**.\n\n#### Warning\nA raw calculator computation of tan⁻¹(−b/a) = tan⁻¹(−4/−3) = tan⁻¹(4/3) ≈ 53.1° gives a Quadrant I answer — which is **wrong** here. Always check the quadrant from the signs of a and −b.\n\n**Result:** x(t) = **5 cos(ω₀t − 126.9°)**\n\n---\n\n### CORE TAKEAWAY\n\nC is always the hypotenuse √(a² + b²); the angle always requires a quadrant check.\n\n### EXAM CHEAT-SHEET\n\n- **C = √(a² + b²)** — resultant magnitude, never just a or b alone.\n- **θ = tan⁻¹(−b/a)** — but verify quadrant from signs of (a, −b).\n- **a = C cos θ, b = −C sin θ** — use these to double-check your answer.\n- **Quadrant rule:** locate the point (a, −b) in the plane; its angle is θ.\n- **Typical exam tasks:** extract C and θ from a sum, verify with coefficient matching, and state the single-sinusoid form."
    },
    {
      "type": "section_summary",
      "bullets": [
        "Sine lags cosine by 90°; equivalently, cosine leads sine by 90°.",
        "C = √(a² + b²) is the resultant magnitude of both components, not just the cosine coefficient a.",
        "Always determine the phase angle quadrant from the signs of a and −b, not from arctangent alone."
      ],
      "transition": "In the next section we will use these sinusoid and phasor ideas in more advanced signal representations."
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
          "id": "read_sinusoid_parameters",
          "label": "Read amplitude, phase, frequency, and period from a sinusoid",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "For x(t) = 4 cos(200πt − 30°), which statement is correct?",
              "options": [
                "A. Amplitude = 4, f₀ = 100 Hz, T₀ = 0.01 s, phase = −30°",
                "B. Amplitude = 4, f₀ = 200 Hz, T₀ = 0.005 s, phase = −30°",
                "C. Amplitude = 200π, f₀ = 100 Hz, T₀ = 0.01 s, phase = 30°",
                "D. Amplitude = 4, f₀ = 100 Hz, T₀ = 100 s, phase = −30°"
              ],
              "correct_option": "A",
              "explanation": "Since ω₀ = 200π, we get f₀ = ω₀ / (2π) = 100 Hz and T₀ = 1/f₀ = 0.01 s. The amplitude is the coefficient 4, and the phase is −30°.",
              "wrong_option_explanations": {
                "B": "This treats ω₀ as if it were already in hertz. You must divide by 2π first: f₀ = 200π / (2π) = 100 Hz.",
                "C": "200π is the radian frequency, not the amplitude. The phase sign was also flipped incorrectly.",
                "D": "The period is the reciprocal of frequency: T₀ = 1/100 = 0.01 s, not 100 s."
              },
              "hint": "Separate the coefficient, the angular frequency inside the cosine, and the phase before calculating anything.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "A signal has period T₀ = 2 ms. What is its radian frequency?",
              "options": [
                "A. 500 rad/s",
                "B. 1000π rad/s",
                "C. 2000π rad/s",
                "D. 250π rad/s"
              ],
              "correct_option": "B",
              "explanation": "T₀ = 0.002 s, so f₀ = 1/T₀ = 500 Hz. Then ω₀ = 2πf₀ = 2π × 500 = 1000π rad/s.",
              "wrong_option_explanations": {
                "A": "500 is the hertz frequency f₀, not the radian frequency. You must multiply by 2π.",
                "C": "This is twice the correct value — a common error from using T₀ = 1 ms instead of 2 ms.",
                "D": "This is one quarter of the correct value."
              },
              "hint": "Use f₀ = 1/T₀ first, then multiply by 2π to get ω₀.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "phase_shift_lead_lag",
          "label": "Interpret phase shift and lead/lag",
          "importance": "high",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "Which statement is correct?",
              "options": [
                "A. sin(ω₀t) leads cos(ω₀t) by 90°",
                "B. cos(ω₀t) lags sin(ω₀t) by 90°",
                "C. sin(ω₀t) lags cos(ω₀t) by 90°",
                "D. sin(ω₀t) and cos(ω₀t) are in phase"
              ],
              "correct_option": "C",
              "explanation": "Because cos(ω₀t − π/2) = sin(ω₀t), sine is the delayed version of cosine by 90°. A delay means lag, so sine lags cosine by 90°.",
              "wrong_option_explanations": {
                "A": "The direction is reversed. Sine is delayed relative to cosine, so sine lags — it does not lead.",
                "B": "Cosine actually leads sine by 90°, not lags it.",
                "D": "They are separated by a quarter cycle (90°), which is the maximum possible phase difference for these two waveforms."
              },
              "hint": "Remember: a delay in time corresponds to a lag in phase.",
              "needs_visual": true,
              "visual_type": "waveform_shift",
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "combine_same_frequency_sinusoids",
          "label": "Rewrite a cos ω₀t + b sin ω₀t as one sinusoid",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "Rewrite x(t) = 3 cos(ω₀t) + 4 sin(ω₀t) in the form C cos(ω₀t + θ). Which pair (C, θ) is correct?",
              "options": [
                "A. C = 5, θ = 53.1°",
                "B. C = 5, θ = −53.1°",
                "C. C = 7, θ = −53.1°",
                "D. C = 1, θ = 53.1°"
              ],
              "correct_option": "B",
              "explanation": "Here a = 3 and b = 4, so C = √(3² + 4²) = 5. From b = −C sin θ: 4 = −5 sin θ, so sin θ = −0.8 and θ = −53.1°. The point (a, −b) = (3, −4) is in Quadrant IV, confirming a negative angle.",
              "wrong_option_explanations": {
                "A": "The magnitude C = 5 is correct, but the phase sign is wrong. Because b = −C sin θ, a positive b forces sin θ to be negative, giving a negative θ.",
                "C": "C is the resultant magnitude √(a² + b²) = 5, not the sum a + b = 7.",
                "D": "This confuses the difference of components (3 − 4 = −1 or similar) with the resultant magnitude."
              },
              "hint": "Match coefficients carefully: a = C cos θ and b = −C sin θ. Then check the quadrant of (a, −b).",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp3_q2",
              "type": "multiple_choice",
              "stem": "For x(t) = −3 cos(ω₀t) + 4 sin(ω₀t), which angle θ is correct in x(t) = C cos(ω₀t + θ)?",
              "options": [
                "A. 53.1°",
                "B. −53.1°",
                "C. 126.9°",
                "D. −126.9°"
              ],
              "correct_option": "D",
              "explanation": "With a = −3 and b = 4, the point (a, −b) = (−3, −4) lies in Quadrant III. The reference angle is tan⁻¹(4/3) ≈ 53.1°, so the Quadrant III angle is −180° + 53.1° = −126.9°.",
              "wrong_option_explanations": {
                "A": "This ignores both signs and incorrectly places the point in Quadrant I.",
                "B": "This uses the correct reference angle magnitude but the wrong quadrant — (−3, −4) is not in Quadrant IV.",
                "C": "Quadrant II would give a = C cos θ < 0 and −b = C sin θ > 0, but here −b = −4 < 0, so Quadrant II is inconsistent."
              },
              "hint": "Do not trust arctangent alone. Locate the point (a, −b) in the plane and choose the quadrant from its signs.",
              "needs_visual": true,
              "visual_type": "phasor_diagram",
              "same_point_variant": true
            },
            {
              "id": "kp3_q3",
              "type": "short_answer",
              "stem": "Explain why C in a cos(ω₀t) + b sin(ω₀t) = C cos(ω₀t + θ) is not usually equal to the cosine coefficient a.",
              "ideal_answer": "C is the resultant amplitude obtained from both components together, so C = √(a² + b²). The coefficient a is only the horizontal cosine component, not the full amplitude unless b = 0.",
              "grading_rubric": [
                "Must state that C is the overall or resultant amplitude",
                "Must mention C = √(a² + b²)",
                "Must distinguish the component a from the total magnitude C"
              ],
              "explanation": "This directly tests whether the student understands that amplitude is a resultant length, not a single rectangular component.",
              "hint": "Think of a right triangle: a and −b are the two legs, and C is the hypotenuse.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "phasor_interpretation",
          "label": "Use phasors as vector addition for sinusoids",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp4_q1",
              "type": "multiple_choice",
              "stem": "In the phasor view of a cos(ω₀t) + b sin(ω₀t), what does the length of the resultant phasor represent?",
              "options": [
                "A. The period T₀",
                "B. The amplitude C of the single equivalent sinusoid",
                "C. The real part a only",
                "D. The phase θ only"
              ],
              "correct_option": "B",
              "explanation": "The resultant phasor encodes the equivalent single sinusoid. Its length is the amplitude C = √(a² + b²), and its angle from the positive real axis is the phase θ.",
              "wrong_option_explanations": {
                "A": "Period is determined by the frequency ω₀, not by the phasor length.",
                "C": "The value a is only one rectangular component of the phasor — the horizontal projection, not the full length.",
                "D": "The angle of the phasor gives the phase; the length gives the amplitude. These are two separate quantities."
              },
              "hint": "In any vector, length corresponds to magnitude. The phasor is a vector.",
              "needs_visual":