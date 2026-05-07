# Signal Energy and Power

> **Section Objective:** Learn how to measure the "size" of a signal that changes over time, and know when to use energy versus power as that measure.

---

How do we measure the size of a signal that changes over time? Consider two signals: a short pulse of amplitude 10 that lasts only 0.1 seconds, and a gentler signal of amplitude 2 that runs for hours. Which is "bigger"? The answer depends on both amplitude and duration — a meaningful size measure must account for both.

This section introduces two exam-critical measures. **Energy** is the right measure for signals that eventually die out — they have a finite total "area" under their squared magnitude. **Power** is the right measure for signals that persist indefinitely, where total energy would be infinite but the long-run average is well-defined.

These concepts reappear throughout the course in topics like approximation error and signal quality. The mathematics involved is basic: only integrals of squared magnitude, nothing beyond that.

![Figure 1.1](/figures/page-066-figure_1_1-1.png)
*The left sketch shows a signal that fades to zero — its finite total area makes energy the natural size measure — while the right sketch shows a signal that persists indefinitely, making average power the appropriate measure.*

## 1. Energy vs Power: the core classification rule

A naive idea for measuring signal size is to integrate x(t) over all time. This fails immediately: positive and negative portions cancel, so a large oscillating signal could appear to have zero size. The fix is to square the signal first — squaring removes sign and emphasizes large values.

### THE CLASSIFICATION RULE

The practical decision comes down to one question: **does the signal die out?**

- If x(t) → 0 as |t| → ∞, the signal is likely an **energy signal** with finite E_x.
- If x(t) does not die out (e.g., a sinusoid, a constant, a square wave), then E_x is infinite and **power** is the meaningful measure instead.

### WORKED EXAMPLE

Let x(t) = 2 for −1 ≤ t ≤ 1, and x(t) = 0 otherwise.

**Step 1:** Write the energy integral with correct limits:
$$E_x = \int_{-1}^{1} |2|^2\,dt$$

**Step 2:** Square the amplitude: |2|² = 4.

**Step 3:** Integrate over the interval of length 2:
$$E_x = 4 \times 2 = 8$$

The signal is zero outside [−1, 1], so those regions contribute nothing. The answer is **E_x = 8**.

#### Note
Always square the amplitude before multiplying by duration — a common exam mistake is to forget the squaring step.

$$E_x = \int_{-\infty}^{\infty} |x(t)|^2\,dt \qquad P_x = \lim_{T\to\infty}\frac{1}{T}\int_{-T/2}^{T/2}|x(t)|^2\,dt$$
*Energy accumulates the squared magnitude of the signal over all time, giving a total measure of how much the signal "does" in its entire lifetime. Power averages that squared magnitude over a very long time window, giving a per-unit-time measure that stays finite even when the signal never stops.*

## 2. How to compute power, especially for periodic signals

Consider x(t) = C cos(ω₀t + θ). This signal oscillates forever — it never decays to zero. Integrating its squared magnitude over all time gives infinity, so energy is not useful here. Instead, we measure **power**: the long-run average of |x(t)|².

### THE ONE-PERIOD SHORTCUT

For any periodic signal, averaging |x(t)|² over one full period T₀ gives exactly the same result as the infinite-time limit. This is the key exam shortcut:

$$P_x = \frac{1}{T_0}\int_{0}^{T_0}|x(t)|^2\,dt$$

### KEY RESULTS TO MEMORIZE

| Signal type | Power | RMS |
|---|---|---|
| C cos(ω₀t + θ), ω₀ ≠ 0 | C²/2 | C/√2 |
| x(t) = C (constant dc) | C² | \|C\| |

Note the **dc exception**: a constant signal x(t) = C has power C², not C²/2.

### WORKED EXAMPLE

For x(t) = 3 cos(2t):

**Step 1:** Identify amplitude C = 3.

**Step 2:** Apply the sinusoid power formula:
$$P_x = \frac{C^2}{2} = \frac{9}{2}$$

**Step 3:** Take the square root for rms:
$$x_{\text{rms}} = \frac{C}{\sqrt{2}} = \frac{3}{\sqrt{2}}$$

Phase (here zero) has no effect on power or rms.

![Fig. 1.2](/figures/page-067-fig_12-1.png)
*These two textbook examples model the two main exam cases: a time-limited or decaying signal whose size is measured by total energy, and a repeating periodic signal whose size is measured by average power.*

## 3. Common exam patterns and traps

Use this checklist under time pressure:

### CLASSIFICATION CHECKLIST

1. **Signal → 0 as |t| → ∞?** Think energy first. Compute E_x using the full-time integral.
2. **Signal periodic and non-decaying?** Think power first. Use the one-period shortcut.
3. **Do not confuse x(t) with |x(t)|².** The formula requires squaring the signal — never integrate x(t) itself.
4. **rms is the square root of power.** If P_x = C²/2, then x_rms = C/√2. Always take the square root at the end.
5. **Sum of sinusoids with distinct nonzero frequencies:** powers add independently. Total power is:
$$P_x = C_0^2 + \frac{1}{2}\sum_{n} C_n^2$$
   where C₀ is the dc (constant) component and each Cₙ is a sinusoid amplitude.
6. **Complex exponential:** x(t) = De^{jω₀t} has power |D|² and rms |D|, because |e^{jω₀t}| = 1 always.

### WARNING

> A persistent sinusoid such as cos(t) has **infinite energy** — never claim it has finite energy just because its amplitude is bounded. Bounded amplitude and finite energy are not the same thing.

$$P_x = C_0^2 + \frac{1}{2}\sum_{n=1}^{\infty} C_n^2 \qquad \text{and} \qquad x(t)=De^{j\omega_0 t}\Rightarrow P_x=|D|^2$$
*When a signal is built from a dc level plus multiple sinusoids at distinct nonzero frequencies, each component contributes independently to total power — they do not interact. A pure complex exponential De^{jω₀t} has constant magnitude |D| at every instant, so its average squared magnitude is simply |D|², making the power calculation immediate.*

---
**📌 Key Takeaways**
- If a signal decays to zero, use energy; if it persists forever, use power.
- For periodic signals, average |x(t)|² over one period to find power efficiently.
- RMS is the square root of power; for a sinusoid of amplitude C, rms = C/√2.

*In the next section we will continue building the basic language of signals and systems.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImtwX2NsYXNzaWZ5X2VuZXJneV92c19wb3dlciIsImxhYmVsIjoiQ2xhc3NpZnkgd2hldGhlciBlbmVyZ3kgb3IgcG93ZXIgaXMgdGhlIHN1aXRhYmxlIHNpZ25hbC1zaXplIG1lYXN1cmUiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHNpZ25hbCBpcyBtb3N0IG5hdHVyYWxseSB0cmVhdGVkIGFzIGFuIGVuZXJneSBzaWduYWwgcmF0aGVyIHRoYW4gYSBwb3dlciBzaWduYWw/Iiwib3B0aW9ucyI6WyJBLiB4KHQpID0gNGNvcygzdCkiLCJCLiB4KHQpID0gMiBmb3IgYWxsIHQiLCJDLiB4KHQpID0gMmVeey10XjJ9IiwiRC4geCh0KSA9IHNxdWFyZSB3YXZlIHdpdGggcGVyaW9kIDEiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJBIGRlY2F5aW5nIHNpZ25hbCBzdWNoIGFzIDJlXnstdF4yfSBhcHByb2FjaGVzIHplcm8gYXMgfHR8IGdyb3dzLCBzbyBmaW5pdGUgZW5lcmd5IGlzIHRoZSBuYXR1cmFsIG1lYXN1cmUuIFRoZSBvdGhlciB0aHJlZSBwZXJzaXN0IGZvcmV2ZXIgYW5kIGFyZSBwb3dlci10eXBlIHNpZ25hbHMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiQSBzaW51c29pZCBjb250aW51ZXMgZm9yZXZlciwgc28gaXRzIGVuZXJneSBpcyBpbmZpbml0ZSBhbmQgcG93ZXIgaXMgdGhlIG1lYW5pbmdmdWwgbWVhc3VyZS4iLCJCIjoiQSBjb25zdGFudCBub256ZXJvIHNpZ25hbCBwZXJzaXN0cyBmb3JldmVyLCBzbyBpdCBpcyBhIHBvd2VyIHNpZ25hbC4iLCJEIjoiQSBwZXJpb2RpYyBzcXVhcmUgd2F2ZSBwZXJzaXN0cyBmb3JldmVyLCBzbyBpdCBpcyBhIHBvd2VyIHNpZ25hbC4ifSwiaGludCI6IkFzayB3aGV0aGVyIHRoZSBzaWduYWwgZGllcyBvdXQgYXMgdGltZSBnb2VzIHRvIHBsdXMgb3IgbWludXMgaW5maW5pdHkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJBIHN0dWRlbnQgc2F5czogJ0JlY2F1c2UgYSBzaW51c29pZCBoYXMgYm91bmRlZCBhbXBsaXR1ZGUsIGl0IG11c3QgaGF2ZSBmaW5pdGUgZW5lcmd5LicgV2hhdCBpcyB0aGUgYmVzdCByZXNwb25zZT8iLCJvcHRpb25zIjpbIkEuIENvcnJlY3QsIGJvdW5kZWQgYW1wbGl0dWRlIGd1YXJhbnRlZXMgZmluaXRlIGVuZXJneSIsIkIuIEluY29ycmVjdCwgYSBub24tZGVjYXlpbmcgc2ludXNvaWQgbGFzdHMgZm9yZXZlciwgc28gaXRzIGVuZXJneSBpcyBpbmZpbml0ZSIsIkMuIENvcnJlY3QsIGJlY2F1c2UgcG9zaXRpdmUgYW5kIG5lZ2F0aXZlIGFyZWFzIGNhbmNlbCIsIkQuIEluY29ycmVjdCwgYnV0IG9ubHkgd2hlbiB0aGUgcGhhc2UgaXMgbm9uemVybyJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkZpbml0ZSBhbXBsaXR1ZGUgYWxvbmUgaXMgbm90IGVub3VnaC4gQSBzaW51c29pZCBkb2VzIG5vdCBkZWNheSB3aXRoIHRpbWUsIHNvIGludGVncmF0aW5nIHx4KHQpfF4yIG92ZXIgYWxsIHRpbWUgZGl2ZXJnZXM7IHRoZXJlZm9yZSBlbmVyZ3kgaXMgaW5maW5pdGUgYW5kIHBvd2VyIGlzIGZpbml0ZS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJCb3VuZGVkIGFtcGxpdHVkZSBkb2VzIG5vdCBndWFyYW50ZWUgZmluaXRlIGVuZXJneSBpZiB0aGUgc2lnbmFsIGxhc3RzIGZvcmV2ZXIuIiwiQyI6IkVuZXJneSB1c2VzIHx4KHQpfF4yLCBzbyBzaWduIGNhbmNlbGxhdGlvbiBpcyBpcnJlbGV2YW50LiIsIkQiOiJUaGUgaXNzdWUgaGFzIG5vdGhpbmcgdG8gZG8gd2l0aCBwaGFzZS4ifSwiaGludCI6IlJlbWVtYmVyIHRoYXQgZW5lcmd5IGludGVncmF0ZXMgc3F1YXJlZCBtYWduaXR1ZGUgb3ZlciBhbGwgdGltZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImtwX2NvbXB1dGVfZW5lcmd5X2Zyb21fZGVmaW5pdGlvbiIsImxhYmVsIjoiQ29tcHV0ZSBlbmVyZ3kgZm9yIGEgc2ltcGxlIGZpbml0ZS1kdXJhdGlvbiBzaWduYWwiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkxldCB4KHQpID0gMyBmb3Ig4oiSMiDiiaQgdCDiiaQgMiBhbmQgeCh0KSA9IDAgb3RoZXJ3aXNlLiBXaGF0IGlzIEVfeD8iLCJvcHRpb25zIjpbIkEuIDEyIiwiQi4gMTgiLCJDLiAzNiIsIkQuIDcyIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiRW5lcmd5IGlzIHRoZSBpbnRlZ3JhbCBvZiB8eCh0KXxeMi4gSGVyZSB8eCh0KXxeMiA9IDkgb3ZlciBhbiBpbnRlcnZhbCBvZiBsZW5ndGggNCwgc28gRV94ID0gOSDDlyA0ID0gMzYuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBpZ25vcmVzIHNxdWFyaW5nIHRoZSBhbXBsaXR1ZGUgb3IgdXNlcyB0aGUgd3JvbmcgaW50ZXJ2YWwgbGVuZ3RoLiIsIkIiOiJUaGlzIGlzIG5vdCBvYnRhaW5lZCBmcm9tIGludGVncmF0aW5nIHRoZSBzcXVhcmVkIG1hZ25pdHVkZSBjb3JyZWN0bHkuIiwiRCI6IlRoaXMgZG91YmxlLWNvdW50cyB0aGUgaW50ZXJ2YWwgb3Igb3RoZXJ3aXNlIG92ZXJlc3RpbWF0ZXMgdGhlIHJlc3VsdC4ifSwiaGludCI6IlNxdWFyZSBmaXJzdCwgdGhlbiBtdWx0aXBseSBieSB0aGUgdGltZSBkdXJhdGlvbiB3aGVyZSB0aGUgc2lnbmFsIGlzIG5vbnplcm8uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoia3BfcGVyaW9kaWNfcG93ZXJfYW5kX3JtcyIsImxhYmVsIjoiQ29tcHV0ZSBwb3dlciBhbmQgcm1zIGZvciBwZXJpb2RpYyBzaWduYWxzIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeCh0KSA9IDVjb3MoMTB0ICsgMC4yKSwgd2hhdCBhcmUgdGhlIHBvd2VyIGFuZCBybXMgdmFsdWU/Iiwib3B0aW9ucyI6WyJBLiBQb3dlciA9IDI1LCBybXMgPSA1IiwiQi4gUG93ZXIgPSAyNS8yLCBybXMgPSA1L+KImjIiLCJDLiBQb3dlciA9IDUvMiwgcm1zID0gMjUv4oiaMiIsIkQuIFBvd2VyID0gMTAsIHJtcyA9IOKImjEwIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiQSBzaW51c29pZCBvZiBhbXBsaXR1ZGUgQyBoYXMgcG93ZXIgQ14yLzIgYW5kIHJtcyBDL+KImjIuIFdpdGggQyA9IDUsIHRoYXQgZ2l2ZXMgMjUvMiBhbmQgNS/iiJoyLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoYXQgd291bGQgYmUgdGhlIGRjIHJlc3VsdCAocG93ZXIgPSBDXjIpLCBub3QgdGhlIG5vbnplcm8tZnJlcXVlbmN5IHNpbnVzb2lkIHJlc3VsdC4iLCJDIjoiUG93ZXIgYW5kIHJtcyBmb3JtdWxhcyBhcmUgbWlzYXBwbGllZCDigJQgdGhlIHZhbHVlcyBhcmUgc3dhcHBlZC4iLCJEIjoiVGhlc2UgdmFsdWVzIGRvIG5vdCBtYXRjaCB0aGUgc3RhbmRhcmQgc2ludXNvaWQgcG93ZXIgZm9ybXVsYS4ifSwiaGludCI6IkZvciBhIG5vbnplcm8tZnJlcXVlbmN5IHNpbnVzb2lkLCBvbmx5IHRoZSBhbXBsaXR1ZGUgbWF0dGVycyBmb3IgcG93ZXIuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBzdGF0ZW1lbnQgYWJvdXQgcGVyaW9kaWMgc2lnbmFscyBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gVGhlaXIgZW5lcmd5IGlzIGFsd2F5cyBmaW5pdGUgYmVjYXVzZSBvbmUgcGVyaW9kIGlzIGZpbml0ZSIsIkIuIFRoZWlyIHBvd2VyIGNhbiBiZSBmb3VuZCBieSBhdmVyYWdpbmcgfHgodCl8XjIgb3ZlciBvbmUgcGVyaW9kIiwiQy4gVGhlaXIgcm1zIHZhbHVlIGVxdWFscyB0aGVpciBhbXBsaXR1ZGUgZm9yIGV2ZXJ5IHdhdmVmb3JtIiwiRC4gVGhlaXIgcG93ZXIgZGVwZW5kcyBzdHJvbmdseSBvbiBwaGFzZSBzaGlmdCBhbG9uZSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkZvciBwZXJpb2RpYyBzaWduYWxzLCBhdmVyYWdpbmcgb3ZlciBvbmUgcGVyaW9kIGdpdmVzIHRoZSBzYW1lIHBvd2VyIGFzIGF2ZXJhZ2luZyBvdmVyIGFuIGluZmluaXRlbHkgbG9uZyB0aW1lIGludGVydmFsLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkEgbm9uemVybyBwZXJpb2RpYyBzaWduYWwgZ2VuZXJhbGx5IGhhcyBpbmZpbml0ZSB0b3RhbCBlbmVyZ3kgb3ZlciBhbGwgdGltZSDigJQgb25lIGZpbml0ZSBwZXJpb2QgcmVwZWF0cyBpbmZpbml0ZWx5LiIsIkMiOiJybXMgZXF1YWxzIGFtcGxpdHVkZSBvbmx5IGZvciBzcGVjaWFsIGNhc2VzIGxpa2UgYSBkYyBzaWduYWw7IGZvciBhIHNpbnVzb2lkLCBybXMgPSBDL+KImjIuIiwiRCI6IkEgcGhhc2Ugc2hpZnQgYWxvbmUgZG9lcyBub3QgY2hhbmdlIGF2ZXJhZ2UgcG93ZXIuIn0sImhpbnQiOiJVc2UgdGhlIG9uZS1wZXJpb2Qgc2hvcnRjdXQgZnJvbSB0aGUgc2VjdGlvbi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImtwX3N1bV9vZl9zaW51c29pZHNfYW5kX2NvbXBsZXhfZXhwb25lbnRpYWwiLCJsYWJlbCI6IlVzZSB0ZXh0Ym9vayBwb3dlciByZXN1bHRzIGZvciBzdW1zIG9mIHNpbnVzb2lkcyBhbmQgY29tcGxleCBleHBvbmVudGlhbHMiLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3A0X3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJTdXBwb3NlIHgodCkgPSAyICsgNGNvcyh0KSArIDZjb3MoM3QpLCB3aGVyZSB0aGUgY29zaW5lIGZyZXF1ZW5jaWVzIGFyZSBkaXN0aW5jdCBhbmQgbm9uemVyby4gV2hhdCBpcyB0aGUgdG90YWwgcG93ZXI/Iiwib3B0aW9ucyI6WyJBLiAyICsgNCArIDYgPSAxMiIsIkIuIDLCsiArICg0wrIgKyA2wrIpLzIgPSAzMCIsIkMuICgyICsgNCArIDYpwrIgPSAxNDQiLCJELiAoNMKyICsgNsKyKS8yID0gMjYiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgZGMgdGVybSBjb250cmlidXRlcyBD4oKAwrIgPSA0LiBFYWNoIHNpbnVzb2lkIGNvbnRyaWJ1dGVzIEPigpnCsi8yLCBzbyB0b3RhbCBwb3dlciBpcyA0ICsgMTYvMiArIDM2LzIgPSA0ICsgOCArIDE4ID0gMzAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiUG93ZXIgaXMgbm90IHRoZSBzdW0gb2YgYW1wbGl0dWRlcyDigJQgYW1wbGl0dWRlcyBtdXN0IGJlIHNxdWFyZWQgZmlyc3QuIiwiQyI6IlNxdWFyaW5nIHRoZSBzdW0gb2YgYW1wbGl0dWRlcyBpcyBub3QgdGhlIGNvcnJlY3QgcnVsZTsgY29tcG9uZW50cyBjb250cmlidXRlIGluZGVwZW5kZW50bHkuIiwiRCI6IlRoaXMgb21pdHMgdGhlIGRjIGNvbnRyaWJ1dGlvbiBvZiAywrIgPSA0LiJ9LCJoaW50IjoiQWRkIGRjIHBvd2VyIGFuZCBzaW51c29pZCBwb3dlcnMgc2VwYXJhdGVseSB1c2luZyB0aGUgZm9ybXVsYSBQX3ggPSBD4oKAwrIgKyAoMS8yKc6jQ+KCmcKyLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDRfcTIiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkZvciB4KHQpID0gM2Vee2o0dH0sIGZpbmQgdGhlIHBvd2VyIGFuZCBybXMgdmFsdWUuIEdpdmUgYSBicmllZiByZWFzb24uIiwiaWRlYWxfYW5zd2VyIjoiUG93ZXIgaXMgfDN8wrIgPSA5IGFuZCBybXMgaXMgfDN8ID0gMywgYmVjYXVzZSB8ZV57ajR0fXwgPSAxIGZvciBhbGwgdCwgc28gdGhlIHNpZ25hbCBoYXMgY29uc3RhbnQgbWFnbml0dWRlIDMuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBnaXZlIHBvd2VyIGFzIDkiLCJNdXN0IGdpdmUgcm1zIGFzIDMiLCJNdXN0IG1lbnRpb24gdGhhdCB8ZV57as+JdH18ID0gMSBvciB0aGF0IHRoZSBtYWduaXR1ZGUgaXMgY29uc3RhbnQiXSwiZXhwbGFuYXRpb24iOiJUaGlzIGNoZWNrcyB3aGV0aGVyIHRoZSBzdHVkZW50IGNhbiB1c2UgdGhlIGNvbXBsZXgtZXhwb25lbnRpYWwgcmVzdWx0IGRpcmVjdGx5IGluc3RlYWQgb2YgdHJ5aW5nIHRvIHRyZWF0IGl0IGxpa2UgYSByZWFsIHNpbnVzb2lkLiIsImhpbnQiOiJUYWtlIHRoZSBtYWduaXR1ZGUgZmlyc3Q6IGNvbXBsZXggZXhwb25lbnRpYWxzIG9uIHRoZSB1bml0IGNpcmNsZSBoYXZlIG1hZ25pdHVkZSAxLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
