# B.1-2 Algebra of Complex Numbers

---

## Page 1: Section Overview — What Are We Doing Here?

Welcome! This section is all about **complex numbers** — what they are, how to write them, and how to do math with them. Don't worry if this feels unfamiliar. We'll build everything up step by step.

### Why Do We Even Need Complex Numbers?

Think of it like this: imagine you're traveling from City A to City B. The most *direct* route might pass through a third city, C. You *could* take a longer road that avoids C entirely — but why would you? Complex numbers are that "shortcut city." Real-world problems start and end with real numbers, but using complex numbers in the middle makes the math **much** easier.

### What You'll Learn in This Section

By the end, you'll be comfortable with:

| Topic | What It Means |
|---|---|
| **Rectangular form** | Writing a complex number as $$a + jb$$ |
| **Polar form** | Writing it as $$re^{j\theta}$$ |
| **Euler's formula** | The magical bridge between the two forms |
| **Conjugates** | The "mirror image" of a complex number |
| **Arithmetic** | Adding, subtracting, multiplying, dividing |
| **Powers and roots** | Raising complex numbers to powers |
| **Logarithms** | Taking logs of complex numbers |

### A Quick Heads-Up on Notation

In electrical engineering, we use **$$j$$** (not $$i$$) for the imaginary unit, because $$i$$ is already used for current. So:

$$j = \sqrt{-1}$$

Alright — let's dive in!

---

## Page 2: Rectangular Form — Drawing Complex Numbers on a Plane

### What Is a Complex Number?

A complex number has **two parts**: a real part and an imaginary part. We write it as:

$$z = a + jb$$

where:
- $$a$$ is the **real part**: $$\text{Re}\, z = a$$
- $$b$$ is the **imaginary part**: $$\text{Im}\, z = b$$

### The Complex Plane

Here's the key insight: we can **draw** a complex number as a point on a 2D plane, called the **complex plane**.

```
Imaginary axis
      |
   b  |----• z = a + jb
      |   /
      |  /  r
      | /
      |/ θ
------+-----------> Real axis
      |
  -b  |----• z* = a - jb
```

- The **horizontal axis** holds all real numbers
- The **vertical axis** holds all imaginary numbers
- The point $$(a, b)$$ represents $$z = a + jb$$

### Example

The complex number $$z = 3 + j4$$ is plotted at the point $$(3, 4)$$ in the complex plane. Simple as that!

> 💡 **Key Idea:** Every complex number is just a *point* in 2D space. The real part tells you how far to go right, and the imaginary part tells you how far to go up.

---

## Page 3: Polar Form and Euler's Formula — The Power Move

### From Rectangular to Polar

Instead of describing a point by $$(a, b)$$, we can describe it by:
- **$$r$$**: the distance from the origin (also called the **magnitude** or **absolute value**)
- **$$\theta$$**: the angle from the positive real axis (also called the **angle** or **argument**)

From basic trigonometry:

$$a = r\cos\theta \qquad b = r\sin\theta$$

So we can write:

$$z = a + jb = r\cos\theta + jr\sin\theta = r(\cos\theta + j\sin\theta)$$

### Euler's Formula — The Star of the Show

Here's one of the most beautiful results in all of mathematics:

$$\boxed{e^{j\theta} = \cos\theta + j\sin\theta}$$

**Why is this true?** We can prove it using Maclaurin series expansions:

$$e^{j\theta} = 1 + j\theta - \frac{\theta^2}{2!} - j\frac{\theta^3}{3!} + \frac{\theta^4}{4!} + \cdots$$

$$\cos\theta = 1 - \frac{\theta^2}{2!} + \frac{\theta^4}{4!} - \cdots$$

$$\sin\theta = \theta - \frac{\theta^3}{3!} + \frac{\theta^5}{5!} - \cdots$$

When you add $$\cos\theta + j\sin\theta$$, you get exactly $$e^{j\theta}$$. ✓

### The Polar Form

Plugging Euler's formula in, we get the **polar form**:

$$\boxed{z = re^{j\theta}}$$

### Converting Between Forms

$$\begin{array}{ll}
\text{Polar} \to \text{Rectangular:} & a = r\cos\theta, \quad b = r\sin\theta \\[6pt]
\text{Rectangular} \to \text{Polar:} & r = \sqrt{a^2 + b^2}, \quad \theta = \tan^{-1}\!\left(\dfrac{b}{a}\right)
\end{array}$$

We also write $$r = |z|$$ (magnitude) and $$\theta = \angle z$$ (angle).

> 💡 **Think of it this way:** Rectangular form says "go 3 steps right, 4 steps up." Polar form says "go 5 steps at an angle of 53°." Same destination, different directions!

---

## Page 4: The Angle Quadrant Problem — A Critical Warning

### The Calculator Trap

This is one of the most common mistakes students make. When computing $$\theta = \tan^{-1}(b/a)$$, your calculator only gives correct answers for the **first and fourth quadrants**.

For numbers in the **second or third quadrant**, the calculator is off by $$180°$$. You must correct it manually.

### The Four Quadrants

```
        Im
         |
  Q2     |     Q1
 (-,+)   |   (+,+)
---------+---------  Re
  Q3     |     Q4
 (-,-)   |   (+,-)
         |
```

### Rule of Thumb

Always **draw the point first**, identify the quadrant, then correct if needed:

| Quadrant | Sign of $$a$$ | Sign of $$b$$ | Calculator correct? |
|---|---|---|---|
| Q1 | + | + | ✅ Yes |
| Q2 | − | + | ❌ Add or subtract 180° |
| Q3 | − | − | ❌ Add or subtract 180° |
| Q4 | + | − | ✅ Yes |

### Worked Example: All Four Quadrants

**Find the polar form of $$-2 - j3$$** (this is in Q3):

$$r = \sqrt{(-2)^2 + (-3)^2} = \sqrt{13}$$

Calculator gives: $$\tan^{-1}(3/2) = 56.3°$$ ← **Wrong!** (Q3 number, Q1 answer)

Correct answer: $$56.3° - 180° = -123.7°$$

$$\boxed{-2 - j3 = \sqrt{13}\, e^{-j123.7°}}$$

> 💡 **Pro tip:** MATLAB's `angle()` function handles all four quadrants correctly. But on exams, always draw the point!

---

## Page 5: The Conjugate — Mirror Images

### Definition

The **conjugate** of $$z = a + jb$$ is written $$z^*$$ and defined as:

$$\boxed{z^* = a - jb = re^{-j\theta}}$$

Geometrically, $$z^*$$ is the **mirror image** of $$z$$ reflected across the real axis.

```
Im
 |
 b |----• z = a + jb
 |
-+-----------> Re
 |
-b |----• z* = a - jb
 |
```

**To find the conjugate:** simply replace every $$j$$ with $$-j$$.

### Three Super-Useful Conjugate Identities

**1. Sum gives real part:**

$$z + z^* = (a + jb) + (a - jb) = 2a$$

$$\Rightarrow \quad \text{Re}\, z = \frac{z + z^*}{2}$$

**2. Difference gives imaginary part:**

$$z - z^* = 2jb$$

$$\Rightarrow \quad \text{Im}\, z = \frac{z - z^*}{2j}$$

**3. Product gives magnitude squared:**

$$z \cdot z^* = re^{j\theta} \cdot re^{-j\theta} = r^2 = |z|^2$$

This last identity is **extremely useful** for division — multiply top and bottom by the conjugate of the denominator to clear imaginary terms.

> 💡 **Memory trick:** The conjugate just "flips" the imaginary part. Everything real stays the same.

---

## Page 6: Arithmetic — Adding, Multiplying, Dividing

### Addition and Subtraction → Use Rectangular Form

$$z_1 + z_2 = (a_1 + jb_1) + (a_2 + jb_2) = (a_1 + a_2) + j(b_1 + b_2)$$

Just add real parts together and imaginary parts together. Easy!

**Example:** $$z_1 = 3 + j4$$, $$z_2 = 2 + j3$$

$$z_1 + z_2 = 5 + j7$$

### Multiplication and Division → Use Polar Form

If $$z_1 = r_1 e^{j\theta_1}$$ and $$z_2 = r_2 e^{j\theta_2}$$:

$$\boxed{z_1 z_2 = r_1 r_2\, e^{j(\theta_1 + \theta_2)}}$$

$$\boxed{\frac{z_1}{z_2} = \frac{r_1}{r_2}\, e^{j(\theta_1 - \theta_2)}}$$

**Multiply magnitudes, add angles. Divide magnitudes, subtract angles.**

### Division in Rectangular Form (When You Must)

Multiply numerator and denominator by the **conjugate of the denominator**:

$$\frac{z_1}{z_2} = \frac{3 + j4}{2 + j3} \cdot \frac{2 - j3}{2 - j3} = \frac{(3+j4)(2-j3)}{4 + 9} = \frac{18 - j1}{13} = \frac{18}{13} - j\frac{1}{13}$$

### Powers and Roots → Polar Form Shines

$$z^n = (re^{j\theta})^n = r^n e^{jn\theta}$$

$$z^{1/n} = r^{1/n} e^{j\theta/n}$$

For **all $$n$$ roots** (there are exactly $$n$$ of them!):

$$\boxed{z^{1/n} = r^{1/n}\, e^{j(\theta + 2\pi k)/n}, \quad k = 0, 1, 2, \ldots, n-1}$$

> 💡 **The big picture:** Use rectangular for $$+/-$$, use polar for $$\times/\div$$ and powers. Switch between forms as needed!

---

## Page 7: Worked Examples — Putting It All Together

### Example A: Cartesian → Polar (All Quadrants)

| Number | $$r$$ | Calculator $$\theta$$ | Quadrant | Correction | Final $$\theta$$ |
|---|---|---|---|---|---|
| $$2 + j3$$ | $$\sqrt{13}$$ | $$56.3°$$ | Q1 | None | $$56.3°$$ |
| $$-2 + j1$$ | $$\sqrt{5}$$ | $$-26.6°$$ | Q2 | $$+180°$$ | $$153.4°$$ |
| $$-2 - j3$$ | $$\sqrt{13}$$ | $$56.3°$$ | Q3 | $$-180°$$ | $$-123.7°$$ |
| $$1 - j3$$ | $$\sqrt{10}$$ | $$-71.6°$$ | Q4 | None | $$-71.6°$$ |

### Example B: Polar → Cartesian

$$2e^{j\pi/3} = 2\!\left(\cos\frac{\pi}{3} + j\sin\frac{\pi}{3}\right) = 2\!\left(\frac{1}{2} + j\frac{\sqrt{3}}{2}\right) = 1 + j\sqrt{3}$$

$$4e^{-j3\pi/4} = 4\!\left(\cos\frac{3\pi}{4} - j\sin\frac{3\pi}{4}\right) = -2\sqrt{2} - j2\sqrt{2}$$

### Example C: Finding All Cube Roots

Find all cube roots of $$z_2 = 8e^{j\pi/3}$$:

Write in general form: $$8e^{j(\pi/3 + 2\pi k)}$$, then:

$$z_2^{1/3} = 8^{1/3} e^{j(\pi/3 + 2\pi k)/3} = 2e^{j(\pi + 6\pi k)/9}$$

$$k=0: \quad 2e^{j\pi/9} \quad \leftarrow \text{principal value}$$
$$k=1: \quad 2e^{j7\pi/9}$$
$$k=2: \quad 2e^{j13\pi/9}$$

> 💡 **Notice:** Three cube roots, equally spaced by $$2\pi/3$$ radians around a circle of radius 2. Beautiful!

---

## Page 8: Logarithms and Special Identities

### Logarithms of Complex Numbers

To take $$\ln z$$, first write $$z = re^{j(\theta \pm 2\pi k)}$$:

$$\ln z = \ln r + j(\theta \pm 2\pi k), \quad k = 0, 1, 2, \ldots$$

The **principal value** ($$k = 0$$) is written $$\text{Ln}\, z = \ln r + j\theta$.

### Some Surprising Results

$$\ln 1 = \pm j2\pi k \quad (k = 0, 1, 2, \ldots) \qquad \text{Principal value: } 0$$

$$\ln(-1) = \pm j(2k+1)\pi \qquad \text{Principal value: } j\pi$$

$$\ln j = j\frac{\pi(1 \pm 4k)}{2} \qquad \text{Principal value: } j\frac{\pi}{2}$$

$$j^j = e^{j \ln j} = e^{-\pi(1 \pm 4k)/2} \qquad \text{Principal value: } e^{-\pi/2} \approx 0.208$$

> 💡 **Surprising fact:** $$j^j$$ is a *real number*! That's the kind of magic complex numbers produce.

### Familiar Log Rules Still Apply

$$\log(z_1 z_2) = \log z_1 + \log z_2$$

$$\log(z_1/z_2) = \log z_1 - \log z_2$$

$$z^c = e^{c \ln z}$$

### Understanding Key Identities Geometrically

Since $$re^{j\theta}$$ is a point at distance $$r$$ and angle $$\theta$$:

| Number | Distance from origin | Angle |
|---|---|---|
| $$1$$ | 1 | $$0$$ (or $$2\pi k$$) |
| $$-1$$ | 1 | $$\pi$$ (or $$\pi + 2\pi k$$) |
| $$j$$ | 1 | $$\pi/2$$ |
| $$-j$$ | 1 | $$-\pi/2$$ |

---

## Page 9: Recap and Summary

Great work! Let's pull everything together.

### The Two Forms of a Complex Number

$$\underbrace{z = a + jb}_{\text{Rectangular}} \qquad \longleftrightarrow \qquad \underbrace{z = re^{j\theta}}_{\text{Polar}}$$

**Conversion formulas:**

$$r = \sqrt{a^2 + b^2}, \quad \theta = \tan^{-1}(b/a) \text{ (with quadrant check!)}$$
$$a = r\cos\theta, \quad b = r\sin\theta$$

### Euler's Formula (Memorize This!)

$$e^{j\theta} = \cos\theta + j\sin\theta$$

### The Conjugate

$$z^* = a - jb = re^{-j\theta}$$

Key results: $$\quad z + z^* = 2\,\text{Re}\,z \quad$$ and $$\quad zz^* = |z|^2$$

### Which Form to Use for Which Operation?

| Operation | Best Form |
|---|---|
| Addition / Subtraction | **Rectangular** |
| Multiplication / Division | **Polar** |
| Powers / Roots | **Polar** |
| Logarithms | **Polar** |

### Operations in Polar Form

$$z_1 z_2 = r_1 r_2\, e^{j(\theta_1+\theta_2)} \qquad \frac{z_1}{z_2} = \frac{r_1}{r_2}\, e^{j(\theta_1-\theta_2)}$$

$$z^n = r^n e^{jn\theta} \qquad z^{1/n} = r^{1/n} e^{j(\theta+2\pi k)/n}, \quad k=0,1,\ldots,n-1$$

### The Quadrant Warning (Never Forget!)

- Q1 and Q4: calculator's $$\tan^{-1}$$ is correct ✅
- Q2 and Q3: add or subtract $$180°$$ to fix the answer ❌→✅

### The Big Picture

> Complex numbers let us do hard problems easily. Real-world problems start and end with real numbers, but complex numbers are the shortcut through the middle. Master these tools and you'll have a superpower for the rest of this course!

---

## Page 10: Quiz Plan (Exam-Oriented)

### Quiz Plan: B.1-2 Algebra of Complex Numbers

---

**Q1.** *(Multiple Choice)* Which of the following correctly expresses $$z = -1 + j\sqrt{3}$$ in polar form?

- A) $$2e^{j\pi/3}$$
- B) $$2e^{j2\pi/3}$$
- C) $$\sqrt{2}\, e^{j2\pi/3}$$
- D)