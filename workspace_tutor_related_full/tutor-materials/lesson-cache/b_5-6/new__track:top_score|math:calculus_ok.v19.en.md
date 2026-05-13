# B.5-6 Modified Partial Fractions

---

## Page 1: Section Overview — What Is This About and Why Do We Care?

Welcome! In this section, we're going to learn a neat little trick called **Modified Partial Fractions**.

### The Big Picture

You already know how to do regular partial fraction expansion — breaking a complicated fraction into simpler pieces. That's great for many problems.

But here's the thing: when we work with **z-transforms** (a major tool in digital signal processing, covered in Chapter 5), we need our partial fractions to look a specific way. Instead of pieces like:

$$\frac{k}{x - \lambda_i}$$

we need pieces that look like:

$$\frac{kx}{x - \lambda_i}$$

Notice the difference? There's an **extra \(x\) in the numerator**. That small change makes a big difference when we're trying to invert z-transforms.

### The Core Trick

The method is beautifully simple:

> **Divide \(F(x)\) by \(x\) first, expand into partial fractions, then multiply everything back by \(x\).**

That's it! Three steps. Let's break it all down carefully so you feel totally comfortable with it.

### What You'll Learn on Each Page

| Page | Topic |
|------|-------|
| 2 | Why we need this modified form |
| 3 | Step-by-step walkthrough of the method |
| 4 | Computing the coefficients |
| 5 | Multiplying back to get the final answer |
| 6 | Recap & Summary |
| 7 | Quiz |

---

## Page 2: Why Do We Need This Modified Form?

### Regular Partial Fractions — A Quick Reminder

In standard partial fraction expansion, we break something like:

$$F(x) = \frac{3x^2 + 9x - 20}{(x-2)(x+3)}$$

into simpler pieces:

$$F(x) = 3 + \frac{2}{x-2} + \frac{4}{x+3}$$

Each piece has the form \(\dfrac{k}{x - \lambda_i}\). This works perfectly for **Laplace transforms** and many other applications.

### The Problem with Z-Transforms

When working with **z-transforms**, the inverse transform formulas are built around expressions like:

$$\frac{kx}{x - \lambda_i} \quad \text{or} \quad \frac{kx}{(x - \lambda_i)^r}$$

If your partial fractions don't have that \(x\) on top, you can't directly apply the inverse z-transform table. You'd be stuck.

### A Concrete Example of the Difference

| Regular Form | Modified Form |
|---|---|
| \(\dfrac{k}{x-2}\) | \(\dfrac{kx}{x-2}\) |
| \(\dfrac{k}{(x+3)^2}\) | \(\dfrac{kx}{(x+3)^2}\) |

The modified form is what we **need** for z-transform work. So we need a reliable way to get there.

### The Key Insight 💡

Here's the clever observation:

$$\frac{kx}{x - \lambda_i} = x \cdot \frac{k}{x - \lambda_i}$$

So if we can expand \(\dfrac{F(x)}{x}\) into regular partial fractions (getting terms like \(\dfrac{k}{x - \lambda_i}\)), then multiplying everything by \(x\) gives us exactly the modified form we want!

This is the entire idea. Now let's see it in action.

---

## Page 3: The Method — Step by Step

### Our Example Function

Let's work through the textbook example carefully. We have:

$$F(x) = \frac{5x^2 + 20x + 18}{(x+2)(x+3)^2}$$

We want to express this as a sum of terms with \(x\) in the numerator.

---

### Step 1: Divide Both Sides by \(x\)

Take \(F(x)\) and divide the whole thing by \(x\):

$$\frac{F(x)}{x} = \frac{5x^2 + 20x + 18}{x(x+2)(x+3)^2}$$

Notice what happened to the denominator — we just **added an \(x\) factor** to it. The numerator stays the same.

---

### Step 2: Set Up the Partial Fraction Expansion

Now expand \(\dfrac{F(x)}{x}\) into partial fractions **as you normally would**.

The denominator \(x(x+2)(x+3)^2\) has:
- A simple factor: \(x\)
- A simple factor: \((x+2)\)
- A **repeated** factor: \((x+3)^2\)

So the partial fraction setup is:

$$\frac{F(x)}{x} = \frac{5x^2 + 20x + 18}{x(x+2)(x+3)^2} = \frac{a_1}{x} + \frac{a_2}{x+2} + \frac{a_3}{x+3} + \frac{a_4}{(x+3)^2}$$

> **Remember:** A repeated factor \((x+3)^2\) gives you **two** terms: one for \((x+3)\) and one for \((x+3)^2\).

---

### Step 3: Find the Coefficients

We need to find \(a_1\), \(a_2\), \(a_3\), and \(a_4\). We'll do this on the next page.

---

### Step 4: Multiply Back by \(x\)

Once we have the partial fractions for \(\dfrac{F(x)}{x}\), multiply everything by \(x\) to recover \(F(x)\) in modified form.

---

## Page 4: Computing the Coefficients

### The Setup (Repeated from Before)

$$\frac{5x^2 + 20x + 18}{x(x+2)(x+3)^2} = \frac{a_1}{x} + \frac{a_2}{x+2} + \frac{a_3}{x+3} + \frac{a_4}{(x+3)^2}$$

We use the **cover-up method** for simple poles and a bit more work for repeated poles.

---

### Finding \(a_1\) — Cover up \(x\), set \(x = 0\)

$$a_1 = \left. \frac{5x^2 + 20x + 18}{(x+2)(x+3)^2} \right|_{x=0} = \frac{0 + 0 + 18}{(2)(3)^2} = \frac{18}{18} = 1$$

✅ \(a_1 = 1\)

---

### Finding \(a_2\) — Cover up \((x+2)\), set \(x = -2\)

$$a_2 = \left. \frac{5x^2 + 20x + 18}{x(x+3)^2} \right|_{x=-2} = \frac{5(4) + 20(-2) + 18}{(-2)(-2+3)^2} = \frac{20 - 40 + 18}{(-2)(1)} = \frac{-2}{-2} = 1$$

✅ \(a_2 = 1\)

---

### Finding \(a_4\) — Cover up \((x+3)^2\), set \(x = -3\)

For the **highest power** of the repeated factor, the cover-up method still works directly:

$$a_4 = \left. \frac{5x^2 + 20x + 18}{x(x+2)} \right|_{x=-3} = \frac{5(9) + 20(-3) + 18}{(-3)(-3+2)} = \frac{45 - 60 + 18}{(-3)(-1)} = \frac{3}{3} = 1$$

✅ \(a_4 = 1\)

---

### Finding \(a_3\) — Use Substitution

For the lower-power repeated term, we substitute any convenient value of \(x\) (now that we know \(a_1\), \(a_2\), \(a_4\)). Let's use \(x = 1\):

Left side: \(\dfrac{5 + 20 + 18}{(1)(3)(4)^2} = \dfrac{43}{48}\)

Right side: \(\dfrac{1}{1} + \dfrac{1}{3} + \dfrac{a_3}{4} + \dfrac{1}{16}\)

$$\frac{43}{48} = 1 + \frac{1}{3} + \frac{a_3}{4} + \frac{1}{16}$$

Solving: \(a_3 = -2\) ✅

---

### Summary of Coefficients

$$\frac{F(x)}{x} = \frac{1}{x} + \frac{1}{x+2} - \frac{2}{x+3} + \frac{1}{(x+3)^2}$$

---

## Page 5: Multiplying Back — The Final Answer

### Where We Are

We found:

$$\frac{F(x)}{x} = \frac{1}{x} + \frac{1}{x+2} - \frac{2}{x+3} + \frac{1}{(x+3)^2}$$

### Step: Multiply Both Sides by \(x\)

Multiply every single term on both sides by \(x\):

$$F(x) = x \cdot \frac{1}{x} + x \cdot \frac{1}{x+2} - x \cdot \frac{2}{x+3} + x \cdot \frac{1}{(x+3)^2}$$

Simplify each term:

$$\boxed{F(x) = 1 + \frac{x}{x+2} - \frac{2x}{x+3} + \frac{x}{(x+3)^2}}$$

### Let's Check the Forms

| Term | Form | Modified? |
|------|------|-----------|
| \(1\) | constant | ✅ (fine as-is) |
| \(\dfrac{x}{x+2}\) | \(\dfrac{kx}{x-\lambda}\) with \(k=1, \lambda=-2\) | ✅ |
| \(\dfrac{-2x}{x+3}\) | \(\dfrac{kx}{x-\lambda}\) with \(k=-2, \lambda=-3\) | ✅ |
| \(\dfrac{x}{(x+3)^2}\) | \(\dfrac{kx}{(x-\lambda)^2}\) with \(k=1, \lambda=-3\) | ✅ |

Every term is now in the **modified partial fraction form** — perfect for inverse z-transform lookup!

### Why Does the First Term Become Just "1"?

Notice: \(x \cdot \dfrac{a_1}{x} = a_1 = 1\). The \(x\)'s cancel, leaving a plain constant. That's totally fine — a constant is a valid term in the expansion.

### The Big Picture — What We Did

```
F(x)          Divide by x        Partial fractions        Multiply by x
─────   →   ──────────────   →   ─────────────────   →   ──────────────
            F(x)/x expanded      a₁/x + a₂/(x+2)...      Modified form!
```

---

## Page 6: Recap & Summary

### What Is Modified Partial Fraction Expansion?

It's a variation of the standard partial fraction method that produces terms of the form:

$$\frac{kx}{(x - \lambda_i)^r}$$

instead of the usual \(\dfrac{k}{(x-\lambda_i)^r}\).

---

### Why Do We Need It?

For **inverse z-transform** calculations, the transform tables are built around expressions with \(x\) in the numerator. Without this modification, you can't directly use those tables.

---

### The Three-Step Method

| Step | Action | What You Get |
|------|--------|--------------|
| **1** | Divide \(F(x)\) by \(x\) | \(\dfrac{F(x)}{x}\) with an extra \(x\) in denominator |
| **2** | Expand \(\dfrac{F(x)}{x}\) into regular partial fractions | Coefficients \(a_1, a_2, \ldots\) |
| **3** | Multiply everything back by \(x\) | Modified partial fractions ✅ |

---

### Key Rules to Remember

> 📌 **Rule 1:** Dividing by \(x\) adds a new simple pole at \(x = 0\) in the denominator.

> 📌 **Rule 2:** A repeated factor \((x - \lambda)^r\) always generates \(r\) separate terms in the expansion.

> 📌 **Rule 3:** After multiplying back by \(x\), the term \(\dfrac{a_1}{x}\) becomes just the constant \(a_1\).

> 📌 **Rule 4:** Use the cover-up method for simple poles and the highest-power repeated pole. Use substitution for lower-power repeated poles.

---

### Quick Formula Reference

$$F(x) = \frac{N(x)}{D(x)} \xrightarrow{\div x} \frac{F(x)}{x} = \frac{N(x)}{x \cdot D(x)} \xrightarrow{\text{PFE}} \sum_i \frac{a_i}{\text{factors}} \xrightarrow{\times x} \sum_i \frac{a_i \cdot x}{\text{factors}}$$

---

### Common Mistakes to Avoid ⚠️

| Mistake | Correction |
|---------|------------|
| Forgetting to add the \(x\) factor in the denominator | Always write \(x \cdot D(x)\) after dividing |
| Missing a term for repeated factors | \((x+3)^2\) needs **both** \(\frac{a}{x+3}\) and \(\frac{b}{(x+3)^2}\) |
| Forgetting to multiply back by \(x\) at the end | Every term gets multiplied by \(x\) |
| Thinking \(x \cdot \frac{a_1}{x}\) is still a fraction | It simplifies to just \(a_1\) |

---

## Page 7: Quiz Plan (Exam-Oriented)

### 📝 Quiz Plan — B.5-6 Modified Partial Fractions

---

**Q1. (Multiple Choice) — Conceptual**

Why do we use modified partial fractions instead of standard partial fractions in z-transform problems?

- A) Because standard partial fractions don't work for polynomials
- B) Because inverse z-transform tables require terms of the form \(\dfrac{kx}{x - \lambda_i}\)
- C) Because dividing by \(x\) makes the algebra easier
- D) Because modified partial fractions always have fewer terms

> ✅ **Answer: B** — The inverse z-transform tables are specifically built around terms with \(x\) in the numerator.

---

**Q2. (Multiple Choice) — Procedure**

To find the modified partial fraction expansion of \(F(x)\), what is the correct **first step**?

- A) Multiply \(F(x)\) by \(x\)
- B) Factor the numerator of \(F(x)\)
- C) Divide \(F(x)\) by \(x\) to form \(\dfrac{F(x)}{x}\)
- D) Set \(x = 0\) in \(F(x)\)

> ✅ **Answer: C** — The method begins by forming \(F(x)/x\), then expanding that into standard partial fractions.

---

**Q3. (Multiple Choice) — Setup**

Given \(F(x) = \dfrac{5x^2 + 20x + 18}{(x+2)(x+3)^2}\), what does \(\dfrac{F(x)}{x}\) look like?

- A) \(\dfrac{5x^2 + 20x + 18}{(x+2)(x+3)^2}\)
- B) \(\dfrac{5x^2 + 20x + 18}{x(x+2)(x+3)^2}\)
- C) \(\dfrac{x(5x^2 + 20x + 18)}{(x+2)(x+3)^2}\)
- D) \(\dfrac{5x^2 + 20x + 18}{x^2(x+2)(x+3)^2}\)

> ✅ **Answer: B** — Dividing by \(x\) places an \(x\) in the denominator only.

---

**Q4. (Multiple Choice) — Partial Fraction Setup**

For the expansion of \(\dfrac{F(x)}{x} = \dfrac{5x^2+20x+18}{x(x+2)(x+3)^2}\), how many unknown coefficients are needed?

- A) 2
- B) 3
- C) 4
- D) 5

> ✅ **Answer: C** — One for each factor: \(x\), \((x+2)\), \((x+3)\), and \((x+3)^2\) → four coefficients \(a_1, a_2, a_3, a_4\).

---

**Q5. (Multiple Choice) — Coefficient Calculation**

Using the cover-up method, what is \(a_1\) in the expansion of \(\dfrac{5x^2+20x+18}{x(x+2)(x+3)^2}\)?

- A) \(a_1 = 0\)
- B) \(a_1 = 1\)
- C) \(a_1 = 2\)
- D) \(a_1 = 18\)

> ✅ **Answer: B** — Cover \(x\), set \(x=0\): \(\dfrac{18}{(2)(9)} = \dfrac{18}{18} = 1\).

---

**Q6. (Multiple Choice) — Final Form**

After multiplying \(\dfrac{F(x)}{x} = \dfrac{1}{x} + \dfrac{1}{x+2} - \dfrac{2}{x+3} + \dfrac{1}{(x+3)^2}\) back by \(x\), what does the term \(x \cdot \dfrac{1}{x}\) become?

- A) \(\dfrac{1}{x}\)
- B) \(x\)
- C) \(1\)
- D) \(0\)

> ✅ **Answer: C** — The \(x\)'s cancel: \(x \cdot \dfrac{1}{x} = 1\).

---

**Q7. (Multiple Choice) — Identifying Modified Form**

Which of the following is in the correct **modified** partial fraction form?

- A) \(\dfrac{3}{x+5}\)
- B) \(\dfrac{3x}{x+5}\)
- C) \(\dfrac{3}{x^2+5}\)
- D) \(\dfrac{3}{x(x+5)}\)

> ✅ **Answer: B** — Modified partial fractions have \(x\) in the numerator: \(\dfrac{kx}{x - \lambda}\).

---

**Q8. (Short Answer) — Full Procedure**

Given:

$$F(x) = \frac{2x + 6}{x(x+1)}$$

**(a)** Write out the partial fraction expansion of \(\dfrac{F(x)}{x}\).

**(b)** Find all coefficients.

**(c)** Write the final modified partial fraction form of \(F(x)\).

> ✅ **Outline Answer:**
>
> **(a)** $\dfrac{F(x)}{x} = \dfrac{2x+6}{