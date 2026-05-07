# B.5-4 Partial Fraction Expansion with Repeated Factors

---

## Page 1: Section Overview

Welcome! In this section, we're going to tackle one of the trickier parts of partial fraction expansion: **what happens when you have repeated factors in the denominator?**

### What's the Big Idea?

So far, you've probably seen partial fractions where every factor in the denominator appears just once — things like $$(x+1)(x+2)$$. Easy enough. But what if a factor repeats, like $$(x+1)^3$$? That changes everything about how we set up and solve the expansion.

### What You'll Learn in This Section

By the end of this section, you'll be able to:

1. **Recognize repeated factors** and set up the correct partial fraction form
2. **Use the Heaviside "cover-up" method** extended to repeated roots (with derivatives!)
3. **Use the hybrid method** — combining Heaviside with "clearing fractions" to avoid messy derivatives
4. **Use clever shortcuts** like multiplying by \(x\) and letting \(x \to \infty\), or plugging in convenient values of \(x\)
5. **Handle the special case** where the numerator and denominator have the same degree (\(m = n\))

### The Running Example

We'll work through this function repeatedly to compare methods:

$$F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)}$$

### Why Does This Matter?

In signal processing and linear systems, you'll constantly need to break complicated transfer functions and Laplace transforms into simpler pieces. Repeated poles (repeated factors) show up all the time in real systems, so mastering this is essential.

Let's dive in! 🎯

---

## Page 2: Setting Up the Partial Fraction Form for Repeated Factors

### The Core Rule: One Term Per Power

When a factor repeats in the denominator, you need **a separate partial fraction term for every power** of that factor, from 1 up to the full power.

> **General Rule:** If $$(x - \lambda)^r$$ appears in the denominator, you need \(r\) terms:
>
> $$\frac{a_0}{(x-\lambda)^r} + \frac{a_1}{(x-\lambda)^{r-1}} + \cdots + \frac{a_{r-1}}{x - \lambda}$$

### Applying This to Our Example

Our function is:

$$F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)}$$

The denominator has:
- $$(x+1)^3$$ — a **repeated** factor (power 3) → needs **3 terms**
- $$(x+2)$$ — a **simple** factor (power 1) → needs **1 term**

So the correct setup is:

$$F(x) = \frac{a_0}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{k}{x+2}$$

### ⚠️ Common Beginner Mistake

Many students write only one term for a repeated factor:

$$\frac{a}{(x+1)^3} \quad \leftarrow \text{WRONG! Missing the other powers.}$$

This is incorrect because you need to account for **all** the ways the repeated factor can contribute. Think of it like this: $$(x+1)^3$$ "contains" $$(x+1)^2$$ and $$(x+1)$$ inside it, and each one deserves its own coefficient.

### Quick Check

If your denominator were $$(x+2)^4(x-1)(x+5)^2$$, how many terms would you need?

- From $$(x+2)^4$$: **4 terms**
- From $$(x-1)$$: **1 term**
- From $$(x+5)^2$$: **2 terms**
- **Total: 7 terms** ✅

---

## Page 3: Method 1 — The Heaviside Cover-Up Method (Extended)

### Finding the Simple Root Coefficient First

For the **non-repeated** factor $$(x+2)$$, the classic Heaviside cover-up works perfectly. Cover up $$(x+2)$$ in \(F(x)\) and substitute \(x = -2\):

$$k = \left.\frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3}\right|_{x=-2}$$

$$k = \frac{4(-8) + 16(4) + 23(-2) + 13}{(-1)^3} = \frac{-32 + 64 - 46 + 13}{-1} = \frac{-1}{-1} = 1$$

$$\boxed{k = 1}$$

### Finding \(a_0\): The Highest-Power Repeated Term

For \(a_0\) (the coefficient of the **highest power** $$(x+1)^3$$), cover up $$(x+1)^3$$ and substitute \(x = -1\):

$$a_0 = \left.\frac{4x^3 + 16x^2 + 23x + 13}{(x+2)}\right|_{x=-1}$$

$$a_0 = \frac{4(-1) + 16(1) + 23(-1) + 13}{(-1+2)} = \frac{-4 + 16 - 23 + 13}{1} = \frac{2}{1} = 2$$

$$\boxed{a_0 = 2}$$

### Finding \(a_1\): Take One Derivative

For \(a_1\), cover up $$(x+1)^3$$, **differentiate once**, then substitute \(x = -1\):

$$a_1 = \left.\frac{d}{dx}\left[\frac{4x^3 + 16x^2 + 23x + 13}{(x+2)}\right]\right|_{x=-1} = 1$$

$$\boxed{a_1 = 1}$$

### Finding \(a_2\): Take Two Derivatives (with \(\frac{1}{2!}\))

$$a_2 = \left.\frac{1}{2!}\frac{d^2}{dx^2}\left[\frac{4x^3 + 16x^2 + 23x + 13}{(x+2)}\right]\right|_{x=-1} = 3$$

$$\boxed{a_2 = 3}$$

### The General Formula for Repeated Root Coefficients

For a repeated factor $$(x - \lambda)^r$$, the coefficients are:

$$\boxed{a_j = \left.\frac{1}{j!} \frac{d^j}{dx^j}\left[(x-\lambda)^r F(x)\right]\right|_{x=\lambda}}$$

where \(j = 0, 1, 2, \ldots, r-1\).

### Final Answer

$$F(x) = \frac{2}{(x+1)^3} + \frac{1}{(x+1)^2} + \frac{3}{x+1} + \frac{1}{x+2}$$

> **Honest warning:** As the order of the repeated root grows, taking higher derivatives gets messy fast. That's why we have better methods — coming up next!

---

## Page 4: Method 2 — Hybrid Method (Heaviside + Clearing Fractions)

### The Strategy

Instead of taking painful higher-order derivatives, we:
1. Use Heaviside to find the **easy** coefficients (\(k\) and \(a_0\))
2. Substitute those known values back in
3. **Multiply both sides by the full denominator** to clear all fractions
4. **Match coefficients** of like powers of \(x\) to find the rest

### Step 1: Use Heaviside for the Easy Ones

From the previous page, we already know:
$$k = 1, \quad a_0 = 2$$

So we write:

$$\frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)} = \frac{2}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{1}{x+2}$$

### Step 2: Multiply Both Sides by $$(x+1)^3(x+2)$$

$$4x^3 + 16x^2 + 23x + 13 = 2(x+2) + a_1(x+1)(x+2) + a_2(x+1)^2(x+2) + (x+1)^3$$

### Step 3: Expand the Right Side

After expanding and collecting terms by power of \(x\):

$$\text{RHS} = (1 + a_2)x^3 + (a_1 + 4a_2 + 3)x^2 + (3a_1 + 5a_2 + 5)x + (2a_1 + 2a_2 + 5)$$

### Step 4: Match Coefficients

| Power | Left Side | Right Side | Equation |
|-------|-----------|------------|----------|
| \(x^3\) | 4 | \(1 + a_2\) | \(a_2 = 3\) ✅ |
| \(x^2\) | 16 | \(a_1 + 4a_2 + 3\) | \(a_1 = 1\) ✅ |
| \(x^1\) | 23 | \(3a_1 + 5a_2 + 5\) | \(3+15+5=23\) ✓ (check) |
| \(x^0\) | 13 | \(2a_1 + 2a_2 + 5\) | \(2+6+5=13\) ✓ (check) |

The last two rows are **free checks** — if they work, your answer is almost certainly correct!

### Result

$$\boxed{a_1 = 1, \quad a_2 = 3}$$

$$F(x) = \frac{2}{(x+1)^3} + \frac{1}{(x+1)^2} + \frac{3}{x+1} + \frac{1}{x+2}$$

> **Why is this better?** Matching polynomial coefficients is straightforward algebra — no calculus required after the first step!

---

## Page 5: Method 3 — Shortcuts (The Slickest Approach)

### The Setup (Same Starting Point)

After finding \(k = 1\) and \(a_0 = 2\) by Heaviside, we have:

$$\frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)} = \frac{2}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{1}{x+2}$$

Two unknowns remain: \(a_1\) and \(a_2\).

### Shortcut 1: Multiply by \(x\), Then Let \(x \to \infty\)

Multiply **both sides** by \(x\):

$$\frac{4x^4 + 16x^3 + 23x^2 + 13x}{(x+1)^3(x+2)} = \frac{2x}{(x+1)^3} + \frac{a_1 x}{(x+1)^2} + \frac{a_2 x}{x+1} + \frac{x}{x+2}$$

Now let \(x \to \infty\). Each term simplifies because the highest powers dominate:

$$\frac{4x^4}{x^4} \to 4 \qquad \frac{2x}{x^3} \to 0 \qquad \frac{a_1 x}{x^2} \to 0 \qquad \frac{a_2 x}{x} \to a_2 \qquad \frac{x}{x} \to 1$$

So:

$$4 = 0 + 0 + a_2 + 1 \implies \boxed{a_2 = 3}$$

> **Why does this work?** As \(x \to \infty\), terms with higher powers in the denominator vanish, leaving only the leading-order terms. It's a clever way to isolate one coefficient at a time!

### Shortcut 2: Plug in a Convenient Value of \(x\)

Now that \(a_2 = 3\) is known, only \(a_1\) remains. Substitute any convenient value — let's use \(x = 0\):

$$\frac{13}{(1)^3(2)} = \frac{2}{1} + \frac{a_1}{1} + \frac{3}{1} + \frac{1}{2}$$

$$\frac{13}{2} = 2 + a_1 + 3 + \frac{1}{2}$$

$$6.5 = 5.5 + a_1 \implies \boxed{a_1 = 1}$$

### Why These Shortcuts Are Powerful

| Method | Requires | Best When |
|--------|----------|-----------|
| Pure Heaviside | Repeated differentiation | Low-order repeated roots |
| Hybrid (clearing fractions) | Polynomial algebra | Multiple unknowns remain |
| Shortcuts (\(x \to \infty\), plug-in) | Simple arithmetic | You want speed and elegance |

In practice, **combine all three** — use whichever tool is easiest for each coefficient!

---

## Page 6: Special Case — When Numerator and Denominator Have the Same Degree (\(m = n\))

### What Makes This "Improper"?

A rational function \(F(x) = \frac{N(x)}{D(x)}\) is called **improper** when the degree of the numerator \(m\) is **greater than or equal to** the degree of the denominator \(n\).

Normally, partial fractions require a **proper** function (\(m < n\)). For the general improper case, you'd do polynomial long division first. But there's a **special shortcut** when \(m = n\) exactly.

### The \(m = n\) Rule

When the numerator and denominator have the **same degree**, you can write:

$$F(x) = \frac{b_n x^n + b_{n-1}x^{n-1} + \cdots}{x^n + a_{n-1}x^{n-1} + \cdots} = b_n + \frac{k_1}{x - \lambda_1} + \frac{k_2}{x - \lambda_2} + \cdots + \frac{k_n}{x - \lambda_n}$$

> **Key insight:** The only difference from the proper case is the **extra constant \(b_n\)** (the leading coefficient of the numerator). Everything else — finding \(k_1, k_2, \ldots\) — works exactly the same way as if \(F(x)\) were proper!

### Example B.11: Walking Through It

$$F(x) = \frac{3x^2 + 9x - 20}{(x-2)(x+3)}$$

Here \(m = n = 2\), and the leading coefficient of the numerator is \(b_2 = 3\).

**Set up:**

$$F(x) = 3 + \frac{k_1}{x-2} + \frac{k_2}{x+3}$$

**Find \(k_1\)** (cover up \((x-2)\), set \(x = 2\)):

$$k_1 = \left.\frac{3x^2 + 9x - 20}{(x+3)}\right|_{x=2} = \frac{12 + 18 - 20}{5} = \frac{10}{5} = 2$$

**Find \(k_2\)** (cover up \((x+3)\), set \(x = -3\)):

$$k_2 = \left.\frac{3x^2 + 9x - 20}{(x-2)}\right|_{x=-3} = \frac{27 - 27 - 20}{-5} = \frac{-20}{-5} = 4$$

**Final Answer:**

$$\boxed{F(x) = 3 + \frac{2}{x-2} + \frac{4}{x+3}}$$

### The Takeaway

$$\text{Same degree} \implies \text{just add } b_n \text{ as a constant out front, then proceed normally.}$$

No long division needed. Just recognize the pattern! ✨

---

## Page 7: Recap and Summary

### What We Covered

This section was all about handling **repeated factors** in partial fraction expansion. Here's the complete picture:

---

### 1. Setting Up the Form ✅

For a repeated factor $$(x - \lambda)^r$$, you need **one term per power**:

$$\frac{a_0}{(x-\lambda)^r} + \frac{a_1}{(x-\lambda)^{r-1}} + \cdots + \frac{a_{r-1}}{x-\lambda}$$

Never write just one term for a repeated factor!

---

### 2. Three Methods for Finding Coefficients ✅

| Method | How It Works | Pros | Cons |
|--------|-------------|------|------|
| **Pure Heaviside** | Differentiate \(j\) times, divide by \(j!\), evaluate at root | Systematic | Gets messy for high orders |
| **Hybrid (Clearing Fractions)** | Use Heaviside for easy ones, then match polynomial coefficients | Clean algebra, built-in checks | More setup work |
| **Shortcuts** | Multiply by \(x\), let \(x \to \infty\); or plug in convenient \(x\) values | Fast and elegant | Requires some intuition |

---

### 3. The Heaviside Formula for Repeated Roots ✅

$$a_j = \left.\frac{1}{j!} \frac{d^j}{dx^j}\left[(x-\lambda)^r F(x)\right]\right|_{x=\lambda}, \quad j = 0, 1, \ldots, r-1$$

---

### 4. The \(m = n\) Special Case ✅

When numerator and denominator have the same degree:

$$F(x) = b_n + \frac{k_1}{x-\lambda_1} + \frac{k_2}{x-\lambda_2} + \cdots$$

Find all \(k_i\) exactly as you would for a proper function. Just don't forget the \(b_n\) out front!

---

### 5. The Running Example — Final Answer ✅

$$F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)} = \frac{2}{(x+1)^3} + \frac{1}{(x+1)^2} + \frac{3}{x+1} + \frac{1}{x+2}$$

All three methods give the same answer — as they should!

---

### Golden Rules to Remember

> 🔑 **Rule 1:** Count your terms carefully — one per power of each repeated factor.
>
> 🔑 **Rule 2:** Use Heaviside for the easiest coefficients first, then switch methods.
>
> 🔑 **Rule 3:** Always use the extra equations as a **