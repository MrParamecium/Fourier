# Signal Energy and Power

> **Section Objective:** Learn two standard ways to measure the "size" of a signal, know when to use each one, and apply them confidently on exams.

---

How can a single number capture the size of a signal that is constantly changing? Amplitude alone is not enough — a brief loud burst and a quiet hum that lasts forever are very different, yet they might share the same peak value.

This section introduces two standard measures: **signal energy** and **signal power**. The key decision rule you will use throughout is straightforward: if a signal dies out as time goes to infinity, reach for **energy**; if the signal persists indefinitely — especially if it is periodic — reach for **power**.

This classification step matters on exams because students are frequently tested on choosing the right measure before computing anything. Pick the wrong one and the integral either diverges or gives a misleading result.

By the end of this section you will have a step-by-step procedure, one fully worked example, and a clear connection between power and the **rms** (root-mean-square) value you will encounter throughout the course.

## 1. Energy vs. Power: The Core Classification Rule

Before writing down any formula, it helps to understand what each measure is actually doing.

**Amplitude alone is not enough** to describe a signal's size, because duration matters just as much. A signal can be very strong for a very short time, or modest in strength but active forever — these are fundamentally different situations that call for different measures.

- **Energy** accumulates the squared magnitude of the signal over all time. It is the right measure when the signal eventually fades to zero, because the total accumulated area under |x(t)|² is then finite.
- **Power** averages the squared magnitude over a very long time. It is the right measure when the signal never dies out — especially for periodic signals — because the total energy would be infinite, but the long-run average is well-defined and finite.

### CLASSIFICATION HEURISTIC

| Signal behavior as \|t\| → ∞ | Preferred measure |
|-------------------------------|-------------------|
| x(t) → 0 (signal decays)     | Energy            |
| x(t) does not → 0 (persists) | Power             |

### COMMON MISTAKE

Do **not** attempt to compute both energy and power without first deciding which one makes sense. For a periodic sinusoid, energy is infinite — computing it gives no useful information. For a decaying pulse, power is zero — equally uninformative. **Classify first, then compute.**

$$E_x = \int_{-\infty}^{\infty} |x(t)|^2\,dt \qquad \text{and} \qquad P_x = \lim_{T\to\infty}\frac{1}{T}\int_{-T/2}^{T/2}|x(t)|^2\,dt$$
*Energy sums the squared magnitude of the signal over all time — every moment contributes, and the total tells you how much "area" the signal accumulates. Power takes that same squared magnitude but averages it over a very long symmetric window, capturing the signal's sustained intensity rather than its total accumulation.*

![Figure 1.1](/figures/page-066-figure_1_1-1.png)
*The top signal decays toward zero and is naturally characterized by its finite total energy, while the bottom signal persists indefinitely and is naturally characterized by its finite average power.*

## 2. How to Compute the Right Measure

Follow this four-step procedure on every exam problem involving signal size.

**Step 1 — Classify the long-time behavior.** Does x(t) approach 0 as |t| → ∞? If yes, it is likely an energy signal. If it persists or repeats, it is likely a power signal.

**Step 2 — Choose energy or power.** Do not skip this step. Write down which measure you are computing and why.

**Step 3 — Evaluate the integral carefully.** Square the signal first (use |x(t)|²), then split the integral across any regions where the formula changes.

**Step 4 — If the signal is periodic**, replace the infinite-time average with an average over exactly one period T₀. The result is the same, but the integral is far easier.

---

### WORKED EXAMPLE (Textbook Example 1.1a)

Let x(t) be defined as:

$$x(t) = \begin{cases} 2, & -1 \le t \le 0 \\ 2e^{-t/2}, & t \ge 0 \\ 0, & \text{otherwise} \end{cases}$$

**Step 1:** As t → ∞, the decaying exponential 2e^{−t/2} → 0. The signal dies out. ✓ Energy signal.

**Step 2:** Compute E_x.

**Step 3:** Square the signal and split the integral:

$$E_x = \int_{-1}^{0} |2|^2\,dt + \int_{0}^{\infty} |2e^{-t/2}|^2\,dt$$

$$= \int_{-1}^{0} 4\,dt + \int_{0}^{\infty} 4e^{-t}\,dt$$

$$= 4(1) + 4\left[-e^{-t}\right]_0^{\infty} = 4 + 4(0 - (-1)) = 4 + 4 = 8$$

**Result:** E_x = 8 (in appropriate units).

Since this signal decays to zero, its average power P_x = 0 — a correct but uninformative result, which is why energy is the preferred measure here.

![Fig. 1.2](/figures/page-067-fig_12-1.png)
*These two textbook signals illustrate the classification in action: the decaying signal on the left yields a finite, meaningful energy, while the periodic signal on the right yields infinite energy but a finite, meaningful average power.*

## 3. Periodic Signals, Sinusoids, and RMS

A periodic signal repeats the same waveform forever. Because it never dies out, its total energy over all time is infinite — energy is not a useful measure. Instead, we use **average power**, which remains finite and well-defined.

### PERIODIC SIGNAL SHORTCUT

For any periodic signal with period T₀, you do not need to integrate over all time. Average over **one period** only:

$$P_x = \frac{1}{T_0}\int_{t_0}^{t_0 + T_0} |x(t)|^2\,dt$$

The starting point t₀ can be anything — the result is the same for any full period.

### MEMORIZE THESE STANDARD RESULTS

| Signal | Power | RMS |
|--------|-------|-----|
| C cos(ω₀t + θ) | C²/2 | C/√2 |
| Constant C | C² | \|C\| |
| D e^{jω₀t} | \|D\|² | \|D\| |

**RMS (root-mean-square)** is simply the square root of power: x_rms = √P_x. It tells you the equivalent constant level that would deliver the same average power.

### CAUTION: SUMS OF SINUSOIDS

When a signal is a sum of sinusoids with **distinct frequencies**, the powers add cleanly:

$$P_{x_1 + x_2} = P_{x_1} + P_{x_2} \quad (\text{distinct frequencies only})$$

This works because the cross-term averages to zero over a long time. However, if two components share the **same frequency**, their cross-term does not vanish — you must combine those terms into a single sinusoid first, then compute power.

$$P_x = \frac{1}{T_0}\int_{t_0}^{t_0+T_0}|x(t)|^2\,dt, \qquad x(t)=C\cos(\omega_0 t+\theta)\Rightarrow P_x=\frac{C^2}{2}, \; x_{\mathrm{rms}}=\frac{C}{\sqrt{2}}$$
*For a periodic signal, the infinite-time average collapses to a simple average over one period T₀ — a much easier integral that gives the same result. Once you have the power, rms is just its square root, giving you a single positive number that represents the signal's effective constant-equivalent level.*

---
**📌 Key Takeaways**
- If a signal decays to zero as |t| → ∞, use energy; if it persists or is periodic, use average power.
- For periodic signals, compute power by averaging |x(t)|² over exactly one period — no infinite limits needed.
- RMS equals the square root of average power; a sinusoid of amplitude C has rms = C/√2.

*In the next section we will continue building the basic language used to describe signals and systems.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImtwX2NsYXNzaWZpY2F0aW9uIiwibGFiZWwiOiJDbGFzc2lmeSB3aGV0aGVyIGVuZXJneSBvciBwb3dlciBpcyB0aGUgc3VpdGFibGUgbWVhc3VyZSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwX2NsYXNzaWZpY2F0aW9uX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJBIGNvbnRpbnVvdXMtdGltZSBzaWduYWwgeCh0KSB0ZW5kcyB0byAwIGFzIHx0fCBnb2VzIHRvIGluZmluaXR5LiBXaGF0IGlzIHVzdWFsbHkgdGhlIG1vc3Qgc3VpdGFibGUgbWVhc3VyZSBvZiBpdHMgc2l6ZT8iLCJvcHRpb25zIjpbIkEuIEF2ZXJhZ2UgcG93ZXIgb25seSIsIkIuIEVuZXJneSIsIkMuIE5laXRoZXIgZW5lcmd5IG5vciBwb3dlciBjYW4gYmUgZGVmaW5lZCIsIkQuIHJtcyBvbmx5Il0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiQSBzaWduYWwgdGhhdCBkaWVzIG91dCBvdmVyIHRpbWUgaXMgdHlwaWNhbGx5IGp1ZGdlZCBieSBpdHMgdG90YWwgYWNjdW11bGF0ZWQgc3F1YXJlZCBtYWduaXR1ZGUsIG5hbWVseSBlbmVyZ3kuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiUG93ZXIgaXMgdXN1YWxseSB0aGUgYmV0dGVyIG1lYXN1cmUgZm9yIHNpZ25hbHMgdGhhdCBwZXJzaXN0IGluZGVmaW5pdGVseSwgZXNwZWNpYWxseSBwZXJpb2RpYyBvbmVzLiIsIkMiOiJFbmVyZ3kgaXMgb2Z0ZW4gd2VsbCBkZWZpbmVkIGZvciBkZWNheWluZyBzaWduYWxzLiIsIkQiOiJybXMgaXMgZGVyaXZlZCBmcm9tIHBvd2VyLCBub3QgYSBzZXBhcmF0ZSBwcmltYXJ5IGNsYXNzaWZpY2F0aW9uLiJ9LCJoaW50IjoiQXNrIHdoZXRoZXIgdGhlIHNpZ25hbCBmYWRlcyBhd2F5IG9yIGtlZXBzIGdvaW5nIGZvcmV2ZXIuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3BfY2xhc3NpZmljYXRpb25fcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHN0YXRlbWVudCBpcyBtb3N0IGFjY3VyYXRlIGZvciBhIG5vbnplcm8gcGVyaW9kaWMgc2lnbmFsPyIsIm9wdGlvbnMiOlsiQS4gSXQgdHlwaWNhbGx5IGhhcyBmaW5pdGUgZW5lcmd5IGFuZCB6ZXJvIHBvd2VyIiwiQi4gSXQgdHlwaWNhbGx5IGhhcyBpbmZpbml0ZSBlbmVyZ3kgYW5kIGZpbml0ZSBwb3dlciIsIkMuIEl0IGFsd2F5cyBoYXMgZmluaXRlIGVuZXJneSBhbmQgZmluaXRlIHBvd2VyIiwiRC4gSXQgaGFzIHplcm8gZW5lcmd5IGJlY2F1c2UgcG9zaXRpdmUgYW5kIG5lZ2F0aXZlIHBhcnRzIGNhbmNlbCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkEgbm9uemVybyBwZXJpb2RpYyBzaWduYWwgcmVwZWF0cyBmb3JldmVyLCBzbyB0b3RhbCBlbmVyZ3kgb3ZlciBhbGwgdGltZSBkaXZlcmdlcywgYnV0IGF2ZXJhZ2UgcG93ZXIgb3ZlciB0aW1lIGlzIGZpbml0ZS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIHJldmVyc2VzIHRoZSB1c3VhbCByZXN1bHQgZm9yIHBlcmlvZGljIHNpZ25hbHMuIiwiQyI6Ikl0cyBlbmVyZ3kgaXMgZ2VuZXJhbGx5IG5vdCBmaW5pdGUgYmVjYXVzZSB0aGUgc2lnbmFsIGxhc3RzIGZvcmV2ZXIuIiwiRCI6IkVuZXJneSB1c2VzIHx4KHQpfF4yLCBzbyBjYW5jZWxsYXRpb24gZG9lcyBub3QgaGFwcGVuLiJ9LCJoaW50IjoiVGhpbmsgYWJvdXQgd2hhdCBoYXBwZW5zIHdoZW4gdGhlIHdhdmVmb3JtIHJlcGVhdHMgZm9yZXZlci4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoicHl0aG9uX21hdHBsb3RsaWIgcGVyaW9kaWMgd2F2ZWZvcm0gc2tldGNoIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJrcF9lbmVyZ3lfY29tcHV0YXRpb24iLCJsYWJlbCI6IkNvbXB1dGUgc2lnbmFsIGVuZXJneSBmb3IgYSBkZWNheWluZyBvciB0aW1lLWxpbWl0ZWQgc2lnbmFsIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3BfZW5lcmd5X3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IDIgb24gLTEg4omkIHQg4omkIDAsIHgodCkgPSAyZV57LXQvMn0gZm9yIHQg4omlIDAsIGFuZCB4KHQpID0gMCBvdGhlcndpc2UsIHdoYXQgaXMgRV94PyIsIm9wdGlvbnMiOlsiQS4gNCIsIkIuIDYiLCJDLiA4IiwiRC4gMTIiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJFX3ggPSBpbnRlZ3JhbCBmcm9tIC0xIHRvIDAgb2YgNCBkdCBwbHVzIGludGVncmFsIGZyb20gMCB0byBpbmZpbml0eSBvZiA0ZV57LXR9IGR0ID0gNCArIDQgPSA4LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMga2VlcHMgb25seSB0aGUgZmlyc3QgaW50ZXJ2YWwgYW5kIGlnbm9yZXMgdGhlIGRlY2F5aW5nIHRhaWwuIiwiQiI6IlRoaXMgdW5kZXJjb3VudHMgdGhlIHNlY29uZCBpbnRlZ3JhbC4iLCJEIjoiVGhpcyBvdmVyY291bnRzIHRoZSB0b3RhbCBhcmVhIG9mIHx4KHQpfF4yLiJ9LCJoaW50IjoiU3F1YXJlIHRoZSBzaWduYWwgZmlyc3QsIHRoZW4gc3BsaXQgdGhlIGludGVncmFsIGFjcm9zcyB0aW1lIHJlZ2lvbnMuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoia3BfcGVyaW9kaWNfcG93ZXJfcm1zIiwibGFiZWwiOiJDb21wdXRlIHBvd2VyIGFuZCBybXMgZm9yIHBlcmlvZGljIHNpZ25hbHMgYW5kIHNpbnVzb2lkcyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwX3BlcmlvZGljX3Bvd2VyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJZiB4KHQpID0gQyBjb3Moz4nigoB0ICsgzrgpIHdpdGggz4nigoAg4omgIDAsIHdoYXQgYXJlIGl0cyBwb3dlciBhbmQgcm1zIHZhbHVlPyIsIm9wdGlvbnMiOlsiQS4gUG93ZXIgPSBDwrIsIHJtcyA9IEMiLCJCLiBQb3dlciA9IEPCsi8yLCBybXMgPSBDL+KImjIiLCJDLiBQb3dlciA9IEMvMiwgcm1zID0gQ8KyL+KImjIiLCJELiBQb3dlciA9IDAsIHJtcyA9IDAiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJBIHNpbnVzb2lkIG9mIGFtcGxpdHVkZSBDIGhhcyBhdmVyYWdlIHNxdWFyZWQgdmFsdWUgQ8KyLzIsIGFuZCBybXMgaXMgdGhlIHNxdWFyZSByb290IG9mIHBvd2VyLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoYXQgcmVzdWx0IGlzIGZvciBhIGNvbnN0YW50IHNpZ25hbCBvZiBhbXBsaXR1ZGUgQywgbm90IGEgc2ludXNvaWQuIiwiQyI6IlRoZSB1bml0cyBhbmQgZm9ybXVsYXMgYXJlIG1peGVkIHVwLiIsIkQiOiJBIG5vbnplcm8gc2ludXNvaWQgaGFzIG5vbnplcm8gcG93ZXIuIn0sImhpbnQiOiJNZW1vcml6ZSB0aGUgc3RhbmRhcmQgc2ludXNvaWQgcmVzdWx0OiBhdmVyYWdlIG9mIGNvc8KyIGlzIDEvMi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcF9wZXJpb2RpY19wb3dlcl9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBzaWduYWwgaGFzIGF2ZXJhZ2UgcG93ZXIgUF94ID0gOS4gV2hhdCBpcyBpdHMgcm1zIHZhbHVlPyIsIm9wdGlvbnMiOlsiQS4gODEiLCJCLiA5IiwiQy4gMyIsIkQuIDQuNSJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6InJtcyBpcyB0aGUgc3F1YXJlIHJvb3Qgb2YgcG93ZXIsIHNvIHhfcm1zID0gc3FydCg5KSA9IDMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBzcXVhcmVzIGluc3RlYWQgb2YgdGFraW5nIGEgc3F1YXJlIHJvb3QuIiwiQiI6IlRoaXMgY29uZnVzZXMgcG93ZXIgd2l0aCBybXMgZGlyZWN0bHkuIiwiRCI6IlRoZXJlIGlzIG5vIGRpdmlkZS1ieS0yIHJ1bGUgaGVyZS4ifSwiaGludCI6InJtcyBtZWFucyByb290LW1lYW4tc3F1YXJlLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoia3BfY29tcGxleF9leHBvbmVudGlhbF9hbmRfc3VtIiwibGFiZWwiOiJLbm93IHN0YW5kYXJkIHBvd2VyIHJlc3VsdHMgZm9yIGNvbXBsZXggZXhwb25lbnRpYWxzIGFuZCBzdW1zIG9mIHNpbnVzb2lkcyIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcF9jb21wbGV4X3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IEQgZV57as+J4oKAdH0sIHdoYXQgaXMgdGhlIHNpZ25hbCBwb3dlcj8iLCJvcHRpb25zIjpbIkEuIETCsiIsIkIuIHxEfCIsIkMuIHxEfMKyIiwiRC4gMCJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IkJlY2F1c2UgfGVee2rPieKCgHR9fCA9IDEsIHRoZSBzcXVhcmVkIG1hZ25pdHVkZSBvZiB0aGUgc2lnbmFsIGlzIGNvbnN0YW50IGFuZCBlcXVhbCB0byB8RHzCsi4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJEIG1heSBiZSBjb21wbGV4LCBzbyB0aGUgY29ycmVjdCBleHByZXNzaW9uIG11c3QgdXNlIG1hZ25pdHVkZS4iLCJCIjoiVGhhdCBpcyB0aGUgcm1zIHZhbHVlLCBub3QgdGhlIHBvd2VyLiIsIkQiOiJUaGUgc2lnbmFsIGhhcyBjb25zdGFudCBub256ZXJvIG1hZ25pdHVkZSB3aGVuIEQgaXMgbm9uemVyby4ifSwiaGludCI6IlJlbWVtYmVyIHRoYXQgY29tcGxleCBleHBvbmVudGlhbHMgcm90YXRlIGJ1dCBkbyBub3QgY2hhbmdlIG1hZ25pdHVkZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3Bfc3VtX3Nob3J0X2Fuc3dlciIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiV2h5IGlzIHRoZSBzdGF0ZW1lbnQgJ3RoZSBwb3dlciBvZiBhIHN1bSBvZiB0d28gc2ludXNvaWRzIGVxdWFscyB0aGUgc3VtIG9mIHRoZWlyIHBvd2Vycycgbm90IGF1dG9tYXRpY2FsbHkgdHJ1ZSBpbiBldmVyeSBjYXNlPyIsImlkZWFsX2Fuc3dlciI6Ikl0IGlzIHRydWUgd2hlbiB0aGUgc2ludXNvaWRzIGhhdmUgZGlzdGluY3QgZnJlcXVlbmNpZXMsIGJlY2F1c2UgdGhlIGNyb3NzLXRlcm0gYXZlcmFnZXMgdG8gemVybyBvdmVyIGEgbG9uZyB0aW1lLiBJZiB0aGUgZnJlcXVlbmNpZXMgYXJlIGlkZW50aWNhbCwgdGhlIGNyb3NzLXRlcm0gaW5jbHVkZXMgYSBjb25zdGFudCBwYXJ0IGFuZCBkb2VzIG5vdCB2YW5pc2gsIHNvIHRoZSBzaWduYWxzIG11c3QgYmUgY29tYmluZWQgY2FyZWZ1bGx5IGZpcnN0LiIsImdyYWRpbmdfcnVicmljIjpbIk11c3QgbWVudGlvbiB0aGUgY3Jvc3MtdGVybSBpbiB0aGUgc3F1YXJlZCBleHByZXNzaW9uIiwiTXVzdCBzdGF0ZSB0aGF0IGRpc3RpbmN0IGZyZXF1ZW5jaWVzIG1ha2UgdGhlIGNyb3NzLXRlcm0gYXZlcmFnZSB0byB6ZXJvIiwiTXVzdCBzdGF0ZSB0aGF0IGVxdWFsIGZyZXF1ZW5jaWVzIGFyZSB0aGUgZXhjZXB0aW9uIG9yIHJlcXVpcmUgY29tYmluaW5nIGZpcnN0Il0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCB1bmRlcnN0YW5kcyBhIGNvbW1vbiBleGFtIHRyYXAgaW5zdGVhZCBvZiBtZW1vcml6aW5nIGEgcnVsZSB0b28gYnJvYWRseS4iLCJoaW50IjoiRXhwYW5kIFt4MSh0KSArIHgyKHQpXcKyIGFuZCB0aGluayBhYm91dCB0aGUgcHJvZHVjdCB0ZXJtLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
