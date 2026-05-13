# Section B.5-1: Partial Fraction Expansion — Method of Clearing Fractions

---

## Page 1: Section Overview

Welcome! In this section, we're going to learn how to **break apart complicated fractions** into simpler pieces. This is called **partial fraction expansion**, and it's one of the most useful tools in signal processing and linear systems.

### Why Do We Need This?

Imagine you're trying to work with a messy rational function like:

$$F(x) = \frac{x^3 + 3x^2 + 4x + 6}{(x+1)(x+2)(x+3)^2}$$

This is hard to work with directly. But what if you could rewrite it as a **sum of simple fractions**?

$$F(x) = \frac{1}{x+1} - \frac{2}{x+2} + \frac{2}{x+3} - \frac{3}{(x+3)^2}$$

Much nicer! Each piece is simple and easy to handle — especially when doing things like inverse Laplace transforms.

### What You'll Learn in This Section

| Page | Topic |
|------|-------|
| 2 | What is a proper rational function? |
| 3 | Setting up partial fractions with unknown coefficients |
| 4 | Clearing fractions — the algebra step |
| 5 | Solving for the coefficients |
| 6 | Recap & Summary |
| 7 | Quiz |

### The Big Idea

The **Method of Clearing Fractions** works like this:
1. Write \(F(x)\) as a sum of partial fractions with **unknown constants** (\(k_1, k_2, \ldots\))
2. **Multiply both sides** by the full denominator to clear all fractions
3. **Match coefficients** of like powers of \(x\)
4. **Solve** the resulting system of equations

Let's dive in! 🎯

---

## Page 2: What Is a Proper Rational Function?

### Rational Functions — A Quick Reminder

A **rational function** is simply a fraction where both the numerator and denominator are polynomials:

$$F(x) = \frac{P(x)}{Q(x)}$$

### Proper vs. Improper

Before we can do partial fractions, we need to check whether our function is **proper** or **improper**.

> **Proper function:** The degree of the numerator is **strictly less than** the degree of the denominator.

> **Improper function:** The degree of the numerator is **greater than or equal to** the degree of the denominator.

### Example

$$F(x) = \frac{2x^3 + 9x^2 + 11x + 2}{x^2 + 4x + 3}$$

Here the numerator has degree **3** and the denominator has degree **2**. So this is **improper**.

We first do **polynomial long division** to separate it:

$$F(x) = \underbrace{2x + 1}_{\text{polynomial part}} + \underbrace{\frac{x - 1}{x^2 + 4x + 3}}_{\text{proper part}}$$

### ✅ Key Rule

> **Only the proper part gets expanded into partial fractions.**

The polynomial part stays as-is. For the rest of this section, we'll assume our function is already proper (or that we've already separated out the polynomial part).

### Why Does This Matter?

Partial fraction expansion only works cleanly when the function is proper. Think of it like reducing a fraction — you need to simplify first before you can split things up neatly.

---

## Page 3: Setting Up Partial Fractions with Unknown Coefficients

### The Setup Step

Once we have a proper rational function, the first job is to **write it as a sum of partial fractions** — but with unknown constants that we'll figure out later.

The form of each partial fraction depends on the **factors in the denominator**.

### Rules for Setting Up Partial Fractions

| Denominator Factor | Partial Fraction Term(s) |
|---|---|
| \((x - a)\) — simple linear factor | \(\dfrac{k}{x - a}\) |
| \((x - a)^2\) — repeated linear factor | \(\dfrac{k_1}{x-a} + \dfrac{k_2}{(x-a)^2}\) |
| \((x - a)^r\) — repeated \(r\) times | \(\dfrac{k_1}{x-a} + \dfrac{k_2}{(x-a)^2} + \cdots + \dfrac{k_r}{(x-a)^r}\) |

### Our Working Example

$$F(x) = \frac{x^3 + 3x^2 + 4x + 6}{(x+1)(x+2)(x+3)^2}$$

Let's identify the denominator factors:
- \((x+1)\) — simple linear → contributes \(\dfrac{k_1}{x+1}\)
- \((x+2)\) — simple linear → contributes \(\dfrac{k_2}{x+2}\)
- \((x+3)^2\) — **repeated** linear (appears twice!) → contributes \(\dfrac{k_3}{x+3} + \dfrac{k_4}{(x+3)^2}\)

So we write:

$$\boxed{F(x) = \frac{k_1}{x+1} + \frac{k_2}{x+2} + \frac{k_3}{x+3} + \frac{k_4}{(x+3)^2}}$$

### 💡 Important Note on Repeated Factors

When a factor is repeated, like \((x+3)^2\), you need **one term for each power** up to the full power. This is a common mistake — don't just write one term for a repeated factor!

We have **4 unknowns**: \(k_1, k_2, k_3, k_4\). We'll need 4 equations to solve for them. That's exactly what the next step gives us.

---

## Page 4: Clearing Fractions — The Algebra Step

### What Does "Clearing Fractions" Mean?

Once we've set up the partial fraction form, we **multiply both sides by the full denominator** \(Q(x)\). This eliminates all the fractions and gives us a polynomial equation we can work with.

### Applying It to Our Example

We have:

$$\frac{x^3 + 3x^2 + 4x + 6}{(x+1)(x+2)(x+3)^2} = \frac{k_1}{x+1} + \frac{k_2}{x+2} + \frac{k_3}{x+3} + \frac{k_4}{(x+3)^2}$$

Multiply **both sides** by \((x+1)(x+2)(x+3)^2\):

$$x^3 + 3x^2 + 4x + 6 = k_1(x+2)(x+3)^2 + k_2(x+1)(x+3)^2 + k_3(x+1)(x+2)(x+3) + k_4(x+1)(x+2)$$

### Expanding Each Term

After expanding and collecting by powers of \(x\), the right-hand side becomes:

$$= k_1(x^3 + 8x^2 + 21x + 18) + k_2(x^3 + 7x^2 + 15x + 9)$$
$$+ k_3(x^3 + 6x^2 + 11x + 6) + k_4(x^2 + 3x + 2)$$

Now group by powers of \(x\):

$$= x^3(k_1 + k_2 + k_3)$$
$$+ x^2(8k_1 + 7k_2 + 6k_3 + k_4)$$
$$+ x^1(21k_1 + 15k_2 + 11k_3 + 3k_4)$$
$$+ x^0(18k_1 + 9k_2 + 6k_3 + 2k_4)$$

### 💡 Why Does This Work?

Two polynomials are equal **for all values of \(x\)** if and only if their coefficients match exactly. So we can now **equate coefficients** of each power of \(x\) on both sides. That's the next step!

---

## Page 5: Solving for the Coefficients

### Equating Coefficients

We match the coefficients of \(x^3\), \(x^2\), \(x^1\), and \(x^0\) on both sides:

| Power | Left Side | Right Side | Equation |
|-------|-----------|------------|----------|
| \(x^3\) | \(1\) | \(k_1 + k_2 + k_3\) | \(k_1 + k_2 + k_3 = 1\) |
| \(x^2\) | \(3\) | \(8k_1 + 7k_2 + 6k_3 + k_4\) | \(8k_1 + 7k_2 + 6k_3 + k_4 = 3\) |
| \(x^1\) | \(4\) | \(21k_1 + 15k_2 + 11k_3 + 3k_4\) | \(21k_1 + 15k_2 + 11k_3 + 3k_4 = 4\) |
| \(x^0\) | \(6\) | \(18k_1 + 9k_2 + 6k_3 + 2k_4\) | \(18k_1 + 9k_2 + 6k_3 + 2k_4 = 6\) |

### Solving the System

Solving these four simultaneous equations (using substitution, elimination, or a matrix method):

$$k_1 = 1, \quad k_2 = -2, \quad k_3 = 2, \quad k_4 = -3$$

### The Final Answer

$$\boxed{F(x) = \frac{1}{x+1} - \frac{2}{x+2} + \frac{2}{x+3} - \frac{3}{(x+3)^2}}$$

### ✅ How to Check Your Answer

Combine the right-hand side back over a common denominator and verify you get the original numerator \(x^3 + 3x^2 + 4x + 6\). If it matches — you're correct!

### A Note on Efficiency

This method is **always valid** and works for any rational function. However, it can get tedious with many unknowns. The next section (B.5-2) introduces the **Heaviside Cover-Up Method**, which is much faster when the denominator has only simple (non-repeated) factors.

---

## Page 6: Recap & Summary

### 🗺️ The Big Picture

Partial fraction expansion lets us **decompose a complex rational function** into a sum of simpler fractions. The **Method of Clearing Fractions** is the most general approach.

### Step-by-Step Checklist

```
Step 1: Check if F(x) is proper.
        → If not, do polynomial long division first.

Step 2: Factor the denominator Q(x) completely.

Step 3: Write F(x) as a sum of partial fractions
        with unknown coefficients (k₁, k₂, ...).
        → Simple factor (x-a):      one term k/(x-a)
        → Repeated factor (x-a)²:   two terms k₁/(x-a) + k₂/(x-a)²

Step 4: Multiply both sides by Q(x) to clear all fractions.

Step 5: Expand and group by powers of x.

Step 6: Equate coefficients of matching powers on both sides.

Step 7: Solve the resulting system of equations for k₁, k₂, ...

Step 8: Write the final partial fraction expansion.
```

### Key Formulas

**Setup for distinct factors:**
$$F(x) = \frac{P(x)}{(x-\lambda_1)(x-\lambda_2)\cdots(x-\lambda_n)} = \frac{k_1}{x-\lambda_1} + \frac{k_2}{x-\lambda_2} + \cdots + \frac{k_n}{x-\lambda_n}$$

**Setup for a repeated factor** \((x-a)^r\):
$$\frac{k_1}{x-a} + \frac{k_2}{(x-a)^2} + \cdots + \frac{k_r}{(x-a)^r}$$

### Common Mistakes to Avoid

| ❌ Mistake | ✅ Correct Approach |
|---|---|
| Forgetting a term for a repeated factor | Each power up to \(r\) needs its own term |
| Applying partial fractions to an improper function | Do long division first! |
| Arithmetic errors when expanding | Expand carefully, term by term |
| Not checking the answer | Recombine and verify |

### Example Result (from this section)

$$\frac{x^3 + 3x^2 + 4x + 6}{(x+1)(x+2)(x+3)^2} = \frac{1}{x+1} - \frac{2}{x+2} + \frac{2}{x+3} - \frac{3}{(x+3)^2}$$

---

## Page 7: Quiz — Exam-Oriented Practice

```
quiz_plan

Section: B.5-1 — Method of Clearing Fractions
Format: Mostly multiple-choice; short-answer where needed
Difficulty: Beginner to Intermediate
```

---

**Q1. (Multiple Choice)**
Which condition must be satisfied before applying partial fraction expansion directly?

- A) The numerator degree must equal the denominator degree
- B) The numerator degree must be **strictly less than** the denominator degree
- C) The denominator must have no repeated roots
- D) The function must have real coefficients only

> ✅ **Answer: B** — The function must be *proper* (numerator degree < denominator degree). If not, do polynomial long division first.

---

**Q2. (Multiple Choice)**
For the function:
$$F(x) = \frac{P(x)}{(x+1)(x+4)^3}$$
How many unknown coefficients are needed in the partial fraction expansion?

- A) 2
- B) 3
- C) 4
- D) 5

> ✅ **Answer: C** — \((x+1)\) gives 1 term; \((x+4)^3\) gives 3 terms (one for each power). Total = **4**.

---

**Q3. (Multiple Choice)**
After clearing fractions, we equate coefficients of like powers of \(x\) because:

- A) It's a shortcut that only works sometimes
- B) Two polynomials that are equal for all \(x\) must have identical coefficients
- C) The highest-power coefficients are always zero
- D) It avoids having to expand the polynomials

> ✅ **Answer: B** — Polynomial identity: if two polynomials are equal for all values of \(x\), their coefficients must match exactly.

---

**Q4. (Multiple Choice)**
Which of the following is the **correct** partial fraction setup for:
$$F(x) = \frac{3x + 1}{(x-2)(x+5)^2}$$

- A) \(\dfrac{k_1}{x-2} + \dfrac{k_2}{x+5}\)

- B) \(\dfrac{k_1}{x-2} + \dfrac{k_2}{(x+5)^2}\)

- C) \(\dfrac{k_1}{x-2} + \dfrac{k_2}{x+5} + \dfrac{k_3}{(x+5)^2}\)

- D) \(\dfrac{k_1}{(x-2)(x+5)} + \dfrac{k_2}{(x+5)^2}\)

> ✅ **Answer: C** — The repeated factor \((x+5)^2\) requires **two** terms: one for \((x+5)\) and one for \((x+5)^2\).

---

**Q5. (Multiple Choice)**
You are expanding \(F(x) = \dfrac{x+3}{(x+1)(x+2)}\) using the method of clearing fractions. After multiplying both sides by \((x+1)(x+2)\), you get:

$$x + 3 = k_1(x+2) + k_2(x+1)$$

Equating the constant terms (\(x^0\)) gives:

- A) \(k_1 + k_2 = 1\)
- B) \(2k_1 + k_2 = 3\)
- C) \(k_1 + k_2 = 3\)
- D) \(2k_1 + 2k_2 = 3\)

> ✅ **Answer: B** — Constant terms on the right: \(2k_1 + 1 \cdot k_2\). On the left: \(3\). So \(2k_1 + k_2 = 3\).

---

**Q6. (Short Answer)**
Using the method of clearing fractions, find \(k_1\) and \(k_2\) for:

$$F(x) = \frac{x + 3}{(x+1)(x+2)} = \frac{k_1}{x+1} + \frac{k_2}{x+2}$$

> ✅ **Answer:**
> Clearing fractions: \(x + 3 = k_1(x+2) + k_2(x+1)\)
>
> Equating \(x^1\) coefficients: \(k_1 + k_2 = 1\)
>
> Equating \(x^0\) coefficients: \(2k_1 + k_2 = 3\)
>
> Subtracting: \(k_1 = 2\), then \(k_2 = -1\)
>
> $$F(x) = \frac{2}{x+1} - \frac{1}{x+2}$$

---

**Q7. (Multiple Choice)**
What is the **main limitation** of the Method of Clearing Fractions compared to other methods?

- A) It only works for functions with distinct roots
- B) It cannot handle repeated factors
- C) It is always valid but can be **tedious** with many unknowns
- D) It requires complex number arithmetic

> ✅ **Answer: C** — The method works in all cases, but solving a large system of equations can be time-consuming. That's why faster methods (like Heaviside Cover-Up) are preferred when applicable.

---

**Q8. (Multiple Choice)**
For the expansion in Example B.8, the solution was \(k_1=1,\ k_2=-2,\ k_3=2,\ k_4=-3\). Which equation comes from matching the **\(x^3\) coefficients**?

- A) \(8k_1 + 7k_2 + 6k_3 + k_4 = 3\)
- B) \(k_1 + k_2 + k_3 = 1\)
- C) \(18k_1 + 9k_2 + 6k_3 + 2k_4 = 6\)
- D) \(21k_1 + 15k_2 + 11k_3 + 3k_4 = 4\)

> ✅ **Answer: B** — The leading (\(x^3\)) terms from each partial fraction contribute only \(k_1 + k_2 + k_3\) (note: \(k_4\) comes from a degree-1 numerator term and doesn't contribute to \(x^3\)).