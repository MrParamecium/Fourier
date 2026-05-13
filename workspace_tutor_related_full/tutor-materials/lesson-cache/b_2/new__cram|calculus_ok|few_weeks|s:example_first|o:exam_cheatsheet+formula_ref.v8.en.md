# B.2 Sinusoids

> **Section Objective:** Understand what each parameter of a sinusoid means, how phase shifts move the waveform in time, and how to combine two same-frequency sinusoids into one.

---

Start with a concrete signal: **x(t) = 3 cos(2π · 50t − 30°)**.

- **Amplitude:** 3 — the peak value the signal reaches.
- **Frequency:** f₀ = 50 Hz — it completes 50 full cycles every second.
- **Period:** T₀ = 1/50 = 0.02 s — the time for one complete cycle.
- **Phase:** −30° — the cosine is shifted 30° to the right of a standard cosine.

This section builds three skills that appear repeatedly on exams: **reading parameters** from a sinusoid expression, **interpreting phase** as a time shift (lead or lag), and **combining** a cos ω₀t + b sin ω₀t into a single sinusoid C cos(ω₀t + θ).

---

> **Key Formulas**
>
> x(t) = C cos(2πf₀t + θ) &nbsp;&nbsp; T₀ = 1/f₀ &nbsp;&nbsp; ω₀ = 2πf₀

![Fig. B.6](/figures/page-017-fig__b_6-1.png)
*These three sketches show (a) a standard cosine, (b) a sine wave, and (c) a phase-shifted cosine, making it visually clear that a phase shift is simply a horizontal slide of the waveform along the time axis.*

## 1. Reading a Sinusoid

Let's extract every parameter from a specific example before stating the general rule.

**Example:** x(t) = 4 cos(100πt + 45°)

| Parameter | Symbol | Value | How to read it |
|-----------|--------|-------|----------------|
| Amplitude | C | 4 | Coefficient in front of cosine |
| Radian frequency | ω₀ | 100π rad/s | Coefficient of t inside cosine |
| Hertzian frequency | f₀ | 50 Hz | f₀ = ω₀ / (2π) = 100π / (2π) |
| Period | T₀ | 0.02 s | T₀ = 1/f₀ = 1/50 |
| Phase | θ | +45° | Constant added inside cosine |

**General rule:** For x(t) = C cos(ω₀t + θ), the signal repeats every T₀ = 1/f₀ = 2π/ω₀ seconds.

### EXAM TRAP

ω₀ is in **radians per second**; f₀ is in **hertz**. They differ by a factor of 2π. Never plug ω₀ where f₀ is expected, or vice versa. Also, never mix degrees and radians in the same expression — pick one unit and stay consistent.

---

> **Key Formulas**
>
> x(t) = C cos(ω₀t + θ) &nbsp;&nbsp; T₀ = 2π/ω₀ &nbsp;&nbsp; f₀ = ω₀ / (2π)

$$x(t)=C\cos(2\pi f_0 t+\theta)=C\cos(\omega_0 t+\theta),\quad T_0=\frac{1}{f_0}=\frac{2\pi}{\omega_0},\quad \omega_0=2\pi f_0$$
*These formulas are the parameter-conversion toolkit for any sinusoid: the same signal can be written with either f₀ or ω₀, and the period T₀ ties both frequency notations together through a single relation.*

## 2. Phase Shift, Delay, and Lead/Lag

Consider **C cos(ω₀t − 60°)**. Subtracting 60° inside the argument slides the entire waveform to the **right** on the time axis — the peak arrives later. That rightward shift is a **delay**.

How much delay? Since one full cycle spans 360°, a 60° shift is 60/360 = **one-sixth of a period**, so the delay is T₀/6.

### KEY SPECIAL CASE

Set the phase to exactly −90° (which is −π/2 radians):

> C cos(ω₀t − π/2) = C sin ω₀t

This means **sine is just a cosine shifted right by a quarter-cycle**.

### EXAM LANGUAGE

- **sin ω₀t lags cos ω₀t by 90°** (it arrives later — shifted right).
- **cos ω₀t leads sin ω₀t by 90°** (it arrives earlier — shifted left).

A quarter-cycle is 90° because one full cycle is 360°, and 360° ÷ 4 = 90°. Think of it on the time graph: the cosine peak appears one-quarter of a period before the sine peak.

---

> **Key Formulas**
>
> C cos(ω₀t − π/2) = C sin ω₀t
>
> C sin(ω₀t + π/2) = C cos ω₀t

![unknown](/figures/page-018-unknown-1.png)
*This complex-plane picture shows how the coefficients a and −b form a vector whose length gives the combined amplitude C and whose angle gives the phase θ — exactly what is needed to rewrite a sum of sine and cosine as one sinusoid.*

## 3. Adding Sinusoids of the Same Frequency

**Example first.** Suppose x(t) = cos ω₀t − √3 sin ω₀t. Here a = 1 and b = −√3.

**Step 1 — Amplitude:**

C = √(a² + b²) = √(1² + (−√3)²) = √(1 + 3) = **2**

**Step 2 — Phase angle.** Form the complex number a − jb:

a − jb = 1 − j(−√3) = 1 + j√3

Plot this: 1 unit along the real axis, √3 units up the imaginary axis. The angle is arctan(√3/1) = **60°**, and the point is in the first quadrant, so θ = +60°.

**Result:** x(t) = **2 cos(ω₀t + 60°)**

### GENERAL RULE

For any a cos ω₀t + b sin ω₀t:
- C = √(a² + b²)
- θ = angle of the complex number **(a − jb)**

### WHY a − jb AND NOT a + jb

The minus sign on b comes from the identity: b sin ω₀t contributes a −jb term when you factor out the cosine representation. Trust the formula and always form a − jb.

### COMMON MISTAKE

Using θ = tan⁻¹(−b/a) alone is dangerous. The inverse tangent only returns angles between −90° and +90°, so it can land in the wrong quadrant. Always **check the signs of a and −b** to confirm which quadrant the phasor a − jb sits in, then adjust θ accordingly.

---

> **Key Formulas**
>
> a cos ω₀t + b sin ω₀t = C cos(ω₀t + θ)
>
> C = √(a² + b²) &nbsp;&nbsp; θ = ∠(a − jb)

$$a\cos \omega_0 t+b\sin \omega_0 t=C\cos(\omega_0 t+\theta),\quad C=\sqrt{a^2+b^2},\quad \theta=\angle(a-jb)$$
*This formula compresses two same-frequency sinusoids into one by treating the coefficients a and −b as a phasor in the complex plane: its magnitude becomes the new amplitude C, and its angle becomes the new phase θ.*

![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*These phasor diagrams visually justify why adding two same-frequency sinusoids produces a single sinusoid with the same frequency but a new amplitude and phase determined by the vector sum in the complex plane.*

---
**📌 Key Takeaways**
- Amplitude C is the peak value; period T₀ = 1/f₀ = 2π/ω₀ gives the repeat time.
- ω₀ (rad/s) and f₀ (Hz) differ by 2π — never swap them without converting.
- A negative phase angle shifts the waveform right in time, which is a delay.
- sin ω₀t lags cos ω₀t by exactly 90°, one quarter-cycle behind.
- To combine a cos ω₀t + b sin ω₀t: C = √(a²+b²), θ = ∠(a−jb).
- 
> **Key Formulas**
>
> x(t) = C cos(ω₀t + θ) &nbsp;&nbsp; T₀ = 2π/ω₀ &nbsp;&nbsp; f₀ = ω₀/(2π)
>
> C cos(ω₀t − π/2) = C sin ω₀t
>
> a cos ω₀t + b sin ω₀t = C cos(ω₀t + θ), &nbsp; C = √(a²+b²), &nbsp; θ = ∠(a−jb)

*In the next section we will build on these sinusoid and phasor ideas.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlYWRfc2ludXNvaWRfcGFyYW1ldGVycyIsImxhYmVsIjoiRXh0cmFjdCBhbXBsaXR1ZGUsIHBoYXNlLCBmcmVxdWVuY3ksIHBlcmlvZCwgYW5kIHJhZGlhbiBmcmVxdWVuY3kgZnJvbSBhIHNpbnVzb2lkIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IDUgY29zKDQwz4B0IOKIkiAzMMKwKSwgd2hpY2ggb3B0aW9uIGNvcnJlY3RseSBnaXZlcyBhbXBsaXR1ZGUsIHJhZGlhbiBmcmVxdWVuY3ksIGZyZXF1ZW5jeSwgYW5kIHBoYXNlPyIsIm9wdGlvbnMiOlsiQS4gQW1wbGl0dWRlIDUsIM+J4oKAID0gNDDPgCwgZuKCgCA9IDIwIEh6LCBwaGFzZSDiiJIzMMKwIiwiQi4gQW1wbGl0dWRlIDUsIM+J4oKAID0gMjDPgCwgZuKCgCA9IDQwIEh6LCBwaGFzZSDiiJIzMMKwIiwiQy4gQW1wbGl0dWRlIDQwz4AsIM+J4oKAID0gNSwgZuKCgCA9IDIwIEh6LCBwaGFzZSAzMMKwIiwiRC4gQW1wbGl0dWRlIDUsIM+J4oKAID0gNDDPgCwgZuKCgCA9IDQwIEh6LCBwaGFzZSAzMMKwIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiQ29tcGFyaW5nIHdpdGggeCh0KSA9IEMgY29zKM+J4oKAdCArIM64KSwgd2UgZ2V0IEMgPSA1LCDPieKCgCA9IDQwz4AsIM64ID0g4oiSMzDCsCwgYW5kIGbigoAgPSDPieKCgC8oMs+AKSA9IDQwz4AvKDLPgCkgPSAyMCBIei4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiLPieKCgCBpcyByZWFkIGRpcmVjdGx5IGZyb20gdGhlIGNvZWZmaWNpZW50IG9mIHQgaW5zaWRlIHRoZSBjb3NpbmUsIHNvIGl0IGlzIDQwz4AsIG5vdCAyMM+ALiIsIkMiOiJBbXBsaXR1ZGUgaXMgdGhlIGNvZWZmaWNpZW50IGluIGZyb250IG9mIGNvc2luZSAod2hpY2ggaXMgNSksIGFuZCB0aGUgcGhhc2Ugc2lnbiBpcyBuZWdhdGl2ZSBoZXJlLiIsIkQiOiJm4oKAID0gNDDPgC8oMs+AKSA9IDIwIEh6LCBub3QgNDAgSHosIGFuZCB0aGUgcGhhc2UgaXMg4oiSMzDCsCwgbm90ICszMMKwLiJ9LCJoaW50IjoiUmVhZCDPieKCgCBkaXJlY3RseSBmaXJzdCwgdGhlbiBkaXZpZGUgYnkgMs+AIHRvIGdldCBoZXJ0ei4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgc2ludXNvaWQgaGFzIM+J4oKAID0gMTAwIHJhZC9zLiBXaGF0IGlzIGl0cyBwZXJpb2Q/Iiwib3B0aW9ucyI6WyJBLiAxMDAgcyIsIkIuIDEvMTAwIHMiLCJDLiAyz4AvMTAwIHMiLCJELiAxMDAvKDLPgCkgcyJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IkZvciBhIHNpbnVzb2lkLCBU4oKAID0gMs+AL8+J4oKALCBzbyBU4oKAID0gMs+ALzEwMCBzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgY29uZnVzZXMgdGhlIHBlcmlvZCB3aXRoIHRoZSByYWRpYW4gZnJlcXVlbmN5IHZhbHVlIGl0c2VsZi4iLCJCIjoiMS/PieKCgCBpcyBub3QgdGhlIHBlcmlvZCB3aGVuIM+J4oKAIGlzIGluIHJhZC9zOyB0aGF0IGZvcm11bGEgYXBwbGllcyB0byBm4oKAIGluIEh6LiIsIkQiOiJUaGlzIGlzIHRoZSByZWNpcHJvY2FsIG9mIHRoZSBjb3JyZWN0IGV4cHJlc3Npb24g4oCUIGl0IGVxdWFscyBm4oKALCBub3QgVOKCgC4ifSwiaGludCI6IlVzZSBU4oKAID0gMs+AL8+J4oKALCBub3QgMS/PieKCgC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InBoYXNlX3NoaWZ0X2xlYWRfbGFnIiwibGFiZWwiOiJJbnRlcnByZXQgcGhhc2Ugc2hpZnQgYXMgZGVsYXkvYWR2YW5jZSBhbmQgaWRlbnRpZnkgc2luZS1jb3NpbmUgbGVhZC1sYWcgcmVsYXRpb25zaGlwcyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggc3RhdGVtZW50IGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBzaW4gz4nigoB0IGxlYWRzIGNvcyDPieKCgHQgYnkgOTDCsCIsIkIuIGNvcyDPieKCgHQgbGFncyBzaW4gz4nigoB0IGJ5IDkwwrAiLCJDLiBzaW4gz4nigoB0IGxhZ3MgY29zIM+J4oKAdCBieSA5MMKwIiwiRC4gc2luIM+J4oKAdCBhbmQgY29zIM+J4oKAdCBhcmUgYWx3YXlzIGluIHBoYXNlIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiQmVjYXVzZSBjb3Moz4nigoB0IOKIkiDPgC8yKSA9IHNpbiDPieKCgHQsIHRoZSBzaW5lIHdhdmUgaXMgYSByaWdodC1zaGlmdGVkIChkZWxheWVkKSBjb3NpbmUsIHNvIHNpbmUgbGFncyBjb3NpbmUgYnkgOTDCsC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIHJldmVyc2VzIHRoZSBsZWFkLWxhZyByZWxhdGlvbnNoaXA7IHNpbmUgYXJyaXZlcyBsYXRlciwgbm90IGVhcmxpZXIuIiwiQiI6IkNvc2luZSBsZWFkcyBzaW5lIOKAlCBpdCBhcnJpdmVzIGVhcmxpZXIg4oCUIHNvIGNvc2luZSBkb2VzIG5vdCBsYWcgc2luZS4iLCJEIjoiVGhleSBkaWZmZXIgYnkgYSBxdWFydGVyLWN5Y2xlICg5MMKwKSwgc28gdGhleSBhcmUgbmV2ZXIgaW4gcGhhc2UuIn0sImhpbnQiOiJSaWdodCBzaGlmdCBtZWFucyBkZWxheSwgYW5kIGRlbGF5IG1lYW5zIGxhZy4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoidGltZV9kb21haW5fc2ludXNvaWRfc2hpZnQiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IlRoZSBzaWduYWwgY29zKM+J4oKAdCDiiJIgNjDCsCkgaXMgb2J0YWluZWQgZnJvbSBjb3Moz4nigoB0KSBieToiLCJvcHRpb25zIjpbIkEuIEFkdmFuY2luZyBpdCBieSBvbmUtc2l4dGggb2YgYSBwZXJpb2QiLCJCLiBEZWxheWluZyBpdCBieSBvbmUtc2l4dGggb2YgYSBwZXJpb2QiLCJDLiBEZWxheWluZyBpdCBieSBvbmUtcXVhcnRlciBvZiBhIHBlcmlvZCIsIkQuIENoYW5naW5nIGl0cyBmcmVxdWVuY3kiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJTdWJ0cmFjdGluZyA2MMKwIGluc2lkZSB0aGUgYXJndW1lbnQgc2hpZnRzIHRoZSB3YXZlZm9ybSB0byB0aGUgcmlnaHQsIHdoaWNoIGlzIGEgZGVsYXkuIFNpbmNlIDYwwrAgaXMgb25lLXNpeHRoIG9mIDM2MMKwLCB0aGUgZGVsYXkgaXMgVOKCgC82LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkFuIGFkdmFuY2UgY29ycmVzcG9uZHMgdG8gYSBsZWZ0IHNoaWZ0IChwb3NpdGl2ZSBwaGFzZSksIG5vdCBhIHJpZ2h0IHNoaWZ0LiIsIkMiOiJBIHF1YXJ0ZXItY3ljbGUgZGVsYXkgY29ycmVzcG9uZHMgdG8gOTDCsCwgbm90IDYwwrAuIiwiRCI6IlBoYXNlIHNoaWZ0IGNoYW5nZXMgdGhlIHRpbWluZyBvZiB0aGUgd2F2ZWZvcm0sIG5vdCBpdHMgZnJlcXVlbmN5LiJ9LCJoaW50IjoiQ29udmVydCA2MMKwIGludG8gYSBmcmFjdGlvbiBvZiAzNjDCsCB0byBmaW5kIHRoZSBmcmFjdGlvbiBvZiB0aGUgcGVyaW9kLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJ0aW1lX2RvbWFpbl9kZWxheV9tYXJrZWQiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImFkZGl0aW9uX29mX3NpbnVzb2lkcyIsImxhYmVsIjoiUmV3cml0ZSBhIGNvcyDPieKCgHQgKyBiIHNpbiDPieKCgHQgYXMgYSBzaW5nbGUgc2ludXNvaWQiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkV4cHJlc3MgeCh0KSA9IGNvcyDPieKCgHQg4oiSIOKImjMgc2luIM+J4oKAdCBhcyBhIHNpbmdsZSBzaW51c29pZC4iLCJvcHRpb25zIjpbIkEuIDIgY29zKM+J4oKAdCDiiJIgNjDCsCkiLCJCLiAyIGNvcyjPieKCgHQgKyA2MMKwKSIsIkMuIDIgc2luKM+J4oKAdCArIDYwwrApIiwiRC4g4oiaMiBjb3Moz4nigoB0ICsgNDXCsCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJIZXJlIGEgPSAxIGFuZCBiID0g4oiS4oiaMywgc28gQyA9IOKImigxwrIgKyAo4oiS4oiaMynCsikgPSDiiJo0ID0gMi4gVGhlIHBoYXNvciBpcyBhIOKIkiBqYiA9IDEg4oiSIGoo4oiS4oiaMykgPSAxICsgauKImjMsIHdoaWNoIGxpZXMgaW4gdGhlIGZpcnN0IHF1YWRyYW50IGF0IGFuZ2xlIDYwwrAsIGdpdmluZyAyIGNvcyjPieKCgHQgKyA2MMKwKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGUgcGhhc2Ugc2lnbiBpcyB3cm9uZzsg4oiSNjDCsCB3b3VsZCBjb3JyZXNwb25kIHRvIGEgZGlmZmVyZW50IGNvZWZmaWNpZW50IGNvbWJpbmF0aW9uLiIsIkMiOiJUaGUgcmVzdWx0IHNob3VsZCBiZSBleHByZXNzZWQgYXMgYSBzaW5nbGUgY29zaW5lLCBub3Qgc2luZSwgdXNpbmcgdGhlIHN0YW5kYXJkIGZvcm11bGEuIiwiRCI6IkJvdGggdGhlIGFtcGxpdHVkZSBhbmQgcGhhc2UgYXJlIGluY29ycmVjdDsgY2hlY2sgQyA9IOKImihhwrIgKyBiwrIpIGFuZCB0aGUgcGhhc29yIGFuZ2xlLiJ9LCJoaW50IjoiVXNlIEMgPSDiiJooYcKyICsgYsKyKSwgdGhlbiBmaW5kIHRoZSBhbmdsZSBvZiBhIOKIkiBqYiAobm90IGEgKyBqYikuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IOKIkjMgY29zIM+J4oKAdCArIDQgc2luIM+J4oKAdCwgd2hpY2ggcGFpciAoQywgzrgpIGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBDID0gNSwgzrggPSDiiJIxMjYuOcKwIiwiQi4gQyA9IDEsIM64ID0gNTMuMcKwIiwiQy4gQyA9IDUsIM64ID0gMTI2LjnCsCIsIkQuIEMgPSA3LCDOuCA9IOKIkjUzLjHCsCJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IldpdGggYSA9IOKIkjMgYW5kIGIgPSA0LCBDID0g4oiaKCjiiJIzKcKyICsgNMKyKSA9IOKImig5ICsgMTYpID0gNS4gVGhlIHBoYXNvciBpcyBhIOKIkiBqYiA9IOKIkjMg4oiSIGo0LCB3aGljaCBsaWVzIGluIHRoZSB0aGlyZCBxdWFkcmFudC4gSXRzIGFuZ2xlIGlzIOKIkjE4MMKwICsgYXJjdGFuKDQvMykgPSDiiJIxODDCsCArIDUzLjHCsCA9IOKIkjEyNi45wrAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiQW1wbGl0dWRlIGlzIG5vdCBmb3VuZCBieSBzdWJ0cmFjdGlvbjsgaXQgaXMgYWx3YXlzIHRoZSByb290LXN1bS1zcXVhcmUgb2YgYSBhbmQgYi4iLCJDIjoiVGhlIGFuZ2xlICsxMjYuOcKwIGhhcyB0aGUgd3Jvbmcgc2lnbjsgdGhlIHBoYXNvciDiiJIzIOKIkiBqNCBpcyBpbiB0aGUgdGhpcmQgcXVhZHJhbnQsIGdpdmluZyBhIG5lZ2F0aXZlIGFuZ2xlLiIsIkQiOiJUaGUgYW1wbGl0dWRlIGlzIG5vdCA3ICh0aGF0IHdvdWxkIGJlIDMgKyA0LCBub3Qg4oiaKDkrMTYpKSwgYW5kIHRoZSBhbmdsZSBkb2VzIG5vdCBtYXRjaCB0aGUgcGhhc29yIGxvY2F0aW9uLiJ9LCJoaW50IjoiQ2hlY2sgdGhlIHNpZ25zIG9mIGEgYW5kIOKIkmIgdG8gbG9jYXRlIHRoZSBwaGFzb3IgcXVhZHJhbnQgYmVmb3JlIGNvbXB1dGluZyB0aGUgYW5nbGUuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6InBoYXNvcl9xdWFkcmFudF9wbG90Iiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EzIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJBIHN0dWRlbnQgY29tcHV0ZXMgzrggPSB0YW7igbvCuSjiiJJiL2EpIGFuZCBnZXRzIDUzwrAuIEV4cGxhaW4gd2h5IHRoYXQgYW5zd2VyIG1pZ2h0IHN0aWxsIGJlIHdyb25nIGZvciByZXdyaXRpbmcgYSBjb3Mgz4nigoB0ICsgYiBzaW4gz4nigoB0IGFzIG9uZSBzaW51c29pZC4iLCJpZGVhbF9hbnN3ZXIiOiJUaGUgaW52ZXJzZSB0YW5nZW50IGZ1bmN0aW9uIG9ubHkgcmV0dXJucyBhbmdsZXMgYmV0d2VlbiDiiJI5MMKwIGFuZCArOTDCsCwgc28gaXQgY2FuIHBsYWNlIHRoZSBhbmdsZSBpbiB0aGUgd3JvbmcgcXVhZHJhbnQuIFRoZSBjb3JyZWN0IM64IGlzIHRoZSBhbmdsZSBvZiB0aGUgY29tcGxleCBudW1iZXIgYSDiiJIgamIsIHdoaWNoIGRlcGVuZHMgb24gdGhlIGluZGl2aWR1YWwgc2lnbnMgb2YgYSBhbmQg4oiSYiwgbm90IGp1c3QgdGhlaXIgcmF0aW8uIFlvdSBtdXN0IGNoZWNrIHdoaWNoIHF1YWRyYW50IHRoZSBwaGFzb3IgYSDiiJIgamIgb2NjdXBpZXMgYW5kIGFkanVzdCB0aGUgYW5nbGUgYWNjb3JkaW5nbHkuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBtZW50aW9uIHRoZSBxdWFkcmFudCBhbWJpZ3VpdHkgb2YgdGhlIGludmVyc2UgdGFuZ2VudCBmdW5jdGlvbiIsIk11c3QgcmVmZXIgdG8gdGhlIHNpZ25zIG9mIGEgYW5kIOKIkmIsIG9yIHRoZSBwaGFzb3IgYSDiiJIgamIsIGFzIHRoZSBjb3JyZWN0IHJlZmVyZW5jZSIsIk11c3Qgc3RhdGUgdGhhdCB0aGUgY29ycmVjdCDOuCBkZXBlbmRzIG9uIHRoZSBxdWFkcmFudCwgbm90IGp1c3QgdGhlIHJhdGlvIOKIkmIvYSJdLCJleHBsYW5hdGlvbiI6IlRoaXMgcXVlc3Rpb24gY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQgdW5kZXJzdGFuZHMgdGhlIG1vc3QgY29tbW9uIGV4YW0gbWlzdGFrZSBpbiBzaW51c29pZCBhZGRpdGlvbjogY29tcHV0aW5nIHRoZSByaWdodCBtYWduaXR1ZGUgYnV0IGxhbmRpbmcgaW4gdGhlIHdyb25nIHBoYXNlIHF1YWRyYW50IGJlY2F1c2UgdGFu4oG7wrkgZGlzY2FyZHMgc2lnbiBpbmZvcm1hdGlvbi4iLCJoaW50IjoidGFu4oG7wrkgZ2l2ZXMgYSByZWZlcmVuY2UgYW5nbGUgYmV0d2VlbiDiiJI5MMKwIGFuZCA5MMKwOyB0aGUgc2lnbnMgb2YgYSBhbmQg4oiSYiBkZWNpZGUgd2hpY2ggcXVhZHJhbnQgdGhlIGFjdHVhbCBhbmdsZSBiZWxvbmdzIHRvLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
