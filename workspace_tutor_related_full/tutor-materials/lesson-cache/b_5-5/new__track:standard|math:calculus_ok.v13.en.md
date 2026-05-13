%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJUaGUgdGV4dGJvb2sgYWxyZWFkeSBjb250YWlucyB0aGUgZXhhY3Qgd29ya2VkIGV4YW1wbGUgYW5kIGZvcm11bGEgcGF0dGVybiBmb3IgdGhpcyBzZWN0aW9uLCBzbyBhIGJvb2stYmFzZWQgYW5jaG9yIGtlZXBzIHRoZSBsZXNzb24gZmFpdGhmdWwgdG8gdGhlIHNvdXJjZS4gQSBzaW1wbGUgbWF0cGxvdGxpYiBjb21wYXJpc29uIHZpc3VhbCBhZGRzIHNwZWVkIGFuZCBwYXR0ZXJuIHJlY29nbml0aW9uIGJ5IHNob3dpbmcgdGhhdCB0aGUgbT1uIGNhc2UgaXMganVzdCB0aGUgcHJvcGVyLWNhc2UgdGVtcGxhdGUgcGx1cyBvbmUgZXh0cmEgY29uc3RhbnQgdGVybS4iLCJjcmFtIjoiVXNlIHRoZSB2aXN1YWwgdG8gbWVtb3JpemUgdGhlIGV4YW0gcGF0dGVybjogc2FtZSBkZWdyZWUgbWVhbnMgcGVlbCBvZmYgYSBjb25zdGFudCBmaXJzdCwgdGhlbiBzb2x2ZSB0aGUgcmVzdCBsaWtlIGEgcHJvcGVyIGZyYWN0aW9uLiIsInN0YW5kYXJkIjoiVXNlIHRoZSBib29rIGV4YW1wbGUgZm9yIGF1dGhlbnRpY2l0eSBhbmQgdGhlIGdlbmVyYXRlZCBjb21wYXJpc29uIHRvIG1ha2UgdGhlIHN0cnVjdHVyZSBlYXN5IHRvIHNlZSBiZWZvcmUgc29sdmluZyBvbmUgcmVwcmVzZW50YXRpdmUgZXhhbXBsZS4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhlIHZpc3VhbCBjb21wYXJpc29uIHRvIGRpc3Rpbmd1aXNoIG08biwgbT1uLCBhbmQgdGhlIHJvbGUgb2YgdGhlIGV4dHJhIGNvbnN0YW50IHNvIHN0dWRlbnRzIGRvIG5vdCBvdmVyZ2VuZXJhbGl6ZSB0aGUgc2hvcnRjdXQuIn0=" style="display:none;"></div>%%KC_END%%
# B.5-5 Improper Rational Functions — The Special Case m = n

> **Objective:** Learn to handle the mildest form of improper rational functions, where numerator and denominator share the same degree, and expand them into a constant plus ordinary partial fractions.

---

Consider \(F(x) = \dfrac{3x^2 + 9x - 20}{x^2 + x - 6}\). At first glance it looks like a standard partial-fraction problem — but notice that the numerator and denominator are both degree 2. That makes this fraction **improper**, which means the usual setup is incomplete.

The good news: this is the mildest possible improper case. When \(m = n\), the fix is simple — write the expansion as **one extra constant** plus the usual partial-fraction terms. The coefficient-finding step you already know is completely unchanged.

On this page you will learn to spot the \(m = n\) pattern instantly, write the correct setup, and avoid the most common exam mistake: forgetting the constant term.

*(Figure unavailable: no extracted figure found in new-book-figures for page-034 (When the numerator and denominator share the same degree, the partial-fraction expansion takes the proper-case form plus one extra constant term equal to the leading coefficient of the numerator.))*

> ⚠️ Chart render error: Traceback (most recent call last):
  File "/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/script-1777181954966-iy70.py", line 1, in <module>
    import matplotlib
ModuleNotFoundError: No module named 'matplotlib'


$$F(x)=\frac{b_nx^n+b_{n-1}x^{n-1}+\cdots+b_1x+b_0}{x^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0}=b_n+\frac{k_1}{x-\lambda_1}+\frac{k_2}{x-\lambda_2}+\cdots+\frac{k_n}{x-\lambda_n}$$
*When the numerator and denominator have the same degree \(n\), the leading coefficient \(b_n\) of the numerator separates out as a standalone constant, and the remaining fraction — now genuinely proper — is expanded into the usual simple partial-fraction terms.*

## 1. How to Solve the m = n Case

Follow these four steps every time:

1. **Check degrees.** Confirm that the numerator and denominator have the same degree. If they do, you are in the \(m = n\) case.
2. **Factor the denominator.** Write the denominator as a product of linear factors, e.g. \((x-2)(x+3)\).
3. **Write the expansion template.** Place the leading coefficient of the numerator as a constant, then add the usual fractional terms: \(F(x) = b_n + \dfrac{k_1}{x-\lambda_1} + \dfrac{k_2}{x-\lambda_2} + \cdots\)
4. **Find each coefficient exactly as before.** Use the cover-up rule for each simple linear factor.

---

### WORKED EXAMPLE

Given:
$$F(x) = \frac{3x^2 + 9x - 20}{(x-2)(x+3)}$$

**Step 1 — Check degrees.** Numerator: degree 2. Denominator: degree 2. Equal, so \(m = n\). ✓

**Step 2 — Identify \(b_n\).** The denominator \((x-2)(x+3) = x^2 + x - 6\) is monic (leading coefficient 1). The numerator's leading coefficient is 3. Therefore \(b_n = 3\).

**Step 3 — Write the template.**
$$F(x) = 3 + \frac{k_1}{x-2} + \frac{k_2}{x+3}$$

**Step 4 — Find \(k_1\) and \(k_2\) by cover-up.**

For \(k_1\): multiply both sides by \((x-2)\) and set \(x = 2\):
$$k_1 = \left.\frac{3x^2+9x-20}{x+3}\right|_{x=2} = \frac{12+18-20}{5} = \frac{10}{5} = 2$$

For \(k_2\): multiply both sides by \((x+3)\) and set \(x = -3\):
$$k_2 = \left.\frac{3x^2+9x-20}{x-2}\right|_{x=-3} = \frac{27-27-20}{-5} = \frac{-20}{-5} = 4$$

**Final answer:**
$$F(x) = 3 + \frac{2}{x-2} + \frac{4}{x+3}$$

### EXAM TIP

> The most common mistake on this type of problem is writing \(F(x) = \dfrac{k_1}{x-2} + \dfrac{k_2}{x+3}\) and stopping — completely omitting the constant 3. Always check the degrees first, before writing any setup.

$$k_r=\left.(x-\lambda_r)F(x)\right|_{x=\lambda_r}$$
*This is the same cover-up coefficient formula used in the ordinary proper-fraction case for simple linear factors — the \(m = n\) situation introduces no change to this step whatsoever.*

---
**📌 Key Takeaways**
- Equal degrees (\(m = n\)) means the expansion gains one extra constant \(b_n\) before the fractional terms.
- The cover-up coefficient rule for simple linear factors is completely unchanged in the \(m = n\) case.
- The most common exam mistake is omitting the constant term and writing only fractional terms.

*In the next section we will see how partial fractions are modified for inverse z-transform work.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlY29nbml6ZV9tX2VxdWFsc19uX3BhdHRlcm4iLCJsYWJlbCI6IlJlY29nbml6ZSB0aGUgc3BlY2lhbCBtID0gbiBpbXByb3BlciBwYXR0ZXJuIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBwYXJ0aWFsLWZyYWN0aW9uIHNldHVwIGlzIGNvcnJlY3QgZm9yIFxcKEYoeCkgPSBcXGRmcmFjezN4XjIgKyA5eCAtIDIwfXsoeC0yKSh4KzMpfVxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKEYoeCkgPSAzICsgXFxkZnJhY3syfXt4LTJ9ICsgXFxkZnJhY3s0fXt4KzN9XFwpIiwiQi4gXFwoRih4KSA9IFxcZGZyYWN7a18xfXt4LTJ9ICsgXFxkZnJhY3trXzJ9e3grM31cXCkiLCJDLiBcXChGKHgpID0gMyArIFxcZGZyYWN7a18xfXt4LTJ9ICsgXFxkZnJhY3trXzJ9e3grM31cXCkiLCJELiBcXChGKHgpID0gXFxkZnJhY3trXzF9eyh4LTIpXjJ9ICsgXFxkZnJhY3trXzJ9e3grM31cXCkiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJCZWNhdXNlIHRoZSBudW1lcmF0b3IgYW5kIGRlbm9taW5hdG9yIGhhdmUgdGhlIHNhbWUgZGVncmVlLCB0aGUgY29ycmVjdCBzZXR1cCBpcyBvbmUgY29uc3RhbnQgdGVybSBwbHVzIHRoZSB1c3VhbCBzaW1wbGUgZnJhY3Rpb25zLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgaXMgdGhlIGZpbmFsIHNvbHZlZCBhbnN3ZXIsIG5vdCB0aGUgc2V0dXAgc3RhZ2UuIiwiQiI6IlRoaXMgZm9yZ2V0cyB0aGUgZXh0cmEgY29uc3RhbnQgdGVybSByZXF1aXJlZCB3aGVuIFxcKG0gPSBuXFwpLiIsIkQiOiJUaGVyZSBpcyBubyByZXBlYXRlZCBmYWN0b3IgXFwoKHgtMileMlxcKSBpbiB0aGUgZGVub21pbmF0b3IuIn0sImhpbnQiOiJGaXJzdCBhc2sgd2hldGhlciB0aGUgdG9wIGFuZCBib3R0b20gaGF2ZSB0aGUgc2FtZSBkZWdyZWUuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJZiB0aGUgbnVtZXJhdG9yIGFuZCBkZW5vbWluYXRvciBvZiBcXChGKHgpXFwpIGhhdmUgdGhlIHNhbWUgZGVncmVlIGFuZCB0aGUgZGVub21pbmF0b3IgaXMgbW9uaWMsIHdoYXQgbmV3IGZlYXR1cmUgYXBwZWFycyBpbiB0aGUgZXhwYW5zaW9uIGNvbXBhcmVkIHdpdGggdGhlIHByb3BlciBjYXNlPyIsIm9wdGlvbnMiOlsiQS4gQW4gZXh0cmEgY29uc3RhbnQgZXF1YWwgdG8gdGhlIG51bWVyYXRvcidzIGxlYWRpbmcgY29lZmZpY2llbnQiLCJCLiBBbiBleHRyYSBmYWN0b3Igb2YgXFwoeFxcKSBpbiBldmVyeSBudW1lcmF0b3IiLCJDLiBFdmVyeSBkZW5vbWluYXRvciBiZWNvbWVzIHNxdWFyZWQiLCJELiBUaGUgY292ZXItdXAgbWV0aG9kIG5vIGxvbmdlciB3b3JrcyJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IkZvciB0aGUgc3BlY2lhbCBjYXNlIFxcKG0gPSBuXFwpLCB0aGUgZXhwYW5zaW9uIGlzIHRoZSBwcm9wZXItY2FzZSBmb3JtIHBsdXMgb25lIGV4dHJhIGNvbnN0YW50IHRlcm0gXFwoYl9uXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoYXQgYmVsb25ncyB0byBtb2RpZmllZCBwYXJ0aWFsIGZyYWN0aW9ucywgbm90IHRoaXMgc2VjdGlvbi4iLCJDIjoiUmVwZWF0ZWQgZmFjdG9ycyBhcmUgYSBzZXBhcmF0ZSBpc3N1ZSBhbmQgYXJlIG5vdCBjYXVzZWQgYnkgXFwobSA9IG5cXCkuIiwiRCI6IkZvciBzaW1wbGUgbGluZWFyIGZhY3RvcnMsIHRoZSBzYW1lIGNvZWZmaWNpZW50IHJ1bGUgc3RpbGwgYXBwbGllcy4ifSwiaGludCI6IkNvbXBhcmUgdGhlIHByb3Blci1jYXNlIHRlbXBsYXRlIHdpdGggdGhlIFxcKG0gPSBuXFwpIHRlbXBsYXRlIGluIHRoZSBjb21wYXJpc29uIGRpYWdyYW0uIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImNvbXBhcmlzb24gZGlhZ3JhbSBvZiBwcm9wZXIgY2FzZSB2cyBtPW4gY2FzZSIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiY29lZmZpY2llbnRfcnVsZV91bmNoYW5nZWQiLCJsYWJlbCI6IlVzZSB0aGUgc2FtZSBjb2VmZmljaWVudCBmb3JtdWxhIGZvciBzaW1wbGUgbGluZWFyIGZhY3RvcnMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciBcXChGKHgpID0gMyArIFxcZGZyYWN7a18xfXt4LTJ9ICsgXFxkZnJhY3trXzJ9e3grM31cXCksIHdoaWNoIGV4cHJlc3Npb24gY29ycmVjdGx5IGZpbmRzIFxcKGtfMVxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKGtfMSA9IEYoMilcXCkiLCJCLiBcXChrXzEgPSBcXGxlZnQuKHgtMilGKHgpXFxyaWdodHxfe3g9Mn1cXCkiLCJDLiBcXChrXzEgPSBcXGxlZnQuKHgrMylGKHgpXFxyaWdodHxfe3g9Mn1cXCkiLCJELiBcXChrXzEgPSBcXGxlZnQuXFxkZnJhY3t4LTJ9e3grM31cXHJpZ2h0fF97eD0yfVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRvIGlzb2xhdGUgdGhlIGNvZWZmaWNpZW50IG9mIFxcKFxcZGZyYWN7MX17eC0yfVxcKSwgbXVsdGlwbHkgYnkgXFwoKHgtMilcXCkgYW5kIHRoZW4gc3Vic3RpdHV0ZSBcXCh4ID0gMlxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJEaXJlY3Qgc3Vic3RpdHV0aW9uIGludG8gXFwoRih4KVxcKSBpcyBub3QgdGhlIGNvZWZmaWNpZW50IHJ1bGUuIiwiQyI6IlRoYXQgZmFjdG9yIGNvcnJlc3BvbmRzIHRvIFxcKGtfMlxcKSwgbm90IFxcKGtfMVxcKS4iLCJEIjoiVGhpcyBpZ25vcmVzIHRoZSBhY3R1YWwgZnVuY3Rpb24gXFwoRih4KVxcKS4ifSwiaGludCI6IktpbGwgdGhlIGRlbm9taW5hdG9yIGF0dGFjaGVkIHRvIHRoZSBjb2VmZmljaWVudCB5b3Ugd2FudC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciBcXChGKHgpID0gXFxkZnJhY3szeF4yICsgOXggLSAyMH17KHgtMikoeCszKX1cXCksIHdoYXQgaXMgXFwoa18yXFwpIGluIHRoZSBzZXR1cCBcXChGKHgpID0gMyArIFxcZGZyYWN7a18xfXt4LTJ9ICsgXFxkZnJhY3trXzJ9e3grM31cXCk/Iiwib3B0aW9ucyI6WyJBLiBcXCgyXFwpIiwiQi4gXFwoLTJcXCkiLCJDLiBcXCg0XFwpIiwiRC4gXFwoLTRcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJcXChrXzIgPSBcXGxlZnQuKHgrMylGKHgpXFxyaWdodHxfe3g9LTN9ID0gXFxkZnJhY3szKDkpICsgOSgtMykgLSAyMH17LTMtMn0gPSBcXGRmcmFjezI3IC0gMjcgLSAyMH17LTV9ID0gXFxkZnJhY3stMjB9ey01fSA9IDRcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiXFwoMlxcKSBpcyB0aGUgdmFsdWUgb2YgXFwoa18xXFwpLCBub3QgXFwoa18yXFwpLiIsIkIiOiJUaGlzIGlzIGEgc2lnbiBlcnJvciBmcm9tIG1pc2hhbmRsaW5nIHRoZSBkZW5vbWluYXRvci4iLCJEIjoiVGhlIG51bWVyYXRvciBhbmQgZGVub21pbmF0b3IgYXJlIGJvdGggbmVnYXRpdmUsIHNvIHRoZSByZXN1bHQgaXMgcG9zaXRpdmUuIn0sImhpbnQiOiJTdWJzdGl0dXRlIFxcKHggPSAtM1xcKSBvbmx5IGFmdGVyIG11bHRpcGx5aW5nIGJ5IFxcKCh4KzMpXFwpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6ImZpbmFsX2Fuc3dlcl9hbmRfZXhhbV90cmFwIiwibGFiZWwiOiJXcml0ZSB0aGUgZnVsbCBmaW5hbCBleHBhbnNpb24gYW5kIGF2b2lkIHRoZSBjb21tb24gdHJhcCIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBpcyB0aGUgY29ycmVjdCBmaW5hbCBleHBhbnNpb24gb2YgXFwoXFxkZnJhY3szeF4yICsgOXggLSAyMH17KHgtMikoeCszKX1cXCk/Iiwib3B0aW9ucyI6WyJBLiBcXChcXGRmcmFjezJ9e3gtMn0gKyBcXGRmcmFjezR9e3grM31cXCkiLCJCLiBcXCgzICsgXFxkZnJhY3syfXt4LTJ9ICsgXFxkZnJhY3s0fXt4KzN9XFwpIiwiQy4gXFwoMyArIFxcZGZyYWN7Mn17eCszfSArIFxcZGZyYWN7NH17eC0yfVxcKSIsIkQuIFxcKDMgLSBcXGRmcmFjezJ9e3gtMn0gKyBcXGRmcmFjezR9e3grM31cXCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgZXhwYW5zaW9uIG11c3QgaW5jbHVkZSB0aGUgY29uc3RhbnQgXFwoM1xcKSwgYW5kIHRoZSBjb2VmZmljaWVudHMgYXR0YWNoIHRvIHRoZSBjb3JyZWN0IGxpbmVhciBmYWN0b3JzOiBcXCgyXFwpIHdpdGggXFwoKHgtMilcXCkgYW5kIFxcKDRcXCkgd2l0aCBcXCgoeCszKVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIGlzIHRoZSBjb21tb24gdHJhcDogZm9yZ2V0dGluZyB0aGUgY29uc3RhbnQgdGVybSBlbnRpcmVseS4iLCJDIjoiVGhlIGNvZWZmaWNpZW50cyBhcmUgYXR0YWNoZWQgdG8gdGhlIHdyb25nIGRlbm9taW5hdG9ycy4iLCJEIjoiVGhlIHNpZ24gb2YgdGhlIFxcKFxcZGZyYWN7Mn17eC0yfVxcKSB0ZXJtIGlzIGluY29ycmVjdC4ifSwiaGludCI6IkNoZWNrIGJvdGggdGhlIGNvbnN0YW50IHRlcm0gYW5kIHdoaWNoIGNvZWZmaWNpZW50IGJlbG9uZ3MgdG8gd2hpY2ggZmFjdG9yLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkEgc3R1ZGVudCB3cml0ZXMgb25seSBcXChGKHgpID0gXFxkZnJhY3trXzF9e3gtMn0gKyBcXGRmcmFje2tfMn17eCszfVxcKSBmb3IgdGhpcyBwcm9ibGVtLiBXaGF0IHNpbmdsZSBmZWF0dXJlIG9mIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiBkaWQgdGhleSBpZ25vcmUsIGFuZCBob3cgc2hvdWxkIHRoZSBzZXR1cCBiZSBjb3JyZWN0ZWQ/IiwiaWRlYWxfYW5zd2VyIjoiVGhleSBpZ25vcmVkIHRoYXQgdGhlIG51bWVyYXRvciBhbmQgZGVub21pbmF0b3IgaGF2ZSB0aGUgc2FtZSBkZWdyZWUsIHNvIHRoaXMgaXMgdGhlIHNwZWNpYWwgaW1wcm9wZXIgY2FzZSBcXChtID0gblxcKS4gVGhlIHNldHVwIG11c3QgaW5jbHVkZSBhbiBleHRyYSBjb25zdGFudDogXFwoRih4KSA9IDMgKyBcXGRmcmFje2tfMX17eC0yfSArIFxcZGZyYWN7a18yfXt4KzN9XFwpLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3QgbWVudGlvbiBlcXVhbCBkZWdyZWVzIG9yIFxcKG0gPSBuXFwpIiwiTXVzdCBzdGF0ZSB0aGF0IGFuIGV4dHJhIGNvbnN0YW50IHRlcm0gaXMgcmVxdWlyZWQiLCJNdXN0IGdpdmUgdGhlIGNvcnJlY3RlZCBzZXR1cCB3aXRoIGNvbnN0YW50IFxcKDNcXCkiXSwiZXhwbGFuYXRpb24iOiJUaGlzIGNoZWNrcyB3aGV0aGVyIHRoZSBzdHVkZW50IHVuZGVyc3RhbmRzIHRoZSBzdHJ1Y3R1cmFsIHJlYXNvbiBiZWhpbmQgdGhlIHNldHVwIGluc3RlYWQgb2Ygb25seSBjb3B5aW5nIGEgbWVtb3JpemVkIHBhdHRlcm4uIiwiaGludCI6Ikxvb2sgYXQgdGhlIGhpZ2hlc3QgcG93ZXJzIGZpcnN0LCBiZWZvcmUgdG91Y2hpbmcgY29lZmZpY2llbnRzLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
