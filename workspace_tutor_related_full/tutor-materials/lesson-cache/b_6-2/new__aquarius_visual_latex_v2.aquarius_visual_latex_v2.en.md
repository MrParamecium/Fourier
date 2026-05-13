%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6InJlYWN0X2RlbW8iLCJyYXRpb25hbGUiOiJUaGlzIHNlY3Rpb24gaXMgbW9zdGx5IHN5bWJvbGljIG1hdHJpeCBhbGdlYnJhLCBzbyBjbGVhbiBMYVRlWC1uYXRpdmUgbWF0cml4IGRpc3BsYXlzIGFyZSB0aGUgYmVzdCB2aXN1YWwgc3VyZmFjZSBmb3IgZGVmaW5pdGlvbnMuIFRoZSBvbmUgY29uY2VwdCB0aGF0IHN0dWRlbnRzIGNvbW1vbmx5IG1pc3VuZGVyc3RhbmQgdmlzdWFsbHkgaXMgbWF0cml4IG11bHRpcGxpY2F0aW9uIGNvbmZvcm1hYmlsaXR5LCBzbyBhIFJlYWN0ICsgQ2FudmFzIGRlbW8gc2hvdWxkIGxldCB0aGVtIGNoYW5nZSBtYXRyaXggc2l6ZXMgYW5kIHNlZSB2YWxpZCB2ZXJzdXMgaW52YWxpZCBwcm9kdWN0cy4iLCJjcmFtIjoiVXNlIHRoZSBkZW1vIHRvIHJlY29nbml6ZSBkaW1lbnNpb24tbWF0Y2hpbmcgcGF0dGVybnMgcXVpY2tseTogaW5uZXIgZGltZW5zaW9ucyBtdXN0IG1hdGNoIGFuZCBvdXRlciBkaW1lbnNpb25zIGdpdmUgdGhlIGFuc3dlciBzaXplLiIsInN0YW5kYXJkIjoiVXNlIExhVGVYIGZvciBleGFjdCBmb3JtdWxhcyBhbmQgdGhlIGRlbW8gZm9yIG9uZSByZXByZXNlbnRhdGl2ZSBtdWx0aXBsaWNhdGlvbiBleGFtcGxlIHdpdGggcm93LWNvbHVtbiBoaWdobGlnaHRpbmcuIiwidG9wX3Njb3JlIjoiVXNlIHRoZSBkZW1vIHRvIGV4cG9zZSBvcmRlciB0cmFwcyBzdWNoIGFzIEFCIGJlaW5nIGRlZmluZWQgd2hpbGUgQkEgbWF5IGJlIHVuZGVmaW5lZCBvciBhIGRpZmZlcmVudCBzaXplLiJ9" style="display:none;"></div>%%KC_END%%
# B.6-2 Matrix Algebra

> **Section Objective:** Learn the basic algebra rules for adding, multiplying, and inverting matrices.

---

## Concepts In This Section

- Matrix addition and subtraction
- Matrix multiplication
- Conformability
- Identity matrix
- Determinant product rule
- Matrix-vector multiplication
- Matrix inverse

## 1. Matrix Addition and Subtraction

Matrix addition and subtraction are **entry-by-entry** operations. You add or subtract the entry in row \(i\), column \(j\) of \(A\) with the entry in the same position of \(B\).

**Symbol guide:**
- \(A\) and \(B\) are both \(m \times n\) matrices (same number of rows and same number of columns)
- \(a_{ij}\) and \(b_{ij}\) are the entries at row \(i\), column \(j\)
- The result is also an \(m \times n\) matrix

**Minimal example:** If the top-left entry of \(A\) is \(3\) and the top-left entry of \(B\) is \(5\), then the top-left entry of \(A+B\) is \(8\).

### EXAM TRIGGER

Whenever you see "add two matrices," **check dimensions first**.

### COMMON MISUSE

A \(2 \times 3\) matrix and a \(3 \times 2\) matrix both contain six entries, but their orders differ — addition is **not defined**.

$$A \pm B = \left(a_{ij} \pm b_{ij}\right)_{m\times n}$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="interactive_demo" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiTGV0IHN0dWRlbnRzIGluc3RhbnRseSBzZWUgdGhlIGlubmVyLWRpbWVuc2lvbiBtYXRjaCBydWxlIGFuZCB0aGUgb3V0cHV0IHNpemUuIiwic3RhbmRhcmQiOiJVc2Ugb25lIHZhbGlkIHByb2R1Y3QgYW5kIG9uZSBpbnZhbGlkIHByb2R1Y3QgdG8gY29ubmVjdCBkaW1lbnNpb25zIHdpdGggcm93LWNvbHVtbiBtdWx0aXBsaWNhdGlvbi4iLCJ0b3Bfc2NvcmUiOiJMZXQgc3R1ZGVudHMgY29tcGFyZSBBQiBhbmQgQkEgdG8gc2VlIHdoeSBvcmRlciBtYXR0ZXJzLiJ9" style="display:none;"></div><div class="kc-interactive-demo" data-demo-b64="eyJ0eXBlIjoiaW50ZXJhY3RpdmVfZGVtbyIsInRlYWNoaW5nX3JvbGUiOiJjb25jZXB0X2FuY2hvciIsIm1vZGVfc3BlY2lmaWNfdmlzdWFsX3VzZSI6eyJjcmFtIjoiTGV0IHN0dWRlbnRzIGluc3RhbnRseSBzZWUgdGhlIGlubmVyLWRpbWVuc2lvbiBtYXRjaCBydWxlIGFuZCB0aGUgb3V0cHV0IHNpemUuIiwic3RhbmRhcmQiOiJVc2Ugb25lIHZhbGlkIHByb2R1Y3QgYW5kIG9uZSBpbnZhbGlkIHByb2R1Y3QgdG8gY29ubmVjdCBkaW1lbnNpb25zIHdpdGggcm93LWNvbHVtbiBtdWx0aXBsaWNhdGlvbi4iLCJ0b3Bfc2NvcmUiOiJMZXQgc3R1ZGVudHMgY29tcGFyZSBBQiBhbmQgQkEgdG8gc2VlIHdoeSBvcmRlciBtYXR0ZXJzLiJ9LCJ0aXRsZSI6Ik1hdHJpeCBNdWx0aXBsaWNhdGlvbiBDb25mb3JtYWJpbGl0eSBEZW1vIiwiZGVtb19zcGVjIjp7ImZyYW1ld29yayI6InJlYWN0IiwiY2FudmFzIjp0cnVlLCJkZXNjcmlwdGlvbiI6IlRocmVlIGxhYmVsZWQgcGFuZWxzOiBBIGlzIG3Dl24sIEIgaXMgbsOXcCwgYW5kIEM9QUIgaXMgbcOXcC4gU2xpZGVycyBvciBzdGVwIGJ1dHRvbnMgY29udHJvbCBtLCBuIChjb2x1bW5zIG9mIEEgLyByb3dzIG9mIEIpLCBhbmQgcC4gQSBzZXBhcmF0ZSBjb250cm9sIGxldHMgc3R1ZGVudHMgc2V0IHJvd3Mgb2YgQiBpbmRlcGVuZGVudGx5IHRvIGludGVudGlvbmFsbHkgYnJlYWsgY29uZm9ybWFiaWxpdHkuIFdoZW4gY29sdW1ucyBvZiBBIGVxdWFsIHJvd3Mgb2YgQiwgc2hvdyBhIGdyZWVuIERFRklORUQgYmFkZ2UgYW5kIGRpc3BsYXkgcmVzdWx0IHNpemUgbcOXcC4gV2hlbiB0aGV5IGRvIG5vdCBtYXRjaCwgc2hvdyBhIG11dGVkIHJlZCBOT1QgREVGSU5FRCBiYWRnZSBhbmQgaGlkZSBDLiBJbiB0aGUgdmFsaWQgc3RhdGUsIGFuaW1hdGUgb3IgaGlnaGxpZ2h0IHJvdyBpIG9mIEEgYW5kIGNvbHVtbiBqIG9mIEIgbWVldGluZyBhdCBlbnRyeSBjX2lqLiBXaGl0ZSBiYWNrZ3JvdW5kLCBsb3ctc2F0dXJhdGlvbiBhY2FkZW1pYyBwYWxldHRlLiIsIm5vdGVfYmVsb3dfY2FudmFzIjoiSW5uZXIgZGltZW5zaW9ucyBtdXN0IG1hdGNoOyBvdXRlciBkaW1lbnNpb25zIGJlY29tZSB0aGUgYW5zd2VyIHNpemUuIiwiY29udHJvbHMiOlt7ImxhYmVsIjoibSAocm93cyBvZiBBKSIsInR5cGUiOiJzbGlkZXIiLCJtaW4iOjEsIm1heCI6NX0seyJsYWJlbCI6Im4gKGNvbHMgb2YgQSA9IHJvd3Mgb2YgQikiLCJ0eXBlIjoic2xpZGVyIiwibWluIjoxLCJtYXgiOjV9LHsibGFiZWwiOiJwIChjb2xzIG9mIEIpIiwidHlwZSI6InNsaWRlciIsIm1pbiI6MSwibWF4Ijo1fSx7ImxhYmVsIjoiT3ZlcnJpZGUgcm93cyBvZiBCIiwidHlwZSI6InNsaWRlciIsIm1pbiI6MSwibWF4Ijo1LCJvcHRpb25hbCI6dHJ1ZX1dLCJ2YWxpZF9zdGF0ZSI6eyJiYWRnZSI6IkRFRklORUQiLCJiYWRnZV9jb2xvciI6ImdyZWVuIiwic2hvd19yZXN1bHRfc2l6ZSI6dHJ1ZSwiaGlnaGxpZ2h0Ijoicm93X2lfb2ZfQV9hbmRfY29sX2pfb2ZfQiJ9LCJpbnZhbGlkX3N0YXRlIjp7ImJhZGdlIjoiTk9UIERFRklORUQiLCJiYWRnZV9jb2xvciI6Im11dGVkX3JlZCIsInNob3dfcmVzdWx0X3NpemUiOmZhbHNlfX0sImNhcHRpb24iOiJEcmFnIHRoZSBzbGlkZXJzIHRvIGNoYW5nZSBtYXRyaXggc2l6ZXMuIFdhdGNoIHdoZW4gdGhlIGlubmVyIGRpbWVuc2lvbnMgbWF0Y2ggYW5kIHdoZW4gdGhleSBicmVhay4ifQ=="></div>%%KC_END%%

## 2. Matrix Multiplication: Row Times Column

Entry \(c_{ij}\) of \(C = AB\) is computed by taking **row \(i\) of \(A\)** and **column \(j\) of \(B\)**, multiplying corresponding elements, and summing.

**Symbol guide:**
- \(c_{ij}\): entry at row \(i\), column \(j\) of the result \(C\)
- \(a_{ik}\): entry at row \(i\), column \(k\) of \(A\)
- \(b_{kj}\): entry at row \(k\), column \(j\) of \(B\)
- \(k\) runs from \(1\) to \(n\), the shared inner dimension

**Minimal example:** For row \([2,\ 1]\) and column \([3,\ 4]^T\), the entry is \(2 \cdot 3 + 1 \cdot 4 = 10\).

### EXAM TRIGGER

"Find \(AB\)" → check dimensions first, then compute row-column dot products for each entry.

### COMMON MISUSE

Multiplying matching positions entry-by-entry (like addition) is **wrong** for matrix multiplication. Each output entry requires a full dot product across an entire row and column.

$$c_{ij}=a_{i1}b_{1j}+a_{i2}b_{2j}+\cdots+a_{in}b_{nj}=\sum_{k=1}^{n}a_{ik}b_{kj}\quad\text{(B.33)}$$

## 3. Identity Matrix: Multiplication That Changes Nothing

The identity matrix \(I\) acts like the number \(1\) for matrix multiplication — multiplying by \(I\) leaves \(A\) unchanged.

**Symbol guide:**
- \(A\): any matrix
- \(I\): the identity matrix (1s on the diagonal, 0s elsewhere)
- Both \(AI\) and \(IA\) are written because the required size of \(I\) may differ on each side when \(A\) is not square

**Minimal example:** A \(2 \times 3\) matrix \(A\) can be postmultiplied by a \(3 \times 3\) identity to give \(A\), and premultiplied by a \(2 \times 2\) identity to also give \(A\).

### EXAM TRIGGER

If a matrix expression contains \(I\), check whether the identity matrix has the **conformable order** for that position.

### COMMON MISUSE

Assuming one fixed identity size works everywhere. The left and right identity matrices may need to be different sizes.

$$AI = IA = A$$

## 4. Determinant Product Rule

The determinant of a product of square matrices equals the **product of their determinants**.

**Symbol guide:**
- \(|A|\) and \(|B|\): determinants of square matrices \(A\) and \(B\) — these are scalar values, not absolute values of individual entries

**When to use it:** When an exam gives a product \(AB\) but asks for its determinant or whether \(AB\) is invertible.

**Minimal example:** If \(|A| = 2\) and \(|B| = -3\), then \(|AB| = 2 \cdot (-3) = -6\).

### COMMON MISUSE

- Applying this rule to **non-square** matrices (determinants are only defined for square matrices).
- Confusing \(|AB|\) with an entry-by-entry absolute value operation.

$$|AB| = |A|\,|B|$$

## 5. Matrix Times Vector

A column vector \(x\) is treated as an \(n \times 1\) matrix. The product \(Ax\) is defined when \(A\) has \(n\) columns.

**Symbol guide:**
- \(A\): an \(m \times n\) matrix
- \(x\): an \(n \times 1\) column vector (input)
- \(y\): an \(m \times 1\) column vector (output) — \(A\) maps \(x\) into \(y\)

**Minimal example:** If \(A\) is \(3 \times 2\), then \(x\) must be \(2 \times 1\) and the output \(y\) is \(3 \times 1\).

### EXAM TRIGGER

An equation like \(y = Ax\) compactly represents an entire system of linear equations — one row of \(A\) gives one equation.

### COMMON MISUSE

Writing \(xA\) with a column vector \(x\): a \(2 \times 1\) vector cannot premultiply a \(3 \times 2\) matrix — the dimensions do not conform.

$$y = Ax \quad\text{(B.36)}$$

## 6. Matrix Inverse: Undoing a Matrix

The inverse \(A^{-1}\) reverses multiplication by a square matrix \(A\), similar to dividing by a nonzero number in scalar algebra.

**Defining property:** \(A^{-1}A = I\)

**Symbol guide:**
- \(A^{-1}\): the inverse of square matrix \(A\)
- \(I\): the identity matrix
- \(x\): the unknown vector to recover
- \(y\): the known output vector

**When to use it:** When a square linear system is written as \(y = Ax\) and the problem asks for \(x\).

**Minimal example:** If \(y\) is known and \(A^{-1}\) is given, compute \(x = A^{-1}y\) directly.

### EXAM TRIGGER

"Solve the matrix equation" often means isolate the unknown vector by premultiplying both sides by \(A^{-1}\).

### COMMON MISUSE

Using \(A^{-1}\) when \(A\) is **not square** or when \(A\) is square but **not invertible** (i.e., \(|A| = 0\)).

$$y = Ax \Rightarrow x = A^{-1}y \quad\text{(B.37)}$$

---
**📌 Key Takeaways**
- **Addition/Subtraction:** \(A \pm B = (a_{ij} \pm b_{ij})_{m\times n}\) — only defined when \(A\) and \(B\) have the same order.
- **Row-column product (B.33):** \(c_{ij} = \sum_{k=1}^{n} a_{ik}b_{kj}\) — inner dimensions must match; outer dimensions give the result size.
- **Identity matrix:** \(AI = IA = A\) — the identity acts like 1; its size must conform on each side.
- **Determinant product rule:** \(|AB| = |A|\,|B|\) — applies to square matrices only; determinants multiply, they do not add.
- **Matrix-vector product (B.36):** \(y = Ax\) — \(x\) must be \(n \times 1\) when \(A\) is \(m \times n\); result \(y\) is \(m \times 1\).
- **Matrix inverse (B.37):** \(y = Ax \Rightarrow x = A^{-1}y\) — requires \(A\) to be square and invertible; \(A^{-1}A = I\).

*Next, these rules let us manipulate systems of equations more efficiently.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImVudHJ5d2lzZV9tYXRyaXhfYWRkaXRpb24iLCJsYWJlbCI6Ik1hdHJpeCBhZGRpdGlvbiBhbmQgc3VidHJhY3Rpb24gcmVxdWlyZSBzYW1lIG9yZGVyIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6Ik1hdHJpeCBcXChBXFwpIGlzIFxcKDIgXFx0aW1lcyAzXFwpIGFuZCBtYXRyaXggXFwoQlxcKSBpcyBcXCgzIFxcdGltZXMgMlxcKS4gV2hpY2ggc3RhdGVtZW50IGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBcXChBK0JcXCkgaXMgZGVmaW5lZCBiZWNhdXNlIGJvdGggbWF0cmljZXMgY29udGFpbiBzaXggZW50cmllcy4iLCJCLiBcXChBK0JcXCkgaXMgbm90IGRlZmluZWQgYmVjYXVzZSB0aGUgb3JkZXJzIGFyZSBkaWZmZXJlbnQuIiwiQy4gXFwoQStCXFwpIGlzIGEgXFwoNSBcXHRpbWVzIDVcXCkgbWF0cml4LiIsIkQuIFxcKEErQlxcKSBpcyBkZWZpbmVkIG9ubHkgaWYgXFwoQUJcXCkgaXMgYWxzbyBkZWZpbmVkLiJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6Ik1hdHJpeCBhZGRpdGlvbiBpcyBlbnRyeS1ieS1lbnRyeSwgc28gZW50cmllcyBtdXN0IGhhdmUgbWF0Y2hpbmcgcG9zaXRpb25zLiBBIFxcKDIgXFx0aW1lcyAzXFwpIG1hdHJpeCBhbmQgYSBcXCgzIFxcdGltZXMgMlxcKSBtYXRyaXggZG8gbm90IGhhdmUgdGhlIHNhbWUgb3JkZXIuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiSGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBlbnRyaWVzIGlzIG5vdCBlbm91Z2g7IHRoZSBlbnRyaWVzIG11c3QgYmUgYXJyYW5nZWQgaW4gdGhlIHNhbWUgcG9zaXRpb25zLiIsIkMiOiJNYXRyaXggYWRkaXRpb24gZG9lcyBub3QgYWRkIGRpbWVuc2lvbnMgdG9nZXRoZXIuIiwiRCI6IkFkZGl0aW9uIGFuZCBtdWx0aXBsaWNhdGlvbiBoYXZlIGRpZmZlcmVudCBkaW1lbnNpb24gcnVsZXMuIn0sImhpbnQiOiJGb3IgYWRkaXRpb24sIGNvbXBhcmUgdGhlIGZ1bGwgb3JkZXIsIG5vdCBqdXN0IHRoZSBudW1iZXIgb2YgZW50cmllcy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJtYXRyaXhfbXVsdGlwbGljYXRpb25fY29uZm9ybWFiaWxpdHkiLCJsYWJlbCI6Ik1hdHJpeCBtdWx0aXBsaWNhdGlvbiBkaW1lbnNpb25zIGFuZCBvdXRwdXQgc2l6ZSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiXFwoQVxcKSBpcyBcXCg0IFxcdGltZXMgMlxcKSBhbmQgXFwoQlxcKSBpcyBcXCgyIFxcdGltZXMgNVxcKS4gV2hhdCBpcyB0aGUgb3JkZXIgb2YgXFwoQUJcXCk/Iiwib3B0aW9ucyI6WyJBLiBcXCg0IFxcdGltZXMgNVxcKSIsIkIuIFxcKDIgXFx0aW1lcyAyXFwpIiwiQy4gXFwoNSBcXHRpbWVzIDRcXCkiLCJELiBcXChBQlxcKSBpcyBub3QgZGVmaW5lZCJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlRoZSBpbm5lciBkaW1lbnNpb25zIG1hdGNoOiBcXCgyID0gMlxcKS4gVGhlIG91dGVyIGRpbWVuc2lvbnMgYmVjb21lIHRoZSByZXN1bHQgc2l6ZSwgc28gXFwoQUJcXCkgaXMgXFwoNCBcXHRpbWVzIDVcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhlIG1hdGNoaW5nIGlubmVyIGRpbWVuc2lvbnMgdGVsbCB5b3UgdGhlIHByb2R1Y3QgaXMgZGVmaW5lZDsgdGhleSBhcmUgbm90IHRoZSBvdXRwdXQgc2l6ZS4iLCJDIjoiVGhpcyByZXZlcnNlcyB0aGUgb3V0ZXIgZGltZW5zaW9ucy4iLCJEIjoiXFwoQUJcXCkgaXMgZGVmaW5lZCBiZWNhdXNlIHRoZSBjb2x1bW5zIG9mIFxcKEFcXCkgZXF1YWwgdGhlIHJvd3Mgb2YgXFwoQlxcKS4ifSwiaGludCI6IkNoZWNrIGlubmVyIGRpbWVuc2lvbnMgZmlyc3QsIHRoZW4ga2VlcCB0aGUgb3V0ZXIgZGltZW5zaW9ucy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkluIHRoZSBjb25mb3JtYWJpbGl0eSBkZW1vLCBcXChBXFwpIGlzIFxcKDMgXFx0aW1lcyA0XFwpIGFuZCBcXChCXFwpIGlzIGNoYW5nZWQgZnJvbSBcXCg0IFxcdGltZXMgMlxcKSB0byBcXCg1IFxcdGltZXMgMlxcKS4gV2hhdCBzaG91bGQgaGFwcGVuIHRvIFxcKEFCXFwpPyIsIm9wdGlvbnMiOlsiQS4gSXQgY2hhbmdlcyBmcm9tIFxcKDMgXFx0aW1lcyAyXFwpIHRvIFxcKDMgXFx0aW1lcyAyXFwpLCBzbyBpdCBzdGF5cyBkZWZpbmVkLiIsIkIuIEl0IGNoYW5nZXMgZnJvbSBkZWZpbmVkIHRvIG5vdCBkZWZpbmVkIGJlY2F1c2UgdGhlIGlubmVyIGRpbWVuc2lvbnMgbm8gbG9uZ2VyIG1hdGNoLiIsIkMuIEl0IGNoYW5nZXMgZnJvbSBcXCgzIFxcdGltZXMgMlxcKSB0byBcXCg1IFxcdGltZXMgNFxcKS4iLCJELiBJdCBzdGF5cyBkZWZpbmVkIGJlY2F1c2UgXFwoQlxcKSBzdGlsbCBoYXMgdHdvIGNvbHVtbnMuIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiRm9yIFxcKEEgPSAzIFxcdGltZXMgNFxcKSwgXFwoQlxcKSBtdXN0IGhhdmUgXFwoNFxcKSByb3dzLiBXaGVuIFxcKEJcXCkgYmVjb21lcyBcXCg1IFxcdGltZXMgMlxcKSwgdGhlIGlubmVyIGRpbWVuc2lvbnMgYXJlIFxcKDRcXCkgYW5kIFxcKDVcXCksIHNvIFxcKEFCXFwpIGlzIG5vdCBkZWZpbmVkLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBvdXRwdXQgc2l6ZSBcXCgzIFxcdGltZXMgMlxcKSBvbmx5IGV4aXN0cyB3aGVuIHRoZSBwcm9kdWN0IGlzIGRlZmluZWQuIiwiQyI6Ik1hdHJpeCBtdWx0aXBsaWNhdGlvbiBkb2VzIG5vdCByZXZlcnNlIGFuZCBjb21iaW5lIGRpbWVuc2lvbnMgdGhpcyB3YXkuIiwiRCI6IlRoZSBudW1iZXIgb2YgY29sdW1ucyBvZiBcXChCXFwpIGFmZmVjdHMgdGhlIG91dHB1dCB3aWR0aCwgYnV0IHRoZSBudW1iZXIgb2Ygcm93cyBvZiBcXChCXFwpIG11c3QgbWF0Y2ggdGhlIGNvbHVtbnMgb2YgXFwoQVxcKS4ifSwiaGludCI6IldhdGNoIHRoZSBpbm5lciBkaW1lbnNpb25zIGluIHRoZSBkZW1vOiBjb2x1bW5zIG9mIFxcKEFcXCkgYW5kIHJvd3Mgb2YgXFwoQlxcKS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoicmVhY3RfY2FudmFzX2RlbW8iLCJxdWVzdGlvbl9zdHlsZSI6ImRlbW9fb2JzZXJ2YXRpb25fY2hlY2siLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InJvd19jb2x1bW5fZW50cnlfZm9ybXVsYSIsImxhYmVsIjoiQ29tcHV0aW5nIGNfaWogYnkgcm93LWNvbHVtbiBkb3QgcHJvZHVjdCIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiVG8gY29tcHV0ZSBcXChjX3syM31cXCkgaW4gXFwoQyA9IEFCXFwpLCB3aGljaCBwYXJ0cyBkbyB5b3UgbXVsdGlwbHk/Iiwib3B0aW9ucyI6WyJBLiBSb3cgMiBvZiBcXChBXFwpIHdpdGggY29sdW1uIDMgb2YgXFwoQlxcKSIsIkIuIENvbHVtbiAyIG9mIFxcKEFcXCkgd2l0aCByb3cgMyBvZiBcXChCXFwpIiwiQy4gUm93IDMgb2YgXFwoQVxcKSB3aXRoIGNvbHVtbiAyIG9mIFxcKEJcXCkiLCJELiBFbnRyeSBcXChhX3syM31cXCkgd2l0aCBlbnRyeSBcXChiX3syM31cXCkgb25seSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlRoZSBlbnRyeSBcXChjX3tpan1cXCkgaXMgZm91bmQgZnJvbSByb3cgXFwoaVxcKSBvZiBcXChBXFwpIGFuZCBjb2x1bW4gXFwoalxcKSBvZiBcXChCXFwpLiBUaGVyZWZvcmUgXFwoY197MjN9XFwpIHVzZXMgcm93IFxcKDJcXCkgb2YgXFwoQVxcKSBhbmQgY29sdW1uIFxcKDNcXCkgb2YgXFwoQlxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGlzIHJldmVyc2VzIHRoZSByb3ctY29sdW1uIHJ1bGUuIiwiQyI6IlRoaXMgc3dhcHMgdGhlIGluZGljZXMuIiwiRCI6Ik1hdHJpeCBtdWx0aXBsaWNhdGlvbiBpcyBub3QgZW50cnktYnktZW50cnkgbXVsdGlwbGljYXRpb24uIn0sImhpbnQiOiJUaGUgZmlyc3QgaW5kZXggc2VsZWN0cyB0aGUgcm93IG9mIFxcKEFcXCk7IHRoZSBzZWNvbmQgc2VsZWN0cyB0aGUgY29sdW1uIG9mIFxcKEJcXCkuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImxhdGV4X25hdGl2ZV9tYXRyaXhfaGlnaGxpZ2h0IiwicXVlc3Rpb25fc3R5bGUiOiJ2aXN1YWxfcGF0dGVybl9yZWNvZ25pdGlvbl9jaGVjayIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiaWRlbnRpdHlfYW5kX2RldGVybWluYW50X3Byb3BlcnRpZXMiLCJsYWJlbCI6IklkZW50aXR5IG1hdHJpeCBhbmQgZGV0ZXJtaW5hbnQgcHJvZHVjdCBydWxlIiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNF9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggc3RhdGVtZW50IGlzIGFsd2F5cyBjb3JyZWN0IHdoZW4gdGhlIHByb2R1Y3RzIGFyZSBjb25mb3JtYWJsZSBhbmQgZGV0ZXJtaW5hbnRzIGV4aXN0PyIsIm9wdGlvbnMiOlsiQS4gXFwoQUkgPSBJQSA9IEFcXCkiLCJCLiBcXCh8QUJ8ID0gfEF8ICsgfEJ8XFwpIiwiQy4gTXVsdGlwbHlpbmcgYnkgXFwoSVxcKSBjaGFuZ2VzIGV2ZXJ5IGRpYWdvbmFsIGVudHJ5IHRvIDEuIiwiRC4gXFwofEFCfFxcKSBpcyBmb3VuZCBieSBtdWx0aXBseWluZyBtYXRjaGluZyBlbnRyaWVzIG9mIFxcKEFcXCkgYW5kIFxcKEJcXCkuIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGhlIGlkZW50aXR5IG1hdHJpeCBsZWF2ZXMgYSBtYXRyaXggdW5jaGFuZ2VkIHdoZW4gdGhlIGRpbWVuc2lvbnMgY29uZm9ybS4gVGhlIGRldGVybWluYW50IHByb2R1Y3QgcnVsZSBpcyBcXCh8QUJ8ID0gfEF8XFwsfEJ8XFwpLCBub3QgYSBzdW0uIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiRGV0ZXJtaW5hbnRzIG11bHRpcGx5IG92ZXIgbWF0cml4IHByb2R1Y3RzOyB0aGV5IGRvIG5vdCBhZGQuIiwiQyI6IlRoZSBpZGVudGl0eSBtYXRyaXggZG9lcyBub3Qgb3ZlcndyaXRlIFxcKEFcXCk7IGl0IGxlYXZlcyBcXChBXFwpIHVuY2hhbmdlZC4iLCJEIjoiVGhlIGRldGVybWluYW50IG9mIFxcKEFCXFwpIGlzIG5vdCBjb21wdXRlZCBieSBlbnRyeS1ieS1lbnRyeSBtdWx0aXBsaWNhdGlvbi4ifSwiaGludCI6IlRoZSBpZGVudGl0eSBtYXRyaXggYWN0cyBsaWtlIFxcKDFcXCkgZm9yIG11bHRpcGxpY2F0aW9uLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6Im1hdHJpeF92ZWN0b3JfYW5kX2ludmVyc2UiLCJsYWJlbCI6IlVzaW5nIHk9QXggYW5kIHg9QV57LTF9eSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiXFwoQVxcKSBpcyBcXCgzIFxcdGltZXMgMlxcKSBhbmQgXFwoeFxcKSBpcyBhIGNvbHVtbiB2ZWN0b3IuIFdoaWNoIHNpemUgbXVzdCBcXCh4XFwpIGhhdmUgZm9yIFxcKHkgPSBBeFxcKSB0byBiZSBkZWZpbmVkPyIsIm9wdGlvbnMiOlsiQS4gXFwoMiBcXHRpbWVzIDFcXCkiLCJCLiBcXCgzIFxcdGltZXMgMVxcKSIsIkMuIFxcKDEgXFx0aW1lcyAyXFwpIiwiRC4gXFwoMSBcXHRpbWVzIDNcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJcXChBXFwpIGhhcyBcXCgyXFwpIGNvbHVtbnMsIHNvIHRoZSBjb2x1bW4gdmVjdG9yIG11c3QgaGF2ZSBcXCgyXFwpIHJvd3MuIFRoZSBvdXRwdXQgXFwoeVxcKSB3aWxsIHRoZW4gYmUgXFwoMyBcXHRpbWVzIDFcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiXFwoMyBcXHRpbWVzIDFcXCkgaXMgdGhlIG91dHB1dCBzaXplLCBub3QgdGhlIHJlcXVpcmVkIGlucHV0IHNpemUuIiwiQyI6IlRoZSBzZWN0aW9uIHRyZWF0cyBcXCh4XFwpIGFzIGEgY29sdW1uIHZlY3Rvciwgbm90IGEgcm93IHZlY3Rvci4iLCJEIjoiVGhpcyBkb2VzIG5vdCBtYXRjaCB0aGUgY29sdW1ucyBvZiBcXChBXFwpLiJ9LCJoaW50IjoiRm9yIFxcKEF4XFwpLCByb3dzIG9mIFxcKHhcXCkgbXVzdCBtYXRjaCBjb2x1bW5zIG9mIFxcKEFcXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwNV9xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQSBjbGFzc21hdGUgc2VlcyBcXCh5ID0gQXhcXCkgYW5kIHdyaXRlcyBcXCh5QV57LTF9ID0geFxcKS4gRXhwbGFpbiB3aHkgdGhlIHRleHRib29rIGluc3RlYWQgdXNlcyBcXCh4ID0gQV57LTF9eVxcKS4iLCJpZGVhbF9hbnN3ZXIiOiJUaGUgaW52ZXJzZSBtdXN0IHByZW11bHRpcGx5IGJvdGggc2lkZXMgYmVjYXVzZSBcXChBXFwpIG11bHRpcGxpZXMgXFwoeFxcKSBvbiB0aGUgbGVmdCBpbiBcXCh5ID0gQXhcXCkuIFByZW11bHRpcGx5aW5nIGdpdmVzIFxcKEFeey0xfXkgPSBBXnstMX1BeCA9IEl4ID0geFxcKSwgc28gXFwoeCA9IEFeey0xfXlcXCkuIFdyaXRpbmcgXFwoeUFeey0xfVxcKSBjaGFuZ2VzIHRoZSBvcmRlciBhbmQgbWF5IG5vdCBldmVuIGJlIGRlZmluZWQuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBtZW50aW9uIHRoYXQgbWF0cml4IG11bHRpcGxpY2F0aW9uIG9yZGVyIG1hdHRlcnMuIiwiTXVzdCBzdGF0ZSB0aGF0IFxcKEFeey0xfVxcKSBwcmVtdWx0aXBsaWVzIFxcKHlcXCkuIiwiTXVzdCB1c2Ugb3IgZGVzY3JpYmUgXFwoQV57LTF9QSA9IElcXCkuIiwiTXVzdCBjb25jbHVkZSBcXCh4ID0gQV57LTF9eVxcKS4iXSwiZXhwbGFuYXRpb24iOiJUaGlzIGNoZWNrcyB3aGV0aGVyIHRoZSBzdHVkZW50IHVuZGVyc3RhbmRzIGludmVyc2UgbXVsdGlwbGljYXRpb24gYXMgYW4gb3BlcmF0aW9uIHdpdGggb3JkZXIsIG5vdCBvcmRpbmFyeSBzY2FsYXIgZGl2aXNpb24uIiwiaGludCI6IllvdSBtdXN0IHVuZG8gXFwoQVxcKSBvbiB0aGUgc2FtZSBzaWRlIHdoZXJlIFxcKEFcXCkgaXMgbXVsdGlwbHlpbmcgXFwoeFxcKS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
