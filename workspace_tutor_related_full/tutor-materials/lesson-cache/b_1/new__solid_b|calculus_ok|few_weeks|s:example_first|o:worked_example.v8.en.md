# B.1 Complex Numbers — A Practical Review

> **Section Objective:** Build a working toolkit for complex numbers — reading them, converting between forms, and avoiding the angle mistakes that cost exam points.

Start with a concrete picture: **z = 3 + 4j** means 3 units along the real (horizontal) axis and 4 units along the imaginary (vertical) axis. That's it — a point on a 2D plane.

This section is a focused review, not a history lesson. We will cover four things you need cold for signals and systems:

1. **Rectangular form** — reading Re(z), Im(z), and the conjugate
2. **Polar and exponential form** — computing magnitude r and angle θ
3. **Converting** between the two forms in both directions
4. **Angle traps** — why your calculator's arctan can give the wrong quadrant

If you can read a point off the complex plane, convert it to polar form, and write its conjugate without hesitation, you are ready for everything that follows.

![Fig. B.2](/figures/page-005-fig__b_2-1.png)
*Fig. B.2 — One diagram connects everything: the point (a, b) gives rectangular form, the arrow gives magnitude r and angle θ for polar form, and the reflected point below the real axis is the conjugate z* = a − jb.*

## 1. Reading a Complex Number on the Complex Plane

Let's start with **z = 3 + 4j** before stating any rule.

- The real part is **3** — how far right along the horizontal axis.
- The imaginary part is **4** — how far up along the vertical axis.
- The point is plotted at **(3, 4)** on the complex plane.
- The conjugate is **z* = 3 − 4j** — the mirror image reflected across the real axis (same x-coordinate, sign of y flipped).

### GENERAL RULE

For **z = a + jb**: Re(z) = a, Im(z) = b, plotted at (a, b), conjugate z* = a − jb.

> **Exam Trap:** The imaginary part is **b**, not **jb**. Im(z) is a real number — the coefficient of j, stripped of the j itself.

---

### WORKED EXAMPLE — z = 5 − 2j

| Step | Result |
|------|--------|
| Real part Re(z) | 5 |
| Imaginary part Im(z) | −2 (not −2j) |
| Plot location | (5, −2) → Quadrant IV |
| Conjugate z* | 5 + 2j (flip sign of imaginary part only) |

#### Note
The point (5, −2) is in Quadrant IV because the real part is positive and the imaginary part is negative. The conjugate lands at (5, +2), which is the mirror image across the real axis.

$$z = a + jb, \quad \mathrm{Re}(z)=a, \quad \mathrm{Im}(z)=b, \quad z^* = a-jb$$
*Rectangular form directly reads off the horizontal component a and vertical component b; conjugation leaves the real part untouched and flips only the sign of the imaginary component.*

## 2. Converting Between Rectangular and Polar Form

Let's work through **z = 2 + 3j** step by step before stating the general rule.

### WORKED EXAMPLE — z = 2 + 3j

**Step 1 — Magnitude:**
$$r = \sqrt{2^2 + 3^2} = \sqrt{4 + 9} = \sqrt{13} \approx 3.606$$

**Step 2 — Angle (Quadrant I, so arctan is safe):**
$$\theta = \tan^{-1}\!\left(\frac{3}{2}\right) \approx 56.3°$$

**Step 3 — Write in polar/exponential form:**
$$z = \sqrt{13}\,e^{j56.3°} = \sqrt{13}\,(\cos 56.3° + j\sin 56.3°)$$

---

### GENERAL RULE

Given z = a + jb:
- **Magnitude:** r = √(a² + b²)
- **Angle:** θ = arctan(b/a), *corrected for quadrant* (see Section 3)
- **Polar form:** z = r(cos θ + j sin θ)
- **Exponential form:** z = re^(jθ)

**Euler's formula in plain language:** e^(jθ) is simply a compact shorthand that packages cos θ and sin θ together into one symbol. It is not magic — it is notation.

To go **back** from polar to rectangular: a = r cos θ and b = r sin θ.

> **Exam Warning:** If the point is not in Quadrant I, your calculator's arctan will return the wrong angle. The signs of a and b tell you which quadrant the point is in — you must use that information to correct the angle. This is covered in detail in Section 3.

$$a = r\cos\theta, \quad b = r\sin\theta, \quad z = a+jb = r(\cos\theta + j\sin\theta) = re^{j\theta}$$
*This single formula shows the same complex number written two ways: as coordinate components (a, b) on the left, and as a magnitude r with direction angle θ on the right.*

![unknown](/figures/page-009-unknown-1.png)
*Argand diagrams for 2+j3, −2+j1, −2−j3, and 1−j3: the magnitude r is always the length of the arrow from the origin, but the angle θ must be read from the correct quadrant — notice how the angles for the third-quadrant and fourth-quadrant points are negative or greater than 90°.*

## 3. Angle Traps, Useful Identities, and Polar-to-Cartesian Reading

### THE QUADRANT TRAP

Consider **z = −2 − 3j**. A naive calculator computation gives:
$$\tan^{-1}\!\left(\frac{-3}{-2}\right) = \tan^{-1}(1.5) \approx 56.3°$$

But that is **wrong**. The point (−2, −3) sits in **Quadrant III** — both coordinates are negative. The angle 56.3° points into Quadrant I, which is the opposite direction.

The correct angle is:
$$\theta = 56.3° - 180° = -123.7° \quad \text{(principal value)}$$
or equivalently 236.3° if you prefer a positive angle.

### GENERAL EXAM RULE

> **Always check the signs of a and b first.** Use arctan only to find the *reference angle* (the acute angle to the nearest horizontal axis). Then place the angle in the correct quadrant:
> - Quadrant I: θ = arctan(b/a) — use directly
> - Quadrant II: θ = 180° + arctan(b/a)
> - Quadrant III: θ = 180° + arctan(b/a) (or subtract 180° for principal value)
> - Quadrant IV: θ = arctan(b/a) — result is negative, which is correct

---

### USEFUL UNIT-CIRCLE IDENTITIES

Angles are only defined up to multiples of 2π (360°). These four identities are worth memorizing:

| Expression | Value | Why |
|------------|-------|-----|
| e^(j·2πn) | 1 | Angle 0°, points right |
| e^(j(π + 2πn)) | −1 | Angle 180°, points left |
| e^(j(π/2 + 2πn)) | j | Angle 90°, points up |
| e^(j(−π/2 + 2πn)) | −j | Angle −90°, points down |

---

### QUICK POLAR-TO-CARTESIAN READ-BACK

Example: **2e^(jπ/2)**
$$a = 2\cos(90°) = 0, \quad b = 2\sin(90°) = 2$$
$$\Rightarrow 2e^{j\pi/2} = 2j$$

The magnitude scales the unit-circle point; the angle tells you which direction.

$$1=e^{j2\pi n}, \quad -1=e^{j(\pi+2\pi n)}, \quad j=e^{j(\pi/2+2\pi n)}, \quad -j=e^{j(-\pi/2+2\pi n)}$$
*Each identity is simply a unit-length point on the complex plane (r = 1) written in exponential form, with the ±2πn term acknowledging that adding any whole number of full rotations lands you at the same point.*

---
**📌 Key Takeaways**
- z = a + jb: Re(z) = a, Im(z) = b (not jb), conjugate z* flips the sign of b only.
- Convert to polar with r = √(a²+b²) and θ = arctan(b/a) corrected for the right quadrant.
- Arctan alone is unreliable — always check the signs of a and b to confirm the quadrant.

*In the next section we will build on this notation to do more with complex-number operations.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlY3Rhbmd1bGFyX3BhcnRzX2FuZF9jb25qdWdhdGUiLCJsYWJlbCI6IlJlYWRpbmcgcmVhbCBwYXJ0LCBpbWFnaW5hcnkgcGFydCwgcG9pbnQgbG9jYXRpb24sIGFuZCBjb25qdWdhdGUiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciB6ID0gNSAtIDJqLCB3aGljaCBzdGF0ZW1lbnQgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIFJlKHopID0gLTIgYW5kIEltKHopID0gNSIsIkIuIFJlKHopID0gNSBhbmQgSW0oeikgPSAtMiIsIkMuIFJlKHopID0gNSBhbmQgSW0oeikgPSAtMmoiLCJELiB6KiA9IC01ICsgMmoiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJJbiB6ID0gYSArIGpiLCB0aGUgcmVhbCBwYXJ0IGlzIHRoZSBjb2VmZmljaWVudCB3aXRob3V0IGogYW5kIHRoZSBpbWFnaW5hcnkgcGFydCBpcyB0aGUgY29lZmZpY2llbnQgb2Ygai4gU28gUmUoeikgPSA1IGFuZCBJbSh6KSA9IC0yLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgc3dhcHMgdGhlIHJlYWwgYW5kIGltYWdpbmFyeSBwYXJ0cy4iLCJDIjoiVGhlIGltYWdpbmFyeSBwYXJ0IGlzIHRoZSByZWFsIGNvZWZmaWNpZW50IC0yLCBub3QgdGhlIGZ1bGwgdGVybSAtMmouIiwiRCI6IlRoZSBjb25qdWdhdGUgY2hhbmdlcyBvbmx5IHRoZSBzaWduIG9mIHRoZSBpbWFnaW5hcnkgdGVybSwgc28geiogPSA1ICsgMmouIn0sImhpbnQiOiJTZXBhcmF0ZSB0aGUgcGxhaW4gbnVtYmVyIGZyb20gdGhlIGNvZWZmaWNpZW50IG9mIGouIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJZiB6ID0gLTMgKyA0aiwgd2hpY2ggcG9pbnQgYW5kIGNvbmp1Z2F0ZSBhcmUgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIFBvaW50ICgtMywgNCksIGNvbmp1Z2F0ZSAtMyAtIDRqIiwiQi4gUG9pbnQgKDQsIC0zKSwgY29uanVnYXRlIDMgKyA0aiIsIkMuIFBvaW50ICgtMywgNCksIGNvbmp1Z2F0ZSAzIC0gNGoiLCJELiBQb2ludCAoMywgLTQpLCBjb25qdWdhdGUgLTMgLSA0aiJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlRoZSBwb2ludCBpcyBwbG90dGVkIGFzIChyZWFsIHBhcnQsIGltYWdpbmFyeSBwYXJ0KSA9ICgtMywgNCkuIFRoZSBjb25qdWdhdGUgZmxpcHMgdGhlIHNpZ24gb2YgdGhlIGltYWdpbmFyeSBwYXJ0IG9ubHksIGdpdmluZyAtMyAtIDRqLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoaXMgcmV2ZXJzZXMgdGhlIGNvb3JkaW5hdGVzIGFuZCBnaXZlcyB0aGUgd3JvbmcgY29uanVnYXRlLiIsIkMiOiJUaGUgcmVhbCBwYXJ0IGRvZXMgbm90IGNoYW5nZSB1bmRlciBjb25qdWdhdGlvbi4iLCJEIjoiQm90aCBjb29yZGluYXRlcyBhcmUgaW5jb3JyZWN0IGZvciB6ID0gLTMgKyA0ai4ifSwiaGludCI6IlBsb3QgYXMgKGEsIGIpLCB0aGVuIHJlZmxlY3QgYWNyb3NzIHRoZSByZWFsIGF4aXMgZm9yIHRoZSBjb25qdWdhdGUuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImNvbXBsZXhfcGxhbmVfcG9pbnRfYW5kX2Nvbmp1Z2F0ZSIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoicmVjdGFuZ3VsYXJfdG9fcG9sYXIiLCJsYWJlbCI6IkNvbXB1dGluZyBtYWduaXR1ZGUgYW5kIGFuZ2xlIGZyb20gYSArIGpiIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGF0IGlzIHRoZSBwb2xhci9leHBvbmVudGlhbCBmb3JtIG9mIHogPSAyICsgM2osIHVzaW5nIHRoZSBwcmluY2lwYWwgYW5nbGUgaW4gZGVncmVlcz8iLCJvcHRpb25zIjpbIkEuIHNxcnQoMTMpIGVeKGogNTYuM8KwKSIsIkIuIDUgZV4oaiAzMy43wrApIiwiQy4gc3FydCgxMykgZV4oaiAzMy43wrApIiwiRC4gMTMgZV4oaiA1Ni4zwrApIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiTWFnbml0dWRlIGlzIHNxcnQoMsKyICsgM8KyKSA9IHNxcnQoMTMpLCBhbmQgYW5nbGUgaXMgdGFu4oG7wrkoMy8yKSDiiYggNTYuM8KwIGluIFF1YWRyYW50IEkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhlIG1hZ25pdHVkZSBpcyBub3QgNSAodGhhdCB3b3VsZCBiZSBzcXJ0KDI1KSksIGFuZCB0aGUgYW5nbGUgaXMgYWxzbyBpbmNvcnJlY3QuIiwiQyI6IjMzLjfCsCBpcyBub3QgdGFu4oG7wrkoMy8yKTsgdGhhdCBhbmdsZSBjb3JyZXNwb25kcyB0byB0YW7igbvCuSgyLzMpLiIsIkQiOiIxMyBpcyB8enzCsiwgbm90IHx6fC4gWW91IG11c3QgdGFrZSB0aGUgc3F1YXJlIHJvb3QuIn0sImhpbnQiOiJGaXJzdCBjb21wdXRlIHIgPSBzcXJ0KGHCsiArIGLCsiksIHRoZW4gY29tcHV0ZSDOuCA9IHRhbuKBu8K5KGIvYSkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQ29udmVydCB6ID0gMSAtIGozIHRvIHBvbGFyL2V4cG9uZW50aWFsIGZvcm0gdXNpbmcgdGhlIHByaW5jaXBhbCBhbmdsZSBpbiBkZWdyZWVzLiBTaG93IHRoZSBrZXkgc3RlcHMuIiwiaWRlYWxfYW5zd2VyIjoiTWFnbml0dWRlIHIgPSBzcXJ0KDHCsiArICgtMynCsikgPSBzcXJ0KDEwKS4gVGhlIHBvaW50ICgxLCAtMykgaXMgaW4gUXVhZHJhbnQgSVYsIHNvIM64ID0gdGFu4oG7wrkoLTMvMSkg4omIIC03MS42wrAuIFRoZXJlZm9yZSB6ID0gc3FydCgxMCkgZV4oLWogNzEuNsKwKS4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IGNvbXB1dGUgbWFnbml0dWRlIGFzIHNxcnQoMTApIiwiTXVzdCBpZGVudGlmeSBRdWFkcmFudCBJViBvciBvdGhlcndpc2UganVzdGlmeSB0aGUgbmVnYXRpdmUgYW5nbGUiLCJNdXN0IGdpdmUgYW5nbGUgYXBwcm94aW1hdGVseSAtNzEuNsKwIiwiTXVzdCB3cml0ZSBmaW5hbCBmb3JtIGFzIHNxcnQoMTApIGVeKC1qIDcxLjbCsCkgb3IgYW4gZXF1aXZhbGVudCBwb2xhciBmb3JtIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCBjYW4gcGVyZm9ybSB0aGUgc3RhbmRhcmQgY29udmVyc2lvbiBhbmQgaGFuZGxlIGEgbmVnYXRpdmUgaW1hZ2luYXJ5IHBhcnQgY29ycmVjdGx5LiIsImhpbnQiOiJVc2UgciA9IHNxcnQoYcKyICsgYsKyKSwgdGhlbiBkZXRlcm1pbmUgdGhlIGFuZ2xlIGZyb20gYm90aCBhcmN0YW4gYW5kIHF1YWRyYW50LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoicXVhZHJhbnRfYW5kX3ByaW5jaXBhbF9hbmdsZSIsImxhYmVsIjoiQ29ycmVjdGluZyBpbnZlcnNlLXRhbmdlbnQgcXVhZHJhbnQgZXJyb3JzIGFuZCB1c2luZyBwcmluY2lwYWwgdmFsdWVzIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJBIGNhbGN1bGF0b3IgZ2l2ZXMgdGFu4oG7wrkoKC0zKS8oLTIpKSA9IDU2LjPCsCBmb3IgeiA9IC0yIC0gM2ouIFdoYXQgaXMgdGhlIGNvcnJlY3QgcHJpbmNpcGFsIGFuZ2xlPyIsIm9wdGlvbnMiOlsiQS4gNTYuM8KwIiwiQi4gMTIzLjfCsCIsIkMuIC0xMjMuN8KwIiwiRC4gLTU2LjPCsCJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlRoZSBwb2ludCAoLTIsIC0zKSBpcyBpbiBRdWFkcmFudCBJSUksIHNvIHRoZSBhbmdsZSBtdXN0IHBvaW50IHRoZXJlLiBBIHZhbGlkIGFuZ2xlIGlzIDIzNi4zwrAsIHdob3NlIHByaW5jaXBhbCB2YWx1ZSAoaW4gdGhlIHJhbmdlIC0xODDCsCB0byAxODDCsCkgaXMgLTEyMy43wrAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiNTYuM8KwIGlzIG9ubHkgdGhlIHJlZmVyZW5jZSBhbmdsZSBhbmQgcG9pbnRzIHRvIFF1YWRyYW50IEkg4oCUIHRoZSBvcHBvc2l0ZSBkaXJlY3Rpb24uIiwiQiI6IjEyMy43wrAgcG9pbnRzIHRvIFF1YWRyYW50IElJLCBub3QgUXVhZHJhbnQgSUlJLiIsIkQiOiItNTYuM8KwIHBvaW50cyB0byBRdWFkcmFudCBJViwgbm90IFF1YWRyYW50IElJSS4ifSwiaGludCI6IlVzZSB0aGUgc2lnbnMgb2YgYm90aCBjb29yZGluYXRlcyB0byBsb2NhdGUgdGhlIHF1YWRyYW50IGJlZm9yZSB0cnVzdGluZyBhcmN0YW4uIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImNvbXBsZXhfcGxhbmVfcXVhZHJhbnRfYW5nbGUiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHBhaXIgcmVwcmVzZW50cyB0aGUgc2FtZSBjb21wbGV4IG51bWJlcj8iLCJvcHRpb25zIjpbIkEuIGVeKGogMzDCsCkgYW5kIGVeKGogMjEwwrApIiwiQi4gZV4oaiA5MMKwKSBhbmQgZV4oLWogMjcwwrApIiwiQy4gZV4oaiAwwrApIGFuZCBlXihqIDE4MMKwKSIsIkQuIGVeKC1qIDkwwrApIGFuZCBlXihqIDkwwrApIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiQW5nbGVzIHRoYXQgZGlmZmVyIGJ5IGV4YWN0bHkgMzYwwrAgcmVwcmVzZW50IHRoZSBzYW1lIHBvaW50IG9uIHRoZSB1bml0IGNpcmNsZS4gOTDCsCBhbmQgLTI3MMKwIGRpZmZlciBieSAzNjDCsCwgc28gdGhleSBhcmUgdGhlIHNhbWUuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiMzDCsCBhbmQgMjEwwrAgZGlmZmVyIGJ5IDE4MMKwLCBzbyB0aGV5IGFyZSBvcHBvc2l0ZSBwb2ludHMgb24gdGhlIHVuaXQgY2lyY2xlLiIsIkMiOiIwwrAgYW5kIDE4MMKwIGFsc28gZGlmZmVyIGJ5IDE4MMKwLCBub3QgMzYwwrAuIiwiRCI6Ii05MMKwIGFuZCA5MMKwIGRpZmZlciBieSAxODDCsCwgc28gdGhleSBhcmUgbm90IHRoZSBzYW1lIHBvaW50LiJ9LCJoaW50IjoiRXF1aXZhbGVudCBhbmdsZXMgZGlmZmVyIGJ5IGEgd2hvbGUgcm90YXRpb24gb2YgMzYwwrAuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoic3BlY2lhbF9leHBvbmVudGlhbF9pZGVudGl0aWVzX2FuZF9wb2xhcl90b19jYXJ0ZXNpYW4iLCJsYWJlbCI6IlJlY29nbml6aW5nIHNwZWNpYWwgdW5pdC1jaXJjbGUgaWRlbnRpdGllcyBhbmQgcmVhZGluZyBzaW1wbGUgcG9sYXIgZm9ybXMiLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3A0X3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBleHByZXNzaW9uIGlzIGVxdWFsIHRvIGo/Iiwib3B0aW9ucyI6WyJBLiBlXihqIM+AKSIsIkIuIGVeKC1qIM+ALzIpIiwiQy4gZV4oaiDPgC8yKSIsIkQuIGVeKGogMs+AKSJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IkFuIGFuZ2xlIG9mIM+ALzIgKDkwwrApIHBvaW50cyBzdHJhaWdodCB1cCBvbiB0aGUgdW5pdCBjaXJjbGUsIHdoaWNoIGNvcnJlc3BvbmRzIHRvIHRoZSBwb2ludCAoMCwgMSkgPSBqLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6ImVeKGrPgCkgPSAtMSwgYmVjYXVzZSBhbmdsZSDPgCBwb2ludHMgbGVmdCBhbG9uZyB0aGUgcmVhbCBheGlzLiIsIkIiOiJlXigtas+ALzIpID0gLWosIGJlY2F1c2UgYW5nbGUgLc+ALzIgcG9pbnRzIHN0cmFpZ2h0IGRvd24uIiwiRCI6ImVeKGoyz4ApID0gMSwgYmVjYXVzZSBhIGZ1bGwgcm90YXRpb24gcmV0dXJucyB0byB0aGUgc3RhcnRpbmcgcG9pbnQgKDEsIDApLiJ9LCJoaW50IjoiTWFwIGVhY2ggYW5nbGUgdG8gaXRzIHBvc2l0aW9uIG9uIHRoZSB1bml0IGNpcmNsZTogMMKwID0gcmlnaHQsIDkwwrAgPSB1cCwgMTgwwrAgPSBsZWZ0LCAtOTDCsCA9IGRvd24uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfV19" style="display:none;"></div>%%KC_END%%
