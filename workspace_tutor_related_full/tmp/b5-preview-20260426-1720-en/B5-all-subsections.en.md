# B.5-1 Method of Clearing Fractions

- sectionId: `b.5-1`
- cached: `None`
- figures: `0`
- page_refs: `0`
- matplotlib_hint: `False`
- figure_unavailable_text: `False`
- file: `/Users/chenghaoxiang/.openclaw/workspace/tmp/b5-preview-20260426-1720-en/b.5-1.en.md`

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



---

# B.5-2 The Heaviside "Cover-Up" Method

- sectionId: `b.5-2`
- cached: `None`
- figures: `0`
- page_refs: `0`
- matplotlib_hint: `False`
- figure_unavailable_text: `False`
- file: `/Users/chenghaoxiang/.openclaw/workspace/tmp/b5-preview-20260426-1720-en/b.5-2.en.md`

# B.5-2 The Heaviside "Cover-Up" Method

---

## Page 1: Section Overview

Welcome! In this section, we're going to learn one of the most satisfying shortcuts in all of mathematics — the **Heaviside "Cover-Up" Method** for partial fraction expansion.

### What's the Big Picture?

Remember that partial fractions let us break a complicated rational function like:

$$F(x) = \frac{2x^2 + 9x - 11}{(x+1)(x-2)(x+3)}$$

into simpler pieces like:

$$F(x) = \frac{3}{x+1} + \frac{1}{x-2} - \frac{2}{x+3}$$

The old way (solving simultaneous equations) works, but it can be slow and tedious. The **Heaviside method** lets you find each coefficient *almost instantly* — sometimes in your head!

### What We'll Cover

| Topic | What You'll Learn |
|---|---|
| **Distinct real factors** | The core "cover-up" trick |
| **Complex factors** | Applying the same trick to complex roots |
| **Quadratic factors** | Combining complex pairs into one quadratic term |
| **Shortcuts** | Smart substitutions to find remaining unknowns |

### The Core Idea in One Sentence

> To find the coefficient for a particular factor, **cover it up** with your finger, then **plug in the root** of that factor into what's left.

That's really it. Let's build up the full picture, step by step.

---

## Page 2: The Formula Behind the Method

### Why Does "Covering Up" Actually Work?

Let's derive this properly so it makes complete sense.

Suppose we have a proper rational function with **distinct** (non-repeated) factors in the denominator:

$$F(x) = \frac{P(x)}{(x - \lambda_1)(x - \lambda_2) \cdots (x - \lambda_n)}$$

Its partial fraction expansion looks like:

$$F(x) = \frac{k_1}{x - \lambda_1} + \frac{k_2}{x - \lambda_2} + \cdots + \frac{k_n}{x - \lambda_n} \tag{B.23}$$

### Isolating One Coefficient

To find $$k_1$$, multiply **both sides** by $$(x - \lambda_1)$$:

$$(x - \lambda_1) F(x) = k_1 + \frac{k_2(x-\lambda_1)}{x-\lambda_2} + \frac{k_3(x-\lambda_1)}{x-\lambda_3} + \cdots$$

Now let $$x = \lambda_1$$. Every term on the right **except** $$k_1$$ contains a factor $$(x - \lambda_1)$$, which becomes **zero**. So:

$$k_1 = (x - \lambda_1) F(x)\Big|_{x = \lambda_1}$$

### The General Formula

The same logic works for any coefficient:

$$\boxed{k_r = (x - \lambda_r)\, F(x)\Big|_{x = \lambda_r}} \quad r = 1, 2, \ldots, n \tag{B.24}$$

### What Does "Cover Up" Mean Physically?

When you compute $$(x - \lambda_r) \cdot F(x)$$, you're multiplying the numerator by $$(x - \lambda_r)$$ and dividing by the denominator. But the denominator **already contains** $$(x - \lambda_r)$$, so they **cancel**!

The result: you just **remove** (cover up) the factor $$(x - \lambda_r)$$ from the denominator, then substitute $$x = \lambda_r$$ into everything else.

> 💡 **Mental image:** Put your finger over the factor you're solving for. Evaluate what you can still see at the root of that factor.

---

## Page 3: The Cover-Up Method — Worked Example with Real Factors

### Example B.9 — Step by Step

Find the partial fraction expansion of:

$$F(x) = \frac{2x^2 + 9x - 11}{(x+1)(x-2)(x+3)} = \frac{k_1}{x+1} + \frac{k_2}{x-2} + \frac{k_3}{x+3}$$

The three factors are $$(x+1)$$, $$(x-2)$$, and $$(x+3)$$, with roots $$x = -1$$, $$x = 2$$, and $$x = -3$$.

---

### Finding $$k_1$$: Cover up $$(x+1)$$, set $$x = -1$$

$$k_1 = \frac{2x^2 + 9x - 11}{\cancel{(x+1)}(x-2)(x+3)}\Bigg|_{x=-1} = \frac{2(-1)^2 + 9(-1) - 11}{(-1-2)(-1+3)}$$

$$= \frac{2 - 9 - 11}{(-3)(2)} = \frac{-18}{-6} = \boxed{3}$$

---

### Finding $$k_2$$: Cover up $$(x-2)$$, set $$x = 2$$

$$k_2 = \frac{2x^2 + 9x - 11}{(x+1)\cancel{(x-2)}(x+3)}\Bigg|_{x=2} = \frac{2(4) + 9(2) - 11}{(2+1)(2+3)}$$

$$= \frac{8 + 18 - 11}{(3)(5)} = \frac{15}{15} = \boxed{1}$$

---

### Finding $$k_3$$: Cover up $$(x+3)$$, set $$x = -3$$

$$k_3 = \frac{2x^2 + 9x - 11}{(x+1)(x-2)\cancel{(x+3)}}\Bigg|_{x=-3} = \frac{2(9) + 9(-3) - 11}{(-3+1)(-3-2)}$$

$$= \frac{18 - 27 - 11}{(-2)(-5)} = \frac{-20}{10} = \boxed{-2}$$

---

### Final Answer

$$\boxed{F(x) = \frac{3}{x+1} + \frac{1}{x-2} - \frac{2}{x+3}}$$

> ✅ **Notice how fast that was!** Three independent calculations, no simultaneous equations needed.

---

## Page 4: Handling Complex Factors

### The Good News

The cover-up formula works **exactly the same way** even when the roots are complex numbers. The algebra gets a bit messier, but the method is identical.

### Example

$$F(x) = \frac{4x^2 + 2x + 18}{(x+1)(x+2-j3)(x+2+j3)} = \frac{k_1}{x+1} + \frac{k_2}{x+2-j3} + \frac{k_3}{x+2+j3} \tag{B.25}$$

The three roots are: $$\lambda_1 = -1$$, $$\lambda_2 = -2+j3$$, $$\lambda_3 = -2-j3$$

---

### Finding $$k_1$$: Cover up $$(x+1)$$, set $$x = -1$$

$$k_1 = \frac{4(1) + 2(-1) + 18}{(-1+2-j3)(-1+2+j3)} = \frac{4 - 2 + 18}{(1-j3)(1+j3)} = \frac{20}{1+9} = \frac{20}{10} = \boxed{2}$$

---

### Finding $$k_2$$: Cover up $$(x+2-j3)$$, set $$x = -2+j3$$

After substituting (the algebra is involved but mechanical):

$$k_2 = 1 + j2 = \sqrt{5}\, e^{j63.43°}$$

---

### Key Observation: Conjugate Pairs

When the rational function has **real coefficients**, the coefficients for complex-conjugate factors are always **conjugates of each other**:

$$k_3 = k_2^* = 1 - j2 = \sqrt{5}\, e^{-j63.43°}$$

> 💡 **Shortcut:** For real-coefficient functions, you only need to compute **one** of a conjugate pair — the other is automatically its complex conjugate!

---

### Final Result

$$F(x) = \frac{2}{x+1} + \frac{\sqrt{5}\,e^{j63.43°}}{x+2-j3} + \frac{\sqrt{5}\,e^{-j63.43°}}{x+2+j3}$$

---

## Page 5: Combining Complex Pairs into Quadratic Factors

### Why Bother with Quadratics?

Complex coefficients like $$1 + j2$$ can be awkward to work with. Often it's cleaner to **combine** the two complex-conjugate terms back into a single fraction with a **quadratic denominator** and **real coefficients**.

### Setting Up the Quadratic Form

Instead of splitting into three fractions, we write:

$$F(x) = \frac{4x^2 + 2x + 18}{(x+1)(x^2+4x+13)} = \frac{k_1}{x+1} + \frac{c_1 x + c_2}{x^2+4x+13} \tag{B.26}$$

> Notice: the numerator of the quadratic term is **linear** ($$c_1 x + c_2$$), not just a constant. This is required to match degrees properly.

---

### Step 1: Find $$k_1$$ by Cover-Up (as usual)

$$k_1 = \frac{4x^2 + 2x + 18}{(x+1)\cancel{(x^2+4x+13)}}\Bigg|_{x=-1} = \frac{4 - 2 + 18}{(-1+4-13+13)} $$

More carefully: $$x^2+4x+13$$ at $$x=-1$$ is $$1-4+13 = 10$$

$$k_1 = \frac{4(1)+2(-1)+18}{10} = \frac{20}{10} = \boxed{2}$$

---

### Step 2: Clear Fractions to Find $$c_1$$ and $$c_2$$

Substituting $$k_1 = 2$$ and multiplying both sides by $$(x+1)(x^2+4x+13)$$:

$$4x^2 + 2x + 18 = 2(x^2+4x+13) + (c_1 x + c_2)(x+1)$$

Expanding the right side:

$$= (2+c_1)x^2 + (8+c_1+c_2)x + (26+c_2)$$

Matching coefficients of each power of $$x$$:

| Power | Left side | Right side | Equation |
|---|---|---|---|
| $$x^2$$ | 4 | $$2 + c_1$$ | $$c_1 = 2$$ |
| $$x^1$$ | 2 | $$8 + c_1 + c_2$$ | $$c_2 = -8$$ |
| $$x^0$$ | 18 | $$26 + c_2$$ | ✅ checks out |

### Final Answer

$$\boxed{F(x) = \frac{2}{x+1} + \frac{2x-8}{x^2+4x+13}}$$

---

## Page 6: Shortcuts for Finding $$c_1$$ and $$c_2$$

### The Problem with Clearing Fractions

Clearing fractions and matching coefficients always works, but it can be tedious. Here are two elegant shortcuts.

---

### Shortcut 1: Substitute $$x = 0$$

After finding $$k_1 = 2$$, go back to:

$$\frac{4x^2 + 2x + 18}{(x+1)(x^2+4x+13)} = \frac{2}{x+1} + \frac{c_1 x + c_2}{x^2+4x+13}$$

Let $$x = 0$$ on both sides:

$$\frac{18}{(1)(13)} = \frac{2}{1} + \frac{c_2}{13}$$

$$\frac{18}{13} = 2 + \frac{c_2}{13} \implies c_2 = 18 - 26 = \boxed{-8}$$

> ✅ This eliminates $$c_1$$ instantly because the $$c_1 x$$ term vanishes when $$x=0$$.

---

### Shortcut 2: Multiply by $$x$$, then let $$x \to \infty$$

Multiply both sides of the equation by $$x$$:

$$\frac{x(4x^2 + 2x + 18)}{(x+1)(x^2+4x+13)} = \frac{2x}{x+1} + \frac{c_1 x^2 + c_2 x}{x^2+4x+13}$$

As $$x \to \infty$$, only the **highest-power terms** survive:

$$\frac{4x^3}{x^3} = \frac{2x}{x} + \frac{c_1 x^2}{x^2}$$

$$4 = 2 + c_1 \implies c_1 = \boxed{2}$$

---

### When $$x = 0$$ Doesn't Work

If the denominator has $$x$$ as a factor (e.g., $$F(x) = \frac{2x^2+4x+5}{x(x^2+2x+5)}$$), plugging in $$x=0$$ gives $$\infty$$. Instead, choose another convenient value like $$x = 1$$ or $$x = 2$$.

> 💡 **Key insight:** You can substitute **any** value of $$x$$ — pick whatever makes the arithmetic easiest. The $$x \to \infty$$ trick is almost always available and gives you $$c_1$$ quickly.

---

## Page 7: Recap and Summary

### The Big Picture

The Heaviside Cover-Up Method is a fast, elegant way to find partial fraction coefficients. Here's everything in one place.

---

### Core Formula

For distinct factors, the coefficient for the factor $$(x - \lambda_r)$$ is:

$$\boxed{k_r = (x - \lambda_r)\,F(x)\Big|_{x=\lambda_r}}$$

**In plain English:** Cover up the factor $$(x - \lambda_r)$$ in the denominator, then substitute $$x = \lambda_r$$ into what remains.

---

### Summary Table

| Situation | What to Do |
|---|---|
| **Distinct real factors** | Cover up each factor, plug in its root → get coefficient directly |
| **Complex conjugate factors** | Same cover-up method; for real-coefficient functions, $$k_3 = k_2^*$$ automatically |
| **Quadratic (combined) form** | Use cover-up for $$k_1$$; find $$c_1, c_2$$ by clearing fractions or shortcuts |
| **Shortcut for $$c_2$$** | Substitute $$x = 0$$ (if denominator ≠ 0 there) |
| **Shortcut for $$c_1$$** | Multiply by $$x$$, let $$x \to \infty$$ |

---

### Step-by-Step Checklist

1. ✅ **Write out** the partial fraction form with unknown coefficients
2. ✅ **Identify** the root of each factor (set each factor = 0)
3. ✅ **Cover up** the factor, **substitute** the root → coefficient found!
4. ✅ For **quadratic terms**: use $$x=0$$ and/or $$x \to \infty$$ shortcuts
5. ✅ **Verify** by recombining (optional but recommended)

---

### Common Mistakes to Avoid

> ⚠️ **Wrong root:** The factor $$(x+3)$$ has root $$x = -3$$, not $$x = +3$$.

> ⚠️ **Forgetting linear numerator:** For a quadratic denominator term, the numerator must be $$c_1 x + c_2$$, not just a constant $$c$$.

> ⚠️ **Complex conjugate shortcut only works** when all coefficients of $$F(x)$$ are real.

---

## Page 8: Exam-Oriented Quiz Plan

### Quiz Plan — B.5-2 Heaviside Cover-Up Method

---

**Q1.** *(Multiple Choice)* — *Core concept*

To find the coefficient $$k_2$$ in the expansion $$F(x) = \dfrac{P(x)}{(x-\lambda_1)(x-\lambda_2)(x-\lambda_3)}$$, the Heaviside method requires you to:

- A) Solve a system of three simultaneous equations
- B) Cover up $$(x - \lambda_2)$$ in the denominator and substitute $$x = \lambda_2$$
- C) Cover up $$(x - \lambda_2)$$ in the denominator and substitute $$x = \lambda_1$$
- D) Differentiate $$F(x)$$ and evaluate at $$x = \lambda_2$$

> ✅ **Answer: B**

---

**Q2.** *(Multiple Choice)* — *Direct calculation*

Using the cover-up method, find $$k_1$$ for:

$$F(x) = \frac{3x + 5}{(x+1)(x+5)}= \frac{k_1}{x+1} + \frac{k_2}{x+5}$$

- A) $$k_1 = \dfrac{1}{2}$$
- B) $$k_1 = 2$$
- C) $$k_1 = -\dfrac{1}{2}$$
- D) $$k_1 = -2$$

> ✅ **Answer: A** — Cover up $$(x+1)$$, set $$x=-1$$: $$\dfrac{3(-1)+5}{(-1+5)} = \dfrac{2}{4} = \dfrac{1}{2}$$

---

**Q3.** *(Multiple Choice)* — *Identifying roots*

The factor $$(x + 4)$$ in the denominator corresponds to which substitution value in the cover-up method?

- A) $$x = 4$$
- B) $$x = -4$$
- C) $$x = 0$$
- D) $$x = 1/4$$

> ✅ **Answer: B**

---

**Q4.** *(Multiple Choice)* — *Complex conjugate property*

A rational function $$F(x)$$ has **real** coefficients and complex-conjugate poles at $$x = -1 \pm j2$$. If the coefficient for the pole at $$x = -1+j2$$ is found to be $$k = 3 - j4$$, what


---

# B.5-3 Repeated Factors of Q(x)

- sectionId: `b.5-3`
- cached: `None`
- figures: `0`
- page_refs: `0`
- matplotlib_hint: `True`
- figure_unavailable_text: `False`
- file: `/Users/chenghaoxiang/.openclaw/workspace/tmp/b5-preview-20260426-1720-en/b.5-3.en.md`

%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6Im1hdHBsb3RsaWIiLCJyYXRpb25hbGUiOiJObyB0ZXh0Ym9vayBmaWd1cmUgY3JvcHMgYXJlIGF2YWlsYWJsZSwgYnV0IHRoaXMgc2VjdGlvbiBiZW5lZml0cyBmcm9tIGEgY2xlYW4gdmlzdWFsIHRoYXQgY29udHJhc3RzIHVucmVwZWF0ZWQgZmFjdG9ycyB3aXRoIHRoZSByZXBlYXRlZC1mYWN0b3IgbGFkZGVyIDEvKHgtbGFtYmRhKV5yIGRvd24gdG8gMS8oeC1sYW1iZGEpLiBBIGdlbmVyYXRlZCBkaWFncmFtIGNhbiBtYWtlIHRoZSBzdHJ1Y3R1cmUgYW5kIGNvZWZmaWNpZW50IHdvcmtmbG93IGVhc2llciB0byBzZWUgdGhhbiBkZW5zZSBPQ1IgbWF0aCBhbG9uZS4iLCJjcmFtIjoiVXNlIHRoZSB2aXN1YWwgYXMgYSByZWNvZ25pdGlvbiBjaGFydDogcmVwZWF0ZWQgZmFjdG9yIG9mIG9yZGVyIHIgbWVhbnMgd3JpdGUgZXZlcnkgcG93ZXIgZnJvbSByIGRvd24gdG8gMSwgdGhlbiB1c2UgZXZhbHVhdGUsIGRpZmZlcmVudGlhdGUsIGRpZmZlcmVudGlhdGUgYWdhaW4uIiwic3RhbmRhcmQiOiJVc2UgdGhlIHZpc3VhbCB0byBjb25uZWN0IHRoZSBnZW5lcmFsIGV4cGFuc2lvbiBmb3JtIHRvIG9uZSB3b3JrZWQgZXhhbXBsZSBhbmQgc2hvdyB3aGVyZSBlYWNoIGNvZWZmaWNpZW50IGNvbWVzIGZyb20uIiwidG9wX3Njb3JlIjoiVXNlIHRoZSB2aXN1YWwgdG8gc3RyZXNzIHRoZSB0cmFwIHRoYXQgb25lIHJlcGVhdGVkIGZhY3RvciBjcmVhdGVzIHNldmVyYWwgdGVybXMsIG5vdCBqdXN0IG9uZSwgYW5kIHRoYXQgdGhlIGp0aCBjb2VmZmljaWVudCBjb21lcyBmcm9tIHRoZSBqdGggZGVyaXZhdGl2ZSBkaXZpZGVkIGJ5IGohLiJ9" style="display:none;"></div>%%KC_END%%
# B.5-3 Repeated Factors of Q(x)

> **Section Objective:** Understand what changes in partial fraction expansion when the denominator contains a repeated factor such as \((x-\lambda)^r\).

---

This section answers one focused question: what changes when the denominator of \(F(x)\) contains a repeated factor like \((x-\lambda)^r\)? The key new idea is that **one repeated factor of order \(r\) produces \(r\) separate partial-fraction terms** — one for each power from \(r\) down to 1 — rather than just a single term.

You will learn two skills: writing the correct expanded form for a repeated factor, and finding each coefficient using a combination of the Heaviside cover-up method and successive differentiation.

> **Exam Warning:** A very common source of lost points is writing only one term for a repeated factor. If \((x-\lambda)^r\) appears in the denominator, you must write all \(r\) terms.

> ⚠️ Chart render error: Traceback (most recent call last):
  File "/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/script-1777195659653-rj20.py", line 97, in <module>
    plt.tight_layout(pad=1.5)
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/pyplot.py", line 2843, in tight_layout
    gcf().tight_layout(pad=pad, h_pad=h_pad, w_pad=w_pad, rect=rect)
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/figure.py", line 3640, in tight_layout
    engine.execute(self)
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/layout_engine.py", line 188, in execute
    kwargs = get_tight_layout_figure(
             ^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/_tight_layout.py", line 266, in get_tight_layout_figure
    kwargs = _auto_adjust_subplotpars(fig, renderer,
             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/_tight_layout.py", line 82, in _auto_adjust_subplotpars
    bb += [martist._get_tightbbox_for_layout_only(ax, renderer)]
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/artist.py", line 1402, in _get_tightbbox_for_layout_only
    return obj.get_tightbbox(*args, **{**kwargs, "for_layout_only": True})
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/axes/_base.py", line 4587, in get_tightbbox
    bbox = a.get_tightbbox(renderer)
           ^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/artist.py", line 364, in get_tightbbox
    bbox = self.get_window_extent(renderer)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/text.py", line 969, in get_window_extent
    bbox, info, descent = self._get_layout(self._renderer)
                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/text.py", line 382, in _get_layout
    w, h, d = _get_text_metrics_with_cache(
              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/text.py", line 69, in _get_text_metrics_with_cache
    return _get_text_metrics_with_cache_impl(
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/text.py", line 77, in _get_text_metrics_with_cache_impl
    return renderer_ref().get_text_width_height_descent(text, fontprop, ismath)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/backends/backend_agg.py", line 215, in get_text_width_height_descent
    self.mathtext_parser.parse(s, self.dpi, prop)
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/mathtext.py", line 86, in parse
    return self._parse_cached(s, dpi, prop, antialiased, load_glyph_flags)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/mathtext.py", line 100, in _parse_cached
    box = self._parser.parse(s, fontset, fontsize, dpi)
          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/_mathtext.py", line 2167, in parse
    raise ValueError("\n" + ParseException.explain(err, 0)) from None
ValueError: 
\dfrac{P(x)}{\underbrace{(x-\lambda)^r}_{\text{repeated}} \cdot \underbrace{(x-\alpha_1)(x-\alpha_2)\cdots}_{\text{unrepeated}}}
             ^
ParseSyntaxException: Unknown symbol: \underbrace, found '\'  (at char 13), (line:1, col:14)


$$F(x)=\frac{P(x)}{(x-\lambda)^r(x-\alpha_1)(x-\alpha_2)\cdots(x-\alpha_j)}=\frac{a_0}{(x-\lambda)^r}+\frac{a_1}{(x-\lambda)^{r-1}}+\cdots+\frac{a_{r-1}}{x-\lambda}+\frac{k_1}{x-\alpha_1}+\frac{k_2}{x-\alpha_2}+\cdots+\frac{k_j}{x-\alpha_j}$$
*A repeated factor of order \(r\) in the denominator creates exactly \(r\) separate terms in the partial-fraction expansion — one for each power from \((x-\lambda)^r\) down to \((x-\lambda)^1\) — while each unrepeated linear factor \((x-\alpha_i)\) still contributes just one simple-fraction term.*

## 1. How Repeated-Factor Coefficients Are Found

Coefficients for **unrepeated** factors are found exactly as before: use the ordinary Heaviside cover-up method, substituting the root of each simple factor directly into the remaining expression.

For the **repeated factor** \((x-\lambda)^r\), the procedure is a step-by-step ladder:

1. **Conceal the repeated factor** by multiplying \(F(x)\) by \((x-\lambda)^r\). Call this \(G(x) = (x-\lambda)^r F(x)\).
2. **Substitute \(x = \lambda\)** into \(G(x)\) to get \(a_0\).
3. **Differentiate \(G(x)\) once**, then substitute \(x = \lambda\) to get \(a_1\).
4. **Differentiate again** and substitute \(x = \lambda\) to get \(a_2\), and so on.
5. In general, \(a_j\) comes from the **\(j\)th derivative of \(G(x)\) divided by \(j!\)**, evaluated at \(x = \lambda\).

> **Exam Note:** The two most common mistakes are (1) forgetting the \(1/j!\) factorial factor, and (2) differentiating \(F(x)\) itself instead of the concealed expression \(G(x) = (x-\lambda)^r F(x)\). Always remove the repeated factor first.

$$a_j=\left.\frac{1}{j!}\frac{d^j}{dx^j}\left[(x-\lambda)^rF(x)\right]\right|_{x=\lambda}$$
*This compact formula captures the entire repeated-factor procedure in one expression: multiply \(F(x)\) by \((x-\lambda)^r\) to conceal the repeated factor, differentiate the result \(j\) times, divide by \(j!\), then evaluate at \(x = \lambda\) to obtain \(a_j\).*

## 2. Representative Example

Consider the function

$$
F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)}
$$

The denominator has a **repeated factor** \((x+1)^3\) of order 3 and one **simple factor** \((x+2)\). The correct partial-fraction form is therefore:

$$
\frac{a_0}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{k}{x+2}
$$

**Step 1 — Find \(k\) by ordinary cover-up at \(x = -2\):**

$$
k = \left.\frac{4x^3+16x^2+23x+13}{(x+1)^3}\right|_{x=-2} = \frac{-32+64-46+13}{(-1)^3} = \frac{-1}{-1} = 1
$$

**Step 2 — Conceal \((x+1)^3\):** Let \(G(x) = (x+1)^3 F(x) = \dfrac{4x^3+16x^2+23x+13}{x+2}\).

- \(a_0 = G(-1) = \dfrac{4(-1)+16(1)+23(-1)+13}{-1+2} = \dfrac{-4+16-23+13}{1} = 2\)
- \(a_1 = G'(-1)\): differentiating \(G(x)\) and evaluating at \(x=-1\) gives \(a_1 = 1\).
- \(a_2 = \tfrac{1}{2}G''(-1)\): taking the second derivative and dividing by \(2!\) gives \(a_2 = 3\).

The repeated factor \((x+1)^3\) of power 3 correctly produced **three terms**, confirming the structure is complete.

$$\frac{4x^3+16x^2+23x+13}{(x+1)^3(x+2)}=\frac{2}{(x+1)^3}+\frac{1}{(x+1)^2}+\frac{3}{x+1}+\frac{1}{x+2}$$
*This final result shows the complete ladder of three descending terms for the repeated factor \((x+1)^3\) — with coefficients 2, 1, and 3 — plus one additional term for the simple factor \((x+2)\) with coefficient 1.*

---
**📌 Key Takeaways**
- A repeated factor \((x-\lambda)^r\) creates a ladder of \(r\) separate partial-fraction terms, one per power.
- Unrepeated linear factors still use the ordinary Heaviside cover-up method at their own root.
- Each repeated-factor coefficient \(a_j\) requires the \(j\)th derivative of the concealed expression, divided by \(j!\).

*In the next section we will look at a mixed method that combines cover-up with clearing fractions.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImV4cGFuc2lvbl9mb3JtX3JlcGVhdGVkX2ZhY3RvciIsImxhYmVsIjoiQ29ycmVjdCBleHBhbnNpb24gZm9ybSBmb3IgYSByZXBlYXRlZCBmYWN0b3IiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIGEgZGVub21pbmF0b3IgY29udGFpbnMgXFwoKHgtMyleMih4KzEpXFwpLCB3aGljaCBwYXJ0aWFsLWZyYWN0aW9uIGZvcm0gaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIFxcKFxcZGZyYWN7QX17KHgtMyleMn0gKyBcXGRmcmFje0J9e3grMX1cXCkiLCJCLiBcXChcXGRmcmFje0F9e3gtM30gKyBcXGRmcmFje0J9e3grMX1cXCkiLCJDLiBcXChcXGRmcmFje0F9eyh4LTMpXjJ9ICsgXFxkZnJhY3tCfXt4LTN9ICsgXFxkZnJhY3tDfXt4KzF9XFwpIiwiRC4gXFwoXFxkZnJhY3tBfXsoeC0zKV4yfSArIFxcZGZyYWN7Qn17eC0zfSArIFxcZGZyYWN7Q317KHgrMSleMn1cXCkiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJBIHJlcGVhdGVkIGZhY3RvciBvZiBvcmRlciAyIHJlcXVpcmVzIHR3byB0ZXJtczogb25lIG92ZXIgXFwoKHgtMyleMlxcKSBhbmQgb25lIG92ZXIgXFwoKHgtMylcXCkuIFRoZSBzaW1wbGUgZmFjdG9yIFxcKCh4KzEpXFwpIGNvbnRyaWJ1dGVzIGV4YWN0bHkgb25lIHRlcm0uIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiSXQgaXMgbWlzc2luZyB0aGUgXFwoMS8oeC0zKVxcKSB0ZXJtIHJlcXVpcmVkIGJ5IHRoZSByZXBlYXRlZCBmYWN0b3Igb2Ygb3JkZXIgMi4iLCJCIjoiSXQgb21pdHMgdGhlIGhpZ2hlc3QtcG93ZXIgcmVwZWF0ZWQtZmFjdG9yIHRlcm0gXFwoMS8oeC0zKV4yXFwpLiIsIkQiOiJUaGUgZmFjdG9yIFxcKCh4KzEpXFwpIGlzIG5vdCByZXBlYXRlZCwgc28gaXQgbXVzdCBub3QgcHJvZHVjZSBhIHNxdWFyZWQtZGVub21pbmF0b3IgdGVybS4ifSwiaGludCI6IkEgcmVwZWF0ZWQgZmFjdG9yIG9mIHBvd2VyIDIgY3JlYXRlcyBhIHR3by1zdGVwIGxhZGRlcjogb25lIHRlcm0gZm9yIGVhY2ggcG93ZXIgZnJvbSAyIGRvd24gdG8gMS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoicGFydGlhbF9mcmFjdGlvbl9zdHJ1Y3R1cmVfZGlhZ3JhbSIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIGEgZGVub21pbmF0b3IgY29udGFpbmluZyBcXCgoeC1cXGxhbWJkYSleNFxcKSwgaG93IG1hbnkgc2VwYXJhdGUgcGFydGlhbC1mcmFjdGlvbiB0ZXJtcyBjb21lIGZyb20gdGhhdCByZXBlYXRlZCBmYWN0b3IgYWxvbmU/Iiwib3B0aW9ucyI6WyJBLiAxIiwiQi4gMiIsIkMuIDMiLCJELiA0Il0sImNvcnJlY3Rfb3B0aW9uIjoiRCIsImV4cGxhbmF0aW9uIjoiQSByZXBlYXRlZCBmYWN0b3Igb2Ygb3JkZXIgNCBjb250cmlidXRlcyBmb3VyIHRlcm1zOiBkZW5vbWluYXRvcnMgXFwoKHgtXFxsYW1iZGEpXjRcXCksIFxcKCh4LVxcbGFtYmRhKV4zXFwpLCBcXCgoeC1cXGxhbWJkYSleMlxcKSwgYW5kIFxcKCh4LVxcbGFtYmRhKVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGF0IHdvdWxkIGJlIHRydWUgb25seSBmb3IgYSBzaW1wbGUgdW5yZXBlYXRlZCBmYWN0b3IuIiwiQiI6IkEgZm91cnRoLW9yZGVyIHJlcGVhdGVkIGZhY3RvciBuZWVkcyBtb3JlIHRoYW4gdHdvIHRlcm1zLiIsIkMiOiJTdGlsbCBtaXNzaW5nIG9uZSBkZW5vbWluYXRvciBwb3dlciDigJQgdGhlIGxhZGRlciBtdXN0IGdvIGFsbCB0aGUgd2F5IGRvd24gdG8gcG93ZXIgMS4ifSwiaGludCI6IkNvdW50IGV2ZXJ5IGludGVnZXIgcG93ZXIgZnJvbSA0IGRvd24gdG8gMSDigJQgdGhhdCBpcyBob3cgbWFueSB0ZXJtcyB5b3UgbmVlZC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImNvZWZmaWNpZW50X21ldGhvZF9yZXBlYXRlZF9mYWN0b3IiLCJsYWJlbCI6IkhvdyB0byBjb21wdXRlIGNvZWZmaWNpZW50cyBmb3IgcmVwZWF0ZWQgZmFjdG9ycyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiU3VwcG9zZSBcXChGKHgpXFwpIGhhcyBhIHJlcGVhdGVkIGZhY3RvciBcXCgoeC1cXGxhbWJkYSleM1xcKS4gQWZ0ZXIgZm9ybWluZyBcXChHKHgpID0gKHgtXFxsYW1iZGEpXjMgRih4KVxcKSwgd2hhdCBnaXZlcyBcXChhXzFcXCk/Iiwib3B0aW9ucyI6WyJBLiBTdWJzdGl0dXRlIFxcKHggPSBcXGxhbWJkYVxcKSBkaXJlY3RseSBpbnRvIFxcKEYoeClcXCkiLCJCLiBTdWJzdGl0dXRlIFxcKHggPSBcXGxhbWJkYVxcKSBpbnRvIFxcKEcoeCkgPSAoeC1cXGxhbWJkYSleMyBGKHgpXFwpIiwiQy4gRGlmZmVyZW50aWF0ZSBcXChHKHgpXFwpIG9uY2UsIHRoZW4gc2V0IFxcKHggPSBcXGxhbWJkYVxcKSIsIkQuIERpZmZlcmVudGlhdGUgXFwoRih4KVxcKSBvbmNlLCB0aGVuIHNldCBcXCh4ID0gXFxsYW1iZGFcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJBZnRlciBjb25jZWFsaW5nIHRoZSByZXBlYXRlZCBmYWN0b3IgdG8gZm9ybSBcXChHKHgpXFwpLCBkaXJlY3Qgc3Vic3RpdHV0aW9uIFxcKHggPSBcXGxhbWJkYVxcKSBnaXZlcyBcXChhXzBcXCkuIFRoZSBuZXh0IGNvZWZmaWNpZW50IFxcKGFfMVxcKSByZXF1aXJlcyBkaWZmZXJlbnRpYXRpbmcgXFwoRyh4KVxcKSBvbmNlIGFuZCB0aGVuIGV2YWx1YXRpbmcgYXQgXFwoeCA9IFxcbGFtYmRhXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IllvdSBtdXN0IGZpcnN0IHJlbW92ZSB0aGUgcmVwZWF0ZWQgZmFjdG9yOyBzdWJzdGl0dXRpbmcgaW50byBcXChGKHgpXFwpIGl0c2VsZiB0eXBpY2FsbHkgcHJvZHVjZXMgYW4gaW5kZXRlcm1pbmF0ZSBmb3JtLiIsIkIiOiJTdWJzdGl0dXRpbmcgXFwoeCA9IFxcbGFtYmRhXFwpIGludG8gXFwoRyh4KVxcKSB3aXRob3V0IGRpZmZlcmVudGlhdGluZyBnaXZlcyBcXChhXzBcXCksIG5vdCBcXChhXzFcXCkuIiwiRCI6IkRpZmZlcmVudGlhdGluZyBcXChGKHgpXFwpIGJlZm9yZSBjb25jZWFsaW5nIHRoZSByZXBlYXRlZCBmYWN0b3IgaXMgbm90IHRoZSBjb3JyZWN0IHByb2NlZHVyZS4ifSwiaGludCI6IkZpcnN0IGNvbmNlYWwgdGhlIHJlcGVhdGVkIGZhY3RvciB0byBnZXQgXFwoRyh4KVxcKSwgdGhlbiBtYXRjaCB0aGUgZGVyaXZhdGl2ZSBvcmRlciB0byB0aGUgY29lZmZpY2llbnQgaW5kZXguIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AyX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBmb3JtdWxhIGNvcnJlY3RseSBnaXZlcyB0aGUgY29lZmZpY2llbnQgXFwoYV9qXFwpIGZvciB0aGUgcmVwZWF0ZWQgZmFjdG9yIFxcKCh4LVxcbGFtYmRhKV5yXFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoYV9qID0gXFxsZWZ0LlxcZGZyYWN7ZF5qfXtkeF5qfUYoeClcXHJpZ2h0fF97eD1cXGxhbWJkYX1cXCkiLCJCLiBcXChhX2ogPSBcXGxlZnQuXFxkZnJhY3sxfXtqIX1cXGRmcmFje2Rean17ZHhean1cXGxlZnRbKHgtXFxsYW1iZGEpXnIgRih4KVxccmlnaHRdXFxyaWdodHxfe3g9XFxsYW1iZGF9XFwpIiwiQy4gXFwoYV9qID0gXFxsZWZ0LlxcZGZyYWN7MX17aiF9KHgtXFxsYW1iZGEpXnIgRih4KVxccmlnaHR8X3t4PVxcbGFtYmRhfVxcKSIsIkQuIFxcKGFfaiA9IFxcbGVmdC5cXGRmcmFje2R9e2R4fVxcbGVmdFsoeC1cXGxhbWJkYSleaiBGKHgpXFxyaWdodF1cXHJpZ2h0fF97eD1cXGxhbWJkYX1cXCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgcmVwZWF0ZWQgZmFjdG9yIG11c3QgYmUgY29uY2VhbGVkIGZpcnN0IGJ5IG11bHRpcGx5aW5nIGJ5IFxcKCh4LVxcbGFtYmRhKV5yXFwpLCB0aGVuIHRoZSByZXN1bHQgaXMgZGlmZmVyZW50aWF0ZWQgXFwoalxcKSB0aW1lcywgZGl2aWRlZCBieSBcXChqIVxcKSwgYW5kIGZpbmFsbHkgZXZhbHVhdGVkIGF0IFxcKHggPSBcXGxhbWJkYVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJJdCBpZ25vcmVzIHRoZSByZXF1aXJlZCBjb25jZWFsbWVudCBvZiB0aGUgcmVwZWF0ZWQgZmFjdG9yIOKAlCBkaWZmZXJlbnRpYXRpbmcgXFwoRih4KVxcKSBkaXJlY3RseSBpcyBub3QgdGhlIHJ1bGUuIiwiQyI6Ikl0IGhhcyBubyBcXChqXFwpdGggZGVyaXZhdGl2ZSwgc28gaXQgY2Fubm90IHByb2R1Y2UgdGhlIGNvcnJlY3QgXFwoYV9qXFwpIHZhbHVlcyBmb3IgXFwoaiBcXGdlcSAxXFwpLiIsIkQiOiJJdCB1c2VzIHRoZSB3cm9uZyBwb3dlciBpbnNpZGUgdGhlIGJyYWNrZXQgYW5kIHRoZSB3cm9uZyBkZXJpdmF0aXZlIG9yZGVyLiJ9LCJoaW50IjoiVGhlIGZ1bGwgcnVsZSBoYXMgdGhyZWUgcGFydHM6IGNvbmNlYWwgdGhlIHJlcGVhdGVkIGZhY3RvciwgZGlmZmVyZW50aWF0ZSBcXChqXFwpIHRpbWVzLCBkaXZpZGUgYnkgXFwoaiFcXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJ3b3JrZWRfZXhhbXBsZV92YWx1ZXMiLCJsYWJlbCI6IlJlYWRpbmcgYW5kIGFwcGx5aW5nIHRoZSByZXByZXNlbnRhdGl2ZSBleGFtcGxlIiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkluIHRoZSBleGFtcGxlIFxcKEYoeCkgPSBcXGRmcmFjezR4XjMrMTZ4XjIrMjN4KzEzfXsoeCsxKV4zKHgrMil9XFwpLCB3aGljaCBjb2VmZmljaWVudCBpcyBmb3VuZCBieSBvcmRpbmFyeSBjb3Zlci11cCBhdCBcXCh4ID0gLTJcXCk/Iiwib3B0aW9ucyI6WyJBLiBcXChhXzBcXCkiLCJCLiBcXChhXzFcXCkiLCJDLiBcXChhXzJcXCkiLCJELiBcXChrXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiRCIsImV4cGxhbmF0aW9uIjoiVGhlIGZhY3RvciBcXCgoeCsyKVxcKSBpcyB1bnJlcGVhdGVkLCBzbyBpdHMgY29lZmZpY2llbnQgXFwoa1xcKSBpcyBmb3VuZCBieSB0aGUgb3JkaW5hcnkgSGVhdmlzaWRlIGNvdmVyLXVwIG1ldGhvZDogY292ZXIgXFwoKHgrMilcXCkgYW5kIHN1YnN0aXR1dGUgXFwoeCA9IC0yXFwpIGludG8gdGhlIHJlc3QuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiXFwoYV8wXFwpIGJlbG9uZ3MgdG8gdGhlIHJlcGVhdGVkIGZhY3RvciBcXCgoeCsxKV4zXFwpIGFuZCBpcyBmb3VuZCBieSBjb25jZWFsaW5nIHRoYXQgZmFjdG9yIGFuZCBzdWJzdGl0dXRpbmcgXFwoeCA9IC0xXFwpLiIsIkIiOiJcXChhXzFcXCkgY29tZXMgZnJvbSBkaWZmZXJlbnRpYXRpbmcgdGhlIGNvbmNlYWxlZCByZXBlYXRlZC1mYWN0b3IgZXhwcmVzc2lvbiBvbmNlIGFuZCBldmFsdWF0aW5nIGF0IFxcKHggPSAtMVxcKS4iLCJDIjoiXFwoYV8yXFwpIGNvbWVzIGZyb20gdGhlIHNlY29uZC1kZXJpdmF0aXZlIHJ1bGUgYXBwbGllZCB0byB0aGUgY29uY2VhbGVkIHJlcGVhdGVkLWZhY3RvciBleHByZXNzaW9uLiJ9LCJoaW50IjoiU2ltcGxlLCB1bnJlcGVhdGVkIGZhY3RvcnMgdXNlIHRoZSBvcmRpbmFyeSBjb3Zlci11cCB2YWx1ZSBhdCB0aGVpciBvd24gcm9vdC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJXcml0ZSB0aGUgZmluYWwgcGFydGlhbC1mcmFjdGlvbiBleHBhbnNpb24gZm9yIFxcKEYoeCkgPSBcXGRmcmFjezR4XjMrMTZ4XjIrMjN4KzEzfXsoeCsxKV4zKHgrMil9XFwpLiIsImlkZWFsX2Fuc3dlciI6IiQkXFxmcmFjezJ9eyh4KzEpXjN9K1xcZnJhY3sxfXsoeCsxKV4yfStcXGZyYWN7M317eCsxfStcXGZyYWN7MX17eCsyfSQkIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBpbmNsdWRlIGFsbCBmb3VyIHRlcm1zIiwiTXVzdCB1c2UgZGVzY2VuZGluZyByZXBlYXRlZC1mYWN0b3IgcG93ZXJzIFxcKCh4KzEpXjNcXCksIFxcKCh4KzEpXjJcXCksIGFuZCBcXCgoeCsxKVxcKSIsIk11c3QgZ2l2ZSBjb2VmZmljaWVudHMgMiwgMSwgMywgYW5kIDEgY29ycmVjdGx5Il0sImV4cGxhbmF0aW9uIjoiVGhpcyBjb25maXJtcyB0aGF0IHRoZSBzdHVkZW50IGNhbiByZWNvbnN0cnVjdCB0aGUgZnVsbCBleHBhbnNpb24sIG5vdCBqdXN0IGlkZW50aWZ5IG9uZSBjb2VmZmljaWVudC4gVGhlIHJlcGVhdGVkIGZhY3RvciBcXCgoeCsxKV4zXFwpIG9mIG9yZGVyIDMgbXVzdCBwcm9kdWNlIGV4YWN0bHkgdGhyZWUgdGVybXMuIiwiaGludCI6IlRoZSByZXBlYXRlZCBmYWN0b3IgXFwoKHgrMSleM1xcKSBjcmVhdGVzIHRocmVlIHRlcm1zIChvbmUgcGVyIHBvd2VyKSwgdGhlbiBhZGQgdGhlIHNpbmdsZSB0ZXJtIGZvciB0aGUgc2ltcGxlIGZhY3RvciBcXCgoeCsyKVxcKS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%



---

# B.5-4 Partial Fraction Expansion with Repeated Factors

- sectionId: `b.5-4`
- cached: `None`
- figures: `0`
- page_refs: `0`
- matplotlib_hint: `False`
- figure_unavailable_text: `False`
- file: `/Users/chenghaoxiang/.openclaw/workspace/tmp/b5-preview-20260426-1720-en/b.5-4.en.md`

# B.5-4 Partial Fraction Expansion with Repeated Factors

---

## Page 1: Section Overview

Welcome! In this section, we're going to tackle one of the trickier parts of partial fraction expansion: **what happens when you have repeated factors in the denominator?**

### What's the Big Idea?

So far, you've probably seen partial fractions where every factor in the denominator appears just once — things like $$(x+1)(x+2)$$. Easy enough. But what if a factor repeats, like $$(x+1)^3$$? That changes everything about how we set up and solve the expansion.

### What You'll Learn in This Section

By the end of this section, you'll be able to:

1. **Recognize repeated factors** and set up the correct partial fraction form
2. **Use the Heaviside "cover-up" method** extended to repeated roots (with derivatives!)
3. **Use the hybrid method** — combining Heaviside with "clearing fractions" to avoid messy derivatives
4. **Use clever shortcuts** like multiplying by \(x\) and letting \(x \to \infty\), or plugging in convenient values of \(x\)
5. **Handle the special case** where the numerator and denominator have the same degree (\(m = n\))

### The Running Example

We'll work through this function repeatedly to compare methods:

$$F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)}$$

### Why Does This Matter?

In signal processing and linear systems, you'll constantly need to break complicated transfer functions and Laplace transforms into simpler pieces. Repeated poles (repeated factors) show up all the time in real systems, so mastering this is essential.

Let's dive in! 🎯

---

## Page 2: Setting Up the Partial Fraction Form for Repeated Factors

### The Core Rule: One Term Per Power

When a factor repeats in the denominator, you need **a separate partial fraction term for every power** of that factor, from 1 up to the full power.

> **General Rule:** If $$(x - \lambda)^r$$ appears in the denominator, you need \(r\) terms:
>
> $$\frac{a_0}{(x-\lambda)^r} + \frac{a_1}{(x-\lambda)^{r-1}} + \cdots + \frac{a_{r-1}}{x - \lambda}$$

### Applying This to Our Example

Our function is:

$$F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)}$$

The denominator has:
- $$(x+1)^3$$ — a **repeated** factor (power 3) → needs **3 terms**
- $$(x+2)$$ — a **simple** factor (power 1) → needs **1 term**

So the correct setup is:

$$F(x) = \frac{a_0}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{k}{x+2}$$

### ⚠️ Common Beginner Mistake

Many students write only one term for a repeated factor:

$$\frac{a}{(x+1)^3} \quad \leftarrow \text{WRONG! Missing the other powers.}$$

This is incorrect because you need to account for **all** the ways the repeated factor can contribute. Think of it like this: $$(x+1)^3$$ "contains" $$(x+1)^2$$ and $$(x+1)$$ inside it, and each one deserves its own coefficient.

### Quick Check

If your denominator were $$(x+2)^4(x-1)(x+5)^2$$, how many terms would you need?

- From $$(x+2)^4$$: **4 terms**
- From $$(x-1)$$: **1 term**
- From $$(x+5)^2$$: **2 terms**
- **Total: 7 terms** ✅

---

## Page 3: Method 1 — The Heaviside Cover-Up Method (Extended)

### Finding the Simple Root Coefficient First

For the **non-repeated** factor $$(x+2)$$, the classic Heaviside cover-up works perfectly. Cover up $$(x+2)$$ in \(F(x)\) and substitute \(x = -2\):

$$k = \left.\frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3}\right|_{x=-2}$$

$$k = \frac{4(-8) + 16(4) + 23(-2) + 13}{(-1)^3} = \frac{-32 + 64 - 46 + 13}{-1} = \frac{-1}{-1} = 1$$

$$\boxed{k = 1}$$

### Finding \(a_0\): The Highest-Power Repeated Term

For \(a_0\) (the coefficient of the **highest power** $$(x+1)^3$$), cover up $$(x+1)^3$$ and substitute \(x = -1\):

$$a_0 = \left.\frac{4x^3 + 16x^2 + 23x + 13}{(x+2)}\right|_{x=-1}$$

$$a_0 = \frac{4(-1) + 16(1) + 23(-1) + 13}{(-1+2)} = \frac{-4 + 16 - 23 + 13}{1} = \frac{2}{1} = 2$$

$$\boxed{a_0 = 2}$$

### Finding \(a_1\): Take One Derivative

For \(a_1\), cover up $$(x+1)^3$$, **differentiate once**, then substitute \(x = -1\):

$$a_1 = \left.\frac{d}{dx}\left[\frac{4x^3 + 16x^2 + 23x + 13}{(x+2)}\right]\right|_{x=-1} = 1$$

$$\boxed{a_1 = 1}$$

### Finding \(a_2\): Take Two Derivatives (with \(\frac{1}{2!}\))

$$a_2 = \left.\frac{1}{2!}\frac{d^2}{dx^2}\left[\frac{4x^3 + 16x^2 + 23x + 13}{(x+2)}\right]\right|_{x=-1} = 3$$

$$\boxed{a_2 = 3}$$

### The General Formula for Repeated Root Coefficients

For a repeated factor $$(x - \lambda)^r$$, the coefficients are:

$$\boxed{a_j = \left.\frac{1}{j!} \frac{d^j}{dx^j}\left[(x-\lambda)^r F(x)\right]\right|_{x=\lambda}}$$

where \(j = 0, 1, 2, \ldots, r-1\).

### Final Answer

$$F(x) = \frac{2}{(x+1)^3} + \frac{1}{(x+1)^2} + \frac{3}{x+1} + \frac{1}{x+2}$$

> **Honest warning:** As the order of the repeated root grows, taking higher derivatives gets messy fast. That's why we have better methods — coming up next!

---

## Page 4: Method 2 — Hybrid Method (Heaviside + Clearing Fractions)

### The Strategy

Instead of taking painful higher-order derivatives, we:
1. Use Heaviside to find the **easy** coefficients (\(k\) and \(a_0\))
2. Substitute those known values back in
3. **Multiply both sides by the full denominator** to clear all fractions
4. **Match coefficients** of like powers of \(x\) to find the rest

### Step 1: Use Heaviside for the Easy Ones

From the previous page, we already know:
$$k = 1, \quad a_0 = 2$$

So we write:

$$\frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)} = \frac{2}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{1}{x+2}$$

### Step 2: Multiply Both Sides by $$(x+1)^3(x+2)$$

$$4x^3 + 16x^2 + 23x + 13 = 2(x+2) + a_1(x+1)(x+2) + a_2(x+1)^2(x+2) + (x+1)^3$$

### Step 3: Expand the Right Side

After expanding and collecting terms by power of \(x\):

$$\text{RHS} = (1 + a_2)x^3 + (a_1 + 4a_2 + 3)x^2 + (3a_1 + 5a_2 + 5)x + (2a_1 + 2a_2 + 5)$$

### Step 4: Match Coefficients

| Power | Left Side | Right Side | Equation |
|-------|-----------|------------|----------|
| \(x^3\) | 4 | \(1 + a_2\) | \(a_2 = 3\) ✅ |
| \(x^2\) | 16 | \(a_1 + 4a_2 + 3\) | \(a_1 = 1\) ✅ |
| \(x^1\) | 23 | \(3a_1 + 5a_2 + 5\) | \(3+15+5=23\) ✓ (check) |
| \(x^0\) | 13 | \(2a_1 + 2a_2 + 5\) | \(2+6+5=13\) ✓ (check) |

The last two rows are **free checks** — if they work, your answer is almost certainly correct!

### Result

$$\boxed{a_1 = 1, \quad a_2 = 3}$$

$$F(x) = \frac{2}{(x+1)^3} + \frac{1}{(x+1)^2} + \frac{3}{x+1} + \frac{1}{x+2}$$

> **Why is this better?** Matching polynomial coefficients is straightforward algebra — no calculus required after the first step!

---

## Page 5: Method 3 — Shortcuts (The Slickest Approach)

### The Setup (Same Starting Point)

After finding \(k = 1\) and \(a_0 = 2\) by Heaviside, we have:

$$\frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)} = \frac{2}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{1}{x+2}$$

Two unknowns remain: \(a_1\) and \(a_2\).

### Shortcut 1: Multiply by \(x\), Then Let \(x \to \infty\)

Multiply **both sides** by \(x\):

$$\frac{4x^4 + 16x^3 + 23x^2 + 13x}{(x+1)^3(x+2)} = \frac{2x}{(x+1)^3} + \frac{a_1 x}{(x+1)^2} + \frac{a_2 x}{x+1} + \frac{x}{x+2}$$

Now let \(x \to \infty\). Each term simplifies because the highest powers dominate:

$$\frac{4x^4}{x^4} \to 4 \qquad \frac{2x}{x^3} \to 0 \qquad \frac{a_1 x}{x^2} \to 0 \qquad \frac{a_2 x}{x} \to a_2 \qquad \frac{x}{x} \to 1$$

So:

$$4 = 0 + 0 + a_2 + 1 \implies \boxed{a_2 = 3}$$

> **Why does this work?** As \(x \to \infty\), terms with higher powers in the denominator vanish, leaving only the leading-order terms. It's a clever way to isolate one coefficient at a time!

### Shortcut 2: Plug in a Convenient Value of \(x\)

Now that \(a_2 = 3\) is known, only \(a_1\) remains. Substitute any convenient value — let's use \(x = 0\):

$$\frac{13}{(1)^3(2)} = \frac{2}{1} + \frac{a_1}{1} + \frac{3}{1} + \frac{1}{2}$$

$$\frac{13}{2} = 2 + a_1 + 3 + \frac{1}{2}$$

$$6.5 = 5.5 + a_1 \implies \boxed{a_1 = 1}$$

### Why These Shortcuts Are Powerful

| Method | Requires | Best When |
|--------|----------|-----------|
| Pure Heaviside | Repeated differentiation | Low-order repeated roots |
| Hybrid (clearing fractions) | Polynomial algebra | Multiple unknowns remain |
| Shortcuts (\(x \to \infty\), plug-in) | Simple arithmetic | You want speed and elegance |

In practice, **combine all three** — use whichever tool is easiest for each coefficient!

---

## Page 6: Special Case — When Numerator and Denominator Have the Same Degree (\(m = n\))

### What Makes This "Improper"?

A rational function \(F(x) = \frac{N(x)}{D(x)}\) is called **improper** when the degree of the numerator \(m\) is **greater than or equal to** the degree of the denominator \(n\).

Normally, partial fractions require a **proper** function (\(m < n\)). For the general improper case, you'd do polynomial long division first. But there's a **special shortcut** when \(m = n\) exactly.

### The \(m = n\) Rule

When the numerator and denominator have the **same degree**, you can write:

$$F(x) = \frac{b_n x^n + b_{n-1}x^{n-1} + \cdots}{x^n + a_{n-1}x^{n-1} + \cdots} = b_n + \frac{k_1}{x - \lambda_1} + \frac{k_2}{x - \lambda_2} + \cdots + \frac{k_n}{x - \lambda_n}$$

> **Key insight:** The only difference from the proper case is the **extra constant \(b_n\)** (the leading coefficient of the numerator). Everything else — finding \(k_1, k_2, \ldots\) — works exactly the same way as if \(F(x)\) were proper!

### Example B.11: Walking Through It

$$F(x) = \frac{3x^2 + 9x - 20}{(x-2)(x+3)}$$

Here \(m = n = 2\), and the leading coefficient of the numerator is \(b_2 = 3\).

**Set up:**

$$F(x) = 3 + \frac{k_1}{x-2} + \frac{k_2}{x+3}$$

**Find \(k_1\)** (cover up \((x-2)\), set \(x = 2\)):

$$k_1 = \left.\frac{3x^2 + 9x - 20}{(x+3)}\right|_{x=2} = \frac{12 + 18 - 20}{5} = \frac{10}{5} = 2$$

**Find \(k_2\)** (cover up \((x+3)\), set \(x = -3\)):

$$k_2 = \left.\frac{3x^2 + 9x - 20}{(x-2)}\right|_{x=-3} = \frac{27 - 27 - 20}{-5} = \frac{-20}{-5} = 4$$

**Final Answer:**

$$\boxed{F(x) = 3 + \frac{2}{x-2} + \frac{4}{x+3}}$$

### The Takeaway

$$\text{Same degree} \implies \text{just add } b_n \text{ as a constant out front, then proceed normally.}$$

No long division needed. Just recognize the pattern! ✨

---

## Page 7: Recap and Summary

### What We Covered

This section was all about handling **repeated factors** in partial fraction expansion. Here's the complete picture:

---

### 1. Setting Up the Form ✅

For a repeated factor $$(x - \lambda)^r$$, you need **one term per power**:

$$\frac{a_0}{(x-\lambda)^r} + \frac{a_1}{(x-\lambda)^{r-1}} + \cdots + \frac{a_{r-1}}{x-\lambda}$$

Never write just one term for a repeated factor!

---

### 2. Three Methods for Finding Coefficients ✅

| Method | How It Works | Pros | Cons |
|--------|-------------|------|------|
| **Pure Heaviside** | Differentiate \(j\) times, divide by \(j!\), evaluate at root | Systematic | Gets messy for high orders |
| **Hybrid (Clearing Fractions)** | Use Heaviside for easy ones, then match polynomial coefficients | Clean algebra, built-in checks | More setup work |
| **Shortcuts** | Multiply by \(x\), let \(x \to \infty\); or plug in convenient \(x\) values | Fast and elegant | Requires some intuition |

---

### 3. The Heaviside Formula for Repeated Roots ✅

$$a_j = \left.\frac{1}{j!} \frac{d^j}{dx^j}\left[(x-\lambda)^r F(x)\right]\right|_{x=\lambda}, \quad j = 0, 1, \ldots, r-1$$

---

### 4. The \(m = n\) Special Case ✅

When numerator and denominator have the same degree:

$$F(x) = b_n + \frac{k_1}{x-\lambda_1} + \frac{k_2}{x-\lambda_2} + \cdots$$

Find all \(k_i\) exactly as you would for a proper function. Just don't forget the \(b_n\) out front!

---

### 5. The Running Example — Final Answer ✅

$$F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)} = \frac{2}{(x+1)^3} + \frac{1}{(x+1)^2} + \frac{3}{x+1} + \frac{1}{x+2}$$

All three methods give the same answer — as they should!

---

### Golden Rules to Remember

> 🔑 **Rule 1:** Count your terms carefully — one per power of each repeated factor.
>
> 🔑 **Rule 2:** Use Heaviside for the easiest coefficients first, then switch methods.
>
> 🔑 **Rule 3:** Always use the extra equations as a **


---

# B.5-5 Improper F(x) with m = n

- sectionId: `b.5-5`
- cached: `None`
- figures: `0`
- page_refs: `0`
- matplotlib_hint: `True`
- figure_unavailable_text: `False`
- file: `/Users/chenghaoxiang/.openclaw/workspace/tmp/b5-preview-20260426-1720-en/b.5-5.en.md`

%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6Im1hdHBsb3RsaWIiLCJyYXRpb25hbGUiOiJUaGlzIHNlY3Rpb24gaGFzIG5vIGV4dHJhY3RlZCB0ZXh0Ym9vayBmaWd1cmVzIGF2YWlsYWJsZSwgYnV0IHRoZSBrZXkgaWRlYSBpcyBoaWdobHkgdmlzdWFsOiBjb21wYXJlIHRoZSBpbXByb3BlciBmb3JtIHdpdGggbSA9IG4gdG8gdGhlIHVzdWFsIHByb3BlciBwYXJ0aWFsIGZyYWN0aW9uIGZvcm0gYW5kIHNob3cgd2hlcmUgdGhlIGV4dHJhIGNvbnN0YW50IHRlcm0gYXBwZWFycy4gQSBjbGVhbiBnZW5lcmF0ZWQgYWxnZWJyYSBsYXlvdXQgaXMgbW9yZSB1c2VmdWwgdGhhbiBhIGRlbnNlIHBhZ2Ugc2NyZWVuc2hvdC4iLCJjcmFtIjoiVXNlIHRoZSB2aXN1YWwgdG8gaGVscCBzdHVkZW50cyBpbnN0YW50bHkgc3BvdCB0aGUgcnVsZTogc2FtZSBkZWdyZWUgbWVhbnMgYWRkIG9uZSBjb25zdGFudCBmaXJzdCwgdGhlbiBkbyBwYXJ0aWFsIGZyYWN0aW9ucyBub3JtYWxseS4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgdmlzdWFsIHRvIGNvbm5lY3QgdGhlIGZvcm11bGEgcGF0dGVybiB0byBvbmUgd29ya2VkIGV4YW1wbGUsIHNvIHN0dWRlbnRzIGNhbiBzZWUgYm90aCB0aGUgZ2VuZXJhbCB0ZW1wbGF0ZSBhbmQgdGhlIG51bWVyaWMgY2FzZS4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhlIHZpc3VhbCB0byBjb250cmFzdCBwcm9wZXIgdnMgc3BlY2lhbCBpbXByb3BlciBzZXR1cCBhbmQgZXhwb3NlIHRoZSBjb21tb24gbWlzdGFrZSBvZiBmb3JnZXR0aW5nIHRoZSBsZWFkaW5nIGNvbnN0YW50IHRlcm0uIn0=" style="display:none;"></div>%%KC_END%%
# B.5-5 Improper Rational Functions — The Special Case m = n

> **Section Objective:** Learn to handle the special improper rational function where the numerator and denominator have the same degree, and apply the shortcut partial fraction setup directly.

---

Here is the good news: when the numerator and denominator of a rational function share the same degree (\ (m = n\)), the partial fraction process is almost identical to the proper case. You do not need to grind through full polynomial long division. The only difference is one extra constant term that appears at the front of the expansion.

This matters on exams because students often overcomplicate equal-degree cases by defaulting to long division when a direct pattern is available. Recognizing the \ (m = n\) signature and writing the correct setup immediately saves time and prevents errors.

In this section we will state the rule precisely, then walk through one representative worked example: \ (F(x) = (3x^2 + 9x - 20)/((x-2)(x+3))\).

> ⚠️ Chart render error: Traceback (most recent call last):
  File "/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/script-1777195922398-l4fo.py", line 50, in <module>
    plt.tight_layout()
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/pyplot.py", line 2843, in tight_layout
    gcf().tight_layout(pad=pad, h_pad=h_pad, w_pad=w_pad, rect=rect)
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/figure.py", line 3640, in tight_layout
    engine.execute(self)
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/layout_engine.py", line 188, in execute
    kwargs = get_tight_layout_figure(
             ^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/_tight_layout.py", line 266, in get_tight_layout_figure
    kwargs = _auto_adjust_subplotpars(fig, renderer,
             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/_tight_layout.py", line 82, in _auto_adjust_subplotpars
    bb += [martist._get_tightbbox_for_layout_only(ax, renderer)]
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/artist.py", line 1402, in _get_tightbbox_for_layout_only
    return obj.get_tightbbox(*args, **{**kwargs, "for_layout_only": True})
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/axes/_base.py", line 4587, in get_tightbbox
    bbox = a.get_tightbbox(renderer)
           ^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/artist.py", line 364, in get_tightbbox
    bbox = self.get_window_extent(renderer)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/text.py", line 969, in get_window_extent
    bbox, info, descent = self._get_layout(self._renderer)
                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/text.py", line 382, in _get_layout
    w, h, d = _get_text_metrics_with_cache(
              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/text.py", line 69, in _get_text_metrics_with_cache
    return _get_text_metrics_with_cache_impl(
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/text.py", line 77, in _get_text_metrics_with_cache_impl
    return renderer_ref().get_text_width_height_descent(text, fontprop, ismath)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/backends/backend_agg.py", line 215, in get_text_width_height_descent
    self.mathtext_parser.parse(s, self.dpi, prop)
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/mathtext.py", line 86, in parse
    return self._parse_cached(s, dpi, prop, antialiased, load_glyph_flags)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/mathtext.py", line 100, in _parse_cached
    box = self._parser.parse(s, fontset, fontsize, dpi)
          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/_mathtext.py", line 2167, in parse
    raise ValueError("\n" + ParseException.explain(err, 0)) from None
ValueError: 
F(x)\;=\;\underbrace{b_n}_{\text{extra constant}}\;+\;\dfrac{k_1}{x-\lambda_1}\;+\;\dfrac{k_2}{x-\lambda_2}\;+\;\cdots\;+\;\dfrac{k_n}{x-\lambda_n}
         ^
ParseFatalException: Unknown symbol: \underbrace, found '\'  (at char 9), (line:1, col:10)


## 1. The Special Rule When m = n

When the numerator and denominator of a rational function have the **same degree**, the function is improper — but only barely. The textbook shows that in this specific case you do not need to perform full polynomial long division. Instead, the partial fraction expansion takes the same form as the proper case, with exactly **one extra constant term** prepended.

That constant is \(b_n\): the leading coefficient of the numerator, assuming the denominator is written with leading coefficient 1 (monic). Once you write \(b_n\) at the front, all remaining coefficients \(k_1, k_2, \ldots, k_n\) are found in the usual way — by the cover-up substitution rule, exactly as in the proper case.

### COMMON MISTAKES

- **Forgetting \(b_n\):** Starting with only fractional terms makes the setup wrong from the first line.
- **Over-applying the shortcut:** This equal-degree shortcut applies **only** when \(m = n\). If \(m > n\) by more than zero, full long division is required.

#### Note
Always check degrees before writing any partial fraction setup.

$$F(x)=\frac{b_n x^n+b_{n-1}x^{n-1}+\cdots+b_1x+b_0}{x^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0}=b_n+\frac{k_1}{x-\lambda_1}+\frac{k_2}{x-\lambda_2}+\cdots+\frac{k_n}{x-\lambda_n}$$
*When the numerator and denominator have equal degree, the partial fraction expansion is the standard proper-case sum of fractions plus one extra leading constant \(b_n\) — the only structural addition the equal-degree case requires.*

$$k_r=(x-\lambda_r)F(x)\big|_{x=\lambda_r}$$
*Each partial fraction coefficient \(k_r\) is still computed by the same cover-up substitution rule used in the proper case — the presence of the constant \(b_n\) in the setup does not change how the remaining coefficients are extracted.*

## 2. Worked Example

Consider the function

$$
F(x) = \frac{3x^2 + 9x - 20}{(x-2)(x+3)}
$$

**Step 1 — Check degrees.** The numerator has degree 2 and the expanded denominator \((x-2)(x+3) = x^2 + x - 6\) also has degree 2, so \(m = n = 2\). The equal-degree rule applies.

**Step 2 — Identify \(b_n\).** The leading numerator coefficient is \(b_2 = 3\).

**Step 3 — Write the setup.**

$$
F(x) = 3 + \frac{k_1}{x-2} + \frac{k_2}{x+3}
$$

**Step 4 — Compute \(k_1\)** by substituting \(x = 2\):

$$
k_1 = (x-2)F(x)\big|_{x=2} = \frac{3(4)+9(2)-20}{2+3} = \frac{12+18-20}{5} = \frac{10}{5} = 2
$$

**Step 5 — Compute \(k_2\)** by substituting \(x = -3\):

$$
k_2 = (x+3)F(x)\big|_{x=-3} = \frac{3(9)+9(-3)-20}{-3-2} = \frac{27-27-20}{-5} = \frac{-20}{-5} = 4
$$

**Final answer:**

$$
F(x) = 3 + \frac{2}{x-2} + \frac{4}{x+3}
$$

### EXAM TIP

If you begin by writing only \(k_1/(x-2) + k_2/(x+3)\) with no constant in front, your setup is already wrong before you solve a single equation.

> ⚠️ Chart render error: Traceback (most recent call last):
  File "/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/script-1777195923073-9d37.py", line 47, in <module>
    plt.tight_layout()
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/pyplot.py", line 2843, in tight_layout
    gcf().tight_layout(pad=pad, h_pad=h_pad, w_pad=w_pad, rect=rect)
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/figure.py", line 3640, in tight_layout
    engine.execute(self)
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/layout_engine.py", line 188, in execute
    kwargs = get_tight_layout_figure(
             ^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/_tight_layout.py", line 266, in get_tight_layout_figure
    kwargs = _auto_adjust_subplotpars(fig, renderer,
             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/_tight_layout.py", line 82, in _auto_adjust_subplotpars
    bb += [martist._get_tightbbox_for_layout_only(ax, renderer)]
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/artist.py", line 1402, in _get_tightbbox_for_layout_only
    return obj.get_tightbbox(*args, **{**kwargs, "for_layout_only": True})
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/axes/_base.py", line 4587, in get_tightbbox
    bbox = a.get_tightbbox(renderer)
           ^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/artist.py", line 364, in get_tightbbox
    bbox = self.get_window_extent(renderer)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/text.py", line 969, in get_window_extent
    bbox, info, descent = self._get_layout(self._renderer)
                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/text.py", line 382, in _get_layout
    w, h, d = _get_text_metrics_with_cache(
              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/text.py", line 69, in _get_text_metrics_with_cache
    return _get_text_metrics_with_cache_impl(
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/text.py", line 77, in _get_text_metrics_with_cache_impl
    return renderer_ref().get_text_width_height_descent(text, fontprop, ismath)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/backends/backend_agg.py", line 215, in get_text_width_height_descent
    self.mathtext_parser.parse(s, self.dpi, prop)
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/mathtext.py", line 86, in parse
    return self._parse_cached(s, dpi, prop, antialiased, load_glyph_flags)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/mathtext.py", line 100, in _parse_cached
    box = self._parser.parse(s, fontset, fontsize, dpi)
          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/_mathtext.py", line 2167, in parse
    raise ValueError("\n" + ParseException.explain(err, 0)) from None
ValueError: 
k_1 = (x-2)F(x)\big|_{x=2} = \dfrac{12+18-20}{5} = \dfrac{10}{5} = 2
               ^
ParseFatalException: Unknown symbol: \big, found '\'  (at char 15), (line:1, col:16)


---
**📌 Key Takeaways**
- When numerator and denominator have equal degree, the m = n special improper case applies.
- Always include the extra constant term \(b_n\) at the front of the partial fraction setup.
- After writing \(b_n\), compute all remaining coefficients \(k_r\) using the standard cover-up substitution rule.

*In the next section we will look at modified partial fractions.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlY29nbml6ZV9lcXVhbF9kZWdyZWVfY2FzZSIsImxhYmVsIjoiUmVjb2duaXplIHdoZW4gdGhlIG0gPSBuIHNob3J0Y3V0IGFwcGxpZXMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHNpdHVhdGlvbiBtYXRjaGVzIHRoZSBzcGVjaWFsIHJ1bGUgaW4gdGhpcyBzZWN0aW9uPyIsIm9wdGlvbnMiOlsiQS4gVGhlIG51bWVyYXRvciBkZWdyZWUgaXMgbGVzcyB0aGFuIHRoZSBkZW5vbWluYXRvciBkZWdyZWUiLCJCLiBUaGUgbnVtZXJhdG9yIGRlZ3JlZSBpcyBncmVhdGVyIHRoYW4gdGhlIGRlbm9taW5hdG9yIGRlZ3JlZSBieSAxIiwiQy4gVGhlIG51bWVyYXRvciBhbmQgZGVub21pbmF0b3IgaGF2ZSB0aGUgc2FtZSBkZWdyZWUiLCJELiBUaGUgZGVub21pbmF0b3IgaGFzIGEgcmVwZWF0ZWQgcm9vdCJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlRoaXMgc2VjdGlvbiBoYW5kbGVzIHRoZSBzcGVjaWFsIGltcHJvcGVyIGNhc2UgXFwobSA9IG5cXCksIG1lYW5pbmcgdGhlIG51bWVyYXRvciBhbmQgZGVub21pbmF0b3IgaGF2ZSBlcXVhbCBkZWdyZWUuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhhdCBpcyB0aGUgb3JkaW5hcnkgcHJvcGVyIGNhc2UsIG5vdCB0aGUgc3BlY2lhbCBpbXByb3BlciBjYXNlIGhlcmUuIiwiQiI6IlRoYXQgaXMgc3RpbGwgaW1wcm9wZXIsIGJ1dCBpdCBpcyBub3QgdGhlIGVxdWFsLWRlZ3JlZSBzaG9ydGN1dCBkaXNjdXNzZWQgaGVyZS4iLCJEIjoiUmVwZWF0ZWQgcm9vdHMgY2hhbmdlIHRoZSBmcmFjdGlvbiBmb3JtLCBidXQgdGhleSBkbyBub3QgZGVmaW5lIHRoZSBcXChtID0gblxcKSBjYXNlLiJ9LCJoaW50IjoiRm9jdXMgb24gd2hhdCBcXChtXFwpIGFuZCBcXChuXFwpIGFyZSBjb21wYXJpbmcuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgcGFydGlhbCBmcmFjdGlvbnMsIHdoaWNoIGV4cHJlc3Npb24gaXMgdGhlIGNvcnJlY3Qgc2V0dXAgZm9yIGFuIGVxdWFsLWRlZ3JlZSByYXRpb25hbCBmdW5jdGlvbiB3aXRoIGRpc3RpbmN0IGxpbmVhciBmYWN0b3JzIGluIHRoZSBkZW5vbWluYXRvcj8iLCJvcHRpb25zIjpbIkEuIEZyYWN0aW9ucyBvbmx5LCB3aXRoIG5vIGNvbnN0YW50IHRlcm0iLCJCLiBPbmUgY29uc3RhbnQgdGVybSBwbHVzIHRoZSB1c3VhbCBwYXJ0aWFsIGZyYWN0aW9uIHRlcm1zIiwiQy4gQSBwb2x5bm9taWFsIG9mIGRlZ3JlZSAxIHBsdXMgdGhlIHVzdWFsIHBhcnRpYWwgZnJhY3Rpb24gdGVybXMiLCJELiBObyBleHBhbnNpb24gaXMgcG9zc2libGUgdW50aWwgbG9uZyBkaXZpc2lvbiBpcyBjb21wbGV0ZWQgaW4gZXZlcnkgY2FzZSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkZvciB0aGUgZXF1YWwtZGVncmVlIGNhc2UgaW4gdGhpcyBzZWN0aW9uLCB0aGUgc2V0dXAgaXMgdGhlIHByb3Blci1jYXNlIHBhcnRpYWwgZnJhY3Rpb25zIHBsdXMgb25lIGV4dHJhIGNvbnN0YW50IHRlcm0gXFwoYl9uXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgbWlzc2VzIHRoZSBrZXkgZmVhdHVyZSBvZiB0aGUgc2VjdGlvbjogdGhlIGV4dHJhIGNvbnN0YW50IHRlcm0gXFwoYl9uXFwpLiIsIkMiOiJBIGxpbmVhciBwb2x5bm9taWFsIGlzIG5vdCBuZWVkZWQgaGVyZTsgdGhlIGV4dHJhIHRlcm0gaXMganVzdCBhIHNpbmdsZSBjb25zdGFudC4iLCJEIjoiVGhlIHNlY3Rpb24gZ2l2ZXMgYSBkaXJlY3Qgc2V0dXAgZm9yIHRoaXMgc3BlY2lhbCBlcXVhbC1kZWdyZWUgY2FzZSB3aXRob3V0IHJlcXVpcmluZyBmdWxsIGxvbmcgZGl2aXNpb24uIn0sImhpbnQiOiJBc2sgd2hhdCBleHRyYSBwaWVjZSBhcHBlYXJzIHdoZW4gZGVncmVlcyBtYXRjaC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoicGF0dGVybl9jb21wYXJpc29uX2RpYWdyYW0iLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImlkZW50aWZ5X2V4dHJhX2NvbnN0YW50IiwibGFiZWwiOiJJZGVudGlmeSB0aGUgZXh0cmEgY29uc3RhbnQgdGVybSBibiIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSW4gdGhlIHRleHRib29rIGZvcm11bGEgZm9yIHRoZSBjYXNlIFxcKG0gPSBuXFwpLCB3aGF0IGlzIHRoZSBleHRyYSBjb25zdGFudCB0ZXJtIHRoYXQgYXBwZWFycyBiZWZvcmUgdGhlIHBhcnRpYWwgZnJhY3Rpb25zPyIsIm9wdGlvbnMiOlsiQS4gXFwoYV8wXFwpIiwiQi4gXFwoYl9uXFwpIiwiQy4gXFwoa19uXFwpIiwiRC4gXFwoXFxsYW1iZGFfblxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBzZWN0aW9uIHN0YXRlcyB0aGF0IHRoZSBvbmx5IGRpZmZlcmVuY2UgZnJvbSB0aGUgcHJvcGVyIGNhc2UgaXMgdGhlIGFwcGVhcmFuY2Ugb2YgdGhlIGV4dHJhIGNvbnN0YW50IFxcKGJfblxcKSwgdGhlIGxlYWRpbmcgbnVtZXJhdG9yIGNvZWZmaWNpZW50LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlxcKGFfMFxcKSBpcyBhIGRlbm9taW5hdG9yIGNvZWZmaWNpZW50LCBub3QgdGhlIGFkZGVkIGNvbnN0YW50IGluIHRoZSBleHBhbnNpb24uIiwiQyI6IlxcKGtfblxcKSBpcyBvbmUgb2YgdGhlIHBhcnRpYWwgZnJhY3Rpb24gY29lZmZpY2llbnRzLCBub3QgdGhlIHN0YW5kYWxvbmUgY29uc3RhbnQgdGVybS4iLCJEIjoiXFwoXFxsYW1iZGFfblxcKSBpcyBhIHJvb3QgbG9jYXRpb24sIG5vdCBhIGNvbnN0YW50IHRlcm0gaW4gdGhlIGV4cGFuc2lvbi4ifSwiaGludCI6Ikxvb2sgZm9yIHRoZSBsZWFkaW5nIG51bWVyYXRvciBjb2VmZmljaWVudC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIFxcKEYoeCkgPSAoNXheMiAtIHggKyAxKS8oeF4yICsgNHggLSAzKVxcKSBhbmQgdGhlIGRlbm9taW5hdG9yIGlzIG1vbmljLCB3aGF0IGNvbnN0YW50IHNob3VsZCBhcHBlYXIgZmlyc3QgaW4gdGhlIHBhcnRpYWwgZnJhY3Rpb24gc2V0dXA/Iiwib3B0aW9ucyI6WyJBLiAxIiwiQi4gLTEiLCJDLiA0IiwiRC4gNSJdLCJjb3JyZWN0X29wdGlvbiI6IkQiLCJleHBsYW5hdGlvbiI6IlRoZSBleHRyYSBjb25zdGFudCBpcyBcXChiX25cXCksIHRoZSBjb2VmZmljaWVudCBvZiB0aGUgaGlnaGVzdC1wb3dlciB0ZXJtIGluIHRoZSBudW1lcmF0b3IuIEhlcmUgdGhlIG51bWVyYXRvciBpcyBcXCg1eF4yIC0geCArIDFcXCksIHNvIFxcKGJfMiA9IDVcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiMSBpcyB0aGUgY29uc3RhbnQgdGVybSBcXChiXzBcXCkgaW4gdGhlIG51bWVyYXRvciwgbm90IHRoZSBsZWFkaW5nIGNvZWZmaWNpZW50LiIsIkIiOiItMSBpcyB0aGUgY29lZmZpY2llbnQgb2YgXFwoeFxcKSBpbiB0aGUgbnVtZXJhdG9yLCBub3Qgb2YgXFwoeF4yXFwpLiIsIkMiOiI0IGJlbG9uZ3MgdG8gdGhlIGRlbm9taW5hdG9yLCBzbyBpdCBwbGF5cyBubyByb2xlIGluIGRldGVybWluaW5nIFxcKGJfblxcKS4ifSwiaGludCI6IlVzZSB0aGUgY29lZmZpY2llbnQgb2YgdGhlIHRvcC1kZWdyZWUgbnVtZXJhdG9yIHRlcm0uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJjb21wdXRlX2NvZWZmaWNpZW50c19ub3JtYWxseSIsImxhYmVsIjoiQ29tcHV0ZSByZW1haW5pbmcgY29lZmZpY2llbnRzIGFzIGluIHRoZSBwcm9wZXIgY2FzZSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIFxcKEYoeCkgPSAoM3heMiArIDl4IC0gMjApLygoeC0yKSh4KzMpKVxcKSwgd2hpY2ggZmluYWwgZXhwYW5zaW9uIGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBcXCgzICsgXFxkZnJhY3syfXt4LTJ9ICsgXFxkZnJhY3s0fXt4KzN9XFwpIiwiQi4gXFwoMyArIFxcZGZyYWN7NH17eC0yfSArIFxcZGZyYWN7Mn17eCszfVxcKSIsIkMuIFxcKDIgKyBcXGRmcmFjezN9e3gtMn0gKyBcXGRmcmFjezR9e3grM31cXCkiLCJELiBcXCgzICsgXFxkZnJhY3syfXt4KzN9ICsgXFxkZnJhY3s0fXt4LTJ9XFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGhlIGVxdWFsLWRlZ3JlZSBzZXR1cCBnaXZlcyB0aGUgY29uc3RhbnQgXFwoYl8yID0gM1xcKSBmaXJzdCwgdGhlbiB0aGUgY292ZXItdXAgcnVsZSB5aWVsZHMgXFwoa18xID0gMlxcKSBhdCBcXCh4ID0gMlxcKSBhbmQgXFwoa18yID0gNFxcKSBhdCBcXCh4ID0gLTNcXCksIGVhY2ggYXR0YWNoZWQgdG8gaXRzIG93biBmYWN0b3IuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhlIGNvZWZmaWNpZW50cyBcXChrXzFcXCkgYW5kIFxcKGtfMlxcKSBhcmUgc3dhcHBlZCBiZXR3ZWVuIHRoZSB0d28gZmFjdG9ycy4iLCJDIjoiVGhlIGNvbnN0YW50IHRlcm0gc2hvdWxkIGJlIFxcKGJfMiA9IDNcXCksIG5vdCAyLiIsIkQiOiJFYWNoIGNvZWZmaWNpZW50IGlzIGF0dGFjaGVkIHRvIHRoZSB3cm9uZyBkZW5vbWluYXRvciBmYWN0b3IuIn0sImhpbnQiOiJNYXRjaCBlYWNoIHJvb3Qgd2l0aCBpdHMgb3duIGRlbm9taW5hdG9yIGZhY3RvciB3aGVuIGFwcGx5aW5nIHRoZSBjb3Zlci11cCBydWxlLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJ3b3JrZWRfZXhhbXBsZV9sYXlvdXQiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJBIHN0dWRlbnQgd3JpdGVzIFxcKEYoeCkgPSBcXGRmcmFjezJ9e3gtMn0gKyBcXGRmcmFjezR9e3grM31cXCkgZm9yIHRoZSBleGFtcGxlIGluIHRoaXMgc2VjdGlvbi4gV2hhdCBzaW5nbGUgdGVybSBpcyBtaXNzaW5nLCBhbmQgd2h5IG11c3QgaXQgYmUgdGhlcmU/IiwiaWRlYWxfYW5zd2VyIjoiVGhlIG1pc3NpbmcgdGVybSBpcyAzLiBJdCBtdXN0IGJlIHRoZXJlIGJlY2F1c2UgdGhlIG51bWVyYXRvciBhbmQgZGVub21pbmF0b3IgaGF2ZSB0aGUgc2FtZSBkZWdyZWUgKFxcKG0gPSBuID0gMlxcKSksIHNvIHRoZSBlcXVhbC1kZWdyZWUgc2V0dXAgcmVxdWlyZXMgdGhlIGV4dHJhIGNvbnN0YW50IFxcKGJfbiA9IDNcXCkgdG8gYXBwZWFyIGJlZm9yZSB0aGUgcGFydGlhbCBmcmFjdGlvbiB0ZXJtcy4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IGlkZW50aWZ5IHRoZSBtaXNzaW5nIHRlcm0gYXMgMyIsIk11c3Qgc3RhdGUgdGhhdCBcXChtID0gblxcKSBvciB0aGF0IHRoZSBkZWdyZWVzIGFyZSBlcXVhbCIsIk11c3QgZXhwbGFpbiB0aGF0IHRoZSBlcXVhbC1kZWdyZWUgY2FzZSByZXF1aXJlcyB0aGUgZXh0cmEgY29uc3RhbnQgXFwoYl9uXFwpIGluIHRoZSBzZXR1cCJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQgdW5kZXJzdGFuZHMgdGhlIGRlZmluaW5nIGZlYXR1cmUgb2YgdGhlIHNlY3Rpb24g4oCUIHRoZSBtYW5kYXRvcnkgZXh0cmEgY29uc3RhbnQg4oCUIHJhdGhlciB0aGFuIG9ubHkgY29weWluZyBhcml0aG1ldGljIGZyb20gdGhlIHdvcmtlZCBleGFtcGxlLiIsImhpbnQiOiJBc2sgd2hhdCBtYWtlcyB0aGlzIGV4YW1wbGUgc3RydWN0dXJhbGx5IGRpZmZlcmVudCBmcm9tIGFuIG9yZGluYXJ5IHByb3BlciBwYXJ0aWFsIGZyYWN0aW9uIHByb2JsZW0uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19XX0=" style="display:none;"></div>%%KC_END%%



---

# B.5-6 Modified Partial Fractions

- sectionId: `b.5-6`
- cached: `True`
- figures: `0`
- page_refs: `0`
- matplotlib_hint: `False`
- figure_unavailable_text: `False`
- file: `/Users/chenghaoxiang/.openclaw/workspace/tmp/b5-preview-20260426-1720-en/b.5-6.en.md`

%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6Im1hdHBsb3RsaWIiLCJyYXRpb25hbGUiOiJUaGlzIHNlY3Rpb24gaGFzIG5vIHVzYWJsZSB0ZXh0Ym9vayBmaWd1cmVzLCBidXQgdGhlIGtleSBleGFtIGlkZWEgaXMgaGlnaGx5IHZpc3VhbDogc3RhbmRhcmQgcGFydGlhbCBmcmFjdGlvbnMgdmVyc3VzIHRoZSBtb2RpZmllZCB4LXdlaWdodGVkIGZvcm0uIEEgY2xlYW4gc2lkZS1ieS1zaWRlIGFsZ2VicmEgbGF5b3V0IGhlbHBzIHN0dWRlbnRzIHJlY29nbml6ZSB0aGUgcmVxdWlyZWQgcGF0dGVybiBxdWlja2x5LiIsImNyYW0iOiJVc2Ugb25lIGNvbXBhcmlzb24gdmlzdWFsIHRvIHNob3cgdGhlIGZhc3Rlc3QgcmVjb2duaXRpb24gcnVsZTogaWYgdGhlIHRhcmdldCBmb3JtIG5lZWRzIHggaW4gZWFjaCBudW1lcmF0b3IsIGRpdmlkZSBieSB4IGZpcnN0LCBkZWNvbXBvc2UsIHRoZW4gbXVsdGlwbHkgYmFjay4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgdmlzdWFsIHRvIGNvbm5lY3QgdGhlIHN0YW5kYXJkIGRlY29tcG9zaXRpb24gb2YgRih4KS94IHRvIHRoZSBtb2RpZmllZCBkZWNvbXBvc2l0aW9uIG9mIEYoeCkgc3RlcCBieSBzdGVwLiIsInRvcF9zY29yZSI6IlVzZSB0aGUgdmlzdWFsIHRvIGV4cG9zZSBzZXR1cCB0cmFwcywgZXNwZWNpYWxseSByZXBlYXRlZCBmYWN0b3JzIGFuZCB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIGRlY29tcG9zaW5nIEYoeCkgYW5kIGRlY29tcG9zaW5nIEYoeCkveC4ifQ==" style="display:none;"></div>%%KC_END%%
# Modified Partial Fractions

> **Section Objective:** Recognize when inverse z-transform problems require the modified partial-fraction form, and execute the divide-then-multiply method without error.

---

Consider \(F(x) = \dfrac{5x^2 + 20x + 18}{(x+2)(x+3)^2}\). In inverse z-transform work, the required answer form is \(\dfrac{kx}{(x-\lambda)^r}\) — terms with \(x\) in the numerator — not the usual \(\dfrac{k}{(x-\lambda)^r}\). The fastest correct route: **divide \(F(x)\) by \(x\)**, perform ordinary partial fractions on \(F(x)/x\), then **multiply the entire result back by \(x\)**.

Two traps kill marks here. First, students forget to divide by \(x\) before decomposing and set up the wrong expression entirely. Second, the repeated factor \((x+3)^2\) demands **two** separate terms — one for \(1/(x+3)\) and one for \(1/(x+3)^2\) — and omitting the first-power term is the single most common setup error.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="exam_pattern_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgdG8gbWVtb3JpemUgdGhlIGRpdmlkZS10aGVuLW11bHRpcGx5IHBhdHRlcm4gaW4gb25lIGdsYW5jZS4iLCJzdGFuZGFyZCI6IlVzZSB0aGlzIHRvIGNvbm5lY3QgdGhlIHNldHVwIHRvIHRoZSBmaW5hbCBtb2RpZmllZCBmb3JtIGNsZWFybHkuIiwidG9wX3Njb3JlIjoiVXNlIHRoaXMgdG8gaGlnaGxpZ2h0IHdoZXJlIHJlcGVhdGVkLWZhY3RvciB0ZXJtcyBhbmQgeC13ZWlnaHRpbmcgY2FuIGJlIG1pc2hhbmRsZWQuIn0=" style="display:none;"></div>%%KC_END%%
*📊 Left: the ordinary partial-fraction setup applied to \(F(x)/x\), including both terms for the repeated factor \((x+3)^2\). Right: the final modified form obtained by multiplying every term back by \(x\). The arrow marks the single transformation step between the two panels.*
![Chart](/generated/fig-1777189055226-nc9du4lq.png)

## 1. Fast Recognition Rule

Use modified partial fractions whenever the **required answer form has \(x\) in the numerator** of each partial-fraction term — specifically the form \(\dfrac{kx}{(x-\lambda)^r}\). This arises routinely in inverse z-transform problems.

The method in plain terms: to obtain \(\dfrac{kx}{(x-\lambda)^r}\) terms, first expand \(F(x)/x\) in **ordinary** partial fractions. When the denominator contains factors like \((x+2)(x+3)^2\) and the context is an inverse z-transform, expect x-weighted terms in the final answer.

### RECOGNITION CUE

If the problem asks for a result in the form \(\dfrac{kx}{(x-\lambda)^r}\), that is your signal to divide by \(x\) before decomposing.

> **Memory aid:** ordinary decomposition first, x-weighted answer second.

$$\frac{F(x)}{x}=\frac{5x^2+20x+18}{x(x+2)(x+3)^2}=\frac{a_1}{x}+\frac{a_2}{x+2}+\frac{a_3}{x+3}+\frac{a_4}{(x+3)^2}$$
*This is the ordinary partial-fraction setup applied to \(F(x)/x\), with separate terms for both powers of the repeated factor \((x+3)^2\): one term for \(1/(x+3)\) and one for \(1/(x+3)^2\).*

## 2. Execute the Method on the Example

Solving for the constants in the ordinary decomposition of \(F(x)/x\) gives:
\(a_1 = 1\), \(a_2 = 1\), \(a_3 = -2\), \(a_4 = 1\).

Substituting these values yields the ordinary decomposition:
$$\frac{F(x)}{x} = \frac{1}{x}+\frac{1}{x+2}-\frac{2}{x+3}+\frac{1}{(x+3)^2}$$

Now **multiply every term by \(x\)**. The critical step: \(x \cdot \dfrac{1}{x} = 1\), producing the constant term. Every other term gains \(x\) in its numerator. The final result is:
$$F(x) = 1+\frac{x}{x+2}-\frac{2x}{x+3}+\frac{x}{(x+3)^2}$$

### COMMON MISTAKE

Do not stop at the \(F(x)/x\) stage and submit that as your answer. Multiplying back by \(x\) transforms **every** term — the constant \(1\) comes from \(x \cdot (1/x)\), and all remaining terms acquire \(x\) in the numerator.

$$\frac{F(x)}{x}=\frac{1}{x}+\frac{1}{x+2}-\frac{2}{x+3}+\frac{1}{(x+3)^2}$$
*These are the ordinary partial fractions of \(F(x)/x\) after solving for the four constants \(a_1 = 1\), \(a_2 = 1\), \(a_3 = -2\), \(a_4 = 1\).*

$$F(x)=1+\frac{x}{x+2}-\frac{2x}{x+3}+\frac{x}{(x+3)^2}$$
*This is the final modified partial-fraction form: every nonconstant term now carries \(x\) in the numerator, which is exactly the \(kx/(x-\lambda)^r\) structure required for inverse z-transform work.*

---
**📌 Key Takeaways**
- Use modified partial fractions when the required answer form is \(kx/(x-\lambda)^r\) with \(x\) in each numerator.
- The method: divide \(F(x)\) by \(x\), do ordinary partial fractions, then multiply the whole result back by \(x\).
- Repeated factor \((x+\lambda)^2\) demands two terms — one for \(1/(x+\lambda)\) and one for \(1/(x+\lambda)^2\) — never omit the lower-power term.

*In the next section we will move on to vectors and matrices.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlY29nbml6ZV9tb2RpZmllZF9mb3JtIiwibGFiZWwiOiJSZWNvZ25pemUgd2hlbiBtb2RpZmllZCBwYXJ0aWFsIGZyYWN0aW9ucyBhcmUgcmVxdWlyZWQiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHNpdHVhdGlvbiBtb3N0IGRpcmVjdGx5IHNpZ25hbHMgdGhhdCB5b3Ugc2hvdWxkIHVzZSB0aGUgbW9kaWZpZWQgcGFydGlhbC1mcmFjdGlvbiBtZXRob2QgZnJvbSB0aGlzIHNlY3Rpb24/Iiwib3B0aW9ucyI6WyJBLiBUaGUgZGVub21pbmF0b3IgaGFzIG9ubHkgZGlzdGluY3QgbGluZWFyIGZhY3RvcnMiLCJCLiBUaGUgZmluYWwgYW5zd2VyIGlzIHJlcXVpcmVkIGluIHRlcm1zIGxpa2UgXFwoa3gvKHgtXFxsYW1iZGEpXnJcXCkiLCJDLiBUaGUgbnVtZXJhdG9yIGRlZ3JlZSBpcyBsZXNzIHRoYW4gdGhlIGRlbm9taW5hdG9yIGRlZ3JlZSIsIkQuIFRoZXJlIGlzIGEgcmVwZWF0ZWQgZmFjdG9yIGluIHRoZSBkZW5vbWluYXRvciJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBkZWZpbmluZyB0cmlnZ2VyIGlzIHRoZSByZXF1aXJlZCBhbnN3ZXIgZm9ybTogdGVybXMgd2l0aCBcXCh4XFwpIGluIHRoZSBudW1lcmF0b3IsIHN1Y2ggYXMgXFwoa3gvKHgtXFxsYW1iZGEpXnJcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiRGlzdGluY3QgbGluZWFyIGZhY3RvcnMgYWxvbmUgZG8gbm90IGZvcmNlIHRoZSBtb2RpZmllZCBtZXRob2QuIiwiQyI6IlRoYXQgaXMgYSBzdGFuZGFyZCBjb25kaXRpb24gZm9yIHByb3BlciBmcmFjdGlvbnMsIG5vdCB0aGUgdHJpZ2dlciBmb3IgdGhpcyBtZXRob2QuIiwiRCI6IlJlcGVhdGVkIGZhY3RvcnMgYWZmZWN0IHRoZSBzZXR1cCwgYnV0IHRoZXkgZG8gbm90IGJ5IHRoZW1zZWx2ZXMgZGVmaW5lIHRoZSBtb2RpZmllZCBtZXRob2QuIn0sImhpbnQiOiJBc2sgd2hhdCB0aGUgZmluYWwgbnVtZXJhdG9yIGlzIHN1cHBvc2VkIHRvIGxvb2sgbGlrZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciBpbnZlcnNlIHotdHJhbnNmb3JtIHdvcmssIGEgcHJvYmxlbSBhc2tzIGZvciB0ZXJtcyBvZiB0aGUgZm9ybSBcXChreC8oeC1cXGxhbWJkYV9pKV5yXFwpLiBXaGF0IGlzIHRoZSBmYXN0ZXN0IGNvcnJlY3Qgc2V0dXAgbW92ZT8iLCJvcHRpb25zIjpbIkEuIEV4cGFuZCBcXChGKHgpXFwpIGRpcmVjdGx5IGludG8gb3JkaW5hcnkgcGFydGlhbCBmcmFjdGlvbnMiLCJCLiBNdWx0aXBseSBcXChGKHgpXFwpIGJ5IFxcKHhcXCkgZmlyc3QsIHRoZW4gZGVjb21wb3NlIiwiQy4gRXhwYW5kIFxcKEYoeCkveFxcKSBpbnRvIG9yZGluYXJ5IHBhcnRpYWwgZnJhY3Rpb25zLCB0aGVuIG11bHRpcGx5IGJhY2sgYnkgXFwoeFxcKSIsIkQuIFJlcGxhY2UgZXZlcnkgbnVtZXJhdG9yIGJ5IFxcKHhcXCkgaW1tZWRpYXRlbHkiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJUaGlzIHNlY3Rpb24ncyBtZXRob2QgaXMgZXhhY3RseTogZGl2aWRlIGJ5IFxcKHhcXCksIGRlY29tcG9zZSBub3JtYWxseSwgdGhlbiBtdWx0aXBseSBib3RoIHNpZGVzIGJ5IFxcKHhcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhhdCBtaXNzZXMgdGhlIG1vZGlmaWVkIG51bWVyYXRvciBzdHJ1Y3R1cmUgdGhlIHNlY3Rpb24gaXMgdGFyZ2V0aW5nLiIsIkIiOiJUaGUgbWV0aG9kIGRpdmlkZXMgYnkgXFwoeFxcKSBmaXJzdCwgbm90IG11bHRpcGxpZXMgZmlyc3QuIiwiRCI6IllvdSBjYW5ub3QgZm9yY2UgXFwoeFxcKSBudW1lcmF0b3JzIGJ5IGd1ZXNzd29yazsgeW91IG11c3QgdHJhbnNmb3JtIHRoZSB3aG9sZSBleHByZXNzaW9uIGNvcnJlY3RseS4ifSwiaGludCI6IlRoaW5rOiBvcmRpbmFyeSBkZWNvbXBvc2l0aW9uIGZpcnN0LCB4LXdlaWdodGVkIGFuc3dlciBzZWNvbmQuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJzZXR1cF93aXRoX3JlcGVhdGVkX2ZhY3RvciIsImxhYmVsIjoiU2V0IHVwIEYoeCkveCBjb3JyZWN0bHksIGluY2x1ZGluZyByZXBlYXRlZCBmYWN0b3JzIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgXFwoXFxkZnJhY3tGKHgpfXt4fT1cXGRmcmFjezV4XjIrMjB4KzE4fXt4KHgrMikoeCszKV4yfVxcKSwgd2hpY2ggaXMgdGhlIGNvcnJlY3Qgb3JkaW5hcnkgcGFydGlhbC1mcmFjdGlvbiBzZXR1cD8iLCJvcHRpb25zIjpbIkEuIFxcKFxcZGZyYWN7YV8xfXt4fStcXGRmcmFje2FfMn17eCsyfStcXGRmcmFje2FfM317KHgrMyleMn1cXCkiLCJCLiBcXChcXGRmcmFje2FfMX17eH0rXFxkZnJhY3thXzJ9e3grMn0rXFxkZnJhY3thXzN9e3grM30rXFxkZnJhY3thXzR9eyh4KzMpXjJ9XFwpIiwiQy4gXFwoXFxkZnJhY3thXzEgeH17eH0rXFxkZnJhY3thXzIgeH17eCsyfStcXGRmcmFje2FfMyB4fXt4KzN9K1xcZGZyYWN7YV80IHh9eyh4KzMpXjJ9XFwpIiwiRC4gXFwoXFxkZnJhY3thXzF9e3goeCsyKX0rXFxkZnJhY3thXzJ9eyh4KzMpXjJ9XFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIGZhY3RvciBcXCh4XFwpIGNvbnRyaWJ1dGVzIGEgdGVybSBcXChhXzEveFxcKSwgdGhlIHNpbXBsZSBmYWN0b3IgXFwoeCsyXFwpIGNvbnRyaWJ1dGVzIFxcKGFfMi8oeCsyKVxcKSwgYW5kIHRoZSByZXBlYXRlZCBmYWN0b3IgXFwoKHgrMyleMlxcKSByZXF1aXJlcyBib3RoIFxcKGFfMy8oeCszKVxcKSBhbmQgXFwoYV80Lyh4KzMpXjJcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiSXQgaXMgbWlzc2luZyB0aGUgXFwoMS8oeCszKVxcKSB0ZXJtIHJlcXVpcmVkIGJ5IHRoZSByZXBlYXRlZCBmYWN0b3IuIiwiQyI6IlRoYXQgaW5jb3JyZWN0bHkgaW5zZXJ0cyB0aGUgbW9kaWZpZWQgXFwoeFxcKSBudW1lcmF0b3JzIHRvbyBlYXJseSDigJQgdGhpcyBzdGVwIGlzIHN0aWxsIG9yZGluYXJ5IHBhcnRpYWwgZnJhY3Rpb25zLiIsIkQiOiJUaGF0IGlzIG5vdCB0aGUgc3RhbmRhcmQgZGVjb21wb3NpdGlvbiBwYXR0ZXJuIGZvciBsaW5lYXIgYW5kIHJlcGVhdGVkIGxpbmVhciBmYWN0b3JzLiJ9LCJoaW50IjoiQSByZXBlYXRlZCBsaW5lYXIgZmFjdG9yIG9mIHBvd2VyIDIgbmVlZHMgdHdvIHRlcm1zOiBvbmUgZm9yIGVhY2ggcG93ZXIgZnJvbSAxIHVwIHRvIDIuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImFsZ2VicmFfbGF5b3V0X2NvbXBhcmlzb24iLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkEgc3R1ZGVudCB3cml0ZXMgXFwoXFxkZnJhY3tGKHgpfXt4fT1cXGRmcmFje2FfMX17eH0rXFxkZnJhY3thXzJ9e3grMn0rXFxkZnJhY3thXzN9eyh4KzMpXjJ9XFwpLiBXaGF0IHJlcXVpcmVkIHRlcm0gaXMgbWlzc2luZywgYW5kIHdoeSBtdXN0IGl0IGJlIGluY2x1ZGVkPyIsImlkZWFsX2Fuc3dlciI6IlRoZSBtaXNzaW5nIHRlcm0gaXMgXFwoXFxkZnJhY3thXzN9e3grM31cXCkgKGEgc2VwYXJhdGUgZmlyc3QtcG93ZXIgdGVybSkuIEJlY2F1c2UgXFwoKHgrMyleMlxcKSBpcyBhIHJlcGVhdGVkIGxpbmVhciBmYWN0b3IsIHRoZSBkZWNvbXBvc2l0aW9uIG11c3QgaW5jbHVkZSBib3RoIFxcKDEvKHgrMylcXCkgYW5kIFxcKDEvKHgrMyleMlxcKSDigJQgb25lIHRlcm0gZm9yIGVhY2ggcG93ZXIgZnJvbSAxIHVwIHRvIHRoZSBoaWdoZXN0IHBvd2VyIDIuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBpZGVudGlmeSB0aGUgbWlzc2luZyBmaXJzdC1wb3dlciB0ZXJtIFxcKDEvKHgrMylcXCkiLCJNdXN0IHN0YXRlIHRoYXQgXFwoKHgrMyleMlxcKSBpcyBhIHJlcGVhdGVkIGZhY3RvciIsIk11c3QgZXhwbGFpbiB0aGF0IHJlcGVhdGVkIGZhY3RvcnMgcmVxdWlyZSBhbGwgcG93ZXJzIHVwIHRvIHRoZSBoaWdoZXN0IHBvd2VyIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCBrbm93cyB0aGUgc3RhbmRhcmQgcmVwZWF0ZWQtZmFjdG9yIHRlbXBsYXRlIOKAlCBhIGNvbW1vbiBleGFtIHRyYXAgd2hlcmUgc3R1ZGVudHMgaW5jbHVkZSBvbmx5IHRoZSBoaWdoZXN0IHBvd2VyIGFuZCBvbWl0IHRoZSBpbnRlcm1lZGlhdGUgb25lcy4iLCJoaW50IjoiRm9yIFxcKCh4KzMpXjJcXCksIGxpc3QgdGhlIGRlbm9taW5hdG9yIHBvd2VycyBmcm9tIDEgdXAgdG8gMi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImZpbmFsX21vZGlmaWVkX3Jlc3VsdCIsImxhYmVsIjoiQ29udmVydCB0aGUgb3JkaW5hcnkgZGVjb21wb3NpdGlvbiBiYWNrIHRvIHRoZSBtb2RpZmllZCBmaW5hbCBmb3JtIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJHaXZlbiBcXChcXGRmcmFje0YoeCl9e3h9PVxcZGZyYWN7MX17eH0rXFxkZnJhY3sxfXt4KzJ9LVxcZGZyYWN7Mn17eCszfStcXGRmcmFjezF9eyh4KzMpXjJ9XFwpLCB3aGljaCBpcyB0aGUgY29ycmVjdCBleHByZXNzaW9uIGZvciBcXChGKHgpXFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoRih4KT1cXGRmcmFjezF9e3h9K1xcZGZyYWN7MX17eCsyfS1cXGRmcmFjezJ9e3grM30rXFxkZnJhY3sxfXsoeCszKV4yfVxcKSIsIkIuIFxcKEYoeCk9eCtcXGRmcmFje3h9e3grMn0tXFxkZnJhY3syeH17eCszfStcXGRmcmFje3h9eyh4KzMpXjJ9XFwpIiwiQy4gXFwoRih4KT0xK1xcZGZyYWN7eH17eCsyfS1cXGRmcmFjezJ4fXt4KzN9K1xcZGZyYWN7eH17KHgrMyleMn1cXCkiLCJELiBcXChGKHgpPTErXFxkZnJhY3sxfXt4KzJ9LVxcZGZyYWN7Mn17eCszfStcXGRmcmFjezF9eyh4KzMpXjJ9XFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiTXVsdGlwbHlpbmcgYm90aCBzaWRlcyBieSBcXCh4XFwpIHR1cm5zIFxcKDEveFxcKSBpbnRvIFxcKDFcXCkgKHNpbmNlIFxcKHggXFxjZG90IDEveCA9IDFcXCkpLCBhbmQgbXVsdGlwbGllcyBlYWNoIHJlbWFpbmluZyB0ZXJtIGJ5IFxcKHhcXCkgaW4gdGhlIG51bWVyYXRvci4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGF0IGlzIHN0aWxsIHRoZSBkZWNvbXBvc2l0aW9uIG9mIFxcKEYoeCkveFxcKSwgbm90IFxcKEYoeClcXCkg4oCUIHRoZSBzdHVkZW50IGZvcmdvdCB0byBtdWx0aXBseSBieSBcXCh4XFwpLiIsIkIiOiJcXCh4IFxcY2RvdCAoMS94KSA9IDFcXCksIG5vdCBcXCh4XFwpOyB0aGUgZmlyc3QgdGVybSBpcyB3cm9uZy4iLCJEIjoiSXQgY29ycmVjdGx5IGhhbmRsZXMgdGhlIGZpcnN0IHRlcm0gYnV0IGZvcmdldHMgdG8gbXVsdGlwbHkgdGhlIGxhc3QgdGhyZWUgdGVybXMgYnkgXFwoeFxcKS4ifSwiaGludCI6Ik11bHRpcGx5IGV2ZXJ5IHRlcm0gb24gdGhlIHJpZ2h0IGJ5IFxcKHhcXCkgY2FyZWZ1bGx5LCBpbmNsdWRpbmcgdGhlIFxcKDEveFxcKSB0ZXJtLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoeSBkb2VzIGEgY29uc3RhbnQgdGVybSBhcHBlYXIgaW4gdGhlIGZpbmFsIGFuc3dlciBmb3IgXFwoRih4KVxcKT8iLCJvcHRpb25zIjpbIkEuIEJlY2F1c2UgdGhlIG51bWVyYXRvciBkZWdyZWUgaXMgMiIsIkIuIEJlY2F1c2UgXFwoeCBcXGNkb3QgKDEveCkgPSAxXFwpIiwiQy4gQmVjYXVzZSByZXBlYXRlZCByb290cyBhbHdheXMgY3JlYXRlIGNvbnN0YW50cyIsIkQuIEJlY2F1c2UgXFwoKHgrMilcXCkgY2FuY2VscyB3aXRoIFxcKHhcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgY29uc3RhbnQgY29tZXMgZGlyZWN0bHkgZnJvbSBtdWx0aXBseWluZyB0aGUgXFwoMS94XFwpIHRlcm0gYnkgXFwoeFxcKTogXFwoeCBcXGNkb3QgKDEveCkgPSAxXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBudW1lcmF0b3IgZGVncmVlIGFsb25lIGRvZXMgbm90IGV4cGxhaW4gdGhpcyBzcGVjaWZpYyBjb25zdGFudCB0ZXJtLiIsIkMiOiJSZXBlYXRlZCByb290cyBkbyBub3QgYXV0b21hdGljYWxseSBjcmVhdGUgYSBjb25zdGFudCB0ZXJtIGluIHRoZSBmaW5hbCBhbnN3ZXIuIiwiRCI6Ik5vIHN1Y2ggY2FuY2VsbGF0aW9uIGJldHdlZW4gXFwoKHgrMilcXCkgYW5kIFxcKHhcXCkgb2NjdXJzIGluIHRoaXMgcHJvYmxlbS4ifSwiaGludCI6IlRyYWNrIG9ubHkgdGhlIGZpcnN0IHRlcm0gd2hlbiBtdWx0aXBseWluZyBiYWNrIGJ5IFxcKHhcXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfV19" style="display:none;"></div>%%KC_END%%

