```json
{
  "section_id": "B.5-3 Repeated Factors of Q(x)",
  "section_title": "B.5-3 Repeated Factors of Q(x)",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.5-3 Repeated Factors of Q(x)\n\n> **Section Objective:** Learn to write and solve partial-fraction expansions when the denominator contains a repeated linear factor.\n\n---\n\nWhen a denominator contains a factor like (x+1)^3, one fraction over (x+1) is not enough. The expansion must include a **stack** of three terms: one over (x+1)^3, one over (x+1)^2, and one over (x+1). Skipping any power is a structural error that makes the algebra fail.\n\nThis section teaches the complete method for repeated factors in Q(x). You will learn to recognize the repeated-factor pattern, write every required power, and find each coefficient using the right tool — cover-up for unrepeated factors, and a derivative formula for repeated-factor coefficients.\n\n### KEY STRATEGY\n\nRecognize the repeated factor → write every descending power → find coefficients in the correct order. Master this sequence and repeated-factor problems become routine on exams."
    },
    {
      "type": "book_image",
      "source_page": "page-031",
      "fig_id": null,
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the formula pattern so the student can instantly recognize what the expansion must look like.",
        "standard": "Use the textbook equation to show why a repeated factor creates several fraction terms, one for each power.",
        "top_score": "Use the textbook formula to stress exact matching between denominator powers and coefficient labels."
      },
      "caption": "This textbook formula gives the general expansion pattern when one denominator factor is repeated, showing that a factor of order r generates r distinct partial-fraction terms."
    },
    {
      "type": "math_block",
      "latex": "F(x)=\\frac{P(x)}{(x-\\lambda)^r(x-\\alpha_1)(x-\\alpha_2)\\cdots(x-\\alpha_j)}\\quad\\Rightarrow\\quad F(x)=\\frac{a_0}{(x-\\lambda)^r}+\\frac{a_1}{(x-\\lambda)^{r-1}}+\\cdots+\\frac{a_{r-1}}{x-\\lambda}+\\frac{k_1}{x-\\alpha_1}+\\cdots+\\frac{k_j}{x-\\alpha_j}",
      "explanation": "A repeated linear factor of order r produces exactly r separate partial-fraction terms (one for each descending power), while every unrepeated linear factor still contributes exactly one term."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "comparison_anchor",
      "mode_specific_visual_use": {
        "cram": "Use this as a pattern card: repeated factor means write all descending powers and match each coefficient method fast.",
        "standard": "Use this diagram to connect each denominator power to the corresponding coefficient formula.",
        "top_score": "Use this diagram to highlight the factorial and derivative order so students avoid indexing mistakes."
      },
      "script": "import matplotlib.pyplot as plt\nimport matplotlib.patches as mpatches\nfrom matplotlib.patches import FancyBboxPatch, FancyArrowPatch\n\nfig, ax = plt.subplots(figsize=(13, 7))\nax.set_xlim(0, 13)\nax.set_ylim(0, 7)\nax.axis('off')\nfig.patch.set_facecolor('white')\n\n# ── Left box: repeated factor ──────────────────────────────────────────────\nleft_box = FancyBboxPatch((0.3, 2.5), 2.4, 2.0,\n    boxstyle='round,pad=0.15', linewidth=1.5,\n    edgecolor='#2c5f8a', facecolor='#ddeeff')\nax.add_patch(left_box)\nax.text(1.5, 4.05, 'Denominator contains', ha='center', va='center',\n        fontsize=9, color='#333333')\nax.text(1.5, 3.5, r'$(x-\\lambda)^{r}$', ha='center', va='center',\n        fontsize=14, color='#2c5f8a', fontweight='bold')\nax.text(1.5, 2.95, '(repeated factor, order r)', ha='center', va='center',\n        fontsize=8, color='#555555', style='italic')\n\n# ── Arrow left → center ───────────────────────────────────────────────────\nax.annotate('', xy=(3.1, 3.5), xytext=(2.75, 3.5),\n    arrowprops=dict(arrowstyle='->', color='#444444', lw=1.8))\nax.text(2.92, 3.72, 'expands to', ha='center', va='bottom',\n        fontsize=8, color='#444444')\n\n# ── Center stack: terms ───────────────────────────────────────────────────\nstack_labels = [\n    r'$\\dfrac{a_0}{(x-\\lambda)^{r}}$',\n    r'$\\dfrac{a_1}{(x-\\lambda)^{r-1}}$',\n    r'$\\vdots$',\n    r'$\\dfrac{a_{r-1}}{x-\\lambda}$',\n]\nstack_y = [5.6, 4.5, 3.5, 2.4]\nstack_colors = ['#1a5276', '#1f618d', '#555555', '#2874a6']\n\nfor label, y, col in zip(stack_labels, stack_y, stack_colors):\n    term_box = FancyBboxPatch((3.15, y - 0.45), 2.5, 0.85,\n        boxstyle='round,pad=0.1', linewidth=1.2,\n        edgecolor='#aaaaaa', facecolor='#f4f8fb')\n    ax.add_patch(term_box)\n    ax.text(4.4, y, label, ha='center', va='center',\n            fontsize=12, color=col)\n\n# Brace / plus signs between stack items\nfor y_plus in [5.05, 4.0]:\n    ax.text(4.4, y_plus, '+', ha='center', va='center',\n            fontsize=14, color='#888888')\nax.text(4.4, 2.95, '+', ha='center', va='center',\n        fontsize=14, color='#888888')\n\n# ── Arrows center → right (coefficient formulas) ──────────────────────────\narrow_starts = [(5.65, 5.6), (5.65, 4.5), (5.65, 2.4)]\narrow_ends   = [(6.1,  5.6), (6.1,  4.5), (6.1,  2.4)]\nfor (xs, ys), (xe, ye) in zip(arrow_starts, arrow_ends):\n    ax.annotate('', xy=(xe, ye), xytext=(xs, ys),\n        arrowprops=dict(arrowstyle='->', color='#888888', lw=1.4))\n\n# ── Right side: coefficient formulas ─────────────────────────────────────\nformula_data = [\n    (5.6, 5.6, '#1a5276',\n     r'$a_0 = \\left[(x-\\lambda)^r F(x)\\right]_{x=\\lambda}$',\n     '(no derivative — direct evaluation)'),\n    (5.6, 4.5, '#1f618d',\n     r'$a_1 = \\left.\\dfrac{d}{dx}\\left[(x-\\lambda)^r F(x)\\right]\\right|_{x=\\lambda}$',\n     '(first derivative, then evaluate)'),\n    (5.6, 2.4, '#2874a6',\n     r'$a_j = \\dfrac{1}{j!}\\left.\\dfrac{d^j}{dx^j}\\left[(x-\\lambda)^r F(x)\\right]\\right|_{x=\\lambda}$',\n     '(j-th derivative divided by j!)'),\n]\n\nfor x0, y0, col, formula, note in formula_data:\n    ax.text(6.25, y0 + 0.18, formula, ha='left', va='center',\n            fontsize=10.5, color=col)\n    ax.text(6.25, y0 - 0.22, note, ha='left', va='center',\n            fontsize=8, color='#666666', style='italic')\n\n# ── Bottom note: unrepeated factors ──────────────────────────────────────\nbottom_box = FancyBboxPatch((0.3, 0.25), 12.3, 0.95,\n    boxstyle='round,pad=0.12', linewidth=1.2,\n    edgecolor='#888855', facecolor='#fffff0')\nax.add_patch(bottom_box)\nax.text(6.45, 0.72, 'Unrepeated linear factors  '\n        r'$(x - \\alpha_i)$'\n        '  →  use ordinary Heaviside cover-up at  '\n        r'$x = \\alpha_i$',\n        ha='center', va='center', fontsize=10, color='#555500')\n\n# ── Title ─────────────────────────────────────────────────────────────────\nax.text(6.5, 6.75, 'Repeated-Factor Partial Fraction: Term Stack and Coefficient Methods',\n        ha='center', va='center', fontsize=11, fontweight='bold', color='#222222')\n\nplt.tight_layout()\nplt.savefig('generated/B.5-3-4.png', dpi=150, bbox_inches='tight')\n",
      "output_path": "generated/B.5-3-4.png",
      "caption": "Each power of the repeated factor (x-lambda)^r maps to one partial-fraction term, and each coefficient is found by a specific derivative formula; unrepeated factors still use ordinary cover-up."
    },
    {
      "type": "text_explanation",
      "content": "## 1. How Repeated Factors Change the Expansion\n\nWhen a repeated linear factor appears in the denominator, the expansion structure changes in a precise way. Follow these three steps every time.\n\n**Step 1 — Write every power.**\nIf (x - λ)^r appears, include one fraction for each power from r down to 1:\n\n$$\\frac{a_0}{(x-\\lambda)^r} + \\frac{a_1}{(x-\\lambda)^{r-1}} + \\cdots + \\frac{a_{r-1}}{x-\\lambda}$$\n\nDo not skip any intermediate power. Missing a term makes the system unsolvable.\n\n**Step 2 — Handle unrepeated factors normally.**\nFor every simple factor (x - α_i), apply the standard Heaviside cover-up: multiply both sides by (x - α_i) and set x = α_i.\n\n**Step 3 — Find repeated-factor coefficients using derivatives.**\nFirst, conceal the repeated factor by multiplying F(x) by (x - λ)^r. Call the result G(x). Then:\n\n- a₀ = G(λ) — direct evaluation, no derivative\n- a₁ = G'(λ) — first derivative evaluated at λ\n- aⱼ = (1/j!) G^(j)(λ) — j-th derivative divided by j!\n\n### EXAM WARNING\n\nTwo mistakes appear constantly: (1) omitting an intermediate power such as 1/(x-λ)^2 when the factor is cubed, and (2) forgetting the 1/j! factorial when computing aⱼ for j ≥ 2. Check both before writing your final answer."
    },
    {
      "type": "book_image",
      "source_page": "page-032",
      "fig_id": null,
      "teaching_role": "example_support",
      "mode_specific_visual_use": {
        "cram": "Use the worked example to show the exact order of coefficient extraction in a realistic exam problem.",
        "standard": "Use this page as the representative example that turns the general rule into a concrete procedure.",
        "top_score": "Use this example to point out where students misassign coefficients or lose accuracy in derivatives."
      },
      "caption": "This worked example shows the full repeated-factor workflow: write the stacked terms, use cover-up for the simple factor, and use derivatives evaluated at the repeated root for the remaining coefficients."
    },
    {
      "type": "text_explanation",
      "content": "## 2. Representative Example: Denominator (x+1)^3(x+2)\n\nConsider Example B.10. The denominator (x+1)^3(x+2) contains one repeated factor of order 3 and one simple factor, so the expansion takes the form:\n\n$$F(x) = \\frac{a_0}{(x+1)^3} + \\frac{a_1}{(x+1)^2} + \\frac{a_2}{x+1} + \\frac{k}{x+2}$$\n\nFour terms total — three from the repeated factor, one from the simple factor.\n\n**Finding each coefficient in order:**\n\n- **k** (simple factor): cover-up at x = -2. Conceal (x+2), evaluate the rest at x = -2. Result: k = 1.\n- **a₀** (highest power): conceal (x+1)^3 by multiplying F(x) by (x+1)^3, then evaluate at x = -1. Result: a₀ = 2.\n- **a₁** (first derivative): differentiate (x+1)^3 F(x) once, then evaluate at x = -1. Result: a₁ = 1.\n- **a₂** (second derivative with 1/2!): take the second derivative of (x+1)^3 F(x), multiply by 1/2, evaluate at x = -1. Result: a₂ = 3.\n\n**Final answer:**\n\n$$F(x) = \\frac{2}{(x+1)^3} + \\frac{1}{(x+1)^2} + \\frac{3}{x+1} + \\frac{1}{x+2}$$\n\n### QUICK CHECK\n\nWhich coefficient came from the second derivative? **a₂** — because its subscript matches the derivative order, and the 1/2! factor is mandatory."
    },
    {
      "type": "section_summary",
      "bullets": [
        "A repeated factor of order r requires one partial-fraction term for every descending power, from r down to 1.",
        "Unrepeated linear factors still use the ordinary Heaviside cover-up method at their root.",
        "Repeated-factor coefficients aⱼ use the j-th derivative of (x-λ)^r F(x) divided by j!, evaluated at x = λ."
      ],
      "transition": "In the next section we will see a faster mixed method that combines cover-up with clearing fractions."
    },
    {
      "type": "quiz_plan",
      "target_questions": 6,
      "question_range": {
        "min": 5,
        "max": 8
      },
      "knowledge_points": [
        {
          "id": "expansion_pattern_for_repeated_factor",
          "label": "Writing the correct partial-fraction form",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Which is the correct partial-fraction form for a rational function whose denominator is (x-3)^2(x+1)?",
              "options": [
                "A. A/(x-3)^2 + B/(x+1)",
                "B. A/(x-3) + B/(x+1)",
                "C. A/(x-3)^2 + B/(x-3) + C/(x+1)",
                "D. A/(x-3)^2 + B/(x+1)^2"
              ],
              "correct_option": "C",
              "explanation": "A repeated factor of order 2 requires two terms: one over (x-3)^2 and one over (x-3), plus one term for the simple factor x+1.",
              "wrong_option_explanations": {
                "A": "It is missing the B/(x-3) term required by the repeated factor.",
                "B": "It omits the highest power (x-3)^2 term.",
                "D": "x+1 is not repeated, so it should not be squared in the denominator."
              },
              "hint": "For a repeated linear factor, write every power from the highest down to 1.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "A denominator contains (x+2)^3(x-5). How many separate terms must appear in the partial-fraction expansion?",
              "options": [
                "A. 2",
                "B. 3",
                "C. 4",
                "D. 5"
              ],
              "correct_option": "C",
              "explanation": "The repeated factor (x+2)^3 contributes three terms, and the simple factor (x-5) contributes one more, for a total of four.",
              "wrong_option_explanations": {
                "A": "This counts only one term per factor and ignores repetition.",
                "B": "This counts only the repeated-factor terms and misses the simple factor.",
                "D": "There is no fifth denominator power or extra factor."
              },
              "hint": "Count one term for each power in the repeated factor, then add one for each unrepeated factor.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "coefficient_methods",
          "label": "Choosing cover-up versus derivatives",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "For a repeated factor (x-λ)^r, which expression gives the coefficient a1 in the textbook method?",
              "options": [
                "A. a1 = [(x-λ)^r F(x)] evaluated at x=λ",
                "B. a1 = d/dx[(x-λ)^r F(x)] evaluated at x=λ",
                "C. a1 = (1/2!) d²/dx²[(x-λ)^r F(x)] evaluated at x=λ",
                "D. a1 = F(λ)"
              ],
              "correct_option": "B",
              "explanation": "a0 comes from direct evaluation after concealing the repeated factor; a1 comes from the first derivative of the concealed expression evaluated at x=λ.",
              "wrong_option_explanations": {
                "A": "That formula gives a0, not a1.",
                "C": "That corresponds to the second-derivative pattern, used for a2.",
                "D": "F(λ) is usually undefined because the denominator is zero there."
              },
              "hint": "Match the subscript to derivative order: a0 no derivative, a1 first derivative, a2 second derivative with 1/2!.",
              "needs_visual": true,
              "visual_type": "formula_mapping_diagram",
              "same_point_variant": true
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "In a denominator (x+1)^3(x+4), which coefficient is found by the ordinary cover-up method at x=-4?",
              "options": [
                "A. a0",
                "B. a1",
                "C. a2",
                "D. k"
              ],
              "correct_option": "D",
              "explanation": "The coefficient attached to the unrepeated factor x+4 is found exactly as in the ordinary Heaviside cover-up method.",
              "wrong_option_explanations": {
                "A": "a0 belongs to the repeated factor (x+1)^3 and is found at x=-1 after concealing that repeated factor.",
                "B": "a1 belongs to the repeated factor and requires a derivative.",
                "C": "a2 also belongs to the repeated factor and comes from a higher derivative step."
              },
              "hint": "Cover-up directly applies to simple unrepeated factors.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "worked_example_reading",
          "label": "Reading and using the representative example",
          "importance": "medium",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "In Example B.10, which coefficient is obtained from one-half of the second derivative after concealing (x+1)^3?",
              "options": [
                "A. k",
                "B. a0",
                "C. a1",
                "D. a2"
              ],
              "correct_option": "D",
              "explanation": "The textbook example uses the pattern aⱼ = (1/j!) times the j-th derivative, so the second derivative with 1/2! gives a2.",
              "wrong_option_explanations": {
                "A": "k is found by cover-up at the simple root x=-2.",
                "B": "a0 uses direct evaluation only.",
                "C": "a1 uses the first derivative, not the second."
              },
              "hint": "Look for the coefficient whose subscript matches derivative order.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp3_q2",
              "type": "short_answer",
              "stem": "For the example with denominator (x+1)^3(x+2), explain in one or two sentences why the expansion must contain three terms involving x+1.",