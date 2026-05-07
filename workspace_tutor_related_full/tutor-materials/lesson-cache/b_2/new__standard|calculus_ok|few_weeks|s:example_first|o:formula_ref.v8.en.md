# B.2 Sinusoids

> **Section Objective:** Learn to read, rewrite, and combine sinusoidal signals — skills that appear on nearly every signals exam.

---

Consider the signal x(t) = 3 cos(2π·50t − 30°). Just from that one expression, you can read off four things: the amplitude is 3, the frequency is 50 Hz, the period is 1/50 = 0.02 s, and the waveform is shifted 30° to the right compared to a plain cosine.

This section is about doing exactly that — reading and rewriting sinusoids fluently.

**Quick prerequisite check:** Cosine and sine are both periodic waves that repeat every full cycle. They are identical in shape; sine is just cosine shifted by a quarter-cycle. Complex numbers will appear later only as a compact bookkeeping tool for magnitude and angle — not as a heavy new topic.

### EXAM ANGLE

Exams routinely test: period vs. frequency, phase shifts, lead/lag wording, and rewriting a cos-plus-sine sum as one cosine.

> **Formula Reference**
>
> x(t) = C cos(2πf₀t + θ)
>
> T₀ = 1/f₀
>
> ω₀ = 2πf₀

![Fig. B.6](/figures/page-017-fig__b_6-1.png)
*The textbook figure shows cosine, sine, and a delayed cosine side by side, making the phase shift visible as a horizontal time shift of T₀/6 to the right.*

## 1. Reading a Sinusoid

Start with a concrete example: x(t) = 4 cos(20πt + 45°).

The general form is x(t) = C cos(ω₀t + θ), where each symbol has a specific job:

| Symbol | Name | Value in example |
|--------|------|------------------|
| C | Amplitude | 4 |
| ω₀ | Radian frequency | 20π rad/s |
| θ | Phase | 45° |
| f₀ | Frequency (Hz) | ω₀/(2π) = 10 Hz |
| T₀ | Period | 1/f₀ = 0.1 s |

For the example: ω₀ = 20π, so f₀ = 20π/(2π) = **10 Hz** and T₀ = 1/10 = **0.1 s**.

#### Warning

Never mix degrees and radians inside the same problem. If θ is given in degrees, convert everything to degrees — or convert θ to radians — before computing.

> **Formula Reference**
>
> x(t) = C cos(ω₀t + θ)
>
> f₀ = ω₀ / (2π)
>
> T₀ = 2π/ω₀ = 1/f₀

$$x(t)=C\cos(\omega_0 t+\theta),\qquad T_0=\frac{1}{f_0}=\frac{2\pi}{\omega_0},\qquad \omega_0=2\pi f_0$$
*The same sinusoid can be described with frequency f₀ in hertz or radian frequency ω₀ in rad/s — both representations give the identical period T₀.*

## 2. Phase Shift, Delay, and Lead/Lag

Consider C cos(ω₀t − 60°). Subtracting 60° inside the cosine shifts the entire waveform to the **right** on the time axis — the signal is **delayed**. Since one full cycle spans 360°, a 60° shift corresponds to 60/360 = 1/6 of a period, so the delay is **T₀/6**.

Similarly, a 90° subtraction gives the important special case:

C cos(ω₀t − π/2) = C sin(ω₀t)

This means **sine lags cosine by 90°** (a quarter-cycle). Equivalently, **cosine leads sine by 90°**. These two statements say the same thing from opposite perspectives.

### KEY RULE

- Subtracting phase → right shift → **delay**
- Adding phase → left shift → **advance**
- 60° delay = T₀/6 &nbsp;&nbsp;|&nbsp;&nbsp; 90° delay = T₀/4

> **Formula Reference**
>
> C cos(ω₀t − π/2) = C sin(ω₀t)
>
> C sin(ω₀t + π/2) = C cos(ω₀t)
>
> Right shift = delay

$$C\cos(\omega_0 t-\pi/2)=C\sin(\omega_0 t),\qquad C\sin(\omega_0 t+\pi/2)=C\cos(\omega_0 t)$$
*Cosine and sine are the same fundamental wave — they differ only by a quarter-cycle (90°) phase offset.*

![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*The phasor diagrams turn sinusoid addition into vector addition, so the combined amplitude and phase can be read directly from the geometry of the resulting arrow.*

## 3. Adding Sinusoids with the Same Frequency

**Example first.** Suppose x(t) = cos(ω₀t) − √3 sin(ω₀t).

Identify the coefficients: **a = 1** (the cosine coefficient) and **b = −√3** (the sine coefficient).

Compute the new amplitude:

C = √(a² + b²) = √(1 + 3) = **2**

Compute the new phase:

θ = tan⁻¹(−b/a) = tan⁻¹(√3) = **60°**

Result: x(t) = **2 cos(ω₀t + 60°)**

---

**General rule.** For any expression of the form a cos(ω₀t) + b sin(ω₀t):

- C = √(a² + b²)
- θ = tan⁻¹(−b/a), **choosing the correct quadrant**
- Result: C cos(ω₀t + θ)

### COMMON MISTAKE

The inverse tangent function on a calculator always returns an angle in the range −90° to +90°. If the point (a, −b) falls in the second or third quadrant, you must add or subtract 180° to get the correct angle. Always check the quadrant.

**Complex-number link (gentle).** The expression a − jb is simply a bookkeeping shorthand: its magnitude is C and its angle is θ. No heavy machinery needed — it is just a compact way to track the two numbers at once.

> **Formula Reference**
>
> a cos(ω₀t) + b sin(ω₀t) = C cos(ω₀t + θ)
>
> C = √(a² + b²)
>
> θ = tan⁻¹(−b/a)
>
> **Use the correct quadrant for θ.**

$$a\cos\omega_0 t+b\sin\omega_0 t=C\cos(\omega_0 t+\theta),\qquad C=\sqrt{a^2+b^2},\qquad \theta=\tan^{-1}\!\left(\frac{-b}{a}\right)$$
*Any sum of a cosine and a sine at the same frequency can always be collapsed into a single cosine with a new amplitude C and a new phase θ.*

---
**📌 Key Takeaways**
- Period T₀ = 1/f₀ = 2π/ω₀; radian frequency ω₀ and hertz frequency f₀ differ by a factor of 2π.
- Subtracting phase shifts the waveform right (delay); sine lags cosine by exactly 90°.
- Any a cos + b sin at the same frequency becomes C cos(ω₀t + θ) with C = √(a²+b²) and θ = tan⁻¹(−b/a).

*In the next section we will keep using phase and magnitude as compact tools for signal analysis.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlYWRfcGFyYW1ldGVycyIsImxhYmVsIjoiUmVhZGluZyBhbXBsaXR1ZGUsIGZyZXF1ZW5jeSwgcGVyaW9kLCBhbmQgcGhhc2UgZnJvbSBhIHNpbnVzb2lkIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IDRjb3MoMjDPgHQgKyA0NcKwKSwgd2hpY2ggY2hvaWNlIGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBBbXBsaXR1ZGUgNCwgZuKCgCA9IDEwIEh6LCBU4oKAID0gMC4xIHMsIHBoYXNlIDQ1wrAiLCJCLiBBbXBsaXR1ZGUgNCwgZuKCgCA9IDIwIEh6LCBU4oKAID0gMC4wNSBzLCBwaGFzZSA0NcKwIiwiQy4gQW1wbGl0dWRlIDIwz4AsIGbigoAgPSAxMCBIeiwgVOKCgCA9IDAuMSBzLCBwaGFzZSA0NcKwIiwiRC4gQW1wbGl0dWRlIDQsIGbigoAgPSAxMCBIeiwgVOKCgCA9IDEwIHMsIHBoYXNlIDQ1wrAiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJTaW5jZSDPieKCgCA9IDIwz4AsIHdlIGdldCBm4oKAID0gz4nigoAvKDLPgCkgPSAxMCBIeiBhbmQgVOKCgCA9IDEvZuKCgCA9IDAuMSBzLiBUaGUgYW1wbGl0dWRlIGlzIHRoZSBjb2VmZmljaWVudCA0IGFuZCB0aGUgcGhhc2UgaXMgNDXCsC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGlzIHRyZWF0cyDPieKCgCBhcyBpZiBpdCB3ZXJlIGbigoAgZGlyZWN0bHk7IHlvdSBtdXN0IGRpdmlkZSBieSAyz4AgZmlyc3QuIiwiQyI6IjIwz4AgaXMgdGhlIHJhZGlhbiBmcmVxdWVuY3ksIG5vdCB0aGUgYW1wbGl0dWRlLiIsIkQiOiJUaGUgcGVyaW9kIGlzIHRoZSByZWNpcHJvY2FsIG9mIGZyZXF1ZW5jeSwgc28gVOKCgCA9IDEvMTAgPSAwLjEgcywgbm90IDEwIHMuIn0sImhpbnQiOiJTZXBhcmF0ZSB0aGUgYW1wbGl0dWRlIGZyb20gdGhlIGFuZ3VsYXItZnJlcXVlbmN5IHRlcm0sIHRoZW4gdXNlIGbigoAgPSDPieKCgC8oMs+AKS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgc3R1ZGVudCB3cml0ZXMgVOKCgCA9IDEvz4nigoAgZm9yIHgodCkgPSBDIGNvcyjPieKCgHQgKyDOuCkuIFdoYXQgaXMgdGhlIGJlc3QgY29ycmVjdGlvbj8iLCJvcHRpb25zIjpbIkEuIENvcnJlY3QgYXMgd3JpdHRlbiIsIkIuIFTigoAgPSAyz4Avz4nigoAiLCJDLiBU4oKAID0gz4nigoAvKDLPgCkiLCJELiBU4oKAID0gzrgvz4nigoAiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJPbmUgZnVsbCBjeWNsZSBjb3JyZXNwb25kcyB0byBhIDLPgCBjaGFuZ2UgaW4gdGhlIGFuZ2xlIGFyZ3VtZW50LCBzbyB0aGUgcGVyaW9kIGlzIFTigoAgPSAyz4Avz4nigoAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBtaXNzZXMgdGhlIHJlcXVpcmVkIDLPgCByYWRpYW5zIHBlciBjeWNsZS4iLCJDIjoiVGhhdCBleHByZXNzaW9uIGVxdWFscyBmcmVxdWVuY3kgaW4gaGVydHosIG5vdCBwZXJpb2QuIiwiRCI6IlBoYXNlIHNoaWZ0IGRvZXMgbm90IGRldGVybWluZSB0aGUgcGVyaW9kLiJ9LCJoaW50IjoiQXNrIHlvdXJzZWxmOiBob3cgbXVjaCBkb2VzIHRoZSBhbmdsZSDPieKCgHQgbmVlZCB0byBpbmNyZWFzZSB0byBjb21wbGV0ZSBvbmUgZnVsbCBjeWNsZT8iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InBoYXNlX3NoaWZ0X2xlYWRfbGFnIiwibGFiZWwiOiJJbnRlcnByZXRpbmcgcGhhc2Ugc2hpZnQgYXMgZGVsYXkvYWR2YW5jZSBhbmQgY29zaW5lLXNpbmUgbGVhZC9sYWciLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoYXQgZG9lcyB4KHQpID0gQyBjb3Moz4nigoB0IOKIkiA2MMKwKSByZXByZXNlbnQgcmVsYXRpdmUgdG8gQyBjb3Moz4nigoB0KT8iLCJvcHRpb25zIjpbIkEuIEFuIGFkdmFuY2UgYnkgVOKCgC82IiwiQi4gQSBkZWxheSBieSBU4oKALzYiLCJDLiBBbiBhZHZhbmNlIGJ5IFTigoAvNCIsIkQuIE5vIHNoaWZ0LCBvbmx5IGFtcGxpdHVkZSBjaGFuZ2UiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJTdWJ0cmFjdGluZyBwaGFzZSBpbnNpZGUgdGhlIGNvc2luZSBzaGlmdHMgdGhlIGdyYXBoIHRvIHRoZSByaWdodCwgbWVhbmluZyB0aGUgc2lnbmFsIGlzIGRlbGF5ZWQuIFNpbmNlIDYwwrAgaXMgb25lLXNpeHRoIG9mIDM2MMKwLCB0aGUgZGVsYXkgaXMgVOKCgC82LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkEgcmlnaHQgc2hpZnQgbWVhbnMgZGVsYXksIG5vdCBhZHZhbmNlLiIsIkMiOiJU4oKALzQgY29ycmVzcG9uZHMgdG8gYSA5MMKwIHNoaWZ0LCBub3QgNjDCsC4iLCJEIjoiVGhlIGFtcGxpdHVkZSBDIGlzIHVuY2hhbmdlZDsgdGhpcyBpcyBwdXJlbHkgYSBwaGFzZSBzaGlmdC4ifSwiaGludCI6IkNvbnZlcnQgNjDCsCBpbnRvIGEgZnJhY3Rpb24gb2Ygb25lIGZ1bGwgY3ljbGUgKDM2MMKwKS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoibWF0cGxvdGxpYiBzaW51c29pZCBzaGlmdCBza2V0Y2giLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHN0YXRlbWVudCBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gc2luKM+J4oKAdCkgbGVhZHMgY29zKM+J4oKAdCkgYnkgOTDCsCIsIkIuIGNvcyjPieKCgHQpIGxhZ3Mgc2luKM+J4oKAdCkgYnkgOTDCsCIsIkMuIHNpbijPieKCgHQpIGxhZ3MgY29zKM+J4oKAdCkgYnkgOTDCsCIsIkQuIHNpbijPieKCgHQpIGFuZCBjb3Moz4nigoB0KSBhcmUgYWx3YXlzIGluIHBoYXNlIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiQmVjYXVzZSBjb3Moz4nigoB0IOKIkiDPgC8yKSA9IHNpbijPieKCgHQpLCBzaW5lIGlzIHdoYXQgeW91IGdldCB3aGVuIGNvc2luZSBpcyBkZWxheWVkIGJ5IGEgcXVhcnRlci1jeWNsZS4gVGhlcmVmb3JlIHNpbmUgbGFncyBjb3NpbmUgYnkgOTDCsC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIHJldmVyc2VzIHRoZSBsZWFkL2xhZyByZWxhdGlvbnNoaXAuIiwiQiI6IkNvc2luZSBhY3R1YWxseSBsZWFkcyBzaW5lIGJ5IDkwwrAsIG5vdCB0aGUgb3RoZXIgd2F5IGFyb3VuZC4iLCJEIjoiVGhleSBhcmUgc2VwYXJhdGVkIGJ5IGEgcXVhcnRlci1jeWNsZSAoOTDCsCksIHNvIHRoZXkgYXJlIG5vdCBpbiBwaGFzZS4ifSwiaGludCI6IlVzZSB0aGUgaWRlbnRpdHkgY29zKM+J4oKAdCDiiJIgz4AvMikgPSBzaW4oz4nigoB0KSBhbmQgYXNrIHdoaWNoIHNpZ25hbCBjb21lcyBmaXJzdC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImNvbWJpbmVfc2FtZV9mcmVxdWVuY3kiLCJsYWJlbCI6IkNvbWJpbmluZyBhIGNvc2luZSBhbmQgc2luZSBvZiB0aGUgc2FtZSBmcmVxdWVuY3kgaW50byBvbmUgc2ludXNvaWQiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IlJld3JpdGUgeCh0KSA9IGNvcyjPieKCgHQpIOKIkiDiiJozIHNpbijPieKCgHQpIGFzIGEgc2luZ2xlIGNvc2luZS4iLCJvcHRpb25zIjpbIkEuIDJjb3Moz4nigoB0IOKIkiA2MMKwKSIsIkIuIDJjb3Moz4nigoB0ICsgNjDCsCkiLCJDLiDiiJoyIGNvcyjPieKCgHQgKyA0NcKwKSIsIkQuIDJzaW4oz4nigoB0ICsgNjDCsCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJIZXJlIGEgPSAxIGFuZCBiID0g4oiS4oiaMywgc28gQyA9IOKImigxICsgMykgPSAyIGFuZCDOuCA9IHRhbuKBu8K5KOKIkmIvYSkgPSB0YW7igbvCuSjiiJozKSA9IDYwwrAuIFRoZXJlZm9yZSB4KHQpID0gMmNvcyjPieKCgHQgKyA2MMKwKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGUgc2lnbiBvZiB0aGUgcGhhc2UgaXMgd3JvbmcgZm9yIHRoaXMgYSBhbmQgYiBwYWlyOyDOuCA9ICs2MMKwLCBub3Qg4oiSNjDCsC4iLCJDIjoiVGhlIGFtcGxpdHVkZSBzaG91bGQgYmUgMiwgbm90IOKImjIsIGFuZCB0aGUgcGhhc2UgaXMgbm90IDQ1wrAuIiwiRCI6IkEgc2luZSBmb3JtIHdvdWxkIHJlcXVpcmUgZnVydGhlciBjb252ZXJzaW9uOyB0aGUgZGlyZWN0IHNpbmdsZS1jb3NpbmUgcmVzdWx0IGlzIG9wdGlvbiBCLiJ9LCJoaW50IjoiVXNlIGEgPSAxLCBiID0g4oiS4oiaMywgdGhlbiBjb21wdXRlIEMgPSDiiJooYcKyICsgYsKyKSBhbmQgzrggPSB0YW7igbvCuSjiiJJiL2EpLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJtYXRwbG90bGliIHBoYXNvciBhZGRpdGlvbiBkaWFncmFtIiwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiRm9yIHgodCkgPSDiiJIzY29zKM+J4oKAdCkgKyA0c2luKM+J4oKAdCksIGZpbmQgQyBhbmQgdGhlIHByaW5jaXBhbCBwaGFzZSBhbmdsZSDOuCBpbiB4KHQpID0gQyBjb3Moz4nigoB0ICsgzrgpLiIsImlkZWFsX2Fuc3dlciI6IkMgPSA1IGFuZCDOuCDiiYgg4oiSMTI2LjnCsC4gU2luY2UgYSA9IOKIkjMgYW5kIGIgPSA0LCBDID0g4oiaKCjiiJIzKcKyICsgNMKyKSA9IDUgYW5kIM64ID0gdGFu4oG7wrko4oiSYi9hKSA9IHRhbuKBu8K5KOKIkjQv4oiSMykuIFRoZSByYXcgaW52ZXJzZSB0YW5nZW50IGdpdmVzIGEgcmVmZXJlbmNlIGFuZ2xlIG5lYXIgNTMuMcKwLCBidXQgdGhlIHBvaW50IGEg4oiSIGpiID0g4oiSMyDiiJIgajQgbGllcyBpbiB0aGUgdGhpcmQgcXVhZHJhbnQsIHNvIHRoZSBjb3JyZWN0IHByaW5jaXBhbCBhbmdsZSBpcyBhcHByb3hpbWF0ZWx5IOKIkjEyNi45wrAgKGVxdWl2YWxlbnRseSAyMzMuMcKwKS4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IGNvbXB1dGUgQyA9IDUgY29ycmVjdGx5IiwiTXVzdCBjb3JyZWN0bHkgaWRlbnRpZnkgYSA9IOKIkjMgYW5kIGIgPSA0IiwiTXVzdCBzdGF0ZSBhIHByaW5jaXBhbCBhbmdsZSBlcXVpdmFsZW50IHRvIOKIkjEyNi45wrAgYW5kIGp1c3RpZnkgdGhlIHF1YWRyYW50IGNob2ljZSJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQgY2FuIGhhbmRsZSB0aGUgbWFpbiBleGFtIHRyYXA6IHRoZSBpbnZlcnNlIHRhbmdlbnQgZ2l2ZXMgb25seSBhIHJlZmVyZW5jZSBhbmdsZSwgYnV0IHRoZSBxdWFkcmFudCBtdXN0IGJlIGRldGVybWluZWQgc2VwYXJhdGVseSBieSBpbnNwZWN0aW5nIHRoZSBzaWducyBvZiBhIGFuZCDiiJJiLiIsImhpbnQiOiJQbG90IG9yIGltYWdpbmUgdGhlIHBvaW50IGEg4oiSIGpiID0gKOKIkjMsIOKIkjQpIGluIHRoZSBjb21wbGV4IHBsYW5lIGJlZm9yZSBkZWNpZGluZyB3aGljaCBxdWFkcmFudCDOuCBiZWxvbmdzIHRvLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJtYXRwbG90bGliIGNvbXBsZXgtcGxhbmUgb3IgcGhhc29yIHF1YWRyYW50IGRpYWdyYW0iLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX1dfQ==" style="display:none;"></div>%%KC_END%%
