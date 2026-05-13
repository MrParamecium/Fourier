```json
{
  "section_id": "B.6-2 Matrix Algebra",
  "section_title": "B.6-2 Matrix Algebra",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.6-2 Matrix Algebra\n\n> **Section Objective:** Master the four core matrix operations — addition, scalar multiplication, matrix multiplication, and inversion — with a focus on the shape rules that decide whether each operation is legal.\n\n---\n\nMatrix algebra looks like ordinary algebra at first glance, but every operation comes with a shape rule that determines whether it is even allowed. Get the shape wrong and the operation is simply undefined — no exceptions.\n\nThis section covers four core moves:\n\n1. **Addition** — entry-by-entry, same size required\n2. **Scalar multiplication** — scale every entry by a number\n3. **Matrix multiplication** — row-by-column, inner dimensions must match\n4. **Inversion** — undo a matrix multiplication, square and nonzero determinant required\n\n### EXAM PRIORITIES\n\nAlways check dimensions before computing. Use row-by-column multiplication correctly. Know that an inverse exists only for a square matrix with a nonzero determinant."
    },
    {
      "type": "book_image",
      "source_page": "page-038",
      "fig_id": null,
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the page to spot the two easiest rules fast: same order for addition and entry-by-entry scalar multiplication.",
        "standard": "Use the formulas on the page as the official definition anchor before giving one simple numeric example.",
        "top_score": "Use the notation carefully to distinguish matrix order from the values inside the matrix."
      },
      "caption": "Addition and scalar multiplication are both entry-by-entry operations, but addition is only allowed when the two matrices have exactly the same order."
    },
    {
      "type": "text_explanation",
      "content": "## 1. Addition and Scalar Multiplication\n\nMatrix addition is straightforward: add the entry in row i, column j of the first matrix to the entry in the same position of the second matrix. Because you are matching positions, **both matrices must have exactly the same number of rows and the same number of columns** — the same order.\n\nFor example:\n\n$$\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} + \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix} = \\begin{bmatrix} 6 & 8 \\\\ 10 & 12 \\end{bmatrix}$$\n\nScalar multiplication is even simpler — multiply every single entry by the same number:\n\n$$3 \\times \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} = \\begin{bmatrix} 3 & 6 \\\\ 9 & 12 \\end{bmatrix}$$\n\n### COMMON MISTAKE\n\nStudents frequently attempt to add matrices of different sizes — for instance, a 2×3 matrix and a 2×2 matrix — because the row counts match. This is illegal. Both dimensions must match exactly."
    },
    {
      "type": "math_block",
      "latex": "A + B = (a_{ij} + b_{ij})_{m\\times n}",
      "explanation": "Matrix addition means adding corresponding entries one-for-one, so both matrices must already have the same order m×n before the operation is defined."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "exam_pattern_anchor",
      "mode_specific_visual_use": {
        "cram": "Use this to memorize the multiplication check: inner numbers match, outer numbers give the answer size.",
        "standard": "Use this to make the row-times-column rule intuitive before the worked example.",
        "top_score": "Use this to contrast legal multiplication with undefined products and to stress that order matters."
      },
      "script": "import matplotlib.pyplot as plt\nimport matplotlib.patches as mpatches\nimport numpy as np\n\nfig, axes = plt.subplots(1, 2, figsize=(13, 5), facecolor='white')\nfig.suptitle('Matrix Multiplication: Conformability and Row-Column Rule', fontsize=14, fontweight='bold', y=1.01)\n\n# ── LEFT PANEL: dimension flow diagram ──────────────────────────────────────\nax = axes[0]\nax.set_xlim(0, 10)\nax.set_ylim(0, 6)\nax.axis('off')\nax.set_facecolor('white')\nax.set_title('Dimension Flow: A (m×n) · B (n×p) = C (m×p)', fontsize=11, pad=10)\n\n# Box A\nbox_A = mpatches.FancyBboxPatch((0.3, 2.0), 2.4, 2.0,\n    boxstyle='round,pad=0.1', linewidth=2,\n    edgecolor='#2c7bb6', facecolor='#d9eaf7')\nax.add_patch(box_A)\nax.text(1.5, 3.0, 'A', fontsize=22, ha='center', va='center', fontweight='bold', color='#2c7bb6')\nax.text(1.5, 2.25, 'm × n', fontsize=12, ha='center', va='center', color='#2c7bb6')\n\n# Box B\nbox_B = mpatches.FancyBboxPatch((3.8, 2.0), 2.4, 2.0,\n    boxstyle='round,pad=0.1', linewidth=2,\n    edgecolor='#2c7bb6', facecolor='#d9eaf7')\nax.add_patch(box_B)\nax.text(5.0, 3.0, 'B', fontsize=22, ha='center', va='center', fontweight='bold', color='#2c7bb6')\nax.text(5.0, 2.25, 'n × p', fontsize=12, ha='center', va='center', color='#2c7bb6')\n\n# Box C\nbox_C = mpatches.FancyBboxPatch((7.3, 2.0), 2.4, 2.0,\n    boxstyle='round,pad=0.1', linewidth=2,\n    edgecolor='#1a9641', facecolor='#d4edda')\nax.add_patch(box_C)\nax.text(8.5, 3.0, 'C = AB', fontsize=16, ha='center', va='center', fontweight='bold', color='#1a9641')\nax.text(8.5, 2.25, 'm × p', fontsize=12, ha='center', va='center', color='#1a9641')\n\n# Arrow A -> B\nax.annotate('', xy=(3.8, 3.0), xytext=(2.7, 3.0),\n    arrowprops=dict(arrowstyle='->', color='black', lw=1.8))\n\n# Arrow B -> C\nax.annotate('', xy=(7.3, 3.0), xytext=(6.2, 3.0),\n    arrowprops=dict(arrowstyle='->', color='black', lw=1.8))\n\n# Highlight matching inner dimension n\nbrace_y = 1.6\nax.annotate('', xy=(5.0, brace_y), xytext=(1.5, brace_y),\n    arrowprops=dict(arrowstyle='<->', color='#d7191c', lw=2.2))\nax.text(3.25, 1.25, 'Must match (both = n)', fontsize=10, ha='center', va='center',\n        color='#d7191c', fontweight='bold')\n\n# Highlight outer dimensions m and p\nbrace_y2 = 5.2\nax.annotate('', xy=(8.5, brace_y2), xytext=(1.5, brace_y2),\n    arrowprops=dict(arrowstyle='<->', color='#1a9641', lw=2.2))\nax.text(5.0, 5.55, 'Result size: m × p', fontsize=10, ha='center', va='center',\n        color='#1a9641', fontweight='bold')\n\n# ── RIGHT PANEL: row-times-column sketch ────────────────────────────────────\nax2 = axes[1]\nax2.set_xlim(0, 10)\nax2.set_ylim(0, 6)\nax2.axis('off')\nax2.set_facecolor('white')\nax2.set_title('Row × Column → Single Entry c_ij', fontsize=11, pad=10)\n\n# Draw matrix A (2x2) on the left\ncell_w, cell_h = 1.0, 0.8\nA_vals = [['a₁₁', 'a₁₂'], ['a₂₁', 'a₂₂']]\nA_left, A_top = 0.5, 4.8\nfor r in range(2):\n    for c in range(2):\n        x0 = A_left + c * cell_w\n        y0 = A_top - r * cell_h\n        fc = '#fff3cd' if r == 0 else 'white'  # highlight row 1\n        rect = mpatches.FancyBboxPatch((x0, y0 - cell_h), cell_w, cell_h,\n            boxstyle='square,pad=0', linewidth=1.2,\n            edgecolor='#555', facecolor=fc)\n        ax2.add_patch(rect)\n        ax2.text(x0 + cell_w/2, y0 - cell_h/2, A_vals[r][c],\n                 ha='center', va='center', fontsize=11)\nax2.text(A_left + cell_w, A_top + 0.35, 'A', fontsize=14, ha='center',\n         fontweight='bold', color='#2c7bb6')\nax2.annotate('', xy=(A_left + 2*cell_w + 0.05, A_top - 0.4),\n             xytext=(A_left - 0.05, A_top - 0.4),\n             arrowprops=dict(arrowstyle='-', color='#e08000', lw=2.5))\nax2.text(A_left + cell_w, A_top - 1.85, 'row i', fontsize=9, ha='center',\n         color='#e08000', style='italic')\n\n# Draw matrix B (2x2) in the middle\nB_vals = [['b₁₁', 'b₁₂'], ['b₂₁', 'b₂₂']]\nB_left, B_top = 3.2, 4.8\nfor r in range(2):\n    for c in range(2):\n        x0 = B_left + c * cell_w\n        y0 = B_top - r * cell_h\n        fc = '#d4edda' if c == 1 else 'white'  # highlight col 2\n        rect = mpatches.FancyBboxPatch((x0, y0 - cell_h), cell_w, cell_h,\n            boxstyle='square,pad=0', linewidth=1.2,\n            edgecolor='#555', facecolor=fc)\n        ax2.add_patch(rect)\n        ax2.text(x0 + cell_w/2, y0 - cell_h/2, B_vals[r][c],\n                 ha='center', va='center', fontsize=11)\nax2.text(B_left + cell_w, B_top + 0.35, 'B', fontsize=14, ha='center',\n         fontweight='bold', color='#2c7bb6')\nax2.annotate('', xy=(B_left + 1.5*cell_w, B_top + 0.1),\n             xytext=(B_left + 1.5*cell_w, B_top - 2*cell_h - 0.1),\n             arrowprops=dict(arrowstyle='-', color='#1a9641', lw=2.5))\nax2.text(B_left + 1.5*cell_w + 0.55, B_top - cell_h, 'col j', fontsize=9,\n         ha='center', color='#1a9641', style='italic')\n\n# Dot product arrow and result\nax2.annotate('', xy=(6.5, 3.8), xytext=(5.3, 3.8),\n    arrowprops=dict(arrowstyle='->', color='black', lw=1.8))\nax2.text(5.9, 4.05, '·', fontsize=18, ha='center', va='center')\n\n# Result box\nresult_box = mpatches.FancyBboxPatch((6.5, 3.3), 2.8, 1.0,\n    boxstyle='round,pad=0.1', linewidth=2,\n    edgecolor='#9b59b6', facecolor='#f0e6ff')\nax2.add_patch(result_box)\nax2.text(7.9, 3.8, 'c_ij = Σ aᵢₖ bₖⱼ', fontsize=11, ha='center', va='center',\n         fontweight='bold', color='#6c3483')\n\n# Legend\nax2.text(0.5, 1.5, 'Yellow row = row i of A', fontsize=9, color='#e08000')\nax2.text(0.5, 1.1, 'Green col = column j of B', fontsize=9, color='#1a9641')\nax2.text(0.5, 0.7, 'Purple box = resulting entry c_ij in C', fontsize=9, color='#6c3483')\n\nplt.tight_layout()\nplt.savefig('generated/B.6-2 Matrix Algebra-4.png', dpi=150, bbox_inches='tight')\n",
      "output_path": "generated/B.6-2 Matrix Algebra-4.png",
      "caption": "Left: The inner dimension n must match for AB to be defined; the result inherits the outer dimensions m×p. Right: Each entry c_ij is computed by dotting row i of A with column j of B."
    },
    {
      "type": "text_explanation",
      "content": "## 2. Matrix Multiplication and Matrix-Vector Multiplication\n\nMatrix multiplication follows a strict two-step process.\n\n**Step 1 — Check dimensions.** If A is m×n and B is n×p, the inner dimensions (both equal to n) must match. If they do not match, the product is undefined. The result C = AB will be m×p, using the outer dimensions.\n\n**Step 2 — Compute each entry.** The entry in row i and column j of C is found by taking row i of A and column j of B, multiplying corresponding elements, and summing:\n\n$$c_{ij} = a_{i1}b_{1j} + a_{i2}b_{2j} + \\cdots + a_{in}b_{nj}$$\n\nFor example, with two 2×2 matrices:\n\n$$\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} \\begin{bmatrix} 2 & 0 \\\\ 1 & 5 \\end{bmatrix} = \\begin{bmatrix} 4 & 10 \\\\ 10 & 20 \\end{bmatrix}$$\n\nMultiplying a matrix by a **column vector** follows the same rule — treat the vector as an n×1 matrix.\n\n### EXAM TIP\n\nAB may be defined while BA is undefined, or both may be defined but give different results. Order always matters in matrix multiplication."
    },
    {
      "type": "math_block",
      "latex": "c_{ij} = \\sum_{k=1}^{n} a_{ik} b_{kj}",
      "explanation": "The entry in row i and column j of the product AB is computed by multiplying across row i of A and down column j of B element-by-element, then summing all those products together."
    },
    {
      "type": "book_image",
      "source_page": "page-041",
      "fig_id": null,
      "teaching_role": "comparison_anchor",
      "mode_specific_visual_use": {
        "cram": "Use this to lock in the inverse rule: premultiply by A^-1 to undo A.",
        "standard": "Use this as the textbook anchor for y = Ax, A^-1A = I, and x = A^-1y.",
        "top_score": "Use this to connect inverse existence with uniqueness and with the requirement that A be square and nonsingular."
      },
      "caption": "Matrix inversion is the algebraic way to undo a matrix multiplication: starting from y = Ax, premultiplying both sides by A⁻¹ yields x = A⁻¹y, provided the inverse exists."
    },
    {
      "type": "text_explanation",
      "content": "## 3. Identity Matrix and Inverse\n\n### THE IDENTITY MATRIX\n\nThe identity matrix I is the matrix equivalent of the number 1. Multiplying any matrix A by I leaves A unchanged:\n\n$$AI = IA = A$$\n\nThis holds as long as the dimensions are compatible — the identity matrix must be the right size for the multiplication to be defined.\n\n### THE MATRIX INVERSE\n\nSuppose you have the equation **y = Ax** and you want to solve for x. If A has an inverse A⁻¹, you can premultiply both sides by A⁻¹:\n\n$$A^{-1}y = A^{-1}Ax = Ix = x$$\n\nSo the solution is simply **x = A⁻¹y**.\n\n**Existence conditions — both must hold:**\n- A must be **square** (same number of rows and columns)\n- A must be **nonsingular** (its determinant must be nonzero)\n\n### EXAM WARNING\n\nNot every square matrix is invertible. A square matrix with a zero determinant is called singular, and it has no inverse. \"Matrix division\" is not a separate operation — it is always done by multiplying by the inverse."
    },
    {
      "type": "section_summary",
      "bullets": [
        "Addition requires identical matrix sizes; scalar multiplication scales every entry and has no size restriction.",
        "For AB to be defined, the inner dimensions must match; compute each entry by row-times-column dot product.",
        "A matrix inverse exists only when the matrix is square and has a nonzero determinant."
      ],
      "transition": "In the next section we will use these matrix operations to solve larger structured problems."
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
          "id": "addition_and_scalar_rules",
          "label": "Addition and scalar multiplication rules",
          "importance": "high",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Which operation is valid as stated?",
              "options": [
                "A. Add a 2x3 matrix to a 2x2 matrix",
                "B. Multiply every entry of a 3x2 matrix by 4",
                "C. Add a 1x4 matrix to a 4x1 matrix",
                "D. Subtract a 2x2 matrix from a 3x2 matrix"
              ],
              "correct_option": "B",
              "explanation": "Scalar multiplication is always done entry by entry, so multiplying a 3x2 matrix by 4 is valid regardless of the matrix's shape.",
              "wrong_option_explanations": {
                "A": "Addition requires the same order; 2x3 and 2x2 do not match.",
                "C": "A 1x4 matrix and a 4x1 matrix are different shapes, so they cannot be added.",
                "D": "Subtraction has the same size requirement as addition; 2x2 and 3x2 do not match."
              },
              "hint": "Ask whether the operation needs matching shapes or just a scalar.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "matrix_multiplication_conformability",
          "label": "When a matrix product is defined",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "If A is 2x3 and B is 3x4, which statement is correct?",
              "options": [
                "A. AB is defined and has size 2x4",
                "B. AB is defined and has size 3x3",
                "C. AB is undefined because 2 is not equal to 4",
                "D. BA is also guaranteed to be defined"
              ],
              "correct_option": "A",
              "explanation": "The inner dimensions both equal 3, so AB is defined. The result uses the outer dimensions, giving a 2x4 matrix.",
              "wrong_option_explanations": {
                "B": "The result size is not inner-by-inner; it is outer-by-outer (rows of A by columns of B).",
                "C": "You compare the number of columns of A with the number of rows of B, not the outer numbers.",
                "D": "BA would require B (3x4) times A (2x3): inner dimensions are 4 and 2, which do not match, so BA is undefined here."
              },
              "hint": "Inner numbers must match; outer numbers survive into the result.",
              "needs_visual": true,
              "visual_type": "dimension_flow",
              "same_point_variant": true
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "A is 3x2 and B is 2x3