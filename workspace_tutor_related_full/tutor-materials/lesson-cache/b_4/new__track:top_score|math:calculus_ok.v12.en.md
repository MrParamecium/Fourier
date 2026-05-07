```json
{
  "section_id": "B.4 Cramer's Rule",
  "section_title": "B.4 Cramer's Rule",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.4 Cramer's Rule\n\n> **Section Objective:** Learn to solve 2×2 linear systems using determinants, recognize when the method applies, and avoid the setup mistakes that cost marks on exams.\n\n---\n\n## Overview: What This Section Is For\n\nConsider the system: **2x + y = 5** and **x − y = 1**. You could use substitution or elimination — but Cramer's Rule gives you a direct, determinant-based shortcut that is compact, procedural, and easy to check. Examiners favor it because every step is visible and gradable.\n\nIn this section you will learn how to set up the coefficient determinant, how to form the numerator determinants for each unknown, and how to read off the solution as a clean ratio. One condition governs everything: **the method only works when the coefficient determinant is not zero.** Keep that in mind from the start."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use this to memorize the pattern fast: original determinant below, replaced-column determinant above.",
        "standard": "Use this to connect each formula to the matching unknown step by step.",
        "top_score": "Use this to contrast correct replacement with the easy-to-miss wrong-column trap."
      },
      "script": "import matplotlib.pyplot as plt\nimport matplotlib.patches as mpatches\nfrom matplotlib.patches import FancyArrowPatch\n\nfig, axes = plt.subplots(1, 3, figsize=(14, 5))\nfig.patch.set_facecolor('white')\n\ndef draw_matrix(ax, rows, title, color='black', highlight_col=None):\n    ax.set_xlim(0, 4)\n    ax.set_ylim(0, 5)\n    ax.axis('off')\n    ax.set_title(title, fontsize=13, fontweight='bold', pad=12, color=color)\n\n    # Draw bracket lines\n    bracket_color = '#333333'\n    lw = 2.5\n    # Left bracket\n    ax.plot([0.55, 0.4, 0.4, 0.55], [3.9, 3.9, 1.1, 1.1], color=bracket_color, lw=lw)\n    # Right bracket\n    ax.plot([3.45, 3.6, 3.6, 3.45], [3.9, 3.9, 1.1, 1.1], color=bracket_color, lw=lw)\n\n    col_x = [1.2, 2.8]\n    row_y = [3.2, 1.8]\n\n    for r, row in enumerate(rows):\n        for c, val in enumerate(row):\n            fc = '#d0f0d0' if highlight_col is not None and c == highlight_col else 'white'\n            rect = mpatches.FancyBboxPatch(\n                (col_x[c] - 0.45, row_y[r] - 0.45), 0.9, 0.9,\n                boxstyle='round,pad=0.05',\n                linewidth=1.2,\n                edgecolor='#aaaaaa',\n                facecolor=fc\n            )\n            ax.add_patch(rect)\n            ax.text(col_x[c], row_y[r], val, ha='center', va='center',\n                    fontsize=15, fontfamily='DejaVu Sans', color='#111111')\n\n# Panel 0: Original A\ndraw_matrix(axes[0],\n            [['a', 'b'], ['c', 'd']],\n            r'$\\Delta = \\det(A)$',\n            color='#1a1a8c')\naxes[0].text(2.0, 0.55, r'$\\Delta = ad - bc$', ha='center', va='center',\n             fontsize=12, color='#1a1a8c',\n             bbox=dict(boxstyle='round,pad=0.3', facecolor='#e8e8ff', edgecolor='#1a1a8c', lw=1.2))\naxes[0].text(2.0, 4.65, 'Coefficient Matrix', ha='center', va='center',\n             fontsize=10, color='#555555', style='italic')\n\n# Panel 1: Dx — replace column 0 with constants\ndraw_matrix(axes[1],\n            [['e', 'b'], ['f', 'd']],\n            r'$\\Delta_x = \\det(D_x)$',\n            color='#1a7a1a',\n            highlight_col=0)\naxes[1].text(2.0, 0.55, r'$x = \\Delta_x \\,/\\, \\Delta$', ha='center', va='center',\n             fontsize=12, color='#1a7a1a',\n             bbox=dict(boxstyle='round,pad=0.3', facecolor='#e8ffe8', edgecolor='#1a7a1a', lw=1.2))\naxes[1].annotate('', xy=(1.2, 2.5), xytext=(1.2, 4.3),\n                 arrowprops=dict(arrowstyle='->', color='#1a7a1a', lw=2.0))\naxes[1].text(1.2, 4.55, 'replace\\nx-column', ha='center', va='center',\n             fontsize=9, color='#1a7a1a', fontweight='bold')\n\n# Panel 2: Dy — replace column 1 with constants\ndraw_matrix(axes[2],\n            [['a', 'e'], ['c', 'f']],\n            r'$\\Delta_y = \\det(D_y)$',\n            color='#8a1a1a',\n            highlight_col=1)\naxes[2].text(2.0, 0.55, r'$y = \\Delta_y \\,/\\, \\Delta$', ha='center', va='center',\n             fontsize=12, color='#8a1a1a',\n             bbox=dict(boxstyle='round,pad=0.3', facecolor='#ffe8e8', edgecolor='#8a1a1a', lw=1.2))\naxes[2].annotate('', xy=(2.8, 2.5), xytext=(2.8, 4.3),\n                 arrowprops=dict(arrowstyle='->', color='#8a1a1a', lw=2.0))\naxes[2].text(2.8, 4.55, 'replace\\ny-column', ha='center', va='center',\n             fontsize=9, color='#8a1a1a', fontweight='bold')\n\nfig.suptitle(\"Cramer's Rule — 2×2 Structure\", fontsize=15, fontweight='bold', y=1.01, color='#111111')\nplt.tight_layout(pad=1.5)\nplt.savefig('generated/B.4-2.png', dpi=150, bbox_inches='tight', facecolor='white')",
      "output_path": "generated/B.4-2.png",
      "caption": "Cramer's Rule structure: the denominator is always det(A). For x, replace the first column with the constants; for y, replace the second column. The highlighted (green/red) cells show exactly which column is swapped."
    },
    {
      "type": "math_block",
      "latex": "\\Delta=\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}=ad-bc,\\quad x=\\frac{\\Delta_x}{\\Delta},\\quad y=\\frac{\\Delta_y}{\\Delta}",
      "explanation": "Here, **Δ** is the determinant of the original coefficient matrix — it is computed once and reused as the denominator for both unknowns. **Δ_x** is formed by replacing only the first column (the x-coefficients) with the constants column; **Δ_y** is formed by replacing only the second column (the y-coefficients) with the constants column. Two critical warnings: do **not** replace a row instead of a column, and do **not** replace both columns at once — either mistake produces a completely invalid determinant."
    },
    {
      "type": "text_explanation",
      "content": "---\n\n## 1. How to Apply Cramer's Rule Correctly\n\nWork through the system **2x + y = 5** and **x − y = 1** step by step.\n\n**Step 1 — Coefficient determinant:**\n\n$$\\Delta = \\begin{vmatrix}2 & 1 \\\\ 1 & -1\\end{vmatrix} = (2)(-1) - (1)(1) = -3$$\n\n**Step 2 — Numerator for x** (replace the x-column with constants):\n\n$$\\Delta_x = \\begin{vmatrix}5 & 1 \\\\ 1 & -1\\end{vmatrix} = (5)(-1) - (1)(1) = -6$$\n\n**Step 3 — Numerator for y** (replace the y-column with constants):\n\n$$\\Delta_y = \\begin{vmatrix}2 & 5 \\\\ 1 & 1\\end{vmatrix} = (2)(1) - (5)(1) = -3$$\n\n**Step 4 — Solve:**\n\n$$x = \\frac{-6}{-3} = 2, \\qquad y = \\frac{-3}{-3} = 1$$\n\n**Answer: (x, y) = (2, 1)**\n\n### SOLVE CHECKLIST\n\n1. Identify the coefficient matrix and write it clearly.\n2. Compute Δ **first** — if it is zero, stop immediately.\n3. Replace exactly one matching column per unknown.\n4. Divide each numerator determinant by Δ.\n5. Verify in the original equations if time permits.\n\n### TOP-SCORE NOTE\n\nOn exams, students lose marks more often from a wrong determinant setup — swapped columns, wrong sign, or misread coefficients — than from arithmetic errors in the final multiplication."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "trap_exposure",
      "mode_specific_visual_use": {
        "cram": "Use this to spot the most common wrong setup immediately under pressure.",
        "standard": "Use this to compare a correct determinant replacement with incorrect variants.",
        "top_score": "Use this to emphasize answer-safe precision: wrong column, row replacement, and zero denominator are distinct errors."
      },
      "script": "import matplotlib.pyplot as plt\nimport matplotlib.patches as mpatches\n\nfig, axes = plt.subplots(1, 4, figsize=(16, 5))\nfig.patch.set_facecolor('white')\n\ndef draw_panel(ax, rows, title, title_color, status, highlight_cells=None, highlight_color='#d0f0d0'):\n    ax.set_xlim(0, 4)\n    ax.set_ylim(0, 6)\n    ax.axis('off')\n\n    # Status badge\n    badge_color = '#1a7a1a' if status == 'correct' else '#cc2222'\n    badge_text = '\\u2713  CORRECT' if status == 'correct' else '\\u2717  WRONG'\n    badge_fc = '#e8ffe8' if status == 'correct' else '#ffe8e8'\n    ax.text(2.0, 5.55, badge_text, ha='center', va='center', fontsize=11,\n            fontweight='bold', color=badge_color,\n            bbox=dict(boxstyle='round,pad=0.35', facecolor=badge_fc,\n                      edgecolor=badge_color, lw=1.8))\n\n    ax.set_title(title, fontsize=11, fontweight='bold', color=title_color, pad=8)\n\n    # Brackets\n    lw = 2.5\n    bc = '#333333'\n    ax.plot([0.55, 0.4, 0.4, 0.55], [4.1, 4.1, 1.3, 1.3], color=bc, lw=lw)\n    ax.plot([3.45, 3.6, 3.6, 3.45], [4.1, 4.1, 1.3, 1.3], color=bc, lw=lw)\n\n    col_x = [1.2, 2.8]\n    row_y = [3.4, 2.0]\n\n    for r, row in enumerate(rows):\n        for c, val in enumerate(row):\n            cell_key = (r, c)\n            fc = highlight_color if (highlight_cells and cell_key in highlight_cells) else 'white'\n            ec = '#888888'\n            rect = mpatches.FancyBboxPatch(\n                (col_x[c] - 0.45, row_y[r] - 0.45), 0.9, 0.9,\n                boxstyle='round,pad=0.05',\n                linewidth=1.2, edgecolor=ec, facecolor=fc\n            )\n            ax.add_patch(rect)\n            ax.text(col_x[c], row_y[r], val, ha='center', va='center',\n                    fontsize=14, color='#111111')\n\n    # Wrong X overlay\n    if status == 'wrong':\n        ax.plot([0.5, 3.5], [1.1, 4.3], color='#cc2222', lw=2.5, alpha=0.35)\n        ax.plot([3.5, 0.5], [1.1, 4.3], color='#cc2222', lw=2.5, alpha=0.35)\n\n# Panel 0: Correct for x\ndraw_panel(axes[0],\n           [['e', 'b'], ['f', 'd']],\n           'Correct: solving for x',\n           '#1a7a1a', 'correct',\n           highlight_cells={(0,0),(1,0)}, highlight_color='#c8f0c8')\naxes[0].text(2.0, 0.75, 'Replace x-column\\nwith constants', ha='center', va='center',\n             fontsize=9, color='#1a7a1a', style='italic')\n\n# Panel 1: Wrong — replaced row\ndraw_panel(axes[1],\n           [['e', 'f'], ['c', 'd']],\n           'Wrong: replaced a row',\n           '#cc2222', 'wrong',\n           highlight_cells={(0,0),(0,1)}, highlight_color='#ffd0d0')\naxes[1].text(2.0, 0.75, 'Row replaced —\\nstructure destroyed', ha='center', va='center',\n             fontsize=9, color='#cc2222', style='italic')\n\n# Panel 2: Wrong — replaced both columns\ndraw_panel(axes[2],\n           [['e', 'e'], ['f', 'f']],\n           'Wrong: both columns replaced',\n           '#cc2222', 'wrong',\n           highlight_cells={(0,0),(1,0),(0,1),(1,1)}, highlight_color='#ffd0d0')\naxes[2].text(2.0, 0.75, 'Both columns swapped —\\ncompletely invalid', ha='center', va='center',\n             fontsize=9, color='#cc2222', style='italic')\n\n# Panel 3: Warning badge — Delta = 0\naxes[3].set_xlim(0, 4)\naxes[3].set_ylim(0, 6)\naxes[3].axis('off')\naxes[3].set_title('Special Case', fontsize=11, fontweight='bold', color='#8a5a00', pad=8)\n\nwarn_box = mpatches.FancyBboxPatch((0.2, 1.2), 3.6, 3.8,\n    boxstyle='round,pad=0.15', linewidth=2.5,\n    edgecolor='#cc8800', facecolor='#fff8e0')\naxes[3].add_patch(warn_box)\naxes[3].text(2.0, 4.55, '\\u26a0  WARNING', ha='center', va='center',\n             fontsize=12, fontweight='bold', color='#cc8800')\naxes[3].text(2.0, 3.5, r'If $\\Delta = 0$:', ha='center', va='center',\n             fontsize=13, color='#8a5a00', fontweight='bold')\naxes[3].text(2.0, 2.65, \"Cramer's Rule\", ha='center', va='center',\n             fontsize=11, color='#8a5a00')\naxes[3].text(2.0, 2.05, 'does not apply.', ha='center', va='center',\n             fontsize=11, color='#8a5a00')\naxes[3].text(2.0, 1.45, 'Further analysis\\nrequired.', ha='center', va='center',\n             fontsize=10, color='#8a5a00', style='italic')\n\nfig.suptitle(\"Common Setup Mistakes in Cramer's Rule\", fontsize=14, fontweight='bold', y=1.01)\nplt.tight_layout(pad=1.5)\nplt.savefig('generated/B.4-5.png', dpi=150, bbox_inches='tight', facecolor='white')",
      "output_path": "generated/B.4-5.png",
      "caption": "Left to right: the correct column replacement for x; two wrong setups (row replaced, both columns replaced); and the zero-determinant warning. Red X overlays mark invalid configurations."
    },
    {
      "type": "text_explanation",
      "content": "---\n\n## 2. When the Method Fails and What Examiners Expect You to Say\n\nCramer's Rule requires dividing by Δ. If **Δ = 0**, that division is impossible, so the rule cannot produce a unique solution formula. The method is simply not applicable in that case.\n\n### THREE IDEAS TO KEEP SEPARATE\n\n| Term | Meaning |\n|---|---|\n| **Cramer's Rule is usable** | Δ ≠ 0; the formulas are valid |\n| **Unique solution exists** | Exactly one (x, y) satisfies both equations |\n| **Further case analysis needed** | Δ = 0; could be no solution or infinitely many |\n\n#### Key Point\n\nΔ = 0 does **not** automatically mean the system has no solution. It may have no solution, or it may have infinitely many solutions — you cannot tell from Δ alone. More analysis (e.g., row reduction) is required.\n\n### EXAM-SAFE WORDING\n\n> **Write this when Δ = 0:** \"Since Δ = 0, Cramer's Rule is not applicable for obtaining a unique solution.\"\n\n### TOP-SCORE INSIGHT\n\nAlways compute Δ **first**. If it is zero, you stop immediately and save all the work of computing Δ_x and Δ_y — work that would be meaningless anyway. Checking Δ first is not just correct procedure; it is efficient exam strategy."
    },
    {
      "type": "analogy",
      "content": "Think of the coefficient matrix as a **mold** used to cast a solution. The constants column is the material you pour in. When you solve for x, you swap the material into the x-slot of the mold only, leaving the y-slot untouched; when you solve for y, you swap it into the y-slot only. The denominator — the determinant of the original mold — tells you whether the mold holds its shape at all. If that determinant is zero, the mold has collapsed: it has no rigid structure, and no amount of pouring will produce a clean, unique result. The shortcut fails not because your arithmetic is wrong, but because the underlying structure cannot support a unique answer."
    },
    {
      "type": "section_summary",
      "bullets": [
        "Cramer's Rule solves 2×2 systems by replacing one column per unknown and dividing by the coefficient determinant.",
        "The denominator Δ is always the original coefficient determinant — never the numerator determinant.",
        "If Δ = 0, Cramer's Rule is not applicable; the system needs further analysis for solution type."
      ],
      "transition": "In the next section we will build on this method to solve larger or related systems."
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
          "id": "formula_structure",
          "label": "Core Cramer's Rule setup for a 2×2 system",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "For the system ax + by = e and cx + dy = f, which formula for x is correct?",
              "options": [
                "A. x = \\frac{\\begin{vmatrix}e&b\\\\f&d\\end{vmatrix}}{\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}}",
                "B. x = \\frac{\\begin{vmatrix}a&e\\\\c&f\\end{vmatrix}}{\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}}",
                "C. x = \\frac{\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}}{\\begin{vmatrix}e&b\\\\f&d\\end{vmatrix}}",
                "D. x = \\frac{\\begin{vmatrix}e&f\\\\b&d\\end{vmatrix}}{\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}}"
              ],
              "correct_option": "A",
              "explanation": "