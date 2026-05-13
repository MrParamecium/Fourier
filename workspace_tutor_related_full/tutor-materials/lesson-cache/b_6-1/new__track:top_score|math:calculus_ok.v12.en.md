```json
{
  "section_id": "B.6-1 Some Definitions and Properties",
  "section_title": "B.6-1 Some Definitions and Properties",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.6-1 Some Definitions and Properties\n\n> **Section Objective:** Recognize the most common matrix types by their structural patterns, and apply the definitions of equality and transpose precisely — skills that exam questions test directly.\n\nConsider this matrix:\n\n$$\\begin{bmatrix} 3 & 0 & 0 \\\\ 0 & -1 & 0 \\\\ 0 & 0 & 7 \\end{bmatrix}$$\n\nNotice that all the action happens on the main diagonal — the rest is zeros. That pattern has a name, and recognizing it instantly is exactly what this section trains.\n\nYou will learn fast visual checks for six concepts: **diagonal**, **identity**, **zero**, and **symmetric** matrices, plus **matrix equality** and the **transpose** operation. These are pattern-recognition questions on exams. One wrong definition costs easy marks. Master the patterns here and those marks are yours."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the visual as a one-glance recognition sheet for matrix types.",
        "standard": "Use the visual to connect each definition to a visible structural pattern.",
        "top_score": "Use the visual to contrast easy-to-confuse cases and point out what does not qualify."
      },
      "script": "import matplotlib.pyplot as plt\nimport matplotlib.patches as mpatches\nimport numpy as np\n\nfig, axes = plt.subplots(1, 4, figsize=(16, 5))\nfig.patch.set_facecolor('white')\n\ndef draw_matrix(ax, data, title, highlight_diag=False, highlight_mirror=False,\n                row_labels=None, col_labels=None, arrow_pairs=None,\n                diag_color='#AED6F1', mirror_color='#A9DFBF'):\n    ax.set_facecolor('white')\n    nrows = len(data)\n    ncols = len(data[0])\n    ax.set_xlim(-0.5, ncols - 0.5)\n    ax.set_ylim(-0.5, nrows - 0.5)\n    ax.invert_yaxis()\n    ax.set_aspect('equal')\n    ax.axis('off')\n\n    for i in range(nrows):\n        for j in range(ncols):\n            color = 'white'\n            if highlight_diag and i == j:\n                color = diag_color\n            if highlight_mirror and i != j and data[i][j] != 0:\n                color = mirror_color\n            rect = mpatches.FancyBboxPatch(\n                (j - 0.45, i - 0.45), 0.9, 0.9,\n                boxstyle='round,pad=0.05',\n                linewidth=1.2,\n                edgecolor='#888888',\n                facecolor=color\n            )\n            ax.add_patch(rect)\n            val = data[i][j]\n            display = str(val) if val != 0 else '0'\n            ax.text(j, i, display, ha='center', va='center',\n                    fontsize=14, fontweight='bold',\n                    color='#1a1a1a' if val != 0 else '#aaaaaa')\n\n    if arrow_pairs:\n        for (r1, c1), (r2, c2) in arrow_pairs:\n            ax.annotate('',\n                xy=(c2, r2), xytext=(c1, r1),\n                arrowprops=dict(arrowstyle='->', color='#E74C3C', lw=2))\n\n    ax.set_title(title, fontsize=13, fontweight='bold', pad=14, color='#1a1a1a')\n\n# Panel 1: Diagonal matrix\ndiag_data = [\n    [3, 0, 0],\n    [0, -1, 0],\n    [0, 0, 7]\n]\ndraw_matrix(axes[0], diag_data,\n            'Diagonal Matrix\\n(nonzero only on main diagonal)',\n            highlight_diag=True)\naxes[0].text(1, 3.15, 'Diagonal entries highlighted in blue',\n             ha='center', va='top', fontsize=8.5, color='#2471A3', style='italic')\n\n# Panel 2: Identity matrix\nident_data = [\n    [1, 0, 0],\n    [0, 1, 0],\n    [0, 0, 1]\n]\ndraw_matrix(axes[1], ident_data,\n            'Identity Matrix I\\n(diagonal entries = 1 exactly)',\n            highlight_diag=True)\naxes[1].text(1, 3.15, 'Special case of diagonal: all 1s',\n             ha='center', va='top', fontsize=8.5, color='#2471A3', style='italic')\n\n# Panel 3: Symmetric matrix\nsym_data = [\n    [4, 2, -1],\n    [2, 5, 3],\n    [-1, 3, 6]\n]\ndraw_matrix(axes[2], sym_data,\n            'Symmetric Matrix\\n(mirrors across main diagonal)',\n            highlight_diag=True, highlight_mirror=True)\naxes[2].text(1, 3.15, 'Green pairs: a\\u1d62\\u2c7c = a\\u2c7c\\u1d62',\n             ha='center', va='top', fontsize=8.5, color='#1E8449', style='italic')\n\n# Panel 4: Transpose example — A (2x3) and A^T (3x2) side by side\nax4 = axes[3]\nax4.set_facecolor('white')\nax4.axis('off')\nax4.set_xlim(-0.5, 7.5)\nax4.set_ylim(-0.5, 3.5)\nax4.invert_yaxis()\nax4.set_title('Transpose: rows become columns\\n(2\\u00d73 \\u2192 3\\u00d72)',\n              fontsize=13, fontweight='bold', pad=14, color='#1a1a1a')\n\nA = [[1, 2, 3], [4, 5, 6]]\nAT = [[1, 4], [2, 5], [3, 6]]\n\nrow_colors = ['#FADBD8', '#D5F5E3']\n\n# Draw A (2x3) at x offset 0\nfor i in range(2):\n    for j in range(3):\n        rect = mpatches.FancyBboxPatch(\n            (j - 0.45, i - 0.45), 0.9, 0.9,\n            boxstyle='round,pad=0.05',\n            linewidth=1.2,\n            edgecolor='#888888',\n            facecolor=row_colors[i]\n        )\n        ax4.add_patch(rect)\n        ax4.text(j, i, str(A[i][j]), ha='center', va='center',\n                 fontsize=13, fontweight='bold', color='#1a1a1a')\n\nax4.text(1, -0.15, 'A  (2\\u00d73)', ha='center', va='bottom',\n         fontsize=11, fontweight='bold', color='#555555')\n\n# Arrow\nax4.annotate('', xy=(4.3, 0.5), xytext=(3.2, 0.5),\n             arrowprops=dict(arrowstyle='->', color='#E74C3C', lw=2.5))\nax4.text(3.75, 0.15, 'T', ha='center', va='center',\n         fontsize=12, color='#E74C3C', fontweight='bold')\n\n# Draw A^T (3x2) at x offset 4.5\nfor i in range(3):\n    for j in range(2):\n        rect = mpatches.FancyBboxPatch(\n            (4.5 + j - 0.45, i - 0.45), 0.9, 0.9,\n            boxstyle='round,pad=0.05',\n            linewidth=1.2,\n            edgecolor='#888888',\n            facecolor=row_colors[j]\n        )\n        ax4.add_patch(rect)\n        ax4.text(4.5 + j, i, str(AT[i][j]), ha='center', va='center',\n                 fontsize=13, fontweight='bold', color='#1a1a1a')\n\nax4.text(5.0, -0.15, 'A\\u1d40  (3\\u00d72)', ha='center', va='bottom',\n         fontsize=11, fontweight='bold', color='#555555')\n\nax4.text(3.5, 2.9,\n         'Row colors show how rows of A\\nbecome columns of A\\u1d40',\n         ha='center', va='top', fontsize=8.5, color='#555555', style='italic')\n\nplt.suptitle('Matrix Types and Transpose — Visual Reference',\n             fontsize=15, fontweight='bold', y=1.02, color='#1a1a1a')\nplt.tight_layout()\nplt.savefig('generated/B.6-1-2.png', dpi=150, bbox_inches='tight',\n            facecolor='white')\n",
      "output_path": "generated/B.6-1-2.png",
      "caption": "Four matrix patterns side by side: diagonal (nonzero only on main diagonal), identity (diagonal entries all equal 1), symmetric (entries mirror across the main diagonal), and transpose (rows of A become columns of A^T, changing a 2x3 matrix into a 3x2 matrix)."
    },
    {
      "type": "text_explanation",
      "content": "## 1. Recognizing Special Matrices\n\nThree matrix types appear constantly on exams. Learn to identify them in under five seconds.\n\n**Diagonal matrix:** A square matrix where every off-diagonal entry is zero. The diagonal entries can be any numbers — zero, negative, large, small. The only rule is that nothing lives off the main diagonal.\n\n**Identity matrix (I or I_n):** A *special* diagonal matrix where every diagonal entry is exactly **1**. This is the key distinction: identity is a subset of diagonal, but not every diagonal matrix is an identity matrix.\n\n**Zero matrix (O):** Every entry is zero — diagonal and off-diagonal alike.\n\n### EXAM TRAP\n\nThe matrix $\\begin{bmatrix} 2 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 5 \\end{bmatrix}$ is **diagonal but not identity** — the diagonal entries are 2, 1, 5, not all 1. Students who confuse these two lose straightforward marks.\n\n#### Note\nThe subscript in $I_n$ simply records the size: $I_3$ is the $3 \\times 3$ identity matrix."
    },
    {
      "type": "math_block",
      "latex": "A = B \\iff a_{ij} = b_{ij}\\ \\text{for all } i,j \\text{ and } A,B \\text{ have the same order}",
      "explanation": "Matrix equality is stricter than it looks: two matrices are equal only when they have identical dimensions (same number of rows and same number of columns) and every corresponding entry matches exactly — a single mismatched entry or a shape difference is enough to make them unequal."
    },
    {
      "type": "text_explanation",
      "content": "## 2. Symmetric Matrices and Matrix Equality\n\nA square matrix $A$ is **symmetric** when $a_{ij} = a_{ji}$ for every pair of indices $i$ and $j$. Visually, the matrix is a mirror image of itself across the main diagonal: the entry in row $i$, column $j$ equals the entry in row $j$, column $i$.\n\n> **Important:** Symmetry is only defined for square matrices. A rectangular matrix cannot be symmetric.\n\n**Matrix equality** is an entry-by-entry test with a shape prerequisite: both matrices must have the same order, and then every corresponding entry must match.\n\n### EXAM TRAPS\n\n**Trap 1:** Two matrices with the same six numbers arranged as a $2 \\times 3$ and a $3 \\times 2$ are **not equal** — different shapes mean automatic inequality.\n\n**Trap 2:** A matrix equals its own transpose ($A^T = A$) if and only if it is square and symmetric. Do not assume this holds in general.\n\n### TOP-SCORE INSIGHT\n\nWhen checking symmetry, you only need to inspect the **off-diagonal pairs** $(a_{ij}, a_{ji})$ for $i \\neq j$. The diagonal entries are always equal to themselves, so they never break symmetry. Scanning only the upper triangle and comparing to the lower triangle is faster and less error-prone than reading the whole matrix."
    },
    {
      "type": "math_block",
      "latex": "A^T = (a_{ji})_{n\\times m}, \\qquad (A^T)^T = A",
      "explanation": "Transpose swaps rows and columns — the entry in row $i$, column $j$ of $A$ moves to row $j$, column $i$ of $A^T$ — which turns an $m \\times n$ matrix into an $n \\times m$ matrix; applying transpose a second time reverses the swap and returns the original matrix exactly."
    },
    {
      "type": "text_explanation",
      "content": "## 3. Transpose: What Changes and What Does Not\n\nThe **transpose** operation is simple to describe: each row of $A$ becomes the corresponding column of $A^T$.\n\nA quick reminder on terms: a **row** runs left to right (horizontal), a **column** runs top to bottom (vertical). Row 1 of $A$ becomes column 1 of $A^T$, row 2 becomes column 2, and so on.\n\n**What changes:** The shape. An $m \\times n$ matrix becomes $n \\times m$ after transposing. If $A$ is $2 \\times 3$, then $A^T$ is $3 \\times 2$. Only square matrices keep the same shape after transposing.\n\n**What does not change:** The entries themselves — they are just repositioned.\n\n### CRITICAL DISTINCTION\n\n| Statement | Always true? | What it means |\n|---|---|---|\n| $(A^T)^T = A$ | Yes, for every matrix | Transposing twice undoes itself |\n| $A^T = A$ | No — special case only | $A$ is symmetric |\n\nDo not conflate these two. The first is a universal rule; the second is a definition.\n\n### EXAM TIP\n\nIn written solutions, **state the new order explicitly** before writing the entries of $A^T$. For example: \"Since $A$ is $2 \\times 3$, $A^T$ is $3 \\times 2$, given by...\" This earns method marks and prevents careless shape errors."
    },
    {
      "type": "section_summary",
      "bullets": [
        "Identity matrix has all diagonal entries equal to 1; diagonal matrices may have any nonzero diagonal values.",
        "A square matrix is symmetric when every off-diagonal pair satisfies a_ij = a_ji; equality requires matching shape and every entry.",
        "Transpose swaps rows and columns, changing an m x n matrix to n x m; (A^T)^T = A always, but A^T = A only when A is symmetric."
      ],
      "transition": "In the next section we will explore matrix addition and scalar multiplication, building the arithmetic foundation needed before matrix multiplication."
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
          "id": "special_matrix_recognition",
          "label": "Diagonal, identity, and zero matrices",
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
                "A. All entries are zero",
                "B. All diagonal entries are 1 and all off-diagonal entries are 0",
                "C. All diagonal entries are equal but may be any number",
                "D. It may be rectangular"
              ],
              "correct_option": "B",
              "explanation": "An identity matrix is a square matrix with 1s on the main diagonal and 0s everywhere else.",
              "wrong_option_explanations": {
                "A": "That describes the zero matrix, not the identity matrix.",
                "C": "That could describe some diagonal matrices, but not specifically the identity matrix.",
                "D": "Identity matrices must be square."
              },
              "hint": "Think of the matrix that leaves vectors unchanged under multiplication.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "The matrix [[2,0,0],[0,1,0],[0,0,5]] is best classified as",
              "options": [
                "A. identity only",
                "B. zero only",
                "C. diagonal but not identity",
                "D. symmetric but not diagonal"
              ],
              "correct_option": "C",
              "explanation": "Only the main diagonal may be nonzero, so it is diagonal. It is not identity because the diagonal entries are not all 1.",
              "wrong_option_explanations": {
                "A": "Identity requires diagonal entries 1, 1, 1.",
                "B": "The matrix clearly has nonzero entries.",
                "D": "It is symmetric too, but the sharper classification tested here is diagonal; saying 'not diagonal' is false."
              },
              "hint": "Check the off-diagonal entries first, then the diagonal values.",
              "needs_visual": true,
              "visual_type": "matrix_pattern_diagram",
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "symmetric_and_equality",
          "label": "Symmetric matrices and matrix equality",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "A square matrix A is symmetric if",
              "options": [
                "A. a_ij = 0 for all i ≠ j",
                "B. a_ij = a_ji for all i and j",
                "C. A has the same number of rows and columns",
                "D. every diagonal entry equals 1"
              ],
              "correct_option": "B",
              "explanation": "Symmetry means entries mirror across the main diagonal, so corresponding off-diagonal pairs match.",
              "wrong_option_explanations": {
                "A": "That describes a diagonal matrix, which is only one special case of symmetric matrices.",
                "C": "Being square is necessary for symmetry but not sufficient.",
                "D": "That is part of the identity matrix definition, not symmetry."
              },
              "hint": "Compare the entry above the diagonal with the reflected one below it.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "Which pair of matrices can be equal?",
              "options": [
                "A. A 2x3 matrix and a 3x2 matrix with the same six numbers",
                "B. Two 2x2 matrices with one mismatched entry",
                "C. Two 3x3 matrices whose corresponding entries are all equal",
                "D. A square matrix and its transpose, regardless of entries"
              ],
              "correct_option": "C",
              "explanation": "Matrices are equal only when they have the same order and all corresponding entries are equal.",
              "wrong_option_explanations": {
                "A": "Different orders mean they cannot be equal.",
                "B": "One mismatched entry is enough to make them unequal.",
                "D": "A matrix equals its transpose only in the special symmetric case."
              },
              "hint": "Equality is a strict same-shape plus same-entry test.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "transpose_properties",
          "label": "Transpose operation and its properties",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "If A is a 2x3 matrix, what is the order of A^T?",
              "options": [
                "A. 2x3",
                "B. 3x2",
                "C. 2x2",
                "D. 3x3"
              ],
              "correct_option": "B",
              "explanation": "Transpose swaps rows and columns, so m x n becomes n x m.",
              "wrong_option_explanations": {
                "A": "That would mean no row-column swap happened.",
                "C": "Transpose does not force a square matrix.",
                "D": "Transpose does not add rows or columns."
              },
              "hint": "Rows become columns.",
              "needs_visual": true,
              "visual_type": "transpose_row_column_swap",
              "same_point_variant": false
            },
            {
              "id": "kp3_q2",
              "type": "multiple_choice",
              "stem": "Which statement is correct?",
              "options": [
                "A. (A^T)^T = A only when A is symmetric",
                "B. A^T = A for every square matrix",
                "C. (A^T)^T = A for every matrix A",
                "D. A^T has the same order as A for every matrix A"
              ],
              "correct_option": "C",
              "explanation": "Double transpose always returns the original