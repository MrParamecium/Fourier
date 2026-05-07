# B.2 Sinusoidal Signals

> **Section Objective:** Learn how to read every parameter from a sinusoid formula, understand phase shift as a time delay or advance, and combine two same-frequency sinusoids into a single, cleaner expression.

---

A **sinusoid** is a smoothly repeating wave — the kind you see in AC power, audio signals, and virtually every oscillating system in engineering. Before we go further, let's quickly anchor three ideas you will need:

- **Phase** is simply a horizontal shift of the wave along the time axis.
- A **complex number** encodes two components — a horizontal (real) part and a vertical (imaginary) part — which will turn out to be exactly what we need to handle sinusoid addition.

### WHY THIS MATTERS FOR THE EXAM

Exam questions on sinusoids almost always ask you to: read off C, f₀, T₀, ω₀, and θ from a formula; convert between f₀ and ω₀; identify which signal leads or lags; or collapse a cos-plus-sin expression into one cosine. This section gives you every tool you need for all four tasks.

## 1. Reading a Sinusoid

The standard form of a sinusoidal signal is:

$$x(t) = C\cos(2\pi f_0 t + \theta)$$

Each symbol has a precise meaning:

- **C** — the **amplitude**: the peak height of the wave above zero.
- **f₀** — the **frequency** in **hertz (Hz)**: how many complete cycles occur per second.
- **T₀ = 1/f₀** — the **period**: the duration of one full cycle in seconds.
- **θ** — the **phase**: how much the wave is shifted horizontally from a pure cosine.

The signal repeats because the cosine function completes one full cycle every time its argument increases by 2π. That takes exactly T₀ = 1/f₀ seconds — which is why period and frequency are reciprocals.

You will also see the **radian frequency** ω₀ = 2πf₀, which lets you write the same signal more compactly as x(t) = C cos(ω₀t + θ).

#### Warning

Do **not** confuse f₀ (in Hz) with ω₀ (in rad/s) — they differ by a factor of 2π. And never mix degrees and radians inside a single calculation.

$$x(t)=C\cos(2\pi f_0 t+\theta),\quad T_0=\frac{1}{f_0},\quad \omega_0=2\pi f_0,\quad x(t)=C\cos(\omega_0 t+\theta)$$
*These four expressions name the same sinusoid — the first two define how period and hertz frequency are linked, and the last two show the identical signal written in hertz form and radian-frequency form. Switching between them is just a matter of substituting ω₀ = 2πf₀.*

![Fig. B.6](/figures/page-017-fig__b_6-1.png)
*This figure shows C cos(ω₀t), C sin(ω₀t), and the phase-shifted C cos(ω₀t − 60°) side by side, making it clear that a phase shift is nothing more than a horizontal slide of the waveform along the time axis.*

## 2. Phase Shift, Lead, and Lag

Look at Fig. B.6 above. The three waveforms are identical in shape — only their horizontal positions differ. That horizontal shift is exactly what the phase θ controls.

**Sine as a delayed cosine.** The identity

$$C\cos(\omega_0 t - \pi/2) = C\sin(\omega_0 t)$$

tells you that sine is simply cosine shifted **right** by a quarter-cycle (T₀/4). Shifting right means arriving **later** — so sine **lags** cosine by 90°.

Flipping the sign gives the reverse:

$$C\sin(\omega_0 t + \pi/2) = C\cos(\omega_0 t)$$

Cosine **leads** sine by 90°. These two identities are the same fact stated from opposite perspectives.

**Concrete example.** The signal C cos(ω₀t − 60°) is the standard cosine shifted **right** by 60°/360° = 1/6 of a period. It arrives one-sixth of a cycle later than C cos(ω₀t).

### KEY INSIGHT

A **negative** phase angle → shift **right** → signal arrives **later** → **lag**.
A **positive** phase angle → shift **left** → signal arrives **earlier** → **lead**.

$$C\cos(\omega_0 t-\pi/2)=C\sin(\omega_0 t),\qquad C\sin(\omega_0 t+\pi/2)=C\cos(\omega_0 t)$$
*Sine and cosine are the same waveform separated by a quarter-cycle phase shift, so any lead/lag question is ultimately a phase-shift question — identify the phase difference and its sign, and you have the answer.*

## 3. Adding Same-Frequency Sinusoids with Phasors

Suppose you need to simplify an expression like:

$$x(t) = a\cos(\omega_0 t) + b\sin(\omega_0 t)$$

This works **only** because both terms share the same frequency ω₀. The textbook result is:

$$x(t) = C\cos(\omega_0 t + \theta)$$

where the amplitude and phase are found from:

$$C = \sqrt{a^2 + b^2}, \qquad \theta = \tan^{-1}\!\left(\frac{-b}{a}\right)$$

#### Warning

Your calculator's inverse tangent returns a value in only one quadrant. If a is negative, or if a and b have mixed signs, the raw calculator answer will be **wrong**. Always check which quadrant the point (a, −b) falls in on the complex plane.

**The phasor shortcut.** Form the complex number a − jb. Its magnitude is C and its angle is θ. Converting a − jb to polar form (magnitude ∠ angle) gives you C and θ directly — and the quadrant is automatically correct because you are reading the angle of a specific point in the complex plane.

### EXAM TIP

Whenever you see a cos + b sin, immediately write down a − jb, find its magnitude and angle, and you are done.

$$a\cos(\omega_0 t)+b\sin(\omega_0 t)=C\cos(\omega_0 t+\theta),\quad C=\sqrt{a^2+b^2},\quad \theta=\tan^{-1}\!\left(\frac{-b}{a}\right),\quad a-jb=Ce^{j\theta}$$
*The coefficients a and b become the real and imaginary parts of the phasor a − jb, so the rectangular-to-polar conversion of that complex number directly yields the amplitude C and phase θ of the single equivalent sinusoid.*

![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*These phasor diagrams show how the horizontal (real) and vertical (imaginary) components of a − jb combine geometrically into one resultant arrow, whose length is the amplitude C and whose angle is the phase θ of the single equivalent sinusoid.*

---
**📌 Key Takeaways**
- A sinusoid x(t) = C cos(ω₀t + θ) is fully described by amplitude C, frequency f₀, period T₀ = 1/f₀, radian frequency ω₀ = 2πf₀, and phase θ.
- Sine lags cosine by 90°; a negative phase angle shifts the wave right (delay), a positive phase angle shifts it left (advance).
- To combine a cos(ω₀t) + b sin(ω₀t), form the phasor a − jb and convert to polar form: C = √(a²+b²), θ = angle of a − jb (check the quadrant).

*In the next section we will build on this sinusoid/phasor viewpoint.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlYWRfc2ludXNvaWRfcGFyYW1ldGVycyIsImxhYmVsIjoiUmVhZCBhbXBsaXR1ZGUsIHBlcmlvZCwgZnJlcXVlbmN5LCByYWRpYW4gZnJlcXVlbmN5LCBhbmQgcGhhc2UgZnJvbSBhIHNpbnVzb2lkIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IDRjb3MoMjDPgHQg4oiSIDMwwrApLCB3aGljaCBzdGF0ZW1lbnQgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIEFtcGxpdHVkZSA9IDIwz4AsIGZyZXF1ZW5jeSA9IDQgSHoiLCJCLiBBbXBsaXR1ZGUgPSA0LCBmcmVxdWVuY3kgPSAxMCBIeiIsIkMuIEFtcGxpdHVkZSA9IDQsIGZyZXF1ZW5jeSA9IDIwz4AgSHoiLCJELiBBbXBsaXR1ZGUgPSAzMCwgZnJlcXVlbmN5ID0gMTAgSHoiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJDb21wYXJlIHgodCkgPSA0Y29zKDIwz4B0IOKIkiAzMMKwKSB3aXRoIEMgY29zKDLPgGbigoB0ICsgzrgpLiBIZXJlIEMgPSA0IGFuZCAyz4Bm4oKAID0gMjDPgCwgc28gZuKCgCA9IDEwIEh6LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IjIwz4AgaXMgdGhlIHJhZGlhbi1mcmVxdWVuY3kgY29lZmZpY2llbnQsIG5vdCB0aGUgYW1wbGl0dWRlLiIsIkMiOiIyMM+AIGlzIGluIHJhZC9zLCBub3QgSHouIiwiRCI6IjMwwrAgaXMgdGhlIHBoYXNlIG1hZ25pdHVkZSwgbm90IHRoZSBhbXBsaXR1ZGUuIn0sImhpbnQiOiJNYXRjaCB0aGUgZm9ybXVsYSB0ZXJtLWJ5LXRlcm0gd2l0aCBDIGNvcygyz4Bm4oKAdCArIM64KS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIGEgc2ludXNvaWQgaGFzIGZyZXF1ZW5jeSBm4oKAID0gNTAgSHosIHdoYXQgYXJlIGl0cyBwZXJpb2QgVOKCgCBhbmQgcmFkaWFuIGZyZXF1ZW5jeSDPieKCgD8iLCJvcHRpb25zIjpbIkEuIFTigoAgPSAwLjAyIHMsIM+J4oKAID0gMTAwz4AgcmFkL3MiLCJCLiBU4oKAID0gNTAgcywgz4nigoAgPSAyNc+AIHJhZC9zIiwiQy4gVOKCgCA9IDAuNSBzLCDPieKCgCA9IDLPgC81MCByYWQvcyIsIkQuIFTigoAgPSAwLjAyIHMsIM+J4oKAID0gNTAgcmFkL3MiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJVc2UgVOKCgCA9IDEvZuKCgCA9IDEvNTAgPSAwLjAyIHMgYW5kIM+J4oKAID0gMs+AZuKCgCA9IDLPgCDDlyA1MCA9IDEwMM+AIHJhZC9zLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IkJvdGggcGVyaW9kIGFuZCByYWRpYW4gZnJlcXVlbmN5IGFyZSBjb21wdXRlZCBpbmNvcnJlY3RseS4iLCJDIjoiVGhpcyBpbnZlcnRzIHRoZSBmb3JtdWxhcy4iLCJEIjoiz4nigoAgaXMgbm90IG51bWVyaWNhbGx5IGVxdWFsIHRvIGbigoAgdW5sZXNzIDLPgCBpcyBpbmNvcnJlY3RseSBvbWl0dGVkLiJ9LCJoaW50IjoiT25lIGZvcm11bGEgdXNlcyByZWNpcHJvY2FsOyB0aGUgb3RoZXIgbXVsdGlwbGllcyBieSAyz4AuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJwaGFzZV9zaGlmdF9sZWFkX2xhZyIsImxhYmVsIjoiSW50ZXJwcmV0IHBoYXNlIHNoaWZ0IGFzIGRlbGF5L2FkdmFuY2UgYW5kIGlkZW50aWZ5IGxlYWQvbGFnIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBzdGF0ZW1lbnQgaXMgY29ycmVjdCBhYm91dCBzaW4oz4nigoB0KSBhbmQgY29zKM+J4oKAdCk/Iiwib3B0aW9ucyI6WyJBLiBzaW4oz4nigoB0KSBsZWFkcyBjb3Moz4nigoB0KSBieSA5MMKwIiwiQi4gY29zKM+J4oKAdCkgbGFncyBzaW4oz4nigoB0KSBieSA5MMKwIiwiQy4gc2luKM+J4oKAdCkgbGFncyBjb3Moz4nigoB0KSBieSA5MMKwIiwiRC4gVGhleSBkaWZmZXIgYnkgYW1wbGl0dWRlLCBub3QgcGhhc2UiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJCZWNhdXNlIGNvcyjPieKCgHQg4oiSIM+ALzIpID0gc2luKM+J4oKAdCksIHNpbmUgaXMgY29zaW5lIGRlbGF5ZWQgYnkgOTDCsCwgc28gc2luZSBsYWdzIGNvc2luZSBieSA5MMKwLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgcmV2ZXJzZXMgdGhlIGxlYWQvbGFnIGRpcmVjdGlvbi4iLCJCIjoiQ29zaW5lIGFjdHVhbGx5IGxlYWRzIHNpbmUgYnkgOTDCsCwgbm90IHRoZSBvdGhlciB3YXkgYXJvdW5kLiIsIkQiOiJUaGVpciBhbXBsaXR1ZGVzIGNhbiBiZSBpZGVudGljYWw7IHRoZSBrZXkgZGlmZmVyZW5jZSBoZXJlIGlzIHBoYXNlLCBub3QgYW1wbGl0dWRlLiJ9LCJoaW50IjoiQSBkZWxheSBjb3JyZXNwb25kcyB0byBsYWcgYW5kIHNoaWZ0cyB0aGUgZ3JhcGggdG8gdGhlIHJpZ2h0LiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJ3YXZlZm9ybV9waGFzZV9zaGlmdCIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiY29tYmluZV9zYW1lX2ZyZXF1ZW5jeV9zaW51c29pZHMiLCJsYWJlbCI6IlJld3JpdGUgYSBjb3MtcGx1cy1zaW4gZXhwcmVzc2lvbiBhcyBhIHNpbmdsZSBzaW51c29pZCIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV3JpdGUgeCh0KSA9IGNvcyjPieKCgHQpIOKIkiDiiJozIHNpbijPieKCgHQpIGFzIGEgc2luZ2xlIGNvc2luZS4iLCJvcHRpb25zIjpbIkEuIDJjb3Moz4nigoB0ICsgNjDCsCkiLCJCLiAyY29zKM+J4oKAdCDiiJIgNjDCsCkiLCJDLiDiiJoyIGNvcyjPieKCgHQgKyA0NcKwKSIsIkQuIDJzaW4oz4nigoB0ICsgNjDCsCkiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJIZXJlIGEgPSAxIGFuZCBiID0g4oiS4oiaMy4gVGhlbiBDID0g4oiaKDEgKyAzKSA9IDIgYW5kIM64ID0gdGFu4oG7wrko4oiSYi9hKSA9IHRhbuKBu8K5KOKImjMpID0gNjDCsCwgc28geCh0KSA9IDJjb3Moz4nigoB0ICsgNjDCsCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhlIHNpZ24gb2YgdGhlIHBoYXNlIGlzIHdyb25nIGZvciBiID0g4oiS4oiaMzsg4oiSKOKIkuKImjMpLzEgPSAr4oiaMywgZ2l2aW5nICs2MMKwLCBub3Qg4oiSNjDCsC4iLCJDIjoiVGhlIGFtcGxpdHVkZSBpcyBub3Qg4oiaMjsgaXQgbXVzdCBiZSDiiJooYcKyICsgYsKyKSA9IOKImigxICsgMykgPSAyLiIsIkQiOiJUaGlzIGlzIG5vdCB0aGUgcmVxdWVzdGVkIHNpbmdsZS1jb3NpbmUgZm9ybSBhbmQgZG9lcyBub3QgbWF0Y2ggdGhlIHNhbWUgcGhhc2UgZGlyZWN0bHkuIn0sImhpbnQiOiJVc2UgQyA9IOKImihhwrIgKyBiwrIpIGFuZCBmb3JtIHRoZSBwaGFzb3IgYSDiiJIgamIgPSAxIOKIkiBqKOKIkuKImjMpID0gMSArIGriiJozLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJwaGFzb3JfYWRkaXRpb24iLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciB4KHQpID0g4oiSM2NvcyjPieKCgHQpICsgNHNpbijPieKCgHQpLCB3aGljaCBwYWlyIChDLCDOuCkgZ2l2ZXMgeCh0KSA9IEMgY29zKM+J4oKAdCArIM64KT8iLCJvcHRpb25zIjpbIkEuIEMgPSA1LCDOuCA9IDUzLjHCsCIsIkIuIEMgPSA1LCDOuCA9IOKIkjEyNi45wrAiLCJDLiBDID0gNywgzrggPSDiiJIxMjYuOcKwIiwiRC4gQyA9IDEsIM64ID0gMTI2LjnCsCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IldpdGggYSA9IOKIkjMgYW5kIGIgPSA0LCBDID0g4oiaKDkgKyAxNikgPSA1LiBUaGUgcGhhc29yIGlzIGEg4oiSIGpiID0g4oiSMyDiiJIgajQsIHdoaWNoIGxpZXMgaW4gdGhlIHRoaXJkIHF1YWRyYW50LiBJdHMgYW5nbGUgaXMg4oiSMTgwwrAgKyB0YW7igbvCuSg0LzMpID0g4oiSMTgwwrAgKyA1My4xwrAgPSDiiJIxMjYuOcKwLCBzbyDOuCA9IOKIkjEyNi45wrAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiNTMuMcKwIGlzIG9ubHkgdGhlIHJlZmVyZW5jZSBhbmdsZSBhbmQgaWdub3JlcyB0aGUgcXVhZHJhbnQg4oCUIHRoZSBwaGFzb3Ig4oiSMyDiiJIgajQgaXMgbm90IGluIHRoZSBmaXJzdCBxdWFkcmFudC4iLCJDIjoiVGhlIGFtcGxpdHVkZSBtdXN0IGJlIDUsIG5vdCA3LiIsIkQiOiJOZWl0aGVyIHRoZSBhbXBsaXR1ZGUgbm9yIHRoZSBhbmdsZSBpcyBjb3JyZWN0LiJ9LCJoaW50IjoiRG8gbm90IHRydXN0IGludmVyc2UgdGFuZ2VudCB3aXRob3V0IGNoZWNraW5nIHRoZSBxdWFkcmFudCDigJQgcGxvdCB0aGUgcG9pbnQgKOKIkjMsIOKIkjQpIGluIHRoZSBjb21wbGV4IHBsYW5lIGZpcnN0LiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJwaGFzb3JfcXVhZHJhbnRfY2hlY2siLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDNfcTMiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IldoeSBpcyBjaGVja2luZyB0aGUgcXVhZHJhbnQgZXNzZW50aWFsIHdoZW4gZmluZGluZyDOuCBmcm9tIHRhbuKBu8K5KOKIkmIvYSkgaW4gcGhhc29yIGFkZGl0aW9uPyIsImlkZWFsX2Fuc3dlciI6IkJlY2F1c2UgaW52ZXJzZSB0YW5nZW50IHJldHVybnMgb25seSBhIHByaW5jaXBhbCByZWZlcmVuY2UgYW5nbGUgKGJldHdlZW4g4oiSOTDCsCBhbmQgOTDCsCkgYW5kIGRvZXMgbm90IGJ5IGl0c2VsZiBpbmRpY2F0ZSB3aGljaCBxdWFkcmFudCB0aGUgcGhhc29yIGEg4oiSIGpiIGxpZXMgaW4uIFRoZSBzaWducyBvZiBhIGFuZCBiIHRvZ2V0aGVyIGRldGVybWluZSB0aGUgY29ycmVjdCBxdWFkcmFudCwgc28gdXNpbmcgdGhlIHJhdyBjYWxjdWxhdG9yIGFuZ2xlIGNhbiBnaXZlIGEgcGhhc2UgdGhhdCBpcyBvZmYgYnkgMTgwwrAuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBtZW50aW9uIHRoYXQgYXJjdGFuZ2VudCBhbG9uZSByZXR1cm5zIGFuIGFtYmlndW91cyBvciByZWZlcmVuY2UgYW5nbGUiLCJNdXN0IG1lbnRpb24gdXNpbmcgdGhlIHNpZ25zIG9mIGEgYW5kIGIgKG9yIHBsb3R0aW5nIHRoZSBwaGFzb3IgYSDiiJIgamIpIHRvIGRldGVybWluZSB0aGUgY29ycmVjdCBxdWFkcmFudCIsIk11c3Qgc3RhdGUgdGhhdCBpZ25vcmluZyB0aGUgcXVhZHJhbnQgY2FuIHByb2R1Y2UgdGhlIHdyb25nIHBoYXNlIGFuZ2xlIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCB1bmRlcnN0YW5kcyB0aGUgbWFpbiBleGFtIHRyYXAgcmF0aGVyIHRoYW4gb25seSBtZW1vcml6aW5nIGZvcm11bGFzLiIsImhpbnQiOiJUaGluayBhYm91dCBwbG90dGluZyB0aGUgcG9pbnQgKGEsIOKIkmIpIGluIHRoZSBjb21wbGV4IHBsYW5lIOKAlCB3aGljaCBxdWFkcmFudCBkb2VzIGl0IGxhbmQgaW4sIGFuZCBkb2VzIHlvdXIgY2FsY3VsYXRvciBhbmdsZSBhZ3JlZT8iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
