# B.2 Sinusoids

> **Section Objective:** Learn to read sinusoid parameters, convert between frequency units, interpret lead/lag, and combine two same-frequency sinusoids into one.

---

Start with a concrete signal: **x(t) = 3 cos(2π·50t − 30°)**.

- The **3** is the amplitude — the peak height of the wave.
- The **50** is the frequency f₀ = 50 Hz — how many full cycles occur each second.
- The **−30°** is the phase — a horizontal shift that slides the wave right by 30/360 of one period.

This section is about two skills: **reading** those three numbers from any sinusoid, and **combining** expressions like a cos(ω₀t) + b sin(ω₀t) into a single cosine with one amplitude and one phase. Along the way, we will briefly use complex numbers and phasors — not as an end in themselves, but as a compact bookkeeping tool that makes the algebra fast.

### PREREQUISITE REFRESHER

- **Period** T₀ = time for one complete repeat (seconds).
- **Phase** θ = horizontal shift (positive θ shifts left; negative shifts right).
- **Phasors** = complex-number shorthand for sinusoid amplitudes and phases.

### FORMULA REFERENCE

| Symbol | Formula |
|--------|---------|
| General sinusoid | x(t) = C cos(2πf₀t + θ) |
| Period | T₀ = 1/f₀ |
| Radian frequency | ω₀ = 2πf₀ |

![Fig. B.6](/figures/page-017-fig__b_6-1.png)
*The textbook figure shows cosine, sine, and a 60°-delayed cosine side by side, making the phase shift visible as a left-right translation along the time axis.*

## 1. Reading a Sinusoid and Sketching Phase Shift

Consider **C cos(ω₀t − 60°)**. Each parameter has a direct geometric meaning:

- **C** sets the height — the wave oscillates between −C and +C.
- **ω₀** (or equivalently f₀) sets the speed — higher ω₀ means more cycles per second, so the wave is compressed horizontally.
- **−60°** is the phase — a negative phase shifts the wave to the **right** by 60/360 = one-sixth of a period.

One full cycle spans **360° = 2π radians**, so a 60° delay is exactly T₀/6 to the right. This is why the textbook figure shows the delayed cosine starting its peak later than the unshifted one.

### KEY IDENTITY

A particularly important special case: delaying a cosine by exactly 90° (= π/2 radians) produces a sine:

> **C cos(ω₀t − π/2) = C sin(ω₀t)**

This identity connects cosine and sine without any new formula — it is just a phase shift.

#### Unit Warning

Never mix degrees and radians in the same calculation. Pick one unit and convert everything before substituting.

### FORMULA REFERENCE

| Expression | Meaning |
|------------|---------|
| x(t) = C cos(ω₀t + θ) | General sinusoid |
| T₀ = 2π/ω₀ | Period from radian frequency |
| C cos(ω₀t − π/2) = C sin(ω₀t) | Cosine delayed 90° equals sine |

$$T_0 = \frac{1}{f_0} = \frac{2\pi}{\omega_0}, \qquad \omega_0 = 2\pi f_0$$
*Period T₀ measures seconds per cycle, f₀ measures cycles per second (Hz), and ω₀ measures radians per second — three different units describing the exact same sinusoid's repetition rate.*

## 2. Lead, Lag, and the Cosine-Sine Relationship

Here is the clearest way to see lead and lag: **if you delay cos(ω₀t) by 90°, you get sin(ω₀t)**.

Picture two waveforms scrolling left on a screen. The cosine hits its peak first. The sine hits the same peak later — it is always 90° behind. That "behind" is what **lag** means:

> **sin(ω₀t) lags cos(ω₀t) by 90°.**

Flipping the perspective: cos(ω₀t) arrives at every landmark 90° earlier than sin(ω₀t), so:

> **cos(ω₀t) leads sin(ω₀t) by 90°.**

Both sentences say the same thing — only the reference waveform changes.

### EXAM TRAP

Students frequently reverse the sign: they write that cosine lags sine, or that a negative phase means the wave leads. Always ask yourself: *which waveform reaches the same peak later?* That one is the lagging wave.

### FORMULA REFERENCE

| Identity | Meaning |
|----------|---------|
| C cos(ω₀t − π/2) = C sin(ω₀t) | Sine is cosine delayed 90° |
| C sin(ω₀t + π/2) = C cos(ω₀t) | Cosine is sine advanced 90° |

![unknown](/figures/page-018-unknown-1.png)
*The complex-plane diagram maps the coefficients a and −b to a single point whose distance from the origin gives the combined amplitude C and whose angle below the real axis gives the new phase θ.*

## 3. Adding Same-Frequency Sinusoids with Phasors

Start with the worked example: **x(t) = cos(ω₀t) − √3 sin(ω₀t)**.

The result is **x(t) = 2 cos(ω₀t + 60°)**. Here is how to get there systematically.

### THE GENERAL RULE

For any expression **a cos(ω₀t) + b sin(ω₀t)**, rewrite it as **C cos(ω₀t + θ)** where:

- **C = √(a² + b²)** — the amplitude, found from the vector length.
- **θ = tan⁻¹(−b/a)** — the phase, found from the vector angle, **with quadrant care**.

### THE COMPLEX-PLANE PICTURE

Before using the formula, here is the idea behind it. Treat the pair (a, −b) as a point in the complex plane: the number **a − jb**. Its distance from the origin is C, and its angle from the positive real axis is θ. That is all the formula is doing — reading off the polar coordinates of a point.

### WORKED EXAMPLE

For x(t) = cos(ω₀t) − √3 sin(ω₀t): a = 1, b = −√3.
- C = √(1² + (−√3)²) = √(1 + 3) = **2**
- Point: a − jb = 1 − j(−√3) = 1 + j√3, which lies in quadrant I.
- θ = tan⁻¹(√3/1) = **60°**
- Result: **2 cos(ω₀t + 60°)**. ✓

### CALCULATOR TRAP

Arctangent alone returns a value between −90° and +90°. If the point a − jb falls in quadrant II or III, the raw tan⁻¹ output is in the wrong quadrant. Always check the signs of a and −b to confirm which quadrant the point is in before accepting the calculator's answer.

#### Important Restriction

This combination rule works **only when both sinusoids have the same frequency ω₀**. Different frequencies cannot be merged into a single sinusoid.

### FORMULA REFERENCE

| Formula | Description |
|---------|-------------|
| a cos(ω₀t) + b sin(ω₀t) = C cos(ω₀t + θ) | Combined form |
| C = √(a² + b²) | Amplitude from vector length |
| θ = tan⁻¹(−b/a), quadrant check required | Phase from vector angle |
| a − jb = Ce^{jθ} | Complex-plane representation |

$$a\cos \omega_0 t + b\sin \omega_0 t = C\cos(\omega_0 t + \theta), \qquad C=\sqrt{a^2+b^2}, \quad \theta = \tan^{-1}\!\left(\frac{-b}{a}\right)$$
*Two same-frequency sinusoids combine into one sinusoid whose amplitude equals the length of the vector (a, −b) in the complex plane and whose phase equals that vector's angle.*

![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*The textbook phasor diagrams show how the horizontal component a and vertical component −b are added geometrically to produce a single resultant arrow whose length is the new amplitude and whose angle is the new phase.*

---
**📌 Key Takeaways**
- In C cos(2πf₀t + θ), C is amplitude, f₀ is frequency in Hz, and θ is the phase shift.
- sin(ω₀t) lags cos(ω₀t) by exactly 90°; cos leads sin by the same amount.
- a cos(ω₀t) + b sin(ω₀t) = C cos(ω₀t + θ) where C = √(a²+b²) and θ needs a quadrant check.

*In the next section we will build on this sinusoid and phasor viewpoint.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImtwX3JlYWRfcGFyYW1ldGVycyIsImxhYmVsIjoiUmVhZCBhbXBsaXR1ZGUsIGZyZXF1ZW5jeSwgcGVyaW9kLCBhbmQgcGhhc2UgZnJvbSBhIHNpbnVzb2lkIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IDQgY29zKDLPgMK3MjV0IOKIkiAzMMKwKSwgd2hpY2ggc3RhdGVtZW50IGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBBbXBsaXR1ZGUgPSAyNSwgZnJlcXVlbmN5ID0gNCBIeiwgcGhhc2UgPSDiiJIzMMKwIiwiQi4gQW1wbGl0dWRlID0gNCwgZnJlcXVlbmN5ID0gMjUgSHosIHBoYXNlID0g4oiSMzDCsCIsIkMuIEFtcGxpdHVkZSA9IDQsIGZyZXF1ZW5jeSA9IDLPgMK3MjUgSHosIHBoYXNlID0gKzMwwrAiLCJELiBBbXBsaXR1ZGUgPSAzMCwgZnJlcXVlbmN5ID0gMjUgSHosIHBoYXNlID0g4oiSNMKwIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiTWF0Y2ggdGhlIGV4cHJlc3Npb24gdG8gdGhlIHN0YW5kYXJkIGZvcm0gQyBjb3MoMs+AZuKCgHQgKyDOuCkuIFRoZSBjb2VmZmljaWVudCBvdXQgZnJvbnQgaXMgdGhlIGFtcGxpdHVkZSBDID0gNC4gVGhlIGZhY3RvciBtdWx0aXBseWluZyB0IGluc2lkZSB0aGUgY29zaW5lIGlzIDLPgGbigoAsIHNvIDLPgMK3MjUgZ2l2ZXMgZuKCgCA9IDI1IEh6LiBUaGUgcmVtYWluaW5nIGNvbnN0YW50IGlzIHRoZSBwaGFzZSDOuCA9IOKIkjMwwrAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBzd2FwcyB0aGUgcm9sZXMgb2YgYW1wbGl0dWRlIGFuZCBmcmVxdWVuY3kg4oCUIDI1IGlzIHRoZSBmcmVxdWVuY3kgaW4gSHosIG5vdCB0aGUgYW1wbGl0dWRlLiIsIkMiOiIyz4DCtzI1IGlzIHRoZSByYWRpYW4gZnJlcXVlbmN5IM+J4oKAIGluIHJhZC9zLCBub3QgdGhlIGhlcnR6IGZyZXF1ZW5jeSBm4oKALiBBbHNvLCB0aGUgcGhhc2Ugc2lnbiBpcyB3cm9uZy4iLCJEIjoiVGhlIGFtcGxpdHVkZSBpcyBuZXZlciByZWFkIGZyb20gdGhlIHBoYXNlIGFuZ2xlOyAzMCBjb21lcyBmcm9tIHRoZSBwaGFzZSB0ZXJtLCBub3QgdGhlIGNvZWZmaWNpZW50LiJ9LCJoaW50IjoiTWF0Y2ggdGhlIGV4cHJlc3Npb24gdGVybSBieSB0ZXJtIHRvIEMgY29zKDLPgGbigoB0ICsgzrgpIGFuZCBpZGVudGlmeSBlYWNoIHN5bWJvbC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIM+J4oKAID0gMTAwz4AgcmFkL3MsIHdoYXQgaXMgdGhlIHBlcmlvZCBU4oKAPyIsIm9wdGlvbnMiOlsiQS4gMC4wMDUgcyIsIkIuIDAuMDIgcyIsIkMuIDUwIHMiLCJELiAyMDDPgCBzIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVXNlIFTigoAgPSAyz4Avz4nigoAgPSAyz4AvKDEwMM+AKSA9IDIvMTAwID0gMC4wMiBzLiBFcXVpdmFsZW50bHksIGbigoAgPSDPieKCgC8oMs+AKSA9IDEwMM+ALygyz4ApID0gNTAgSHosIGFuZCBU4oKAID0gMS9m4oKAID0gMS81MCA9IDAuMDIgcy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiIwLjAwNSBzIHdvdWxkIGNvcnJlc3BvbmQgdG8gZuKCgCA9IDIwMCBIeiwgd2hpY2ggaXMgZm91ciB0aW1lcyB0b28gaGlnaC4iLCJDIjoiVGhpcyByZXZlcnNlcyB0aGUgcmVsYXRpb25zaGlwIOKAlCBwZXJpb2QgaXMgbXVjaCBzbWFsbGVyIHRoYW4gZnJlcXVlbmN5IGluIEh6IGZvciB0eXBpY2FsIHNpZ25hbHMuIiwiRCI6IlRoaXMgbWlzYXBwbGllcyB0aGUgZm9ybXVsYSBieSBub3QgZGl2aWRpbmcgYnkgMs+AIGNvcnJlY3RseS4ifSwiaGludCI6IlVzZSBU4oKAID0gMs+AL8+J4oKALCBvciBmaXJzdCBmaW5kIGbigoAgPSDPieKCgC8oMs+AKSBhbmQgdGhlbiBU4oKAID0gMS9m4oKALiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoia3BfcGhhc2Vfc2hpZnRfbGVhZF9sYWciLCJsYWJlbCI6IkludGVycHJldCBwaGFzZSBzaGlmdCBhbmQgOTAtZGVncmVlIGxlYWQtbGFnIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHN0YXRlbWVudCBjb3JyZWN0bHkgZGVzY3JpYmVzIHRoZSBwaGFzZSByZWxhdGlvbnNoaXAgYmV0d2VlbiBzaW4oz4nigoB0KSBhbmQgY29zKM+J4oKAdCk/Iiwib3B0aW9ucyI6WyJBLiBzaW4oz4nigoB0KSBsZWFkcyBjb3Moz4nigoB0KSBieSA5MMKwIiwiQi4gY29zKM+J4oKAdCkgbGFncyBzaW4oz4nigoB0KSBieSA5MMKwIiwiQy4gc2luKM+J4oKAdCkgbGFncyBjb3Moz4nigoB0KSBieSA5MMKwIiwiRC4gc2luKM+J4oKAdCkgYW5kIGNvcyjPieKCgHQpIGhhdmUgbm8gcGhhc2UgcmVsYXRpb25zaGlwIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiQmVjYXVzZSBjb3Moz4nigoB0IOKIkiDPgC8yKSA9IHNpbijPieKCgHQpLCB0aGUgc2luZSB3YXZlIGlzIHRoZSBjb3NpbmUgd2F2ZSBkZWxheWVkIGJ5IDkwwrAuIEEgZGVsYXllZCB3YXZlZm9ybSByZWFjaGVzIHRoZSBzYW1lIHBlYWsgbGF0ZXIsIHNvIHNpbmUgbGFncyBjb3NpbmUgYnkgOTDCsC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIHJldmVyc2VzIHRoZSBkaXJlY3Rpb24g4oCUIHNpbmUgYXJyaXZlcyBhdCBlYWNoIHBlYWsgYWZ0ZXIgY29zaW5lLCBub3QgYmVmb3JlLiIsIkIiOiJUaGlzIGlzIGVxdWl2YWxlbnQgdG8gc2F5aW5nIGNvc2luZSBsZWFkcyBzaW5lIGJ5IDkwwrAsIHdoaWNoIGlzIHRydWUsIGJ1dCB0aGUgd29yZCAnbGFncycgbWFrZXMgaXQgaW5jb3JyZWN0IGFzIHN0YXRlZC4iLCJEIjoiU2luZSBhbmQgY29zaW5lIGFyZSBleGFjdGx5IDkwwrAgYXBhcnQg4oCUIHRoZXkgYXJlIHRoZSBtb3N0IGZ1bmRhbWVudGFsIHBoYXNlLXNoaWZ0ZWQgcGFpciBpbiBzaWduYWwgYW5hbHlzaXMuIn0sImhpbnQiOiJBc2sgeW91cnNlbGY6IHdoaWNoIHdhdmVmb3JtIHJlYWNoZXMgaXRzIGZpcnN0IHBvc2l0aXZlIHBlYWsgYXQgYW4gZWFybGllciB0aW1lPyBUaGF0IG9uZSBsZWFkcy4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoid2F2ZWZvcm1fcGhhc2Vfc2hpZnQiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJrcF9hZGRpdGlvbl9zaW5nbGVfc2ludXNvaWQiLCJsYWJlbCI6IkNvbWJpbmUgYSBjb3NpbmUgYW5kIHNpbmUgb2YgdGhlIHNhbWUgZnJlcXVlbmN5IGludG8gb25lIHNpbnVzb2lkIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJFeHByZXNzIHgodCkgPSBjb3Moz4nigoB0KSDiiJIg4oiaMyBzaW4oz4nigoB0KSBhcyBhIHNpbmdsZSBzaW51c29pZC4iLCJvcHRpb25zIjpbIkEuIDIgY29zKM+J4oKAdCDiiJIgNjDCsCkiLCJCLiAyIGNvcyjPieKCgHQgKyA2MMKwKSIsIkMuIDIgc2luKM+J4oKAdCArIDYwwrApIiwiRC4g4oiaMiBjb3Moz4nigoB0ICsgNDXCsCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJIZXJlIGEgPSAxIGFuZCBiID0g4oiS4oiaMy4gQW1wbGl0dWRlOiBDID0g4oiaKDHCsiArICjiiJLiiJozKcKyKSA9IOKImigxICsgMykgPSAyLiBQaGFzZTogdGhlIGNvbXBsZXggcG9pbnQgaXMgYSDiiJIgamIgPSAxIOKIkiBqKOKIkuKImjMpID0gMSArIGriiJozLCB3aGljaCBpcyBpbiBxdWFkcmFudCBJLCBzbyDOuCA9IHRhbuKBu8K5KOKImjMvMSkgPSA2MMKwLiBSZXN1bHQ6IDIgY29zKM+J4oKAdCArIDYwwrApLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBwaGFzZSBzaWduIGlzIHJldmVyc2VkLiBCZWNhdXNlIGIgaXMgbmVnYXRpdmUsIOKIkmIgaXMgcG9zaXRpdmUsIHBsYWNpbmcgdGhlIHBvaW50IGluIHF1YWRyYW50IEkgYW5kIGdpdmluZyBhIHBvc2l0aXZlIHBoYXNlIGFuZ2xlLiIsIkMiOiJUaGUgYW1wbGl0dWRlIGlzIGNvcnJlY3QgYnV0IHRoZSBmb3JtIGlzIHNpbmUsIG5vdCBjb3NpbmUsIGFuZCB0aGUgZXF1aXZhbGVuY2UgZG9lcyBub3QgaG9sZCBhcyBzdGF0ZWQuIiwiRCI6IkJvdGggYW1wbGl0dWRlIGFuZCBhbmdsZSBhcmUgd3Jvbmcg4oCUIHRoZXNlIHdvdWxkIHJlc3VsdCBmcm9tIGEgPSBiID0gMSwgbm90IGEgPSAxLCBiID0g4oiS4oiaMy4ifSwiaGludCI6IklkZW50aWZ5IGEgYW5kIGIsIGNvbXB1dGUgQyA9IOKImihhwrIgKyBiwrIpLCB0aGVuIGZpbmQgdGhlIGFuZ2xlIG9mIHRoZSBwb2ludCBhIOKIkiBqYiBpbiB0aGUgY29tcGxleCBwbGFuZS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoicGhhc29yX2FkZGl0aW9uIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IOKIkjMgY29zKM+J4oKAdCkgKyA0IHNpbijPieKCgHQpLCB3aGljaCBwYWlyIChDLCDOuCkgY29ycmVjdGx5IGZpdHMgeCh0KSA9IEMgY29zKM+J4oKAdCArIM64KT8iLCJvcHRpb25zIjpbIkEuIEMgPSA1LCDOuCA9IOKIkjUzLjHCsCIsIkIuIEMgPSA1LCDOuCA9IOKIkjEyNi45wrAiLCJDLiBDID0gNywgzrggPSDiiJIxMjYuOcKwIiwiRC4gQyA9IDEsIM64ID0gMTI2LjnCsCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IldpdGggYSA9IOKIkjMgYW5kIGIgPSA0OiBDID0g4oiaKDkgKyAxNikgPSA1LiBUaGUgY29tcGxleCBwb2ludCBpcyBhIOKIkiBqYiA9IOKIkjMg4oiSIGo0LCB3aGljaCBsaWVzIGluIHF1YWRyYW50IElJSSAoYm90aCByZWFsIGFuZCBpbWFnaW5hcnkgcGFydHMgbmVnYXRpdmUpLiBUaGUgcmVmZXJlbmNlIGFuZ2xlIGlzIHRhbuKBu8K5KDQvMykg4omIIDUzLjHCsCwgYnV0IGluIHF1YWRyYW50IElJSSB0aGUgYW5nbGUgaXMg4oiSMTgwwrAgKyA1My4xwrAgPSDiiJIxMjYuOcKwLiBTbyDOuCA9IOKIkjEyNi45wrAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoizrggPSDiiJI1My4xwrAgY29ycmVzcG9uZHMgdG8gYSBwb2ludCBpbiBxdWFkcmFudCBJViwgYnV0IOKIkjMg4oiSIGo0IGlzIGluIHF1YWRyYW50IElJSS4gVGhpcyBpcyB0aGUgY2xhc3NpYyBhcmN0YW5nZW50IHF1YWRyYW50IGVycm9yLiIsIkMiOiJBbXBsaXR1ZGUgaXMgY29tcHV0ZWQgZnJvbSDiiJooYcKyICsgYsKyKSA9IDUsIG5vdCBmcm9tIGEgKyBiID0gMSBvciB8YXwgKyB8YnwgPSA3LiIsIkQiOiJOZWl0aGVyIHZhbHVlIGlzIGNvcnJlY3Qg4oCUIHRoaXMgYXBwZWFycyB0byBjb21lIGZyb20gc3VidHJhY3RpbmcgcmF0aGVyIHRoYW4gdXNpbmcgdGhlIGRpc3RhbmNlIGZvcm11bGEuIn0sImhpbnQiOiJBZnRlciBjb21wdXRpbmcgQywgcGxvdCB0aGUgcG9pbnQgYSDiiJIgamIgPSDiiJIzIOKIkiBqNCBhbmQgZGV0ZXJtaW5lIHdoaWNoIHF1YWRyYW50IGl0IGZhbGxzIGluIGJlZm9yZSByZWFkaW5nIG9mZiB0aGUgYW5nbGUuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImNvbXBsZXhfcGxhbmVfcGhhc29yIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EzIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJXaHkgY2FuIGEgY2FsY3VsYXRvcidzIHBsYWluIHRhbuKBu8K5KOKIkmIvYSkgZ2l2ZSB0aGUgd3JvbmcgcGhhc2UgYW5nbGUgd2hlbiBjb252ZXJ0aW5nIGEgY29zKM+J4oKAdCkgKyBiIHNpbijPieKCgHQpIGludG8gQyBjb3Moz4nigoB0ICsgzrgpPyIsImlkZWFsX2Fuc3dlciI6IkJlY2F1c2UgdGFu4oG7wrkgcmV0dXJucyBhbiBhbmdsZSBiYXNlZCBvbmx5IG9uIHRoZSByYXRpbyDiiJJiL2EsIG5vdCBvbiB0aGUgaW5kaXZpZHVhbCBzaWducyBvZiBhIGFuZCDiiJJiLiBUaGUgc2FtZSByYXRpbyBjYW4gY29ycmVzcG9uZCB0byB0d28gZGlmZmVyZW50IHF1YWRyYW50cyAoZS5nLiwgcXVhZHJhbnQgSSBhbmQgcXVhZHJhbnQgSUlJIGJvdGggaGF2ZSBwb3NpdGl2ZSB0YW5nZW50KS4gVG8gZ2V0IHRoZSBjb3JyZWN0IHBoYXNlIM64LCB5b3UgbXVzdCBpbnNwZWN0IHRoZSBzaWducyBvZiBhIGFuZCDiiJJiIHNlcGFyYXRlbHkg4oCUIG9yIHVzZSBhIHF1YWRyYW50LWF3YXJlIGZ1bmN0aW9uIGxpa2UgYXRhbjIg4oCUIHRvIGNvbmZpcm0gd2hpY2ggcXVhZHJhbnQgdGhlIHBvaW50IGEg4oiSIGpiIGFjdHVhbGx5IG9jY3VwaWVzIGluIHRoZSBjb21wbGV4IHBsYW5lLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3QgbWVudGlvbiBxdWFkcmFudCBhbWJpZ3VpdHkg4oCUIHRoYXQgdGhlIHNhbWUgdGFuZ2VudCByYXRpbyBjYW4gY29tZSBmcm9tIHR3byBkaWZmZXJlbnQgcXVhZHJhbnRzLiIsIk11c3QgY29ubmVjdCB0aGUgYW5nbGUgdG8gdGhlIHBvaW50IGEg4oiSIGpiIGFuZCB0aGUgc2lnbnMgb2YgYSBhbmQg4oiSYi4iLCJNdXN0IHN0YXRlIHRoYXQgdGFu4oG7wrkgb2YgdGhlIHJhdGlvIGFsb25lIGlzIG5vdCBhbHdheXMgc3VmZmljaWVudCB0byBkZXRlcm1pbmUgdGhlIGNvcnJlY3QgcXVhZHJhbnQuIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBxdWVzdGlvbiBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCB1bmRlcnN0YW5kcyB0aGUgbW9zdCBjb21tb24gZXhhbSB0cmFwIGluIHBoYXNvciBjb252ZXJzaW9uOiBibGluZGx5IHRydXN0aW5nIHRoZSBjYWxjdWxhdG9yIG91dHB1dCB3aXRob3V0IHZlcmlmeWluZyB0aGUgcXVhZHJhbnQuIiwiaGludCI6IlRoaW5rIGFib3V0IHR3byBwb2ludHMgaW4gdGhlIGNvbXBsZXggcGxhbmUgdGhhdCBoYXZlIHRoZSBzYW1lIHRhbmdlbnQgdmFsdWUgYnV0IGxpZSBpbiBkaWZmZXJlbnQgcXVhZHJhbnRzIOKAlCB3aGF0IGRvZXMgdGFu4oG7wrkgcmV0dXJuIGZvciBlYWNoPyIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
