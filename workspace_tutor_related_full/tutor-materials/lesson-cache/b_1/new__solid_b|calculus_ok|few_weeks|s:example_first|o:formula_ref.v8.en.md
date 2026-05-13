# B.1 Complex Numbers — Rectangular and Polar Form

> **Section Objective:** Master the three core skills — reading a complex number in rectangular form, converting to polar form, and handling angles and conjugates correctly — so you never lose points on these in an exam.

---

Start with a concrete number: **z = 3 + 4j**. This is not just an algebraic expression — it is a point sitting at position (3, 4) on a two-dimensional plane. The number 3 tells you how far to go horizontally (the real part), and 4 tells you how far to go vertically (the imaginary part). The symbol **j** is simply a marker that says "this component lives on the vertical axis."

This section builds three skills you will use throughout signals and systems:
1. Reading **a + jb** — identifying real part, imaginary part, and conjugate.
2. Converting to **polar form re^{jθ}** — finding magnitude and angle.
3. Getting the **quadrant right** — a calculator alone will mislead you.

### EXAM WARNING

Two of the most common point-loss mistakes: writing Im(z) = 4j instead of 4, and picking the wrong quadrant angle. Both are addressed directly in this section.

---

> **Formula Reference**
>
> z = a + jb
>
> Re(z) = a
>
> Im(z) = b

![Fig. B.2](/figures/page-005-fig__b_2-1.png)
*A complex number z = a + jb can be read as coordinates (a, b) on the plane, or equivalently described by its magnitude r and angle θ from the positive real axis; the point z* = a − jb is the mirror reflection of z across the real axis and is called the complex conjugate.*

## 1. Reading a Complex Number on the Complex Plane

Take **z = 3 + 4j** again. On the complex plane, the horizontal axis carries the real part and the vertical axis carries the imaginary part. So z = 3 + 4j is simply the point **(3, 4)** — go 3 units right, 4 units up.

In general, for **z = a + jb**:
- The **real part** Re(z) = a is the horizontal coordinate.
- The **imaginary part** Im(z) = b is the vertical coordinate — it is a plain real number, not a term with j attached.

### COMMON MISTAKE

For z = 3 + 4j, Im(z) = **4**, not 4j. The imaginary part is the *coefficient* of j, not the full term. This distinction is tested directly on exams.

**Conjugate:** The figure above shows z* = a − jb as the reflection of z across the real axis. Only the sign of the vertical component flips. For z = 3 + 4j, the conjugate is z* = 3 − 4j.

---

> **Formula Reference**
>
> z = a + jb
>
> Re(z) = a
>
> Im(z) = b
>
> z* = a − jb

$$z = a + jb = r(\cos\theta + j\sin\theta), \qquad a = r\cos\theta, \quad b = r\sin\theta$$
*The same complex number can be described in two equivalent ways: by its rectangular coordinates (a, b), or by its distance from the origin r and the angle θ it makes with the positive real axis. These equations are the bridge between the two descriptions — given r and θ you can recover a and b, and vice versa.*

![unknown](/figures/page-009-unknown-1.png)
*These Argand diagrams illustrate why finding the angle is not as simple as computing tan⁻¹(b/a) on a calculator — you must first locate the point in the correct quadrant and then assign the principal angle accordingly, as the four examples (2+j3, −2+j1, −2−j3, and 1−j3) each demonstrate.*

## 2. Converting Between Cartesian and Polar Form

**Worked example first:** Take **z = −2 + j1**.

**Step 1 — Magnitude:**

r = √((-2)² + 1²) = √(4 + 1) = **√5 ≈ 2.236**

**Step 2 — Angle (careful here):**

A calculator gives tan⁻¹(1 / −2) ≈ −26.6°. But that is only the *reference angle*. The point (−2, 1) sits in **quadrant II** (negative real, positive imaginary). The correct principal angle is:

θ = 180° − 26.6° = **153.4°**

So z = √5 · e^{j153.4°}.

### GENERAL PROCEDURE

1. Compute r = √(a² + b²).
2. Find the reference angle: α = tan⁻¹(|b| / |a|).
3. Use the signs of a and b to place the point in the correct quadrant, then adjust α accordingly.
4. Express the result as z = re^{jθ}.

### EXAM TIP

Exam answers typically use the **principal value** of θ, meaning θ ∈ (−180°, 180°]. Angles differing by multiples of 360° (or 2π) describe the same point, but always report the principal value unless told otherwise.

---

> **Formula Reference**
>
> r = √(a² + b²)
>
> θ = arg z  (principal value in (−180°, 180°])
>
> z = re^{jθ}

![Fig. B.5](/figures/page-011-fig__b_5-1.png)
*These examples go in the reverse direction — from polar (exponential) form back to Cartesian form — and demonstrate that positive angles, negative angles, and angles that differ by full 360° rotations all describe the same point on the complex plane.*

## 3. Exponential Form and Useful Identities

**Start concrete:** Where is **j** on the complex plane? It is the point (0, 1) — straight up on the imaginary axis, exactly 90° from the positive real axis. Its magnitude is 1 and its angle is π/2. So:

j = e^{jπ/2}

This is just Euler's formula applied to θ = π/2: e^{jθ} = cos θ + j sin θ.

**Euler's formula** is the key that connects exponential form to rectangular form:

e^{jθ} = cos θ + j sin θ

Applying this to the four unit-circle landmarks gives the standard identities:

### KEY IDENTITIES

| Number | Angle | Exponential Form |
|--------|-------|------------------|
| 1 | 0 + 2πn | e^{j(2πn)} |
| −1 | π + 2πn | e^{j(π + 2πn)} |
| j | π/2 + 2πn | e^{j(π/2 + 2πn)} |
| −j | −π/2 + 2πn | e^{j(−π/2 + 2πn)} |

where n is any integer.

### KEY INSIGHT

Angles are only determined **up to integer multiples of 2π**. Adding or subtracting full rotations lands you back at the same point. This is why the identities above include the 2πn term.

---

> **Formula Reference**
>
> Euler's formula: e^{jθ} = cos θ + j sin θ
>
> 1 = e^{j·2πn}
>
> −1 = e^{j(π + 2πn)}
>
> j = e^{j(π/2 + 2πn)}
>
> −j = e^{j(−π/2 + 2πn)}
>
> (n = any integer)

---
**📌 Key Takeaways**
- z = a + jb maps to point (a, b); Im(z) is the coefficient b, never the term jb.
- Convert to polar form by computing r = √(a²+b²) and placing θ in the correct quadrant.
- Angles differing by 2π are equivalent; always report the principal value on exams.

*In the next section we will build on this complex-number review for later signals-and-systems methods.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlY3Rhbmd1bGFyX3BhcnRzX2FuZF9jb25qdWdhdGUiLCJsYWJlbCI6IlJlYWQgcmVhbCBwYXJ0LCBpbWFnaW5hcnkgcGFydCwgYW5kIGNvbmp1Z2F0ZSBmcm9tIGEgKyBqYiIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHogPSA1IC0gMmosIHdoaWNoIHN0YXRlbWVudCBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gUmUoeikgPSAtMiBhbmQgSW0oeikgPSA1IiwiQi4gUmUoeikgPSA1IGFuZCBJbSh6KSA9IC0yIiwiQy4gUmUoeikgPSA1IGFuZCBJbSh6KSA9IC0yaiIsIkQuIHoqID0gLTUgKyAyaiJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkluIHogPSBhICsgamIsIHRoZSByZWFsIHBhcnQgaXMgdGhlIGNvZWZmaWNpZW50IHdpdGhvdXQgaiwgYW5kIHRoZSBpbWFnaW5hcnkgcGFydCBpcyB0aGUgcmVhbC1udW1iZXIgY29lZmZpY2llbnQgb2Ygai4gU28gUmUoeikgPSA1IGFuZCBJbSh6KSA9IC0yLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgc3dhcHMgdGhlIHJlYWwgYW5kIGltYWdpbmFyeSBjb21wb25lbnRzLiIsIkMiOiJUaGUgaW1hZ2luYXJ5IHBhcnQgaXMgdGhlIGNvZWZmaWNpZW50IC0yLCBub3QgdGhlIGZ1bGwgdGVybSAtMmouIiwiRCI6IlRoZSBjb25qdWdhdGUgY2hhbmdlcyBvbmx5IHRoZSBzaWduIG9mIHRoZSBqLXRlcm0sIHNvIHoqID0gNSArIDJqLiJ9LCJoaW50IjoiUmVhZCB6ID0gYSArIGpiIGJ5IHNlcGFyYXRpbmcgdGhlIHBsYWluIG51bWJlciBmcm9tIHRoZSBqLWNvZWZmaWNpZW50LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSWYgeiA9IGEgKyBqYiwgd2hpY2ggcG9pbnQgYW5kIGNvbmp1Z2F0ZSBwYWlyIGlzIGNvcnJlY3Qgb24gdGhlIGNvbXBsZXggcGxhbmU/Iiwib3B0aW9ucyI6WyJBLiB6IGlzIGF0IChiLCBhKSwgYW5kIHoqID0gKC1hLCBiKSIsIkIuIHogaXMgYXQgKGEsIGIpLCBhbmQgeiogPSAoYSwgLWIpIiwiQy4geiBpcyBhdCAoYSwgLWIpLCBhbmQgeiogPSAoYSwgYikiLCJELiB6IGlzIGF0ICgtYSwgYiksIGFuZCB6KiA9IChiLCAtYSkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJBIGNvbXBsZXggbnVtYmVyIHogPSBhICsgamIgbWFwcyB0byB0aGUgcG9pbnQgKGEsIGIpLCBhbmQgY29uanVnYXRpb24gcmVmbGVjdHMgYWNyb3NzIHRoZSByZWFsIGF4aXMsIHByb2R1Y2luZyAoYSwgLWIpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6Ikl0IHN3YXBzIGNvb3JkaW5hdGVzIGFuZCBnaXZlcyB0aGUgd3JvbmcgcmVmbGVjdGlvbi4iLCJDIjoiVGhpcyBwbGFjZXMgeiBpdHNlbGYgYmVsb3cgdGhlIGF4aXMgd2hlbiBiIGlzIHBvc2l0aXZlLiIsIkQiOiJCb3RoIHRoZSBwb2ludCBhbmQgY29uanVnYXRlIGFyZSBtaXNtYXRjaGVkLiJ9LCJoaW50IjoiQ29uanVnYXRpb24ga2VlcHMgdGhlIHJlYWwgY29vcmRpbmF0ZSBhbmQgZmxpcHMgdGhlIHNpZ24gb2YgdGhlIHZlcnRpY2FsIGNvb3JkaW5hdGUuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImNvbXBsZXhfcGxhbmVfcG9pbnRfYW5kX3JlZmxlY3Rpb24iLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImNhcnRlc2lhbl90b19wb2xhciIsImxhYmVsIjoiQ29udmVydCBmcm9tIENhcnRlc2lhbiBmb3JtIHRvIHBvbGFyL2V4cG9uZW50aWFsIGZvcm0iLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGV4cG9uZW50aWFsIGZvcm0gaXMgY29ycmVjdCBmb3IgeiA9IC0yICsgajEgdXNpbmcgdGhlIHByaW5jaXBhbCBhbmdsZSBpbiBkZWdyZWVzPyIsIm9wdGlvbnMiOlsiQS4gXFxzcXJ0ezV9ZV57ajI2LjZeXFxjaXJjfSIsIkIuIFxcc3FydHs1fWVeey1qMjYuNl5cXGNpcmN9IiwiQy4gXFxzcXJ0ezV9ZV57ajE1My40XlxcY2lyY30iLCJELiA1ZV57ajE1My40XlxcY2lyY30iXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJUaGUgbWFnbml0dWRlIGlzIFxcc3FydHsoLTIpXjIrMV4yfT1cXHNxcnR7NX0uIFRoZSBwb2ludCBsaWVzIGluIHF1YWRyYW50IElJLCBzbyB0aGUgcHJpbmNpcGFsIGFuZ2xlIGlzIDE1My40IGRlZ3JlZXMsIG5vdCAyNi42IGRlZ3JlZXMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiMjYuNiBkZWdyZWVzIGlzIG9ubHkgdGhlIHJlZmVyZW5jZSBhbmdsZTsgaXQgaWdub3JlcyB0aGUgcXVhZHJhbnQuIiwiQiI6IlRoaXMgcG9pbnRzIGludG8gcXVhZHJhbnQgSVYsIG5vdCBxdWFkcmFudCBJSS4iLCJEIjoiVGhlIG1hZ25pdHVkZSBpcyBcXHNxcnR7NX0sIG5vdCA1LiJ9LCJoaW50IjoiQ2hlY2sgYm90aCB0aGUgbWFnbml0dWRlIGFuZCB0aGUgcXVhZHJhbnQgYmVmb3JlIGNob29zaW5nIHRoZSBhbmdsZS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoiY29tcGxleF9wbGFuZV9xdWFkcmFudF9hbmdsZSIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHogPSAtMiAtIGozLCBhIGNhbGN1bGF0b3IgZ2l2ZXMgdGFuXnstMX0oKC0zKS8oLTIpKSA9IDU2LjNeXFxjaXJjLiBXaGF0IGlzIHRoZSBiZXN0IHByaW5jaXBhbCBhbmdsZT8iLCJvcHRpb25zIjpbIkEuIDU2LjNeXFxjaXJjIiwiQi4gMTIzLjdeXFxjaXJjIiwiQy4gLTEyMy43XlxcY2lyYyIsIkQuIC01Ni4zXlxcY2lyYyJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlRoZSBwb2ludCAoLTIsIC0zKSBsaWVzIGluIHF1YWRyYW50IElJSS4gQW4gYW5nbGUgb2YgNTYuMyBkZWdyZWVzIG11c3QgYmUgc2hpZnRlZCBieSAxODAgZGVncmVlcyB0byBsYW5kIGluIHRoZSBjb3JyZWN0IHF1YWRyYW50LCBnaXZpbmcgMjM2LjMgZGVncmVlcyBvciBlcXVpdmFsZW50bHkgLTEyMy43IGRlZ3JlZXMuIFRoZSBwcmluY2lwYWwgdmFsdWUgaXMgdXN1YWxseSB0YWtlbiBpbiAoLTE4MF5cXGNpcmMsIDE4MF5cXGNpcmNdLCBzbyAtMTIzLjdeXFxjaXJjIGlzIHByZWZlcnJlZC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIGlzIHRoZSByZWZlcmVuY2UgYW5nbGUgb25seSBhbmQgcG9pbnRzIHRvIHF1YWRyYW50IEkuIiwiQiI6IjEyMy43IGRlZ3JlZXMgcG9pbnRzIHRvIHF1YWRyYW50IElJLCBub3QgSUlJLiIsIkQiOiJUaGlzIHBvaW50cyB0byBxdWFkcmFudCBJViwgbm90IElJSS4ifSwiaGludCI6IlVzZSB0aGUgc2lnbnMgb2YgYm90aCBjb29yZGluYXRlcyB0byBpZGVudGlmeSB0aGUgcXVhZHJhbnQgZmlyc3QuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImNvbXBsZXhfcGxhbmVfcXVhZHJhbnRfYW5nbGUiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InBvbGFyX3RvX2NhcnRlc2lhbl9hbmRfZXVsZXJfaWRlbnRpdGllcyIsImxhYmVsIjoiVXNlIEV1bGVyJ3MgZm9ybXVsYSBhbmQgaW50ZXJwcmV0IGV4cG9uZW50aWFsLWZvcm0gaWRlbnRpdGllcyIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHN0YXRlbWVudCBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gaiA9IGVee2owfSIsIkIuIC0xID0gZV57aihcXHBpICsgMlxccGkgbil9IGZvciBpbnRlZ2VyIG4iLCJDLiAxID0gZV57aihcXHBpLzIgKyAyXFxwaSBuKX0gZm9yIGludGVnZXIgbiIsIkQuIC1qID0gZV57aihcXHBpICsgMlxccGkgbil9IGZvciBpbnRlZ2VyIG4iXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgcG9pbnQgLTEgbGllcyBvbiB0aGUgbmVnYXRpdmUgcmVhbCBheGlzLCB3aG9zZSBhbmdsZSBpcyBcXHBpIHBsdXMgYW55IGludGVnZXIgbXVsdGlwbGUgb2YgMlxccGkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiZV57ajB9ID0gMSwgbm90IGouIiwiQyI6ImVee2ooXFxwaS8yICsgMlxccGkgbil9ID0gaiwgbm90IDEuIiwiRCI6Ii1qIGlzIGF0IGFuZ2xlIC1cXHBpLzIgb3IgM1xccGkvMiwgbm90IFxccGkuIn0sImhpbnQiOiJNYXRjaCBlYWNoIG51bWJlciB0byBpdHMgbG9jYXRpb24gb24gdGhlIHVuaXQgY2lyY2xlLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IldyaXRlIDJlXnstalxccGkvM30gaW4gQ2FydGVzaWFuIGZvcm0uIiwiaWRlYWxfYW5zd2VyIjoiMmVeey1qXFxwaS8zfSA9IDIoXFxjb3MoLVxccGkvMykgKyBqXFxzaW4oLVxccGkvMykpID0gMigxLzIgLSBqXFxzcXJ0ezN9LzIpID0gMSAtIGpcXHNxcnR7M30uIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCB1c2UgRXVsZXIncyBmb3JtdWxhIG9yIGVxdWl2YWxlbnQgY29zaW5lLXNpbmUgZXhwYW5zaW9uIiwiTXVzdCBjb3JyZWN0bHkgZXZhbHVhdGUgY29zKC1cXHBpLzMpID0gMS8yIGFuZCBzaW4oLVxccGkvMykgPSAtXFxzcXJ0ezN9LzIiLCJNdXN0IHNpbXBsaWZ5IHRvIDEgLSBqXFxzcXJ0ezN9Il0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCBjYW4gbW92ZSBmcm9tIHBvbGFyL2V4cG9uZW50aWFsIGZvcm0gYmFjayB0byBDYXJ0ZXNpYW4gZm9ybSwgbm90IGp1c3QgcmVjb2duaXplIGlkZW50aXRpZXMuIiwiaGludCI6IkV4cGFuZCBlXntqXFx0aGV0YX0gYXMgY29zXFx0aGV0YSArIGogc2luXFx0aGV0YSBmaXJzdC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3AzX3EzIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCB0d28gZXhwb25lbnRpYWwgZXhwcmVzc2lvbnMgcmVwcmVzZW50IHRoZSBzYW1lIGNvbXBsZXggbnVtYmVyPyIsIm9wdGlvbnMiOlsiQS4gZV57alxccGkvNH0gYW5kIGVee2o1XFxwaS80fSIsIkIuIGVeey1qXFxwaS8yfSBhbmQgZV57ajNcXHBpLzJ9IiwiQy4gZV57alxccGl9IGFuZCBlXntqMH0iLCJELiBlXntqXFxwaS8zfSBhbmQgZV57LWpcXHBpLzN9Il0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiQW5nbGVzIHRoYXQgZGlmZmVyIGJ5IDJcXHBpIHJlcHJlc2VudCB0aGUgc2FtZSBwb2ludC4gLVxccGkvMiBhbmQgM1xccGkvMiBkaWZmZXIgYnkgMlxccGksIHNvIHRoZXkgYXJlIGVxdWl2YWxlbnQuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlc2UgZGlmZmVyIGJ5IFxccGksIHNvIHRoZXkgcG9pbnQgaW4gb3Bwb3NpdGUgZGlyZWN0aW9ucy4iLCJDIjoiZV57alxccGl9ID0gLTEgd2hpbGUgZV57ajB9ID0gMS4iLCJEIjoiVGhlc2UgYXJlIHJlZmxlY3Rpb25zIGFjcm9zcyB0aGUgcmVhbCBheGlzLCBub3QgdGhlIHNhbWUgcG9pbnQgdW5sZXNzIHRoZSBhbmdsZSBpcyAwIG9yIFxccGkuIn0sImhpbnQiOiJDaGVjayB3aGV0aGVyIHRoZSB0d28gYW5nbGVzIGRpZmZlciBieSBhbiBpbnRlZ2VyIG11bHRpcGxlIG9mIDJcXHBpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfV19" style="display:none;"></div>%%KC_END%%
