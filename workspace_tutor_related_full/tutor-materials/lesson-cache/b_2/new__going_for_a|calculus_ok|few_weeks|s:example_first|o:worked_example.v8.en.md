# B.2 Sinusoids

> **Section Objective:** Learn to read every parameter of a sinusoid, understand what phase shift means in time, and collapse a cosine-plus-sine sum into a single cosine.

---

Start with a concrete signal: **x(t) = 3 cos(2π · 50t − 30°)**.

This one expression already contains four pieces of information: the wave swings between −3 and +3 (amplitude), it completes one full cycle every 1/50 s (period), it repeats 50 times per second (frequency), and it starts 30° behind the reference cosine (phase).

This section teaches you to extract all four pieces from any sinusoid, to decide whether one sinusoid leads or lags another in time, and to rewrite a sum like a cos(ω₀t) + b sin(ω₀t) as a single cosine.

### WHY THIS MATTERS FOR THE EXAM

Exam questions routinely ask you to identify amplitude, period, frequency, and phase; compare two signals for lead vs. lag; and combine two same-frequency sinusoids into one. All three tasks are covered here.

$$x(t)=C\cos(2\pi f_0 t+\theta)=C\cos(\omega_0 t+\theta),\quad \omega_0=2\pi f_0,\quad T_0=\frac{1}{f_0}=\frac{2\pi}{\omega_0}$$
*Here **C** is the amplitude (the peak value of the wave), **f₀** is the frequency measured in hertz (cycles per second), **ω₀** is the radian frequency measured in radians per second, **θ** is the phase (the initial angular offset), and **T₀** is the period (the duration of one full cycle). A very common exam mistake is to treat ω₀ as if it were measured in hertz — it is not; ω₀ = 2πf₀, so it is always 2π times larger than f₀ and its unit is rad/s, never Hz.*

![Fig. B.6](/figures/page-017-fig__b_6-1.png)
*Three sinusoids are shown together: (a) C cos(ω₀t) — the reference cosine, (b) C sin(ω₀t) — the reference sine, and (c) C cos(ω₀t − 60°) — a delayed cosine. Notice that curve (c) is a copy of curve (a) shifted to the right by exactly one-sixth of a period (T₀/6). This rightward shift in the graph is the direct visual signature of the negative phase angle −60°: phase becomes visible in time as a horizontal displacement of the waveform.*

## 1. Phase Shift, Time Shift, and Lead/Lag

Look at **C cos(ω₀t − 60°)** from the figure. The signal is identical to C cos(ω₀t) except that every feature — every peak, every zero crossing — arrives later in time. That delay is the physical meaning of the negative phase angle.

### HOW TO CONVERT PHASE TO TIME

One full cycle spans 360° (or 2π radians) and takes exactly T₀ seconds. A 60° phase shift is therefore 60/360 = 1/6 of a full cycle, which corresponds to a time shift of **T₀/6**.

- A **negative** phase angle (e.g., −60°) shifts the waveform to the **right** → the signal is **delayed** → it **lags** the reference.
- A **positive** phase angle shifts the waveform to the **left** → the signal is **advanced** → it **leads** the reference.

**Lead** means a signal reaches its peak *earlier* than the reference. **Lag** means it reaches its peak *later*.

### KEY IDENTITIES

Two special cases connect cosine and sine directly:

$$C\cos(\omega_0 t - \pi/2) = C\sin(\omega_0 t)$$
$$C\sin(\omega_0 t + \pi/2) = C\cos(\omega_0 t)$$

In plain English: **sine lags cosine by 90°**, and equivalently, **cosine leads sine by 90°**.

#### Micro-Example

If T₀ = 0.02 s (i.e., f₀ = 50 Hz), a 90° phase shift equals one quarter-period: T₀/4 = 0.005 s. So C sin(ω₀t) peaks exactly 0.005 s after C cos(ω₀t).

$$a\cos(\omega_0 t)+b\sin(\omega_0 t)=C\cos(\omega_0 t+\theta),\qquad C=\sqrt{a^2+b^2},\qquad \theta=\tan^{-1}\!\left(\frac{-b}{a}\right)$$
*This formula takes two same-frequency sinusoids — one cosine with coefficient a and one sine with coefficient b — and merges them into a single cosine with amplitude C and phase θ. The amplitude C is simply the Euclidean distance from the origin to the point (a, −b). **Critical exam trap:** the formula θ = tan⁻¹(−b/a) gives a raw inverse-tangent value, but a calculator always returns an angle in the range (−90°, +90°). The true angle must be placed in the correct quadrant based on the signs of a and −b, so you must always perform a quadrant check and adjust the raw value if necessary.*

![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*These phasor diagrams show the graphical method for adding two sinusoids. The horizontal axis carries the cosine coefficient a, and the vertical axis carries the negative of the sine coefficient, −b. The length of the resulting arrow is the amplitude C = √(a² + b²), and the angle it makes with the positive horizontal axis is the phase θ. Diagram (b) specifically illustrates the quadrant-check trap: the phasor −3 − j4 lies in the third-quadrant direction, so the phase is −126.9°, not the naive first-quadrant value of 53.1° that a raw inverse-tangent would return.*

## 2. Adding Sinusoids — Fully Worked Example

### THE PRINCIPLE

If two sinusoids share the same frequency ω₀, their sum is always another sinusoid at that same frequency. Only the amplitude and phase change.

### WORKED EXAMPLE

Combine **x(t) = −3 cos(ω₀t) + 4 sin(ω₀t)** into a single cosine.

**Step 1 — Identify a and b.**

Match with the standard form a cos(ω₀t) + b sin(ω₀t):
$$a = -3, \quad b = 4$$

**Step 2 — Compute the amplitude.**
$$C = \sqrt{a^2 + b^2} = \sqrt{(-3)^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5$$

**Step 3 — Form the phasor and find the angle.**

The phasor is the complex number a − jb = −3 − j4. Its horizontal component is −3 (negative) and its vertical component is −4 (negative), so the phasor points into the **third quadrant**.

The reference angle from the tangent ratio is:
$$\tan^{-1}\!\left(\frac{4}{3}\right) \approx 53.1°$$

But 53.1° is a first-quadrant angle. Because both components are negative, the true angle is:
$$\theta = -(180° - 53.1°) = -126.9°$$

**Step 4 — Write the result.**
$$x(t) = 5\cos(\omega_0 t - 126.9°)$$

**Verification:** The phasor 5∠−126.9° has horizontal projection 5 cos(−126.9°) = −3 and vertical projection −5 sin(−126.9°) = +4, which matches the original coefficients a = −3 and b = 4. ✓

### COMMON MISTAKE

Stopping at θ = 53.1° is the single most frequent error on this type of problem. Always check the quadrant of the phasor a − jb before finalizing the angle.

![unknown](/figures/page-018-unknown-1.png)
*This diagram shows the complex number a − jb plotted as a point (or arrow) in the complex plane. The horizontal distance from the origin is a (the cosine coefficient), the downward vertical distance is b (the sine coefficient, taken negative), the length of the arrow is the magnitude C = √(a² + b²), and the angle θ below the positive real axis is the phase. This picture is the essential bridge: once you can read a and b from the sinusoid expression, this geometry immediately gives you C and θ for the single-cosine form.*

---
**📌 Key Takeaways**
- In C cos(ω₀t + θ): C is amplitude, f₀ is frequency in Hz, ω₀ = 2πf₀ in rad/s, T₀ = 1/f₀.
- A negative phase angle delays the waveform (lag); a positive phase angle advances it (lead).
- Combine a cos(ω₀t) + b sin(ω₀t) into C cos(ω₀t + θ) using C = √(a²+b²) and a quadrant-checked θ.

*In the next section we will keep using phasors as a compact way to analyze sinusoidal signals.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InNpbnVzb2lkX3BhcmFtZXRlcnMiLCJsYWJlbCI6IkFtcGxpdHVkZSwgcGVyaW9kLCBmcmVxdWVuY3ksIHJhZGlhbiBmcmVxdWVuY3ksIGFuZCBwaGFzZSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHgodCkgPSA0IGNvcygyz4AgwrcgMjAwdCDiiJIgMzDCsCksIHdoaWNoIHN0YXRlbWVudCBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gQW1wbGl0dWRlID0gMjAwLCBwZXJpb2QgPSA0IHMsIHBoYXNlID0g4oiSMzDCsCIsIkIuIEFtcGxpdHVkZSA9IDQsIGZyZXF1ZW5jeSA9IDIwMCBIeiwgcGVyaW9kID0gMS8yMDAgcywgcGhhc2UgPSDiiJIzMMKwIiwiQy4gQW1wbGl0dWRlID0gNCwgcmFkaWFuIGZyZXF1ZW5jeSA9IDIwMCByYWQvcywgcGVyaW9kID0gMS8yMDAgcyIsIkQuIEFtcGxpdHVkZSA9IDQsIGZyZXF1ZW5jeSA9IDLPgCDCtyAyMDAgSHosIHBoYXNlID0gKzMwwrAiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJJbiB4KHQpID0gQyBjb3MoMs+AZuKCgHQgKyDOuCksIHRoZSBhbXBsaXR1ZGUgaXMgQyA9IDQsIHRoZSBmcmVxdWVuY3kgaXMgZuKCgCA9IDIwMCBIeiwgdGhlIHBlcmlvZCBpcyBU4oKAID0gMS9m4oKAID0gMS8yMDAgcywgYW5kIHRoZSBwaGFzZSBpcyDiiJIzMMKwLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IjIwMCBpcyB0aGUgZnJlcXVlbmN5LCBub3QgdGhlIGFtcGxpdHVkZSwgYW5kIHRoZSBwZXJpb2QgaXMgbm90IDQgcy4iLCJDIjoiVGhlIGNvZWZmaWNpZW50IG9mIHQgaXMgMs+AIMK3IDIwMCwgc28gdGhlIHJhZGlhbiBmcmVxdWVuY3kgaXMgNDAwz4AgcmFkL3MsIG5vdCAyMDAgcmFkL3MuIiwiRCI6IjLPgCDCtyAyMDAgaXMgdGhlIHJhZGlhbiBmcmVxdWVuY3ksIG5vdCB0aGUgaGVydHogZnJlcXVlbmN5LCBhbmQgdGhlIHBoYXNlIHNpZ24gaXMgd3JvbmcuIn0sImhpbnQiOiJNYXRjaCB0aGUgZXhwcmVzc2lvbiB0ZXJtLWJ5LXRlcm0gd2l0aCBDIGNvcygyz4Bm4oKAdCArIM64KS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIHgodCkgPSBDIGNvcyjPieKCgHQgKyDOuCkgaGFzIM+J4oKAID0gMTAwz4AgcmFkL3MsIHdoYXQgaXMgaXRzIHBlcmlvZD8iLCJvcHRpb25zIjpbIkEuIDEvMTAwIHMiLCJCLiAxLzUwIHMiLCJDLiA1MM+AIHMiLCJELiAxMDDPgCBzIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVXNlIFTigoAgPSAyz4Avz4nigoAgPSAyz4AvKDEwMM+AKSA9IDEvNTAgcy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGF0IHdvdWxkIGJlIGNvcnJlY3Qgb25seSBpZiB0aGUgZnJlcXVlbmN5IHdlcmUgMTAwIEh6LiIsIkMiOiJUaGlzIGludmVydHMgdGhlIGZvcm11bGEgaW5jb3JyZWN0bHkuIiwiRCI6IlRoaXMgYWxzbyBtaXN1c2VzIHRoZSByZWxhdGlvbiBiZXR3ZWVuIHBlcmlvZCBhbmQgcmFkaWFuIGZyZXF1ZW5jeS4ifSwiaGludCI6IlN0YXJ0IGZyb20gVOKCgCA9IDLPgC/PieKCgCwgbm90IFTigoAgPSAxL8+J4oKALiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoicGhhc2Vfc2hpZnRfbGVhZF9sYWciLCJsYWJlbCI6IlBoYXNlIHNoaWZ0IGFzIHRpbWUgc2hpZnQ7IGxlYWQgYW5kIGxhZyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggc3RhdGVtZW50IGJlc3QgZGVzY3JpYmVzIHgodCkgPSBDIGNvcyjPieKCgHQg4oiSIDYwwrApIHJlbGF0aXZlIHRvIEMgY29zKM+J4oKAdCk/Iiwib3B0aW9ucyI6WyJBLiBJdCBpcyBhZHZhbmNlZCBieSBU4oKALzYiLCJCLiBJdCBpcyBkZWxheWVkIGJ5IFTigoAvNiIsIkMuIEl0IGlzIGRlbGF5ZWQgYnkgVOKCgC80IiwiRC4gSXQgaGFzIGEgZGlmZmVyZW50IGZyZXF1ZW5jeSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkEgbmVnYXRpdmUgcGhhc2UgaW5zaWRlIGNvc2luZSwgd3JpdHRlbiBhcyBjb3Moz4nigoB0IOKIkiA2MMKwKSwgc2hpZnRzIHRoZSB3YXZlZm9ybSB0byB0aGUgcmlnaHQsIHNvIGl0IGlzIGRlbGF5ZWQuIFNpbmNlIDYwwrAgaXMgb25lLXNpeHRoIG9mIDM2MMKwLCB0aGUgZGVsYXkgaXMgVOKCgC82LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkFkdmFuY2UgY29ycmVzcG9uZHMgdG8gYSBsZWZ0IHNoaWZ0LCBub3QgdGhlIHJpZ2h0IHNoaWZ0IHNlZW4gaGVyZS4iLCJDIjoiQSBxdWFydGVyLXBlcmlvZCBjb3JyZXNwb25kcyB0byA5MMKwLCBub3QgNjDCsC4iLCJEIjoiUGhhc2Ugc2hpZnQgY2hhbmdlcyB0aW1pbmcsIG5vdCBmcmVxdWVuY3kuIn0sImhpbnQiOiJDb252ZXJ0IDYwwrAgaW50byBhIGZyYWN0aW9uIG9mIG9uZSBmdWxsIGN5Y2xlLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJ0aW1lX3NoaWZ0ZWRfc2ludXNvaWQiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHN0YXRlbWVudCBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gc2luKM+J4oKAdCkgbGVhZHMgY29zKM+J4oKAdCkgYnkgOTDCsCIsIkIuIGNvcyjPieKCgHQpIGxhZ3Mgc2luKM+J4oKAdCkgYnkgOTDCsCIsIkMuIHNpbijPieKCgHQpIGxhZ3MgY29zKM+J4oKAdCkgYnkgOTDCsCIsIkQuIHNpbijPieKCgHQpIGFuZCBjb3Moz4nigoB0KSBhcmUgaW4gcGhhc2UiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJCZWNhdXNlIGNvcyjPieKCgHQg4oiSIM+ALzIpID0gc2luKM+J4oKAdCksIHNpbmUgaXMgYSBkZWxheWVkIHZlcnNpb24gb2YgY29zaW5lIGJ5IDkwwrAsIHNvIHNpbmUgbGFncyBjb3NpbmUgYnkgOTDCsC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIHJldmVyc2VzIHRoZSBsYWcgcmVsYXRpb25zaGlwLiIsIkIiOiJDb3NpbmUgYWN0dWFsbHkgbGVhZHMgc2luZSBieSA5MMKwLiIsIkQiOiJUaGV5IGFyZSBzZXBhcmF0ZWQgYnkgYSBxdWFydGVyIGN5Y2xlLCBzbyB0aGV5IGFyZSBub3QgaW4gcGhhc2UuIn0sImhpbnQiOiJBc2sgd2hpY2ggc2lnbmFsIG11c3QgYmUgc2hpZnRlZCByaWdodCBieSBhIHF1YXJ0ZXIgY3ljbGUgdG8gZ2V0IHRoZSBvdGhlci4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImFkZGl0aW9uX29mX3NpbnVzb2lkcyIsImxhYmVsIjoiQ29tYmluZSBhIGNvcyB0ZXJtIGFuZCBhIHNpbiB0ZXJtIGludG8gb25lIGNvc2luZSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV3JpdGUgeCh0KSA9IGNvcyjPieKCgHQpIOKIkiDiiJozIHNpbijPieKCgHQpIGFzIGEgc2luZ2xlIGNvc2luZS4iLCJvcHRpb25zIjpbIkEuIDIgY29zKM+J4oKAdCDiiJIgNjDCsCkiLCJCLiAyIGNvcyjPieKCgHQgKyA2MMKwKSIsIkMuIDIgY29zKM+J4oKAdCArIDMwwrApIiwiRC4gY29zKM+J4oKAdCArIDYwwrApIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiSGVyZSBhID0gMSBhbmQgYiA9IOKIkuKImjMuIFNvIEMgPSDiiJooMSArIDMpID0gMiBhbmQgzrggPSB0YW7igbvCuSjiiJJiL2EpID0gdGFu4oG7wrko4oiaMykgPSA2MMKwLiBUaGVyZWZvcmUgeCh0KSA9IDIgY29zKM+J4oKAdCArIDYwwrApLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBzaWduIG9mIHRoZSBwaGFzZSBpcyB3cm9uZy4iLCJDIjoiVGhlIGFuZ2xlIGlzIGluY29ycmVjdDsgdGFuIDMwwrAgaXMgbm90IOKImjMuIiwiRCI6IlRoZSBhbXBsaXR1ZGUgc2hvdWxkIGJlIDIsIG5vdCAxLiJ9LCJoaW50IjoiVXNlIEMgPSDiiJooYcKyICsgYsKyKSBhbmQgY29tcGFyZSB3aXRoIGEgY29zKM+J4oKAdCkgKyBiIHNpbijPieKCgHQpID0gQyBjb3Moz4nigoB0ICsgzrgpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHgodCkgPSDiiJIzIGNvcyjPieKCgHQpICsgNCBzaW4oz4nigoB0KSwgd2hpY2ggZmluYWwgZm9ybSBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gNSBjb3Moz4nigoB0ICsgNTMuMcKwKSIsIkIuIDUgY29zKM+J4oKAdCDiiJIgNTMuMcKwKSIsIkMuIDUgY29zKM+J4oKAdCDiiJIgMTI2LjnCsCkiLCJELiA3IGNvcyjPieKCgHQg4oiSIDEyNi45wrApIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiVGhlIGFtcGxpdHVkZSBpcyBDID0g4oiaKCjiiJIzKcKyICsgNMKyKSA9IDUuIFRoZSBhbmdsZSBtdXN0IG1hdGNoIHRoZSBwaGFzb3IgYSDiiJIgamIgPSDiiJIzIOKIkiBqNCwgd2hpY2ggbGllcyBpbiB0aGUgdGhpcmQtcXVhZHJhbnQgZGlyZWN0aW9uLCBnaXZpbmcgdGhlIHByaW5jaXBhbCBhbmdsZSDiiJIxMjYuOcKwLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IjUzLjHCsCBpcyB0aGUgcmVmZXJlbmNlIGFuZ2xlLCBidXQgaXQgaXMgaW4gdGhlIHdyb25nIHF1YWRyYW50LiIsIkIiOiJUaGlzIGFuZ2xlIHN0aWxsIHBsYWNlcyB0aGUgcGhhc29yIGluIHRoZSB3cm9uZyBxdWFkcmFudC4iLCJEIjoiVGhlIGFtcGxpdHVkZSBpcyA1LCBub3QgNy4ifSwiaGludCI6IkFmdGVyIGludmVyc2UgdGFuZ2VudCwgYWx3YXlzIGRvIGEgcXVhZHJhbnQgY2hlY2sgdXNpbmcgdGhlIHNpZ25zIG9mIGEgYW5kIOKIkmIuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6InBoYXNvcl9kaWFncmFtIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EzIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJBIHN0dWRlbnQgY29tcHV0ZXMgzrggPSB0YW7igbvCuSg0LzMpID0gNTMuMcKwIGZvciB4KHQpID0g4oiSMyBjb3Moz4nigoB0KSArIDQgc2luKM+J4oKAdCkgYW5kIHN0b3BzLiBFeHBsYWluIHByZWNpc2VseSB3aHkgdGhpcyBpcyBub3QgeWV0IGEgdmFsaWQgZmluYWwgYW5zd2VyIGZvciB0aGUgcGhhc2UuIiwiaWRlYWxfYW5zd2VyIjoiVGhlIGludmVyc2UgdGFuZ2VudCBnaXZlcyBvbmx5IGEgcmVmZXJlbmNlIGFuZ2xlLiBGb3IgYSBjb3Moz4nigoB0KSArIGIgc2luKM+J4oKAdCkgPSBDIGNvcyjPieKCgHQgKyDOuCksIHRoZSBwaGFzZSBjb21lcyBmcm9tIHRoZSBjb21wbGV4L3BoYXNvciBxdWFudGl0eSBhIOKIkiBqYi4gSGVyZSBhIOKIkiBqYiA9IOKIkjMg4oiSIGo0LCB3aGljaCBpcyBpbiB0aGUgdGhpcmQtcXVhZHJhbnQgZGlyZWN0aW9uLCBub3QgdGhlIGZpcnN0LiBTbyA1My4xwrAgaGFzIHRoZSBjb3JyZWN0IHRhbmdlbnQgcmF0aW8gYnV0IHRoZSB3cm9uZyBxdWFkcmFudC4gVGhlIGNvcnJlY3QgcHJpbmNpcGFsIHBoYXNlIGlzIOKIkjEyNi45wrAuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBzdGF0ZSB0aGF0IGFyY3RhbmdlbnQgYWxvbmUgZ2l2ZXMgYSByZWZlcmVuY2UgYW5nbGUgb3IgbWF5IGJlIHF1YWRyYW50LWFtYmlndW91cyIsIk11c3QgdXNlIHRoZSBzaWducyBvZiBhIGFuZCDiiJJiIG9yIHRoZSBwaGFzb3IgYSDiiJIgamIgdG8gaWRlbnRpZnkgdGhlIGNvcnJlY3QgcXVhZHJhbnQiLCJNdXN0IHN0YXRlIHRoZSBjb3JyZWN0ZWQgcGhhc2UgYXMg4oiSMTI2LjnCsCJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQgdW5kZXJzdGFuZHMgdGhlIG1ham9yIGV4YW0gdHJhcCBpbiBwaGFzb3ItYmFzZWQgYWRkaXRpb24sIG5vdCBqdXN0IHRoZSBmb3JtdWxhLiIsImhpbnQiOiJMb29rIGF0IHRoZSBzaWducyBvZiB0aGUgaG9yaXpvbnRhbCBhbmQgdmVydGljYWwgcGhhc29yIGNvbXBvbmVudHMgYmVmb3JlIHRydXN0aW5nIHRhbuKBu8K5LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfV19" style="display:none;"></div>%%KC_END%%
