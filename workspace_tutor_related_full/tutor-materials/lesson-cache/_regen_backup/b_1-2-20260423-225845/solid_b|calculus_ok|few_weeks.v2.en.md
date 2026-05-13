Think of real numbers as **Country X** and complex numbers as **Country Y**. Your problem starts in Country X (real inputs) and must end in Country X (real answers). But the fastest route? Cut through Country Y. Complex numbers are not the destination — they are the expressway that makes the journey dramatically shorter.

# B.1-2 Algebra of Complex Numbers

> **Section Objective:** Learn to read, write, and convert complex numbers in both rectangular and polar form — the two languages every signals engineer must speak fluently.

---

## 1. Rectangular Form — Walk Right, Then Walk Up

Let's start with a specific number: **z = 3 + 4j**

Here is exactly what that means, step by step:

1. Start at the origin (the center of the complex plane).
2. Walk **3 steps to the right** along the horizontal axis. That is the **real part**: 3.
3. From there, walk **4 steps straight up** along the vertical axis. That is the **imaginary part**: 4.
4. Plant a flag. That point is **z**.

The letter **j** is not mysterious — it simply means **"vertical direction."** Writing `4j` is just a way of saying "4 units upward."

### KEY INSIGHT

The complex plane is just a 2D coordinate system. The horizontal axis holds real numbers. The vertical axis holds imaginary numbers. Every complex number is simply a **point** on this grid.

#### Note

In mathematics, the imaginary unit is written as *i*. In engineering and this course, we use **j** to avoid confusion with electrical current *i*.

![Fig. B.2](/figures/page-005-fig__b_2-1.png)
*Fig. B.2 — The complex plane. The point z = a + jb is located by walking **a units right** (real axis) and **b units up** (imaginary axis) — exactly the 'walk right, then up' method. The distance from the origin is **r** (the magnitude), and the angle from the positive real axis is **θ** (the phase). Notice the conjugate **z\* = a − jb** is the mirror image of z reflected across the real axis.*

$$z = a + jb \quad \text{where} \quad \text{Re}(z) = a, \; \text{Im}(z) = b$$
***Formula Reference Box — Rectangular Form**

| Symbol | Name | Geometric Meaning |
|--------|------|-------------------|
| a | Real part, Re(z) | Horizontal position (abscissa) |
| b | Imaginary part, Im(z) | Vertical position (ordinate) |
| j | Imaginary unit | Signals the vertical direction |

Note: **b** is the imaginary part, but it is itself a **real number** — it is just the coefficient telling you how far to go vertically. The 'imaginary' label refers to the direction, not the number itself.*

---

## 2. Polar Form — Turn, Then Walk

Rectangular form says: *go right 3, go up 4.*

Polar form asks a different question: **how far from the origin, and in what direction?**

Using the same example, **z = 3 + 4j**:

**Step 1 — Find the distance (magnitude r):**

This is just the Pythagorean theorem. The real part and imaginary part form the two legs of a right triangle.

$$r = \sqrt{3^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5$$

The point z is exactly **5 units away** from the origin.

**Step 2 — Find the angle (phase θ):**

The angle is measured from the positive real axis (pointing right), going counter-clockwise.

$$\theta = \arctan\!\left(\frac{4}{3}\right) \approx 53.1^\circ \approx 0.927 \text{ rad}$$

**Step 3 — Interpret:**

Instead of "go right 3, up 4", polar form says: **"face the direction θ ≈ 53°, then walk 5 steps."** You arrive at exactly the same point.

### WHY THIS MATTERS FOR THE EXAM

Polar form is not just an alternative notation — it is the **preferred form for multiplication and division**. When you multiply two complex numbers in polar form, you simply multiply their magnitudes and add their angles. That is far easier than expanding brackets in rectangular form.

$$z = r(\cos\theta + j\sin\theta) = r e^{j\theta}$$
***Formula Reference Box — Polar Form and Euler's Formula**

| Symbol | Name | Meaning |
|--------|------|---------|
| r | Magnitude (modulus) | Distance from origin; r = √(a² + b²) |
| θ | Phase (argument) | Angle from positive real axis; θ = arctan(b/a) |
| e^{jθ} | Euler's formula shorthand | cos θ + j sin θ, compactly written |

**Euler's Formula** — `e^{jθ} = cos θ + j sin θ` — is the ultimate shortcut:

- **Multiplication:** `z₁ · z₂ = r₁r₂ · e^{j(θ₁+θ₂)}` — multiply magnitudes, add angles.
- **Division:** `z₁ / z₂ = (r₁/r₂) · e^{j(θ₁−θ₂)}` — divide magnitudes, subtract angles.

This is why engineers love polar form: what would require messy algebra in rectangular form becomes simple arithmetic in polar form.*

---
**✏️ Quick Check**

If a complex number is given as z = 5 e^{j(π/2)}, what are its real and imaginary parts? (Hint: where does an angle of 90 degrees point on the complex plane?)

<details><summary>Show answer</summary>

**Answer:** The real part is 0 and the imaginary part is 5. The number lies straight up on the vertical (imaginary) axis, so z = 0 + 5j.

*Hint: Use Euler's formula: 5(cos(90°) + j sin(90°)). Remember cos(90°) = 0 and sin(90°) = 1.*

</details>

---
**📌 Key Takeaways**
- Rectangular form z = a + jb: 'a' is horizontal (real), 'b' is vertical (imaginary) — think of it as grid coordinates on the complex plane
- Polar form z = r e^{jθ}: 'r' is the distance from the origin (r = √(a²+b²)), 'θ' is the angle (θ = arctan(b/a)) — preferred for multiplication and division
- Euler's formula e^{jθ} = cos θ + j sin θ bridges polar and rectangular — multiplying in polar means multiplying magnitudes and adding angles

*### LIKELY EXAM QUESTION TYPES

- **Converting rectangular → polar:** Given z = a + jb, find r and θ.
- **Converting polar → rectangular:** Given z = r e^{jθ}, find the real and imaginary parts using Euler's formula.
- **Simplifying products/quotients:** Use polar form to multiply or divide two complex numbers efficiently.

---

In the next section, we will look at **adding and multiplying complex numbers** — and discover why multiplication in the complex plane is equivalent to rotation.*
