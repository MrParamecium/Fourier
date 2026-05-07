```json
{
  "section_id": "B.5-3 Repeated Factors of Q(x)",
  "section_title": "B.5-3 Repeated Factors of Q(x)",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.5-3 Repeated Factors of Q(x)\n\n> **Objective:** Write the correct partial-fraction template for repeated linear factors and extract every coefficient efficiently using cover-up and derivatives.\n\n---\n\nWhen the denominator has a repeated factor such as (x+1)^3, the exam usually asks you to write the full partial-fraction template and then extract coefficients fast.\n\n**What to memorize:** A repeated factor (x - λ)^r produces a descending stack of r terms:\n\na₀/(x-λ)^r + a₁/(x-λ)^(r-1) + ... + a_(r-1)/(x-λ)\n\nUnrepeated linear factors still use ordinary Heaviside cover-up — no derivatives needed.\n\n### COMMON TRAP\n\nStudents most often lose marks by forgetting one of the intermediate repeated-power terms (e.g., writing only the highest and lowest power), or by differentiating the original F(x) instead of the concealed expression. Both errors are silent — the algebra still runs, but the answer is wrong."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "exam_pattern_anchor",
      "mode_specific_visual_use": {
        "cram": "Use this as a pattern-recognition card: repeated factor means a descending stack of denominator powers.",
        "standard": "Use this diagram to connect denominator structure to the correct expansion template.",
        "top_score": "Use this to compare repeated and unrepeated factors and expose missing-term mistakes."
      },
      "script": "import matplotlib.pyplot as plt\nimport matplotlib.patches as mpatches\nfrom matplotlib.patches import FancyArrowPatch\n\nfig, ax = plt.subplots(figsize=(11, 6))\nax.set_xlim(0, 11)\nax.set_ylim(0, 6)\nax.axis('off')\nfig.patch.set_facecolor('white')\n\n# Title\nax.text(5.5, 5.7, 'Partial-Fraction Template: Repeated vs. Unrepeated Factors',\n        ha='center', va='center', fontsize=13, fontweight='bold', color='#1a1a1a')\n\n# Left side: denominator label\nax.text(0.3, 4.8, 'Denominator:', ha='left', va='center', fontsize=11, color='#333333')\nax.text(0.3, 4.2,\n        r'$(x-\\lambda)^3 \\cdot (x-\\alpha)(x-\\beta)$',\n        ha='left', va='center', fontsize=13, color='#1a1a1a',\n        bbox=dict(boxstyle='round,pad=0.4', facecolor='#f0f0f0', edgecolor='#888888', linewidth=1.2))\n\n# Bracket labels\nax.text(1.05, 3.55, 'repeated factor (order 3)', ha='center', va='center',\n        fontsize=9, color='#1565C0', style='italic')\nax.text(3.6, 3.55, 'unrepeated factors', ha='center', va='center',\n        fontsize=9, color='#555555', style='italic')\n\n# Arrow from repeated factor to stacked terms\nax.annotate('', xy=(1.1, 2.85), xytext=(1.05, 3.4),\n            arrowprops=dict(arrowstyle='->', color='#1565C0', lw=1.8))\n\n# Arrow from unrepeated factors to single terms\nax.annotate('', xy=(6.5, 2.85), xytext=(3.6, 3.4),\n            arrowprops=dict(arrowstyle='->', color='#555555', lw=1.8))\n\n# Right side: expansion label\nax.text(0.3, 2.55, 'Expansion:', ha='left', va='center', fontsize=11, color='#333333')\n\n# Repeated-factor terms (blue highlighted box)\nrepeated_terms = [\n    (r'$\\dfrac{a_0}{(x-\\lambda)^3}$', 0.55, 1.85),\n    (r'$\\dfrac{a_1}{(x-\\lambda)^2}$', 2.05, 1.85),\n    (r'$\\dfrac{a_2}{(x-\\lambda)}$',   3.45, 1.85),\n]\nfor tex, x, y in repeated_terms:\n    ax.text(x, y, tex, ha='center', va='center', fontsize=12, color='#0D47A1',\n            bbox=dict(boxstyle='round,pad=0.35', facecolor='#DDEEFF', edgecolor='#1565C0', linewidth=1.5))\n\n# Plus signs between repeated terms\nax.text(1.32, 1.85, '+', ha='center', va='center', fontsize=14, color='#333333')\nax.text(2.77, 1.85, '+', ha='center', va='center', fontsize=14, color='#333333')\n\n# Plus sign between repeated and unrepeated\nax.text(4.35, 1.85, '+', ha='center', va='center', fontsize=14, color='#333333')\n\n# Unrepeated-factor terms (grey box)\nunrepeated_terms = [\n    (r'$\\dfrac{k_1}{(x-\\alpha)}$', 5.2, 1.85),\n    (r'$\\dfrac{k_2}{(x-\\beta)}$',  6.7, 1.85),\n]\nfor tex, x, y in unrepeated_terms:\n    ax.text(x, y, tex, ha='center', va='center', fontsize=12, color='#333333',\n            bbox=dict(boxstyle='round,pad=0.35', facecolor='#F5F5F5', edgecolor='#888888', linewidth=1.2))\n\nax.text(5.97, 1.85, '+', ha='center', va='center', fontsize=14, color='#333333')\n\n# Brace label under repeated terms\nax.annotate('', xy=(0.05, 1.2), xytext=(3.95, 1.2),\n            arrowprops=dict(arrowstyle='<->', color='#1565C0', lw=1.5))\nax.text(2.0, 0.95, '3 terms from repeated factor (order = 3)',\n        ha='center', va='center', fontsize=9.5, color='#1565C0', fontweight='bold')\n\n# Brace label under unrepeated terms\nax.annotate('', xy=(4.55, 1.2), xytext=(7.35, 1.2),\n            arrowprops=dict(arrowstyle='<->', color='#555555', lw=1.5))\nax.text(5.95, 0.95, '1 term each (unrepeated)',\n        ha='center', va='center', fontsize=9.5, color='#555555', fontweight='bold')\n\n# Rule box at bottom\nrule_box = mpatches.FancyBboxPatch((0.2, 0.08), 7.3, 0.62,\n                                    boxstyle='round,pad=0.1',\n                                    facecolor='#FFFDE7', edgecolor='#F9A825', linewidth=1.5)\nax.add_patch(rule_box)\nax.text(3.85, 0.39, 'Rule: A repeated factor of order r contributes exactly r terms with descending powers.',\n        ha='center', va='center', fontsize=9.5, color='#5D4037')\n\nplt.tight_layout()\nplt.savefig('generated/B.5-3-2.png', dpi=150, bbox_inches='tight')\n",
      "output_path": "generated/B.5-3-2.png",
      "caption": "Structure diagram: a repeated factor of order 3 generates three stacked terms with descending powers (blue), while each unrepeated factor contributes exactly one first-power term (grey)."
    },
    {
      "type": "math_block",
      "latex": "F(x)=\\frac{P(x)}{(x-\\lambda)^r(x-\\alpha_1)(x-\\alpha_2)\\cdots(x-\\alpha_j)}=\\frac{a_0}{(x-\\lambda)^r}+\\frac{a_1}{(x-\\lambda)^{r-1}}+\\cdots+\\frac{a_{r-1}}{(x-\\lambda)}+\\frac{k_1}{x-\\alpha_1}+\\cdots+\\frac{k_j}{x-\\alpha_j}",
      "explanation": "A repeated factor of order r creates exactly r partial-fraction terms with descending powers from r down to 1, while each unrepeated linear factor contributes only a single first-power term."
    },
    {
      "type": "text_explanation",
      "content": "## 1. How to Get the Coefficients Fast\n\nUse a split strategy: different rules apply to repeated vs. unrepeated factors.\n\n**Unrepeated factors** — use ordinary Heaviside cover-up at that root. No derivatives needed.\n\n**Repeated factor (x - λ)^r** — follow this checklist:\n\n1. **Conceal** the repeated factor: form the expression G(x) = (x - λ)^r F(x).\n2. **Evaluate** G(x) at x = λ to get **a₀**.\n3. **Differentiate** G(x) once and evaluate at x = λ to get **a₁**.\n4. **Differentiate** G(x) twice, divide by 2!, evaluate at x = λ to get **a₂**.\n5. In general, **aⱼ = (1/j!) · G^(j)(λ)** for j = 0, 1, ..., r-1.\n\n### COMMON TRAP\n\n**Trap 1:** Do not differentiate the original F(x). Always differentiate the concealed expression G(x) = (x-λ)^r F(x).\n\n**Trap 2:** Do not substitute x = λ before differentiating. Differentiate first, then substitute."
    },
    {
      "type": "math_block",
      "latex": "a_j=\\left.\\frac{1}{j!}\\frac{d^j}{dx^j}\\Big[(x-\\lambda)^rF(x)\\Big]\\right|_{x=\\lambda}",
      "explanation": "This formula says: first remove the repeated factor from the denominator by multiplying F(x) by (x-λ)^r to form a clean expression, then take the jth derivative of that expression, and finally substitute x = λ to read off the coefficient aⱼ."
    },
    {
      "type": "book_image",
      "source_page": "page-032",
      "fig_id": null,
      "teaching_role": "example_support",
      "mode_specific_visual_use": {
        "cram": "Use the worked example to show the exact coefficient-finding order students should copy in exams.",
        "standard": "Use the example to connect the repeated-factor template to actual numbers and derivatives.",
        "top_score": "Use the example to discuss why k comes from ordinary cover-up while a0, a1, and a2 come from the concealed repeated-factor expression."
      },
      "caption": "This textbook example shows the full exam pattern: write the stacked repeated-factor terms first, then use ordinary cover-up for the single factor and the conceal-then-differentiate rule for the repeated-factor coefficients."
    },
    {
      "type": "text_explanation",
      "content": "## 2. Worked Example Pattern to Copy on a Test\n\nGiven:\n\n$$F(x) = \\frac{4x^3+16x^2+23x+13}{(x+1)^3(x+2)}$$\n\n**Step 1 — Write the full template first:**\n\n$$F(x) = \\frac{a_0}{(x+1)^3} + \\frac{a_1}{(x+1)^2} + \\frac{a_2}{(x+1)} + \\frac{k}{(x+2)}$$\n\n**Step 2 — Find coefficients in this order:**\n\n- **k** (cover-up at x = -2): cover (x+2), substitute x = -2 directly.\n- **a₀** (conceal (x+1)^3, substitute x = -1): evaluate G(-1) where G(x) = (x+1)^3 F(x).\n- **a₁** (first derivative of G(x) at x = -1): differentiate G(x) once, then set x = -1.\n- **a₂** (second derivative rule): compute (1/2!) G''(-1).\n\n### EXAM TIP\n\nAlways write the complete template before calculating any coefficient. A missing term in the template is the most common source of a wrong final answer — and it is easy to catch before you start the algebra."
    },
    {
      "type": "section_summary",
      "bullets": [
        "A repeated factor (x-λ)^r requires r stacked terms with descending powers in the template.",
        "Find repeated-factor coefficients by concealing the factor first, then differentiating and dividing by j!.",
        "Never differentiate the original F(x) and never substitute x=λ before differentiating."
      ],
      "transition": "In the next section we will see a faster alternative when repeated differentiation becomes tedious."
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
          "id": "template_from_repeated_factor",
          "label": "Write the correct partial-fraction template for a repeated linear factor",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Which is the correct partial-fraction form for F(x) = P(x) / [(x-1)^2 (x+3)]?",
              "options": [
                "A. A/(x-1)^2 + B/(x+3)",
                "B. A/(x-1)^2 + B/(x-1) + C/(x+3)",
                "C. A/(x-1) + B/(x+3)",
                "D. A/(x-1)^2 + B/(x+3)^2 + C/(x+3)"
              ],
              "correct_option": "B",
              "explanation": "A repeated factor of order 2 requires two terms with descending powers: one over (x-1)^2 and one over (x-1). The single factor (x+3) contributes one first-power term.",
              "wrong_option_explanations": {
                "A": "It is missing the B/(x-1) term required by the repeated factor.",
                "C": "It omits the highest-power repeated-factor term.",
                "D": "The factor (x+3) is not repeated, so squaring it in the template is wrong."
              },
              "hint": "Repeated power 2 means two terms for that same root.",
              "needs_visual": true,
              "visual_type": "template_structure_diagram",
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "If the denominator contains (x+2)^3 (x-4), how many terms in the partial-fraction expansion come from the repeated factor (x+2)^3?",
              "options": [
                "A. 1",
                "B. 2",
                "C. 3",
                "D. 4"
              ],
              "correct_option": "C",
              "explanation": "A repeated factor of order 3 produces three terms: over (x+2)^3, (x+2)^2, and (x+2).",
              "wrong_option_explanations": {
                "A": "That would be true only for an unrepeated factor.",
                "B": "Order 3 requires three descending-power terms, not two.",
                "D": "There is no extra constant term added just because the factor has order 3."
              },
              "hint": "Match the number of terms to the exponent on the repeated factor.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "coefficient_rules_repeated_factor",
          "label": "Find coefficients for repeated factors using conceal-then-differentiate",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "For a repeated factor (x-λ)^r, which expression should you differentiate to find a₁, a₂, and higher coefficients?",
              "options": [
                "A. F(x) itself",
                "B. (x-λ)^r F(x)",
                "C. Only the numerator P(x)",
                "D. The full partial-fraction expansion after substituting x=λ first"
              ],
              "correct_option": "B",
              "explanation": "You first conceal the repeated factor by multiplying F(x) by (x-λ)^r. The derivatives are taken on that concealed expression, then evaluated at x=λ.",
              "wrong_option_explanations": {
                "A": "Differentiating the original F(x) is not the stated coefficient rule here.",
                "C": "The concealed expression is not generally just the numerator alone.",
                "D": "You must differentiate before substitution, not after."
              },
              "hint": "The repeated factor must be removed from the denominator first.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "Which formula correctly gives the coefficient a₂ for the repeated factor (x-λ)^r?",
              "options": [
                "A. a₂ = [d²/dx² F(x)] evaluated at x=λ",
                "B. a₂ = [d²/dx² ((x-λ)^r F(x))] evaluated at x=λ",
                "C. a₂ = (1/2!) [d²/dx² ((x-λ)^r F(x))] evaluated at x=λ",
                "D. a₂ = (1/2!) [(x-λ)^r F(x)] evaluated at x=λ"
              ],
              "correct_option": "C",
              "explanation": "The general rule is aⱼ = (1/j!) · d^j/dx^j [(x-λ)^r F(x)] evaluated at x=λ, so for j=2 the factor 1/2! is required.",
              "wrong_option_explanations": {
                "A": "It differentiates the wrong expression and misses the conceal step.",
                "B": "It correctly differentiates the concealed expression but misses the required division by 2!.",
                "D": "No differentiation is taken, so this cannot produce a₂."
              },
              "hint": "Use the general aⱼ formula with j=2.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "mixed_repeated_and_single_factors",
          "label": "Separate ordinary cover-up from repeated-factor derivatives",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "In the example F(x) = (4x³+16x²+23x+13) / [(x+1)³(x+2)], which coefficient is found by ordinary Heaviside cover-up directly at x = -2?",
              "options": [
                "A. a₀",
                "B. a₁",
                "C. a₂",
                "D. k"
              ],
              "correct_option": "D",
              "explanation": "The factor (x+2) is unrepeated, so its coefficient k is found by the ordinary cover-up method: cover (x+2) in the denominator and substitute x = -2.",
              "wrong_option_explanations": {
                "A": "a₀ belongs to the repeated factor (x+1)^3 and requires the conceal-then-evaluate step.",
                "B": "a₁ is obtained from a first derivative after concealing the repeated factor.",
                "C": "a₂ is obtained from the second-derivative rule for the repeated factor."
              },
              "hint": "Single factor means ordinary cover-up.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp3_q2",
              "type": "short_answer",
              "stem": "A student writes F(x) = A/(x+1)^3 + B/(x+1) + C/(x+2) for the denominator (x+1)^3(x+2). What term is missing, and why does it have to be included?",
              "ideal_answer": "The missing term is a coefficient over (x+1)^2. A repeated factor of order 3 must generate all descending powers: (x+1)^3, (x+1)^2, and (x+1). Omitting the middle term produces an incomplete expansion that cannot represent the general rational function with that denominator.",
              "grading_rubric": [
                "Must identify the missing term as something over (x+1)^2",
                "Must state that order 3 requires three descending-power terms",
                "Must connect the missing term to the repeated-factor template rule"
              ],
              "explanation": "This checks whether the student can spot the most common setup error before doing any algebra.",
              "hint": "Count the exponent on the repeated factor, then count the needed terms.",
              "needs_visual": false,
              "same_point_variant