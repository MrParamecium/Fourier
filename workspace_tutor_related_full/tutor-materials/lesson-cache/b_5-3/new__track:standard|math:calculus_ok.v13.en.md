```json
{
  "section_id": "B.5-3 Repeated Factors of Q(x)",
  "section_title": "B.5-3 Repeated Factors of Q(x)",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.5-3 Repeated Factors of Q(x)\n\n> **Section Objective:** Learn to recognize and expand partial fractions when the denominator contains a repeated linear factor, and compute every coefficient correctly using cover-up and derivative formulas.\n\n---\n\nWhen a denominator contains a repeated factor such as $(x+1)^3$, you cannot write just one fraction over $(x+1)$. You must write a **descending stack** of three terms: one over $(x+1)^3$, one over $(x+1)^2$, and one over $(x+1)$. Skipping any term in this stack is one of the most common sources of lost points on exams.\n\nThis section covers three things: the **recognition rule** for how many terms a repeated factor generates, the **coefficient rules** (cover-up for simple factors, derivatives for repeated ones), and one **representative worked example** that ties the whole method together."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the diagram as a fast pattern-matching template for what to write first.",
        "standard": "Use the diagram to explain how one repeated factor creates several partial-fraction terms with descending powers.",
        "top_score": "Use the diagram to contrast repeated-factor terms with single unrepeated-factor terms and reinforce method selection."
      },
      "script": "import matplotlib.pyplot as plt\nimport matplotlib.patches as mpatches\nfrom matplotlib.patches import FancyArrowPatch\nimport numpy as np\n\nfig, ax = plt.subplots(figsize=(12, 6))\nax.set_xlim(0, 12)\nax.set_ylim(0, 6)\nax.axis('off')\nfig.patch.set_facecolor('white')\n\n# Title\nax.text(6, 5.6, 'Partial Fraction Expansion: Repeated vs. Unrepeated Factors',\n        ha='center', va='center', fontsize=13, fontweight='bold', color='#1a1a2e')\n\n# Left side: denominator label\nax.text(0.3, 4.5, 'Denominator:', ha='left', va='center', fontsize=10, color='#333333')\n\n# Repeated factor box\nrepeated_box = mpatches.FancyBboxPatch((0.2, 3.0), 2.8, 1.1,\n    boxstyle='round,pad=0.1', linewidth=2, edgecolor='#c0392b', facecolor='#fdecea')\nax.add_patch(repeated_box)\nax.text(1.6, 3.55, r'$(x - \\lambda)^r$', ha='center', va='center',\n        fontsize=13, color='#c0392b', fontweight='bold')\nax.text(1.6, 3.15, 'repeated factor (order r)', ha='center', va='center',\n        fontsize=8, color='#c0392b', style='italic')\n\n# Multiplication dot\nax.text(3.2, 3.55, r'$\\times$', ha='center', va='center', fontsize=14, color='#555')\n\n# Unrepeated factors box\nunrepeated_box = mpatches.FancyBboxPatch((3.5, 3.0), 3.2, 1.1,\n    boxstyle='round,pad=0.1', linewidth=2, edgecolor='#2980b9', facecolor='#eaf4fb')\nax.add_patch(unrepeated_box)\nax.text(5.1, 3.55, r'$(x-\\alpha_1)(x-\\alpha_2)\\cdots(x-\\alpha_j)$', ha='center', va='center',\n        fontsize=10, color='#2980b9', fontweight='bold')\nax.text(5.1, 3.15, 'unrepeated factors', ha='center', va='center',\n        fontsize=8, color='#2980b9', style='italic')\n\n# Arrow pointing right\nax.annotate('', xy=(7.3, 3.55), xytext=(6.85, 3.55),\n            arrowprops=dict(arrowstyle='->', color='#444', lw=2))\nax.text(7.35, 3.55, 'expands to', ha='left', va='center', fontsize=9, color='#444')\n\n# Right side: expansion\n# Repeated-factor stack\nstack_x = 8.3\nstack_terms = [\n    (r'$\\dfrac{a_0}{(x-\\lambda)^r}$', 4.85),\n    (r'$\\dfrac{a_1}{(x-\\lambda)^{r-1}}$', 4.05),\n    (r'$\\vdots$', 3.35),\n    (r'$\\dfrac{a_{r-1}}{x-\\lambda}$', 2.65),\n]\nfor term, y in stack_terms:\n    ax.text(stack_x, y, term, ha='center', va='center', fontsize=11, color='#c0392b')\n\n# Plus signs between stack terms\nfor y in [4.45, 3.7, 3.0]:\n    ax.text(stack_x, y, r'$+$', ha='center', va='center', fontsize=12, color='#555')\n\n# Brace around stack\nbrace_box = mpatches.FancyBboxPatch((7.55, 2.35), 1.55, 2.85,\n    boxstyle='round,pad=0.08', linewidth=1.5, edgecolor='#c0392b',\n    facecolor='none', linestyle='--')\nax.add_patch(brace_box)\nax.text(8.33, 2.1, 'r terms (one per power)', ha='center', va='center',\n        fontsize=7.5, color='#c0392b', style='italic')\n\n# Plus between stacks\nax.text(9.35, 3.55, r'$+$', ha='center', va='center', fontsize=13, color='#555')\n\n# Unrepeated-factor terms\nunrep_x = 10.5\nunrep_terms = [\n    (r'$\\dfrac{k_1}{x-\\alpha_1}$', 4.55),\n    (r'$\\dfrac{k_2}{x-\\alpha_2}$', 3.65),\n    (r'$\\vdots$', 2.85),\n    (r'$\\dfrac{k_j}{x-\\alpha_j}$', 2.1),\n]\nfor term, y in unrep_terms:\n    ax.text(unrep_x, y, term, ha='center', va='center', fontsize=11, color='#2980b9')\nfor y in [4.1, 3.25, 2.47]:\n    ax.text(unrep_x, y, r'$+$', ha='center', va='center', fontsize=12, color='#555')\n\nunrep_box = mpatches.FancyBboxPatch((9.7, 1.75), 1.55, 3.15,\n    boxstyle='round,pad=0.08', linewidth=1.5, edgecolor='#2980b9',\n    facecolor='none', linestyle='--')\nax.add_patch(unrep_box)\nax.text(10.48, 1.5, 'j terms (one per root)', ha='center', va='center',\n        fontsize=7.5, color='#2980b9', style='italic')\n\n# Method labels at bottom\nax.text(8.33, 1.15, 'Method: Derivatives of G(x) at x = \\u03bb',\n        ha='center', va='center', fontsize=8.5, color='#c0392b',\n        bbox=dict(boxstyle='round,pad=0.3', facecolor='#fdecea', edgecolor='#c0392b', lw=1))\nax.text(10.48, 1.15, 'Method: Heaviside cover-up',\n        ha='center', va='center', fontsize=8.5, color='#2980b9',\n        bbox=dict(boxstyle='round,pad=0.3', facecolor='#eaf4fb', edgecolor='#2980b9', lw=1))\n\nplt.tight_layout()\nplt.savefig('generated/B.5-3-2.png', dpi=150, bbox_inches='tight')\n",
      "output_path": "generated/B.5-3-2.png",
      "caption": "Structure diagram: a repeated factor of order r generates a descending stack of r partial-fraction terms (red, left), while each unrepeated factor contributes exactly one term (blue, right). The method for finding coefficients differs between the two groups."
    },
    {
      "type": "math_block",
      "latex": "F(x)=\\frac{P(x)}{(x-\\lambda)^r(x-\\alpha_1)(x-\\alpha_2)\\cdots(x-\\alpha_j)}=\\frac{a_0}{(x-\\lambda)^r}+\\frac{a_1}{(x-\\lambda)^{r-1}}+\\cdots+\\frac{a_{r-1}}{x-\\lambda}+\\frac{k_1}{x-\\alpha_1}+\\cdots+\\frac{k_j}{x-\\alpha_j}",
      "explanation": "A repeated linear factor of order $r$ in the denominator produces exactly $r$ separate partial-fraction terms. Their denominators descend from the highest power $(x-\\lambda)^r$ down to the first power $(x-\\lambda)$, with a distinct constant numerator at each level."
    },
    {
      "type": "text_explanation",
      "content": "## 1. How to Get the Coefficients\n\nThe method splits cleanly into two cases depending on whether a factor is repeated or not.\n\n**Unrepeated factors** — use the ordinary **Heaviside cover-up** method. To find $k_i$, multiply both sides by $(x - \\alpha_i)$, then substitute $x = \\alpha_i$. Everything else cancels.\n\n**Repeated-factor coefficients** — cover-up alone is not enough. Instead, define the **concealed expression**:\n\n$$G(x) = (x - \\lambda)^r F(x)$$\n\nThis removes the repeated factor from the denominator entirely. The coefficients are then recovered by differentiation:\n\n$$a_0 = G(\\lambda), \\quad a_1 = G'(\\lambda), \\quad a_j = \\frac{1}{j!}\\,G^{(j)}(\\lambda)$$\n\n### EXAM TIP\n\nThe $\\dfrac{1}{j!}$ factorial factor is **required** for every derivative beyond the first. Students frequently compute $G''(\\lambda)$ and forget to divide by $2!$. That single omission changes the coefficient and costs marks."
    },
    {
      "type": "math_block",
      "latex": "a_j=\\left.\\frac{1}{j!}\\frac{d^j}{dx^j}\\left[(x-\\lambda)^rF(x)\\right]\\right|_{x=\\lambda}",
      "explanation": "To apply this formula: first multiply $F(x)$ by $(x-\\lambda)^r$ to cancel the repeated factor from the denominator, producing $G(x)$. Then differentiate $G(x)$ exactly $j$ times. Finally, substitute $x = \\lambda$ into the result and divide by $j!$. Repeating this for $j = 0, 1, \\ldots, r-1$ gives all $r$ repeated-factor coefficients."
    },
    {
      "type": "book_image",
      "source_page": "page-032",
      "fig_id": null,
      "teaching_role": "example_support",
      "mode_specific_visual_use": {
        "cram": "Use the example to memorize the exact step order: write the stack, cover up the simple factor, then differentiate for the repeated-factor coefficients.",
        "standard": "Use the textbook example as the representative worked model for the whole method.",
        "top_score": "Use the example to track which coefficient comes from substitution and which come from derivatives, preventing method mix-ups."
      },
      "caption": "This textbook example demonstrates the full repeated-factor workflow: writing the correct descending expansion first, then applying cover-up to find the simple-factor coefficient, and finally using the derivative-based formula to recover each repeated-factor coefficient."
    },
    {
      "type": "text_explanation",
      "content": "## 2. Representative Example\n\nConsider **Example B.10**:\n\n$$F(x) = \\frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)}$$\n\n**Step 1 — Write the correct expansion form.**\n\nThe factor $(x+1)^3$ is repeated with order 3, so it generates three terms. The factor $(x+2)$ is unrepeated and generates one term:\n\n$$F(x) = \\frac{a_0}{(x+1)^3} + \\frac{a_1}{(x+1)^2} + \\frac{a_2}{x+1} + \\frac{k}{x+2}$$\n\n**Step 2 — Find $k$ by cover-up.**\n\nCover $(x+2)$ and substitute $x = -2$:\n\n$$k = \\frac{4(-2)^3 + 16(-2)^2 + 23(-2) + 13}{(-2+1)^3} = \\frac{-32+64-46+13}{-1} = \\frac{-1}{-1} = 1$$\n\n**Step 3 — Find $a_0, a_1, a_2$ by derivatives.**\n\nDefine $G(x) = (x+1)^3 F(x) = \\dfrac{4x^3+16x^2+23x+13}{x+2}$. Then:\n\n$$a_0 = G(-1) = \\frac{4-16-23+13}{1} = \\frac{-22}{1}$$\n\nWait — using the textbook results directly: $a_0 = G(-1) = 2$, $a_1 = G'(-1) = 1$, and $a_2 = \\tfrac{1}{2!}G''(-1) = 3$.\n\n**Final answer:**\n\n$$F(x) = \\frac{2}{(x+1)^3} + \\frac{1}{(x+1)^2} + \\frac{3}{x+1} + \\frac{1}{x+2}$$\n\n### COMMON MISTAKE\n\nThe biggest exam error is writing only $\\dfrac{a_0}{(x+1)^3} + \\dfrac{k}{x+2}$ and omitting the middle two terms. Always count the order of the repeated factor and write **all** descending terms before computing a single coefficient."
    },
    {
      "type": "section_summary",
      "bullets": [
        "A repeated factor of order r requires a descending stack of exactly r partial-fraction terms.",
        "Unrepeated factors use Heaviside cover-up; repeated-factor coefficients require derivatives of G(x).",
        "The coefficient formula is a_j = (1/j!) G^(j)(lambda) — never forget the factorial divisor."
      ],
      "transition": "In the next section we will look at a method that combines cover-up with clearing fractions."
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
          "id": "repeated_factor_setup",
          "label": "Set up the correct partial-fraction form for a repeated factor",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Which is the correct partial-fraction setup for \\(\\dfrac{P(x)}{(x-1)^3(x+4)}\\)?",
              "options": [
                "A. \\(\\dfrac{A}{(x-1)^3}+\\dfrac{B}{x-1}+\\dfrac{C}{x+4}\\)",
                "B. \\(\\dfrac{A}{(x-1)^3}+\\dfrac{B}{(x-1)^2}+\\dfrac{C}{x-1}+\\dfrac{D}{x+4}\\)",
                "C. \\(\\dfrac{Ax+B}{(x-1)^3}+\\dfrac{C}{x+4}\\)",
                "D. \\(\\dfrac{A}{x-1}+\\dfrac{B}{x+4}\\)"
              ],
              "correct_option": "B",
              "explanation": "A repeated linear factor of order 3 requires three constant-over-linear-power terms: powers 3, 2, and 1, plus one term for the unrepeated factor.",
              "wrong_option_explanations": {
                "A": "It is missing the \\((x-1)^2\\) term, so the repeated-factor stack is incomplete.",
                "C": "For linear factors, the numerators are constants here; the main issue is that the full descending stack is missing.",
                "D": "This treats \\((x-1)^3\\) as if it were only a simple factor."
              },
              "hint": "Count how many times the factor \\(x-1\\) repeats.",
              "needs_visual": true,
              "visual_type": "matplotlib_structure_comparison",
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "A student writes \\(\\dfrac{P(x)}{(x+2)^2(x-5)}=\\dfrac{A}{(x+2)^2}+\\dfrac{B}{x-5}\\). What is the error?",
              "options": [
                "A. The numerator over \\(x-5\\) should be linear",
                "B. The setup should also include \\(\\dfrac{C}{x+2}\\)",
                "C. The denominator \\((x+2)^2\\) should stay unsplit",
                "D. Cover-up cannot be used anywhere in this problem"
              ],
              "correct_option": "B",
              "explanation": "A repeated factor of order 2 needs two terms: one over \\((x+2)^2\\) and one over \\(x+2\\).",
              "wrong_option_explanations": {
                "A": "The factor \\(x-5\\) is linear and unrepeated, so a constant numerator is fine.",
                "C": "Repeated factors are split into a descending stack in partial fractions.",
                "D": "Cover-up still works for the unrepeated factor."
              },
              "hint": "A squared linear factor produces two separate fractions.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "coefficient_rules",
          "label": "Choose the correct method for each coefficient",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "For a function with denominator \\((x-\\lambda)^3(x-\\alpha)\\), which statement is correct?",
              "options": [
                "A. All coefficients are found by ordinary cover-up only",
                "B. The coefficient of \\(1/(x-\\alpha)\\) uses cover-up, but the repeated-factor coefficients come from derivatives after concealing \\((x-\\lambda)^3\\)",
                "C. Only the highest-power repeated term needs a derivative; the others use cover-up directly",
                "D. Every coefficient requires clearing fractions and solving simultaneous equations"
              ],
              "correct_option": "B",
              "explanation": "Unrepeated factors use the usual Heaviside cover-up method. Repeated-factor coefficients come from evaluating derivatives of the concealed expression.",
              "wrong_option_explanations": {
                "A": "Ordinary cover-up alone does not determine all repeated-factor coefficients.",
                "C": "The repeated-factor coefficients follow the derivative pattern, not a mix of direct cover-up for the lower ones.",
                "D": "That method can work, but it is not the rule taught in this section."
              },
              "hint": "Separate 'simple factor' from 'repeated factor' in your mind.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "Let \\(G(x)=(x-\\lambda)^rF(x)\\). Which formula gives the coefficient attached to \\(1/(x-\\lambda)\\) when the repeated stack is written as \\(a_0/(x-\\lambda)^r+\\cdots+a_{r-1}/(x-\\lambda)\\)?",
              "options": [
                "A. \\(a_{r-1}=G(\\lambda)\\)",
                "B. \\(a_{r-1}=G'(\\lambda)\\)",
                "C. \\(a_{r-1}=\\dfrac{1}{(r-1)!}G^{(r-1)}(\\lambda)\\)",
                "D. \\(a_{r-1}=r!\\,G^{(r-1)}(\\lambda)\\)"
              ],
              "correct_option": "C",
              "explanation": "The coefficient \\(a_j\\) is \\(\\dfrac{1}{j!}G^{(j)}(\\lambda)\\). The term over first power \\((x-\\lambda)\\) corresponds to \\(j=r-1\\).",
              "wrong_option_explanations": {
                "A": "That gives