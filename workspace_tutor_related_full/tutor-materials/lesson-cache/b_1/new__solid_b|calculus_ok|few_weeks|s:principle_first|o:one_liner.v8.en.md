# B.1 Complex Numbers — A Practical Review

> **Section Objective:** Build a confident, exam-ready understanding of complex numbers in rectangular, polar, and exponential form — the foundation for all signal and system analysis that follows.

Complex numbers are not an abstract curiosity. In signals and systems, they are a practical shorthand that makes derivations dramatically shorter, even when every problem starts and ends with real numbers. If you feel a little shaky on them, you are not alone — and this section is a guided review designed to fix that.

By the end of this section you will be able to work fluently with:
- **Rectangular form** z = a + jb and the complex plane
- **Polar and exponential form** using magnitude r and angle θ
- **Conjugates** and their geometric meaning
- **Angle traps** that cost students marks on exams

### EXAM VALUE

Two of the most common exam errors are misidentifying the imaginary part and choosing the wrong quadrant angle. Both are preventable with the right mental model.

> **Core Takeaway:** Complex numbers are a coordinate system for two-dimensional quantities — master the geometry and the algebra follows naturally.

## 1. What a Complex Number Means

A complex number written as **z = a + jb** has two components:

- **a** is the **real part**: Re(z) = a
- **b** is the **imaginary part**: Im(z) = b

### COMMON MISTAKE

Students often say "the imaginary part is jb." This is wrong. The imaginary part is the **coefficient** b — a plain real number. The symbol j is just a marker indicating which axis you are on, not part of the value itself.

Think of the complex plane as a standard x-y coordinate grid:
- The **horizontal axis** carries real values (the a direction)
- The **vertical axis** carries the j-component (the b direction)

The point (a, b) on that grid and the number a + jb are the same object, just written two different ways. Plotting z = 3 + j4 means walking 3 units right and 4 units up — nothing more mysterious than that.

> **Core Takeaway:** Im(z) = b, not jb — the imaginary part is always a real-number coefficient.

![Fig. B.2](/figures/page-005-fig__b_2-1.png)
*Fig. B.2 shows z = a + jb plotted as the point (a, b) on the complex plane, with magnitude r measured from the origin, angle θ measured from the positive real axis, and the conjugate z* = a − jb appearing as the mirror image reflected across the real axis.*

$$z = a + jb, \quad \mathrm{Re}(z)=a, \quad \mathrm{Im}(z)=b$$
*This formula defines rectangular form: a is the horizontal component along the real axis and b is the vertical component along the imaginary axis, keeping the two directions cleanly separated.*

## 2. Rectangular, Polar, and Exponential Forms

The same complex number can be described in two equally valid ways:

- **Rectangular form** (a + jb) tells you: *how far across and how far up*
- **Polar/exponential form** (re^{jθ}) tells you: *how long and at what angle*

The bridge between them comes from basic trigonometry. If the point sits at distance r from the origin at angle θ:

$$a = r\cos\theta \qquad b = r\sin\theta$$

Substituting into z = a + jb gives z = r(cos θ + j sin θ). Euler's famous identity then collapses this into:

$$e^{j\theta} = \cos\theta + j\sin\theta \implies z = re^{j\theta}$$

### WHY THIS MATTERS FOR THE EXAM

Exponential form is the workhorse of signals and systems. Multiplication becomes addition of exponents, differentiation becomes multiplication by jω, and Fourier analysis is built entirely on e^{jθ}. Learning to switch forms fluently now pays dividends throughout the course.

> **Core Takeaway:** Rectangular form gives coordinates; polar/exponential form gives magnitude and angle — same point, three equivalent notations.

$$a = r\cos\theta, \quad b = r\sin\theta, \quad z = r(\cos\theta + j\sin\theta) = re^{j\theta}$$
*These equations convert between coordinate form (a, b) and magnitude-angle form (r, θ) for the same complex number, with Euler's identity linking the trigonometric and exponential representations.*

![unknown](/figures/page-009-unknown-1.png)
*These Argand diagrams show four complex numbers — 2+j3, −2+j1, −2−j3, and 1−j3 — plotted in their respective quadrants, illustrating how the signs of the real and imaginary parts determine the quadrant and therefore the correct angle.*

## 3. Angle Selection, Principal Value, and Conjugates

### THE QUADRANT TRAP

This is the most common source of lost marks. When converting a + jb to polar form, students reach for:

$$\theta = \tan^{-1}\!\left(\frac{b}{a}\right)$$

The calculator returns an angle — but that angle may be **wrong by 180°** if the point is in quadrant II or III. The inverse tangent function cannot distinguish between (a, b) and (−a, −b) because they share the same ratio b/a.

**Always check the signs of a and b first, then adjust:**

| Quadrant | Sign of a | Sign of b | Correction |
|----------|-----------|-----------|------------|
| I | + | + | None |
| II | − | + | Add 180° |
| III | − | − | Subtract 180° |
| IV | + | − | None (angle is negative) |

#### Example

For z = −2 + j1: the calculator gives tan⁻¹(1/2) ≈ 26.6°. But the point is in **quadrant II** (negative real, positive imaginary), so the correct principal angle is 180° − 26.6° = **153.4°**.

### CONJUGATES

The complex conjugate of z = a + jb is:

$$z^* = a - jb$$

Geometrically, this is a **reflection across the real axis** — the real part stays fixed and the imaginary part flips sign. Two useful recognition identities follow directly:

$$\mathrm{Re}(z) = \frac{z + z^*}{2}, \qquad \mathrm{Im}(z) = \frac{z - z^*}{2j}$$

> **Core Takeaway:** Always verify the quadrant before accepting a calculator angle; the conjugate z* is simply z reflected across the real axis.

![Fig. B.5](/figures/page-011-fig__b_5-1.png)
*Fig. B.5 converts several polar-form numbers back to Cartesian form, demonstrating that different angles — including negative angles and angles beyond 360° — can all represent the same point on the complex plane.*

---
**📌 Key Takeaways**
- z = a + jb is rectangular form; z = re^{jθ} is polar/exponential form — same point, different descriptions.
- Always check the quadrant of (a, b) before accepting tan⁻¹(b/a) as the angle.
- The conjugate z* = a − jb is the geometric reflection of z across the real axis.

*With these complex-number tools in hand, the next sections will use them immediately — exponential form is the key that unlocks Fourier analysis, phasor methods, and system frequency response throughout the course.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlYWxfaW1hZ19wYXJ0cyIsImxhYmVsIjoiUmVhbCBwYXJ0LCBpbWFnaW5hcnkgcGFydCwgYW5kIHJlY3Rhbmd1bGFyIGZvcm0iLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciB6ID0gNSAtIDJqLCB3aGljaCBzdGF0ZW1lbnQgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIFJlKHopID0gLTIgYW5kIEltKHopID0gNSIsIkIuIFJlKHopID0gNSBhbmQgSW0oeikgPSAtMiIsIkMuIFJlKHopID0gNSBhbmQgSW0oeikgPSAtMmoiLCJELiBUaGUgcG9pbnQgaXMgcGxvdHRlZCBhdCAoLTIsIDUpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiSW4geiA9IGEgKyBqYiwgdGhlIHJlYWwgcGFydCBpcyBhIGFuZCB0aGUgaW1hZ2luYXJ5IHBhcnQgaXMgdGhlIGNvZWZmaWNpZW50IG9mIGosIHdoaWNoIGlzIGIuIFNvIFJlKHopID0gNSBhbmQgSW0oeikgPSAtMi4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIHN3YXBzIHRoZSByZWFsIGFuZCBpbWFnaW5hcnkgcGFydHMuIiwiQyI6IlRoZSBpbWFnaW5hcnkgcGFydCBpcyB0aGUgY29lZmZpY2llbnQgLTIsIG5vdCB0aGUgdGVybSAtMmouIiwiRCI6IlRoZSBwb2ludCBpcyBwbG90dGVkIGF0ICg1LCAtMiksIG5vdCAoLTIsIDUpLiJ9LCJoaW50IjoiUmVhZCB0aGUgY29lZmZpY2llbnQgb2YgaiBzZXBhcmF0ZWx5IGZyb20gdGhlIHN5bWJvbCBqIGl0c2VsZi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkEgc3R1ZGVudCBzYXlzOiAnVGhlIGltYWdpbmFyeSBwYXJ0IG9mIDMgKyBqNCBpcyBqNC4nIEV4cGxhaW4gcHJlY2lzZWx5IHdoYXQgaXMgd3Jvbmcgd2l0aCB0aGF0IHN0YXRlbWVudC4iLCJpZGVhbF9hbnN3ZXIiOiJUaGUgaW1hZ2luYXJ5IHBhcnQgaXMgdGhlIHJlYWwtbnVtYmVyIGNvZWZmaWNpZW50IG9mIGosIHNvIEltKDMgKyBqNCkgPSA0LiBUaGUgdGVybSBqNCBpcyB0aGUgaW1hZ2luYXJ5IHRlcm0gaW4gdGhlIGV4cHJlc3Npb24sIG5vdCB0aGUgaW1hZ2luYXJ5IHBhcnQgaXRzZWxmLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3Qgc3RhdGUgdGhhdCB0aGUgaW1hZ2luYXJ5IHBhcnQgaXMgNCIsIk11c3QgZGlzdGluZ3Vpc2ggJ2ltYWdpbmFyeSBwYXJ0JyBmcm9tIHRoZSB0ZXJtIGo0IiwiTXVzdCBleHBsYWluIHRoYXQgaiBpcyBhIG1hcmtlciwgbm90IHBhcnQgb2YgdGhlIHBhcnQgdmFsdWUiXSwiZXhwbGFuYXRpb24iOiJUaGlzIGNoZWNrcyB3aGV0aGVyIHRoZSBzdHVkZW50IGtub3dzIHRoZSBmb3JtYWwgZGVmaW5pdGlvbiBpbnN0ZWFkIG9mIGp1c3QgcmVhZGluZyBzeW1ib2xzIGxvb3NlbHkuIiwiaGludCI6IkFzayB3aGF0IEltKHopIGlzIHN1cHBvc2VkIHRvIHJldHVybjogYSBjb2VmZmljaWVudCBvciBhIHRlcm0/IiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJmb3JtX2NvbnZlcnNpb24iLCJsYWJlbCI6IlJlY3Rhbmd1bGFyLCBwb2xhciwgYW5kIGV4cG9uZW50aWFsIGZvcm0iLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGV4cHJlc3Npb24gaXMgZXF1aXZhbGVudCB0byB6ID0gYSArIGpiIHdoZW4gdGhlIG1hZ25pdHVkZSBpcyByIGFuZCBhbmdsZSBpcyB0aGV0YT8iLCJvcHRpb25zIjpbIkEuIHogPSByKGNvcyB0aGV0YSAtIGogc2luIHRoZXRhKSIsIkIuIHogPSByKHNpbiB0aGV0YSArIGogY29zIHRoZXRhKSIsIkMuIHogPSByKGNvcyB0aGV0YSArIGogc2luIHRoZXRhKSIsIkQuIHogPSBlXihyIHRoZXRhKSJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlVzaW5nIGEgPSByIGNvcyB0aGV0YSBhbmQgYiA9IHIgc2luIHRoZXRhLCB3ZSBnZXQgeiA9IGEgKyBqYiA9IHIoY29zIHRoZXRhICsgaiBzaW4gdGhldGEpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBzaWduIG9uIHRoZSBqIHNpbiB0aGV0YSB0ZXJtIGlzIGluY29ycmVjdCBmb3IgdGhlIHN0YW5kYXJkIGZvcm0uIiwiQiI6IkNvc2luZSBhbmQgc2luZSBhcmUgYXNzaWduZWQgdG8gdGhlIHdyb25nIGNvbXBvbmVudHMuIiwiRCI6IlRoaXMgaXMgbm90IHRoZSBleHBvbmVudGlhbCBmb3JtIG9mIGEgY29tcGxleCBudW1iZXIuIn0sImhpbnQiOiJNYXRjaCBob3Jpem9udGFsIHdpdGggY29zaW5lIGFuZCB2ZXJ0aWNhbCB3aXRoIHNpbmUuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBjb21wbGV4IG51bWJlciBoYXMgbWFnbml0dWRlIDUgYW5kIGFuZ2xlIDUzLjEgZGVncmVlcy4gV2hpY2ggZm9ybSBiZXN0IHJlcHJlc2VudHMgaXQ/Iiwib3B0aW9ucyI6WyJBLiA1ZV4oajUzLjEgZGVncmVlcykiLCJCLiA1My4xZV4oajUpIiwiQy4gNShjb3MgNSArIGogc2luIDUpIiwiRC4gZV4oajUzLjEgZGVncmVlcykiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJQb2xhci9leHBvbmVudGlhbCBmb3JtIGlzIHogPSByZV4oaiB0aGV0YSksIHNvIG1hZ25pdHVkZSA1IGFuZCBhbmdsZSA1My4xIGRlZ3JlZXMgZ2l2ZXMgNWVeKGo1My4xIGRlZ3JlZXMpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoaXMgc3dhcHMgdGhlIHJvbGVzIG9mIG1hZ25pdHVkZSBhbmQgYW5nbGUuIiwiQyI6IlRoZSBhbmdsZSB1c2VkIGlzIHdyb25nOyBpdCBzaG91bGQgYmUgNTMuMSBkZWdyZWVzLCBub3QgNS4iLCJEIjoiVGhpcyBoYXMgdW5pdCBtYWduaXR1ZGUsIG5vdCBtYWduaXR1ZGUgNS4ifSwiaGludCI6IkluIHJlXihqIHRoZXRhKSwgciBpcyB0aGUgZGlzdGFuY2UgZnJvbSB0aGUgb3JpZ2luLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoicXVhZHJhbnRfYW5kX3ByaW5jaXBhbF9hbmdsZSIsImxhYmVsIjoiUXVhZHJhbnQtYXdhcmUgYW5nbGUgc2VsZWN0aW9uIGFuZCBwcmluY2lwYWwgdmFsdWUiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoeSBpcyB1c2luZyB0aGV0YSA9IHRhbl4oLTEpKGIvYSkgYnkgaXRzZWxmIHNvbWV0aW1lcyBkYW5nZXJvdXMgd2hlbiBjb252ZXJ0aW5nIGEgKyBqYiB0byBwb2xhciBmb3JtPyIsIm9wdGlvbnMiOlsiQS4gQmVjYXVzZSBtYWduaXR1ZGUgbXVzdCBiZSBmb3VuZCBmaXJzdCIsIkIuIEJlY2F1c2UgdGhlIGNhbGN1bGF0b3IgYW5nbGUgbWF5IGJlIGluIHRoZSB3cm9uZyBxdWFkcmFudCIsIkMuIEJlY2F1c2UgdGFuXigtMSkgb25seSB3b3JrcyBmb3IgcHVyZWx5IGltYWdpbmFyeSBudW1iZXJzIiwiRC4gQmVjYXVzZSB0aGUgYW5nbGUgbXVzdCBhbHdheXMgYmUgcG9zaXRpdmUiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgaW52ZXJzZSB0YW5nZW50IGdpdmVzIGEgcmVmZXJlbmNlIGFuZ2xlLCBidXQgdGhlIGFjdHVhbCBwb2ludCBtYXkgbGllIGluIGEgZGlmZmVyZW50IHF1YWRyYW50IGRlcGVuZGluZyBvbiB0aGUgc2lnbnMgb2YgYSBhbmQgYi4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJNYWduaXR1ZGUgYW5kIGFuZ2xlIGFyZSBzZXBhcmF0ZSBpc3N1ZXM7IHRoaXMgaXMgbm90IHRoZSBtYWluIGRhbmdlci4iLCJDIjoiSW52ZXJzZSB0YW5nZW50IGlzIHdpZGVseSB1c2VkIGZvciBnZW5lcmFsIHJlY3Rhbmd1bGFyLXRvLXBvbGFyIGNvbnZlcnNpb24uIiwiRCI6IkFuZ2xlcyBjYW4gYmUgbmVnYXRpdmU7IHByaW5jaXBhbCB2YWx1ZSBpcyBub3QgYWx3YXlzIHBvc2l0aXZlLiJ9LCJoaW50IjoiQ2hlY2sgdGhlIHNpZ25zIG9mIHRoZSByZWFsIGFuZCBpbWFnaW5hcnkgcGFydHMgYmVmb3JlIHRydXN0aW5nIHRoZSBjYWxjdWxhdG9yLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiVGhlIG51bWJlciB6ID0gLTIgKyBqMSBsaWVzIGluIHdoaWNoIHF1YWRyYW50LCBhbmQgd2hpY2ggcHJpbmNpcGFsIGFuZ2xlIGlzIGFwcHJvcHJpYXRlPyIsIm9wdGlvbnMiOlsiQS4gUXVhZHJhbnQgSSwgYWJvdXQgMjYuNiBkZWdyZWVzIiwiQi4gUXVhZHJhbnQgSUksIGFib3V0IDE1My40IGRlZ3JlZXMiLCJDLiBRdWFkcmFudCBJSUksIGFib3V0IC0xNTMuNCBkZWdyZWVzIiwiRC4gUXVhZHJhbnQgSVYsIGFib3V0IC0yNi42IGRlZ3JlZXMiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJOZWdhdGl2ZSByZWFsIGFuZCBwb3NpdGl2ZSBpbWFnaW5hcnkgbWVhbnMgcXVhZHJhbnQgSUkuIFRoZSByZWZlcmVuY2UgYW5nbGUgaXMgYXJjdGFuKDEvMikg4omIIDI2LjYgZGVncmVlcywgc28gdGhlIHByaW5jaXBhbCBhbmdsZSBpcyAxODAgLSAyNi42ID0gMTUzLjQgZGVncmVlcy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJRdWFkcmFudCBJIHdvdWxkIHJlcXVpcmUgYm90aCBwYXJ0cyB0byBiZSBwb3NpdGl2ZS4iLCJDIjoiUXVhZHJhbnQgSUlJIHdvdWxkIHJlcXVpcmUgYm90aCBwYXJ0cyB0byBiZSBuZWdhdGl2ZS4iLCJEIjoiUXVhZHJhbnQgSVYgd291bGQgcmVxdWlyZSBwb3NpdGl2ZSByZWFsIGFuZCBuZWdhdGl2ZSBpbWFnaW5hcnkuIn0sImhpbnQiOiJQbG90IHRoZSBzaWducyBmaXJzdCwgdGhlbiBhZGp1c3QgdGhlIHJlZmVyZW5jZSBhbmdsZSBiYXNlZCBvbiB0aGUgcXVhZHJhbnQuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6InB5dGhvbl9tYXRwbG90bGliIGNvbXBsZXgtcGxhbmUgcG9pbnQgaW4gcXVhZHJhbnQgSUkgd2l0aCBhbmdsZSBmcm9tIHBvc2l0aXZlIHJlYWwgYXhpcyIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiY29uanVnYXRlX2FuZF9nZW9tZXRyeSIsImxhYmVsIjoiQ29tcGxleCBjb25qdWdhdGUgYXMgZ2VvbWV0cmljIHJlZmxlY3Rpb24iLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3A0X3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJZiB6ID0gYSArIGpiLCB3aGF0IGlzIGl0cyBjb21wbGV4IGNvbmp1Z2F0ZSBhbmQgd2hhdCBkb2VzIGl0IGRvIGdlb21ldHJpY2FsbHk/Iiwib3B0aW9ucyI6WyJBLiB6KiA9IC1hIC0gamI7IHJlZmxlY3Rpb24gYWNyb3NzIHRoZSBvcmlnaW4iLCJCLiB6KiA9IGEgLSBqYjsgcmVmbGVjdGlvbiBhY3Jvc3MgdGhlIHJlYWwgYXhpcyIsIkMuIHoqID0gLWEgKyBqYjsgcmVmbGVjdGlvbiBhY3Jvc3MgdGhlIGltYWdpbmFyeSBheGlzIiwiRC4geiogPSBhICsgamI7IG5vIGdlb21ldHJpYyBjaGFuZ2UiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgY29uanVnYXRlIGNoYW5nZXMgdGhlIHNpZ24gb2YgdGhlIGltYWdpbmFyeSBjb21wb25lbnQgd2hpbGUga2VlcGluZyB0aGUgcmVhbCBjb21wb25lbnQgdGhlIHNhbWUsIHNvIGl0IHJlZmxlY3RzIHRoZSBwb2ludCBhY3Jvc3MgdGhlIHJlYWwgYXhpcy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGF0IGNoYW5nZXMgYm90aCBwYXJ0cyBhbmQgY29ycmVzcG9uZHMgdG8gcmVmbGVjdGlvbiB0aHJvdWdoIHRoZSBvcmlnaW4uIiwiQyI6IlRoYXQgY2hhbmdlcyB0aGUgcmVhbCBwYXJ0LCBub3QgdGhlIGltYWdpbmFyeSBwYXJ0LiIsIkQiOiJUaGUgY29uanVnYXRlIGlzIGdlbmVyYWxseSBkaWZmZXJlbnQgdW5sZXNzIHRoZSBpbWFnaW5hcnkgcGFydCBpcyB6ZXJvLiJ9LCJoaW50IjoiT25seSBvbmUgY29vcmRpbmF0ZSBjaGFuZ2VzIHNpZ24gaW4gdGhlIGNvbmp1Z2F0ZSBvcGVyYXRpb24uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfV19" style="display:none;"></div>%%KC_END%%
