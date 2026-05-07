# B.1-2 Algebra of Complex Numbers

> **Section Objective:** Represent complex numbers in rectangular and polar form, read off real and imaginary parts, and recognize Euler's formula.

---

## 1. Rectangular Form

Start with a specific number: **z = 3 + 4j**.

This tells you to move **3 units to the right** along the real axis and **4 units up** along the imaginary axis. The result is a single point on a 2D grid — just like a map coordinate.

The general form is **z = a + jb**, where:

- **a** is the **real part** — your horizontal position
- **b** is the **imaginary part** — your vertical position

#### Remember
The imaginary part is the **number** b, not the term jb. For z = 3 + 4j, Re(z) = 3 and Im(z) = 4.

Every complex number is simply a point on this grid. That geometric picture is the key to everything that follows.

![Fig. B.2](/figures/page-005-fig__b_2-1.png)
*The complex plane: the horizontal axis is the real axis, the vertical axis is the imaginary axis, the point z = a + jb sits at coordinates (a, b), r is its distance from the origin, theta is the angle from the positive real axis, and z* = a - jb is the mirror reflection of z across the real axis.*

$$z = a + jb, \quad \operatorname{Re}(z) = a, \quad \operatorname{Im}(z) = b$$
*The rectangular form gives you the complex number's horizontal coordinate (a, the real part) and vertical coordinate (b, the imaginary part) directly, just like reading off an (x, y) position on a grid.*

## 2. Polar Form

Look at the figure again. Instead of describing the point z by how far right and how far up it is, you can describe it by:

- **r** — the straight-line distance from the origin to the point
- **theta** — the angle that line makes with the positive real axis

These two quantities connect back to a and b through basic trigonometry:

- a = r cos theta (horizontal component)
- b = r sin theta (vertical component)

Substituting into z = a + jb gives the **polar form**: z = r(cos theta + j sin theta).

### WORKED EXAMPLE

For **z = 3 + 4j**:

1. r = sqrt(3² + 4²) = sqrt(9 + 16) = sqrt(25) = **5**
2. theta = tan⁻¹(4/3) ≈ **53.1°**

So z = 5(cos 53.1° + j sin 53.1°). Same point, different description.

#### Note
You do not need to memorize the inverse tangent value — knowing how to set up tan⁻¹(b/a) is enough for the exam.

$$a = r\cos\theta, \quad b = r\sin\theta, \quad z = a + jb = r(\cos\theta + j\sin\theta)$$
*This formula rewrites the same complex number using distance r and angle theta instead of horizontal and vertical coordinates, giving you two equivalent ways to describe the same point.*

$$e^{j\theta} = \cos\theta + j\sin\theta$$
*Euler's formula lets you replace the cosine-plus-j-sine pair with a single compact exponential, so the polar form z = r(cos theta + j sin theta) can be written as z = r e^{j theta} — for this section, recognizing this equivalence is all you need.*

## 3. The Map Analogy

Think of the complex plane as a city map. The **real axis runs East-West** and the **imaginary axis runs North-South**. When you write z = a + jb, you are giving directions the rectangular way: go **a blocks East** and **b blocks North** — and you have arrived at your destination.

Polar form gives the same location a different way: instead of East-then-North, you say **walk r blocks in the direction theta degrees from East**. Same spot on the map, just described by distance and compass bearing instead of two separate moves.

Both descriptions are equally valid. The exam may hand you one form and ask you to produce the other — the conversion formulas a = r cos theta and b = r sin theta are your translation tool.

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlY3Rhbmd1bGFyX2Zvcm1fcGFydHMiLCJsYWJlbCI6IklkZW50aWZ5IHJlY3Rhbmd1bGFyIGZvcm0gYW5kIHJlYWwvaW1hZ2luYXJ5IHBhcnRzIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeiA9IC0yICsgNWosIHdoaWNoIHN0YXRlbWVudCBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gUmUoeikgPSA1IGFuZCBJbSh6KSA9IC0yIiwiQi4gUmUoeikgPSAtMiBhbmQgSW0oeikgPSA1IiwiQy4gUmUoeikgPSAtMiArIDVqIGFuZCBJbSh6KSA9IDVqIiwiRC4gUmUoeikgPSAtMiBhbmQgSW0oeikgPSA1aiJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkluIHogPSBhICsgamIsIHRoZSByZWFsIHBhcnQgaXMgdGhlIGNvZWZmaWNpZW50IHdpdGhvdXQgaiBhbmQgdGhlIGltYWdpbmFyeSBwYXJ0IGlzIHRoZSBjb2VmZmljaWVudCBvZiBqLiBTbyBSZSh6KSA9IC0yIGFuZCBJbSh6KSA9IDUuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBzd2FwcyB0aGUgcmVhbCBhbmQgaW1hZ2luYXJ5IHBhcnRzLiIsIkMiOiJUaGUgcmVhbCBwYXJ0IGlzIG5vdCB0aGUgd2hvbGUgY29tcGxleCBudW1iZXIsIGFuZCB0aGUgaW1hZ2luYXJ5IHBhcnQgaXMgNSwgbm90IDVqLiIsIkQiOiJUaGUgaW1hZ2luYXJ5IHBhcnQgaXMgdGhlIGNvZWZmaWNpZW50IDUsIG5vdCB0aGUgdGVybSA1ai4ifSwiaGludCI6Ik1hdGNoIHogPSAtMiArIDVqIHRvIGEgKyBqYi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGNvbXBsZXggbnVtYmVyIGlzIHJlcHJlc2VudGVkIGJ5IHRoZSBwb2ludCAoNCwgLTMpIGluIHRoZSBjb21wbGV4IHBsYW5lPyIsIm9wdGlvbnMiOlsiQS4gNCArIDNqIiwiQi4gLTQgKyAzaiIsIkMuIDQgLSAzaiIsIkQuIC0zICsgNGoiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJUaGUgcG9pbnQgKGEsIGIpIGNvcnJlc3BvbmRzIHRvIHogPSBhICsgamIuIEhlcmUgYSA9IDQgYW5kIGIgPSAtMywgc28geiA9IDQgLSAzai4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIHVzZXMgdGhlIHdyb25nIHNpZ24gZm9yIHRoZSBpbWFnaW5hcnkgY29vcmRpbmF0ZS4iLCJCIjoiVGhpcyBjaGFuZ2VzIGJvdGggY29vcmRpbmF0ZXMgaW5jb3JyZWN0bHkuIiwiRCI6IlRoaXMgcmV2ZXJzZXMgdGhlIHJlYWwgYW5kIGltYWdpbmFyeSBjb29yZGluYXRlcy4ifSwiaGludCI6IkZpcnN0IGNvb3JkaW5hdGUgaXMgdGhlIHJlYWwgcGFydDsgc2Vjb25kIGNvb3JkaW5hdGUgaXMgdGhlIGltYWdpbmFyeSBwYXJ0LiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJjb21wbGV4X3BsYW5lX3BvaW50Iiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJwb2xhcl9yZWxhdGlvbnNoaXBzIiwibGFiZWwiOiJDb25uZWN0IHJlY3Rhbmd1bGFyIGFuZCBwb2xhciBkZXNjcmlwdGlvbnMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIGEgY29tcGxleCBudW1iZXIgaGFzIHBvbGFyIGNvb3JkaW5hdGVzIChyLCB0aGV0YSksIHdoaWNoIHBhaXIgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIGEgPSByIHNpbiB0aGV0YSwgYiA9IHIgY29zIHRoZXRhIiwiQi4gYSA9IHIgY29zIHRoZXRhLCBiID0gciBzaW4gdGhldGEiLCJDLiBhID0gY29zIHRoZXRhLCBiID0gc2luIHRoZXRhIiwiRC4gYSA9IHIgdGFuIHRoZXRhLCBiID0gciJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBob3Jpem9udGFsIGNvb3JkaW5hdGUgaXMgYSA9IHIgY29zIHRoZXRhIGFuZCB0aGUgdmVydGljYWwgY29vcmRpbmF0ZSBpcyBiID0gciBzaW4gdGhldGEuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBpbmNvcnJlY3RseSBzd2FwcyBjb3NpbmUgYW5kIHNpbmUuIiwiQyI6IlRoaXMgbGVhdmVzIG91dCB0aGUgbWFnbml0dWRlIHIuIiwiRCI6IlRoaXMgaXMgbm90IHRoZSByZWN0YW5ndWxhci1wb2xhciByZWxhdGlvbnNoaXAuIn0sImhpbnQiOiJUaGluayB4ID0gciBjb3MgdGhldGEgYW5kIHkgPSByIHNpbiB0aGV0YSBmcm9tIHBvbGFyIGNvb3JkaW5hdGVzLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHogPSAzICsgNGosIHdoYXQgaXMgdGhlIG1hZ25pdHVkZSByPyIsIm9wdGlvbnMiOlsiQS4gMSIsIkIuIDQiLCJDLiA1IiwiRC4gNyJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlRoZSBtYWduaXR1ZGUgaXMgdGhlIGRpc3RhbmNlIGZyb20gdGhlIG9yaWdpbjogciA9IHNxcnQoM14yICsgNF4yKSA9IHNxcnQoOSArIDE2KSA9IHNxcnQoMjUpID0gNS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIHdvdWxkIG9ubHkgYmUgdHJ1ZSBmb3IgYSBwb2ludCBvbiB0aGUgdW5pdCBjaXJjbGUuIiwiQiI6IjQgaXMgdGhlIGltYWdpbmFyeSBjb29yZGluYXRlLCBub3QgdGhlIG1hZ25pdHVkZS4iLCJEIjoiVGhpcyBhZGRzIGNvb3JkaW5hdGVzIGluc3RlYWQgb2YgdXNpbmcgdGhlIGRpc3RhbmNlIGZvcm11bGEuIn0sImhpbnQiOiJVc2UgdGhlIFB5dGhhZ29yZWFuIHRoZW9yZW0uIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImNvbXBsZXhfcGxhbmVfdHJpYW5nbGUiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImZvcm11bGFfcmVjb2duaXRpb24iLCJsYWJlbCI6IlJlY29nbml6ZSBzdGFuZGFyZCBmb3JtcyBpbmNsdWRpbmcgRXVsZXIncyBmb3JtdWxhIiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggZXhwcmVzc2lvbiBpcyBlcXVpdmFsZW50IHRvIHogaW4gcG9sYXIgZm9ybT8iLCJvcHRpb25zIjpbIkEuIHogPSByKGNvcyB0aGV0YSArIGogc2luIHRoZXRhKSIsIkIuIHogPSBhKGNvcyB0aGV0YSArIGogc2luIHRoZXRhKSIsIkMuIHogPSByKGEgKyBqYikiLCJELiB6ID0gZV57YSArIGpifSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlRoZSBzdGFuZGFyZCBwb2xhciBmb3JtIGlzIHogPSByKGNvcyB0aGV0YSArIGogc2luIHRoZXRhKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGUgc2NhbGluZyBmYWN0b3IgaXMgdGhlIG1hZ25pdHVkZSByLCBub3QgdGhlIHJlYWwgcGFydCBhLiIsIkMiOiJUaGlzIG1peGVzIHJlY3Rhbmd1bGFyIGFuZCBwb2xhciBzeW1ib2xzIGluY29ycmVjdGx5LiIsIkQiOiJUaGlzIGlzIG5vdCB0aGUgc3RhdGVkIHBvbGFyIGZvcm0uIn0sImhpbnQiOiJMb29rIGZvciBtYWduaXR1ZGUgdGltZXMgYW5nbGUgaW5mb3JtYXRpb24uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiU3RhdGUgRXVsZXIncyBmb3JtdWxhIGFuZCBzYXkgd2hhdCBpdCByZXBsYWNlcyBpbnNpZGUgdGhlIHBvbGFyIGZvcm0gb2YgYSBjb21wbGV4IG51bWJlci4iLCJpZGVhbF9hbnN3ZXIiOiJFdWxlcidzIGZvcm11bGEgaXMgZV57anRoZXRhfSA9IGNvcyB0aGV0YSArIGogc2luIHRoZXRhLiBJdCByZXBsYWNlcyB0aGUgY29zaW5lLXBsdXMtai1zaW5lIHBhcnQgb2YgdGhlIHBvbGFyIGZvcm0sIHNvIHogPSByKGNvcyB0aGV0YSArIGogc2luIHRoZXRhKSBjYW4gYmUgd3JpdHRlbiBtb3JlIGNvbXBhY3RseSB1c2luZyBlXntqdGhldGF9LiIsImdyYWRpbmdfcnVicmljIjpbIk11c3Qgc3RhdGUgZV57anRoZXRhfSA9IGNvcyB0aGV0YSArIGogc2luIHRoZXRhIGNvcnJlY3RseSIsIk11c3QgbWVudGlvbiB0aGF0IGl0IHJlcGxhY2VzIHRoZSBjb3MgdGhldGEgKyBqIHNpbiB0aGV0YSBmYWN0b3IiLCJDb21wYWN0IHdvcmRpbmcgaXMgZmluZTsgbm8gcHJvb2YgaXMgbmVlZGVkIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3MgcmVjb2duaXRpb24gb2YgdGhlIGZvcm11bGEgYW5kIGl0cyByb2xlIHdpdGhvdXQgZGVtYW5kaW5nIGEgZGVlcGVyIGRlcml2YXRpb24uIiwiaGludCI6IkZvY3VzIG9uIHRoZSBicmFja2V0ZWQgcGFydCBpbiByKGNvcyB0aGV0YSArIGogc2luIHRoZXRhKS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%

---
**📌 Key Takeaways**
- z = a + jb is rectangular form; a is the real part, b is the imaginary part.
- Re(z) = a and Im(z) = b — the imaginary part is b, never jb.
- Every complex number z = a + jb is a point (a, b) in the complex plane.
- Polar form uses distance r and angle theta: a = r cos theta, b = r sin theta.
- Full polar form: z = r(cos theta + j sin theta).
- Euler's formula: e^{j theta} = cos theta + j sin theta — recognize this compact form.
- Likely exam questions: identify Re(z) and Im(z); convert between rectangular and polar; compute magnitude r using the Pythagorean theorem; recognize Euler's formula.

*In the next section we will build on this representation to do more with complex numbers.*
