# B.5-3 Repeated Factors of Q(x)

---

## Page 1: Section Overview

### What Are We Doing Here?

So far, you've learned how to break apart fractions where every factor in the denominator appears **only once** (simple, unrepeated roots). Life was easy — just use the Heaviside cover-up method and you're done.

But what happens when a factor appears **more than once** in the denominator? Like $$(x+1)^3$$? That's what this section is all about.

---

### The Big Picture

When your denominator has a **repeated factor** like $$(x - \lambda)^r$$, you can't just use one partial fraction term for it. You need **r separate terms**, one for each "power" of that factor.

For example, $$(x+1)^3$$ in the denominator means you need **three** terms:

$$\frac{a_0}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{(x+1)}$$

---

### What You'll Learn in This Section

| Topic | What It Means |
|---|---|
| **Setting up the expansion** | How to write the correct partial fraction form when repeated factors exist |
| **Finding coefficients for unrepeated factors** | Still use the good old Heaviside cover-up |
| **Finding coefficients for repeated factors** | Use a cover-up + differentiation formula |
| **Worked example** | Step-by-step practice with a real problem |

---

### Why Does This Matter?

In signal processing and linear systems, you'll constantly need to invert Laplace transforms or Z-transforms. Those transforms almost always involve rational functions — and repeated poles (repeated factors) show up all the time in real systems. Knowing how to handle them is **essential**.

Let's dig in! 🎯

---

## Page 2: Setting Up the Partial Fraction Form

### The General Setup

Suppose your function looks like this:

$$F(x) = \frac{P(x)}{(x - \lambda)^r (x - \alpha_1)(x - \alpha_2) \cdots (x - \alpha_j)}$$

Here:
- $$(x - \lambda)^r$$ is the **repeated factor** — it appears $r$ times
- $$(x - \alpha_1), (x - \alpha_2), \ldots$$ are **unrepeated (simple) factors**

---

### How to Write the Expansion

The partial fraction expansion is:

$$F(x) = \frac{a_0}{(x-\lambda)^r} + \frac{a_1}{(x-\lambda)^{r-1}} + \cdots + \frac{a_{r-1}}{(x-\lambda)} + \frac{k_1}{x-\alpha_1} + \frac{k_2}{x-\alpha_2} + \cdots + \frac{k_j}{x-\alpha_j}$$

---

### Breaking It Down Visually

Think of it in two groups:

```
┌─────────────────────────────────────────────┐
│  REPEATED FACTOR GROUP: (x - λ)^r           │
│  → Needs r terms, from power r down to 1    │
│  → Coefficients: a₀, a₁, ..., a_{r-1}      │
├─────────────────────────────────────────────┤
│  SIMPLE FACTOR GROUP                        │
│  → One term per simple factor               │
│  → Coefficients: k₁, k₂, ..., kⱼ          │
└─────────────────────────────────────────────┘
```

---

### Key Rule to Remember

> 🔑 **For every repeated factor $$(x - \lambda)^r$$, you need exactly $r$ partial fraction terms — one for each power from $r$ down to $1$.**

---

### Quick Check: Can You Set It Up?

If you have:

$$F(x) = \frac{P(x)}{(x-3)^2(x+5)}$$

The correct setup is:

$$F(x) = \frac{a_0}{(x-3)^2} + \frac{a_1}{(x-3)} + \frac{k_1}{(x+5)}$$

Notice: $$(x-3)^2$$ gives **two** terms. $$(x+5)$$ gives **one** term. Total: **three** terms for three factors (counting multiplicity). ✅

---

## Page 3: Finding the Coefficients — The Formula

### Step 1: Simple Factors — Easy!

For the unrepeated factors, **nothing changes**. Use the same Heaviside cover-up you already know:

$$k_i = (x - \alpha_i) F(x) \Big|_{x = \alpha_i}$$

Just cover up $$(x - \alpha_i)$$ in the denominator and plug in $$x = \alpha_i$$. Done. ✅

---

### Step 2: Repeated Factor Coefficients — The New Stuff

To find the coefficients $$a_0, a_1, \ldots, a_{r-1}$$ for the repeated factor $$(x-\lambda)^r$$:

**First**, define a helper function by "concealing" (removing) the repeated factor from the denominator:

$$G(x) = (x - \lambda)^r \cdot F(x)$$

This just means: **cross out $$(x-\lambda)^r$$ from the denominator of $F(x)$**.

---

### The Master Formula

$$\boxed{a_j = \frac{1}{j!} \frac{d^j}{dx^j} G(x) \Bigg|_{x = \lambda}}$$

where $$G(x) = (x-\lambda)^r F(x)$$

Let's unpack each coefficient one by one:

---

### Finding Each Coefficient

| Coefficient | Formula | What to Do |
|---|---|---|
| $$a_0$$ | $$G(x)\big\|_{x=\lambda}$$ | Cover up $$(x-\lambda)^r$$, plug in $$x = \lambda$$ |
| $$a_1$$ | $$\frac{d}{dx}G(x)\big\|_{x=\lambda}$$ | Cover up, take **1st derivative**, plug in $$x = \lambda$$ |
| $$a_2$$ | $$\frac{1}{2!}\frac{d^2}{dx^2}G(x)\big\|_{x=\lambda}$$ | Cover up, take **2nd derivative**, divide by $$2!$$, plug in |
| $$a_j$$ | $$\frac{1}{j!}\frac{d^j}{dx^j}G(x)\big\|_{x=\lambda}$$ | Cover up, take **jth derivative**, divide by $$j!$$, plug in |

---

### Why the $j!$ Factor?

Think about a Taylor series. When you expand a polynomial around $$x = \lambda$$:

$$G(x) = a_0 + a_1(x-\lambda) + a_2(x-\lambda)^2 + \cdots$$

Taking the $$j$$-th derivative and evaluating at $$x = \lambda$$ gives $$j! \cdot a_j$$. So you **divide by $$j!$$** to isolate $$a_j$$.

> 💡 The formula is essentially reading off Taylor series coefficients!

---

## Page 4: Worked Example — Step by Step

### The Problem

Expand $$F(x)$$ into partial fractions:

$$F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)}$$

---

### Step 1: Write the Correct Form

We have $$(x+1)^3$$ (repeated, order 3) and $$(x+2)$$ (simple). So:

$$F(x) = \frac{a_0}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{(x+1)} + \frac{k}{x+2}$$

Four unknowns: $$a_0, a_1, a_2, k$$. Let's find them all.

---

### Step 2: Find $k$ (Simple Factor, Heaviside Cover-Up)

Cover up $$(x+2)$$ and set $$x = -2$$:

$$k = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3} \Bigg|_{x=-2}$$

$$= \frac{4(-8) + 16(4) + 23(-2) + 13}{(-1)^3} = \frac{-32 + 64 - 46 + 13}{-1} = \frac{-1}{-1} = \boxed{1}$$

---

### Step 3: Define $G(x)$ for the Repeated Factor

Cover up $$(x+1)^3$$ from $$F(x)$$:

$$G(x) = (x+1)^3 \cdot F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{x+2}$$

---

### Step 4: Find $a_0$

Set $$x = -1$$ in $$G(x)$$:

$$a_0 = G(-1) = \frac{4(-1)^3 + 16(-1)^2 + 23(-1) + 13}{(-1)+2} = \frac{-4 + 16 - 23 + 13}{1} = \frac{2}{1} = \boxed{2}$$

---

### Step 5: Find $a_1$

Take the first derivative of $$G(x)$$, then set $$x = -1$$.

Using the quotient rule on $$G(x) = \frac{4x^3 + 16x^2 + 23x + 13}{x+2}$$:

$$G'(x) = \frac{(12x^2 + 32x + 23)(x+2) - (4x^3 + 16x^2 + 23x + 13)(1)}{(x+2)^2}$$

At $$x = -1$$:

- Numerator: $$(12 - 32 + 23)(1) - (-4 + 16 - 23 + 13) = (3)(1) - (2) = 1$$
- Denominator: $$(1)^2 = 1$$

$$a_1 = G'(-1) = \frac{1}{1} = \boxed{1}$$

---

### Step 6: Find $a_2$

Take the second derivative of $$G(x)$$, divide by $$2!$$, set $$x = -1$$:

$$a_2 = \frac{1}{2!} G''(-1)$$

After computing $$G''(x)$$ (using the quotient rule again) and evaluating at $$x = -1$$, we get:

$$G''(-1) = 6 \quad \Rightarrow \quad a_2 = \frac{6}{2} = \boxed{3}$$

---

### Final Answer

$$\boxed{F(x) = \frac{2}{(x+1)^3} + \frac{1}{(x+1)^2} + \frac{3}{x+1} + \frac{1}{x+2}}$$

---

## Page 5: Recap and Summary

### What We Covered in B.5-3

Let's bring everything together in one clean picture.

---

### The Core Idea

> When a denominator has a **repeated factor** $$(x - \lambda)^r$$, you need **r partial fraction terms** — one for each power from $$r$$ down to $$1$$.

---

### The Two-Group Strategy

$$F(x) = \underbrace{\frac{a_0}{(x-\lambda)^r} + \cdots + \frac{a_{r-1}}{(x-\lambda)}}_{\text{r terms for repeated factor}} + \underbrace{\frac{k_1}{x-\alpha_1} + \cdots + \frac{k_j}{x-\alpha_j}}_{\text{one term per simple factor}}$$

---

### How to Find Each Type of Coefficient

**For simple factor coefficients** $$k_i$$:
$$k_i = (x - \alpha_i)F(x)\Big|_{x=\alpha_i}$$
→ Cover up the factor, plug in the root. That's it.

**For repeated factor coefficients** $$a_j$$:

1. Form $$G(x) = (x-\lambda)^r F(x)$$ — just remove $$(x-\lambda)^r$$ from the denominator
2. Apply the formula:

$$a_j = \frac{1}{j!} \frac{d^j G}{dx^j}\Bigg|_{x=\lambda}$$

| $$j$$ | Formula |
|---|---|
| 0 | $$G(\lambda)$$ — just plug in |
| 1 | $$G'(\lambda)$$ — first derivative, plug in |
| 2 | $$\frac{1}{2}G''(\lambda)$$ — second derivative, divide by 2, plug in |

---

### Common Mistakes to Avoid

| ❌ Mistake | ✅ Correct Approach |
|---|---|
| Writing only one term for $$(x-\lambda)^r$$ | Write **r terms**, one per power |
| Forgetting to divide by $$j!$$ | Always divide the $$j$$-th derivative by $$j!$$ |
| Using wrong substitution point | Always substitute $$x = \lambda$$ (the **root** of the repeated factor) |
| Applying Heaviside directly to repeated factor | Use the **derivative formula** for repeated factors |

---

### The Worked Example at a Glance

$$\frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)} = \frac{2}{(x+1)^3} + \frac{1}{(x+1)^2} + \frac{3}{x+1} + \frac{1}{x+2}$$

- $$k = 1$$: found by Heaviside cover-up at $$x = -2$$
- $$a_0 = 2$$: found by $$G(-1)$$
- $$a_1 = 1$$: found by $$G'(-1)$$
- $$a_2 = 3$$: found by $$\frac{1}{2}G''(-1)$$

---

## Page 6: Quiz Plan (Exam-Oriented)

### 📝 Quiz Plan — B.5-3: Repeated Factors of Q(x)

---

**Q1.** *(Multiple Choice)*
If $$F(x) = \frac{P(x)}{(x-2)^3(x+1)}$$, how many partial fraction terms does the expansion have?

- A) 2
- B) 3
- C) 4 ✅
- D) 5

---

**Q2.** *(Multiple Choice)*
Which of the following is the correct partial fraction setup for $$\frac{P(x)}{(x+3)^2(x-1)}$$?

- A) $$\frac{a_0}{(x+3)^2} + \frac{k}{x-1}$$
- B) $$\frac{a_0}{(x+3)^2} + \frac{a_1}{x+3} + \frac{k}{x-1}$$ ✅
- C) $$\frac{a_0}{(x+3)} + \frac{a_1}{(x+3)} + \frac{k}{x-1}$$
- D) $$\frac{a_0}{(x+3)^2} + \frac{a_1}{(x+3)^2} + \frac{k}{x-1}$$

---

**Q3.** *(Multiple Choice)*
To find $$a_0$$ for the repeated factor $$(x - \lambda)^r$$ in $$F(x)$$, you should:

- A) Differentiate $$F(x)$$ once and substitute $$x = \lambda$$
- B) Multiply $$F(x)$$ by $$(x - \lambda)^r$$, differentiate, then substitute $$x = \lambda$$
- C) Multiply $$F(x)$$ by $$(x - \lambda)^r$$ and substitute $$x = \lambda$$ directly ✅
- D) Use the Heaviside method on the simple factors only

---

**Q4.** *(Multiple Choice)*
The formula for $$a_j$$ in the repeated-factor partial fraction expansion is:

- A) $$a_j = \frac{d^j}{dx^j}[(x-\lambda)^r F(x)]\Big|_{x=\lambda}$$
- B) $$a_j = \frac{1}{j!}\frac{d^j}{dx^j}[(x-\lambda)^r F(x)]\Big|_{x=\lambda}$$ ✅
- C) $$a_j = j! \cdot \frac{d^j}{dx^j}[(x-\lambda)^r F(x)]\Big|_{x=\lambda}$$
- D) $$a_j = \frac{1}{j}\frac{d^j}{dx^j}[(x-\lambda)^r F(x)]\Big|_{x=\lambda}$$

---

**Q5.** *(Multiple Choice)*
For $$F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)}$$, what is the value of $$a_0$$?

- A) 1
- B) 3
- C) 2 ✅
- D) 4

---

**Q6.** *(Multiple Choice)*
Why do we divide by $$j!$$ when computing $$a_j$$?

- A) To normalize the result to be between 0 and 1
- B) Because the $$j$$-th derivative of $$(x-\lambda)^j$$ evaluated at $$x=\lambda$$ equals $$j!$$, so dividing isolates $$a_j$$ ✅
- C) Because the Heaviside method requires it for all coefficients
- D) To cancel the repeated factor in the denominator

---

**Q7.** *(Multiple Choice)*
For $$F(x) = \frac{P(x)}{(x-5)^2(x+2)(x-3)}$$, which coefficients are found using the standard Heaviside cover-up (no differentiation needed)?

- A) $$a_0$$ and $$a_1$$ only
- B) $$k_1$$ and $$k_2$$ only ✅
- C) All four coefficients
- D) None — differentiation is always required

---

**Q8.** *(Short Answer)*
Write the correct partial fraction expansion form (don't solve — just set it up) for:

$$F(x) = \frac{3x^2 + 5}{(x-1)^3(x+4)}$$

> **Expected Answer:**
> $$F(x) = \frac{a_0}{(x-