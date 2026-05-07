%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImdlbmVyYXRlZF9pbWFnZSIsInJhdGlvbmFsZSI6IlRoaXMgc2VjdGlvbiBpcyBhIGZvcm11bGEtc2hlZXQgc3R5bGUgYXBwZW5kaXggd2l0aCBubyBleHRyYWN0ZWQgdGV4dGJvb2sgZmlndXJlcyBhdmFpbGFibGUuIEEgY2xlYW4gZ2VuZXJhdGVkIHJlY29nbml0aW9uIGNoYXJ0IGlzIHRoZSBiZXN0IHdheSB0byB0dXJuIGRlbnNlIGZvcm11bGFzIGludG8gZmFzdCBleGFtIHBhdHRlcm5zLiIsImNyYW0iOiJVc2Ugb25lIGNvbXBhY3QgcGF0dGVybi1yZWNvZ25pdGlvbiB2aXN1YWwgdG8gaGVscCB0aGUgc3R1ZGVudCBtYXRjaCBpbnRlZ3JhbmQgc2hhcGUgdG8gZm9ybXVsYSBpbiBzZWNvbmRzLiIsInN0YW5kYXJkIjoiVXNlIHRoZSB2aXN1YWwgdG8gZ3JvdXAgZm9ybXVsYXMgaW50byBmYW1pbGllczogYmFzaWMgdHJpZywgeCB0aW1lcyB0cmlnLCBleHBvbmVudGlhbCwgZXhwb25lbnRpYWwtdHJpZywgYW5kIHJhdGlvbmFsIGZvcm1zLiIsInRvcF9zY29yZSI6IlVzZSB0aGUgdmlzdWFsIHRvIGV4cG9zZSBsb29rLWFsaWtlIGZvcm1zLCBzaWduIHRyYXBzLCBhbmQgd2hlbiBwYXJhbWV0ZXIgcmVzdHJpY3Rpb25zIHN1Y2ggYXMgYV4yICE9IGJeMiBtYXR0ZXIuIn0=" style="display:none;"></div>%%KC_END%%
# Indefinite Integral Formulas — Fast Pattern Recognition

> **Objective:** Recognize standard indefinite integral forms instantly and apply the correct template without re-deriving anything.

This page is a cram sheet. Your goal is not to derive these formulas — it is to **match the integrand shape to the right template in seconds**, copy the formula, and add \(+C\). The highest-frequency families on this appendix page are: **integration by parts**, **basic trig** (\(\sin(ax)\), \(\cos(ax)\)), **polynomial times trig** (\(x\sin(ax)\), \(x\cos(ax)\)), **pure exponential** (\(e^{ax}\)), **exponential times trig** (\(e^{ax}\sin(bx)\), \(e^{ax}\cos(bx)\)), and **rational forms** involving \(x^2 + a^2\). Exam payoff: when the integrand already matches a memorized pattern, these formulas cut your work time to near zero.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="exam_pattern_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgYXMgYSBvbmUtZ2xhbmNlIG1hdGNoLXRoZS1wYXR0ZXJuIHNoZWV0IGJlZm9yZSBzb2x2aW5nLiIsInN0YW5kYXJkIjoiVXNlIHRoaXMgdG8gb3JnYW5pemUgdGhlIGZvcm11bGFzIGludG8gY2xlYXIgZmFtaWxpZXMuIiwidG9wX3Njb3JlIjoiVXNlIHRoaXMgdG8gY29tcGFyZSBzaW1pbGFyLWxvb2tpbmcgZm9ybXMgYW5kIHNwb3Qgc2lnbiBvciBjb2VmZmljaWVudCB0cmFwcy4ifQ==" style="display:none;"></div>%%KC_END%%
*🎨 Six integral formula families grouped for fast exam recognition. Match the integrand shape to the correct box before computing.*
![Illustration](/generated/gptimage2-1777220504442-6631.png)

## 1. Match the Integrand Before You Integrate

The fastest exam workflow is a two-step classification: **look at the integrand shape first**, then pull the matching template.

### THE FIVE SHAPES TO CLASSIFY

| Shape | Example | Formula Family |
|---|---|---|
| Pure trig | \(\sin(ax)\) | Basic trig |
| Polynomial × trig | \(x\cos(ax)\) | x times trig / IBP |
| Pure exponential | \(e^{ax}\) | Exponential |
| Exponential × trig | \(e^{ax}\sin(bx)\) | Exponential-trig |
| Rational \(x^2+a^2\) | \(\frac{1}{x^2+a^2}\) | Arctangent or log |

### EXAM TRAPS

> **Trap 1:** Do not apply a memorized template if the integrand does not match the form exactly. A small difference — such as \(x^2\) instead of \(x\), or a missing exponential — means the formula does not apply.

> **Trap 2:** Never omit \(+C\). Every indefinite integral result on this page requires it.

$$\int u\,dv = uv - \int v\,du$$
*This is the **integration by parts** template. Recognize it immediately whenever the integrand is a **product of two functions** and one factor becomes simpler after differentiation. The classic signal: you see \(x \cdot \sin(ax)\), \(x \cdot e^{ax}\), or \(x \cdot \cos(ax)\) — set \(u\) to the polynomial factor (it simplifies when differentiated) and \(dv\) to the trig or exponential factor.*

$$\int \sin(ax)\,dx = -\frac{1}{a}\cos(ax) + C \qquad \int \cos(ax)\,dx = \frac{1}{a}\sin(ax) + C$$
***Memory cue — three facts to lock in:**

1. **Sine integrates to negative cosine.** The minus sign is mandatory.
2. **Cosine integrates to positive sine.** No sign change.
3. **The inner factor \(a\) creates a \(\frac{1}{a}\) multiplier** in front — this is the chain-rule correction. If \(a = 4\), the result carries \(\frac{1}{4}\).

#### Warning
The most common error is writing \(\cos(ax)\) without the \(-\frac{1}{a}\) factor. Always check both the sign and the coefficient.*

$$\int e^{ax}\sin(bx)\,dx = \frac{e^{ax}}{a^2+b^2}\big(a\sin bx-b\cos bx\big) + C \qquad \int e^{ax}\cos(bx)\,dx = \frac{e^{ax}}{a^2+b^2}\big(a\cos bx+b\sin bx\big) + C$$
*These are **high-value memorization formulas** — they appear on exams precisely because re-deriving them under time pressure is slow and error-prone.

### SHARED STRUCTURE

Both formulas share the same skeleton:
$$
\frac{e^{ax}}{a^2+b^2} \times (\text{trig combination}) + C
$$
The denominator \(a^2 + b^2\) is identical in both.

### SIGN DIFFERENCE — THE TRAP

| Integral | Trig combination inside |
|---|---|
| \(\int e^{ax}\sin(bx)\,dx\) | \(a\sin bx \;\mathbf{-}\; b\cos bx\) |
| \(\int e^{ax}\cos(bx)\,dx\) | \(a\cos bx \;\mathbf{+}\; b\sin bx\) |

The sine version has a **minus** between terms; the cosine version has a **plus**. This is the single most common sign error on these formulas.*

$$\int \frac{dx}{x^2+a^2} = \frac{1}{a}\tan^{-1}\!\left(\frac{x}{a}\right) + C \qquad \int \frac{x\,dx}{x^2+a^2} = \frac{1}{2}\ln(x^2+a^2) + C$$
***One-sentence recognition rule for each:**

- **No \(x\) in the numerator** → arctangent form: result is \(\frac{1}{a}\tan^{-1}\!\left(\frac{x}{a}\right) + C\). The \(\frac{1}{a}\) factor out front is required.
- **\(x\) in the numerator** → logarithm form: result is \(\frac{1}{2}\ln(x^2+a^2) + C\). The \(\frac{1}{2}\) coefficient is required — do not drop it.

#### Note
For the arctangent form, \(a^2\) must be a positive constant. If the denominator is \(x^2 + 9\), then \(a = 3\) and the result carries \(\frac{1}{3}\tan^{-1}(x/3)\).*

---
**📌 Key Takeaways**
- Classify the integrand shape first — match the pattern, then copy the correct template.
- Preserve every chain factor \(\frac{1}{a}\), every sign, and the \(a^2+b^2\) denominator exactly.
- Every indefinite integral result requires \(+C\) — never omit it.

*In the next section we will move to a different appendix formula set.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InBhdHRlcm5fcmVjb2duaXRpb24iLCJsYWJlbCI6IkNob29zZSB0aGUgY29ycmVjdCBmb3JtdWxhIGZhbWlseSBmcm9tIHRoZSBpbnRlZ3JhbmQgc2hhcGUiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGFwcGVuZGl4IGZvcm11bGEgZmFtaWx5IHNob3VsZCB5b3UgcmVjb2duaXplIGZpcnN0IGZvciBcXChcXGludCB4XFxjb3MoM3gpXFwsZHhcXCk/Iiwib3B0aW9ucyI6WyJBLiBCYXNpYyB0cmlnIGludGVncmFsIiwiQi4gSW50ZWdyYXRpb24gYnkgcGFydHMgLyB4IHRpbWVzIHRyaWcgZm9ybSIsIkMuIFJhdGlvbmFsIGFyY3RhbmdlbnQgZm9ybSIsIkQuIEV4cG9uZW50aWFsLXRyaWcgZm9ybSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBpbnRlZ3JhbmQgaXMgYSBwcm9kdWN0IG9mIFxcKHhcXCkgYW5kIGEgdHJpZyBmdW5jdGlvbiwgc28gdGhlIHggdGltZXMgdHJpZyBwYXR0ZXJuIG9yIGludGVncmF0aW9uIGJ5IHBhcnRzIGlzIHRoZSBjb3JyZWN0IGZhbWlseS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJCYXNpYyB0cmlnIGZvcm11bGFzIGFwcGx5IHRvIFxcKFxcc2luKGF4KVxcKSBvciBcXChcXGNvcyhheClcXCkgYWxvbmUsIG5vdCBtdWx0aXBsaWVkIGJ5IFxcKHhcXCkuIiwiQyI6IkFyY3RhbmdlbnQgZm9ybSBpcyBmb3IgXFwoXFxmcmFjezF9e3heMithXjJ9XFwpLiIsIkQiOiJUaGVyZSBpcyBubyBleHBvbmVudGlhbCBmYWN0b3IgXFwoZV57YXh9XFwpIGhlcmUuIn0sImhpbnQiOiJDbGFzc2lmeSB0aGUgdmlzaWJsZSBzaGFwZSBiZWZvcmUgdGhpbmtpbmcgYWJvdXQgZGV0YWlscy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGludGVncmFsIG1hdGNoZXMgdGhlIGFyY3RhbmdlbnQgcGF0dGVybiBvbiB0aGlzIHBhZ2U/Iiwib3B0aW9ucyI6WyJBLiBcXChcXGludCBcXGZyYWN7eFxcLGR4fXt4XjIrYV4yfVxcKSIsIkIuIFxcKFxcaW50IFxcZnJhY3tkeH17eF4yK2FeMn1cXCkiLCJDLiBcXChcXGludCBlXntheH1cXCxkeFxcKSIsIkQuIFxcKFxcaW50IFxcc2luKGF4KVxcLGR4XFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIHN0YW5kYXJkIGFyY3RhbmdlbnQgZm9ybSBpcyBcXChcXGludCBcXGZyYWN7ZHh9e3heMithXjJ9ID0gXFxmcmFjezF9e2F9XFx0YW5eey0xfVxcIVxcbGVmdChcXGZyYWN7eH17YX1cXHJpZ2h0KStDXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IldpdGggXFwoeFxcKSBpbiB0aGUgbnVtZXJhdG9yLCB0aGlzIG1hdGNoZXMgdGhlIGxvZ2FyaXRobSBmb3JtIGluc3RlYWQuIiwiQyI6IlRoaXMgaXMgYSBiYXNpYyBleHBvbmVudGlhbCBpbnRlZ3JhbC4iLCJEIjoiVGhpcyBpcyBhIGJhc2ljIHRyaWcgaW50ZWdyYWwuIn0sImhpbnQiOiJObyBcXCh4XFwpIG9uIHRvcCB1c3VhbGx5IHBvaW50cyB0byBhcmN0YW5nZW50IGhlcmUuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJzaWduc19hbmRfY29uc3RhbnRzIiwibGFiZWwiOiJQcmVzZXJ2ZSBzaWducywgY2hhaW4gZmFjdG9ycywgYW5kIHRoZSBjb25zdGFudCBvZiBpbnRlZ3JhdGlvbiIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggcmVzdWx0IGlzIGNvcnJlY3QgZm9yIFxcKFxcaW50IFxcc2luKDR4KVxcLGR4XFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoLVxcY29zKDR4KStDXFwpIiwiQi4gXFwoLVxcZnJhY3sxfXs0fVxcY29zKDR4KStDXFwpIiwiQy4gXFwoXFxmcmFjezF9ezR9XFxjb3MoNHgpK0NcXCkiLCJELiBcXChcXGZyYWN7MX17NH1cXHNpbig0eCkrQ1xcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkludGVncmF0aW5nIFxcKFxcc2luKGF4KVxcKSBnaXZlcyBcXCgtXFxmcmFjezF9e2F9XFxjb3MoYXgpK0NcXCksIHNvIHdpdGggXFwoYT00XFwpIHRoZSByZXN1bHQgaXMgXFwoLVxcZnJhY3sxfXs0fVxcY29zKDR4KStDXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBjaGFpbiBmYWN0b3IgXFwoXFxmcmFjezF9ezR9XFwpIGlzIG1pc3NpbmcuIiwiQyI6IlRoZSBzaWduIGlzIHdyb25nOyBzaW5lIGludGVncmF0ZXMgdG8gbmVnYXRpdmUgY29zaW5lLiIsIkQiOiJUaGF0IGlzIHRoZSBjb3NpbmUgaW50ZWdyYWwgcGF0dGVybiwgbm90IHRoZSBzaW5lIHBhdHRlcm4uIn0sImhpbnQiOiJSZW1lbWJlciBib3RoIHRoZSBtaW51cyBzaWduIGFuZCB0aGUgXFwoXFxmcmFjezF9e2F9XFwpIGZhY3Rvci4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgc3R1ZGVudCB3cml0ZXMgXFwoXFxpbnQgZV57Mnh9XFwsZHggPSBlXnsyeH0rQ1xcKS4gV2hhdCBpcyB0aGUgZXJyb3I/Iiwib3B0aW9ucyI6WyJBLiBUaGUgc2lnbiBzaG91bGQgYmUgbmVnYXRpdmUiLCJCLiBUaGUgYW5zd2VyIHNob3VsZCBjb250YWluIGxvZ2FyaXRobXMiLCJDLiBUaGUgZmFjdG9yIFxcKFxcZnJhY3sxfXsyfVxcKSBpcyBtaXNzaW5nIiwiRC4gVGhlIGNvbnN0YW50IFxcKENcXCkgc2hvdWxkIG5vdCBiZSB0aGVyZSJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IkJlY2F1c2UgdGhlIGV4cG9uZW50IGlzIFxcKDJ4XFwpLCB0aGUgY2hhaW4gcnVsZSBnaXZlcyBcXChcXGludCBlXnsyeH1cXCxkeCA9IFxcZnJhY3sxfXsyfWVeezJ4fStDXFwpLiBUaGUgZmFjdG9yIFxcKFxcZnJhY3sxfXsyfVxcKSBjb21wZW5zYXRlcyBmb3IgdGhlIGlubmVyIGRlcml2YXRpdmUgb2YgXFwoMnhcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlcmUgaXMgbm8gbmVnYXRpdmUgc2lnbiBpbiB0aGUgZXhwb25lbnRpYWwgcnVsZS4iLCJCIjoiTG9nYXJpdGhtcyBiZWxvbmcgdG8gdGhlIHJhdGlvbmFsIFxcKHheMithXjJcXCkgZm9ybXMsIG5vdCBleHBvbmVudGlhbCBpbnRlZ3JhbHMuIiwiRCI6IlRoZSBjb25zdGFudCBvZiBpbnRlZ3JhdGlvbiBpcyByZXF1aXJlZCBmb3IgYWxsIGluZGVmaW5pdGUgaW50ZWdyYWxzLiJ9LCJoaW50IjoiRGlmZmVyZW50aWF0ZSB0aGUgcHJvcG9zZWQgYW5zd2VyIG1lbnRhbGx5IHRvIGNoZWNrIGl0LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoibWl4ZWRfZXhwb25lbnRpYWxfdHJpZyIsImxhYmVsIjoiUmVjb2duaXplIHRoZSBtZW1vcml6ZWQgc3RydWN0dXJlIGZvciBlXihheCkgdGltZXMgc2luZSBvciBjb3NpbmUiLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBmZWF0dXJlIGFwcGVhcnMgaW4gYm90aCBmb3JtdWxhcyBmb3IgXFwoXFxpbnQgZV57YXh9XFxzaW4oYngpXFwsZHhcXCkgYW5kIFxcKFxcaW50IGVee2F4fVxcY29zKGJ4KVxcLGR4XFwpPyIsIm9wdGlvbnMiOlsiQS4gQSBkZW5vbWluYXRvciBvZiBcXChhLWJcXCkiLCJCLiBBIGRlbm9taW5hdG9yIG9mIFxcKGFeMitiXjJcXCkiLCJDLiBBIGxvZ2FyaXRobSB0ZXJtIiwiRC4gQW4gYXJjdGFuZ2VudCB0ZXJtIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiQm90aCBtaXhlZCBmb3JtdWxhcyBzaGFyZSB0aGUgc3RydWN0dXJlIFxcKFxcZnJhY3tlXntheH19e2FeMitiXjJ9XFwpIHRpbWVzIGEgc2luZS1jb3NpbmUgY29tYmluYXRpb24uIFRoZSBkZW5vbWluYXRvciBcXChhXjIrYl4yXFwpIGlzIHRoZSBzaGFyZWQgc2tlbGV0b24uIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlIGRlbm9taW5hdG9yIFxcKGEtYlxcKSBkb2VzIG5vdCBhcHBlYXIgaW4gdGhlc2UgZm9ybXVsYXMuIiwiQyI6Ik5vIGxvZ2FyaXRobSBhcHBlYXJzIGluIHRoZXNlIGV4cG9uZW50aWFsLXRyaWcgcmVzdWx0cy4iLCJEIjoiQXJjdGFuZ2VudCBiZWxvbmdzIHRvIHRoZSByYXRpb25hbCBcXChcXGZyYWN7MX17eF4yK2FeMn1cXCkgZm9ybS4ifSwiaGludCI6IkZvY3VzIG9uIHRoZSBzaGFyZWQgZGVub21pbmF0b3IgZmlyc3QuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImdlbmVyYXRlZF9pbWFnZSIsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6InJhdGlvbmFsX2Zvcm1zIiwibGFiZWwiOiJEaXN0aW5ndWlzaCBsb2dhcml0aG0gZm9ybSBmcm9tIGFyY3RhbmdlbnQgZm9ybSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNF9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggYW50aWRlcml2YXRpdmUgaXMgY29ycmVjdCBmb3IgXFwoXFxpbnQgXFxmcmFje3hcXCxkeH17eF4yKzl9XFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoXFxmcmFjezF9ezN9XFx0YW5eey0xfSh4LzMpK0NcXCkiLCJCLiBcXChcXGZyYWN7MX17Mn1cXGxuKHheMis5KStDXFwpIiwiQy4gXFwoXFxsbih4XjIrOSkrQ1xcKSIsIkQuIFxcKC1cXGZyYWN7MX17Mn1cXGxuKHheMis5KStDXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiV2l0aCBcXCh4XFwpIGluIHRoZSBudW1lcmF0b3IsIHRoaXMgbWF0Y2hlcyB0aGUgbG9nYXJpdGhtIGZvcm0gXFwoXFxpbnQgXFxmcmFje3hcXCxkeH17eF4yK2FeMn0gPSBcXGZyYWN7MX17Mn1cXGxuKHheMithXjIpK0NcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhhdCBpcyB0aGUgbm8tXFwoeFxcKS1vbi10b3AgYXJjdGFuZ2VudCBmb3JtLCB3aGljaCBhcHBsaWVzIHRvIFxcKFxcaW50IFxcZnJhY3tkeH17eF4yKzl9XFwpLiIsIkMiOiJUaGUgY29lZmZpY2llbnQgXFwoXFxmcmFjezF9ezJ9XFwpIGlzIHJlcXVpcmVkIGFuZCBjYW5ub3QgYmUgZHJvcHBlZC4iLCJEIjoiVGhlIHNpZ24gc2hvdWxkIG5vdCBiZSBuZWdhdGl2ZSBmb3IgdGhpcyBmb3JtLiJ9LCJoaW50IjoiTnVtZXJhdG9yIFxcKHhcXCkgdXN1YWxseSBzaWduYWxzIHRoZSBsb2cgZm9ybSBvbiB0aGlzIHBhZ2UuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJjb25zdGFudF9vZl9pbnRlZ3JhdGlvbiIsImxhYmVsIjoiUmVtZW1iZXIgdGhlIGluZGVmaW5pdGUgaW50ZWdyYWwgY29uc3RhbnQiLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3A1X3ExIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJXaHkgbXVzdCBhIGNvbnN0YW50IFxcKCtDXFwpIGJlIGluY2x1ZGVkIGluIGluZGVmaW5pdGUgaW50ZWdyYWxzIGZyb20gdGhpcyBhcHBlbmRpeD8iLCJpZGVhbF9hbnN3ZXIiOiJCZWNhdXNlIGRpZmZlcmVudGlhdGlvbiByZW1vdmVzIGNvbnN0YW50cywgbWFueSBhbnRpZGVyaXZhdGl2ZXMgZGlmZmVyIG9ubHkgYnkgYSBjb25zdGFudCwgc28gdGhlIGdlbmVyYWwgaW5kZWZpbml0ZSBpbnRlZ3JhbCBtdXN0IGluY2x1ZGUgXFwoK0NcXCkgdG8gcmVwcmVzZW50IHRoZSBlbnRpcmUgZmFtaWx5IG9mIGFudGlkZXJpdmF0aXZlcy4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IG1lbnRpb24gZmFtaWx5IG9mIGFudGlkZXJpdmF0aXZlcywgbm90IGp1c3Qgb25lIGFuc3dlciIsIk11c3Qgc3RhdGUgdGhhdCBkaWZmZXJlbnRpYXRpb24gcmVtb3ZlcyBjb25zdGFudHMiLCJNdXN0IGV4cGxpY2l0bHkgaW5jbHVkZSB0aGUgcm9sZSBvZiArQyJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQgdW5kZXJzdGFuZHMgdGhhdCBhcHBlbmRpeCBmb3JtdWxhcyBnaXZlIGdlbmVyYWwgYW50aWRlcml2YXRpdmVzLCBub3Qgc2luZ2xlIG51bWVyaWMgYW5zd2Vycy4gRm9yIGV4YW1wbGUsIFxcKEYoeCkrN1xcKSBhbmQgXFwoRih4KS0zXFwpIGJvdGggZGlmZmVyZW50aWF0ZSB0byBcXChmKHgpXFwpLCBzbyBib3RoIGFyZSB2YWxpZCBhbnRpZGVyaXZhdGl2ZXMuIiwiaGludCI6IlRoaW5rIGFib3V0IHdoYXQgaGFwcGVucyB3aGVuIHlvdSBkaWZmZXJlbnRpYXRlIFxcKEYoeCkrN1xcKSBhbmQgXFwoRih4KS0zXFwpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
