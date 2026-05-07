# B.5-2 The Heaviside "Cover-Up" Method

---

## Page 1: Section Overview

Welcome! In this section, we're going to learn one of the most satisfying shortcuts in all of mathematics — the **Heaviside "Cover-Up" Method** for partial fraction expansion.

### What's the Big Idea?

Remember partial fractions? We want to break a complicated rational function like:

$$F(x) = \frac{2x^2 + 9x - 11}{(x+1)(x-2)(x+3)}$$

into simpler pieces like:

$$F(x) = \frac{k_1}{x+1} + \frac{k_2}{x-2} + \frac{k_3}{x+3}$$

The old way meant setting up and solving a system of equations — tedious and error-prone. The Heaviside method lets you find each coefficient **almost instantly**, often in your head!

### What Will We Cover?

| Topic | What It Means |
|---|---|
| **Distinct real factors** | The basic cover-up trick |
| **Complex factors** | The same trick works with complex numbers |
| **Quadratic factors** | Combining complex pairs into one quadratic term |
| **Shortcuts** | Smart substitutions to avoid heavy algebra |

### Who Was Heaviside?

Oliver Heaviside (1850–1925) was a self-taught English engineer and mathematician. He invented this clever trick to make his own calculations faster. It's been saving students time ever since!

### Prerequisites

You should be comfortable with:
- What partial fractions are (Section B.5)
- Basic algebra and substitution
- The idea of factoring polynomials

Let's dive in! 🎯

---

## Page 2: The Core Idea — Why Does "Cover-Up" Work?

Before we use the trick, let's understand **why it works**. This will make it stick forever.

### Setting Up the Problem

Suppose we have a proper rational function with **distinct** (non-repeated) factors:

$$F(x) = \frac{P(x)}{(x - \lambda_1)(x - \lambda_2) \cdots (x - \lambda_n)}$$

We claim it can be written as:

$$F(x) = \frac{k_1}{x - \lambda_1} + \frac{k_2}{x - \lambda_2} + \cdots + \frac{k_n}{x - \lambda_n} \tag{B.23}$$

### How Do We Find \(k_1\)?

**Step 1:** Multiply both sides of equation (B.23) by \((x - \lambda_1)\):

$$(x - \lambda_1) F(x) = k_1 + \frac{k_2(x-\lambda_1)}{x-\lambda_2} + \frac{k_3(x-\lambda_1)}{x-\lambda_3} + \cdots$$

**Step 2:** Now let \(x = \lambda_1\). Watch what happens to the right side:

- The term \(k_1\) stays as \(k_1\) ✅
- Every other term has \((x - \lambda_1)\) in the numerator, which becomes **zero** ❌

So everything vanishes except \(k_1\)! We get:

$$\boxed{k_1 = (x - \lambda_1) F(x) \Big|_{x = \lambda_1}}$$

### The General Formula

The same logic works for any coefficient:

$$k_r = (x - \lambda_r) F(x) \Big|_{x = \lambda_r} \quad r = 1, 2, \ldots, n \tag{B.24}$$

### The "Cover-Up" Interpretation

Notice that \((x - \lambda_r) F(x)\) is just \(F(x)\) with the factor \((x - \lambda_r)\) **removed from the denominator**. So in practice:

> 🖐️ **Cover up** the factor \((x - \lambda_r)\) in the denominator of \(F(x)\) with your finger, then **plug in** \(x = \lambda_r\) into what remains.

That's it. That's the whole method!

---

## Page 3: The Basic Cover-Up Method — Worked Example

Let's work through **Example B.9** from the textbook step by step.

### The Problem

Find the partial fraction expansion of:

$$F(x) = \frac{2x^2 + 9x - 11}{(x+1)(x-2)(x+3)} = \frac{k_1}{x+1} + \frac{k_2}{x-2} + \frac{k_3}{x+3}$$

### Finding \(k_1\): Cover up \((x+1)\), let \(x = -1\)

The factor \((x+1)\) corresponds to the root \(x = -1\).

$$F(x) = \frac{2x^2 + 9x - 11}{\boxed{(x+1)}(x-2)(x+3)}$$

Cover up the boxed term, substitute \(x = -1\):

$$k_1 = \frac{2(-1)^2 + 9(-1) - 11}{(-1-2)(-1+3)} = \frac{2 - 9 - 11}{(-3)(2)} = \frac{-18}{-6} = 3$$

### Finding \(k_2\): Cover up \((x-2)\), let \(x = 2\)

$$F(x) = \frac{2x^2 + 9x - 11}{(x+1)\boxed{(x-2)}(x+3)}$$

Cover up the boxed term, substitute \(x = 2\):

$$k_2 = \frac{2(2)^2 + 9(2) - 11}{(2+1)(2+3)} = \frac{8 + 18 - 11}{(3)(5)} = \frac{15}{15} = 1$$

### Finding \(k_3\): Cover up \((x+3)\), let \(x = -3\)

$$F(x) = \frac{2x^2 + 9x - 11}{(x+1)(x-2)\boxed{(x+3)}}$$

Cover up the boxed term, substitute \(x = -3\):

$$k_3 = \frac{2(-3)^2 + 9(-3) - 11}{(-3+1)(-3-2)} = \frac{18 - 27 - 11}{(-2)(-5)} = \frac{-20}{10} = -2$$

### Final Answer

$$\boxed{F(x) = \frac{3}{x+1} + \frac{1}{x-2} - \frac{2}{x+3}}$$

### Quick Sanity Check 💡

You can verify by letting \(x = 0\):
- **Left side:** \(\frac{-11}{(1)(-2)(3)} = \frac{-11}{-6} = \frac{11}{6}\)
- **Right side:** \(\frac{3}{1} + \frac{1}{-2} + \frac{-2}{3} = 3 - 0.5 - 0.667 = \frac{11}{6}\) ✅

---

## Page 4: Complex Factors — The Cover-Up Still Works!

Great news: the Heaviside method works **even when the factors are complex numbers**. The algebra gets a bit messier, but the procedure is identical.

### Example Problem

$$F(x) = \frac{4x^2 + 2x + 18}{(x+1)(x^2 + 4x + 13)}$$

First, factor the quadratic in the denominator. The roots of \(x^2 + 4x + 13 = 0\) are:

$$x = \frac{-4 \pm \sqrt{16 - 52}}{2} = \frac{-4 \pm \sqrt{-36}}{2} = -2 \pm j3$$

So we can write:

$$F(x) = \frac{4x^2 + 2x + 18}{(x+1)(x+2-j3)(x+2+j3)} = \frac{k_1}{x+1} + \frac{k_2}{x+2-j3} + \frac{k_3}{x+2+j3} \tag{B.25}$$

### Finding \(k_1\): Cover up \((x+1)\), let \(x = -1\)

$$k_1 = \frac{4(1) + 2(-1) + 18}{((-1)+2-j3)((-1)+2+j3)} = \frac{4 - 2 + 18}{(1-j3)(1+j3)}$$

Note: \((1-j3)(1+j3) = 1 + 9 = 10\)

$$k_1 = \frac{20}{10} = 2$$

### Finding \(k_2\): Cover up \((x+2-j3)\), let \(x = -2+j3\)

$$k_2 = \frac{4(-2+j3)^2 + 2(-2+j3) + 18}{(-2+j3+1)(-2+j3+2+j3)}$$

After careful complex arithmetic:

$$k_2 = 1 + j2 = \sqrt{5}\, e^{j63.43°}$$

### Key Observation: Conjugate Pairs 🔑

When all coefficients of \(F(x)\) are **real numbers**, the coefficients for conjugate complex factors are always **complex conjugates** of each other:

$$k_3 = k_2^* = 1 - j2 = \sqrt{5}\, e^{-j63.43°}$$

> 💡 **Shortcut:** For real-coefficient functions, you only need to compute **one** of a conjugate pair — the other is automatically its complex conjugate!

### Final Answer

$$F(x) = \frac{2}{x+1} + \frac{\sqrt{5}\,e^{j63.43°}}{x+2-j3} + \frac{\sqrt{5}\,e^{-j63.43°}}{x+2+j3}$$

---

## Page 5: Quadratic Factors — Keeping It Real

Sometimes we **don't want** complex numbers in our answer. We'd rather combine the two complex-conjugate terms back into a single fraction with a **quadratic denominator**. Here's how.

### The Setup

Using the same example:

$$F(x) = \frac{4x^2 + 2x + 18}{(x+1)(x^2+4x+13)} = \frac{k_1}{x+1} + \frac{c_1 x + c_2}{x^2+4x+13} \tag{B.26}$$

Notice the numerator of the quadratic term is **linear** (\(c_1 x + c_2\)), not just a constant. This is necessary to match degrees properly.

### Step 1: Find \(k_1\) by Cover-Up

We already know: \(k_1 = 2\)

So:

$$\frac{4x^2 + 2x + 18}{(x+1)(x^2+4x+13)} = \frac{2}{x+1} + \frac{c_1 x + c_2}{x^2+4x+13}$$

### Step 2: Clear the Fractions

Multiply both sides by \((x+1)(x^2+4x+13)\):

$$4x^2 + 2x + 18 = 2(x^2+4x+13) + (c_1 x + c_2)(x+1)$$

Expand the right side:

$$= (2+c_1)x^2 + (8+c_1+c_2)x + (26+c_2)$$

### Step 3: Match Coefficients

| Power | Left side | Right side | Equation |
|---|---|---|---|
| \(x^2\) | \(4\) | \(2 + c_1\) | \(c_1 = 2\) |
| \(x^1\) | \(2\) | \(8 + c_1 + c_2\) | \(c_2 = -8\) |
| \(x^0\) | \(18\) | \(26 + c_2\) | \(c_2 = -8\) ✅ |

### Final Answer

$$\boxed{F(x) = \frac{2}{x+1} + \frac{2x-8}{x^2+4x+13}}$$

This form is often more useful in engineering applications (like inverse Laplace transforms)!

---

## Page 6: Shortcuts for Finding \(c_1\) and \(c_2\)

Matching all coefficients works, but there are **faster ways** to find \(c_1\) and \(c_2\) once you know \(k_1\).

### The Two Shortcuts

After finding \(k_1\) by cover-up, you have:

$$\frac{4x^2 + 2x + 18}{(x+1)(x^2+4x+13)} = \frac{2}{x+1} + \frac{c_1 x + c_2}{x^2+4x+13}$$

#### Shortcut 1: Let \(x = 0\) (eliminates \(c_1\))

Substituting \(x = 0\):

$$\frac{18}{(1)(13)} = \frac{2}{1} + \frac{c_2}{13}$$

$$\frac{18}{13} = 2 + \frac{c_2}{13} \implies c_2 = 18 - 26 = -8 \checkmark$$

#### Shortcut 2: Multiply by \(x\), then let \(x \to \infty\) (isolates \(c_1\))

Multiply both sides by \(x\):

$$\frac{4x^3 + 2x^2 + 18x}{(x+1)(x^2+4x+13)} = \frac{2x}{x+1} + \frac{c_1 x^2 + c_2 x}{x^2+4x+13}$$

As \(x \to \infty\), only the **highest-power terms** matter:

$$4 = 2 + c_1 \implies c_1 = 2 \checkmark$$

### Why These Values? Nothing Is Sacred! 🤷

> The textbook says it best: *"Nothing is sacred about these values."* We use \(x=0\) and \(x \to \infty\) because they're **convenient** — they reduce computation. You can use any value of \(x\) you like!

### Another Example: When \(x = 0\) Blows Up

For:
$$F(x) = \frac{2x^2+4x+5}{x(x^2+2x+5)} = \frac{1}{x} + \frac{c_1 x + c_2}{x^2+2x+5}$$

(where \(k=1\) found by cover-up)

- **Can't use \(x=0\)** — the left side becomes \(\infty\)!
- **Use \(x=1\) instead:** gives \(c_1 + c_2 = 3\)
- **Use \(x \to \infty\):** gives \(c_1 = 1\)
- **Therefore:** \(c_2 = 2\)

$$\boxed{F(x) = \frac{1}{x} + \frac{x+2}{x^2+2x+5}}$$

### The Golden Rule for Shortcuts

| Situation | What to do |
|---|---|
| \(x=0\) is valid | Use it to find \(c_2\) quickly |
| \(x=0\) gives \(\infty\) | Pick any other convenient value |
| Need \(c_1\) | Multiply by \(x\), let \(x \to \infty\) |
| Still stuck | Just match coefficients — always works! |

---

## Page 7: Recap and Summary

Let's pull everything together. Here's your complete guide to the Heaviside Cover-Up Method.

### The Big Picture

The Heaviside method finds partial fraction coefficients **without solving simultaneous equations**. The core formula is:

$$k_r = (x - \lambda_r) F(x) \Big|_{x=\lambda_r}$$

In plain English: **cover up** the factor \((x - \lambda_r)\) in the denominator, then **plug in** \(x = \lambda_r\).

---

### Summary of All Cases

#### Case 1: Distinct Real Factors ✅

$$F(x) = \frac{P(x)}{(x-\lambda_1)(x-\lambda_2)\cdots(x-\lambda_n)} = \frac{k_1}{x-\lambda_1} + \cdots + \frac{k_n}{x-\lambda_n}$$

**Method:** Cover up each factor, substitute the corresponding root. Done!

---

#### Case 2: Complex Conjugate Factors ✅

$$F(x) = \frac{P(x)}{(x+1)(x+2-j3)(x+2+j3)}$$

**Method:** Same cover-up procedure — just with complex arithmetic. For real-coefficient functions, \(k_3 = k_2^*\) automatically.

---

#### Case 3: Quadratic (Combined) Form ✅

$$F(x) = \frac{k_1}{x-\lambda_1} + \frac{c_1 x + c_2}{x^2 + bx + c}$$

**Method:**
1. Find \(k_1\) by cover-up
2. Find \(c_2\) by substituting \(x = 0\) (or another convenient value)
3. Find \(c_1\) by multiplying by \(x\) and letting \(x \to \infty\)

---

### Key Reminders

> 🔑 **The cover-up only works directly for non-repeated factors.** Repeated factors need the method in Section B.5-3.

> 🔑 **Always check your answer** by substituting a simple value of \(x\) into both sides.

> 🔑 **For real-coefficient functions**, complex coefficients always come in conjugate pairs — compute one, get the other free!

---

### Method Comparison

| Method | Best For | Drawback |
|---|---|---|
| Simultaneous equations | Any case | Slow, error-prone |
| Heaviside cover-up | Distinct factors | Doesn't directly handle repeated factors |
| Shortcuts (\(x=0\), \(x\to\infty\)) | Quadratic terms | Need to pick smart values |

---

## Page 8: Exam-Oriented Quiz Plan

### Quiz Plan: B.5-2 The Heaviside Cover-Up Method

---

**Q1.** *(Multiple Choice)* — *Core concept*

What does the Heaviside "cover-up" method allow you to do?

- A) Factor a polynomial denominator automatically
- B) Find partial fraction coefficients without solving simultaneous equations
- C) Convert complex numbers to polar form
- D) Expand a polynomial using the binomial theorem

> **Answer: B**

---

**Q2.** *(Multiple Choice)* — *Applying the formula*

For \(F(x) = \dfrac{3x + 5}{(x+1)(x+5)}\), what is \(k_1\) in \(F(x) = \dfrac{k_1}{x+1} + \dfrac{k_2}{x+5}\)?

- A) \(k_1 = \dfrac{3(-1)+5}{(-1+5)} = \dfrac{2}{4} = \dfrac{1}{2}\)
- B) \(k_1 = \dfrac{3(1)+5}{(1+1)(1+5)} = \dfrac{8}{12} = \dfrac{2}{3}\)
- C)