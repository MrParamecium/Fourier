# Signal Energy and Power

> **Section Objective:** Learn how to assign a single number to a signal's "size" — and know which measure to use depending on the signal's behavior.

---

Imagine two signals side by side. The first is a short radar pulse: it fires, peaks, then decays to zero and stays there. The second is a sinusoid on a power line: it keeps oscillating at the same amplitude, forever. Both are real signals, but they behave very differently over time.

This section asks one exam-important question: **how do we measure the "size" of a signal with a single number when its amplitude changes over time?**

The two main answers are **energy** and **power**. The practical rule is straightforward: if a signal decays and eventually dies out, energy is the right measure. If a signal keeps going — periodic or otherwise non-decaying — power is the right measure.

In exams, you are almost always tested on **classification first**, then calculation. Master the classification rule and the formulas follow naturally.

## 1. Energy of a Signal

Picture a rectangular pulse that is nonzero only between t = 0 and t = 1. Its size depends on both its **amplitude** and its **duration** — a taller pulse or a longer pulse carries more. We need a formula that captures both.

A naive approach — just integrating x(t) over all time — fails immediately. A signal with equal positive and negative lobes would integrate to zero, even if it is clearly not a "zero-size" signal. Positive and negative parts cancel, giving a misleading answer.

The fix is to **square the magnitude first**, then integrate. Squaring removes all sign information and guarantees a nonnegative result. For real-valued signals, |x(t)|² is simply x²(t).

### KEY CLASSIFICATION CLUE

For energy to be finite, the signal **must decay to zero** as |t| → ∞. If the signal does not die away, the integral blows up and energy becomes infinite — useless as a measure.

> **Exam shortcut:** If the signal dies away as time grows large, think **energy first**.

$$E_x = \int_{-\infty}^{\infty} |x(t)|^2\,dt$$
*This formula measures the total accumulated signal strength over all time by summing squared magnitude at every instant, making it the appropriate size measure for signals that eventually decay to zero.*

![Figure 1.1](/figures/page-066-figure_1_1-1.png)
*Fig. 1.1(a) shows a signal that decays toward zero — its finite total area under |x(t)|² makes energy the natural measure; Fig. 1.1(b) shows a signal that continues indefinitely without decaying — energy would be infinite, so power is the appropriate measure instead.*

## 2. Power of a Signal and RMS

Now consider a sinusoid x(t) = C cos(ω₀t + θ) that oscillates forever with constant amplitude. If you try to compute its energy using the integral over all time, the result is infinite — the squared sinusoid never decays, so the area keeps growing without bound. Energy is useless here.

The solution is to **average** the squared magnitude over a very long time window. That average stabilizes to a finite number even when the signal never stops. This long-time average of |x(t)|² is called the **average power** of the signal.

### SHORTCUT FOR PERIODIC SIGNALS

If the signal is periodic with period T₀, you do not need to take the limit over infinite time. Just average over **one period** — the result is the same.

### KEY RESULTS TO MEMORIZE

| Signal | Power | RMS |
|--------|-------|-----|
| C cos(ω₀t + θ), ω₀ ≠ 0 | C²/2 | C/√2 |
| D e^{jω₀t} | \|D\|² | \|D\| |

The **rms (root-mean-square)** value is simply the square root of power. For a sinusoid with amplitude C, rms = C/√2 ≈ 0.707C. This is the value your multimeter reads on an AC circuit.

> **Exam shortcut:** If the signal keeps going forever without decaying, think **power first**.

$$P_x = \lim_{T\to\infty} \frac{1}{T}\int_{-T/2}^{T/2} |x(t)|^2\,dt$$
*This formula averages the squared magnitude over an increasingly long time window, producing a stable finite number that serves as the correct size measure for signals that continue indefinitely.*

## 3. Fast Exam Classification and Worked Examples

### WORKED EXAMPLE 1 — Ex. 1.1 Style

Given two signals: one that decays exponentially to zero, and one that is a pure sinusoid. The decaying signal has **finite energy** (the integral of its square converges). The sinusoid has **infinite energy** but **finite power** (its time-averaged square is C²/2). Classification is immediate from the decay test.

### WORKED EXAMPLE 2 — Sum of Sinusoids (Ex. 1.2b Style)

For x(t) = C₀ + C₁cos(ω₁t) + C₂cos(ω₂t) with ω₁ ≠ ω₂, the total power is:

**P = C₀² + C₁²/2 + C₂²/2**

When frequencies are **distinct**, individual powers simply add. The dc term C₀ contributes C₀² (not C₀²/2 — a common trap).

### EXAM DECISION CHECKLIST

1. Does the signal decay to 0 as |t| → ∞? → **Energy signal candidate**
2. Is the signal periodic or non-decaying? → **Power signal candidate**
3. Is total energy finite? If yes → energy signal
4. If periodic, average |x(t)|² over one period to find power

### COMMON MISTAKE

For standard signals in this section, a signal almost never has **both** finite energy and finite nonzero power simultaneously. If you get both, recheck your calculation.

---
**📌 Key Takeaways**
- Decaying signals use energy: E = integral of |x(t)|² over all time
- Ongoing or periodic signals use power: P = long-time average of |x(t)|²
- RMS = square root of power; sinusoid C cos(ω₀t) has power C²/2 and rms C/√2
- **Exam cheat-sheet:**
- Classify: decay → energy; periodic/non-decaying → power
- Sinusoid power: C²/2; complex exponential power: |D|²
- Sum of distinct-frequency sinusoids: add individual powers
- DC term C₀ contributes C₀² to total power (not C₀²/2)
- Periodic signal: average over one period T₀ instead of all time

*In the next section we will examine how signals are transformed and combined through systems, building on the energy and power concepts established here.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImtwX2VuZXJneV92c19wb3dlcl9jbGFzc2lmaWNhdGlvbiIsImxhYmVsIjoiQ2xhc3NpZnlpbmcgYSBzaWduYWwgYXMgZW5lcmd5IG9yIHBvd2VyIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBzaWduYWwgaXMgbW9zdCBuYXR1cmFsbHkgdHJlYXRlZCBhcyBhbiBlbmVyZ3kgc2lnbmFsPyIsIm9wdGlvbnMiOlsiQS4gQSBzaW51c29pZCB0aGF0IGNvbnRpbnVlcyBmb3JldmVyIHdpdGggY29uc3RhbnQgYW1wbGl0dWRlIiwiQi4gQSBwZXJpb2RpYyBzcXVhcmUgd2F2ZSIsIkMuIEEgcHVsc2UgdGhhdCBkZWNheXMgdG8gMCBhcyB8dHwgYmVjb21lcyBsYXJnZSIsIkQuIEEgbm9uemVybyBjb25zdGFudCBzaWduYWwiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJBIGRlY2F5aW5nIHNpZ25hbCBjYW4gaGF2ZSBhIGZpbml0ZSB0b3RhbCBpbnRlZ3JhbCBvZiB8eCh0KXzCsiBvdmVyIGFsbCB0aW1lLCBzbyBlbmVyZ3kgaXMgdGhlIHVzZWZ1bCBtZWFzdXJlLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkEgY29udGludWluZyBzaW51c29pZCBoYXMgaW5maW5pdGUgdG90YWwgZW5lcmd5LCBzbyBwb3dlciBpcyB0aGUgdXNlZnVsIG1lYXN1cmUuIiwiQiI6IkEgcGVyaW9kaWMgc3F1YXJlIHdhdmUgY29udGludWVzIGZvcmV2ZXIsIHNvIHBvd2VyIGlzIHRoZSBuYXR1cmFsIG1lYXN1cmUuIiwiRCI6IkEgbm9uemVybyBjb25zdGFudCBzaWduYWwgZG9lcyBub3QgZGVjYXksIHNvIGl0cyBlbmVyZ3kgaXMgaW5maW5pdGUgYW5kIHBvd2VyIGlzIHRoZSB1c2VmdWwgbWVhc3VyZS4ifSwiaGludCI6IkFzayB3aGV0aGVyIHRoZSBzaWduYWwgZGllcyBhd2F5IGFzIHRpbWUgZ29lcyB0byBwbHVzIG9yIG1pbnVzIGluZmluaXR5LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBzaWduYWwgZG9lcyBub3QgYXBwcm9hY2ggMCBhcyB8dHwg4oaSIOKIniwgYnV0IGl0IGlzIHBlcmlvZGljLiBXaGF0IGlzIHRoZSBiZXN0IGNvbmNsdXNpb24/Iiwib3B0aW9ucyI6WyJBLiBJdHMgZW5lcmd5IGlzIHRoZSBwcmVmZXJyZWQgZmluaXRlIG1lYXN1cmUiLCJCLiBJdHMgcG93ZXIgbWF5IGV4aXN0IGFuZCBpcyB0aGUgcHJlZmVycmVkIG1lYXN1cmUiLCJDLiBCb3RoIGl0cyBmaW5pdGUgZW5lcmd5IGFuZCBmaW5pdGUgcG93ZXIgbXVzdCBiZSB6ZXJvIiwiRC4gSXQgY2Fubm90IGJlIGFuYWx5emVkIGJ5IHRoZSBmb3JtdWxhcyBpbiB0aGlzIHNlY3Rpb24iXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJQZXJpb2RpYyBub24tZGVjYXlpbmcgc2lnbmFscyBhcmUgc3RhbmRhcmQgcG93ZXIgc2lnbmFscy4gVGhlaXIgYXZlcmFnZSBzcXVhcmVkIG1hZ25pdHVkZSBvdmVyIG9uZSBwZXJpb2QgZ2l2ZXMgcG93ZXIuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiTm9uLWRlY2F5aW5nIHBlcmlvZGljIHNpZ25hbHMgdHlwaWNhbGx5IGhhdmUgaW5maW5pdGUgZW5lcmd5LiIsIkMiOiJUaGF0IGlzIGZhbHNlOyBhIHBlcmlvZGljIHNpZ25hbCBjYW4gaGF2ZSBub256ZXJvIGZpbml0ZSBwb3dlci4iLCJEIjoiVGhpcyBzZWN0aW9uIHNwZWNpZmljYWxseSBnaXZlcyB0aGUgcG93ZXIgbWV0aG9kIGZvciBzdWNoIHNpZ25hbHMuIn0sImhpbnQiOiJUaGluazogb25nb2luZyBzaWduYWwg4oaSIGF2ZXJhZ2Ugb3ZlciB0aW1lLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoia3BfZW5lcmd5X2Zvcm11bGFfbWVhbmluZyIsImxhYmVsIjoiTWVhbmluZyBvZiB0aGUgZW5lcmd5IGZvcm11bGEiLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaHkgaXMgc2lnbmFsIGVuZXJneSBkZWZpbmVkIHVzaW5nIHx4KHQpfMKyIGluc3RlYWQgb2YganVzdCB4KHQpPyIsIm9wdGlvbnMiOlsiQS4gQmVjYXVzZSB4KHQpIGlzIGFsd2F5cyBjb21wbGV4IiwiQi4gQmVjYXVzZSBwb3NpdGl2ZSBhbmQgbmVnYXRpdmUgcGFydHMgb2YgeCh0KSBjb3VsZCBjYW5jZWwgaWYgd2Ugb25seSBpbnRlZ3JhdGUgeCh0KSIsIkMuIEJlY2F1c2Ugc3F1YXJpbmcgYWx3YXlzIG1ha2VzIHRoZSBzaWduYWwgcGVyaW9kaWMiLCJELiBCZWNhdXNlIGludGVncmF0aW5nIHgodCkgaXMgaW1wb3NzaWJsZSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBzcXVhcmUgcmVtb3ZlcyBzaWduIGNhbmNlbGxhdGlvbiBhbmQgZ2l2ZXMgYSBub25uZWdhdGl2ZSBtZWFzdXJlIG9mIGFjY3VtdWxhdGVkIHNpZ25hbCBzaXplLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlJlYWwtdmFsdWVkIHNpZ25hbHMgYWxzbyB1c2UgdGhlIHNxdWFyZWQgZm9ybS4iLCJDIjoiU3F1YXJpbmcgZG9lcyBub3QgZ2VuZXJhbGx5IG1ha2UgYSBzaWduYWwgcGVyaW9kaWMuIiwiRCI6IkludGVncmF0aW5nIHgodCkgaXMgcG9zc2libGUsIGJ1dCBpdCBpcyBub3QgYSByZWxpYWJsZSBzaXplIG1lYXN1cmUuIn0sImhpbnQiOiJUaGluayBhYm91dCBhIHNpZ25hbCB3aXRoIGVxdWFsIHBvc2l0aXZlIGFuZCBuZWdhdGl2ZSBhcmVhLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6ImtwX3BlcmlvZGljX3Bvd2VyX2FuZF9ybXMiLCJsYWJlbCI6IlBvd2VyIGFuZCBybXMgb2Ygc3RhbmRhcmQgcGVyaW9kaWMgc2lnbmFscyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHgodCkgPSBDIGNvcyjPieKCgHQgKyDOuCkgd2l0aCDPieKCgCDiiaAgMCwgd2hhdCBhcmUgdGhlIHBvd2VyIGFuZCBybXMgdmFsdWU/Iiwib3B0aW9ucyI6WyJBLiBQb3dlciA9IEPCsiwgcm1zID0gQyIsIkIuIFBvd2VyID0gQ8KyLzIsIHJtcyA9IEMv4oiaMiIsIkMuIFBvd2VyID0gQy8yLCBybXMgPSBDwrIvMiIsIkQuIFBvd2VyID0gMCwgcm1zID0gMCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkEgbm9uemVyby1mcmVxdWVuY3kgc2ludXNvaWQgaGFzIGF2ZXJhZ2Ugc3F1YXJlZCB2YWx1ZSBlcXVhbCB0byAxLzIgdGltZXMgdGhlIGFtcGxpdHVkZSBzcXVhcmVkLCBzbyBwb3dlciBpcyBDwrIvMiBhbmQgcm1zIGlzIGl0cyBzcXVhcmUgcm9vdCBDL+KImjIuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhhdCB3b3VsZCBiZSB0cnVlIGZvciBhIGNvbnN0YW50IHNpZ25hbCBvZiBhbXBsaXR1ZGUgQywgbm90IGEgc2ludXNvaWQuIiwiQyI6IlRoZSB1bml0cyBhbmQgcmVsYXRpb25zaGlwcyBhcmUgd3JvbmcuIiwiRCI6IkEgc2ludXNvaWQgaGFzIG5vbnplcm8gYXZlcmFnZSBzcXVhcmVkIG1hZ25pdHVkZS4ifSwiaGludCI6IlJlbWVtYmVyIHRoZSB0ZXh0Ym9vayByZXN1bHQgZm9yIGEgcHVyZSBzaW51c29pZC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciB0aGUgY29tcGxleCBzaWduYWwgeCh0KSA9IEQgZV57as+J4oKAdH0sIHdoYXQgaXMgaXRzIHBvd2VyPyIsIm9wdGlvbnMiOlsiQS4gfER8IiwiQi4gfER8LzIiLCJDLiB8RHzCsiIsIkQuIDJ8RHzCsiJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlNpbmNlIHxlXntqz4nigoB0fXwgPSAxLCB0aGUgc3F1YXJlZCBtYWduaXR1ZGUgaXMgY29uc3RhbnQgYW5kIGVxdWFsIHRvIHxEfMKyIGF0IGV2ZXJ5IGluc3RhbnQsIHNvIHRoZSB0aW1lIGF2ZXJhZ2UgaXMgYWxzbyB8RHzCsi4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGF0IGlzIHRoZSBybXMgdmFsdWUsIG5vdCB0aGUgcG93ZXIuIiwiQiI6IlRoZXJlIGlzIG5vIGZhY3RvciBvZiAxLzIgZm9yIHRoZSBjb21wbGV4IGV4cG9uZW50aWFsIG1hZ25pdHVkZSBoZXJlLiIsIkQiOiJUaGUgcmVzdWx0IGlzIHRvbyBsYXJnZSBieSBhIGZhY3RvciBvZiAyLiJ9LCJoaW50IjoiVXNlIHxlXntqz4nigoB0fXwgPSAxLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6ImtwX3N1bV9vZl9zaW51c29pZHMiLCJsYWJlbCI6IlBvd2VyIG9mIHN1bXMgb2YgZGlzdGluY3QtZnJlcXVlbmN5IHNpbnVzb2lkcyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNF9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiU3VwcG9zZSB4KHQpID0gMyBjb3Moz4nigoF0KSArIDQgY29zKM+J4oKCdCkgd2hlcmUgz4nigoEg4omgIM+J4oKCLiBXaGF0IGlzIHRoZSBwb3dlcj8iLCJvcHRpb25zIjpbIkEuIDI1IiwiQi4gMTIuNSIsIkMuIDMuNSIsIkQuIDciXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJGb3IgZGlzdGluY3QgZnJlcXVlbmNpZXMsIHBvd2VycyBhZGQ6IDPCsi8yICsgNMKyLzIgPSA5LzIgKyAxNi8yID0gMjUvMiA9IDEyLjUuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhhdCBhcHBsaWVzIHRoZSBzcXVhcmUgb2YgdGhlIHN1bSBvZiBhbXBsaXR1ZGVzLCB3aGljaCBpcyBub3QgY29ycmVjdCBoZXJlLiIsIkMiOiJUaGlzIGlzIHRvbyBzbWFsbCBhbmQgZG9lcyBub3QgbWF0Y2ggdGhlIGZvcm11bGEuIiwiRCI6IlRoaXMgYWRkcyBhbXBsaXR1ZGVzIHJhdGhlciB0aGFuIHBvd2Vycy4ifSwiaGludCI6IkFkZCBpbmRpdmlkdWFsIHBvd2Vycywgbm90IGFtcGxpdHVkZXMuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3A0X3EyIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJBIHN0dWRlbnQgY2xhaW1zIHRoYXQgdGhlIHBvd2VyIG9mIHgodCkgPSBD4oKAICsgQ+KCgWNvcyjPiXQgKyDOuCkgaXMganVzdCBD4oKBwrIvMiBiZWNhdXNlIHRoZSBjb3NpbmUgcGFydCBpcyB0aGUgb25seSBvc2NpbGxhdGluZyBwYXJ0LiBXaGF0IGlzIG1pc3NpbmcgZnJvbSB0aGF0IGFuc3dlcj8iLCJpZGVhbF9hbnN3ZXIiOiJJdCBpcyBtaXNzaW5nIHRoZSBkYyBjb250cmlidXRpb24uIFRoZSBjb3JyZWN0IHRvdGFsIHBvd2VyIGlzIEPigoDCsiArIEPigoHCsi8yLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3Qgc3RhdGUgdGhhdCB0aGUgZGMgdGVybSBjb250cmlidXRlcyBwb3dlciIsIk11c3QgZ2l2ZSB0aGUgY29ycmVjdCB0b3RhbCBwb3dlciBD4oKAwrIgKyBD4oKBwrIvMiIsIlNob3VsZCBpbmRpY2F0ZSB0aGF0IGEgY29uc3RhbnQgKGRjKSBzaWduYWwgaGFzIG5vbnplcm8gcG93ZXIgZXF1YWwgdG8gaXRzIHZhbHVlIHNxdWFyZWQiXSwiZXhwbGFuYXRpb24iOiJUaGlzIGNoZWNrcyB3aGV0aGVyIHRoZSBzdHVkZW50IHJlbWVtYmVycyB0aGF0IGEgY29uc3RhbnQgc2lnbmFsIEPigoAgaGFzIHBvd2VyIEPigoDCsiwgbm90IHplcm8sIGFuZCB0aGF0IHRoaXMgbXVzdCBiZSBhZGRlZCB0byB0aGUgc2ludXNvaWRhbCBjb21wb25lbnQncyBwb3dlci4iLCJoaW50IjoiQSBjb25zdGFudCBzaWduYWwgaGFzIG5vbnplcm8gcG93ZXIg4oCUIHdoYXQgaXMgdGhlIHBvd2VyIG9mIGEgc2lnbmFsIHgodCkgPSBD4oKAPyIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
