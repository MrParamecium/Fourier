```json
{
  "section_id": "B.4 Cramer's Rule",
  "section_title": "B.4 Cramer's Rule",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.4 Cramer's Rule\n\n> **Section Objective:** Use determinants to solve 2×2 linear systems quickly and correctly — and know exactly when the method is valid.\n\n## What This Section Is About\n\nConsider the system:\n\n$$\n2x + y = 5 \\qquad x - y = 1\n$$\n\nYou could use substitution or elimination — but on an exam, **Cramer's Rule** is faster and more structured. It solves a linear system by computing determinant ratios, giving you \\(x\\) and \\(y\\) directly from a clean formula.\n\nThe catch: the method only works when the **denominator determinant \\(D\\) is not zero**. If \\(D = 0\\), there is no unique solution and Cramer's Rule does not apply. Knowing this test cold is half the battle — examiners frequently set up systems where you must check \\(D\\) before proceeding."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the diagram to memorize which column gets replaced for x and y.",
        "standard": "Use the diagram to connect the original coefficient determinant with the two numerator determinants.",
        "top_score": "Use the diagram to highlight that only one column changes each time and that row/column order must stay consistent."
      },
      "script": "import matplotlib.pyplot as plt\nimport matplotlib.patches as mpatches\nfrom matplotlib.patches import FancyArrowPatch\n\nfig, ax = plt.subplots(figsize=(12, 4))\nax.set_xlim(0, 12)\nax.set_ylim(0, 4)\nax.axis('off')\nfig.patch.set_facecolor('white')\n\n# Helper: draw a 2x2 determinant box\ndef draw_det(ax, cx, cy, r1c1, r1c2, r2c1, r2c2, title, highlight_col=None):\n    box_w, box_h = 1.6, 1.4\n    left = cx - box_w / 2\n    bottom = cy - box_h / 2\n\n    # Highlight column background\n    if highlight_col == 1:\n        rect = mpatches.FancyBboxPatch((left, bottom), box_w / 2, box_h,\n                                        boxstyle='square,pad=0', linewidth=0,\n                                        facecolor='#FFF3CD', zorder=1)\n        ax.add_patch(rect)\n    elif highlight_col == 2:\n        rect = mpatches.FancyBboxPatch((left + box_w / 2, bottom), box_w / 2, box_h,\n                                        boxstyle='square,pad=0', linewidth=0,\n                                        facecolor='#FFF3CD', zorder=1)\n        ax.add_patch(rect)\n\n    # Vertical bars\n    for xpos in [left, left + box_w]:\n        ax.plot([xpos, xpos], [bottom, bottom + box_h], color='#333333', linewidth=2, zorder=2)\n\n    # Matrix entries\n    ax.text(left + box_w * 0.25, bottom + box_h * 0.72, r1c1, ha='center', va='center',\n            fontsize=15, fontweight='bold', color='#222222', zorder=3)\n    ax.text(left + box_w * 0.75, bottom + box_h * 0.72, r1c2, ha='center', va='center',\n            fontsize=15, fontweight='bold', color='#222222', zorder=3)\n    ax.text(left + box_w * 0.25, bottom + box_h * 0.28, r2c1, ha='center', va='center',\n            fontsize=15, fontweight='bold', color='#222222', zorder=3)\n    ax.text(left + box_w * 0.75, bottom + box_h * 0.28, r2c2, ha='center', va='center',\n            fontsize=15, fontweight='bold', color='#222222', zorder=3)\n\n    # Title above\n    ax.text(cx, bottom + box_h + 0.28, title, ha='center', va='bottom',\n            fontsize=13, fontweight='bold', color='#1a1a2e')\n\n# Positions\npositions = [2.5, 6.0, 9.5]\ncy = 2.0\n\n# D\ndraw_det(ax, positions[0], cy, 'a', 'b', 'c', 'd', r'$D$')\n# Dx\ndraw_det(ax, positions[1], cy, 'e', 'b', 'f', 'd', r'$D_x$', highlight_col=1)\n# Dy\ndraw_det(ax, positions[2], cy, 'a', 'e', 'c', 'f', r'$D_y$', highlight_col=2)\n\n# Subtitles below\nax.text(positions[0], cy - 1.05, 'Coefficient matrix', ha='center', va='top',\n        fontsize=10, color='#555555', style='italic')\nax.text(positions[1], cy - 1.05, 'Replace x-column\\nwith constants', ha='center', va='top',\n        fontsize=10, color='#b8860b', style='italic')\nax.text(positions[2], cy - 1.05, 'Replace y-column\\nwith constants', ha='center', va='top',\n        fontsize=10, color='#b8860b', style='italic')\n\n# Arrows between determinants\nfor x_start, x_end in [(3.35, 4.15), (6.85, 7.65)]:\n    ax.annotate('', xy=(x_end, cy), xytext=(x_start, cy),\n                arrowprops=dict(arrowstyle='->', color='#888888', lw=1.8))\n\n# Formulas below the whole figure\nax.text(6.0, 0.18, r'$x = \\dfrac{D_x}{D}$          $y = \\dfrac{D_y}{D}$          (valid only when $D \\neq 0$)',\n        ha='center', va='bottom', fontsize=12, color='#1a1a2e')\n\nplt.tight_layout()\nplt.savefig('generated/B.4-2.png', dpi=150, bbox_inches='tight')\n",
      "output_path": "generated/B.4-2.png",
      "caption": "Cramer's Rule replacement pattern: \\(D\\) uses the original coefficient matrix; \\(D_x\\) replaces the x-column with constants (highlighted); \\(D_y\\) replaces the y-column with constants (highlighted). Only one column changes each time."
    },
    {
      "type": "math_block",
      "latex": "\\begin{cases}ax+by=e\\\\cx+dy=f\\end{cases},\\quad D=\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}=ad-bc,\\quad x=\\dfrac{D_x}{D},\\quad y=\\dfrac{D_y}{D}",
      "explanation": "Cramer's Rule expresses each unknown as a ratio of two determinants: the numerator is built by replacing the relevant column with the constant terms, and the denominator is always \\(D = ad - bc\\). The method yields a unique solution **only when \\(D \\neq 0\\)**; if \\(D = 0\\), the denominator is undefined and the rule cannot be applied."
    },
    {
      "type": "text_explanation",
      "content": "## 1. How to Apply Cramer's Rule Safely\n\nWork through the system \\(2x + y = 5\\) and \\(x - y = 1\\) step by step.\n\n**Step 1 — Compute \\(D\\) and check it is nonzero:**\n\n$$\nD = \\begin{vmatrix}2 & 1\\\\1 & -1\\end{vmatrix} = (2)(-1) - (1)(1) = -3 \\neq 0\n$$\n\nBecause \\(D \\neq 0\\), a unique solution exists and Cramer's Rule applies.\n\n**Step 2 — Build \\(D_x\\)** by replacing the **x-column** \\((2, 1)\\) with the constants \\((5, 1)\\):\n\n$$\nD_x = \\begin{vmatrix}5 & 1\\\\1 & -1\\end{vmatrix} = (5)(-1) - (1)(1) = -6\n$$\n\n**Step 3 — Build \\(D_y\\)** by replacing the **y-column** \\((1, -1)\\) with the constants \\((5, 1)\\):\n\n$$\nD_y = \\begin{vmatrix}2 & 5\\\\1 & 1\\end{vmatrix} = (2)(1) - (5)(1) = -3\n$$\n\n**Step 4 — Divide:**\n\n$$\nx = \\frac{D_x}{D} = \\frac{-6}{-3} = 2, \\qquad y = \\frac{D_y}{D} = \\frac{-3}{-3} = 1\n$$\n\n### THREE TRAPS TO AVOID\n\n- **Wrong column replaced:** For \\(D_x\\), replace only the x-column; for \\(D_y\\), replace only the y-column. Mixing these is the most common error.\n- **Row order changed midway:** Keep the same equation order in \\(D\\), \\(D_x\\), and \\(D_y\\). Swapping rows flips the sign of the determinant.\n- **Sign error in \\(ad - bc\\):** The formula is subtraction, not addition. Write it out explicitly every time.\n\n> **High-Score Insight:** A neatly written determinant setup — even before you finish the arithmetic — demonstrates method understanding and earns partial credit. Examiners look for structure first."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "trap_exposure",
      "mode_specific_visual_use": {
        "cram": "Use the plot to connect D ≠ 0 with 'lines cross once' and D = 0 with 'do not use Cramer's Rule for a unique answer'.",
        "standard": "Use the plot to build intuition for when the algebraic rule is valid.",
        "top_score": "Use the plot to separate 'parallel lines' from 'same line' and stress that both give D = 0 but represent different system behavior."
      },
      "script": "import matplotlib.pyplot as plt\nimport numpy as np\n\nfig, axes = plt.subplots(1, 3, figsize=(13, 4.5))\nfig.patch.set_facecolor('white')\n\nx = np.linspace(-2, 4, 300)\n\n# --- Left panel: D ≠ 0, unique intersection ---\nax = axes[0]\nax.set_facecolor('white')\ny1 = (5 - 2*x) / 1          # 2x + y = 5  =>  y = 5 - 2x\ny2 = x - 1                   # x - y = 1   =>  y = x - 1\nax.plot(x, y1, color='#1f77b4', linewidth=2.2, label=r'$2x+y=5$')\nax.plot(x, y2, color='#d62728', linewidth=2.2, label=r'$x-y=1$')\n# Intersection at (2, 1)\nax.plot(2, 1, 'ko', markersize=8, zorder=5)\nax.annotate('$(2,\\,1)$', xy=(2, 1), xytext=(2.3, 0.3),\n            fontsize=10, color='#333333',\n            arrowprops=dict(arrowstyle='->', color='#555555', lw=1.2))\nax.set_xlim(-2, 4)\nax.set_ylim(-2, 6)\nax.axhline(0, color='#aaaaaa', linewidth=0.8)\nax.axvline(0, color='#aaaaaa', linewidth=0.8)\nax.set_title(r'$D \\neq 0$: Unique Solution', fontsize=12, fontweight='bold', color='#1a6e1a', pad=10)\nax.legend(fontsize=9, loc='upper right')\nax.set_xlabel('x', fontsize=10)\nax.set_ylabel('y', fontsize=10)\nax.grid(True, linestyle='--', alpha=0.4)\n\n# --- Middle panel: D = 0, parallel lines (no solution) ---\nax = axes[1]\nax.set_facecolor('white')\ny3 = (4 - 2*x) / 1          # 2x + y = 4\ny4 = (6 - 2*x) / 1          # 2x + y = 6  (parallel)\nax.plot(x, y3, color='#1f77b4', linewidth=2.2, label=r'$2x+y=4$')\nax.plot(x, y4, color='#d62728', linewidth=2.2, label=r'$2x+y=6$')\nax.set_xlim(-2, 4)\nax.set_ylim(-2, 6)\nax.axhline(0, color='#aaaaaa', linewidth=0.8)\nax.axvline(0, color='#aaaaaa', linewidth=0.8)\nax.set_title(r'$D = 0$: Parallel Lines (No Solution)', fontsize=11, fontweight='bold', color='#b22222', pad=10)\nax.legend(fontsize=9, loc='upper right')\nax.set_xlabel('x', fontsize=10)\nax.set_ylabel('y', fontsize=10)\nax.grid(True, linestyle='--', alpha=0.4)\n\n# --- Right panel: D = 0, coincident lines (infinitely many solutions) ---\nax = axes[2]\nax.set_facecolor('white')\ny5 = (4 - 2*x) / 1          # 2x + y = 4\ny6 = (8 - 4*x) / 2          # 4x + 2y = 8  (same line)\nax.plot(x, y5, color='#1f77b4', linewidth=3.5, label=r'$2x+y=4$', zorder=2)\nax.plot(x, y6, color='#d62728', linewidth=1.5, linestyle='--', label=r'$4x+2y=8$', zorder=3)\nax.set_xlim(-2, 4)\nax.set_ylim(-2, 6)\nax.axhline(0, color='#aaaaaa', linewidth=0.8)\nax.axvline(0, color='#aaaaaa', linewidth=0.8)\nax.set_title(r'$D = 0$: Same Line ($\\infty$ Solutions)', fontsize=11, fontweight='bold', color='#b22222', pad=10)\nax.legend(fontsize=9, loc='upper right')\nax.set_xlabel('x', fontsize=10)\nax.set_ylabel('y', fontsize=10)\nax.grid(True, linestyle='--', alpha=0.4)\n\n# Shared note at bottom\nfig.text(0.5, -0.04,\n         r'Both middle and right cases give $D = 0$ — but they represent different system behaviors.',\n         ha='center', fontsize=11, color='#555555', style='italic')\n\nplt.tight_layout()\nplt.savefig('generated/B.4-5.png', dpi=150, bbox_inches='tight')\n",
      "output_path": "generated/B.4-5.png",
      "caption": "Left: \\(D \\neq 0\\) — two lines cross at exactly one point, Cramer's Rule applies. Middle: \\(D = 0\\) — parallel lines, no solution. Right: \\(D = 0\\) — coincident lines, infinitely many solutions. Both middle and right cases block Cramer's Rule, but for different geometric reasons."
    },
    {
      "type": "text_explanation",
      "content": "## 2. When Cramer's Rule Works — and When It Does Not\n\nA critical distinction that separates strong exam answers from weak ones:\n\n> **\\(D = 0\\) does not mean the system has no solution. It means the system has no *unique* solution.**\n\nWhen \\(D = 0\\), two distinct situations are possible:\n\n| Situation | Geometry | Solutions |\n|---|---|---|\n| Parallel, distinct lines | Lines never meet | No solution (inconsistent) |\n| Same line written twice | Lines overlap entirely | Infinitely many solutions (dependent) |\n\nBoth cases give \\(D = 0\\), but they are fundamentally different. You must investigate further — for example by checking whether the constant terms are proportional — to classify the system.\n\n### EXAM-FACING STATEMENT\n\nBefore classifying the system, always write:\n\n> *\"Since \\(D = 0\\), Cramer's Rule is not applicable for a unique solution.\"*\n\nThen proceed to determine whether the system is inconsistent or dependent. Vague statements like *\"the rule fails\"* without explanation will cost marks. Precision here is what separates a good answer from a top-scoring one."
    },
    {
      "type": "section_summary",
      "bullets": [
        "Cramer's Rule gives a unique solution only when the denominator determinant \\(D = ad - bc \\neq 0\\).",
        "Build \\(D_x\\) by replacing the x-column with constants, and \\(D_y\\) by replacing the y-column — one column changes each time.",
        "\\(D = 0\\) means no unique solution exists — not automatically no solution; the system may be inconsistent or dependent."
      ],
      "transition": "In the next section we will extend determinant methods to larger systems and explore how matrix properties govern the existence and uniqueness of solutions more generally."
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
          "id": "determinant_validity_test",
          "label": "Checking whether Cramer's Rule gives a unique solution",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "For the system \\(ax + by = e\\) and \\(cx + dy = f\\), when does Cramer's Rule give a unique solution?",
              "options": [
                "A. When \\(ad + bc \\neq 0\\)",
                "B. When \\(ad - bc \\neq 0\\)",
                "C. When \\(a + d \\neq 0\\)",
                "D. Whenever the system has constants on the right-hand side"
              ],
              "correct_option": "B",
              "explanation": "The denominator determinant is \\(D = ad - bc\\). A unique solution by Cramer's Rule requires \\(D \\neq 0\\).",
              "wrong_option_explanations": {
                "A": "\\(ad + bc\\) is not the 2×2 determinant formula — the correct formula uses subtraction.",
                "C": "The trace \\(a + d\\) is unrelated to Cramer's Rule validity here.",
                "D": "Having constants on the right does not guarantee a unique solution; the determinant of the coefficient matrix must also be nonzero."
              },
              "hint": "Recall the 2×2 determinant pattern exactly: it is \\(ad - bc\\), not a sum.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "If \\(D = 0\\) for a 2×2 system, which statement is always safe?",
              "options": [
                "A. The system has no solution.",
                "B. The system has infinitely many solutions.",
                "C. The system has no unique solution.",
                "D. The system still has a unique solution if \\(D_x\\) and \\(D_y\\) are nonzero."
              ],
              "correct_option": "C",
              "explanation": "\\(D = 0\\) means the system does not have a unique solution by Cramer's Rule. It could be inconsistent (no solution) or dependent (infinitely many solutions) — further investigation is required.",
              "wrong_option_explanations": {
                "A": "Not always true; some systems with \\(D = 0\\) have infinitely many solutions (coincident lines).",
                "B": "Not always true; some systems with \\(D = 0\\) have no solution (parallel lines).",
                "D": "A unique solution requires \\(D \\neq 0\\); the values of \\(D_x\\) and \\(D_y\\) are irrelevant when \\(D = 0\\)."
              },
              "hint": "Carefully separate 'no unique solution' from 'no solution at all' — they are not the same claim.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "column_replacement_pattern",
          "label": "Building Dx and Dy correctly",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "For \\(ax + by = e\\) and \\(cx + dy = f