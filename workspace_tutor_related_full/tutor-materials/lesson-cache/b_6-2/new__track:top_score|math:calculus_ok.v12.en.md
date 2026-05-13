```json
{
  "section_id": "B.6-2 Matrix Algebra",
  "section_title": "B.6-2 Matrix Algebra",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.6-2 Matrix Algebra\n\n> **Section Objective:** Master the operating rules of matrices — what operations are legal, when they apply, and what size result they produce.\n\n---\n\nBefore any arithmetic, three quick decisions separate full credit from zero:\n\n1. **Is A + B allowed?** Only if A and B have exactly the same dimensions.\n2. **Is AB defined?** Only if the number of columns in A equals the number of rows in B.\n3. **Does A⁻¹ exist?** Only if A is square *and* its determinant is nonzero.\n\nMost point loss on matrix problems comes from illegal operations and order mistakes — not from arithmetic errors. A student who multiplies two incompatible matrices confidently will lose every mark on that problem.\n\nThis section builds the three fastest checks you need:\n- **Same size** → addition/subtraction is legal\n- **Inner dimensions match** → multiplication is defined\n- **Square + nonzero determinant** → inverse exists"
    },
    {
      "type": "book_image",
      "source_page": "page-039",
      "fig_id": null,
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use this page to lock in the row-by-column multiplication pattern fast.",
        "standard": "Use this figure to explain where each entry c_ij comes from and why dimensions matter.",
        "top_score": "Use this figure to stress that multiplication is directional and legality depends on inner dimensions, not outer ones."
      },
      "caption": "The textbook's core matrix-multiplication rule: each output entry c_ij is the dot product of row i of A with column j of B, so the inner dimensions of A and B must match."
    },
    {
      "type": "math_block",
      "latex": "A + B = (a_{ij} + b_{ij})_{m\\times n}, \\qquad cA = Ac, \\qquad c_{ij} = \\sum_{k=1}^{n} a_{ik} b_{kj}",
      "explanation": "Addition and subtraction are entrywise operations — they require A and B to have identical dimensions, and the result keeps that same size; scalar multiplication simply scales every entry of the matrix by the constant c. Matrix multiplication is fundamentally different: each output entry c_ij is a row-column dot product, summing n individual products, so the result cannot be obtained by multiplying corresponding entries."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "exam_pattern_anchor",
      "mode_specific_visual_use": {
        "cram": "Use this to train instant recognition of valid products and resulting size.",
        "standard": "Use this to make the conformability rule visual before doing examples.",
        "top_score": "Use this to compare AB and BA side by side and expose order-sensitive traps."
      },
      "script": "import matplotlib.pyplot as plt\nimport matplotlib.patches as mpatches\nfrom matplotlib.patches import FancyArrowPatch\n\nfig, axes = plt.subplots(1, 2, figsize=(12, 5))\nfig.patch.set_facecolor('white')\n\n# ── LEFT PANEL: AB defined ──────────────────────────────────────────────\nax = axes[0]\nax.set_xlim(0, 10)\nax.set_ylim(0, 6)\nax.set_aspect('equal')\nax.axis('off')\nax.set_title('AB  —  DEFINED', fontsize=14, fontweight='bold', color='#1a1a2e', pad=12)\n\n# Matrix A box\nrect_A = mpatches.FancyBboxPatch((0.3, 2.5), 2.2, 2.2,\n    boxstyle='round,pad=0.1', linewidth=2,\n    edgecolor='#2c7bb6', facecolor='#d4e9f7')\nax.add_patch(rect_A)\nax.text(1.4, 3.6, 'A', fontsize=22, fontweight='bold', ha='center', va='center', color='#2c7bb6')\nax.text(1.4, 2.75, 'm × n', fontsize=12, ha='center', va='center', color='#2c7bb6')\n\n# Matrix B box\nrect_B = mpatches.FancyBboxPatch((3.8, 2.5), 2.2, 2.2,\n    boxstyle='round,pad=0.1', linewidth=2,\n    edgecolor='#2c7bb6', facecolor='#d4e9f7')\nax.add_patch(rect_B)\nax.text(4.9, 3.6, 'B', fontsize=22, fontweight='bold', ha='center', va='center', color='#2c7bb6')\nax.text(4.9, 2.75, 'n × p', fontsize=12, ha='center', va='center', color='#2c7bb6')\n\n# Highlight matching inner dimension n\nax.annotate('', xy=(3.8, 3.1), xytext=(2.5, 3.1),\n    arrowprops=dict(arrowstyle='->', color='#e84545', lw=2.5))\nax.text(3.15, 3.35, 'n = n', fontsize=11, ha='center', color='#e84545', fontweight='bold')\nax.text(3.15, 2.85, 'MATCH', fontsize=9, ha='center', color='#e84545', style='italic')\n\n# Arrow to result\nax.annotate('', xy=(7.8, 3.6), xytext=(6.2, 3.6),\n    arrowprops=dict(arrowstyle='->', color='#333333', lw=2))\n\n# Result C box\nrect_C = mpatches.FancyBboxPatch((7.8, 2.5), 2.0, 2.2,\n    boxstyle='round,pad=0.1', linewidth=2,\n    edgecolor='#27ae60', facecolor='#d5f5e3')\nax.add_patch(rect_C)\nax.text(8.8, 3.6, 'AB', fontsize=20, fontweight='bold', ha='center', va='center', color='#27ae60')\nax.text(8.8, 2.75, 'm × p', fontsize=12, ha='center', va='center', color='#27ae60')\n\n# Outer dimension labels\nax.text(1.4, 4.85, 'm (outer)', fontsize=9, ha='center', color='#555555', style='italic')\nax.text(4.9, 4.85, 'p (outer)', fontsize=9, ha='center', color='#555555', style='italic')\nax.text(8.8, 4.85, 'outer dims', fontsize=9, ha='center', color='#27ae60', style='italic')\n\n# Rule box at bottom\nrule_box = mpatches.FancyBboxPatch((0.1, 0.2), 9.7, 1.8,\n    boxstyle='round,pad=0.15', linewidth=1.5,\n    edgecolor='#aaaaaa', facecolor='#fafafa')\nax.add_patch(rule_box)\nax.text(5.05, 1.55, 'Inner dimensions must match', fontsize=11,\n    ha='center', va='center', color='#333333', fontweight='bold')\nax.text(5.05, 1.0, 'Output takes the OUTER dimensions: m × p', fontsize=10,\n    ha='center', va='center', color='#555555')\nax.text(5.05, 0.45, 'Example: (3×2)(2×5) → 3×5', fontsize=10,\n    ha='center', va='center', color='#2c7bb6', style='italic')\n\n# ── RIGHT PANEL: BA — conditional ──────────────────────────────────────\nax2 = axes[1]\nax2.set_xlim(0, 10)\nax2.set_ylim(0, 6)\nax2.set_aspect('equal')\nax2.axis('off')\nax2.set_title('BA  —  DEFINED ONLY IF p = m', fontsize=13, fontweight='bold', color='#8e1a1a', pad=12)\n\n# Matrix B box\nrect_B2 = mpatches.FancyBboxPatch((0.3, 2.5), 2.2, 2.2,\n    boxstyle='round,pad=0.1', linewidth=2,\n    edgecolor='#e67e22', facecolor='#fdebd0')\nax2.add_patch(rect_B2)\nax2.text(1.4, 3.6, 'B', fontsize=22, fontweight='bold', ha='center', va='center', color='#e67e22')\nax2.text(1.4, 2.75, 'n × p', fontsize=12, ha='center', va='center', color='#e67e22')\n\n# Matrix A box\nrect_A2 = mpatches.FancyBboxPatch((3.8, 2.5), 2.2, 2.2,\n    boxstyle='round,pad=0.1', linewidth=2,\n    edgecolor='#e67e22', facecolor='#fdebd0')\nax2.add_patch(rect_A2)\nax2.text(4.9, 3.6, 'A', fontsize=22, fontweight='bold', ha='center', va='center', color='#e67e22')\nax2.text(4.9, 2.75, 'm × n', fontsize=12, ha='center', va='center', color='#e67e22')\n\n# Highlight inner mismatch p vs m\nax2.annotate('', xy=(3.8, 3.1), xytext=(2.5, 3.1),\n    arrowprops=dict(arrowstyle='->', color='#c0392b', lw=2.5))\nax2.text(3.15, 3.4, 'p  vs  m', fontsize=11, ha='center', color='#c0392b', fontweight='bold')\nax2.text(3.15, 2.85, 'MUST CHECK', fontsize=9, ha='center', color='#c0392b', style='italic')\n\n# Conditional result\nax2.annotate('', xy=(7.8, 3.6), xytext=(6.2, 3.6),\n    arrowprops=dict(arrowstyle='->', color='#888888', lw=2, linestyle='dashed'))\n\n# Result box — conditional\nrect_C2 = mpatches.FancyBboxPatch((7.8, 2.5), 2.0, 2.2,\n    boxstyle='round,pad=0.1', linewidth=2,\n    edgecolor='#c0392b', facecolor='#fadbd8')\nax2.add_patch(rect_C2)\nax2.text(8.8, 3.65, 'BA', fontsize=20, fontweight='bold', ha='center', va='center', color='#c0392b')\nax2.text(8.8, 3.05, 'p × n', fontsize=11, ha='center', va='center', color='#c0392b')\nax2.text(8.8, 2.65, 'if p = m', fontsize=9, ha='center', va='center', color='#c0392b', style='italic')\n\n# Warning box at bottom\nwarn_box = mpatches.FancyBboxPatch((0.1, 0.2), 9.7, 1.8,\n    boxstyle='round,pad=0.15', linewidth=2,\n    edgecolor='#c0392b', facecolor='#fff5f5')\nax2.add_patch(warn_box)\nax2.text(5.05, 1.55, 'AB defined does NOT guarantee BA is defined', fontsize=10.5,\n    ha='center', va='center', color='#c0392b', fontweight='bold')\nax2.text(5.05, 1.0, 'Even if both exist, AB ≠ BA in general', fontsize=10,\n    ha='center', va='center', color='#555555')\nax2.text(5.05, 0.45, 'Example: (3×2)(2×5)=3×5  but  (2×5)(3×2) UNDEFINED', fontsize=9.5,\n    ha='center', va='center', color='#8e1a1a', style='italic')\n\nplt.tight_layout(pad=1.5)\nplt.savefig('generated/B.6-2 Matrix Algebra-3.png', dpi=150, bbox_inches='tight')",
      "output_path": "generated/B.6-2 Matrix Algebra-3.png",
      "caption": "Dimension-flow diagram: AB is defined when the inner dimensions match, and the product takes the outer dimensions. BA requires a separate check — AB existing does not guarantee BA exists."
    },
    {
      "type": "text_explanation",
      "content": "## 1. Legal Operations and Dimension Checks\n\nThree checks cover almost every matrix operation question on an exam.\n\n### CHECK 1 — ADDITION AND SUBTRACTION\n\nA + B and A − B are defined **only when A and B have exactly the same dimensions** (same number of rows *and* same number of columns). The result has that same size. There are no exceptions.\n\n### CHECK 2 — MULTIPLICATION LEGALITY\n\nFor the product AB to exist, the **number of columns of A must equal the number of rows of B**. This is the inner-dimension rule. If A is m×n and B is n×p, the inner dimensions are both n — they match, so AB is defined.\n\n### CHECK 3 — PRODUCT SIZE\n\nIf AB is defined with A as m×n and B as n×p, then **AB is m×p** — the outer dimensions become the result size. The matched inner dimension disappears.\n\n### CRITICAL WARNING\n\nMatrix multiplication is **not entrywise** and is **not generally commutative**. AB and BA are separate questions requiring separate checks.\n\n### HIGH-SCORE INSIGHT\n\nMany exam problems can be solved entirely by checking legality and reading off the output size — no arithmetic needed.\n\n> **Mini-check:** (2×3)(3×4) → inner dimensions 3=3, defined, result is **2×4**. But (3×4)(2×3) → inner dimensions 4≠2, **undefined**."
    },
    {
      "type": "text_explanation",
      "content": "## 2. Identity, Matrix-Vector Products, and Inverse\n\n### THE IDENTITY MATRIX\n\nThe identity matrix I acts as the matrix equivalent of the number 1: multiplying any matrix A by I leaves A unchanged. The key constraint is that **I must have the correct order** for the multiplication to be legal. Specifically, AI = A requires I to be n×n when A is m×n, and IA = A requires I to be m×m.\n\n### MATRIX-VECTOR PRODUCTS\n\nA column vector **x** can be treated as an **n×1 matrix**. Under this interpretation, the product **Ax** is defined whenever A is m×n and x is n×1 — the inner dimensions match and the result is an m×1 vector. The reverse product **xA** is generally undefined in this setup because x is n×1 and A is m×n, so the inner dimensions (1 vs. m) will not match unless m = 1.\n\n### INVERSE AND SOLVING LINEAR SYSTEMS\n\nGiven the equation **y = Ax**, if A has an inverse A⁻¹, we can premultiply both sides to recover x:\n\n$$A^{-1}y = A^{-1}Ax = Ix = x$$\n\nAn inverse exists **only when A is square and det(A) ≠ 0** (called a nonsingular matrix). When the inverse exists, A⁻¹A = I = AA⁻¹.\n\n### EXAM TRAP\n\n> **Square does NOT imply invertible.** A square matrix with det(A) = 0 is singular and has no inverse. Always verify both conditions."
    },
    {
      "type": "math_block",
      "latex": "AI = IA = A, \\qquad y = Ax, \\qquad A^{-1}A = I = AA^{-1}, \\qquad x = A^{-1}y",
      "explanation": "The identity matrix I leaves A completely unchanged when multiplied on either side, provided I has the correct matching order. The inverse A⁻¹ undoes the action of A: starting from y = Ax, premultiplying both sides by A⁻¹ collapses A⁻¹A into the identity and isolates x = A⁻¹y. This solution step is valid only when A is a nonsingular square matrix — square in shape and with a nonzero determinant; if either condition fails, no inverse exists and this approach cannot be used."
    },
    {
      "type": "section_summary",
      "bullets": [
        "Addition requires identical dimensions; multiplication requires matching inner dimensions — check before computing anything.",
        "Product AB is m×p when A is m×n and B is n×p; AB existing does not mean BA is defined or equal.",
        "A matrix inverse exists only when A is square AND det(A) ≠ 0 — square alone is not sufficient."
      ],
      "transition": "In the next section we will use these matrix rules inside larger problem-solving steps."
    },
    {
      "type": "quiz_plan",
      "target_questions": 8,
      "question_range": {
        "min": 7,
        "max": 9
      },
      "knowledge_points": [
        {
          "id": "addition_and_scalar_rules",
          "label": "Addition/subtraction and scalar multiplication",
          "importance": "high",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Matrices A and B are both 2×3. Which statement must be true?",
              "options": [
                "A. A+B is defined and is 2×3",
                "B. AB is defined and is 2×3",
                "C. BA is defined and is 2×2",
                "D. A⁻¹ exists"
              ],
              "correct_option": "A",
              "explanation": "Addition is defined for matrices of the same order and keeps that same size. A and B are both 2×3, so A+B is defined and the result is 2×3.",
              "wrong_option_explanations": {
                "B": "AB would require the number of columns of A to equal the number of rows of B. Here A has 3 columns and B has 2 rows, so 3 ≠ 2 and AB is undefined.",
                "C": "BA has the same mismatch: B has 3 columns and A has 2 rows, so 3 ≠ 2 and BA is also undefined.",
                "D": "A is 2×3, which is not square, so an inverse cannot exist."
              },
              "hint": "For addition, think 'same size exactly.' For multiplication, check the inner dimensions.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "Which statement about scalar multiplication is correct?",
              "options": [
                "A. cA changes the size of A",
                "B. cA multiplies each entry of A by c",
                "C. cA is defined only when A is square",
                "D. cA and Ac are different operations with different results"
              ],
              "correct_option": "B",
              "explanation": "Scalar multiplication scales every single entry of the matrix by the constant c. The size of the matrix does not change, and there is no restriction on A being square.",
              "wrong_option_explanations": {
                "A": "Scalar multiplication changes the values of entries, not the dimensions of the matrix.",
                "C": "Any matrix — rectangular or square — can be multiplied by a scalar.",
                "D": "For a scalar c, the textbook states cA = Ac. The scalar commutes freely with the matrix."
              },
              "hint": "A scalar is just a number. Multiplying a matrix by a number scales every entry uniformly.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "matrix_multiplication_and_conformability",
          "label": "Conformability, product size, and order sensitivity",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "If A is 3×2 and B is 2×5, what can you conclude?",
              "options": [
                "A. AB is defined and is 3×5",
                "B. AB is defined and is 2×2",
                "C. BA is defined and is 3×5",
                "D. Neither AB nor BA is defined"
              ],
              "correct_option": "A",
              "explanation": "For AB: A has 2 columns and B has 2 rows — the inner dimensions match. The output takes the outer dimensions: 3 (rows of A) × 5 (columns of B) = 3×5.",
              "wrong_option_explanations": {
                "B": "2×2 incorrectly uses the matched inner dimension as the output size. The output always takes the outer dimensions, not the inner ones.",
                "C": "BA would be (2×5)(3×2). The inner dimensions are 5 and 3; since 5 ≠ 3, BA is undefined.",
                "D": "AB is defined — only BA is undefined here."
              },
              "hint": "Match inside, keep outside. Check AB and BA as two completely separate questions.",
              "needs_visual": true,
              "visual_type": "dimension_flow",
              "same_point_variant": false
            },
            {
              "id": "kp2_q2",
              "type": "