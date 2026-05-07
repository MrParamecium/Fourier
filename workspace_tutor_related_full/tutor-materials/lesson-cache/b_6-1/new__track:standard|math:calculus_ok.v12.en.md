%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJUaGUgdGV4dGJvb2sgcGFnZXMgY29udGFpbiB0aGUgY2Fub25pY2FsIGRlZmluaXRpb25zIGFuZCBub3RhdGlvbiwgc28gdGhleSBzaG91bGQgYW5jaG9yIHRoZSBsZXNzb24uIEEgY2xlYW4gbWF0cGxvdGxpYiBkaWFncmFtIGlzIGFsc28gdmFsdWFibGUgYmVjYXVzZSB0cmFuc3Bvc2UgYW5kIHN5bW1ldHJ5IGFyZSBlYXNpZXIgdG8gc2VlIHZpc3VhbGx5IHRoYW4gdGhyb3VnaCBPQ1ItaGVhdnkgcGFnZSBzY3JlZW5zaG90cyBhbG9uZS4iLCJjcmFtIjoiVXNlIHRoZSB0ZXh0Ym9vayBwYWdlIHRvIHNwb3QgdGhlIGV4YWN0IGV4YW0gdm9jYWJ1bGFyeSwgdGhlbiB1c2UgdGhlIGdlbmVyYXRlZCBkaWFncmFtIHRvIHJlY29nbml6ZSBtYXRyaXggcGF0dGVybnMgcXVpY2tseS4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgdGV4dGJvb2sgcGFnZSBmb3IgZGVmaW5pdGlvbiBmaWRlbGl0eSBhbmQgdGhlIGdlbmVyYXRlZCBkaWFncmFtIHRvIG1ha2UgdHJhbnNwb3NlIGFuZCBzeW1tZXRyeSBpbnR1aXRpdmUgd2l0aCBvbmUgY2xlYXIgZXhhbXBsZS4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhlIHRleHRib29rIHBhZ2UgZm9yIHByZWNpc2Ugbm90YXRpb24sIHRoZW4gdXNlIHRoZSBnZW5lcmF0ZWQgZGlhZ3JhbSB0byBjb21wYXJlIGRpYWdvbmFsLCBzeW1tZXRyaWMsIGFuZCB0cmFuc3Bvc2UtcmVsYXRlZCBjYXNlcyB0aGF0IGFyZSBlYXN5IHRvIGNvbmZ1c2UuIn0=" style="display:none;"></div>%%KC_END%%
# B.6-1 Some Definitions and Properties

> **Section Objective:** Build the vocabulary you need to work with matrices quickly and accurately — starting with the most common matrix types and two fundamental operations.

---

If you see a matrix on an exam, one of the first speed moves is to identify what kind of matrix it is. Is it diagonal? Symmetric? The identity? Knowing the answer immediately tells you what properties you can use.

This section gives you the basic language of matrices: **diagonal**, **identity**, **zero**, and **symmetric** matrices, plus the definitions of **matrix equality** and **transpose**. These are not just vocabulary — they are the foundation for every matrix algebra operation in the next section, and they appear regularly as quick recognition questions on exams.

By the end of this section, you will be able to classify any matrix by type, state when two matrices are equal, and compute and interpret the transpose of any matrix.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoZSBwYWdlIHRvIHJlY29nbml6ZSB0aGUgZXhhY3QgdGV4dGJvb2sgZGVmaW5pdGlvbnMgZmFzdCDigJQgZm9jdXMgb24gdGhlIG5hbWVkIHR5cGVzIGFuZCB0aGVpciBub3RhdGlvbi4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgcGFnZSBhcyB0aGUgc291cmNlIG9mIHRydXRoIGZvciB0aGUgbmFtZWQgbWF0cml4IHR5cGVzIGFuZCB0aGUgZm9ybWFsIGRlZmluaXRpb24gb2YgdHJhbnNwb3NlIHVzZWQgdGhyb3VnaG91dCB0aGUgY2hhcHRlci4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhlIHBhZ2UgdG8gbm90aWNlIGRlZmluaXRpb24tbGV2ZWwgZGlzdGluY3Rpb25zIOKAlCBmb3IgZXhhbXBsZSwgdGhlIHByZWNpc2UgY29uZGl0aW9uIGZvciBzeW1tZXRyeSDigJQgdGhhdCBjcmVhdGUgZXhhbSB0cmFwcy4ifQ==" style="display:none;"></div>%%KC_END%%
![This page introduces the standard matrix types (diagonal, identity, zero, symmetric) and the formal definition of transpose used throughout the chapter.](/pages/page-037.png)

## 1. Basic Matrix Types You Must Recognize

Four matrix types appear constantly. Learn to spot each one at a glance.

**Diagonal matrix** — A square matrix where every entry *off* the main diagonal is zero. The diagonal entries themselves can be any value, including zero.

**Identity matrix** — A diagonal matrix where every diagonal entry is exactly 1. Denoted **I**. It is the matrix equivalent of the number 1.

**Zero matrix** — Every entry is 0, regardless of size. Denoted **0**. It is the matrix equivalent of the number 0.

**Symmetric matrix** — A square matrix where entry $a_{ij} = a_{ji}$ for all $i, j$. In plain terms: it equals its own transpose.

### QUICK EXAMPLE

The matrix $\begin{bmatrix} 5 & 0 & 0 \\ 0 & 3 & 0 \\ 0 & 0 & 7 \end{bmatrix}$ is diagonal. Replace the 5, 3, and 7 with 1s and you get the 3×3 identity matrix.

### COMMON MISTAKE

Students often confuse *diagonal* with *symmetric*. Every diagonal matrix is automatically symmetric (zeros off the diagonal satisfy $a_{ij} = a_{ji}$ trivially), but a symmetric matrix does **not** need to be diagonal — it can have nonzero off-diagonal entries as long as matching positions are equal.

$$A = B \iff a_{ij} = b_{ij} \text{ for all } i, j$$
*Two matrices are equal if and only if they have exactly the same size (same number of rows and columns) and every entry in one matrix matches the entry in the corresponding position of the other.*

## 2. Equality and Transpose

**Matrix equality** is strict. Two matrices A and B are equal only when they have the same order *and* every matching entry is identical — same row, same column, same value. Sharing a determinant or having the same diagonal is not enough.

**Transpose** means swapping rows and columns. The transpose of A is written $A^T$. Row $i$ of A becomes column $i$ of $A^T$.

### WORKED EXAMPLE

Let $A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}$, which is a 2×3 matrix.

Its transpose is $A^T = \begin{bmatrix} 1 & 4 \\ 2 & 5 \\ 3 & 6 \end{bmatrix}$, which is a 3×2 matrix.

**What happens to the size?** The number of rows and columns swap. An $m \times n$ matrix becomes an $n \times m$ matrix.

**What is $(A^T)^T$?** Transposing twice returns every entry to its original position. So $(A^T)^T = A$ for *any* matrix A — square or not. This is not a special property of symmetric matrices; it is always true.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="comparison_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoZSBzaWRlLWJ5LXNpZGUgbGF5b3V0IHRvIG1lbW9yaXplIHdoYXQgdHJhbnNwb3NlIGRvZXMgdG8gcG9zaXRpb25zIGFuZCBkaW1lbnNpb25zIGF0IGEgZ2xhbmNlLiIsInN0YW5kYXJkIjoiVXNlIHRoZSBkaWFncmFtIHRvIGNvbm5lY3Qgcm93LWNvbHVtbiBzd2FwcGluZyB3aXRoIHRoZSB3b3JrZWQgZXhhbXBsZSBjbGVhcmx5IOKAlCB0cmFjZSBob3cgZWFjaCBlbnRyeSBtb3Zlcy4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhlIGNvbG9yLW1hdGNoZWQgZW50cmllcyB0byBzZWUgaG93IHRyYW5zcG9zZSByZWxhdGVzIHRvIHN5bW1ldHJ5IGFib3V0IHRoZSBtYWluIGRpYWdvbmFsLCBhbmQgbm90aWNlIHdoeSBzeW1tZXRyaWMgbWF0cmljZXMgYXJlIHVuY2hhbmdlZCBieSB0aGlzIG9wZXJhdGlvbi4ifQ==" style="display:none;"></div>%%KC_END%%
*📊 Left: matrix A (2×3). Center: its transpose A^T (3×2) — matching colors show where each entry moved. Right: a symmetric 3×3 matrix — mirrored pairs share the same color, and the main diagonal is highlighted in orange.*
![Chart](/generated/chart-1777142045361-g36ye.png)

### WHAT TO NOTICE IN THE DIAGRAM

Trace any colored entry from A to $A^T$: it moves across the main diagonal. The entry in row 1, column 3 of A becomes row 3, column 1 of $A^T$. This is what 'swap rows and columns' means concretely.

The 2×3 matrix becomes 3×2 — the dimensions reverse.

In the symmetric matrix on the right, every mirrored pair shares the same color because $a_{ij} = a_{ji}$. Reflecting the matrix across the main diagonal leaves it unchanged.

#### Exam Note

If a matrix is not square, it can still be transposed — but it **cannot** be symmetric. Symmetry requires $A = A^T$, which is impossible if A and $A^T$ have different sizes.

---
**📌 Key Takeaways**
- Diagonal, identity, zero, and symmetric matrices each have a precise definition based on where entries are zero or equal.
- Two matrices are equal only when they share the same size and every corresponding entry matches exactly.
- Transpose swaps rows and columns, reversing dimensions; transposing twice always returns the original matrix.

*In the next section we will use these definitions to perform matrix algebra operations.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6Im1hdHJpeF90eXBlX3JlY29nbml0aW9uIiwibGFiZWwiOiJSZWNvZ25pemluZyBkaWFnb25hbCwgaWRlbnRpdHksIHplcm8sIGFuZCBzeW1tZXRyaWMgbWF0cmljZXMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIG1hdHJpeCBpcyBkaWFnb25hbD8iLCJvcHRpb25zIjpbIkEuIFtbMiwgMV0sIFswLCAzXV0iLCJCLiBbWzIsIDBdLCBbMCwgM11dIiwiQy4gW1swLCAyXSwgWzIsIDBdXSIsIkQuIFtbMSwgMV0sIFsxLCAxXV0iXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJBIGRpYWdvbmFsIG1hdHJpeCBoYXMgemVyb3MgZXZlcnl3aGVyZSBleGNlcHQgcG9zc2libHkgb24gdGhlIG1haW4gZGlhZ29uYWwuIE9wdGlvbiBCIG1hdGNoZXMgdGhhdCBkZWZpbml0aW9uIGV4YWN0bHkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlIGVudHJ5IGluIHRoZSB0b3AtcmlnaHQgY29ybmVyIGlzIG5vbnplcm8sIHNvIGl0IGlzIG5vdCBkaWFnb25hbC4iLCJDIjoiVGhlIG9mZi1kaWFnb25hbCBlbnRyaWVzIGFyZSBub256ZXJvLCBzbyBpdCBpcyBub3QgZGlhZ29uYWwuIiwiRCI6IkFsbCBlbnRyaWVzIGFyZSAxLCBpbmNsdWRpbmcgb2ZmLWRpYWdvbmFsIGVudHJpZXMsIHNvIGl0IGlzIG5vdCBkaWFnb25hbC4ifSwiaGludCI6IkNoZWNrIHdoZXRoZXIgZXZlcnkgb2ZmLWRpYWdvbmFsIGVudHJ5IGlzIHplcm8uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBzdGF0ZW1lbnQgaXMgYWx3YXlzIHRydWU/Iiwib3B0aW9ucyI6WyJBLiBFdmVyeSBzeW1tZXRyaWMgbWF0cml4IGlzIGRpYWdvbmFsIiwiQi4gRXZlcnkgZGlhZ29uYWwgbWF0cml4IGlzIGFuIGlkZW50aXR5IG1hdHJpeCIsIkMuIEV2ZXJ5IGRpYWdvbmFsIG1hdHJpeCBpcyBzeW1tZXRyaWMiLCJELiBFdmVyeSB6ZXJvIG1hdHJpeCBpcyBhbiBpZGVudGl0eSBtYXRyaXgiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJBIGRpYWdvbmFsIG1hdHJpeCBhdXRvbWF0aWNhbGx5IHNhdGlzZmllcyBhX2lqID0gYV9qaSBiZWNhdXNlIGFsbCBvZmYtZGlhZ29uYWwgZW50cmllcyBhcmUgemVybyBvbiBib3RoIHNpZGVzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkEgc3ltbWV0cmljIG1hdHJpeCBjYW4gaGF2ZSBub256ZXJvIG9mZi1kaWFnb25hbCBlbnRyaWVzIGFzIGxvbmcgYXMgbWF0Y2hpbmcgcG9zaXRpb25zIGFyZSBlcXVhbC4iLCJCIjoiQSBkaWFnb25hbCBtYXRyaXggY2FuIGhhdmUgZGlhZ29uYWwgZW50cmllcyBvdGhlciB0aGFuIDEuIiwiRCI6IkEgemVybyBtYXRyaXggaGFzIGFsbCBlbnRyaWVzIDAsIHdoaWxlIGFuIGlkZW50aXR5IG1hdHJpeCBoYXMgMXMgb24gdGhlIG1haW4gZGlhZ29uYWwuIn0sImhpbnQiOiJBc2sgd2hpY2ggcHJvcGVydHkgaXMgZ3VhcmFudGVlZCBieSB6ZXJvcyBvZmYgdGhlIG1haW4gZGlhZ29uYWwuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJtYXRyaXhfZXF1YWxpdHkiLCJsYWJlbCI6Ik1hdHJpeCBlcXVhbGl0eSBpcyBlbnRyeS1ieS1lbnRyeSBhbmQgc2l6ZS1kZXBlbmRlbnQiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hlbiBhcmUgdHdvIG1hdHJpY2VzIEEgYW5kIEIgZXF1YWw/Iiwib3B0aW9ucyI6WyJBLiBXaGVuIHRoZXkgaGF2ZSB0aGUgc2FtZSBkZXRlcm1pbmFudCIsIkIuIFdoZW4gdGhleSBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiByb3dzIG9ubHkiLCJDLiBXaGVuIHRoZXkgaGF2ZSB0aGUgc2FtZSBvcmRlciBhbmQgY29ycmVzcG9uZGluZyBlbnRyaWVzIGFyZSBlcXVhbCIsIkQuIFdoZW4gdGhlaXIgZGlhZ29uYWwgZW50cmllcyBhcmUgZXF1YWwiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJNYXRyaXggZXF1YWxpdHkgaXMgc3RyaWN0OiBzYW1lIHNpemUgYW5kIGV2ZXJ5IG1hdGNoaW5nIGVudHJ5IG11c3QgYmUgZXF1YWwuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiRGlmZmVyZW50IG1hdHJpY2VzIGNhbiBzaGFyZSB0aGUgc2FtZSBkZXRlcm1pbmFudCwgc28gdGhhdCBpcyBub3QgZW5vdWdoLiIsIkIiOiJUaGV5IG11c3QgaGF2ZSB0aGUgc2FtZSBmdWxsIG9yZGVyLCBub3QganVzdCB0aGUgc2FtZSBudW1iZXIgb2Ygcm93cy4iLCJEIjoiTWF0Y2hpbmcgZGlhZ29uYWwgZW50cmllcyBhbG9uZSBkbyBub3QgZGV0ZXJtaW5lIGZ1bGwgbWF0cml4IGVxdWFsaXR5LiJ9LCJoaW50IjoiVGhpbmsgJ3NhbWUgc2hhcGUsIHNhbWUgZW50cmllcywgc2FtZSBwb3NpdGlvbnMuJyIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6InRyYW5zcG9zZV9wcm9wZXJ0aWVzIiwibGFiZWwiOiJUcmFuc3Bvc2Ugc3dhcHMgcm93cyBhbmQgY29sdW1ucyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSWYgQSBpcyBhIDLDlzMgbWF0cml4LCB3aGF0IGlzIHRoZSBvcmRlciBvZiBBXlQ/Iiwib3B0aW9ucyI6WyJBLiAyw5czIiwiQi4gM8OXMiIsIkMuIDLDlzIiLCJELiAzw5czIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVHJhbnNwb3NlIHN3YXBzIHJvd3MgYW5kIGNvbHVtbnMsIHNvIGEgMsOXMyBtYXRyaXggYmVjb21lcyBhIDPDlzIgbWF0cml4LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBvcmRlciBjaGFuZ2VzIHVubGVzcyB0aGUgbWF0cml4IGlzIHNxdWFyZS4iLCJDIjoiVHJhbnNwb3NlIGRvZXMgbm90IGZvcmNlIGEgc3F1YXJlIG1hdHJpeC4iLCJEIjoiVHJhbnNwb3NlIHN3YXBzIGRpbWVuc2lvbnM7IGl0IGRvZXMgbm90IGFkZCByb3dzIG9yIGNvbHVtbnMuIn0sImhpbnQiOiJSZXZlcnNlIHRoZSBkaW1lbnNpb25zLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggc3RhdGVtZW50IGFib3V0IHRyYW5zcG9zZSBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gKEFeVCleVCA9IEEgb25seSBmb3Igc3ltbWV0cmljIG1hdHJpY2VzIiwiQi4gQV5UIGFsd2F5cyBoYXMgdGhlIHNhbWUgb3JkZXIgYXMgQSIsIkMuIChBXlQpXlQgPSBBIGZvciBhbnkgbWF0cml4IEEiLCJELiBPbmx5IHNxdWFyZSBtYXRyaWNlcyBjYW4gYmUgdHJhbnNwb3NlZCJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlRyYW5zcG9zaW5nIHR3aWNlIHJldHVybnMgZXZlcnkgZW50cnkgdG8gaXRzIG9yaWdpbmFsIHBvc2l0aW9uLCBzbyB0aGUgb3JpZ2luYWwgbWF0cml4IGlzIHJlY292ZXJlZC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIHByb3BlcnR5IGlzIHRydWUgZm9yIGFsbCBtYXRyaWNlcywgbm90IG9ubHkgc3ltbWV0cmljIG9uZXMuIiwiQiI6Ik5vbi1zcXVhcmUgbWF0cmljZXMgY2hhbmdlIG9yZGVyIHdoZW4gdHJhbnNwb3NlZC4iLCJEIjoiQW55IG1hdHJpeCBjYW4gYmUgdHJhbnNwb3NlZDsgb25seSBzeW1tZXRyaWMgbWF0cmljZXMgbXVzdCBiZSBzcXVhcmUuIn0sImhpbnQiOiJUcmFuc3Bvc2UgaXMgYSByb3ctY29sdW1uIHN3YXAgZG9uZSB0d2ljZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDNfcTMiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkV4cGxhaW4gd2h5IGEgMsOXMyBtYXRyaXggY2Fubm90IGJlIHN5bW1ldHJpYy4iLCJpZGVhbF9hbnN3ZXIiOiJBIHN5bW1ldHJpYyBtYXRyaXggbXVzdCBzYXRpc2Z5IEEgPSBBXlQuIEJ1dCBhIDLDlzMgbWF0cml4IGhhcyB0cmFuc3Bvc2Ugb2Ygb3JkZXIgM8OXMiwgc28gQSBhbmQgQV5UIGRvIG5vdCBldmVuIGhhdmUgdGhlIHNhbWUgc2l6ZS4gVGhlcmVmb3JlIGEgMsOXMyBtYXRyaXggY2Fubm90IGJlIHN5bW1ldHJpYy4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IHN0YXRlIHRoYXQgc3ltbWV0cnkgbWVhbnMgQSA9IEFeVCIsIk11c3QgbWVudGlvbiB0aGF0IGEgMsOXMyBtYXRyaXggdHJhbnNwb3NlcyB0byAzw5cyIiwiTXVzdCBjb25jbHVkZSB0aGF0IHVuZXF1YWwgc2l6ZXMgbWFrZSBzeW1tZXRyeSBpbXBvc3NpYmxlIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCBjb25uZWN0cyB0aGUgZGVmaW5pdGlvbiBvZiBzeW1tZXRyeSB0byB0aGUgc2l6ZSBjaGFuZ2UgY2F1c2VkIGJ5IHRyYW5zcG9zZS4iLCJoaW50IjoiU3RhcnQgZnJvbSB0aGUgZGVmaW5pdGlvbiBBID0gQV5UIGFuZCBjb21wYXJlIHRoZSBkaW1lbnNpb25zLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJtYXRyaXhfdHJhbnNwb3NlX2RpbWVuc2lvbl9jaGVjayIsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
