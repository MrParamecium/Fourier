```json
{
  "section_id": "B.1 Complex Numbers",
  "section_title": "B.1 Complex Numbers",
  "rendered_blocks": [
    {
      "type": "text_explanation",
      "content": "# B.1 Complex Numbers\n\n> **Section Objective:** Master the two languages of complex numbers — rectangular form and polar/exponential form — and convert between them reliably, including correct quadrant handling.\n\nConsider z = −2 + j3. You already know how to plot this point. But in this section you will learn to describe it in a second, equally valid language: polar/exponential form. These two representations are not competing — they are the same number viewed from different angles (literally).\n\nComplex numbers are useful because a single expression encodes location, size, and direction simultaneously. In signals and systems work, this compactness becomes essential.\n\n**For the exam, you must be able to:**\n- Identify a and b from a + jb without hesitation\n- Compute magnitude r = sqrt(a² + b²) correctly\n- Find angle θ with the correct quadrant — not just the raw calculator output\n- Convert both ways between a + jb and re^(jθ)\n\n> **Core takeaway:** Rectangular form and polar form are two descriptions of the same point — knowing both and switching between them is the central skill of this section."
    },
    {
      "type": "book_image",
      "source_page": "page-005",
      "fig_id": "Fig. B.2",
      "caption": "Figure B.2 is the core picture of this section: the single point z = a + jb can be read either as rectangular coordinates (a, b) or as polar data (r, θ), and this dual reading is the foundation for every conversion in B.1."
    },
    {
      "type": "text_explanation",
      "content": "## 1. Rectangular and Polar Form Are Two Descriptions of the Same Number\n\nLet's work through a concrete example before stating the rule.\n\n**Example: z = 3 + j4**\n\nStep 1 — Read off the components: a = 3, b = 4.\n\nStep 2 — Compute the magnitude:\nr = sqrt(3² + 4²) = sqrt(9 + 16) = sqrt(25) = **5**\n\nStep 3 — Compute the angle:\nθ = tan⁻¹(b/a) = tan⁻¹(4/3) ≈ **53.1°**\n\nBoth a and b are positive, so the point is in quadrant I — no correction needed.\n\nStep 4 — Write the exponential form:\nz = **5e^(j53.1°)**\n\n---\n\n### WHAT EACH FORM TELLS YOU\n\n**Rectangular form** a + jb tells you the horizontal and vertical components — where the point sits on the grid.\n\n**Polar form** re^(jθ) tells you the length (distance from origin) and direction (angle from positive real axis).\n\n#### Formula Reference\nMagnitude: r = sqrt(a² + b²) | Angle: θ = tan⁻¹(b/a), quadrant-corrected | Rectangular: a = r cosθ, b = r sinθ\n\n### COMMON MISTAKE\n\nr is the **magnitude** — the full distance from the origin. It is **not** the real part a. For z = 3 + j4, the real part is 3 but the magnitude is 5.\n\n> **Core takeaway:** Magnitude r = sqrt(a² + b²) is always positive and always larger than either component alone (unless one component is zero)."
    },
    {
      "type": "math_block",
      "latex": "z = a + jb = r(\\cos\\theta + j\\sin\\theta) = re^{j\\theta}",
      "explanation": "This single formula says one complex number can be written either by its components a and b (rectangular form) or by its magnitude r and angle θ (polar form). Euler's formula — e^(jθ) = cosθ + j sinθ — is the bridge that connects the two views, showing they are algebraically identical."
    },
    {
      "type": "book_image",
      "source_page": "page-009",
      "fig_id": "unknown",
      "caption": "These Argand diagrams are exam-critical: each of the four complex numbers sits in a different quadrant, and the correct angle must be read from the diagram — not blindly copied from a calculator's inverse tangent output, which only returns values in the range −90° to +90°."
    },
    {
      "type": "text_explanation",
      "content": "## 2. How to Find Magnitude and Angle Without Quadrant Mistakes\n\nThis is where most exam errors happen. Let's work through the dangerous case directly.\n\n**Example: z = −2 + j1**\n\nStep 1 — Magnitude:\nr = sqrt((-2)² + 1²) = sqrt(4 + 1) = **sqrt(5) ≈ 2.24**\n\nStep 2 — Reference angle (ignore signs for now):\nα = tan⁻¹(|b|/|a|) = tan⁻¹(1/2) ≈ **26.6°**\n\nStep 3 — Identify the quadrant:\nReal part = −2 (negative), Imaginary part = +1 (positive) → **Quadrant II**\n\nStep 4 — Correct the angle for quadrant II:\nθ = 180° − 26.6° = **153.4°**\n\nSo z = sqrt(5) · e^(j153.4°).\n\n---\n\n### THE GENERAL EXAM RULE\n\nYour calculator's tan⁻¹ always returns a value between −90° and +90°. That raw output is only correct for quadrant I and IV points. For quadrants II and III, you must adjust.\n\n| Quadrant | Signs | Correction |\n|----------|-------|------------|\n| I | a > 0, b > 0 | θ = α |\n| II | a < 0, b > 0 | θ = 180° − α |\n| III | a < 0, b < 0 | θ = −180° + α (or α − 180°) |\n| IV | a > 0, b < 0 | θ = −α |\n\n### MAGNITUDE VS. REAL PART\n\nFor z = −2 + j1: the **real part** is −2 (a signed coordinate). The **magnitude** is sqrt(5) ≈ 2.24 (a positive distance). They are completely different quantities.\n\n#### Principal Value Convention\nPrincipal angle is in the range (−180°, 180°]. Always report θ in this range unless told otherwise.\n\n---\n\n### EXAM CHEAT-SHEET — LIKELY TRAPS\n\n- **Trap 1:** Using the raw tan⁻¹ output without checking the quadrant\n- **Trap 2:** Confusing magnitude r with real part a\n- **Trap 3:** Computing r = a + b (arithmetic sum) instead of r = sqrt(a² + b²)\n- **Trap 4:** Forgetting that b is the coefficient of j, not the term jb\n\n#### Formula Reference\nMagnitude: r = sqrt(a² + b²) | Reference angle: α = tan⁻¹(|b|/|a|) | Final angle: apply quadrant correction from table above\n\n> **Core takeaway:** Always check the signs of a and b before writing down the angle — the calculator gives a reference angle, not the final answer."
    },
    {
      "type": "book_image",
      "source_page": "page-011",
      "fig_id": "Fig. B.5",
      "caption": "Figure B.5 reverses the process: starting from polar/exponential form re^(jθ), apply cosine to recover the real part and sine to recover the imaginary part — this works for negative angles and for angles that differ by full rotations of 2π, all of which represent the same point."
    },
    {
      "type": "text_explanation",
      "content": "## 3. Converting from Polar Back to Rectangular Form\n\nGoing the other direction is more straightforward, but the trigonometry must be evaluated carefully.\n\n**Example 1: z = 2e^(jπ/3)**\n\nStep 1 — Real part:\na = r cosθ = 2 cos(π/3) = 2 × (1/2) = **1**\n\nStep 2 — Imaginary part:\nb = r sinθ = 2 sin(π/3) = 2 × (√3/2) = **√3**\n\nResult: z = **1 + j√3**\n\n---\n\n**Example 2: z = 3e^(−j3π/2)**\n\nThe angle −3π/2 looks unfamiliar. Add 2π to simplify:\n−3π/2 + 2π = π/2\n\nNow evaluate:\na = 3 cos(π/2) = 3 × 0 = **0**\nb = 3 sin(π/2) = 3 × 1 = **3**\n\nResult: z = **j3**\n\n---\n\n### THE GENERAL RULE\n\nGiven z = re^(jθ):\n- Real part: a = r cosθ\n- Imaginary part: b = r sinθ\n\nAdding or subtracting any multiple of 2π to θ does not change the point — it is the same location on the complex plane.\n\n#### Formula Reference\na = r cosθ | b = r sinθ | Adding 2π to θ leaves z unchanged\n\n> **Core takeaway:** Polar to rectangular is always r cosθ for the real part and r sinθ for the imaginary part — simplify the angle first if it falls outside the familiar range."
    },
    {
      "type": "section_summary",
      "bullets": [
        "Rectangular form a + jb gives components; polar form re^(jθ) gives magnitude and direction — same point, two languages.",
        "Magnitude r = sqrt(a² + b²) is always positive and is never the same as the real part a.",
        "The calculator's tan⁻¹ gives a reference angle only — always apply a quadrant correction using the signs of a and b."
      ],
      "transition": "**Exam Cheat-Sheet:**\n\n- **Rectangular → Polar:** (1) r = sqrt(a² + b²), (2) α = tan⁻¹(|b|/|a|), (3) apply quadrant correction to get θ, (4) write re^(jθ)\n- **Polar → Rectangular:** (1) simplify θ if needed, (2) a = r cosθ, (3) b = r sinθ, (4) write a + jb\n- **Quadrant check rule:** Signs of a and b determine the quadrant; adjust the reference angle accordingly (see table in Section 2)\n- **Common trap:** Magnitude r ≠ real part a — they are distance versus coordinate, and they differ in sign and value\n\nIn the next section we will use these forms to simplify operations with complex numbers."
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
          "id": "rectangular_to_polar_core",
          "label": "Convert rectangular form to polar/exponential form",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Which polar/exponential form is correct for z = 3 + j4?",
              "options": [
                "A. 5e^{j53.1°}",
                "B. 3e^{j4}",
                "C. 7e^{j53.1°}",
                "D. 5e^{j36.9°}"
              ],
              "correct_option": "A",
              "explanation": "The magnitude is sqrt(3² + 4²) = sqrt(25) = 5 and the angle is tan⁻¹(4/3) ≈ 53.1°. Both components are positive so the point is in quadrant I — no correction needed. Therefore z = 5e^{j53.1°}.",
              "wrong_option_explanations": {
                "B": "This incorrectly treats the rectangular components 3 and 4 as if they were polar data r and θ directly.",
                "C": "7 is the arithmetic sum 3 + 4, not the magnitude. Magnitude requires the Pythagorean formula, not addition.",
                "D": "36.9° comes from swapping the ratio to tan⁻¹(3/4) instead of tan⁻¹(4/3)."
              },
              "hint": "Compute magnitude using r = sqrt(a² + b²) first, then find the angle from tan⁻¹(b/a).",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "For z = 1 − j3, which exponential form is correct using a principal angle in degrees?",
              "options": [
                "A. sqrt(10)e^{j71.6°}",
                "B. sqrt(10)e^{-j71.6°}",
                "C. 10e^{-j71.6°}",
                "D. sqrt(10)e^{-j18.4°}"
              ],
              "correct_option": "B",
              "explanation": "Magnitude: r = sqrt(1² + (−3)²) = sqrt(1 + 9) = sqrt(10). The real part is positive and the imaginary part is negative, so the point is in quadrant IV. The reference angle is tan⁻¹(3/1) ≈ 71.6°, and for quadrant IV the principal angle is −71.6°. Therefore z = sqrt(10)e^{−j71.6°}.",
              "wrong_option_explanations": {
                "A": "A positive angle of +71.6° would place the point in quadrant I, but the imaginary part is negative here.",
                "C": "10 is the squared magnitude (|z|²), not the magnitude itself.",
                "D": "−18.4° does not correspond to the correct ratio — the angle comes from tan⁻¹(|b|/|a|) = tan⁻¹(3/1), not from any complementary angle."
              },
              "hint": "Check the signs of the real and imaginary parts to identify the quadrant before choosing the angle sign.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "quadrant_and_principal_value",
          "label": "Quadrant correction and principal value of angle",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "A student computes tan⁻¹(1/(−2)) = −26.6° for z = −2 + j1. What is the correct principal angle?",
              "options": [
                "A. −26.6°",
                "B. 26.6°",
                "C. 153.4°",
                "D. 206.6°"
              ],
              "correct_option": "C",
              "explanation": "The point (−2, 1) has a negative real part and a positive imaginary part, placing it in quadrant II. The reference angle is 26.6°. For quadrant II, the correct angle is 180° − 26.6° = 153.4°.",
              "wrong_option_explanations": {
                "A": "−26.6° is in quadrant IV (positive real, negative imaginary), which does not match the signs of z = −2 + j1.",
                "B": "26.6° is in quadrant I (both positive), which also does not match.",
                "D": "206.6° is in quadrant III (both negative), not quadrant II. It is also outside the principal value range (−180°, 180°]."
              },
              "hint": "Negative real part and positive imaginary part means quadrant II. For quadrant II: θ = 180° − reference angle.",
              "needs_visual": true,
              "visual_type": "complex_plane_point_and_quadrants",
              "same_point_variant": true
            },
            {
              "id": "kp2_q2",
              "type": "short_answer",
              "stem": "Explain why the magnitude of z = −2 + j1 is not equal to its real part, even though both involve the number 2.",
              "ideal_answer": "The real part is the horizontal coordinate Re(z) = −2, which is a signed component. The magnitude is the distance from the origin: |z| = sqrt((−2)² + 1²) = sqrt(5) ≈ 2.24. They describe different geometric quantities — the real part is one coordinate along an axis, while the magnitude is the total length of the vector from the origin to the point.",
              "grading_rubric": [
                "Must state Re(z) = −2 explicitly",
                "Must state |z| = sqrt(5) with the correct calculation shown",
                "Must explain the geometric distinction: component (coordinate) versus distance (length from origin)"
              ],
              "explanation": "This question targets the most common confusion in this section: students see the number 2 appear in both the real part and the magnitude calculation and assume they are related. They are not — one is signed and directional, the other is always positive and represents total distance.",
              "hint": "Think geometrically: what does each quantity represent on the complex plane diagram?",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "polar_to_rectangular_core",
          "label": "Convert polar/exponential form to rectangular form",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "Convert z = 2e^{jπ/3} to rectangular form.",
              "options": [
                "A. 2 + j(π/3)",
                "B. 1 + j√3",
                "C. √3 + j",
                "D. 1 − j√3"
              ],
              "correct_option": "B",
              "explanation": "Apply the conversion formulas: a = r cosθ = 2 cos(π/3) = 2 × (1/2) = 1, and b = r sinθ = 2 sin(π/3) = 2 × (√3/2) = √3. Therefore z = 1 + j√3.",
              "wrong_option_explanations": {
                "A": "This incorrectly inserts the angle π/3 directly as the imaginary part, ignoring the cosine and sine evaluation entirely.",
                "C": "The real and imaginary parts are swapped — cos(π/3) = 1/2 gives the real part, and sin(π/3) = √3/2 gives the imaginary part, not the other way around.",
                "D": "The imaginary part has the wrong sign. sin(π/3) = +√3/2, which is positive, so the imaginary part is +√3, not −√3."
              },
              "hint": "Use a = r cosθ for the real part and b = r sinθ for the imaginary part. Evaluate cos(π/3) and sin(π/3) carefully.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp3_q2",
              "type": "multiple_choice",
              "stem": "Which rectangular form matches z = 3e^{−j3π/2}?",
              "options": [
                "A. −j3",
                "B. 3",
                "C. j3",
                "D. −3"
              ],
              "correct_option": "C",
              "explanation": "Simplify the angle: −3π/2 + 2π = π/2. Now evaluate: a = 3 cos(π/2) = 3 × 0 = 0, and b = 3 sin(π/2) = 3 × 1 = 3. Therefore z = 0 + j3 = j3.",
              "wrong_option_explanations": {
                "A": "−j3 corresponds to angle −π/2 (or equivalently 3π/2), not −3π/2.",
                "B": "A purely real value of 3 would require sin(θ) = 0 and cos(θ) = 1, corresponding to angle 0, not −3π/2.",
                "D": "−3 corresponds to angle π (or −π), not −3π/2."
              },
              "hint": "Add 2π to the angle −3π/2 to get an equivalent angle in the familiar range, then evaluate cosine and sine.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "representation_and_formula_link",
          "label": "Recognize the link between component form and Euler form",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp4_q1",
              "type": "multiple_choice",
              "stem": "Which statement is always true for z = re^{jθ}?",
              "options": [
                "A. Re(z) = r and Im(z) = θ",
                "B. Re(z) = r cosθ and Im(z) = r sinθ",
                "C. Re(z) = cosθ and Im(z) = sinθ",
                "D. |z| = r cosθ"
              ],
              "correct_option": "B",
              "explanation": "Expanding using Euler's formula: z = re^{jθ} = r(cosθ + j sinθ) = r cosθ + j(r sinθ). Therefore Re(z) = r cosθ and Im(z) = r sinθ.",
              "wrong_option_explanations": {
                "A": "r is the magnitude of z, not its real part. θ is the angle, not the imaginary part. These are polar parameters, not rectangular components.",
                "C": "This forgets the scale factor r. The correct expressions are r cosθ and r sinθ, not cosθ and sinθ alone.",
                "