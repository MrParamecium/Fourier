# B.2 Sinusoids

---

## Page 1: Section Overview — What Are We Learning Here?

Welcome to **Section B.2: Sinusoids**! This is one of the most fundamental sections in all of signal processing. If you've ever seen a wave on an oscilloscope, heard a pure musical tone, or used AC electricity — you've already encountered sinusoids in real life.

### What is a Sinusoid?

A **sinusoid** is simply a cosine (or sine) wave. The general form is:

$$x(t) = C \cos(2\pi f_0 t + \theta)$$

It looks like a smooth, repeating wave that goes up and down forever.

### What Will We Cover in This Section?

By the end of this section, you'll be able to confidently answer:

| Topic | What You'll Learn |
|---|---|
| 🌊 **The sinusoid formula** | What each part (C, f₀, θ) means |
| ⏱️ **Period and Frequency** | How fast the wave repeats |
| 📐 **Radian vs. Hertz frequency** | Two ways to measure frequency |
| ↔️ **Phase shifts** | How to shift a wave left or right |
| ➕ **Adding sinusoids** | How two waves combine into one |
| 🔄 **Phasors** | A visual tool for adding sinusoids |

### Why Does This Matter?

Almost every signal in engineering — audio, radio, electrical power, vibrations — can be built from sinusoids. Understanding them deeply is the **foundation of everything** that follows in this course.

Let's dive in! 🎯

---

## Page 2: The Three Parts of a Sinusoid — Amplitude, Frequency, and Phase

### The General Formula

$$x(t) = C \cos(2\pi f_0 t + \theta)$$

This single equation has **three parameters**, and each one controls a different feature of the wave. Let's break them down one by one.

---

### 🔵 C — The Amplitude

**Amplitude** is the *height* of the wave — how tall the peaks are and how deep the valleys go.

- The wave swings between **+C** and **−C**
- A larger C means a taller, "louder" wave
- A smaller C means a shorter, "quieter" wave

> **Example:** If C = 3, the wave peaks at +3 and dips to −3.

---

### 🟢 f₀ — The Frequency (in Hertz)

**Frequency** tells you *how many complete cycles happen per second*.

- Measured in **Hertz (Hz)**, which just means "cycles per second"
- A higher f₀ means the wave repeats faster (higher pitch in audio)
- A lower f₀ means the wave repeats slower (lower pitch)

The wave repeats every time the angle $2\pi f_0 t + \theta$ increases by $2\pi$. That happens when $t$ increases by:

$$T_0 = \frac{1}{f_0}$$

This $T_0$ is called the **period** — the time for one complete cycle.

> **Example:** If f₀ = 100 Hz, the period is T₀ = 1/100 = 0.01 seconds. The wave completes 100 full cycles every second.

---

### 🔴 θ — The Phase

**Phase** controls *where the wave starts* at time t = 0.

- Measured in **degrees** or **radians**
- θ = 0 gives a standard cosine wave
- θ = −π/2 (which is −90°) gives a sine wave:

$$C\cos(2\pi f_0 t - \pi/2) = C\sin(2\pi f_0 t)$$

> **Think of it this way:** Phase is like asking "did we start the movie from the beginning, or did we jump in partway through?"

---

### Quick Summary Table

| Symbol | Name | What It Controls |
|---|---|---|
| C | Amplitude | Height of the wave |
| f₀ | Frequency (Hz) | How fast it repeats |
| T₀ = 1/f₀ | Period | Time for one full cycle |
| θ | Phase | Starting position of the wave |

---

## Page 3: Radian Frequency — A Second Way to Measure Frequency

### Why Do We Need Another Frequency Unit?

You already know that **f₀** measures frequency in Hertz (cycles per second). But in mathematics and engineering, we constantly deal with angles measured in **radians**. It turns out that writing $2\pi f_0$ over and over gets tedious. So we define a shortcut:

$$\omega_0 = 2\pi f_0$$

This $\omega_0$ is called the **radian frequency** (or angular frequency), and it's measured in **radians per second**.

---

### Rewriting the Sinusoid

With this new notation, our sinusoid becomes much cleaner:

$$x(t) = C\cos(\omega_0 t + \theta)$$

instead of $C\cos(2\pi f_0 t + \theta)$. Same wave, just written more neatly.

---

### The Relationships Between T₀, f₀, and ω₀

These three quantities are all connected:

$$T_0 = \frac{1}{f_0} = \frac{2\pi}{\omega_0}$$

$$\omega_0 = 2\pi f_0 = \frac{2\pi}{T_0}$$

$$f_0 = \frac{\omega_0}{2\pi}$$

> **Memory tip:** Think of $\omega_0$ as "how many radians per second" and $f_0$ as "how many full circles (2π radians each) per second." Since one full circle = 2π radians, you divide by 2π to convert.

---

### Degrees vs. Radians for Phase

The phase θ can be expressed in **degrees** or **radians**. Both are valid, but:

- **Radians** are the mathematically "correct" unit
- **Degrees** are often easier to visualize (most people relate better to 60° than to 1.047 rad)

> ⚠️ **Important Warning:** Never mix degrees and radians in the same expression! Pick one and stick with it throughout a problem.

---

### Concrete Example

Suppose $\omega_0 = 200\pi$ rad/s. What are f₀ and T₀?

$$f_0 = \frac{\omega_0}{2\pi} = \frac{200\pi}{2\pi} = 100 \text{ Hz}$$

$$T_0 = \frac{1}{f_0} = \frac{1}{100} = 0.01 \text{ s}$$

---

### Summary

| Quantity | Symbol | Unit | Formula |
|---|---|---|---|
| Hertzian frequency | f₀ | Hz (cycles/sec) | f₀ = ω₀/2π |
| Radian frequency | ω₀ | rad/sec | ω₀ = 2πf₀ |
| Period | T₀ | seconds | T₀ = 1/f₀ = 2π/ω₀ |

---

## Page 4: Phase Shifts — Sliding the Wave Left or Right

### What Does a Phase Shift Do?

When we change the phase θ in $C\cos(\omega_0 t + \theta)$, we **slide the wave horizontally** along the time axis.

- A **positive** θ shifts the wave to the **left** (the wave arrives *earlier*)
- A **negative** θ shifts the wave to the **right** (the wave arrives *later*)

> **Analogy:** Imagine a train schedule. A positive phase shift means the train arrives early. A negative phase shift means it arrives late.

---

### The Key Insight: Angle ↔ Time

A sinusoid completes **360°** (or 2π radians) in exactly **one period T₀**. This means:

$$\text{Time shift} = \frac{\theta}{360°} \times T_0$$

> **Example:** A phase shift of 60° corresponds to a time shift of $\frac{60}{360} \times T_0 = \frac{T_0}{6}$

---

### The Special Case: cos → sin

One of the most important phase relationships is between cosine and sine:

$$C\cos(\omega_0 t - 90°) = C\sin(\omega_0 t)$$

This tells us that **sine is just cosine delayed by 90°** (a quarter cycle).

Equivalently, if you advance sine by 90°:

$$C\sin(\omega_0 t + 90°) = C\cos(\omega_0 t)$$

So we say:
- **sin ω₀t *lags* cos ω₀t by 90°**
- **cos ω₀t *leads* sin ω₀t by 90°**

---

### Sketching a Phase-Shifted Sinusoid

Let's sketch $x(t) = C\cos(\omega_0 t - 60°)$:

**Step 1:** Start with the standard $C\cos(\omega_0 t)$ — a cosine wave with peak at t = 0.

**Step 2:** The phase is −60°, which is negative, so we **shift right** (delay).

**Step 3:** How far right? Since 360° = one full period T₀:

$$\text{Time delay} = \frac{60°}{360°} \times T_0 = \frac{T_0}{6}$$

**Step 4:** Slide the entire cosine wave to the right by T₀/6.

> **Note:** 60° is two-thirds of a quarter-cycle (since a quarter-cycle = 90°). So we shift right by ⅔ of a quarter-cycle. This matches Figure B.6c in the textbook.

---

### Visual Summary of Phase Relationships

```
C cos(ω₀t)         → standard cosine, peak at t = 0
C cos(ω₀t - 60°)   → shifted RIGHT by T₀/6
C cos(ω₀t - 90°)   → shifted RIGHT by T₀/4  =  C sin(ω₀t)
C cos(ω₀t + 90°)   → shifted LEFT  by T₀/4
```

---

## Page 5: Adding Two Sinusoids — The Key Formula

### The Big Idea

If you add two sinusoids that have the **same frequency** but **different phases**, the result is always **another sinusoid at the same frequency**. The frequency never changes — only the amplitude and phase of the result are new.

$$a\cos(\omega_0 t) + b\sin(\omega_0 t) = C\cos(\omega_0 t + \theta) \tag{B.16}$$

---

### Where Does This Come From?

Start from the well-known trig identity:

$$C\cos\theta\cos(\omega_0 t) - C\sin\theta\sin(\omega_0 t) = C\cos(\omega_0 t + \theta)$$

Now set:
$$a = C\cos\theta \qquad \text{and} \qquad b = -C\sin\theta$$

Solving for C and θ:

$$\boxed{C = \sqrt{a^2 + b^2}} \qquad \boxed{\theta = \tan^{-1}\!\left(\frac{-b}{a}\right)}$$

These are the **two formulas you must memorize** for this section.

---

### The Complex Number Connection

Here's a beautiful shortcut: notice that C and θ are exactly the **magnitude and angle** of the complex number:

$$a - jb = Ce^{j\theta}$$

So to find C and θ, just **convert a − jb to polar form**!

> **Why a − jb and not a + jb?** Because b comes with a negative sign in the formula ($b = -C\sin\theta$). Keep this in mind — it's a common source of errors.

---

### Step-by-Step Procedure

To combine $a\cos(\omega_0 t) + b\sin(\omega_0 t)$ into a single sinusoid:

1. **Identify** a and b from the expression
2. **Form** the complex number $a - jb$
3. **Convert** to polar: find magnitude $C = \sqrt{a^2 + b^2}$ and angle $\theta = \tan^{-1}(-b/a)$
4. **Write** the answer as $C\cos(\omega_0 t + \theta)$

> ⚠️ **Calculator Warning:** The $\tan^{-1}$ function on calculators only gives angles in the range −90° to +90°. You must check which quadrant $a - jb$ lies in and adjust accordingly!

---

### Worked Example (Part a from Example B.6)

$$x(t) = \cos(\omega_0 t) - \sqrt{3}\sin(\omega_0 t)$$

**Step 1:** $a = 1$, $b = -\sqrt{3}$

**Step 2:** Form $a - jb = 1 - j(-\sqrt{3}) = 1 + j\sqrt{3}$

**Step 3:** Convert to polar:
$$C = \sqrt{1^2 + (\sqrt{3})^2} = \sqrt{1 + 3} = 2$$
$$\theta = \tan^{-1}\!\left(\frac{\sqrt{3}}{1}\right) = 60°$$

**Step 4:** Answer:
$$x(t) = 2\cos(\omega_0 t + 60°)$$

---

## Page 6: Phasors — A Visual Tool for Adding Sinusoids

### What Is a Phasor?

A **phasor** is an arrow (vector) in a 2D plane that represents a sinusoid. Instead of drawing the full wave, we just draw one arrow:

$$C\cos(\omega_0 t + \theta) \quad \longleftrightarrow \quad \text{arrow of length } C \text{ at angle } \theta$$

The horizontal axis represents the **real** direction, and the vertical axis represents the **imaginary** direction.

---

### How to Draw Each Type of Sinusoid as a Phasor

| Sinusoid | Phasor |
|---|---|
| $a\cos(\omega_0 t)$ | Horizontal arrow of length $a$ (pointing right, angle = 0°) |
| $b\sin(\omega_0 t) = b\cos(\omega_0 t - 90°)$ | Vertical arrow of length $b$ pointing **downward** (angle = −90°) |
| $C\cos(\omega_0 t + \theta)$ | Arrow of length $C$ at angle $\theta$ from horizontal |

> **Why does sin point downward?** Because $\sin(\omega_0 t) = \cos(\omega_0 t - 90°)$, and −90° means 90° clockwise from the horizontal, which is straight down.

---

### Adding Phasors = Adding Arrows

To add $a\cos(\omega_0 t) + b\sin(\omega_0 t)$:

1. Draw the phasor for $a\cos(\omega_0 t)$: horizontal arrow of length $a$
2. Draw the phasor for $b\sin(\omega_0 t)$: vertical arrow of length $|b|$ pointing down (if b > 0)
3. **Add them tip-to-tail** like vector addition
4. The resulting arrow has length $C = \sqrt{a^2 + b^2}$ and angle $\theta$

This is just the **Pythagorean theorem** applied to arrows!

---

### Worked Example (Part b from Example B.6)

$$x(t) = -3\cos(\omega_0 t) + 4\sin(\omega_0 t)$$

**Step 1:** $a = -3$, $b = 4$

**Step 2:** Form $a - jb = -3 - j4$

**Step 3:** This point is in the **third quadrant** (both real and imaginary parts are negative):
$$C = \sqrt{(-3)^2 + (-4)^2} = \sqrt{9 + 16} = 5$$
$$\theta = \tan^{-1}\!\left(\frac{-4}{-3}\right) \rightarrow \text{adjust for third quadrant} \rightarrow \theta = -180° + 53.1° = -126.9°$$

**Step 4:** Answer:
$$x(t) = 5\cos(\omega_0 t - 126.9°)$$

---

### Why Phasors Are Useful

- They turn **algebra** into **geometry**
- You can *see* the amplitude and phase of the result immediately
- They generalize to AC circuit analysis, Fourier analysis, and much more

> **Key insight:** The phasor diagram is just a picture of the complex number $a - jb$ in the complex plane. The magnitude is C and the angle is θ. That's it!

---

## Page 7: Recap and Summary

### 🎯 Everything You Learned in Section B.2

---

### 1. The Sinusoid Formula

$$x(t) = C\cos(2\pi f_0 t + \theta) = C\cos(\omega_0 t + \theta)$$

| Parameter | Name | Meaning |
|---|---|---|
| C | Amplitude | Height of the wave |
| f₀ | Frequency | Cycles per second (Hz) |
| ω₀ = 2πf₀ | Radian frequency | Radians per second |
| θ | Phase | Starting angle of the wave |
| T₀ = 1/f₀ | Period | Time for one full cycle |

---

### 2. Key Relationships

$$T_0 = \frac{1}{f_0} = \frac{2\pi}{\omega_0} \qquad \omega_0 = 2\pi f_0$$

---

### 3. Important Phase Identities

$$C\cos(\omega_0 t - 90°) = C\sin(\omega_0 t)$$
$$C\sin(\omega_0 t + 90°) = C\cos(\omega_0 t)$$

- **sin lags cos by 90°**
- **cos leads sin by 90°**
- A phase of ±180° is equivalent to multiplying by −1

---

### 4. Adding Two Sinusoids

$$a\cos(\omega_0 t) + b\sin(\omega_0 t) = C\cos(\omega_0 t + \theta)$$

$$C = \sqrt{a^2 + b^2} \qquad \theta = \tan^{-1}\!\left(\frac{-b}{a}\right)$$

**Shortcut:** Form the complex number $a - jb$, convert to polar form $Ce^{j\theta}$, and read off C and θ.

---

### 5. Phasors

| Sinusoid | Phasor Representation |
|---|---|
| $C\cos(\omega_0 t + \theta)$ | Arrow of length C at angle θ |
| $a\cos(\omega_0 t)$ | Horizontal arrow, length a |
| $b\sin(\omega_0 t)$ | Downward arrow, length b |

Adding phasors = vector addition = finding the hypotenuse.

---

### 6. Common Pitfalls to Avoid

> ⚠️ **Don't mix degrees and radians** in the same expression.

> ⚠️ **Watch the quadrant** when using $\tan^{-1}$ on a calculator — it only gives values between −90° and +90°.

> ⚠️ **Remember it's a −