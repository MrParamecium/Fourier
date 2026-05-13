![Fig. B.2](/figures/page-005-fig__b_2-1.png)
*Fig. B.2: The complex number z = a + jb plotted as the point (a, b) on the complex plane, with magnitude r measuring its distance from the origin, angle θ measured from the positive real axis, and conjugate z* = a − jb shown as its mirror image reflected across the real axis.*

# B.1-2 Algebra of Complex Numbers

> **Section Objective:** Learn to read, plot, and convert complex numbers between rectangular and polar form, and understand what the conjugate means geometrically.

---

## 1. Complex Numbers as Points on a Grid

Let's start with a specific number: **z = 3 + 4j**.

This tells you exactly where to go on a 2D grid:
- Move **3 units to the right** along the horizontal (real) axis.
- Move **4 units up** along the vertical (imaginary) axis.

That's it — you've landed on a point. The complex number *is* that point.

### KEY DEFINITIONS

For any complex number **z = a + jb**:

- **Re(z) = a** — the real part, your x-coordinate
- **Im(z) = b** — the imaginary part, your y-coordinate

For z = 3 + 4j: Re(z) = 3 and Im(z) = 4.

#### Note

The imaginary part is the number **b**, not the term **bj**. Im(z) = 4, not 4j.

$$z = a + jb, \qquad \mathrm{Re}\,z = a, \qquad \mathrm{Im}\,z = b$$
*Rectangular form records a complex number by its horizontal coordinate a and its vertical coordinate b. A critical point: the imaginary part is the real number b — not bj. The symbol j is just the marker that tells you b belongs to the vertical axis.*

$$a = r\cos\theta, \qquad b = r\sin\theta, \qquad z = a + jb = r(\cos\theta + j\sin\theta)$$
*The same point on the plane can be described two ways: by its coordinates (a, b), or by how far it is from the origin (r) and in what direction (θ). The conversion formulas a = r cos θ and b = r sin θ let you switch between these two descriptions freely — same point, just a different language.*

$$e^{j\theta} = \cos\theta + j\sin\theta$$
*Euler's formula gives us a shortcut: the bracketed expression (cos θ + j sin θ) can be replaced by the compact exponential e^{jθ}, so polar form becomes z = r e^{jθ} — a notation that will prove extremely powerful in later sections.*

## 2. The City-Grid Picture

Think of the complex plane as a perfectly regular city grid. The **real axis** is your east-west street, and the **imaginary axis** is your north-south avenue.

For **z = 3 + 4j**, the directions are simple: walk **3 blocks east**, then **4 blocks north**. You've arrived at your destination.

Now, polar form is just a different way to describe that same destination. Instead of giving turn-by-turn street directions, you say: "It's **5 blocks away**, in a direction **θ degrees north of east**." Same place — different description. That's all the conversion between rectangular and polar form ever is: two ways of giving directions to the same point.

---

## 3. Worked Example: z = 3 + 4j

Let's walk through this number completely, exam-style.

**Step 1 — Identify the parts.**
Re(z) = 3 and Im(z) = 4. The real part is 3 (no j), and the imaginary part is 4 (the coefficient of j, not 4j).

**Step 2 — Locate the point.**
On the complex plane, z = 3 + 4j is the point (3, 4): 3 units right on the real axis, 4 units up on the imaginary axis.

**Step 3 — Compute the magnitude.**
Using the Pythagorean theorem:
$$r = \sqrt{3^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5$$

**Step 4 — Compute the angle.**
The angle satisfies tan θ = b/a = 4/3, so:
$$\theta = \tan^{-1}\!\left(\frac{4}{3}\right) \approx 53.13°$$

**Step 5 — Write polar form.**
$$z = 5(\cos\theta + j\sin\theta)$$

**Step 6 — State the conjugate.**
The complex conjugate is z* = 3 − 4j, which is the reflection of (3, 4) across the real axis to the point (3, −4) — same real part, sign of imaginary part flipped.

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz="{&quot;type&quot;:&quot;quiz_plan&quot;,&quot;target_questions&quot;:6,&quot;question_range&quot;:{&quot;min&quot;:5,&quot;max&quot;:7},&quot;knowledge_points&quot;:[{&quot;id&quot;:&quot;rectangular_form_parts&quot;,&quot;label&quot;:&quot;Rectangular form and identifying real/imaginary parts&quot;,&quot;importance&quot;:&quot;high&quot;,&quot;exam_weight&quot;:&quot;high&quot;,&quot;mastery_rule&quot;:{&quot;correct_streak_required&quot;:2},&quot;questions&quot;:[{&quot;id&quot;:&quot;kp1_q1&quot;,&quot;type&quot;:&quot;multiple_choice&quot;,&quot;stem&quot;:&quot;For z = -2 + 5j, which statement is correct?&quot;,&quot;options&quot;:[&quot;A. Re(z) = 5 and Im(z) = -2&quot;,&quot;B. Re(z) = -2 and Im(z) = 5&quot;,&quot;C. Re(z) = -2 and Im(z) = 5j&quot;,&quot;D. Re(z) = -2j and Im(z) = 5&quot;],&quot;correct_option&quot;:&quot;B&quot;,&quot;explanation&quot;:&quot;In z = a + jb, the real part is the coefficient without j, and the imaginary part is the coefficient of j. So Re(z) = -2 and Im(z) = 5.&quot;,&quot;wrong_option_explanations&quot;:{&quot;A&quot;:&quot;This swaps the real and imaginary parts.&quot;,&quot;C&quot;:&quot;The imaginary part is 5, not 5j.&quot;,&quot;D&quot;:&quot;The real part is a real number, not a term containing j.&quot;},&quot;hint&quot;:&quot;Read the coefficient of j separately from the symbol j.&quot;,&quot;needs_visual&quot;:false,&quot;same_point_variant&quot;:true},{&quot;id&quot;:&quot;kp1_q2&quot;,&quot;type&quot;:&quot;short_answer&quot;,&quot;stem&quot;:&quot;A student says: 'If z = 7 - 3j, then the imaginary part is -3j.' Explain precisely what is wrong with that statement.&quot;,&quot;ideal_answer&quot;:&quot;The imaginary part is the real coefficient of j, so it is -3. The term -3j appears in the expression, but Im(z) = -3, not -3j.&quot;,&quot;grading_rubric&quot;:[&quot;Must state that Im(z) = -3&quot;,&quot;Must distinguish the imaginary part from the term -3j&quot;,&quot;Must show that j is the marker for the imaginary direction, not part of the part value&quot;],&quot;explanation&quot;:&quot;This checks a common exam mistake: confusing the imaginary part with the full imaginary term.&quot;,&quot;hint&quot;:&quot;Separate 'coefficient' from 'term.'&quot;,&quot;needs_visual&quot;:false,&quot;same_point_variant&quot;:true}]},{&quot;id&quot;:&quot;complex_plane_coordinates&quot;,&quot;label&quot;:&quot;Complex number as a point on the complex plane&quot;,&quot;importance&quot;:&quot;high&quot;,&quot;exam_weight&quot;:&quot;high&quot;,&quot;mastery_rule&quot;:{&quot;correct_streak_required&quot;:1},&quot;questions&quot;:[{&quot;id&quot;:&quot;kp2_q1&quot;,&quot;type&quot;:&quot;multiple_choice&quot;,&quot;stem&quot;:&quot;Which point on the complex plane represents z = 4 - 2j?&quot;,&quot;options&quot;:[&quot;A. (4, -2)&quot;,&quot;B. (-2, 4)&quot;,&quot;C. (4, 2)&quot;,&quot;D. (-4, -2)&quot;],&quot;correct_option&quot;:&quot;A&quot;,&quot;explanation&quot;:&quot;A complex number z = a + jb is plotted as the point (a, b), so z = 4 - 2j is the point (4, -2).&quot;,&quot;wrong_option_explanations&quot;:{&quot;B&quot;:&quot;This swaps the coordinates.&quot;,&quot;C&quot;:&quot;The imaginary part is -2, not 2.&quot;,&quot;D&quot;:&quot;The real part is 4, not -4.&quot;},&quot;hint&quot;:&quot;Use the rule point = (real part, imaginary part).&quot;,&quot;needs_visual&quot;:true,&quot;visual_type&quot;:&quot;complex_plane_point_plot&quot;,&quot;same_point_variant&quot;:false}]},{&quot;id&quot;:&quot;polar_relationships&quot;,&quot;label&quot;:&quot;Rectangular-polar relationships&quot;,&quot;importance&quot;:&quot;high&quot;,&quot;exam_weight&quot;:&quot;medium&quot;,&quot;mastery_rule&quot;:{&quot;correct_streak_required&quot;:1},&quot;questions&quot;:[{&quot;id&quot;:&quot;kp3_q1&quot;,&quot;type&quot;:&quot;multiple_choice&quot;,&quot;stem&quot;:&quot;If a complex number has polar coordinates (r, θ), which pair of formulas is correct?&quot;,&quot;options&quot;:[&quot;A. a = r sin θ, b = r cos θ&quot;,&quot;B. a = r cos θ, b = r sin θ&quot;,&quot;C. a = cos θ, b = sin θ&quot;,&quot;D. a = r tan θ, b = r cot θ&quot;],&quot;correct_option&quot;:&quot;B&quot;,&quot;explanation&quot;:&quot;The horizontal coordinate is a = r cos θ and the vertical coordinate is b = r sin θ.&quot;,&quot;wrong_option_explanations&quot;:{&quot;A&quot;:&quot;This reverses the cosine and sine assignments.&quot;,&quot;C&quot;:&quot;It ignores the magnitude r.&quot;,&quot;D&quot;:&quot;These are not the coordinate conversion formulas.&quot;},&quot;hint&quot;:&quot;Think x = r cos θ, y = r sin θ from standard polar coordinates.&quot;,&quot;needs_visual&quot;:false,&quot;same_point_variant&quot;:true},{&quot;id&quot;:&quot;kp3_q2&quot;,&quot;type&quot;:&quot;multiple_choice&quot;,&quot;stem&quot;:&quot;A point on the complex plane has r = 5 and θ such that cos θ = 3/5 and sin θ = 4/5. What is z in rectangular form?&quot;,&quot;options&quot;:[&quot;A. 3 + 4j&quot;,&quot;B. 4 + 3j&quot;,&quot;C. 5 + j&quot;,&quot;D. 5(cos θ + sin θ)&quot;],&quot;correct_option&quot;:&quot;A&quot;,&quot;explanation&quot;:&quot;Using a = r cos θ and b = r sin θ gives a = 5·(3/5) = 3 and b = 5·(4/5) = 4, so z = 3 + 4j.&quot;,&quot;wrong_option_explanations&quot;:{&quot;B&quot;:&quot;This swaps the real and imaginary coordinates.&quot;,&quot;C&quot;:&quot;This does not follow from the formulas for a and b.&quot;,&quot;D&quot;:&quot;This is not rectangular form and it also omits j on the sine term.&quot;},&quot;hint&quot;:&quot;Compute a and b first, then write z = a + jb.&quot;,&quot;needs_visual&quot;:false,&quot;same_point_variant&quot;:true}]},{&quot;id&quot;:&quot;conjugate_geometry_and_euler_link&quot;,&quot;label&quot;:&quot;Conjugate reflection and the Euler-formula link&quot;,&quot;importance&quot;:&quot;medium&quot;,&quot;exam_weight&quot;:&quot;medium&quot;,&quot;mastery_rule&quot;:{&quot;correct_streak_required&quot;:1},&quot;questions&quot;:[{&quot;id&quot;:&quot;kp4_q1&quot;,&quot;type&quot;:&quot;multiple_choice&quot;,&quot;stem&quot;:&quot;If z = a + jb, which expression gives its complex conjugate and geometric meaning?&quot;,&quot;options&quot;:[&quot;A. z* = -a + jb, reflection across the imaginary axis&quot;,&quot;B. z* = a - jb, reflection across the real axis&quot;,&quot;C. z* = a - jb, rotation by 90 degrees&quot;,&quot;D. z* = -a - jb, reflection through the origin&quot;],&quot;correct_option&quot;:&quot;B&quot;,&quot;explanation&quot;:&quot;Changing the sign of the imaginary part sends (a, b) to (a, -b), which is reflection across the real axis.&quot;,&quot;wrong_option_explanations&quot;:{&quot;A&quot;:&quot;Negating a reflects across the imaginary axis, not conjugation.&quot;,&quot;C&quot;:&quot;Conjugation reflects; it does not rotate by 90 degrees.&quot;,&quot;D&quot;:&quot;Negating both coordinates is reflection through the origin, not conjugation.&quot;},&quot;hint&quot;:&quot;Keep the real part the same and flip the sign of the imaginary part.&quot;,&quot;needs_visual&quot;:true,&quot;visual_type&quot;:&quot;complex_plane_conjugate_reflection&quot;,&quot;same_point_variant&quot;:false}]}]}" style="display:none;"></div>%%KC_END%%

---
**📌 Key Takeaways**
- Rectangular form z = a + jb records a complex number by two real coordinates a and b.
- Re(z) = a is the x-coordinate; Im(z) = b is the y-coordinate — never bj.
- Every complex number z = a + jb corresponds to the point (a, b) on the complex plane.
- Polar conversion: a = r cos θ and b = r sin θ, giving z = r(cos θ + j sin θ).
- The conjugate z* = a − jb is the mirror image of z reflected across the real axis.

*Likely exam tasks: identify parts, plot points, convert between forms, and interpret conjugates. In the next section we will build on this notation to do more with complex-number operations and forms.*
