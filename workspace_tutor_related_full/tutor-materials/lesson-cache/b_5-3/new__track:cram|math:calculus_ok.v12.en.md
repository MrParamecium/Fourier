# B.5-3 Repeated Factors of Q(x)

---

## Page 1: Section Overview — What Are We Dealing With?

Welcome! So far, partial fractions have been pretty smooth sailing when every factor in the denominator appears just once. But what happens when a factor shows up **more than once**? That's exactly what this section tackles.

---

### The Problem: Repeated Factors

Imagine you have a fraction like:

$$F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)}$$

Notice that $(x+1)$ appears **three times** (it's cubed). This is called a **repeated factor** — and it breaks the simple Heaviside cover-up method we used before.

---

### Why Does This Matter?

When a factor $(x - \lambda)$ is repeated $r$ times, it contributes **not one, but $r$ separate terms** to the partial fraction expansion. Each power of $(x - \lambda)$ from 1 up to $r$ gets its own term and its own coefficient.

---

### What You'll Learn in This Section

| Topic | What It Means |
|---|---|
| 📐 Setting up the expansion | How to write out all the terms for repeated factors |
| 🔢 Finding coefficients $a_0, a_1, \ldots$ | A systematic formula using derivatives |
| ✅ Worked Example B.10 | Step-by-step practice with a real problem |
| 📝 Summary & Quiz | Consolidate and test your understanding |

---

### The Big Picture Formula (Preview)

For a repeated factor $(x - \lambda)^r$, the coefficient $a_j$ is found by:

$$a_j = \frac{1}{j!} \frac{d^j}{dx^j}\left[(x-\lambda)^r F(x)\right]\Bigg|_{x=\lambda}$$

Don't worry — we'll build up to this step by step! 🎯

---

## Page 2: Setting Up the Partial Fraction Expansion for Repeated Factors

### The General Form

When $F(x)$ has a repeated factor $(x - \lambda)^r$ in the denominator, along with other simple (unrepeated) factors, it looks like:

$$F(x) = \frac{P(x)}{(x-\lambda)^r (x-\alpha_1)(x-\alpha_2)\cdots(x-\alpha_j)}$$

---

### How to Write the Expansion

Here's the key rule:

> **Every power** of the repeated factor, from the highest down to the first, gets its own separate term in the expansion.

So the partial fraction expansion is:

$$F(x) = \frac{a_0}{(x-\lambda)^r} + \frac{a_1}{(x-\lambda)^{r-1}} + \cdots + \frac{a_{r-1}}{(x-\lambda)} + \frac{k_1}{x-\alpha_1} + \frac{k_2}{x-\alpha_2} + \cdots + \frac{k_j}{x-\alpha_j}$$

---

### Breaking This Down

Think of it in two groups:

**Group 1 — The repeated factor terms** (this is the new part!):

$$\frac{a_0}{(x-\lambda)^r} + \frac{a_1}{(x-\lambda)^{r-1}} + \cdots + \frac{a_{r-1}}{(x-\lambda)}$$

- There are exactly $r$ terms here
- The subscript on $a$ starts at 0 and goes up to $r-1$
- The power in the denominator starts at $r$ and counts **down** to 1

**Group 2 — The simple (unrepeated) factor terms** (same as before!):

$$\frac{k_1}{x-\alpha_1} + \frac{k_2}{x-\alpha_2} + \cdots + \frac{k_j}{x-\alpha_j}$$

- These are found using the **same Heaviside cover-up method** as always ✅

---

### Quick Example: Setting Up

For $F(x) = \dfrac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)}$:

- Repeated factor: $(x+1)^3$, so $r = 3$ → gives **3 terms**: $\dfrac{a_0}{(x+1)^3}$, $\dfrac{a_1}{(x+1)^2}$, $\dfrac{a_2}{x+1}$
- Simple factor: $(x+2)$ → gives **1 term**: $\dfrac{k}{x+2}$

$$F(x) = \frac{a_0}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{k}{x+2}$$

Now we need to find $a_0$, $a_1$, $a_2$, and $k$. That's next! 🔜

---

## Page 3: Finding the Coefficients — The Formula

### Step 1: Find the Simple Coefficients $k_i$ (Easy Part)

The coefficients for the **unrepeated** factors are found exactly as before — the **Heaviside cover-up method**:

> Cover the factor $(x - \alpha_i)$ in $F(x)$, then substitute $x = \alpha_i$.

Nothing new here! ✅

---

### Step 2: Find the Repeated Coefficients $a_j$ (The New Part)

Here's the strategy. Start by multiplying both sides of the expansion by $(x - \lambda)^r$:

$$(x-\lambda)^r F(x) = a_0 + a_1(x-\lambda) + a_2(x-\lambda)^2 + \cdots + a_{r-1}(x-\lambda)^{r-1} + \text{(terms with } k_i\text{)}$$

Call the left side $G(x) = (x-\lambda)^r F(x)$ — this is just $F(x)$ with the $(x-\lambda)^r$ **cancelled out** of the denominator.

---

### Finding $a_0$: Set $x = \lambda$

When $x = \lambda$, every term on the right containing $(x - \lambda)$ vanishes:

$$G(\lambda) = a_0$$

$$\boxed{a_0 = (x-\lambda)^r F(x)\Big|_{x=\lambda}}$$

This is still the cover-up method — just cover $(x-\lambda)^r$ and plug in $x = \lambda$. 🎉

---

### Finding $a_1$: Take One Derivative, Then Set $x = \lambda$

Differentiate $G(x)$ once:

$$G'(x) = a_1 + 2a_2(x-\lambda) + \cdots$$

Setting $x = \lambda$ kills all remaining terms:

$$\boxed{a_1 = \frac{d}{dx}\left[(x-\lambda)^r F(x)\right]\Bigg|_{x=\lambda}}$$

---

### The General Formula for $a_j$

Continuing this pattern (differentiate $j$ times, set $x = \lambda$, divide by $j!$ to cancel the factorial from the power rule):

$$\boxed{a_j = \frac{1}{j!} \frac{d^j}{dx^j}\left[(x-\lambda)^r F(x)\right]\Bigg|_{x=\lambda}}$$

### Summary Table

| Coefficient | Formula |
|---|---|
| $a_0$ | $G(x)\big\|_{x=\lambda}$ (no derivative needed) |
| $a_1$ | $G'(x)\big\|_{x=\lambda}$ |
| $a_2$ | $\frac{1}{2!}G''(x)\big\|_{x=\lambda}$ |
| $a_j$ | $\frac{1}{j!}G^{(j)}(x)\big\|_{x=\lambda}$ |

where $G(x) = (x-\lambda)^r F(x)$ (i.e., $F(x)$ with the repeated factor removed from the denominator).

---

## Page 4: Worked Example B.10 — Step by Step

### The Problem

$$F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)}$$

We already set up the expansion:

$$F(x) = \frac{a_0}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{k}{x+2}$$

Now let's find every coefficient, one by one.

---

### Finding $k$ — Heaviside Cover-Up on $(x+2)$

Cover $(x+2)$, substitute $x = -2$:

$$k = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3}\Bigg|_{x=-2}$$

$$= \frac{4(-8) + 16(4) + 23(-2) + 13}{(-1)^3} = \frac{-32 + 64 - 46 + 13}{-1} = \frac{-1}{-1} = \boxed{1}$$

---

### Finding $a_0$ — Cover Up $(x+1)^3$, Substitute $x = -1$

$$G(x) = \frac{4x^3 + 16x^2 + 23x + 13}{x+2}$$

$$a_0 = G(-1) = \frac{4(-1) + 16(1) + 23(-1) + 13}{-1+2} = \frac{-4 + 16 - 23 + 13}{1} = \boxed{2}$$

---

### Finding $a_1$ — First Derivative of $G(x)$, Then $x = -1$

Using the quotient rule on $G(x) = \dfrac{4x^3 + 16x^2 + 23x + 13}{x+2}$:

$$G'(x) = \frac{(12x^2 + 32x + 23)(x+2) - (4x^3 + 16x^2 + 23x + 13)(1)}{(x+2)^2}$$

At $x = -1$:
- Numerator: $(12 - 32 + 23)(1) - (-4 + 16 - 23 + 13) = (3)(1) - (2) = 1$
- Denominator: $(1)^2 = 1$

$$a_1 = G'(-1) = \frac{1}{1} = \boxed{1}$$

---

### Finding $a_2$ — Second Derivative of $G(x)$, Divide by $2!$, Then $x = -1$

After computing $G''(x)$ (this is a bit of algebra — trust the process!):

$$a_2 = \frac{1}{2!} G''(-1) = \boxed{3}$$

---

### Final Answer

$$\boxed{F(x) = \frac{2}{(x+1)^3} + \frac{1}{(x+1)^2} + \frac{3}{x+1} + \frac{1}{x+2}}$$

---

### ✅ Quick Sanity Check

You can verify this by combining the right-hand side over a common denominator and checking that you get back the original numerator $4x^3 + 16x^2 + 23x + 13$. Always a good habit!

---

## Page 5: Recap & Summary

### What Did We Learn in B.5-3?

Let's pull everything together in one clean review.

---

### 🔑 Key Concept: Repeated Factors Need Multiple Terms

When $(x - \lambda)^r$ appears in the denominator, you need **$r$ separate partial fraction terms** — one for each power from $r$ down to 1.

$$\frac{a_0}{(x-\lambda)^r} + \frac{a_1}{(x-\lambda)^{r-1}} + \cdots + \frac{a_{r-1}}{(x-\lambda)}$$

---

### 🔑 Key Formula: The Coefficient Formula

Define $G(x) = (x-\lambda)^r F(x)$ (remove the repeated factor from the denominator). Then:

$$a_j = \frac{1}{j!} \frac{d^j G}{dx^j}\Bigg|_{x=\lambda} \quad \text{for } j = 0, 1, 2, \ldots, r-1$$

| $j$ | Formula for $a_j$ |
|---|---|
| 0 | $G(\lambda)$ — just plug in, no derivative |
| 1 | $G'(\lambda)$ |
| 2 | $\frac{1}{2} G''(\lambda)$ |
| $j$ | $\frac{1}{j!} G^{(j)}(\lambda)$ |

---

### 🔑 Simple Factors: Business as Usual

The coefficients $k_i$ for **unrepeated** factors are still found by the plain Heaviside cover-up method — no derivatives needed.

---

### 🔑 Step-by-Step Procedure

```
1. Write out the full partial fraction expansion
   (one term per power of each repeated factor,
    one term per simple factor)

2. Find k_i for simple factors using Heaviside cover-up

3. Form G(x) = (x - λ)^r · F(x)

4. Find a_0 = G(λ)

5. Find a_1 = G'(λ)

6. Find a_2 = (1/2!) · G''(λ)

7. Continue until all coefficients are found
```

---

### 🔑 Common Mistakes to Avoid

| ❌ Mistake | ✅ Correction |
|---|---|
| Forgetting a term in the expansion | Remember: $r$ terms for a factor of order $r$ |
| Forgetting to divide by $j!$ | The formula has $\frac{1}{j!}$ — don't skip it! |
| Applying cover-up to the wrong factor | Cover $(x-\lambda)^r$ (the whole power), not just $(x-\lambda)$ |
| Differentiating $F(x)$ instead of $G(x)$ | Always differentiate $G(x) = (x-\lambda)^r F(x)$ |

---

### 🔑 Example B.10 at a Glance

$$F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)} = \frac{2}{(x+1)^3} + \frac{1}{(x+1)^2} + \frac{3}{x+1} + \frac{1}{x+2}$$

- $k = 1$ (Heaviside on $(x+2)$)
- $a_0 = 2$ (cover-up, $j=0$)
- $a_1 = 1$ (one derivative, $j=1$)
- $a_2 = 3$ (two derivatives ÷ $2!$, $j=2$)

---

## Page 6: Quiz Plan (Exam-Oriented)

### 📝 Quiz Plan — B.5-3: Repeated Factors of Q(x)

---

**Q1.** *(Multiple Choice)*
A function $F(x)$ has the denominator $(x-3)^4(x+1)$. How many total terms appear in its partial fraction expansion?

- A) 2
- B) 4
- C) 5
- D) 6

> **Target concept:** Counting terms — $r$ terms for the repeated factor plus 1 for the simple factor.

---

**Q2.** *(Multiple Choice)*
For the repeated factor $(x - \lambda)^r$ in the denominator of $F(x)$, which of the following correctly represents the partial fraction terms contributed by this factor?

- A) $\dfrac{a_0}{(x-\lambda)^r}$ only
- B) $\dfrac{a_0}{x-\lambda} + \dfrac{a_1}{(x-\lambda)^2} + \cdots + \dfrac{a_{r-1}}{(x-\lambda)^r}$
- C) $\dfrac{a_0}{(x-\lambda)^r} + \dfrac{a_1}{(x-\lambda)^{r-1}} + \cdots + \dfrac{a_{r-1}}{(x-\lambda)}$
- D) $\dfrac{a_0 + a_1 x + \cdots + a_{r-1}x^{r-1}}{(x-\lambda)^r}$

> **Target concept:** Correct structure of the partial fraction expansion for repeated factors.

---

**Q3.** *(Multiple Choice)*
To find the coefficient $a_j$ for a repeated factor $(x-\lambda)^r$, you must first form $G(x) = (x-\lambda)^r F(x)$. What is $G(x)$ in plain terms?

- A) $F(x)$ multiplied by $(x-\lambda)^r$, leaving the denominator unchanged
- B) $F(x)$ with the factor $(x-\lambda)^r$ **removed** from the denominator
- C) The derivative of $F(x)$
- D) $F(x)$ evaluated at $x = \lambda$

> **Target concept:** Understanding what $G(x)$ represents physically.

---

**Q4.** *(Multiple Choice)*
The general formula for $a_j$ is:

- A) $a_j = j! \cdot \dfrac{d^j G}{dx^j}\Bigg|_{x=\lambda}$
- B) $a_j = \dfrac{d^j G}{dx^j}\Bigg|_{x=\lambda}$
- C) $a_j = \dfrac{1}{j!} \cdot \dfrac{d^j G}{dx^j}\Bigg|_{x=\lambda}$
- D) $a_j = \dfrac{1}{j} \cdot \dfrac{d^j G}{dx^j}\Bigg|_{x=\lambda}$

> **Target concept:** Memorizing and applying the correct coefficient formula.

---

**Q5.** *(Multiple Choice)*
For $F(x) = \dfrac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)}$, what is the value of $a_0$?

- A) 1
- B) 3
- C) 2
- D) 4

> **Target concept:** Applying the $j=0$ case (cover-up, no derivative).

---

**Q6.** *(Multiple Choice)*
Which method is used to find the coefficients $k_i$ corresponding to the **unrepeated** (simple) factors in a partial fraction expansion that also contains repeated factors?

- A) The derivative formula with $j!$
- B) The standard Heaviside cover-up method
- C) Polynomial