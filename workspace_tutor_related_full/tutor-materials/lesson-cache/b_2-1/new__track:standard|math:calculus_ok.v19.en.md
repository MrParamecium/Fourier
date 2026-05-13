%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJUaGlzIHNlY3Rpb24gaXMgYmVzdCB0YXVnaHQgd2l0aCBib3RoIHRoZSB0ZXh0Ym9vayBwaGFzb3IgZmlndXJlIGFuZCBvbmUgY2xlYW4gZ2VuZXJhdGVkIHRlYWNoaW5nIHZpc3VhbC4gVGhlIGJvb2sgZmlndXJlIGFuY2hvcnMgdGhlIGxlc3NvbiB0byB0aGUgZXhhY3QgdGV4dGJvb2sgbWV0aG9kIGFuZCBleGFtcGxlLCB3aGlsZSBhIGdlbmVyYXRlZCB2aXN1YWwgY2FuIHNpbXBsaWZ5IHRoZSBjb3JlIGdlb21ldHJ5IG9mIGhvcml6b250YWwtcGx1cy12ZXJ0aWNhbCBwaGFzb3IgYWRkaXRpb24gaW50byBvbmUgaW1tZWRpYXRlbHkgcmVhZGFibGUgZGlhZ3JhbS4iLCJjcmFtIjoiVXNlIHZpc3VhbHMgdG8gaGVscCBzdHVkZW50cyBpbnN0YW50bHkgcmVjb2duaXplIHRoZSBleGFtIHBhdHRlcm46IHNhbWUgZnJlcXVlbmN5LCByZXdyaXRlIGFzIGEgY29zIHRlcm0gcGx1cyBiIHNpbiB0ZXJtLCB0aGVuIHJlYWQgbWFnbml0dWRlIGFuZCBhbmdsZSBmcm9tIHRoZSBwaGFzb3IgdHJpYW5nbGUuIiwic3RhbmRhcmQiOiJVc2UgdGhlIHRleHRib29rIGZpZ3VyZSBmb3IgdGhlIHJlcHJlc2VudGF0aXZlIGV4YW1wbGUgYW5kIHRoZSBnZW5lcmF0ZWQgdmlzdWFsIHRvIGNsYXJpZnkgd2h5IGEgY29zIHRlcm0gaXMgaG9yaXpvbnRhbCwgYSBzaW4gdGVybSBiZWNvbWVzIGEgdmVydGljYWwgcGhhc29yLCBhbmQgdGhlIHJlc3VsdCBpcyBvbmUgcmVzdWx0YW50IHNpbnVzb2lkLiIsInRvcF9zY29yZSI6IlVzZSB2aXN1YWxzIHRvIHN0cmVzcyBxdWFkcmFudCBoYW5kbGluZywgc2lnbiBjb252ZW50aW9ucywgYW5kIHdoeSBjYWxjdWxhdG9yIGFyY3RhbmdlbnQgbXVzdCBiZSBpbnRlcnByZXRlZCBjYXJlZnVsbHkgaW5zdGVhZCBvZiBhY2NlcHRlZCBibGluZGx5LiJ9" style="display:none;"></div>%%KC_END%%
# B.2 Addition of Sinusoids

> **Section Objective:** Learn to collapse a sum of same-frequency sine and cosine terms into one clean sinusoid with a new amplitude and phase.

Suppose you see \(x(t) = \cos(\omega_0 t) - \sqrt{3}\sin(\omega_0 t)\). It looks like two separate waves, but it is really just one sinusoid in disguise. This section teaches you how to rewrite any sum of the form \(a\cos(\omega_0 t) + b\sin(\omega_0 t)\) as a single cosine \(C\cos(\omega_0 t + \theta)\) with a new amplitude \(C\) and phase \(\theta\). That single form is far easier to interpret, compare, and plug into later circuits and signals problems. The one non-negotiable requirement: **both terms must share the same frequency \(\omega_0\)**. If the frequencies differ, the trick does not apply.

## 1. Core Idea: Two Same-Frequency Sinusoids Become One Sinusoid

The key result is the identity

$$
a\cos(\omega_0 t) + b\sin(\omega_0 t) = C\cos(\omega_0 t + \theta)
$$

Three things change in this rewrite. First, **same frequency is the essential condition** — both terms must oscillate at \(\omega_0\), otherwise the identity does not hold. Second, **\(C\) rescales the amplitude**: the new peak value is generally different from either \(a\) or \(b\) alone. Third, **\(\theta\) shifts the waveform horizontally** in time, reflecting the phase relationship between the original cosine and sine components.

The reason a cosine and a sine of the same frequency can always be merged is that \(\cos\) and \(\sin\) are exactly 90° apart — they behave like perpendicular components of a vector, and any two perpendicular components can be combined into one resultant.

> **Exam Note:** If the frequencies differ, you cannot collapse them into one single sinusoid of this form.

$$a\cos(\omega_0 t) + b\sin(\omega_0 t) = C\cos(\omega_0 t + \theta)$$
*This formula states that a cosine term and a sine term sharing the same frequency \(\omega_0\) can always be rewritten as a single cosine with a new amplitude \(C\) and a new phase angle \(\theta\).*

$$C = \sqrt{a^2 + b^2}, \qquad \theta = \tan^{-1}\!\left(\frac{-b}{a}\right)$$
*\(C\) is the magnitude of the resultant phasor formed from the coefficients \(a\) and \(b\), while \(\theta\) is the phasor angle — but you must always verify which quadrant \(\theta\) belongs to by checking the signs of both \(a\) and \(-b\), not by accepting the calculator's inverse tangent output blindly.*

## 2. Why Phasors Make the Addition Easy

The phasor method turns a trigonometric problem into a geometry problem. Treat \(a\cos(\omega_0 t)\) as a **horizontal phasor of length \(a\)**. Now rewrite \(b\sin(\omega_0 t)\) using the identity \(\sin(\omega_0 t) = \cos(\omega_0 t - \pi/2)\), so it becomes a phasor that is 90° behind the cosine — a **vertical component**.

The sign logic is important: the formula uses the complex number \(a - jb\). The imaginary part is \(-b\), not \(b\). This means the vertical component in the phasor diagram is \(-b\), and the angle \(\theta\) is measured from the real axis to the point \((a, -b)\) in the complex plane.

In practice, the steps are:
1. Build the complex number \(a - jb\).
2. Compute its magnitude: \(C = \sqrt{a^2 + b^2}\).
3. Compute its angle: \(\theta = \tan^{-1}(-b/a)\), placed in the correct quadrant.

> **Quick mental check:** If \(a = 3\) and \(b = 4\), then \(a - jb = 3 - j4\). The real part is positive and the imaginary part is negative, so the phasor sits in **quadrant IV**. Does your angle reflect that?

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgdG8gc3BvdCB0aGUgdHJpYW5nbGUgcGF0dGVybiBmYXN0OiBob3Jpem9udGFsIGEsIHZlcnRpY2FsIC1iLCByZXN1bHRhbnQgQyBhdCBhbmdsZSDOuC4iLCJzdGFuZGFyZCI6IlVzZSB0aGlzIHRvIGNvbm5lY3QgdGhlIGZvcm11bGEgZm9yIEMgYW5kIM64IHRvIGEgc2luZ2xlIGNsZWFuIHBoYXNvciBwaWN0dXJlLiIsInRvcF9zY29yZSI6IlVzZSB0aGlzIHRvIGluc3BlY3Qgc2lnbiBjb252ZW50aW9ucyBhbmQgcXVhZHJhbnQgcGxhY2VtZW50IGJlZm9yZSB0cnVzdGluZyBjYWxjdWxhdG9yIG91dHB1dC4ifQ==" style="display:none;"></div>%%KC_END%%
*🎨 Phasor-addition geometry: the horizontal component \(a\) and vertical component \(-b\) combine to give resultant \(C\) at angle \(\theta\). Always verify the quadrant from the signs of \(a\) and \(-b\).*
![Illustration](/generated/gptimage2-1777213044810-7748.png)

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="example_support" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgZmlndXJlIHRvIG1hdGNoIHRoZSBzb2x2ZWQgZXhhbXBsZSB0byBhIHJlY29nbml6YWJsZSBwaGFzb3IgcGljdHVyZS4iLCJzdGFuZGFyZCI6IlVzZSB0aGlzIGZpZ3VyZSB0byB3YWxrIHRocm91Z2ggb25lIHJlcHJlc2VudGF0aXZlIGV4YW1wbGUgYW5kIHZlcmlmeSB0aGUgZmluYWwgYW1wbGl0dWRlIGFuZCBwaGFzZSB2aXN1YWxseS4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhpcyBmaWd1cmUgdG8gY29tcGFyZSB0d28gc2lnbiBwYXR0ZXJucyBhbmQgY2hlY2sgd2hldGhlciB0aGUgYW5nbGUgYmVsb25ncyBpbiB0aGUgY29ycmVjdCBxdWFkcmFudC4ifQ==" style="display:none;"></div>%%KC_END%%
![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*The textbook phasor diagram shows how two perpendicular sinusoid components — one cosine and one sine — combine into a single resultant sinusoid with a new amplitude and phase angle.*

## 3. Representative Example and the Main Trap

Let us work through the example from the textbook:

$$
x(t) = \cos(\omega_0 t) - \sqrt{3}\sin(\omega_0 t)
$$

**Step 1 — Identify \(a\) and \(b\).**
Match to \(a\cos(\omega_0 t) + b\sin(\omega_0 t)\): here \(a = 1\) and \(b = -\sqrt{3}\).

**Step 2 — Compute \(C\).**
$$
C = \sqrt{a^2 + b^2} = \sqrt{1^2 + (-\sqrt{3})^2} = \sqrt{1 + 3} = 2
$$

**Step 3 — Compute \(\theta\).**
$$
\theta = \tan^{-1}\!\left(\frac{-b}{a}\right) = \tan^{-1}\!\left(\frac{\sqrt{3}}{1}\right) = 60°
$$

**Step 4 — Write the answer.**
$$
x(t) = 2\cos(\omega_0 t + 60°)
$$

### EXAM WARNING

The main trap appears when \(a\) or \(-b\) is negative. The calculator's \(\tan^{-1}\) always returns a value in \((-90°, 90°)\), which is only quadrant I or IV. If the phasor \(a - jb\) actually lies in quadrant II or III, you must add or subtract \(180°\) to land in the right quadrant. Always check the signs of \(a\) and \(-b\) first, locate the quadrant by inspection, and then confirm your angle is consistent. Principal-value angles (between \(-180°\) and \(180°\)) are the standard expected form.

---
**📌 Key Takeaways**
- Same frequency \(\omega_0\) is required before two sinusoids can be merged into one.
- \(C = \sqrt{a^2 + b^2}\) gives the new amplitude; \(\theta = \tan^{-1}(-b/a)\) gives the phase.
- Always verify the quadrant from the signs of \(a\) and \(-b\) — never trust the calculator angle alone.

*In the next section we will keep using sinusoid/phasor ideas to simplify signal analysis.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InNhbWVfZnJlcXVlbmN5X2NvbmRpdGlvbiIsImxhYmVsIjoiQ29uZGl0aW9uIGZvciBjb21iaW5pbmcgaW50byBvbmUgc2ludXNvaWQiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGV4cHJlc3Npb24gY2FuIGFsd2F5cyBiZSByZXdyaXR0ZW4gYXMgYSBzaW5nbGUgc2ludXNvaWQgb2YgdGhlIGZvcm0gXFwoQ1xcY29zKFxcb21lZ2FfMCB0ICsgXFx0aGV0YSlcXCk/Iiwib3B0aW9ucyI6WyJBLiBcXCgyXFxjb3MoXFxvbWVnYV8wIHQpICsgM1xcc2luKFxcb21lZ2FfMCB0KVxcKSIsIkIuIFxcKDJcXGNvcyhcXG9tZWdhXzAgdCkgKyAzXFxzaW4oMlxcb21lZ2FfMCB0KVxcKSIsIkMuIFxcKDJcXGNvcyhcXG9tZWdhXzAgdCkgKyAzXFxjb3MoMlxcb21lZ2FfMCB0KVxcKSIsIkQuIFxcKDJcXHNpbihcXG9tZWdhXzAgdCkgKyAzXFxzaW4oMlxcb21lZ2FfMCB0KVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlRoZSBjb3NpbmUgYW5kIHNpbmUgdGVybXMgaW4gQSBzaGFyZSB0aGUgc2FtZSBmcmVxdWVuY3kgXFwoXFxvbWVnYV8wXFwpLCBzbyB0aGV5IGNhbiBiZSBtZXJnZWQgaW50byBvbmUgc2ludXNvaWQgd2l0aCBhIG5ldyBhbXBsaXR1ZGUgYW5kIHBoYXNlLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoZSBmcmVxdWVuY2llcyBhcmUgZGlmZmVyZW50IChcXChcXG9tZWdhXzBcXCkgYW5kIFxcKDJcXG9tZWdhXzBcXCkpLCBzbyB0aGUgc3VtIGlzIG5vdCBvbmUgc2luZ2xlIHNpbnVzb2lkIGF0IG9uZSBmcmVxdWVuY3kuIiwiQyI6IkFnYWluLCB0aGUgZnJlcXVlbmNpZXMgYXJlIGRpZmZlcmVudCAoXFwoXFxvbWVnYV8wXFwpIGFuZCBcXCgyXFxvbWVnYV8wXFwpKS4iLCJEIjoiU2FtZSBwcm9ibGVtOiBtaXhlZCBmcmVxdWVuY2llcyBwcmV2ZW50IGNvbGxhcHNlIGludG8gb25lIHNpbnVzb2lkLiJ9LCJoaW50IjoiQ2hlY2sgdGhlIGZyZXF1ZW5jeSBvZiBlYWNoIHRlcm0gZmlyc3QgYmVmb3JlIGRvaW5nIGFueSBhbGdlYnJhLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6ImZvcm11bGFfdXNlX2Zvcl9DX3RoZXRhIiwibGFiZWwiOiJDb21wdXRlIGFtcGxpdHVkZSBhbmQgcGhhc2UgZnJvbSBhIGFuZCBiIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgXFwoeCh0KSA9IDNcXGNvcyhcXG9tZWdhXzAgdCkgLSA0XFxzaW4oXFxvbWVnYV8wIHQpXFwpLCB3aGF0IGlzIHRoZSBjb3JyZWN0IHBhaXIgXFwoKEMsIFxcdGhldGEpXFwpIGluIFxcKHgodCkgPSBDXFxjb3MoXFxvbWVnYV8wIHQgKyBcXHRoZXRhKVxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKEMgPSA1LFxcIFxcdGhldGEgPSA1My4xwrBcXCkiLCJCLiBcXChDID0gNyxcXCBcXHRoZXRhID0gNTMuMcKwXFwpIiwiQy4gXFwoQyA9IDUsXFwgXFx0aGV0YSA9IC01My4xwrBcXCkiLCJELiBcXChDID0gMSxcXCBcXHRoZXRhID0gNTMuMcKwXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiSGVyZSBcXChhID0gM1xcKSBhbmQgXFwoYiA9IC00XFwpLCBzbyBcXChDID0gXFxzcXJ0ezNeMiArICgtNCleMn0gPSA1XFwpIGFuZCBcXChcXHRoZXRhID0gXFx0YW5eey0xfSgtYi9hKSA9IFxcdGFuXnstMX0oNC8zKSBcXGFwcHJveCA1My4xwrBcXCkuIFNpbmNlIFxcKGEgLSBqYiA9IDMgKyBqNFxcKSBsaWVzIGluIHF1YWRyYW50IEksIHRoZSBwb3NpdGl2ZSBhbmdsZSBpcyBjb3JyZWN0LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IkFtcGxpdHVkZSBpcyBub3QgYWRkZWQgbGluZWFybHk7IGl0IGNvbWVzIGZyb20gXFwoXFxzcXJ0e2FeMiArIGJeMn1cXCksIG5vdCBcXChhICsgYlxcKS4iLCJDIjoiVGhlIHNpZ24gaXMgd3Jvbmc6IFxcKC1iL2EgPSA0LzNcXCkgaXMgcG9zaXRpdmUsIHBsYWNpbmcgdGhlIHBoYXNvciBpbiBxdWFkcmFudCBJLCBzbyBcXChcXHRoZXRhXFwpIGlzIHBvc2l0aXZlLiIsIkQiOiJUaGUgYW1wbGl0dWRlIGNhbm5vdCBzaHJpbmsgdG8gMSBmcm9tIHRoZXNlIGNvZWZmaWNpZW50cy4ifSwiaGludCI6IlVzZSBcXChDID0gXFxzcXJ0e2FeMiArIGJeMn1cXCkgZmlyc3QsIHRoZW4gY29tcHV0ZSBcXChcXHRoZXRhXFwpIGZyb20gXFwoLWIvYVxcKS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciBcXCh4KHQpID0gLTNcXGNvcyhcXG9tZWdhXzAgdCkgKyA0XFxzaW4oXFxvbWVnYV8wIHQpXFwpLCB3aGljaCBwaGFzZSBhbmdsZSBpcyBjb25zaXN0ZW50IHdpdGggdGhlIHBoYXNvciBmb3IgXFwoYSAtIGpiXFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoNTMuMcKwXFwpIiwiQi4gXFwoLTUzLjHCsFxcKSIsIkMuIFxcKC0xMjYuOcKwXFwpIiwiRC4gXFwoMTI2LjnCsFxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IkhlcmUgXFwoYSA9IC0zXFwpIGFuZCBcXChiID0gNFxcKSwgc28gXFwoYSAtIGpiID0gLTMgLSBqNFxcKSwgd2hpY2ggbGllcyBpbiBxdWFkcmFudCBJSUkgKGJvdGggcmVhbCBhbmQgaW1hZ2luYXJ5IHBhcnRzIG5lZ2F0aXZlKS4gVGhlIHByaW5jaXBhbC12YWx1ZSBhbmdsZSBpcyB0aGVyZWZvcmUgXFwoLTEyNi45wrBcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhhdCBhbmdsZSBpcyBpbiBxdWFkcmFudCBJLCBidXQgdGhlIHBoYXNvciBcXCgtMyAtIGo0XFwpIGRvZXMgbm90IGxpZSB0aGVyZS4iLCJCIjoiVGhhdCBhbmdsZSBpcyBpbiBxdWFkcmFudCBJViDigJQgc3RpbGwgdGhlIHdyb25nIHF1YWRyYW50LiIsIkQiOiJcXCgxMjYuOcKwXFwpIGlzIGluIHF1YWRyYW50IElJOyB0aGUgcGhhc29yIGlzIGluIHF1YWRyYW50IElJSS4ifSwiaGludCI6IkRvIG5vdCB0cnVzdCBpbnZlcnNlIHRhbmdlbnQgYWxvbmU7IGxvY2F0ZSB0aGUgcXVhZHJhbnQgdXNpbmcgdGhlIHNpZ25zIG9mIHRoZSByZWFsIHBhcnQgXFwoYVxcKSBhbmQgaW1hZ2luYXJ5IHBhcnQgXFwoLWJcXCkuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6Im9wZW5haS9ncHQtNS40LWltYWdlLTIiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InBoYXNvcl9pbnRlcnByZXRhdGlvbiIsImxhYmVsIjoiUmVhZCB0aGUgcGhhc29yIHBpY3R1cmUgYmVoaW5kIHRoZSBmb3JtdWxhIiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSW4gdGhlIHBoYXNvciBtZXRob2QgZm9yIFxcKGFcXGNvcyhcXG9tZWdhXzAgdCkgKyBiXFxzaW4oXFxvbWVnYV8wIHQpXFwpLCB3aGF0IGRvZXMgdGhlIHF1YW50aXR5IFxcKENcXCkgcmVwcmVzZW50PyIsIm9wdGlvbnMiOlsiQS4gVGhlIGZyZXF1ZW5jeSBvZiB0aGUgZmluYWwgc2ludXNvaWQiLCJCLiBUaGUgbWFnbml0dWRlIG9mIHRoZSByZXN1bHRhbnQgcGhhc29yIiwiQy4gVGhlIGhvcml6b250YWwgY29tcG9uZW50IG9ubHkiLCJELiBUaGUgcGhhc2UgYW5nbGUgbWVhc3VyZWQgaW4gcmFkaWFucyJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlxcKENcXCkgaXMgdGhlIGxlbmd0aCBvZiB0aGUgcmVzdWx0YW50IHBoYXNvciBmb3JtZWQgYnkgY29tYmluaW5nIHRoZSBjb3NpbmUgYW5kIHNpbmUgY29tcG9uZW50cyDigJQgaXQgZXF1YWxzIFxcKFxcc3FydHthXjIgKyBiXjJ9XFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBmcmVxdWVuY3kgc3RheXMgXFwoXFxvbWVnYV8wXFwpOyBcXChDXFwpIGlzIG5vdCBhIGZyZXF1ZW5jeS4iLCJDIjoiVGhlIGhvcml6b250YWwgY29tcG9uZW50IGlzIFxcKGFcXCksIG5vdCBcXChDXFwpLiIsIkQiOiJUaGUgcGhhc2UgYW5nbGUgaXMgXFwoXFx0aGV0YVxcKSwgbm90IFxcKENcXCkuIn0sImhpbnQiOiJUaGluayBnZW9tZXRyeTogXFwoQ1xcKSBpcyB0aGUgaHlwb3RlbnVzZS1saWtlIHF1YW50aXR5IGluIHRoZSBwaGFzb3IgdHJpYW5nbGUuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoiYW5zd2VyX2ZyYW1pbmciLCJsYWJlbCI6IlN0YXRlIHRoZSBmaW5hbCBzaW5nbGUtc2ludXNvaWQgZm9ybSBjb3JyZWN0bHkiLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3A0X3ExIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJSZXdyaXRlIFxcKHgodCkgPSBcXGNvcyhcXG9tZWdhXzAgdCkgLSBcXHNxcnR7M31cXHNpbihcXG9tZWdhXzAgdClcXCkgYXMgYSBzaW5nbGUgc2ludXNvaWQgaW4gdGhlIHRleHRib29rIGZvcm0sIGFuZCBzaG93IHRoZSB2YWx1ZXMgb2YgXFwoYVxcKSwgXFwoYlxcKSwgXFwoQ1xcKSwgYW5kIFxcKFxcdGhldGFcXCkuIiwiaWRlYWxfYW5zd2VyIjoiXFwoYSA9IDFcXCksIFxcKGIgPSAtXFxzcXJ0ezN9XFwpLCBcXChDID0gXFxzcXJ0ezFeMiArICgtXFxzcXJ0ezN9KV4yfSA9IFxcc3FydHs0fSA9IDJcXCksIFxcKFxcdGhldGEgPSBcXHRhbl57LTF9KFxcc3FydHszfS8xKSA9IDYwwrBcXCksIHNvIFxcKHgodCkgPSAyXFxjb3MoXFxvbWVnYV8wIHQgKyA2MMKwKVxcKS4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IGlkZW50aWZ5IFxcKGEgPSAxXFwpIGFuZCBcXChiID0gLVxcc3FydHszfVxcKSBjb3JyZWN0bHkiLCJNdXN0IGNvbXB1dGUgXFwoQyA9IDJcXCkiLCJNdXN0IGNvbXB1dGUgXFwoXFx0aGV0YSA9IDYwwrBcXCkiLCJNdXN0IHN0YXRlIHRoZSBmaW5hbCBmb3JtIFxcKHgodCkgPSAyXFxjb3MoXFxvbWVnYV8wIHQgKyA2MMKwKVxcKSJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQgY2FuIG1vdmUgY2xlYW5seSBmcm9tIGNvZWZmaWNpZW50cyB0byB0aGUgZmluYWwgZXhhbS1zdHlsZSBhbnN3ZXIgZm9ybWF0LiIsImhpbnQiOiJNYXRjaCB0aGUgZXhwcmVzc2lvbiB0byBcXChhXFxjb3MoXFxvbWVnYV8wIHQpICsgYlxcc2luKFxcb21lZ2FfMCB0KVxcKSBiZWZvcmUgZG9pbmcgYW55dGhpbmcgZWxzZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3A0X3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaHkgaXMgJ2NoZWNrIHRoZSBxdWFkcmFudCcgYSBzdGFuZGFyZCBleGFtIG5vdGUgaW4gdGhpcyB0b3BpYz8iLCJvcHRpb25zIjpbIkEuIEJlY2F1c2UgXFwoQ1xcKSBjYW4gYmVjb21lIG5lZ2F0aXZlIGlmIHRoZSBxdWFkcmFudCBpcyB3cm9uZyIsIkIuIEJlY2F1c2UgdGhlIGludmVyc2UgdGFuZ2VudCB2YWx1ZSBhbG9uZSBtYXkgbm90IHBsYWNlIFxcKFxcdGhldGFcXCkgaW4gdGhlIGNvcnJlY3QgZGlyZWN0aW9uIiwiQy4gQmVjYXVzZSBmcmVxdWVuY3kgY2hhbmdlcyBzaWduIHdpdGggdGhlIHF1YWRyYW50IiwiRC4gQmVjYXVzZSBzaW5lIHRlcm1zIGFyZSBhbHdheXMgcG9zaXRpdmUgaW4gcGhhc29yIGZvcm0iXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgY2FsY3VsYXRvcidzIFxcKFxcdGFuXnstMX1cXCkgcmV0dXJucyBhIHJlZmVyZW5jZSBhbmdsZSBpbiBcXCgoLTkwwrAsIDkwwrApXFwpLCBidXQgdGhlIGFjdHVhbCBxdWFkcmFudCBvZiBcXChcXHRoZXRhXFwpIGRlcGVuZHMgb24gdGhlIHNpZ25zIG9mIGJvdGggdGhlIHJlYWwgcGFydCBcXChhXFwpIGFuZCB0aGUgaW1hZ2luYXJ5IHBhcnQgXFwoLWJcXCkgb2YgdGhlIHBoYXNvci4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJcXChDXFwpIGlzIGEgbWFnbml0dWRlLCBzbyBpdCBpcyBhbHdheXMgbm9ubmVnYXRpdmUuIiwiQyI6IlRoZSBmcmVxdWVuY3kgXFwoXFxvbWVnYV8wXFwpIGRvZXMgbm90IGRlcGVuZCBvbiB0aGUgcXVhZHJhbnQuIiwiRCI6IlNpbmUgdGVybXMgYXJlIG5vdCBhbHdheXMgcG9zaXRpdmU7IFxcKGJcXCkgY2FuIGJlIGFueSByZWFsIG51bWJlci4ifSwiaGludCI6IlRoaXMgd2FybmluZyBpcyBhYm91dCBhbmdsZSBpbnRlcnByZXRhdGlvbiwgbm90IGFtcGxpdHVkZSBvciBmcmVxdWVuY3kuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfV19" style="display:none;"></div>%%KC_END%%
