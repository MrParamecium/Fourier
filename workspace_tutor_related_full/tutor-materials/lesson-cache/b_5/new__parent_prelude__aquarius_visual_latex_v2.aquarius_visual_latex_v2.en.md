%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImdlbmVyYXRlZF9pbWFnZSIsInJhdGlvbmFsZSI6IlRoaXMgc2VjdGlvbiBpcyBtb3N0bHkgc3ltYm9saWMsIHNvIHRoZSBjb3JlIGZvcm11bGFzIHNob3VsZCBiZSB0YXVnaHQgd2l0aCBjbGVhbiBMYVRlWCBmaXJzdC4gTm8gdGV4dGJvb2sgZmlndXJlIGlzIGF2YWlsYWJsZSBhbmQgd2ViIHNvdXJjZXMgYXJlIHVuYXZhaWxhYmxlLCBidXQgc3R1ZGVudHMgd2l0aCB3ZWFrIG1hdGggYmFja2dyb3VuZCBiZW5lZml0IGZyb20gb25lIGN1c3RvbSBzdGF0aWMgY29tcGFyaXNvbiB2aXN1YWwgc2hvd2luZyB0aGUgZGVncmVlIHRlc3QgYW5kIHRoZSAnZGl2aWRlIGZpcnN0JyB3YXJuaW5nIGZvciBpbXByb3BlciByYXRpb25hbCBmdW5jdGlvbnMuIiwiY3JhbSI6IlVzZSB0aGUgdmlzdWFsIHRvIGluc3RhbnRseSByZWNvZ25pemUgd2hldGhlciB0byBleHBhbmQgbm93IG9yIGRpdmlkZSBmaXJzdC4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgdmlzdWFsIGFmdGVyIHRoZSBmb3JtdWxhcyB0byBjb25uZWN0IGRlZ3JlZSBjb21wYXJpc29uIHdpdGggdGhlIGNvcnJlY3Qgd29ya2Zsb3cuIiwidG9wX3Njb3JlIjoiVXNlIHRoZSB2aXN1YWwgdG8gcHJldmVudCB0aGUgY29tbW9uIHRyYXAgb2YgYXBwbHlpbmcgcGFydGlhbCBmcmFjdGlvbnMgZGlyZWN0bHkgdG8gYW4gaW1wcm9wZXIgcmF0aW9uYWwgZnVuY3Rpb24uIn0=" style="display:none;"></div>%%KC_END%%
# B.5 Partial Fraction Expansion

> **Section Objective:** Learn how rational functions are prepared for partial fraction expansion by checking polynomial degrees first.

---

### CONCEPTS IN THIS SECTION

- Rational function
- Proper rational function
- Improper rational function
- Polynomial division first
- Simple partial fraction setup

## 1. Rational Functions

A **rational function** is simply a polynomial divided by another polynomial. The numerator polynomial is \(P(x)\) and the denominator polynomial is \(Q(x)\). The symbol \(m\) denotes the highest power in the numerator, and \(n\) denotes the highest power in the denominator.

These ratios appear frequently in LTI systems — for example, before computing inverse transforms or evaluating system responses.

**Minimal example:** \(F(x)=\frac{3x+2}{x^2+5x+6}\), where \(m=1\) and \(n=2\).

#### Exam Trigger

Whenever a problem gives a ratio of polynomials, immediately identify the numerator degree \(m\) and denominator degree \(n\) before doing anything else.

#### Common Misuse

Starting partial fractions before checking whether the ratio is proper.

$$F(x)=\frac{b_mx^m+b_{m-1}x^{m-1}+\cdots+b_1x+b_0}{x^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0}=\frac{P(x)}{Q(x)}\quad\text{(B.22)}$$

## 2. Proper Rational Functions

A rational function is **proper** when the numerator degree is strictly smaller than the denominator degree. This is the form that partial fraction expansion expects before decomposition can begin.

Quick reminder: \(m\) is the highest power in the numerator; \(n\) is the highest power in the denominator.

**Minimal example:** \(\frac{2x+1}{x^2+3x+2}\) is proper because \(1 < 2\).

#### Exam Trigger

If the top degree is lower than the bottom degree, proceed directly to factoring the denominator and setting up partial fractions.

#### Common Misuse

Comparing the number of terms instead of comparing the highest powers.

$$\text{Proper rational function:}\quad m < n$$

## 3. Improper Rational Functions

A rational function is **improper** when the numerator degree is greater than or equal to the denominator degree. The required action is clear: **divide first**, then apply partial fraction expansion only to the remaining proper fraction.

**Minimal example:** \(\frac{x^2+4x+1}{x+2}\) is improper because \(2 \ge 1\).

#### Exam Trigger

If the top degree is not strictly smaller than the bottom degree, perform polynomial long division first to separate the polynomial part from the proper remainder.

#### Common Misuse

Writing partial fractions directly from an improper fraction without first separating the polynomial part. This produces incorrect constants and loses the polynomial term entirely.

$$\text{Improper rational function:}\quad m \ge n$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="trap_exposure" data-visual-use-b64="eyJjcmFtIjoiTWFrZSB0aGUgZGVjaXNpb24gcnVsZSB2aXN1YWxseSBhdXRvbWF0aWM6IHRvcCBkZWdyZWUgbG93ZXIgbWVhbnMgZXhwYW5kOyB0b3AgZGVncmVlIGVxdWFsIG9yIGhpZ2hlciBtZWFucyBkaXZpZGUgZmlyc3QuIiwic3RhbmRhcmQiOiJVc2UgdGhlIHNpZGUtYnktc2lkZSBjb250cmFzdCB0byByZWluZm9yY2UgdGhlIHByb3BlciB2ZXJzdXMgaW1wcm9wZXIgZGlzdGluY3Rpb24gYWZ0ZXIgdGhlIGZvcm11bGFzLiIsInRvcF9zY29yZSI6IlRoZSByaWdodCBjYXJkIGhpZ2hsaWdodHMgdGhlIGVkZ2UgY2FzZSBcXChtPW5cXCkgYXMgaW1wcm9wZXIg4oCUIGEgY29tbW9uIGV4YW0gdHJhcC4ifQ==" style="display:none;"></div>%%KC_END%%
*🎨 Degree test decision: if the top degree is lower than the bottom, expand directly; if equal or higher, divide first.*
![Illustration](/generated/gptimage2-1778571570450-1116.png)

## 4. Basic Partial Fraction Setup

Once the rational function is **proper** and the denominator is **factored into distinct linear factors**, the fraction can be rewritten as a sum of simpler fractions.

- \(r_1\) and \(r_2\) are the roots that create the denominator factors \((x-r_1)\) and \((x-r_2)\).
- \(A\) and \(B\) are unknown constants to be solved for by comparing coefficients or substituting convenient values of \(x\).

**When to use this:** The denominator has distinct linear factors and the fraction is already proper.

#### Exam Trigger

A factored denominator of the form \((x-r_1)(x-r_2)\) signals that this setup applies directly.

#### Common Misuse

Copying the denominator factors correctly but writing the original numerator expression instead of unknown constants \(A\) and \(B\) in the numerators.

$$\frac{P(x)}{(x-r_1)(x-r_2)}=\frac{A}{x-r_1}+\frac{B}{x-r_2}$$

## 5. Representative Worked Example

Decompose \(\frac{2x+3}{(x+1)(x+2)}\).

**Step 1 — Check properness.** The numerator degree is \(1\) and the denominator degree is \(2\). Since \(1 < 2\), the function is proper. No division needed.

**Step 2 — Set up the partial fractions.**

$$\frac{2x+3}{(x+1)(x+2)}=\frac{A}{x+1}+\frac{B}{x+2}$$

**Step 3 — Multiply both sides by \((x+1)(x+2)\).**

$$2x+3=A(x+2)+B(x+1)$$

**Step 4 — Expand the right side.**

$$2x+3=(A+B)x+(2A+B)$$

**Step 5 — Compare coefficients.**

- Coefficient of \(x\): \(A+B=2\)
- Constant term: \(2A+B=3\)

Subtracting the first equation from the second: \(A=1\). Substituting back: \(B=1\).

**Final answer:**

$$\frac{2x+3}{(x+1)(x+2)}=\frac{1}{x+1}+\frac{1}{x+2}$$

> **Exam Note:** Your setup (Step 2) is usually worth points even before solving for the constants.

---
**📌 Key Takeaways**
- A rational function has the form \(F(x)=\frac{P(x)}{Q(x)}\) — a polynomial divided by a polynomial.
- Proper condition \(m < n\): numerator degree is lower; expand directly into partial fractions.
- Improper condition \(m \ge n\): divide first, then apply partial fractions only to the proper remainder.
- Basic setup for distinct linear factors: \(\frac{P(x)}{(x-r_1)(x-r_2)}=\frac{A}{x-r_1}+\frac{B}{x-r_2}\).

*Next, partial fractions become more useful when we connect these simpler terms to transform tables and system responses.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJhdGlvbmFsX2Z1bmN0aW9uX2Zvcm0iLCJsYWJlbCI6IlJlY29nbml6aW5nIHJhdGlvbmFsIGZ1bmN0aW9ucyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBleHByZXNzaW9uIGlzIGEgcmF0aW9uYWwgZnVuY3Rpb24gaW4gdGhlIHNlbnNlIHVzZWQgaW4gdGhpcyBzZWN0aW9uPyIsIm9wdGlvbnMiOlsiQS4gXFwoXFxzaW4geCt4XjJcXCkiLCJCLiBcXChcXGZyYWN7eF4yKzN4KzF9e3heMyt4KzR9XFwpIiwiQy4gXFwoZV54K3hcXCkiLCJELiBcXChcXHNxcnR7eH0rMVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkEgcmF0aW9uYWwgZnVuY3Rpb24gaXMgYSByYXRpbyBvZiB0d28gcG9seW5vbWlhbHMsIHNvIFxcKFxcZnJhY3t4XjIrM3grMX17eF4zK3grNH1cXCkgZml0cyB0aGUgZm9ybSBcXChGKHgpPVxcZnJhY3tQKHgpfXtRKHgpfVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJJdCBpbmNsdWRlcyBcXChcXHNpbiB4XFwpLCB3aGljaCBpcyBub3QgYSBwb2x5bm9taWFsLiIsIkMiOiJJdCBpbmNsdWRlcyBcXChlXnhcXCksIHdoaWNoIGlzIG5vdCBhIHBvbHlub21pYWwuIiwiRCI6Ikl0IGluY2x1ZGVzIFxcKFxcc3FydHt4fVxcKSwgd2hpY2ggaXMgbm90IGEgcG9seW5vbWlhbCB0ZXJtLiJ9LCJoaW50IjoiQ2hlY2sgd2hldGhlciBib3RoIHRoZSBudW1lcmF0b3IgYW5kIGRlbm9taW5hdG9yIGFyZSBwb2x5bm9taWFscy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJwcm9wZXJfdnNfaW1wcm9wZXJfZGVncmVlX3Rlc3QiLCJsYWJlbCI6IlByb3BlciB2ZXJzdXMgaW1wcm9wZXIgcmF0aW9uYWwgZnVuY3Rpb25zIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJDbGFzc2lmeSBcXChcXGZyYWN7NXheMit4KzF9e3heNCsyeCs3fVxcKS4iLCJvcHRpb25zIjpbIkEuIFByb3BlciwgYmVjYXVzZSBcXCgyPDRcXCkiLCJCLiBJbXByb3BlciwgYmVjYXVzZSB0aGUgbnVtZXJhdG9yIGhhcyB0aHJlZSB0ZXJtcyIsIkMuIEltcHJvcGVyLCBiZWNhdXNlIHRoZSBkZW5vbWluYXRvciBoYXMgYSBjb25zdGFudCB0ZXJtIiwiRC4gUHJvcGVyLCBiZWNhdXNlIGJvdGggbnVtZXJhdG9yIGFuZCBkZW5vbWluYXRvciBhcmUgcG9seW5vbWlhbHMiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJUaGUgbnVtZXJhdG9yIGRlZ3JlZSBpcyBcXChtPTJcXCkgYW5kIHRoZSBkZW5vbWluYXRvciBkZWdyZWUgaXMgXFwobj00XFwpLiBTaW5jZSBcXChtPG5cXCksIHRoZSByYXRpb25hbCBmdW5jdGlvbiBpcyBwcm9wZXIuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhlIG51bWJlciBvZiB0ZXJtcyBkb2VzIG5vdCBkZXRlcm1pbmUgcHJvcGVyIG9yIGltcHJvcGVyIGZvcm0uIiwiQyI6IkEgY29uc3RhbnQgdGVybSBkb2VzIG5vdCBkZXRlcm1pbmUgcHJvcGVyIG9yIGltcHJvcGVyIGZvcm0uIiwiRCI6IkJlaW5nIGEgcmF0aW8gb2YgcG9seW5vbWlhbHMgbWFrZXMgaXQgcmF0aW9uYWwsIGJ1dCBwcm9wZXJuZXNzIGRlcGVuZHMgb24gZGVncmVlcy4ifSwiaGludCI6IkNvbXBhcmUgaGlnaGVzdCBwb3dlcnMsIG5vdCBudW1iZXIgb2YgdGVybXMuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AyX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJPYnNlcnZlIGEgZGVncmVlLXRlc3QgdmlzdWFsIHdoZXJlIHRoZSBudW1lcmF0b3IgZGVncmVlIGJhciBpcyB0aGUgc2FtZSBoZWlnaHQgYXMgdGhlIGRlbm9taW5hdG9yIGRlZ3JlZSBiYXIuIFdoYXQgc2hvdWxkIHlvdSBjb25jbHVkZT8iLCJvcHRpb25zIjpbIkEuIEl0IGlzIHByb3Blcjsgc3RhcnQgcGFydGlhbCBmcmFjdGlvbnMgaW1tZWRpYXRlbHkuIiwiQi4gSXQgaXMgaW1wcm9wZXI7IGRpdmlkZSBmaXJzdC4iLCJDLiBJdCBpcyBub3QgYSByYXRpb25hbCBmdW5jdGlvbi4iLCJELiBJdCBpcyBwcm9wZXIgb25seSBpZiB0aGUgbnVtZXJhdG9yIGhhcyBmZXdlciB0ZXJtcy4iXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJFcXVhbCBkZWdyZWVzIG1lYW4gXFwobT1uXFwpLCBhbmQgdGhlIGltcHJvcGVyIGNvbmRpdGlvbiBpcyBcXChtXFxnZSBuXFwpLiBUaGVyZWZvcmUgeW91IG11c3QgZGl2aWRlIGZpcnN0LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlByb3BlciByZXF1aXJlcyBcXChtPG5cXCksIG5vdCBcXChtPW5cXCkuIiwiQyI6IkVxdWFsIGRlZ3JlZSBkb2VzIG5vdCBzdG9wIGl0IGZyb20gYmVpbmcgYSByYXRpb25hbCBmdW5jdGlvbi4iLCJEIjoiVGhlIG51bWJlciBvZiB0ZXJtcyBpcyBpcnJlbGV2YW50OyBvbmx5IGhpZ2hlc3QgcG93ZXJzIG1hdHRlci4ifSwiaGludCI6IlRoZSBlZGdlIGNhc2UgXFwobT1uXFwpIGJlbG9uZ3MgdG8gXFwobVxcZ2UgblxcKS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoid3JvbmdfdnNfcmlnaHRfdmlzdWFsX2NoZWNrIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJkaXZpZGVfZmlyc3RfdHJpZ2dlciIsImxhYmVsIjoiUG9seW5vbWlhbCBkaXZpc2lvbiBiZWZvcmUgZXhwYW5zaW9uIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGF0IGlzIHRoZSBmaXJzdCBhY3Rpb24gZm9yIFxcKFxcZnJhY3t4XjMrMngrMX17eF4yKzF9XFwpIGJlZm9yZSBwYXJ0aWFsIGZyYWN0aW9uIGV4cGFuc2lvbj8iLCJvcHRpb25zIjpbIkEuIEZhY3RvciB0aGUgbnVtZXJhdG9yIGZpcnN0IiwiQi4gRGl2aWRlIHRoZSBwb2x5bm9taWFscyBmaXJzdCIsIkMuIFNldCBpdCBlcXVhbCB0byBcXChcXGZyYWN7QX17eF4zfStcXGZyYWN7Qn17eF4yfVxcKSIsIkQuIENhbmNlbCB0aGUgaGlnaGVzdCBwb3dlcnMgYXV0b21hdGljYWxseSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBudW1lcmF0b3IgZGVncmVlIGlzIFxcKDNcXCkgYW5kIHRoZSBkZW5vbWluYXRvciBkZWdyZWUgaXMgXFwoMlxcKSwgc28gXFwobVxcZ2UgblxcKS4gVGhlIHJhdGlvbmFsIGZ1bmN0aW9uIGlzIGltcHJvcGVyLCBzbyBkaXZpZGUgZmlyc3QuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiRmFjdG9yaW5nIHRoZSBudW1lcmF0b3IgaXMgbm90IHRoZSBrZXkgdHJpZ2dlciBoZXJlOyB0aGUgZGVncmVlIHRlc3QgY29tZXMgZmlyc3QuIiwiQyI6IlRoYXQgc2V0dXAgaWdub3JlcyB0aGUgYWN0dWFsIGRlbm9taW5hdG9yIGZhY3RvcnMgYW5kIHNraXBzIHRoZSByZXF1aXJlZCBkaXZpc2lvbi4iLCJEIjoiSGlnaGVzdCBwb3dlcnMgY2Fubm90IGJlIGNhbmNlbGVkIHVubGVzcyB0aGVyZSBpcyBhIGNvbW1vbiBmYWN0b3IsIHdoaWNoIGlzIG5vdCBhdXRvbWF0aWMuIn0sImhpbnQiOiJJbXByb3BlciBtZWFucyB0aGUgcG9seW5vbWlhbCBwYXJ0IG11c3QgYmUgc2VwYXJhdGVkIGZpcnN0LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQSBzdHVkZW50IHRyaWVzIHRvIGRpcmVjdGx5IGV4cGFuZCBcXChcXGZyYWN7eF4yKzN4KzF9e3grMX1cXCkgaW50byBwYXJ0aWFsIGZyYWN0aW9ucy4gRXhwbGFpbiB3aHkgdGhhdCBpcyB3cm9uZyBhbmQgd2hhdCBzaG91bGQgaGFwcGVuIGZpcnN0LiIsImlkZWFsX2Fuc3dlciI6Ikl0IGlzIGltcHJvcGVyIGJlY2F1c2UgdGhlIG51bWVyYXRvciBkZWdyZWUgaXMgXFwoMlxcKSBhbmQgdGhlIGRlbm9taW5hdG9yIGRlZ3JlZSBpcyBcXCgxXFwpLCBzbyBcXChtXFxnZSBuXFwpLiBUaGUgc3R1ZGVudCBzaG91bGQgZGl2aWRlIHRoZSBwb2x5bm9taWFscyBmaXJzdCwgdGhlbiBvbmx5IGV4cGFuZCBhbnkgcmVtYWluaW5nIHByb3BlciBmcmFjdGlvbi4iLCJncmFkaW5nX3J1YnJpYyI6WyJTdGF0ZXMgdGhhdCB0aGUgcmF0aW9uYWwgZnVuY3Rpb24gaXMgaW1wcm9wZXIiLCJDb3JyZWN0bHkgaWRlbnRpZmllcyB0aGUgZGVncmVlIGNvbXBhcmlzb24gXFwoMlxcZ2UxXFwpIiwiU2F5cyB0byBkaXZpZGUgZmlyc3QgYmVmb3JlIHBhcnRpYWwgZnJhY3Rpb24gZXhwYW5zaW9uIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCB1bmRlcnN0YW5kcyB0aGUgd29ya2Zsb3csIG5vdCBqdXN0IHRoZSBkZWZpbml0aW9uLiIsImhpbnQiOiJBc2sgd2hldGhlciB0aGUgdG9wIGRlZ3JlZSBpcyBzbWFsbGVyIHRoYW4gdGhlIGJvdHRvbSBkZWdyZWUuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJiYXNpY19wYXJ0aWFsX2ZyYWN0aW9uX3NldHVwIiwibGFiZWwiOiJTZXR0aW5nIHVwIHNpbXBsZSBwYXJ0aWFsIGZyYWN0aW9ucyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNF9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hhdCBpcyB0aGUgY29ycmVjdCBzZXR1cCBmb3IgXFwoXFxmcmFjezR4KzV9eyh4LTEpKHgrMyl9XFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoXFxmcmFje0F9e3gtMX0rXFxmcmFje0J9e3grM31cXCkiLCJCLiBcXChcXGZyYWN7QX17KHgtMSkoeCszKX0rQlxcKSIsIkMuIFxcKFxcZnJhY3tBfXt4LTF9K1xcZnJhY3tCfXt4LTF9XFwpIiwiRC4gXFwoXFxmcmFje0F9e3h9K1xcZnJhY3tCfXszfVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IkVhY2ggZGlzdGluY3QgbGluZWFyIGRlbm9taW5hdG9yIGZhY3RvciBnZXRzIGl0cyBvd24gZnJhY3Rpb24gd2l0aCBhbiB1bmtub3duIGNvbnN0YW50IG51bWVyYXRvci4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGlzIGtlZXBzIHRoZSBmdWxsIGRlbm9taW5hdG9yIGluIG9uZSB0ZXJtIGluc3RlYWQgb2Ygc3BsaXR0aW5nIGJ5IGZhY3RvcnMuIiwiQyI6Ikl0IHJlcGVhdHMgdGhlIHNhbWUgZmFjdG9yIGFuZCBpZ25vcmVzIFxcKHgrM1xcKS4iLCJEIjoiSXQgaW52ZW50cyBkZW5vbWluYXRvciBwaWVjZXMgdGhhdCBhcmUgbm90IGZhY3RvcnMgb2YgdGhlIG9yaWdpbmFsIGRlbm9taW5hdG9yLiJ9LCJoaW50IjoiVXNlIG9uZSBzaW1wbGUgZnJhY3Rpb24gZm9yIGVhY2ggZGlzdGluY3QgZGVub21pbmF0b3IgZmFjdG9yLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
