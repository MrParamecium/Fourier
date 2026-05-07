# B.2 Sinusoids

---

## Page 1: Section Overview — What Are We Talking About?

Welcome to Section B.2! This section is all about **sinusoids** — the fundamental building blocks of signal processing. Almost every signal you'll ever encounter can be broken down into sinusoids, so understanding them deeply is absolutely essential.

Here's a quick roadmap of what we'll cover:

---

### 🗺️ What's in This Section?

| Topic | What You'll Learn |
|---|---|
| **The Sinusoid Formula** | What $$C$$, $$f_0$$, and $$\theta$$ mean physically |
| **Period and Frequency** | How often a sinusoid repeats, and in what units |
| **Radian vs. Hertz Frequency** | The difference between $$\omega_0$$ and $$f_0$$ |
| **Sketching Sinusoids** | How phase shifts move a wave left or right |
| **Adding Sinusoids** | How two sinusoids at the same frequency combine into one |
| **Phasors** | A visual tool for adding sinusoids elegantly |

---

### 🎯 The Big Picture

A **sinusoid** is a smooth, repetitive oscillation described by:

$$x(t) = C \cos(2\pi f_0 t + \theta)$$

Think of it as a cosine wave that has been:
- **Stretched** vertically by $$C$$ (the amplitude)
- **Tuned** to repeat at frequency $$f_0$$ times per second
- **Shifted** left or right by phase $$\theta$$

By the end of this section, you'll be able to read, sketch, and combine sinusoids with confidence. Let's go! 🚀

---

## Page 2: The Sinusoid — Anatomy of a Wave

### The General Formula

The sinusoid we study is:

$$x(t) = C \cos(2\pi f_0 t + \theta) \tag{B.13}$$

Let's break down every piece of this formula.

---

### 🔬 The Three Parameters

#### 1. Amplitude — $$C$$
This is the **peak value** of the wave. It tells you how "tall" the wave is. If $$C = 3$$, the wave oscillates between $$+3$$ and $$-3$$.

#### 2. Frequency — $$f_0$$ (in Hertz)
This tells you **how many complete cycles happen per second**. 
- If $$f_0 = 5 \text{ Hz}$$, the wave completes 5 full cycles every second.
- The unit **Hertz (Hz)** literally means "cycles per second."

#### 3. Phase — $$\theta$$
This is the **starting angle** of the cosine at time $$t = 0$$. It shifts the wave left (positive $$\theta$$) or right (negative $$\theta$$).

---

### ⏱️ Period: How Long is One Cycle?

The cosine function repeats every time its angle changes by $$2\pi$$. In our sinusoid, the angle is $$(2\pi f_0 t + \theta)$$. The angle changes by $$2\pi$$ when $$t$$ changes by:

$$T_0 = \frac{1}{f_0} \tag{B.14}$$

This $$T_0$$ is called the **period** — the time for one complete repetition.

> 💡 **Simple relationship:** Frequency and period are just reciprocals of each other.
> $$f_0 = \frac{1}{T_0} \qquad \text{and} \qquad T_0 = \frac{1}{f_0}$$

---

### 📌 Two Special Cases

**Case 1: $$\theta = 0$$ (pure cosine)**
$$x(t) = C \cos(2\pi f_0 t)$$

**Case 2: $$\theta = -\pi/2$$ (becomes a sine!)**
$$x(t) = C \cos\!\left(2\pi f_0 t - \frac{\pi}{2}\right) = C \sin(2\pi f_0 t)$$

This is a key identity — a cosine with a $$-90°$$ phase shift *is* a sine wave.

---

### 🎓 Degrees vs. Radians

The phase $$\theta$$ can be expressed in **degrees** or **radians**. Both are valid, but:

- **Radians** are the mathematically "proper" unit (used in formulas)
- **Degrees** are often more intuitive ($$60°$$ feels more natural than $$1.047 \text{ rad}$$)

> ⚠️ **Golden Rule:** Never mix degrees and radians in the same expression. Pick one and stick with it!

---

## Page 3: Radian Frequency $$\omega_0$$ — A Convenient Shorthand

### Why Introduce $$\omega_0$$?

Writing $$2\pi f_0$$ over and over gets tedious. So we define a shorthand called the **radian frequency**:

$$\omega_0 = 2\pi f_0 \tag{B.15}$$

The unit of $$\omega_0$$ is **radians per second (rad/s)**.

---

### Rewriting the Sinusoid

With this notation, our sinusoid becomes much cleaner:

$$x(t) = C \cos(\omega_0 t + \theta)$$

And the key relationships become:

$$T_0 = \frac{2\pi}{\omega_0} \qquad \text{and} \qquad \omega_0 = \frac{2\pi}{T_0}$$

---

### 🔄 The Full Relationship Triangle

Here's how all three quantities connect:

$$\boxed{f_0 \;[\text{Hz}] \quad \longleftrightarrow \quad \omega_0 = 2\pi f_0 \;[\text{rad/s}] \quad \longleftrightarrow \quad T_0 = \frac{1}{f_0} = \frac{2\pi}{\omega_0} \;[\text{s}]}$$

---

### ⚠️ A Common Confusion

> **$$\omega_0$$ is NOT the same as $$f_0$$!**

| Symbol | Name | Unit | Meaning |
|---|---|---|---|
| $$f_0$$ | Hertzian frequency | Hz (cycles/sec) | Cycles per second |
| $$\omega_0$$ | Radian frequency | rad/s | Radians per second |
| $$T_0$$ | Period | seconds | Time per cycle |

They're related by a factor of $$2\pi$$. When someone says "the frequency is $$\omega_0$$," they mean the **radian** frequency. The actual Hertzian frequency is $$f_0 = \omega_0 / 2\pi$$.

---

### 📝 Quick Example

Suppose $$x(t) = 5\cos(100\pi t + 30°)$$.

- Here $$\omega_0 = 100\pi$$ rad/s
- So $$f_0 = \frac{\omega_0}{2\pi} = \frac{100\pi}{2\pi} = 50 \text{ Hz}$$
- And $$T_0 = \frac{1}{50} = 0.02 \text{ s} = 20 \text{ ms}$$
- Amplitude $$C = 5$$, Phase $$\theta = 30°$$

---

## Page 4: Sketching Sinusoids — Phase Shifts as Time Shifts

### The Core Idea

A phase shift in the angle translates directly into a **time shift** of the waveform. This is one of the most important visual skills in signal processing.

---

### 📐 The Phase-to-Time Conversion

For the sinusoid $$C\cos(\omega_0 t + \theta)$$:

- A **positive** phase $$\theta > 0$$ shifts the wave to the **left** (earlier in time — a *lead*)
- A **negative** phase $$\theta < 0$$ shifts the wave to the **right** (later in time — a *delay*)

The time shift corresponding to a phase of $$\theta$$ is:

$$t_{\text{shift}} = \frac{-\theta}{\omega_0} = \frac{-\theta \cdot T_0}{2\pi}$$

---

### 🔑 The Key Insight: Angles and Fractions of a Cycle

One full cycle = $$360°$$ of phase change. So:

| Phase shift | Fraction of cycle | Time shift |
|---|---|---|
| $$90°$$ | $$\frac{1}{4}$$ cycle | $$\frac{T_0}{4}$$ |
| $$60°$$ | $$\frac{1}{6}$$ cycle | $$\frac{T_0}{6}$$ |
| $$180°$$ | $$\frac{1}{2}$$ cycle | $$\frac{T_0}{2}$$ |

---

### 🖊️ Worked Example: Sketching $$C\cos(\omega_0 t - 60°)$$

**Step 1:** Start with the basic cosine $$C\cos(\omega_0 t)$$ — peaks at $$t = 0, T_0, 2T_0, \ldots$$

**Step 2:** The phase is $$-60°$$, which is a **delay** (shift right).

**Step 3:** How much to shift?
$$60° \text{ is } \frac{60}{360} = \frac{1}{6} \text{ of a full cycle} = \frac{T_0}{6}$$

**Step 4:** Shift the entire cosine wave to the **right** by $$T_0/6$$.

> 💡 Alternatively: $$60°$$ is two-thirds of a quarter-cycle ($$\frac{2}{3} \times \frac{T_0}{4} = \frac{T_0}{6}$$). Same answer!

---

### 🔁 The Sine-Cosine Relationship Revisited

Delaying $$C\cos(\omega_0 t)$$ by exactly a **quarter-cycle** ($$90°$$) gives:

$$C\cos\!\left(\omega_0 t - \frac{\pi}{2}\right) = C\sin(\omega_0 t)$$

And advancing $$C\sin(\omega_0 t)$$ by a quarter-cycle gives back $$C\cos(\omega_0 t)$$:

$$C\sin\!\left(\omega_0 t + \frac{\pi}{2}\right) = C\cos(\omega_0 t)$$

This means:
> **$$\sin(\omega_0 t)$$ lags $$\cos(\omega_0 t)$$ by $$90°$$**
> **$$\cos(\omega_0 t)$$ leads $$\sin(\omega_0 t)$$ by $$90°$$**

---

## Page 5: Adding Sinusoids — The Key Formula

### The Problem

What happens when you add two sinusoids of the **same frequency** but different phases?

$$x(t) = a\cos(\omega_0 t) + b\sin(\omega_0 t) = \;?$$

Remarkably, the result is always **another sinusoid at the same frequency**!

---

### 📐 The Addition Formula

Starting from the trigonometric identity:

$$C\cos\theta\cos(\omega_0 t) - C\sin\theta\sin(\omega_0 t) = C\cos(\omega_0 t + \theta)$$

We set $$a = C\cos\theta$$ and $$b = -C\sin\theta$$, which gives us:

$$\boxed{a\cos(\omega_0 t) + b\sin(\omega_0 t) = C\cos(\omega_0 t + \theta)} \tag{B.16}$$

where:

$$\boxed{C = \sqrt{a^2 + b^2} \qquad \text{and} \qquad \theta = \tan^{-1}\!\left(\frac{-b}{a}\right)} \tag{B.17}$$

---

### 🔗 The Complex Number Connection

Here's a beautiful trick: notice that $$C$$ and $$\theta$$ are exactly the **magnitude and angle** of the complex number $$a - jb$$:

$$a - jb = Ce^{j\theta}$$

So to find $$C$$ and $$\theta$$, just **convert $$a - jb$$ to polar form**!

> 💡 This is why complex numbers are so powerful in signal processing — they make sinusoid arithmetic visual and algebraic at the same time.

---

### ✏️ Worked Example (a): $$x(t) = \cos(\omega_0 t) - \sqrt{3}\sin(\omega_0 t)$$

**Identify:** $$a = 1$$, $$b = -\sqrt{3}$$

**Find C:**
$$C = \sqrt{1^2 + (-\sqrt{3})^2} = \sqrt{1 + 3} = \sqrt{4} = 2$$

**Find $$\theta$$:**
$$\theta = \tan^{-1}\!\left(\frac{-b}{a}\right) = \tan^{-1}\!\left(\frac{\sqrt{3}}{1}\right) = 60°$$

**Result:**
$$x(t) = 2\cos(\omega_0 t + 60°)$$

**Complex number check:** $$a - jb = 1 + j\sqrt{3} = 2e^{j\pi/3}$$ ✓

---

### ✏️ Worked Example (b): $$x(t) = -3\cos(\omega_0 t) + 4\sin(\omega_0 t)$$

**Identify:** $$a = -3$$, $$b = 4$$

**Find C:**
$$C = \sqrt{(-3)^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5$$

**Find $$\theta$$:**
$$\theta = \tan^{-1}\!\left(\frac{-4}{-3}\right)$$

> ⚠️ **Careful!** Both $$a$$ and $$-b$$ are negative, so the angle is in the **third quadrant**. A calculator gives $$\tan^{-1}(4/3) \approx 53.1°$$, but the actual angle is $$-180° + 53.1° = -126.9°$$.

**Result:**
$$x(t) = 5\cos(\omega_0 t - 126.9°)$$

---

## Page 6: Phasors — A Visual Tool for Adding Sinusoids

### What Is a Phasor?

A **phasor** is an arrow (vector) in a 2D plane that represents a sinusoid:

$$C\cos(\omega_0 t + \theta) \quad \longleftrightarrow \quad \text{arrow of length } C \text{ at angle } \theta$$

The horizontal axis represents the real part; the vertical axis represents the imaginary part.

---

### 🗺️ Phasor Representations

| Sinusoid | Phasor |
|---|---|
| $$a\cos(\omega_0 t)$$ | Horizontal arrow of length $$a$$ (angle $$= 0°$$) |
| $$b\sin(\omega_0 t) = b\cos(\omega_0 t - 90°)$$ | Vertical arrow of length $$b$$ pointing **downward** (angle $$= -90°$$) |
| $$C\cos(\omega_0 t + \theta)$$ | Arrow of length $$C$$ at angle $$\theta$$ |

---

### ➕ Adding Phasors = Adding Sinusoids

To add $$a\cos(\omega_0 t) + b\sin(\omega_0 t)$$:

1. Draw the phasor for $$a\cos(\omega_0 t)$$: horizontal arrow of length $$a$$
2. Draw the phasor for $$b\sin(\omega_0 t)$$: vertical arrow of length $$b$$ pointing **down** (angle $$-90°$$)
3. Add them tip-to-tail (vector addition)
4. The resulting arrow has length $$C = \sqrt{a^2 + b^2}$$ at angle $$\theta = \tan^{-1}(-b/a)$$

This is exactly Equation (B.17) — but now you can **see** it geometrically!

---

### 🖼️ Visualizing Example (a)

For $$x(t) = \cos(\omega_0 t) - \sqrt{3}\sin(\omega_0 t)$$:

```
Im
 |
 |  √3 (upward, since -√3·sin = +√3 at angle +90°)
 |  ↑
 |  |
 |  +----→  1 (horizontal)
 |
 +-------------- Re
```

The resultant arrow has:
- Length $$= \sqrt{1^2 + (\sqrt{3})^2} = 2$$
- Angle $$= 60°$$ above horizontal

So $$x(t) = 2\cos(\omega_0 t + 60°)$$ ✓

---

### 🖼️ Visualizing Example (b)

For $$x(t) = -3\cos(\omega_0 t) + 4\sin(\omega_0 t)$$:

```
Im
 |
 |  ← -3 (leftward)
 |  +
 |  ↓ 4 (downward, since +4·sin = angle -90°)
 |
 +-------------- Re
     (resultant at -126.9°, length 5)
```

The resultant: length $$= 5$$, angle $$= -126.9°$$

So $$x(t) = 5\cos(\omega_0 t - 126.9°)$$ ✓

---

### 💡 Why Phasors Are Useful

Phasors turn sinusoid addition into **geometry**. Instead of wrestling with trig identities, you just draw arrows and use the Pythagorean theorem. This becomes even more powerful in circuit analysis and Fourier theory.

---

## Page 7: Recap and Summary

### 🎯 Everything You Learned in B.2

---

#### 1. The Sinusoid Formula

$$x(t) = C\cos(2\pi f_0 t + \theta) = C\cos(\omega_0 t + \theta)$$

| Parameter | Symbol | Meaning | Unit |
|---|---|---|---|
| Amplitude | $$C$$ | Peak value | same as signal |
| Hertzian frequency | $$f_0$$ | Cycles per second | Hz |
| Radian frequency | $$\omega_0 = 2\pi f_0$$ | Radians per second | rad/s |
| Period | $$T_0 = 1/f_0 = 2\pi/\omega_0$$ | Time per cycle | seconds |
| Phase | $$\theta$$ | Starting angle | degrees or radians |

---

#### 2. Key Relationships

$$\omega_0 = 2\pi f_0 \qquad T_0 = \frac{1}{f_0} = \frac{2\pi}{\omega