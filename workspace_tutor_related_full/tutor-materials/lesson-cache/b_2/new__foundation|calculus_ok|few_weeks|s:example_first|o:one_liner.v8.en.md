# B.2 Sinusoids

> **Section Objective:** Learn to read a sinusoid's parameters, interpret phase shifts, and combine two same-frequency sinusoids into one.

---

## Getting Started: A Concrete Example

Consider x(t) = 3 cos(2π·50t − 60°). Breaking it down in plain language:

- **3** is the amplitude — the peak height of the wave.
- **50** is the frequency in hertz — the wave completes 50 full cycles every second.
- **−60°** is the phase — the wave is shifted slightly to the right compared to a plain cosine.

The general form is x(t) = C cos(2πf₀t + θ), where C, f₀, and θ play exactly those roles.

This section covers three skills: reading a sinusoid's parameters, sketching phase shifts, and rewriting sums like a cos(ω₀t) + b sin(ω₀t) as a single cosine. The complex plane will appear briefly as a geometry shortcut — not as abstract theory.

### EXAM RELEVANCE

Exams frequently test period/frequency conversion, lead-vs-lag language, and combining sinusoids.

> **Core takeaway:** Every sinusoid is fully described by three numbers — amplitude, frequency, and phase.

$$x(t) = C\cos(2\pi f_0 t + \theta), \quad T_0 = \frac{1}{f_0}, \quad \omega_0 = 2\pi f_0$$
*Here C is the amplitude (peak value), f₀ is the frequency in hertz, T₀ is the period in seconds (the time for one complete cycle), and θ is the phase angle in degrees or radians. Note that ω₀ is the radian frequency — it is not the same as f₀ in hertz; ω₀ is always 2π times larger.*

![Fig. B.6](/figures/page-017-fig__b_6-1.png)
*This figure is the essential visual for phase shift: it shows C cos ω₀t (standard cosine), C sin ω₀t (shifted by 90°), and C cos(ω₀t − 60°) (shifted right by one-sixth of a period), making it immediately clear that a negative phase angle delays the waveform to the right.*

## Phase Shift and Sinusoid Sketching

Look at the textbook figure above. The curve C cos(ω₀t − 60°) is simply the plain cosine slid to the **right** by one-sixth of a period (T₀/6). That rightward slide is what '−60°' means physically.

### THE GENERAL RULE

Changing the phase θ shifts the entire waveform left or right — it does **not** change the amplitude or the frequency. A **negative** phase shifts right (delay); a **positive** phase shifts left (advance).

### SPECIAL CASE: SINE AND COSINE

The identity C cos(ω₀t − π/2) = C sin(ω₀t) tells you that sine is just a cosine delayed by 90°:

- **sin lags cos by 90°**
- **cos leads sin by 90°**

### COMMON MISTAKE

Never mix degrees and radians inside the same expression. Pick one unit and convert everything before calculating.

> **Core takeaway:** A phase angle shifts the wave in time — negative means delay (right), positive means advance (left).

$$C\cos(\omega_0 t - \pi/2) = C\sin(\omega_0 t), \qquad C\sin(\omega_0 t + \pi/2) = C\cos(\omega_0 t)$$
*These two identities capture the 90° phase relationship between sine and cosine: cosine delayed by π/2 radians in time becomes sine, and sine advanced by π/2 radians becomes cosine. In lead/lag language, cosine **leads** sine by 90° (it reaches its peak earlier), or equivalently, sine **lags** cosine by 90° (it reaches its peak later by one-quarter period).*

![unknown](/figures/page-018-unknown-1.png)
*This complex-plane diagram shows how the coefficients a and −b become the horizontal and vertical coordinates of a vector: the vector's length is the combined amplitude C, and the angle it makes with the real axis is the phase θ — turning an algebraic problem into a geometry problem.*

## Adding Same-Frequency Sinusoids

Suppose you need to simplify:

x(t) = cos(ω₀t) − √3 sin(ω₀t)

The answer is **x(t) = 2 cos(ω₀t + 60°)**. Here is how to get there every time.

### THE GENERAL RULE

For any expression a cos(ω₀t) + b sin(ω₀t), the result is C cos(ω₀t + θ), where:

- **C = √(a² + b²)** — the amplitude
- **θ** is the angle of the complex number **a − jb** (note the minus sign on b)

### HOW TO THINK ABOUT IT (WITHOUT HEAVY COMPLEX-NUMBER THEORY)

Plot a point on the complex plane: go **a** units to the right (horizontal) and **−b** units upward (vertical). The straight-line distance from the origin to that point is C. The angle that line makes with the positive horizontal axis is θ.

In the example above: a = 1, b = −√3, so the point is (1, +√3). Distance = √(1 + 3) = 2. Angle = 60°. Done.

### COMMON MISTAKE

A calculator's arctan button always returns a value between −90° and +90°. If the point (a, −b) falls in the second or third quadrant, the calculator gives the wrong angle — always check the signs of a and −b to confirm the correct quadrant.

> **Core takeaway:** To add a cosine and a sine of the same frequency, plot the point (a, −b) and read off the distance and angle.

$$a\cos \omega_0 t + b\sin \omega_0 t = C\cos(\omega_0 t + \theta), \quad C = \sqrt{a^2+b^2}, \quad \theta = \tan^{-1}\!\left(\frac{-b}{a}\right)$$
*These formulas apply **only** when both terms share the exact same frequency ω₀ — you cannot combine sinusoids of different frequencies into a single sinusoid. Additionally, the arctan formula alone is not enough: you must verify the quadrant by checking whether a is positive or negative and whether −b is positive or negative, then place θ in the correct quadrant accordingly.*

![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*These phasor diagrams show sinusoid addition as vector addition: in (a) the two component vectors combine to give a resultant of length 2 at 60°, and in (b) the resultant has length 5 at −126.9°, making the final amplitude and phase immediately readable from the geometry.*

---
**📌 Key Takeaways**
- Period T₀ = 1/f₀; radian frequency ω₀ = 2πf₀ — never confuse ω₀ with f₀.
- Negative phase shifts the wave right (delay); sin lags cos by 90°, cos leads sin by 90°.
- To combine a cos(ω₀t) + b sin(ω₀t): compute C = √(a²+b²) and θ from the point (a, −b).

*Core takeaway: A sinusoid is fully described by amplitude, frequency, and phase — and two same-frequency sinusoids always combine into one sinusoid whose parameters come from simple geometry.

In the next section we will extend these ideas to complex exponentials and phasors, which make sinusoid analysis even faster by replacing trigonometric identities with algebra.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InNpbnVzb2lkX3BhcmFtZXRlcnMiLCJsYWJlbCI6IlJlYWQgYW1wbGl0dWRlLCBmcmVxdWVuY3ksIHBlcmlvZCwgYW5kIHBoYXNlIGZyb20gYSBzaW51c29pZCIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHgodCkgPSA0IGNvcygyz4DCtzI1dCDiiJIgMzDCsCksIHdoaWNoIHN0YXRlbWVudCBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gQW1wbGl0dWRlID0gMjUsIGZyZXF1ZW5jeSA9IDQgSHosIHBoYXNlID0g4oiSMzDCsCIsIkIuIEFtcGxpdHVkZSA9IDQsIGZyZXF1ZW5jeSA9IDI1IEh6LCBwaGFzZSA9IOKIkjMwwrAiLCJDLiBBbXBsaXR1ZGUgPSA0LCBwZXJpb2QgPSAyNSBzLCBwaGFzZSA9ICszMMKwIiwiRC4gQW1wbGl0dWRlID0gMs+AwrcyNSwgZnJlcXVlbmN5ID0gMjUgSHosIHBoYXNlID0g4oiSMzDCsCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkluIHgodCkgPSBDIGNvcygyz4Bm4oKAdCArIM64KSwgdGhlIGFtcGxpdHVkZSBpcyBDID0gNCwgdGhlIGZyZXF1ZW5jeSBpcyBm4oKAID0gMjUgSHosIGFuZCB0aGUgcGhhc2UgaXMg4oiSMzDCsC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIHN3YXBzIGFtcGxpdHVkZSBhbmQgZnJlcXVlbmN5LiIsIkMiOiJUaGUgcGVyaW9kIGlzIDEvMjUgcywgbm90IDI1IHMsIGFuZCB0aGUgcGhhc2Ugc2lnbiBpcyBuZWdhdGl2ZS4iLCJEIjoiMs+AwrcyNSBpcyB0aGUgcmFkaWFuIGZyZXF1ZW5jeSDPieKCgCwgbm90IHRoZSBhbXBsaXR1ZGUuIn0sImhpbnQiOiJNYXRjaCBlYWNoIHN5bWJvbCBkaXJlY3RseSB0byB0aGUgc3RhbmRhcmQgZm9ybSBDIGNvcygyz4Bm4oKAdCArIM64KS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgc2ludXNvaWQgaGFzIGZyZXF1ZW5jeSBm4oKAID0gMjAwIEh6LiBXaGF0IGlzIGl0cyBwZXJpb2Q/Iiwib3B0aW9ucyI6WyJBLiAyMDAgcyIsIkIuIDAuNSBzIiwiQy4gMC4wMDUgcyIsIkQuIDQwMM+AIHMiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJUaGUgcGVyaW9kIGlzIFTigoAgPSAxL2bigoAgPSAxLzIwMCA9IDAuMDA1IHMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhhdCBpcyB0aGUgb3Bwb3NpdGUgb2YgdGFraW5nIHRoZSByZWNpcHJvY2FsLiIsIkIiOiIxLzIwMCBpcyBtdWNoIHNtYWxsZXIgdGhhbiAwLjUuIiwiRCI6IlRoaXMgZG9lcyBub3QgY29tZSBmcm9tIHRoZSBwZXJpb2QgZm9ybXVsYS4ifSwiaGludCI6IlVzZSBU4oKAID0gMS9m4oKALiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoicGhhc2Vfc2hpZnRfYW5kX2xlYWRsYWciLCJsYWJlbCI6IkludGVycHJldCBwaGFzZSBzaGlmdCBhbmQgc2luZS1jb3NpbmUgbGVhZC9sYWciLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHN0YXRlbWVudCBpcyBjb3JyZWN0IGFib3V0IEMgY29zKM+J4oKAdCDiiJIgNjDCsCk/Iiwib3B0aW9ucyI6WyJBLiBJdCBpcyBhZHZhbmNlZCB0byB0aGUgbGVmdCBieSA2MMKwIiwiQi4gSXQgaXMgZGVsYXllZCB0byB0aGUgcmlnaHQgYnkgNjDCsCIsIkMuIEl0cyBhbXBsaXR1ZGUgaXMgcmVkdWNlZCBieSA2MMKwIiwiRC4gSXRzIGZyZXF1ZW5jeSBpcyByZWR1Y2VkIGJ5IDYwwrAiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJTdWJ0cmFjdGluZyBhIHBoYXNlIGFuZ2xlIGluc2lkZSB0aGUgY29zaW5lIHNoaWZ0cyB0aGUgd2F2ZWZvcm0gdG8gdGhlIHJpZ2h0LCBzbyBpdCBpcyBhIGRlbGF5IGJ5IDYwwrAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiQSBuZWdhdGl2ZSBwaGFzZSBpbiB0aGlzIGZvcm0gbWVhbnMgZGVsYXksIG5vdCBhZHZhbmNlLiIsIkMiOiJQaGFzZSBzaGlmdCBkb2VzIG5vdCBjaGFuZ2UgYW1wbGl0dWRlLiIsIkQiOiJQaGFzZSBzaGlmdCBkb2VzIG5vdCBjaGFuZ2UgZnJlcXVlbmN5LiJ9LCJoaW50IjoiVGhpbmsgb2YgdGhlIHRleHRib29rIGZpZ3VyZSB3aXRoIHRoZSBkZWxheWVkIGNvc2luZSDigJQgdGhlIGN1cnZlIHNsaWRlcyB0byB0aGUgcmlnaHQuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6IndhdmVmb3JtX3BoYXNlX3NoaWZ0Iiwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggaWRlbnRpdHkgY29ycmVjdGx5IGV4cHJlc3NlcyB0aGUgOTDCsCByZWxhdGlvbiBiZXR3ZWVuIHNpbmUgYW5kIGNvc2luZT8iLCJvcHRpb25zIjpbIkEuIEMgY29zKM+J4oKAdCArIM+ALzIpID0gQyBzaW4oz4nigoB0KSIsIkIuIEMgY29zKM+J4oKAdCDiiJIgz4AvMikgPSBDIHNpbijPieKCgHQpIiwiQy4gQyBzaW4oz4nigoB0IOKIkiDPgC8yKSA9IEMgY29zKM+J4oKAdCkiLCJELiBDIHNpbijPieKCgHQpIGxlYWRzIEMgY29zKM+J4oKAdCkgYnkgOTDCsCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkNvc2luZSBkZWxheWVkIGJ5IDkwwrAgKGkuZS4sIM+ALzIgcmFkaWFucykgYmVjb21lcyBzaW5lLCBzbyBDIGNvcyjPieKCgHQg4oiSIM+ALzIpID0gQyBzaW4oz4nigoB0KS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGUgc2lnbiBpcyByZXZlcnNlZCDigJQgYWRkaW5nIM+ALzIgdG8gY29zaW5lIGdpdmVzIOKIknNpbiwgbm90ICtzaW4uIiwiQyI6IlRoZSBjb3JyZWN0IGlkZW50aXR5IGlzIEMgc2luKM+J4oKAdCArIM+ALzIpID0gQyBjb3Moz4nigoB0KSwgbm90IG1pbnVzLiIsIkQiOiJJdCBpcyB0aGUgb3Bwb3NpdGU6IHNpbmUgbGFncyBjb3NpbmUgYnkgOTDCsCwgbm90IGxlYWRzLiJ9LCJoaW50IjoiTWVtb3JpemUgb25lIGlkZW50aXR5IGFuZCBkZXJpdmUgdGhlIGxlYWQvbGFnIHN0YXRlbWVudCBmcm9tIGl0LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiYWRkaXRpb25fb2Zfc2FtZV9mcmVxdWVuY3lfc2ludXNvaWRzIiwibGFiZWwiOiJDb21iaW5lIGEgY29zaW5lIHRlcm0gYW5kIGEgc2luZSB0ZXJtIGludG8gb25lIHNpbnVzb2lkIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJFeHByZXNzIHgodCkgPSBjb3Moz4nigoB0KSDiiJIg4oiaMyBzaW4oz4nigoB0KSBhcyBhIHNpbmdsZSBzaW51c29pZC4iLCJvcHRpb25zIjpbIkEuIDIgY29zKM+J4oKAdCDiiJIgNjDCsCkiLCJCLiAyIGNvcyjPieKCgHQgKyA2MMKwKSIsIkMuIDIgc2luKM+J4oKAdCArIDYwwrApIiwiRC4g4oiaMiBjb3Moz4nigoB0ICsgNDXCsCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJIZXJlIGEgPSAxIGFuZCBiID0g4oiS4oiaMywgc28gQyA9IOKImigxICsgMykgPSAyLiBUaGUgcG9pbnQgKGEsIOKIkmIpID0gKDEsICviiJozKSBsaWVzIGluIHRoZSBmaXJzdCBxdWFkcmFudCBhdCBhbmdsZSA2MMKwLCBnaXZpbmcgzrggPSA2MMKwLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBhbXBsaXR1ZGUgaXMgY29ycmVjdCwgYnV0IHRoZSBwaGFzZSBzaWduIGlzIHdyb25nIOKAlCB0aGUgcG9pbnQgKDEsIOKImjMpIGlzIGluIHRoZSBmaXJzdCBxdWFkcmFudCwgc28gzrggaXMgcG9zaXRpdmUuIiwiQyI6IlRoZSB0YXJnZXQgZm9ybSBpcyBhIGNvc2luZSwgbm90IGEgc2luZSwgYW5kIHRoZSBwaGFzZSBkb2VzIG5vdCBtYXRjaCBkaXJlY3RseS4iLCJEIjoiQm90aCBhbXBsaXR1ZGUgYW5kIGFuZ2xlIGFyZSBpbmNvcnJlY3Qg4oCUIGNoZWNrIEMgPSDiiJooYcKyK2LCsikgYW5kIHRoZSBjb3JyZWN0IHF1YWRyYW50LiJ9LCJoaW50IjoiVXNlIEMgPSDiiJooYcKyK2LCsiksIHRoZW4gcGxvdCB0aGUgcG9pbnQgKGEsIOKIkmIpIGFuZCByZWFkIG9mZiB0aGUgYW5nbGUuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IOKIkjMgY29zKM+J4oKAdCkgKyA0IHNpbijPieKCgHQpLCB3aGF0IGFyZSB0aGUgY29ycmVjdCBhbXBsaXR1ZGUgYW5kIHByaW5jaXBhbCBwaGFzZT8iLCJvcHRpb25zIjpbIkEuIEMgPSA1LCDOuCA9IDUzLjHCsCIsIkIuIEMgPSA1LCDOuCA9IOKIkjEyNi45wrAiLCJDLiBDID0gMSwgzrggPSDiiJIxMjYuOcKwIiwiRC4gQyA9IDcsIM64ID0gMTI2LjnCsCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IldpdGggYSA9IOKIkjMgYW5kIGIgPSA0LCBDID0g4oiaKDkgKyAxNikgPSA1LiBUaGUgcG9pbnQgKGEsIOKIkmIpID0gKOKIkjMsIOKIkjQpIGxpZXMgaW4gdGhlIHRoaXJkIHF1YWRyYW50LCBzbyB0aGUgcHJpbmNpcGFsIGFuZ2xlIGlzIOKIkjE4MMKwICsgYXJjdGFuKDQvMykgPSDiiJIxODDCsCArIDUzLjHCsCA9IOKIkjEyNi45wrAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBhbmdsZSBpZ25vcmVzIHRoZSBjb3JyZWN0IHF1YWRyYW50IOKAlCBhcmN0YW4oNC8zKSA9IDUzLjHCsCBpcyB0aGUgcmVmZXJlbmNlIGFuZ2xlLCBidXQgdGhlIHBvaW50IGlzIGluIHRoZSB0aGlyZCBxdWFkcmFudC4iLCJDIjoiVGhlIGFtcGxpdHVkZSBpcyBub3QgdGhlIGRpZmZlcmVuY2Ugb2YgdGhlIGNvZWZmaWNpZW50czsgdXNlIOKImihhwrIrYsKyKS4iLCJEIjoiVGhlIGFtcGxpdHVkZSBmb3JtdWxhIGlzIOKImihhwrIrYsKyKSwgbm90IGEgc3VtIG9mIGNvZWZmaWNpZW50cy4ifSwiaGludCI6IkNoZWNrIHRoZSBxdWFkcmFudCBvZiB0aGUgcG9pbnQgKGEsIOKIkmIpID0gKOKIkjMsIOKIkjQpIGJlZm9yZSBhY2NlcHRpbmcgdGhlIGNhbGN1bGF0b3IncyBhcmN0YW4gdmFsdWUuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6InBoYXNvcl9kaWFncmFtIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19XX0=" style="display:none;"></div>%%KC_END%%
