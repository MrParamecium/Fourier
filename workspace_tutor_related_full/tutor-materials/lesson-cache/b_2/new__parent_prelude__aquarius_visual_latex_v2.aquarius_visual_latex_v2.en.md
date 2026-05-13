%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6InJlYWN0X2RlbW8iLCJyYXRpb25hbGUiOiJUaGUgdGV4dGJvb2sgcGFnZSBoYXMgbm8gdXNhYmxlIGZpZ3VyZSwgYW5kIHNpbnVzb2lkcyBhcmUgYmVzdCBsZWFybmVkIGJ5IHNlZWluZyBob3cgYW1wbGl0dWRlLCBmcmVxdWVuY3ksIHBlcmlvZCwgYW5kIHBoYXNlIGNoYW5nZSB0aGUgd2F2ZWZvcm0uIEEgc3RhdGljIHNpbmUtd2F2ZSByZWZlcmVuY2UgaXMgbGVzcyB2YWx1YWJsZSB0aGFuIGEgY29udHJvbGxlZCBSZWFjdCArIENhbnZhcyBkZW1vIGJlY2F1c2UgdGhlIGtleSBzdHVkZW50IGNvbmZ1c2lvbiBpcyBwYXJhbWV0ZXIgY2hhbmdlLiIsImNyYW0iOiJVc2UgdGhlIGRlbW8gdG8gcmVjb2duaXplIGFtcGxpdHVkZSwgcGVyaW9kLCBhbmQgcGhhc2Utc2hpZnQgcGF0dGVybnMgcXVpY2tseS4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgZGVtbyB0byBjb25uZWN0IGVhY2ggZm9ybXVsYSB0byBvbmUgcmVwcmVzZW50YXRpdmUgd2F2ZWZvcm0gYW5kIG9uZSBwaGFzb3IgcHJvamVjdGlvbi4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhlIGRlbW8gdG8gZXhwb3NlIHNpZ24gY29udmVudGlvbnMsIHBoYXNlIGRpcmVjdGlvbiwgYW5kIHNhbWUtZnJlcXVlbmN5IGNvbXByZXNzaW9uIHRyYXBzLiJ9" style="display:none;"></div>%%KC_END%%
# B.2 Sinusoids

> **Section Objective:** Learn how to read, sketch, and combine sinusoidal signals used throughout signals and systems.

---

## Concepts In This Section

- Sinusoid model
- Amplitude
- Frequency and period
- Angular frequency
- Phase
- Phasor view
- Converting cosine-sine sums into one sinusoid

## 1. The basic sinusoid model

This is the standard form of a real sinusoidal signal. Every symbol has a specific role:

- \(x(t)\) — the signal value at time \(t\)
- \(C\) — **amplitude**: the peak height of the wave (always positive)
- \(f_0\) — **frequency** in cycles per second (Hz): how many full repeats occur each second
- \(\theta\) — **phase** in radians: horizontal shift of the waveform

**When to use it:** Any time a problem mentions a sinusoid, periodic cosine, frequency, or phase.

#### EXAM TRIGGER
Words like "sinusoid", "frequency", "phase", or "periodic cosine" signal that equation (B.13) applies.

#### COMMON MISUSE
Do not treat \(\theta\) as degrees unless the problem explicitly says so. Default is always radians.

**Minimal example:** For \(x(t) = 3\cos(2\pi \cdot 5t + \pi/4)\), the amplitude is \(C = 3\), the frequency is \(f_0 = 5\) Hz, and the phase is \(\theta = \pi/4\) radians.

$$
x(t) = C\cos(2\pi f_0 t + \theta) \quad \text{(B.13)}
$$


## 2. Period and frequency are reciprocals

\(T_0\) is the time (in seconds) for one full cycle to complete. \(f_0\) is the number of complete cycles per second. They are exact reciprocals — knowing one gives you the other immediately.

**Why this works:** The cosine function repeats every time its argument increases by \(2\pi\). In \(2\pi f_0 t + \theta\), the argument increases by \(2\pi\) when \(t\) increases by \(1/f_0\). That time interval is exactly one period.

**When to use it:** Any problem that gives \(T_0\) and asks for \(f_0\), or vice versa.

#### EXAM TRIGGER
If a problem gives period in seconds, take the reciprocal to get frequency in Hz before doing anything else.

#### COMMON MISUSE
Larger frequency does NOT mean larger period — it is the opposite. Higher frequency compresses the waveform.

**Example:** If \(f_0 = 50\) Hz, then \(T_0 = 1/50 = 0.02\) s.

$$
T_0 = \frac{1}{f_0}
$$

## 3. Phasor view: one rotating vector creates the sinusoid

**Angular frequency** \(\omega_0\) is measured in radians per second, while \(f_0\) is measured in cycles per second (Hz). The factor \(2\pi\) converts between them because one full cycle spans \(2\pi\) radians.

Equivalently, \(\omega_0 = 2\pi / T_0\) in inline form.

**When to use it:** When the sinusoid is written as \(\cos(\omega_0 t + \theta)\) instead of \(\cos(2\pi f_0 t + \theta)\) — both forms describe the same signal.

#### EXAM TRIGGER
If you see \(\omega_0\) in a problem, check whether the question asks for Hz or rad/s before reporting your answer.

#### COMMON MISUSE
Do not treat \(\omega_0\) and \(f_0\) as interchangeable. Forgetting the \(2\pi\) factor is one of the most common arithmetic errors.

**Example:** If \(f_0 = 10\) Hz, then \(\omega_0 = 2\pi \cdot 10 = 20\pi\) rad/s \(\approx 62.83\) rad/s.

$$
\omega_0 = 2\pi f_0
$$

## 4. Convert a cosine-sine sum into one sinusoid

%%KC_BLOCK%%<div class="kc-interactive-demo" data-demo-b64="eyJ0eXBlIjoiaW50ZXJhY3RpdmVfZGVtbyIsImRlbW9fdHlwZSI6InNpbnVzb2lkX3BoYXNvcl9wcm9qZWN0aW9uIiwidGl0bGUiOiJTaW51c29pZCBwaGFzb3IgaW5zZXQ6IHJvdGF0aW5nIHZlY3RvciB0byBjb3NpbmUgd2F2ZSIsImV4cGxhbmF0aW9uIjoiVXNlIGFtcGxpdHVkZSwgZnJlcXVlbmN5LCBhbmQgcGhhc2Ugc2xpZGVyczsgdGhlIHJlZCBwcm9qZWN0aW9uIGRvdCB0cmFjZXMgdGhlIHJlYWwgY29zaW5lIHNpZ25hbC4ifQ=="></div>%%KC_END%%

Here \(X\) is a **phasor** — a complex number that encodes both amplitude and phase:

- \(|X| = C\) (magnitude gives amplitude)
- \(\angle X = \theta\) (angle gives phase)

The factor \(e^{j\omega_0 t}\) rotates \(X\) around the origin at angular speed \(\omega_0\). The operator \(\Re\{\cdot\}\) takes the **horizontal projection** of that rotating vector — and that projection is exactly the cosine waveform.

Look at the phasor inset in the demo: as the vector rotates, the red dot on the real axis is the horizontal projection. That projection is the real cosine signal traced on the waveform.

**When to use it:** Combining multiple same-frequency sinusoids is easiest in phasor form — add the complex numbers, then convert back.

#### EXAM TRIGGER
A problem asking to combine sinusoids or interpret phase often expects phasor reasoning.

#### COMMON MISUSE
Do not drop the \(\Re\{\cdot\}\) operator. The complex exponential \(X e^{j\omega_0 t}\) is complex-valued; the real signal requires taking the real part explicitly.

$$
x(t) = \Re\{X e^{j\omega_0 t}\}
$$

## 4. Convert a cosine-sine sum into one sinusoid

This identity works **only** when both terms share the same angular frequency \(\omega\). The goal is to collapse two terms into one phase-shifted cosine.

**Coefficient-matching rules** (expand \(R\cos(\omega t + \theta)\) using the angle-addition formula to derive these):

$$
A = R\cos\theta \quad B = -R\sin\theta
$$

Solving for \(R\) and \(\theta\):

$$
R = \sqrt{A^2 + B^2} \quad \theta = \operatorname{atan2}(-B,\, A)
$$

**When to use it:** Any expression of the form \(\cos(\omega t) + k\sin(\omega t)\) or \(a\cos(\omega t) - b\sin(\omega t)\).

#### EXAM TRIGGER
If you see a cosine and a sine at the same frequency, combine them immediately.

#### COMMON MISUSE
The main trap is the **phase sign**: expanding \(\cos(\omega t + \theta)\) produces \(-\sin(\omega t)\sin\theta\), so the sine coefficient is \(-R\sin\theta\), not \(+R\sin\theta\). Using \(\operatorname{atan2}(B, A)\) instead of \(\operatorname{atan2}(-B, A)\) gives the wrong phase.

Also: reporting only \(R\) without the final phase-shifted sinusoid is an incomplete answer.

$$
A\cos(\omega t) + B\sin(\omega t) = R\cos(\omega t + \theta)
$$

### WORKED EXAMPLE

**Convert \(x(t) = \cos(\omega t) + 2\sin(\omega t)\) into one cosine.**

**Step 1 — Identify coefficients:**
\(A = 1\), \(B = 2\)

**Step 2 — Compute amplitude:**
$$
R = \sqrt{A^2 + B^2} = \sqrt{1^2 + 2^2} = \sqrt{5}
$$

**Step 3 — Compute phase:**
$$
\theta = \operatorname{atan2}(-B,\, A) = \operatorname{atan2}(-2,\, 1) \approx -1.107 \text{ rad}
$$

**Final answer:**
$$
x(t) = \sqrt{5}\cos(\omega t - 1.107)
$$

---

### NEAR-MISS WARNING

For \(3\cos(\omega t) - 4\sin(\omega t)\): here \(A = 3\) and \(B = -4\).

The phase is \(\theta = \operatorname{atan2}(-B,\, A) = \operatorname{atan2}(4,\, 3)\), **not** \(\operatorname{atan2}(-4,\, 3)\).

The minus sign in \(-4\sin(\omega t)\) already lives in \(B\); the formula then negates \(B\) again, so the two negatives cancel and the atan2 argument becomes positive.

> **Exam note:** Always write the final single sinusoid \(R\cos(\omega t + \theta)\) as your answer. Reporting only \(R = 5\) or only \(\theta\) is incomplete and will lose marks.

---
**📌 Key Takeaways**
- Sinusoid model (B.13): \(x(t) = C\cos(2\pi f_0 t + \theta)\) — \(C\) is amplitude, \(f_0\) is frequency (Hz), \(\theta\) is phase (rad).
- Period-frequency reciprocal: \(T_0 = 1/f_0\); larger \(f_0\) means shorter \(T_0\), never longer.
- Angular frequency: \(\omega_0 = 2\pi f_0 = 2\pi / T_0\); do not confuse rad/s with Hz.
- Phasor view: \(x(t) = \Re\{X e^{j\omega_0 t}\}\); the real signal is the horizontal projection of a rotating complex vector.
- Cosine-sine compression: \(A\cos(\omega t) + B\sin(\omega t) = R\cos(\omega t + \theta)\) with \(R = \sqrt{A^2 + B^2}\) and \(\theta = \operatorname{atan2}(-B, A)\); always report the full sinusoid, not just \(R\).

*Next, these sinusoid ideas become easier to manipulate using complex numbers and phasors.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InNpbnVzb2lkX3BhcmFtZXRlcl9yZWFkaW5nIiwibGFiZWwiOiJSZWFkaW5nIGFtcGxpdHVkZSwgZnJlcXVlbmN5LCBhbmQgcGhhc2UgZnJvbSB0aGUgc2ludXNvaWQgbW9kZWwiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciBcXCh4KHQpID0gNFxcY29zKDJcXHBpIFxcY2RvdCA3dCAtIFxccGkvNilcXCksIHdoaWNoIHBhcmFtZXRlciByZWFkaW5nIGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBBbXBsaXR1ZGUgXFwoNFxcKSwgZnJlcXVlbmN5IFxcKDdcXCkgSHosIHBoYXNlIFxcKC1cXHBpLzZcXCkiLCJCLiBBbXBsaXR1ZGUgXFwoN1xcKSwgZnJlcXVlbmN5IFxcKDRcXCkgSHosIHBoYXNlIFxcKC1cXHBpLzZcXCkiLCJDLiBBbXBsaXR1ZGUgXFwoNFxcKSwgZnJlcXVlbmN5IFxcKDE0XFxwaVxcKSBIeiwgcGhhc2UgXFwoLVxccGkvNlxcKSIsIkQuIEFtcGxpdHVkZSBcXCg0XFwpLCBmcmVxdWVuY3kgXFwoN1xcKSByYWQvcywgcGhhc2UgXFwoLTMwXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGhlIG1vZGVsIGlzIFxcKENcXGNvcygyXFxwaSBmXzAgdCArIFxcdGhldGEpXFwpLCBzbyBcXChDID0gNFxcKSwgXFwoZl8wID0gN1xcKSBIeiwgYW5kIFxcKFxcdGhldGEgPSAtXFxwaS82XFwpIHJhZGlhbnMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhlIGFtcGxpdHVkZSBpcyB0aGUgbXVsdGlwbGllciBvdXRzaWRlIHRoZSBjb3NpbmUsIG5vdCB0aGUgZnJlcXVlbmN5LiIsIkMiOiJcXCgxNFxccGlcXCkgaXMgdGhlIGFuZ3VsYXIgZnJlcXVlbmN5IGluIHJhZC9zLCBub3QgdGhlIGhlcnR6aWFuIGZyZXF1ZW5jeS4iLCJEIjoiRnJlcXVlbmN5IGluIHRoaXMgZm9ybSBpcyBpbiBIeiwgYW5kIHBoYXNlIGlzIGluIHJhZGlhbnMgdW5sZXNzIGRlZ3JlZXMgYXJlIHN0YXRlZC4ifSwiaGludCI6Ik1hdGNoIHRoZSBleHByZXNzaW9uIHRvIFxcKENcXGNvcygyXFxwaSBmXzAgdCArIFxcdGhldGEpXFwpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6InBlcmlvZF9mcmVxdWVuY3lfY29udmVyc2lvbiIsImxhYmVsIjoiQ29udmVydGluZyBhbW9uZyBwZXJpb2QsIGZyZXF1ZW5jeSwgYW5kIGFuZ3VsYXIgZnJlcXVlbmN5IiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJBIHNpbnVzb2lkIGhhcyBwZXJpb2QgXFwoVF8wID0gMC4wMVxcKSBzLiBXaGF0IGFyZSBcXChmXzBcXCkgYW5kIFxcKFxcb21lZ2FfMFxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKGZfMCA9IDEwMFxcKSBIeiBhbmQgXFwoXFxvbWVnYV8wID0gMjAwXFxwaVxcKSByYWQvcyIsIkIuIFxcKGZfMCA9IDAuMDFcXCkgSHogYW5kIFxcKFxcb21lZ2FfMCA9IDAuMDJcXHBpXFwpIHJhZC9zIiwiQy4gXFwoZl8wID0gMTAwXFwpIHJhZC9zIGFuZCBcXChcXG9tZWdhXzAgPSAxMDBcXCkgSHoiLCJELiBcXChmXzAgPSAyXFxwaS8wLjAxXFwpIEh6IGFuZCBcXChcXG9tZWdhXzAgPSAxMDBcXCkgcmFkL3MiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJcXChmXzAgPSAxL1RfMCA9IDEwMFxcKSBIeiwgYW5kIFxcKFxcb21lZ2FfMCA9IDJcXHBpIGZfMCA9IDIwMFxccGlcXCkgcmFkL3MuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhpcyB0cmVhdHMgcGVyaW9kIGFzIGZyZXF1ZW5jeSBpbnN0ZWFkIG9mIHRha2luZyB0aGUgcmVjaXByb2NhbC4iLCJDIjoiSHogYW5kIHJhZC9zIGFyZSBzd2FwcGVkLiIsIkQiOiJUaGUgZmFjdG9yIFxcKDJcXHBpXFwpIGJlbG9uZ3MgaW4gYW5ndWxhciBmcmVxdWVuY3ksIG5vdCBoZXJ0emlhbiBmcmVxdWVuY3kuIn0sImhpbnQiOiJGaXJzdCB0YWtlIHRoZSByZWNpcHJvY2FsIHRvIGdldCBcXChmXzBcXCksIHRoZW4gbXVsdGlwbHkgYnkgXFwoMlxccGlcXCkgdG8gZ2V0IFxcKFxcb21lZ2FfMFxcKS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3AyX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJbiB0aGUgaW50ZXJhY3RpdmUgZGVtbywgZG91YmxpbmcgXFwoZl8wXFwpIHdoaWxlIGtlZXBpbmcgXFwoQ1xcKSBhbmQgXFwoXFx0aGV0YVxcKSBmaXhlZCBjYXVzZXMgd2hhdCB2aXN1YWwgY2hhbmdlPyIsIm9wdGlvbnMiOlsiQS4gVGhlIHdhdmVmb3JtIGhhcyB0d2ljZSBhcyBtYW55IGN5Y2xlcyBpbiB0aGUgc2FtZSB0aW1lIHdpbmRvdywgYW5kIHRoZSBwZXJpb2QgaGFsdmVzLiIsIkIuIFRoZSB3YXZlZm9ybSBiZWNvbWVzIHR3aWNlIGFzIHRhbGwsIGFuZCB0aGUgcGVyaW9kIHN0YXlzIGZpeGVkLiIsIkMuIFRoZSB3YXZlZm9ybSBzaGlmdHMgcmlnaHQgYnkgaGFsZiBhIHBlcmlvZCwgYnV0IHNwYWNpbmcgc3RheXMgZml4ZWQuIiwiRC4gVGhlIHdhdmVmb3JtIGNoYW5nZXMgZnJvbSBjb3NpbmUgdG8gc2luZS4iXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJGcmVxdWVuY3kgY291bnRzIGN5Y2xlcyBwZXIgc2Vjb25kLiBEb3VibGluZyBmcmVxdWVuY3kgY29tcHJlc3NlcyB0aGUgd2F2ZWZvcm0gaG9yaXpvbnRhbGx5LCBzbyBcXChUXzAgPSAxL2ZfMFxcKSBoYWx2ZXMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiSGVpZ2h0IGlzIGNvbnRyb2xsZWQgYnkgYW1wbGl0dWRlIFxcKENcXCksIG5vdCBmcmVxdWVuY3kuIiwiQyI6Ikhvcml6b250YWwgcGhhc2Ugc2hpZnQgaXMgY29udHJvbGxlZCBieSBcXChcXHRoZXRhXFwpLCBub3QgZnJlcXVlbmN5IGFsb25lLiIsIkQiOiJDaGFuZ2luZyBmcmVxdWVuY3kgZG9lcyBub3QgY2hhbmdlIHRoZSBzaWduYWwgdHlwZSBmcm9tIGNvc2luZSB0byBzaW5lLiJ9LCJoaW50IjoiTG9vayBhdCB0aGUgcGVyaW9kIG1hcmtlciB3aGVuIFxcKGZfMFxcKSBjaGFuZ2VzLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJpbnRlcmFjdGl2ZV9kZW1vX29ic2VydmF0aW9uIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJwaGFzZV9hbmRfcGhhc29yX3ZpZXciLCJsYWJlbCI6IlBoYXNlIGFuZCBwaGFzb3IgaW50ZXJwcmV0YXRpb24iLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGF0IGRvZXMgXFwoeCh0KSA9IFxcUmVcXHtYIGVee2pcXG9tZWdhXzAgdH1cXH1cXCkgbWVhbiBpbiB0aGUgcGhhc29yIHZpZXc/Iiwib3B0aW9ucyI6WyJBLiBUaGUgcmVhbCBzaWduYWwgaXMgdGhlIGhvcml6b250YWwgcHJvamVjdGlvbiBvZiBhIHJvdGF0aW5nIGNvbXBsZXggdmVjdG9yLiIsIkIuIFRoZSBzaWduYWwgaXMgY29tcGxleC12YWx1ZWQgYW5kIHNob3VsZCBrZWVwIGJvdGggcmVhbCBhbmQgaW1hZ2luYXJ5IHBhcnRzLiIsIkMuIFRoZSBwaGFzb3IgcmVtb3ZlcyB0aGUgZnJlcXVlbmN5IGZyb20gdGhlIHNpZ25hbCBwZXJtYW5lbnRseS4iLCJELiBUaGUgcGhhc2UgbXVzdCBhbHdheXMgYmUgemVybyBpZiB0aGUgc2lnbmFsIGlzIHJlYWwuIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGhlIHJvdGF0aW5nIGNvbXBsZXggdmVjdG9yIGNhcnJpZXMgYW1wbGl0dWRlIGFuZCBwaGFzZTsgdGFraW5nIFxcKFxcUmVcXHtcXGNkb3RcXH1cXCkgZ2l2ZXMgdGhlIHJlYWwgY29zaW5lIHdhdmVmb3JtIGFzIHRoZSBob3Jpem9udGFsIHByb2plY3Rpb24uIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhlIHJlYWwtcGFydCBvcGVyYXRvciBleHBsaWNpdGx5IGV4dHJhY3RzIGEgcmVhbCBzaWduYWwuIiwiQyI6IlRoZSBmYWN0b3IgXFwoZV57alxcb21lZ2FfMCB0fVxcKSBzdGlsbCBjb250YWlucyB0aGUgZnJlcXVlbmN5IGRlcGVuZGVuY2UuIiwiRCI6IkEgcmVhbCBzaW51c29pZCBjYW4gaGF2ZSBhbnkgcGhhc2UuIn0sImhpbnQiOiJBc2sgd2hhdCB0aGUgb3BlcmF0b3IgXFwoXFxSZVxce1xcY2RvdFxcfVxcKSBkb2VzIGdlb21ldHJpY2FsbHkuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6InBoYXNvcl9wcm9qZWN0aW9uX2RlbW8iLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJzaW5nbGVfc2ludXNvaWRfY29udmVyc2lvbiIsImxhYmVsIjoiQ29tYmluaW5nIHNhbWUtZnJlcXVlbmN5IGNvc2luZSBhbmQgc2luZSB0ZXJtcyBpbnRvIG9uZSBzaW51c29pZCIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNF9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQ29udmVydCBcXCh4KHQpID0gXFxjb3MoXFxvbWVnYSB0KSArIDJcXHNpbihcXG9tZWdhIHQpXFwpIGludG8gb25lIGNvc2luZS4iLCJvcHRpb25zIjpbIkEuIFxcKFxcc3FydHs1fVxcY29zKFxcb21lZ2EgdCAtIDEuMTA3KVxcKSIsIkIuIFxcKFxcc3FydHs1fVxcY29zKFxcb21lZ2EgdCArIDEuMTA3KVxcKSIsIkMuIFxcKDNcXGNvcyhcXG9tZWdhIHQgLSAxLjEwNylcXCkiLCJELiBcXChcXHNxcnR7NX1cXHNpbihcXG9tZWdhIHQgLSAxLjEwNylcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJIZXJlIFxcKEEgPSAxXFwpLCBcXChCID0gMlxcKSwgc28gXFwoUiA9IFxcc3FydHsxXjIgKyAyXjJ9ID0gXFxzcXJ0ezV9XFwpIGFuZCBcXChcXHRoZXRhID0gXFxvcGVyYXRvcm5hbWV7YXRhbjJ9KC0yLCAxKSBcXGFwcHJveCAtMS4xMDdcXCkgcmFkLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoZSBwaGFzZSBzaWduIGlzIHdyb25nIGJlY2F1c2UgdGhlIHNpbmUgY29lZmZpY2llbnQgZXF1YWxzIFxcKC1SXFxzaW5cXHRoZXRhXFwpLCBub3QgXFwoK1JcXHNpblxcdGhldGFcXCkuIiwiQyI6IkFtcGxpdHVkZSBpcyBcXChcXHNxcnR7MV4yICsgMl4yfSA9IFxcc3FydHs1fVxcKSwgbm90IFxcKDEgKyAyID0gM1xcKS4iLCJEIjoiVGhlIHJlcXVlc3RlZCBmb3JtIGlzIG9uZSBjb3NpbmU7IHN3aXRjaGluZyB0byBzaW5lIGNoYW5nZXMgdGhlIHBoYXNlIGNvbnZlbnRpb24uIn0sImhpbnQiOiJVc2UgXFwoXFx0aGV0YSA9IFxcb3BlcmF0b3JuYW1le2F0YW4yfSgtQiwgQSlcXCksIG5vdCBcXChcXG9wZXJhdG9ybmFtZXthdGFuMn0oQiwgQSlcXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3A0X3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgXFwoeCh0KSA9IDNcXGNvcyhcXG9tZWdhIHQpIC0gNFxcc2luKFxcb21lZ2EgdClcXCksIHdoaWNoIHBoYXNlIHNldHVwIGlzIGNvcnJlY3QgZm9yIFxcKFJcXGNvcyhcXG9tZWdhIHQgKyBcXHRoZXRhKVxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKFIgPSA1XFwpLCBcXChcXHRoZXRhID0gXFxvcGVyYXRvcm5hbWV7YXRhbjJ9KDQsIDMpXFwpIiwiQi4gXFwoUiA9IDdcXCksIFxcKFxcdGhldGEgPSBcXG9wZXJhdG9ybmFtZXthdGFuMn0oLTQsIDMpXFwpIiwiQy4gXFwoUiA9IDVcXCksIFxcKFxcdGhldGEgPSBcXG9wZXJhdG9ybmFtZXthdGFuMn0oLTQsIDMpXFwpIiwiRC4gXFwoUiA9IDFcXCksIFxcKFxcdGhldGEgPSBcXG9wZXJhdG9ybmFtZXthdGFuMn0oMywgLTQpXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiSGVyZSBcXChBID0gM1xcKSwgXFwoQiA9IC00XFwpLCBzbyBcXChSID0gXFxzcXJ0ezNeMiArICgtNCleMn0gPSA1XFwpIGFuZCBcXChcXHRoZXRhID0gXFxvcGVyYXRvcm5hbWV7YXRhbjJ9KC1CLCBBKSA9IFxcb3BlcmF0b3JuYW1le2F0YW4yfSg0LCAzKVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJBbXBsaXR1ZGUgc2hvdWxkIGJlIFxcKFxcc3FydHszXjIgKyAoLTQpXjJ9ID0gNVxcKSwgbm90IDcuIiwiQyI6IlRoaXMgdXNlcyBcXChCXFwpIGRpcmVjdGx5IGFuZCBtaXNzZXMgdGhlIG1pbnVzIHNpZ24gaW4gXFwoQiA9IC1SXFxzaW5cXHRoZXRhXFwpLiIsIkQiOiJUaGlzIGRvZXMgbm90IG1hdGNoIHRoZSBjb2VmZmljaWVudCBydWxlcyBhdCBhbGwuIn0sImhpbnQiOiJUaGUgZm9ybXVsYSB1c2VzIFxcKC1CXFwpIGluc2lkZSBcXChcXG9wZXJhdG9ybmFtZXthdGFuMn0oLUIsIEEpXFwpOyBoZXJlIFxcKEIgPSAtNFxcKSBzbyBcXCgtQiA9IDRcXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3A0X3EzIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJBIGNsYXNzbWF0ZSBjb252ZXJ0cyBcXCgyXFxjb3MoXFxvbWVnYSB0KSArIDJcXHNpbihcXG9tZWdhIHQpXFwpIGFuZCByZXBvcnRzIG9ubHkgXFwoUiA9IDJcXHNxcnR7Mn1cXCkuIEV4cGxhaW4gd2h5IHRoaXMgYW5zd2VyIGlzIGluY29tcGxldGUuIiwiaWRlYWxfYW5zd2VyIjoiVGhlIGFtcGxpdHVkZSBcXChSID0gMlxcc3FydHsyfVxcKSBpcyBjb3JyZWN0LCBidXQgdGhlIHByb2JsZW0gYXNrcyBmb3Igb25lIHNpbnVzb2lkLCBzbyB0aGUgcGhhc2UgbXVzdCBhbHNvIGJlIGluY2x1ZGVkLiBTaW5jZSBcXChBID0gMlxcKSBhbmQgXFwoQiA9IDJcXCksIHdlIGdldCBcXChcXHRoZXRhID0gXFxvcGVyYXRvcm5hbWV7YXRhbjJ9KC0yLCAyKSA9IC1cXHBpLzRcXCkuIFRoZSBjb21wbGV0ZSBmaW5hbCBmb3JtIGlzIFxcKDJcXHNxcnR7Mn1cXGNvcyhcXG9tZWdhIHQgLSBcXHBpLzQpXFwpLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3Qgc3RhdGUgdGhhdCBhbXBsaXR1ZGUgYWxvbmUgaXMgaW5jb21wbGV0ZS4iLCJNdXN0IGluY2x1ZGUgYSBwaGFzZSB2YWx1ZS4iLCJNdXN0IGdpdmUgb3IgZGVzY3JpYmUgdGhlIGZpbmFsIHNpbmdsZS1zaW51c29pZCBmb3JtLiIsIk11c3QgdXNlIHRoZSBjb3JyZWN0IG5lZ2F0aXZlIHBoYXNlIHNpZ24gZm9yIHRoZSBwb3NpdGl2ZSBzaW5lIGNvZWZmaWNpZW50LiJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2F0Y2hlcyB0aGUgY29tbW9uIGV4YW0gdHJhcCBvZiBzdG9wcGluZyBhZnRlciBtYWduaXR1ZGUgYW5kIGZvcmdldHRpbmcgdGhlIGZpbmFsIHBoYXNlLWFkanVzdGVkIHNpZ25hbC4iLCJoaW50IjoiVGhlIGZpbmFsIGFuc3dlciBtdXN0IGxvb2sgbGlrZSBcXChSXFxjb3MoXFxvbWVnYSB0ICsgXFx0aGV0YSlcXCksIG5vdCBqdXN0IFxcKFJcXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19XX0=" style="display:none;"></div>%%KC_END%%
