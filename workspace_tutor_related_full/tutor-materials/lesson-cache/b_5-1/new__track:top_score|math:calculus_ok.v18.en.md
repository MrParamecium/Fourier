# B.5-1 Method of Clearing Fractions

---

## Page 1: Section Overview

### What Are We Doing Here?

Welcome! In this section, we're learning how to **break apart a complicated fraction into simpler pieces**. This technique is called **Partial Fraction Expansion**.

Think of it like this: instead of dealing with one messy fraction, we split it into a sum of smaller, friendlier fractions. This is incredibly useful in signal processing and systems analysis (for example, when working with Laplace transforms).

---

### The Big Picture

Suppose you have a rational function like:

$$F(x) = \frac{x^3 + 3x^2 + 4x + 6}{(x+1)(x+2)(x+3)^2}$$

This looks intimidating. But what if we could write it as:

$$F(x) = \frac{k_1}{x+1} + \frac{k_2}{x+2} + \frac{k_3}{x+3} + \frac{k_4}{(x+3)^2}$$

Much nicer, right? The question is: **how do we find those mystery numbers** \(k_1, k_2, k_3, k_4\)?

---

### What You'll Learn in This Section

| Page | Topic |
|------|-------|
| 2 | What is a proper rational function? (Quick prerequisite) |
| 3 | Setting up the partial fraction form |
| 4 | The Method of Clearing Fractions — step by step |
| 5 | Solving the system of equations |
| 6 | Recap & Summary |
| 7 | Quiz |

---

### Prerequisites

You should be comfortable with:
- Basic algebra (multiplying polynomials)
- Solving systems of linear equations
- What a rational function is (a ratio of two polynomials)

Let's dive in! 🎯

---

## Page 2: What Is a Proper Rational Function?

### A Quick But Important Prerequisite

Before we can do partial fractions, we need to make sure our function is **proper**. Let's understand what that means.

---

### Proper vs. Improper Rational Functions

A rational function is:

$$F(x) = \frac{P(x)}{Q(x)}$$

where \(P(x)\) and \(Q(x)\) are polynomials.

- **Proper**: The degree of \(P(x)\) is **less than** the degree of \(Q(x)\)
- **Improper**: The degree of \(P(x)\) is **greater than or equal to** the degree of \(Q(x)\)

> 💡 **Degree** = the highest power of \(x\) in the polynomial.

---

### Example

$$F(x) = \frac{2x^3 + 9x^2 + 11x + 2}{x^2 + 4x + 3}$$

- Degree of numerator = **3**
- Degree of denominator = **2**

Since \(3 \geq 2\), this is **improper**. We must do **polynomial long division first** to get:

$$F(x) = \underbrace{2x + 1}_{\text{polynomial part}} + \underbrace{\frac{x-1}{x^2+4x+3}}_{\text{proper part}}$$

---

### The Rule

> ✅ **Partial fraction expansion only works on the proper part.**

If your function is already proper (numerator degree < denominator degree), you're good to go straight to partial fractions!

---

### Our Example Is Already Proper

$$F(x) = \frac{x^3 + 3x^2 + 4x + 6}{(x+1)(x+2)(x+3)^2}$$

- Numerator degree = **3**
- Denominator degree = **4** (since \((x+1)(x+2)(x+3)^2\) expands to degree 4)

Since \(3 < 4\), this is **proper** ✅ — we can proceed directly!

---

## Page 3: Setting Up the Partial Fraction Form

### How Do We Know What Form to Write?

This is the first real skill: **looking at the denominator and writing down the correct partial fraction template**.

The rule is simple:

> For **every factor** in the denominator, you write **one partial fraction term** with an unknown coefficient.

---

### Rule for Repeated Factors

If a factor appears **more than once** (like \((x+3)^2\)), you need **one term for each power** up to the highest:

| Denominator Factor | Partial Fraction Terms Needed |
|---|---|
| \((x + a)\) | \(\dfrac{k}{x+a}\) |
| \((x + a)^2\) | \(\dfrac{k_1}{x+a} + \dfrac{k_2}{(x+a)^2}\) |
| \((x + a)^3\) | \(\dfrac{k_1}{x+a} + \dfrac{k_2}{(x+a)^2} + \dfrac{k_3}{(x+a)^3}\) |

---

### Applying This to Our Example

$$F(x) = \frac{x^3 + 3x^2 + 4x + 6}{(x+1)(x+2)(x+3)^2}$$

The denominator has these factors:
- \((x+1)\) — appears **once** → one term
- \((x+2)\) — appears **once** → one term
- \((x+3)^2\) — appears **twice** → **two** terms

So we write:

$$\boxed{F(x) = \frac{k_1}{x+1} + \frac{k_2}{x+2} + \frac{k_3}{x+3} + \frac{k_4}{(x+3)^2}}$$

---

### Why This Form?

Think about it in reverse: if you added those four fractions together with a common denominator of \((x+1)(x+2)(x+3)^2\), you'd get back a fraction of degree 3 over degree 4 — exactly what we started with. The form is **guaranteed to work** for proper rational functions.

---

### Count Check ✅

We have **4 unknowns** (\(k_1, k_2, k_3, k_4\)) and the numerator has **4 coefficients** (for \(x^3, x^2, x^1, x^0\)). We'll get exactly 4 equations — perfect!

---

## Page 4: The Method of Clearing Fractions — Step by Step

### The Core Idea

We have:

$$\frac{x^3 + 3x^2 + 4x + 6}{(x+1)(x+2)(x+3)^2} = \frac{k_1}{x+1} + \frac{k_2}{x+2} + \frac{k_3}{x+3} + \frac{k_4}{(x+3)^2}$$

**"Clearing fractions"** means: **multiply both sides by the full denominator** \((x+1)(x+2)(x+3)^2\).

This eliminates all the fractions and leaves us with a polynomial equation.

---

### Step 1: Multiply Both Sides

Multiply everything by \((x+1)(x+2)(x+3)^2\):

$$x^3 + 3x^2 + 4x + 6 = k_1 \cdot (x+2)(x+3)^2 + k_2 \cdot (x+1)(x+3)^2$$
$$+ k_3 \cdot (x+1)(x+2)(x+3) + k_4 \cdot (x+1)(x+2)$$

> 💡 Notice: each \(k\) term gets multiplied by **everything except its own denominator factor**.

---

### Step 2: Expand Each Term

Let's expand each product:

$$k_1: \quad (x+2)(x+3)^2 = x^3 + 8x^2 + 21x + 18$$

$$k_2: \quad (x+1)(x+3)^2 = x^3 + 7x^2 + 15x + 9$$

$$k_3: \quad (x+1)(x+2)(x+3) = x^3 + 6x^2 + 11x + 6$$

$$k_4: \quad (x+1)(x+2) = x^2 + 3x + 2$$

---

### Step 3: Collect by Powers of x

The right-hand side becomes:

$$x^3(k_1 + k_2 + k_3) + x^2(8k_1 + 7k_2 + 6k_3 + k_4)$$
$$+ x(21k_1 + 15k_2 + 11k_3 + 3k_4) + (18k_1 + 9k_2 + 6k_3 + 2k_4)$$

Now we have a polynomial on each side. The left side is:

$$1 \cdot x^3 + 3 \cdot x^2 + 4 \cdot x + 6$$

---

### The Key Principle

> ✅ **Two polynomials are equal if and only if the coefficients of every power of \(x\) match.**

This gives us our system of equations — which we'll solve on the next page!

---

## Page 5: Solving the System of Equations

### Setting Up the Four Equations

By matching coefficients of \(x^3\), \(x^2\), \(x^1\), and \(x^0\) on both sides:

| Power | Left Side | Right Side | Equation |
|-------|-----------|------------|----------|
| \(x^3\) | \(1\) | \(k_1 + k_2 + k_3\) | \(k_1 + k_2 + k_3 = 1\) |
| \(x^2\) | \(3\) | \(8k_1 + 7k_2 + 6k_3 + k_4\) | \(8k_1 + 7k_2 + 6k_3 + k_4 = 3\) |
| \(x^1\) | \(4\) | \(21k_1 + 15k_2 + 11k_3 + 3k_4\) | \(21k_1 + 15k_2 + 11k_3 + 3k_4 = 4\) |
| \(x^0\) | \(6\) | \(18k_1 + 9k_2 + 6k_3 + 2k_4\) | \(18k_1 + 9k_2 + 6k_3 + 2k_4 = 6\) |

---

### Solving the System

Solving these four simultaneous equations (using substitution, elimination, or matrices):

$$\boxed{k_1 = 1, \quad k_2 = -2, \quad k_3 = 2, \quad k_4 = -3}$$

---

### The Final Answer

$$\boxed{F(x) = \frac{1}{x+1} - \frac{2}{x+2} + \frac{2}{x+3} - \frac{3}{(x+3)^2}}$$

---

### Verification Tip ✅

Always do a quick sanity check! Pick a simple value of \(x\) (like \(x = 0\)) and verify both sides match:

**Left side:**
$$F(0) = \frac{0 + 0 + 0 + 6}{(1)(2)(9)} = \frac{6}{18} = \frac{1}{3}$$

**Right side:**
$$\frac{1}{1} - \frac{2}{2} + \frac{2}{3} - \frac{3}{9} = 1 - 1 + \frac{2}{3} - \frac{1}{3} = \frac{1}{3} \checkmark$$

---

### A Note on Efficiency

The method of clearing fractions **always works**, but it can be tedious — especially with many terms. The textbook notes that other methods (like the Heaviside Cover-Up method in B.5-2) can reduce the numerical work considerably. But this method is the most fundamental and transparent.

---

## Page 6: Recap & Summary

### What Did We Learn?

Let's pull everything together from B.5-1.

---

### The Big Idea

**Partial fraction expansion** breaks a complicated rational function into a sum of simpler fractions. The **Method of Clearing Fractions** is one systematic way to find the unknown coefficients.

---

### The Step-by-Step Process

```
Step 1: Check the function is PROPER
        (degree of numerator < degree of denominator)
        If not → do polynomial long division first

Step 2: Factor the denominator completely

Step 3: Write the partial fraction TEMPLATE
        • One term per distinct factor
        • Multiple terms for repeated factors

Step 4: CLEAR FRACTIONS
        Multiply both sides by the full denominator

Step 5: EXPAND and COLLECT by powers of x

Step 6: EQUATE COEFFICIENTS of matching powers

Step 7: SOLVE the system of equations for k₁, k₂, ...

Step 8: VERIFY with a test value of x
```

---

### Key Rules to Remember

> 📌 **Rule 1:** Partial fractions only apply to **proper** rational functions.

> 📌 **Rule 2:** A repeated factor \((x+a)^n\) requires **\(n\) separate terms**: one for each power from 1 to \(n\).

> 📌 **Rule 3:** The number of unknowns always equals the degree of the denominator (for a proper function).

> 📌 **Rule 4:** Clearing fractions = multiplying both sides by the full denominator.

---

### Quick Reference: Partial Fraction Forms

| Denominator Factor | Partial Fraction Contribution |
|---|---|
| \((x - \lambda)\) | \(\dfrac{k}{x - \lambda}\) |
| \((x - \lambda)^2\) | \(\dfrac{k_1}{x-\lambda} + \dfrac{k_2}{(x-\lambda)^2}\) |
| \((x - \lambda)^r\) | \(\dfrac{k_1}{x-\lambda} + \dfrac{k_2}{(x-\lambda)^2} + \cdots + \dfrac{k_r}{(x-\lambda)^r}\) |

---

### What's Coming Next?

In **B.5-2**, we'll learn the **Heaviside Cover-Up Method** — a much faster technique for finding coefficients when all denominator factors are **distinct** (non-repeated). It's a great shortcut!

---

## Page 7: Quiz

### 📝 Exam-Oriented Quiz — B.5-1 Method of Clearing Fractions

---

**Q1.** Which of the following is a **proper** rational function?

- A) \(\dfrac{x^3 + 2x}{x^2 + 1}\)
- B) \(\dfrac{x^2 + 5}{x^3 + x + 1}\) ✅
- C) \(\dfrac{x^4}{x^4 + 1}\)
- D) \(\dfrac{x^3 + x^2 + x + 1}{x^2 - 1}\)

---

**Q2.** For the function \(F(x) = \dfrac{5x + 3}{(x+1)(x+2)^2}\), the correct partial fraction template is:

- A) \(\dfrac{k_1}{x+1} + \dfrac{k_2}{x+2}\)
- B) \(\dfrac{k_1}{x+1} + \dfrac{k_2}{(x+2)^2}\)
- C) \(\dfrac{k_1}{x+1} + \dfrac{k_2}{x+2} + \dfrac{k_3}{(x+2)^2}\) ✅
- D) \(\dfrac{k_1}{(x+1)^2} + \dfrac{k_2}{(x+2)^2}\)

---

**Q3.** After clearing fractions in the equation:

$$\frac{x+5}{(x+1)(x+2)} = \frac{k_1}{x+1} + \frac{k_2}{x+2}$$

you multiply both sides by \((x+1)(x+2)\). What is the resulting equation?

- A) \(x + 5 = k_1(x+1) + k_2(x+2)\)
- B) \(x + 5 = k_1(x+2) + k_2(x+1)\) ✅
- C) \(x + 5 = k_1 k_2 (x+1)(x+2)\)
- D) \(x + 5 = k_1 + k_2\)

---

**Q4.** Using the method of clearing fractions on \(\dfrac{x+5}{(x+1)(x+2)} = \dfrac{k_1}{x+1} + \dfrac{k_2}{x+2}\), matching coefficients gives:

$$k_1 + k_2 = 1 \quad \text{and} \quad 2k_1 + k_2 = 5$$

What are \(k_1\) and \(k_2\)?

- A) \(k_1 = 3,\ k_2 = -2\)
- B) \(k_1 = 4,\ k_2 = -3\) ✅
- C) \(k_1 = 2,\ k_2 = -1\)
- D) \(k_1 = -3,\ k_2 = 4\)

---

**Q5.** How many unknown coefficients are needed for the partial fraction expansion of:

$$F(x) = \frac{x^2 + 1}{(x+1)(x+2)(x+3)}$$

- A) 2
- B) 3 ✅
- C) 4
- D) 6

---

**Q6.** *(Short Answer)* A student wants to expand \(F(x) = \dfrac{3x^2 + 2x + 1}{(x+1)^3}\) into partial fractions. Write down the correct partial fraction **template** (with unknown coefficients \(k_1, k_2, k_3\)), and explain in one sentence why three terms are needed.

> **Model Answer:** The template is \(\dfrac{k_1}{x+1} + \dfrac{k_2}{(x+1)^2} + \dfrac{k_3}{(x+1)^3}\). Three terms are needed because the factor \((x+1)\) is repeated three times, so we must include one term for each power from 1 up to 3.

---

**Q7.** Which statement about the Method of Clearing Fractions is **FALSE**?

- A) It works for all proper rational functions
- B) It requires expanding polynomials and matching coefficients
- C) It only works when all denominator factors are distinct ✅
- D) It produces a system of linear equations to solve

---

**Q8.** *(Short Answer)* After finding \(k_1 = 1,\ k_2 = -2,\ k_3 = 2,\ k_4 = -3\) for Example B.8, a student verifies by substituting \(x = 0\). Show the verification calculation and confirm the result equals \(\dfrac{1}{3}\).

> **Model Answer:**
> Left side: \(F(0) = \dfrac{6}{(1)(2)(9)} = \dfrac{6}{18} = \dfrac{1}{3}\)
>
> Right side: $\dfrac{1}{1} - \df