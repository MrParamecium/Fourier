%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6Indpa2lfcmVmZXJlbmNlIiwicmF0aW9uYWxlIjoiTWF0cml4IG11bHRpcGxpY2F0aW9uIGlzIHN5bWJvbGljLCBzbyB0aGUgZm9ybXVsYXMgc2hvdWxkIGJlIHRhdWdodCB3aXRoIGNsZWFuIExhVGVYIGZpcnN0LiBBIHN0YW5kYXJkIFdpa2ltZWRpYS1zdHlsZSByb3ctYnktY29sdW1uIGRpYWdyYW0gaXMgdXNlZnVsIGJlY2F1c2Ugc3R1ZGVudHMgb2Z0ZW4gZmFpbCB0byBzZWUgdGhhdCBvbmUgb3V0cHV0IGVudHJ5IGNvbWVzIGZyb20gb25lIHJvdyBhbmQgb25lIGNvbHVtbi4gTm8gY3JvcHBlZCB0ZXh0Ym9vayBmaWd1cmVzIGFyZSBhdmFpbGFibGUgZm9yIHRoaXMgc2VjdGlvbiwgc28gdGhlIHZpc3VhbCBzdHJhdGVneSBzaG91bGQgY29tYmluZSBMYVRlWC1uYXRpdmUgc3RydWN0dXJlIHdpdGggb25lIHB1YmxpYyByZWZlcmVuY2UgZGlhZ3JhbS4iLCJjcmFtIjoiVXNlIHRoZSByb3ctY29sdW1uIHZpc3VhbCB0byBpZGVudGlmeSB0aGUgZXhhbSB0cmlnZ2VyOiBpbnNpZGUgZGltZW5zaW9ucyBtdXN0IG1hdGNoLCBvdXRzaWRlIGRpbWVuc2lvbnMgZ2l2ZSB0aGUgYW5zd2VyIHNpemUuIiwic3RhbmRhcmQiOiJVc2UgdGhlIHZpc3VhbCBiZXNpZGUgb25lIHJlcHJlc2VudGF0aXZlIGV4YW1wbGUgc28gdGhlIHN0dWRlbnQgc2VlcyBleGFjdGx5IGhvdyBvbmUgcHJvZHVjdCBlbnRyeSBpcyBidWlsdC4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhlIHZpc3VhbCB0byBjYXRjaCB0cmFwczogZWxlbWVudC1ieS1lbGVtZW50IG11bHRpcGxpY2F0aW9uLCByZXZlcnNlZCBvcmRlciwgYW5kIGlubmVyIHByb2R1Y3QgdmVyc3VzIG91dGVyIHByb2R1Y3QuIn0=" style="display:none;"></div>%%KC_END%%
# B.7-4 Matrix Multiplication

> **Section Objective:** Learn how standard matrix multiplication works, how MATLAB distinguishes it from element-by-element operations, and how inner and outer products fit the same rule.

---

## Concepts In This Section

- Matrix product dimensions
- Row-column entry formula
- MATLAB element-by-element multiplication
- Inner product
- Outer product

## 1. When Matrix Multiplication Is Allowed

For \(AB\) to exist, the **inner dimensions must match**: \(A\) has \(n\) columns and \(B\) must have \(n\) rows. The result has the **outer dimensions**: \(m\) rows from \(A\) and \(p\) columns from \(B\).

- \(m\) = rows of \(A\)
- \(n\) = columns of \(A\) = rows of \(B\) (must match)
- \(p\) = columns of \(B\)

### EXAM TRIGGER

When asked for the size of \(AB\): check the inside dimensions first, then keep the outside dimensions.

**Minimal example:** \((2\times3)(3\times4)\) — inside dimensions are both 3, so the product is defined and has size \(2\times4\).

#### Common Misuse

Do not multiply dimensions entry-by-entry. Also, \(AB\) and \(BA\) do not necessarily have the same size — order matters.

$$A\in\mathbb{R}^{m\times n},\quad B\in\mathbb{R}^{n\times p}\quad \Longrightarrow \quad AB\in\mathbb{R}^{m\times p}$$


## 2. MATLAB: element-by-element multiplication is not matrix multiplication

This is the **core entry formula** for matrix multiplication. Each symbol means:

- \(c_{ij}\): the entry in row \(i\), column \(j\) of \(C = AB\)
- \(a_{ik}\): entries moving across **row \(i\)** of \(A\) (index \(k\) runs from 1 to \(n\))
- \(b_{kj}\): entries moving down **column \(j\)** of \(B\) (same index \(k\))

### WHEN TO USE IT

Use this formula when an exam asks for **one specific entry** of a product, not the whole matrix.

#### Common Misuse

Do not pair a row of \(A\) with a row of \(B\), or a column of \(A\) with a column of \(B\). The rule is always: **row of \(A\)** dotted with **column of \(B\)**.

$$c_{ij}=\sum_{k=1}^{n} a_{ik}\,b_{kj}$$

## 3. Inner product: one row times one column

### Worked Example: Computing One Entry

Let \(A=\begin{bmatrix}1&2&3\\4&5&6\end{bmatrix}\) and \(B=\begin{bmatrix}10&20\\30&40\\50&60\end{bmatrix}\).

To find \(c_{12}\), take **row 1 of \(A\)** and **column 2 of \(B\)**:

$$c_{12} = 1\cdot20 + 2\cdot40 + 3\cdot60 = 20 + 80 + 180 = 280$$

Before multiplying, confirm \((2\times3)(3\times2)\) is allowed and the result is \(2\times2\).

## 4. Outer product: one column times one row

MATLAB uses two distinct operators:

- `*` — standard **matrix multiplication** (follows the row-column rule)
- `.*` — **element-by-element multiplication** (pairs matching entries)

Here \(x\) and \(y\) are same-length vectors, and `.*` multiplies each pair of corresponding entries.

**Minimal example:**

$$[1\;\;2\;\;3]\,.*\,[10\;\;20\;\;30] = [10\;\;40\;\;90]$$

### WHEN TO USE `.*`

Use `.*` when evaluating a formula at many sample points, or when multiplying corresponding data values element by element.

#### Exam / Code Trap

Writing `x*y` when you intend entry-by-entry multiplication can cause a **dimension error** or produce a completely different matrix product — a common and silent bug.

$$x\,.*\,y = [\,x_1 y_1\quad x_2 y_2\quad \cdots\quad x_n y_n\,]$$

## 3. Inner Product: One Row Times One Column

Let \(u\) and \(v\) be length-\(n\) **column vectors**. Then \(u^T\) is a \(1\times n\) row vector and \(v\) is \(n\times1\), so \(u^Tv\) is \(1\times1\) — **a single scalar**.

**Minimal example:**

$$[1\;\;2\;\;3]\,[4\;\;5\;\;6]^T = 1\cdot4 + 2\cdot5 + 3\cdot6 = 4+10+18 = 32$$

### EXAM TRIGGER

If the answer should be a **single number** measuring the pairing of two vectors, use an inner product.

#### Common Misuse

Forgetting the transpose and writing \(uv\) — two column vectors cannot be multiplied directly; the dimensions \((n\times1)(n\times1)\) do not conform.

$$u^{T}v=\sum_{k=1}^{n}u_k v_k$$

## 4. Outer Product: One Column Times One Row

Let \(u\) be an \(m\times1\) column vector and \(v^T\) be a \(1\times n\) row vector. Then \(uv^T\) is an \(m\times n\) **matrix** — every entry is built from one entry of \(u\) and one entry of \(v\).

**Minimal example:** If \(u=[2\;\;3]^T\) (a \(2\times1\) column) and \(v=[10\;\;20\;\;30]^T\), then \(uv^T\) has size \(2\times3\).

### KEY CONTRAST

| Operation | Shape | Result |
|-----------|-------|--------|
| \(u^Tv\) | \((1\times n)(n\times1)\) | scalar \(1\times1\) |
| \(uv^T\) | \((n\times1)(1\times n)\) | matrix \(n\times n\) |

#### Common Misuse

Confusing \(u^Tv\) (scalar) with \(uv^T\) (matrix). The transpose position completely changes the result shape.

$$(uv^{T})_{ij}=u_i\, v_j$$

---
**📌 Key Takeaways**
- Conformability rule: \(A\in\mathbb{R}^{m\times n},\, B\in\mathbb{R}^{n\times p}\Rightarrow AB\in\mathbb{R}^{m\times p}\) — inside dimensions must match; outside dimensions give the result size.
- Entry formula: \(c_{ij}=\sum_{k=1}^{n}a_{ik}b_{kj}\) — row \(i\) of \(A\) dotted with column \(j\) of \(B\).
- MATLAB element-by-element: \(x\,.*\,y=[x_1y_1\;\;x_2y_2\;\;\cdots\;\;x_ny_n]\) — use `.*` for sample-wise operations, `*` for matrix multiplication.
- Inner product: \(u^Tv=\sum_{k=1}^{n}u_kv_k\) — a \((1\times n)(n\times1)\) product that yields one scalar.
- Outer product: \((uv^T)_{ij}=u_iv_j\) — an \((n\times1)(1\times n)\) product that yields an \(n\times n\) matrix.
- Key trap: \(u^Tv\) is a scalar; \(uv^T\) is a matrix — transpose position determines everything.

*Next, use these rules carefully when MATLAB code mixes vectors, samples, and matrix operations.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6Im1hdHJpeF9wcm9kdWN0X2RpbWVuc2lvbnMiLCJsYWJlbCI6Ik1hdHJpeCBwcm9kdWN0IGRpbWVuc2lvbnMgYW5kIGNvbmZvcm1hYmlsaXR5IiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJZiBcXChBXFwpIGlzIFxcKDNcXHRpbWVzIDVcXCkgYW5kIFxcKEJcXCkgaXMgXFwoNVxcdGltZXMgMlxcKSwgd2hhdCBpcyB0aGUgc2l6ZSBvZiBcXChBQlxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKDNcXHRpbWVzMlxcKSIsIkIuIFxcKDVcXHRpbWVzNVxcKSIsIkMuIFxcKDJcXHRpbWVzM1xcKSIsIkQuIFRoZSBwcm9kdWN0IGlzIG5vdCBkZWZpbmVkIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGhlIGluc2lkZSBkaW1lbnNpb25zIG1hdGNoOiBcXCgoM1xcdGltZXM1KSg1XFx0aW1lczIpXFwpLiBUaGUgb3V0c2lkZSBkaW1lbnNpb25zIGdpdmUgdGhlIHJlc3VsdCBzaXplLCBcXCgzXFx0aW1lczJcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhlIHNoYXJlZCBpbnNpZGUgZGltZW5zaW9uIGNoZWNrcyB3aGV0aGVyIG11bHRpcGxpY2F0aW9uIGlzIGFsbG93ZWQ7IGl0IGlzIG5vdCB0aGUgcmVzdWx0IHNpemUuIiwiQyI6IlRoaXMgcmV2ZXJzZXMgdGhlIG91dHNpZGUgZGltZW5zaW9ucy4iLCJEIjoiVGhlIHByb2R1Y3QgaXMgZGVmaW5lZCBiZWNhdXNlIHRoZSBpbnNpZGUgZGltZW5zaW9ucyBhcmUgYm90aCA1LiJ9LCJoaW50IjoiQ2hlY2sgaW5zaWRlIGRpbWVuc2lvbnMgZmlyc3QsIHRoZW4ga2VlcCBvdXRzaWRlIGRpbWVuc2lvbnMuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBwcm9kdWN0IGlzIGRlZmluaXRlbHkgZGVmaW5lZD8iLCJvcHRpb25zIjpbIkEuIFxcKCg0XFx0aW1lczMpKDJcXHRpbWVzNClcXCkiLCJCLiBcXCgoMlxcdGltZXM2KSg2XFx0aW1lczEpXFwpIiwiQy4gXFwoKDVcXHRpbWVzMikoNVxcdGltZXMzKVxcKSIsIkQuIFxcKCgzXFx0aW1lczMpKDRcXHRpbWVzMylcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJPbmx5IFxcKCgyXFx0aW1lczYpKDZcXHRpbWVzMSlcXCkgaGFzIG1hdGNoaW5nIGluc2lkZSBkaW1lbnNpb25zLCBzbyB0aGUgcmVzdWx0IGlzIFxcKDJcXHRpbWVzMVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGUgaW5zaWRlIGRpbWVuc2lvbnMgYXJlIDMgYW5kIDIsIHNvIHRoZXkgZG8gbm90IG1hdGNoLiIsIkMiOiJUaGUgaW5zaWRlIGRpbWVuc2lvbnMgYXJlIDIgYW5kIDUsIHNvIHRoZXkgZG8gbm90IG1hdGNoLiIsIkQiOiJUaGUgaW5zaWRlIGRpbWVuc2lvbnMgYXJlIDMgYW5kIDQsIHNvIHRoZXkgZG8gbm90IG1hdGNoLiJ9LCJoaW50IjoiTG9vayBvbmx5IGF0IHRoZSB0d28gZGltZW5zaW9ucyB0b3VjaGluZyBpbiB0aGUgbWlkZGxlLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoicm93X2NvbHVtbl9lbnRyeV9mb3JtdWxhIiwibGFiZWwiOiJDb21wdXRpbmcgb25lIHByb2R1Y3QgZW50cnkiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IlRvIGNvbXB1dGUgZW50cnkgXFwoY197MjN9XFwpIG9mIFxcKEM9QUJcXCksIHdoaWNoIHBpZWNlcyBkbyB5b3UgbXVsdGlwbHkgYW5kIGFkZD8iLCJvcHRpb25zIjpbIkEuIFJvdyAyIG9mIFxcKEFcXCkgd2l0aCBjb2x1bW4gMyBvZiBcXChCXFwpIiwiQi4gQ29sdW1uIDIgb2YgXFwoQVxcKSB3aXRoIHJvdyAzIG9mIFxcKEJcXCkiLCJDLiBSb3cgMyBvZiBcXChBXFwpIHdpdGggY29sdW1uIDIgb2YgXFwoQlxcKSIsIkQuIEVudHJ5IFxcKGFfezIzfVxcKSB3aXRoIGVudHJ5IFxcKGJfezIzfVxcKSBvbmx5Il0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGhlIGZpcnN0IGluZGV4IG9mIFxcKGNfezIzfVxcKSBzZWxlY3RzIHJvdyAyIG9mIFxcKEFcXCk7IHRoZSBzZWNvbmQgaW5kZXggc2VsZWN0cyBjb2x1bW4gMyBvZiBcXChCXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoaXMgc3dhcHMgdGhlIHJvdy1jb2x1bW4gcnVsZS4iLCJDIjoiVGhpcyByZXZlcnNlcyB0aGUgaW5kaWNlcy4iLCJEIjoiQSBwcm9kdWN0IGVudHJ5IHVzdWFsbHkgY29tZXMgZnJvbSBhIGZ1bGwgZG90IHByb2R1Y3QsIG5vdCBvbmUgZW50cnktYnktZW50cnkgbXVsdGlwbGljYXRpb24uIn0sImhpbnQiOiJcXChjX3tpan1cXCkgbWVhbnMgcm93IFxcKGlcXCkgZnJvbSB0aGUgbGVmdCBtYXRyaXggYW5kIGNvbHVtbiBcXChqXFwpIGZyb20gdGhlIHJpZ2h0IG1hdHJpeC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoicm93X2NvbHVtbl9oaWdobGlnaHRfZGlhZ3JhbSIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiTGV0IFxcKEE9XFxiZWdpbntibWF0cml4fTEmMiYzXFxcXDQmNSY2XFxlbmR7Ym1hdHJpeH1cXCkgYW5kIFxcKEI9XFxiZWdpbntibWF0cml4fTEwJjIwXFxcXDMwJjQwXFxcXDUwJjYwXFxlbmR7Ym1hdHJpeH1cXCkuIENvbXB1dGUgXFwoY197MTJ9XFwpIGZvciBcXChDPUFCXFwpLiIsImlkZWFsX2Fuc3dlciI6IlxcKGNfezEyfT0xXFxjZG90MjArMlxcY2RvdDQwKzNcXGNkb3Q2MD0yODBcXCkuIiwiZ3JhZGluZ19ydWJyaWMiOlsiU2VsZWN0cyByb3cgMSBvZiBcXChBXFwpIiwiU2VsZWN0cyBjb2x1bW4gMiBvZiBcXChCXFwpIiwiTXVsdGlwbGllcyBtYXRjaGluZyBwb3NpdGlvbnMgYW5kIGFkZHMiLCJHaXZlcyBmaW5hbCB2YWx1ZSAyODAiXSwiZXhwbGFuYXRpb24iOiJUaGlzIGNoZWNrcyB3aGV0aGVyIHRoZSBzdHVkZW50IGNhbiBleGVjdXRlIHRoZSByb3ctY29sdW1uIGZvcm11bGEsIG5vdCBqdXN0IHN0YXRlIHRoZSBkaW1lbnNpb24gcnVsZS4iLCJoaW50IjoiVXNlIHJvdyAxIG9mIFxcKEFcXCk6IFxcKFsxLDIsM11cXCksIGFuZCBjb2x1bW4gMiBvZiBcXChCXFwpOiBcXChbMjAsNDAsNjBdXlRcXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJtYXRsYWJfZWxlbWVudHdpc2VfdnNfbWF0cml4IiwibGFiZWwiOiJNQVRMQUIgYC4qYCB2ZXJzdXMgYCpgIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkluIE1BVExBQiwgd2hpY2ggb3BlcmF0aW9uIG11bHRpcGxpZXMgY29ycmVzcG9uZGluZyBlbnRyaWVzIG9mIHR3byBzYW1lLXNpemUgYXJyYXlzPyIsIm9wdGlvbnMiOlsiQS4gYHgqeWAiLCJCLiBgeC4qeWAiLCJDLiBgeC95YCIsIkQuIGB4XnlgIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiYC4qYCBpcyBNQVRMQUIncyBlbGVtZW50LWJ5LWVsZW1lbnQgbXVsdGlwbGljYXRpb24gb3BlcmF0b3IuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiYCpgIGlzIHN0YW5kYXJkIG1hdHJpeCBtdWx0aXBsaWNhdGlvbiwgbm90IG1hdGNoaW5nLWVudHJ5IG11bHRpcGxpY2F0aW9uLiIsIkMiOiJgL2AgcGVyZm9ybXMgbWF0cml4IHJpZ2h0IGRpdmlzaW9uLCBub3QgZWxlbWVudC1ieS1lbGVtZW50IG11bHRpcGxpY2F0aW9uLiIsIkQiOiJgXmAgaXMgcG93ZXIsIGFuZCBpdCBhbHNvIGhhcyBtYXRyaXgtc3BlY2lmaWMgbWVhbmluZy4ifSwiaGludCI6IlRoZSBkb3QgdGVsbHMgTUFUTEFCIHRvIG9wZXJhdGUgZWxlbWVudCBieSBlbGVtZW50LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2h5IGlzIGBmID0gc2luKDIqcGkqMTAqdCkuKnRgIGRpZmZlcmVudCBpbiBpbnRlbnQgZnJvbSBgZiA9IHNpbigyKnBpKjEwKnQpKnRgIHdoZW4gYHRgIHN0b3JlcyBzYW1wbGUgdmFsdWVzPyIsIm9wdGlvbnMiOlsiQS4gYC4qYCBtdWx0aXBsaWVzIG1hdGNoaW5nIHNhbXBsZSB2YWx1ZXMsIHdoaWxlIGAqYCBhdHRlbXB0cyBtYXRyaXggbXVsdGlwbGljYXRpb24uIiwiQi4gYC4qYCBhbHdheXMgcHJvZHVjZXMgYSBzY2FsYXIsIHdoaWxlIGAqYCBhbHdheXMgcHJvZHVjZXMgYSB2ZWN0b3IuIiwiQy4gYC4qYCBpcyBvbmx5IGZvciBjb21wbGV4IG51bWJlcnMuIiwiRC4gVGhlcmUgaXMgbm8gZGlmZmVyZW5jZSBpbiBNQVRMQUIuIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiRm9yIHNhbXBsZWQgc2lnbmFscywgbWF0Y2hpbmctZW50cnkgbXVsdGlwbGljYXRpb24gaXMgdXN1YWxseSB0aGUgaW50ZW5kZWQgb3BlcmF0aW9uLiBTdGFuZGFyZCBtYXRyaXggbXVsdGlwbGljYXRpb24gZm9sbG93cyBkaW1lbnNpb24gcnVsZXMgYW5kIG1heSBmYWlsIG9yIG1lYW4gc29tZXRoaW5nIGVsc2UuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiRWxlbWVudC1ieS1lbGVtZW50IG11bHRpcGxpY2F0aW9uIHVzdWFsbHkgcHJlc2VydmVzIGFycmF5IHNoYXBlOyBpdCBkb2VzIG5vdCBhbHdheXMgcHJvZHVjZSBhIHNjYWxhci4iLCJDIjoiYC4qYCBpcyBub3QgbGltaXRlZCB0byBjb21wbGV4IG51bWJlcnMuIiwiRCI6IlRoZSBvcGVyYXRvcnMgaGF2ZSBkaWZmZXJlbnQgbWVhbmluZ3MuIn0sImhpbnQiOiJBc2sgd2hldGhlciB5b3Ugd2FudCBzYW1wbGUtYnktc2FtcGxlIG11bHRpcGxpY2F0aW9uIG9yIGxpbmVhciBhbGdlYnJhIG11bHRpcGxpY2F0aW9uLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiaW5uZXJfb3V0ZXJfcHJvZHVjdHMiLCJsYWJlbCI6IklubmVyIHByb2R1Y3QgdmVyc3VzIG91dGVyIHByb2R1Y3QiLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3A0X3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJZiBcXCh1XFwpIGFuZCBcXCh2XFwpIGFyZSBib3RoIFxcKG5cXHRpbWVzMVxcKSBjb2x1bW4gdmVjdG9ycywgd2hhdCBpcyB0aGUgc2hhcGUgb2YgXFwodV5UdlxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKDFcXHRpbWVzMVxcKSwgYSBzY2FsYXIiLCJCLiBcXChuXFx0aW1lcyBuXFwpLCBhIG1hdHJpeCIsIkMuIFxcKG5cXHRpbWVzMVxcKSwgYSBjb2x1bW4gdmVjdG9yIiwiRC4gVGhlIHByb2R1Y3QgaXMgbmV2ZXIgZGVmaW5lZCJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlxcKHVeVFxcKSBpcyBcXCgxXFx0aW1lcyBuXFwpLCBhbmQgXFwodlxcKSBpcyBcXChuXFx0aW1lczFcXCksIHNvIFxcKHVeVHZcXCkgaXMgXFwoMVxcdGltZXMxXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoYXQgaXMgdGhlIHNoYXBlIG9mIFxcKHV2XlRcXCksIG5vdCBcXCh1XlR2XFwpLiIsIkMiOiJUaGUgb3V0c2lkZSBkaW1lbnNpb25zIGFyZSAxIGFuZCAxLCBub3QgXFwoblxcKSBhbmQgMS4iLCJEIjoiVGhlIHByb2R1Y3QgaXMgZGVmaW5lZCBiZWNhdXNlIHRoZSBpbnNpZGUgZGltZW5zaW9ucyBtYXRjaC4ifSwiaGludCI6IlRyYW5zcG9zZSBjaGFuZ2VzIFxcKHVcXCkgZnJvbSBhIGNvbHVtbiBpbnRvIGEgcm93LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDRfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgY2xhc3NtYXRlIHNheXMgXFwodV5UdlxcKSBhbmQgXFwodXZeVFxcKSBhcmUgYmFzaWNhbGx5IHRoZSBzYW1lIGJlY2F1c2UgYm90aCBtdWx0aXBseSB0aGUgc2FtZSB2ZWN0b3IgZW50cmllcy4gV2h5IGlzIHRoaXMgd3Jvbmc/Iiwib3B0aW9ucyI6WyJBLiBcXCh1XlR2XFwpIGlzIGEgc2NhbGFyLCB3aGlsZSBcXCh1dl5UXFwpIGlzIGEgbWF0cml4LiIsIkIuIFxcKHVeVHZcXCkgaXMgYWx3YXlzIHVuZGVmaW5lZC4iLCJDLiBcXCh1dl5UXFwpIGlzIGFsd2F5cyBhIHNjYWxhci4iLCJELiBNYXRyaXggbXVsdGlwbGljYXRpb24gaWdub3JlcyBvcmRlci4iXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJPcmRlciBhbmQgc2hhcGUgbWF0dGVyLiBBIHJvdyB0aW1lcyBhIGNvbHVtbiBnaXZlcyBvbmUgc2NhbGFyOyBhIGNvbHVtbiB0aW1lcyBhIHJvdyBnaXZlcyBhIGZ1bGwgbWF0cml4LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlxcKHVeVHZcXCkgaXMgZGVmaW5lZCBmb3Igc2FtZS1sZW5ndGggY29sdW1uIHZlY3RvcnMuIiwiQyI6IlxcKHV2XlRcXCkgcHJvZHVjZXMgYW4gb3V0ZXItcHJvZHVjdCBtYXRyaXguIiwiRCI6Ik1hdHJpeCBtdWx0aXBsaWNhdGlvbiBpcyBvcmRlci1zZW5zaXRpdmUuIn0sImhpbnQiOiJDb21wYXJlIHRoZSBkaW1lbnNpb25zOiBcXCgoMVxcdGltZXMgbikoblxcdGltZXMxKVxcKSB2ZXJzdXMgXFwoKG5cXHRpbWVzMSkoMVxcdGltZXMgbilcXCkuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImlubmVyX3ZzX291dGVyX3NoYXBlX2NvbXBhcmlzb24iLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX1dfQ==" style="display:none;"></div>%%KC_END%%
