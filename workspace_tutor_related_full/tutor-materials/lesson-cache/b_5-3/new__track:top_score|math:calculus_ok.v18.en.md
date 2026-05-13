# B.5-3: Repeated Factors of Q(x)

---

## Page 1: Section Overview — What Are We Dealing With?

So far, we've handled partial fractions where every factor in the denominator appears **exactly once** — those are called *simple* or *unrepeated* factors, and the Heaviside cover-up method handles them beautifully.

But what happens when a factor shows up **more than once**? Like $$(x+1)^3$$ in the denominator? That's what this section is all about.

---

### 🎯 The Big Idea

When a factor **repeats**, we need **more partial fraction terms** to fully capture it. A factor repeated \(r\) times generates \(r\) separate terms in the expansion.

---

### 🗺️ What We'll Cover

| Page | Topic |
|------|-------|
| 2 | What repeated factors look like and how to set up the expansion |
| 3 | Finding the coefficients: the formula and the cover-up + differentiation method |
| 4 | Worked Example B.10 — step by step |
| 5 | Recap & Summary |
| 6 | Quiz |

---

### 🔑 Key Terms to Know Going In

- **Repeated factor**: A factor like $$(x - \lambda)^r$$ where \(r \geq 2\)
- **Unrepeated factor**: A factor like $$(x - \alpha)$$ appearing just once
- **Partial fraction expansion**: Breaking a complicated fraction into simpler pieces
- **Heaviside cover-up**: The trick of multiplying both sides by a factor and then substituting a specific value of \(x\)

---

> 💬 **Think of it this way:** If a simple factor is like a single-story building, a repeated factor is like a multi-story building — you need one "floor" (term) for each story (power).

---

## Page 2: Setting Up the Expansion for Repeated Factors

### The General Form

Suppose \(F(x)\) has a factor $$(x - \lambda)$$ repeated \(r\) times in the denominator, plus some other simple (unrepeated) factors:

$$F(x) = \frac{P(x)}{(x - \lambda)^r (x - \alpha_1)(x - \alpha_2) \cdots (x - \alpha_j)}$$

---

### How to Write the Partial Fraction Expansion

The repeated factor $$(x - \lambda)^r$$ contributes **r separate terms**, one for each power from \(r\) down to \(1\):

$$F(x) = \frac{a_0}{(x-\lambda)^r} + \frac{a_1}{(x-\lambda)^{r-1}} + \cdots + \frac{a_{r-1}}{(x-\lambda)} + \frac{k_1}{x-\alpha_1} + \frac{k_2}{x-\alpha_2} + \cdots + \frac{k_j}{x-\alpha_j}$$

---

### 🧩 Breaking It Down

| Part of denominator | What it contributes to the expansion |
|---|---|
| $$(x-\lambda)^r$$ (repeated, order \(r\)) | \(r\) terms: powers \((x-\lambda)^r, (x-\lambda)^{r-1}, \ldots, (x-\lambda)^1\) |
| $$(x - \alpha_1)$$ (simple) | 1 term: \(\dfrac{k_1}{x - \alpha_1}\) |
| $$(x - \alpha_2)$$ (simple) | 1 term: \(\dfrac{k_2}{x - \alpha_2}\) |

---

### 🔍 A Concrete Example Setup

If $$F(x) = \frac{P(x)}{(x+1)^3(x+2)}$$

Then the expansion looks like:

$$F(x) = \frac{a_0}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{(x+1)} + \frac{k}{x+2}$$

Notice:
- $$(x+1)^3$$ is repeated with \(r = 3\), so it gives **3 terms** (with \(a_0, a_1, a_2\))
- $$(x+2)$$ is simple, so it gives **1 term** (with \(k\))

---

> 💬 **Rule of thumb:** Count the power of the repeated factor — that's exactly how many terms it generates. A cubed factor → 3 terms. A squared factor → 2 terms.

---

## Page 3: Finding the Coefficients

Now that we know the *shape* of the expansion, we need to find the actual numbers: \(a_0, a_1, \ldots, a_{r-1}\) and \(k_1, k_2, \ldots, k_j\).

---

### Step 1: Find the Simple Coefficients \(k_i\) First

The coefficients for the **unrepeated** factors are found exactly as before — plain Heaviside cover-up:

$$k_i = (x - \alpha_i) F(x) \Big|_{x = \alpha_i}$$

Multiply both sides by $$(x - \alpha_i)$$, then substitute \(x = \alpha_i\). Easy!

---

### Step 2: Find \(a_0, a_1, \ldots\) Using the Derivative Method

Multiply **both sides** of the expansion by $$(x - \lambda)^r$$. This "clears" the repeated factor from the left side:

$$(x - \lambda)^r F(x) = a_0 + a_1(x-\lambda) + a_2(x-\lambda)^2 + \cdots + a_{r-1}(x-\lambda)^{r-1} + \text{(terms with } k_i\text{)}$$

Call the left side $$G(x) = (x-\lambda)^r F(x)$$ for convenience. This is just \(F(x)\) with the $$(x-\lambda)^r$$ factor **removed** from the denominator.

---

### The Master Formula

$$\boxed{a_j = \frac{1}{j!} \frac{d^j}{dx^j} \left[(x-\lambda)^r F(x)\right]_{x=\lambda}}$$

In plain English:
1. **Remove** $$(x-\lambda)^r$$ from the denominator of \(F(x)\) — call this \(G(x)\)
2. Take the **\(j\)-th derivative** of \(G(x)\)
3. **Substitute** \(x = \lambda\)
4. **Divide** by \(j!\)

---

### The First Few Coefficients Spelled Out

| Coefficient | Formula |
|---|---|
| \(a_0\) | \(G(x)\big\|_{x=\lambda}\) — just substitute, no derivative needed |
| \(a_1\) | \(G'(x)\big\|_{x=\lambda}\) — first derivative, then substitute |
| \(a_2\) | \(\dfrac{1}{2!} G''(x)\big\|_{x=\lambda}\) — second derivative ÷ 2, then substitute |
| \(a_j\) | \(\dfrac{1}{j!} G^{(j)}(x)\big\|_{x=\lambda}\) — general rule |

---

> 💬 **Why the \(j!\)?** When you differentiate a polynomial \(j\) times, the leading coefficient picks up a factor of \(j!\) from the power rule. Dividing by \(j!\) cancels that out so you get the clean coefficient.

---

> ⚠️ **Watch out:** \(a_0\) uses the **lowest** power $$(x-\lambda)^r$$ in the denominator, and \(a_{r-1}\) uses the **highest** power $$(x-\lambda)^1\(. The subscript on\)a$ matches the order of the derivative you take — not the power in the denominator!

---

## Page 4: Worked Example B.10 — Step by Step

Let's work through the textbook example completely.

$$F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)}$$

---

### Set Up the Expansion

$$(x+1)^3$$ is repeated (\(r = 3\)), giving 3 terms. $$(x+2)$$ is simple, giving 1 term:

$$F(x) = \frac{a_0}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{(x+1)} + \frac{k}{x+2}$$

---

### Find \(k\) (Simple Factor, Heaviside Cover-Up)

Cover up $$(x+2)$$ in \(F(x)\), substitute \(x = -2\):

$$k = \frac{4(-2)^3 + 16(-2)^2 + 23(-2) + 13}{(-2+1)^3} = \frac{-32 + 64 - 46 + 13}{(-1)^3} = \frac{-1}{-1} = 1$$

$$\boxed{k = 1}$$

---

### Define \(G(x)\) — Remove $$(x+1)^3$$

$$G(x) = (x+1)^3 \cdot F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{x+2}$$

---

### Find \(a_0\) — Substitute \(x = -1\) into \(G(x)\)

$$a_0 = G(-1) = \frac{4(-1)^3 + 16(-1)^2 + 23(-1) + 13}{(-1)+2} = \frac{-4 + 16 - 23 + 13}{1} = \frac{2}{1} = 2$$

$$\boxed{a_0 = 2}$$

---

### Find \(a_1\) — First Derivative of \(G(x)\), then \(x = -1\)

Using the quotient rule on $$G(x) = \frac{4x^3 + 16x^2 + 23x + 13}{x+2}$$:

$$G'(x) = \frac{(12x^2 + 32x + 23)(x+2) - (4x^3 + 16x^2 + 23x + 13)(1)}{(x+2)^2}$$

At \(x = -1\):
- Numerator: \((12 - 32 + 23)(1) - (-4 + 16 - 23 + 13) = (3)(1) - (2) = 1\)
- Denominator: \((1)^2 = 1\)

$$a_1 = G'(-1) = \frac{1}{1} = 1$$

$$\boxed{a_1 = 1}$$

---

### Find \(a_2\) — Second Derivative of \(G(x)\), divide by \(2!\), then \(x = -1\)

After computing \(G''(x)\) and evaluating at \(x = -1\) (the algebra is a bit involved but follows the same quotient rule process):

$$a_2 = \frac{1}{2!} G''(-1) = \frac{1}{2} \cdot 6 = 3$$

$$\boxed{a_2 = 3}$$

---

### Final Answer

$$\boxed{F(x) = \frac{2}{(x+1)^3} + \frac{1}{(x+1)^2} + \frac{3}{x+1} + \frac{1}{x+2}}$$

---

> ✅ **Sanity check:** Count the terms — 3 from the cubic factor, 1 from the simple factor. That's 4 total, which matches our setup. 

---

## Page 5: Recap & Summary

Let's pull everything together from B.5-3.

---

### 🗝️ Core Concept

When a denominator factor $$(x - \lambda)$$ is **repeated \(r\) times**, it generates **\(r\) separate terms** in the partial fraction expansion — one for each power from \(r\) down to \(1\).

---

### 📋 The Expansion Template

$$\frac{P(x)}{(x-\lambda)^r(\text{simple factors})} = \underbrace{\frac{a_0}{(x-\lambda)^r} + \frac{a_1}{(x-\lambda)^{r-1}} + \cdots + \frac{a_{r-1}}{(x-\lambda)}}_{r \text{ terms from repeated factor}} + \underbrace{\frac{k_1}{x-\alpha_1} + \cdots}_{\text{simple factors}}$$

---

### 🔧 How to Find Each Coefficient

| Coefficient type | Method |
|---|---|
| \(k_i\) (simple factors) | Heaviside cover-up: multiply by $$(x-\alpha_i)$$, substitute \(x = \alpha_i\) |
| \(a_0\) | Remove $$(x-\lambda)^r$$, substitute \(x = \lambda\) |
| \(a_1\) | Remove $$(x-\lambda)^r$$, take **1st derivative**, substitute \(x = \lambda\) |
| \(a_j\) | Remove $$(x-\lambda)^r$$, take **\(j\)-th derivative**, substitute \(x = \lambda\), divide by \(j!\) |

---

### 📐 The Master Formula

$$a_j = \frac{1}{j!} \frac{d^j}{dx^j}\left[(x-\lambda)^r F(x)\right]_{x=\lambda}$$

---

### ⚠️ Common Mistakes to Avoid

1. **Forgetting terms**: A factor $$(x-\lambda)^3$$ needs **3** terms, not 1
2. **Wrong subscript logic**: \(a_0\) goes with the **highest** power $$(x-\lambda)^r$$; \(a_{r-1}\) goes with the **lowest** power $$(x-\lambda)^1$$
3. **Forgetting to divide by \(j!\)**: Always divide the \(j\)-th derivative by \(j!\)
4. **Applying cover-up to repeated factors**: You can only use plain cover-up for **simple** (unrepeated) factors

---

### 🔄 The Workflow

```
1. Identify repeated and simple factors
2. Write out the full expansion template
3. Find k's using Heaviside cover-up
4. Define G(x) = (x-λ)^r · F(x)
5. Find a_0 = G(λ)
6. Find a_1 = G'(λ)
7. Find a_j = G^(j)(λ) / j!
8. Write the final answer
```

---

## Page 6: Quiz

```yaml
quiz_plan:
  section: "B.5-3 Repeated Factors of Q(x)"
  total_questions: 10
  format_mix: "8 multiple-choice, 2 short-answer"

  questions:

    - id: 1
      type: multiple-choice
      topic: "Identifying number of terms from a repeated factor"
      question: >
        The denominator of F(x) contains the factor (x + 3)^4. How many partial
        fraction terms does this repeated factor contribute to the expansion?
      options:
        A: 1
        B: 2
        C: 3
        D: 4
      answer: D
      explanation: >
        A factor repeated r times contributes exactly r terms, one for each
        power from (x+3)^4 down to (x+3)^1.

    - id: 2
      type: multiple-choice
      topic: "Correct form of partial fraction expansion"
      question: >
        Which is the correct partial fraction setup for
        F(x) = P(x) / [(x-2)^2 (x+5)]?
      options:
        A: "a0/(x-2)^2 + k/(x+5)"
        B: "a0/(x-2)^2 + a1/(x-2) + k/(x+5)"
        C: "a0/(x-2) + a1/(x-2) + k/(x+5)"
        D: "a0/(x-2)^2 + a1/(x-2)^2 + k/(x+5)"
      answer: B
      explanation: >
        (x-2)^2 is repeated with r=2, giving two terms with denominators
        (x-2)^2 and (x-2)^1. The simple factor (x+5) gives one term.

    - id: 3
      type: multiple-choice
      topic: "Formula for a_0"
      question: >
        To find a_0 for a repeated factor (x - λ)^r, you should:
      options:
        A: "Multiply F(x) by (x-λ)^r and differentiate r times, then set x=λ"
        B: "Multiply F(x) by (x-λ)^r and set x=λ directly (no differentiation)"
        C: "Use the Heaviside cover-up on (x-λ) alone"
        D: "Divide F(x) by (x-λ)^r and set x=λ"
      answer: B
      explanation: >
        a_0 corresponds to j=0 in the master formula. The 0th derivative is
        just the function itself, so no differentiation is needed — just
        remove (x-λ)^r from the denominator and substitute x=λ.

    - id: 4
      type: multiple-choice
      topic: "Role of j! in the formula"
      question: >
        The master formula for a_j includes a division by j!. Why?
      options:
        A: "To normalize the result so it stays between 0 and 1"
        B: "To cancel the factor of j! introduced by repeated differentiation of a polynomial"
        C: "Because the Heaviside method requires it for simple factors"
        D: "To account for the number of unrepeated factors in the denominator"
      answer: B
      explanation: >
        When you differentiate x^j exactly j times using the power rule, you
        get j! as a coefficient. Dividing by j! cancels this so you recover
        the clean partial fraction coefficient.

    - id: 5
      type: multiple-choice
      topic: "Finding k for a simple factor alongside repeated factors"
      question: >
        In the expansion of F(x) = P(x)/[(x+1)^3 (x+4)], how do you find k
        (the coefficient for the 1/(x+4) term)?
      options:
        A: "Differentiate F(x) twice and substitute x = -4"
        B: "Multiply F(x) by (x+1)^3 and substitute x = -1"
        C: "Multiply F(x) by (x+4) and substitute x = -4"
        D: "Multiply F(x) by (x+4) and substitute x = -1"
      answer: C
      explanation: >
        Simple (unrepeated) factors still use the standard Heaviside cover-up:
        multiply by the factor (x+4) and substitute its root x = -4.

    - id: 6
      type: multiple-choice
      topic: "Applying the formula for a_1"
      question: >
        For G(x) = (x-λ)^r · F(x), the coefficient a_1 equals:
      options:
        A