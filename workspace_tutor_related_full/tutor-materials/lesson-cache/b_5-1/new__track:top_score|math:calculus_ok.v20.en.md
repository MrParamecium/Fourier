# Section B.5-1: Partial Fraction Expansion — Method of Clearing Fractions

---

## Page 1: Section Overview

Welcome! In this section, we're going to learn how to **break apart complicated fractions** into simpler pieces. This is called **partial fraction expansion**, and it's one of the most useful tools in signal processing and linear systems.

---

### Why Do We Care?

Imagine you're handed something like this:

$$F(x) = \frac{x^3 + 3x^2 + 4x + 6}{(x+1)(x+2)(x+3)^2}$$

This looks messy and hard to work with. But what if you could rewrite it as:

$$F(x) = \frac{1}{x+1} - \frac{2}{x+2} + \frac{2}{x+3} - \frac{3}{(x+3)^2}$$

Much nicer, right? Each piece is simple and easy to handle — especially when you need to do things like **inverse Laplace transforms** later in the course.

---

### What You'll Learn in This Section

| Page | Topic |
|------|-------|
| 2 | What is a proper rational function? |
| 3 | Setting up partial fractions with unknown coefficients |
| 4 | Clearing fractions and expanding |
| 5 | Solving the system of equations |
| 6 | Recap & Summary |
| 7 | Quiz |

---

### The Big Picture

The **Method of Clearing Fractions** works like this:

1. ✅ Write \(F(x)\) as a sum of partial fractions with **unknown coefficients** (\(k_1, k_2, \ldots\))
2. ✅ **Multiply both sides** by the full denominator to clear all fractions
3. ✅ **Expand and collect** terms by powers of \(x\)
4. ✅ **Match coefficients** on both sides to get a system of equations
5. ✅ **Solve** for the unknowns

Let's walk through each step carefully!

---

## Page 2: What Is a Proper Rational Function?

Before we can do partial fractions, we need to make sure our function is in the right form.

---

### Rational Functions: A Quick Reminder

A **rational function** is just a fraction where both the top (numerator) and bottom (denominator) are polynomials:

$$F(x) = \frac{P(x)}{Q(x)}$$

---

### Proper vs. Improper

> 🔑 **Key Rule:** The degree of the numerator must be **strictly less than** the degree of the denominator. If it is, we call \(F(x)\) a **proper** rational function.

| Type | Condition | Example |
|------|-----------|---------|
| **Proper** | degree of \(P\) < degree of \(Q\) | \(\frac{x+1}{x^2+4x+3}\) |
| **Improper** | degree of \(P \geq\) degree of \(Q\) | \(\frac{2x^3+9x^2+11x+2}{x^2+4x+3}\) |

---

### What If It's Improper?

No problem! You do **polynomial long division first** to separate it into:

$$F(x) = \underbrace{\text{polynomial part}}_{\text{handle separately}} + \underbrace{\text{proper part}}_{\text{do partial fractions here}}$$

For example, from the textbook:

$$\frac{2x^3 + 9x^2 + 11x + 2}{x^2 + 4x + 3} = \underbrace{(2x+1)}_{\text{polynomial}} + \underbrace{\frac{x-1}{x^2+4x+3}}_{\text{proper fraction}}$$

---

### Our Example Is Already Proper ✅

For the example we'll work through:

$$F(x) = \frac{x^3 + 3x^2 + 4x + 6}{(x+1)(x+2)(x+3)^2}$$

- **Numerator degree:** 3
- **Denominator degree:** \(1 + 1 + 2 = 4\)

Since \(3 < 4\), this is already a **proper** function. We can go straight to partial fractions!

---

## Page 3: Setting Up the Partial Fractions

Now comes the creative part — deciding **what the partial fractions should look like**.

---

### The Rules for Setting Up Partial Fractions

The form of each partial fraction depends on the **type of factor** in the denominator:

---

#### Rule 1: Simple (Non-Repeated) Linear Factor

For a factor like \((x + a)\), you get **one term**:

$$\frac{k}{x + a}$$

---

#### Rule 2: Repeated Linear Factor

For a factor like \((x + a)^2\), you get **two terms**:

$$\frac{k_1}{x+a} + \frac{k_2}{(x+a)^2}$$

More generally, \((x+a)^n\) gives \(n\) terms, one for each power from \(1\) up to \(n\).

---

### Applying This to Our Example

$$F(x) = \frac{x^3 + 3x^2 + 4x + 6}{(x+1)(x+2)(x+3)^2}$$

Let's identify each factor in the denominator:

| Factor | Type | Partial Fraction Term(s) |
|--------|------|--------------------------|
| \((x+1)\) | Simple linear | \(\dfrac{k_1}{x+1}\) |
| \((x+2)\) | Simple linear | \(\dfrac{k_2}{x+2}\) |
| \((x+3)\) | Part of repeated factor | \(\dfrac{k_3}{x+3}\) |
| \((x+3)^2\) | Repeated linear | \(\dfrac{k_4}{(x+3)^2}\) |

---

### The Setup

Putting it all together:

$$\boxed{F(x) = \frac{k_1}{x+1} + \frac{k_2}{x+2} + \frac{k_3}{x+3} + \frac{k_4}{(x+3)^2}}$$

We have **four unknowns**: \(k_1, k_2, k_3, k_4\).

We need **four equations** to solve for them. That's exactly what the next step gives us!

---

> 💡 **Tip:** The number of unknowns always equals the degree of the denominator. Here the denominator has degree 4, so we have 4 unknowns. 

---

## Page 4: Clearing Fractions and Expanding

Now we do the heavy lifting — **multiply both sides by the full denominator** to eliminate all fractions.

---

### Step 1: Multiply Both Sides by \((x+1)(x+2)(x+3)^2\)

Starting from:

$$\frac{x^3 + 3x^2 + 4x + 6}{(x+1)(x+2)(x+3)^2} = \frac{k_1}{x+1} + \frac{k_2}{x+2} + \frac{k_3}{x+3} + \frac{k_4}{(x+3)^2}$$

Multiply every term by \((x+1)(x+2)(x+3)^2\):

$$x^3 + 3x^2 + 4x + 6 = k_1(x+2)(x+3)^2 + k_2(x+1)(x+3)^2 + k_3(x+1)(x+2)(x+3) + k_4(x+1)(x+2)$$

---

### Step 2: Expand Each Product

Let's expand each bracket carefully:

**For \(k_1\):** \((x+2)(x+3)^2 = (x+2)(x^2+6x+9) = x^3 + 8x^2 + 21x + 18\)

**For \(k_2\):** \((x+1)(x+3)^2 = (x+1)(x^2+6x+9) = x^3 + 7x^2 + 15x + 9\)

**For \(k_3\):** \((x+1)(x+2)(x+3) = (x^2+3x+2)(x+3) = x^3 + 6x^2 + 11x + 6\)

**For \(k_4\):** \((x+1)(x+2) = x^2 + 3x + 2\)

---

### Step 3: Collect by Powers of \(x\)

$$x^3 + 3x^2 + 4x + 6 = x^3\underbrace{(k_1+k_2+k_3)}_{\text{coeff of }x^3} + x^2\underbrace{(8k_1+7k_2+6k_3+k_4)}_{\text{coeff of }x^2}$$
$$+ \ x\underbrace{(21k_1+15k_2+11k_3+3k_4)}_{\text{coeff of }x} + \underbrace{(18k_1+9k_2+6k_3+2k_4)}_{\text{constant}}$$

---

> 💡 **What we're doing:** We're organizing the right-hand side so we can compare it term-by-term with the left-hand side. This is called **equating coefficients**.

---

## Page 5: Solving the System of Equations

We now have everything we need. Let's match coefficients and solve!

---

### Step 4: Equate Coefficients of Each Power

Compare the left side \(x^3 + 3x^2 + 4x + 6\) with the right side:

| Power | Left Side | Right Side | Equation |
|-------|-----------|------------|----------|
| \(x^3\) | \(1\) | \(k_1+k_2+k_3\) | \(k_1+k_2+k_3 = 1\) |
| \(x^2\) | \(3\) | \(8k_1+7k_2+6k_3+k_4\) | \(8k_1+7k_2+6k_3+k_4 = 3\) |
| \(x^1\) | \(4\) | \(21k_1+15k_2+11k_3+3k_4\) | \(21k_1+15k_2+11k_3+3k_4 = 4\) |
| \(x^0\) | \(6\) | \(18k_1+9k_2+6k_3+2k_4\) | \(18k_1+9k_2+6k_3+2k_4 = 6\) |

---

### Step 5: Solve the Four Equations

$$k_1 + k_2 + k_3 = 1 \tag{1}$$
$$8k_1 + 7k_2 + 6k_3 + k_4 = 3 \tag{2}$$
$$21k_1 + 15k_2 + 11k_3 + 3k_4 = 4 \tag{3}$$
$$18k_1 + 9k_2 + 6k_3 + 2k_4 = 6 \tag{4}$$

Solving this system (using substitution or matrix methods) gives:

$$\boxed{k_1 = 1, \quad k_2 = -2, \quad k_3 = 2, \quad k_4 = -3}$$

---

### The Final Answer

$$\boxed{F(x) = \frac{1}{x+1} - \frac{2}{x+2} + \frac{2}{x+3} - \frac{3}{(x+3)^2}}$$

---

### A Quick Sanity Check 🔍

You can verify by picking a simple value of \(x\), say \(x = 0\):

- **Left side:** \(\frac{0+0+0+6}{(1)(2)(9)} = \frac{6}{18} = \frac{1}{3}\)
- **Right side:** \(\frac{1}{1} - \frac{2}{2} + \frac{2}{3} - \frac{3}{9} = 1 - 1 + \frac{2}{3} - \frac{1}{3} = \frac{1}{3}\) ✅

---

## Page 6: Recap & Summary

Great work making it through! Let's pull everything together.

---

### The Big Picture

The **Method of Clearing Fractions** is a systematic way to find partial fraction coefficients. It always works, no matter how complicated the function is.

---

### Step-by-Step Summary

```
Step 1: Check the function is PROPER (degree of numerator < degree of denominator)
           └─ If not: do polynomial long division first

Step 2: FACTOR the denominator completely

Step 3: WRITE the partial fraction template
           └─ Simple factor (x+a)      →  k/(x+a)
           └─ Repeated factor (x+a)²   →  k₁/(x+a) + k₂/(x+a)²

Step 4: CLEAR FRACTIONS — multiply both sides by the full denominator

Step 5: EXPAND and COLLECT terms by powers of x

Step 6: EQUATE COEFFICIENTS of matching powers on both sides

Step 7: SOLVE the resulting system of linear equations
```

---

### Key Concepts to Remember

| Concept | What It Means |
|---------|---------------|
| **Proper function** | Degree of numerator < degree of denominator |
| **Partial fraction** | One simple fraction in the expansion |
| **Clearing fractions** | Multiplying both sides by the denominator |
| **Equating coefficients** | Matching powers of \(x\) on both sides |
| **Repeated factor** | \((x+a)^n\) needs \(n\) separate terms |

---

### Strengths and Limitations

| ✅ Strengths | ⚠️ Limitations |
|-------------|----------------|
| Works for **all** cases | Can be **tedious** for high-degree polynomials |
| Very **systematic** | Requires solving a **system of equations** |
| Easy to understand | More efficient methods exist (e.g., Heaviside Cover-Up) |

---

### Coming Up Next

In **Section B.5-2**, you'll learn the **Heaviside Cover-Up Method** — a much faster technique for finding coefficients when the denominator has only **distinct (non-repeated) factors**. It's like a shortcut that skips all the algebra!

---

## Page 7: Quiz

```yaml
quiz_plan:
  section: "B.5-1 — Method of Clearing Fractions"
  total_questions: 8
  format_note: "Mostly multiple-choice; short-answer where calculation is needed"

  questions:

    - id: 1
      type: multiple-choice
      topic: "Proper vs. improper rational functions"
      question: >
        Which of the following is a PROPER rational function?
      options:
        A: "F(x) = (x³ + 2x) / (x² + 1)"
        B: "F(x) = (x² + 3x + 2) / (x³ + 5x + 6)"
        C: "F(x) = (x⁴ + 1) / (x³ + x)"
        D: "F(x) = (x³ + x²) / (x² + 1)"
      answer: B
      explanation: >
        A proper function requires degree(numerator) < degree(denominator).
        Only option B has numerator degree 2 and denominator degree 3, so 2 < 3. ✅

    - id: 2
      type: multiple-choice
      topic: "Setting up partial fractions — simple factors"
      question: >
        For F(x) = P(x) / [(x+1)(x+4)], what is the correct partial fraction setup?
      options:
        A: "k₁/(x+1)² + k₂/(x+4)²"
        B: "k₁/(x+1) + k₂/(x+4)"
        C: "k₁·(x+1) + k₂·(x+4)"
        D: "k/(x+1)(x+4)"
      answer: B
      explanation: >
        Each simple (non-repeated) linear factor gets exactly one term of the form k/(x+a).

    - id: 3
      type: multiple-choice
      topic: "Setting up partial fractions — repeated factors"
      question: >
        For F(x) = P(x) / [(x+2)(x+5)²], how many unknown coefficients are needed?
      options:
        A: "2"
        B: "3"
        C: "4"
        D: "5"
      answer: B
      explanation: >
        (x+2) gives 1 term, and (x+5)² gives 2 terms (one for each power).
        Total = 1 + 2 = 3 unknowns.

    - id: 4
      type: multiple-choice
      topic: "Clearing fractions"
      question: >
        When we "clear fractions" in the method of clearing fractions, what operation do we perform?
      options:
        A: "Divide both sides by the numerator P(x)"
        B: "Multiply both sides by the full denominator Q(x)"
        C: "Take the derivative of both sides"
        D: "Set x = 0 on both sides"
      answer: B
      explanation: >
        Clearing fractions means multiplying both sides by the full denominator Q(x),
        which eliminates all the fraction bars and gives a polynomial equation.

    - id: 5
      type: multiple-choice
      topic: "Equating coefficients"
      question: >
        After clearing fractions, you get:
        x³ + 3x² + 4x + 6 = x³(k₁+k₂+k₃) + x²(8k₁+7k₂+6k₃+k₄) + ...
        What equation comes from matching the x³ coefficients?
      options:
        A: "8k₁ + 7k₂ + 6k₃ + k₄ = 3"
        B: "k₁ + k₂ + k₃ + k₄ = 1"
        C: "k₁ + k₂ + k₃ = 1"
        D: "k₁ + k₂ + k₃ = 3"
      answer: C
      explanation: >
        The coefficient of x³ on the left is 1. On the right it is (k₁+k₂+k₃).
        Note k₄ does NOT appear in the x³ term because (x+1)(x+2) is only degree 2.
        So: k₁ + k₂ + k₃ = 1.

    - id: 6
      type: multiple-choice
      topic: "Number of equations vs. unknowns"
      question: >
        For a proper rational function with denominator of degree n, how many
        unknown coefficients will the partial fraction expansion have?
      options:
        A: "n - 1"
        B: "n"
        C: "n + 1"
        D: "It depends on the numerator"
      answer: B
      explanation: >
        The total number of partial fraction terms (and hence unknowns) always
        equals the degree of the denominator Q(x).

    - id: 7
      type: multiple-