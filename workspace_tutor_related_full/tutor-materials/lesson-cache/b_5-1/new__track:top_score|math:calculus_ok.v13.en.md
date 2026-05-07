```json
{
  "section_id": "B.5-1",
  "section_title": "B.5-1 Method of Clearing Fractions",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.5 Partial Fractions — Method of Clearing Fractions\n\n> **Section Objective:** Learn to decompose a rational function into partial fractions by writing the correct template, clearing denominators, and matching coefficients of like powers.\n\n---\n\nThis section works through one central example:\n\n$$\nF(x) = \\frac{x^3+3x^2+4x+6}{(x+1)(x+2)(x+3)^2}\n$$\n\nThe method has three steps: write the correct partial-fraction template, multiply both sides by the full denominator to clear all fractions, then match coefficients of each power of \\(x\\) to build a linear system.\n\nOn exams, most marks are lost **before** any algebra — students write the wrong template at the start. The critical trap here is the repeated factor \\((x+3)^2\\): it demands **two** separate terms in the decomposition, not one. Get the template right first, and the rest is arithmetic."
    },
    {
      "type": "book_image",
      "source_page": "page-026",
      "fig_id": null,
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the worked example to recognize the standard setup pattern immediately.",
        "standard": "Use the image to anchor the full workflow from decomposition form to coefficient equations.",
        "top_score": "Use the image to stress the repeated-factor structure and where setup mistakes start costing marks."
      },
      "caption": "The key move: assign one constant to each denominator factor, and assign a separate additional term for the repeated factor \\((x+3)^2\\), giving four terms in total."
    },
    {
      "type": "generate_image",
      "tool": "python_matplotlib",
      "teaching_role": "trap_exposure",
      "mode_specific_visual_use": {
        "cram": "Use this diagram to memorize the setup rule fast: one factor, one term — except repeated factors get a ladder of terms.",
        "standard": "Use this to explain why the repeated factor \\((x+3)^2\\) creates two fraction terms instead of one.",
        "top_score": "Use this to contrast the correct four-term setup with the common wrong three-term setup that omits the \\(1/(x+3)\\) term."
      },
      "script": "import matplotlib.pyplot as plt\nimport matplotlib.patches as mpatches\nfrom matplotlib.patches import FancyArrowPatch\n\nfig, ax = plt.subplots(figsize=(10, 6))\nax.set_xlim(0, 10)\nax.set_ylim(0, 7)\nax.axis('off')\nfig.patch.set_facecolor('white')\n\n# Title\nax.text(5, 6.5, 'Partial-Fraction Template: Factor → Term Mapping',\n        ha='center', va='center', fontsize=13, fontweight='bold', color='#1a1a2e')\n\n# Left column header\nax.text(1.8, 5.9, 'Denominator Factors', ha='center', va='center',\n        fontsize=11, fontweight='bold', color='#2c3e50',\n        bbox=dict(boxstyle='round,pad=0.3', facecolor='#d6eaf8', edgecolor='#2980b9', linewidth=1.5))\n\n# Right column header\nax.text(7.8, 5.9, 'Partial-Fraction Terms', ha='center', va='center',\n        fontsize=11, fontweight='bold', color='#2c3e50',\n        bbox=dict(boxstyle='round,pad=0.3', facecolor='#d5f5e3', edgecolor='#27ae60', linewidth=1.5))\n\n# Factor boxes (left)\nfactors = ['$(x+1)$', '$(x+2)$', '$(x+3)^2$  [repeated]']\nfactor_y = [4.8, 3.6, 2.2]\nfactor_colors = ['#fdfefe', '#fdfefe', '#fef9e7']\nfactor_edge = ['#2980b9', '#2980b9', '#e67e22']\n\nfor i, (label, y, fc, ec) in enumerate(zip(factors, factor_y, factor_colors, factor_edge)):\n    lw = 2.5 if i == 2 else 1.5\n    ax.text(1.8, y, label, ha='center', va='center', fontsize=11,\n            color='#1a1a2e',\n            bbox=dict(boxstyle='round,pad=0.4', facecolor=fc, edgecolor=ec, linewidth=lw))\n\n# Term boxes (right)\nterms = [\n    (r'$\\dfrac{k_1}{x+1}$', 4.8, '#d5f5e3', '#27ae60'),\n    (r'$\\dfrac{k_2}{x+2}$', 3.6, '#d5f5e3', '#27ae60'),\n    (r'$\\dfrac{k_3}{x+3}$', 2.7, '#fef5e4', '#e67e22'),\n    (r'$\\dfrac{k_4}{(x+3)^2}$', 1.7, '#fef5e4', '#e67e22'),\n]\n\nfor label, y, fc, ec in terms:\n    ax.text(7.8, y, label, ha='center', va='center', fontsize=11,\n            color='#1a1a2e',\n            bbox=dict(boxstyle='round,pad=0.4', facecolor=fc, edgecolor=ec, linewidth=1.5))\n\n# Arrows: simple factors\nfor left_y, right_y in [(4.8, 4.8), (3.6, 3.6)]:\n    ax.annotate('', xy=(6.7, right_y), xytext=(2.9, left_y),\n                arrowprops=dict(arrowstyle='->', color='#2980b9', lw=1.8))\n\n# Arrows: repeated factor splits into two\nfor right_y in [2.7, 1.7]:\n    ax.annotate('', xy=(6.7, right_y), xytext=(2.9, 2.2),\n                arrowprops=dict(arrowstyle='->', color='#e67e22', lw=1.8,\n                                connectionstyle='arc3,rad=0.0'))\n\n# Warning box\nwarning_text = ('Warning: Repeated factor $(x+3)^2$ requires BOTH\\n'\n                r'$1/(x+3)$ and $1/(x+3)^2$ terms — never just one.')\nax.text(5, 0.7, warning_text, ha='center', va='center', fontsize=10,\n        color='#7b241c',\n        bbox=dict(boxstyle='round,pad=0.5', facecolor='#fadbd8', edgecolor='#c0392b', linewidth=2))\n\nplt.tight_layout()\nplt.savefig('generated/B.5-1-3.png', dpi=150, bbox_inches='tight')\n",
      "output_path": "generated/B.5-1-3.png",
      "caption": "Each distinct linear factor contributes exactly one term. The repeated factor \\((x+3)^2\\) contributes two terms — one for each power from 1 up to 2. Omitting either term is the most common setup error."
    },
    {
      "type": "math_block",
      "latex": "\\frac{x^3+3x^2+4x+6}{(x+1)(x+2)(x+3)^2}=\\frac{k_1}{x+1}+\\frac{k_2}{x+2}+\\frac{k_3}{x+3}+\\frac{k_4}{(x+3)^2}",
      "explanation": "This is the correct starting template: each distinct linear factor \\((x+1)\\) and \\((x+2)\\) contributes one term, while the repeated factor \\((x+3)^2\\) contributes two terms — one for the first power \\((x+3)\\) and one for the second power \\((x+3)^2\\)."
    },
    {
      "type": "text_explanation",
      "content": "## 1. Set Up and Clear the Fractions\n\nOnce the template is written, multiply **both sides** by the full denominator \\((x+1)(x+2)(x+3)^2\\). Each partial-fraction term cancels its own denominator, leaving a polynomial identity on the right.\n\nExpand only as much as needed, then **group by powers of \\(x\\)**: collect all terms multiplying \\(x^3\\), all terms multiplying \\(x^2\\), and so on.\n\nBecause the cleared equation is a **polynomial identity** — it must hold for every value of \\(x\\), not just special ones — the coefficient of each power on the left must equal the coefficient of the same power on the right. This is what justifies matching like powers.\n\n### HIGH-SCORE WARNING\n\nThe \\(k_4\\) term, after clearing, is multiplied by \\((x+1)(x+2) = x^2+3x+2\\). This is a **degree-2** polynomial, so \\(k_4\\) contributes to the \\(x^2\\), \\(x\\), and constant equations — but **not** to the \\(x^3\\) equation. Forgetting this is a common source of coefficient errors."
    },
    {
      "type": "math_block",
      "latex": "\\begin{aligned}k_1+k_2+k_3&=1\\\\8k_1+7k_2+6k_3+k_4&=3\\\\21k_1+15k_2+11k_3+3k_4&=4\\\\18k_1+9k_2+6k_3+2k_4&=6\\end{aligned}",
      "explanation": "These four equations come from equating the coefficients of \\(x^3\\), \\(x^2\\), \\(x^1\\), and \\(x^0\\) (the constant term) on both sides after clearing denominators and collecting like terms — one equation per power of \\(x\\)."
    },
    {
      "type": "text_explanation",
      "content": "## 2. Finish the Constants and Present the Answer Safely\n\nSolving the linear system gives:\n\n$$\nk_1 = 1, \\quad k_2 = -2, \\quad k_3 = 2, \\quad k_4 = -3\n$$\n\nSubstituting back: one over \\((x+1)\\), minus two over \\((x+2)\\), plus two over \\((x+3)\\), minus three over \\((x+3)^2\\).\n\n### EXAM-FACING DISTINCTIONS\n\n**First:** listing the constants \\(k_1, k_2, k_3, k_4\\) alone is **not** a complete answer. You must rewrite \\(F(x)\\) in full expanded form.\n\n**Second:** sign errors almost always appear in the final line. Write the template first, then substitute each constant term by term — do not rush.\n\n#### Deeper Insight for Top-Score Students\n\nThe clearing-fractions method is always valid, but it requires solving a full \\(4 \\times 4\\) linear system. When all factors are **distinct**, the next method (residues / cover-up) can find each constant in one step. Recognise when the faster method applies."
    },
    {
      "type": "math_block",
      "latex": "F(x)=\\frac{1}{x+1}-\\frac{2}{x+2}+\\frac{2}{x+3}-\\frac{3}{(x+3)^2}",
      "explanation": "This is the completed partial-fraction expansion in final exam-ready form, with every denominator written explicitly and every sign shown — substitute the solved constants into the original template, term by term, and this is the result."
    },
    {
      "type": "section_summary",
      "bullets": [
        "Write the correct template first: one term per distinct factor, two terms for a repeated linear factor.",
        "Clear denominators, then match coefficients of like powers to build the linear system.",
        "Repeated factors require a separate term for each power — omitting one term is the most common setup error."
      ],
      "transition": "In the next section we will see a faster method for certain cases with distinct factors."
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
          "id": "pf_setup_repeated_factor",
          "label": "Correct partial-fraction setup for repeated linear factors",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Which is the correct partial-fraction form for \\(\\dfrac{x^3+3x^2+4x+6}{(x+1)(x+2)(x+3)^2}\\)?",
              "options": [
                "A. \\(\\dfrac{k_1}{x+1}+\\dfrac{k_2}{x+2}+\\dfrac{k_3}{(x+3)^2}\\)",
                "B. \\(\\dfrac{k_1}{x+1}+\\dfrac{k_2}{x+2}+\\dfrac{k_3}{x+3}+\\dfrac{k_4}{(x+3)^2}\\)",
                "C. \\(\\dfrac{k_1}{(x+1)(x+2)}+\\dfrac{k_2}{(x+3)^2}\\)",
                "D. \\(\\dfrac{k_1}{x+1}+\\dfrac{k_2}{x+2}+\\dfrac{k_3 x+k_4}{x+3}\\)"
              ],
              "correct_option": "B",
              "explanation": "A repeated linear factor \\((x+3)^2\\) requires both \\(1/(x+3)\\) and \\(1/(x+3)^2\\) terms, in addition to one term for each distinct simple factor.",
              "wrong_option_explanations": {
                "A": "This omits the \\(1/(x+3)\\) term required by the repeated factor — the most common setup mistake.",
                "C": "This does not follow the standard decomposition into simple partial fractions; factors must not be grouped.",
                "D": "A linear numerator is used over irreducible quadratic factors, not over linear factors."
              },
              "hint": "Count how many denominator factors must be represented, including all powers of repeated linear factors.",
              "needs_visual": true,
              "visual_type": "factor-to-term mapping diagram",
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "A student writes only \\(\\dfrac{A}{(x+3)^2}\\) for the repeated factor part of \\((x+3)^2\\). What is the issue?",
              "options": [
                "A. Nothing is wrong; one term is enough for any repeated factor",
                "B. The numerator should be quadratic",
                "C. The setup is incomplete because a repeated linear factor needs both \\(\\dfrac{B}{x+3}\\) and \\(\\dfrac{C}{(x+3)^2}\\)",
                "D. The denominator should be expanded first"
              ],
              "correct_option": "C",
              "explanation": "For a repeated linear factor of power 2, the decomposition must include one term for each power from 1 up to 2: both \\(1/(x+3)\\) and \\(1/(x+3)^2\\).",
              "wrong_option_explanations": {
                "A": "This is the exact trap the section warns against — one term is never sufficient for a repeated factor.",
                "B": "Linear numerators are not needed over linear factors; that applies to irreducible quadratic factors.",
                "D": "Expanding the denominator is unnecessary and unhelpful for writing the correct template."
              },
              "hint": "Think of a repeated factor as requiring a ladder of terms: one for each power from 1 up to the full power.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "clearing_and_matching",
          "label": "Clearing denominators and equating coefficients",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "After multiplying both sides by \\((x+1)(x+2)(x+3)^2\\), why is it valid to equate coefficients of like powers of \\(x\\)?",
              "options": [
                "A. Because the two sides are equal only at the roots of the denominator",
                "B. Because the two sides form an identity in \\(x\\), so corresponding coefficients must match",
                "C. Because the degree is the same on both sides",
                "D. Because partial fractions always produce unique constants without algebra"
              ],
              "correct_option": "B",
              "explanation": "Once denominators are cleared correctly, both sides represent the same polynomial for all \\(x\\) — a polynomial identity — so matching coefficients of each power is fully justified.",
              "wrong_option_explanations": {
                "A": "The equality holds for every value of \\(x\\), not just the roots of the denominator.",
                "C": "Having the same degree on both sides is a necessary condition, but it alone does not justify coefficient matching.",
                "D": "Uniqueness of the decomposition is a theorem, but it does not eliminate the need to actually solve for the constants."
              },
              "hint": "Ask whether the cleared equation holds for one specific value of \\(x\\) or for every value of \\(x\\).",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "In the cleared equation for this example, which statement about the \\(k_4\\) term is correct?",
              "options": [
                "A. It contributes to the \\(x^3\\), \\(x^2\\), \\(x\\), and constant coefficients",
                "B. It contributes only to the constant term",
                "C. It contributes to the \\(x^2\\), \\(x\\), and constant coefficients, but not to the \\(x^3\\) coefficient",
                "D. It contributes only to the \\(x^3\\) coefficient"
              ],
              "correct_option": "C",
              "explanation": "After clearing denominators, the \\(k_4\\) term is multiplied by \\((x+1)(x+2) = x^2+3x+2\\), which has degree 2 — so it contributes to \\(x^2\\), \\(x\\), and the constant, but not to \\(x^3\\).",
              "wrong_option_explanations": {
                "A": "This wrongly assigns an \\(x^3\\) contribution to \\(k_4\\), which is multiplied by only a degree-2 polynomial.",
                "B": "The factor \\(x^2+3x+2\\) also produces \\(x^2\\) and \\(x\\) terms, not just a constant.",
                "D": "This is the opposite of what happens; \\(k_4\\) has no \\(x^3\\) contribution at all."
              },
              "hint": "After canceling \\((x+3)^2\\) from the \\(k_4\\) term, what polynomial factor remains?",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "final_answer_and_exam_framing",
          "label": "Final constants and exam-ready presentation",
          "importance": "medium",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "If \\(k_1=1,\\ k_2=-2,\\ k_3=2,\\ k_4=-3\\), which final answer is correct?",
              "options": [
                "A. \\(F(x)=\\dfrac{1}{x+1}+\\dfrac{2}{x+2}+\\dfrac{2}{x+3}+\\dfrac{3}{(x+3)^2}\\)",
                "B. \\(F(x)=\\dfrac{1}{x+1}-\\dfrac{2}{x+2}+\\dfrac{2}{x+3}-\\dfrac{3}{(x+3)^2}\\)",
                "C. \\(F(x)=1,\\ -2,\\ 2,\\ -3\\)",
                "D. \\(F(x)=\\dfrac{1}{x+1}-\\dfrac{2}{x+2}-\\dfrac{2}{x+3}-\\dfrac{3}{(x+3)^2}\\)"
              ],
              "correct_option": "B",
              "explanation": "The final step is substituting each constant into the decomposition template with the correct sign and denominator — \\(k_2 = -2\\) gives \\(-2/(x+2)\\), and \\(k_4 = -3\\) gives \\(-3/(x+3)^2\\).",
              "wrong_option_explanations": {
                "A": "All negative signs were dropped — a classic finish-line error.",
                "C": "Listing the constants alone is not the final answer; the full expanded function must be written.",
                "D": "The sign of the \\(k_3\\) term is wrong: \\(k_3 = +2\\) gives \\(+2/(x+3)\\), not \\(-2/(x+3)\\)."
              },
              "hint": "Write the template first with all four denominators, then substitute each constant one at a time.",
              "needs_visual": false,