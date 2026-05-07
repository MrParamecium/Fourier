%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImdlbmVyYXRlZF9pbWFnZSIsInJhdGlvbmFsZSI6IkIuNi0xIGlzIG5vdCBhIGhlYXZ5LWNvbXB1dGF0aW9uIHNlY3Rpb24uIEl0IGlzIGFib3V0IGJ1aWxkaW5nIGZhc3QgcmVjb2duaXRpb24gYW5kIHByZXZlbnRpbmcgZWxlbWVudGFyeSBtaXN0YWtlcyBiZWZvcmUgbWF0cml4IGFsZ2VicmEuIENsZWFuIHN0YXRpYyB2aXN1YWxzIGFyZSBtb3JlIHVzZWZ1bCB0aGFuIGRlbnNlIHNvdXJjZSBwYWdlcyBoZXJlLiIsImNyYW0iOiJVc2UgdGhlIHZpc3VhbHMgdG8gbWVtb3JpemUgdGhlIHBhdHRlcm5zIHF1aWNrbHk6IHJvdy1jb2x1bW4gaW5kZXhpbmcsIHNwZWNpYWwgbWF0cml4IHR5cGVzLCBhbmQgdHJhbnNwb3NlIG1vdmVtZW50LiIsInN0YW5kYXJkIjoiVXNlIHZpc3VhbHMgdG8gbWFrZSB0aGUgZm91ciBjb3JlIGlkZWFzIGltbWVkaWF0ZWx5IGNsZWFyOiBlbnRyeSByZWFkaW5nLCBtYXRyaXggcGF0dGVybnMsIGVxdWFsaXR5LCBhbmQgdHJhbnNwb3NlLiIsInRvcF9zY29yZSI6IlVzZSB2aXN1YWxzIHRvIGV4cG9zZSBzdWJ0bGUgdHJhcHMgZmFzdDogcm93LWNvbHVtbiByZXZlcnNhbCwgaWRlbnRpdHkgdnMgZGlhZ29uYWwsIGFuZCB0aGUgZmFjdCB0aGF0IHRyYW5zcG9zZSBjaGFuZ2VzIHBvc2l0aW9ucyBub3QgdmFsdWVzLiJ9" style="display:none;"></div>%%KC_END%%
# B.6-1 Some Definitions and Properties

> **Section Objective:** Build the matrix-reading reflex you need before matrix algebra: read entries correctly, recognize standard matrix patterns fast, and avoid the most common false moves.

This section is not about hard computation yet.  
It is about learning how to **look at a matrix and not get lost**.

By the end of this section, you should be able to do four things quickly:

1. read an entry like \(a_{23}\) correctly
2. identify diagonal, identity, zero, and symmetric matrices
3. understand what transpose changes
4. reject false matrix equality immediately

That is the foundation for everything in B.6-2. If this section feels clear, matrix algebra later will feel much lighter.

## 1. Entry Reading: The Rule You Must Not Get Wrong

For a matrix

$$
A = [a_{ij}]
$$

the symbol \(a_{ij}\) means:

- first index \(i\) = **row**
- second index \(j\) = **column**

So:

- \(a_{23}\) means row 2, column 3
- \(a_{12}\) means row 1, column 2
- \(a_{31}\) means row 3, column 1

This sounds basic, but it is one of the easiest ways to lose marks.

### One-line memory trick

Read the subscript as:

**row first, column second**

Always.

If \(A\) is a \(3 \times 4\) matrix:

- \(a_{34}\) exists
- \(a_{43}\) does not exist

because there is no row 4.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgdmlzdWFsIHRvIG1lbW9yaXplIHRoZSBydWxlIGluc3RhbnRseTogZmlyc3QgaW5kZXggPSByb3csIHNlY29uZCBpbmRleCA9IGNvbHVtbi4iLCJzdGFuZGFyZCI6IlVzZSB0aGlzIHZpc3VhbCB0byBtYWtlIHRoZSBub3RhdGlvbiBhX2lqIGZlZWwgY29uY3JldGUgaW5zdGVhZCBvZiBhYnN0cmFjdC4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhpcyB2aXN1YWwgdG8gcHJldmVudCB0aGUgbW9zdCBjb21tb24gYmFzaWMgbWlzdGFrZTogcmVhZGluZyB0aGUgdHdvIGluZGljZXMgYmFja3dhcmRzLiJ9" style="display:none;"></div>%%KC_END%%
*🎨 Entry reading rule: \(a_{ij}\) always means row first, column second. Here \(a_{23}\) points to row 2, column 3.*
![Illustration](/generated/gptimage2-1777739312720-4626.png)

## 2. The Matrix Patterns You Should Recognize on Sight

At this stage, a lot of matrix work is really pattern recognition.

### Diagonal matrix

Only the main diagonal may contain nonzero entries.

That means:

- diagonal entries can be anything
- every off-diagonal entry must be 0

### Identity matrix

An identity matrix is a special diagonal matrix:

- diagonal entries are all 1
- off-diagonal entries are all 0

So for example:

$$
I_3 =
\begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{bmatrix}
$$

This is clearer in LaTeX than in a decorative picture, because the idea is purely structural.

### Zero matrix

Every entry is 0.

### Symmetric matrix

A matrix is symmetric if

$$
a_{ij} = a_{ji}
$$

for all \(i,j\).

That means the matrix mirrors across the main diagonal.

Important:

- a symmetric matrix must be square
- every diagonal matrix is symmetric
- not every symmetric matrix is diagonal

### 5-second recognition method

When you see a matrix, ask:

1. Is it square?
2. Are all off-diagonal entries zero?
3. If yes, are the diagonal entries all 1?
4. If not diagonal, do entries mirror across the main diagonal?

That gives you a very fast decision path.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="classification_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgdmlzdWFsIGFzIGEgcXVpY2sgcmVjb2duaXRpb24gc2hlZXQ6IGRpYWdvbmFsLCBpZGVudGl0eSwgemVybywgYW5kIHN5bW1ldHJpYy4iLCJzdGFuZGFyZCI6IlVzZSB0aGlzIHZpc3VhbCB0byBtYWtlIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIHRoZSBzdGFuZGFyZCBtYXRyaXggdHlwZXMgZmVlbCBpbW1lZGlhdGUuIiwidG9wX3Njb3JlIjoiVXNlIHRoaXMgdmlzdWFsIHRvIHN0b3AgbWlzY2xhc3NpZmljYXRpb24sIGVzcGVjaWFsbHkgZGlhZ29uYWwgdnMgaWRlbnRpdHkgYW5kIGRpYWdvbmFsIHZzIHN5bW1ldHJpYy4ifQ==" style="display:none;"></div>%%KC_END%%
*🎨 Standard matrix patterns at a glance: diagonal, identity, zero, and symmetric. Use the visual to classify quickly before calculating anything.*
![Illustration](/generated/gptimage2-1777739488608-7556.png)

## 3. Matrix Equality: A Strict Rule

Two matrices are equal only if:

1. they have the same order
2. every corresponding entry is equal

So the definition is

$$
A = B \iff a_{ij} = b_{ij} \text{ for all } i,j
$$

This means:

- same size is necessary
- same size is **not enough**
- one wrong entry is enough to break equality

### Fast exam reflex

Check the size first.

If the two matrices do not have the same order, stop there: they are not equal.

Only if the sizes match should you compare entries.

## 4. Transpose: What Changes and What Does Not

The transpose of \(A\) is written \(A^T\).

Its job is simple:

- rows become columns
- columns become rows

Formally,

$$
A^T = [a_{ji}]
$$

So the entry at row \(i\), column \(j\) moves to row \(j\), column \(i\).

### What transpose changes

- the position of entries
- the order of the matrix

### What transpose does not change

- the values themselves

If \(A\) is \(m \times n\), then \(A^T\) is \(n \times m\).

Also,

$$
(A^T)^T = A
$$

Transpose twice and you return to the original matrix.

## 5. Worked Example

Let

$$
A =
\begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6
\end{bmatrix}
$$

### Step 1: Read the order

\(A\) has 2 rows and 3 columns, so \(A\) is a \(2 \times 3\) matrix.

### Step 2: Classify it

It is not square, so it is not:

- diagonal
- identity
- symmetric

It is just a general rectangular matrix.

### Step 3: Transpose it

$$
A^T =
\begin{bmatrix}
1 & 4 \\
2 & 5 \\
3 & 6
\end{bmatrix}
$$

Now the size is \(3 \times 2\).

The easiest way to read the change is:

- row 1 of \(A\) becomes column 1 of \(A^T\)
- row 2 of \(A\) becomes column 2 of \(A^T\)

Notice that the numbers themselves did not change.  
Only their positions changed.

### Step 4: Equality check

Can \(A = A^T\)?

No.

Why not?

Because:

- \(A\) is \(2 \times 3\)
- \(A^T\) is \(3 \times 2\)

The sizes are different, so equality is impossible immediately.

## 6. The Reflex You Want Before Moving On

Before doing any matrix algebra, your reflex should be:

1. read the order
2. identify the matrix pattern
3. ask whether transpose changes the shape
4. reject equality immediately if the orders differ

That reflex is the bridge into B.6-2.

---
**📌 Key Takeaways**
- \(a_{ij}\) always means row first, column second.
- Diagonal, identity, zero, and symmetric matrices are pattern-recognition ideas.
- Matrix equality needs same order and same entries.
- Transpose swaps positions, not values.

*Once these ideas are automatic, matrix algebra becomes much easier because you stop making basic structural mistakes.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6Im1hdHJpeF9lbnRyeV9yZWFkaW5nIiwibGFiZWwiOiJFbnRyeSByZWFkaW5nIGFuZCBvcmRlciIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImI2MV92MjJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIFxcKEFcXCkgaXMgYSBcXCgzIFxcdGltZXMgNFxcKSBtYXRyaXgsIHdoYXQgZG9lcyBcXChhX3syM31cXCkgbWVhbj8iLCJvcHRpb25zIjpbIkEuIFJvdyAzLCBjb2x1bW4gMiIsIkIuIFJvdyAyLCBjb2x1bW4gMyIsIkMuIENvbHVtbiAyLCByb3cgMyIsIkQuIFRoZSAyM3JkIGVudHJ5IG9mIFxcKEFcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgZmlyc3QgaW5kZXggZ2l2ZXMgdGhlIHJvdyBhbmQgdGhlIHNlY29uZCBpbmRleCBnaXZlcyB0aGUgY29sdW1uLCBzbyBcXChhX3syM31cXCkgbWVhbnMgcm93IDIsIGNvbHVtbiAzLiIsImhpbnQiOiJSZWFkIHRoZSBzdWJzY3JpcHQgYXMgcm93IGZpcnN0LCBjb2x1bW4gc2Vjb25kLiJ9XX0seyJpZCI6Im1hdHJpeF90eXBlX3JlY29nbml0aW9uIiwibGFiZWwiOiJSZWNvZ25pemluZyBzdGFuZGFyZCBtYXRyaXggdHlwZXMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImI2MV92MjJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHN0YXRlbWVudCBhYm91dCBhbiBpZGVudGl0eSBtYXRyaXggaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIEl0IG1heSBoYXZlIGFueSBkaWFnb25hbCBudW1iZXJzIiwiQi4gSXQgaXMgYSBkaWFnb25hbCBtYXRyaXggd2l0aCAxcyBvbiB0aGUgbWFpbiBkaWFnb25hbCIsIkMuIEl0IG1lYW5zIGV2ZXJ5IGVudHJ5IGlzIDAiLCJELiBJdCBtZWFucyB0aGUgbWF0cml4IG11c3QgYmUgbm9uc3F1YXJlIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiQW4gaWRlbnRpdHkgbWF0cml4IGlzIGEgc3BlY2lhbCBkaWFnb25hbCBtYXRyaXggd2l0aCAxcyBvbiB0aGUgbWFpbiBkaWFnb25hbCBhbmQgMHMgZWxzZXdoZXJlLiIsImhpbnQiOiJUaGluayBvZiB0aGUgc21hbGxlc3QgcG9zc2libGUgYXJyb3ctc3RyYWlnaHQgcGF0dGVybi4ifSx7ImlkIjoiYjYxX3YyMl9xMyIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggY29uZGl0aW9uIGRlc2NyaWJlcyBhIHN5bW1ldHJpYyBtYXRyaXggY29ycmVjdGx5PyIsIm9wdGlvbnMiOlsiQS4gXFxhX3tpan0gPSBhX3tqaX1cXCIsIkIuIEFsbCBkaWFnb25hbCBlbnRyaWVzIGFyZSAxIiwiQy4gQWxsIG9mZi1kaWFnb25hbCBlbnRyaWVzIG11c3QgYmUgMCIsIkQuIFRoZSBtYXRyaXggaGFzIG1vcmUgY29sdW1ucyB0aGFuIHJvd3MiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJTeW1tZXRyaWMgbWVhbnMgZW50cmllcyBtaXJyb3IgYWNyb3NzIHRoZSBtYWluIGRpYWdvbmFsLCBzbyBcXChhX3tpan0gPSBhX3tqaX1cXCkuIiwiaGludCI6IlRoaW5rIGFib3V0IG1pcnJvciByZWZsZWN0aW9uIGFjcm9zcyB0aGUgZGlhZ29uYWwuIn1dfSx7ImlkIjoibWF0cml4X2VxdWFsaXR5IiwibGFiZWwiOiJNYXRyaXggZXF1YWxpdHkiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImI2MV92MjJfcTQiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoZW4gYXJlIHR3byBtYXRyaWNlcyBlcXVhbD8iLCJvcHRpb25zIjpbIkEuIFdoZW4gdGhleSBoYXZlIHRoZSBzYW1lIG9yZGVyIG9ubHkiLCJCLiBXaGVuIHRoZXkgaGF2ZSB0aGUgc2FtZSBvcmRlciBhbmQgYWxsIGNvcnJlc3BvbmRpbmcgZW50cmllcyBtYXRjaCIsIkMuIFdoZW4gdGhleSBoYXZlIHRoZSBzYW1lIGRpYWdvbmFsIGVudHJpZXMiLCJELiBXaGVuIHRoZXkgaGF2ZSB0aGUgc2FtZSB0cmFuc3Bvc2UiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJNYXRyaXggZXF1YWxpdHkgaXMgYSBzdHJpY3Qgc2FtZS1zaXplIHBsdXMgc2FtZS1lbnRyeSBydWxlLiIsImhpbnQiOiJTYW1lIHNpemUgY29tZXMgZmlyc3QsIGJ1dCBpdCBpcyBub3QgdGhlIHdob2xlIHN0b3J5LiJ9XX0seyJpZCI6InRyYW5zcG9zZV91bmRlcnN0YW5kaW5nIiwibGFiZWwiOiJUcmFuc3Bvc2UiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJiNjFfdjIyX3E1IiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJZiBcXChBXFwpIGlzIGEgXFwoMiBcXHRpbWVzIDNcXCkgbWF0cml4LCB3aGF0IGlzIHRoZSBvcmRlciBvZiBcXChBXlRcXCk/Iiwib3B0aW9ucyI6WyJBLiBcXCgyIFxcdGltZXMgM1xcKSIsIkIuIFxcKDMgXFx0aW1lcyAyXFwpIiwiQy4gXFwoMiBcXHRpbWVzIDJcXCkiLCJELiBcXCgzIFxcdGltZXMgM1xcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRyYW5zcG9zZSBzd2FwcyByb3dzIGFuZCBjb2x1bW5zLCBzbyBcXChBXlRcXCkgY2hhbmdlcyBcXCgyIFxcdGltZXMgM1xcKSBpbnRvIFxcKDMgXFx0aW1lcyAyXFwpLiIsImhpbnQiOiJSb3dzIGJlY29tZSBjb2x1bW5zLiJ9LHsiaWQiOiJiNjFfdjIyX3E2IiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJXaHkgZG9lcyB0cmFuc3Bvc2Ugbm90IGNoYW5nZSB0aGUgdmFsdWVzIG9mIHRoZSBtYXRyaXg/IiwiaWRlYWxfYW5zd2VyIjoiVHJhbnNwb3NlIG9ubHkgc3dhcHMgd2hlcmUgZW50cmllcyBhcmUgcGxhY2VkOiBlYWNoIFxcKGFfe2lqfVxcKSBtb3ZlcyB0byBcXChhX3tqaX1cXCkuIFRoZSBudW1iZXJzIHRoZW1zZWx2ZXMgZG8gbm90IGNoYW5nZSAtIG9ubHkgdGhlaXIgcG9zaXRpb25zIGRvLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3Qgc2F5IHBvc2l0aW9ucyBjaGFuZ2UiLCJNdXN0IHNheSB2YWx1ZXMgZG8gbm90IGNoYW5nZSIsIk11c3QgbWVudGlvbiBcXChhX3tpan1cXCkgbW92aW5nIHRvIFxcKGFfe2ppfVxcKSJdLCJoaW50IjoiRm9jdXMgb24gd2hlcmUgdGhlIGVudHJ5IGdvZXMsIG5vdCB3aGF0IG51bWJlciBpdCBpcy4ifV19XX0=" style="display:none;"></div>%%KC_END%%
