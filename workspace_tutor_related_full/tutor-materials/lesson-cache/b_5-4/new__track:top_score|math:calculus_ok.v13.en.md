```json
{
  "section_id": "B.5-4 A Combination of Heaviside and Clearing Fractions",
  "section_title": "B.5-4 A Combination of Heaviside and Clearing Fractions",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.5-4 A Combination of Heaviside and Clearing Fractions\n\n> **Section Objective:** Master a hybrid strategy that uses Heaviside cover-up for the easy coefficients and clearing fractions (or a limit shortcut) for the rest — saving time and reducing errors on exams.\n\n---\n\nSuppose a partial fraction has a repeated factor like \\((x+1)^3\\) and one simple factor \\((x+2)\\). On an exam, you do not want to differentiate more times than necessary.\n\nThe goal of this section is to combine two tools strategically: use **Heaviside cover-up** where it is fast and clean, then switch to **clearing fractions** or a **limit shortcut** for the remaining unknowns. This is a speed-and-accuracy method, not a new algebra topic.\n\nIn Example B.10, the coefficients \\(k\\) and \\(a_0\\) are fast to get directly by cover-up. The remaining coefficients \\(a_1\\) and \\(a_2\\) are better found by clearing fractions or matching dominant-order terms — avoiding repeated differentiation entirely."
    },
    {
      "type": "book_image",
      "source_page": "page-033",
      "fig_id": null,
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the page to spot the exam pattern: repeated factor plus one simple factor means mixed method is faster.",
        "standard": "Use the worked lines to show exactly where cover-up ends and clearing fractions begins.",
        "top_score": "Use the page to stress strategic stopping: once the needed unknowns are solved, remaining equations are checks, not required work."
      },
      "caption": "This textbook example demonstrates the hybrid method: easy coefficients \\(k\\) and \\(a_0\\) come from cover-up first, then the remaining coefficients \\(a_1\\) and \\(a_2\\) are determined by clearing fractions and matching coefficients."
    },
    {
      "type": "math_block",
      "latex": "\\frac{4x^3+16x^2+23x+13}{(x+1)^3(x+2)}=\\frac{a_0}{(x+1)^3}+\\frac{a_1}{(x+1)^2}+\\frac{a_2}{x+1}+\\frac{k}{x+2}",
      "explanation": "This decomposition separates the repeated root \\(x = -1\\) into three layers — one for each power of \\((x+1)\\) — and the simple root \\(x = -2\\) into a single term. The entire section is about choosing the fastest method to determine each of the four coefficients \\(a_0\\), \\(a_1\\), \\(a_2\\), and \\(k\\)."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "exam_pattern_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the diagram as a quick decision recipe for what to compute first under time pressure.",
        "standard": "Use it to organize the sequence of the mixed method step by step.",
        "top_score": "Use it to show the strategic distinction between required solving steps and optional checking steps."
      },
      "script": "import matplotlib.pyplot as plt\nimport matplotlib.patches as mpatches\nfrom matplotlib.patches import FancyBboxPatch, FancyArrowPatch\n\nfig, ax = plt.subplots(figsize=(14, 6))\nax.set_xlim(0, 14)\nax.set_ylim(0, 6)\nax.axis('off')\nfig.patch.set_facecolor('white')\n\n# Title\nax.text(7, 5.6, 'Hybrid Partial-Fraction Strategy for Repeated Factors',\n        ha='center', va='center', fontsize=13, fontweight='bold', color='#1a1a2e')\n\n# Box definitions: (x_center, y_center, width, height, title, lines)\nboxes = [\n    {\n        'x': 1.5, 'y': 2.8, 'w': 2.6, 'h': 3.2,\n        'title': 'STEP 1',\n        'subtitle': 'Write Partial Fractions',\n        'lines': [\n            r'$\\frac{a_0}{(x+1)^3}+\\frac{a_1}{(x+1)^2}$',\n            r'$+\\frac{a_2}{x+1}+\\frac{k}{x+2}$'\n        ],\n        'color': '#e8f4f8',\n        'border': '#2196F3'\n    },\n    {\n        'x': 5.0, 'y': 2.8, 'w': 2.6, 'h': 3.2,\n        'title': 'STEP 2',\n        'subtitle': 'Cover-Up Easy Factors',\n        'lines': [\n            r'$k$ from $x=-2$',\n            r'$a_0$ from $x=-1$',\n            r'(conceal $(x+1)^3$)',\n            '',\n            r'$\\Rightarrow k=1,\\ a_0=2$'\n        ],\n        'color': '#e8f8e8',\n        'border': '#4CAF50'\n    },\n    {\n        'x': 8.5, 'y': 2.8, 'w': 2.6, 'h': 3.2,\n        'title': 'STEP 3',\n        'subtitle': 'Clear Fractions',\n        'lines': [\n            'Substitute known',\n            r'$k=1,\\ a_0=2$ first,',\n            r'then multiply by',\n            r'$(x+1)^3(x+2)$'\n        ],\n        'color': '#fff8e1',\n        'border': '#FF9800'\n    },\n    {\n        'x': 12.0, 'y': 2.8, 'w': 2.6, 'h': 3.2,\n        'title': 'STEP 4',\n        'subtitle': 'Solve Leftovers',\n        'lines': [\n            'Match highest-power',\n            r'coefficients first:',\n            r'$x^3$ and $x^2$ terms',\n            r'$\\Rightarrow a_2=3,\\ a_1=1$',\n            'Lower terms = check'\n        ],\n        'color': '#fce4ec',\n        'border': '#E91E63'\n    }\n]\n\nfor b in boxes:\n    rect = FancyBboxPatch(\n        (b['x'] - b['w']/2, b['y'] - b['h']/2),\n        b['w'], b['h'],\n        boxstyle='round,pad=0.08',\n        linewidth=2,\n        edgecolor=b['border'],\n        facecolor=b['color']\n    )\n    ax.add_patch(rect)\n    # Step label\n    ax.text(b['x'], b['y'] + b['h']/2 - 0.28, b['title'],\n            ha='center', va='center', fontsize=9, fontweight='bold',\n            color=b['border'])\n    # Subtitle\n    ax.text(b['x'], b['y'] + b['h']/2 - 0.62, b['subtitle'],\n            ha='center', va='center', fontsize=9.5, fontweight='bold',\n            color='#1a1a2e')\n    # Divider line\n    ax.plot([b['x'] - b['w']/2 + 0.1, b['x'] + b['w']/2 - 0.1],\n            [b['y'] + b['h']/2 - 0.82, b['y'] + b['h']/2 - 0.82],\n            color=b['border'], linewidth=0.8, alpha=0.6)\n    # Content lines\n    start_y = b['y'] + b['h']/2 - 1.12\n    for i, line in enumerate(b['lines']):\n        ax.text(b['x'], start_y - i * 0.42, line,\n                ha='center', va='center', fontsize=8.2, color='#333333')\n\n# Arrows between boxes\narrow_y = 2.8\nfor x_start, x_end in [(2.81, 3.69), (6.31, 7.19), (9.81, 10.69)]:\n    ax.annotate('',\n                xy=(x_end, arrow_y), xytext=(x_start, arrow_y),\n                arrowprops=dict(arrowstyle='->', color='#555555', lw=2.0))\n\n# Side note below Step 2\nax.text(5.0, 0.55,\n        'Avoid repeated differentiation\\nif faster alternatives exist.',\n        ha='center', va='center', fontsize=8, color='#555555',\n        style='italic',\n        bbox=dict(boxstyle='round,pad=0.3', facecolor='#f0f0f0',\n                  edgecolor='#aaaaaa', linewidth=1))\nax.annotate('',\n            xy=(5.0, 1.22), xytext=(5.0, 0.88),\n            arrowprops=dict(arrowstyle='->', color='#888888', lw=1.2))\n\nplt.tight_layout()\nplt.savefig('generated/B.5-4-4.png', dpi=150, bbox_inches='tight')\n",
      "output_path": "generated/B.5-4-4.png",
      "caption": "The four-step hybrid strategy: write the decomposition, use cover-up for the easy coefficients, substitute them before clearing fractions, then match highest-power coefficients to solve the remaining unknowns — with lower-degree equations serving as checks."
    },
    {
      "type": "text_explanation",
      "content": "## 1. The Hybrid Method on Example B.10\n\nThe sequence matters. Begin with what is free: **cover-up gives \\(k = 1\\) and \\(a_0 = 2\\) immediately** — \\(k\\) by concealing \\((x+2)\\) and substituting \\(x = -2\\), and \\(a_0\\) by concealing \\((x+1)^3\\) and substituting \\(x = -1\\).\n\n**Substitute those values back before doing anything else.** This is the step most students skip, and it is the source of avoidable clutter.\n\n### EXAM TRAP\n\nStudents often clear fractions too early — before inserting the known coefficients — which leaves four unknowns in the expanded polynomial instead of two. Always substitute first, then clear.\n\nOnce \\(k = 1\\) and \\(a_0 = 2\\) are in place, multiply both sides by \\((x+1)^3(x+2)\\) to remove all denominators. The result is a polynomial identity in \\(x\\). Matching the **\\(x^3\\) coefficient** determines \\(a_2 = 3\\), and matching the **\\(x^2\\) coefficient** determines \\(a_1 = 1\\). The equations for \\(x\\) and the constant term are then best viewed as **checks**, not required solving steps."
    },
    {
      "type": "math_block",
      "latex": "4x^3+16x^2+23x+13=2(x+2)+a_1(x+1)(x+2)+a_2(x+1)^2(x+2)+(x+1)^3",
      "explanation": "This polynomial identity results from substituting \\(k = 1\\) and \\(a_0 = 2\\) into the decomposition and then multiplying both sides by \\((x+1)^3(x+2)\\) to clear all denominators. The smartest approach is to start coefficient comparison from the **highest powers** — the \\(x^3\\) and \\(x^2\\) terms — because those equations involve the fewest unknowns and determine \\(a_2\\) and \\(a_1\\) most directly."
    },
    {
      "type": "text_explanation",
      "content": "## 2. Faster Shortcut: Eliminate One Unknown Before Coefficient Matching\n\nOnce \\(a_0 = 2\\) and \\(k = 1\\) are known, only two unknowns remain: \\(a_1\\) and \\(a_2\\). A shortcut can find \\(a_2\\) without expanding the full polynomial.\n\n**Multiply both sides of the cleared equation by \\(x\\) and let \\(x \\to \\infty\\).** All lower-order terms vanish, and only the dominant-degree behavior survives. On the left side the leading coefficient is \\(4\\); on the right side the dominant contribution is \\(a_2 + 1\\). This gives:\n\n$$4 = a_2 + 1 \\quad \\Longrightarrow \\quad a_2 = 3$$\n\nWith \\(a_2 = 3\\) known, substitute any convenient value — for example \\(x = 0\\) — into the cleared equation to solve for \\(a_1 = 1\\).\n\n### TOP-SCORE INSIGHT\n\nThis shortcut is not magic. It works because the **highest-degree behavior on both sides must agree**. The limit only isolates the intended unknown when the equation has already been arranged so that unknown controls the dominant term.\n\n### EXAM TRAP\n\nDo not apply this limit blindly. First verify that the unknown you want actually appears in the surviving dominant-order terms after multiplying by \\(x\\). If the arrangement is wrong, the limit will eliminate the wrong terms and give a useless equation."
    },
    {
      "type": "section_summary",
      "bullets": [
        "Use cover-up first to get easy coefficients such as \\(k\\) and \\(a_0\\) before any other step.",
        "Substitute known values, then clear fractions or use the \\(x \\to \\infty\\) shortcut for leftovers.",
        "Match highest-power coefficients first; lower-degree equations are checks, not required solving steps."
      ],
      "transition": "In the next section we will see how similar ideas extend to improper rational functions."
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
          "id": "method_selection",
          "label": "When and why to combine cover-up with clearing fractions",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Why is the mixed method preferred in this section for a denominator such as \\((x+1)^3(x+2)\\)?",
              "options": [
                "A. Because cover-up cannot be used at all when a repeated factor appears",
                "B. Because repeated differentiation for all repeated-factor coefficients can be slower than finding only the easy coefficients first",
                "C. Because clearing fractions always gives fewer equations than cover-up",
                "D. Because repeated factors force the numerator to be quadratic"
              ],
              "correct_option": "B",
              "explanation": "The whole point of the section is efficiency: use cover-up where it is easy, then switch methods before differentiation becomes cumbersome.",
              "wrong_option_explanations": {
                "A": "Cover-up is still useful for some coefficients, especially simple factors and the highest-power repeated-factor coefficient.",
                "C": "Clearing fractions does not always give fewer equations; its advantage here is strategic convenience after some coefficients are already known.",
                "D": "The numerator degree is unrelated to this method choice."
              },
              "hint": "Think speed, not possibility.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "In Example B.10, which pair is found first by the Heaviside-style step before clearing fractions?",
              "options": [
                "A. \\(a_1\\) and \\(a_2\\)",
                "B. \\(a_0\\) and \\(a_1\\)",
                "C. \\(k\\) and \\(a_0\\)",
                "D. \\(k\\) and \\(a_2\\)"
              ],
              "correct_option": "C",
              "explanation": "The textbook explicitly finds \\(k = 1\\) and \\(a_0 = 2\\) first, then solves for \\(a_1\\) and \\(a_2\\) by another method.",
              "wrong_option_explanations": {
                "A": "Those are the coefficients intentionally postponed to the clearing-fractions step.",
                "B": "\\(a_1\\) is not one of the easy first coefficients in the mixed method.",
                "D": "\\(a_2\\) is not obtained first by cover-up in the clearing-fractions version."
              },
              "hint": "One comes from the simple factor, the other from the highest-power repeated-factor term.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "coefficient_matching_after_clearing",
          "label": "Set up the cleared equation and match the smartest coefficients first",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "After substituting \\(k = 1\\) and \\(a_0 = 2\\), what is the main advantage of multiplying both sides by \\((x+1)^3(x+2)\\)?",
              "options": [
                "A. It eliminates the need to expand anything",
                "B. It turns the identity into a polynomial equation so remaining coefficients can be solved by matching powers of \\(x\\)",
                "C. It directly gives \\(a_1 = 1\\) and \\(a_2 = 3\\) without further work",
                "D. It removes the repeated factor from the original denominator permanently"
              ],
              "correct_option": "B",
              "explanation": "Clearing fractions converts the decomposition into a polynomial identity, which allows coefficient comparison on both sides.",
              "wrong_option_explanations": {
                "A": "Expansion or coefficient extraction is still needed after clearing fractions.",
                "C": "More algebra — specifically coefficient matching — is still required.",
                "D": "The repeated factor is not removed permanently; it is only cleared in that equation step."
              },
              "hint": "What new algebra object do you get after all denominators disappear?",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "Once the cleared equation is expanded, which coefficients are the most efficient pair to equate first in the textbook solution?",
              "options": [
                "A. Constant term and \\(x\\)-term",
                "B. \\(x\\)-term and \\(x^2\\)-term",
                "C. \\(x^3\\)-term and \\(x^2\\)-term",
                "D. Constant term and \\(x^3\\)-term"
              ],
              "correct_option": "C",
              "explanation": "The \\(x^3\\) and \\(x^2\\) coefficients already determine \\(a_2\\) and \\(a_1\\) directly. The lower-degree equations then serve as checks.",
              "wrong_option_explanations": {
                "A": "Those can work as checks, but they are not the most efficient first choice here.",
                "B": "Using the \\(x\\)-term first is less direct than starting from the highest powers.",
                "D": "That pair is not the strategic pair used to solve both unknowns fastest."
              },
              "hint": "Start where the dominant algebra is cleanest.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "shortcut_with_infinity_and_convenient_value",
          "label": "Use the infinity shortcut and then a convenient substitution",
          "importance": "medium",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "In the shortcut method, after \\(k = 1\\) and \\(a_0 = 2\\) are known, multiplying both sides by \\(x\\) and letting \\(x \\to \\infty\\) gives which equation?",
              "options": [
                "A. \\(4 = a_1 + 1\\)",
                "B. \\(4 = a_2 + 1\\)",
                "C. \\(16 = a_1 + 4a_2 + 3\\)",
                "D. \\(23 = 5 + 3a_1 + 5a_2\\)"
              ],
              "correct_option": "B",
              "explanation": "The dominant-order behavior leaves \\(4\\) on the left and \\(a_2 + 1\\) on the right, so \\(a_2 = 3\\).",
              "wrong_option_explanations": {
                "A": "The limit isolates the coefficient tied to the dominant \\(1/x\\) behavior after multiplication, which is \\(a_2\\) here, not \\(a_1\\).",
                "C": "That is a coefficient-matching equation from the clearing-fractions approach, not the infinity shortcut.",
                "D": "That is one of the lower-degree check equations."
              },
              "hint": "Ask which surviving terms control the highest-degree behavior after multiplying by