# Section B.2: Sinusoids — A Complete Guide

---

## Page 1: Section Overview 🎵

Welcome to Section B.2! This section is all about **sinusoids** — the fundamental building blocks of signal processing. If you've ever seen a wave on the ocean or heard a musical note, you've experienced a sinusoid in real life.

### What We'll Cover in This Section

By the end of this section, you'll be able to:

- ✅ Understand what a sinusoid is and identify its three key parameters
- ✅ Know the difference between **frequency in hertz** and **radian frequency**
- ✅ Relate the **period** and **frequency** of a sinusoid
- ✅ Understand the relationship between **sine** and **cosine** (leading and lagging)
- ✅ **Add two sinusoids** of the same frequency into a single sinusoid
- ✅ Use **phasors** as a visual tool for adding sinusoids

### The Big Picture

The general sinusoid we'll study looks like this:

$$x(t) = C \cos(2\pi f_0 t + \theta)$$

This one equation contains everything — the **amplitude** $C$, the **frequency** $f_0$, and the **phase** $\theta$. Understanding each piece deeply is the goal of this section.

### Why Does This Matter?

Sinusoids are everywhere in engineering:
- 🔊 Audio signals (music, speech)
- 📡 Radio and wireless communication
- ⚡ AC electrical power (the 60 Hz in your wall outlet)
- 🌊 Any periodic physical phenomenon

Let's dive in! 🚀

---

## Page 2: The Three Parameters of a Sinusoid

### The General Sinusoid

The sinusoid we study is:

$$x(t) = C \cos(2\pi f_0 t + \theta) \tag{B.13}$$

This has **three parameters**, and each one controls something specific about the wave's shape.

---

### Parameter 1: Amplitude $C$

The **amplitude** $C$ controls how **tall** the wave is.

- It's the maximum value the signal reaches
- A larger $C$ means a taller wave
- Units depend on what the signal represents (volts, meters, etc.)

---

### Parameter 2: Frequency $f_0$

The **frequency** $f_0$ controls how **fast** the wave repeats.

Here's the key insight: the cosine function repeats every time its angle changes by $2\pi$. So for $x(t) = C\cos(2\pi f_0 t + \theta)$, the angle $2\pi f_0 t + \theta$ increases by $2\pi$ when $t$ increases by $\frac{1}{f_0}$.

This means the wave **repeats every** $\frac{1}{f_0}$ **seconds**. That repetition interval is called the **period**:

$$T_0 = \frac{1}{f_0} \tag{B.14}$$

- $f_0$ is measured in **hertz (Hz)** = cycles per second
- A higher $f_0$ means more cycles per second → a "faster" wave

> 💡 **Example:** If $f_0 = 5$ Hz, the wave completes 5 full cycles every second, and each cycle takes $T_0 = \frac{1}{5} = 0.2$ seconds.

---

### Parameter 3: Phase $\theta$

The **phase** $\theta$ controls where the wave **starts** (its horizontal shift).

Two important special cases:

| Phase | Result |
|-------|--------|
| $\theta = 0$ | $x(t) = C\cos(2\pi f_0 t)$ — starts at its peak |
| $\theta = -\pi/2$ | $x(t) = C\cos(2\pi f_0 t - \pi/2) = C\sin(2\pi f_0 t)$ — starts at zero, going up |

> 💡 **Degrees vs. Radians:** Phase can be expressed in either degrees or radians. The textbook often uses degrees because they're more intuitive (e.g., $24°$ feels more natural than $0.419$ rad). But **never mix the two units in the same problem!**

---

## Page 3: Radian Frequency and the Period

### A Shorthand: Radian Frequency $\omega_0$

Writing $2\pi f_0$ over and over gets tedious. So we define the **radian frequency**:

$$\omega_0 = 2\pi f_0 \tag{B.15}$$

With this, the sinusoid becomes much cleaner to write:

$$x(t) = C\cos(\omega_0 t + \theta)$$

---

### The Period-Frequency Relationships

Now we have two ways to express frequency, so we get two versions of the period formula:

$$T_0 = \frac{1}{f_0} = \frac{2\pi}{\omega_0}$$

And two ways to express frequency:

$$f_0 = \frac{1}{T_0} \qquad \text{and} \qquad \omega_0 = \frac{2\pi}{T_0}$$

> ⚠️ **Important Warning:** When we say "$\omega_0$ is the frequency," we really mean it's the **radian frequency**. The true hertzian (Hz) frequency is always $f_0 = \frac{\omega_0}{2\pi}$. Don't confuse them!

---

### Quick Reference Table

| Symbol | Name | Units | Formula |
|--------|------|-------|---------|
| $f_0$ | Hertzian frequency | Hz (cycles/sec) | $f_0 = \frac{1}{T_0}$ |
| $\omega_0$ | Radian frequency | rad/sec | $\omega_0 = 2\pi f_0$ |
| $T_0$ | Period | seconds | $T_0 = \frac{1}{f_0} = \frac{2\pi}{\omega_0}$ |

---

### Visualizing the Sinusoid

The cosine $C\cos(\omega_0 t)$ starts at its **peak** value $C$ at $t = 0$ and completes one full cycle in $T_0$ seconds.

The sine $C\sin(\omega_0 t)$ starts at **zero** at $t = 0$, rises to a peak, and is essentially the cosine shifted to the right by a quarter cycle.

> 💡 **Sketching Tip:** To sketch $C\cos(\omega_0 t - 60°)$, start with $C\cos(\omega_0 t)$ and shift it to the **right** by $\frac{60°}{360°} \times T_0 = \frac{T_0}{6}$. A negative phase means a **delay** (shift right). A positive phase means an **advance** (shift left).

---

## Page 4: Sine vs. Cosine — Leading and Lagging

### The Quarter-Cycle Relationship

One of the most important relationships in sinusoids is between sine and cosine. Let's build it up carefully.

Start with $C\cos(\omega_0 t)$. If we **delay** it by a quarter cycle (which corresponds to a phase shift of $90° = \pi/2$ radians), we get:

$$C\cos\!\left(\omega_0 t - \frac{\pi}{2}\right) = C\sin(\omega_0 t)$$

This is a well-known trigonometric identity, and it tells us something profound:

> **The sine wave is just a cosine wave shifted to the right by a quarter cycle.**

---

### Going the Other Way

If we **advance** $C\sin(\omega_0 t)$ by a quarter cycle (shift left by $\pi/2$):

$$C\sin\!\left(\omega_0 t + \frac{\pi}{2}\right) = C\cos(\omega_0 t)$$

---

### Leading and Lagging — The Language of Phase

These relationships give us the standard language used in signal processing:

| Statement | Meaning |
|-----------|---------|
| $\sin(\omega_0 t)$ **lags** $\cos(\omega_0 t)$ by $90°$ | Sine comes "after" cosine by a quarter cycle |
| $\cos(\omega_0 t)$ **leads** $\sin(\omega_0 t)$ by $90°$ | Cosine comes "before" sine by a quarter cycle |

> 💡 **Memory Trick:** Think of a race. If cosine **leads**, it crosses the finish line first. Sine **lags** behind by $90°$.

---

### Why This Matters

In circuit analysis and signal processing, you'll constantly need to compare the phases of two signals. Knowing whether one signal leads or lags another — and by how much — tells you about the behavior of filters, amplifiers, and communication systems.

The key identities to memorize:

$$\boxed{\cos\!\left(\omega_0 t - \frac{\pi}{2}\right) = \sin(\omega_0 t)}$$

$$\boxed{\sin\!\left(\omega_0 t + \frac{\pi}{2}\right) = \cos(\omega_0 t)}$$

---

## Page 5: Adding Two Sinusoids of the Same Frequency

### The Big Idea

Here's a remarkable fact: if you add two sinusoids that have the **same frequency** but different amplitudes and phases, the result is **always another sinusoid at the same frequency**.

This is not obvious at first, but it follows from a trigonometric identity:

$$C\cos\theta\cos(\omega_0 t) - C\sin\theta\sin(\omega_0 t) = C\cos(\omega_0 t + \theta)$$

Setting $a = C\cos\theta$ and $b = -C\sin\theta$, we get the master formula:

$$\boxed{a\cos(\omega_0 t) + b\sin(\omega_0 t) = C\cos(\omega_0 t + \theta)} \tag{B.16}$$

---

### Finding $C$ and $\theta$

Given $a$ and $b$, how do we find $C$ and $\theta$? From trigonometry:

$$\boxed{C = \sqrt{a^2 + b^2}} \qquad \text{and} \qquad \boxed{\theta = \tan^{-1}\!\left(\frac{-b}{a}\right)} \tag{B.17}$$

> 💡 **The Complex Number Trick:** Notice that $C$ and $\theta$ are exactly the **magnitude** and **angle** of the complex number $a - jb$. So if you convert $a - jb$ to polar form $Ce^{j\theta}$, you immediately get both $C$ and $\theta$!

---

### Step-by-Step Procedure

To add $a\cos(\omega_0 t) + b\sin(\omega_0 t)$:

1. **Identify** $a$ (coefficient of cosine) and $b$ (coefficient of sine)
2. **Compute** $C = \sqrt{a^2 + b^2}$
3. **Compute** $\theta = \tan^{-1}\!\left(\frac{-b}{a}\right)$ — be careful about the quadrant!
4. **Write** the answer as $C\cos(\omega_0 t + \theta)$

> ⚠️ **Quadrant Warning:** The formula $\theta = \tan^{-1}(-b/a)$ can give the wrong quadrant if you just punch it into a calculator blindly. Always check the signs of $a$ and $b$ to determine the correct quadrant of $\theta$.

---

## Page 6: Phasors — A Visual Tool for Adding Sinusoids

### What Is a Phasor?

A **phasor** is an arrow (vector) in a 2D plane that represents a sinusoid visually. The rules are simple:

- The **length** of the phasor = the **amplitude** of the sinusoid
- The **angle** of the phasor (measured from the positive horizontal axis) = the **phase** of the sinusoid

So the sinusoid $C\cos(\omega_0 t + \theta)$ is represented by a phasor of length $C$ at angle $\theta$.

---

### Representing Cosine and Sine as Phasors

| Sinusoid | Phasor |
|----------|--------|
| $a\cos(\omega_0 t)$ | Horizontal arrow of length $a$ (angle $= 0°$) |
| $b\sin(\omega_0 t) = b\cos(\omega_0 t - 90°)$ | Arrow of length $b$ pointing **downward** (angle $= -90°$) |

---

### Adding Phasors = Adding Sinusoids

To add $a\cos(\omega_0 t) + b\sin(\omega_0 t)$:

1. Draw the phasor for $a\cos(\omega_0 t)$: a horizontal arrow of length $a$
2. Draw the phasor for $b\sin(\omega_0 t)$: a vertical arrow of length $b$ pointing **down** (at $-90°$)
3. **Add the two arrows tip-to-tail** (vector addition)
4. The resulting arrow has length $C = \sqrt{a^2 + b^2}$ and angle $\theta$

This is exactly the same result as the algebraic formula — but now you can **see** it geometrically!

---

### Why Phasors Are Useful

Phasors turn the problem of adding sinusoids into simple **vector addition** — something you can draw and visualize. They're especially helpful when:
- You need to quickly check if your algebra is correct
- You're dealing with multiple signals at once
- You want to understand the phase relationship intuitively

---

## Page 7: Worked Examples — Addition of Sinusoids

### Example B.6(a)

**Problem:** Express $x(t) = \cos(\omega_0 t) - \sqrt{3}\sin(\omega_0 t)$ as a single sinusoid.

**Step 1:** Identify $a$ and $b$.

$$a = 1, \qquad b = -\sqrt{3}$$

**Step 2:** Compute $C$.

$$C = \sqrt{a^2 + b^2} = \sqrt{1^2 + (-\sqrt{3})^2} = \sqrt{1 + 3} = \sqrt{4} = 2$$

**Step 3:** Compute $\theta$.

$$\theta = \tan^{-1}\!\left(\frac{-b}{a}\right) = \tan^{-1}\!\left(\frac{\sqrt{3}}{1}\right) = 60°$$

**Step 4:** Write the answer.

$$\boxed{x(t) = 2\cos(\omega_0 t + 60°)}$$

**Complex number check:** $a - jb = 1 + j\sqrt{3} = 2e^{j\pi/3}$ ✅ (magnitude $= 2$, angle $= 60°$)

---

### Example B.6(b)

**Problem:** Express $x(t) = -3\cos(\omega_0 t) + 4\sin(\omega_0 t)$ as a single sinusoid.

**Step 1:** Identify $a$ and $b$.

$$a = -3, \qquad b = 4$$

**Step 2:** Compute $C$.

$$C = \sqrt{(-3)^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5$$

**Step 3:** Compute $\theta$.

$$\theta = \tan^{-1}\!\left(\frac{-b}{a}\right) = \tan^{-1}\!\left(\frac{-4}{-3}\right)$$

> ⚠️ **Quadrant check:** Both $a = -3$ and $-b = -4$ are negative, so the angle is in the **third quadrant**. A calculator gives $\tan^{-1}(4/3) \approx 53.1°$, but the correct angle is $-180° + 53.1° = -126.9°$.

$$\theta = -126.9°$$

**Step 4:** Write the answer.

$$\boxed{x(t) = 5\cos(\omega_0 t - 126.9°)}$$

---

### A Note on Alternative Forms

Any sinusoid can also be written with a phase shifted by $\pm 180°$ (which just flips the sign):

$$2\cos(\omega_0 t + 60°) = -2\cos(\omega_0 t - 120°) = -2\cos(\omega_0 t + 240°)$$

In practice, always use the **principal value** (the angle closest to $0°$, between $-180°$ and $+180°$).

---

## Page 8: Recap and Summary 📝

### Key Concepts at a Glance

#### 1. The General Sinusoid
$$x(t) = C\cos(\omega_0 t + \theta)$$

| Parameter | Symbol | Role |
|-----------|--------|------|
| Amplitude | $C$ | Height of the wave |
| Radian frequency | $\omega_0$ | How fast it oscillates (rad/s) |
| Phase | $\theta$ | Horizontal shift |

---

#### 2. Frequency and Period

$$T_0 = \frac{1}{f_0} = \frac{2\pi}{\omega_0} \qquad \omega_0 = 2\pi f_0$$

- $f_0$ = hertzian frequency (Hz)
- $\omega_0$ = radian frequency (rad/s)
- $T_0$ = period (seconds)

---

#### 3. Sine-Cosine Relationships

$$\cos\!\left(\omega_0 t - \frac{\pi}{2}\right) = \sin(\omega_0 t) \quad \Rightarrow \quad \text{sine lags cosine by } 90°$$

$$\sin\!\left(\omega_0 t + \frac{\pi}{2}\right) = \cos(\omega_0 t) \quad \Rightarrow \quad \text{cosine leads sine by } 90°$$

---

#### 4. Adding Sinusoids

$$a\cos(\omega_0 t) + b\sin(\omega_0 t) = C\cos(\omega_0 t + \theta)$$

$$C = \sqrt{a^2 + b^2}, \qquad \theta = \tan^{-1}\!\left(\frac{-b}{a}\right)$$

**Shortcut:** $C$ and $\theta$ are the magnitude and angle of the complex number $a - jb$.

---

#### 5. Phasors

- Represent $C\cos(\omega_0 t + \theta)$ as an arrow of length $C$ at angle $\theta$
- $\cos(\omega_0 t)$ → horizontal arrow
- $\sin(\omega_0 t)$ → arrow pointing **down** at $-90°$
- Adding sinusoids = **vector addition of phasors**

---

#### 6. Common Pitfalls to Avoid

> ⚠️ Don't mix degrees and radians in the same expression
>
> ⚠️ Always check the quadrant when computing $\theta = \tan^{-1}(-b/a)$
>
> ⚠️ Remember: $\omega_0$ is radian frequency; hertzian frequency is $f_0 = \omega_0 / 2\pi$

---

## Page 9: Exam-Oriented Quiz Plan 🎯

### Quiz Plan: Section B.2 — Sinusoids

---

**Q1.** *(