```json
{
  "section_id": "B.5-2",
  "section_title": "Heaviside Cover-Up Method",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.5-2 Heaviside Cover-Up Method\n\n> **Section Objective:** Master the fastest technique for finding partial-fraction coefficients when the denominator splits into distinct factors — no simultaneous equations required.\n\n---\n\nPartial fractions normally demand solving a system of equations. The Heaviside cover-up method eliminates that work entirely when the denominator factors are distinct: to find the coefficient attached to one factor, simply hide that factor and substitute its root into the rest of the expression. The coefficient drops out in one step.\n\nThis matters on exams because speed and accuracy compound. A three-factor decomposition that would take six lines of algebra collapses to three independent one-line calculations.\n\n### TOP SCORE NOTE\n\nDirect cover-up yields coefficients immediately **only for unrepeated linear factors**. If a real quadratic term remains in the denominator, its numerator must be linear (c\u2081x + c\u2082), and cover-up may recover only the coefficient of a separate linear factor. You must finish the quadratic part by comparison or strategic substitution."
    },
    {
      "type": "book_image",
      "source_page": "page-028",
      "fig_id": null,
      "teaching_role": "exam_pattern_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the worked example to memorize the exact cover-up pattern for three distinct factors.",
        "standard": "Use the example to show each coefficient comes from covering one denominator factor and substituting its root.",
        "top_score": "Use the example to emphasize speed, sign control, and how to avoid unnecessary simultaneous-equation work."
      },
      "caption": "This worked example is the canonical exam pattern: cover one denominator factor, plug in its zero, and the matching partial-fraction coefficient drops out immediately."
    },
    {
      "type": "math_block",
      "latex": "F(x)=\\frac{P(x)}{(x-\\lambda_1)(x-\\lambda_2)\\cdots(x-\\lambda_n)}=\\frac{k_1}{x-\\lambda_1}+\\frac{k_2}{x-\\lambda_2}+\\cdots+\\frac{k_n}{x-\\lambda_n}",
      "explanation": "This is the distinct-factor setup: when every denominator factor is a different unrepeated linear term, each factor gets its own constant coefficient k\u1d63 in the partial-fraction expansion."
    },
    {
      "type": "math_block",
      "latex": "k_r=\\left.(x-\\lambda_r)F(x)\\right|_{x=\\lambda_r}",
      "explanation": "This is the core cover-up rule: multiply F(x) by the target factor (x \u2212 \u03bb\u1d63) to remove it from the denominator, then substitute x = \u03bb\u1d63 so every other partial-fraction term vanishes, leaving k\u1d63 alone. **Critical warning:** do not substitute x = \u03bb\u1d63 into F(x) before multiplying — at that point the denominator is zero and the expression is undefined."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the diagram as a fast memory cue: factor covered, root substituted, coefficient obtained.",
        "standard": "Use the diagram to visualize why each coefficient matches one denominator factor.",
        "top_score": "Use the diagram to contrast the direct-success case with the incomplete-information case when a quadratic remainder is present."
      },
      "script": "import matplotlib.pyplot as plt\nimport matplotlib.patches as mpatches\nfrom matplotlib.patches import FancyArrowPatch\n\nfig, axes = plt.subplots(1, 2, figsize=(14, 7), facecolor='white')\nfig.subplots_adjust(wspace=0.35)\n\n# ── colour palette ──────────────────────────────────────────────\nCOVER_COLOR   = '#d62728'   # red  – crossed-out factor\nKEEP_COLOR    = '#1f77b4'   # blue – active factors\nRESULT_COLOR  = '#2ca02c'   # green – result\nNOTE_COLOR    = '#8c564b'   # brown – annotation\nBG_PANEL      = '#f7f7f7'\n\nfor ax in axes:\n    ax.set_xlim(0, 10)\n    ax.set_ylim(0, 10)\n    ax.axis('off')\n    ax.set_facecolor(BG_PANEL)\n    rect = mpatches.FancyBboxPatch((0.05, 0.05), 9.9, 9.9,\n                                   boxstyle='round,pad=0.1',\n                                   linewidth=1.5, edgecolor='#cccccc',\n                                   facecolor=BG_PANEL, zorder=0)\n    ax.add_patch(rect)\n\n# ════════════════════════════════════════════════════════════════\n# LEFT PANEL  –  direct cover-up works FULLY\n# ════════════════════════════════════════════════════════════════\nax = axes[0]\n\nax.text(5, 9.4, 'Direct Cover-Up Works Fully', ha='center', va='center',\n        fontsize=12, fontweight='bold', color='#333333')\n\n# Original fraction\nax.text(5, 8.55, r'$F(x)=\\dfrac{2x^2+9x-11}{(x+1)(x-2)(x+3)}$',\n        ha='center', va='center', fontsize=11, color='#333333')\n\n# Step 1 label\nax.text(0.5, 7.55, 'Step 1: Cover', ha='left', va='center',\n        fontsize=9.5, color='#555555', style='italic')\n\n# Fraction with (x+1) struck through\nax.text(2.2, 6.85,\n        r'$\\dfrac{2x^2+9x-11}{\\cancel{(x+1)}\\,(x-2)(x+3)}$',\n        ha='left', va='center', fontsize=11, color=KEEP_COLOR)\n\n# Red strikethrough label\nax.text(2.55, 7.55, r'$(x+1)$ covered', ha='left', va='center',\n        fontsize=9, color=COVER_COLOR, fontweight='bold')\n\n# Arrow down\nax.annotate('', xy=(5, 5.85), xytext=(5, 6.45),\n            arrowprops=dict(arrowstyle='->', color='#555555', lw=1.6))\n\n# Step 2 label\nax.text(0.5, 5.55, 'Step 2: Substitute root  x = -1', ha='left', va='center',\n        fontsize=9.5, color='#555555', style='italic')\n\nax.text(2.2, 4.85,\n        r'$\\dfrac{2(-1)^2+9(-1)-11}{(-1-2)(-1+3)}$',\n        ha='left', va='center', fontsize=11, color='#333333')\n\n# Arrow down\nax.annotate('', xy=(5, 3.95), xytext=(5, 4.55),\n            arrowprops=dict(arrowstyle='->', color='#555555', lw=1.6))\n\n# Step 3 simplify\nax.text(2.2, 3.65,\n        r'$=\\dfrac{2-9-11}{(-3)(2)}=\\dfrac{-18}{-6}$',\n        ha='left', va='center', fontsize=11, color='#333333')\n\n# Arrow down\nax.annotate('', xy=(5, 2.75), xytext=(5, 3.35),\n            arrowprops=dict(arrowstyle='->', color='#555555', lw=1.6))\n\n# Result\nax.text(5, 2.35, r'$k_1 = 3$',\n        ha='center', va='center', fontsize=14, fontweight='bold',\n        color=RESULT_COLOR,\n        bbox=dict(boxstyle='round,pad=0.35', facecolor='#e8f5e9',\n                  edgecolor=RESULT_COLOR, linewidth=1.5))\n\n# Summary coefficients\nax.text(5, 1.45,\n        r'Similarly: $k_2=1$ (cover $x-2$, sub $x=2$),  $k_3=-2$ (cover $x+3$, sub $x=-3$)',\n        ha='center', va='center', fontsize=8.5, color='#444444')\n\nax.text(5, 0.55, 'All three coefficients found directly — no system needed.',\n        ha='center', va='center', fontsize=8.5, color=RESULT_COLOR,\n        style='italic')\n\n# ════════════════════════════════════════════════════════════════\n# RIGHT PANEL  –  cover-up works PARTLY (quadratic remainder)\n# ════════════════════════════════════════════════════════════════\nax = axes[1]\n\nax.text(5, 9.4, 'Cover-Up Works Partly', ha='center', va='center',\n        fontsize=12, fontweight='bold', color='#333333')\n\n# Original fraction\nax.text(5, 8.55,\n        r'$F(x)=\\dfrac{4x^2+2x+18}{(x+1)(x^2+4x+13)}$',\n        ha='center', va='center', fontsize=11, color='#333333')\n\n# Decomposition form\nax.text(5, 7.65,\n        r'$=\\dfrac{k_1}{x+1}+\\dfrac{c_1 x+c_2}{x^2+4x+13}$',\n        ha='center', va='center', fontsize=11, color='#333333')\n\n# Step 1 – cover (x+1)\nax.text(0.5, 6.85, 'Cover (x+1), substitute x = -1:', ha='left', va='center',\n        fontsize=9.5, color='#555555', style='italic')\n\nax.text(2.2, 6.15,\n        r'$k_1=\\dfrac{4(1)+2(-1)+18}{(-1)^2+4(-1)+13}=\\dfrac{20}{10}$',\n        ha='left', va='center', fontsize=10.5, color='#333333')\n\nax.annotate('', xy=(5, 5.35), xytext=(5, 5.85),\n            arrowprops=dict(arrowstyle='->', color='#555555', lw=1.6))\n\nax.text(5, 4.95, r'$k_1 = 2$  \u2714 found directly',\n        ha='center', va='center', fontsize=13, fontweight='bold',\n        color=RESULT_COLOR,\n        bbox=dict(boxstyle='round,pad=0.3', facecolor='#e8f5e9',\n                  edgecolor=RESULT_COLOR, linewidth=1.5))\n\n# Divider\nax.plot([0.5, 9.5], [4.35, 4.35], color='#bbbbbb', lw=1, linestyle='--')\n\n# Remaining work\nax.text(0.5, 3.95,\n        r'$c_1,\\,c_2$ still unknown — quadratic numerator',\n        ha='left', va='center', fontsize=9.5, color=NOTE_COLOR,\n        fontweight='bold')\n\nax.text(0.5, 3.35,\n        'Cover-up cannot isolate $c_1$ or $c_2$ directly.',\n        ha='left', va='center', fontsize=9, color='#555555')\n\nax.text(0.5, 2.75,\n        'Use strategic substitutions (e.g. x = 1)',\n        ha='left', va='center', fontsize=9, color='#555555')\nax.text(0.5, 2.25,\n        'or multiply out and compare coefficients.',\n        ha='left', va='center', fontsize=9, color='#555555')\n\nax.text(0.5, 1.55,\n        r'Tip: multiply both sides by $x$, let $x\\to\\infty$',\n        ha='left', va='center', fontsize=9, color=NOTE_COLOR)\nax.text(0.5, 1.05,\n        r'to get $c_1$ quickly from leading terms.',\n        ha='left', va='center', fontsize=9, color=NOTE_COLOR)\n\nax.text(5, 0.45,\n        'Quadratic remainder always needs extra steps.',\n        ha='center', va='center', fontsize=8.5,\n        color=COVER_COLOR, style='italic')\n\nplt.savefig('generated/B.5-2-5.png', dpi=150, bbox_inches='tight')\n",
      "output_path": "generated/B.5-2-5.png",
      "caption": "Left: when all factors are distinct linear terms, cover-up finds every coefficient in one step each. Right: when a real quadratic factor remains, cover-up finds only the linear-factor coefficient directly — the quadratic numerator requires additional work."
    },
    {
      "type": "text_explanation",
      "content": "## 1. Distinct Linear Factors: Fastest Case\n\nWhen every denominator factor is a distinct linear term, the cover-up method is completely self-contained. Follow these four steps for each coefficient:\n\n1. **Identify** the factor whose coefficient you want, say (x \u2212 \u03bb\u1d63).\n2. **Cover** that factor — mentally erase it from the denominator.\n3. **Substitute** x = \u03bb\u1d63 (the root of the covered factor) into everything that remains.\n4. **Simplify** carefully; the result is k\u1d63.\n\nFor the textbook example F(x) = (2x\u00b2 + 9x \u2212 11) / [(x+1)(x\u22122)(x+3)], the three coefficients are:\n\n| Factor covered | Root substituted | Coefficient |\n|---|---|---|\n| (x + 1) | x = \u22121 | k\u2081 = 3 |\n| (x \u2212 2) | x = 2 | k\u2082 = 1 |\n| (x + 3) | x = \u22123 | k\u2083 = \u22122 |\n\n### COMMON TRAPS\n\n**Trap 1 — Wrong root:** The substituted value is the zero of the *covered* factor, not of any other factor. For (x + 3), the root is x = \u22123, not x = 3.\n\n**Trap 2 — Sign errors in factors:** Factors like (x \u2212 2) and (x + 3) carry opposite sign conventions. Rushing through the arithmetic here is where easy marks are lost.\n\n#### Answer Framing\n\nAlways write the final decomposition explicitly factor-by-factor: F(x) = 3/(x+1) + 1/(x\u22122) + (\u22122)/(x+3). Leaving it as a list of k values without the assembled form is incomplete."
    },
    {
      "type": "text_explanation",
      "content": "## 2. Complex and Quadratic Cases: Where Strong Students Separate Themselves\n\n### COMPLEX CONJUGATE FACTORS\n\nCover-up still works when the denominator has distinct complex linear factors. If the original rational function has **real coefficients**, complex roots always appear in conjugate pairs \u03bb and \u03bb*, and their associated coefficients k and k* are likewise complex conjugates. This means computing one coefficient by cover-up immediately gives the other for free — you do not need to repeat the calculation.\n\n### REAL QUADRATIC REMAINDER\n\nIn practice, a pair of complex-conjugate linear factors is often left as a single real irreducible quadratic. The partial-fraction form then requires a **linear numerator** c\u2081x + c\u2082 over that quadratic, not a constant. Direct cover-up cannot determine c\u2081 and c\u2082 in one step.\n\nFor example, with F(x) = (4x\u00b2 + 2x + 18) / [(x+1)(x\u00b2+4x+13)], cover-up immediately gives k\u2081 = 2 for the (x+1) term. But c\u2081 and c\u2082 over the quadratic still require extra work.\n\n### HIGH-YIELD SHORTCUTS\n\n**Leading-coefficient trick:** Multiply both sides of the identity by x and let x \u2192 \u221e. Only the highest-degree terms survive, giving c\u2081 directly from a one-line comparison.\n\n**Strategic substitution:** Choose a convenient finite value of x (such as x = 1) and substitute into the full identity after k\u2081 is known. This produces one equation in c\u2081 and c\u2082.\n\n### EXAM TRAP\n\nDo not default to x = 0 automatically. If any denominator factor evaluates to zero at x = 0, or if both sides of the identity blow up, x = 0 is useless or illegal. Pick a value that keeps every denominator factor nonzero."
    },
    {
      "type": "section_summary",
      "bullets": [
        "Cover-up works completely for distinct linear factors: cover, substitute the root, read off the coefficient.",
        "When a real quadratic factor remains, cover-up finds only the linear-factor coefficient; the quadratic numerator needs extra steps.",
        "The most common errors are using the wrong root (sign flip) and rushing arithmetic in factors like (x+3) or (x\u22122)."
      ],
      "transition": "In the next section we will extend this idea to repeated factors, where derivatives enter the process."
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
          "id": "direct_coverup_rule",
          "label": "Direct cover-up for distinct linear factors",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "For a proper rational function with distinct linear factors, what is the Heaviside cover-up formula for the coefficient of 1/(x \u2212 \u03bb\u1d63)?",
              "options": [
                "A. k\u1d63 = F(\u03bb\u1d63)",
                "B. k\u1d63 = F(x)/(x \u2212 \u03bb\u1d63) evaluated at x = \u03bb\u1d63",
                "C. k\u1d63 = (x \u2212 \u03bb\u1d63) F(x) evaluated at x = \u03bb\u1d63",
                "D. k\u1d63 = d/dx [(x \u2212 \u03bb\u1d63) F(x)] evaluated at x = \u03bb\u1d63"
              ],
              "correct_option": "C",
              "explanation": "You remove the target factor by multiplying F(x) by (x \u2212 \u03bb\u1d63), then substitute x = \u03bb\u1d63 so every other partial-fraction term vanishes and the wanted coefficient remains.",
              "wrong_option_explanations": {
                "A": "Direct substitution into F(x) itself makes the denominator zero and the expression undefined.",
                "B": "This divides by the factor instead of removing it, which is the opposite of the cover-up operation.",
                "D": "Differentiation is the rule for repeated factors, not for basic distinct-factor cases."
              },
              "hint": "Cover-up means eliminate the factor attached to the coefficient you want by multiplying it away first.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "Given F(x) = (2x\u00b2 + 9x \u2212 11) / [(x+1)(x\u22122)(x+3)], what is the coefficient of 1/(x\u22122)?",
              "options": [
                "A. \u22122",
                "B. 1",
                "C. 3",
                "D. 15"
              ],
              "correct_option": "B",
              "explanation": "Cover (x\u22122), then substitute x = 2: (2\u00b74 + 18 \u2212 11) / [(2+1)(2+3)] = 15/15 = 1.",
              "wrong_option_explanations": {
                "A": "\u22122 is the coefficient of 1/(x+3), not 1/(x\u22122).",
                "C": "3 is the coefficient of 1/(x+1).",
                "D": "15 is the numerator value before dividing by the remaining denominator factors."
              },
              "hint": "Cover the factor (x\u22122) and substitute the root of that factor, which is x = 2.",
              "needs_visual": true,
              "visual_type": "matplotlib_coverup_workflow",
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "sign_and_root_traps",
          "label": "Choosing the correct root and controlling signs",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "A student wants the coefficient of 1/(x+3) in a partial fraction expansion and substitutes x = 3 after covering up (x+3). What