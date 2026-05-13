```json
{
  "section_id": "B.5-5 Improper F(x) with m=n",
  "section_title": "B.5-5 Improper F(x) with m=n",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.5-5 Improper Rational Functions: The Same-Degree Case (m = n)\n\n> **Objective:** Recognize when numerator and denominator have equal degree, apply the one-step shortcut to write the constant term immediately, then solve all remaining coefficients exactly as in the proper case.\n\n---\n\nIf the numerator and denominator have the same degree, do not panic and do not start long division first.\n\nThis is the one special improper case where a shortcut saves real exam time. The only structural difference from a proper partial-fraction problem is a single extra constant term out front. Once you write that constant, everything else — factoring the denominator, applying cover-up, solving each coefficient — proceeds identically to the proper case.\n\n### WHAT TO MEMORIZE\n\nWhen m = n, the decomposition gains exactly one new feature: the constant **b_n** placed before the fractional terms. That constant equals the leading coefficient of the numerator. After writing it, treat the rest as an ordinary proper partial-fraction problem.\n\nFor standard exam questions with linear factors, this shortcut eliminates the need for full polynomial long division entirely."
    },
    {
      "type": "book_image",
      "source_page": "page-034",
      "fig_id": null,
      "teaching_role": "exam_pattern_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the textbook example to show the exact layout students should copy under time pressure.",
        "standard": "Use the figure to connect the general rule to the worked example structure.",
        "top_score": "Use the figure to point out that the shortcut still depends on factor type after the constant is separated."
      },
      "caption": "When the numerator and denominator share the same degree, write the leading coefficient as a constant term first, then proceed with ordinary partial fractions for the remainder."
    },
    {
      "type": "math_block",
      "latex": "F(x)=\\frac{b_nx^n+b_{n-1}x^{n-1}+\\cdots+b_1x+b_0}{x^n+a_{n-1}x^{n-1}+\\cdots+a_1x+a_0}=b_n+\\frac{k_1}{x-\\lambda_1}+\\frac{k_2}{x-\\lambda_2}+\\cdots+\\frac{k_n}{x-\\lambda_n}",
      "explanation": "When the degrees match (m = n), the decomposition is identical to the proper case except for the single extra constant b_n — the leading numerator coefficient — placed in front of all the fractional terms."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "comparison_anchor",
      "mode_specific_visual_use": {
        "cram": "Use this as a fast recognition card: same degree -> constant first -> cover-up next.",
        "standard": "Use this to compare proper-form thinking with the m=n special case.",
        "top_score": "Use this to emphasize that only the extra constant changes; factor handling rules still matter."
      },
      "script": "import matplotlib.pyplot as plt\nimport matplotlib.patches as mpatches\nfrom matplotlib.patches import FancyArrowPatch\n\nfig, axes = plt.subplots(1, 2, figsize=(12, 6))\nfig.patch.set_facecolor('white')\n\n# ── Left panel: Proper case ──────────────────────────────────────────────────\nax_l = axes[0]\nax_l.set_facecolor('white')\nax_l.set_xlim(0, 10)\nax_l.set_ylim(0, 10)\nax_l.axis('off')\n\nax_l.text(5, 9.3, 'Proper Case', fontsize=15, fontweight='bold',\n          ha='center', va='center', color='black')\nax_l.text(5, 8.5, 'deg(numerator) < deg(denominator)', fontsize=9,\n          ha='center', va='center', color='#555555', style='italic')\n\n# Box\nrect_l = mpatches.FancyBboxPatch((0.5, 1.5), 9, 6.2,\n    boxstyle='round,pad=0.15', linewidth=1.5,\n    edgecolor='#2255AA', facecolor='#EEF3FF')\nax_l.add_patch(rect_l)\n\nax_l.text(5, 7.2, r'$F(x) = \\dfrac{k_1}{x-\\lambda_1} + \\dfrac{k_2}{x-\\lambda_2} + \\cdots + \\dfrac{k_n}{x-\\lambda_n}$',\n          fontsize=11, ha='center', va='center', color='#1a1a8c')\n\nax_l.plot([1.2, 8.8], [6.3, 6.3], color='#AAAAAA', linewidth=0.8, linestyle='--')\n\nax_l.text(5, 5.7, 'Step 1: Factor denominator', fontsize=10, ha='center', va='center', color='black')\nax_l.text(5, 4.9, 'Step 2: Cover-up for each root', fontsize=10, ha='center', va='center', color='black')\nax_l.text(5, 4.1, r'$k_r = \\left.(x-\\lambda_r)\\,F(x)\\right|_{x=\\lambda_r}$',\n          fontsize=10, ha='center', va='center', color='#1a1a8c')\nax_l.text(5, 3.1, 'Step 3: Write final expansion', fontsize=10, ha='center', va='center', color='black')\n\nax_l.text(5, 2.1, 'No extra constant needed', fontsize=9,\n          ha='center', va='center', color='#888888', style='italic')\n\n# ── Right panel: Improper m=n ────────────────────────────────────────────────\nax_r = axes[1]\nax_r.set_facecolor('white')\nax_r.set_xlim(0, 10)\nax_r.set_ylim(0, 10)\nax_r.axis('off')\n\nax_r.text(5, 9.3, 'Improper Case: m = n', fontsize=15, fontweight='bold',\n          ha='center', va='center', color='black')\nax_r.text(5, 8.5, 'deg(numerator) = deg(denominator)', fontsize=9,\n          ha='center', va='center', color='#555555', style='italic')\n\nrect_r = mpatches.FancyBboxPatch((0.5, 1.5), 9, 6.2,\n    boxstyle='round,pad=0.15', linewidth=1.5,\n    edgecolor='#AA5500', facecolor='#FFF5EE')\nax_r.add_patch(rect_r)\n\n# Highlight the extra constant\nconstant_box = mpatches.FancyBboxPatch((1.0, 6.65), 1.9, 0.95,\n    boxstyle='round,pad=0.1', linewidth=1.8,\n    edgecolor='#CC3300', facecolor='#FFE0D0')\nax_r.add_patch(constant_box)\nax_r.text(1.95, 7.15, r'$b_n$', fontsize=13, ha='center', va='center',\n          color='#CC3300', fontweight='bold')\nax_r.text(3.1, 7.15, r'$+ \\dfrac{k_1}{x-\\lambda_1} + \\dfrac{k_2}{x-\\lambda_2} + \\cdots$',\n          fontsize=11, ha='left', va='center', color='#1a1a8c')\nax_r.text(5, 6.3, r'$F(x) =$', fontsize=11, ha='center', va='center', color='black')\n\nax_r.annotate('Extra constant\\n= leading coefficient',\n              xy=(1.95, 6.65), xytext=(1.95, 5.55),\n              fontsize=8.5, ha='center', color='#CC3300',\n              arrowprops=dict(arrowstyle='->', color='#CC3300', lw=1.4))\n\nax_r.plot([1.2, 8.8], [5.0, 5.0], color='#AAAAAA', linewidth=0.8, linestyle='--')\n\nax_r.text(5, 4.4, 'Step 1: Write front constant  b\\u2099', fontsize=10,\n          ha='center', va='center', color='#CC3300', fontweight='bold')\nax_r.text(5, 3.65, 'Step 2: Factor denominator', fontsize=10, ha='center', va='center', color='black')\nax_r.text(5, 2.95, 'Step 3: Cover-up (same as proper case)', fontsize=10,\n          ha='center', va='center', color='black')\nax_r.text(5, 2.25, r'$k_r = \\left.(x-\\lambda_r)\\,F(x)\\right|_{x=\\lambda_r}$',\n          fontsize=10, ha='center', va='center', color='#1a1a8c')\n\n# ── Central arrow between panels ────────────────────────────────────────────\nfig.text(0.5, 0.08,\n         'Same coefficient-solving method for each  $k_r$  in both cases',\n         fontsize=10, ha='center', va='center', color='#1a1a8c', fontweight='bold',\n         bbox=dict(boxstyle='round,pad=0.4', facecolor='#DDEEFF', edgecolor='#2255AA', linewidth=1.2))\n\nfig.text(0.5, 0.02,\n         r'For linear factors:  $k_r = (x-\\lambda_r)\\,F(x)\\big|_{x=\\lambda_r}$',\n         fontsize=9, ha='center', va='center', color='#444444', style='italic')\n\nplt.tight_layout(rect=[0, 0.12, 1, 1])\nplt.savefig('generated/B.5-5-4.png', dpi=150, bbox_inches='tight')\n",
      "output_path": "generated/B.5-5-4.png",
      "caption": "Left: proper case — only fractional terms. Right: improper m=n case — one extra constant b_n appears in front, but the cover-up method for every k_r is identical in both cases."
    },
    {
      "type": "text_explanation",
      "content": "## 1. Fast Rule for m = n\n\nHere is the shortest exam-ready workflow for the same-degree case:\n\n1. **Confirm** that the numerator degree equals the denominator degree.\n2. **Write the front constant** immediately: it is the leading coefficient of the numerator, b_n.\n3. **Factor the denominator** into its linear (or other) factors.\n4. **Solve the remaining coefficients** k_1, k_2, ... exactly as you would in any proper partial-fraction problem — cover-up, substitution, or system of equations.\n\n### COMMON TRAP\n\nStudents often see the word \"improper\" and immediately reach for full polynomial long division. For the general improper case (m > n) that is necessary — but when m = n specifically, the textbook shortcut gives the result in one line: the quotient is simply the constant b_n, with no polynomial remainder to carry forward. Starting long division here wastes time and introduces sign errors.\n\n> **Memory line:** Same degree → constant first; everything else stays the same."
    },
    {
      "type": "math_block",
      "latex": "k_r=\\left.(x-\\lambda_r)F(x)\\right|_{x=\\lambda_r}",
      "explanation": "After pulling out the front constant b_n, each remaining coefficient k_r for a simple linear factor is computed by the standard cover-up rule — multiply F(x) by (x − λ_r) and evaluate at x = λ_r — exactly as in the proper case."
    },
    {
      "type": "text_explanation",
      "content": "## 2. Example B.11 Done the Fast Way\n\nConsider the textbook example:\n\n$$F(x) = \\frac{3x^2 + 9x - 20}{x^2 + x - 6} = \\frac{3x^2 + 9x - 20}{(x-2)(x+3)}$$\n\nThe numerator and denominator are both degree 2, so m = n. The leading coefficient of the numerator is **3**, which becomes the front constant immediately.\n\n**Setup:**\n\n$$F(x) = 3 + \\frac{k_1}{x-2} + \\frac{k_2}{x+3}$$\n\n**Find k_1** — cover up (x − 2) and substitute x = 2:\n\n$$k_1 = \\frac{3(4) + 9(2) - 20}{2 + 3} = \\frac{12 + 18 - 20}{5} = \\frac{10}{5} = 2$$\n\n**Find k_2** — cover up (x + 3) and substitute x = −3:\n\n$$k_2 = \\frac{3(9) + 9(-3) - 20}{-3 - 2} = \\frac{27 - 27 - 20}{-5} = \\frac{-20}{-5} = 4$$\n\n**Final answer:**\n\n$$F(x) = 3 + \\frac{2}{x-2} + \\frac{4}{x+3}$$\n\nThe front constant 3 is b_2, the leading coefficient of the numerator. Once it is written down, the two cover-up substitutions are identical to what you would do in any proper partial-fraction problem."
    },
    {
      "type": "book_image",
      "source_page": "page-035",
      "fig_id": null,
      "teaching_role": "example_support",
      "mode_specific_visual_use": {
        "cram": "Use this worked example as a copyable template for solving similar exam questions quickly.",
        "standard": "Use the image to reinforce each substitution step for k1 and k2.",
        "top_score": "Use the image to stress precise coefficient extraction and sign handling at x=-3."
      },
      "caption": "Once the constant 3 is separated, k_1 and k_2 are found by ordinary substitution at the roots x = 2 and x = −3, with no long division required."
    },
    {
      "type": "section_summary",
      "bullets": [
        "When numerator and denominator degrees are equal (m = n), write the leading coefficient as a constant term first.",
        "After placing the front constant b_n, solve all remaining coefficients using the standard cover-up method.",
        "Do not start full long division for m = n — the shortcut gives the result immediately and saves exam time."
      ],
      "transition": "In the next section we will see a modified partial-fraction form used for inverse z-transform work."
    },
    {
      "type": "quiz_plan",
      "target_questions": 5,
      "question_range": {
        "min": 4,
        "max": 6
      },
      "knowledge_points": [
        {
          "id": "recognize_m_equals_n_pattern",
          "label": "Recognize the special case m=n",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Which situation matches the shortcut from this section?",
              "options": [
                "A. The numerator degree is lower than the denominator degree",
                "B. The numerator degree is one higher than the denominator degree",
                "C. The numerator and denominator have the same degree",
                "D. The denominator is unfactored"
              ],
              "correct_option": "C",
              "explanation": "This section handles the special improper case where the numerator and denominator degrees are equal.",
              "wrong_option_explanations": {
                "A": "That is already a proper fraction, not the special improper case here.",
                "B": "That is improper, but not the same-degree shortcut discussed here.",
                "D": "Factoring may be a later step, but it is not the defining condition."
              },
              "hint": "Focus on the relationship between the two polynomial degrees.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "For an improper rational function with m=n, what is the main structural difference from the proper-case partial-fraction form?",
              "options": [
                "A. Every denominator power increases by 1",
                "B. An extra constant term appears in front",
                "C. Cover-up can no longer be used",
                "D. The denominator should not be factored"
              ],
              "correct_option": "B",
              "explanation": "When m=n, the decomposition is the same as the proper case except for one extra constant term b_n.",
              "wrong_option_explanations": {
                "A": "The denominator powers do not change because of m=n.",
                "C": "For simple linear factors, the coefficients are still found in the usual way.",
                "D": "Factoring the denominator is still part of the normal process."
              },
              "hint": "Ask what new piece appears before the fractional terms.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "fast_setup_and_constant",
          "label": "Write the fast setup and identify the front constant",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "Suppose F(x) = (5x² − x + 1) / ((x−1)(x+4)). Which setup is correct for this section's shortcut?",
              "options": [
                "A. F(x) = A/(x−1) + B/(x+4)",
                "B. F(x) = 5 + A/(x−1) + B/(x+4)",
                "C. F(x) = 1 + A/(x−1) + B/(x+4)",
                "D. F(x) = x + A/(x−1) + B/(x+4)"
              ],
              "correct_option": "B",
              "explanation": "The degrees match, so place the leading coefficient 5 in front, then add the simple fractions.",
              "wrong_option_explanations": {
                "A": "It forgets the extra constant required when m=n.",
                "C": "The front constant should be the leading coefficient of the numerator, not the constant term.",
                "D": "The front term is a constant here, not x."
              },
              "hint": "Read the coefficient of the highest-power numerator term.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "compute_coefficients_after_constant",
          "label": "Compute coefficients after separating the constant",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "In Example B.11, after writing F(x) = 3 + k₁/(x−2) + k₂/(x+3), what is k₁?",
              "options": [
                "A. −2",
                "B. 2",
                "C. 3",
                "D. 4"
              ],
              "correct_option": "B",
              "explanation": "Using the cover-up rule at x = 2 gives k₁ = (3x² + 9x − 20)/(x+3) evaluated at x=2 = (12 + 18 − 20)/5 = 10/5 = 2.",
              "wrong_option_explanations": {
                "A": "This sign is incorrect; the substitution result is positive.",
                "C": "3 is the front constant, not k₁.",
                "D": "4 is k₂, not k₁."
              },
              "hint": "Substitute x = 2 after removing the factor (x − 2).",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp3_q2",
              "type": "multiple_choice",
              "stem": "In the same example, what is the final expansion?",
              "options": [
                "A. 3 + 2/(x−2) + 4/(x+3)",
                "B. 3 + 4/(x−2) + 2/(x+3)",
                "C. 2/(x−2) + 4/(x+3)",
                "D. 3 − 2/(x−2) + 4/(x+3)"
              ],
              "correct_option": "A",
              "explanation": "The correct result is the front constant 3 plus coefficients 2 and 4 on the matching factors.",
              "wrong_option_explanations": {
                "B": "The two coefficients are attached to the wrong factors.",
                "C": "It omits the required front constant for m=n.",
                "D": "The sign of the first fractional term is wrong."
              },
              "hint": "Check both the front constant and which root gives which coefficient.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "common_exam_trap",
          "label": "Avoid the main trap",
          "importance": "medium",
          "exam