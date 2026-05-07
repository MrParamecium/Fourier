```json
{
  "section_id": "B.4",
  "section_title": "B.4 Cramer's Rule",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.4 Cramer's Rule\n\n> **Section Objective:** Master the determinant-based pattern for solving small linear systems quickly and accurately under exam conditions.\n\n---\n\nCramer's Rule is a high-frequency exam tool for solving 2-by-2 (and 3-by-3) linear systems using determinants. **What gets tested:** setting up the correct determinants and dividing accurately. **What to memorize:** the column-replacement pattern — replace the target variable's column with the constants, then divide by the main determinant. **What to recognize:** use Cramer's Rule when the number of equations equals the number of unknowns and the main determinant D is not zero.\n\n### HIGH-FREQUENCY TRAPS\n\nTwo mistakes dominate exam errors: replacing the wrong column (e.g., swapping x-column and y-column), and forgetting to divide D_x or D_y by D. Both cost full marks."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "exam_pattern_anchor",
      "mode_specific_visual_use": {
        "cram": "Burn in the three-step pattern visually: main determinant, replace one column, divide.",
        "standard": "Show how the algebraic system becomes matrix replacements for each variable.",
        "top_score": "Use the side-by-side layout to expose the wrong-column replacement trap."
      },
      "script": "import matplotlib.pyplot as plt\nimport matplotlib.patches as mpatches\nfrom matplotlib.patches import FancyArrowPatch\nimport numpy as np\n\nfig, ax = plt.subplots(figsize=(12, 5))\nax.set_xlim(0, 12)\nax.set_ylim(0, 5)\nax.axis('off')\nfig.patch.set_facecolor('white')\n\ndef draw_matrix_2x2(ax, x_center, y_center, rows, label, sublabel, color='#1a1a2e'):\n    col_gap = 0.55\n    row_gap = 0.55\n    font_size = 13\n    bracket_h = 1.3\n    bracket_w = 0.18\n    bracket_x_left = x_center - col_gap - 0.35\n    bracket_x_right = x_center + col_gap + 0.35\n    bracket_y_bottom = y_center - row_gap * 0.5 - 0.15\n    bracket_y_top = y_center + row_gap * 0.5 + 0.15\n\n    # Left bracket\n    ax.plot([bracket_x_left + bracket_w, bracket_x_left, bracket_x_left, bracket_x_left + bracket_w],\n            [bracket_y_top, bracket_y_top, bracket_y_bottom, bracket_y_bottom],\n            color=color, linewidth=2.2)\n    # Right bracket\n    ax.plot([bracket_x_right - bracket_w, bracket_x_right, bracket_x_right, bracket_x_right - bracket_w],\n            [bracket_y_top, bracket_y_top, bracket_y_bottom, bracket_y_bottom],\n            color=color, linewidth=2.2)\n\n    positions = [\n        (x_center - col_gap, y_center + row_gap * 0.5),\n        (x_center + col_gap, y_center + row_gap * 0.5),\n        (x_center - col_gap, y_center - row_gap * 0.5),\n        (x_center + col_gap, y_center - row_gap * 0.5),\n    ]\n    entries = [rows[0][0], rows[0][1], rows[1][0], rows[1][1]]\n    for (px, py), entry in zip(positions, entries):\n        ax.text(px, py, entry, ha='center', va='center', fontsize=font_size,\n                fontweight='bold', color=color, fontfamily='monospace')\n\n    ax.text(x_center, y_center + 1.55, label, ha='center', va='center',\n            fontsize=15, fontweight='bold', color='#c0392b')\n    ax.text(x_center, y_center - 1.35, sublabel, ha='center', va='center',\n            fontsize=9.5, color='#555555', style='italic')\n\n# Highlight boxes for replaced columns\ndef draw_highlight_box(ax, x_center, y_center, col='left', color='#e74c3c'):\n    col_gap = 0.55\n    row_gap = 0.55\n    if col == 'left':\n        bx = x_center - col_gap - 0.28\n    else:\n        bx = x_center + col_gap - 0.28\n    by = y_center - row_gap * 0.5 - 0.22\n    rect = mpatches.FancyBboxPatch((bx, by), 0.56, row_gap + 0.44,\n                                    boxstyle='round,pad=0.04',\n                                    linewidth=2, edgecolor=color,\n                                    facecolor='#fdecea', zorder=0)\n    ax.add_patch(rect)\n\n# --- Matrix D ---\ndraw_matrix_2x2(ax, x_center=2.0, y_center=2.5,\n                rows=[['a\u2081', 'b\u2081'], ['a\u2082', 'b\u2082']],\n                label='D',\n                sublabel='Main determinant\\n(coefficient matrix)')\n\n# Arrow D -> D_x\nax.annotate('', xy=(4.55, 2.5), xytext=(3.45, 2.5),\n            arrowprops=dict(arrowstyle='->', color='#2c3e50', lw=2.0))\n\n# --- Matrix D_x ---\ndraw_highlight_box(ax, x_center=5.8, y_center=2.5, col='left', color='#e74c3c')\ndraw_matrix_2x2(ax, x_center=5.8, y_center=2.5,\n                rows=[['c\u2081', 'b\u2081'], ['c\u2082', 'b\u2082']],\n                label='D\u2093',\n                sublabel='Replace x-column\\nwith constants')\n\n# Arrow D_x -> D_y\nax.annotate('', xy=(8.35, 2.5), xytext=(7.25, 2.5),\n            arrowprops=dict(arrowstyle='->', color='#2c3e50', lw=2.0))\n\n# --- Matrix D_y ---\ndraw_highlight_box(ax, x_center=9.6, y_center=2.5, col='right', color='#2980b9')\ndraw_matrix_2x2(ax, x_center=9.6, y_center=2.5,\n                rows=[['a\u2081', 'c\u2081'], ['a\u2082', 'c\u2082']],\n                label='D\u1d67',\n                sublabel='Replace y-column\\nwith constants')\n\n# Bottom formula bar\nax.add_patch(mpatches.FancyBboxPatch((1.0, 0.12), 10.0, 0.62,\n             boxstyle='round,pad=0.05', linewidth=1.5,\n             edgecolor='#2c3e50', facecolor='#eaf4fb'))\nax.text(6.0, 0.44,\n        r'$x = D_x \\,/\\, D$          $y = D_y \\,/\\, D$',\n        ha='center', va='center', fontsize=13, fontweight='bold',\n        color='#1a1a2e')\n\nplt.tight_layout()\nplt.savefig('generated/B.4-1.png', dpi=150, bbox_inches='tight')\n",
      "output_path": "generated/B.4-1.png",
      "caption": "The three-step Cramer's Rule pattern: D is the original coefficient determinant; D_x replaces the x-column with constants (red highlight); D_y replaces the y-column with constants (blue highlight). Each variable equals its determinant divided by D."
    },
    {
      "type": "text_explanation",
      "content": "## 1. The Solving Pattern\n\nFor a 2-variable system, apply Cramer's Rule in four steps:\n\n1. **Write D** — form the 2×2 determinant from the coefficient matrix and compute it.\n2. **Form D_x** — replace the x-coefficient column with the constants column; compute the determinant.\n3. **Form D_y** — replace the y-coefficient column with the constants column; compute the determinant.\n4. **Divide** — x = D_x / D and y = D_y / D.\n\n> **Warning:** The constants replace only the target variable's coefficient column — not an entire equation row. Replacing a row is a different operation and will give the wrong answer.\n\n#### Exam Shortcut\n\nIf D is easy to compute and nonzero, Cramer's Rule is often faster than elimination for small systems."
    },
    {
      "type": "math_block",
      "latex": "D=\\begin{vmatrix}a_1&b_1\\\\a_2&b_2\\end{vmatrix},\\quad D_x=\\begin{vmatrix}c_1&b_1\\\\c_2&b_2\\end{vmatrix},\\quad D_y=\\begin{vmatrix}a_1&c_1\\\\a_2&c_2\\end{vmatrix},\\quad x=\\frac{D_x}{D},\\ y=\\frac{D_y}{D}",
      "explanation": "Each variable equals its own replaced-column determinant — where the constants take the place of that variable's coefficients — divided by the original coefficient determinant D."
    },
    {
      "type": "text_explanation",
      "content": "## 2. When It Works and When It Fails\n\nCramer's Rule gives a **unique solution only when D ≠ 0**. If D = 0, stop immediately — do not attempt to divide. The rule cannot produce a unique answer, and the system may have no solution or infinitely many solutions; you cannot determine which without further analysis.\n\n### EXAM DECISION RULE\n\nFor **parameter questions** of the form \"for what value of k does the system have a unique solution?\", set D ≠ 0 and solve that inequality or exclusion condition. Present the answer as a clean condition, e.g., \"unique solution for k ≠ 3.\"\n\n> **Trap:** D_x = 0 or D_y = 0 alone does not mean the method fails. A zero numerator simply means that variable equals zero — the method is still valid as long as D ≠ 0."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "trap_exposure",
      "mode_specific_visual_use": {
        "cram": "Use the flowchart to decide instantly: D nonzero means proceed, D zero means stop.",
        "standard": "Clarify the difference between a usable determinant test and a finished solution process.",
        "top_score": "Highlight that D_x or D_y can be zero without invalidating the method; only D controls applicability."
      },
      "script": "import matplotlib.pyplot as plt\nimport matplotlib.patches as mpatches\n\nfig, ax = plt.subplots(figsize=(10, 6.5))\nax.set_xlim(0, 10)\nax.set_ylim(0, 7)\nax.axis('off')\nfig.patch.set_facecolor('white')\n\ndef draw_box(ax, x, y, w, h, text, facecolor='#eaf4fb', edgecolor='#2c3e50',\n             fontsize=11, fontweight='bold', text_color='#1a1a2e', radius=0.25):\n    rect = mpatches.FancyBboxPatch((x - w/2, y - h/2), w, h,\n                                    boxstyle=f'round,pad={radius}',\n                                    linewidth=2, edgecolor=edgecolor,\n                                    facecolor=facecolor, zorder=2)\n    ax.add_patch(rect)\n    ax.text(x, y, text, ha='center', va='center', fontsize=fontsize,\n            fontweight=fontweight, color=text_color, zorder=3,\n            multialignment='center')\n\ndef draw_arrow(ax, x1, y1, x2, y2, label='', label_side='right'):\n    ax.annotate('', xy=(x2, y2), xytext=(x1, y1),\n                arrowprops=dict(arrowstyle='->', color='#2c3e50', lw=2.0))\n    if label:\n        mx = (x1 + x2) / 2\n        my = (y1 + y2) / 2\n        offset_x = 0.22 if label_side == 'right' else -0.22\n        ax.text(mx + offset_x, my, label, ha='center', va='center',\n                fontsize=10, color='#555555', style='italic')\n\n# --- Boxes ---\n# Start\ndraw_box(ax, 5, 6.2, 3.2, 0.7, 'Linear System\\n(n equations, n unknowns)',\n         facecolor='#d5e8d4', edgecolor='#27ae60', fontsize=10.5)\n\n# Compute D\ndraw_box(ax, 5, 4.9, 3.6, 0.7, 'Compute main determinant D',\n         facecolor='#eaf4fb', edgecolor='#2980b9', fontsize=10.5)\n\n# Diamond decision\ndiamond_x, diamond_y = 5, 3.6\ndiamond_w, diamond_h = 1.5, 0.75\ndiamond = plt.Polygon(\n    [[diamond_x, diamond_y + diamond_h],\n     [diamond_x + diamond_w * 1.5, diamond_y],\n     [diamond_x, diamond_y - diamond_h],\n     [diamond_x - diamond_w * 1.5, diamond_y]],\n    closed=True, facecolor='#fef9e7', edgecolor='#f39c12', linewidth=2.2, zorder=2)\nax.add_patch(diamond)\nax.text(diamond_x, diamond_y, 'D = 0 ?', ha='center', va='center',\n        fontsize=11, fontweight='bold', color='#1a1a2e', zorder=3)\n\n# Right branch: D != 0\ndraw_box(ax, 8.0, 3.6, 2.4, 0.7, 'D \\u2260 0',\n         facecolor='#d5e8d4', edgecolor='#27ae60', fontsize=10.5, text_color='#1a6b2a')\ndraw_box(ax, 8.0, 2.4, 2.8, 0.75, 'Compute D\\u2093 and D\\u1d67',\n         facecolor='#eaf4fb', edgecolor='#2980b9', fontsize=10)\ndraw_box(ax, 8.0, 1.2, 2.8, 0.75, 'x = D\\u2093 / D,  y = D\\u1d67 / D\\nUnique solution',\n         facecolor='#d5e8d4', edgecolor='#27ae60', fontsize=10)\n\n# Left branch: D = 0\ndraw_box(ax, 2.0, 3.6, 2.4, 0.7, 'D = 0',\n         facecolor='#fdecea', edgecolor='#e74c3c', fontsize=10.5, text_color='#922b21')\ndraw_box(ax, 2.0, 2.4, 2.8, 0.85,\n         'Cramer\\'s Rule cannot\\ngive a unique solution.\\nUse another method.',\n         facecolor='#fdecea', edgecolor='#e74c3c', fontsize=9.5)\n\n# Side note box\ndraw_box(ax, 8.0, 0.1, 3.6, 0.65,\n         'Note: D\\u2093 = 0 or D\\u1d67 = 0 is fine.\\nIt just means that variable = 0.',\n         facecolor='#fef9e7', edgecolor='#f39c12', fontsize=9, fontweight='normal',\n         text_color='#7d6608', radius=0.15)\n\n# --- Arrows ---\n# Start -> Compute D\ndraw_arrow(ax, 5, 5.85, 5, 5.25)\n# Compute D -> Diamond\ndraw_arrow(ax, 5, 4.55, 5, 4.35)\n# Diamond -> D != 0 (right)\ndraw_arrow(ax, 6.5, 3.6, 6.8, 3.6, label='No', label_side='right')\n# Diamond -> D = 0 (left)\ndraw_arrow(ax, 3.5, 3.6, 3.2, 3.6, label='Yes', label_side='left')\n# Right branch chain\ndraw_arrow(ax, 8.0, 3.25, 8.0, 2.78)\ndraw_arrow(ax, 8.0, 2.03, 8.0, 1.58)\ndraw_arrow(ax, 8.0, 0.84, 8.0, 0.43)\n# Left branch chain\ndraw_arrow(ax, 2.0, 3.25, 2.0, 2.83)\n\nplt.tight_layout()\nplt.savefig('generated/B.4-5.png', dpi=150, bbox_inches='tight')\n",
      "output_path": "generated/B.4-5.png",
      "caption": "Decision flowchart for Cramer's Rule: only the main determinant D controls whether the method applies. D_x or D_y being zero is not a problem — it simply means that variable equals zero."
    },
    {
      "type": "text_explanation",
      "content": "## 3. Fast Exam Traps and Answer Framing\n\nFour things to check before writing your final answer:\n\n- **Replace the correct column only.** For x, replace the x-coefficient column. For y, replace the y-coefficient column. Never swap them or replace a row.\n- **Keep signs correct in 2×2 determinants.** The 2×2 determinant is ad − bc. A sign error here propagates directly into the final answer.\n- **Check D first.** Compute the main determinant before doing any column replacements. If D = 0, stop and state that Cramer's Rule does not apply — do not waste time computing D_x and D_y.\n- **State parameter conditions cleanly.** In parameter problems, present the final answer as a clear exclusion, for example: \"unique solution for k ≠ 3.\"\n\n### EXAM SHORTCUT\n\nIf D = k − 3, then a unique solution exists when k ≠ 3."
    },
    {
      "type": "section_summary",
      "bullets": [
        "Use Cramer's Rule only when the number of equations equals unknowns and D ≠ 0.",
        "Pattern: x = D_x / D and y = D_y / D, where D_x and D_y replace the target column with constants.",
        "If D = 0, the rule fails for uniqueness; D_x or D_y being zero alone does not invalidate the method."
      ],
      "transition": "In the next section we will apply this determinant idea to more problem types."
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
          "id": "use_condition",
          "label": "When Cramer's Rule applies",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "For a 2-by-2 linear system, when is Cramer's Rule valid for finding a unique solution?",
              "options": [
                "A. Whenever at least one determinant is easy to compute",
                "B. Whenever the main determinant D is not zero",
                "C. Whenever D_x and D_y are both nonzero",
                "D. Whenever one equation has no constant term"
              ],
              "correct_option": "B",
              "explanation": "The rule gives a unique solution only when the coefficient determinant D is nonzero.",
              "wrong_option_explanations": {
                "A": "Ease of computation is irrelevant; the key condition is D ≠ 0.",
                "C": "D_x and D_y can be zero and the rule can still work; only D controls uniqueness.",
                "D": "A missing constant term does not decide applicability."
              },
              "hint": "Check the original coefficient determinant first.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "If the main determinant D = 0, what should you conclude immediately in an exam?",
              "options": [
                "A. The system has no solution",
                "B. The system has infinitely many solutions",
                "C. Cramer's Rule does not give a unique solution",
                "D. At least one variable must be zero"
              ],
              "correct_option": "C",
              "explanation": "D = 0 means Cramer's Rule cannot produce a unique solution. The system may have no solution or infinitely many solutions, so you cannot jump to one of those outcomes immediately.",
              "wrong_option_explanations": {
                "A": "That is only one possibility, not an automatic conclusion.",
                "B": "That is also only one possibility, not guaranteed.",
                "D": "A zero main determinant does not force any