# B.2 Sinusoids

> **Section Objective:** Learn to read amplitude, period, and phase from a sinusoid expression, understand the 90° relationship between sine and cosine, and combine two same-frequency sinusoids into one.

Start with a concrete signal: **x(t) = 3 cos(2π·50 t − 30°)**. The **3** is the amplitude — how tall the wave is. The **50** is the frequency in hertz — the wave completes 50 full cycles every second. The **−30°** is the phase shift — the cosine graph is nudged slightly to the right compared to a plain cosine.

This section covers three tasks that appear repeatedly on exams: reading off C, f₀, T₀, ω₀, and θ from a formula; converting between frequency and period; and collapsing a sum like a cos + b sin into a single cosine. Complex numbers will appear briefly — think of them simply as a 2D arrow with a length and an angle. Nothing more is needed here.

$$x(t) = C\cos(2\pi f_0 t + \theta), \qquad T_0 = \frac{1}{f_0}, \qquad \omega_0 = 2\pi f_0$$
*Read this formula left to right: **C** is the amplitude (the peak height of the wave), **f₀** is the frequency in hertz (cycles per second), **T₀ = 1/f₀** is the period (how many seconds one full cycle takes), **ω₀ = 2πf₀** is the radian frequency (the same speed measured in radians per second instead of cycles per second), and **θ** is the phase shift (how much the cosine is slid left or right). One important warning: **never mix degrees and radians inside the same problem.** If θ is given in degrees, convert everything to degrees; if it is in radians, stay in radians throughout.*

![Fig. B.6](/figures/page-017-fig__b_6-1.png)
*This figure shows cosine, sine, and a phase-shifted cosine on the same time axis, making the phase shift visible as a horizontal displacement — C cos(ω₀t − 60°) is simply C cos(ω₀t) slid one-sixth of a period to the right.*

## 1. Reading a Sinusoid Quickly

Take **x(t) = C cos(ω₀ t − 60°)**. The negative sign on the phase means the graph is **delayed** — the peak that would appear at t = 0 for a plain cosine now appears later, shifted to the right on the time axis. A positive phase would shift the peak to the left (earlier in time).

One full cycle of a cosine spans **360° = 2π radians**. So a phase shift of −60° corresponds to a time delay of 60/360 = 1/6 of one period, or T₀/6 seconds.

### SPECIAL CASES TO KNOW

Two cases come up constantly:

- **C cos(ω₀ t)** — the baseline cosine, zero phase shift.
- **C sin(ω₀ t) = C cos(ω₀ t − π/2)** — sine is just cosine delayed by a quarter cycle.

Put plainly: **sine lags cosine by 90°**, and equivalently **cosine leads sine by 90°**. This is not a formula to memorize blindly — it is simply saying that the sine wave's peak arrives one quarter-cycle later than the cosine wave's peak.

#### Quick Check

If you see sin in a problem and need everything in cosine form, replace sin(ω₀ t) with cos(ω₀ t − π/2) and proceed.

$$C\cos(\omega_0 t - \pi/2) = C\sin(\omega_0 t), \qquad C\sin(\omega_0 t + \pi/2) = C\cos(\omega_0 t)$$
*These are quarter-cycle shift identities — no blind memorization needed, just a physical picture. **First identity:** take a cosine wave and slide it to the right by π/2 radians (one quarter of a full cycle). The result is exactly a sine wave. **Second identity:** take a sine wave and slide it to the left by π/2 radians. The result is exactly a cosine wave. In both cases, the amplitude C is unchanged — only the timing shifts. Shifting right means subtracting from the phase; shifting left means adding to the phase.*

![unknown](/figures/page-018-unknown-1.png)
*In this diagram the horizontal coordinate is the cosine coefficient a, the vertical coordinate is −b (note the negative sign), the length of the arrow is C, and the angle the arrow makes with the positive real axis is θ.*

## 2. Turning a cos + b sin into One Sinusoid

Suppose you are given **x(t) = cos(ω₀ t) − √3 sin(ω₀ t)**. Two sinusoids at the same frequency can always be merged into one. The answer here is **x(t) = 2 cos(ω₀ t + 60°)** — let's see exactly why.

The general template is:

> a cos(ω₀ t) + b sin(ω₀ t) = C cos(ω₀ t + θ)

Here a = 1 and b = −√3. The magnitude is straightforward: **C = √(a² + b²) = √(1 + 3) = 2**.

For the angle θ, form the complex number **a − jb** (horizontal part a, vertical part −b). In this example that is 1 − j(−√3) = 1 + j√3. This arrow points into the first quadrant at 60°, so **θ = 60°**.

### COMMON MISTAKE

Students often write a + jb instead of **a − jb**. The sign flip on b is not a typo — it comes directly from expanding C cos(ω₀ t + θ) using the cosine addition formula, which gives a = C cos θ and **b = −C sin θ**. The vertical component of the complex number is −b, not b.

### CALCULATOR QUADRANT CARE

Inverse tangent (tan⁻¹) only returns angles between −90° and +90°. Always plot the point (a, −b) on a quick sketch to confirm which quadrant the angle actually lives in before trusting the calculator output.

#### Worked Example

a = 1, b = −√3 → point (1, +√3) → first quadrant → θ = +60°. Result: **2 cos(ω₀ t + 60°)**.

$$a\cos \omega_0 t + b\sin \omega_0 t = C\cos(\omega_0 t + \theta), \qquad C = \sqrt{a^2+b^2}, \qquad \theta = \tan^{-1}\!\left(\frac{-b}{a}\right)$$
*This formula compresses two same-frequency sinusoids — one cosine and one sine — into a single cosine at the same frequency. The amplitude C is the straight-line distance from the origin to the point (a, −b) in the complex plane. The angle θ is the direction of that same point. **Important caution:** the formula θ = tan⁻¹(−b/a) can give the wrong answer if you apply it mechanically without checking the quadrant. Always verify the signs of both a and −b to confirm the angle is in the correct quadrant. For example, if a is negative and −b is also negative, the point is in the third quadrant and θ must be between −180° and −90° — a range that tan⁻¹ alone will never return.*

![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*These phasor diagrams show how the horizontal component a and vertical component −b combine as a 2D arrow whose length is C and whose angle is θ, giving the single resultant sinusoid C cos(ω₀ t + θ).*

---
**📌 Key Takeaways**
- In C cos(2πf₀ t + θ): C = amplitude, f₀ = frequency (Hz), T₀ = 1/f₀, ω₀ = 2πf₀, θ = phase.
- Sine lags cosine by 90°: sin(ω₀ t) = cos(ω₀ t − π/2); cosine leads sine by 90°.
- To combine a cos(ω₀ t) + b sin(ω₀ t): use C = √(a²+b²) and θ = tan⁻¹(−b/a).
- Sign trap: use a − jb (not a + jb); the vertical component is −b, so always check the quadrant.
- Likely exam tasks: read C/f₀/T₀/θ from a formula, convert f₀ ↔ ω₀, collapse a cos + b sin into one cosine.

*In the next section we will keep using these sinusoid and phasor ideas as a foundation.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlYWRfc2ludXNvaWRfcGFyYW1ldGVycyIsImxhYmVsIjoiUmVhZGluZyBhbXBsaXR1ZGUsIGZyZXF1ZW5jeSwgcGVyaW9kLCBhbmQgcGhhc2UgZnJvbSBhIHNpbnVzb2lkIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IDQgY29zKDLPgMK3MjUgdCAtIDMwwrApLCB3aGljaCBzdGF0ZW1lbnQgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIEFtcGxpdHVkZSA9IDI1LCBmcmVxdWVuY3kgPSA0IEh6LCBwaGFzZSA9IC0zMMKwIiwiQi4gQW1wbGl0dWRlID0gNCwgZnJlcXVlbmN5ID0gMjUgSHosIHBoYXNlID0gLTMwwrAiLCJDLiBBbXBsaXR1ZGUgPSA0LCBwZXJpb2QgPSAyNSBzLCBwaGFzZSA9ICszMMKwIiwiRC4gQW1wbGl0dWRlID0gLTMwLCBmcmVxdWVuY3kgPSAyNSBIeiwgcGhhc2UgPSA0wrAiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJJbiB4KHQpID0gQyBjb3MoMs+AZuKCgCB0ICsgzrgpLCB0aGUgY29lZmZpY2llbnQgb3V0c2lkZSBjb3NpbmUgaXMgYW1wbGl0dWRlLCB0aGUgbnVtYmVyIG11bHRpcGx5aW5nIHQgaW5zaWRlIDLPgCggKSBpcyBmcmVxdWVuY3kgaW4gaGVydHosIGFuZCB0aGUgY29uc3RhbnQgYW5nbGUgaXMgcGhhc2UuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBzd2FwcyBhbXBsaXR1ZGUgYW5kIGZyZXF1ZW5jeS4iLCJDIjoiVGhlIHBlcmlvZCBpcyAxLzI1IHMsIG5vdCAyNSBzLCBhbmQgdGhlIHBoYXNlIGlzIG5lZ2F0aXZlIGhlcmUuIiwiRCI6IkFtcGxpdHVkZSBpcyBub3QgdGFrZW4gZnJvbSB0aGUgcGhhc2UgdGVybS4ifSwiaGludCI6Ik1hdGNoIHRoZSBleHByZXNzaW9uIHRvIEMgY29zKDLPgGbigoAgdCArIM64KSB0ZXJtIGJ5IHRlcm0uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJZiBhIHNpbnVzb2lkIGhhcyBmcmVxdWVuY3kgZuKCgCA9IDIwMCBIeiwgd2hhdCBpcyBpdHMgcGVyaW9kIFTigoA/Iiwib3B0aW9ucyI6WyJBLiAyMDAgcyIsIkIuIDAuNSBzIiwiQy4gMC4wMDUgcyIsIkQuIDQwMM+AIHMiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJQZXJpb2QgYW5kIGZyZXF1ZW5jeSBhcmUgcmVjaXByb2NhbHM6IFTigoAgPSAxL2bigoAgPSAxLzIwMCA9IDAuMDA1IHMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhhdCBlcXVhbHMgZuKCgCwgbm90IGl0cyByZWNpcHJvY2FsLiIsIkIiOiJUaGF0IHdvdWxkIGNvcnJlc3BvbmQgdG8gMiBIei4iLCJEIjoiVGhpcyBjb25mdXNlcyBwZXJpb2Qgd2l0aCByYWRpYW4tZnJlcXVlbmN5IGNvbnZlcnNpb25zLiJ9LCJoaW50IjoiVXNlIFTigoAgPSAxL2bigoAuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJwaGFzZV9zaGlmdF9hbmRfc2luZV9jb3NpbmVfcmVsYXRpb24iLCJsYWJlbCI6IlF1YXJ0ZXItY3ljbGUgcmVsYXRpb24gYmV0d2VlbiBzaW5lIGFuZCBjb3NpbmUiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggaWRlbnRpdHkgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIGNvcyjPieKCgCB0ICsgz4AvMikgPSBzaW4oz4nigoAgdCkiLCJCLiBjb3Moz4nigoAgdCAtIM+ALzIpID0gc2luKM+J4oKAIHQpIiwiQy4gc2luKM+J4oKAIHQgLSDPgC8yKSA9IGNvcyjPieKCgCB0KSIsIkQuIHNpbijPieKCgCB0KSBsYWdzIGNvcyjPieKCgCB0KSBieSAxODDCsCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkEgcmlnaHQgc2hpZnQgb2YgY29zaW5lIGJ5IM+ALzIgcHJvZHVjZXMgc2luZTogY29zKM+J4oKAIHQg4oiSIM+ALzIpID0gc2luKM+J4oKAIHQpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBzaWduIGlzIHdyb25nOyB0aGlzIGdpdmVzIOKIknNpbijPieKCgCB0KS4iLCJDIjoiVGhpcyBpZGVudGl0eSBpcyBub3QgY29ycmVjdCBhcyB3cml0dGVuLiIsIkQiOiJUaGUgbGFnIGlzIDkwwrAsIG5vdCAxODDCsC4ifSwiaGludCI6IlJlbWVtYmVyOiBzaW5lIGxhZ3MgY29zaW5lIGJ5IDkwwrAuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoiY29tYmluZV9zYW1lX2ZyZXF1ZW5jeV9zaW51c29pZHMiLCJsYWJlbCI6IkNvbWJpbmluZyBhIGNvcyjPieKCgCB0KSArIGIgc2luKM+J4oKAIHQpIGludG8gb25lIHNpbnVzb2lkIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJSZXdyaXRlIHgodCkgPSBjb3Moz4nigoAgdCkgLSDiiJozIHNpbijPieKCgCB0KSBhcyBhIHNpbmdsZSBjb3NpbmUuIiwib3B0aW9ucyI6WyJBLiAyIGNvcyjPieKCgCB0IC0gNjDCsCkiLCJCLiAyIGNvcyjPieKCgCB0ICsgNjDCsCkiLCJDLiAyIGNvcyjPieKCgCB0ICsgMzDCsCkiLCJELiDiiJoyIGNvcyjPieKCgCB0ICsgNjDCsCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJIZXJlIGEgPSAxIGFuZCBiID0g4oiS4oiaMy4gU28gQyA9IOKImigxICsgMykgPSAyIGFuZCDOuCBpcyBmb3VuZCBmcm9tIGEg4oiSIGpiID0gMSArIGriiJozLCB3aGljaCBoYXMgYW5nbGUgKzYwwrAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlIG1hZ25pdHVkZSBpcyByaWdodCwgYnV0IHRoZSBzaWduIG9mIHRoZSBwaGFzZSBpcyB3cm9uZy4iLCJDIjoiVGhlIGFuZ2xlIGlzIG5vdCAzMMKwLiIsIkQiOiJUaGUgbWFnbml0dWRlIHNob3VsZCBiZSAyLCBub3Qg4oiaMi4ifSwiaGludCI6IlVzZSBDID0g4oiaKGHCsitiwrIpLCB0aGVuIGRldGVybWluZSDOuCBmcm9tIGEg4oiSIGpiLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJwaGFzb3JfZGlhZ3JhbV9zYW1lX2ZyZXF1ZW5jeV9hZGRpdGlvbiIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHgodCkgPSAtMyBjb3Moz4nigoAgdCkgKyA0IHNpbijPieKCgCB0KSwgd2hpY2ggcGFpciAoQywgzrgpIGlzIGNvcnJlY3QgaW4geCh0KSA9IEMgY29zKM+J4oKAIHQgKyDOuCk/Iiwib3B0aW9ucyI6WyJBLiBDID0gNSwgzrggPSA1My4xwrAiLCJCLiBDID0gNSwgzrggPSAtMTI2LjnCsCIsIkMuIEMgPSA3LCDOuCA9IC0xMjYuOcKwIiwiRC4gQyA9IDEsIM64ID0gMTI2LjnCsCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkMgPSDiiJooKC0zKcKyICsgNMKyKSA9IDUuIFRoZSBtYXRjaGluZyBjb21wbGV4IG51bWJlciBpcyBhIOKIkiBqYiA9IOKIkjMg4oiSIGo0LCB3aGljaCBsaWVzIGluIHRoZSB0aGlyZCBxdWFkcmFudCwgZ2l2aW5nIM64ID0g4oiSMTI2LjnCsC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiI1My4xwrAgaXMgdGhlIHdyb25nIHF1YWRyYW50LiIsIkMiOiJUaGUgbWFnbml0dWRlIGlzIDUsIG5vdCA3LiIsIkQiOiJOZWl0aGVyIHRoZSBtYWduaXR1ZGUgbm9yIHRoZSBhbmdsZSBpcyBjb3JyZWN0LiJ9LCJoaW50IjoiQ2hlY2sgc2lnbnMgb2YgYSBhbmQg4oiSYiBiZWZvcmUgdHJ1c3RpbmcgYXJjdGFuZ2VudC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoiY29tcGxleF9wbGFuZV9xdWFkcmFudF9jaGVjayIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMyIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQSBzdHVkZW50IHVzZXMgzrggPSB0YW7igbvCuShiL2EpIHdoZW4gY29udmVydGluZyBhIGNvcyjPieKCgCB0KSArIGIgc2luKM+J4oKAIHQpIGludG8gQyBjb3Moz4nigoAgdCArIM64KS4gRXhwbGFpbiB0aGUgc2lnbiBtaXN0YWtlIGluIG9uZSBvciB0d28gc2VudGVuY2VzLiIsImlkZWFsX2Fuc3dlciI6IkZvciBDIGNvcyjPieKCgCB0ICsgzrgpLCB0aGUgbWF0Y2hpbmcgY29lZmZpY2llbnRzIGFyZSBhID0gQyBjb3MgzrggYW5kIGIgPSDiiJJDIHNpbiDOuCwgc28gdGhlIGFuZ2xlIG11c3QgY29tZSBmcm9tIHRhbiDOuCA9ICjiiJJiKS9hLiBFcXVpdmFsZW50bHksIHVzZSB0aGUgY29tcGxleCBudW1iZXIgYSDiiJIgamIsIG5vdCBhICsgamIuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBtZW50aW9uIHRoYXQgYiBtYXRjaGVzIOKIkkMgc2luIM64LCBub3QgK0Mgc2luIM64IiwiTXVzdCBzdGF0ZSB0YW4gzrggPSAo4oiSYikvYSBvciBtZW50aW9uIGEg4oiSIGpiIiwiTXVzdCBjbGVhcmx5IGlkZW50aWZ5IHRoaXMgYXMgYSBzaWduLWNvbnZlbnRpb24gaXNzdWUiXSwiZXhwbGFuYXRpb24iOiJUaGlzIGNoZWNrcyB3aGV0aGVyIHRoZSBzdHVkZW50IHVuZGVyc3RhbmRzIHRoZSBtb3N0IGNvbW1vbiBleGFtIHRyYXAgaW5zdGVhZCBvZiBvbmx5IG1lbW9yaXppbmcgZm9ybXVsYXMuIiwiaGludCI6IkV4cGFuZCBDIGNvcyjPieKCgCB0ICsgzrgpIGZpcnN0LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfV19" style="display:none;"></div>%%KC_END%%
