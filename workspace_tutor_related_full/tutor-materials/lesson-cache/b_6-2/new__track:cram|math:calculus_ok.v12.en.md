```json
{
  "section_id": "B.6-2 Matrix Algebra",
  "section_title": "B.6-2 Matrix Algebra",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.6-2 Matrix Algebra\n\n> **Section Objective:** Master the four fast checks that drive nearly every matrix exam question: Can these matrices be added? Is AB defined? What size is AB? When does A-inverse exist?\n\nHere is the pattern that saves time: **2x3 times 3x4 works and gives 2x4; 2x3 plus 3x2 is impossible.** That one example contains the core logic of this entire section.\n\nThis section covers four topics in order:\n1. Addition and scalar multiplication — same-shape rule\n2. Matrix multiplication — the row-by-column pattern and output size\n3. Identity matrix and distributive rules — algebra shortcuts\n4. Inverse conditions — square plus nonzero determinant\n\nLearn the recognition pattern for each. Speed and accuracy on these checks is what the exam rewards."
    },
    {
      "type": "book_image",
      "source_page": "page-038",
      "fig_id": null,
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the textbook definition to lock in the one rule worth memorizing: addition requires same order; scalar multiplication scales every entry.",
        "standard": "Use this page to connect the formal notation to element-by-element operations.",
        "top_score": "Use this page to contrast legal elementwise addition with illegal attempts to add different-sized matrices."
      },
      "caption": "Matrix addition is entrywise and is only defined when both matrices have exactly the same order (same number of rows and columns)."
    },
    {
      "type": "text_explanation",
      "content": "## 1. Fast Checks: Addition and Scalar Multiplication\n\nTwo rules, no exceptions.\n\n**Rule 1 — Addition:** A + B is allowed only when A and B have the **exact same dimensions** (same number of rows AND same number of columns). The result is computed entry-by-entry: add the element in position (i, j) of A to the element in position (i, j) of B.\n\n**Rule 2 — Scalar multiplication:** cA means multiply **every single entry** of A by the scalar c. The order does not matter for scalars: cA = Ac.\n\n### COMMON TRAP\n\nA 2x3 matrix and a 3x2 matrix both have 6 entries — but they **cannot be added**. Same total entries is not the test. Same shape is the test.\n\n> **Memory line:** Addition checks outer shape; scalar multiplication touches every entry."
    },
    {
      "type": "math_block",
      "latex": "A + B = (a_{ij} + b_{ij})_{m \\times n}, \\qquad cA = Ac",
      "explanation": "Addition combines matrices entry-by-entry and is only valid when both matrices share the same dimensions, while scalar multiplication scales every entry uniformly and commutes freely with the matrix."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "exam_pattern_anchor",
      "mode_specific_visual_use": {
        "cram": "Use this to drill the fastest recognition rule: inside numbers must match, outside numbers give the answer size.",
        "standard": "Use this to make row-by-column multiplication and result dimensions easy to see.",
        "top_score": "Use this to contrast valid and invalid products and reinforce that AB and BA may behave differently."
      },
      "script": "import matplotlib.pyplot as plt\nimport matplotlib.patches as mpatches\nfrom matplotlib.patches import FancyArrowPatch\n\nfig, axes = plt.subplots(1, 2, figsize=(13, 5))\nfig.patch.set_facecolor('white')\n\n# ── Panel 1: VALID product ──────────────────────────────────────────────\nax1 = axes[0]\nax1.set_xlim(0, 10)\nax1.set_ylim(0, 6)\nax1.axis('off')\nax1.set_facecolor('white')\nax1.set_title('VALID: Inner Dimensions Match', fontsize=13, fontweight='bold', pad=12, color='#1a1a1a')\n\n# Matrix A box\nrect_A = mpatches.FancyBboxPatch((0.3, 2.0), 2.4, 2.4,\n    boxstyle='round,pad=0.1', linewidth=2,\n    edgecolor='#333333', facecolor='#e8f4fd')\nax1.add_patch(rect_A)\nax1.text(1.5, 3.2, 'A', fontsize=22, ha='center', va='center', fontweight='bold', color='#1a6fa8')\nax1.text(1.5, 2.35, 'm × n', fontsize=13, ha='center', va='center', color='#1a6fa8')\n\n# Matrix B box\nrect_B = mpatches.FancyBboxPatch((3.8, 2.0), 2.4, 2.4,\n    boxstyle='round,pad=0.1', linewidth=2,\n    edgecolor='#333333', facecolor='#e8f4fd')\nax1.add_patch(rect_B)\nax1.text(5.0, 3.2, 'B', fontsize=22, ha='center', va='center', fontweight='bold', color='#1a6fa8')\nax1.text(5.0, 2.35, 'n × p', fontsize=13, ha='center', va='center', color='#1a6fa8')\n\n# Highlight inner n's in green\nax1.text(2.7, 2.35, 'n', fontsize=15, ha='center', va='center',\n         fontweight='bold', color='white',\n         bbox=dict(boxstyle='round,pad=0.3', facecolor='#27ae60', edgecolor='none'))\nax1.text(3.6, 2.35, 'n', fontsize=15, ha='center', va='center',\n         fontweight='bold', color='white',\n         bbox=dict(boxstyle='round,pad=0.3', facecolor='#27ae60', edgecolor='none'))\nax1.text(3.15, 1.55, 'must match', fontsize=10, ha='center', va='center',\n         color='#27ae60', fontstyle='italic')\n\n# Arrow to result\narrow1 = FancyArrowPatch((6.4, 3.2), (7.2, 3.2),\n    arrowstyle='->', mutation_scale=20,\n    linewidth=2, color='#555555')\nax1.add_patch(arrow1)\n\n# Result C box\nrect_C = mpatches.FancyBboxPatch((7.3, 2.0), 2.3, 2.4,\n    boxstyle='round,pad=0.1', linewidth=2,\n    edgecolor='#333333', facecolor='#fef9e7')\nax1.add_patch(rect_C)\nax1.text(8.45, 3.2, 'C = AB', fontsize=16, ha='center', va='center', fontweight='bold', color='#b7770d')\nax1.text(8.45, 2.35, 'm × p', fontsize=13, ha='center', va='center', color='#b7770d')\n\n# Outer dimension labels\nax1.annotate('', xy=(0.3, 1.3), xytext=(2.7, 1.3),\n             arrowprops=dict(arrowstyle='<->', color='#1a6fa8', lw=1.5))\nax1.text(1.5, 0.95, 'outer: m', fontsize=10, ha='center', color='#1a6fa8')\nax1.annotate('', xy=(3.8, 1.3), xytext=(6.2, 1.3),\n             arrowprops=dict(arrowstyle='<->', color='#1a6fa8', lw=1.5))\nax1.text(5.0, 0.95, 'outer: p', fontsize=10, ha='center', color='#1a6fa8')\n\n# Note at bottom\nax1.text(5.0, 0.3, 'entry  c\\u1d62\\u2c7c = row i of A  \\u00b7  column j of B',\n         fontsize=10.5, ha='center', va='center', color='#444444',\n         style='italic',\n         bbox=dict(boxstyle='round,pad=0.4', facecolor='#f0f0f0', edgecolor='#cccccc'))\n\n# ── Panel 2: INVALID product ────────────────────────────────────────────\nax2 = axes[1]\nax2.set_xlim(0, 10)\nax2.set_ylim(0, 6)\nax2.axis('off')\nax2.set_facecolor('white')\nax2.set_title('INVALID: Inner Dimensions Do Not Match', fontsize=13, fontweight='bold', pad=12, color='#1a1a1a')\n\n# Matrix A box\nrect_A2 = mpatches.FancyBboxPatch((0.3, 2.0), 2.4, 2.4,\n    boxstyle='round,pad=0.1', linewidth=2,\n    edgecolor='#333333', facecolor='#fde8e8')\nax2.add_patch(rect_A2)\nax2.text(1.5, 3.2, 'A', fontsize=22, ha='center', va='center', fontweight='bold', color='#c0392b')\nax2.text(1.5, 2.35, 'm × n', fontsize=13, ha='center', va='center', color='#c0392b')\n\n# Matrix B box\nrect_B2 = mpatches.FancyBboxPatch((3.8, 2.0), 2.4, 2.4,\n    boxstyle='round,pad=0.1', linewidth=2,\n    edgecolor='#333333', facecolor='#fde8e8')\nax2.add_patch(rect_B2)\nax2.text(5.0, 3.2, 'B', fontsize=22, ha='center', va='center', fontweight='bold', color='#c0392b')\nax2.text(5.0, 2.35, 'q × p', fontsize=13, ha='center', va='center', color='#c0392b')\n\n# Highlight mismatched inner dimensions in red\nax2.text(2.7, 2.35, 'n', fontsize=15, ha='center', va='center',\n         fontweight='bold', color='white',\n         bbox=dict(boxstyle='round,pad=0.3', facecolor='#e74c3c', edgecolor='none'))\nax2.text(3.6, 2.35, 'q', fontsize=15, ha='center', va='center',\n         fontweight='bold', color='white',\n         bbox=dict(boxstyle='round,pad=0.3', facecolor='#e74c3c', edgecolor='none'))\nax2.text(3.15, 1.55, 'n \\u2260 q  \\u2192  undefined!', fontsize=10, ha='center', va='center',\n         color='#e74c3c', fontstyle='italic', fontweight='bold')\n\n# X mark instead of arrow\nax2.text(6.9, 3.2, '\\u2717', fontsize=36, ha='center', va='center', color='#e74c3c', fontweight='bold')\n\n# No result box — just label\nax2.text(8.45, 3.2, 'AB\\nnot defined', fontsize=14, ha='center', va='center',\n         color='#888888', fontstyle='italic')\n\n# Reminder note\nax2.text(5.0, 0.3, 'Tip: AB defined  \\u2260  BA defined.  Order matters in matrix multiplication.',\n         fontsize=10.5, ha='center', va='center', color='#444444',\n         style='italic',\n         bbox=dict(boxstyle='round,pad=0.4', facecolor='#f0f0f0', edgecolor='#cccccc'))\n\nplt.tight_layout(pad=2.0)\nplt.savefig('generated/B.6-2 Matrix Algebra-4.png', dpi=150, bbox_inches='tight')\n",
      "output_path": "generated/B.6-2 Matrix Algebra-4.png",
      "caption": "Left: A (m x n) times B (n x p) is valid because the inner dimensions match — the result is m x p. Right: A (m x n) times B (q x p) is undefined when n does not equal q. The inner dimensions must match; the outer dimensions give the result size."
    },
    {
      "type": "text_explanation",
      "content": "## 2. Matrix Multiplication: The Rule Exams Love\n\nFollow this three-step pattern every time:\n\n1. **Check dimensions:** columns of A must equal rows of B.\n2. **Read result size:** rows of A by columns of B.\n3. **Compute one entry:** take row i from A and column j from B, multiply element-by-element, and sum.\n\n### KEY INSIGHT\n\nMatrix multiplication is **not** entrywise. You do not multiply matching positions. You take a full row and a full column and dot them together.\n\nThe textbook calls this: A postmultiplied by B, or B premultiplied by A. Order matters — AB and BA are generally not equal.\n\n### ALGEBRA SHORTCUTS FOR EXAMS\n\nThese two distributive rules appear constantly in derivations:\n\n- **(A + B)C = AC + BC** — distribute from the right\n- **C(A + B) = CA + CB** — distribute from the left\n- **AI = IA = A** — the identity matrix leaves A unchanged (when dimensions are conformable)\n\n> **Trap:** AB = BA is almost never true for general matrices. Do not assume commutativity."
    },
    {
      "type": "math_block",
      "latex": "c_{ij} = \\sum_{k=1}^{n} a_{ik} b_{kj}, \\qquad (A+B)C = AC + BC, \\quad C(A+B)=CA+CB, \\quad AI=IA=A",
      "explanation": "Each entry of the product AB is a row-column dot product, and the distributive and identity rules let you expand and simplify matrix expressions quickly without recomputing full products."
    },
    {
      "type": "text_explanation",
      "content": "## 3. Matrix-Vector Form and When Inverse Exists\n\n**Matrix-vector multiplication:** When x is an n x 1 column vector, Ax is just standard matrix multiplication — A must have n columns, and the result is a column vector. Note that xA is generally meaningless in this context because the dimensions do not conform.\n\n**Solving for x using the inverse:** If you have the system y = Ax and A is invertible, multiply both sides on the left by A⁻¹:\n\nx = A⁻¹y\n\nThis works because A⁻¹A = I, which collapses the right side to just x.\n\n### TWO CONDITIONS FOR INVERTIBILITY\n\nBoth must hold — neither alone is sufficient:\n\n1. **A must be square** (same number of rows and columns)\n2. **det(A) must be nonzero** — A is called **nonsingular** when |A| ≠ 0\n\n### COMMON TRAP\n\nSquare alone is not enough. A square matrix with determinant zero (a singular matrix) has no inverse. Always check both conditions."
    },
    {
      "type": "math_block",
      "latex": "y = Ax, \\qquad A^{-1}A = I, \\qquad x = A^{-1}y, \\qquad A^{-1} \\text{ exists only if } A \\text{ is square and } |A| \\ne 0",
      "explanation": "The inverse A⁻¹ solves x directly from y = Ax, but only when A is a nonsingular square matrix — meaning it is square and its determinant is nonzero."
    },
    {
      "type": "section_summary",
      "bullets": [
        "Matrix addition is entrywise and requires both matrices to have exactly the same dimensions.",
        "For AB: inner dimensions must match; outer dimensions give the result size; use row-by-column dot product for each entry.",
        "A⁻¹ exists only when A is square and det(A) is nonzero — square alone is not sufficient."
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
          "label": "Addition requires same order; scalar multiplication is entrywise",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Which pair of matrices can be added?",
              "options": [
                "A. A is 2x3 and B is 2x3",
                "B. A is 2x3 and B is 3x2",
                "C. A is 1x4 and B is 4x1",
                "D. A is 2x2 and B is 2x3"
              ],
              "correct_option": "A",
              "explanation": "Matrix addition is defined only when the two matrices have exactly the same order.",
              "wrong_option_explanations": {
                "B": "Same number of entries is not enough; the shape must match exactly.",
                "C": "A row vector and a column vector are not the same order.",
                "D": "The column counts differ, so addition is undefined."
              },
              "hint": "Check both rows and columns, not just total entries.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "If A = [[1, -2], [3, 0]], what is 2A?",
              "options": [
                "A. [[2, -4], [6, 0]]",
                "B. [[2, -2], [3, 0]]",
                "C. [[1, -4], [6, 0]]",
                "D. [[2, 4], [6, 0]]"
              ],
              "correct_option": "A",
              "explanation": "Scalar multiplication multiplies every entry of the matrix by the scalar.",
              "wrong_option_explanations": {
                "B": "Not every entry was multiplied by 2.",
                "C": "The top-left entry should also double.",
                "D": "The sign of -2 must remain negative after doubling."
              },
              "hint": "Touch every entry once.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "matrix_multiplication_conformability",
          "label": "When AB is defined and what size it has",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "If A is 3x2 and B is 2x5, which statement is correct?",
              "options": [
                "A. AB is defined and has size 3x5",
                "B. AB is defined and has size 2x2",
                "C. AB is not defined",
                "D. AB is defined and has size 5x3"
              ],
              "correct_option": "A",
              "explanation": "The inner dimensions match: 2 and 2. The result keeps the outer dimensions: 3x5.",
              "wrong_option_explanations": {
                "B": "That confuses the matching inner dimensions with the output size.",
                "C": "It is defined because the number of columns of A equals the number of rows of B.",
                "D": "The output size is not reversed; it is rows of A by columns of B."
              },
              "hint": "Inside match, outside stay.",
              "needs_visual": true,
              "visual_type": "dimension_conformability_diagram",
              "same_point_variant": true
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "Suppose A is 2x3 and B is 4x2. Why is AB meaningless?",
              "options": [
                "A. Because the matrices are not square",
                "B. Because the number of columns of A does not equal the number of rows of B",
                "C. Because the row counts are different",
                "D. Because only same-sized matrices can be multiplied"
              ],
              "correct_option": "B",
              "explanation": "For AB to exist, the number of columns of A must equal the number of rows of B.",
              "wrong_option_explanations": {
                "A": "Matrices do not need to be square to be multiplied.",
                "C": "Different row counts do not automatically block multiplication.",
                "D": "That rule belongs to addition, not multiplication."
              },
              "hint": "Use the conformability rule, not the addition rule.",
              "needs_visual": true,
              "visual_type": "valid_vs_invalid_product_shape_diagram",
              "same_point_variant": true
            },
            {
              "id": "kp2_q3",
              "type": "short_answer",
              "stem": "For A = [[2, 3], [1, 1]] and B = [[1, 3, 1, 2], [2, 1, 1, 1]], find the entry in row 1, column 3 of AB.",
              "ideal_answer": "5",
              "grading_rubric": [
                "Must use row 1 of A and column 3 of B",
                "Must compute 2(1) + 3(1)",
                "