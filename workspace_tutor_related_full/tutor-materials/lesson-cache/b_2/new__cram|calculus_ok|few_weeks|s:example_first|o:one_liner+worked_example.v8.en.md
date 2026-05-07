# Section B.2: Sinusoids

---

## Page 1: Section Overview — What Are We Covering?

Welcome to Section B.2! This section is all about **sinusoids** — the fundamental building blocks of signal processing. If you've ever seen a wave on an oscilloscope or heard about "sine waves," this is exactly what we're talking about.

### What You'll Learn in This Section

By the end of B.2, you'll be comfortable with:

- 📐 **The anatomy of a sinusoid** — amplitude, frequency, and phase
- ⏱️ **Period and frequency** — how they relate to each other
- 🔄 **Radian frequency vs. hertzian frequency** — two ways to measure "how fast"
- ↔️ **Phase shifts** — how delaying or advancing a wave changes its equation
- ➕ **Adding sinusoids** — combining two waves of the same frequency into one
- 📊 **Phasors** — a clever graphical tool for adding sinusoids

### The Big Picture

The general sinusoid we'll study throughout this section looks like this:

$$x(t) = C \cos(2\pi f_0 t + \theta)$$

This one equation contains everything — the **height** of the wave ($C$), the **speed** of oscillation ($f_0$), and the **starting position** ($\theta$). Let's unpack it all, step by step.

> 💡 **Why does this matter?** Almost every signal in nature — sound, light, electrical signals — can be built from sinusoids. Understanding them is the foundation of everything in this course.

---

## Page 2: The Anatomy of a Sinusoid — Amplitude, Frequency, and Phase

### The General Sinusoid

$$x(t) = C \cos(2\pi f_0 t + \theta) \tag{B.13}$$

Let's break down each piece:

| Symbol | Name | What It Controls |
|--------|------|-----------------|
| $C$ | **Amplitude** | The peak height of the wave |
| $f_0$ | **Frequency** (Hz) | How many complete cycles per second |
| $\theta$ | **Phase** | Where the wave "starts" at $t = 0$ |

---

### Why Does the Wave Repeat?

Here's the key insight. The cosine function repeats every time its **angle** increases by $2\pi$:

$$\cos(\varphi) = \cos(\varphi + 2n\pi), \quad n = 0, \pm1, \pm2, \pm3, \ldots$$

In our sinusoid, the angle is $(2\pi f_0 t + \theta)$. This angle increases by $2\pi$ when $t$ increases by $\frac{1}{f_0}$.

So the wave **repeats every** $\frac{1}{f_0}$ **seconds**. This repetition interval is called the **period**:

$$\boxed{T_0 = \frac{1}{f_0}} \tag{B.14}$$

> 💡 **Plain English:** If $f_0 = 5$ Hz, the wave completes 5 full cycles every second, and each cycle takes $T_0 = \frac{1}{5} = 0.2$ seconds.

---

### Two Special Cases

**Case 1: Zero phase** ($\theta = 0$)

$$x(t) = C \cos(2\pi f_0 t)$$

This is a pure cosine — it starts at its maximum value $C$ when $t = 0$.

**Case 2: Phase of** $-\pi/2$

$$x(t) = C \cos\!\left(2\pi f_0 t - \frac{\pi}{2}\right) = C \sin(2\pi f_0 t)$$

This is a pure sine wave — it starts at zero when $t = 0$.

> 🔑 **Key takeaway:** Sine and cosine are the *same shape* — just shifted relative to each other!

---

### A Note on Degrees vs. Radians

Phase $\theta$ can be expressed in **degrees** or **radians**. Both are valid:

$$24° = 0.419 \text{ radians}$$

The textbook sometimes uses degrees because they feel more intuitive. But **always be consistent** — never mix degrees and radians in the same expression!

---

## Page 3: Radian Frequency — A Cleaner Way to Write Things

### Introducing $\omega_0$

Writing $2\pi f_0$ over and over gets tedious. So we define the **radian frequency** (also called angular frequency):

$$\boxed{\omega_0 = 2\pi f_0} \tag{B.15}$$

With this, our sinusoid becomes much cleaner:

$$x(t) = C \cos(\omega_0 t + \theta)$$

---

### The Relationships Between $T_0$, $f_0$, and $\omega_0$

These three quantities all describe the same thing — "how fast" — just in different units:

$$T_0 = \frac{1}{f_0} = \frac{2\pi}{\omega_0}$$

$$\omega_0 = 2\pi f_0 = \frac{2\pi}{T_0}$$

$$f_0 = \frac{\omega_0}{2\pi} = \frac{1}{T_0}$$

> ⚠️ **Common confusion:** When someone says "the frequency is $\omega_0$," they mean the **radian** frequency. The actual **hertzian** (cycles-per-second) frequency is $f_0 = \omega_0 / 2\pi$. These are different numbers!

---

### Quick Example

Suppose $\omega_0 = 100\pi$ rad/s. Then:

$$f_0 = \frac{100\pi}{2\pi} = 50 \text{ Hz}$$

$$T_0 = \frac{1}{50} = 0.02 \text{ seconds}$$

So the wave completes one full cycle every 20 milliseconds.

---

### Summary Table

| Quantity | Symbol | Units | Formula |
|----------|--------|-------|---------|
| Period | $T_0$ | seconds | $1/f_0 = 2\pi/\omega_0$ |
| Hertzian frequency | $f_0$ | Hz (cycles/sec) | $1/T_0 = \omega_0/2\pi$ |
| Radian frequency | $\omega_0$ | rad/sec | $2\pi f_0 = 2\pi/T_0$ |

---

## Page 4: Phase Shifts — Sliding the Wave Left or Right

### What Does Phase Do?

The phase $\theta$ in $C\cos(\omega_0 t + \theta)$ controls **where the wave starts**. Changing $\theta$ slides the wave horizontally:

- **Positive $\theta$** → wave shifts **left** (advances in time)
- **Negative $\theta$** → wave shifts **right** (delays in time)

---

### The Key Idea: Angle ↔ Time

A sinusoid completes **360°** of phase change in **one full period** $T_0$. So:

$$\text{Time shift} = \frac{\theta}{360°} \times T_0 \quad \text{(when } \theta \text{ is in degrees)}$$

Or in radians:

$$\text{Time shift} = \frac{\theta}{2\pi} \times T_0$$

---

### Example: Sketching $C\cos(\omega_0 t - 60°)$

Start with $C\cos(\omega_0 t)$ and ask: how far do we shift it?

$$\text{Time shift} = \frac{60°}{360°} \times T_0 = \frac{1}{6} T_0$$

Since the phase is **negative** ($-60°$), we shift the wave to the **right** by $\frac{T_0}{6}$.

> 💡 **Intuition check:** A quarter-cycle corresponds to 90°. So 60° is two-thirds of a quarter-cycle. That's exactly what Figure B.6c in the textbook shows!

---

### The Sine-Cosine Relationship Revisited

Delaying $C\cos(\omega_0 t)$ by exactly a **quarter-cycle** (90° or $\pi/2$ radians):

$$C\cos\!\left(\omega_0 t - \frac{\pi}{2}\right) = C\sin(\omega_0 t)$$

Advancing $C\sin(\omega_0 t)$ by a **quarter-cycle**:

$$C\sin\!\left(\omega_0 t + \frac{\pi}{2}\right) = C\cos(\omega_0 t)$$

This gives us the language of **leading and lagging**:

> 🔑 **$\sin(\omega_0 t)$ lags $\cos(\omega_0 t)$ by 90°**
>
> 🔑 **$\cos(\omega_0 t)$ leads $\sin(\omega_0 t)$ by 90°**

---

## Page 5: Adding Sinusoids — Combining Two Waves Into One

### The Big Result

Two sinusoids with the **same frequency** but different phases always add up to **another sinusoid of the same frequency**. This is a crucial fact!

Starting from the trigonometric identity:

$$C\cos\theta\cos\omega_0 t - C\sin\theta\sin\omega_0 t = C\cos(\omega_0 t + \theta)$$

We set $a = C\cos\theta$ and $b = -C\sin\theta$, giving us:

$$\boxed{a\cos\omega_0 t + b\sin\omega_0 t = C\cos(\omega_0 t + \theta)} \tag{B.16}$$

where:

$$\boxed{C = \sqrt{a^2 + b^2}, \qquad \theta = \tan^{-1}\!\left(\frac{-b}{a}\right)} \tag{B.17}$$

---

### The Complex Number Connection

Notice that $C$ and $\theta$ are exactly the **magnitude and angle** of the complex number $a - jb$:

$$a - jb = Ce^{j\theta}$$

So to find $C$ and $\theta$, just **convert $a - jb$ to polar form**!

> ⚠️ **Warning:** Be careful with the $\tan^{-1}$ formula! A calculator only gives you angles in the range $(-90°, 90°)$. You must check which quadrant $a - jb$ lies in and adjust accordingly. (See the textbook's note on page 8.)

---

### Worked Example (a): $x(t) = \cos\omega_0 t - \sqrt{3}\sin\omega_0 t$

Here $a = 1$ and $b = -\sqrt{3}$.

**Step 1:** Find $C$:
$$C = \sqrt{1^2 + (-\sqrt{3})^2} = \sqrt{1 + 3} = \sqrt{4} = 2$$

**Step 2:** Find $\theta$:
$$\theta = \tan^{-1}\!\left(\frac{-(-\sqrt{3})}{1}\right) = \tan^{-1}(\sqrt{3}) = 60°$$

**Result:**
$$x(t) = 2\cos(\omega_0 t + 60°)$$

**Verification via complex numbers:** $a - jb = 1 + j\sqrt{3} = 2e^{j\pi/3}$ ✓

---

### Worked Example (b): $x(t) = -3\cos\omega_0 t + 4\sin\omega_0 t$

Here $a = -3$ and $b = 4$.

**Step 1:** Find $C$:
$$C = \sqrt{(-3)^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5$$

**Step 2:** Find $\theta$ — careful here! The complex number is $a - jb = -3 - j4$, which is in the **third quadrant**:
$$\theta = \tan^{-1}\!\left(\frac{-4}{-3}\right) = -180° + \tan^{-1}\!\left(\frac{4}{3}\right) \approx -180° + 53.1° = -126.9°$$

**Result:**
$$x(t) = 5\cos(\omega_0 t - 126.9°)$$

---

## Page 6: Phasors — A Picture for Adding Sinusoids

### What Is a Phasor?

A **phasor** is an arrow (vector) in the complex plane that represents a sinusoid. The sinusoid $C\cos(\omega_0 t + \theta)$ is represented by:

- **Length** = $C$ (the amplitude)
- **Angle from horizontal** = $\theta$ (the phase)

This turns the algebra of adding sinusoids into simple **vector addition** — much more visual!

---

### Representing the Two Components

For $a\cos\omega_0 t + b\sin\omega_0 t$:

| Sinusoid | Phasor |
|----------|--------|
| $a\cos\omega_0 t$ | Horizontal arrow of length $a$ (angle = 0°) |
| $b\sin\omega_0 t = b\cos(\omega_0 t - 90°)$ | Vertical arrow of length $b$ pointing **downward** (angle = $-90°$) |

Adding these two arrows (tip-to-tail) gives a phasor of length $C = \sqrt{a^2 + b^2}$ at angle $\theta$.

---

### Phasor Diagram for Example (a)

For $x(t) = \cos\omega_0 t - \sqrt{3}\sin\omega_0 t$:

```
Im
 |
 |  √3 (upward, from -(-√3)sin)
 |  ↑
 |  |
 |  |   /← resultant phasor, length 2
 |  |  /
 |  | /  60°
 |  |/________
 +--+----------→ Re
    0    1
```

- The horizontal phasor has length **1** (from $\cos\omega_0 t$)
- The vertical phasor has length **$\sqrt{3}$** pointing **up** (from $-\sqrt{3}\sin\omega_0 t$, since $b = -\sqrt{3}$ and the phasor for $b\sin$ points down, so $-\sqrt{3}\sin$ points up)
- The resultant has length **2** at angle **60°** ✓

---

### Why Phasors Work

The magic is that when you add two sinusoids of the **same frequency**, their phasors simply add like 2D vectors. The resulting phasor directly gives you the amplitude and phase of the combined sinusoid.

> 💡 **Think of it like this:** Phasors are a "snapshot" of the wave at $t = 0$. The length tells you how tall the wave is; the angle tells you where it starts.

---

### An Important Note on Equivalent Expressions

A phase shift of $\pm 180°$ is the same as multiplying by $-1$. So:

$$2\cos(\omega_0 t + 60°) = -2\cos(\omega_0 t + 60° \pm 180°) = -2\cos(\omega_0 t - 120°)$$

All of these are mathematically equivalent. In practice, use the **principal value** (angle between $-180°$ and $+180°$).

---

## Page 7: Recap and Summary

### Everything We Covered in B.2

---

#### 1. The General Sinusoid

$$x(t) = C\cos(\omega_0 t + \theta)$$

| Parameter | Symbol | Meaning |
|-----------|--------|---------|
| Amplitude | $C$ | Peak value of the wave |
| Radian frequency | $\omega_0$ | Radians per second |
| Phase | $\theta$ | Horizontal shift at $t=0$ |

---

#### 2. Period and Frequency Relationships

$$T_0 = \frac{1}{f_0} = \frac{2\pi}{\omega_0}, \qquad f_0 = \frac{\omega_0}{2\pi}, \qquad \omega_0 = 2\pi f_0$$

---

#### 3. Sine vs. Cosine

$$\cos\!\left(\omega_0 t - \frac{\pi}{2}\right) = \sin(\omega_0 t)$$

$$\sin\!\left(\omega_0 t + \frac{\pi}{2}\right) = \cos(\omega_0 t)$$

- $\sin$ **lags** $\cos$ by 90°
- $\cos$ **leads** $\sin$ by 90°

---

#### 4. Phase Shifts

- Negative phase ($-\theta$) → shift wave **right** (delay)
- Positive phase ($+\theta$) → shift wave **left** (advance)
- One full period = 360° of phase

---

#### 5. Adding Sinusoids (Same Frequency)

$$a\cos\omega_0 t + b\sin\omega_0 t = C\cos(\omega_0 t + \theta)$$

$$C = \sqrt{a^2 + b^2}, \qquad \theta = \tan^{-1}\!\left(\frac{-b}{a}\right)$$

Equivalently: convert the complex number $a - jb$ to polar form $Ce^{j\theta}$.

---

#### 6. Phasors

- Represent $C\cos(\omega_0 t + \theta)$ as an arrow of length $C$ at angle $\theta$
- Adding sinusoids = adding phasors as 2D vectors
- Only works for sinusoids of the **same frequency**

---

#### Common Pitfalls to Avoid

> ⚠️ Don't mix degrees and radians in the same expression.
>
> ⚠️ When using $\tan^{-1}$, always check the quadrant of $a - jb$.
>
> ⚠️ Remember: $\omega_0$ is radian frequency; $f_0 = \omega_0/2\pi$ is hertzian frequency.

---

## Page 8: Exam-Oriented Quiz Plan

### Quiz Plan — Section B.2: Sinusoids

---

**Q1.** *(Multiple Choice)* A sinusoid has the form $x(t) = 5\cos(20\pi t + 30°)$. What is its period $T_0$?

- A) $20\pi$ seconds
- B) $\dfrac{1}{10}$ seconds ✅
- C) $\dfrac{1}{20\pi}$ seconds
- D) $10$ seconds

> *Tests:* Relationship $T_0 = 1/f_0$, extracting $f_0$ from $\omega_0 = 2\pi f_0$.

---

**Q2.** *(Multiple Choice)* For the same sinusoid $x(t) = 5\cos(20\pi t + 30°)$, what is the radian frequency $\omega_0$?

- A) $10$ rad/s
- B) $20$ rad/s
- C) $20\pi$ rad/s ✅
- D) $10\pi$ rad/s

> *Tests:* Identifying $\omega_0$ directly from the sinusoid's argument.

---

**Q3.** *(Multiple Choice)* Which of the following is equivalent to $\sin(\omega_0