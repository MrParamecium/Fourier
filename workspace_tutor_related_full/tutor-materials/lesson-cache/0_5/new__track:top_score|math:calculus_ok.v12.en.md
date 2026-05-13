```json
{
  "section_id": "0.5",
  "section_title": "Partial Fraction Expansion",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# Section 0.5 — Partial Fraction Expansion\n\n> **Section Objective:** Classify rational functions as proper or improper, divide when necessary, and set up the correct decomposition template before solving for coefficients.\n\n---\n\nPartial fraction expansion is a core algebraic tool in systems analysis and transform methods. It breaks a complicated rational expression into a sum of simpler fractions — each of which is far easier to invert, integrate, or manipulate. This section covers three steps in sequence: classifying the function by degree, performing polynomial division when the function is improper, and writing the correct decomposition template using the denominator's factor structure.\n\n> **Exam Warning:** The majority of partial-fraction mistakes happen before any coefficient is solved — they come from an incorrect setup. Get the template right first."
    },
    {
      "type": "math_block",
      "latex": "F(x)=\\frac{P(x)}{Q(x)},\\quad \\text{proper if }\\deg P<\\deg Q,\\; \\text{improper if }\\deg P\\ge \\deg Q",
      "explanation": "The first exam check is always degree comparison: it tells you immediately whether you may begin decomposing or must perform polynomial division first."
    },
    {
      "type": "book_image",
      "source_page": "page-023",
      "fig_id": "Fig. B.11",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use this visual for fast recognition of the key pattern.",
        "standard": "Use this visual to clarify the main concept.",
        "top_score": "Use this visual to surface a subtle distinction, trap, or variant."
      },
      "caption": "Fig. B.11 from the textbook illustrates an exponentially varying sinusoid — a representative signal form whose transform produces the kind of rational function that partial fraction expansion is designed to decompose."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use it as a fast recognition chart: degree test first, denominator factors next.",
        "standard": "Use it to connect each factor type to the matching decomposition term.",
        "top_score": "Use it to spotlight traps: missing the polynomial part or skipping repeated-factor terms."
      },
      "script": "import matplotlib.pyplot as plt\nimport matplotlib.patches as mpatches\nfrom matplotlib.patches import FancyBboxPatch\n\nfig, axes = plt.subplots(1, 3, figsize=(15, 6))\nfig.patch.set_facecolor('white')\n\nACCENT = '#C0392B'\nBOX_COLOR = '#F4F6F7'\nBORDER_COLOR = '#2C3E50'\nTEXT_COLOR = '#2C3E50'\n\nfor ax in axes:\n    ax.set_xlim(0, 1)\n    ax.set_ylim(0, 1)\n    ax.axis('off')\n    ax.set_facecolor('white')\n\n# ── Panel 1: Degree Check ──────────────────────────────────────────────────\nax1 = axes[0]\nax1.text(0.5, 0.95, 'PANEL 1', fontsize=9, color='gray', ha='center', va='top',\n         fontfamily='monospace')\nax1.text(0.5, 0.88, 'Degree Check', fontsize=14, fontweight='bold',\n         color=BORDER_COLOR, ha='center', va='top')\n\nax1.add_patch(FancyBboxPatch((0.05, 0.55), 0.9, 0.25,\n    boxstyle='round,pad=0.02', facecolor='#EBF5FB', edgecolor='#2980B9', linewidth=1.5))\nax1.text(0.5, 0.72, 'PROPER', fontsize=12, fontweight='bold',\n         color='#2980B9', ha='center', va='center')\nax1.text(0.5, 0.62, r'deg $P$ < deg $Q$', fontsize=11,\n         color=TEXT_COLOR, ha='center', va='center', fontstyle='italic')\nax1.text(0.5, 0.52, u'\\u2192 Decompose directly', fontsize=10,\n         color='#2980B9', ha='center', va='center')\n\nax1.add_patch(FancyBboxPatch((0.05, 0.18), 0.9, 0.25,\n    boxstyle='round,pad=0.02', facecolor='#FDEDEC', edgecolor=ACCENT, linewidth=1.5))\nax1.text(0.5, 0.35, 'IMPROPER', fontsize=12, fontweight='bold',\n         color=ACCENT, ha='center', va='center')\nax1.text(0.5, 0.25, r'deg $P$ $\\geq$ deg $Q$', fontsize=11,\n         color=TEXT_COLOR, ha='center', va='center', fontstyle='italic')\nax1.text(0.5, 0.15, u'\\u2192 Divide first!', fontsize=10,\n         color=ACCENT, ha='center', va='center', fontweight='bold')\n\n# ── Panel 2: If Improper ──────────────────────────────────────────────────\nax2 = axes[1]\nax2.text(0.5, 0.95, 'PANEL 2', fontsize=9, color='gray', ha='center', va='top',\n         fontfamily='monospace')\nax2.text(0.5, 0.88, 'If Improper: Divide First', fontsize=13, fontweight='bold',\n         color=BORDER_COLOR, ha='center', va='top')\n\nax2.text(0.5, 0.75, r'$F(x) = $', fontsize=12, color=TEXT_COLOR,\n         ha='center', va='center')\n\nax2.add_patch(FancyBboxPatch((0.05, 0.52), 0.9, 0.14,\n    boxstyle='round,pad=0.02', facecolor='#EBF5FB', edgecolor='#2980B9', linewidth=1.2))\nax2.text(0.5, 0.59, 'Polynomial part', fontsize=11, fontweight='bold',\n         color='#2980B9', ha='center', va='center')\n\nax2.text(0.5, 0.46, '+', fontsize=16, color=TEXT_COLOR, ha='center', va='center',\n         fontweight='bold')\n\nax2.add_patch(FancyBboxPatch((0.05, 0.28), 0.9, 0.14,\n    boxstyle='round,pad=0.02', facecolor='#EAFAF1', edgecolor='#27AE60', linewidth=1.2))\nax2.text(0.5, 0.35, 'Proper remainder', fontsize=11, fontweight='bold',\n         color='#27AE60', ha='center', va='center')\n\nax2.text(0.5, 0.20, u'\\u2193', fontsize=18, color='#27AE60', ha='center', va='center')\nax2.text(0.5, 0.11, 'Only this part gets decomposed', fontsize=10,\n         color='#27AE60', ha='center', va='center', fontstyle='italic')\n\n# ── Panel 3: Repeated Factor Template ────────────────────────────────────\nax3 = axes[2]\nax3.text(0.5, 0.95, 'PANEL 3', fontsize=9, color='gray', ha='center', va='top',\n         fontfamily='monospace')\nax3.text(0.5, 0.88, 'Repeated Factor Template', fontsize=13, fontweight='bold',\n         color=BORDER_COLOR, ha='center', va='top')\n\nax3.text(0.5, 0.78, 'Denominator:', fontsize=10, color='gray',\n         ha='center', va='center')\nax3.text(0.5, 0.70, r'$(x+1)(x+2)(x+3)^2$', fontsize=11,\n         color=TEXT_COLOR, ha='center', va='center')\n\nax3.text(0.5, 0.60, u'\\u2193  Decomposition:', fontsize=10, color='gray',\n         ha='center', va='center')\n\nterms = [\n    (r'$\\dfrac{k_1}{x+1}$', '#2980B9'),\n    (r'$\\dfrac{k_2}{x+2}$', '#2980B9'),\n    (r'$\\dfrac{k_3}{x+3}$', '#27AE60'),\n    (r'$\\dfrac{k_4}{(x+3)^2}$', '#27AE60'),\n]\nxpos = [0.12, 0.37, 0.60, 0.83]\nypos = 0.46\nfor i, ((term, color), x) in enumerate(zip(terms, xpos)):\n    ax3.text(x, ypos, term, fontsize=10.5, color=color,\n             ha='center', va='center')\n    if i < 3:\n        ax3.text(x + 0.125, ypos, '+', fontsize=13, color=TEXT_COLOR,\n                 ha='center', va='center')\n\nax3.add_patch(FancyBboxPatch((0.55, 0.36), 0.40, 0.18,\n    boxstyle='round,pad=0.015', facecolor='#FDEDEC', edgecolor=ACCENT, linewidth=1.5,\n    zorder=3))\nax3.text(0.75, 0.45, 'Both powers\\nrequired!', fontsize=9.5, color=ACCENT,\n         ha='center', va='center', fontweight='bold', zorder=4)\n\nax3.add_patch(FancyBboxPatch((0.04, 0.10), 0.92, 0.18,\n    boxstyle='round,pad=0.015', facecolor='#FDEDEC', edgecolor=ACCENT, linewidth=1.8))\nax3.text(0.5, 0.19,\n         u'\\u26a0  Do NOT omit the $(x+3)^2$ term',\n         fontsize=10, color=ACCENT, ha='center', va='center', fontweight='bold')\n\nplt.suptitle('Partial Fraction Expansion — Setup Guide',\n             fontsize=15, fontweight='bold', color=BORDER_COLOR, y=1.01)\nplt.tight_layout(pad=1.5)\nplt.savefig('generated/0.5-3.png', dpi=150, bbox_inches='tight', facecolor='white')\n",
      "output_path": "generated/0.5-3.png",
      "caption": "Three-panel setup guide: (1) degree test determines proper vs improper, (2) improper functions must be divided first with only the remainder decomposed, (3) repeated linear factors require a separate term for every power up to the multiplicity."
    },
    {
      "type": "text_explanation",
      "content": "## 1. Proper vs Improper: Decide the Setup Before Doing Any Algebra\n\nA **rational function** is any ratio of two polynomials, F(x) = P(x)/Q(x). The first thing you must determine is whether it is **proper** (deg P < deg Q) or **improper** (deg P ≥ deg Q).\n\n### WORKED EXAMPLE\n\nConsider:\n\n$$F(x) = \\frac{2x^3 + 9x^2 + 11x + 2}{x^2 + 4x + 3}$$\n\n- Numerator degree: **3**\n- Denominator degree: **2**\n- Since 3 ≥ 2, this function is **improper**.\n\n### EXAM CONSEQUENCE\n\nAn improper function **cannot** be directly decomposed into partial fractions. You must first perform polynomial division to extract a polynomial part, leaving a proper remainder. Only that proper remainder is eligible for partial fraction expansion.\n\n### COMMON MISTAKE\n\n> Students lose points when they attempt to force an improper function directly into a partial-fraction template without first separating out the polynomial part. The resulting coefficient equations will be inconsistent or wrong."
    },
    {
      "type": "math_block",
      "latex": "\\frac{2x^3+9x^2+11x+2}{x^2+4x+3}=2x+1+\\frac{x-1}{x^2+4x+3}",
      "explanation": "Polynomial division removes the oversized part, producing the polynomial 2x + 1 and leaving the proper remainder (x − 1)/(x² + 4x + 3), which is now eligible for partial fraction decomposition."
    },
    {
      "type": "text_explanation",
      "content": "## 2. Clearing Fractions: Build the Correct Decomposition Form\n\nOnce you have a proper rational function, the next high-value skill is writing the **correct template** before touching any algebra. Consider Example B.8:\n\n$$F(x) = \\frac{x^3 + 3x^2 + 4x + 6}{(x+1)(x+2)(x+3)^2}$$\n\nThe denominator has three distinct factors: (x+1), (x+2), and (x+3) — but (x+3) appears **squared**. The correct template is:\n\n$$\\frac{k_1}{x+1}+\\frac{k_2}{x+2}+\\frac{k_3}{x+3}+\\frac{k_4}{(x+3)^2}$$\n\n### WHY REPEATED FACTORS NEED MULTIPLE TERMS\n\nFor a repeated linear factor (x + a)^n, you must include **one term for each power** from 1 up to n. Skipping any power makes the template incomplete.\n\n### THE CLEARING-FRACTIONS STEP\n\nMultiply both sides of the template equation by the full denominator (x+1)(x+2)(x+3)². This clears all fractions and produces a **polynomial identity**. Expand both sides, then equate coefficients of matching powers of x to form a linear system for k₁, k₂, k₃, k₄.\n\n### TOP-SCORE DISTINCTIONS\n\n> **First:** Repeated factors require a separate term for every power up to the multiplicity — this is a rule, not a choice.\n\n> **Second:** After clearing fractions, coefficient matching is a linear-system problem. If even one term is missing from the template, the cleared polynomial is wrong from the start, and **every** coefficient equation is corrupted — not just the one associated with the missing term."
    },
    {
      "type": "math_block",
      "latex": "\\frac{x^3+3x^2+4x+6}{(x+1)(x+2)(x+3)^2}=\\frac{k_1}{x+1}+\\frac{k_2}{x+2}+\\frac{k_3}{x+3}+\\frac{k_4}{(x+3)^2}",
      "explanation": "This decomposition template is dictated entirely by the denominator's factor structure — each distinct factor and each power of a repeated factor mandates exactly one term in the expansion."
    },
    {
      "type": "section_summary",
      "bullets": [
        "Always compare degrees first: deg P ≥ deg Q means the function is improper.",
        "Improper functions must be divided first; only the proper remainder is decomposed.",
        "Repeated linear factor (x+a)^n requires separate terms for every power 1 through n."
      ],
      "transition": "In the next section we will continue with methods for determining the unknown coefficients efficiently."
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
          "id": "kp_degree_classification",
          "label": "Proper vs improper classification",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Which rational function is improper?",
              "options": [
                "A. (x+1)/(x^2+2)",
                "B. (3x-1)/(x^2+4x+1)",
                "C. (2x^3+5)/(x^2-1)",
                "D. (7)/(x+9)"
              ],
              "correct_option": "C",
              "explanation": "A rational function is improper when the numerator degree is greater than or equal to the denominator degree. Only option C has degree 3 in the numerator and degree 2 in the denominator, making it improper.",
              "wrong_option_explanations": {
                "A": "Degree 1 over degree 2 — the numerator degree is strictly less, so this is proper.",
                "B": "Degree 1 over degree 2 — proper. (Note: option B was adjusted from the original to avoid a second improper case.)",
                "D": "Degree 0 over degree 1 — proper."
              },
              "hint": "Compare only the highest powers of x in the numerator and denominator.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "If \\(F(x)=\\frac{5x^4-2x+1}{x^2+x-3}\\), what must you do first before partial fraction expansion?",
              "options": [
                "A. Factor the numerator completely",
                "B. Perform polynomial division",
                "C. Set up constants over each denominator factor immediately",
                "D. Differentiate both numerator and denominator"
              ],
              "correct_option": "B",
              "explanation": "The numerator has degree 4 and the denominator has degree 2, so the function is improper. The mandatory first step is polynomial division to extract the polynomial part and isolate a proper remainder.",
              "wrong_option_explanations": {
                "A": "Factoring the numerator is not required and is not the first step for partial fractions.",
                "C": "This is the classic exam trap: jumping directly to decomposition is invalid for an improper function — you will get wrong coefficient equations.",
                "D": "Differentiation is unrelated to partial fraction setup."
              },
              "hint": "Improper means divide first — always.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "kp_division_consequence",
          "label": "Improper function becomes polynomial plus proper remainder",
          "importance": "high",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "Why is polynomial division performed before partial fractions for an improper rational function?",
              "options": [
                "A. To force all coefficients to be integers",
                "B. To reduce the denominator degree",
                "C. To rewrite the function as a polynomial plus a proper remainder",
                "D. To eliminate repeated factors"
              ],
              "correct_option": "C",
              "explanation": "Division separates the oversized numerator into a polynomial part plus a proper remainder. Only the proper remainder — where numerator degree is strictly less than denominator degree — can legitimately be decomposed into partial fractions.",
              "wrong_option_explanations": {
                "A": "Polynomial division does not guarantee integer coefficients.",
                "B": "The denominator itself is unchanged by the division; the goal is to fix the overall form of the expression.",
                "D": "Repeated factors are a separate concern handled when writing the decomposition template, not removed by division."
              },
              "hint": "Ask what property the remainder must satisfy for partial fractions to be valid.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "kp_template_setup",
          "label": "Correct partial-fraction template from denominator factors",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "For \\(\\frac{x^3+3x^2+4x+6}{(x+1)(x+2)(x+3)^2}\\), which partial-fraction setup is correct?",
              "options": [
                "A. \\(\\frac{k_1}{x+1}+\\frac{k_2}{x+2}+\\frac{k_3}{(x+3)^2}\\)",
                "B. \\(\\frac{k_1}{x+1}+\\frac{k_2}{x+2}+\\frac{k_3}{x+3}+\\frac{k_4}{(x+3)^2}\\)",
                "C. \\(\\frac{k_1}{x+1}+\\frac{k_2}{(x+2)^2}+\\frac{k_3}{x+3}\\)",
                "D. \\(\\frac{k_1x+k_2}{x+1}+\\frac{k_3}{x+2}+\\frac{k_4}{x+3}\\)"
              ],
              "correct_option": "B",
              "explanation": "The repeated linear factor (x+3)² requires one term for (x+3) and a separate term for (x+3)². All four denominator factor powers must appear: (x+1), (x+2), (x+3), and (x+3)².",
              "wrong_option_explanations": {
                "A": "This omits the required k₃/(x+3) term — the first power of the repeated factor is missing.",
                "C": "This invents a