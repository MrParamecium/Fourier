# B.5-2 The Heaviside "Cover-Up" Method

---

## Page 1: Section Overview

Welcome! In this section, we're going to learn one of the most **elegant shortcuts** in all of algebra: the **Heaviside Cover-Up Method** for partial fraction expansion.

### What's the Big Picture?

When we work with signals and systems, we often need to break a complicated fraction like this:

$$F(x) = \frac{2x^2 + 9x - 11}{(x+1)(x-2)(x+3)}$$

...into simpler pieces like this:

$$F(x) = \frac{3}{x+1} + \frac{1}{x-2} - \frac{2}{x+3}$$

This is called **partial fraction expansion**. The old way of doing it requires solving a system of simultaneous equations — which works, but can be slow and tedious.

The **Heaviside Cover-Up Method** lets you find each coefficient *directly*, one at a time, with almost no algebra. It's fast, clean, and satisfying to use.

### What Will We Cover?

| Page | Topic |
|------|-------|
| 2 | The core idea: what the cover-up method does and why it works |
| 3 | Distinct real factors — the basic cover-up procedure |
| 4 | Complex factors of Q(x) |
| 5 | Quadratic factors — combining complex pairs |
| 6 | Shortcuts for finding remaining coefficients |
| 7 | Recap & Summary |
| 8 | Quiz Plan |

### Prerequisites

You should be comfortable with:
- What a rational function is (a polynomial divided by a polynomial)
- Basic factoring of polynomials
- The idea of partial fractions (even if you're rusty)

Let's dive in! 🎯

---

## Page 2: The Core Idea — Why Does Cover-Up Work?

### The Setup

Suppose we have a proper rational function (degree of numerator < degree of denominator) with **distinct** (non-repeated) factors in the denominator:

$$F(x) = \frac{P(x)}{(x - \lambda_1)(x - \lambda_2) \cdots (x - \lambda_n)}$$

We want to write it as:

$$F(x) = \frac{k_1}{x - \lambda_1} + \frac{k_2}{x - \lambda_2} + \cdots + \frac{k_n}{x - \lambda_n}$$

The question is: **how do we find each coefficient** $$k_r$$?

### The Key Trick

To find $$k_1$$, multiply **both sides** by $$(x - \lambda_1)$$:

$$(x - \lambda_1) F(x) = k_1 + \frac{k_2(x-\lambda_1)}{x-\lambda_2} + \frac{k_3(x-\lambda_1)}{x-\lambda_3} + \cdots$$

Now **set** $$x = \lambda_1$$. Watch what happens on the right side:

- Every term except $$k_1$$ has a factor $$(x - \lambda_1)$$ in the numerator
- When $$x = \lambda_1$$, those factors become **zero**
- Only $$k_1$$ survives! ✅

So:

$$k_1 = (x - \lambda_1) F(x) \Big|_{x = \lambda_1}$$

### The General Formula

This works for **any** coefficient:

$$\boxed{k_r = (x - \lambda_r) F(x) \Big|_{x = \lambda_r}} \quad r = 1, 2, \ldots, n$$

### The "Cover-Up" Interpretation

Notice that multiplying $$F(x)$$ by $$(x - \lambda_r)$$ and then evaluating is the **same** as:

> 🖐️ **Covering up** (hiding) the factor $$(x - \lambda_r)$$ in the denominator of $$F(x)$$, then substituting $$x = \lambda_r$$ into what's left.

That's why it's called the **cover-up** method — you literally imagine covering the matching factor with your finger!

---

## Page 3: Distinct Real Factors — The Basic Procedure

### Step-by-Step Procedure

Let's work through the textbook example carefully.

**Problem:** Expand into partial fractions:

$$F(x) = \frac{2x^2 + 9x - 11}{(x+1)(x-2)(x+3)} = \frac{k_1}{x+1} + \frac{k_2}{x-2} + \frac{k_3}{x+3}$$

---

### Finding $$k_1$$ (factor: $$x+1$$, so $$\lambda_1 = -1$$)

**Step 1:** Cover up $$(x+1)$$ in the denominator:

$$\frac{2x^2 + 9x - 11}{\underbrace{(x+1)}_{\text{covered}} (x-2)(x+3)}$$

**Step 2:** Substitute $$x = -1$$ into what remains:

$$k_1 = \frac{2(-1)^2 + 9(-1) - 11}{(-1-2)(-1+3)} = \frac{2 - 9 - 11}{(-3)(2)} = \frac{-18}{-6} = 3$$

---

### Finding $$k_2$$ (factor: $$x-2$$, so $$\lambda_2 = 2$$)

Cover up $$(x-2)$$, substitute $$x = 2$$:

$$k_2 = \frac{2(2)^2 + 9(2) - 11}{(2+1)(2+3)} = \frac{8 + 18 - 11}{(3)(5)} = \frac{15}{15} = 1$$

---

### Finding $$k_3$$ (factor: $$x+3$$, so $$\lambda_3 = -3$$)

Cover up $$(x+3)$$, substitute $$x = -3$$:

$$k_3 = \frac{2(-3)^2 + 9(-3) - 11}{(-3+1)(-3-2)} = \frac{18 - 27 - 11}{(-2)(-5)} = \frac{-20}{10} = -2$$

---

### Final Answer

$$\boxed{F(x) = \frac{3}{x+1} + \frac{1}{x-2} - \frac{2}{x+3}}$$

### 💡 Quick Tips

- The factor you **cover up** always matches the value you **plug in** (e.g., cover $$(x+1)$$, plug in $$x = -1$$)
- Each coefficient is found **independently** — no simultaneous equations needed!
- Always double-check: if you recombine the fractions, you should get back the original $$F(x)$$

---

## Page 4: Complex Factors of Q(x)

### Good News First

The cover-up method works **exactly the same way** even when the factors of $$Q(x)$$ are complex numbers. The algebra is the same — you just get complex numbers as your answer.

### Example

$$F(x) = \frac{4x^2 + 2x + 18}{(x+1)(x+2-j3)(x+2+j3)}$$

This expands as:

$$F(x) = \frac{k_1}{x+1} + \frac{k_2}{x+2-j3} + \frac{k_3}{x+2+j3}$$

---

### Finding $$k_1$$ (cover up $$(x+1)$$, set $$x = -1$$)

$$k_1 = \frac{4(-1)^2 + 2(-1) + 18}{(-1+2-j3)(-1+2+j3)} = \frac{4 - 2 + 18}{(1-j3)(1+j3)} = \frac{20}{1+9} = \frac{20}{10} = 2$$

---

### Finding $$k_2$$ (cover up $$(x+2-j3)$$, set $$x = -2+j3$$)

$$k_2 = \frac{4(-2+j3)^2 + 2(-2+j3) + 18}{(-2+j3+1)(-2+j3+2+j3)}$$

After careful arithmetic (expanding $$(-2+j3)^2 = 4 - 12j - 9 = -5 - 12j$$):

$$k_2 = 1 + j2 = \sqrt{5}\, e^{j63.43°}$$

---

### Finding $$k_3$$

Since the original function has **real coefficients**, $$k_3$$ is simply the **complex conjugate** of $$k_2$$:

$$k_3 = 1 - j2 = \sqrt{5}\, e^{-j63.43°}$$

### 🌟 Important Shortcut for Real-Coefficient Functions

> When $$F(x)$$ has **real coefficients**, the coefficients for **complex-conjugate factor pairs** are always **complex conjugates of each other**.

This means you only need to compute **one** of them — the other is free!

---

## Page 5: Quadratic Factors — Combining Complex Pairs

### Why Combine?

Sometimes it's more convenient (especially in signal processing) to keep complex-conjugate pairs together as a **single quadratic term** rather than two separate complex fractions.

### The Setup

Instead of writing:

$$F(x) = \frac{k_1}{x+1} + \frac{k_2}{x+2-j3} + \frac{k_3}{x+2+j3}$$

We write:

$$F(x) = \frac{k_1}{x+1} + \frac{c_1 x + c_2}{x^2 + 4x + 13}$$

Note: $$(x+2-j3)(x+2+j3) = x^2 + 4x + 13$$ ✓

### Finding $$k_1$$ First

Use the cover-up method on the **real** factor $$(x+1)$$:

$$k_1 = \frac{4x^2 + 2x + 18}{x^2 + 4x + 13}\Bigg|_{x=-1} = \frac{4 - 2 + 18}{1 - 4 + 13} = \frac{20}{10} = 2$$

### Finding $$c_1$$ and $$c_2$$

Now we have:

$$\frac{4x^2 + 2x + 18}{(x+1)(x^2+4x+13)} = \frac{2}{x+1} + \frac{c_1 x + c_2}{x^2+4x+13}$$

**Clear the fractions** (multiply both sides by $$(x+1)(x^2+4x+13)$$):

$$4x^2 + 2x + 18 = 2(x^2+4x+13) + (c_1 x + c_2)(x+1)$$

**Expand the right side:**

$$= (2 + c_1)x^2 + (8 + c_1 + c_2)x + (26 + c_2)$$

**Match coefficients of each power of $$x$$:**

| Power | Left side | Right side | Equation |
|-------|-----------|------------|----------|
| $$x^2$$ | 4 | $$2 + c_1$$ | $$c_1 = 2$$ |
| $$x^1$$ | 2 | $$8 + c_1 + c_2$$ | $$c_2 = -8$$ |
| $$x^0$$ | 18 | $$26 + c_2$$ | ✓ confirms $$c_2 = -8$$ |

### Final Answer

$$\boxed{F(x) = \frac{2}{x+1} + \frac{2x - 8}{x^2 + 4x + 13}}$$

---

## Page 6: Shortcuts for Finding Remaining Coefficients

### The Problem

After using cover-up to find the coefficient(s) for simple factors, we still need $$c_1$$ and $$c_2$$ for quadratic terms. Matching all coefficients works, but there are **faster shortcuts**.

### Shortcut 1: Substitute $$x = 0$$

This is often the easiest substitution because it kills all $$x$$ terms instantly.

**Example** (continuing from Page 5):

$$\frac{4x^2 + 2x + 18}{(x+1)(x^2+4x+13)} = \frac{2}{x+1} + \frac{c_1 x + c_2}{x^2+4x+13}$$

Set $$x = 0$$:

$$\frac{18}{(1)(13)} = \frac{2}{1} + \frac{c_2}{13}$$

$$\frac{18}{13} = 2 + \frac{c_2}{13} \implies c_2 = 18 - 26 = -8 \checkmark$$

### Shortcut 2: Multiply by $$x$$ and Let $$x \to \infty$$

When $$x \to \infty$$, only the **highest-power terms** matter. This is a clean way to find $$c_1$$.

Multiply both sides by $$x$$, then let $$x \to \infty$$:

$$\frac{4x^3 + \cdots}{x^3 + \cdots} \to 4 \qquad \text{and} \qquad \frac{2x}{x} + \frac{c_1 x^2}{x^2} \to 2 + c_1$$

So: $$4 = 2 + c_1 \implies c_1 = 2 \checkmark$$

### When $$x = 0$$ Doesn't Work

If $$x = 0$$ causes a division by zero (e.g., when $$x$$ is itself a factor), just pick **any other convenient value** like $$x = 1$$ or $$x = 2$$.

**Example:**

$$F(x) = \frac{2x^2 + 4x + 5}{x(x^2 + 2x + 5)} = \frac{1}{x} + \frac{c_1 x + c_2}{x^2 + 2x + 5}$$

(Here $$k = 1$$ found by cover-up on factor $$x$$, setting $$x=0$$.)

- $$x = 0$$ gives $$\infty$$ on both sides — **skip it**
- Try $$x = 1$$: $$\frac{11}{8} = 1 + \frac{c_1 + c_2}{8} \implies c_1 + c_2 = 3$$
- Use the $$x \to \infty$$ trick: $$2 = 1 + c_1 \implies c_1 = 1$$
- Therefore $$c_2 = 2$$

$$\boxed{F(x) = \frac{1}{x} + \frac{x + 2}{x^2 + 2x + 5}}$$

### 🗝️ Key Principle

> There's nothing magic about $$x = 0$$ or $$x \to \infty$$. We use them because they're **convenient**. You can always substitute **any** value of $$x$$ to generate equations for the unknowns.

---

## Page 7: Recap & Summary

### What We Learned

The **Heaviside Cover-Up Method** is a fast, direct technique for finding partial fraction coefficients. Here's the complete picture:

---

### 🔑 Core Formula

For distinct factors, the coefficient of $$\dfrac{k_r}{x - \lambda_r}$$ is:

$$\boxed{k_r = (x - \lambda_r) F(x)\Big|_{x=\lambda_r}}$$

In plain English: **cover up** the factor $$(x - \lambda_r)$$ in the denominator, then **plug in** $$x = \lambda_r$$.

---

### 📋 Summary Table

| Situation | Method |
|-----------|--------|
| **Distinct real factors** | Cover-up directly for each $$k_r$$ |
| **Complex conjugate factors** | Cover-up works the same; conjugate pairs give conjugate coefficients |
| **Quadratic (combined) form** | Use cover-up for real factors; find $$c_1, c_2$$ by substitution or $$x \to \infty$$ trick |
| **Repeated factors** | Covered in Section B.5-3 (requires derivatives) |

---

### 🛠️ Toolkit of Shortcuts

1. **Cover-up** → finds coefficients for simple (linear) factors instantly
2. **Substitute $$x = 0$$** → eliminates $$c_1$$ term, solves for $$c_2$$ quickly
3. **Multiply by $$x$$, let $$x \to \infty$$** → isolates $$c_1$$ (highest-degree coefficient)
4. **Substitute any convenient $$x$$** → generates equations when other shortcuts fail
5. **Conjugate symmetry** → for real-coefficient functions, $$k^* = k$$ for conjugate factor pairs

---

### ⚠️ Common Mistakes to Avoid

| Mistake | Fix |
|---------|-----|
| Plugging in the wrong value of $$x$$ | The value must make the **covered factor = 0** |
| Forgetting to cover up the right factor | Cover the factor that **matches** your substitution value |
| Using $$x = 0$$ when $$x$$ is a denominator factor | Choose a different value like $$x = 1$$ |
| Stopping after cover-up when quadratic terms remain | You still need to find $$c_1$$ and $$c_2$$ |

---

### The Big Picture

The Heaviside method transforms what used to be a system of $$n$$ equations into $$n$$ **independent one-line calculations**. It's one of the most practical tools you'll use when working with Laplace transforms and system analysis throughout this course.

---

## Page 8: Quiz Plan (Exam-Oriented)

### 📝 Quiz Plan: B.5-2 Heaviside Cover-Up Method

---

**Q1.** *(Multiple Choice)* — *Core concept*

To find the coefficient $$k_2$$ in the expansion:

$$\frac{5x + 3}{(x+1)(x-2)(x+4)} = \frac{k_1}{x+1} + \frac{k_2}{x-2} + \frac{k_3}{x+4}$$

which of the following correctly applies the cover-up method?

- A) Cover up $$(x+1)$$ and substitute $$x = 1$$
- B) Cover up $$(x-2)$$ and substitute $$x = 2$$
- C) Cover up $$(x-2)$$ and substitute $$x = -2$$
- D) Cover up $$(x+4)$$ and substitute $$x = 2$$

> **Answer: B**

---

**Q2.** *(Multiple Choice)* — *Direct calculation*

Using the cover-up