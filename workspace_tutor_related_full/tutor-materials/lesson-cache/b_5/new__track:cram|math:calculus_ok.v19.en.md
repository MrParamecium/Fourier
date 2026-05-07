# Section B.5: Partial Fraction Expansion

---

## Page 1: Section Overview — What Is Partial Fraction Expansion and Why Do We Care?

Welcome to one of the most practically useful algebraic techniques in signal processing! Let's start with the big picture before diving into the details.

---

### 🎯 What's the Goal?

Imagine you have a complicated rational function (a fraction where both the top and bottom are polynomials) like:

$$F(x) = \frac{2x^2 + 9x - 11}{(x+1)(x-2)(x+3)}$$

This is hard to work with directly — especially when you need to find inverse Laplace transforms or inverse Z-transforms later in your studies. **Partial fraction expansion** breaks this one messy fraction into a *sum of simpler fractions*:

$$F(x) = \frac{3}{x+1} + \frac{1}{x-2} - \frac{2}{x+3}$$

Much nicer! Each piece is easy to handle individually.

---

### 📋 What You'll Learn in This Section

This section covers **five methods and special cases**, building from simple to complex:

| Subsection | Topic |
|---|---|
| B.5-1 | Method of Clearing Fractions |
| B.5-2 | Heaviside "Cover-Up" Method (distinct & complex factors) |
| B.5-3 | Repeated Factors of Q(x) |
| B.5-4 | Combination of Heaviside + Clearing Fractions |
| B.5-5 | Improper F(x) when m = n |
| B.5-6 | Modified Partial Fractions |

---

### 🔑 One Important Prerequisite: Proper vs. Improper

Before expanding into partial fractions, you need to check whether your function is **proper** or **improper**.

- **Proper:** degree of numerator < degree of denominator → ready to expand directly
- **Improper:** degree of numerator ≥ degree of denominator → you must do polynomial long division *first*, then expand the remainder

> **Special case:** When the degrees are *equal* (m = n), there's a neat shortcut we'll cover in B.5-5.

---

### 🗺️ Road Map for This Section

Think of partial fraction expansion like a decision tree:

```
Is F(x) proper?
    ├── No (m > n) → Do long division first, then expand remainder
    └── Yes (or m = n) → Proceed to expansion
            ├── All factors distinct? → Heaviside Cover-Up (B.5-2)
            ├── Repeated factors? → Modified Heaviside + derivatives (B.5-3)
            └── Complex factors? → Cover-up still works! (B.5-2)
```

Let's go through each method carefully, one at a time.

---

## Page 2: B.5-1 — The Method of Clearing Fractions

### The Most Straightforward (But Slowest) Method

This method works for **every situation** — no exceptions. It's not always the fastest, but understanding it builds the foundation for everything else.

---

### 🧠 The Core Idea

1. Write F(x) as a sum of partial fractions with **unknown coefficients** (k₁, k₂, k₃, ...)
2. **Multiply both sides** by the full denominator to "clear" all fractions
3. **Expand** the right-hand side and collect terms by powers of x
4. **Match coefficients** of equal powers on both sides
5. **Solve** the resulting system of equations

---

### 📝 Worked Example (Example B.8)

Expand:

$$F(x) = \frac{x^3 + 3x^2 + 4x + 6}{(x+1)(x+2)(x+3)^2}$$

**Step 1: Set up the partial fraction form.**

Notice the denominator has factors: \((x+1)\), \((x+2)\), \((x+3)\), and \((x+3)^2\).

> ⚠️ **Key rule:** A repeated factor \((x+3)^2\) contributes *two* partial fraction terms — one for each power.

$$F(x) = \frac{k_1}{x+1} + \frac{k_2}{x+2} + \frac{k_3}{x+3} + \frac{k_4}{(x+3)^2}$$

**Step 2: Clear fractions** — multiply both sides by \((x+1)(x+2)(x+3)^2\):

$$x^3 + 3x^2 + 4x + 6 = k_1(x+2)(x+3)^2 + k_2(x+1)(x+3)^2 + k_3(x+1)(x+2)(x+3) + k_4(x+1)(x+2)$$

**Step 3: Expand and collect by powers of x:**

$$= x^3(k_1+k_2+k_3) + x^2(8k_1+7k_2+6k_3+k_4) + x(21k_1+15k_2+11k_3+3k_4) + (18k_1+9k_2+6k_3+2k_4)$$

**Step 4: Match coefficients** (left side vs. right side):

| Power | Left side | Right side |
|---|---|---|
| \(x^3\) | 1 | \(k_1 + k_2 + k_3\) |
| \(x^2\) | 3 | \(8k_1 + 7k_2 + 6k_3 + k_4\) |
| \(x^1\) | 4 | \(21k_1 + 15k_2 + 11k_3 + 3k_4\) |
| \(x^0\) | 6 | \(18k_1 + 9k_2 + 6k_3 + 2k_4\) |

**Step 5: Solve the system:**

$$k_1 = 1, \quad k_2 = -2, \quad k_3 = 2, \quad k_4 = -3$$

**Final answer:**

$$\boxed{F(x) = \frac{1}{x+1} - \frac{2}{x+2} + \frac{2}{x+3} - \frac{3}{(x+3)^2}}$$

---

### ✅ Pros and Cons

| ✅ Pros | ❌ Cons |
|---|---|
| Works for every case | Lots of algebra |
| No special tricks needed | Solving large systems is tedious |
| Easy to understand | Slow for high-degree polynomials |

> 💡 **Bottom line:** Use this method when you're stuck or want to double-check. But the methods coming up next are much faster!

---

## Page 3: B.5-2 — The Heaviside "Cover-Up" Method (Distinct Real Factors)

### The Fast Lane for Distinct Factors

This is the method you'll use most often. It's elegant, quick, and almost feels like magic once you get the hang of it.

---

### 🧠 The Core Formula

For a proper function with **all distinct factors**:

$$F(x) = \frac{P(x)}{(x-\lambda_1)(x-\lambda_2)\cdots(x-\lambda_n)} = \frac{k_1}{x-\lambda_1} + \frac{k_2}{x-\lambda_2} + \cdots + \frac{k_n}{x-\lambda_n}$$

Each coefficient is found by:

$$\boxed{k_r = (x - \lambda_r) \cdot F(x)\Big|_{x = \lambda_r}}$$

In plain English: **cover up the factor** \((x - \lambda_r)\) in the denominator of F(x), then plug in \(x = \lambda_r\) to what's left.

---

### 🖐️ Why Does "Cover-Up" Work?

Multiply both sides of the partial fraction equation by \((x - \lambda_1)\):

$$(x-\lambda_1)F(x) = k_1 + \frac{k_2(x-\lambda_1)}{x-\lambda_2} + \cdots + \frac{k_n(x-\lambda_1)}{x-\lambda_n}$$

Now let \(x = \lambda_1\). Every term on the right **except \(k_1\)** has a factor \((x - \lambda_1)\) in the numerator, so they all go to zero. You're left with just \(k_1\). 

---

### 📝 Worked Example (Example B.9)

Expand:

$$F(x) = \frac{2x^2 + 9x - 11}{(x+1)(x-2)(x+3)} = \frac{k_1}{x+1} + \frac{k_2}{x-2} + \frac{k_3}{x+3}$$

**Finding k₁:** Cover up \((x+1)\), substitute \(x = -1\):

$$k_1 = \frac{2(-1)^2 + 9(-1) - 11}{(-1-2)(-1+3)} = \frac{2 - 9 - 11}{(-3)(2)} = \frac{-18}{-6} = 3$$

**Finding k₂:** Cover up \((x-2)\), substitute \(x = 2\):

$$k_2 = \frac{2(4) + 9(2) - 11}{(2+1)(2+3)} = \frac{8 + 18 - 11}{(3)(5)} = \frac{15}{15} = 1$$

**Finding k₃:** Cover up \((x+3)\), substitute \(x = -3\):

$$k_3 = \frac{2(9) + 9(-3) - 11}{(-3+1)(-3-2)} = \frac{18 - 27 - 11}{(-2)(-5)} = \frac{-20}{10} = -2$$

**Final answer:**

$$\boxed{F(x) = \frac{3}{x+1} + \frac{1}{x-2} - \frac{2}{x+3}}$$

---

### 🎯 Step-by-Step Summary

```
For each factor (x - λᵣ):
  1. Mentally "cover" that factor in the denominator
  2. Substitute x = λᵣ into everything that's left
  3. That's your coefficient kᵣ
```

> 💡 **This method is also called the "method of residues"** — you'll see this name again in complex analysis and Laplace transform theory.

---

## Page 4: B.5-2 (Continued) — Complex Factors and Quadratic Forms

### When the Denominator Has Complex Roots

The cover-up method works perfectly even when the factors of Q(x) are **complex numbers**. Let's see how.

---

### 📝 Example with Complex Factors

Consider:

$$F(x) = \frac{4x^2 + 2x + 18}{(x+1)(x^2 + 4x + 13)}$$

First, factor the quadratic: \(x^2 + 4x + 13 = (x + 2 - j3)(x + 2 + j3)\)

So:

$$F(x) = \frac{k_1}{x+1} + \frac{k_2}{x+2-j3} + \frac{k_3}{x+2+j3}$$

**Finding k₁** (cover up \((x+1)\), let \(x = -1\)):

$$k_1 = \frac{4(1) + 2(-1) + 18}{(-1)^2 + 4(-1) + 13} = \frac{4 - 2 + 18}{1 - 4 + 13} = \frac{20}{10} = 2$$

**Finding k₂** (cover up \((x+2-j3)\), let \(x = -2+j3\)):

$$k_2 = 1 + j2 = \sqrt{5}\, e^{j63.43°}$$

**Finding k₃:** Since the function has real coefficients, \(k_3 = k_2^* = 1 - j2 = \sqrt{5}\, e^{-j63.43°}\)

> 🔑 **Important shortcut:** For real-coefficient functions, complex-conjugate factors always give **conjugate coefficients**. You only need to compute one of them!

---

### 🔲 Combining Complex Pairs into a Real Quadratic Form

Working with complex numbers can be messy. Often it's cleaner to keep the quadratic factor intact and write:

$$F(x) = \frac{k_1}{x+1} + \frac{c_1 x + c_2}{x^2 + 4x + 13}$$

We already know \(k_1 = 2\), so:

$$\frac{4x^2 + 2x + 18}{(x+1)(x^2+4x+13)} = \frac{2}{x+1} + \frac{c_1 x + c_2}{x^2+4x+13}$$

**Method 1: Clear fractions** and match coefficients → gives \(c_1 = 2\), \(c_2 = -8\)

**Method 2: Shortcuts** (faster!)

- **To find c₂:** Let \(x = 0\) on both sides:

$$\frac{18}{13} = \frac{2}{1} + \frac{c_2}{13} \implies c_2 = 18 - 26 = -8$$

- **To find c₁:** Multiply both sides by \(x\), then let \(x \to \infty\) (only highest-power terms survive):

$$4 = 2 + c_1 \implies c_1 = 2$$

**Final answer:**

$$\boxed{F(x) = \frac{2}{x+1} + \frac{2x-8}{x^2+4x+13}}$$

---

### 💡 The "Let x → ∞" Trick Explained

When you multiply both sides by \(x\) and let \(x \to \infty\), only the **leading terms** of each fraction survive. Specifically:

$$\frac{c_1 x^2}{x^2} \to c_1 \quad \text{and} \quad \frac{2x}{x} \to 2$$

This is a powerful shortcut to isolate the coefficient of the highest-power term in the numerator.

---

### 📌 General Rule for Quadratic Numerators

When you have an irreducible quadratic factor \(x^2 + bx + c\) in the denominator, the corresponding partial fraction term has a **linear numerator** \(c_1 x + c_2\) — not just a constant. Don't forget this!

---

## Page 5: B.5-3 — Repeated Factors of Q(x)

### When the Same Factor Appears More Than Once

If your denominator has a **repeated factor** like \((x+3)^2\) or \((x-1)^3\), the cover-up method needs a small but important extension.

---

### 📐 The General Setup

For a function with a repeated factor \((x - \lambda)^r\):

$$F(x) = \frac{P(x)}{(x-\lambda)^r (x-\alpha_1)(x-\alpha_2)\cdots(x-\alpha_j)}$$

The partial fraction expansion is:

$$F(x) = \underbrace{\frac{a_0}{(x-\lambda)^r} + \frac{a_1}{(x-\lambda)^{r-1}} + \cdots + \frac{a_{r-1}}{x-\lambda}}_{\text{terms from repeated factor}} + \underbrace{\frac{k_1}{x-\alpha_1} + \cdots + \frac{k_j}{x-\alpha_j}}_{\text{terms from distinct factors}}$$

---

### 🔑 How to Find the Coefficients

**For the distinct factors** \(k_1, k_2, \ldots, k_j\): Use the regular Heaviside cover-up method as before.

**For the repeated-factor coefficients** \(a_0, a_1, \ldots, a_{r-1}\): Use this formula:

$$\boxed{a_j = \frac{1}{j!} \frac{d^j}{dx^j}\left[(x-\lambda)^r F(x)\right]\Bigg|_{x=\lambda}}$$

In plain English:
- **\(a_0\):** Cover up \((x-\lambda)^r\), substitute \(x = \lambda\) → same as regular cover-up
- **\(a_1\):** Cover up \((x-\lambda)^r\), take the **1st derivative**, substitute \(x = \lambda\)
- **\(a_2\):** Cover up \((x-\lambda)^r\), take the **2nd derivative**, divide by \(2!\), substitute \(x = \lambda\)
- And so on...

---

### 📝 Worked Example (Example B.10)

Expand:

$$F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)}$$

**Set up:**

$$F(x) = \frac{a_0}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{k}{x+2}$$

**Finding k** (cover up \((x+2)\), let \(x = -2\)):

$$k = \frac{4(-8) + 16(4) + 23(-2) + 13}{(-2+1)^3} = \frac{-32+64-46+13}{(-1)^3} = \frac{-1}{-1} = 1$$

**Finding a₀** (cover up \((x+1)^3\), let \(x = -1\)):

$$a_0 = \frac{4(-1) + 16(1) + 23(-1) + 13}{(-1+2)} = \frac{-4+16-23+13}{1} = \frac{2}{1} = 2$$

**Finding a₁** (cover up \((x+1)^3\), differentiate, let \(x = -1\)):

Let \(g(x) = \frac{4x^3 + 16x^2 + 23x + 13}{x+2}\)

$$g'(x) = \frac{(12x^2+32x+23)(x+2) - (4x^3+16x^2+23x+13)}{(x+2)^2}$$

$$a_1 = g'(-1) = \frac{(12-32+23)(1) - (-4+16-23+13)}{1} = \frac{3 - 2}{1} = 1$$

**Finding a₂** (cover up \((x+1)^3\), take 2nd derivative, divide by 2!, let \(x = -1\)):

$$a_2 = \frac{1}{2!}g''(-1) = 3$$

**Final answer:**

$$\boxed{F(x) = \frac{2}{(x+1)^3} + \frac{1}{(x+1)^2} + \frac{3}{x+1} + \frac{1}{x+2}}$$