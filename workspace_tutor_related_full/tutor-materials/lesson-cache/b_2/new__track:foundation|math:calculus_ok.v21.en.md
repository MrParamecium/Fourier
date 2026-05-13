# B.2 Sinusoidal Signals

> **Section Objective:** Learn to read amplitude, frequency, period, and phase from a sinusoid expression, understand phase shift as a time shift, and combine cosine and sine terms into a single sinusoid.

---

Consider the signal **x(t) = 3 cos(2π·10t − 30°)**. Let's unpack it piece by piece.

- **x(t)** is the signal value at time t.
- **3** is the amplitude — the maximum height the wave reaches.
- **10** is the frequency in hertz — the wave completes 10 full cycles every second.
- **2π·10t − 30°** is the angle fed into cosine at each moment in time.
- **−30°** is the phase — it shifts the entire wave slightly in time.

The clean rule: **a sinusoid is fully described by three things — its size (amplitude), its speed of repetition (frequency), and its time offset (phase).**

This section matters because exam questions routinely ask you to read these three quantities correctly and to merge cosine and sine terms into one expression. Both skills are straightforward once the notation is familiar.

![Fig. B.6](/figures/page-017-fig__b_6-1.png)
*Three sinusoids are shown: (a) C cos ω₀t, (b) C sin ω₀t, and (c) C cos(ω₀t − 60°) — notice that the phase-shifted wave in (c) is simply the cosine in (a) slid to the right in time, with no change in height.*

## 1. Reading a Sinusoid

The standard form is **x(t) = C cos(ω₀t + θ)**.

Before defining each symbol, note one prerequisite: the expression **ω₀t + θ** inside the cosine is an angle — it grows as time passes, and cosine oscillates as that angle sweeps around the circle.

### SYMBOL DEFINITIONS

| Symbol | Name | What it measures |
|--------|------|------------------|
| C | Amplitude | Peak value of the wave |
| ω₀ | Radian frequency | Angle swept per second (radians/s) |
| t | Time | Independent variable (seconds) |
| θ | Phase | Starting angle offset at t = 0 |

### HOW REPETITION WORKS

Cosine repeats every time its angle increases by **2π**. So the signal repeats when:

ω₀(t + T₀) + θ = ω₀t + θ + 2π

This means ω₀T₀ = 2π, which gives us the three key relationships:

- **T₀ = 1/f₀** — period is the reciprocal of frequency
- **ω₀ = 2πf₀** — radian frequency scales ordinary frequency by 2π
- **ω₀ = 2π/T₀** — radian frequency is 2π divided by the period

#### Warning

Do not mix degrees and radians in the same expression. If θ is in degrees, convert to radians before computing, or keep everything in degrees consistently.

### QUICK CHECK EXAMPLE

Given **f₀ = 50 Hz**, find T₀ and ω₀:

- T₀ = 1/f₀ = 1/50 = **0.02 s**
- ω₀ = 2πf₀ = 2π × 50 = **100π ≈ 314.16 rad/s**

$$x(t) = C\cos(\omega_0 t + \theta), \quad T_0 = \frac{1}{f_0}, \quad \omega_0 = 2\pi f_0 = \frac{2\pi}{T_0}$$
*This single sinusoid is described by four quantities. **C** (amplitude) tells you how tall the wave is. **f₀** in hertz tells you how many complete cycles occur per second. **T₀** in seconds tells you how long one cycle takes — it is simply the reciprocal of f₀. **ω₀** in radians per second is the version of frequency used inside the cosine argument; it equals 2π times f₀ because one full cycle corresponds to 2π radians.*

## 2. Phase Shift and the Cosine-Sine Relationship

The clean rule: **changing the phase θ shifts the entire graph left or right in time — it does not change the amplitude or frequency.**

### HOW SHIFT DIRECTION WORKS

Picture the cosine wave as a physical object on a timeline:

- A **positive** phase (e.g., +60°) slides the graph to the **left** — the wave arrives earlier. This is called an **advance**.
- A **negative** phase (e.g., −60°) slides the graph to the **right** — the wave arrives later. This is called a **delay**.

Example: **C cos(ω₀t − 60°)** has a minus sign, so the graph is delayed — it is the same cosine wave, just shifted to the right by 60° worth of time.

### COSINE AND SINE ARE THE SAME WAVE

Sine is simply cosine delayed by exactly one quarter of a cycle (90°):

> **C cos(ω₀t − π/2) = C sin(ω₀t)**

In plain language: **sin(ω₀t) lags cos(ω₀t) by 90°** — it arrives one quarter-cycle later. Equivalently, **cos(ω₀t) leads sin(ω₀t) by 90°** — it arrives one quarter-cycle earlier.

This connection is used constantly when combining sinusoids.

$$C\cos(\omega_0 t - \pi/2) = C\sin(\omega_0 t), \qquad C\sin(\omega_0 t + \pi/2) = C\cos(\omega_0 t)$$
*Cosine and sine are the same basic wave shape — one is just a shifted version of the other. Specifically, sine **lags** cosine by a quarter-cycle (π/2 radians): sine reaches its peak 90° later than cosine does. Equivalently, cosine **leads** sine by a quarter-cycle: cosine peaks 90° earlier. 'Lag' means arriving later in time; 'lead' means arriving earlier. These two identities are just two ways of stating the same quarter-cycle relationship.*

![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*Each sinusoid is represented as an arrow (phasor) in the complex plane — the arrow's length is the amplitude and its angle is the phase. Adding two same-frequency sinusoids becomes adding two arrows tip-to-tail; the resulting arrow gives the amplitude and phase of the single equivalent sinusoid directly.*

## 3. Adding Sinusoids with the Same Frequency

The clean rule: **a cos(ω₀t) + b sin(ω₀t) can always be rewritten as one cosine C cos(ω₀t + θ).**

### PREREQUISITE — FREQUENCY MUST MATCH

This shortcut only works when both terms share the **exact same frequency** ω₀. If the frequencies differ (e.g., cos(3t) + sin(4t)), you cannot combine them into a single sinusoid. Always check the frequency first.

### WHAT THE SYMBOLS MEAN

- **a** — coefficient of the cosine term
- **b** — coefficient of the sine term
- **C** — amplitude of the resulting single sinusoid
- **θ** — phase of the resulting single sinusoid

### THE FORMULAS

The new amplitude and phase are:

$$C = \sqrt{a^2 + b^2}, \qquad \theta = \tan^{-1}\!\left(\frac{-b}{a}\right)$$

These come from treating **a − jb** as a complex number in polar form: C is its magnitude and θ is its angle.

#### Warning

The inverse tangent formula alone can give the **wrong quadrant**. A calculator's arctan always returns a value between −90° and +90°, but the true angle may be in the second or third quadrant. Always check the signs of a and −b to confirm the quadrant.

### WORKED EXAMPLE

Find C and θ for **x(t) = −3 cos(ω₀t) + 4 sin(ω₀t)**.

Here a = −3 and b = 4, so −b = −4.

**Step 1 — Amplitude:**

C = √(a² + b²) = √((−3)² + 4²) = √(9 + 16) = √25 = **5**

**Step 2 — Phase:**

The phasor has horizontal part a = −3 and vertical part −b = −4. Both components are negative, so the phasor lies in the **third quadrant**.

Raw arctan: tan⁻¹(−4/−3) = tan⁻¹(4/3) ≈ 53.1°

But 53.1° is in the first quadrant. Adjusting to the third quadrant:

θ = 53.1° − 180° = **−126.9°**

**Result:** x(t) = −3 cos(ω₀t) + 4 sin(ω₀t) = **5 cos(ω₀t − 126.9°)**

$$a\cos \omega_0 t + b\sin \omega_0 t = C\cos(\omega_0 t + \theta), \quad C = \sqrt{a^2+b^2}, \quad \theta = \tan^{-1}\!\left(\frac{-b}{a}\right)$$
*Think of the pair (a, −b) as a point in the complex plane. **C** is the straight-line distance from the origin to that point — the length of the phasor arrow — computed by the Pythagorean formula. **θ** is the angle that arrow makes with the positive real axis. One important caution: the inverse tangent formula gives the correct numerical ratio but cannot distinguish between a point in the first quadrant and the diagonally opposite point in the third quadrant. Always inspect the signs of a and −b separately to confirm which quadrant the phasor actually sits in before accepting the angle from your calculator.*

---

**📌 Key Takeaways**
- A sinusoid x(t) = C cos(ω₀t + θ) is fully described by amplitude C, frequency ω₀, and phase θ.
- Negative phase shifts the wave right (delay); positive phase shifts it left (advance).
- Same-frequency cosine and sine terms combine into one sinusoid: C = √(a²+b²), θ = tan⁻¹(−b/a).

*In the next section we will introduce phasors as a systematic tool for analyzing sinusoidal circuits, building directly on the amplitude-and-phase representation developed here.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlYWRfc2ludXNvaWRfcGFyYW1ldGVycyIsImxhYmVsIjoiUmVhZGluZyBhbXBsaXR1ZGUsIGZyZXF1ZW5jeSwgcGVyaW9kLCBhbmQgcGhhc2UgZnJvbSBhIHNpbnVzb2lkIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IDQgY29zKDLPgMK3MjB0ICsgMzDCsCksIHdoaWNoIHN0YXRlbWVudCBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gQW1wbGl0dWRlID0gMjAsIGZyZXF1ZW5jeSA9IDQgSHoiLCJCLiBBbXBsaXR1ZGUgPSA0LCBmcmVxdWVuY3kgPSAyMCBIeiIsIkMuIEFtcGxpdHVkZSA9IDQsIHBlcmlvZCA9IDIwIHMiLCJELiBQaGFzZSA9IDLPgCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBjb2VmZmljaWVudCA0IGlzIHRoZSBhbXBsaXR1ZGUg4oCUIGl0IHNpdHMgb3V0c2lkZSB0aGUgY29zaW5lLiBUaGUgZmFjdG9yIDLPgMK3MjB0IG1lYW5zIGbigoAgPSAyMCBIeiwgYmVjYXVzZSB0aGUgc3RhbmRhcmQgZm9ybSBpcyAyz4Bm4oKAdC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIHN3YXBzIGFtcGxpdHVkZSBhbmQgZnJlcXVlbmN5IOKAlCA0IGlzIHRoZSBhbXBsaXR1ZGUsIDIwIGlzIHRoZSBmcmVxdWVuY3kuIiwiQyI6IklmIGZyZXF1ZW5jeSBpcyAyMCBIeiwgcGVyaW9kIGlzIFTigoAgPSAxLzIwID0gMC4wNSBzLCBub3QgMjAgcy4iLCJEIjoiVGhlIHBoYXNlIGlzICszMMKwLCBub3QgMs+ALiBUaGUgMs+AIGlzIHBhcnQgb2YgdGhlIGZyZXF1ZW5jeSB0ZXJtLCBub3QgdGhlIHBoYXNlLiJ9LCJoaW50IjoiTG9vayBvdXRzaWRlIGNvc2luZSBmb3IgYW1wbGl0dWRlIGFuZCBpbnNpZGUgY29zaW5lIGZvciBmcmVxdWVuY3kgYW5kIHBoYXNlLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBzaW51c29pZCBoYXMgZnJlcXVlbmN5IGbigoAgPSA1MCBIei4gV2hhdCBpcyBpdHMgcGVyaW9kPyIsIm9wdGlvbnMiOlsiQS4gNTAgcyIsIkIuIDEwMCBzIiwiQy4gMC4wMiBzIiwiRC4gMzE0IHMiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJVc2UgVOKCgCA9IDEvZuKCgCA9IDEvNTAgPSAwLjAyIHMuIFBlcmlvZCBhbmQgZnJlcXVlbmN5IGFyZSByZWNpcHJvY2FscyBvZiBlYWNoIG90aGVyLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoYXQgY29waWVzIHRoZSBmcmVxdWVuY3kgdmFsdWUgaW50byBzZWNvbmRzIHdpdGhvdXQgdGFraW5nIHRoZSByZWNpcHJvY2FsLiIsIkIiOiIxMDAgaXMgMiDDlyA1MCwgd2hpY2ggaGFzIG5vIGRpcmVjdCBtZWFuaW5nIGhlcmUuIiwiRCI6IjMxNCDiiYggMs+AIMOXIDUwID0gz4nigoAsIHRoZSByYWRpYW4gZnJlcXVlbmN5IOKAlCBub3QgdGhlIHBlcmlvZC4ifSwiaGludCI6IlBlcmlvZCBpcyB0aGUgcmVjaXByb2NhbCBvZiBmcmVxdWVuY3k6IFTigoAgPSAxL2bigoAuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJwaGFzZV9zaGlmdF9pbnRlcnByZXRhdGlvbiIsImxhYmVsIjoiSW50ZXJwcmV0aW5nIHBoYXNlIHNoaWZ0LCBsZWFkLCBhbmQgbGFnIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJDb21wYXJlZCB3aXRoIEMgY29zKM+J4oKAdCksIHdoYXQgZG9lcyBDIGNvcyjPieKCgHQg4oiSIDYwwrApIHJlcHJlc2VudD8iLCJvcHRpb25zIjpbIkEuIEEgd2F2ZSBzaGlmdGVkIHJpZ2h0IChkZWxheWVkKSIsIkIuIEEgd2F2ZSBzaGlmdGVkIGxlZnQgKGFkdmFuY2VkKSIsIkMuIEEgd2F2ZSB3aXRoIGxhcmdlciBhbXBsaXR1ZGUiLCJELiBBIHdhdmUgd2l0aCBkaWZmZXJlbnQgZnJlcXVlbmN5Il0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiQSBuZWdhdGl2ZSBwaGFzZSBpbnNpZGUgY29zaW5lIGNvcnJlc3BvbmRzIHRvIGEgZGVsYXkg4oCUIHRoZSB3YXZlIHJlYWNoZXMgaXRzIHBlYWsgbGF0ZXIgaW4gdGltZSwgc28gdGhlIGdyYXBoIHNoaWZ0cyB0byB0aGUgcmlnaHQuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiQSBsZWZ0d2FyZCBzaGlmdCAoYWR2YW5jZSkgd291bGQgcmVxdWlyZSBhIHBvc2l0aXZlIHBoYXNlLCBzdWNoIGFzICs2MMKwLiIsIkMiOiJUaGUgYW1wbGl0dWRlIGlzIHN0aWxsIEMg4oCUIHBoYXNlIGRvZXMgbm90IGFmZmVjdCBoZWlnaHQuIiwiRCI6IlRoZSBmcmVxdWVuY3kgdGVybSDPieKCgCBpcyBjb21wbGV0ZWx5IHVuY2hhbmdlZC4ifSwiaGludCI6Ik1pbnVzIHBoYXNlIG1lYW5zIGRlbGF5IGZvciB0aGlzIHN0YW5kYXJkIGZvcm0g4oCUIHRoZSB3YXZlIGFycml2ZXMgbGF0ZXIuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6IndhdmVfc2hpZnRfcGxvdCIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggaWRlbnRpdHkgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIEMgY29zKM+J4oKAdCArIM+ALzIpID0gQyBzaW4oz4nigoB0KSIsIkIuIEMgY29zKM+J4oKAdCDiiJIgz4AvMikgPSBDIHNpbijPieKCgHQpIiwiQy4gQyBzaW4oz4nigoB0IOKIkiDPgC8yKSA9IEMgY29zKM+J4oKAdCkiLCJELiBDIHNpbijPieKCgHQpIGxhZ3MgQyBjb3Moz4nigoB0KSBieSAxODDCsCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkNvc2luZSBkZWxheWVkIGJ5IGEgcXVhcnRlci1jeWNsZSAoz4AvMikgYmVjb21lcyBzaW5lOiBDIGNvcyjPieKCgHQg4oiSIM+ALzIpID0gQyBzaW4oz4nigoB0KS4gVGhlIG1pbnVzIHNpZ24gaXMgdGhlIGtleSDigJQgaXQgcmVwcmVzZW50cyB0aGUgZGVsYXkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlIHNpZ24gaXMgd3JvbmcuIEFkZGluZyDPgC8yIGFkdmFuY2VzIGNvc2luZSwgZ2l2aW5nIOKIknNpbiwgbm90ICtzaW4uIiwiQyI6IlRoZSBjb3JyZWN0IHJlbGF0aW9uIGlzIEMgc2luKM+J4oKAdCArIM+ALzIpID0gQyBjb3Moz4nigoB0KSwgbm90IG1pbnVzIM+ALzIuIiwiRCI6IlRoZSBsYWcgYmV0d2VlbiBzaW5lIGFuZCBjb3NpbmUgaXMgOTDCsCAoz4AvMiksIG5vdCAxODDCsC4ifSwiaGludCI6IlRoaW5rIHF1YXJ0ZXItY3ljbGUgZGVsYXkgKM+ALzIpLCBub3QgaGFsZi1jeWNsZSAoz4ApLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiYWRkaXRpb25fb2Zfc2FtZV9mcmVxdWVuY3lfc2ludXNvaWRzIiwibGFiZWwiOiJDb21iaW5pbmcgYSBjb3NpbmUgdGVybSBhbmQgYSBzaW5lIHRlcm0gaW50byBvbmUgc2ludXNvaWQiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGV4cHJlc3Npb24gY2FuIGJlIHJld3JpdHRlbiBhcyBhIHNpbmdsZSBzaW51c29pZCB1c2luZyB0aGUgc2VjdGlvbiBydWxlIGRpcmVjdGx5PyIsIm9wdGlvbnMiOlsiQS4gMiBjb3MoM3QpICsgNSBzaW4oNHQpIiwiQi4gMiBjb3Moz4nigoB0KSArIDUgc2luKM+J4oKAdCkiLCJDLiAyIGNvcyjPieKCgHQpICsgNSBjb3MoMs+J4oKAdCkiLCJELiAyIHNpbijPieKCgHQpICsgNSBzaW4oM8+J4oKAdCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgc2hvcnRjdXQgYXBwbGllcyBvbmx5IHdoZW4gYm90aCBzaW51c29pZHMgc2hhcmUgdGhlIHNhbWUgZnJlcXVlbmN5LiBJbiBvcHRpb24gQiwgYm90aCB0ZXJtcyBoYXZlIGZyZXF1ZW5jeSDPieKCgCwgc28gdGhleSBjYW4gYmUgY29tYmluZWQuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlIGZyZXF1ZW5jaWVzIDMgcmFkL3MgYW5kIDQgcmFkL3MgYXJlIGRpZmZlcmVudCDigJQgdGhlIHNob3J0Y3V0IGRvZXMgbm90IGFwcGx5LiIsIkMiOiJUaGUgZnJlcXVlbmNpZXMgz4nigoAgYW5kIDLPieKCgCBhcmUgZGlmZmVyZW50IOKAlCB0aGV5IGNhbm5vdCBiZSBtZXJnZWQuIiwiRCI6IlRoZSBmcmVxdWVuY2llcyDPieKCgCBhbmQgM8+J4oKAIGFyZSBkaWZmZXJlbnQg4oCUIHRoZXkgY2Fubm90IGJlIG1lcmdlZC4ifSwiaGludCI6IkNoZWNrIHRoZSBmcmVxdWVuY3kgaW5zaWRlIGVhY2ggc2ludXNvaWQgZmlyc3Qg4oCUIHRoZXkgbXVzdCBiZSBpZGVudGljYWwuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHgodCkgPSDiiJIzIGNvcyjPieKCgHQpICsgNCBzaW4oz4nigoB0KSwgd2hhdCBpcyB0aGUgYW1wbGl0dWRlIEMgb2YgdGhlIGVxdWl2YWxlbnQgc2luZ2xlIHNpbnVzb2lkPyIsIm9wdGlvbnMiOlsiQS4gMSIsIkIuIDUiLCJDLiA3IiwiRC4gMjUiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJVc2UgQyA9IOKImihhwrIgKyBiwrIpID0g4oiaKCjiiJIzKcKyICsgNMKyKSA9IOKImig5ICsgMTYpID0g4oiaMjUgPSA1LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IjEgPSDiiJIzICsgNCwgYnV0IHlvdSBtdXN0IG5vdCBhZGQgdGhlIGNvZWZmaWNpZW50cyBkaXJlY3RseSDigJQgdXNlIHRoZSBzcXVhcmUtcm9vdCBmb3JtdWxhLiIsIkMiOiI3ID0gfOKIkjN8ICsgfDR8LCBidXQgYWRkaW5nIGFic29sdXRlIHZhbHVlcyBpcyBub3QgdGhlIGNvcnJlY3QgZm9ybXVsYS4iLCJEIjoiMjUgaXMgQ8KyLCBub3QgQy4gVGFrZSB0aGUgc3F1YXJlIHJvb3QgdG8gZ2V0IHRoZSBhbXBsaXR1ZGUuIn0sImhpbnQiOiJVc2UgdGhlIFB5dGhhZ29yZWFuLXN0eWxlIG1hZ25pdHVkZSBmb3JtdWxhOiBDID0g4oiaKGHCsiArIGLCsikuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EzIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IOKIkjMgY29zKM+J4oKAdCkgKyA0IHNpbijPieKCgHQpLCB3aGljaCBwaGFzZSBhbmdsZSBtYXRjaGVzIHRoZSB0ZXh0Ym9vayBleGFtcGxlPyIsIm9wdGlvbnMiOlsiQS4gNTMuMcKwIiwiQi4g4oiSNTMuMcKwIiwiQy4g4oiSMTI2LjnCsCIsIkQuIDEyNi45wrAiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJIZXJlIGEgPSDiiJIzIGFuZCDiiJJiID0g4oiSNC4gQm90aCBjb21wb25lbnRzIGFyZSBuZWdhdGl2ZSwgcGxhY2luZyB0aGUgcGhhc29yIGluIHRoZSB0aGlyZCBxdWFkcmFudC4gVGhlIHJhdyBhcmN0YW4gZ2l2ZXMgNTMuMcKwLCBidXQgYWRqdXN0aW5nIHRvIHRoZSB0aGlyZCBxdWFkcmFudDogNTMuMcKwIOKIkiAxODDCsCA9IOKIkjEyNi45wrAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiNTMuMcKwIGlzIHRoZSBmaXJzdC1xdWFkcmFudCBhcmN0YW4gcmVzdWx0IOKAlCBpdCBpZ25vcmVzIHRoZSBuZWdhdGl2ZSBzaWducyBvZiBib3RoIGNvbXBvbmVudHMuIiwiQiI6IuKIkjUzLjHCsCBwbGFjZXMgdGhlIHBoYXNvciBpbiB0aGUgZm91cnRoIHF1YWRyYW50LCBidXQgYm90aCBjb21wb25lbnRzIGFyZSBuZWdhdGl2ZSwgc28gdGhlIHRoaXJkIHF1YWRyYW50IGlzIGNvcnJlY3QuIiwiRCI6IjEyNi45wrAgaXMgaW4gdGhlIHNlY29uZCBxdWFkcmFudCwgd2hpY2ggd291bGQgcmVxdWlyZSBhIHBvc2l0aXZlIGEgYW5kIG5lZ2F0aXZlIOKIkmIuIn0sImhpbnQiOiJEbyBub3QgdHJ1c3QgYXJjdGFuIGJsaW5kbHkg4oCUIGNoZWNrIHRoZSBzaWducyBvZiBhIGFuZCDiiJJiIHRvIGZpbmQgdGhlIGNvcnJlY3QgcXVhZHJhbnQuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6InBoYXNvcl9kaWFncmFtIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19XX0=" style="display:none;"></div>%%KC_END%%
