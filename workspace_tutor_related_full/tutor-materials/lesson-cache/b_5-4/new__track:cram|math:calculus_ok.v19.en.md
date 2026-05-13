# Section B.5-4: Combining Heaviside "Cover-Up" with Other Tricks

---

## Page 1: Section Overview

Welcome! In this section, we're going to learn a **smarter, more efficient way** to do partial fraction expansion — especially when you have **repeated roots** (factors that appear more than once).

### The Problem We're Solving

You already know two methods for partial fractions:

1. **Heaviside "Cover-Up" Method** — Fast and elegant, but gets messy when you need to take lots of derivatives for repeated roots
2. **Clearing Fractions** — Always works, but can involve solving big systems of equations

### The Big Idea of B.5-4

Why not **use both methods together**? 🎯

- Use **Heaviside** for the coefficients that are easy to find (simple roots, highest-order repeated root)
- Use **clearing fractions** or **clever shortcuts** for the remaining harder coefficients

This hybrid approach gives you the **best of both worlds** — less work, fewer mistakes.

### What We'll Cover

| Page | Topic |
|------|-------|
| 2 | Quick review: the repeated-root setup |
| 3 | Step 1 — Use Heaviside for the easy coefficients |
| 4 | Step 2 — Clear fractions to find the rest |
| 5 | The shortcut: multiply by x and let x → ∞ |
| 6 | Finishing up with a convenient substitution |
| 7 | Recap & Summary |
| 8 | Quiz Plan |

Let's dive in! 🚀

---

## Page 2: Quick Review — Setting Up Repeated Roots

Before we use our hybrid method, let's make sure the **setup** is crystal clear.

### The Example We'll Work Through

We want to expand:

$$F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)}$$

### Why Is This Tricky?

The denominator has:
- $$(x+1)^3$$ — a **repeated** root ($$x = -1$$ appears **three times**)
- $$(x+2)$$ — a **simple** root ($$x = -2$$ appears once)

### The Correct Partial Fraction Form

For a factor $$(x+1)^3$$, you need **one term for each power** from 1 up to 3:

$$F(x) = \frac{a_0}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{k}{x+2}$$

> 💡 **Why three terms for the cubic factor?** Because each power represents a genuinely different "piece" of the fraction. You can't capture all the behavior of a cubic factor with just one term.

### What We Need to Find

We have **four unknown coefficients**: $$a_0,\ a_1,\ a_2,\ k$$

The hybrid method will find these with **minimum effort**.

---

## Page 3: Step 1 — Use Heaviside for the Easy Coefficients

The Heaviside cover-up method works **perfectly** for two specific coefficients:

- $$k$$ — the coefficient of the **simple root** $$(x+2)$$
- $$a_0$$ — the coefficient of the **highest-power repeated factor** $$(x+1)^3$$

### Finding k (the Simple Root Coefficient)

**Cover up** $$(x+2)$$ in $$F(x)$$ and substitute $$x = -2$$:

$$k = \left.\frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3}\right|_{x=-2}$$

$$= \frac{4(-8) + 16(4) + 23(-2) + 13}{(-1)^3} = \frac{-32 + 64 - 46 + 13}{-1} = \frac{-1}{-1} = \boxed{1}$$

### Finding a₀ (the Highest-Power Repeated Coefficient)

**Cover up** $$(x+1)^3$$ in $$F(x)$$ and substitute $$x = -1$$:

$$a_0 = \left.\frac{4x^3 + 16x^2 + 23x + 13}{(x+2)}\right|_{x=-1}$$

$$= \frac{4(-1) + 16(1) + 23(-1) + 13}{(-1+2)} = \frac{-4 + 16 - 23 + 13}{1} = \boxed{2}$$

### What We Have So Far

$$\frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)} = \frac{2}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{1}{x+2}$$

Only **two unknowns remain**: $$a_1$$ and $$a_2$$ ✅

---

## Page 4: Step 2 — Clear Fractions to Find the Remaining Coefficients

Now we use the **clearing fractions** technique to find $$a_1$$ and $$a_2$$.

### Multiply Both Sides by $$(x+1)^3(x+2)$$

Starting from:

$$\frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)} = \frac{2}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{1}{x+2}$$

Multiply every term by $$(x+1)^3(x+2)$$:

$$4x^3 + 16x^2 + 23x + 13 = 2(x+2) + a_1(x+1)(x+2) + a_2(x+1)^2(x+2) + (x+1)^3$$

### Expand and Collect by Powers of x

After expanding the right side:

$$= (1 + a_2)x^3 + (a_1 + 4a_2 + 3)x^2 + (3a_1 + 5a_2 + 5)x + (2a_1 + 2a_2 + 5)$$

### Match Coefficients on Both Sides

| Power | Left Side | Right Side | Equation |
|-------|-----------|------------|----------|
| $$x^3$$ | 4 | $$1 + a_2$$ | $$1 + a_2 = 4$$ |
| $$x^2$$ | 16 | $$a_1 + 4a_2 + 3$$ | $$a_1 + 4a_2 + 3 = 16$$ |

### Solve the System

From the $$x^3$$ equation:
$$a_2 = 3$$

Substituting into the $$x^2$$ equation:
$$a_1 + 4(3) + 3 = 16 \implies a_1 = 1$$

> ✅ **Bonus check:** The $$x^1$$ and $$x^0$$ equations should also be satisfied. Plugging in $$a_1 = 1,\ a_2 = 3$$ confirms they are — great sign!

---

## Page 5: The Elegant Shortcut — Multiply by x, Let x → ∞

Here's a **slick trick** that avoids expanding polynomials entirely. It's one of the most satisfying shortcuts in partial fractions!

### The Setup

After finding $$k = 1$$ and $$a_0 = 2$$ by Heaviside, we have:

$$\frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)} = \frac{2}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{1}{x+2}$$

### The Trick: Multiply Both Sides by x

$$\frac{4x^4 + 16x^3 + 23x^2 + 13x}{(x+1)^3(x+2)} = \frac{2x}{(x+1)^3} + \frac{a_1 x}{(x+1)^2} + \frac{a_2 x}{x+1} + \frac{x}{x+2}$$

### Now Let x → ∞

As $$x \to \infty$$, each term simplifies beautifully:

- **Left side:** The leading terms dominate: $$\frac{4x^4}{x^4} = 4$$
- $$\frac{2x}{(x+1)^3} \to 0$$ (denominator grows faster)
- $$\frac{a_1 x}{(x+1)^2} \to 0$$ (denominator grows faster)
- $$\frac{a_2 x}{x+1} \to a_2$$
- $$\frac{x}{x+2} \to 1$$

So the equation becomes:

$$4 = 0 + 0 + a_2 + 1$$

$$\boxed{a_2 = 3}$$

> 💡 **Why does this work?** Multiplying by $$x$$ and taking $$x \to \infty$$ effectively "picks out" only the terms whose denominators grow at the **same rate** as $$x$$ — which isolates $$a_2$$ perfectly!

---

## Page 6: Finishing Up — Substitute a Convenient Value of x

Now that we know $$a_2 = 3$$, we have only **one unknown left**: $$a_1$$.

### Updated Equation

$$\frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)} = \frac{2}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{3}{x+1} + \frac{1}{x+2}$$

### Substitute Any Convenient Value of x

The easiest choice is usually $$x = 0$$ (small numbers, no negatives):

**Left side:**
$$\frac{4(0) + 16(0) + 23(0) + 13}{(0+1)^3(0+2)} = \frac{13}{1 \cdot 2} = \frac{13}{2}$$

**Right side:**
$$\frac{2}{1} + \frac{a_1}{1} + \frac{3}{1} + \frac{1}{2} = 2 + a_1 + 3 + \frac{1}{2} = a_1 + \frac{11}{2}$$

### Solve for a₁

$$\frac{13}{2} = a_1 + \frac{11}{2}$$

$$a_1 = \frac{13}{2} - \frac{11}{2} = \boxed{1}$$

### Final Answer

$$\boxed{F(x) = \frac{2}{(x+1)^3} + \frac{1}{(x+1)^2} + \frac{3}{x+1} + \frac{1}{x+2}}$$

This matches the result from the full Heaviside method — but we got there **much faster**! 🎉

---

## Page 7: Recap & Summary

Let's pull everything together into a clear, memorable picture.

### The Core Strategy of B.5-4

When you have a mix of **repeated and simple roots**, use a **hybrid approach**:

```
Step 1: Use Heaviside cover-up for the EASY coefficients
        → Simple roots: cover up, substitute
        → Highest-power repeated factor: cover up, substitute

Step 2: Find remaining coefficients using ONE of these:
        Option A: Clear fractions → expand → match coefficients
        Option B: Multiply by x, let x→∞ → find highest-order remaining coefficient
        Option C: Substitute a convenient x value (like x=0) → solve directly
```

### Summary Table of Techniques

| Technique | Best For | How |
|-----------|----------|-----|
| Heaviside Cover-Up | Simple roots & highest repeated power | Cover factor, substitute root |
| Clear Fractions | Any remaining coefficients | Multiply through, match powers |
| x → ∞ shortcut | Finding the "leading" unknown coefficient | Multiply by x, take limit |
| Convenient substitution | Last remaining unknown | Plug in x = 0 (or any easy value) |

### Key Formulas to Remember

For a repeated root $$(x - \lambda)^m$$, the partial fraction terms are:

$$\frac{a_0}{(x-\lambda)^m} + \frac{a_1}{(x-\lambda)^{m-1}} + \cdots + \frac{a_{m-1}}{x-\lambda}$$

The Heaviside formula for the **highest-power** coefficient:

$$a_0 = \left[(x-\lambda)^m F(x)\right]_{x=\lambda}$$

### Why This Matters

> The hybrid method saves you from taking multiple derivatives (which is error-prone) while also avoiding large systems of equations. In exams and real problems, **efficiency matters** just as much as correctness.

---

## Page 8: Quiz Plan 🎯

### Exam-Oriented Quiz: Section B.5-4

---

**Q1.** *(Multiple Choice)* When performing partial fraction expansion on

$$F(x) = \frac{5x^2 + 3x + 1}{(x+2)^2(x+5)}$$

which of the following is the **correct form** of the expansion?

- A) $$\frac{a_0}{(x+2)^2} + \frac{k}{x+5}$$
- B) $$\frac{a_0}{(x+2)^2} + \frac{a_1}{x+2} + \frac{k}{x+5}$$ ✅
- C) $$\frac{a_0}{(x+2)^2} + \frac{a_1}{(x+2)^2} + \frac{k}{x+5}$$
- D) $$\frac{a_0}{x+2} + \frac{k}{x+5}$$

---

**Q2.** *(Multiple Choice)* Using the Heaviside cover-up method on

$$F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)}$$

what is the value of $$a_0$$ (the coefficient of $$\frac{1}{(x+1)^3}$$)?

- A) 1
- B) 3
- C) 2 ✅
- D) 4

---

**Q3.** *(Multiple Choice)* In the "multiply by x and let x → ∞" shortcut, which type of coefficient does this technique directly isolate?

- A) The coefficient of the highest-power repeated factor
- B) The coefficient of the simple root
- C) The coefficient of the **lowest-power** repeated factor (i.e., the $$\frac{1}{x-\lambda}$$ term) ✅
- D) All coefficients simultaneously

---

**Q4.** *(Multiple Choice)* After finding $$k = 1$$ and $$a_0 = 2$$ for the example in B.5-4, a student substitutes $$x = 0$$ into the equation with $$a_2 = 3$$ already known. What equation do they get for $$a_1$$?

- A) $$13 = 2 + a_1 + 3 + 1$$
- B) $$\frac{13}{2} = 2 + a_1 + 3 + \frac{1}{2}$$ ✅
- C) $$\frac{13}{2} = a_1 + 3$$
- D) $$13 = a_1 + 6$$

---

**Q5.** *(Multiple Choice)* Which statement best describes the **advantage** of the hybrid method over pure Heaviside expansion for repeated roots?

- A) It always requires fewer total steps than any other method
- B) It avoids repeated differentiation while still using the fast cover-up for simple coefficients ✅
- C) It only works when there is exactly one repeated root
- D) It eliminates the need to set up any equations at all

---

**Q6.** *(Multiple Choice)* When clearing fractions in the hybrid method, you multiply both sides by the **full denominator**. What is the main purpose of then matching coefficients of different powers of x?

- A) To verify that the original function was proper
- B) To create a system of equations that determines the unknown coefficients ✅
- C) To convert the problem into a differential equation
- D) To find the roots of the denominator

---

**Q7.** *(Short Answer)* For the expansion

$$\frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)} = \frac{2}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{1}{x+2}$$

use the "multiply by x and let x → ∞" shortcut to find $$a_2$$. Show your reasoning in 2–3 sentences.

> **Expected Answer:** Multiply both sides by $$x$$ and take $$x \to \infty$$. The left side approaches 4 (ratio of leading terms). On the right, only $$\frac{a_2 x}{x+1} \to a_2$$ and $$\frac{x}{x+2} \to 1$$ survive; all other terms vanish. Therefore $$4 = a_2 + 1$$, giving $$a_2 = 3$$.

---

**Q8.** *(Short Answer)* Explain in your own words why the Heaviside cover-up method works perfectly for $$a_0$$ (the coefficient of the highest-power repeated factor) but requires derivatives for $$a_1, a_2$$, etc.

> **Expected Answer:** Multiplying $$F(x)$$ by $$(x-\lambda)^m$$ cancels the entire repeated factor in the denominator. Setting $$x = \lambda$$ then makes every term containing $$(x-\lambda)$$ vanish, leaving only $$a_0$$. For lower-power coefficients, those terms still have factors of $$(x-\lambda)$$ remaining after multiplication, so they don't vanish at $$x = \lambda$$ — differentiation is needed to "peel away" those extra factors one at a time.