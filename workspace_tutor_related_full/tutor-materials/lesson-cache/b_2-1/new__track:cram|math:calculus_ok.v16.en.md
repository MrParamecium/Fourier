%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJUaGlzIHNlY3Rpb24gaXMgdGV4dGJvb2stZmlyc3QgYmVjYXVzZSB0aGUgT0NSIGV4cGxpY2l0bHkgdGVhY2hlcyBwaGFzb3IgYWRkaXRpb24gYW5kIGdpdmVzIGEgdGV4dGJvb2sgcGhhc29yIGZpZ3VyZSwgYnV0IGEgY2xlYW4gbWF0cGxvdGxpYiBkaWFncmFtIGlzIGFsc28gdmFsdWFibGUgZm9yIGZhc3QgZXhhbSByZWNvZ25pdGlvbiBhbmQgdHJhcCBhdm9pZGFuY2UuIFRoZSBzdHJvbmdlc3QgcGxhbiBpcyB0byBhbmNob3IgdGhlIG1ldGhvZCBpbiB0aGUgdGV4dGJvb2sgZmlndXJlLCB0aGVuIHJlaW5mb3JjZSBpdCB3aXRoIGEgY2xlYW5lciBnZW5lcmF0ZWQgY29tcGFyaXNvbiBkaWFncmFtIHRpZWQgZGlyZWN0bHkgdG8gdGhlIHdvcmtlZCBleGFtcGxlcy4iLCJjcmFtIjoiVXNlIHZpc3VhbHMgdG8gaGVscCB0aGUgc3R1ZGVudCBpbnN0YW50bHkgbWFwIGEgY29zIHRlcm0gdG8gdGhlIGhvcml6b250YWwgYXhpcywgYSBzaW4gdGVybSB0byB0aGUgdmVydGljYWwgYXhpcyBzaGlmdGVkIGJ5IC05MCBkZWdyZWVzLCBhbmQgdGhlIHJlc3VsdCB0byBvbmUgcmVzdWx0YW50IHBoYXNvci4iLCJzdGFuZGFyZCI6IlVzZSB2aXN1YWxzIHRvIGNsYXJpZnkgd2h5IGEgY29zIHRlcm0gYW5kIGEgc2luIHRlcm0gb2YgdGhlIHNhbWUgZnJlcXVlbmN5IGNvbWJpbmUgaW50byBvbmUgc2ludXNvaWQgd2l0aCBhIG5ldyBhbXBsaXR1ZGUgYW5kIHBoYXNlLiIsInRvcF9zY29yZSI6IlVzZSB2aXN1YWxzIHRvIGV4cG9zZSBxdWFkcmFudCBtaXN0YWtlcywgc2lnbiBmbGlwcywgYW5kIGVxdWl2YWxlbnQgcGhhc2UgZm9ybXMgc3VjaCBhcyBhZGRpbmcgb3Igc3VidHJhY3RpbmcgMTgwIGRlZ3JlZXMuIn0=" style="display:none;"></div>%%KC_END%%
# B.2 Addition of Sinusoids

> **Objective:** Rewrite a sum of same-frequency sine and cosine terms as a single cosine with a new amplitude and phase.

---

A very common exam question gives you a cosine term plus a sine term at the **same frequency** and asks you to rewrite the sum as one sinusoid. The payoff is fast once you memorize the target form:

$$a\cos(\omega_0 t) + b\sin(\omega_0 t) = C\cos(\omega_0 t + \theta)$$

where \(C\) comes from a right-triangle magnitude and \(\theta\) from the phasor angle.

### TWO EXAM TRAPS TO KNOW NOW

1. **Wrong sign in \(\theta\):** the formula uses \(-b\), not \(b\).
2. **Wrong quadrant:** when \(a\) or \(b\) is negative, a raw arctangent gives the wrong angle.

Train yourself to recognize a horizontal-plus-vertical phasor addition immediately — that mental picture is the fastest path to the correct answer.

$$a\cos(\omega_0 t)+b\sin(\omega_0 t)=C\cos(\omega_0 t+\theta)$$
*Any sum of sine and cosine terms sharing the same frequency \(\omega_0\) can always be compressed into a single cosine with a new amplitude \(C\) and a new phase \(\theta\).*

## 1. The Fast Conversion Rule

Here is the solving recipe — follow these steps in order:

1. **Identify \(a\) and \(b\):** read the coefficients directly from \(a\cos(\omega_0 t) + b\sin(\omega_0 t)\).
2. **Compute the amplitude:** \(C = \sqrt{a^2 + b^2}\).
3. **Compute the angle:** \(\theta = \tan^{-1}\!\left(\dfrac{-b}{a}\right)\).
4. **Fix the quadrant:** the phasor is \(a - jb\), so its real part is \(a\) and its imaginary part is \(-b\). Check the signs of both to place \(\theta\) in the correct quadrant.

### COMMON MISTAKE

Many students plug \(b\) directly into the arctangent instead of \(-b\). That sign flip changes the quadrant and gives the wrong phase every time.

> **Rule:** always form the phasor \(a - jb\) first, then read off the angle.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgZmlndXJlIHRvIGRyaWxsIHRoZSBmYXN0ZXN0IHBhdHRlcm46IGhvcml6b250YWwgcGhhc29yIGZyb20gYSBjb3MgdGVybSwgdmVydGljYWwgcGhhc29yIGZyb20gYSBzaW4gdGVybSwgcmVzdWx0YW50IGdpdmVzIEMgYW5kIHRoZXRhLiIsInN0YW5kYXJkIjoiVXNlIHRoaXMgZmlndXJlIHRvIGV4cGxhaW4gaG93IHRoZSB0d28gY29tcG9uZW50IHBoYXNvcnMgYWRkIHZlY3RvcmlhbGx5IGludG8gb25lIHJlc3VsdGFudCBwaGFzb3IuIiwidG9wX3Njb3JlIjoiVXNlIHRoaXMgZmlndXJlIHRvIGhpZ2hsaWdodCB3aHkgdGhlIHNpZ24gb2YgdGhlIHZlcnRpY2FsIGNvbXBvbmVudCBjaGFuZ2VzIHRoZSBxdWFkcmFudCBhbmQgdGhlcmVmb3JlIGNoYW5nZXMgdGhldGEuIn0=" style="display:none;"></div>%%KC_END%%
![unknown](/figures/page-018-unknown-1.png)
*This phasor diagram is the visual shortcut behind rewriting a cosine term plus a sine term as a single sinusoid: the resultant vector gives both \(C\) and \(\theta\) at a glance.*

$$C=\sqrt{a^2+b^2},\qquad \theta=\tan^{-1}\!\left(\frac{-b}{a}\right)$$
*\(C\) is the length of the resultant phasor and \(\theta\) is the angle of the complex number \(a - jb\), so after computing the arctangent you must verify the quadrant by checking the signs of \(a\) and \(-b\) separately.*

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="trap_exposure" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgZGlhZ3JhbSB0byBtYWtlIHRoZSBzaWduIHBhdHRlcm4gYW5kIHF1YWRyYW50IGNoZWNrIGluc3RhbnRseSB2aXNpYmxlIGJlZm9yZSB0aGUgc3R1ZGVudCBjb21wdXRlcyB0aGV0YS4iLCJzdGFuZGFyZCI6IlVzZSB0aGlzIGRpYWdyYW0gdG8gY29ubmVjdCB0aGUgZm9ybXVsYSBDID0gc3FydChhXjIrYl4yKSB0byB2ZWN0b3IgYWRkaXRpb24gb24gdGhlIGF4ZXMuIiwidG9wX3Njb3JlIjoiVXNlIHRoaXMgZGlhZ3JhbSB0byBjb21wYXJlIGNvcnJlY3QgYW5nbGUgcGxhY2VtZW50IGFnYWluc3QgdGhlIGNvbW1vbiB3cm9uZy1hbmdsZSBpbnRlcnByZXRhdGlvbi4ifQ==" style="display:none;"></div>%%KC_END%%
*📊 Side-by-side phasor diagrams for the two worked examples. Panel (a): \(a=1, b=-\sqrt{3}\) gives phasor \(1 + j\sqrt{3}\), so \(C=2\) and \(\theta=60°\). Panel (b): \(a=-3, b=4\) gives phasor \(-3 - j4\) in the third quadrant, so \(C=5\) and \(\theta \approx -126.9°\) — not the \(+53.1°\) a raw arctangent would suggest.*
![Chart](/generated/fig-1777189345077-u428g881.png)

## 2. How to Solve the Textbook Examples Fast

### EXAMPLE (a)

Given \(x(t) = \cos(\omega_0 t) - \sqrt{3}\sin(\omega_0 t)\):

- Read off: \(a = 1\), \(b = -\sqrt{3}\).
- Amplitude: \(C = \sqrt{1^2 + (\sqrt{3})^2} = \sqrt{4} = 2\).
- Angle: \(\theta = \tan^{-1}\!\left(\dfrac{-b}{a}\right) = \tan^{-1}\!\left(\dfrac{\sqrt{3}}{1}\right) = 60°\). Both \(a > 0\) and \(-b > 0\), so the phasor is in the first quadrant — no correction needed.
- **Result:** \(x(t) = 2\cos(\omega_0 t + 60°)\).

### EXAMPLE (b)

Given \(x(t) = -3\cos(\omega_0 t) + 4\sin(\omega_0 t)\):

- Read off: \(a = -3\), \(b = 4\).
- Amplitude: \(C = \sqrt{9 + 16} = 5\).
- Phasor coordinates: real part \(= a = -3\), imaginary part \(= -b = -4\). This lands in the **third quadrant**.
- A calculator gives \(\tan^{-1}(4/3) \approx 53.1°\) — that is the **wrong quadrant**. The correct angle is \(\theta \approx -126.9°\).
- **Result:** \(x(t) = 5\cos(\omega_0 t - 126.9°)\).

### FAST RECOGNITION RULE

> **Same frequency → combine into one sinusoid. Different frequencies → do not combine.**

---
**📌 Key Takeaways**
- Same-frequency cosine and sine terms always combine into one cosine: \(a\cos(\omega_0 t)+b\sin(\omega_0 t)=C\cos(\omega_0 t+\theta)\).
- Amplitude is \(C=\sqrt{a^2+b^2}\); never add the coefficients directly.
- Angle uses \(-b\), not \(b\), and the quadrant of \(a-jb\) must be verified — arctangent alone is not enough.

*In the next section we will keep using sinusoid representations to solve signal problems faster.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InNhbWVfZnJlcXVlbmN5X3NpbmdsZV9zaW51c29pZCIsImxhYmVsIjoiUmVjb2duaXplIHdoZW4gdGVybXMgY2FuIGJlIGNvbWJpbmVkIGludG8gb25lIHNpbnVzb2lkIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBleHByZXNzaW9uIGNhbiBiZSByZXdyaXR0ZW4gYXMgYSBzaW5nbGUgc2ludXNvaWQgdXNpbmcgdGhlIHJ1bGUgZnJvbSB0aGlzIHNlY3Rpb24/Iiwib3B0aW9ucyI6WyJBLiBcXCgyXFxjb3MoM3QpICsgNVxcc2luKDN0KVxcKSIsIkIuIFxcKDJcXGNvcygzdCkgKyA1XFxzaW4oNHQpXFwpIiwiQy4gXFwoMlxcY29zKDN0KSArIDVcXGNvcyg0dClcXCkiLCJELiBcXCgyXFxzaW4oM3QpICsgNVxcc2luKDR0KVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlRoZSBzZWN0aW9uJ3MgcnVsZSBhcHBsaWVzIHdoZW4gdGhlIHNpbnVzb2lkcyBoYXZlIHRoZSBzYW1lIGZyZXF1ZW5jeS4gT25seSBjaG9pY2UgQSBoYXMgYm90aCB0ZXJtcyBhdCBmcmVxdWVuY3kgXFwoM1xcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGUgZnJlcXVlbmNpZXMgYXJlIGRpZmZlcmVudCAoXFwoM1xcKSB2cyBcXCg0XFwpKSwgc28gdGhleSBkbyBub3QgY29sbGFwc2UgaW50byBvbmUgc2ludXNvaWQgb2YgdGhlIHNhbWUgZnJlcXVlbmN5LiIsIkMiOiJCb3RoIGFyZSBjb3NpbmVzLCBidXQgdGhlIGZyZXF1ZW5jaWVzIGFyZSBkaWZmZXJlbnQsIHNvIHRoZXkgZG8gbm90IGNvbWJpbmUgaW50byBvbmUgc2ludXNvaWQuIiwiRCI6IlRoZSBmcmVxdWVuY2llcyBhcmUgZGlmZmVyZW50LCBzbyBubyBzaW5nbGUgc2FtZS1mcmVxdWVuY3kgc2ludXNvaWQgY2FuIHJlcHJlc2VudCB0aGUgc3VtLiJ9LCJoaW50IjoiQ2hlY2sgdGhlIGZyZXF1ZW5jeSBvZiBlYWNoIHRlcm0gZmlyc3QgYmVmb3JlIGRvaW5nIGFueSBhbGdlYnJhLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2h5IGRvZXMgXFwoYVxcY29zKFxcb21lZ2FfMCB0KSArIGJcXHNpbihcXG9tZWdhXzAgdClcXCkgcmV3cml0ZSBhcyBvbmUgc2ludXNvaWQgb2YgdGhlIHNhbWUgZnJlcXVlbmN5PyIsIm9wdGlvbnMiOlsiQS4gQmVjYXVzZSBhbnkgdHdvIHRyaWcgdGVybXMgYWx3YXlzIGNvbWJpbmUiLCJCLiBCZWNhdXNlIGJvdGggdGVybXMgc2hhcmUgdGhlIHNhbWUgXFwoXFxvbWVnYV8wXFwpIGFuZCBkaWZmZXIgb25seSBpbiBhbXBsaXR1ZGUgYW5kIHBoYXNlIiwiQy4gQmVjYXVzZSBzaW5lIGFuZCBjb3NpbmUgYXJlIGlkZW50aWNhbCBmdW5jdGlvbnMiLCJELiBCZWNhdXNlIHRoZSByZXN1bHQgbXVzdCBhbHdheXMgYmUgYSBzaW5lLCBub3QgYSBjb3NpbmUiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJTYW1lIGZyZXF1ZW5jeSBpcyB0aGUga2V5IGNvbmRpdGlvbi4gVGhlIHN1bSBjaGFuZ2VzIGFtcGxpdHVkZSBhbmQgcGhhc2UsIGJ1dCBub3QgdGhlIGJhc2UgZnJlcXVlbmN5IFxcKFxcb21lZ2FfMFxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJEaWZmZXJlbnQgZnJlcXVlbmNpZXMgZ2VuZXJhbGx5IGRvIG5vdCBjb21iaW5lIGludG8gb25lIHNpbnVzb2lkLiIsIkMiOiJUaGV5IGFyZSBwaGFzZS1zaGlmdGVkIHJlbGF0aXZlcywgbm90IGlkZW50aWNhbCBmdW5jdGlvbnMuIiwiRCI6IlRoZSByZXN1bHQgY2FuIGJlIHdyaXR0ZW4gYXMgYSBjb3NpbmUgb3IgYW4gZXF1aXZhbGVudCBzaW5lIGZvcm0gZGVwZW5kaW5nIG9uIGNvbnZlbnRpb24uIn0sImhpbnQiOiJGb2N1cyBvbiB3aGF0IHN0YXlzIHVuY2hhbmdlZCBhZnRlciBjb21iaW5hdGlvbi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJhbXBsaXR1ZGVfcGhhc2VfZm9ybXVsYSIsImxhYmVsIjoiQ29tcHV0ZSBDIGFuZCB0aGV0YSBjb3JyZWN0bHkiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciBcXCh4KHQpID0gXFxjb3MoXFxvbWVnYV8wIHQpIC0gXFxzcXJ0ezN9XFxzaW4oXFxvbWVnYV8wIHQpXFwpLCB3aGF0IGlzIHRoZSBjb3JyZWN0IHNpbmdsZS1zaW51c29pZCBmb3JtPyIsIm9wdGlvbnMiOlsiQS4gXFwoMlxcY29zKFxcb21lZ2FfMCB0IC0gNjDCsClcXCkiLCJCLiBcXCgyXFxjb3MoXFxvbWVnYV8wIHQgKyA2MMKwKVxcKSIsIkMuIFxcKDJcXGNvcyhcXG9tZWdhXzAgdCArIDMwwrApXFwpIiwiRC4gXFwoXFxzcXJ0ezJ9XFxjb3MoXFxvbWVnYV8wIHQgKyA2MMKwKVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkhlcmUgXFwoYT0xXFwpIGFuZCBcXChiPS1cXHNxcnR7M31cXCksIHNvIFxcKEM9XFxzcXJ0ezErM309MlxcKSBhbmQgXFwoXFx0aGV0YT1cXHRhbl57LTF9KC1iL2EpPVxcdGFuXnstMX0oXFxzcXJ0ezN9KT02MMKwXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgdXNlcyB0aGUgd3Jvbmcgc2lnbiBmb3IgdGhlIHBoYXNlIOKAlCB0aGUgZm9ybXVsYSByZXF1aXJlcyBcXCgtYlxcKSwgbm90IFxcKGJcXCkuIiwiQyI6IlRoZSBhbXBsaXR1ZGUgaXMgY29ycmVjdCwgYnV0IFxcKDMwwrBcXCkgaXMgbm90IHRoZSBjb3JyZWN0IGFuZ2xlIGZvciB0aGlzIHBoYXNvci4iLCJEIjoiVGhlIGFtcGxpdHVkZSBcXChcXHNxcnR7Mn1cXCkgaXMgaW5jb3JyZWN0OyBcXChDPVxcc3FydHsxXjIrKFxcc3FydHszfSleMn09MlxcKS4ifSwiaGludCI6IlVzZSBcXCgtYlxcKSBpbiB0aGUgYW5nbGUgZm9ybXVsYSwgbm90IFxcKGJcXCkuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6InBoYXNvcl9kaWFncmFtIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AyX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgXFwoeCh0KSA9IC0zXFxjb3MoXFxvbWVnYV8wIHQpICsgNFxcc2luKFxcb21lZ2FfMCB0KVxcKSwgd2hpY2ggcGFpciBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gXFwoQz01LFxcIFxcdGhldGE9NTMuMcKwXFwpIiwiQi4gXFwoQz0xLFxcIFxcdGhldGE9LTEyNi45wrBcXCkiLCJDLiBcXChDPTUsXFwgXFx0aGV0YT0tMTI2LjnCsFxcKSIsIkQuIFxcKEM9NyxcXCBcXHRoZXRhPTEyNi45wrBcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJcXChDPVxcc3FydHsoLTMpXjIrNF4yfT01XFwpLiBGb3IgdGhlIHBoYXNvciBcXChhLWpiXFwpLCB0aGUgY29vcmRpbmF0ZXMgYXJlIFxcKCgtMywtNClcXCksIHdoaWNoIHBsYWNlIHRoZSBhbmdsZSBpbiB0aGUgdGhpcmQgcXVhZHJhbnQgYXQgYXBwcm94aW1hdGVseSBcXCgtMTI2LjnCsFxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJcXCg1My4xwrBcXCkgaXMgdGhlIHJhdyBhcmN0YW5nZW50IHJlc3VsdCBhbmQgaWdub3JlcyB0aGUgY29ycmVjdCBxdWFkcmFudCDigJQgdGhlIHBoYXNvciBsaWVzIGluIHRoZSB0aGlyZCBxdWFkcmFudCwgbm90IHRoZSBmaXJzdC4iLCJCIjoiVGhlIGFuZ2xlIGlzIGNvcnJlY3QsIGJ1dCBcXChDPTFcXCkgaXMgd3Jvbmc7IFxcKEM9XFxzcXJ0ezkrMTZ9PTVcXCkuIiwiRCI6Ik5laXRoZXIgXFwoQz03XFwpIG5vciBcXChcXHRoZXRhPTEyNi45wrBcXCkgaXMgY29ycmVjdCBmb3IgdGhpcyBwaGFzb3IuIn0sImhpbnQiOiJBZnRlciBjb21wdXRpbmcgdGhlIGFyY3RhbmdlbnQsIGNoZWNrIHRoZSBzaWducyBvZiBcXChhXFwpIGFuZCBcXCgtYlxcKSB0byBwbGFjZSB0aGUgYW5nbGUgaW4gdGhlIHJpZ2h0IHF1YWRyYW50LiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJwaGFzb3JfZGlhZ3JhbSIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiY29tbW9uX3RyYXBzX2VxdWl2YWxlbnRfZm9ybXMiLCJsYWJlbCI6IlNwb3Qgc2lnbiBtaXN0YWtlcyBhbmQgZXF1aXZhbGVudCBwaGFzZSBmb3JtcyIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgc3R1ZGVudCBjb21wdXRlcyBcXChcXHRoZXRhXFwpIGZvciBcXChhXFxjb3MoXFxvbWVnYV8wIHQpK2JcXHNpbihcXG9tZWdhXzAgdClcXCkgdXNpbmcgXFwoXFx0YW5eey0xfShiL2EpXFwpLiBXaGF0IGlzIHRoZSBpc3N1ZT8iLCJvcHRpb25zIjpbIkEuIE5vIGlzc3VlOyB0aGF0IGlzIGFsd2F5cyBjb3JyZWN0IiwiQi4gVGhlIGZvcm11bGEgc2hvdWxkIHVzZSBcXChcXHRhbl57LTF9KGEvYilcXCkiLCJDLiBUaGUgZm9ybXVsYSBzaG91bGQgdXNlIFxcKFxcdGFuXnstMX0oLWIvYSlcXCksIHRoZW4gdGhlIHF1YWRyYW50IG11c3Qgc3RpbGwgYmUgY2hlY2tlZCIsIkQuIFxcKFxcdGhldGFcXCkgc2hvdWxkIGJlIGZvdW5kIGZyb20gXFwoQ1xcKSBvbmx5Il0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiRnJvbSB0aGUgdGV4dGJvb2sgZm9ybSwgXFwoXFx0aGV0YVxcKSBjb21lcyBmcm9tIHRoZSBwaGFzb3IgXFwoYS1qYlxcKSwgc28gdGhlIHZlcnRpY2FsIGNvb3JkaW5hdGUgaXMgXFwoLWJcXCkuIFRoZSBtaW51cyBzaWduIG1hdHRlcnMsIGFuZCB0aGUgcXVhZHJhbnQgbXVzdCBzdGlsbCBiZSB2ZXJpZmllZCBhZnRlciB0YWtpbmcgdGhlIGFyY3RhbmdlbnQuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBtaXNzZXMgdGhlIHNpZ24gY29udmVudGlvbjogdGhlIHBoYXNvciBpcyBcXChhIC0gamJcXCksIG5vdCBcXChhICsgamJcXCkuIiwiQiI6IlN3YXBwaW5nIFxcKGFcXCkgYW5kIFxcKGJcXCkgaW4gdGhlIHJhdGlvIGlzIGluY29ycmVjdC4iLCJEIjoiXFwoQ1xcKSBnaXZlcyBvbmx5IHRoZSBtYWduaXR1ZGUsIG5vdCB0aGUgYW5nbGUuIn0sImhpbnQiOiJNYXRjaCBcXChcXHRoZXRhXFwpIHRvIHRoZSBhbmdsZSBvZiBcXChhIC0gamJcXCksIG5vdCBcXChhICsgamJcXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJJZiBcXCh4KHQpPTJcXGNvcyhcXG9tZWdhXzAgdCs2MMKwKVxcKSwgZ2l2ZSBvbmUgZXF1aXZhbGVudCBmb3JtIHdpdGggYSBuZWdhdGl2ZSBhbXBsaXR1ZGUgb3IgYSBwaGFzZSBzaGlmdGVkIGJ5IFxcKDE4MMKwXFwpLiIsImlkZWFsX2Fuc3dlciI6Ik9uZSBjb3JyZWN0IGVxdWl2YWxlbnQgZm9ybSBpcyBcXCgtMlxcY29zKFxcb21lZ2FfMCB0IC0gMTIwwrApXFwpLiBBbm90aGVyIGlzIFxcKC0yXFxjb3MoXFxvbWVnYV8wIHQgKyAyNDDCsClcXCkuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBwcmVzZXJ2ZSB0aGUgc2FtZSB3YXZlZm9ybSBleGFjdGx5IiwiTXVzdCB1c2UgYSBcXCgxODDCsFxcKSBwaGFzZSBzaGlmdCBpZiBjaGFuZ2luZyB0aGUgYW1wbGl0dWRlIHNpZ24iLCJBbnkgbWF0aGVtYXRpY2FsbHkgZXF1aXZhbGVudCBmb3JtIGVhcm5zIGZ1bGwgY3JlZGl0Il0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCBrbm93cyB0aGF0IGFkZGluZyBvciBzdWJ0cmFjdGluZyBcXCgxODDCsFxcKSB0byB0aGUgcGhhc2UgY2FuIGJlIHRyYWRlZCBhZ2FpbnN0IGEgc2lnbiBmbGlwIG9uIHRoZSBhbXBsaXR1ZGUuIiwiaGludCI6IlVzZSB0aGUgaWRlbnRpdHkgXFwoXFxjb3MoXFxhbHBoYSArIDE4MMKwKSA9IC1cXGNvcyhcXGFscGhhKVxcKS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
