```json
{
  "section_id": "B.5-2 Heaviside Cover-Up Method",
  "section_title": "B.5-2 Heaviside Cover-Up Method",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.5-2 Heaviside Cover-Up Method\n\n> **Objective:** Learn a fast, exam-ready shortcut for finding partial fraction coefficients — no system of equations required.\n\nEquating coefficients works for partial fractions, but on a timed exam it can cost you precious minutes. The **Heaviside cover-up method** is a direct shortcut: for a proper rational function whose denominator factors into distinct linear (or complex) terms, each coefficient can be read off in a single substitution.\n\nOn this page you will learn:\n- **When** the method applies (distinct denominator factors, proper fraction)\n- **The core formula:** $k_r = (x - \\lambda_r)F(x)$ evaluated at $x = \\lambda_r$\n- **Why it works** — and how far it reaches when complex or quadratic factors appear\n\nMaster this and you will handle most partial-fraction exam problems in under two minutes."
    },
    {
      "type": "math_block",
      "latex": "F(x)=\\frac{P(x)}{(x-\\lambda_1)(x-\\lambda_2)\\cdots(x-\\lambda_n)}=\\frac{k_1}{x-\\lambda_1}+\\frac{k_2}{x-\\lambda_2}+\\cdots+\\frac{k_n}{x-\\lambda_n}, \\qquad k_r=\\left.(x-\\lambda_r)F(x)\\right|_{x=\\lambda_r}",
      "explanation": "When all denominator factors are distinct, each coefficient $k_r$ is found by multiplying $F(x)$ by the factor $(x - \\lambda_r)$ — which effectively \"covers\" or cancels that factor — and then substituting the root $x = \\lambda_r$ into whatever expression remains."
    },
    {
      "type": "book_image",
      "source_page": "page-028",
      "fig_id": null,
      "teaching_role": "example_support",
      "mode_specific_visual_use": {
        "cram": "Use this page to memorize the worked pattern and match it on tests.",
        "standard": "Use this as the representative textbook example and walk through one coefficient at a time.",
        "top_score": "Use this example to highlight why each coefficient comes from the root of its own factor, not from random substitution."
      },
      "caption": "This textbook example shows the full cover-up workflow applied to a denominator with three distinct linear factors."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "exam_pattern_anchor",
      "mode_specific_visual_use": {
        "cram": "Use this visual as a fast memory template: cover factor, plug root, coefficient found.",
        "standard": "Use this visual to reinforce the procedure before or after the textbook example.",
        "top_score": "Use this visual to contrast valid cover-up cases with cases that need extra work."
      },
      "script": "import matplotlib.pyplot as plt\nimport matplotlib.patches as mpatches\nfrom matplotlib.patches import FancyBboxPatch, FancyArrowPatch\n\nfig, axes = plt.subplots(1, 3, figsize=(15, 5))\nfig.patch.set_facecolor('white')\n\npanels = [\n    {\n        'title': 'Step 1: Find $k_1$',\n        'cover': 'Cover $(x+1)$',\n        'sub': 'Substitute $x = -1$',\n        'expr': r'$k_1 = \\dfrac{2(-1)^2+9(-1)-11}{(-1-2)(-1+3)}$',\n        'calc': r'$= \\dfrac{2-9-11}{(-3)(2)} = \\dfrac{-18}{-6}$',\n        'result': '$k_1 = 3$',\n        'color': '#d0e8ff'\n    },\n    {\n        'title': 'Step 2: Find $k_2$',\n        'cover': 'Cover $(x-2)$',\n        'sub': 'Substitute $x = 2$',\n        'expr': r'$k_2 = \\dfrac{2(2)^2+9(2)-11}{(2+1)(2+3)}$',\n        'calc': r'$= \\dfrac{8+18-11}{(3)(5)} = \\dfrac{15}{15}$',\n        'result': '$k_2 = 1$',\n        'color': '#d4f0d4'\n    },\n    {\n        'title': 'Step 3: Find $k_3$',\n        'cover': 'Cover $(x+3)$',\n        'sub': 'Substitute $x = -3$',\n        'expr': r'$k_3 = \\dfrac{2(-3)^2+9(-3)-11}{(-3+1)(-3-2)}$',\n        'calc': r'$= \\dfrac{18-27-11}{(-2)(-5)} = \\dfrac{-20}{10}$',\n        'result': '$k_3 = -2$',\n        'color': '#fde8cc'\n    }\n]\n\nfor i, (ax, panel) in enumerate(zip(axes, panels)):\n    ax.set_facecolor('white')\n    ax.set_xlim(0, 1)\n    ax.set_ylim(0, 1)\n    ax.axis('off')\n\n    # Panel background\n    bg = FancyBboxPatch((0.03, 0.03), 0.94, 0.94,\n                        boxstyle='round,pad=0.02',\n                        linewidth=1.5, edgecolor='#888888',\n                        facecolor=panel['color'])\n    ax.add_patch(bg)\n\n    # Title\n    ax.text(0.5, 0.91, panel['title'], ha='center', va='center',\n            fontsize=13, fontweight='bold', color='#222222')\n\n    # Divider line\n    ax.plot([0.1, 0.9], [0.85, 0.85], color='#888888', linewidth=0.8)\n\n    # Cover instruction box\n    cover_box = FancyBboxPatch((0.1, 0.72), 0.8, 0.10,\n                               boxstyle='round,pad=0.01',\n                               linewidth=1.2, edgecolor='#555555',\n                               facecolor='white')\n    ax.add_patch(cover_box)\n    ax.text(0.5, 0.77, panel['cover'], ha='center', va='center',\n            fontsize=11, color='#333333', style='italic')\n\n    # Arrow down\n    ax.annotate('', xy=(0.5, 0.66), xytext=(0.5, 0.71),\n                arrowprops=dict(arrowstyle='->', color='#555555', lw=1.5))\n\n    # Substitution label\n    ax.text(0.5, 0.63, panel['sub'], ha='center', va='center',\n            fontsize=10.5, color='#444444')\n\n    # Expression\n    ax.text(0.5, 0.50, panel['expr'], ha='center', va='center',\n            fontsize=9.5, color='#222222')\n\n    # Calculation\n    ax.text(0.5, 0.37, panel['calc'], ha='center', va='center',\n            fontsize=9.5, color='#222222')\n\n    # Arrow down to result\n    ax.annotate('', xy=(0.5, 0.26), xytext=(0.5, 0.31),\n                arrowprops=dict(arrowstyle='->', color='#333333', lw=1.5))\n\n    # Result box\n    res_box = FancyBboxPatch((0.2, 0.12), 0.6, 0.12,\n                             boxstyle='round,pad=0.01',\n                             linewidth=2.0, edgecolor='#333333',\n                             facecolor='white')\n    ax.add_patch(res_box)\n    ax.text(0.5, 0.18, panel['result'], ha='center', va='center',\n            fontsize=13, fontweight='bold', color='#111111')\n\n# Super title\nfig.suptitle(\n    r'Cover-Up Method: $F(x)=\\dfrac{2x^2+9x-11}{(x+1)(x-2)(x+3)}$',\n    fontsize=13, fontweight='bold', y=1.01, color='#111111'\n)\n\nplt.tight_layout(pad=1.2)\nplt.savefig('generated/B.5-2 Heaviside Cover-Up Method-3.png', dpi=150, bbox_inches='tight')\n",
      "output_path": "generated/B.5-2 Heaviside Cover-Up Method-3.png",
      "caption": "Three-step cover-up flow for F(x) = (2x²+9x-11)/((x+1)(x-2)(x+3)): cover one factor, substitute its root, read off the coefficient."
    },
    {
      "type": "text_explanation",
      "content": "## 1. Distinct Linear Factors: the Main Use Case\n\nThe cover-up method reduces to a three-step routine:\n\n1. **Factor the denominator** into distinct linear terms.\n2. **Choose one factor** $(x - \\lambda_r)$.\n3. **Cover it** (mentally remove it from the denominator) and **substitute** $x = \\lambda_r$ into what remains.\n\n---\n\n### WORKED EXAMPLE\n\nLet $F(x) = \\dfrac{2x^2+9x-11}{(x+1)(x-2)(x+3)} = \\dfrac{k_1}{x+1}+\\dfrac{k_2}{x-2}+\\dfrac{k_3}{x+3}$\n\n**Finding $k_1$:** Cover $(x+1)$, substitute $x = -1$:\n$$k_1 = \\frac{2(-1)^2+9(-1)-11}{(-1-2)(-1+3)} = \\frac{2-9-11}{(-3)(2)} = \\frac{-18}{-6} = 3$$\n\n**Finding $k_2$:** Cover $(x-2)$, substitute $x = 2$:\n$$k_2 = \\frac{2(2)^2+9(2)-11}{(2+1)(2+3)} = \\frac{8+18-11}{(3)(5)} = \\frac{15}{15} = 1$$\n\n**Finding $k_3$:** Cover $(x+3)$, substitute $x = -3$:\n$$k_3 = \\frac{2(-3)^2+9(-3)-11}{(-3+1)(-3-2)} = \\frac{18-27-11}{(-2)(-5)} = \\frac{-20}{10} = -2$$\n\n**Final result:**\n$$F(x) = \\frac{3}{x+1}+\\frac{1}{x-2}+\\frac{-2}{x+3}$$\n\n#### Quick Check\nYour substituted value must make the covered factor zero — if it does not, you have used the wrong root."
    },
    {
      "type": "book_image",
      "source_page": "page-029",
      "fig_id": null,
      "teaching_role": "comparison_anchor",
      "mode_specific_visual_use": {
        "cram": "Use this page to show that cover-up is not limited to simple real roots.",
        "standard": "Use this page to briefly introduce the extension to complex-conjugate factors without overloading details.",
        "top_score": "Use this page to point out that conjugate factors produce conjugate coefficients when the original coefficients are real."
      },
      "caption": "The same cover-up idea still works with complex factors, and when conjugate pairs appear in the denominator, their corresponding coefficients are complex conjugates of each other."
    },
    {
      "type": "text_explanation",
      "content": "## 2. What Changes with Complex or Quadratic Factors?\n\nThe cover-up idea does not break down when factors are complex — you can still cover a complex factor $(x - \\lambda)$ and substitute $x = \\lambda$ (a complex number) to obtain its coefficient. As the textbook shows, when the original function has real coefficients, complex-conjugate factors always produce conjugate coefficients, so you only need to compute one of the pair.\n\nHowever, many courses prefer the final answer written with a **real quadratic factor** rather than separate complex-conjugate terms. In that case, cover-up gives you the easy linear-factor coefficient first, but the quadratic numerator $(c_1 x + c_2)$ still needs to be found.\n\n### PRACTICAL SHORTCUT\n\nThe textbook pattern is:\n1. Use cover-up to find the coefficient of every **distinct linear** factor immediately.\n2. For the remaining quadratic numerator, plug in a **convenient $x$-value** (e.g., $x = 0$) to eliminate one unknown.\n3. Compare the **highest-power terms** on both sides to find the other unknown.\n\n> **Exam Note:** Cover-up gives the fastest start, but it is not always the entire finish. Recognize when extra algebra is still needed."
    },
    {
      "type": "section_summary",
      "bullets": [
        "Cover-up works best when the denominator has distinct linear (or complex) factors and the fraction is proper.",
        "Each coefficient equals the remaining expression after covering that factor and substituting its root.",
        "When a quadratic numerator remains, finish with a convenient substitution and highest-power comparison."
      ],
      "transition": "In the next section we will extend partial fraction decomposition to repeated factors, where the cover-up method must be combined with differentiation to recover every coefficient."
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
          "id": "applicability_of_coverup",
          "label": "When the Heaviside cover-up method applies directly",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "For which expression does the Heaviside cover-up method apply directly to find all coefficients immediately?",
              "options": [
                "A. $F(x)=\\dfrac{3x+1}{(x-1)^2(x+2)}$",
                "B. $F(x)=\\dfrac{2x-5}{(x+1)(x-3)}$",
                "C. $F(x)=\\dfrac{x^2+4}{x^2+1}$",
                "D. $F(x)=\\dfrac{1}{(x^2+4)^2}$"
              ],
              "correct_option": "B",
              "explanation": "The method applies directly when the rational function is proper and the denominator has distinct factors. Choice B has two distinct linear factors, so each coefficient can be found by cover-up immediately.",
              "wrong_option_explanations": {
                "A": "The repeated factor $(x-1)^2$ means cover-up alone does not directly give every coefficient.",
                "C": "This is not a proper rational function — the degree of the numerator equals the degree of the denominator, so long division must come first.",
                "D": "This has a repeated irreducible quadratic factor, so extra work beyond cover-up is needed."
              },
              "hint": "Look for a proper rational function with distinct denominator factors.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "Which is the best exam description of the cover-up method?",
              "options": [
                "A. Expand both sides fully and match coefficients term by term.",
                "B. Hide one factor, substitute the value that makes that factor zero, and read off its coefficient.",
                "C. Differentiate the whole rational function before decomposing it.",
                "D. Substitute $x=0$ first in every problem."
              ],
              "correct_option": "B",
              "explanation": "That is the core exam routine for distinct factors: cover the factor, substitute its root, and the coefficient appears directly.",
              "wrong_option_explanations": {
                "A": "That is the coefficient-comparison method, not cover-up.",
                "C": "Differentiation is not the main idea here; it is only needed for repeated factors.",
                "D": "$x=0$ is only sometimes useful as a finishing shortcut, not the defining step of cover-up."
              },
              "hint": "Think: what does your finger literally do on the page?",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "computing_coefficients_distinct_linear",
          "label": "Computing coefficients for distinct linear factors",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "If $F(x)=\\dfrac{2x^2+9x-11}{(x+1)(x-2)(x+3)}=\\dfrac{k_1}{x+1}+\\dfrac{k_2}{x-2}+\\dfrac{k_3}{x+3}$, what is $k_2$?",
              "options": [
                "A. $-2$",
                "B. $0$",
                "C. $1$",
                "D. $3$"
              ],
              "correct_option": "C",
              "explanation": "Cover up $(x-2)$, then substitute $x=2$: $k_2=\\dfrac{2(2)^2+9(2)-11}{(2+1)(2+3)}=\\dfrac{8+18-11}{3\\cdot5}=\\dfrac{15}{15}=1$.",
              "wrong_option_explanations": {
                "A": "$-2$ is the value of $k_3$, obtained by substituting $x=-3$, not $x=2$.",
                "B": "The numerator $2(4)+18-11=15$ does not vanish at $x=2$.",
                "D": "$3$ is the value of $k_1$, obtained by substituting $x=-1$, not $x=2$."
              },
              "hint": "Hide only the factor $(x-2)$ that is tied to $k_2$, then substitute the root of that factor.",
              "needs_visual": true,
              "visual_type": "matplotlib_coverup_flow",
              "same_point_variant": true
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "Using cover-up, what is the coefficient of $\\dfrac{1}{x-4}$ in $\\dfrac{5x+6}{(x-4)(x+2)}$?",
              "options": [
                "A. $\\dfrac{13}{3}$",
                "B. $\\dfrac{26}{6}$ (unsimplified)",
                "C. $-\\dfrac{7}{2}$",
                "D. $5$"
              ],
              "correct_option": "A",
              "explanation": "Cover up $(x-4)$ and substitute $x=4$: $\\dfrac{5(4)+6}{4+2}=\\dfrac{26}{6}=\\dfrac{13}{3}$. Always simplify the fraction fully.",
              "wrong_option_explanations": {
                "B": "$\\dfrac{26}{6}$ is the correct raw computation but must be simplified to $\\dfrac{13}{3}$.",
                "C": "$-\\dfrac{7}{2}$ comes from substituting the wrong root $x=-2$ instead of $x=4$.",
                "D": "$5$ ignores the denominator that remains after covering up $(x-4)$."
              },
              "hint": "After substitution, do not forget to simplify the resulting fraction fully.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "complex_or_quadratic_followup",
          "label": "What to do when complex-conjugate or quadratic factors appear",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "After using cover-up to find $k_1$ in $\\dfrac{4x^2+2x+18}{(x+1)(x^2+4x+13)}=\\dfrac{k_1}{x+1}+\\dfrac{c_1x+c_2}{x^2+4x+13}$, what is the next practical step?",
              "options": [
                "A. Stop, because cover-up has already found every unknown.",
                "B. Use convenient substitutions and/or highest-power comparison to find $c_1$ and $c_2$.",
                "C. Replace $x$ with $j$ in the original function.",
                "D. Square the denominator to remove the quadratic."
              ],
              "correct_option": "B",
              "explanation": "Cover-up quickly finds $k_1$, but the quadratic numerator still has two unknowns $c_1$ and $c_2$. The textbook shortcut is to plug in a convenient $x$-value (e.g., $x=0$) to remove one unknown, then compare highest-power terms to find the other.",
              "wrong_option_explanations": {
                "A": "There are still two unknown constants $c_1$ and $c_2$ in the quadratic numerator — cover-up alone cannot determine them.",
                "C": "Substituting $x=j$ is not the required algebraic step for finding real numerator constants.",
                "D": "Squaring the denominator is unrelated to partial fraction decomposition."
              },
              "hint": "Cover-up is the fastest