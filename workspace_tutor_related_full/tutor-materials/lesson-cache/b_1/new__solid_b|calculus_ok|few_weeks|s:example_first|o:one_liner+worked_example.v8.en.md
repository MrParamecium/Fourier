# B.1 Complex Numbers — A Review

> **Objective:** Learn to read, convert, and work with complex numbers in rectangular, polar, and exponential form — skills that appear constantly in signals and systems.

---

Start with a concrete example: **z = 3 + j4** means 3 units along the real (horizontal) axis and 4 units along the imaginary (vertical) axis. That's it — a point on a 2D plane.

This section reviews how complex numbers are represented and why signals-and-systems relies on them so heavily. Even when a final answer is a real number, complex arithmetic is often the fastest path to get there.

If complex numbers feel shaky, relax — this is a review, not new territory.

**You will learn:** rectangular form, polar and exponential form, magnitude, angle, conjugate, and key identities.

### EXAM VALUE

Exam questions routinely test reading the complex plane, converting between forms, and selecting the correct angle by quadrant.

> **Core takeaway:** A complex number is simply a 2D point — two numbers, two forms, one idea.

![Fig. B.2](/figures/page-005-fig__b_2-1.png)
*Fig. B.2 captures everything at once: the rectangular coordinates (a, b), the magnitude r, the angle θ, and the conjugate z* = a − jb as a mirror reflection across the real axis.*

## 1. Reading a Complex Number on the Complex Plane

Back to our example: **z = 3 + j4**. The number 3 is the horizontal coordinate; 4 is the vertical coordinate. In general, for **z = a + jb**:

- **Re(z) = a** — the real part (horizontal)
- **Im(z) = b** — the imaginary part (vertical)

### COMMON MISTAKE

The imaginary part of z = 3 + j4 is **4**, not **4j**. The imaginary part is the real-valued coefficient of j, never the term itself.

Every complex number is a coordinate pair **(a, b)** — a single point on the complex plane.

**The conjugate** z\* = a − jb is that same point reflected across the real axis. Only the sign of the vertical coordinate flips.

---

#### Fully Worked Example

Let **z = −2 + j1**:

| Property | Value |
|---|---|
| Real part Re(z) | −2 |
| Imaginary part Im(z) | 1 |
| Plotted point | (−2, 1) — second quadrant |
| Conjugate z\* | −2 − j1 |

The conjugate simply moves the point from (−2, 1) to (−2, −1) — straight down across the real axis.

$$z = a + jb, \qquad \mathrm{Re}\,z = a, \qquad \mathrm{Im}\,z = b$$
*Rectangular form records a complex number by its horizontal coordinate a and its vertical coordinate b — exactly like a grid address on the complex plane.*

## 2. Converting Rectangular Form to Polar/Exponential Form

#### Worked Example: Convert z = 1 − j3

**Step 1 — Magnitude:**

r = √(1² + (−3)²) = √(1 + 9) = **√10 ≈ 3.162**

**Step 2 — Angle (with quadrant check):**

The real part is positive (+1) and the imaginary part is negative (−3), so the point sits in the **fourth quadrant**. The reference angle from the calculator is:

arctan(3/1) = 71.6°

Because the point is in the fourth quadrant, the principal angle is **−71.6°**.

**Result:** z = √10 · e^(−j71.6°)

---

The general rules connecting the two forms are:

a = r cos θ, b = r sin θ

so z = a + jb = r(cos θ + j sin θ) = **re^(jθ)**

The last step uses **Euler's formula**: e^(jθ) is simply a compact shorthand for cos θ + j sin θ — it encodes both coordinates in one expression.

### EXAM TRAP

A raw arctan output always lands in the first or fourth quadrant. If your point is in the second or third quadrant, you **must** add or subtract 180° to correct the angle. Always check the signs of a and b before trusting the calculator.

> **Core takeaway:** Compute magnitude with the Pythagorean formula, then fix the angle using the quadrant — never skip the quadrant check.

$$a = r\cos\theta, \qquad b = r\sin\theta, \qquad z = a + jb = r(\cos\theta + j\sin\theta) = re^{j\theta}$$
*This single line shows the same complex number written three equivalent ways: rectangular form on the left, polar (trigonometric) form in the middle, and compact exponential form on the right.*

![unknown](/figures/page-009-unknown-1.png)
*These Argand diagrams show four complex numbers in different quadrants — a direct reminder that the calculator's arctangent output must always be corrected to match the actual quadrant of the point.*

## 3. Useful Identities and When Each Form Is Convenient

#### Special Unit-Circle Points

Four numbers sit on the unit circle (r = 1) at clean angles:

| Number | Exponential form |
|---|---|
| 1 | e^(j·2πn) |
| −1 | e^(j(π + 2πn)) |
| j | e^(j(π/2 + 2πn)) |
| −j | e^(j(−π/2 + 2πn)) |

for any integer n. The key idea: **angles are only determined up to integer multiples of 2π** — rotating a full circle lands you back at the same point. This periodicity appears constantly in signals-and-systems derivations.

---

### PRACTICAL RULE

- **Addition and subtraction** → use **Cartesian form** (combine real parts, combine imaginary parts separately)
- **Magnitude and angle reasoning** → use **polar/exponential form**

#### Worked Example — Addition in Cartesian Form

Let z₁ = 3 + j4 and z₂ = 2 + j3:

z₁ + z₂ = (3 + 2) + j(4 + 3) = **5 + j7**

Simple. Trying to add in polar form would require converting back anyway.

> **Core takeaway:** Pick the form that matches the task — Cartesian for adding, polar for scaling and rotating.

![Fig. B.3](/figures/page-007-fig__b_3-1.png)
*Fig. B.3 places 1, −1, j, and −j on the unit circle, showing exactly which angle each special exponential e^(jθ) corresponds to.*

---
**📌 Key Takeaways**
- z = a + jb means a horizontal, b vertical; Im(z) = b, never bj.
- Convert to polar with r = √(a²+b²) and θ corrected to the right quadrant.
- Use Cartesian form for addition; use polar/exponential for magnitude-angle work.

*In the next section we will build on these representations to use complex numbers more fluently.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlY3Rhbmd1bGFyX2ludGVycHJldGF0aW9uIiwibGFiZWwiOiJSZWN0YW5ndWxhciBmb3JtLCByZWFsIHBhcnQsIGltYWdpbmFyeSBwYXJ0LCBhbmQgY29uanVnYXRlIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeiA9IC0yICsgajUsIHdoaWNoIHN0YXRlbWVudCBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gUmUoeikgPSAtMiBhbmQgSW0oeikgPSA1IiwiQi4gUmUoeikgPSAtMiBhbmQgSW0oeikgPSA1aiIsIkMuIFJlKHopID0gMiBhbmQgSW0oeikgPSA1IiwiRC4geiogPSAtMiArIGo1Il0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGhlIHJlYWwgcGFydCBpcyB0aGUgaG9yaXpvbnRhbCBjb29yZGluYXRlIC0yIGFuZCB0aGUgaW1hZ2luYXJ5IHBhcnQgaXMgdGhlIGNvZWZmaWNpZW50IG9mIGosIHdoaWNoIGlzIDUuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiNWogaXMgdGhlIGltYWdpbmFyeSB0ZXJtIGluIHRoZSBleHByZXNzaW9uLCBub3QgdGhlIGltYWdpbmFyeSBwYXJ0IGl0c2VsZi4iLCJDIjoiVGhlIHJlYWwgcGFydCBrZWVwcyBpdHMgc2lnbjsgaXQgaXMgLTIsIG5vdCAyLiIsIkQiOiJUaGUgY29uanVnYXRlIGNoYW5nZXMgdGhlIHNpZ24gb2YgdGhlIGltYWdpbmFyeSB0ZXJtLCBzbyB6KiA9IC0yIC0gajUuIn0sImhpbnQiOiJTZXBhcmF0ZSB0aGUgY29lZmZpY2llbnQgZnJvbSB0aGUgc3ltYm9sIGouIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJZiB6ID0gYSArIGpiLCB3aGF0IGlzIGl0cyBjb21wbGV4IGNvbmp1Z2F0ZT8iLCJvcHRpb25zIjpbIkEuIGEgLSBqYiIsIkIuIC1hICsgamIiLCJDLiAtYSAtIGpiIiwiRC4gYiArIGphIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGhlIGNvbmp1Z2F0ZSByZWZsZWN0cyB0aGUgcG9pbnQgYWNyb3NzIHRoZSByZWFsIGF4aXMsIHNvIG9ubHkgdGhlIHNpZ24gb2YgdGhlIGltYWdpbmFyeSB0ZXJtIGNoYW5nZXMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhlIHJlYWwgcGFydCBkb2VzIG5vdCBjaGFuZ2UgdW5kZXIgY29uanVnYXRpb24uIiwiQyI6Ik9ubHkgdGhlIGltYWdpbmFyeSBzaWduIGNoYW5nZXMsIG5vdCBib3RoIHNpZ25zLiIsIkQiOiJUaGlzIHN3YXBzIHRoZSBjb29yZGluYXRlcywgd2hpY2ggaXMgdW5yZWxhdGVkIHRvIGNvbmp1Z2F0aW9uLiJ9LCJoaW50IjoiVGhpbmsgb2YgYSBtaXJyb3IgYWNyb3NzIHRoZSBob3Jpem9udGFsIGF4aXMuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImNvbXBsZXhfcGxhbmVfY29uanVnYXRlX3JlZmxlY3Rpb24iLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InJlY3Rhbmd1bGFyX3RvX3BvbGFyIiwibGFiZWwiOiJNYWduaXR1ZGUgYW5kIGFuZ2xlIGZyb20gcmVjdGFuZ3VsYXIgZm9ybSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV3JpdGUgeiA9IDEgLSBqMyBpbiBwb2xhci9leHBvbmVudGlhbCBmb3JtIHVzaW5nIHRoZSBwcmluY2lwYWwgYW5nbGUuIiwib3B0aW9ucyI6WyJBLiBcXHNxcnR7MTB9ZV57ajcxLjZeXFxjaXJjfSIsIkIuIFxcc3FydHsxMH1lXnstajcxLjZeXFxjaXJjfSIsIkMuIDEwZV57LWo3MS42XlxcY2lyY30iLCJELiBcXHNxcnR7MTB9ZV57LWoxOC40XlxcY2lyY30iXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgbWFnbml0dWRlIGlzIHNxcnQoMV4yICsgKC0zKV4yKSA9IHNxcnQoMTApLCBhbmQgdGhlIHBvaW50IGxpZXMgaW4gdGhlIGZvdXJ0aCBxdWFkcmFudCwgc28gdGhlIHByaW5jaXBhbCBhbmdsZSBpcyAtNzEuNiBkZWdyZWVzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBzaWduIG9mIHRoZSBhbmdsZSBpcyB3cm9uZzsgdGhhdCB3b3VsZCBwbGFjZSB0aGUgcG9pbnQgaW4gdGhlIGZpcnN0IHF1YWRyYW50LiIsIkMiOiJUaGUgbWFnbml0dWRlIGlzIHNxcnQoMTApLCBub3QgMTAuIiwiRCI6IlRoZSBhbmdsZSBkb2VzIG5vdCBtYXRjaCB0YW5eey0xfSgtMy8xKS4ifSwiaGludCI6IkNvbXB1dGUgbWFnbml0dWRlIGZpcnN0LCB0aGVuIGNoZWNrIHRoZSBxdWFkcmFudCBmcm9tIHRoZSBzaWducyBvZiByZWFsIGFuZCBpbWFnaW5hcnkgcGFydHMuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImFyZ2FuZF9xdWFkcmFudF9hbmdsZSIsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgY2FsY3VsYXRvciBnaXZlcyB0YW5eey0xfSgoLTMpLygtMikpID0gNTYuM8KwIHdoZW4gZmluZGluZyB0aGUgYW5nbGUgb2YgeiA9IC0yIC0gajMuIFdoYXQgaXMgdGhlIGNvcnJlY3QgcHJpbmNpcGFsIGFuZ2xlPyIsIm9wdGlvbnMiOlsiQS4gNTYuM8KwIiwiQi4gMTIzLjfCsCIsIkMuIC0xMjMuN8KwIiwiRC4gLTU2LjPCsCJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlRoZSBwb2ludCAoLTIsIC0zKSBsaWVzIGluIHRoZSB0aGlyZCBxdWFkcmFudCwgc28gdGhlIHByaW5jaXBhbCBhbmdsZSBzaG91bGQgYmUgbmVnYXRpdmUgYW5kIGVxdWFsIHRvIC0xMjMuNyBkZWdyZWVzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgaXMgdGhlIHJhdyByZWZlcmVuY2UgYW5nbGUgYW5kIGxpZXMgaW4gdGhlIGZpcnN0IHF1YWRyYW50LiIsIkIiOiIxMjMuNyBkZWdyZWVzIGlzIGluIHRoZSBzZWNvbmQgcXVhZHJhbnQsIG5vdCB0aGUgdGhpcmQuIiwiRCI6IlRoaXMgaXMgaW4gdGhlIGZvdXJ0aCBxdWFkcmFudCwgc28gaXQgaGFzIHRoZSB3cm9uZyBsb2NhdGlvbi4ifSwiaGludCI6IlVzZSB0aGUgc2lnbnMgb2YgYm90aCBjb29yZGluYXRlcyBiZWZvcmUgdHJ1c3RpbmcgYXJjdGFuZ2VudCBvdXRwdXQuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImFyZ2FuZF9xdWFkcmFudF9hbmdsZSIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiZXVsZXJfYW5kX3NwZWNpYWxfcG9pbnRzIiwibGFiZWwiOiJFdWxlciBmb3JtIGFuZCBzcGVjaWFsIHVuaXQtbWFnbml0dWRlIGlkZW50aXRpZXMiLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBpZGVudGl0eSBpcyBjb3JyZWN0IGZvciBhbnkgaW50ZWdlciBuPyIsIm9wdGlvbnMiOlsiQS4gaiA9IGVee2ooXFxwaSArIDJcXHBpIG4pfSIsIkIuIC0xID0gZV57ajJcXHBpIG59IiwiQy4gMSA9IGVee2oyXFxwaSBufSIsIkQuIC1qID0gZV57aihcXHBpLzIgKyAyXFxwaSBuKX0iXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJBIGZ1bGwgcm90YXRpb24gYnkgYW55IGludGVnZXIgbXVsdGlwbGUgb2YgMs+AIHJldHVybnMgdG8gdGhlIHBvaW50IDEgb24gdGhlIHBvc2l0aXZlIHJlYWwgYXhpcy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJlXntqKM+AICsgMs+Abil9IGNvcnJlc3BvbmRzIHRvIC0xLCBub3Qgai4iLCJCIjoiLTEgaGFzIGFuZ2xlIM+AICsgMs+Abiwgbm90IDLPgG4uIiwiRCI6ImVee2ooz4AvMiArIDLPgG4pfSBjb3JyZXNwb25kcyB0byBqLCBub3QgLWouIn0sImhpbnQiOiJNYXRjaCBlYWNoIGV4cG9uZW50aWFsIGFuZ2xlIHRvIGl0cyBwb2ludCBvbiB0aGUgdW5pdCBjaXJjbGUuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6InVuaXRfY2lyY2xlX3NwZWNpYWxfcG9pbnRzIiwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoiYmVzdF9mb3JtX2Zvcl9vcGVyYXRpb25zIiwibGFiZWwiOiJDaG9vc2luZyBDYXJ0ZXNpYW4gb3IgcG9sYXIgZm9ybSBkZXBlbmRpbmcgb24gdGhlIHRhc2siLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3A0X3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBmb3JtIGlzIHVzdWFsbHkgbW9zdCBjb252ZW5pZW50IGZvciBjb21wdXRpbmcgejEgKyB6Mj8iLCJvcHRpb25zIjpbIkEuIENhcnRlc2lhbiBmb3JtIiwiQi4gUG9sYXIgZm9ybSIsIkMuIEV4cG9uZW50aWFsIGZvcm0gb25seSIsIkQuIEFueSBmb3JtIGlzIGVxdWFsbHkgY29udmVuaWVudCBpbiBldmVyeSBjYXNlIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiQWRkaXRpb24gYW5kIHN1YnRyYWN0aW9uIGFyZSBzaW1wbGVzdCBpbiBDYXJ0ZXNpYW4gZm9ybSBiZWNhdXNlIHJlYWwgYW5kIGltYWdpbmFyeSBwYXJ0cyBjb21iaW5lIGRpcmVjdGx5LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlBvbGFyIGZvcm0gaXMgYmV0dGVyIGZvciBtYWduaXR1ZGUtYW5nbGUgcmVhc29uaW5nLCBub3QgZGlyZWN0IGFkZGl0aW9uLiIsIkMiOiJFeHBvbmVudGlhbCBmb3JtIGlzIGNvbXBhY3QgYnV0IG5vdCB1c3VhbGx5IHRoZSBlYXNpZXN0IGZvciBhZGRpdGlvbi4iLCJEIjoiRGlmZmVyZW50IHRhc2tzIGZhdm9yIGRpZmZlcmVudCBmb3Jtcy4ifSwiaGludCI6IkFzayB3aGljaCBmb3JtIGxldHMgeW91IGNvbWJpbmUgaG9yaXpvbnRhbCBhbmQgdmVydGljYWwgY29tcG9uZW50cyBkaXJlY3RseS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3A0X3EyIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJDb21wdXRlICgzICsgajQpICsgKDIgKyBqMykgYW5kIGJyaWVmbHkgc3RhdGUgd2h5IHRoaXMgZm9ybSB3YXMgdGhlIGVhc2llc3QgdG8gdXNlLiIsImlkZWFsX2Fuc3dlciI6IlRoZSBzdW0gaXMgNSArIGo3LiBDYXJ0ZXNpYW4gZm9ybSBpcyBlYXNpZXN0IGJlY2F1c2UgdGhlIHJlYWwgcGFydHMgYW5kIGltYWdpbmFyeSBwYXJ0cyBjYW4gYmUgYWRkZWQgc2VwYXJhdGVseS4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IGdpdmUgdGhlIGNvcnJlY3Qgc3VtIDUgKyBqNyIsIk11c3QgbWVudGlvbiBhZGRpbmcgcmVhbCBwYXJ0cyBzZXBhcmF0ZWx5IGZyb20gaW1hZ2luYXJ5IHBhcnRzIiwiTXVzdCBpZGVudGlmeSBDYXJ0ZXNpYW4vcmVjdGFuZ3VsYXIgZm9ybSBhcyB0aGUgY29udmVuaWVudCBjaG9pY2UiXSwiZXhwbGFuYXRpb24iOiJUaGlzIGNoZWNrcyB0aGF0IHRoZSBzdHVkZW50IGNhbiBleGVjdXRlIHRoZSBvcGVyYXRpb24gYW5kIGV4cGxhaW4gdGhlIHN0cmF0ZWd5LCBub3QganVzdCBtZW1vcml6ZSBhIHJ1bGUuIiwiaGludCI6Ikdyb3VwIHRoZSByZWFsIHRlcm1zIHRvZ2V0aGVyIGFuZCB0aGUgai10ZXJtcyB0b2dldGhlci4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
