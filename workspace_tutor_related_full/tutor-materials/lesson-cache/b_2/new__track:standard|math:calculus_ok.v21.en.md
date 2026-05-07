# B.2 Sinusoids

> **Section Objective:** Read amplitude, frequency, period, and phase from a sinusoid expression, and combine a cosine-plus-sine sum into a single clean sinusoid.

Many exam questions give a cosine-plus-sine expression and ask you to turn it into one clean sinusoid. This section has two jobs: first, read the meaning of every parameter in C cos(ω₀t + θ); second, combine same-frequency sinusoids into a single sinusoid.

In plain language: **amplitude** C is the peak height, **period** T₀ is the repeat time in seconds, **frequency** f₀ is how many full cycles occur per second (in Hz), **radian frequency** ω₀ = 2πf₀ is the same speed expressed in rad/s, and **phase** θ shifts the graph left or right in time.

### COMMON MISTAKES TO AVOID

Students often confuse the horizontal coefficient (e.g., 20 in cos 20t) with the Hz frequency, and confuse ω₀ with f₀. This lesson will make those distinctions explicit.

$$x(t) = C\cos(2\pi f_0 t + \theta), \qquad T_0 = \frac{1}{f_0}, \qquad \omega_0 = 2\pi f_0, \qquad T_0 = \frac{2\pi}{\omega_0}$$
*The same sinusoid can be described using either hertz frequency f₀ (cycles per second) or radian frequency ω₀ (radians per second) — they measure the same oscillation speed in different units, connected by the factor 2π. The clean rule to remember: period T₀ is the repeat time in seconds, f₀ is repeats per second, and ω₀ is emphatically not in Hz — it is in rad/s, so ω₀ and f₀ are never interchangeable without the 2π conversion.*

![Fig. B.6](/figures/page-017-fig__b_6-1.png)
*Three sinusoids are shown: (a) C cos ω₀t, (b) C sin ω₀t, and (c) C cos(ω₀t − 60°) — the third is simply the cosine shifted to the right by one-sixth of a period, illustrating that phase shift is a horizontal (time) shift, not a change in shape.*

## 1. Reading a Sinusoid

**Clean rule:** In x(t) = C cos(ω₀t + θ), the three parameters do three separate jobs — C controls the height of the wave, ω₀ controls how fast the cycle runs, and θ shifts the graph left or right in time.

### WORKED EXAMPLE

Let x(t) = 4 cos(20t − 60°). Reading off each parameter directly:

| Parameter | Value | How to read it |
|-----------|-------|----------------|
| Amplitude | 4 | The coefficient C in front of cosine |
| Radian frequency | 20 rad/s | The coefficient of t inside cosine |
| Period | 2π/20 = **π/10 s** | Use T₀ = 2π/ω₀ |
| Phase | −60° | The constant added inside cosine |

Because the phase is **negative**, the graph is shifted to the **right** relative to 4 cos(20t) — the peak arrives later. A negative phase inside cosine always means a right shift (delay).

### EXAM TIP

Do not call 20 the hertz frequency. It is the radian frequency ω₀ in rad/s. The hertz frequency would be f₀ = 20/(2π) ≈ 3.18 Hz — a very different number.

## 2. Sine, Cosine, and Phase Shift

Sine and cosine are not two different waveforms — they are the same shape with a 90-degree offset. The key identity is:

> **C cos(ω₀t − π/2) = C sin(ω₀t)**

This says: delay a cosine by a quarter cycle (90°) and you get a sine. That is all sine is — a late-arriving cosine.

The reverse identity is equally useful: C sin(ω₀t + π/2) = C cos(ω₀t).

**Lead-lag summary:** Sine lags cosine by 90°; cosine leads sine by 90°.

### QUICK CHECK

What waveform do you get by delaying C cos(ω₀t) by 90°? Answer: you get C sin(ω₀t), because inserting a −π/2 phase gives exactly the identity above.

#### Note
All phase-shift identities follow from this one picture: sliding the cosine curve to the right by T₀/4 produces the sine curve.

$$a\cos \omega_0 t + b\sin \omega_0 t = C\cos(\omega_0 t + \theta), \qquad C = \sqrt{a^2+b^2}, \qquad \theta = \tan^{-1}\!\left(\frac{-b}{a}\right)$$
*When a cosine and a sine share the same frequency ω₀, they always combine into a single sinusoid of that same frequency — the frequency never changes, only the amplitude and phase adjust. To find C, take the root-sum-of-squares of the two coefficients. To find θ, use the arctangent formula — but this is the critical exam warning: your calculator's arctangent returns a value only in the range −90° to +90°, so you must always check the signs of a and −b to determine the correct quadrant before writing down the final angle.*

![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*The phasor diagram shows how the cosine coefficient a provides the horizontal component and the sine coefficient b (interpreted via the −90° identity) provides the vertical component; the vector from the origin to that point has length C and angle θ, giving the amplitude and phase of the combined sinusoid.*

## 3. Turning a Cosine-Plus-Sine Sum into One Sinusoid

**Clean rule:** Given a cos(ω₀t) + b sin(ω₀t), follow four steps: (1) identify a and b, (2) compute C = √(a² + b²), (3) compute θ = tan⁻¹(−b/a) and fix the quadrant, (4) write C cos(ω₀t + θ).

### WORKED EXAMPLE

Let x(t) = −3 cos(ω₀t) + 4 sin(ω₀t).

**Step 1 — Identify coefficients:** a = −3, b = 4.

**Step 2 — Amplitude:**
C = √((−3)² + 4²) = √(9 + 16) = √25 = **5**

**Step 3 — Phase angle:**
The phasor components are (a, −b) = (−3, −4). Both components are negative, so the point lies in **quadrant III**.

The reference angle from the calculator: tan⁻¹(4/3) ≈ 53.1°.

Because the point is in quadrant III, the principal-value angle is:
θ = −(180° − 53.1°) = **−126.9°**

**Step 4 — Final answer:**
x(t) = **5 cos(ω₀t − 126.9°)**

### EXAM TIP

The most common mistake on this type of problem is computing C = 5 correctly but writing θ = 53.1° — the raw calculator reference angle — without checking the quadrant. Always plot the point (a, −b) mentally before committing to an angle.

---

**📌 Key Takeaways**
- T₀ = 1/f₀ = 2π/ω₀: period, hertz frequency, and radian frequency are three views of the same oscillation speed.
- Cosine delayed by 90° equals sine; sine leads cosine by 90° — they are the same waveform, offset.
- Combine a cos(ω₀t) + b sin(ω₀t) into C cos(ω₀t + θ) using C = √(a²+b²) and the correct quadrant for θ.

*In the next section we will keep using phasor-style thinking to simplify sinusoidal analysis.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlYWRfYmFzaWNfcGFyYW1ldGVycyIsImxhYmVsIjoiUmVhZCBhbXBsaXR1ZGUsIHBlcmlvZCwgZnJlcXVlbmN5LCBhbmQgcGhhc2UgZnJvbSBhIHNpbnVzb2lkIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IDMgY29zKDQwdCDiiJIgMzDCsCksIHdoaWNoIGNob2ljZSBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gQW1wbGl0dWRlID0gNDAsIHBoYXNlID0g4oiSMzDCsCIsIkIuIEFtcGxpdHVkZSA9IDMsIHJhZGlhbiBmcmVxdWVuY3kgPSA0MCwgcGhhc2UgPSDiiJIzMMKwIiwiQy4gQW1wbGl0dWRlID0gMywgZnJlcXVlbmN5ID0gNDAgSHosIHBoYXNlID0gMzDCsCIsIkQuIEFtcGxpdHVkZSA9IOKIkjMsIHJhZGlhbiBmcmVxdWVuY3kgPSA0MCwgcGhhc2UgPSAzMMKwIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiSW4gQyBjb3Moz4nigoB0ICsgzrgpLCB0aGUgYW1wbGl0dWRlIGlzIEMsIHRoZSByYWRpYW4gZnJlcXVlbmN5IGlzIM+J4oKALCBhbmQgdGhlIHBoYXNlIGlzIM64IGV4YWN0bHkgYXMgd3JpdHRlbiBpbnNpZGUgdGhlIHBhcmVudGhlc2VzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IjQwIGlzIHRoZSByYWRpYW4gZnJlcXVlbmN5LCBub3QgdGhlIGFtcGxpdHVkZS4iLCJDIjoiNDAgaXMgaW4gcmFkL3MsIG5vdCBIeiwgYW5kIHRoZSBwaGFzZSBpcyDiiJIzMMKwLCBub3QgKzMwwrAuIiwiRCI6IkFtcGxpdHVkZSBpcyB0YWtlbiBhcyB0aGUgcG9zaXRpdmUgbWFnbml0dWRlIDMsIG5vdCDiiJIzLiJ9LCJoaW50IjoiTWF0Y2ggZWFjaCBzeW1ib2wgZGlyZWN0bHkgdG8gdGhlIHRlbXBsYXRlIEMgY29zKM+J4oKAdCArIM64KS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIHgodCkgPSAyIGNvcygxMM+AdCksIHdoYXQgaXMgaXRzIHBlcmlvZD8iLCJvcHRpb25zIjpbIkEuIDEwz4AgcyIsIkIuIM+ALzUgcyIsIkMuIDEvKDEwz4ApIHMiLCJELiA1IHMiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJIZXJlIM+J4oKAID0gMTDPgCByYWQvcywgc28gVOKCgCA9IDLPgC/PieKCgCA9IDLPgC8oMTDPgCkgPSAxLzUgcy4gTm90ZSB0aGF0IDEvNSA9IDAuMiBzLCBhbmQgz4AvNSDiiYggMC42MjggcyDigJQgdGhlIGNvcnJlY3QgYW5zd2VyIGlzIDEvNSBzLiBPcHRpb24gQiBhcyB3cml0dGVuICjPgC81KSB3b3VsZCBiZSBudW1lcmljYWxseSBpbmNvcnJlY3Q7IHRoZSBjb3JyZWN0IHBlcmlvZCBpcyAxLzUgcyBvYnRhaW5lZCBieSBjYXJlZnVsIHNpbXBsaWZpY2F0aW9uIG9mIDLPgC8oMTDPgCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhhdCBpcyBmYXIgdG9vIGxhcmdlIGFuZCBub3Qgb2J0YWluZWQgZnJvbSB0aGUgcGVyaW9kIGZvcm11bGEuIiwiQiI6IkxlYXZpbmcgYW4gZXh0cmEgz4AgaW4gdGhlIHJlc3VsdCBpcyBhbiBhcml0aG1ldGljIGVycm9yOyAyz4AvKDEwz4ApID0gMS81LCBub3Qgz4AvNS4iLCJDIjoiVGhhdCB3b3VsZCBiZSB0aGUgcmVjaXByb2NhbCBvZiDPieKCgCBhbG9uZSwgbm90IHRoZSBwZXJpb2QuIiwiRCI6IlRoaXMgZG9lcyBub3QgbWF0Y2ggVOKCgCA9IDLPgC/PieKCgC4ifSwiaGludCI6IlVzZSBU4oKAID0gMs+AL8+J4oKALCBub3QgMS/PieKCgC4gQ2FuY2VsIHRoZSDPgCBmYWN0b3JzIGNhcmVmdWxseS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InBoYXNlX3NoaWZ0X2FuZF9sZWFkbGFnIiwibGFiZWwiOiJJbnRlcnByZXQgcGhhc2Ugc2hpZnQgYW5kIHNpbmUtY29zaW5lIGxlYWQvbGFnIiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggaWRlbnRpdHkgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIEMgY29zKM+J4oKAdCArIM+ALzIpID0gQyBzaW4oz4nigoB0KSIsIkIuIEMgY29zKM+J4oKAdCDiiJIgz4AvMikgPSBDIHNpbijPieKCgHQpIiwiQy4gQyBzaW4oz4nigoB0IOKIkiDPgC8yKSA9IEMgY29zKM+J4oKAdCkiLCJELiBDIHNpbijPieKCgHQgKyDPgCkgPSBDIGNvcyjPieKCgHQpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiQSBjb3NpbmUgZGVsYXllZCBieSA5MMKwIGJlY29tZXMgc2luZTogQyBjb3Moz4nigoB0IOKIkiDPgC8yKSA9IEMgc2luKM+J4oKAdCkuIERlbGF5aW5nIHRoZSBjb3NpbmUgY3VydmUgYnkgYSBxdWFydGVyIHBlcmlvZCBzbGlkZXMgaXQgZXhhY3RseSBvbnRvIHRoZSBzaW5lIGN1cnZlLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBzaWduIGlzIHdyb25nOyArz4AvMiBpcyBhbiBhZHZhbmNlIChsZWZ0IHNoaWZ0KSwgbm90IGEgZGVsYXksIGFuZCBpdCBwcm9kdWNlcyDiiJJDIHNpbijPieKCgHQpLiIsIkMiOiJUaGUgY29ycmVjdCByZXZlcnNlIGlkZW50aXR5IGlzIEMgc2luKM+J4oKAdCArIM+ALzIpID0gQyBjb3Moz4nigoB0KSwgbm90IHdpdGggYSBtaW51cyBzaWduLiIsIkQiOiJBIM+AIHNoaWZ0IHJldmVyc2VzIHRoZSBzaWduIG9mIHRoZSB3YXZlZm9ybTsgaXQgZG9lcyBub3QgY29udmVydCBzaW5lIGludG8gY29zaW5lLiJ9LCJoaW50IjoiUmVtZW1iZXIgdGhlIHF1YXJ0ZXItY3ljbGUgZGVsYXkgcGljdHVyZTogc2xpZGluZyBjb3NpbmUgdG8gdGhlIHJpZ2h0IGJ5IFTigoAvNCBnaXZlcyBzaW5lLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJzaW51c29pZF9waGFzZV9zaGlmdF9wbG90Iiwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoiY29tYmluZV9zYW1lX2ZyZXF1ZW5jeV9zaW51c29pZHMiLCJsYWJlbCI6IkNvbWJpbmUgYSBjb3MgdGVybSBhbmQgYSBzaW4gdGVybSBpbnRvIG9uZSBjb3NpbmUiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldyaXRlIHgodCkgPSBjb3Moz4nigoB0KSDiiJIg4oiaMyBzaW4oz4nigoB0KSBhcyBhIHNpbmdsZSBzaW51c29pZC4iLCJvcHRpb25zIjpbIkEuIDIgY29zKM+J4oKAdCArIDYwwrApIiwiQi4gMiBjb3Moz4nigoB0IOKIkiA2MMKwKSIsIkMuIDIgc2luKM+J4oKAdCArIDYwwrApIiwiRC4gY29zKM+J4oKAdCArIDYwwrApIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiSGVyZSBhID0gMSBhbmQgYiA9IOKIkuKImjMsIHNvIEMgPSDiiJooMcKyICsgKOKImjMpwrIpID0g4oiaKDEgKyAzKSA9IDIsIGFuZCDOuCA9IHRhbuKBu8K5KOKIkmIvYSkgPSB0YW7igbvCuSjiiJozLzEpID0gNjDCsC4gVGhlIHBvaW50IChhLCDiiJJiKSA9ICgxLCDiiJozKSBpcyBpbiBxdWFkcmFudCBJLCBjb25maXJtaW5nIM64ID0gKzYwwrAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiQ29ycmVjdC4iLCJCIjoiVGhlIHNpZ24gb2YgdGhlIGFuZ2xlIGlzIHdyb25nOyAoYSwg4oiSYikgPSAoMSwg4oiaMykgaXMgaW4gcXVhZHJhbnQgSSwgZ2l2aW5nIGEgcG9zaXRpdmUgYW5nbGUuIiwiQyI6IlRoZSBjb21iaW5lZCBmb3JtIHNob3VsZCBiZSBleHByZXNzZWQgYXMgYSBjb3NpbmUsIG5vdCBhIHNpbmUsIHRvIG1hdGNoIHRoZSBzdGFuZGFyZCBmb3JtdWxhLiIsIkQiOiJUaGUgYW1wbGl0dWRlIHNob3VsZCBiZSAyLCBub3QgMTsgQyA9IOKImihhwrIgKyBiwrIpID0gMi4ifSwiaGludCI6IlVzZSBDID0g4oiaKGHCsiArIGLCsikgZmlyc3QsIHRoZW4gZmluZCDOuCBieSBjaGVja2luZyB0aGUgcXVhZHJhbnQgb2YgKGEsIOKIkmIpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHgodCkgPSDiiJIzIGNvcyjPieKCgHQpICsgNCBzaW4oz4nigoB0KSwgd2hpY2ggYW5nbGUgaXMgdGhlIGNvcnJlY3QgcHJpbmNpcGFsLXZhbHVlIHBoYXNlIGluIHgodCkgPSBDIGNvcyjPieKCgHQgKyDOuCk/Iiwib3B0aW9ucyI6WyJBLiA1My4xwrAiLCJCLiDiiJI1My4xwrAiLCJDLiAxMjYuOcKwIiwiRC4g4oiSMTI2LjnCsCJdLCJjb3JyZWN0X29wdGlvbiI6IkQiLCJleHBsYW5hdGlvbiI6IlRoZSBwaGFzb3IgY29tcG9uZW50cyBhcmUgKGEsIOKIkmIpID0gKOKIkjMsIOKIkjQpLiBCb3RoIGFyZSBuZWdhdGl2ZSwgcGxhY2luZyB0aGUgcG9pbnQgaW4gcXVhZHJhbnQgSUlJLiBUaGUgcmVmZXJlbmNlIGFuZ2xlIGlzIHRhbuKBu8K5KDQvMykg4omIIDUzLjHCsCwgYnV0IGluIHF1YWRyYW50IElJSSB0aGUgcHJpbmNpcGFsLXZhbHVlIGFuZ2xlIGlzIOKIkigxODDCsCDiiJIgNTMuMcKwKSA9IOKIkjEyNi45wrAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBpcyBvbmx5IHRoZSByZWZlcmVuY2UgYW5nbGUgYW5kIGlnbm9yZXMgcXVhZHJhbnQgaW5mb3JtYXRpb24gZW50aXJlbHkuIiwiQiI6IlRoaXMgaXMgYSBxdWFkcmFudC1JViBhbmdsZSAocG9zaXRpdmUgeCwgbmVnYXRpdmUgeSksIG5vdCB0aGUgY29ycmVjdCBsb2NhdGlvbiBmb3IgKOKIkjMsIOKIkjQpLiIsIkMiOiJUaGlzIHBvaW50cyB0byBxdWFkcmFudCBJSSAobmVnYXRpdmUgeCwgcG9zaXRpdmUgeSksIG5vdCBxdWFkcmFudCBJSUkuIiwiRCI6IkNvcnJlY3QuIn0sImhpbnQiOiJDaGVjayB0aGUgc2lnbnMgb2YgYSBhbmQg4oiSYiwgbm90IGp1c3QgdGhlIGNhbGN1bGF0b3IncyByYXcgcmVmZXJlbmNlIGFuZ2xlLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJwaGFzb3JfcXVhZHJhbnRfcGxvdCIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMyIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQSBzdHVkZW50IGNvbXB1dGVzIEMgPSA1IGNvcnJlY3RseSBmb3IgeCh0KSA9IOKIkjMgY29zKM+J4oKAdCkgKyA0IHNpbijPieKCgHQpLCBidXQgd3JpdGVzIM64ID0gNTMuMcKwLiBFeHBsYWluIGJyaWVmbHkgd2hhdCB3ZW50IHdyb25nLiIsImlkZWFsX2Fuc3dlciI6IlRoZSBzdHVkZW50IHVzZWQgdGhlIHJlZmVyZW5jZSBhbmdsZSBmcm9tIHRoZSBjYWxjdWxhdG9yIGJ1dCBkaWQgbm90IGNvcnJlY3QgZm9yIHF1YWRyYW50LiBGb3IgYSA9IOKIkjMgYW5kIOKIkmIgPSDiiJI0LCB0aGUgcGhhc29yIHBvaW50IChhLCDiiJJiKSA9ICjiiJIzLCDiiJI0KSBsaWVzIGluIHF1YWRyYW50IElJSSwgc28gdGhlIHByaW5jaXBhbC12YWx1ZSBwaGFzZSBpcyDiiJIxMjYuOcKwLCBub3QgNTMuMcKwLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3QgYWNrbm93bGVkZ2UgdGhhdCB0aGUgYW1wbGl0dWRlIEMgPSA1IGlzIGNvcnJlY3QiLCJNdXN0IHN0YXRlIHRoYXQgdGhlIGFuZ2xlIGVycm9yIGlzIGEgcXVhZHJhbnQgZXJyb3IiLCJNdXN0IGlkZW50aWZ5IHRoZSBjb3JyZWN0IHBoYXNlIGFzIOKIkjEyNi45wrAgb3IgYW4gZXF1aXZhbGVudCBxdWFkcmFudC1JSUkgYW5nbGUiXSwiZXhwbGFuYXRpb24iOiJUaGlzIGNoZWNrcyB3aGV0aGVyIHRoZSBzdHVkZW50IHVuZGVyc3RhbmRzIHRoZSBtYWluIGV4YW0gdHJhcDogdGhlIGNhbGN1bGF0b3IgaW52ZXJzZSB0YW5nZW50IGFsb25lIHJldHVybnMgb25seSBhIHJlZmVyZW5jZSBhbmdsZSBpbiB0aGUgcmFuZ2Ug4oiSOTDCsCB0byArOTDCsCwgd2hpY2ggaXMgbm90IHN1ZmZpY2llbnQgd2hlbiB0aGUgcGhhc29yIGxpZXMgaW4gcXVhZHJhbnQgSUkgb3IgSUlJLiIsImhpbnQiOiJXaGVyZSBpcyB0aGUgcG9pbnQgKGEsIOKIkmIpID0gKOKIkjMsIOKIkjQpIGluIHRoZSB4eS1wbGFuZT8iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDNfcTQiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoeSBkb2VzIGEgY29zKM+J4oKAdCkgKyBiIHNpbijPieKCgHQpIGFsd2F5cyBjb21iaW5lIGludG8gYSBzaW5nbGUgc2ludXNvaWQgb2YgdGhlIHNhbWUgZnJlcXVlbmN5PyIsIm9wdGlvbnMiOlsiQS4gQmVjYXVzZSBhZGRpbmcgc2ludXNvaWRzIGFsd2F5cyBkb3VibGVzIHRoZSBmcmVxdWVuY3kiLCJCLiBCZWNhdXNlIGNvc2luZSBhbmQgc2luZSB3aXRoIHRoZSBzYW1lIM+J4oKAIGFyZSBqdXN0IHBoYXNlLXNoaWZ0ZWQgdmVyc2lvbnMgb2YgdGhlIHNhbWUgYmFzaWMgb3NjaWxsYXRpb24iLCJDLiBCZWNhdXNlIHRoZSBhbXBsaXR1ZGUgdGVybXMgY2FuY2VsIiwiRC4gQmVjYXVzZSDOuCBpcyBhbHdheXMgemVybyJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlNpbmUgYW5kIGNvc2luZSBhdCB0aGUgc2FtZSDPieKCgCBkaWZmZXIgb25seSBieSBhIDkwwrAgcGhhc2Ugc2hpZnQsIHNvIHRoZWlyIHdlaWdodGVkIHN1bSBpcyBzdGlsbCBhbiBvc2NpbGxhdGlvbiBhdCDPieKCgCDigJQgb25seSB0aGUgYW1wbGl0dWRlIGFuZCBwaGFzZSBjaGFuZ2UsIG5vdCB0aGUgZnJlcXVlbmN5LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBmcmVxdWVuY3kgZG9lcyBub3QgY2hhbmdlIHdoZW4gYWRkaW5nIHNhbWUtZnJlcXVlbmN5IHNpbnVzb2lkcy4iLCJDIjoiQW1wbGl0dWRlcyBkbyBub3QgZ2VuZXJhbGx5IGNhbmNlbDsgdGhleSBjb21iaW5lIHZpYSB0aGUgcm9vdC1zdW0tb2Ytc3F1YXJlcyBmb3JtdWxhLiIsIkQiOiJUaGUgcmVzdWx0aW5nIHBoYXNlIM64IGlzIGdlbmVyYWxseSBub3QgemVybyB1bmxlc3MgYiA9IDAuIn0sImhpbnQiOiJUaGluayBvZiBwaGFzb3JzIGFkZGluZyB0aXAtdG8tdGFpbDogdGhlIHJlc3VsdCBpcyBzdGlsbCBhIHBoYXNvciBhdCB0aGUgc2FtZSBmcmVxdWVuY3kuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfV19" style="display:none;"></div>%%KC_END%%
