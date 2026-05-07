# B.1 Complex Numbers

> **Section Objective:** Master two equivalent descriptions of a complex number — rectangular form and polar/exponential form — and convert fluently between them with correct quadrant handling.

Consider z = -2 + j3. In rectangular language, this tells you two things immediately: the point sits 2 units to the left of the origin and 3 units above it. In polar language, the same point is described by a distance from the origin, r = sqrt((-2)² + 3²) = sqrt(13) ≈ 3.61, and a direction angle θ measured from the positive real axis, θ ≈ 123.7°.

This section is about those two descriptions being completely equivalent — same point, different packaging. Basic complex-plane plotting and notation are assumed, so the focus here is on the ideas that carry the most exam risk: the difference between magnitude and real part, how to compute r and θ correctly with quadrant checking, how to find the principal angle, and how to reverse the process from polar back to rectangular. Polar form is not just notation — it makes rotation, geometry, and the exponential formulas that appear throughout signals and systems far more natural to work with.

![Fig. B.2](/figures/page-005-fig__b_2-1.png)
*The complex number z = a + jb is a single point that can be read two ways: as Cartesian coordinates (a, b) giving horizontal and vertical components, or as polar data (r, θ) giving distance from the origin and direction angle — two descriptions of exactly the same point, not two different numbers.*

## 1. Rectangular Form Versus Polar Meaning

Take z = -2 + j3 and pull out four distinct quantities:

- **Real part:** a = -2 (horizontal coordinate)
- **Imaginary part:** b = 3 (vertical coordinate)
- **Magnitude:** r = sqrt((-2)² + 3²) = sqrt(13) ≈ 3.61
- **Angle:** θ = arctan(3 / -2), corrected to quadrant II ≈ 123.7°

### CRITICAL DISTINCTION

The magnitude r is **not** the real part a. The real part is just one coordinate; the magnitude is the total distance from the origin, computed from both coordinates. Saying "the magnitude is -2" is a common and costly error.

The right-triangle geometry behind the complex plane gives the conversion directly:

- Horizontal leg: a = r cos θ
- Vertical leg: b = r sin θ

Substituting back into z = a + jb:

z = r cos θ + j r sin θ = r(cos θ + j sin θ)

This is the polar form. Euler's formula then compresses it further into exponential form, z = re^{jθ}, which you will see constantly in signals and systems work.

$$a = r\cos\theta, \quad b = r\sin\theta, \quad z = a + jb = r(\cos\theta + j\sin\theta), \quad e^{j\theta} = \cos\theta + j\sin\theta, \quad z = re^{j\theta}$$
*Rectangular form records where the point sits by its horizontal component a and vertical component b. Polar and exponential form record the same location by its distance from the origin r and its direction angle θ. Euler's formula, e^{jθ} = cos θ + j sin θ, is the exact bridge that makes these two descriptions mathematically identical — not approximations of each other, but the same number written two ways.*

![unknown](/figures/page-009-unknown-1.png)
*These four examples expose the key exam trap: the raw output of inverse tangent gives only a reference angle, not the true polar argument — you must check the signs of a and b to determine the correct quadrant, as seen clearly in the second-quadrant case (-2 + j1) where the angle is near 153°, not the -26.6° a calculator naively returns.*

## 2. Converting Rectangular Form to Polar Form Correctly

The procedure has four explicit steps. Work through two examples.

---

### EXAMPLE 1 — Quadrant IV: z = 1 - j3

**Step 1 — Magnitude:** r = sqrt(1² + (-3)²) = sqrt(1 + 9) = sqrt(10) ≈ 3.162

**Step 2 — Reference arctangent:** arctan(|-3| / |1|) = arctan(3) ≈ 71.6°

**Step 3 — Quadrant check:** a = 1 > 0, b = -3 < 0 → quadrant IV → angle is negative

**Step 4 — Principal angle and result:** θ = -71.6°, so z = sqrt(10) e^{-j71.6°}

---

### EXAMPLE 2 — Quadrant II: z = -2 + j1

**Step 1 — Magnitude:** r = sqrt((-2)² + 1²) = sqrt(5) ≈ 2.236

**Step 2 — Reference arctangent:** arctan(|1| / |-2|) = arctan(0.5) ≈ 26.6°

**Step 3 — Quadrant check:** a = -2 < 0, b = 1 > 0 → quadrant II → angle = 180° - 26.6° = 153.4°

**Step 4 — Principal angle and result:** θ = 153.4°, so z = sqrt(5) e^{j153.4°}

### EXAM TIP

A calculator's arctan function always returns a value between -90° and +90°. That output is a reference angle, not automatically the correct argument. Always verify the quadrant from the signs of a and b before writing the final angle.

#### Note on equivalent angles
Angles differing by 360° (or 2π radians) describe the same complex number. Exams almost always expect the **principal value**, typically in the range (-180°, 180°] or (-π, π].

![Fig. B.5](/figures/page-011-fig__b_5-1.png)
*Reversing the conversion: given r and θ in polar form, recover the Cartesian coordinates directly with a = r cos θ and b = r sin θ — this works for any angle, including negative angles and angles that include full extra rotations, because cosine and sine handle all cases automatically.*

## 3. Converting Polar Form Back to Rectangular Form

Start with a concrete example: z = 2e^{-jπ/3}.

**Real part:** a = 2 cos(-π/3) = 2 × (1/2) = 1

**Imaginary part:** b = 2 sin(-π/3) = 2 × (-√3/2) = -√3

**Result:** z = 1 - j√3

---

### GENERAL RULE

To convert re^{jθ} to rectangular form:
1. Evaluate cos θ → multiply by r → this is the real part a
2. Evaluate sin θ → multiply by r → this is the imaginary part b
3. Attach j only to the sine term: z = r cos θ + j(r sin θ)

#### Note on full rotations
If the angle includes extra full turns — for example θ + 2π or θ - 4π — the cosine and sine values are unchanged, so the rectangular result is identical. There is no need to reduce the angle before evaluating; the trigonometric functions handle it automatically.

---
**📌 Key Takeaways**
- A complex number has four quantities: real part a, imaginary part b, magnitude r = sqrt(a²+b²), and angle θ — magnitude is never the same as the real part.
- To find the polar angle, compute arctan(|b|/|a|) as a reference, then correct for the actual quadrant using the signs of a and b.
- To recover rectangular form from re^{jθ}, evaluate a = r cos θ and b = r sin θ — works for any angle, including negative or multi-revolution angles.

*In the next section we will use these forms to make complex-number operations faster and cleaner.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InBhcnRzX3ZzX21hZ25pdHVkZSIsImxhYmVsIjoiRGlzdGluZ3Vpc2hpbmcgcmVhbCBwYXJ0LCBpbWFnaW5hcnkgcGFydCwgYW5kIG1hZ25pdHVkZSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHogPSAtMiArIGozLCB3aGljaCBzdGF0ZW1lbnQgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIFJlKHopID0gLTIsIEltKHopID0gMywgfHp8ID0gc3FydCgxMykiLCJCLiBSZSh6KSA9IC0yLCBJbSh6KSA9IDNqLCB8enwgPSAxIiwiQy4gUmUoeikgPSBzcXJ0KDEzKSwgSW0oeikgPSAzLCB8enwgPSAtMiIsIkQuIFJlKHopID0gLTIsIEltKHopID0gc3FydCgxMyksIHx6fCA9IDMiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJUaGUgcmVhbCBwYXJ0IGlzIHRoZSBjb2VmZmljaWVudCBvbiB0aGUgaG9yaXpvbnRhbCBheGlzLCB0aGUgaW1hZ2luYXJ5IHBhcnQgaXMgdGhlIGNvZWZmaWNpZW50IG9mIGosIGFuZCB0aGUgbWFnbml0dWRlIGlzIHNxcnQoKC0yKV4yICsgM14yKSA9IHNxcnQoMTMpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoZSBpbWFnaW5hcnkgcGFydCBpcyAzLCBub3QgM2osIGFuZCB0aGUgbWFnbml0dWRlIGlzIG5vdCAxLiIsIkMiOiJzcXJ0KDEzKSBpcyB0aGUgbWFnbml0dWRlLCBub3QgdGhlIHJlYWwgcGFydC4iLCJEIjoic3FydCgxMykgaXMgbm90IHRoZSBpbWFnaW5hcnkgcGFydCwgYW5kIDMgaXMgbm90IHRoZSBtYWduaXR1ZGUuIn0sImhpbnQiOiJTZXBhcmF0ZSBjb21wb25lbnQgdmFsdWVzIGZyb20gZGlzdGFuY2UgZnJvbSB0aGUgb3JpZ2luLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQSBzdHVkZW50IHNheXM6ICdJbiB6ID0gYSArIGpiLCB0aGUgbWFnbml0dWRlIGlzIGEgYmVjYXVzZSBhIGlzIHRoZSBob3Jpem9udGFsIGNvb3JkaW5hdGUuJyBFeHBsYWluIHdoeSB0aGlzIGlzIHdyb25nLiIsImlkZWFsX2Fuc3dlciI6IlRoZSBxdWFudGl0eSBhIGlzIG9ubHkgdGhlIGhvcml6b250YWwgY29tcG9uZW50LiBUaGUgbWFnbml0dWRlIGlzIHRoZSB0b3RhbCBkaXN0YW5jZSBmcm9tIHRoZSBvcmlnaW4sIHNvIGl0IGRlcGVuZHMgb24gYm90aCBhIGFuZCBiOiB8enwgPSBzcXJ0KGFeMiArIGJeMikuIE9ubHkgaWYgYiA9IDAgd291bGQgdGhlIG1hZ25pdHVkZSBlcXVhbCB8YXwuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBzdGF0ZSB0aGF0IGEgaXMgdGhlIHJlYWwgY29tcG9uZW50LCBub3QgdGhlIG1hZ25pdHVkZSIsIk11c3QgZ2l2ZSB8enwgPSBzcXJ0KGFeMiArIGJeMikiLCJNdXN0IG5vdGUgdGhhdCBlcXVhbGl0eSB3aXRoIGEgaGFwcGVucyBvbmx5IGluIHRoZSBzcGVjaWFsIGNhc2UgYiA9IDAsIGFuZCBldmVuIHRoZW4gbWFnbml0dWRlIGlzIHxhfCJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHRoZSBleGFjdCBtaXNjb25jZXB0aW9uIHRoZSBzdHVkZW50IHByb2ZpbGUgZmxhZ3M6IGNvbmZ1c2luZyBjb21wb25lbnQgd2l0aCBtYWduaXR1ZGUuIiwiaGludCI6IlRoaW5rIG9mIGEgcmlnaHQgdHJpYW5nbGU6IG9uZSBzaWRlIGlzIG5vdCB0aGUgaHlwb3RlbnVzZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InJlY3Rhbmd1bGFyX3RvX3BvbGFyIiwibGFiZWwiOiJDb252ZXJ0aW5nIHJlY3Rhbmd1bGFyIGZvcm0gdG8gcG9sYXIgZm9ybSB3aXRoIGNvcnJlY3QgcXVhZHJhbnQiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGlzIHRoZSBjb3JyZWN0IHBvbGFyIGZvcm0gb2YgeiA9IDEgLSBqMyB1c2luZyBhIHByaW5jaXBhbCBhbmdsZSBpbiBkZWdyZWVzPyIsIm9wdGlvbnMiOlsiQS4gc3FydCgxMCllXntqNzEuNsKwfSIsIkIuIHNxcnQoMTApZV57LWo3MS42wrB9IiwiQy4gMTBlXnstajcxLjbCsH0iLCJELiBzcXJ0KDEwKWVeey1qMTguNMKwfSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBtYWduaXR1ZGUgaXMgc3FydCgxXjIgKyAoLTMpXjIpID0gc3FydCgxMCkuIFRoZSBwb2ludCBpcyBpbiBxdWFkcmFudCBJViwgc28gdGhlIHByaW5jaXBhbCBhbmdsZSBpcyAtNzEuNiBkZWdyZWVzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlBvc2l0aXZlIDcxLjYgZGVncmVlcyB3b3VsZCBwbGFjZSB0aGUgcG9pbnQgaW4gcXVhZHJhbnQgSSwgbm90IElWLiIsIkMiOiJUaGUgbWFnbml0dWRlIGlzIHNxcnQoMTApLCBub3QgMTAuIiwiRCI6IlRoZSBhbmdsZSB2YWx1ZSBpcyBpbmNvcnJlY3QuIn0sImhpbnQiOiJDb21wdXRlIG1hZ25pdHVkZSBmaXJzdCwgdGhlbiB1c2UgdGhlIHNpZ25zIG9mIGEgYW5kIGIgdG8gbG9jYXRlIHRoZSBxdWFkcmFudC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoiY29tcGxleF9wbGFuZV9wb2ludCIsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgY2FsY3VsYXRvciBnaXZlcyB0YW7igbvCuSgxLygtMikpID0gLTI2LjbCsC4gV2hhdCBpcyB0aGUgY29ycmVjdCBwcmluY2lwYWwgYXJndW1lbnQgb2YgeiA9IC0yICsgajE/Iiwib3B0aW9ucyI6WyJBLiAtMjYuNsKwIiwiQi4gMjYuNsKwIiwiQy4gMTUzLjTCsCIsIkQuIDMzMy40wrAiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJUaGUgcG9pbnQgKC0yLCAxKSBsaWVzIGluIHF1YWRyYW50IElJLCBzbyB0aGUgYWN0dWFsIGFuZ2xlIG11c3QgYmUgYmV0d2VlbiA5MMKwIGFuZCAxODDCsC4gQWRkIDE4MMKwIHRvIHRoZSByZWZlcmVuY2Ugb3V0cHV0IC0yNi42wrAgdG8gZ2V0IDE1My40wrAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhhdCBhbmdsZSBsaWVzIGluIHF1YWRyYW50IElWLCBpbmNvbnNpc3RlbnQgd2l0aCB4IG5lZ2F0aXZlIGFuZCB5IHBvc2l0aXZlLiIsIkIiOiJUaGF0IGFuZ2xlIGxpZXMgaW4gcXVhZHJhbnQgSS4iLCJEIjoiMzMzLjTCsCBpcyBjb3Rlcm1pbmFsIHdpdGggLTI2LjbCsCwgc3RpbGwgcXVhZHJhbnQgSVYuIn0sImhpbnQiOiJOZXZlciB0cnVzdCBpbnZlcnNlIHRhbmdlbnQgYWxvbmU7IGNoZWNrIHRoZSBxdWFkcmFudCBmcm9tIHRoZSBzaWducy4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoiY29tcGxleF9wbGFuZV9xdWFkcmFudF9jaGVjayIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoicG9sYXJfdG9fcmVjdGFuZ3VsYXIiLCJsYWJlbCI6IkNvbnZlcnRpbmcgcG9sYXIvZXhwb25lbnRpYWwgZm9ybSB0byByZWN0YW5ndWxhciBmb3JtIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkNvbnZlcnQgeiA9IDJlXnstas+ALzN9IHRvIHJlY3Rhbmd1bGFyIGZvcm0uIiwib3B0aW9ucyI6WyJBLiAxICsgauKImjMiLCJCLiAtMSArIGriiJozIiwiQy4gMSAtIGriiJozIiwiRC4gLTEgLSBq4oiaMyJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlVzaW5nIHogPSByKGNvcyDOuCArIGogc2luIM64KSwgd2UgZ2V0IDIoY29zKC3PgC8zKSArIGogc2luKC3PgC8zKSkgPSAyKDEvMiAtIGriiJozLzIpID0gMSAtIGriiJozLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBzaWduIG9mIHRoZSBpbWFnaW5hcnkgcGFydCBpcyB3cm9uZyBiZWNhdXNlIHNpbigtz4AvMykgaXMgbmVnYXRpdmUuIiwiQiI6IkJvdGggdGhlIHJlYWwgYW5kIGltYWdpbmFyeSBzaWducyBhcmUgd3JvbmcuIiwiRCI6IlRoZSByZWFsIHBhcnQgc2hvdWxkIGJlIHBvc2l0aXZlIGJlY2F1c2UgY29zKC3PgC8zKSA9IDEvMi4ifSwiaGludCI6IkV2YWx1YXRlIGNvc2luZSBhbmQgc2luZSBzZXBhcmF0ZWx5IGJlZm9yZSBtdWx0aXBseWluZyBieSByLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHJlY3Rhbmd1bGFyIGZvcm0gaXMgZXF1YWwgdG8gMmVee2o0z4B9PyIsIm9wdGlvbnMiOlsiQS4gLTIiLCJCLiAyIiwiQy4gMmoiLCJELiAtMmoiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJBbiBhbmdsZSBvZiA0z4AgaXMgdHdvIGZ1bGwgdHVybnMsIHNvIGNvcyg0z4ApID0gMSBhbmQgc2luKDTPgCkgPSAwLiBUaGVyZWZvcmUgeiA9IDIoMSArIGrCtzApID0gMi4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGF0IHdvdWxkIGNvcnJlc3BvbmQgdG8gYW5nbGUgz4AsIG5vdCA0z4AuIiwiQyI6IlRoYXQgd291bGQgY29ycmVzcG9uZCB0byBhbmdsZSDPgC8yLiIsIkQiOiJUaGF0IHdvdWxkIGNvcnJlc3BvbmQgdG8gYW5nbGUgLc+ALzIuIn0sImhpbnQiOiJBbmdsZXMgZGlmZmVyaW5nIGJ5IG11bHRpcGxlcyBvZiAyz4AgcmVwcmVzZW50IHRoZSBzYW1lIGRpcmVjdGlvbi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImFuZ2xlX2VxdWl2YWxlbmNlX3ByaW5jaXBhbF92YWx1ZSIsImxhYmVsIjoiRXF1aXZhbGVudCBhbmdsZXMgYW5kIHByaW5jaXBhbCB2YWx1ZSIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDRfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHN0YXRlbWVudCBpcyB0cnVlIGFib3V0IHRoZSBhbmdsZSBvZiBhIGNvbXBsZXggbnVtYmVyIHdyaXR0ZW4gYXMgcmVee2rOuH0/Iiwib3B0aW9ucyI6WyJBLiBPbmx5IG9uZSBhbmdsZSBjYW4gcmVwcmVzZW50IGEgZ2l2ZW4gbm9uemVybyBjb21wbGV4IG51bWJlciIsIkIuIEFuZ2xlcyB0aGF0IGRpZmZlciBieSAyz4AgcmVwcmVzZW50IGRpZmZlcmVudCBjb21wbGV4IG51bWJlcnMiLCJDLiBBbmdsZXMgdGhhdCBkaWZmZXIgYnkgaW50ZWdlciBtdWx0aXBsZXMgb2YgMs+AIHJlcHJlc2VudCB0aGUgc2FtZSBjb21wbGV4IG51bWJlciIsIkQuIFRoZSBwcmluY2lwYWwgdmFsdWUgbXVzdCBhbHdheXMgYmUgcG9zaXRpdmUiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJUaGUgZGlyZWN0aW9uIHJlcGVhdHMgZXZlcnkgZnVsbCByb3RhdGlvbiwgc28gzrggYW5kIM64ICsgMs+AbiByZXByZXNlbnQgdGhlIHNhbWUgcG9pbnQuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiQSBub256ZXJvIGNvbXBsZXggbnVtYmVyIGhhcyBpbmZpbml0ZWx5IG1hbnkgY290ZXJtaW5hbCBhbmdsZSBkZXNjcmlwdGlvbnMuIiwiQiI6IkEgMs+AIHNoaWZ0IGlzIGEgZnVsbCB0dXJuIGJhY2sgdG8gdGhlIHNhbWUgZGlyZWN0aW9uLiIsIkQiOiJQcmluY2lwYWwgdmFsdWVzIGFyZSBjb21tb25seSBjaG9zZW4gaW4gYSBzdGFuZGFyZCBpbnRlcnZhbCBhbmQgbWF5IGJlIG5lZ2F0aXZlLiJ9LCJoaW50IjoiVGhpbmsgb2YgdHVybmluZyBhIHBvaW50ZXIgb25lIGZ1bGwgcmV2b2x1dGlvbi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
