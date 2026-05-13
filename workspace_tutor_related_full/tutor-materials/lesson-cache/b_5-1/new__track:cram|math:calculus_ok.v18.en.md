%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6Im1hdHBsb3RsaWIiLCJyYXRpb25hbGUiOiJObyBjcm9wcGVkIHRleHRib29rIGZpZ3VyZXMgYXJlIGF2YWlsYWJsZSwgYW5kIHRoaXMgc2VjdGlvbiBpcyBhbGdlYnJhLXByb2Nlc3MgaGVhdnkuIEEgY2xlYW4gZ2VuZXJhdGVkIGZsb3cgdmlzdWFsIGlzIHRoZSBmYXN0ZXN0IHdheSB0byBzaG93IHRoZSBleGFtIHBhdHRlcm46IGZhY3RvciBkZW5vbWluYXRvciwgd3JpdGUgYWxsIG5lZWRlZCBwYXJ0aWFsLWZyYWN0aW9uIHRlcm1zLCBjbGVhciBkZW5vbWluYXRvcnMsIGV4cGFuZCwgZXF1YXRlIGNvZWZmaWNpZW50cywgc29sdmUgY29uc3RhbnRzLiIsImNyYW0iOiJVc2UgdmlzdWFscyBhcyBhIG9uZS1nbGFuY2UgcHJvY2VkdXJlIG1hcCBhbmQgYXMgYSByZXBlYXRlZC1mYWN0b3IgY2hlY2tsaXN0IHNvIHN0dWRlbnRzIGNhbiBzcG90IHRoZSBzZXR1cCBmYXN0IHVuZGVyIHRpbWUgcHJlc3N1cmUuIiwic3RhbmRhcmQiOiJVc2UgdmlzdWFscyB0byBjbGFyaWZ5IHRoZSBzZXF1ZW5jZSBvZiBhbGdlYnJhIHN0ZXBzIGFuZCBjb25uZWN0IHRoZSBzeW1ib2xpYyBzZXR1cCB0byB0aGUgc29sdmVkIGV4YW1wbGUuIiwidG9wX3Njb3JlIjoiVXNlIHZpc3VhbHMgdG8gZXhwb3NlIHNldHVwIHRyYXBzLCBlc3BlY2lhbGx5IG1pc3NpbmcgdGVybXMgZm9yIHJlcGVhdGVkIGZhY3RvcnMgYW5kIGtub3dpbmcgd2hlbiBjbGVhcmluZyBmcmFjdGlvbnMgaXMgdW5pdmVyc2FsIGJ1dCBub3QgYWx3YXlzIGZhc3Rlc3QuIn0=" style="display:none;"></div>%%KC_END%%
# B.5-1 Method of Clearing Fractions

> **Objective:** Master the universal fallback method for partial fraction expansion — write the correct form, clear denominators, equate coefficients, and solve.

---

This method is your **reliable workhorse** for partial fraction expansion. The exam tests three things: choosing the correct denominator pieces, including every required term for repeated factors, and building the simultaneous equations correctly after clearing fractions.

The procedure: write unknown partial fractions, multiply through to clear all denominators, expand, collect like powers of \(x\), then equate coefficients to get a linear system.

This method works broadly — but can be slower than cover-up for simple cases.

### FAST RECOGNITION RULE

If the denominator has a repeated factor like \((x+3)^2\), you must include **both** \(\dfrac{1}{x+3}\) and \(\dfrac{1}{(x+3)^2}\) — never just one.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="exam_pattern_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgYXMgdGhlIG1lbW9yaXphdGlvbiBtYXA6IHNldHVwLCBjbGVhciwgZXhwYW5kLCBlcXVhdGUsIHNvbHZlLiIsInN0YW5kYXJkIjoiVXNlIHRoaXMgdG8gb3JnYW5pemUgdGhlIGFsZ2VicmEgc3RlcHMgYmVmb3JlIHRoZSB3b3JrZWQgZXhhbXBsZS4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhpcyB0byBjb21wYXJlIGEgY29ycmVjdCBzZXR1cCBhZ2FpbnN0IGNvbW1vbiBzZXR1cCBtaXN0YWtlcy4ifQ==" style="display:none;"></div>%%KC_END%%
*📊 The five-step clearing-fractions procedure. The red box highlights the repeated-factor rule — the most common setup trap on exams.*
![Chart](/generated/fig-1777195528690-inf8c7d1.png)

## 1. Set Up the Correct Partial-Fraction Form

Before touching any algebra, write every required term from the factored denominator. This is a **checklist step**, not a derivation.

### SETUP CHECKLIST

| Denominator Factor | Terms Required |
|---|---|
| \((x+a)\) — distinct | \(\dfrac{k}{x+a}\) — one term |
| \((x+a)^2\) — repeated | \(\dfrac{k_1}{x+a} + \dfrac{k_2}{(x+a)^2}\) — two terms |

For the denominator \((x+1)(x+2)(x+3)^2\):
- \((x+1)\) → one term: \(k_1/(x+1)\)
- \((x+2)\) → one term: \(k_2/(x+2)\)
- \((x+3)^2\) → **two terms**: \(k_3/(x+3)\) and \(k_4/(x+3)^2\)

### HIGHEST-FREQUENCY TRAP

Students routinely write only \(k_4/(x+3)^2\) and forget the separate \(k_3/(x+3)\) term. Both are required whenever a factor is repeated.

#### Remember

For a factor \((x+a)^r\), you need terms for every power from \(1\) up to \(r\).

Wrong setup means all later algebra is wasted.

$$\frac{x^3+3x^2+4x+6}{(x+1)(x+2)(x+3)^2}=\frac{k_1}{x+1}+\frac{k_2}{x+2}+\frac{k_3}{x+3}+\frac{k_4}{(x+3)^2}$$
*This is the correct partial-fraction template: each distinct linear factor \((x+1)\) and \((x+2)\) contributes one term, while the repeated factor \((x+3)^2\) contributes two terms — one for each power up to the repeat.*

## 2. Clear Fractions and Equate Coefficients

Once the setup is correct, the procedure is mechanical:

**Step 1 — Multiply both sides** by the full denominator \((x+1)(x+2)(x+3)^2\). Every fraction cancels, leaving a polynomial identity.

**Step 2 — Expand the right side** completely. Distribute each constant \(k_i\) through its corresponding product of remaining factors.

**Step 3 — Collect like powers.** Group all \(x^3\) terms, all \(x^2\) terms, all \(x\) terms, and the constant term separately.

**Step 4 — Equate coefficients.** The OCR example yields the system:

$$
\begin{aligned}
k_1+k_2+k_3&=1\\
8k_1+7k_2+6k_3+k_4&=3\\
21k_1+15k_2+11k_3+3k_4&=4\\
18k_1+9k_2+6k_3+2k_4&=6
\end{aligned}
$$

### CRITICAL TRAP

Do **not** equate coefficients before clearing fractions. The comparison only makes sense once both sides are polynomials with no denominators.

$$\begin{aligned}k_1+k_2+k_3&=1\\8k_1+7k_2+6k_3+k_4&=3\\21k_1+15k_2+11k_3+3k_4&=4\\18k_1+9k_2+6k_3+2k_4&=6\end{aligned}$$
*Matching the coefficients of \(x^3\), \(x^2\), \(x\), and the constant term on both sides of the cleared polynomial identity converts the partial-fraction problem into a four-equation linear system for the unknown constants \(k_1, k_2, k_3, k_4\).*

## 3. Final Answer and Fastest Exam Checks

Solving the system gives \(k_1=1\), \(k_2=-2\), \(k_3=2\), \(k_4=-3\), so:

$$F(x)=\frac{1}{x+1}-\frac{2}{x+2}+\frac{2}{x+3}-\frac{3}{(x+3)^2}$$

You do not need to admire the system — you need to verify the setup and signs.

### TWO QUICK CHECKS

1. **Repeated-factor check:** The repeated factor \((x+3)^2\) produced exactly two constants (\(k_3\) and \(k_4\)). If you only have one, your setup was wrong.
2. **Denominator-structure check:** The final expression uses exactly the same denominator pieces as the original setup — no new denominators appear, none disappear.

#### Note

This method is universal and always works, but solving a \(4 \times 4\) system is slow. For distinct linear factors, the cover-up method (next section) is significantly faster.

$$F(x)=\frac{1}{x+1}-\frac{2}{x+2}+\frac{2}{x+3}-\frac{3}{(x+3)^2}$$
*This is the completed partial-fraction expansion, obtained by substituting the solved constants \(k_1=1\), \(k_2=-2\), \(k_3=2\), \(k_4=-3\) back into the original setup template.*

---
**📌 Key Takeaways**
- Always write every required term before any algebra — repeated factor \((x+a)^2\) needs two terms.
- Clear all denominators first by multiplying through, then collect powers before equating coefficients.
- Verify the final answer uses exactly the same denominator pieces as your original setup.

*In the next section we will learn a faster method for distinct linear factors.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InBmX3NldHVwX2Zyb21fZmFjdG9yZWRfZGVub21pbmF0b3IiLCJsYWJlbCI6IkNob29zZSB0aGUgY29ycmVjdCBwYXJ0aWFsLWZyYWN0aW9uIGZvcm0gZnJvbSB0aGUgZGVub21pbmF0b3IiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGlzIHRoZSBjb3JyZWN0IHBhcnRpYWwtZnJhY3Rpb24gc2V0dXAgZm9yIFxcKFxcZGZyYWN7UCh4KX17KHgrMSkoeCsyKSh4KzMpXjJ9XFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoXFxkZnJhY3tBfXt4KzF9K1xcZGZyYWN7Qn17eCsyfStcXGRmcmFje0N9eyh4KzMpXjJ9XFwpIiwiQi4gXFwoXFxkZnJhY3tBfXt4KzF9K1xcZGZyYWN7Qn17eCsyfStcXGRmcmFje0N9e3grM30rXFxkZnJhY3tEfXsoeCszKV4yfVxcKSIsIkMuIFxcKFxcZGZyYWN7QX17KHgrMSkoeCsyKX0rXFxkZnJhY3tCfXsoeCszKV4yfVxcKSIsIkQuIFxcKFxcZGZyYWN7QX17eCsxfStcXGRmcmFje0J9e3grMn0rXFxkZnJhY3tDfXt4KzN9XFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiQSByZXBlYXRlZCBsaW5lYXIgZmFjdG9yIFxcKCh4KzMpXjJcXCkgcmVxdWlyZXMgYm90aCBcXCgxLyh4KzMpXFwpIGFuZCBcXCgxLyh4KzMpXjJcXCkgdGVybXMsIGFsb25nIHdpdGggdGVybXMgZm9yIHRoZSBvdGhlciBkaXN0aW5jdCBmYWN0b3JzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6Ikl0IG9taXRzIHRoZSBcXCgxLyh4KzMpXFwpIHRlcm0gcmVxdWlyZWQgYnkgdGhlIHJlcGVhdGVkIGZhY3Rvci4iLCJDIjoiUGFydGlhbCBmcmFjdGlvbnMgc3BsaXQgaW50byBzaW1wbGVyIGRlbm9taW5hdG9yIGZhY3RvcnMsIG5vdCBncm91cGVkIHByb2R1Y3RzIGxpa2UgXFwoKHgrMSkoeCsyKVxcKSBoZXJlLiIsIkQiOiJJdCBvbWl0cyB0aGUgXFwoMS8oeCszKV4yXFwpIHRlcm0gcmVxdWlyZWQgYnkgdGhlIHJlcGVhdGVkIGZhY3Rvci4ifSwiaGludCI6IkZvciBhIHJlcGVhdGVkIGZhY3RvciBcXCgoeCthKV4yXFwpLCBjb3VudCB0d28gdGVybXMsIG5vdCBvbmUuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBzdHVkZW50IHdyaXRlcyBcXChcXGRmcmFje0F9e3grMX0rXFxkZnJhY3tCfXt4KzJ9K1xcZGZyYWN7Q317KHgrMyleMn1cXCkgZm9yIGEgZGVub21pbmF0b3IgXFwoKHgrMSkoeCsyKSh4KzMpXjJcXCkuIFdoYXQgaXMgdGhlIG1pc3Rha2U/Iiwib3B0aW9ucyI6WyJBLiBUaGUgdGVybSBcXChBLyh4KzEpXFwpIHNob3VsZCBiZSBzcXVhcmVkIiwiQi4gVGhlIHRlcm0gXFwoQi8oeCsyKVxcKSBzaG91bGQgYmUgbmVnYXRpdmUiLCJDLiBUaGUgc2V0dXAgaXMgbWlzc2luZyBhIFxcKDEvKHgrMylcXCkgdGVybSIsIkQuIFRoZXJlIHNob3VsZCBiZSBubyB0ZXJtIGludm9sdmluZyBcXCgoeCszKV4yXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiQSByZXBlYXRlZCBmYWN0b3Igb2YgcG93ZXIgMiBuZWVkcyB0d28gc2VwYXJhdGUgdGVybXM6IG9uZSBvdmVyIFxcKCh4KzMpXFwpIGFuZCBvbmUgb3ZlciBcXCgoeCszKV4yXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkRpc3RpbmN0IGZhY3RvcnMgXFwoKHgrMSlcXCkgYW5kIFxcKCh4KzIpXFwpIGVhY2ggY29udHJpYnV0ZSBvbmx5IG9uZSBmaXJzdC1wb3dlciB0ZXJtLiIsIkIiOiJTaWducyBvZiBjb2VmZmljaWVudHMgYXJlIG5vdCBkZWNpZGVkIGF0IHNldHVwIHRpbWUuIiwiRCI6IlRoZSBcXCgoeCszKV4yXFwpIHRlcm0gaXMgcmVxdWlyZWQsIG5vdCBmb3JiaWRkZW4uIn0sImhpbnQiOiJSZXBlYXRlZCBmYWN0b3IgbWVhbnMgYSBzdGFjayBvZiBwb3dlcnMgZnJvbSAxIHVwIHRvIHRoZSByZXBlYXQgcG93ZXIuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJjbGVhcl9hbmRfZXF1YXRlIiwibGFiZWwiOiJDbGVhciBkZW5vbWluYXRvcnMgYW5kIGVxdWF0ZSBjb2VmZmljaWVudHMgY29ycmVjdGx5IiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJBZnRlciB3cml0aW5nIHRoZSBjb3JyZWN0IHBhcnRpYWwtZnJhY3Rpb24gZm9ybSwgd2hhdCBpcyB0aGUgbmV4dCBzdGVwIGluIHRoZSBtZXRob2Qgb2YgY2xlYXJpbmcgZnJhY3Rpb25zPyIsIm9wdGlvbnMiOlsiQS4gU3Vic3RpdHV0ZSBjb252ZW5pZW50IHZhbHVlcyBvZiBcXCh4XFwpIGltbWVkaWF0ZWx5IGZvciBldmVyeSBjYXNlIiwiQi4gTXVsdGlwbHkgYm90aCBzaWRlcyBieSB0aGUgZnVsbCBkZW5vbWluYXRvciwgdGhlbiBleHBhbmQgYW5kIGNvbGxlY3QgbGlrZSBwb3dlcnMiLCJDLiBEaWZmZXJlbnRpYXRlIGJvdGggc2lkZXMiLCJELiBFcXVhdGUgY29lZmZpY2llbnRzIGJlZm9yZSByZW1vdmluZyBkZW5vbWluYXRvcnMiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgbWV0aG9kIGlzIG5hbWVkIGZvciBjbGVhcmluZyBmcmFjdGlvbnM6IG11bHRpcGx5IGJ5IHRoZSBmdWxsIGRlbm9taW5hdG9yIGZpcnN0LCB0aGVuIGV4cGFuZCBhbmQgY29tcGFyZSBjb2VmZmljaWVudHMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhhdCByZXNlbWJsZXMgY292ZXItdXAgbG9naWMgYW5kIGRvZXMgbm90IGdlbmVyYWxseSByZXBsYWNlIGNsZWFyaW5nIGZyYWN0aW9ucyBoZXJlLiIsIkMiOiJEaWZmZXJlbnRpYXRpb24gaXMgbm90IHBhcnQgb2YgdGhpcyBtZXRob2QuIiwiRCI6IkNvZWZmaWNpZW50IGNvbXBhcmlzb24gb25seSBtYWtlcyBzZW5zZSBhZnRlciBkZW5vbWluYXRvcnMgYXJlIHJlbW92ZWQgYW5kIHRlcm1zIGFyZSBjb2xsZWN0ZWQuIn0sImhpbnQiOiJUaGluayBvZiB0aGUgbWV0aG9kIG5hbWUgaXRzZWxmLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHN0YXRlbWVudCBpcyBhIHZhbGlkIHJlYXNvbiBmb3IgZXF1YXRpbmcgY29lZmZpY2llbnRzIGluIHRoaXMgbWV0aG9kPyIsIm9wdGlvbnMiOlsiQS4gT25jZSB0aGUgaWRlbnRpdHkgaXMgd3JpdHRlbiB3aXRoIG5vIGRlbm9taW5hdG9ycywgbWF0Y2hpbmcgcG93ZXJzIG9mIFxcKHhcXCkgbXVzdCBoYXZlIGVxdWFsIGNvZWZmaWNpZW50cyBvbiBib3RoIHNpZGVzIiwiQi4gQ29lZmZpY2llbnRzIGNhbiBiZSBlcXVhdGVkIGJlZm9yZSBjbGVhcmluZyBmcmFjdGlvbnMgYmVjYXVzZSBkZW5vbWluYXRvcnMgZG8gbm90IG1hdHRlciIsIkMuIENvZWZmaWNpZW50cyBvbmx5IG5lZWQgdG8gbWF0Y2ggZm9yIHRoZSBoaWdoZXN0IHBvd2VyIG9mIFxcKHhcXCkiLCJELiBFcXVhdGluZyBjb2VmZmljaWVudHMgd29ya3Mgb25seSB3aGVuIGFsbCBjb25zdGFudHMgYXJlIGFscmVhZHkga25vd24iXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJBZnRlciBjbGVhcmluZyBmcmFjdGlvbnMsIHRoZSBlcXVhdGlvbiBiZWNvbWVzIGEgcG9seW5vbWlhbCBpZGVudGl0eSwgc28gY29ycmVzcG9uZGluZyBwb3dlcnMgbXVzdCBtYXRjaC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJEZW5vbWluYXRvcnMgbWF0dGVyOyB5b3UgbXVzdCBmaXJzdCByZXdyaXRlIHRoZSBlcXVhdGlvbiBhcyBhIHBvbHlub21pYWwgaWRlbnRpdHkuIiwiQyI6IkFsbCBjb3JyZXNwb25kaW5nIHBvd2VycyB1c2VkIGluIHRoZSBpZGVudGl0eSBtdXN0IG1hdGNoLCBub3QganVzdCB0aGUgbGVhZGluZyB0ZXJtLiIsIkQiOiJUaGUgcHVycG9zZSBpcyB0byBmaW5kIHRoZSB1bmtub3duIGNvbnN0YW50cy4ifSwiaGludCI6IkNsZWFyIGZyYWN0aW9ucyBmaXJzdDsgdGhlbiBjb21wYXJlIHBvbHlub21pYWwgaWRlbnRpdGllcy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InJlYWRfZmluYWxfcmVzdWx0X2FuZF90cmFwcyIsImxhYmVsIjoiSW50ZXJwcmV0IHRoZSBzb2x2ZWQgY29uc3RhbnRzIGFuZCBhdm9pZCBjb21tb24gdHJhcHMiLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJZiB0aGUgc29sdmVkIGNvbnN0YW50cyBhcmUgXFwoa18xPTEsXFwga18yPS0yLFxcIGtfMz0yLFxcIGtfND0tM1xcKSwgd2hpY2ggZmluYWwgZXhwYW5zaW9uIGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBcXChcXGRmcmFjezF9e3grMX0tXFxkZnJhY3syfXt4KzJ9K1xcZGZyYWN7Mn17eCszfS1cXGRmcmFjezN9eyh4KzMpXjJ9XFwpIiwiQi4gXFwoXFxkZnJhY3sxfXt4KzF9K1xcZGZyYWN7Mn17eCsyfStcXGRmcmFjezJ9e3grM30rXFxkZnJhY3szfXsoeCszKV4yfVxcKSIsIkMuIFxcKFxcZGZyYWN7MX17KHgrMSleMn0tXFxkZnJhY3syfXt4KzJ9K1xcZGZyYWN7Mn17eCszfS1cXGRmcmFjezN9e3grM31cXCkiLCJELiBcXChcXGRmcmFjezF9e3grMX0tXFxkZnJhY3syfXt4KzJ9LVxcZGZyYWN7M317eCszfStcXGRmcmFjezJ9eyh4KzMpXjJ9XFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiRWFjaCBzb2x2ZWQgY29uc3RhbnQgZ29lcyBiYWNrIG9udG8gdGhlIHNhbWUgZGVub21pbmF0b3IgcGllY2UgZnJvbSB0aGUgb3JpZ2luYWwgc2V0dXAsIHByZXNlcnZpbmcgYWxsIHNpZ25zLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6Ikl0IGlnbm9yZXMgdGhlIG5lZ2F0aXZlIHNpZ25zIGZyb20gXFwoa18yPS0yXFwpIGFuZCBcXChrXzQ9LTNcXCkuIiwiQyI6Ikl0IGNoYW5nZXMgZGVub21pbmF0b3IgZm9ybXMgdGhhdCB3ZXJlIG5ldmVyIGluIHRoZSBzZXR1cC4iLCJEIjoiSXQgc3dhcHMgdGhlIGNvZWZmaWNpZW50cyBvZiB0aGUgXFwoMS8oeCszKVxcKSBhbmQgXFwoMS8oeCszKV4yXFwpIHRlcm1zLiJ9LCJoaW50IjoiRG8gbm90IGNoYW5nZSB0aGUgZGVub21pbmF0b3Igc3RydWN0dXJlIGFmdGVyIHNvbHZpbmc7IG9ubHkgZmlsbCBpbiB0aGUgY29uc3RhbnRzLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IlN0YXRlIG9uZSBoaWdoLWZyZXF1ZW5jeSBzZXR1cCB0cmFwIGluIHRoZSBjbGVhcmluZy1mcmFjdGlvbnMgbWV0aG9kIGFuZCBleHBsYWluIGhvdyB0byBhdm9pZCBpdCBpbiBvbmUgb3IgdHdvIHNlbnRlbmNlcy4iLCJpZGVhbF9hbnN3ZXIiOiJBIGNvbW1vbiB0cmFwIGlzIGZvcmdldHRpbmcgb25lIG9mIHRoZSB0ZXJtcyBmcm9tIGEgcmVwZWF0ZWQgZmFjdG9yLCBzdWNoIGFzIHdyaXRpbmcgb25seSBcXChBLyh4KzMpXjJcXCkgaW5zdGVhZCBvZiBib3RoIFxcKEEvKHgrMykrQi8oeCszKV4yXFwpLiBUbyBhdm9pZCBpdCwgbGlzdCBldmVyeSBmYWN0b3IgYW5kLCBmb3IgYSByZXBlYXRlZCBmYWN0b3Igb2YgcG93ZXIgMiwgaW5jbHVkZSBib3RoIHBvd2VyLTEgYW5kIHBvd2VyLTIgZGVub21pbmF0b3IgdGVybXMgYmVmb3JlIGRvaW5nIGFueSBhbGdlYnJhLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3QgbmFtZSBhIHJlYWwgdHJhcCwgcHJlZmVyYWJseSBtaXNzaW5nIGEgcmVwZWF0ZWQtZmFjdG9yIHRlcm0iLCJNdXN0IGV4cGxhaW4gYSBjb25jcmV0ZSBwcmV2ZW50aW9uIHJ1bGUiLCJBbnN3ZXIgc2hvdWxkIGJlIGJyaWVmIGFuZCBleGFtLWZvY3VzZWQiXSwiZXhwbGFuYXRpb24iOiJUaGlzIGNoZWNrcyB3aGV0aGVyIHRoZSBzdHVkZW50IGtub3dzIHRoZSBmYWlsdXJlIHBvaW50IHRoYXQgcnVpbnMgdGhlIHdob2xlIHByb2JsZW0gYmVmb3JlIHRoZSBhbGdlYnJhIGV2ZW4gc3RhcnRzLiIsImhpbnQiOiJUaGluayBhYm91dCB3aGF0IG1pc3Rha2UgbWFrZXMgdGhlIGxhdGVyIHN5c3RlbSB1c2VsZXNzIGV2ZW4gaWYgeW91ciBhbGdlYnJhIGlzIHBlcmZlY3QuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfV19" style="display:none;"></div>%%KC_END%%
