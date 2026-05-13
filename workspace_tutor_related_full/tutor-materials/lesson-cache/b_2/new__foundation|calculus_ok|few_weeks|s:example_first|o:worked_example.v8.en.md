# Section B.2: Sinusoids — A Complete Guide

---

## Page 1: Section Overview — What Are We Learning Here?

Welcome to Section B.2! This section is all about **sinusoids** — the fundamental building blocks of signal processing. If you've ever seen a wave on an oscilloscope, or heard about sine and cosine waves, you're already thinking about sinusoids.

### What This Section Covers

By the end of this section, you'll be able to:

- ✅ Identify the **three key parameters** of a sinusoid: amplitude, frequency, and phase
- ✅ Understand the relationship between **period, frequency, and radian frequency**
- ✅ Sketch sinusoids by shifting them left or right based on phase
- ✅ Understand the relationship between **sine and cosine** (they're the same wave, just shifted!)
- ✅ **Add two sinusoids** of the same frequency into a single sinusoid
- ✅ Use **phasors** as a visual tool for adding sinusoids

### The Big Picture

The general sinusoid we'll study looks like this:

$$x(t) = C \cos(2\pi f_0 t + \theta)$$

Three numbers completely describe this wave:

| Parameter | Symbol | What It Means |
|-----------|--------|---------------|
| Amplitude | $C$ | How tall the wave is |
| Frequency | $f_0$ | How fast it repeats (in Hz) |
| Phase | $\theta$ | Where the wave starts |

Let's dig into each of these, one page at a time!

---

## Page 2: The Three Parameters — Amplitude, Frequency, and Period

### The General Sinusoid

$$x(t) = C \cos(2\pi f_0 t + \theta)$$

Think of this as a cosine wave that has been **stretched**, **sped up or slowed down**, and **shifted sideways**. Let's understand each part.

---

### 🔵 Amplitude: $C$

The amplitude $C$ controls **how tall** the wave is. It's the maximum value the signal reaches.

- If $C = 1$, the wave goes between $-1$ and $+1$
- If $C = 5$, the wave goes between $-5$ and $+5$

---

### 🔴 Frequency and Period: $f_0$ and $T_0$

Here's the key insight: cosine repeats every time its angle changes by $2\pi$:

$$\cos(\varphi) = \cos(\varphi + 2n\pi) \quad \text{for } n = 0, \pm1, \pm2, \ldots$$

In our sinusoid $x(t) = C\cos(2\pi f_0 t + \theta)$, the angle is $(2\pi f_0 t + \theta)$.

**How long does it take for the angle to change by $2\pi$?**

The angle changes by $2\pi f_0 \cdot \Delta t$. Setting this equal to $2\pi$:

$$2\pi f_0 \cdot \Delta t = 2\pi \implies \Delta t = \frac{1}{f_0}$$

So the wave **repeats every** $T_0 = \frac{1}{f_0}$ **seconds**. This is the **period**.

$$\boxed{T_0 = \frac{1}{f_0}}$$

- $f_0$ is measured in **hertz (Hz)** = cycles per second
- $T_0$ is measured in **seconds**

**Example:** If $f_0 = 100$ Hz, then $T_0 = 0.01$ seconds (the wave repeats 100 times per second).

---

### 🟢 Radian Frequency: $\omega_0$

It's often more convenient to write $2\pi f_0$ as a single symbol:

$$\boxed{\omega_0 = 2\pi f_0}$$

This is called the **radian frequency**, measured in **radians per second (rad/s)**.

With this, our sinusoid becomes:

$$x(t) = C\cos(\omega_0 t + \theta)$$

And the period becomes:

$$T_0 = \frac{2\pi}{\omega_0}$$

> 💡 **Quick memory tip:** $f_0$ counts full cycles per second. $\omega_0$ counts radians per second. Since one full cycle = $2\pi$ radians, we get $\omega_0 = 2\pi f_0$.

---

## Page 3: Phase — Shifting the Wave Left or Right

### 🟠 Phase: $\theta$

The phase $\theta$ controls **where the wave starts** — it shifts the wave left or right in time.

Consider:

$$x(t) = C\cos(\omega_0 t + \theta)$$

- **$\theta = 0$:** Standard cosine, starts at its peak at $t = 0$

$$x(t) = C\cos(\omega_0 t)$$

- **$\theta = -\pi/2$ (or $-90°$):** The wave is delayed by a quarter cycle

$$x(t) = C\cos\!\left(\omega_0 t - \frac{\pi}{2}\right) = C\sin(\omega_0 t)$$

> This is a **very important identity** — sine is just a cosine shifted by $-90°$!

---

### How to Sketch a Phase-Shifted Sinusoid

Let's say we want to sketch $x(t) = C\cos(\omega_0 t - 60°)$.

**Step-by-step thinking:**

1. Start with the standard $C\cos(\omega_0 t)$ — peaks at $t = 0$
2. A **negative phase** means we **delay** (shift right) the wave
3. One full cycle = $360°$ of phase change = one period $T_0$
4. A $60°$ delay = $\frac{60}{360} = \frac{1}{6}$ of a full cycle = $\frac{T_0}{6}$ seconds to the right

So we shift the cosine wave **to the right by** $\frac{T_0}{6}$.

> 💡 **General rule:**
> - **Positive phase** $+\theta$ → shift **left** (advance)
> - **Negative phase** $-\theta$ → shift **right** (delay)

---

### The Sine-Cosine Relationship

This is worth memorizing:

$$\boxed{C\cos\!\left(\omega_0 t - \frac{\pi}{2}\right) = C\sin(\omega_0 t)}$$

$$\boxed{C\sin\!\left(\omega_0 t + \frac{\pi}{2}\right) = C\cos(\omega_0 t)}$$

In plain English:
- **$\sin$ lags $\cos$ by $90°$** (sine comes *after* cosine)
- **$\cos$ leads $\sin$ by $90°$** (cosine comes *before* sine)

Think of it this way: if you delay a cosine wave by a quarter period, you get a sine wave. If you advance a sine wave by a quarter period, you get a cosine wave.

---

### A Note on Degrees vs. Radians

The phase $\theta$ can be expressed in **degrees** or **radians**:

| Degrees | Radians |
|---------|---------|
| $90°$ | $\pi/2 \approx 1.571$ |
| $180°$ | $\pi \approx 3.14159$ |
| $360°$ | $2\pi \approx 6.283$ |
| $60°$ | $\pi/3 \approx 1.047$ |

> ⚠️ **Important warning:** Never mix degrees and radians in the same expression! Pick one and stick with it. When in doubt, use radians.

---

## Page 4: Adding Two Sinusoids of the Same Frequency

### The Big Idea

If you add two sinusoids that have the **same frequency** but **different phases**, the result is always **another sinusoid of the same frequency**. This is a powerful and beautiful fact!

$$a\cos(\omega_0 t) + b\sin(\omega_0 t) = C\cos(\omega_0 t + \theta)$$

---

### The Formula

Starting from the trigonometric identity:

$$C\cos\theta\cos(\omega_0 t) - C\sin\theta\sin(\omega_0 t) = C\cos(\omega_0 t + \theta)$$

We set $a = C\cos\theta$ and $b = -C\sin\theta$, which gives us:

$$\boxed{a\cos(\omega_0 t) + b\sin(\omega_0 t) = C\cos(\omega_0 t + \theta)}$$

where:

$$\boxed{C = \sqrt{a^2 + b^2}}$$

$$\boxed{\theta = \tan^{-1}\!\left(\frac{-b}{a}\right)}$$

---

### The Complex Number Shortcut

Here's a slick way to remember this: $C$ and $\theta$ are the **magnitude and angle** of the complex number $a - jb$.

$$a - jb = Ce^{j\theta}$$

So to find $C$ and $\theta$:
1. Form the complex number $a - jb$
2. Convert to polar form
3. The magnitude is $C$, the angle is $\theta$

---

### Worked Example (a): $x(t) = \cos(\omega_0 t) - \sqrt{3}\sin(\omega_0 t)$

**Identify $a$ and $b$:**

$$a = 1, \quad b = -\sqrt{3}$$

**Find $C$:**

$$C = \sqrt{a^2 + b^2} = \sqrt{1^2 + (-\sqrt{3})^2} = \sqrt{1 + 3} = \sqrt{4} = 2$$

**Find $\theta$:**

$$\theta = \tan^{-1}\!\left(\frac{-b}{a}\right) = \tan^{-1}\!\left(\frac{\sqrt{3}}{1}\right) = 60°$$

**Result:**

$$\boxed{x(t) = 2\cos(\omega_0 t + 60°)}$$

---

### Worked Example (b): $x(t) = -3\cos(\omega_0 t) + 4\sin(\omega_0 t)$

**Identify $a$ and $b$:**

$$a = -3, \quad b = 4$$

**Find $C$:**

$$C = \sqrt{(-3)^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5$$

**Find $\theta$:**

$$\theta = \tan^{-1}\!\left(\frac{-4}{-3}\right) = \tan^{-1}\!\left(\frac{4}{3}\right)$$

> ⚠️ **Watch out!** Both $a$ and $b$ are negative here, so the complex number $a - jb = -3 - j4$ is in the **third quadrant**. A calculator gives $\tan^{-1}(4/3) \approx 53.1°$, but since we're in the third quadrant, the actual angle is $-180° + 53.1° = -126.9°$.

$$\boxed{x(t) = 5\cos(\omega_0 t - 126.9°)}$$

---

## Page 5: Phasors — A Visual Tool for Adding Sinusoids

### What Is a Phasor?

A **phasor** is an arrow (vector) in a 2D plane that represents a sinusoid. Instead of drawing the full wave, we just draw an arrow:

- **Length of arrow** = Amplitude $C$
- **Angle of arrow** (measured from the positive horizontal axis) = Phase $\theta$

The sinusoid $C\cos(\omega_0 t + \theta)$ is represented by a phasor of length $C$ at angle $\theta$.

---

### Standard Phasors

| Sinusoid | Phasor |
|----------|--------|
| $a\cos(\omega_0 t)$ | Horizontal arrow of length $a$ (angle = $0°$) |
| $b\sin(\omega_0 t) = b\cos(\omega_0 t - 90°)$ | Arrow of length $b$ pointing **downward** (angle = $-90°$) |

---

### Adding Phasors = Adding Sinusoids

To add $a\cos(\omega_0 t) + b\sin(\omega_0 t)$:

1. Draw the phasor for $a\cos(\omega_0 t)$: horizontal arrow of length $a$
2. Draw the phasor for $b\sin(\omega_0 t)$: vertical arrow of length $b$ pointing **down** (at $-90°$)
3. Add the two arrows tip-to-tail (like vector addition)
4. The resulting arrow has length $C = \sqrt{a^2 + b^2}$ and angle $\theta$

---

### Visual Example: $\cos(\omega_0 t) - \sqrt{3}\sin(\omega_0 t)$

```
Im
 |
 |  √3 (upward, since -(-√3) = +√3)
 |  ↑
 |  |
 |  |    /← resultant phasor, length 2, angle 60°
 |  |   /
 |  |  /
 |  | /
 |  |/ 60°
 |  +----------→ Re
        1
```

- Phasor 1: $\cos(\omega_0 t)$ → length $1$, angle $0°$ (pointing right)
- Phasor 2: $-\sqrt{3}\sin(\omega_0 t) = \sqrt{3}\cos(\omega_0 t + 90°)$ → length $\sqrt{3}$, angle $+90°$ (pointing up)
- Resultant: length $2$, angle $60°$

This confirms: $x(t) = 2\cos(\omega_0 t + 60°)$ ✅

---

### Why Phasors Work

The phasor diagram is essentially a picture of the complex number $a - jb$:

- The real part ($a$) is the horizontal component
- The imaginary part ($-b$) is the vertical component
- The magnitude $|a - jb| = \sqrt{a^2 + b^2} = C$
- The angle $\angle(a - jb) = \tan^{-1}(-b/a) = \theta$

> 💡 **Phasors make addition visual.** Instead of doing algebra, you just draw arrows and add them like forces in physics!

---

## Page 6: Recap and Summary

### 🎯 Everything You Learned in Section B.2

---

### 1. The General Sinusoid

$$x(t) = C\cos(\omega_0 t + \theta)$$

| Symbol | Name | Units |
|--------|------|-------|
| $C$ | Amplitude | Same as signal units |
| $\omega_0$ | Radian frequency | rad/s |
| $f_0$ | Hertz frequency | Hz (cycles/s) |
| $\theta$ | Phase | degrees or radians |
| $T_0$ | Period | seconds |

---

### 2. Key Relationships

$$\omega_0 = 2\pi f_0 \qquad T_0 = \frac{1}{f_0} = \frac{2\pi}{\omega_0}$$

---

### 3. Sine-Cosine Identities

$$C\cos\!\left(\omega_0 t - \frac{\pi}{2}\right) = C\sin(\omega_0 t)$$

$$C\sin\!\left(\omega_0 t + \frac{\pi}{2}\right) = C\cos(\omega_0 t)$$

- **Sine lags cosine by $90°$**
- **Cosine leads sine by $90°$**

---

### 4. Phase Shifting Rules

| Phase | Effect on graph |
|-------|----------------|
| Positive $+\theta$ | Shift **left** (advance) |
| Negative $-\theta$ | Shift **right** (delay) |
| $\pm 180°$ | Flip the wave (multiply by $-1$) |

---

### 5. Adding Two Sinusoids

$$a\cos(\omega_0 t) + b\sin(\omega_0 t) = C\cos(\omega_0 t + \theta)$$

$$C = \sqrt{a^2 + b^2}, \qquad \theta = \tan^{-1}\!\left(\frac{-b}{a}\right)$$

> ⚠️ Always check which **quadrant** the complex number $a - jb$ is in before finalizing $\theta$!

---

### 6. Phasors

- Represent $C\cos(\omega_0 t + \theta)$ as an arrow of length $C$ at angle $\theta$
- Add sinusoids by adding their phasor arrows (vector addition)
- The result gives the amplitude and phase of the combined sinusoid

---

### Common Mistakes to Avoid

> ❌ **Mixing degrees and radians** in the same expression
>
> ❌ **Forgetting the quadrant** when computing $\theta = \tan^{-1}(-b/a)$
>
> ❌ **Confusing $f_0$ and $\omega_0$** — they differ by a factor of $2\pi$
>
> ❌ **Thinking sine and cosine are different** — they're the same wave, just shifted by $90°$

---

## Page 7: Exam-Oriented Quiz Plan

### 📝 Quiz Plan — Section B.2: Sinusoids

---

**Quiz Title:** Section B.2 — Sinusoids: Parameters, Phase, and Addition

**Recommended Format:** 8 questions total (6 multiple-choice + 2 short-answer)

**Time Estimate:** 20–25 minutes

---

### Multiple-Choice Questions

---

**Q1 — Period and Frequency**

A sinusoid has the form $x(t) = 3\cos(100\pi t + 0.5)$. What is the period $T_0$?

- A) $100$ s
- B) $0.02$ s ✅
- C) $50$ s
- D) $0.01$ s

*Tests:* Identifying $\omega_0 = 100\pi$ and computing $T_0 = 2\pi/\omega_0$

---

**Q2 — Radian vs. Hertz Frequency**

If a sinusoid has a hertzian frequency of $f_0 = 60$ Hz, what is its radian frequency $\omega_0$?

- A) $60$ rad/s
- B) $30\pi$ rad/s
- C) $120\pi$ rad/s ✅
- D) $\pi/60$ rad/s

*Tests:* The relationship $\omega_0 = 2\pi f_0$

---

**Q3 — Sine-Cosine Relationship**

Which of the following is equivalent to $\sin(\omega_0 t)$?

- A) $\cos(\omega_0 t + 90°)$
- B) $\cos(\omega_0 t - 90°)$ ✅
- C) $-\cos(\omega_0 t + 90°)$
- D) $\cos(\omega_0 t)$

*Tests:* The identity $\cos(\omega_0 t - \pi/2) = \