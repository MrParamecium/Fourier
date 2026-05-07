# Section B.5: Partial Fraction Expansion

---

## Page 1: Section Overview — What Is Partial Fraction Expansion and Why Do We Care?

Welcome to Section B.5! This section is all about a powerful algebraic technique called **partial fraction expansion** (also called partial fraction decomposition). Let's start by understanding the big picture before diving into the details.

---

### The Core Idea

Imagine you have a complicated rational function — a fraction where both the numerator and denominator are polynomials. Something like:

$$F(x) = \frac{2x^2 + 9x - 11}{(x+1)(x-2)(x+3)}$$

This looks messy and hard to work with. But what if you could break it apart into simpler pieces, like:

$$F(x) = \frac{3}{x+1} + \frac{1}{x-2} - \frac{2}{x+3}$$

Each piece is simple, clean, and easy to handle. **That's exactly what partial fraction expansion does** — it splits a complicated fraction into a sum of simpler fractions.

---

### Why Is This Useful?

In signal processing and linear systems, you'll constantly encounter rational functions — especially when working with:

- **Laplace transforms** (for continuous-time systems)
- **Z-transforms** (for discrete-time systems)

To find the *inverse* of these transforms (i.e., to get back to the time domain), you need to break the function into simple pieces that you can look up in a table. Partial fractions make that possible.

---

### What You'll Learn in This Section

This section covers **four main methods** and **several special cases**:

| Topic | What It Covers |
|---|---|
| **B.5-1** Method of Clearing Fractions | The straightforward, always-works approach |
| **B.5-2** Heaviside "Cover-Up" Method | A faster, more elegant technique |
| **B.5-3** Repeated Factors | Handling denominators with repeated roots |
| **B.5-4** Hybrid Methods | Combining the best of both approaches |
| **B.5-5** Improper Functions (m = n) | When numerator degree equals denominator degree |
| **B.5-6** Modified Partial Fractions | Special form needed for inverse z-transforms |

---

### One Important Prerequisite: Proper vs. Improper Functions

Before expanding into partial fractions, you need to check whether your function is **proper** or **improper**.

- A rational function $$F(x) = \frac{P(x)}{Q(x)}$$ is **proper** if the degree of $$P(x)$$ is **less than** the degree of $$Q(x)$$
- It is **improper** if the degree of $$P(x)$$ is **greater than or equal to** the degree of $$Q(x)$$

> 💡 **Key Rule:** Partial fraction expansion only works directly on **proper** functions (or the special case where degrees are equal, covered in B.5-5). If your function is improper, you must first do **polynomial long division** to extract the polynomial part, then expand the remainder.

For example:
$$F(x) = \frac{2x^3 + 9x^2 + 11x + 2}{x^2 + 4x + 3} = \underbrace{(2x+1)}_{\text{polynomial part}} + \underbrace{\frac{x-1}{x^2+4x+3}}_{\text{proper part}}$$

Only the proper part gets expanded into partial fractions.

---

### Road Map for This Section

```
Start with F(x) = P(x)/Q(x)
        |
        ▼
Is it proper? (degree of P < degree of Q?)
   YES → Go straight to partial fractions
   NO  → Do long division first, then expand the remainder
        |
        ▼
What kind of factors does Q(x) have?
   All distinct → Heaviside Cover-Up (B.5-2)
   Repeated factors → Special repeated-root method (B.5-3)
   Complex factors → Cover-up still works! (B.5-2)
```

Let's now go through each method step by step!

---

## Page 2: B.5-1 — The Method of Clearing Fractions

### The Idea

This is the most **straightforward** method. It always works, no matter what kind of factors you have. The trade-off is that it can involve solving a system of equations, which takes more work.

Here's the strategy:
1. Write $$F(x)$$ as a sum of partial fractions with **unknown coefficients**
2. Multiply both sides by the full denominator to **clear all fractions**
3. Expand and **match coefficients** of like powers of $$x$$ on both sides
4. Solve the resulting system of equations

---

### Setting Up the Partial Fraction Form

The form of the partial fractions depends on the factors in the denominator:

| Denominator Factor | Partial Fraction Term |
|---|---|
| $$(x - a)$$ (distinct, linear) | $$\dfrac{k}{x-a}$$ |
| $$(x - a)^2$$ (repeated, order 2) | $$\dfrac{a_0}{(x-a)^2} + \dfrac{a_1}{x-a}$$ |
| $$(x - a)^r$$ (repeated, order r) | $$\dfrac{a_0}{(x-a)^r} + \dfrac{a_1}{(x-a)^{r-1}} + \cdots + \dfrac{a_{r-1}}{x-a}$$ |

> 💡 **Key insight about repeated factors:** A factor $$(x+3)^2$$ in the denominator contributes **two** partial fraction terms — one for $$(x+3)^2$$ and one for $$(x+3)$$. A factor $$(x+3)^r$$ contributes **r** terms.

---

### Worked Example (Example B.8)

Expand:
$$F(x) = \frac{x^3 + 3x^2 + 4x + 6}{(x+1)(x+2)(x+3)^2}$$

**Step 1: Set up the partial fraction form.**

The denominator has factors $$(x+1)$$, $$(x+2)$$, $$(x+3)$$, and $$(x+3)^2$$. So we write:

$$F(x) = \frac{k_1}{x+1} + \frac{k_2}{x+2} + \frac{k_3}{x+3} + \frac{k_4}{(x+3)^2}$$

**Step 2: Clear fractions** by multiplying both sides by $$(x+1)(x+2)(x+3)^2$$:

$$x^3 + 3x^2 + 4x + 6 = k_1(x+2)(x+3)^2 + k_2(x+1)(x+3)^2 + k_3(x+1)(x+2)(x+3) + k_4(x+1)(x+2)$$

**Step 3: Expand the right side** and collect by powers of $$x$$:

$$= x^3(k_1 + k_2 + k_3) + x^2(8k_1 + 7k_2 + 6k_3 + k_4) + x(21k_1 + 15k_2 + 11k_3 + 3k_4) + (18k_1 + 9k_2 + 6k_3 + 2k_4)$$

**Step 4: Match coefficients** of each power of $$x$$:

| Power | Left Side | Right Side | Equation |
|---|---|---|---|
| $$x^3$$ | 1 | $$k_1 + k_2 + k_3$$ | $$k_1 + k_2 + k_3 = 1$$ |
| $$x^2$$ | 3 | $$8k_1 + 7k_2 + 6k_3 + k_4$$ | $$8k_1 + 7k_2 + 6k_3 + k_4 = 3$$ |
| $$x^1$$ | 4 | $$21k_1 + 15k_2 + 11k_3 + 3k_4$$ | $$21k_1 + 15k_2 + 11k_3 + 3k_4 = 4$$ |
| $$x^0$$ | 6 | $$18k_1 + 9k_2 + 6k_3 + 2k_4$$ | $$18k_1 + 9k_2 + 6k_3 + 2k_4 = 6$$ |

**Step 5: Solve the system.** The solution is:

$$k_1 = 1, \quad k_2 = -2, \quad k_3 = 2, \quad k_4 = -3$$

**Final Answer:**

$$\boxed{F(x) = \frac{1}{x+1} - \frac{2}{x+2} + \frac{2}{x+3} - \frac{3}{(x+3)^2}}$$

---

### Pros and Cons

| ✅ Pros | ❌ Cons |
|---|---|
| Always works | Can require solving large systems of equations |
| Systematic and reliable | Lots of algebra — easy to make errors |
| Good for checking answers | Not the fastest method |

> 💡 **Bottom line:** This method is your safety net. When in doubt, it always works. But the next method — Heaviside — is much faster for most cases.

---

## Page 3: B.5-2 — The Heaviside "Cover-Up" Method (Distinct Real Factors)

### The Big Idea

The Heaviside cover-up method is a **clever shortcut** that lets you find each coefficient directly, without solving a system of equations. It works when all the factors of the denominator are **distinct** (none repeated).

The key formula is:

$$\boxed{k_r = (x - \lambda_r) F(x)\big|_{x = \lambda_r}}$$

In plain English: to find the coefficient $$k_r$$ for the factor $$(x - \lambda_r)$$, you:
1. **Multiply** $$F(x)$$ by $$(x - \lambda_r)$$ — which cancels that factor from the denominator
2. **Substitute** $$x = \lambda_r$$ into what's left

The "cover-up" name comes from a physical trick: you literally **cover up** (hide with your finger) the factor $$(x - \lambda_r)$$ in the denominator, then plug in $$x = \lambda_r$$.

---

### Why Does This Work?

Suppose:
$$F(x) = \frac{k_1}{x - \lambda_1} + \frac{k_2}{x - \lambda_2} + \cdots + \frac{k_n}{x - \lambda_n}$$

Multiply both sides by $$(x - \lambda_1)$$:

$$(x - \lambda_1)F(x) = k_1 + \frac{k_2(x-\lambda_1)}{x-\lambda_2} + \cdots + \frac{k_n(x-\lambda_1)}{x-\lambda_n}$$

Now let $$x = \lambda_1$$. Every term on the right **except** $$k_1$$ has a factor $$(x - \lambda_1)$$ in the numerator, so they all go to zero. You're left with:

$$(x - \lambda_1)F(x)\big|_{x=\lambda_1} = k_1$$

That's the magic! ✨

---

### Worked Example (Example B.9)

Expand:
$$F(x) = \frac{2x^2 + 9x - 11}{(x+1)(x-2)(x+3)} = \frac{k_1}{x+1} + \frac{k_2}{x-2} + \frac{k_3}{x+3}$$

---

**Finding $$k_1$$:** Cover up $$(x+1)$$, substitute $$x = -1$$:

$$k_1 = \frac{2(-1)^2 + 9(-1) - 11}{(-1-2)(-1+3)} = \frac{2 - 9 - 11}{(-3)(2)} = \frac{-18}{-6} = 3$$

---

**Finding $$k_2$$:** Cover up $$(x-2)$$, substitute $$x = 2$$:

$$k_2 = \frac{2(2)^2 + 9(2) - 11}{(2+1)(2+3)} = \frac{8 + 18 - 11}{(3)(5)} = \frac{15}{15} = 1$$

---

**Finding $$k_3$$:** Cover up $$(x+3)$$, substitute $$x = -3$$:

$$k_3 = \frac{2(-3)^2 + 9(-3) - 11}{(-3+1)(-3-2)} = \frac{18 - 27 - 11}{(-2)(-5)} = \frac{-20}{10} = -2$$

---

**Final Answer:**

$$\boxed{F(x) = \frac{3}{x+1} + \frac{1}{x-2} - \frac{2}{x+3}}$$

---

### Step-by-Step Summary of the Cover-Up Method

```
For each factor (x - λᵣ) in the denominator:
  1. Cover up that factor in F(x)
  2. Substitute x = λᵣ into the remaining expression
  3. The result is kᵣ
```

> 💡 **Pro tip:** You can verify your answer by picking any value of $$x$$ (say $$x = 0$$) and checking that both sides of the equation give the same number.

---

## Page 4: B.5-2 (Continued) — Complex Factors and Quadratic Factors

### Complex Factors: The Cover-Up Still Works!

The Heaviside method doesn't care whether the roots are real or complex — the formula is the same. Let's see this in action.

---

### Example with Complex Factors

Consider:
$$F(x) = \frac{4x^2 + 2x + 18}{(x+1)(x^2 + 4x + 13)}$$

First, factor the quadratic in the denominator. The roots of $$x^2 + 4x + 13 = 0$$ are:

$$x = \frac{-4 \pm \sqrt{16 - 52}}{2} = \frac{-4 \pm \sqrt{-36}}{2} = -2 \pm j3$$

So we can write:
$$F(x) = \frac{4x^2 + 2x + 18}{(x+1)(x+2-j3)(x+2+j3)} = \frac{k_1}{x+1} + \frac{k_2}{x+2-j3} + \frac{k_3}{x+2+j3}$$

**Finding $$k_1$$:** Cover up $$(x+1)$$, let $$x = -1$$:
$$k_1 = \frac{4(1) + 2(-1) + 18}{(-1)^2 + 4(-1) + 13} = \frac{4 - 2 + 18}{1 - 4 + 13} = \frac{20}{10} = 2$$

**Finding $$k_2$$:** Cover up $$(x+2-j3)$$, let $$x = -2+j3$$:
$$k_2 = \frac{4(-2+j3)^2 + 2(-2+j3) + 18}{(-2+j3+1)(-2+j3+2+j3)} = 1 + j2 = \sqrt{5}\, e^{j63.43°}$$

**Finding $$k_3$$:** By symmetry (since all coefficients of $$F(x)$$ are real), $$k_3 = k_2^* = 1 - j2 = \sqrt{5}\, e^{-j63.43°}$$

> 💡 **Important shortcut:** When $$F(x)$$ has **real coefficients**, the coefficients for complex-conjugate factors are always **complex conjugates of each other**. So you only need to compute one of them!

---

### Handling Quadratic Factors Without Going Complex

Often, it's more convenient to keep the quadratic factor intact and write:

$$F(x) = \frac{4x^2 + 2x + 18}{(x+1)(x^2+4x+13)} = \frac{k_1}{x+1} + \frac{c_1 x + c_2}{x^2 + 4x + 13}$$

Notice the numerator of the quadratic term is **linear** ($$c_1 x + c_2$$), not just a constant. This is required because the degree of the numerator must be one less than the degree of the denominator for each partial fraction.

**Step 1:** Find $$k_1$$ by cover-up: $$k_1 = 2$$ (as computed above).

**Step 2:** Clear fractions by multiplying both sides by $$(x+1)(x^2+4x+13)$$:

$$4x^2 + 2x + 18 = 2(x^2 + 4x + 13) + (c_1 x + c_2)(x+1)$$

$$= (2 + c_1)x^2 + (8 + c_1 + c_2)x + (26 + c_2)$$

**Step 3:** Match coefficients:
- $$x^2$$: $$4 = 2 + c_1 \Rightarrow c_1 = 2$$
- $$x^0$$: $$18 = 26 + c_2 \Rightarrow c_2 = -8$$

**Final Answer:**
$$\boxed{F(x) = \frac{2}{x+1} + \frac{2x - 8}{x^2 + 4x + 13}}$$

---

### Shortcuts for Finding $$c_1$$ and $$c_2$$

Instead of matching all coefficients, you can use these clever tricks after finding $$k_1$$:

**Trick 1 — Let $$x = 0$$** (eliminates $$c_1$$ if the equation is set up right):

Starting from:
$$\frac{4x^2 + 2x + 18}{(x+1)(x^2+4x+13)} = \frac{2}{x+1} + \frac{c_1 x + c_2}{x^2+4x+13}$$

Set $$x = 0$$:
$$\frac{18}{13} = 2 + \frac{c_2}{13} \Rightarrow c_2 = -8$$

**Trick 2 — Multiply by $$x$$, let $$x \to \infty$$** (only highest-degree terms survive):

$$4 = 2 + c_1 \Rightarrow c_1 = 2$$

> 💡 **Why these tricks work:** Setting $$x = 0$$ is convenient because it kills the $$c_1$$ term. Letting $$x \to \infty$$