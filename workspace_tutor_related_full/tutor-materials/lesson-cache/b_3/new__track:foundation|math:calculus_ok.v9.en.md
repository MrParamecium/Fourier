# B.3 Sketching Signals

> **Section Objective:** Learn to sketch exponential and sinusoidal signals quickly and accurately using a small set of checkpoints — no point-by-point plotting required.

---

This section gives you a fast, reliable method for drawing two important signal shapes by hand.

Before we start, three words to know: the **time constant** is the time it takes a decaying exponential to shrink by a factor of e (roughly to 37% of its current value). The **period** is the duration of one full repeat of a cosine wave. A **phase delay** is a horizontal shift of the wave to the right along the time axis.

The clean rule is this: for a pure exponential, use the time constant as your stepping stone. For an exponentially varying sinusoid, sketch the sinusoid and the exponential envelope separately, then combine them.

These signals appear on nearly every signals exam. A rough but correct sketch — with the right shape and labeled checkpoints — earns easy marks even when the algebra gets messy.

![Fig. B.10](/figures/page-021-fig__b_10-1.png)
*This textbook figure shows the key checkpoint idea for sketching decaying exponentials: the curve starts at 1, drops to approximately 0.37 after one time constant, and falls further to about 0.135 after two time constants.*

## 1. How to Sketch a Decaying Exponential

The standard decaying exponential is written as:

**x(t) = e^{-at}**, where a > 0

Here, **t** is time (the horizontal axis), **a** is a positive number that controls how fast the curve falls — a larger a means faster decay — and **e** is the natural base, approximately 2.718.

### KEY FACTS

- At t = 0: x(0) = e^0 = **1** (the curve always starts at 1 for this form)
- The **time constant** is **τ = 1/a**
- After every interval of length τ, the value is multiplied by **1/e ≈ 0.37**

So after one time constant the value is about 0.37, after two time constants it is about 0.37 × 0.37 ≈ 0.135, and so on.

### FAST SKETCH RECIPE

1. Mark the starting value: x(0) = 1 on the vertical axis.
2. Compute the time constant: τ = 1/a.
3. Move forward by τ on the time axis and mark the value 1/e ≈ 0.37.
4. Move forward by another τ and mark 1/e² ≈ 0.135. Repeat as needed.
5. Draw a smooth, continuously falling curve through all checkpoints — it never touches zero.

#### Growing Case

For **e^{at}** (a > 0), the curve rises instead of falls. Over each interval of length 1/a, the value is multiplied by e ≈ 2.718. The same checkpoint logic applies, just in the upward direction.

$$x(t)=e^{-at},\qquad \tau=\frac{1}{a},\qquad \frac{x(t+\tau)}{x(t)}=\frac{1}{e}\approx 0.37$$
*The time constant τ = 1/a is the key shortcut for sketching: every time you step forward by one time constant along the time axis, a decaying exponential shrinks to about 37% of what it was at the previous checkpoint.*

## 2. How to Sketch a Decaying Cosine

An exponentially varying sinusoid has the form:

**x(t) = A e^{-at} cos(ω₀ t + θ)**

Let's name each part before using it:
- **A** is the starting amplitude scale — it sets the overall height of the signal at t = 0.
- **e^{-at}** is the shrinking part — it makes the amplitude get smaller over time.
- **ω₀** controls how fast the cosine oscillates back and forth.
- **θ** is the phase shift — it slides the cosine left or right along the time axis. A negative θ shifts it to the right (a delay).

### CLEAN RULE

Sketch the envelope and the cosine separately, then combine them.

### WORKED EXAMPLE: 4e^{-2t} cos(6t − 60°)

**Step 1 — Sketch the envelope.**
Here a = 2, so the time constant is τ = 1/2 = 0.5 s. The upper envelope is 4e^{-2t}. Checkpoints:
- t = 0: value = **4**
- t = 0.5: value = **4/e ≈ 1.47**
- t = 1.0: value = **4/e² ≈ 0.54**

Draw the lower envelope −4e^{-2t} as the mirror image below the time axis. These two curves are called the **envelopes** of the signal.

**Step 2 — Find the cosine timing.**
The period is T₀ = 2π/ω₀ = 2π/6 ≈ 1.05 s. The phase angle is −60°, which is a delay to the right. The delay in time is (60/360) × T₀ = (1/6) × 1.05 ≈ 0.17 s.

**Step 3 — Combine.**
Sketch the cosine oscillation so that its peaks always touch the upper envelope and its troughs always touch the lower envelope. The full signal is trapped between +4e^{-2t} and −4e^{-2t} at every moment.

$$x(t)=Ae^{-at}\cos(\omega_0 t+\theta),\qquad T_0=\frac{2\pi}{\omega_0}$$
*This signal is a cosine wave whose amplitude is not constant: the cosine still completes one full oscillation every T₀ seconds, but its peak height is not fixed — it is controlled by the shrinking upper envelope +Ae^{-at} and the growing-in-magnitude lower envelope −Ae^{-at}, both of which decay toward zero over time.*

> ⚠️ Chart render error: exit 1

---
**📌 Key Takeaways**
- Time constant τ = 1/a: each step forward by τ multiplies a decaying exponential by 1/e ≈ 0.37.
- For e^{-at}, compute τ = 1/a and use checkpoint values 1, 1/e, 1/e² to guide your sketch.
- For Ae^{-at}cos(ω₀t + θ), sketch the cosine oscillation inside the envelopes ±Ae^{-at}.

*In the next section we will keep building signal-sketching skills with more waveform patterns.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InRpbWVfY29uc3RhbnRfbWVhbmluZyIsImxhYmVsIjoiTWVhbmluZyBvZiB0aW1lIGNvbnN0YW50IGZvciBhIGRlY2F5aW5nIGV4cG9uZW50aWFsIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IGVeey1hdH0gd2l0aCBhID4gMCwgd2hhdCBkb2VzIHRoZSB0aW1lIGNvbnN0YW50IM+EID0gMS9hIHRlbGwgeW91PyIsIm9wdGlvbnMiOlsiQS4gVGhlIHNpZ25hbCBiZWNvbWVzIHplcm8gYWZ0ZXIgdGltZSDPhCIsIkIuIFRoZSBzaWduYWwgZHJvcHMgdG8gMS9lIG9mIGl0cyBwcmV2aW91cyB2YWx1ZSBldmVyeSDPhCBzZWNvbmRzIiwiQy4gVGhlIHNpZ25hbCByZXBlYXRzIGV2ZXJ5IM+EIHNlY29uZHMiLCJELiBUaGUgc2lnbmFsIGluY3JlYXNlcyBieSBhIGZhY3RvciBvZiBlIGV2ZXJ5IM+EIHNlY29uZHMiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgdGltZSBjb25zdGFudCBpcyB0aGUga2V5IGRlY2F5IHNob3J0Y3V0OiBhZnRlciBlYWNoIGludGVydmFsIG9mIGxlbmd0aCDPhCwgdGhlIHZhbHVlIGlzIG11bHRpcGxpZWQgYnkgMS9lLCBhYm91dCAwLjM3LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkFuIGV4cG9uZW50aWFsIGRlY2F5IGFwcHJvYWNoZXMgemVybyBncmFkdWFsbHk7IGl0IGRvZXMgbm90IGJlY29tZSBleGFjdGx5IHplcm8gYXQgb25lIHRpbWUgY29uc3RhbnQuIiwiQyI6IlJlcGV0aXRpb24gYmVsb25ncyB0byBhIHBlcmlvZCwgbm90IGEgdGltZSBjb25zdGFudC4iLCJEIjoiVGhhdCBkZXNjcmliZXMgZ3Jvd3RoIGZvciBlXnthdH0sIG5vdCBkZWNheSBmb3IgZV57LWF0fS4ifSwiaGludCI6IlRoaW5rICdvbmUgdGltZSBjb25zdGFudCA9IG11bHRpcGx5IGJ5IDAuMzcnIGZvciBhIGRlY2F5aW5nIGV4cG9uZW50aWFsLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSWYgeCh0KSA9IGVeey0ydH0sIHdoYXQgaXMgaXRzIHRpbWUgY29uc3RhbnQ/Iiwib3B0aW9ucyI6WyJBLiAyIHMiLCJCLiAxIHMiLCJDLiAwLjUgcyIsIkQuIGUgcyJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IkhlcmUgYSA9IDIsIHNvIM+EID0gMS9hID0gMS8yID0gMC41IHMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhhdCBpcyBhLCBub3QgMS9hLiIsIkIiOiJUaGlzIHdvdWxkIGJlIGNvcnJlY3Qgb25seSBpZiBhID0gMS4iLCJEIjoiVGhlIGNvbnN0YW50IGUgaXMgdXNlZCBpbiB0aGUgdmFsdWUgcmF0aW8sIG5vdCBhcyB0aGUgdGltZSBjb25zdGFudC4ifSwiaGludCI6IlVzZSDPhCA9IDEvYSBkaXJlY3RseS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImNoZWNrcG9pbnRfdmFsdWVzX2Zvcl9leHBvbmVudGlhbCIsImxhYmVsIjoiQ2hlY2twb2ludCB2YWx1ZXMgZm9yIHNrZXRjaGluZyBlXnstYXR9IiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IGVeey0ydH0sIHdoaWNoIGxpc3QgZ2l2ZXMgdGhlIHZhbHVlcyBhdCB0ID0gMCwgMC41LCBhbmQgMT8iLCJvcHRpb25zIjpbIkEuIDEsIDEvZSwgMS9lwrIiLCJCLiAxLCAxLzIsIDEvNCIsIkMuIDAsIDEvZSwgMS9lwrIiLCJELiAxLCBlLCBlwrIiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJCZWNhdXNlIHRoZSB0aW1lIGNvbnN0YW50IGlzIDAuNSBzLCB0aGUgdmFsdWUgaXMgbXVsdGlwbGllZCBieSAxL2UgZWFjaCBoYWxmLXNlY29uZDogMSwgdGhlbiAxL2UsIHRoZW4gMS9lwrIuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhhdCBpcyBub3QgaG93IGV4cG9uZW50aWFsIGRlY2F5IHdpdGggYmFzZSBlIGJlaGF2ZXMgaGVyZS4iLCJDIjoiVGhlIHN0YXJ0aW5nIHZhbHVlIGlzIHgoMCkgPSBlXjAgPSAxLCBub3QgMC4iLCJEIjoiVGhvc2UgdmFsdWVzIGNvcnJlc3BvbmQgdG8gZ3Jvd3RoLCBub3QgZGVjYXkuIn0sImhpbnQiOiJTdGFydCBhdCB4KDApID0gMSBhbmQgc3RlcCBieSBvbmUgdGltZSBjb25zdGFudCBlYWNoIDAuNSBzLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6InBlcmlvZF9hbmRfcGhhc2VfZGVsYXkiLCJsYWJlbCI6IlJlYWRpbmcgcGVyaW9kIGFuZCBwaGFzZSBkZWxheSBpbiBhIGNvc2luZSIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciBjb3MoNnQg4oiSIDYwwrApLCB3aGljaCBzdGF0ZW1lbnQgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIFRoZSBwZXJpb2QgaXMgNiBzIGFuZCB0aGUgd2F2ZSBpcyBzaGlmdGVkIGxlZnQgYnkgNjDCsCIsIkIuIFRoZSBwZXJpb2QgaXMgMs+ALzYgcyBhbmQgdGhlIHdhdmUgaXMgZGVsYXllZCB0byB0aGUgcmlnaHQgYnkgNjDCsCIsIkMuIFRoZSBwZXJpb2QgaXMgNjAgcyBhbmQgdGhlcmUgaXMgbm8gc2hpZnQiLCJELiBUaGUgcGVyaW9kIGlzIDEvNiBzIGFuZCB0aGUgd2F2ZSBpcyBhZHZhbmNlZCB0byB0aGUgbGVmdCBieSBvbmUgZnVsbCBjeWNsZSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkZvciBjb3Moz4nigoB0ICsgzrgpLCB0aGUgcGVyaW9kIGlzIFTigoAgPSAyz4Avz4nigoAgPSAyz4AvNi4gQSBuZWdhdGl2ZSBwaGFzZSBhbmdsZSBoZXJlIG1lYW5zIGEgZGVsYXkgdG8gdGhlIHJpZ2h0IGJ5IDYwwrAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlIHBlcmlvZCBpcyBub3QgNiBzLCBhbmQgYSBuZWdhdGl2ZSBwaGFzZSBoZXJlIGlzIG5vdCBhIGxlZnQgc2hpZnQuIiwiQyI6Ik5laXRoZXIgdGhlIHBlcmlvZCBub3IgdGhlIHNoaWZ0IGlzIGNvcnJlY3QuIiwiRCI6IjEvNiBzIGlzIHRoZSBhcHByb3hpbWF0ZSBkZWxheSBmb3IgdGhpcyBleGFtcGxlLCBub3QgdGhlIGZ1bGwgcGVyaW9kLiJ9LCJoaW50IjoiU2VwYXJhdGUgdGhlIHR3byBpZGVhczogcGVyaW9kIGNvbWVzIGZyb20gNiwgd2hpbGUgdGhlIGhvcml6b250YWwgc2hpZnQgY29tZXMgZnJvbSA2MMKwLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6ImVudmVsb3BlX29mX2V4cG9uZW50aWFsbHlfdmFyeWluZ19zaW51c29pZCIsImxhYmVsIjoiRW52ZWxvcGUgaWRlYSBmb3IgQWVeey1hdH1jb3Moz4nigoB0ICsgzrgpIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3A0X3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGF0IGFyZSB0aGUgZW52ZWxvcGVzIG9mIHgodCkgPSA0ZV57LTJ0fSBjb3MoNnQg4oiSIDYwwrApPyIsIm9wdGlvbnMiOlsiQS4geSA9IMKxY29zKDZ0IOKIkiA2MMKwKSIsIkIuIHkgPSDCsTRlXnstMnR9IiwiQy4geSA9IMKxNmVeey0ydH0iLCJELiB5ID0gwrE0ZV57MnR9Il0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIGNvc2luZSBvc2NpbGxhdGVzIGJldHdlZW4g4oiSMSBhbmQgKzEsIHNvIG11bHRpcGx5aW5nIGJ5IDRlXnstMnR9IG1ha2VzIHRoZSBzaWduYWwgc3RheSBiZXR3ZWVuICs0ZV57LTJ0fSBhbmQg4oiSNGVeey0ydH0uIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhvc2UgYXJlIG5vdCBhbXBsaXR1ZGUgZW52ZWxvcGVzOyB0aGV5IGlnbm9yZSB0aGUgY2hhbmdpbmcgYW1wbGl0dWRlIHNjYWxlLiIsIkMiOiJUaGUgY29lZmZpY2llbnQgNiBiZWxvbmdzIHRvIHRoZSBvc2NpbGxhdGlvbiByYXRlLCBub3QgdGhlIGVudmVsb3BlIGhlaWdodC4iLCJEIjoiVGhpcyB3b3VsZCBiZSBhIGdyb3dpbmcgZW52ZWxvcGUsIG5vdCB0aGUgZGVjYXlpbmcgb25lIGluIHRoZSBzaWduYWwuIn0sImhpbnQiOiJUaGUgZW52ZWxvcGUgY29tZXMgZnJvbSB0aGUgYW1wbGl0dWRlIGZhY3RvciBpbiBmcm9udCBvZiB0aGUgY29zaW5lLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwNF9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBzdHVkZW50IHNrZXRjaGVzIDRlXnstMnR9IGNvcyg2dCDiiJIgNjDCsCkgYXMgYSBjb3NpbmUgd2l0aCBjb25zdGFudCBwZWFrIGhlaWdodCA0LiBXaGF0IGlzIHRoZSBtYWluIG1pc3Rha2U/Iiwib3B0aW9ucyI6WyJBLiBUaGV5IGZvcmdvdCB0aGF0IHRoZSBwZXJpb2Qgc2hvdWxkIGJlIDQiLCJCLiBUaGV5IHVzZWQgc2luZSBpbnN0ZWFkIG9mIGNvc2luZSIsIkMuIFRoZXkgaWdub3JlZCB0aGUgZGVjYXlpbmcgZW52ZWxvcGVzIMKxNGVeey0ydH0iLCJELiBUaGV5IHNob3VsZCBoYXZlIHN0YXJ0ZWQgYXQgemVybyBhdXRvbWF0aWNhbGx5Il0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiVGhlIGZhY3RvciA0ZV57LTJ0fSBtYWtlcyB0aGUgYW1wbGl0dWRlIHNocmluayBvdmVyIHRpbWUsIHNvIGEgY29uc3RhbnQtaGVpZ2h0IGNvc2luZSBpcyBub3QgY29ycmVjdC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGUgYW1wbGl0dWRlIHByb2JsZW0gaXMgdGhlIGNvcmUgaXNzdWUsIG5vdCB0aGUgcGVyaW9kIHZhbHVlIDQuIiwiQiI6IlRoZSBtaXN0YWtlIGRlc2NyaWJlZCBpcyBhYm91dCBjaGFuZ2luZyBhbXBsaXR1ZGUsIG5vdCB3aGV0aGVyIGNvc2luZSBvciBzaW5lIHdhcyB1c2VkLiIsIkQiOiJBIHNoaWZ0ZWQgY29zaW5lIGRvZXMgbm90IGF1dG9tYXRpY2FsbHkgc3RhcnQgYXQgemVyby4ifSwiaGludCI6IkFzayB3aGV0aGVyIHRoZSBwZWFrIGhlaWdodCBzdGF5cyBmaXhlZCBvciBzaHJpbmtzIHdpdGggdGltZS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoibWF0cGxvdGxpYl9wbG90X29mX2RlY2F5aW5nX2Nvc2luZV93aXRoX2FuZF93aXRob3V0X2VudmVsb3BlIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJwcm9jZWR1cmFsX3NrZXRjaGluZ19zdGVwcyIsImxhYmVsIjoiU3RlcC1ieS1zdGVwIHByb2NlZHVyZSBmb3Igc2tldGNoaW5nIHRoZSBmdWxsIHNpZ25hbCIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDVfcTEiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkluIDMgb3IgNCBzaG9ydCBzdGVwcywgZGVzY3JpYmUgaG93IHlvdSB3b3VsZCBza2V0Y2ggeCh0KSA9IEFlXnstYXR9IGNvcyjPieKCgHQgKyDOuCkuIiwiaWRlYWxfYW5zd2VyIjoiRmlyc3Qgc2tldGNoIHRoZSBleHBvbmVudGlhbCBlbnZlbG9wZXMgK0FlXnstYXR9IGFuZCDiiJJBZV57LWF0fS4gTmV4dCBmaW5kIHRoZSBjb3NpbmUgcGVyaW9kIFTigoAgPSAyz4Avz4nigoAgYW5kIG5vdGUgdGhlIHBoYXNlIHNoaWZ0IM64IGFzIGEgaG9yaXpvbnRhbCBzaGlmdC4gVGhlbiBza2V0Y2ggdGhlIGNvc2luZSBvc2NpbGxhdGlvbiBzbyBpdCBzdGF5cyBiZXR3ZWVuIHRoZSB0d28gZW52ZWxvcGVzLiBGaW5hbGx5IHVzZSBhIGZldyBjaGVja3BvaW50IHRpbWVzIHRvIGtlZXAgdGhlIGRyYXdpbmcgYWNjdXJhdGUuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBtZW50aW9uIHNrZXRjaGluZyBib3RoIHBvc2l0aXZlIGFuZCBuZWdhdGl2ZSBlbnZlbG9wZXMiLCJNdXN0IG1lbnRpb24gZmluZGluZyB0aGUgY29zaW5lIHBlcmlvZCIsIk11c3QgbWVudGlvbiBhY2NvdW50aW5nIGZvciBwaGFzZSBzaGlmdCBhcyBhIGhvcml6b250YWwgc2hpZnQiLCJNdXN0IHN0YXRlIHRoYXQgdGhlIG9zY2lsbGF0aW9uIHN0YXlzIGluc2lkZSB0aGUgZW52ZWxvcGVzIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCBrbm93cyB0aGUgYWN0dWFsIGV4YW0gcHJvY2VkdXJlLCBub3QganVzdCBpc29sYXRlZCBmYWN0cy4iLCJoaW50IjoiVGhpbms6IGVudmVsb3BlIGZpcnN0LCBjb3NpbmUgdGltaW5nIHNlY29uZCwgY29tYmluZSBsYXN0LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
