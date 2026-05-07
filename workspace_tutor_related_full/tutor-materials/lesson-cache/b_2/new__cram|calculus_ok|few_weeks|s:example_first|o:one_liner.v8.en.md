# B.2 Sinusoids

> **Section Objective:** Learn to read every parameter of a sinusoid, understand phase shift, and compress a cosine-plus-sine expression into a single cosine.

---

Consider x(t) = 3 cos(2π·50t − 30°). The **3** is the amplitude — how tall the wave is. The **50** is the frequency — the wave completes 50 full cycles every second. The **−30°** is the phase shift — the wave starts slightly late, shifted to the right compared to a plain cosine.

This section is about three skills you will need on exams:

1. Reading amplitude, period, frequency, and phase from a sinusoid expression.
2. Converting between frequency f₀ (in Hz) and radian frequency ω₀ (in rad/s).
3. Combining a cosine term and a sine term at the same frequency into one clean cosine.

These are mechanical skills — once you see the pattern, they become straightforward.

$$x(t) = C\cos(2\pi f_0 t + \theta) = C\cos(\omega_0 t + \theta), \quad T_0 = \frac{1}{f_0} = \frac{2\pi}{\omega_0}, \quad \omega_0 = 2\pi f_0$$
*Here **C** is the amplitude (the peak height of the wave), **f₀** is the frequency in hertz (cycles per second), **T₀** is the period in seconds (the duration of one full cycle), **ω₀** is the radian frequency in rad/s, and **θ** is the phase shift in either degrees or radians. One critical warning: never mix degrees and radians in the same calculation — pick one unit and convert everything to it before you start.*

![Fig. B.6](/figures/page-017-fig__b_6-1.png)
*These sketches show (a) a standard cosine, (b) a sine wave, and (c) a phase-shifted cosine C cos(ω₀t − 60°), making it visually clear that a negative phase angle shifts the waveform to the right by a fraction of the period.*

## 1. Sketching and Phase Shift

Start with a concrete example: **C cos(ω₀t − 60°)**.

The −60° inside the cosine means the wave is *delayed* — its graph slides to the right. How far? Since 60° is one-sixth of a full 360° cycle, the shift is exactly **T₀/6** seconds to the right. A positive phase angle would shift left (an advance); a negative phase angle shifts right (a delay).

### KEY IDENTITY

There is one special case worth memorizing:

> C cos(ω₀t − π/2) = C sin(ω₀t)

In plain language: **sine is just cosine delayed by 90°** (a quarter cycle). Equivalently, cosine leads sine by 90°.

#### Radians vs. Degrees Reminder

90° = π/2 rad, 180° = π rad, 360° = 2π rad. When a problem gives phase in degrees, keep it in degrees throughout. When it gives radians, keep radians.

**Core takeaway:** A negative phase inside cosine means a rightward (delayed) shift; sine and cosine are the same wave, just offset by a quarter cycle.

$$C\cos(\omega_0 t - \pi/2) = C\sin(\omega_0 t), \qquad C\sin(\omega_0 t + \pi/2) = C\cos(\omega_0 t)$$
*Cosine and sine are identical waveforms — one is simply the other shifted by a quarter cycle (90° or π/2 radians) in time.*

![unknown](/figures/page-018-unknown-1.png)
*The complex-plane diagram shows the point a − jb as a vector with length C and angle θ below the real axis, giving a geometric picture of exactly the amplitude and phase we need when combining sinusoids.*

## 2. Adding Same-Frequency Sinusoids

Suppose you are given:

x(t) = cos(ω₀t) − √3 sin(ω₀t)

This has two terms at the same frequency. The goal is to replace them with **one** cosine: C cos(ω₀t + θ).

The general pattern is:

a cos(ω₀t) + b sin(ω₀t) = C cos(ω₀t + θ)

Here is the key idea before using the formula: think of the pair (a, b) as a point in the complex plane, written as **a − jb**. The horizontal coordinate is a, the vertical coordinate is −b. The *length* of that vector is C, and the *angle* it makes with the positive real axis is θ.

For the example above, a = 1 and b = −√3, so:

- C = √(1² + (−√3)²) = √(1 + 3) = **2**
- θ = tan⁻¹(−b/a) = tan⁻¹(√3/1) = **60°**

Result: x(t) = 2 cos(ω₀t + 60°).

### COMMON MISTAKE

The inverse tangent function on a calculator always returns an angle between −90° and +90°. Always check the signs of a and −b to confirm the angle is in the correct quadrant.

**Core takeaway:** Two same-frequency sinusoids always combine into one; use C = √(a² + b²) and θ = tan⁻¹(−b/a), then verify the quadrant.

$$a\cos \omega_0 t + b\sin \omega_0 t = C\cos(\omega_0 t + \theta), \qquad C = \sqrt{a^2+b^2}, \qquad \theta = \tan^{-1}\!\left(\frac{-b}{a}\right)$$
*C is the amplitude of the equivalent single cosine, found as the length of the vector (a, −b), and θ is its phase angle; because tan⁻¹ only returns values in (−90°, 90°), always verify the quadrant by checking the individual signs of a and −b before finalizing θ.*

![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*These phasor diagrams show geometrically why two same-frequency sinusoids combine into one: the resultant vector has a new length C and a new angle θ, which become the amplitude and phase of the single equivalent cosine.*

---
**📌 Key Takeaways**
- T₀ = 1/f₀ = 2π/ω₀ links period, frequency in Hz, and radian frequency — know all three conversions.
- Sine lags cosine by exactly 90°: C cos(ω₀t − π/2) = C sin(ω₀t).
- Combine a cos(ω₀t) + b sin(ω₀t) into one cosine using C = √(a²+b²) and θ = tan⁻¹(−b/a), checking the quadrant.

*In the next section we will introduce complex exponentials and Euler's formula, which provide an even more powerful and unified language for describing sinusoids and their combinations.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InNpbnVzb2lkX3BhcmFtZXRlcnMiLCJsYWJlbCI6IlJlYWQgYW1wbGl0dWRlLCBmcmVxdWVuY3ksIHBlcmlvZCwgYW5kIHBoYXNlIGZyb20gYSBzaW51c29pZCIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHgodCkgPSA0Y29zKDLPgMK3MjB0ICsgMzDCsCksIHdoaWNoIHN0YXRlbWVudCBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gQW1wbGl0dWRlID0gMjAsIGZyZXF1ZW5jeSA9IDQgSHosIHBoYXNlID0gMzDCsCIsIkIuIEFtcGxpdHVkZSA9IDQsIGZyZXF1ZW5jeSA9IDIwIEh6LCBwaGFzZSA9IDMwwrAiLCJDLiBBbXBsaXR1ZGUgPSA0LCBwZXJpb2QgPSAyMCBzLCBwaGFzZSA9IDMwIHJhZCIsIkQuIEFtcGxpdHVkZSA9IDMwLCBmcmVxdWVuY3kgPSAyMCBIeiwgcGhhc2UgPSA0wrAiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgY29lZmZpY2llbnQgb3V0c2lkZSB0aGUgY29zaW5lIGlzIHRoZSBhbXBsaXR1ZGUsIHNvIEMgPSA0LiBUaGUgbnVtYmVyIG11bHRpcGx5aW5nIHQgaW5zaWRlIDLPgGbigoB0IGlzIGbigoAgPSAyMCBIeiwgYW5kIHRoZSBjb25zdGFudCBhbmdsZSBpcyB0aGUgcGhhc2UgMzDCsC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiIyMCBpcyB0aGUgZnJlcXVlbmN5LCBub3QgdGhlIGFtcGxpdHVkZS4iLCJDIjoiVGhlIHBlcmlvZCBpcyAxLzIwIHMsIG5vdCAyMCBzLCBhbmQgdGhlIHBoYXNlIGlzIGdpdmVuIGluIGRlZ3JlZXMgaGVyZSwgbm90IHJhZGlhbnMuIiwiRCI6IjMwwrAgaXMgdGhlIHBoYXNlLCBub3QgdGhlIGFtcGxpdHVkZS4ifSwiaGludCI6Ik1hdGNoIHRoZSBleHByZXNzaW9uIHRvIEMgY29zKDLPgGbigoB0ICsgzrgpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBzaW51c29pZCBoYXMgcmFkaWFuIGZyZXF1ZW5jeSDPieKCgCA9IDEwMM+AIHJhZC9zLiBXaGF0IGFyZSBpdHMgZnJlcXVlbmN5IGbigoAgYW5kIHBlcmlvZCBU4oKAPyIsIm9wdGlvbnMiOlsiQS4gZuKCgCA9IDEwMM+AIEh6LCBU4oKAID0gMS8oMTAwz4ApIHMiLCJCLiBm4oKAID0gNTAgSHosIFTigoAgPSAwLjAyIHMiLCJDLiBm4oKAID0gMTAwIEh6LCBU4oKAID0gMC4wMSBzIiwiRC4gZuKCgCA9IDI1IEh6LCBU4oKAID0gMC4wNCBzIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiU2luY2Ugz4nigoAgPSAyz4Bm4oKALCB3ZSBnZXQgZuKCgCA9IDEwMM+ALygyz4ApID0gNTAgSHouIFRoZW4gVOKCgCA9IDEvZuKCgCA9IDEvNTAgPSAwLjAyIHMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyB0cmVhdHMgz4nigoAgYXMgaWYgaXQgd2VyZSBhbHJlYWR5IHRoZSBmcmVxdWVuY3kgaW4gaGVydHosIHNraXBwaW5nIHRoZSBkaXZpc2lvbiBieSAyz4AuIiwiQyI6IlRoaXMgZm9yZ2V0cyB0aGUgZmFjdG9yIG9mIDLPgCBiZXR3ZWVuIM+J4oKAIGFuZCBm4oKALCBnaXZpbmcgdHdpY2UgdGhlIGNvcnJlY3QgZnJlcXVlbmN5LiIsIkQiOiJUaGlzIGlzIGhhbGYgdGhlIGNvcnJlY3QgZnJlcXVlbmN5LiJ9LCJoaW50IjoiVXNlIM+J4oKAID0gMs+AZuKCgCBmaXJzdCB0byBmaW5kIGbigoAsIHRoZW4gVOKCgCA9IDEvZuKCgC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InBoYXNlX3NoaWZ0X3JlbGF0aW9uc2hpcHMiLCJsYWJlbCI6IkludGVycHJldCBwaGFzZSBzaGlmdCBhbmQgdGhlIHNpbmUtY29zaW5lIHF1YXJ0ZXItY3ljbGUgcmVsYXRpb25zaGlwIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGV4cHJlc3Npb24gaXMgZXhhY3RseSBlcXVhbCB0byBDIHNpbijPieKCgHQpPyIsIm9wdGlvbnMiOlsiQS4gQyBjb3Moz4nigoB0ICsgz4AvMikiLCJCLiBDIGNvcyjPieKCgHQg4oiSIM+ALzIpIiwiQy4gQyBjb3Moz4nigoB0ICsgz4ApIiwiRC4gQyBjb3Moz4nigoB0KSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlVzaW5nIHRoZSBzdGFuZGFyZCBwaGFzZS1zaGlmdCBpZGVudGl0eSwgQyBjb3Moz4nigoB0IOKIkiDPgC8yKSA9IEMgc2luKM+J4oKAdCkuIFNpbmUgaXMgY29zaW5lIGRlbGF5ZWQgYnkgYSBxdWFydGVyIGN5Y2xlICjPgC8yIHJhZGlhbnMpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkMgY29zKM+J4oKAdCArIM+ALzIpID0g4oiSQyBzaW4oz4nigoB0KSwgbm90ICtDIHNpbijPieKCgHQpLiIsIkMiOiJBZGRpbmcgz4AgZmxpcHMgdGhlIHNpZ24gb2YgY29zaW5lLCBnaXZpbmcg4oiSQyBjb3Moz4nigoB0KS4iLCJEIjoiQ29zaW5lIGFuZCBzaW5lIGFyZSBub3QgZXF1YWwgd2l0aG91dCBhIHBoYXNlIHNoaWZ0LiJ9LCJoaW50IjoiU2luZSBpcyBjb3NpbmUgZGVsYXllZCBieSA5MMKwIOKAlCBkZWxheWVkIG1lYW5zIGEgbmVnYXRpdmUgcGhhc2UgaW5zaWRlIGNvc2luZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoYXQgZG9lcyB4KHQpID0gQyBjb3Moz4nigoB0IOKIkiA2MMKwKSByZXByZXNlbnQgcmVsYXRpdmUgdG8gQyBjb3Moz4nigoB0KT8iLCJvcHRpb25zIjpbIkEuIEFuIGFkdmFuY2UgYnkgb25lLXNpeHRoIG9mIGEgcGVyaW9kIiwiQi4gQSBkZWxheSBieSBvbmUtc2l4dGggb2YgYSBwZXJpb2QiLCJDLiBBIGRlbGF5IGJ5IG9uZS1xdWFydGVyIG9mIGEgcGVyaW9kIiwiRC4gQSBjaGFuZ2UgaW4gYW1wbGl0dWRlIG9ubHkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJTdWJ0cmFjdGluZyBhIHBoYXNlIGFuZ2xlIGluc2lkZSBjb3NpbmUgc2hpZnRzIHRoZSB3YXZlZm9ybSB0byB0aGUgcmlnaHQsIHdoaWNoIGlzIGEgZGVsYXkuIFNpbmNlIDYwwrAgaXMgMS82IG9mIDM2MMKwLCB0aGUgZGVsYXkgaXMgZXhhY3RseSBU4oKALzYuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiQSBuZWdhdGl2ZSBwaGFzZSBpbnNpZGUgY29zaW5lIGNvcnJlc3BvbmRzIHRvIGEgZGVsYXkgKHJpZ2h0d2FyZCBzaGlmdCksIG5vdCBhbiBhZHZhbmNlLiIsIkMiOiJBIHF1YXJ0ZXItY3ljbGUgZGVsYXkgd291bGQgcmVxdWlyZSA5MMKwLCBub3QgNjDCsC4iLCJEIjoiVGhlIGFtcGxpdHVkZSBDIGlzIGNvbXBsZXRlbHkgdW5jaGFuZ2VkOyBvbmx5IHRoZSB0aW1pbmcgc2hpZnRzLiJ9LCJoaW50IjoiQ29udmVydCA2MMKwIGludG8gYSBmcmFjdGlvbiBvZiAzNjDCsCB0byBmaW5kIHRoZSBmcmFjdGlvbiBvZiB0aGUgcGVyaW9kLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJzaW51c29pZF9waGFzZV9zaGlmdF9wbG90Iiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJhZGRpdGlvbl9vZl9zYW1lX2ZyZXF1ZW5jeV9zaW51c29pZHMiLCJsYWJlbCI6IkNvbWJpbmUgYSBjb3NpbmUgdGVybSBhbmQgc2luZSB0ZXJtIGludG8gb25lIGNvc2luZSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV3JpdGUgeCh0KSA9IGNvcyjPieKCgHQpIOKIkiDiiJozIHNpbijPieKCgHQpIGFzIGEgc2luZ2xlIHNpbnVzb2lkLiIsIm9wdGlvbnMiOlsiQS4gMmNvcyjPieKCgHQgKyA2MMKwKSIsIkIuIDJjb3Moz4nigoB0IOKIkiA2MMKwKSIsIkMuIOKImjIgY29zKM+J4oKAdCArIDQ1wrApIiwiRC4gMnNpbijPieKCgHQgKyA2MMKwKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IkhlcmUgYSA9IDEgYW5kIGIgPSDiiJLiiJozLCBzbyBDID0g4oiaKDHCsiArICjiiJozKcKyKSA9IOKImigxICsgMykgPSAyIGFuZCDOuCA9IHRhbuKBu8K5KOKIkmIvYSkgPSB0YW7igbvCuSjiiJozLzEpID0gNjDCsC4gVGhlcmVmb3JlIHgodCkgPSAyY29zKM+J4oKAdCArIDYwwrApLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoZSBhbXBsaXR1ZGUgMiBpcyBjb3JyZWN0LCBidXQgdGhlIHBoYXNlIHNpZ24gaXMgd3Jvbmcg4oCUIOKIkmIgPSAr4oiaMyBpcyBwb3NpdGl2ZSwgc28gzrggaXMgcG9zaXRpdmUuIiwiQyI6IkJvdGggYW1wbGl0dWRlIGFuZCBwaGFzZSBhcmUgaW5jb3JyZWN0OyB0aGlzIHdvdWxkIGNvcnJlc3BvbmQgdG8gYSA9IGIgPSAxLiIsIkQiOiJUaGlzIGlzIG5vdCBpbiBzaW5nbGUtY29zaW5lIGZvcm0gYW5kIGRvZXMgbm90IG1hdGNoIHRoZSBnaXZlbiBjb2VmZmljaWVudHMuIn0sImhpbnQiOiJJZGVudGlmeSBhID0gMSBhbmQgYiA9IOKIkuKImjMsIHRoZW4gYXBwbHkgQyA9IOKImihhwrIrYsKyKSBhbmQgzrggPSB0YW7igbvCuSjiiJJiL2EpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHgodCkgPSDiiJIzY29zKM+J4oKAdCkgKyA0c2luKM+J4oKAdCksIHdoYXQgYXJlIHRoZSBjb3JyZWN0IGFtcGxpdHVkZSBDIGFuZCBwaGFzZSDOuCBpbiB4KHQpID0gQyBjb3Moz4nigoB0ICsgzrgpPyIsIm9wdGlvbnMiOlsiQS4gQyA9IDUsIM64ID0gNTMuMcKwIiwiQi4gQyA9IDUsIM64ID0g4oiSMTI2LjnCsCIsIkMuIEMgPSA3LCDOuCA9IOKIkjEyNi45wrAiLCJELiBDID0gMSwgzrggPSAxMjYuOcKwIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiV2l0aCBhID0g4oiSMyBhbmQgYiA9IDQsIHRoZSBhbXBsaXR1ZGUgaXMgQyA9IOKImigo4oiSMynCsiArIDTCsikgPSDiiJooOSArIDE2KSA9IDUuIEZvciB0aGUgYW5nbGUsIOKIkmIvYSA9IOKIkjQvKOKIkjMpID0gNC8zLCBzbyB0YW7igbvCuSg0LzMpIOKJiCA1My4xwrAuIEhvd2V2ZXIsIGEgPSDiiJIzIGlzIG5lZ2F0aXZlIGFuZCDiiJJiID0g4oiSNCBpcyBhbHNvIG5lZ2F0aXZlLCBwbGFjaW5nIHRoZSB2ZWN0b3IgaW4gdGhlIHRoaXJkIHF1YWRyYW50LiBUaGUgY29ycmVjdCBhbmdsZSBpcyA1My4xwrAg4oiSIDE4MMKwID0g4oiSMTI2LjnCsC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiI1My4xwrAgaXMgdGhlIHJlZmVyZW5jZSBhbmdsZSBmcm9tIHRhbuKBu8K5LCBidXQgdGhlIHF1YWRyYW50IGNoZWNrIHNob3dzIHRoZSBhbmdsZSBtdXN0IGJlIGluIHRoZSB0aGlyZCBxdWFkcmFudCwgbm90IHRoZSBmaXJzdC4iLCJDIjoiVGhlIGFtcGxpdHVkZSBpcyBub3QgdGhlIHN1bSBvZiBtYWduaXR1ZGVzOyBpdCBpcyDiiJooYcKyK2LCsikgPSA1LCBub3QgNy4iLCJEIjoiQm90aCBhbXBsaXR1ZGUgYW5kIHBoYXNlIGFyZSBpbmNvcnJlY3QuIn0sImhpbnQiOiJBZnRlciBjb21wdXRpbmcgdGFu4oG7wrko4oiSYi9hKSwgY2hlY2sgdGhlIHNpZ25zIG9mIGEgYW5kIOKIkmIgdG8gY29uZmlybSB0aGUgY29ycmVjdCBxdWFkcmFudC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoicGhhc29yX2RpYWdyYW0iLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX1dfQ==" style="display:none;"></div>%%KC_END%%
