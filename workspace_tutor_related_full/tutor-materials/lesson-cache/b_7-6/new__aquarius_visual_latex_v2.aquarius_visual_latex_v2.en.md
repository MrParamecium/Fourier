%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6Indpa2lfcmVmZXJlbmNlIiwicmF0aW9uYWxlIjoiTWF0cml4IHRyYW5zcG9zZSBpcyBkZWZpbml0aW9uLWZpcnN0IGFuZCBzaG91bGQgYmUgdGF1Z2h0IG1haW5seSB0aHJvdWdoIGV4YWN0IExhVGVYIG1hdHJpY2VzLiBBIHNpbXBsZSBXaWtpbWVkaWEtc3R5bGUgYmVmb3JlLWFuZC1hZnRlciB0cmFuc3Bvc2UgZGlhZ3JhbSBjYW4gc3VwcG9ydCB2aXN1YWwgcmVjb2duaXRpb24gb2Ygcm93cyBiZWNvbWluZyBjb2x1bW5zIHdpdGhvdXQgcmVwbGFjaW5nIHRoZSBzeW1ib2xpYyBkZWZpbml0aW9uLiIsImNyYW0iOiJVc2UgdGhlIHZpc3VhbCB0byByZWNvZ25pemUgdGhlIGV4YW0gYWN0aW9uIGltbWVkaWF0ZWx5OiByb3cgMSBiZWNvbWVzIGNvbHVtbiAxLCByb3cgMiBiZWNvbWVzIGNvbHVtbiAyLiIsInN0YW5kYXJkIjoiVXNlIHRoZSB2aXN1YWwgbmV4dCB0byBvbmUgcmVwcmVzZW50YXRpdmUgbWF0cml4IGV4YW1wbGUgc28gdGhlIHN0dWRlbnQgc2VlcyBib3RoIHRoZSBydWxlIGFuZCB0aGUgY29tcHV0YXRpb24uIiwidG9wX3Njb3JlIjoiVXNlIHRoZSB2aXN1YWwgYW5kIE1BVExBQiBzeW50YXggbm90ZXMgdG8gY2F0Y2ggdGhlIGNvbW1vbiB0cmFwOiB0cmFuc3Bvc2UgdmVyc3VzIGNvbXBsZXggY29uanVnYXRlIHRyYW5zcG9zZS4ifQ==" style="display:none;"></div>%%KC_END%%
# B.7-6 Matrix Transpose

> **Section Objective:** Learn how matrix transpose swaps rows and columns, and how MATLAB writes transpose operations.

---

## Concepts In This Section

- matrix transpose
- row-to-column example
- MATLAB transpose syntax
- complex conjugate transpose

## 1. Matrix transpose: swap row and column positions

The transpose of matrix \(A\), written \(A^T\), is formed by swapping every entry's row index and column index. The symbol \(a_{ji}\) is the entry originally sitting in row \(j\), column \(i\) of \(A\). After transposing, that entry lands at position \((i, j)\) — captured by \((A^T)_{ij}\).

**When to use it:** any time a problem asks for \(A^T\), when MATLAB code transposes a vector or matrix, or when rows must become columns.

**Exam trigger:** phrases like "transpose", "row vector to column vector", or "write \(A^T\)".

**Common misuse:** reversing the order of entries inside each row instead of turning entire rows into columns. Those are different operations.

$$(A^T)_{ij} = a_{ji}$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="web_reference_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiUG9pbnQgdG8gdGhlIHJvdy10by1jb2x1bW4gYXJyb3dzIGFuZCBtYWtlIHRoZSBvcGVyYXRpb24gcmVjb2duaXphYmxlIGluIHNlY29uZHMuIiwic3RhbmRhcmQiOiJQbGFjZSBpdCBiZXNpZGUgdGhlIGZvcm11bGEgc28gc3R1ZGVudHMgY29ubmVjdCBcXCgoQV5UKV97aWp9PWFfe2ppfVxcKSB3aXRoIHRoZSB2aXNpYmxlIHBvc2l0aW9uIHN3YXAuIiwidG9wX3Njb3JlIjoiVXNlIGl0IHRvIHByZXZlbnQgdGhlIHN1YnRsZSB3cm9uZyBvcGVyYXRpb24gb2YgbWVyZWx5IHJldmVyc2luZyByb3cgb3JkZXIgb3IgY29sdW1uIG9yZGVyLiJ9" style="display:none;"></div>%%KC_END%%
![Principal component analysis](https://upload.wikimedia.org/wikipedia/commons/f/f5/GaussianScatterPCA.svg)
*Each row of the original matrix becomes a column of the transposed matrix — row 1 becomes column 1, row 2 becomes column 2, and so on.*
%%KC_BLOCK%%<div class="kc-reference-source"><a href="https://upload.wikimedia.org/wikipedia/commons/f/f5/GaussianScatterPCA.svg" target="_blank" rel="noopener noreferrer">Reference image from Wikipedia</a></div>%%KC_END%%

## 2. Worked example: transpose the textbook matrix

This is the original \(3 \times 2\) matrix \(A\). Label each row:

- Row 1: \([2 \; 3]\)
- Row 2: \([4 \; 5]\)
- Row 3: \([0 \; 6]\)

Because \(A\) has **3 rows and 2 columns**, its transpose \(A^T\) must have **2 rows and 3 columns**. Always check the new size before computing.

$$A = \begin{bmatrix} 2 & 3 \\ 4 & 5 \\ 0 & 6 \end{bmatrix}$$

## 3. MATLAB syntax: ordinary transpose

Each original row becomes a column of \(A^T\):

- Column 1 of \(A^T\) comes from row 1 of \(A\): \([2 \; 4 \; 0]^T\)
- Column 2 of \(A^T\) comes from row 2 of \(A\): \([3 \; 5 \; 6]^T\)

**Quick check:** entry \(a_{32} = 6\) (row 3, column 2 of \(A\)) moves to position \((2, 3)\) in \(A^T\) — exactly what \((A^T)_{ij} = a_{ji}\) predicts.

**Exam note:** always verify the new size first. A \(3 \times 2\) matrix transposes into a \(2 \times 3\) matrix — never a \(3 \times 2\) or a square.

$$A^T = \begin{bmatrix} 2 & 4 & 0 \\ 3 & 5 & 6 \end{bmatrix}$$

## 3. MATLAB syntax: ordinary transpose

MATLAB uses `A.'` (dot-apostrophe) for the **ordinary transpose**: rows and columns are swapped, and the actual numbers are left unchanged.

This is the safest notation when the matrix may contain complex entries and you want only the geometric row-column flip — no conjugation.

**Minimal example:** a row vector typed as `[1 0 0]` becomes a column vector when you write `[1 0 0].'`.

**Exam trigger:** MATLAB code containing dot-apostrophe after an array name signals ordinary transpose.

$$\texttt{A.'} = A^T$$

$$\texttt{A'} = \overline{A}^{T}$$
*MATLAB's plain apostrophe `A'` performs the **complex conjugate transpose**, not just the ordinary transpose.

\(\overline{A}\) denotes the matrix formed by replacing each complex entry with its complex conjugate — for example, \(3 + 2j\) becomes \(3 - 2j\) — and then the result is transposed.

**Practical shortcut:** for real-valued matrices, `A'` and `A.'` give identical results because conjugating a real number changes nothing.

**Common misuse:** using `A'` on complex data when the problem only asks to swap rows and columns. The imaginary parts will flip sign unexpectedly, producing a wrong answer.*

---
**📌 Key Takeaways**
- Transpose rule: \((A^T)_{ij} = a_{ji}\) — every entry swaps its row and column index.
- Size always flips: a \(3 \times 2\) matrix becomes \(2 \times 3\) after transpose.
- MATLAB ordinary transpose: \(\texttt{A.'} = A^T\) — rows and columns swap, numbers unchanged.
- MATLAB conjugate transpose: \(\texttt{A'} = \overline{A}^{T}\) — also conjugates complex entries.

*Next, use this transpose idea to read and write matrix operations more confidently in MATLAB.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InRyYW5zcG9zZV9lbnRyeV9ydWxlIiwibGFiZWwiOiJFbnRyeS13aXNlIHRyYW5zcG9zZSBydWxlIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJZiBcXCgoQV5UKV97aWp9ID0gYV97aml9XFwpLCB3aGF0IGRvZXMgdHJhbnNwb3NlIGRvIHRvIGFuIGVudHJ5IG9yaWdpbmFsbHkgaW4gcm93IDMsIGNvbHVtbiAyPyIsIm9wdGlvbnMiOlsiQS4gSXQgbW92ZXMgdG8gcm93IDIsIGNvbHVtbiAzLiIsIkIuIEl0IHN0YXlzIGluIHJvdyAzLCBjb2x1bW4gMi4iLCJDLiBJdCBtb3ZlcyB0byByb3cgMywgY29sdW1uIDEuIiwiRC4gSXQgbW92ZXMgdG8gcm93IDIsIGNvbHVtbiAxLiJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlRyYW5zcG9zZSBzd2FwcyB0aGUgcm93IGFuZCBjb2x1bW4gaW5kaWNlcywgc28gcG9zaXRpb24gXFwoKDMsIDIpXFwpIGJlY29tZXMgXFwoKDIsIDMpXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoYXQgd291bGQgbWVhbiBubyB0cmFuc3Bvc2UgaGFwcGVuZWQuIiwiQyI6IlRyYW5zcG9zZSBkb2VzIG5vdCByZXZlcnNlIGVudHJpZXMgd2l0aGluIGEgcm93LiIsIkQiOiJUcmFuc3Bvc2Ugc3dhcHMgaW5kaWNlczsgaXQgZG9lcyBub3QgcmVzZXQgZWl0aGVyIGluZGV4IHRvIDEuIn0sImhpbnQiOiJTd2FwIHRoZSB0d28gaW5kZXggbnVtYmVycy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHN0YXRlbWVudCBiZXN0IGRlc2NyaWJlcyB0aGUgdHJhbnNwb3NlIG9wZXJhdGlvbj8iLCJvcHRpb25zIjpbIkEuIFJldmVyc2UgdGhlIG9yZGVyIG9mIGVudHJpZXMgaW4gZXZlcnkgcm93LiIsIkIuIFN3YXAgcm93cyBhbmQgY29sdW1ucyBvZiB0aGUgbWF0cml4LiIsIkMuIE11bHRpcGx5IGV2ZXJ5IGVudHJ5IGJ5IFxcKC0xXFwpLiIsIkQuIFJlcGxhY2UgZXZlcnkgb2ZmLWRpYWdvbmFsIGVudHJ5IHdpdGggemVyby4iXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJBIHRyYW5zcG9zZSB0dXJucyByb3dzIGludG8gY29sdW1ucyBhbmQgY29sdW1ucyBpbnRvIHJvd3MuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhhdCBpcyByb3cgcmV2ZXJzYWwsIG5vdCB0cmFuc3Bvc2UuIiwiQyI6IkNoYW5naW5nIHNpZ25zIGlzIHVucmVsYXRlZCB0byB0cmFuc3Bvc2UuIiwiRCI6IlRoYXQgZGVzY3JpYmVzIGZvcmNpbmcgYSBkaWFnb25hbCBmb3JtLCBub3QgdHJhbnNwb3NpbmcuIn0sImhpbnQiOiJUaGluazogcm93IDEgYmVjb21lcyBjb2x1bW4gMS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoiYmVmb3JlX2FmdGVyX21hdHJpeF90cmFuc3Bvc2VfZGlhZ3JhbSIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoidHJhbnNwb3NlX2RpbWVuc2lvbl9jaGFuZ2UiLCJsYWJlbCI6Ik1hdHJpeCBzaXplIGFmdGVyIHRyYW5zcG9zZSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBtYXRyaXggXFwoQVxcKSBoYXMgc2l6ZSBcXCgzIFxcdGltZXMgMlxcKS4gV2hhdCBpcyB0aGUgc2l6ZSBvZiBcXChBXlRcXCk/Iiwib3B0aW9ucyI6WyJBLiBcXCgzIFxcdGltZXMgMlxcKSIsIkIuIFxcKDIgXFx0aW1lcyAzXFwpIiwiQy4gXFwoMyBcXHRpbWVzIDNcXCkiLCJELiBcXCgyIFxcdGltZXMgMlxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRyYW5zcG9zZSBzd2FwcyB0aGUgbnVtYmVyIG9mIHJvd3MgYW5kIGNvbHVtbnMsIHNvIFxcKDMgXFx0aW1lcyAyXFwpIGJlY29tZXMgXFwoMiBcXHRpbWVzIDNcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhhdCB3b3VsZCBrZWVwIHRoZSBzYW1lIG9yaWVudGF0aW9uLiIsIkMiOiJUcmFuc3Bvc2UgZG9lcyBub3QgbWFrZSBhIG1hdHJpeCBzcXVhcmUuIiwiRCI6IlRyYW5zcG9zZSBkb2VzIG5vdCBkaXNjYXJkIGEgcm93LiJ9LCJoaW50IjoiU3dhcCB0aGUgdHdvIGRpbWVuc2lvbnMuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoid29ya2VkX21hdHJpeF90cmFuc3Bvc2UiLCJsYWJlbCI6IkNvbXB1dGUgYSBzbWFsbCBtYXRyaXggdHJhbnNwb3NlIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJHaXZlbiBcXChBID0gXFxiZWdpbntibWF0cml4fSAyICYgMyBcXFxcIDQgJiA1IFxcXFwgMCAmIDYgXFxlbmR7Ym1hdHJpeH1cXCksIHdoaWNoIG1hdHJpeCBpcyBcXChBXlRcXCk/Iiwib3B0aW9ucyI6WyJBLiBcXChcXGJlZ2lue2JtYXRyaXh9IDIgJiA0ICYgMCBcXFxcIDMgJiA1ICYgNiBcXGVuZHtibWF0cml4fVxcKSIsIkIuIFxcKFxcYmVnaW57Ym1hdHJpeH0gMyAmIDIgXFxcXCA1ICYgNCBcXFxcIDYgJiAwIFxcZW5ke2JtYXRyaXh9XFwpIiwiQy4gXFwoXFxiZWdpbntibWF0cml4fSAyICYgMyBcXFxcIDQgJiA1IFxcXFwgMCAmIDYgXFxlbmR7Ym1hdHJpeH1cXCkiLCJELiBcXChcXGJlZ2lue2JtYXRyaXh9IDAgJiA2IFxcXFwgNCAmIDUgXFxcXCAyICYgMyBcXGVuZHtibWF0cml4fVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlRoZSByb3dzIFxcKFsyIFxcOyAzXVxcKSwgXFwoWzQgXFw7IDVdXFwpLCBhbmQgXFwoWzAgXFw7IDZdXFwpIGJlY29tZSB0aGUgY29sdW1ucyBvZiBcXChBXlRcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhpcyByZXZlcnNlcyBlbnRyaWVzIGluc2lkZSBlYWNoIHJvdyByYXRoZXIgdGhhbiB0cmFuc3Bvc2luZy4iLCJDIjoiVGhpcyBsZWF2ZXMgdGhlIG1hdHJpeCB1bmNoYW5nZWQuIiwiRCI6IlRoaXMgcmV2ZXJzZXMgcm93IG9yZGVyLCBub3Qgcm93LWNvbHVtbiBwb3NpdGlvbi4ifSwiaGludCI6IldyaXRlIGVhY2ggb3JpZ2luYWwgcm93IGFzIGEgbmV3IGNvbHVtbi4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoibWF0cml4X3Jvd3NfYmVjb21pbmdfY29sdW1uc19oaWdobGlnaHQiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJtYXRsYWJfdHJhbnNwb3NlX3N5bnRheCIsImxhYmVsIjoiTUFUTEFCIG9yZGluYXJ5IHRyYW5zcG9zZSBzeW50YXgiLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3A0X3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJbiBNQVRMQUIsIHdoaWNoIG5vdGF0aW9uIG1lYW5zIG9yZGluYXJ5IHRyYW5zcG9zZSB3aXRob3V0IGNvbXBsZXggY29uanVnYXRpb24/Iiwib3B0aW9ucyI6WyJBLiBcXChcXHRleHR0dHtBLid9XFwpIiwiQi4gXFwoXFx0ZXh0dHR7QSd9XFwpIiwiQy4gXFwoXFx0ZXh0dHR7QSp9XFwpIiwiRC4gXFwoXFx0ZXh0dHR7dHJhbnNwb3NlKEEnKX1cXCkiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJcXChcXHRleHR0dHtBLid9XFwpIGlzIE1BVExBQidzIG5vbmNvbmp1Z2F0ZSB0cmFuc3Bvc2Ugb3BlcmF0b3IuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiXFwoXFx0ZXh0dHR7QSd9XFwpIGlzIHRoZSBjb21wbGV4IGNvbmp1Z2F0ZSB0cmFuc3Bvc2UgaW4gTUFUTEFCLiIsIkMiOiJcXChcXHRleHR0dHtBKn1cXCkgaXMgbm90IHZhbGlkIE1BVExBQiB0cmFuc3Bvc2Ugc3ludGF4LiIsIkQiOiJUaGlzIGFwcGxpZXMgdHJhbnNwb3NlIHRvIGEgY29uanVnYXRlLXRyYW5zcG9zZWQgbWF0cml4LCB3aGljaCBpcyBub3QgdGhlIGJhc2ljIG9yZGluYXJ5IHRyYW5zcG9zZSBub3RhdGlvbi4ifSwiaGludCI6Ikxvb2sgZm9yIHRoZSBkb3QgYmVmb3JlIHRoZSBhcG9zdHJvcGhlLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6ImNvbXBsZXhfY29uanVnYXRlX3RyYW5zcG9zZV90cmFwIiwibGFiZWwiOiJDb21wbGV4IGNvbmp1Z2F0ZSB0cmFuc3Bvc2UgdHJhcCIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3A1X3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJBIE1BVExBQiBtYXRyaXggY29udGFpbnMgY29tcGxleCBlbnRyaWVzLiBXaGF0IGRvZXMgXFwoXFx0ZXh0dHR7QSd9XFwpIGNvbXB1dGU/Iiwib3B0aW9ucyI6WyJBLiBPcmRpbmFyeSB0cmFuc3Bvc2Ugb25seSIsIkIuIENvbXBsZXggY29uanVnYXRlIHRyYW5zcG9zZSIsIkMuIEVsZW1lbnQtYnktZWxlbWVudCByZWNpcHJvY2FsIiwiRC4gTWF0cml4IGludmVyc2UiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJNQVRMQUIncyBwbGFpbiBhcG9zdHJvcGhlIHRyYW5zcG9zZXMgdGhlIG1hdHJpeCBhbmQgY29uanVnYXRlcyBjb21wbGV4IGVudHJpZXMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiT3JkaW5hcnkgdHJhbnNwb3NlIHdpdGhvdXQgY29uanVnYXRpb24gaXMgd3JpdHRlbiBcXChcXHRleHR0dHtBLid9XFwpLiIsIkMiOiJObyByZWNpcHJvY2FsIG9wZXJhdGlvbiBpcyBpbnZvbHZlZC4iLCJEIjoiVHJhbnNwb3NlIGFuZCBpbnZlcnNlIGFyZSBkaWZmZXJlbnQgb3BlcmF0aW9ucy4ifSwiaGludCI6IlBsYWluIGFwb3N0cm9waGUgaXMgc2FmZSBmb3IgcmVhbCBtYXRyaWNlcywgYnV0IGl0IGhhcyBleHRyYSBtZWFuaW5nIGZvciBjb21wbGV4IG1hdHJpY2VzLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwNV9xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQSBjbGFzc21hdGUgdXNlcyBcXChcXHRleHR0dHtBJ31cXCkgb24gYSBjb21wbGV4IE1BVExBQiBtYXRyaXggYW5kIHNheXMgaXQgb25seSBzd2FwcyByb3dzIGFuZCBjb2x1bW5zLiBFeHBsYWluIHdoeSB0aGF0IGlzIHdyb25nIGFuZCB3aGF0IG5vdGF0aW9uIHNob3VsZCBiZSB1c2VkIGluc3RlYWQgZm9yIG9yZGluYXJ5IHRyYW5zcG9zZS4iLCJpZGVhbF9hbnN3ZXIiOiJcXChcXHRleHR0dHtBJ31cXCkgY29tcHV0ZXMgdGhlIGNvbXBsZXggY29uanVnYXRlIHRyYW5zcG9zZSBpbiBNQVRMQUIsIHNvIGl0IGFsc28gY2hhbmdlcyBlbnRyaWVzIGxpa2UgXFwoMyArIDJqXFwpIHRvIFxcKDMgLSAyalxcKS4gRm9yIG9yZGluYXJ5IHRyYW5zcG9zZSBvbmx5LCB1c2UgXFwoXFx0ZXh0dHR7QS4nfVxcKS4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IHN0YXRlIHRoYXQgXFwoXFx0ZXh0dHR7QSd9XFwpIGlzIGNvbXBsZXggY29uanVnYXRlIHRyYW5zcG9zZSIsIk11c3QgbWVudGlvbiB0aGF0IGNvbXBsZXggZW50cmllcyBhcmUgY29uanVnYXRlZCIsIk11c3QgaWRlbnRpZnkgXFwoXFx0ZXh0dHR7QS4nfVxcKSBhcyBvcmRpbmFyeSB0cmFuc3Bvc2Ugc3ludGF4Il0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3MgdGhlIG1vc3QgaW1wb3J0YW50IE1BVExBQi1zcGVjaWZpYyB0cmFwIGluIHRoZSBzZWN0aW9uLiIsImhpbnQiOiJBc2sgd2hhdCBoYXBwZW5zIHRvIHRoZSBzaWduIG9mIHRoZSBpbWFnaW5hcnkgcGFydC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX1dfQ==" style="display:none;"></div>%%KC_END%%
