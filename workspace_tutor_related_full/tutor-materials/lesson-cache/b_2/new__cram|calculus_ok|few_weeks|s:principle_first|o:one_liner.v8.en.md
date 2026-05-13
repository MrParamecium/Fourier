# B.2 Sinusoids — Description, Phase Shifts, and Addition

> **Section Objective:** Learn to read every parameter of a sinusoid from its formula, understand how sine and cosine relate through phase shifts, and combine two same-frequency sinusoids into a single cosine expression.

---

This section is about how sinusoids are described mathematically — and how different-looking sine and cosine expressions can represent the exact same waveform.

A quick refresher on the basics: **amplitude** is the peak height of the wave, **period** is the time it takes to complete one full cycle, **frequency** is how many cycles occur per second, and **phase** is a horizontal shift that moves the wave earlier or later in time.

The two big skills you will build here are:
1. Reading all parameters directly from x(t) = C cos(2πf₀t + θ)
2. Rewriting a cos(ω₀t) + b sin(ω₀t) as a single cosine with one amplitude and one phase angle

This matters for exams because many problems disguise a simple sinusoid inside mixed sine and cosine terms.

> **Core Takeaway:** Every sinusoid, no matter how it is written, can be expressed as a single cosine with one amplitude and one phase.

$$x(t)=C\cos(2\pi f_0 t+\theta),\qquad T_0=\frac{1}{f_0},\qquad \omega_0=2\pi f_0$$
*Here C is the amplitude (peak height), f₀ is the frequency in hertz (cycles per second), T₀ is the period (seconds per cycle), and ω₀ is the radian frequency (radians per second). Do not confuse f₀ with ω₀ — they differ by a factor of 2π, so ω₀ = 2π × f₀. Always use angle units consistently within a single expression: either all degrees or all radians, never mixed.*

![Fig. B.6](/figures/page-017-fig__b_6-1.png)
*This figure shows three sinusoids side by side — C cos(ω₀t), C sin(ω₀t), and C cos(ω₀t − 60°) — illustrating that shifting a cosine to the right creates a phase delay, and that a 90° (π/2) delay transforms cosine exactly into sine.*

## 1. Reading a Sinusoid and Sketching Phase Shift

The standard form x(t) = C cos(ω₀t + θ) is read left to right: **C** is the amplitude, **ω₀** is the angular speed (how fast the wave oscillates), and **θ** is the phase (how far the wave is shifted horizontally).

### TWO SPECIAL CASES TO MEMORIZE

**Case 1 — Pure cosine:** x(t) = C cos(ω₀t) has phase θ = 0. This is the reference waveform.

**Case 2 — Pure sine:** C sin(ω₀t) = C cos(ω₀t − π/2). Sine is simply cosine delayed by a quarter-cycle (90°).

The key language to remember:
- **Right shift = delay** (subtract from the angle)
- **Left shift = advance** (add to the angle)

#### Concrete Example

x(t) = C cos(ω₀t − 60°) is a cosine delayed by 60°, which equals one-sixth of a full 360° period — so the wave starts one-sixth of a period later than C cos(ω₀t).

> **Core Takeaway:** A negative phase angle means the wave is delayed; a positive phase angle means it is advanced.

$$C\cos(\omega_0 t-\pi/2)=C\sin(\omega_0 t),\qquad C\sin(\omega_0 t+\pi/2)=C\cos(\omega_0 t)$$
*These two identities are your conversion tools between sine and cosine. A quarter-cycle shift — that is, 90° or π/2 radians — turns one into the other. The first identity says: delay cosine by a quarter-cycle and you get sine. The second says: advance sine by a quarter-cycle and you get cosine. Memorize both directions for the exam.*

![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*This figure shows phasor diagrams for two worked examples of sinusoid addition: the phasors representing each sinusoid are added like vectors, and the resultant phasor gives the amplitude and phase of the single equivalent sinusoid.*

## 2. Combining Sine and Cosine into One Sinusoid

**Main principle:** If two sinusoids share the same frequency, their sum is always another sinusoid at that same frequency. The frequency never changes — only the amplitude and phase of the result are new.

The textbook form is:

a cos(ω₀t) + b sin(ω₀t) = C cos(ω₀t + θ)

Your job is to find C and θ:
- **C = √(a² + b²)** — this is the magnitude
- **θ = tan⁻¹(−b / a)** — this is the phase angle, but the quadrant must be checked

### THE COMPLEX-NUMBER CONNECTION

Think of the pair (a, −b) as a point in the complex plane. C is its distance from the origin, and θ is the angle it makes with the positive real axis. This geometric picture is exactly why phasor diagrams work.

### COMMON MISTAKE

The inverse tangent function on a calculator always returns an angle between −90° and +90°. If the point (a, −b) lies in the second or third quadrant, the calculator gives the wrong answer. Always check the signs of both a and −b to confirm the correct quadrant.

#### Worked Example

For x(t) = −3 cos(ω₀t) + 4 sin(ω₀t): here a = −3 and b = 4, so C = √(9 + 16) = 5. The pair (a, −b) = (−3, −4) lies in the third quadrant, so the angle is approximately −126.9°, giving x(t) = 5 cos(ω₀t − 126.9°).

> **Core Takeaway:** Always use the quadrant of (a, −b) to get the correct phase angle — the arctangent alone is not enough.

$$a\cos \omega_0 t+b\sin \omega_0 t=C\cos(\omega_0 t+\theta),\qquad C=\sqrt{a^2+b^2},\qquad \theta=\tan^{-1}\!\left(\frac{-b}{a}\right)$$
*Here a is the cosine coefficient, b is the sine coefficient, C is the resulting amplitude, and θ is the resulting phase. The formula θ = tan⁻¹(−b/a) gives only a reference angle unless you verify the quadrant by checking the signs of a and −b together. If a < 0 and −b < 0, the angle is in the third quadrant and you must subtract 180° from the calculator result. This is precisely why phasor diagrams — which show the point (a, −b) visually — are so useful for avoiding quadrant errors.*

---
**📌 Key Takeaways**
- In x(t) = C cos(2πf₀t + θ): C is amplitude, f₀ is frequency in Hz, T₀ = 1/f₀, and θ is phase.
- Sine is cosine delayed by exactly one quarter-cycle: C sin(ω₀t) = C cos(ω₀t − π/2).
- Two same-frequency sinusoids sum to one sinusoid: C = √(a²+b²), θ from quadrant of (a, −b).

*In the next section we will introduce complex exponentials and Euler's formula, which give an even more powerful and compact way to represent sinusoids and analyze how systems respond to them.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlYWRfc2ludXNvaWRfcGFyYW1ldGVycyIsImxhYmVsIjoiUmVhZCBhbXBsaXR1ZGUsIHBlcmlvZCwgZnJlcXVlbmN5LCBhbmQgcGhhc2UgZnJvbSBhIHNpbnVzb2lkIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IDRjb3MoMs+Awrc1MHQg4oiSIDMwwrApLCB3aGljaCBzdGF0ZW1lbnQgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIEFtcGxpdHVkZSA9IDUwLCBmcmVxdWVuY3kgPSA0IEh6LCBwaGFzZSA9IC0zMMKwIiwiQi4gQW1wbGl0dWRlID0gNCwgZnJlcXVlbmN5ID0gNTAgSHosIHBoYXNlID0gLTMwwrAiLCJDLiBBbXBsaXR1ZGUgPSA0LCBmcmVxdWVuY3kgPSAyz4DCtzUwIEh6LCBwaGFzZSA9ICszMMKwIiwiRC4gQW1wbGl0dWRlID0gNCwgcGVyaW9kID0gNTAgcywgcGhhc2UgPSAtMzDCsCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkluIHRoZSBzdGFuZGFyZCBmb3JtIEMgY29zKDLPgGbigoB0ICsgzrgpLCBDID0gNCwgZuKCgCA9IDUwIEh6LCBhbmQgzrggPSDiiJIzMMKwLiBUaGUgbnVtYmVyIG11bHRpcGx5aW5nIHQgaW5zaWRlIHRoZSBjb3NpbmUsIGFmdGVyIGRpdmlkaW5nIG91dCAyz4AsIGdpdmVzIHRoZSBmcmVxdWVuY3kgaW4gaGVydHouIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBzd2FwcyBhbXBsaXR1ZGUgYW5kIGZyZXF1ZW5jeSDigJQgNTAgaXMgdGhlIGZyZXF1ZW5jeSwgbm90IHRoZSBhbXBsaXR1ZGUuIiwiQyI6IjLPgMK3NTAgaXMgdGhlIHJhZGlhbiBmcmVxdWVuY3kgz4nigoAsIG5vdCB0aGUgaGVydHogZnJlcXVlbmN5IGbigoAsIGFuZCB0aGUgcGhhc2Ugc2lnbiBpcyB3cm9uZy4iLCJEIjoiVGhlIHBlcmlvZCBpcyBU4oKAID0gMS9m4oKAID0gMS81MCA9IDAuMDIgcywgbm90IDUwIHMuIn0sImhpbnQiOiJNYXRjaCBlYWNoIHN5bWJvbCBkaXJlY3RseSB0byBDLCBm4oKALCBhbmQgzrggaW4gdGhlIHN0YW5kYXJkIGZvcm0gQyBjb3MoMs+AZuKCgHQgKyDOuCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJZiBhIHNpbnVzb2lkIGhhcyByYWRpYW4gZnJlcXVlbmN5IM+J4oKAID0gMjDPgCByYWQvcywgd2hhdCBpcyBpdHMgcGVyaW9kPyIsIm9wdGlvbnMiOlsiQS4gMjDPgCBzIiwiQi4gMTDPgCBzIiwiQy4gMC4xIHMiLCJELiAwLjA1IHMiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJU4oKAID0gMs+AIC8gz4nigoAgPSAyz4AgLyAoMjDPgCkgPSAxLzEwID0gMC4xIHMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBjb25mdXNlcyDPieKCgCBkaXJlY3RseSB3aXRoIHRoZSBwZXJpb2Qg4oCUIHRoZSBwZXJpb2QgaXMgbm90IM+J4oKAIGl0c2VsZi4iLCJCIjoiVGhpcyBkb2VzIG5vdCBmb2xsb3cgZnJvbSBU4oKAID0gMs+AL8+J4oKALiIsIkQiOiJBIHBlcmlvZCBvZiAwLjA1IHMgd291bGQgY29ycmVzcG9uZCB0byDPieKCgCA9IDLPgC8wLjA1ID0gNDDPgCByYWQvcy4ifSwiaGludCI6IlVzZSBU4oKAID0gMs+AL8+J4oKALCBub3QgMS/PieKCgC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InBoYXNlX3NoaWZ0X2FuZF9zaW5lX2Nvc2luZV9yZWxhdGlvbiIsImxhYmVsIjoiVXNlIHBoYXNlIHNoaWZ0IGFuZCB0aGUgc2luZS1jb3NpbmUgcXVhcnRlci1jeWNsZSByZWxhdGlvbnNoaXAiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGV4cHJlc3Npb24gaXMgZXF1YWwgdG8gQyBzaW4oz4nigoB0KT8iLCJvcHRpb25zIjpbIkEuIEMgY29zKM+J4oKAdCArIM+ALzIpIiwiQi4gQyBjb3Moz4nigoB0IOKIkiDPgC8yKSIsIkMuIEMgY29zKM+J4oKAdCArIM+AKSIsIkQuIEMgc2luKM+J4oKAdCDiiJIgz4AvMikiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJGcm9tIHRoZSBzZWN0aW9uIGlkZW50aXR5LCBDIGNvcyjPieKCgHQg4oiSIM+ALzIpID0gQyBzaW4oz4nigoB0KS4gU2luZSBpcyBjb3NpbmUgZGVsYXllZCBieSBhIHF1YXJ0ZXItY3ljbGUgKM+ALzIgcmFkaWFucykuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiQyBjb3Moz4nigoB0ICsgz4AvMikgZXF1YWxzIOKIkkMgc2luKM+J4oKAdCksIG5vdCArQyBzaW4oz4nigoB0KS4iLCJDIjoiQyBjb3Moz4nigoB0ICsgz4ApIGVxdWFscyDiiJJDIGNvcyjPieKCgHQpLCBhIGhhbGYtY3ljbGUgZmxpcC4iLCJEIjoiQyBzaW4oz4nigoB0IOKIkiDPgC8yKSBlcXVhbHMg4oiSQyBjb3Moz4nigoB0KSwgbm90IEMgc2luKM+J4oKAdCkuIn0sImhpbnQiOiJTaW5lIGlzIGNvc2luZSBkZWxheWVkIGJ5IGEgcXVhcnRlci1jeWNsZSDigJQgdGhhdCBtZWFucyBzdWJ0cmFjdGluZyDPgC8yIGluc2lkZSB0aGUgY29zaW5lLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hhdCBkb2VzIHgodCkgPSBDIGNvcyjPieKCgHQg4oiSIDYwwrApIG1lYW4gcmVsYXRpdmUgdG8gQyBjb3Moz4nigoB0KT8iLCJvcHRpb25zIjpbIkEuIEl0IGlzIGFkdmFuY2VkIGJ5IDYwwrAiLCJCLiBJdCBpcyBkZWxheWVkIGJ5IDYwwrAiLCJDLiBJdHMgYW1wbGl0dWRlIGlzIHJlZHVjZWQgYnkgNjAlIiwiRC4gSXRzIGZyZXF1ZW5jeSBpcyBpbmNyZWFzZWQgYnkgNjDCsCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkEgbWludXMgc2lnbiBpbnNpZGUgdGhlIGNvc2luZSBhcmd1bWVudCBzaGlmdHMgdGhlIGdyYXBoIHRvIHRoZSByaWdodCwgd2hpY2ggaXMgYSBkZWxheS4gVGhlIHdhdmVmb3JtIHJlYWNoZXMgaXRzIHBlYWsgNjDCsCBsYXRlciB0aGFuIEMgY29zKM+J4oKAdCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiQW4gYWR2YW5jZSAobGVmdCBzaGlmdCkgd291bGQgcmVxdWlyZSBhZGRpbmcgNjDCsCwgZ2l2aW5nIEMgY29zKM+J4oKAdCArIDYwwrApLiIsIkMiOiJQaGFzZSBzaGlmdCBhZmZlY3RzIHRpbWluZyBvbmx5IOKAlCBhbXBsaXR1ZGUgQyBpcyBjb21wbGV0ZWx5IHVuY2hhbmdlZC4iLCJEIjoiRnJlcXVlbmN5IGlzIGRldGVybWluZWQgYnkgz4nigoAsIHdoaWNoIGlzIHVuY2hhbmdlZCBoZXJlLiBEZWdyZWVzIGFyZSBub3QgZnJlcXVlbmN5IHVuaXRzLiJ9LCJoaW50IjoiUmVtZW1iZXIgdGhlIHJ1bGU6IHJpZ2h0IHNoaWZ0ID0gZGVsYXkuIEEgbmVnYXRpdmUgcGhhc2UgYW5nbGUgc2hpZnRzIHRoZSBncmFwaCB0byB0aGUgcmlnaHQuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6InNpbnVzb2lkX3BoYXNlX3NoaWZ0X3Bsb3QiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImFkZGl0aW9uX29mX3NhbWVfZnJlcXVlbmN5X3NpbnVzb2lkcyIsImxhYmVsIjoiQ29tYmluZSBhIGNvcyjPieKCgHQpICsgYiBzaW4oz4nigoB0KSBpbnRvIG9uZSBzaW51c29pZCIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV3JpdGUgeCh0KSA9IGNvcyjPieKCgHQpIOKIkiDiiJozIHNpbijPieKCgHQpIGFzIGEgc2luZ2xlIGNvc2luZS4iLCJvcHRpb25zIjpbIkEuIDJjb3Moz4nigoB0IOKIkiA2MMKwKSIsIkIuIDJjb3Moz4nigoB0ICsgNjDCsCkiLCJDLiAyY29zKM+J4oKAdCArIDMwwrApIiwiRC4gY29zKM+J4oKAdCDiiJIgNjDCsCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJIZXJlIGEgPSAxIGFuZCBiID0g4oiS4oiaMywgc28gQyA9IOKImigxwrIgKyAo4oiaMynCsikgPSDiiJooMSArIDMpID0gMi4gVGhlbiDOuCA9IHRhbuKBu8K5KOKIkmIvYSkgPSB0YW7igbvCuSjiiJozLzEpID0gNjDCsC4gVGhlIHBvaW50IChhLCDiiJJiKSA9ICgxLCDiiJozKSBpcyBpbiB0aGUgZmlyc3QgcXVhZHJhbnQsIGNvbmZpcm1pbmcgzrggPSArNjDCsC4gVGhlcmVmb3JlIHgodCkgPSAyY29zKM+J4oKAdCArIDYwwrApLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBhbXBsaXR1ZGUgMiBpcyBjb3JyZWN0LCBidXQgdGhlIHBoYXNlIHNpZ24gaXMgd3Jvbmcg4oCUIHRoZSBwb2ludCAoMSwg4oiaMykgaXMgaW4gdGhlIGZpcnN0IHF1YWRyYW50LCBnaXZpbmcgYSBwb3NpdGl2ZSBhbmdsZS4iLCJDIjoiVGhlIGFtcGxpdHVkZSBpcyBjb3JyZWN0IGJ1dCAzMMKwIGlzIG5vdCB0aGUgcmlnaHQgYW5nbGUgZm9yIHRoaXMgKGEsIOKIkmIpIHBhaXIuIiwiRCI6IlRoaXMgbWlzc2VzIHRoZSBhbXBsaXR1ZGUgY2hhbmdlIGVudGlyZWx5IOKAlCBhZGRpbmcgdHdvIHRlcm1zIGFsd2F5cyBjaGFuZ2VzIHRoZSBhbXBsaXR1ZGUuIn0sImhpbnQiOiJDb21wdXRlIEMgPSDiiJooYcKyICsgYsKyKSBmaXJzdCwgdGhlbiBmaW5kIM64IGZyb20gdGhlIHF1YWRyYW50IG9mIHRoZSBwb2ludCAoYSwg4oiSYikuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IOKIkjNjb3Moz4nigoB0KSArIDRzaW4oz4nigoB0KSwgd2hpY2ggcmVzdWx0IGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiA1Y29zKM+J4oKAdCArIDUzLjHCsCkiLCJCLiA1Y29zKM+J4oKAdCDiiJIgNTMuMcKwKSIsIkMuIDVjb3Moz4nigoB0IOKIkiAxMjYuOcKwKSIsIkQuIDdjb3Moz4nigoB0IOKIkiAxMjYuOcKwKSJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IkMgPSDiiJooKOKIkjMpwrIgKyA0wrIpID0g4oiaKDkgKyAxNikgPSA1LiBUaGUgcG9pbnQgKGEsIOKIkmIpID0gKOKIkjMsIOKIkjQpIGxpZXMgaW4gdGhlIHRoaXJkIHF1YWRyYW50LiBUaGUgcmVmZXJlbmNlIGFuZ2xlIGlzIHRhbuKBu8K5KDQvMykg4omIIDUzLjHCsCwgYnV0IHRoZSB0aGlyZC1xdWFkcmFudCBhbmdsZSBpcyDiiJIxODDCsCArIDUzLjHCsCA9IOKIkjEyNi45wrAuIFRoZXJlZm9yZSB4KHQpID0gNWNvcyjPieKCgHQg4oiSIDEyNi45wrApLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IjUzLjHCsCBpcyBvbmx5IHRoZSByZWZlcmVuY2UgYW5nbGUgYW5kIHBsYWNlcyB0aGUgcGhhc29yIGluIHRoZSBmaXJzdCBxdWFkcmFudCwgd2hpY2ggaXMgd3JvbmcuIiwiQiI6IuKIkjUzLjHCsCBwbGFjZXMgdGhlIHBoYXNvciBpbiB0aGUgZm91cnRoIHF1YWRyYW50LCBzdGlsbCB3cm9uZy4iLCJEIjoiVGhlIGFtcGxpdHVkZSBpcyDiiJooOSsxNikgPSA1LCBub3QgMyArIDQgPSA3LiBBbXBsaXR1ZGVzIGFkZCBhcyB2ZWN0b3JzLCBub3Qgc2NhbGFycy4ifSwiaGludCI6IkFmdGVyIGNvbXB1dGluZyB0aGUgcmVmZXJlbmNlIGFuZ2xlIHdpdGggYXJjdGFuZ2VudCwgYWx3YXlzIGNoZWNrIHRoZSBxdWFkcmFudCB1c2luZyB0aGUgc2lnbnMgb2YgYm90aCBhIGFuZCDiiJJiLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJwaGFzb3JfZGlhZ3JhbSIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfV19" style="display:none;"></div>%%KC_END%%
