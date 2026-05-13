%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6Indpa2lfcmVmZXJlbmNlIiwicmF0aW9uYWxlIjoiVGhpcyBjaGFwdGVyIHN1bW1hcnkgaXMgbWFpbmx5IGEgcmVjb2duaXRpb24tYW5kLXJldmlldyBzZWN0aW9uLiBVc2UgY2xlYW4gcmVmZXJlbmNlIHZpc3VhbHMgZm9yIHN0YW5kYXJkIHNpZ25hbC9zeXN0ZW0gaWRlYXMsIGFuZCB1c2UgTGFUZVgtbmF0aXZlIGZvcm11bGEgZGlzcGxheXMgZm9yIGV4YWN0IGVuZXJneSwgcG93ZXIsIGFuZCBwZXJpb2RpY2l0eSBkZWZpbml0aW9ucy4gTm8gdGV4dGJvb2sgZmlndXJlIGlzIGF2YWlsYWJsZSBvbiB0aGUgcGFnZSwgc28gV2lraXBlZGlhL1dpa2ltZWRpYS1zdHlsZSByZWZlcmVuY2UgdmlzdWFscyBzaG91bGQgYmUgcHJlZmVycmVkIGZvciBzdGFuZGFyZCBkaWFncmFtcy4iLCJjcmFtIjoiVXNlIHZpc3VhbHMgdG8gcXVpY2tseSBpZGVudGlmeSB3aGV0aGVyIGEgcHJvYmxlbSBpcyBhc2tpbmcgYWJvdXQgc3lzdGVtIGZsb3csIHRpbWUtYXhpcyBjbGFzc2lmaWNhdGlvbiwgYW1wbGl0dWRlLWF4aXMgY2xhc3NpZmljYXRpb24sIG9yIHBlcmlvZGljaXR5LiIsInN0YW5kYXJkIjoiVXNlIHZpc3VhbHMgdG8gY29ubmVjdCBlYWNoIHN1bW1hcnkgaWRlYSB0byBvbmUgcmVwcmVzZW50YXRpdmUgZXhhbXBsZSBhbmQgb25lIGV4YW0tc3R5bGUgdHJpZ2dlci4iLCJ0b3Bfc2NvcmUiOiJVc2UgdmlzdWFscyB0byBleHBvc2UgY29tbW9uIGNvbmZ1c2lvbnM6IGNvbnRpbnVvdXMtdGltZSB2cyBhbmFsb2csIGRpc2NyZXRlLXRpbWUgdnMgZGlnaXRhbCwgYW5kIGVuZXJneSBzaWduYWwgdnMgcG93ZXIgc2lnbmFsLiJ9" style="display:none;"></div>%%KC_END%%
# 1.12 Summary

> **Section Objective:** Review the Chapter 1 toolkit for describing signals, systems, signal size, and signal classes.

---

## Concepts In This Section

- signal
- system
- energy
- power
- continuous-time signal
- discrete-time signal
- analog signal
- digital signal
- periodic signal
- aperiodic signal

## 1. Signals and Systems

A **signal** is data or information represented as a function of time (or another variable). A **system** takes an input signal and produces an output signal — also called a **response**.

Systems can be realized in hardware (a physical circuit or device) or in software (an algorithm running on a processor). The distinction does not change the input-output relationship.

**Example:** A microphone captures a noisy audio waveform (the input signal). A noise-reduction algorithm processes it and outputs a cleaner waveform (the response). The algorithm is the system.

### EXAM NOTE

If a question gives you an input-output rule — even with no physical device shown — treat it as a system. The rule itself defines the system.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="web_reference_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoZSBhcnJvd3MgdG8gaW5zdGFudGx5IGlkZW50aWZ5IGlucHV0LCBzeXN0ZW0sIGFuZCBvdXRwdXQgaW4gZXhhbSBkaWFncmFtcy4iLCJzdGFuZGFyZCI6IkNvbm5lY3QgdGhlIGRpYWdyYW0gdG8gdGhlIG1pY3JvcGhvbmUtdG8tbm9pc2UtcmVkdWN0aW9uIGV4YW1wbGUuIiwidG9wX3Njb3JlIjoiUG9pbnQgb3V0IHRoYXQgdGhlIHN5c3RlbSBtYXkgYmUgaGFyZHdhcmUgb3Igc29mdHdhcmU7IHRoZSBpbnB1dC1vdXRwdXQgcmVsYXRpb25zaGlwIGlzIHRoZSBrZXkuIn0=" style="display:none;"></div>%%KC_END%%
![File:Superposition principle block diagram for a MIMO system.png](https://upload.wikimedia.org/wikipedia/commons/b/be/Superposition_principle_block_diagram_for_a_MIMO_system.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original)
*A system sits between an input signal and an output signal. The arrows show the direction of processing — input enters, the system acts, output leaves.*
%%KC_BLOCK%%<div class="kc-reference-source"><a href="https://upload.wikimedia.org/wikipedia/commons/b/be/Superposition_principle_block_diagram_for_a_MIMO_system.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original" target="_blank" rel="noopener noreferrer">Reference image from Wikimedia Commons</a></div>%%KC_END%%

## 2. Signal Energy

Energy measures the **total accumulated squared size** of a continuous-time signal over all time.

**Symbol meanings:**
- \(E_x\) — signal energy (a single non-negative number)
- \(x(t)\) — the signal value at time \(t\)
- \(|x(t)|^2\) — squared magnitude at each instant
- The integral sums this squared magnitude over the entire time axis \((-\infty, \infty)\)

**When to use it:** Use this formula when the problem asks for total size and the result is expected to be finite.

**Quick example:** A short pulse that is nonzero only on a small interval typically has finite energy.

### COMMON MISTAKE

Do not call a signal an energy signal if the integral diverges to infinity. If \(E_x = \infty\), the signal is not an energy signal — check power instead.

$$E_x = \int_{-\infty}^{\infty} |x(t)|^2\,dt$$

## 3. Classification by Time Axis and Amplitude Axis

### Power — when energy is infinite

Power is the **long-term time average** of squared signal size.

**Symbol meanings:**
- \(P_x\) — average signal power
- \(T\) — half the observation window length
- \([-T, T]\) — the symmetric averaging interval, stretched to infinity
- The \(\frac{1}{2T}\) factor normalizes the integral into a true average

**Exam trigger:** If a signal lasts forever — especially a sinusoid or any periodic waveform — its total energy is usually infinite. Switch to power.

**Periodic shortcut:** For a periodic signal with period \(T_0\), you can average over one period instead of all time:

$$P_x = \frac{1}{T_0}\int_{0}^{T_0}|x(t)|^2\,dt$$

### COMMON MISTAKE

Do not compute the integral of \(|x(t)|^2\) over one period without the \(\frac{1}{T_0}\) factor and call it total signal energy. That gives average power over one period, not total energy.

$$P_x = \lim_{T\to\infty}\frac{1}{2T}\int_{-T}^{T}|x(t)|^2\,dt$$

## 4. Periodic and Aperiodic Signals

Signal classification uses **two independent questions**:

1. **Time axis:** Is the signal defined for every instant of time, or only at separated discrete moments?
   - Defined for all \(t\) → **continuous-time**
   - Defined only at integer steps \(n\) → **discrete-time**

2. **Amplitude axis:** Can the signal take any real value, or only values from a finite set?
   - Any real value → **analog**
   - Only from a finite set (e.g., 0 or 1) → **digital**

**Representative example:** A temperature sensor sampled once per second produces values like 21.37°C, 21.41°C, … The time axis is discrete (one sample per second), but the amplitude is analog (any real number is possible).

> **Quick check:** Ask two separate questions — where is the signal defined in time, and what values can the amplitude take?

### EXAM WARNING

Do **not** assume discrete-time automatically means digital. A discrete-time signal can still carry analog-valued amplitudes. These are separate axes.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="web_reference_image" data-teaching-role="comparison_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoZSBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBheGVzIHRvIGRlY2lkZSB0aGUgY2xhc3NpZmljYXRpb24gcXVpY2tseS4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgdmlzdWFsIHRvIHNlcGFyYXRlIHRpbWUgc2FtcGxpbmcgZnJvbSBhbXBsaXR1ZGUgcXVhbnRpemF0aW9uLiIsInRvcF9zY29yZSI6IlVzZSB0aGUgdmlzdWFsIHRvIGNhdGNoIG1peGVkIGNhc2VzIHN1Y2ggYXMgZGlzY3JldGUtdGltZSBhbmFsb2ctYW1wbGl0dWRlIHNpZ25hbHMuIn0=" style="display:none;"></div>%%KC_END%%
![Digital discrete signal](https://upload.wikimedia.org/wikipedia/commons/0/04/Digital.signal.discret.svg)
*Compare the horizontal axis (continuous vs discrete time) and the vertical axis (analog vs digital amplitude) independently — they are two separate classification decisions.*
%%KC_BLOCK%%<div class="kc-reference-source"><a href="https://upload.wikimedia.org/wikipedia/commons/0/04/Digital.signal.discret.svg" target="_blank" rel="noopener noreferrer">Reference image from Wikimedia Commons</a></div>%%KC_END%%

## 4. Periodic and Aperiodic Signals

A continuous-time signal is **periodic** if shifting it forward by some positive time \(T_0\) leaves the entire signal completely unchanged.

**Symbol meanings:**
- \(x(t)\) — signal value at time \(t\)
- \(T_0\) — the period; a positive real number
- **Fundamental period** — the smallest positive \(T_0\) for which the condition holds

The condition must hold for **all** \(t\), not just at a few points.

**Exam trigger:** Look for a repeating pattern that continues for all time \(-\infty < t < \infty\), not just a short repeated-looking segment in a finite window.

**Example:** \(\sin(t)\) satisfies \(x(t) = x(t + 2\pi)\) for every \(t\) — it is periodic. A single rectangular pulse does not repeat over all time — it is aperiodic.

### COMMON MISTAKE

Do not call a finite-duration repeated segment periodic. The signal must exist and repeat over \(-\infty < t < \infty\). Two identical-looking pulses inside a finite window are not enough to confirm periodicity.

$$x(t) = x(t + T_0)$$

---
**📌 Key Takeaways**
- **System** = input-to-output processing rule (hardware or software); the input and output are both signals.
- **Signal energy:** \(E_x = \int_{-\infty}^{\infty}|x(t)|^2\,dt\) — use when total size is finite; if \(E_x = \infty\), switch to power.
- **Signal power:** \(P_x = \lim_{T\to\infty}\frac{1}{2T}\int_{-T}^{T}|x(t)|^2\,dt\) — use for forever-lasting signals such as sinusoids.
- **Time axis** (continuous vs discrete) and **amplitude axis** (analog vs digital) are two independent classification questions — discrete-time does not imply digital.
- **Periodicity condition:** \(x(t) = x(t + T_0)\) must hold for all \(t\); the fundamental period is the smallest valid \(T_0\); local repetition in a finite window is not sufficient.

*Next, these definitions become the foundation for analyzing how systems transform signals.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InNpZ25hbF9zeXN0ZW1fZGVmaW5pdGlvbiIsImxhYmVsIjoiU2lnbmFsIHZzIHN5c3RlbSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJBIG5vaXNlLXJlZHVjdGlvbiBhbGdvcml0aG0gdGFrZXMgYSByZWNvcmRlZCBhdWRpbyB3YXZlZm9ybSBhbmQgb3V0cHV0cyBhIGNsZWFuZXIgd2F2ZWZvcm0uIEluIHNpZ25hbHMtYW5kLXN5c3RlbXMgbGFuZ3VhZ2UsIHdoYXQgaXMgdGhlIGFsZ29yaXRobT8iLCJvcHRpb25zIjpbIkEuIEEgc2lnbmFsIiwiQi4gQSBzeXN0ZW0iLCJDLiBBIHBlcmlvZCIsIkQuIFNpZ25hbCBlbmVyZ3kiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJBIHN5c3RlbSBwcm9jZXNzZXMgYW4gaW5wdXQgc2lnbmFsIGFuZCBwcm9kdWNlcyBhbiBvdXRwdXQgc2lnbmFsLCBhbHNvIGNhbGxlZCBhIHJlc3BvbnNlLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBhdWRpbyB3YXZlZm9ybSBpcyBhIHNpZ25hbDsgdGhlIGFsZ29yaXRobSB0aGF0IHByb2Nlc3NlcyBpdCBpcyB0aGUgc3lzdGVtLiIsIkMiOiJBIHBlcmlvZCBpcyB0aGUgcmVwZWF0IGxlbmd0aCBvZiBhIHBlcmlvZGljIHNpZ25hbCwgbm90IGFuIGlucHV0LW91dHB1dCBwcm9jZXNzb3IuIiwiRCI6IkVuZXJneSBpcyBhIHNpemUgbWVhc3VyZSBvZiBhIHNpZ25hbCwgbm90IHRoZSBwcm9jZXNzaW5nIHJ1bGUuIn0sImhpbnQiOiJMb29rIGZvciB0aGUgb2JqZWN0IHRoYXQgdHJhbnNmb3JtcyBpbnB1dCBpbnRvIG91dHB1dC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJlbmVyZ3lfcG93ZXJfY2hvaWNlIiwibGFiZWwiOiJDaG9vc2luZyBlbmVyZ3kgb3IgcG93ZXIiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGZvcm11bGEgaXMgdGhlIGNvbnRpbnVvdXMtdGltZSBzaWduYWwgZW5lcmd5IGZvcm11bGE/Iiwib3B0aW9ucyI6WyJBLiBcXChFX3g9XFxpbnRfey1cXGluZnR5fV57XFxpbmZ0eX18eCh0KXxeMlxcLGR0XFwpIiwiQi4gXFwoRV94PVxcbGltX3tUXFx0b1xcaW5mdHl9XFxmcmFjezF9ezJUfVxcaW50X3stVH1ee1R9fHgodCl8XjJcXCxkdFxcKSIsIkMuIFxcKEVfeD14KHQrVF8wKVxcKSIsIkQuIFxcKEVfeD1cXGZyYWN7MX17VF8wfVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IkVuZXJneSBpcyB0aGUgdG90YWwgYWNjdW11bGF0ZWQgc3F1YXJlZCBtYWduaXR1ZGUgb3ZlciBhbGwgdGltZS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGF0IGlzIHRoZSBsb25nLXRlcm0gYXZlcmFnZSBwb3dlciBmb3JtdWxhLCBub3QgZW5lcmd5LiIsIkMiOiJUaGlzIGlzIHBhcnQgb2YgdGhlIHBlcmlvZGljaXR5IGlkZWEsIG5vdCBhbiBlbmVyZ3kgbWVhc3VyZS4iLCJEIjoiVGhpcyBpcyBub3QgYSBzaWduYWwgZW5lcmd5IGZvcm11bGEuIn0sImhpbnQiOiJFbmVyZ3kgdG90YWxzOyBwb3dlciBhdmVyYWdlcy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgc2ludXNvaWQgY29udGludWVzIGZvcmV2ZXIgd2l0aCBjb25zdGFudCBhbXBsaXR1ZGUuIFdoaWNoIHN0YXRlbWVudCBpcyB1c3VhbGx5IGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBJdCBoYXMgZmluaXRlIGVuZXJneSBhbmQgemVybyBwb3dlci4iLCJCLiBJdCBoYXMgaW5maW5pdGUgZW5lcmd5LCBzbyBwb3dlciBpcyB0aGUgbW9yZSB1c2VmdWwgc2l6ZSBtZWFzdXJlLiIsIkMuIEl0IGlzIG5laXRoZXIgYW4gZW5lcmd5IHNpZ25hbCBub3IgYSBwb3dlciBzaWduYWwgYmVjYXVzZSBpdCByZXBlYXRzLiIsIkQuIEl0cyBlbmVyZ3kgaXMgZm91bmQgYnkgYXZlcmFnaW5nIG92ZXIgb25lIHBlcmlvZC4iXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJBIGZvcmV2ZXItbGFzdGluZyBzaW51c29pZCBhY2N1bXVsYXRlcyBlbmVyZ3kgd2l0aG91dCBib3VuZCwgYnV0IGl0cyBhdmVyYWdlIHBvd2VyIGNhbiBiZSBmaW5pdGUuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiQSBub256ZXJvIHNpbnVzb2lkIGxhc3RpbmcgZm9yZXZlciBkb2VzIG5vdCBoYXZlIGZpbml0ZSB0b3RhbCBlbmVyZ3kuIiwiQyI6IlBlcmlvZGljIHNpZ25hbHMgb2Z0ZW4gaGF2ZSB1c2VmdWwgZmluaXRlIGF2ZXJhZ2UgcG93ZXIuIiwiRCI6IkF2ZXJhZ2luZyBvdmVyIG9uZSBwZXJpb2QgZ2l2ZXMgcG93ZXIsIG5vdCB0b3RhbCBlbmVyZ3kuIn0sImhpbnQiOiJSZXBlYXRpbmcgZm9yZXZlciB1c3VhbGx5IHBvaW50cyB0b3dhcmQgYXZlcmFnZSBwb3dlci4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImNsYXNzaWZpY2F0aW9uX2F4ZXMiLCJsYWJlbCI6IkNvbnRpbnVvdXMvZGlzY3JldGUgdGltZSB2cyBhbmFsb2cvZGlnaXRhbCBhbXBsaXR1ZGUiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgc2lnbmFsIGlzIG1lYXN1cmVkIG9ubHkgb25jZSBldmVyeSBzZWNvbmQsIGJ1dCBlYWNoIG1lYXN1cmVtZW50IGNhbiBiZSBhbnkgcmVhbCBudW1iZXIuIEhvdyBzaG91bGQgaXQgYmUgY2xhc3NpZmllZD8iLCJvcHRpb25zIjpbIkEuIENvbnRpbnVvdXMtdGltZSBhbmQgZGlnaXRhbCIsIkIuIERpc2NyZXRlLXRpbWUgYW5kIGFuYWxvZyIsIkMuIENvbnRpbnVvdXMtdGltZSBhbmQgYW5hbG9nIiwiRC4gRGlzY3JldGUtdGltZSBhbmQgYWx3YXlzIGRpZ2l0YWwiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgc2lnbmFsIGlzIGRpc2NyZXRlLXRpbWUgYmVjYXVzZSBpdCBpcyBkZWZpbmVkIG9ubHkgYXQgc2VwYXJhdGVkIHRpbWUgaW5zdGFudHMsIGFuZCBhbmFsb2cgaW4gYW1wbGl0dWRlIGJlY2F1c2UgdGhlIHZhbHVlcyBjYW4gdmFyeSBjb250aW51b3VzbHkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlIHRpbWUgYXhpcyBpcyBub3QgY29udGludW91cyBiZWNhdXNlIG1lYXN1cmVtZW50cyBvY2N1ciBvbmx5IG9uY2UgcGVyIHNlY29uZC4iLCJDIjoiVGhlIGFtcGxpdHVkZSBpcyBhbmFsb2csIGJ1dCB0aGUgdGltZSBheGlzIGlzIGRpc2NyZXRlLiIsIkQiOiJEaXNjcmV0ZS10aW1lIGRvZXMgbm90IGF1dG9tYXRpY2FsbHkgbWVhbiBkaWdpdGFsOyBhbXBsaXR1ZGUgdmFsdWVzIG1heSBzdGlsbCBiZSBjb250aW51b3VzLiJ9LCJoaW50IjoiQXNrIG9uZSBxdWVzdGlvbiBhYm91dCB0aW1lIGFuZCBhIHNlcGFyYXRlIHF1ZXN0aW9uIGFib3V0IGFtcGxpdHVkZS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoic3RydWN0dXJlX2NvbXBhcmlzb25fY2hlY2siLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHN0YXRlbWVudCBjb3JyZWN0bHkgc2VwYXJhdGVzIHRoZSB0d28gY2xhc3NpZmljYXRpb24gYXhlcz8iLCJvcHRpb25zIjpbIkEuIENvbnRpbnVvdXMtdGltZSBhbmQgYW5hbG9nIGJvdGggZGVzY3JpYmUgdGhlIGhvcml6b250YWwgYXhpcy4iLCJCLiBEaXNjcmV0ZS10aW1lIGFuZCBkaWdpdGFsIG1lYW4gZXhhY3RseSB0aGUgc2FtZSB0aGluZy4iLCJDLiBDb250aW51b3VzLXRpbWUvZGlzY3JldGUtdGltZSBkZXNjcmliZSB0aW1lOyBhbmFsb2cvZGlnaXRhbCBkZXNjcmliZSBhbXBsaXR1ZGUuIiwiRC4gQW5hbG9nIHNpZ25hbHMgbXVzdCBhbHdheXMgYmUgY29udGludW91cy10aW1lLiJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlRpbWUtYXhpcyBjbGFzc2lmaWNhdGlvbiBhbmQgYW1wbGl0dWRlLWF4aXMgY2xhc3NpZmljYXRpb24gYXJlIHNlcGFyYXRlIGRlY2lzaW9ucy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJBbmFsb2cgZGVzY3JpYmVzIGFtcGxpdHVkZSB2YWx1ZXMsIG5vdCB0aGUgaG9yaXpvbnRhbCB0aW1lIGF4aXMuIiwiQiI6IkRpc2NyZXRlLXRpbWUgZGVzY3JpYmVzIHdoZW4gdmFsdWVzIGV4aXN0OyBkaWdpdGFsIGRlc2NyaWJlcyB3aGljaCBhbXBsaXR1ZGUgdmFsdWVzIGFyZSBhbGxvd2VkLiIsIkQiOiJBIGRpc2NyZXRlLXRpbWUgc2lnbmFsIG1heSBzdGlsbCBoYXZlIGFuYWxvZy12YWx1ZWQgYW1wbGl0dWRlcy4ifSwiaGludCI6Ikhvcml6b250YWwgYXhpcyBpcyB0aW1lOyB2ZXJ0aWNhbCBheGlzIGlzIGFtcGxpdHVkZS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoid3JvbmdfdnNfcmlnaHRfdmlzdWFsX2NoZWNrIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJwZXJpb2RpY2l0eV9jb25kaXRpb24iLCJsYWJlbCI6IlBlcmlvZGljIHNpZ25hbCBjb25kaXRpb24iLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDRfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoYXQgZG9lcyB0aGUgY29uZGl0aW9uIFxcKHgodCk9eCh0K1RfMClcXCkgbWVhbj8iLCJvcHRpb25zIjpbIkEuIFRoZSBzaWduYWwgYmVjb21lcyB6ZXJvIGFmdGVyIHRpbWUgXFwoVF8wXFwpLiIsIkIuIFRoZSBzaWduYWwgaXMgdW5jaGFuZ2VkIGFmdGVyIGEgc2hpZnQgb2YgXFwoVF8wXFwpLiIsIkMuIFRoZSBzaWduYWwgaGFzIGZpbml0ZSBlbmVyZ3kuIiwiRC4gVGhlIHNpZ25hbCBpcyBkaWdpdGFsLiJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlBlcmlvZGljaXR5IG1lYW5zIHNoaWZ0aW5nIHRoZSBzaWduYWwgYnkgYSB2YWxpZCBwZXJpb2QgbGVhdmVzIHRoZSB3aG9sZSB3YXZlZm9ybSB1bmNoYW5nZWQuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlIGZvcm11bGEgc2F5cyB0aGUgc2hpZnRlZCB2YWx1ZSBtYXRjaGVzIHRoZSBvcmlnaW5hbCwgbm90IHRoYXQgaXQgYmVjb21lcyB6ZXJvLiIsIkMiOiJQZXJpb2RpYyBub256ZXJvIHNpZ25hbHMgb2Z0ZW4gaGF2ZSBpbmZpbml0ZSBlbmVyZ3kuIiwiRCI6IkRpZ2l0YWwgY2xhc3NpZmljYXRpb24gaXMgYWJvdXQgYW1wbGl0dWRlIHZhbHVlcywgbm90IHJlcGVhdGluZyBpbiB0aW1lLiJ9LCJoaW50IjoiUmVhZCB0aGUgZXF1YXRpb24gYXMgJ3NhbWUgdmFsdWUgYWZ0ZXIgYSB0aW1lIHNoaWZ0LiciLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDRfcTIiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkEgY2xhc3NtYXRlIHNlZXMgdHdvIGlkZW50aWNhbCBwdWxzZXMgaW5zaWRlIGEgZmluaXRlIHRpbWUgd2luZG93IGFuZCBzYXlzIHRoZSBzaWduYWwgaXMgZGVmaW5pdGVseSBwZXJpb2RpYy4gRXhwbGFpbiB3aGF0IGlzIG1pc3NpbmcgZnJvbSB0aGF0IGNsYWltLiIsImlkZWFsX2Fuc3dlciI6IkEgcGVyaW9kaWMgc2lnbmFsIG11c3QgcmVwZWF0IG92ZXIgdGhlIGVudGlyZSB0aW1lIGludGVydmFsLCBub3QganVzdCBzaG93IGEgcmVwZWF0ZWQtbG9va2luZyBzZWdtZW50IGluIG9uZSBmaW5pdGUgd2luZG93LiBXZSBuZWVkIGEgcG9zaXRpdmUgcGVyaW9kIFxcKFRfMFxcKSBzdWNoIHRoYXQgXFwoeCh0KT14KHQrVF8wKVxcKSBmb3IgYWxsIHJlbGV2YW50IHRpbWUuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBtZW50aW9uIHJlcGV0aXRpb24gb3ZlciB0aGUgd2hvbGUgdGltZSBheGlzLCBub3QganVzdCBhIGxvY2FsIHdpbmRvdy4iLCJNdXN0IHJlZmVyZW5jZSB0aGUgY29uZGl0aW9uIFxcKHgodCk9eCh0K1RfMClcXCkuIiwiTXVzdCBleHBsYWluIHdoeSB0d28gcmVwZWF0ZWQtbG9va2luZyBwaWVjZXMgYXJlIG5vdCBlbm91Z2guIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3MgdGhlIGNvbW1vbiB0cmFwOiBsb2NhbCB2aXN1YWwgcmVwZXRpdGlvbiBpcyBub3QgYXV0b21hdGljYWxseSB0cnVlIHBlcmlvZGljaXR5LiIsImhpbnQiOiJQZXJpb2RpYyBtZWFucyB0aGUgc2hpZnQgd29ya3MgZ2xvYmFsbHksIG5vdCBvbmx5IHdoZXJlIHRoZSBncmFwaCBoYXBwZW5zIHRvIGxvb2sgcmVwZWF0ZWQuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6Indyb25nX3ZzX3JpZ2h0X3Zpc3VhbF9jaGVjayIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfV19" style="display:none;"></div>%%KC_END%%
