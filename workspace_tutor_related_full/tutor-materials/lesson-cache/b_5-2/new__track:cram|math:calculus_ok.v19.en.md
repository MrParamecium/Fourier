# B.5-2: The Heaviside "Cover-Up" Method

---

## Page 1: Section Overview

Welcome! In this section, we're going to learn one of the most **elegant shortcuts** in all of partial fraction expansion — the **Heaviside "Cover-Up" Method**.

### What's the Big Picture?

Remember that partial fraction expansion is all about breaking a complicated rational function like:

$$F(x) = \frac{2x^2 + 9x - 11}{(x+1)(x-2)(x+3)}$$

into simpler pieces like:

$$F(x) = \frac{3}{x+1} + \frac{1}{x-2} - \frac{2}{x+3}$$

The old way (from B.5-1) required solving a system of simultaneous equations — which works, but can be slow and tedious. The Heaviside method gives us those coefficients **almost instantly**.

### What Will We Cover?

| Page | Topic |
|------|-------|
| 2 | The core idea: What is the Cover-Up Method? |
| 3 | Distinct real factors — worked example |
| 4 | Complex factors of Q(x) |
| 5 | Quadratic factors and shortcuts |
| 6 | Recap & Summary |
| 7 | Quiz Plan |

### Prerequisites

You should already be comfortable with:
- What a rational function is (numerator and denominator are polynomials)
- The basic idea of partial fractions (splitting into simpler fractions)
- Plugging values into algebraic expressions

Let's dive in! 🎯

---

## Page 2: The Core Idea — What Is the Cover-Up Method?

### The Setup

Suppose we have a proper rational function with **distinct** (non-repeated) factors in the denominator:

$$F(x) = \frac{P(x)}{(x - \lambda_1)(x - \lambda_2) \cdots (x - \lambda_n)}$$

We want to write it as:

$$F(x) = \frac{k_1}{x - \lambda_1} + \frac{k_2}{x - \lambda_2} + \cdots + \frac{k_n}{x - \lambda_n}$$

The question is: **how do we find each coefficient** \(k_1, k_2, \ldots, k_n\)?

### The Key Formula

Here's the magic formula. To find coefficient \(k_r\):

$$\boxed{k_r = (x - \lambda_r) \cdot F(x) \Big|_{x = \lambda_r}}$$

In plain English: **multiply both sides by** \((x - \lambda_r)\), then **plug in** \(x = \lambda_r\).

### Why Does This Work?

Let's see it for \(k_1\). Multiply both sides by \((x - \lambda_1)\):

$$(x - \lambda_1) F(x) = k_1 + \frac{k_2(x-\lambda_1)}{x-\lambda_2} + \frac{k_3(x-\lambda_1)}{x-\lambda_3} + \cdots$$

Now let \(x = \lambda_1\). Every term on the right **except** \(k_1\) has a factor \((x - \lambda_1)\) in the numerator, so they all go to **zero**. We're left with:

$$(x - \lambda_1) F(x)\Big|_{x=\lambda_1} = k_1 \checkmark$$

### The "Cover-Up" Trick 🤚

Here's the physical intuition that gives this method its name:

> **Literally cover up** the factor \((x - \lambda_r)\) in the denominator of \(F(x)\) with your finger, then substitute \(x = \lambda_r\) into what remains.

That's it! You're essentially doing the multiplication and substitution in one mental step.

This method is also called the **method of residues** in some textbooks.

---

## Page 3: Distinct Real Factors — Worked Example

### Example B.9 Step by Step

Let's expand:

$$F(x) = \frac{2x^2 + 9x - 11}{(x+1)(x-2)(x+3)} = \frac{k_1}{x+1} + \frac{k_2}{x-2} + \frac{k_3}{x+3}$$

We need to find \(k_1\), \(k_2\), and \(k_3\).

---

### Finding \(k_1\) (factor: \(x+1\), so \(\lambda_1 = -1\))

**Cover up** \((x+1)\) in the denominator, substitute \(x = -1\):

$$k_1 = \frac{2x^2 + 9x - 11}{\cancel{(x+1)}(x-2)(x+3)}\Bigg|_{x=-1} = \frac{2(-1)^2 + 9(-1) - 11}{(-1-2)(-1+3)}$$

$$= \frac{2 - 9 - 11}{(-3)(2)} = \frac{-18}{-6} = \boxed{3}$$

---

### Finding \(k_2\) (factor: \(x-2\), so \(\lambda_2 = 2\))

**Cover up** \((x-2)\), substitute \(x = 2\):

$$k_2 = \frac{2x^2 + 9x - 11}{(x+1)\cancel{(x-2)}(x+3)}\Bigg|_{x=2} = \frac{2(4) + 9(2) - 11}{(2+1)(2+3)}$$

$$= \frac{8 + 18 - 11}{(3)(5)} = \frac{15}{15} = \boxed{1}$$

---

### Finding \(k_3\) (factor: \(x+3\), so \(\lambda_3 = -3\))

**Cover up** \((x+3)\), substitute \(x = -3\):

$$k_3 = \frac{2x^2 + 9x - 11}{(x+1)(x-2)\cancel{(x+3)}}\Bigg|_{x=-3} = \frac{2(9) + 9(-3) - 11}{(-3+1)(-3-2)}$$

$$= \frac{18 - 27 - 11}{(-2)(-5)} = \frac{-20}{10} = \boxed{-2}$$

---

### Final Answer

$$\boxed{F(x) = \frac{3}{x+1} + \frac{1}{x-2} - \frac{2}{x+3}}$$

### ✅ Quick Sanity Check

You can verify by multiplying everything back out and confirming you get \(2x^2 + 9x - 11\) in the numerator. Always a good habit!

---

## Page 4: Complex Factors of Q(x)

### Great News: The Method Still Works!

The Heaviside cover-up method works **even when the factors of** \(Q(x)\) **are complex numbers**. The algebra is the same — you just end up with complex-valued coefficients.

### Example

Consider:

$$F(x) = \frac{4x^2 + 2x + 18}{(x+1)(x^2 + 4x + 13)}$$

First, factor the quadratic in the denominator. The roots of \(x^2 + 4x + 13 = 0\) are:

$$x = \frac{-4 \pm \sqrt{16 - 52}}{2} = \frac{-4 \pm \sqrt{-36}}{2} = -2 \pm j3$$

So we can write:

$$F(x) = \frac{4x^2 + 2x + 18}{(x+1)(x+2-j3)(x+2+j3)} = \frac{k_1}{x+1} + \frac{k_2}{x+2-j3} + \frac{k_3}{x+2+j3}$$

---

### Finding \(k_1\) (cover up \(x+1\), let \(x = -1\)):

$$k_1 = \frac{4(1) + 2(-1) + 18}{(-1)^2 + 4(-1) + 13} = \frac{4 - 2 + 18}{1 - 4 + 13} = \frac{20}{10} = \boxed{2}$$

### Finding \(k_2\) (cover up \(x+2-j3\), let \(x = -2+j3\)):

This requires substituting a complex number — messy but mechanical. The result is:

$$k_2 = 1 + j2 = \sqrt{5}\, e^{j63.43°}$$

### The Conjugate Shortcut 🎉

Here's a beautiful property: **when all coefficients of** \(F(x)\) **are real**, the coefficients for complex-conjugate factors are always complex conjugates of each other:

$$k_3 = k_2^* = 1 - j2 = \sqrt{5}\, e^{-j63.43°}$$

> **You only need to compute one of them!** The other is just its conjugate.

---

### Combining Complex Pairs into a Quadratic

Often it's cleaner to **avoid complex numbers entirely** by keeping the quadratic factor together:

$$F(x) = \frac{4x^2 + 2x + 18}{(x+1)(x^2+4x+13)} = \frac{k_1}{x+1} + \frac{c_1 x + c_2}{x^2+4x+13}$$

We already know \(k_1 = 2\). So:

$$\frac{4x^2 + 2x + 18}{(x+1)(x^2+4x+13)} = \frac{2}{x+1} + \frac{c_1 x + c_2}{x^2+4x+13}$$

Clear fractions (multiply both sides by \((x+1)(x^2+4x+13)\)):

$$4x^2 + 2x + 18 = 2(x^2+4x+13) + (c_1 x + c_2)(x+1)$$

$$= (2+c_1)x^2 + (8+c_1+c_2)x + (26+c_2)$$

Matching coefficients of each power of \(x\):

| Power | Left side | Right side | Equation |
|-------|-----------|------------|----------|
| \(x^2\) | 4 | \(2 + c_1\) | \(c_1 = 2\) |
| \(x^1\) | 2 | \(8 + c_1 + c_2\) | \(c_2 = -8\) |
| \(x^0\) | 18 | \(26 + c_2\) | confirms \(c_2 = -8\) ✓ |

$$\boxed{F(x) = \frac{2}{x+1} + \frac{2x-8}{x^2+4x+13}}$$

---

## Page 5: Shortcuts for Finding \(c_1\) and \(c_2\)

### The Problem with Quadratic Numerators

When we have a quadratic factor in the denominator, we need to find two unknowns (\(c_1\) and \(c_2\)) in the numerator. Clearing fractions and matching coefficients works, but there are **faster shortcuts**.

### Shortcut Strategy

After finding \(k_1\) by the cover-up method, we have:

$$\frac{P(x)}{Q(x)} = \frac{k_1}{x - \lambda_1} + \frac{c_1 x + c_2}{x^2 + bx + c}$$

We need two equations to find \(c_1\) and \(c_2\). Here are two clever choices:

---

### Shortcut 1: Let \(x = 0\)

Plugging \(x = 0\) into both sides gives a simple numerical equation (as long as neither side blows up to infinity).

**Example** (from the textbook): With \(k_1 = 2\) already found:

$$\frac{4(0) + 2(0) + 18}{(0+1)(0+4+13)} = \frac{2}{0+1} + \frac{c_2}{13}$$

$$\frac{18}{13} = 2 + \frac{c_2}{13} \implies c_2 = 18 - 26 = -8 \checkmark$$

---

### Shortcut 2: Multiply by \(x\), then let \(x \to \infty\)

When \(x \to \infty\), **only the highest-power terms matter**. This isolates \(c_1\) cleanly.

Multiply both sides of the equation by \(x\), then let \(x \to \infty\):

$$\lim_{x\to\infty} x \cdot F(x) = \lim_{x\to\infty}\left[\frac{2x}{x+1} + \frac{(c_1 x + c_2)x}{x^2+4x+13}\right]$$

As \(x \to \infty\): the left side \(\to 4\) (leading coefficient ratio), and the right side \(\to 2 + c_1\):

$$4 = 2 + c_1 \implies c_1 = 2 \checkmark$$

---

### When \(x = 0\) Doesn't Work

If \(Q(x)\) has \(x\) as a factor (i.e., \(x = 0\) is a root), then letting \(x = 0\) gives \(\infty\). Instead, choose any other convenient value like \(x = 1\) or \(x = 2\).

**Example:**

$$F(x) = \frac{2x^2 + 4x + 5}{x(x^2+2x+5)} = \frac{k}{x} + \frac{c_1 x + c_2}{x^2+2x+5}$$

Cover-up gives \(k = 1\). Now \(x = 0\) fails (division by zero), so try \(x = 1\):

$$\frac{2 + 4 + 5}{1(1+2+5)} = 1 + \frac{c_1 + c_2}{8} \implies \frac{11}{8} = 1 + \frac{c_1+c_2}{8} \implies c_1 + c_2 = 3$$

Then use the \(x \to \infty\) trick:

$$2 = 1 + c_1 \implies c_1 = 1$$

Therefore \(c_2 = 2\), and:

$$\boxed{F(x) = \frac{1}{x} + \frac{x+2}{x^2+2x+5}}$$

### 💡 Key Takeaway

> There's nothing magical about \(x = 0\) or \(x \to \infty\). They're just **convenient choices** that minimize arithmetic. You can always use any value of \(x\) — just pick ones that make the numbers easy!

---

## Page 6: Recap & Summary

### What We Learned in B.5-2

Let's pull everything together into a clean reference.

---

### 🔑 The Heaviside Cover-Up Formula

For distinct factors, the coefficient \(k_r\) is:

$$\boxed{k_r = (x - \lambda_r) \cdot F(x)\Big|_{x = \lambda_r}}$$

**Physical action:** Cover the factor \((x - \lambda_r)\) in the denominator, substitute \(x = \lambda_r\) into the rest.

---

### 📋 Step-by-Step Procedure

**Case 1: All distinct real factors**

1. Write out the partial fraction form with unknown \(k_r\) for each factor.
2. For each factor \((x - \lambda_r)\): cover it up, plug in \(x = \lambda_r\), done.

**Case 2: Complex conjugate factors**

1. Either apply cover-up with complex numbers directly, **or**
2. Keep the quadratic factor together: use \(\frac{c_1 x + c_2}{x^2 + bx + c}\).
3. Find \(k_1\) by cover-up, then find \(c_1, c_2\) using shortcuts.

**Case 3: Quadratic factors — finding \(c_1\) and \(c_2\)**

| Shortcut | How | Finds |
|----------|-----|-------|
| Let \(x = 0\) | Direct substitution (if valid) | Usually \(c_2\) |
| Multiply by \(x\), let \(x \to \infty\) | Only highest powers survive | Usually \(c_1\) |
| Let \(x =\) any convenient value | Pick values that simplify arithmetic | Either |

---

### ⚠️ Common Mistakes to Avoid

| Mistake | Fix |
|---------|-----|
| Substituting the wrong value of \(x\) | If factor is \((x + a)\), substitute \(x = -a\) |
| Forgetting to cover up the right factor | Cover the factor whose root you're substituting |
| Using \(x = 0\) when \(Q(0) = 0\) | Choose a different value like \(x = 1\) |
| Forgetting that complex conjugate pairs give conjugate coefficients | Only compute one; the other is its conjugate |

---

### 🗺️ Big Picture

```
F(x) = P(x)/Q(x)
         |
         ├── All distinct real factors? → Pure Cover-Up Method
         |
         ├── Complex conjugate factors? → Cover-Up (complex) OR keep as quadratic
         |
         └── Quadratic factor in denominator? → Cover-Up for k₁, then shortcuts for c₁, c₂
```

---

### Key Formulas at a Glance

$$k_r = (x-\lambda_r)F(x)\Big|_{x=\lambda_r} \quad \text{(Heaviside Cover-Up)}$$

$$\text{For complex conjugates: } k_3 = k_2^* \quad \text{(when coefficients of } F(x) \text{ are real)}$$

$$\text{As } x \to \infty: \quad x \cdot F(x) \to \text{(ratio of leading coefficients)} \quad \text{(finds } c_1\text{)}$$

---

## Page 7: Quiz Plan (Exam-Oriented)

### 📝 Quiz Plan: B.5-2 — The Heaviside Cover-Up Method

---

**Instructions for instructor:** This quiz tests understanding of the Heaviside cover-up method for partial fraction expansion, including distinct real factors, complex factors, and quadratic factors with shortcuts. Mostly multiple-choice; short-answer for computation-heavy items.

---

### Section A: Conceptual Multiple Choice

**Q1.** The Heaviside cover-up method finds the coefficient \(k_r\) in a partial fraction expansion by:

- (A) Solving a system of simultaneous equations
- (B) Multiplying \(F(x)\) by \((x - \lambda_r)\) and substituting \(x = \lambda_r\)
- (C) Taking the derivative of \(F(x)\) and evaluating at \(x = \lambda_r\)
- (D) Integrating \(F(x)\) over the interval \([0, \lambda_r]\)

> ✅ **Answer: (B)**

---

**Q2.** For the function \(F(x) = \dfrac{5x + 3}{(x+1)(x+4)}\), to find the coefficient of \(\dfrac{1}{x+4}\) using the cover-up method, you should substitute:

- (A) $x