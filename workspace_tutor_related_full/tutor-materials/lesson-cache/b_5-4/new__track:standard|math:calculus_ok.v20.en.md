%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImdlbmVyYXRlZF9pbWFnZSIsInJhdGlvbmFsZSI6IlRoaXMgc2VjdGlvbiBpcyBhbGdlYnJhLXByb2NlZHVyZSBmb2N1c2VkIGFuZCB0aGUgcHJvdmlkZWQgdGV4dGJvb2sgcGFnZXMgY29udGFpbiBubyB1c2FibGUgY3JvcHBlZCBmaWd1cmVzLiBBIGdlbmVyYXRlZCBsZWN0dXJlLW5vdGVzIHZpc3VhbCBpcyB0aGUgY2xlYXJlc3Qgd2F5IHRvIHNob3cgdGhlIHdvcmtmbG93OiBlYXN5IGNvZWZmaWNpZW50cyBieSBjb3Zlci11cCBmaXJzdCwgdGhlbiByZW1haW5pbmcgY29lZmZpY2llbnRzIGJ5IGNsZWFyaW5nIGZyYWN0aW9ucyBvciBvbmUgc2hvcnRjdXQgc3RlcC4iLCJjcmFtIjoiVXNlIHZpc3VhbHMgdG8gdHVybiB0aGUgbWV0aG9kIGludG8gYSBmYXN0IGRlY2lzaW9uIHBhdHRlcm46IGVhc3kgcm9vdHMgZmlyc3QsIHRoZW4gcmVkdWNlIHVua25vd25zLCB0aGVuIGZpbmlzaCB3aXRoIHRoZSBzaG9ydGVzdCBhbGdlYnJhLiIsInN0YW5kYXJkIjoiVXNlIHZpc3VhbHMgdG8gc2hvdyB0aGUgc2VxdWVuY2Ugb2Ygc3RlcHMgb24gb25lIHJlcHJlc2VudGF0aXZlIHJlcGVhdGVkLWZhY3RvciBleGFtcGxlIHdpdGhvdXQgb3ZlcmxvYWRpbmcgdGhlIHBhZ2UuIiwidG9wX3Njb3JlIjoiVXNlIHZpc3VhbHMgdG8gZXhwb3NlIHdoZXJlIHN0dWRlbnRzIHdhc3RlIHRpbWU6IG92ZXItZGlmZmVyZW50aWF0aW5nLCBzb2x2aW5nIHVubmVjZXNzYXJ5IGVxdWF0aW9ucywgb3IgZm9yZ2V0dGluZyB0byBjaGVjayByZW1haW5pbmcgY29lZmZpY2llbnRzLiJ9" style="display:none;"></div>%%KC_END%%
# B.5-4 A Combination of Heaviside and Clearing Fractions

> **Section Objective:** Learn a faster hybrid method for partial fractions with repeated factors — use cover-up for the easy coefficients, then clear fractions to finish.

Consider the rational function

$$F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)}$$

Pure Heaviside works here, but finding every repeated-root coefficient by repeated differentiation is slow and error-prone under exam pressure. This section teaches a faster hybrid approach: apply the cover-up rule only where it is quick and clean, then switch to clearing fractions to solve whatever unknowns remain. The final answer is identical — you are just choosing a smarter order of operations. Mastering this hybrid method directly improves your speed on any partial-fraction problem involving repeated factors.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="exam_pattern_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgYXMgYSBxdWljayByZWNvZ25pdGlvbiBtYXA6IGNvdmVyIHVwIGVhc3kgZmFjdG9ycyBmaXJzdCwgdGhlbiBjbGVhciBmcmFjdGlvbnMgZm9yIHRoZSBsZWZ0b3ZlcnMuIiwic3RhbmRhcmQiOiJVc2UgdGhpcyB0byBleHBsYWluIHRoZSBub3JtYWwgb3JkZXIgb2YgYXR0YWNrIG9uIHRoZSByZXByZXNlbnRhdGl2ZSBleGFtcGxlLiIsInRvcF9zY29yZSI6IlVzZSB0aGlzIHRvIHNob3cgd2h5IHRoZSBoeWJyaWQgbWV0aG9kIGF2b2lkcyB1bm5lY2Vzc2FyeSBkaWZmZXJlbnRpYXRpb24gYW5kIGFsZ2VicmEuIn0=" style="display:none;"></div>%%KC_END%%
*🎨 The hybrid method in five steps: get the easy coefficients by cover-up, then clear fractions to solve the rest.*
![Illustration](/generated/gptimage2-1777212299306-2580.png)

## 1. The hybrid idea: do the easy coefficients first

The partial-fraction setup for our example is:

$$F(x) = \frac{a_0}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{k}{x+2}$$

Two of these four coefficients are easy to isolate immediately.

- **Finding \(k\):** Multiply both sides by \((x+2)\) and set \(x = -2\). The result is \(k = 1\).
- **Finding \(a_0\):** Multiply both sides by \((x+1)^3\) and set \(x = -1\). The result is \(a_0 = 2\).

These are the "easy wins" — direct substitutions with no differentiation required. The Heaviside machinery can in principle produce \(a_1\) and \(a_2\) too, but that requires differentiating once and twice respectively, which introduces extra steps and more chances for sign errors.

### EXAM TIP

Once only a couple of coefficients remain unknown, switching to clearing fractions is almost always faster than continuing to differentiate.

$$\frac{4x^3+16x^2+23x+13}{(x+1)^3(x+2)}=\frac{2}{(x+1)^3}+\frac{a_1}{(x+1)^2}+\frac{a_2}{x+1}+\frac{1}{x+2}$$
*After the easy cover-up steps yield \(k = 1\) and \(a_0 = 2\), only \(a_1\) and \(a_2\) remain unknown and must be determined by a different method.*

## 2. Clear fractions and match coefficients

Multiply both sides of the identity by \((x+1)^3(x+2)\). Every denominator cancels and both sides become polynomials:

$$4x^3 + 16x^2 + 23x + 13 = 2(x+2) + a_1(x+1)(x+2) + a_2(x+1)^2(x+2) + (x+1)^3$$

Now expand only as much as needed. Collecting the \(x^3\) terms on the right gives \((1 + a_2)x^3\), so matching with the left side:

$$1 + a_2 = 4 \implies a_2 = 3$$

Collecting the \(x^2\) terms on the right gives \((a_1 + 4a_2 + 3)x^2\), so:

$$a_1 + 4(3) + 3 = 16 \implies a_1 = 1$$

### KEY INSIGHT

You do not need to expand every power. Match the highest powers first — they usually determine the unknowns with the least algebra.

#### Note

The \(x\) and constant terms can be used as a **verification check**: substitute \(a_1 = 1\) and \(a_2 = 3\) back and confirm those coefficients also match. If they do not, an arithmetic error occurred somewhere.

$$4x^3+16x^2+23x+13=2(x+2)+a_1(x+1)(x+2)+a_2(x+1)^2(x+2)+(x+1)^3$$
*Clearing fractions converts the partial-fraction identity into a polynomial identity, and since two polynomials are equal for all \(x\) only when their corresponding coefficients match, this immediately gives a system of equations for the unknown constants \(a_1\) and \(a_2\).*

## 3. A shortcut when only two unknowns remain

Once \(k = 1\) and \(a_0 = 2\) are known, there is an even faster route to \(a_2\). Multiply the entire partial-fraction identity by \(x\) and let \(x \to \infty\).

Why does this work? As \(x \to \infty\), terms like \(\frac{1}{x+1}\) and \(\frac{1}{x+2}\) all behave like \(\frac{1}{x}\), while higher-order terms like \(\frac{1}{(x+1)^2}\) and \(\frac{1}{(x+1)^3}\) vanish faster. After multiplying by \(x\), only the \(\frac{1}{x}\)-type contributions survive in the limit, giving:

$$4 = a_2 + 1 \implies a_2 = 3$$

With \(a_2 = 3\) now known, only \(a_1\) remains. Substitute any convenient value — \(x = 0\) is usually the cleanest choice — into the identity with all other coefficients filled in. This gives \(a_1 = 1\) directly.

### EXAM TIP

Use this shortcut only when the remaining expression is simple enough to read off cleanly. If the algebra looks messy, coefficient matching from Step 2 is the safer and more reliable route.

---
**📌 Key Takeaways**
- Use cover-up (Heaviside) first to get the easy coefficients — simple roots and the highest repeated power.
- Clear fractions and match polynomial coefficients to solve the remaining unknowns efficiently.
- Use the leftover coefficient equations (lower powers) as a verification check on your answers.

*In the next section we will see how partial fractions change when the rational function is improper.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6Im1ldGhvZF9zZWxlY3Rpb24iLCJsYWJlbCI6IldoZW4gdG8gY29tYmluZSBIZWF2aXNpZGUgd2l0aCBjbGVhcmluZyBmcmFjdGlvbnMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoeSBpcyB0aGUgbWl4ZWQgbWV0aG9kIHVzZWZ1bCBmb3IgYSBkZW5vbWluYXRvciBzdWNoIGFzIFxcKCh4ICsgMSleMyh4ICsgMilcXCk/Iiwib3B0aW9ucyI6WyJBLiBJdCBhdm9pZHMgd3JpdGluZyBhbnkgcGFydGlhbC1mcmFjdGlvbiBmb3JtIGF0IGFsbCIsIkIuIEl0IGxldHMgeW91IGdldCB0aGUgZWFzeSBjb2VmZmljaWVudHMgZmlyc3QsIHRoZW4gYXZvaWQgdW5uZWNlc3NhcnkgcmVwZWF0ZWQgZGlmZmVyZW50aWF0aW9uIiwiQy4gSXQgd29ya3Mgb25seSB3aGVuIHRoZSBudW1lcmF0b3IgZGVncmVlIGlzIGxhcmdlciB0aGFuIHRoZSBkZW5vbWluYXRvciBkZWdyZWUiLCJELiBJdCBndWFyYW50ZWVzIHRoYXQgZXZlcnkgY29lZmZpY2llbnQgY2FuIGJlIGZvdW5kIGJ5IG9uZSBkaXJlY3Qgc3Vic3RpdHV0aW9uIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIHdob2xlIHBvaW50IG9mIHRoZSBoeWJyaWQgbWV0aG9kIGlzIGVmZmljaWVuY3k6IHVzZSBIZWF2aXNpZGUgd2hlcmUgaXQgaXMgcXVpY2ssIHRoZW4gc3dpdGNoIHRvIGFsZ2VicmEgZm9yIHRoZSByZW1haW5pbmcgY29uc3RhbnRzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IllvdSBzdGlsbCBtdXN0IHdyaXRlIHRoZSBwYXJ0aWFsLWZyYWN0aW9uIHNldHVwLiIsIkMiOiJUaGF0IHN0YXRlbWVudCBpcyB1bnJlbGF0ZWQ7IHRoaXMgc2VjdGlvbiBpcyBhYm91dCByZXBlYXRlZCBmYWN0b3JzLCBub3QgaW1wcm9wZXIgZGVncmVlIGNvbXBhcmlzb24uIiwiRCI6IlJlcGVhdGVkLWZhY3RvciBjb2VmZmljaWVudHMgYXJlIG5vdCBhbGwgZm91bmQgYnkgb25lIHNpbXBsZSBzdWJzdGl0dXRpb24uIn0sImhpbnQiOiJUaGluayBhYm91dCB3aGF0IHBhcnQgb2YgcHVyZSBIZWF2aXNpZGUgYmVjb21lcyBzbG93IGZvciByZXBlYXRlZCByb290cy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkluIHRoZSB0ZXh0Ym9vayBleGFtcGxlLCBhZnRlciB0aGUgZWFzeSBIZWF2aXNpZGUgc3RlcHMgYXJlIGRvbmUsIHdoaWNoIGNvZWZmaWNpZW50cyBhcmUgc3RpbGwgdW5rbm93bj8iLCJvcHRpb25zIjpbIkEuIE9ubHkgXFwoa1xcKSIsIkIuIE9ubHkgXFwoYV8wXFwpIiwiQy4gXFwoYV8xXFwpIGFuZCBcXChhXzJcXCkiLCJELiBcXChhXzBcXCksIFxcKGFfMVxcKSwgXFwoYV8yXFwpLCBhbmQgXFwoa1xcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlRoZSBleGFtcGxlIGZpbmRzIFxcKGsgPSAxXFwpIGFuZCBcXChhXzAgPSAyXFwpIGZpcnN0LCBsZWF2aW5nIG9ubHkgXFwoYV8xXFwpIGFuZCBcXChhXzJcXCkgdG8gZGV0ZXJtaW5lLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlxcKGtcXCkgaXMgb25lIG9mIHRoZSBlYXN5IGNvZWZmaWNpZW50cyBhbmQgaXMgYWxyZWFkeSBrbm93bi4iLCJCIjoiXFwoYV8wXFwpIGlzIGFsc28gYWxyZWFkeSBrbm93biBmcm9tIHRoZSBlYXN5IHJlcGVhdGVkLXJvb3Qgc3RlcC4iLCJEIjoiVGhlIHBvaW50IG9mIHRoZSBoeWJyaWQgbWV0aG9kIGlzIHRoYXQgbm90IGFsbCBjb2VmZmljaWVudHMgcmVtYWluIHVua25vd24uIn0sImhpbnQiOiJUcmFjayB3aGljaCBjb25zdGFudHMgd2VyZSBhbHJlYWR5IG9idGFpbmVkIGJlZm9yZSBjbGVhcmluZyBmcmFjdGlvbnMuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJjbGVhcmluZ19mcmFjdGlvbnNfaWRlbnRpdHkiLCJsYWJlbCI6IlVzaW5nIGNsZWFyaW5nIGZyYWN0aW9ucyBhbmQgY29lZmZpY2llbnQgbWF0Y2hpbmciLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkFmdGVyIG11bHRpcGx5aW5nIGJvdGggc2lkZXMgYnkgXFwoKHggKyAxKV4zKHggKyAyKVxcKSwgd2hhdCBpcyB0aGUgbWFpbiByZWFzb24gY29lZmZpY2llbnQgbWF0Y2hpbmcgYmVjb21lcyBwb3NzaWJsZT8iLCJvcHRpb25zIjpbIkEuIFRoZSBlcXVhdGlvbiBiZWNvbWVzIGEgdHJpZ29ub21ldHJpYyBpZGVudGl0eSIsIkIuIFRoZSBlcXVhdGlvbiBiZWNvbWVzIGEgcG9seW5vbWlhbCBpZGVudGl0eSIsIkMuIFRoZSByZXBlYXRlZCByb290IGRpc2FwcGVhcnMgZnJvbSB0aGUgcHJvYmxlbSBjb21wbGV0ZWx5IiwiRC4gVGhlIG51bWVyYXRvciBmYWN0b3JzIGF1dG9tYXRpY2FsbHkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJPbmNlIGRlbm9taW5hdG9ycyBhcmUgY2xlYXJlZCwgYm90aCBzaWRlcyBhcmUgcG9seW5vbWlhbHMgaW4gXFwoeFxcKSwgc28gZXF1YWwgcG9seW5vbWlhbHMgbXVzdCBoYXZlIGVxdWFsIGNvZWZmaWNpZW50cy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJObyB0cmlnb25vbWV0cmljIGV4cHJlc3Npb25zIGFwcGVhciBoZXJlLiIsIkMiOiJUaGUgcmVwZWF0ZWQgcm9vdCBzdGlsbCBhZmZlY3RzIHRoZSBhbGdlYnJhaWMgc3RydWN0dXJlIG9mIHRoZSB0ZXJtcy4iLCJEIjoiRmFjdG9yaW5nIHRoZSBudW1lcmF0b3IgaXMgbm90IHRoZSBrZXkgc3RlcCBoZXJlLiJ9LCJoaW50IjoiQXNrIHdoYXQga2luZCBvZiBleHByZXNzaW9uIHJlbWFpbnMgYWZ0ZXIgYWxsIGRlbm9taW5hdG9ycyBhcmUgcmVtb3ZlZC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3AyX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGcm9tIHRoZSBjbGVhcmVkIGVxdWF0aW9uLCBzdXBwb3NlIHlvdSBhbHJlYWR5IGtub3cgdGhhdCB0aGUgXFwoeF4zXFwpIGFuZCBcXCh4XjJcXCkgY29lZmZpY2llbnQgZXF1YXRpb25zIGFyZSBcXCgxICsgYV8yID0gNFxcKSBhbmQgXFwoYV8xICsgNGFfMiArIDMgPSAxNlxcKS4gV2hhdCBhcmUgXFwoYV8xXFwpIGFuZCBcXChhXzJcXCk/Iiwib3B0aW9ucyI6WyJBLiBcXChhXzEgPSAzLFxcIGFfMiA9IDFcXCkiLCJCLiBcXChhXzEgPSAxLFxcIGFfMiA9IDNcXCkiLCJDLiBcXChhXzEgPSAyLFxcIGFfMiA9IDJcXCkiLCJELiBcXChhXzEgPSA0LFxcIGFfMiA9IDBcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJGcm9tIFxcKDEgKyBhXzIgPSA0XFwpLCB3ZSBnZXQgXFwoYV8yID0gM1xcKS4gU3Vic3RpdHV0aW5nIGludG8gXFwoYV8xICsgNGFfMiArIDMgPSAxNlxcKSBnaXZlcyBcXChhXzEgKyAxMiArIDMgPSAxNlxcKSwgc28gXFwoYV8xID0gMVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIHJldmVyc2VzIHRoZSB2YWx1ZXMgYW5kIGRvZXMgbm90IHNhdGlzZnkgYm90aCBlcXVhdGlvbnMuIiwiQyI6IlRoZXNlIHZhbHVlcyBmYWlsIHRoZSBmaXJzdCBlcXVhdGlvbiBpbW1lZGlhdGVseS4iLCJEIjoiVGhlc2UgdmFsdWVzIGFsc28gZmFpbCB0aGUgZmlyc3QgZXF1YXRpb24uIn0sImhpbnQiOiJTb2x2ZSBmb3IgXFwoYV8yXFwpIGZpcnN0IGZyb20gdGhlIHNpbXBsZXIgZXF1YXRpb24uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJzaG9ydGN1dF93aXRoX2luZmluaXR5X2FuZF9zdWJzdGl0dXRpb24iLCJsYWJlbCI6IlNob3J0Y3V0IGZpbmlzaGluZyBzdGVwcyIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkluIHRoZSBzaG9ydGN1dCB2ZXJzaW9uLCBhZnRlciBcXChrXFwpIGFuZCBcXChhXzBcXCkgYXJlIGtub3duLCB3aHkgZG9lcyBtdWx0aXBseWluZyBieSBcXCh4XFwpIGFuZCBsZXR0aW5nIFxcKHggXFx0byBcXGluZnR5XFwpIGhlbHA/Iiwib3B0aW9ucyI6WyJBLiBJdCBtYWtlcyBldmVyeSB0ZXJtIGJsb3cgdXAsIHNvIHRoZSBsYXJnZXN0IG9uZSBpcyBlYXNpZXN0IHRvIHNwb3QiLCJCLiBJdCBjYW5jZWxzIHRoZSBudW1lcmF0b3IgY29tcGxldGVseSIsIkMuIEl0IHJlbW92ZXMgbG93ZXItb3JkZXIgZnJhY3Rpb24gY29udHJpYnV0aW9ucyBhbmQgaXNvbGF0ZXMgdGhlIGxlYWRpbmcgcmVtYWluaW5nIGNvbnN0YW50IHJlbGF0aW9uc2hpcCIsIkQuIEl0IGFsd2F5cyBnaXZlcyBcXChhXzFcXCkgZGlyZWN0bHkiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJUaGlzIGxpbWl0IHN1cHByZXNzZXMgdGVybXMgdGhhdCBkZWNheSBmYXN0ZXIgdGhhbiBcXCgxL3hcXCksIGxlYXZpbmcgYSBzaW1wbGUgcmVsYXRpb24gaW52b2x2aW5nIG9ubHkgdGhlIHJlbWFpbmluZyBsZWFkaW5nIFxcKDEveFxcKS10eXBlIGNvbnRyaWJ1dGlvbnMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlIHVzZWZ1bCBwb2ludCBpcyBub3QgYmxvdy11cCBidXQgdGhlIHN1cnZpdmFsIG9mIG9ubHkgY2VydGFpbiBsZWFkaW5nIHRlcm1zLiIsIkIiOiJUaGUgbnVtZXJhdG9yIGlzIG5vdCBjYW5jZWxsZWQgYXdheS4iLCJEIjoiSW4gdGhpcyBleGFtcGxlIGl0IGdpdmVzIFxcKGFfMlxcKSBmaXJzdCwgbm90IFxcKGFfMVxcKS4ifSwiaGludCI6IlRoaW5rIGFib3V0IHdoaWNoIHRlcm1zIGJlaGF2ZSBsaWtlIFxcKDEveFxcKSBhZnRlciB0aGUgbXVsdGlwbGljYXRpb24uIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImdlbmVyYXRlZF9pbWFnZSIsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkFmdGVyIHRoZSBzaG9ydGN1dCBnaXZlcyBcXChhXzIgPSAzXFwpIGFuZCB0aGUga25vd24gdmFsdWVzIGFyZSBcXChhXzAgPSAyXFwpIGFuZCBcXChrID0gMVxcKSwgZXhwbGFpbiBhIGZhc3Qgd2F5IHRvIGZpbmQgXFwoYV8xXFwpLiIsImlkZWFsX2Fuc3dlciI6IlN1YnN0aXR1dGUgYW55IGNvbnZlbmllbnQgdmFsdWUgb2YgXFwoeFxcKSBpbnRvIHRoZSBwYXJ0aWFsLWZyYWN0aW9uIGlkZW50aXR5LCBzdWNoIGFzIFxcKHggPSAwXFwpLiBXaXRoIGFsbCBvdGhlciBjb2VmZmljaWVudHMga25vd24sIHRoYXQgc2luZ2xlIHN1YnN0aXR1dGlvbiBnaXZlcyBcXChhXzFcXCkgZGlyZWN0bHk7IGluIHRoaXMgZXhhbXBsZSBpdCBnaXZlcyBcXChhXzEgPSAxXFwpLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3Qgc2F5IHRvIHN1YnN0aXR1dGUgYSBjb252ZW5pZW50IFxcKHhcXCktdmFsdWUgYWZ0ZXIgdGhlIG90aGVyIGNvZWZmaWNpZW50cyBhcmUga25vd24iLCJNdXN0IG1lbnRpb24gdGhhdCBcXCh4ID0gMFxcKSBpcyBhIGNvbnZlbmllbnQgY2hvaWNlIGluIHRoaXMgZXhhbXBsZSIsIk11c3Qgc3RhdGUgdGhhdCB0aGlzIGRldGVybWluZXMgXFwoYV8xXFwpIGRpcmVjdGx5LCBnaXZpbmcgXFwoYV8xID0gMVxcKSJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQgdW5kZXJzdGFuZHMgdGhlIGZpbmlzaGluZyBsb2dpYyBvZiB0aGUgc2hvcnRjdXQgbWV0aG9kIGluc3RlYWQgb2YgbWVtb3JpemluZyBvbmx5IHRoZSBmaW5hbCBudW1iZXJzLiIsImhpbnQiOiJPbmNlIG9ubHkgb25lIGNvZWZmaWNpZW50IGlzIHVua25vd24sIG9uZSB3ZWxsLWNob3NlbiBzdWJzdGl0dXRpb24gaXMgZW5vdWdoLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
