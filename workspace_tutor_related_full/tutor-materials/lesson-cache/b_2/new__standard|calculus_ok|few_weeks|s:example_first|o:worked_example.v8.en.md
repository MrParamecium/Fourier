# B.2 Sinusoids

> **Section Objective:** Learn to read a sinusoid's parameters, interpret phase as a time shift, and compress a cosine-plus-sine expression into a single sinusoid.

---

Consider x(t) = 3 cos(2π·50t − 30°). At a glance, this tells you the signal repeats 50 times per second, has a peak value of 3, and starts slightly late compared to a plain cosine. This section teaches you to extract exactly that information from any sinusoid.

We will also tackle a common exam task: collapsing an expression like a cos(ω₀t) + b sin(ω₀t) into one clean sinusoid. To do that, we borrow a bookkeeping trick from complex numbers and phasors — think of it as a compact shorthand, not a deep detour.

### PREREQUISITES CHECK

Cosine and sine are periodic waves. Phase is a horizontal shift. Complex numbers will appear only as a calculation tool.

> **Exam Relevance:** Identifying amplitude, period, and phase — and combining sinusoids — appears on nearly every signals exam.

$$x(t)=C\cos(2\pi f_0 t+\theta)=C\cos(\omega_0 t+\theta),\qquad T_0=\frac{1}{f_0}=\frac{2\pi}{\omega_0},\qquad \omega_0=2\pi f_0$$
*Each symbol carries one specific job: **C** is the amplitude (peak value, always positive), **f₀** is the frequency in hertz (cycles per second), **T₀** is the period (seconds per cycle), **ω₀** is the radian frequency (radians per second), and **θ** is the phase shift (the horizontal offset of the wave). A critical warning: never mix degrees and radians inside the same problem — pick one unit for θ and stay consistent throughout all calculations.*

![Fig. B.6](/figures/page-017-fig__b_6-1.png)
*This figure shows cosine, sine, and a phase-shifted cosine side by side, making it clear that a phase shift is simply a horizontal slide of the waveform along the time axis.*

## 1. Reading and Sketching Sinusoids

Take x(t) = C cos(ω₀t − 60°). The −60° inside the cosine tells you the wave is **delayed** — its peak arrives later than a plain cosine's peak.

### GENERAL RULE

One full cycle spans 360° (or 2π radians). A 60° phase shift is therefore **one-sixth of a full cycle**.

- **Negative phase** inside cosine → delay → graph shifts **right**
- **Positive phase** inside cosine → lead → graph shifts **left**

### COSINE-SINE IDENTITY

The exact relationship between cosine and sine is:

C cos(ω₀t − π/2) = C sin(ω₀t)

In words: sine is just cosine delayed by a quarter cycle (90°).

### MINI WORKED EXAMPLE

Suppose T₀ = 12 ms and the phase is −60°. The time delay is:

delay = (60°/360°) × T₀ = (1/6) × 12 ms = **2 ms**

The peak of x(t) appears 2 ms later than the peak of C cos(ω₀t).

### EXAM TIP

> The most common mistake is confusing the phase angle with the time shift. Always convert: time shift = (|θ| / 360°) × T₀.

$$C\cos(\omega_0 t-\pi/2)=C\sin(\omega_0 t),\qquad C\sin(\omega_0 t+\pi/2)=C\cos(\omega_0 t)$$
*These two identities encode the **lead-lag relationship** between cosine and sine. Sine **lags** cosine by 90°: the sine wave's peak arrives a quarter cycle after the cosine peak. Equivalently, cosine **leads** sine by 90°: the cosine peak arrives a quarter cycle earlier. Exam questions frequently ask which signal leads and which lags — always anchor your answer to these identities and use the words 'lead' and 'lag' precisely.*

![unknown](/figures/page-018-unknown-1.png)
*The complex-plane diagram shows how the pair (a, −b) maps to a magnitude C and angle θ, which is precisely the amplitude and phase we need when combining a cosine term and a sine term into one sinusoid.*

## 2. Adding a Cosine and a Sine into One Sinusoid

Start with a concrete example:

x(t) = cos(ω₀t) − √3 sin(ω₀t)

This looks complicated, but it is a single sinusoid in disguise. The general rule is:

a cos(ω₀t) + b sin(ω₀t) = C cos(ω₀t + θ)

### STEP-BY-STEP WORKED EXAMPLE

**Given:** x(t) = cos(ω₀t) − √3 sin(ω₀t)

**Step 1 — Identify a and b.**
Here a = 1 (coefficient of cosine) and b = −√3 (coefficient of sine).

**Step 2 — Compute the amplitude C.**

C = √(a² + b²) = √(1² + (−√3)²) = √(1 + 3) = **2**

**Step 3 — Compute the phase θ.**

θ = tan⁻¹(−b/a) = tan⁻¹(−(−√3)/1) = tan⁻¹(√3) = **60°**

**Step 4 — Write the result.**

x(t) = 2 cos(ω₀t + 60°)

### WHY THE SIGNS WORK

The textbook convention treats the pair (a, −b) as a point in the complex plane: horizontal coordinate a, vertical coordinate −b. The distance from the origin is C and the angle is θ. Think of it like plotting a point on a grid — no deep complex-number theory required.

### COMMON MISTAKE

> When computing θ = tan⁻¹(−b/a), a calculator gives an angle in the range −90° to 90°. If the point (a, −b) lies in the second or third quadrant, you must add or subtract 180° to land in the correct quadrant. Never trust the raw arctangent output without checking the quadrant.

![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*The phasor diagrams show visually how two same-frequency sinusoids combine into one sinusoid with a new amplitude and phase, making the vector addition of phasors a powerful shortcut.*

---
**📌 Key Takeaways**
- In x(t) = C cos(ω₀t + θ): C is amplitude, f₀ is frequency, T₀ is period, θ is phase shift.
- Negative phase means delay (right shift); sine lags cosine by exactly 90 degrees.
- Combine a cos(ω₀t) + b sin(ω₀t) into C cos(ω₀t + θ) using C = √(a²+b²) and θ = tan⁻¹(−b/a), checking the quadrant.

*In the next section we will build on this sinusoid and phasor viewpoint.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InNpbnVzb2lkX3BhcmFtZXRlcnMiLCJsYWJlbCI6IkFtcGxpdHVkZSwgcGVyaW9kLCBmcmVxdWVuY3ksIHJhZGlhbiBmcmVxdWVuY3ksIGFuZCBwaGFzZSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHgodCkgPSA0IGNvcygxMDDPgHQgLSAzMMKwKSwgd2hpY2ggc3RhdGVtZW50IGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBBbXBsaXR1ZGUgPSAxMDDPgCwgZnJlcXVlbmN5ID0gNTAgSHosIHBoYXNlID0gLTMwwrAiLCJCLiBBbXBsaXR1ZGUgPSA0LCBmcmVxdWVuY3kgPSA1MCBIeiwgcGhhc2UgPSAtMzDCsCIsIkMuIEFtcGxpdHVkZSA9IDQsIGZyZXF1ZW5jeSA9IDEwMM+AIEh6LCBwaGFzZSA9IDMwwrAiLCJELiBBbXBsaXR1ZGUgPSA0LCBwZXJpb2QgPSAxMDDPgCBzLCBwaGFzZSA9IC0zMMKwIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIGFtcGxpdHVkZSBpcyB0aGUgY29lZmZpY2llbnQgNC4gU2luY2Ugz4nigoAgPSAxMDDPgCwgdGhlIGZyZXF1ZW5jeSBpcyBm4oKAID0gz4nigoAvKDLPgCkgPSA1MCBIei4gVGhlIHBoYXNlIGlzIHRoZSBjb25zdGFudCBhbmdsZSAtMzDCsC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiIxMDDPgCBpcyByYWRpYW4gZnJlcXVlbmN5LCBub3QgYW1wbGl0dWRlLiIsIkMiOiIxMDDPgCBpcyBub3QgdGhlIGhlcnR6IGZyZXF1ZW5jeSwgYW5kIHRoZSBwaGFzZSBzaWduIGNoYW5nZWQgaW5jb3JyZWN0bHkuIiwiRCI6IlRoZSBwZXJpb2QgaXMgMS81MCBzLCBub3QgMTAwz4Agcy4ifSwiaGludCI6IlNlcGFyYXRlIGNvZWZmaWNpZW50LCB0aW1lLXZhcnlpbmcgYW5ndWxhciB0ZXJtLCBhbmQgY29uc3RhbnQgcGhhc2UgdGVybS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgc2ludXNvaWQgaGFzIHBlcmlvZCBU4oKAID0gMiBtcy4gV2hhdCBpcyBpdHMgZnJlcXVlbmN5PyIsIm9wdGlvbnMiOlsiQS4gMiBIeiIsIkIuIDIwMCBIeiIsIkMuIDUwMCBIeiIsIkQuIDEwMDAgSHoiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJGcmVxdWVuY3kgaXMgdGhlIHJlY2lwcm9jYWwgb2YgcGVyaW9kOiBm4oKAID0gMS9U4oKAID0gMS8wLjAwMiA9IDUwMCBIei4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIGlnbm9yZXMgdGhlIG1pbGxpc2Vjb25kIGNvbnZlcnNpb24uIiwiQiI6IlRoaXMgaXMgbm90IHRoZSByZWNpcHJvY2FsIG9mIDAuMDAyIHMuIiwiRCI6IlRoYXQgd291bGQgY29ycmVzcG9uZCB0byBhIDEgbXMgcGVyaW9kLiJ9LCJoaW50IjoiQ29udmVydCBtaWxsaXNlY29uZHMgdG8gc2Vjb25kcyBmaXJzdC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InBoYXNlX3NoaWZ0X2FuZF9sZWFkX2xhZyIsImxhYmVsIjoiUGhhc2Ugc2hpZnQgYXMgdGltZSBzaGlmdDsgc2luZS1jb3NpbmUgbGVhZCBhbmQgbGFnIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBzdGF0ZW1lbnQgaXMgdHJ1ZT8iLCJvcHRpb25zIjpbIkEuIHNpbijPieKCgHQpIGxlYWRzIGNvcyjPieKCgHQpIGJ5IDkwwrAiLCJCLiBjb3Moz4nigoB0KSBsYWdzIHNpbijPieKCgHQpIGJ5IDkwwrAiLCJDLiBzaW4oz4nigoB0KSBsYWdzIGNvcyjPieKCgHQpIGJ5IDkwwrAiLCJELiBzaW4oz4nigoB0KSBhbmQgY29zKM+J4oKAdCkgYXJlIGFsd2F5cyBpbiBwaGFzZSJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IkJlY2F1c2UgY29zKM+J4oKAdCDiiJIgz4AvMikgPSBzaW4oz4nigoB0KSwgdGhlIHNpbmUgd2F2ZSBhcHBlYXJzIGFmdGVyIHRoZSBjb3NpbmUgYnkgYSBxdWFydGVyIGN5Y2xlLCBzbyBzaW5lIGxhZ3MgY29zaW5lIGJ5IDkwwrAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyByZXZlcnNlcyB0aGUgZGlyZWN0aW9uIG9mIHRoZSBwaGFzZSByZWxhdGlvbnNoaXAuIiwiQiI6IkNvc2luZSBsZWFkcyByYXRoZXIgdGhhbiBsYWdzIHNpbmUuIiwiRCI6IlRoZXkgZGlmZmVyIGJ5IGEgcXVhcnRlciBjeWNsZS4ifSwiaGludCI6IlJlbWVtYmVyIHRoZSBxdWFydGVyLWN5Y2xlIHNoaWZ0IHJlbGF0aW9uc2hpcC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIHgodCkgPSBDIGNvcyjPieKCgHQgLSA2MMKwKSwgaG93IGlzIGl0IG9idGFpbmVkIGZyb20gQyBjb3Moz4nigoB0KT8iLCJvcHRpb25zIjpbIkEuIFNoaWZ0IGxlZnQgYnkgb25lLXNpeHRoIG9mIGEgcGVyaW9kIiwiQi4gU2hpZnQgcmlnaHQgYnkgb25lLXNpeHRoIG9mIGEgcGVyaW9kIiwiQy4gU2hpZnQgcmlnaHQgYnkgb25lLXF1YXJ0ZXIgb2YgYSBwZXJpb2QiLCJELiBObyBzaGlmdDsgb25seSBhbXBsaXR1ZGUgY2hhbmdlcyJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkEgbmVnYXRpdmUgcGhhc2UgaW5zaWRlIHRoZSBjb3NpbmUgY29ycmVzcG9uZHMgdG8gYSBkZWxheSwgc28gdGhlIGdyYXBoIHNoaWZ0cyB0byB0aGUgcmlnaHQuIFNpbmNlIDYwwrAgaXMgMS82IG9mIDM2MMKwLCB0aGUgZGVsYXkgaXMgVOKCgC82LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkxlZnQgc2hpZnQgd291bGQgY29ycmVzcG9uZCB0byBhIHBvc2l0aXZlIHBoYXNlLiIsIkMiOiJPbmUtcXVhcnRlciBwZXJpb2QgY29ycmVzcG9uZHMgdG8gOTDCsCwgbm90IDYwwrAuIiwiRCI6IlRoZSBwaGFzZSBjaGFuZ2VzIHRoZSBob3Jpem9udGFsIHBvc2l0aW9uLiJ9LCJoaW50IjoiTmVnYXRpdmUgcGhhc2UgbWVhbnMgZGVsYXkuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6IndhdmVmb3JtX3NoaWZ0X3VzaW5nX3RleHRib29rX3N0eWxlIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJhZGRpdGlvbl9vZl9zaW51c29pZHMiLCJsYWJlbCI6IkNvbWJpbmUgYSBjb3MgdGVybSBhbmQgYSBzaW4gdGVybSBpbnRvIG9uZSBzaW51c29pZCIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRXhwcmVzcyB4KHQpID0gMyBjb3Moz4nigoB0KSArIDQgc2luKM+J4oKAdCkgaW4gdGhlIGZvcm0gQyBjb3Moz4nigoB0ICsgzrgpLiBXaGljaCBwYWlyIGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBDID0gNSwgzrggPSA1My4xwrAiLCJCLiBDID0gNSwgzrggPSAtNTMuMcKwIiwiQy4gQyA9IDcsIM64ID0gLTUzLjHCsCIsIkQuIEMgPSAxLCDOuCA9IDUzLjHCsCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkhlcmUgYSA9IDMgYW5kIGIgPSA0LiBVc2luZyB0aGUgZm9ybXVsYSBDID0g4oiaKGHCsiArIGLCsikgPSDiiJooOSArIDE2KSA9IDUgYW5kIM64ID0gdGFu4oG7wrko4oiSYi9hKSA9IHRhbuKBu8K5KOKIkjQvMykgPSDiiJI1My4xwrAuIFRoZSBwb2ludCAoYSwg4oiSYikgPSAoMywg4oiSNCkgaXMgaW4gdGhlIGZvdXJ0aCBxdWFkcmFudCwgY29uZmlybWluZyDOuCBpcyBuZWdhdGl2ZS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGUgYW1wbGl0dWRlIGlzIHJpZ2h0LCBidXQgdGhlIHBoYXNlIHNpZ24gaXMgd3JvbmcgZm9yIHRoaXMgY29udmVudGlvbi4iLCJDIjoiQyBpcyBub3QgdGhlIHN1bSBvZiBjb2VmZmljaWVudHMuIiwiRCI6Ik5laXRoZXIgYW1wbGl0dWRlIG5vciBwaGFzZSBpcyBjb3JyZWN0LiJ9LCJoaW50IjoiVXNlIEMgPSDiiJooYcKyK2LCsikgYW5kIM64ID0gdGFu4oG7wrko4oiSYi9hKS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IlJld3JpdGUgeCh0KSA9IC0zIGNvcyjPieKCgHQpICsgNCBzaW4oz4nigoB0KSBhcyBDIGNvcyjPieKCgHQgKyDOuCkuIFNob3cgdGhlIGtleSBzdGVwcyBhbmQgY2hvb3NlIHRoZSBjb3JyZWN0IHF1YWRyYW50IGZvciDOuC4iLCJpZGVhbF9hbnN3ZXIiOiJJZGVudGlmeSBhID0gLTMgYW5kIGIgPSA0LiBUaGVuIEMgPSDiiJooKC0zKcKyICsgNMKyKSA9IDUuIE5leHQgzrggPSB0YW7igbvCuSjiiJJiL2EpID0gdGFu4oG7wrko4oiSNC/iiJIzKSA9IHRhbuKBu8K5KDQvMyksIGJ1dCBiZWNhdXNlIGEgPCAwIGFuZCDiiJJiIDwgMCwgdGhlIHBvaW50IChhLCDiiJJiKSA9ICjiiJIzLCDiiJI0KSBpcyBpbiB0aGUgdGhpcmQgcXVhZHJhbnQsIHNvIM64ID0g4oiSMTI2LjnCsCAoZXF1aXZhbGVudGx5IDIzMy4xwrApLiBUaGVyZWZvcmUgeCh0KSA9IDUgY29zKM+J4oKAdCDiiJIgMTI2LjnCsCkuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBpZGVudGlmeSBhID0gLTMgYW5kIGIgPSA0IiwiTXVzdCBjb21wdXRlIEMgPSA1IGNvcnJlY3RseSIsIk11c3QgYWRkcmVzcyBxdWFkcmFudCwgbm90IGp1c3QgcXVvdGUgYXJjdGFuZ2VudCBvdXRwdXQiLCJNdXN0IGdpdmUgzrggPSAtMTI2LjnCsCBvciBhbiBlcXVpdmFsZW50IGFuZ2xlIiwiTXVzdCB3cml0ZSB0aGUgZmluYWwgc2luZ2xlLXNpbnVzb2lkIGZvcm0gY29ycmVjdGx5Il0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCBjYW4gZG8gdGhlIGZ1bGwgY29udmVyc2lvbiBhbmQgYXZvaWQgdGhlIGNvbW1vbiBpbnZlcnNlLXRhbmdlbnQgcXVhZHJhbnQgdHJhcC4iLCJoaW50IjoiVXNlIHRoZSBwb2ludCAoYSwg4oiSYikgaW4gdGhlIGNvbXBsZXggcGxhbmUgb3IgcGhhc29yIGRpYWdyYW0gdG8gY2hvb3NlIHRoZSBxdWFkcmFudC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoicGhhc29yX29yX2NvbXBsZXhfcGxhbmVfcXVhZHJhbnRfZGlhZ3JhbSIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfV19" style="display:none;"></div>%%KC_END%%
