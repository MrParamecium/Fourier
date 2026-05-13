# B.4 Cramer's Rule

> **Section Objective:** Learn how to solve a system of simultaneous linear equations using a clean, determinant-based formula called Cramer's rule.

---

Sometimes you have several equations that must all be true at the same time. For example, two equations that both involve the same two unknowns. That is called a **simultaneous linear system**.

Cramer's rule is one method for solving such systems. It works when the number of equations equals the number of unknowns, and it uses a single number called the **determinant** to find each unknown.

In the general setup, the numbers a₁₁, a₁₂, ... are **coefficients** (given constants), the values x₁, x₂, ..., xₙ are the **unknowns** you want to find, and y₁, y₂, ... are the **known right-hand-side values**.

### WHY THIS MATTERS FOR THE EXAM

Exam questions typically ask you to solve a 2×2 or 3×3 system, or to identify when Cramer's rule **cannot** be used.

$$\begin{aligned}a_{11}x_1+a_{12}x_2+\cdots+a_{1n}x_n&=y_1\\a_{21}x_1+a_{22}x_2+\cdots+a_{2n}x_n&=y_2\\&\vdots\\a_{n1}x_1+a_{n2}x_2+\cdots+a_{nn}x_n&=y_n\end{aligned}$$
*This is the general form of n linear equations in n unknowns. Each symbol has a specific role: aᵢⱼ is a coefficient (a known number in row i, column j), xⱼ is an unknown you are solving for, and yᵢ is a known value on the right-hand side. Do not be intimidated by the double subscripts — they simply tell you the row number and column number, nothing more.*

## 1. When Cramer's Rule Applies

Cramer's rule has two conditions. Both must be satisfied before you can use it.

**Condition 1 — Square system.** The number of equations must equal the number of unknowns. For example, 2 equations with 2 unknowns, or 3 equations with 3 unknowns. If the counts do not match, stop — Cramer's rule does not apply.

**Condition 2 — Nonzero determinant.** The coefficient matrix has a single number associated with it called the **determinant**. Think of it as a quick test: if that number is not zero, the rule works. If it is zero, the rule breaks down.

#### Note

You do not need deep determinant theory here. For now, treat the determinant as a test value you compute from the coefficient matrix.

### COMMON MISTAKE

> If the determinant of the coefficient matrix equals zero, Cramer's rule **cannot** be used. This is a frequent exam trap.

> ⚠️ Chart render error: exit 1

## 2. The Rule Itself: Replace One Column at a Time

Here is the procedure, written as a clear checklist.

**Step 1.** Write out the coefficient matrix — the grid of all the aᵢⱼ values.

**Step 2.** Compute the determinant of that matrix. Call it **Δ** (Delta). If Δ = 0, stop — the rule cannot be used.

**Step 3.** To find a specific unknown xᵢ, take the coefficient matrix and replace **column i** with the right-hand-side column [y₁, y₂, ..., yₙ]. Call this new matrix **Aᵢ**.

**Step 4.** Compute the determinant of Aᵢ. Call it **Δᵢ**.

**Step 5.** Divide: xᵢ = Δᵢ / Δ.

Repeat Steps 3–5 for each unknown, replacing a different column each time.

### CRITICAL RULE

> Only the chosen column is replaced. Every other column stays exactly as it was in the original coefficient matrix.

#### Warning

A very common exam mistake is replacing the wrong column, or accidentally changing a column that should stay the same. Double-check which variable you are solving for before replacing.

$$x_i=\frac{\Delta_i}{\Delta}$$
*Here, Δ is the determinant of the original coefficient matrix, and Δᵢ is the determinant of the modified matrix formed by replacing column i with the right-hand-side column. Each unknown xᵢ gets its own numerator Δᵢ, but they all share the same denominator Δ. One short warning: if Δ = 0, this formula involves division by zero and cannot be used.*

## 3. Worked Mini-Example

Let's solve a concrete 2×2 system from start to finish.

**The system:**

$$2x + y = 5$$
$$x - y = 1$$

---

### STEP 1 — Build the coefficient matrix

Read off the coefficients of x and y from each equation:

$$A = \begin{bmatrix} 2 & 1 \\ 1 & -1 \end{bmatrix}$$

---

### STEP 2 — Compute Δ (the denominator)

For a 2×2 matrix, the determinant is (top-left × bottom-right) − (top-right × bottom-left):

$$\Delta = (2)(-1) - (1)(1) = -2 - 1 = -3$$

Δ = −3, which is not zero, so we can proceed.

---

### STEP 3 — Find x: replace column 1 with [5, 1]

$$A_x = \begin{bmatrix} 5 & 1 \\ 1 & -1 \end{bmatrix}$$

$$\Delta_x = (5)(-1) - (1)(1) = -5 - 1 = -6$$

$$x = \frac{\Delta_x}{\Delta} = \frac{-6}{-3} = 2$$

---

### STEP 4 — Find y: replace column 2 with [5, 1]

$$A_y = \begin{bmatrix} 2 & 5 \\ 1 & 1 \end{bmatrix}$$

$$\Delta_y = (2)(1) - (5)(1) = 2 - 5 = -3$$

$$y = \frac{\Delta_y}{\Delta} = \frac{-3}{-3} = 1$$

---

### STEP 5 — Quick check

Substitute x = 2, y = 1 back into both equations:

- Equation 1: 2(2) + (1) = 4 + 1 = 5 ✓
- Equation 2: (2) − (1) = 1 ✓

Both equations check out. The answer is **x = 2, y = 1**.

#### Note

Notice that only column 1 changed when finding x, and only column 2 changed when finding y. The other column stayed the same each time.

---
**📌 Key Takeaways**
- Cramer's rule applies only to square systems where the number of equations equals the number of unknowns.
- To find each unknown, replace exactly one column of the coefficient matrix with the right-hand-side values.
- If the determinant of the coefficient matrix is zero, Cramer's rule cannot be used.

*In the next section we will continue using systematic methods to solve equation systems.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6IndoZW5fYXBwbGljYWJsZSIsImxhYmVsIjoiV2hlbiBDcmFtZXIncyBydWxlIGNhbiBiZSB1c2VkIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3Igd2hpY2ggc3lzdGVtIGlzIENyYW1lcidzIHJ1bGUgZGlyZWN0bHkgYXBwbGljYWJsZT8iLCJvcHRpb25zIjpbIkEuIDIgZXF1YXRpb25zIGluIDMgdW5rbm93bnMiLCJCLiAzIGVxdWF0aW9ucyBpbiAzIHVua25vd25zIHdpdGggZGV0ZXJtaW5hbnQgb2YgdGhlIGNvZWZmaWNpZW50IG1hdHJpeCBub3QgZXF1YWwgdG8gMCIsIkMuIDQgZXF1YXRpb25zIGluIDMgdW5rbm93bnMiLCJELiBBbnkgc3lzdGVtLCBhcyBsb25nIGFzIHRoZSBlcXVhdGlvbnMgYXJlIGxpbmVhciJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkNyYW1lcidzIHJ1bGUgaXMgZm9yIGEgc3F1YXJlIGxpbmVhciBzeXN0ZW0sIGFuZCB0aGUgZGV0ZXJtaW5hbnQgb2YgdGhlIGNvZWZmaWNpZW50IG1hdHJpeCBtdXN0IGJlIG5vbnplcm8uIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlIHN5c3RlbSBpcyBub3Qgc3F1YXJlLCBzbyB0aGUgcnVsZSBkb2VzIG5vdCBkaXJlY3RseSBhcHBseS4iLCJDIjoiQWdhaW4sIHRoZSBzeXN0ZW0gaXMgbm90IHNxdWFyZS4iLCJEIjoiTGluZWFyaXR5IGFsb25lIGlzIG5vdCBlbm91Z2g7IHRoZSBzeXN0ZW0gbXVzdCBiZSBzcXVhcmUgYW5kIGhhdmUgbm9uemVybyBkZXRlcm1pbmFudC4ifSwiaGludCI6IkNoZWNrIGJvdGggY29uZGl0aW9uczogc2FtZSBudW1iZXIgb2YgZXF1YXRpb25zIGFuZCB1bmtub3ducywgYW5kIGRldGVybWluYW50IG5vdCB6ZXJvLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSWYgdGhlIGRldGVybWluYW50IG9mIHRoZSBjb2VmZmljaWVudCBtYXRyaXggaXMgMCwgd2hhdCBpcyB0aGUgY29ycmVjdCBleGFtIGNvbmNsdXNpb24/Iiwib3B0aW9ucyI6WyJBLiBDcmFtZXIncyBydWxlIHN0aWxsIHdvcmtzIHdpdGhvdXQgYW55IGNoYW5nZSIsIkIuIE9ubHkgeDEgY2FuIGJlIGZvdW5kIiwiQy4gQ3JhbWVyJ3MgcnVsZSBjYW5ub3QgYmUgdXNlZCBpbiBpdHMgc3RhbmRhcmQgZm9ybSIsIkQuIFRoZSBzeXN0ZW0gaGFzIG5vIGNvZWZmaWNpZW50cyJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlRoZSBmb3JtdWxhIGRpdmlkZXMgYnkgdGhlIGRldGVybWluYW50IG9mIHRoZSBjb2VmZmljaWVudCBtYXRyaXguIElmIHRoYXQgZGV0ZXJtaW5hbnQgaXMgMCwgdGhlIHN0YW5kYXJkIENyYW1lcidzIHJ1bGUgZm9ybXVsYSBicmVha3MgZG93bi4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJEaXZpc2lvbiBieSB6ZXJvIGlzIG5vdCBhbGxvd2VkLiIsIkIiOiJObyB2YXJpYWJsZSBjYW4gYmUgZm91bmQgYnkgdGhlIHN0YW5kYXJkIHJ1bGUgd2hlbiB0aGUgZGVub21pbmF0b3IgaXMgemVyby4iLCJEIjoiQSB6ZXJvIGRldGVybWluYW50IGRvZXMgbm90IG1lYW4gdGhlcmUgYXJlIG5vIGNvZWZmaWNpZW50cy4ifSwiaGludCI6Ikxvb2sgYXQgdGhlIGRlbm9taW5hdG9yIGluIHhfaSA9IERlbHRhX2kgLyBEZWx0YS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImNvbHVtbl9yZXBsYWNlbWVudCIsImxhYmVsIjoiUmVwbGFjaW5nIHRoZSBjb3JyZWN0IGNvbHVtbiIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiVG8gZmluZCB4MiB1c2luZyBDcmFtZXIncyBydWxlLCB3aGF0IGRvIHlvdSByZXBsYWNlPyIsIm9wdGlvbnMiOlsiQS4gUmVwbGFjZSByb3cgMiB3aXRoIHRoZSByaWdodC1oYW5kLXNpZGUgdmFsdWVzIiwiQi4gUmVwbGFjZSBjb2x1bW4gMiB3aXRoIHRoZSByaWdodC1oYW5kLXNpZGUgdmFsdWVzIiwiQy4gUmVwbGFjZSBldmVyeSBjb2x1bW4gd2l0aCB0aGUgcmlnaHQtaGFuZC1zaWRlIHZhbHVlcyIsIkQuIFJlcGxhY2UgY29sdW1uIDEgd2l0aCB0aGUgcmlnaHQtaGFuZC1zaWRlIHZhbHVlcyJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRvIGZpbmQgeDIsIHJlcGxhY2UgdGhlIHNlY29uZCBjb2x1bW4gb2YgdGhlIGNvZWZmaWNpZW50IG1hdHJpeCBieSB0aGUgcmlnaHQtaGFuZC1zaWRlIGNvbHVtbi4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJDcmFtZXIncyBydWxlIHJlcGxhY2VzIGEgY29sdW1uLCBub3QgYSByb3cuIiwiQyI6Ik9ubHkgb25lIGNvbHVtbiBpcyByZXBsYWNlZCBhdCBhIHRpbWUuIiwiRCI6IlJlcGxhY2luZyBjb2x1bW4gMSB3b3VsZCBjb3JyZXNwb25kIHRvIGZpbmRpbmcgeDEuIn0sImhpbnQiOiJWYXJpYWJsZSBpbmRleCBhbmQgcmVwbGFjZWQgY29sdW1uIGluZGV4IG11c3QgbWF0Y2guIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6IjJ4MiBtYXRyaXggd2l0aCBvbmUgaGlnaGxpZ2h0ZWQgcmVwbGFjZW1lbnQgY29sdW1uIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AyX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGVuIGZvcm1pbmcgdGhlIG1hdHJpeCBmb3IgeDEsIHdoaWNoIHN0YXRlbWVudCBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gUmVwbGFjZSBvbmx5IGNvbHVtbiAxOyBrZWVwIHRoZSBvdGhlciBjb2x1bW5zIHVuY2hhbmdlZCIsIkIuIFJlcGxhY2Ugb25seSByb3cgMTsga2VlcCB0aGUgb3RoZXIgcm93cyB1bmNoYW5nZWQiLCJDLiBSZXBsYWNlIGJvdGggY29sdW1ucywgdGhlbiBkaXZpZGUgYnkgMiIsIkQuIFN3YXAgdGhlIHR3byBjb2x1bW5zIGJlZm9yZSBjb21wdXRpbmcgdGhlIGRldGVybWluYW50Il0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGhlIHJ1bGUgaXMgdmVyeSBzcGVjaWZpYzogb25seSB0aGUgY2hvc2VuIGNvbHVtbiBpcyByZXBsYWNlZCwgYW5kIGV2ZXJ5IG90aGVyIGNvbHVtbiBzdGF5cyB0aGUgc2FtZS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJSb3dzIGFyZSBub3QgcmVwbGFjZWQgaW4gdGhlIHN0YW5kYXJkIHJ1bGUuIiwiQyI6IlJlcGxhY2luZyBib3RoIGNvbHVtbnMgaXMgbm90IENyYW1lcidzIHJ1bGUuIiwiRCI6IlN3YXBwaW5nIGNvbHVtbnMgY2hhbmdlcyB0aGUgZGV0ZXJtaW5hbnQgYW5kIGlzIG5vdCBwYXJ0IG9mIHRoZSBwcm9jZWR1cmUuIn0sImhpbnQiOiJPbmUgdmFyaWFibGUsIG9uZSByZXBsYWNlZCBjb2x1bW4uIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImJlZm9yZS1hbmQtYWZ0ZXIgbWF0cml4IGNvbXBhcmlzb24iLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InNtYWxsX2NvbXB1dGF0aW9uIiwibGFiZWwiOiJDYXJyeWluZyBvdXQgYSAyeDIgY29tcHV0YXRpb24iLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IlVzZSBDcmFtZXIncyBydWxlIGZvciB0aGUgc3lzdGVtIDJ4ICsgeSA9IDUgYW5kIHggLSB5ID0gMS4gV2hhdCBpcyB4PyIsIm9wdGlvbnMiOlsiQS4gMSIsIkIuIDIiLCJDLiAzIiwiRC4gLTIiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgY29lZmZpY2llbnQgZGV0ZXJtaW5hbnQgaXMgRGVsdGEgPSAoMikoLTEpIC0gKDEpKDEpID0gLTMuIFJlcGxhY2luZyB0aGUgeC1jb2x1bW4gZ2l2ZXMgRGVsdGFfeCA9ICg1KSgtMSkgLSAoMSkoMSkgPSAtNi4gU28geCA9IERlbHRhX3ggLyBEZWx0YSA9ICgtNikvKC0zKSA9IDIuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBjb21lcyBmcm9tIGFuIGluY29ycmVjdCBkZXRlcm1pbmFudCBvciBhcml0aG1ldGljIHNsaXAuIiwiQyI6IlRoaXMgZG9lcyBub3QgbWF0Y2ggdGhlIGRldGVybWluYW50IGNhbGN1bGF0aW9uLiIsIkQiOiJUaGUgc2lnbnMgd29yayBvdXQgdG8gYSBwb3NpdGl2ZSBhbnN3ZXIsIG5vdCBhIG5lZ2F0aXZlIG9uZS4ifSwiaGludCI6IkNvbXB1dGUgdGhlIGRlbm9taW5hdG9yIGZpcnN0LCB0aGVuIHJlcGxhY2Ugb25seSB0aGUgeC1jb2x1bW4uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiRm9yIHRoZSBzYW1lIHN5c3RlbSAyeCArIHkgPSA1IGFuZCB4IC0geSA9IDEsIHdyaXRlIHRoZSBtYXRyaXggdXNlZCB0byBmaW5kIHksIHRoZW4gY29tcHV0ZSB5LiIsImlkZWFsX2Fuc3dlciI6IlRoZSBjb2VmZmljaWVudCBtYXRyaXggaXMgQSA9IFtbMiwgMV0sIFsxLCAtMV1dLiBUbyBmaW5kIHksIHJlcGxhY2UgdGhlIHNlY29uZCBjb2x1bW4gYnkgWzUsIDFdLCBnaXZpbmcgQV95ID0gW1syLCA1XSwgWzEsIDFdXS4gSXRzIGRldGVybWluYW50IGlzICgyKSgxKSAtICg1KSgxKSA9IC0zLiBTaW5jZSBEZWx0YSA9IC0zLCB5ID0gKC0zKS8oLTMpID0gMS4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IHJlcGxhY2UgdGhlIHNlY29uZCBjb2x1bW4sIG5vdCB0aGUgZmlyc3QiLCJNdXN0IHdyaXRlIG9yIGNsZWFybHkgZGVzY3JpYmUgQV95IGNvcnJlY3RseSIsIk11c3QgY29tcHV0ZSB0aGUgZGV0ZXJtaW5hbnQgb2YgQV95IGNvcnJlY3RseSIsIk11c3QgZGl2aWRlIGJ5IERlbHRhIGFuZCBjb25jbHVkZSB5ID0gMSJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQgY2FuIHBlcmZvcm0gdGhlIHJlcGxhY2VtZW50IHN0ZXAgYW5kIGNvbXBsZXRlIHRoZSBkZXRlcm1pbmFudCBjYWxjdWxhdGlvbiwgbm90IGp1c3QgcmVjb2duaXplIGEgZmluYWwgYW5zd2VyLiIsImhpbnQiOiJUbyBmaW5kIHksIHJlcGxhY2UgdGhlIHktY29sdW1uLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
