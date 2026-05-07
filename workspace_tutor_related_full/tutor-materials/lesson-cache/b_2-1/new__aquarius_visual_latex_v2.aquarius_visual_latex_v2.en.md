%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJUaGlzIHNlY3Rpb24gaXMgYmVzdCB0YXVnaHQgdGhyb3VnaCBsb2NhbCBMYVRlWCBmb3JtdWxhcyBwbHVzIHRoZSB0ZXh0Ym9vayBwaGFzb3IgZGlhZ3JhbXMsIGJlY2F1c2Ugc3R1ZGVudHMgbXVzdCBjb25uZWN0IHRoZSBhbGdlYnJhaWMgY29lZmZpY2llbnRzIGEgYW5kIGIgdG8gYSBjb21wbGV4LXBsYW5lIHZlY3RvciB3aG9zZSBsZW5ndGggYW5kIGFuZ2xlIGJlY29tZSB0aGUgZmluYWwgc2ludXNvaWQuIFRoZSBhdmFpbGFibGUgdGV4dGJvb2sgZmlndXJlcyBhcmUgY2Fub25pY2FsIGZvciB0aGlzIGV4YWN0IG5vdGF0aW9uLCBzbyBkbyBub3QgcmVwbGFjZSB0aGVtIHdpdGggZ2VuZXJhdGVkIGltYWdlcy4iLCJjcmFtIjoiVXNlIHRoZSBwaGFzb3IgZGlhZ3JhbXMgdG8gcmVjb2duaXplIHRoZSBleGFtIHBhdHRlcm46IHNhbWUgZnJlcXVlbmN5LCBjb3NpbmUgcGx1cyBzaW5lLCBjb252ZXJ0IHRvIG9uZSBjb3NpbmUgd2l0aCBhbXBsaXR1ZGUgYW5kIHBoYXNlLiIsInN0YW5kYXJkIjoiVXNlIHRoZSBmb3JtdWxhcyBhbmQgRmlnLiBCLjcvQi44IHRvZ2V0aGVyOiBmaXJzdCByZWFkIGEgYW5kIGIsIHRoZW4gY29tcHV0ZSBDIGFuZCB0aGV0YSwgdGhlbiB2ZXJpZnkgdGhlIGRpcmVjdGlvbiB2aXN1YWxseS4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhlIHZpc3VhbCBxdWFkcmFudCBpbmZvcm1hdGlvbiB0byBjYXRjaCBwaGFzZS1zaWduIGVycm9ycyBhbmQgY2FsY3VsYXRvciBhcmN0YW5nZW50IG1pc3Rha2VzLiJ9" style="display:none;"></div>%%KC_END%%
# B.2-1 Addition of Sinusoids

> **Section Objective:** Compress two same-frequency sinusoids into one sinusoid using phasors.

---

### CONCEPTS IN THIS SECTION

- Same-frequency sinusoid addition
- Amplitude \(C\)
- Phase \(\theta\)
- Phasor representation
- Quadrant/sign check

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiU2hvdyB0aGF0IGhvcml6b250YWwgYW5kIHZlcnRpY2FsIHBoYXNvciBjb21wb25lbnRzIGNvbWJpbmUgaW50byBvbmUgcmVzdWx0YW50IHBoYXNvci4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgZGlhZ3JhbSB0byBjb25uZWN0IHRoZSBcXChhXFxjb3NcXCkgdGVybSwgXFwoYlxcc2luXFwpIHRlcm0sIGFuZCB0aGUgZmluYWwgXFwoQ1xcKSBhdCBhbmdsZSBcXChcXHRoZXRhXFwpLiIsInRvcF9zY29yZSI6IlVzZSB0aGUgZGlhZ3JhbSB0byBjaGVjayB0aGUgc2lnbiBvZiBcXChiXFwpIGFuZCB0aGUgcXVhZHJhbnQgb2YgXFwoXFx0aGV0YVxcKSBiZWZvcmUgdHJ1c3RpbmcgYSBjYWxjdWxhdG9yLiJ9" style="display:none;"></div>%%KC_END%%
![Figure B.7](/figures/page-018-unknown-1.png)
*Figure B.7 shows how the cosine and sine components add as phasors to produce one resultant sinusoid.*
<div class="lesson-figure-description">The horizontal real-axis component represents the cosine term with coefficient \(a\), and the vertical component represents the sine-related term with coefficient \(b\). The resultant vector from the origin has length \(C\) and angle \(\theta\), which become the amplitude and phase in the final sinusoid. The sign of the sine coefficient \(b\) determines whether the vertical phasor points up or down, directly controlling the sign of \(\theta\).</div>

## 1. Same-frequency sinusoids collapse into one sinusoid

Two sinusoids can be compressed into one **only because they share the same angular frequency \(\omega_0\)**. Same frequency is the trigger condition. The result is not a new frequency — it is the same \(\omega_0\) with a new amplitude \(C\) and a new phase \(\theta\).

**Valid form:**
$$3\cos(\omega_0 t) - 4\sin(\omega_0 t)$$
Both terms share \(\omega_0\). Compression applies.

**Invalid form:**
$$3\cos(\omega_0 t) - 4\sin(2\omega_0 t)$$
The sine term has frequency \(2\omega_0\). Compression does **not** apply.

> **Exam Note:** On exams, first check that both terms have the same \(\omega_0\) before applying the formula.

## 2. Representative example: compress one sinusoid

This is the central compression formula (B.16).

- \(a\) — coefficient of \(\cos(\omega_0 t)\)
- \(b\) — coefficient of \(\sin(\omega_0 t)\)
- \(C\) — final amplitude of the single sinusoid
- \(\theta\) — final phase of the single sinusoid
- \(\omega_0\) — the shared angular frequency

**When to use it:** When a cosine term and a sine term share the same \(\omega_0\).

**Common misuse:** Applying (B.16) when the two terms have different frequencies. The formula is invalid in that case.

$$a\cos(\omega_0 t)+b\sin(\omega_0 t)=C\cos(\omega_0 t+\theta) \quad \text{(B.16)}$$

## 3. Reverse operation: expand one sinusoid

\(C\) is the phasor length and therefore the amplitude of the final sinusoid. Amplitude is never negative.

**Mini-example:** For \(a = 3\) and \(b = -4\), we get \(C = \sqrt{9+16} = 5\).

**Exam trigger:** After identifying \(a\) and \(b\), compute amplitude using the Pythagorean length formula.

**Common misuse:** Stopping after finding \(C\) and forgetting to compute \(\theta\). An answer with only \(C\) is incomplete.

$$C=\sqrt{a^2+b^2}$$

$$\theta=\tan^{-1}\!\left(\frac{-b}{a}\right) \quad \text{(B.17)}$$
*\(\theta\) is the angle of the complex number \(a - jb\) in the complex plane — not simply a blind calculator output.

- \(a\) — real part of the phasor
- \(b\) — the sine coefficient (note the **minus sign**: the formula uses \(-b\), not \(b\))

The \(-b\) sign arises from rewriting the sine contribution inside \(C\cos(\omega_0 t + \theta)\) using the angle-addition identity.

**Quadrant care:** If \(a\) is negative, the phasor lies in the second or third quadrant. The raw \(\tan^{-1}\) output may need adjustment — always locate the phasor on the complex plane first.

**Common misuse:** Using \(\tan^{-1}(b/a)\) instead of \(\tan^{-1}(-b/a)\), or ignoring the quadrant entirely.*

## 2. Representative example: compress one sinusoid

Compress \(x(t) = \cos(\omega_0 t) - \sqrt{3}\sin(\omega_0 t)\) into a single sinusoid.

**Step 1 — Identify coefficients:**
$$a = 1, \quad b = -\sqrt{3}$$

**Step 2 — Compute amplitude:**
$$C = \sqrt{1^2 + (-\sqrt{3})^2} = \sqrt{1+3} = 2$$

**Step 3 — Compute phase:**
$$\theta = \tan^{-1}\!\left(\frac{-b}{a}\right) = \tan^{-1}\!\left(\frac{\sqrt{3}}{1}\right) = 60^\circ$$

**Final answer:**
$$x(t) = 2\cos(\omega_0 t + 60^\circ)$$

**Quick check:** The negative sine coefficient (\(b = -\sqrt{3}\)) produces a positive phase in this convention because \(\theta\) uses \(-b/a\), which flips the sign.

> **Exam Note:** Final answers must include both amplitude and phase. \(C = 2\) alone is incomplete.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="example_support" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoZSB0d28gZGlhZ3JhbXMgdG8gc2VlIHRoZSBmaW5hbCBhbXBsaXR1ZGUgYW5kIHBoYXNlIGRpcmVjdGx5IGFmdGVyIGNvbXB1dGluZyBcXChhXFwpIGFuZCBcXChiXFwpLiIsInN0YW5kYXJkIjoiVXNlIEZpZy4gQi44YSB0byB2ZXJpZnkgdGhlIHdvcmtlZCBleGFtcGxlIGFuZCBGaWcuIEIuOGIgdG8gc2hvdyB3aHkgcXVhZHJhbnQgYWRqdXN0bWVudCBtYXR0ZXJzLiIsInRvcF9zY29yZSI6IlVzZSBGaWcuIEIuOGIgYXMgdGhlIHdhcm5pbmcgY2FzZTogbmVnYXRpdmUgcmVhbCBhbmQgaW1hZ2luYXJ5IGNvbXBvbmVudHMgcmVxdWlyZSBjYXJlZnVsIGFuZ2xlIHBsYWNlbWVudC4ifQ==" style="display:none;"></div>%%KC_END%%
![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*Figure B.8 verifies sinusoid addition by showing the resulting phasor for two worked cases.*
<div class="lesson-figure-description">Fig. B.8a shows the case where the components add to a phasor of length 2 at 60°, with dashed projections marking real part 1 and imaginary part \(\sqrt{3}\), confirming the worked example above. Fig. B.8b shows the case where negative components place the resultant in the third quadrant with magnitude 5 and angle approximately \(-126.9^\circ\), with dashed lines indicating real part \(-3\) and imaginary part \(-4\). Students should use these diagrams as a sign and quadrant check, not as a replacement for calculation.</div>

## 3. Reverse operation: expand one sinusoid

The same identity works **backward**: starting from one phase-shifted cosine, recover the separate cosine and sine coefficients.

- Cosine coefficient: \(C\cos\theta\)
- Sine coefficient: \(-C\sin\theta\)

**When to use it:** When a problem gives amplitude \(C\) and phase \(\theta\) but asks for separate \(\cos\) and \(\sin\) terms.

**Minimal example:** If \(C = 2\) and \(\theta = 60^\circ\), then the cosine coefficient is \(2\cos 60^\circ = 1\) and the sine coefficient is \(-2\sin 60^\circ = -\sqrt{3}\).

**Common misuse:** Forgetting the **minus sign** before \(C\sin\theta\). Writing \(+C\sin\theta\) for the sine term is a sign error.

$$C\cos(\omega_0 t+\theta)=C\cos\theta\cos(\omega_0 t)-C\sin\theta\sin(\omega_0 t)$$

---
**📌 Key Takeaways**
- **Compression formula (B.16):** \(a\cos(\omega_0 t)+b\sin(\omega_0 t)=C\cos(\omega_0 t+\theta)\) — applies only when both terms share the same \(\omega_0\).
- **Amplitude (B.16):** \(C=\sqrt{a^2+b^2}\) — phasor length, always non-negative; never stop here without also finding \(\theta\).
- **Phase (B.17):** \(\theta=\tan^{-1}(-b/a)\) — use \(-b\), not \(b\); always verify the quadrant using the signs of \(a\) and \(b\) before accepting the calculator output.
- **Reverse expansion:** \(C\cos(\omega_0 t+\theta)=C\cos\theta\cos(\omega_0 t)-C\sin\theta\sin(\omega_0 t)\) — note the minus sign before \(C\sin\theta\).

*Next, this phasor idea connects naturally to complex exponentials and Euler's formula.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InNhbWVfZnJlcXVlbmN5X3RyaWdnZXIiLCJsYWJlbCI6IlJlY29nbml6aW5nIHdoZW4gc2ludXNvaWQgY29tcHJlc3Npb24gYXBwbGllcyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggZXhwcmVzc2lvbiBjYW4gYmUgY29tcHJlc3NlZCB1c2luZyBFcS4gKEIuMTYpIGludG8gb25lIHNpbnVzb2lkIG9mIHRoZSBmb3JtIFxcKENcXGNvcyhcXG9tZWdhXzAgdCArIFxcdGhldGEpXFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoMlxcY29zKFxcb21lZ2FfMCB0KSAtIDVcXHNpbihcXG9tZWdhXzAgdClcXCkiLCJCLiBcXCgyXFxjb3MoXFxvbWVnYV8wIHQpIC0gNVxcc2luKDJcXG9tZWdhXzAgdClcXCkiLCJDLiBcXCgyXFxjb3MoXFxvbWVnYV8wIHQpIC0gNVxcY29zKDNcXG9tZWdhXzAgdClcXCkiLCJELiBcXCgyXFxjb3ModCkgLSA1XFxzaW4odF4yKVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IkVxLiAoQi4xNikgYXBwbGllcyB3aGVuIHRoZSBjb3NpbmUgYW5kIHNpbmUgdGVybXMgc2hhcmUgdGhlIHNhbWUgYW5ndWxhciBmcmVxdWVuY3kgXFwoXFxvbWVnYV8wXFwpLiBPbmx5IG9wdGlvbiBBIGhhcyBib3RoIHRlcm1zIGF0IFxcKFxcb21lZ2FfMFxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGUgc2luZSB0ZXJtIGhhcyBhbmd1bGFyIGZyZXF1ZW5jeSBcXCgyXFxvbWVnYV8wXFwpLCBub3QgXFwoXFxvbWVnYV8wXFwpLiIsIkMiOiJUaGUgdHdvIGNvc2luZSB0ZXJtcyBoYXZlIGRpZmZlcmVudCBmcmVxdWVuY2llcyBcXChcXG9tZWdhXzBcXCkgYW5kIFxcKDNcXG9tZWdhXzBcXCkuIiwiRCI6IlxcKFxcc2luKHReMilcXCkgaXMgbm90IGEgc2ludXNvaWQgd2l0aCB0aGUgc2FtZSBhbmd1bGFyIGZyZXF1ZW5jeSBhcyBcXChcXGNvcyh0KVxcKS4ifSwiaGludCI6IkNoZWNrIHRoZSBhcmd1bWVudCBvZiBlYWNoIHRyaWcgZnVuY3Rpb24gYmVmb3JlIGNhbGN1bGF0aW5nLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6ImFtcGxpdHVkZV9mb3JtdWxhIiwibGFiZWwiOiJDb21wdXRpbmcgZmluYWwgYW1wbGl0dWRlIEMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciBcXCh4KHQpID0gM1xcY29zKFxcb21lZ2FfMCB0KSAtIDRcXHNpbihcXG9tZWdhXzAgdClcXCksIHdoYXQgaXMgdGhlIGFtcGxpdHVkZSBcXChDXFwpIG9mIHRoZSBzaW5nbGUgc2ludXNvaWQ/Iiwib3B0aW9ucyI6WyJBLiBcXCgxXFwpIiwiQi4gXFwoNVxcKSIsIkMuIFxcKDdcXCkiLCJELiBcXCgtNVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkhlcmUgXFwoYSA9IDNcXCkgYW5kIFxcKGIgPSAtNFxcKSwgc28gXFwoQyA9IFxcc3FydHszXjIgKyAoLTQpXjJ9ID0gXFxzcXJ0ezkrMTZ9ID0gNVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIHN1YnRyYWN0cyB0aGUgbWFnbml0dWRlcyBcXCgzIC0gNCA9IC0xXFwpIGluc3RlYWQgb2YgdXNpbmcgcGhhc29yIGxlbmd0aC4iLCJDIjoiVGhpcyBhZGRzIG1hZ25pdHVkZXMgZGlyZWN0bHkgXFwoMyArIDQgPSA3XFwpIGluc3RlYWQgb2YgdXNpbmcgXFwoXFxzcXJ0e2FeMitiXjJ9XFwpLiIsIkQiOiJBbXBsaXR1ZGUgaXMgYSBtYWduaXR1ZGUsIHNvIGl0IGlzIG5ldmVyIG5lZ2F0aXZlLiJ9LCJoaW50IjoiQW1wbGl0dWRlIGlzIHRoZSBsZW5ndGggb2YgdGhlIHBoYXNvcjogXFwoQyA9IFxcc3FydHthXjIrYl4yfVxcKS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJwaGFzZV9mb3JtdWxhX3NpZ24iLCJsYWJlbCI6IlVzaW5nIFxcKFxcdGhldGEgPSBcXHRhbl57LTF9KC1iL2EpXFwpIHdpdGggdGhlIGNvcnJlY3Qgc2lnbiIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIFxcKHgodCkgPSBcXGNvcyhcXG9tZWdhXzAgdCkgLSBcXHNxcnR7M31cXHNpbihcXG9tZWdhXzAgdClcXCksIHdoYXQgaXMgdGhlIGNvcnJlY3Qgc2luZ2xlLXNpbnVzb2lkIGZvcm0/Iiwib3B0aW9ucyI6WyJBLiBcXCgyXFxjb3MoXFxvbWVnYV8wIHQgKyA2MF5cXGNpcmMpXFwpIiwiQi4gXFwoMlxcY29zKFxcb21lZ2FfMCB0IC0gNjBeXFxjaXJjKVxcKSIsIkMuIFxcKDJcXGNvcyhcXG9tZWdhXzAgdCArIDMwXlxcY2lyYylcXCkiLCJELiBcXChcXHNxcnR7M31cXGNvcyhcXG9tZWdhXzAgdCArIDYwXlxcY2lyYylcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJcXChhID0gMVxcKSBhbmQgXFwoYiA9IC1cXHNxcnR7M31cXCksIHNvIFxcKEMgPSBcXHNxcnR7MSszfSA9IDJcXCkgYW5kIFxcKFxcdGhldGEgPSBcXHRhbl57LTF9KC1iL2EpID0gXFx0YW5eey0xfShcXHNxcnR7M30pID0gNjBeXFxjaXJjXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoaXMgdXNlcyB0aGUgd3JvbmcgcGhhc2Ugc2lnbi4gU2luY2UgXFwoYiA9IC1cXHNxcnR7M31cXCksIHdlIGhhdmUgXFwoLWIvYSA9ICtcXHNxcnR7M31cXCksIGdpdmluZyBcXCgrNjBeXFxjaXJjXFwpLiIsIkMiOiJcXChcXHRhbl57LTF9KFxcc3FydHszfSkgPSA2MF5cXGNpcmNcXCksIG5vdCBcXCgzMF5cXGNpcmNcXCkuIiwiRCI6IlRoZSBhbXBsaXR1ZGUgaXMgXFwoXFxzcXJ0ezFeMisoXFxzcXJ0ezN9KV4yfSA9IDJcXCksIG5vdCBcXChcXHNxcnR7M31cXCkuIn0sImhpbnQiOiJVc2UgXFwoLWIvYVxcKSwgbm90IFxcKGIvYVxcKS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoicGhhc29yX2RpYWdyYW1fcmVmZXJlbmNlIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJBIHN0dWRlbnQgd3JpdGVzIFxcKFxcY29zKFxcb21lZ2FfMCB0KSAtIFxcc3FydHszfVxcc2luKFxcb21lZ2FfMCB0KSA9IDJcXGNvcyhcXG9tZWdhXzAgdCAtIDYwXlxcY2lyYylcXCkuIEV4cGxhaW4gdGhlIG1pc3Rha2UuIiwiaWRlYWxfYW5zd2VyIjoiVGhlIHNpZ24gb2YgdGhlIHBoYXNlIGlzIHdyb25nLiBCeSBFcS4gKEIuMTcpLCBcXChcXHRoZXRhID0gXFx0YW5eey0xfSgtYi9hKVxcKS4gSGVyZSBcXChiID0gLVxcc3FydHszfVxcKSwgc28gXFwoLWIvYSA9IFxcc3FydHszfS8xID0gXFxzcXJ0ezN9XFwpLCBnaXZpbmcgXFwoXFx0aGV0YSA9ICs2MF5cXGNpcmNcXCkuIFRoZSBjb3JyZWN0IGFuc3dlciBpcyBcXCgyXFxjb3MoXFxvbWVnYV8wIHQgKyA2MF5cXGNpcmMpXFwpLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3QgaWRlbnRpZnkgXFwoYiA9IC1cXHNxcnR7M31cXCkiLCJNdXN0IHVzZSBcXChcXHRoZXRhID0gXFx0YW5eey0xfSgtYi9hKVxcKSIsIk11c3Qgc3RhdGUgdGhhdCB0aGUgY29ycmVjdCBwaGFzZSBpcyBcXCgrNjBeXFxjaXJjXFwpIiwiTXVzdCBnaXZlIHRoZSBjb3JyZWN0ZWQgZmluYWwgc2ludXNvaWQgXFwoMlxcY29zKFxcb21lZ2FfMCB0ICsgNjBeXFxjaXJjKVxcKSJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQgdW5kZXJzdGFuZHMgdGhlIHNpZ24gY29udmVudGlvbiBpbiAoQi4xNyksIG5vdCBqdXN0IHRoZSBhbXBsaXR1ZGUgY2FsY3VsYXRpb24uIiwiaGludCI6Ikxvb2sgYXQgdGhlIG1pbnVzIHNpZ24gaW4gXFwoXFx0aGV0YSA9IFxcdGFuXnstMX0oLWIvYSlcXCkgYW5kIHN1YnN0aXR1dGUgXFwoYiA9IC1cXHNxcnR7M31cXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJxdWFkcmFudF9jYXJlIiwibGFiZWwiOiJRdWFkcmFudCBhbmQgYXJjdGFuZ2VudCB0cmFwIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3A0X3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgXFwoeCh0KSA9IC0zXFxjb3MoXFxvbWVnYV8wIHQpICsgNFxcc2luKFxcb21lZ2FfMCB0KVxcKSwgdGhlIHBoYXNvciB1c2VzIFxcKGEgLSBqYiA9IC0zIC0gajRcXCkuIFdoaWNoIGZpbmFsIHBoYXNlIGlzIGNvbnNpc3RlbnQgd2l0aCB0aGUgdGV4dGJvb2sgcGhhc29yIGRpYWdyYW0/Iiwib3B0aW9ucyI6WyJBLiBcXCgrNTMuMV5cXGNpcmNcXCkiLCJCLiBcXCgtNTMuMV5cXGNpcmNcXCkiLCJDLiBcXCgtMTI2LjleXFxjaXJjXFwpIiwiRC4gXFwoKzEyNi45XlxcY2lyY1xcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlRoZSBwb2ludCBcXCgtMyAtIGo0XFwpIGxpZXMgaW4gdGhlIHRoaXJkIHF1YWRyYW50LiBUaGUgcmVmZXJlbmNlIGFuZ2xlIGlzIFxcKFxcdGFuXnstMX0oNC8zKSBcXGFwcHJveCA1My4xXlxcY2lyY1xcKSwgYnV0IHRoZSBwaGFzb3IgcG9pbnRzIGludG8gdGhlIHRoaXJkIHF1YWRyYW50LCBnaXZpbmcgYXBwcm94aW1hdGVseSBcXCgtMTI2LjleXFxjaXJjXFwpIChvciBlcXVpdmFsZW50bHkgXFwoMTgwXlxcY2lyYyArIDUzLjFeXFxjaXJjXFwpIG1lYXN1cmVkIGZyb20gdGhlIG5lZ2F0aXZlIHJlYWwgYXhpcykuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBpcyB0aGUgcmVmZXJlbmNlIGFuZ2xlIG9ubHkgYW5kIGlnbm9yZXMgdGhlIHF1YWRyYW50IGVudGlyZWx5LiIsIkIiOiJUaGlzIGhhcyB0aGUgd3JvbmcgcXVhZHJhbnQgZm9yIGEgcG9pbnQgd2l0aCBib3RoIG5lZ2F0aXZlIHJlYWwgYW5kIG5lZ2F0aXZlIGltYWdpbmFyeSBwYXJ0cy4iLCJEIjoiVGhpcyBhbmdsZSBwb2ludHMgdG8gdGhlIHNlY29uZCBxdWFkcmFudCwgbm90IHRoZSB0aGlyZC1xdWFkcmFudCBkaXJlY3Rpb24gdXNlZCBoZXJlLiJ9LCJoaW50IjoiRG8gbm90IHRydXN0IFxcKFxcdGFuXnstMX1cXCkgYWxvbmU7IGxvY2F0ZSB0aGUgcGhhc29yIG9uIHRoZSBjb21wbGV4IHBsYW5lIGZpcnN0LiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJ3cm9uZ192c19yaWdodF9waGFzb3JfcXVhZHJhbnRfY2hlY2siLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDRfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoeSBpcyBcXChcXHRhbl57LTF9XFwhXFxsZWZ0KFxcZnJhY3stNH17LTN9XFxyaWdodCkgPSA1My4xXlxcY2lyY1xcKSBub3QgdGhlIGZpbmFsIHBoYXNlIGZvciBcXChhIC0gamIgPSAtMyAtIGo0XFwpPyIsIm9wdGlvbnMiOlsiQS4gQmVjYXVzZSB0aGUgbWFnbml0dWRlIG11c3QgYmUgbmVnYXRpdmUiLCJCLiBCZWNhdXNlIGFyY3RhbmdlbnQgZ2l2ZXMgYSByZWZlcmVuY2UgYW5nbGUgYW5kIGRvZXMgbm90IGJ5IGl0c2VsZiBpZGVudGlmeSB0aGUgcXVhZHJhbnQiLCJDLiBCZWNhdXNlIFxcKFxcdGhldGFcXCkgbXVzdCBhbHdheXMgYmUgYmV0d2VlbiBcXCgwXlxcY2lyY1xcKSBhbmQgXFwoOTBeXFxjaXJjXFwpIiwiRC4gQmVjYXVzZSBzaW5lIHRlcm1zIGNhbm5vdCBiZSByZXByZXNlbnRlZCBieSBwaGFzb3JzIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIHJhdGlvIFxcKC00Ly0zXFwpIGdpdmVzIHRoZSByZWZlcmVuY2UgYW5nbGUsIGJ1dCB0aGUgc2lnbnMgb2YgYm90aCBjb21wb25lbnRzIHBsYWNlIHRoZSBwaGFzb3IgaW4gdGhlIHRoaXJkIHF1YWRyYW50LiBUaGUgY29ycmVjdCBhbmdsZSBpcyBhcHByb3hpbWF0ZWx5IFxcKC0xMjYuOV5cXGNpcmNcXCksIG5vdCBcXCg1My4xXlxcY2lyY1xcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJNYWduaXR1ZGUgaXMgbmV2ZXIgbmVnYXRpdmUuIiwiQyI6IlBoYXNlcyBjYW4gYmUgb3V0c2lkZSB0aGUgZmlyc3QgcXVhZHJhbnQg4oCUIHRoZXkgY2FuIGJlIGFueSBhbmdsZS4iLCJEIjoiVGhlIGVudGlyZSBzZWN0aW9uIHVzZXMgcGhhc29ycyB0byByZXByZXNlbnQgYm90aCBzaW5lIGFuZCBjb3NpbmUgdGVybXMuIn0sImhpbnQiOiJBc2sgd2hlcmUgdGhlIHBvaW50IFxcKCgtMywgLTQpXFwpIGxpZXMgb24gdGhlIGNvbXBsZXggcGxhbmUuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6InBoYXNvcl9xdWFkcmFudF9yZWZlcmVuY2UiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InJldmVyc2VfZXhwYW5zaW9uIiwibGFiZWwiOiJFeHBhbmRpbmcgb25lIHBoYXNlLXNoaWZ0ZWQgY29zaW5lIGludG8gY29zIGFuZCBzaW4gdGVybXMiLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3A1X3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBleHBhbnNpb24gaXMgY29ycmVjdCBmb3IgXFwoQ1xcY29zKFxcb21lZ2FfMCB0ICsgXFx0aGV0YSlcXCk/Iiwib3B0aW9ucyI6WyJBLiBcXChDXFxjb3NcXHRoZXRhXFxjb3MoXFxvbWVnYV8wIHQpIC0gQ1xcc2luXFx0aGV0YVxcc2luKFxcb21lZ2FfMCB0KVxcKSIsIkIuIFxcKENcXGNvc1xcdGhldGFcXGNvcyhcXG9tZWdhXzAgdCkgKyBDXFxzaW5cXHRoZXRhXFxzaW4oXFxvbWVnYV8wIHQpXFwpIiwiQy4gXFwoQ1xcc2luXFx0aGV0YVxcY29zKFxcb21lZ2FfMCB0KSAtIENcXGNvc1xcdGhldGFcXHNpbihcXG9tZWdhXzAgdClcXCkiLCJELiBcXChDXFxjb3MoXFxvbWVnYV8wIHQpICsgXFx0aGV0YVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlRoZSBjb3NpbmUgYW5nbGUtYWRkaXRpb24gaWRlbnRpdHkgZ2l2ZXMgXFwoXFxjb3MoQStCKSA9IFxcY29zIEFcXGNvcyBCIC0gXFxzaW4gQVxcc2luIEJcXCkuIEFwcGx5aW5nIHRoaXMgd2l0aCBcXChBID0gXFxvbWVnYV8wIHRcXCkgYW5kIFxcKEIgPSBcXHRoZXRhXFwpIHlpZWxkcyBvcHRpb24gQS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGUgc2lnbiBiZWZvcmUgdGhlIHNpbmUgcHJvZHVjdCBzaG91bGQgYmUgbmVnYXRpdmUsIG5vdCBwb3NpdGl2ZS4iLCJDIjoiVGhlIHNpbmUgYW5kIGNvc2luZSBjb2VmZmljaWVudHMgYXJlIHN3YXBwZWQuIiwiRCI6IlBoYXNlIGNhbm5vdCBiZSBhZGRlZCBvdXRzaWRlIHRoZSBjb3NpbmUgYXMgYSBzZXBhcmF0ZSBhZGRpdGl2ZSB0ZXJtLiJ9LCJoaW50IjoiVXNlIHRoZSBjb3NpbmUgYW5nbGUtYWRkaXRpb24gaWRlbnRpdHk6IFxcKFxcY29zKEErQikgPSBcXGNvcyBBXFxjb3MgQiAtIFxcc2luIEFcXHNpbiBCXFwpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
