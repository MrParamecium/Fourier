```json
{
  "section_id": "B.5-5 Improper F(x) with m=n",
  "section_title": "B.5-5 Improper F(x) with m=n",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.5-5 Improper Rational Functions — The Special Case m = n\n\n> **Section Objective:** Recognize when numerator and denominator degrees are equal, apply the one-constant shortcut, and compute all coefficients using the same cover-up method as the proper case.\n\n---\n\nConsider \\(F(x) = \\dfrac{3x^2 + 9x - 20}{x^2 + x - 6}\\). Both numerator and denominator have degree 2, so this is an **improper** rational function — but a very special one. When the degrees are equal, you do not need full long division. The exam pattern is immediate: **the quotient is a single constant**, equal to the ratio of leading coefficients. Here that constant is \\(3/1 = 3\\). Write \\(F(x) = 3 + (\\text{proper remainder})\\), then decompose the remainder exactly like any proper fraction using the usual cover-up idea. One extra constant, zero extra complexity."
    },
    {
      "type": "book_image",
      "source_page": "page-034",
      "fig_id": null,
      "teaching_role": "exam_pattern_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the printed setup to memorize the exact pattern form for equal-degree cases.",
        "standard": "Use the textbook example to connect the rule to a real worked decomposition.",
        "top_score": "Use it to emphasize the high-yield distinction: one extra constant appears, but the residue steps stay unchanged."
      },
      "caption": "When numerator and denominator share the same degree, the decomposition begins with a single constant term followed by the usual simple partial fractions."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "comparison_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the comparison to recognize instantly that m=n gives a constant plus ordinary partial fractions.",
        "standard": "Use the diagram to show how the improper case collapses into the proper-method workflow after separating the constant.",
        "top_score": "Use the side-by-side comparison to prevent overgeneralizing this shortcut to cases where the numerator degree is larger than the denominator degree."
      },
      "script": "import matplotlib.pyplot as plt\nimport matplotlib.patches as mpatches\n\nfig, axes = plt.subplots(1, 2, figsize=(12, 5))\nfig.patch.set_facecolor('white')\n\n# ── Left panel: Proper case m < n ──────────────────────────────────────────\nax = axes[0]\nax.set_facecolor('white')\nax.set_xlim(0, 10)\nax.set_ylim(0, 10)\nax.axis('off')\n\nax.text(5, 9.2, 'Proper case:  m < n', fontsize=14, fontweight='bold',\n        ha='center', va='center', color='black')\n\nbox_left = mpatches.FancyBboxPatch((0.5, 1.5), 9, 6.5,\n    boxstyle='round,pad=0.2', linewidth=2,\n    edgecolor='#2c7bb6', facecolor='#eaf4fb')\nax.add_patch(box_left)\n\nax.text(5, 7.8, r'$F(x) = \\dfrac{k_1}{x - \\lambda_1} + \\dfrac{k_2}{x - \\lambda_2} + \\cdots + \\dfrac{k_n}{x - \\lambda_n}$',\n        fontsize=12, ha='center', va='center', color='#1a1a2e')\n\nax.text(5, 5.5, 'No constant term.', fontsize=11, ha='center', va='center',\n        color='#2c7bb6', style='italic')\n\nax.text(5, 4.0, 'Each coefficient found by\\ncover-up at each root.',\n        fontsize=10, ha='center', va='center', color='#444444')\n\nax.text(5, 2.4,\n        r'$k_r = \\left.(x - \\lambda_r)\\,F(x)\\right|_{x=\\lambda_r}$',\n        fontsize=11, ha='center', va='center', color='#1a1a2e')\n\n# ── Right panel: Special improper case m = n ───────────────────────────────\nax2 = axes[1]\nax2.set_facecolor('white')\nax2.set_xlim(0, 10)\nax2.set_ylim(0, 10)\nax2.axis('off')\n\nax2.text(5, 9.2, 'Special improper case:  m = n', fontsize=14, fontweight='bold',\n         ha='center', va='center', color='black')\n\nbox_right = mpatches.FancyBboxPatch((0.5, 1.5), 9, 6.5,\n    boxstyle='round,pad=0.2', linewidth=2,\n    edgecolor='#d7191c', facecolor='#fff0f0')\nax2.add_patch(box_right)\n\nax2.text(5, 7.8,\n    r'$F(x) = \\underbrace{b_n}_{\\text{constant}} + \\dfrac{k_1}{x - \\lambda_1} + \\dfrac{k_2}{x - \\lambda_2} + \\cdots$',\n    fontsize=12, ha='center', va='center', color='#1a1a2e')\n\nhighlight = mpatches.FancyBboxPatch((1.5, 5.0), 7, 1.5,\n    boxstyle='round,pad=0.15', linewidth=1.5,\n    edgecolor='#d7191c', facecolor='#ffe5e5')\nax2.add_patch(highlight)\nax2.text(5, 5.75, 'Only ONE extra constant term.',\n         fontsize=11, ha='center', va='center',\n         color='#d7191c', fontweight='bold')\n\nax2.text(5, 4.0,\n    r'$b_n = $ ratio of leading coefficients',\n    fontsize=10, ha='center', va='center', color='#444444')\n\nax2.text(5, 2.8,\n    'Then cover-up works exactly as before.',\n    fontsize=10, ha='center', va='center', color='#444444', style='italic')\n\nax2.text(5, 2.0,\n    r'$k_r = \\left.(x - \\lambda_r)\\,F(x)\\right|_{x=\\lambda_r}$',\n    fontsize=11, ha='center', va='center', color='#1a1a2e')\n\nplt.tight_layout(pad=2.0)\nplt.savefig('generated/B.5-5 Improper F(x) with m=n-2.png', dpi=150, bbox_inches='tight')\n",
      "output_path": "generated/B.5-5 Improper F(x) with m=n-2.png",
      "caption": "Left: the proper case (m < n) has no constant term. Right: the special improper case (m = n) adds exactly one constant \\(b_n\\) — the ratio of leading coefficients — then proceeds identically."
    },
    {
      "type": "math_block",
      "latex": "F(x)=\\frac{b_nx^n+b_{n-1}x^{n-1}+\\cdots+b_1x+b_0}{x^n+a_{n-1}x^{n-1}+\\cdots+a_1x+a_0}=b_n+\\frac{k_1}{x-\\lambda_1}+\\frac{k_2}{x-\\lambda_2}+\\cdots+\\frac{k_n}{x-\\lambda_n}",
      "explanation": "When the numerator and denominator have equal degree, the only structural difference from the proper case is the single extra constant \\(b_n\\) out front; every partial fraction term that follows has exactly the same form as in the proper case."
    },
    {
      "type": "math_block",
      "latex": "k_r=\\left.(x-\\lambda_r)F(x)\\right|_{x=\\lambda_r}",
      "explanation": "The cover-up formula for each simple linear factor applies directly to \\(F(x)\\) itself — you do not need to subtract the constant \\(b_n\\) first; plugging \\(x = \\lambda_r\\) into \\((x - \\lambda_r)F(x)\\) automatically isolates \\(k_r\\) regardless of the constant term."
    },
    {
      "type": "text_explanation",
      "content": "## 1. How to Solve the m = n Case Fast\n\nWork through \\(F(x) = \\dfrac{3x^2 + 9x - 20}{(x-2)(x+3)}\\) step by step.\n\n**Step 1 — Read off the constant.** The leading coefficient of the numerator is \\(3\\); the leading coefficient of the denominator is \\(1\\). The constant is \\(3/1 = 3\\).\n\n**Step 2 — Write the template.**\n$$F(x) = 3 + \\frac{k_1}{x-2} + \\frac{k_2}{x+3}$$\n\n**Step 3 — Cover-up at \\(x = 2\\).**\n$$k_1 = (x-2)F(x)\\big|_{x=2} = \\frac{3(4)+9(2)-20}{(2+3)} = \\frac{12+18-20}{5} = \\frac{10}{5} = 2$$\n\n**Step 4 — Cover-up at \\(x = -3\\).**\n$$k_2 = (x+3)F(x)\\big|_{x=-3} = \\frac{3(9)+9(-3)-20}{(-3-2)} = \\frac{27-27-20}{-5} = \\frac{-20}{-5} = 4$$\n\n**Step 5 — Final answer.**\n$$F(x) = 3 + \\frac{2}{x-2} + \\frac{4}{x+3}$$\n\n### HIGH-SCORE NOTE\n\nStrong students write the constant \\(b_n\\) immediately by inspection, saving the time that full long division would waste. The constant is always the ratio of leading coefficients.\n\n### EXAM TRAP\n\nThis one-constant shortcut is **specific to m = n**. If the numerator degree exceeds the denominator degree (\\(m > n\\)), the quotient is a polynomial of degree \\(m - n \\geq 1\\), and you must perform full polynomial long division before applying partial fractions."
    },
    {
      "type": "book_image",
      "source_page": "page-035",
      "fig_id": null,
      "teaching_role": "example_support",
      "mode_specific_visual_use": {
        "cram": "Use the worked arithmetic to rehearse the exact substitutions for k1 and k2.",
        "standard": "Use the figure to support the step-by-step example computation.",
        "top_score": "Use it to reinforce clean answer framing: constant first, then residues, then final combined expression."
      },
      "caption": "The coefficients \\(k_1\\) and \\(k_2\\) are computed by the ordinary cover-up substitutions at the roots \\(x = 2\\) and \\(x = -3\\), exactly as in the proper-fraction case."
    },
    {
      "type": "section_summary",
      "bullets": [
        "Equal degrees (m = n): decomposition starts with one constant equal to the ratio of leading coefficients.",
        "Cover-up still works unchanged — apply it directly to F(x) at each root after writing the constant.",
        "This shortcut is m = n only; higher numerator degree requires full polynomial long division first."
      ],
      "transition": "In the next section we will look at modified partial fractions used in later transform work."
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
          "id": "identify_m_equals_n_pattern",
          "label": "Recognize the special improper case m=n",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Which decomposition template is correct when a rational function has numerator and denominator of the same degree and distinct linear denominator factors?",
              "options": [
                "A. \\(F(x)=\\dfrac{k_1}{x-\\lambda_1}+\\dfrac{k_2}{x-\\lambda_2}+\\cdots\\)",
                "B. \\(F(x)=b_n+\\dfrac{k_1}{x-\\lambda_1}+\\dfrac{k_2}{x-\\lambda_2}+\\cdots\\)",
                "C. \\(F(x)=b_n x+\\dfrac{k_1}{x-\\lambda_1}+\\dfrac{k_2}{x-\\lambda_2}+\\cdots\\)",
                "D. \\(F(x)=\\dfrac{b_n}{x}+\\dfrac{k_1}{x-\\lambda_1}+\\dfrac{k_2}{x-\\lambda_2}+\\cdots\\)"
              ],
              "correct_option": "B",
              "explanation": "For m = n, the quotient of the division is a constant, so the decomposition has exactly one extra constant term \\(b_n\\) plus the usual partial fractions.",
              "wrong_option_explanations": {
                "A": "This misses the constant term entirely, so it matches the proper case (m < n), not the equal-degree improper case.",
                "C": "The extra term is a constant (degree 0), not a linear polynomial \\(b_n x\\), because the degree difference \\(m - n = 0\\).",
                "D": "There is no reason for an added \\(1/x\\) term unless \\(x\\) itself is one of the denominator factors."
              },
              "hint": "Equal degrees mean the quotient has degree \\(m - n = 0\\), i.e., a constant.",
              "needs_visual": true,
              "visual_type": "structure_comparison",
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "Why is the extra term in the m = n case a constant rather than something like \\(cx + d\\)?",
              "options": [
                "A. Because the denominator is monic",
                "B. Because repeated roots force a constant quotient",
                "C. Because the quotient degree is \\(m - n = 0\\)",
                "D. Because cover-up only works with constants"
              ],
              "correct_option": "C",
              "explanation": "When numerator and denominator have equal degree, polynomial division produces a quotient of degree \\(m - n = 0\\), which is by definition a constant.",
              "wrong_option_explanations": {
                "A": "A monic denominator makes the leading-coefficient ratio easy to read, but it is not the reason the quotient is constant.",
                "B": "Repeated roots affect how partial fraction terms are written, but they are unrelated to why the quotient is constant.",
                "D": "Cover-up is a method for finding residues; it does not determine the degree of the quotient."
              },
              "hint": "Apply the polynomial division degree rule: degree of quotient = degree of numerator minus degree of denominator.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "compute_constant_and_residues",
          "label": "Compute the constant term and the cover-up coefficients",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "For \\(F(x)=\\dfrac{3x^2+9x-20}{(x-2)(x+3)}\\), what is the correct partial fraction expansion?",
              "options": [
                "A. \\(3+\\dfrac{2}{x-2}+\\dfrac{4}{x+3}\\)",
                "B. \\(3+\\dfrac{4}{x-2}+\\dfrac{2}{x+3}\\)",
                "C. \\(\\dfrac{2}{x-2}+\\dfrac{4}{x+3}\\)",
                "D. \\(1+\\dfrac{2}{x-2}+\\dfrac{4}{x+3}\\)"
              ],
              "correct_option": "A",
              "explanation": "The constant is \\(3/1 = 3\\) from the leading coefficients. Cover-up at \\(x = 2\\) gives \\(k_1 = 10/5 = 2\\); cover-up at \\(x = -3\\) gives \\(k_2 = -20/(-5) = 4\\).",
              "wrong_option_explanations": {
                "B": "This swaps the residues: \\(k_1 = 2\\) belongs to \\(1/(x-2)\\) and \\(k_2 = 4\\) belongs to \\(1/(x+3)\\).",
                "C": "This omits the constant term \\(3\\), which is required whenever \\(m = n\\).",
                "D": "The constant is not \\(1\\); it must equal the ratio of leading coefficients, which is \\(3/1 = 3\\)."
              },
              "hint": "Read the constant first from the leading coefficients, then evaluate \\((x-2)F(x)\\) at \\(x=2\\) and \\((x+3)F(x)\\) at \\(x=-3\\).",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "For \\(F(x)=\\dfrac{5x^2+x-6}{(x-1)(x+2)}\\), write \\(F(x)=c+\\dfrac{A}{x-1}+\\dfrac{B}{x+2}\\). What is \\(c\\)?",
              "options": [
                "A. \\(5\\)",
                "B. \\(1\\)",
                "C. \\(-6\\)",
                "D. \\(0\\)"
              ],
              "correct_option": "A",
              "explanation": "The constant equals the ratio of leading coefficients: \\(5/1 = 5\\). Only the highest-degree terms of numerator and denominator determine this value.",
              "wrong_option_explanations": {
                "B": "\\(1\\) is not the leading-coefficient ratio; it appears as the coefficient of \\(x\\) in the numerator, not the leading term.",
                "C": "\\(-6\\) is the constant term of the numerator polynomial, not the quotient constant from the division.",
                "D": "Equal degrees do not make the quotient vanish; the quotient is \\(b_n / 1 = b_n\\), which is \\(5\\) here."
              },
              "hint": "Only the highest-degree terms matter: \\(5x^2 \\div x^2 = 5\\).",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "trap_scope_of_shortcut",
          "label": "Know when the shortcut applies and when it does not",
          "importance": "high",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "Which statement is the safest exam rule?",
              "options": [
                "A. Every improper fraction can be written as a constant plus partial fractions.",
                "B. If \\(m = n\\), use one constant plus the usual partial fractions; if \\(m > n\\), more division is needed.",
                "C. If the denominator factors nicely, long division is never needed.",
                "D. Cover-up fails whenever the function is improper."
              ],
              "correct_option": "B",
              "explanation": "The one-constant shortcut is specific to the equal-degree case. When the numerator degree exceeds the denominator degree (\\(m > n\\)), the quotient is a polynomial of degree \\(m - n \\geq 1\\), requiring full long division.",
              "wrong_option_explanations": {
                "A": "False when \\(m > n\\): the quotient is then a polynomial, not a constant, so the decomposition has more than one extra term.",
                "C": "Factoring the denominator is useful for setting up partial fractions, but it does not eliminate the need for division when the fraction is improper.",
                "D": "This section explicitly demonstrates that cover-up works correctly after the constant \\(b_n\\) is accounted for."
              },
              "hint": "Separate the special case \\(m = n\\) (constant quotient) from the general improper case \\(m > n\\) (polynomial quotient).",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp3_q2",
              "type": "short_answer",
              "stem": "A student says: 'Since this fraction is improper, I must always perform full polynomial long division before using partial fractions.' Give a precise correction in one or two sentences.",
              "ideal_answer": "Not always. In the special case where the numerator and denominator