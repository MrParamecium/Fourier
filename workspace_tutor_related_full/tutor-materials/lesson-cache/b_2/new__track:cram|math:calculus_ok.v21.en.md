# B.2 Sinusoids — Parameters and Combining

> **Exam Payoff:** This section is tested in exactly two ways: (1) read amplitude, frequency, and phase directly from x(t) = C cos(ω₀t + θ), and (2) compress a cos ω₀t + b sin ω₀t into one cosine.

---

**Must-memorize relations:**

- x(t) = C cos(ω₀t + θ)
- T₀ = 1/f₀
- ω₀ = 2πf₀

**Quick example:** x(t) = 3 cos(20πt − 30°) → C = 3, ω₀ = 20π rad/s, f₀ = 10 Hz, T₀ = 0.1 s, θ = −30°.

### THREE TRAPS TO AVOID

- Confusing ω₀ (rad/s) with f₀ (Hz) — they differ by a factor of 2π.
- Mixing degree and radian units in the same expression.
- Using tan⁻¹(−b/a) blindly — this gives the wrong quadrant when a < 0.

![Fig. B.6](/figures/page-017-fig__b_6-1.png)
*Shifting a cosine right by 60° produces C cos(ω₀t − 60°); a 90° right-shift converts cosine into sine — both are exam-standard phase relationships you must recognize instantly.*

## 1. Read a Sinusoid Fast

Given x(t) = C cos(ω₀t + θ), every parameter is directly visible:

| Parameter | Where it lives | Unit |
|-----------|---------------|------|
| Amplitude C | coefficient in front of cos | same as signal units |
| Radian frequency ω₀ | coefficient of t | rad/s |
| Phase θ | constant added inside cos | degrees or radians |
| Hertz frequency f₀ | f₀ = ω₀ / 2π | Hz |
| Period T₀ | T₀ = 1 / f₀ | seconds |

---

### WORKED EXAMPLE

Given: x(t) = 3 cos(20πt − 30°)

**Step 1 — Amplitude:** The coefficient in front of cos is **C = 3**.

**Step 2 — Radian frequency:** The coefficient of t is **ω₀ = 20π rad/s**.

**Step 3 — Hertz frequency:** f₀ = ω₀ / 2π = 20π / 2π = **f₀ = 10 Hz**.

**Step 4 — Period:** T₀ = 1 / f₀ = 1 / 10 = **T₀ = 0.1 s**.

**Step 5 — Phase:** The constant inside cos is **θ = −30°**.

#### Warning

Do NOT write θ = −30° and then substitute radians elsewhere in the same expression. Pick one unit system and stay in it.

---

### FAST RECOGNITION LIST

1. **C** is always the multiplier outside cos — never the coefficient of t.
2. **ω₀** is always the coefficient of t — divide by 2π to get f₀.
3. **θ** is always the leftover constant inside cos — its sign tells you whether the wave leads (+) or lags (−).

$$x(t)=C\cos(\omega_0 t+\theta),\qquad T_0=\frac{1}{f_0},\qquad \omega_0=2\pi f_0=\frac{2\pi}{T_0}$$
*This is the core parameter-reading box: C sets the wave's height, θ sets its horizontal shift, and T₀, f₀, ω₀ are three interchangeable descriptions of the same repetition rate connected by these two formulas.*

![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*Phasor addition converts separate cosine and sine terms into one vector whose length gives the combined amplitude C and whose angle gives the phase θ — this is the geometric heart of the a cos + b sin formula.*

## 2. Fast Method for Adding Same-Frequency Sinusoids

Whenever you see a cos ω₀t + b sin ω₀t, you can always collapse it into one cosine:

> **Recipe:** Build the complex number **a − jb** (real part = a, imaginary part = −b). Its magnitude is C; its angle is θ.

---

### WHY a − jb AND NOT a + jb

The sine term enters with a **minus** sign in the rectangular form. Students who write a + jb get the angle sign wrong every time. The rule is:

- Real part of the complex number = **a** (cosine coefficient)
- Imaginary part of the complex number = **−b** (negative of the sine coefficient)

---

### WORKED EXAMPLE

Given: x(t) = −3 cos ω₀t + 4 sin ω₀t

**Step 1 — Identify a and b:** a = −3, b = 4.

**Step 2 — Compute C:** C = √(a² + b²) = √(9 + 16) = **C = 5**.

**Step 3 — Build a − jb:** a − jb = −3 − j4.

**Step 4 — Find the angle:** The point (−3, −4) lies in **quadrant III**. The reference angle is tan⁻¹(4/3) ≈ 53.1°. Because the point is in quadrant III, the principal angle is **θ = −(180° − 53.1°) = −126.9°**.

**Step 5 — Write the answer:** x(t) = **5 cos(ω₀t − 126.9°)**.

---

### COMMON MISTAKE

A student computes tan⁻¹(−b/a) = tan⁻¹(4/3) ≈ 53.1° and stops there. That is the reference angle only. Because the actual point (a, −b) = (−3, −4) is in quadrant III, the correct principal angle is −126.9°, not 53.1°. **Always plot (a, −b) mentally before writing the angle.**

$$a\cos\omega_0 t+b\sin\omega_0 t=C\cos(\omega_0 t+\theta),\qquad C=\sqrt{a^2+b^2},\qquad \theta=\arg(a-jb)$$
*This is the shortest exam rule: plot the point (a, −b) in the complex plane, then its distance from the origin is C and its angle measured from the positive real axis is θ.*

---

**📌 Key Takeaways**
- From x(t) = C cos(ω₀t + θ): C is the multiplier, ω₀ is the coefficient of t, θ is the leftover constant.
- Convert freely: T₀ = 1/f₀ and ω₀ = 2πf₀ — never confuse rad/s with Hz.
- To combine a cos + b sin: build point (a, −b), its magnitude is C and its angle is θ.

*In the next section we will keep using these sinusoid and phasor rules in more applied settings.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlYWRfc2ludXNvaWRfcGFyYW1ldGVycyIsImxhYmVsIjoiUmVhZCBhbXBsaXR1ZGUsIHBoYXNlLCBwZXJpb2QsIGZyZXF1ZW5jeSwgYW5kIHJhZGlhbiBmcmVxdWVuY3kgZnJvbSBhIHNpbnVzb2lkIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IDRjb3MoMTAwz4B0IOKIkiA0NcKwKSwgd2hpY2ggc3RhdGVtZW50IGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBBbXBsaXR1ZGUgPSA0LCBm4oKAID0gMTAwz4AgSHosIFTigoAgPSAxLygxMDDPgCkgcyIsIkIuIEFtcGxpdHVkZSA9IDQsIM+J4oKAID0gMTAwz4AgcmFkL3MsIGbigoAgPSA1MCBIeiIsIkMuIEFtcGxpdHVkZSA9IDEwMM+ALCBwaGFzZSA9IDQ1wrAsIGbigoAgPSA0IEh6IiwiRC4gQW1wbGl0dWRlID0gNCwgz4nigoAgPSA1MCByYWQvcywgcGhhc2UgPSDiiJI0NSByYWQiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJJbiB4KHQpID0gQyBjb3Moz4nigoB0ICsgzrgpLCBDID0gNCBhbmQgz4nigoAgPSAxMDDPgCByYWQvcy4gQ29udmVydGluZzogZuKCgCA9IM+J4oKAIC8gKDLPgCkgPSAxMDDPgCAvICgyz4ApID0gNTAgSHosIGFuZCBU4oKAID0gMS81MCBzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IjEwMM+AIGlzIHRoZSByYWRpYW4gZnJlcXVlbmN5IGluIHJhZC9zLCBub3QgdGhlIGhlcnR6IGZyZXF1ZW5jeS4gWW91IG11c3QgZGl2aWRlIGJ5IDLPgCB0byBnZXQgSHouIiwiQyI6IjEwMM+AIGlzIHRoZSBjb2VmZmljaWVudCBvZiB0LCB3aGljaCBpcyDPieKCgCDigJQgaXQgaXMgbm90IHRoZSBhbXBsaXR1ZGUuIiwiRCI6IlRoZSBwaGFzZSDiiJI0NcKwIGlzIGdpdmVuIGluIGRlZ3JlZXMgaW4gdGhpcyBleHByZXNzaW9uLCBub3QgcmFkaWFucywgYW5kIM+J4oKAID0gMTAwz4AsIG5vdCA1MC4ifSwiaGludCI6IlJlYWQgdGhlIGNvZWZmaWNpZW50IG9mIHQgZmlyc3Qg4oCUIHRoYXQgaXMgz4nigoAuIFRoZW4gY29udmVydCB3aXRoIGbigoAgPSDPieKCgCAvICgyz4ApLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBzaW51c29pZCBoYXMgcGVyaW9kIFTigoAgPSAwLjAyIHMuIFdoYXQgYXJlIGbigoAgYW5kIM+J4oKAPyIsIm9wdGlvbnMiOlsiQS4gZuKCgCA9IDUwIEh6LCDPieKCgCA9IDEwMM+AIHJhZC9zIiwiQi4gZuKCgCA9IDAuMDIgSHosIM+J4oKAID0gMC4wNM+AIHJhZC9zIiwiQy4gZuKCgCA9IDI1IEh6LCDPieKCgCA9IDUwz4AgcmFkL3MiLCJELiBm4oKAID0gMTAwIEh6LCDPieKCgCA9IDIwMM+AIHJhZC9zIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiZuKCgCA9IDEvVOKCgCA9IDEvMC4wMiA9IDUwIEh6LiBUaGVuIM+J4oKAID0gMs+AZuKCgCA9IDLPgCDDlyA1MCA9IDEwMM+AIHJhZC9zLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoaXMgcmV2ZXJzZXMgdGhlIHBlcmlvZC1mcmVxdWVuY3kgcmVsYXRpb25zaGlwIOKAlCBmcmVxdWVuY3kgaXMgdGhlIHJlY2lwcm9jYWwgb2YgcGVyaW9kLCBub3QgZXF1YWwgdG8gaXQuIiwiQyI6IkJvdGggdmFsdWVzIGFyZSBleGFjdGx5IGhhbGYgdGhlIGNvcnJlY3QgYW5zd2VyIOKAlCBhIGZhY3Rvci1vZi0yIGVycm9yIHNvbWV3aGVyZSBpbiB0aGUgY2hhaW4uIiwiRCI6IkJvdGggdmFsdWVzIGFyZSBleGFjdGx5IHR3aWNlIHRoZSBjb3JyZWN0IGFuc3dlciDigJQgY2hlY2sgdGhlIHJlY2lwcm9jYWwgc3RlcCBhZ2Fpbi4ifSwiaGludCI6IlN0YXJ0IHdpdGggZuKCgCA9IDEvVOKCgCBmaXJzdCwgdGhlbiBtdWx0aXBseSBieSAyz4AgdG8gZ2V0IM+J4oKALiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoicGhhc2Vfc2hpZnRfc2luZV9jb3NpbmUiLCJsYWJlbCI6IlJlY29nbml6ZSBjb3NpbmUtc2luZSBwaGFzZSBzaGlmdCByZWxhdGlvbnNoaXBzIiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggaWRlbnRpdHkgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIEMgY29zKM+J4oKAdCArIM+ALzIpID0gQyBzaW4gz4nigoB0IiwiQi4gQyBjb3Moz4nigoB0IOKIkiDPgC8yKSA9IEMgc2luIM+J4oKAdCIsIkMuIEMgc2luKM+J4oKAdCDiiJIgz4AvMikgPSBDIGNvcyDPieKCgHQiLCJELiBDIHNpbijPieKCgHQpID0gQyBjb3Mgz4nigoB0Il0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiQSBjb3NpbmUgZGVsYXllZCAoc2hpZnRlZCByaWdodCkgYnkgOTDCsCBiZWNvbWVzIHNpbmU6IEMgY29zKM+J4oKAdCDiiJIgz4AvMikgPSBDIHNpbiDPieKCgHQuIFNpbmUgbGFncyBjb3NpbmUgYnkgOTDCsC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJBICvPgC8yIHNoaWZ0IGFkdmFuY2VzIHRoZSBjb3NpbmUsIGdpdmluZyBDIGNvcyjPieKCgHQgKyDPgC8yKSA9IOKIkkMgc2luIM+J4oKAdCwgbm90ICtDIHNpbiDPieKCgHQuIiwiQyI6IlRoZSBjb3JyZWN0IGlkZW50aXR5IGluIHRoaXMgZGlyZWN0aW9uIGlzIEMgc2luKM+J4oKAdCArIM+ALzIpID0gQyBjb3Mgz4nigoB0IOKAlCB0aGUgc2lnbiBpbnNpZGUgaXMgcG9zaXRpdmUuIiwiRCI6IlNpbmUgYW5kIGNvc2luZSBhcmUgbm90IGVxdWFsIOKAlCB0aGV5IGFyZSBvZmZzZXQgYnkgOTDCsC4ifSwiaGludCI6IlJlbWVtYmVyOiBzaW5lIGxhZ3MgY29zaW5lIGJ5IDkwwrAsIHNvIGNvc2luZSBtdXN0IGJlIGRlbGF5ZWQgKG1pbnVzIHNpZ24pIHRvIGJlY29tZSBzaW5lLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJ3YXZlZm9ybV9zaGlmdCIsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6InNpbmdsZV9zaW51c29pZF9mcm9tX2Fjb3NfYnNpbiIsImxhYmVsIjoiQ29udmVydCBhIGNvcyDPieKCgHQgKyBiIHNpbiDPieKCgHQgaW50byBvbmUgY29zaW5lIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJSZXdyaXRlIHgodCkgPSBjb3Mgz4nigoB0IOKIkiDiiJozIHNpbiDPieKCgHQgYXMgYSBzaW5nbGUgY29zaW5lLiIsIm9wdGlvbnMiOlsiQS4gMmNvcyjPieKCgHQgKyA2MMKwKSIsIkIuIDJjb3Moz4nigoB0IOKIkiA2MMKwKSIsIkMuIDJjb3Moz4nigoB0ICsgMzDCsCkiLCJELiDiiJoyIGNvcyjPieKCgHQgKyA2MMKwKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IkhlcmUgYSA9IDEgYW5kIGIgPSDiiJLiiJozLiBUaGVuIEMgPSDiiJooMcKyICsgKOKImjMpwrIpID0g4oiaKDEgKyAzKSA9IDIuIEJ1aWxkIGEg4oiSIGpiID0gMSDiiJIgaijiiJLiiJozKSA9IDEgKyBq4oiaMy4gVGhpcyBwb2ludCAoMSwg4oiaMykgaXMgaW4gcXVhZHJhbnQgSSwgc28gzrggPSB0YW7igbvCuSjiiJozLzEpID0gNjDCsC4gVGhlcmVmb3JlIHgodCkgPSAyY29zKM+J4oKAdCArIDYwwrApLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoZSBhbmdsZSBpcyBuZWdhdGl2ZSBoZXJlLCBidXQgdGhlIHBvaW50ICgxLCDiiJozKSBpcyBpbiBxdWFkcmFudCBJIOKAlCB0aGUgYW5nbGUgbXVzdCBiZSBwb3NpdGl2ZS4iLCJDIjoiVGhlIG1hZ25pdHVkZSBpcyBjb3JyZWN0IGJ1dCB0aGUgYW5nbGUgaXMgd3Jvbmcg4oCUIHRhbuKBu8K5KOKImjMpID0gNjDCsCwgbm90IDMwwrAuIiwiRCI6IlRoZSBtYWduaXR1ZGUgc2hvdWxkIGJlIDIsIG5vdCDiiJoyLiBDaGVjazog4oiaKDEgKyAzKSA9IDIuIn0sImhpbnQiOiJCdWlsZCB0aGUgY29tcGxleCBudW1iZXIgYSDiiJIgamIgKG5vdCBhICsgamIpLCB0aGVuIGZpbmQgaXRzIG1hZ25pdHVkZSBhbmQgYW5nbGUuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6InBoYXNvcl9kaWFncmFtIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IOKIkjNjb3Mgz4nigoB0ICsgNHNpbiDPieKCgHQsIHdoYXQgaXMgdGhlIHByaW5jaXBhbC12YWx1ZSBzaW5nbGUtc2ludXNvaWQgZm9ybT8iLCJvcHRpb25zIjpbIkEuIDVjb3Moz4nigoB0ICsgNTMuMcKwKSIsIkIuIDVjb3Moz4nigoB0IOKIkiA1My4xwrApIiwiQy4gNWNvcyjPieKCgHQg4oiSIDEyNi45wrApIiwiRC4gN2NvcyjPieKCgHQg4oiSIDEyNi45wrApIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiYSA9IOKIkjMsIGIgPSA0LCBzbyBDID0g4oiaKDkgKyAxNikgPSA1LiBCdWlsZCBhIOKIkiBqYiA9IOKIkjMg4oiSIGo0LiBUaGUgcG9pbnQgKOKIkjMsIOKIkjQpIGxpZXMgaW4gcXVhZHJhbnQgSUlJLiBSZWZlcmVuY2UgYW5nbGUgPSB0YW7igbvCuSg0LzMpIOKJiCA1My4xwrAuIFByaW5jaXBhbCBhbmdsZSBpbiBxdWFkcmFudCBJSUkgPSDiiJIoMTgwwrAg4oiSIDUzLjHCsCkgPSDiiJIxMjYuOcKwLiBBbnN3ZXI6IDVjb3Moz4nigoB0IOKIkiAxMjYuOcKwKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiI1My4xwrAgaXMgb25seSB0aGUgcmVmZXJlbmNlIGFuZ2xlLiBUaGUgYWN0dWFsIHBvaW50ICjiiJIzLCDiiJI0KSBpcyBpbiBxdWFkcmFudCBJSUksIHNvIHRoZSBhbmdsZSBjYW5ub3QgYmUgcG9zaXRpdmUgYW5kIHNtYWxsLiIsIkIiOiLiiJI1My4xwrAgd291bGQgcGxhY2UgdGhlIHBvaW50IGluIHF1YWRyYW50IElWLCBidXQgKOKIkjMsIOKIkjQpIGlzIGluIHF1YWRyYW50IElJSS4iLCJEIjoiVGhlIG1hZ25pdHVkZSBpcyDiiJooOSArIDE2KSA9IDUsIG5vdCA3LiBDaGVjayB5b3VyIGFyaXRobWV0aWMuIn0sImhpbnQiOiJQbG90IHRoZSBwb2ludCAoYSwg4oiSYikgPSAo4oiSMywg4oiSNCkgbWVudGFsbHkg4oCUIHdoaWNoIHF1YWRyYW50IGlzIGl0IGluPyBUaGF0IGRldGVybWluZXMgdGhlIGFuZ2xlLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJwaGFzb3JfZGlhZ3JhbSIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMyIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQSBzdHVkZW50IGNvbXB1dGVzIM64ID0gdGFu4oG7wrko4oiSYi9hKSBmb3IgYSA9IOKIkjMgYW5kIGIgPSA0IGFuZCBnZXRzIDUzLjHCsC4gRXhwbGFpbiB3aHkgdGhhdCBhbnN3ZXIgaXMgaW5jb21wbGV0ZSBhbmQgZ2l2ZSB0aGUgY29ycmVjdCBwcmluY2lwYWwgYW5nbGUuIiwiaWRlYWxfYW5zd2VyIjoiVGhlIGludmVyc2UgdGFuZ2VudCBmdW5jdGlvbiByZXR1cm5zIG9ubHkgYSByZWZlcmVuY2UgYW5nbGUgYW5kIGNhbm5vdCBkZXRlcm1pbmUgdGhlIGNvcnJlY3QgcXVhZHJhbnQgb24gaXRzIG93bi4gU2luY2UgYSDiiJIgamIgPSDiiJIzIOKIkiBqNCwgdGhlIHBvaW50IChhLCDiiJJiKSA9ICjiiJIzLCDiiJI0KSBsaWVzIGluIHF1YWRyYW50IElJSS4gVGhlIHJlZmVyZW5jZSBhbmdsZSBpcyB0YW7igbvCuSg0LzMpIOKJiCA1My4xwrAsIGJ1dCB0aGUgcHJpbmNpcGFsIGFuZ2xlIGluIHF1YWRyYW50IElJSSBpcyDiiJIoMTgwwrAg4oiSIDUzLjHCsCkgPSDiiJIxMjYuOcKwLiBUaGUgY29ycmVjdCBhbnN3ZXIgaXMgzrggPSDiiJIxMjYuOcKwLCBub3QgNTMuMcKwLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3Qgc3RhdGUgdGhhdCB0YW7igbvCuSBhbG9uZSBjYW5ub3QgZGV0ZXJtaW5lIHRoZSBjb3JyZWN0IHF1YWRyYW50IiwiTXVzdCBpZGVudGlmeSB0aGUgcmVsZXZhbnQgcG9pbnQgYXMgKGEsIOKIkmIpID0gKOKIkjMsIOKIkjQpIG9yIGVxdWl2YWxlbnQiLCJNdXN0IGdpdmUgdGhlIGNvcnJlY3QgcHJpbmNpcGFsIGFuZ2xlIOKIkjEyNi45wrAiXSwiZXhwbGFuYXRpb24iOiJUaGlzIHF1ZXN0aW9uIHRhcmdldHMgdGhlIGhpZ2hlc3QtcmlzayB0cmFwIGluIHRoZXNlIHByb2JsZW1zOiBjb21wdXRpbmcgYSBudW1lcmljYWwgaW52ZXJzZSB0YW5nZW50IHdpdGhvdXQgY2hlY2tpbmcgd2hpY2ggcXVhZHJhbnQgdGhlIHBvaW50IGFjdHVhbGx5IG9jY3VwaWVzLiIsImhpbnQiOiJGaW5kIHRoZSByZWZlcmVuY2UgYW5nbGUgZmlyc3QsIHRoZW4gZGV0ZXJtaW5lIHRoZSBxdWFkcmFudCBmcm9tIHRoZSBzaWducyBvZiBhIGFuZCDiiJJiIHNlcGFyYXRlbHkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3E0IiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBjb21wbGV4IG51bWJlciBzaG91bGQgeW91IGNvbnZlcnQgdG8gcG9sYXIgZm9ybSB0byByZXdyaXRlIGEgY29zIM+J4oKAdCArIGIgc2luIM+J4oKAdCBhcyBDIGNvcyjPieKCgHQgKyDOuCk/Iiwib3B0aW9ucyI6WyJBLiBhICsgamIiLCJCLiBiICsgamEiLCJDLiBhIOKIkiBqYiIsIkQuIOKIkmEgKyBqYiJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlRoZSBmb3JtdWxhIGEgY29zIM+J4oKAdCArIGIgc2luIM+J4oKAdCA9IEMgY29zKM+J4oKAdCArIM64KSByZXF1aXJlcyBidWlsZGluZyB0aGUgcmVjdGFuZ3VsYXIgY29tcGxleCBudW1iZXIgYSDiiJIgamIuIEl0cyBtYWduaXR1ZGUgZ2l2ZXMgQyBhbmQgaXRzIGFuZ2xlIGdpdmVzIM64LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6ImEgKyBqYiBpcyB0aGUgbW9zdCBjb21tb24gc2lnbiB0cmFwIOKAlCB1c2luZyBpdCBnaXZlcyB0aGUgd3JvbmcgYW5nbGUgc2lnbiBmb3IgdGhlIHBoYXNlLiIsIkIiOiJUaGlzIHN3YXBzIHRoZSByb2xlcyBvZiBhIGFuZCBiIGVudGlyZWx5LCB3aGljaCBpcyBpbmNvcnJlY3QuIiwiRCI6Ik5lZ2F0aW5nIHRoZSByZWFsIHBhcnQgaGFzIG5vIGp1c3RpZmljYXRpb24gZnJvbSB0aGUgZm9ybXVsYSBkZXJpdmF0aW9uLiJ9LCJoaW50IjoiVGhlIHNpbmUgY29lZmZpY2llbnQgYiBlbnRlcnMgd2l0aCBhIG1pbnVzIHNpZ24gaW4gdGhlIHJlY3Rhbmd1bGFyIGZvcm0g4oCUIHRoZSBpbWFnaW5hcnkgcGFydCBpcyDiiJJiLCBub3QgK2IuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19XX0=" style="display:none;"></div>%%KC_END%%
