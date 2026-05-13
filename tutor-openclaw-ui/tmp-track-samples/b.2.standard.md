# B.2 Sinusoids

> **Section Objective:** Learn to read the parameters of a sinusoid and combine two same-frequency sinusoids into one.

This section has two jobs. First, given a sinusoid written as x(t) = C cos(ω₀t + θ), you will be able to name every parameter — amplitude, frequency, period, radian frequency, and phase — without hesitation. Second, you will learn to collapse a sum like a cos(ω₀t) + b sin(ω₀t) into a single cosine term.

A quick reminder: cosine and sine are simply smooth, repeating waves. They are the same shape — just shifted horizontally. Complex numbers will appear briefly as a calculation tool to find a magnitude and an angle; you do not need to treat them as a separate abstract topic.

On exams, these two skills appear constantly: identify the parameters, or rewrite a sum as one cosine. Both are straightforward once you know the steps.

## 1. Reading a Sinusoid

Every sinusoid of the form x(t) = C cos(ω₀t + θ) carries five pieces of information:

| Parameter | Symbol | Meaning |
|---|---|---|
| Amplitude | C | Peak height of the wave |
| Radian frequency | ω₀ | Rate of oscillation in rad/s |
| Ordinary frequency | f₀ | Cycles per second (Hz); f₀ = ω₀ / (2π) |
| Period | T₀ | Duration of one full cycle; T₀ = 1/f₀ |
| Phase | θ | Horizontal shift, in radians or degrees |

### KEY DISTINCTION

ω₀ and f₀ are **not** the same number. ω₀ is in rad/s; f₀ is in Hz. They are related by ω₀ = 2π f₀.

**Worked example:** If ω₀ = 4π, then f₀ = 4π / (2π) = 2 Hz, and T₀ = 1/2 = 0.5 s.

#### Unit Warning

Never mix degrees and radians inside the same problem. Pick one and convert everything to match before calculating.

$$x(t)=C\cos(2\pi f_0 t+\theta)=C\cos(\omega_0 t+\theta),\quad T_0=\frac{1}{f_0}=\frac{2\pi}{\omega_0},\quad \omega_0=2\pi f_0$$
*These formulas show the same sinusoid written with ordinary frequency f₀ or radian frequency ω₀ — both representations describe identical oscillations and produce the same period T₀.*

![Fig. B.6](/figures/page-017-fig__b_6-1.png)
*Cosine, sine, and a phase-shifted cosine are all the same waveform shape — the only difference is how far each is slid left or right along the time axis.*

## 2. Phase Shift Means Time Shift

Referring to Fig. B.6: changing the phase θ slides the waveform **left or right** — it does not move it up or down, and it does not change its height or shape.

- A **negative** phase, like −60°, shifts the wave to the **right** (later in time). We call this a **delay** or **lag**.
- A **positive** phase shifts the wave to the **left** (earlier in time). We call this an **advance** or **lead**.

**Plain-English definitions:**
- **Lead:** signal A leads signal B if A reaches its peak *earlier* than B.
- **Lag:** signal A lags signal B if A reaches its peak *later* than B.

**Two key facts to memorize:**

C cos(ω₀t − 60°) is delayed to the right by one-sixth of a period (since 60° is one-sixth of 360°).

C cos(ω₀t − π/2) = C sin(ω₀t), which means **sine lags cosine by 90°**, and equivalently, **cosine leads sine by 90°**.

## 3. Adding Sinusoids with the Same Frequency

When two sinusoids share the same radian frequency ω₀, their sum can always be collapsed into one sinusoid:

a cos(ω₀t) + b sin(ω₀t) = C cos(ω₀t + θ)

This only works because the frequencies match. The formulas that connect the coefficients are:

- a = C cos θ
- b = −C sin θ

Solving for C and θ:

- **C = √(a² + b²)**
- **θ = tan⁻¹(−b / a)**

### EXAM TRAP

A calculator's inverse tangent always returns an angle between −90° and +90°. That may be the **wrong quadrant**. Always check the signs of both a and −b to confirm which quadrant the angle belongs in.

**Connection to complex numbers:** The expression a − jb is a complex number whose magnitude is C and whose angle is θ. This is the phasor. You do not need to go deeper than that — just use it to find C and θ quickly.

> **Key rule:** Sinusoids with *different* frequencies cannot be combined this way.

$$a\cos\omega_0 t+b\sin\omega_0 t=C\cos(\omega_0 t+\theta),\quad C=\sqrt{a^2+b^2},\quad \theta=\tan^{-1}\!\left(\frac{-b}{a}\right)$$
*This is the standard conversion from separate cosine and sine terms into a single cosine, but θ must be placed in the correct quadrant by checking the signs of a and −b, not just reading the raw calculator output.*

![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*The phasor diagrams in Fig. B.8 turn sinusoid addition into vector addition, so the resulting amplitude and phase can be read directly from the length and angle of the combined arrow.*

---
**📌 Key Takeaways**
- Read C, f₀, T₀, ω₀, and θ directly from x(t) = C cos(ω₀t + θ); remember ω₀ = 2π f₀.
- A negative phase shifts the waveform right (later); sine lags cosine by exactly 90°.
- Combine a cos(ω₀t) + b sin(ω₀t) into C cos(ω₀t + θ) using C = √(a²+b²); check the quadrant.

*In the next section we will use these sinusoid and phasor ideas in more advanced signal analysis.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlYWRfc2ludXNvaWRfcGFyYW1ldGVycyIsImxhYmVsIjoiUmVhZCBhbXBsaXR1ZGUsIHBlcmlvZCwgZnJlcXVlbmN5LCByYWRpYW4gZnJlcXVlbmN5LCBhbmQgcGhhc2UgZnJvbSBhIHNpbnVzb2lkIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IDNjb3MoOM+AdCDiiJIgMzDCsCksIHdoaWNoIHN0YXRlbWVudCBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gQW1wbGl0dWRlID0gMywgZuKCgCA9IDQgSHosIFTigoAgPSAwLjI1IHMiLCJCLiBBbXBsaXR1ZGUgPSA4z4AsIGbigoAgPSA0IEh6LCBU4oKAID0gMC41IHMiLCJDLiBBbXBsaXR1ZGUgPSAzLCBm4oKAID0gOM+AIEh6LCBU4oKAID0gMC4xMjUgcyIsIkQuIEFtcGxpdHVkZSA9IDMsIGbigoAgPSA4IEh6LCBU4oKAID0gMC4xMjUgcyJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlNpbmNlIM+J4oKAID0gOM+ALCB0aGUgb3JkaW5hcnkgZnJlcXVlbmN5IGlzIGbigoAgPSDPieKCgCAvICgyz4ApID0gNCBIeiwgc28gdGhlIHBlcmlvZCBpcyBU4oKAID0gMS80ID0gMC4yNSBzLiBUaGUgYW1wbGl0dWRlIGlzIHRoZSBjb2VmZmljaWVudCAzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IjjPgCBpcyB0aGUgcmFkaWFuIGZyZXF1ZW5jeSwgbm90IHRoZSBhbXBsaXR1ZGUsIGFuZCBU4oKAIGlzIG5vdCAwLjUgcy4iLCJDIjoiZuKCgCBpcyBub3QgZXF1YWwgdG8gz4nigoA7IHlvdSBtdXN0IGRpdmlkZSBieSAyz4AgZmlyc3QuIiwiRCI6IkRpdmlkaW5nIDjPgCBieSAyz4AgZ2l2ZXMgNCwgbm90IDguIn0sImhpbnQiOiJTZXBhcmF0ZSBhbXBsaXR1ZGUgZnJvbSBhbmd1bGFyIGZyZXF1ZW5jeSwgdGhlbiB1c2UgZuKCgCA9IM+J4oKAIC8gKDLPgCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJBIHN0dWRlbnQgc2F5cyDPieKCgCBhbmQgZuKCgCBhcmUgJ3RoZSBzYW1lIGZyZXF1ZW5jeSB3cml0dGVuIGRpZmZlcmVudGx5LCBzbyB0aGV5IGhhdmUgdGhlIHNhbWUgbnVtZXJpY2FsIHZhbHVlLicgV2hhdCBpcyB0aGUgYmVzdCByZXNwb25zZT8iLCJvcHRpb25zIjpbIkEuIENvcnJlY3QsIGJlY2F1c2UgYm90aCBkZXNjcmliZSByZXBldGl0aW9ucyBwZXIgc2Vjb25kIiwiQi4gSW5jb3JyZWN0LCBiZWNhdXNlIM+J4oKAIGlzIGluIHJhZC9zIGFuZCBlcXVhbHMgMs+AIGbigoAiLCJDLiBDb3JyZWN0IG9ubHkgd2hlbiDOuCA9IDAiLCJELiBJbmNvcnJlY3QsIGJlY2F1c2Ugz4nigoAgZXF1YWxzIDEvZuKCgCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZXkgcmVmZXIgdG8gdGhlIHNhbWUgb3NjaWxsYXRpb24gcmF0ZSBidXQgdXNlIGRpZmZlcmVudCB1bml0cy4gVGhlIGNvbnZlcnNpb24gaXMgz4nigoAgPSAyz4AgZuKCgCwgc28gdGhlIG51bWVyaWNhbCB2YWx1ZXMgYXJlIGdlbmVyYWxseSBkaWZmZXJlbnQuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiT25seSBm4oKAIGlzIGluIGhlcnR6LCBtZWFuaW5nIGN5Y2xlcyBwZXIgc2Vjb25kLiIsIkMiOiJUaGUgcGhhc2UgZG9lcyBub3QgYWZmZWN0IHRoZSByZWxhdGlvbnNoaXAgYmV0d2VlbiDPieKCgCBhbmQgZuKCgC4iLCJEIjoiMS9m4oKAIGlzIHRoZSBwZXJpb2QsIG5vdCDPieKCgC4ifSwiaGludCI6Ik9uZSBpcyBjeWNsZXMgcGVyIHNlY29uZDsgdGhlIG90aGVyIGlzIHJhZGlhbnMgcGVyIHNlY29uZC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InBoYXNlX3NoaWZ0X2FuZF9sZWFkX2xhZyIsImxhYmVsIjoiSW50ZXJwcmV0IHBoYXNlIHNoaWZ0IGFzIGEgdGltZSBzaGlmdCBhbmQgcmVsYXRlIHNpbmUvY29zaW5lIGJ5IHF1YXJ0ZXItY3ljbGUgc2hpZnQiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHN0YXRlbWVudCBhYm91dCB4KHQpID0gQyBjb3Moz4nigoB0IOKIkiA2MMKwKSBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gSXQgaXMgc2hpZnRlZCBsZWZ0IGJ5IG9uZS1zaXh0aCBvZiBhIHBlcmlvZCIsIkIuIEl0IGlzIHNoaWZ0ZWQgcmlnaHQgYnkgb25lLXNpeHRoIG9mIGEgcGVyaW9kIiwiQy4gSXQgaXMgc2hpZnRlZCByaWdodCBieSBvbmUtcXVhcnRlciBvZiBhIHBlcmlvZCIsIkQuIEl0IGlzIHNoaWZ0ZWQgdXB3YXJkIGJ5IDYwIGRlZ3JlZXMiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJBIG5lZ2F0aXZlIHBoYXNlIGluc2lkZSBjb3NpbmUgY29ycmVzcG9uZHMgdG8gYSBkZWxheSwgc28gdGhlIGdyYXBoIG1vdmVzIHJpZ2h0LiBTaW5jZSA2MMKwIGlzIG9uZS1zaXh0aCBvZiAzNjDCsCwgdGhlIHNoaWZ0IGlzIFTigoAvNi4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJBIGxlZnQgc2hpZnQgd291bGQgY29ycmVzcG9uZCB0byBhbiBhZHZhbmNlIChwb3NpdGl2ZSBwaGFzZSksIG5vdCBhIGRlbGF5LiIsIkMiOiJPbmUtcXVhcnRlciBwZXJpb2QgY29ycmVzcG9uZHMgdG8gOTDCsCwgbm90IDYwwrAuIiwiRCI6IlBoYXNlIGNoYW5nZXMgaG9yaXpvbnRhbCBwb3NpdGlvbiwgbm90IHZlcnRpY2FsIGRpc3BsYWNlbWVudC4ifSwiaGludCI6Ik5lZ2F0aXZlIHBoYXNlIGluIGNvcyjPieKCgHQg4oiSIM+GKSBtZWFucyB0aGUgcGVhayBhcnJpdmVzIGxhdGVyIGluIHRpbWUuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6IndhdmVmb3JtIHBoYXNlLXNoaWZ0IHNrZXRjaCIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggaWRlbnRpdHkgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIEMgY29zKM+J4oKAdCArIM+ALzIpID0gQyBzaW4oz4nigoB0KSIsIkIuIEMgY29zKM+J4oKAdCDiiJIgz4AvMikgPSBDIHNpbijPieKCgHQpIiwiQy4gQyBzaW4oz4nigoB0IOKIkiDPgC8yKSA9IEMgY29zKM+J4oKAdCkiLCJELiBDIHNpbijPieKCgHQpID0gQyBjb3Moz4nigoB0KSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkRlbGF5aW5nIGNvc2luZSBieSBhIHF1YXJ0ZXItY3ljbGUgZ2l2ZXMgc2luZTogQyBjb3Moz4nigoB0IOKIkiDPgC8yKSA9IEMgc2luKM+J4oKAdCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiQWRkaW5nIM+ALzIgYWR2YW5jZXMgY29zaW5lIHJhdGhlciB0aGFuIGRlbGF5aW5nIGl0LCBwcm9kdWNpbmcgYSBkaWZmZXJlbnQgcmVzdWx0LiIsIkMiOiJUaGUgY29ycmVjdCByZWxhdGVkIGlkZW50aXR5IGlzIEMgc2luKM+J4oKAdCArIM+ALzIpID0gQyBjb3Moz4nigoB0KS4iLCJEIjoiU2luZSBhbmQgY29zaW5lIGFyZSBub3QgaWRlbnRpY2FsOyB0aGV5IGFyZSBwaGFzZS1zaGlmdGVkIHZlcnNpb25zIG9mIGVhY2ggb3RoZXIuIn0sImhpbnQiOiJUaGluazogc2luZSBsYWdzIGNvc2luZSBieSA5MMKwLCBzbyBjb3NpbmUgZGVsYXllZCBieSA5MMKwIGVxdWFscyBzaW5lLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiY29tYmluZV9zYW1lX2ZyZXF1ZW5jeV9zaW51c29pZHMiLCJsYWJlbCI6IlJld3JpdGUgYSBjb3Moz4nigoB0KSArIGIgc2luKM+J4oKAdCkgYXMgb25lIHNpbnVzb2lkIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJSZXdyaXRlIHgodCkgPSBjb3Moz4nigoB0KSDiiJIg4oiaMyBzaW4oz4nigoB0KSBhcyBhIHNpbmdsZSBjb3NpbmUuIiwib3B0aW9ucyI6WyJBLiAyY29zKM+J4oKAdCDiiJIgNjDCsCkiLCJCLiAyY29zKM+J4oKAdCArIDYwwrApIiwiQy4gMmNvcyjPieKCgHQgKyAzMMKwKSIsIkQuIOKImjIgY29zKM+J4oKAdCArIDYwwrApIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiSGVyZSBhID0gMSBhbmQgYiA9IOKIkuKImjMuIFRoZW4gQyA9IOKImigxICsgMykgPSAyIGFuZCDOuCA9IHRhbuKBu8K5KOKIkmIvYSkgPSB0YW7igbvCuSjiiJozKSA9IDYwwrAsIHNvIHgodCkgPSAyY29zKM+J4oKAdCArIDYwwrApLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBzaWduIG9mIM64IGlzIHdyb25nIGZvciB0aGVzZSBjb2VmZmljaWVudHM7IOKIkmIvYSBpcyBwb3NpdGl2ZSBoZXJlLCBnaXZpbmcgYSBwb3NpdGl2ZSBhbmdsZS4iLCJDIjoiVGhlIGFuZ2xlIGRvZXMgbm90IG1hdGNoIHRoZSByYXRpbyDiiJJiL2EgPSDiiJozLCB3aG9zZSBpbnZlcnNlIHRhbmdlbnQgaXMgNjDCsCwgbm90IDMwwrAuIiwiRCI6IlRoZSBhbXBsaXR1ZGUgc2hvdWxkIGJlIOKImigxICsgMykgPSAyLCBub3Qg4oiaMi4ifSwiaGludCI6IlVzZSBDID0g4oiaKGHCsiArIGLCsikgYW5kIGNvbXB1dGUg4oiSYi9hIGNhcmVmdWxseSwgdGhlbiBjaGVjayB0aGUgcXVhZHJhbnQuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHgodCkgPSDiiJIzY29zKM+J4oKAdCkgKyA0c2luKM+J4oKAdCksIHdoYXQgaXMgdGhlIGNvcnJlY3QgcmVzdWx0aW5nIGFtcGxpdHVkZT8iLCJvcHRpb25zIjpbIkEuIDEiLCJCLiA0IiwiQy4gNSIsIkQuIDciXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJUaGUgYW1wbGl0dWRlIGlzIEMgPSDiiJooKOKIkjMpwrIgKyA0wrIpID0g4oiaKDkgKyAxNikgPSDiiJoyNSA9IDUuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBpcyBub3QgZm91bmQgYnkgc3VidHJhY3RpbmcgdGhlIGNvZWZmaWNpZW50cy4iLCJCIjoiNCBpcyBvbmx5IHRoZSBtYWduaXR1ZGUgb2YgdGhlIHNpbmUgY29lZmZpY2llbnQsIG5vdCB0aGUgY29tYmluZWQgYW1wbGl0dWRlLiIsIkQiOiJUaGUgY29lZmZpY2llbnRzIGRvIG5vdCBhZGQgZGlyZWN0bHk7IHVzZSB0aGUgUHl0aGFnb3JlYW4gZm9ybXVsYS4ifSwiaGludCI6IlVzZSB0aGUgUHl0aGFnb3JlYW4gZm9ybXVsYSBDID0g4oiaKGHCsiArIGLCsiksIG5vdCBzaW1wbGUgYWRkaXRpb24gb3Igc3VidHJhY3Rpb24uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EzIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJFeHBsYWluIHdoeSB1c2luZyDOuCA9IHRhbuKBu8K5KOKIkmIvYSkgd2l0aG91dCBjaGVja2luZyBzaWducyBjYW4gZ2l2ZSB0aGUgd3JvbmcgcGhhc2UgZm9yIGEgY29zKM+J4oKAdCkgKyBiIHNpbijPieKCgHQpLiIsImlkZWFsX2Fuc3dlciI6IlRoZSBpbnZlcnNlIHRhbmdlbnQgZnVuY3Rpb24gYWx3YXlzIHJldHVybnMgYW4gYW5nbGUgYmV0d2VlbiDiiJI5MMKwIGFuZCArOTDCsCwgc28gaXQgY2Fubm90IGRpc3Rpbmd1aXNoIGJldHdlZW4gdHdvIGFuZ2xlcyB0aGF0IGhhdmUgdGhlIHNhbWUgdGFuZ2VudCB2YWx1ZSBidXQgbGllIGluIGRpZmZlcmVudCBxdWFkcmFudHMuIFNpbmNlIHRoZSBhY3R1YWwgcGhhc29yIGlzIHRoZSBjb21wbGV4IG51bWJlciBhIOKIkiBqYiwgdGhlIHNpZ25zIG9mIGl0cyByZWFsIHBhcnQgYSBhbmQgaW1hZ2luYXJ5IHBhcnQg4oiSYiBtdXN0IGJlIGNoZWNrZWQgdG8gZGV0ZXJtaW5lIHdoaWNoIHF1YWRyYW50IHRoZSBhbmdsZSBiZWxvbmdzIGluLiBJZiB0aGUgcmF3IGNhbGN1bGF0b3IgYW5nbGUgaXMgaW4gdGhlIHdyb25nIHF1YWRyYW50LCBpdCBtdXN0IGJlIGFkanVzdGVkIGJ5IGFkZGluZyBvciBzdWJ0cmFjdGluZyAxODDCsC4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IG1lbnRpb24gcXVhZHJhbnQgYW1iaWd1aXR5IG9mIHRoZSBpbnZlcnNlIHRhbmdlbnQgZnVuY3Rpb24iLCJNdXN0IGNvbm5lY3QgdGhlIHNpZ25zIHRvIGEgYW5kIOKIkmIsIG9yIHRvIHRoZSBwaGFzb3IvY29tcGxleCBudW1iZXIgYSDiiJIgamIiLCJNdXN0IHN0YXRlIHRoYXQgdGhlIHJhdyBjYWxjdWxhdG9yIGFuZ2xlIG1heSBuZWVkIGFkanVzdG1lbnQiXSwiZXhwbGFuYXRpb24iOiJUaGlzIGNoZWNrcyB3aGV0aGVyIHRoZSBzdHVkZW50IHVuZGVyc3RhbmRzIHRoZSBtYWluIGV4YW0gdHJhcCDigJQgbm90IGp1c3QgdGhlIGZvcm11bGEsIGJ1dCB3aGVuIGFuZCB3aHkgaXQgY2FuIGZhaWwuIiwiaGludCI6IkFzayB5b3Vyc2VsZjogd2hlcmUgZG9lcyB0aGUgcGhhc29yIGEg4oiSIGpiIGxpZSB3aGVuIGEgaXMgbmVnYXRpdmUsIG9yIHdoZW4g4oiSYiBpcyBuZWdhdGl2ZT8iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX1dfQ==" style="display:none;"></div>%%KC_END%%
