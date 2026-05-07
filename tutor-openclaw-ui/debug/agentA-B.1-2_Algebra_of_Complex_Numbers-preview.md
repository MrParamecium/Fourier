# Agent A Preview: B.1-2 Algebra of Complex Numbers

- Difficulty: intermediate
- Estimated read minutes: 12

## Learning Objectives

- Read a complex number in rectangular, polar, and exponential form.
- Convert between rectangular and polar form while avoiding quadrant errors.
- Use conjugates to extract real and imaginary parts and simplify products or quotients.
- Choose the efficient form for addition, multiplication, division, powers, roots, and logarithms.
- Extract magnitude and phase from complex-valued expressions.

## Visualization Need

```json
{
  "level": "static",
  "reason": [
    "complex_plane_geometry_is_core",
    "pattern_recognition_benefits_from_figure",
    "wikipedia_has_standard_reference_visual_but_textbook_has_more_section_aligned_figures",
    "misconception_needs_visual_correction",
    "wrong_quadrant_angle_is_high_value_exam_trap"
  ],
  "recommended_assets": [
    "textbook_figure",
    "latex_native_visual",
    "wiki_figure"
  ]
}
```

## Visual Plan

```json
{
  "primary_anchor": "both",
  "rationale": "Use the textbook complex-plane figures as the visual anchors because they exactly match the section notation: rectangular coordinates, magnitude, angle, conjugate reflection, and quadrant examples. Use LaTeX-native formula blocks for algebra rules because students need exact symbolic structure more than decorative visuals. Do not use GPTImage2 because ready-made textbook figures and symbolic formulas accurately demonstrate the key ideas.",
  "cram": "Use figures to identify quadrant, sign, magnitude, and angle quickly before computing.",
  "standard": "Use each visual beside one representative example so the student connects the formula to the complex plane.",
  "top_score": "Use visuals to catch subtle traps: principal angle, conjugate reflection, coterminal angles, and argument addition or subtraction."
}
```

## Planned Blocks

### Block 1: `text_explanation`
- **instruction**: Create a minimal overview page only. Use the heading 'Section Objective' followed by one short sentence: 'Learn how to represent, convert, and compute with complex numbers efficiently.' Then add the heading 'Concepts In This Section' and list only these concept names as bullets: rectangular form, polar and exponential form, Euler bridge, magnitude and angle, conjugate, complex arithmetic, powers and roots, complex logarithms, magnitude and phase of functions. Do not add expanded background paragraphs.

### Block 2: `math_block`
- **latex**: \text{(B.1)}\quad z=a+jb,\qquad \operatorname{Re}z=a,\qquad \operatorname{Im}z=b
- **explanation_instruction**: Start this concept page with the heading '## 1. Rectangular form: read the coordinates'. Explain in 90–130 words that \(a\) is the horizontal real coordinate and \(b\) is the vertical-axis coefficient of \(j\). State that \(\operatorname{Im}z\) is \(b\), not \(jb\). Include the representative example \(z=3-j4\): \(\operatorname{Re}z=3\), \(\operatorname{Im}z=-4\), point \((3,-4)\). Add one exam note: if a problem asks for real and imaginary parts, report real numbers, not terms containing \(j\).

### Block 3: `book_image`
- **source_page**: page-005
- **fig_id**: Fig. B.2
- **caption_instruction**: One sentence: this figure shows \(z=a+jb\) as a point in the complex plane, with magnitude, angle, and conjugate reflection.
- **description_instruction**: Describe the horizontal Real axis and vertical Imaginary axis. Point out that \(z\) is located at \((a,b)\), its distance from the origin is \(r\), its angle from the positive real axis is \(\theta\), and \(z^*\) is reflected across the real axis. Tell students to notice that the conjugate keeps the same real part and flips the sign of the imaginary part.
- **teaching_role**: concept_anchor
- **mode_specific_visual_use**:
```json
{
  "cram": "Use the figure to instantly map signs of \\(a\\) and \\(b\\) to quadrant position.",
  "standard": "Use the figure while reading \\(z=a+jb\\), \\(r\\), \\(\\theta\\), and \\(z^*\\).",
  "top_score": "Use the reflection to distinguish imaginary part, imaginary term, and conjugate."
}
```

### Block 4: `math_block`
- **latex**: \text{(B.2)}\quad z=a+jb=r(\cos\theta+j\sin\theta)\\[4pt]\text{(B.3)}\quad e^{j\theta}=\cos\theta+j\sin\theta\\[4pt]\text{(B.4)}\quad z=re^{j\theta}
- **explanation_instruction**: Start this concept page with the heading '## 2. Polar and exponential form: distance plus direction'. Explain in 110–150 words that rectangular form gives coordinates, while polar/exponential form gives magnitude \(r\) and angle \(\theta\). Define every symbol: \(r\ge 0\), \(\theta\) is the argument, \(j\) marks the vertical direction, and \(e^{j\theta}\) is Euler's compact rotation notation. Include the representative example \(2e^{j\pi/3}=2(\cos\pi/3+j\sin\pi/3)=1+j\sqrt3\). Exam trigger: use exponential form when multiplying, dividing, taking powers, or reading magnitude and phase. Common misuse: do not treat \(e^{j\theta}\) as a growing real exponential; its magnitude is 1.

### Block 5: `math_block`
- **latex**: \text{(B.5)}\quad a=r\cos\theta,\qquad b=r\sin\theta,\qquad r=\sqrt{a^2+b^2},\qquad \theta=\tan^{-1}\!\left(\frac{b}{a}\right)\ \text{with quadrant correction}
- **explanation_instruction**: Start this concept page with the heading '## 3. Conversion and the quadrant check'. Explain in 120–160 words that \(r\) is always nonnegative distance from the origin, while \(\theta\) must match the quadrant of \((a,b)\). Include the representative worked example \(z=-2-j3\): \(r=\sqrt{13}\); the calculator value from \(\tan^{-1}(3/2)\) points to the wrong quadrant, so the principal angle is \(-123.7^\circ\), giving \(z=\sqrt{13}e^{-j123.7^\circ}\). Add a quick check: negative real and negative imaginary parts mean quadrant III, so a first-quadrant angle cannot be correct. Common misuse: using \(\tan^{-1}(b/a)\) without drawing or checking signs.

### Block 6: `book_image`
- **source_page**: page-009
- **fig_id**: unknown
- **caption_instruction**: One sentence: these Argand diagrams show how quadrant position determines the correct polar angle.
- **description_instruction**: Describe the four plotted examples \(2+j3\), \(-2+j1\), \(-2-j3\), and \(1-j3\). Emphasize that each vector's length is the magnitude and its direction is the argument measured from the positive real axis. Tell students to use the diagrams to see why the calculator tangent angle must be adjusted in quadrants II and III.
- **teaching_role**: trap_exposure
- **mode_specific_visual_use**:
```json
{
  "cram": "Use the four diagrams as a fast sign-to-quadrant checklist.",
  "standard": "Use the diagrams to connect each conversion example to magnitude and angle.",
  "top_score": "Use the principal-angle choices to compare equivalent coterminal answers."
}
```

### Block 7: `math_block`
- **latex**: \text{(B.6)}\quad z^*=a-jb=re^{-j\theta}\\[4pt]\operatorname{Re}z=\frac{z+z^*}{2},\qquad \text{(B.8)}\quad \operatorname{Im}z=\frac{z-z^*}{2j}\\[4pt]\text{(B.9)}\quad zz^*=|z|^2
- **explanation_instruction**: Start this concept page with the heading '## 4. Conjugate: flip the vertical part'. Explain in 110–150 words that the conjugate changes \(j\) to \(-j\), which reflects the point across the real axis and changes the sign of the angle. Define \(z^*\), \(|z|\), and why \(zz^*\) becomes real. Include the representative example \(z=3+j4\): \(z^*=3-j4\), \(zz^*=25\), \(\operatorname{Re}z=(z+z^*)/2=3\), \(\operatorname{Im}z=(z-z^*)/(2j)=4\). Exam trigger: use the conjugate to remove a complex denominator. Common misuse: flipping both real and imaginary signs instead of only the imaginary sign.

### Block 8: `math_block`
- **latex**: z_1=a_1+jb_1,\quad z_2=a_2+jb_2\\[2pt]z_1\pm z_2=(a_1\pm a_2)+j(b_1\pm b_2)\\[6pt]z_1=r_1e^{j\theta_1},\quad z_2=r_2e^{j\theta_2}\\[2pt]z_1z_2=r_1r_2e^{j(\theta_1+\theta_2)},\qquad \frac{z_1}{z_2}=\frac{r_1}{r_2}e^{j(\theta_1-\theta_2)}
- **explanation_instruction**: Start this concept page with the heading '## 5. Arithmetic: choose the form that makes the operation easy'. Explain in 120–160 words that addition and subtraction are easiest in rectangular form because coordinates combine directly, while multiplication and division are easiest in polar form because magnitudes multiply or divide and angles add or subtract. Include one representative worked example: if \(z_1=2e^{j\pi/4}\) and \(z_2=4e^{j2\pi/3}\), then \(z_1/z_2=\frac12 e^{j(\pi/4-2\pi/3)}=\frac12 e^{-j5\pi/12}\). Add exam note: if the problem says product, quotient, reciprocal, or power, consider polar form first. Common misuse: multiplying real parts together and imaginary parts together as if complex numbers were coordinate pairs.

### Block 9: `math_block`
- **latex**: z=re^{j\theta}\\[2pt]\frac{1}{z}=\frac{1}{r}e^{-j\theta},\qquad z^n=r^ne^{jn\theta}\\[4pt]z^{1/n}=r^{1/n}e^{j(\theta+2\pi k)/n},\quad k=0,1,\ldots,n-1\\[6pt]\ln z=\ln r+j(\theta+2\pi k),\quad k\in\mathbb{Z}
- **explanation_instruction**: Start this concept page with the heading '## 6. Reciprocals, powers, roots, and logarithms'. Explain in 120–160 words that powers and reciprocals are angle operations in polar form: reciprocals invert magnitude and negate angle, powers raise magnitude and multiply angle, and roots split the angle into multiple equally spaced answers. Include the representative examples \((2e^{j\pi/6})^3=8e^{j\pi/2}=j8\) and \(1/(4e^{-j\pi/3})=\frac14e^{j\pi/3}\). Explain that complex logarithms are multi-valued because angles can differ by \(2\pi k\). Exam trigger: roots or logarithms usually require listing multiple angle branches. Common misuse: giving only one root when the problem asks for all roots.

### Block 10: `section_summary`
- **instruction**: Create the recap page titled '📌 Key Takeaways'. Use compact bullets, but include the core formulas explicitly. Include: rectangular form \(z=a+jb\), polar bridge \(z=r(\cos\theta+j\sin\theta)=re^{j\theta}\), Euler formula \(e^{j\theta}=\cos\theta+j\sin\theta\), conversion rules \(a=r\cos\theta\), \(b=r\sin\theta\), \(r=\sqrt{a^2+b^2}\), quadrant-corrected \(\theta\), conjugate rules \(z^*=a-jb\), \(zz^*=|z|^2\), arithmetic rules \(z_1z_2=r_1r_2e^{j(\theta_1+\theta_2)}\), \(z_1/z_2=(r_1/r_2)e^{j(\theta_1-\theta_2)}\), power/root/log formulas. End with one bridge sentence: 'Next, these complex-number tools will support sinusoid and phasor calculations.'

### Block 11: `quiz_plan`
- **target_questions**:
```json
9
```
- **question_range**:
```json
{
  "min": 7,
  "max": 10
}
```
- **knowledge_points**:
```json
[
  {
    "id": "rectangular_form_parts",
    "label": "Rectangular form and real/imaginary parts",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp1_q1",
        "type": "multiple_choice",
        "stem": "For \\(z=5-j7\\), which statement is correct?",
        "options": [
          "A. \\(\\operatorname{Re}z=5\\) and \\(\\operatorname{Im}z=-7\\)",
          "B. \\(\\operatorname{Re}z=5\\) and \\(\\operatorname{Im}z=-j7\\)",
          "C. \\(\\operatorname{Re}z=-7\\) and \\(\\operatorname{Im}z=5\\)",
          "D. \\(\\operatorname{Re}z=5-j7\\) and \\(\\operatorname{Im}z=j\\)"
        ],
        "correct_option": "A",
        "explanation": "The imaginary part is the real coefficient of \\(j\\), so it is \\(-7\\), not \\(-j7\\).",
        "wrong_option_explanations": {
          "B": "\\(-j7\\) is the imaginary term, not the imaginary part.",
          "C": "This swaps the coordinate roles.",
          "D": "The real part is a real number, not the whole complex expression."
        },
        "hint": "Separate the coefficient from the symbol \\(j\\).",
        "needs_visual": false,
        "same_point_variant": true
      },
      {
        "id": "kp1_q2",
        "type": "short_answer",
        "stem": "A classmate says the imaginary part of \\(z=3+j4\\) is \\(j4\\). Explain precisely why that wording is wrong.",
        "ideal_answer": "The imaginary part is the real coefficient of \\(j\\), so \\(\\operatorname{Im}z=4\\). The term \\(j4\\) is the imaginary term in the expression.",
        "grading_rubric": [
          "States \\(\\operatorname{Im}z=4\\)",
          "Distinguishes imaginary part from imaginary term",
          "Does not include \\(j\\) in the value of the imaginary part"
        ],
        "explanation": "This checks whether the student understands the definition, not just the notation.",
        "hint": "Ask what number multiplies \\(j\\).",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "polar_exponential_conversion",
    "label": "Polar/exponential form and Euler conversion",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp2_q1",
        "type": "multiple_choice",
        "stem": "Which Cartesian form equals \\(2e^{j\\pi/3}\\)?",
        "options": [
          "A. \\(1+j\\sqrt3\\)",
          "B. \\(\\sqrt3+j\\)",
          "C. \\(1-j\\sqrt3\\)",
          "D. \\(2+j\\pi/3\\)"
        ],
        "correct_option": "A",
        "explanation": "Use \\(re^{j\\theta}=r(\\cos\\theta+j\\sin\\theta)\\). Since \\(\\cos\\pi/3=1/2\\) and \\(\\sin\\pi/3=\\sqrt3/2\\), the result is \\(1+j\\sqrt3\\).",
        "wrong_option_explanations": {
          "B": "This swaps cosine and sine values.",
          "C": "The angle \\(\\pi/3\\) has positive sine, so the imaginary part is positive.",
          "D": "Exponential form is not converted by copying the angle as an imaginary coordinate."
        },
        "hint": "Use Euler's formula first.",
        "needs_visual": true,
        "visual_type": "complex_plane_angle_reference",
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "quadrant_angle_trap",
    "label": "Magnitude, angle, and quadrant correction",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp3_q1",
        "type": "multiple_choice",
        "stem": "What is the best principal-angle polar form of \\(-2-j3\\)?",
        "options": [
          "A. \\(\\sqrt{13}e^{j56.3^\\circ}\\)",
          "B. \\(\\sqrt{13}e^{-j123.7^\\circ}\\)",
          "C. \\(13e^{-j123.7^\\circ}\\)",
          "D. \\(\\sqrt5e^{j236.3^\\circ}\\)"
        ],
        "correct_option": "B",
        "explanation": "The magnitude is \\(\\sqrt{(-2)^2+(-3)^2}=\\sqrt{13}\\). The point is in quadrant III, so the principal angle is \\(-123.7^\\circ\\).",
        "wrong_option_explanations": {
          "A": "This is the calculator's first-quadrant tangent angle, not the quadrant III angle.",
          "C": "The magnitude should be \\(\\sqrt{13}\\), not \\(13\\).",
          "D": "The magnitude \\(\\sqrt5\\) is wrong, although \\(236.3^\\circ\\) is coterminal with \\(-123.7^\\circ\\)."
        },
        "hint": "Check the signs before trusting \\(\\tan^{-1}\\).",
        "needs_visual": true,
        "visual_type": "wrong_quadrant_argand_diagram",
        "same_point_variant": true
      },
      {
        "id": "kp3_q2",
        "type": "multiple_choice",
        "stem": "A calculator gives \\(\\tan^{-1}((-3)/(-2))=56.3^\\circ\\). Why is this not the principal angle of \\(-2-j3\\)?",
        "options": [
          "A. Because \\(-2-j3\\) lies in quadrant III, not quadrant I",
          "B. Because magnitude must be negative in quadrant III",
          "C. Because tangent cannot be used for complex numbers",
          "D. Because the imaginary part should be treated as \\(+3\\)"
        ],
        "correct_option": "A",
        "explanation": "The tangent ratio alone does not identify the quadrant. Both real and imaginary parts are negative, so the point lies in quadrant III.",
        "wrong_option_explanations": {
          "B": "Magnitude is always nonnegative.",
          "C": "Tangent can help, but it must be paired with quadrant information.",
          "D": "The imaginary part is \\(-3\\), not \\(+3\\)."
        },
        "hint": "Draw or imagine the point \\((-2,-3)\\).",
        "needs_visual": true,
        "visual_type": "visual_pattern_recognition_check",
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "conjugate_rules",
    "label": "Conjugate, real/imag extraction, and \\(zz^*\\)",
    "importance": "high",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp4_q1",
        "type": "multiple_choice",
        "stem": "If \\(z=3+j4\\), what is \\(zz^*\\)?",
        "options": [
          "A. \\(25\\)",
          "B. \\(3-j4\\)",
          "C. \\(-7\\)",
          "D. \\(9-j16\\)"
        ],
        "correct_option": "A",
        "explanation": "\\(z^*=3-j4\\), so \\(zz^*=|z|^2=3^2+4^2=25\\).",
        "wrong_option_explanations": {
          "B": "That is the conjugate, not the product with the conjugate.",
          "C": "This incorrectly subtracts squared components.",
          "D": "This treats multiplication termwise and ignores cross terms."
        },
        "hint": "Use \\(zz^*=|z|^2\\).",
        "needs_visual": true,
        "visual_type": "conjugate_reflection_check",
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "complex_arithmetic_form_choice",
    "label": "Choosing rectangular or polar form for arithmetic",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp5_q1",
        "type": "multiple_choice",
        "stem": "Let \\(z_1=2e^{j\\pi/4}\\) and \\(z_2=4e^{j2\\pi/3}\\). What is \\(z_1/z_2\\)?",
        "options": [
          "A. \\(\\frac12 e^{-j5\\pi/12}\\)",
          "B. \\(\\frac12 e^{j11\\pi/12}\\)",
          "C. \\(8e^{j11\\pi/12}\\)",
          "D. \\(\\frac12 e^{j5\\pi/12}\\)"
        ],
        "correct_option": "A",
        "explanation": "For division in polar form, divide magnitudes and subtract angles: \\(2/4=1/2\\), and \\(\\pi/4-2\\pi/3=-5\\pi/12\\).",
        "wrong_option_explanations": {
          "B": "This adds the angles instead of subtracting them.",
          "C": "This multiplies magnitudes and adds angles.",
          "D": "This has the wrong sign for the angle difference."
        },
        "hint": "Division means angle of numerator minus angle of denominator.",
        "needs_visual": false,
        "same_point_variant": true
      },
      {
        "id": "kp5_q2",
        "type": "multiple_choice",
        "stem": "Which operation is usually easiest in rectangular form rather than polar form?",
        "options": [
          "A. \\((3+j4)+(2-j5)\\)",
          "B. \\((2e^{j\\pi/3})(5e^{-j\\pi/6})\\)",
          "C. \\((4e^{j\\pi/2})^3\\)",
          "D. \\((6e^{j\\pi/4})/(2e^{-j\\pi/4})\\)"
        ],
        "correct_option": "A",
        "explanation": "Addition and subtraction combine real parts with real parts and imaginary parts with imaginary parts, so rectangular form is efficient.",
        "wrong_option_explanations": {
          "B": "Multiplication is very efficient in polar form.",
          "C": "Powers are efficient in polar form.",
          "D": "Division is efficient in polar form."
        },
        "hint": "Ask whether the operation combines coordinates or combines magnitudes and angles.",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "powers_roots_logs",
    "label": "Reciprocals, powers, roots, and logarithms",
    "importance": "medium",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp6_q1",
        "type": "multiple_choice",
        "stem": "Which expression equals \\((2e^{j\\pi/6})^3\\)?",
        "options": [
          "A. \\(8e^{j\\pi/2}\\)",
          "B. \\(6e^{j\\pi/18}\\)",
          "C. \\(8e^{j\\pi/18}\\)",
          "D. \\(2e^{j\\pi/2}\\)"
        ],
        "correct_option": "A",
        "explanation": "Raise the magnitude to the third power and multiply the angle by 3: \\(2^3=8\\), \\(3(\\pi/6)=\\pi/2\\).",
        "wrong_option_explanations": {
          "B": "This multiplies the magnitude by 3 and divides the angle.",
          "C": "The angle should be multiplied by 3, not divided.",
          "D": "The magnitude also needs to be cubed."
        },
        "hint": "Use \\((re^{j\\theta})^n=r^ne^{jn\\theta}\\).",
        "needs_visual": false,
        "same_point_variant": false
      },
      {
        "id": "kp6_q2",
        "type": "multiple_choice",
        "stem": "Why is \\(\\ln z\\) multi-valued for a nonzero complex number \\(z=re^{j\\theta}\\)?",
        "options": [
          "A. Because \\(\\theta\\) and \\(\\theta+2\\pi k\\) represent the same point",
          "B. Because \\(r\\) can be positive or negative",
          "C. Because \\(j\\) changes value in different quadrants",
          "D. Because \\(\\ln r\\) is never real"
        ],
        "correct_option": "A",
        "explanation": "Complex angles are not unique; adding any integer multiple of \\(2\\pi\\) gives the same point, so \\(\\ln z=\\ln r+j(\\theta+2\\pi k)\\).",
        "wrong_option_explanations": {
          "B": "In polar form, \\(r\\) is normally taken nonnegative.",
          "C": "\\(j\\) is fixed; it does not change value.",
          "D": "\\(\\ln r\\) is real for \\(r>0\\)."
        },
        "hint": "Think about full rotations on the complex plane.",
        "needs_visual": true,
        "visual_type": "coterminal_angle_circle_check",
        "same_point_variant": false
      }
    ]
  }
]
```

## Raw JSON

```json
{
  "section_id": "B.1-2",
  "section_title": "Algebra of Complex Numbers",
  "difficulty": "intermediate",
  "estimated_read_minutes": 12,
  "learning_objectives": [
    "Read a complex number in rectangular, polar, and exponential form.",
    "Convert between rectangular and polar form while avoiding quadrant errors.",
    "Use conjugates to extract real and imaginary parts and simplify products or quotients.",
    "Choose the efficient form for addition, multiplication, division, powers, roots, and logarithms.",
    "Extract magnitude and phase from complex-valued expressions."
  ],
  "visualization_need": {
    "level": "static",
    "reason": [
      "complex_plane_geometry_is_core",
      "pattern_recognition_benefits_from_figure",
      "wikipedia_has_standard_reference_visual_but_textbook_has_more_section_aligned_figures",
      "misconception_needs_visual_correction",
      "wrong_quadrant_angle_is_high_value_exam_trap"
    ],
    "recommended_assets": [
      "textbook_figure",
      "latex_native_visual",
      "wiki_figure"
    ]
  },
  "visual_plan": {
    "primary_anchor": "both",
    "rationale": "Use the textbook complex-plane figures as the visual anchors because they exactly match the section notation: rectangular coordinates, magnitude, angle, conjugate reflection, and quadrant examples. Use LaTeX-native formula blocks for algebra rules because students need exact symbolic structure more than decorative visuals. Do not use GPTImage2 because ready-made textbook figures and symbolic formulas accurately demonstrate the key ideas.",
    "cram": "Use figures to identify quadrant, sign, magnitude, and angle quickly before computing.",
    "standard": "Use each visual beside one representative example so the student connects the formula to the complex plane.",
    "top_score": "Use visuals to catch subtle traps: principal angle, conjugate reflection, coterminal angles, and argument addition or subtraction."
  },
  "blocks": [
    {
      "type": "text_explanation",
      "instruction": "Create a minimal overview page only. Use the heading 'Section Objective' followed by one short sentence: 'Learn how to represent, convert, and compute with complex numbers efficiently.' Then add the heading 'Concepts In This Section' and list only these concept names as bullets: rectangular form, polar and exponential form, Euler bridge, magnitude and angle, conjugate, complex arithmetic, powers and roots, complex logarithms, magnitude and phase of functions. Do not add expanded background paragraphs."
    },
    {
      "type": "math_block",
      "latex": "\\text{(B.1)}\\quad z=a+jb,\\qquad \\operatorname{Re}z=a,\\qquad \\operatorname{Im}z=b",
      "explanation_instruction": "Start this concept page with the heading '## 1. Rectangular form: read the coordinates'. Explain in 90–130 words that \\(a\\) is the horizontal real coordinate and \\(b\\) is the vertical-axis coefficient of \\(j\\). State that \\(\\operatorname{Im}z\\) is \\(b\\), not \\(jb\\). Include the representative example \\(z=3-j4\\): \\(\\operatorname{Re}z=3\\), \\(\\operatorname{Im}z=-4\\), point \\((3,-4)\\). Add one exam note: if a problem asks for real and imaginary parts, report real numbers, not terms containing \\(j\\)."
    },
    {
      "type": "book_image",
      "source_page": "page-005",
      "fig_id": "Fig. B.2",
      "caption_instruction": "One sentence: this figure shows \\(z=a+jb\\) as a point in the complex plane, with magnitude, angle, and conjugate reflection.",
      "description_instruction": "Describe the horizontal Real axis and vertical Imaginary axis. Point out that \\(z\\) is located at \\((a,b)\\), its distance from the origin is \\(r\\), its angle from the positive real axis is \\(\\theta\\), and \\(z^*\\) is reflected across the real axis. Tell students to notice that the conjugate keeps the same real part and flips the sign of the imaginary part.",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the figure to instantly map signs of \\(a\\) and \\(b\\) to quadrant position.",
        "standard": "Use the figure while reading \\(z=a+jb\\), \\(r\\), \\(\\theta\\), and \\(z^*\\).",
        "top_score": "Use the reflection to distinguish imaginary part, imaginary term, and conjugate."
      }
    },
    {
      "type": "math_block",
      "latex": "\\text{(B.2)}\\quad z=a+jb=r(\\cos\\theta+j\\sin\\theta)\\\\[4pt]\\text{(B.3)}\\quad e^{j\\theta}=\\cos\\theta+j\\sin\\theta\\\\[4pt]\\text{(B.4)}\\quad z=re^{j\\theta}",
      "explanation_instruction": "Start this concept page with the heading '## 2. Polar and exponential form: distance plus direction'. Explain in 110–150 words that rectangular form gives coordinates, while polar/exponential form gives magnitude \\(r\\) and angle \\(\\theta\\). Define every symbol: \\(r\\ge 0\\), \\(\\theta\\) is the argument, \\(j\\) marks the vertical direction, and \\(e^{j\\theta}\\) is Euler's compact rotation notation. Include the representative example \\(2e^{j\\pi/3}=2(\\cos\\pi/3+j\\sin\\pi/3)=1+j\\sqrt3\\). Exam trigger: use exponential form when multiplying, dividing, taking powers, or reading magnitude and phase. Common misuse: do not treat \\(e^{j\\theta}\\) as a growing real exponential; its magnitude is 1."
    },
    {
      "type": "math_block",
      "latex": "\\text{(B.5)}\\quad a=r\\cos\\theta,\\qquad b=r\\sin\\theta,\\qquad r=\\sqrt{a^2+b^2},\\qquad \\theta=\\tan^{-1}\\!\\left(\\frac{b}{a}\\right)\\ \\text{with quadrant correction}",
      "explanation_instruction": "Start this concept page with the heading '## 3. Conversion and the quadrant check'. Explain in 120–160 words that \\(r\\) is always nonnegative distance from the origin, while \\(\\theta\\) must match the quadrant of \\((a,b)\\). Include the representative worked example \\(z=-2-j3\\): \\(r=\\sqrt{13}\\); the calculator value from \\(\\tan^{-1}(3/2)\\) points to the wrong quadrant, so the principal angle is \\(-123.7^\\circ\\), giving \\(z=\\sqrt{13}e^{-j123.7^\\circ}\\). Add a quick check: negative real and negative imaginary parts mean quadrant III, so a first-quadrant angle cannot be correct. Common misuse: using \\(\\tan^{-1}(b/a)\\) without drawing or checking signs."
    },
    {
      "type": "book_image",
      "source_page": "page-009",
      "fig_id": "unknown",
      "caption_instruction": "One sentence: these Argand diagrams show how quadrant position determines the correct polar angle.",
      "description_instruction": "Describe the four plotted examples \\(2+j3\\), \\(-2+j1\\), \\(-2-j3\\), and \\(1-j3\\). Emphasize that each vector's length is the magnitude and its direction is the argument measured from the positive real axis. Tell students to use the diagrams to see why the calculator tangent angle must be adjusted in quadrants II and III.",
      "teaching_role": "trap_exposure",
      "mode_specific_visual_use": {
        "cram": "Use the four diagrams as a fast sign-to-quadrant checklist.",
        "standard": "Use the diagrams to connect each conversion example to magnitude and angle.",
        "top_score": "Use the principal-angle choices to compare equivalent coterminal answers."
      }
    },
    {
      "type": "math_block",
      "latex": "\\text{(B.6)}\\quad z^*=a-jb=re^{-j\\theta}\\\\[4pt]\\operatorname{Re}z=\\frac{z+z^*}{2},\\qquad \\text{(B.8)}\\quad \\operatorname{Im}z=\\frac{z-z^*}{2j}\\\\[4pt]\\text{(B.9)}\\quad zz^*=|z|^2",
      "explanation_instruction": "Start this concept page with the heading '## 4. Conjugate: flip the vertical part'. Explain in 110–150 words that the conjugate changes \\(j\\) to \\(-j\\), which reflects the point across the real axis and changes the sign of the angle. Define \\(z^*\\), \\(|z|\\), and why \\(zz^*\\) becomes real. Include the representative example \\(z=3+j4\\): \\(z^*=3-j4\\), \\(zz^*=25\\), \\(\\operatorname{Re}z=(z+z^*)/2=3\\), \\(\\operatorname{Im}z=(z-z^*)/(2j)=4\\). Exam trigger: use the conjugate to remove a complex denominator. Common misuse: flipping both real and imaginary signs instead of only the imaginary sign."
    },
    {
      "type": "math_block",
      "latex": "z_1=a_1+jb_1,\\quad z_2=a_2+jb_2\\\\[2pt]z_1\\pm z_2=(a_1\\pm a_2)+j(b_1\\pm b_2)\\\\[6pt]z_1=r_1e^{j\\theta_1},\\quad z_2=r_2e^{j\\theta_2}\\\\[2pt]z_1z_2=r_1r_2e^{j(\\theta_1+\\theta_2)},\\qquad \\frac{z_1}{z_2}=\\frac{r_1}{r_2}e^{j(\\theta_1-\\theta_2)}",
      "explanation_instruction": "Start this concept page with the heading '## 5. Arithmetic: choose the form that makes the operation easy'. Explain in 120–160 words that addition and subtraction are easiest in rectangular form because coordinates combine directly, while multiplication and division are easiest in polar form because magnitudes multiply or divide and angles add or subtract. Include one representative worked example: if \\(z_1=2e^{j\\pi/4}\\) and \\(z_2=4e^{j2\\pi/3}\\), then \\(z_1/z_2=\\frac12 e^{j(\\pi/4-2\\pi/3)}=\\frac12 e^{-j5\\pi/12}\\). Add exam note: if the problem says product, quotient, reciprocal, or power, consider polar form first. Common misuse: multiplying real parts together and imaginary parts together as if complex numbers were coordinate pairs."
    },
    {
      "type": "math_block",
      "latex": "z=re^{j\\theta}\\\\[2pt]\\frac{1}{z}=\\frac{1}{r}e^{-j\\theta},\\qquad z^n=r^ne^{jn\\theta}\\\\[4pt]z^{1/n}=r^{1/n}e^{j(\\theta+2\\pi k)/n},\\quad k=0,1,\\ldots,n-1\\\\[6pt]\\ln z=\\ln r+j(\\theta+2\\pi k),\\quad k\\in\\mathbb{Z}",
      "explanation_instruction": "Start this concept page with the heading '## 6. Reciprocals, powers, roots, and logarithms'. Explain in 120–160 words that powers and reciprocals are angle operations in polar form: reciprocals invert magnitude and negate angle, powers raise magnitude and multiply angle, and roots split the angle into multiple equally spaced answers. Include the representative examples \\((2e^{j\\pi/6})^3=8e^{j\\pi/2}=j8\\) and \\(1/(4e^{-j\\pi/3})=\\frac14e^{j\\pi/3}\\). Explain that complex logarithms are multi-valued because angles can differ by \\(2\\pi k\\). Exam trigger: roots or logarithms usually require listing multiple angle branches. Common misuse: giving only one root when the problem asks for all roots."
    },
    {
      "type": "section_summary",
      "instruction": "Create the recap page titled '📌 Key Takeaways'. Use compact bullets, but include the core formulas explicitly. Include: rectangular form \\(z=a+jb\\), polar bridge \\(z=r(\\cos\\theta+j\\sin\\theta)=re^{j\\theta}\\), Euler formula \\(e^{j\\theta}=\\cos\\theta+j\\sin\\theta\\), conversion rules \\(a=r\\cos\\theta\\), \\(b=r\\sin\\theta\\), \\(r=\\sqrt{a^2+b^2}\\), quadrant-corrected \\(\\theta\\), conjugate rules \\(z^*=a-jb\\), \\(zz^*=|z|^2\\), arithmetic rules \\(z_1z_2=r_1r_2e^{j(\\theta_1+\\theta_2)}\\), \\(z_1/z_2=(r_1/r_2)e^{j(\\theta_1-\\theta_2)}\\), power/root/log formulas. End with one bridge sentence: 'Next, these complex-number tools will support sinusoid and phasor calculations.'"
    },
    {
      "type": "quiz_plan",
      "target_questions": 9,
      "question_range": {
        "min": 7,
        "max": 10
      },
      "knowledge_points": [
        {
          "id": "rectangular_form_parts",
          "label": "Rectangular form and real/imaginary parts",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "For \\(z=5-j7\\), which statement is correct?",
              "options": [
                "A. \\(\\operatorname{Re}z=5\\) and \\(\\operatorname{Im}z=-7\\)",
                "B. \\(\\operatorname{Re}z=5\\) and \\(\\operatorname{Im}z=-j7\\)",
                "C. \\(\\operatorname{Re}z=-7\\) and \\(\\operatorname{Im}z=5\\)",
                "D. \\(\\operatorname{Re}z=5-j7\\) and \\(\\operatorname{Im}z=j\\)"
              ],
              "correct_option": "A",
              "explanation": "The imaginary part is the real coefficient of \\(j\\), so it is \\(-7\\), not \\(-j7\\).",
              "wrong_option_explanations": {
                "B": "\\(-j7\\) is the imaginary term, not the imaginary part.",
                "C": "This swaps the coordinate roles.",
                "D": "The real part is a real number, not the whole complex expression."
              },
              "hint": "Separate the coefficient from the symbol \\(j\\).",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "short_answer",
              "stem": "A classmate says the imaginary part of \\(z=3+j4\\) is \\(j4\\). Explain precisely why that wording is wrong.",
              "ideal_answer": "The imaginary part is the real coefficient of \\(j\\), so \\(\\operatorname{Im}z=4\\). The term \\(j4\\) is the imaginary term in the expression.",
              "grading_rubric": [
                "States \\(\\operatorname{Im}z=4\\)",
                "Distinguishes imaginary part from imaginary term",
                "Does not include \\(j\\) in the value of the imaginary part"
              ],
              "explanation": "This checks whether the student understands the definition, not just the notation.",
              "hint": "Ask what number multiplies \\(j\\).",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "polar_exponential_conversion",
          "label": "Polar/exponential form and Euler conversion",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "Which Cartesian form equals \\(2e^{j\\pi/3}\\)?",
              "options": [
                "A. \\(1+j\\sqrt3\\)",
                "B. \\(\\sqrt3+j\\)",
                "C. \\(1-j\\sqrt3\\)",
                "D. \\(2+j\\pi/3\\)"
              ],
              "correct_option": "A",
              "explanation": "Use \\(re^{j\\theta}=r(\\cos\\theta+j\\sin\\theta)\\). Since \\(\\cos\\pi/3=1/2\\) and \\(\\sin\\pi/3=\\sqrt3/2\\), the result is \\(1+j\\sqrt3\\).",
              "wrong_option_explanations": {
                "B": "This swaps cosine and sine values.",
                "C": "The angle \\(\\pi/3\\) has positive sine, so the imaginary part is positive.",
                "D": "Exponential form is not converted by copying the angle as an imaginary coordinate."
              },
              "hint": "Use Euler's formula first.",
              "needs_visual": true,
              "visual_type": "complex_plane_angle_reference",
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "quadrant_angle_trap",
          "label": "Magnitude, angle, and quadrant correction",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "What is the best principal-angle polar form of \\(-2-j3\\)?",
              "options": [
                "A. \\(\\sqrt{13}e^{j56.3^\\circ}\\)",
                "B. \\(\\sqrt{13}e^{-j123.7^\\circ}\\)",
                "C. \\(13e^{-j123.7^\\circ}\\)",
                "D. \\(\\sqrt5e^{j236.3^\\circ}\\)"
              ],
              "correct_option": "B",
              "explanation": "The magnitude is \\(\\sqrt{(-2)^2+(-3)^2}=\\sqrt{13}\\). The point is in quadrant III, so the principal angle is \\(-123.7^\\circ\\).",
              "wrong_option_explanations": {
                "A": "This is the calculator's first-quadrant tangent angle, not the quadrant III angle.",
                "C": "The magnitude should be \\(\\sqrt{13}\\), not \\(13\\).",
                "D": "The magnitude \\(\\sqrt5\\) is wrong, although \\(236.3^\\circ\\) is coterminal with \\(-123.7^\\circ\\)."
              },
              "hint": "Check the signs before trusting \\(\\tan^{-1}\\).",
              "needs_visual": true,
              "visual_type": "wrong_quadrant_argand_diagram",
              "same_point_variant": true
            },
            {
              "id": "kp3_q2",
              "type": "multiple_choice",
              "stem": "A calculator gives \\(\\tan^{-1}((-3)/(-2))=56.3^\\circ\\). Why is this not the principal angle of \\(-2-j3\\)?",
              "options": [
                "A. Because \\(-2-j3\\) lies in quadrant III, not quadrant I",
                "B. Because magnitude must be negative in quadrant III",
                "C. Because tangent cannot be used for complex numbers",
                "D. Because the imaginary part should be treated as \\(+3\\)"
              ],
              "correct_option": "A",
              "explanation": "The tangent ratio alone does not identify the quadrant. Both real and imaginary parts are negative, so the point lies in quadrant III.",
              "wrong_option_explanations": {
                "B": "Magnitude is always nonnegative.",
                "C": "Tangent can help, but it must be paired with quadrant information.",
                "D": "The imaginary part is \\(-3\\), not \\(+3\\)."
              },
              "hint": "Draw or imagine the point \\((-2,-3)\\).",
              "needs_visual": true,
              "visual_type": "visual_pattern_recognition_check",
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "conjugate_rules",
          "label": "Conjugate, real/imag extraction, and \\(zz^*\\)",
          "importance": "high",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp4_q1",
              "type": "multiple_choice",
              "stem": "If \\(z=3+j4\\), what is \\(zz^*\\)?",
              "options": [
                "A. \\(25\\)",
                "B. \\(3-j4\\)",
                "C. \\(-7\\)",
                "D. \\(9-j16\\)"
              ],
              "correct_option": "A",
              "explanation": "\\(z^*=3-j4\\), so \\(zz^*=|z|^2=3^2+4^2=25\\).",
              "wrong_option_explanations": {
                "B": "That is the conjugate, not the product with the conjugate.",
                "C": "This incorrectly subtracts squared components.",
                "D": "This treats multiplication termwise and ignores cross terms."
              },
              "hint": "Use \\(zz^*=|z|^2\\).",
              "needs_visual": true,
              "visual_type": "conjugate_reflection_check",
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "complex_arithmetic_form_choice",
          "label": "Choosing rectangular or polar form for arithmetic",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp5_q1",
              "type": "multiple_choice",
              "stem": "Let \\(z_1=2e^{j\\pi/4}\\) and \\(z_2=4e^{j2\\pi/3}\\). What is \\(z_1/z_2\\)?",
              "options": [
                "A. \\(\\frac12 e^{-j5\\pi/12}\\)",
                "B. \\(\\frac12 e^{j11\\pi/12}\\)",
                "C. \\(8e^{j11\\pi/12}\\)",
                "D. \\(\\frac12 e^{j5\\pi/12}\\)"
              ],
              "correct_option": "A",
              "explanation": "For division in polar form, divide magnitudes and subtract angles: \\(2/4=1/2\\), and \\(\\pi/4-2\\pi/3=-5\\pi/12\\).",
              "wrong_option_explanations": {
                "B": "This adds the angles instead of subtracting them.",
                "C": "This multiplies magnitudes and adds angles.",
                "D": "This has the wrong sign for the angle difference."
              },
              "hint": "Division means angle of numerator minus angle of denominator.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp5_q2",
              "type": "multiple_choice",
              "stem": "Which operation is usually easiest in rectangular form rather than polar form?",
              "options": [
                "A. \\((3+j4)+(2-j5)\\)",
                "B. \\((2e^{j\\pi/3})(5e^{-j\\pi/6})\\)",
                "C. \\((4e^{j\\pi/2})^3\\)",
                "D. \\((6e^{j\\pi/4})/(2e^{-j\\pi/4})\\)"
              ],
              "correct_option": "A",
              "explanation": "Addition and subtraction combine real parts with real parts and imaginary parts with imaginary parts, so rectangular form is efficient.",
              "wrong_option_explanations": {
                "B": "Multiplication is very efficient in polar form.",
                "C": "Powers are efficient in polar form.",
                "D": "Division is efficient in polar form."
              },
              "hint": "Ask whether the operation combines coordinates or combines magnitudes and angles.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "powers_roots_logs",
          "label": "Reciprocals, powers, roots, and logarithms",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp6_q1",
              "type": "multiple_choice",
              "stem": "Which expression equals \\((2e^{j\\pi/6})^3\\)?",
              "options": [
                "A. \\(8e^{j\\pi/2}\\)",
                "B. \\(6e^{j\\pi/18}\\)",
                "C. \\(8e^{j\\pi/18}\\)",
                "D. \\(2e^{j\\pi/2}\\)"
              ],
              "correct_option": "A",
              "explanation": "Raise the magnitude to the third power and multiply the angle by 3: \\(2^3=8\\), \\(3(\\pi/6)=\\pi/2\\).",
              "wrong_option_explanations": {
                "B": "This multiplies the magnitude by 3 and divides the angle.",
                "C": "The angle should be multiplied by 3, not divided.",
                "D": "The magnitude also needs to be cubed."
              },
              "hint": "Use \\((re^{j\\theta})^n=r^ne^{jn\\theta}\\).",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp6_q2",
              "type": "multiple_choice",
              "stem": "Why is \\(\\ln z\\) multi-valued for a nonzero complex number \\(z=re^{j\\theta}\\)?",
              "options": [
                "A. Because \\(\\theta\\) and \\(\\theta+2\\pi k\\) represent the same point",
                "B. Because \\(r\\) can be positive or negative",
                "C. Because \\(j\\) changes value in different quadrants",
                "D. Because \\(\\ln r\\) is never real"
              ],
              "correct_option": "A",
              "explanation": "Complex angles are not unique; adding any integer multiple of \\(2\\pi\\) gives the same point, so \\(\\ln z=\\ln r+j(\\theta+2\\pi k)\\).",
              "wrong_option_explanations": {
                "B": "In polar form, \\(r\\) is normally taken nonnegative.",
                "C": "\\(j\\) is fixed; it does not change value.",
                "D": "\\(\\ln r\\) is real for \\(r>0\\)."
              },
              "hint": "Think about full rotations on the complex plane.",
              "needs_visual": true,
              "visual_type": "coterminal_angle_circle_check",
              "same_point_variant": false
            }
          ]
        }
      ]
    }
  ]
}
```
