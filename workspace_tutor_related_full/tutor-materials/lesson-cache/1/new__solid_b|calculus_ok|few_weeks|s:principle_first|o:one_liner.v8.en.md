# Signals, Systems, Energy, and Power

> **Section Objective:** Understand what signals and systems are, learn how to measure the "size" of a signal using energy and power, and apply these tools to classify and compute values for standard signals.

---

A **signal** is simply a quantity whose value changes with time. Voltage across a resistor, the sound level in a room, a stock price over months — all of these are signals. Mathematically, a signal is a function of time, so if you are comfortable with calculus, you already have the right foundation.

A **system** takes one or more input signals and produces output signals. The relationship between input and output is what engineers study and design.

This section addresses a practical question that appears repeatedly on exams: **how do you replace an entire time-varying waveform with one meaningful number that captures its overall size?** The two tools for doing this are **signal energy** and **signal power**. Knowing when to use each one is the central skill of this section.

## 1. Signals, Systems, and What "Size" Means

A signal's amplitude changes from moment to moment, so a single instantaneous value tells you very little about the signal's overall strength. Consider a person's voice: knowing how loud they are at one instant does not tell you how much total sound energy they produced during a conversation. Both the **amplitude** and the **duration** of the signal matter.

The same logic applies to any signal. A short burst of very high amplitude and a long stretch of moderate amplitude can represent comparable amounts of total signal content. Neither the peak value alone nor the duration alone is sufficient.

This leads to the section's central problem:

> **Core Problem:** How do we replace a whole time-varying waveform with one meaningful number that fairly represents its overall size?

The answer depends on whether the signal eventually dies out or persists indefinitely — and that distinction drives everything that follows.

**Core takeaway:** A single instantaneous value cannot describe a signal's overall size; we need a summary measure that accounts for both amplitude and duration.

$$E_x = \int_{-\infty}^{\infty} |x(t)|^2\,dt \qquad P_x = \lim_{T\to\infty} \frac{1}{T}\int_{-T/2}^{T/2} |x(t)|^2\,dt$$
*Signal energy totals the squared amplitude of x(t) over all time, accumulating every contribution from the infinite past to the infinite future. Signal power averages that squared amplitude over a very long time window, asking: on average, how large is the signal per unit time? The square is essential in both formulas: it prevents positive and negative values from canceling each other out, and it weights larger amplitudes more strongly than smaller ones — a signal twice as large contributes four times as much to the integral.*

![Figure 1.1](/figures/page-066-figure_1_1-1.png)
*Panel (a) shows a signal that decays toward zero — its total squared area is finite, making energy the appropriate measure — while panel (b) shows a signal that persists indefinitely, making average power the appropriate measure.*

## 2. Energy Signal vs Power Signal

The classification rule comes down to one quick decision test:

- If **x(t) → 0 as |t| → ∞**, the signal dies out, its total squared area is finite, and **energy** is the meaningful measure. Such a signal is called an **energy signal**.
- If the signal **does not die out** and maintains a stable long-term average, then **power** is the meaningful measure. Such a signal is called a **power signal**.

### EXAM TRAP

For any nonzero signal, energy and power are **not both finite at the same time**. If energy is finite, power is zero. If power is finite and nonzero, energy is infinite. Choosing the wrong measure on an exam is a common error.

### PERIODIC SIGNAL SHORTCUT

For periodic signals, you do not need to integrate over all time. Because the waveform repeats, you can compute power by averaging |x(t)|² over **exactly one period** T₀:

$$P_x = \frac{1}{T_0}\int_{0}^{T_0} |x(t)|^2\,dt$$

**Mini-examples:** A decaying pulse (e.g., e^{−t} for t ≥ 0) goes to zero and is an energy signal. A cosine wave cos(ω₀t) never dies out and is a power signal.

**Core takeaway:** If the signal dies out, use energy; if it persists, use power — and for periodic signals, average over one period.

![Fig. 1.2](/figures/page-067-fig_12-1.png)
*Figure 1.2 presents two standard exam-style classification examples: a decaying signal whose finite total squared area makes it an energy signal, and a periodic signal whose stable long-term average makes it a power signal.*

## 3. Fast Exam Results for Sinusoids and RMS

Once you know average power, the **rms (root-mean-square)** value follows immediately:

$$x_{\text{rms}} = \sqrt{P_x}$$

Here are the key results to memorize:

| Signal | Average Power | RMS Value |
|---|---|---|
| C cos(ω₀t + θ), ω₀ ≠ 0 | C²/2 | C/√2 |
| Constant C | C² | C |
| D e^{jω₀t} | \|D\|² | \|D\| |

**Phase does not affect average power.** The θ in C cos(ω₀t + θ) shifts the waveform in time but does not change how much power it carries.

**Sum of distinct-frequency sinusoids:** When all frequencies are different, powers simply add:

$$P_x = C_0^2 + \frac{1}{2}\sum_{n=1}^{\infty} C_n^2$$

where C₀ is any dc (constant) component, which contributes its full square C₀², and each sinusoidal component contributes C_n²/2.

### EXAM TRAP

This additive rule **only holds when all frequencies are distinct**. If two sinusoids share the same frequency, a cross term appears in the power calculation. Depending on the phase difference, that cross term may not average to zero, so you cannot blindly add the individual powers.

**Core takeaway:** For standard signals, power and rms follow fixed formulas; powers add across distinct frequencies, but identical frequencies require careful treatment of the cross term.

$$P_x=\frac{C^2}{2},\quad x(t)=C\cos(\omega_0 t+\theta) \qquad P_x=\frac{C_1^2}{2}+\frac{C_2^2}{2}\ \text{for distinct frequencies} \qquad P_x=C_0^2+\frac{1}{2}\sum_{n=1}^{\infty} C_n^2 \qquad P_x=|D|^2\ \text{for}\ x(t)=De^{j\omega_0 t}$$
*These are the four memorize-for-exams formulas of this section. First: a sinusoid of amplitude C always has power C²/2, regardless of its phase θ — phase shifts the waveform in time but does not change its average squared value. Second: when two sinusoids have distinct frequencies, their powers add independently because the cross term averages to zero over a long interval. Third: in a general sum, a dc component C₀ contributes its full square C₀² (not half), while each sinusoidal component contributes half its squared amplitude. Fourth: the complex exponential e^{jω₀t} has unit magnitude at every instant, so the signal magnitude is constantly |D|, and average power is |D|².*

---
**📌 Key Takeaways**
- Energy totals squared amplitude over all time; power averages it — finite energy means zero power, and vice versa for nonzero signals.
- Periodic signals have infinite energy but finite power; compute power by averaging |x(t)|² over exactly one period.
- RMS equals the square root of average power; for a sinusoid C cos(ω₀t + θ), power is C²/2 and rms is C/√2.

*In the next section we will examine the fundamental properties of systems — including linearity, time-invariance, and causality — which determine how a system transforms its input signals into outputs.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImtwX3NpZ25hbF9zeXN0ZW1fYmFzaWNzIiwibGFiZWwiOiJTaWduYWwgYW5kIHN5c3RlbSBiYXNpY3MiLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AwX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBzdGF0ZW1lbnQgYmVzdCBtYXRjaGVzIHRoZSB0ZXh0Ym9vayBkZWZpbml0aW9uIG9mIGEgc3lzdGVtPyIsIm9wdGlvbnMiOlsiQS4gQSBzeXN0ZW0gaXMgYW55IHNpZ25hbCB0aGF0IHZhcmllcyB3aXRoIHRpbWUuIiwiQi4gQSBzeXN0ZW0gaXMgYW4gZW50aXR5IHRoYXQgcHJvY2Vzc2VzIGlucHV0IHNpZ25hbHMgdG8gcHJvZHVjZSBvdXRwdXQgc2lnbmFscy4iLCJDLiBBIHN5c3RlbSBpcyBhIGZvcm11bGEgdXNlZCBvbmx5IGZvciBwZXJpb2RpYyBzaWduYWxzLiIsIkQuIEEgc3lzdGVtIGlzIHRoZSBzYW1lIHRoaW5nIGFzIHNpZ25hbCBlbmVyZ3kuIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIGNoYXB0ZXIgaW50cm9kdWNlcyBhIHN5c3RlbSBhcyBzb21ldGhpbmcgdGhhdCB0YWtlcyBzaWduYWxzIGFzIGlucHV0cyBhbmQgcHJvZHVjZXMgc2lnbmFscyBhcyBvdXRwdXRzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoYXQgZGVzY3JpYmVzIGEgc2lnbmFsLCBub3QgYSBzeXN0ZW0uIiwiQyI6IkEgc3lzdGVtIGlzIG11Y2ggbW9yZSBnZW5lcmFsIHRoYW4gYSBmb3JtdWxhIGZvciBwZXJpb2RpYyBzaWduYWxzLiIsIkQiOiJFbmVyZ3kgaXMgYSBtZWFzdXJlIG9mIHNpZ25hbCBzaXplLCBub3QgYSBzeXN0ZW0uIn0sImhpbnQiOiJUaGluayBpbnB1dC1vdXRwdXQgcHJvY2Vzc2luZy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJrcF9lbmVyZ3lfdnNfcG93ZXJfZGVmaW5pdGlvbiIsImxhYmVsIjoiRW5lcmd5IHZzIHBvd2VyIGRlZmluaXRpb25zIGFuZCBjbGFzc2lmaWNhdGlvbiIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2h5IGRvZXMgdGhlIHRleHRib29rIGRlZmluZSBzaWduYWwgc2l6ZSB1c2luZyB8eCh0KXzCsiByYXRoZXIgdGhhbiB4KHQpIGl0c2VsZj8iLCJvcHRpb25zIjpbIkEuIFRvIG1ha2UgdGhlIHNpZ25hbCBhbHdheXMgcGVyaW9kaWMiLCJCLiBUbyBhdm9pZCBwb3NpdGl2ZSBhbmQgbmVnYXRpdmUgY2FuY2VsbGF0aW9uIGFuZCBrZWVwIHRoZSBtZWFzdXJlIG5vbm5lZ2F0aXZlIiwiQy4gVG8gZ3VhcmFudGVlIGZpbml0ZSBlbmVyZ3kgZm9yIGV2ZXJ5IHNpZ25hbCIsIkQuIFRvIG1ha2UgdGhlIHVuaXRzIGRpbWVuc2lvbmxlc3MiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJTcXVhcmluZyByZW1vdmVzIHNpZ24gY2FuY2VsbGF0aW9uIGFuZCBtYWtlcyBsYXJnZXIgYW1wbGl0dWRlcyBjb250cmlidXRlIG1vcmUgc3Ryb25nbHkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiU3F1YXJpbmcgZG9lcyBub3QgbWFrZSBhbiBhcmJpdHJhcnkgc2lnbmFsIHBlcmlvZGljLiIsIkMiOiJNYW55IHNpZ25hbHMgc3RpbGwgaGF2ZSBpbmZpbml0ZSBlbmVyZ3kgZXZlbiBhZnRlciBzcXVhcmluZy4iLCJEIjoiVGhlIHRleHQgZXhwbGljaXRseSBzYXlzIHRoZSByZXN1bHQgaXMgbm90IGRpbWVuc2lvbmxlc3MgaW4gZ2VuZXJhbC4ifSwiaGludCI6IkZvY3VzIG9uIHdoeSBhcmVhIHVuZGVyIHgodCkgY2FuIGJlIG1pc2xlYWRpbmcuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBjb250aW51b3VzLXRpbWUgc2lnbmFsIHNhdGlzZmllcyB4KHQpIOKGkiAwIGFzIHx0fCDihpIg4oieLiBXaGF0IGlzIHVzdWFsbHkgdGhlIG1vc3Qgc3VpdGFibGUgc2l6ZSBtZWFzdXJlPyIsIm9wdGlvbnMiOlsiQS4gUG93ZXIiLCJCLiBFbmVyZ3kiLCJDLiBGcmVxdWVuY3kiLCJELiBQaGFzZSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlNpZ25hbHMgdGhhdCBkaWUgb3V0IGFyZSB0eXBpY2FsbHkgY2xhc3NpZmllZCBieSBmaW5pdGUgZW5lcmd5LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlBvd2VyIGlzIHVzdWFsbHkgdGhlIGJldHRlciBtZWFzdXJlIGZvciBzaWduYWxzIHRoYXQgcGVyc2lzdCBvdmVyIHRpbWUuIiwiQyI6IkZyZXF1ZW5jeSBpcyBub3QgYSBzaXplIG1lYXN1cmUuIiwiRCI6IlBoYXNlIGlzIG5vdCBhIHNpemUgbWVhc3VyZS4ifSwiaGludCI6IkR5aW5nIG91dCBzdWdnZXN0cyB0b3RhbCBhY2N1bXVsYXRlZCBzcXVhcmVkIGFtcGxpdHVkZSBzdGF5cyBmaW5pdGUuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EzIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJBIG5vbnplcm8gcGVyaW9kaWMgc2lnbmFsIGlzIG1vc3QgbmF0dXJhbGx5IGNsYXNzaWZpZWQgdXNpbmcgd2hpY2ggbWVhc3VyZT8iLCJvcHRpb25zIjpbIkEuIEVuZXJneSwgYmVjYXVzZSBwZXJpb2RpYyBzaWduYWxzIGFsd2F5cyBkaWUgb3V0IiwiQi4gRW5lcmd5LCBiZWNhdXNlIGF2ZXJhZ2luZyBpcyBub3QgYWxsb3dlZCIsIkMuIFBvd2VyLCBiZWNhdXNlIHRoZSBzaWduYWwgY29udGludWVzIGluZGVmaW5pdGVseSBhbmQgaGFzIGEgcmVwZWF0YWJsZSBsb25nLXRlcm0gYXZlcmFnZSIsIkQuIE5laXRoZXIgZW5lcmd5IG5vciBwb3dlciJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IkEgbm9uemVybyBwZXJpb2RpYyBzaWduYWwgdHlwaWNhbGx5IGhhcyBpbmZpbml0ZSBlbmVyZ3kgYnV0IGZpbml0ZSBhdmVyYWdlIHBvd2VyLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlBlcmlvZGljIHNpZ25hbHMgZG8gbm90IGRpZSBvdXQuIiwiQiI6IkF2ZXJhZ2luZyBvdmVyIG9uZSBwZXJpb2QgaXMgZXhhY3RseSB0aGUgc3RhbmRhcmQgc2hvcnRjdXQuIiwiRCI6IlBvd2VyIGlzIHRoZSBzdGFuZGFyZCBtZWFzdXJlIGhlcmUuIn0sImhpbnQiOiJUaGluayAna2VlcHMgZ29pbmcgZm9yZXZlcicuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJrcF9maWd1cmVfYmFzZWRfY2xhc3NpZmljYXRpb24iLCJsYWJlbCI6IlJlYWRpbmcgd2F2ZWZvcm0gc2hhcGUgdG8gY2xhc3NpZnkgYSBzaWduYWwiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgcGxvdHRlZCB3YXZlZm9ybSBkZWNheXMgdG93YXJkIHplcm8gYXMgdGltZSBtb3ZlcyB0byBib3RoICviiJ4gYW5kIOKIkuKIni4gV2hpY2ggY29uY2x1c2lvbiBpcyBtb3N0IGFwcHJvcHJpYXRlPyIsIm9wdGlvbnMiOlsiQS4gSXQgaXMgbmF0dXJhbGx5IHRyZWF0ZWQgYXMgYW4gZW5lcmd5IHNpZ25hbCIsIkIuIEl0IG11c3QgaGF2ZSBpbmZpbml0ZSBwb3dlciBvbmx5IiwiQy4gSXQgbXVzdCBiZSBwZXJpb2RpYyIsIkQuIEl0cyBybXMgdmFsdWUgbXVzdCBiZSB6ZXJvIGF0IGFsbCB0aW1lcyJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IkEgZGVjYXlpbmcgd2F2ZWZvcm0gaXMgdGhlIHRleHRib29rIHBhdHRlcm4gZm9yIGEgZmluaXRlLWVuZXJneSBzaWduYWwuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhhdCBpcyB0aGUgb3Bwb3NpdGUgb2YgdGhlIHVzdWFsIGNsYXNzaWZpY2F0aW9uLiIsIkMiOiJEZWNheSBkb2VzIG5vdCBpbXBseSBwZXJpb2RpY2l0eS4iLCJEIjoiUm1zIGlzIGEgc3VtbWFyeSBtZWFzdXJlLCBub3QgdGhlIGluc3RhbnRhbmVvdXMgc2lnbmFsIHZhbHVlLiJ9LCJoaW50IjoiTWF0Y2ggdGhlIHNoYXBlIHRvIEZpZ3VyZSAxLjEoYSkuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6IndhdmVmb3JtX2RlY2F5X3ZzX3BlcnNpc3RlbnQiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3AyX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJBIHdhdmVmb3JtIHJlcGVhdHMgZXZlcnkgMiBzZWNvbmRzIGFuZCBkb2VzIG5vdCBkaWUgb3V0LiBXaGljaCBleGFtIHNob3J0Y3V0IGlzIHZhbGlkPyIsIm9wdGlvbnMiOlsiQS4gQ29tcHV0ZSBlbmVyZ3kgb3ZlciBhbGwgdGltZSIsIkIuIENvbXB1dGUgcG93ZXIgYnkgYXZlcmFnaW5nIHx4KHQpfMKyIG92ZXIgb25lIHBlcmlvZCIsIkMuIEl0cyBwb3dlciBtdXN0IGJlIHplcm8gYmVjYXVzZSBwb3NpdGl2ZSBhbmQgbmVnYXRpdmUgdmFsdWVzIGNhbmNlbCIsIkQuIEl0cyBlbmVyZ3kgbXVzdCBlcXVhbCBpdHMgcm1zIHZhbHVlIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiRm9yIHBlcmlvZGljIHNpZ25hbHMsIGF2ZXJhZ2UgcG93ZXIgY2FuIGJlIGZvdW5kIGZyb20gb25lIHBlcmlvZC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJGb3IgYSBub256ZXJvIHBlcmlvZGljIHNpZ25hbCwgdG90YWwgZW5lcmd5IG92ZXIgYWxsIHRpbWUgaXMgdHlwaWNhbGx5IGluZmluaXRlLiIsIkMiOiJQb3dlciB1c2VzIHx4KHQpfMKyLCBzbyBzaWduIGNhbmNlbGxhdGlvbiBpcyBub3QgdGhlIGlzc3VlLiIsIkQiOiJFbmVyZ3kgYW5kIHJtcyBhcmUgZGlmZmVyZW50IGNvbmNlcHRzLiJ9LCJoaW50IjoiVXNlIHRoZSBwZXJpb2RpYy1zaWduYWwgc2hvcnRjdXQgc3RhdGVkIGluIHRoZSB0ZXh0LiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJwZXJpb2RpY193YXZlZm9ybSIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoia3BfcG93ZXJfcm1zX2Zvcm11bGFzIiwibGFiZWwiOiJQb3dlciBhbmQgcm1zIGZvcm11bGFzIGZvciBzdGFuZGFyZCBzaWduYWxzIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IEMgY29zKM+J4oKAdCArIM64KSB3aXRoIM+J4oKAIOKJoCAwLCB3aGF0IGlzIHRoZSBhdmVyYWdlIHBvd2VyPyIsIm9wdGlvbnMiOlsiQS4gQyIsIkIuIEPCsiIsIkMuIEPCsi8yIiwiRC4gMCJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IkEgc2ludXNvaWQgb2YgYW1wbGl0dWRlIEMgaGFzIGF2ZXJhZ2UgcG93ZXIgQ8KyLzIsIGluZGVwZW5kZW50IG9mIHBoYXNlLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlBvd2VyIHNjYWxlcyB3aXRoIGFtcGxpdHVkZSBzcXVhcmVkLCBub3QgYW1wbGl0dWRlLiIsIkIiOiJUaGF0IGlzIHRoZSBkYy1zaWduYWwgcmVzdWx0LCBub3QgdGhlIHNpbnVzb2lkIHJlc3VsdC4iLCJEIjoiQSBub256ZXJvIHNpbnVzb2lkIGhhcyBub256ZXJvIGF2ZXJhZ2UgcG93ZXIuIn0sImhpbnQiOiJNZW1vcml6ZSB0aGUgc3RhbmRhcmQgc2ludXNvaWQgcmVzdWx0LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIGEgc2lnbmFsIGhhcyBhdmVyYWdlIHBvd2VyIFBfeCwgaXRzIHJtcyB2YWx1ZSBpcyIsIm9wdGlvbnMiOlsiQS4gUF94wrIiLCJCLiAxL1BfeCIsIkMuIOKImihQX3gpIiwiRC4gMlBfeCJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IkJ5IGRlZmluaXRpb24sIHJtcyBpcyB0aGUgc3F1YXJlIHJvb3Qgb2YgYXZlcmFnZSBwb3dlci4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGF0IGdvZXMgaW4gdGhlIHdyb25nIGRpcmVjdGlvbi4iLCJCIjoiVGhlcmUgaXMgbm8gcmVjaXByb2NhbCByZWxhdGlvbiBoZXJlLiIsIkQiOiJUaGVyZSBpcyBubyBmYWN0b3Igb2YgMiBpbiB0aGUgZ2VuZXJhbCBkZWZpbml0aW9uLiJ9LCJoaW50IjoiUk1TIGxpdGVyYWxseSBtZWFucyByb290LW1lYW4tc3F1YXJlLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDNfcTMiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciB4KHQpID0gRCBlXntqz4nigoB0fSwgd2hhdCBpcyB0aGUgYXZlcmFnZSBwb3dlcj8iLCJvcHRpb25zIjpbIkEuIETCsiIsIkIuIHxEfCIsIkMuIHxEfMKyIiwiRC4gMCJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IkJlY2F1c2UgfGVee2rPieKCgHR9fCA9IDEsIHRoZSBtYWduaXR1ZGUgb2YgdGhlIHNpZ25hbCBpcyBjb25zdGFudCBhbmQgZXF1YWwgdG8gfER8LCBzbyBwb3dlciBpcyB8RHzCsi4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJGb3IgY29tcGxleCBELCBwb3dlciB1c2VzIG1hZ25pdHVkZSBzcXVhcmVkLCBub3QgRCBzcXVhcmVkLiIsIkIiOiJUaGF0IGlzIHRoZSBybXMgdmFsdWUsIG5vdCB0aGUgcG93ZXIuIiwiRCI6IlRoZSBzaWduYWwgbWFnbml0dWRlIGlzIG5vdCB6ZXJvLiJ9LCJoaW50IjoiUmVtZW1iZXIgdGhlIHVuaXQgbWFnbml0dWRlIG9mIHRoZSBjb21wbGV4IGV4cG9uZW50aWFsLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDNfcTQiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IlN0YXRlIHRoZSBjb25kaXRpb24gdW5kZXIgd2hpY2ggeW91IG1heSBhZGQgdGhlIHBvd2VycyBvZiB0d28gc2ludXNvaWRzIGRpcmVjdGx5LCBhbmQgZXhwbGFpbiB0aGUgbWFpbiBleGNlcHRpb24gbWVudGlvbmVkIGluIHRoZSB0ZXh0LiIsImlkZWFsX2Fuc3dlciI6IllvdSBtYXkgYWRkIHRoZSBwb3dlcnMgZGlyZWN0bHkgd2hlbiB0aGUgc2ludXNvaWRzIGhhdmUgZGlzdGluY3QgZnJlcXVlbmNpZXMsIGJlY2F1c2UgdGhlIGNyb3NzIHRlcm0gYXZlcmFnZXMgdG8gemVybyBvdmVyIGEgbG9uZyBpbnRlcnZhbC4gSWYgdGhlIGZyZXF1ZW5jaWVzIGFyZSBpZGVudGljYWwsIHRoZSBjcm9zcyB0ZXJtIG1heSBpbmNsdWRlIGEgY29uc3RhbnQgdGVybSBkZXBlbmRpbmcgb24gcGhhc2UsIHNvIHRoZSB0b3RhbCBwb3dlciBpcyBub3QganVzdCB0aGUgc3VtIG9mIHRoZSBpbmRpdmlkdWFsIHBvd2Vycy4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IHN0YXRlICdkaXN0aW5jdCBmcmVxdWVuY2llcycgb3IgYW4gZXF1aXZhbGVudCBjb25kaXRpb24iLCJNdXN0IG1lbnRpb24gdGhlIGNyb3NzIHRlcm0gYXZlcmFnaW5nIHRvIHplcm8iLCJNdXN0IG1lbnRpb24gdGhlIGlkZW50aWNhbC1mcmVxdWVuY3kgZXhjZXB0aW9uIiwiTXVzdCBtZW50aW9uIHRoZSByb2xlIG9mIHBoYXNlIGluIHRoYXQgZXhjZXB0aW9uIl0sImV4cGxhbmF0aW9uIjoiVGhpcyB0ZXN0cyB3aGV0aGVyIHRoZSBzdHVkZW50IHVuZGVyc3RhbmRzIHRoZSBjb25kaXRpb24gYmVoaW5kIHRoZSBmb3JtdWxhIHJhdGhlciB0aGFuIG1lbW9yaXppbmcgaXQgYmxpbmRseS4iLCJoaW50IjoiVGhlIHRyYXAgaXMgdGhlIGNyb3NzIHRlcm0uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfV19" style="display:none;"></div>%%KC_END%%
