# B.2-2 Sinusoids in Terms of Exponentials

> **Objective:** Learn to rewrite cosine and sine signals using complex exponentials — the algebraic foundation for phasor analysis and circuit calculations.

---

Consider the signal x(t) = 4 cos(ω₀t + 30°). It has an amplitude, a frequency, and a phase. Working with that phase in trigonometric form quickly becomes messy — especially when adding signals or differentiating. This section shows how to rewrite any sinusoid using complex exponentials, which makes all of that algebra clean and systematic.

The key tool is **Euler's formula**: e^{jθ} = cos θ + j sin θ. From this single identity, both cosine and sine can be expressed as combinations of e^{jω₀t} and e^{-jω₀t}. You have already seen j and polar form in the previous section — here we put them to work.

### WHY THIS MATTERS FOR THE EXAM

Converting between trigonometric form, phasor form, and exponential form is a core skill tested in signals and circuits courses. Every step in this section is exam-ready material.

> **Core takeaway:** Euler's formula is the bridge between real sinusoids and complex exponentials — master it and phase algebra becomes straightforward.

![Fig. B.6](/figures/page-017-fig__b_6-1.png)
*A phase shift in a sinusoid appears as a horizontal time shift in the waveform — exponential and phasor notation encode this shift compactly as a single complex angle.*

## 1. From Euler's Formula to Cosine and Sine

Start with the two forms of Euler's formula, one for +θ and one for −θ:

- e^{jθ} = cos θ + j sin θ
- e^{-jθ} = cos θ − j sin θ

**Deriving cosine — add the two equations:**

e^{jθ} + e^{-jθ} = (cos θ + j sin θ) + (cos θ − j sin θ)

The j sin θ terms cancel:

e^{jθ} + e^{-jθ} = 2 cos θ

Divide both sides by 2:

cos θ = (e^{jθ} + e^{-jθ}) / 2

**Deriving sine — subtract the two equations:**

e^{jθ} − e^{-jθ} = (cos θ + j sin θ) − (cos θ − j sin θ)

The cos θ terms cancel:

e^{jθ} − e^{-jθ} = 2j sin θ

Divide both sides by 2j:

sin θ = (e^{jθ} − e^{-jθ}) / (2j)

Now substitute θ = ω₀t to get the sinusoid forms:

- cos(ω₀t) = (e^{jω₀t} + e^{-jω₀t}) / 2
- sin(ω₀t) = (e^{jω₀t} − e^{-jω₀t}) / (2j)

### KEY INSIGHT

The term e^{jω₀t} rotates counterclockwise in the complex plane; e^{-jω₀t} rotates clockwise. Adding them cancels the imaginary parts and leaves a purely real cosine waveform. This is why real signals always involve conjugate pairs of exponentials.

$$\cos(\omega_0 t)=\frac{e^{j\omega_0 t}+e^{-j\omega_0 t}}{2},\qquad \sin(\omega_0 t)=\frac{e^{j\omega_0 t}-e^{-j\omega_0 t}}{2j}$$
*These are the fundamental conversion formulas between real sinusoids and complex exponentials — memorize both identities exactly, including the factor of j in the denominator of the sine identity, as they appear directly on exams.*

## 2. Writing a General Sinusoid in Exponential Form

Let's work through the concrete example x(t) = 4 cos(ω₀t + 30°) step by step.

**Step 1:** Apply the cosine identity with α = ω₀t + 30°:

x(t) = 4 · (e^{j(ω₀t + 30°)} + e^{-j(ω₀t + 30°)}) / 2

**Step 2:** Simplify the factor of 4/2 = 2:

x(t) = 2e^{j(ω₀t + 30°)} + 2e^{-j(ω₀t + 30°)}

**Step 3:** Separate the time-varying and phase parts using the exponent rule e^{j(A+B)} = e^{jA}e^{jB}:

e^{j(ω₀t + 30°)} = e^{j30°} · e^{jω₀t}

e^{-j(ω₀t + 30°)} = e^{-j30°} · e^{-jω₀t}

**Step 4:** Write the final result:

x(t) = 2e^{j30°}e^{jω₀t} + 2e^{-j30°}e^{-jω₀t}

The general rule follows the same pattern. For any amplitude C and phase θ:

C cos(ω₀t + θ) = (C/2)e^{jθ}e^{jω₀t} + (C/2)e^{-jθ}e^{-jω₀t}

### EXAM TIP

The amplitude C splits equally between the two exponential terms — each carries **C/2**, not C. This is the most common arithmetic error on exams.

#### Note

The two coefficients (C/2)e^{jθ} and (C/2)e^{-jθ} are complex conjugates of each other. This conjugate pairing is what guarantees the final signal x(t) is real-valued — the imaginary parts cancel when the two terms are added.

![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*Phasor diagrams encode a sinusoid's amplitude and phase as a single complex number — exponential form is the algebraic expression of exactly this rotating phasor picture.*

## 3. Why Exponentials Are Useful: Phasors and Algebra

Exponential form is not just a notational change — it fundamentally simplifies calculations involving phase shifts, addition of sinusoids, and differentiation.

For the general signal C cos(ω₀t + θ), the **phasor** is defined as Ce^{jθ}. The time variation is carried separately by e^{jω₀t}. In practice, we work with the phasor coefficient alone and reattach e^{jω₀t} only at the end.

**From exponential to sinusoid (forward direction):**

If x(t) = Re{3e^{j45°}e^{jω₀t}}, combine the exponents:

x(t) = Re{3e^{j(ω₀t + 45°)}} = 3 cos(ω₀t + 45°)

Taking the real part of Ce^{jθ}e^{jω₀t} always yields C cos(ω₀t + θ).

**From sinusoid to exponential (reverse direction):**

For x(t) = 3 sin(ω₀t), apply the sine identity:

x(t) = (3/2j)e^{jω₀t} − (3/2j)e^{-jω₀t}

### ROTATING ARROWS ANALOGY

Picture two arrows of equal length spinning in opposite directions on the complex plane. The counterclockwise arrow is (C/2)e^{jθ}e^{jω₀t} and the clockwise arrow is its conjugate. Their vertical (imaginary) components always cancel; their horizontal (real) components always add — producing a pure cosine oscillation.

### EXAM TIP

Whenever you see two exponential terms in a signal expression, check immediately whether they are complex conjugates — if they are, the signal is real and can be written as a single cosine.

---
**📌 Key Takeaways**
- Euler's formula: e^{jθ} = cos θ + j sin θ — the single identity behind everything here.
- cos(ω₀t) = (e^{jω₀t} + e^{-jω₀t})/2; sin(ω₀t) = (e^{jω₀t} − e^{-jω₀t})/(2j).
- C cos(ω₀t + θ) = (C/2)e^{jθ}e^{jω₀t} + (C/2)e^{-jθ}e^{-jω₀t} — the general expansion.
- Each exponential term carries C/2, not C — the most common exam arithmetic trap.
- > **Formula Reference**
> - cos θ = (e^{jθ} + e^{-jθ}) / 2
> - sin θ = (e^{jθ} − e^{-jθ}) / (2j)
> - C cos(ω₀t + θ) = (C/2)e^{jθ}e^{jω₀t} + (C/2)e^{-jθ}e^{-jω₀t}
> - Re{Ce^{jθ}e^{jω₀t}} = C cos(ω₀t + θ)

*In the next section we will use these exponential representations to add sinusoids of the same frequency using phasor algebra, replacing trigonometric identities with straightforward complex arithmetic.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImV1bGVyX3RvX3RyaWdfY29udmVyc2lvbiIsImxhYmVsIjoiRGVyaXZpbmcgY29zaW5lIGFuZCBzaW5lIGZyb20gRXVsZXIncyBmb3JtdWxhIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBpZGVudGl0eSBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gY29zKM+J4oKAdCkgPSAoZV57as+J4oKAdH0g4oiSIGVeey1qz4nigoB0fSkvMiIsIkIuIGNvcyjPieKCgHQpID0gKGVee2rPieKCgHR9ICsgZV57LWrPieKCgHR9KS8yIiwiQy4gY29zKM+J4oKAdCkgPSAoZV57as+J4oKAdH0gKyBlXnstas+J4oKAdH0pLygyaikiLCJELiBjb3Moz4nigoB0KSA9IGVee2rPieKCgHR9Il0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiQWRkaW5nIEV1bGVyJ3MgZm9ybXVsYXMgZm9yICvPieKCgHQgYW5kIOKIks+J4oKAdCBjYW5jZWxzIHRoZSBpbWFnaW5hcnkgcGFydHMgYW5kIGxlYXZlcyAyIGNvcyjPieKCgHQpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBkaWZmZXJlbmNlIGNvcnJlc3BvbmRzIHRvIHNpbmUsIG5vdCBjb3NpbmUuIiwiQyI6IkRpdmlkaW5nIGJ5IDJqIGlzIHBhcnQgb2YgdGhlIHNpbmUgaWRlbnRpdHksIG5vdCB0aGUgY29zaW5lIGlkZW50aXR5LiIsIkQiOiJlXntqz4nigoB0fSBjb250YWlucyBib3RoIGNvc2luZSBhbmQgc2luZSBjb21wb25lbnRzLCBub3QgY29zaW5lIGFsb25lLiJ9LCJoaW50IjoiQXNrIHdoaWNoIG9wZXJhdGlvbiBjYW5jZWxzIHRoZSBqIHNpbiB0ZXJtczogYWRkaXRpb24gb3Igc3VidHJhY3Rpb24/IiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBpZGVudGl0eSBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gc2luKM+J4oKAdCkgPSAoZV57as+J4oKAdH0g4oiSIGVeey1qz4nigoB0fSkvKDJqKSIsIkIuIHNpbijPieKCgHQpID0gKGVee2rPieKCgHR9ICsgZV57LWrPieKCgHR9KS8yIiwiQy4gc2luKM+J4oKAdCkgPSAoZV57as+J4oKAdH0g4oiSIGVeey1qz4nigoB0fSkvMiIsIkQuIHNpbijPieKCgHQpID0gamVee2rPieKCgHR9Il0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiU3VidHJhY3RpbmcgdGhlIHR3byBFdWxlciBmb3JtdWxhcyBpc29sYXRlcyB0aGUgc2luZSB0ZXJtLCBnaXZpbmcgMmogc2luKM+J4oKAdCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhhdCBpcyB0aGUgY29zaW5lIGlkZW50aXR5LiIsIkMiOiJJdCBpcyBtaXNzaW5nIHRoZSBmYWN0b3IgaiBpbiB0aGUgZGVub21pbmF0b3IuIiwiRCI6IlRoaXMgaXMgbm90IGEgcmVhbC12YWx1ZWQgc2luZSBpZGVudGl0eS4ifSwiaGludCI6IlRoZSBzdWJ0cmFjdGlvbiBsZWF2ZXMgYSBmYWN0b3Igb2YgaiBpbiBmcm9udCBvZiBzaW5lLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiZ2VuZXJhbF9zaW51c29pZF9leHBhbnNpb24iLCJsYWJlbCI6IkV4cGFuZGluZyBhIHBoYXNlLXNoaWZ0ZWQgY29zaW5lIGludG8gZXhwb25lbnRpYWxzIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGF0IGlzIHRoZSBjb3JyZWN0IGV4cG9uZW50aWFsIGZvcm0gb2YgNiBjb3Moz4nigoB0ICsgzrgpPyIsIm9wdGlvbnMiOlsiQS4gNmVee2rOuH1lXntqz4nigoB0fSArIDZlXnstas64fWVeey1qz4nigoB0fSIsIkIuIDNlXntqzrh9ZV57as+J4oKAdH0gKyAzZV57LWrOuH1lXnstas+J4oKAdH0iLCJDLiAzZV57as64fWVee2rPieKCgHR9IOKIkiAzZV57LWrOuH1lXnstas+J4oKAdH0iLCJELiA2ZV57aijPieKCgHQgKyDOuCl9Il0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiQSBjb3NpbmUgc3BsaXRzIGludG8gdHdvIGV4cG9uZW50aWFscywgZWFjaCBjYXJyeWluZyBoYWxmIHRoZSBhbXBsaXR1ZGUsIHNvIGVhY2ggY29lZmZpY2llbnQgaXMgNi8yID0gMy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIGRvdWJsZXMgdGhlIGFtcGxpdHVkZTsgZWFjaCBleHBvbmVudGlhbCBzaG91bGQgY2Fycnkgb25seSBoYWxmLiIsIkMiOiJUaGUgbWludXMgc2lnbiB3b3VsZCBwcm9kdWNlIGEgc2luZS10eXBlIGNvbWJpbmF0aW9uLiIsIkQiOiJBIHNpbmdsZSBjb21wbGV4IGV4cG9uZW50aWFsIGlzIG5vdCBieSBpdHNlbGYgZXF1YWwgdG8gYSByZWFsIGNvc2luZS4ifSwiaGludCI6IlRoZSB0d28gZXhwb25lbnRpYWwgdGVybXMgc2hhcmUgdGhlIGFtcGxpdHVkZSBlcXVhbGx5LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiUmV3cml0ZSB4KHQpID0gNCBjb3Moz4nigoB0ICsgMzDCsCkgaW4gZXhwb25lbnRpYWwgZm9ybSwgc2hvd2luZyBlYWNoIHN0ZXAgY2xlYXJseS4iLCJpZGVhbF9hbnN3ZXIiOiJ4KHQpID0gNFsoZV57aijPieKCgHQgKyAzMMKwKX0gKyBlXnstaijPieKCgHQgKyAzMMKwKX0pLzJdID0gMmVee2ooz4nigoB0ICsgMzDCsCl9ICsgMmVeey1qKM+J4oKAdCArIDMwwrApfSA9IDJlXntqMzDCsH1lXntqz4nigoB0fSArIDJlXnstajMwwrB9ZV57LWrPieKCgHR9LiIsImdyYWRpbmdfcnVicmljIjpbIk11c3Qgc3RhcnQgZnJvbSB0aGUgY29zaW5lIGV4cG9uZW50aWFsIGlkZW50aXR5IiwiTXVzdCBpbmNsdWRlIHRoZSBmYWN0b3IgMS8yIGNvcnJlY3RseSIsIk11c3QgYXJyaXZlIGF0IGNvZWZmaWNpZW50cyAyZV57wrFqMzDCsH0iLCJNdXN0IHNob3cgYm90aCBwb3NpdGl2ZS0gYW5kIG5lZ2F0aXZlLWZyZXF1ZW5jeSB0ZXJtcyJdLCJleHBsYW5hdGlvbiI6IlRoaXMgdmVyaWZpZXMgdGhlIHN0dWRlbnQgY2FuIHBlcmZvcm0gdGhlIHN0YW5kYXJkIGV4YW0gY29udmVyc2lvbiB3aXRob3V0IGRyb3BwaW5nIGZhY3RvcnMgb3Igc2lnbnMuIiwiaGludCI6IlVzZSBjb3MgzrEgPSAoZV57as6xfSArIGVeey1qzrF9KS8yIHdpdGggzrEgPSDPieKCgHQgKyAzMMKwLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoicGhhc29yX2FuZF9yZWFsX3NpZ25hbF9pbnRlcnByZXRhdGlvbiIsImxhYmVsIjoiQ29ubmVjdGluZyBwaGFzb3JzLCBleHBvbmVudGlhbHMsIGFuZCByZWFsLXZhbHVlZCBzaWduYWxzIiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoeSBkbyB0aGUgdHdvIGNvZWZmaWNpZW50cyBpbiB0aGUgZXhwb25lbnRpYWwgZm9ybSBvZiBhIHJlYWwgY29zaW5lIGFwcGVhciBhcyBjb21wbGV4IGNvbmp1Z2F0ZXM/Iiwib3B0aW9ucyI6WyJBLiBUbyBtYWtlIHRoZSBmcmVxdWVuY3kgbGFyZ2VyIiwiQi4gVG8gbWFrZSB0aGUgcGhhc2UgemVybyIsIkMuIFRvIGVuc3VyZSB0aGUgaW1hZ2luYXJ5IHBhcnRzIGNhbmNlbCBzbyB0aGUgZmluYWwgc2lnbmFsIGlzIHJlYWwiLCJELiBCZWNhdXNlIGV4cG9uZW50aWFscyBtdXN0IGFsd2F5cyBjb21lIGluIGVxdWFsIG1hZ25pdHVkZXMgaW4gZXZlcnkgcHJvYmxlbSJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IkZvciBhIHJlYWwtdmFsdWVkIHNpbnVzb2lkLCB0aGUgcG9zaXRpdmUtIGFuZCBuZWdhdGl2ZS1mcmVxdWVuY3kgdGVybXMgbXVzdCBwYWlyIGFzIGNvbmp1Z2F0ZXMgc28gdGhlaXIgaW1hZ2luYXJ5IGNvbnRyaWJ1dGlvbnMgY2FuY2VsIGFwcHJvcHJpYXRlbHkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiQ29uanVnYXRlIHBhaXJpbmcgZG9lcyBub3QgY2hhbmdlIGZyZXF1ZW5jeSB2YWx1ZS4iLCJCIjoiQSByZWFsIGNvc2luZSBtYXkgaGF2ZSBub256ZXJvIHBoYXNlLiIsIkQiOiJFcXVhbCBtYWduaXR1ZGVzIGhhcHBlbiBoZXJlIGJlY2F1c2Ugb2YgdGhlIGNvc2luZSBzdHJ1Y3R1cmUsIG5vdCBhcyBhIHVuaXZlcnNhbCBydWxlIGZvciBhbGwgZXhwb25lbnRpYWxzLiJ9LCJoaW50IjoiVGhpbmsgYWJvdXQgd2hhdCBtdXN0IGhhcHBlbiBzbyB0aGUgZmluYWwgdGltZS1kb21haW4gc2lnbmFsIGhhcyBubyBsZWZ0b3ZlciBpbWFnaW5hcnkgcGFydC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJBIHNpZ25hbCBpcyB3cml0dGVuIGFzIHgodCkgPSBSZXs1ZV57LWo0MMKwfWVee2rPieKCgHR9fS4gV2hpY2ggcmVhbCBzaW51c29pZCBpcyB0aGlzPyIsIm9wdGlvbnMiOlsiQS4gNSBjb3Moz4nigoB0IOKIkiA0MMKwKSIsIkIuIDUgc2luKM+J4oKAdCDiiJIgNDDCsCkiLCJDLiA1IGNvcyjPieKCgHQgKyA0MMKwKSIsIkQuIDEwIGNvcyjPieKCgHQg4oiSIDQwwrApIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGFraW5nIHRoZSByZWFsIHBhcnQgb2YgQ2Vee2rOuH1lXntqz4nigoB0fSBnaXZlcyBDIGNvcyjPieKCgHQgKyDOuCkuIEhlcmUgzrggPSDiiJI0MMKwLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlJlYWwgcGFydCBvZiBhIGNvbXBsZXggZXhwb25lbnRpYWwgbWFwcyBuYXR1cmFsbHkgdG8gY29zaW5lLCBub3Qgc2luZS4iLCJDIjoiVGhlIHNpZ24gb2YgdGhlIHBoYXNlIGhhcyBiZWVuIHJldmVyc2VkIGluY29ycmVjdGx5LiIsIkQiOiJUaGUgYW1wbGl0dWRlIHJlbWFpbnMgNSwgbm90IDEwLiJ9LCJoaW50IjoiQ29tYmluZSB0aGUgZXhwb25lbnRzIGZpcnN0LCB0aGVuIHRha2UgdGhlIHJlYWwgcGFydC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoicHl0aG9uX21hdHBsb3RsaWIgcGhhc29yLWFuZ2xlIHNrZXRjaCBzaG93aW5nIG1hZ25pdHVkZSA1IGF0IC00MCBkZWdyZWVzIiwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfV19" style="display:none;"></div>%%KC_END%%
