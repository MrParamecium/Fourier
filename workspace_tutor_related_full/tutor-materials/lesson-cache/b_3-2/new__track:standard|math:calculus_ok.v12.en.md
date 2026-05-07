```json
{
  "section_id": "B.3-2 The Exponentially Varying Sinusoid",
  "section_title": "B.3-2 The Exponentially Varying Sinusoid",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.3-2 The Exponentially Varying Sinusoid\n\n> **Section Objective:** Learn a reliable, exam-ready method for sketching signals whose amplitude decays over time — by splitting the signal into an exponential envelope and a shifted cosine, then combining them.\n\nConsider the signal **x(t) = 4e^{-2t} cos(6t - 60°)**. This is a cosine wave whose amplitude does not stay fixed — it shrinks exponentially as time increases. Signals like this appear throughout circuits and systems, and exam questions routinely ask you to read the decay rate, period, phase shift, and envelope directly from one expression.\n\nThe strategy is straightforward: **split first, sketch each part separately, then combine.** You will sketch the exponential envelope, reflect it, sketch the shifted cosine, and finally fit the sinusoid between the two envelopes. Master this workflow and you can handle any signal of this type quickly and confidently."
    },
    {
      "type": "book_image",
      "source_page": "page-022",
      "fig_id": null,
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the page to reinforce the textbook's 3-step sketching procedure at a glance.",
        "standard": "Use the page as the official source for the example and envelope-based sketching method.",
        "top_score": "Use the page to point out exactly how the book connects separate component sketches to the final waveform."
      },
      "caption": "This textbook page shows the standard workflow: sketch the exponential envelope, sketch the shifted cosine, then draw the final sinusoid constrained inside the positive and negative exponential envelopes."
    },
    {
      "type": "math_block",
      "latex": "x(t) = A e^{-at} \\cos(\\omega_0 t + \\theta)",
      "explanation": "Here A sets the initial scale of the signal, e^{-at} controls how the amplitude grows or decays over time (acting as the envelope), and cos(ω₀t + θ) determines the oscillation shape, frequency, and phase shift of the underlying sinusoid."
    },
    {
      "type": "text_explanation",
      "content": "## 1. How to Sketch the Signal Quickly\n\nFollow this four-step exam sequence every time you see a signal of the form x(t) = Ke^{-at} cos(ω₀t + θ).\n\n**Step 1 — Sketch the positive envelope:** Draw the curve Ke^{-at}. For x(t) = 4e^{-2t} cos(6t - 60°), this is 4e^{-2t}. The time constant is τ = 1/a = 1/2 = **0.5 s**, so the envelope drops to about 37% of its starting value (≈ 1.47) after half a second.\n\n**Step 2 — Reflect the envelope:** Draw -Ke^{-at} = -4e^{-2t} as the lower boundary. These two curves form the channel the sinusoid must stay inside.\n\n**Step 3 — Sketch the shifted cosine:** The period is T₀ = 2π/ω₀ = 2π/6 ≈ **1.05 s**. The phase -60° delays the cosine by (60°/360°) × T₀ ≈ (1/6) × 1.05 ≈ **0.17 s** (roughly 1/6 s). Mark this delay on the time axis before drawing the first peak.\n\n**Step 4 — Fit the sinusoid between the envelopes:** Draw the cosine oscillation so that its peaks touch the upper envelope and its troughs touch the lower envelope.\n\n### EXAM TIP\n\nA very common mistake is thinking that the exponential decay also changes the oscillation frequency. It does **not** — only the amplitude envelope shrinks. The period T₀ = 2π/ω₀ stays constant throughout the entire signal."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "example_support",
      "mode_specific_visual_use": {
        "cram": "Use the plot to memorize the visual pattern of a cosine trapped inside shrinking envelopes.",
        "standard": "Use the plot to connect the formula to one clean worked sketch from the textbook example.",
        "top_score": "Use the plot to inspect where peaks meet the envelopes and separate amplitude decay from unchanged oscillation rate."
      },
      "script": "import matplotlib.pyplot as plt\nimport numpy as np\n\nt = np.linspace(0, 2.2, 2000)\n\n# Signal components\nA = 4\na = 2\nomega0 = 6\ntheta_deg = -60\ntheta_rad = np.deg2rad(theta_deg)\n\nx = A * np.exp(-a * t) * np.cos(omega0 * t + theta_rad)\nenv_pos = A * np.exp(-a * t)\nenv_neg = -A * np.exp(-a * t)\n\nfig, ax = plt.subplots(figsize=(9, 5))\nfig.patch.set_facecolor('white')\nax.set_facecolor('white')\n\n# Envelopes\nax.plot(t, env_pos, '--', color='#E07B39', linewidth=1.8, label=r'$+4e^{-2t}$ (upper envelope)')\nax.plot(t, env_neg, '--', color='#5B8DB8', linewidth=1.8, label=r'$-4e^{-2t}$ (lower envelope)')\n\n# Signal\nax.plot(t, x, color='#2C2C2C', linewidth=2.0, label=r'$x(t) = 4e^{-2t}\\cos(6t - 60°)$')\n\n# Shade the region between envelopes\nax.fill_between(t, env_neg, env_pos, alpha=0.07, color='gray')\n\n# Guide time markers\nguide_times = [0, 0.5, 1.0, 1.5, 2.0]\nfor gt in guide_times:\n    ax.axvline(x=gt, color='lightgray', linewidth=0.8, linestyle=':')\n    ax.text(gt, -4.3, f't={gt}', ha='center', va='top', fontsize=8, color='gray')\n\n# Mark t=0 amplitude\nax.annotate('', xy=(0, 4), xytext=(0, 0),\n            arrowprops=dict(arrowstyle='<->', color='#E07B39', lw=1.2))\nax.text(0.05, 2.0, 'A=4', fontsize=9, color='#E07B39')\n\n# Mark time constant\nax.annotate('', xy=(0.5, 0), xytext=(0, 0),\n            arrowprops=dict(arrowstyle='<->', color='purple', lw=1.2))\nax.text(0.22, 0.25, r'$\\tau = 0.5$ s', fontsize=9, color='purple')\n\n# Mark one period\nax.annotate('', xy=(1.05, -0.4), xytext=(0.0, -0.4),\n            arrowprops=dict(arrowstyle='<->', color='#2C7A2C', lw=1.2))\nax.text(0.45, -0.75, r'$T_0 \\approx 1.05$ s', fontsize=9, color='#2C7A2C')\n\n# Mark phase delay\nax.annotate('', xy=(0.175, -0.55), xytext=(0.0, -0.55),\n            arrowprops=dict(arrowstyle='<->', color='#8B008B', lw=1.2))\nax.text(0.01, -0.9, r'delay $\\approx \\frac{1}{6}$ s', fontsize=8.5, color='#8B008B')\n\n# Axes and labels\nax.set_xlim(0, 2.2)\nax.set_ylim(-4.5, 4.5)\nax.set_xlabel('Time t (s)', fontsize=11)\nax.set_ylabel('Amplitude', fontsize=11)\nax.set_title(r'$x(t) = 4e^{-2t}\\cos(6t - 60°)$ with Exponential Envelopes', fontsize=12, fontweight='bold')\nax.axhline(0, color='black', linewidth=0.8)\nax.grid(True, linestyle='--', linewidth=0.5, alpha=0.5)\nax.legend(loc='upper right', fontsize=9, framealpha=0.9)\n\nplt.tight_layout()\nplt.savefig('generated/B.3-2-5.png', dpi=150, bbox_inches='tight')\n",
      "output_path": "generated/B.3-2-5.png",
      "caption": "Plot of x(t) = 4e^{-2t} cos(6t - 60°) (solid black) with its upper envelope +4e^{-2t} (orange dashed) and lower envelope -4e^{-2t} (blue dashed). The waveform is always constrained between the two envelopes, touching them at instants where the cosine equals ±1. Key parameters — time constant τ = 0.5 s, period T₀ ≈ 1.05 s, and phase delay ≈ 1/6 s — are annotated directly on the plot."
    },
    {
      "type": "text_explanation",
      "content": "## 2. What the Envelopes Mean\n\nThe two curves ±Ke^{-at} are not just decorative guides — they are hard boundaries that the waveform can never cross.\n\nHere is why: the cosine factor cos(ω₀t + θ) can only ever reach values between -1 and +1. So when you multiply it by Ke^{-at}, the result is always between -Ke^{-at} and +Ke^{-at}. The waveform **touches** the upper envelope +Ke^{-at} at exactly the instants when the cosine equals +1, and it **touches** the lower envelope -Ke^{-at} at exactly the instants when the cosine equals -1.\n\nThe key insight is this: **the exponential does not change where the cosine wants to oscillate — it only shrinks the allowed amplitude over time.** The oscillation keeps happening at the same frequency; the envelopes just squeeze it progressively tighter toward zero.\n\n### QUICK CHECK\n\nIf you increase the value of a in Ke^{-at} cos(ω₀t + θ), does the period change?\n\n**No** — the period T₀ = 2π/ω₀ depends only on ω₀, not on a. Increasing a only makes the envelope shrink faster; the oscillation rate is completely unaffected."
    },
    {
      "type": "analogy",
      "content": "Think of a vibrating guitar string that has just been plucked. The string swings back and forth at a fixed rate — that is the cosine oscillation, always at the same frequency. But the maximum distance the string can swing from center gets smaller and smaller with each cycle as energy is lost to friction. Now imagine two curved boundaries above and below the string, one bowing upward and one bowing downward, both shrinking toward the center line over time. The string's tip can never go beyond those boundaries; it just keeps oscillating while the boundaries squeeze it tighter and tighter. Those shrinking boundaries are exactly the positive and negative exponential envelopes ±Ke^{-at}. The string's rhythm never changes — only the room it has to swing keeps narrowing."
    },
    {
      "type": "section_summary",
      "bullets": [
        "Split the signal: sketch the exponential envelope and the shifted cosine separately before combining.",
        "Use ±Ke^{-at} as the upper and lower envelopes; the waveform stays strictly between them.",
        "Read period T₀ = 2π/ω₀ and phase delay from the cosine part; decay rate from the exponential."
      ],
      "transition": "In the next section we will continue using waveform-building ideas to sketch more complicated signals."
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
          "id": "general_form_recognition",
          "label": "Recognizing the structure of an exponentially varying sinusoid",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Which expression has the form of an exponentially varying sinusoid discussed in this section?",
              "options": [
                "A. 5e^{-2t} + cos(3t)",
                "B. 5e^{-2t} cos(3t + 20°)",
                "C. 5cos(e^{-2t}t)",
                "D. e^{-2t^2} cos(3t)"
              ],
              "correct_option": "B",
              "explanation": "An exponentially varying sinusoid has the product form Ke^{-at} cos(ω₀t + θ). Option B is exactly that: a decaying exponential multiplied by a cosine with a phase shift.",
              "wrong_option_explanations": {
                "A": "This is a sum of two separate terms, not a sinusoid whose amplitude is controlled by an exponential envelope.",
                "C": "The exponential is inside the cosine argument, so it modifies the frequency rather than acting as the amplitude envelope described here.",
                "D": "The standard form uses e^{-at} with a linear exponent, not e^{-at²} with a squared exponent."
              },
              "hint": "Look for exponential times cosine — not addition, and not a modified angle inside the cosine.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "parameter_reading",
          "label": "Reading time constant, period, and phase shift from the formula",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "For x(t) = 4e^{-2t} cos(6t - 60°), which statement is correct?",
              "options": [
                "A. The time constant is 2 s and the period is 6 s",
                "B. The time constant is 0.5 s and the period is about 1 s",
                "C. The time constant is 4 s and the period is about 0.5 s",
                "D. The time constant is 1 s and the period is 2π s"
              ],
              "correct_option": "B",
              "explanation": "For e^{-at}, the time constant is τ = 1/a = 1/2 = 0.5 s. For cos(ω₀t + θ), the period is T₀ = 2π/ω₀ = 2π/6 ≈ 1.05 s, which is approximately 1 s.",
              "wrong_option_explanations": {
                "A": "This confuses a = 2 with the time constant itself; the time constant is 1/a, not a. It also ignores the formula T₀ = 2π/ω₀.",
                "C": "Neither the time constant nor the period is derived from the amplitude coefficient 4.",
                "D": "The time constant is 1/2 s, not 1 s, and the period must divide 2π by ω₀ = 6, giving about 1 s, not 2π s."
              },
              "hint": "Use τ = 1/a for the time constant and T₀ = 2π/ω₀ for the period.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "In x(t) = 4e^{-2t} cos(6t - 60°), the term -60° means the cosine is",
              "options": [
                "A. advanced by about 1/6 s",
                "B. delayed by about 1/6 s",
                "C. delayed by about 1/2 s",
                "D. reduced in amplitude by 60%"
              ],
              "correct_option": "B",
              "explanation": "A negative phase angle inside cos(ω₀t - φ) corresponds to a time delay. Since 60° is 1/6 of a full 360° cycle, the delay is (1/6) × T₀ ≈ (1/6) × 1.05 s ≈ 0.17 s, roughly 1/6 s.",
              "wrong_option_explanations": {
                "A": "A negative phase angle produces a delay, not an advance. An advance would require a positive phase angle.",
                "C": "60° is one-sixth of a full cycle, not one-half. A half-cycle delay would require a 180° phase shift.",
                "D": "Phase shift affects the timing of the waveform, not its amplitude. Amplitude is set by the factor 4 and the envelope."
              },
              "hint": "Convert the phase angle as a fraction of 360° into a fraction of the period T₀.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "envelope_interpretation",
          "label": "Using positive and negative envelopes to sketch the final waveform",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "When sketching x(t) = Ke^{-at} cos(ω₀t + θ), which pair should be drawn as the amplitude envelopes?",
              "options": [
                "A. ±K cos(ω₀t + θ)",
                "B. ±e^{-at}",
                "C. ±Ke^{-at}",
                "D. ±(ω₀t + θ)"
              ],
              "correct_option": "C",
              "explanation": "The cosine factor oscillates between -1 and +1. Multiplying by Ke^{-at} means the full signal stays between +Ke^{-at} and -Ke^{-at}. Those two curves are the envelopes.",
              "wrong_option_explanations": {
                "A": "These are oscillatory curves that vary up and down — they are not smooth decaying envelopes.",
                "B": "This omits the amplitude factor K, so the envelope would be scaled incorrectly.",
                "D": "This is the phase argument of the cosine, not an amplitude curve of any kind."
              },
              "hint": "Ask yourself: what is the maximum and minimum value the cosine can take, and what does multiplying by Ke^{-at} do to those extremes?",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp3_q2",
              "type": "multiple_choice",
              "stem": "Which statement best describes the effect of increasing a in Ke^{-at} cos(ω₀t + θ)?",
              "options": [
                "A. The oscillation frequency increases",
                "B. The period increases",
                "C. The envelope shrinks faster, but the cosine frequency stays the same",
                "D. The phase shift becomes larger"
              ],
              "correct_option": "C",
              "explanation": "The parameter a belongs exclusively to the exponential factor e^{-at}. Increasing a makes the time constant τ = 1/a smaller, so the envelope decays more quickly. The oscillation frequency ω₀ and phase θ are in the cosine factor and are completely unaffected.",
              "wrong_option_explanations": {
                "A": "Oscillation frequency is controlled by ω₀ in the cosine factor, not by a in the exponential.",
                "B": "Period T₀ = 2π/ω₀ depends only on ω₀; changing a has no effect on the period.",
                "D": "Phase shift is controlled by θ inside the cosine argument, not by a."
              },
              "hint": "Separate the jobs of the exponential part and the cosine part — each parameter belongs to exactly one of them.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp3_q3",
              "type": "multiple_choice",
              "stem": "A plotted waveform of x(t) = 4e^{-2t} cos(6t - 60°) is shown with dashed curves y = ±4e^{-2t}. What is true at the instants where the cosine reaches +1 or -1?",
              "options": [
                "A. The waveform crosses zero",
                "B. The waveform touches one of the dashed envelopes",
                "C. The period changes suddenly",
                "D. The exponential becomes constant"
              ],
              "correct_option": "B",
              "explanation": "When cos(6t - 60°) = +1, the signal equals 4e^{-2t} × 1 = +4e^{-2t}, which is exactly the upper envelope. When the cosine equals -1, the signal equals -4e^{-2t}, which is the lower envelope. So the waveform touches one of the dashed curves at those instants.",
              "wrong_option_explanations": {
                "A": "Zero crossings occur when the cosine equals zero, not when it equals ±1.",
                "C": "The period is fixed by ω₀ = 6 and never changes during the signal.",
                "D": "The exponential e^{-2t} continues to decrease with time; it never becomes constant (except in the limit as t → ∞)."
              },
              "hint": "Substitute cos = +1 and cos = -1 directly into the expression x(t) = 4e^{-2t} cos(6t - 60°) and