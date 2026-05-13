```json
{
  "section_id": "B.5-1",
  "section_title": "Method of Clearing Fractions",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.5-1 Method of Clearing Fractions\n\n> **Section Objective:** Learn how to decompose a proper rational function into simpler partial fractions by choosing the correct template, clearing denominators, and solving for unknown constants by matching coefficients.\n\n---\n\nWhen a rational function is already proper — meaning the degree of the numerator is strictly less than the degree of the denominator — we can rewrite it as a sum of simpler fractions with unknown constants, then solve for those constants by clearing denominators.\n\nThe textbook example we will work through is:\n\n$$F(x) = \\frac{x^3 + 3x^2 + 4x + 6}{(x+1)(x+2)(x+3)^2}$$\n\nOn this page you will learn: how to choose the correct partial-fraction template, why a repeated factor demands multiple terms, and how matching polynomial coefficients produces a solvable system. This method is slower than some later techniques, but it is the safest universal method when you need a dependable, exam-proof setup."
    },
    {
      "type": "book_image",
      "source_page": "page-026",
      "fig_id": null,
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the worked example to memorize the standard setup pattern for repeated linear factors.",
        "standard": "Walk through the textbook's exact decomposition and clearing step alongside this page.",
        "top_score": "Focus on why (x+3)^2 creates both a 1/(x+3) and a 1/(x+3)^2 term — omitting either is a common point-loss trap."
      },
      "caption": "This textbook example shows the full clearing-fractions workflow, with particular emphasis on the correct two-term setup required when one linear factor is repeated."
    },
    {
      "type": "math_block",
      "latex": "\\frac{x^3+3x^2+4x+6}{(x+1)(x+2)(x+3)^2}=\\frac{k_1}{x+1}+\\frac{k_2}{x+2}+\\frac{k_3}{x+3}+\\frac{k_4}{(x+3)^2}",
      "explanation": "The first scoring checkpoint is writing this template correctly: a repeated linear factor of multiplicity 2 requires both a first-power term \\(k_3/(x+3)\\) and a second-power term \\(k_4/(x+3)^2\\) — omitting either makes the entire decomposition incomplete before any algebra begins."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "exam_pattern_anchor",
      "mode_specific_visual_use": {
        "cram": "Use this as a 5-step checklist you can follow under time pressure.",
        "standard": "Use this to see how each algebra step leads logically to the next without skipping any reasoning.",
        "top_score": "Pay attention to the two warning notes — they mark the exact trap checkpoints where points are most commonly lost."
      },
      "script": "import matplotlib.pyplot as plt\nimport matplotlib.patches as mpatches\nfrom matplotlib.patches import FancyBboxPatch, FancyArrowPatch\n\nfig, ax = plt.subplots(figsize=(14, 5))\nax.set_xlim(0, 14)\nax.set_ylim(0, 5)\nax.axis('off')\nfig.patch.set_facecolor('white')\n\n# Box definitions: (x_center, y_center, label_lines)\nboxes = [\n    (1.2, 3.5, ['Step 1', 'Check proper', 'rational function']),\n    (4.0, 3.5, ['Step 2', 'Write full partial-', 'fraction template']),\n    (6.8, 3.5, ['Step 3', 'Multiply both sides', 'by common denom.']),\n    (9.6, 3.5, ['Step 4', 'Collect coefficients', 'of x\\u00b3, x\\u00b2, x, const.']),\n    (12.4, 3.5, ['Step 5', 'Solve linear system', 'for k\\u2081,k\\u2082,k\\u2083,k\\u2084'])\n]\n\nbox_w = 2.2\nbox_h = 1.4\nbox_color = '#EAF4FB'\nborder_color = '#2980B9'\n\nfor (cx, cy, lines) in boxes:\n    rect = FancyBboxPatch(\n        (cx - box_w/2, cy - box_h/2),\n        box_w, box_h,\n        boxstyle='round,pad=0.08',\n        linewidth=1.8,\n        edgecolor=border_color,\n        facecolor=box_color\n    )\n    ax.add_patch(rect)\n    ax.text(cx, cy + 0.35, lines[0], ha='center', va='center',\n            fontsize=9, fontweight='bold', color='#1A5276')\n    ax.text(cx, cy - 0.05, lines[1], ha='center', va='center',\n            fontsize=7.5, color='#2C3E50')\n    ax.text(cx, cy - 0.42, lines[2], ha='center', va='center',\n            fontsize=7.5, color='#2C3E50')\n\n# Arrows between boxes\narrow_y = 3.5\narrow_xs = [\n    (1.2 + box_w/2, 4.0 - box_w/2),\n    (4.0 + box_w/2, 6.8 - box_w/2),\n    (6.8 + box_w/2, 9.6 - box_w/2),\n    (9.6 + box_w/2, 12.4 - box_w/2),\n]\nfor (x_start, x_end) in arrow_xs:\n    ax.annotate('',\n        xy=(x_end, arrow_y),\n        xytext=(x_start, arrow_y),\n        arrowprops=dict(arrowstyle='->', color='#2980B9', lw=1.8)\n    )\n\n# Warning note under Step 2\nwarn_box1 = FancyBboxPatch(\n    (4.0 - 1.35, 1.05), 2.7, 0.95,\n    boxstyle='round,pad=0.07',\n    linewidth=1.3,\n    edgecolor='#C0392B',\n    facecolor='#FDEDEC'\n)\nax.add_patch(warn_box1)\nax.text(4.0, 1.72, 'WARNING', ha='center', va='center',\n        fontsize=7.5, fontweight='bold', color='#C0392B')\nax.text(4.0, 1.35, 'Repeated (x+3)\\u00b2 needs BOTH', ha='center', va='center',\n        fontsize=7, color='#922B21')\nax.text(4.0, 1.08, '1/(x+3) AND 1/(x+3)\\u00b2 terms', ha='center', va='center',\n        fontsize=7, color='#922B21')\n# Dashed line from warning to Step 2 box bottom\nax.plot([4.0, 4.0], [2.0, 2.8], linestyle='--', color='#C0392B', lw=1.2)\n\n# Warning note under Step 4\nwarn_box2 = FancyBboxPatch(\n    (9.6 - 1.35, 1.05), 2.7, 0.95,\n    boxstyle='round,pad=0.07',\n    linewidth=1.3,\n    edgecolor='#C0392B',\n    facecolor='#FDEDEC'\n)\nax.add_patch(warn_box2)\nax.text(9.6, 1.72, 'WARNING', ha='center', va='center',\n        fontsize=7.5, fontweight='bold', color='#C0392B')\nax.text(9.6, 1.35, 'Expand fully before matching', ha='center', va='center',\n        fontsize=7, color='#922B21')\nax.text(9.6, 1.08, 'coefficients — no guessing', ha='center', va='center',\n        fontsize=7, color='#922B21')\nax.plot([9.6, 9.6], [2.0, 2.8], linestyle='--', color='#C0392B', lw=1.2)\n\nax.set_title('Clearing-Fractions Workflow: 5-Step Process', fontsize=12,\n             fontweight='bold', color='#1A252F', pad=10)\n\nplt.tight_layout()\nplt.savefig('generated/B.5-1-4.png', dpi=150, bbox_inches='tight')\n",
      "output_path": "generated/B.5-1-4.png",
      "caption": "The five-step clearing-fractions pipeline. Red warning notes mark the two most common trap points: an incomplete repeated-factor template (Step 2) and premature coefficient matching before full expansion (Step 4)."
    },
    {
      "type": "text_explanation",
      "content": "## 1. Set Up the Full Partial-Fraction Form Correctly\n\nThe setup rule is straightforward once you know it: every **distinct** linear factor contributes exactly one term with a constant numerator, while a **repeated** linear factor of multiplicity $n$ contributes $n$ separate terms — one for each power from 1 up to $n$.\n\nIn our example:\n- $(x+1)$ is distinct → contributes $k_1/(x+1)$\n- $(x+2)$ is distinct → contributes $k_2/(x+2)$\n- $(x+3)^2$ is repeated with multiplicity 2 → contributes **both** $k_3/(x+3)$ **and** $k_4/(x+3)^2$\n\n### COMMON MISTAKE\n\nWriting only $k/(x+3)^2$ and forgetting the $k_3/(x+3)$ term is one of the most frequent setup errors. The decomposition is then structurally incomplete, and no amount of correct algebra afterward can fix it.\n\n#### Note\n\nBecause all factors here are linear, every numerator is a **constant**. Do not write $ax+b$ in the numerator — that form is reserved for irreducible quadratic factors.\n\n> **High-Score Insight:** Many errors happen before a single line of algebra is written. A complete, correctly structured template is already half the problem solved."
    },
    {
      "type": "text_explanation",
      "content": "## 2. Clear Denominators and Equate Coefficients\n\nOnce the template is correct, multiply **both sides** by the full common denominator $(x+1)(x+2)(x+3)^2$. Every fraction disappears, and you are left with a polynomial identity:\n\n$$x^3+3x^2+4x+6 = k_1(x+2)(x+3)^2 + k_2(x+1)(x+3)^2 + k_3(x+1)(x+2)(x+3) + k_4(x+1)(x+2)$$\n\nExpand each product fully, then group all terms by power of $x$. The key principle is: **two polynomials that are equal for every value of $x$ must have identical coefficients for every power of $x$**. This is not an approximation — it is an exact algebraic identity.\n\nThe textbook's coefficient system includes the equation $k_1 + k_2 + k_3 = 1$ for the $x^3$ terms.\n\n### KEY INSIGHT\n\nNotice that $k_4$ does **not** appear in the $x^3$ equation. Why? After clearing, the $k_4$ term becomes $k_4(x+1)(x+2) = k_4(x^2+3x+2)$, which is only degree 2. It contributes to the $x^2$, $x$, and constant equations — but not to the cubic. Stronger students recognize this immediately and use it to simplify the system."
    },
    {
      "type": "book_image",
      "source_page": "page-027",
      "fig_id": null,
      "teaching_role": "example_support",
      "mode_specific_visual_use": {
        "cram": "Use the final solved constants as a quick answer check after completing the setup yourself.",
        "standard": "Connect the coefficient system shown here to the finished decomposition step by step.",
        "top_score": "Verify the answer: substitute the solved constants back into the original template and confirm that every term is correctly placed and signed."
      },
      "caption": "The textbook arrives at $k_1=1,\\ k_2=-2,\\ k_3=2,\\ k_4=-3$, confirming that the repeated factor $(x+3)^2$ contributes two distinct pieces to the final decomposition."
    },
    {
      "type": "section_summary",
      "bullets": [
        "A repeated linear factor $(x+a)^2$ requires both $1/(x+a)$ and $1/(x+a)^2$ terms in the template — never omit either.",
        "Clear all denominators, expand fully, then equate coefficients of matching powers to build and solve the linear system.",
        "Clearing fractions is universally reliable but slower than specialized methods — use it when accuracy matters most."
      ],
      "transition": "In the next section we will see a faster method for some cases: the Heaviside cover-up method."
    },
    {
      "type": "quiz_plan",
      "target_questions": 6,
      "question_range": {
        "min": 5,
        "max": 8
      },
      "knowledge_points": [
        {
          "id": "template_setup_repeated_factor",
          "label": "Correct partial-fraction template with repeated linear factors",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Which is the correct partial-fraction setup for \\(\\dfrac{x^3+3x^2+4x+6}{(x+1)(x+2)(x+3)^2}\\)?",
              "options": [
                "A. \\(\\dfrac{k_1}{x+1}+\\dfrac{k_2}{x+2}+\\dfrac{k_3}{(x+3)^2}\\)",
                "B. \\(\\dfrac{k_1}{x+1}+\\dfrac{k_2}{x+2}+\\dfrac{k_3}{x+3}+\\dfrac{k_4}{(x+3)^2}\\)",
                "C. \\(\\dfrac{k_1x+b_1}{x+1}+\\dfrac{k_2x+b_2}{x+2}+\\dfrac{k_3x+b_3}{(x+3)^2}\\)",
                "D. \\(\\dfrac{k_1}{x+1} + \\dfrac{k_2}{(x+2)(x+3)^2}\\)"
              ],
              "correct_option": "B",
              "explanation": "A repeated linear factor of multiplicity 2 requires one term for each power: \\(1/(x+3)\\) and \\(1/(x+3)^2\\). Distinct linear factors use constant numerators.",
              "wrong_option_explanations": {
                "A": "It omits the required \\(1/(x+3)\\) term, so the setup is incomplete.",
                "C": "Linear numerators are used with irreducible quadratic factors, not simple linear factors.",
                "D": "This does not separate the denominator into the required partial-fraction pieces."
              },
              "hint": "For a repeated factor \\((x+a)^2\\), list every denominator power from 1 up to 2.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "For \\(\\dfrac{P(x)}{(x-1)^3(x+2)}\\), which repeated-factor part must appear in the setup?",
              "options": [
                "A. \\(\\dfrac{A}{(x-1)^3}\\) only",
                "B. \\(\\dfrac{A}{x-1}+\\dfrac{B}{(x-1)^2}+\\dfrac{C}{(x-1)^3}\\)",
                "C. \\(\\dfrac{Ax+B}{(x-1)^3}\\)",
                "D. \\(\\dfrac{A}{x-1}+\\dfrac{B}{(x-1)^3}\\)"
              ],
              "correct_option": "B",
              "explanation": "A repeated linear factor of power 3 needs terms for the first, second, and third powers — all three must be present.",
              "wrong_option_explanations": {
                "A": "It misses the lower-power repeated-factor terms for \\((x-1)^1\\) and \\((x-1)^2\\).",
                "C": "A linear numerator is not the standard form for a linear denominator factor.",
                "D": "It still omits the \\((x-1)^2\\) term."
              },
              "hint": "Write every power of the repeated factor, not just the highest one.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "clearing_and_matching_coefficients",
          "label": "Clearing denominators and coefficient matching",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "After multiplying both sides of the textbook decomposition by \\((x+1)(x+2)(x+3)^2\\), why does \\(k_4\\) not appear in the \\(x^3\\)-coefficient equation?",
              "options": [
                "A. Because \\(k_4=0\\) before solving",
                "B. Because the \\(k_4\\) term becomes only quadratic after clearing denominators",
                "C. Because repeated-factor terms are ignored in the highest-power equation",
                "D. Because \\((x+3)^2\\) cancels completely and removes \\(k_4\\)"
              ],
              "correct_option": "B",
              "explanation": "The \\(k_4/(x+3)^2\\) term becomes \\(k_4(x+1)(x+2)=k_4(x^2+3x+2)\\), which has degree 2, not degree 3. It therefore contributes nothing to the \\(x^3\\) equation.",
              "wrong_option_explanations": {
                "A": "The value of \\(k_4\\) is not known yet at this stage.",
                "C": "Repeated-factor terms are not ignored; their degree after clearing determines where they appear.",
                "D": "The denominator cancels, but the remaining polynomial still contributes lower-degree terms."
              },
              "hint": "Clear the denominator for the \\(k_4\\) term alone and inspect the degree of the resulting polynomial.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "What is the strongest justification for equating coefficients after clearing denominators?",
              "options": [
                "A. The factors on both sides are identical",
                "B. Two polynomials equal for all \\(x\\) must have matching coefficients of corresponding powers",
                "C. The constants \\(k_1,k_2,k_3,k_4\\) are always integers",
                "D. The highest-degree terms always determine all lower-degree terms automatically"
              ],
              "correct_option": "B",
              "explanation": "Once both sides are polynomials and equal for all \\(x\\), corresponding coefficients must match — this is the polynomial identity principle.",
              "wrong_option_explanations": {
                "A": "Factor patterns may differ; coefficient identity is the actual principle used.",
                "C": "The constants need not be integers in general.",
                "D": "Lower-degree coefficients still provide independent equations and cannot be inferred from the highest-degree term alone."
              },
              "hint": "Think about what it means for two polynomials to be identical for every value of \\(x\\).",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "final_result_and_answer_framing",
          "label": "Solving constants and presenting the final answer cleanly",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "The textbook finds \\(k_1=1, k_2=-2, k_3=2, k_4=-3\\). Which final decomposition is correct?",
              "options": [
                "A. \\(\\dfrac{1}{x+1}-\\dfrac{2}{x+2}+\\dfrac{2}{x+3}-\\dfrac{3}{(x+3)^2}\\)",
                "B. \\(\\dfrac{1}{x+1}-\\dfrac{2}{x+2}+\\dfrac{2}{(x+3)^2}-\\dfrac{3}{x+3}\\)",
                "C. \\(\\dfrac{1}{x+1}+\\dfrac{2}{x+2}-\\dfrac{2}{x+3}-\\dfrac{3}{(x+3)^2}\\)",
                "D. \\(\\dfrac{1-2+2-3}{(x+1)(x+2)(x+3)^2}\\)"
              ],
              "correct_option": "A",
              "explanation": "Each solved constant must be placed back into its original term in the setup, preserving both sign and denominator power. \\(k_3=2\\) belongs to \\(1