# B.1 Complex Numbers — A Practical Review

> **Section Objective:** Build a working, exam-ready understanding of complex numbers in rectangular form, polar form, and exponential form — including conjugates and angle conventions.

Start with a concrete example: **z = 3 + 4j** means 3 units along the horizontal (real) axis and 4 units up the vertical (imaginary) axis. That is all a complex number is — a point on a 2D plane.

Complex numbers appear throughout signals and systems. They simplify calculations that would otherwise be painful, and even when the final answer is a real number, the complex-number path is usually the cleaner route.

If the symbol **j** looks unfamiliar, do not worry — it is simply the label used in engineering for the vertical-axis direction (mathematicians use *i*; engineers use *j* to avoid confusion with current).

In this section you will learn: **rectangular form**, **polar and exponential form**, **complex conjugates**, and the critical skill of **reading angles correctly by quadrant**.

![Fig. B.2](/figures/page-005-fig__b_2-1.png)
*A complex number z = a + jb is a point with coordinates (a, b) on the complex plane, described by magnitude r and angle θ from the positive real axis, with its conjugate z* = a − jb appearing as the mirror reflection across the real axis.*

## 1. Reading a Complex Number on the Plane

Take **z = 3 + 4j** again. The number 3 tells you how far to move right along the real axis; the number 4 tells you how far to move up along the imaginary axis. In general, for **z = a + jb**:

- **Re(z) = a** — the real part is the horizontal coordinate
- **Im(z) = b** — the imaginary part is the vertical coordinate

### COMMON EXAM MISTAKE

The imaginary part is **b**, not **jb**. Students who write Im(z) = 4j instead of Im(z) = 4 lose marks. The symbol j is the axis label, not part of the value.

All purely real numbers (b = 0) sit on the horizontal axis. All purely imaginary numbers (a = 0) sit on the vertical axis.

The **complex conjugate** is z\* = a − jb. Geometrically, it is the mirror image of z reflected across the real axis — same horizontal position, flipped vertically. For z = 3 + 4j, the conjugate is z\* = 3 − 4j.

$$z = a + jb, \quad \operatorname{Re}(z)=a, \quad \operatorname{Im}(z)=b, \quad z^* = a-jb$$
*These four expressions — the complex number itself, its real part, its imaginary part, and its conjugate — are related but distinct ideas that must not be confused on exams: Re(z) and Im(z) are both real numbers, z* flips only the sign of b, and none of them include a stray j in the part values.*

## 2. From Rectangular Form to Polar and Exponential Form

Let us convert **z = 3 + 4j** into polar form step by step.

**Step 1 — Magnitude (distance from origin):**
$$r = \sqrt{3^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5$$

**Step 2 — Angle (direction from positive real axis):**
$$\theta = \tan^{-1}\!\left(\frac{4}{3}\right) \approx 53.1^\circ$$

So **z = 5∠53.1°** in polar notation, or **z = 5e^{j53.1°}** in exponential form.

The general rule: if z = a + jb, then a = r cos θ and b = r sin θ, which means:
$$z = r(\cos\theta + j\sin\theta) = re^{j\theta}$$

The bridge between these two forms is **Euler's formula**: e^{jθ} = cos θ + j sin θ. It is not a trick — it is a deep identity that makes exponential form and trigonometric form two ways of writing the same thing.

**Magnitude** = distance from the origin. **Angle** = direction you point from the origin. Same point, two descriptions.

$$a = r\cos\theta, \quad b = r\sin\theta, \quad z = a+jb = r(\cos\theta + j\sin\theta), \quad e^{j\theta} = \cos\theta + j\sin\theta$$
*These formulas show two equivalent ways to describe the same point on the complex plane: rectangular form uses the (a, b) coordinates directly, while polar/exponential form uses the distance r from the origin and the angle θ of the direction.*

![unknown](/figures/page-009-unknown-1.png)
*Argand diagrams for four complex numbers in different quadrants — quadrant awareness is essential when converting to polar form because a calculator's raw tan⁻¹ output can point to the wrong quadrant entirely.*

## 3. Angles, Quadrants, and Useful Identities

Consider **z = −2 + j1**. A student types tan⁻¹(1 / −2) into a calculator and gets **−26.6°**. That is wrong.

Why? Because the point (−2, 1) sits in **quadrant II** — negative real part, positive imaginary part. The angle must point left and upward, somewhere between 90° and 180°. The correct principal angle is:
$$\theta = -26.6^\circ + 180^\circ = 153.4^\circ$$

### EXAM RULE

Always plot the sign pattern of (a, b) first to identify the quadrant. Then adjust the raw tan⁻¹ output:
- **Quadrant I** (a > 0, b > 0): use the raw angle directly
- **Quadrant II** (a < 0, b > 0): add 180°
- **Quadrant III** (a < 0, b < 0): add 180° (or subtract 180°)
- **Quadrant IV** (a > 0, b < 0): use the raw angle (it will be negative)

Angles that differ by multiples of 2π (360°) represent the same direction — they are equivalent.

### KEY IDENTITIES

Four special points on the unit circle are worth memorizing:

| Point | Angle | Exponential form |
|-------|-------|------------------|
| 1 | 0 + 2πn | e^{j2πn} |
| −1 | π + 2πn | e^{j(π + 2πn)} |
| j | π/2 + 2πn | e^{j(π/2 + 2πn)} |
| −j | −π/2 + 2πn | e^{j(−π/2 + 2πn)} |

Finally, note that **zz\* = |z|²** is always a real number. This identity is useful whenever you need to eliminate the imaginary part of a denominator or compute signal power.

#### Note

For z = −2 + j1, the magnitude is r = √(4 + 1) = √5, so the full polar form is z = √5 · e^{j153.4°}.

$$1=e^{j2\pi n}, \quad -1=e^{j(\pi+2\pi n)}, \quad j=e^{j(\pi/2+2\pi n)}, \quad -j=e^{j(-\pi/2+2\pi n)}, \quad zz^*=|z|^2$$
*These identities pin four familiar points — 1, −1, j, and −j — to their exact angles on the unit circle, and the final identity shows that multiplying a complex number by its conjugate always yields a real result equal to the squared magnitude.*

---
**📌 Key Takeaways**
- A complex number z = a + jb is a 2D point; Re(z) = a and Im(z) = b, never jb.
- Polar form re^{jθ} uses magnitude r = √(a²+b²) and angle θ from the positive real axis.
- Always check the quadrant before trusting a calculator's raw tan⁻¹ angle output.
- The conjugate z* = a − jb reflects across the real axis, and zz* = |z|² is always real.

*In the next section we will build on these complex-number tools for later signals-and-systems methods.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlY3Rhbmd1bGFyX2ludGVycHJldGF0aW9uIiwibGFiZWwiOiJSZWFkaW5nIHJlYWwgcGFydCwgaW1hZ2luYXJ5IHBhcnQsIGFuZCBjb25qdWdhdGUiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciB6ID0gNSAtIDJqLCB3aGljaCBzdGF0ZW1lbnQgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIFJlKHopID0gLTIgYW5kIEltKHopID0gNSIsIkIuIFJlKHopID0gNSBhbmQgSW0oeikgPSAtMiIsIkMuIFJlKHopID0gNSBhbmQgSW0oeikgPSAtMmoiLCJELiB6KiA9IDUgLSAyaiJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSByZWFsIHBhcnQgaXMgdGhlIGNvZWZmaWNpZW50IHdpdGhvdXQgaiwgYW5kIHRoZSBpbWFnaW5hcnkgcGFydCBpcyB0aGUgY29lZmZpY2llbnQgb2Ygaiwgc28gUmUoeikgPSA1IGFuZCBJbSh6KSA9IC0yLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgc3dhcHMgdGhlIHJlYWwgYW5kIGltYWdpbmFyeSBwYXJ0cy4iLCJDIjoiVGhlIGltYWdpbmFyeSBwYXJ0IGlzIHRoZSByZWFsIG51bWJlciBjb2VmZmljaWVudCAtMiwgbm90IHRoZSBmdWxsIHRlcm0gLTJqLiIsIkQiOiJUaGUgY29uanVnYXRlIGNoYW5nZXMgdGhlIHNpZ24gb2YgdGhlIGltYWdpbmFyeSB0ZXJtLCBzbyB6KiA9IDUgKyAyai4ifSwiaGludCI6IlNlcGFyYXRlIHRoZSBjb2VmZmljaWVudCBmcm9tIHRoZSBzeW1ib2wgai4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIHogPSBhICsgamIsIHdoYXQgaXMgaXRzIGNvbXBsZXggY29uanVnYXRlPyIsIm9wdGlvbnMiOlsiQS4gYSArIGpiIiwiQi4gLWEgKyBqYiIsIkMuIGEgLSBqYiIsIkQuIC1hIC0gamIiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJUaGUgY29uanVnYXRlIHJlZmxlY3RzIHRoZSBwb2ludCBhY3Jvc3MgdGhlIHJlYWwgYXhpcywgc28gb25seSB0aGUgc2lnbiBvZiB0aGUgaW1hZ2luYXJ5IHRlcm0gY2hhbmdlcy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGF0IGlzIHRoZSBvcmlnaW5hbCBudW1iZXIsIG5vdCBpdHMgcmVmbGVjdGlvbi4iLCJCIjoiQ29uanVnYXRpb24gZG9lcyBub3QgZmxpcCB0aGUgcmVhbCBwYXJ0LiIsIkQiOiJCb3RoIHNpZ25zIGNoYW5nZWQsIHdoaWNoIGlzIG5vdCBjb25qdWdhdGlvbi4ifSwiaGludCI6IlRoaW5rIG1pcnJvciBpbWFnZSBhY3Jvc3MgdGhlIGhvcml6b250YWwgYXhpcy4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoiY29tcGxleF9wbGFuZV9jb25qdWdhdGVfcmVmbGVjdGlvbiIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoicmVjdGFuZ3VsYXJfdG9fcG9sYXIiLCJsYWJlbCI6IkNvbnZlcnRpbmcgYSArIGpiIHRvIHBvbGFyL2V4cG9uZW50aWFsIGZvcm0iLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGlzIHRoZSBjb3JyZWN0IHBvbGFyIGZvcm0gb2YgeiA9IDMgKyA0aj8iLCJvcHRpb25zIjpbIkEuIDVlXntqNTMuMcKwfSIsIkIuIDdlXntqNTMuMcKwfSIsIkMuIDVlXntqMzYuOcKwfSIsIkQuIDI1ZV57ajUzLjHCsH0iXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJUaGUgbWFnbml0dWRlIGlzIHNxcnQoM8KyICsgNMKyKSA9IDUgYW5kIHRoZSBhbmdsZSBpcyB0YW7igbvCuSg0LzMpID0gNTMuMSBkZWdyZWVzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IjcgaXMgdGhlIHN1bSBvZiBjb29yZGluYXRlcywgbm90IHRoZSBtYWduaXR1ZGUuIiwiQyI6IjM2LjkgZGVncmVlcyB3b3VsZCBjb3JyZXNwb25kIHRvIHRhbuKBu8K5KDMvNCksIG5vdCB0YW7igbvCuSg0LzMpLiIsIkQiOiIyNSBpcyB0aGUgc3F1YXJlZCBtYWduaXR1ZGUsIG5vdCB0aGUgbWFnbml0dWRlLiJ9LCJoaW50IjoiVXNlIGRpc3RhbmNlIGZyb20gdGhlIG9yaWdpbiBhbmQgdGhlbiBzbG9wZSBhbmdsZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkNvbnZlcnQgeiA9IDEgLSBqMyBpbnRvIHBvbGFyL2V4cG9uZW50aWFsIGZvcm0gdXNpbmcgdGhlIHByaW5jaXBhbCBhbmdsZS4iLCJpZGVhbF9hbnN3ZXIiOiJUaGUgbWFnbml0dWRlIGlzIHNxcnQoMcKyICsgM8KyKSA9IHNxcnQoMTApLiBUaGUgcG9pbnQgKDEsIC0zKSBpcyBpbiBxdWFkcmFudCBJViwgc28gdGhlIHByaW5jaXBhbCBhbmdsZSBpcyB0YW7igbvCuSgtMy8xKSDiiYggLTcxLjYgZGVncmVlcy4gVGhlcmVmb3JlIHogPSBzcXJ0KDEwKSDCtyBlXnstajcxLjbCsH0uIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBjb21wdXRlIG1hZ25pdHVkZSBhcyBzcXJ0KDEwKSIsIk11c3QgaWRlbnRpZnkgdGhlIHBvaW50IGFzIHF1YWRyYW50IElWIG9yIHVzZSBhIG5lZ2F0aXZlIHByaW5jaXBhbCBhbmdsZSIsIk11c3QgZ2l2ZSBhbiBhbmdsZSBjbG9zZSB0byAtNzEuNiBkZWdyZWVzIiwiTXVzdCB3cml0ZSBhIHZhbGlkIGV4cG9uZW50aWFsIG9yIHBvbGFyIGZvcm0iXSwiZXhwbGFuYXRpb24iOiJUaGlzIGNoZWNrcyBib3RoIGZvcm11bGEgdXNlIGFuZCBxdWFkcmFudCBhd2FyZW5lc3MuIiwiaGludCI6IkZpbmQgdGhlIG1hZ25pdHVkZSBmaXJzdCwgdGhlbiBhc2sgd2hpY2ggcXVhZHJhbnQgY29udGFpbnMgKDEsIC0zKS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImFuZ2xlX3F1YWRyYW50X2FuZF9pZGVudGl0aWVzIiwibGFiZWwiOiJRdWFkcmFudCBjb3JyZWN0aW9uLCBlcXVpdmFsZW50IGFuZ2xlcywgYW5kIGJhc2ljIGV4cG9uZW50aWFsIGlkZW50aXRpZXMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBzdHVkZW50IGNvbXB1dGVzIHRhbuKBu8K5KDEgLyAoLTIpKSA9IC0yNi42wrAgZm9yIHogPSAtMiArIGoxLiBXaGF0IGlzIHRoZSBiZXN0IGNvcnJlY3Rpb24/Iiwib3B0aW9ucyI6WyJBLiBLZWVwIC0yNi42wrAgYmVjYXVzZSBjYWxjdWxhdG9ycyBhcmUgYWx3YXlzIHJpZ2h0IiwiQi4gQWRkIDkwwrAgdG8gZ2V0IDYzLjTCsCIsIkMuIEFkZCAxODDCsCB0byBnZXQgMTUzLjTCsCBiZWNhdXNlIHRoZSBwb2ludCBpcyBpbiBxdWFkcmFudCBJSSIsIkQuIENoYW5nZSB0aGUgc2lnbiB0byBnZXQgMjYuNsKwIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiVGhlIHBvaW50ICgtMiwgMSkgbGllcyBpbiBxdWFkcmFudCBJSSwgc28gdGhlIGFuZ2xlIG11c3QgcG9pbnQgbGVmdCBhbmQgdXA7IDE1My40wrAgaXMgdGhlIGNvcnJlY3QgcHJpbmNpcGFsIGFuZ2xlLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkludmVyc2UgdGFuZ2VudCBhbG9uZSBkb2VzIG5vdCBkZXRlcm1pbmUgdGhlIGNvcnJlY3QgcXVhZHJhbnQuIiwiQiI6IkFkZGluZyA5MMKwIGRvZXMgbm90IHBsYWNlIHRoZSBhbmdsZSBpbiB0aGUgY29ycmVjdCBkaXJlY3Rpb24gaGVyZS4iLCJEIjoiMjYuNsKwIGxpZXMgaW4gcXVhZHJhbnQgSSwgd2hpY2ggaXMgaW1wb3NzaWJsZSBmb3IgdGhlIHBvaW50ICgtMiwgMSkuIn0sImhpbnQiOiJQbG90IHRoZSBzaWduIHBhdHRlcm4gZmlyc3Q6IG5lZ2F0aXZlIHJlYWwgcGFydCwgcG9zaXRpdmUgaW1hZ2luYXJ5IHBhcnQuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImFyZ2FuZF9xdWFkcmFudF9hbmdsZSIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggaWRlbnRpdHkgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIGogPSBlXntqz4B9IiwiQi4gLTEgPSBlXntqKM+AICsgMs+Abil9IGZvciBpbnRlZ2VyIG4iLCJDLiAxID0gZV57aijPgC8yICsgMs+Abil9IGZvciBpbnRlZ2VyIG4iLCJELiAtaiA9IGVee2ooz4AvMiArIDLPgG4pfSBmb3IgaW50ZWdlciBuIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIHBvaW50IC0xIGlzIG9uIHRoZSBuZWdhdGl2ZSByZWFsIGF4aXMsIHNvIGl0cyBhbmdsZSBpcyDPgCBwbHVzIGFueSBtdWx0aXBsZSBvZiAyz4AuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiZV57as+AfSA9IC0xLCBub3Qgai4gVGhlIGFuZ2xlIM+AIHBvaW50cyB0byB0aGUgbmVnYXRpdmUgcmVhbCBheGlzLiIsIkMiOiJUaGUgYW5nbGUgz4AvMiBjb3JyZXNwb25kcyB0byBqIChwb2ludGluZyBzdHJhaWdodCB1cCksIG5vdCB0byAxLiIsIkQiOiItaiBjb3JyZXNwb25kcyB0byB0aGUgYW5nbGUgLc+ALzIgcGx1cyBtdWx0aXBsZXMgb2YgMs+ALCBub3QgK8+ALzIuIn0sImhpbnQiOiJNYXRjaCBlYWNoIG51bWJlciB0byBpdHMgbG9jYXRpb24gb24gdGhlIHVuaXQgY2lyY2xlLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDNfcTMiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIHogPSBhICsgamIsIHdoYXQgaXMgenoqIGVxdWFsIHRvPyIsIm9wdGlvbnMiOlsiQS4gYcKyIC0gYsKyIiwiQi4gMmFiaiIsIkMuIGHCsiArIGLCsiIsIkQuIGEgKyBiIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiTXVsdGlwbHlpbmcgYnkgdGhlIGNvbmp1Z2F0ZSBnaXZlcyAoYSArIGpiKShhIC0gamIpID0gYcKyICsgYsKyLCBhIHJlYWwgbnVtYmVyIGVxdWFsIHRvIHx6fMKyLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoYXQgbWlzc2VzIHRoZSBzaWduIGNoYW5nZSBjYXVzZWQgYnkgasKyID0gLTE7IHRoZSBjcm9zcyB0ZXJtcyBkbyBub3QgY2FuY2VsIHRvIGdpdmUgYSBtaW51cyBzaWduLiIsIkIiOiJUaGUgaW1hZ2luYXJ5IGNyb3NzIHRlcm1zIGNhbmNlbCBlYWNoIG90aGVyIG91dCByYXRoZXIgdGhhbiByZW1haW5pbmcuIiwiRCI6IlRoYXQgaXMgdW5yZWxhdGVkIHRvIGNvbmp1Z2F0ZSBtdWx0aXBsaWNhdGlvbi4ifSwiaGludCI6IkV4cGFuZCB0aGUgcHJvZHVjdCBhbmQgdXNlIGrCsiA9IC0xLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
