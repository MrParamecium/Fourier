# B.4 Cramer's Rule

> **Section Objective:** Learn how to use determinants to solve systems of simultaneous linear equations directly, one variable at a time.

Cramer's Rule is a shortcut for solving simultaneous linear equations using determinants. It applies to any system of **n linear equations in n unknowns**, and it works cleanly whenever the determinant of the coefficient matrix is nonzero. When that condition holds, you can isolate any single variable directly — no full elimination required.

This makes Cramer's Rule especially useful on exams: instead of row-reducing an entire system, you compute two determinants and divide. The method is compact, systematic, and easy to verify.

First we will identify the matrix form, then we will solve a small system step by step.

$$\begin{aligned} a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n &= y_1 \\ a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n &= y_2 \\ &\vdots \\ a_{n1}x_1 + a_{n2}x_2 + \cdots + a_{nn}x_n &= y_n \end{aligned}$$
*This is the general form of n simultaneous linear equations in n unknowns. Cramer's Rule starts from exactly this structure: each row is one equation, and every unknown x₁ through xₙ appears across the entire system — the coefficients aᵢⱼ collect into a square matrix that the rule will operate on.*

![Fig. B.11](/figures/page-023-fig__b_11-1.png)
*Fig. B.11 from the textbook illustrates an exponentially varying sinusoid — a reminder that the linear-system tools developed in this section underpin the analysis of signals whose behavior is governed by coupled equations.*

## 1. When Cramer's Rule Applies

### CONCEPT

Three conditions must all be true before you can use Cramer's Rule:

1. The system is **linear** (no products or powers of unknowns).
2. The number of equations **equals** the number of unknowns (square system).
3. The determinant of the coefficient matrix is **nonzero**: det(A) ≠ 0.

---

### EXAMPLE

**Qualifies:** The system `x + 2y = 5` and `3x - y = 4` has 2 equations and 2 unknowns, and its coefficient matrix has a nonzero determinant. Cramer's Rule applies.

**Does not qualify:** The system `x + y = 3` and `2x + 2y = 6` has a coefficient matrix with det = 0 (the second equation is just a multiple of the first). Cramer's Rule cannot be used.

---

### EXAM TIP

Always compute det(A) **first**. If it is zero, switch to elimination immediately — do not waste time setting up the Cramer ratios.

$$A\mathbf{x}=\mathbf{y}, \qquad x_i = \frac{\det(A_i)}{\det(A)} \;\; (\det(A) \neq 0)$$
*Here A is the coefficient matrix assembled from all the aᵢⱼ values, and x is the column vector of unknowns. To find the i-th unknown xᵢ, form the matrix Aᵢ by taking A and replacing its i-th column with the right-hand-side vector y, then divide det(Aᵢ) by det(A). Each unknown gets its own numerator matrix, but they all share the same denominator — which is why checking det(A) ≠ 0 first is non-negotiable.*

## 2. How to Use the Formula Step by Step

### PROCEDURE

1. **Build the coefficient matrix A** from the left-hand-side coefficients.
2. **Compute det(A).** If it is zero, stop — the rule does not apply.
3. **Replace one column** of A with the constants vector **y** to form Aᵢ.
4. **Compute det(Aᵢ).**
5. **Divide:** xᵢ = det(Aᵢ) / det(A).

Repeat steps 3–5 for each variable you need.

---

### WORKED EXAMPLE

Solve the system:

```
x  + 2y = 5
3x -  y = 4
```

**Step 1 — Coefficient matrix:**

$$A = \begin{bmatrix} 1 & 2 \\ 3 & -1 \end{bmatrix}$$

**Step 2 — det(A):**

$$\det(A) = (1)(-1) - (2)(3) = -1 - 6 = -7$$

**Step 3 & 4 — Solve for x** (replace column 1 with constants):

$$A_x = \begin{bmatrix} 5 & 2 \\ 4 & -1 \end{bmatrix}, \quad \det(A_x) = (5)(-1) - (2)(4) = -5 - 8 = -13$$

$$x = \frac{-13}{-7} = \frac{13}{7}$$

**Step 3 & 4 — Solve for y** (replace column 2 with constants):

$$A_y = \begin{bmatrix} 1 & 5 \\ 3 & 4 \end{bmatrix}, \quad \det(A_y) = (1)(4) - (5)(3) = 4 - 15 = -11$$

$$y = \frac{-11}{-7} = \frac{11}{7}$$

**Quick check — substitute back:**

- Equation 1: 13/7 + 2(11/7) = 13/7 + 22/7 = 35/7 = 5 ✓
- Equation 2: 3(13/7) − 11/7 = 39/7 − 11/7 = 28/7 = 4 ✓

Both equations are satisfied.

> ⚠️ Chart render error: exit 1

Think of the coefficient matrix as a **template with labeled slots**. Each column is a slot reserved for one variable. Cramer's Rule asks: *"If I slide the output values into this variable's slot, what scaling factor makes the whole system fit?"* The determinant ratio answers exactly that — you are measuring how much the outputs "pull" in the direction of each variable, relative to the system's overall geometry.

---
**📌 Key Takeaways**
- Cramer's Rule applies only to square systems where det(A) ≠ 0 — always verify this first.
- Each unknown is found directly: xᵢ = det(Aᵢ) / det(A), where Aᵢ replaces column i with the constants.
- Always substitute answers back into the original equations to catch determinant arithmetic errors.

*In the next section we will use this result in a larger problem setting.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImtwX2FwcGxpY2FiaWxpdHkiLCJsYWJlbCI6IldoZW4gQ3JhbWVyJ3MgUnVsZSBjYW4gYmUgdXNlZCIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwX2FwcF9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggY29uZGl0aW9uIG11c3QgaG9sZCBiZWZvcmUgQ3JhbWVyJ3MgUnVsZSBjYW4gYmUgYXBwbGllZCB0byBhIHN5c3RlbSBvZiBsaW5lYXIgZXF1YXRpb25zPyIsIm9wdGlvbnMiOlsiQS4gVGhlIHN5c3RlbSBtYXkgaGF2ZSBtb3JlIHVua25vd25zIHRoYW4gZXF1YXRpb25zIGFzIGxvbmcgYXMgdGhlIGNvbnN0YW50cyBhcmUgbm9uemVybyIsIkIuIFRoZSBjb2VmZmljaWVudCBkZXRlcm1pbmFudCBtdXN0IGJlIG5vbnplcm8iLCJDLiBUaGUgcmlnaHQtaGFuZC1zaWRlIGNvbnN0YW50cyBtdXN0IGFsbCBiZSBwb3NpdGl2ZSIsIkQuIFRoZSBjb2VmZmljaWVudCBtYXRyaXggbXVzdCBiZSBkaWFnb25hbCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkNyYW1lcidzIFJ1bGUgcmVxdWlyZXMgYSBzcXVhcmUgY29lZmZpY2llbnQgbWF0cml4IHdpdGggbm9uemVybyBkZXRlcm1pbmFudCBzbyBlYWNoIHZhcmlhYmxlIGNhbiBiZSBleHByZXNzZWQgYXMgYSBkZXRlcm1pbmFudCByYXRpby4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJDcmFtZXIncyBSdWxlIGlzIG5vdCBmb3Igbm9uc3F1YXJlIHN5c3RlbXMuIiwiQyI6IlRoZSBzaWducyBvZiB0aGUgY29uc3RhbnRzIGRvIG5vdCBkZXRlcm1pbmUgd2hldGhlciB0aGUgcnVsZSBhcHBsaWVzLiIsIkQiOiJBIGRpYWdvbmFsIG1hdHJpeCBpcyBub3QgcmVxdWlyZWQ7IGFueSBzcXVhcmUgbWF0cml4IHdpdGggbm9uemVybyBkZXRlcm1pbmFudCB3b3Jrcy4ifSwiaGludCI6IlRoaW5rIGFib3V0IHdoYXQgYXBwZWFycyBpbiB0aGUgZGVub21pbmF0b3Igb2YgdGhlIGZvcm11bGEuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwX2FwcF9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBzdHVkZW50IHdhbnRzIHRvIHVzZSBDcmFtZXIncyBSdWxlIG9uIGEgMy1lcXVhdGlvbiBzeXN0ZW0gaW4gMyB1bmtub3ducywgYnV0IGZpbmRzIHRoYXQgZGV0KEEpID0gMC4gV2hhdCBpcyB0aGUgYmVzdCBleGFtIGNvbmNsdXNpb24/Iiwib3B0aW9ucyI6WyJBLiBDb250aW51ZSBub3JtYWxseSBiZWNhdXNlIHRoZSBydWxlIHN0aWxsIGdpdmVzIHVuaXF1ZSBhbnN3ZXJzIiwiQi4gT25seSBvbmUgdmFyaWFibGUgY2FuIGJlIGZvdW5kIiwiQy4gQ3JhbWVyJ3MgUnVsZSBkb2VzIG5vdCBhcHBseSBiZWNhdXNlIGRpdmlzaW9uIGJ5IGRldChBKSB3b3VsZCBmYWlsIiwiRC4gUmVwbGFjZSB0aGUgY29uc3RhbnRzIHdpdGggemVyb3MgYW5kIHRyeSBhZ2FpbiJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IklmIGRldChBKSA9IDAsIHRoZSBkZW5vbWluYXRvciBpbiBDcmFtZXIncyBSdWxlIGlzIHplcm8sIHNvIHRoZSBtZXRob2QgY2Fubm90IHByb2R1Y2UgYSB1bmlxdWUgc29sdXRpb24gdGhhdCB3YXkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiQSB6ZXJvIGRldGVybWluYW50IGJsb2NrcyB0aGUgcnVsZS4iLCJCIjoiVGhlIGlzc3VlIGFmZmVjdHMgZXZlcnkgdmFyaWFibGUgYmVjYXVzZSB0aGUgc2FtZSBkZW5vbWluYXRvciBhcHBlYXJzIGluIGVhY2ggZm9ybXVsYS4iLCJEIjoiQ2hhbmdpbmcgdGhlIHByb2JsZW0gaXMgbm90IGEgdmFsaWQgc29sdXRpb24gbWV0aG9kLiJ9LCJoaW50IjoiQ2hlY2sgdGhlIGRlbm9taW5hdG9yIHNoYXJlZCBieSBhbGwgQ3JhbWVyIHJhdGlvcy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImtwX2Zvcm11bGFfc3RydWN0dXJlIiwibGFiZWwiOiJNZWFuaW5nIG9mIEEgYW5kIEFfaSBpbiB0aGUgZm9ybXVsYSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3BfZm9ybV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSW4gQ3JhbWVyJ3MgUnVsZSwgd2hhdCBpcyB0aGUgbWF0cml4IEFfeCBmb3IgYSAyLWJ5LTIgc3lzdGVtPyIsIm9wdGlvbnMiOlsiQS4gVGhlIG1hdHJpeCBmb3JtZWQgYnkgcmVwbGFjaW5nIHRoZSB4LWNvbHVtbiBvZiB0aGUgY29lZmZpY2llbnQgbWF0cml4IHdpdGggdGhlIGNvbnN0YW50cyBjb2x1bW4iLCJCLiBUaGUgbWF0cml4IGZvcm1lZCBieSByZXBsYWNpbmcgdGhlIGNvbnN0YW50cyBjb2x1bW4gd2l0aCB0aGUgeC1jb2x1bW4iLCJDLiBUaGUgdHJhbnNwb3NlIG9mIHRoZSBjb2VmZmljaWVudCBtYXRyaXgiLCJELiBUaGUgY29lZmZpY2llbnQgbWF0cml4IHdpdGggaXRzIHJvd3Mgc3dhcHBlZCJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlRvIHNvbHZlIGZvciB4LCByZXBsYWNlIHRoZSB4LWNvbHVtbiBpbiB0aGUgY29lZmZpY2llbnQgbWF0cml4IGJ5IHRoZSByaWdodC1oYW5kLXNpZGUgY29uc3RhbnRzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoZSByZXBsYWNlbWVudCBnb2VzIGludG8gdGhlIGNvZWZmaWNpZW50IG1hdHJpeCwgbm90IHRoZSBvdGhlciB3YXkgYXJvdW5kLiIsIkMiOiJUcmFuc3Bvc2UgaXMgdW5yZWxhdGVkIHRvIENyYW1lcidzIFJ1bGUgaGVyZS4iLCJEIjoiUm93IHN3YXBwaW5nIGNoYW5nZXMgdGhlIGRldGVybWluYW50IHNpZ24gYW5kIGlzIG5vdCB0aGUgZGVmaW5pdGlvbiBvZiBBX3guIn0sImhpbnQiOiJUaGUgcmVwbGFjZWQgY29sdW1uIGNvcnJlc3BvbmRzIHRvIHRoZSB2YXJpYWJsZSB5b3UgYXJlIHNvbHZpbmcgZm9yLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJtYXRyaXggY29sdW1uIHJlcGxhY2VtZW50IHNjaGVtYXRpYyIsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6ImtwX2NvbXB1dGVfMngyIiwibGFiZWwiOiJTb2x2aW5nIGEgMi1ieS0yIHN5c3RlbSB3aXRoIENyYW1lcidzIFJ1bGUiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcF9jb21wX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJVc2UgQ3JhbWVyJ3MgUnVsZSB0byBzb2x2ZSB4ICsgMnkgPSA1IGFuZCAzeCAtIHkgPSA0LiBXaGF0IGlzIHg/Iiwib3B0aW9ucyI6WyJBLiAxIiwiQi4gMTMvNyIsIkMuIDcvNSIsIkQuIDIiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgY29lZmZpY2llbnQgbWF0cml4IGlzIEEgPSBbWzEsIDJdLCBbMywgLTFdXSwgc28gZGV0KEEpID0gKDEpKC0xKSAtICgyKSgzKSA9IC03LiBSZXBsYWNpbmcgdGhlIHgtY29sdW1uIGdpdmVzIEFfeCA9IFtbNSwgMl0sIFs0LCAtMV1dIHdpdGggZGV0KEFfeCkgPSAoNSkoLTEpIC0gKDIpKDQpID0gLTEzLiBUaHVzIHggPSBkZXQoQV94KSAvIGRldChBKSA9ICgtMTMpIC8gKC03KSA9IDEzLzcuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBkb2VzIG5vdCBzYXRpc2Z5IGJvdGggZXF1YXRpb25zLiIsIkMiOiJUaGlzIGNvbWVzIGZyb20gYW4gaW5jb3JyZWN0IGRldGVybWluYW50IG9yIGFyaXRobWV0aWMgc2xpcC4iLCJEIjoiU3Vic3RpdHV0aW5nIHggPSAyIGdpdmVzIGluY29uc2lzdGVudCB5LXZhbHVlcy4ifSwiaGludCI6IkNvbXB1dGUgZGV0KEEpIGZpcnN0LCB0aGVuIHJlcGxhY2Ugb25seSB0aGUgeC1jb2x1bW4uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwX2NvbXBfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciB0aGUgc2FtZSBzeXN0ZW0geCArIDJ5ID0gNSBhbmQgM3ggLSB5ID0gNCwgd2hhdCBpcyB5PyIsIm9wdGlvbnMiOlsiQS4gMTEvNyIsIkIuIDkvNyIsIkMuIDEiLCJELiAtMTEvNyJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlJlcGxhY2luZyB0aGUgeS1jb2x1bW4gZ2l2ZXMgQV95ID0gW1sxLCA1XSwgWzMsIDRdXSB3aXRoIGRldChBX3kpID0gKDEpKDQpIC0gKDUpKDMpID0gNCAtIDE1ID0gLTExLiBTaW5jZSBkZXQoQSkgPSAtNywgeSA9ICgtMTEpIC8gKC03KSA9IDExLzcuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhpcyBjb21lcyBmcm9tIGEgc2lnbiBvciBzdWJ0cmFjdGlvbiBtaXN0YWtlIGluIHRoZSBkZXRlcm1pbmFudC4iLCJDIjoiVGhpcyB2YWx1ZSBkb2VzIG5vdCBzYXRpc2Z5IGJvdGggZXF1YXRpb25zLiIsIkQiOiJUaGUgc2lnbiBpcyB3cm9uZyBiZWNhdXNlIGJvdGggbnVtZXJhdG9yIGFuZCBkZW5vbWluYXRvciBhcmUgbmVnYXRpdmUsIG1ha2luZyB0aGUgcmVzdWx0IHBvc2l0aXZlLiJ9LCJoaW50IjoiQmUgY2FyZWZ1bCB3aXRoIHRoZSAyLWJ5LTIgZGV0ZXJtaW5hbnQgZm9ybXVsYTogYWQgLSBiYy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcF9jb21wX3EzIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJXaHkgaXMgaXQgYSBnb29kIGV4YW0gaGFiaXQgdG8gc3Vic3RpdHV0ZSB5b3VyIENyYW1lcidzIFJ1bGUgYW5zd2VycyBiYWNrIGludG8gdGhlIG9yaWdpbmFsIGVxdWF0aW9ucz8iLCJpZGVhbF9hbnN3ZXIiOiJCZWNhdXNlIGRldGVybWluYW50IGFyaXRobWV0aWMgaXMgZWFzeSB0byBtaXMtc2lnbiBvciBtaXMtc3VidHJhY3QsIGFuZCBzdWJzdGl0dXRpb24gcXVpY2tseSBjb25maXJtcyB3aGV0aGVyIGJvdGggZXF1YXRpb25zIGFyZSBzYXRpc2ZpZWQuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBtZW50aW9uIGNoZWNraW5nIGZvciBhcml0aG1ldGljIG9yIHNpZ24gbWlzdGFrZXMiLCJNdXN0IG1lbnRpb24gdmVyaWZ5aW5nIHRoZSBvcmlnaW5hbCBlcXVhdGlvbnMgYXJlIHNhdGlzZmllZCIsIk1heSBub3RlIHRoYXQgdGhpcyBpcyBlc3BlY2lhbGx5IHVzZWZ1bCB1bmRlciBleGFtIHByZXNzdXJlIl0sImV4cGxhbmF0aW9uIjoiVGhpcyB0ZXN0cyB3aGV0aGVyIHRoZSBzdHVkZW50IHVuZGVyc3RhbmRzIENyYW1lcidzIFJ1bGUgYXMgYSBwcm9jZWR1cmUgdGhhdCBzaG91bGQgYmUgdmVyaWZpZWQsIG5vdCBqdXN0IG1lbW9yaXplZC4iLCJoaW50IjoiVGhpbmsgYWJvdXQgdGhlIG1vc3QgY29tbW9uIG1pc3Rha2Ugd2hlbiBjb21wdXRpbmcgMi1ieS0yIGRldGVybWluYW50cy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
