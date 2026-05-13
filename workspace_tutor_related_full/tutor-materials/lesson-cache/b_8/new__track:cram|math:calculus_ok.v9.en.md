```json
{
  "section_id": "B.8 Appendix: Useful Mathematical Formulas",
  "section_title": "B.8 Appendix: Useful Mathematical Formulas",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.8 Appendix: Useful Mathematical Formulas\n\n> **Exam-Cram Objective:** This appendix is a formula bank. Your goal is not deep theory — it is fast recognition, instant recall, and trap avoidance under time pressure.\n\n---\n\nThe highest-yield clusters are:\n\n- **Complex-number identities** — Euler's formula, rectangular ↔ polar conversion\n- **Standard series** — Maclaurin expansions for e^x, sin x, cos x, (1+x)^n\n- **Trig identities** — half-angle, double-angle, product-to-sum\n- **Derivatives** — chain rule with ax, inverse trig, log/ln\n- **Integrals** — by parts, standard closed forms, trig substitution\n- **L'Hopital's Rule** — conditions matter\n- **Quadratic/cubic formulas** — quadratic is mandatory memory\n\n### HOW TO USE THIS SECTION\n\nFor each formula: memorize the clean rule, spot the trigger pattern in the problem, and watch for these traps: missing the chain-rule factor **a**, mixing up sin/cos signs, and applying L'Hopital to forms that are not 0/0 or ∞/∞."
    },
    {
      "type": "book_image",
      "source_page": "page-055",
      "fig_id": null,
      "caption": "This page is the core exam-reference sheet for series expansions and trigonometric identities, which are frequently used to simplify expressions quickly."
    },
    {
      "type": "text_explanation",
      "content": "## 1. High-Yield Pattern Recognition\n\nTrain yourself to match the problem's surface features to the right formula family in seconds.\n\n---\n\n### GROUP 1 — COMPLEX NUMBERS\n\n**Trigger:** problem shows e^{jθ}, a+jb, products of polar forms, or phasor notation.\n**Use:** Euler's formula, rectangular ↔ polar conversion, magnitude formula.\n\n### GROUP 2 — SERIES AND SMALL-x APPROXIMATIONS\n\n**Trigger:** problem asks for an approximation near x = 0, or says |x| ≪ 1.\n**Use:** Maclaurin series for e^x, sin x, cos x, tan x, tanh x, and (1+x)^n ≈ 1+nx.\n\n### GROUP 3 — TRIG IDENTITIES\n\n**Trigger:** integrand or expression contains sin²x, cos²x, or products like sin(ax)cos(bx).\n**Use:** half-angle or product-to-sum identities before integrating or simplifying.\n\n### GROUP 4 — CHAIN RULE AND INTEGRATION BY PARTS\n\n**Trigger:** inside argument is ax, bx, or any composite u(x).\n**Use:** chain rule on derivatives; integration by parts for x·e^{ax}, x·sin(ax), x·cos(ax).\n\n---\n\n### FASTEST RECOGNITION RULES\n\n- See e^{jθ} → Euler immediately\n- See |x| ≪ 1 → truncate the series after 2–3 terms\n- See sin²x in an integral → half-angle identity first\n- See ax inside any function → chain-rule factor **a** is mandatory\n\n### THREE EXPLICIT TRAPS\n\n1. **Dropping the factor a** in chain-rule derivatives and integrals\n2. **Wrong sign** on the derivative of cos(ax) — it is −a sin(ax), not +a sin(ax)\n3. **Applying L'Hopital** to a limit that is not in 0/0 or ∞/∞ form"
    },
    {
      "type": "math_block",
      "latex": "e^{\\pm j\\theta}=\\cos\\theta \\pm j\\sin\\theta,\\quad a+jb=re^{j\\theta},\\quad r=\\sqrt{a^2+b^2},\\quad \\theta=\\tan^{-1}(b/a)",
      "explanation": "These are the must-know conversions between rectangular and polar complex-number forms, tested whenever a problem involves simplification, multiplication, raising to a power, or rewriting signals in phasor style."
    },
    {
      "type": "math_block",
      "latex": "e^x=1+x+\\frac{x^2}{2!}+\\cdots,\\quad \\sin x=x-\\frac{x^3}{3!}+\\cdots,\\quad \\cos x=1-\\frac{x^2}{2!}+\\cdots,\\quad (1+x)^n\\approx 1+nx\\ \\text{for}\\ |x|\\ll 1",
      "explanation": "These are the fastest small-x approximations and series starters — the key exam skill is remembering the first few nonzero terms and the alternating sign pattern (present in sin x and cos x, absent in e^x)."
    },
    {
      "type": "text_explanation",
      "content": "## 2. Derivatives and Integrals Students Mix Up\n\n> **Core rule:** d/dx f(u) = f′(u) · du/dx. Whenever the inside argument is ax or any u(x), the outer derivative **must** be multiplied by the inner derivative. This factor is almost always a constant **a** — and it is the most commonly dropped point on exams.\n\n---\n\n### STANDARD DERIVATIVE PATTERNS\n\n| Expression | Derivative |\n|---|---|\n| e^{bx} | b e^{bx} |\n| a^{bx} | b (ln a) a^{bx} |\n| sin(ax) | a cos(ax) |\n| cos(ax) | −a sin(ax) |\n| tan(ax) | a sec²(ax) |\n| sin⁻¹(x/a) | 1/√(a²−x²) |\n| tan⁻¹(x/a) | a/(a²+x²) |\n| ln(x) | 1/x |\n\n### STANDARD INTEGRAL TRIGGERS\n\n**Use integration by parts** for: x e^{ax}, x sin(ax), x cos(ax).\n\n**Use trig identities first** for: sin²(ax), cos²(ax), sin(ax)cos(bx) — rewrite before integrating.\n\n**Use closed forms** for:\n- ∫ e^{ax} dx = (1/a) e^{ax}\n- ∫ e^{ax} sin(bx) dx = e^{ax}(a sin bx − b cos bx)/(a²+b²)\n- ∫ dx/(x²+a²) = (1/a) tan⁻¹(x/a)\n\n#### Mini-Example\n\nd/dx [sin(5x)] = cos(5x) · 5 = 5 cos(5x). The factor 5 is mandatory.\n\n∫ e^{3x} dx = (1/3) e^{3x} + C. The factor 1/3 compensates for the chain-rule 3.\n\n---\n\n### TRAP LIST\n\n1. **Missing factor a** — the single most common error in this cluster\n2. **Wrong sign** — d/dx cos(ax) = −a sin(ax), never +a sin(ax)\n3. **Integrating sin²(ax) directly** — always apply the half-angle identity first: sin²(ax) = ½(1 − cos 2ax)"
    },
    {
      "type": "math_block",
      "latex": "\\frac{d}{dx}\\sin(ax)=a\\cos(ax),\\quad \\frac{d}{dx}\\cos(ax)=-a\\sin(ax),\\quad \\int e^{ax}\\,dx=\\frac{1}{a}e^{ax},\\quad \\int \\frac{dx}{x^2+a^2}=\\frac{1}{a}\\tan^{-1}\\!\\left(\\frac{x}{a}\\right)",
      "explanation": "These are classic exam formulas where students lose points by dropping the constant a, flipping the sign on the cosine derivative, or forgetting the 1/a factor in the exponential integral."
    },
    {
      "type": "text_explanation",
      "content": "## 3. Last-Minute Formulas That Save Points\n\n### GEOMETRIC AND SUMMATION SHORTCUTS\n\n- **Finite geometric sum:** ∑_{k=0}^{N−1} r^k = (1 − r^N)/(1 − r)\n- **Sum of first N integers:** ∑_{k=1}^{N} k = N(N+1)/2\n- **Sum of squares:** ∑_{k=1}^{N} k² = N(N+1)(2N+1)/6\n\nThese appear in discrete-signal and series-convergence problems — recognize the pattern and substitute immediately.\n\n---\n\n### L'HOPITAL'S RULE — CONDITIONS FIRST\n\n> **Apply only when direct substitution gives 0/0 or ∞/∞.** If the form is 0·∞ or ∞−∞, rewrite algebraically first, then check whether L'Hopital applies.\n\n---\n\n### QUADRATIC FORMULA — MANDATORY MEMORY\n\nFor ax² + bx + c = 0:\n\nx = (−b ± √(b²−4ac)) / (2a)\n\nKnow this cold. It appears in characteristic equations, resonance problems, and filter design.\n\n### CUBIC FORMULA — RECOGNITION ONLY\n\nA general cubic is first reduced to a **depressed cubic** (no x² term) before the formula applies. Unless the exam explicitly emphasizes cubic solutions, treat this as a recognition item only — do not spend time deriving it.\n\n---\n\n### EXAM TIP\n\n> **If time is short, prioritize in this order:** quadratic formula → common series (e^x, sin x, cos x) → trig identities (half-angle, double-angle) → chain-rule derivatives → standard integrals (e^{ax}, 1/(x²+a²)) → L'Hopital conditions."
    },
    {
      "type": "section_summary",
      "bullets": [
        "Match the problem's surface trigger — e^{jθ}, |x|≪1, sin²x, ax inside — to the correct formula family instantly.",
        "The three costliest traps are: missing chain-rule factor a, wrong sign on cos derivative, and misapplying L'Hopital outside 0/0 or ∞/∞.",
        "Memorize first: Euler's formula, quadratic formula, e^x/sin x/cos x series, and the 1/a integral factor."
      ],
      "transition": "In the next section we will apply these formulas as shortcuts inside actual problem solving."
    },
    {
      "type": "quiz_plan",
      "target_questions": 8,
      "question_range": {
        "min": 6,
        "max": 9
      },
      "knowledge_points": [
        {
          "id": "complex_numbers_and_polar_form",
          "label": "Complex-number identities and polar form",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Which identity is correct?",
              "options": [
                "A. e^{j\\theta}=\\sin\\theta+j\\cos\\theta",
                "B. e^{j\\theta}=\\cos\\theta+j\\sin\\theta",
                "C. e^{j\\theta}=\\cos\\theta-j\\sin\\theta",
                "D. e^{j\\theta}=\\tan\\theta+j"
              ],
              "correct_option": "B",
              "explanation": "Euler's formula is e^{jθ} = cos(θ) + j sin(θ). Cosine is always the real part; sine is always the imaginary part.",
              "wrong_option_explanations": {
                "A": "This swaps sine and cosine — cosine must be the real part.",
                "C": "The minus sign belongs to e^{−jθ}, not e^{jθ}.",
                "D": "This is not a valid standard identity."
              },
              "hint": "Remember: cosine is the real part, sine is the j-part.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "For z = 3 + 4j, what is the magnitude r?",
              "options": [
                "A. 5",
                "B. 7",
                "C. \\sqrt{7}",
                "D. 1"
              ],
              "correct_option": "A",
              "explanation": "r = √(3² + 4²) = √(9 + 16) = √25 = 5. This is a classic 3-4-5 Pythagorean triple.",
              "wrong_option_explanations": {
                "B": "This adds the components directly (3 + 4 = 7) instead of using the Pythagorean formula.",
                "C": "This comes from adding the squares incorrectly (√(3+4) = √7).",
                "D": "There is no reason for the magnitude to be 1 here."
              },
              "hint": "Use r = √(a² + b²).",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "series_and_small_x_approximations",
          "label": "Maclaurin series and first-term approximations",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "Which is the correct Maclaurin expansion start for cos x?",
              "options": [
                "A. 1 + x + x^2/2! + \\cdots",
                "B. x - x^3/3! + \\cdots",
                "C. 1 - x^2/2! + x^4/4! - \\cdots",
                "D. 1 + x^2/2! + x^4/4! + \\cdots"
              ],
              "correct_option": "C",
              "explanation": "cos x starts at 1, uses only even powers, and the signs alternate: +1, −x²/2!, +x⁴/4!, −x⁶/6!, …",
              "wrong_option_explanations": {
                "A": "This is the start of e^x, which has all positive terms.",
                "B": "This is the start of sin x, which uses odd powers.",
                "D": "The signs must alternate — cos x is not all-positive."
              },
              "hint": "cos x uses even powers only, with alternating signs starting at +1.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "For |x| ≪ 1, which approximation is correctly matched to the appendix?",
              "options": [
                "A. (1+x)^n \\approx 1 + x^n",
                "B. (1+x)^n \\approx 1 + nx",
                "C. (1+x)^n \\approx nx",
                "D. (1+x)^n \\approx 1 + n + x"
              ],
              "correct_option": "B",
              "explanation": "The first-order binomial approximation for small x is (1+x)^n ≈ 1 + nx. Keep the constant 1 and the linear term nx; drop all higher-order terms.",
              "wrong_option_explanations": {
                "A": "This is not the standard small-x expansion — the exponent does not move onto x alone.",
                "C": "This incorrectly drops the constant term 1, which dominates when x is small.",
                "D": "This is not algebraically or dimensionally correct."
              },
              "hint": "Keep the constant term 1 and the linear term nx.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "trig_derivative_integral_traps",
          "label": "Trig identities, chain rule, and standard integrals",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "What is d/dx [cos(3x)]?",
              "options": [
                "A. -\\sin(3x)",
                "B. 3\\sin(3x)",
                "C. -3\\sin(3x)",
                "D. 3\\cos(3x)"
              ],
              "correct_option": "C",
              "explanation": "By the chain rule: d/dx cos(3x) = −sin(3x) · 3 = −3 sin(3x). The outer derivative gives −sin, and the inner derivative gives the factor 3.",
              "wrong_option_explanations": {
                "A": "This misses the chain-rule factor 3 — the inner derivative of 3x is 3, not 1.",
                "B": "This has the correct factor 3 but the wrong sign — the derivative of cosine is negative sine.",
                "D": "This differentiates incorrectly — the derivative of cosine is not cosine."
              },
              "hint": "Cosine derivative is negative sine; then multiply by the inner derivative, which is 3.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp3_q2",
              "type": "multiple_choice",
              "stem": "Which identity is most useful before integrating sin²x?",
              "options": [
                "A. \\sin^2 x + \\cos^2 x = 1",
                "B. \\sin^2 x = \\frac{1}{2}(1 - \\cos 2x)",
                "C. 2\\sin x\\cos x = \\sin 2x",
                "D. \\cos^2 x - \\sin^2 x = \\cos 2x"
              ],
              "correct_option": "B",
              "explanation": "The half-angle identity sin²x = ½(1 − cos 2x) rewrites the square into a constant plus a cosine, both of which integrate directly and cleanly.",
              "wrong_option_explanations": {
                "A": "True, but by itself it does not rewrite sin²x into an integrable form without further steps.",
                "C": "This helps with products of sin and cos, not a squared term alone.",
                "D": "This identity is true but isolates cos²x − sin²x, not sin²x by itself."
              },
              "hint": "Look for the identity that turns a square into a constant plus a cosine term.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp3_q3",
              "type": "short_answer",
              "stem": "Explain why ∫ e^{ax} dx = (1/a)e^{ax} instead of just e^{ax}.",
              "ideal_answer": "Because differentiating e^{ax} by the chain rule gives a·e^{ax}, not e^{ax}. So the antiderivative must include the factor 1/a to cancel that extra a when you differentiate to verify the result.",
              "grading_rubric": [
                "Must mention the chain rule",
                "Must state that d/dx[e^{ax}] = a·e^{ax}",
                "Must explain that the factor 1/a cancels the extra factor a"
              ],
              "explanation": "This checks whether the student understands the constant-factor trap rather than memorizing the formula blindly. A student who can reconstruct the reason will not drop the 1/a on the exam.",
              "hint": "Differentiate your proposed answer (1/a)e^{ax} and check whether it returns the integrand e^{ax}.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "lhopital_and_algebraic_formulas",
          "label": "L'Hopital conditions and equation-solving formulas",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp4_q1",
              "type": "multiple_choice",
              "stem": "L'Hopital's Rule can be applied directly when substitution produces which form?",
              "options": [
                "A. 0/0 or \\infty/\\infty",
                "B. 0 \\times \\infty only",
                "C. \\infty - \\infty only",
                "D. Any limit that looks difficult"
              ],
              "correct_option": "A",
              "explanation": "L'Hopital's Rule requires the limit to be in the indeterminate form 0/0 or ∞/∞ after direct substitution. Any other form must be algebraically rewritten first.",
              "wrong_option_explanations": {
                "B": "The form 0·∞ requires algebraic rewriting (e.g., convert to a fraction) before L'Hopital may apply.",
                "C": "The form ∞−∞ also requires rewriting first — it is not a direct application case.",
                "D": "Difficulty alone is never a valid condition for applying L'Hopital's Rule."
              },
              "hint": "Check the exact indeterminate forms listed in the rule: 0/0 or ∞/∞.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp4_q2",
              "type": "multiple_choice",
              "stem": "Which formula correctly solves ax² + bx + c = 0?",
              "options": [
                "A. x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
                "B. x = \\