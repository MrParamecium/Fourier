# B.3 Sketching Signals

---

## Page 1: Section Overview

Welcome to **B.3 Sketching Signals**! 🎉

In this section, we're going to learn how to **draw (sketch) signals by hand** — a surprisingly powerful skill in signal processing. Rather than plotting hundreds of points, we'll use a few clever tricks to capture the essential shape of a signal quickly and accurately.

### What We'll Cover

This section has two main topics:

| Topic | What It's About |
|---|---|
| **Monotonic Exponentials** | Signals that grow or decay smoothly, like $e^{-at}$ |
| **Exponentially Varying Sinusoids** | A sinusoid whose amplitude shrinks (or grows) over time, like $Ae^{-at}\cos(\omega_0 t + \theta)$ |

### Why Does This Matter?

In real engineering systems — like circuits, control systems, and communications — signals very often look like decaying exponentials or oscillations that die out over time. Being able to **quickly sketch** these signals helps you:

- Understand system behavior at a glance
- Check your math intuitively
- Communicate ideas clearly in exams and on the job

### The Big Idea

We'll use a concept called the **time constant** to anchor our sketches, and we'll use **envelopes** to constrain oscillating signals. By the end of this section, you'll be able to sketch complex-looking signals with just a few key values.

Let's dive in! 🚀

---

## Page 2: Monotonic Exponentials — The Time Constant

### What Is a Monotonic Exponential?

A **monotonic exponential** is a signal that either:
- **Decays** smoothly toward zero: $e^{-at}$ (where $a > 0$)
- **Grows** smoothly toward infinity: $e^{at}$ (where $a > 0$)

These are shown below conceptually:

$$e^{-at} \quad \text{(decays)} \qquad \qquad e^{at} \quad \text{(grows)}$$

Both start at a value of **1** when $t = 0$.

---

### The Time Constant — Your Sketching Anchor ⚓

The most important concept here is the **time constant**, denoted $\tau$ (tau).

> **Definition:** The time constant of $e^{-at}$ is $\tau = \dfrac{1}{a}$.

Here's what makes it so useful:

> **Over every interval of one time constant, the exponential drops to about 37% of its current value.**

Why 37%? Because:

$$\frac{e^{-a(t + \frac{1}{a})}}{e^{-at}} = e^{-a \cdot \frac{1}{a}} = e^{-1} = \frac{1}{e} \approx 0.368 \approx 37\%$$

This works **no matter where you start** on the curve — it always drops by the same factor over one time constant. That's the beauty of exponentials!

---

### How to Sketch $e^{-at}$ in 4 Easy Steps

**Step 1:** Find the time constant: $\tau = 1/a$

**Step 2:** Note the starting value at $t = 0$: it's always **1** (or whatever the amplitude coefficient is)

**Step 3:** Fill in a table of key values:

| Time | Value |
|---|---|
| $t = 0$ | $1$ |
| $t = \tau$ | $1/e \approx 0.37$ |
| $t = 2\tau$ | $1/e^2 \approx 0.135$ |
| $t = 3\tau$ | $1/e^3 \approx 0.050$ |

**Step 4:** Connect the dots with a smooth, always-decreasing curve that approaches zero

---

### Worked Example: Sketching $x(t) = e^{-2t}$

**Given:** $x(t) = e^{-2t}$, so $a = 2$

**Time constant:** $\tau = 1/2 = 0.5$ seconds

**Key values:**

| Time $t$ | Value $x(t)$ |
|---|---|
| $0$ | $1$ |
| $0.5$ | $1/e \approx 0.37$ |
| $1.0$ | $1/e^2 \approx 0.135$ |
| $1.5$ | $1/e^3 \approx 0.050$ |

You now have four anchor points. Connect them with a smooth curve that starts at 1 and asymptotically approaches 0. That's your sketch! ✅

---

### What About Growing Exponentials?

For $e^{at}$ (growing), the same logic applies in reverse:

> Over every interval of $1/a$ seconds, the signal **increases by a factor of $e \approx 2.718$**.

So if you know the value at one point, multiply by $e$ to find the value one time constant later.

---

### Quick Tip 💡

> The signal is essentially "dead" (very close to zero) after about **5 time constants** ($5\tau$). Engineers often use this as a rule of thumb for "how long does it take to die out?"

---

## Page 3: Exponentially Varying Sinusoids — The Envelope Method

### What Is an Exponentially Varying Sinusoid?

This is a signal of the form:

$$x(t) = Ae^{-at}\cos(\omega_0 t + \theta)$$

It's a **cosine wave** whose amplitude is not constant — instead, it's being **multiplied by a decaying exponential**. The result is an oscillation that gradually shrinks toward zero.

You'll see this type of signal everywhere: in RLC circuits after a switch is thrown, in mechanical systems that vibrate and then settle, and in many other real-world scenarios.

---

### The Key Insight: Envelopes 📐

Here's the clever trick for sketching this signal:

> The decaying exponential $Ae^{-at}$ acts as an **envelope** — it defines the maximum possible amplitude of the oscillation at any given time.

Specifically:
- When $\cos(\omega_0 t + \theta) = +1$ (positive peak), the signal **touches** $+Ae^{-at}$
- When $\cos(\omega_0 t + \theta) = -1$ (negative peak), the signal **touches** $-Ae^{-at}$

So the signal is always **trapped between** $+Ae^{-at}$ and $-Ae^{-at}$.

---

### The 3-Step Sketching Method

**Step 1: Sketch the positive envelope** $+Ae^{-at}$

Use the time constant method from the previous page. This is a decaying exponential starting at $A$.

**Step 2: Sketch the negative envelope** $-Ae^{-at}$

This is just the mirror image of Step 1, reflected about the horizontal axis. It starts at $-A$.

**Step 3: Sketch the sinusoid** $\cos(\omega_0 t + \theta)$ **between the envelopes**

Draw the oscillating wave so that:
- Its peaks **touch** the positive envelope
- Its troughs **touch** the negative envelope
- Its frequency and phase match $\omega_0$ and $\theta$

---

### Worked Example: $x(t) = 4e^{-2t}\cos(6t - 60°)$

Let's walk through this step by step.

---

#### Step 1: Sketch $4e^{-2t}$

- Amplitude coefficient: $A = 4$
- Decay rate: $a = 2$, so time constant $\tau = 0.5$ s

**Key values of the envelope:**

| Time $t$ | $4e^{-2t}$ |
|---|---|
| $0$ | $4.00$ |
| $0.5$ | $4/e \approx 1.47$ |
| $1.0$ | $4/e^2 \approx 0.54$ |
| $1.5$ | $4/e^3 \approx 0.20$ |
| $2.0$ | $4/e^4 \approx 0.07$ |

Draw this smooth decaying curve. ✅

---

#### Step 2: Sketch $-4e^{-2t}$

Simply flip the curve from Step 1 below the time axis. It starts at $-4$ and rises toward $0$. ✅

---

#### Step 3: Sketch $\cos(6t - 60°)$ between the envelopes

First, find the properties of the sinusoid:

**Period:**
$$T_0 = \frac{2\pi}{\omega_0} = \frac{2\pi}{6} \approx 1.047 \text{ seconds} \approx 1 \text{ s}$$

**Phase delay:**

The $-60°$ means the cosine is **delayed** by:
$$\text{Time delay} = \frac{60°}{360°} \times T_0 = \frac{1}{6} \times 1 \approx 0.167 \text{ s}$$

So the first positive peak of the cosine (which normally occurs at $t = 0$) is shifted to $t \approx 0.167$ s.

**Now draw the oscillation:**
- The wave oscillates with period $\approx 1$ s
- Its peaks touch the positive envelope $4e^{-2t}$
- Its troughs touch the negative envelope $-4e^{-2t}$
- The amplitude shrinks as time goes on

---

### Why This Works — The Math Behind It 🔍

At any positive peak of the cosine, $\cos(\omega_0 t + \theta) = 1$, so:

$$x(t)\big|_{\text{peak}} = Ae^{-at} \cdot 1 = Ae^{-at}$$

At any negative peak, $\cos(\omega_0 t + \theta) = -1$, so:

$$x(t)\big|_{\text{trough}} = Ae^{-at} \cdot (-1) = -Ae^{-at}$$

The envelope literally **is** the signal at those special moments. Between peaks, the signal is somewhere between the two envelopes. This is why the envelope method works perfectly.

---

### Visual Summary of the Method

```
Amplitude
    4 |  * (envelope +4e^{-2t})
      | / \
      |/   \___
    0 |--------\---------\-----> t
      |         \___/     \
   -4 |  * (envelope -4e^{-2t})
```

The oscillating signal weaves between the two envelopes, touching each one at the peaks and troughs, while the envelopes themselves squeeze inward toward zero.

---

## Page 4: Recap and Summary

### What We Learned in B.3 🎓

Let's bring everything together.

---

### Topic 1: Monotonic Exponentials

| Signal | Behavior | Time Constant |
|---|---|---|
| $e^{-at}$ | Decays toward 0 | $\tau = 1/a$ |
| $e^{at}$ | Grows toward $\infty$ | $\tau = 1/a$ |

**The Golden Rule of Time Constants:**

> Over every interval of $\tau = 1/a$ seconds, a decaying exponential drops to **$1/e \approx 37\%$** of its current value.

**Sketching Recipe:**
1. Find $\tau = 1/a$
2. Note starting value at $t = 0$
3. Compute values at $t = \tau, 2\tau, 3\tau, \ldots$
4. Connect with a smooth curve

---

### Topic 2: Exponentially Varying Sinusoids

**General form:**
$$x(t) = Ae^{-at}\cos(\omega_0 t + \theta)$$

**The Envelope Method:**

| Envelope | Role |
|---|---|
| $+Ae^{-at}$ | Upper boundary — signal touches this at positive peaks |
| $-Ae^{-at}$ | Lower boundary — signal touches this at negative troughs |

**Sketching Recipe:**
1. Draw the **positive envelope** $+Ae^{-at}$ using the time constant method
2. Draw the **negative envelope** $-Ae^{-at}$ (mirror image)
3. Sketch the **sinusoid** $\cos(\omega_0 t + \theta)$ between the envelopes, with the correct period $T_0 = 2\pi/\omega_0$ and phase delay

---

### Key Formulas at a Glance

$$\boxed{\tau = \frac{1}{a}} \qquad \text{(time constant)}$$

$$\boxed{e^{-a(t+\tau)} = \frac{1}{e} \cdot e^{-at} \approx 0.37 \cdot e^{-at}} \qquad \text{(37\% rule)}$$

$$\boxed{T_0 = \frac{2\pi}{\omega_0}} \qquad \text{(period of sinusoid)}$$

$$\boxed{\text{Time delay} = \frac{|\theta|}{360°} \times T_0} \qquad \text{(phase delay in time)}$$

---

### Common Mistakes to Avoid ⚠️

| Mistake | Correction |
|---|---|
| Thinking the signal reaches zero after one time constant | It only reaches **37%** of its value — it never truly reaches zero |
| Forgetting to mirror the envelope below the axis | You need **both** $+Ae^{-at}$ and $-Ae^{-at}$ |
| Confusing $\omega_0$ (rad/s) with $f_0$ (Hz) | Always use $T_0 = 2\pi/\omega_0$, not $1/\omega_0$ |
| Drawing the sinusoid with constant amplitude | The peaks must **shrink** to touch the decaying envelope |

---

### The Big Picture 🖼️

Sketching signals is about **understanding behavior**, not computing exact values. The time constant tells you *how fast* something decays. The envelope tells you *how large* an oscillation can be at any moment. Together, these two ideas let you draw a faithful picture of almost any exponential or oscillatory signal you'll encounter in this course.

---

## Page 5: Exam-Oriented Quiz Plan

### Quiz Plan for B.3 — Sketching Signals

---

**Quiz Title:** B.3 Sketching Signals — Exam Practice

**Format:** Mostly multiple-choice; short-answer where calculation or drawing is needed

**Recommended Time:** 20–25 minutes

---

### Question 1 — Multiple Choice

**Topic:** Definition of time constant

For the signal $x(t) = e^{-5t}$, what is the time constant $\tau$?

- A) $5$ seconds
- B) $1$ second
- C) $0.2$ seconds ✅
- D) $e^{-5}$ seconds

---

### Question 2 — Multiple Choice

**Topic:** 37% rule

A decaying exponential has a value of $10$ at $t = 0$ and a time constant of $\tau = 2$ s. What is its approximate value at $t = 2$ s?

- A) $10$
- B) $5$
- C) $3.7$ ✅
- D) $1.35$

---

### Question 3 — Multiple Choice

**Topic:** Value after multiple time constants

For $x(t) = e^{-3t}$, what is the approximate value of $x(t)$ at $t = 2/3$ s?

- A) $1/e \approx 0.37$
- B) $1/e^2 \approx 0.135$ ✅
- C) $1/e^3 \approx 0.050$
- D) $0$

> *Hint: The time constant is $1/3$ s, so $t = 2/3$ s is two time constants.*

---

### Question 4 — Multiple Choice

**Topic:** Growing exponential

For the signal $e^{at}$ (with $a > 0$), what happens to the signal over each interval of $1/a$ seconds?

- A) It decreases by a factor of $e$
- B) It increases by a factor of $e$ ✅
- C) It stays constant
- D) It decreases by 37%

---

### Question 5 — Multiple Choice

**Topic:** Envelope of exponentially varying sinusoid

For the signal $x(t) = 3e^{-t}\cos(4t + 30°)$, which pair of curves forms the envelope?

- A) $+3\cos(4t + 30°)$ and $-3\cos(4t + 30°)$
- B) $+3e^{-t}$ and $-3e^{-t}$ ✅
- C) $+e^{-t}$ and $-e^{-t}$
- D) $+3$ and $-3$

---

### Question 6 — Multiple Choice

**Topic:** When does the signal touch the envelope?

The signal $Ae^{-at}\cos(\omega_0 t + \theta)$ touches the positive envelope $+Ae^{-at}$ at the instants when:

- A) $\cos(\omega_0 t + \theta) = 0$
- B) $e^{-at} = 0$
- C) $\cos(\omega_0 t + \theta) = +1$ ✅
- D) $\cos(\omega_0 t + \theta) = -1$

---

### Question 7 — Multiple Choice

**Topic:** Period of sinusoidal component

For $x(t) = 2e^{-t}\cos(8t - 45°)$, what is the period $T_0$ of the sinusoidal component?

- A) $8$ seconds
- B) $2\pi \times 8$ seconds
- C) $\dfrac{2\pi}{8} \approx 0.785$ seconds ✅
- D) $\dfrac{1}{8}$ seconds

---

### Question 8 — Multiple Choice

**Topic:** Phase delay in time

For $x(t) = e^{-t}\cos(2\pi t - 90°)$, the period is $T_0 = 1$ s. What is the time delay caused by the $-90°$ phase shift?

- A) $90$ seconds
- B) $0.5$ seconds
- C) $0.25$ seconds ✅
- D) $1$ second

> *Hint: Time delay $= \dfrac{90°}{360°} \times 1 \text{ s} = 0.25$ s*

---

### Question 9 — Short Answer

**Topic:** Sketching a decaying exponential

For $x(t) = 6e^{-4t}$:

**(a)** What is the time constant?

**(b)** Fill in the table:

| $t$ (s) | $x(t)$ |
|---|---|
| $0$ | |
| $0.25$ | |
| $0.50$ | |
| $0.75$ | |

**(c)** Describe the shape of the sketch in words.

> **Answers:**
> (a) $\tau = 1/4 = 0.25$ s
> (b) $6,\ 6/e \approx 2.21,\ 6/e^2 \approx 0.81,\ 6/e^3 \approx 0.30$
> (c) Starts at 6, decreases smoothly and rapidly toward zero, approaching but never reaching