# B.2 Sinusoids

> **Section Objective:** Learn to read every parameter of a sinusoid at a glance, understand how sine and cosine relate through phase shift, and compress a sum of same-frequency sinusoids into one clean expression.

---

Consider the signal x(t) = 3 cos(2π·50t − 30°). At first glance it looks dense, but every number has a specific job: the 3 out front is the **amplitude** (peak height), the 50 tells you the signal repeats **50 times per second** (frequency in hertz), and the −30° is the **phase** (how much the wave is shifted left or right in time).

Two quick reminders before we go further:
- **Period T₀** = time for one complete repeat (in seconds).
- **Frequency f₀** = number of repeats per second; T₀ = 1/f₀.

This section matters on exams because questions frequently ask you to pull these parameters out instantly, or to collapse an expression like 3 cos(ω₀t) − 4 sin(ω₀t) into a single cosine. Both skills live here.

$$x(t) = C\cos(2\pi f_0 t + \theta) = C\cos(\omega_0 t + \theta), \quad T_0 = \frac{1}{f_0}, \quad \omega_0 = 2\pi f_0$$
***C** is the amplitude — the peak value of the wave. **f₀** is the frequency in hertz (cycles per second), **T₀ = 1/f₀** is the period (seconds per cycle), **ω₀ = 2πf₀** is the radian frequency (radians per second), and **θ** is the phase angle that shifts the waveform in time.

#### Warning
Never mix degrees and radians in the same expression. If θ is given in degrees, convert to radians before substituting into any formula that uses π, or keep everything in degrees consistently throughout your calculation.*

![Fig. B.6](/figures/page-017-fig__b_6-1.png)
*This figure shows three waveforms side by side: (a) C cos ω₀t, (b) C sin ω₀t, and (c) C cos(ω₀t − 60°). Notice that the phase-shifted cosine in (c) is simply the original cosine slid to the right by one-sixth of a period — changing the phase angle shifts the waveform left or right in time without altering its shape or amplitude.*

## 1. Phase Shift — Delay, Advance, and the Sine/Cosine Connection

Take x(t) = C cos(ω₀t − 60°). The minus sign inside the cosine means the waveform is **delayed** — it slides to the right on the time axis. A plus sign would mean an **advance** — the waveform slides to the left.

### GENERAL RULE

- **Subtracting** phase → shift right → **delay**
- **Adding** phase → shift left → **advance**

A quarter-cycle corresponds to 90°. Using this, we get the key identity:

> C cos(ω₀t − π/2) = C sin(ω₀t)

This tells us that **sine lags cosine by 90°**, or equivalently, **cosine leads sine by 90°**. They are the same wave shape — just offset by a quarter period.

### WORKED EXAMPLE

**Problem:** If T₀ = 12 ms, what time delay corresponds to a phase of −60°?

**Step 1:** Express 60° as a fraction of a full cycle:
60° ÷ 360° = 1/6 of a cycle.

**Step 2:** Multiply by the period:
Delay = T₀ × (1/6) = 12 ms / 6 = **2 ms**.

The waveform arrives 2 ms later than the reference cosine.

![unknown](/figures/page-018-unknown-1.png)
*The complex-plane picture plots the cosine coefficient a on the real axis and the negative sine coefficient −b on the imaginary axis, turning the problem of combining two sinusoids into finding the magnitude and angle of a single complex number — a powerful shortcut.*

$$a\cos \omega_0 t + b\sin \omega_0 t = C\cos(\omega_0 t + \theta), \quad C = \sqrt{a^2+b^2}, \quad \theta = \tan^{-1}\!\left(\frac{-b}{a}\right)$$
*This identity works **only when both terms share the same angular frequency ω₀** — you cannot combine sinusoids of different frequencies this way. The amplitude C is always nonnegative and is found using the Pythagorean formula on the coefficients a and b.

#### Exam Trap — Quadrant of θ
Your calculator's arctan button always returns a value between −90° and +90°. That raw number is only correct when a > 0. When a < 0, you must add or subtract 180° to land in the correct quadrant. Always check the signs of a and −b separately to confirm which quadrant θ belongs in — do not trust the calculator output blindly.*

## 2. Adding Same-Frequency Sinusoids — A Step-by-Step Recipe

### WORKED EXAMPLE

**Rewrite x(t) = cos(ω₀t) − √3 sin(ω₀t) as a single sinusoid.**

Match to the standard form a cos ω₀t + b sin ω₀t:
- a = 1, b = −√3

**Step 1 — Amplitude:**
C = √(a² + b²) = √(1² + (−√3)²) = √(1 + 3) = **2**

**Step 2 — Phase angle:**
tan θ = (−b)/a = (−(−√3))/1 = √3
θ = arctan(√3) = **60°**

Since a = 1 > 0, the calculator result is already in the correct quadrant.

**Step 3 — Write the result:**
x(t) = **2 cos(ω₀t + 60°)**

---

### THE 3-STEP RECIPE

1. **Identify** a (cosine coefficient) and b (sine coefficient).
2. **Compute** C = √(a² + b²) and θ = arctan(−b/a), then verify the quadrant using the signs of a and −b.
3. **Write** the answer as C cos(ω₀t + θ).

### WHY THIS CONNECTS TO COMPLEX NUMBERS

Notice that a and −b are exactly the real and imaginary parts of the complex number a − jb. Its magnitude is C = √(a² + b²) and its angle is θ. This is not a coincidence — phasor analysis, covered next, is built entirely on this link.

![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*The phasor diagram shows how two component phasors — one along the horizontal (cosine) axis and one along the vertical (sine) axis — add tip-to-tail to produce a single resultant phasor. The length of that resultant is the new amplitude C, and the angle it makes with the positive real axis is the new phase θ.*

---
**📌 Key Takeaways**
- Period and frequency are reciprocals: T₀ = 1/f₀, so a 50 Hz signal repeats every 20 ms.
- Sine lags cosine by exactly 90°, because cos(ω₀t − π/2) = sin(ω₀t) — same wave, shifted right.
- Any a cos ω₀t + b sin ω₀t collapses into C cos(ω₀t + θ) using C = √(a²+b²) and θ = arctan(−b/a).

*Core takeaway: A sinusoid is fully described by three numbers — amplitude, frequency, and phase — and two same-frequency sinusoids always combine into one.

In the next section we will introduce phasors formally, showing how representing sinusoids as rotating complex vectors makes addition, subtraction, and eventually circuit analysis dramatically faster.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InNpbnVzb2lkX3BhcmFtZXRlcnMiLCJsYWJlbCI6IlJlYWQgYW1wbGl0dWRlLCBwZXJpb2QsIGZyZXF1ZW5jeSwgcmFkaWFuIGZyZXF1ZW5jeSwgYW5kIHBoYXNlIGZyb20gYSBzaW51c29pZCIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHgodCkgPSA0IGNvcygyz4DCtzIwMHQg4oiSIDMwwrApLCB3aGljaCBzdGF0ZW1lbnQgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIEFtcGxpdHVkZSA9IDIwMCwgZnJlcXVlbmN5ID0gNCBIeiwgcGhhc2UgPSAtMzDCsCIsIkIuIEFtcGxpdHVkZSA9IDQsIGZyZXF1ZW5jeSA9IDIwMCBIeiwgcGhhc2UgPSAtMzDCsCIsIkMuIEFtcGxpdHVkZSA9IDQsIHBlcmlvZCA9IDIwMCBzLCBwaGFzZSA9ICszMMKwIiwiRC4gQW1wbGl0dWRlID0gMs+AwrcyMDAsIGZyZXF1ZW5jeSA9IDIwMCByYWQvcywgcGhhc2UgPSAtMzDCsCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBjb2VmZmljaWVudCBvdXRzaWRlIHRoZSBjb3NpbmUgaXMgdGhlIGFtcGxpdHVkZSwgc28gQyA9IDQuIFRoZSBmYWN0b3IgbXVsdGlwbHlpbmcgdCBpbnNpZGUgMs+AZuKCgHQgaXMgZuKCgCA9IDIwMCBIeiwgYW5kIHRoZSBwaGFzZSBpcyDiiJIzMMKwLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgc3dhcHMgYW1wbGl0dWRlIGFuZCBmcmVxdWVuY3kg4oCUIHRoZSA0IGlzIG91dHNpZGUgdGhlIGNvc2luZSAoYW1wbGl0dWRlKSwgYW5kIDIwMCBpcyB0aGUgZnJlcXVlbmN5IGluIGhlcnR6LiIsIkMiOiJUaGUgcGVyaW9kIGlzIDEvMjAwIHMgPSA1IG1zLCBub3QgMjAwIHMsIGFuZCB0aGUgcGhhc2Ugc2lnbiBpcyBuZWdhdGl2ZSwgbm90IHBvc2l0aXZlLiIsIkQiOiIyz4DCtzIwMCBpcyB0aGUgcmFkaWFuIGZyZXF1ZW5jeSDPieKCgCwgbm90IHRoZSBhbXBsaXR1ZGUsIGFuZCBmcmVxdWVuY3kgaW4gaGVydHogaXMgMjAwIEh6LCBub3QgcmFkL3MuIn0sImhpbnQiOiJSZWFkIHRoZSBvdXRzaWRlIGNvZWZmaWNpZW50IGZpcnN0IGZvciBhbXBsaXR1ZGUsIHRoZW4gY29tcGFyZSB0aGUgaW5zaWRlIGV4cHJlc3Npb24gdG8gdGhlIHN0YW5kYXJkIGZvcm0gMs+AZuKCgHQgKyDOuC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgc2ludXNvaWQgaGFzIHJhZGlhbiBmcmVxdWVuY3kgz4nigoAgPSAxMDDPgCByYWQvcy4gV2hhdCBhcmUgaXRzIGZyZXF1ZW5jeSBhbmQgcGVyaW9kPyIsIm9wdGlvbnMiOlsiQS4gZuKCgCA9IDEwMM+AIEh6LCBU4oKAID0gMS8oMTAwz4ApIHMiLCJCLiBm4oKAID0gNTAgSHosIFTigoAgPSAwLjAyIHMiLCJDLiBm4oKAID0gMTAwIEh6LCBU4oKAID0gMC4wMSBzIiwiRC4gZuKCgCA9IDI1IEh6LCBU4oKAID0gMC4wNCBzIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiU2luY2Ugz4nigoAgPSAyz4Bm4oKALCB3ZSBnZXQgZuKCgCA9IM+J4oKALygyz4ApID0gMTAwz4AvKDLPgCkgPSA1MCBIei4gVGhlbiBU4oKAID0gMS9m4oKAID0gMS81MCA9IDAuMDIgcy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIHRyZWF0cyB0aGUgcmFkaWFuIGZyZXF1ZW5jeSBkaXJlY3RseSBhcyBoZXJ0eiwgZm9yZ2V0dGluZyB0byBkaXZpZGUgYnkgMs+ALiIsIkMiOiJUaGlzIGRpdmlkZXMgYnkgz4AgYnV0IG5vdCBieSAyLCBtaXNzaW5nIHRoZSBmdWxsIGZhY3RvciBvZiAyz4AgaW4gz4nigoAgPSAyz4Bm4oKALiIsIkQiOiJUaGlzIGlzIG9mZiBieSBhIGZhY3RvciBvZiAyIOKAlCBmcmVxdWVuY3kgc2hvdWxkIGJlIDUwIEh6LCBub3QgMjUgSHouIn0sImhpbnQiOiJTdGFydCBmcm9tIM+J4oKAID0gMs+AZuKCgCBhbmQgc29sdmUgZm9yIGbigoAgZmlyc3QsIHRoZW4gaW52ZXJ0IHRvIGdldCB0aGUgcGVyaW9kLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoicGhhc2Vfc2hpZnRfYW5kX2xlYWRfbGFnIiwibGFiZWwiOiJJbnRlcnByZXQgcGhhc2Ugc2hpZnQgYXMgZGVsYXkvYWR2YW5jZSBhbmQgcmVsYXRlIHNpbmUgdG8gY29zaW5lIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBzdGF0ZW1lbnQgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIHNpbijPieKCgHQpIGxlYWRzIGNvcyjPieKCgHQpIGJ5IDkwwrAiLCJCLiBjb3Moz4nigoB0KSBsYWdzIHNpbijPieKCgHQpIGJ5IDkwwrAiLCJDLiBzaW4oz4nigoB0KSBsYWdzIGNvcyjPieKCgHQpIGJ5IDkwwrAiLCJELiBzaW4oz4nigoB0KSBhbmQgY29zKM+J4oKAdCkgYXJlIGluIHBoYXNlIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiQmVjYXVzZSBjb3Moz4nigoB0IOKIkiDPgC8yKSA9IHNpbijPieKCgHQpLCBzaW5lIGlzIGEgcmlnaHQtc2hpZnRlZCAoZGVsYXllZCkgdmVyc2lvbiBvZiBjb3NpbmUgYnkgYSBxdWFydGVyLWN5Y2xlLiBUaGVyZWZvcmUgc2luZSBsYWdzIGNvc2luZSBieSA5MMKwLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBkaXJlY3Rpb24gaXMgcmV2ZXJzZWQg4oCUIHNpbmUgaXMgZGVsYXllZCByZWxhdGl2ZSB0byBjb3NpbmUsIG5vdCBhaGVhZCBvZiBpdC4iLCJCIjoiQ29zaW5lIGxlYWRzIHNpbmUgKGFycml2ZXMgZWFybGllciksIHNvIGNvc2luZSBkb2VzIG5vdCBsYWcgc2luZS4iLCJEIjoiVGhleSBkaWZmZXIgYnkgYSBmdWxsIHF1YXJ0ZXItY3ljbGUgKDkwwrApLCBzbyB0aGV5IGFyZSBkZWZpbml0ZWx5IG5vdCBpbiBwaGFzZS4ifSwiaGludCI6IlVzZSB0aGUgaWRlbnRpdHkgY29zKM+J4oKAdCDiiJIgz4AvMikgPSBzaW4oz4nigoB0KSBhbmQgYXNrIHdoaWNoIHdhdmVmb3JtIGlzIHNoaWZ0ZWQgdG8gdGhlIHJpZ2h0LiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJ3YXZlZm9ybV9waGFzZV9zaGlmdCIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiSWYgeCh0KSA9IEMgY29zKM+J4oKAdCDiiJIgNjDCsCkgYW5kIHRoZSBwZXJpb2QgaXMgVOKCgCA9IDEyIG1zLCB3aGF0IHRpbWUgc2hpZnQgZG9lcyB0aGUgcGhhc2UgcmVwcmVzZW50PyBTdGF0ZSB3aGV0aGVyIGl0IGlzIGEgZGVsYXkgb3IgYW4gYWR2YW5jZS4iLCJpZGVhbF9hbnN3ZXIiOiJJdCBpcyBhIGRlbGF5IG9mIDIgbXMsIGJlY2F1c2UgNjDCsCBpcyA2MC8zNjAgPSAxLzYgb2YgYSBmdWxsIGN5Y2xlLCBzbyB0aGUgdGltZSBzaGlmdCBpcyBU4oKALzYgPSAxMiBtcyAvIDYgPSAyIG1zLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3QgaWRlbnRpZnkgdGhlIHNoaWZ0IGFzIGEgZGVsYXkgKG5lZ2F0aXZlIHBoYXNlID0gcmlnaHR3YXJkIHNoaWZ0ID0gZGVsYXkpLCBub3QgYW4gYWR2YW5jZSIsIk11c3QgY29udmVydCA2MMKwIHRvIDEvNiBvZiBhIGN5Y2xlIGNvcnJlY3RseSIsIk11c3QgY29tcHV0ZSB0aGUgdGltZSBzaGlmdCBhcyAyIG1zIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCBjYW4gdHJhbnNsYXRlIGEgcGhhc2UgYW5nbGUgaW50byBhbiBhY3R1YWwgdGltZSBvZmZzZXQgb24gdGhlIGdyYXBoIOKAlCBhIGNvbW1vbiBleGFtIHRhc2suIiwiaGludCI6IkNvbnZlcnQgdGhlIGFuZ2xlIHRvIGEgZnJhY3Rpb24gb2YgMzYwwrAsIHRoZW4gbXVsdGlwbHkgdGhhdCBmcmFjdGlvbiBieSB0aGUgcGVyaW9kIFTigoAuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoiYWRkaXRpb25fb2Zfc2FtZV9mcmVxdWVuY3lfc2ludXNvaWRzIiwibGFiZWwiOiJDb21iaW5lIGEgY29zaW5lIHRlcm0gYW5kIGEgc2luZSB0ZXJtIHdpdGggdGhlIHNhbWUgZnJlcXVlbmN5IGludG8gb25lIHNpbnVzb2lkIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJSZXdyaXRlIHgodCkgPSBjb3Moz4nigoB0KSDiiJIg4oiaMyBzaW4oz4nigoB0KSBhcyBhIHNpbmdsZSBzaW51c29pZC4iLCJvcHRpb25zIjpbIkEuIDIgY29zKM+J4oKAdCDiiJIgNjDCsCkiLCJCLiAyIGNvcyjPieKCgHQgKyA2MMKwKSIsIkMuIDIgc2luKM+J4oKAdCArIDYwwrApIiwiRC4g4oiaMiBjb3Moz4nigoB0ICsgNDXCsCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJIZXJlIGEgPSAxIGFuZCBiID0g4oiS4oiaMy4gVGhlbiBDID0g4oiaKDHCsiArICjiiJozKcKyKSA9IDIgYW5kIHRhbiDOuCA9ICjiiJJiKS9hID0g4oiaMywgc28gzrggPSA2MMKwLCBnaXZpbmcgMiBjb3Moz4nigoB0ICsgNjDCsCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlIHBoYXNlIHNpZ24gaXMgd3JvbmcuIEJlY2F1c2UgYiBpcyBuZWdhdGl2ZSwg4oiSYiBpcyBwb3NpdGl2ZSwgbWFraW5nIM64IHBvc2l0aXZlICgrNjDCsCksIG5vdCBuZWdhdGl2ZS4iLCJDIjoiVGhlIHRhcmdldCBmb3JtIGlzIGEgY29zaW5lLCBub3QgYSBzaW5lLiBDb252ZXJ0aW5nIHRvIHNpbmUgZm9ybSByZXF1aXJlcyBhbiBhZGRpdGlvbmFsIHN0ZXAgbm90IGFza2VkIGhlcmUuIiwiRCI6IkJvdGggdGhlIGFtcGxpdHVkZSBhbmQgdGhlIGFuZ2xlIGFyZSBpbmNvcnJlY3Qg4oCUIHRoZSBjb2VmZmljaWVudHMgMSBhbmQg4oiaMyBnaXZlIEMgPSAyIGFuZCDOuCA9IDYwwrAsIG5vdCDiiJoyIGFuZCA0NcKwLiJ9LCJoaW50IjoiSWRlbnRpZnkgYSBhbmQgYiwgY29tcHV0ZSBDID0g4oiaKGHCsiArIGLCsiksIHRoZW4gZmluZCDOuCA9IGFyY3RhbijiiJJiL2EpIGFuZCBjaGVjayB0aGUgcXVhZHJhbnQuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6InBoYXNvcl9hZGRpdGlvbiIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHgodCkgPSDiiJIzIGNvcyjPieKCgHQpICsgNCBzaW4oz4nigoB0KSwgd2hhdCBpcyB0aGUgY29ycmVjdCBhbXBsaXR1ZGUgQz8iLCJvcHRpb25zIjpbIkEuIDEiLCJCLiA1IiwiQy4gNyIsIkQuIOKIkjUiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgYW1wbGl0dWRlIGlzIEMgPSDiiJooYcKyICsgYsKyKSA9IOKImigo4oiSMynCsiArIDTCsikgPSDiiJooOSArIDE2KSA9IOKImjI1ID0gNS4gQW1wbGl0dWRlIGlzIGFsd2F5cyBhIG5vbm5lZ2F0aXZlIG1hZ25pdHVkZS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIGlzIHw0fCDiiJIgfOKIkjN8ID0gMSwgdGhlIGRpZmZlcmVuY2Ugb2YgbWFnbml0dWRlcywgd2hpY2ggaXMgbm90IHRoZSBjb3JyZWN0IGZvcm11bGEuIiwiQyI6IlRoaXMgaXMgfOKIkjN8ICsgfDR8ID0gNywgdGhlIHN1bSBvZiBtYWduaXR1ZGVzLCBub3QgdGhlIFB5dGhhZ29yZWFuIHJlc3VsdC4iLCJEIjoiQW1wbGl0dWRlIGlzIGEgbWFnbml0dWRlIGFuZCBpcyBhbHdheXMgbm9ubmVnYXRpdmUg4oCUIGEgbmVnYXRpdmUgYW1wbGl0dWRlIGhhcyBubyBwaHlzaWNhbCBtZWFuaW5nIGluIHRoaXMgY29udGV4dC4ifSwiaGludCI6IlVzZSB0aGUgUHl0aGFnb3JlYW4gbWFnbml0dWRlIGZvcm11bGEgQyA9IOKImihhwrIgKyBiwrIpLCBzcXVhcmluZyBlYWNoIGNvZWZmaWNpZW50IGJlZm9yZSBhZGRpbmcuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19XX0=" style="display:none;"></div>%%KC_END%%
