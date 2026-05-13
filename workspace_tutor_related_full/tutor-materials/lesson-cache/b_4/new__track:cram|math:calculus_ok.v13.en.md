```json
{
  "section_id": "B.4 Cramer's Rule",
  "section_title": "B.4 Cramer's Rule",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.4 Cramer's Rule\n\n> **Section Objective:** Master the determinant shortcut for solving 2×2 linear systems — fast, reliable, and exam-ready.\n\n---\n\nConsider the system \\(2x + y = 5\\) and \\(x - y = 1\\). Cramer's Rule gives you the solution in three mechanical steps — no elimination, no substitution.\n\n**What gets tested:** Setting up \\(D\\), \\(D_x\\), and \\(D_y\\) correctly and dividing.\n\n**What to memorize:** Replace the \\(x\\)-column with constants to get \\(D_x\\); replace the \\(y\\)-column with constants to get \\(D_y\\).\n\n**Pattern to recognize:** Original matrix → replace one column → divide.\n\n### THE THREE-STEP SPRINT\n\n1. Compute \\(D\\) from the coefficient matrix. **If \\(D = 0\\), stop — the rule does not apply.**\n2. Form \\(D_x\\) by replacing the \\(x\\)-column with the constant column; form \\(D_y\\) by replacing the \\(y\\)-column.\n3. Compute \\(x = D_x / D\\) and \\(y = D_y / D\\)."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "exam_pattern_anchor",
      "mode_specific_visual_use": {
        "cram": "Use this as the memory pattern: original matrix, replace one column, divide.",
        "standard": "Use this to connect the formulas to a worked 2x2 system step by step.",
        "top_score": "Use this to compare correct and incorrect column replacement and expose sign mistakes."
      },
      "script": "import matplotlib.pyplot as plt\nimport matplotlib.patches as mpatches\nfrom matplotlib.patches import FancyArrowPatch\nimport numpy as np\n\nfig, axes = plt.subplots(1, 3, figsize=(13, 5))\nfig.patch.set_facecolor('white')\n\nmatrix_data = [\n    {\n        'title': '$D$',\n        'subtitle': '(coefficient matrix)',\n        'rows': [['$a_1$', '$b_1$'], ['$a_2$', '$b_2$']],\n        'highlight_col': None,\n        'arrow_label': None\n    },\n    {\n        'title': '$D_x$',\n        'subtitle': '(replace x-column)',\n        'rows': [['$c_1$', '$b_1$'], ['$c_2$', '$b_2$']],\n        'highlight_col': 0,\n        'arrow_label': 'replace\\nx-column'\n    },\n    {\n        'title': '$D_y$',\n        'subtitle': '(replace y-column)',\n        'rows': [['$a_1$', '$c_1$'], ['$a_2$', '$c_2$']],\n        'highlight_col': 1,\n        'arrow_label': 'replace\\ny-column'\n    }\n]\n\nfor idx, (ax, md) in enumerate(zip(axes, matrix_data)):\n    ax.set_facecolor('white')\n    ax.set_xlim(0, 4)\n    ax.set_ylim(0, 5.5)\n    ax.axis('off')\n\n    # Title\n    ax.text(2, 5.1, md['title'], ha='center', va='center',\n            fontsize=22, fontweight='bold', color='#1a1a2e')\n    ax.text(2, 4.55, md['subtitle'], ha='center', va='center',\n            fontsize=10, color='#555555', style='italic')\n\n    # Matrix bracket left\n    bracket_left = plt.Polygon([[0.55, 1.0], [0.35, 1.0], [0.35, 3.8], [0.55, 3.8]],\n                                closed=False, fill=False,\n                                edgecolor='#1a1a2e', linewidth=2.5)\n    ax.add_patch(bracket_left)\n\n    # Matrix bracket right\n    bracket_right = plt.Polygon([[3.45, 1.0], [3.65, 1.0], [3.65, 3.8], [3.45, 3.8]],\n                                 closed=False, fill=False,\n                                 edgecolor='#1a1a2e', linewidth=2.5)\n    ax.add_patch(bracket_right)\n\n    row_y = [3.1, 1.9]\n    col_x = [1.35, 2.65]\n\n    for r, row in enumerate(md['rows']):\n        for c, val in enumerate(row):\n            bg_color = '#d0e8ff' if md['highlight_col'] == c else 'white'\n            if md['highlight_col'] == c:\n                rect = mpatches.FancyBboxPatch(\n                    (col_x[c] - 0.42, row_y[r] - 0.38), 0.84, 0.76,\n                    boxstyle='round,pad=0.05',\n                    facecolor='#cce5ff', edgecolor='#3399ff', linewidth=1.5\n                )\n                ax.add_patch(rect)\n            ax.text(col_x[c], row_y[r], val, ha='center', va='center',\n                    fontsize=17, color='#1a1a2e' if md['highlight_col'] != c else '#003399',\n                    fontweight='bold' if md['highlight_col'] == c else 'normal')\n\n    # Arrow and label for replacement columns\n    if md['arrow_label'] and idx > 0:\n        ax.annotate('', xy=(col_x[md['highlight_col']], 4.1),\n                    xytext=(col_x[md['highlight_col']], 4.35),\n                    arrowprops=dict(arrowstyle='->', color='#e63946', lw=2.0))\n        ax.text(col_x[md['highlight_col']], 4.52, md['arrow_label'],\n                ha='center', va='bottom', fontsize=9.5,\n                color='#e63946', fontweight='bold')\n\n    # Determinant vertical bars\n    ax.text(0.22, 2.5, '|', ha='center', va='center', fontsize=36, color='#1a1a2e')\n    ax.text(3.78, 2.5, '|', ha='center', va='center', fontsize=36, color='#1a1a2e')\n\n# Add formulas at the bottom center\nfig.text(0.5, 0.04,\n         r'$x = \\dfrac{D_x}{D}$          $y = \\dfrac{D_y}{D}$          $(D \\neq 0)$',\n         ha='center', va='center', fontsize=17, color='#1a1a2e',\n         bbox=dict(boxstyle='round,pad=0.5', facecolor='#f0f4ff', edgecolor='#3399ff', linewidth=1.5))\n\n# Arrows between matrices\nfor spine_x in [0.365, 0.698]:\n    fig.add_artist(mpatches.FancyArrowPatch(\n        posA=(spine_x, 0.55), posB=(spine_x + 0.295, 0.55),\n        transform=fig.transFigure,\n        arrowstyle='->', color='#888888',\n        mutation_scale=18, linewidth=1.5\n    ))\n\nplt.suptitle(\"Cramer's Rule — Column Replacement Pattern\",\n             fontsize=14, fontweight='bold', color='#1a1a2e', y=1.01)\nplt.tight_layout(rect=[0, 0.12, 1, 1])\nplt.savefig('generated/B.4-2.png', dpi=150, bbox_inches='tight', facecolor='white')\n",
      "output_path": "generated/B.4-2.png",
      "caption": "The three determinants side by side: \\(D\\) uses the coefficient matrix; \\(D_x\\) replaces the \\(x\\)-column (highlighted in blue) with constants; \\(D_y\\) replaces the \\(y\\)-column. Then \\(x = D_x/D\\) and \\(y = D_y/D\\)."
    },
    {
      "type": "math_block",
      "latex": "D=\\begin{vmatrix}a_1 & b_1 \\\\ a_2 & b_2\\end{vmatrix},\\quad D_x=\\begin{vmatrix}c_1 & b_1 \\\\ c_2 & b_2\\end{vmatrix},\\quad D_y=\\begin{vmatrix}a_1 & c_1 \\\\ a_2 & c_2\\end{vmatrix}",
      "explanation": "\\(D\\) is the determinant of the coefficient matrix; \\(D_x\\) is formed by replacing the \\(x\\)-coefficient column with the constant column \\([c_1, c_2]^T\\); and \\(D_y\\) is formed by replacing the \\(y\\)-coefficient column with the same constant column."
    },
    {
      "type": "math_block",
      "latex": "x=\\frac{D_x}{D},\\qquad y=\\frac{D_y}{D}\\qquad (D\\neq 0)",
      "explanation": "Exam rule: compute \\(D\\) first — if \\(D = 0\\), stop immediately and do not apply these formulas, because division by zero is undefined and the rule breaks down."
    },
    {
      "type": "text_explanation",
      "content": "## 1. Fast Solving Pattern for 2×2 Systems\n\n> **Worked example:** Solve \\(2x + y = 5\\) and \\(x - y = 1\\).\n\n**Step 1 — Compute \\(D\\):**\n\n$$\nD = \\begin{vmatrix}2 & 1 \\\\ 1 & -1\\end{vmatrix} = (2)(-1) - (1)(1) = -2 - 1 = -3\n$$\n\n\\(D = -3 \\neq 0\\), so the rule applies.\n\n**Step 2 — Build \\(D_x\\)** (replace the \\(x\\)-column with constants \\([5, 1]^T\\)):\n\n$$\nD_x = \\begin{vmatrix}5 & 1 \\\\ 1 & -1\\end{vmatrix} = (5)(-1) - (1)(1) = -6\n$$\n\n**Step 3 — Build \\(D_y\\)** (replace the \\(y\\)-column with constants \\([5, 1]^T\\)):\n\n$$\nD_y = \\begin{vmatrix}2 & 5 \\\\ 1 & 1\\end{vmatrix} = (2)(1) - (5)(1) = -3\n$$\n\n**Step 4 — Divide:**\n\n$$\nx = \\frac{D_x}{D} = \\frac{-6}{-3} = 2, \\qquad y = \\frac{D_y}{D} = \\frac{-3}{-3} = 1\n$$\n\n### SPEED TIP\n\nStudents lose marks more often from **replacing the wrong column** than from arithmetic. The variable name tells you which column to replace: \\(D_x\\) replaces the \\(x\\)-column, \\(D_y\\) replaces the \\(y\\)-column.\n\n> **Checkpoint:** If your denominator is \\(D\\), every numerator must come from exactly one column replacement."
    },
    {
      "type": "text_explanation",
      "content": "## 2. High-Frequency Traps\n\n> **Last-minute revision:** Four mistakes that cost marks on every exam.\n\n---\n\n- **Trap 1 — Forgetting to check \\(D \\neq 0\\).**\n  Prevention: Always compute \\(D\\) first. If \\(D = 0\\), write \"Cramer's Rule not applicable\" and stop.\n\n- **Trap 2 — Replacing a row instead of a column.**\n  Prevention: Repeat the mantra — *column replacement only*. Rows are never touched.\n\n- **Trap 3 — Replacing the wrong variable's column.**\n  Prevention: Match the subscript: \\(D_x\\) → replace column 1 (the \\(x\\)-coefficients); \\(D_y\\) → replace column 2 (the \\(y\\)-coefficients).\n\n- **Trap 4 — Sign error in \\(ad - bc\\).**\n  Prevention: Write out both diagonal products explicitly before subtracting. Never do it mentally in one step.\n\n### EXAM TIP\n\nIf you get a non-integer answer on a multiple-choice problem, recheck your \\(ad - bc\\) pairing first — that is where the sign error almost certainly lives."
    },
    {
      "type": "section_summary",
      "bullets": [
        "Always compute \\(D\\) first; if \\(D = 0\\), Cramer's Rule cannot be applied.",
        "Replace only the correct variable's column — never a row — to form \\(D_x\\) or \\(D_y\\).",
        "Divide each replacement determinant by \\(D\\) to get \\(x = D_x/D\\) and \\(y = D_y/D\\)."
      ],
      "transition": "In the next section we will use this rule in more varied systems or applications."
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
          "id": "when_cramers_rule_applies",
          "label": "Check determinant before using the rule",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "For a 2×2 system, when is Cramer's Rule directly valid?",
              "options": [
                "A. Whenever the system has two equations",
                "B. Only when the determinant of the coefficient matrix is nonzero",
                "C. Only when both equations already have the same coefficients",
                "D. Whenever the constants are nonzero"
              ],
              "correct_option": "B",
              "explanation": "Cramer's Rule requires division by \\(D\\), so the method is directly valid only when \\(D \\neq 0\\).",
              "wrong_option_explanations": {
                "A": "Two equations alone are not enough; the determinant \\(D\\) may still be zero.",
                "C": "Matching coefficients do not guarantee validity and often create a zero determinant.",
                "D": "The constants \\(c_1\\) and \\(c_2\\) do not determine whether division by \\(D\\) is allowed."
              },
              "hint": "Ask what quantity appears in the denominator of both formulas \\(x = D_x/D\\) and \\(y = D_y/D\\).",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "If \\(D = 0\\) for a system, what is the safest exam action?",
              "options": [
                "A. Still compute \\(x = D_x/D\\) and \\(y = D_y/D\\)",
                "B. Replace both columns at once",
                "C. Stop and conclude Cramer's Rule is not directly applicable",
                "D. Set \\(x = 0\\) and solve for \\(y\\)"
              ],
              "correct_option": "C",
              "explanation": "When \\(D = 0\\), the standard Cramer's Rule formulas cannot be used because they require division by zero.",
              "wrong_option_explanations": {
                "A": "This would divide by zero, which is undefined and invalid.",
                "B": "That is not part of the method and does not resolve the zero-determinant issue.",
                "D": "There is no algebraic basis for setting \\(x = 0\\) in this context."
              },
              "hint": "Think about whether the formula \\(x = D_x/D\\) still makes algebraic sense when \\(D = 0\\).",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "column_replacement_pattern",
          "label": "Build D, Dx, and Dy correctly",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "For the system \\(a_1 x + b_1 y = c_1\\) and \\(a_2 x + b_2 y = c_2\\), which matrix is \\(D_x\\)?",
              "options": [
                "A. \\(\\begin{vmatrix}a_1 & c_1 \\\\ a_2 & c_2\\end{vmatrix}\\)",
                "B. \\(\\begin{vmatrix}c_1 & b_1 \\\\ c_2 & b_2\\end{vmatrix}\\)",
                "C. \\(\\begin{vmatrix}b_1 & c_1 \\\\ b_2 & c_2\\end{vmatrix}\\)",
                "D. \\(\\begin{vmatrix}c_1 & a_1 \\\\ c_2 & a_2\\end{vmatrix}\\)"
              ],
              "correct_option": "B",
              "explanation": "\\(D_x\\) is formed by replacing the \\(x\\)-coefficient column \\([a_1, a_2]^T\\) with the constants \\([c_1, c_2]^T\\), while the \\(y\\)-column \\([b_1, b_2]^T\\) remains unchanged.",
              "wrong_option_explanations": {
                "A": "This is \\(D_y\\), not \\(D_x\\) — it replaces the \\(y\\)-column, not the \\(x\\)-column.",
                "C": "The columns are swapped; the constant column must occupy the first position for \\(D_x\\).",
                "D": "This rearranges both columns rather than replacing only the \\(x\\)-column."
              },
              "hint": "The subscript on \\(D_x\\) tells you which coefficient column gets replaced by the constants.",
              "needs_visual": true,
              "visual_type": "matrix_replacement_diagram",
              "same_point_variant": true
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "A student forms \\(D_y\\) by replacing the second row with constants. What is the mistake?",
              "options": [
                "A. \\(D_y\\) should replace a column, not a row",
                "B. \\(D_y\\) should replace both rows",
                "C. \\(D_y\\) should use the determinant of constants only",
                "D. There is no mistake"
              ],
              "correct_option": "A",
              "explanation": "In Cramer's Rule, you replace the column corresponding to the variable being solved for — never a row. Rows represent equations and must not be altered.",
              "wrong_option_explanations": {
                "B": "Replacing both rows is not part of the method at all.",
                "C": "There is no determinant formed from constants alone in the standard rule.",
                "D": "Replacing a row is a common but definite error that produces an incorrect result."
              },
              "hint": "Think 'variable column,' not 'equation row.'",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "determinant_computation_and_solution",
          "label": "Compute determinants and final values accurately",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "Solve using Cramer's Rule: \\(2x + y = 5\\) and \\(x - y = 1\\).",
              "options": [
                "A. \\(x = 2,\\ y = 1\\)",
                "B. \\(x = 1,\\ y = 2\\)",
                "C. \\(x = 3,\\ y = -1\\)",
                "D. \\(x = -2,\\ y = 1\\)"
              ],
              "correct_option": "A",
              "explanation": "\\(D = (2)(-1) - (1)(1) = -3\\). \\(D_x = (5)(-1) - (1)(1) = -6\\), so \\(x = -6 / -3 = 2\\). \\(D_y = (2)(1) - (5)(1) = -3\\), so \\(y = -3 / -3 = 1\\).",
              "wrong_option_explanations": {
                "B": "This swaps \\(x\\) and \\(y\\) and does not satisfy both equations simultaneously.",
                "C": "This likely results from a sign error in computing \\(D\\) or \\(D_x\\).",
                "D": "\\(x = -2\\) does not satisfy the first equation