%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJUaGlzIHNlY3Rpb24gaXMgaGlnaGx5IHZpc3VhbCBhbmQgZXhhbS1mcmllbmRseTogdGhlIHRleHRib29rIGFscmVhZHkgcHJvdmlkZXMgYSBzdHJvbmcgZmlndXJlIGZvciB0aW1lLWNvbnN0YW50IHJlYWRpbmcsIGFuZCBhIGNsZWFuIGdlbmVyYXRlZCBkaWFncmFtIGNhbiBtYWtlIHRoZSBkZWNheSBwYXR0ZXJuIGFuZCByZXBlYXRlZCAzNyUgcnVsZSBldmVuIGZhc3RlciB0byByZWNvZ25pemUuIiwiY3JhbSI6IlVzZSB2aXN1YWxzIGFzIGZhc3QgcGF0dGVybi1yZWNvZ25pdGlvbiB0b29sczogaWRlbnRpZnkgZGVjYXkgdnMgZ3Jvd3RoLCBtYXJrIG9uZSB0aW1lIGNvbnN0YW50LCBhbmQgcmVhZCB0aGUgMSB0byAwLjM3IHRvIDAuMTM1IGRyb3AgcGF0dGVybiBpbW1lZGlhdGVseS4iLCJzdGFuZGFyZCI6IlVzZSB2aXN1YWxzIHRvIGNvbm5lY3QgdGhlIGZvcm11bGEgZV57LWF0fSB0byBpdHMgc2hhcGUsIHRpbWUgY29uc3RhbnQsIGFuZCBrZXkgYmVuY2htYXJrIHZhbHVlcyBvbiB0aGUgZ3JhcGguIiwidG9wX3Njb3JlIjoiVXNlIHZpc3VhbHMgdG8gZXhwb3NlIHRyYW5zZmVyIHJ1bGVzIHN1Y2ggYXMgcmVwZWF0ZWQgMS9lIGRlY2F5IG92ZXIgYW55IGludGVydmFsIG9mIGxlbmd0aCAxL2EgYW5kIHRoZSBjb250cmFzdCBiZXR3ZWVuIGRlY2F5IGVeey1hdH0gYW5kIGdyb3d0aCBlXnthdH0uIn0=" style="display:none;"></div>%%KC_END%%
# B.3-1 Sketching Monotonic Exponentials

> **Objective:** Sketch decaying and growing exponentials fast, read the time constant, and mark key benchmark points — exactly what exams test.

---

Exam questions on exponentials rarely ask for long derivations. They ask: *which way does it go?* and *where are the key points?* Here is what to lock in:

- **Decay:** \(e^{-at}\) with \(a > 0\) falls toward zero as \(t\) increases.
- **Growth:** \(e^{at}\) with \(a > 0\) rises without bound as \(t\) increases.
- **Time constant:** for \(e^{-at}\), the time constant is \(\tau = 1/a\).
- **Benchmark:** after one time constant, the value drops to \(1/e \approx 0.37\) of its previous value.

These four facts cover the majority of exam sketching tasks.

#### Warning
Students frequently confuse the time constant \(1/a\) with the coefficient \(a\) itself. They are not the same.

## 1. Decay, growth, and the one rule to memorize

Assume \(a > 0\). The rule is simple:

- **Minus sign in the exponent** → the signal decays to the right: \(e^{-at}\) starts at 1 and falls.
- **Plus sign in the exponent** → the signal grows to the right: \(e^{at}\) starts at 1 and rises.

Before sketching anything, check the sign of the full exponent. That single check tells you the direction.

### COMMON MISTAKE

Do not decide from the coefficient \(a\) alone; decide from the full exponent sign. A positive \(a\) appears in both \(e^{-at}\) and \(e^{at}\) — only the sign in front of \(at\) determines decay versus growth.

## 2. Time constant = fastest way to sketch

For \(e^{-at}\), the **time constant** is \(\tau = 1/a\). This is the single most useful shortcut for a fast exam sketch.

Mark these three points and you have enough to draw the curve:

| \(t\) | Value | Approximate |
|---|---|---|
| \(0\) | \(1\) | \(1.000\) |
| \(1/a\) | \(1/e\) | \(\approx 0.37\) |
| \(2/a\) | \(1/e^2\) | \(\approx 0.135\) |

Three points are enough for a correct exam sketch. Connect them with a smooth curve that flattens toward zero.

### COMMON MISTAKE

Students often mark the first special point at \(t = a\) instead of \(t = 1/a\). The time constant is the **reciprocal** of \(a\), not \(a\) itself.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="exam_pattern_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgdG8gcmVjb2duaXplIGluIHNlY29uZHMgd2hpY2ggY3VydmUgZGVjYXlzIGFuZCB3aGljaCBncm93cy4iLCJzdGFuZGFyZCI6IlVzZSB0aGlzIHRvIGNvbm5lY3QgZXhwb25lbnQgc2lnbiB0byB3YXZlZm9ybSBzaGFwZS4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhpcyB0byByZWluZm9yY2Ugc2lnbi1iYXNlZCByZWFzb25pbmcgYmVmb3JlIGhhbmRsaW5nIHNjYWxlZCBvciBzaGlmdGVkIHZhcmlhbnRzLiJ9" style="display:none;"></div>%%KC_END%%
*🎨 Left: \(e^{-at}\) decays. Right: \(e^{at}\) grows. The only difference is the sign in the exponent.*
![Illustration](/generated/gptimage2-1777215100560-4722.png)

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgZmlndXJlIHRvIG1lbW9yaXplIHRoZSAxLCAwLjM3LCAwLjEzNSBwYXR0ZXJuIGFuZCB0aGUgbG9jYXRpb24gb2Ygb25lIHRpbWUgY29uc3RhbnQuIiwic3RhbmRhcmQiOiJVc2UgdGhpcyBmaWd1cmUgdG8gZXhwbGFpbiBob3cgdGhlIGdyYXBoIGlzIGJ1aWx0IGZyb20gYmVuY2htYXJrIHBvaW50cy4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhpcyBmaWd1cmUgdG8gaGlnaGxpZ2h0IHRoYXQgdGhlIHNhbWUgMS9lIGRyb3AgcmVwZWF0cyBvdmVyIGVhY2ggaW50ZXJ2YWwgb2YgbGVuZ3RoIDEvYS4ifQ==" style="display:none;"></div>%%KC_END%%
![Fig. B.10](/figures/page-021-fig__b_10-1.png)
*This textbook figure shows the key benchmark points used to sketch a decaying exponential quickly: the initial value of 1, the one-time-constant value of 0.37, and the next repeated drop to 0.135.*

$$e^{-at},\quad \tau = \frac{1}{a},\quad x(\tau)=\frac{1}{e},\quad x(2\tau)=\frac{1}{e^2}$$
*The time constant \(\tau = 1/a\) gives the first key mark on the \(t\)-axis, and each additional interval of length \(\tau\) multiplies the current value by another factor of \(1/e\).*

## 3. Fast example: sketch \(x(t) = e^{-2t}\)

Here \(a = 2\), so the time constant is \(\tau = 1/2 = 0.5\).

**Key points to mark:**

1. \(x(0) = 1\)
2. \(x(0.5) = 1/e \approx 0.37\)
3. \(x(1) = 1/e^2 \approx 0.135\)
4. \(x(1.5) = 1/e^3 \approx 0.050\)

Plot these four points, connect with a smooth curve that flattens toward zero, and the sketch is done.

### EXAM TIP

Once \(x(0.5) = 0.37\) is placed correctly, every subsequent point follows by multiplying by \(1/e\) every \(0.5\) seconds. You do not need to recompute from scratch each time.

---
**📌 Key Takeaways**
- Check the exponent sign first: minus means decay, plus means growth.
- Time constant for \(e^{-at}\) is \(\tau = 1/a\), not \(a\) — mark it on the \(t\)-axis.
- Each time constant interval multiplies the value by \(1/e \approx 0.37\) repeatedly.

*In the next section we will sketch exponentially varying sinusoids using exponential envelopes.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NSwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo0LCJtYXgiOjZ9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImRlY2F5X3ZzX2dyb3d0aCIsImxhYmVsIjoiUmVjb2duaXplIGRlY2F5IHZlcnN1cyBncm93dGggZnJvbSB0aGUgZXhwb25lbnQiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHNpZ25hbCBkZWNheXMgbW9ub3RvbmljYWxseSBmb3IgXFwodFxcKSBpbmNyZWFzaW5nLCBhc3N1bWluZyBcXChhID4gMFxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKGVee2F0fVxcKSIsIkIuIFxcKGVeey1hdH1cXCkiLCJDLiBcXCgtZV57LWF0fVxcKSIsIkQuIFxcKHQgZV57LWF0fVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkZvciBcXChhID4gMFxcKSwgdGhlIG5lZ2F0aXZlIHNpZ24gaW4gdGhlIGV4cG9uZW50IG1ha2VzIHRoZSBleHBvbmVudGlhbCBkZWNyZWFzZSBhcyBcXCh0XFwpIGluY3JlYXNlcy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJcXChlXnthdH1cXCkgZ3Jvd3MsIG5vdCBkZWNheXMsIHdoZW4gXFwoYSA+IDBcXCkuIiwiQyI6IlxcKC1lXnstYXR9XFwpIHN0YXlzIG5lZ2F0aXZlOyBpdCBpcyBub3QgdGhlIHN0YW5kYXJkIHBvc2l0aXZlIG1vbm90b25pYyBkZWNheSBzaGFwZSBkaXNjdXNzZWQgaGVyZS4iLCJEIjoiXFwodCBlXnstYXR9XFwpIGlzIG5vdCB0aGUgYmFzaWMgbW9ub3RvbmljIGV4cG9uZW50aWFsIGZvcm0gb2YgdGhpcyBzZWN0aW9uLiJ9LCJoaW50IjoiQ2hlY2sgdGhlIHNpZ24gaW4gdGhlIGV4cG9uZW50IGJlZm9yZSBsb29raW5nIGF0IGFueXRoaW5nIGVsc2UuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJBIHN0dWRlbnQgc2F5cyAnc2luY2UgXFwoYVxcKSBpcyBwb3NpdGl2ZSwgXFwoZV57LWF0fVxcKSBtdXN0IGdyb3cuJyBXaGF0IGlzIHRoZSBiZXN0IGNvcnJlY3Rpb24/Iiwib3B0aW9ucyI6WyJBLiBDb3JyZWN0LCBiZWNhdXNlIHBvc2l0aXZlIFxcKGFcXCkgYWx3YXlzIG1lYW5zIGdyb3d0aCIsIkIuIFdyb25nLCBiZWNhdXNlIHRoZSBtaW51cyBzaWduIGluIHRoZSBleHBvbmVudCBjb250cm9scyB0aGUgZGVjYXkiLCJDLiBXcm9uZywgYmVjYXVzZSBleHBvbmVudGlhbHMgbmV2ZXIgZ3JvdyIsIkQuIENvcnJlY3QsIGJlY2F1c2UgXFwodFxcKSBpcyBwb3NpdGl2ZSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBmdWxsIGV4cG9uZW50IG1hdHRlcnMuIFdpdGggXFwoYSA+IDBcXCksIHRoZSBleHByZXNzaW9uIFxcKC1hdFxcKSBiZWNvbWVzIG1vcmUgbmVnYXRpdmUgYXMgXFwodFxcKSBpbmNyZWFzZXMsIHNvIHRoZSBzaWduYWwgZGVjYXlzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlBvc2l0aXZlIFxcKGFcXCkgYWxvbmUgZG9lcyBub3QgZGV0ZXJtaW5lIGdyb3d0aDsgdGhlIGV4cG9uZW50IHNpZ24gbWF0dGVycy4iLCJDIjoiRXhwb25lbnRpYWxzIGNhbiBncm93IG9yIGRlY2F5IGRlcGVuZGluZyBvbiB0aGUgc2lnbi4iLCJEIjoiUG9zaXRpdmUgXFwodFxcKSBkb2VzIG5vdCBmb3JjZSBncm93dGg7IGl0IGludGVyYWN0cyB3aXRoIHRoZSBleHBvbmVudCBzaWduLiJ9LCJoaW50IjoiRG8gbm90IGp1ZGdlIGZyb20gXFwoYVxcKSBhbG9uZTsganVkZ2UgZnJvbSBcXCgtYXRcXCkgdmVyc3VzIFxcKGF0XFwpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoidGltZV9jb25zdGFudF9yZWFkaW5nIiwibGFiZWwiOiJSZWFkIGFuZCB1c2UgdGhlIHRpbWUgY29uc3RhbnQiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciBcXCh4KHQpID0gZV57LTR0fVxcKSwgd2hhdCBpcyB0aGUgdGltZSBjb25zdGFudD8iLCJvcHRpb25zIjpbIkEuIFxcKDRcXCkiLCJCLiBcXCgxLzRcXCkiLCJDLiBcXChlXnstNH1cXCkiLCJELiBcXCgxL2VcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJGb3IgXFwoZV57LWF0fVxcKSwgdGhlIHRpbWUgY29uc3RhbnQgaXMgXFwoMS9hXFwpLiBIZXJlIFxcKGEgPSA0XFwpLCBzbyB0aGUgdGltZSBjb25zdGFudCBpcyBcXCgxLzRcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBpcyB0aGUgY29tbW9uIHRyYXAgb2YgdXNpbmcgXFwoYVxcKSBpbnN0ZWFkIG9mIFxcKDEvYVxcKS4iLCJDIjoiXFwoZV57LTR9XFwpIGlzIGEgdmFsdWUgb2YgdGhlIGV4cG9uZW50aWFsIGF0IFxcKHQgPSAxXFwpLCBub3QgdGhlIHRpbWUgY29uc3RhbnQuIiwiRCI6IlxcKDEvZVxcKSBpcyB0aGUgYW1wbGl0dWRlIHJhdGlvIGFmdGVyIG9uZSB0aW1lIGNvbnN0YW50LCBub3QgdGhlIHRpbWUgY29uc3RhbnQgaXRzZWxmLiJ9LCJoaW50IjoiVGhlIHRpbWUgY29uc3RhbnQgZm9yIFxcKGVeey1hdH1cXCkgaXMgYWx3YXlzIHRoZSByZWNpcHJvY2FsLCBub3QgdGhlIGNvZWZmaWNpZW50IGl0c2VsZi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciBcXCh4KHQpID0gZV57LTJ0fVxcKSwgd2hhdCBpcyBcXCh4KHQpXFwpIGFmdGVyIG9uZSB0aW1lIGNvbnN0YW50PyIsIm9wdGlvbnMiOlsiQS4gXFwoMlxcKSIsIkIuIFxcKDEvMlxcKSIsIkMuIFxcKDEvZVxcKSIsIkQuIFxcKGVcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJBZnRlciBvbmUgdGltZSBjb25zdGFudCwgYW55IGRlY2F5aW5nIGV4cG9uZW50aWFsIFxcKGVeey1hdH1cXCkgZHJvcHMgdG8gXFwoMS9lXFwpIG9mIGl0cyB2YWx1ZSBhdCB0aGUgc3RhcnQgb2YgdGhhdCBpbnRlcnZhbC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGUgc2lnbmFsIHN0YXJ0cyBhdCAxLCBzbyBpdCBjYW5ub3QgYmVjb21lIDIgdW5kZXIgZGVjYXkuIiwiQiI6IlN0dWRlbnRzIG9mdGVuIGNvbmZ1c2UgYSBzaW1wbGUgZnJhY3Rpb24gd2l0aCB0aGUgc3BlY2lhbCBcXCgxL2VcXCkgZGVjYXkgcnVsZS4iLCJEIjoiXFwoZVxcKSBpcyB0aGUgZ3Jvd3RoIGZhY3RvciBmb3IgdGhlIG9wcG9zaXRlIGRpcmVjdGlvbiwgbm90IHRoZSBkZWNheSB2YWx1ZSBoZXJlLiJ9LCJoaW50IjoiTWVtb3JpemUgdGhlIGJlbmNobWFyazogb25lIHRpbWUgY29uc3RhbnQgbWVhbnMgMzclIHJlbWFpbnMuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImdlbmVyYXRlX2ltYWdlIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJzdWNjZXNzaXZlX3NrZXRjaF9wb2ludHMiLCJsYWJlbCI6IlVzZSByZXBlYXRlZCAxL2UgZHJvcHMgdG8gbWFyayBza2V0Y2ggcG9pbnRzIiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IlNrZXRjaGluZyBcXCh4KHQpID0gZV57LTJ0fVxcKSBxdWlja2x5LCBsaXN0IHRoZSB2YWx1ZXMgYXQgXFwodCA9IDBcXCksIFxcKHQgPSAwLjVcXCksIGFuZCBcXCh0ID0gMVxcKS4iLCJpZGVhbF9hbnN3ZXIiOiJcXCh4KDApID0gMVxcKSwgXFwoeCgwLjUpID0gMS9lIFxcYXBwcm94IDAuMzdcXCksIFxcKHgoMSkgPSAxL2VeMiBcXGFwcHJveCAwLjEzNVxcKS4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IGlkZW50aWZ5IHRoZSB0aW1lIGNvbnN0YW50IGFzIDAuNSIsIk11c3Qgc3RhdGUgXFwoeCgwKSA9IDFcXCkiLCJNdXN0IHN0YXRlIFxcKHgoMC41KSA9IDEvZVxcKSBvciBhcHByb3hpbWF0ZWx5IDAuMzciLCJNdXN0IHN0YXRlIFxcKHgoMSkgPSAxL2VeMlxcKSBvciBhcHByb3hpbWF0ZWx5IDAuMTM1Il0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCBjYW4gY29udmVydCB0aGUgdGltZS1jb25zdGFudCBydWxlIGludG8gYWN0dWFsIHNrZXRjaCBwb2ludHMuIiwiaGludCI6IkZyb20gXFwodCA9IDBcXCkgdG8gXFwodCA9IDAuNVxcKSBpcyBvbmUgdGltZSBjb25zdGFudDsgZnJvbSBcXCh0ID0gMC41XFwpIHRvIFxcKHQgPSAxXFwpIGlzIGFub3RoZXIuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfV19" style="display:none;"></div>%%KC_END%%
