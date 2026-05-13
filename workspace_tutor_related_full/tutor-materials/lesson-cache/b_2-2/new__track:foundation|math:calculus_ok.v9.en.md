# B.2-2 Sinusoids in Terms of Exponentials

> **Objective:** Learn to rewrite sinusoidal signals using complex exponentials, so that phase shifts and signal addition become straightforward algebra.

---

Consider the signal x(t) = 2cos(ω₀t + 60°). It has an amplitude of 2 and a phase shift of 60°. This section shows how to rewrite that sinusoid using exponentials — not to make things mysterious, but to package amplitude and phase into a compact, algebra-friendly form.

The key tool is **Euler's formula**, which links exponential rotation to sinusoidal behavior:

e^{jθ} = cos θ + j sin θ

This single identity is the bridge between the trigonometric world and the exponential world.

### WHY THIS MATTERS FOR THE EXAM

Exponential form simplifies trig identities, phasor calculations, and combining signals of the same frequency — all common exam tasks. Master this once, and a whole class of problems becomes routine.

![Fig. B.6](/figures/page-017-fig__b_6-1.png)
*These sketches show cosine, sine, and a phase-shifted sinusoid visually — the intuition we will soon encode compactly using exponentials.*

## 1. From Rotating Exponentials to Cosine and Sine

Euler's formula gives us two conjugate equations:

e^{jθ} = cos θ + j sin θ

e^{-jθ} = cos θ − j sin θ

**Adding** these two equations:

e^{jθ} + e^{-jθ} = 2 cos θ

Divide both sides by 2:

cos θ = (e^{jθ} + e^{-jθ}) / 2

**Subtracting** the second equation from the first:

e^{jθ} − e^{-jθ} = 2j sin θ

Divide both sides by 2j:

sin θ = (e^{jθ} − e^{-jθ}) / (2j)

Now replace θ with (ω₀t + φ), where ω₀ is the angular frequency (rad/s) and φ is the phase shift (rad or degrees). The identities hold for any argument.

### KEY INSIGHT

Notice that both identities use **two** exponentials: one with +j and one with −j. These are complex conjugates of each other. Because they are conjugates, their imaginary parts cancel when added — leaving a purely real sinusoid. This is why a real-valued cosine or sine always requires a **pair** of exponentials, not just one. A single complex exponential e^{jω₀t} is not real by itself; it is only when paired with its conjugate e^{-jω₀t} that the imaginary parts cancel and a real signal emerges.

> **Exam requirement:** Know both identities cold. Derivations in circuits and signals courses rely on them constantly.

$$\cos(\omega_0 t+\phi)=\frac{e^{j(\omega_0 t+\phi)}+e^{-j(\omega_0 t+\phi)}}{2},\qquad \sin(\omega_0 t+\phi)=\frac{e^{j(\omega_0 t+\phi)}-e^{-j(\omega_0 t+\phi)}}{2j}$$
*Cosine is the symmetric average of two opposite rotations (their sum), while sine comes from their antisymmetric difference (scaled by 1/(2j) to strip the imaginary axis marker).*

## 2. Fully Worked Example: Writing a Sinusoid in Exponential Form

Let x(t) = 2cos(ω₀t + 60°). We will rewrite this step by step.

**Step 1 — Apply the cosine identity** with α = ω₀t + 60°:

cos(ω₀t + 60°) = (e^{j(ω₀t + 60°)} + e^{-j(ω₀t + 60°)}) / 2

**Step 2 — Multiply both sides by the amplitude 2:**

x(t) = 2 · (e^{j(ω₀t + 60°)} + e^{-j(ω₀t + 60°)}) / 2

x(t) = e^{j(ω₀t + 60°)} + e^{-j(ω₀t + 60°)}

**Step 3 — Factor out the time-varying part e^{jω₀t}:**

x(t) = e^{j60°} e^{jω₀t} + e^{-j60°} e^{-jω₀t}

**Step 4 — Recognize the real-part form:**

Since the two terms are complex conjugates, their sum equals twice the real part of either one:

x(t) = 2 Re{ e^{j60°} e^{jω₀t} }

This is the preferred engineering form. The factor **e^{j60°}** is the **phasor**: a constant complex number that carries both the amplitude (here, 2 is absorbed into the coefficient) and the phase (60°). The time variation is entirely in e^{jω₀t}.

#### Caution

Do not confuse the amplitude C with the real part a of a complex number. The exponential coefficient Ce^{jθ} stores amplitude and phase together as a single complex quantity — it is not the same as the real-axis coordinate alone.

![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*Each phasor arrow in these diagrams corresponds to the compact factor Ce^{jθ}, which multiplies the rotating carrier e^{jω₀t} to produce the full sinusoidal signal.*

## 3. Why Exponentials Make Sinusoid Addition Easier

Consider the general combination:

a cos ω₀t + b sin ω₀t = C cos(ω₀t + θ)

This identity looks complicated in trigonometric form. In exponential form, the reason it works becomes transparent.

Any sinusoid at frequency ω₀ can be written as:

x(t) = Re{ C e^{jθ} e^{jω₀t} }

The key observation: **all sinusoids at the same frequency ω₀ share the common time factor e^{jω₀t}.** When you add two such sinusoids, the time factor factors out, and addition reduces to adding two constant complex numbers:

Re{ C₁e^{jθ₁} e^{jω₀t} } + Re{ C₂e^{jθ₂} e^{jω₀t} } = Re{ (C₁e^{jθ₁} + C₂e^{jθ₂}) e^{jω₀t} }

The sum C₁e^{jθ₁} + C₂e^{jθ₂} is just complex number addition — no trig identities required.

### CONNECTION TO THE TEXTBOOK FORMULA

For a cos ω₀t + b sin ω₀t, the textbook forms the complex number **a − jb**. Its magnitude C and angle θ give the single-sinusoid result directly.

> **Remember:** a and b are rectangular components — like x and y coordinates. C is the total phasor length (the hypotenuse). They are related by C = √(a² + b²), not C = a.

![unknown](/figures/page-018-unknown-1.png)
*The rectangular components a and −b locate the phasor tip in the complex plane, while the magnitude C and angle θ give the equivalent single-sinusoid representation.*

---
**📌 Key Takeaways**
- Euler's formula yields cos θ = (e^{jθ}+e^{-jθ})/2 and sin θ = (e^{jθ}-e^{-jθ})/(2j).
- A real sinusoid always requires a conjugate pair of exponentials to cancel imaginary parts.
- The phasor coefficient Ce^{jθ} encodes amplitude and phase as one compact complex number.

*In the next section we will use this exponential viewpoint to analyze sinusoidal signals more efficiently.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImV1bGVyX3RvX3RyaWciLCJsYWJlbCI6IkRlcml2aW5nIHNpbmUgYW5kIGNvc2luZSBmcm9tIEV1bGVyJ3MgZm9ybXVsYSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggaWRlbnRpdHkgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIGNvcyDOuCA9IChlXntqzrh9IC0gZV57LWrOuH0pLzIiLCJCLiBjb3MgzrggPSAoZV57as64fSArIGVeey1qzrh9KS8yIiwiQy4gY29zIM64ID0gKGVee2rOuH0gKyBlXnstas64fSkvKDJqKSIsIkQuIGNvcyDOuCA9IChlXntqzrh9IC0gZV57LWrOuH0pLygyaikiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJBZGRpbmcgRXVsZXIncyB0d28gY29uanVnYXRlIGVxdWF0aW9ucyBjYW5jZWxzIHRoZSBpbWFnaW5hcnkgc2luZSB0ZXJtcyBhbmQgaXNvbGF0ZXMgY29zaW5lLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBkaWZmZXJlbmNlIGRvZXMgbm90IGlzb2xhdGUgY29zaW5lOyBpdCBpc29sYXRlcyBzaW5lLXJlbGF0ZWQgdGVybXMuIiwiQyI6IkRpdmlkaW5nIGJ5IDJqIGlzIHVzZWQgZm9yIHNpbmUsIG5vdCBjb3NpbmUuIiwiRCI6IlRoaXMgaXMgdGhlIHNpbmUgaWRlbnRpdHksIG5vdCB0aGUgY29zaW5lIGlkZW50aXR5LiJ9LCJoaW50IjoiQWRkIGVee2rOuH09Y29zzrgranNpbs64IGFuZCBlXnstas64fT1jb3POuC1qc2luzrguIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJTdGFydGluZyBmcm9tIEV1bGVyJ3MgZm9ybXVsYSwgZGVyaXZlIHRoZSBleHBvbmVudGlhbCBpZGVudGl0eSBmb3Igc2luIM64LiIsImlkZWFsX2Fuc3dlciI6IlVzZSBlXntqzrh9PWNvc864K2pzaW7OuCBhbmQgZV57LWrOuH09Y29zzrgtanNpbs64LiBTdWJ0cmFjdCB0aGUgc2Vjb25kIGZyb20gdGhlIGZpcnN0IHRvIGdldCBlXntqzrh9LWVeey1qzrh9PTJqc2luzrguIFRoZXJlZm9yZSBzaW7OuD0oZV57as64fS1lXnstas64fSkvKDJqKS4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IHdyaXRlIGJvdGggRXVsZXIgZXF1YXRpb25zIiwiTXVzdCBzdWJ0cmFjdCB0aGVtIGNvcnJlY3RseSIsIk11c3QgaXNvbGF0ZSBzaW4gzrggY29ycmVjdGx5IHdpdGggZGVub21pbmF0b3IgMmoiXSwiZXhwbGFuYXRpb24iOiJUaGlzIGNoZWNrcyB3aGV0aGVyIHRoZSBzdHVkZW50IGNhbiByZXByb2R1Y2UgdGhlIGRlcml2YXRpb24sIG5vdCBqdXN0IG1lbW9yaXplIHRoZSBmaW5hbCBpZGVudGl0eS4iLCJoaW50IjoiU3VidHJhY3Rpb24sIG5vdCBhZGRpdGlvbiwgaXMgdGhlIGtleSBzdGVwLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoicmV3cml0ZV9zaW51c29pZCIsImxhYmVsIjoiV3JpdGluZyBhIHNpbnVzb2lkIGluIGV4cG9uZW50aWFsIGZvcm0iLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGV4cG9uZW50aWFsIGZvcm0gaXMgZXF1aXZhbGVudCB0byB4KHQpID0gM2NvcyjPieKCgHQg4oiSIDMwwrApPyIsIm9wdGlvbnMiOlsiQS4geCh0KSA9ICgzLzIpKGVee2ooz4nigoB04oiSMzDCsCl9ICsgZV57LWooz4nigoB04oiSMzDCsCl9KSIsIkIuIHgodCkgPSAzKGVee2ooz4nigoB04oiSMzDCsCl9ICsgZV57LWooz4nigoB04oiSMzDCsCl9KSIsIkMuIHgodCkgPSAoMy8oMmopKShlXntqKM+J4oKAdOKIkjMwwrApfSDiiJIgZV57LWooz4nigoB04oiSMzDCsCl9KSIsIkQuIHgodCkgPSAoMS8yKShlXntqKM+J4oKAdOKIkjMwwrApfSArIGVeey1qKM+J4oKAdOKIkjMwwrApfSkiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJTaW5jZSBjb3MgzrEgPSAoZV57as6xfStlXnstas6xfSkvMiwgbXVsdGlwbHlpbmcgYnkgMyBnaXZlcyB0aGUgZmFjdG9yIDMvMi4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGlzIGlzIHR3aWNlIHRvbyBsYXJnZSBiZWNhdXNlIHRoZSBpZGVudGl0eSBhbHJlYWR5IGluY2x1ZGVzIGEgZmFjdG9yIG9mIDEvMi4iLCJDIjoiVGhhdCBpcyB0aGUgc2luZSBzdHJ1Y3R1cmUsIG5vdCB0aGUgY29zaW5lIHN0cnVjdHVyZS4iLCJEIjoiVGhpcyBjb3JyZXNwb25kcyB0byBhbXBsaXR1ZGUgMSwgbm90IGFtcGxpdHVkZSAzLiJ9LCJoaW50IjoiU3RhcnQgZnJvbSBjb3MgzrEgPSAoZV57as6xfStlXnstas6xfSkvMiwgdGhlbiBtdWx0aXBseSBieSBhbXBsaXR1ZGUgMy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgc3R1ZGVudCB3cml0ZXMgeCh0KSA9IDJjb3Moz4nigoB0K8+GKSA9IDJSZXtlXntqz4Z9ZV57as+J4oKAdH19LiBXaHkgaXMgdGhpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gQmVjYXVzZSBlXntqz4Z9ZV57as+J4oKAdH0gaXMgYWx3YXlzIHJlYWwiLCJCLiBCZWNhdXNlIHRoZSByZWFsIHBhcnQgb2YgZV57aijPieKCgHQrz4YpfSBpcyBjb3Moz4nigoB0K8+GKSIsIkMuIEJlY2F1c2UgUmV7en0gPSB8enwgZm9yIGNvbXBsZXggbnVtYmVycyIsIkQuIEJlY2F1c2UgbXVsdGlwbHlpbmcgYnkgZV57as+GfSByZW1vdmVzIHRoZSBwaGFzZSBzaGlmdCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkV1bGVyJ3MgZm9ybXVsYSBnaXZlcyBlXntqKM+J4oKAdCvPhil9ID0gY29zKM+J4oKAdCvPhikgKyBqc2luKM+J4oKAdCvPhiksIHNvIGl0cyByZWFsIHBhcnQgaXMgZXhhY3RseSB0aGUgY29zaW5lLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBleHBvbmVudGlhbCBpcyBnZW5lcmFsbHkgY29tcGxleCwgbm90IGFsd2F5cyByZWFsLiIsIkMiOiJSZWFsIHBhcnQgYW5kIG1hZ25pdHVkZSBhcmUgZGlmZmVyZW50IHF1YW50aXRpZXMuIiwiRCI6Ik11bHRpcGx5aW5nIGJ5IGVee2rPhn0gaW50cm9kdWNlcyBwaGFzZTsgaXQgZG9lcyBub3QgcmVtb3ZlIGl0LiJ9LCJoaW50IjoiRXhwYW5kIGVee2ooz4nigoB0K8+GKX0gdXNpbmcgRXVsZXIncyBmb3JtdWxhLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6InBoYXNvcl9jb2VmZmljaWVudF9tZWFuaW5nIiwibGFiZWwiOiJNZWFuaW5nIG9mIHRoZSBjb21wbGV4IGNvZWZmaWNpZW50IGFuZCByZWxhdGlvbiB0byBwaGFzb3JzIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkluIHgodCkgPSBSZXtDZV57as64fWVee2rPieKCgHR9fSwgd2hhdCBkb2VzIENlXntqzrh9IHJlcHJlc2VudD8iLCJvcHRpb25zIjpbIkEuIFRoZSB0aW1lLXZhcnlpbmcgZnJlcXVlbmN5IHRlcm0iLCJCLiBBIGNvbnN0YW50IGNvbXBsZXggY29lZmZpY2llbnQgZW5jb2RpbmcgYW1wbGl0dWRlIEMgYW5kIHBoYXNlIM64IiwiQy4gVGhlIHJlYWwgcGFydCBvZiB0aGUgc2ludXNvaWQgb25seSIsIkQuIFRoZSBwZXJpb2QgVOKCgCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBmYWN0b3IgQ2Vee2rOuH0gaXMgY29uc3RhbnQgd2l0aCByZXNwZWN0IHRvIHRpbWUgYW5kIHN0b3JlcyB0aGUgc2ludXNvaWQncyBhbXBsaXR1ZGUgYW5kIHBoYXNlIGNvbXBhY3RseS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGUgdGltZSBkZXBlbmRlbmNlIGlzIGluIGVee2rPieKCgHR9LCBub3QgQ2Vee2rOuH0uIiwiQyI6Ikl0IGlzIG5vdCBqdXN0IHRoZSByZWFsIHBhcnQ7IGl0IGlzIHRoZSBmdWxsIGNvbXBsZXggcGhhc29yIGNvZWZmaWNpZW50LiIsIkQiOiJJdCBoYXMgbm90aGluZyB0byBkbyBkaXJlY3RseSB3aXRoIHBlcmlvZCBub3RhdGlvbi4ifSwiaGludCI6IlNlcGFyYXRlIHRoZSBjb25zdGFudCBmYWN0b3IgZnJvbSB0aGUgdGltZSBmYWN0b3IgZV57as+J4oKAdH0uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgYSBjb3Mgz4nigoB0ICsgYiBzaW4gz4nigoB0ID0gQyBjb3Moz4nigoB0K864KSwgd2hpY2ggc3RhdGVtZW50IGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBDIGlzIGp1c3QgdGhlIHJlYWwtYXhpcyBjb21wb25lbnQgYSIsIkIuIEMgaXMgdGhlIHBoYXNvciBtYWduaXR1ZGUgZm91bmQgZnJvbSB0aGUgcmVjdGFuZ3VsYXIgY29tcG9uZW50cyBhIGFuZCDiiJJiIiwiQy4gzrggaXMgYWx3YXlzIHRhbuKBu8K5KGIvYSkgd2l0aCBubyBxdWFkcmFudCBjaGVjayIsIkQuIGEgYW5kIGIgYXJlIHBvbGFyIGNvb3JkaW5hdGVzIGFscmVhZHkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgdGV4dGJvb2sgdXNlcyB0aGUgY29tcGxleCBudW1iZXIgYeKIkmpiLCB3aG9zZSBtYWduaXR1ZGUgaXMgQyBhbmQgd2hvc2UgYW5nbGUgaXMgzrgsIHdpdGggcXVhZHJhbnQgY2FyZSByZXF1aXJlZC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJhIGlzIG9ubHkgb25lIGNvbXBvbmVudCwgbm90IHRoZSB0b3RhbCBtYWduaXR1ZGUuIiwiQyI6IlF1YWRyYW50IGVycm9ycyBhcmUgYSBjbGFzc2ljIGV4YW0gdHJhcDsgYW5nbGUgbXVzdCBiZSBpbnRlcnByZXRlZCBjb3JyZWN0bHkuIiwiRCI6ImEgYW5kIGIgYXJlIHJlY3Rhbmd1bGFyIGNvbXBvbmVudHMsIG5vdCBwb2xhciBkYXRhLiJ9LCJoaW50IjoiVGhpbmsgb2YgYeKIkmpiIGFzIGEgcG9pbnQgd2l0aCBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBjb21wb25lbnRzLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJwaGFzb3JfZGlhZ3JhbSIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfV19" style="display:none;"></div>%%KC_END%%
