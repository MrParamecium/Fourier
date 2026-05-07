%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJUaGlzIHNlY3Rpb24gaXMgaGlnaGx5IHZpc3VhbCBhbmQgZXhhbS1vcmllbnRlZC4gVGhlIHRleHRib29rIGFscmVhZHkgcHJvdmlkZXMgYSBkaXJlY3RseSByZWxldmFudCBwaGFzb3IgZmlndXJlIGZvciBhZGRpdGlvbiBvZiBzaW51c29pZHMsIGJ1dCBhIGNsZWFuZXIgZ2VuZXJhdGVkIGRpYWdyYW0gaXMgYWxzbyB1c2VmdWwgZm9yIGZhc3QgcGF0dGVybiByZWNvZ25pdGlvbiBvZiB0aGUgY29lZmZpY2llbnQtdG8tcGhhc29yIG1hcHBpbmcgYSBjb3MgKyBiIHNpbiAtPiBob3Jpem9udGFsIHBsdXMgdmVydGljYWwgcGhhc29yIC0+IHJlc3VsdGFudCBDIGF0IGFuZ2xlIHRoZXRhLiIsImNyYW0iOiJVc2Ugb25lIHRleHRib29rIHBoYXNvciBmaWd1cmUgdG8gYW5jaG9yIHRoZSBleGFjdCBleGFtIHBhdHRlcm4sIHRoZW4gb25lIGNsZWFuIGdlbmVyYXRlZCB2aXN1YWwgdG8gc2hvdyB0aGUgZmFzdGVzdCByZWFkLW9mZiBydWxlOiBhIGlzIGhvcml6b250YWwsIGIgc2luIGJlY29tZXMgdmVydGljYWwgYXQgLTkwIGRlZ3JlZXMsIHRoZW4gcmVzdWx0YW50IGdpdmVzIEMgYW5kIHRoZXRhLiIsInN0YW5kYXJkIjoiVXNlIHRoZSB0ZXh0Ym9vayBmaWd1cmUgdG8gY29ubmVjdCB0aGUgZXhwbGFuYXRpb24gdG8gdGhlIHNvdXJjZSBtYXRlcmlhbCwgYW5kIHRoZSBnZW5lcmF0ZWQgZGlhZ3JhbSB0byBtYWtlIHRoZSBjb2VmZmljaWVudC10by1yZXN1bHQgbWFwcGluZyBlYXNpZXIgdG8gZm9sbG93IHN0ZXAgYnkgc3RlcC4iLCJ0b3Bfc2NvcmUiOiJVc2UgdmlzdWFscyB0byBzdHJlc3MgcXVhZHJhbnQgaGFuZGxpbmcsIHNpZ24gY29udmVudGlvbnMsIGFsdGVybmF0aXZlIGVxdWl2YWxlbnQgcGhhc2UgZm9ybXMsIGFuZCB0aGUgdHJhcCB0aGF0IHRhbiBpbnZlcnNlIGFsb25lIGNhbiBnaXZlIHRoZSB3cm9uZyBhbmdsZS4ifQ==" style="display:none;"></div>%%KC_END%%
# Addition of Sinusoids

> **Objective:** Rewrite two same-frequency sinusoids as one single cosine — the core exam task for this section.

The pattern to recognize instantly: 

$$x(t) = a\cos(\omega_0 t) + b\sin(\omega_0 t)$$

This always collapses into one cosine at the same frequency. The payoff is fast: amplitude is \(C = \sqrt{a^2 + b^2}\), and phase \(\theta\) comes from the angle of the complex number \(a - jb\). Memorize those two facts and you own this question type.

**Main trap:** Your calculator's \(\tan^{-1}\) returns only a reference angle. It can silently give you the wrong quadrant. Always verify the quadrant using the signs of \(a\) and \(-b\) before writing your final answer.

## 1. Fast Conversion Rule

Whenever two sinusoids share the same frequency \(\omega_0\), they combine into a single cosine at that same frequency. The symbols map directly:

- \(a\) — coefficient of the cosine term
- \(b\) — coefficient of the sine term
- \(C\) — new amplitude of the combined sinusoid
- \(\theta\) — new phase angle

### EXAM SOLVE ORDER

1. **Identify** \(a\) and \(b\) from the expression.
2. **Compute** \(C = \sqrt{a^2 + b^2}\).
3. **Find** \(\theta\) carefully — check the quadrant, do not trust \(\tan^{-1}\) alone.

No derivation needed on an exam. Just apply the pattern.

$$a\cos(\omega_0 t) + b\sin(\omega_0 t) = C\cos(\omega_0 t + \theta)$$
*This is the standard exam conversion form: two same-frequency sinusoids on the left collapse into one cosine with the same frequency \(\omega_0\) on the right.*

$$C = \sqrt{a^2+b^2}, \qquad \theta = \tan^{-1}\!\left(\frac{-b}{a}\right)$$
*\(C\) is the magnitude (length) of the phasor, computed as the Pythagorean length of the complex number \(a - jb\); \(\theta\) is the angle of that same complex number. **Warning:** \(\tan^{-1}(-b/a)\) alone may return the wrong quadrant — always check the signs of \(a\) and \(-b\) to confirm which quadrant the phasor actually lies in.*

## 2. How to Read the Phase Fast Without Losing Points

The sine term hides a phase shift: \(b\sin(\omega_0 t) = b\cos(\omega_0 t - \pi/2)\). This means the sine term contributes a phasor pointing **downward** (at \(-90°\)) before any sign from \(b\) is applied.

### PRACTICAL RULE

Form the complex number \(a - jb\). Then:
- \(C = |a - jb|\) — read off the magnitude
- \(\theta = \angle(a - jb)\) — read off the angle

### TRAP LIST

1. **Wrong sign on \(b\):** The complex number is \(a - jb\), not \(a + jb\). A positive \(b\) gives a negative imaginary part.
2. **Wrong quadrant from \(\tan^{-1}\):** The calculator returns a value in \((-90°, 90°)\). If \(a < 0\), you are in the second or third quadrant — add or subtract \(180°\) as needed.
3. **Frequency must stay \(\omega_0\):** The combined sinusoid has the same frequency as the originals. Never change \(\omega_0\).

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="exam_pattern_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgdG8gbWVtb3JpemUgdGhlIGZhc3QgcGF0dGVybjogYSBpcyBob3Jpem9udGFsLCBiIG1hcHMgdG8gdmVydGljYWwgZG93bndhcmQgaW4gYSAtIGpiLCByZXN1bHRhbnQgZ2l2ZXMgQyBhbmQgdGhldGEuIiwic3RhbmRhcmQiOiJVc2UgdGhpcyB0byBjb25uZWN0IHRoZSBhbGdlYnJhIGZvcm11bGEgdG8gYSBzaW1wbGUgcGhhc29yIHRyaWFuZ2xlLiIsInRvcF9zY29yZSI6IlVzZSB0aGlzIHRvIGhpZ2hsaWdodCB0aGUgc2lnbiBjb252ZW50aW9uIGFuZCB3aHkgcXVhZHJhbnQgY2hlY2tpbmcgbWF0dGVycy4ifQ==" style="display:none;"></div>%%KC_END%%
*🎨 Phasor diagram for \(a\cos(\omega_0 t) + b\sin(\omega_0 t)\): the horizontal component is \(a\), the vertical component is \(-b\), and the resultant has magnitude \(C = \sqrt{a^2+b^2}\) at angle \(\theta\).*
![Illustration](/generated/gptimage2-1777215615885-7077.png)

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="example_support" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoZSB0ZXh0Ym9vayBwaGFzb3IgZXhhbXBsZSB0byByZWNvZ25pemUgdGhlIHN0YW5kYXJkIGV4YW0gc2V0dXAgaW5zdGFudGx5LiIsInN0YW5kYXJkIjoiVXNlIGl0IHRvIGNvbm5lY3QgdGhlIHdvcmtlZCBleGFtcGxlIHRvIHRoZSBwaGFzb3ItYWRkaXRpb24gbWV0aG9kLiIsInRvcF9zY29yZSI6IlVzZSBpdCB0byBjb21wYXJlIGEgZmlyc3QtcXVhZHJhbnQgYW5zd2VyIHdpdGggYSB0aGlyZC1xdWFkcmFudC1zdHlsZSBhbmdsZSBjYXNlIGFuZCByZWluZm9yY2UgcXVhZHJhbnQgY2FyZS4ifQ==" style="display:none;"></div>%%KC_END%%
![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*These textbook phasor diagrams show how the horizontal cosine part and vertical sine part combine into one resultant sinusoid with amplitude \(C\) and phase \(\theta\).*

## 3. One Worked Exam Pattern

Two mini-cases, compressed for speed:

**Case 1:** \(x(t) = \cos(\omega_0 t) - \sqrt{3}\sin(\omega_0 t)\)

- Identify: \(a = 1\), \(b = -\sqrt{3}\)
- Amplitude: \(C = \sqrt{1^2 + (\sqrt{3})^2} = \sqrt{1+3} = 2\)
- Phasor: \(a - jb = 1 - j(-\sqrt{3}) = 1 + j\sqrt{3}\), which is in the **first quadrant** at \(\theta = \tan^{-1}(\sqrt{3}/1) = 60°\)
- **Answer:** \(x(t) = 2\cos(\omega_0 t + 60°)\)

**Case 2:** \(x(t) = -3\cos(\omega_0 t) + 4\sin(\omega_0 t)\)

- Identify: \(a = -3\), \(b = 4\)
- Amplitude: \(C = \sqrt{9+16} = 5\)
- Phasor: \(a - jb = -3 - j4\), which is in the **third quadrant** — \(\tan^{-1}(4/3) = 53.1°\) is only the reference angle, so \(\theta = -(180° - 53.1°) = -126.9°\)
- **Answer:** \(x(t) = 5\cos(\omega_0 t - 126.9°)\)

### SPEED TIP

If the signs look mixed, trust the phasor quadrant check before finalizing \(\theta\). Never write down the \(\tan^{-1}\) output without verifying which quadrant \(a - jb\) actually sits in.

---
**📌 Key Takeaways**
- Same-frequency sinusoids always combine into one cosine: \(a\cos(\omega_0 t) + b\sin(\omega_0 t) = C\cos(\omega_0 t + \theta)\)
- Amplitude is \(C = \sqrt{a^2 + b^2}\); compute it from the phasor length of \(a - jb\)
- Phase \(\theta\) requires a quadrant check — \(\tan^{-1}\) alone can return the wrong angle

*In the next section we will keep using sinusoid and phasor ideas to solve signal problems faster.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InNpbmdsZV9zaW51c29pZF9wYXR0ZXJuIiwibGFiZWwiOiJSZWNvZ25pemUgdGhlIHN0YW5kYXJkIGFkZGl0aW9uLW9mLXNpbnVzb2lkcyBmb3JtIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBleHByZXNzaW9uIGNhbiBiZSByZXdyaXR0ZW4gZGlyZWN0bHkgYXMgYSBzaW5nbGUgY29zaW5lIHVzaW5nIHRoaXMgc2VjdGlvbidzIHJ1bGU/Iiwib3B0aW9ucyI6WyJBLiBcXCgyXFxjb3MoM3QpICsgNVxcc2luKDN0KVxcKSIsIkIuIFxcKDJcXGNvcygzdCkgKyA1XFxzaW4oNHQpXFwpIiwiQy4gXFwoMlxcY29zKDN0KSArIDVcXGNvcyg0dClcXCkiLCJELiBcXCgyXFxzaW4oM3QpICsgNVxcc2luKDR0KVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlRoZSBydWxlIGFwcGxpZXMgd2hlbiB0aGUgc2ludXNvaWRzIGhhdmUgdGhlIHNhbWUgZnJlcXVlbmN5LiBJbiBBLCBib3RoIHRlcm1zIHVzZSBcXCgzdFxcKSwgc28gdGhleSBjb21iaW5lIGludG8gb25lIHNpbnVzb2lkIG9mIHRoYXQgc2FtZSBmcmVxdWVuY3kuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhlIGZyZXF1ZW5jaWVzIGRpZmZlcjogXFwoM1xcKSBhbmQgXFwoNFxcKS4iLCJDIjoiRXZlbiB0aG91Z2ggYm90aCBhcmUgY29zaW5lIHRlcm1zLCB0aGUgZnJlcXVlbmNpZXMgZGlmZmVyOiBcXCgzXFwpIGFuZCBcXCg0XFwpLiIsIkQiOiJUaGUgZnJlcXVlbmNpZXMgZGlmZmVyOiBcXCgzXFwpIGFuZCBcXCg0XFwpLiJ9LCJoaW50IjoiQ2hlY2sgd2hldGhlciB0aGUgYW5ndWxhciBmcmVxdWVuY3kgaW5zaWRlIGVhY2ggc2ludXNvaWQgbWF0Y2hlcyBleGFjdGx5LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSWYgXFwoeCh0KSA9IGFcXGNvcyhcXG9tZWdhXzAgdCkgKyBiXFxzaW4oXFxvbWVnYV8wIHQpXFwpIGlzIHJld3JpdHRlbiBhcyBcXChDXFxjb3MoXFxvbWVnYV8wIHQgKyBcXHRoZXRhKVxcKSwgd2hpY2ggcXVhbnRpdHkgbXVzdCBzdGF5IHVuY2hhbmdlZD8iLCJvcHRpb25zIjpbIkEuIE9ubHkgdGhlIGFtcGxpdHVkZSIsIkIuIE9ubHkgdGhlIHBoYXNlIiwiQy4gVGhlIGZyZXF1ZW5jeSBcXChcXG9tZWdhXzBcXCkiLCJELiBUaGUgY29lZmZpY2llbnRzIFxcKGFcXCkgYW5kIFxcKGJcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJBZGRpbmcgc2FtZS1mcmVxdWVuY3kgc2ludXNvaWRzIHByb2R1Y2VzIGEgc2luZ2xlIHNpbnVzb2lkIHdpdGggdGhlIHNhbWUgZnJlcXVlbmN5LiBPbmx5IGFtcGxpdHVkZSBhbmQgcGhhc2UgY2hhbmdlIGZvcm0uIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlIGFtcGxpdHVkZSB1c3VhbGx5IGNoYW5nZXMgdG8gXFwoQ1xcKS4iLCJCIjoiVGhlIHBoYXNlIHVzdWFsbHkgYmVjb21lcyBcXChcXHRoZXRhXFwpLiIsIkQiOiJcXChhXFwpIGFuZCBcXChiXFwpIGFyZSByZXBsYWNlZCBieSBcXChDXFwpIGFuZCBcXChcXHRoZXRhXFwpIGluIHRoZSBuZXcgZm9ybS4ifSwiaGludCI6IkFzayB3aGF0IHByb3BlcnR5IHRoZSBzZWN0aW9uIHNheXMgaXMgcHJlc2VydmVkIGFmdGVyIGNvbWJpbmF0aW9uLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiY29tcHV0ZV9hbXBsaXR1ZGVfcGhhc2UiLCJsYWJlbCI6IkNvbXB1dGUgQyBhbmQgdGhldGEgZnJvbSBhIGFuZCBiIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgXFwoeCh0KSA9IDNcXGNvcyhcXG9tZWdhXzAgdCkgKyA0XFxzaW4oXFxvbWVnYV8wIHQpXFwpLCB3aGF0IGlzIHRoZSBhbXBsaXR1ZGUgXFwoQ1xcKSBpbiB0aGUgZm9ybSBcXChDXFxjb3MoXFxvbWVnYV8wIHQgKyBcXHRoZXRhKVxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKDFcXCkiLCJCLiBcXCg1XFwpIiwiQy4gXFwoN1xcKSIsIkQuIFxcKFxcc3FydHs3fVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlVzZSBcXChDID0gXFxzcXJ0e2FeMiArIGJeMn0gPSBcXHNxcnR7M14yICsgNF4yfSA9IFxcc3FydHs5ICsgMTZ9ID0gXFxzcXJ0ezI1fSA9IDVcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBpZ25vcmVzIHRoZSBtYWduaXR1ZGUgZm9ybXVsYSBjb21wbGV0ZWx5LiIsIkMiOiJUaGlzIGFkZHMgY29lZmZpY2llbnRzIGluc3RlYWQgb2YgdXNpbmcgcm9vdC1zdW0tc3F1YXJlLiIsIkQiOiJUaGlzIHVzZXMgXFwoMyArIDQgPSA3XFwpIHVuZGVyIHRoZSBzcXVhcmUgcm9vdCwgd2hpY2ggaXMgaW5jb3JyZWN0LiJ9LCJoaW50IjoiVXNlIHRoZSBwaGFzb3IgbGVuZ3RoIGZvcm11bGEgXFwoQyA9IFxcc3FydHthXjIgKyBiXjJ9XFwpLCBub3Qgc2ltcGxlIGFkZGl0aW9uLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciBcXCh4KHQpID0gXFxjb3MoXFxvbWVnYV8wIHQpIC0gXFxzcXJ0ezN9XFxzaW4oXFxvbWVnYV8wIHQpXFwpLCB3aGljaCBzaW5nbGUtc2ludXNvaWQgZm9ybSBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gXFwoMlxcY29zKFxcb21lZ2FfMCB0ICsgNjDCsClcXCkiLCJCLiBcXCgyXFxjb3MoXFxvbWVnYV8wIHQgLSA2MMKwKVxcKSIsIkMuIFxcKFxcc3FydHsyfVxcY29zKFxcb21lZ2FfMCB0ICsgNDXCsClcXCkiLCJELiBcXCgyXFxzaW4oXFxvbWVnYV8wIHQgKyA2MMKwKVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IkhlcmUgXFwoYSA9IDFcXCkgYW5kIFxcKGIgPSAtXFxzcXJ0ezN9XFwpLiBUaGVuIFxcKEMgPSBcXHNxcnR7MSArIDN9ID0gMlxcKSBhbmQgXFwoXFx0aGV0YSA9IFxcdGFuXnstMX0oLWIvYSkgPSBcXHRhbl57LTF9KFxcc3FydHszfS8xKSA9IDYwwrBcXCkuIFRoZSBwaGFzb3IgXFwoYSAtIGpiID0gMSArIGpcXHNxcnR7M31cXCkgaXMgaW4gdGhlIGZpcnN0IHF1YWRyYW50LCBjb25maXJtaW5nIFxcKFxcdGhldGEgPSArNjDCsFxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGUgc2lnbiBvZiBcXChcXHRoZXRhXFwpIGlzIHdyb25nIGZvciB0aGlzIGNvZWZmaWNpZW50IHBhaXI7IHRoZSBwaGFzb3IgXFwoMSArIGpcXHNxcnR7M31cXCkgaXMgaW4gdGhlIGZpcnN0IHF1YWRyYW50LiIsIkMiOiJUaGUgYW1wbGl0dWRlIGlzIG5vdCBcXChcXHNxcnR7Mn1cXCkgYW5kIHRoZSBhbmdsZSBpcyBub3QgXFwoNDXCsFxcKS4iLCJEIjoiVGhlIHN0YW5kYXJkIHRhcmdldCBmb3JtIGlzIGEgc2luZ2xlIGNvc2luZTsgdGhpcyBvcHRpb24gYWxzbyBkb2VzIG5vdCBtYXRjaCB0aGUgY29lZmZpY2llbnRzLiJ9LCJoaW50IjoiU3Vic3RpdHV0ZSBcXChhID0gMVxcKSBhbmQgXFwoYiA9IC1cXHNxcnR7M31cXCkgY2FyZWZ1bGx5LCB0aGVuIGNoZWNrIHdoaWNoIHF1YWRyYW50IFxcKGEgLSBqYlxcKSBsaWVzIGluLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoicXVhZHJhbnRfdHJhcCIsImxhYmVsIjoiQXZvaWQgdGFuIGludmVyc2UgcXVhZHJhbnQgbWlzdGFrZXMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciBcXCh4KHQpID0gLTNcXGNvcyhcXG9tZWdhXzAgdCkgKyA0XFxzaW4oXFxvbWVnYV8wIHQpXFwpLCB3aGljaCBwaGFzZSBhbmdsZSBcXChcXHRoZXRhXFwpIGlzIGNvcnJlY3QgaW4gXFwoQ1xcY29zKFxcb21lZ2FfMCB0ICsgXFx0aGV0YSlcXCk/Iiwib3B0aW9ucyI6WyJBLiBcXCg1My4xwrBcXCkiLCJCLiBcXCgtNTMuMcKwXFwpIiwiQy4gXFwoLTEyNi45wrBcXCkiLCJELiBcXCgxMjYuOcKwXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiRm9ybSBcXChhIC0gamIgPSAtMyAtIGo0XFwpLiBUaGlzIHBoYXNvciBsaWVzIGluIHRoZSB0aGlyZCBxdWFkcmFudCAoYm90aCByZWFsIGFuZCBpbWFnaW5hcnkgcGFydHMgbmVnYXRpdmUpLiBUaGUgcmVmZXJlbmNlIGFuZ2xlIGlzIFxcKFxcdGFuXnstMX0oNC8zKSA9IDUzLjHCsFxcKSwgYnV0IHRoZSBjb3JyZWN0IGFuZ2xlIG1lYXN1cmVkIGZyb20gdGhlIHBvc2l0aXZlIHJlYWwgYXhpcyBpcyBcXCgtKDE4MMKwIC0gNTMuMcKwKSA9IC0xMjYuOcKwXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgaXMgb25seSB0aGUgcmVmZXJlbmNlIGFuZ2xlLCBub3QgdGhlIGNvcnJlY3QgcXVhZHJhbnQgYW5nbGUuIiwiQiI6IlRoaXMgaGFzIHRoZSB3cm9uZyBxdWFkcmFudDsgXFwoLTUzLjHCsFxcKSB3b3VsZCBwbGFjZSB0aGUgcGhhc29yIGluIHRoZSBmb3VydGggcXVhZHJhbnQuIiwiRCI6IlRoaXMgaXMgaW4gdGhlIHNlY29uZCBxdWFkcmFudCwgd2hpY2ggZG9lcyBub3QgbWF0Y2ggdGhlIHNpZ25zIG9mIFxcKGEgLSBqYiA9IC0zIC0gajRcXCkuIn0sImhpbnQiOiJDaGVjayB0aGUgc2lnbnMgb2YgXFwoYVxcKSBhbmQgXFwoLWJcXCkgb24gdGhlIHBoYXNvciBheGVzIGJlZm9yZSB0cnVzdGluZyBcXChcXHRhbl57LTF9XFwpLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJnZW5lcmF0ZWRfaW1hZ2UiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkEgc3R1ZGVudCBjb21wdXRlcyBcXChcXHRoZXRhID0gXFx0YW5eey0xfSgoLWIpL2EpXFwpIGFuZCBnZXRzIFxcKDUzLjHCsFxcKSBmb3IgXFwoeCh0KSA9IC0zXFxjb3MoXFxvbWVnYV8wIHQpICsgNFxcc2luKFxcb21lZ2FfMCB0KVxcKS4gRXhwbGFpbiBicmllZmx5IHdoeSB0aGF0IGFuc3dlciBpcyBpbmNvbXBsZXRlIG9yIHdyb25nLiIsImlkZWFsX2Fuc3dlciI6IkJlY2F1c2UgXFwoXFx0YW5eey0xfVxcKSBjYW4gcmV0dXJuIG9ubHkgYSByZWZlcmVuY2UgYW5nbGUgdW5sZXNzIHRoZSBxdWFkcmFudCBpcyBjaGVja2VkLiBIZXJlIFxcKGEgPSAtM1xcKSBhbmQgXFwoLWIgPSAtNFxcKSwgc28gdGhlIHBoYXNvciBcXChhIC0gamIgPSAtMyAtIGo0XFwpIGxpZXMgaW4gdGhlIHRoaXJkIHF1YWRyYW50LCBnaXZpbmcgXFwoXFx0aGV0YSA9IC0xMjYuOcKwXFwpLCBub3QgXFwoNTMuMcKwXFwpLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3QgbWVudGlvbiB0aGF0IFxcKFxcdGFuXnstMX1cXCkgYWxvbmUgY2FuIG1pc3MgdGhlIHF1YWRyYW50IiwiTXVzdCB1c2UgdGhlIHNpZ25zIG9mIFxcKGFcXCkgYW5kIFxcKC1iXFwpIG9yIHRoZSBjb21wbGV4IG51bWJlciBcXChhIC0gamJcXCkiLCJNdXN0IHN0YXRlIHRoZSBjb3JyZWN0ZWQgYW5nbGUgYXMgXFwoLTEyNi45wrBcXCkgb3IgYW4gZXF1aXZhbGVudCBhbmdsZSJdLCJleHBsYW5hdGlvbiI6IlRoaXMgdmVyaWZpZXMgcmVhbCB1bmRlcnN0YW5kaW5nIG9mIHRoZSBtb3N0IGNvbW1vbiBleGFtIHRyYXAgaW4gdGhpcyBzZWN0aW9uLiIsImhpbnQiOiJEbyBub3Qgc3RvcCBhdCB0aGUgY2FsY3VsYXRvciBvdXRwdXQ7IGxvY2F0ZSB0aGUgcGhhc29yIFxcKGEgLSBqYlxcKSBvbiB0aGUgY29tcGxleCBwbGFuZSBmaXJzdC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX1dfQ==" style="display:none;"></div>%%KC_END%%
