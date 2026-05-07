%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImdlbmVyYXRlZF9pbWFnZSIsInJhdGlvbmFsZSI6Ik5vIHRleHRib29rIGZpZ3VyZSBjcm9wcyBhcmUgYXZhaWxhYmxlLCBhbmQgdGhpcyBzZWN0aW9uIGlzIGVhc2llciB0byB1bmRlcnN0YW5kIHRocm91Z2ggYSBjbGVhbiBwcm9jZXNzIGRpYWdyYW0gc2hvd2luZyBzZXR1cCwgY2xlYXJpbmcgZnJhY3Rpb25zLCBjb2VmZmljaWVudCBtYXRjaGluZywgYW5kIHRoZSBzcGVjaWFsIHJvbGUgb2YgcmVwZWF0ZWQgZmFjdG9ycy4iLCJjcmFtIjoiVXNlIHZpc3VhbHMgdG8gaGVscCB0aGUgc3R1ZGVudCBpbnN0YW50bHkgcmVjb2duaXplIHRoZSBjb3JyZWN0IGRlY29tcG9zaXRpb24gcGF0dGVybiBhbmQgdGhlIHNvbHZlIHNlcXVlbmNlLiIsInN0YW5kYXJkIjoiVXNlIHZpc3VhbHMgdG8gc2hvdyB0aGUgbWFpbiB3b3JrZmxvdyBhbmQgb25lIHJlcHJlc2VudGF0aXZlIGV4YW1wbGUgd2l0aG91dCBvdmVyY3Jvd2RpbmcgdGhlIHBhZ2UuIiwidG9wX3Njb3JlIjoiVXNlIHZpc3VhbHMgdG8gY29udHJhc3QgZGlzdGluY3QtZmFjdG9yIHNob3J0Y3V0cyB3aXRoIHJlcGVhdGVkLWZhY3RvciBjYXNlcyBhbmQgZXhwb3NlIGNvbW1vbiBzZXR1cCBtaXN0YWtlcy4ifQ==" style="display:none;"></div>%%KC_END%%
# B.5 Partial Fraction Expansion

> **Section Objective:** Learn to break one proper rational function into simpler fractions so that inverse transforms and later algebra become manageable.

---

The core strategy here is straightforward: choose the correct partial-fraction form, clear denominators by multiplying both sides, then match coefficients to solve for the unknown constants. Each step depends on the one before it, so getting the form right at the start is critical.

One important detail: when a denominator factor is repeated — for example \((x+3)^2\) — you must include a separate term for every power of that factor, not just the highest one.

You will first learn the general clearing-fractions method, then see why the cover-up idea is faster only in the distinct-factor case.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiU2hvdyB0aGUgdGhyZWUtc3RlcCBleGFtIHdvcmtmbG93IGF0IGEgZ2xhbmNlOiBkZWNvbXBvc2UsIGNsZWFyLCBtYXRjaC4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgZGlhZ3JhbSB0byBjb25uZWN0IHRoZSBjb25jZXB0IHRvIG9uZSB3b3JrZWQgZXhhbXBsZSBwYXRoLiIsInRvcF9zY29yZSI6IlVzZSB0aGUgZGlhZ3JhbSB0byBoaWdobGlnaHQgd2hlcmUgcmVwZWF0ZWQgZmFjdG9ycyBjaGFuZ2UgdGhlIHNldHVwLiJ9" style="display:none;"></div>%%KC_END%%
*🎨 The five-step clearing-fractions workflow. The red warning box marks where repeated factors change the template.*
![Illustration](/generated/gptimage2-1777211001917-6205.png)

## 1. Method of Clearing Fractions

The clearing-fractions method is a reliable, general procedure that works for any proper rational function. Follow these five steps:

1. **Confirm the function is proper.** The degree of the numerator must be strictly less than the degree of the denominator. If not, perform polynomial long division first.
2. **Write the full partial-fraction template.** Assign an unknown constant to each required term.
3. **Multiply both sides by the common denominator.** Every fraction disappears, leaving a polynomial identity.
4. **Expand and group by powers of \(x\).** Collect all terms with \(x^3\), \(x^2\), \(x\), and the constant separately.
5. **Equate coefficients and solve.** Each power of \(x\) gives one equation; together they form a linear system.

### CRITICAL SETUP RULE

If a factor is repeated — for example \((x+3)^2\) — the template must include **both** \(\dfrac{k_3}{x+3}\) **and** \(\dfrac{k_4}{(x+3)^2}\). Omitting either term makes the template incomplete.

> **Exam Note:** If your starting template is wrong, every later calculation will be wrong even if the algebra is perfect.

$$\frac{x^3+3x^2+4x+6}{(x+1)(x+2)(x+3)^2}=\frac{k_1}{x+1}+\frac{k_2}{x+2}+\frac{k_3}{x+3}+\frac{k_4}{(x+3)^2}$$
*This is the correct template because the denominator contains two distinct linear factors, \((x+1)\) and \((x+2)\), each contributing one term, and one repeated linear factor \((x+3)^2\) of multiplicity 2, which requires a separate term for each power — one over \(x+3\) and one over \((x+3)^2\).*

## 2. Representative Example: Solve for the Constants

Using Example B.8, multiply both sides of the template by \((x+1)(x+2)(x+3)^2\). This removes all denominators and converts the equation into a polynomial identity that must hold for every value of \(x\).

Expanding the right side and collecting terms by power of \(x\) — that is, grouping all \(x^3\) terms, all \(x^2\) terms, all \(x\) terms, and all constant terms — then equating each group to the corresponding coefficient on the left side produces four linear equations in \(k_1\), \(k_2\), \(k_3\), and \(k_4\).

Solving that system gives:

$$
k_1 = 1, \quad k_2 = -2, \quad k_3 = 2, \quad k_4 = -3
$$

The completed expansion is shown in the formula block below.

### QUICK CHECK

**Why do we get four unknown constants instead of three?**
Because the repeated factor \((x+3)^2\) contributes two terms to the template, giving four terms total and therefore four unknowns.

> **Exam Note:** The number of unknown constants always equals the degree of the denominator polynomial.

$$\begin{aligned}k_1+k_2+k_3&=1\\8k_1+7k_2+6k_3+k_4&=3\\21k_1+15k_2+11k_3+3k_4&=4\\18k_1+9k_2+6k_3+2k_4&=6\end{aligned}$$
*These four equations come from equating the coefficients of \(x^3\), \(x^2\), \(x\), and the constant term on both sides of the polynomial identity obtained after clearing denominators and expanding.*

$$\frac{x^3+3x^2+4x+6}{(x+1)(x+2)(x+3)^2}=\frac{1}{x+1}-\frac{2}{x+2}+\frac{2}{x+3}-\frac{3}{(x+3)^2}$$
*This is the completed partial-fraction expansion, ready to be used directly in subsequent algebra or inverse \(z\)-transform calculations.*

## 3. Where the Cover-Up Method Fits

The clearing-fractions method works in all cases, but it requires solving a full linear system. When every factor in the denominator is distinct — meaning no factor is repeated — a faster shortcut is available.

The idea: for a term \(\dfrac{k_r}{x - \lambda_r}\), multiply \(F(x)\) by \((x - \lambda_r)\) and then substitute \(x = \lambda_r\). The multiplication cancels that one factor from the denominator, and the substitution makes every other term vanish, leaving \(k_r\) isolated.

### SCOPE CONDITION

This shortcut applies **only when \((x - \lambda_r)\) appears exactly once** among distinct linear factors. Do not apply it to a repeated factor such as \((x+3)^2\) — the cancellation logic breaks down there, and you must return to the fuller clearing-fractions setup.

> **Exam Note:** On tests, first inspect the denominator: distinct factors may allow cover-up; repeated factors usually push you back to a fuller setup.

$$k_r=(x-\lambda_r)F(x)\big|_{x=\lambda_r}$$
*This Heaviside cover-up formula directly isolates the coefficient \(k_r\) by canceling the distinct linear factor \((x - \lambda_r)\) and evaluating at its root \(x = \lambda_r\), but it is valid only when \((x - \lambda_r)\) appears exactly once among non-repeated linear factors.*

---
**📌 Key Takeaways**
- Repeated factors like \((x+3)^2\) require one term per power — never skip a level in the template.
- Clear denominators, expand, then equate coefficients of each power of \(x\) to find all constants.
- Cover-up is a fast shortcut for distinct linear factors only — not for repeated factors.

*In the next section we will apply faster coefficient-finding ideas to suitable partial-fraction forms.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InRlbXBsYXRlX3NldHVwIiwibGFiZWwiOiJDaG9vc2UgdGhlIGNvcnJlY3QgcGFydGlhbC1mcmFjdGlvbiB0ZW1wbGF0ZSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggaXMgdGhlIGNvcnJlY3QgcGFydGlhbC1mcmFjdGlvbiBmb3JtIGZvciBcXChGKHgpPVxcZGZyYWN7eF4zKzN4XjIrNHgrNn17KHgrMSkoeCsyKSh4KzMpXjJ9XFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoXFxkZnJhY3tBfXt4KzF9K1xcZGZyYWN7Qn17eCsyfStcXGRmcmFje0N9eyh4KzMpXjJ9XFwpIiwiQi4gXFwoXFxkZnJhY3tBfXt4KzF9K1xcZGZyYWN7Qn17eCsyfStcXGRmcmFje0N9e3grM30rXFxkZnJhY3tEfXsoeCszKV4yfVxcKSIsIkMuIFxcKFxcZGZyYWN7QX17KHgrMSkoeCsyKX0rXFxkZnJhY3tCfXsoeCszKV4yfVxcKSIsIkQuIFxcKFxcZGZyYWN7QX17eCsxfStcXGRmcmFje0J9e3grMn0rXFxkZnJhY3tDfXt4KzN9XFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiQSByZXBlYXRlZCBmYWN0b3IgXFwoKHgrMyleMlxcKSByZXF1aXJlcyBhIHRlcm0gZm9yIGVhY2ggcG93ZXI6IG9uZSBvdmVyIFxcKHgrM1xcKSBhbmQgb25lIG92ZXIgXFwoKHgrMyleMlxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJJdCBvbWl0cyB0aGUgXFwoMS8oeCszKVxcKSB0ZXJtIHJlcXVpcmVkIGJ5IHRoZSByZXBlYXRlZCBmYWN0b3IuIiwiQyI6IlRoaXMgaXMgbm90IHRoZSBzdGFuZGFyZCBkZWNvbXBvc2l0aW9uIGludG8gc2ltcGxlIHBhcnRpYWwgZnJhY3Rpb25zLiIsIkQiOiJJdCBpZ25vcmVzIHRoZSBleHRyYSB0ZXJtIGNhdXNlZCBieSB0aGUgcmVwZWF0ZWQgZmFjdG9yLiJ9LCJoaW50IjoiRm9yIGEgcmVwZWF0ZWQgbGluZWFyIGZhY3RvciwgaW5jbHVkZSBldmVyeSBwb3dlciB1cCB0byB0aGUgcmVwZWF0LiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJnZW5lcmF0ZV9pbWFnZSIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSWYgdGhlIGRlbm9taW5hdG9yIGNvbnRhaW5zIFxcKCh4LWEpXjNcXCksIHdoaWNoIHNldCBvZiB0ZXJtcyBtdXN0IGFwcGVhciBpbiB0aGUgcGFydGlhbC1mcmFjdGlvbiBzZXR1cD8iLCJvcHRpb25zIjpbIkEuIFxcKFxcZGZyYWN7QX17KHgtYSleM31cXCkgb25seSIsIkIuIFxcKFxcZGZyYWN7QX17eC1hfStcXGRmcmFje0J9eyh4LWEpXjJ9XFwpIiwiQy4gXFwoXFxkZnJhY3tBfXt4LWF9K1xcZGZyYWN7Qn17KHgtYSleMn0rXFxkZnJhY3tDfXsoeC1hKV4zfVxcKSIsIkQuIFxcKFxcZGZyYWN7QX17eC1hfStcXGRmcmFje0J9eyh4LWEpXjN9XFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiQSByZXBlYXRlZCBmYWN0b3Igb2YgbXVsdGlwbGljaXR5IDMgbmVlZHMgb25lIHRlcm0gZm9yIGVhY2ggcG93ZXIgZnJvbSAxIHRocm91Z2ggMy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIG1pc3NlcyB0aGUgbG93ZXItcG93ZXIgdGVybXMuIiwiQiI6IlRoaXMgc3RvcHMgdG9vIGVhcmx5IGFuZCBtaXNzZXMgdGhlIGN1YmljIHBvd2VyIHRlcm0uIiwiRCI6IlRoaXMgc2tpcHMgdGhlIHNxdWFyZWQgdGVybSwgc28gdGhlIHRlbXBsYXRlIGlzIGluY29tcGxldGUuIn0sImhpbnQiOiJDb3VudCB1cHdhcmQgZnJvbSBwb3dlciAxIHRvIHRoZSBoaWdoZXN0IHJlcGVhdGVkIHBvd2VyLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiY2xlYXJpbmdfYW5kX21hdGNoaW5nIiwibGFiZWwiOiJDbGVhciBkZW5vbWluYXRvcnMgYW5kIGVxdWF0ZSBjb2VmZmljaWVudHMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkFmdGVyIHdyaXRpbmcgdGhlIHBhcnRpYWwtZnJhY3Rpb24gZm9ybSB3aXRoIHVua25vd24gY29uc3RhbnRzLCB3aGF0IGlzIHRoZSBuZXh0IG1haW4gc3RlcCBpbiB0aGUgY2xlYXJpbmctZnJhY3Rpb25zIG1ldGhvZD8iLCJvcHRpb25zIjpbIkEuIFN1YnN0aXR1dGUgcmFuZG9tIFxcKHhcXCktdmFsdWVzIGltbWVkaWF0ZWx5IiwiQi4gTXVsdGlwbHkgYm90aCBzaWRlcyBieSB0aGUgY29tbW9uIGRlbm9taW5hdG9yIiwiQy4gRGlmZmVyZW50aWF0ZSBib3RoIHNpZGVzIiwiRC4gRmFjdG9yIHRoZSBudW1lcmF0b3IiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJNdWx0aXBseWluZyBieSB0aGUgY29tbW9uIGRlbm9taW5hdG9yIHJlbW92ZXMgZnJhY3Rpb25zIGFuZCB0dXJucyB0aGUgZXF1YXRpb24gaW50byBhIHBvbHlub21pYWwgaWRlbnRpdHkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhhdCBpcyBub3QgdGhlIHRleHRib29rIG1ldGhvZCBoZXJlIGFuZCBkb2VzIG5vdCBnZW5lcmFsbHkgcHJvZHVjZSBhbGwgZXF1YXRpb25zIGNsZWFubHkuIiwiQyI6IkRpZmZlcmVudGlhdGlvbiBpcyBub3QgcGFydCBvZiB0aGlzIG1ldGhvZC4iLCJEIjoiVGhlIG51bWVyYXRvciBkb2VzIG5vdCBuZWVkIHRvIGJlIGZhY3RvcmVkIGZpcnN0LiJ9LCJoaW50IjoiVGhlIG5hbWUgb2YgdGhlIG1ldGhvZCB0ZWxscyB5b3UgdGhlIHN0ZXAuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2h5IGRvZXMgZXF1YXRpbmcgY29lZmZpY2llbnRzIHdvcmsgYWZ0ZXIgZGVub21pbmF0b3JzIGFyZSBjbGVhcmVkPyIsIm9wdGlvbnMiOlsiQS4gQmVjYXVzZSB0aGUgdHdvIHNpZGVzIGFyZSBlcXVhbCBvbmx5IGF0IG9uZSBcXCh4XFwpLXZhbHVlIiwiQi4gQmVjYXVzZSBib3RoIHNpZGVzIGJlY29tZSBpZGVudGljYWwgcG9seW5vbWlhbHMgaW4gXFwoeFxcKSIsIkMuIEJlY2F1c2UgcmVwZWF0ZWQgZmFjdG9ycyBkaXNhcHBlYXIgY29tcGxldGVseSIsIkQuIEJlY2F1c2UgdGhlIGNvbnN0YW50cyBtdXN0IHN1bSB0byB6ZXJvIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiT25jZSB0aGUgaWRlbnRpdHkgaG9sZHMgZm9yIGFsbCBcXCh4XFwpLCBjb2VmZmljaWVudHMgb2YgbWF0Y2hpbmcgcG93ZXJzIG11c3QgYmUgZXF1YWwgb24gYm90aCBzaWRlcy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGUgaWRlbnRpdHkgbXVzdCBob2xkIGZvciBhbGwgXFwoeFxcKSwgbm90IGp1c3Qgb25lIHZhbHVlLiIsIkMiOiJSZXBlYXRlZCBmYWN0b3JzIGluZmx1ZW5jZSB0aGUgc2V0dXA7IHRoZXkgZG8gbm90IGp1c3RpZnkgY29lZmZpY2llbnQgbWF0Y2hpbmcuIiwiRCI6IlRoZXJlIGlzIG5vIHN1Y2ggZ2VuZXJhbCBydWxlLiJ9LCJoaW50IjoiVGhpbmsgb2YgcG9seW5vbWlhbCBpZGVudGl0eSwgbm90IG9uZS1wb2ludCBzdWJzdGl0dXRpb24uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwMl9xMyIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQSBzdHVkZW50IHdyaXRlcyB0aGUgY29ycmVjdCB0ZW1wbGF0ZSBmb3IgRXhhbXBsZSBCLjggYnV0IGZvcmdldHMgdGhlIFxcKFxcZGZyYWN7RH17KHgrMyleMn1cXCkgdGVybSBiZWZvcmUgY2xlYXJpbmcgZnJhY3Rpb25zLiBXaHkgaXMgdGhpcyBhIHNlcmlvdXMgc2V0dXAgZXJyb3I/IiwiaWRlYWxfYW5zd2VyIjoiQmVjYXVzZSB0aGUgZGVub21pbmF0b3IgaGFzIGEgcmVwZWF0ZWQgZmFjdG9yIFxcKCh4KzMpXjJcXCksIHRoZSBleHBhbnNpb24gbXVzdCBpbmNsdWRlIGJvdGggXFwoMS8oeCszKVxcKSBhbmQgXFwoMS8oeCszKV4yXFwpLiBPbWl0dGluZyB0aGUgc3F1YXJlZC10ZXJtIGZyYWN0aW9uIG1ha2VzIHRoZSBmb3JtIGluY29tcGxldGUsIHNvIGNvZWZmaWNpZW50IG1hdGNoaW5nIGNhbm5vdCBwcm9kdWNlIHRoZSBjb3JyZWN0IGlkZW50aXR5LiIsImdyYWRpbmdfcnVicmljIjpbIk11c3QgbWVudGlvbiB0aGUgcmVwZWF0ZWQgZmFjdG9yIFxcKCh4KzMpXjJcXCkiLCJNdXN0IHN0YXRlIHRoYXQgYm90aCBwb3dlcnMgbXVzdCBhcHBlYXIgaW4gdGhlIHRlbXBsYXRlIiwiTXVzdCBleHBsYWluIHRoYXQgYW4gaW5jb21wbGV0ZSB0ZW1wbGF0ZSBjYW5ub3QgbWF0Y2ggdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIGNvcnJlY3RseSJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQgdW5kZXJzdGFuZHMgdGhhdCBzZXR1cCBlcnJvcnMgY2Fubm90IGJlIHJlcGFpcmVkIGxhdGVyIGJ5IGFsZ2VicmEuIiwiaGludCI6IkFzayB3aGV0aGVyIHRoZSBtaXNzaW5nIHRlcm0gY291bGQgZXZlciBiZSByZWNyZWF0ZWQgYWZ0ZXIgdGhlIGRlbm9taW5hdG9ycyBhcmUgY2xlYXJlZC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJjb3Zlcl91cF9zY29wZSIsImxhYmVsIjoiS25vdyB3aGVuIHRoZSBjb3Zlci11cCBtZXRob2QgYXBwbGllcyIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciB3aGljaCBkZW5vbWluYXRvciBzdHJ1Y3R1cmUgaXMgdGhlIEhlYXZpc2lkZSBjb3Zlci11cCBtZXRob2QgaW50cm9kdWNlZCBoZXJlIGFzIGEgZGlyZWN0IHNob3J0Y3V0PyIsIm9wdGlvbnMiOlsiQS4gRGlzdGluY3QgbGluZWFyIGZhY3RvcnMgb25seSIsIkIuIEFueSByZXBlYXRlZCBmYWN0b3IgY2FzZSIsIkMuIElycmVkdWNpYmxlIHF1YWRyYXRpYyBmYWN0b3JzIG9ubHkiLCJELiBBbnkgZGVub21pbmF0b3IsIG5vIHJlc3RyaWN0aW9ucyJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlRoZSB0ZXh0Ym9vayBpbnRyb2R1Y2VzIGNvdmVyLXVwIGhlcmUgZm9yIGRpc3RpbmN0LCBub24tcmVwZWF0ZWQgZmFjdG9ycy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJSZXBlYXRlZCBmYWN0b3JzIGFyZSBleGFjdGx5IHdoZXJlIHRoZSBzaG9ydGN1dCBpcyBub3QgdGhlIHNpbXBsZSBkZWZhdWx0IGhlcmUuIiwiQyI6IlRoYXQgaXMgbm90IHRoZSBjYXNlIGRpc2N1c3NlZCBpbiB0aGlzIHN1YnNlY3Rpb24uIiwiRCI6IlRoZSBtZXRob2QgaGFzIGEgc2NvcGUgY29uZGl0aW9uOyBpdCBpcyBub3QgdW5yZXN0cmljdGVkLiJ9LCJoaW50IjoiTG9vayBmb3IgdGhlIHBocmFzZSAnZGlzdGluY3QgZmFjdG9ycy4nIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hhdCBkb2VzIHRoZSBmb3JtdWxhIFxcKGtfcj0oeC1cXGxhbWJkYV9yKUYoeClcXGJpZ3xfe3g9XFxsYW1iZGFfcn1cXCkgZG8/Iiwib3B0aW9ucyI6WyJBLiBGaW5kcyBhIGNvZWZmaWNpZW50IGJ5IGNhbmNlbGluZyBvbmUgZGlzdGluY3QgbGluZWFyIGZhY3RvciBhbmQgdGhlbiBzdWJzdGl0dXRpbmcgaXRzIHJvb3QiLCJCLiBTb2x2ZXMgdGhlIGVudGlyZSByZXBlYXRlZC1mYWN0b3IgcHJvYmxlbSBpbiBvbmUgc3RlcCIsIkMuIENvbXB1dGVzIHRoZSBudW1lcmF0b3IgcG9seW5vbWlhbCBkZWdyZWUiLCJELiBDaGVja3Mgd2hldGhlciBhIGZ1bmN0aW9uIGlzIHByb3BlciJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6Ikl0IGlzb2xhdGVzIHRoZSBjb2VmZmljaWVudCBhdHRhY2hlZCB0byB0aGUgdGVybSBvdmVyIHRoZSBkaXN0aW5jdCBmYWN0b3IgXFwoeC1cXGxhbWJkYV9yXFwpIGJ5IGNhbmNlbGluZyB0aGF0IGZhY3RvciBhbmQgZXZhbHVhdGluZyBhdCBpdHMgcm9vdC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGUgZm9ybXVsYSBpcyBub3QgcHJlc2VudGVkIGFzIHRoZSBvbmUtc3RlcCBmaXggZm9yIHJlcGVhdGVkLWZhY3RvciBzZXR1cHMuIiwiQyI6Ikl0IGhhcyBub3RoaW5nIHRvIGRvIHdpdGggZGVncmVlIGNvdW50aW5nLiIsIkQiOiJQcm9wZXJuZXNzIGlzIGNoZWNrZWQgYnkgY29tcGFyaW5nIGRlZ3JlZXMsIG5vdCBieSB0aGlzIGZvcm11bGEuIn0sImhpbnQiOiJUaGluayAnaXNvbGF0ZSBvbmUgY29lZmZpY2llbnQsJyBub3QgJ3NvbHZlIGV2ZXJ5dGhpbmcuJyIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
