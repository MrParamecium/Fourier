# Section B.5: Partial Fraction Expansion

---

## Page 1: Section Overview — What Is Partial Fraction Expansion and Why Do We Care?

Welcome to Section B.5! This section is all about a powerful algebraic technique called **partial fraction expansion** (also called partial fraction decomposition). Let's start by understanding the big picture before diving into the details.

---

### What's the Problem We're Solving?

Imagine you have a complicated rational function like:

$$F(x) = \frac{2x^2 + 9x - 11}{(x+1)(x-2)(x+3)}$$

This is one big fraction. It's hard to work with directly — especially in signal processing, where we often need to find **inverse transforms** (like inverse Laplace or inverse Z-transforms). 

The idea of partial fraction expansion is to **break this one big fraction into a sum of simpler fractions**, like this:

$$F(x) = \frac{3}{x+1} + \frac{1}{x-2} - \frac{2}{x+3}$$

Each piece is much easier to handle!

---

### When Can We Do This?

Partial fraction expansion works on **proper rational functions** — that means the degree of the numerator polynomial must be **less than** the degree of the denominator polynomial.

> **Proper function:** degree of numerator < degree of denominator
>
> **Improper function:** degree of numerator ≥ degree of denominator

If you have an improper function, you first do **polynomial long division** to extract the polynomial part, and then apply partial fractions to the leftover proper part.

---

### What Methods Will We Learn?

This section covers **four main approaches**:

| Method | Best Used When |
|---|---|
| **B.5-1** Clearing Fractions | Always works; good for small problems |
| **B.5-2** Heaviside "Cover-Up" | Distinct (non-repeated) factors; very fast |
| **B.5-3** Repeated Factors | When a factor appears more than once |
| **B.5-4** Hybrid (Cover-Up + Shortcuts) | Mix of repeated and non-repeated factors |

We'll also handle **complex factors**, **quadratic factors**, **improper functions** (B.5-5), and a special **modified form** for Z-transforms (B.5-6).

---

### The Road Map

Think of it this way: every rational function falls into one of these categories based on its denominator:

```
Rational Function F(x)
        │
        ├── Proper? 
        │       ├── Yes → Partial Fractions directly
        │       └── No  → Long division first, then Partial Fractions
        │
        └── Denominator factors?
                ├── All distinct (real)     → Heaviside Cover-Up
                ├── Complex conjugate pairs → Cover-Up + combine
                └── Repeated roots         → Extended Cover-Up + derivatives
```

Let's now go through each method step by step!

---

## Page 2: B.5-1 — The Method of Clearing Fractions

### The Core Idea

The most straightforward approach: **assume the form of the partial fractions, then solve for the unknown coefficients** by multiplying everything out and matching powers of $$x$$.

It's like solving a system of equations — systematic, reliable, but can get tedious for large problems.

---

### Step-by-Step Procedure

**Step 1:** Write $$F(x)$$ as a sum of partial fractions with unknown coefficients.

**Step 2:** Multiply both sides by the full denominator to **clear all fractions**.

**Step 3:** Expand the right-hand side and **collect terms by powers of** $$x$$.

**Step 4:** **Equate coefficients** of matching powers on both sides.

**Step 5:** **Solve** the resulting system of equations.

---

### How to Choose the Form of Partial Fractions

The denominator tells you what partial fractions to use:

| Denominator Factor | Partial Fraction Term |
|---|---|
| $$(x - a)$$ | $$\dfrac{k}{x-a}$$ |
| $$(x - a)^2$$ | $$\dfrac{k_1}{x-a} + \dfrac{k_2}{(x-a)^2}$$ |
| $$(x - a)^r$$ | $$\dfrac{k_1}{x-a} + \dfrac{k_2}{(x-a)^2} + \cdots + \dfrac{k_r}{(x-a)^r}$$ |

---

### Worked Example (Example B.8)

Expand:

$$F(x) = \frac{x^3 + 3x^2 + 4x + 6}{(x+1)(x+2)(x+3)^2}$$

**Step 1:** Write the partial fraction form. The denominator has factors $$(x+1)$$, $$(x+2)$$, $$(x+3)$$, and $$(x+3)^2$$, so:

$$F(x) = \frac{k_1}{x+1} + \frac{k_2}{x+2} + \frac{k_3}{x+3} + \frac{k_4}{(x+3)^2}$$

**Step 2:** Multiply both sides by $$(x+1)(x+2)(x+3)^2$$:

$$x^3 + 3x^2 + 4x + 6 = k_1(x+2)(x+3)^2 + k_2(x+1)(x+3)^2 + k_3(x+1)(x+2)(x+3) + k_4(x+1)(x+2)$$

**Step 3:** Expand and collect by powers of $$x$$:

$$= x^3(k_1+k_2+k_3) + x^2(8k_1+7k_2+6k_3+k_4) + x(21k_1+15k_2+11k_3+3k_4) + (18k_1+9k_2+6k_3+2k_4)$$

**Step 4:** Equate coefficients:

$$k_1 + k_2 + k_3 = 1$$

$$8k_1 + 7k_2 + 6k_3 + k_4 = 3$$

$$21k_1 + 15k_2 + 11k_3 + 3k_4 = 4$$

$$18k_1 + 9k_2 + 6k_3 + 2k_4 = 6$$

**Step 5:** Solve the system:

$$k_1 = 1, \quad k_2 = -2, \quad k_3 = 2, \quad k_4 = -3$$

**Result:**

$$\boxed{F(x) = \frac{1}{x+1} - \frac{2}{x+2} + \frac{2}{x+3} - \frac{3}{(x+3)^2}}$$

---

### Pros and Cons

✅ **Always works** — no special cases needed  
✅ **Systematic** — just algebra  
❌ **Slow** — lots of expansion and equation-solving  
❌ **Error-prone** — easy to make arithmetic mistakes with many terms

> 💡 **Tip:** This method is great for checking your answers from faster methods!

---

## Page 3: B.5-2 — The Heaviside "Cover-Up" Method (Distinct Real Factors)

### The Big Idea

When all the factors in the denominator are **distinct** (none repeated), there's a beautifully fast shortcut. Instead of solving a system of equations, you can find each coefficient **one at a time** with almost no algebra.

This method is called the **Heaviside Cover-Up Method** (named after the engineer Oliver Heaviside).

---

### The Formula

For a proper function with distinct factors:

$$F(x) = \frac{P(x)}{(x-\lambda_1)(x-\lambda_2)\cdots(x-\lambda_n)} = \frac{k_1}{x-\lambda_1} + \frac{k_2}{x-\lambda_2} + \cdots + \frac{k_n}{x-\lambda_n}$$

Each coefficient is found by:

$$\boxed{k_r = (x - \lambda_r) \cdot F(x) \Big|_{x = \lambda_r}}$$

In plain English: **multiply** $$F(x)$$ by the factor $$(x - \lambda_r)$$, then **plug in** $$x = \lambda_r$$.

---

### The "Cover-Up" Trick

Here's the physical intuition. When you multiply $$F(x)$$ by $$(x - \lambda_r)$$, you're canceling that factor from the denominator. So it's equivalent to:

> 👉 **Cover up** (hide with your finger) the factor $$(x - \lambda_r)$$ in the denominator of $$F(x)$$, then substitute $$x = \lambda_r$$ into everything that remains.

---

### Worked Example (Example B.9)

Expand:

$$F(x) = \frac{2x^2 + 9x - 11}{(x+1)(x-2)(x+3)} = \frac{k_1}{x+1} + \frac{k_2}{x-2} + \frac{k_3}{x+3}$$

**Finding $$k_1$$:** Cover up $$(x+1)$$, substitute $$x = -1$$:

$$k_1 = \frac{2(-1)^2 + 9(-1) - 11}{(-1-2)(-1+3)} = \frac{2 - 9 - 11}{(-3)(2)} = \frac{-18}{-6} = 3$$

**Finding $$k_2$$:** Cover up $$(x-2)$$, substitute $$x = 2$$:

$$k_2 = \frac{2(4) + 9(2) - 11}{(2+1)(2+3)} = \frac{8 + 18 - 11}{(3)(5)} = \frac{15}{15} = 1$$

**Finding $$k_3$$:** Cover up $$(x+3)$$, substitute $$x = -3$$:

$$k_3 = \frac{2(9) + 9(-3) - 11}{(-3+1)(-3-2)} = \frac{18 - 27 - 11}{(-2)(-5)} = \frac{-20}{10} = -2$$

**Result:**

$$\boxed{F(x) = \frac{3}{x+1} + \frac{1}{x-2} - \frac{2}{x+3}}$$

---

### Why Does This Work? (Intuition)

Multiply both sides of the partial fraction equation by $$(x - \lambda_1)$$:

$$(x-\lambda_1)F(x) = k_1 + \frac{k_2(x-\lambda_1)}{x-\lambda_2} + \frac{k_3(x-\lambda_1)}{x-\lambda_3} + \cdots$$

Now set $$x = \lambda_1$$. Every term on the right **except** $$k_1$$ contains the factor $$(x - \lambda_1) = 0$$ and vanishes. You're left with just $$k_1$$. 

---

### Summary of the Cover-Up Steps

```
For each factor (x - λᵣ) in the denominator:
  1. Cover up that factor in F(x)
  2. Substitute x = λᵣ into the remaining expression
  3. The result is kᵣ
```

> ✅ **This is the fastest method for distinct real factors — use it whenever you can!**

---

## Page 4: B.5-2 Continued — Complex and Quadratic Factors

### Complex Factors: The Cover-Up Still Works!

The Heaviside method doesn't care whether the roots are real or complex. It works exactly the same way. The only difference is that you'll be substituting **complex numbers**.

---

### Example with Complex Factors

Consider:

$$F(x) = \frac{4x^2 + 2x + 18}{(x+1)(x^2 + 4x + 13)}$$

First, factor the quadratic: $$x^2 + 4x + 13 = (x + 2 - j3)(x + 2 + j3)$$

So:

$$F(x) = \frac{k_1}{x+1} + \frac{k_2}{x+2-j3} + \frac{k_3}{x+2+j3}$$

**Finding $$k_1$$** (cover up $$(x+1)$$, set $$x = -1$$):

$$k_1 = \frac{4(1) + 2(-1) + 18}{(-1)^2 + 4(-1) + 13} = \frac{4 - 2 + 18}{1 - 4 + 13} = \frac{20}{10} = 2$$

**Finding $$k_2$$** (cover up $$(x+2-j3)$$, set $$x = -2+j3$$):

$$k_2 = 1 + j2 = \sqrt{5}\, e^{j63.43°}$$

**Finding $$k_3$$** (cover up $$(x+2+j3)$$, set $$x = -2-j3$$):

$$k_3 = 1 - j2 = \sqrt{5}\, e^{-j63.43°}$$

> 💡 **Key observation:** $$k_3 = k_2^*$$ (complex conjugate). This is **always true** when $$F(x)$$ has real coefficients. So you only need to compute one of them!

---

### Combining Complex Pairs into a Quadratic Factor

Working with complex numbers can be messy. Often it's cleaner to keep the quadratic factor intact and write:

$$F(x) = \frac{k_1}{x+1} + \frac{c_1 x + c_2}{x^2 + 4x + 13}$$

We already know $$k_1 = 2$$. So:

$$\frac{4x^2 + 2x + 18}{(x+1)(x^2+4x+13)} = \frac{2}{x+1} + \frac{c_1 x + c_2}{x^2+4x+13}$$

**Clear fractions** (multiply both sides by $$(x+1)(x^2+4x+13)$$):

$$4x^2 + 2x + 18 = 2(x^2+4x+13) + (c_1x+c_2)(x+1)$$

$$= (2+c_1)x^2 + (8+c_1+c_2)x + (26+c_2)$$

**Equate coefficients:**

- $$x^2$$: $$4 = 2 + c_1 \Rightarrow c_1 = 2$$
- $$x^0$$: $$18 = 26 + c_2 \Rightarrow c_2 = -8$$

**Result:**

$$\boxed{F(x) = \frac{2}{x+1} + \frac{2x-8}{x^2+4x+13}}$$

---

### Shortcuts for Finding $$c_1$$ and $$c_2$$

Instead of equating all coefficients, use these two clever tricks:

**Trick 1 — Set $$x = 0$$** (eliminates $$c_1$$):

$$\frac{18}{13} = 2 + \frac{c_2}{13} \Rightarrow c_2 = -8$$

**Trick 2 — Multiply by $$x$$, let $$x \to \infty$$** (only highest powers survive):

$$4 = 2 + c_1 \Rightarrow c_1 = 2$$

> 💡 **Why $$x \to \infty$$?** When $$x$$ is huge, lower-order terms become negligible. The equation simplifies to just the leading coefficients.

---

### General Rule for Quadratic Numerators

When you have a quadratic (or higher) factor in the denominator that you want to keep intact, the numerator of that partial fraction term must be **one degree lower** than the denominator factor:

| Denominator factor | Numerator of partial fraction |
|---|---|
| $$(x - a)$$ | constant $$k$$ |
| $$(x^2 + bx + c)$$ | linear $$c_1 x + c_2$$ |
| $$(x^2 + bx + c)^2$$ | $$c_1 x + c_2$$ for each power |

---

## Page 5: B.5-3 — Repeated Factors of Q(x)

### The Problem with Repeated Roots

What happens when a factor appears **more than once** in the denominator? For example:

$$F(x) = \frac{P(x)}{(x-\lambda)^3 (x-\alpha)}$$

You **cannot** just write $$\dfrac{k}{x-\lambda}$$ — that's not enough terms to capture the full behavior. You need **one term for each power** of the repeated factor:

$$F(x) = \frac{a_0}{(x-\lambda)^3} + \frac{a_1}{(x-\lambda)^2} + \frac{a_2}{x-\lambda} + \frac{k}{x-\alpha}$$

---

### General Form for Repeated Factors

For a factor $$(x-\lambda)^r$$, you need $$r$$ terms:

$$\frac{a_0}{(x-\lambda)^r} + \frac{a_1}{(x-\lambda)^{r-1}} + \cdots + \frac{a_{r-1}}{x-\lambda}$$

The non-repeated factors are handled by the regular Heaviside method.

---

### Finding the Coefficients $$a_0, a_1, \ldots, a_{r-1}$$

Multiply both sides by $$(x-\lambda)^r$$ to get:

$$(x-\lambda)^r F(x) = a_0 + a_1(x-\lambda) + a_2(x-\lambda)^2 + \cdots$$

Call this expression $$G(x) = (x-\lambda)^r F(x)$$. Then:

$$\boxed{a_j = \frac{1}{j!} \frac{d^j}{dx^j} G(x) \Bigg|_{x=\lambda}}$$

In plain English:

- $$a_0$$: Cover up $$(x-\lambda)^r$$, substitute $$x = \lambda$$ → **no derivative needed**
- $$a_1$$: Cover up $$(x-\lambda)^r$$, take **1st derivative**, substitute $$x = \lambda$$
- $$a_2$$: Cover up $$(x-\lambda)^r$$, take **2nd derivative**, divide by $$2!$$, substitute $$x = \lambda$$
- $$a_j$$: Cover up $$(x-\lambda)^r$$, take **$$j$$th derivative**, divide by $$j!$$, substitute $$x = \lambda$$

---

### Worked Example (Example B.10)

Expand:

$$F(x) = \frac{4x^3 + 16x^2 +