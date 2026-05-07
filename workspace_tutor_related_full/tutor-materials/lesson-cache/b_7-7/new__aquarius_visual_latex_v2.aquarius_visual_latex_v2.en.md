%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImdlbmVyYXRlZF9pbWFnZSIsInJhdGlvbmFsZSI6IlRoZSBPQ1IgcGFnZSBoYXMgbm8gdGV4dGJvb2sgZmlndXJlLCBhbmQgdGhpcyBNQVRMQUItZm9jdXNlZCBzZWN0aW9uIGlzIGJlc3Qgc3VwcG9ydGVkIGJ5IGEgY29tcGFjdCBjdXN0b20gaW5wdXQtb3V0cHV0IGRpYWdyYW0gc2hvd2luZyBob3cgQiBhbmQgQSBlbnRlciByZXNpZHVlIGFuZCBob3cgUiwgUCwgYW5kIEsgY29tZSBvdXQuIEEgV2lraXBlZGlhLXN0eWxlIHJlZmVyZW5jZSBpbWFnZSBpcyB1bmxpa2VseSB0byB0ZWFjaCB0aGUgTUFUTEFCIGNvbW1hbmQgc3RydWN0dXJlIGNsZWFubHkuIExhVGVYIGJsb2NrcyB3aWxsIGNhcnJ5IHRoZSBmb3JtdWxhczsgb25lIGdlbmVyYXRlZCBkaWFncmFtIHdpbGwgY2FycnkgdGhlIHdvcmtmbG93IHJlY29nbml0aW9uLiIsImNyYW0iOiJVc2UgdGhlIGRpYWdyYW0gdG8gbWVtb3JpemUgdGhlIGNvbW1hbmQgcGF0dGVybiBhbmQgd2hhdCBlYWNoIG91dHB1dCB2ZWN0b3IgbWVhbnMuIiwic3RhbmRhcmQiOiJVc2UgdGhlIGRpYWdyYW0gd2l0aCBvbmUgcmVwcmVzZW50YXRpdmUgZXhhbXBsZSBzbyBzdHVkZW50cyBjYW4gY29ubmVjdCBjb2VmZmljaWVudHMsIHJvb3RzLCByZXNpZHVlcywgYW5kIGRpcmVjdCB0ZXJtcy4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhlIGRpYWdyYW0gdG8gY2F0Y2ggc3VidGxlIG1pc3Rha2VzOiBjb2VmZmljaWVudCBvcmRlciwgcmVwZWF0ZWQtcm9vdCBvcmRlcmluZywgYW5kIHdoZW4gSyBpcyBub25lbXB0eS4ifQ==" style="display:none;"></div>%%KC_END%%
# B.7-7 Partial Fraction Expansions with MATLAB residue

> **Section Objective:** Learn how MATLAB computes partial fraction expansions using the residue command.

---

## Concepts In This Section

- Rational function setup
- residue command syntax
- Coefficient-vector order
- Outputs R, P, and K
- Repeated roots
- Improper rational functions

## 1. The Rational Function MATLAB Is Decomposing

A **rational function** is one polynomial divided by another. MATLAB does not receive a symbolic expression — it receives two **coefficient vectors**: one for the numerator and one for the denominator.

For example, given \(F(x) = \dfrac{2x+5}{x^2+3x+2}\):

- Numerator coefficients: \([2,\, 5]\)
- Denominator coefficients: \([1,\, 3,\, 2]\)

### EXAM NOTE

Coefficients must be listed from the **highest power down to the constant term**. If a power is missing, its coefficient is **zero** and must still be included.

## 2. The residue command: inputs and outputs

\(B(x)\) is the numerator polynomial and \(A(x)\) is the denominator polynomial. Use this form whenever a problem asks for a partial fraction expansion of a rational function.

**Common misuse:** Entering coefficients in increasing powers (constant first) instead of descending powers (highest power first). MATLAB always reads the leftmost entry as the coefficient of the highest power.

$$F(x) = \frac{B(x)}{A(x)}$$

## 3. Reading R and P as a partial fraction expansion

MATLAB's `residue` command takes two coefficient vectors — \(B\) for the numerator and \(A\) for the denominator — and returns three outputs:

| Output | Meaning |
|--------|---------|
| \(R\) | Partial-fraction coefficients (residues) |
| \(P\) | Corresponding roots or poles |
| \(K\) | Direct polynomial terms (nonempty only when the function is not proper) |

The exact command syntax is:

```
[R,P,K] = residue(B,A)
```

### EXAM TRIGGER

If a problem gives polynomial coefficients and asks for partial fractions, `residue` is the direct shortcut. Know what each output vector represents before interpreting results.

## 4. Repeated roots and direct terms

\(B\) and \(A\) are the **input** coefficient vectors (numerator and denominator, respectively). \(R\), \(P\), and \(K\) are the **outputs**.

- \(R\): the residue (coefficient) for each partial fraction term
- \(P\): the pole location for each term — **not** the power
- \(K\): direct polynomial terms, present only when the rational function is improper

**Common misuse:** Thinking \(P\) stores powers of the denominator. It stores **root or pole values** (locations on the number line or complex plane).

$$\texttt{[R,P,K] = residue(B,A)}$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiTWVtb3JpemUgdGhlIHBpcGVsaW5lOiBCIGFuZCBBIGdvIGluOyBSLCBQLCBhbmQgSyBjb21lIG91dC4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgZGlhZ3JhbSB0byBjb25uZWN0IGVhY2ggdmVjdG9yIHRvIGl0cyByb2xlIGluIHRoZSBwYXJ0aWFsIGZyYWN0aW9uIGV4cGFuc2lvbi4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhlIGNhbGxvdXRzIHRvIGF2b2lkIGNvbmZ1c2luZyBwb2xlcywgcmVzaWR1ZXMsIGFuZCBkaXJlY3QgcG9seW5vbWlhbCB0ZXJtcy4ifQ==" style="display:none;"></div>%%KC_END%%
*🎨 The residue command takes two coefficient vectors and returns three output vectors. Notice that P stores pole locations, not powers.*
![Illustration](/generated/gptimage2-1778182260481-6968.png)

## 3. Reading R and P as a Partial Fraction Expansion

Once MATLAB returns \(R\) and \(P\), each pair \((R_i,\, P_i)\) gives one term in the expansion:

$$\frac{R_i}{x - P_i}$$

For **distinct roots**, simply pair each residue with its pole.

### Worked Example

Given \(F(x) = \dfrac{2x+5}{x^2+3x+2}\), enter \(B = [2,\,5]\) and \(A = [1,\,3,\,2]\).

MATLAB returns poles \(-1\) and \(-2\), giving the expansion:

$$F(x) = \frac{3}{x+1} - \frac{1}{x+2}$$

### COMMON MISTAKE

Writing \(x + P_i\) instead of \(x - P_i\). When \(P_i = -1\), the denominator is \(x - (-1) = x + 1\), not \(x - 1\).

$$\frac{B(x)}{A(x)} = \sum_i \frac{R_i}{x - P_i} + K(x)$$
*This formula translates MATLAB's output back into algebra:

- \(R_i\): the coefficient (residue) of the \(i\)-th partial fraction term
- \(P_i\): the corresponding root or pole
- \(K(x)\): the direct polynomial part, present only when the rational function is **not proper**

**Common misuse:** Writing \(x + P_i\) in the denominator instead of \(x - P_i\). Always subtract the pole value. If \(P_i = -2\), the denominator is \(x - (-2) = x + 2\).*

## 4. Repeated Roots and Direct Terms

When a root \(p\) is repeated \(r\) times, MATLAB lists the corresponding partial fractions in **ascending denominator powers**: first \((x-p)^1\), then \((x-p)^2\), up to \((x-p)^r\). The residues in \(R\) follow the same order.

For **direct terms** (the \(K\) vector): if the rational function is **not proper** — meaning the numerator degree is greater than or equal to the denominator degree — then \(K\) is nonempty and contains the direct polynomial coefficients in descending powers.

### Quick Check

For \(F(x) = \dfrac{x^2+1}{x+1}\), the numerator degree (2) is not smaller than the denominator degree (1), so expect a **nonempty \(K\)**.

### EXAM TIP

Always check degrees before calling `residue`. If numerator degree \(\geq\) denominator degree, \(K\) will be nonempty.

$$\frac{R_1}{x-p} + \frac{R_2}{(x-p)^2} + \cdots + \frac{R_r}{(x-p)^r}$$
*This is the **repeated-root pattern** for a root \(p\) repeated \(r\) times. Use it when MATLAB returns the same pole value multiple times in \(P\).

- The first residue \(R_1\) pairs with \((x-p)^1\) (lowest power)
- The last residue \(R_r\) pairs with \((x-p)^r\) (highest power)

**Common misuse:** Reversing the order and pairing the first residue with the highest power. MATLAB always lists residues in ascending denominator-power order for repeated roots.*

---
**📌 Key Takeaways**
- Represent \(F(x) = B(x)/A(x)\) as two coefficient vectors in descending powers; include zeros for missing powers.
- Call \(\texttt{[R,P,K] = residue(B,A)}\): \(R\) gives residues, \(P\) gives poles, \(K\) gives direct terms if the function is not proper.
- Reconstruct the expansion as \(B(x)/A(x) = \sum_i R_i/(x-P_i) + K(x)\); use \(x - P_i\) (subtract the pole, do not add it).
- For a root \(p\) repeated \(r\) times, terms are ordered \(R_1/(x-p),\; R_2/(x-p)^2,\; \ldots,\; R_r/(x-p)^r\) in ascending powers.

*Next, use these outputs to rebuild and verify partial fraction expansions quickly.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJhdGlvbmFsX2Z1bmN0aW9uX3NldHVwIiwibGFiZWwiOiJSZXByZXNlbnRpbmcgQih4KS9BKHgpIHdpdGggY29lZmZpY2llbnQgdmVjdG9ycyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIFxcKEYoeCkgPSBcXGRmcmFjezR4XjIgLSAzeCArIDd9e3heMyArIDJ4ICsgMX1cXCksIHdoaWNoIE1BVExBQiBjb2VmZmljaWVudCB2ZWN0b3JzIGFyZSBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gQiA9IFs0LCAtMywgN10sIEEgPSBbMSwgMCwgMiwgMV0iLCJCLiBCID0gWzcsIC0zLCA0XSwgQSA9IFsxLCAyLCAxXSIsIkMuIEIgPSBbNCwgLTMsIDddLCBBID0gWzEsIDIsIDFdIiwiRC4gQiA9IFs0LCAzLCA3XSwgQSA9IFsxLCAwLCAyLCAxXSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IkNvZWZmaWNpZW50cyBhcmUgZW50ZXJlZCBpbiBkZXNjZW5kaW5nIHBvd2Vycy4gVGhlIGRlbm9taW5hdG9yIFxcKHheMyArIDJ4ICsgMVxcKSBoYXMgbm8gXFwoeF4yXFwpIHRlcm0sIHNvIGl0cyBjb2VmZmljaWVudCBpcyAwLCBnaXZpbmcgXFwoWzEsIDAsIDIsIDFdXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoZSBudW1lcmF0b3IgaXMgcmV2ZXJzZWQgKGluY3JlYXNpbmcgcG93ZXJzKSwgYW5kIHRoZSBkZW5vbWluYXRvciBvbWl0cyB0aGUgemVybyBjb2VmZmljaWVudCBmb3IgdGhlIG1pc3NpbmcgXFwoeF4yXFwpIHRlcm0uIiwiQyI6IlRoZSBkZW5vbWluYXRvciBvbWl0cyB0aGUgemVybyBjb2VmZmljaWVudCBmb3IgdGhlIG1pc3NpbmcgXFwoeF4yXFwpIHRlcm07IGl0IHNob3VsZCBiZSBcXChbMSwgMCwgMiwgMV1cXCksIG5vdCBcXChbMSwgMiwgMV1cXCkuIiwiRCI6IlRoZSBzaWduIG9mIHRoZSBcXCgtM3hcXCkgY29lZmZpY2llbnQgaXMgd3Jvbmc7IGl0IHNob3VsZCBiZSBcXCgtM1xcKSwgbm90IFxcKCszXFwpLiJ9LCJoaW50IjoiSW5jbHVkZSB6ZXJvIGNvZWZmaWNpZW50cyBmb3IgYW55IG1pc3NpbmcgcG93ZXJzIGluIHRoZSBwb2x5bm9taWFsLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBzdHVkZW50IGVudGVycyBBID0gWzEsIDMsIDJdIGZvciBcXChBKHgpXFwpLiBXaGF0IHBvbHlub21pYWwgZG9lcyB0aGlzIHJlcHJlc2VudD8iLCJvcHRpb25zIjpbIkEuIFxcKDEgKyAzeCArIDJ4XjJcXCkiLCJCLiBcXCh4XjIgKyAzeCArIDJcXCkiLCJDLiBcXCh4XjMgKyAyXFwpIiwiRC4gXFwoM3heMiArIHggKyAyXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiTUFUTEFCIHJlYWRzIGNvZWZmaWNpZW50IHZlY3RvcnMgZnJvbSBoaWdoZXN0IHBvd2VyIGRvd24gdG8gdGhlIGNvbnN0YW50IHRlcm0uIFRocmVlIGVudHJpZXMgbWVhbiBhIGRlZ3JlZS0yIHBvbHlub21pYWw6IFxcKDEgXFxjZG90IHheMiArIDMgXFxjZG90IHggKyAyXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgcmVhZHMgdGhlIHZlY3RvciBpbiBpbmNyZWFzaW5nIHBvd2VycyAoY29uc3RhbnQgZmlyc3QpLCB3aGljaCBpcyB0aGUgY29tbW9uIG1pc3Rha2UuIiwiQyI6IlRocmVlIGNvZWZmaWNpZW50cyBjb3JyZXNwb25kIHRvIGEgZGVncmVlLTIgcG9seW5vbWlhbCwgbm90IGRlZ3JlZS0zLiIsIkQiOiJUaGUgZmlyc3QgY29lZmZpY2llbnQgMSBiZWxvbmdzIHRvIFxcKHheMlxcKSwgbm90IHRoZSBtaWRkbGUgdGVybSBcXCgzeFxcKS4ifSwiaGludCI6IlRoZSBsZWZ0bW9zdCBlbnRyeSBpcyBhdHRhY2hlZCB0byB0aGUgaGlnaGVzdCBwb3dlci4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InJlc2lkdWVfY29tbWFuZF9vdXRwdXRzIiwibGFiZWwiOiJNZWFuaW5nIG9mIFIsIFAsIGFuZCBLIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJbiBNQVRMQUIncyBjb21tYW5kIFxcKFxcdGV4dHR0e1tSLFAsS10gPSByZXNpZHVlKEIsQSl9XFwpLCB3aGF0IGRvZXMgUCBjb250YWluPyIsIm9wdGlvbnMiOlsiQS4gVGhlIHBvd2VycyBvZiBlYWNoIHBhcnRpYWwgZnJhY3Rpb24gdGVybSIsIkIuIFRoZSByb290cyBvciBwb2xlcyBjb3JyZXNwb25kaW5nIHRvIHRoZSBwYXJ0aWFsIGZyYWN0aW9ucyIsIkMuIFRoZSBudW1lcmF0b3IgcG9seW5vbWlhbCBjb2VmZmljaWVudHMiLCJELiBUaGUgZGlyZWN0IHBvbHlub21pYWwgdGVybXMiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJQIHN0b3JlcyB0aGUgY29ycmVzcG9uZGluZyByb290cyBvciBwb2xlcy4gRWFjaCByZXNpZHVlIGluIFIgcGFpcnMgd2l0aCB0aGUgcG9sZSBhdCB0aGUgc2FtZSBpbmRleCBpbiBQLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlAgZG9lcyBub3QgbWVhbiBwb3dlcnMuIFJlcGVhdGVkIHJvb3RzIGNyZWF0ZSBoaWdoZXIgcG93ZXJzIGluIHRoZSBkZW5vbWluYXRvciwgYnV0IFAgc3RvcmVzIHRoZSBwb2xlIHZhbHVlcyB0aGVtc2VsdmVzLiIsIkMiOiJUaGUgbnVtZXJhdG9yIGNvZWZmaWNpZW50cyBhcmUgdGhlIGlucHV0IHZlY3RvciBCLCBub3QgYW4gb3V0cHV0LiIsIkQiOiJEaXJlY3QgcG9seW5vbWlhbCB0ZXJtcyBhcmUgc3RvcmVkIGluIEssIG5vdCBQLiJ9LCJoaW50IjoiVGhpbms6IFIgZ2l2ZXMgcmVzaWR1ZXMsIFAgZ2l2ZXMgcG9sZSBsb2NhdGlvbnMuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImdlbmVyYXRlZF9pbnB1dF9vdXRwdXRfd29ya2Zsb3dfZGlhZ3JhbSIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hlbiBpcyBLIGV4cGVjdGVkIHRvIGJlIG5vbmVtcHR5PyIsIm9wdGlvbnMiOlsiQS4gV2hlbiB0aGUgbnVtZXJhdG9yIGRlZ3JlZSBpcyBzbWFsbGVyIHRoYW4gdGhlIGRlbm9taW5hdG9yIGRlZ3JlZSIsIkIuIFdoZW4gdGhlIGRlbm9taW5hdG9yIGhhcyBjb21wbGV4IHJvb3RzIiwiQy4gV2hlbiB0aGUgcmF0aW9uYWwgZnVuY3Rpb24gaXMgbm90IHByb3BlciIsIkQuIFdoZW5ldmVyIHRoZSBkZW5vbWluYXRvciBoYXMgcmVwZWF0ZWQgcm9vdHMiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJLIHN0b3JlcyBkaXJlY3QgcG9seW5vbWlhbCB0ZXJtcywgd2hpY2ggYXJpc2Ugd2hlbiB0aGUgcmF0aW9uYWwgZnVuY3Rpb24gaXMgbm90IHByb3BlciAobnVtZXJhdG9yIGRlZ3JlZSBcXChcXGdlcVxcKSBkZW5vbWluYXRvciBkZWdyZWUpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoYXQgZGVzY3JpYmVzIGEgcHJvcGVyIHJhdGlvbmFsIGZ1bmN0aW9uLCBzbyBLIGlzIHR5cGljYWxseSBlbXB0eS4iLCJCIjoiQ29tcGxleCByb290cyBhZmZlY3QgdGhlIHZhbHVlcyBpbiBQLCBub3Qgd2hldGhlciBLIGlzIG5vbmVtcHR5LiIsIkQiOiJSZXBlYXRlZCByb290cyBhZmZlY3QgdGhlIHN0cnVjdHVyZSBvZiB0aGUgcGFydGlhbCBmcmFjdGlvbiB0ZXJtcywgbm90IHdoZXRoZXIgSyBpcyBub25lbXB0eS4ifSwiaGludCI6IkNvbXBhcmUgbnVtZXJhdG9yIGRlZ3JlZSB3aXRoIGRlbm9taW5hdG9yIGRlZ3JlZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InBhcnRpYWxfZnJhY3Rpb25fcmVjb25zdHJ1Y3Rpb24iLCJsYWJlbCI6IlJlYnVpbGRpbmcgdGhlIHBhcnRpYWwgZnJhY3Rpb24gZXhwYW5zaW9uIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJTdXBwb3NlIE1BVExBQiByZXR1cm5zIFxcKFIgPSBbMyxcXCwtMV1cXCksIFxcKFAgPSBbLTEsXFwsLTJdXFwpLCBhbmQgXFwoSyA9IFtcXCxdXFwpLiBXaGljaCBleHBhbnNpb24gbWF0Y2hlcyB0aGUgb3V0cHV0PyIsIm9wdGlvbnMiOlsiQS4gXFwoXFxkZnJhY3szfXt4LTF9IC0gXFxkZnJhY3sxfXt4LTJ9XFwpIiwiQi4gXFwoXFxkZnJhY3szfXt4KzF9IC0gXFxkZnJhY3sxfXt4KzJ9XFwpIiwiQy4gXFwoXFxkZnJhY3stMX17eCszfSArIFxcZGZyYWN7M317eCsyfVxcKSIsIkQuIFxcKDMoeCsxKSAtICh4KzIpXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiRWFjaCB0ZXJtIGhhcyB0aGUgZm9ybSBcXChSX2kvKHggLSBQX2kpXFwpLiBGb3IgXFwoUF8xID0gLTFcXCk6IFxcKHggLSAoLTEpID0geCArIDFcXCkuIEZvciBcXChQXzIgPSAtMlxcKTogXFwoeCAtICgtMikgPSB4ICsgMlxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIHVzZXMgXFwoeCArIFBfaVxcKSBpbnN0ZWFkIG9mIFxcKHggLSBQX2lcXCksIGdpdmluZyB3cm9uZyBwb2xlIHNpZ25zLiIsIkMiOiJUaGUgcmVzaWR1ZXMgYW5kIHBvbGVzIGFyZSBtaXNtYXRjaGVkOyBcXChSXzEgPSAzXFwpIHBhaXJzIHdpdGggXFwoUF8xID0gLTFcXCksIG5vdCBcXCgtM1xcKS4iLCJEIjoiUGFydGlhbCBmcmFjdGlvbnMgdXNlIHJhdGlvbmFsIHRlcm1zIHdpdGggZGVub21pbmF0b3JzLCBub3QgbXVsdGlwbGllZCBsaW5lYXIgZmFjdG9ycy4ifSwiaGludCI6IlN1YnN0aXR1dGUgdGhlIHBvbGUgaW50byBcXCh4IC0gUF9pXFwpIGNhcmVmdWxseTogc3VidHJhY3RpbmcgYSBuZWdhdGl2ZSBnaXZlcyBhIHBvc2l0aXZlLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6InJlcGVhdGVkX3Jvb3RzX29yZGVyaW5nIiwibGFiZWwiOiJSZXBlYXRlZCByb290cyBpbiBhc2NlbmRpbmcgZGVub21pbmF0b3IgcG93ZXJzIiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNF9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBwb2xlIFxcKHBcXCkgaXMgcmVwZWF0ZWQgdGhyZWUgdGltZXMuIFdoaWNoIGRlbm9taW5hdG9yLXBvd2VyIG9yZGVyIG1hdGNoZXMgdGhlIHNlY3Rpb24ncyBydWxlPyIsIm9wdGlvbnMiOlsiQS4gXFwoKHgtcCleMyxcXDsgKHgtcCleMixcXDsgKHgtcCleMVxcKSIsIkIuIFxcKCh4LXApXjEsXFw7ICh4LXApXjIsXFw7ICh4LXApXjNcXCkiLCJDLiBcXCgoeCtwKV4xLFxcOyAoeCtwKV4yLFxcOyAoeCtwKV4zXFwpIiwiRC4gXFwocF4xLFxcOyBwXjIsXFw7IHBeM1xcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkZvciByZXBlYXRlZCByb290cywgTUFUTEFCIGxpc3RzIHBhcnRpYWwgZnJhY3Rpb25zIGluIGFzY2VuZGluZyBkZW5vbWluYXRvciBwb3dlcnM6IGxvd2VzdCBwb3dlciBmaXJzdCwgaGlnaGVzdCBwb3dlciBsYXN0LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgcmV2ZXJzZXMgdGhlIHJlcXVpcmVkIG9yZGVyOyBNQVRMQUIgdXNlcyBhc2NlbmRpbmcsIG5vdCBkZXNjZW5kaW5nLCBwb3dlcnMuIiwiQyI6IlRoZSBkZW5vbWluYXRvciBmYWN0b3IgaXMgXFwoeCAtIHBcXCksIG5vdCBcXCh4ICsgcFxcKSBpbiBnZW5lcmFsLiIsIkQiOiJUaGUgcG93ZXJzIGFwcGx5IHRvIHRoZSBkZW5vbWluYXRvciBmYWN0b3IgXFwoKHgtcClcXCksIG5vdCB0byB0aGUgcG9sZSB2YWx1ZSBcXChwXFwpIGFsb25lLiJ9LCJoaW50IjoiQXNjZW5kaW5nIHBvd2VycyBtZWFucyB0aGUgZmlyc3QgcG93ZXIgKFxcKF4xXFwpKSBjb21lcyBmaXJzdC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoibGF0ZXhfc3RydWN0dXJlX3Zpc3VhbCIsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
