%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6Im1hdHBsb3RsaWIiLCJyYXRpb25hbGUiOiJObyB0ZXh0Ym9vayBmaWd1cmUgY3JvcHMgYXJlIGF2YWlsYWJsZSwgYnV0IHRoaXMgc2VjdGlvbiBiZW5lZml0cyBmcm9tIGEgY2xlYW4gc3RydWN0dXJlLWZpcnN0IHZpc3VhbDogZmFjdG9yaXplZCBkZW5vbWluYXRvciB0byBwYXJ0aWFsLWZyYWN0aW9uIHRlbXBsYXRlIHRvIGNsZWFyZWQtcG9seW5vbWlhbCBpZGVudGl0eS4gQSBnZW5lcmF0ZWQgZGlhZ3JhbSBjYW4gbWFrZSB0aGUgd29ya2Zsb3cgZWFzaWVyIHRvIHNlZSB0aGFuIGEgZGVuc2UgcGFnZSBvZiBhbGdlYnJhLiIsImNyYW0iOiJVc2UgdGhlIHZpc3VhbCBhcyBhIGZhc3QgY2hlY2tsaXN0OiBjaG9vc2UgdGVybXMgZnJvbSBmYWN0b3JzLCBtdWx0aXBseSB0aHJvdWdoLCBlcXVhdGUgY29lZmZpY2llbnRzLCBzb2x2ZSBjb25zdGFudHMuIiwic3RhbmRhcmQiOiJVc2UgdGhlIHZpc3VhbCB0byBzaG93IHRoZSBmdWxsIG1ldGhvZCBvbmNlIHdpdGggb25lIHJlcHJlc2VudGF0aXZlIGV4YW1wbGUsIHNvIHRoZSBhbGdlYnJhIHN0ZXBzIGZlZWwgb3JnYW5pemVkIHJhdGhlciB0aGFuIHJhbmRvbS4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhlIHZpc3VhbCB0byBlbXBoYXNpemUgdGhlIHJlcGVhdGVkLWZhY3RvciBkZXRhaWwgYW5kIHRoZSBjb21tb24gdHJhcCBvZiBvbWl0dGluZyB0aGUgc3F1YXJlZC1mYWN0b3IgdGVybSBvciBtaXNzaW5nIG9uZSBkZW5vbWluYXRvciB0ZXJtLiJ9" style="display:none;"></div>%%KC_END%%
# B.5-1 Method of Clearing Fractions

> **Section Objective:** Learn one reliable, general method for finding partial-fraction constants: set up the correct form, clear denominators, then match coefficients.

---

Partial-fraction decomposition is a core algebraic skill tested on nearly every signals and systems exam. This section teaches the **clearing-fractions method**: a three-step process that works for any rational function with distinct or repeated linear factors.

The method is general and dependable. The trade-off is that it can become algebra-heavy, especially when the denominator has many factors. Careful, organized work is the key to avoiding errors.

> **Heads up:** The main example in this section has a **repeated factor** — \((x+3)^2\) — which means the setup step is especially important. Getting the template right before touching any algebra is half the battle.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVHJlYXQgaXQgYXMgYSBmb3VyLXN0ZXAgZXhhbSBjaGVja2xpc3QgdG8gbWVtb3JpemUgcXVpY2tseS4iLCJzdGFuZGFyZCI6IlVzZSBpdCB0byBjb25uZWN0IHRoZSBzZXR1cCwgY2xlYXJpbmcsIGNvZWZmaWNpZW50LW1hdGNoaW5nLCBhbmQgc29sdmluZyBzdGVwcyBpbiBvbmUgdmlldy4iLCJ0b3Bfc2NvcmUiOiJVc2UgaXQgdG8gc3BvdGxpZ2h0IHJlcGVhdGVkLWZhY3RvciB0ZXJtcyBhbmQgc2V0dXAgbWlzdGFrZXMgYmVmb3JlIHRoZSBhbGdlYnJhIGJlZ2lucy4ifQ==" style="display:none;"></div>%%KC_END%%
*📊 The four-step clearing-fractions workflow. Note the side callout at Step 1: a repeated factor \((x+3)^2\) always requires two separate terms in the template.*
![Chart](/generated/fig-1777195385995-towcgucf.png)

## 1. Set Up the Correct Partial-Fraction Form

Before any algebra begins, inspect the denominator and assign one unknown constant to each required term.

For the textbook example:

$$
F(x) = \frac{x^3+3x^2+4x+6}{(x+1)(x+2)(x+3)^2}
$$

The denominator has three distinct factors: \((x+1)\), \((x+2)\), and \((x+3)^2\). The first two are simple linear factors, so each gets one term. The factor \((x+3)^2\) is **repeated** — it appears to the second power — so it requires **two** terms: one with denominator \((x+3)\) and one with denominator \((x+3)^2\).

### COMMON MISTAKE

Writing only \(\dfrac{k_3}{(x+3)^2}\) for the repeated factor and skipping the \(\dfrac{k_3}{x+3}\) term. This produces an incomplete template and the entire method breaks down from that point forward.

#### Rule
For a factor \((x+a)^n\), include one term for every power from \(1\) up to \(n\).

$$\frac{x^3+3x^2+4x+6}{(x+1)(x+2)(x+3)^2}=\frac{k_1}{x+1}+\frac{k_2}{x+2}+\frac{k_3}{x+3}+\frac{k_4}{(x+3)^2}$$
*The denominator structure dictates the partial-fraction template: each simple linear factor contributes one term, and the repeated factor \((x+3)^2\) contributes two separate terms — one for each power.*

## 2. Clear Fractions and Equate Coefficients

With the template in place, multiply **both sides** by the full common denominator \((x+1)(x+2)(x+3)^2\). Every fraction cancels, and you are left with a pure polynomial equation — no denominators anywhere.

Expand the right-hand side by distributing each constant \(k_i\) through its corresponding polynomial factor. After collecting all terms by powers of \(x\), the left side and right side are two polynomials that must be **identical for every value of \(x\)**.

That is the key insight: if two polynomials are equal for all \(x\), then the coefficient of \(x^3\) on the left must equal the coefficient of \(x^3\) on the right, and the same holds for \(x^2\), \(x^1\), and the constant term. This gives four equations in four unknowns.

### EXAM TIP

This method is reliable, but most errors come from **expansion mistakes** — a dropped sign or a missed cross-term. Write each product out fully before collecting.

$$x^3+3x^2+4x+6 = k_1(x^3+8x^2+21x+18)+k_2(x^3+7x^2+15x+9)+k_3(x^3+6x^2+11x+6)+k_4(x^2+3x+2)$$
*After clearing denominators, each \(k_i\) multiplies a fully expanded polynomial, so the unknown constants can be found by matching the coefficients of \(x^3\), \(x^2\), \(x\), and the constant term on both sides.*

$$\begin{aligned}k_1+k_2+k_3&=1\\8k_1+7k_2+6k_3+k_4&=3\\21k_1+15k_2+11k_3+3k_4&=4\\18k_1+9k_2+6k_3+2k_4&=6\end{aligned}$$
*These four simultaneous equations come directly from equating the coefficients of \(x^3\), \(x^2\), \(x^1\), and \(x^0\) on both sides of the cleared polynomial identity.*

## 3. Solve the Constants and Write the Final Expansion

Solving the four simultaneous equations gives:

$$
k_1 = 1, \quad k_2 = -2, \quad k_3 = 2, \quad k_4 = -3
$$

Substitute each constant back into the template from Step 1. The original rational function is now expressed as four simpler fractions — each much easier to work with in later calculations such as inverse transforms.

### QUICK CHECK

Count the terms in your final answer. It must contain **exactly** the same denominator terms as the setup: \((x+1)\), \((x+2)\), \((x+3)\), and \((x+3)^2\). If any term is missing or an extra term appears, the setup was wrong.

$$\frac{x^3+3x^2+4x+6}{(x+1)(x+2)(x+3)^2}=\frac{1}{x+1}-\frac{2}{x+2}+\frac{2}{x+3}-\frac{3}{(x+3)^2}$$
*This is the completed partial-fraction expansion: each unknown constant has been solved and placed back into its corresponding denominator term from the original template.*

---
**📌 Key Takeaways**
- The denominator's factor structure determines the partial-fraction template — repeated factors need multiple terms.
- Multiplying both sides by the common denominator clears all fractions and produces a polynomial identity.
- Repeated factors such as \((x+a)^2\) require one term for each power, from 1 up to the full power.

*In the next section we will learn a faster method for some cases.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InNldHVwX2Zyb21fZmFjdG9ycyIsImxhYmVsIjoiQ2hvb3NlIHRoZSBjb3JyZWN0IHBhcnRpYWwtZnJhY3Rpb24gZm9ybSBmcm9tIGRlbm9taW5hdG9yIGZhY3RvcnMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGlzIHRoZSBjb3JyZWN0IHBhcnRpYWwtZnJhY3Rpb24gc2V0dXAgZm9yIFxcKFxcZGZyYWN7eF4zKzN4XjIrNHgrNn17KHgrMSkoeCsyKSh4KzMpXjJ9XFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoXFxkZnJhY3trXzF9e3grMX0rXFxkZnJhY3trXzJ9e3grMn0rXFxkZnJhY3trXzN9eyh4KzMpXjJ9XFwpIiwiQi4gXFwoXFxkZnJhY3trXzF9e3grMX0rXFxkZnJhY3trXzJ9e3grMn0rXFxkZnJhY3trXzN9e3grM30rXFxkZnJhY3trXzR9eyh4KzMpXjJ9XFwpIiwiQy4gXFwoXFxkZnJhY3trXzF9e3grMX0rXFxkZnJhY3trXzJ9e3grMn0rXFxkZnJhY3trXzN4K2tfNH17eCszfVxcKSIsIkQuIFxcKFxcZGZyYWN7a18xfXsoeCsxKSh4KzIpfStcXGRmcmFje2tfMn17KHgrMyleMn1cXCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJBIHJlcGVhdGVkIGxpbmVhciBmYWN0b3IgXFwoKHgrMyleMlxcKSByZXF1aXJlcyB0d28gdGVybXM6IG9uZSBvdmVyIFxcKCh4KzMpXFwpIGFuZCBvbmUgb3ZlciBcXCgoeCszKV4yXFwpLCBpbiBhZGRpdGlvbiB0byB0aGUgdGVybXMgZm9yIFxcKCh4KzEpXFwpIGFuZCBcXCgoeCsyKVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJJdCBvbWl0cyB0aGUgcmVxdWlyZWQgXFwoMS8oeCszKVxcKSB0ZXJtIGZvciB0aGUgcmVwZWF0ZWQgZmFjdG9yLiIsIkMiOiJBIGxpbmVhciBudW1lcmF0b3IgaXMgbm90IHVzZWQgaGVyZSBiZWNhdXNlIHRoZSBmYWN0b3JzIGFyZSBsaW5lYXIsIG5vdCBpcnJlZHVjaWJsZSBxdWFkcmF0aWMuIiwiRCI6Ikl0IGdyb3VwcyBmYWN0b3JzIGluY29ycmVjdGx5IGFuZCBkb2VzIG5vdCBtYXRjaCB0aGUgc3RhbmRhcmQgZGVjb21wb3NpdGlvbiBmb3JtLiJ9LCJoaW50IjoiTGlzdCBvbmUgdGVybSBmb3IgZWFjaCBsaW5lYXIgZmFjdG9yIHBvd2VyIHRoYXQgYXBwZWFycyBpbiB0aGUgZGVub21pbmF0b3IuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJZiBhIGRlbm9taW5hdG9yIGNvbnRhaW5zIFxcKCh4LTQpXjJcXCksIHdoaWNoIHBhaXIgb2YgdGVybXMgbXVzdCBhcHBlYXIgaW4gdGhlIHBhcnRpYWwtZnJhY3Rpb24gZXhwYW5zaW9uPyIsIm9wdGlvbnMiOlsiQS4gXFwoXFxkZnJhY3tBfXt4LTR9XFwpIG9ubHkiLCJCLiBcXChcXGRmcmFje0F9eyh4LTQpXjJ9XFwpIG9ubHkiLCJDLiBcXChcXGRmcmFje0F9e3gtNH0rXFxkZnJhY3tCfXsoeC00KV4yfVxcKSIsIkQuIFxcKFxcZGZyYWN7QXgrQn17KHgtNCleMn1cXCkiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJGb3IgYSByZXBlYXRlZCBsaW5lYXIgZmFjdG9yIG9mIHBvd2VyIDIsIHRoZSBleHBhbnNpb24gbXVzdCBpbmNsdWRlIG9uZSB0ZXJtIGZvciBlYWNoIHBvd2VyIGZyb20gMSB1cCB0byAyLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgbWlzc2VzIHRoZSBzcXVhcmVkLWZhY3RvciB0ZXJtLiIsIkIiOiJUaGlzIG1pc3NlcyB0aGUgZmlyc3QtcG93ZXIgdGVybS4iLCJEIjoiVGhhdCBudW1lcmF0b3IgZm9ybSBpcyBmb3IgYW4gaXJyZWR1Y2libGUgcXVhZHJhdGljIGRlbm9taW5hdG9yLCBub3QgYSByZXBlYXRlZCBsaW5lYXIgZmFjdG9yLiJ9LCJoaW50IjoiUmVwZWF0ZWQgbGluZWFyIGZhY3RvcnMgcHJvZHVjZSBhIHN0YWNrIG9mIHRlcm1zIHdpdGggaW5jcmVhc2luZyBwb3dlcnMgaW4gdGhlIGRlbm9taW5hdG9yLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiY2xlYXJpbmdfYW5kX21hdGNoaW5nIiwibGFiZWwiOiJDbGVhciBkZW5vbWluYXRvcnMgYW5kIG1hdGNoIGNvZWZmaWNpZW50cyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQWZ0ZXIgd3JpdGluZyBhIGNvcnJlY3QgcGFydGlhbC1mcmFjdGlvbiBzZXR1cCwgd2hhdCBpcyB0aGUgbmV4dCBzdGVwIGluIHRoZSBjbGVhcmluZy1mcmFjdGlvbnMgbWV0aG9kPyIsIm9wdGlvbnMiOlsiQS4gU3Vic3RpdHV0ZSByYW5kb20gdmFsdWVzIG9mIFxcKHhcXCkgaW1tZWRpYXRlbHkiLCJCLiBNdWx0aXBseSBib3RoIHNpZGVzIGJ5IHRoZSBjb21tb24gZGVub21pbmF0b3IiLCJDLiBEaWZmZXJlbnRpYXRlIGJvdGggc2lkZXMiLCJELiBGYWN0b3IgdGhlIG51bWVyYXRvciJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBtZXRob2QgaXMgY2FsbGVkIGNsZWFyaW5nIGZyYWN0aW9ucyBiZWNhdXNlIHlvdSByZW1vdmUgYWxsIGRlbm9taW5hdG9ycyBmaXJzdCBieSBtdWx0aXBseWluZyBieSB0aGUgZnVsbCBjb21tb24gZGVub21pbmF0b3IuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhhdCBpcyBub3QgdGhlIHN0YW5kYXJkIG5leHQgc3RlcCBpbiB0aGlzIG1ldGhvZC4iLCJDIjoiRGlmZmVyZW50aWF0aW9uIGlzIHVucmVsYXRlZCBoZXJlLiIsIkQiOiJGYWN0b3JpbmcgdGhlIG51bWVyYXRvciBpcyBub3QgdGhlIGtleSBzdGVwIGZvciBmaW5kaW5nIHRoZSBjb25zdGFudHMuIn0sImhpbnQiOiJUaGUgbWV0aG9kIG5hbWUgaXRzZWxmIHRlbGxzIHlvdSB0aGUgbmV4dCBtb3ZlLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoeSBpcyBpdCB2YWxpZCB0byBlcXVhdGUgY29lZmZpY2llbnRzIGFmdGVyIGNsZWFyaW5nIGZyYWN0aW9ucyBhbmQgZXhwYW5kaW5nPyIsIm9wdGlvbnMiOlsiQS4gQmVjYXVzZSB0aGUgZGVub21pbmF0b3JzIGFyZSBhbGwgbGluZWFyIiwiQi4gQmVjYXVzZSB0aGUgY29uc3RhbnRzIGFyZSBpbnRlZ2VycyIsIkMuIEJlY2F1c2UgdGhlIHR3byBzaWRlcyBhcmUgZXF1YWwgcG9seW5vbWlhbHMgaW4gXFwoeFxcKSIsIkQuIEJlY2F1c2UgXFwoeFxcKSBpcyBsYXRlciBzZXQgZXF1YWwgdG8gMCJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6Ik9uY2UgdGhlIGRlbm9taW5hdG9ycyBhcmUgY2xlYXJlZCwgdGhlIGVxdWF0aW9uIGJlY29tZXMgYSBwb2x5bm9taWFsIGlkZW50aXR5LCBzbyBtYXRjaGluZyBwb3dlcnMgb2YgXFwoeFxcKSBtdXN0IGhhdmUgZXF1YWwgY29lZmZpY2llbnRzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkxpbmVhciBmYWN0b3JzIGFyZSBub3QgdGhlIHJlYXNvbiBjb2VmZmljaWVudCBtYXRjaGluZyB3b3Jrcy4iLCJCIjoiVGhlIGNvbnN0YW50cyBkbyBub3QgbmVlZCB0byBiZSBpbnRlZ2VycyBmb3IgdGhlIG1ldGhvZCB0byB3b3JrLiIsIkQiOiJDb2VmZmljaWVudCBtYXRjaGluZyBpcyBub3QgYmFzZWQgb24gcGx1Z2dpbmcgaW4gb25seSBvbmUgdmFsdWUgb2YgXFwoeFxcKS4ifSwiaGludCI6IlRoaW5rIGFib3V0IHdoYXQga2luZCBvZiBleHByZXNzaW9uIHJlbWFpbnMgYWZ0ZXIgZXZlcnkgZGVub21pbmF0b3IgaXMgcmVtb3ZlZC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTMiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkEgc3R1ZGVudCB3cml0ZXMgdGhlIGNvcnJlY3Qgc2V0dXAgZm9yIHRoZSBleGFtcGxlIGJ1dCBmb3JnZXRzIHRoZSBcXChcXGRmcmFje2tfNH17KHgrMyleMn1cXCkgdGVybSBiZWZvcmUgY2xlYXJpbmcgZnJhY3Rpb25zLiBXaGF0IHNwZWNpZmljIHByb2JsZW0gd2lsbCB0aGlzIGNhdXNlIGxhdGVyPyIsImlkZWFsX2Fuc3dlciI6IlRoZSBkZWNvbXBvc2l0aW9uIHdpbGwgbm90IGhhdmUgZW5vdWdoIHRlcm1zIHRvIHJlcHJlc2VudCB0aGUgb3JpZ2luYWwgZnVuY3Rpb24gY29ycmVjdGx5LCBiZWNhdXNlIGEgcmVwZWF0ZWQgZmFjdG9yIFxcKCh4KzMpXjJcXCkgcmVxdWlyZXMgYm90aCBcXCgxLyh4KzMpXFwpIGFuZCBcXCgxLyh4KzMpXjJcXCkuIEFueSBjb2VmZmljaWVudCBlcXVhdGlvbnMgZm9ybWVkIGFmdGVyd2FyZCBjb21lIGZyb20gYW4gaW5jb21wbGV0ZSBtb2RlbCwgc28gdGhlIGZpbmFsIGFuc3dlciBjYW5ub3QgYmUgY29ycmVjdC4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IHN0YXRlIHRoYXQgdGhlIHJlcGVhdGVkIGZhY3RvciByZXF1aXJlcyBib3RoIGRlbm9taW5hdG9yIHBvd2VycyIsIk11c3QgZXhwbGFpbiB0aGF0IHRoZSBzZXR1cCBiZWNvbWVzIGluY29tcGxldGUiLCJNdXN0IHNheSB0aGUgcmVzdWx0aW5nIGVxdWF0aW9ucyBvciBmaW5hbCBkZWNvbXBvc2l0aW9uIHdpbGwgYmUgaW5jb3JyZWN0Il0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCB1bmRlcnN0YW5kcyB0aGF0IHNldHVwIGVycm9ycyBicmVhayB0aGUgZW50aXJlIG1ldGhvZCBiZWZvcmUgdGhlIGFsZ2VicmEgZXZlbiBzdGFydHMuIiwiaGludCI6IkZvY3VzIG9uIHRoZSByb2xlIG9mIHJlcGVhdGVkIGZhY3RvcnMgaW4gdGhlIHRlbXBsYXRlLCBub3Qgb24gYXJpdGhtZXRpYyBtaXN0YWtlcy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJmaW5hbF9yZXN1bHRfcmVjb2duaXRpb24iLCJsYWJlbCI6IlJlY29nbml6ZSB0aGUgc29sdmVkIGNvbnN0YW50cyBhbmQgZmluYWwgZXhwYW5zaW9uIiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSWYgdGhlIHNvbHZlZCBjb25zdGFudHMgYXJlIFxcKGtfMT0xXFwpLCBcXChrXzI9LTJcXCksIFxcKGtfMz0yXFwpLCBhbmQgXFwoa180PS0zXFwpLCB3aGljaCBmaW5hbCBleHBhbnNpb24gaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIFxcKFxcZGZyYWN7MX17eCsxfS1cXGRmcmFjezJ9e3grMn0rXFxkZnJhY3syfXt4KzN9LVxcZGZyYWN7M317KHgrMyleMn1cXCkiLCJCLiBcXChcXGRmcmFjezF9e3grMX0rXFxkZnJhY3syfXt4KzJ9K1xcZGZyYWN7Mn17eCszfS1cXGRmcmFjezN9eyh4KzMpXjJ9XFwpIiwiQy4gXFwoXFxkZnJhY3sxfXt4KzF9LVxcZGZyYWN7Mn17eCsyfS1cXGRmcmFjezJ9e3grM30tXFxkZnJhY3szfXsoeCszKV4yfVxcKSIsIkQuIFxcKFxcZGZyYWN7MX17eCsxfS1cXGRmcmFjezJ9e3grMn0rXFxkZnJhY3syfXsoeCszKV4yfS1cXGRmcmFjezN9e3grM31cXCkiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJFYWNoIHNvbHZlZCBjb25zdGFudCBtdXN0IGJlIHBsYWNlZCBiYWNrIGludG8gdGhlIHNhbWUgZGVub21pbmF0b3IgdGVybSBmcm9tIHRoZSBvcmlnaW5hbCBzZXR1cC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGUgc2lnbiBvZiB0aGUgXFwoMS8oeCsyKVxcKSB0ZXJtIGlzIHdyb25nLiIsIkMiOiJUaGUgc2lnbiBvZiB0aGUgXFwoMS8oeCszKVxcKSB0ZXJtIGlzIHdyb25nLiIsIkQiOiJUaGUgY29lZmZpY2llbnRzIGZvciB0aGUgdHdvIFxcKCh4KzMpXFwpLWJhc2VkIHRlcm1zIGFyZSBhdHRhY2hlZCB0byB0aGUgd3JvbmcgZGVub21pbmF0b3JzLiJ9LCJoaW50IjoiTWF0Y2ggZWFjaCBjb25zdGFudCB0byBpdHMgZXhhY3QgZGVub21pbmF0b3IgZnJvbSB0aGUgc2V0dXAgYmVmb3JlIGNoZWNraW5nIHNpZ25zLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
