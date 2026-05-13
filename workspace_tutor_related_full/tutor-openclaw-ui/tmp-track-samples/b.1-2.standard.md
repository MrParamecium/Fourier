# B.1-2 Algebra of Complex Numbers

> **Section Objective:** Learn how complex numbers are represented visually and algebraically, and how to switch between rectangular and polar form — a skill tested directly on exams.

Take the number z = 3 + 4j. You can read this immediately as the point (3, 4) on a coordinate grid: 3 steps to the right, 4 steps up. That is the core idea behind complex numbers — they are just points on a 2D plane.

This section covers two ways to describe any such point: **rectangular form** (using horizontal and vertical coordinates) and **polar form** (using distance and angle from the origin). Engineers use these forms as a shortcut for analyzing signals and circuits. You will also meet **Euler's formula**, which compresses polar form into a single compact expression.

A quick reminder: for z = a + jb, the **real part** is a and the **imaginary part** is b — not bj. That distinction trips up many students on exams.

![Fig. B.2](/figures/page-005-fig__b_2-1.png)
*The complex plane showing z = a + jb as the point (a, b), its conjugate z* = a − jb reflected across the real axis, magnitude r as the distance from the origin, and angle θ — this single figure ties together every concept in this section.*

## 1. Rectangular Form on the Complex Plane

Start with the example z = 3 + 4j. This is a point sitting at (3, 4) on the complex plane — 3 units along the horizontal axis and 4 units along the vertical axis. In general, any complex number takes the form:

**z = a + jb**

where:
- **Re(z) = a** — the real part (horizontal coordinate)
- **Im(z) = b** — the imaginary part (vertical coordinate)

### COMMON EXAM TRAP

The imaginary part is **b**, not **bj**. The symbol j is just the axis marker. Im(z) is always a plain real number.

#### Geometry note
All purely real numbers (b = 0) lie on the horizontal axis. All purely imaginary numbers (a = 0) lie on the vertical axis.

---

### WORKED EXAMPLE

For **z = 5 − 2j**:

1. Match to a + jb: here a = 5, b = −2
2. Re(z) = 5, Im(z) = −2 (not −2j)
3. Plotted point: **(5, −2)**
4. Since a > 0 and b < 0, the point lies in **Quadrant IV** (right side, below the real axis)

$$z = a + jb \quad \text{with} \quad \operatorname{Re}(z)=a,\; \operatorname{Im}(z)=b$$
*Rectangular form stores the horizontal coordinate a and vertical coordinate b of the complex number as a point on the complex plane, exactly like (x, y) coordinates on a standard grid.*

## 2. Polar Form and Euler Form

Return to z = 3 + 4j. Instead of saying "3 right, 4 up," you could describe the same point by asking: how far is it from the origin, and at what angle?

The distance from the origin is called the **magnitude** r, and the angle from the positive real axis is called **θ** (theta).

For z = 3 + 4j:
- The horizontal side of the right triangle is a = 3
- The vertical side is b = 4
- By the Pythagorean theorem: **r = √(3² + 4²) = √25 = 5**
- The angle: **θ = tan⁻¹(4/3)**

In general, the rectangular coordinates relate to polar coordinates by:

**a = r cos θ** and **b = r sin θ**

Substituting into z = a + jb gives the **polar form**:

**z = r(cos θ + j sin θ)**

For our example: z = 5(cos θ + j sin θ) where θ = tan⁻¹(4/3).

### EULER'S FORMULA — THE SHORTHAND

Euler's formula states that **e^{jθ} = cos θ + j sin θ**. This means polar form can be written even more compactly as:

**z = re^{jθ}**

So z = 3 + 4j can also be written as **z = 5e^{jθ}** with θ = tan⁻¹(4/3). This exponential shorthand appears constantly in engineering courses — get comfortable with it now.

$$a = r\cos\theta, \qquad b = r\sin\theta, \qquad z = r(\cos\theta + j\sin\theta)$$
*Polar form describes the same complex number using magnitude r (distance from the origin) and angle θ (direction from the positive real axis) instead of separate x- and y-style coordinates.*

$$e^{j\theta} = \cos\theta + j\sin\theta$$
*Euler's formula compresses the cosine and sine of polar form into a single compact exponential expression, and this shorthand is used extensively throughout engineering mathematics and signal analysis.*

---
**📌 Key Takeaways**
- z = a + jb is the point (a, b) on the complex plane; Re(z) = a and Im(z) = b, never bj.
- Polar form z = r(cos θ + j sin θ) describes the same point by distance r and angle θ.
- Euler's formula e^{jθ} = cos θ + j sin θ lets you write polar form compactly as z = re^{jθ}.

*In the next section we will use these forms to perform operations on complex numbers more efficiently.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlY3Rhbmd1bGFyX2Zvcm1fcGFydHMiLCJsYWJlbCI6IklkZW50aWZ5IHJlYWwgcGFydCwgaW1hZ2luYXJ5IHBhcnQsIGFuZCBwbG90dGVkIHBvaW50IGZyb20gcmVjdGFuZ3VsYXIgZm9ybSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHogPSA1IC0gMmosIHdoaWNoIHN0YXRlbWVudCBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gUmUoeikgPSAtMiBhbmQgSW0oeikgPSA1IiwiQi4gUmUoeikgPSA1IGFuZCBJbSh6KSA9IC0yIiwiQy4gUmUoeikgPSA1IGFuZCBJbSh6KSA9IC0yaiIsIkQuIFRoZSBwb2ludCBpcyAoLTIsIDUpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiSW4geiA9IGEgKyBqYiwgdGhlIHJlYWwgcGFydCBpcyB0aGUgY29lZmZpY2llbnQgbm90IGF0dGFjaGVkIHRvIGosIGFuZCB0aGUgaW1hZ2luYXJ5IHBhcnQgaXMgdGhlIGNvZWZmaWNpZW50IG9mIGouIFNvIFJlKHopID0gNSBhbmQgSW0oeikgPSAtMi4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIHN3YXBzIHRoZSByZWFsIGFuZCBpbWFnaW5hcnkgcGFydHMuIiwiQyI6IlRoZSBpbWFnaW5hcnkgcGFydCBpcyB0aGUgY29lZmZpY2llbnQgLTIsIG5vdCB0aGUgZnVsbCB0ZXJtIC0yai4iLCJEIjoiVGhlIHBsb3R0ZWQgcG9pbnQgaXMgKDUsIC0yKSwgbm90ICgtMiwgNSkuIn0sImhpbnQiOiJNYXRjaCB6ID0gNSAtIDJqIHRvIGEgKyBqYi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHBvaW50IGluIHRoZSBjb21wbGV4IHBsYW5lIHJlcHJlc2VudHMgeiA9IC0zICsgNGo/Iiwib3B0aW9ucyI6WyJBLiAoNCwgLTMpIiwiQi4gKC0zLCA0KSIsIkMuICgzLCA0KSIsIkQuICgtMywgLTQpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIHJlYWwgcGFydCBnaXZlcyB0aGUgaG9yaXpvbnRhbCBjb29yZGluYXRlIGFuZCB0aGUgaW1hZ2luYXJ5IHBhcnQgZ2l2ZXMgdGhlIHZlcnRpY2FsIGNvb3JkaW5hdGUsIHNvIHogPSAtMyArIDRqIGlzIHRoZSBwb2ludCAoLTMsIDQpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgc3dhcHMgdGhlIGNvb3JkaW5hdGVzLiIsIkMiOiJUaGUgcmVhbCBwYXJ0IHNob3VsZCBiZSBuZWdhdGl2ZSBoZXJlLiIsIkQiOiJUaGUgaW1hZ2luYXJ5IHBhcnQgaXMgcG9zaXRpdmUsIG5vdCBuZWdhdGl2ZS4ifSwiaGludCI6IlVzZSAoUmUoeiksIEltKHopKS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoicHl0aG9uX21hdHBsb3RsaWIgY29tcGxleCBwbGFuZSB3aXRoIGxhYmVsZWQgcXVhZHJhbnRzIGFuZCBjYW5kaWRhdGUgcG9pbnRzIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJjb25qdWdhdGVfYW5kX2dlb21ldHJ5IiwibGFiZWwiOiJSZWFkIGNvbmp1Z2F0ZSBhbmQgZ2VvbWV0cnkgZnJvbSB0aGUgY29tcGxleC1wbGFuZSBkaWFncmFtIiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSWYgeiA9IGEgKyBqYiwgd2hhdCBpcyBpdHMgY29tcGxleCBjb25qdWdhdGUgeio/Iiwib3B0aW9ucyI6WyJBLiBhIC0gamIiLCJCLiAtYSArIGpiIiwiQy4gLWEgLSBqYiIsIkQuIGIgKyBqYSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlRoZSBjb25qdWdhdGUga2VlcHMgdGhlIHJlYWwgcGFydCB0aGUgc2FtZSBhbmQgZmxpcHMgdGhlIHNpZ24gb2YgdGhlIGltYWdpbmFyeSBwYXJ0LCB3aGljaCByZWZsZWN0cyB0aGUgcG9pbnQgYWNyb3NzIHRoZSByZWFsIGF4aXMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhpcyBpbmNvcnJlY3RseSBjaGFuZ2VzIHRoZSByZWFsIHBhcnQuIiwiQyI6IlRoaXMgY2hhbmdlcyBib3RoIHBhcnRzLCBub3QganVzdCB0aGUgaW1hZ2luYXJ5IHNpZ24uIiwiRCI6IlRoaXMgc3dhcHMgdGhlIHJvbGVzIG9mIGEgYW5kIGIuIn0sImhpbnQiOiJUaGluazogcmVmbGVjdGlvbiBhY3Jvc3MgdGhlIHJlYWwgYXhpcy4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoicHl0aG9uX21hdHBsb3RsaWIgY29tcGxleCBwbGFuZSBzaG93aW5nIHogYW5kIHoqIHJlZmxlY3RlZCBhY3Jvc3MgcmVhbCBheGlzIiwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoicG9sYXJfZm9ybV9jb252ZXJzaW9uIiwibGFiZWwiOiJDb252ZXJ0IGJldHdlZW4gcmVjdGFuZ3VsYXIgYW5kIHBvbGFyIGRlc2NyaXB0aW9ucyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSWYgeiA9IHIoY29zIM64ICsgaiBzaW4gzrgpLCB3aGljaCBwYWlyIG11c3QgYmUgdHJ1ZT8iLCJvcHRpb25zIjpbIkEuIGEgPSByIHNpbiDOuCwgYiA9IHIgY29zIM64IiwiQi4gYSA9IHIgY29zIM64LCBiID0gciBzaW4gzrgiLCJDLiBhID0gciB0YW4gzrgsIGIgPSByIiwiRC4gYSA9IGNvcyDOuCwgYiA9IHNpbiDOuCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkNvbXBhcmluZyB6ID0gYSArIGpiIHdpdGggeiA9IHIoY29zIM64ICsgaiBzaW4gzrgpLCB0aGUgcmVhbCBwYXJ0IGlzIHIgY29zIM64IGFuZCB0aGUgaW1hZ2luYXJ5IHBhcnQgaXMgciBzaW4gzrguIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiQ29zaW5lIGNvcnJlc3BvbmRzIHRvIHRoZSBob3Jpem9udGFsIGNvb3JkaW5hdGUsIG5vdCBzaW5lLiIsIkMiOiJUaGlzIGlzIG5vdCB0aGUgcmVjdGFuZ3VsYXItcG9sYXIgcmVsYXRpb25zaGlwLiIsIkQiOiJUaGlzIGlnbm9yZXMgdGhlIHNjYWxpbmcgZmFjdG9yIHIuIn0sImhpbnQiOiJSZWFsIHBhcnQgY29tZXMgZnJvbSB0aGUgaG9yaXpvbnRhbCBzaWRlIG9mIHRoZSB0cmlhbmdsZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IldyaXRlIHogPSAzICsgNGogaW4gcG9sYXIgZm9ybS4gU2hvdyB0aGUgbWFnbml0dWRlIGFuZCBhbmdsZSBiZWZvcmUgZ2l2aW5nIHRoZSBmaW5hbCBhbnN3ZXIuIiwiaWRlYWxfYW5zd2VyIjoiciA9IHNxcnQoM14yICsgNF4yKSA9IDUsIGFuZCDOuCA9IHRhbl57LTF9KDQvMykuIFRoZXJlZm9yZSB6ID0gNShjb3MgzrggKyBqIHNpbiDOuCkgd2l0aCDOuCA9IHRhbl57LTF9KDQvMyksIG9yIGVxdWl2YWxlbnRseSB6ID0gNWVee2rOuH0uIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBjb21wdXRlIG9yIHN0YXRlIHIgPSA1IGNvcnJlY3RseSIsIk11c3QgaWRlbnRpZnkgzrggPSB0YW5eey0xfSg0LzMpIG9yIGFuIGVxdWl2YWxlbnQgbnVtZXJpY2FsIGFuZ2xlIiwiTXVzdCB3cml0ZSBhIGNvcnJlY3QgZmluYWwgcG9sYXIgZm9ybSIsIkJvbnVzIHRvbGVyYW5jZTogZXhwb25lbnRpYWwgZm9ybSA1ZV57as64fSBpcyBhY2NlcHRhYmxlIGlmIM64IGlzIGdpdmVuIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCBjYW4gY2Fycnkgb3V0IHRoZSBmdWxsIGNvbnZlcnNpb24sIG5vdCBqdXN0IHJlY29nbml6ZSBhIGZvcm11bGEuIiwiaGludCI6IlVzZSByID0gc3FydChhXjIgKyBiXjIpIGFuZCB0YW4gzrggPSBiL2EuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJldWxlcl9mb3JtdWxhIiwibGFiZWwiOiJSZWNvZ25pemUgRXVsZXIncyBmb3JtdWxhIGFzIHNob3J0aGFuZCBmb3IgcG9sYXIgZm9ybSIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDRfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkV1bGVyJ3MgZm9ybXVsYSBsZXRzIHVzIHJlcGxhY2UgY29zIM64ICsgaiBzaW4gzrggd2l0aCB3aGljaCBleHByZXNzaW9uPyIsIm9wdGlvbnMiOlsiQS4gZV7OuCIsIkIuIGplXs64IiwiQy4gZV57as64fSIsIkQuIHJee2rOuH0iXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJFdWxlcidzIGZvcm11bGEgc3RhdGVzIGVee2rOuH0gPSBjb3MgzrggKyBqIHNpbiDOuCBleGFjdGx5LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgbWlzc2VzIHRoZSBjcnVjaWFsIGogaW4gdGhlIGV4cG9uZW50LiIsIkIiOiJUaGUgaiBtdWx0aXBsaWVzIHRoZSBleHBvbmVudCdzIGFuZ2xlLCBub3QgdGhlIHdob2xlIGV4cG9uZW50aWFsLiIsIkQiOiJyIGlzIG5vdCBwYXJ0IG9mIEV1bGVyJ3MgaWRlbnRpdHkuIn0sImhpbnQiOiJUaGUgYW5nbGUgYXBwZWFycyBpbiB0aGUgZXhwb25lbnQgd2l0aCBqLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
