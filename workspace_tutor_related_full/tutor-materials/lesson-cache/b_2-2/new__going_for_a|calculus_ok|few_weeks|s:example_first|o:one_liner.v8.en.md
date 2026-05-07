# B.2-2 Sinusoids in Terms of Exponentials

> **Objective:** Learn to rewrite sinusoidal signals using complex exponentials, so that phase shifts and sinusoid addition become compact, reliable algebra.

---

Consider x(t) = 2 cos(ω₀t + 60°). This section shows how to rewrite that signal using complex exponentials — and why doing so makes your life dramatically easier.

The core principle: **exponentials turn oscillations into compact algebra.** Instead of juggling trigonometric identities, you work with magnitudes and angles of complex constants.

Here is the only complex-number fact you need to carry in: a complex constant has a **magnitude** and an **angle**. Those two quantities will become, respectively, the **amplitude** and the **phase** of the sinusoid. Nothing more from the complex plane is required right now.

For exams, this matters because combining two same-frequency sinusoids — or reading amplitude and phase from a given expression — reduces to reading the magnitude and angle of one complex number.

> **Core takeaway:** Every sinusoid of the form C cos(ω₀t + θ) can be associated with a complex constant of magnitude C and angle θ.

![Fig. B.6](/figures/page-017-fig__b_6-1.png)
*A phase shift of −60° delays the cosine C cos(ω₀t) by exactly one-sixth of its period T₀/6, sliding the waveform to the right without altering its frequency or amplitude.*

## 1. Reading Amplitude, Frequency, Period, and Phase from a Sinusoid

Take the signal x(t) = C cos(ω₀t − 60°) and read off each quantity one at a time.

- **Amplitude C** — the peak value of the oscillation. It is always a positive number.
- **Radian frequency ω₀** — how fast the signal oscillates, in radians per second.
- **Period T₀ = 2π/ω₀** — the time for one complete cycle.
- **Phase −60°** — the angle inside the cosine beyond ω₀t.

### PHASE AS A TIME SHIFT

A **negative** phase inside the cosine means the waveform is **delayed** (shifted to the right). Concretely: 60° is one-sixth of a full 360° cycle, so the delay is T₀/6. You can see this directly in the figure above — the dashed curve starts its peak one-sixth of a period later than the solid curve.

The conversion rule is:
$$\text{time shift} = \frac{\text{phase angle}}{\omega_0} = \frac{60° \times (\pi/180°)}{\omega_0} = \frac{\pi/3}{\omega_0} = \frac{T_0}{6}$$

### SINE AS A SHIFTED COSINE

Because sin(ω₀t) = cos(ω₀t − π/2), a sine wave is simply a cosine delayed by a quarter period. This means you can always convert sine to cosine form by inserting a −90° phase — no separate formula needed.

$$a\cos \omega_0 t + b\sin \omega_0 t = C\cos(\omega_0 t + \theta), \quad C = \sqrt{a^2+b^2}, \quad \theta = \tan^{-1}\!\left(\frac{-b}{a}\right)$$
*Two same-frequency sinusoids always combine into a single sinusoid at that same frequency; the resulting amplitude C and phase θ are exactly the magnitude and angle of the complex number a − jb. **Warning:** a bare calculator inverse-tangent gives an angle only in the range −90° to 90°; always check the signs of a and −b separately to confirm the correct quadrant before accepting the result.*

![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*In the phasor picture, adding two sinusoids becomes vector addition: the length of the resultant arrow gives the combined amplitude C, and the angle of that arrow gives the combined phase θ.*

## 2. Why Exponentials Encode Sinusoids So Cleanly

Start with **Euler's identity**:
$$e^{j\phi} = \cos\phi + j\sin\phi$$

Now scale by a real positive constant C and replace φ with (ω₀t + θ):
$$C\,e^{j(\omega_0 t + \theta)} = C\cos(\omega_0 t + \theta) + j\,C\sin(\omega_0 t + \theta)$$

Read that line carefully:
- The **real part** is C cos(ω₀t + θ) — the physical cosine signal.
- The **imaginary part** is C sin(ω₀t + θ) — a sine signal at the same frequency.

In engineering, the physical sinusoid is taken as the **real part** of the complex exponential. The imaginary part rides along as a mathematical companion but is not the physical signal.

### THE COMPLEX CONSTANT Ce^{jθ}

Factor the exponential:
$$C\,e^{j(\omega_0 t + \theta)} = \underbrace{C\,e^{j\theta}}_{\text{complex constant}} \cdot e^{j\omega_0 t}$$

The complex constant Ce^{jθ} carries all the amplitude and phase information:
- Its **magnitude** is C — the amplitude of the sinusoid.
- Its **angle** is θ — the phase of the sinusoid.

#### Warning

Do **not** confuse magnitude C with the real part. The real part of Ce^{jθ} is C cosθ, which is generally not equal to C. Magnitude is the length of the complex number; real part is only its horizontal coordinate.

![unknown](/figures/page-018-unknown-1.png)
*The length of the arrow from the origin to the point a − jb is the magnitude C = √(a² + b²), which is not the same as the horizontal coordinate a — the real part is only one component of the full length.*

## 3. Worked Example: Combining Cosine and Sine into One Amplitude-Phase Form

**Problem:** Write x(t) = cos ω₀t − √3 sin ω₀t as a single cosine C cos(ω₀t + θ).

**Step 1 — Identify a and b.**

Match to the template a cos ω₀t + b sin ω₀t:
$$a = 1, \qquad b = -\sqrt{3}$$

**Step 2 — Compute the amplitude.**
$$C = \sqrt{a^2 + b^2} = \sqrt{1^2 + (-\sqrt{3})^2} = \sqrt{1 + 3} = \sqrt{4} = 2$$

**Step 3 — Compute the phase.**
$$\tan\theta = \frac{-b}{a} = \frac{-(-\sqrt{3})}{1} = \sqrt{3}$$

The inverse tangent of √3 is 60°. Now check the quadrant: a = 1 > 0 and −b = √3 > 0, so the phasor a − jb = 1 + j√3 lies in **quadrant I**. Therefore θ = +60° is correct.

**Step 4 — Write the result.**
$$x(t) = 2\cos(\omega_0 t + 60°)$$

### CONNECTION TO THE COMPLEX CONSTANT

The phasor a − jb = 1 − j(−√3) = 1 + j√3 has magnitude √(1 + 3) = 2 and angle arctan(√3/1) = 60°, confirming the amplitude and phase directly.

In exponential form, the sinusoid is associated with the real part of:
$$2\,e^{j60°}\,e^{j\omega_0 t}$$

---
**📌 Key Takeaways**
- A negative phase inside cosine means a time delay; 60° of phase equals a delay of T₀/6.
- Two same-frequency sinusoids combine into one cosine: C = √(a²+b²), θ = arctan(−b/a) with quadrant check.
- Magnitude of a complex constant is its full length √(a²+b²), not its real part a — they are different quantities.

*In the next section we will keep using exponential and phasor ideas to manipulate sinusoids more efficiently.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InBoYXNlX3RpbWVfc2hpZnQiLCJsYWJlbCI6IkludGVycHJldCBwaGFzZSBhcyB0aW1lIHNoaWZ0IiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IEMgY29zKM+J4oKAdCAtIDYwwrApLCB3aGljaCBzdGF0ZW1lbnQgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIFRoZSBzaWduYWwgaXMgYWR2YW5jZWQgYnkgVOKCgC82IiwiQi4gVGhlIHNpZ25hbCBpcyBkZWxheWVkIGJ5IFTigoAvNiIsIkMuIFRoZSBhbXBsaXR1ZGUgaXMgcmVkdWNlZCB0byBDLzYiLCJELiBUaGUgZnJlcXVlbmN5IGJlY29tZXMgz4nigoAvNiJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkEgbmVnYXRpdmUgcGhhc2UgaW5zaWRlIHRoZSBjb3NpbmUgY29ycmVzcG9uZHMgdG8gYSBkZWxheSB0byB0aGUgcmlnaHQgaW4gdGltZS4gU2luY2UgNjDCsCBpcyBvbmUtc2l4dGggb2YgMzYwwrAsIHRoZSBkZWxheSBpcyBU4oKALzYuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiQW4gYWR2YW5jZSB3b3VsZCBjb3JyZXNwb25kIHRvICs2MMKwIGluIHRpbWUtc2hpZnQgbGFuZ3VhZ2UsIG5vdCBhIG1pbnVzIHNpZ24gaW5zaWRlIHRoZSBhcmd1bWVudCBoZXJlLiIsIkMiOiJQaGFzZSBzaGlmdCBjaGFuZ2VzIHRpbWluZywgbm90IGFtcGxpdHVkZS4iLCJEIjoiUGhhc2Ugc2hpZnQgZG9lcyBub3QgY2hhbmdlIGZyZXF1ZW5jeS4ifSwiaGludCI6IkNvbnZlcnQgNjDCsCB0byBhIGZyYWN0aW9uIG9mIG9uZSBmdWxsIGN5Y2xlLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJzaW51c29pZF9zaGlmdF9wbG90Iiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJTaW5jZSBzaW4oz4nigoB0KSA9IGNvcyjPieKCgHQgLSDPgC8yKSwgd2hpY2ggc3RhdGVtZW50IGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBzaW4oz4nigoB0KSBsZWFkcyBjb3Moz4nigoB0KSBieSA5MMKwIiwiQi4gc2luKM+J4oKAdCkgbGFncyBjb3Moz4nigoB0KSBieSA5MMKwIiwiQy4gc2luKM+J4oKAdCkgaGFzIHR3aWNlIHRoZSBmcmVxdWVuY3kgb2YgY29zKM+J4oKAdCkiLCJELiBzaW4oz4nigoB0KSBoYXMgc21hbGxlciBhbXBsaXR1ZGUgdGhhbiBjb3Moz4nigoB0KSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IldyaXRpbmcgc2luZSBhcyBhIGRlbGF5ZWQgY29zaW5lIHNob3dzIHRoYXQgc2luZSBvY2N1cnMgb25lIHF1YXJ0ZXItY3ljbGUgbGF0ZXIgdGhhbiBjb3NpbmUsIHNvIGl0IGxhZ3MgYnkgOTDCsC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGF0IHJldmVyc2VzIHRoZSBkaXJlY3Rpb24gb2YgdGhlIHBoYXNlIHJlbGF0aW9uc2hpcC4iLCJDIjoiVGhleSBoYXZlIHRoZSBzYW1lIM+J4oKALiIsIkQiOiJObyBhbXBsaXR1ZGUgY2hhbmdlIGlzIGltcGxpZWQuIn0sImhpbnQiOiJBIGRlbGF5IG1lYW5zIHRoZSB3YXZlZm9ybSBhcHBlYXJzIGxhdGVyIGluIHRpbWUuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJzYW1lX2ZyZXF1ZW5jeV9hZGRpdGlvbiIsImxhYmVsIjoiQ29tYmluZSBhIGNvcyDPieKCgHQgKyBiIHNpbiDPieKCgHQgaW50byBvbmUgY29zaW5lIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXcml0ZSB4KHQpID0gY29zKM+J4oKAdCkgLSDiiJozIHNpbijPieKCgHQpIGFzIGEgc2luZ2xlIGNvc2luZS4iLCJvcHRpb25zIjpbIkEuIDIgY29zKM+J4oKAdCAtIDYwwrApIiwiQi4gMiBjb3Moz4nigoB0ICsgNjDCsCkiLCJDLiAyIGNvcyjPieKCgHQgKyAzMMKwKSIsIkQuIOKImjIgY29zKM+J4oKAdCArIDYwwrApIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiSGVyZSBhID0gMSBhbmQgYiA9IC3iiJozLiBTbyBDID0g4oiaKDEgKyAzKSA9IDIgYW5kIHRhbiDOuCA9IC1iL2EgPSDiiJozLCBnaXZpbmcgzrggPSA2MMKwIGluIHRoZSBjb3JyZWN0IHF1YWRyYW50IChxdWFkcmFudCBJLCBzaW5jZSBhID4gMCBhbmQgLWIgPiAwKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGUgc2lnbiBvZiB0aGUgcGhhc2UgaXMgd3Jvbmc7IC1iL2EgaXMgcG9zaXRpdmUgaGVyZSwgc28gzrggaXMgcG9zaXRpdmUuIiwiQyI6IlRoZSBhbmdsZSBkb2VzIG5vdCBtYXRjaCB0YW4gzrggPSDiiJozLCB3aGljaCBnaXZlcyA2MMKwLCBub3QgMzDCsC4iLCJEIjoiVGhlIGFtcGxpdHVkZSBzaG91bGQgYmUgMiwgbm90IOKImjI7IGNoZWNrIEMgPSDiiJooMcKyICsgKOKImjMpwrIpID0g4oiaNCA9IDIuIn0sImhpbnQiOiJVc2UgQyA9IOKImihhwrIgKyBiwrIpIGZpcnN0LCB0aGVuIGNvbXB1dGUgdGhlIHBoYXNlIGZyb20gdGFuIM64ID0gLWIvYS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciB4KHQpID0gLTMgY29zKM+J4oKAdCkgKyA0IHNpbijPieKCgHQpLCB3aGF0IGFyZSB0aGUgY29ycmVjdCBhbXBsaXR1ZGUgYW5kIHBoYXNlIGluIHgodCkgPSBDIGNvcyjPieKCgHQgKyDOuCk/Iiwib3B0aW9ucyI6WyJBLiBDID0gNSwgzrggPSAtNTMuMcKwIiwiQi4gQyA9IDcsIM64ID0gLTEyNi45wrAiLCJDLiBDID0gNSwgzrggPSAtMTI2LjnCsCIsIkQuIEMgPSA1LCDOuCA9IDEyNi45wrAiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJXaXRoIGEgPSAtMyBhbmQgYiA9IDQsIHRoZSBhbXBsaXR1ZGUgaXMgQyA9IOKImigoLTMpwrIgKyA0wrIpID0gNS4gQWxzbyB0YW4gzrggPSAtYi9hID0gLTQvKC0zKSA9IDQvMywgYnV0IGJlY2F1c2UgYSBpcyBuZWdhdGl2ZSBhbmQgLWIgaXMgbmVnYXRpdmUsIHRoZSBwaGFzb3IgYSAtIGpiID0gLTMgLSBqNCBsaWVzIGluIHF1YWRyYW50IElJSSwgc28gdGhlIGNvcnJlY3QgYW5nbGUgaXMgLTEyNi45wrAgKGVxdWl2YWxlbnRseSAyMzMuMcKwKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGF0IGFuZ2xlIGlnbm9yZXMgdGhlIGNvcnJlY3QgcXVhZHJhbnQ7IC01My4xwrAgd291bGQgcGxhY2UgdGhlIHBoYXNvciBpbiBxdWFkcmFudCBJVi4iLCJCIjoiVGhlIGFtcGxpdHVkZSBpcyBub3QgdGhlIHN1bSBvZiBtYWduaXR1ZGVzOyBDID0g4oiaKDkgKyAxNikgPSA1LCBub3QgNy4iLCJEIjoiUG9zaXRpdmUgMTI2LjnCsCBwbGFjZXMgdGhlIHBoYXNvciBpbiBxdWFkcmFudCBJSSwgbm90IHF1YWRyYW50IElJSSB3aGVyZSBhIC0gamIgPSAtMyAtIGo0IGFjdHVhbGx5IGxpZXMuIn0sImhpbnQiOiJDaGVjayB0aGUgc2lnbnMgb2YgYm90aCB0aGUgcmVhbCBwYXJ0IGEgYW5kIGltYWdpbmFyeSBwYXJ0IC1iIHRvIGRldGVybWluZSB0aGUgY29ycmVjdCBxdWFkcmFudC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoicGhhc29yX2RpYWdyYW0iLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImNvbXBsZXhfZXhwb25lbnRpYWxfbGluayIsImxhYmVsIjoiUmVsYXRlIHNpbnVzb2lkIGZvcm0gdG8gRXVsZXIgZm9ybSBhbmQgY29tcGxleCBjb25zdGFudHMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggZXhwcmVzc2lvbiBoYXMgcmVhbCBwYXJ0IGVxdWFsIHRvIEMgY29zKM+J4oKAdCArIM64KT8iLCJvcHRpb25zIjpbIkEuIEMgZV57aijPieKCgHQgKyDOuCl9IiwiQi4gakMgZV57aijPieKCgHQgKyDOuCl9IiwiQy4gQyBlXnstaijPieKCgHQgKyDOuCl9IGhhcyByZWFsIHBhcnQgQyBzaW4oz4nigoB0ICsgzrgpIiwiRC4gQyBlXntqzrh9IGhhcyByZWFsIHBhcnQgQyBjb3Moz4nigoB0ICsgzrgpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiQnkgRXVsZXIncyBpZGVudGl0eSwgZV57as+GfSA9IGNvcyDPhiArIGogc2luIM+GLCBzbyB0aGUgcmVhbCBwYXJ0IG9mIEMgZV57aijPieKCgHQgKyDOuCl9IGlzIEMgY29zKM+J4oKAdCArIM64KS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJNdWx0aXBseWluZyBieSBqIHJvdGF0ZXMgdGhlIGV4cHJlc3Npb24gYnkgOTDCsDsgaXRzIHJlYWwgcGFydCBiZWNvbWVzIC1DIHNpbijPieKCgHQgKyDOuCksIG5vdCB0aGUgb3JpZ2luYWwgY29zaW5lLiIsIkMiOiJUaGUgcmVhbCBwYXJ0IG9mIGVeey1qz4Z9IGlzIHN0aWxsIGNvcyDPhiwgbm90IHNpbiDPhjsgdGhlIGltYWdpbmFyeSBwYXJ0IGNoYW5nZXMgc2lnbiwgbm90IHRoZSByZWFsIHBhcnQuIiwiRCI6IkMgZV57as64fSBoYXMgbm8gdGltZSBkZXBlbmRlbmNlIOKAlCBpdCBpcyBhIGZpeGVkIGNvbXBsZXggY29uc3RhbnQsIG5vdCBhIHRpbWUtdmFyeWluZyBzaW51c29pZC4ifSwiaGludCI6IkV4cGFuZCBlXntqz4Z9IHVzaW5nIEV1bGVyJ3MgaWRlbnRpdHk6IGVee2rPhn0gPSBjb3Mgz4YgKyBqIHNpbiDPhi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJtYWduaXR1ZGVfdnNfcmVhbF9wYXJ0IiwibGFiZWwiOiJEaXN0aW5ndWlzaCBtYWduaXR1ZGUgZnJvbSByZWFsIHBhcnQiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNF9xMSIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQSBzdHVkZW50IHNheXM6ICdGb3IgdGhlIGNvbXBsZXggY29uc3RhbnQgMSArIGriiJozLCB0aGUgbWFnbml0dWRlIGlzIDEgYmVjYXVzZSB0aGUgcmVhbCBwYXJ0IGlzIDEuJyBFeHBsYWluIHdoeSB0aGlzIGlzIHdyb25nIGFuZCBnaXZlIHRoZSBjb3JyZWN0IG1hZ25pdHVkZSBhbmQgYW5nbGUuIiwiaWRlYWxfYW5zd2VyIjoiVGhpcyBpcyB3cm9uZyBiZWNhdXNlIG1hZ25pdHVkZSBpcyB0aGUgbGVuZ3RoIG9mIHRoZSBjb21wbGV4IG51bWJlciwgbm90IGl0cyByZWFsIHBhcnQuIEZvciAxICsgauKImjMsIHRoZSBtYWduaXR1ZGUgaXMg4oiaKDHCsiArICjiiJozKcKyKSA9IOKImigxICsgMykgPSAyLCBhbmQgdGhlIGFuZ2xlIGlzIDYwwrAgYmVjYXVzZSB0YW4gzrggPSDiiJozLzEgPSDiiJozIGFuZCB0aGUgcG9pbnQgaXMgaW4gcXVhZHJhbnQgSSAoYm90aCByZWFsIGFuZCBpbWFnaW5hcnkgcGFydHMgYXJlIHBvc2l0aXZlKS4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IGV4cGxpY2l0bHkgZGlzdGluZ3Vpc2ggbWFnbml0dWRlIGZyb20gcmVhbCBwYXJ0IiwiTXVzdCBjb21wdXRlIHRoZSBtYWduaXR1ZGUgYXMgMiIsIk11c3QgZ2l2ZSB0aGUgYW5nbGUgYXMgNjDCsCBvciDPgC8zIiwiTXVzdCBtZW50aW9uIHF1YWRyYW50IG9yIGVxdWl2YWxlbnQgc2lnbiByZWFzb25pbmciXSwiZXhwbGFuYXRpb24iOiJUaGlzIGNoZWNrcyBhIGNvbW1vbiB0cmFwIHRoYXQgZGlyZWN0bHkgYWZmZWN0cyBhbXBsaXR1ZGUtcGhhc2UgY29udmVyc2lvbiBpbiBzaW51c29pZCBwcm9ibGVtcy4gU3R1ZGVudHMgd2hvIGNvbmZ1c2UgbWFnbml0dWRlIHdpdGggcmVhbCBwYXJ0IHdpbGwgY29uc2lzdGVudGx5IGdldCB3cm9uZyBhbXBsaXR1ZGVzLiIsImhpbnQiOiJUaGluayBvZiB0aGUgY29tcGxleCBudW1iZXIgYXMgYSBwb2ludCAoMSwg4oiaMykgaW4gdGhlIHBsYW5lLiBJdHMgZGlzdGFuY2UgZnJvbSB0aGUgb3JpZ2luIGlzIHRoZSBtYWduaXR1ZGUg4oCUIHVzZSB0aGUgUHl0aGFnb3JlYW4gdGhlb3JlbS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX1dfQ==" style="display:none;"></div>%%KC_END%%
