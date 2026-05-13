# B.2 Sinusoids

> **Section Objective:** Learn to read every parameter of a sinusoid, understand phase as a time shift, and combine a cosine and a sine term into one clean sinusoid.

---

Consider x(t) = 3 cos(2π · 50t − 60°). At a glance, this tells you the signal oscillates 50 times per second, has a peak value of 3, and its peak arrives slightly late — shifted right by 60° relative to a plain cosine.

This section teaches you to decode exactly that kind of expression. You will identify **amplitude**, **frequency**, **period**, **radian frequency**, and **phase** from any sinusoid. You will also learn to combine terms like a cos(ω₀t) + b sin(ω₀t) into a single cosine with one amplitude and one phase angle.

### WHY THIS MATTERS FOR THE EXAM

Exam questions routinely ask you to extract T₀, f₀, ω₀, and θ from a given expression, or to determine which signal leads or lags another, or to collapse a cosine-plus-sine sum into one sinusoid. Every skill in this section appears on assessments.

$$x(t)=C\cos(2\pi f_0 t+\theta)=C\cos(\omega_0 t+\theta),\quad \omega_0=2\pi f_0,\quad T_0=\frac{1}{f_0}=\frac{2\pi}{\omega_0}$$
*Here **C** is the amplitude (peak value), **f₀** is the frequency in hertz (cycles per second), **ω₀** is the radian frequency (radians per second), **T₀** is the period (seconds per cycle), and **θ** is the phase shift (the horizontal offset of the waveform). Always keep θ in one unit throughout a problem — mixing degrees and radians in the same calculation is one of the most common sources of error on exams.*

![Fig. B.6](/figures/page-017-fig__b_6-1.png)
*Cosine, sine, and a phase-shifted cosine are identical waveform shapes — the only difference is how far each is shifted horizontally, which is the entire meaning of phase.*

## 1. Phase Shift, Period, and Lead/Lag

Take C cos(ω₀t − 60°) as a concrete starting point. The negative sign inside the cosine means the peak arrives **later** than it would for a plain cosine — the graph slides to the **right** by 60°. Since one full cycle spans 360°, a 60° delay is exactly one-sixth of a cycle.

This generalizes cleanly: a phase of −φ shifts the waveform right by φ/360° of one period; a phase of +φ shifts it left.

### KEY IDENTITY

A particularly important special case is:

$$C\cos\!\left(\omega_0 t - \tfrac{\pi}{2}\right) = C\sin(\omega_0 t)$$

This means **sine is just a cosine delayed by 90°** (one quarter-cycle). In lead/lag language:

- sin(ω₀t) **lags** cos(ω₀t) by 90°
- cos(ω₀t) **leads** sin(ω₀t) by 90°

#### Remember

A 90° shift equals a quarter-period delay. A 180° shift flips the sign of the signal entirely.

## 2. Adding a Cosine and a Sine Into One Sinusoid

Suppose you are given x(t) = cos(ω₀t) − √3 sin(ω₀t). Two terms, same frequency — they can always be merged into one cosine.

The general rule is:

$$a\cos(\omega_0 t) + b\sin(\omega_0 t) = C\cos(\omega_0 t + \theta)$$

Think of **a** as the horizontal (real) component and **b** as the vertical (imaginary) component of a phasor. The sine term contributes through the identity b sin(ω₀t) = b cos(ω₀t − π/2), rotating the phasor downward by 90°.

The compact recipe is:

$$C = \sqrt{a^2 + b^2}, \qquad \theta = \tan^{-1}\!\left(\frac{-b}{a}\right)$$

For the example above, a = 1 and b = −√3, giving C = 2 and θ = 60°, so x(t) = 2 cos(ω₀t + 60°).

### COMMON MISTAKE

Your calculator's inverse tangent always returns an angle between −90° and +90°. If the phasor point (a, −b) falls in the second or third quadrant, the calculator answer is **wrong by 180°**. Always check the signs of a and b before accepting the angle.

$$a\cos(\omega_0 t)+b\sin(\omega_0 t)=C\cos(\omega_0 t+\theta),\qquad C=\sqrt{a^2+b^2},\qquad \theta=\tan^{-1}\!\left(\frac{-b}{a}\right)$$
*The values C and θ are exactly the magnitude and angle of the complex number a − jb: its distance from the origin gives C, and its angle in the complex plane gives θ. The critical warning is that θ must be placed in the quadrant consistent with the signs of a and −b — never blindly copy the calculator's output, because the arctangent function cannot distinguish between opposite quadrants on its own.*

![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*The phasor diagram converts a cosine-plus-sine sum into vector addition, so the final amplitude C and phase angle θ can be read directly from the resultant arrow's length and direction.*

---
**📌 Key Takeaways**
- In C cos(ω₀t + θ): C is amplitude, f₀ is frequency, T₀ = 1/f₀, θ is phase.
- Convert radian frequency: f₀ = ω₀ / (2π); period: T₀ = 2π / ω₀.
- sin(ω₀t) lags cos(ω₀t) by exactly 90° (one quarter-cycle).
- To combine a cos + b sin: use C = √(a² + b²) and θ = tan⁻¹(−b/a).
- Always verify θ is in the correct quadrant using the signs of a and b.

*In the next section we will build on this sinusoid and phasor viewpoint.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlYWRfYmFzaWNfcGFyYW1ldGVycyIsImxhYmVsIjoiUmVhZCBhbXBsaXR1ZGUsIHBlcmlvZCwgZnJlcXVlbmN5LCByYWRpYW4gZnJlcXVlbmN5LCBhbmQgcGhhc2UgZnJvbSBhIHNpbnVzb2lkIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IDQgY29zKDLPgCDCtyAyNXQg4oiSIDMwwrApLCB3aGljaCBzdGF0ZW1lbnQgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIEFtcGxpdHVkZSA9IDI1LCBwZXJpb2QgPSA0IHMiLCJCLiBBbXBsaXR1ZGUgPSA0LCBmcmVxdWVuY3kgPSAyNSBIeiwgcGVyaW9kID0gMC4wNCBzIiwiQy4gQW1wbGl0dWRlID0gNCwgcmFkaWFuIGZyZXF1ZW5jeSA9IDI1IHJhZC9zIiwiRC4gUGhhc2UgPSArMzDCsCwgcGVyaW9kID0gMjUgcyJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBjb2VmZmljaWVudCA0IGlzIHRoZSBhbXBsaXR1ZGUuIFNpbmNlIHRoZSB0ZXJtIGlzIDLPgCDCtyAyNXQsIHRoZSBmcmVxdWVuY3kgaXMgMjUgSHogYW5kIFTigoAgPSAxLzI1ID0gMC4wNCBzLiBUaGUgcGhhc2UgaXMg4oiSMzDCsCwgbm90ICszMMKwLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IjI1IGlzIHRoZSBmcmVxdWVuY3ksIG5vdCB0aGUgYW1wbGl0dWRlOyB0aGUgcGVyaW9kIGlzIDEvMjUsIG5vdCA0IHMuIiwiQyI6Is+J4oKAID0gMs+AZuKCgCA9IDUwz4AgcmFkL3MsIG5vdCAyNSByYWQvcy4iLCJEIjoiVGhlIHNpZ24gb2YgdGhlIHBoYXNlIGlzIHdyb25nIGFuZCB0aGUgcGVyaW9kIGlzIGNvbXBsZXRlbHkgaW5jb3JyZWN0LiJ9LCJoaW50IjoiTWF0Y2ggeCh0KSA9IEMgY29zKDLPgGbigoB0ICsgzrgpIHRlcm0gYnkgdGVybS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgc2ludXNvaWQgaGFzIM+J4oKAID0gMTAwz4AgcmFkL3MuIFdoYXQgYXJlIGbigoAgYW5kIFTigoA/Iiwib3B0aW9ucyI6WyJBLiBm4oKAID0gMTAwz4AgSHosIFTigoAgPSAxLygxMDDPgCkgcyIsIkIuIGbigoAgPSA1MCBIeiwgVOKCgCA9IDAuMDIgcyIsIkMuIGbigoAgPSAxMDAgSHosIFTigoAgPSAwLjAxIHMiLCJELiBm4oKAID0gMjUgSHosIFTigoAgPSAwLjA0IHMiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJVc2UgZuKCgCA9IM+J4oKAIC8gKDLPgCkgPSAxMDDPgCAvICgyz4ApID0gNTAgSHosIHRoZW4gVOKCgCA9IDEvZuKCgCA9IDAuMDIgcy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIGZvcmdldHMgdGhlIGNvbnZlcnNpb24gZnJvbSByYWRpYW4gZnJlcXVlbmN5IHRvIGhlcnR6LiIsIkMiOiJUaGlzIGlzIG9mZiBieSBhIGZhY3RvciBvZiAyLiIsIkQiOiJUaGlzIGlzIG9mZiBieSBhIGZhY3RvciBvZiAyIGFnYWluLiJ9LCJoaW50IjoiRGl2aWRlIGJ5IDLPgCBmaXJzdCwgdGhlbiBpbnZlcnQgZm9yIHRoZSBwZXJpb2QuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJwaGFzZV9zaGlmdF9hbmRfbGVhZGxhZyIsImxhYmVsIjoiSW50ZXJwcmV0IHBoYXNlIHNoaWZ0IGFzIHRpbWUgc2hpZnQgYW5kIGlkZW50aWZ5IGxlYWQvbGFnIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBzdGF0ZW1lbnQgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIHNpbijPieKCgHQpIGxlYWRzIGNvcyjPieKCgHQpIGJ5IDkwwrAiLCJCLiBjb3Moz4nigoB0KSBsYWdzIHNpbijPieKCgHQpIGJ5IDkwwrAiLCJDLiBzaW4oz4nigoB0KSBsYWdzIGNvcyjPieKCgHQpIGJ5IDkwwrAiLCJELiBjb3Moz4nigoB0IOKIkiA5MMKwKSA9IOKIknNpbijPieKCgHQpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiRnJvbSBjb3Moz4nigoB0IOKIkiDPgC8yKSA9IHNpbijPieKCgHQpLCB0aGUgc2luZSB3YXZlIGlzIGEgZGVsYXllZCBjb3NpbmUsIHNvIHNpbmUgbGFncyBjb3NpbmUgYnkgOTDCsC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIHJldmVyc2VzIHRoZSBkaXJlY3Rpb24gb2YgdGhlIHBoYXNlIHJlbGF0aW9uc2hpcC4iLCJCIjoiQ29zaW5lIGFjdHVhbGx5IGxlYWRzIHNpbmUgYnkgOTDCsC4iLCJEIjoiY29zKM+J4oKAdCDiiJIgOTDCsCkgPSBzaW4oz4nigoB0KSwgbm90IG5lZ2F0aXZlIHNpbmUuIn0sImhpbnQiOiJBc2sgd2hpY2ggd2F2ZWZvcm0gbXVzdCBiZSBzaGlmdGVkIHJpZ2h0IHRvIGJlY29tZSB0aGUgb3RoZXIuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AyX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJUaGUgc2lnbmFsIGNvcyjPieKCgHQg4oiSIDYwwrApIGlzIG9idGFpbmVkIGZyb20gY29zKM+J4oKAdCkgYnkiLCJvcHRpb25zIjpbIkEuIHNoaWZ0aW5nIGxlZnQgYnkgb25lLXNpeHRoIG9mIGEgY3ljbGUiLCJCLiBzaGlmdGluZyByaWdodCBieSBvbmUtc2l4dGggb2YgYSBjeWNsZSIsIkMuIGluY3JlYXNpbmcgYW1wbGl0dWRlIGJ5IDYwJSIsIkQuIGNoYW5naW5nIGZyZXF1ZW5jeSBieSA2MMKwIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiQSBuZWdhdGl2ZSBwaGFzZSBpbnNpZGUgY29zaW5lIGNvcnJlc3BvbmRzIHRvIGEgZGVsYXksIHNvIHRoZSBncmFwaCBzaGlmdHMgcmlnaHQuIFNpbmNlIDYwwrAgaXMgb25lLXNpeHRoIG9mIDM2MMKwLCB0aGUgc2hpZnQgaXMgb25lLXNpeHRoIG9mIGEgY3ljbGUuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiTGVmdCBzaGlmdCB3b3VsZCBjb3JyZXNwb25kIHRvIGEgcGhhc2UgYWR2YW5jZSwgbm90IGEgZGVsYXkuIiwiQyI6IlBoYXNlIHNoaWZ0IGRvZXMgbm90IGNoYW5nZSBhbXBsaXR1ZGUuIiwiRCI6IkRlZ3JlZXMgZGVzY3JpYmUgcGhhc2UgaGVyZSwgbm90IGZyZXF1ZW5jeS4ifSwiaGludCI6Ik5lZ2F0aXZlIHBoYXNlIGluIGNvcyjPieKCgHQg4oiSIM+GKSBtZWFucyBkZWxheS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoid2F2ZWZvcm1fc2hpZnRfbWF0cGxvdGxpYiIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiY29tYmluZV9zaW51c29pZHNfaW50b19zaW5nbGVfc2ludXNvaWQiLCJsYWJlbCI6IlJld3JpdGUgYSBjb3NpbmUtc2luZSBzdW0gYXMgb25lIGNvc2luZSB1c2luZyBhbXBsaXR1ZGUgYW5kIHBoYXNlIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXcml0ZSB4KHQpID0gY29zKM+J4oKAdCkg4oiSIOKImjMgc2luKM+J4oKAdCkgYXMgYSBzaW5nbGUgc2ludXNvaWQuIiwib3B0aW9ucyI6WyJBLiAyIGNvcyjPieKCgHQgKyA2MMKwKSIsIkIuIDIgY29zKM+J4oKAdCDiiJIgNjDCsCkiLCJDLiAyIHNpbijPieKCgHQgKyA2MMKwKSIsIkQuIGNvcyjPieKCgHQgKyAzMMKwKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IkhlcmUgYSA9IDEgYW5kIGIgPSDiiJLiiJozLiBTbyBDID0g4oiaKDEgKyAzKSA9IDIgYW5kIM64ID0gdGFu4oG7wrko4oiSYi9hKSA9IHRhbuKBu8K5KOKImjMpID0gNjDCsCwgZ2l2aW5nIDIgY29zKM+J4oKAdCArIDYwwrApLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoZSBzaWduIG9mIM64IGlzIHdyb25nIGZvciB0aGVzZSBjb2VmZmljaWVudHMuIiwiQyI6IlRoaXMgaXMgbm90IHRoZSBzdGFuZGFyZCB0YXJnZXQgZm9ybSBhbmQgZG9lcyBub3QgbWF0Y2ggZGlyZWN0bHkuIiwiRCI6IlRoZSBhbXBsaXR1ZGUgaXMgd3JvbmcgYW5kIHRoZSBhbmdsZSBpcyB3cm9uZy4ifSwiaGludCI6IlVzZSBDID0g4oiaKGHCsiArIGLCsikgYW5kIM64IGZyb20gdGhlIHNpZ25zIG9mIGEgYW5kIGIuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6InBoYXNvcl9hZGRpdGlvbl9tYXRwbG90bGliIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IOKIkjMgY29zKM+J4oKAdCkgKyA0IHNpbijPieKCgHQpLCB3aGF0IGlzIHRoZSBjb3JyZWN0IHNpbmdsZS1zaW51c29pZCBmb3JtIGluIHByaW5jaXBhbC1hbmdsZSBmb3JtPyIsIm9wdGlvbnMiOlsiQS4gNSBjb3Moz4nigoB0IOKIkiA1My4xwrApIiwiQi4gNSBjb3Moz4nigoB0ICsgNTMuMcKwKSIsIkMuIDUgY29zKM+J4oKAdCDiiJIgMTI2LjnCsCkiLCJELiA1IGNvcyjPieKCgHQgKyAxMjYuOcKwKSJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6ImEgPSDiiJIzIGFuZCBiID0gNCwgc28gQyA9IDUgYW5kIM64ID0gdGFu4oG7wrko4oiSYi9hKSA9IHRhbuKBu8K5KDQvMyksIGJ1dCB0aGUgcG9pbnQgKGEsIOKIkmIpID0gKOKIkjMsIOKIkjQpIGxpZXMgaW4gcXVhZHJhbnQgSUlJLCBzbyB0aGUgcHJpbmNpcGFsIGFuZ2xlIGlzIOKIkjEyNi45wrAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyB1c2VzIHRoZSB3cm9uZyBxdWFkcmFudC4iLCJCIjoiQm90aCBzaWduIGFuZCBxdWFkcmFudCBhcmUgd3JvbmcuIiwiRCI6IlRoaXMgYW5nbGUgcG9pbnRzIHRvIHF1YWRyYW50IElJLCBub3QgdGhlIGNvcnJlY3QgbG9jYXRpb24uIn0sImhpbnQiOiJCdWlsZCB0aGUgY29tcGxleCBudW1iZXIgYSDiiJIgamIgYW5kIHBsYWNlIGl0IGluIHRoZSBjb3JyZWN0IHF1YWRyYW50LiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJjb21wbGV4X3BsYW5lX3BoYXNvcl9tYXRwbG90bGliIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJjb25jZXB0dWFsX3F1YWRyYW50X2NoZWNrIiwibGFiZWwiOiJFeHBsYWluIHdoeSBpbnZlcnNlIHRhbmdlbnQgYWxvbmUgY2FuIG1pc2lkZW50aWZ5IHRoZSBwaGFzZSBhbmdsZSIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDRfcTEiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IldoeSBjYW4gdGhlIGNhbGN1bGF0b3IgdmFsdWUgb2YgdGFu4oG7wrko4oiSYi9hKSBiZSBpbnN1ZmZpY2llbnQgd2hlbiBjb252ZXJ0aW5nIGEgY29zKM+J4oKAdCkgKyBiIHNpbijPieKCgHQpIGludG8gQyBjb3Moz4nigoB0ICsgzrgpPyIsImlkZWFsX2Fuc3dlciI6IkJlY2F1c2UgaW52ZXJzZSB0YW5nZW50IGFsb25lIG1heSByZXR1cm4gYW4gYW5nbGUgaW4gdGhlIHdyb25nIHF1YWRyYW50LiBUaGUgY29ycmVjdCDOuCBtdXN0IG1hdGNoIHRoZSBzaWducyBvZiB0aGUgaG9yaXpvbnRhbCBhbmQgdmVydGljYWwgY29tcG9uZW50cyBvZiB0aGUgcGhhc29yLCBlcXVpdmFsZW50bHkgdGhlIGNvbXBsZXggbnVtYmVyIGEg4oiSIGpiLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3QgbWVudGlvbiB3cm9uZy1xdWFkcmFudCByaXNrIiwiTXVzdCByZWZlciB0byBzaWducyBvZiBjb21wb25lbnRzIG9yIGEg4oiSIGpiIiwiTXVzdCBzdGF0ZSB0aGF0IM64IG11c3QgYmUgYWRqdXN0ZWQgdG8gdGhlIGNvcnJlY3QgYW5nbGUiXSwiZXhwbGFuYXRpb24iOiJUaGlzIGNoZWNrcyB3aGV0aGVyIHRoZSBzdHVkZW50IHVuZGVyc3RhbmRzIHRoZSBtYWluIGV4YW0gdHJhcCwgbm90IGp1c3QgdGhlIGZvcm11bGEuIiwiaGludCI6IlRoaW5rIGFib3V0IHRoZSBwb2ludCByZXByZXNlbnRlZCBieSBhIOKIkiBqYiBpbiB0aGUgY29tcGxleCBwbGFuZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
