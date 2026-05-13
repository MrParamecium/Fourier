# B.1 Complex Numbers

> **Section Objective:** Master the two forms of a complex number — rectangular and polar — and convert between them accurately, including correct quadrant handling for the angle.

---

Consider z = −2 + j1. In **rectangular form**, this is a direct instruction: move 2 units left along the real axis, then 1 unit up along the imaginary axis. You land on a specific point in the complex plane. In **polar form**, the same point is described differently: how far from the origin, and in what direction. Same point, two descriptions.

This section is about exactly that duality. Every complex number can be written as a + jb (rectangular) or as re^(jθ) (polar/exponential), and converting fluently between them is a core exam skill.

### WHY THIS MATTERS FOR THE EXAM

Many marks are lost to three specific errors: confusing magnitude r with real part a, reading the wrong angle from a calculator, and ignoring which quadrant the point actually sits in. This section addresses all three with step-by-step derivations and visual reasoning.

![Fig. B.2](/figures/page-005-fig__b_2-1.png)
*The same complex number z = a + jb can be read as Cartesian coordinates (a, b) or as magnitude-angle data (r, θ); its conjugate z* = a − jb is the mirror image reflected across the real axis.*

## 1. Rectangular Form and Polar Form Describe the Same Point

Look at the figure above. The point z = a + jb sits at horizontal coordinate a and vertical coordinate b. Draw a line from the origin to that point — its length is r, and the angle it makes with the positive real axis is θ.

From the right triangle formed by a, b, and r, basic trigonometry gives:

- a = r cos θ  (horizontal leg)
- b = r sin θ  (vertical leg)

Substituting both into z = a + jb:

z = r cos θ + j(r sin θ) = r(cos θ + j sin θ)

This substitution is legal because a and b are just real numbers, and we are replacing each with its trigonometric equivalent from the same triangle. Nothing about the complex number changes — only how we describe it.

### COMMON MISTAKE

r is the **distance from the origin** to the point — it is always nonnegative. It is **not** the real part a. The real part can be negative; the magnitude never can.

#### Warning

If Im(z) = 0, then r = |a|, but in general r ≠ a.

$$z = a + jb = r(\cos\theta + j\sin\theta), \quad a = r\cos\theta, \quad b = r\sin\theta, \quad e^{j\theta} = \cos\theta + j\sin\theta$$
*These four formulas form the complete conversion bridge. The left side of the first equation is rectangular form — it records the coordinates (a, b) directly. The middle is trigonometric polar form — it encodes the same point via distance r and angle θ. Euler's formula (the rightmost identity) then compresses the trigonometric polar form into the compact exponential notation z = re^(jθ), which is the form most commonly used in engineering calculations.*

![unknown](/figures/page-009-unknown-1.png)
*This figure is the exam trap map for rectangular-to-polar conversion: the magnitude always comes from the Pythagorean theorem, but the angle must be corrected using the actual quadrant of the point — never trust a raw inverse-tangent output from a calculator without checking.*

## 2. How to Convert Rectangular Form to Polar Form Without Quadrant Mistakes

**Example: z = −2 + j1**

**Step 1 — Find the magnitude.**

r = sqrt((-2)² + 1²) = sqrt(4 + 1) = sqrt(5) ≈ 2.236

The magnitude is always computed from the Pythagorean theorem using both coordinates. It is always positive.

**Step 2 — Find the reference angle.**

A calculator gives tan⁻¹(|b|/|a|) = tan⁻¹(1/2) ≈ 26.6°. This is only the reference angle — the acute angle between the line to the point and the nearest horizontal axis.

**Step 3 — Correct for the quadrant.**

The point (−2, 1) has a negative real part and a positive imaginary part, so it lies in **quadrant II**. In quadrant II, the principal angle is:

θ = 180° − 26.6° = **153.4°**

The polar form is therefore z = sqrt(5) e^(j153.4°).

### GENERAL RULE

For z = a + jb: compute r = sqrt(a² + b²), then determine θ from the quadrant, not from the calculator alone.

#### Quick Comparison

For z = 3 + 4j: Re(z) = 3 (just the horizontal coordinate), but |z| = sqrt(9 + 16) = **5** (the full distance). These are different quantities and must never be confused.

![Fig. B.5](/figures/page-011-fig__b_5-1.png)
*This figure reverses the process: starting from a known magnitude r and angle θ, the Cartesian coordinates are recovered using a = r cos θ and b = r sin θ, and the method works correctly even when the angle is negative or when it includes multiple full rotations.*

## 3. How to Convert Polar Form Back to Rectangular Form

**Example 1: z = 2e^(jπ/2)**

Apply z = r(cos θ + j sin θ) with r = 2 and θ = π/2:

z = 2(cos(π/2) + j sin(π/2))
  = 2(0 + j · 1)
  = j2

The point lands on the positive imaginary axis, exactly as expected for an angle of 90°.

**Example 2: z = 2e^(j4π)**

θ = 4π is exactly two full rotations (each rotation = 2π). After two complete turns, the direction is identical to θ = 0:

z = 2(cos(4π) + j sin(4π)) = 2(1 + j · 0) = **2**

Adding full turns (multiples of 2π) to an angle does not move the point.

### GENERAL RULE

re^(jθ) = r cos θ + jr sin θ

Evaluate cos θ and sin θ first, then multiply by r.

### KEY INSIGHT

Angles that differ by a multiple of 2π (or 360°) are **equivalent** — they describe the same direction. The **principal angle** is the unique representative chosen in the range (−180°, 180°], or equivalently (−π, π]. When an exam asks for the principal angle, reduce any equivalent angle into that range.

---
**📌 Key Takeaways**
- Rectangular form a + jb gives coordinates; polar form re^(jθ) gives distance and direction — same point.
- Magnitude: r = sqrt(a² + b²) — always nonnegative, never equal to the real part a in general.
- Angle: compute the reference angle first, then correct using the quadrant of the point.
- Polar to rectangular: a = r cos θ, b = r sin θ — evaluate trig functions before multiplying by r.
- Angles differing by 2π are equivalent; principal angle lives in (−180°, 180°].
- Exam traps: swapping r and a, ignoring quadrant, forgetting that full rotations do not change the point.

*In the next section we will use these forms to perform operations on complex numbers more efficiently.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlY3Rhbmd1bGFyX3ZzX3BvbGFyX21lYW5pbmciLCJsYWJlbCI6IkludGVycHJldGluZyByZWN0YW5ndWxhciBhbmQgcG9sYXIgZGVzY3JpcHRpb25zIG9mIHRoZSBzYW1lIG51bWJlciIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggc3RhdGVtZW50IGNvcnJlY3RseSBjb21wYXJlcyB6ID0gYSArIGpiIGFuZCB6ID0gcmVee2pcXHRoZXRhfT8iLCJvcHRpb25zIjpbIkEuIGEgYW5kIHIgYXJlIGFsd2F5cyB0aGUgc2FtZSBxdWFudGl0eS4iLCJCLiBhICsgamIgZ2l2ZXMgaG9yaXpvbnRhbCBhbmQgdmVydGljYWwgY29vcmRpbmF0ZXMsIHdoaWxlIHJlXntqXFx0aGV0YX0gZ2l2ZXMgZGlzdGFuY2UgYW5kIGFuZ2xlIGZvciB0aGUgc2FtZSBwb2ludC4iLCJDLiByZV57alxcdGhldGF9IGlzIG9ubHkgdmFsaWQgd2hlbiBhIGFuZCBiIGFyZSBib3RoIHBvc2l0aXZlLiIsIkQuIFRoZSBwb2xhciBmb3JtIGNoYW5nZXMgdGhlIGNvbXBsZXggbnVtYmVyIGludG8gYSBkaWZmZXJlbnQgdmFsdWUuIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiUmVjdGFuZ3VsYXIgZm9ybSByZWNvcmRzIHRoZSBjb29yZGluYXRlcyAoYSwgYikuIFBvbGFyIGZvcm0gcmVjb3JkcyB0aGUgc2FtZSBwb2ludCB1c2luZyBtYWduaXR1ZGUgciBhbmQgYW5nbGUgzrguIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiYSBpcyB0aGUgcmVhbCBjb29yZGluYXRlLCB3aGlsZSByIGlzIHRoZSBkaXN0YW5jZSBmcm9tIHRoZSBvcmlnaW47IHRoZXkgYXJlIGdlbmVyYWxseSBkaWZmZXJlbnQuIiwiQyI6IlBvbGFyIGZvcm0gd29ya3MgaW4gZXZlcnkgcXVhZHJhbnQuIiwiRCI6Ikl0IGlzIGp1c3QgYSBkaWZmZXJlbnQgcmVwcmVzZW50YXRpb24gb2YgdGhlIHNhbWUgY29tcGxleCBudW1iZXIuIn0sImhpbnQiOiJBc2sgd2hhdCBlYWNoIHN5bWJvbCBtZWFzdXJlcyBnZW9tZXRyaWNhbGx5LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHogPSAzICsgNGosIHdoaWNoIHBhaXIgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIFJlKHopID0gMyBhbmQgfHp8ID0gNSIsIkIuIFJlKHopID0gNSBhbmQgfHp8ID0gMyIsIkMuIFJlKHopID0gNCBhbmQgfHp8ID0gNyIsIkQuIFJlKHopID0gMyBhbmQgfHp8ID0gNCJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlRoZSByZWFsIHBhcnQgaXMgdGhlIGhvcml6b250YWwgY29vcmRpbmF0ZSAzLCB3aGlsZSB0aGUgbWFnbml0dWRlIGlzIHNxcnQoM8KyICsgNMKyKSA9IHNxcnQoOSArIDE2KSA9IHNxcnQoMjUpID0gNS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGlzIHN3YXBzIHJlYWwgcGFydCBhbmQgbWFnbml0dWRlLiIsIkMiOiI0IGlzIHRoZSBpbWFnaW5hcnkgcGFydCBjb2VmZmljaWVudCwgbm90IHRoZSByZWFsIHBhcnQ7IDcgaXMgbm90IHRoZSBtYWduaXR1ZGUuIiwiRCI6IjQgaXMgbm90IHRoZSBtYWduaXR1ZGUgaGVyZSDigJQgdGhlIG1hZ25pdHVkZSByZXF1aXJlcyBib3RoIGNvb3JkaW5hdGVzIHZpYSB0aGUgUHl0aGFnb3JlYW4gdGhlb3JlbS4ifSwiaGludCI6IlJlYWwgcGFydCBpcyBhIGNvb3JkaW5hdGU7IG1hZ25pdHVkZSBpcyBhIGRpc3RhbmNlIGNvbXB1dGVkIGZyb20gYm90aCBjb29yZGluYXRlcy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InJlY3Rhbmd1bGFyX3RvX3BvbGFyIiwibGFiZWwiOiJDb252ZXJ0aW5nIHJlY3Rhbmd1bGFyIGZvcm0gdG8gcG9sYXIgZm9ybSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV3JpdGUgeiA9IC0yICsgajEgaW4gcG9sYXIgZm9ybSB1c2luZyB0aGUgcHJpbmNpcGFsIGFuZ2xlIGluIGRlZ3JlZXMuIiwib3B0aW9ucyI6WyJBLiBcXHNxcnR7NX1cXCxlXntqMjYuNl5cXGNpcmN9IiwiQi4gXFxzcXJ0ezV9XFwsZV57LWoyNi42XlxcY2lyY30iLCJDLiBcXHNxcnR7NX1cXCxlXntqMTUzLjReXFxjaXJjfSIsIkQuIDJcXCxlXntqMTUzLjReXFxjaXJjfSJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlRoZSBtYWduaXR1ZGUgaXMgc3FydCgoLTIpwrIgKyAxwrIpID0gc3FydCg1KS4gVGhlIHBvaW50IGxpZXMgaW4gcXVhZHJhbnQgSUkgKG5lZ2F0aXZlIHJlYWwgcGFydCwgcG9zaXRpdmUgaW1hZ2luYXJ5IHBhcnQpLCBzbyB0aGUgcHJpbmNpcGFsIGFuZ2xlIGlzIDE4MMKwIOKIkiAyNi42wrAgPSAxNTMuNMKwLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IjI2LjbCsCBpcyBvbmx5IHRoZSByZWZlcmVuY2UgYW5nbGUgYW5kIHdvdWxkIHBsYWNlIHRoZSBwb2ludCBpbiBxdWFkcmFudCBJLCBub3QgcXVhZHJhbnQgSUkuIiwiQiI6IkEgbmVnYXRpdmUgYW5nbGUgb2Yg4oiSMjYuNsKwIHBsYWNlcyB0aGUgcG9pbnQgaW4gcXVhZHJhbnQgSVYuIiwiRCI6IlRoZSBtYWduaXR1ZGUgaXMgc3FydCg1KSDiiYggMi4yMzYsIG5vdCAyLiJ9LCJoaW50IjoiRmlyc3QgZmluZCByIHVzaW5nIHRoZSBQeXRoYWdvcmVhbiB0aGVvcmVtLCB0aGVuIHVzZSB0aGUgcXVhZHJhbnQgdG8gY29ycmVjdCDOuC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoiY29tcGxleF9wbGFuZV9wb2ludF9hbmRfcXVhZHJhbnRzIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AyX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJBIGNhbGN1bGF0b3IgZ2l2ZXMgdGFuXnstMX1cXCFcXGxlZnQoXFx0ZnJhY3stM317LTJ9XFxyaWdodCkgPSA1Ni4zXlxcY2lyYyB3aGVuIGNvbnZlcnRpbmcgeiA9IC0yIC0gajMgdG8gcG9sYXIgZm9ybS4gV2hhdCBpcyB0aGUgY29ycmVjdCBwcmluY2lwYWwgYW5nbGU/Iiwib3B0aW9ucyI6WyJBLiA1Ni4zXlxcY2lyYyIsIkIuIDEyMy43XlxcY2lyYyIsIkMuIC0xMjMuN15cXGNpcmMiLCJELiAtNTYuM15cXGNpcmMiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJUaGUgcG9pbnQgKOKIkjIsIOKIkjMpIGxpZXMgaW4gcXVhZHJhbnQgSUlJLiBUaGUgcHJpbmNpcGFsIGFuZ2xlIGlzIGNob3NlbiBpbiAo4oiSMTgwwrAsIDE4MMKwXSwgc28gdGhlIGNvcnJlY3QgdmFsdWUgaXMg4oiSKDE4MMKwIOKIkiA1Ni4zwrApID0g4oiSMTIzLjfCsC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiI1Ni4zwrAgaXMgdGhlIHJlZmVyZW5jZSBhbmdsZSBpbiBxdWFkcmFudCBJIOKAlCBpdCBkb2VzIG5vdCByZWZsZWN0IHRoZSBhY3R1YWwgbG9jYXRpb24gb2YgdGhlIHBvaW50LiIsIkIiOiIxMjMuN8KwIGxpZXMgaW4gcXVhZHJhbnQgSUksIG5vdCBxdWFkcmFudCBJSUkuIiwiRCI6IuKIkjU2LjPCsCBsaWVzIGluIHF1YWRyYW50IElWLiJ9LCJoaW50IjoiTG9jYXRlIHRoZSBwb2ludCBvbiB0aGUgY29tcGxleCBwbGFuZSBiZWZvcmUgdHJ1c3RpbmcgdGhlIGludmVyc2UgdGFuZ2VudCBvdXRwdXQuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImNvbXBsZXhfcGxhbmVfcXVhZHJhbnRfY2hlY2siLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTMiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkEgc3R1ZGVudCBzYXlzOiAnRm9yIHogPSAtMiArIGoxLCBJIHVzZWQgciA9IC0yIGJlY2F1c2UgdGhlIHJlYWwgcGFydCBpcyAtMi4nIEV4cGxhaW4gcHJlY2lzZWx5IHdoeSB0aGlzIGlzIHdyb25nLCBhbmQgZ2l2ZSB0aGUgY29ycmVjdCBtYWduaXR1ZGUuIiwiaWRlYWxfYW5zd2VyIjoiVGhpcyBpcyB3cm9uZyBiZWNhdXNlIHRoZSByZWFsIHBhcnQgYSBpcyB0aGUgaG9yaXpvbnRhbCBjb29yZGluYXRlIG9mIHRoZSBwb2ludCwgd2hpbGUgdGhlIG1hZ25pdHVkZSByIGlzIHRoZSBkaXN0YW5jZSBmcm9tIHRoZSBvcmlnaW4gdG8gdGhlIHBvaW50LiBEaXN0YW5jZSBpcyBhbHdheXMgbm9ubmVnYXRpdmUuIEZvciB6ID0g4oiSMiArIGoxLCB0aGUgY29ycmVjdCBtYWduaXR1ZGUgaXMgciA9IHNxcnQoKC0yKcKyICsgMcKyKSA9IHNxcnQoNCArIDEpID0gc3FydCg1KS4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IGNsZWFybHkgZGlzdGluZ3Vpc2ggcmVhbCBwYXJ0IGEgZnJvbSBtYWduaXR1ZGUgciIsIk11c3Qgc3RhdGUgdGhhdCBtYWduaXR1ZGUgaXMgYSBkaXN0YW5jZSBhbmQgaXMgYWx3YXlzIG5vbm5lZ2F0aXZlIiwiTXVzdCBjb21wdXRlIHRoZSBjb3JyZWN0IHZhbHVlIHNxcnQoNSkiXSwiZXhwbGFuYXRpb24iOiJUaGlzIHF1ZXN0aW9uIGRpcmVjdGx5IHRlc3RzIHdoZXRoZXIgdGhlIHN0dWRlbnQgdW5kZXJzdGFuZHMgdGhhdCByIGFuZCBhIGFyZSBnZW9tZXRyaWNhbGx5IGRpZmZlcmVudCBxdWFudGl0aWVzIOKAlCBhIGNvbW1vbiBzb3VyY2Ugb2YgZXJyb3JzIGluIHBvbGFyIGNvbnZlcnNpb24uIiwiaGludCI6IkFzayB5b3Vyc2VsZjogd2hhdCBnZW9tZXRyaWMgcXVhbnRpdHkgZG9lcyB0aGUgc3ltYm9sIHIgcmVwcmVzZW50IG9uIHRoZSBjb21wbGV4IHBsYW5lPyIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoicG9sYXJfdG9fcmVjdGFuZ3VsYXIiLCJsYWJlbCI6IkNvbnZlcnRpbmcgcG9sYXIgZm9ybSB0byByZWN0YW5ndWxhciBmb3JtIGFuZCBoYW5kbGluZyBlcXVpdmFsZW50IGFuZ2xlcyIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkNvbnZlcnQgeiA9IDJlXntqXFxwaS8yfSB0byByZWN0YW5ndWxhciBmb3JtLiIsIm9wdGlvbnMiOlsiQS4gMiArIGowIiwiQi4gMCArIGoyIiwiQy4gLTIgKyBqMCIsIkQuIDEgKyBqMSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlVzaW5nIHogPSByKGNvcyDOuCArIGogc2luIM64KSB3aXRoIHIgPSAyIGFuZCDOuCA9IM+ALzI6IHogPSAyKGNvcyjPgC8yKSArIGogc2luKM+ALzIpKSA9IDIoMCArIGrCtzEpID0gajIuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiMiArIGowIGNvcnJlc3BvbmRzIHRvIGFuZ2xlIDAsIG5vdCDPgC8yLiIsIkMiOiLiiJIyICsgajAgY29ycmVzcG9uZHMgdG8gYW5nbGUgz4AuIiwiRCI6IjEgKyBqMSBoYXMgbWFnbml0dWRlIHNxcnQoMiksIG5vdCAyLCBhbmQgZG9lcyBub3QgbWF0Y2ggYW5nbGUgz4AvMi4ifSwiaGludCI6IkV2YWx1YXRlIGNvcyjPgC8yKSBhbmQgc2luKM+ALzIpIGZpcnN0LCB0aGVuIG11bHRpcGx5IGJ5IHIgPSAyLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggZXhwcmVzc2lvbiByZXByZXNlbnRzIHRoZSBzYW1lIGNvbXBsZXggbnVtYmVyIGFzIDJlXntqNFxccGl9PyIsIm9wdGlvbnMiOlsiQS4gMiIsIkIuIC0yIiwiQy4gajIiLCJELiAtajIiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJBbiBhbmdsZSBvZiA0z4AgcmVwcmVzZW50cyBleGFjdGx5IHR3byBmdWxsIHJvdGF0aW9ucyAoMiDDlyAyz4ApLCBzbyB0aGUgZGlyZWN0aW9uIHJldHVybnMgdG8gdGhlIHBvc2l0aXZlIHJlYWwgYXhpcy4gVGhlcmVmb3JlIDJlXihqNM+AKSA9IDIoY29zIDAgKyBqIHNpbiAwKSA9IDIuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoi4oiSMiBjb3JyZXNwb25kcyB0byBhbmdsZSDPgCwgbm90IDTPgC4iLCJDIjoiajIgY29ycmVzcG9uZHMgdG8gYW5nbGUgz4AvMi4iLCJEIjoi4oiSajIgY29ycmVzcG9uZHMgdG8gYW5nbGUg4oiSz4AvMi4ifSwiaGludCI6IkZ1bGwgdHVybnMgKG11bHRpcGxlcyBvZiAyz4ApIGRvIG5vdCBjaGFuZ2UgdGhlIGRpcmVjdGlvbiBvciB0aGUgcG9pbnQuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfV19" style="display:none;"></div>%%KC_END%%
