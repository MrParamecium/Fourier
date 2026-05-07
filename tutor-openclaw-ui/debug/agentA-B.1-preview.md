# Agent A Preview: B.1 B.1 Complex Numbers

- Difficulty: intermediate
- Estimated read minutes: 16

## Learning Objectives

- Represent a complex number in rectangular, polar, and exponential form.
- Convert between rectangular and polar form while choosing the correct quadrant.
- Use conjugates to extract imaginary parts, magnitudes, and simplify division.
- Choose the efficient form for addition, subtraction, multiplication, division, powers, and roots.
- Interpret complex exponentials as magnitude-and-angle objects in the complex plane.

## Visualization Need

```json
{
  "level": "interactive",
  "reason": [
    "formula_to_phenomenon_gap",
    "depends_on_parameter_change",
    "student_should_manipulate_to_understand",
    "pattern_recognition_benefits_from_figure",
    "misconception_needs_visual_correction"
  ],
  "recommended_assets": [
    "textbook_figure",
    "react_canvas_demo",
    "latex_native_formula_visual"
  ]
}
```

## Visual Plan

```json
{
  "primary_anchor": "both",
  "rationale": "Use the textbook's complex-plane figures because they match the notation students will see in this section, then add one interactive complex-plane demo because rectangular-to-polar conversion is much easier to understand when the point moves and the values update together. Use LaTeX-native formula blocks for symbolic rules. Do not use generated images because the available textbook figures and formulas already cover the canonical visuals accurately.",
  "cram": "Use visuals to recognize quadrant, magnitude, angle, and conjugate patterns quickly.",
  "standard": "Use each visual beside one representative example so students connect formulas to points on the complex plane.",
  "top_score": "Use visuals to expose quadrant traps, coterminal angles, conjugate symmetry, and when polar form is more efficient than rectangular form."
}
```

## Planned Blocks

### Block 1: `text_explanation`
- **instruction**: Render Page 1 as a minimal overview only. Use the heading 'Section Objective' followed by one sentence: 'Learn how complex numbers are written, visualized, converted, and used in algebra for signals and systems.' Then add the heading 'Concepts In This Section' and list only these concept names as bullets: rectangular form, complex plane, Euler form, polar conversion, quadrant correction, conjugate, magnitude, polar arithmetic, complex exponential behavior. Do not add background history or expanded explanation on this page.

### Block 2: `math_block`
- **latex**: z = a + jb
- **explanation_instruction**: Start a new concept page with the heading '## 1. Rectangular form: real part plus vertical-axis part'. Explain in 90–130 words that a complex number is a two-coordinate object: \(a\) is the real-axis coordinate, \(b\) is the coefficient of \(j\), and \(j^2=-1\). State that engineers use \(j\) instead of \(i\) to avoid confusion with current. Include the minimal example \(z=3-4j\): real part \(3\), imaginary part \(-4\), point \((3,-4)\). Exam note: do not say the imaginary part is \(-4j\); the imaginary part is the coefficient \(-4\).

### Block 3: `book_image`
- **source_page**: page-005
- **fig_id**: Fig. B.2
- **teaching_role**: concept_anchor
- **mode_specific_visual_use**:
```json
{
  "cram": "Use the diagram to instantly identify real coordinate, imaginary coordinate, magnitude, angle, and conjugate reflection.",
  "standard": "Use the diagram directly after rectangular form to connect \\(a+jb\\) with a point and vector.",
  "top_score": "Use the diagram to stress that conjugates reflect across the real axis while preserving magnitude."
}
```
- **caption_instruction**: One sentence: Fig. B.2 shows \(z=a+jb\), its magnitude \(r\), angle \(\theta\), and conjugate \(z^*=a-jb\) on the complex plane.
- **description_instruction**: In 2–3 sentences, describe the horizontal Real axis, vertical Imaginary axis, the point \((a,b)\), the vector from the origin, the angle from the positive real axis, and the reflected point \((a,-b)\). Tell students to notice that changing the sign of the imaginary component reflects the point across the real axis.

### Block 4: `math_block`
- **latex**: e^{j\theta}=\cos\theta+j\sin\theta
- **explanation_instruction**: Start a new concept page with the heading '## 2. Euler's formula: turning angle into a complex number'. Explain in 100–150 words that Euler's formula connects exponential notation to cosine and sine coordinates on the complex plane. Define \(\theta\) as the angle from the positive real axis, \(\cos\theta\) as the horizontal coordinate on the unit circle, and \(\sin\theta\) as the vertical coordinate. Include the example \(e^{j\pi/2}=j\) because \(\cos(\pi/2)=0\) and \(\sin(\pi/2)=1\). Exam trigger: use this formula whenever a problem asks for polar/exponential form or asks to convert \(re^{j\theta}\) into \(a+jb\). Common misuse: forgetting the factor \(j\) before \(\sin\theta\).

### Block 5: `math_block`
- **latex**: z = re^{j\theta}
- **explanation_instruction**: Continue the same concept page, but keep this as its own standalone formula. Label it as 'Polar/exponential form, Eq. (B.4)'. Explain in 80–120 words that \(r\) is distance from the origin and \(\theta\) is direction. State that this is the same number as \(a+jb\), just described by distance and angle instead of horizontal and vertical coordinates. Include the example \(2e^{j\pi/3}=2(\cos\pi/3+j\sin\pi/3)=1+j\sqrt{3}\). Exam note: polar form is usually better for multiplication, division, powers, and roots; rectangular form is usually better for addition and subtraction.

### Block 6: `interactive_demo`
- **demo_type**: react_canvas_complex_plane
- **teaching_role**: concept_anchor
- **mode_specific_visual_use**:
```json
{
  "cram": "Drag the point into each quadrant and memorize how signs of \\(a\\), \\(b\\), and angle change.",
  "standard": "Use the demo after the polar formula to see rectangular and polar values update together.",
  "top_score": "Use coterminal-angle toggles to compare principal angle with equivalent angles differing by \\(2\\pi k\\)."
}
```
- **instruction**: Build an interactive complex-plane demo. Show Real and Imaginary axes, a draggable point \(z\), dashed projections to \(a\) and \(b\), a vector from the origin, and an angle arc \(\theta\). Display live values for \(a\), \(b\), \(r=\sqrt{a^2+b^2}\), \(\theta=\operatorname{atan2}(b,a)\), and \(z=a+jb=re^{j\theta}\). Include a checkbox 'show conjugate' that reflects the point across the real axis and labels \(z^*=a-jb\). Include a toggle between degrees and radians. Add one short prompt below the canvas: 'Drag the point into Quadrant II and notice why plain \(\tan^{-1}(b/a)\) can give the wrong angle.'

### Block 7: `math_block`
- **latex**: r=\sqrt{a^2+b^2}
- **explanation_instruction**: Start a new concept page with the heading '## 3. Rectangular to polar: distance first, angle second'. Explain in 90–130 words that \(r\) is the magnitude \(|z|\), found by the Pythagorean theorem from coordinates \((a,b)\). Then explain that the angle must be chosen from the quadrant of the point, not blindly from calculator output. Include the representative example \(z=-2-j3\): \(r=\sqrt{13}\), the point is in Quadrant III, so the principal angle is \(-123.7^\circ\), not \(56.3^\circ\). Exam trigger: whenever both signs are visible in \(a+jb\), sketch the quadrant before trusting \(\tan^{-1}(b/a)\). Common misuse: treating \(\tan^{-1}((-3)/(-2))\) as a Quadrant I angle.

### Block 8: `book_image`
- **source_page**: page-009
- **fig_id**: unknown
- **teaching_role**: trap_exposure
- **mode_specific_visual_use**:
```json
{
  "cram": "Use the four plotted examples to attach sign patterns to quadrants fast.",
  "standard": "Use the figure beside the \\(-2-j3\\) example to verify the corrected principal angle.",
  "top_score": "Use the figure to compare equivalent angle choices and why principal value is a convention."
}
```
- **caption_instruction**: One sentence: These Argand diagrams show Cartesian-to-polar conversion in all four quadrants and expose the calculator-angle trap.
- **description_instruction**: In 2–3 sentences, describe the four plotted complex numbers, their magnitudes, and their angles measured from the positive real axis. Tell students to notice that the signs of \(a\) and \(b\) determine the quadrant, and the quadrant determines whether the raw inverse tangent angle must be corrected.

### Block 9: `math_block`
- **latex**: \operatorname{Im} z = \frac{z-z^*}{2j}
- **explanation_instruction**: Start a new concept page with the heading '## 4. Conjugates: reflect, subtract, and simplify'. Label this formula as Eq. (B.8). Explain in 90–130 words that the conjugate \(z^*\) changes \(a+jb\) into \(a-jb\), so subtracting \(z^*\) from \(z\) cancels the real parts and leaves only the vertical-axis information. Include the example \(z=5+2j\): \(z^*=5-2j\), so \((z-z^*)/(2j)=4j/(2j)=2\). Exam trigger: use conjugates when a problem asks for imaginary part, magnitude squared, or division by a complex denominator. Common misuse: forgetting that \(\operatorname{Im}z\) is real-valued.

### Block 10: `math_block`
- **latex**: zz^*=|z|^2
- **explanation_instruction**: Continue the conjugate concept page, but keep this as its own standalone formula. Label it as Eq. (B.9). Explain in 80–110 words that multiplying a complex number by its conjugate removes the imaginary part and produces a real magnitude-squared value. Include the example \((3+4j)(3-4j)=9+16=25=|3+4j|^2\). Exam trigger: use this identity to rationalize denominators such as \(1/(2+3j)\). Common misuse: writing \(zz^*=|z|\) instead of \(|z|^2\).

### Block 11: `math_block`
- **latex**: z_1z_2=r_1r_2e^{j(\theta_1+\theta_2)}
- **explanation_instruction**: Start a new concept page with the heading '## 5. Arithmetic: choose the form that makes the operation easy'. Explain in 100–150 words that rectangular form is best for addition/subtraction because coordinates combine directly, while polar form is best for multiplication/division because magnitudes and angles combine cleanly. Teach the displayed multiplication rule: multiply magnitudes and add angles. Then state in prose that division divides magnitudes and subtracts angles. Include the representative example \((5e^{j53.1^\circ})(\sqrt{13}e^{j56.3^\circ})=5\sqrt{13}e^{j109.4^\circ}\). Exam note: if the problem says multiply, divide, power, or root, try polar first; if it says add or subtract, convert to rectangular first.

### Block 12: `section_summary`
- **instruction**: Create a recap page titled '📌 Key Takeaways'. Use concise bullets, but include the core formulas explicitly. Include these formulas exactly as review items: \(z=a+jb\); \(e^{j\theta}=\cos\theta+j\sin\theta\); \(z=re^{j\theta}\); \(r=\sqrt{a^2+b^2}\); \(\operatorname{Im}z=(z-z^*)/(2j)\); \(zz^*=|z|^2\); \(z_1z_2=r_1r_2e^{j(\theta_1+\theta_2)}\). Also include one bullet saying angle must match the quadrant, not just calculator output. Add one final bridge sentence: 'Next, these complex-number tools will support phasors, frequency response, and signals represented by exponentials.'

### Block 13: `quiz_plan`
- **target_questions**:
```json
8
```
- **question_range**:
```json
{
  "min": 7,
  "max": 9
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
        "stem": "For \\(z=7-5j\\), which statement is technically correct?",
        "options": [
          "A. The real part is \\(7\\), and the imaginary part is \\(-5\\).",
          "B. The real part is \\(7\\), and the imaginary part is \\(-5j\\).",
          "C. The real part is \\(-5\\), and the imaginary part is \\(7\\).",
          "D. The real part is \\(7j\\), and the imaginary part is \\(-5\\)."
        ],
        "correct_option": "A",
        "explanation": "In \\(a+jb\\), the imaginary part is the coefficient \\(b\\), not the whole term \\(jb\\).",
        "wrong_option_explanations": {
          "B": "\\(-5j\\) is the imaginary term, not the imaginary part.",
          "C": "This swaps the horizontal and vertical components.",
          "D": "The real part does not include \\(j\\)."
        },
        "hint": "Separate the coefficient from the symbol \\(j\\).",
        "needs_visual": false,
        "same_point_variant": true
      },
      {
        "id": "kp1_q2",
        "type": "multiple_choice",
        "stem": "On the complex plane, where is \\(z=-3+2j\\) located?",
        "options": [
          "A. Quadrant I",
          "B. Quadrant II",
          "C. Quadrant III",
          "D. Quadrant IV"
        ],
        "correct_option": "B",
        "explanation": "The real part is negative and the imaginary part is positive, so the point is left and up: Quadrant II.",
        "wrong_option_explanations": {
          "A": "Quadrant I requires both real and imaginary parts to be positive.",
          "C": "Quadrant III requires both parts to be negative.",
          "D": "Quadrant IV requires positive real part and negative imaginary part."
        },
        "hint": "Real part controls left/right; imaginary part controls up/down.",
        "needs_visual": true,
        "visual_type": "complex_plane_point",
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "euler_and_polar_form",
    "label": "Euler formula and polar/exponential form",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp2_q1",
        "type": "multiple_choice",
        "stem": "Which identity correctly converts exponential form into rectangular components?",
        "options": [
          "A. \\(e^{j\\theta}=\\sin\\theta+j\\cos\\theta\\)",
          "B. \\(e^{j\\theta}=\\cos\\theta+j\\sin\\theta\\)",
          "C. \\(e^{j\\theta}=j\\cos\\theta+\\sin\\theta\\)",
          "D. \\(e^{j\\theta}=\\cos\\theta- j\\sin\\theta\\)"
        ],
        "correct_option": "B",
        "explanation": "Euler's formula is \\(e^{j\\theta}=\\cos\\theta+j\\sin\\theta\\).",
        "wrong_option_explanations": {
          "A": "This swaps cosine and sine.",
          "C": "This attaches \\(j\\) to the cosine term instead of the sine term.",
          "D": "The minus sign belongs to \\(e^{-j\\theta}\\), not \\(e^{j\\theta}\\)."
        },
        "hint": "The real coordinate comes from cosine.",
        "needs_visual": false,
        "same_point_variant": false
      },
      {
        "id": "kp2_q2",
        "type": "multiple_choice",
        "stem": "Convert \\(2e^{j\\pi/2}\\) to rectangular form.",
        "options": [
          "A. \\(2\\)",
          "B. \\(-2\\)",
          "C. \\(2j\\)",
          "D. \\(-2j\\)"
        ],
        "correct_option": "C",
        "explanation": "\\(\\cos(\\pi/2)=0\\) and \\(\\sin(\\pi/2)=1\\), so \\(2e^{j\\pi/2}=2(0+j)=2j\\).",
        "wrong_option_explanations": {
          "A": "That would correspond to angle \\(0\\), not \\(\\pi/2\\).",
          "B": "That would correspond to angle \\(\\pi\\).",
          "D": "That would correspond to angle \\(-\\pi/2\\)."
        },
        "hint": "Angle \\(\\pi/2\\) points straight up on the imaginary axis.",
        "needs_visual": true,
        "visual_type": "unit_circle_or_complex_plane_direction",
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "rectangular_to_polar_quadrant",
    "label": "Magnitude and quadrant-correct angle",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp3_q1",
        "type": "multiple_choice",
        "stem": "A student converts \\(z=-2-j3\\) and gets angle \\(56.3^\\circ\\) from \\(\\tan^{-1}(3/2)\\). Why is this wrong?",
        "options": [
          "A. The magnitude should be negative.",
          "B. The point is in Quadrant III, but \\(56.3^\\circ\\) points to Quadrant I.",
          "C. The angle must always be between \\(0^\\circ\\) and \\(90^\\circ\\).",
          "D. The imaginary part should be ignored when finding angle."
        ],
        "correct_option": "B",
        "explanation": "For \\(-2-j3\\), both coordinates are negative, so the point is in Quadrant III. The principal angle is \\(-123.7^\\circ\\), not \\(56.3^\\circ\\).",
        "wrong_option_explanations": {
          "A": "Magnitude is distance, so it is never negative.",
          "C": "Complex-number angles can lie in any quadrant.",
          "D": "The imaginary part is essential for determining the angle."
        },
        "hint": "Sketch the signs before trusting inverse tangent.",
        "needs_visual": true,
        "visual_type": "wrong_vs_right_visual_check",
        "same_point_variant": true
      },
      {
        "id": "kp3_q2",
        "type": "multiple_choice",
        "stem": "What is the magnitude of \\(z=-2+j1\\)?",
        "options": [
          "A. \\(\\sqrt{3}\\)",
          "B. \\(\\sqrt{5}\\)",
          "C. \\(3\\)",
          "D. \\(-\\sqrt{5}\\)"
        ],
        "correct_option": "B",
        "explanation": "\\(r=\\sqrt{a^2+b^2}=\\sqrt{(-2)^2+1^2}=\\sqrt{5}\\).",
        "wrong_option_explanations": {
          "A": "This incorrectly combines \\(-2\\) and \\(1\\) without squaring both.",
          "C": "This adds absolute coordinate values instead of using Pythagorean distance.",
          "D": "Magnitude cannot be negative."
        },
        "hint": "Magnitude is distance from the origin.",
        "needs_visual": false,
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "conjugate_and_magnitude",
    "label": "Conjugate, imaginary part, and magnitude squared",
    "importance": "high",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp4_q1",
        "type": "multiple_choice",
        "stem": "If \\(z=3+4j\\), what is \\(zz^*\\)?",
        "options": [
          "A. \\(7\\)",
          "B. \\(25\\)",
          "C. \\(3-4j\\)",
          "D. \\(-7\\)"
        ],
        "correct_option": "B",
        "explanation": "\\(z^*=3-4j\\), so \\((3+4j)(3-4j)=3^2+4^2=25=|z|^2\\).",
        "wrong_option_explanations": {
          "A": "This adds the coefficients instead of multiplying by the conjugate.",
          "C": "That is the conjugate, not the product \\(zz^*\\).",
          "D": "Magnitude squared is nonnegative."
        },
        "hint": "Use \\((a+jb)(a-jb)=a^2+b^2\\).",
        "needs_visual": false,
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "choose_arithmetic_form",
    "label": "Choosing rectangular or polar form for arithmetic",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp5_q1",
        "type": "multiple_choice",
        "stem": "Which form is usually most efficient for multiplying \\(z_1=5e^{j30^\\circ}\\) and \\(z_2=2e^{j40^\\circ}\\)?",
        "options": [
          "A. Polar form, because magnitudes multiply and angles add.",
          "B. Rectangular form, because real parts always multiply separately.",
          "C. Rectangular form, because angles should be ignored.",
          "D. Either form requires the exact same amount of work."
        ],
        "correct_option": "A",
        "explanation": "In polar form, \\(z_1z_2=(5)(2)e^{j(30^\\circ+40^\\circ)}=10e^{j70^\\circ}\\).",
        "wrong_option_explanations": {
          "B": "Multiplying rectangular complex numbers requires distributing terms, which is often longer.",
          "C": "Angles are central in polar multiplication.",
          "D": "Polar form is usually clearly shorter for multiplication."
        },
        "hint": "For multiplication, think: multiply distances, add directions.",
        "needs_visual": false,
        "same_point_variant": false
      },
      {
        "id": "kp5_q2",
        "type": "short_answer",
        "stem": "A problem asks you to compute \\(2z_1-z_2\\), where both numbers are given in polar form. Which form should you convert to first, and why?",
        "ideal_answer": "Convert both numbers to rectangular form first because addition and subtraction combine real parts with real parts and imaginary parts with imaginary parts. Polar form is not convenient for direct addition or subtraction.",
        "grading_rubric": [
          "Must choose rectangular form",
          "Must mention addition/subtraction of matching components",
          "Must explain why polar form is not directly convenient"
        ],
        "explanation": "This checks whether the student can choose the efficient representation instead of applying one method everywhere.",
        "hint": "Ask whether the operation combines coordinates or combines magnitudes and angles.",
        "needs_visual": false,
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "demo_observation",
    "label": "Interactive complex-plane interpretation",
    "importance": "medium",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp6_q1",
        "type": "multiple_choice",
        "stem": "In the interactive demo, you drag \\(z\\) from \\((3,4)\\) to \\((3,-4)\\) while keeping the same real coordinate. What changed?",
        "options": [
          "A. The magnitude changed, but the conjugate stayed the same.",
          "B. The point reflected across the real axis; the imaginary part changed sign.",
          "C. The real part changed sign.",
          "D. The point moved to Quadrant II."
        ],
        "correct_option": "B",
        "explanation": "Changing \\((3,4)\\) to \\((3,-4)\\) reflects the point across the real axis and changes \\(4j\\) to \\(-4j\\).",
        "wrong_option_explanations": {
          "A": "The magnitude stays \\(5\\) in both positions.",
          "C": "The real part remains \\(3\\).",
          "D": "\\((3,-4)\\) is in Quadrant IV, not Quadrant II."
        },
        "hint": "A conjugate keeps the real part and flips the imaginary sign.",
        "needs_visual": true,
        "visual_type": "demo_observation_check",
        "same_point_variant": false
      }
    ]
  }
]
```

## Raw JSON

```json
{
  "section_id": "B.1",
  "section_title": "B.1 Complex Numbers",
  "difficulty": "intermediate",
  "estimated_read_minutes": 16,
  "learning_objectives": [
    "Represent a complex number in rectangular, polar, and exponential form.",
    "Convert between rectangular and polar form while choosing the correct quadrant.",
    "Use conjugates to extract imaginary parts, magnitudes, and simplify division.",
    "Choose the efficient form for addition, subtraction, multiplication, division, powers, and roots.",
    "Interpret complex exponentials as magnitude-and-angle objects in the complex plane."
  ],
  "visualization_need": {
    "level": "interactive",
    "reason": [
      "formula_to_phenomenon_gap",
      "depends_on_parameter_change",
      "student_should_manipulate_to_understand",
      "pattern_recognition_benefits_from_figure",
      "misconception_needs_visual_correction"
    ],
    "recommended_assets": [
      "textbook_figure",
      "react_canvas_demo",
      "latex_native_formula_visual"
    ]
  },
  "visual_plan": {
    "primary_anchor": "both",
    "rationale": "Use the textbook's complex-plane figures because they match the notation students will see in this section, then add one interactive complex-plane demo because rectangular-to-polar conversion is much easier to understand when the point moves and the values update together. Use LaTeX-native formula blocks for symbolic rules. Do not use generated images because the available textbook figures and formulas already cover the canonical visuals accurately.",
    "cram": "Use visuals to recognize quadrant, magnitude, angle, and conjugate patterns quickly.",
    "standard": "Use each visual beside one representative example so students connect formulas to points on the complex plane.",
    "top_score": "Use visuals to expose quadrant traps, coterminal angles, conjugate symmetry, and when polar form is more efficient than rectangular form."
  },
  "blocks": [
    {
      "type": "text_explanation",
      "instruction": "Render Page 1 as a minimal overview only. Use the heading 'Section Objective' followed by one sentence: 'Learn how complex numbers are written, visualized, converted, and used in algebra for signals and systems.' Then add the heading 'Concepts In This Section' and list only these concept names as bullets: rectangular form, complex plane, Euler form, polar conversion, quadrant correction, conjugate, magnitude, polar arithmetic, complex exponential behavior. Do not add background history or expanded explanation on this page."
    },
    {
      "type": "math_block",
      "latex": "z = a + jb",
      "explanation_instruction": "Start a new concept page with the heading '## 1. Rectangular form: real part plus vertical-axis part'. Explain in 90–130 words that a complex number is a two-coordinate object: \\(a\\) is the real-axis coordinate, \\(b\\) is the coefficient of \\(j\\), and \\(j^2=-1\\). State that engineers use \\(j\\) instead of \\(i\\) to avoid confusion with current. Include the minimal example \\(z=3-4j\\): real part \\(3\\), imaginary part \\(-4\\), point \\((3,-4)\\). Exam note: do not say the imaginary part is \\(-4j\\); the imaginary part is the coefficient \\(-4\\)."
    },
    {
      "type": "book_image",
      "source_page": "page-005",
      "fig_id": "Fig. B.2",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Use the diagram to instantly identify real coordinate, imaginary coordinate, magnitude, angle, and conjugate reflection.",
        "standard": "Use the diagram directly after rectangular form to connect \\(a+jb\\) with a point and vector.",
        "top_score": "Use the diagram to stress that conjugates reflect across the real axis while preserving magnitude."
      },
      "caption_instruction": "One sentence: Fig. B.2 shows \\(z=a+jb\\), its magnitude \\(r\\), angle \\(\\theta\\), and conjugate \\(z^*=a-jb\\) on the complex plane.",
      "description_instruction": "In 2–3 sentences, describe the horizontal Real axis, vertical Imaginary axis, the point \\((a,b)\\), the vector from the origin, the angle from the positive real axis, and the reflected point \\((a,-b)\\). Tell students to notice that changing the sign of the imaginary component reflects the point across the real axis."
    },
    {
      "type": "math_block",
      "latex": "e^{j\\theta}=\\cos\\theta+j\\sin\\theta",
      "explanation_instruction": "Start a new concept page with the heading '## 2. Euler's formula: turning angle into a complex number'. Explain in 100–150 words that Euler's formula connects exponential notation to cosine and sine coordinates on the complex plane. Define \\(\\theta\\) as the angle from the positive real axis, \\(\\cos\\theta\\) as the horizontal coordinate on the unit circle, and \\(\\sin\\theta\\) as the vertical coordinate. Include the example \\(e^{j\\pi/2}=j\\) because \\(\\cos(\\pi/2)=0\\) and \\(\\sin(\\pi/2)=1\\). Exam trigger: use this formula whenever a problem asks for polar/exponential form or asks to convert \\(re^{j\\theta}\\) into \\(a+jb\\). Common misuse: forgetting the factor \\(j\\) before \\(\\sin\\theta\\)."
    },
    {
      "type": "math_block",
      "latex": "z = re^{j\\theta}",
      "explanation_instruction": "Continue the same concept page, but keep this as its own standalone formula. Label it as 'Polar/exponential form, Eq. (B.4)'. Explain in 80–120 words that \\(r\\) is distance from the origin and \\(\\theta\\) is direction. State that this is the same number as \\(a+jb\\), just described by distance and angle instead of horizontal and vertical coordinates. Include the example \\(2e^{j\\pi/3}=2(\\cos\\pi/3+j\\sin\\pi/3)=1+j\\sqrt{3}\\). Exam note: polar form is usually better for multiplication, division, powers, and roots; rectangular form is usually better for addition and subtraction."
    },
    {
      "type": "interactive_demo",
      "demo_type": "react_canvas_complex_plane",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Drag the point into each quadrant and memorize how signs of \\(a\\), \\(b\\), and angle change.",
        "standard": "Use the demo after the polar formula to see rectangular and polar values update together.",
        "top_score": "Use coterminal-angle toggles to compare principal angle with equivalent angles differing by \\(2\\pi k\\)."
      },
      "instruction": "Build an interactive complex-plane demo. Show Real and Imaginary axes, a draggable point \\(z\\), dashed projections to \\(a\\) and \\(b\\), a vector from the origin, and an angle arc \\(\\theta\\). Display live values for \\(a\\), \\(b\\), \\(r=\\sqrt{a^2+b^2}\\), \\(\\theta=\\operatorname{atan2}(b,a)\\), and \\(z=a+jb=re^{j\\theta}\\). Include a checkbox 'show conjugate' that reflects the point across the real axis and labels \\(z^*=a-jb\\). Include a toggle between degrees and radians. Add one short prompt below the canvas: 'Drag the point into Quadrant II and notice why plain \\(\\tan^{-1}(b/a)\\) can give the wrong angle.'"
    },
    {
      "type": "math_block",
      "latex": "r=\\sqrt{a^2+b^2}",
      "explanation_instruction": "Start a new concept page with the heading '## 3. Rectangular to polar: distance first, angle second'. Explain in 90–130 words that \\(r\\) is the magnitude \\(|z|\\), found by the Pythagorean theorem from coordinates \\((a,b)\\). Then explain that the angle must be chosen from the quadrant of the point, not blindly from calculator output. Include the representative example \\(z=-2-j3\\): \\(r=\\sqrt{13}\\), the point is in Quadrant III, so the principal angle is \\(-123.7^\\circ\\), not \\(56.3^\\circ\\). Exam trigger: whenever both signs are visible in \\(a+jb\\), sketch the quadrant before trusting \\(\\tan^{-1}(b/a)\\). Common misuse: treating \\(\\tan^{-1}((-3)/(-2))\\) as a Quadrant I angle."
    },
    {
      "type": "book_image",
      "source_page": "page-009",
      "fig_id": "unknown",
      "teaching_role": "trap_exposure",
      "mode_specific_visual_use": {
        "cram": "Use the four plotted examples to attach sign patterns to quadrants fast.",
        "standard": "Use the figure beside the \\(-2-j3\\) example to verify the corrected principal angle.",
        "top_score": "Use the figure to compare equivalent angle choices and why principal value is a convention."
      },
      "caption_instruction": "One sentence: These Argand diagrams show Cartesian-to-polar conversion in all four quadrants and expose the calculator-angle trap.",
      "description_instruction": "In 2–3 sentences, describe the four plotted complex numbers, their magnitudes, and their angles measured from the positive real axis. Tell students to notice that the signs of \\(a\\) and \\(b\\) determine the quadrant, and the quadrant determines whether the raw inverse tangent angle must be corrected."
    },
    {
      "type": "math_block",
      "latex": "\\operatorname{Im} z = \\frac{z-z^*}{2j}",
      "explanation_instruction": "Start a new concept page with the heading '## 4. Conjugates: reflect, subtract, and simplify'. Label this formula as Eq. (B.8). Explain in 90–130 words that the conjugate \\(z^*\\) changes \\(a+jb\\) into \\(a-jb\\), so subtracting \\(z^*\\) from \\(z\\) cancels the real parts and leaves only the vertical-axis information. Include the example \\(z=5+2j\\): \\(z^*=5-2j\\), so \\((z-z^*)/(2j)=4j/(2j)=2\\). Exam trigger: use conjugates when a problem asks for imaginary part, magnitude squared, or division by a complex denominator. Common misuse: forgetting that \\(\\operatorname{Im}z\\) is real-valued."
    },
    {
      "type": "math_block",
      "latex": "zz^*=|z|^2",
      "explanation_instruction": "Continue the conjugate concept page, but keep this as its own standalone formula. Label it as Eq. (B.9). Explain in 80–110 words that multiplying a complex number by its conjugate removes the imaginary part and produces a real magnitude-squared value. Include the example \\((3+4j)(3-4j)=9+16=25=|3+4j|^2\\). Exam trigger: use this identity to rationalize denominators such as \\(1/(2+3j)\\). Common misuse: writing \\(zz^*=|z|\\) instead of \\(|z|^2\\)."
    },
    {
      "type": "math_block",
      "latex": "z_1z_2=r_1r_2e^{j(\\theta_1+\\theta_2)}",
      "explanation_instruction": "Start a new concept page with the heading '## 5. Arithmetic: choose the form that makes the operation easy'. Explain in 100–150 words that rectangular form is best for addition/subtraction because coordinates combine directly, while polar form is best for multiplication/division because magnitudes and angles combine cleanly. Teach the displayed multiplication rule: multiply magnitudes and add angles. Then state in prose that division divides magnitudes and subtracts angles. Include the representative example \\((5e^{j53.1^\\circ})(\\sqrt{13}e^{j56.3^\\circ})=5\\sqrt{13}e^{j109.4^\\circ}\\). Exam note: if the problem says multiply, divide, power, or root, try polar first; if it says add or subtract, convert to rectangular first."
    },
    {
      "type": "section_summary",
      "instruction": "Create a recap page titled '📌 Key Takeaways'. Use concise bullets, but include the core formulas explicitly. Include these formulas exactly as review items: \\(z=a+jb\\); \\(e^{j\\theta}=\\cos\\theta+j\\sin\\theta\\); \\(z=re^{j\\theta}\\); \\(r=\\sqrt{a^2+b^2}\\); \\(\\operatorname{Im}z=(z-z^*)/(2j)\\); \\(zz^*=|z|^2\\); \\(z_1z_2=r_1r_2e^{j(\\theta_1+\\theta_2)}\\). Also include one bullet saying angle must match the quadrant, not just calculator output. Add one final bridge sentence: 'Next, these complex-number tools will support phasors, frequency response, and signals represented by exponentials.'"
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
              "stem": "For \\(z=7-5j\\), which statement is technically correct?",
              "options": [
                "A. The real part is \\(7\\), and the imaginary part is \\(-5\\).",
                "B. The real part is \\(7\\), and the imaginary part is \\(-5j\\).",
                "C. The real part is \\(-5\\), and the imaginary part is \\(7\\).",
                "D. The real part is \\(7j\\), and the imaginary part is \\(-5\\)."
              ],
              "correct_option": "A",
              "explanation": "In \\(a+jb\\), the imaginary part is the coefficient \\(b\\), not the whole term \\(jb\\).",
              "wrong_option_explanations": {
                "B": "\\(-5j\\) is the imaginary term, not the imaginary part.",
                "C": "This swaps the horizontal and vertical components.",
                "D": "The real part does not include \\(j\\)."
              },
              "hint": "Separate the coefficient from the symbol \\(j\\).",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp1_q2",
              "type": "multiple_choice",
              "stem": "On the complex plane, where is \\(z=-3+2j\\) located?",
              "options": [
                "A. Quadrant I",
                "B. Quadrant II",
                "C. Quadrant III",
                "D. Quadrant IV"
              ],
              "correct_option": "B",
              "explanation": "The real part is negative and the imaginary part is positive, so the point is left and up: Quadrant II.",
              "wrong_option_explanations": {
                "A": "Quadrant I requires both real and imaginary parts to be positive.",
                "C": "Quadrant III requires both parts to be negative.",
                "D": "Quadrant IV requires positive real part and negative imaginary part."
              },
              "hint": "Real part controls left/right; imaginary part controls up/down.",
              "needs_visual": true,
              "visual_type": "complex_plane_point",
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "euler_and_polar_form",
          "label": "Euler formula and polar/exponential form",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "Which identity correctly converts exponential form into rectangular components?",
              "options": [
                "A. \\(e^{j\\theta}=\\sin\\theta+j\\cos\\theta\\)",
                "B. \\(e^{j\\theta}=\\cos\\theta+j\\sin\\theta\\)",
                "C. \\(e^{j\\theta}=j\\cos\\theta+\\sin\\theta\\)",
                "D. \\(e^{j\\theta}=\\cos\\theta- j\\sin\\theta\\)"
              ],
              "correct_option": "B",
              "explanation": "Euler's formula is \\(e^{j\\theta}=\\cos\\theta+j\\sin\\theta\\).",
              "wrong_option_explanations": {
                "A": "This swaps cosine and sine.",
                "C": "This attaches \\(j\\) to the cosine term instead of the sine term.",
                "D": "The minus sign belongs to \\(e^{-j\\theta}\\), not \\(e^{j\\theta}\\)."
              },
              "hint": "The real coordinate comes from cosine.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "Convert \\(2e^{j\\pi/2}\\) to rectangular form.",
              "options": [
                "A. \\(2\\)",
                "B. \\(-2\\)",
                "C. \\(2j\\)",
                "D. \\(-2j\\)"
              ],
              "correct_option": "C",
              "explanation": "\\(\\cos(\\pi/2)=0\\) and \\(\\sin(\\pi/2)=1\\), so \\(2e^{j\\pi/2}=2(0+j)=2j\\).",
              "wrong_option_explanations": {
                "A": "That would correspond to angle \\(0\\), not \\(\\pi/2\\).",
                "B": "That would correspond to angle \\(\\pi\\).",
                "D": "That would correspond to angle \\(-\\pi/2\\)."
              },
              "hint": "Angle \\(\\pi/2\\) points straight up on the imaginary axis.",
              "needs_visual": true,
              "visual_type": "unit_circle_or_complex_plane_direction",
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "rectangular_to_polar_quadrant",
          "label": "Magnitude and quadrant-correct angle",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "A student converts \\(z=-2-j3\\) and gets angle \\(56.3^\\circ\\) from \\(\\tan^{-1}(3/2)\\). Why is this wrong?",
              "options": [
                "A. The magnitude should be negative.",
                "B. The point is in Quadrant III, but \\(56.3^\\circ\\) points to Quadrant I.",
                "C. The angle must always be between \\(0^\\circ\\) and \\(90^\\circ\\).",
                "D. The imaginary part should be ignored when finding angle."
              ],
              "correct_option": "B",
              "explanation": "For \\(-2-j3\\), both coordinates are negative, so the point is in Quadrant III. The principal angle is \\(-123.7^\\circ\\), not \\(56.3^\\circ\\).",
              "wrong_option_explanations": {
                "A": "Magnitude is distance, so it is never negative.",
                "C": "Complex-number angles can lie in any quadrant.",
                "D": "The imaginary part is essential for determining the angle."
              },
              "hint": "Sketch the signs before trusting inverse tangent.",
              "needs_visual": true,
              "visual_type": "wrong_vs_right_visual_check",
              "same_point_variant": true
            },
            {
              "id": "kp3_q2",
              "type": "multiple_choice",
              "stem": "What is the magnitude of \\(z=-2+j1\\)?",
              "options": [
                "A. \\(\\sqrt{3}\\)",
                "B. \\(\\sqrt{5}\\)",
                "C. \\(3\\)",
                "D. \\(-\\sqrt{5}\\)"
              ],
              "correct_option": "B",
              "explanation": "\\(r=\\sqrt{a^2+b^2}=\\sqrt{(-2)^2+1^2}=\\sqrt{5}\\).",
              "wrong_option_explanations": {
                "A": "This incorrectly combines \\(-2\\) and \\(1\\) without squaring both.",
                "C": "This adds absolute coordinate values instead of using Pythagorean distance.",
                "D": "Magnitude cannot be negative."
              },
              "hint": "Magnitude is distance from the origin.",
              "needs_visual": false,
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "conjugate_and_magnitude",
          "label": "Conjugate, imaginary part, and magnitude squared",
          "importance": "high",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp4_q1",
              "type": "multiple_choice",
              "stem": "If \\(z=3+4j\\), what is \\(zz^*\\)?",
              "options": [
                "A. \\(7\\)",
                "B. \\(25\\)",
                "C. \\(3-4j\\)",
                "D. \\(-7\\)"
              ],
              "correct_option": "B",
              "explanation": "\\(z^*=3-4j\\), so \\((3+4j)(3-4j)=3^2+4^2=25=|z|^2\\).",
              "wrong_option_explanations": {
                "A": "This adds the coefficients instead of multiplying by the conjugate.",
                "C": "That is the conjugate, not the product \\(zz^*\\).",
                "D": "Magnitude squared is nonnegative."
              },
              "hint": "Use \\((a+jb)(a-jb)=a^2+b^2\\).",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "choose_arithmetic_form",
          "label": "Choosing rectangular or polar form for arithmetic",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp5_q1",
              "type": "multiple_choice",
              "stem": "Which form is usually most efficient for multiplying \\(z_1=5e^{j30^\\circ}\\) and \\(z_2=2e^{j40^\\circ}\\)?",
              "options": [
                "A. Polar form, because magnitudes multiply and angles add.",
                "B. Rectangular form, because real parts always multiply separately.",
                "C. Rectangular form, because angles should be ignored.",
                "D. Either form requires the exact same amount of work."
              ],
              "correct_option": "A",
              "explanation": "In polar form, \\(z_1z_2=(5)(2)e^{j(30^\\circ+40^\\circ)}=10e^{j70^\\circ}\\).",
              "wrong_option_explanations": {
                "B": "Multiplying rectangular complex numbers requires distributing terms, which is often longer.",
                "C": "Angles are central in polar multiplication.",
                "D": "Polar form is usually clearly shorter for multiplication."
              },
              "hint": "For multiplication, think: multiply distances, add directions.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp5_q2",
              "type": "short_answer",
              "stem": "A problem asks you to compute \\(2z_1-z_2\\), where both numbers are given in polar form. Which form should you convert to first, and why?",
              "ideal_answer": "Convert both numbers to rectangular form first because addition and subtraction combine real parts with real parts and imaginary parts with imaginary parts. Polar form is not convenient for direct addition or subtraction.",
              "grading_rubric": [
                "Must choose rectangular form",
                "Must mention addition/subtraction of matching components",
                "Must explain why polar form is not directly convenient"
              ],
              "explanation": "This checks whether the student can choose the efficient representation instead of applying one method everywhere.",
              "hint": "Ask whether the operation combines coordinates or combines magnitudes and angles.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "demo_observation",
          "label": "Interactive complex-plane interpretation",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp6_q1",
              "type": "multiple_choice",
              "stem": "In the interactive demo, you drag \\(z\\) from \\((3,4)\\) to \\((3,-4)\\) while keeping the same real coordinate. What changed?",
              "options": [
                "A. The magnitude changed, but the conjugate stayed the same.",
                "B. The point reflected across the real axis; the imaginary part changed sign.",
                "C. The real part changed sign.",
                "D. The point moved to Quadrant II."
              ],
              "correct_option": "B",
              "explanation": "Changing \\((3,4)\\) to \\((3,-4)\\) reflects the point across the real axis and changes \\(4j\\) to \\(-4j\\).",
              "wrong_option_explanations": {
                "A": "The magnitude stays \\(5\\) in both positions.",
                "C": "The real part remains \\(3\\).",
                "D": "\\((3,-4)\\) is in Quadrant IV, not Quadrant II."
              },
              "hint": "A conjugate keeps the real part and flips the imaginary sign.",
              "needs_visual": true,
              "visual_type": "demo_observation_check",
              "same_point_variant": false
            }
          ]
        }
      ]
    }
  ]
}
```
