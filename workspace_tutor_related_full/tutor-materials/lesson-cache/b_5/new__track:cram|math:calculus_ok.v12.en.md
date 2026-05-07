# Section B.5: Partial Fraction Expansion

---

## Page 1: Section Overview — What Is Partial Fraction Expansion and Why Do We Care?

Welcome to Section B.5! This section is all about a powerful algebraic technique called **partial fraction expansion** (also called partial fraction decomposition). Let's start by understanding the big picture before diving into the details.

---

### What's the Problem We're Solving?

Imagine you have a complicated rational function like:

$$F(x) = \frac{2x^2 + 9x - 11}{(x+1)(x-2)(x+3)}$$

This is one big fraction. In signal processing and systems analysis, we often need to work backwards from such expressions — for example, to find inverse Laplace transforms or inverse Z-transforms. A single complicated fraction is hard to work with directly.

**The idea:** Break that one big fraction into a *sum of simpler fractions*, each with just one factor in the denominator. Like this:

$$F(x) = \frac{3}{x+1} + \frac{1}{x-2} - \frac{2}{x+3}$$

Much nicer! Each piece is easy to handle individually.

---

### What Is a Rational Function?

A **rational function** is simply a ratio of two polynomials:

$$F(x) = \frac{P(x)}{Q(x)}$$

It is called **proper** if the degree of the numerator $P(x)$ is *less than* the degree of the denominator $Q(x)$. Partial fraction expansion works directly on proper functions. If $F(x)$ is improper (numerator degree ≥ denominator degree), we first do polynomial long division to extract a polynomial part, then expand the leftover proper part.

---

### What Methods Will We Learn?

This section covers **four main approaches**:

| Method | Best Used When |
|---|---|
| **B.5-1** Clearing Fractions | Always works; straightforward but can be tedious |
| **B.5-2** Heaviside "Cover-Up" | Distinct (non-repeated) factors; very fast |
| **B.5-3** Repeated Factors | Denominator has repeated roots |
| **B.5-4** Hybrid (Cover-Up + Shortcuts) | Mix of repeated and distinct roots |

We'll also handle **complex factors**, **quadratic factors**, **improper functions** (B.5-5), and a special **modified partial fraction** form (B.5-6) used in Z-transforms.

---

### The Road Map for This Section

```
Big Fraction
     │
     ▼
Is it proper? ──No──▶ Long division first, then expand remainder
     │
    Yes
     ▼
What kind of denominator factors?
     ├── All distinct (real or complex) ──▶ Heaviside Cover-Up
     ├── Repeated factors ──▶ Repeated Factor Method
     └── Mix ──▶ Hybrid Method
```

Let's get started!

---

## Page 2: B.5-1 — The Method of Clearing Fractions

### The Core Idea

This is the most **fundamental** method. The strategy is:

1. Write $F(x)$ as a sum of partial fractions with **unknown coefficients** ($k_1, k_2, \ldots$)
2. **Multiply both sides** by the full denominator to "clear" all the fractions
3. **Expand** the right-hand side and collect terms by powers of $x$
4. **Match coefficients** of equal powers on both sides
5. **Solve** the resulting system of equations

---

### Worked Example (Example B.8)

Expand:

$$F(x) = \frac{x^3 + 3x^2 + 4x + 6}{(x+1)(x+2)(x+3)^2}$$

**Step 1: Set up the partial fraction form.**

Notice the denominator has factors $(x+1)$, $(x+2)$, $(x+3)$, and $(x+3)^2$. The repeated factor $(x+3)^2$ needs *two* terms:

$$F(x) = \frac{k_1}{x+1} + \frac{k_2}{x+2} + \frac{k_3}{x+3} + \frac{k_4}{(x+3)^2}$$

> 💡 **Key Rule:** A factor $(x+a)^r$ repeated $r$ times needs $r$ separate partial fraction terms, one for each power from 1 up to $r$.

---

**Step 2: Clear fractions.**

Multiply both sides by $(x+1)(x+2)(x+3)^2$:

$$x^3 + 3x^2 + 4x + 6 = k_1(x+2)(x+3)^2 + k_2(x+1)(x+3)^2 + k_3(x+1)(x+2)(x+3) + k_4(x+1)(x+2)$$

After expanding and collecting by powers of $x$:

$$= x^3(k_1+k_2+k_3) + x^2(8k_1+7k_2+6k_3+k_4) + x(21k_1+15k_2+11k_3+3k_4) + (18k_1+9k_2+6k_3+2k_4)$$

---

**Step 3: Match coefficients.**

| Power of $x$ | Left side | Right side |
|---|---|---|
| $x^3$ | $1$ | $k_1 + k_2 + k_3$ |
| $x^2$ | $3$ | $8k_1 + 7k_2 + 6k_3 + k_4$ |
| $x^1$ | $4$ | $21k_1 + 15k_2 + 11k_3 + 3k_4$ |
| $x^0$ | $6$ | $18k_1 + 9k_2 + 6k_3 + 2k_4$ |

---

**Step 4: Solve the system.**

$$k_1 = 1, \quad k_2 = -2, \quad k_3 = 2, \quad k_4 = -3$$

**Final Answer:**

$$\boxed{F(x) = \frac{1}{x+1} - \frac{2}{x+2} + \frac{2}{x+3} - \frac{3}{(x+3)^2}}$$

---

### Pros and Cons

| ✅ Pros | ❌ Cons |
|---|---|
| Works for *every* case | Can require solving large systems of equations |
| Systematic and reliable | Gets tedious for high-degree polynomials |
| Easy to understand | Lots of algebra — easy to make arithmetic errors |

> 💬 **Bottom line:** This method always works, but the next method (Heaviside) is much faster when the denominator factors are all distinct. Use clearing fractions as a backup or for finding remaining unknowns after using Heaviside.

---

## Page 3: B.5-2 — The Heaviside "Cover-Up" Method (Distinct Real Factors)

### The Big Idea

When all the factors of $Q(x)$ are **distinct** (none repeated), there's a beautifully simple shortcut. Instead of solving a system of equations, you can find each coefficient **one at a time** with almost no algebra.

---

### The Formula

If:

$$F(x) = \frac{P(x)}{(x-\lambda_1)(x-\lambda_2)\cdots(x-\lambda_n)} = \frac{k_1}{x-\lambda_1} + \frac{k_2}{x-\lambda_2} + \cdots + \frac{k_n}{x-\lambda_n}$$

Then each coefficient is found by:

$$\boxed{k_r = (x - \lambda_r)\,F(x)\Big|_{x=\lambda_r}}$$

In plain English: **multiply both sides by the factor $(x - \lambda_r)$, then substitute $x = \lambda_r$**. All other terms vanish, leaving only $k_r$.

---

### The "Cover-Up" Trick

Here's the practical shortcut that gives this method its name:

> 👆 **To find $k_r$:** Mentally "cover up" (hide with your finger) the factor $(x - \lambda_r)$ in the denominator of $F(x)$, then substitute $x = \lambda_r$ into everything that remains.

This works because multiplying by $(x - \lambda_r)$ and then evaluating at $x = \lambda_r$ is *exactly* the same as covering up that factor.

---

### Worked Example (Example B.9)

Expand:

$$F(x) = \frac{2x^2 + 9x - 11}{(x+1)(x-2)(x+3)} = \frac{k_1}{x+1} + \frac{k_2}{x-2} + \frac{k_3}{x+3}$$

**Finding $k_1$:** Cover up $(x+1)$, set $x = -1$:

$$k_1 = \frac{2(-1)^2 + 9(-1) - 11}{(-1-2)(-1+3)} = \frac{2 - 9 - 11}{(-3)(2)} = \frac{-18}{-6} = 3$$

**Finding $k_2$:** Cover up $(x-2)$, set $x = 2$:

$$k_2 = \frac{2(4) + 9(2) - 11}{(2+1)(2+3)} = \frac{8 + 18 - 11}{(3)(5)} = \frac{15}{15} = 1$$

**Finding $k_3$:** Cover up $(x+3)$, set $x = -3$:

$$k_3 = \frac{2(9) + 9(-3) - 11}{(-3+1)(-3-2)} = \frac{18 - 27 - 11}{(-2)(-5)} = \frac{-20}{10} = -2$$

**Final Answer:**

$$\boxed{F(x) = \frac{3}{x+1} + \frac{1}{x-2} - \frac{2}{x+3}}$$

---

### Why Does This Work? (Intuition)

Start from:

$$F(x) = \frac{k_1}{x-\lambda_1} + \frac{k_2}{x-\lambda_2} + \cdots$$

Multiply both sides by $(x - \lambda_1)$:

$$(x-\lambda_1)F(x) = k_1 + \frac{k_2(x-\lambda_1)}{x-\lambda_2} + \cdots$$

Now set $x = \lambda_1$. Every term on the right except $k_1$ has a factor $(x - \lambda_1)$ in the numerator, which becomes **zero**. So only $k_1$ survives. ✓

---

### Quick Reference

| Step | Action |
|---|---|
| 1 | Write out the partial fraction form |
| 2 | For each factor $(x - \lambda_r)$: cover it up |
| 3 | Substitute $x = \lambda_r$ into the rest |
| 4 | That result is $k_r$ |

> ⚡ **This is the fastest method for distinct factors — use it as your first choice!**

---

## Page 4: B.5-2 Continued — Complex and Quadratic Factors

### Complex Factors: The Cover-Up Still Works!

The Heaviside cover-up method works even when the denominator has **complex roots**. The procedure is identical — you just substitute complex numbers.

---

### Example with Complex Factors

Consider:

$$F(x) = \frac{4x^2 + 2x + 18}{(x+1)(x^2+4x+13)}$$

First, factor the quadratic: $x^2 + 4x + 13 = (x + 2 - j3)(x + 2 + j3)$

So:

$$F(x) = \frac{k_1}{x+1} + \frac{k_2}{x+2-j3} + \frac{k_3}{x+2+j3}$$

**Finding $k_1$** (cover up $(x+1)$, set $x = -1$):

$$k_1 = \frac{4(1) + 2(-1) + 18}{(-1)^2 + 4(-1) + 13} = \frac{4 - 2 + 18}{1 - 4 + 13} = \frac{20}{10} = 2$$

**Finding $k_2$** (cover up $(x+2-j3)$, set $x = -2+j3$):

$$k_2 = 1 + j2 = \sqrt{5}\,e^{j63.43°}$$

**Finding $k_3$**: Since the original function has real coefficients, $k_3 = k_2^* = 1 - j2 = \sqrt{5}\,e^{-j63.43°}$

> 💡 **Useful shortcut:** For real-coefficient rational functions, complex-conjugate factors always give **conjugate coefficients**. You only need to compute one of them!

---

### Combining Complex Pairs into a Quadratic Term

In practice, we often prefer to keep the quadratic factor intact rather than splitting into complex roots. We write:

$$F(x) = \frac{4x^2 + 2x + 18}{(x+1)(x^2+4x+13)} = \frac{k_1}{x+1} + \frac{c_1 x + c_2}{x^2+4x+13}$$

> 📌 **Note:** The numerator of the quadratic term must be **linear** ($c_1 x + c_2$), not just a constant, because the denominator is degree 2.

**Step 1:** Find $k_1 = 2$ by cover-up as before.

**Step 2:** Now we have:

$$\frac{4x^2 + 2x + 18}{(x+1)(x^2+4x+13)} = \frac{2}{x+1} + \frac{c_1 x + c_2}{x^2+4x+13}$$

**Step 3: Use shortcuts to find $c_1$ and $c_2$.**

**Shortcut for $c_1$:** Multiply both sides by $x$ and let $x \to \infty$. As $x \to \infty$, only the highest-power terms matter:

$$4 = 2 + c_1 \implies c_1 = 2$$

**Shortcut for $c_2$:** Set $x = 0$:

$$\frac{18}{(1)(13)} = \frac{2}{1} + \frac{c_2}{13}$$

$$\frac{18}{13} = 2 + \frac{c_2}{13} \implies c_2 = 18 - 26 = -8$$

**Final Answer:**

$$\boxed{F(x) = \frac{2}{x+1} + \frac{2x - 8}{x^2+4x+13}}$$

---

### Summary of Shortcut Tricks

| Trick | How to Use It |
|---|---|
| **Multiply by $x$, let $x \to \infty$** | Eliminates all but the highest-degree unknown; gives one equation quickly |
| **Set $x = 0$** | Simple substitution; works when $x=0$ doesn't cause division by zero |
| **Set $x = $ any convenient value** | Use when $x=0$ causes problems; pick values that simplify arithmetic |

> 💬 These shortcuts are not magic — they're just clever choices of $x$ that make the algebra simpler. You can always use any value of $x$ you like; some just give cleaner numbers than others.

---

## Page 5: B.5-3 — Repeated Factors of Q(x)

### When the Denominator Has Repeated Roots

Sometimes the denominator has a factor like $(x+3)^2$ or $(x-1)^3$. These **repeated factors** require special treatment.

---

### The Partial Fraction Form for Repeated Factors

If $F(x)$ has a factor $(x - \lambda)^r$ repeated $r$ times, the expansion looks like:

$$F(x) = \frac{a_0}{(x-\lambda)^r} + \frac{a_1}{(x-\lambda)^{r-1}} + \cdots + \frac{a_{r-1}}{(x-\lambda)} + \text{(terms for other factors)}$$

> 📌 **Key point:** A factor repeated $r$ times contributes $r$ separate terms, with powers of $(x-\lambda)$ from 1 up to $r$ in the denominator.

---

### How to Find the Coefficients $a_0, a_1, \ldots, a_{r-1}$

Multiply both sides by $(x-\lambda)^r$ to get:

$$(x-\lambda)^r F(x) = a_0 + a_1(x-\lambda) + a_2(x-\lambda)^2 + \cdots$$

Call $G(x) = (x-\lambda)^r F(x)$ (i.e., $F(x)$ with the factor $(x-\lambda)^r$ "covered up"). Then:

$$\boxed{a_j = \frac{1}{j!} \frac{d^j}{dx^j} G(x) \Bigg|_{x=\lambda}}$$

In plain English:
- $a_0$: cover up $(x-\lambda)^r$, substitute $x = \lambda$ → **no derivative needed**
- $a_1$: cover up $(x-\lambda)^r$, take **1st derivative**, substitute $x = \lambda$
- $a_2$: cover up $(x-\lambda)^r$, take **2nd derivative**, divide by $2!$, substitute $x = \lambda$
- And so on...

The non-repeated factors' coefficients ($k_1, k_2, \ldots$) are still found by the regular Heaviside cover-up method.

---

### Worked Example (Example B.10)

Expand:

$$F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)}$$

**Set up the form:**

$$F(x) = \frac{a_0}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{k}{x+2}$$

---

**Finding $k$** (cover up $(x+2)$, set $x = -2$):

$$k = \frac{4(-8) + 16(4) + 23(-2) + 13}{(-2+1)^3} = \frac{-32+64-46+13}{(-1)^3} = \frac{-1}{-1} = 1$$

---

**Finding $a_0$** (cover up $(x+1)^3$, set $x = -1$):

Let $G(x) = \frac{4x^3+16x^2+23x+13}{x+2}$

$$a_0 = G(-1) = \frac{4(-1)+16(1)+23(-1)+13}{-1+2} =