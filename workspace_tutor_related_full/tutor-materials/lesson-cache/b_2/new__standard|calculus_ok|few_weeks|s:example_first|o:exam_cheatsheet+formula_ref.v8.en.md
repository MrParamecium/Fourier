```json
{
  "section_id": "b.2",
  "section_title": "B.2 Sinusoids",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.2 Sinusoids\n\n> **Section Objective:** Learn to read every parameter from a sinusoid expression, convert between frequency units, interpret phase shifts, and collapse a sum of sine and cosine terms into one clean sinusoid.\n\nConsider x(t) = 3 cos(2π·50t − 30°). Just from that one line you can read off the amplitude, the frequency, the period, and how far the wave is shifted in time. This section teaches you to do exactly that — fluently and without confusion.\n\nYou will learn what **amplitude C**, **frequency f₀**, **period T₀**, **radian frequency ω₀**, and **phase θ** each do to the shape and timing of a waveform. You will also see that cosine and sine are the same wave, just shifted by 90°. Finally, you will learn how an expression like a cos(ω₀t) + b sin(ω₀t) always collapses into a single cosine.\n\n**Quick background refresh:** Period T₀ is the time for one complete repeat. Frequency f₀ is the number of repeats per second (Hz). They are reciprocals: T₀ = 1/f₀.\n\n**Exam relevance:** Expect questions that ask you to read parameters, convert between f₀ and ω₀, interpret phase delays, and combine sinusoids.\n\n---\n\n> **Formula Reference**\n>\n> x(t) = C cos(2πf₀t + θ) &nbsp;&nbsp;&nbsp; T₀ = 1/f₀ &nbsp;&nbsp;&nbsp; ω₀ = 2πf₀"
    },
    {
      "type": "book_image",
      "source_page": "page-017",
      "fig_id": "Fig. B.6",
      "caption": "This figure shows C cos(ω₀t), C sin(ω₀t), and C cos(ω₀t − 60°) together, making it clear that a phase shift is simply a horizontal time shift — here a delay of one-sixth of a period to the right."
    },
    {
      "type": "text_explanation",
      "content": "## 1. Reading a Sinusoid and Sketching Phase Shift\n\nTake the concrete example: **x(t) = 4 cos(100πt − 60°)**.\n\nUnpacking it step by step:\n\n- **Amplitude:** The coefficient in front is **C = 4**. This is the peak value.\n- **Radian frequency:** The multiplier on t is **ω₀ = 100π rad/s**.\n- **Frequency:** f₀ = ω₀ / (2π) = 100π / (2π) = **50 Hz**.\n- **Period:** T₀ = 1/f₀ = 1/50 = **0.02 s**.\n- **Phase:** The constant added to the angle is **θ = −60°**.\n\n### WHY THE PERIOD FORMULA WORKS\n\nA sinusoid completes one full cycle when its argument increases by 360° (or 2π radians). Starting from ω₀t, one full cycle takes time T₀ such that ω₀T₀ = 2π, giving T₀ = 2π/ω₀ = 1/f₀. Both forms say the same thing.\n\n### PHASE SHIFT AS A TIME SHIFT\n\nA **negative** phase means the wave is **delayed** (shifted right). The delay in time is t_delay = |θ| / (360° · f₀). For −60° at 50 Hz: t_delay = 60/360 × 0.02 s = T₀/6. So the wave slides one-sixth of a cycle to the right.\n\nA **positive** phase means the wave is **advanced** (shifted left).\n\n### KEY IDENTITY\n\ncos(ω₀t − π/2) = sin(ω₀t). Cosine delayed by 90° is sine. This is the bridge between the two functions.\n\n#### Warning — Units\nNever mix degrees and radians in the same calculation. Pick one and stay consistent throughout the problem.\n\n---\n\n> **Formula Reference**\n>\n> T₀ = 1/f₀ = 2π/ω₀ &nbsp;&nbsp;&nbsp; ω₀ = 2πf₀ &nbsp;&nbsp;&nbsp; cos(ω₀t − π/2) = sin(ω₀t)"
    },
    {
      "type": "math_block",
      "latex": "x(t)=C\\cos(2\\pi f_0 t+\\theta)=C\\cos(\\omega_0 t+\\theta),\\qquad T_0=\\frac{1}{f_0}=\\frac{2\\pi}{\\omega_0},\\qquad \\omega_0=2\\pi f_0",
      "explanation": "These two cosine expressions describe the exact same sinusoid — one written in terms of Hz (f₀) and one in terms of rad/s (ω₀). The period formulas on the right let you move freely between period, frequency, and radian frequency: pick whichever form the problem gives you and convert directly."
    },
    {
      "type": "text_explanation",
      "content": "## 2. Adding Sinusoids of the Same Frequency\n\nHere is the destination first: **x(t) = cos(ω₀t) − √3 sin(ω₀t) becomes a single cosine.** The method is to treat the coefficients as a complex number.\n\n### THE GENERAL RULE\n\nFor any expression of the form **a cos(ω₀t) + b sin(ω₀t)**:\n\n1. Compute the amplitude: **C = √(a² + b²)**\n2. Form the complex number **a − jb** (note the minus sign on b)\n3. The phase is **θ = ∠(a − jb)**, the angle of that complex number\n4. Result: **C cos(ω₀t + θ)**\n\n### WHY a − jb?\n\nThink of a − jb as a point on the complex plane: a is the horizontal coordinate and −b is the vertical coordinate. The distance from the origin gives C; the angle from the positive real axis gives θ. This is just the geometry of a right triangle — no memorization needed.\n\n### WORKED EXAMPLE: B.6(a)\n\nx(t) = cos(ω₀t) − √3 sin(ω₀t), so **a = 1** and **b = −√3**.\n\n- C = √(1² + (−√3)²) = √(1 + 3) = **2**\n- a − jb = 1 − j(−√3) = **1 + j√3**\n- The point (1, √3) is in the first quadrant. Its angle is tan⁻¹(√3/1) = **60°**\n- Therefore: **x(t) = 2 cos(ω₀t + 60°)**\n\n### COMMON MISTAKE\n\nYour calculator's tan⁻¹ always returns a value between −90° and +90°. That covers only two quadrants. Always check the signs of the real part (a) and imaginary part (−b) to confirm which quadrant the point actually sits in, then adjust the angle if needed.\n\n---\n\n> **Formula Reference**\n>\n> a cos(ω₀t) + b sin(ω₀t) = C cos(ω₀t + θ)\n>\n> C = √(a² + b²) &nbsp;&nbsp;&nbsp; θ = ∠(a − jb)"
    },
    {
      "type": "book_image",
      "source_page": "page-019",
      "fig_id": "Fig. B.8",
      "caption": "Phasor addition converts two same-frequency sinusoids into a vector addition problem: the length of the resultant phasor is the new amplitude C, and its angle from the real axis is the new phase θ."
    },
    {
      "type": "math_block",
      "latex": "a\\cos\\omega_0 t+b\\sin\\omega_0 t=C\\cos(\\omega_0 t+\\theta),\\qquad C=\\sqrt{a^2+b^2},\\qquad \\theta=\\angle(a-jb)",
      "explanation": "The coefficients a and b become a single phasor (complex number) a − jb: compute its magnitude to get the new amplitude C, and read its angle to get the new phase θ — turning a trigonometric combination problem into straightforward complex-number geometry."
    },
    {
      "type": "text_explanation",
      "content": "## 3. Phasors, Lead/Lag, and a Second Worked Example\n\n### THE MOST COMMONLY CONFUSED FACT\n\n**sin(ω₀t) lags cos(ω₀t) by 90°.** Equivalently, **cosine leads sine by 90°.** This follows directly from cos(ω₀t − π/2) = sin(ω₀t): cosine must be delayed (moved right) by a quarter cycle to become sine, so cosine is ahead.\n\n### WORKED EXAMPLE: B.6(b)\n\nx(t) = −3 cos(ω₀t) + 4 sin(ω₀t)\n\nIdentify the coefficients: **a = −3**, **b = 4**.\n\nForm the complex number: **a − jb = −3 − j4**.\n\nThis point sits at (−3, −4) on the complex plane — that is the **third quadrant** (both coordinates negative).\n\n- Magnitude: C = √(9 + 16) = **5**\n- Reference angle from tan⁻¹: tan⁻¹(4/3) ≈ 53.1°\n- But the point is in the third quadrant, so the actual angle is −180° + 53.1° = **−126.9°**\n\nResult: **x(t) = 5 cos(ω₀t − 126.9°)**\n\n### QUADRANT CAUTION\n\nIf you blindly type tan⁻¹(−4/−3) into a calculator, you get +53.1° — a first-quadrant answer for a third-quadrant point. That is wrong. Always plot the point (a, −b) mentally or on paper, confirm the quadrant, and then assign the angle accordingly.\n\n#### Note on Equivalent Phases\nPhases that differ by 360° describe the same waveform. A sign flip in the coefficient can also be absorbed by adding or subtracting 180°. For exams, use the **principal-value angle** (between −180° and +180°) unless instructed otherwise.\n\n---\n\n> **Formula Reference**\n>\n> sin lags cos by 90° &nbsp;&nbsp;&nbsp; cos leads sin by 90°\n>\n> Equivalent phases differ by multiples of 360°"
    },
    {
      "type": "section_summary",
      "bullets": [
        "Read C, f₀, T₀, ω₀, and θ directly from x(t) = C cos(ω₀t + θ) by inspection.",
        "Convert freely: T₀ = 1/f₀ = 2π/ω₀ and ω₀ = 2πf₀.",
        "cos(ω₀t − π/2) = sin(ω₀t): cosine leads sine by exactly 90°.",
        "Combine a cos + b sin into C cos(ω₀t + θ) using C = √(a²+b²) and θ = ∠(a−jb).",
        "Always check the quadrant of (a, −b) — tan⁻¹ alone can give the wrong phase sign."
      ],
      "transition": "Exam questions in this area typically ask you to read a waveform equation, convert between frequency units, identify which signal leads or lags, and rewrite a cos(ω₀t) + b sin(ω₀t) as a single cosine with the correct amplitude and principal-value phase. In the next section we will build on this sinusoid and phasor viewpoint."
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
          "label": "Read amplitude, phase, frequency, period, and radian frequency from a sinusoid",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "For x(t) = 4 cos(100πt − 60°), which statement is correct?",
              "options": [
                "A. Amplitude = 100π and frequency = 4 Hz",
                "B. Amplitude = 4 and frequency = 50 Hz",
                "C. Period = 50 s and phase = +60°",
                "D. Radian frequency = 50 rad/s"
              ],
              "correct_option": "B",
              "explanation": "The coefficient in front is the amplitude, so C = 4. Since ω₀ = 100π rad/s, f₀ = ω₀/(2π) = 50 Hz.",
              "wrong_option_explanations": {
                "A": "100π is the radian frequency, not the amplitude; 4 is the amplitude, not the frequency.",
                "C": "The phase is −60°, not +60°, and the period is 1/50 = 0.02 s, not 50 s.",
                "D": "The radian frequency is 100π rad/s, not 50 rad/s."
              },
              "hint": "Separate the front coefficient (amplitude), the multiplier on t (radian frequency), and the constant added to the angle (phase).",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "A sinusoid has frequency f₀ = 200 Hz. What are its period and radian frequency?",
              "options": [
                "A. T₀ = 0.005 s, ω₀ = 400π rad/s",
                "B. T₀ = 200 s, ω₀ = 100π rad/s",
                "C. T₀ = 0.0025 s, ω₀ = 200π rad/s",
                "D. T₀ = 5 s, ω₀ = 2π/200 rad/s"
              ],
              "correct_option": "A",
              "explanation": "Use T₀ = 1/f₀ = 1/200 = 0.005 s and ω₀ = 2πf₀ = 2π × 200 = 400π rad/s.",
              "wrong_option_explanations": {
                "B": "Both values are off by large factors; T₀ = 1/f₀, not f₀ itself.",
                "C": "The period is halved incorrectly, and ω₀ should be 400π, not 200π.",
                "D": "This confuses the reciprocal relationships between the quantities."
              },
              "hint": "Apply T₀ = 1/f₀ and ω₀ = 2πf₀ directly with f₀ = 200.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "phase_shift_and_lead_lag",
          "label": "Interpret phase shifts and the lead/lag relation between cosine and sine",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "Which identity is correct?",
              "options": [
                "A. cos(ω₀t + π/2) = sin(ω₀t)",
                "B. cos(ω₀t − π/2) = sin(ω₀t)",
                "C. sin(ω₀t − π/2) = cos(ω₀t)",
                "D. sin(ω₀t) = cos(ω₀t)"
              ],
              "correct_option": "B",
              "explanation": "A cosine delayed by 90° (a quarter cycle to the right) becomes sine: cos(ω₀t − π/2) = sin(ω₀t).",
              "wrong_option_explanations": {
                "A": "Adding π/2 advances the cosine, giving −sin(ω₀t), not +sin(ω₀t).",
                "C": "sin(ω₀t − π/2) equals −cos(ω₀t), not +cos(ω₀t).",
                "D": "Sine and cosine are phase-shifted versions of each other, not identical functions."
              },
              "hint": "Recall that a negative phase shift means a delay to the right, and a quarter-cycle delay turns cosine into sine.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "If x(t) = C cos(ω₀t − 60°), how is it obtained from C cos(ω₀t)?",
              "options": [
                "A. Advance left by one-sixth of a period",
                "B. Delay right by one-sixth of a period",
                "C. Delay right by one-quarter of a period",
                "D. Advance left by one-half of a period"
              ],
              "correct_option": "B",
              "explanation": "A negative phase corresponds to a delay (shift right). Since 60° is one-sixth of 360°, the wave is delayed by T₀/6.",
              "wrong_option_explanations": {
                "A": "A leftward advance would correspond to a positive phase, i.e., cos(ω₀t + 60°).",
                "C": "A quarter-period delay corresponds to 90°, not 60°.",
                "D": "A half-period shift corresponds to 180°, not 60°."
              },
              "hint": "Express 60° as a fraction of one full cycle (360°) to find the fractional period shift, then check the sign.",
              "needs_visual": true,
              "visual_type": "time_shifted_sinusoid_plot",
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "combine_same_frequency_sinusoids",
          "label": "Rewrite a cos(ω₀t) + b sin(ω₀t) as a single sinusoid",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "Express x(t) = cos(ω₀t) − √3 sin(ω₀t) as a single cosine.",
              "options": [
                "A. 2 cos(ω₀t − 60°)",
                "B. 2 cos(ω₀t + 60°)",
                "C. √2 cos(ω₀t + 45°)",
                "D. 2 sin(ω₀t + 60°)"
              ],
              "correct_option": "B",
              "explanation": "Here a = 1 and b = −√3. Then C = √(1² + (√3)²) = 2, and a − jb = 1 − j(−√3) = 1 + j√3. The point (1, √3) is in the first quadrant with angle 60°, so x(t) = 2 cos(ω₀t + 60°).",
              "wrong_option_explanations": {
                "A": "The phase sign is wrong; because a − jb = 1 + j√3 is in the first quadrant, the angle is +60°, not −60°.",
                "C": "Both the amplitude and the angle are incorrect for these coefficient values.",
                "D": "The result should be expressed as a cosine, and this sine form is not equivalent as written."
              },
              "hint": "Compute C = √(a² + b²) first, then form a − jb carefully — note that b = −√3 here, so −jb = +j√3.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp3_q2",
              "type": "multiple_choice",
              "stem": "For x(t) = −3 cos(ω₀t) + 4 sin(ω₀t), what is the correct single-cosine form using the principal-value angle?",
              "options": [
                "A. 5 cos(ω₀t − 53.1°)",
                "B. 5 cos(ω₀t + 53.1°)",
                "C. 5 cos(ω₀t − 126.9°)",
                "D. 7 cos(ω₀t − 126.9°)"
              ],
              "correct_option": "C",
              "explanation": "With a = −3 and b = 4, form a − jb = −3 − j4. Its magnitude is √(9 + 16) = 5. The point (−3, −4) is in the third quadrant, so the angle is −180° + tan⁻¹(4/3) = −180° + 53.1° = −126.9°. Result: 5 cos(ω₀t − 126.9°).",
              "wrong_option_explanations": {
                "A": "53.1° is only the reference angle; the actual point is in the third quadrant, so the angle must be negative and larger in magnitude.",
                "B": "+53.1° places the phasor in the first quadrant, which is inconsistent with the signs a = −3 and −b = −4.",
                "D": "The magnitude is √(9 + 16) = 5, not 7."
              },
              "hint": "Plot the point (a, −b) = (−3, −4) to confirm the quadrant before assigning the angle.",
              "needs_visual": true,
              "visual_type": "complex_plane_phasor_diagram",
              "same_point_