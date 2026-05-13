# B.2-2 Sinusoids in Terms of Exponentials

> **Section Objective:** Learn to collapse a cosine-plus-sine combination at the same frequency into a single cosine with the correct amplitude and phase.

---

## Worked Example First: x(t) = cos(ω₀t) − √3 sin(ω₀t)

Let's solve a concrete case before stating the general rule.

**Step 1 — Identify a and b.**
Match the form a cos(ω₀t) + b sin(ω₀t). Here **a = 1** and **b = −√3**.

**Step 2 — Compute the amplitude.**
C = √(a² + b²) = √(1² + (−√3)²) = √(1 + 3) = **2**

**Step 3 — Form the complex number a − jb.**
a − jb = 1 − j(−√3) = **1 + j√3**

Notice the minus sign in a − jb: because b = −√3, the imaginary part flips to +√3. This sign flip is intentional and critical — it is not a typo.

**Step 4 — Find the angle.**
θ = ∠(a − jb) = arctan(√3 / 1) = **60°**
The point 1 + j√3 sits in quadrant I, so 60° is correct.

**Result:**
x(t) = **2 cos(ω₀t + 60°)**

#### Formula Reference
C = √(a² + b²) and θ = ∠(a − jb).

![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*Fig. B.8 shows two phasor diagrams: in (a) the cosine phasor (length 1) and the sine phasor (length √3) add geometrically to produce a single resultant phasor of length 2 at 60°, directly reading off the amplitude and phase of the equivalent sinusoid; in (b) the same construction yields a phasor of length 5 at −126.9°.*

$$a\cos(\omega_0 t) + b\sin(\omega_0 t) = C\cos(\omega_0 t + \theta), \quad C = \sqrt{a^2+b^2}, \quad \theta = \angle(a-jb)$$
*This formula converts any mixture of a cosine and a sine at the same frequency ω₀ into a single cosine. The key encoding is the complex number a − jb: its magnitude gives the resultant amplitude C, and its angle gives the phase shift θ — so the pair (a, b) is completely captured by one complex number.*

![unknown](/figures/page-018-unknown-1.png)
*The complex number a − jb is the geometric shortcut: its horizontal coordinate is a (the cosine coefficient), its downward vertical coordinate is −b (note the sign flip from the sine coefficient), and its magnitude and angle directly become the sinusoid's amplitude C and phase θ.*

## The General Rule

Now that the example is clear, here is why the rule works.

A sine wave is simply a cosine shifted by −90°:

b sin(ω₀t) = b cos(ω₀t − 90°)

In phasor terms, the cosine term a cos(ω₀t) contributes a **horizontal** phasor of length |a|, while the sine term b sin(ω₀t) contributes a **vertical** phasor of length |b| pointing **downward** (the −90° shift). Because both phasors rotate at exactly the same angular speed ω₀, they stay in a fixed geometric relationship and their vector sum is a single stationary resultant — which corresponds to one cosine at the same frequency.

### SIGN CONVENTION — DO NOT SKIP

The matching complex number is **a − jb**, not a + jb. The minus sign appears because the sine phasor points downward (−90°), so its imaginary contribution is −jb.

### QUADRANT WARNING

A calculator's arctan function always returns a value between −90° and +90°. If the point a − jb falls in quadrant II or III, arctan gives the **wrong quadrant**. Always plot a − jb first, confirm which quadrant it occupies, and adjust θ accordingly.

#### Formula Reference Box
a cos(ω₀t) + b sin(ω₀t) = C cos(ω₀t + θ), where C = √(a² + b²) and θ = ∠(a − jb).

![Fig. B.6](/figures/page-017-fig__b_6-1.png)
*Fig. B.6 illustrates that a cosine and a sine are identical waveforms offset in time — a phase shift of 90° — which is precisely why they can be combined through phasor addition and angle arithmetic into a single sinusoid.*

Think of two people pushing a revolving door at the same speed. One pushes purely sideways (that's your a cos(ω₀t) — a horizontal force), and the other pushes purely forward (that's your b sin(ω₀t) — a vertical force). Because both people walk around the door at exactly the same angular speed, their pushes never get out of sync. The door doesn't wobble between two competing rhythms; it just feels one steady diagonal push — stronger than either alone, aimed at a fixed angle. That diagonal push is your single resultant sinusoid C cos(ω₀t + θ): C is how hard the combined push is, and θ is the direction it points. If the two people were walking at different speeds, the angle would keep shifting and you could never reduce it to one clean push — which is exactly why this trick only works when both sinusoids share the same frequency.

%%KC_BLOCK%%<div class="kc-container" data-question="A student rewrites x(t) = −3 cos(ω₀t) + 4 sin(ω₀t) as 5 cos(ω₀t − 53.1°) because tan⁻¹(4/3) = 53.1°. Why is this answer not technically correct, even though 53.1° comes from the numbers 3 and 4?" data-answer="The amplitude 5 is correct, but the phase is in the wrong quadrant. For a cos(ω₀t) + b sin(ω₀t), the phase comes from the angle of a − jb. Here a = −3 and b = 4, so a − jb = −3 − j4, which lies in quadrant III. Its angle is −126.9° (equivalently 233.1°), not −53.1°. The mistake is using arctan on magnitudes only and ignoring the signs of both components." data-hint="Do not trust arctan alone. First place the point for a − jb on the complex plane: is it right/left, and up/down?" style="display:none;"></div>%%KC_END%%

## Second Worked Example: x(t) = −3 cos(ω₀t) + 4 sin(ω₀t)

**Step 1 — Identify a and b.**
a = −3, b = 4

**Step 2 — Form a − jb.**
a − jb = −3 − j4

**Step 3 — Compute C.**
C = √((−3)² + (−4)²) = √(9 + 16) = **5**

**Step 4 — Determine the correct quadrant.**
The point −3 − j4 has a negative real part and a negative imaginary part → **quadrant III**.
arctan(4/3) ≈ 53.1° is the reference angle, but the true angle is 180° + 53.1° = 233.1°, or equivalently **−126.9°** as the principal value.

**Final answer:**
x(t) = **5 cos(ω₀t − 126.9°)**

Answers differing by 360° (e.g., +233.1°) are mathematically equivalent, but the principal angle in (−180°, 180°] is usually preferred on exams.

#### Likely Exam Trap
Using the wrong sign in a − jb, or reading arctan without checking the quadrant of a − jb.

---
**📌 Key Takeaways**
- Any a cos(ω₀t) + b sin(ω₀t) collapses into one cosine C cos(ω₀t + θ) — same frequency required.
- Amplitude C = √(a² + b²); phase θ = angle of the complex number a − jb (note the minus sign on b).
- Always verify the quadrant of a − jb before reading off θ; arctan alone gives the wrong answer in quadrants II and III.

*In the next section we will express sinusoids directly with complex exponentials and phasors, making frequency-domain analysis systematic and algebraic.*
