```json
{
  "section_id": "B.4 Cramer's Rule",
  "section_title": "B.4 Cramer's Rule",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.4 Cramer's Rule\n\n> **Section Objective:** Learn how to solve a 2×2 linear system using determinants — a clean, formula-driven method that is fast and organized on exams.\n\n---\n\nSuppose an exam asks you to solve two linear equations in two unknowns and show a clear, structured method. **Cramer's Rule** gives you exactly that: a direct determinant shortcut that produces each variable from a ratio of two determinants.\n\nThis section covers what the rule is, how to apply it step by step, and when it is valid. The method is especially powerful when the system is already in standard form and you want an organized, formula-driven solution.\n\n**Key preview:** First compute the determinant \\(D\\) of the coefficient matrix. Then replace one column at a time — the \\(x\\)-column to find \\(x\\), the \\(y\\)-column to find \\(y\\)."
    },
    {
      "type": "math_block",
      "latex": "\\begin{cases} a_1x+b_1y=c_1 \\\\ a_2x+b_2y=c_2 \\end{cases},\\quad D=\\begin{vmatrix} a_1 & b_1 \\\\ a_2 & b_2 \\end{vmatrix},\\quad x=\\frac{D_x}{D},\\quad y=\\frac{D_y}{D}",
      "explanation": "Cramer's Rule solves a 2×2 system by dividing a variable-specific determinant — formed by replacing the target variable's column with the constants — by the original coefficient determinant \\(D\\)."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the diagram to memorize which column gets replaced for x and which for y.",
        "standard": "Use the diagram to connect the determinant formulas to the structure of the system.",
        "top_score": "Use the diagram to expose the trap of replacing the wrong column or changing both columns."
      },
      "script": "import matplotlib.pyplot as plt\nimport matplotlib.patches as mpatches\nfrom matplotlib.patches import FancyArrowPatch\nimport numpy as np\n\nfig, axes = plt.subplots(1, 3, figsize=(12, 4))\nfig.patch.set_facecolor('white')\n\nmatrices = [\n    {\n        'title': '$D$',\n        'rows': [['$a_1$', '$b_1$'], ['$a_2$', '$b_2$']],\n        'highlight_col': None,\n        'label': 'Coefficient matrix\\n(no replacement)'\n    },\n    {\n        'title': '$D_x$',\n        'rows': [['$c_1$', '$b_1$'], ['$c_2$', '$b_2$']],\n        'highlight_col': 0,\n        'label': 'Replace x-column\\nwith constants'\n    },\n    {\n        'title': '$D_y$',\n        'rows': [['$a_1$', '$c_1$'], ['$a_2$', '$c_2$']],\n        'highlight_col': 1,\n        'label': 'Replace y-column\\nwith constants'\n    }\n]\n\nfor ax, mat in zip(axes, matrices):\n    ax.set_xlim(0, 4)\n    ax.set_ylim(0, 5)\n    ax.axis('off')\n    ax.set_facecolor('white')\n\n    # Title\n    ax.text(2, 4.5, mat['title'], ha='center', va='center',\n            fontsize=22, fontweight='bold', color='#1a1a1a')\n\n    # Draw matrix brackets\n    bracket_props = dict(linewidth=2.5, color='#1a1a1a')\n    # Left bracket\n    ax.plot([0.5, 0.3, 0.3, 0.5], [3.7, 3.7, 1.3, 1.3], **bracket_props)\n    # Right bracket\n    ax.plot([3.5, 3.7, 3.7, 3.5], [3.7, 3.7, 1.3, 1.3], **bracket_props)\n\n    col_x = [1.2, 2.8]\n    row_y = [3.1, 1.9]\n\n    for r, row in enumerate(mat['rows']):\n        for c, val in enumerate(row):\n            bg_color = '#cce5ff' if mat['highlight_col'] == c else 'white'\n            rect = mpatches.FancyBboxPatch(\n                (col_x[c] - 0.45, row_y[r] - 0.4), 0.9, 0.8,\n                boxstyle='round,pad=0.05',\n                linewidth=0,\n                facecolor=bg_color,\n                zorder=1\n            )\n            ax.add_patch(rect)\n            ax.text(col_x[c], row_y[r], val,\n                    ha='center', va='center',\n                    fontsize=16, color='#1a1a1a', zorder=2)\n\n    # Column label below highlighted column\n    if mat['highlight_col'] is not None:\n        cx = col_x[mat['highlight_col']]\n        ax.annotate('', xy=(cx, 1.1), xytext=(cx, 0.65),\n                    arrowprops=dict(arrowstyle='->', color='#0066cc', lw=2))\n        ax.text(cx, 0.45, 'constants\\ncolumn', ha='center', va='top',\n                fontsize=9, color='#0066cc', style='italic')\n\n    # Bottom label\n    ax.text(2, 0.05, mat['label'], ha='center', va='bottom',\n            fontsize=9.5, color='#444444',\n            bbox=dict(boxstyle='round,pad=0.3', facecolor='#f5f5f5',\n                      edgecolor='#cccccc', linewidth=1))\n\n# Arrows between matrices\nfig.text(0.365, 0.62, 'replace\\nx-col', ha='center', va='center',\n         fontsize=10, color='#cc4400', fontweight='bold')\nfig.text(0.365, 0.55, u'\\u2192', ha='center', va='center',\n         fontsize=22, color='#cc4400')\n\nfig.text(0.635, 0.62, 'replace\\ny-col', ha='center', va='center',\n         fontsize=10, color='#cc4400', fontweight='bold')\nfig.text(0.635, 0.55, u'\\u2192', ha='center', va='center',\n         fontsize=22, color='#cc4400')\n\nplt.suptitle(\"Cramer's Rule — Column Replacement Pattern\",\n             fontsize=13, fontweight='bold', y=1.01, color='#1a1a1a')\n\nplt.tight_layout(pad=1.5)\nplt.savefig('generated/B.4-3.png', dpi=150, bbox_inches='tight',\n            facecolor='white')\n",
      "output_path": "generated/B.4-3.png",
      "caption": "Three matrices side by side: \\(D\\) uses only coefficients; \\(D_x\\) replaces the x-column (blue) with constants; \\(D_y\\) replaces the y-column (blue) with constants. One column changes at a time."
    },
    {
      "type": "text_explanation",
      "content": "## 1. The Core Idea of Cramer's Rule\n\nApplying Cramer's Rule follows three clean steps:\n\n1. **Write the system in standard form** — all \\(x\\) and \\(y\\) terms on the left, constants on the right.\n2. **Compute the main determinant \\(D\\)** — use only the coefficient matrix. The constants \\(c_1\\) and \\(c_2\\) do **not** enter \\(D\\) itself.\n3. **Form \\(D_x\\) and \\(D_y\\) by column replacement** — to find \\(x\\), replace only the \\(x\\)-column with the constants column. To find \\(y\\), replace only the \\(y\\)-column.\n\n### COMMON MISTAKE\n\nStudents frequently lose points by replacing the **wrong column** or by accidentally mixing coefficients and constants inside \\(D\\). Remember: \\(D\\) is built from coefficients alone.\n\n#### Quick Check\n\nFor \\(D_y\\), which column should be replaced? *(Answer: the \\(y\\)-column — the second column of the coefficient matrix.)*"
    },
    {
      "type": "text_explanation",
      "content": "## 2. Representative Worked Example\n\nConsider the system:\n\n$$\n2x + y = 5 \\qquad x - y = 1\n$$\n\n**Step 1 — Standard form.** Both equations are already in standard form.\n\n**Step 2 — Compute \\(D\\).**\n\n$$\nD = \\begin{vmatrix}2 & 1\\\\1 & -1\\end{vmatrix} = (2)(-1) - (1)(1) = -2 - 1 = -3\n$$\n\n**Step 3 — Compute \\(D_x\\) and \\(D_y\\).**\n\nReplace the \\(x\\)-column with the constants \\([5,\\,1]^T\\):\n$$\nD_x = \\begin{vmatrix}5 & 1\\\\1 & -1\\end{vmatrix} = (5)(-1)-(1)(1) = -6\n$$\n\nReplace the \\(y\\)-column with the constants \\([5,\\,1]^T\\):\n$$\nD_y = \\begin{vmatrix}2 & 5\\\\1 & 1\\end{vmatrix} = (2)(1)-(5)(1) = -3\n$$\n\n**Step 4 — Final answer.**\n$$\nx = \\frac{D_x}{D} = \\frac{-6}{-3} = 2, \\qquad y = \\frac{D_y}{D} = \\frac{-3}{-3} = 1\n$$\n\n### EXAM NOTE\n\nBecause \\(D = -3 \\neq 0\\), the system has exactly one unique solution and Cramer's Rule works cleanly."
    },
    {
      "type": "math_block",
      "latex": "\\begin{aligned} 2x+y&=5 \\\\ x-y&=1 \\end{aligned} \\qquad D=\\begin{vmatrix}2&1\\\\1&-1\\end{vmatrix}=-3,\\quad D_x=\\begin{vmatrix}5&1\\\\1&-1\\end{vmatrix}=-6,\\quad D_y=\\begin{vmatrix}2&5\\\\1&1\\end{vmatrix}=-3",
      "explanation": "Dividing each replacement determinant by the original gives \\(x = D_x/D = (-6)/(-3) = 2\\) and \\(y = D_y/D = (-3)/(-3) = 1\\)."
    },
    {
      "type": "text_explanation",
      "content": "## 3. When to Use It — and When to Stop\n\nCramer's Rule is the right tool when the system is **small** (2×2 or 3×3), **neatly written in standard form**, and you want a structured, formula-driven answer that is easy to present on an exam.\n\nHowever, there is one hard boundary: **if the main determinant \\(D = 0\\), stop immediately.** The formulas \\(x = D_x/D\\) and \\(y = D_y/D\\) require division by \\(D\\), which is undefined when \\(D = 0\\). Continuing as if a unique solution exists will produce a wrong or meaningless answer.\n\n### EXAM TIP\n\nBefore doing any column-replacement work, **check \\(D\\) first.** If \\(D \\neq 0\\), proceed confidently. If \\(D = 0\\), pause — the system may have no solution or infinitely many, and a different method is required."
    },
    {
      "type": "section_summary",
      "bullets": [
        "\\(D\\) is the coefficient-matrix determinant — the denominator for both \\(x\\) and \\(y\\) formulas.",
        "Replace only the target variable's column with constants to form \\(D_x\\) or \\(D_y\\).",
        "If \\(D = 0\\), Cramer's Rule is invalid — stop and do not divide."
      ],
      "transition": "In the next section we will extend determinant methods to larger systems and explore additional applications of matrix algebra in circuit and signal analysis."
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
          "id": "kp1_structure_of_rule",
          "label": "Original determinant and replacement determinants",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "For the system \\(a_1 x + b_1 y = c_1\\) and \\(a_2 x + b_2 y = c_2\\), which determinant is the correct original determinant \\(D\\)?",
              "options": [
                "A. \\(\\begin{vmatrix}c_1 & b_1\\\\c_2 & b_2\\end{vmatrix}\\)",
                "B. \\(\\begin{vmatrix}a_1 & c_1\\\\a_2 & c_2\\end{vmatrix}\\)",
                "C. \\(\\begin{vmatrix}a_1 & b_1\\\\a_2 & b_2\\end{vmatrix}\\)",
                "D. \\(\\begin{vmatrix}x & y\\\\c_1 & c_2\\end{vmatrix}\\)"
              ],
              "correct_option": "C",
              "explanation": "The original determinant uses only the coefficient matrix — the entries \\(a_1, b_1, a_2, b_2\\) — not the constants column.",
              "wrong_option_explanations": {
                "A": "This is the \\(D_x\\) replacement pattern, not the original determinant \\(D\\).",
                "B": "This is the \\(D_y\\) replacement pattern, not the original determinant \\(D\\).",
                "D": "Variables \\(x\\) and \\(y\\) are never entries inside the determinant setup."
              },
              "hint": "Build \\(D\\) from the coefficients of \\(x\\) and \\(y\\) only — no constants allowed.",
              "needs_visual": true,
              "visual_type": "matrix_replacement_diagram",
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "Which statement correctly describes \\(D_y\\) in Cramer's Rule for a 2×2 system?",
              "options": [
                "A. Replace the \\(x\\)-column with the constants",
                "B. Replace the \\(y\\)-column with the constants",
                "C. Replace both columns with the constants",
                "D. Swap the two coefficient columns"
              ],
              "correct_option": "B",
              "explanation": "To solve for \\(y\\), keep the \\(x\\)-coefficients in place and replace only the \\(y\\)-column with the constants column.",
              "wrong_option_explanations": {
                "A": "Replacing the \\(x\\)-column creates \\(D_x\\), not \\(D_y\\).",
                "C": "Cramer's Rule replaces exactly one column at a time — never both.",
                "D": "Swapping columns changes the sign of the determinant but does not create \\(D_y\\)."
              },
              "hint": "The variable you are solving for tells you which column gets replaced.",
              "needs_visual": true,
              "visual_type": "matrix_replacement_diagram",
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "kp2_computation_example",
          "label": "Compute x and y from determinants",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "Use Cramer's Rule for the system \\(2x + y = 5\\) and \\(x - y = 1\\). What is \\(x\\)?",
              "options": [
                "A. \\(1\\)",
                "B. \\(2\\)",
                "C. \\(3\\)",
                "D. \\(-2\\)"
              ],
              "correct_option": "B",
              "explanation": "\\(D = -3\\) and \\(D_x = -6\\), so \\(x = D_x/D = (-6)/(-3) = 2\\).",
              "wrong_option_explanations": {
                "A": "\\(1\\) is the value of \\(y\\) in this example, not \\(x\\).",
                "C": "\\(3\\) does not match the determinant calculation.",
                "D": "Both the numerator and denominator are negative, so the result is positive."
              },
              "hint": "Compute \\(D\\) first, then form \\(D_x\\) by replacing the \\(x\\)-column.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "For the same system \\(2x + y = 5\\) and \\(x - y = 1\\), what is \\(y\\)?",
              "options": [
                "A. \\(-1\\)",
                "B. \\(0\\)",
                "C. \\(1\\)",
                "D. \\(2\\)"
              ],
              "correct_option": "C",
              "explanation": "\\(D = -3\\) and \\(D_y = -3\\), so \\(y = D_y/D = (-3)/(-3) = 1\\).",
              "wrong_option_explanations": {
                "A": "\\(-1\\) would result from a sign error in the determinant arithmetic.",
                "B": "\\(0\\) does not satisfy either of the original equations.",
                "D": "\\(2\\) is the value of \\(x\\), not \\(y\\)."
              },
              "hint": "Use \\(D_y/D\\) after replacing only the \\(y\\)-column with the constants.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "kp3_validity_check",
          "label": "Check whether Cramer's Rule applies cleanly",
          "importance": "high",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "What should you do first before fully applying Cramer's Rule to a 2×2 system?",
              "options": [
                "A. Compute \\(D\\) and check whether it is zero",
                "B. Add the two equations together",
                "C. Solve for \\(x\\) by elimination first",
                "D. Replace both columns with the constants"
              ],
              "correct_option": "A",
              "explanation": "The main determinant \\(D\\) is the denominator of both formulas. Checking it first tells you whether the method will yield a valid unique-solution result.",
              "wrong_option_explanations": {
                "B": "Adding equations is a step in elimination, not the required first check for Cramer's Rule.",
                "C": "Elimination is a separate method; it is not the required validity check here.",
                "D": "Cramer's Rule never replaces both columns simultaneously."
              },
              "hint": "The denominator of \\(x = D_x/D\\) controls whether the method is valid.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp3_q2",
              "type": "short_answer",
              "stem": "A student computes the main determinant and gets \\(D = 0\\). What is the correct exam-safe conclusion at this stage?",
              "ideal_answer": "Cramer's Rule does not give a unique-solution formula here because dividing by \\(D\\) is impossible when \\(D = 0\\). The student should stop and not continue using \\(x = D_x/D\\) and \\(y = D_y/D\\) as if they were valid — a unique solution is not confirmed by this method.",
              "grading_rubric": [
                "Must state that division by zero makes the formulas \\(x = D_x/D\\) and \\(y = D_y/D\\) invalid",
                "Must state that the student should stop using Cramer's Rule directly",
                "Should mention that a unique solution is not confirmed when \\(D = 0\\)"
              ],
              "explanation": "This question checks whether the student knows the method's boundary condition — not just the formula mechanics.",
              "hint": "Focus on the denominator in \\(x = D_x/D\\) and \\(y = D_y/D\\): what happens when that denominator