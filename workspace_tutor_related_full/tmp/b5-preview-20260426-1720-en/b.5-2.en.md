# B.5-2 The Heaviside "Cover-Up" Method

---

## Page 1: Section Overview

Welcome! In this section, we're going to learn one of the most satisfying shortcuts in all of mathematics — the **Heaviside "Cover-Up" Method** for partial fraction expansion.

### What's the Big Picture?

Remember that partial fractions let us break a complicated rational function like:

$$F(x) = \frac{2x^2 + 9x - 11}{(x+1)(x-2)(x+3)}$$

into simpler pieces like:

$$F(x) = \frac{3}{x+1} + \frac{1}{x-2} - \frac{2}{x+3}$$

The old way (solving simultaneous equations) works, but it can be slow and tedious. The **Heaviside method** lets you find each coefficient *almost instantly* — sometimes in your head!

### What We'll Cover

| Topic | What You'll Learn |
|---|---|
| **Distinct real factors** | The core "cover-up" trick |
| **Complex factors** | Applying the same trick to complex roots |
| **Quadratic factors** | Combining complex pairs into one quadratic term |
| **Shortcuts** | Smart substitutions to find remaining unknowns |

### The Core Idea in One Sentence

> To find the coefficient for a particular factor, **cover it up** with your finger, then **plug in the root** of that factor into what's left.

That's really it. Let's build up the full picture, step by step.

---

## Page 2: The Formula Behind the Method

### Why Does "Covering Up" Actually Work?

Let's derive this properly so it makes complete sense.

Suppose we have a proper rational function with **distinct** (non-repeated) factors in the denominator:

$$F(x) = \frac{P(x)}{(x - \lambda_1)(x - \lambda_2) \cdots (x - \lambda_n)}$$

Its partial fraction expansion looks like:

$$F(x) = \frac{k_1}{x - \lambda_1} + \frac{k_2}{x - \lambda_2} + \cdots + \frac{k_n}{x - \lambda_n} \tag{B.23}$$

### Isolating One Coefficient

To find $$k_1$$, multiply **both sides** by $$(x - \lambda_1)$$:

$$(x - \lambda_1) F(x) = k_1 + \frac{k_2(x-\lambda_1)}{x-\lambda_2} + \frac{k_3(x-\lambda_1)}{x-\lambda_3} + \cdots$$

Now let $$x = \lambda_1$$. Every term on the right **except** $$k_1$$ contains a factor $$(x - \lambda_1)$$, which becomes **zero**. So:

$$k_1 = (x - \lambda_1) F(x)\Big|_{x = \lambda_1}$$

### The General Formula

The same logic works for any coefficient:

$$\boxed{k_r = (x - \lambda_r)\, F(x)\Big|_{x = \lambda_r}} \quad r = 1, 2, \ldots, n \tag{B.24}$$

### What Does "Cover Up" Mean Physically?

When you compute $$(x - \lambda_r) \cdot F(x)$$, you're multiplying the numerator by $$(x - \lambda_r)$$ and dividing by the denominator. But the denominator **already contains** $$(x - \lambda_r)$$, so they **cancel**!

The result: you just **remove** (cover up) the factor $$(x - \lambda_r)$$ from the denominator, then substitute $$x = \lambda_r$$ into everything else.

> 💡 **Mental image:** Put your finger over the factor you're solving for. Evaluate what you can still see at the root of that factor.

---

## Page 3: The Cover-Up Method — Worked Example with Real Factors

### Example B.9 — Step by Step

Find the partial fraction expansion of:

$$F(x) = \frac{2x^2 + 9x - 11}{(x+1)(x-2)(x+3)} = \frac{k_1}{x+1} + \frac{k_2}{x-2} + \frac{k_3}{x+3}$$

The three factors are $$(x+1)$$, $$(x-2)$$, and $$(x+3)$$, with roots $$x = -1$$, $$x = 2$$, and $$x = -3$$.

---

### Finding $$k_1$$: Cover up $$(x+1)$$, set $$x = -1$$

$$k_1 = \frac{2x^2 + 9x - 11}{\cancel{(x+1)}(x-2)(x+3)}\Bigg|_{x=-1} = \frac{2(-1)^2 + 9(-1) - 11}{(-1-2)(-1+3)}$$

$$= \frac{2 - 9 - 11}{(-3)(2)} = \frac{-18}{-6} = \boxed{3}$$

---

### Finding $$k_2$$: Cover up $$(x-2)$$, set $$x = 2$$

$$k_2 = \frac{2x^2 + 9x - 11}{(x+1)\cancel{(x-2)}(x+3)}\Bigg|_{x=2} = \frac{2(4) + 9(2) - 11}{(2+1)(2+3)}$$

$$= \frac{8 + 18 - 11}{(3)(5)} = \frac{15}{15} = \boxed{1}$$

---

### Finding $$k_3$$: Cover up $$(x+3)$$, set $$x = -3$$

$$k_3 = \frac{2x^2 + 9x - 11}{(x+1)(x-2)\cancel{(x+3)}}\Bigg|_{x=-3} = \frac{2(9) + 9(-3) - 11}{(-3+1)(-3-2)}$$

$$= \frac{18 - 27 - 11}{(-2)(-5)} = \frac{-20}{10} = \boxed{-2}$$

---

### Final Answer

$$\boxed{F(x) = \frac{3}{x+1} + \frac{1}{x-2} - \frac{2}{x+3}}$$

> ✅ **Notice how fast that was!** Three independent calculations, no simultaneous equations needed.

---

## Page 4: Handling Complex Factors

### The Good News

The cover-up formula works **exactly the same way** even when the roots are complex numbers. The algebra gets a bit messier, but the method is identical.

### Example

$$F(x) = \frac{4x^2 + 2x + 18}{(x+1)(x+2-j3)(x+2+j3)} = \frac{k_1}{x+1} + \frac{k_2}{x+2-j3} + \frac{k_3}{x+2+j3} \tag{B.25}$$

The three roots are: $$\lambda_1 = -1$$, $$\lambda_2 = -2+j3$$, $$\lambda_3 = -2-j3$$

---

### Finding $$k_1$$: Cover up $$(x+1)$$, set $$x = -1$$

$$k_1 = \frac{4(1) + 2(-1) + 18}{(-1+2-j3)(-1+2+j3)} = \frac{4 - 2 + 18}{(1-j3)(1+j3)} = \frac{20}{1+9} = \frac{20}{10} = \boxed{2}$$

---

### Finding $$k_2$$: Cover up $$(x+2-j3)$$, set $$x = -2+j3$$

After substituting (the algebra is involved but mechanical):

$$k_2 = 1 + j2 = \sqrt{5}\, e^{j63.43°}$$

---

### Key Observation: Conjugate Pairs

When the rational function has **real coefficients**, the coefficients for complex-conjugate factors are always **conjugates of each other**:

$$k_3 = k_2^* = 1 - j2 = \sqrt{5}\, e^{-j63.43°}$$

> 💡 **Shortcut:** For real-coefficient functions, you only need to compute **one** of a conjugate pair — the other is automatically its complex conjugate!

---

### Final Result

$$F(x) = \frac{2}{x+1} + \frac{\sqrt{5}\,e^{j63.43°}}{x+2-j3} + \frac{\sqrt{5}\,e^{-j63.43°}}{x+2+j3}$$

---

## Page 5: Combining Complex Pairs into Quadratic Factors

### Why Bother with Quadratics?

Complex coefficients like $$1 + j2$$ can be awkward to work with. Often it's cleaner to **combine** the two complex-conjugate terms back into a single fraction with a **quadratic denominator** and **real coefficients**.

### Setting Up the Quadratic Form

Instead of splitting into three fractions, we write:

$$F(x) = \frac{4x^2 + 2x + 18}{(x+1)(x^2+4x+13)} = \frac{k_1}{x+1} + \frac{c_1 x + c_2}{x^2+4x+13} \tag{B.26}$$

> Notice: the numerator of the quadratic term is **linear** ($$c_1 x + c_2$$), not just a constant. This is required to match degrees properly.

---

### Step 1: Find $$k_1$$ by Cover-Up (as usual)

$$k_1 = \frac{4x^2 + 2x + 18}{(x+1)\cancel{(x^2+4x+13)}}\Bigg|_{x=-1} = \frac{4 - 2 + 18}{(-1+4-13+13)} $$

More carefully: $$x^2+4x+13$$ at $$x=-1$$ is $$1-4+13 = 10$$

$$k_1 = \frac{4(1)+2(-1)+18}{10} = \frac{20}{10} = \boxed{2}$$

---

### Step 2: Clear Fractions to Find $$c_1$$ and $$c_2$$

Substituting $$k_1 = 2$$ and multiplying both sides by $$(x+1)(x^2+4x+13)$$:

$$4x^2 + 2x + 18 = 2(x^2+4x+13) + (c_1 x + c_2)(x+1)$$

Expanding the right side:

$$= (2+c_1)x^2 + (8+c_1+c_2)x + (26+c_2)$$

Matching coefficients of each power of $$x$$:

| Power | Left side | Right side | Equation |
|---|---|---|---|
| $$x^2$$ | 4 | $$2 + c_1$$ | $$c_1 = 2$$ |
| $$x^1$$ | 2 | $$8 + c_1 + c_2$$ | $$c_2 = -8$$ |
| $$x^0$$ | 18 | $$26 + c_2$$ | ✅ checks out |

### Final Answer

$$\boxed{F(x) = \frac{2}{x+1} + \frac{2x-8}{x^2+4x+13}}$$

---

## Page 6: Shortcuts for Finding $$c_1$$ and $$c_2$$

### The Problem with Clearing Fractions

Clearing fractions and matching coefficients always works, but it can be tedious. Here are two elegant shortcuts.

---

### Shortcut 1: Substitute $$x = 0$$

After finding $$k_1 = 2$$, go back to:

$$\frac{4x^2 + 2x + 18}{(x+1)(x^2+4x+13)} = \frac{2}{x+1} + \frac{c_1 x + c_2}{x^2+4x+13}$$

Let $$x = 0$$ on both sides:

$$\frac{18}{(1)(13)} = \frac{2}{1} + \frac{c_2}{13}$$

$$\frac{18}{13} = 2 + \frac{c_2}{13} \implies c_2 = 18 - 26 = \boxed{-8}$$

> ✅ This eliminates $$c_1$$ instantly because the $$c_1 x$$ term vanishes when $$x=0$$.

---

### Shortcut 2: Multiply by $$x$$, then let $$x \to \infty$$

Multiply both sides of the equation by $$x$$:

$$\frac{x(4x^2 + 2x + 18)}{(x+1)(x^2+4x+13)} = \frac{2x}{x+1} + \frac{c_1 x^2 + c_2 x}{x^2+4x+13}$$

As $$x \to \infty$$, only the **highest-power terms** survive:

$$\frac{4x^3}{x^3} = \frac{2x}{x} + \frac{c_1 x^2}{x^2}$$

$$4 = 2 + c_1 \implies c_1 = \boxed{2}$$

---

### When $$x = 0$$ Doesn't Work

If the denominator has $$x$$ as a factor (e.g., $$F(x) = \frac{2x^2+4x+5}{x(x^2+2x+5)}$$), plugging in $$x=0$$ gives $$\infty$$. Instead, choose another convenient value like $$x = 1$$ or $$x = 2$$.

> 💡 **Key insight:** You can substitute **any** value of $$x$$ — pick whatever makes the arithmetic easiest. The $$x \to \infty$$ trick is almost always available and gives you $$c_1$$ quickly.

---

## Page 7: Recap and Summary

### The Big Picture

The Heaviside Cover-Up Method is a fast, elegant way to find partial fraction coefficients. Here's everything in one place.

---

### Core Formula

For distinct factors, the coefficient for the factor $$(x - \lambda_r)$$ is:

$$\boxed{k_r = (x - \lambda_r)\,F(x)\Big|_{x=\lambda_r}}$$

**In plain English:** Cover up the factor $$(x - \lambda_r)$$ in the denominator, then substitute $$x = \lambda_r$$ into what remains.

---

### Summary Table

| Situation | What to Do |
|---|---|
| **Distinct real factors** | Cover up each factor, plug in its root → get coefficient directly |
| **Complex conjugate factors** | Same cover-up method; for real-coefficient functions, $$k_3 = k_2^*$$ automatically |
| **Quadratic (combined) form** | Use cover-up for $$k_1$$; find $$c_1, c_2$$ by clearing fractions or shortcuts |
| **Shortcut for $$c_2$$** | Substitute $$x = 0$$ (if denominator ≠ 0 there) |
| **Shortcut for $$c_1$$** | Multiply by $$x$$, let $$x \to \infty$$ |

---

### Step-by-Step Checklist

1. ✅ **Write out** the partial fraction form with unknown coefficients
2. ✅ **Identify** the root of each factor (set each factor = 0)
3. ✅ **Cover up** the factor, **substitute** the root → coefficient found!
4. ✅ For **quadratic terms**: use $$x=0$$ and/or $$x \to \infty$$ shortcuts
5. ✅ **Verify** by recombining (optional but recommended)

---

### Common Mistakes to Avoid

> ⚠️ **Wrong root:** The factor $$(x+3)$$ has root $$x = -3$$, not $$x = +3$$.

> ⚠️ **Forgetting linear numerator:** For a quadratic denominator term, the numerator must be $$c_1 x + c_2$$, not just a constant $$c$$.

> ⚠️ **Complex conjugate shortcut only works** when all coefficients of $$F(x)$$ are real.

---

## Page 8: Exam-Oriented Quiz Plan

### Quiz Plan — B.5-2 Heaviside Cover-Up Method

---

**Q1.** *(Multiple Choice)* — *Core concept*

To find the coefficient $$k_2$$ in the expansion $$F(x) = \dfrac{P(x)}{(x-\lambda_1)(x-\lambda_2)(x-\lambda_3)}$$, the Heaviside method requires you to:

- A) Solve a system of three simultaneous equations
- B) Cover up $$(x - \lambda_2)$$ in the denominator and substitute $$x = \lambda_2$$
- C) Cover up $$(x - \lambda_2)$$ in the denominator and substitute $$x = \lambda_1$$
- D) Differentiate $$F(x)$$ and evaluate at $$x = \lambda_2$$

> ✅ **Answer: B**

---

**Q2.** *(Multiple Choice)* — *Direct calculation*

Using the cover-up method, find $$k_1$$ for:

$$F(x) = \frac{3x + 5}{(x+1)(x+5)}= \frac{k_1}{x+1} + \frac{k_2}{x+5}$$

- A) $$k_1 = \dfrac{1}{2}$$
- B) $$k_1 = 2$$
- C) $$k_1 = -\dfrac{1}{2}$$
- D) $$k_1 = -2$$

> ✅ **Answer: A** — Cover up $$(x+1)$$, set $$x=-1$$: $$\dfrac{3(-1)+5}{(-1+5)} = \dfrac{2}{4} = \dfrac{1}{2}$$

---

**Q3.** *(Multiple Choice)* — *Identifying roots*

The factor $$(x + 4)$$ in the denominator corresponds to which substitution value in the cover-up method?

- A) $$x = 4$$
- B) $$x = -4$$
- C) $$x = 0$$
- D) $$x = 1/4$$

> ✅ **Answer: B**

---

**Q4.** *(Multiple Choice)* — *Complex conjugate property*

A rational function $$F(x)$$ has **real** coefficients and complex-conjugate poles at $$x = -1 \pm j2$$. If the coefficient for the pole at $$x = -1+j2$$ is found to be $$k = 3 - j4$$, what