%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImdlbmVyYXRlZF9pbWFnZSIsInJhdGlvbmFsZSI6IlRoaXMgc2VjdGlvbiBoYXMgbm8gYXZhaWxhYmxlIHRleHRib29rIGZpZ3VyZXMsIGFuZCB0aGUga2V5IGFjdGlvbiBpcyBhIGN1c3RvbSBzeW1ib2xpYyBwcm9jZWR1cmU6IGNvdmVyIG9uZSBkZW5vbWluYXRvciBmYWN0b3IsIHRoZW4gc3Vic3RpdHV0ZSB0aGF0IGZhY3RvcidzIHJvb3QgaW50byB0aGUgcmVtYWluaW5nIGV4cHJlc3Npb24uIEEgc3RhbmRhcmQgV2lraXBlZGlhIGltYWdlIHdvdWxkIG5vdCBzaG93IHRoaXMgZXhhbS1mYWNpbmcgYWxnZWJyYWljIGFjdGlvbiBhY2N1cmF0ZWx5LiBVc2Ugb25lIGNsZWFuIGdlbmVyYXRlZCBsZWN0dXJlLW5vdGUgdmlzdWFsIG9ubHkgZm9yIHRoZSBjb3Zlci11cCBhY3Rpb247IGtlZXAgdGhlIHJlc3QgZm9ybXVsYS1uYXRpdmUgYmVjYXVzZSBleGFjdCBzeW1ib2xpYyBzdHJ1Y3R1cmUgbWF0dGVycyBtb3N0LiIsImNyYW0iOiJVc2UgdGhlIHZpc3VhbCB0byByZWNvZ25pemUgdGhlIGV4YW0gcGF0dGVybjogb25lIGRpc3RpbmN0IGxpbmVhciBmYWN0b3IgZ2l2ZXMgb25lIGNvZWZmaWNpZW50IGJ5IGNvdmVyLWFuZC1zdWJzdGl0dXRlLiIsInN0YW5kYXJkIjoiVXNlIHRoZSB2aXN1YWwgYmVzaWRlIHRoZSBmb3JtdWxhIGFuZCBvbmUgd29ya2VkIGV4YW1wbGUgc28gc3R1ZGVudHMgY29ubmVjdCB0aGUgcnVsZSB0byB0aGUgYWN0dWFsIGFsZ2VicmEuIiwidG9wX3Njb3JlIjoiVXNlIHRoZSB2aXN1YWwgdG8gcHJldmVudCB0aGUgc3VidGxlIHRyYXAgb2Ygc3Vic3RpdHV0aW5nIGJlZm9yZSByZW1vdmluZyB0aGUgemVybyBmYWN0b3IuIn0=" style="display:none;"></div>%%KC_END%%
# B.5-2 Heaviside Cover-Up Method

> **Section Objective:** Learn how to expand rational functions into partial fractions quickly using the Heaviside cover-up method.

---

## Concepts In This Section

- Proper rational function
- Distinct linear factors
- Cover-up coefficient formula
- Worked real-factor example
- Complex-conjugate factors
- Real quadratic recombination

## 1. The setup: distinct denominator factors

The Heaviside cover-up method applies when \(F(x)\) is a **proper rational function** — meaning the degree of the numerator \(P(x)\) is strictly less than the degree of the denominator \(Q(x)\) — and every denominator factor \((x - \lambda_i)\) is **distinct** (non-repeated).

Here, \(\lambda_i\) denotes the root of the \(i\)-th linear factor, and \(n\) is the total number of factors.

**Exam trigger:** If you see a denominator already factored into non-repeated linear terms, the simple cover-up rule applies directly.

**Common misuse:** This exact one-step rule does **not** work on repeated factors such as \((x-\lambda)^2\). Repeated factors require a modified procedure.

$$F(x)=\frac{P(x)}{(x-\lambda_1)(x-\lambda_2)\cdots(x-\lambda_n)}$$

## 2. The cover-up formula

Each distinct linear factor \((x - \lambda_i)\) in the denominator produces exactly one simple fraction in the expansion. The scalar \(k_i\) is the **coefficient** (also called the **residue**) attached to the factor \((x - \lambda_i)\).

**Minimal example:** If one factor is \(x+1\), rewrite it as \(x-(-1)\), so the corresponding root is \(\lambda = -1\).

#### Exam Note
Always identify the root \(\lambda_i\) of each factor **before** substituting anything. Confusing the factor with its root is the most common first-step error.

$$F(x)=\frac{k_1}{x-\lambda_1}+\frac{k_2}{x-\lambda_2}+\cdots+\frac{k_n}{x-\lambda_n}$$

## 3. Representative example: three real factors

This formula gives the coefficient \(k_i\) for the factor \((x - \lambda_i)\) in two steps:

1. **Cover** (or multiply out) the factor \((x - \lambda_i)\) from the denominator of \(F(x)\), leaving a reduced expression.
2. **Substitute** \(x = \lambda_i\) into that reduced expression.

The notation \([\,]_{x=\lambda_i}\) means "evaluate at \(x = \lambda_i\)" after the factor has been removed.

**Use case:** Computing one partial-fraction coefficient for any distinct linear factor.

**Exam trigger:** Whenever a problem asks you to find the coefficient over \(x - a\), apply this formula with \(\lambda_i = a\).

**Most common misuse:** Substituting \(x = \lambda_i\) directly into the original \(F(x)\) **before** covering the factor. Because \((x - \lambda_i)\) appears in the denominator of \(F(x)\), plugging in \(x = \lambda_i\) makes the denominator zero — the expression is undefined.

$$k_i=\left[(x-\lambda_i)F(x)\right]_{x=\lambda_i}$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiTWFrZSB0aGUgdHdvLXN0ZXAgYWN0aW9uIGluc3RhbnRseSByZWNvZ25pemFibGU6IGNvdmVyIHRoZSBmYWN0b3IsIHRoZW4gcGx1ZyBpbiBpdHMgcm9vdC4iLCJzdGFuZGFyZCI6IlBsYWNlIGJlc2lkZSB0aGUgY292ZXItdXAgZm9ybXVsYSBzbyBzdHVkZW50cyBjYW4gbWF0Y2ggZWFjaCBzeW1ib2wgdG8gYSB2aXNpYmxlIGFjdGlvbi4iLCJ0b3Bfc2NvcmUiOiJIaWdobGlnaHQgdGhhdCB0aGUgY292ZXJlZCBmYWN0b3IgbXVzdCBkaXNhcHBlYXIgYmVmb3JlIHN1YnN0aXR1dGlvbjsgb3RoZXJ3aXNlIHRoZSBkZW5vbWluYXRvciBiZWNvbWVzIHplcm8uIn0=" style="display:none;"></div>%%KC_END%%
*🎨 The cover strip removes the target factor before substitution — skipping this step causes division by zero.*
![Illustration](/generated/gptimage2-1778180848718-9568.png)

## 4. Complex factors: the same method still works

This is Example B.9. The denominator has three distinct linear factors, so one cover-up evaluation per factor is sufficient.

**Finding \(k_1\) over \(x+1\):** Cover \((x+1)\) and substitute \(x = -1\):
$$\frac{2(-1)^2+9(-1)-11}{(-1-2)(-1+3)} = \frac{2-9-11}{(-3)(2)} = \frac{-18}{-6} = 3$$

**Finding \(k_2\) over \(x-2\):** Cover \((x-2)\) and substitute \(x = 2\):
$$\frac{2(4)+9(2)-11}{(2+1)(2+3)} = \frac{8+18-11}{(3)(5)} = \frac{15}{15} = 1$$

**Finding \(k_3\) over \(x+3\):** Cover \((x+3)\) and substitute \(x = -3\):
$$\frac{2(9)+9(-3)-11}{(-3+1)(-3-2)} = \frac{18-27-11}{(-2)(-5)} = \frac{-20}{10} = -2$$

**Quick exam check:** All three denominator factors are distinct, so one cover-up evaluation per factor is enough — no system of equations needed.

$$\frac{2x^2+9x-11}{(x+1)(x-2)(x+3)}=\frac{3}{x+1}+\frac{1}{x-2}-\frac{2}{x+3}$$

## 4. Complex factors: the same method still works

The cover-up method does not require roots to be real. The quadratic \(x^2+4x+13\) has no real roots, but it factors into two complex-conjugate linear factors as shown above.

The same coefficient formula applies: evaluate at \(x = -2+j3\) for one factor and at \(x = -2-j3\) for the other. Here, \(j\) marks the imaginary-axis component (\(j = \sqrt{-1}\)).

**Exam trigger:** An irreducible quadratic in the denominator may hide a conjugate pair — factor it to reveal the roots.

**Common trap:** Stopping at complex partial-fraction terms when the original rational function has real coefficients. The final answer is expected in real form, so the conjugate pair must be recombined into a single real quadratic term.

$$x^2+4x+13=(x+2-j3)(x+2+j3)$$

$$\frac{4x^2+2x+18}{(x+1)(x^2+4x+13)}=\frac{2}{x+1}+\frac{2x-8}{x^2+4x+13}$$
*Covering \((x+1)\) and substituting \(x = -1\) gives the real coefficient \(2\) directly.

The complex-conjugate pair \((x+2-j3)\) and \((x+2+j3)\) each produce a complex partial-fraction term, but because the original function has real coefficients, those two complex terms recombine into one real fraction with a **linear numerator** over the irreducible quadratic:

$$\frac{c_1 x + c_2}{x^2+4x+13}$$

The textbook obtains \(c_1 = 2\) and \(c_2 = -8\), giving the numerator \(2x - 8\).

**Exam note:** Whenever the denominator contains an irreducible quadratic factor, the numerator over that quadratic must be **linear** (degree 1), not a constant. Writing a constant there is a common partial-credit error.*

---
**📌 Key Takeaways**
- Proper rational \(F(x) = P(x)/\prod_{i=1}^{n}(x-\lambda_i)\) with distinct linear factors expands into \(\sum_{i=1}^{n} k_i/(x-\lambda_i)\).
- Each coefficient is found by the cover-up formula: \(k_i = [(x-\lambda_i)F(x)]_{x=\lambda_i}\) — cover the factor, then substitute its root.
- Never substitute the root into the original \(F(x)\) before covering; the denominator becomes zero.
- An irreducible quadratic factor gets a linear numerator \((c_1 x+c_2)/(x^2+4x+13)\); complex-conjugate pairs recombine into this real form.

*Next, use these expansions to make inverse transforms and system-response calculations easier.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImRpc3RpbmN0X2ZhY3Rvcl9zZXR1cCIsImxhYmVsIjoiUmVjb2duaXppbmcgd2hlbiB0aGUgc2ltcGxlIGNvdmVyLXVwIG1ldGhvZCBhcHBsaWVzIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBkZW5vbWluYXRvciBpcyB0aGUgYmVzdCBkaXJlY3QgbWF0Y2ggZm9yIHRoZSBzaW1wbGUgSGVhdmlzaWRlIGNvdmVyLXVwIG1ldGhvZCBmcm9tIHRoaXMgc2VjdGlvbj8iLCJvcHRpb25zIjpbIkEuIFxcKCh4LTEpKHgrMikoeC00KVxcKSIsIkIuIFxcKCh4LTEpXjIoeCsyKVxcKSIsIkMuIFxcKHheMih4KzEpXFwpIiwiRC4gXFwoKHheMisxKV4yXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGhlIHNpbXBsZSBjb3Zlci11cCBydWxlIGhlcmUgaXMgZm9yIGRpc3RpbmN0LCBub24tcmVwZWF0ZWQgbGluZWFyIGZhY3RvcnMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhlIGZhY3RvciBcXCgoeC0xKVxcKSBpcyByZXBlYXRlZCwgc28gdGhlIHNpbXBsZSBvbmUtc3RlcCBjb3Zlci11cCBydWxlIGlzIG5vdCBlbm91Z2guIiwiQyI6IlxcKHheMlxcKSBtZWFucyB0aGUgZmFjdG9yIFxcKHhcXCkgaXMgcmVwZWF0ZWQuIiwiRCI6IlRoZSBxdWFkcmF0aWMgZmFjdG9yIGlzIHJlcGVhdGVkIGFuZCBpcyBub3QgYSBkaXN0aW5jdCBsaW5lYXItZmFjdG9yIHNldHVwLiJ9LCJoaW50IjoiTG9vayBmb3IgbGluZWFyIGZhY3RvcnMsIGVhY2ggYXBwZWFyaW5nIG9uY2UuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoiY292ZXJfdXBfY29lZmZpY2llbnRfZm9ybXVsYSIsImxhYmVsIjoiQ29tcHV0aW5nIGEgY29lZmZpY2llbnQgYnkgY292ZXJpbmcgdGhlIG1hdGNoaW5nIGZhY3RvciIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIFxcKEYoeCk9XFxmcmFjezV4KzF9eyh4LTMpKHgrMil9XFwpLCB3aGF0IGV4cHJlc3Npb24gZ2l2ZXMgdGhlIGNvZWZmaWNpZW50IG92ZXIgXFwoeC0zXFwpPyIsIm9wdGlvbnMiOlsiQS4gU3Vic3RpdHV0ZSBcXCh4PTNcXCkgaW50byBcXChGKHgpXFwpIiwiQi4gU3Vic3RpdHV0ZSBcXCh4PS0zXFwpIGludG8gXFwoKHgtMylGKHgpXFwpIiwiQy4gU3Vic3RpdHV0ZSBcXCh4PTNcXCkgaW50byBcXCgoeC0zKUYoeClcXCkiLCJELiBTdWJzdGl0dXRlIFxcKHg9MlxcKSBpbnRvIFxcKCh4KzIpRih4KVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IkZvciB0aGUgZmFjdG9yIFxcKHgtM1xcKSwgdGhlIHJvb3QgaXMgXFwoM1xcKSwgc28gXFwoaz1bKHgtMylGKHgpXV97eD0zfVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJTdWJzdGl0dXRpbmcgaW50byB0aGUgb3JpZ2luYWwgZnVuY3Rpb24gY3JlYXRlcyBkaXZpc2lvbiBieSB6ZXJvLiIsIkIiOiJUaGUgcm9vdCBvZiBcXCh4LTNcXCkgaXMgXFwoM1xcKSwgbm90IFxcKC0zXFwpLiIsIkQiOiJUaGlzIHRhcmdldHMgdGhlIHdyb25nIGRlbm9taW5hdG9yIGZhY3Rvci4ifSwiaGludCI6IkNvdmVyIHRoZSBmYWN0b3Igd2hvc2UgY29lZmZpY2llbnQgeW91IHdhbnQsIHRoZW4gdXNlIHRoYXQgZmFjdG9yJ3Mgcm9vdC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoiY292ZXJfdXBfc3RlcF9kaWFncmFtIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AyX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJBIHN0dWRlbnQgc2F5czogJ1RvIGZpbmQgdGhlIGNvZWZmaWNpZW50IG92ZXIgXFwoeCsxXFwpLCBJIHBsdWcgXFwoeD0tMVxcKSBpbnRvIHRoZSBvcmlnaW5hbCBcXChGKHgpXFwpLicgV2h5IGlzIHRoaXMgd3Jvbmc/Iiwib3B0aW9ucyI6WyJBLiBUaGUgb3JpZ2luYWwgZnVuY3Rpb24gaGFzIGEgemVybyBkZW5vbWluYXRvciBhdCBcXCh4PS0xXFwpIiwiQi4gVGhlIHJvb3Qgb2YgXFwoeCsxXFwpIGlzIFxcKDFcXCkiLCJDLiBDb3Zlci11cCBvbmx5IHdvcmtzIGZvciBjb21wbGV4IHJvb3RzIiwiRC4gVGhlIG51bWVyYXRvciBtdXN0IGFsd2F5cyBiZSB6ZXJvIGZpcnN0Il0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiWW91IG11c3QgZmlyc3QgcmVtb3ZlIHRoZSBtYXRjaGluZyBmYWN0b3IuIE90aGVyd2lzZSBzdWJzdGl0dXRpbmcgdGhlIHJvb3QgbWFrZXMgdGhlIG9yaWdpbmFsIGRlbm9taW5hdG9yIHplcm8uIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhlIHJvb3Qgb2YgXFwoeCsxXFwpIGlzIFxcKC0xXFwpLCBub3QgXFwoMVxcKS4iLCJDIjoiQ292ZXItdXAgd29ya3MgZm9yIHJlYWwgZGlzdGluY3QgbGluZWFyIGZhY3RvcnMgdG9vLiIsIkQiOiJUaGVyZSBpcyBubyByZXF1aXJlbWVudCB0aGF0IHRoZSBudW1lcmF0b3IgYmVjb21lIHplcm8uIn0sImhpbnQiOiJBc2sgd2hhdCBoYXBwZW5zIHRvIHRoZSBmYWN0b3IgXFwoeCsxXFwpIHdoZW4gXFwoeD0tMVxcKS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoid3JvbmdfdnNfcmlnaHRfdmlzdWFsX2NoZWNrIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJ3b3JrZWRfcmVhbF9mYWN0b3JfZXhhbXBsZSIsImxhYmVsIjoiRXhwYW5kaW5nIHRoZSB0ZXh0Ym9vayByZWFsLWZhY3RvciBleGFtcGxlIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgXFwoXFxmcmFjezJ4XjIrOXgtMTF9eyh4KzEpKHgtMikoeCszKX1cXCksIHdoYXQgaXMgdGhlIGNvZWZmaWNpZW50IG92ZXIgXFwoeC0yXFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoLTJcXCkiLCJCLiBcXCgxXFwpIiwiQy4gXFwoMlxcKSIsIkQuIFxcKDNcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJDb3ZlciBcXCh4LTJcXCkgYW5kIHN1YnN0aXR1dGUgXFwoeD0yXFwpOiBcXCgoOCsxOC0xMSkvKCgzKSg1KSk9MTUvMTU9MVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJcXCgtMlxcKSBpcyB0aGUgY29lZmZpY2llbnQgb3ZlciBcXCh4KzNcXCksIG5vdCBcXCh4LTJcXCkuIiwiQyI6IlRoaXMgaXMgbm90IG9idGFpbmVkIGJ5IHRoZSBjb3Zlci11cCBldmFsdWF0aW9uIGZvciBcXCh4PTJcXCkuIiwiRCI6IlxcKDNcXCkgaXMgdGhlIGNvZWZmaWNpZW50IG92ZXIgXFwoeCsxXFwpLiJ9LCJoaW50IjoiRm9yIFxcKHgtMlxcKSwgdXNlIHRoZSByb290IFxcKDJcXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoiY29tcGxleF9jb25qdWdhdGVfZmFjdG9ycyIsImxhYmVsIjoiQXBwbHlpbmcgY292ZXItdXAgdG8gY29tcGxleC1jb25qdWdhdGUgZmFjdG9ycyIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDRfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IlRoZSBxdWFkcmF0aWMgXFwoeF4yKzR4KzEzXFwpIGZhY3RvcnMgYXMgXFwoKHgrMi1qMykoeCsyK2ozKVxcKS4gV2hhdCBhcmUgdGhlIHR3byByb290cz8iLCJvcHRpb25zIjpbIkEuIFxcKDIrajNcXCkgYW5kIFxcKDItajNcXCkiLCJCLiBcXCgtMitqM1xcKSBhbmQgXFwoLTItajNcXCkiLCJDLiBcXCgtNCtqMTNcXCkgYW5kIFxcKC00LWoxM1xcKSIsIkQuIFxcKDIrajEzXFwpIGFuZCBcXCgyLWoxM1xcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlNldCBlYWNoIGZhY3RvciBlcXVhbCB0byB6ZXJvOiBcXCh4KzItajM9MFxcKSBnaXZlcyBcXCh4PS0yK2ozXFwpLCBhbmQgXFwoeCsyK2ozPTBcXCkgZ2l2ZXMgXFwoeD0tMi1qM1xcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGUgc2lnbiBvZiB0aGUgcmVhbCBwYXJ0IGlzIHdyb25nLiIsIkMiOiJUaGVzZSBudW1iZXJzIGNvbWUgZnJvbSBjb2VmZmljaWVudHMsIG5vdCBmcm9tIHNvbHZpbmcgdGhlIGxpbmVhciBmYWN0b3JzLiIsIkQiOiJCb3RoIHRoZSByZWFsIHBhcnQgYW5kIGltYWdpbmFyeSBtYWduaXR1ZGUgYXJlIHdyb25nLiJ9LCJoaW50IjoiTW92ZSBcXCgrMlxcKSBhbmQgXFwoXFxtcCBqM1xcKSB0byB0aGUgb3RoZXIgc2lkZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJyZWFsX3F1YWRyYXRpY19yZWNvbWJpbmF0aW9uIiwibGFiZWwiOiJXcml0aW5nIGNvbXBsZXgtcGFpciByZXN1bHRzIGFzIGEgcmVhbCBxdWFkcmF0aWMgZnJhY3Rpb24iLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hlbiBhIHJlYWwgcmF0aW9uYWwgZnVuY3Rpb24gY29udGFpbnMgdGhlIGlycmVkdWNpYmxlIHF1YWRyYXRpYyBmYWN0b3IgXFwoeF4yKzR4KzEzXFwpLCB3aGF0IG51bWVyYXRvciBmb3JtIHNob3VsZCBiZSB1c2VkIG92ZXIgdGhhdCBxdWFkcmF0aWM/Iiwib3B0aW9ucyI6WyJBLiBBIGNvbnN0YW50IG9ubHksIHN1Y2ggYXMgXFwoYy8oeF4yKzR4KzEzKVxcKSIsIkIuIEEgbGluZWFyIG51bWVyYXRvciwgc3VjaCBhcyBcXCgoY18xeCtjXzIpLyh4XjIrNHgrMTMpXFwpIiwiQy4gQSBxdWFkcmF0aWMgbnVtZXJhdG9yLCBzdWNoIGFzIFxcKChjXzF4XjIrY18yeCtjXzMpLyh4XjIrNHgrMTMpXFwpIiwiRC4gTm8gbnVtZXJhdG9yIGlzIG5lZWRlZCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkFuIGlycmVkdWNpYmxlIHF1YWRyYXRpYyBmYWN0b3IgZ2V0cyBhIG51bWVyYXRvciBvbmUgZGVncmVlIGxvd2VyLCBzbyB0aGUgbnVtZXJhdG9yIGlzIGxpbmVhci4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJBIGNvbnN0YW50IGlzIHRvbyByZXN0cmljdGl2ZSBmb3IgYSBnZW5lcmFsIGlycmVkdWNpYmxlIHF1YWRyYXRpYyB0ZXJtLiIsIkMiOiJUaGUgbnVtZXJhdG9yIGRlZ3JlZSBtdXN0IGJlIGxvd2VyIHRoYW4gdGhlIHF1YWRyYXRpYyBkZW5vbWluYXRvciBkZWdyZWUuIiwiRCI6IkV2ZXJ5IHBhcnRpYWwtZnJhY3Rpb24gdGVybSBoYXMgYSBudW1lcmF0b3IuIn0sImhpbnQiOiJGb3IgYSBkZW5vbWluYXRvciBvZiBkZWdyZWUgMiwgdXNlIGEgbnVtZXJhdG9yIG9mIGRlZ3JlZSAxLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDVfcTIiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkluIG9uZSBzZW50ZW5jZSwgZXhwbGFpbiB3aHkgXFwoXFxmcmFjezR4XjIrMngrMTh9eyh4KzEpKHheMis0eCsxMyl9XFwpIGNhbiBiZSB3cml0dGVuIGFzIFxcKFxcZnJhY3syfXt4KzF9K1xcZnJhY3syeC04fXt4XjIrNHgrMTN9XFwpIGluc3RlYWQgb2YgbGVhdmluZyB0d28gY29tcGxleCBmcmFjdGlvbnMuIiwiaWRlYWxfYW5zd2VyIjoiQmVjYXVzZSB0aGUgY29tcGxleCByb290cyBvY2N1ciBhcyBhIGNvbmp1Z2F0ZSBwYWlyLCB0aGVpciB0d28gY29tcGxleCBwYXJ0aWFsLWZyYWN0aW9uIHRlcm1zIGNvbWJpbmUgaW50byBvbmUgcmVhbCB0ZXJtIHdpdGggbGluZWFyIG51bWVyYXRvciBcXCgyeC04XFwpIG92ZXIgdGhlIGlycmVkdWNpYmxlIHF1YWRyYXRpYy4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IG1lbnRpb24gdGhlIGNvbXBsZXgtY29uanVnYXRlIHBhaXIiLCJNdXN0IHN0YXRlIHRoYXQgdGhlIHBhaXIgcmVjb21iaW5lcyBpbnRvIGEgcmVhbCBxdWFkcmF0aWMtZGVub21pbmF0b3IgdGVybSIsIk11c3QgaWRlbnRpZnkgdGhlIG51bWVyYXRvciBhcyBsaW5lYXIsIHNwZWNpZmljYWxseSBcXCgyeC04XFwpIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCB1bmRlcnN0YW5kcyB0aGUgcHVycG9zZSBvZiByZWNvbWJpbmluZyBjb21wbGV4IGZhY3RvcnMgcmF0aGVyIHRoYW4ganVzdCBjb3B5aW5nIHRoZSBmaW5hbCBmb3JtdWxhLiIsImhpbnQiOiJSZWFsIGNvZWZmaWNpZW50cyBwbHVzIGNvbmp1Z2F0ZSByb290cyB1c3VhbGx5IGNvbWJpbmUgYmFjayBpbnRvIGEgcmVhbCBleHByZXNzaW9uLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
