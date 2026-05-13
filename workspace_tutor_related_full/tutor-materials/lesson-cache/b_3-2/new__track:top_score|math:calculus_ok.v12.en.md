# B.3-2 The Exponentially Varying Sinusoid

---

## Page 1: Section Overview

Welcome! In this section, we're going to learn how to **sketch a special and very important type of signal** that shows up constantly in engineering and physics:

$$x(t) = Ae^{-at}\cos(\omega_0 t + \theta)$$

This is called an **exponentially varying sinusoid** (sometimes called a **damped sinusoid**). It's basically a cosine wave whose amplitude shrinks (or grows) exponentially over time.

---

### 🎯 What You'll Learn in This Section

| Topic | What It Means |
|-------|--------------|
| **The exponential envelope** | The decaying curve that "wraps around" the sinusoid |
| **The sinusoidal part** | The oscillating cosine inside |
| **Multiplying them together** | How to combine both to get the final sketch |
| **Positive and negative envelopes** | The upper and lower boundaries of the waveform |

---

### 🔑 The Big Idea

Instead of trying to sketch the whole thing at once (which is hard!), we break it into **three simple steps**:

1. Sketch the exponential $Ae^{-at}$ by itself
2. Sketch the cosine $\cos(\omega_0 t + \theta)$ by itself
3. **Multiply** them together — using the exponential as a guiding envelope

Think of it like drawing a wave inside a shrinking funnel. The funnel is the exponential, and the wave bounces back and forth inside it.

---

### 📌 Our Working Example

Throughout this section, we'll use:

$$x(t) = 4e^{-2t}\cos(6t - 60°)$$

Let's take it step by step!

---

## Page 2: Step 1 — Sketching the Exponential Part

### Sketching $4e^{-2t}$

The first piece of our signal is the **decaying exponential**:

$$4e^{-2t}$$

This is a smooth curve that starts at some value and continuously decreases toward zero. Let's figure out its key features.

---

### 🔍 Key Features of $4e^{-2t}$

**Initial value (at $t = 0$):**

$$4e^{-2(0)} = 4e^0 = 4$$

So the curve starts at **4**.

---

**Time constant $\tau$:**

For a decaying exponential $Ae^{-at}$, the time constant is:

$$\tau = \frac{1}{a}$$

Here, $a = 2$, so:

$$\tau = \frac{1}{2} = 0.5 \text{ seconds}$$

> 💡 **Remember:** The time constant tells you how long it takes the signal to drop to $1/e$ (about 36.8%) of its current value.

---

### 📊 Computing Values at Key Time Points

Every **0.5 seconds** (one time constant), the signal drops by a factor of $e \approx 2.718$:

| Time $t$ | Value of $4e^{-2t}$ | Approximate Value |
|----------|---------------------|-------------------|
| $t = 0$ | $4$ | $4.00$ |
| $t = 0.5$ | $4/e$ | $\approx 1.47$ |
| $t = 1.0$ | $4/e^2$ | $\approx 0.54$ |
| $t = 1.5$ | $4/e^3$ | $\approx 0.20$ |
| $t = 2.0$ | $4/e^4$ | $\approx 0.07$ |

---

### ✏️ How to Sketch It

- Start at the point $(0, 4)$
- Draw a smooth curve that **falls quickly at first**, then flattens out
- Use the table above as anchor points
- The curve **never touches zero** but gets very close after a few time constants

> 🧠 **Rule of thumb:** After about **5 time constants** ($5\tau = 2.5$ seconds here), the exponential is essentially zero for practical purposes.

---

## Page 3: Step 2 — Sketching the Cosine Part

### Sketching $\cos(6t - 60°)$

The second piece of our signal is the **cosine wave**:

$$\cos(6t - 60°)$$

This is a standard sinusoid — it oscillates between $-1$ and $+1$ forever. Let's identify its key features.

---

### 🔍 Key Features of $\cos(6t - 60°)$

**Angular frequency $\omega_0$:**

$$\omega_0 = 6 \text{ rad/s}$$

**Period $T_0$:**

$$T_0 = \frac{2\pi}{\omega_0} = \frac{2\pi}{6} \approx 1.047 \text{ seconds} \approx 1 \text{ second}$$

So the cosine completes one full cycle roughly every **1 second**.

---

**Phase shift $\theta = -60°$:**

A negative phase angle means the cosine is **delayed** (shifted to the right).

The time delay is:

$$t_{\text{delay}} = \frac{|\theta|}{360°} \times T_0 = \frac{60°}{360°} \times 1 \approx \frac{1}{6} \text{ seconds}$$

> 💡 **In plain English:** The cosine wave looks like a regular $\cos(6t)$, but it starts a little later — shifted about $1/6$ of a second to the right.

---

### 📊 Key Points of $\cos(6t - 60°)$

| Event | Condition | Time $t$ |
|-------|-----------|----------|
| **Positive peak** (+1) | $6t - 60° = 0°$ | $t = 10°/\text{rad} \approx 0.175$ s |
| **Zero crossing** (going down) | $6t - 60° = 90°$ | $t \approx 0.436$ s |
| **Negative peak** (−1) | $6t - 60° = 180°$ | $t \approx 0.698$ s |
| **Zero crossing** (going up) | $6t - 60° = 270°$ | $t \approx 0.960$ s |
| **Next positive peak** | $6t - 60° = 360°$ | $t \approx 1.222$ s |

---

### ✏️ How to Sketch It

- Draw a smooth wave that oscillates between $+1$ and $-1$
- Period is about **1 second**
- The first positive peak occurs at about $t \approx 0.175$ s (not at $t = 0$ because of the phase delay)
- At $t = 0$: $\cos(0 - 60°) = \cos(-60°) = 0.5$, so the wave **starts at 0.5**, not at 1

---

## Page 4: Step 3 — Multiplying to Get the Final Signal

### Sketching $4e^{-2t}\cos(6t - 60°)$

Now comes the fun part — we **multiply** the two pieces together!

$$x(t) = \underbrace{4e^{-2t}}_{\text{envelope}} \times \underbrace{\cos(6t - 60°)}_{\text{oscillation}}$$

---

### 🎯 The Key Insight: Envelopes

Here's the clever trick. Ask yourself: **when does $\cos(6t - 60°) = +1$?**

At those moments (the **positive peaks** of the cosine):

$$x(t) = 4e^{-2t} \times (+1) = 4e^{-2t}$$

So the signal **touches** the curve $4e^{-2t}$ at every positive peak!

Similarly, when $\cos(6t - 60°) = -1$ (the **negative peaks**):

$$x(t) = 4e^{-2t} \times (-1) = -4e^{-2t}$$

So the signal **touches** the curve $-4e^{-2t}$ at every negative peak!

---

### 📐 The Two Envelopes

This gives us two boundary curves:

| Envelope | Role |
|----------|------|
| $+4e^{-2t}$ | **Upper envelope** — touches the positive peaks of $x(t)$ |
| $-4e^{-2t}$ | **Lower envelope** — touches the negative peaks of $x(t)$ |

> 🎨 **Visual analogy:** Imagine a bouncing ball inside a funnel that's getting narrower. The top of the funnel is $+4e^{-2t}$ and the bottom is $-4e^{-2t}$. The ball (the sinusoid) bounces between them, touching each wall at its peaks.

---

### ✏️ Step-by-Step Sketching Procedure

**Step 1:** Draw the upper envelope $+4e^{-2t}$ (the decaying curve from Step 1)

**Step 2:** Draw the lower envelope $-4e^{-2t}$ (mirror image of the upper envelope, reflected below the time axis)

**Step 3:** Sketch the sinusoid $\cos(6t - 60°)$ **between** these two envelopes, making sure:
- It touches the **upper** envelope at each positive peak
- It touches the **lower** envelope at each negative peak
- It crosses zero at the same times as $\cos(6t - 60°)$ does

---

### 📊 Sample Values of $x(t) = 4e^{-2t}\cos(6t - 60°)$

| Time $t$ | $4e^{-2t}$ | $\cos(6t - 60°)$ | $x(t)$ |
|----------|------------|------------------|--------|
| $0$ | $4.00$ | $0.50$ | $2.00$ |
| $0.5$ | $1.47$ | $\approx -0.99$ | $\approx -1.46$ |
| $1.0$ | $0.54$ | $\approx 0.96$ | $\approx 0.52$ |
| $1.5$ | $0.20$ | $\approx -0.91$ | $\approx -0.18$ |

---

### 🔑 What Happens Over Time

As $t$ increases, the exponential $4e^{-2t}$ gets smaller and smaller. This **squeezes** the sinusoid toward zero. The oscillations are still there, but their amplitude shrinks. Eventually, the signal dies out completely.

---

## Page 5: The General Formula and Why This Matters

### The General Exponentially Varying Sinusoid

Everything we did with our specific example applies to the **general form**:

$$x(t) = Ke^{-at}\cos(\omega_0 t + \theta)$$

---

### 📋 General Sketching Rules

| Parameter | What It Controls |
|-----------|-----------------|
| $K$ | Initial amplitude at $t = 0$ (when $\cos\theta = 1$, otherwise $K\cos\theta$) |
| $a$ | Rate of decay; larger $a$ → faster decay |
| $\tau = 1/a$ | Time constant; signal drops to $1/e$ of its value every $\tau$ seconds |
| $\omega_0$ | Oscillation frequency; period $T_0 = 2\pi/\omega_0$ |
| $\theta$ | Phase shift; positive $\theta$ → left shift, negative $\theta$ → right shift |

---

### 🔑 The Two Envelopes (General Case)

$$\text{Upper envelope: } +Ke^{-at}$$
$$\text{Lower envelope: } -Ke^{-at}$$

The signal $Ke^{-at}\cos(\omega_0 t + \theta)$ is always **trapped between** these two curves.

---

### 💡 Why Does This Signal Matter?

You'll see this type of signal **everywhere** in engineering:

- **RLC circuits:** When you charge a capacitor and let it discharge through a resistor and inductor, the voltage oscillates and decays — exactly this shape!
- **Mechanical systems:** A spring-mass system with friction (damping) produces this kind of motion
- **Control systems:** The response of many systems to a sudden input looks like a damped sinusoid
- **Communications:** Modulated signals often have this form

> 🎓 **Bottom line:** Mastering this sketch technique is not just a math exercise — it's a fundamental skill for understanding how real physical systems behave.

---

### ⚠️ Common Mistakes to Avoid

| Mistake | Correction |
|---------|-----------|
| Forgetting the phase shift of the cosine | Always check $\theta$ and shift the cosine accordingly |
| Drawing the signal going *outside* the envelopes | The signal can **never** exceed $\pm Ke^{-at}$ |
| Confusing time constant with period | $\tau = 1/a$ (exponential), $T_0 = 2\pi/\omega_0$ (sinusoidal) — these are different! |
| Making the signal touch the envelope at zero crossings | It touches the envelope only at **peaks**, not at zero crossings |

---

## Page 6: Recap and Summary

### 🗂️ Section B.3-2 — Full Summary

---

### The Signal

$$x(t) = Ae^{-at}\cos(\omega_0 t + \theta)$$

An **exponentially varying sinusoid** = a cosine wave whose amplitude is controlled by a decaying exponential.

---

### The Three-Step Sketching Method

```
Step 1: Sketch Ae^{-at}
         → Start at A, decay by factor e every τ = 1/a seconds

Step 2: Sketch cos(ω₀t + θ)
         → Period T₀ = 2π/ω₀, phase shift by θ

Step 3: Multiply → use envelopes
         → Upper: +Ae^{-at}
         → Lower: -Ae^{-at}
         → Sinusoid bounces between them
```

---

### Key Formulas at a Glance

| Quantity | Formula |
|----------|---------|
| Time constant | $\tau = 1/a$ |
| Exponential at $t = n\tau$ | $Ae^{-n}$ |
| Period of sinusoid | $T_0 = 2\pi/\omega_0$ |
| Phase time delay | $t_d = \|\theta\| / (360°) \times T_0$ |
| Upper envelope | $+Ae^{-at}$ |
| Lower envelope | $-Ae^{-at}$ |
| Signal touches upper envelope when | $\cos(\omega_0 t + \theta) = +1$ |
| Signal touches lower envelope when | $\cos(\omega_0 t + \theta) = -1$ |

---

### Our Worked Example

$$x(t) = 4e^{-2t}\cos(6t - 60°)$$

| Feature | Value |
|---------|-------|
| Initial amplitude | $4$ |
| Time constant $\tau$ | $0.5$ s |
| Period $T_0$ | $\approx 1$ s |
| Phase delay | $\approx 1/6$ s |
| Upper envelope | $4e^{-2t}$ |
| Lower envelope | $-4e^{-2t}$ |
| Value at $t=0$ | $4\cos(-60°) = 2$ |

---

### 🧠 The Golden Rule

> **The exponentially varying sinusoid is always trapped between its two envelopes $+Ae^{-at}$ and $-Ae^{-at}$. It touches the upper envelope at positive peaks and the lower envelope at negative peaks.**

---

## Page 7: Quiz Plan (Exam-Oriented)

### 📝 Quiz Plan — B.3-2: The Exponentially Varying Sinusoid

---

### Quiz Overview

| Detail | Info |
|--------|------|
| **Total Questions** | 10 |
| **Format** | 8 Multiple Choice + 2 Short Answer |
| **Topics Covered** | Time constant, period, envelopes, phase shift, signal values, sketching procedure |
| **Difficulty** | Mix of straightforward recall and applied reasoning |

---

### Multiple Choice Questions

---

**Q1.** For the signal $x(t) = 5e^{-4t}\cos(8t + 30°)$, what is the time constant $\tau$?

- A) $4$ seconds
- B) $0.25$ seconds ✅
- C) $8$ seconds
- D) $0.125$ seconds

*Tests: $\tau = 1/a$*

---

**Q2.** For the signal $x(t) = 3e^{-t}\cos(4\pi t)$, what is the period $T_0$ of the sinusoidal component?

- A) $4\pi$ seconds
- B) $0.5$ seconds ✅
- C) $2$ seconds
- D) $1/(4\pi)$ seconds

*Tests: $T_0 = 2\pi/\omega_0$*

---

**Q3.** The signal $x(t) = 4e^{-2t}\cos(6t - 60°)$ touches its **upper envelope** $4e^{-2t}$ at the moments when:

- A) The exponential equals zero
- B) The cosine equals zero
- C) The cosine equals $+1$ (positive peaks) ✅
- D) The cosine equals $-1$ (negative peaks)

*Tests: envelope contact condition*

---

**Q4.** What is the **lower envelope** of the signal $x(t) = 7e^{-3t}\cos(2t + 45°)$?

- A) $7e^{-3t}$
- B) $-7$
- C) $-7e^{-3t}$ ✅
- D) $7e^{3t}$

*Tests: lower envelope definition*

---

**Q5.** For $x(t) = 4e^{-2t}\cos(6t - 60°)$, what is the approximate value of $x(t)$ at $t = 0$?

- A) $4$
- B) $0$
- C) $2$ ✅
- D) $-2$

*Tests: evaluating $x(0) = 4\cos(-60°) = 4 \times 0.5 = 2$*

---

**Q6.** A signal has time constant $\tau = 0.5$ s and initial amplitude $A = 10$. What is its approximate amplitude at $t = 1$ second?

- A) $10/e \approx 3.68$
- B) $10/e^2 \approx 1.35$ ✅
- C) $10/e^3 \approx 0.50$
- D) $10 \times e^2 \approx 73.9$

*Tests: exponential decay over multiple time constants*

---

**Q7.** Which of the following correctly describes the **three-step method** for sketching $Ae^{-at}\cos(\omega_0 t + \theta)$?

- A) Sketch the cosine, then add the exponential, then differentiate
- B) Sketch the exponential, sketch the cosine, then multiply using envelopes ✅
- C) Sketch the exponential, then subtract the cosine
- D)