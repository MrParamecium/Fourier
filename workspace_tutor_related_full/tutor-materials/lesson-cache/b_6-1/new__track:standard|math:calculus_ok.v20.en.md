%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImdlbmVyYXRlZF9pbWFnZSIsInJhdGlvbmFsZSI6IlRoaXMgc2VjdGlvbiBpcyBkZWZpbml0aW9uLWhlYXZ5IGFuZCB0aGUgcHJvdmlkZWQgdGV4dGJvb2sgcGFnZXMgY29udGFpbiBubyBleHRyYWN0ZWQgZmlndXJlcy4gQ2xlYW4gZ2VuZXJhdGVkIHZpc3VhbHMgd2lsbCBtYWtlIHRoZSBtYXRyaXggcGF0dGVybnMgaW1tZWRpYXRlbHkgcmVjb2duaXphYmxlLCBlc3BlY2lhbGx5IGRpYWdvbmFsIHZzIGlkZW50aXR5IHZzIHN5bW1ldHJpYyB2cyB0cmFuc3Bvc2UuIiwiY3JhbSI6IlVzZSB2aXN1YWxzIHRvIGhlbHAgdGhlIHN0dWRlbnQgc3BvdCBtYXRyaXggdHlwZXMgcXVpY2tseSBieSBzaGFwZSBhbmQgcG9zaXRpb24gb2YgZW50cmllcywgZXNwZWNpYWxseSB0aGUgbWFpbiBkaWFnb25hbCBhbmQgcm93LWNvbHVtbiBzd2FwLiIsInN0YW5kYXJkIjoiVXNlIHZpc3VhbHMgdG8gY2xhcmlmeSBlYWNoIGRlZmluaXRpb24gYW5kIHN1cHBvcnQgb25lIHJlcHJlc2VudGF0aXZlIHJlY29nbml0aW9uIGV4YW1wbGUgd2l0aG91dCBhZGRpbmcgZXh0cmEgdGhlb3J5LiIsInRvcF9zY29yZSI6IlVzZSB2aXN1YWxzIHRvIGV4cG9zZSBlYXN5IGNvbmZ1c2lvbnMgc3VjaCBhcyBkaWFnb25hbCB2ZXJzdXMgaWRlbnRpdHksIHN5bW1ldHJpYyB2ZXJzdXMgbWVyZWx5IHNxdWFyZSwgYW5kIHRyYW5zcG9zZSBzaXplIGNoYW5nZSBmcm9tIG0geCBuIHRvIG4geCBtLiJ9" style="display:none;"></div>%%KC_END%%
# B.6-1 Some Definitions and Properties

> **Section Objective:** Build a fast visual vocabulary for recognizing special matrix types and performing the transpose operation.

On exams, matrix questions often begin by asking what kind of matrix you are looking at. Before you can multiply, invert, or decompose a matrix, you need to recognize its type at a glance. This section builds exactly that vocabulary: diagonal, identity, zero, symmetric, equality, and transpose. Most of what you are learning here is **pattern recognition** — spotting where the nonzero entries live. The one operation rule to add is transpose, which swaps rows and columns. These definitions matter because later matrix algebra — products, inverses, eigenvalues — only makes sense once these basic labels are clear.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgdmlzdWFsIGFzIGEgcXVpY2sgcmVjb2duaXRpb24gc2hlZXQgZm9yIGNvbW1vbiBtYXRyaXggdHlwZXMuIiwic3RhbmRhcmQiOiJVc2UgdGhpcyB2aXN1YWwgdG8gbWF0Y2ggZWFjaCBkZWZpbml0aW9uIHRvIG9uZSBjbGVhciBleGFtcGxlLiIsInRvcF9zY29yZSI6IlVzZSB0aGlzIHZpc3VhbCB0byBjb250cmFzdCBzaW1pbGFyLWxvb2tpbmcgbWF0cml4IHR5cGVzIGFuZCBwcmV2ZW50IGxhYmVsIGNvbmZ1c2lvbi4ifQ==" style="display:none;"></div>%%KC_END%%
*🎨 Four special matrix types side by side. Notice that the identity matrix is simply a diagonal matrix whose diagonal entries are all 1.*
![Illustration](/generated/gptimage2-1777212339491-1115.png)

## 1. Special Matrices You Must Recognize

The **main diagonal** of a matrix runs from the top-left entry down to the bottom-right entry. Most special matrix types are defined by what lives on that diagonal — and what lives off it.

### DIAGONAL MATRIX

A matrix is **diagonal** if every entry *off* the main diagonal is zero. The diagonal entries themselves can be any values, including zero.

### IDENTITY MATRIX

The **identity matrix** is a diagonal matrix where every main-diagonal entry equals 1. It is usually written \(I\) or \(I_n\) for an \(n \times n\) identity. Identity is a **special case** of diagonal.

### ZERO MATRIX

The **zero matrix** has every entry equal to 0. It is the matrix equivalent of the number zero.

### SYMMETRIC MATRIX

A matrix is **symmetric** if \(a_{ij} = a_{ji}\) for every \(i\) and \(j\) — meaning entries mirror across the main diagonal.

#### Exam Note

Students often confuse *diagonal* with *symmetric*. A diagonal matrix is automatically symmetric (its off-diagonal entries are all 0, which trivially mirror). But a symmetric matrix can have nonzero off-diagonal entries as long as they mirror: for example, \(a_{12} = a_{21}\).

$$A = B \iff a_{ij} = b_{ij}\ \text{for all } i \text{ and } j$$
*Two matrices are equal only when they have the same order (same number of rows and columns) **and** every corresponding entry matches exactly — same row, same column, same value. Exam reminder: if even one entry differs, the matrices are not equal, no matter how similar they look overall.*

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="comparison_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgdmlzdWFsIHRvIG1lbW9yaXplIHRoZSByb3ctY29sdW1uIHN3YXAgcGF0dGVybiBmYXN0LiIsInN0YW5kYXJkIjoiVXNlIHRoaXMgdmlzdWFsIHRvIGV4cGxhaW4gd2hhdCB0cmFuc3Bvc2UgZG9lcyB0byBlbnRyaWVzIGFuZCBtYXRyaXggc2l6ZS4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhpcyB2aXN1YWwgdG8gc3RyZXNzIGluZGV4IHJldmVyc2FsIGFuZCB0aGUgc2l6ZSBjaGFuZ2UgZnJvbSBtIHggbiB0byBuIHggbS4ifQ==" style="display:none;"></div>%%KC_END%%
*🎨 Transpose turns a \(2 \times 3\) matrix into a \(3 \times 2\) matrix. Each row of \(A\) becomes the corresponding column of \(A^T\), and every entry \(a_{ij}\) moves to position \(a_{ji}\).*
![Illustration](/generated/gptimage2-1777212485196-7099.png)

## 2. Equality and Transpose

### MATRIX EQUALITY

Two matrices \(A\) and \(B\) are **equal** when they are the same size *and* every entry in the same position matches. Think of it as a position-by-position check: row 1 column 1 of \(A\) must equal row 1 column 1 of \(B\), and so on for every cell. A \(2 \times 3\) matrix can never equal a \(3 \times 2\) matrix, even if they contain the same numbers.

---

### TRANSPOSE

The **transpose** of a matrix swaps its rows and columns. The notation \(A^T\) means: take every row of \(A\) and write it as a column instead.

The index rule is: entry \(a_{ij}\) (row \(i\), column \(j\)) moves to position \(a_{ji}\) (row \(j\), column \(i\)) in \(A^T\).

**Example in prose:** Suppose \(A\) is a \(2 \times 3\) matrix. Its first row has 3 entries; after transposing, those 3 entries become the first *column* of \(A^T\). The result is a \(3 \times 2\) matrix.

> **Quick check:** If a matrix changes from \(2 \times 3\) to \(3 \times 2\), you are probably looking at a transpose.

$$A^T = (a_{ji})_{n\times m}, \qquad (A^T)^T = A$$
*Transposing swaps each entry's row and column index — \(a_{ij}\) becomes \(a_{ji}\) — and applying the transpose twice returns every entry to its original position, recovering the original matrix \(A\).*

---
**📌 Key Takeaways**
- Diagonal, identity, zero, and symmetric matrices are defined by where nonzero entries appear relative to the main diagonal.
- Two matrices are equal only when they share the same order and every corresponding entry matches exactly.
- Transpose swaps rows and columns: an \(m \times n\) matrix becomes \(n \times m\), and \((A^T)^T = A\).

*In the next section we will use these definitions to perform matrix operations.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InNwZWNpYWxfbWF0cml4X3JlY29nbml0aW9uIiwibGFiZWwiOiJSZWNvZ25pemluZyBkaWFnb25hbCwgaWRlbnRpdHksIHplcm8sIGFuZCBzeW1tZXRyaWMgbWF0cmljZXMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHN0YXRlbWVudCBpcyBhbHdheXMgdHJ1ZT8iLCJvcHRpb25zIjpbIkEuIEV2ZXJ5IHN5bW1ldHJpYyBtYXRyaXggaXMgYW4gaWRlbnRpdHkgbWF0cml4IiwiQi4gRXZlcnkgZGlhZ29uYWwgbWF0cml4IGlzIHN5bW1ldHJpYyIsIkMuIEV2ZXJ5IHplcm8gbWF0cml4IGlzIGFuIGlkZW50aXR5IG1hdHJpeCIsIkQuIEV2ZXJ5IHNxdWFyZSBtYXRyaXggaXMgZGlhZ29uYWwiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJBIGRpYWdvbmFsIG1hdHJpeCBoYXMgemVyb3Mgb2ZmIHRoZSBtYWluIGRpYWdvbmFsLCBzbyBlbnRyaWVzIGF1dG9tYXRpY2FsbHkgbWlycm9yIGFjcm9zcyB0aGUgZGlhZ29uYWwuIFRoYXQgbWFrZXMgaXQgc3ltbWV0cmljLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkEgc3ltbWV0cmljIG1hdHJpeCBvbmx5IG5lZWRzIG1pcnJvcmVkIGVudHJpZXM7IGl0cyBkaWFnb25hbCBlbnRyaWVzIGRvIG5vdCBhbGwgaGF2ZSB0byBiZSAxLiIsIkMiOiJBIHplcm8gbWF0cml4IGhhcyBhbGwgZW50cmllcyAwLCB3aGlsZSBhbiBpZGVudGl0eSBtYXRyaXggaGFzIDFzIG9uIHRoZSBtYWluIGRpYWdvbmFsLiIsIkQiOiJNb3N0IHNxdWFyZSBtYXRyaWNlcyBoYXZlIG5vbnplcm8gb2ZmLWRpYWdvbmFsIGVudHJpZXMsIHNvIHRoZXkgYXJlIG5vdCBkaWFnb25hbC4ifSwiaGludCI6IkNvbXBhcmUgd2hhdCBlYWNoIGRlZmluaXRpb24gcmVxdWlyZXMgb2ZmIHRoZSBtYWluIGRpYWdvbmFsLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggbWF0cml4IGlzIHRoZSBcXCgzIFxcdGltZXMgM1xcKSBpZGVudGl0eSBtYXRyaXg/Iiwib3B0aW9ucyI6WyJBLiBcXChbWzEsMSwxXSxbMCwxLDBdLFswLDAsMV1dXFwpIiwiQi4gXFwoW1sxLDAsMF0sWzAsMSwwXSxbMCwwLDFdXVxcKSIsIkMuIFxcKFtbMCwwLDBdLFswLDAsMF0sWzAsMCwwXV1cXCkiLCJELiBcXChbWzIsMCwwXSxbMCwxLDBdLFswLDAsNV1dXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIGlkZW50aXR5IG1hdHJpeCBoYXMgMSBvbiBldmVyeSBtYWluLWRpYWdvbmFsIGVudHJ5IGFuZCAwIGV2ZXJ5d2hlcmUgZWxzZS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGVyZSBhcmUgbm9uemVybyBlbnRyaWVzIG9mZiB0aGUgbWFpbiBkaWFnb25hbC4iLCJDIjoiVGhhdCBpcyB0aGUgemVybyBtYXRyaXgsIG5vdCB0aGUgaWRlbnRpdHkgbWF0cml4LiIsIkQiOiJUaGF0IGlzIGRpYWdvbmFsLCBidXQgbm90IGlkZW50aXR5IGJlY2F1c2UgdGhlIGRpYWdvbmFsIGVudHJpZXMgYXJlIG5vdCBhbGwgMS4ifSwiaGludCI6Ikxvb2sgZm9yIG9uZXMgb25seSBvbiB0aGUgbWFpbiBkaWFnb25hbC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6Im1hdHJpeF9lcXVhbGl0eSIsImxhYmVsIjoiQ29uZGl0aW9ucyBmb3IgdHdvIG1hdHJpY2VzIHRvIGJlIGVxdWFsIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoZW4gYXJlIHR3byBtYXRyaWNlcyBcXChBXFwpIGFuZCBcXChCXFwpIGVxdWFsPyIsIm9wdGlvbnMiOlsiQS4gV2hlbiB0aGV5IGhhdmUgdGhlIHNhbWUgbnVtYmVyIG9mIHJvd3Mgb25seSIsIkIuIFdoZW4gdGhleSBoYXZlIHRoZSBzYW1lIGRldGVybWluYW50IiwiQy4gV2hlbiB0aGV5IGFyZSB0aGUgc2FtZSBvcmRlciBhbmQgYWxsIGNvcnJlc3BvbmRpbmcgZW50cmllcyBhcmUgZXF1YWwiLCJELiBXaGVuIHRoZXkgYXJlIGJvdGggc3F1YXJlIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiTWF0cml4IGVxdWFsaXR5IGlzIGVudHJ5LWJ5LWVudHJ5IGVxdWFsaXR5LCBhbmQgdGhlIG1hdHJpY2VzIG11c3QgYWxzbyBoYXZlIHRoZSBzYW1lIHNpemUuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhleSBtdXN0IGFsc28gaGF2ZSB0aGUgc2FtZSBudW1iZXIgb2YgY29sdW1ucyBhbmQgbWF0Y2hpbmcgZW50cmllcy4iLCJCIjoiRXF1YWwgZGV0ZXJtaW5hbnRzIGRvIG5vdCBndWFyYW50ZWUgZXF1YWwgbWF0cmljZXMuIiwiRCI6IlR3byBzcXVhcmUgbWF0cmljZXMgY2FuIHN0aWxsIGRpZmZlciBpbiBlbnRyaWVzIG9yIG9yZGVyLiJ9LCJoaW50IjoiRXF1YWxpdHkgaXMgc3RyaWN0ZXIgdGhhbiAnc2ltaWxhciBzaGFwZS4nIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoidHJhbnNwb3NlX3VuZGVyc3RhbmRpbmciLCJsYWJlbCI6IlRyYW5zcG9zZSBub3RhdGlvbiBhbmQgcm93LWNvbHVtbiBzd2FwIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJZiBcXChBXFwpIGlzIGEgXFwoMiBcXHRpbWVzIDVcXCkgbWF0cml4LCB3aGF0IGlzIHRoZSBvcmRlciBvZiBcXChBXlRcXCk/Iiwib3B0aW9ucyI6WyJBLiBcXCgyIFxcdGltZXMgNVxcKSIsIkIuIFxcKDUgXFx0aW1lcyAyXFwpIiwiQy4gXFwoMiBcXHRpbWVzIDJcXCkiLCJELiBcXCg1IFxcdGltZXMgNVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRyYW5zcG9zZSBzd2FwcyByb3dzIGFuZCBjb2x1bW5zLCBzbyBcXChtIFxcdGltZXMgblxcKSBiZWNvbWVzIFxcKG4gXFx0aW1lcyBtXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoYXQgd291bGQgbWVhbiB0aGUgb3JkZXIgc3RheWVkIHVuY2hhbmdlZCwgd2hpY2ggaXMgbm90IGdlbmVyYWxseSB0cnVlLiIsIkMiOiJUcmFuc3Bvc2UgZG9lcyBub3QgZm9yY2UgYSBtYXRyaXggdG8gYmVjb21lIHNxdWFyZS4iLCJEIjoiVHJhbnNwb3NlIHN3YXBzIGRpbWVuc2lvbnM7IGl0IGRvZXMgbm90IGNvcHkgdGhlIGxhcmdlciBkaW1lbnNpb24gdHdpY2UuIn0sImhpbnQiOiJSZWFkICdcXCgyIFxcdGltZXMgNVxcKScgYXMgcm93cyBcXChcXHRpbWVzXFwpIGNvbHVtbnMsIHRoZW4gcmV2ZXJzZSB0aGVtLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggc3RhdGVtZW50IGJlc3QgZGVzY3JpYmVzIHRoZSB0cmFuc3Bvc2Ugb3BlcmF0aW9uPyIsIm9wdGlvbnMiOlsiQS4gSXQgY2hhbmdlcyBldmVyeSBlbnRyeSB0byBpdHMgcmVjaXByb2NhbCIsIkIuIEl0IHN3YXBzIHJvd3MgYW5kIGNvbHVtbnMiLCJDLiBJdCBtdWx0aXBsaWVzIGV2ZXJ5IGVudHJ5IGJ5IFxcKC0xXFwpIiwiRC4gSXQgYWRkcyBhIHJvdyBvZiB6ZXJvcyJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRyYW5zcG9zZSByZXBvc2l0aW9ucyBlbnRyaWVzIGJ5IHR1cm5pbmcgcm93cyBpbnRvIGNvbHVtbnMgYW5kIGNvbHVtbnMgaW50byByb3dzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoYXQgaXMgbm90IHJlbGF0ZWQgdG8gdHJhbnNwb3NlLiIsIkMiOiJUaGF0IHdvdWxkIGJlIHNjYWxhciBtdWx0aXBsaWNhdGlvbiBieSBcXCgtMVxcKSwgbm90IHRyYW5zcG9zZS4iLCJEIjoiVHJhbnNwb3NlIGRvZXMgbm90IGNoYW5nZSB0aGUgZGF0YSBieSBhZGRpbmcgemVybyByb3dzLiJ9LCJoaW50IjoiVGhpbmsgYWJvdXQgd2hlcmUgdGhlIGZpcnN0IHJvdyBnb2VzLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJnZW5lcmF0ZV9pbWFnZSIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMyIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQSBtYXRyaXggXFwoQVxcKSBoYXMgZW50cnkgXFwoYV97MjN9XFwpIGluIHJvdyAyLCBjb2x1bW4gMy4gV2hlcmUgZG9lcyB0aGlzIGVudHJ5IGFwcGVhciBpbiBcXChBXlRcXCk/IiwiaWRlYWxfYW5zd2VyIjoiSXQgYXBwZWFycyBhcyBcXChhX3szMn1cXCksIG1lYW5pbmcgcm93IDMsIGNvbHVtbiAyIGluIFxcKEFeVFxcKS4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IHN0YXRlIHRoYXQgcm93IGFuZCBjb2x1bW4gaW5kaWNlcyBzd2FwIiwiTXVzdCBpZGVudGlmeSB0aGUgbmV3IGxvY2F0aW9uIGFzIHJvdyAzLCBjb2x1bW4gMiIsIk11c3QgY29ubmVjdCBcXChhX3syM31cXCkgdG8gXFwoYV97MzJ9XFwpIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCB1bmRlcnN0YW5kcyB0cmFuc3Bvc2UgYXQgdGhlIGVudHJ5IGxldmVsLCBub3QganVzdCBhcyBhIHNsb2dhbi4iLCJoaW50IjoiVHJhbnNwb3NlIHJldmVyc2VzIHRoZSBvcmRlciBvZiB0aGUgaW5kaWNlcy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
