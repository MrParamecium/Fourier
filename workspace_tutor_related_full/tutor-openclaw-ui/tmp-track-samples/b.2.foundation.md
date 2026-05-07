# B.2 Sinusoids

> **Section Objective:** Learn how sinusoidal signals are described and how multiple same-frequency sinusoids combine into one.

This section is about two things: reading sinusoids and combining them. By the end, you will be able to do three things that show up constantly on exams. First, you will read every parameter — amplitude, frequency, phase — directly from the expression C cos(ω₀t + θ). Second, you will understand why sine and cosine are the same wave, just shifted in time. Third, you will convert an awkward sum like a cos(ω₀t) + b sin(ω₀t) into a single clean cosine. Many exam problems hide a simple one-sinusoid answer behind messy algebra. Recognizing that pattern is the skill this section builds.

## 1. Reading a Sinusoid

The standard form of a sinusoidal signal is x(t) = C cos(ω₀t + θ). Each symbol has a specific name and unit:

- **C** = amplitude — the peak value, always positive
- **θ** (theta) = phase — the starting angle, in radians or degrees
- **f₀** = frequency in hertz (Hz) — how many full cycles occur per second
- **ω₀** = 2πf₀ = radian frequency — the same rate expressed in radians per second
- **T₀** = 1/f₀ = 2π/ω₀ = period — the time for one complete cycle

#### Warning
Never mix degrees and radians in the same calculation. Pick one unit and convert everything to it before computing.

**Quick example:** For x(t) = 3 cos(20t − 30°), the amplitude is 3, the radian frequency is ω₀ = 20 rad/s, and the phase is −30°. The negative phase means the wave is shifted to the right compared to a plain cosine with no phase term.

$$x(t)=C\cos(2\pi f_0 t+\theta)=C\cos(\omega_0 t+\theta),\qquad \omega_0=2\pi f_0,\qquad T_0=\frac{1}{f_0}=\frac{2\pi}{\omega_0}$$
*The same sinusoid can be described using either hertz frequency f₀ or radian frequency ω₀, and the period T₀ is simply the time for one full repeat of the cycle.*

![Fig. B.6](/figures/page-017-fig__b_6-1.png)
*The three sketches show cosine, sine, and a delayed cosine side by side, making it visually clear that a phase shift is simply a left-right translation of the wave along the time axis.*

## 2. Phase Shifts: Why Sine and Cosine Are the Same Shape, Shifted

Look at Fig. B.6. The cosine and sine curves are identical in shape — same amplitude, same period. The only difference is where each one starts. This is not a coincidence; it is a precise relationship.

Delaying C cos(ω₀t) by exactly one-quarter of a period produces C sin(ω₀t). In angle terms, one quarter cycle equals 90° or π/2 radians. This gives the identity:

> C cos(ω₀t − π/2) = C sin(ω₀t)

Reading this in plain language: **sine lags cosine by 90°**. Equivalently, **cosine leads sine by 90°**. The reverse identity is C sin(ω₀t + π/2) = C cos(ω₀t).

A phase shift changes only *when* the wave reaches its peak — it does not change the amplitude or the frequency.

### KEY INSIGHT

A 60° phase delay equals a time delay of T₀/6, because 60° is exactly one-sixth of a full 360° cycle. This is the textbook example: C cos(ω₀t − 60°) is the same wave as C cos(ω₀t), just starting later by T₀/6 seconds.

## 3. Adding Sinusoids of the Same Frequency

Suppose you have two terms at the same frequency: a cos(ω₀t) + b sin(ω₀t). The key result is that these two terms always combine into a single cosine:

> a cos(ω₀t) + b sin(ω₀t) = C cos(ω₀t + θ)

**This only works because both terms share the same frequency ω₀.** If the frequencies were different, no such simplification would be possible.

To find the new amplitude and phase:

- **C = √(a² + b²)** — this is the length of the vector (a, −b) in the plane
- **θ = tan⁻¹(−b / a)** — this is the angle of that same vector

### COMMON MISTAKE

Your calculator's arctangent function always returns an angle between −90° and +90°. That covers only two quadrants. You must check the signs of **a** and **−b** separately to determine which quadrant the angle actually lives in, then adjust if needed.

Think of the pair (a, −b) as a point on a 2D plane. C is its distance from the origin and θ is its direction. The formula is just converting from rectangular coordinates to polar coordinates — a concept from basic geometry.

$$a\cos\omega_0 t+b\sin\omega_0 t=C\cos(\omega_0 t+\theta),\qquad C=\sqrt{a^2+b^2},\qquad \theta=\tan^{-1}\!\left(\frac{-b}{a}\right)$$
*This formula compresses two same-frequency sinusoidal terms into one, where the amplitude comes from the vector length of (a, −b) and the phase comes from its angle — but the angle must always be placed in the correct quadrant by checking the signs of a and −b.*

![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*The phasor diagrams convert sinusoid addition into vector addition, so the resulting amplitude and phase of the combined sinusoid can be read directly from the geometry of the diagram.*

---
**📌 Key Takeaways**
- In C cos(ω₀t + θ), C is amplitude, θ is phase, f₀ = ω₀/2π is frequency, and T₀ = 1/f₀ is period.
- Sine lags cosine by 90°: cos(ω₀t − π/2) = sin(ω₀t); a phase shift moves the wave in time only.
- a cos(ω₀t) + b sin(ω₀t) = C cos(ω₀t + θ) with C = √(a²+b²) and θ = tan⁻¹(−b/a), quadrant-checked.

*In the next section we will build on this sinusoid and phasor viewpoint.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlYWRfc2ludXNvaWRfcGFyYW1ldGVycyIsImxhYmVsIjoiUmVhZCBhbXBsaXR1ZGUsIHBlcmlvZCwgZnJlcXVlbmN5LCByYWRpYW4gZnJlcXVlbmN5LCBhbmQgcGhhc2UgZnJvbSBzaW51c29pZCBmb3JtIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IDQgY29zKDEwz4AgdCDiiJIgMzDCsCksIHdoaWNoIHN0YXRlbWVudCBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gQW1wbGl0dWRlID0gMTDPgCwgZnJlcXVlbmN5ID0gNCBIeiIsIkIuIEFtcGxpdHVkZSA9IDQsIHJhZGlhbiBmcmVxdWVuY3kgPSAxMM+ALCBmcmVxdWVuY3kgPSA1IEh6IiwiQy4gQW1wbGl0dWRlID0gNCwgcGVyaW9kID0gNSBzIiwiRC4gUGhhc2UgPSArMzDCsCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkluIHgodCkgPSBDIGNvcyjPieKCgHQgKyDOuCksIEMgPSA0IGFuZCDPieKCgCA9IDEwz4AuIFNpbmNlIGbigoAgPSDPieKCgCAvICgyz4ApLCB0aGUgZnJlcXVlbmN5IGlzIDUgSHouIFRoZSBwaGFzZSBpcyDiiJIzMMKwLCBub3QgKzMwwrAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiMTDPgCBpcyB0aGUgcmFkaWFuIGZyZXF1ZW5jeSwgbm90IHRoZSBhbXBsaXR1ZGUsIGFuZCA0IGlzIHRoZSBhbXBsaXR1ZGUsIG5vdCB0aGUgZnJlcXVlbmN5LiIsIkMiOiJJZiBm4oKAID0gNSBIeiwgdGhlbiBU4oKAID0gMS81IHMgPSAwLjIgcywgbm90IDUgcy4iLCJEIjoiVGhlIHBoYXNlIHNob3duIGluIHRoZSBleHByZXNzaW9uIGlzIG5lZ2F0aXZlIDMwwrAuIn0sImhpbnQiOiJNYXRjaCBlYWNoIHN5bWJvbCBkaXJlY3RseSB0byBDLCDPieKCgCwgYW5kIM64IGJlZm9yZSBjb21wdXRpbmcgZnJlcXVlbmN5LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBzaW51c29pZCBoYXMgcGVyaW9kIFTigoAgPSAwLjAyIHMuIFdoYXQgaXMgaXRzIGZyZXF1ZW5jeSBhbmQgcmFkaWFuIGZyZXF1ZW5jeT8iLCJvcHRpb25zIjpbIkEuIDIwIEh6IGFuZCA0MM+AIHJhZC9zIiwiQi4gNTAgSHogYW5kIDEwMM+AIHJhZC9zIiwiQy4gNTAgSHogYW5kIDI1z4AgcmFkL3MiLCJELiAwLjAyIEh6IGFuZCAyz4AvMC4wMiByYWQvcyJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkZyZXF1ZW5jeSBpcyBm4oKAID0gMS9U4oKAID0gMS8wLjAyID0gNTAgSHouIFRoZW4gz4nigoAgPSAyz4AgZuKCgCA9IDEwMM+AIHJhZC9zLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IjIwIEh6IGFuZCA0MM+AIHJhZC9zIHdvdWxkIGNvcnJlc3BvbmQgdG8gVOKCgCA9IDAuMDUgcywgbm90IDAuMDIgcy4iLCJDIjoiVGhlIGZyZXF1ZW5jeSBpcyBjb3JyZWN0IGF0IDUwIEh6LCBidXQgMjXPgCBpcyBvbmx5IGhhbGYgdGhlIGNvcnJlY3QgcmFkaWFuIGZyZXF1ZW5jeS4iLCJEIjoiMC4wMiBpcyB0aGUgcGVyaW9kIGluIHNlY29uZHMsIG5vdCB0aGUgZnJlcXVlbmN5IGluIGhlcnR6LiJ9LCJoaW50IjoiVXNlIGbigoAgPSAxL1TigoAgZmlyc3QsIHRoZW4gbXVsdGlwbHkgYnkgMs+AIHRvIGdldCDPieKCgC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InBoYXNlX3NoaWZ0X3JlbGF0aW9uc2hpcHMiLCJsYWJlbCI6IlJlY29nbml6ZSBzaW5lLWNvc2luZSBwaGFzZSBzaGlmdHMgYW5kIGxlYWQtbGFnIGxhbmd1YWdlIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGlkZW50aXR5IGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBjb3Moz4nigoB0ICsgz4AvMikgPSBzaW4oz4nigoB0KSIsIkIuIGNvcyjPieKCgHQg4oiSIM+ALzIpID0gc2luKM+J4oKAdCkiLCJDLiBzaW4oz4nigoB0IOKIkiDPgC8yKSA9IGNvcyjPieKCgHQpIiwiRC4gc2luKM+J4oKAdCkgbGVhZHMgY29zKM+J4oKAdCkgYnkgOTDCsCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkRlbGF5aW5nIGNvc2luZSBieSDPgC8yIGdpdmVzIHNpbmUsIHNvIGNvcyjPieKCgHQg4oiSIM+ALzIpID0gc2luKM+J4oKAdCkuIEVxdWl2YWxlbnRseSwgc2luZSBsYWdzIGNvc2luZSBieSA5MMKwLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkFkZGluZyDPgC8yIHRvIGNvc2luZSBnaXZlcyDiiJJzaW4oz4nigoB0KSwgbm90ICtzaW4oz4nigoB0KS4gVGhlIHNpZ24gaXMgd3JvbmcuIiwiQyI6IlRoZSBjb3JyZWN0IHJldmVyc2UgaWRlbnRpdHkgaXMgc2luKM+J4oKAdCArIM+ALzIpID0gY29zKM+J4oKAdCksIG5vdCBtaW51cyDPgC8yLiIsIkQiOiJJdCBpcyB0aGUgb3Bwb3NpdGU6IGNvc2luZSBsZWFkcyBzaW5lIGJ5IDkwwrAsIG5vdCB0aGUgb3RoZXIgd2F5IGFyb3VuZC4ifSwiaGludCI6IlJlbWVtYmVyIHRoZSB0ZXh0Ym9vayBwaHJhc2luZzogc2luZSBsYWdzIGNvc2luZSBieSA5MMKwLCB3aGljaCBtZWFucyBjb3NpbmUgaGFzIGEgbWludXMgz4AvMiBwaGFzZSB0byBiZWNvbWUgc2luZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImNvbWJpbmVfc2FtZV9mcmVxdWVuY3lfc2ludXNvaWRzIiwibGFiZWwiOiJSZXdyaXRlIGEgY29zICsgYiBzaW4gYXMgb25lIGNvc2luZSBhbmQgaW50ZXJwcmV0IHBoYXNvcnMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldyaXRlIHgodCkgPSBjb3Moz4nigoB0KSDiiJIg4oiaMyBzaW4oz4nigoB0KSBhcyBhIHNpbmdsZSBjb3NpbmUuIiwib3B0aW9ucyI6WyJBLiAyIGNvcyjPieKCgHQg4oiSIDYwwrApIiwiQi4gMiBjb3Moz4nigoB0ICsgNjDCsCkiLCJDLiAyIGNvcyjPieKCgHQg4oiSIDMwwrApIiwiRC4gY29zKM+J4oKAdCArIDYwwrApIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiSGVyZSBhID0gMSBhbmQgYiA9IOKIkuKImjMuIFRoZW4gQyA9IOKImigxwrIgKyAo4oiaMynCsikgPSDiiJooMSArIDMpID0gMi4gVGhlIHBoYXNlIGlzIM64ID0gdGFu4oG7wrko4oiSYi9hKSA9IHRhbuKBu8K5KOKImjMvMSkgPSA2MMKwLiBTbyB4KHQpID0gMiBjb3Moz4nigoB0ICsgNjDCsCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlIGFtcGxpdHVkZSBpcyBjb3JyZWN0IGF0IDIsIGJ1dCB0aGUgc2lnbiBvZiB0aGUgcGhhc2UgaXMgd3JvbmcuIFNpbmNlIOKIkmIvYSA9IOKImjMgPiAwIGFuZCBhID4gMCwgdGhlIGFuZ2xlIGlzIGluIHRoZSBmaXJzdCBxdWFkcmFudCwgZ2l2aW5nICs2MMKwLCBub3Qg4oiSNjDCsC4iLCJDIjoiVGhlIGFtcGxpdHVkZSBpcyBjb3JyZWN0IGJ1dCAzMMKwIGlzIG5vdCB0aGUgcmlnaHQgYW5nbGUuIHRhbuKBu8K5KOKImjMpID0gNjDCsCwgbm90IDMwwrAuIiwiRCI6IlRoZSBwaGFzZSBhbmdsZSBpcyBjb3JyZWN0IGF0ICs2MMKwLCBidXQgdGhlIGFtcGxpdHVkZSBzaG91bGQgYmUgMiwgbm90IDEuIn0sImhpbnQiOiJVc2UgQyA9IOKImihhwrIgKyBiwrIpLCB0aGVuIGNvbXB1dGUgzrggZnJvbSDiiJJiL2EuIEhlcmUgYiA9IOKIkuKImjMsIHNvIOKIkmIvYSA9IOKImjMuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IOKIkjMgY29zKM+J4oKAdCkgKyA0IHNpbijPieKCgHQpLCB3aGljaCBwYWlyIChDLCDOuCkgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIEMgPSA1LCDOuCA9IOKIkjUzLjHCsCIsIkIuIEMgPSA3LCDOuCA9IDEyNi45wrAiLCJDLiBDID0gNSwgzrggPSDiiJIxMjYuOcKwIiwiRC4gQyA9IDEsIM64ID0gMTI2LjnCsCJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IldpdGggYSA9IOKIkjMgYW5kIGIgPSA0LCB0aGUgdmVjdG9yIHBvaW50IGlzIChhLCDiiJJiKSA9ICjiiJIzLCDiiJI0KS4gSXRzIGxlbmd0aCBpcyDiiJooOSArIDE2KSA9IDUuIEJvdGggY29vcmRpbmF0ZXMgYXJlIG5lZ2F0aXZlLCBwbGFjaW5nIHRoZSBwb2ludCBpbiBxdWFkcmFudCBJSUkuIFRoZSBwcmluY2lwYWwgYW5nbGUgaXMgzrggPSDiiJIxMjYuOcKwIChvciBlcXVpdmFsZW50bHkgMTgwwrAgKyA1My4xwrAgbWVhc3VyZWQgZnJvbSB0aGUgbmVnYXRpdmUgcmVhbCBheGlzKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJDID0gNSBpcyBjb3JyZWN0LCBidXQg4oiSNTMuMcKwIHBsYWNlcyB0aGUgcG9pbnQgaW4gcXVhZHJhbnQgSVYsIHdoaWNoIGRvZXMgbm90IG1hdGNoICjiiJIzLCDiiJI0KSBpbiBxdWFkcmFudCBJSUkuIiwiQiI6IlRoZSBhbXBsaXR1ZGUgaXMgbm90IDcg4oCUIHRoYXQgd291bGQgcmVxdWlyZSBhwrIgKyBiwrIgPSA0OSwgYnV0IGhlcmUgaXQgZXF1YWxzIDI1LiBBbHNvIDEyNi45wrAgaXMgaW4gcXVhZHJhbnQgSUksIG5vdCBJSUkuIiwiRCI6Ik5laXRoZXIgdGhlIGFtcGxpdHVkZSBub3IgdGhlIGFuZ2xlIGlzIGNvcnJlY3QuIEMgPSDiiJooOSsxNikgPSA1LCBub3QgMS4ifSwiaGludCI6IkNoZWNrIHRoZSBxdWFkcmFudCB1c2luZyB0aGUgc2lnbnMgb2YgYSBhbmQg4oiSYiBiZWZvcmUgdHJ1c3RpbmcgdGhlIGFyY3RhbmdlbnQgb3V0cHV0LiBIZXJlIGEgPSDiiJIzIGFuZCDiiJJiID0g4oiSNCwgYm90aCBuZWdhdGl2ZSwgc28gdGhlIGFuZ2xlIGlzIGluIHF1YWRyYW50IElJSS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoicGhhc29yX2RpYWdyYW0iLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDNfcTMiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IldoeSBpcyBpdCBpbXBvcnRhbnQgdGhhdCB0aGUgdHdvIHRlcm1zIGluIGEgY29zKM+J4oKAdCkgKyBiIHNpbijPieKCgHQpIGhhdmUgdGhlIHNhbWUgZnJlcXVlbmN5IGJlZm9yZSBjb21iaW5pbmcgdGhlbSBpbnRvIG9uZSBzaW51c29pZD8iLCJpZGVhbF9hbnN3ZXIiOiJCZWNhdXNlIG9ubHkgc2FtZS1mcmVxdWVuY3kgc2luZSBhbmQgY29zaW5lIHRlcm1zIGNhbiBiZSBtZXJnZWQgaW50byBhIHNpbmdsZSBzaW51c29pZCB3aXRoIG9uZSBhbXBsaXR1ZGUgYW5kIG9uZSBwaGFzZS4gSWYgdGhlIGZyZXF1ZW5jaWVzIGRpZmZlciwgdGhlIHJlc3VsdCBpcyBnZW5lcmFsbHkgbm90IGEgc2luZ2xlIHNpbnVzb2lkIOKAlCBpdCBpcyBhIG1vcmUgY29tcGxleCB3YXZlZm9ybSB0aGF0IGNhbm5vdCBiZSB3cml0dGVuIGFzIEMgY29zKM+J4oKAdCArIM64KSBmb3IgYW55IHNpbmdsZSDPieKCgC4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IHN0YXRlIHRoYXQgdGhlIGZyZXF1ZW5jaWVzIG11c3QgbWF0Y2ggZm9yIHRoZSBjb21iaW5hdGlvbiBmb3JtdWxhIHRvIGFwcGx5IiwiTXVzdCBzYXkgdGhhdCBpZiBmcmVxdWVuY2llcyBkaWZmZXIsIHRoZSBzdW0gaXMgZ2VuZXJhbGx5IG5vdCBhIHNpbmdsZSBzaW51c29pZCIsIlNob3VsZCBtZW50aW9uIHRoYXQgYSBzaW5nbGUgYW1wbGl0dWRlLXBoYXNlIGRlc2NyaXB0aW9uIGlzIG9ubHkgcG9zc2libGUgZm9yIHNhbWUtZnJlcXVlbmN5IHRlcm1zIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCB1bmRlcnN0YW5kcyB0aGUgY29uZGl0aW9uIGJlaGluZCB0aGUgZm9ybXVsYSBpbnN0ZWFkIG9mIGFwcGx5aW5nIGl0IGJsaW5kbHkgdG8gYW55IHBhaXIgb2YgY29zaW5lIGFuZCBzaW5lIHRlcm1zLiIsImhpbnQiOiJBc2sgeW91cnNlbGY6IGNhbiBvbmUgd2F2ZSBzaW11bHRhbmVvdXNseSBoYXZlIHR3byBkaWZmZXJlbnQgcmVwZXRpdGlvbiByYXRlcz8gV2hhdCB3b3VsZCB0aGF0IHdhdmVmb3JtIGxvb2sgbGlrZT8iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
