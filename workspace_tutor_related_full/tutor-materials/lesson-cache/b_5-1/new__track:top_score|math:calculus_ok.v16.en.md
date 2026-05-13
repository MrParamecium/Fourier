# B.5-1 Method of Clearing Fractions

---

## Page 1: Section Overview

### What Are We Doing Here?

Welcome! In this section, we're learning how to break apart a complicated fraction into **simpler pieces** — a technique called **partial fraction expansion**.

Think of it like this: instead of eating a whole pizza at once, you slice it into manageable pieces. Partial fractions do the same thing to complicated rational functions.

---

### Why Do We Need This?

In signal processing and linear systems, we constantly run into expressions like:

$$F(x) = \frac{x^3 + 3x^2 + 4x + 6}{(x+1)(x+2)(x+3)^2}$$

These are hard to work with directly. But if we can rewrite them as:

$$F(x) = \frac{k_1}{x+1} + \frac{k_2}{x+2} + \frac{k_3}{x+3} + \frac{k_4}{(x+3)^2}$$

...suddenly everything becomes much easier to analyze, integrate, or transform!

---

### The Big Picture: Two Requirements Before You Start

Before expanding into partial fractions, your function **must be proper** — meaning the degree of the numerator is **strictly less than** the degree of the denominator.

> 💡 If it's not proper, do polynomial long division first to make it proper, then expand the remainder.

---

### What You'll Learn in This Section

| Topic | What It Means |
|-------|--------------|
| **Method of Clearing Fractions** | Set up unknowns, multiply out, match coefficients |
| **Setting up partial fractions** | Choosing the right form for each factor |
| **Solving the system** | Finding the unknown constants \(k_1, k_2, \ldots\) |

Let's dive in! 🎯

---

## Page 2: Setting Up Partial Fractions — Choosing the Right Form

### The Key Idea: Match the Denominator's Factors

When you write a rational function as partial fractions, the **denominators of your partial fractions must match the factors of the original denominator**.

Here's the rule:

---

### Rule 1: Distinct (Non-Repeated) Linear Factors

If the denominator has a factor like \((x + a)\) appearing **once**, you get one partial fraction term:

$$\frac{\text{something}}{(x+a)(\ldots)} = \frac{k}{x+a} + \cdots$$

---

### Rule 2: Repeated Linear Factors

If a factor like \((x + a)\) appears **twice** — written as \((x+a)^2\) — you need **two** terms:

$$\frac{\text{something}}{(x+a)^2(\ldots)} = \frac{k_1}{x+a} + \frac{k_2}{(x+a)^2} + \cdots$$

If it appears **three times** \((x+a)^3\), you need **three** terms, and so on.

---

### Applying This to Our Example

$$F(x) = \frac{x^3 + 3x^2 + 4x + 6}{(x+1)(x+2)(x+3)^2}$$

Let's identify each factor:

| Factor | Times Repeated | Partial Fraction Terms Needed |
|--------|---------------|-------------------------------|
| \((x+1)\) | Once | \(\dfrac{k_1}{x+1}\) |
| \((x+2)\) | Once | \(\dfrac{k_2}{x+2}\) |
| \((x+3)\) | **Twice** | \(\dfrac{k_3}{x+3} + \dfrac{k_4}{(x+3)^2}\) |

So we write:

$$\boxed{F(x) = \frac{k_1}{x+1} + \frac{k_2}{x+2} + \frac{k_3}{x+3} + \frac{k_4}{(x+3)^2}}$$

> 💡 **Notice:** We have 4 unknowns (\(k_1, k_2, k_3, k_4\)). We'll need 4 equations to solve for them. That's exactly what the next step gives us!

---

## Page 3: Clearing Fractions — Multiplying Both Sides

### The Core Move: Eliminate All Denominators

Now that we have:

$$\frac{x^3 + 3x^2 + 4x + 6}{(x+1)(x+2)(x+3)^2} = \frac{k_1}{x+1} + \frac{k_2}{x+2} + \frac{k_3}{x+3} + \frac{k_4}{(x+3)^2}$$

We **multiply both sides** by the full denominator \((x+1)(x+2)(x+3)^2\).

This "clears" all the fractions — no more denominators!

---

### What Happens to Each Term?

When you multiply \(\frac{k_1}{x+1}\) by \((x+1)(x+2)(x+3)^2\), the \((x+1)\) cancels:

$$\frac{k_1}{\cancel{x+1}} \cdot \cancel{(x+1)}(x+2)(x+3)^2 = k_1(x+2)(x+3)^2$$

Doing this for every term, the left side becomes:

$$x^3 + 3x^2 + 4x + 6$$

And the right side becomes:

$$k_1(x+2)(x+3)^2 + k_2(x+1)(x+3)^2 + k_3(x+1)(x+2)(x+3) + k_4(x+1)(x+2)$$

---

### Expanding the Right Side

After multiplying out each bracket (this is the algebra-heavy part!), we get:

$$x^3 + 3x^2 + 4x + 6 = k_1(x^3 + 8x^2 + 21x + 18)$$
$$+ k_2(x^3 + 7x^2 + 15x + 9)$$
$$+ k_3(x^3 + 6x^2 + 11x + 6)$$
$$+ k_4(x^2 + 3x + 2)$$

Now group by powers of \(x\):

$$= x^3(k_1 + k_2 + k_3)$$
$$+ x^2(8k_1 + 7k_2 + 6k_3 + k_4)$$
$$+ x(21k_1 + 15k_2 + 11k_3 + 3k_4)$$
$$+ (18k_1 + 9k_2 + 6k_3 + 2k_4)$$

> 💡 **Key insight:** We've turned a fraction problem into a polynomial matching problem. Much more manageable!

---

## Page 4: Equating Coefficients — Building and Solving the System

### Matching Powers on Both Sides

The left side is:

$$x^3 + 3x^2 + 4x + 6$$

Which we can write as:

$$1 \cdot x^3 + 3 \cdot x^2 + 4 \cdot x + 6 \cdot x^0$$

The right side (from the previous page) groups by powers of \(x\).

**Two polynomials are equal if and only if their coefficients match for every power of \(x\).**

So we equate coefficient by coefficient:

---

### The System of 4 Equations

| Power of \(x\) | Left Side | Right Side | Equation |
|-------------|-----------|------------|----------|
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

> ✅ **Sanity check:** You can verify this by adding the fractions back together — you should get the original \(F(x)\).

---

## Page 5: Recap and Summary

### What Did We Learn? 🎓

The **Method of Clearing Fractions** is a systematic, always-applicable way to find partial fraction coefficients. Here's the complete roadmap:

---

### Step-by-Step Summary

```
Step 1: Check the function is PROPER
         (degree of numerator < degree of denominator)
         If not → do polynomial long division first!
              ↓
Step 2: Set up partial fractions
         • Each distinct factor (x + a)  →  k/(x + a)
         • Each repeated factor (x + a)² →  k₁/(x+a) + k₂/(x+a)²
              ↓
Step 3: Clear fractions
         Multiply BOTH sides by the full denominator
              ↓
Step 4: Expand and group by powers of x
              ↓
Step 5: Equate coefficients of matching powers
         → Get a system of equations
              ↓
Step 6: Solve the system for k₁, k₂, k₃, ...
              ↓
Step 7: Write the final partial fraction expansion ✓
```

---

### Key Rules to Remember

| Situation | What to Write |
|-----------|--------------|
| Factor \((x+a)\) appears once | \(\dfrac{k}{x+a}\) |
| Factor \((x+a)\) appears twice | \(\dfrac{k_1}{x+a} + \dfrac{k_2}{(x+a)^2}\) |
| Factor \((x+a)\) appears \(m\) times | One term for each power, up to \((x+a)^m\) |
| Number of unknowns | Always equals the degree of the denominator |

---

### Pros and Cons of This Method

| ✅ Pros | ⚠️ Cons |
|---------|---------|
| Works for **every** case | Can involve heavy algebra |
| Systematic — no guessing | Solving large systems is tedious |
| Easy to check your work | Other methods (like Heaviside) are faster for simple cases |

---

### Quick Example Recap

$$F(x) = \frac{x^3 + 3x^2 + 4x + 6}{(x+1)(x+2)(x+3)^2} = \frac{1}{x+1} - \frac{2}{x+2} + \frac{2}{x+3} - \frac{3}{(x+3)^2}$$

---

## Page 6: Exam-Oriented Quiz Plan 📝

### Quiz Plan — B.5-1 Method of Clearing Fractions

---

**Q1. (Multiple Choice)**
Which condition must be satisfied before applying partial fraction expansion directly?

- A) The numerator degree must equal the denominator degree
- B) The numerator degree must be strictly less than the denominator degree ✅
- C) The denominator must have no repeated factors
- D) All coefficients must be positive

---

**Q2. (Multiple Choice)**
For the function \(F(x) = \dfrac{P(x)}{(x+1)(x+3)^2}\), which is the correct partial fraction setup?

- A) \(\dfrac{k_1}{x+1} + \dfrac{k_2}{x+3}\)
- B) \(\dfrac{k_1}{x+1} + \dfrac{k_2}{(x+3)^2}\)
- C) \(\dfrac{k_1}{x+1} + \dfrac{k_2}{x+3} + \dfrac{k_3}{(x+3)^2}\) ✅
- D) \(\dfrac{k_1}{(x+1)} + \dfrac{k_2}{(x+1)^2} + \dfrac{k_3}{x+3}\)

---

**Q3. (Multiple Choice)**
After clearing fractions in a partial fraction problem, what is the next step?

- A) Substitute \(x = 0\) immediately
- B) Expand and group terms by powers of \(x\), then equate coefficients ✅
- C) Divide both sides by the numerator
- D) Take the derivative of both sides

---

**Q4. (Multiple Choice)**
How many unknown coefficients are needed for the expansion of:
$$F(x) = \frac{P(x)}{(x+2)(x+5)(x+1)^3}$$

- A) 3
- B) 4
- C) 5 ✅
- D) 6

> *Hint: Count the total number of partial fraction terms: one for \((x+2)\), one for \((x+5)\), and three for \((x+1)^3\).*

---

**Q5. (Multiple Choice)**
When you "clear fractions" in the method of clearing fractions, you:

- A) Cancel the numerator from both sides
- B) Multiply both sides by the common denominator ✅
- C) Divide both sides by the largest coefficient
- D) Set the denominator equal to zero

---

**Q6. (Multiple Choice)**
Given the expansion:
$$\frac{x+5}{(x+1)(x+2)} = \frac{k_1}{x+1} + \frac{k_2}{x+2}$$

After clearing fractions, you get \(x + 5 = k_1(x+2) + k_2(x+1)\). Equating the constant terms gives:

- A) \(k_1 + k_2 = 1\)
- B) \(2k_1 + k_2 = 5\) ✅
- C) \(k_1 + 2k_2 = 5\)
- D) \(2k_1 + 2k_2 = 5\)

---

**Q7. (Short Answer)**
Explain in your own words why a repeated factor \((x+a)^2\) in the denominator requires **two** separate partial fraction terms rather than just one.

> *Model Answer: A single term \(\frac{k}{(x+a)^2}\) cannot represent all possible numerator behaviors. You need both \(\frac{k_1}{x+a}\) and \(\frac{k_2}{(x+a)^2}\) to have enough free parameters (unknowns) to match any numerator of appropriate degree. Without both terms, the system of equations would be underdetermined.*

---

**Q8. (Multiple Choice)**
After solving the system of equations in Example B.8, the result was \(k_1=1, k_2=-2, k_3=2, k_4=-3\). Which of the following is the correct final answer?

- A) \(\dfrac{1}{x+1} + \dfrac{2}{x+2} + \dfrac{2}{x+3} + \dfrac{3}{(x+3)^2}\)

- B) \(\dfrac{1}{x+1} - \dfrac{2}{x+2} + \dfrac{2}{x+3} - \dfrac{3}{(x+3)^2}\) ✅

- C) \(\dfrac{-1}{x+1} + \dfrac{2}{x+2} - \dfrac{2}{x+3} + \dfrac{3}{(x+3)^2}\)

- D) \(\dfrac{1}{x+1} - \dfrac{2}{x+2} - \dfrac{2}{x+3} + \dfrac{3}{(x+3)^2}\)

---

*End of Quiz Plan for B.5-1*