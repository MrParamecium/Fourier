# B.2 Sinusoids

> **Section Objective:** Learn to read amplitude, period, frequency, and phase from a sinusoid expression, understand phase shift as a timing shift, and combine a cosine term plus a sine term into a single sinusoid.

---

Start with a concrete signal: **x(t) = 3 cos(2π·50t − 30°)**.

- **3** is the amplitude — the peak height of the wave.
- **50** is the frequency in hertz — the wave completes 50 full cycles every second.
- **−30°** is the phase — it shifts the entire waveform slightly to the right in time.

Think of phase as a clock adjustment: you are not changing the shape of the wave, only *when* it starts.

This section builds three skills that appear repeatedly on exams: reading amplitude, period, frequency, and phase from any sinusoid expression; converting between hertz frequency f₀ and radian frequency ω₀; and collapsing an expression like a cos(ω₀t) + b sin(ω₀t) into a single cosine with one amplitude and one phase angle.

## 1. Reading a Sinusoid

Start with a specific example: **x(t) = 4 cos(20πt + 45°)**.

Here is how to read every parameter:

| Parameter | Symbol | Value | How to find it |
|---|---|---|---|
| Amplitude | C | 4 | Leading coefficient |
| Radian frequency | ω₀ | 20π rad/s | Coefficient of t |
| Hertz frequency | f₀ | 10 Hz | ω₀ / (2π) |
| Period | T₀ | 0.1 s | 1 / f₀ |
| Phase | θ | 45° | Constant inside cosine |

The **general form** is:

x(t) = C cos(2πf₀t + θ) = C cos(ω₀t + θ)

The two key conversion formulas are T₀ = 1/f₀ and ω₀ = 2πf₀.

### COMMON MISTAKE

Do not mix degrees and radians inside the same problem. If the phase is given in degrees, convert everything to degrees — or convert the phase to radians — before doing any arithmetic. Mixing them silently is one of the most common sources of wrong answers on exams.

$$x(t)=C\cos(2\pi f_0 t+\theta)=C\cos(\omega_0 t+\theta),\quad T_0=\frac{1}{f_0}=\frac{2\pi}{\omega_0},\quad \omega_0=2\pi f_0$$
*The same sinusoid can be described using either the hertz frequency f₀ (cycles per second) or the radian frequency ω₀ (radians per second) — they carry identical information, just scaled by 2π. The period T₀ is the time it takes the waveform to complete exactly one full cycle, and it is the reciprocal of f₀ or equivalently 2π divided by ω₀.*

![Fig. B.6](/figures/page-017-fig__b_6-1.png)
*This figure shows cosine, sine, and a phase-shifted cosine side by side, making it clear that a phase shift simply slides the waveform left or right along the time axis without changing its shape.*

## 2. Phase Shift: Why Sine and Cosine Are the Same Shape

Look at the figure above. The third waveform, **C cos(ω₀t − 60°)**, is identical in shape to the standard cosine — it has simply been pushed to the right by one-sixth of a period (T₀/6). That rightward shift is exactly what a negative phase angle does.

Now consider the special case of a quarter-cycle delay:

> **C cos(ω₀t − π/2) = C sin(ω₀t)**

This is not a coincidence — it is the definition of how sine and cosine relate. Sine is just cosine delayed by 90°.

### KEY INSIGHT

- **sin(ω₀t) lags cos(ω₀t) by 90°** — sine arrives later.
- **cos(ω₀t) leads sin(ω₀t) by 90°** — cosine arrives earlier.

A phase shift is always measured as a fraction of one full cycle. A 360° shift returns you to exactly the same waveform. A 90° shift moves you one quarter-period. Once you see phase as a fraction of a cycle, the sine-cosine relationship becomes intuitive rather than something to memorize.

$$C\cos(\omega_0 t-\pi/2)=C\sin(\omega_0 t),\qquad C\sin(\omega_0 t+\pi/2)=C\cos(\omega_0 t)$$
*These two identities are the core reason sine and cosine are interchangeable: shifting a cosine right by 90° produces a sine, and shifting a sine left by 90° produces a cosine. In practice this means you can always convert between the two function families by adjusting the phase angle by ±π/2, which is a tool you will use repeatedly when combining sinusoids.*

![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*These phasor diagrams show that adding two sinusoids of the same frequency is equivalent to adding two vectors, so the combined amplitude and phase can be read directly from the resultant vector's length and angle.*

## 3. Turning a cos-plus-sin Expression into One Sinusoid

**Start with Example (a):** x(t) = cos(ω₀t) − √3 sin(ω₀t)

Identify the coefficients: **a = 1**, **b = −√3**.

Step 1 — Amplitude:

C = √(a² + b²) = √(1² + (−√3)²) = √(1 + 3) = **2**

Step 2 — Phase angle:

Form the complex number **a − jb = 1 − j(−√3) = 1 + j√3**. This point sits in the first quadrant. Its angle is θ = tan⁻¹(√3 / 1) = **60°**.

Result: **x(t) = 2 cos(ω₀t + 60°)**

**General rule:**

a cos(ω₀t) + b sin(ω₀t) = C cos(ω₀t + θ)

where C = √(a² + b²) and θ is the angle of the complex number **a − jb**.

**Example (b) preview:** If a = −3 and b = 4, then a − jb = −3 − j4, which lands in the **third quadrant**. The calculator's raw arctangent output will be wrong — you must adjust to the correct quadrant manually.

### EXAM TIP

Always plot the point (a, −b) on the complex plane before trusting your calculator's arctangent result.

**Practice prompt:** Try x(t) = 3 cos(ω₀t) + 4 sin(ω₀t). What are C and θ? (Hint: form 3 − j4 and find its polar form.)

$$a\cos\omega_0 t+b\sin\omega_0 t=C\cos(\omega_0 t+\theta),\qquad C=\sqrt{a^2+b^2},\qquad \theta=\tan^{-1}\!\left(\frac{-b}{a}\right)$$
*The amplitude C and phase θ come directly from writing a − jb as a complex number and converting it to polar form: C is the magnitude and θ is the angle. The critical warning is that tan⁻¹(−b/a) alone does not determine the correct quadrant — a calculator always returns a value between −90° and +90°, but the true angle of a − jb may lie in any of the four quadrants. Always check the signs of a and −b separately to confirm which quadrant the angle belongs to before writing your final answer.*

---
**📌 Key Takeaways**
- General form: x(t) = C cos(ω₀t + θ), where C is amplitude and θ is phase in degrees or radians.
- Key relations: T₀ = 1/f₀ = 2π/ω₀ and ω₀ = 2πf₀ — know all three forms.
- Sine lags cosine by 90°: cos(ω₀t − π/2) = sin(ω₀t) and vice versa with +π/2.
- To combine a cos + b sin: use C = √(a²+b²) and θ = angle of complex number a − jb.
- Quadrant caution: arctangent alone is ambiguous — always check the signs of a and −b.

*Likely exam tasks: (1) read amplitude, frequency, period, and phase from a given expression; (2) convert between f₀ and ω₀ or T₀; (3) collapse a cos(ω₀t) + b sin(ω₀t) into a single cosine with correct amplitude and quadrant-adjusted phase. In the next section we will extend these ideas to complex exponentials and phasors, which provide an even more powerful algebraic tool for analyzing sinusoidal signals in circuits and systems.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlYWRfc2ludXNvaWRfcGFyYW1ldGVycyIsImxhYmVsIjoiUmVhZGluZyBhbXBsaXR1ZGUsIGZyZXF1ZW5jeSwgcGVyaW9kLCBhbmQgcGhhc2UgZnJvbSBhIHNpbnVzb2lkIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IDUgY29zKDQwz4B0IOKIkiAzMMKwKSwgd2hpY2ggb3B0aW9uIGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBBbXBsaXR1ZGUgPSA1LCBm4oKAID0gMjAgSHosIFTigoAgPSAwLjA1IHMsIHBoYXNlID0g4oiSMzDCsCIsIkIuIEFtcGxpdHVkZSA9IDQwz4AsIGbigoAgPSA1IEh6LCBU4oKAID0gMC4yIHMsIHBoYXNlID0g4oiSMzDCsCIsIkMuIEFtcGxpdHVkZSA9IDUsIGbigoAgPSA0MM+AIEh6LCBU4oKAID0gMS8oNDDPgCkgcywgcGhhc2UgPSAzMMKwIiwiRC4gQW1wbGl0dWRlID0gNSwgZuKCgCA9IDIwIEh6LCBU4oKAID0gMjAgcywgcGhhc2UgPSDiiJIzMMKwIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiU2luY2UgNDDPgCA9IDLPgGbigoAsIHdlIGdldCBm4oKAID0gMjAgSHouIFRoZSBwZXJpb2QgaXMgVOKCgCA9IDEvZuKCgCA9IDAuMDUgcy4gVGhlIGFtcGxpdHVkZSBpcyA1IGFuZCB0aGUgcGhhc2UgaXMg4oiSMzDCsC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiI0MM+AIGlzIHRoZSByYWRpYW4gZnJlcXVlbmN5IM+J4oKALCBub3QgdGhlIGFtcGxpdHVkZS4iLCJDIjoiNDDPgCBpcyBub3QgdGhlIGhlcnR6IGZyZXF1ZW5jeSwgYW5kIHRoZSBwaGFzZSBzaWduIHdhcyBmbGlwcGVkIGluY29ycmVjdGx5LiIsIkQiOiJU4oKAIGlzIHRoZSByZWNpcHJvY2FsIG9mIGZyZXF1ZW5jeSwgc28gaXQgaXMgMC4wNSBzLCBub3QgMjAgcy4ifSwiaGludCI6Ik1hdGNoIHRoZSBjb2VmZmljaWVudCBvZiB0IHdpdGggMs+AZuKCgC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgc2ludXNvaWQgaGFzIM+J4oKAID0gMTAwIHJhZC9zLiBXaGF0IGlzIGl0cyBwZXJpb2Q/Iiwib3B0aW9ucyI6WyJBLiAxMDAgcyIsIkIuIDEvMTAwIHMiLCJDLiAyz4AvMTAwIHMiLCJELiAxMDAvKDLPgCkgcyJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlVzZSBU4oKAID0gMs+AL8+J4oKALiBTdWJzdGl0dXRpbmcgz4nigoAgPSAxMDAgZ2l2ZXMgVOKCgCA9IDLPgC8xMDAgcy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGF0IHRyZWF0cyBwZXJpb2QgYXMgZXF1YWwgdG8gZnJlcXVlbmN5LCB3aGljaCBpcyBpbmNvcnJlY3QuIiwiQiI6IlRoYXQgd291bGQgYmUgY29ycmVjdCBmb3IgZuKCgCA9IDEwMCBIeiwgbm90IM+J4oKAID0gMTAwIHJhZC9zLiIsIkQiOiJUaGlzIGlzIHRoZSByZWNpcHJvY2FsIG9mIHRoZSBjb3JyZWN0IHJlbGF0aW9uLiJ9LCJoaW50IjoiUGVyaW9kIGZyb20gcmFkaWFuIGZyZXF1ZW5jeSB1c2VzIDLPgC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InBoYXNlX3NoaWZ0X3JlbGF0aW9uc2hpcHMiLCJsYWJlbCI6IlBoYXNlIHNoaWZ0IGFuZCB0aGUgc2luZS1jb3NpbmUgOTAtZGVncmVlIHJlbGF0aW9uc2hpcCIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBpZGVudGl0eSBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gY29zKM+J4oKAdCArIM+ALzIpID0gc2luKM+J4oKAdCkiLCJCLiBjb3Moz4nigoB0IOKIkiDPgC8yKSA9IHNpbijPieKCgHQpIiwiQy4gc2luKM+J4oKAdCDiiJIgz4AvMikgPSBjb3Moz4nigoB0KSIsIkQuIHNpbijPieKCgHQgKyDPgCkgPSBjb3Moz4nigoB0KSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkEgY29zaW5lIGRlbGF5ZWQgYnkgOTAgZGVncmVlcyBiZWNvbWVzIHNpbmU6IGNvcyjPieKCgHQg4oiSIM+ALzIpID0gc2luKM+J4oKAdCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlIHNpZ24gaXMgd3Jvbmc7IHRoaXMgc2hpZnQgZ2l2ZXMg4oiSc2luKM+J4oKAdCkuIiwiQyI6IlRoaXMgZG9lcyBub3QgZXF1YWwgY29zKM+J4oKAdCk7IHRoZSBzaWduL3NoaWZ0IHJlbGF0aW9uc2hpcCBpcyB3cm9uZy4iLCJEIjoiQSDPgCBzaGlmdCBmbGlwcyB0aGUgc2lnbiwgbm90IHRoZSBmdW5jdGlvbiBmYW1pbHkuIn0sImhpbnQiOiJUaGluazogc2luZSBsYWdzIGNvc2luZSBieSA5MCBkZWdyZWVzLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIHkodCkgPSBDIGNvcyjPieKCgHQpIGlzIGRlbGF5ZWQgYnkgb25lLXNpeHRoIG9mIGEgcGVyaW9kLCB3aGF0IHNpZ25hbCByZXN1bHRzPyIsIm9wdGlvbnMiOlsiQS4gQyBjb3Moz4nigoB0ICsgNjDCsCkiLCJCLiBDIGNvcyjPieKCgHQg4oiSIDYwwrApIiwiQy4gQyBzaW4oz4nigoB0ICsgNjDCsCkiLCJELiBDIHNpbijPieKCgHQg4oiSIDkwwrApIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiT25lLXNpeHRoIG9mIGEgcGVyaW9kIGNvcnJlc3BvbmRzIHRvIDYwIGRlZ3JlZXMuIEEgZGVsYXkgc2hpZnRzIHRoZSB3YXZlZm9ybSByaWdodCwgc28gdGhlIHBoYXNlIGJlY29tZXMgbmVnYXRpdmUuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiQSBwb3NpdGl2ZSBwaGFzZSBoZXJlIHdvdWxkIHJlcHJlc2VudCBhbiBhZHZhbmNlLCBub3QgYSBkZWxheS4iLCJDIjoiVGhlIHdhdmVmb3JtIGZhbWlseSBjaGFuZ2VzIHVubmVjZXNzYXJpbHk7IGEgZGVsYXkgb2YgY29zaW5lIGlzIHN0aWxsIG5hdHVyYWxseSB3cml0dGVuIGFzIGEgc2hpZnRlZCBjb3NpbmUuIiwiRCI6Ik9uZS1zaXh0aCBvZiBhIHBlcmlvZCBpcyA2MCBkZWdyZWVzLCBub3QgOTAgZGVncmVlcy4ifSwiaGludCI6IkRlbGF5IG1lYW5zIG1vdmUgcmlnaHQgaW4gdGltZSwgd2hpY2ggbWVhbnMgYSBuZWdhdGl2ZSBwaGFzZSBhbmdsZS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoicHl0aG9uX21hdHBsb3RsaWIgc2ludXNvaWQgc2hvd2luZyBvcmlnaW5hbCBjb3NpbmUgYW5kIGRlbGF5ZWQgY29zaW5lIGJ5IFQwLzYiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImFkZGl0aW9uX29mX3NpbnVzb2lkcyIsImxhYmVsIjoiQ29tYmluaW5nIGEgY29zIHRlcm0gYW5kIGEgc2luIHRlcm0gaW50byBvbmUgc2ludXNvaWQiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldyaXRlIHgodCkgPSBjb3Moz4nigoB0KSDiiJIg4oiaMyBzaW4oz4nigoB0KSBhcyBhIHNpbmdsZSBzaW51c29pZC4iLCJvcHRpb25zIjpbIkEuIDIgY29zKM+J4oKAdCDiiJIgNjDCsCkiLCJCLiAyIGNvcyjPieKCgHQgKyA2MMKwKSIsIkMuIOKImjIgY29zKM+J4oKAdCArIDQ1wrApIiwiRC4gMiBzaW4oz4nigoB0ICsgNjDCsCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJIZXJlIGEgPSAxIGFuZCBiID0g4oiS4oiaMywgc28gQyA9IOKImigxICsgMykgPSAyIGFuZCDOuCA9IHRhbuKBu8K5KOKIkmIvYSkgPSB0YW7igbvCuSjiiJozKSA9IDYwwrAuIFRodXMgeCh0KSA9IDIgY29zKM+J4oKAdCArIDYwwrApLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBtYWduaXR1ZGUgaXMgcmlnaHQgYnV0IHRoZSBwaGFzZSBzaWduIGlzIHdyb25nLiIsIkMiOiJCb3RoIHRoZSBhbXBsaXR1ZGUgYW5kIGFuZ2xlIGFyZSBpbmNvcnJlY3QuIiwiRCI6IlRoaXMgaXMgbm90IHRoZSB0YXJnZXQgZm9ybSBhbmQgdGhlIHBoYXNlIGRvZXMgbm90IG1hdGNoIHRoZSBnaXZlbiBjb2VmZmljaWVudHMuIn0sImhpbnQiOiJVc2UgQyA9IOKImihhwrIgKyBiwrIpIGFuZCBmb3JtIHRoZSBjb21wbGV4IG51bWJlciBhIOKIkiBqYiB0byBmaW5kIM64LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHgodCkgPSDiiJIzIGNvcyjPieKCgHQpICsgNCBzaW4oz4nigoB0KSwgd2hhdCBpcyB0aGUgY29ycmVjdCBhbXBsaXR1ZGUgQz8iLCJvcHRpb25zIjpbIkEuIDEiLCJCLiAzIiwiQy4gNCIsIkQuIDUiXSwiY29ycmVjdF9vcHRpb24iOiJEIiwiZXhwbGFuYXRpb24iOiJUaGUgYW1wbGl0dWRlIGlzIEMgPSDiiJooKOKIkjMpwrIgKyA0wrIpID0g4oiaKDkgKyAxNikgPSDiiJoyNSA9IDUuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyB3b3VsZCBjb21lIGZyb20gc3VidHJhY3RpbmcgY29tcG9uZW50cywgbm90IGNvbWJpbmluZyB0aGVtIGNvcnJlY3RseS4iLCJCIjoiMyBpcyBvbmx5IHRoZSBjb3NpbmUgY29lZmZpY2llbnQgbWFnbml0dWRlLiIsIkMiOiI0IGlzIG9ubHkgdGhlIHNpbmUgY29lZmZpY2llbnQgbWFnbml0dWRlLiJ9LCJoaW50IjoiVHJlYXQgdGhlIGNvZWZmaWNpZW50cyBhcyBwZXJwZW5kaWN1bGFyIGNvbXBvbmVudHMgYW5kIHVzZSB0aGUgUHl0aGFnb3JlYW4gdGhlb3JlbS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDNfcTMiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkEgY2FsY3VsYXRvciBnaXZlcyB0YW7igbvCuSgo4oiSNCkvKOKIkjMpKSA9IDUzLjHCsC4gV2h5IGlzIHRoYXQgbm90IHRoZSBjb3JyZWN0IHBoYXNlIGFuZ2xlIGZvciB4KHQpID0g4oiSMyBjb3Moz4nigoB0KSArIDQgc2luKM+J4oKAdCkgd2hlbiB1c2luZyBhIOKIkiBqYj8iLCJpZGVhbF9hbnN3ZXIiOiJCZWNhdXNlIHRoZSBwYWlyIGNvcnJlc3BvbmRzIHRvIHRoZSBjb21wbGV4IG51bWJlciBhIOKIkiBqYiA9IOKIkjMg4oiSIGo0LCB3aGljaCBsaWVzIGluIHRoZSB0aGlyZCBxdWFkcmFudCBvZiB0aGUgY29tcGxleCBwbGFuZS4gU28gdGhlIGFuZ2xlIG11c3QgYmUgYWRqdXN0ZWQgdG8gdGhlIGNvcnJlY3QgcXVhZHJhbnQsIGdpdmluZyB0aGUgcHJpbmNpcGFsIGFuZ2xlIOKIkjEyNi45wrAgcmF0aGVyIHRoYW4gKzUzLjHCsC4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IG1lbnRpb24gcXVhZHJhbnQgZXJyb3Igb3IgY2FsY3VsYXRvciBpbnZlcnNlLXRhbmdlbnQgYW1iaWd1aXR5IiwiTXVzdCBpZGVudGlmeSB0aGUgcmVsZXZhbnQgY29tcGxleCBudW1iZXIgYXMgYSDiiJIgamIgPSDiiJIzIOKIkiBqNCBvciBlcXVpdmFsZW50IGNvb3JkaW5hdGVzICjiiJIzLCDiiJI0KSIsIk11c3Qgc3RhdGUgdGhlIGNvcnJlY3RlZCBhbmdsZSBhcyDiiJIxMjYuOcKwIG9yIGFuIGVxdWl2YWxlbnQgY290ZXJtaW5hbCBhbmdsZSJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHRoZSBtYWluIGV4YW0gdHJhcDogaW52ZXJzZSB0YW5nZW50IGFsb25lIGRvZXMgbm90IGRldGVybWluZSB0aGUgY29ycmVjdCBwaGFzZSBxdWFkcmFudC4gVGhlIGNhbGN1bGF0b3IgYWx3YXlzIHJldHVybnMgYSB2YWx1ZSBpbiB0aGUgcmFuZ2UgKOKIkjkwwrAsIDkwwrApLCBidXQgdGhlIHRydWUgYW5nbGUgb2YgYSDiiJIgamIgY2FuIGJlIGluIGFueSBxdWFkcmFudC4iLCJoaW50IjoiUGxvdCB0aGUgcG9pbnQgd2l0aCByZWFsIHBhcnQgYSBhbmQgaW1hZ2luYXJ5IHBhcnQg4oiSYiBiZWZvcmUgdHJ1c3RpbmcgYXJjdGFuZ2VudC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoicHl0aG9uX21hdHBsb3RsaWIgY29tcGxleCBwbGFuZSB3aXRoIHBvaW50ICgtMywtNCksIG1hZ25pdHVkZSA1LCBhbmdsZSAtMTI2LjkgZGVncmVlcyIsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
