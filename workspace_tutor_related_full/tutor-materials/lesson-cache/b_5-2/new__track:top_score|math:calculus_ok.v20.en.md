# B.5-2: The Heaviside "Cover-Up" Method

---

## Page 1: Section Overview

Welcome! In this section, we're going to learn one of the most **elegant shortcuts** in all of partial fraction expansion — the **Heaviside "Cover-Up" Method**.

### What's the Big Picture?

Remember that partial fraction expansion is all about breaking a complicated rational function like:

$$F(x) = \frac{2x^2 + 9x - 11}{(x+1)(x-2)(x+3)}$$

into simpler pieces like:

$$F(x) = \frac{k_1}{x+1} + \frac{k_2}{x-2} + \frac{k_3}{x+3}$$

The challenge is always: **how do we find those constants** \(k_1, k_2, k_3\)?

The old way (solving simultaneous equations) works, but it's slow and tedious. The Heaviside method gives us those constants **almost instantly** — sometimes in your head!

---

### What We'll Cover in This Section

| Page | Topic |
|------|-------|
| 2 | The core idea: the Heaviside formula |
| 3 | Worked example with distinct real factors |
| 4 | Handling complex factors of Q(x) |
| 5 | Combining complex factors into quadratic form |
| 6 | Shortcuts for finding remaining coefficients |
| 7 | Recap & Summary |
| 8 | Quiz Plan |

---

### Prerequisites

Before diving in, make sure you're comfortable with:
- What a **proper rational function** is (degree of numerator < degree of denominator)
- Basic **partial fraction** setup (writing out the form with unknown constants)
- Simple **algebra** — substituting values into expressions

Let's go! 🚀

---

## Page 2: The Core Idea — The Heaviside Formula

### The Setup

We have a proper rational function with **all distinct (non-repeated) factors** in the denominator:

$$F(x) = \frac{P(x)}{(x - \lambda_1)(x - \lambda_2) \cdots (x - \lambda_n)}$$

We want to write it as:

$$F(x) = \frac{k_1}{x - \lambda_1} + \frac{k_2}{x - \lambda_2} + \cdots + \frac{k_n}{x - \lambda_n}$$

### The Key Question: How Do We Find \(k_r\)?

Here's the clever trick. To find \(k_1\), **multiply both sides by** \((x - \lambda_1)\):

$$(x - \lambda_1) F(x) = k_1 + \frac{k_2(x-\lambda_1)}{x-\lambda_2} + \frac{k_3(x-\lambda_1)}{x-\lambda_3} + \cdots$$

Now **let** \(x = \lambda_1\). Every term on the right **except** \(k_1\) contains a factor \((x - \lambda_1)\) which becomes **zero**. So:

$$(x - \lambda_1) F(x)\Big|_{x = \lambda_1} = k_1$$

### The General Formula

This works for any coefficient:

$$\boxed{k_r = (x - \lambda_r)\, F(x)\Big|_{x = \lambda_r}} \quad r = 1, 2, \ldots, n \tag{B.24}$$

> 💡 **This is also called the "method of residues."**

---

### The "Cover-Up" Interpretation

Here's the beautiful physical intuition:

- \((x - \lambda_r) \cdot F(x)\) means you're **canceling** the factor \((x - \lambda_r)\) from the denominator
- That's the same as **covering up** (hiding) that factor with your finger!
- Then you just **plug in** \(x = \lambda_r\) to whatever's left

**No algebra. No simultaneous equations. Just cover and substitute.**

---

## Page 3: Worked Example — Distinct Real Factors

### The Problem

Expand into partial fractions:

$$F(x) = \frac{2x^2 + 9x - 11}{(x+1)(x-2)(x+3)} = \frac{k_1}{x+1} + \frac{k_2}{x-2} + \frac{k_3}{x+3}$$

---

### Finding \(k_1\): Cover Up \((x+1)\), Let \(x = -1\)

The factor \((x+1)\) corresponds to the root \(\lambda_1 = -1\).

$$k_1 = \frac{2x^2 + 9x - 11}{\underbrace{(x+1)}_{\text{covered!}}(x-2)(x+3)}\Bigg|_{x=-1} = \frac{2(-1)^2 + 9(-1) - 11}{(-1-2)(-1+3)}$$

$$k_1 = \frac{2 - 9 - 11}{(-3)(2)} = \frac{-18}{-6} = \boxed{3}$$

---

### Finding \(k_2\): Cover Up \((x-2)\), Let \(x = 2\)

$$k_2 = \frac{2x^2 + 9x - 11}{(x+1)\underbrace{(x-2)}_{\text{covered!}}(x+3)}\Bigg|_{x=2} = \frac{2(4) + 9(2) - 11}{(2+1)(2+3)}$$

$$k_2 = \frac{8 + 18 - 11}{(3)(5)} = \frac{15}{15} = \boxed{1}$$

---

### Finding \(k_3\): Cover Up \((x+3)\), Let \(x = -3\)

$$k_3 = \frac{2x^2 + 9x - 11}{(x+1)(x-2)\underbrace{(x+3)}_{\text{covered!}}}\Bigg|_{x=-3} = \frac{2(9) + 9(-3) - 11}{(-3+1)(-3-2)}$$

$$k_3 = \frac{18 - 27 - 11}{(-2)(-5)} = \frac{-20}{10} = \boxed{-2}$$

---

### Final Answer

$$\boxed{F(x) = \frac{3}{x+1} + \frac{1}{x-2} - \frac{2}{x+3}}$$

> ✅ **Tip:** You can always verify by combining the fractions back together and checking you get the original numerator.

---

## Page 4: Complex Factors of Q(x)

### Good News First!

The Heaviside cover-up method works **exactly the same way** even when the denominator has **complex roots**. The only difference is that you'll be doing arithmetic with complex numbers.

---

### Example Setup

$$F(x) = \frac{4x^2 + 2x + 18}{(x+1)(x^2 + 4x + 13)}$$

First, factor the quadratic in the denominator using the quadratic formula:

$$x^2 + 4x + 13 = 0 \implies x = \frac{-4 \pm \sqrt{16 - 52}}{2} = -2 \pm j3$$

So:

$$F(x) = \frac{4x^2 + 2x + 18}{(x+1)(x+2-j3)(x+2+j3)} = \frac{k_1}{x+1} + \frac{k_2}{x+2-j3} + \frac{k_3}{x+2+j3}$$

---

### Finding \(k_1\): Cover Up \((x+1)\), Let \(x = -1\)

$$k_1 = \frac{4x^2 + 2x + 18}{x^2 + 4x + 13}\Bigg|_{x=-1} = \frac{4 - 2 + 18}{1 - 4 + 13} = \frac{20}{10} = \boxed{2}$$

---

### Finding \(k_2\): Cover Up \((x+2-j3)\), Let \(x = -2+j3\)

This is more involved — substitute \(x = -2 + j3\):

$$k_2 = \frac{4x^2 + 2x + 18}{(x+1)(x+2+j3)}\Bigg|_{x=-2+j3}$$

After careful complex arithmetic, this gives:

$$k_2 = 1 + j2 = \sqrt{5}\, e^{j63.43°}$$

---

### Finding \(k_3\): The Conjugate Shortcut!

> 🌟 **Key Insight:** When all coefficients of \(F(x)\) are **real**, the coefficients for complex-conjugate factors are always **complex conjugates of each other**.

So without any calculation:

$$k_3 = k_2^* = 1 - j2 = \sqrt{5}\, e^{-j63.43°}$$

**You only need to compute one of the two complex coefficients!**

---

### Final Answer (Complex Form)

$$F(x) = \frac{2}{x+1} + \frac{\sqrt{5}\,e^{j63.43°}}{x+2-j3} + \frac{\sqrt{5}\,e^{-j63.43°}}{x+2+j3}$$

---

## Page 5: Combining Complex Factors into Quadratic Form

### Why Bother?

Complex coefficients can be messy to work with. Often it's **cleaner and more useful** to combine the two complex-conjugate terms back into a **single fraction with a quadratic denominator**.

---

### The Setup

Instead of splitting into three terms with complex roots, we write:

$$F(x) = \frac{4x^2 + 2x + 18}{(x+1)(x^2+4x+13)} = \frac{k_1}{x+1} + \frac{c_1 x + c_2}{x^2 + 4x + 13}$$

> Notice the numerator of the quadratic term is **linear** (\(c_1 x + c_2\)), not just a constant. This is required because the denominator has degree 2.

---

### Step 1: Find \(k_1\) by Cover-Up (as before)

$$k_1 = 2 \quad \text{(computed on the previous page)}$$

So now:

$$\frac{4x^2 + 2x + 18}{(x+1)(x^2+4x+13)} = \frac{2}{x+1} + \frac{c_1 x + c_2}{x^2 + 4x + 13} \tag{B.26}$$

---

### Step 2: Clear Fractions

Multiply both sides by \((x+1)(x^2+4x+13)\):

$$4x^2 + 2x + 18 = 2(x^2+4x+13) + (c_1 x + c_2)(x+1)$$

Expand the right side:

$$= (2 + c_1)x^2 + (8 + c_1 + c_2)x + (26 + c_2)$$

---

### Step 3: Match Coefficients

| Power | Left Side | Right Side | Equation |
|-------|-----------|------------|----------|
| \(x^2\) | \(4\) | \(2 + c_1\) | \(c_1 = 2\) |
| \(x^1\) | \(2\) | \(8 + c_1 + c_2\) | \(c_2 = -8\) |
| \(x^0\) | \(18\) | \(26 + c_2\) | ✅ confirms \(c_2 = -8\) |

---

### Final Answer (Quadratic Form)

$$\boxed{F(x) = \frac{2}{x+1} + \frac{2x - 8}{x^2 + 4x + 13}}$$

This form is often **preferred** in signal processing and Laplace transform work!

---

## Page 6: Shortcuts for Finding Remaining Coefficients

### The Problem with Coefficient Matching

Expanding and matching powers of \(x\) always works, but it can get tedious. Here are **two powerful shortcuts** that save time.

---

### Shortcut 1: Let \(x = 0\)

After finding \(k_1\) by cover-up, substitute \(x = 0\) into the equation to get a relationship between the remaining unknowns.

**Example** (continuing from page 5, Eq. B.26):

$$\frac{4x^2 + 2x + 18}{(x+1)(x^2+4x+13)} = \frac{2}{x+1} + \frac{c_1 x + c_2}{x^2+4x+13}$$

Let \(x = 0\):

$$\frac{18}{(1)(13)} = \frac{2}{1} + \frac{c_2}{13}$$

$$\frac{18}{13} = 2 + \frac{c_2}{13} \implies c_2 = 18 - 26 = \boxed{-8}$$

> ⚠️ **Warning:** If \(x = 0\) makes any denominator zero (like when \(F(x)\) has an \(x\) factor), choose a different value like \(x = 1\).

---

### Shortcut 2: Multiply by \(x\), Then Let \(x \to \infty\)

This is a slick trick to isolate \(c_1\). Multiply both sides of the equation by \(x\):

$$\frac{x(4x^2 + 2x + 18)}{(x+1)(x^2+4x+13)} = \frac{2x}{x+1} + \frac{x(c_1 x + c_2)}{x^2+4x+13}$$

As \(x \to \infty\), only the **highest-power terms** survive in each fraction:

$$\frac{4x^3}{x^3} = \frac{2x}{x} + \frac{c_1 x^2}{x^2}$$

$$4 = 2 + c_1 \implies c_1 = \boxed{2}$$

---

### Another Example: When \(x = 0\) Fails

$$F(x) = \frac{2x^2 + 4x + 5}{x(x^2 + 2x + 5)} = \frac{k}{x} + \frac{c_1 x + c_2}{x^2 + 2x + 5}$$

**Cover-up gives:** \(k = \frac{5}{5} = 1\)

**Can't use \(x = 0\)** (denominator blows up). Use \(x = 1\) instead:

$$\frac{11}{8} = 1 + \frac{c_1 + c_2}{8} \implies c_1 + c_2 = 3$$

**Use the \(x \to \infty\) trick:**

$$2 = 1 + c_1 \implies c_1 = 1, \quad c_2 = 2$$

$$\boxed{F(x) = \frac{1}{x} + \frac{x + 2}{x^2 + 2x + 5}}$$

---

### Summary of Shortcuts

| Shortcut | When to Use | What It Gives |
|----------|-------------|---------------|
| Let \(x = 0\) | When no denominator vanishes at \(x=0\) | One equation relating unknowns |
| Let \(x =\) any convenient value | When \(x=0\) fails | Another equation |
| Multiply by \(x\), let \(x \to \infty\) | Always works | Isolates the highest-degree numerator coefficient |

---

## Page 7: Recap & Summary

### What We Learned in B.5-2

---

### 🔑 The Core Formula

For a proper rational function with **distinct factors**:

$$F(x) = \frac{P(x)}{(x-\lambda_1)(x-\lambda_2)\cdots(x-\lambda_n)} = \sum_{r=1}^{n} \frac{k_r}{x - \lambda_r}$$

Each coefficient is found by:

$$\boxed{k_r = (x - \lambda_r)\,F(x)\Big|_{x=\lambda_r}}$$

**In plain English:** Cover up the factor \((x - \lambda_r)\) in the denominator, then substitute \(x = \lambda_r\) into what's left.

---

### 🔑 Three Cases You Must Know

**Case 1 — Real Distinct Factors:**
Use cover-up directly. Fast, clean, no algebra needed.

**Case 2 — Complex Conjugate Factors:**
- Cover-up still works (complex arithmetic required)
- If coefficients of \(F(x)\) are real: \(k_3 = k_2^*\) (conjugate symmetry — only compute one!)

**Case 3 — Quadratic Denominator Form:**
Write \(\dfrac{c_1 x + c_2}{x^2 + bx + c}\) instead of splitting into complex fractions. Find \(k_1\) by cover-up, then find \(c_1\) and \(c_2\) using:
- Clearing fractions + matching coefficients, **or**
- Substituting convenient values of \(x\) (shortcuts)

---

### 🔑 The Two Key Shortcuts

| Method | Steps |
|--------|-------|
| **Substitute \(x = 0\)** | Plug in directly; gives one equation for unknowns |
| **Multiply by \(x\), let \(x \to \infty\)** | Gives the leading coefficient \(c_1\) instantly |

---

### 🔑 Common Mistakes to Avoid

> ❌ **Forgetting** that the numerator of a quadratic partial fraction must be **linear** (\(c_1 x + c_2\)), not just a constant.

> ❌ **Using \(x = 0\)** when the denominator has an \(x\) factor (it blows up — pick another value).

> ❌ **Not checking** conjugate symmetry — it can save you half the work with complex factors.

> ❌ **Forgetting** to verify: always combine your answer back and check it equals the original.

---

### Quick Reference Flowchart

```
Start: F(x) = P(x)/Q(x)
         |
         ▼
   Factor Q(x) completely
         |
    ┌────┴────┐
  Real      Complex
factors    factors
    |           |
Cover-up    Cover-up (complex arithmetic)
gives k_r   gives k_r; use conjugate symmetry
    |           |
    └────┬───────┘
         |
   Want quadratic form?
    Yes → write (c₁x + c₂)/(quadratic)
          use shortcuts to find c₁, c₂
```

---

## Page 8: Quiz Plan (Exam-Oriented)

### 📝 Quiz Plan: B.5-2 — The Heaviside Cover-Up Method

---

**Instructions for instructor:** This quiz tests understanding of the Heaviside cover-up method for partial fraction expansion, including real factors, complex factors, quadratic form, and coefficient shortcuts. Recommended time: 25–30 minutes.

---

#### Section A: Multiple Choice (2 points each)

---

**Q1.** The Heaviside cover-up method finds the coefficient \(k_r\) in a partial fraction expansion by