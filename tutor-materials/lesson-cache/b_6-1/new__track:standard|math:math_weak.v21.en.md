%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImdlbmVyYXRlZF9pbWFnZSIsInJhdGlvbmFsZSI6IlRoaXMgc2VjdGlvbiBpcyBhYm91dCBtYXRyaXggc3RydWN0dXJlLCBub3RhdGlvbiwgYW5kIHJlY29nbml0aW9uIHBhdHRlcm5zLiBDbGVhbiBsZWN0dXJlLW5vdGUgdmlzdWFscyBhcmUgbW9yZSB1c2VmdWwgdGhhbiByYXcgT0NSIHBhZ2Ugc2NyZWVuc2hvdHMgYmVjYXVzZSB0aGUgdGV4dGJvb2sgcGFnZXMgaGVyZSBhcmUgbWF0aC1oZWF2eSBhbmQgY29udGFpbiBubyBleHRyYWN0ZWQgZmlndXJlcy4iLCJjcmFtIjoiVXNlIHZpc3VhbHMgdG8gaGVscCB0aGUgc3R1ZGVudCByZWNvZ25pemUgbWF0cml4IHR5cGVzIGFuZCB0cmFuc3Bvc2UgcGF0dGVybnMgaW4gc2Vjb25kcy4iLCJzdGFuZGFyZCI6IlVzZSB2aXN1YWxzIHRvIG1ha2Ugcm93LWNvbHVtbiBpbmRleGluZywgc3BlY2lhbCBtYXRyaXggcGF0dGVybnMsIGFuZCB0cmFuc3Bvc2UgYmVoYXZpb3IgaW1tZWRpYXRlbHkgY2xlYXIuIiwidG9wX3Njb3JlIjoiVXNlIHZpc3VhbHMgdG8gc3VyZmFjZSBleGFjdCByZWNvZ25pdGlvbiBydWxlcyBhbmQgcHJldmVudCBzdWJ0bGUgaW5kZXhpbmcgYW5kIGVxdWFsaXR5IG1pc3Rha2VzLiJ9" style="display:none;"></div>%%KC_END%%
# B.6-1 Some Definitions and Properties

> **Section Objective:** Learn how to read matrix entries correctly, recognize the most common matrix types, and avoid the basic definition mistakes that cost easy exam marks.

Before matrix algebra starts, you need a small set of definitions that you can use fast and accurately.

This section is not about heavy calculation. It is about **recognition**:

1. reading an entry like \(a_{23}\) without hesitation
2. recognizing diagonal, identity, zero, and symmetric matrices
3. understanding what transpose actually changes
4. checking matrix equality the strict way

If these four ideas are shaky, later chapters feel confusing for no good reason. If these four ideas are solid, the rest of matrix algebra becomes much easier to follow.

$$A = [a_{ij}]$$
*The entry \(a_{ij}\) means: go to row \(i\) first, then column \(j\). The first index is always the row. The second index is always the column.*

## 1. Reading Matrix Entries Correctly

An \(m \times n\) matrix has:

- \(m\) rows
- \(n\) columns

So a \(3 \times 4\) matrix has 3 rows and 4 columns.

### Core rule

**Row first, column second.**

That means:

- \(a_{23}\) = row 2, column 3
- \(a_{12}\) = row 1, column 2
- \(a_{31}\) = row 3, column 1

This is the first place students lose easy points. They see the subscript and read it backwards. Do not do that.

#### Quick reality check

If \(A\) is a \(3 \times 4\) matrix:

- \(a_{34}\) exists
- \(a_{43}\) does **not** exist

Why? Because there is no row 4.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgdmlzdWFsIHRvIG1lbW9yaXplIHJvdy1maXJzdCwgY29sdW1uLXNlY29uZCBpbmRleGluZyBxdWlja2x5LiIsInN0YW5kYXJkIjoiVXNlIHRoaXMgdmlzdWFsIHRvIGNvbm5lY3QgdGhlIG5vdGF0aW9uIGFfaWogdG8gYSByZWFsIG1hdHJpeCBsYXlvdXQuIiwidG9wX3Njb3JlIjoiVXNlIHRoaXMgdmlzdWFsIHRvIHByZXZlbnQgcm93LWNvbHVtbiBpbmRleGluZyBtaXN0YWtlcyB1bmRlciBleGFtIHByZXNzdXJlLiJ9" style="display:none;"></div>%%KC_END%%
*🎨 Matrix entry \(a_{ij}\): the first index \(i\) selects the row, the second index \(j\) selects the column. Here \(a_{23}\) sits at row 2, column 3.*
![Illustration](/generated/gptimage2-1777739312720-4626.png)

## 2. Four Matrix Types You Must Recognize

Most early matrix questions are basically classification questions.

You look at the pattern and decide what kind of matrix it is.

### DIAGONAL MATRIX

Only entries on the **main diagonal** may be nonzero.

The main diagonal runs from top-left to bottom-right.

So in a diagonal matrix:

- diagonal entries can be numbers like 3, 1, -2, 0
- every off-diagonal entry must be 0

### IDENTITY MATRIX

An identity matrix is a **special diagonal matrix**.

Its rule is stricter:

- all diagonal entries are 1
- all off-diagonal entries are 0

It is written \(I\) or \(I_n\).

The identity matrix is important because multiplying by it does not change the other matrix, as long as the sizes match.

$$
I_3 =
\begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{bmatrix}
$$
*For identity matrices, LaTeX is clearer than a picture: 1s on the main diagonal, 0s everywhere else.*

### ZERO MATRIX

Every entry is 0.

This is the matrix version of the number zero.

### SYMMETRIC MATRIX

A matrix is symmetric if

$$a_{ij} = a_{ji} \quad \text{for all } i,j$$

That means the entries mirror across the main diagonal.

Important: a symmetric matrix must be **square**.

#### Fast comparison

- diagonal: off-diagonal entries are all zero
- identity: diagonal matrix with all diagonal entries equal to 1
- zero: every entry is zero
- symmetric: entries mirror across the diagonal

#### Easy exam trap

Students often mix up diagonal and symmetric.

Here is the right relationship:

- every diagonal matrix is symmetric
- not every symmetric matrix is diagonal

Why? A symmetric matrix can have nonzero off-diagonal entries, as long as they mirror.

### 5-second recognition checklist

When you see a matrix on an exam, ask these questions in order:

1. Is it square?
2. Are all off-diagonal entries zero?
3. If yes, are the diagonal entries all 1?
4. If not diagonal, do entries still mirror across the diagonal?

This gives you a fast path:

- off-diagonal all zero -> diagonal
- off-diagonal all zero + diagonal all 1 -> identity
- all entries zero -> zero matrix
- mirrored across diagonal -> symmetric

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="classification_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgdmlzdWFsIGFzIGEgcXVpY2sgcmVjb2duaXRpb24gY2hhcnQgZm9yIG1hdHJpeCB0eXBlcy4iLCJzdGFuZGFyZCI6IlVzZSB0aGlzIHZpc3VhbCB0byBjbGFyaWZ5IHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIHRoZSBzdGFuZGFyZCBuYW1lZCBtYXRyaXggcGF0dGVybnMuIiwidG9wX3Njb3JlIjoiVXNlIHRoaXMgdmlzdWFsIHRvIHJlZHVjZSBtaXNjbGFzc2lmaWNhdGlvbiBlcnJvcnMgYW5kIHNoYXJwZW4gc3RydWN0dXJhbCByZWNvZ25pdGlvbi4ifQ==" style="display:none;"></div>%%KC_END%%
*🎨 Four named matrix types and their recognition patterns. Identity and zero are special cases of diagonal.*
![Illustration](/generated/gptimage2-1777739488608-7556.png)

## 3. Matrix Equality

Two matrices are equal only if **both** conditions hold:

1. they have the same order
2. every corresponding entry is equal

So the definition is:

$$A = B \iff a_{ij} = b_{ij} \text{ for all } i,j$$

Same size alone is not enough.

Having some matching entries is not enough.

Looking similar is not enough.

Equality in matrices is strict.

#### Example

If

$$
A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix},
\qquad
B = \begin{bmatrix} 1 & 2 \\ 3 & 5 \end{bmatrix}
$$

then \(A \ne B\) because one entry is different.

If one matrix is \(2 \times 3\) and the other is \(3 \times 2\), they also cannot be equal, even if they contain the same numbers.

### Fast equality test

Use this order:

1. Check the size first
2. Then compare entries

If the sizes differ, stop immediately. They are not equal.

## 4. Transpose

The transpose of \(A\) is written \(A^T\).

Transpose does **one** thing:

- it swaps rows and columns

So the entry rule becomes:

$$A^T = [a_{ji}]$$

That means the entry in row \(i\), column \(j\) moves to row \(j\), column \(i\).

### What transpose changes

- the position of entries
- the order of the matrix

### What transpose does not change

- the actual values of the entries

If \(A\) is \(m \times n\), then \(A^T\) is \(n \times m\).

Also:

$$
(A^T)^T = A
$$

Transpose twice and you return to the original matrix.

#### Important warning

Students sometimes say "transpose changes the numbers."

That is false.

Transpose changes **where** the numbers are, not **what** the numbers are.

## 5. Worked Example

Let

$$
A =
\begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6
\end{bmatrix}
$$

### Step 1: Find the order

\(A\) has 2 rows and 3 columns, so it is a \(2 \times 3\) matrix.

### Step 2: Ask what kind of matrix it is

It is not square, so it cannot be:

- diagonal
- identity
- symmetric

It is just a general rectangular matrix.

### Step 3: Take the transpose

Swap rows and columns:

$$
A^T =
\begin{bmatrix}
1 & 4 \\
2 & 5 \\
3 & 6
\end{bmatrix}
$$

Now the matrix is \(3 \times 2\).

Notice:

- the 1 stays 1
- the 6 stays 6
- every value is the same
- only the positions changed

The quickest way to say this is:

- row 1 of \(A\) becomes column 1 of \(A^T\)
- row 2 of \(A\) becomes column 2 of \(A^T\)

### Step 4: Check equality

Can \(A = A^T\)?

No.

Why not?

Because:

- \(A\) is \(2 \times 3\)
- \(A^T\) is \(3 \times 2\)

They do not even have the same order, so equality is impossible.

## 6. Common Mistakes to Avoid

- Reading \(a_{23}\) as row 3, column 2 instead of row 2, column 3
- Calling a diagonal matrix an identity matrix even when the diagonal entries are not all 1
- Thinking transpose changes values instead of positions
- Forgetting that symmetric matrices must be square
- Saying two matrices are equal just because they have the same size

## 7. Exam Reflex You Want

By the end of this section, your reflex should be:

1. read the order
2. classify the matrix pattern
3. check whether transpose changes the size
4. reject equality immediately if the sizes do not match

That reflex is what makes B.6-2 much easier.

---
**📌 Key Takeaways**
- \(a_{ij}\) means row first, column second.
- Diagonal means only the main diagonal may be nonzero.
- Identity is a special diagonal matrix with 1s on the diagonal.
- Symmetric means \(a_{ij} = a_{ji}\).
- Matrix equality needs same order and same entries everywhere.
- Transpose swaps rows and columns, so \(m \times n\) becomes \(n \times m\).

*With these definitions clear, the next section can focus on actual matrix operations instead of basic notation mistakes.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6Im1hdHJpeF9vcmRlcl9hbmRfZW50cnlfcmVhZGluZyIsImxhYmVsIjoiTWF0cml4IG9yZGVyIGFuZCBlbnRyeSBub3RhdGlvbiIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImI2MV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJ0YXNrX3R5cGUiOiJjb3JlX2NvbmNlcHRfY2hlY2siLCJzdGVtIjoiSWYgXFwgKEFcXCkgaXMgYSBcXCAoMyBcXHRpbWVzIDRcXCkgbWF0cml4LCB3aGF0IGRvZXMgdGhlIHN5bWJvbCBcXCAoYV97MjN9XFwpIHJlZmVyIHRvPyIsIm9wdGlvbnMiOlsiQS4gUm93IDMsIGNvbHVtbiAyIiwiQi4gUm93IDIsIGNvbHVtbiAzIiwiQy4gQ29sdW1uIDIsIHJvdyAzIiwiRC4gVGhlIDIzcmQgZW50cnkgb2YgXFwgKEFcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgZmlyc3QgaW5kZXggZ2l2ZXMgdGhlIHJvdyBhbmQgdGhlIHNlY29uZCBpbmRleCBnaXZlcyB0aGUgY29sdW1uLCBzbyBcXCAoYV97MjN9XFwpIG1lYW5zIHJvdyAyLCBjb2x1bW4gMy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIHJldmVyc2VzIHRoZSBtZWFuaW5nIG9mIHRoZSB0d28gaW5kaWNlcy4iLCJDIjoiQ29sdW1uLWZpcnN0IHJlYWRpbmcgaXMgaW5jb3JyZWN0IGhlcmUuIiwiRCI6IlRoZSBzdWJzY3JpcHRzIGFyZSBwb3NpdGlvbmFsIGluZGljZXMsIG5vdCBhIHNlcmlhbCBlbnRyeSBudW1iZXIuIn0sImhpbnQiOiJSZWFkIHRoZSBpbmRpY2VzIGluIHJvdy1jb2x1bW4gb3JkZXIuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwibmVlZHNfZGVtbyI6ZmFsc2UsImNvbW1vbl9taXN0YWtlX3RhcmdldCI6InJvd19jb2x1bW5fY29uZnVzaW9uIiwiaWZfd3JvbmdfdGhlbl9yZXZpZXciOiJtYXRyaXggbm90YXRpb24gYW5kIHJvdy1jb2x1bW4gaW5kZXhpbmcifV19LHsiaWQiOiJzcGVjaWFsX21hdHJpeF9yZWNvZ25pdGlvbiIsImxhYmVsIjoiUmVjb2duaXppbmcgc3RhbmRhcmQgbWF0cml4IHR5cGVzIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJiNjFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwidGFza190eXBlIjoibWluaV90cmFuc2Zlcl9jaGVjayIsInN0ZW0iOiJXaGljaCBkZXNjcmlwdGlvbiBpZGVudGlmaWVzIGEgc3ltbWV0cmljIG1hdHJpeCBjb3JyZWN0bHk/Iiwib3B0aW9ucyI6WyJBLiBBbGwgZGlhZ29uYWwgZW50cmllcyBhcmUgMSIsIkIuIEFsbCBlbnRyaWVzIGFyZSAwIGV4Y2VwdCB0aG9zZSBvbiB0aGUgbWFpbiBkaWFnb25hbCIsIkMuIEVudHJpZXMgbWlycm9yIGFjcm9zcyB0aGUgbWFpbiBkaWFnb25hbCBzbyB0aGF0IFxcIChhX3tpan0gPSBhX3tqaX1cXCkiLCJELiBUaGUgbWF0cml4IG11c3QgYmUgcmVjdGFuZ3VsYXIiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJBIHN5bW1ldHJpYyBtYXRyaXggc2F0aXNmaWVzIFxcIChhX3tpan0gPSBhX3tqaX1cXCksIHdoaWNoIG1lYW5zIGl0IG1pcnJvcnMgYWNyb3NzIHRoZSBtYWluIGRpYWdvbmFsLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoYXQgZGVzY3JpYmVzIHRoZSBpZGVudGl0eSBtYXRyaXgsIG5vdCBldmVyeSBzeW1tZXRyaWMgbWF0cml4LiIsIkIiOiJUaGF0IGRlc2NyaWJlcyBhIGRpYWdvbmFsIG1hdHJpeC4iLCJEIjoiQSBzeW1tZXRyaWMgbWF0cml4IG11c3QgYmUgc3F1YXJlLCBub3QgcmVjdGFuZ3VsYXIuIn0sImhpbnQiOiJUaGluayBhYm91dCByZWZsZWN0aW9uIGFjcm9zcyB0aGUgbWFpbiBkaWFnb25hbC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoibWF0cml4X3N0cnVjdHVyZV9jb21wYXJpc29uIiwibmVlZHNfZGVtbyI6ZmFsc2UsImNvbW1vbl9taXN0YWtlX3RhcmdldCI6Im1hdHJpeF90eXBlX21pc2NsYXNzaWZpY2F0aW9uIiwiaWZfd3JvbmdfdGhlbl9yZXZpZXciOiJkaWFnb25hbCB2cyBpZGVudGl0eSB2cyBzeW1tZXRyaWMifV19LHsiaWQiOiJ0cmFuc3Bvc2VfdW5kZXJzdGFuZGluZyIsImxhYmVsIjoiVHJhbnNwb3NlIHVuZGVyc3RhbmRpbmciLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJiNjFfcTMiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwidGFza190eXBlIjoiZm9ybXVsYV90cmlnZ2VyX2NoZWNrIiwic3RlbSI6IklmIFxcIChBXFwpIGlzIGEgXFwgKDIgXFx0aW1lcyAzXFwpIG1hdHJpeCwgd2hhdCBpcyB0aGUgb3JkZXIgb2YgXFwgKEFeVFxcKT8iLCJvcHRpb25zIjpbIkEuIFxcICgyIFxcdGltZXMgM1xcKSIsIkIuIFxcICgzIFxcdGltZXMgMlxcKSIsIkMuIFxcICgyIFxcdGltZXMgMlxcKSIsIkQuIFxcICgzIFxcdGltZXMgM1xcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRyYW5zcG9zaXRpb24gc3dhcHMgcm93cyBhbmQgY29sdW1ucywgc28gYSBcXCAoMiBcXHRpbWVzIDNcXCkgbWF0cml4IGJlY29tZXMgYSBcXCAoMyBcXHRpbWVzIDJcXCkgbWF0cml4LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRyYW5zcG9zZSBkb2VzIG5vdCBrZWVwIHRoZSBzYW1lIG9yZGVyIHVubGVzcyB0aGUgbWF0cml4IGlzIHNxdWFyZS4iLCJDIjoiVGhlcmUgaXMgbm8gcmVhc29uIGZvciB0aGUgcmVzdWx0IHRvIGJlY29tZSBzcXVhcmUgaGVyZS4iLCJEIjoiVGhlIHRyYW5zcG9zZSBvbmx5IHN3YXBzIGRpbWVuc2lvbnM7IGl0IGRvZXMgbm90IGNyZWF0ZSBhIHNxdWFyZSBtYXRyaXguIn0sImhpbnQiOiJTd2FwIHJvd3MgYW5kIGNvbHVtbnMuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwibmVlZHNfZGVtbyI6ZmFsc2UsImNvbW1vbl9taXN0YWtlX3RhcmdldCI6InRyYW5zcG9zZV9zaGFwZV9jb25mdXNpb24iLCJpZl93cm9uZ190aGVuX3JldmlldyI6InRyYW5zcG9zZSBkZWZpbml0aW9uIn0seyJpZCI6ImI2MV9xNCIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJ0YXNrX3R5cGUiOiJjb21tb25fdHJhcF9jaGVjayIsInN0ZW0iOiJBIHN0dWRlbnQgc2F5czogJ1Rha2luZyB0aGUgdHJhbnNwb3NlIGNoYW5nZXMgdGhlIHZhbHVlcyBpbiB0aGUgbWF0cml4LicgRXhwbGFpbiB3aHkgdGhpcyBpcyB3cm9uZy4iLCJpZGVhbF9hbnN3ZXIiOiJUcmFuc3Bvc2UgY2hhbmdlcyB3aGVyZSB0aGUgZW50cmllcyBhcmUgcGxhY2VkLCBub3QgdGhlaXIgdmFsdWVzLiBFYWNoIGVudHJ5IFxcIChhX3tpan1cXCkgbW92ZXMgdG8gcG9zaXRpb24gXFwgKGFfe2ppfVxcKSwgc28gdGhlIHZhbHVlcyBzdGF5IHRoZSBzYW1lIGJ1dCB0aGVpciByb3ctY29sdW1uIGxvY2F0aW9ucyBhcmUgc3dhcHBlZC4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IHNheSB0cmFuc3Bvc2Ugc3dhcHMgcG9zaXRpb25zIiwiTXVzdCBzYXkgdGhlIGVudHJ5IHZhbHVlcyB0aGVtc2VsdmVzIGRvIG5vdCBjaGFuZ2UiLCJNdXN0IG1lbnRpb24gcm93LWNvbHVtbiByZXZlcnNhbCBvciBcXCAoYV97aWp9XFwpIG1vdmluZyB0byBcXCAoYV97aml9XFwpIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCB1bmRlcnN0YW5kcyB0cmFuc3Bvc2Ugc3RydWN0dXJhbGx5IHJhdGhlciB0aGFuIGFzIGEgbXlzdGVyaW91cyBuZXcgb3BlcmF0aW9uLiIsImhpbnQiOiJBc2sgd2hhdCBoYXBwZW5zIHRvIHRoZSBsb2NhdGlvbiBvZiBcXCAoYV97MjN9XFwpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsIm5lZWRzX2RlbW8iOmZhbHNlLCJjb21tb25fbWlzdGFrZV90YXJnZXQiOiJ0cmFuc3Bvc2VfdmFsdWVfY29uZnVzaW9uIiwiaWZfd3JvbmdfdGhlbl9yZXZpZXciOiJ0cmFuc3Bvc2UgdmlzdWFsIGV4cGxhbmF0aW9uIn1dfSx7ImlkIjoibWF0cml4X2VxdWFsaXR5IiwibGFiZWwiOiJNYXRyaXggZXF1YWxpdHkiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImI2MV9xNSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJ0YXNrX3R5cGUiOiJjb21tb25fdHJhcF9jaGVjayIsInN0ZW0iOiJXaGljaCBzdGF0ZW1lbnQgYWJvdXQgbWF0cml4IGVxdWFsaXR5IGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBUd28gbWF0cmljZXMgYXJlIGVxdWFsIGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSBkaWFnb25hbCBlbnRyaWVzIiwiQi4gVHdvIG1hdHJpY2VzIGFyZSBlcXVhbCBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgb3JkZXIgb25seSIsIkMuIFR3byBtYXRyaWNlcyBhcmUgZXF1YWwgb25seSBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgb3JkZXIgYW5kIGFsbCBjb3JyZXNwb25kaW5nIGVudHJpZXMgYXJlIGVxdWFsIiwiRC4gVHdvIG1hdHJpY2VzIGFyZSBlcXVhbCBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgdHJhbnNwb3NlIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiTWF0cml4IGVxdWFsaXR5IGlzIHN0cmljdDogc2FtZSBzaXplIGFuZCBlbnRyeS1ieS1lbnRyeSBlcXVhbGl0eSBhcmUgYm90aCByZXF1aXJlZC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJNYXRjaGluZyBvbmx5IGRpYWdvbmFsIGVudHJpZXMgaXMgbm90IGVub3VnaC4iLCJCIjoiU2FtZSBvcmRlciBpcyBuZWNlc3NhcnkgYnV0IG5vdCBzdWZmaWNpZW50LiIsIkQiOiJIYXZpbmcgdGhlIHNhbWUgdHJhbnNwb3NlIGlzIG5vdCB0aGUgZGVmaW5pdGlvbiBiZWluZyB0ZXN0ZWQgaGVyZS4ifSwiaGludCI6IkVxdWFsaXR5IG1lYW5zIGZ1bGwgZW50cnktYnktZW50cnkgYWdyZWVtZW50LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsIm5lZWRzX2RlbW8iOmZhbHNlLCJjb21tb25fbWlzdGFrZV90YXJnZXQiOiJwYXJ0aWFsX21hdGNoX2VxdWFsaXR5X2Vycm9yIiwiaWZfd3JvbmdfdGhlbl9yZXZpZXciOiJtYXRyaXggZXF1YWxpdHkgY29uZGl0aW9uIn1dfSx7ImlkIjoid29ya2VkX2V4YW1wbGVfdHJhbnNmZXIiLCJsYWJlbCI6IlB1dHRpbmcgdGhlIGlkZWFzIHRvZ2V0aGVyIiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImI2MV9xNiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJ0YXNrX3R5cGUiOiJtaW5pX3RyYW5zZmVyX2NoZWNrIiwic3RlbSI6IkEgc3F1YXJlIG1hdHJpeCBoYXMgemVyb3MgZXZlcnl3aGVyZSBleGNlcHQgcG9zc2libHkgb24gdGhlIG1haW4gZGlhZ29uYWwuIFdoaWNoIG5hbWVkIG1hdHJpeCB0eXBlIGRvZXMgdGhpcyBkZXNjcmliZT8iLCJvcHRpb25zIjpbIkEuIFN5bW1ldHJpYyBtYXRyaXgiLCJCLiBJZGVudGl0eSBtYXRyaXgiLCJDLiBEaWFnb25hbCBtYXRyaXgiLCJELiBaZXJvIG1hdHJpeCJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IkEgZGlhZ29uYWwgbWF0cml4IGFsbG93cyBub256ZXJvIGVudHJpZXMgb25seSBvbiB0aGUgbWFpbiBkaWFnb25hbC4gSWRlbnRpdHkgYW5kIHplcm8gbWF0cmljZXMgYXJlIHNwZWNpYWwgY2FzZXMgb2YgZGlhZ29uYWwgbWF0cmljZXMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiQSBzeW1tZXRyaWMgbWF0cml4IG9ubHkgcmVxdWlyZXMgbWlycm9yIHN5bW1ldHJ5LCBub3QgemVybyBvZmYtZGlhZ29uYWwgZW50cmllcy4iLCJCIjoiSWRlbnRpdHkgaXMgbW9yZSBzcGVjaWZpYzogYWxsIGRpYWdvbmFsIGVudHJpZXMgbXVzdCBiZSAxLiIsIkQiOiJaZXJvIG1hdHJpeCBpcyBtb3JlIHNwZWNpZmljOiBldmVyeSBlbnRyeSBtdXN0IGJlIDAuIn0sImhpbnQiOiJBc2sgd2hpY2ggb3B0aW9uIGlzIHRoZSBicm9hZGVyIGNhdGVnb3J5LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsIm5lZWRzX2RlbW8iOmZhbHNlLCJjb21tb25fbWlzdGFrZV90YXJnZXQiOiJzcGVjaWFsX2Nhc2VfdnNfZ2VuZXJhbF9jYXNlX2NvbmZ1c2lvbiIsImlmX3dyb25nX3RoZW5fcmV2aWV3Ijoic3BlY2lhbCBtYXRyaXggdHlwZXMifV19XX0=" style="display:none;"></div>%%KC_END%%
