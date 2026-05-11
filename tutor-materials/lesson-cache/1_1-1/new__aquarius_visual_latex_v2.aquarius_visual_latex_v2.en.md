%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImdlbmVyYXRlZF9pbWFnZSIsInJhdGlvbmFsZSI6IlRoZSBwYWdlIGhhcyBubyB0ZXh0Ym9vayBmaWd1cmUsIGFuZCB0aGUga2V5IG1pc2NvbmNlcHRpb24gaXMgdmlzdWFsOiBwb3NpdGl2ZSBhbmQgbmVnYXRpdmUgc2lnbmVkIGFyZWFzIGNhbiBjYW5jZWwgZXZlbiB3aGVuIHRoZSBzaWduYWwgaXMgbGFyZ2UuIEEgY3VzdG9tIGxlY3R1cmUtbm90ZSB2aXN1YWwgaXMganVzdGlmaWVkIGJlY2F1c2UgaXQgbXVzdCBjb21wYXJlIHNpZ25lZCBhcmVhIHdpdGggc3F1YXJlZCBtYWduaXR1ZGUgZm9yIG9uZSBzcGVjaWZpYyB0ZWFjaGluZyBwb2ludC4gV2lraXBlZGlhLXN0eWxlIHJlZmVyZW5jZSBpbWFnZXMgYXJlIHVubGlrZWx5IHRvIHNob3cgdGhpcyBleGFjdCBleGFtLXJlbGV2YW50IGNvbnRyYXN0IGNsZWFubHkuIiwiY3JhbSI6IlVzZSB0aGUgdmlzdWFsIHRvIHJlbWVtYmVyOiBpZiBzaXplIGlzIGFza2VkLCBkbyBub3QgaW50ZWdyYXRlIHgodCk7IGludGVncmF0ZSBzcXVhcmVkIG1hZ25pdHVkZS4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgdmlzdWFsIHRvIGNvbm5lY3QgdGhlIGZvcm11bGEgdG8gdGhlIGlkZWEgdGhhdCBzcXVhcmluZyBwcmV2ZW50cyBjYW5jZWxsYXRpb24uIiwidG9wX3Njb3JlIjoiVXNlIHRoZSB2aXN1YWwgdG8gc2VwYXJhdGUgdGhyZWUgaWRlYXM6IHNpZ25lZCBhcmVhLCBhYnNvbHV0ZS1hcmVhIHNpemUsIGFuZCBlbmVyZ3kgdmlhIHNxdWFyZWQgbWFnbml0dWRlLiJ9" style="display:none;"></div>%%KC_END%%
# 1.1-1 Signal Energy

> **Section Objective:** Define signal energy and understand why it uses squared magnitude instead of ordinary area.

---

**Concepts In This Section**

- Signed-area cancellation
- Signal energy
- Real-valued signal simplification
- Representative energy calculation

## 1. Why Ordinary Area Fails

Measuring signal size by the area under \(x(t)\) seems natural — it accounts for both amplitude and duration. But this approach breaks down whenever the signal has both positive and negative parts.

Consider a waveform with one positive lobe followed by an equal negative lobe. The positive area and negative area cancel, leaving a total signed area near zero — even though the signal clearly has nonzero amplitude over a significant stretch of time. The waveform is not small; the measure is just wrong.

This cancellation makes signed area an unreliable indicator of signal size.

### EXAM TIP

When the question asks for signal size or energy, signed area is the trap.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="trap_exposure" data-visual-use-b64="eyJjcmFtIjoiTWFrZSB0aGUgY2FuY2VsbGF0aW9uIHRyYXAgaW5zdGFudGx5IHJlY29nbml6YWJsZSBiZWZvcmUgZXhhbXMuIiwic3RhbmRhcmQiOiJTaG93IHdoeSB0aGUgZW5lcmd5IGZvcm11bGEgc3F1YXJlcyB0aGUgc2lnbmFsIGJlZm9yZSBpbnRlZ3JhdGluZy4iLCJ0b3Bfc2NvcmUiOiJIZWxwIGRpc3Rpbmd1aXNoIHNpZ25lZCBhcmVhLCBhYnNvbHV0ZSBhcmVhLCBhbmQgc3F1YXJlZC1tYWduaXR1ZGUgZW5lcmd5LiJ9" style="display:none;"></div>%%KC_END%%
*🎨 Top: positive and negative lobes cancel in signed area. Bottom: squaring makes every contribution nonnegative, so energy accumulates correctly.*
![Illustration](/generated/gptimage2-1778335170546-6271.png)

## 2. Signal Energy

This is the textbook definition of continuous-time signal energy (equation 1.1).

**Symbol guide:**
- \(E_x\) — energy of signal \(x\)
- \(x(t)\) — signal value at time \(t\)
- \(|x(t)|\) — magnitude of the signal at time \(t\)
- \(|x(t)|^2\) — squared magnitude; always nonnegative
- Limits \(-\infty\) to \(\infty\) — integrate over all time

**When to use it:** Any exam question asking for energy, size, or total squared magnitude of a continuous-time signal.

**Common misuse:** Integrating \(x(t)\) instead of \(|x(t)|^2\). For complex-valued signals this matters even more: \(x(t)^2\) is not the same as \(|x(t)|^2\) because squaring a complex number does not remove its phase.

$$E_x = \int_{-\infty}^{\infty} |x(t)|^2\,dt \quad \text{(1.1)}$$

### Exam Note: energy of sums and differences

Some problems will not only ask for the energy of one signal. They may ask for the energy of \(x(t)+y(t)\) or \(x(t)-y(t)\). Expand before integrating:

$$E_{x+y}=\int_{-\infty}^{\infty}|x(t)+y(t)|^2dt$$

For real signals,
$$E_{x+y}=E_x+E_y+2\int_{-\infty}^{\infty}x(t)y(t)\,dt$$
$$E_{x-y}=E_x+E_y-2\int_{-\infty}^{\infty}x(t)y(t)\,dt$$

The extra integral is the cross term. If \(x\) and \(y\) are orthogonal over the relevant interval, the cross term is 0, so \(E_{x+y}=E_{x-y}=E_x+E_y\).

#### Exam Trap

Do not automatically write \(E_{x+y}=E_x+E_y\). That is only true when the cross term vanishes.

### Interactive Check: watch the cross term

The fastest way to decide whether the cross term matters is to look for overlap. When the two signals do not overlap, the product \(x(t)y(t)\) is zero everywhere; when they do overlap, the product contributes area.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="interactive_demo" data-teaching-role="example_support" style="display:none;"></div><div class="kc-interactive-demo" data-demo-b64="eyJ0eXBlIjoiaW50ZXJhY3RpdmVfZGVtbyIsImRlbW9fdHlwZSI6ImVuZXJneV9jcm9zc190ZXJtIiwidGl0bGUiOiJJbnRlcmFjdGl2ZSBDaGVjazogd2F0Y2ggdGhlIGNyb3NzIHRlcm0iLCJleHBsYW5hdGlvbiI6IlNsaWRlIHRoZSBzZWNvbmQgcHVsc2UuIFRoZSBlbmVyZ3kgb2YgeCt5IGFuZCB4LXkgY2hhbmdlcyBvbmx5IHdoZW4gdGhlIG92ZXJsYXAgdGVybSBjaGFuZ2VzLiJ9"></div>%%KC_END%%

## 3. Real-valued signal simplification

**Representative example — rectangular pulse:**

If a rectangular pulse has constant value \(A\) for a duration \(T\) and is zero elsewhere, its energy is \(E_x = A^2 T\).

Why: the squared magnitude equals \(A^2\) throughout the active interval and zero outside it. Integrating the constant \(A^2\) over a length-\(T\) interval simply multiplies by \(T\).

#### Exam Note

- Doubling amplitude \(A\) multiplies energy by **4** (because \((2A)^2 = 4A^2\)).
- Doubling duration \(T\) multiplies energy by **2**.

$$E_x = A^2 T$$

## 4. What the formula is really measuring

When \(x(t)\) is real-valued, \(|x(t)|^2 = x^2(t)\), so the energy formula simplifies to the integral of \(x^2(t)\).

This is **not a new definition** — it is the same formula (1.1) written in a simpler form that applies only when the signal is real.

**Minimal example:** If \(x(t) = -3\) at some instant, the contribution to energy density at that instant is \((-3)^2 = 9\), not \(-3\). The negative sign disappears under squaring.

#### COMMON MISTAKE

Do not drop the square just because the signal is real. \(\int x(t)\,dt\) is signed area, not energy — even for real signals.

$$E_x = \int_{-\infty}^{\infty} x^2(t)\,dt \quad \text{for real-valued } x(t)$$

## 4. What the Formula Is Really Measuring

Signal energy measures **accumulated squared magnitude across time**. It rewards both larger amplitude and longer duration — a signal that is twice as tall or twice as long contributes more energy.

Note that \(\int_{-\infty}^{\infty}|x(t)|\,dt\) (absolute area) is another possible size measure, but this textbook uses squared magnitude because it is mathematically tractable and physically meaningful in power and energy contexts.

---

### QUICK CHECK

**Q:** Two signals have the same duration, but one has twice the amplitude. Which has more energy, and by what factor?

**A:** The larger-amplitude signal has **4 times** the energy, because energy scales as \(A^2\) and \((2A)^2 = 4A^2\).

---
**📌 Key Takeaways**
- Signed area can cancel: a nonzero signal may have total signed area near zero, so \(\int x(t)\,dt\) is not a reliable size measure.
- Signal energy (general): \(E_x = \int_{-\infty}^{\infty}|x(t)|^2\,dt\) — integrate squared magnitude over all time.
- Real-valued simplification: \(E_x = \int_{-\infty}^{\infty}x^2(t)\,dt\) — same formula, valid only when \(x(t)\) is real.
- Rectangular pulse result: \(E_x = A^2 T\) — doubling amplitude multiplies energy by 4; doubling duration multiplies energy by 2.

*Next, we will use this energy idea to classify signals more precisely.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InNpZ25lZF9hcmVhX2NhbmNlbGxhdGlvbiIsImxhYmVsIjoiV2h5IHNpZ25lZCBhcmVhIGlzIG5vdCBzaWduYWwgZW5lcmd5IiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJBIHNpZ25hbCBoYXMgb25lIHBvc2l0aXZlIGxvYmUgYW5kIG9uZSBlcXVhbCBuZWdhdGl2ZSBsb2JlLCBzbyBpdHMgc2lnbmVkIGFyZWEgaXMgMC4gV2hhdCBzaG91bGQgeW91IGNvbmNsdWRlPyIsIm9wdGlvbnMiOlsiQS4gVGhlIHNpZ25hbCBoYXMgemVybyBlbmVyZ3kiLCJCLiBUaGUgc2lnbmFsIG11c3QgYmUgaWRlbnRpY2FsbHkgemVybyIsIkMuIFNpZ25lZCBhcmVhIGlzIG5vdCBhIHJlbGlhYmxlIG1lYXN1cmUgb2Ygc2lnbmFsIHNpemUiLCJELiBUaGUgZW5lcmd5IGlzIHRoZSBpbnRlZ3JhbCBvZiBcXCh4KHQpXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiUG9zaXRpdmUgYW5kIG5lZ2F0aXZlIHNpZ25lZCBhcmVhcyBjYW4gY2FuY2VsIGV2ZW4gd2hlbiB0aGUgc2lnbmFsIGhhcyBub256ZXJvIGFtcGxpdHVkZSBvdmVyIHRpbWUuIFplcm8gc2lnbmVkIGFyZWEgdGVsbHMgeW91IG5vdGhpbmcgYWJvdXQgZW5lcmd5LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6Ilplcm8gc2lnbmVkIGFyZWEgZG9lcyBub3QgaW1wbHkgemVybyBlbmVyZ3kuIEVuZXJneSB1c2VzIHNxdWFyZWQgbWFnbml0dWRlLCB3aGljaCBpcyBhbHdheXMgbm9ubmVnYXRpdmUuIiwiQiI6IkEgbm9uemVybyB3YXZlZm9ybSBjYW4gc3RpbGwgaGF2ZSB0b3RhbCBzaWduZWQgYXJlYSBlcXVhbCB0byB6ZXJvLiIsIkQiOiJFbmVyZ3kgdXNlcyBzcXVhcmVkIG1hZ25pdHVkZSBcXCh8eCh0KXxeMlxcKSwgbm90IHRoZSByYXcgc2lnbmFsIFxcKHgodClcXCkuIn0sImhpbnQiOiJBc2sgd2hldGhlciBjYW5jZWxsYXRpb24gbWVhbnMgdGhlIHdhdmVmb3JtIHdhcyBhY3R1YWxseSBhYnNlbnQuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJbiB0aGUgbGVzc29uIHZpc3VhbCwgdGhlIHRvcCB3YXZlZm9ybSdzIHBvc2l0aXZlIGFuZCBuZWdhdGl2ZSBzaGFkZWQgYXJlYXMgY2FuY2VsLiBXaGF0IGRvZXMgdGhlIGJvdHRvbSBcXCh8eCh0KXxeMlxcKSBwbG90IHNob3c/Iiwib3B0aW9ucyI6WyJBLiBBbGwgY29udHJpYnV0aW9ucyBiZWNvbWUgbm9ubmVnYXRpdmUgYmVmb3JlIGludGVncmF0aW9uIiwiQi4gVGhlIG5lZ2F0aXZlIGxvYmUgZGlzYXBwZWFycyBmcm9tIHRoZSBzaWduYWwiLCJDLiBFbmVyZ3kgb25seSBjb3VudHMgcG9zaXRpdmUtdGltZSB2YWx1ZXMiLCJELiBUaGUgc2lnbmFsJ3MgZHVyYXRpb24gbm8gbG9uZ2VyIG1hdHRlcnMiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJTcXVhcmluZyB0aGUgbWFnbml0dWRlIG1ha2VzIGV2ZXJ5IGNvbnRyaWJ1dGlvbiB0byBlbmVyZ3kgbm9ubmVnYXRpdmUsIHNvIG5lZ2F0aXZlIHNpZ25hbCB2YWx1ZXMgc3RpbGwgYWRkIHRvIGVuZXJneSByYXRoZXIgdGhhbiBzdWJ0cmFjdGluZyBmcm9tIGl0LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoZSBuZWdhdGl2ZSBwYXJ0IGRvZXMgbm90IGRpc2FwcGVhcjsgaXRzIHNxdWFyZWQgbWFnbml0dWRlIGNvbnRyaWJ1dGVzIHBvc2l0aXZlbHkgdG8gZW5lcmd5LiIsIkMiOiJFbmVyZ3kgaW50ZWdyYXRlcyBvdmVyIGFsbCB0aW1lLCBmcm9tIFxcKC1cXGluZnR5XFwpIHRvIFxcKFxcaW5mdHlcXCksIG5vdCBqdXN0IHBvc2l0aXZlIHRpbWUuIiwiRCI6IkR1cmF0aW9uIHN0aWxsIG1hdHRlcnMgYmVjYXVzZSB0aGUgaW50ZWdyYWwgYWNjdW11bGF0ZXMgb3ZlciB0aGUgZW50aXJlIHRpbWUgaW50ZXJ2YWwuIn0sImhpbnQiOiJMb29rIGF0IHdoZXRoZXIgdGhlIHNxdWFyZWQgcGxvdCBldmVyIGdvZXMgYmVsb3cgdGhlIHRpbWUgYXhpcy4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoid3JvbmdfdnNfcmlnaHRfdmlzdWFsX2NoZWNrIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJlbmVyZ3lfZm9ybXVsYSIsImxhYmVsIjoiQ29udGludW91cy10aW1lIHNpZ25hbCBlbmVyZ3kgZm9ybXVsYSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggZm9ybXVsYSBpcyB0aGUgdGV4dGJvb2sgZGVmaW5pdGlvbiBvZiBjb250aW51b3VzLXRpbWUgc2lnbmFsIGVuZXJneT8iLCJvcHRpb25zIjpbIkEuIFxcKEVfeCA9IFxcaW50X3stXFxpbmZ0eX1ee1xcaW5mdHl9IHgodClcXCxkdFxcKSIsIkIuIFxcKEVfeCA9IFxcaW50X3stXFxpbmZ0eX1ee1xcaW5mdHl9IHx4KHQpfF4yXFwsZHRcXCkiLCJDLiBcXChFX3ggPSBcXGludF97MH1ee1xcaW5mdHl9IHx4KHQpfFxcLGR0XFwpIiwiRC4gXFwoRV94ID0gXFxsZWZ0fFxcaW50X3stXFxpbmZ0eX1ee1xcaW5mdHl9IHgodClcXCxkdFxccmlnaHR8XjJcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJTaWduYWwgZW5lcmd5IGlzIGRlZmluZWQgYXMgdGhlIGludGVncmFsIG9mIHNxdWFyZWQgbWFnbml0dWRlIG92ZXIgYWxsIHRpbWU6IFxcKEVfeCA9IFxcaW50X3stXFxpbmZ0eX1ee1xcaW5mdHl9fHgodCl8XjJcXCxkdFxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGF0IGNvbXB1dGVzIHNpZ25lZCBhcmVhLCB3aGljaCBjYW4gY2FuY2VsIHdoZW4gcG9zaXRpdmUgYW5kIG5lZ2F0aXZlIHBhcnRzIGFyZSBwcmVzZW50LiIsIkMiOiJUaGlzIHVzZXMgbWFnbml0dWRlIGJ1dCBub3Qgc3F1YXJlZCBtYWduaXR1ZGUsIGFuZCBvbmx5IGludGVncmF0ZXMgZnJvbSAwIHRvIFxcKFxcaW5mdHlcXCkgcmF0aGVyIHRoYW4gYWxsIHRpbWUuIiwiRCI6IlNxdWFyaW5nIHRoZSBmaW5hbCBzaWduZWQgYXJlYSBpcyBub3QgdGhlIHNhbWUgYXMgaW50ZWdyYXRpbmcgc3F1YXJlZCBtYWduaXR1ZGUgYXQgZWFjaCBpbnN0YW50LiJ9LCJoaW50IjoiRW5lcmd5IGFjY3VtdWxhdGVzIGxvY2FsIHNxdWFyZWQgbWFnbml0dWRlIGF0IGV2ZXJ5IGluc3RhbnQsIG5vdCBhIGZpbmFsIG5ldCBhcmVhLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQSBjbGFzc21hdGUgY29tcHV0ZXMgc2lnbmFsIGVuZXJneSB1c2luZyBcXChcXGludCB4KHQpXFwsZHRcXCkuIEV4cGxhaW4gcHJlY2lzZWx5IHdoeSB0aGlzIGlzIHdyb25nLiIsImlkZWFsX2Fuc3dlciI6IlRoYXQgaW50ZWdyYWwgY29tcHV0ZXMgc2lnbmVkIGFyZWEsIG5vdCBlbmVyZ3kuIFBvc2l0aXZlIGFuZCBuZWdhdGl2ZSBwYXJ0cyBjYW4gY2FuY2VsLCBnaXZpbmcgYSByZXN1bHQgbmVhciB6ZXJvIGV2ZW4gZm9yIGEgbGFyZ2Ugc2lnbmFsLiBFbmVyZ3kgbXVzdCBpbnRlZ3JhdGUgc3F1YXJlZCBtYWduaXR1ZGU6IFxcKEVfeCA9IFxcaW50X3stXFxpbmZ0eX1ee1xcaW5mdHl9fHgodCl8XjJcXCxkdFxcKS4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IGlkZW50aWZ5IFxcKFxcaW50IHgodClcXCxkdFxcKSBhcyBzaWduZWQgYXJlYSIsIk11c3QgbWVudGlvbiBjYW5jZWxsYXRpb24gb2YgcG9zaXRpdmUgYW5kIG5lZ2F0aXZlIHBhcnRzIiwiTXVzdCBnaXZlIHRoZSBjb3JyZWN0IHNxdWFyZWQtbWFnbml0dWRlIGVuZXJneSBmb3JtdWxhIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCB1bmRlcnN0YW5kcyB3aHkgdGhlIHNxdWFyZSBpcyBwcmVzZW50LCBub3QganVzdCB0aGUgbWVtb3JpemVkIGZvcm11bGEuIiwiaGludCI6IldoYXQgaGFwcGVucyBpZiBhIHBvc2l0aXZlIGxvYmUgYW5kIGEgbmVnYXRpdmUgbG9iZSBoYXZlIGVxdWFsIGFyZWE/IiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJyZWFsX3NpZ25hbF9zaW1wbGlmaWNhdGlvbiIsImxhYmVsIjoiRW5lcmd5IGZvcm11bGEgZm9yIHJlYWwtdmFsdWVkIHNpZ25hbHMiLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgYSByZWFsLXZhbHVlZCBzaWduYWwgXFwoeCh0KVxcKSwgd2hpY2ggZXhwcmVzc2lvbiBjb3JyZWN0bHkgc2ltcGxpZmllcyB0aGUgZW5lcmd5IGZvcm11bGE/Iiwib3B0aW9ucyI6WyJBLiBcXChFX3ggPSBcXGludF97LVxcaW5mdHl9XntcXGluZnR5fSB4KHQpXFwsZHRcXCkiLCJCLiBcXChFX3ggPSBcXGludF97LVxcaW5mdHl9XntcXGluZnR5fSB4XjIodClcXCxkdFxcKSIsIkMuIFxcKEVfeCA9IFxcbGVmdChcXGludF97LVxcaW5mdHl9XntcXGluZnR5fSB4KHQpXFwsZHRcXHJpZ2h0KV4yXFwpIiwiRC4gXFwoRV94ID0gXFxpbnRfey1cXGluZnR5fV57XFxpbmZ0eX0gfHgodCl8XFwsZHRcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJGb3IgcmVhbC12YWx1ZWQgc2lnbmFscywgXFwofHgodCl8XjIgPSB4XjIodClcXCksIHNvIGVuZXJneSBiZWNvbWVzIFxcKFxcaW50X3stXFxpbmZ0eX1ee1xcaW5mdHl9IHheMih0KVxcLGR0XFwpLiBUaGUgc3F1YXJlIGlzIHByZXNlcnZlZDsgb25seSB0aGUgbWFnbml0dWRlIGJhcnMgYXJlIGRyb3BwZWQuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBkcm9wcyB0aGUgc3F1YXJlIGVudGlyZWx5IGFuZCBiZWNvbWVzIHNpZ25lZCBhcmVhLiIsIkMiOiJTcXVhcmluZyBhZnRlciBpbnRlZ3JhdGlvbiBpcyBub3QgdGhlIHNhbWUgYXMgaW50ZWdyYXRpbmcgdGhlIHNxdWFyZSBhdCBlYWNoIGluc3RhbnQuIiwiRCI6IlRoaXMgaXMgYW4gYWJzb2x1dGUtYXJlYSBtZWFzdXJlLCBub3QgdGhlIHNxdWFyZWQtbWFnbml0dWRlIGVuZXJneSBkZWZpbml0aW9uLiJ9LCJoaW50IjoiUmVhbC12YWx1ZWQgc2ltcGxpZmljYXRpb24ga2VlcHMgdGhlIHNxdWFyZSDigJQgaXQgb25seSByZW1vdmVzIHRoZSBtYWduaXR1ZGUgYmFycy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJyZWN0YW5ndWxhcl9wdWxzZV9leGFtcGxlIiwibGFiZWwiOiJSZXByZXNlbnRhdGl2ZSBlbmVyZ3kgY2FsY3VsYXRpb24iLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNF9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSByZWN0YW5ndWxhciBwdWxzZSBoYXMgYW1wbGl0dWRlIDMgZm9yIDIgc2Vjb25kcyBhbmQgaXMgemVybyBlbHNld2hlcmUuIFdoYXQgaXMgaXRzIGVuZXJneT8iLCJvcHRpb25zIjpbIkEuIDYiLCJCLiA5IiwiQy4gMTgiLCJELiAzNiJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IkZvciBhIGNvbnN0YW50IHJlY3Rhbmd1bGFyIHB1bHNlLCBcXChFX3ggPSBBXjIgVCA9IDNeMiBcXGNkb3QgMiA9IDkgXFxjZG90IDIgPSAxOFxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIHVzZXMgXFwoQSBcXGNkb3QgVCA9IDMgXFxjZG90IDIgPSA2XFwpLCB3aGljaCBpcyBhbXBsaXR1ZGUgdGltZXMgZHVyYXRpb24g4oCUIG5vdCBzcXVhcmVkIGFtcGxpdHVkZSB0aW1lcyBkdXJhdGlvbi4iLCJCIjoiVGhpcyBzcXVhcmVzIHRoZSBhbXBsaXR1ZGUgKFxcKDNeMiA9IDlcXCkpIGJ1dCBmb3JnZXRzIHRvIG11bHRpcGx5IGJ5IGR1cmF0aW9uIFxcKFQgPSAyXFwpLiIsIkQiOiJUaGlzIGluY29ycmVjdGx5IHNxdWFyZXMgYm90aCBhbXBsaXR1ZGUgYW5kIGR1cmF0aW9uOiBcXCgoQVQpXjIgPSA2XjIgPSAzNlxcKS4ifSwiaGludCI6IlVzZSBcXChBXjIgVFxcKSwgbm90IFxcKEEgVFxcKSBvciBcXCgoQVQpXjJcXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfV19" style="display:none;"></div>%%KC_END%%
