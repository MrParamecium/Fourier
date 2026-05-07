```json
{
  "section_id": "B.6-1 Some Definitions and Properties",
  "section_title": "B.6-1 Some Definitions and Properties",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.6-1 Some Definitions and Properties\n\n> **Section Objective:** Recognize and apply the six most-tested matrix definitions — diagonal, identity, zero, symmetric, equality, and transpose — quickly and accurately under exam conditions.\n\n---\n\nThis section is almost entirely definition recognition. Exam questions will ask you to identify a matrix type, read index notation, or apply transpose in one step. Your fastest scoring strategy:\n\n1. **Inspect the main diagonal** — is it the only place with nonzero entries?\n2. **Mirror test** — do entries across the diagonal match?\n3. **Check size first** — before claiming equality or computing a transpose, confirm the matrix dimensions.\n\nMemorize these six names and their recognition rules cold. Every point in this section is a free point if you know the definitions."
    },
    {
      "type": "book_image",
      "source_page": "page-037",
      "fig_id": null,
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use this as the official definition snapshot: scan names, patterns, and notation fast.",
        "standard": "Use this page to connect the formal wording to the visual matrix patterns.",
        "top_score": "Use this page to distinguish closely related definitions and notation details precisely."
      },
      "caption": "This page contains the core matrix definitions — diagonal, identity, zero, symmetric, equality, and transpose — that students are most likely to be asked to identify or use directly on exams."
    },
    {
      "type": "text_explanation",
      "content": "## 1. High-Frequency Matrix Types\n\nHere are the four types you must recognize on sight:\n\n- **Diagonal matrix**: Square, with nonzero entries allowed **only on the main diagonal**. Every off-diagonal entry is zero.\n- **Identity matrix**: A diagonal matrix where every main-diagonal entry equals **1**. Denoted I or I_n.\n- **Zero matrix**: Every single entry is zero. Size can be anything.\n- **Symmetric matrix**: Must be **square**, and every entry satisfies a_ij = a_ji — meaning the matrix is a perfect mirror image across the main diagonal.\n\n### COMMON TRAP\n\nNot every square matrix is symmetric — check the mirror condition, not just the shape. Not every matrix with many zeros is diagonal — off-diagonal zeros alone do not make it diagonal if the matrix is not square.\n\n> **Memory line:** Diagonal = only the diagonal can survive. Identity = diagonal of ones. Symmetric = mirror match."
    },
    {
      "type": "math_block",
      "latex": "A = B \\iff a_{ij} = b_{ij} \\text{ for all } i \\text{ and } j",
      "explanation": "Same size is necessary but not sufficient: two matrices are equal only when they share the same order and every corresponding entry at position (i, j) matches exactly."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "trap_exposure",
      "mode_specific_visual_use": {
        "cram": "Use this diagram to memorize the row-column swap and the mirror test in seconds.",
        "standard": "Use this diagram to make transpose and symmetry visually intuitive.",
        "top_score": "Use this diagram to compare square versus non-square cases and expose property confusions."
      },
      "script": "import matplotlib.pyplot as plt\nimport matplotlib.patches as patches\nimport numpy as np\n\nfig, axes = plt.subplots(1, 3, figsize=(14, 5))\nfig.patch.set_facecolor('white')\n\n# ── Panel 1: Matrix A (2x3) ──────────────────────────────────────────────────\nax1 = axes[0]\nax1.set_xlim(0, 3)\nax1.set_ylim(0, 2)\nax1.set_aspect('equal')\nax1.axis('off')\nax1.set_title('Matrix A  (2 × 3)', fontsize=13, fontweight='bold', pad=12)\n\nlabels_A = [['a\\u2081\\u2081', 'a\\u2081\\u2082', 'a\\u2081\\u2083'],\n            ['a\\u2082\\u2081', 'a\\u2082\\u2082', 'a\\u2082\\u2083']]\n\nfor r in range(2):\n    for c in range(3):\n        rect = patches.FancyBboxPatch((c + 0.05, 1 - r + 0.05), 0.9, 0.9,\n                                      boxstyle='round,pad=0.02',\n                                      linewidth=1.5, edgecolor='#333333',\n                                      facecolor='#EEF4FB')\n        ax1.add_patch(rect)\n        ax1.text(c + 0.5, 1 - r + 0.5, labels_A[r][c],\n                 ha='center', va='center', fontsize=14, fontweight='bold', color='#1a1a2e')\n\n# bracket lines\nfor y0, y1 in [(0.02, 1.98), (0.02, 1.98)]:\n    pass\nax1.annotate('', xy=(0, 0.02), xytext=(0, 1.98),\n             arrowprops=dict(arrowstyle='-', color='black', lw=2))\nax1.annotate('', xy=(3, 0.02), xytext=(3, 1.98),\n             arrowprops=dict(arrowstyle='-', color='black', lw=2))\nax1.plot([0, 0.15], [0.02, 0.02], color='black', lw=2)\nax1.plot([0, 0.15], [1.98, 1.98], color='black', lw=2)\nax1.plot([3, 2.85], [0.02, 0.02], color='black', lw=2)\nax1.plot([3, 2.85], [1.98, 1.98], color='black', lw=2)\n\n# ── Panel 2: Transpose A^T (3x2) ────────────────────────────────────────────\nax2 = axes[1]\nax2.set_xlim(0, 2)\nax2.set_ylim(0, 3)\nax2.set_aspect('equal')\nax2.axis('off')\nax2.set_title('Transpose A\\u1d40  (3 × 2)', fontsize=13, fontweight='bold', pad=12)\n\nlabels_AT = [['a\\u2081\\u2081', 'a\\u2082\\u2081'],\n             ['a\\u2081\\u2082', 'a\\u2082\\u2082'],\n             ['a\\u2081\\u2083', 'a\\u2082\\u2083']]\n\nfor r in range(3):\n    for c in range(2):\n        rect = patches.FancyBboxPatch((c + 0.05, 2 - r + 0.05), 0.9, 0.9,\n                                      boxstyle='round,pad=0.02',\n                                      linewidth=1.5, edgecolor='#333333',\n                                      facecolor='#FFF3E0')\n        ax2.add_patch(rect)\n        ax2.text(c + 0.5, 2 - r + 0.5, labels_AT[r][c],\n                 ha='center', va='center', fontsize=14, fontweight='bold', color='#1a1a2e')\n\nax2.annotate('', xy=(0, 0.02), xytext=(0, 2.98),\n             arrowprops=dict(arrowstyle='-', color='black', lw=2))\nax2.annotate('', xy=(2, 0.02), xytext=(2, 2.98),\n             arrowprops=dict(arrowstyle='-', color='black', lw=2))\nax2.plot([0, 0.15], [0.02, 0.02], color='black', lw=2)\nax2.plot([0, 0.15], [2.98, 2.98], color='black', lw=2)\nax2.plot([2, 1.85], [0.02, 0.02], color='black', lw=2)\nax2.plot([2, 1.85], [2.98, 2.98], color='black', lw=2)\n\nax2.text(1, -0.35, 'Row i of A  \\u2192  Column i of A\\u1d40',\n         ha='center', va='center', fontsize=9.5, color='#555555', style='italic')\n\n# ── Panel 3: Symmetric 3x3 ───────────────────────────────────────────────────\nax3 = axes[2]\nax3.set_xlim(0, 3)\nax3.set_ylim(0, 3)\nax3.set_aspect('equal')\nax3.axis('off')\nax3.set_title('Symmetric Matrix S  (3 × 3)', fontsize=13, fontweight='bold', pad=12)\n\n# Color pairs: mirrored entries share a color\npair_colors = {\n    (0,1): '#D7F9E9', (1,0): '#D7F9E9',   # green pair\n    (0,2): '#FADADD', (2,0): '#FADADD',   # pink pair\n    (1,2): '#D6EAF8', (2,1): '#D6EAF8',   # blue pair\n}\ndiag_color = '#FFF9C4'  # yellow for diagonal\n\nlabels_S = [['s\\u2081\\u2081', 's\\u2081\\u2082', 's\\u2081\\u2083'],\n            ['s\\u2081\\u2082', 's\\u2082\\u2082', 's\\u2082\\u2083'],\n            ['s\\u2081\\u2083', 's\\u2082\\u2083', 's\\u2083\\u2083']]\n\nfor r in range(3):\n    for c in range(3):\n        if r == c:\n            fc = diag_color\n        else:\n            fc = pair_colors.get((r, c), '#F5F5F5')\n        rect = patches.FancyBboxPatch((c + 0.05, 2 - r + 0.05), 0.9, 0.9,\n                                      boxstyle='round,pad=0.02',\n                                      linewidth=1.5, edgecolor='#333333',\n                                      facecolor=fc)\n        ax3.add_patch(rect)\n        ax3.text(c + 0.5, 2 - r + 0.5, labels_S[r][c],\n                 ha='center', va='center', fontsize=13, fontweight='bold', color='#1a1a2e')\n\nax3.annotate('', xy=(0, 0.02), xytext=(0, 2.98),\n             arrowprops=dict(arrowstyle='-', color='black', lw=2))\nax3.annotate('', xy=(3, 0.02), xytext=(3, 2.98),\n             arrowprops=dict(arrowstyle='-', color='black', lw=2))\nax3.plot([0, 0.15], [0.02, 0.02], color='black', lw=2)\nax3.plot([0, 0.15], [2.98, 2.98], color='black', lw=2)\nax3.plot([3, 2.85], [0.02, 0.02], color='black', lw=2)\nax3.plot([3, 2.85], [2.98, 2.98], color='black', lw=2)\n\n# diagonal line\nax3.plot([0.05, 2.95], [2.95, 0.05], color='#888888', lw=1.5, linestyle='--', alpha=0.6)\n\n# legend\nfrom matplotlib.patches import Patch\nlegend_elements = [\n    Patch(facecolor=diag_color, edgecolor='#333333', label='Main diagonal'),\n    Patch(facecolor='#D7F9E9', edgecolor='#333333', label='Mirrored pair'),\n    Patch(facecolor='#FADADD', edgecolor='#333333', label='Mirrored pair'),\n    Patch(facecolor='#D6EAF8', edgecolor='#333333', label='Mirrored pair'),\n]\nax3.legend(handles=legend_elements, loc='lower center', bbox_to_anchor=(0.5, -0.18),\n           ncol=2, fontsize=8.5, frameon=True, framealpha=0.9)\n\nplt.suptitle('Transpose and Symmetry — Visual Reference', fontsize=15, fontweight='bold', y=1.02)\nplt.tight_layout(pad=1.5)\nplt.savefig('generated/B.6-1-5.png', dpi=150, bbox_inches='tight')\n",
      "output_path": "generated/B.6-1-5.png",
      "caption": "Left: Matrix A (2×3). Center: Its transpose A^T (3×2) — rows become columns, size flips to 3×2. Right: A symmetric 3×3 matrix — color-matched pairs show a_ij = a_ji across the main diagonal (dashed line)."
    },
    {
      "type": "text_explanation",
      "content": "## 2. Equality and Transpose: Fastest Test Rules\n\n**Equality** requires two conditions, both mandatory:\n1. Same order (same number of rows and columns).\n2. Every entry at position (i, j) in A equals the entry at position (i, j) in B.\n\n### EXAM TRAP\n\nTwo matrices that contain the same numbers in a different arrangement are **not** equal. Position matters absolutely.\n\n---\n\n**Transpose** means swapping rows and columns systematically: the i-th row of A becomes the i-th column of A^T. Entry a_ij moves to position (j, i).\n\n**Size change rule:** If A is m × n, then A^T is n × m. A non-square matrix always changes shape after transpose.\n\n### EXAM TRAP\n\nStudents frequently forget the size change for non-square matrices. A 4×2 matrix does not stay 4×2 after transpose — it becomes 2×4.\n\n**Key property:** (A^T)^T = A. Transposing twice returns the original matrix exactly."
    },
    {
      "type": "math_block",
      "latex": "A = (a_{ij})_{m\\times n},\\quad A^T = (a_{ji})_{n\\times m},\\quad (A^T)^T = A",
      "explanation": "Transpose flips the position indices — entry a_ij moves to position (j, i) — and reverses the matrix dimensions from m×n to n×m; applying transpose a second time restores both the original index positions and the original dimensions."
    },
    {
      "type": "section_summary",
      "bullets": [
        "Diagonal, identity, zero, and symmetric matrices each have a distinct one-step recognition rule based on entry pattern.",
        "Two matrices are equal only when they share the same order and every corresponding entry matches exactly.",
        "Transpose swaps rows and columns: an m×n matrix becomes n×m, and (A^T)^T = A."
      ],
      "transition": "In the next section we will learn how matrices are added and scaled."
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
          "id": "matrix_type_recognition",
          "label": "Recognize diagonal, identity, zero, and symmetric matrices",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Which statement is always true about an identity matrix?",
              "options": [
                "A. Every entry is 1",
                "B. It is diagonal and every diagonal entry is 1",
                "C. It is symmetric only when its order is 2 x 2",
                "D. It may be non-square"
              ],
              "correct_option": "B",
              "explanation": "An identity matrix is a square diagonal matrix with 1 on every main-diagonal entry and 0 elsewhere.",
              "wrong_option_explanations": {
                "A": "Off-diagonal entries are 0, not 1.",
                "C": "Identity matrices are symmetric for any order.",
                "D": "Identity matrices must be square."
              },
              "hint": "Think: diagonal of ones, zeros elsewhere.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "Which matrix is symmetric?",
              "options": [
                "A. [[1, 2], [3, 1]]",
                "B. [[0, 4], [4, 0]]",
                "C. [[1, 0, 0], [0, 1, 2]]",
                "D. [[2, 0], [0, 3], [0, 0]]"
              ],
              "correct_option": "B",
              "explanation": "A symmetric matrix must be square and satisfy a_ij = a_ji. In option B, the off-diagonal entries both equal 4, so the mirror condition holds.",
              "wrong_option_explanations": {
                "A": "The off-diagonal entries 2 and 3 do not match, so it is not symmetric.",
                "C": "It is not square (2×3), so it cannot be symmetric.",
                "D": "It is not square (3×2), so it cannot be symmetric."
              },
              "hint": "Check square first, then mirror across the main diagonal.",
              "needs_visual": true,
              "visual_type": "python_matplotlib_matrix_highlight",
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "matrix_equality",
          "label": "Equality of matrices",
          "importance": "high",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "When are two matrices A and B equal?",
              "options": [
                "A. When they have the same order",
                "B. When they contain the same numbers, in any arrangement",
                "C. When they are the same order and each corresponding entry is equal",
                "D. When their diagonal entries are equal"
              ],
              "correct_option": "C",
              "explanation": "Matrix equality is entry-by-entry equality, with matching size required first.",
              "wrong_option_explanations": {
                "A": "Same order alone is not enough; entries must also match position by position.",
                "B": "Arrangement matters because matrix position matters — a_ij must equal b_ij, not just some b_kl.",
                "D": "Matching diagonals alone does not guarantee full equality of all entries."
              },
              "hint": "Equality is stricter than 'looks similar.'",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "transpose_rules",
          "label": "Transpose meaning and size change",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "If A is a 2 x 5 matrix, what is the order of A^T?",
              "options": [
                "A. 2 x 5",
                "B. 5 x 2",
                "C. 2 x 2",
                "D. 5 x 5"
              ],
              "correct_option": "B",
              "explanation": "Transpose swaps rows and columns, so an m×n matrix becomes n×m. A 2×5 matrix becomes 5×2.",
              "wrong_option_explanations": {
                "A": "The order changes unless the matrix is square.",
                "C": "Transpose does not force a square matrix.",
                "D": "Transpose swaps dimensions; it does not create a square matrix."
              },
              "hint": "Rows become columns — the two numbers in the size simply swap.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp3_q2",
              "type": "multiple_choice",
              "stem": "Which statement is correct?",
              "options": [
                "A. (A^T)^T = A^T",
                "B. A^T keeps the same entries in the same positions",
                "C. The ith row of A becomes the ith column of A^T",
                "D. Only square matrices have transposes"
              ],
              "correct_option": "C",
              "explanation": "Transpose swaps row and column positions: the i-th row of A becomes the i-th column of A^T. Applying transpose twice returns the original matrix, so (A^T)^T = A.",
              "wrong_option_explanations": {
                "A": "The correct property is (A^T)^T = A, not A^T.",
                "B": "The entries move to swapped row-column positions; a_ij goes to position (j, i).",
                "D": "Any matrix, square or not, has a transpose."
              },
              "hint": "Think row-column swap, not value change.",
              "needs_visual": true,
              "visual_type": "python_matplotlib_transpose_swap",
              "same_point_variant": true
            },
            {
              "id": "kp3_q3",
              "type": "short_answer",
              "stem": "A student says: 'Matrix transpose just rewrites the same matrix sideways, so a 3 x 2 matrix stays 3 x 2.' Explain briefly why this is wrong.",
              "ideal_answer": "