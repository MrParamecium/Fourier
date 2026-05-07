# B.2 Sinusoids

> **Section Objective:** Learn to read, sketch, and combine sinusoidal signals — a core skill tested on nearly every signals exam.

Consider the signal x(t) = 3 cos(2π·50 t − 30°). At a glance, this tells you the signal oscillates 50 times per second, its peak value is 3, and it is shifted slightly to the right in time. This section teaches you to extract exactly that information from any sinusoid.

We will also tackle a common exam task: rewriting a sum like a cos(ω₀t) + b sin(ω₀t) as a single, cleaner sinusoid. To do that, we briefly use complex numbers — but only as a bookkeeping tool for magnitude and angle, nothing more.

**Two reassuring reminders before we start:** Cosine and sine are the same waveform — sine is just cosine shifted 90° to the right. And complex numbers here are just a shortcut for tracking two numbers at once. No deep theory required.

$$x(t) = C\cos(2\pi f_0 t + \theta), \qquad T_0 = \frac{1}{f_0}, \qquad \omega_0 = 2\pi f_0$$
*Here **C** is the amplitude (the peak height of the wave), **f₀** is the frequency in hertz (how many full cycles per second), **T₀** is the period (how many seconds one cycle takes), **θ** is the phase (how far the waveform is shifted in time, measured in degrees or radians), and **ω₀** is the radian frequency in rad/s. **Do not confuse f₀ and ω₀:** f₀ is in Hz and ω₀ = 2πf₀ is always larger by a factor of 2π — mixing them up is one of the most common exam errors.*

![Fig. B.6](/figures/page-017-fig__b_6-1.png)
*Shifting a sinusoid left or right in time is equivalent to changing its phase θ — a delay of T₀/6 to the right corresponds to a phase of −60°.*

## 1. Reading and Sketching a Sinusoid

Let's work through x(t) = C cos(ω₀t − 60°) step by step.

**Step 1 — Identify the phase.** The phase is −60°. The negative sign means the waveform is delayed, i.e., shifted to the **right** on the time axis.

**Step 2 — Connect the angle to the cycle.** One full cycle is 360°. A delay of 60° is therefore 60/360 = **one-sixth of a period** (T₀/6). The peak that would appear at t = 0 now appears at t = T₀/6.

**Step 3 — Generalize.** Any phase θ tells you where the waveform sits within its cycle. Positive θ shifts the peak to the left (early); negative θ shifts it to the right (late).

### SPECIAL CASES TO MEMORIZE

- **C cos(ω₀t)** — the reference: peak at t = 0, no shift.
- **C sin(ω₀t)** — identical shape, but delayed by 90° (one quarter cycle to the right).
- **C cos(ω₀t − π/2) = C sin(ω₀t)** — this identity is the bridge between cosine and sine.

#### Note
A phase of −π/2 radians is the same as −90°. Always check whether your problem uses degrees or radians.

$$C\cos(\omega_0 t - \pi/2) = C\sin(\omega_0 t), \qquad C\sin(\omega_0 t + \pi/2) = C\cos(\omega_0 t)$$
*These two identities capture the relationship between sine and cosine in terms of **lag** and **lead**. To **lag** means to arrive later — sine lags cosine by 90°, meaning sine's peaks appear 90° (a quarter cycle) after cosine's peaks. To **lead** means to arrive earlier — cosine leads sine by 90°, meaning cosine's peaks appear 90° before sine's peaks. In plain terms: if you delay a cosine by a quarter cycle, you get a sine; if you advance a sine by a quarter cycle, you get a cosine.*

![unknown](/figures/page-018-unknown-1.png)
*In the complex plane, the horizontal coordinate gives the cosine coefficient a, the vertical coordinate gives the negative sine coefficient −b, and the length and angle of the resulting vector directly yield the combined amplitude C and phase θ.*

## 2. Adding Sinusoids with the Same Frequency

Suppose you need to simplify x(t) = cos(ω₀t) − √3 sin(ω₀t). Here is the full worked solution.

**Step 1 — Identify a and b.** Match to the form a cos(ω₀t) + b sin(ω₀t). Here **a = 1** and **b = −√3**.

**Step 2 — Compute the amplitude C.**
$$C = \sqrt{a^2 + b^2} = \sqrt{1^2 + (\!-\!\sqrt{3})^2} = \sqrt{1 + 3} = 2$$

**Step 3 — Compute the phase θ.**
$$\theta = \tan^{-1}\!\left(\frac{-b}{a}\right) = \tan^{-1}\!\left(\frac{\sqrt{3}}{1}\right) = 60°$$

**Step 4 — Write the result.** x(t) = 2 cos(ω₀t + 60°). Done.

**General formula:** For any a cos(ω₀t) + b sin(ω₀t), the equivalent single sinusoid is C cos(ω₀t + θ) with C and θ computed as above.

### THE COMPLEX NUMBER LINK

Treat the pair (a, b) as the complex number **a − jb**. Its distance from the origin is C = √(a² + b²), and its angle is θ. This is why complex numbers appear here — they package both pieces of information into one object.

### EXAM TIP

Your calculator's tan⁻¹ always returns a value between −90° and +90°. If a or −b is negative, the true angle may be in a different quadrant. Always check the signs of a and −b to confirm the correct quadrant before writing your final answer.

$$a\cos(\omega_0 t) + b\sin(\omega_0 t) = C\cos(\omega_0 t + \theta), \qquad C = \sqrt{a^2+b^2}, \qquad \theta = \tan^{-1}\!\left(\frac{-b}{a}\right)$$
*These formulas convert any sum of a cosine and a sine at the same frequency into a single equivalent cosine with amplitude C and phase θ. **Critical caution:** the inverse tangent formula alone is not sufficient — it only gives the correct angle when both a and −b are positive (first quadrant). If either is negative, you must determine the correct quadrant from the signs of a and −b separately, then adjust the angle accordingly. Skipping this step is the most common source of wrong-quadrant errors on exams.*

![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*Phasor addition converts the problem of combining two sinusoids into simple vector addition in the complex plane, so the final amplitude and phase can be read directly from the resulting vector's length and angle.*

---
**📌 Key Takeaways**
- A sinusoid C cos(2πf₀t + θ) is fully described by its amplitude, frequency, period, and phase.
- Sine lags cosine by 90°: cos(ω₀t − π/2) = sin(ω₀t).
- a cos(ω₀t) + b sin(ω₀t) = C cos(ω₀t + θ), where C = √(a²+b²) and θ = tan⁻¹(−b/a).

*In the next section we will use these sinusoid and phasor ideas in more advanced signal analysis.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InNpbnVzb2lkX3BhcmFtZXRlcnMiLCJsYWJlbCI6IkFtcGxpdHVkZSwgcGhhc2UsIHBlcmlvZCwgZnJlcXVlbmN5LCBhbmQgcmFkaWFuIGZyZXF1ZW5jeSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHgodCkgPSA0IGNvcygyz4DCtzI1IHQgLSAzMMKwKSwgd2hpY2ggc3RhdGVtZW50IGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBBbXBsaXR1ZGUgPSAyNSwgZnJlcXVlbmN5ID0gNCBIeiwgcGhhc2UgPSAtMzDCsCIsIkIuIEFtcGxpdHVkZSA9IDQsIGZyZXF1ZW5jeSA9IDI1IEh6LCBwaGFzZSA9IC0zMMKwIiwiQy4gQW1wbGl0dWRlID0gNCwgZnJlcXVlbmN5ID0gMs+AwrcyNSBIeiwgcGhhc2UgPSAzMMKwIiwiRC4gQW1wbGl0dWRlID0gLTMwwrAsIHBlcmlvZCA9IDI1IHMsIHBoYXNlID0gNCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBjb2VmZmljaWVudCBvdXRzaWRlIGNvc2luZSBpcyB0aGUgYW1wbGl0dWRlLCBzbyBDID0gNC4gVGhlIGNvZWZmaWNpZW50IG9mIHQgaW5zaWRlIDLPgGbigoB0IGlzIDI1LCBzbyBm4oKAID0gMjUgSHosIGFuZCB0aGUgcGhhc2UgaXMgLTMwwrAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBzd2FwcyBhbXBsaXR1ZGUgYW5kIGZyZXF1ZW5jeS4iLCJDIjoiMs+AwrcyNSBpcyB0aGUgcmFkaWFuIGZyZXF1ZW5jeSwgbm90IHRoZSBoZXJ0eiBmcmVxdWVuY3ksIGFuZCB0aGUgc2lnbiBvZiBwaGFzZSBpcyB3cm9uZy4iLCJEIjoiQW1wbGl0dWRlIGNhbm5vdCBiZSBhbiBhbmdsZSwgYW5kIHRoZSBwZXJpb2QgaXMgMS8yNSBzLCBub3QgMjUgcy4ifSwiaGludCI6Ik1hdGNoIHRoZSBzaWduYWwgdG8gQyBjb3MoMs+AZuKCgHQgKyDOuCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJZiDPieKCgCA9IDEwMM+AIHJhZC9zLCB3aGF0IGFyZSBm4oKAIGFuZCBU4oKAPyIsIm9wdGlvbnMiOlsiQS4gZuKCgCA9IDEwMM+AIEh6LCBU4oKAID0gMS8oMTAwz4ApIHMiLCJCLiBm4oKAID0gNTAgSHosIFTigoAgPSAwLjAyIHMiLCJDLiBm4oKAID0gMTAwIEh6LCBU4oKAID0gMC4wMSBzIiwiRC4gZuKCgCA9IDI1IEh6LCBU4oKAID0gMC4wNCBzIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVXNpbmcgz4nigoAgPSAyz4Bm4oKAIGdpdmVzIGbigoAgPSAxMDDPgC8oMs+AKSA9IDUwIEh6LiBUaGVuIFTigoAgPSAxL2bigoAgPSAwLjAyIHMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBjb25mdXNlcyByYWRpYW4gZnJlcXVlbmN5IHdpdGggaGVydHogZnJlcXVlbmN5LiIsIkMiOiJUaGlzIGZvcmdldHMgdGhlIGZhY3RvciBvZiAyz4AgaW4gz4nigoAgPSAyz4Bm4oKALiIsIkQiOiJCb3RoIHZhbHVlcyBhcmUgdG9vIHNtYWxsIGJ5IGEgZmFjdG9yIG9mIDIuIn0sImhpbnQiOiJGaXJzdCBjb252ZXJ0IHJhZC9zIHRvIEh6IHVzaW5nIGbigoAgPSDPieKCgCAvICgyz4ApLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoicGhhc2Vfc2hpZnRfcmVsYXRpb25zaGlwIiwibGFiZWwiOiJTaW5lLWNvc2luZSBwaGFzZSBzaGlmdCwgbGFnLCBhbmQgbGVhZCIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBpZGVudGl0eSBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gY29zKM+J4oKAdCArIM+ALzIpID0gc2luKM+J4oKAdCkiLCJCLiBjb3Moz4nigoB0IC0gz4AvMikgPSBzaW4oz4nigoB0KSIsIkMuIHNpbijPieKCgHQgLSDPgC8yKSA9IGNvcyjPieKCgHQpIiwiRC4gc2luKM+J4oKAdCArIM+AKSA9IGNvcyjPieKCgHQpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiQSBjb3NpbmUgZGVsYXllZCBieSA5MCBkZWdyZWVzIGJlY29tZXMgc2luZSwgc28gY29zKM+J4oKAdCAtIM+ALzIpID0gc2luKM+J4oKAdCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlIHNpZ24gaXMgd3Jvbmc7ICvPgC8yIGdpdmVzIC1zaW4oz4nigoB0KS4iLCJDIjoic2luKM+J4oKAdCAtIM+ALzIpIGVxdWFscyAtY29zKM+J4oKAdCksIG5vdCBjb3Moz4nigoB0KS4iLCJEIjoiQWRkaW5nIM+AIGNoYW5nZXMgdGhlIHNpZ24sIG5vdCBzaW5lIGludG8gY29zaW5lLiJ9LCJoaW50IjoiUmVtZW1iZXI6IHNpbmUgbGFncyBjb3NpbmUgYnkgOTAgZGVncmVlcy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHN0YXRlbWVudCBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gc2luKM+J4oKAdCkgbGVhZHMgY29zKM+J4oKAdCkgYnkgOTDCsCIsIkIuIGNvcyjPieKCgHQpIGxhZ3Mgc2luKM+J4oKAdCkgYnkgOTDCsCIsIkMuIHNpbijPieKCgHQpIGxhZ3MgY29zKM+J4oKAdCkgYnkgOTDCsCIsIkQuIHNpbijPieKCgHQpIGFuZCBjb3Moz4nigoB0KSBhcmUgYWx3YXlzIGluIHBoYXNlIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiQmVjYXVzZSBjb3Moz4nigoB0IC0gz4AvMikgPSBzaW4oz4nigoB0KSwgc2luZSBpcyB0aGUgZGVsYXllZCB2ZXJzaW9uIG9mIGNvc2luZSBieSA5MCBkZWdyZWVzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgcmV2ZXJzZXMgbGFnIGFuZCBsZWFkLiIsIkIiOiJDb3NpbmUgYWN0dWFsbHkgbGVhZHMgc2luZSBieSA5MCBkZWdyZWVzLiIsIkQiOiJUaGV5IGFyZSBzaGlmdGVkIGJ5IGEgcXVhcnRlciBjeWNsZSwgbm90IGFsaWduZWQuIn0sImhpbnQiOiJBc2sgd2hpY2ggd2F2ZWZvcm0gbXVzdCBiZSBzaGlmdGVkIHJpZ2h0IHRvIGdldCB0aGUgb3RoZXIuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6Im1hdHBsb3RsaWJfc2hpZnRlZF9zaW51c29pZHMiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImFkZGl0aW9uX29mX3NpbnVzb2lkcyIsImxhYmVsIjoiQ29tYmluaW5nIGEgY29zKM+J4oKAdCkgKyBiIHNpbijPieKCgHQpIGludG8gb25lIHNpbnVzb2lkIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXcml0ZSB4KHQpID0gMyBjb3Moz4nigoB0KSArIDQgc2luKM+J4oKAdCkgYXMgQyBjb3Moz4nigoB0ICsgzrgpLiBXaGljaCBwYWlyIGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBDID0gNSwgzrggPSA1My4xwrAiLCJCLiBDID0gNSwgzrggPSAtNTMuMcKwIiwiQy4gQyA9IDcsIM64ID0gLTUzLjHCsCIsIkQuIEMgPSAxLCDOuCA9IDM2LjnCsCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkhlcmUgYSA9IDMgYW5kIGIgPSA0LCBzbyBDID0g4oiaKDPCsiArIDTCsikgPSA1IGFuZCDOuCA9IHRhbuKBu8K5KC00LzMpID0gLTUzLjHCsC4gVGhlIG1pbnVzIHNpZ24gY29tZXMgZnJvbSB0aGUgZm9ybXVsYSB1c2luZyAtYi9hLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBtYWduaXR1ZGUgaXMgcmlnaHQsIGJ1dCB0aGUgcGhhc2Ugc2lnbiBpcyB3cm9uZy4iLCJDIjoiVGhlIGFtcGxpdHVkZSBpcyBub3QgYSArIGI7IGl0IGlzIOKImihhwrIgKyBiwrIpLiIsIkQiOiJOZWl0aGVyIHRoZSBhbXBsaXR1ZGUgbm9yIHRoZSBhbmdsZSBtYXRjaGVzIHRoZSBmb3JtdWxhcy4ifSwiaGludCI6IlVzZSBDID0g4oiaKGHCsitiwrIpIGZpcnN0LCB0aGVuIGNvbXB1dGUgzrggZnJvbSB0YW7igbvCuSgtYi9hKS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciB4KHQpID0gLTMgY29zKM+J4oKAdCkgKyA0IHNpbijPieKCgHQpLCB0aGUgY29ycmVjdCBzaW5nbGUtc2ludXNvaWQgZm9ybSBoYXMgd2hpY2ggYW1wbGl0dWRlIGFuZCBwcmluY2lwYWwgYW5nbGU/Iiwib3B0aW9ucyI6WyJBLiBDID0gNSwgzrggPSAtNTMuMcKwIiwiQi4gQyA9IDUsIM64ID0gLTEyNi45wrAiLCJDLiBDID0gMSwgzrggPSAxMjYuOcKwIiwiRC4gQyA9IDcsIM64ID0gLTEyNi45wrAiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJXaXRoIGEgPSAtMyBhbmQgYiA9IDQsIEMgPSA1IGFuZCDOuCA9IHRhbuKBu8K5KC00Ly0zKS4gVGhlIHJhdGlvIGFsb25lIHN1Z2dlc3RzIDUzLjHCsCwgYnV0IHRoZSBwb2ludCBsaWVzIGluIHRoZSB0aGlyZCBxdWFkcmFudCBmb3IgYSAtIGpiID0gLTMgLSBqNCwgc28gdGhlIHByaW5jaXBhbCBhbmdsZSBpcyAtMTI2LjnCsC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIGlnbm9yZXMgdGhlIHF1YWRyYW50IGFuZCB1c2VzIHRoZSB3cm9uZyBhbmdsZS4iLCJDIjoiVGhlIGFtcGxpdHVkZSBpcyA1LCBub3QgMS4iLCJEIjoiVGhlIGFtcGxpdHVkZSBtdXN0IGJlIOKImigoLTMpwrIrNMKyKSA9IDUsIG5vdCA3LiJ9LCJoaW50IjoiQ2hlY2sgdGhlIHNpZ25zIG9mIGEgYW5kIC1iIHRvIGNob29zZSB0aGUgY29ycmVjdCBxdWFkcmFudC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoicGhhc29yX3F1YWRyYW50X2RpYWdyYW0iLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImNvbmNlcHR1YWxfc2hvcnRfYW5zd2VyIiwibGFiZWwiOiJXaHkgcGhhc29ycyBhbmQgY29tcGxleCBudW1iZXJzIGhlbHAiLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3A0X3ExIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJJbiBvbmUgb3IgdHdvIHNlbnRlbmNlcywgZXhwbGFpbiB3aHkgdGhlIGNvbXBsZXggbnVtYmVyIGEgLSBqYiBpcyB1c2VmdWwgd2hlbiByZXdyaXRpbmcgYSBjb3Moz4nigoB0KSArIGIgc2luKM+J4oKAdCkgYXMgYSBzaW5nbGUgc2ludXNvaWQuIiwiaWRlYWxfYW5zd2VyIjoiVGhlIHBvaW50IGEgLSBqYiBzdG9yZXMgdGhlIGNvc2luZSBjb2VmZmljaWVudCBhbmQgc2luZSBjb2VmZmljaWVudCBpbiBvbmUgb2JqZWN0LiBJdHMgbWFnbml0dWRlIGdpdmVzIHRoZSBjb21iaW5lZCBhbXBsaXR1ZGUgQywgYW5kIGl0cyBhbmdsZSBnaXZlcyB0aGUgcGhhc2Ugzrggb2YgdGhlIGVxdWl2YWxlbnQgc2luZ2xlIHNpbnVzb2lkLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3QgbWVudGlvbiB0aGF0IGEgLSBqYiBwYWNrYWdlcyB0aGUgdHdvIGNvZWZmaWNpZW50cyB0b2dldGhlciIsIk11c3Qgc3RhdGUgdGhhdCBtYWduaXR1ZGUgZ2l2ZXMgQyIsIk11c3Qgc3RhdGUgdGhhdCBhbmdsZSBnaXZlcyDOuCJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQgc2VlcyBwaGFzb3JzIGFzIG1vcmUgdGhhbiBhIGZvcm11bGEgdHJpY2suIiwiaGludCI6IlRoaW5rIG9mIGEgLSBqYiBhcyBhIHBvaW50IG9yIHZlY3RvciBpbiB0aGUgcGxhbmUuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfV19" style="display:none;"></div>%%KC_END%%
