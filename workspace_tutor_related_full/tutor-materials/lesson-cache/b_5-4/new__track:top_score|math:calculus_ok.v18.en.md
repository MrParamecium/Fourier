# B.5-4: A Combination of Heaviside and Clearing Fractions

---

## Page 1: Section Overview — Why Do We Need a Hybrid Method?

Welcome! In this section, we're going to learn a **smarter, more efficient way** to find partial fraction coefficients when you have repeated roots.

### The Problem with Pure Heaviside for Repeated Roots

You've already seen two methods:

1. **Heaviside "Cover-Up"** — Fast and elegant, but for repeated roots it requires taking **repeated derivatives**, which gets messy quickly.
2. **Clearing Fractions** — Always works, but gives you a big system of equations to solve.

For example, if you have a factor like $$(x+1)^5$$, the Heaviside method would require you to compute a **4th derivative** just to find one coefficient. That's a lot of work!

### The Solution: A Hybrid Approach

The key insight of this section is:

> **Use each method where it's strongest.**

- Use **Heaviside** for the coefficients that are easy to find (the highest-power repeated root coefficient, and all simple/unrepeated root coefficients).
- Use **clearing fractions** or **clever shortcuts** for the remaining coefficients.

### What You'll Learn on Each Page

| Page | Topic |
|------|-------|
| 2 | Quick review of the example setup |
| 3 | Step 1 — Apply Heaviside for the easy coefficients |
| 4 | Step 2 — Clear fractions to find remaining coefficients |
| 5 | The "multiply by x, let x → ∞" shortcut |
| 6 | The "plug in a convenient value" shortcut |
| 7 | Recap & Summary |
| 8 | Quiz Plan |

Let's dive in! 🎯

---

## Page 2: The Example Setup — What Are We Trying to Expand?

### Our Working Example

Throughout this section, we'll work with the same function from Example B.10:

$$F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)}$$

### Setting Up the Partial Fraction Form

Because $$(x+1)$$ is a **repeated root** (appearing 3 times) and $$(x+2)$$ is a **simple root**, the partial fraction expansion looks like:

$$F(x) = \frac{a_0}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{k}{x+2}$$

> 💡 **Remember the rule:** For a repeated factor $$(x+p)^n$$, you need **n separate terms**, one for each power from 1 up to n.

### What We Need to Find

We have **four unknown coefficients**: $$a_0,\ a_1,\ a_2,\ k$$

Our goal is to find all four as efficiently as possible.

### The Strategy at a Glance

```
Step 1: Use Heaviside to find k and a₀  ← Easy!
Step 2: Use shortcuts to find a₁ and a₂ ← Smarter than pure differentiation
```

Notice that we're **not** going to differentiate twice to find $$a_1$$ and $$a_2$$. Instead, we'll use algebraic tricks. That's the whole point of this section!

---

## Page 3: Step 1 — Using Heaviside for the Easy Coefficients

### Finding k (the Simple Root Coefficient)

To find $$k$$, we use the standard Heaviside cover-up: **conceal** $$(x+2)$$ and substitute $$x = -2$$:

$$k = \left.\frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3}\right|_{x=-2}$$

$$= \frac{4(-8) + 16(4) + 23(-2) + 13}{(-1)^3} = \frac{-32 + 64 - 46 + 13}{-1} = \frac{-1}{-1} = \boxed{1}$$

### Finding a₀ (the Highest-Power Repeated Root Coefficient)

To find $$a_0$$, we **conceal** $$(x+1)^3$$ and substitute $$x = -1$$:

$$a_0 = \left.\frac{4x^3 + 16x^2 + 23x + 13}{(x+2)}\right|_{x=-1}$$

$$= \frac{4(-1) + 16(1) + 23(-1) + 13}{(-1+2)} = \frac{-4 + 16 - 23 + 13}{1} = \frac{2}{1} = \boxed{2}$$

> 💡 **Why is $$a_0$$ easy?** Because concealing $$(x+1)^3$$ leaves a simple expression — no derivatives needed!

### What We Have So Far

Substituting $$k = 1$$ and $$a_0 = 2$$ into our partial fraction setup:

$$\frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)} = \frac{2}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{1}{x+2}$$

We still need $$a_1$$ and $$a_2$$. On to the next steps!

---

## Page 4: Step 2 — Clearing Fractions to Find the Remaining Coefficients

### Multiply Both Sides by $$(x+1)^3(x+2)$$

Starting from:

$$\frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)} = \frac{2}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{1}{x+2}$$

Multiply every term by $$(x+1)^3(x+2)$$:

$$4x^3 + 16x^2 + 23x + 13 = 2(x+2) + a_1(x+1)(x+2) + a_2(x+1)^2(x+2) + (x+1)^3$$

### Expand and Collect by Powers of x

After expanding (this takes some algebra!), the right side becomes:

$$(1 + a_2)x^3 + (a_1 + 4a_2 + 3)x^2 + (5 + 3a_1 + 5a_2)x + (4 + 2a_1 + 2a_2 + 1)$$

### Match Coefficients on Both Sides

| Power | Left Side | Right Side |
|-------|-----------|------------|
| $$x^3$$ | 4 | $$1 + a_2$$ |
| $$x^2$$ | 16 | $$a_1 + 4a_2 + 3$$ |
| $$x^1$$ | 23 | $$5 + 3a_1 + 5a_2$$ |
| $$x^0$$ | 13 | $$4 + 2a_1 + 2a_2 + 1$$ |

### Solve the System

From the $$x^3$$ equation:
$$1 + a_2 = 4 \implies \boxed{a_2 = 3}$$

From the $$x^2$$ equation:
$$a_1 + 4(3) + 3 = 16 \implies a_1 + 15 = 16 \implies \boxed{a_1 = 1}$$

> ✅ **Bonus:** The $$x^1$$ and $$x^0$$ equations give the same values — they serve as a **free check** on your work!

---

## Page 5: The "Multiply by x, Let x → ∞" Shortcut

### A Faster Way to Find a₂

Instead of expanding everything, here's a slick shortcut. Starting from:

$$\frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)} = \frac{2}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{1}{x+2}$$

**Multiply both sides by $$x$$:**

$$\frac{x(4x^3 + 16x^2 + 23x + 13)}{(x+1)^3(x+2)} = \frac{2x}{(x+1)^3} + \frac{a_1 x}{(x+1)^2} + \frac{a_2 x}{x+1} + \frac{x}{x+2}$$

**Now let $$x \to \infty$$:**

Each term simplifies because as $$x \to \infty$$, ratios like $$\frac{x}{x+1} \to 1$$:

$$\lim_{x \to \infty} \frac{x(4x^3 + 16x^2 + \cdots)}{(x+1)^3(x+2)} = \lim_{x \to \infty} \frac{4x^4 + \cdots}{x^4 + \cdots} = 4$$

On the right side:
- $$\frac{2x}{(x+1)^3} \to 0$$ (denominator grows faster)
- $$\frac{a_1 x}{(x+1)^2} \to 0$$ (denominator grows faster)
- $$\frac{a_2 x}{x+1} \to a_2$$
- $$\frac{x}{x+2} \to 1$$

So we get:

$$4 = 0 + 0 + a_2 + 1 \implies \boxed{a_2 = 3}$$

### Why This Works

> 💡 When you multiply by $$x$$ and take $$x \to \infty$$, **only the terms with the lowest-degree denominators survive**. This isolates $$a_2$$ without any messy algebra!

This shortcut **eliminates $$a_1$$** automatically because its term vanishes at infinity.

---

## Page 6: The "Plug in a Convenient Value" Shortcut

### Using a₂ = 3 to Find a₁

After finding $$a_2 = 3$$ (by either method on the previous pages), our equation becomes:

$$\frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)} = \frac{2}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{3}{x+1} + \frac{1}{x+2}$$

Now there's **only one unknown**: $$a_1$$.

### Plug in Any Convenient Value of x

Let's choose $$x = 0$$ (nice and simple!):

**Left side:**
$$\frac{4(0) + 16(0) + 23(0) + 13}{(0+1)^3(0+2)} = \frac{13}{(1)(2)} = \frac{13}{2}$$

**Right side:**
$$\frac{2}{(1)^3} + \frac{a_1}{(1)^2} + \frac{3}{1} + \frac{1}{2} = 2 + a_1 + 3 + \frac{1}{2} = a_1 + \frac{11}{2}$$

**Setting them equal:**
$$\frac{13}{2} = a_1 + \frac{11}{2} \implies a_1 = \frac{13}{2} - \frac{11}{2} = \frac{2}{2} = \boxed{1}$$

### The Final Answer

$$\boxed{F(x) = \frac{2}{(x+1)^3} + \frac{1}{(x+1)^2} + \frac{3}{x+1} + \frac{1}{x+2}}$$

> 💡 **Why x = 0?** It makes arithmetic easy! You can use **any** value of x **except** $$x = -1$$ or $$x = -2$$ (the poles), since those make denominators zero. Common convenient choices: $$x = 0, 1, -3, \ldots$$

---

## Page 7: Recap & Summary

### The Big Picture

The **hybrid method** combines the best of two worlds:

| Method | Best For | Weakness |
|--------|----------|----------|
| Heaviside Cover-Up | Simple roots; highest-power repeated root | Requires derivatives for lower-power repeated roots |
| Clearing Fractions | All coefficients | Can produce large systems of equations |
| **Hybrid** | **Everything — efficiently!** | Requires some planning |

### The Step-by-Step Hybrid Procedure

```
1. Write out the partial fraction form with all unknown coefficients.

2. Use Heaviside to find the EASY coefficients:
   • All simple (unrepeated) root coefficients → cover-up, substitute
   • The HIGHEST-power repeated root coefficient → cover-up, substitute

3. Substitute the known coefficients back into the equation.

4. Find remaining coefficients using shortcuts:
   • Multiply by x, let x → ∞  (isolates the lowest-degree repeated term)
   • Plug in a convenient x value (one unknown at a time)
   • OR clear fractions and match coefficients

5. Use any leftover equations as a CHECK on your answers.
```

### Key Shortcuts Summarized

**Shortcut 1 — The $$x \to \infty$$ trick:**
$$\text{Multiply both sides by } x, \text{ then let } x \to \infty$$
$$\Rightarrow \text{Only terms with degree-1 denominators survive}$$

**Shortcut 2 — Plug in a convenient value:**
$$\text{Once only one unknown remains, substitute any simple } x \text{ value}$$
$$\Rightarrow \text{Solve directly with arithmetic}$$

### Results for Our Example

$$F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)} = \frac{2}{(x+1)^3} + \frac{1}{(x+1)^2} + \frac{3}{x+1} + \frac{1}{x+2}$$

| Coefficient | Value | Method Used |
|-------------|-------|-------------|
| $$k$$ | 1 | Heaviside (simple root) |
| $$a_0$$ | 2 | Heaviside (highest repeated power) |
| $$a_2$$ | 3 | $$x \to \infty$$ shortcut |
| $$a_1$$ | 1 | Plug in $$x = 0$$ |

---

## Page 8: Quiz Plan (Exam-Oriented)

### 📝 Quiz Plan: B.5-4 Hybrid Partial Fraction Method

---

**Q1. (Multiple Choice)**
When using the hybrid method for partial fractions, which coefficients are best found using the Heaviside cover-up method?

- A) All coefficients equally
- B) Only the coefficients of simple (unrepeated) roots
- C) The coefficients of simple roots AND the highest-power repeated root coefficient
- D) Only the lowest-power repeated root coefficients

> ✅ **Answer: C**

---

**Q2. (Multiple Choice)**
For the expansion $$F(x) = \frac{N(x)}{(x+1)^3(x+2)}$$, which coefficient **cannot** be found directly by Heaviside cover-up without differentiation?

- A) The coefficient of $$\frac{1}{(x+1)^3}$$
- B) The coefficient of $$\frac{1}{x+2}$$
- C) The coefficient of $$\frac{1}{(x+1)^2}$$
- D) Both A and B

> ✅ **Answer: C** — $$a_1$$ (coefficient of $$(x+1)^{-2}$$) requires differentiation in pure Heaviside, but can be found by shortcuts in the hybrid method.

---

**Q3. (Multiple Choice)**
You multiply both sides of a partial fraction equation by $$x$$ and let $$x \to \infty$$. Which terms survive on the right-hand side?

- A) Terms with the highest-degree denominators
- B) Terms with degree-1 denominators (i.e., simple factors like $$\frac{k}{x-a}$$)
- C) All terms equally
- D) Only constant terms

> ✅ **Answer: B** — As $$x \to \infty$$, $$\frac{x}{x-a} \to 1$$, but $$\frac{x}{(x-a)^2} \to 0$$, etc.

---

**Q4. (Multiple Choice)**
After finding all but one coefficient in a partial fraction expansion, you want to find the last unknown. Which value of $$x$$ is the **best** choice to substitute?

$$F(x) = \frac{N(x)}{(x+1)^3(x+2)} = \frac{2}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{3}{x+1} + \frac{1}{x+2}$$

- A) $$x = -1$$
- B) $$x = -2$$
- C) $$x = 0$$
- D) $$x = \infty$$

> ✅ **Answer: C** — $$x = -1$$ and $$x = -2$$ make denominators zero. $$x = 0$$ gives clean arithmetic.

---

**Q5. (Multiple Choice)**
When you clear fractions and match coefficients, the equations from **extra** powers of $$x$$ (beyond what you need) are useful because:

- A) They give you additional unknowns to solve for
- B) They serve as a check/verification of your answers
- C) They are always inconsistent and should be ignored
- D) They change the values of the coefficients

> ✅ **Answer: B**

---

**Q6. (Multiple Choice)**
For $$F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)}$$, what is the value of $$k$$ (the coefficient of $$\frac{1}{x+2}$$)?

- A) 2
- B) 3
- C) 1
- D) 4

> ✅ **Answer: C** — Cover up $$(x+2)$$, substitute $$x = -2$$: $$k = \frac{-32+64-46+13}{-1} = 1$$

---

**Q7. (Short Answer)**
Explain in 2–3 sentences why the hybrid method is more efficient than using pure Heaviside for a function like $$\frac{N(x)}{(x+1)^4(x+2)}