%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6Indpa2lfcmVmZXJlbmNlIiwicmF0aW9uYWxlIjoiVGhlIE9DUi1zdXBwb3J0ZWQgY29udGVudCBpcyBzeW1ib2xpYyBtYXRyaXggbm90YXRpb24sIHNvIHRoZSBtYWluIHRlYWNoaW5nIHN1cmZhY2Ugc2hvdWxkIGJlIGNsZWFuIExhVGVYIGZvcm11bGFzIGFuZCBtYXRyaXggZXhhbXBsZXMuIEJlY2F1c2UgdmlzdWFsaXphdGlvbiBpcyByZXF1aXJlZCBhbmQgcm93LWNvbHVtbiBpbmRleGluZyBpcyBlYXNpZXIgdG8gcmVjb2duaXplIHZpc3VhbGx5LCB1c2UgYSBXaWtpcGVkaWEvV2lraW1lZGlhLXN0eWxlIG1hdHJpeCBkaWFncmFtIGFzIHRoZSBzdGF0aWMgc3VwcG9ydC4gTm8gdGV4dGJvb2sgZmlndXJlcyBhcmUgYXZhaWxhYmxlLiIsImNyYW0iOiJVc2UgdmlzdWFscyB0byBtYWtlIHJvdy1maXJzdCwgY29sdW1uLXNlY29uZCBpbmRleGluZyByZWNvZ25pemFibGUgaW1tZWRpYXRlbHkuIiwic3RhbmRhcmQiOiJVc2UgdmlzdWFscyBiZXNpZGUgb25lIHJlcHJlc2VudGF0aXZlIG1hdHJpeCBleGFtcGxlIHRvIGNvbm5lY3Qgbm90YXRpb24gd2l0aCBlbnRyaWVzLiIsInRvcF9zY29yZSI6IlVzZSB2aXN1YWxzIHRvIGV4cG9zZSBjb21tb24gdHJhcHM6IHJldmVyc2luZyByb3cgYW5kIGNvbHVtbiBpbmRpY2VzLCBhbmQgZm9yZ2V0dGluZyB0aGF0IHRyYW5zcG9zZSBjaGFuZ2VzIG1hdHJpeCBvcmRlci4ifQ==" style="display:none;"></div>%%KC_END%%
# B.6-1 Matrix Notation and Transpose

> **Section Objective:** Learn how to read matrix entry notation and how transpose swaps rows with columns.

---

### CONCEPTS IN THIS SECTION

- matrix entry notation
- matrix order
- transpose
- double transpose

## 1. Matrix entry notation

\(A\) is an \(m \times n\) matrix, meaning it has \(m\) rows and \(n\) columns. The symbol \(a_{ij}\) refers to the entry in **row \(i\)**, **column \(j\)**.

**Rule:** The first index always means row; the second index always means column.

**Minimal example:** In a \(2 \times 3\) matrix, \(a_{23}\) is the entry in row 2, column 3 — the last entry of the second row.

**When to use this:** Whenever a problem describes matrix entries by position rather than writing the full matrix.

#### EXAM TRIGGER
Phrases like "the \((i,j)\) entry" or "element \(a_{ij}\)" signal that you need this notation.

#### COMMON MISUSE
Reading \(a_{23}\) as column 2, row 3 — always read row first, column second.

$$A = (a_{ij})_{m \times n}$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="web_reference_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiTWVtb3JpemUgdGhlIHZpc3VhbCBydWxlOiBmaXJzdCBpbmRleCBwb2ludHMgdG8gdGhlIHJvdywgc2Vjb25kIGluZGV4IHBvaW50cyB0byB0aGUgY29sdW1uLiIsInN0YW5kYXJkIjoiVXNlIHRoZSBpbWFnZSBiZXNpZGUgdGhlIFxcKGFfezIzfVxcKSBleGFtcGxlIHNvIHN0dWRlbnRzIGNvbm5lY3Qgbm90YXRpb24gdG8gcG9zaXRpb24uIiwidG9wX3Njb3JlIjoiSWRlbnRpZnkgd2h5IHJldmVyc2luZyByb3cgYW5kIGNvbHVtbiBnaXZlcyBhIGRpZmZlcmVudCBlbnRyeS4ifQ==" style="display:none;"></div>%%KC_END%%
![File:Matrix transpose.gif](https://upload.wikimedia.org/wikipedia/commons/e/e4/Matrix_transpose.gif?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original)
*Notice how each entry is located by its row index first, then its column index — the position \(a_{ij}\) sits at the intersection of row \(i\) and column \(j\).*
%%KC_BLOCK%%<div class="kc-reference-source"><a href="https://upload.wikimedia.org/wikipedia/commons/e/e4/Matrix_transpose.gif?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original" target="_blank" rel="noopener noreferrer">Animated reference from Wikimedia Commons</a></div>%%KC_END%%

## 2. Transpose

The **transpose** \(A^T\) is formed by swapping the rows and columns of \(A\).

- If \(A\) has order \(m \times n\), then \(A^T\) has order \(n \times m\).
- The notation \(a_{ji}\) shows that the row and column positions are exchanged: what was in row \(i\), column \(j\) of \(A\) moves to row \(j\), column \(i\) of \(A^T\).

**Example:** A \(2 \times 3\) matrix becomes a \(3 \times 2\) matrix after transposing. The first row of \(A\) becomes the first column of \(A^T\).

#### EXAM TRIGGER
Phrases like "find \(A^T\)", "transpose the matrix", or "write columns as rows" all call for this operation.

#### COMMON MISUSE
Changing the numerical values of entries — transpose only changes the **positions** of entries, never their values.

$$A^T = (a_{ji})_{n \times m}$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="web_reference_image" data-teaching-role="example_support" data-visual-use-b64="eyJjcmFtIjoiRmFzdCBleGFtIGN1ZTogcm93cyB0dXJuIGludG8gY29sdW1ucy4iLCJzdGFuZGFyZCI6IlN1cHBvcnRzIHRoZSB3b3JrZWQgXFwoMiBcXHRpbWVzIDNcXCkgdG8gXFwoMyBcXHRpbWVzIDJcXCkgZXhhbXBsZS4iLCJ0b3Bfc2NvcmUiOiJDaGVjayBib3RoIGVudHJ5IHBsYWNlbWVudCBhbmQgb3JkZXIgY2hhbmdlLiJ9" style="display:none;"></div>%%KC_END%%
![Principal component analysis](https://upload.wikimedia.org/wikipedia/commons/f/f5/GaussianScatterPCA.svg)
*Watch how each row of the original matrix becomes a column in the transpose — the order changes from \(m \times n\) to \(n \times m\), but no entry value changes.*
%%KC_BLOCK%%<div class="kc-reference-source"><a href="https://upload.wikimedia.org/wikipedia/commons/f/f5/GaussianScatterPCA.svg" target="_blank" rel="noopener noreferrer">Reference image from Wikipedia</a></div>%%KC_END%%

## 3. Double transpose

Transposing **once** swaps rows and columns. Transposing a **second time** swaps them back, returning the original matrix.

- \(A\): the original matrix
- \(A^T\): its transpose (rows and columns swapped)
- \((A^T)^T\): the transpose of the transpose — which is just \(A\) again

**Use case:** Simplify expressions that contain nested or repeated transpose operations.

#### EXAM TRIGGER
Whenever a problem contains nested transpose notation such as \((A^T)^T\), apply this identity to simplify immediately.

#### COMMON MISUSE
Thinking each transpose changes the numerical entries — it only changes positions, so doing it twice restores the original matrix exactly.

**Quick check:** If \(A\) is \(4 \times 2\), what order does \((A^T)^T\) have? It must be \(4 \times 2\), the same as \(A\).

$$(A^T)^T = A$$

---
**📌 Key Takeaways**
- In \(A=(a_{ij})_{m\times n}\), index \(i\) is always the row and index \(j\) is always the column.
- Transpose formula: \(A^T=(a_{ji})_{n\times m}\) — order swaps from \(m\times n\) to \(n\times m\).
- Double transpose identity: \((A^T)^T=A\) — two swaps return the original matrix.
- Row-first, column-second: always read \(a_{ij}\) as row \(i\), column \(j\), never the reverse.

*Next, use these notation rules to understand basic matrix operations.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6Im1hdHJpeF9lbnRyeV9ub3RhdGlvbiIsImxhYmVsIjoiTWF0cml4IGVudHJ5IG5vdGF0aW9uIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJbiB0aGUgbm90YXRpb24gXFwoYV97aWp9XFwpLCB3aGF0IGRvZXMgdGhlIGluZGV4IFxcKGpcXCkgcmVwcmVzZW50PyIsIm9wdGlvbnMiOlsiQS4gVGhlIHJvdyBudW1iZXIiLCJCLiBUaGUgY29sdW1uIG51bWJlciIsIkMuIFRoZSB0b3RhbCBudW1iZXIgb2Ygcm93cyIsIkQuIFRoZSB2YWx1ZSBvZiB0aGUgZW50cnkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJJbiBcXChhX3tpan1cXCksIHRoZSBmaXJzdCBpbmRleCBcXChpXFwpIGdpdmVzIHRoZSByb3cgYW5kIHRoZSBzZWNvbmQgaW5kZXggXFwoalxcKSBnaXZlcyB0aGUgY29sdW1uLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSByb3cgbnVtYmVyIGlzIHJlcHJlc2VudGVkIGJ5IFxcKGlcXCksIG5vdCBcXChqXFwpLiIsIkMiOiJUaGUgdG90YWwgbnVtYmVyIG9mIHJvd3MgaXMgdXN1YWxseSByZXByZXNlbnRlZCBieSBcXChtXFwpIGluIGFuIFxcKG0gXFx0aW1lcyBuXFwpIG1hdHJpeC4iLCJEIjoiVGhlIHZhbHVlIG9mIHRoZSBlbnRyeSBpcyBcXChhX3tpan1cXCkgaXRzZWxmLCBub3QgdGhlIGluZGV4IFxcKGpcXCkuIn0sImhpbnQiOiJSZWFkIG1hdHJpeCBlbnRyaWVzIGFzIHJvdyBmaXJzdCwgY29sdW1uIHNlY29uZC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgc3R1ZGVudCBzYXlzIFxcKGFfezIzfVxcKSBtZWFucyAnY29sdW1uIDIsIHJvdyAzJy4gV2h5IGlzIHRoaXMgd3Jvbmc/Iiwib3B0aW9ucyI6WyJBLiBCZWNhdXNlIFxcKGFfezIzfVxcKSBtZWFucyByb3cgMiwgY29sdW1uIDMiLCJCLiBCZWNhdXNlIFxcKGFfezIzfVxcKSBtZWFucyByb3cgMywgY29sdW1uIDIiLCJDLiBCZWNhdXNlIFxcKGFfezIzfVxcKSBvbmx5IGV4aXN0cyBpbiBzcXVhcmUgbWF0cmljZXMiLCJELiBCZWNhdXNlIG1hdHJpeCBlbnRyaWVzIGNhbm5vdCB1c2UgdHdvIGluZGljZXMiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJcXChhX3syM31cXCkgdXNlcyB0aGUgZmlyc3QgaW5kZXggZm9yIHJvdyBhbmQgdGhlIHNlY29uZCBpbmRleCBmb3IgY29sdW1uLCBzbyBpdCBtZWFucyByb3cgMiwgY29sdW1uIDMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhhdCByZXZlcnNlcyB0aGUgcm93LWNvbHVtbiBvcmRlci4iLCJDIjoiXFwoYV97MjN9XFwpIGNhbiBleGlzdCBpbiBhbnkgbWF0cml4IHdpdGggYXQgbGVhc3QgMiByb3dzIGFuZCAzIGNvbHVtbnMuIiwiRCI6Ik1hdHJpeCBlbnRyaWVzIGFyZSBjb21tb25seSBsYWJlbGVkIHdpdGggdHdvIGluZGljZXMuIn0sImhpbnQiOiJUaGUgZmlyc3QgbnVtYmVyIHRlbGxzIHlvdSB3aGljaCByb3cgdG8gbW92ZSB0by4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoidmlzdWFsX3BhdHRlcm5fcmVjb2duaXRpb25fY2hlY2siLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6Im1hdHJpeF9vcmRlciIsImxhYmVsIjoiTWF0cml4IG9yZGVyIiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSWYgXFwoQT0oYV97aWp9KV97NFxcdGltZXMgN31cXCksIGhvdyBtYW55IHJvd3MgYW5kIGNvbHVtbnMgZG9lcyBcXChBXFwpIGhhdmU/Iiwib3B0aW9ucyI6WyJBLiA0IHJvd3MgYW5kIDcgY29sdW1ucyIsIkIuIDcgcm93cyBhbmQgNCBjb2x1bW5zIiwiQy4gNCBjb2x1bW5zIGFuZCA3IGVudHJpZXMiLCJELiAyOCByb3dzIGFuZCAxIGNvbHVtbiJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlRoZSBvcmRlciBcXCg0XFx0aW1lcyA3XFwpIG1lYW5zIDQgcm93cyBhbmQgNyBjb2x1bW5zLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoaXMgcmV2ZXJzZXMgdGhlIG9yZGVyLiIsIkMiOiJUaGUgZmlyc3QgbnVtYmVyIGNvdW50cyByb3dzLCBub3QgY29sdW1ucy4iLCJEIjoiVGhlIHByb2R1Y3QgMjggZ2l2ZXMgdGhlIHRvdGFsIG51bWJlciBvZiBlbnRyaWVzLCBub3QgdGhlIG51bWJlciBvZiByb3dzLiJ9LCJoaW50IjoiTWF0cml4IG9yZGVyIGlzIHJvd3MgYnkgY29sdW1ucy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJ0cmFuc3Bvc2Vfb3BlcmF0aW9uIiwibGFiZWwiOiJUcmFuc3Bvc2Ugb3BlcmF0aW9uIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJZiBcXChBXFwpIGlzIGEgXFwoMlxcdGltZXMgNVxcKSBtYXRyaXgsIHdoYXQgaXMgdGhlIG9yZGVyIG9mIFxcKEFeVFxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKDJcXHRpbWVzIDVcXCkiLCJCLiBcXCg1XFx0aW1lcyAyXFwpIiwiQy4gXFwoMlxcdGltZXMgMlxcKSIsIkQuIFxcKDVcXHRpbWVzIDVcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUcmFuc3Bvc2Ugc3dhcHMgcm93cyBhbmQgY29sdW1ucywgc28gYSBcXCgyXFx0aW1lcyA1XFwpIG1hdHJpeCBiZWNvbWVzIGEgXFwoNVxcdGltZXMgMlxcKSBtYXRyaXguIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhhdCB3b3VsZCBsZWF2ZSB0aGUgb3JkZXIgdW5jaGFuZ2VkLCBidXQgdHJhbnNwb3NlIHN3YXBzIHRoZSBkaW1lbnNpb25zLiIsIkMiOiJUcmFuc3Bvc2UgZG9lcyBub3QgbWFrZSB0aGUgbWF0cml4IHNxdWFyZS4iLCJEIjoiVHJhbnNwb3NlIGRvZXMgbm90IGR1cGxpY2F0ZSB0aGUgbnVtYmVyIG9mIGNvbHVtbnMuIn0sImhpbnQiOiJTd2FwIHRoZSB0d28gbnVtYmVycyBpbiB0aGUgbWF0cml4IG9yZGVyLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggc3RhdGVtZW50IGJlc3QgZGVzY3JpYmVzIFxcKEFeVD0oYV97aml9KV97blxcdGltZXMgbX1cXCk/Iiwib3B0aW9ucyI6WyJBLiBUaGUgZW50cmllcyBhcmUgc3F1YXJlZCIsIkIuIFJvd3MgYW5kIGNvbHVtbnMgYXJlIGV4Y2hhbmdlZCIsIkMuIEV2ZXJ5IGVudHJ5IGNoYW5nZXMgc2lnbiIsIkQuIE9ubHkgZGlhZ29uYWwgZW50cmllcyByZW1haW4iXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgbm90YXRpb24gXFwoYV97aml9XFwpIHNob3dzIHRoYXQgdGhlIHJvdyBhbmQgY29sdW1uIHBvc2l0aW9ucyBhcmUgc3dhcHBlZC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUcmFuc3Bvc2UgY2hhbmdlcyBwb3NpdGlvbnMsIG5vdCBwb3dlcnMuIiwiQyI6IkNoYW5naW5nIHNpZ25zIGlzIG5vdCBwYXJ0IG9mIHRoZSB0cmFuc3Bvc2Ugb3BlcmF0aW9uLiIsIkQiOiJLZWVwaW5nIG9ubHkgZGlhZ29uYWwgZW50cmllcyBkZXNjcmliZXMgYSBkaWZmZXJlbnQgb3BlcmF0aW9uLCBub3QgdHJhbnNwb3NlLiJ9LCJoaW50IjoiTG9vayBhdCBob3cgXFwoaWpcXCkgYmVjb21lcyBcXChqaVxcKS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoic3RydWN0dXJlX2NvbXBhcmlzb25fY2hlY2siLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImRvdWJsZV90cmFuc3Bvc2UiLCJsYWJlbCI6IkRvdWJsZSB0cmFuc3Bvc2UiLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3A0X3ExIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJFeHBsYWluIHdoeSBcXCgoQV5UKV5UPUFcXCkgaW4gb25lIG9yIHR3byBzZW50ZW5jZXMuIiwiaWRlYWxfYW5zd2VyIjoiVGhlIGZpcnN0IHRyYW5zcG9zZSBzd2FwcyB0aGUgcm93cyBhbmQgY29sdW1ucyBvZiBcXChBXFwpLiBUaGUgc2Vjb25kIHRyYW5zcG9zZSBzd2FwcyB0aGVtIGJhY2ssIHNvIHRoZSBvcmlnaW5hbCBtYXRyaXggXFwoQVxcKSBpcyByZWNvdmVyZWQuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBzdGF0ZSB0aGF0IHRyYW5zcG9zZSBzd2FwcyByb3dzIGFuZCBjb2x1bW5zIiwiTXVzdCBzdGF0ZSB0aGF0IGRvaW5nIHRoZSBzd2FwIHR3aWNlIHJldHVybnMgdG8gdGhlIG9yaWdpbmFsIG1hdHJpeCIsIk11c3Qgbm90IGNsYWltIHRoYXQgdHJhbnNwb3NlIGNoYW5nZXMgdGhlIG51bWVyaWNhbCB2YWx1ZXMgb2YgZW50cmllcyJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQgdW5kZXJzdGFuZHMgdGhlIG9wZXJhdGlvbiByYXRoZXIgdGhhbiBvbmx5IG1lbW9yaXppbmcgdGhlIGZvcm11bGEuIiwiaGludCI6IlRoaW5rIG9mIHRyYW5zcG9zZSBhcyBhIHBvc2l0aW9uIHN3YXAsIHRoZW4gYXBwbHkgdGhlIHNhbWUgc3dhcCBhZ2Fpbi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
