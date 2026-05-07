%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6Indpa2lfcmVmZXJlbmNlIiwicmF0aW9uYWxlIjoiVGhpcyBzZWN0aW9uIGlzIG1vc3RseSBzeW1ib2xpYyBtYXRyaXggYWxnZWJyYSwgc28gZXhhY3QgTGFUZVggZm9ybXVsYXMgc2hvdWxkIGNhcnJ5IHRoZSBkZWZpbml0aW9ucy4gVGhlIG9uZSBjb25jZXB0IHRoYXQgYmVuZWZpdHMgc3Ryb25nbHkgZnJvbSBhIHZpc3VhbCBpcyBtYXRyaXggbXVsdGlwbGljYXRpb24sIHdoZXJlIHN0dWRlbnRzIG11c3Qgc2VlIHRoZSByb3cgb2YgQSBwYWlyZWQgd2l0aCB0aGUgY29sdW1uIG9mIEIuIFVzZSBhIFdpa2lwZWRpYSBvciBXaWtpbWVkaWEgcm93LWNvbHVtbiBtdWx0aXBsaWNhdGlvbiBkaWFncmFtIGZvciB0aGF0IHJlZmVyZW5jZSB2aXN1YWw7IGRvIG5vdCB1c2UgYSBnZW5lcmF0ZWQgaW1hZ2UgdW5sZXNzIHRoZSByZWZlcmVuY2Ugc2VhcmNoIGZhaWxzLiIsImNyYW0iOiJVc2UgdGhlIHZpc3VhbCB0byBtYWtlIHRoZSBkaW1lbnNpb24gcnVsZSBhbmQgcm93LWNvbHVtbiBkb3QgcHJvZHVjdCBpbnN0YW50bHkgcmVjb2duaXphYmxlLiIsInN0YW5kYXJkIjoiVXNlIHRoZSB2aXN1YWwgYWZ0ZXIgdGhlIG11bHRpcGxpY2F0aW9uIGZvcm11bGEgdG8gY29ubmVjdCB0aGUgc3ltYm9scyBjX2lqIHRvIG9uZSByZXByZXNlbnRhdGl2ZSB3b3JrZWQgZXhhbXBsZS4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhlIHZpc3VhbCB0byBlbXBoYXNpemUgdHJhcHM6IEFCIG1heSBleGlzdCB3aGlsZSBCQSBtYXkgbm90LCBhbmQgY19paiBjb21lcyBmcm9tIHJvdyBpIGFuZCBjb2x1bW4gai4ifQ==" style="display:none;"></div>%%KC_END%%
# Matrix Algebra

> **Section Objective:** Learn the algebra rules that let matrices be added, scaled, multiplied, and inverted.

**Concepts In This Section**

- Matrix addition
- Scalar multiplication
- Matrix multiplication
- Conformability
- Identity matrix
- Matrix-vector multiplication
- Inverse matrix

## 1. Entry-by-entry operations

$$\begin{aligned}
A+B&=(a_{ij}+b_{ij})_{m\times n}\quad \text{only when }A,B\text{ have the same order }m\times n,\\
cA&=(ca_{ij})_{m\times n}=Ac
\end{aligned}$$
*## 1. Entry-by-entry operations

Matrix addition and scalar multiplication act on **matching positions** — not on rows or columns as whole objects. Each entry in the result is computed independently from the corresponding entry (or entries) in the inputs.

**Symbol guide:**
- \(A\) and \(B\) are matrices of the same order \(m \times n\)
- \(a_{ij}\) and \(b_{ij}\) are the entries in row \(i\) and column \(j\)
- \(m \times n\) is the matrix order (\(m\) rows, \(n\) columns)
- \(c\) is a scalar (an ordinary number)

**Minimal example — addition:**

$$
\begin{bmatrix}1 & 2\\3 & 4\end{bmatrix}+\begin{bmatrix}5 & 6\\7 & 8\end{bmatrix}=\begin{bmatrix}6 & 8\\10 & 12\end{bmatrix}
$$

**Minimal example — scalar multiplication:**

$$
3\begin{bmatrix}1 & 2\\3 & 4\end{bmatrix}=\begin{bmatrix}3 & 6\\9 & 12\end{bmatrix}
$$

### WHEN TO USE THIS

Use entry-by-entry rules when matrices have **identical dimensions** or when every entry is being scaled by the same number.

### EXAM TRIGGER

Phrases like "find \(A+B\)", "compute \(2A\)", or "same order matrices" signal these operations.

#### Common Misuse

Do **not** try to add a \(2 \times 3\) matrix to a \(3 \times 2\) matrix just because both contain six entries. The orders must match exactly.*

## 2. Matrix multiplication: row times column

$$\begin{aligned}
A_{m\times n}B_{n\times p}&=C_{m\times p},\\
c_{ij}&=a_{i1}b_{1j}+a_{i2}b_{2j}+\cdots+a_{in}b_{nj}\\
&=\sum_{k=1}^{n}a_{ik}b_{kj}
\end{aligned}$$
*## 2. Matrix multiplication: row times column

The product \(AB\) is defined **only when the number of columns of \(A\) equals the number of rows of \(B\)** — this is the conformability condition.

**Symbol guide:**
- \(A\) is \(m \times n\): \(m\) rows, \(n\) columns
- \(B\) is \(n \times p\): \(n\) rows, \(p\) columns
- \(C\) is the product with size \(m \times p\)
- \(c_{ij}\) is the entry in row \(i\) and column \(j\) of \(C\)
- \(k\) is the running index across the shared dimension \(n\)

Each entry \(c_{ij}\) is the **dot product of row \(i\) of \(A\) with column \(j\) of \(B\)**.

### WHEN TO USE THIS

Use this formula whenever the problem asks for \(AB\) or for a specific product entry \(c_{ij}\).

### EXAM TRIGGER

Dimension chains such as \((m \times n)(n \times p)\) — the inner dimensions must match.

#### Common Misuse

Do **not** multiply matching positions entry-by-entry (that is addition logic, not multiplication). Do **not** assume \(AB\) and \(BA\) are automatically both defined.*


### WORKED EXAMPLE

Let \(A = \begin{bmatrix}2 & 3\\1 & 1\end{bmatrix}\) (\(2 \times 2\)) and \(B = \begin{bmatrix}1 & 3 & 1 & 2\\2 & 1 & 1 & 1\end{bmatrix}\) (\(2 \times 4\)).

The inner dimensions both equal 2, so \(AB\) is defined and the result is \(2 \times 4\).

Compute two entries:

$$
c_{11} = 2(1)+3(2) = 2+6 = 8
$$

$$
c_{12} = 2(3)+3(1) = 6+3 = 9
$$

Full product:

$$
AB = \begin{bmatrix}8 & 9 & 5 & 7\\3 & 4 & 2 & 3\end{bmatrix}
$$

> **Exam Note:** Always check dimensions before doing arithmetic. Undefined products earn no partial credit if you compute anyway.

## 3. Useful multiplication properties

$$\begin{aligned}
(A+B)C&=AC+BC,\\
C(A+B)&=CA+CB,\\
AI&=IA=A,\\
|AB|&=|A||B|,\\
y&=Ax\quad \text{with }x\text{ treated as an }n\times 1\text{ column vector}
\end{aligned}$$
*## 3. Useful multiplication properties

- **Distributive laws:** \((A+B)C = AC+BC\) and \(C(A+B) = CA+CB\). Multiplication distributes over addition when all products are conformable. Note that order matters — you cannot swap left and right factors.

- **Identity matrix \(I\):** \(AI = IA = A\). The identity matrix \(I\) is the matrix that leaves \(A\) unchanged under multiplication. It has 1s on the main diagonal and 0s everywhere else, and its size must match the dimension being multiplied.

- **Determinant product rule:** \(|AB| = |A||B|\). Here \(|A|\) denotes the determinant of \(A\). This property applies to square matrices of compatible size.

- **Matrix-vector multiplication:** \(y = Ax\) treats \(x\) as an \(n \times 1\) column matrix. For example, if \(A\) is \(3 \times 2\) and \(x\) is \(2 \times 1\), then \(Ax\) is \(3 \times 1\), but \(xA\) is not defined.

### COMMON MISTAKE

Do **not** assume matrix multiplication is commutative just because scalar multiplication is. In general, \(AB \neq BA\).*

## 4. Matrix inverse

$$\begin{aligned}
A^{-1}A&=I,\qquad AA^{-1}=I,\\
y&=Ax\quad \Longrightarrow \quad x=A^{-1}y,\\
A^{-1}&=\frac{1}{|A|}\operatorname{adj}(A),\qquad |A|\ne 0
\end{aligned}$$
*## 4. Matrix inverse

\(A^{-1}\) is the matrix that **undoes multiplication by \(A\)**. Multiplying \(A\) by its inverse on either side returns the identity matrix.

**Symbol guide:**
- \(A\) must be **square** (same number of rows and columns)
- \(A^{-1}\) is the inverse of \(A\)
- \(I\) is the identity matrix of the same size
- \(|A|\) is the determinant of \(A\)
- \(\operatorname{adj}(A)\) is the adjugate of \(A\) — the transpose of the cofactor matrix

**When to use it:** Use the inverse to solve \(y = Ax\) for \(x\) when \(A\) is invertible: multiply both sides on the left by \(A^{-1}\) to get \(x = A^{-1}y\).

### EXAM TRIGGER

Phrases like "solve the matrix equation", "find \(A^{-1}\)", or "determine whether the inverse exists" all point to this formula.

#### Common Misuse

Do **not** try to invert a non-square matrix. Do **not** attempt to invert a square matrix whose determinant is zero — the inverse does not exist in that case.*

### WORKED EXAMPLE — INVERSE

Let \(A = \begin{bmatrix}2 & 1\\1 & 1\end{bmatrix}\).

First, compute the determinant:

$$
|A| = 2(1) - 1(1) = 1 \neq 0
$$

Since \(|A| \neq 0\), the inverse exists:

$$
A^{-1} = \begin{bmatrix}1 & -1\\-1 & 2\end{bmatrix}
$$

Verification: \(AA^{-1} = I\), confirming that \(A^{-1}\) reverses the action of \(A\). Any vector transformed by \(A\) can be recovered by applying \(A^{-1}\).

> **Exam Note:** Before computing an inverse, first check: square matrix and nonzero determinant.

---
**📌 Key Takeaways**
- Matrix addition and scalar multiplication act entry-by-entry; dimensions must match for addition.
- Matrix multiplication \(AB\) requires inner dimensions to match; each entry \(c_{ij}\) is a row-column dot product.
- The identity matrix leaves any conformable matrix unchanged; \(|AB| = |A||B|\) for square matrices.
- The inverse \(A^{-1}\) exists only when \(A\) is square and \(|A| \neq 0\); it solves \(y = Ax\) for \(x\).

*In the next section we will use these matrix tools to manipulate larger systems more efficiently.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImVudHJ5d2lzZV9vcGVyYXRpb25zIiwibGFiZWwiOiJNYXRyaXggYWRkaXRpb24gYW5kIHNjYWxhciBtdWx0aXBsaWNhdGlvbiIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBvcGVyYXRpb24gaXMgZGVmaW5lZD8iLCJvcHRpb25zIjpbIkEuIEFkZGluZyBhIFxcKDIgXFx0aW1lcyAzXFwpIG1hdHJpeCBhbmQgYSBcXCgzIFxcdGltZXMgMlxcKSBtYXRyaXgiLCJCLiBBZGRpbmcgYSBcXCg0IFxcdGltZXMgMVxcKSBtYXRyaXggYW5kIGEgXFwoNCBcXHRpbWVzIDFcXCkgbWF0cml4IiwiQy4gQWRkaW5nIGEgXFwoMiBcXHRpbWVzIDJcXCkgbWF0cml4IGFuZCBhIFxcKDIgXFx0aW1lcyAzXFwpIG1hdHJpeCIsIkQuIEFkZGluZyBhbnkgdHdvIG1hdHJpY2VzIHdpdGggdGhlIHNhbWUgbnVtYmVyIG9mIGVudHJpZXMiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJNYXRyaXggYWRkaXRpb24gaXMgZGVmaW5lZCBvbmx5IHdoZW4gdGhlIHR3byBtYXRyaWNlcyBoYXZlIGV4YWN0bHkgdGhlIHNhbWUgb3JkZXIuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiQm90aCBtYXRyaWNlcyBjb250YWluIHNpeCBlbnRyaWVzLCBidXQgdGhlaXIgb3JkZXJzIGFyZSBkaWZmZXJlbnQuIiwiQyI6IlRoZSByb3cgY291bnQgbWF0Y2hlcywgYnV0IHRoZSBjb2x1bW4gY291bnQgZG9lcyBub3QuIiwiRCI6IlNhbWUgbnVtYmVyIG9mIGVudHJpZXMgaXMgbm90IGVub3VnaDsgdGhlIHBvc2l0aW9ucyBtdXN0IG1hdGNoLiJ9LCJoaW50IjoiRm9yIGFkZGl0aW9uLCBjb21wYXJlIHRoZSBmdWxsIG9yZGVyOiByb3dzIGFuZCBjb2x1bW5zLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIFxcKEEgPSBcXGJlZ2lue2JtYXRyaXh9MSAmIC0yXFxcXDMgJiAwXFxlbmR7Ym1hdHJpeH1cXCksIHdoYXQgaXMgXFwoMkFcXCk/Iiwib3B0aW9ucyI6WyJBLiBcXChcXGJlZ2lue2JtYXRyaXh9MiAmIC00XFxcXDYgJiAwXFxlbmR7Ym1hdHJpeH1cXCkiLCJCLiBcXChcXGJlZ2lue2JtYXRyaXh9MyAmIDBcXFxcNSAmIDJcXGVuZHtibWF0cml4fVxcKSIsIkMuIFxcKFxcYmVnaW57Ym1hdHJpeH0yICYgLTJcXFxcMyAmIDBcXGVuZHtibWF0cml4fVxcKSIsIkQuIFxcKFxcYmVnaW57Ym1hdHJpeH0xICYgLTRcXFxcNiAmIDBcXGVuZHtibWF0cml4fVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlNjYWxhciBtdWx0aXBsaWNhdGlvbiBtdWx0aXBsaWVzIGV2ZXJ5IGVudHJ5IG9mIHRoZSBtYXRyaXggYnkgdGhlIHNjYWxhci4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGlzIGFkZHMgMiB0byBlYWNoIGVudHJ5IGluc3RlYWQgb2YgbXVsdGlwbHlpbmcgYnkgMi4iLCJDIjoiT25seSB0aGUgZmlyc3QgZW50cnkgd2FzIGRvdWJsZWQgY29ycmVjdGx5LiIsIkQiOiJUaGUgZmlyc3QgZW50cnkgd2FzIG5vdCBkb3VibGVkLiJ9LCJoaW50IjoiQXBwbHkgdGhlIHNjYWxhciB0byBldmVyeSBwb3NpdGlvbi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJtYXRyaXhfbXVsdGlwbGljYXRpb24iLCJsYWJlbCI6Ik1hdHJpeCBtdWx0aXBsaWNhdGlvbiBhbmQgY29uZm9ybWFiaWxpdHkiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IlxcKEFcXCkgaXMgXFwoMyBcXHRpbWVzIDJcXCkgYW5kIFxcKEJcXCkgaXMgXFwoMiBcXHRpbWVzIDVcXCkuIFdoYXQgaXMgdGhlIHNpemUgb2YgXFwoQUJcXCk/Iiwib3B0aW9ucyI6WyJBLiBcXCgzIFxcdGltZXMgNVxcKSIsIkIuIFxcKDIgXFx0aW1lcyAyXFwpIiwiQy4gXFwoNSBcXHRpbWVzIDNcXCkiLCJELiBcXChBQlxcKSBpcyB1bmRlZmluZWQiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJUaGUgaW5zaWRlIGRpbWVuc2lvbnMgbWF0Y2g6IFxcKDIgPSAyXFwpLiBUaGUgb3V0c2lkZSBkaW1lbnNpb25zIGdpdmUgdGhlIHByb2R1Y3Qgc2l6ZTogXFwoMyBcXHRpbWVzIDVcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhlIG1hdGNoaW5nIGluc2lkZSBkaW1lbnNpb25zIG9ubHkgZGVjaWRlIHdoZXRoZXIgbXVsdGlwbGljYXRpb24gaXMgYWxsb3dlZDsgdGhleSBkbyBub3QgYmVjb21lIHRoZSBvdXRwdXQgc2l6ZS4iLCJDIjoiVGhpcyByZXZlcnNlcyB0aGUgb3V0c2lkZSBkaW1lbnNpb25zLiIsIkQiOiJUaGUgcHJvZHVjdCBpcyBkZWZpbmVkIGJlY2F1c2UgdGhlIGNvbHVtbnMgb2YgXFwoQVxcKSBlcXVhbCB0aGUgcm93cyBvZiBcXChCXFwpLiJ9LCJoaW50IjoiQ2hlY2sgaW5zaWRlIGRpbWVuc2lvbnMgZmlyc3QsIHRoZW4ga2VlcCB0aGUgb3V0c2lkZSBkaW1lbnNpb25zLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSW4gYSByb3ctY29sdW1uIG11bHRpcGxpY2F0aW9uIGRpYWdyYW0gZm9yIFxcKEMgPSBBQlxcKSwgcm93IDIgb2YgXFwoQVxcKSBhbmQgY29sdW1uIDMgb2YgXFwoQlxcKSBhcmUgaGlnaGxpZ2h0ZWQuIFdoaWNoIGVudHJ5IG9mIFxcKENcXCkgaXMgYmVpbmcgY29tcHV0ZWQ/Iiwib3B0aW9ucyI6WyJBLiBcXChjX3syM31cXCkiLCJCLiBcXChjX3szMn1cXCkiLCJDLiBcXChjX3syMn1cXCkiLCJELiBcXChjX3szM31cXCkiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJUaGUgcm93IGluZGV4IGNvbWVzIGZyb20gXFwoQVxcKSBhbmQgdGhlIGNvbHVtbiBpbmRleCBjb21lcyBmcm9tIFxcKEJcXCksIHNvIHJvdyAyIHdpdGggY29sdW1uIDMgY29tcHV0ZXMgXFwoY197MjN9XFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoaXMgc3dhcHMgdGhlIHJvdyBhbmQgY29sdW1uIGluZGljZXMuIiwiQyI6IlRoaXMgdXNlcyB0aGUgY29ycmVjdCByb3cgYnV0IHRoZSB3cm9uZyBjb2x1bW4uIiwiRCI6IlRoaXMgdXNlcyB0aGUgY29ycmVjdCBjb2x1bW4gYnV0IHRoZSB3cm9uZyByb3cuIn0sImhpbnQiOiJUaGUgZmlyc3Qgc3Vic2NyaXB0IGlzIHRoZSByb3cgb2YgXFwoQVxcKTsgdGhlIHNlY29uZCBzdWJzY3JpcHQgaXMgdGhlIGNvbHVtbiBvZiBcXChCXFwpLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJyb3dfY29sdW1uX2hpZ2hsaWdodF9tYXRyaXhfbXVsdGlwbGljYXRpb24iLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6Im11bHRpcGxpY2F0aW9uX3Byb3BlcnRpZXMiLCJsYWJlbCI6IklkZW50aXR5IG1hdHJpeCwgZGV0ZXJtaW5hbnQgcHJvZHVjdCwgYW5kIG1hdHJpeC12ZWN0b3IgbXVsdGlwbGljYXRpb24iLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBzdGF0ZW1lbnQgaXMgYWx3YXlzIHNhZmUgdG8gdXNlIHdoZW4gdGhlIG1hdHJpeCBzaXplcyBhcmUgY29uZm9ybWFibGU/Iiwib3B0aW9ucyI6WyJBLiBcXChBQiA9IEJBXFwpIiwiQi4gXFwoQUkgPSBJQSA9IEFcXCksIHVzaW5nIHRoZSBjb3JyZWN0bHkgc2l6ZWQgaWRlbnRpdHkgbWF0cml4IiwiQy4gXFwoeEFcXCkgaXMgYWx3YXlzIGRlZmluZWQgd2hlbmV2ZXIgXFwoQXhcXCkgaXMgZGVmaW5lZCIsIkQuIFxcKHxBK0J8ID0gfEF8ICsgfEJ8XFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIGlkZW50aXR5IG1hdHJpeCBsZWF2ZXMgYSBtYXRyaXggdW5jaGFuZ2VkIG9uIG11bHRpcGxpY2F0aW9uLCBhcyBsb25nIGFzIHRoZSBpZGVudGl0eSBoYXMgdGhlIGNvcnJlY3Qgc2l6ZS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJNYXRyaXggbXVsdGlwbGljYXRpb24gaXMgZ2VuZXJhbGx5IG5vdCBjb21tdXRhdGl2ZS4iLCJDIjoiSWYgXFwoeFxcKSBpcyB0cmVhdGVkIGFzIGEgY29sdW1uIHZlY3RvciwgXFwoQXhcXCkgbWF5IGJlIGRlZmluZWQgd2hpbGUgXFwoeEFcXCkgaXMgbWVhbmluZ2xlc3MuIiwiRCI6IlRoZSBkZXRlcm1pbmFudCBkb2VzIG5vdCBnZW5lcmFsbHkgZGlzdHJpYnV0ZSBvdmVyIGFkZGl0aW9uLiJ9LCJoaW50IjoiTG9vayBmb3IgdGhlIHByb3BlcnR5IHN0YXRlZCBkaXJlY3RseSBpbiB0aGUgc2VjdGlvbi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJpbnZlcnNlX21hdHJpeCIsImxhYmVsIjoiSW52ZXJzZSBleGlzdGVuY2UgYW5kIHVzZSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNF9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggY29uZGl0aW9uIGlzIHJlcXVpcmVkIGZvciBcXChBXnstMX1cXCkgdG8gZXhpc3Q/Iiwib3B0aW9ucyI6WyJBLiBcXChBXFwpIG11c3QgYmUgc3F1YXJlIGFuZCBcXCh8QXxcXCkgbXVzdCBiZSBub256ZXJvIiwiQi4gXFwoQVxcKSBtdXN0IGhhdmUgbW9yZSByb3dzIHRoYW4gY29sdW1ucyIsIkMuIEV2ZXJ5IGVudHJ5IG9mIFxcKEFcXCkgbXVzdCBiZSBub256ZXJvIiwiRC4gXFwoQVxcKSBtdXN0IHNhdGlzZnkgXFwoQUIgPSBCQVxcKSBmb3IgZXZlcnkgbWF0cml4IFxcKEJcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJUaGUgaW52ZXJzZSBleGlzdHMgb25seSBmb3IgYSBub25zaW5ndWxhciBzcXVhcmUgbWF0cml4LCBtZWFuaW5nIHNxdWFyZSB3aXRoIG5vbnplcm8gZGV0ZXJtaW5hbnQuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiTm9uLXNxdWFyZSBtYXRyaWNlcyBkbyBub3QgaGF2ZSB0aGUgaW52ZXJzZSBkZWZpbmVkIGluIHRoaXMgc2VjdGlvbi4iLCJDIjoiQSBtYXRyaXggY2FuIGNvbnRhaW4gemVyb3MgYW5kIHN0aWxsIGJlIGludmVydGlibGUuIiwiRCI6IkNvbW11dGluZyB3aXRoIGV2ZXJ5IG1hdHJpeCBpcyBub3QgdGhlIGNvbmRpdGlvbiBmb3IgaW52ZXJ0aWJpbGl0eS4ifSwiaGludCI6IlRoZSBzZWN0aW9uIGdpdmVzIHR3byBjaGVja3MgYmVmb3JlIGFuIGludmVyc2UgY2FuIGV4aXN0LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwNF9xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQSBjbGFzc21hdGUgdHJpZXMgdG8gaW52ZXJ0IGEgXFwoMiBcXHRpbWVzIDNcXCkgbWF0cml4IHRvIHNvbHZlIFxcKHkgPSBBeFxcKS4gRXhwbGFpbiBwcmVjaXNlbHkgd2h5IHRoaXMgaXMgbm90IHZhbGlkIGluIHRoaXMgc2VjdGlvbi4iLCJpZGVhbF9hbnN3ZXIiOiJUaGUgaW52ZXJzZSBcXChBXnstMX1cXCkgaXMgZGVmaW5lZCBvbmx5IGZvciBzcXVhcmUgbWF0cmljZXMuIEEgXFwoMiBcXHRpbWVzIDNcXCkgbWF0cml4IGlzIG5vdCBzcXVhcmUsIHNvIGl0IGRvZXMgbm90IGhhdmUgdGhlIGludmVyc2UgZGVzY3JpYmVkIGhlcmUuIFRvIHVzZSBcXCh4ID0gQV57LTF9eVxcKSwgXFwoQVxcKSBtdXN0IGJlIHNxdWFyZSBhbmQgaGF2ZSBub256ZXJvIGRldGVybWluYW50LiIsImdyYWRpbmdfcnVicmljIjpbIk11c3Qgc3RhdGUgdGhhdCB0aGUgbWF0cml4IGlzIG5vdCBzcXVhcmUiLCJNdXN0IHN0YXRlIHRoYXQgdGhpcyBzZWN0aW9uIGRlZmluZXMgaW52ZXJzZXMgb25seSBmb3Igc3F1YXJlIG1hdHJpY2VzIiwiTXVzdCBjb25uZWN0IHRoZSBpbnZhbGlkIGludmVyc2UgdG8gdGhlIGVxdWF0aW9uIFxcKHggPSBBXnstMX15XFwpIiwiU2hvdWxkIG1lbnRpb24gbm9uemVybyBkZXRlcm1pbmFudCBhcyB0aGUgc2Vjb25kIHJlcXVpcmVkIGNvbmRpdGlvbiJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQgdW5kZXJzdGFuZHMgaW52ZXJzZSBleGlzdGVuY2UgaW5zdGVhZCBvZiB0cmVhdGluZyBcXChBXnstMX1cXCkgYXMgYSBzeW1ib2wgdGhhdCBhbHdheXMgd29ya3MuIiwiaGludCI6IkFzayB3aGV0aGVyIHRoZSBkZXRlcm1pbmFudCBvZiBhIFxcKDIgXFx0aW1lcyAzXFwpIG1hdHJpeCBpcyBldmVuIGRlZmluZWQgaW4gdGhlIHVzdWFsIHNxdWFyZS1tYXRyaXggc2Vuc2UuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19XX0=" style="display:none;"></div>%%KC_END%%
