```json
{
  "section_id": "B.5-3 Repeated Factors of Q(x)",
  "section_title": "B.5-3 Repeated Factors of Q(x)",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.5-3 Repeated Factors of Q(x)\n\n> **Section Objective:** Learn to write the correct partial-fraction template when the denominator contains a repeated linear factor, and master the two-method split for computing coefficients.\n\n---\n\nWhen you see a denominator like **(x+1)^3(x+2)**, you must immediately expect **four** separate partial-fraction terms — three from the repeated factor and one from the simple factor. This is the special case where ordinary Heaviside cover-up is not sufficient on its own, because one root repeats.\n\nIn this section you will learn:\n- How to write the **correct template** for any repeated factor of order r\n- Which coefficients **still come from cover-up** (the unrepeated factors)\n- How **derivatives recover** the repeated-factor coefficients\n\n### BIGGEST EARLY MISTAKE\n\nThe most common error is writing **too few terms** for the repeated factor — for example, writing only one term for (x+1)^3 instead of three. Catch this before you start computing."
    },
    {
      "type": "book_image",
      "source_page": "page-032",
      "fig_id": null,
      "teaching_role": "exam_pattern_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the example layout to memorize the repeated-factor expansion pattern fast.",
        "standard": "Use the printed example to connect the rule to one full worked problem.",
        "top_score": "Use the example to compare coefficient sources: plain cover-up for simple factors, derivative extraction for repeated-factor terms."
      },
      "caption": "This example shows the full exam workflow for a repeated factor: first write every required term in the template, then compute simple-root coefficients by cover-up and repeated-root coefficients by the derivative method."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use this to recognize instantly how many terms a repeated factor generates.",
        "standard": "Use this to see the mapping from denominator structure to partial-fraction structure.",
        "top_score": "Use this to highlight the ordering trap: a0 sits on the highest power denominator, not on 1/(x-lambda)."
      },
      "script": "import matplotlib.pyplot as plt\nimport matplotlib.patches as mpatches\nfrom matplotlib.patches import FancyArrowPatch\n\nfig, ax = plt.subplots(figsize=(10, 6))\nax.set_xlim(0, 10)\nax.set_ylim(0, 10)\nax.axis('off')\nfig.patch.set_facecolor('white')\n\n# Title\nax.text(5, 9.4, 'Repeated Factor → Partial-Fraction Structure', fontsize=14,\n        fontweight='bold', ha='center', va='center', color='#1a1a2e')\n\n# Column headers\nax.text(2.2, 8.5, 'Denominator Factor', fontsize=12, fontweight='bold',\n        ha='center', va='center', color='#16213e',\n        bbox=dict(boxstyle='round,pad=0.4', facecolor='#e8f4f8', edgecolor='#2196F3', linewidth=1.5))\nax.text(7.5, 8.5, 'Required Partial-Fraction Terms', fontsize=12, fontweight='bold',\n        ha='center', va='center', color='#16213e',\n        bbox=dict(boxstyle='round,pad=0.4', facecolor='#e8f4f8', edgecolor='#2196F3', linewidth=1.5))\n\n# Divider line\nax.axhline(y=8.0, xmin=0.02, xmax=0.98, color='#cccccc', linewidth=1)\n\n# --- Repeated factor block ---\nax.text(2.2, 7.1, r'$(x - \\lambda)^r$', fontsize=15, ha='center', va='center',\n        color='#c0392b',\n        bbox=dict(boxstyle='round,pad=0.5', facecolor='#fdecea', edgecolor='#c0392b', linewidth=1.5))\n\n# Arrow from repeated factor to terms\nax.annotate('', xy=(4.1, 7.1), xytext=(3.2, 7.1),\n            arrowprops=dict(arrowstyle='->', color='#2196F3', lw=2))\n\n# Terms for repeated factor\nterms_repeated = [\n    (r'$\\dfrac{a_0}{(x-\\lambda)^r}$',   6.85),\n    (r'$+\\;\\dfrac{a_1}{(x-\\lambda)^{r-1}}$', 6.2),\n    (r'$+\\;\\cdots$',                      5.65),\n    (r'$+\\;\\dfrac{a_{r-1}}{(x-\\lambda)}$', 5.1),\n]\nfor term_text, y_pos in terms_repeated:\n    ax.text(7.5, y_pos, term_text, fontsize=13, ha='center', va='center', color='#1a1a2e')\n\n# Brace / bracket around the repeated terms\nax.annotate('', xy=(4.3, 5.0), xytext=(4.3, 7.3),\n            arrowprops=dict(arrowstyle='-', color='#c0392b', lw=1.5,\n                            connectionstyle='arc3,rad=0'))\nax.text(4.05, 6.15, '{', fontsize=36, color='#c0392b', ha='center', va='center')\n\n# Warning note for repeated factor\nax.text(7.5, 4.55,\n        'Repeated factor of order r  →  r separate terms',\n        fontsize=10.5, ha='center', va='center', style='italic',\n        color='#7b0000',\n        bbox=dict(boxstyle='round,pad=0.35', facecolor='#fff3cd', edgecolor='#e0a800', linewidth=1.2))\n\n# Divider\nax.axhline(y=4.1, xmin=0.05, xmax=0.95, color='#dddddd', linewidth=1, linestyle='--')\n\n# --- Unrepeated factor block ---\nax.text(2.2, 3.3, r'$(x - \\alpha)$', fontsize=15, ha='center', va='center',\n        color='#1a6b1a',\n        bbox=dict(boxstyle='round,pad=0.5', facecolor='#eafaea', edgecolor='#2e7d32', linewidth=1.5))\n\nax.annotate('', xy=(4.1, 3.3), xytext=(3.2, 3.3),\n            arrowprops=dict(arrowstyle='->', color='#2196F3', lw=2))\n\nax.text(7.5, 3.3, r'$\\dfrac{k}{(x - \\alpha)}$', fontsize=13,\n        ha='center', va='center', color='#1a1a2e')\n\nax.text(7.5, 2.55,\n        'Simple (unrepeated) factor  →  1 term  (use cover-up)',\n        fontsize=10.5, ha='center', va='center', style='italic',\n        color='#1a4d1a',\n        bbox=dict(boxstyle='round,pad=0.35', facecolor='#eafaea', edgecolor='#2e7d32', linewidth=1.0))\n\n# Column separator\nax.axvline(x=4.5, ymin=0.18, ymax=0.88, color='#bbbbbb', linewidth=1, linestyle=':')\n\nplt.tight_layout()\nplt.savefig('generated/B.5-3-2.png', dpi=150, bbox_inches='tight')\n",
      "output_path": "generated/B.5-3-2.png",
      "caption": "Structure diagram: a repeated factor of order r maps to r stacked partial-fraction terms (a0 on the highest power, a_{r-1} on the lowest), while an unrepeated factor maps to a single term found by cover-up."
    },
    {
      "type": "text_explanation",
      "content": "## 1. How Repeated Factors Change the Setup\n\nWhen the denominator of F(x) contains a **repeated linear factor** (x - λ)^r, the partial-fraction expansion must include **one term for every power** from r down to 1:\n\n$$\\frac{a_0}{(x-\\lambda)^r} + \\frac{a_1}{(x-\\lambda)^{r-1}} + \\cdots + \\frac{a_{r-1}}{(x-\\lambda)}$$\n\nWriting fewer terms is the single most common setup error.\n\n### METHOD SPLIT\n\n**Unrepeated factors** — coefficients are still found by the ordinary **Heaviside cover-up** method: cover the factor, substitute the corresponding root, read off the value.\n\n**Repeated factor** — after concealing (x - λ)^r, the coefficients a_0, a_1, …, a_{r-1} are recovered by **evaluating successive derivatives** of the remaining expression at x = λ.\n\n### TOP-SCORE DISTINCTION\n\nThe repeated-factor coefficients are **not** all obtained by plugging x = λ into F(x) once. A single substitution after concealment gives only a_0. Every higher coefficient requires one additional derivative."
    },
    {
      "type": "math_block",
      "latex": "a_j = \\left.\\frac{1}{j!}\\frac{d^j}{dx^j}\\left[(x-\\lambda)^r F(x)\\right]\\right|_{x=\\lambda}, \\quad j=0,1,\\dots,r-1",
      "explanation": "After concealing the repeated factor by multiplying through by (x - λ)^r, the coefficient a_j is found by taking the j-th derivative of the resulting expression and evaluating it at x = λ, then dividing by j!. **Exam trap:** when j = 0, no derivative is taken at all — you simply evaluate the concealed expression at x = λ directly to get a_0."
    },
    {
      "type": "book_image",
      "source_page": "page-031",
      "fig_id": null,
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the printed formulas to lock in the exact derivative rule and symbol pattern.",
        "standard": "Use the page to connect the general formula to the explanation step by step.",
        "top_score": "Use the page to emphasize the coefficient-index logic and avoid mixing up a0, a1, and higher-order terms."
      },
      "caption": "This page gives the general repeated-factor rule: conceal the repeated factor by multiplying through, then use successive derivatives evaluated at the repeated root to recover each corresponding coefficient."
    },
    {
      "type": "text_explanation",
      "content": "## 2. Fast Exam Workflow on Example B.10\n\nGiven:\n$$F(x) = \\frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)}$$\n\n**Step 1 — Write the correct template:**\n$$F(x) = \\frac{a_0}{(x+1)^3} + \\frac{a_1}{(x+1)^2} + \\frac{a_2}{(x+1)} + \\frac{k}{(x+2)}$$\n\n**Step 2 — Find k by cover-up at x = -2:**\nCover (x+2) and substitute x = -2 into the rest → **k = 1**.\n\n**Step 3 — Find a_0 by concealing (x+1)^3 and evaluating at x = -1:**\nMultiply F(x) by (x+1)^3, then set x = -1 → **a_0 = 2**.\n\n**Step 4 — Find a_1 from the first derivative at x = -1:**\nDifferentiate the concealed expression once, evaluate at x = -1 → **a_1 = 1**.\n\n**Step 5 — Find a_2 from (1/2!) times the second derivative at x = -1:**\nDifferentiate twice, multiply by 1/2, evaluate at x = -1 → **a_2 = 3**.\n\n**Final expansion:**\n$$F(x) = \\frac{2}{(x+1)^3} + \\frac{1}{(x+1)^2} + \\frac{3}{(x+1)} + \\frac{1}{(x+2)}$$\n\n### TOP-SCORE NOTE\n\nMany students compute the four numbers correctly but then attach them to the wrong denominator powers. Always verify: a_0 = 2 belongs to the **highest** power (x+1)^3, and a_2 = 3 belongs to the **lowest** power (x+1). Swapping these is a full-credit error."
    },
    {
      "type": "section_summary",
      "bullets": [
        "A repeated factor of order r in the denominator always generates exactly r separate partial-fraction terms.",
        "Coefficients for unrepeated (simple) factors are still found by the ordinary Heaviside cover-up method.",
        "Repeated-factor coefficients require successive derivatives of the concealed expression evaluated at the repeated root."
      ],
      "transition": "In the next section we will compare this derivative-based method with a clearing-fractions approach that can be faster for some repeated roots."
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
          "id": "template_for_repeated_factor",
          "label": "Writing the correct partial-fraction template",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Which is the correct partial-fraction form for a rational function with denominator (x-3)^2(x+1)?",
              "options": [
                "A. A/(x-3)^2 + B/(x+1)",
                "B. A/(x-3)^2 + B/(x-3) + C/(x+1)",
                "C. A/(x-3) + B/(x+1)",
                "D. A/(x-3)^2 + B/(x-3) + C/(x+1)^2"
              ],
              "correct_option": "B",
              "explanation": "A repeated factor of order 2 contributes two separate terms: one over (x-3)^2 and one over (x-3). The simple factor (x+1) contributes one term.",
              "wrong_option_explanations": {
                "A": "This misses the 1/(x-3) term required by the repeated factor.",
                "C": "This omits the highest-power repeated-factor term 1/(x-3)^2.",
                "D": "The factor (x+1) is not repeated, so squaring it in the partial fractions is unjustified."
              },
              "hint": "A repeated linear factor of order r always creates r terms.",
              "needs_visual": true,
              "visual_type": "matplotlib_repeated_factor_template",
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "For a repeated factor (x-\\lambda)^3, which coefficient is attached to 1/(x-\\lambda)^3 in the textbook notation used here?",
              "options": [
                "A. a0",
                "B. a1",
                "C. a2",
                "D. ar"
              ],
              "correct_option": "A",
              "explanation": "In this section's notation, the stack is a0/(x-lambda)^3 + a1/(x-lambda)^2 + a2/(x-lambda). The index increases as the denominator power decreases.",
              "wrong_option_explanations": {
                "B": "a1 belongs to the next term down, 1/(x-lambda)^2.",
                "C": "a2 belongs to 1/(x-lambda), not the highest-power denominator.",
                "D": "The notation runs from a0 to a_(r-1), not ar."
              },
              "hint": "Read the expansion in descending denominator powers.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "coefficient_methods_split",
          "label": "Knowing which coefficients use cover-up and which use derivatives",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "Suppose F(x) has denominator (x+1)^3(x+2). Which statement is correct?",
              "options": [
                "A. Every coefficient is found by ordinary cover-up only.",
                "B. The coefficient of 1/(x+2) uses cover-up at x=-2, but the coefficients tied to (x+1)^3 use derivatives after concealing (x+1)^3.",
                "C. The coefficients tied to (x+1)^3 are all found by substituting x=-1 into F(x) directly.",
                "D. All coefficients require solving a linear system after clearing fractions."
              ],
              "correct_option": "B",
              "explanation": "The unrepeated factor x+2 still uses standard cover-up. The repeated factor (x+1)^3 requires conceal-and-differentiate at x=-1 to extract all three coefficients cleanly.",
              "wrong_option_explanations": {
                "A": "Ordinary cover-up alone does not recover all repeated-root coefficients.",
                "C": "A single substitution gives only the j=0 coefficient after concealment, not all of them.",
                "D": "A linear-system method can work, but it is not the method taught in this section."
              },
              "hint": "Separate simple factors from repeated factors before choosing a method.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp2_q2",
              "type": "short_answer",
              "stem": "Why does substituting x=\\lambda after concealing (x-\\lambda)^r give only a0 and not all coefficients for the repeated factor?",
              "ideal_answer": "After multiplying by and concealing (x-lambda)^r, the expression becomes a0 + a1(x-lambda) + a2(x-lambda)^2 + .... Setting x=lambda makes every term containing (x-lambda) vanish, so only a0 remains. Higher coefficients must be isolated by derivatives.",
              "grading_rubric": [
                "Must mention the concealed form a0 + a1(x-lambda) + higher powers",
                "Must explain that terms with (x-lambda) vanish at x=lambda",
                "Must conclude that derivatives are needed for higher coefficients"
              ],
              "explanation": "This checks whether the student understands the algebraic reason behind the derivative rule rather than memorizing a formula mechanically.",
              "hint": "Think about what happens to powers of (x-lambda) when x=lambda.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "example_execution_and_traps",
          "label": "Executing the repeated-factor workflow on Example B.10",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "In Example B.10, after writing F(x) = a0/(x+1)^3 + a1/(x+1)^2 + a2/(x+1) + k/(x+2), which coefficient is obtained by ordinary cover-up at x=-2?",
              "options": [
                "A. a0",
                "B. a1",
                "C. a2",
                "D. k"
              ],
              "correct_option": "D",
              "explanation": "The factor x+2 is unrepeated, so its coefficient is the one found by the ordinary Heaviside cover-up method at x=-2.",
              "wrong_option_explanations": {
                "A": "a0 belongs to the repeated factor and is found after concealing (x+1)^3, then evaluating at x=-1.",
                "B": "a1 requires a derivative at x=-1 after concealment.",
                "C": "a2 requires the second-derivative formula with the 1/2! factor."
              },
              "hint": "Simple root -> direct cover-up.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp3_q2",
              "type": "multiple_choice",
              "stem": "Which final expansion matches Example B.10 correctly?",
              "options": [
                "A. 2/(x+1)^3 + 1/(x+1)^2 + 3/(x+1) + 1/(x+2)",
                "B. 3/(x+1)^3 + 1/(x+1)^2 + 2/(x+1) + 1/(x+2)",
                "C. 2/(x+1)^3 + 3/(x+1)^2 + 1/(x+1) + 1/(x+2)",
                "D. 2/(x+1)^3 + 1/(x+1)^2 + 3/(x+1) + 1/(x+2)^2"
              ],
              "correct_option": "A",
              "explanation": "The textbook computes k=1, a0=2, a1=1, and a2=3, so the correct expansion is 2/(x+1)^3 + 1/(x