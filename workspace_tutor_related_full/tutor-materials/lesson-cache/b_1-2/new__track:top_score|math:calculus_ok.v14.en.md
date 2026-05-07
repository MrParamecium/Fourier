# B.1-2 Algebra of Complex Numbers

---

## Page 1: Section Overview — What Are We Doing Here?

Welcome! This section is all about **working with complex numbers** — the essential mathematical tool that makes signal processing so much easier.

Think of complex numbers as a shortcut. Real-world problems start and end with real numbers, but the path *through* complex numbers is often dramatically shorter. Like taking a highway through another country to get somewhere faster — you start and end at home, but the detour saves you hours.

### What You'll Learn in This Section

By the end of this section, you'll be comfortable with:

1. **Two ways to write a complex number** — rectangular form and polar form
2. **Euler's formula** — the magical bridge between the two forms
3. **The complex conjugate** — what it is and why it's useful
4. **Arithmetic with complex numbers** — adding, subtracting, multiplying, dividing
5. **Powers and roots** of complex numbers
6. **Logarithms** of complex numbers
7. **Avoiding calculator pitfalls** when computing angles

### The Big Picture

Every complex number lives in a **2D plane** called the complex plane:
- The **horizontal axis** holds all real numbers
- The **vertical axis** holds all imaginary numbers
- Every complex number is a **point** (or arrow) in this plane

$$z = a + jb \quad \longleftrightarrow \quad \text{point } (a, b) \text{ in the complex plane}$$

> 📝 **Note:** Engineers use $$j = \sqrt{-1}$$ instead of $$i$$ (which is reserved for electrical current). You'll see $$j$$ throughout this course.

Let's dive in!

---

## Page 2: Two Ways to Write a Complex Number

### Rectangular (Cartesian) Form

The most straightforward way to write a complex number is:

$$z = a + jb$$

where:
- $$a$$ = **real part** → written as $$\text{Re}\, z = a$$
- $$b$$ = **imaginary part** → written as $$\text{Im}\, z = b$$

Think of it like GPS coordinates: $$a$$ tells you how far to go horizontally, $$b$$ tells you how far to go vertically.

---

### Polar Form

You can also describe the same point using a **distance** and an **angle**:

$$z = re^{j\theta}$$

where:
- $$r$$ = **magnitude** (distance from origin) → written as $$|z| = r$$
- $$\theta$$ = **angle** (measured from positive horizontal axis) → written as $$\angle z = \theta$$

---

### The Bridge Between the Two Forms

These two forms describe the **exact same point** — just in different languages. Here's how to convert:

$$\boxed{
\begin{array}{ll}
\text{Polar} \to \text{Rectangular:} & a = r\cos\theta, \quad b = r\sin\theta \\[6pt]
\text{Rectangular} \to \text{Polar:} & r = \sqrt{a^2 + b^2}, \quad \theta = \tan^{-1}\!\left(\dfrac{b}{a}\right)
\end{array}
}$$

---

### Why Two Forms?

| Task | Best Form |
|------|-----------|
| Addition & Subtraction | Rectangular |
| Multiplication & Division | Polar |
| Powers & Roots | Polar |

Each form has its strengths. You'll switch between them constantly — and that's totally normal!

---

## Page 3: Euler's Formula — The Magic Bridge

### The Most Important Formula in This Section

$$\boxed{e^{j\theta} = \cos\theta + j\sin\theta}$$

This is **Euler's formula**, and it's the reason polar form works so beautifully.

---

### Why Is This True? (Maclaurin Series Proof)

We can prove this by expanding each function as an infinite series:

$$e^{j\theta} = 1 + j\theta + \frac{(j\theta)^2}{2!} + \frac{(j\theta)^3}{3!} + \frac{(j\theta)^4}{4!} + \cdots$$

Since $$j^2 = -1$$, $$j^3 = -j$$, $$j^4 = 1$$, and so on, this simplifies to:

$$e^{j\theta} = \underbrace{\left(1 - \frac{\theta^2}{2!} + \frac{\theta^4}{4!} - \cdots\right)}_{\cos\theta} + j\underbrace{\left(\theta - \frac{\theta^3}{3!} + \frac{\theta^5}{5!} - \cdots\right)}_{\sin\theta}$$

✅ Therefore: $$e^{j\theta} = \cos\theta + j\sin\theta$$

---

### Some Instantly Useful Special Cases

Using Euler's formula, you can immediately verify these identities by thinking about angles on the complex plane:

| Number | Polar Form | Why? |
|--------|-----------|------|
| $$1$$ | $$e^{j2\pi n}$$ | Distance 1 from origin, angle $$0$$ (or any multiple of $$2\pi$$) |
| $$-1$$ | $$e^{j\pi}$$ | Distance 1, angle $$\pi$$ |
| $$j$$ | $$e^{j\pi/2}$$ | Distance 1, angle $$\pi/2$$ |
| $$-j$$ | $$e^{-j\pi/2}$$ | Distance 1, angle $$-\pi/2$$ |

> 💡 **Key insight:** The angle of any complex number is only known up to an integer multiple of $$2\pi$$. Adding or subtracting full rotations doesn't change where you are on the plane.

---

### A Useful Application

What happens to $$e^{(\alpha + j\omega)t}$$ as $$t \to \infty$$?

$$e^{(\alpha + j\omega)t} = e^{\alpha t} \cdot e^{j\omega t}$$

Since $$|e^{j\omega t}| = 1$$ always, only $$e^{\alpha t}$$ matters:

$$\lim_{t \to \infty} e^{(\alpha+j\omega)t} = \begin{cases} 0 & \alpha < 0 \\ \infty & \alpha > 0 \end{cases}$$

This will be **extremely useful** later in the course!

---

## Page 4: The Complex Conjugate

### Definition

The **conjugate** of $$z = a + jb$$ is obtained by simply **flipping the sign of the imaginary part**:

$$\boxed{z^* = a - jb = re^{-j\theta}}$$

Graphically, $$z^*$$ is the **mirror image** of $$z$$ reflected across the horizontal (real) axis.

---

### Three Key Properties of Conjugates

**Property 1: Sum gives twice the real part**

$$z + z^* = (a + jb) + (a - jb) = 2a$$

$$\boxed{\text{Re}\, z = \frac{z + z^*}{2}}$$

**Property 2: Difference gives twice the imaginary part**

$$z - z^* = (a + jb) - (a - jb) = 2jb$$

$$\boxed{\text{Im}\, z = \frac{z - z^*}{2j}}$$

**Property 3: Product gives the magnitude squared**

$$z \cdot z^* = re^{j\theta} \cdot re^{-j\theta} = r^2 = |z|^2$$

$$\boxed{z \cdot z^* = |z|^2}$$

---

### Why Do We Care About Conjugates?

The conjugate is your best friend when you need to **eliminate imaginary numbers from a denominator**. To divide complex numbers in rectangular form, multiply top and bottom by the conjugate of the denominator:

$$\frac{z_1}{z_2} = \frac{z_1 \cdot z_2^*}{z_2 \cdot z_2^*} = \frac{z_1 \cdot z_2^*}{|z_2|^2}$$

The denominator becomes a **real number** — no more imaginary parts to worry about!

---

## Page 5: The Angle Quadrant Warning — Don't Trust Your Calculator Blindly!

This is one of the most common sources of errors for beginners. Read carefully!

### The Problem

When converting from rectangular to polar form, you need:

$$\theta = \tan^{-1}\!\left(\frac{b}{a}\right)$$

A basic calculator computes $$\tan^{-1}$$ and **always returns an angle in the first or fourth quadrant** (between $$-90°$$ and $$+90°$$). But your complex number might be in the **second or third quadrant** — and then the calculator is **wrong by 180°**.

---

### The Fix: Always Draw the Point First

| Quadrant | $$a$$ | $$b$$ | Calculator answer | Correct answer |
|----------|--------|--------|-------------------|----------------|
| 1st | $$+$$ | $$+$$ | ✅ Correct | Same as calculator |
| 2nd | $$-$$ | $$+$$ | ❌ Off by 180° | Add 180° |
| 3rd | $$-$$ | $$-$$ | ❌ Off by 180° | Add or subtract 180° |
| 4th | $$+$$ | $$-$$ | ✅ Correct | Same as calculator |

---

### Worked Example: All Four Quadrants

**Express in polar form:**

**(a)** $$2 + j3$$ → 1st quadrant ✅
$$r = \sqrt{4+9} = \sqrt{13}, \quad \theta = \tan^{-1}(3/2) = 56.3°$$
$$2 + j3 = \sqrt{13}\, e^{j56.3°}$$

**(b)** $$-2 + j1$$ → 2nd quadrant ⚠️
$$r = \sqrt{4+1} = \sqrt{5}$$
Calculator gives: $$\tan^{-1}(1/-2) = -26.6°$$ ← **Wrong!**
Correct: $$-26.6° + 180° = 153.4°$$
$$-2 + j1 = \sqrt{5}\, e^{j153.4°}$$

**(c)** $$-2 - j3$$ → 3rd quadrant ⚠️
$$r = \sqrt{13}$$
Calculator gives: $$\tan^{-1}(-3/-2) = 56.3°$$ ← **Wrong!**
Correct: $$56.3° - 180° = -123.7°$$
$$-2 - j3 = \sqrt{13}\, e^{-j123.7°}$$

**(d)** $$1 - j3$$ → 4th quadrant ✅
$$r = \sqrt{10}, \quad \theta = \tan^{-1}(-3/1) = -71.6°$$
$$1 - j3 = \sqrt{10}\, e^{-j71.6°}$$

> 💡 **Pro tip:** MATLAB's `angle()` function correctly handles all four quadrants automatically.

---

## Page 6: Arithmetic — Multiplication, Division, Powers, and Roots

### Addition and Subtraction → Use Rectangular Form

Simply add (or subtract) real parts and imaginary parts separately:

$$(a_1 + jb_1) \pm (a_2 + jb_2) = (a_1 \pm a_2) + j(b_1 \pm b_2)$$

**Example:** $$(3 + j4) + (2 + j3) = 5 + j7$$ ✅ Easy!

---

### Multiplication → Polar Form is Easiest

$$z_1 z_2 = (r_1 e^{j\theta_1})(r_2 e^{j\theta_2}) = r_1 r_2\, e^{j(\theta_1 + \theta_2)}$$

**Rule:** Multiply magnitudes, add angles.

---

### Division → Polar Form is Easiest

$$\frac{z_1}{z_2} = \frac{r_1 e^{j\theta_1}}{r_2 e^{j\theta_2}} = \frac{r_1}{r_2}\, e^{j(\theta_1 - \theta_2)}$$

**Rule:** Divide magnitudes, subtract angles.

---

### Powers → Polar Form

$$z^n = (re^{j\theta})^n = r^n e^{jn\theta}$$

---

### Roots → Polar Form (with a twist!)

The $$n$$-th root has **$$n$$ different values**:

$$\boxed{z^{1/n} = r^{1/n}\, e^{j(\theta + 2\pi k)/n}, \quad k = 0, 1, 2, \ldots, n-1}$$

The value for $$k = 0$$ is called the **principal value**.

---

### Worked Example

For $$z_1 = 3 + j4 = 5e^{j53.1°}$$ and $$z_2 = 2 + j3 = \sqrt{13}\,e^{j56.3°}$$:

**Multiplication (polar):**
$$z_1 z_2 = 5\sqrt{13}\, e^{j109.4°}$$

**Division (polar):**
$$\frac{z_1}{z_2} = \frac{5}{\sqrt{13}}\, e^{-j3.2°} = 1.387\, e^{-j3.2°}$$

**Division (rectangular — using conjugate trick):**
$$\frac{3+j4}{2+j3} \cdot \frac{2-j3}{2-j3} = \frac{(6+12)+j(8-9)}{4+9} = \frac{18-j1}{13} = \frac{18}{13} - j\frac{1}{13}$$

---

### Finding Cube Roots: A Full Example

Find all cube roots of $$z_2 = 8e^{j\pi/3}$$:

$$z_2^{1/3} = 8^{1/3}\, e^{j(\pi/3 + 2\pi k)/3} = 2\, e^{j(\pi/9 + 2\pi k/3)}, \quad k = 0, 1, 2$$

$$k=0: \quad 2e^{j\pi/9} \quad \leftarrow \text{principal value}$$
$$k=1: \quad 2e^{j7\pi/9}$$
$$k=2: \quad 2e^{j13\pi/9}$$

Three roots, equally spaced by $$120°$$ around a circle of radius 2. 🎯

---

## Page 7: Complex Functions and Logarithms

### Complex Functions of a Real Variable

In signal processing, you'll often encounter expressions like:

$$X(\omega) = \frac{2 + j\omega}{3 + j4\omega}$$

where $$\omega$$ is a real variable. You need to find the magnitude and angle as functions of $$\omega$$.

**Step 1 — Rectangular form** (multiply by conjugate of denominator):

$$X(\omega) = \frac{(2+j\omega)(3-j4\omega)}{(3+j4\omega)(3-j4\omega)} = \frac{(6+4\omega^2) - j5\omega}{9+16\omega^2}$$

$$\text{Re}\, X(\omega) = \frac{6+4\omega^2}{9+16\omega^2}, \qquad \text{Im}\, X(\omega) = \frac{-5\omega}{9+16\omega^2}$$

**Step 2 — Polar form** (convert numerator and denominator separately):

$$X(\omega) = \frac{\sqrt{4+\omega^2}\, e^{j\tan^{-1}(\omega/2)}}{\sqrt{9+16\omega^2}\, e^{j\tan^{-1}(4\omega/3)}} = \sqrt{\frac{4+\omega^2}{9+16\omega^2}}\; e^{j\left[\tan^{-1}(\omega/2) - \tan^{-1}(4\omega/3)\right]}$$

---

### Logarithms of Complex Numbers

To take $$\ln z$$, first write $$z$$ in general polar form:

$$z = re^{j(\theta \pm 2\pi k)}, \quad k = 0, 1, 2, \ldots$$

Then:

$$\ln z = \ln r + j(\theta \pm 2\pi k)$$

The **principal value** ($$k = 0$$) is denoted $$\text{Ln}\, z = \ln r + j\theta$.

**Some fun results:**

$$\ln 1 = \pm j2\pi k \quad \Rightarrow \quad \text{Ln}\, 1 = 0$$

$$\ln(-1) = \pm j(2k+1)\pi \quad \Rightarrow \quad \text{Ln}(-1) = j\pi$$

$$\ln j = j\frac{\pi(1 \pm 4k)}{2} \quad \Rightarrow \quad \text{Ln}\, j = j\frac{\pi}{2}$$

$$j^j = e^{j \ln j} = e^{-\pi(1 \pm 4k)/2} \quad \Rightarrow \quad j^j = e^{-\pi/2} \approx 0.208 \quad \text{(a real number!)}$$

**Standard log rules still apply:**

$$\log(z_1 z_2) = \log z_1 + \log z_2, \qquad z^c = e^{c \ln z}, \qquad a^z = e^{z \ln a}$$

---

## Page 8: Recap and Summary

Great work! Let's pull everything together.

---

### 🗺️ The Two Forms of a Complex Number

| Form | Expression | Best for |
|------|-----------|----------|
| Rectangular | $$z = a + jb$$ | Addition, subtraction |
| Polar | $$z = re^{j\theta}$$ | Multiplication, division, powers, roots |

**Converting between them:**

$$r = \sqrt{a^2 + b^2}, \quad \theta = \tan^{-1}(b/a) \text{ (with quadrant check!)}$$
$$a = r\cos\theta, \quad b = r\sin\theta$$

---

### ⚡ Euler's Formula (Memorize This!)

$$e^{j\theta} = \cos\theta + j\sin\theta$$

Special cases: $$e^{j\pi} = -1$$, $$e^{j\pi/2} = j$$, $$e^{j0} = 1$$

---

### 🪞 The Conjugate

$$z^* = a - jb = re^{-j\theta}$$

Key facts:
- $$z +