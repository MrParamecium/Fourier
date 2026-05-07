%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJVc2UgdGhlIGF2YWlsYWJsZSB0ZXh0Ym9vayBjb21wbGV4LXBsYW5lIGZpZ3VyZXMgYXMgdGhlIG1haW4gc3RhdGljIHZpc3VhbCBhbmNob3JzIGJlY2F1c2UgdGhleSBzaG93IHRoZSBleGFjdCBub3RhdGlvbiBhbmQgcXVhZHJhbnQgY29udmVudGlvbnMgdXNlZCBpbiB0aGlzIHNlY3Rpb24uIFVzZSBMYVRlWC1uYXRpdmUgZm9ybXVsYSBibG9ja3MgZm9yIHRoZSBhbGdlYnJhIHJ1bGVzIGJlY2F1c2Ugc3ltYm9saWMgZm9ybSBpcyB0aGUgY2xlYXJlc3Qgd2F5IHRvIHRlYWNoIG9wZXJhdGlvbnMuIERvIG5vdCB1c2UgZ2VuZXJhdGVkIGltYWdlcyBiZWNhdXNlIHJlYWR5LW1hZGUgdGV4dGJvb2sgZmlndXJlcyBhbmQgZXhhY3QgZm9ybXVsYXMgYWxyZWFkeSBjb3ZlciB0aGUgbmVlZGVkIHZpc3VhbHMgYWNjdXJhdGVseS4iLCJjcmFtIjoiVXNlIHZpc3VhbHMgdG8gcmVjb2duaXplIHF1YWRyYW50LCBtYWduaXR1ZGUsIGFuZ2xlLCBhbmQgY29uanVnYXRlIHN5bW1ldHJ5IHF1aWNrbHkuIiwic3RhbmRhcmQiOiJVc2UgZWFjaCB2aXN1YWwgYmVzaWRlIG9uZSByZXByZXNlbnRhdGl2ZSBleGFtcGxlIHNvIHN0dWRlbnRzIGNvbm5lY3QgZm9ybXVsYSwgZ3JhcGgsIGFuZCBjb21wdXRhdGlvbi4iLCJ0b3Bfc2NvcmUiOiJVc2UgdmlzdWFscyB0byBleHBvc2UgcXVhZHJhbnQgdHJhcHMsIGNvdGVybWluYWwgYW5nbGVzLCBhbmQgd2hlbiBwb2xhciBmb3JtIGlzIG1vcmUgZWZmaWNpZW50IHRoYW4gcmVjdGFuZ3VsYXIgZm9ybS4ifQ==" style="display:none;"></div>%%KC_END%%
# B.1-2 Algebra of Complex Numbers

> **Section Objective:** Learn how to represent, convert, and compute with complex numbers efficiently.

---

## Concepts In This Section

- Rectangular form
- Polar/exponential form
- Euler's formula
- Conjugate
- Quadrant correction
- Complex arithmetic
- Powers and roots
- Complex logarithms

$$\begin{aligned}
z &= a + jb \qquad \text{(rectangular form)} \tag{B.1}\\
a &= r\cos\theta, \qquad b = r\sin\theta\\
z &= r(\cos\theta + j\sin\theta) \tag{B.2}\\
e^{j\theta} &= \cos\theta + j\sin\theta \tag{B.3}\\
z &= re^{j\theta} \qquad \text{(polar/exponential form)} \tag{B.4}\\
r &= |z| = \sqrt{a^2+b^2}, \qquad \theta = \angle z = \tan^{-1}\!\left(\frac{b}{a}\right) \tag{B.5}
\end{aligned}$$
A complex number has two equivalent descriptions:

- **Rectangular form** \(z = a + jb\): reads like a map coordinate — \(a\) steps right (real axis), \(b\) steps up (imaginary axis).
- **Polar/exponential form** \(z = re^{j\theta}\): reads like a compass bearing — distance \(r\) from the origin, direction \(\theta\) from the positive real axis.

**Symbol guide:**
- \(a\) = real part, \(\operatorname{Re}z\)
- \(b\) = imaginary part, \(\operatorname{Im}z\) (a real number — it does not include \(j\))
- \(r = |z| = \sqrt{a^2+b^2}\) = magnitude (always \(\geq 0\))
- \(\theta = \angle z\) = angle in radians or degrees
- \(j\) = imaginary-axis marker, \(j^2 = -1\)

Equation (B.3) is **Euler's formula** — the bridge between the two forms.

### WHEN TO USE EACH FORM

| Operation | Preferred form |
|---|---|
| Addition, subtraction | Rectangular |
| Multiplication, division, powers, roots | Polar |

### WORKED EXAMPLE

Convert \(3 + j4\) to polar form:

$$r = \sqrt{3^2 + 4^2} = \sqrt{25} = 5$$

$$\theta = \tan^{-1}\!\left(\frac{4}{3}\right) = 53.1^\circ$$

$$3 + j4 = 5e^{j53.1^\circ}$$

Both \(a, b > 0\), so the point is in Quadrant I — the calculator angle is correct.

### COMMON MISTAKE

Using \(\tan^{-1}(b/a)\) without checking the quadrant. If \(a < 0\), the calculator output is wrong — you must add or subtract \(180^\circ\) to land in the correct quadrant.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoZSBkaWFncmFtIHRvIGlkZW50aWZ5IFxcKGFcXCksIFxcKGJcXCksIFxcKHJcXCksIGFuZCBcXChcXHRoZXRhXFwpIGluc3RhbnRseS4iLCJzdGFuZGFyZCI6IlVzZSBpdCB3aXRoIHRoZSBcXCgzK2o0XFwpIGV4YW1wbGUgdG8gY29ubmVjdCBjb29yZGluYXRlcyB0byBtYWduaXR1ZGUgYW5kIGFuZ2xlLiIsInRvcF9zY29yZSI6IlVzZSBpdCB0byBjb21wYXJlIG9yaWdpbmFsLCBjb25qdWdhdGUsIGFuZCBhbmdsZSBzaWduIGNvbnZlbnRpb25zLiJ9" style="display:none;"></div>%%KC_END%%
![Fig. B.2](/figures/page-005-fig__b_2-1.png)
*This figure shows the same complex number as a point \((a,b)\), a vector of length \(r\), and an angle \(\theta\) in the complex plane.*
<div class="lesson-figure-description">The complex plane has a horizontal Real axis and a vertical Imaginary axis. The point \(z = a + jb\) is plotted at coordinates \((a, b)\), with dashed guide lines to each axis. A vector from the origin to \(z\) is labeled with magnitude \(r\) and angle \(\theta\) measured from the positive real axis. A second point \(z^* = a - jb\) appears at \((a, -b)\), reflected across the real axis. Notice that rectangular form reads the coordinates directly, while polar form reads the vector length and direction. The conjugate \(z^*\) shares the same real part but has the opposite imaginary sign.</div>

$$\begin{aligned}
z^* &= a-jb = re^{-j\theta} = |z|e^{-j\angle z} \tag{B.6}\\
\operatorname{Re}z &= \frac{z+z^*}{2}\\
\operatorname{Im}z &= \frac{z-z^*}{2j} \tag{B.8}\\
zz^* &= |z|^2 \tag{B.9}
\end{aligned}$$
The **conjugate** \(z^*\) is formed by flipping the sign of the imaginary part only. Geometrically, it reflects the point across the real axis.

**Symbol guide:**
- \(z^*\) = conjugate of \(z\)
- \(\operatorname{Re}z\) = real part (a real number)
- \(\operatorname{Im}z\) = imaginary part (a real number, no \(j\))
- \(|z|^2 = zz^*\) = magnitude squared

### WORKED EXAMPLE

For \(z = 2 - j5\):

$$z^* = 2 + j5$$

$$\operatorname{Re}z = \frac{(2-j5)+(2+j5)}{2} = \frac{4}{2} = 2$$

$$\operatorname{Im}z = \frac{(2-j5)-(2+j5)}{2j} = \frac{-j10}{2j} = -5$$

$$zz^* = 2^2 + 5^2 = 4 + 25 = 29$$

### EXAM TRIGGER

Whenever a denominator contains a complex number, multiply numerator and denominator by the conjugate of the denominator. This uses \(zz^* = |z|^2\) to clear the imaginary part from the denominator.

### COMMON MISTAKE

Saying the imaginary part of \(2 - j5\) is \(-5j\). The imaginary part is the **coefficient** \(-5\), not the term \(-5j\). The symbol \(j\) is the axis marker, not part of the value.

$$\begin{aligned}
1 &= e^{j2\pi n}, \qquad n\in\mathbb{Z} \tag{B.10}\\
-1 &= e^{j(\pi+2\pi n)}, \qquad n\in\mathbb{Z}\\
j &= e^{j(\pi/2+2\pi n)}, \qquad n\in\mathbb{Z}\\
-j &= e^{j(-\pi/2+2\pi n)}, \qquad n\in\mathbb{Z}
\end{aligned}$$
Angles are **not unique**: adding \(2\pi n\) (any full rotation) returns to the same point. These four identities anchor the four cardinal directions on the unit circle:

| Point | Angle | Location |
|---|---|---|
| \(1\) | \(0\) | Positive real axis |
| \(-1\) | \(\pi\) | Negative real axis |
| \(j\) | \(\pi/2\) | Positive imaginary axis |
| \(-j\) | \(-\pi/2\) | Negative imaginary axis |

### QUADRANT CORRECTION TRAP

A calculator's \(\tan^{-1}\) always returns a value in \((-90^\circ, 90^\circ)\), which is only correct for Quadrants I and IV.

**Trap example:** For \(z = -2 - j3\):

$$r = \sqrt{(-2)^2 + (-3)^2} = \sqrt{13}$$

A calculator gives \(\tan^{-1}((-3)/(-2)) = \tan^{-1}(1.5) = 56.3^\circ\).

But both parts are negative — the point is in **Quadrant III**. The correct principal angle is:

$$\theta = 56.3^\circ - 180^\circ = -123.7^\circ$$

### EXAM TRIGGER

Any time the real part is negative (Quadrant II or III), the raw \(\tan^{-1}\) output is wrong. Always check the signs of \(a\) and \(b\) before accepting the calculator angle.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="trap_exposure" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoZSBxdWFkcmFudCBwb3NpdGlvbiB0byByZWplY3Qgd3JvbmcgY2FsY3VsYXRvciBhbmdsZXMgZmFzdC4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgZm91ciBleGFtcGxlcyBhcyB0aGUgbW9kZWwgZm9yIGNvbnZlcnRpbmcgXFwoYStqYlxcKSBpbnRvIFxcKHJlXntqXFx0aGV0YX1cXCkuIiwidG9wX3Njb3JlIjoiVXNlIHRoZSBkaWFncmFtcyB0byBkaXN0aW5ndWlzaCBwcmluY2lwYWwgYW5nbGVzIGZyb20gY290ZXJtaW5hbCBhbHRlcm5hdGl2ZXMuIn0=" style="display:none;"></div>%%KC_END%%
![unknown](/figures/page-009-unknown-1.png)
*These Argand diagrams show how four rectangular complex numbers convert to polar form in different quadrants.*
<div class="lesson-figure-description">Four Argand diagrams plot \(2+j3\), \(-2+j1\), \(-2-j3\), and \(1-j3\) on axes labeled Re (horizontal) and Im (vertical). Each point is connected to the origin by a vector labeled with its magnitude and principal angle: \(\sqrt{13}\) at \(56.3^\circ\), \(\sqrt{5}\) at \(153.4^\circ\), \(\sqrt{13}\) at \(-123.7^\circ\), and \(\sqrt{10}\) at \(-71.6^\circ\). Dashed projections show the real and imaginary coordinates. Notice that the signs of the real and imaginary parts determine the quadrant, and the quadrant determines whether the raw \(\tan^{-1}\) output must be corrected.</div>

$$\begin{aligned}
\text{Rectangular addition/subtraction:}\quad &(a+jb)+(c+jd)=(a+c)+j(b+d)\[2mm]
\text{Polar multiplication:}\quad &z_1z_2=(r_1e^{j\theta_1})(r_2e^{j\theta_2})=r_1r_2e^{j(\theta_1+\theta_2)}\[2mm]
\text{Polar division:}\quad &\frac{z_1}{z_2}=\frac{r_1}{r_2}e^{j(\theta_1-\theta_2)}\[2mm]
\text{Reciprocal:}\quad &\frac{1}{z}=\frac{1}{r}e^{-j\theta}\[2mm]
\text{Power:}\quad &(re^{j\theta})^n=r^n e^{jn\theta}\[2mm]
\text{Roots:}\quad &z_k=r^{1/n}e^{j(\theta+2\pi k)/n},\quad k=0,1,\ldots,n-1
\end{aligned}$$
### DECISION RULE

- **Add or subtract** → use rectangular form. Combine real parts and imaginary parts separately.
- **Multiply, divide, reciprocal, power, root** → use polar form. Operate on magnitudes and angles independently.

**Setup:** Let \(z_1 = r_1 e^{j\theta_1}\) and \(z_2 = r_2 e^{j\theta_2}\).

### WORKED EXAMPLE

Let \(z_1 = 2e^{j\pi/4}\) and \(z_2 = 4e^{j2\pi/3}\).

**Product:**
$$z_1 z_2 = (2)(4)\,e^{j(\pi/4 + 2\pi/3)} = 8\,e^{j(3\pi/12 + 8\pi/12)} = 8e^{j11\pi/12}$$

**Quotient:**
$$\frac{z_1}{z_2} = \frac{2}{4}\,e^{j(\pi/4 - 2\pi/3)} = \frac{1}{2}\,e^{j(3\pi/12 - 8\pi/12)} = \frac{1}{2}e^{-j5\pi/12}$$

**Reciprocal:**
$$\frac{1}{z_1} = \frac{1}{2}e^{-j\pi/4}$$

**Roots** give \(n\) distinct values, spaced \(2\pi/n\) apart in angle.

### COMMON MISTAKE

Multiplying magnitudes correctly but **forgetting to add the angles** (or subtracting when dividing). The angle operation is the step most often dropped under exam pressure.

$$\begin{aligned}
X(\omega)=\frac{2+j\omega}{3+j4\omega}
&=\frac{\sqrt{4+\omega^2}}{\sqrt{9+16\omega^2}}\,e^{j\left[\tan^{-1}(\omega/2)-\tan^{-1}(4\omega/3)\right]}\[2mm]
|X(\omega)|&=\sqrt{\frac{4+\omega^2}{9+16\omega^2}}\\
\angle X(\omega)&=\tan^{-1}\!\left(\frac{\omega}{2}\right)-\tan^{-1}\!\left(\frac{4\omega}{3}\right)\[2mm]
z&=re^{j(\theta\pm2\pi k)},\quad k=0,1,2,\ldots\\
\ln z&=\ln r\pm j(\theta+2\pi k)\\
\operatorname{Ln}z&=\ln r+j\theta \quad \text{using the principal angle}
\end{aligned}$$
### FREQUENCY-DOMAIN EXPRESSIONS

When a complex expression depends on a parameter like \(\omega\), convert numerator and denominator **separately** into polar form, then:

$$|X(\omega)| = \frac{|\text{numerator}|}{|\text{denominator}|}, \qquad \angle X(\omega) = \angle\text{numerator} - \angle\text{denominator}$$

For \(X(\omega) = \dfrac{2+j\omega}{3+j4\omega}\):

- Numerator magnitude: \(\sqrt{4+\omega^2}\), phase: \(\tan^{-1}(\omega/2)\)
- Denominator magnitude: \(\sqrt{9+16\omega^2}\), phase: \(\tan^{-1}(4\omega/3)\)
- Divide magnitudes, subtract phases — as shown above.

### COMPLEX LOGARITHMS

Because \(\theta\) and \(\theta + 2\pi k\) represent the same point, \(\ln z\) is **multi-valued**:

$$\ln z = \ln r + j(\theta + 2\pi k), \quad k \in \mathbb{Z}$$

The **principal logarithm** \(\operatorname{Ln}z\) uses only the principal angle \(\theta \in (-\pi, \pi]\):

$$\operatorname{Ln}z = \ln r + j\theta$$

**Minimal example:** \(\ln(1) = \ln(e^{j2\pi k}) = j2\pi k\), so \(\operatorname{Ln}(1) = 0\).

### EXAM TRIGGER

'Find magnitude and phase', 'polar representation of a frequency function', or 'principal logarithm' — all require this procedure.

### COMMON MISTAKE

Treating the angle as unique when logarithms are involved. Always state \(k \in \mathbb{Z}\) unless the problem asks specifically for the principal value.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="interactive_demo" data-teaching-role="interactive_demo" data-visual-use-b64="eyJjcmFtIjoiVXNlIGl0IHRvIHJlY29nbml6ZSB0aGUgY29udmVyc2lvbiBwYXR0ZXJuIHF1aWNrbHkuIiwic3RhbmRhcmQiOiJVc2UgaXQgdG8gY29ubmVjdCBcXChhXFwpLCBcXChiXFwpLCBcXChyXFwpLCBhbmQgXFwoXFx0aGV0YVxcKS4iLCJ0b3Bfc2NvcmUiOiJVc2UgaXQgdG8gY2F0Y2ggcXVhZHJhbnQgYW5kIHNpZ24gbWlzdGFrZXMuIn0=" style="display:none;"></div><div class="kc-interactive-demo" data-demo-b64="eyJ0eXBlIjoiaW50ZXJhY3RpdmVfZGVtbyIsInRpdGxlIjoiRHJhZyB0aGUgY29tcGxleCBudW1iZXIiLCJjb250ZW50IjoiTW92ZSB0aGUgcmVhbCBhbmQgaW1hZ2luYXJ5IGNvbXBvbmVudHMuIFdhdGNoIHRoZSBzYW1lIHBvaW50IGJlY29tZSByZWN0YW5ndWxhciBmb3JtLCBtYWduaXR1ZGUsIGFuZCBhbmdsZS4iLCJleHBsYW5hdGlvbiI6IlRoaXMgZGVtbyBsaW5rcyBjb29yZGluYXRlcyB0byBwb2xhciBmb3JtIGFuZCBxdWFkcmFudC1zYWZlIHBoYXNlLiIsInRlYWNoaW5nX3JvbGUiOiJpbnRlcmFjdGl2ZV9kZW1vIiwibW9kZV9zcGVjaWZpY192aXN1YWxfdXNlIjp7ImNyYW0iOiJVc2UgaXQgdG8gcmVjb2duaXplIHRoZSBjb252ZXJzaW9uIHBhdHRlcm4gcXVpY2tseS4iLCJzdGFuZGFyZCI6IlVzZSBpdCB0byBjb25uZWN0IFxcKGFcXCksIFxcKGJcXCksIFxcKHJcXCksIGFuZCBcXChcXHRoZXRhXFwpLiIsInRvcF9zY29yZSI6IlVzZSBpdCB0byBjYXRjaCBxdWFkcmFudCBhbmQgc2lnbiBtaXN0YWtlcy4ifSwiZGVtb19zcGVjIjp7ImZyYW1ld29yayI6InJlYWN0X2NhbnZhcyIsInBhbmVscyI6W3siaWQiOiJwaGFzb3JfcGFuZWwiLCJ0aXRsZSI6IkNvbXBsZXggcGxhbmUifSx7ImlkIjoid2F2ZV9wYW5lbCIsInRpdGxlIjoiRXF1aXZhbGVudCBwaGFzZSB2aWV3In1dLCJjb250cm9scyI6W3siaWQiOiJzbGlkZXJfYSIsImxhYmVsIjoiYSIsIm1pbiI6LTUsIm1heCI6NSwic3RlcCI6MC4xLCJkZWZhdWx0IjozfSx7ImlkIjoic2xpZGVyX2IiLCJsYWJlbCI6ImIiLCJtaW4iOi01LCJtYXgiOjUsInN0ZXAiOjAuMSwiZGVmYXVsdCI6NH0seyJpZCI6ImFuZ2xlX3RvZ2dsZSIsImxhYmVsIjoiYW5nbGUgdW5pdHMiLCJvcHRpb25zIjpbImRlZ3JlZXMiLCJyYWRpYW5zIl0sImRlZmF1bHQiOiJkZWdyZWVzIn0seyJpZCI6InJlc2V0X2RlbW8iLCJsYWJlbCI6IlJlc2V0IiwiYWN0aW9uIjoic2V0IGRlZmF1bHRzIn1dfSwic2VjdGlvbl9pZCI6IkIuMS0yIEFsZ2VicmEgb2YgQ29tcGxleCBOdW1iZXJzIiwic2VjdGlvbl90aXRsZSI6IkFsZ2VicmEgb2YgQ29tcGxleCBOdW1iZXJzIn0="></div>%%KC_END%%

---
**📌 Key Takeaways**
- Rectangular form: \(z = a + jb\); polar form: \(z = re^{j\theta}\) — same point, two descriptions.
- Magnitude \(r = \sqrt{a^2+b^2}\); angle \(\theta = \tan^{-1}(b/a)\) — always verify the quadrant using the signs of \(a\) and \(b\).
- Conjugate: \(z^* = a - jb = re^{-j\theta}\); magnitude squared: \(zz^* = |z|^2\).
- Multiply/divide in polar form: \(z_1 z_2 = r_1 r_2 e^{j(\theta_1+\theta_2)}\); \(z_1/z_2 = (r_1/r_2)e^{j(\theta_1-\theta_2)}\); power: \((re^{j\theta})^n = r^n e^{jn\theta}\).
- Complex logarithm is multi-valued: \(\ln z = \ln r \pm j(\theta + 2\pi k)\); principal value uses \(k=0\).

*Next, these complex-number tools will make sinusoid and phasor calculations much easier.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6OSwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo3LCJtYXgiOjEwfSwia25vd2xlZGdlX3BvaW50cyI6W3siaWQiOiJyZWN0YW5ndWxhcl9wb2xhcl9jb252ZXJzaW9uIiwibGFiZWwiOiJSZWN0YW5ndWxhciBhbmQgcG9sYXIvZXhwb25lbnRpYWwgZm9ybSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggcG9sYXIgZm9ybSBjb3JyZWN0bHkgcmVwcmVzZW50cyBcXCgzK2o0XFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoNWVee2o1My4xXlxcY2lyY31cXCkiLCJCLiBcXCg1ZV57ajM2LjleXFxjaXJjfVxcKSIsIkMuIFxcKDdlXntqNTMuMV5cXGNpcmN9XFwpIiwiRC4gXFwoMjVlXntqNTMuMV5cXGNpcmN9XFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGhlIG1hZ25pdHVkZSBpcyBcXChcXHNxcnR7M14yKzReMn09NVxcKSwgYW5kIHRoZSBhbmdsZSBpcyBcXChcXHRhbl57LTF9KDQvMyk9NTMuMV5cXGNpcmNcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhpcyBzd2FwcyB0aGUgcmF0aW8gYW5kIHVzZXMgXFwoXFx0YW5eey0xfSgzLzQpXFwpLiIsIkMiOiJNYWduaXR1ZGUgaXMgbm90IFxcKDMrNFxcKTsgaXQgaXMgdGhlIGRpc3RhbmNlIGZvcm11bGEgXFwoXFxzcXJ0e2FeMitiXjJ9XFwpLiIsIkQiOiJUaGlzIGdpdmVzIFxcKHJeMiA9IDI1XFwpLCBub3QgXFwociA9IDVcXCkuIn0sImhpbnQiOiJVc2UgdGhlIGRpc3RhbmNlIGZvcm11bGEgZm9yIG1hZ25pdHVkZSBhbmQgdGhlIHRhbmdlbnQgcmF0aW8gZm9yIGFuZ2xlLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggcmVjdGFuZ3VsYXIgZm9ybSBlcXVhbHMgXFwoMmVee2pcXHBpLzN9XFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoMStqXFxzcXJ0ezN9XFwpIiwiQi4gXFwoXFxzcXJ0ezN9K2pcXCkiLCJDLiBcXCgtMStqXFxzcXJ0ezN9XFwpIiwiRC4gXFwoMS1qXFxzcXJ0ezN9XFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiXFwoMmVee2pcXHBpLzN9PTIoXFxjb3MoXFxwaS8zKStqXFxzaW4oXFxwaS8zKSk9MigxLzIralxcc3FydHszfS8yKT0xK2pcXHNxcnR7M31cXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhpcyBzd2FwcyBjb3NpbmUgYW5kIHNpbmU6IFxcKFxcY29zKFxccGkvMyk9MS8yXFwpLCBub3QgXFwoXFxzcXJ0ezN9LzJcXCkuIiwiQyI6IlRoZSBhbmdsZSBcXChcXHBpLzNcXCkgaXMgaW4gUXVhZHJhbnQgSSwgc28gdGhlIHJlYWwgcGFydCBcXChhID0gclxcY29zXFx0aGV0YVxcKSBpcyBwb3NpdGl2ZS4iLCJEIjoiXFwoXFxzaW4oXFxwaS8zKSA9IFxcc3FydHszfS8yID4gMFxcKSwgc28gdGhlIGltYWdpbmFyeSBwYXJ0IGlzIHBvc2l0aXZlLCBub3QgbmVnYXRpdmUuIn0sImhpbnQiOiJVc2UgXFwoYT1yXFxjb3NcXHRoZXRhXFwpIGFuZCBcXChiPXJcXHNpblxcdGhldGFcXCkgd2l0aCBcXChyPTJcXCkgYW5kIFxcKFxcdGhldGE9XFxwaS8zXFwpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoicXVhZHJhbnRfYW5kX2FuZ2xlX3RyYXAiLCJsYWJlbCI6IlF1YWRyYW50IGNvcnJlY3Rpb24gZm9yIHRoZSBhbmdsZSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBjYWxjdWxhdG9yIGdpdmVzIFxcKFxcdGFuXnstMX0oKC0zKS8oLTIpKT01Ni4zXlxcY2lyY1xcKS4gV2h5IGlzIFxcKDU2LjNeXFxjaXJjXFwpIHdyb25nIGZvciBcXCgtMi1qM1xcKT8iLCJvcHRpb25zIjpbIkEuIFRoZSBwb2ludCBpcyBpbiBRdWFkcmFudCBJSUksIHNvIHRoZSBwcmluY2lwYWwgYW5nbGUgc2hvdWxkIGJlIFxcKC0xMjMuN15cXGNpcmNcXCkuIiwiQi4gVGhlIG1hZ25pdHVkZSBpcyBuZWdhdGl2ZSwgc28gdGhlIGFuZ2xlIG11c3QgYmUgbmVnYXRpdmUuIiwiQy4gVGhlIGltYWdpbmFyeSBwYXJ0IGlzIHBvc2l0aXZlLCBzbyB0aGUgcG9pbnQgaXMgaW4gUXVhZHJhbnQgSUkuIiwiRC4gVGhlIGNvcnJlY3QgYW5nbGUgaXMgYWx3YXlzIGJldHdlZW4gXFwoMF5cXGNpcmNcXCkgYW5kIFxcKDkwXlxcY2lyY1xcKS4iXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJcXCgtMi1qM1xcKSBoYXMgbmVnYXRpdmUgcmVhbCBhbmQgbmVnYXRpdmUgaW1hZ2luYXJ5IHBhcnRzLCBwbGFjaW5nIGl0IGluIFF1YWRyYW50IElJSS4gVGhlIHByaW5jaXBhbCBhbmdsZSBpcyBcXCg1Ni4zXlxcY2lyYyAtIDE4MF5cXGNpcmMgPSAtMTIzLjdeXFxjaXJjXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6Ik1hZ25pdHVkZSBcXChyID0gXFxzcXJ0e2FeMitiXjJ9XFwpIGlzIGFsd2F5cyBub25uZWdhdGl2ZS4iLCJDIjoiVGhlIGltYWdpbmFyeSBwYXJ0IGlzIFxcKC0zXFwpLCB3aGljaCBpcyBuZWdhdGl2ZSwgbm90IHBvc2l0aXZlLiIsIkQiOiJBbmdsZXMgY2FuIGZhbGwgaW4gYW55IHF1YWRyYW50IGRlcGVuZGluZyBvbiB0aGUgc2lnbnMgb2YgXFwoYVxcKSBhbmQgXFwoYlxcKS4ifSwiaGludCI6IkNoZWNrIHRoZSBzaWducyBvZiB0aGUgcmVhbCBhbmQgaW1hZ2luYXJ5IHBhcnRzIGJlZm9yZSB0cnVzdGluZyB0aGUgdGFuZ2VudCBvdXRwdXQuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImNvbXBsZXhfcGxhbmVfcXVhZHJhbnRfY2hlY2siLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGlkZW50aXR5IGlzIGNvcnJlY3QgZm9yIHRoZSBwb2ludCBcXCgtalxcKSBvbiB0aGUgdW5pdCBjaXJjbGU/Iiwib3B0aW9ucyI6WyJBLiBcXCgtaj1lXntqKC1cXHBpLzIrMlxccGkgbil9XFwpIiwiQi4gXFwoLWo9ZV57aihcXHBpLzIrMlxccGkgbil9XFwpIiwiQy4gXFwoLWo9ZV57aihcXHBpKzJcXHBpIG4pfVxcKSIsIkQuIFxcKC1qPWVee2oyXFxwaSBufVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlxcKC1qXFwpIGlzIG9uZSB1bml0IGJlbG93IHRoZSBvcmlnaW4gb24gdGhlIGltYWdpbmFyeSBheGlzLCBzbyBpdHMgYW5nbGUgaXMgXFwoLVxccGkvMlxcKSBwbHVzIGFueSBmdWxsIHJvdGF0aW9uIFxcKDJcXHBpIG5cXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhlIGFuZ2xlIFxcKFxccGkvMlxcKSBwb2ludHMgdXB3YXJkIHRvIFxcKCtqXFwpLCBub3QgZG93bndhcmQgdG8gXFwoLWpcXCkuIiwiQyI6IlRoZSBhbmdsZSBcXChcXHBpXFwpIHBvaW50cyB0byBcXCgtMVxcKSBvbiB0aGUgbmVnYXRpdmUgcmVhbCBheGlzLiIsIkQiOiJUaGUgYW5nbGUgXFwoMFxcKSAob3IgXFwoMlxccGkgblxcKSkgcG9pbnRzIHRvIFxcKDFcXCkgb24gdGhlIHBvc2l0aXZlIHJlYWwgYXhpcy4ifSwiaGludCI6IkxvY2F0ZSBcXCgtalxcKSBvbiB0aGUgdW5pdCBjaXJjbGUgZmlyc3Qg4oCUIGl0IGlzIG9uZSB1bml0IHN0cmFpZ2h0IGRvd24uIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6InVuaXRfY2lyY2xlX2NvbXBsZXhfcG9pbnRzIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJjb25qdWdhdGVfaWRlbnRpdGllcyIsImxhYmVsIjoiQ29uanVnYXRlLCByZWFsIHBhcnQsIGltYWdpbmFyeSBwYXJ0LCBhbmQgbWFnbml0dWRlIHNxdWFyZWQiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIFxcKHo9Mi1qNVxcKSwgd2hpY2ggc3RhdGVtZW50IGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBcXCh6Xio9MitqNVxcKSBhbmQgXFwoenpeKj0yOVxcKSIsIkIuIFxcKHpeKj0tMitqNVxcKSBhbmQgXFwoenpeKj0yOVxcKSIsIkMuIFxcKHpeKj0yK2o1XFwpIGFuZCBcXCh6el4qPTdcXCkiLCJELiBcXCh6Xio9Mi1qNVxcKSBhbmQgXFwoenpeKj0yOVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlRoZSBjb25qdWdhdGUgY2hhbmdlcyBvbmx5IHRoZSBzaWduIG9mIHRoZSBpbWFnaW5hcnkgdGVybTogXFwoel4qID0gMitqNVxcKS4gVGhlbiBcXCh6el4qID0gfHp8XjIgPSAyXjIrNV4yID0gNCsyNSA9IDI5XFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IkNvbmp1Z2F0aW9uIGNoYW5nZXMgb25seSB0aGUgaW1hZ2luYXJ5IHNpZ247IHRoZSByZWFsIHBhcnQgXFwoMlxcKSBzdGF5cyBwb3NpdGl2ZS4iLCJDIjoiXFwoenpeKiA9IHx6fF4yID0gMjlcXCksIG5vdCB0aGUgc3VtIFxcKDIrNT03XFwpLiIsIkQiOiJUaGF0IGlzIHRoZSBvcmlnaW5hbCBudW1iZXIgXFwoelxcKSBpdHNlbGYsIG5vdCBpdHMgY29uanVnYXRlLiJ9LCJoaW50IjoiQ29uanVnYXRlIG1lYW5zIHJlcGxhY2UgXFwoalxcKSB3aXRoIFxcKC1qXFwpIGV2ZXJ5d2hlcmUgaW4gdGhlIGV4cHJlc3Npb24uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJBIHN0dWRlbnQgc2F5cyB0aGUgaW1hZ2luYXJ5IHBhcnQgb2YgXFwoej02LWoyXFwpIGlzIFxcKC1qMlxcKS4gRXhwbGFpbiB0aGUgcHJlY2lzZSBjb3JyZWN0aW9uLiIsImlkZWFsX2Fuc3dlciI6IlRoZSBpbWFnaW5hcnkgcGFydCBpcyB0aGUgY29lZmZpY2llbnQgb2YgXFwoalxcKSwgc28gXFwoXFxvcGVyYXRvcm5hbWV7SW19eiA9IC0yXFwpLiBUaGUgdGVybSBcXCgtajJcXCkgKG9yIFxcKC0yalxcKSkgaXMgdGhlIGltYWdpbmFyeSB0ZXJtIGluIHRoZSBleHByZXNzaW9uLCBub3QgdGhlIGltYWdpbmFyeSBwYXJ0IGl0c2VsZi4gVGhlIGltYWdpbmFyeSBwYXJ0IGlzIGEgcmVhbCBudW1iZXIgYW5kIGRvZXMgbm90IGluY2x1ZGUgdGhlIHN5bWJvbCBcXChqXFwpLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3Qgc3RhdGUgXFwoXFxvcGVyYXRvcm5hbWV7SW19eiA9IC0yXFwpLiIsIk11c3QgZGlzdGluZ3Vpc2ggaW1hZ2luYXJ5IHBhcnQgZnJvbSBpbWFnaW5hcnkgdGVybS4iLCJNdXN0IG5vdCBpbmNsdWRlIFxcKGpcXCkgaW4gdGhlIHZhbHVlIG9mIHRoZSBpbWFnaW5hcnkgcGFydC4iXSwiZXhwbGFuYXRpb24iOiJUaGlzIGNoZWNrcyB3aGV0aGVyIHRoZSBzdHVkZW50IHVuZGVyc3RhbmRzIHRoZSBkZWZpbml0aW9uIHJhdGhlciB0aGFuIGNvcHlpbmcgdGhlIHdob2xlIFxcKGpcXCktdGVybSBmcm9tIHRoZSBleHByZXNzaW9uLiIsImhpbnQiOiJBc2s6IHdoYXQgcmVhbCBudW1iZXIgbXVsdGlwbGllcyBcXChqXFwpIGluIHRoZSBleHByZXNzaW9uPyIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiY29tcGxleF9hcml0aG1ldGljX2Zvcm1fY2hvaWNlIiwibGFiZWwiOiJFZmZpY2llbnQgYXJpdGhtZXRpYyBmb3JtIGNob2ljZSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNF9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiTGV0IFxcKHpfMT0yZV57alxccGkvNH1cXCkgYW5kIFxcKHpfMj00ZV57ajJcXHBpLzN9XFwpLiBXaGF0IGlzIFxcKHpfMXpfMlxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKDhlXntqMTFcXHBpLzEyfVxcKSIsIkIuIFxcKDhlXntqNVxccGkvMTJ9XFwpIiwiQy4gXFwoNmVee2oxMVxccGkvMTJ9XFwpIiwiRC4gXFwoOGVeey1qNVxccGkvMTJ9XFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiTXVsdGlwbHkgbWFnbml0dWRlcyBhbmQgYWRkIGFuZ2xlczogXFwoMiBcXGNkb3QgNCA9IDhcXCksIGFuZCBcXChcXHBpLzQgKyAyXFxwaS8zID0gM1xccGkvMTIgKyA4XFxwaS8xMiA9IDExXFxwaS8xMlxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGlzIHN1YnRyYWN0cyBhbmdsZXMgXFwoKDJcXHBpLzMgLSBcXHBpLzQpXFwpIGluc3RlYWQgb2YgYWRkaW5nIHRoZW0uIiwiQyI6Ik1hZ25pdHVkZXMgbXVsdGlwbHk6IFxcKDIgXFx0aW1lcyA0ID0gOFxcKSwgbm90IFxcKDIgKyA0ID0gNlxcKS4iLCJEIjoiQSBuZWdhdGl2ZSBhbmdsZSBkaWZmZXJlbmNlIGlzIHRoZSByZXN1bHQgb2YgZGl2aXNpb24sIG5vdCBtdWx0aXBsaWNhdGlvbi4ifSwiaGludCI6IkZvciBhIHByb2R1Y3QsIG11bHRpcGx5IG1hZ25pdHVkZXMgYW5kIGFkZCBhbmdsZXMuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3A0X3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJVc2luZyB0aGUgc2FtZSBcXCh6XzE9MmVee2pcXHBpLzR9XFwpIGFuZCBcXCh6XzI9NGVee2oyXFxwaS8zfVxcKSwgd2hhdCBpcyBcXCh6XzEvel8yXFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoXFxmcmFjezF9ezJ9ZV57LWo1XFxwaS8xMn1cXCkiLCJCLiBcXChcXGZyYWN7MX17Mn1lXntqMTFcXHBpLzEyfVxcKSIsIkMuIFxcKDJlXnstajVcXHBpLzEyfVxcKSIsIkQuIFxcKDhlXnstajVcXHBpLzEyfVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IkRpdmlkZSBtYWduaXR1ZGVzIGFuZCBzdWJ0cmFjdCBhbmdsZXM6IFxcKDIvNCA9IDEvMlxcKSwgYW5kIFxcKFxccGkvNCAtIDJcXHBpLzMgPSAzXFxwaS8xMiAtIDhcXHBpLzEyID0gLTVcXHBpLzEyXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoaXMgYWRkcyBhbmdsZXMgaW5zdGVhZCBvZiBzdWJ0cmFjdGluZyB0aGVtLiIsIkMiOiJUaGUgbWFnbml0dWRlIGlzIFxcKDIvNCA9IDEvMlxcKSwgbm90IFxcKDQvMiA9IDJcXCkuIiwiRCI6IlRoaXMgbXVsdGlwbGllcyBtYWduaXR1ZGVzIFxcKCgyIFxcdGltZXMgNCA9IDgpXFwpIGluc3RlYWQgb2YgZGl2aWRpbmcuIn0sImhpbnQiOiJGb3IgYSBxdW90aWVudCwgZGl2aWRlIG1hZ25pdHVkZXMgYW5kIHN1YnRyYWN0IGFuZ2xlcy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InBvd2Vyc19yb290c19hbmRfbG9ncyIsImxhYmVsIjoiUG93ZXJzLCByb290cywgYW5kIGNvbXBsZXggbG9nYXJpdGhtcyIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDVfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIFxcKHo9M2Vee2pcXHBpLzZ9XFwpLCB3aGF0IGlzIFxcKHpeMlxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKDllXntqXFxwaS8zfVxcKSIsIkIuIFxcKDZlXntqXFxwaS8zfVxcKSIsIkMuIFxcKDllXntqXFxwaS8xMn1cXCkiLCJELiBcXCgzZV57alxccGkvM31cXCkiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJGb3IgcG93ZXJzLCByYWlzZSB0aGUgbWFnbml0dWRlIHRvIHRoZSBwb3dlciBhbmQgbXVsdGlwbHkgdGhlIGFuZ2xlOiBcXCgoM2Vee2pcXHBpLzZ9KV4yID0gM14yIGVee2ogXFxjZG90IDIgXFxjZG90IFxccGkvNn0gPSA5ZV57alxccGkvM31cXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhlIG1hZ25pdHVkZSBtdXN0IGJlIHNxdWFyZWQ6IFxcKDNeMiA9IDlcXCksIG5vdCBcXCgzIFxcdGltZXMgMiA9IDZcXCkuIiwiQyI6IlRoZSBhbmdsZSBpcyBtdWx0aXBsaWVkIGJ5IFxcKG49MlxcKTogXFwoMiBcXHRpbWVzIFxccGkvNiA9IFxccGkvM1xcKSwgbm90IGRpdmlkZWQuIiwiRCI6IkJvdGggdGhlIG1hZ25pdHVkZSBhbmQgdGhlIGFuZ2xlIGNoYW5nZSB3aGVuIHRha2luZyBhIHBvd2VyLiJ9LCJoaW50IjoiVXNlIFxcKChyZV57alxcdGhldGF9KV5uID0gcl5uIGVee2puXFx0aGV0YX1cXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwNV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2h5IGlzIFxcKFxcbG4gelxcKSBtdWx0aS12YWx1ZWQgZm9yIGEgbm9uemVybyBjb21wbGV4IG51bWJlciBcXCh6PXJlXntqXFx0aGV0YX1cXCk/Iiwib3B0aW9ucyI6WyJBLiBCZWNhdXNlIFxcKFxcdGhldGFcXCkgYW5kIFxcKFxcdGhldGErMlxccGkga1xcKSByZXByZXNlbnQgdGhlIHNhbWUgcG9pbnQuIiwiQi4gQmVjYXVzZSBcXChyXFwpIGNhbiBiZSBuZWdhdGl2ZS4iLCJDLiBCZWNhdXNlIFxcKGpeMj0xXFwpLiIsIkQuIEJlY2F1c2UgZXZlcnkgY29tcGxleCBudW1iZXIgaGFzIG5vIG1hZ25pdHVkZS4iXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJUaGUgc2FtZSBjb21wbGV4IG51bWJlciBjYW4gYmUgd3JpdHRlbiBhcyBcXChyZV57aihcXHRoZXRhKzJcXHBpIGspfVxcKSBmb3IgYW55IGludGVnZXIgXFwoa1xcKSwgc28gXFwoXFxsbiB6ID0gXFxsbiByICsgaihcXHRoZXRhICsgMlxccGkgaylcXCkgeWllbGRzIGluZmluaXRlbHkgbWFueSB2YWx1ZXMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiTWFnbml0dWRlIFxcKHIgPSB8enwgXFxnZXEgMFxcKSBpcyBhbHdheXMgbm9ubmVnYXRpdmUuIiwiQyI6IlRoZSBkZWZpbmluZyBwcm9wZXJ0eSBvZiBcXChqXFwpIGlzIFxcKGpeMiA9IC0xXFwpLCBub3QgXFwoKzFcXCkuIiwiRCI6IkV2ZXJ5IG5vbnplcm8gY29tcGxleCBudW1iZXIgaGFzIGEgd2VsbC1kZWZpbmVkIG1hZ25pdHVkZSBcXChyID4gMFxcKS4ifSwiaGludCI6IlRoaW5rIGFib3V0IGNvdGVybWluYWwgYW5nbGVzIOKAlCBhZGRpbmcgXFwoMlxccGlcXCkgcmV0dXJucyB0byB0aGUgc2FtZSBwb2ludCBvbiB0aGUgY29tcGxleCBwbGFuZS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoiY290ZXJtaW5hbF9hbmdsZV91bml0X2NpcmNsZSIsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
