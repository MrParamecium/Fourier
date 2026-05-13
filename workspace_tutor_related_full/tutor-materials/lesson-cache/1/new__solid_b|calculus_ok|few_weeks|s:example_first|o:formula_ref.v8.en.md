# Signals, Systems, Energy, and Power

> **Section Objective:** Understand what signals and systems are, learn to classify a signal as energy-type or power-type, and compute energy, power, and RMS for standard signal forms.

---

## 1. Why Do We Need Two Different Measures?

Imagine two very different signals. The first is a short radar pulse — it fires, does its job, and dies away completely. The second is a power-line sinusoid that has been running since the grid was switched on and will keep running indefinitely.

For the pulse, it makes sense to ask: *how much total effect did it accumulate?* That is **energy**. For the never-ending sinusoid, total accumulated effect is infinite and useless as a number — instead you ask: *what is its ongoing average strength?* That is **power**.

A **signal** is any quantity that carries information as a function of an independent variable — usually time in this course. A **system** takes an input signal and produces an output signal.

### EXAM TIP

Exam problems almost always require you to **classify first** — energy signal or power signal — before you calculate anything.

#### Formula Reference

| Measure | Formula |
|---|---|
| Energy | $E_x = \int_{-\infty}^{\infty} \|x(t)\|^2\,dt$ |
| Power | $P_x = \lim_{T\to\infty}\frac{1}{T}\int_{-T/2}^{T/2}\|x(t)\|^2\,dt$ |

$$E_x = \int_{-\infty}^{\infty} |x(t)|^2\,dt \qquad P_x = \lim_{T\to\infty}\frac{1}{T}\int_{-T/2}^{T/2}|x(t)|^2\,dt$$
*Energy measures the total accumulated squared magnitude of a signal over all time, while power measures its long-run average squared magnitude — the right tool depends on whether the signal dies out or persists.*

![Figure 1.1](/figures/page-066-figure_1_1-1.png)
*The top signal decays to zero and is naturally characterized by its finite total energy, while the bottom signal persists indefinitely and is naturally characterized by its finite average power.*

---

## 2. Energy Signals vs. Power Signals

Start with a concrete picture. If $x(t)$ is a pulse that exists only for a limited stretch of time — say, a single rectangular burst — then asking for its *total accumulated effect* makes perfect sense, and that total is finite. But if $x(t)$ keeps going forever, the total accumulated effect grows without bound, so instead you ask for its *average strength per unit time*.

**General rule:**

- A signal whose amplitude decays to zero as $|t| \to \infty$ typically has **finite energy** and is called an **energy signal**.
- A signal that persists at nonzero amplitude forever typically has **infinite energy** but **finite, nonzero power** and is called a **power signal**.
- **Periodic signals** are the classic example of power signals — they never die out.

### COMMON MISTAKE

A signal is **not** simultaneously a nonzero finite-energy signal and a nonzero finite-power signal. If $E_x$ is finite and nonzero, then $P_x = 0$. If $P_x$ is finite and nonzero, then $E_x = \infty$. Watch for this trap on exams.

#### Formula Reference

| Signal type | Use | Formula |
|---|---|---|
| Decaying / finite-duration | Energy | $E_x = \int_{-\infty}^{\infty}\|x(t)\|^2\,dt$ |
| Persistent / periodic | Power | $P_x = \lim_{T\to\infty}\frac{1}{T}\int_{-T/2}^{T/2}\|x(t)\|^2\,dt$ |
| Periodic shortcut | Power over one period | Average $\|x(t)\|^2$ over one period $T_0$ |

![Fig. 1.2](/figures/page-067-fig_12-1.png)
*These two examples form a classification template for exams: the decaying signal in (a) calls for an energy calculation, while the periodic non-decaying signal in (b) calls for a power calculation.*

---

## 3. Worked Examples and RMS

### EXAMPLE 1.1 — Two Textbook Signals

The textbook works through the two signals in Fig. 1.2 directly:

- **Fig. 1.2(a)** — a decaying signal. Because it dies out, we compute energy and obtain $E_x = 8$.
- **Fig. 1.2(b)** — a periodic signal. Because it persists, we compute average power over one period and obtain $P_x = \frac{1}{3}$.

### EXAMPLE 1.2 — Standard Signal Forms

For signals that appear constantly on exams, the results are worth memorizing:

**Sinusoid:** $x(t) = C\cos(\omega_0 t + \theta)$
- Average power: $P_x = \dfrac{C^2}{2}$
- RMS value: $\sqrt{P_x} = \dfrac{C}{\sqrt{2}}$
- **Phase $\theta$ does not affect power.**

**Sum of sinusoids with distinct frequencies:** $x(t) = C_1\cos(\omega_1 t) + C_2\cos(\omega_2 t)$, $\omega_1 \neq \omega_2$
- Total power: $P_x = \dfrac{C_1^2}{2} + \dfrac{C_2^2}{2}$ — powers of distinct-frequency components simply add.

**Complex exponential:** $x(t) = De^{j\omega_0 t}$
- Here $D$ may be a complex constant. Recall that $|D|$ denotes its magnitude (e.g., if $D = 3 + 4j$ then $|D| = 5$).
- Average power: $P_x = |D|^2$
- RMS value: $|D|$

#### Formula Reference

| Signal | Power | RMS |
|---|---|---|
| $C\cos(\omega_0 t+\theta)$ | $C^2/2$ | $C/\sqrt{2}$ |
| Sum of distinct sinusoids | $\sum C_k^2/2$ | $\sqrt{\sum C_k^2/2}$ |
| $De^{j\omega_0 t}$ | $\|D\|^2$ | $\|D\|$ |

$$P_x=\frac{C^2}{2},\quad x(t)=C\cos(\omega_0 t+\theta) \qquad P_x=\frac{C_1^2}{2}+\frac{C_2^2}{2} \text{ for distinct frequencies} \qquad P_x=|D|^2 \text{ for } x(t)=De^{j\omega_0 t}$$
*In every one of these standard forms, amplitude controls power while phase has no effect, and when two sinusoids have distinct frequencies their individual powers simply add together.*

---
**📌 Key Takeaways**
- Use energy for signals that decay to zero; use power for signals that persist or repeat forever.
- A signal cannot be both a nonzero finite-energy signal and a nonzero finite-power signal simultaneously.
- For a sinusoid of amplitude C, power is C²/2 and RMS is C/√2; phase does not matter.

*In the next section we will keep building the language needed to analyze signals and systems more systematically.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImtwX2NsYXNzaWZ5X2VuZXJneV92c19wb3dlciIsImxhYmVsIjoiQ2xhc3NpZnkgYSBzaWduYWwgYXMgZW5lcmd5LW1lYXN1cmVkIG9yIHBvd2VyLW1lYXN1cmVkIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBzaWduYWwgaXMgbW9zdCBuYXR1cmFsbHkgdHJlYXRlZCBhcyBhbiBlbmVyZ3kgc2lnbmFsPyIsIm9wdGlvbnMiOlsiQS4gQSBwZXJpb2RpYyBjb3NpbmUgdGhhdCBjb250aW51ZXMgZm9yZXZlciIsIkIuIEEgZGVjYXlpbmcgcHVsc2Ugd2hvc2UgYW1wbGl0dWRlIGdvZXMgdG8gemVybyBhcyB8dHwgaW5jcmVhc2VzIiwiQy4gQSBub256ZXJvIGNvbnN0YW50IHNpZ25hbCIsIkQuIEEgc3F1YXJlIHdhdmUgdGhhdCByZXBlYXRzIGZvcmV2ZXIiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJBIGRlY2F5aW5nIHB1bHNlIGNhbiBoYXZlIGZpbml0ZSB0b3RhbCBpbnRlZ3JhbCBvZiB8eCh0KXxeMiwgc28gZW5lcmd5IGlzIHRoZSBhcHByb3ByaWF0ZSBtZWFzdXJlLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkEgbmV2ZXItZW5kaW5nIHBlcmlvZGljIGNvc2luZSBoYXMgaW5maW5pdGUgZW5lcmd5IGFuZCBpcyB0eXBpY2FsbHkgZGVzY3JpYmVkIGJ5IHBvd2VyLiIsIkMiOiJBIG5vbnplcm8gY29uc3RhbnQgcGVyc2lzdHMgZm9yZXZlciwgc28gaXRzIGVuZXJneSBpcyBpbmZpbml0ZSBhbmQgcG93ZXIgaXMgdGhlIHVzZWZ1bCBtZWFzdXJlLiIsIkQiOiJBIHJlcGVhdGluZyBzcXVhcmUgd2F2ZSBpcyBwZXJpb2RpYyBhbmQgaXMgdXN1YWxseSB0cmVhdGVkIGFzIGEgcG93ZXIgc2lnbmFsLiJ9LCJoaW50IjoiQXNrIHdoZXRoZXIgdGhlIHNpZ25hbCBkaWVzIG91dCBvciBrZWVwcyBnb2luZyBmb3JldmVyLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBub256ZXJvIHBlcmlvZGljIHNpZ25hbCBpcyB1c3VhbGx5IGNsYXNzaWZpZWQgaG93PyIsIm9wdGlvbnMiOlsiQS4gRmluaXRlLWVuZXJneSBzaWduYWwiLCJCLiBGaW5pdGUtcG93ZXIgc2lnbmFsIiwiQy4gWmVybyBzaWduYWwiLCJELiBOZWl0aGVyIGVuZXJneSBub3IgcG93ZXIgY2FuIGJlIGRlZmluZWQiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJQZXJpb2RpYyBzaWduYWxzIHVzdWFsbHkgcGVyc2lzdCBmb3JldmVyLCBzbyB0b3RhbCBlbmVyZ3kgZGl2ZXJnZXMsIGJ1dCBhdmVyYWdlIHBvd2VyIG92ZXIgb25lIHBlcmlvZCBleGlzdHMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiRmluaXRlIGVuZXJneSBpcyBub3QgdHlwaWNhbCBmb3IgYSBub256ZXJvIHBlcmlvZGljIHNpZ25hbCBiZWNhdXNlIGl0IGRvZXMgbm90IGRpZSBvdXQuIiwiQyI6IlBlcmlvZGljaXR5IGRvZXMgbm90IGltcGx5IHRoZSBzaWduYWwgaXMgemVyby4iLCJEIjoiUG93ZXIgaXMgdXN1YWxseSB3ZWxsLWRlZmluZWQgZm9yIHBlcmlvZGljIHNpZ25hbHMuIn0sImhpbnQiOiJUaGluayBhYm91dCBhdmVyYWdpbmcgb25lIHJlcGVhdGluZyBjeWNsZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImtwX2NvbXB1dGVfZnJvbV9leGFtcGxlcyIsImxhYmVsIjoiQ29tcHV0ZSBlbmVyZ3kgb3IgcG93ZXIgZnJvbSBzaW1wbGUgdGV4dGJvb2stc3R5bGUgc2lnbmFscyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiVGhlIHRleHRib29rJ3MgZGVjYXlpbmcgZXhhbXBsZSBpbiBGaWcuIDEuMihhKSBpcyByZXBvcnRlZCB0byBoYXZlIHdoaWNoIHZhbHVlPyIsIm9wdGlvbnMiOlsiQS4gRV94ID0gOCIsIkIuIFBfeCA9IDgiLCJDLiBFX3ggPSAxLzMiLCJELiBQX3ggPSAxLzMiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJUaGUgZGVjYXlpbmcgc2lnbmFsIGlzIHRyZWF0ZWQgYXMgYW4gZW5lcmd5IHNpZ25hbCwgYW5kIHRoZSB3b3JrZWQgZXhhbXBsZSBnaXZlcyBFeCA9IDguIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiOCBpcyB0aGUgZW5lcmd5IHJlc3VsdCwgbm90IHBvd2VyLiIsIkMiOiIxLzMgYmVsb25ncyB0byB0aGUgcGVyaW9kaWMgZXhhbXBsZSdzIHBvd2VyLCBub3QgdGhpcyBkZWNheWluZyBzaWduYWwuIiwiRCI6IjEvMyBpcyBhIHBvd2VyIHZhbHVlIGZyb20gdGhlIG90aGVyIGV4YW1wbGUuIn0sImhpbnQiOiJNYXRjaCB0aGUgZGVjYXlpbmcgc2lnbmFsIHRvIHRoZSBjb3JyZWN0IG1lYXN1cmUgZmlyc3QuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImJvb2tfZmlndXJlX3JlZmVyZW5jZV9wYWdlLTA2NyIsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciB0aGUgcGVyaW9kaWMgc2lnbmFsIGluIEZpZy4gMS4yKGIpLCB3aGF0IHF1YW50aXR5IGlzIGNvbXB1dGVkIGluIHRoZSBleGFtcGxlPyIsIm9wdGlvbnMiOlsiQS4gRW5lcmd5LCBiZWNhdXNlIHRoZSBzaWduYWwgY3Jvc3NlcyB6ZXJvIiwiQi4gUG93ZXIsIGJlY2F1c2UgdGhlIHNpZ25hbCBpcyBwZXJpb2RpYyBhbmQgZG9lcyBub3QgZGVjYXkgYXdheSIsIkMuIEVuZXJneSwgYmVjYXVzZSBvbmUgcGVyaW9kIGlzIGZpbml0ZSIsIkQuIE5laXRoZXIsIGJlY2F1c2UgdGhlIHNpZ25hbCB0YWtlcyBuZWdhdGl2ZSB2YWx1ZXMiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgZXhhbXBsZSB1c2VzIHBvd2VyIGJlY2F1c2UgdGhlIHNpZ25hbCBwZXJzaXN0cyBmb3JldmVyIGJ1dCByZXBlYXRzIHJlZ3VsYXJseS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJDcm9zc2luZyB6ZXJvIGRvZXMgbm90IGRldGVybWluZSB3aGV0aGVyIHRvIHVzZSBlbmVyZ3kgb3IgcG93ZXIuIiwiQyI6IkEgZmluaXRlIHBlcmlvZCBkb2VzIG5vdCBtYWtlIHRvdGFsIGVuZXJneSBmaW5pdGUgb3ZlciBhbGwgdGltZS4iLCJEIjoiTmVnYXRpdmUgdmFsdWVzIGFyZSBoYW5kbGVkIGJ5IHNxdWFyaW5nIG1hZ25pdHVkZSBpbiB0aGUgZm9ybXVsYXMuIn0sImhpbnQiOiJQZXJpb2RpY2l0eSBpcyB0aGUgZGVjaWRpbmcgY2x1ZSBoZXJlLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJib29rX2ZpZ3VyZV9yZWZlcmVuY2VfcGFnZS0wNjciLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJrcF9zdGFuZGFyZF9wb3dlcl9yZXN1bHRzIiwibGFiZWwiOiJSZWNhbGwgc3RhbmRhcmQgcG93ZXIgYW5kIFJNUyByZXN1bHRzIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IEMgY29zKG9tZWdhXzAgdCArIHRoZXRhKSB3aXRoIG9tZWdhXzAgbm90IHplcm8sIHdoYXQgaXMgdGhlIGF2ZXJhZ2UgcG93ZXI/Iiwib3B0aW9ucyI6WyJBLiBDIiwiQi4gQ14yIiwiQy4gQ14yLzIiLCJELiBDL3NxcnQoMikiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJBIHN0YW5kYXJkIHNpbnVzb2lkIG9mIGFtcGxpdHVkZSBDIGhhcyBhdmVyYWdlIHBvd2VyIENeMi8yLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkMgaXMgYW1wbGl0dWRlLCBub3QgcG93ZXIuIiwiQiI6IlRoYXQgd291bGQgYmUgdGhlIGRjLXNpZ25hbCBwb3dlciBmb3IgYSBjb25zdGFudCBhbXBsaXR1ZGUgQywgbm90IGEgc2ludXNvaWQuIiwiRCI6IkMvc3FydCgyKSBpcyB0aGUgUk1TIHZhbHVlLCBub3QgdGhlIHBvd2VyLiJ9LCJoaW50IjoiU2VwYXJhdGUgcG93ZXIgZnJvbSBSTVMgY2FyZWZ1bGx5LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiRm9yIHgodCkgPSAzY29zKDV0KSArIDRjb3MoN3QpLCBhc3N1bWluZyB0aGUgZnJlcXVlbmNpZXMgYXJlIGRpc3RpbmN0LCBmaW5kIHRoZSBhdmVyYWdlIHBvd2VyIGFuZCB0aGUgUk1TIHZhbHVlLiIsImlkZWFsX2Fuc3dlciI6IlBvd2VyID0gM14yLzIgKyA0XjIvMiA9IDkvMiArIDE2LzIgPSAyNS8yLiBSTVMgPSBzcXJ0KDI1LzIpID0gNS9zcXJ0KDIpLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3QgYWRkIHBvd2VycyBvZiB0aGUgZGlzdGluY3QtZnJlcXVlbmN5IHNpbnVzb2lkczogOS8yICsgMTYvMiIsIk11c3Qgb2J0YWluIHRvdGFsIHBvd2VyIDI1LzIiLCJNdXN0IHN0YXRlIFJNUyA9IHNxdWFyZSByb290IG9mIHBvd2VyID0gNS9zcXJ0KDIpIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCBrbm93cyB0aGF0IGRpc3RpbmN0LWZyZXF1ZW5jeSBzaW51c29pZCBwb3dlcnMgYWRkIGFuZCB0aGF0IFJNUyBpcyB0aGUgc3F1YXJlIHJvb3Qgb2YgcG93ZXIuIiwiaGludCI6IkRvIG5vdCBhZGQgYW1wbGl0dWRlcyBmaXJzdDsgYWRkIHBvd2Vycy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
