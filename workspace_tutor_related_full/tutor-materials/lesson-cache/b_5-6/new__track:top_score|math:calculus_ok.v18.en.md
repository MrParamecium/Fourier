# B.5-6 Modified Partial Fractions

---

## Page 1: Section Overview — What Are Modified Partial Fractions?

Welcome! In this section, we're going to learn a clever little trick that builds on regular partial fraction expansion.

### Why Do We Need This?

You already know how to break a fraction like this into partial fractions:

$$F(x) = \frac{k_1}{x - \lambda_1} + \frac{k_2}{x - \lambda_2} + \cdots$$

That's the standard form. But here's the thing — when we work with **inverse z-transforms** (which you'll encounter in Chapter 5), we actually need our partial fractions to look like this instead:

$$F(x) = \frac{k_1 \cdot x}{x - \lambda_1} + \frac{k_2 \cdot x}{x - \lambda_2} + \cdots$$

Notice the difference? Each term has an **extra \(x\) in the numerator**. This is the **modified partial fraction** form.

### The Big Idea in One Sentence

> **Divide \(F(x)\) by \(x\) first, expand into regular partial fractions, then multiply everything back by \(x\).**

### What You'll Learn on Each Page

| Page | Topic |
|------|-------|
| 2 | Why we divide by \(x\) — the core trick |
| 3 | Step-by-step worked example |
| 4 | Finding the coefficients \(a_1, a_2, a_3, a_4\) |
| 5 | Multiplying back by \(x\) to get the final answer |
| 6 | Recap & Summary |
| 7 | Quiz |

Let's dive in! 🎯

---

## Page 2: The Core Trick — Why Divide by \(x\)?

### The Problem We're Solving

Suppose we have:

$$F(x) = \frac{5x^2 + 20x + 18}{(x+2)(x+3)^2}$$

We want to write this as a sum of terms, each looking like:

$$\frac{k \cdot x}{(x - \lambda)^r}$$

If we tried to do regular partial fractions directly on \(F(x)\), we'd get terms like \(\frac{k}{x+2}\) — **no \(x\) in the numerator**. That's not what we want.

### The Trick: Divide by \(x\)

Here's the key insight. Watch what happens when we divide both sides by \(x\):

$$\frac{F(x)}{x} = \frac{5x^2 + 20x + 18}{x(x+2)(x+3)^2}$$

Now the right-hand side is a fraction we **can** expand using regular partial fractions — it just has an extra factor of \(x\) in the denominator.

### Why Does This Help?

When we expand \(\frac{F(x)}{x}\) into regular partial fractions, we get terms like:

$$\frac{a_1}{x}, \quad \frac{a_2}{x+2}, \quad \frac{a_3}{x+3}, \quad \frac{a_4}{(x+3)^2}$$

Then when we **multiply both sides back by \(x\)**, those terms become:

$$a_1, \quad \frac{a_2 \cdot x}{x+2}, \quad \frac{a_3 \cdot x}{x+3}, \quad \frac{a_4 \cdot x}{(x+3)^2}$$

✅ Now every term (except the constant) has the form \(\frac{k \cdot x}{(x-\lambda)^r}\) — exactly what we need!

### The Two-Step Recipe

> **Step 1:** Divide \(F(x)\) by \(x\) and expand \(\frac{F(x)}{x}\) into regular partial fractions.
>
> **Step 2:** Multiply both sides by \(x\) to get the modified partial fraction form.

Simple and elegant. Let's see it in action.

---

## Page 3: Setting Up the Partial Fraction Expansion

### Our Example

$$F(x) = \frac{5x^2 + 20x + 18}{(x+2)(x+3)^2}$$

### Step 1: Divide Both Sides by \(x\)

$$\frac{F(x)}{x} = \frac{5x^2 + 20x + 18}{x(x+2)(x+3)^2}$$

### Step 2: Write Out the Partial Fraction Template

The denominator has three distinct factors:
- \(x\) → simple factor → contributes \(\dfrac{a_1}{x}\)
- \((x+2)\) → simple factor → contributes \(\dfrac{a_2}{x+2}\)
- \((x+3)^2\) → **repeated** factor (power 2) → contributes \(\dfrac{a_3}{x+3} + \dfrac{a_4}{(x+3)^2}\)

So we write:

$$\frac{F(x)}{x} = \frac{5x^2 + 20x + 18}{x(x+2)(x+3)^2} = \frac{a_1}{x} + \frac{a_2}{x+2} + \frac{a_3}{x+3} + \frac{a_4}{(x+3)^2}$$

### Quick Reminder: Rules for Setting Up the Template

| Factor in denominator | Terms to include |
|----------------------|-----------------|
| \((x - \lambda)\) | \(\dfrac{a}{x-\lambda}\) |
| \((x - \lambda)^2\) | \(\dfrac{a}{x-\lambda} + \dfrac{b}{(x-\lambda)^2}\) |
| \((x - \lambda)^r\) | \(\dfrac{a_1}{x-\lambda} + \dfrac{a_2}{(x-\lambda)^2} + \cdots + \dfrac{a_r}{(x-\lambda)^r}\) |

Now we need to find \(a_1\), \(a_2\), \(a_3\), and \(a_4\). Let's do that on the next page!

---

## Page 4: Finding the Coefficients

We need to find \(a_1\), \(a_2\), \(a_3\), \(a_4\) in:

$$\frac{5x^2 + 20x + 18}{x(x+2)(x+3)^2} = \frac{a_1}{x} + \frac{a_2}{x+2} + \frac{a_3}{x+3} + \frac{a_4}{(x+3)^2}$$

We use the **cover-up method** (multiply both sides by the factor, then substitute the root).

---

### Finding \(a_1\): Multiply both sides by \(x\), set \(x = 0\)

$$a_1 = \left. \frac{5x^2 + 20x + 18}{(x+2)(x+3)^2} \right|_{x=0} = \frac{0 + 0 + 18}{(2)(3)^2} = \frac{18}{18} = \boxed{1}$$

---

### Finding \(a_2\): Multiply both sides by \((x+2)\), set \(x = -2\)

$$a_2 = \left. \frac{5x^2 + 20x + 18}{x(x+3)^2} \right|_{x=-2} = \frac{5(4) + 20(-2) + 18}{(-2)(1)^2} = \frac{20 - 40 + 18}{-2} = \frac{-2}{-2} = \boxed{1}$$

---

### Finding \(a_4\): Multiply both sides by \((x+3)^2\), set \(x = -3\)

$$a_4 = \left. \frac{5x^2 + 20x + 18}{x(x+2)} \right|_{x=-3} = \frac{5(9) + 20(-3) + 18}{(-3)(-1)} = \frac{45 - 60 + 18}{3} = \frac{3}{3} = \boxed{1}$$

---

### Finding \(a_3\): Use differentiation (for repeated roots)

For a repeated factor \((x+3)^2\), we find \(a_3\) by multiplying both sides by \((x+3)^2\) and then **differentiating** with respect to \(x\), then setting \(x = -3\):

$$a_3 = \left. \frac{d}{dx}\left[\frac{5x^2 + 20x + 18}{x(x+2)}\right] \right|_{x=-3}$$

Let \(G(x) = \frac{5x^2 + 20x + 18}{x(x+2)} = \frac{5x^2 + 20x + 18}{x^2 + 2x}\)

Using the quotient rule:

$$G'(x) = \frac{(10x+20)(x^2+2x) - (5x^2+20x+18)(2x+2)}{(x^2+2x)^2}$$

At \(x = -3\):
- Numerator: \((10(-3)+20)(9-6) - (45-60+18)(−6+2)\)
  \(= (-10)(3) - (3)(-4)\)
  \(= -30 + 12 = -18\)
- Denominator: \((9 - 6)^2 = 9\)

$$a_3 = \frac{-18}{9} = \boxed{-2}$$

---

### Summary of Coefficients

| Coefficient | Value |
|-------------|-------|
| \(a_1\) | \(1\) |
| \(a_2\) | \(1\) |
| \(a_3\) | \(-2\) |
| \(a_4\) | \(1\) |

So:

$$\frac{F(x)}{x} = \frac{1}{x} + \frac{1}{x+2} - \frac{2}{x+3} + \frac{1}{(x+3)^2}$$

---

## Page 5: Multiplying Back by \(x\) — The Final Answer

### Where We Left Off

We found:

$$\frac{F(x)}{x} = \frac{1}{x} + \frac{1}{x+2} - \frac{2}{x+3} + \frac{1}{(x+3)^2}$$

### Step 2: Multiply Both Sides by \(x\)

Multiply every single term on both sides by \(x\):

$$F(x) = x \cdot \frac{1}{x} + x \cdot \frac{1}{x+2} - x \cdot \frac{2}{x+3} + x \cdot \frac{1}{(x+3)^2}$$

$$\boxed{F(x) = 1 + \frac{x}{x+2} - \frac{2x}{x+3} + \frac{x}{(x+3)^2}}$$

### Let's Check Each Term

| Original term | After multiplying by \(x\) | Form |
|--------------|--------------------------|------|
| \(\dfrac{1}{x}\) | \(1\) | constant |
| \(\dfrac{1}{x+2}\) | \(\dfrac{x}{x+2}\) | \(\dfrac{kx}{x-\lambda}\) ✅ |
| \(\dfrac{-2}{x+3}\) | \(\dfrac{-2x}{x+3}\) | \(\dfrac{kx}{x-\lambda}\) ✅ |
| \(\dfrac{1}{(x+3)^2}\) | \(\dfrac{x}{(x+3)^2}\) | \(\dfrac{kx}{(x-\lambda)^2}\) ✅ |

Every term (except the constant \(1\)) is now in the **modified partial fraction form** \(\dfrac{kx}{(x-\lambda)^r}\).

### Why Is the Constant Term Okay?

The constant \(1\) comes from the \(\dfrac{a_1}{x}\) term. When multiplied by \(x\), it becomes just \(a_1 = 1\). This is perfectly fine — it's simply a constant term in the expansion, and it causes no problems in z-transform work.

### 🎉 Mission Accomplished!

We've successfully expressed \(F(x) = \dfrac{5x^2 + 20x + 18}{(x+2)(x+3)^2}\) in modified partial fraction form, ready for inverse z-transform use.

---

## Page 6: Recap & Summary

Great work making it this far! Let's pull everything together.

---

### 🔑 What Are Modified Partial Fractions?

Modified partial fractions express \(F(x)\) as a sum of terms of the form:

$$\frac{k \cdot x}{(x - \lambda)^r}$$

instead of the usual \(\dfrac{k}{(x-\lambda)^r}\). This form is required when computing **inverse z-transforms**.

---

### 🔑 The Two-Step Method

> **Step 1:** Divide \(F(x)\) by \(x\) to get \(\dfrac{F(x)}{x}\), then expand into **regular** partial fractions.
>
> **Step 2:** Multiply both sides by \(x\) to convert to **modified** partial fractions.

---

### 🔑 The Full Worked Example at a Glance

$$F(x) = \frac{5x^2 + 20x + 18}{(x+2)(x+3)^2}$$

**Divide by \(x\):**

$$\frac{F(x)}{x} = \frac{5x^2 + 20x + 18}{x(x+2)(x+3)^2} = \frac{a_1}{x} + \frac{a_2}{x+2} + \frac{a_3}{x+3} + \frac{a_4}{(x+3)^2}$$

**Find coefficients** using cover-up and differentiation:

$$a_1 = 1, \quad a_2 = 1, \quad a_3 = -2, \quad a_4 = 1$$

**Write \(F(x)/x\):**

$$\frac{F(x)}{x} = \frac{1}{x} + \frac{1}{x+2} - \frac{2}{x+3} + \frac{1}{(x+3)^2}$$

**Multiply by \(x\):**

$$F(x) = 1 + \frac{x}{x+2} - \frac{2x}{x+3} + \frac{x}{(x+3)^2}$$

---

### 🔑 Key Rules to Remember

| Situation | What to do |
|-----------|-----------|
| Simple factor \((x - \lambda)\) | Use cover-up: substitute \(x = \lambda\) |
| Repeated factor \((x - \lambda)^r\) | Use cover-up for the highest power; differentiate for lower powers |
| Need modified form | Divide by \(x\) first, expand, then multiply back by \(x\) |

---

### 🔑 Why This Matters

This technique is **essential** for inverse z-transforms. The z-transform tables are built around terms like \(\dfrac{z}{z - \lambda}\), not \(\dfrac{1}{z - \lambda}\). Modified partial fractions give you exactly that structure.

---

## Page 7: Quiz — Exam-Oriented Practice

```
quiz_plan

Title: B.5-6 Modified Partial Fractions — Exam Quiz

Format: Mostly multiple-choice; short-answer where calculation is needed.

---

Q1. [Multiple Choice] — Conceptual
Why do we divide F(x) by x before expanding into partial fractions in the
modified method?

A) To simplify the numerator polynomial
B) So that after expanding and multiplying back by x, each term has the
   form kx/(x − λ)^r
C) To reduce the degree of the denominator
D) Because the cover-up method only works on fractions with x in the
   denominator

Answer: B
Explanation: Dividing by x, expanding, then multiplying back by x
produces the modified form kx/(x−λ)^r needed for inverse z-transforms.

---

Q2. [Multiple Choice] — Setup
Given F(x) = (3x + 5) / [(x+1)(x+4)], what is the correct partial
fraction template for F(x)/x?

A) a1/(x+1) + a2/(x+4)
B) a1/x + a2/(x+1) + a3/(x+4)
C) a1/x + a2/(x+1)^2 + a3/(x+4)
D) a1/(x+1) + a2/(x+4) + a3/(x+4)^2

Answer: B
Explanation: F(x)/x = (3x+5)/[x(x+1)(x+4)], which has three simple
factors: x, (x+1), and (x+4), giving three terms.

---

Q3. [Multiple Choice] — Coefficient Calculation
For the expansion:
  (5x^2 + 20x + 18) / [x(x+2)(x+3)^2] = a1/x + a2/(x+2) + ...

What is a1?

A) 0
B) 1
C) 2
D) 18

Answer: B
Explanation: Cover-up: multiply by x and set x=0.
a1 = (0 + 0 + 18)/[(2)(9)] = 18/18 = 1.

---

Q4. [Multiple Choice] — Coefficient Calculation
Using the same expansion as Q3, what is a2?

A) −1
B) 0
C) 1
D) 2

Answer: C
Explanation: Cover-up: multiply by (x+2) and set x=−2.
a2 = [5(4) + 20(−2) + 18] / [(−2)(1)^2] = (−2)/(−2) = 1.

---

Q5. [Multiple Choice] — Repeated Root
For a repeated factor (x+3)^2 in the denominator, how do we find the
coefficient of the 1/(x+3) term (i.e., a3)?

A) Substitute x = −3 directly into the full expression
B) Multiply by (x+3)^2, then differentiate with respect to x,
   then set x = −3
C) Multiply by (x+3) and set x = −3
D) Use polynomial long division

Answer: B
Explanation: For repeated roots, the cover-up method gives only the
highest-power coefficient directly. Lower-power coefficients require
differentiation after multiplying by the full repeated factor.

---

Q6. [Multiple Choice] — Final Form
After finding F(x)/x = 1/x + 1/(x+2) − 2/(x+3) + 1/(x+3)^2,
what is F(x)?

A) 1/x + x/(x+2) − 2x/(x+3) + x/(x+3)^2
B) 1 + x/(x+2) − 2x/(x+3) + x/(x+3)^2
C) x + x/(x+2) − 2x/(x+3) + x/(x+3)^2
D) 1 + 1/(x+2) − 2/(x+3) + 1/(