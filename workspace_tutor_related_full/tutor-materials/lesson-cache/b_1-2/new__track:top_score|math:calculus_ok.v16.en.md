# B.1-2 Algebra of Complex Numbers

---

## Page 1: Section Overview — What Are We Doing Here?

Welcome! In this section, we're going to learn how to **work with complex numbers** — not just understand what they are, but actually *do things* with them: add, subtract, multiply, divide, take powers, find roots, and more.

### Why Should You Care?

Think of it this way: imagine you need to travel from City A to City B, but the direct road is bumpy and slow. There's a highway that goes through City C — it's faster, even though it's a detour. **Complex numbers are that highway.** Real-world problems start and end with real numbers, but going through the "land of complex numbers" makes the math dramatically easier.

### What You'll Learn in This Section

Here's a roadmap of the key ideas we'll cover:

| Topic | What It Means |
|---|---|
| **Rectangular Form** | Writing a complex number as $$a + jb$$ |
| **Polar Form** | Writing it as $$re^{j\theta}$$ |
| **Conjugate** | Flipping the sign of the imaginary part |
| **Arithmetic** | Adding, subtracting, multiplying, dividing |
| **Powers and Roots** | Raising to powers, finding nth roots |
| **Logarithms** | Taking logs of complex numbers |
| **Angle Quadrant Warning** | A critical calculator pitfall to avoid |

### The Two "Languages" of Complex Numbers

Every complex number can be written in **two equivalent ways**:

$$z = a + jb \quad \longleftrightarrow \quad z = re^{j\theta}$$

Think of these like Celsius and Fahrenheit — same temperature, different expression. Knowing when to use each form is the real skill we're building here.

> 💡 **Note:** In electrical engineering, we use $$j = \sqrt{-1}$$ instead of $$i$$ (which is reserved for current).

Let's dive in!

---

## Page 2: Rectangular and Polar Forms — Two Ways to Describe a Complex Number

### The Rectangular Form

A complex number $$z$$ in **rectangular (Cartesian) form** looks like this:

$$z = a + jb$$

- $$a$$ is the **real part**: $$\text{Re}\, z = a$$
- $$b$$ is the **imaginary part**: $$\text{Im}\, z = b$$

You can plot this as a point $$(a, b)$$ on the **complex plane** — just like an $$(x, y)$$ coordinate, but the vertical axis represents imaginary numbers.

```
Imaginary
    |
  b |----• z = a + jb
    |   /
    |  / r
    | /
    |/ θ
    +-------------- Real
    0      a
```

### The Polar Form

Instead of using horizontal and vertical distances, **polar form** uses:
- $$r$$ — the **distance** from the origin (also called the **magnitude** or **absolute value**)
- $$\theta$$ — the **angle** from the positive real axis

The connection between the two forms comes from basic trigonometry:

$$a = r\cos\theta \qquad b = r\sin\theta$$

So we can write:

$$z = r\cos\theta + jr\sin\theta = r(\cos\theta + j\sin\theta)$$

### Euler's Formula — The Magic Bridge

Here's one of the most beautiful results in all of mathematics:

$$\boxed{e^{j\theta} = \cos\theta + j\sin\theta}$$

This is **Euler's formula**, and it's proven using Maclaurin series expansions of $$e^{j\theta}$$, $$\cos\theta$$, and $$\sin\theta$$:

$$e^{j\theta} = 1 + j\theta - \frac{\theta^2}{2!} - j\frac{\theta^3}{3!} + \frac{\theta^4}{4!} + \cdots$$

$$\cos\theta = 1 - \frac{\theta^2}{2!} + \frac{\theta^4}{4!} - \cdots$$

$$\sin\theta = \theta - \frac{\theta^3}{3!} + \frac{\theta^5}{5!} - \cdots$$

Combining the cosine and sine series with the appropriate $$j$$ factors gives exactly $$e^{j\theta}$$. ✓

### The Polar Form, Cleanly Written

Using Euler's formula:

$$\boxed{z = re^{j\theta}}$$

### Converting Between Forms

$$\begin{array}{ll}
\text{Polar} \to \text{Rectangular:} & a = r\cos\theta, \quad b = r\sin\theta \[6pt]
\text{Rectangular} \to \text{Polar:} & r = \sqrt{a^2 + b^2}, \quad \theta = \tan^{-1}\!\left(\dfrac{b}{a}\right)
\end{array}$$

> ⚠️ **Watch out!** The formula $$\theta = \tan^{-1}(b/a)$$ can give wrong answers depending on which quadrant your number is in. We'll cover this carefully on the next page!

### Useful Shorthand Notation

Since $$r = |z|$$ (magnitude) and $$\theta = \angle z$$ (angle), we can also write:

$$z = |z|\, e^{j\angle z}$$

---

## Page 3: The Quadrant Problem — A Critical Calculator Warning

This is one of the most common sources of errors for beginners. **Pay close attention!**

### The Problem with $$\tan^{-1}$$

When you compute $$\theta = \tan^{-1}(b/a)$$, a basic calculator only gives you angles in the **first and fourth quadrants** (between $$-90°$$ and $$+90°$$). But complex numbers can live in any of the four quadrants!

If your number is in the **second or third quadrant**, the calculator's answer is **off by 180°**.

### The Four Quadrants — A Visual Guide

```
        Imaginary
            |
  Q2 (-,+)  |  Q1 (+,+)
             |
  -----------+----------- Real
             |
  Q3 (-,-)  |  Q4 (+,-)
            |
```

| Quadrant | Sign of $$a$$ | Sign of $$b$$ | Calculator correct? |
|---|---|---|---|
| Q1 | + | + | ✅ Yes |
| Q2 | − | + | ❌ Off by 180° |
| Q3 | − | − | ❌ Off by 180° |
| Q4 | + | − | ✅ Yes |

### The Fix

**Step 1:** Draw the point in the complex plane.
**Step 2:** Identify which quadrant it's in.
**Step 3:** If Q2 or Q3, add or subtract 180° from the calculator's answer.
**Step 4:** Choose the **principal value** — the angle with absolute value less than 180°.

### Worked Examples — Cartesian to Polar

**Example (a): $$2 + j3$$ — First Quadrant ✅**

$$r = \sqrt{2^2 + 3^2} = \sqrt{13}, \qquad \theta = \tan^{-1}\!\left(\frac{3}{2}\right) = 56.3°$$

Calculator is correct. Answer:

$$2 + j3 = \sqrt{13}\, e^{j56.3°}$$

---

**Example (b): $$-2 + j1$$ — Second Quadrant ❌**

$$r = \sqrt{(-2)^2 + 1^2} = \sqrt{5}$$

Calculator gives: $$\tan^{-1}(1/-2) = -26.6°$$ ← **Wrong!**

Correct answer: $$-26.6° + 180° = 153.4°$$ (principal value)

$$-2 + j1 = \sqrt{5}\, e^{j153.4°}$$

---

**Example (c): $$-2 - j3$$ — Third Quadrant ❌**

$$r = \sqrt{(-2)^2 + (-3)^2} = \sqrt{13}$$

Calculator gives: $$\tan^{-1}(-3/-2) = \tan^{-1}(3/2) = 56.3°$$ ← **Wrong!**

Correct answer: $$56.3° - 180° = -123.7°$$ (principal value)

$$-2 - j3 = \sqrt{13}\, e^{-j123.7°}$$

---

**Example (d): $$1 - j3$$ — Fourth Quadrant ✅**

$$r = \sqrt{1^2 + (-3)^2} = \sqrt{10}, \qquad \theta = \tan^{-1}(-3/1) = -71.6°$$

Calculator is correct. Answer:

$$1 - j3 = \sqrt{10}\, e^{-j71.6°}$$

---

> 💡 **Pro tip:** MATLAB's `angle()` function correctly handles all four quadrants automatically. Always use `atan2(b, a)` instead of `atan(b/a)` when programming.

---

## Page 4: The Conjugate — Mirror Image in the Complex Plane

### Definition

The **conjugate** of $$z = a + jb$$ is written $$z^*$$ and defined as:

$$\boxed{z^* = a - jb = re^{-j\theta} = |z|\,e^{-j\angle z}}$$

In plain English: **flip the sign of the imaginary part** (or equivalently, flip the sign of the angle).

### Visualizing the Conjugate

$$z^*$$ is the **mirror image** of $$z$$ reflected across the real (horizontal) axis:

```
Imaginary
    |
  b |----• z = a + jb
    |
    +-------------- Real
    |
 -b |----• z* = a - jb
    |
```

### Three Key Properties of the Conjugate

**Property 1: Sum gives twice the real part**

$$z + z^* = (a + jb) + (a - jb) = 2a$$

$$\boxed{\text{Re}\, z = \frac{z + z^*}{2}}$$

**Property 2: Difference gives twice the imaginary part**

$$z - z^* = (a + jb) - (a - jb) = 2jb$$

$$\boxed{\text{Im}\, z = \frac{z - z^*}{2j}}$$

**Property 3: Product gives the magnitude squared**

$$z \cdot z^* = |z|e^{j\theta} \cdot |z|e^{-j\theta} = |z|^2$$

$$\boxed{z \cdot z^* = |z|^2 = a^2 + b^2}$$

> 💡 **Why is Property 3 so useful?** When you need to divide by a complex number, multiply top and bottom by the conjugate of the denominator. This makes the denominator a **real number**, which is easy to handle!

### Example: Using the Conjugate for Division

$$\frac{3 + j4}{2 + j3} = \frac{(3 + j4)(2 - j3)}{(2 + j3)(2 - j3)} = \frac{(6+12) + j(8-9)}{4 + 9} = \frac{18 - j1}{13} = \frac{18}{13} - j\frac{1}{13}$$

Notice how multiplying by the conjugate $$2 - j3$$ cleared the imaginary part from the denominator.

### Some Useful Identities Using the Complex Plane

Since $$re^{j\theta}$$ represents a point at distance $$r$$ and angle $$\theta$$:

| Number | Distance from origin | Angle | Polar form |
|---|---|---|---|
| $$1$$ | 1 | $$0$$ | $$e^{j2\pi n}$$ |
| $$-1$$ | 1 | $$\pi$$ | $$e^{j(\pi + 2\pi n)}$$ |
| $$j$$ | 1 | $$\pi/2$$ | $$e^{j(\pi/2 + 2\pi n)}$$ |
| $$-j$$ | 1 | $$-\pi/2$$ | $$e^{j(-\pi/2 + 2\pi n)}$$ |

> 📝 **Note:** The angle of any complex number is only known up to an integer multiple of $$2\pi$$. That's why we always report the **principal value** (the one with smallest absolute value).

---

## Page 5: Arithmetic — Addition, Multiplication, Division, Powers, and Roots

Now for the practical stuff. The key insight is: **use the right form for the right operation.**

### The Golden Rule

| Operation | Best Form to Use |
|---|---|
| Addition / Subtraction | **Rectangular** $$a + jb$$ |
| Multiplication / Division | **Polar** $$re^{j\theta}$$ |
| Powers / Roots | **Polar** $$re^{j\theta}$$ |

---

### Addition and Subtraction — Use Rectangular Form

Simply combine real parts and imaginary parts separately:

$$(a_1 + jb_1) \pm (a_2 + jb_2) = (a_1 \pm a_2) + j(b_1 \pm b_2)$$

**Example:**

$$z_1 = 3 + j4, \quad z_2 = 2 + j3$$

$$z_1 + z_2 = 5 + j7$$

---

### Multiplication — Use Polar Form

$$z_1 z_2 = (r_1 e^{j\theta_1})(r_2 e^{j\theta_2}) = r_1 r_2\, e^{j(\theta_1 + \theta_2)}$$

**Multiply the magnitudes, add the angles.**

**Example:**

$$z_1 = 5e^{j53.1°}, \quad z_2 = \sqrt{13}\,e^{j56.3°}$$

$$z_1 z_2 = 5\sqrt{13}\, e^{j109.4°}$$

---

### Division — Use Polar Form

$$\frac{z_1}{z_2} = \frac{r_1 e^{j\theta_1}}{r_2 e^{j\theta_2}} = \frac{r_1}{r_2}\, e^{j(\theta_1 - \theta_2)}$$

**Divide the magnitudes, subtract the angles.**

**Example:**

$$\frac{z_1}{z_2} = \frac{5}{\sqrt{13}}\, e^{j(53.1° - 56.3°)} = \frac{5}{\sqrt{13}}\, e^{-j3.2°}$$

---

### Powers — Use Polar Form

$$(re^{j\theta})^n = r^n e^{jn\theta}$$

**Raise the magnitude to the power, multiply the angle by the power.**

---

### Roots — Use Polar Form (Carefully!)

The $$n$$th root of a complex number has **$$n$$ different values**:

$$z^{1/n} = \left[re^{j(\theta + 2\pi k)}\right]^{1/n} = r^{1/n}\, e^{j(\theta + 2\pi k)/n}, \quad k = 0, 1, 2, \ldots, n-1$$

The value for $$k = 0$$ is the **principal value**.

**Example: Find all cube roots of $$8e^{j\pi/3}$$**

$$r^{1/3} = 8^{1/3} = 2, \qquad \theta_k = \frac{\pi/3 + 2\pi k}{3}$$

$$k=0: \quad 2e^{j\pi/9}$$

$$k=1: \quad 2e^{j7\pi/9}$$

$$k=2: \quad 2e^{j13\pi/9}$$

> 💡 **Why $$n$$ roots?** Because adding $$2\pi k$$ to the angle doesn't change the original number (full rotations), but after dividing by $$n$$, those extra rotations *do* produce different angles — and thus different roots!

---

### Reciprocal

$$\frac{1}{z} = \frac{1}{re^{j\theta}} = \frac{1}{r}\, e^{-j\theta}$$

---

## Page 6: Logarithms of Complex Numbers

Taking logarithms of complex numbers follows naturally from the polar form.

### Setting Up

Write $$z$$ in its most general polar form (including all equivalent angles):

$$z = re^{j(\theta \pm 2\pi k)}, \quad k = 0, 1, 2, 3, \ldots$$

### Taking the Natural Log

$$\ln z = \ln\!\left[re^{j(\theta \pm 2\pi k)}\right] = \ln r \pm j(\theta + 2\pi k)$$

The value for $$k = 0$$ is the **principal value**, written $$\text{Ln}\, z$$:

$$\text{Ln}\, z = \ln r + j\theta$$

### Key Examples

**$$\ln 1$$:**

$$1 = e^{\pm j2\pi k} \implies \ln 1 = \pm j2\pi k, \quad k = 0, 1, 2, \ldots$$

Principal value: $$\text{Ln}\, 1 = 0$$ ✓

---

**$$\ln(-1)$$:**

$$-1 = e^{j\pi(2k+1)} \implies \ln(-1) = \pm j(2k+1)\pi$$

Principal value: $$\text{Ln}(-1) = j\pi$$

---

**$$\ln j$$:**

$$j = e^{j\pi(1\pm 4k)/2} \implies \ln j = j\frac{\pi(1 \pm 4k)}{2}$$

Principal value: $$\text{Ln}\, j = j\frac{\pi}{2}$$

---

**The remarkable result $$j^j$$:**

$$j^j = e^{j \ln j} = e^{j \cdot j\pi/2} = e^{-\pi/2} \approx 0.2079$$

$$j^j$$ is a **real number**! (Principal value)

---

### Familiar Log Properties Still Hold

$$\log(z_1 z_2) = \log z_1 + \log z_2$$

$$\log(z_1/z_2) = \log z_1 - \log z_2$$

$$z^c = e^{c \ln z}$$

$$a^z = e^{z \ln a}$$

> 💡 These are the same rules you know from real numbers — they extend naturally to complex numbers.

---

### A Useful Application: Limits Involving Complex Exponentials

Consider $$e^{(\alpha + j\omega)t}$$:

$$e^{(\alpha + j\omega)t} = e^{\alpha t} \cdot e^{j\omega t}$$

Since $$|e^{j