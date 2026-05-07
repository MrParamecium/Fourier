# B.2 Sinusoids

> **Section Objective:** Learn to read sinusoidal signals, shift them in time, and combine two same-frequency sinusoids into one compact expression.

---

Consider the signal x(t) = 3 cos(2π·50t − 30°). Reading it left to right: the **amplitude** is 3 (the peak value), the **frequency** is 50 Hz (the signal completes 50 full cycles per second), the **period** is T₀ = 1/50 s (the time for one full cycle), and the **phase** is −30° (the waveform is shifted slightly to the right of a plain cosine).

This section is about three skills that appear constantly in circuits and signals courses: reading those four quantities from any sinusoid, understanding what a phase shift does to the waveform in time, and combining two same-frequency sinusoids into a single, cleaner expression. These skills are the direct foundation for phasor analysis.

> **Formula Reference**
>
> | Expression | Meaning |
> |---|---|
> | x(t) = C cos(2πf₀t + θ) | Standard sinusoid, frequency form |
> | T₀ = 1/f₀ | Period from frequency |
> | ω₀ = 2πf₀ | Radian frequency from frequency |
> | x(t) = C cos(ω₀t + θ) | Standard sinusoid, radian-frequency form |

## 1. Reading a Sinusoid

Take x(t) = 4 cos(20πt + 45°) and extract every parameter step by step.

- **Amplitude C = 4.** It is the coefficient sitting outside the cosine — the peak value the signal reaches.
- **Radian frequency ω₀ = 20π rad/s.** It is the coefficient of t inside the cosine argument.
- **Frequency f₀ = ω₀ / (2π) = 20π / (2π) = 10 Hz.** Always divide by 2π to convert from rad/s to Hz.
- **Period T₀ = 1/f₀ = 1/10 = 0.1 s.** The time for one complete cycle.
- **Phase θ = 45°.** The constant added to the argument — positive here, so the waveform is shifted left.

### WHY COSINE REPEATS

Cosine returns to the same value every time its argument increases by 2π. That is why one full cycle takes exactly T₀ = 2π/ω₀ seconds.

### COMMON EXAM TRAP

Do not confuse ω₀ (rad/s) with f₀ (Hz). They differ by a factor of 2π. Also, never mix degrees and radians in the same expression — pick one and convert the other.

> **Formula Reference**
>
> | Formula | Meaning |
> |---|---|
> | ω₀ = 2πf₀ | Convert Hz to rad/s |
> | T₀ = 1/f₀ = 2π/ω₀ | Period |

![Fig. B.6](/figures/page-017-fig__b_6-1.png)
*The figure shows cosine, sine, and a delayed cosine side by side, making the phase shift visible as a left-right shift along the time axis.*

## 2. Phase Shift: Sine, Cosine, Lead, and Lag

Compare three signals at the same frequency:

- **cos(ω₀t)** — the reference, peaks at t = 0.
- **sin(ω₀t)** — peaks one quarter-cycle later, so it is delayed relative to cosine.
- **cos(ω₀t − 60°)** — peaks 60° later than cosine, shifted to the right.

**The key identity:** cos(ω₀t − π/2) = sin(ω₀t). Subtracting π/2 from the argument delays the waveform by a quarter cycle, which turns cosine exactly into sine. In plain language: **sine lags cosine by 90°**, and equivalently **cosine leads sine by 90°**.

### QUARTER-CYCLE REMINDER

One full cycle = 360° = 2π radians. A quarter cycle is therefore 90° = π/2 radians. These two ways of writing the same angle must be interchangeable in your work.

#### Note
A negative phase inside the argument (e.g., −60°) shifts the waveform to the **right** (delay). A positive phase shifts it to the **left** (advance).

> **Formula Reference**
>
> | Identity | Meaning |
> |---|---|
> | cos(ω₀t − π/2) = sin(ω₀t) | Cosine delayed by 90° equals sine |
> | sin(ω₀t + π/2) = cos(ω₀t) | Sine advanced by 90° equals cosine |
> | 1 cycle = 360° = 2π rad | Unit conversion |

$$a\cos(\omega_0 t)+b\sin(\omega_0 t)=C\cos(\omega_0 t+\theta),\quad C=\sqrt{a^2+b^2},\quad \theta=\tan^{-1}\!\left(\frac{-b}{a}\right)$$
*This is the key exam formula for collapsing two same-frequency sinusoids into a single cosine. C is the resulting amplitude and θ is the resulting phase. **Important warning:** do not trust your calculator's inverse-tangent result blindly — you must verify that θ lands in the correct quadrant by checking the signs of a and b separately. A calculator always returns an angle between −90° and +90°, which is wrong whenever a is negative.*

![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*The phasor diagrams turn sinusoid addition into vector addition, making the resulting amplitude and phase easy to read off geometrically.*

## 3. Adding Sinusoids with Phasors

**Worked example:** Simplify x(t) = cos(ω₀t) − √3 sin(ω₀t).

Match the form a cos(ω₀t) + b sin(ω₀t): here **a = 1** and **b = −√3**.

1. **Amplitude:** C = √(a² + b²) = √(1 + 3) = **2**.
2. **Phase:** θ = tan⁻¹(−b/a) = tan⁻¹(√3/1) = **60°**. Check the quadrant: a = 1 > 0 and −b = √3 > 0, so the phasor a − jb = 1 − j(−√3) = 1 + j√3 sits in the first quadrant. The angle 60° is correct.
3. **Result:** x(t) = **2 cos(ω₀t + 60°)**.

### THE GENERAL RULE

Whenever two sinusoids share the same frequency, their sum is always another sinusoid at that same frequency — only the amplitude and phase change.

### THE PHASOR CONNECTION

Think of the complex number a − jb. The symbol j is simply a bookkeeping label for the vertical axis in the phasor plane — it keeps the cosine component (horizontal) separate from the sine component (vertical). The magnitude of a − jb is C, and its angle is θ. Converting to polar form a − jb = Ce^{jθ} gives you both answers at once.

### EXAM TRAP

Always check which quadrant a − jb falls in before accepting the calculator's angle. The inverse-tangent function only returns values between −90° and +90°.

> **Formula Reference**
>
> | Formula | Meaning |
> |---|---|
> | a − jb = Ce^{jθ} | Phasor polar form |
> | C = √(a² + b²) | Resulting amplitude |
> | θ = angle(a − jb) | Resulting phase (quadrant-aware) |

---
**📌 Key Takeaways**
- A sinusoid x(t) = C cos(ω₀t + θ) has amplitude C, radian frequency ω₀, period T₀ = 2π/ω₀, and phase θ.
- Sine lags cosine by exactly 90°: cos(ω₀t − π/2) = sin(ω₀t).
- Two same-frequency sinusoids combine into one: C = √(a² + b²), θ = angle(a − jb).

*In the next section we will build on this sinusoid and phasor view.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlYWRfcGFyYW1ldGVycyIsImxhYmVsIjoiUmVhZCBhbXBsaXR1ZGUsIGZyZXF1ZW5jeSwgcGVyaW9kLCByYWRpYW4gZnJlcXVlbmN5LCBhbmQgcGhhc2UgZnJvbSBhIHNpbnVzb2lkIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IDQgY29zKDIwz4B0ICsgMzDCsCksIHdoaWNoIHN0YXRlbWVudCBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gQW1wbGl0dWRlID0gMjDPgCwgZnJlcXVlbmN5ID0gNCBIeiIsIkIuIEFtcGxpdHVkZSA9IDQsIGZyZXF1ZW5jeSA9IDEwIEh6IiwiQy4gQW1wbGl0dWRlID0gNCwgZnJlcXVlbmN5ID0gMjDPgCBIeiIsIkQuIFBlcmlvZCA9IDEwIHMiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJIZXJlIM+J4oKAID0gMjDPgCwgc28gZuKCgCA9IM+J4oKAIC8gKDLPgCkgPSAxMCBIei4gVGhlIGFtcGxpdHVkZSBpcyB0aGUgY29lZmZpY2llbnQgNC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiIyMM+AIGlzIHJhZGlhbiBmcmVxdWVuY3ksIG5vdCBhbXBsaXR1ZGUsIGFuZCA0IGlzIG5vdCB0aGUgZnJlcXVlbmN5LiIsIkMiOiIyMM+AIGlzIG1lYXN1cmVkIGluIHJhZC9zLCBub3QgaGVydHouIiwiRCI6IlRoZSBwZXJpb2QgaXMgMS8xMCBzLCBub3QgMTAgcy4ifSwiaGludCI6IlNlcGFyYXRlIHRoZSBvdXRzaWRlIGNvZWZmaWNpZW50IGZyb20gdGhlIGNvZWZmaWNpZW50IG9mIHQgaW5zaWRlIGNvc2luZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgc2ludXNvaWQgaXMgd3JpdHRlbiBhcyB4KHQpID0gQyBjb3Moz4nigoB0ICsgzrgpLiBXaGljaCBxdWFudGl0eSBpcyB0aGUgcGVyaW9kPyIsIm9wdGlvbnMiOlsiQS4gVOKCgCA9IM+J4oKAIC8gMs+AIiwiQi4gVOKCgCA9IDEgLyDPieKCgCIsIkMuIFTigoAgPSAyz4AgLyDPieKCgCIsIkQuIFTigoAgPSDOuCAvIM+J4oKAIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiU2luY2Ugz4nigoAgPSAyz4Bm4oKAIGFuZCBU4oKAID0gMS9m4oKALCB0aGUgcGVyaW9kIGlzIFTigoAgPSAyz4Avz4nigoAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhhdCBlcXVhbHMgZnJlcXVlbmN5IGluIGhlcnR6LCBub3QgcGVyaW9kLiIsIkIiOiJUaGlzIG1pc3NlcyB0aGUgZmFjdG9yIG9mIDLPgC4iLCJEIjoiUGhhc2UgZG9lcyBub3QgZGV0ZXJtaW5lIHRoZSBwZXJpb2QuIn0sImhpbnQiOiJVc2Ugz4nigoAgPSAyz4Bm4oKAIGFuZCBU4oKAID0gMS9m4oKALiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoicGhhc2Vfc2hpZnRfcmVsYXRpb25zaGlwIiwibGFiZWwiOiJJbnRlcnByZXQgcGhhc2Ugc2hpZnQgYW5kIHRoZSBzaW5lLWNvc2luZSBsZWFkLWxhZyByZWxhdGlvbnNoaXAiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggaWRlbnRpdHkgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIGNvcyjPieKCgHQgKyDPgC8yKSA9IHNpbijPieKCgHQpIiwiQi4gY29zKM+J4oKAdCDiiJIgz4AvMikgPSBzaW4oz4nigoB0KSIsIkMuIHNpbijPieKCgHQg4oiSIM+ALzIpID0gY29zKM+J4oKAdCkiLCJELiBzaW4oz4nigoB0KSA9IGNvcyjPieKCgHQpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiRGVsYXlpbmcgY29zaW5lIGJ5IDkwwrAgZ2l2ZXMgc2luZTogY29zKM+J4oKAdCDiiJIgz4AvMikgPSBzaW4oz4nigoB0KS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJBICvPgC8yIHNoaWZ0IGFkdmFuY2VzIGNvc2luZSwgd2hpY2ggZG9lcyBub3QgZXF1YWwgc2luKM+J4oKAdCkuIiwiQyI6IlRoZSBjb3JyZWN0IGlkZW50aXR5IGlzIHNpbijPieKCgHQgKyDPgC8yKSA9IGNvcyjPieKCgHQpLiIsIkQiOiJUaGV5IGFyZSBwaGFzZS1zaGlmdGVkIHZlcnNpb25zIG9mIGVhY2ggb3RoZXIsIG5vdCBpZGVudGljYWwuIn0sImhpbnQiOiJSZW1lbWJlcjogc2luZSBsYWdzIGNvc2luZSBieSA5MMKwLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSWYgeSh0KSA9IGNvcyjPieKCgHQg4oiSIDYwwrApLCBob3cgaXMgeSh0KSBwb3NpdGlvbmVkIHJlbGF0aXZlIHRvIGNvcyjPieKCgHQpPyIsIm9wdGlvbnMiOlsiQS4gQWR2YW5jZWQgdG8gdGhlIGxlZnQgYnkgNjDCsCIsIkIuIERlbGF5ZWQgdG8gdGhlIHJpZ2h0IGJ5IDYwwrAiLCJDLiBNdWx0aXBsaWVkIGJ5IOKIkjEiLCJELiBJdHMgZnJlcXVlbmN5IGlzIGRvdWJsZWQiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJBIG5lZ2F0aXZlIHBoYXNlIGluc2lkZSB0aGUgYXJndW1lbnQgY29ycmVzcG9uZHMgdG8gYSByaWdodCBzaGlmdCwgc28gdGhlIHdhdmVmb3JtIGlzIGRlbGF5ZWQgYnkgNjDCsC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJBIG1pbnVzIHNpZ24gaGVyZSBpbmRpY2F0ZXMgZGVsYXksIG5vdCBhZHZhbmNlLiIsIkMiOiJBIDE4MMKwIHNoaWZ0IHdvdWxkIGNvcnJlc3BvbmQgdG8gbXVsdGlwbGljYXRpb24gYnkg4oiSMS4iLCJEIjoiUGhhc2Ugc2hpZnQgZG9lcyBub3QgY2hhbmdlIGZyZXF1ZW5jeS4ifSwiaGludCI6IlRoaW5rIG9mIHJlcGxhY2luZyB0IGJ5IHQg4oiSIGRlbGF5LiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJ3YXZlZm9ybV9waGFzZV9zaGlmdCIsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6ImFkZGl0aW9uX29mX3NpbnVzb2lkcyIsImxhYmVsIjoiQ29tYmluZSBzYW1lLWZyZXF1ZW5jeSBzaW51c29pZHMgaW50byBvbmUgc2ludXNvaWQgdXNpbmcgYW1wbGl0dWRlIGFuZCBwaGFzZSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRXhwcmVzcyB4KHQpID0gY29zKM+J4oKAdCkg4oiSIOKImjMgc2luKM+J4oKAdCkgYXMgYSBzaW5nbGUgc2ludXNvaWQuIiwib3B0aW9ucyI6WyJBLiAyIGNvcyjPieKCgHQgKyA2MMKwKSIsIkIuIDIgY29zKM+J4oKAdCDiiJIgNjDCsCkiLCJDLiAyIHNpbijPieKCgHQgKyA2MMKwKSIsIkQuIGNvcyjPieKCgHQgKyA2MMKwKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IkhlcmUgYSA9IDEgYW5kIGIgPSDiiJLiiJozLCBzbyBDID0g4oiaKDEgKyAzKSA9IDIgYW5kIM64ID0gdGFu4oG7wrko4oiaMykgPSA2MMKwLCBnaXZpbmcgMiBjb3Moz4nigoB0ICsgNjDCsCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhlIHNpZ24gb2YgzrggaXMgd3JvbmcgZm9yIHRoZXNlIGNvZWZmaWNpZW50cy4iLCJDIjoiVGhpcyBpcyBub3QgdGhlIHJlcXVlc3RlZCBjb3NpbmUtZm9ybSByZXN1bHQuIiwiRCI6IlRoZSBhbXBsaXR1ZGUgc2hvdWxkIGJlIDIsIG5vdCAxLiJ9LCJoaW50IjoiVXNlIEMgPSDiiJooYcKyICsgYsKyKSBhbmQgzrggZnJvbSBhIOKIkiBqYi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciB4KHQpID0g4oiSMyBjb3Moz4nigoB0KSArIDQgc2luKM+J4oKAdCksIHdoYXQgaXMgdGhlIHJlc3VsdGluZyBhbXBsaXR1ZGUgQz8iLCJvcHRpb25zIjpbIkEuIDEiLCJCLiA1IiwiQy4gNyIsIkQuIOKImjciXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgYW1wbGl0dWRlIGlzIEMgPSDiiJooKOKIkjMpwrIgKyA0wrIpID0g4oiaKDkgKyAxNikgPSDiiJoyNSA9IDUuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBpcyBub3QgZm91bmQgYnkgc3VidHJhY3RpbmcgY29lZmZpY2llbnRzLiIsIkMiOiJUaGlzIGlzIHRoZSBzdW0gb2YgbWFnbml0dWRlcywgbm90IHRoZSBwaGFzb3IgbWFnbml0dWRlLiIsIkQiOiJUaGUgc3F1YXJlcyBhZGQgdG8gMjUsIG5vdCA3LiJ9LCJoaW50IjoiVHJlYXQgdGhlIGNvZWZmaWNpZW50cyBhcyBwZXJwZW5kaWN1bGFyIGNvbXBvbmVudHMuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EzIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJBIGNhbGN1bGF0b3IgZ2l2ZXMgzrggPSA1My4xwrAgd2hlbiB5b3UgY29tcHV0ZSB0YW7igbvCuSg0LzMpLCBidXQgdGhlIGNvZWZmaWNpZW50cyBhcmUgYSA9IOKIkjMgYW5kIGIgPSA0IGluIHgodCkgPSBhIGNvcyjPieKCgHQpICsgYiBzaW4oz4nigoB0KS4gRXhwbGFpbiBicmllZmx5IHdoeSA1My4xwrAgaXMgbm90IHRoZSBjb3JyZWN0IGZpbmFsIHBoYXNlIGZvciBjb3NpbmUgZm9ybS4iLCJpZGVhbF9hbnN3ZXIiOiJUaGUgYW5nbGUgbXVzdCBtYXRjaCB0aGUgY29ycmVjdCBxdWFkcmFudCBvZiB0aGUgY29tcGxleCBudW1iZXIgYSDiiJIgamIgPSDiiJIzIOKIkiBqNCwgd2hpY2ggbGllcyBpbiB0aGUgdGhpcmQgcXVhZHJhbnQuIFNvIHRoZSBwaGFzZSBpcyBub3QgKzUzLjHCsDsgaXQgbXVzdCBiZSBhZGp1c3RlZCB0byB0aGUgY29ycmVjdCBxdWFkcmFudCwgZ2l2aW5nIGEgcHJpbmNpcGFsIGFuZ2xlIHN1Y2ggYXMg4oiSMTI2LjnCsC4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IG1lbnRpb24gY29ycmVjdCBxdWFkcmFudCBzZWxlY3Rpb24iLCJNdXN0IGNvbm5lY3QgdGhlIHF1YWRyYW50IHRvIGEg4oiSIGpiIG9yIHRoZSBzaWducyBvZiBhIGFuZCBiIiwiTXVzdCBzdGF0ZSB0aGF0IDUzLjHCsCBmcm9tIGludmVyc2UgdGFuZ2VudCBhbG9uZSBpcyBpbnN1ZmZpY2llbnQiXSwiZXhwbGFuYXRpb24iOiJUaGlzIGNoZWNrcyB3aGV0aGVyIHRoZSBzdHVkZW50IHVuZGVyc3RhbmRzIHRoZSBtYWluIGV4YW0gdHJhcDogaW52ZXJzZSB0YW5nZW50IGNhbiByZXR1cm4gYSByZWZlcmVuY2UgYW5nbGUgYnV0IG5vdCBhbHdheXMgdGhlIGNvcnJlY3QgcGh5c2ljYWwgcGhhc2UuIiwiaGludCI6Ikxvb2sgYXQgdGhlIHNpZ25zIG9mIHRoZSBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBjb21wb25lbnRzIGJlZm9yZSB0cnVzdGluZyB0YW7igbvCuS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoicGhhc29yX3F1YWRyYW50X2RpYWdyYW0iLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
