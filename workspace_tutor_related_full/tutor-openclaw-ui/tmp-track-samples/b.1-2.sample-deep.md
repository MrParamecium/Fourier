# B.1-2 Algebra of Complex Numbers

> **Objective:** Read z = a + jb correctly, connect it to a point on the plane, and rewrite the same number in polar form r(cosθ + j sinθ).

Complex numbers are not an end goal — they are a powerful shortcut. Engineers use them because many real-world problems (signals, circuits, oscillations) become far easier to manipulate when expressed in complex form, then converted back to real results at the end.

Start with a concrete example: **z = 3 + 4j**. Here, a = 3 (real part), b = 4 (imaginary part), and r = 5 (magnitude — the distance from the origin). In this section you will do three things: read z = a + jb correctly, connect it to the point (a, b) on the complex plane, and rewrite the same number in polar form r(cosθ + j sinθ).

> **Exam relevance:** Students frequently lose points by writing Im(z) = 4j instead of Im(z) = 4, or by confusing r = 5 with a = 3. Both traps appear in this section.

![Fig. B.2](/figures/page-005-fig__b_2-1.png)
*Fig. B.2 summarizes the entire section in one diagram: the complex number z = a + jb sits at coordinates (a, b), its magnitude r and angle θ describe the same point in polar form, and its conjugate z* = a − jb appears as the mirror reflection directly below the real axis.*

## 1. Rectangular Form: What z = a + jb Actually Tells You

Start with **z = 3 + 4j**.

- **Real part:** Re(z) = 3 — the horizontal coordinate.
- **Imaginary part:** Im(z) = 4 — the vertical coordinate. Note carefully: the imaginary part is **4**, not **4j**. The imaginary part is the *coefficient* of j, not the full term.
- **Plotted point:** (3, 4) on the complex plane.
- **Imaginary term:** 4j — this is the full term in the expression, but it is not what Im(z) equals.

### EXAM TRAP

Im(z) = b, never jb. The symbol j is the axis marker; it is not included in the value of the imaginary part.

Generalizing: for **z = a + jb**, the horizontal coordinate is a (the *abscissa*, or x-value) and the vertical coordinate is b (the *ordinate*, or y-value). All real numbers (b = 0) lie on the horizontal axis; all pure imaginary numbers (a = 0) lie on the vertical axis.

#### Worked Example

For **z = −2 + 5j**:
- Re(z) = −2
- Im(z) = 5 (not 5j)
- Plotted point: (−2, 5) — second quadrant, since the real part is negative and the imaginary part is positive.

$$z = a + jb, \qquad \operatorname{Re}(z) = a, \qquad \operatorname{Im}(z) = b$$
*Rectangular form packages the horizontal coordinate a and vertical coordinate b into a single expression. The imaginary part is b — a plain real number — not jb; including j in the imaginary part is one of the most common exam errors.*

## 2. Polar Form: Relating a, b, r, and θ

Return to **z = 3 + 4j**. Draw a right triangle from the origin to the point (3, 4): the horizontal leg is a = 3, the vertical leg is b = 4, and the hypotenuse is r.

From basic trigonometry:
1. **a = r cosθ** — the horizontal leg equals the hypotenuse times cosine of the angle.
2. **b = r sinθ** — the vertical leg equals the hypotenuse times sine of the angle.

Substitute both into z = a + jb:

z = r cosθ + j(r sinθ) = **r(cosθ + j sinθ)**

This is the polar form. For z = 3 + 4j:
- a = 3, b = 4
- r = √(3² + 4²) = √25 = **5**
- Note: **r = 5 ≠ a = 3**. The magnitude is the full hypotenuse, not just the horizontal leg.

### COMMON MISTAKE

r is the distance from the origin to the point. a is only the horizontal coordinate. They are equal only when b = 0.

#### Worked Example

For **z = −2 + 2j**: a = −2, b = 2.
- r = √((−2)² + 2²) = √(4 + 4) = √8 = **2√2**
- Since a < 0 and b > 0, the point is in **Quadrant II**, so θ is between 90° and 180°.

**Core takeaway:** Polar form and rectangular form describe the same point — one uses (a, b), the other uses (r, θ).

$$a = r\cos\theta, \qquad b = r\sin\theta, \qquad z = r(\cos\theta + j\sin\theta)$$
*These three equations connect the rectangular coordinates (a, b) and the polar coordinates (r, θ) of the exact same complex number. Remember: r is the distance from the origin to the point, while a is only the horizontal coordinate — they are not the same quantity.*

## 3. Euler Form and Conjugates

### EULER'S FORMULA

Euler's formula states:

**e^{jθ} = cosθ + j sinθ**

This is not a definition to memorize blindly — it is a compact identity. Substituting it directly into the polar form:

z = r(cosθ + j sinθ) = **re^{jθ}**

Euler form is simply a shorthand for polar form. Same number, more compact notation.

---

### CONJUGATES: REFLECTION ACROSS THE REAL AXIS

If z = a + jb, then its **complex conjugate** is z* = a − jb. The real part stays the same; only the sign of the imaginary part flips.

Geometrically (see Fig. B.2): z* is the mirror image of z reflected across the real (horizontal) axis.

#### Worked Example

For **z = 2 − 3j**: z* = 2 + 3j.
- z = (2, −3) lies in Quadrant IV (positive real, negative imaginary).
- z* = (2, +3) lies in Quadrant I — directly above z, mirrored across the real axis.

### EXAM TIP

Conjugate questions often test sign discipline. Only the imaginary part changes sign. The real part and the magnitude r are unchanged.

---

**Formula Reference:**
- Rectangular: z = a + jb
- Polar: z = r(cosθ + j sinθ)
- Euler: z = re^{jθ}
- Conjugate: z* = a − jb

$$e^{j\theta} = \cos\theta + j\sin\theta, \qquad z = re^{j\theta}, \qquad z^* = a - jb$$
*Euler form is a compact rewrite of polar form — replacing cosθ + j sinθ with e^{jθ} changes the notation, not the number. Conjugation reflects a point across the real axis by reversing only the sign of the imaginary part, leaving the real part and magnitude r completely unchanged.*

---
**📌 Key Takeaways**
- **Rectangular form:** z = a + jb; Re(z) = a, Im(z) = b (never jb); plotted point is (a, b).
- **Polar relations:** a = r cosθ, b = r sinθ; magnitude r = √(a² + b²) is NOT the same as the real part a.
- **Euler shortcut:** e^{jθ} = cosθ + j sinθ, so z = r(cosθ + j sinθ) = re^{jθ} — same number, compact form.
- **Conjugate rule:** z* = a − jb; only the imaginary sign flips; geometrically a reflection across the real axis.
- 
- ---
- 
- **Formula Reference Box:**
- 
- | Form | Expression |
- |------|------------|
- | Rectangular | z = a + jb |
- | Polar | z = r(cosθ + j sinθ) |
- | Euler | z = re^{jθ} |
- | Conjugate | z* = a − jb |
- | Magnitude | r = √(a² + b²) |
- | Coordinates | a = r cosθ, b = r sinθ |
- 
- ---
- 
- **Three Critical Takeaways:**
- 
- - Im(z) = b, not jb — the imaginary part is a real number, the coefficient of j.
- - r is the distance from the origin; a is only the horizontal coordinate — they differ unless b = 0.
- - Conjugation flips only the imaginary sign; real part and magnitude stay the same.
- 
- In the next section we will build on these forms to do more advanced operations efficiently.

*In the next section we will build on these forms to do more advanced operations efficiently.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlY3Rhbmd1bGFyX3BhcnRzIiwibGFiZWwiOiJJZGVudGlmeSByZWFsIHBhcnQsIGltYWdpbmFyeSBwYXJ0LCBhbmQgcGxvdHRlZCBwb2ludCBmcm9tIHogPSBhICsgamIiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciB6ID0gLTQgKyA3aiwgd2hpY2ggc3RhdGVtZW50IGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBSZSh6KSA9IC00IGFuZCBJbSh6KSA9IDciLCJCLiBSZSh6KSA9IC00IGFuZCBJbSh6KSA9IDdqIiwiQy4gUmUoeikgPSA3IGFuZCBJbSh6KSA9IC00IiwiRC4gVGhlIHBvaW50IGlzICg3LCAtNCkiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJJbiB6ID0gYSArIGpiLCB0aGUgcmVhbCBwYXJ0IGlzIHRoZSBjb2VmZmljaWVudCBvbiB0aGUgaG9yaXpvbnRhbCBheGlzLCBhbmQgdGhlIGltYWdpbmFyeSBwYXJ0IGlzIHRoZSBjb2VmZmljaWVudCBvZiBqLiBTbyBSZSh6KSA9IC00IGFuZCBJbSh6KSA9IDcuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiN2ogaXMgdGhlIGltYWdpbmFyeSB0ZXJtLCBub3QgdGhlIGltYWdpbmFyeSBwYXJ0IGl0c2VsZi4iLCJDIjoiVGhpcyBzd2FwcyB0aGUgcmVhbCBhbmQgaW1hZ2luYXJ5IGNvb3JkaW5hdGVzLiIsIkQiOiJUaGUgcGxvdHRlZCBwb2ludCBpcyAoYSxiKSA9ICgtNCw3KSwgbm90ICg3LC00KS4ifSwiaGludCI6IlJlYWQgeiA9IGEgKyBqYiBhcyBob3Jpem9udGFsIGNvb3JkaW5hdGUgZmlyc3QsIHZlcnRpY2FsIGNvZWZmaWNpZW50IHNlY29uZC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkEgc3R1ZGVudCBzYXlzOiAnRm9yIHogPSA1IC0gMmosIHRoZSBpbWFnaW5hcnkgcGFydCBpcyAtMmouJyBFeHBsYWluIHByZWNpc2VseSB3aGF0IGlzIHdyb25nIHdpdGggdGhhdCBzdGF0ZW1lbnQuIiwiaWRlYWxfYW5zd2VyIjoiVGhlIGltYWdpbmFyeSBwYXJ0IGlzIHRoZSByZWFsLW51bWJlciBjb2VmZmljaWVudCBvZiBqLCBzbyBJbSh6KSA9IC0yLiBUaGUgdGVybSAtMmogYXBwZWFycyBpbiB0aGUgZXhwcmVzc2lvbiwgYnV0IGl0IGlzIG5vdCB0aGUgaW1hZ2luYXJ5IHBhcnQgaXRzZWxmLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3Qgc3RhdGUgdGhhdCBJbSh6KSA9IC0yIiwiTXVzdCBkaXN0aW5ndWlzaCBpbWFnaW5hcnkgcGFydCBmcm9tIGltYWdpbmFyeSB0ZXJtIiwiTXVzdCBtZW50aW9uIHRoYXQgaiBpcyBub3QgaW5jbHVkZWQgaW4gdGhlIHZhbHVlIG9mIHRoZSBpbWFnaW5hcnkgcGFydCJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHRoZSBjb21tb24gZXhhbSB0cmFwIGJldHdlZW4gdGhlIGNvZWZmaWNpZW50IGFuZCB0aGUgZnVsbCB0ZXJtLiIsImhpbnQiOiJTZXBhcmF0ZSAnY29lZmZpY2llbnQgb2YgaicgZnJvbSAndGVybSBjb250YWluaW5nIGonLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoicmVjdGFuZ3VsYXJfdG9fcG9sYXJfcmVsYXRpb25zIiwibGFiZWwiOiJVc2UgYSA9IHIgY29zzrggYW5kIGIgPSByIHNpbs64IHdpdGhvdXQgY29uZnVzaW5nIHIgYW5kIGEiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgY29tcGxleCBudW1iZXIgaGFzIHJlY3Rhbmd1bGFyIGZvcm0geiA9IDMgKyA0ai4gV2hpY2ggc3RhdGVtZW50IGlzIHRydWU/Iiwib3B0aW9ucyI6WyJBLiByID0gMyBiZWNhdXNlIHRoZSByZWFsIHBhcnQgaXMgMyIsIkIuIHIgPSA0IGJlY2F1c2UgdGhlIGltYWdpbmFyeSBwYXJ0IGlzIDQiLCJDLiByID0gNSwgd2hpbGUgYSA9IDMiLCJELiBhID0gNSwgd2hpbGUgciA9IDMiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJGb3IgeiA9IDMgKyA0aiwgdGhlIG1hZ25pdHVkZSBpcyByID0gc3FydCgzXjIgKyA0XjIpID0gNSwgd2hpbGUgdGhlIHJlYWwgcGFydCBpcyBhID0gMy4gVGhpcyBkaXJlY3RseSB0ZXN0cyB0aGUgZGlzdGluY3Rpb24gYmV0d2VlbiBtYWduaXR1ZGUgYW5kIGhvcml6b250YWwgY29vcmRpbmF0ZS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGUgcmVhbCBwYXJ0IGlzIG5vdCB0aGUgbWFnbml0dWRlIHVubGVzcyB0aGUgcG9pbnQgbGllcyBvbiB0aGUgcmVhbCBheGlzLiIsIkIiOiJUaGUgaW1hZ2luYXJ5IHBhcnQgaXMgbm90IHRoZSBtYWduaXR1ZGUgZWl0aGVyLiIsIkQiOiJUaGlzIHJldmVyc2VzIHRoZSBtZWFuaW5ncyBvZiBhIGFuZCByLiJ9LCJoaW50IjoiTWFnbml0dWRlIG1lYW5zIGRpc3RhbmNlIGZyb20gdGhlIG9yaWdpbi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIGEgcG9pbnQgaW4gdGhlIGNvbXBsZXggcGxhbmUgaGFzIHBvbGFyIGRhdGEgKHIsIM64KSwgd2hpY2ggcGFpciBtdXN0IGJlIGl0cyByZWN0YW5ndWxhciBjb29yZGluYXRlcz8iLCJvcHRpb25zIjpbIkEuIChyIHNpbs64LCByIGNvc864KSIsIkIuIChyIGNvc864LCByIHNpbs64KSIsIkMuIChjb3POuCwgc2luzrgpIiwiRC4gKHIsIM64KSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBob3Jpem9udGFsIGNvb3JkaW5hdGUgaXMgYSA9IHIgY29zzrggYW5kIHRoZSB2ZXJ0aWNhbCBjb29yZGluYXRlIGlzIGIgPSByIHNpbs64LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgc3dhcHMgdGhlIHgtIGFuZCB5LWNvb3JkaW5hdGUgcm9sZXMuIiwiQyI6IlRoaXMgd291bGQgb25seSBmaXQgdGhlIHVuaXQgY2lyY2xlIHdoZXJlIHIgPSAxLiIsIkQiOiJQb2xhciBjb29yZGluYXRlcyBhcmUgbm90IENhcnRlc2lhbiBjb29yZGluYXRlcy4ifSwiaGludCI6IkNvc2luZSBnb2VzIHdpdGggaG9yaXpvbnRhbCwgc2luZSB3aXRoIHZlcnRpY2FsLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJweXRob25fbWF0cGxvdGxpYiBjb21wbGV4LXBsYW5lIHBvaW50IHdpdGggcmFkaXVzIGFuZCBhbmdsZSIsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDJfcTMiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciB6ID0gLTIgKyAyaiwgd2hpY2ggb3B0aW9uIGNvcnJlY3RseSBpZGVudGlmaWVzIHRoZSBtYWduaXR1ZGUgYW5kIHF1YWRyYW50PyIsIm9wdGlvbnMiOlsiQS4gciA9IDIsIFF1YWRyYW50IEkiLCJCLiByID0gMnNxcnQoMiksIFF1YWRyYW50IElJIiwiQy4gciA9IDQsIFF1YWRyYW50IElJIiwiRC4gciA9IDJzcXJ0KDIpLCBRdWFkcmFudCBJViJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkhlcmUgYSA9IC0yIGFuZCBiID0gMiwgc28gciA9IHNxcnQoKC0yKV4yICsgMl4yKSA9IHNxcnQoOCkgPSAyc3FydCgyKS4gTmVnYXRpdmUgcmVhbCBhbmQgcG9zaXRpdmUgaW1hZ2luYXJ5IHBsYWNlIHRoZSBwb2ludCBpbiBRdWFkcmFudCBJSS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGUgbWFnbml0dWRlIGlzIG5vdCBmb3VuZCBieSByZWFkaW5nIG9uZSBjb29yZGluYXRlIG9ubHksIGFuZCB0aGUgc2lnbiBwYXR0ZXJuIGlzIG5vdCBRdWFkcmFudCBJLiIsIkMiOiJNYWduaXR1ZGUgaXMgc3FydCg4KSwgbm90IDQuIiwiRCI6IlF1YWRyYW50IElWIHdvdWxkIHJlcXVpcmUgcG9zaXRpdmUgcmVhbCBhbmQgbmVnYXRpdmUgaW1hZ2luYXJ5LiJ9LCJoaW50IjoiVXNlIGJvdGggY29vcmRpbmF0ZXM6IG9uZSBmb3IgZGlzdGFuY2UsIG9uZSBmb3IgcXVhZHJhbnQuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJldWxlcl9hbmRfY29uanVnYXRlIiwibGFiZWwiOiJDb252ZXJ0IHBvbGFyIGZvcm0gdG8gRXVsZXIgZm9ybSBhbmQgaW50ZXJwcmV0IGNvbmp1Z2F0ZXMgZ2VvbWV0cmljYWxseSIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IlVzaW5nIEV1bGVyJ3MgZm9ybXVsYSwgd2hpY2ggZXhwcmVzc2lvbiBpcyBlcXVpdmFsZW50IHRvIHIoY29zzrggKyBqIHNpbs64KT8iLCJvcHRpb25zIjpbIkEuIHJlzrgiLCJCLiByas64IiwiQy4gcmVee2rOuH0iLCJELiBlXntyzrh9Il0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiRXVsZXIncyBmb3JtdWxhIHNheXMgZV57as64fSA9IGNvc864ICsgaiBzaW7OuCwgc28gbXVsdGlwbHlpbmcgYnkgciBnaXZlcyB6ID0gcmVee2rOuH0uIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlIGV4cG9uZW50IG11c3QgaW5jbHVkZSBqIGZvciB0aGUgY29tcGxleC1hbmdsZSBmb3JtLiIsIkIiOiJUaGlzIGlzIG5vdCBleHBvbmVudGlhbCBub3RhdGlvbi4iLCJEIjoiVGhpcyBjaGFuZ2VzIGJvdGggdGhlIGJhc2UgZXhwcmVzc2lvbiBhbmQgdGhlIHJvbGUgb2Ygci4ifSwiaGludCI6IlJlcGxhY2UgY29zzrggKyBqIHNpbs64IHdpdGggdGhlIGV4YWN0IEV1bGVyIGlkZW50aXR5LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIHogPSAyIC0gM2osIHdoYXQgaXMgaXRzIGNvbXBsZXggY29uanVnYXRlIGFuZCB3aGF0IGdlb21ldHJpYyBjaGFuZ2UgZG9lcyBpdCByZXByZXNlbnQ/Iiwib3B0aW9ucyI6WyJBLiB6KiA9IC0yICsgM2o7IHJlZmxlY3Rpb24gYWNyb3NzIHRoZSBpbWFnaW5hcnkgYXhpcyIsIkIuIHoqID0gMiArIDNqOyByZWZsZWN0aW9uIGFjcm9zcyB0aGUgcmVhbCBheGlzIiwiQy4geiogPSAtMiAtIDNqOyByb3RhdGlvbiBieSAxODAgZGVncmVlcyIsIkQuIHoqID0gMiArIDNqOyByZWZsZWN0aW9uIGFjcm9zcyB0aGUgaW1hZ2luYXJ5IGF4aXMiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJDb25qdWdhdGlvbiBrZWVwcyB0aGUgcmVhbCBwYXJ0IGZpeGVkIGFuZCByZXZlcnNlcyB0aGUgc2lnbiBvZiB0aGUgaW1hZ2luYXJ5IHBhcnQuIFNvIDIgLSAzaiBiZWNvbWVzIDIgKyAzaiwgd2hpY2ggaXMgYSByZWZsZWN0aW9uIGFjcm9zcyB0aGUgcmVhbCBheGlzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkNoYW5naW5nIHRoZSBzaWduIG9mIHRoZSByZWFsIHBhcnQgd291bGQgcmVmbGVjdCBhY3Jvc3MgdGhlIGltYWdpbmFyeSBheGlzLCBub3QgY29uanVnYXRlLiIsIkMiOiJDaGFuZ2luZyBib3RoIHNpZ25zIGdpdmVzIHRoZSBvcHBvc2l0ZSBwb2ludCwgbm90IHRoZSBjb25qdWdhdGUuIiwiRCI6IlRoZSByZXN1bHQgaXMgY29ycmVjdCwgYnV0IHRoZSBnZW9tZXRyaWMgaW50ZXJwcmV0YXRpb24gaXMgd3JvbmcuIn0sImhpbnQiOiJPbmx5IHRoZSBqLXRlcm0gY2hhbmdlcyBzaWduIHVuZGVyIGNvbmp1Z2F0aW9uLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJweXRob25fbWF0cGxvdGxpYiBjb21wbGV4IHBsYW5lIHNob3dpbmcgeiBhbmQgeiogcmVmbGVjdGVkIGFjcm9zcyByZWFsIGF4aXMiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX1dfQ==" style="display:none;"></div>%%KC_END%%
