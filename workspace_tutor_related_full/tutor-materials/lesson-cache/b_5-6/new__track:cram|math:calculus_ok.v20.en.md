# B.5-6 Modified Partial Fractions

---

## Page 1: Section Overview — What Is This About and Why Do We Care?

Welcome! In this section, we're going to learn a clever little trick called **Modified Partial Fractions**.

### The Big Picture

You already know how to do regular partial fraction expansion — breaking a complicated fraction into simpler pieces. That's great for many problems.

But here's the thing: when we work with **z-transforms** (a major tool in digital signal processing, covered in Chapter 5), we need our partial fractions to look like this:

$$\frac{kx}{(x - \lambda_i)^r}$$

Notice the **x on top** in the numerator! This is *different* from the standard form, which looks like:

$$\frac{k}{(x - \lambda_i)^r}$$

So the question is: **How do we get that x into the numerator?**

### The Answer: A Simple Divide-Then-Multiply Trick

The method is beautifully simple:

1. **Divide** \(F(x)\) by \(x\) to get \(\frac{F(x)}{x}\)
2. **Expand** \(\frac{F(x)}{x}\) using regular partial fractions (the kind you already know)
3. **Multiply** everything back by \(x\) to recover \(F(x)\) in the form we want

That's it! Three steps. Let's dig into each piece carefully.

### What You'll Learn on Each Page

| Page | Topic |
|------|-------|
| Page 2 | Why we need the modified form (motivation) |
| Page 3 | Step-by-step walkthrough of the method |
| Page 4 | Computing the coefficients in detail |
| Page 5 | Recap & Summary |
| Page 6 | Quiz |

---

## Page 2: Why Do We Need This Modified Form?

### A Quick Reminder: Standard Partial Fractions

In standard partial fraction expansion, we write something like:

$$F(x) = \frac{3x^2 + 9x - 20}{(x-2)(x+3)} = 3 + \frac{2}{x-2} + \frac{4}{x+3}$$

Each piece has the form \(\frac{k}{x - \lambda_i}\) — a **constant on top**, a linear factor on the bottom.

This works perfectly for **Laplace transforms** and many other applications.

### The Problem with Z-Transforms

When we compute **inverse z-transforms**, we use a table of known transform pairs. The entries in that table look like:

$$\frac{x}{x - \lambda} \longleftrightarrow \lambda^n \, u[n]$$

See how the table entry has **x in the numerator**? That's the key. If our partial fractions have the form \(\frac{k}{x - \lambda}\) (no x on top), they **don't match** the table entries directly.

We need our answer to look like:

$$F(x) = k_1 \cdot \frac{x}{x - \lambda_1} + k_2 \cdot \frac{x}{x - \lambda_2} + \cdots$$

### The Goal, Stated Clearly

> **Goal:** Express \(F(x)\) as a sum of terms of the form \(\dfrac{kx}{(x - \lambda_i)^r}\)

This is what we call the **modified partial fraction** form.

### Why Not Just Multiply the Standard Result by x?

Good question! You might think: "Can't I just do regular partial fractions and then multiply by x?"

The problem is that multiplying by x **changes the function** — it doesn't just rearrange the pieces. We need a systematic method that gives us the right coefficients. That's exactly what the divide-then-multiply trick does.

---

## Page 3: The Method — Step by Step

Let's work through the full example from the textbook. We have:

$$F(x) = \frac{5x^2 + 20x + 18}{(x+2)(x+3)^2}$$

### Step 1: Divide Both Sides by x

$$\frac{F(x)}{x} = \frac{5x^2 + 20x + 18}{x(x+2)(x+3)^2}$$

We've introduced \(x\) into the denominator. Now the denominator has **four factors**: \(x\), \((x+2)\), \((x+3)\), and \((x+3)^2\).

### Step 2: Set Up the Partial Fraction Expansion

For the right-hand side, we write the standard partial fraction form. Remember the rules:

- Each **distinct linear factor** \((x - a)\) gets one term: \(\dfrac{a_i}{x - a}\)
- Each **repeated linear factor** \((x - a)^r\) gets \(r\) terms: \(\dfrac{a_i}{x-a} + \dfrac{a_j}{(x-a)^2} + \cdots\)

So we write:

$$\frac{F(x)}{x} = \frac{5x^2 + 20x + 18}{x(x+2)(x+3)^2} = \frac{a_1}{x} + \frac{a_2}{x+2} + \frac{a_3}{x+3} + \frac{a_4}{(x+3)^2}$$

Four factors → four terms. ✓

### Step 3: Find the Coefficients (Next Page!)

We use the **cover-up method** (and a little algebra for the repeated root). We'll do this carefully on the next page.

### Step 4: Multiply Both Sides by x

Once we have all the \(a_i\) values, we multiply both sides by \(x\):

$$F(x) = a_1 + \frac{a_2 \, x}{x+2} + \frac{a_3 \, x}{x+3} + \frac{a_4 \, x}{(x+3)^2}$$

Now every term (except possibly a constant) has the form \(\dfrac{k \, x}{(x - \lambda)^r}\). 

---

## Page 4: Computing the Coefficients — In Full Detail

We need to find \(a_1, a_2, a_3, a_4\) in:

$$\frac{5x^2 + 20x + 18}{x(x+2)(x+3)^2} = \frac{a_1}{x} + \frac{a_2}{x+2} + \frac{a_3}{x+3} + \frac{a_4}{(x+3)^2}$$

### Finding \(a_1\): Cover Up the Factor \(x\), Set \(x = 0\)

Multiply both sides by \(x\) and set \(x = 0\):

$$a_1 = \left. \frac{5x^2 + 20x + 18}{(x+2)(x+3)^2} \right|_{x=0} = \frac{0 + 0 + 18}{(2)(3)^2} = \frac{18}{18} = 1$$

$$\boxed{a_1 = 1}$$

### Finding \(a_2\): Cover Up \((x+2)\), Set \(x = -2\)

Multiply both sides by \((x+2)\) and set \(x = -2\):

$$a_2 = \left. \frac{5x^2 + 20x + 18}{x(x+3)^2} \right|_{x=-2} = \frac{5(4) + 20(-2) + 18}{(-2)(1)^2} = \frac{20 - 40 + 18}{-2} = \frac{-2}{-2} = 1$$

$$\boxed{a_2 = 1}$$

### Finding \(a_4\): Cover Up \((x+3)^2\), Set \(x = -3\)

For the **highest power** of the repeated factor, we cover up \((x+3)^2\) and set \(x = -3\):

$$a_4 = \left. \frac{5x^2 + 20x + 18}{x(x+2)} \right|_{x=-3} = \frac{5(9) + 20(-3) + 18}{(-3)(-1)} = \frac{45 - 60 + 18}{3} = \frac{3}{3} = 1$$

$$\boxed{a_4 = 1}$$

### Finding \(a_3\): Use Any Convenient Value of \(x\)

For the **lower-power** repeated term, the cover-up method doesn't work directly. Instead, substitute a convenient value of \(x\) (now that we know \(a_1, a_2, a_4\)).

Let's use \(x = 1\). Plug into the original equation:

$$\frac{5(1) + 20(1) + 18}{(1)(3)(4)^2} = \frac{43}{48}$$

And the right-hand side becomes:

$$\frac{1}{1} + \frac{1}{3} + \frac{a_3}{4} + \frac{1}{16}$$

Setting them equal:

$$\frac{43}{48} = 1 + \frac{1}{3} + \frac{a_3}{4} + \frac{1}{16}$$

$$\frac{43}{48} = \frac{48}{48} + \frac{16}{48} + \frac{12 a_3}{48} + \frac{3}{48}$$

$$43 = 48 + 16 + 12a_3 + 3 = 67 + 12a_3$$

$$12a_3 = 43 - 67 = -24 \implies a_3 = -2$$

$$\boxed{a_3 = -2}$$

### Putting It All Together

$$\frac{F(x)}{x} = \frac{1}{x} + \frac{1}{x+2} - \frac{2}{x+3} + \frac{1}{(x+3)^2}$$

Now **multiply both sides by \(x\)**:

$$\boxed{F(x) = 1 + \frac{x}{x+2} - \frac{2x}{x+3} + \frac{x}{(x+3)^2}}$$

Every fraction now has \(x\) in the numerator — exactly the modified form we wanted! ✓

> **Note on the constant term:** The \(a_1\) term becomes just the constant \(1\) after multiplying by \(x\). This is fine — a constant is a valid part of the expansion.

---

## Page 5: Recap & Summary

Great work! Let's pull everything together into a clean summary.

### What Is Modified Partial Fractions?

It's a technique to express \(F(x)\) as a sum of terms of the form:

$$\frac{k \, x}{(x - \lambda_i)^r}$$

instead of the standard \(\dfrac{k}{(x - \lambda_i)^r}\).

### Why Do We Need It?

Because **inverse z-transform tables** use entries like \(\dfrac{x}{x - \lambda}\), not \(\dfrac{1}{x - \lambda}\). The modified form matches the table directly.

### The Three-Step Method

| Step | Action |
|------|--------|
| **1. Divide** | Compute \(\dfrac{F(x)}{x}\) — this puts \(x\) in the denominator |
| **2. Expand** | Do a regular partial fraction expansion of \(\dfrac{F(x)}{x}\) |
| **3. Multiply** | Multiply both sides by \(x\) to get \(F(x)\) in modified form |

### Finding the Coefficients

Use the same tools as regular partial fractions:

- **Cover-up method** for simple (non-repeated) factors and the highest-power repeated factor
- **Substitute a convenient value of \(x\)** for lower-power repeated factors

### The Worked Example

$$F(x) = \frac{5x^2 + 20x + 18}{(x+2)(x+3)^2}$$

$$\frac{F(x)}{x} = \frac{1}{x} + \frac{1}{x+2} - \frac{2}{x+3} + \frac{1}{(x+3)^2}$$

$$F(x) = 1 + \frac{x}{x+2} - \frac{2x}{x+3} + \frac{x}{(x+3)^2}$$

### Key Things to Remember

> ✅ Always divide by \(x\) **first**, then expand, then multiply back.
>
> ✅ The number of partial fraction terms equals the **degree of the denominator** of \(\dfrac{F(x)}{x}\).
>
> ✅ A constant term in the result (from the \(a_1/x\) piece) is perfectly normal.
>
> ✅ This method is specifically designed for **z-transform** work.

---

## Page 6: Quiz — Exam-Oriented Practice

### quiz_plan

**Section:** B.5-6 Modified Partial Fractions
**Format:** Mostly multiple-choice; short-answer where calculation is needed
**Difficulty:** Beginner to intermediate

---

**Q1. (Multiple Choice)**
Why do we use *modified* partial fractions instead of standard partial fractions when working with z-transforms?

- A) Standard partial fractions don't work for polynomials
- B) Z-transform tables require terms of the form \(\dfrac{kx}{x - \lambda}\), not \(\dfrac{k}{x - \lambda}\)
- C) Modified partial fractions are always simpler to compute
- D) The denominator of \(F(x)\) must always contain \(x\) as a factor

> **Answer: B** — The z-transform table entries have \(x\) in the numerator, so we need our partial fractions in that form to match.

---

**Q2. (Multiple Choice)**
What is the **first step** in the modified partial fraction method applied to \(F(x)\)?

- A) Multiply \(F(x)\) by \(x\)
- B) Factor the numerator of \(F(x)\)
- C) Divide \(F(x)\) by \(x\) to form \(\dfrac{F(x)}{x}\)
- D) Set \(x = 0\) in \(F(x)\)

> **Answer: C** — We divide by \(x\) first, expand, then multiply back.

---

**Q3. (Multiple Choice)**
Given:

$$\frac{F(x)}{x} = \frac{G(x)}{x(x+1)(x+2)}$$

How many partial fraction terms will the expansion have?

- A) 2
- B) 3
- C) 4
- D) 5

> **Answer: B** — Three distinct linear factors → three terms: \(\dfrac{a_1}{x} + \dfrac{a_2}{x+1} + \dfrac{a_3}{x+2}\)

---

**Q4. (Multiple Choice)**
After expanding \(\dfrac{F(x)}{x}\) into partial fractions, what do you do next?

- A) Differentiate both sides with respect to \(x\)
- B) Multiply both sides by \(x\)
- C) Substitute \(x = 1\) into both sides
- D) Take the inverse Laplace transform

> **Answer: B** — Multiplying by \(x\) converts each \(\dfrac{a_i}{x - \lambda_i}\) into \(\dfrac{a_i \, x}{x - \lambda_i}\).

---

**Q5. (Multiple Choice)**
In the textbook example, after expanding \(\dfrac{F(x)}{x}\) and multiplying by \(x\), the term \(\dfrac{a_1}{x}\) becomes:

- A) \(\dfrac{a_1}{x^2}\)
- B) \(a_1 \cdot x\)
- C) \(a_1\) (a constant)
- D) \(\dfrac{a_1}{x-1}\)

> **Answer: C** — \(x \cdot \dfrac{a_1}{x} = a_1\). The \(x\) cancels, leaving just a constant.

---

**Q6. (Multiple Choice)**
For the expansion:

$$\frac{F(x)}{x} = \frac{a_1}{x} + \frac{a_2}{x+2} + \frac{a_3}{x+3} + \frac{a_4}{(x+3)^2}$$

Which coefficient **cannot** be found directly by the cover-up method?

- A) \(a_1\)
- B) \(a_2\)
- C) \(a_3\)
- D) \(a_4\)

> **Answer: C** — \(a_3\) corresponds to the *lower-power* term of the repeated factor \((x+3)^2\). The cover-up method works for \(a_4\) (highest power) but not \(a_3\). We must substitute a convenient \(x\) value instead.

---

**Q7. (Short Answer)**
Find \(a_1\) in the expansion below using the cover-up method:

$$\frac{F(x)}{x} = \frac{3x + 6}{x(x+3)} = \frac{a_1}{x} + \frac{a_2}{x+3}$$

> **Answer:**
> Cover up \(x\) and set \(x = 0\):
> $$a_1 = \left.\frac{3x+6}{x+3}\right|_{x=0} = \frac{6}{3} = 2$$
> So \(a_1 = 2\).

---

**Q8. (Short Answer)**
Using your answer from Q7, write \(F(x)\) in modified partial fraction form (you may assume \(a_2 = 1\)).

> **Answer:**
> $$\frac{F(x)}{x} = \frac{2}{x} + \frac{1}{x+3}$$
> Multiply both sides by \(x\):
> $$F(x) = 2 + \frac{x}{x+3}$$
> This is the modified partial fraction form.

---

**Q9. (Multiple Choice)**
Which of the following correctly describes the modified partial fraction form?

- A) \(\dfrac{k}{x - \lambda}\)
- B) \(\dfrac{kx}{x - \lambda}\)
- C) \(\dfrac{k}{x^2 - \lambda}\)
- D) \(\dfrac{k \lambda}{x - \lambda}\)

> **Answer: B** — The defining feature is \(x\) in the numerator alongside the constant \(k\).

---

**Q10. (Multiple Choice)**
The modified partial fraction method works because dividing \(F(x)\) by \(x\) introduces \(x\) into the denominator, and then after expanding and multiplying by \(x\):

- A) The \(x\) disappears from all terms
- B) Each term gains an \(x\) in the numerator, giving the desired form
- C) The poles of \(F(x)\) change location
- D) The degree of the numerator increases by 2

> **Answer: B** — Multiplying each \(\dfrac{a_i}{x - \lambda_i}\) by \(x\) gives \(\dfrac{a_i \, x}{x - \lambda_i}\), which is exactly the modified form needed for z-transform work.