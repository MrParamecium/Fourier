```json
{
  "section_id": "B.2-2 Sinusoids in Terms of Exponentials",
  "section_title": "B.2-2 Sinusoids in Terms of Exponentials",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.2-2 Sinusoids in Terms of Exponentials\n\n> **Objective:** Use Euler's formula to convert sinusoids into sums of complex exponentials, and understand what amplitude, phase, and rotation mean in that picture.\n\n---\n\n## 1. A Concrete Example First\n\nStart with a specific signal: **x(t) = 4 cos(ω₀t + 30°)**.\n\nEuler's formula tells us that cosine can be written as:\n\n$$\\cos\\alpha = \\frac{e^{j\\alpha} + e^{-j\\alpha}}{2}$$\n\nApplying this directly:\n\n$$x(t) = 4 \\cdot \\frac{e^{j(\\omega_0 t + 30°)} + e^{-j(\\omega_0 t + 30°)}}{2} = 2e^{j(\\omega_0 t + 30°)} + 2e^{-j(\\omega_0 t + 30°)}$$\n\nThe original real cosine has become **two complex exponentials**, each with magnitude 2. The first term, $2e^{j(\\omega_0 t + 30°)}$, rotates **counterclockwise** in the complex plane. The second, $2e^{-j(\\omega_0 t + 30°)}$, rotates **clockwise** at the same speed. Together, their imaginary parts cancel and their real parts add — producing the real cosine you started with.\n\n---\n\n### FORMULA REFERENCE\n\n| Identity | Expression |\n|---|---|\n| Euler's formula | $e^{j\\theta} = \\cos\\theta + j\\sin\\theta$ |\n| Cosine expansion | $\\cos\\theta = \\dfrac{e^{j\\theta} + e^{-j\\theta}}{2}$ |"
    },
    {
      "type": "math_block",
      "latex": "e^{j\\theta} = \\cos\\theta + j\\sin\\theta",
      "explanation": "This is the key bridge from trigonometric signals to exponential signals: a single rotating complex exponential simultaneously encodes both cosine (its real part) and sine (its imaginary part)."
    },
    {
      "type": "math_block",
      "latex": "\\cos\\theta = \\frac{e^{j\\theta} + e^{-j\\theta}}{2}, \\qquad \\sin\\theta = \\frac{e^{j\\theta} - e^{-j\\theta}}{2j}",
      "explanation": "Cosine is recovered by adding the forward-rotating and backward-rotating exponentials and dividing by 2, while sine is recovered from their difference divided by 2j. These two identities are the primary exam tools for converting any sinusoidal signal into exponential form — memorize both, paying special attention to the j in the denominator of the sine formula."
    },
    {
      "type": "book_image",
      "source_page": "page-019",
      "fig_id": "Fig. B.8",
      "caption": "The phasor diagram shows that a sinusoid can be viewed as arising from complex rotation in the plane: the phasor's length gives the amplitude and its initial angle gives the phase, exactly as encoded in the exponential form."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "script": "import matplotlib.pyplot as plt\nimport numpy as np\n\nfig, axes = plt.subplots(1, 2, figsize=(11, 5), facecolor='white')\n\n# --- Left panel: complex plane with two rotating arrows ---\nax1 = axes[0]\nax1.set_facecolor('white')\nangle_deg = 45\nangle_rad = np.radians(angle_deg)\n\n# Draw axes\nax1.axhline(0, color='black', linewidth=1.2)\nax1.axvline(0, color='black', linewidth=1.2)\n\n# Forward-rotating arrow: e^{jwt} at +45 degrees\ndx1, dy1 = np.cos(angle_rad), np.sin(angle_rad)\nax1.annotate('', xy=(dx1, dy1), xytext=(0, 0),\n             arrowprops=dict(arrowstyle='->', color='blue', lw=2.2))\nax1.text(dx1 + 0.06, dy1 + 0.04, r'$e^{j\\omega t}$', fontsize=13, color='blue')\n\n# Backward-rotating arrow: e^{-jwt} at -45 degrees\ndx2, dy2 = np.cos(angle_rad), -np.sin(angle_rad)\nax1.annotate('', xy=(dx2, dy2), xytext=(0, 0),\n             arrowprops=dict(arrowstyle='->', color='red', lw=2.2))\nax1.text(dx2 + 0.06, -dy2 - 0.12, r'$e^{-j\\omega t}$', fontsize=13, color='red')\n\n# Dashed projection lines to real axis\nax1.plot([dx1, dx1], [0, dy1], color='blue', linestyle='--', linewidth=1.2, alpha=0.7)\nax1.plot([dx2, dx2], [0, dy2], color='red', linestyle='--', linewidth=1.2, alpha=0.7)\n\n# Angle arc for +45\ntheta_arc = np.linspace(0, angle_rad, 60)\nax1.plot(0.28 * np.cos(theta_arc), 0.28 * np.sin(theta_arc), color='blue', lw=1.0)\nax1.text(0.32, 0.10, r'$+\\omega t$', fontsize=10, color='blue')\n\n# Angle arc for -45\ntheta_arc2 = np.linspace(0, -angle_rad, 60)\nax1.plot(0.28 * np.cos(theta_arc2), 0.28 * np.sin(theta_arc2), color='red', lw=1.0)\nax1.text(0.32, -0.18, r'$-\\omega t$', fontsize=10, color='red')\n\n# Real axis projection dot\nax1.plot(dx1, 0, 'ko', markersize=5)\nax1.annotate('', xy=(dx1, 0), xytext=(0, 0),\n             arrowprops=dict(arrowstyle='->', color='black', lw=1.5))\nax1.text(dx1 - 0.02, -0.14, r'$\\cos(\\omega t)$', fontsize=10, color='black', ha='center')\n\nax1.set_xlim(-1.5, 1.7)\nax1.set_ylim(-1.4, 1.4)\nax1.set_aspect('equal')\nax1.set_xlabel('Real', fontsize=11)\nax1.set_ylabel('Imaginary', fontsize=11)\nax1.set_title('Two Rotating Exponentials\\nin the Complex Plane', fontsize=12, fontweight='bold')\nax1.text(-1.4, 1.25, 'Imaginary parts\\ncancel (opposite)', fontsize=9, color='gray',\n         bbox=dict(boxstyle='round,pad=0.3', facecolor='lightyellow', edgecolor='gray'))\nax1.text(-1.4, -1.35, 'Real parts\\nreinforce (same)', fontsize=9, color='gray',\n         bbox=dict(boxstyle='round,pad=0.3', facecolor='lightcyan', edgecolor='gray'))\nax1.spines['top'].set_visible(False)\nax1.spines['right'].set_visible(False)\n\n# --- Right panel: result on the real axis ---\nax2 = axes[1]\nax2.set_facecolor('white')\n\n# Draw real axis\nax2.axhline(0, color='black', linewidth=1.2)\nax2.set_xlim(-0.3, 2.2)\nax2.set_ylim(-0.6, 0.6)\n\n# Arrow showing cos(wt) on real axis\ncos_val = np.cos(angle_rad)  # = sqrt(2)/2 ~ 0.707\nax2.annotate('', xy=(cos_val, 0), xytext=(0, 0),\n             arrowprops=dict(arrowstyle='->', color='black', lw=2.5))\nax2.plot(cos_val, 0, 'ko', markersize=7)\n\n# Label\nax2.text(0.05, 0.18,\n         r'$\\cos(\\omega t) = \\dfrac{e^{j\\omega t} + e^{-j\\omega t}}{2}$',\n         fontsize=12, color='black')\nax2.text(cos_val / 2, -0.22, r'$\\cos(\\omega t)$', fontsize=12, color='black', ha='center')\nax2.text(0.02, -0.45,\n         'Imaginary parts cancel.\\nOnly the real projection survives.',\n         fontsize=9, color='dimgray')\n\nax2.set_yticks([])\nax2.set_xlabel('Real Axis', fontsize=11)\nax2.set_title('Result: A Real Cosine\\non the Real Axis', fontsize=12, fontweight='bold')\nax2.spines['top'].set_visible(False)\nax2.spines['right'].set_visible(False)\nax2.spines['left'].set_visible(False)\n\nplt.suptitle('How Two Complex Exponentials Combine into a Real Cosine',\n             fontsize=13, fontweight='bold', y=1.01)\nplt.tight_layout()\nplt.savefig('generated/B.2-2-5.png', dpi=150, bbox_inches='tight')",
      "output_path": "generated/B.2-2-5.png",
      "caption": "Left: two complex exponentials rotate in opposite directions in the complex plane — their imaginary parts are always equal and opposite, so they cancel. Right: only the real projection survives, giving a pure cosine on the real axis."
    },
    {
      "type": "analogy",
      "content": "Picture two clock hands of equal length, both pinned at the center. One turns counterclockwise, the other clockwise, at exactly the same speed. At every moment, their vertical (imaginary) components point in opposite directions and cancel out perfectly. But their horizontal (real) components always point the same way and add together. The result? Pure left-right oscillation — an ordinary cosine. That is precisely what adding $e^{j\\omega t}$ and $e^{-j\\omega t}$ does."
    },
    {
      "type": "text_explanation",
      "content": "## 2. The General Rule\n\nNow that the example is clear, here is the general form for any sinusoid.\n\n**Cosine:**\n$$C\\cos(\\omega_0 t + \\theta) = \\frac{C}{2}e^{j(\\omega_0 t + \\theta)} + \\frac{C}{2}e^{-j(\\omega_0 t + \\theta)}$$\n\n**Sine:**\n$$C\\sin(\\omega_0 t + \\theta) = \\frac{C}{2j}e^{j(\\omega_0 t + \\theta)} - \\frac{C}{2j}e^{-j(\\omega_0 t + \\theta)}$$\n\nNow factor the cosine form to separate the phase from the rotation:\n\n$$C\\cos(\\omega_0 t + \\theta) = \\frac{C}{2}e^{j\\theta}\\cdot e^{j\\omega_0 t} + \\frac{C}{2}e^{-j\\theta}\\cdot e^{-j\\omega_0 t}$$\n\nThis factored form is the most informative version. The term $e^{j\\theta}$ is the **phasor** — it is a fixed complex number that encodes the initial angle (phase). The term $e^{j\\omega_0 t}$ supplies the **rotation** as time advances. The coefficient $C/2$ is the amplitude of each rotating component.\n\n### CONNECTION TO PHASORS\n\nWhen engineers refer to a phasor, they mean exactly $\\frac{C}{2}e^{j\\theta}$ (or sometimes $Ce^{j\\theta}$ depending on convention). The phasor captures everything about the sinusoid except the rotation itself.\n\n### COMMON EXAM TRAP\n\n> **Watch out for two classic errors:**\n> 1. **Forgetting the factor 1/2.** The amplitude of each exponential term is $C/2$, not $C$. Omitting the factor of 2 doubles the signal.\n> 2. **Wrong sign in the sine formula.** The sine expansion uses $\\dfrac{1}{2j}$, not $\\dfrac{1}{2}$. Dropping the $j$ in the denominator gives the wrong answer every time.\n\n---\n\n### FORMULA REFERENCE\n\n| Signal | Exponential Form |\n|---|---|\n| $C\\cos(\\omega_0 t + \\theta)$ | $\\dfrac{C}{2}e^{j\\theta}e^{j\\omega_0 t} + \\dfrac{C}{2}e^{-j\\theta}e^{-j\\omega_0 t}$ |\n| $C\\sin(\\omega_0 t + \\theta)$ | $\\dfrac{C}{2j}e^{j\\theta}e^{j\\omega_0 t} - \\dfrac{C}{2j}e^{-j\\theta}e^{-j\\omega_0 t}$ |"
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
          "id": "euler_bridge",
          "label": "Euler identity as the bridge between trigonometric and exponential forms",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Which identity is the correct starting point for writing sinusoids in exponential form?",
              "options": [
                "A. e^{j\\theta} = \\cos\\theta - j\\sin\\theta",
                "B. e^{j\\theta} = \\cos\\theta + j\\sin\\theta",
                "C. \\cos\\theta = e^{j\\theta}",
                "D. \\sin\\theta = je^{j\\theta}"
              ],
              "correct_option": "B",
              "explanation": "Euler's identity is e^{jθ} = cosθ + j sinθ, and it is the standard starting point for deriving cosine and sine in exponential form.",
              "wrong_option_explanations": {
                "A": "That sign is incorrect; the minus sign appears in e^{-jθ}, not e^{jθ}.",
                "C": "A cosine is not equal to a single complex exponential.",
                "D": "A sine is not just j times one exponential."
              },
              "hint": "Recall the formula that contains both cosine and sine together.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "short_answer",
              "stem": "Why does one complex exponential contain both cosine and sine at the same time?",
              "ideal_answer": "Because Euler's identity shows that e^{jθ} equals cosθ + j sinθ, so its real part is cosine and its imaginary part is sine.",
              "grading_rubric": [
                "Must reference Euler's identity",
                "Must state that cosine is the real part",
                "Must state that sine is the imaginary part"
              ],
              "explanation": "This checks whether the student understands the conceptual bridge rather than only memorizing conversion formulas.",
              "hint": "Think in terms of real part and imaginary part.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "cosine_expansion",
          "label": "Cosine written as two exponentials",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "Which expression is equal to cos(ω₀t + θ)?",
              "options": [
                "A. e^{j(ω₀t + θ)} + e^{-j(ω₀t + θ)}",
                "B. (e^{j(ω₀t + θ)} + e^{-j(ω₀t + θ)})/2",
                "C. (e^{j(ω₀t + θ)} - e^{-j(ω₀t + θ)})/2",
                "D. (e^{j(ω₀t + θ)} - e^{-j(ω₀t + θ)})/(2j)"
              ],
              "correct_option": "B",
              "explanation": "Cosine is the average of the positive- and negative-frequency exponentials.",
              "wrong_option_explanations": {
                "A": "It is missing the factor 1/2, so the amplitude is doubled.",
                "C": "That difference form corresponds to sine-related structure, not cosine.",
                "D": "That is the sine identity."
              },
              "hint": "Cosine comes from adding the two exponentials, then scaling.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "Rewrite 6cos(ω₀t - 20°) in exponential form.",
              "options": [
                "A. 3e^{j(ω₀t - 20°)} + 3e^{-j(ω₀t - 20°)}",
                "B. 6e^{j(ω₀t - 20°)} + 6e^{-j(ω₀t - 20°)}",
                "C. 3e^{j(ω₀t - 20°)} - 3e^{-j(ω₀t - 20°)}",
                "D. (6/j)e^{j(ω₀t - 20°)} - (6/j)e^{-j(ω₀t - 20°)}"
              ],
              "correct_option": "A",
              "explanation": "The amplitude 6 gets split equally between the two exponentials, so each coefficient is 3.",
              "wrong_option_explanations": {
                "B": "This forgets the factor 1/2 and doubles the signal.",
                "C": "Cosine uses a sum, not a difference.",
                "D": "This has the structure of a sine conversion, not cosine."
              },
              "hint": "Take half the amplitude and use a plus sign.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "sine_expansion",
          "label": "Sine written as two exponentials",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "Which expression is equal to sin(ω₀t + θ)?",
              "options": [
                "A. (e^{j(ω₀t + θ)} + e^{-j(ω₀t + θ)})/2",
                "B. (e^{j(ω₀t + θ)} - e^{-j(ω₀t + θ)})/2",
                "C. (e^{j(ω₀t + θ)} - e^{-j(ω₀t + θ)})/(2j)",
                "D. j(e^{j(ω₀t + θ)} + e^{-j(ω₀t + θ)})"
              ],
              "correct_option": "C",
              "explanation": "Sine is formed from the difference of the two exponentials divided by 2j.",
              "wrong_option_explanations": {
                "A": "That is the cosine identity.",
                "B": "It is missing the factor 1/j, so it is not equal to sine.",
                "D": "This does not simplify to sine."
              },
              "hint": "Sine uses subtraction and division by 2j.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp3_q2",
              "type": "multiple_choice",
              "stem": "A student writes sin α = (e^{jα} - e^{-jα})/2. What is the mistake?",
              "options": [
                "A. The exponent signs should both be positive",
                "B. The denominator should be 2j, not 2",
                "C. Sine should be written using addition, not subtraction",
                "D. There should be a minus sign in front of the whole expression"
              ],
              "correct_option": "B",
              "explanation": "The missing j in the denominator is the key error; without it, the expression does not equal sine.",
              "wrong_option_explanations": {
                "A": "The opposite signs in the exponents are correct.",
                "C": "Sine is built from a difference, not a sum.",
                "D": "No extra overall minus sign is required."
              },
              "hint": "The sine formula is the one most often remembered with a special denominator.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "positive_negative_frequency_interpretation",
          "label": "Interpretation of positive and negative frequency terms",
          "importance": "medium",
          "exam_weight":