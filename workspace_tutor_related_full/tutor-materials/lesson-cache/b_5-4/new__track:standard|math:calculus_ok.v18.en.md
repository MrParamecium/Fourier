%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6Im1hdHBsb3RsaWIiLCJyYXRpb25hbGUiOiJUaGlzIHNlY3Rpb24gaGFzIG5vIHVzYWJsZSB0ZXh0Ym9vayBmaWd1cmUgY3JvcHMsIGJ1dCBpdCBzdHJvbmdseSBiZW5lZml0cyBmcm9tIGEgY2xlYW4gd29ya2Zsb3cgdmlzdWFsIHNob3dpbmcgd2hpY2ggY29lZmZpY2llbnRzIGNvbWUgZnJvbSBjb3Zlci11cCBmaXJzdCBhbmQgd2hpY2ggYXJlIHNvbHZlZCBhZnRlciBjbGVhcmluZyBmcmFjdGlvbnMuIEEgZ2VuZXJhdGVkIGRpYWdyYW0gd2lsbCBtYWtlIHRoZSBoeWJyaWQgbWV0aG9kIGZlZWwgcHJvY2VkdXJhbCByYXRoZXIgdGhhbiBhbGdlYnJhaWNhbGx5IG1lc3N5LiIsImNyYW0iOiJVc2UgdmlzdWFscyB0byBzaG93IHRoZSBmYXN0ZXN0IGRlY2lzaW9uIGZsb3c6IGVhc3kgY29lZmZpY2llbnRzIGJ5IGNvdmVyLXVwIGZpcnN0LCB0aGVuIHNvbHZlIHRoZSBsZWZ0b3ZlcnMgd2l0aCBvbmUgYWxnZWJyYSBzdGVwLiIsInN0YW5kYXJkIjoiVXNlIHZpc3VhbHMgdG8gY2xhcmlmeSB0aGUgc2VxdWVuY2Ugb2YgdGhlIGh5YnJpZCBtZXRob2QgYW5kIHN1cHBvcnQgdGhlIHJlcHJlc2VudGF0aXZlIEV4YW1wbGUgQi4xMCBzdHJ1Y3R1cmUuIiwidG9wX3Njb3JlIjoiVXNlIHZpc3VhbHMgdG8gZXhwb3NlIHdoeSBkaWZmZXJlbnQgc2hvcnRjdXRzIHdvcmssIHdoaWNoIGNvZWZmaWNpZW50cyBhcmUgYmVzdCB0YXJnZXRlZCBmaXJzdCwgYW5kIGhvdyB0byBzZWxmLWNoZWNrIGVmZmljaWVudGx5LiJ9" style="display:none;"></div>%%KC_END%%
# B.5-4 A Combination of Heaviside and Clearing Fractions

> **Section Objective:** Learn to combine the Heaviside cover-up method with fraction-clearing to solve partial fractions with repeated factors faster and with less algebra.

---

Consider a problem like

$$F(x) = \frac{4x^3+16x^2+23x+13}{(x+1)^3(x+2)}$$

Pure Heaviside cover-up *can* handle this, but repeated roots force you to differentiate repeatedly — which is slow and error-prone under exam conditions.

The smarter strategy: **use cover-up only for the coefficients that fall out immediately**, then clear fractions to handle the rest. You get the same answer in fewer steps.

This hybrid approach matters because it cuts solving time without changing the final partial-fraction form. Whenever you see a repeated factor in the denominator, that is your signal to consider this method.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoZSBmbG93Y2hhcnQgdG8gbWVtb3JpemUgdGhlIGZhc3Rlc3Qgb3JkZXIgb2YgYXR0YWNrLiIsInN0YW5kYXJkIjoiVXNlIHRoZSBmbG93Y2hhcnQgdG8gZXhwbGFpbiB3aHkgdGhlIG1ldGhvZCBtaXhlcyB0d28gdGVjaG5pcXVlcy4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhlIGZsb3djaGFydCB0byBjb21wYXJlIHdoZW4gdG8gc3RvcCBkaWZmZXJlbnRpYXRpbmcgYW5kIHN3aXRjaCBtZXRob2RzLiJ9" style="display:none;"></div>%%KC_END%%
*📊 The hybrid workflow: find easy coefficients by cover-up first, then clear fractions to solve the rest. Repeated roots are the trigger for this approach.*
![Chart](/generated/fig-1777196078506-yt3f65e2.png)

## 1. The Hybrid Method

For Example B.10, write the decomposition form explicitly:

$$F(x) = \frac{a_0}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{k}{x+2}$$

Now identify the **easy** coefficients — the ones cover-up delivers in one step:

- **Find \(k\):** Cover up \((x+2)\) and set \(x = -2\):
$$k = \frac{4(-2)^3 + 16(-2)^2 + 23(-2) + 13}{(-2+1)^3} = \frac{-32+64-46+13}{-1} = \frac{-1}{-1} = 1$$

- **Find \(a_0\):** Cover up \((x+1)^3\) and set \(x = -1\):
$$a_0 = \frac{4(-1)^3 + 16(-1)^2 + 23(-1) + 13}{(-1+2)} = \frac{-4+16-23+13}{1} = 2$$

> **Strategy:** Do not keep differentiating unless you have to. Once \(k\) and \(a_0\) are in hand, stop and switch methods.

### EXAM TIP

A repeated factor like \((x+1)^3\) in the denominator is your signal to use the hybrid method. Grab the easy coefficients first, then finish with algebra.

$$\frac{4x^3+16x^2+23x+13}{(x+1)^3(x+2)}=\frac{2}{(x+1)^3}+\frac{a_1}{(x+1)^2}+\frac{a_2}{x+1}+\frac{1}{x+2}$$
*Cover-up has already delivered \(a_0 = 2\) and \(k = 1\). Only \(a_1\) and \(a_2\) remain unknown — two unknowns, so two equations from clearing fractions will close the problem completely.*

## 2. Finish by Clearing Fractions

Multiply both sides of the decomposition by \((x+1)^3(x+2)\). The result is the polynomial identity:

$$4x^3+16x^2+23x+13 = 2(x+2) + a_1(x+1)(x+2) + a_2(x+1)^2(x+2) + (x+1)^3$$

Now match coefficients. With only \(a_1\) and \(a_2\) unknown, you only need **two equations**. Start with the highest powers because they are cleanest:

- **Coefficient of \(x^3\):** The right side contributes \(a_2 + 1\) at order \(x^3\), so:
$$a_2 + 1 = 4 \implies a_2 = 3$$

- **Coefficient of \(x^2\):** Collecting \(x^2\) terms gives \(a_1 + 4a_2 + 3 = 16\), so:
$$a_1 + 12 + 3 = 16 \implies a_1 = 1$$

The point is **not** to expand everything — it is to solve only what is still unknown. Once \(a_1\) and \(a_2\) are found, check the \(x^1\) and constant terms to confirm consistency.

### COMMON MISTAKE

Do not restart from scratch after cover-up. Substitute the known values of \(a_0\) and \(k\) into the cleared identity before matching — this keeps the algebra minimal.

$$4x^3+16x^2+23x+13=2(x+2)+a_1(x+1)(x+2)+a_2(x+1)^2(x+2)+(x+1)^3$$
*This is the cleared-fractions identity. Every denominator is gone, and the equation holds for all \(x\). Matching the polynomial coefficients on both sides now turns the partial-fraction problem into a small, straightforward algebra system with only \(a_1\) and \(a_2\) as unknowns.*

## 3. Useful Shortcuts and Exam Framing

Once \(a_0 = 2\) and \(k = 1\) are known, there is an even faster route to \(a_2\).

**Large-\(x\) shortcut:** Multiply the full decomposition by \(x\) and let \(x \to \infty\). The terms with \((x+1)^3\), \((x+1)^2\) in the denominator vanish faster, leaving:

$$4 = a_2 + 1 \implies a_2 = 3$$

This works because at large \(x\), only the \(\frac{1}{x+1}\) and \(\frac{1}{x+2}\) terms survive after multiplying by \(x\).

**Convenient substitution:** With \(a_0 = 2\), \(k = 1\), and \(a_2 = 3\) now known, set \(x = 0\) in the cleared identity. The arithmetic is simple and isolates \(a_1\) immediately.

### EXAM TIP

If only one or two coefficients remain after cover-up, always ask: *Is there a single substitution or a large-\(x\) limit that finishes this in one line?* Unnecessary differentiation costs time and introduces errors.

---
**📌 Key Takeaways**
- Use cover-up first to grab the easiest coefficients — typically those at simple non-repeated roots.
- Clear fractions and match coefficients (or use a shortcut substitution) to solve the remaining unknowns.
- Check your answer using unused coefficient equations or a convenient value of \(x\) such as \(x = 0\).

*In the next section we will see what changes when the rational function is improper with numerator and denominator of the same degree.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6Im1ldGhvZF9zZWxlY3Rpb24iLCJsYWJlbCI6IldoZW4gdG8gY29tYmluZSBIZWF2aXNpZGUgd2l0aCBjbGVhcmluZyBmcmFjdGlvbnMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoeSBpcyB0aGUgaHlicmlkIG1ldGhvZCBlc3BlY2lhbGx5IHVzZWZ1bCB3aGVuIGEgZGVub21pbmF0b3IgY29udGFpbnMgYSByZXBlYXRlZCBmYWN0b3Igc3VjaCBhcyBcXCgoeCsxKV4zXFwpPyIsIm9wdGlvbnMiOlsiQS4gQmVjYXVzZSBjb3Zlci11cCBjYW5ub3QgYmUgdXNlZCBhdCBhbGwgZm9yIHJlcGVhdGVkIGZhY3RvcnMiLCJCLiBCZWNhdXNlIHJlcGVhdGVkIGZhY3RvcnMgY2FuIG1ha2UgcHVyZSBIZWF2aXNpZGUgcmVxdWlyZSByZXBlYXRlZCBkaWZmZXJlbnRpYXRpb24iLCJDLiBCZWNhdXNlIGNsZWFyaW5nIGZyYWN0aW9ucyBvbmx5IHdvcmtzIGZvciByZXBlYXRlZCBmYWN0b3JzIiwiRC4gQmVjYXVzZSBjb2VmZmljaWVudCBtYXRjaGluZyBpcyBhbHdheXMgZmFzdGVyIHRoYW4gY292ZXItdXAiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgd2hvbGUgcG9pbnQgb2YgdGhlIGh5YnJpZCBtZXRob2QgaXMgdG8gYXZvaWQgZXhjZXNzaXZlIGRpZmZlcmVudGlhdGlvbiB3aGVuIHJlcGVhdGVkIHJvb3RzIGFyZSBwcmVzZW50LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkNvdmVyLXVwIGNhbiBzdGlsbCBoZWxwIHdpdGggc29tZSBjb2VmZmljaWVudHM7IGl0IGlzIG5vdCBjb21wbGV0ZWx5IGZvcmJpZGRlbi4iLCJDIjoiQ2xlYXJpbmcgZnJhY3Rpb25zIHdvcmtzIG1vcmUgZ2VuZXJhbGx5LCBub3Qgb25seSBmb3IgcmVwZWF0ZWQgZmFjdG9ycy4iLCJEIjoiQ29lZmZpY2llbnQgbWF0Y2hpbmcgaXMgdXNlZnVsIGhlcmUsIGJ1dCBub3QgYWx3YXlzIGZhc3RlciBpbiBldmVyeSBwcm9ibGVtLiJ9LCJoaW50IjoiVGhpbmsgYWJvdXQgd2hhdCBtYWtlcyByZXBlYXRlZCByb290cyBhbm5veWluZyBpbiBwdXJlIEhlYXZpc2lkZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkluIHRoZSBleGFtcGxlIHdpdGggZGVub21pbmF0b3IgXFwoKHgrMSleMyh4KzIpXFwpLCB3aGljaCBjb2VmZmljaWVudHMgYXJlIG1vc3QgbmF0dXJhbCB0byBmaW5kIGZpcnN0IGJ5IGNvdmVyLXVwPyIsIm9wdGlvbnMiOlsiQS4gXFwoYV8xXFwpIGFuZCBcXChhXzJcXCkiLCJCLiBcXChhXzJcXCkgYW5kIFxcKGtcXCkiLCJDLiBcXChrXFwpIGFuZCBcXChhXzBcXCkiLCJELiBcXChhXzBcXCkgYW5kIFxcKGFfMVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlRoZSBzaW1wbGUgc3Vic3RpdHV0aW9ucyBcXCh4ID0gLTJcXCkgYW5kIFxcKHggPSAtMVxcKSBpbW1lZGlhdGVseSBnaXZlIFxcKGtcXCkgYW5kIFxcKGFfMFxcKSBiZWZvcmUgYW55IGV4dHJhIGFsZ2VicmEgaXMgbmVlZGVkLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZXNlIGFyZSB0aGUgY29lZmZpY2llbnRzIHVzdWFsbHkgbGVmdCBmb3IgbGF0ZXIgaW4gdGhpcyBleGFtcGxlLiIsIkIiOiJcXChhXzJcXCkgaXMgbm90IG9idGFpbmVkIGRpcmVjdGx5IGJ5IHRoZSBmaXJzdCBjb3Zlci11cCBzdGVwIGhlcmUuIiwiRCI6IlxcKGFfMVxcKSBpcyBub3Qgb25lIG9mIHRoZSBlYXNpZXN0IGRpcmVjdCBjb3Zlci11cCBjb2VmZmljaWVudHMgaW4gdGhpcyBzZXR1cC4ifSwiaGludCI6IkFzayB3aGljaCB2YWx1ZXMgY29tZSBkaXJlY3RseSBmcm9tIGhpZGluZyBvbmUgZmFjdG9yIGFuZCBwbHVnZ2luZyBpbiBpdHMgcm9vdC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImNsZWFyaW5nX2ZyYWN0aW9uc19leGVjdXRpb24iLCJsYWJlbCI6IkhvdyBjbGVhcmluZyBmcmFjdGlvbnMgZmluaXNoZXMgdGhlIHJlbWFpbmluZyB1bmtub3ducyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQWZ0ZXIgZmluZGluZyBcXChrID0gMVxcKSBhbmQgXFwoYV8wID0gMlxcKSwgd2hhdCBpcyB0aGUgYmVzdCBuZXh0IHN0ZXAgaW4gdGhlIGh5YnJpZCBtZXRob2Q/Iiwib3B0aW9ucyI6WyJBLiBEaWZmZXJlbnRpYXRlIHRocmVlIG1vcmUgdGltZXMiLCJCLiBNdWx0aXBseSB0aHJvdWdoIGJ5IFxcKCh4KzEpXjMoeCsyKVxcKSB0byBjbGVhciBmcmFjdGlvbnMiLCJDLiBTZXQgXFwoeCA9IC0xXFwpIGFnYWluIHRvIGdldCBcXChhXzFcXCkgZGlyZWN0bHkiLCJELiBEaXZpZGUgdGhlIGRlbm9taW5hdG9yIGJ5IHRoZSBudW1lcmF0b3IiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJPbmNlIHRoZSBlYXN5IGNvZWZmaWNpZW50cyBhcmUga25vd24sIGNsZWFyaW5nIGZyYWN0aW9ucyBjb252ZXJ0cyB0aGUgcHJvYmxlbSBpbnRvIGEgcG9seW5vbWlhbCBpZGVudGl0eSBmb3IgdGhlIHJlbWFpbmluZyBjb2VmZmljaWVudHMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhhdCByZXR1cm5zIHRvIHRoZSBzbG93ZXIgYWxsLUhlYXZpc2lkZSBhcHByb2FjaC4iLCJDIjoiU2V0dGluZyBcXCh4ID0gLTFcXCkgYWdhaW4gZG9lcyBub3QgZGlyZWN0bHkgaXNvbGF0ZSBcXChhXzFcXCkgYWZ0ZXIgdGhlIGVhc3kgY292ZXItdXAgc3RlcC4iLCJEIjoiVGhhdCBpcyBub3QgdGhlIG1ldGhvZCB1c2VkIGhlcmUuIn0sImhpbnQiOiJXaGF0IGFsZ2VicmEgc3RlcCByZW1vdmVzIHRoZSBkZW5vbWluYXRvcnMgYWxsIGF0IG9uY2U/IiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQWZ0ZXIgY2xlYXJpbmcgZnJhY3Rpb25zLCB3aHkgaXMgaXQgZWZmaWNpZW50IHRvIGVxdWF0ZSB0aGUgY29lZmZpY2llbnRzIG9mIFxcKHheM1xcKSBhbmQgXFwoeF4yXFwpIGZpcnN0IGluIHRoaXMgZXhhbXBsZT8iLCJvcHRpb25zIjpbIkEuIEJlY2F1c2UgdGhvc2UgdGVybXMgaW52b2x2ZSB0aGUgdHdvIHJlbWFpbmluZyB1bmtub3ducyBhbmQgYXJlIGVub3VnaCB0byBzb2x2ZSBmb3IgdGhlbSIsIkIuIEJlY2F1c2UgbG93ZXItcG93ZXIgdGVybXMgYXJlIGFsd2F5cyB3cm9uZyBpbiBwYXJ0aWFsIGZyYWN0aW9ucyIsIkMuIEJlY2F1c2UgcmVwZWF0ZWQgcm9vdHMgZWxpbWluYXRlIGNvbnN0YW50IHRlcm1zIGF1dG9tYXRpY2FsbHkiLCJELiBCZWNhdXNlIHRoZSBcXCh4XjNcXCkgdGVybSBhbHdheXMgZ2l2ZXMgYWxsIGNvZWZmaWNpZW50cyBhdCBvbmNlIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGhlcmUgYXJlIG9ubHkgdHdvIHVua25vd25zIGxlZnQsIHNvIHR3byB3ZWxsLWNob3NlbiBjb2VmZmljaWVudCBlcXVhdGlvbnMgYXJlIGVub3VnaC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJMb3dlci1wb3dlciB0ZXJtcyBhcmUgbm90IHdyb25nOyB0aGV5IGFyZSB1c2VmdWwgZm9yIGNoZWNraW5nLiIsIkMiOiJSZXBlYXRlZCByb290cyBkbyBub3QgZWxpbWluYXRlIGNvbnN0YW50cyBhdXRvbWF0aWNhbGx5LiIsIkQiOiJPbmUgY29lZmZpY2llbnQgZXF1YXRpb24gYWxvbmUgZG9lcyBub3QgdXN1YWxseSBkZXRlcm1pbmUgZXZlcnl0aGluZy4ifSwiaGludCI6IkNvdW50IHRoZSB1bmtub3ducyBiZWZvcmUgZGVjaWRpbmcgaG93IG1hbnkgZXF1YXRpb25zIHlvdSBuZWVkLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoic2hvcnRjdXRfcmVhc29uaW5nIiwibGFiZWwiOiJTaG9ydGN1dCB1c2luZyBsYXJnZS14IGJlaGF2aW9yIGFuZCBjb252ZW5pZW50IHN1YnN0aXR1dGlvbiIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkluIHRoZSBzaG9ydGN1dCBtZXRob2QsIG11bHRpcGx5aW5nIHRoZSBkZWNvbXBvc2l0aW9uIGJ5IFxcKHhcXCkgYW5kIGxldHRpbmcgXFwoeCBcXHRvIFxcaW5mdHlcXCkgaGVscHMgaXNvbGF0ZSB3aGljaCBjb2VmZmljaWVudCBtb3N0IGRpcmVjdGx5PyIsIm9wdGlvbnMiOlsiQS4gXFwoYV8wXFwpIiwiQi4gXFwoYV8xXFwpIiwiQy4gXFwoYV8yXFwpIiwiRC4gXFwoa1xcKSBhbmQgXFwoYV8xXFwpIHRvZ2V0aGVyIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiQWZ0ZXIgbXVsdGlwbHlpbmcgYnkgXFwoeFxcKSBhbmQgdGFraW5nIHRoZSBsYXJnZS1cXCh4XFwpIGxpbWl0LCB0aGUgZG9taW5hbnQgXFwoXFxmcmFjezF9e3grMX1cXCkgYW5kIFxcKFxcZnJhY3sxfXt4KzJ9XFwpIHRlcm1zIGRldGVybWluZSB0aGUgZXF1YXRpb24gdXNlZCBmb3IgXFwoYV8yXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlxcKGFfMFxcKSBpcyB0aWVkIHRvIHRoZSBoaWdoZXN0IHJlcGVhdGVkLXBvd2VyIGRlbm9taW5hdG9yIHRlcm0sIHdoaWNoIHZhbmlzaGVzIGZhc3Rlci4iLCJCIjoiXFwoYV8xXFwpIGlzIG5vdCB0aGUgbWFpbiBzdXJ2aXZpbmcgY29lZmZpY2llbnQgaW4gdGhhdCBsaW1pdC4iLCJEIjoiVGhlIHNob3J0Y3V0IGdpdmVzIGEgZGlyZWN0IGVxdWF0aW9uIGZvciBcXChhXzJcXCksIG5vdCBhIGpvaW50IHNvbHZlIHdpdGggXFwoYV8xXFwpLiJ9LCJoaW50IjoiQXNrIHdoaWNoIGRlbm9taW5hdG9yIGRlY2F5cyBzbG93ZXN0IGFtb25nIHRoZSByZW1haW5pbmcgdGVybXMuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQSBzdHVkZW50IGhhcyBhbHJlYWR5IGZvdW5kIFxcKGFfMCA9IDJcXCksIFxcKGsgPSAxXFwpLCBhbmQgXFwoYV8yID0gM1xcKS4gV2hhdCBpcyBvbmUgY29udmVuaWVudCBuZXh0IG1vdmUgdG8gZmluZCBcXChhXzFcXCksIGFuZCB3aHkgaXMgaXQgY29udmVuaWVudD8iLCJpZGVhbF9hbnN3ZXIiOiJTdWJzdGl0dXRlIGEgc2ltcGxlIHZhbHVlIHN1Y2ggYXMgXFwoeCA9IDBcXCkgaW50byB0aGUgY2xlYXJlZC1mcmFjdGlvbnMgaWRlbnRpdHkuIEl0IGlzIGNvbnZlbmllbnQgYmVjYXVzZSBhbGwgb3RoZXIgY29lZmZpY2llbnRzIGFyZSBhbHJlYWR5IGtub3duLCBzbyB0aGUgZXF1YXRpb24gcmVkdWNlcyB0byBzaW1wbGUgYXJpdGhtZXRpYyB3aXRoIFxcKGFfMVxcKSBhcyB0aGUgb25seSB1bmtub3duLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3QgbWVudGlvbiBjaG9vc2luZyBhIGNvbnZlbmllbnQgeC12YWx1ZSBzdWNoIGFzIHg9MCIsIk11c3Qgc3RhdGUgdGhhdCB0aGlzIGxlYXZlcyBvbmx5IGExIHVua25vd24iLCJNdXN0IGV4cGxhaW4gdGhhdCB0aGUgYXJpdGhtZXRpYyBiZWNvbWVzIHNpbXBsZSJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQgdW5kZXJzdGFuZHMgc2hvcnRjdXQgc3RyYXRlZ3kgcmF0aGVyIHRoYW4ganVzdCBtZW1vcml6aW5nIHRoZSBmaW5hbCBhbnN3ZXIuIiwiaGludCI6IlRoaW5rOiBhZnRlciBtb3N0IGNvZWZmaWNpZW50cyBhcmUga25vd24sIHdoYXQgZWFzeSBzdWJzdGl0dXRpb24gYXZvaWRzIG1vcmUgZXhwYW5zaW9uPyIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
