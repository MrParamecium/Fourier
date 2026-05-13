# Section B.5: Partial Fraction Expansion

---

## Page 1: Section Overview — What Is Partial Fraction Expansion and Why Do We Care?

Welcome to one of the most **practically useful** mathematical tools in signal processing! Partial fraction expansion (also called partial fraction decomposition) is a technique for breaking a complicated rational function into a sum of simpler pieces.

### What's a Rational Function?

A **rational function** is simply a fraction where both the top (numerator) and bottom (denominator) are polynomials:

$$F(x) = \frac{P(x)}{Q(x)}$$

For example:

$$F(x) = \frac{2x^2 + 9x - 11}{(x+1)(x-2)(x+3)}$$

### Why Break It Apart?

In signal processing, you'll constantly need to find **inverse Laplace transforms** or **inverse Z-transforms**. These transforms have tables of known pairs — but the tables only list *simple* fractions like \(\frac{1}{x+a}\), not complicated ones. Partial fractions let you rewrite a messy function as a sum of those simple, table-friendly pieces.

### The Big Picture: What Methods Will We Learn?

This section covers **five methods** (or situations):

| Method / Situation | When to Use It |
|---|---|
| **B.5-1** Clearing Fractions | Always works; good for small problems |
| **B.5-2** Heaviside "Cover-Up" | Fast for distinct (non-repeated) factors |
| **B.5-3** Repeated Factors | When the denominator has repeated roots |
| **B.5-4** Hybrid Method | Combines cover-up + clearing for efficiency |
| **B.5-5** Improper Functions (m = n) | When numerator degree equals denominator degree |
| **B.5-6** Modified Partial Fractions | Special form needed for inverse Z-transforms |

### One Key Prerequisite: Proper vs. Improper

Before expanding, check if your function is **proper** (degree of numerator < degree of denominator). If it's not, you need to do polynomial long division first to extract a polynomial part, then expand the leftover proper fraction. We saw this at the very start of the section:

$$F(x) = \frac{2x^3 + 9x^2 + 11x + 2}{x^2 + 4x + 3} = \underbrace{2x+1}_{\text{polynomial}} + \underbrace{\frac{x-1}{x^2+4x+3}}_{\text{proper fraction}}$$

Only the proper fraction part gets expanded into partial fractions.

---

## Page 2: B.5-1 — The Method of Clearing Fractions

### The Core Idea

This is the **most straightforward** method. The strategy is:

1. Write out the partial fraction form with **unknown coefficients** (like \(k_1, k_2, \ldots\))
2. Multiply both sides by the full denominator to **clear all fractions**
3. **Expand** the right-hand side and collect terms by power of \(x\)
4. **Match coefficients** of equal powers on both sides
5. **Solve** the resulting system of equations

### Worked Example (Example B.8)

Expand:

$$F(x) = \frac{x^3 + 3x^2 + 4x + 6}{(x+1)(x+2)(x+3)^2}$$

**Step 1: Write the partial fraction form.**

The denominator has factors \((x+1)\), \((x+2)\), \((x+3)\), and \((x+3)^2\). Each gets its own term:

$$F(x) = \frac{k_1}{x+1} + \frac{k_2}{x+2} + \frac{k_3}{x+3} + \frac{k_4}{(x+3)^2}$$

> 💡 **Why does \((x+3)^2\) get TWO terms?** Because it's a repeated factor. We need one term for each power: \((x+3)^1\) and \((x+3)^2\). More on this in B.5-3!

**Step 2: Multiply both sides by \((x+1)(x+2)(x+3)^2\).**

After expanding everything carefully:

$$x^3 + 3x^2 + 4x + 6 = x^3(k_1+k_2+k_3) + x^2(8k_1+7k_2+6k_3+k_4)$$
$$+ x(21k_1+15k_2+11k_3+3k_4) + (18k_1+9k_2+6k_3+2k_4)$$

**Step 3: Match coefficients of each power of \(x\).**

| Power | Left side | Right side |
|---|---|---|
| \(x^3\) | \(1\) | \(k_1 + k_2 + k_3\) |
| \(x^2\) | \(3\) | \(8k_1 + 7k_2 + 6k_3 + k_4\) |
| \(x^1\) | \(4\) | \(21k_1 + 15k_2 + 11k_3 + 3k_4\) |
| \(x^0\) | \(6\) | \(18k_1 + 9k_2 + 6k_3 + 2k_4\) |

**Step 4: Solve the system.**

$$k_1 = 1, \quad k_2 = -2, \quad k_3 = 2, \quad k_4 = -3$$

**Final Answer:**

$$F(x) = \frac{1}{x+1} - \frac{2}{x+2} + \frac{2}{x+3} - \frac{3}{(x+3)^2}$$

### Pros and Cons

| ✅ Pros | ❌ Cons |
|---|---|
| Works for *every* situation | Can require solving large systems of equations |
| Systematic and reliable | Gets tedious for high-degree polynomials |

---

## Page 3: B.5-2 — The Heaviside "Cover-Up" Method (Distinct Real Factors)

### The Big Idea

When all factors of the denominator are **distinct** (none repeated), there's a much faster method. Instead of solving a system of equations, you can find each coefficient **one at a time** with a simple substitution.

### The Formula

For a proper function with distinct factors:

$$F(x) = \frac{P(x)}{(x-\lambda_1)(x-\lambda_2)\cdots(x-\lambda_n)} = \frac{k_1}{x-\lambda_1} + \frac{k_2}{x-\lambda_2} + \cdots + \frac{k_n}{x-\lambda_n}$$

Each coefficient is found by:

$$\boxed{k_r = (x - \lambda_r)\,F(x)\Big|_{x=\lambda_r}}$$

In plain English: **multiply both sides by the factor \((x - \lambda_r)\), then plug in \(x = \lambda_r\)**. All other terms vanish, leaving only \(k_r\).

### The "Cover-Up" Trick

Here's the beautiful shortcut: \((x - \lambda_r) \cdot F(x)\) is the same as \(F(x)\) with the factor \((x - \lambda_r)\) **removed from the denominator**. So you literally just:

> 🖐️ **Cover up** the factor \((x - \lambda_r)\) in the denominator with your finger, then substitute \(x = \lambda_r\) into everything that's left.

### Worked Example (Example B.9)

Expand:

$$F(x) = \frac{2x^2 + 9x - 11}{(x+1)(x-2)(x+3)} = \frac{k_1}{x+1} + \frac{k_2}{x-2} + \frac{k_3}{x+3}$$

**Finding \(k_1\):** Cover up \((x+1)\), substitute \(x = -1\):

$$k_1 = \frac{2(-1)^2 + 9(-1) - 11}{(-1-2)(-1+3)} = \frac{2 - 9 - 11}{(-3)(2)} = \frac{-18}{-6} = 3$$

**Finding \(k_2\):** Cover up \((x-2)\), substitute \(x = 2\):

$$k_2 = \frac{2(4) + 9(2) - 11}{(2+1)(2+3)} = \frac{8 + 18 - 11}{(3)(5)} = \frac{15}{15} = 1$$

**Finding \(k_3\):** Cover up \((x+3)\), substitute \(x = -3\):

$$k_3 = \frac{2(9) + 9(-3) - 11}{(-3+1)(-3-2)} = \frac{18 - 27 - 11}{(-2)(-5)} = \frac{-20}{10} = -2$$

**Final Answer:**

$$F(x) = \frac{3}{x+1} + \frac{1}{x-2} - \frac{2}{x+3}$$

### Why Does This Work? (Intuition)

Multiply both sides of the partial fraction equation by \((x - \lambda_1)\):

$$(x-\lambda_1)F(x) = k_1 + \frac{k_2(x-\lambda_1)}{x-\lambda_2} + \frac{k_3(x-\lambda_1)}{x-\lambda_3} + \cdots$$

When you set \(x = \lambda_1\), every term on the right **except \(k_1\)** has a factor \((x - \lambda_1) = 0\) in the numerator, so they all vanish. You're left with just \(k_1\). 

---

## Page 4: B.5-2 (Continued) — Complex and Quadratic Factors

### When the Denominator Has Complex Roots

The Heaviside cover-up method works **exactly the same way** even when the roots are complex numbers. The only difference is that you'll be doing arithmetic with complex numbers.

### Example with Complex Factors

$$F(x) = \frac{4x^2 + 2x + 18}{(x+1)(x^2 + 4x + 13)}$$

First, factor the quadratic: \(x^2 + 4x + 13 = (x + 2 - j3)(x + 2 + j3)\)

So:

$$F(x) = \frac{k_1}{x+1} + \frac{k_2}{x+2-j3} + \frac{k_3}{x+2+j3}$$

**Finding \(k_1\)** (cover up \((x+1)\), set \(x = -1\)):

$$k_1 = \frac{4(1) + 2(-1) + 18}{(-1)^2 + 4(-1) + 13} = \frac{4 - 2 + 18}{1 - 4 + 13} = \frac{20}{10} = 2$$

**Finding \(k_2\)** (cover up \((x+2-j3)\), set \(x = -2+j3\)):

$$k_2 = 1 + j2 = \sqrt{5}\,e^{j63.43°}$$

**Key observation:** \(k_3 = k_2^* = 1 - j2\) (the complex conjugate). This is **always true** when \(F(x)\) has real coefficients — you only need to compute one of the conjugate pair!

### The Quadratic Factor Approach (Keeping It Real)

Often it's more convenient to keep the quadratic factor intact rather than splitting into complex roots. Write:

$$F(x) = \frac{4x^2 + 2x + 18}{(x+1)(x^2+4x+13)} = \frac{k_1}{x+1} + \frac{c_1 x + c_2}{x^2+4x+13}$$

> 💡 Notice: the numerator of the quadratic term is **linear** (\(c_1 x + c_2\)), not just a constant. This is because the denominator is degree 2, so the numerator must be degree at most 1.

**Step 1:** Find \(k_1 = 2\) by cover-up as before.

**Step 2:** Clear fractions:

$$4x^2 + 2x + 18 = 2(x^2+4x+13) + (c_1 x + c_2)(x+1)$$

$$= (2+c_1)x^2 + (8+c_1+c_2)x + (26+c_2)$$

**Step 3:** Match coefficients:
- \(x^2\): \(4 = 2 + c_1 \Rightarrow c_1 = 2\)
- \(x^0\): \(18 = 26 + c_2 \Rightarrow c_2 = -8\)

**Result:**

$$F(x) = \frac{2}{x+1} + \frac{2x-8}{x^2+4x+13}$$

### Shortcuts for Finding \(c_1\) and \(c_2\)

Instead of matching all coefficients, use these two clever tricks:

**Trick 1 — Set \(x = 0\)** (eliminates \(c_1\) if the \(c_1 x\) term vanishes):

$$\frac{18}{13} = 2 + \frac{c_2}{13} \Rightarrow c_2 = -8 \checkmark$$

**Trick 2 — Multiply by \(x\), let \(x \to \infty\)** (only highest-power terms survive):

$$4 = 2 + c_1 \Rightarrow c_1 = 2 \checkmark$$

> 🎯 **Pro tip:** You can substitute *any* convenient value of \(x\) — there's nothing special about \(x=0\) or \(x \to \infty\). Choose values that make the arithmetic easiest!

---

## Page 5: B.5-3 — Repeated Factors of Q(x)

### The Problem with Repeated Roots

When the denominator has a **repeated factor** like \((x - \lambda)^r\), the cover-up method alone isn't enough. A repeated factor of order \(r\) contributes **\(r\) separate partial fraction terms**:

$$\frac{a_0}{(x-\lambda)^r} + \frac{a_1}{(x-\lambda)^{r-1}} + \cdots + \frac{a_{r-1}}{(x-\lambda)}$$

### The General Form

For:

$$F(x) = \frac{P(x)}{(x-\lambda)^r (x-\alpha_1)(x-\alpha_2)\cdots(x-\alpha_j)}$$

The expansion is:

$$F(x) = \frac{a_0}{(x-\lambda)^r} + \frac{a_1}{(x-\lambda)^{r-1}} + \cdots + \frac{a_{r-1}}{(x-\lambda)} + \frac{k_1}{x-\alpha_1} + \cdots + \frac{k_j}{x-\alpha_j}$$

### Finding the Coefficients

- **The \(k_i\) coefficients** (unrepeated factors): Use the standard Heaviside cover-up method.
- **The \(a_j\) coefficients** (repeated factor): Use this formula:

$$\boxed{a_j = \frac{1}{j!} \frac{d^j}{dx^j}\left[(x-\lambda)^r F(x)\right]\Bigg|_{x=\lambda}}$$

In plain English:
1. **Cover up** \((x-\lambda)^r\) in \(F(x)\) — call what's left \(G(x)\)
2. Take the **\(j\)-th derivative** of \(G(x)\)
3. **Substitute** \(x = \lambda\)
4. **Divide** by \(j!\)

So:
- \(a_0\): cover up \((x-\lambda)^r\), set \(x = \lambda\) (no derivative needed, \(0! = 1\))
- \(a_1\): cover up \((x-\lambda)^r\), take **1st derivative**, set \(x = \lambda\), divide by \(1! = 1\)
- \(a_2\): cover up \((x-\lambda)^r\), take **2nd derivative**, set \(x = \lambda\), divide by \(2! = 2\)

### Worked Example (Example B.10)

$$F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)}$$

**Partial fraction form:**

$$F(x) = \frac{a_0}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{k}{x+2}$$

**Finding \(k\)** (cover up \((x+2)\), set \(x = -2\)):

$$k = \frac{4(-8) + 16(4) + 23(-2) + 13}{(-2+1)^3} = \frac{-32+64-46+13}{-1} = \frac{-1}{-1} = 1$$

**Finding \(a_0\)** (cover up \((x+1)^3\), set \(x = -1\)):

$$a_0 = \frac{4(-1) + 16(1) + 23(-1) + 13}{(-1+2)} = \frac{-4+16-23+13}{1} = \frac{2}{1} = 2$$

**Finding \(a_1\)** (cover up \((x+1)^3\), differentiate \(\frac{4x^3+16x^2+23x+13}{x+2}\), set \(x=-1\)):

Let \(G(x) = \frac{4x^3+16x^2+23x+13}{x+2}\)

$$G'(x) = \frac{(12x^2+32x+23)(x+2) - (4x^3+16x^2+23x+13)}{(x+2)^2}$$

At \(x = -1\): \(G'(-1) = 1\), so \(a_1 = 1\)

**Finding \(a_2\)** (take 2nd derivative, divide by \(2!\)):

$$a_2 = \frac{1}{2}G''(-1) = 3$$

**Final Answer:**

$$F(x) = \frac{2}{(x+1)^3} + \frac{1}{(x+1)^2} + \frac{3}{x+1} + \frac{1}{x+2}$$

---

## Page 6: B.5-4 and B.5-5 — Hybrid Method and Improper Functions

### B.5-4: The Hybrid (Best-of-Both-Worlds) Approach

For functions with **both repeated and unrepeated factors**, repeated differentiation can get messy. A smarter approach: use Heaviside for the easy coefficients, then clear fractions (or use shortcuts) for the rest.

### Hybrid Method Applied to Example B.10

We already know \(k = 1\) and \(a_0 = 2\) from the cover-up method. Plug these in:

$$\frac{4x^3 +