# B.2 Sinusoids

> **Section Objective:** Learn to read, sketch, and combine sinusoidal signals — the building blocks of all signal analysis.

Take the signal x(t) = 3 cos(2π·50t − 60°). Each piece tells you something concrete: the **3** is the peak height (amplitude), **50** means the wave completes 50 full cycles every second (frequency = 50 Hz), and **−60°** means the wave is shifted slightly to the right compared to a plain cosine (a delay). Once you can read those three numbers off any formula, you understand the signal.

This section covers three skills: reading amplitude, frequency, and phase from a formula; converting between sine and cosine using a quarter-cycle shift; and collapsing sums like a cos(ω₀t) + b sin(ω₀t) into a single cosine. No heavy complex-number theory is needed — just careful bookkeeping.

> **Core takeaway:** A sinusoid is fully described by size, speed, and shift.

$$x(t) = C\cos(2\pi f_0 t + \theta) = C\cos(\omega_0 t + \theta), \quad \omega_0 = 2\pi f_0, \quad T_0 = \frac{1}{f_0} = \frac{2\pi}{\omega_0}$$
*Here **C** is the amplitude — the maximum value the signal reaches. **f₀** is the frequency in hertz (cycles per second), while **ω₀ = 2πf₀** is the radian frequency (radians per second); they carry the same information in different units. **θ** is the phase, which shifts the wave left or right in time. **T₀** is the period — the time for one complete cycle.

#### Warning
Never mix degrees and radians in the same expression. If θ is given in degrees, convert to radians before substituting into any formula that uses ω₀ (which is always in radians per second).*

![Fig. B.6](/figures/page-017-fig__b_6-1.png)
*The textbook figure shows three sinusoids together: C cos(ω₀t) (plain cosine), C sin(ω₀t) (sine), and C cos(ω₀t − 60°) (delayed cosine). Comparing the three curves makes the phase shift visible as a horizontal slide to the right — the delayed cosine reaches its peak one-sixth of a period later than the plain cosine.*

## 1. Reading a Sinusoid from Its Formula

Start with a concrete example: **x(t) = 2 cos(ω₀t − 60°)**.

- **Amplitude:** The coefficient in front is 2, so the wave swings between −2 and +2.
- **Period:** T₀ = 2π/ω₀. Whatever ω₀ is, the period is fixed by that ratio.
- **Phase:** The −60° is a negative phase, which means the wave is *delayed* — its peak arrives later than a plain cosine. Specifically, a 60° delay is one-sixth of a full 360° cycle, so the peak is shifted right by T₀/6.

### GENERAL RULE

For x(t) = C cos(ω₀t + θ):
- **Positive θ** → wave shifts **left** (arrives earlier, called a *phase advance*).
- **Negative θ** → wave shifts **right** (arrives later, called a *phase delay*).

### KEY IDENTITY

A cosine delayed by exactly a quarter cycle becomes a sine:

$$C\cos\!\left(\omega_0 t - \frac{\pi}{2}\right) = C\sin(\omega_0 t)$$

This is not a coincidence — sine and cosine are the same shape, just offset by 90°.

## 2. Turning Two Sinusoids into One

Suppose you have **x(t) = cos(ω₀t) − √3 sin(ω₀t)**. Two terms, same frequency — they can always be merged into one cosine.

**Step 1 — Identify a and b.**
Match to the form a cos(ω₀t) + b sin(ω₀t): here **a = 1** and **b = −√3**.

**Step 2 — Compute the amplitude.**
$$C = \sqrt{a^2 + b^2} = \sqrt{1^2 + (\!-\!\sqrt{3})^2} = \sqrt{1 + 3} = 2$$

**Step 3 — Compute the phase.**
$$\theta = \tan^{-1}\!\left(\frac{-b}{a}\right) = \tan^{-1}\!\left(\frac{\sqrt{3}}{1}\right) = 60°$$

**Step 4 — Write the result.**
$$x(t) = 2\cos(\omega_0 t + 60°)$$

### GENERAL RULE

For any a cos(ω₀t) + b sin(ω₀t), compute C = √(a² + b²) and θ = tan⁻¹(−b/a), then write C cos(ω₀t + θ). This only works when **both terms share the same frequency** ω₀ — different frequencies cannot be merged this way.

> **Core takeaway:** Same-frequency sine and cosine terms combine into one shifted cosine.

$$a\cos \omega_0 t + b\sin \omega_0 t = C\cos(\omega_0 t + \theta), \quad C = \sqrt{a^2+b^2}, \quad \theta = \tan^{-1}\!\left(\frac{-b}{a}\right)$$
*This formula converts two separate coefficients — a (the cosine weight) and b (the sine weight) — into a single amplitude C and a single phase angle θ. The result is one clean cosine with the same frequency.

#### Caution
Your calculator's tan⁻¹ function always returns an angle between −90° and +90°. If a is negative, the true angle is in the second or third quadrant, and you must add or subtract 180° to correct it. Always check the signs of a and −b together to confirm which quadrant the angle belongs to.*

![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*The phasor diagrams show sinusoid addition as vector addition on the complex plane. In diagram (a), a horizontal phasor (cosine component) and a vertical phasor (sine component) combine to give a resultant of length 2 at 60°, matching the worked example. In diagram (b), the components −3 and −4 produce a phasor of length 5 at −126.9°, illustrating how a third-quadrant angle arises when both components are negative.*

## 3. Why Complex Numbers Appear Here

You may wonder why complex numbers show up in a section about real sinusoids. Here is the direct link.

When you write a cos(ω₀t) + b sin(ω₀t), the pair of numbers (a, b) can be packaged as the complex number **a − jb**. Think of it as a point on a 2D plane: the horizontal coordinate is a, and the vertical coordinate is −b.

### KEY INSIGHT

The **magnitude** of a − jb is exactly the amplitude C, and the **angle** of a − jb is exactly the phase θ. So computing C and θ is the same as converting a complex number from rectangular to polar form.

**Worked example:** Suppose a = −3 and b = 4.

- Form the complex number: a − jb = **−3 − j4**
- Magnitude: C = √(3² + 4²) = **5**
- The point (−3, −4) is in the **third quadrant** (both coordinates negative), so the angle is not simply tan⁻¹(4/3) = 53.1°. The correct angle is 180° + 53.1° = 233.1°, or equivalently **θ ≈ −126.9°**.
- Result: x(t) = **5 cos(ω₀t − 126.9°)**

### EXAM TIP

On an exam, the fastest path to C and θ is to write a − jb, find its magnitude and angle by inspection or calculator, and read off the answer directly. Quadrant awareness is the one step students most often skip — don't.

$$a - jb = Ce^{j\theta}$$
*This compact equation says that the rectangular form (a, −b) and the polar form (C, θ) are two descriptions of the same complex number. The magnitude C = √(a² + b²) gives the amplitude of the combined sinusoid, and the angle θ = ∠(a − jb) gives its phase. Plugging these back in, the sinusoid a cos(ω₀t) + b sin(ω₀t) becomes C cos(ω₀t + θ) — the polar form of the complex number directly encodes the amplitude and phase of the real signal.*

---
**📌 Key Takeaways**
- In C cos(ω₀t + θ): C is amplitude, f₀ is frequency, θ is phase (negative = delay).
- Cosine delayed by π/2 equals sine: cos(ω₀t − π/2) = sin(ω₀t).
- a cos(ω₀t) + b sin(ω₀t) = C cos(ω₀t + θ), where C = √(a²+b²) and θ = tan⁻¹(−b/a).

*In the next section we will build on these sinusoid and phasor ideas.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlYWRfYmFzaWNfcGFyYW1ldGVycyIsImxhYmVsIjoiUmVhZCBhbXBsaXR1ZGUsIHBlcmlvZCwgZnJlcXVlbmN5LCBhbmQgcGhhc2UgZnJvbSBhIHNpbnVzb2lkIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IDQgY29zKDLPgMK3MjB0IC0gMzDCsCksIHdoaWNoIHN0YXRlbWVudCBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gQW1wbGl0dWRlID0gMjAsIGZyZXF1ZW5jeSA9IDQgSHosIHBoYXNlID0gLTMwwrAiLCJCLiBBbXBsaXR1ZGUgPSA0LCBmcmVxdWVuY3kgPSAyMCBIeiwgcGhhc2UgPSAtMzDCsCIsIkMuIEFtcGxpdHVkZSA9IDQsIGZyZXF1ZW5jeSA9IDLPgMK3MjAgSHosIHBoYXNlID0gKzMwwrAiLCJELiBBbXBsaXR1ZGUgPSAzMCwgZnJlcXVlbmN5ID0gMjAgSHosIHBoYXNlID0gNMKwIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiSW4geCh0KSA9IEMgY29zKDLPgGbigoB0ICsgzrgpLCB0aGUgYW1wbGl0dWRlIGlzIEMgPSA0LCB0aGUgZnJlcXVlbmN5IGlzIGbigoAgPSAyMCBIeiwgYW5kIHRoZSBwaGFzZSBpcyDOuCA9IC0zMMKwLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IjIwIGlzIHRoZSBmcmVxdWVuY3ksIG5vdCB0aGUgYW1wbGl0dWRlLiIsIkMiOiIyz4Bm4oKAIGlzIHJhZGlhbiBmcmVxdWVuY3ksIG5vdCBoZXJ0eiBmcmVxdWVuY3ksIGFuZCB0aGUgcGhhc2Ugc2lnbiBpcyBuZWdhdGl2ZSBoZXJlLiIsIkQiOiIzMMKwIGlzIHRoZSBwaGFzZSBtYWduaXR1ZGUsIG5vdCB0aGUgYW1wbGl0dWRlLiJ9LCJoaW50IjoiTWF0Y2ggdGhlIGZvcm11bGEgZGlyZWN0bHkgdG8gQyBjb3MoMs+AZuKCgHQgKyDOuCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJZiB4KHQpID0gQyBjb3Moz4nigoB0ICsgzrgpLCB3aGF0IGlzIHRoZSBwZXJpb2Q/Iiwib3B0aW9ucyI6WyJBLiBU4oKAID0gz4nigoAvMs+AIiwiQi4gVOKCgCA9IDEvz4nigoAiLCJDLiBU4oKAID0gMs+AL8+J4oKAIiwiRC4gVOKCgCA9IDLPgGbigoAiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJSYWRpYW4gZnJlcXVlbmN5IGFuZCBwZXJpb2Qgc2F0aXNmeSDPieKCgCA9IDLPgC9U4oKALCBzbyBU4oKAID0gMs+AL8+J4oKALiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoYXQgZXhwcmVzc2lvbiBlcXVhbHMgZnJlcXVlbmN5IGluIGhlcnR6LCBub3QgcGVyaW9kLiIsIkIiOiJUaGlzIG1pc3NlcyB0aGUgZmFjdG9yIDLPgC4iLCJEIjoiVGhpcyBoYXMgdGhlIHdyb25nIHZhcmlhYmxlcyBhbmQgdW5pdHMuIn0sImhpbnQiOiJVc2Ugz4nigoAgPSAyz4Bm4oKAIGFuZCBU4oKAID0gMS9m4oKALiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoicGhhc2Vfc2hpZnRfaW50ZXJwcmV0YXRpb24iLCJsYWJlbCI6IkludGVycHJldCBwaGFzZSBzaGlmdCBhcyBkZWxheSBvciBhZHZhbmNlIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkNvbXBhcmVkIHdpdGggQyBjb3Moz4nigoB0KSwgdGhlIHNpZ25hbCBDIGNvcyjPieKCgHQgLSA2MMKwKSBpczoiLCJvcHRpb25zIjpbIkEuIEFkdmFuY2VkIGJ5IDYwwrAiLCJCLiBEZWxheWVkIGJ5IDYwwrAiLCJDLiBEb3VibGVkIGluIGFtcGxpdHVkZSIsIkQuIENoYW5nZWQgdG8gYSBzaW5lIHdhdmUiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJBIG5lZ2F0aXZlIHBoYXNlIGluc2lkZSB0aGUgY29zaW5lIGNvcnJlc3BvbmRzIHRvIGEgcmlnaHQgc2hpZnQgaW4gdGltZSwgc28gdGhlIHNpZ25hbCBpcyBkZWxheWVkLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkFkdmFuY2UgY29ycmVzcG9uZHMgdG8gYSBwb3NpdGl2ZSBwaGFzZSBzaGlmdC4iLCJDIjoiVGhlIGFtcGxpdHVkZSByZW1haW5zIEMuIiwiRCI6IkEgNjDCsCBzaGlmdCBkb2VzIG5vdCBhdXRvbWF0aWNhbGx5IHR1cm4gY29zaW5lIGludG8gc2luZS4ifSwiaGludCI6IlRoaW5rIG9mIHNsaWRpbmcgdGhlIGdyYXBoIHRvIHRoZSByaWdodC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoic2hpZnRlZF9zaW51c29pZF9wbG90Iiwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoic2luZV9jb3NpbmVfcXVhcnRlcl9jeWNsZSIsImxhYmVsIjoiVXNlIHRoZSBxdWFydGVyLWN5Y2xlIHJlbGF0aW9uc2hpcCBiZXR3ZWVuIHNpbmUgYW5kIGNvc2luZSIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGlkZW50aXR5IGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBjb3Moz4nigoB0ICsgz4AvMikgPSBzaW4oz4nigoB0KSIsIkIuIGNvcyjPieKCgHQgLSDPgC8yKSA9IHNpbijPieKCgHQpIiwiQy4gc2luKM+J4oKAdCAtIM+ALzIpID0gY29zKM+J4oKAdCkiLCJELiBzaW4oz4nigoB0KSBsZWFkcyBjb3Moz4nigoB0KSBieSA5MMKwIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiQSBjb3NpbmUgZGVsYXllZCBieSDPgC8yIGJlY29tZXMgc2luZTogY29zKM+J4oKAdCAtIM+ALzIpID0gc2luKM+J4oKAdCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlIHNpZ24gaXMgd3JvbmcuIiwiQyI6IlRoZSBjb3JyZWN0IGlkZW50aXR5IGlzIHNpbijPieKCgHQgKyDPgC8yKSA9IGNvcyjPieKCgHQpLiIsIkQiOiJJdCBpcyB0aGUgb3RoZXIgd2F5IGFyb3VuZDogc2luZSBsYWdzIGNvc2luZSBieSA5MMKwLiJ9LCJoaW50IjoiUmVtZW1iZXIgdGhlIHRleHRib29rIHBpY3R1cmU6IHNoaWZ0IGNvc2luZSByaWdodCBieSBhIHF1YXJ0ZXItY3ljbGUgdG8gZ2V0IHNpbmUuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoiY29tYmluZV9zYW1lX2ZyZXF1ZW5jeV9zaW51c29pZHMiLCJsYWJlbCI6IkNvbWJpbmUgYSBjb3NpbmUgdGVybSBhbmQgYSBzaW5lIHRlcm0gaW50byBvbmUgc2ludXNvaWQiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDRfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkV4cHJlc3MgeCh0KSA9IGNvcyjPieKCgHQpIC0g4oiaMyBzaW4oz4nigoB0KSBhcyBhIHNpbmdsZSBzaW51c29pZC4iLCJvcHRpb25zIjpbIkEuIDIgY29zKM+J4oKAdCAtIDYwwrApIiwiQi4gMiBjb3Moz4nigoB0ICsgNjDCsCkiLCJDLiAyIHNpbijPieKCgHQgKyA2MMKwKSIsIkQuIOKImjIgY29zKM+J4oKAdCArIDQ1wrApIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiSGVyZSBhID0gMSBhbmQgYiA9IC3iiJozLiBTbyBDID0g4oiaKDEgKyAzKSA9IDIgYW5kIM64ID0gdGFu4oG7wrkoLWIvYSkgPSB0YW7igbvCuSjiiJozKSA9IDYwwrAsIGdpdmluZyAyIGNvcyjPieKCgHQgKyA2MMKwKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGUgc2lnbiBvZiB0aGUgcGhhc2UgaXMgd3JvbmcuIiwiQyI6IlRoaXMgaXMgbm90IHRoZSBzdGFuZGFyZCBjb3NpbmUtZm9ybSBhbnN3ZXIgb2J0YWluZWQgZnJvbSB0aGUgY29lZmZpY2llbnRzLiIsIkQiOiJCb3RoIGFtcGxpdHVkZSBhbmQgcGhhc2UgYXJlIGluY29ycmVjdC4ifSwiaGludCI6IlVzZSBDID0g4oiaKGHCsiArIGLCsikgYW5kIM64ID0gdGFu4oG7wrkoLWIvYSkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3A0X3EyIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJSZXdyaXRlIHgodCkgPSAtMyBjb3Moz4nigoB0KSArIDQgc2luKM+J4oKAdCkgYXMgYSBzaW5nbGUgY29zaW5lLiBTaG93IHRoZSBrZXkgc3RlcHMuIiwiaWRlYWxfYW5zd2VyIjoiSWRlbnRpZnkgYSA9IC0zIGFuZCBiID0gNC4gVGhlbiBDID0g4oiaKCgtMynCsiArIDTCsikgPSA1LiBGb3JtIGEgLSBqYiA9IC0zIC0gajQsIHNvIHRoZSBhbmdsZSBpcyBpbiB0aGUgdGhpcmQgcXVhZHJhbnQsIGdpdmluZyDOuCDiiYggLTEyNi45wrAuIFRoZXJlZm9yZSB4KHQpID0gNSBjb3Moz4nigoB0IC0gMTI2LjnCsCkuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBpZGVudGlmeSBhID0gLTMgYW5kIGIgPSA0IiwiTXVzdCBjb21wdXRlIGFtcGxpdHVkZSBDID0gNSIsIk11c3QgcGxhY2UgdGhlIGFuZ2xlIGluIHRoZSBjb3JyZWN0IHF1YWRyYW50IiwiTXVzdCBnaXZlIGFuIGVxdWl2YWxlbnQgZmluYWwgc2ludXNvaWQgc3VjaCBhcyA1IGNvcyjPieKCgHQgLSAxMjYuOcKwKSJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQgY2FuIGRvIHRoZSBmdWxsIGNvbnZlcnNpb24sIG5vdCBqdXN0IG1lbW9yaXplIHRoZSBmb3JtdWxhLiIsImhpbnQiOiJBZnRlciBmaW5kaW5nIHRoZSBtYWduaXR1ZGUsIHVzZSB0aGUgc2lnbnMgdG8gY2hvb3NlIHRoZSBjb3JyZWN0IGFuZ2xlIHF1YWRyYW50LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfV19" style="display:none;"></div>%%KC_END%%
