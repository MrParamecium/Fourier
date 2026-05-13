# B.1 Complex Numbers — A Friendly Guide

---

## Page 1: Section Overview 🗺️

Welcome to **B.1: Complex Numbers**! This section is your foundation for everything that follows in signals and systems. Don't worry if complex numbers feel a little mysterious right now — by the end of this section, they'll feel like old friends.

### What We'll Cover

Here's a quick roadmap of what's ahead:

| Topic | What You'll Learn |
|---|---|
| **History** | How complex numbers were discovered (and why they were once considered "useless"!) |
| **The Complex Plane** | How to picture complex numbers visually |
| **Rectangular Form** | Writing complex numbers as $$a + jb$$ |
| **Polar Form** | Writing complex numbers as $$re^{j\theta}$$ |
| **Euler's Formula** | The magical bridge between the two forms |
| **Conjugates** | What they are and why they're useful |
| **Arithmetic** | Adding, subtracting, multiplying, dividing, powers, and roots |

### Why Should You Care?

Complex numbers are **everywhere** in signals and systems. They make solving differential equations easier, they describe oscillations and waves naturally, and they're the backbone of Fourier analysis. Think of them as a shortcut through a mathematical "Country Y" that gets you to real-world answers faster and more elegantly.

> 💡 **Key Idea:** Even though real-world problems start and end with real numbers, complex numbers are the most efficient tool for solving them.

---

## Page 2: A Historical Note — Why "Imaginary" Numbers Exist 📜

### The Problem That Started It All

Back in the 1500s, mathematicians were competing fiercely to solve **cubic equations** (equations with $$x^3$$). An Italian mathematician named **Gerolamo Cardano** published a formula in 1545 for solving the depressed cubic:

$$x^3 + ax + b = 0$$

His formula was:

$$x = \sqrt[3]{-\frac{b}{2} + \sqrt{\frac{b^2}{4} + \frac{a^3}{27}}} + \sqrt[3]{-\frac{b}{2} - \sqrt{\frac{b^2}{4} + \frac{a^3}{27}}}$$

### When the Formula Got Weird

For the equation $$x^3 - 15x - 4 = 0$$, Cardano's formula gave:

$$x = \sqrt[3]{2 + \sqrt{-121}} + \sqrt[3]{2 - \sqrt{-121}}$$

😱 A **square root of a negative number**?! In 1545, even negative numbers were considered suspicious. This was doubly shocking.

But here's the twist — if you accept that $$\sqrt{-121} = j \cdot 11$$ (where $$j = \sqrt{-1}$$), then:

$$(2 + j)^3 = 2 + j11 \quad \text{and} \quad (2 - j)^3 = 2 - j11$$

So Cardano's formula actually gives:

$$x = (2 + j) + (2 - j) = 4$$

And $$x = 4$$ **really is** a solution! You can check: $$4^3 - 15(4) - 4 = 64 - 60 - 4 = 0$$ ✅

### The Moral of the Story

**Raphael Bombelli** (1526–1573) was the first to argue: *accept these strange numbers as a necessary tool*. Even if the journey passes through unfamiliar territory, the destination is real and correct.

> 💡 **Analogy:** Imagine traveling from one city to another in Country X. The shortest route passes through Country Y. You start and end in Country X, but the detour through Y saves time. Complex numbers are Country Y — the detour that makes math faster.

It took two more centuries (through the work of **Euler**, **Gauss**, and **Cauchy**) for complex numbers to be fully accepted and appreciated.

---

## Page 3: The Complex Plane and Rectangular Form 📐

### What Is a Complex Number?

A complex number $$z$$ is written as:

$$z = a + jb$$

where:
- $$a$$ = the **real part**: $$\text{Re}(z) = a$$
- $$b$$ = the **imaginary part**: $$\text{Im}(z) = b$$
- $$j = \sqrt{-1}$$ (engineers use $$j$$ instead of $$i$$ to avoid confusion with current)

This is called the **Cartesian** or **rectangular form**.

### Visualizing It: The Complex Plane

Every complex number maps to a unique point on a 2D plane:

```
Imaginary axis (vertical)
        |
   b -- * z = a + jb
        |  /
        | / r
        |/ θ
--------+-----------> Real axis (horizontal)
        |
   -b --* z* = a - jb
```

- **All real numbers** live on the horizontal axis
- **All purely imaginary numbers** live on the vertical axis
- The point $$(a, b)$$ represents $$z = a + jb$$

### Key Vocabulary

| Symbol | Name | Meaning |
|---|---|---|
| $$a$$ | Real part | Horizontal coordinate |
| $$b$$ | Imaginary part | Vertical coordinate |
| $$r$$ | Magnitude (modulus) | Distance from origin |
| $$\theta$$ | Angle (argument) | Angle from positive real axis |

### Computing Magnitude and Angle

From the geometry of the right triangle in the complex plane:

$$r = |z| = \sqrt{a^2 + b^2}$$

$$\theta = \angle z = \tan^{-1}\!\left(\frac{b}{a}\right)$$

> ⚠️ **Watch out!** Your calculator's $$\tan^{-1}$$ only gives angles in the range $$(-90°, 90°)$$. You must check **which quadrant** the point is in and adjust by $$\pm 180°$$ if needed.

---

## Page 4: Polar Form and Euler's Formula 🌟

### From Rectangular to Polar

Since $$a = r\cos\theta$$ and $$b = r\sin\theta$$, we can rewrite:

$$z = a + jb = r\cos\theta + jr\sin\theta = r(\cos\theta + j\sin\theta)$$

### Euler's Formula — The Most Beautiful Equation in Math

$$\boxed{e^{j\theta} = \cos\theta + j\sin\theta}$$

This means:

$$z = r(\cos\theta + j\sin\theta) = re^{j\theta}$$

This is the **polar form** of a complex number.

### What Does $$re^{j\theta}$$ Look Like?

Think of it this way:
- $$r$$ = how far from the origin (the "length")
- $$\theta$$ = which direction you're pointing (the "angle")

### Some Instantly Useful Identities

Using Euler's formula on the unit circle ($$r = 1$$):

| Complex Number | Polar Form | Why? |
|---|---|---|
| $$1$$ | $$e^{j \cdot 0} = e^{j2\pi n}$$ | Angle = 0° |
| $$-1$$ | $$e^{j\pi}$$ | Angle = 180° |
| $$j$$ | $$e^{j\pi/2}$$ | Angle = 90° |
| $$-j$$ | $$e^{-j\pi/2}$$ | Angle = −90° |

> 💡 **Note:** Angles are only known up to multiples of $$2\pi$$. So $$e^{j\theta} = e^{j(\theta + 2\pi n)}$$ for any integer $$n$$.

### Cosine and Sine from Euler's Formula

Adding and subtracting Euler's formula for $$+\theta$$ and $$-\theta$$:

$$\cos\theta = \frac{e^{j\theta} + e^{-j\theta}}{2}$$

$$\sin\theta = \frac{e^{j\theta} - e^{-j\theta}}{2j}$$

These identities are **used constantly** in signals and systems!

---

## Page 5: The Complex Conjugate 🪞

### Definition

The **complex conjugate** of $$z = a + jb$$ is:

$$z^* = a - jb$$

In polar form, if $$z = re^{j\theta}$$, then:

$$z^* = re^{-j\theta}$$

Geometrically, $$z^*$$ is the **mirror image** of $$z$$ reflected across the real axis (see the complex plane diagram on Page 3).

### Why Is the Conjugate Useful?

**1. Extracting the real part:**

$$\text{Re}(z) = \frac{z + z^*}{2}$$

**2. Extracting the imaginary part:**

$$\text{Im}(z) = \frac{z - z^*}{2j}$$

**3. Computing the magnitude squared:**

$$z \cdot z^* = re^{j\theta} \cdot re^{-j\theta} = r^2 = |z|^2$$

This is extremely useful because it turns a complex number into a **real number** through multiplication.

### Quick Example

Let $$z = 3 + j4$$.

- $$z^* = 3 - j4$$
- $$z + z^* = 6 \Rightarrow \text{Re}(z) = 3$$ ✅
- $$z - z^* = j8 \Rightarrow \text{Im}(z) = \frac{j8}{2j} = 4$$ ✅
- $$z \cdot z^* = (3+j4)(3-j4) = 9 + 16 = 25 = |z|^2$$ ✅
- $$|z| = \sqrt{25} = 5$$ ✅

> 💡 **Pro tip:** Whenever you need to divide by a complex number, multiply top and bottom by the conjugate of the denominator. This clears the imaginary part from the bottom.

---

## Page 6: Converting Between Forms — Worked Examples 🔄

### Rectangular → Polar (Cartesian to Polar)

**Step 1:** Compute $$r = \sqrt{a^2 + b^2}$$

**Step 2:** Compute $$\theta = \tan^{-1}(b/a)$$, then **check the quadrant!**

---

**Example (a): $$z = 2 + j3$$**

$$r = \sqrt{4 + 9} = \sqrt{13}$$

$$\theta = \tan^{-1}(3/2) = 56.3°$$ → First quadrant ✅ (calculator is correct)

$$z = \sqrt{13}\, e^{j56.3°}$$

---

**Example (b): $$z = -2 + j1$$**

$$r = \sqrt{4 + 1} = \sqrt{5}$$

Calculator gives: $$\tan^{-1}(1/-2) = -26.6°$$ → But the point is in the **second quadrant**!

Correct angle: $$-26.6° + 180° = 153.4°$$

$$z = \sqrt{5}\, e^{j153.4°}$$

---

**Example (c): $$z = -2 - j3$$**

$$r = \sqrt{4 + 9} = \sqrt{13}$$

Calculator gives: $$\tan^{-1}(-3/-2) = 56.3°$$ → But the point is in the **third quadrant**!

Correct angle: $$56.3° - 180° = -123.7°$$

$$z = \sqrt{13}\, e^{-j123.7°}$$

---

### Polar → Rectangular

Just apply $$a = r\cos\theta$$ and $$b = r\sin\theta$$.

**Example: $$z = 2e^{j\pi/3}$$**

$$a = 2\cos(60°) = 2 \times 0.5 = 1$$

$$b = 2\sin(60°) = 2 \times \frac{\sqrt{3}}{2} = \sqrt{3}$$

$$z = 1 + j\sqrt{3}$$

---

> ⚠️ **Quadrant Cheat Sheet:**
> - Quadrant I: $$a > 0, b > 0$$ → calculator angle is correct
> - Quadrant II: $$a < 0, b > 0$$ → add $$180°$$
> - Quadrant III: $$a < 0, b < 0$$ → subtract $$180°$$ (or add $$180°$$)
> - Quadrant IV: $$a > 0, b < 0$$ → calculator angle is correct

---

## Page 7: Arithmetic with Complex Numbers ➕✖️

### Addition and Subtraction — Use Rectangular Form

$$z_1 + z_2 = (a_1 + a_2) + j(b_1 + b_2)$$

$$z_1 - z_2 = (a_1 - a_2) + j(b_1 - b_2)$$

**Example:** $$z_1 = 3 + j4$$, $$z_2 = 2 + j3$$

$$z_1 + z_2 = 5 + j7$$

$$z_1 - z_2 = 1 + j1$$

---

### Multiplication — Use Polar Form

$$z_1 \cdot z_2 = r_1 r_2\, e^{j(\theta_1 + \theta_2)}$$

**Rule:** Multiply the magnitudes, **add** the angles.

**Example:** $$z_1 = 5e^{j53.1°}$$, $$z_2 = \sqrt{13}\,e^{j56.3°}$$

$$z_1 \cdot z_2 = 5\sqrt{13}\, e^{j109.4°}$$

---

### Division — Use Polar Form

$$\frac{z_1}{z_2} = \frac{r_1}{r_2}\, e^{j(\theta_1 - \theta_2)}$$

**Rule:** Divide the magnitudes, **subtract** the angles.

---

### Powers — Use Polar Form (De Moivre's Theorem)

$$z^n = r^n e^{jn\theta}$$

**Example:** $$(1 + j)^{10}$$

First: $$1 + j = \sqrt{2}\, e^{j45°}$$

Then: $$(1+j)^{10} = (\sqrt{2})^{10} e^{j450°} = 32\, e^{j90°} = 32j$$

---

### Roots

$$z^{1/n} = r^{1/n} e^{j(\theta + 2\pi k)/n}, \quad k = 0, 1, 2, \ldots, n-1$$

There are always **$$n$$ distinct roots** of an $$n$$th-order root.

---

> 💡 **Golden Rule Summary:**
> - **Add/Subtract** → use **Rectangular** form
> - **Multiply/Divide/Powers/Roots** → use **Polar** form

---

## Page 8: Recap and Summary 📋

Great work making it through B.1! Let's pull everything together.

### The Two Forms of a Complex Number

| Form | Expression | Best For |
|---|---|---|
| Rectangular | $$z = a + jb$$ | Addition, subtraction |
| Polar | $$z = re^{j\theta}$$ | Multiplication, division, powers, roots |

### Key Formulas at a Glance

**Converting between forms:**

$$r = |z| = \sqrt{a^2 + b^2} \qquad \theta = \tan^{-1}\!\left(\frac{b}{a}\right) \text{ (check quadrant!)}$$

$$a = r\cos\theta \qquad b = r\sin\theta$$

**Euler's Formula:**

$$e^{j\theta} = \cos\theta + j\sin\theta$$

**Cosine and Sine:**

$$\cos\theta = \frac{e^{j\theta} + e^{-j\theta}}{2} \qquad \sin\theta = \frac{e^{j\theta} - e^{-j\theta}}{2j}$$

**Conjugate:**

$$z^* = a - jb = re^{-j\theta}$$

$$\text{Re}(z) = \frac{z + z^*}{2} \qquad \text{Im}(z) = \frac{z - z^*}{2j} \qquad |z|^2 = zz^*$$

**Arithmetic in polar form:**

$$z_1 z_2 = r_1 r_2\, e^{j(\theta_1+\theta_2)} \qquad \frac{z_1}{z_2} = \frac{r_1}{r_2}\, e^{j(\theta_1-\theta_2)} \qquad z^n = r^n e^{jn\theta}$$

### Key Identities to Memorize

$$e^{j0} = 1 \qquad e^{j\pi} = -1 \qquad e^{j\pi/2} = j \qquad e^{-j\pi/2} = -j$$

### Big-Picture Takeaways

1. Complex numbers are **not mysterious** — they're a powerful mathematical tool
2. The complex plane gives you a **geometric picture** of every complex number
3. **Euler's formula** is the bridge between rectangular and polar forms
4. The conjugate is your best friend for **extracting real/imaginary parts** and computing magnitudes
5. Always check the **quadrant** when computing angles!
6. Complex numbers make signals and systems math **dramatically simpler**

---

## Page 9: Exam-Oriented Quiz Plan 📝

```
QUIZ PLAN — B.1: Complex Numbers
=================================

Format: Mostly multiple-choice; short-answer where calculation is needed
Difficulty: Introductory to intermediate
Coverage: All major topics from B.1
```

---

### Quiz Plan

---

**Q1. [Multiple Choice] — Definition**

Which of the following correctly defines $$j$$?

- A) $$j = -1$$
- B) $$j = \sqrt{-1}$$
- C) $$j = \sqrt{1}$$
- D) $$j = -\sqrt{1}$$

> ✅ **Answer: B**

---

**Q2. [Multiple Choice] — Rectangular Form**

For the complex number $$z = 5 - j3$$, what are $$\text{Re}(z)$$ and $$\text{Im}(z)$$?

- A) $$\text{Re}(z) = 5$$, $$\text{Im}(z) = 3$$
- B) $$\text{Re}(z) = -3$$, $$\text{Im}(z) = 5$$
- C) $$\text{Re}(z) = 5$$, $$\text{Im}(z) = -3$$
- D) $$\text{Re}(z) = -5$$,