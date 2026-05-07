# Section B.5-3: Partial Fraction Expansion with Repeated Factors

---

## Page 1: Section Overview

Welcome! In this section, we're going to tackle one of the trickier parts of partial fraction expansion: **what happens when your denominator has repeated factors**.

### What's the Big Idea?

You already know how to handle partial fractions when all the factors in the denominator are *different* (unrepeated). That's the classic Heaviside "cover-up" method. But what if a factor shows up **more than once**? Like $$(x+1)^3$$? That's what this section is all about.

### Why Does This Matter?

In signal processing and linear systems, you'll constantly need to break complicated fractions into simpler pieces so you can work with them (especially for inverse Laplace or Z-transforms). Repeated factors come up all the time in real systems — for example, a system with a **repeated pole**.

### What You'll Learn

By the end of this section, you'll be able to:

1. **Recognize** when a denominator has repeated factors
2. **Set up** the correct partial fraction expansion for repeated factors
3. **Calculate** the coefficients using a systematic derivative-based formula
4. **Combine** the method with the standard Heaviside cover-up for mixed cases

### The Road Map

| Page | Topic |
|------|-------|
| 2 | What repeated factors look like & how to set up the expansion |
| 3 | Finding coefficients: the formula and the cover-up method |
| 4 | Worked Example B.10 step by step |
| 5 | Recap & Summary |
| 6 | Quiz |

Let's dive in! 🎯

---

## Page 2: Setting Up the Expansion for Repeated Factors

### What Does a "Repeated Factor" Look Like?

Imagine you have a fraction like this:

$$F(x) = \frac{P(x)}{(x - \lambda)^r (x - \alpha_1)(x - \alpha_2) \cdots (x - \alpha_j)}$$

The key thing to notice is \((x - \lambda)^r\) — that factor appears **\(r\) times** (it's raised to the power \(r\)). The other factors \((x - \alpha_1), (x - \alpha_2), \ldots\) each appear just once (unrepeated).

### Why Can't We Just Use the Old Cover-Up Method?

With the standard Heaviside method, each factor gets **one** coefficient. But a repeated factor like \((x-\lambda)^r\) needs **\(r\) separate coefficients** — one for each "level" of the repetition. If you tried to cover up \((x-\lambda)^r\) and plug in \(x = \lambda\), you'd only get one number, and that's not enough information.

### The Correct Setup

For the function above, the partial fraction expansion is:

$$F(x) = \frac{a_0}{(x-\lambda)^r} + \frac{a_1}{(x-\lambda)^{r-1}} + \cdots + \frac{a_{r-1}}{(x-\lambda)} + \frac{k_1}{x-\alpha_1} + \frac{k_2}{x-\alpha_2} + \cdots + \frac{k_j}{x-\alpha_j}$$

### Breaking This Down

Think of it this way: for a factor \((x - \lambda)^r\), you need **one term for every power from 1 up to \(r\)**:

$$\underbrace{\frac{a_0}{(x-\lambda)^r}}_{\text{power } r} + \underbrace{\frac{a_1}{(x-\lambda)^{r-1}}}_{\text{power } r-1} + \cdots + \underbrace{\frac{a_{r-1}}{(x-\lambda)}}_{\text{power } 1}$$

> 💡 **Quick Rule:** A factor repeated \(r\) times contributes exactly \(r\) terms to the partial fraction expansion.

### The Unrepeated Factors

The coefficients \(k_1, k_2, \ldots, k_j\) for the **unrepeated** factors are found the same old way — the standard Heaviside cover-up method. No new tricks needed there!

### A Concrete Example Setup

If you have:

$$F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)}$$

Then \((x+1)\) is repeated **3 times**, and \((x+2)\) appears once. So you write:

$$F(x) = \frac{a_0}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{k}{x+2}$$

Four unknowns total: \(a_0, a_1, a_2, k\). Next, we'll see how to find them!

---

## Page 3: Finding the Coefficients — The Derivative Formula

### Step 1: Find the Unrepeated Coefficients First

The coefficients \(k_1, k_2, \ldots\) for the unrepeated factors are found using the **standard Heaviside cover-up**:

$$k_i = (x - \alpha_i) F(x) \Big|_{x = \alpha_i}$$

Just cover up the factor \((x - \alpha_i)\) in \(F(x)\) and substitute \(x = \alpha_i\). Easy!

### Step 2: Multiply Both Sides by \((x - \lambda)^r\)

To find the \(a\) coefficients, multiply both sides of the expansion by \((x - \lambda)^r\):

$$(x-\lambda)^r F(x) = a_0 + a_1(x-\lambda) + a_2(x-\lambda)^2 + \cdots + a_{r-1}(x-\lambda)^{r-1} + \text{(terms with } k\text{'s)}$$

Let's call the left side a new function:

$$G(x) = (x - \lambda)^r F(x)$$

This is just \(F(x)\) with the \((x-\lambda)^r\) **removed from the denominator**.

### Step 3: The General Formula

Now here's the key formula. To find coefficient \(a_j\):

$$\boxed{a_j = \frac{1}{j!} \frac{d^j}{dx^j} \left[ (x-\lambda)^r F(x) \right]_{x=\lambda}}$$

In plain English:
- **Remove** \((x-\lambda)^r\) from the denominator of \(F(x)\) to get \(G(x)\)
- Take the **\(j\)-th derivative** of \(G(x)\)
- **Plug in** \(x = \lambda\)
- **Divide** by \(j!\)

### Let's See Each Coefficient

| Coefficient | Formula |
|-------------|---------|
| \(a_0\) | \(G(x)\big\|_{x=\lambda}\) (no derivative, just plug in) |
| \(a_1\) | \(\frac{d}{dx}G(x)\big\|_{x=\lambda}\) |
| \(a_2\) | \(\frac{1}{2!}\frac{d^2}{dx^2}G(x)\big\|_{x=\lambda}\) |
| \(a_j\) | \(\frac{1}{j!}\frac{d^j}{dx^j}G(x)\big\|_{x=\lambda}\) |

> 💡 **Notice:** \(a_0\) is still just the cover-up method! Cover up \((x-\lambda)^r\) and plug in \(x = \lambda\). The only new work is taking derivatives for \(a_1, a_2, \ldots\)

### Why Does This Work? (Intuition)

When you multiply \(F(x)\) by \((x-\lambda)^r\), you get a polynomial-like expression in \((x-\lambda)\). Taking derivatives and setting \(x = \lambda\) is exactly like reading off the coefficients of a Taylor series — each derivative "peels off" one more coefficient. The \(j!\) in the denominator corrects for the factorial that appears when you differentiate a power.

### Important Reminder

The \(k\) coefficients for unrepeated factors are **not affected** by this process. Find them first with cover-up, then work on the \(a\) coefficients.

---

## Page 4: Worked Example B.10 — Step by Step

### The Problem

Expand into partial fractions:

$$F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)}$$

### Step 0: Write the Expansion Template

\((x+1)\) is repeated 3 times → needs 3 terms: \(a_0, a_1, a_2\)

\((x+2)\) appears once → needs 1 term: \(k\)

$$F(x) = \frac{a_0}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{k}{x+2}$$

---

### Step 1: Find \(k\) (Heaviside Cover-Up)

Cover up \((x+2)\) in \(F(x)\) and set \(x = -2\):

$$k = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3} \Bigg|_{x=-2}$$

$$= \frac{4(-8) + 16(4) + 23(-2) + 13}{(-2+1)^3} = \frac{-32 + 64 - 46 + 13}{(-1)^3} = \frac{-1}{-1} = \boxed{1}$$

---

### Step 2: Find \(a_0\) (Cover-Up for Repeated Factor)

Cover up \((x+1)^3\) in \(F(x)\) and set \(x = -1\):

$$a_0 = \frac{4x^3 + 16x^2 + 23x + 13}{x+2} \Bigg|_{x=-1}$$

$$= \frac{4(-1) + 16(1) + 23(-1) + 13}{-1+2} = \frac{-4 + 16 - 23 + 13}{1} = \frac{2}{1} = \boxed{2}$$

---

### Step 3: Find \(a_1\) (First Derivative)

Define \(G(x) = \dfrac{4x^3 + 16x^2 + 23x + 13}{x+2}\) (the denominator with \((x+1)^3\) removed).

Take the first derivative using the quotient rule:

$$G'(x) = \frac{(12x^2 + 32x + 23)(x+2) - (4x^3 + 16x^2 + 23x + 13)(1)}{(x+2)^2}$$

Now set \(x = -1\):

**Numerator:** \((12 - 32 + 23)(1) - (-4 + 16 - 23 + 13) = (3)(1) - (2) = 3 - 2 = 1\)

**Denominator:** \((1)^2 = 1\)

$$a_1 = \frac{1}{1} = \boxed{1}$$

---

### Step 4: Find \(a_2\) (Second Derivative, Divide by 2!)

$$a_2 = \frac{1}{2!} G''(x)\Big|_{x=-1}$$

Computing \(G''(x)\) at \(x = -1\) (this takes some algebra — trust the process!):

$$a_2 = \boxed{3}$$

---

### Final Answer

$$\boxed{F(x) = \frac{2}{(x+1)^3} + \frac{1}{(x+1)^2} + \frac{3}{x+1} + \frac{1}{x+2}}$$

> ✅ **Sanity check:** Count the terms — 4 terms for a degree-4 denominator. Looks right!

---

## Page 5: Recap & Summary

Great work making it through! Let's pull everything together.

### The Core Problem

When \(F(x)\) has a **repeated factor** \((x - \lambda)^r\) in the denominator, the standard one-term-per-factor approach breaks down. You need **\(r\) separate terms** for that factor.

---

### The Setup Rule

For:
$$F(x) = \frac{P(x)}{(x-\lambda)^r (x-\alpha_1)(x-\alpha_2)\cdots(x-\alpha_j)}$$

Write:
$$F(x) = \frac{a_0}{(x-\lambda)^r} + \frac{a_1}{(x-\lambda)^{r-1}} + \cdots + \frac{a_{r-1}}{(x-\lambda)} + \frac{k_1}{x-\alpha_1} + \cdots + \frac{k_j}{x-\alpha_j}$$

> 🔑 **Key:** A factor repeated \(r\) times → \(r\) partial fraction terms, with powers going from \(r\) down to \(1\).

---

### The Coefficient Formulas

| Type | Coefficient | Method |
|------|-------------|--------|
| Unrepeated factor | \(k_i\) | Heaviside cover-up: cover \((x-\alpha_i)\), plug in \(x = \alpha_i\) |
| Repeated factor (level 0) | \(a_0\) | Cover up \((x-\lambda)^r\), plug in \(x = \lambda\) |
| Repeated factor (level \(j\)) | \(a_j\) | \(\dfrac{1}{j!} \dfrac{d^j}{dx^j}\left[(x-\lambda)^r F(x)\right]_{x=\lambda}\) |

---

### The Process in 4 Steps

1. **Identify** repeated and unrepeated factors
2. **Write** the correct expansion template (one term per power per repeated factor)
3. **Find \(k\) values** using standard Heaviside cover-up
4. **Find \(a\) values** by removing \((x-\lambda)^r\), then taking successive derivatives and plugging in \(x = \lambda\) (dividing by \(j!\) each time)

---

### Common Mistakes to Avoid

> ⚠️ **Mistake 1:** Writing only one term for a repeated factor instead of \(r\) terms.

> ⚠️ **Mistake 2:** Forgetting to divide by \(j!\) when computing \(a_j\) for \(j \geq 2\).

> ⚠️ **Mistake 3:** Applying the derivative formula to the unrepeated coefficients — those still use plain cover-up!

> ⚠️ **Mistake 4:** Arithmetic errors in the quotient rule — take your time with derivatives.

---

### The Big Picture

This method is essentially reading off the **Taylor series coefficients** of \((x-\lambda)^r F(x)\) around the point \(x = \lambda\). The formula \(a_j = \frac{1}{j!} G^{(j)}(\lambda)\) is exactly the Taylor coefficient formula — a beautiful connection!

---

## Page 6: Quiz

```
quiz_plan:

Title: Section B.5-3 — Partial Fraction Expansion with Repeated Factors

Format: Mostly multiple-choice; short-answer where calculation is needed.

---

Q1. [Multiple Choice] — Conceptual Setup
A function F(x) has denominator (x − 3)^4 (x + 1)(x − 5).
How many total terms appear in its partial fraction expansion?

A) 3
B) 4
C) 6  ✓
D) 7

Explanation: (x−3)^4 contributes 4 terms (powers 4,3,2,1); (x+1) contributes 1; (x−5) contributes 1. Total = 6.

---

Q2. [Multiple Choice] — Identifying the Correct Template
Which is the correct partial fraction expansion for:
F(x) = P(x) / [(x+2)^2 (x−1)]?

A) a/(x+2) + k/(x−1)
B) a0/(x+2)^2 + a1/(x+2) + k/(x−1)  ✓
C) a0/(x+2)^2 + k/(x−1)
D) a0/(x+2)^2 + a1/(x+2)^1 + a2/(x+2)^0 + k/(x−1)

Explanation: (x+2)^2 needs two terms (powers 2 and 1); (x−1) needs one term.

---

Q3. [Multiple Choice] — Finding a0
For F(x) = (3x + 5) / [(x+1)^2 (x+3)], the coefficient a0 is found by:

A) Covering up (x+1) and substituting x = −1
B) Covering up (x+1)^2 and substituting x = −1  ✓
C) Taking the derivative of F(x) and substituting x = −1
D) Covering up (x+3) and substituting x = −3

Explanation: a0 uses the cover-up method on the full repeated factor (x+1)^2.

---

Q4. [Multiple Choice] — The Derivative Formula
For a repeated factor (x − λ)^r, the coefficient a_j is given by:

A) (d^j/dx^j)[(x−λ)^r F(x)] evaluated at x = λ
B) (1/j!) · (d^j/dx^j)[(x−λ)^r F(x)] evaluated at x = λ  ✓
C) j! · (d^j/dx^j)[(x−λ)^r F(x)] evaluated at x = λ
D) (1/j!) · (d^j/dx^j)[F(x)] evaluated at x = λ

Explanation: The formula requires dividing by j! and applying the derivative to (x−λ)^r F(x), not F(x) alone.

---

Q5. [Multiple Choice] — Applying the Formula for a1
For G(x) = (x−λ)^r F(x), the coefficient a1 equals:

A) G(λ)
B) G'(λ)  ✓
C) G'(λ) / 2
D) G''(λ) / 2

Explanation: a1 = (1/1!) G'(λ) = G'(λ). No factorial division needed since 1! = 1.

---

Q6. [Multiple Choice] — Conceptual: Why Divide by j!?
Why does the formula for a_j include division by j!?

A) To normalize the partial fractions so they sum to 1
B) Because the j-th derivative of (x−λ)^j introduces a factor of j! as a coefficient  ✓
C) To convert from partial fractions back to the original function
D) Because the Heaviside method requires it for all coefficients

Explanation: Differentiating (x−λ)^j exactly j times gives j!, so dividing by j! isolates the coefficient a_j — just like in a Taylor series.

---

Q7. [Short Answer] — Calculation
Given:
F(x) = (2x + 3) / [(x+1)^2 (x+2)]

Write the partial fraction template and find the coefficient k
(for the unrepeated factor x+2) using the Heaviside cover-up method.