%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6Indpa2lfcmVmZXJlbmNlIiwicmF0aW9uYWxlIjoiQ3JhbWVyJ3MgUnVsZSBpcyBtYWlubHkgc3ltYm9saWMsIHNvIHRoZSBjb3JlIHRlYWNoaW5nIHN1cmZhY2Ugc2hvdWxkIGJlIExhVGVYIG1hdHJpY2VzIGFuZCBkZXRlcm1pbmFudCByYXRpb3MuIEEgc3RhdGljIHJlZmVyZW5jZSB2aXN1YWwgaXMgc3RpbGwgdXNlZnVsIGJlY2F1c2Ugc3R1ZGVudHMgb2Z0ZW4gY29uZnVzZSB3aGljaCBjb2x1bW4gZ2V0cyByZXBsYWNlZCBieSB0aGUgcmlnaHQtaGFuZC1zaWRlIHZlY3Rvci4iLCJjcmFtIjoiVXNlIHRoZSB2aXN1YWwgdG8gcmVjb2duaXplIHRoZSBleGFtIHBhdHRlcm46IHJlcGxhY2Ugb25lIGNvbHVtbiBvZiBBIHdpdGggYiwgdGhlbiBkaXZpZGUgYnkgZGV0KEEpLiIsInN0YW5kYXJkIjoiVXNlIHRoZSB2aXN1YWwgYmVzaWRlIHRoZSBmb3JtdWxhIHRvIGNvbm5lY3QgdGhlIHN5bWJvbGljIHJ1bGUgdG8gb25lIHJlcHJlc2VudGF0aXZlIDMtYnktMyBleGFtcGxlLiIsInRvcF9zY29yZSI6IlVzZSB0aGUgdmlzdWFsIHRvIGhpZ2hsaWdodCB0cmFwczogcmVwbGFjaW5nIGEgcm93IGluc3RlYWQgb2YgYSBjb2x1bW4sIHJlcGxhY2luZyB0aGUgd3JvbmcgY29sdW1uLCBvciB1c2luZyB0aGUgcnVsZSB3aGVuIGRldChBKT0wLiJ9" style="display:none;"></div>%%KC_END%%
# B.4 Cramer's Rule

> **Section Objective:** Learn how Cramer's Rule solves a square system of linear equations using determinants.

---

## Concepts In This Section

- matrix form
- coefficient matrix
- determinant condition
- column replacement
- Cramer's Rule
- representative 3-by-3 example

## 1. Matrix Form of the System

A system of \(n\) linear equations in \(n\) unknowns can be compressed into the compact matrix equation \(A\mathbf{x}=\mathbf{b}\).

- \(A\) is the **coefficient matrix**: each entry is the coefficient multiplying one unknown in one equation.
- \(\mathbf{x}\) is the **unknown column vector**: it stacks all the unknowns \(x_1, x_2, \ldots, x_n\).
- \(\mathbf{b}\) is the **right-hand-side vector**: it stacks the constants from the right side of each equation.

**When to use this form:** whenever all equations are linear and the same unknowns appear in every row.

**Minimal example:** a 3-by-3 system with unknowns \(x_1, x_2, x_3\) and three equations produces a \(3\times 3\) matrix \(A\), a \(3\times 1\) vector \(\mathbf{x}\), and a \(3\times 1\) vector \(\mathbf{b}\). The solution will be found in the next steps.

### EXAM TRIGGER

Seeing simultaneous linear equations with the same unknowns in every row — write \(A\mathbf{x}=\mathbf{b}\) immediately.

### COMMON MISTAKE

Putting the right-hand-side constants into \(A\) instead of into \(\mathbf{b}\) corrupts the coefficient matrix.

$$A\mathbf{x}=\mathbf{b}$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgdmlzdWFsIGZvciBmYXN0IHJlY29nbml0aW9uIG9mIHRoZSBrZXkgcGF0dGVybjogY29lZmZpY2llbnRzIGdvIGludG8gQSwgY29uc3RhbnRzIGdvIGludG8gYi4iLCJzdGFuZGFyZCI6IlVzZSB0aGlzIHZpc3VhbCB0byBjbGFyaWZ5IGhvdyBhIHdyaXR0ZW4gc3lzdGVtIG1hcHMgdG8gdGhlIG1hdHJpeCBmb3JtIGJlZm9yZSBhcHBseWluZyBDcmFtZXIncyBSdWxlLiIsInRvcF9zY29yZSI6IlVzZSB0aGlzIHZpc3VhbCB0byBzdXJmYWNlIHRoZSB0cmFwIG9mIHBsYWNpbmcgY29uc3RhbnRzIGluc2lkZSBBIGluc3RlYWQgb2YgYiwgYW5kIHRvIHZlcmlmeSBjb3JyZWN0IG1hdHJpeCBjb25zdHJ1Y3Rpb24uIn0=" style="display:none;"></div>%%KC_END%%
![Fig. B.11](/figures/page-023-fig__b_11-1.png)
*Fig. B.11 from the textbook shows the structure of a linear system written in matrix form, illustrating how coefficients, unknowns, and right-hand-side constants map to \(A\), \(\mathbf{x}\), and \(\mathbf{b}\).*
<div class="lesson-figure-description">The figure displays a system of simultaneous linear equations alongside its matrix representation. The left side shows the equations with coefficients and unknowns; the right side shows the corresponding \(A\mathbf{x}=\mathbf{b}\) layout. Students should notice how each coefficient in the equations maps to a specific entry in \(A\), how the unknowns form the column vector \(\mathbf{x}\), and how the constants on the right-hand side populate \(\mathbf{b}\). This figure anchors the abstract matrix notation to a concrete equation structure.</div>

## 2. Cramer’s Rule

### Determinant Condition

Cramer's Rule requires the coefficient matrix \(A\) to have a **nonzero determinant**. This condition guarantees the system has a unique solution, which means dividing by \(\det(A)\) is mathematically valid.

### EXAM TRIGGER

Before applying Cramer's Rule, always check whether \(\det(A)=0\). If it is zero, the rule cannot be used.

### COMMON MISTAKE

Applying the determinant ratio formula even when \(\det(A)=0\) produces a division by zero, making every result invalid. Check the denominator first.

$$\det(A)\ne 0$$

## 3. Representative example

To find the \(i\)-th unknown \(x_i\), form the matrix \(A_i\) by taking the original coefficient matrix \(A\) and **replacing only column \(i\) with the right-hand-side vector \(\mathbf{b}\)**. Then divide its determinant by \(\det(A)\).

**Symbol definitions:**
- \(x_i\) — the \(i\)-th unknown variable
- \(A_i\) — the modified matrix with column \(i\) replaced by \(\mathbf{b}\)
- \(\det(A_i)\) — the determinant of the modified matrix
- \(\det(A)\) — the determinant of the original coefficient matrix (the denominator, always the same)

**Use case:** solve one variable directly without row reduction — useful when only one or two unknowns are needed.

### EXAM TRIGGER

A square linear system where determinant computation is expected — apply this formula variable by variable.

### COMMON MISTAKE

Replacing a **row** instead of a column, replacing **all** columns at once, or replacing the **wrong** column number are the three most frequent errors. The subscript \(i\) tells you exactly which column to replace.

$$x_i=\frac{\det(A_i)}{\det(A)},\quad i=1,2,\ldots,n$$


## 3. Representative Example

Consider the following 3-by-3 system:

$$2x_1 + x_2 + x_3 = 3$$

$$x_1 + 3x_2 - x_3 = 7$$

$$x_1 + x_2 + x_3 = 1$$

In matrix form:

$$
A = \begin{bmatrix}2 & 1 & 1\\1 & 3 & -1\\1 & 1 & 1\end{bmatrix}, \quad \mathbf{b} = \begin{bmatrix}3\\7\\1\end{bmatrix}, \quad \det(A) = 4
$$

### HOW CRAMER'S RULE IS APPLIED

For each unknown, replace the matching column of \(A\) with \(\mathbf{b}\), compute the determinant, then divide by \(\det(A)=4\):

- **\(x_1\):** Replace column 1 with \(\mathbf{b}\) to form \(A_1\). Compute \(\det(A_1)=8\). Then \(x_1 = 8/4 = 2\).
- **\(x_2\):** Replace column 2 with \(\mathbf{b}\) to form \(A_2\). Compute \(\det(A_2)=4\). Then \(x_2 = 4/4 = 1\).
- **\(x_3\):** Replace column 3 with \(\mathbf{b}\) to form \(A_3\). Compute \(\det(A_3)=-8\). Then \(x_3 = -8/4 = -2\).

The replacement pattern is the same every time: only the column index changes. All other columns of \(A\) stay untouched, and the denominator \(\det(A)=4\) is reused for all three variables.

> **Exam Note:** Most mistakes happen before the determinant is computed — the wrong column is replaced.

$$\mathbf{x}=\begin{bmatrix}2\\1\\-2\end{bmatrix}$$
This solution vector means \(x_1=2\), \(x_2=1\), and \(x_3=-2\).

To verify, substitute these values back into each of the three original equations and confirm both sides match. Each entry of \(\mathbf{x}\) belongs to the variable with the same subscript — do not swap them.

### COMMON MISTAKE

Reporting the solution as an unordered set \(\{2, 1, -2\}\) loses the variable-to-value correspondence. Always match each number to its correct subscripted variable.

---
**📌 Key Takeaways**
- A system of \(n\) linear equations in \(n\) unknowns is written in matrix form as \(A\mathbf{x}=\mathbf{b}\), where \(A\) is the coefficient matrix, \(\mathbf{x}\) is the unknown vector, and \(\mathbf{b}\) is the right-hand-side vector.
- Cramer's Rule is valid only when \(\det(A)\ne 0\); a zero determinant means the system has no unique solution and the formula cannot be used.
- Each unknown is found by the formula \(x_i=\dfrac{\det(A_i)}{\det(A)}\), where \(A_i\) is formed by replacing **column \(i\)** of \(A\) with \(\mathbf{b}\) — one column replaced, all others unchanged.
- For the representative 3-by-3 example with \(\det(A)=4\), Cramer's Rule gives the solution \(\mathbf{x}=\begin{bmatrix}2\\1\\-2\end{bmatrix}\), verified by substituting back into the original equations.

- Core formula: \(x_i=\frac{\det(A_i)}{\det(A)},\quad i=1,2,\ldots,n\).
*In the next section we will use algebraic decomposition ideas to simplify rational functions.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6Im1hdHJpeF9mb3JtIiwibGFiZWwiOiJNYXRyaXggZm9ybSBvZiBzaW11bHRhbmVvdXMgbGluZWFyIGVxdWF0aW9ucyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJbiB0aGUgbWF0cml4IGVxdWF0aW9uIFxcKEFcXG1hdGhiZnt4fT1cXG1hdGhiZntifVxcKSwgd2hhdCBkb2VzIFxcKEFcXCkgcmVwcmVzZW50PyIsIm9wdGlvbnMiOlsiQS4gVGhlIGNvbHVtbiB2ZWN0b3Igb2YgdW5rbm93biB2YXJpYWJsZXMiLCJCLiBUaGUgY29lZmZpY2llbnQgbWF0cml4IG9mIHRoZSBsaW5lYXIgc3lzdGVtIiwiQy4gVGhlIGNvbHVtbiB2ZWN0b3Igb2YgY29uc3RhbnRzIG9uIHRoZSByaWdodC1oYW5kIHNpZGUiLCJELiBUaGUgZGV0ZXJtaW5hbnQgb2YgdGhlIHN5c3RlbSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlxcKEFcXCkgc3RvcmVzIHRoZSBjb2VmZmljaWVudHMgbXVsdGlwbHlpbmcgdGhlIHVua25vd25zIGluIHRoZSBzeXN0ZW0uIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlIHVua25vd24gdmFyaWFibGVzIGFyZSBzdG9yZWQgaW4gXFwoXFxtYXRoYmZ7eH1cXCksIG5vdCBcXChBXFwpLiIsIkMiOiJUaGUgcmlnaHQtaGFuZC1zaWRlIGNvbnN0YW50cyBhcmUgc3RvcmVkIGluIFxcKFxcbWF0aGJme2J9XFwpLiIsIkQiOiJcXChcXGRldChBKVxcKSBpcyB0aGUgZGV0ZXJtaW5hbnQgb2YgXFwoQVxcKTsgXFwoQVxcKSBpdHNlbGYgaXMgdGhlIG1hdHJpeC4ifSwiaGludCI6IkFzayB3aGljaCBvYmplY3QgY29udGFpbnMgdGhlIG51bWJlcnMgbXVsdGlwbHlpbmcgdGhlIHVua25vd25zLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6ImRldGVybWluYW50X2NvbmRpdGlvbiIsImxhYmVsIjoiTm9uemVybyBkZXRlcm1pbmFudCBjb25kaXRpb24iLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkNyYW1lcidzIFJ1bGUgaXMgdmFsaWQgb25seSB3aGVuIHdoaWNoIGNvbmRpdGlvbiBpcyB0cnVlPyIsIm9wdGlvbnMiOlsiQS4gXFwoXFxkZXQoQSk9MFxcKSIsIkIuIFxcKFxcZGV0KEEpXFxuZTBcXCkiLCJDLiBcXChcXGRldChBX2kpPTBcXCkgZm9yIGV2ZXJ5IFxcKGlcXCkiLCJELiBUaGUgbWF0cml4IFxcKEFcXCkgaGFzIG1vcmUgcm93cyB0aGFuIGNvbHVtbnMiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJDcmFtZXIncyBSdWxlIGRpdmlkZXMgYnkgXFwoXFxkZXQoQSlcXCksIHNvIFxcKFxcZGV0KEEpXFwpIG11c3QgYmUgbm9uemVyby4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJJZiBcXChcXGRldChBKT0wXFwpLCB0aGUgZGVub21pbmF0b3IgaXMgemVybyBhbmQgQ3JhbWVyJ3MgUnVsZSBjYW5ub3QgYmUgdXNlZC4iLCJDIjoiVGhlIG51bWVyYXRvcnMgbWF5IGJlIHplcm8gZm9yIHNvbWUgdmFyaWFibGVzLCBidXQgdGhhdCBpcyBub3QgdGhlIHZhbGlkaXR5IGNvbmRpdGlvbi4iLCJEIjoiQ3JhbWVyJ3MgUnVsZSBhcHBsaWVzIHRvIHNxdWFyZSBzeXN0ZW1zLCBub3QgcmVjdGFuZ3VsYXIgc3lzdGVtcy4ifSwiaGludCI6Ikxvb2sgYXQgdGhlIGRlbm9taW5hdG9yIGluIFxcKHhfaT1cXGRldChBX2kpL1xcZGV0KEEpXFwpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBzdHVkZW50IGNvbXB1dGVzIFxcKFxcZGV0KEEpPTBcXCkgYW5kIHN0aWxsIHdyaXRlcyBcXCh4XzE9XFxkZXQoQV8xKS9cXGRldChBKVxcKS4gV2hhdCBpcyB3cm9uZz8iLCJvcHRpb25zIjpbIkEuIE5vdGhpbmc7IENyYW1lcidzIFJ1bGUgYWx3YXlzIHdvcmtzIGZvciBsaW5lYXIgc3lzdGVtcyIsIkIuIFRoZSBmb3JtdWxhIGRpdmlkZXMgYnkgemVybywgc28gQ3JhbWVyJ3MgUnVsZSBpcyBpbnZhbGlkIGhlcmUiLCJDLiBUaGUgc3R1ZGVudCBzaG91bGQgcmVwbGFjZSBhIHJvdyBpbnN0ZWFkIG9mIGEgY29sdW1uIiwiRC4gVGhlIGRldGVybWluYW50IG9mIFxcKEFfMVxcKSBtdXN0IGJlIGNvbXB1dGVkIGJlZm9yZSBjaGVja2luZyBcXChcXGRldChBKVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBkZW5vbWluYXRvciB3b3VsZCBiZSB6ZXJvLCBzbyB0aGUgZGV0ZXJtaW5hbnQgcmF0aW8gaXMgbm90IGEgdmFsaWQgbnVtYmVyLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkNyYW1lcidzIFJ1bGUgcmVxdWlyZXMgYSBzcXVhcmUgc3lzdGVtIHdpdGggbm9uemVybyBcXChcXGRldChBKVxcKS4iLCJDIjoiQ3JhbWVyJ3MgUnVsZSByZXBsYWNlcyBjb2x1bW5zLCBub3Qgcm93cy4iLCJEIjoiQ2hlY2tpbmcgXFwoXFxkZXQoQSlcXCkgZmlyc3QgaXMgZWZmaWNpZW50IGJlY2F1c2UgaXQgZGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBydWxlIGNhbiBiZSB1c2VkIGF0IGFsbC4ifSwiaGludCI6IkEgZm9ybXVsYSB3aXRoIGEgemVybyBkZW5vbWluYXRvciBpcyBub3QgdXNhYmxlLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiY29sdW1uX3JlcGxhY2VtZW50IiwibGFiZWwiOiJDb25zdHJ1Y3RpbmcgXFwoQV9pXFwpIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJUbyBjb21wdXRlIFxcKHhfMlxcKSB1c2luZyBDcmFtZXIncyBSdWxlLCB3aGljaCBtYXRyaXggc2hvdWxkIGJlIHVzZWQgaW4gdGhlIG51bWVyYXRvcj8iLCJvcHRpb25zIjpbIkEuIFxcKEFcXCkgd2l0aCByb3cgMiByZXBsYWNlZCBieSBcXChcXG1hdGhiZntifVxcKSIsIkIuIFxcKEFcXCkgd2l0aCBjb2x1bW4gMiByZXBsYWNlZCBieSBcXChcXG1hdGhiZntifVxcKSIsIkMuIFxcKEFcXCkgd2l0aCBldmVyeSBjb2x1bW4gcmVwbGFjZWQgYnkgXFwoXFxtYXRoYmZ7Yn1cXCkiLCJELiBcXChBXFwpIHdpdGggY29sdW1uIDEgcmVwbGFjZWQgYnkgXFwoXFxtYXRoYmZ7Yn1cXCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJcXChBXzJcXCkgaXMgZm9ybWVkIGJ5IHJlcGxhY2luZyBjb2x1bW4gMiBvZiBcXChBXFwpIHdpdGggdGhlIHJpZ2h0LWhhbmQtc2lkZSB2ZWN0b3IgXFwoXFxtYXRoYmZ7Yn1cXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiQ3JhbWVyJ3MgUnVsZSByZXBsYWNlcyBjb2x1bW5zLCBub3Qgcm93cy4iLCJDIjoiT25seSBvbmUgY29sdW1uIGlzIHJlcGxhY2VkIGF0IGEgdGltZS4iLCJEIjoiUmVwbGFjaW5nIGNvbHVtbiAxIHdvdWxkIGNvbXB1dGUgXFwoeF8xXFwpLCBub3QgXFwoeF8yXFwpLiJ9LCJoaW50IjoiVGhlIHN1YnNjcmlwdCB0ZWxscyB5b3Ugd2hpY2ggY29sdW1uIHRvIHJlcGxhY2UuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImxhdGV4X25hdGl2ZV9tYXRyaXhfY29sdW1uX3JlcGxhY2VtZW50X3Zpc3VhbCIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiT2JzZXJ2ZSBhIHZpc3VhbCB3aGVyZSBcXChcXG1hdGhiZntifVxcKSByZXBsYWNlcyB0aGUgdGhpcmQgY29sdW1uIG9mIFxcKEFcXCkuIFdoaWNoIHVua25vd24gaXMgYmVpbmcgY29tcHV0ZWQ/Iiwib3B0aW9ucyI6WyJBLiBcXCh4XzFcXCkiLCJCLiBcXCh4XzJcXCkiLCJDLiBcXCh4XzNcXCkiLCJELiBcXChcXGRldChBKVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlJlcGxhY2luZyBjb2x1bW4gMyBmb3JtcyBcXChBXzNcXCksIHNvIHRoZSBkZXRlcm1pbmFudCByYXRpbyBnaXZlcyBcXCh4XzNcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiXFwoeF8xXFwpIHdvdWxkIHJlcXVpcmUgcmVwbGFjaW5nIGNvbHVtbiAxLiIsIkIiOiJcXCh4XzJcXCkgd291bGQgcmVxdWlyZSByZXBsYWNpbmcgY29sdW1uIDIuIiwiRCI6IlxcKFxcZGV0KEEpXFwpIHVzZXMgdGhlIG9yaWdpbmFsIFxcKEFcXCksIHdpdGggbm8gY29sdW1uIHJlcGxhY2VkLiJ9LCJoaW50IjoiTWF0Y2ggdGhlIHJlcGxhY2VkIGNvbHVtbiBudW1iZXIgdG8gdGhlIHZhcmlhYmxlIHN1YnNjcmlwdC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoidmlzdWFsX3BhdHRlcm5fcmVjb2duaXRpb25fY2hlY2siLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImZvcm11bGFfYXBwbGljYXRpb24iLCJsYWJlbCI6IkFwcGx5aW5nIENyYW1lcidzIFJ1bGUiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDRfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciB0aGUgc2VjdGlvbiBleGFtcGxlLCBcXChcXGRldChBKT00XFwpIGFuZCBcXChcXGRldChBXzIpPTRcXCkuIFdoYXQgaXMgXFwoeF8yXFwpPyIsIm9wdGlvbnMiOlsiQS4gMCIsIkIuIDEiLCJDLiA0IiwiRC4gMTYiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJCeSBDcmFtZXIncyBSdWxlLCBcXCh4XzI9XFxkZXQoQV8yKS9cXGRldChBKT00LzQ9MVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGUgbnVtZXJhdG9yIFxcKFxcZGV0KEFfMik9NFxcKSBpcyBub3QgemVyby4iLCJDIjoiVGhpcyBmb3JnZXRzIHRvIGRpdmlkZSBieSBcXChcXGRldChBKT00XFwpOyB0aGUgcmVzdWx0IGlzIHRoZSBudW1lcmF0b3IgYWxvbmUuIiwiRCI6IlRoaXMgbXVsdGlwbGllcyB0aGUgZGV0ZXJtaW5hbnRzIGluc3RlYWQgb2YgZGl2aWRpbmcgdGhlbS4ifSwiaGludCI6IlVzZSBudW1lcmF0b3IgZGl2aWRlZCBieSBkZW5vbWluYXRvci4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJ3b3JrZWRfZXhhbXBsZV92ZXJpZmljYXRpb24iLCJsYWJlbCI6IlZlcmlmeWluZyB0aGUgc29sdXRpb24gdmVjdG9yIiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNV9xMSIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiVGhlIHNlY3Rpb24gZXhhbXBsZSBnaXZlcyBcXChcXG1hdGhiZnt4fT1cXGJlZ2lue2JtYXRyaXh9MlxcXFwxXFxcXC0yXFxlbmR7Ym1hdHJpeH1cXCkuIFZlcmlmeSB0aGUgZmlyc3QgZXF1YXRpb24gXFwoMnhfMSt4XzIreF8zPTNcXCkuIiwiaWRlYWxfYW5zd2VyIjoiU3Vic3RpdHV0ZSBcXCh4XzE9MlxcKSwgXFwoeF8yPTFcXCksIGFuZCBcXCh4XzM9LTJcXCk6IFxcKDIoMikrMSsoLTIpPTQrMS0yPTNcXCksIHNvIHRoZSBmaXJzdCBlcXVhdGlvbiBjaGVja3MuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBzdWJzdGl0dXRlIHRoZSBjb3JyZWN0IHZhbHVlcyBmb3IgXFwoeF8xXFwpLCBcXCh4XzJcXCksIGFuZCBcXCh4XzNcXCkiLCJNdXN0IGNvbXB1dGUgXFwoMigyKSsxLTI9M1xcKSIsIk11c3Qgc3RhdGUgdGhhdCB0aGUgZmlyc3QgZXF1YXRpb24gaXMgc2F0aXNmaWVkIl0sImV4cGxhbmF0aW9uIjoiVmVyaWZpY2F0aW9uIGNvbmZpcm1zIHRoYXQgdGhlIGRldGVybWluYW50LWJhc2VkIHNvbHV0aW9uIG1hdGNoZXMgdGhlIG9yaWdpbmFsIHN5c3RlbS4iLCJoaW50IjoiTWF0Y2ggZWFjaCBlbnRyeSBvZiB0aGUgc29sdXRpb24gdmVjdG9yIHRvIHRoZSBzYW1lIHN1YnNjcmlwdGVkIHZhcmlhYmxlLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
