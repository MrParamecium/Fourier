# B.3 Sketching Signals

> **Exam Focus:** Two tasks dominate this section: (1) sketching monotonic exponentials using the time constant, and (2) sketching signals of the form 4e^{-2t}cos(6t - 60°) using exponential envelopes.

---

**What to memorize instantly:**

- For **e^{-at}**: initial value at t = 0 is **1**, time constant is **τ = 1/a**, and each step of one time constant multiplies the value by **1/e ≈ 0.37**.
- For **e^{at}**: each time constant step multiplies by **e ≈ 2.718** — it grows.
- For **exponentially varying sinusoids** like 4e^{-2t}cos(6t - 60°): the cosine oscillates *inside* the envelopes **+4e^{-2t}** and **-4e^{-2t}**. Draw the envelopes first, then fit the wave between them.

### PATTERN RECOGNITION

See e^{-2t}? Time constant = 0.5. See 4e^{-2t}cos(6t - 60°)? Envelopes are ±4e^{-2t}, period = 2π/6, phase delay = 60°.

![Fig. B.10](/figures/page-021-fig__b_10-1.png)
*The key exam fact: an exponential sketch is fully determined by its initial value and the repeated 1/e drop at every time constant interval τ = 1/a.*

## 1. Monotonic Exponentials: The Fastest Sketch Rule

> **Rule:** Mark the initial value, compute τ = 1/a, then place key points at t = τ, 2τ, 3τ with values multiplied by 1/e each step.

**Step-by-step for e^{-2t} (so a = 2, τ = 0.5):**

| t | Value | Calculation |
|---|-------|-------------|
| 0 | 1.000 | e^0 |
| 0.5 | 0.368 | 1 × (1/e) |
| 1.0 | 0.135 | 1 × (1/e)² |
| 1.5 | 0.050 | 1 × (1/e)³ |

Plot those four points, draw a smooth curve through them — done.

**Growth version e^{at}:** same logic, but multiply by e each step instead of 1/e. The curve rises steeply.

### COMMON MISTAKE

Do **not** confuse the coefficient a with the time constant. If x(t) = e^{-4t}, then a = 4 and τ = **1/4**, not 4. The time constant is always the reciprocal of the exponent coefficient.

$$\tau = \frac{1}{a}, \qquad e^{-a(t+\tau)} = \frac{1}{e}\, e^{-at}$$
*This is the entire fast-sketch rule in one line: advancing time by one time constant τ always multiplies a decaying exponential by exactly 1/e, so you can place every key point on the sketch by repeated multiplication.*

## 2. Exponentially Varying Sinusoids: Sketch the Envelopes First

> **Exam Rule:** For x(t) = A e^{-at} cos(ω₀t + θ), never try to plot the full curve from scratch. Draw the envelopes ±A e^{-at} first, then fit the cosine oscillation between them.

**Worked example: x(t) = 4e^{-2t}cos(6t - 60°)**

**Step 1 — Envelope values** (A = 4, a = 2, τ = 0.5 s):

| t | +Envelope | -Envelope |
|---|-----------|----------|
| 0 | 4.00 | -4.00 |
| 0.5 | 1.47 | -1.47 |
| 1.0 | 0.54 | -0.54 |
| 1.5 | 0.20 | -0.20 |

**Step 2 — Oscillation period:** T = 2π/6 ≈ 1.05 s.

**Step 3 — Phase shift:** θ = -60° means the cosine is delayed by 60°/360° × 1.05 s ≈ 0.17 s to the right.

**Step 4 — Fit the wave:** positive peaks touch +4e^{-2t}; negative peaks touch -4e^{-2t}. The oscillation shrinks as the envelopes close in.

### KEY INSIGHT

The envelopes do all the heavy lifting. Once they are drawn, the cosine just bounces between them.

$$x(t) = A\,e^{-at}\cos(\omega_0 t + \theta), \qquad T = \frac{2\pi}{\omega_0}$$
*For sketching, read off four things immediately: the envelope amplitude A e^{-at} (sets the bounding curves), the decay rate via τ = 1/a (sets how fast the envelope shrinks), the oscillation period T = 2π/ω₀ (sets how many cycles fit before the signal dies), and the phase θ (sets the horizontal shift of the first peak).*

> ⚠️ Chart render error: exit 1

---
**📌 Key Takeaways**
- Time constant τ = 1/a — never confuse it with the coefficient a itself.
- Each time constant interval multiplies a decaying exponential by 1/e ≈ 0.37.
- For damped sinusoids, draw envelopes ±A e^{-at} first, then fit the cosine between them.

*In the next section we will examine complex exponentials and phasors, which unify sinusoidal and exponential signals into a single compact representation used throughout circuit and signal analysis.

---

#### Exam Checklist — Before Every Sketch

**Initial value** | **Time constant (τ = 1/a)** | **Period (T = 2π/ω₀)** | **Phase shift (θ)** | **Envelopes (±A e^{-at})***

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InRpbWVfY29uc3RhbnRfcmVhZGluZyIsImxhYmVsIjoiUmVhZCB0aGUgdGltZSBjb25zdGFudCBhbmQgcG9pbnQgdmFsdWVzIG9mIGEgbW9ub3RvbmljIGV4cG9uZW50aWFsIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IGVeey00dH0sIHdoYXQgaXMgdGhlIHRpbWUgY29uc3RhbnQ/Iiwib3B0aW9ucyI6WyJBLiA0IiwiQi4gMS80IiwiQy4gZV57LTR9IiwiRC4gMS9lIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiRm9yIGVeey1hdH0sIHRoZSB0aW1lIGNvbnN0YW50IGlzIM+EID0gMS9hLiBIZXJlIGEgPSA0LCBzbyDPhCA9IDEvNC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIGNvbmZ1c2VzIHRoZSBjb2VmZmljaWVudCBhIHdpdGggdGhlIHRpbWUgY29uc3RhbnQuIFRoZSB0aW1lIGNvbnN0YW50IGlzIDEvYSwgbm90IGEuIiwiQyI6ImVeey00fSBpcyB0aGUgdmFsdWUgb2YgdGhlIGZ1bmN0aW9uIGF0IHQgPSAxLCBub3QgdGhlIHRpbWUgY29uc3RhbnQuIiwiRCI6IjEvZSBpcyB0aGUgZGVjYXkgZmFjdG9yIGFwcGxpZWQgb3ZlciBvbmUgdGltZSBjb25zdGFudCDigJQgaXQgaXMgYSBtdWx0aXBsaWVyLCBub3QgdGhlIHRpbWUgY29uc3RhbnQgaXRzZWxmLiJ9LCJoaW50IjoiTWVtb3JpemU6IGlmIHRoZSBleHBvbmVudCBpcyAtYXQsIHRoZSB0aW1lIGNvbnN0YW50IGlzIDEvYS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIHgodCkgPSBlXnstMnR9LCB3aGF0IGlzIHgoMSk/Iiwib3B0aW9ucyI6WyJBLiAxL2UiLCJCLiAyL2UiLCJDLiAxL2VeMiIsIkQuIGVeMiJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlN1YnN0aXR1dGluZyB0ID0gMSBnaXZlcyB4KDEpID0gZV57LTJ9LiBFcXVpdmFsZW50bHksIM+EID0gMC41LCBzbyB0ID0gMSBlcXVhbHMgdHdvIHRpbWUgY29uc3RhbnRzLCBhbmQgdGhlIHZhbHVlIGlzICgxL2UpXjIgPSAxL2VeMi4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiIxL2UgaXMgdGhlIHZhbHVlIGFmdGVyIGV4YWN0bHkgb25lIHRpbWUgY29uc3RhbnQsIHdoaWNoIG9jY3VycyBhdCB0ID0gMC41LCBub3QgdCA9IDEuIiwiQiI6IlRoZXJlIGlzIG5vIGxlYWRpbmcgY29lZmZpY2llbnQgb2YgMiBpbiBmcm9udCBvZiB0aGUgZXhwb25lbnRpYWwgaW4geCh0KSA9IGVeey0ydH0uIiwiRCI6ImVeMiB3b3VsZCBiZSBhIGdyb3dpbmcgZXhwb25lbnRpYWwgZXZhbHVhdGVkIGF0IHQgPSAxLCBub3QgYSBkZWNheWluZyBvbmUuIn0sImhpbnQiOiJFaXRoZXIgcGx1ZyB0ID0gMSBkaXJlY3RseSBpbnRvIGVeey0ydH0sIG9yIGNvdW50IGhvdyBtYW55IHRpbWUgY29uc3RhbnRzIGZpdCBpbnRvIHQgPSAxLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiZ3Jvd3RoX3ZzX2RlY2F5IiwibGFiZWwiOiJEaXN0aW5ndWlzaCBleHBvbmVudGlhbCBncm93dGggZnJvbSBleHBvbmVudGlhbCBkZWNheSIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHN0YXRlbWVudCBpcyBjb3JyZWN0IGZvciB4KHQpID0gZV57M3R9PyIsIm9wdGlvbnMiOlsiQS4gSXQgZGVjYXlzIGJ5IGEgZmFjdG9yIDEvZSBldmVyeSAxLzMgc2Vjb25kIiwiQi4gSXQgZ3Jvd3MgYnkgYSBmYWN0b3IgZSBldmVyeSAxLzMgc2Vjb25kIiwiQy4gSXRzIHRpbWUgY29uc3RhbnQgaXMgMyBzZWNvbmRzIiwiRC4gSXRzIGluaXRpYWwgdmFsdWUgaXMgMCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkZvciBlXnthdH0gd2l0aCBhID4gMCwgdGhlIHNpZ25hbCBncm93cy4gT3ZlciBlYWNoIGludGVydmFsIG9mIGxlbmd0aCAxL2EgPSAxLzMgcywgdGhlIHZhbHVlIG11bHRpcGxpZXMgYnkgZS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGUgMS9lIGRlY2F5IHJ1bGUgYXBwbGllcyB0byBlXnstYXR9IChuZWdhdGl2ZSBleHBvbmVudCksIG5vdCBlXnthdH0uIiwiQyI6IlRoZSB0aW1lIGNvbnN0YW50IGlzIDEvYSA9IDEvMywgbm90IDMuIENvbmZ1c2luZyBhIHdpdGggMS9hIGlzIHRoZSBjbGFzc2ljIHRyYXAuIiwiRCI6IkF0IHQgPSAwLCBlXnszwrcwfSA9IGVeMCA9IDEsIG5vdCAwLiJ9LCJoaW50IjoiQ2hlY2sgdGhlIHNpZ24gb2YgdGhlIGV4cG9uZW50IGZpcnN0OiBwb3NpdGl2ZSBleHBvbmVudCBtZWFucyBncm93dGgsIG5lZ2F0aXZlIG1lYW5zIGRlY2F5LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6ImRhbXBlZF9zaW51c29pZF9wYXJhbWV0ZXJzIiwibGFiZWwiOiJSZWFkIGVudmVsb3BlLCBwZXJpb2QsIGFuZCBwaGFzZSBpbmZvcm1hdGlvbiBmcm9tIEEgZV57LWF0fSBjb3Moz4nigoB0ICsgzrgpIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IDRlXnstMnR9Y29zKDZ0IC0gNjDCsCksIHdoaWNoIHBhaXIgZ2l2ZXMgdGhlIGNvcnJlY3QgZW52ZWxvcGVzPyIsIm9wdGlvbnMiOlsiQS4gwrFjb3MoNnQgLSA2MMKwKSIsIkIuIMKxNGVeey0ydH0iLCJDLiDCsWVeey0ydH0iLCJELiDCsTRjb3MoNnQgLSA2MMKwKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBjb3NpbmUgZmFjdG9yIG9zY2lsbGF0ZXMgYmV0d2VlbiAtMSBhbmQgKzEuIE11bHRpcGx5aW5nIGJ5IDRlXnstMnR9IGdpdmVzIGEgc2lnbmFsIHRoYXQgaXMgYm91bmRlZCBhYm92ZSBieSArNGVeey0ydH0gYW5kIGJlbG93IGJ5IC00ZV57LTJ0fS4gVGhvc2UgYXJlIHRoZSBlbnZlbG9wZXMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBpZ25vcmVzIGJvdGggdGhlIGFtcGxpdHVkZSBmYWN0b3IgNCBhbmQgdGhlIGV4cG9uZW50aWFsIGRlY2F5IGVudGlyZWx5LiIsIkMiOiJUaGlzIGNvcnJlY3RseSBpZGVudGlmaWVzIHRoZSBleHBvbmVudGlhbCBzaGFwZSBidXQgZHJvcHMgdGhlIGFtcGxpdHVkZSBmYWN0b3IgNC4iLCJEIjoiVGhpcyBoYXMgbm8gZXhwb25lbnRpYWwgZGVjYXksIHNvIGl0IGNhbm5vdCBzaHJpbmsgb3ZlciB0aW1lIGFuZCBjYW5ub3QgYmUgdGhlIGVudmVsb3BlLiJ9LCJoaW50IjoiUmVwbGFjZSB0aGUgY29zaW5lIHdpdGggwrExIChpdHMgbWF4aW11bSBhbmQgbWluaW11bSB2YWx1ZXMpLiBXaGF0IHJlbWFpbnMgaXMgdGhlIGVudmVsb3BlLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJkYW1wZWRfY29zaW5lX3dpdGhfZW52ZWxvcGVzIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IEEgZV57LWF0fWNvcyjPieKCgHQgKyDOuCksIHdoaWNoIHF1YW50aXR5IGRldGVybWluZXMgdGhlIHBlcmlvZCBvZiBvc2NpbGxhdGlvbj8iLCJvcHRpb25zIjpbIkEuIEEiLCJCLiBhIiwiQy4gz4nigoAiLCJELiDOuCJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlRoZSBwZXJpb2QgaXMgVCA9IDLPgC/PieKCgCwgc28gz4nigoAgaXMgdGhlIG9ubHkgcGFyYW1ldGVyIHRoYXQgY29udHJvbHMgaG93IGZhc3QgdGhlIG9zY2lsbGF0aW9uIHJlcGVhdHMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiQSBpcyB0aGUgaW5pdGlhbCBhbXBsaXR1ZGUgb2YgdGhlIGVudmVsb3BlIOKAlCBpdCBzY2FsZXMgdGhlIGhlaWdodCwgbm90IHRoZSByZXBldGl0aW9uIHJhdGUuIiwiQiI6ImEgY29udHJvbHMgaG93IGZhc3QgdGhlIGVudmVsb3BlIGRlY2F5cywgbm90IGhvdyBmYXN0IHRoZSBjb3NpbmUgb3NjaWxsYXRlcy4iLCJEIjoizrggc2hpZnRzIHRoZSB3YXZlZm9ybSBsZWZ0IG9yIHJpZ2h0IGluIHRpbWUgYnV0IGRvZXMgbm90IGNoYW5nZSB0aGUgbGVuZ3RoIG9mIG9uZSBjeWNsZS4ifSwiaGludCI6IlJlY2FsbCB0aGUgcGVyaW9kIGZvcm11bGE6IFQgPSAyz4Avz4nigoAuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwM19xMyIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiRm9yIHgodCkgPSAzZV57LXR9Y29zKDR0ICsgMzDCsCksIGxpc3QgdGhlIGZvdXIgcXVhbnRpdGllcyB5b3Ugc2hvdWxkIGlkZW50aWZ5IGZpcnN0IGJlZm9yZSBkcmF3aW5nIHRoZSBza2V0Y2gsIGFuZCBnaXZlIHRoZSBudW1lcmljYWwgdmFsdWUgb2YgZWFjaC4iLCJpZGVhbF9hbnN3ZXIiOiJUaGUgZm91ciBxdWFudGl0aWVzIGFyZTogKDEpIEFtcGxpdHVkZSBzY2FsZSBBID0gMywgKDIpIFRpbWUgY29uc3RhbnQgz4QgPSAxL2EgPSAxLzEgPSAxIHMsICgzKSBQZXJpb2QgVCA9IDLPgC/PieKCgCA9IDLPgC80ID0gz4AvMiDiiYggMS41NyBzLCAoNCkgUGhhc2Ugc2hpZnQgzrggPSArMzDCsCwgd2hpY2ggaXMgYSBwaGFzZSBhZHZhbmNlIGNvcnJlc3BvbmRpbmcgdG8gYSB0aW1lIHNoaWZ0IG9mICgzMC8zNjApIMOXICjPgC8yKSDiiYggMC4xMyBzIHRvIHRoZSBsZWZ0LiIsImdyYWRpbmdfcnVicmljIjpbIk11c3QgaWRlbnRpZnkgYW1wbGl0dWRlIHNjYWxlIEEgPSAzIiwiTXVzdCBpZGVudGlmeSB0aW1lIGNvbnN0YW50IM+EID0gMSBzIChmcm9tIGEgPSAxKSIsIk11c3QgaWRlbnRpZnkgcGVyaW9kIFQgPSDPgC8yIChvciBlcXVpdmFsZW50IGRlY2ltYWwpIiwiTXVzdCBjb3JyZWN0bHkgc3RhdGUgcGhhc2UgaW5mb3JtYXRpb24gYXMgKzMwwrAgb3IgZGVzY3JpYmUgaXQgYXMgYSBwaGFzZSBhZHZhbmNlIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBxdWVzdGlvbiBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCBrbm93cyB0aGUgZm91ci1zdGVwIHNldHVwIGJlZm9yZSBza2V0Y2hpbmcsIHJhdGhlciB0aGFuIGp1bXBpbmcgc3RyYWlnaHQgaW50byBkcmF3aW5nIHdpdGhvdXQgYSBwbGFuLiIsImhpbnQiOiJXb3JrIGxlZnQgdG8gcmlnaHQgdGhyb3VnaCB0aGUgZm9ybXVsYTogdGhlIGZyb250IGNvbnN0YW50IGdpdmVzIEEsIHRoZSBleHBvbmVudGlhbCBnaXZlcyDPhCwgdGhlIGNvc2luZSBmcmVxdWVuY3kgZ2l2ZXMgVCwgYW5kIHRoZSBjb3NpbmUgcGhhc2UgZ2l2ZXMgdGhlIHNoaWZ0LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfV19" style="display:none;"></div>%%KC_END%%
