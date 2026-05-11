%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJVc2UgTGFUZVgtbmF0aXZlIGZvcm11bGEgZGlzcGxheXMgZm9yIHRoZSBhbGdlYnJhIHJ1bGVzIGJlY2F1c2UgdGhlIGV4YWN0IHN5bWJvbHMgbWF0dGVyLCBhbmQgdXNlIHRoZSBhdmFpbGFibGUgdGV4dGJvb2sgQXJnYW5kIGRpYWdyYW1zIGZvciBjb21wbGV4LXBsYW5lIGFuZCBxdWFkcmFudCByZWNvZ25pdGlvbi4gRG8gbm90IHVzZSBHUFRJbWFnZTI6IHRoZSB0ZXh0Ym9vayBhbHJlYWR5IHByb3ZpZGVzIHRoZSBjYW5vbmljYWwgY29tcGxleC1wbGFuZSB2aXN1YWxzIG5lZWRlZCBmb3IgdGhpcyBzZWN0aW9uLiIsImNyYW0iOiJVc2UgdGhlIHZpc3VhbCB0byBpZGVudGlmeSBxdWFkcmFudCBhbmQgc2lnbiBxdWlja2x5IGJlZm9yZSBjaG9vc2luZyB0aGUgZm9ybXVsYS4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgdmlzdWFsIGJlc2lkZSBvbmUgcmVwcmVzZW50YXRpdmUgY29udmVyc2lvbiBleGFtcGxlIHNvIHRoZSBzdHVkZW50IGxpbmtzIGNvb3JkaW5hdGVzLCBtYWduaXR1ZGUsIGFuZCBhbmdsZS4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhlIHZpc3VhbCB0byBjYXRjaCBzdWJ0bGUgYW5nbGUgbWlzdGFrZXMsIGNvdGVybWluYWwtYW5nbGUgY2hvaWNlcywgYW5kIGZvcm0tc2VsZWN0aW9uIHRyYXBzLiJ9" style="display:none;"></div>%%KC_END%%
# B.1-2 Algebra of Complex Numbers

> **Section Objective:** Learn how to represent, convert, and compute with complex numbers in the form needed for engineering math.

---

## Concepts In This Section

- Rectangular form
- Polar/exponential form
- Euler bridge
- Magnitude and angle
- Quadrant check
- Conjugate
- Multiplication and division
- Powers and roots
- Magnitude and phase
- Complex logarithm

## 1. Rectangular form: read the coordinates

This is Eq. (B.1), the standard rectangular form of a complex number. The value \(a\) is the **real part** and \(b\) is the **imaginary part**, so \(\operatorname{Re} z = a\) and \(\operatorname{Im} z = b\).

![Rectangular form of a complex number](/figures/page-005-fig__b_2-1.png)
*The textbook diagram anchors \(z = a + jb\): \(a\) is read on the real axis, while \(b\) is read as the coefficient of \(j\) on the imaginary axis.*

**Minimal example:** For \(z = -2 + j3\), the point on the complex plane is \((-2, 3)\), with \(\operatorname{Re} z = -2\) and \(\operatorname{Im} z = 3\).

### EXAM TRIGGER

Use rectangular form for **addition and subtraction**: real parts combine with real parts, imaginary parts combine with imaginary parts.

### COMMON MISTAKE

The imaginary part of \(-2 + j3\) is \(3\), not \(j3\). The symbol \(j\) is the axis marker, not part of the part value.

$$z = a + jb$$

## 2. Polar/exponential form: distance plus direction

The diagram above is the bridge from rectangular form to polar form. The same number \(z = a + jb\) can be read two ways:

- **Rectangular reading:** move \(a\) units on the real axis, then \(b\) units on the imaginary axis.
- **Polar reading:** move a distance \(r\) from the origin at an angle \(\theta\) from the positive real axis.

The dashed guides in Fig. B.2 show the right triangle hidden inside the complex plane. Since \(r\) is the hypotenuse, its horizontal and vertical projections are

$$a = r\cos\theta, \qquad b = r\sin\theta$$

Substituting those projections into \(z = a + jb\) gives the trigonometric polar form:

$$z = a + jb = r\cos\theta + jr\sin\theta = r(\cos\theta + j\sin\theta)$$

Now Euler's formula supplies the shortcut:

$$e^{j\theta} = \cos\theta + j\sin\theta$$

So the same complex number can also be written in exponential form:

$$z = re^{j\theta}$$

Here \(r \geq 0\) is the **distance from the origin** (the magnitude), and \(\theta\) is the **angle from the positive real axis** (the argument). The point \(z^*\) in the diagram is the conjugate \(a - jb\): it has the same real part \(a\), the same magnitude \(r\), and the opposite vertical coordinate \(-b\).

![Representation of a complex number in the complex plane](/figures/page-005-fig__b_2-1.png)
*Keep this figure in view while reading the symbol guide: every label below is visible on the complex-plane diagram.*

**Reading Fig. B.2 quickly:**

- \(a\): horizontal coordinate, so it becomes the real part.
- \(b\): vertical coordinate, so it becomes the imaginary part coefficient.
- \(r\): vector length from the origin to \(z\), so \(r = |z|\).
- \(\theta\): rotation from the positive real axis to the vector.
- \(z^*\): reflection of \(z\) across the real axis.

**Representative example:**

$$2e^{j\pi/3} = 2\left(\cos\frac{\pi}{3} + j\sin\frac{\pi}{3}\right) = 2\left(\frac{1}{2} + j\frac{\sqrt{3}}{2}\right) = 1 + j\sqrt{3}$$

In the diagram language, this means \(r=2\), \(\theta=\pi/3\), \(a=1\), and \(b=\sqrt{3}\). The rectangular point is therefore \((1,\sqrt{3})\), but the polar description remembers the same point as "length 2 at \(60^\circ\)."

### EXAM TRIGGER

Use polar/exponential form for **multiplication, division, powers, roots, magnitude, and phase**.

### COMMON MISTAKE

Do not treat \(e^{j\theta}\) as changing the magnitude. It only supplies **direction**. The magnitude is already set by \(r\). Also do not mix degree and radian mode: \(\pi/3\) means \(60^\circ\), but a calculator in the wrong mode will turn a good formula into a bad number.

$$z = re^{j\theta} = r(\cos\theta + j\sin\theta)$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoZSBxdWFkcmFudCBmaXJzdCwgdGhlbiBjb3JyZWN0IHRoZSBjYWxjdWxhdG9yIGFuZ2xlLiIsInN0YW5kYXJkIjoiVXNlIHRoZSBkaWFncmFtIHRvIGNvbm5lY3Qgb25lIGNvbnZlcnNpb24gZXhhbXBsZSB0byBkaXN0YW5jZSBhbmQgZGlyZWN0aW9uLiIsInRvcF9zY29yZSI6IlVzZSB0aGUgZGlhZ3JhbSB0byBjb21wYXJlIHByaW5jaXBhbCBhbmdsZXMgYW5kIGNvdGVybWluYWwgYW5nbGUgY2hvaWNlcy4ifQ==" style="display:none;"></div>%%KC_END%%
![unknown](/figures/page-009-unknown-1.png)
*This Argand-diagram figure shows how the same rectangular numbers become polar magnitudes and angles in different quadrants.*
<div class="lesson-figure-description">Four Argand diagrams plot complex numbers on axes labeled Re (horizontal) and Im (vertical): (a) \(2 + j3\) in quadrant I at magnitude \(\sqrt{13}\) and angle \(56.3^\circ\), (b) \(-2 + j1\) in quadrant II at magnitude \(\sqrt{5}\) and angle \(153.4^\circ\), (c) \(-2 - j3\) in quadrant III at magnitude \(\sqrt{13}\) and angle \(-123.7^\circ\), and (d) \(1 - j3\) in quadrant IV at magnitude \(\sqrt{10}\) and angle \(-71.6^\circ\). The signs of \(a\) and \(b\) determine the quadrant, the vector length gives \(r\), and the angle from the positive real axis gives \(\theta\). Notice especially that \(-2 - j3\) is NOT at \(56.3^\circ\) even though a naive tangent calculation gives that reference angle — the correct principal angle is \(-123.7^\circ\) because the point lies in quadrant III.</div>

## 3. Converting rectangular to polar: magnitude first, quadrant second

The textbook writes \(r = \sqrt{a^2 + b^2}\) and \(\theta = \tan^{-1}(b/a)\), but you should think of \(\operatorname{atan2}(b, a)\) because it **protects the quadrant** by using the signs of both \(a\) and \(b\).

**Symbol guide:** \(a\) and \(b\) are the rectangular coordinates, \(r \geq 0\) is the magnitude, and \(\theta\) is the argument (principal angle in \((-\pi, \pi]\)).

**Representative example — quadrant III trap:**

For \(z = -2 - j3\):

$$r = \sqrt{(-2)^2 + (-3)^2} = \sqrt{13}$$

The point is in **quadrant III** (both parts negative), so the principal angle is \(-123.7^\circ\), **not** \(56.3^\circ\). A naive \(\tan^{-1}(3/2)\) gives the reference angle only.

### EXAM TRIGGER

Converting \(a + jb\) to \(re^{j\theta}\) — always check the quadrant before writing the angle.

### COMMON MISTAKE

Using \(\tan^{-1}(b/a)\) without checking the signs of \(a\) and \(b\) separately.

$$(r,\,\theta) = \left(\sqrt{a^2+b^2},\;\operatorname{atan2}(b,a)\right)$$

## 4. Conjugate: flip the vertical sign to remove imaginary denominators

If \(z = a + jb\), then the **complex conjugate** is \(z^* = a - jb\). The conjugate keeps the real part and reverses the sign of the imaginary part.

**Eq. (B.9):** Multiplying a complex number by its conjugate always yields a **real number** equal to the squared magnitude:

$$zz^* = a^2 + b^2 = |z|^2$$

Also note (Eq. B.8): \(\operatorname{Im} z = (z - z^*)/(2j)\).

**Minimal example:**

$$(3 + j4)(3 - j4) = 3^2 + 4^2 = 25$$

### EXAM TRIGGER

Whenever a complex number appears in a **denominator**, multiply numerator and denominator by the conjugate of the denominator.

### COMMON MISTAKE

Changing **both** signs (real and imaginary) instead of only the imaginary sign.

$$zz^* = |z|^2$$

## 5. Arithmetic: choose the form that makes the operation easy

**Addition and subtraction** are easiest in rectangular form — real parts combine with real parts, imaginary parts with imaginary parts.

**Multiplication and division** are easiest in polar form. Let \(z_1 = r_1 e^{j\theta_1}\) and \(z_2 = r_2 e^{j\theta_2}\).

**Product rule:**

$$z_1 z_2 = r_1 r_2\, e^{j(\theta_1 + \theta_2)}$$

Multiply magnitudes, add angles.

**Quotient rule (displayed above):** Divide magnitudes, subtract angles.

**Representative example:**

$$\frac{5e^{j53.1^\circ}}{\sqrt{13}\,e^{j56.3^\circ}} = \frac{5}{\sqrt{13}}\,e^{-j3.2^\circ}$$

**Powers and roots:** For powers, multiply the angle by \(n\). For roots, divide the adjusted angle \((\theta + 2\pi k)\) by \(n\) to find all \(n\) distinct roots.

### Important Formula: reciprocal and powers in polar form

For \(z=re^{j\theta}\),

$$\frac{1}{z}=\frac{1}{r}e^{-j\theta},\qquad z^n=r^n e^{jn\theta}$$

Example:

$$z=2e^{j\pi/3}$$

$$\frac{1}{z}=\frac{1}{2}e^{-j\pi/3}$$

$$z^3=2^3e^{j\pi}=8e^{j\pi}=-8$$

### COMMON MISTAKE

Subtracting magnitudes during division, or forgetting to subtract arguments.

$$\frac{z_1}{z_2} = \frac{r_1}{r_2}e^{j(\theta_1 - \theta_2)}$$

## 6. Functions, magnitude/phase, and logarithms

A complex-valued function can be treated like a complex number at each value of \(\omega\): write it in polar form, then read magnitude and phase directly.

**Example pattern:** For a ratio such as

$$X(\omega) = \frac{2 + j\omega}{3 + j4\omega}$$

magnitudes divide and phases subtract:

$$|X(\omega)| = \frac{\sqrt{4 + \omega^2}}{\sqrt{9 + 16\omega^2}}, \quad \angle X(\omega) = \tan^{-1}\!\left(\frac{\omega}{2}\right) - \tan^{-1}\!\left(\frac{4\omega}{3}\right)$$

### Worked Example: extracting Re/Im, magnitude, and phase

Problems may ask for more than one isolated complex number. If a problem gives a complex-valued function such as

$$F(\omega)=\frac{2+j\omega}{3+j4\omega}$$

there are two useful forms.

**Rectangular form for real and imaginary parts:** multiply by the denominator conjugate.

$$F(\omega)=\frac{(2+j\omega)(3-j4\omega)}{(3+j4\omega)(3-j4\omega)}$$

$$F(\omega)=\frac{6+4\omega^2-j5\omega}{9+16\omega^2}$$

So

$$\operatorname{Re}\{F(\omega)\}=\frac{6+4\omega^2}{9+16\omega^2},\qquad
\operatorname{Im}\{F(\omega)\}=\frac{-5\omega}{9+16\omega^2}$$

**Polar form for magnitude and phase:** magnitudes divide and angles subtract.

$$|F(\omega)|=\frac{\sqrt{4+\omega^2}}{\sqrt{9+16\omega^2}}$$

$$\angle F(\omega)=\operatorname{atan2}(\omega,2)-\operatorname{atan2}(4\omega,3)$$

### EXAM TRIGGER

When asked for \(|X(\omega)|\), \(\angle X(\omega)\), real part, or imaginary part — first decide whether rectangular or polar form is cleaner.

**Complex logarithm:** If \(z = re^{j(\theta + 2\pi k)}\), then

$$\ln z = \ln r + j(\theta + 2\pi k)$$

The **principal value** uses \(k = 0\). Different integers \(k\) give different branches.

### COMMON MISTAKE

Forgetting that complex logarithms have **multiple angle branches** — one for each integer \(k\).

$$X(\omega) = |X(\omega)|\,e^{j\angle X(\omega)}$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="interactive_demo" data-teaching-role="interactive_demo" data-visual-use-b64="eyJjcmFtIjoiVXNlIGl0IHRvIHJlY29nbml6ZSB0aGUgY29udmVyc2lvbiBwYXR0ZXJuIHF1aWNrbHkuIiwic3RhbmRhcmQiOiJVc2UgaXQgdG8gY29ubmVjdCBcXChhXFwpLCBcXChiXFwpLCBcXChyXFwpLCBhbmQgXFwoXFx0aGV0YVxcKS4iLCJ0b3Bfc2NvcmUiOiJVc2UgaXQgdG8gY2F0Y2ggcXVhZHJhbnQgYW5kIHNpZ24gbWlzdGFrZXMuIn0=" style="display:none;"></div><div class="kc-interactive-demo" data-demo-b64="eyJ0eXBlIjoiaW50ZXJhY3RpdmVfZGVtbyIsInRpdGxlIjoiRHJhZyB0aGUgY29tcGxleCBudW1iZXIiLCJjb250ZW50IjoiTW92ZSB0aGUgcmVhbCBhbmQgaW1hZ2luYXJ5IGNvbXBvbmVudHMuIFdhdGNoIHRoZSBzYW1lIHBvaW50IGJlY29tZSByZWN0YW5ndWxhciBmb3JtLCBtYWduaXR1ZGUsIGFuZCBhbmdsZS4iLCJleHBsYW5hdGlvbiI6IlRoaXMgZGVtbyBsaW5rcyBjb29yZGluYXRlcyB0byBwb2xhciBmb3JtIGFuZCBxdWFkcmFudC1zYWZlIHBoYXNlLiIsInRlYWNoaW5nX3JvbGUiOiJpbnRlcmFjdGl2ZV9kZW1vIiwibW9kZV9zcGVjaWZpY192aXN1YWxfdXNlIjp7ImNyYW0iOiJVc2UgaXQgdG8gcmVjb2duaXplIHRoZSBjb252ZXJzaW9uIHBhdHRlcm4gcXVpY2tseS4iLCJzdGFuZGFyZCI6IlVzZSBpdCB0byBjb25uZWN0IFxcKGFcXCksIFxcKGJcXCksIFxcKHJcXCksIGFuZCBcXChcXHRoZXRhXFwpLiIsInRvcF9zY29yZSI6IlVzZSBpdCB0byBjYXRjaCBxdWFkcmFudCBhbmQgc2lnbiBtaXN0YWtlcy4ifSwiZGVtb19zcGVjIjp7ImZyYW1ld29yayI6InJlYWN0X2NhbnZhcyIsInBhbmVscyI6W3siaWQiOiJwaGFzb3JfcGFuZWwiLCJ0aXRsZSI6IkNvbXBsZXggcGxhbmUifSx7ImlkIjoid2F2ZV9wYW5lbCIsInRpdGxlIjoiRXF1aXZhbGVudCBwaGFzZSB2aWV3In1dLCJjb250cm9scyI6W3siaWQiOiJzbGlkZXJfYSIsImxhYmVsIjoiYSIsIm1pbiI6LTUsIm1heCI6NSwic3RlcCI6MC4xLCJkZWZhdWx0IjozfSx7ImlkIjoic2xpZGVyX2IiLCJsYWJlbCI6ImIiLCJtaW4iOi01LCJtYXgiOjUsInN0ZXAiOjAuMSwiZGVmYXVsdCI6NH0seyJpZCI6ImFuZ2xlX3RvZ2dsZSIsImxhYmVsIjoiYW5nbGUgdW5pdHMiLCJvcHRpb25zIjpbImRlZ3JlZXMiLCJyYWRpYW5zIl0sImRlZmF1bHQiOiJkZWdyZWVzIn0seyJpZCI6InJlc2V0X2RlbW8iLCJsYWJlbCI6IlJlc2V0IiwiYWN0aW9uIjoic2V0IGRlZmF1bHRzIn1dfX0="></div>%%KC_END%%

#### Common Mistake

Use rectangular form when the question asks for \(\operatorname{Re}\) and \(\operatorname{Im}\). Use polar form when the question asks for magnitude, phase, reciprocal, product, quotient, or powers.

---
**📌 Key Takeaways**
- **Rectangular form (Eq. B.1):** \(z = a + jb\), where \(\operatorname{Re} z = a\) and \(\operatorname{Im} z = b\) (not \(jb\)). Use for addition and subtraction.
- **Polar/exponential form:** \(z = re^{j\theta} = r(\cos\theta + j\sin\theta)\). Use for multiplication, division, powers, roots, magnitude, and phase.
- **Euler's bridge (Eq. B.3):** \(e^{j\theta} = \cos\theta + j\sin\theta\).
- **Magnitude:** \(r = \sqrt{a^2 + b^2}\). Always nonnegative.
- **Argument (quadrant-safe):** \(\theta = \operatorname{atan2}(b, a)\). Never use \(\tan^{-1}(b/a)\) alone — check the quadrant first.
- **Conjugate:** \(z^* = a - jb\). Flip only the imaginary sign.
- **Conjugate identity (Eq. B.9):** \(zz^* = |z|^2\). Use to clear complex denominators.
- **Product rule:** \(z_1 z_2 = r_1 r_2\, e^{j(\theta_1 + \theta_2)}\) — multiply magnitudes, add angles.
- **Quotient rule:** \(z_1 / z_2 = (r_1/r_2)\, e^{j(\theta_1 - \theta_2)}\) — divide magnitudes, subtract angles.
- **Power rule:** \(z^n = r^n e^{jn\theta}\).
- **Root rule:** \(n\)-th roots use \(r^{1/n} e^{j(\theta + 2\pi k)/n}\) for \(k = 0, 1, \ldots, n-1\). Note: \(\sqrt{-1} = \pm j\) and \(\sqrt{-4} = \pm 2j\).
- **Complex function polar form:** \(X(\omega) = |X(\omega)|\, e^{j\angle X(\omega)}\). Magnitude divides, phase subtracts for quotients.
- **Complex logarithm:** \(\ln z = \ln r + j(\theta + 2\pi k)\). Multi-valued — principal value uses \(k = 0\).

*Next, these complex-number tools will support phasors, signals, and frequency-domain calculations.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6OCwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo3LCJtYXgiOjEwfSwia25vd2xlZGdlX3BvaW50cyI6W3siaWQiOiJyZWN0YW5ndWxhcl9mb3JtX3BhcnRzIiwibGFiZWwiOiJSZWN0YW5ndWxhciBmb3JtIGFuZCByZWFsL2ltYWdpbmFyeSBwYXJ0cyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6InJlY3RfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciBcXCh6ID0gLTUgKyBqMlxcKSwgd2hpY2ggc3RhdGVtZW50IGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBcXChcXG9wZXJhdG9ybmFtZXtSZX0geiA9IC01XFwpIGFuZCBcXChcXG9wZXJhdG9ybmFtZXtJbX0geiA9IDJcXCkiLCJCLiBcXChcXG9wZXJhdG9ybmFtZXtSZX0geiA9IC01XFwpIGFuZCBcXChcXG9wZXJhdG9ybmFtZXtJbX0geiA9IGoyXFwpIiwiQy4gXFwoXFxvcGVyYXRvcm5hbWV7UmV9IHogPSAyXFwpIGFuZCBcXChcXG9wZXJhdG9ybmFtZXtJbX0geiA9IC01XFwpIiwiRC4gXFwoXFxvcGVyYXRvcm5hbWV7UmV9IHogPSAtNSArIGpcXCkgYW5kIFxcKFxcb3BlcmF0b3JuYW1le0ltfSB6ID0gMlxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IkluIFxcKGEgKyBqYlxcKSwgdGhlIHJlYWwgcGFydCBpcyBcXChhXFwpIGFuZCB0aGUgaW1hZ2luYXJ5IHBhcnQgaXMgdGhlIHJlYWwgY29lZmZpY2llbnQgXFwoYlxcKSwgbm90IHRoZSB0ZXJtIFxcKGpiXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlxcKGoyXFwpIGlzIHRoZSBpbWFnaW5hcnkgdGVybSwgbm90IHRoZSBpbWFnaW5hcnkgcGFydC4gVGhlIGltYWdpbmFyeSBwYXJ0IGlzIHRoZSByZWFsIG51bWJlciBcXCgyXFwpLiIsIkMiOiJUaGlzIHN3YXBzIHRoZSBjb29yZGluYXRlIHJvbGVzIG9mIFxcKGFcXCkgYW5kIFxcKGJcXCkuIiwiRCI6IlRoZSByZWFsIHBhcnQgY2Fubm90IGluY2x1ZGUgdGhlIHN5bWJvbCBcXChqXFwpLiJ9LCJoaW50IjoiU2VwYXJhdGUgdGhlIGNvZWZmaWNpZW50IGZyb20gdGhlIGF4aXMgbWFya2VyIFxcKGpcXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJwb2xhcl9ldWxlcl9jb252ZXJzaW9uIiwibGFiZWwiOiJFdWxlciBicmlkZ2UgYW5kIHBvbGFyLXRvLXJlY3Rhbmd1bGFyIGNvbnZlcnNpb24iLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJwb2xhcl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQ29udmVydCBcXCgyZV57alxccGkvM31cXCkgdG8gcmVjdGFuZ3VsYXIgZm9ybS4iLCJvcHRpb25zIjpbIkEuIFxcKDEgKyBqXFxzcXJ0ezN9XFwpIiwiQi4gXFwoXFxzcXJ0ezN9ICsgajFcXCkiLCJDLiBcXCgyICsgalxccGkvM1xcKSIsIkQuIFxcKDEgLSBqXFxzcXJ0ezN9XFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVXNlIFxcKHJlXntqXFx0aGV0YX0gPSByKFxcY29zXFx0aGV0YSArIGpcXHNpblxcdGhldGEpXFwpLiBIZXJlIFxcKDJcXGNvcyhcXHBpLzMpID0gMiBcXGNkb3QgXFxmcmFjezF9ezJ9ID0gMVxcKSBhbmQgXFwoMlxcc2luKFxccGkvMykgPSAyIFxcY2RvdCBcXGZyYWN7XFxzcXJ0ezN9fXsyfSA9IFxcc3FydHszfVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGlzIHN3YXBzIGNvc2luZSBhbmQgc2luZSDigJQgY29zaW5lIGdpdmVzIHRoZSByZWFsIHBhcnQsIHNpbmUgZ2l2ZXMgdGhlIGltYWdpbmFyeSBwYXJ0LiIsIkMiOiJUaGUgYW5nbGUgXFwoXFxwaS8zXFwpIGlzIG5vdCBhZGRlZCBhcyBhIHJlY3Rhbmd1bGFyIGltYWdpbmFyeSBjb29yZGluYXRlOyBpdCBtdXN0IGJlIGV2YWx1YXRlZCB0aHJvdWdoIGNvc2luZSBhbmQgc2luZS4iLCJEIjoiVGhlIHNpbmUgb2YgXFwoXFxwaS8zXFwpIGlzIHBvc2l0aXZlLCBzbyB0aGUgaW1hZ2luYXJ5IHBhcnQgaXMgXFwoK1xcc3FydHszfVxcKSwgbm90IFxcKC1cXHNxcnR7M31cXCkuIn0sImhpbnQiOiJVc2UgY29zaW5lIGZvciB0aGUgcmVhbCBwYXJ0IGFuZCBzaW5lIGZvciB0aGUgaW1hZ2luYXJ5IHBhcnQuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoiY2FydGVzaWFuX3RvX3BvbGFyX3F1YWRyYW50IiwibGFiZWwiOiJDYXJ0ZXNpYW4tdG8tcG9sYXIgY29udmVyc2lvbiBhbmQgcXVhZHJhbnQgY29ycmVjdGlvbiIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6InF1YWRfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgc3R1ZGVudCBjb252ZXJ0cyBcXCgtMiAtIGozXFwpIGFuZCBnZXRzIFxcKFxcc3FydHsxM31cXCxlXntqNTYuM15cXGNpcmN9XFwpLiBXaGF0IGlzIHdyb25nPyIsIm9wdGlvbnMiOlsiQS4gVGhlIG1hZ25pdHVkZSBzaG91bGQgYmUgbmVnYXRpdmUuIiwiQi4gVGhlIGFuZ2xlIGlzIGluIHRoZSB3cm9uZyBxdWFkcmFudC4iLCJDLiBUaGUgcmVhbCBhbmQgaW1hZ2luYXJ5IHBhcnRzIG11c3QgYmUgZGl2aWRlZCBieSBcXChcXHNxcnR7MTN9XFwpLiIsIkQuIE5vdGhpbmcgaXMgd3JvbmcuIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiXFwoLTIgLSBqM1xcKSBsaWVzIGluIHF1YWRyYW50IElJSSAoYm90aCBwYXJ0cyBuZWdhdGl2ZSkuIEEgbmFpdmUgXFwoXFx0YW5eey0xfSgzLzIpXFwpIGdpdmVzIHRoZSByZWZlcmVuY2UgYW5nbGUgXFwoNTYuM15cXGNpcmNcXCksIHdoaWNoIHBvaW50cyB0byBxdWFkcmFudCBJLiBUaGUgY29ycmVjdCBwcmluY2lwYWwgYW5nbGUgaXMgXFwoLTEyMy43XlxcY2lyY1xcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJNYWduaXR1ZGUgXFwociA9IFxcc3FydHthXjIgKyBiXjJ9XFwpIGlzIGFsd2F5cyBub25uZWdhdGl2ZS4iLCJDIjoiTm9ybWFsaXphdGlvbiBpcyBub3QgcmVxdWlyZWQgdG8gc3RhdGUgdGhlIHBvbGFyIGZvcm0uIiwiRCI6IlRoZSBhbmdsZSBcXCg1Ni4zXlxcY2lyY1xcKSBwb2ludHMgdG8gcXVhZHJhbnQgSSwgYnV0IHRoZSBudW1iZXIgaXMgaW4gcXVhZHJhbnQgSUlJLiJ9LCJoaW50IjoiUGxvdCB0aGUgc2lnbnM6IG5lZ2F0aXZlIHJlYWwsIG5lZ2F0aXZlIGltYWdpbmFyeSDigJQgdGhhdCBpcyBxdWFkcmFudCBJSUkuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6InRleHRib29rX2FyZ2FuZF9xdWFkcmFudF9jaGVjayIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6InF1YWRfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHBvbGFyIGZvcm0gZ2l2ZXMgdGhlIHByaW5jaXBhbCBhbmdsZSBmb3IgXFwoLTIgKyBqMVxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKFxcc3FydHs1fVxcLGVeey1qMjYuNl5cXGNpcmN9XFwpIiwiQi4gXFwoXFxzcXJ0ezV9XFwsZV57ajE1My40XlxcY2lyY31cXCkiLCJDLiBcXCg1XFwsZV57ajE1My40XlxcY2lyY31cXCkiLCJELiBcXChcXHNxcnR7NX1cXCxlXntqMjYuNl5cXGNpcmN9XFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIHBvaW50IFxcKC0yICsgajFcXCkgaXMgaW4gcXVhZHJhbnQgSUkgKG5lZ2F0aXZlIHJlYWwsIHBvc2l0aXZlIGltYWdpbmFyeSkuIFRoZSBtYWduaXR1ZGUgaXMgXFwoXFxzcXJ0eygtMileMiArIDFeMn0gPSBcXHNxcnR7NX1cXCkgYW5kIHRoZSBwcmluY2lwYWwgYW5nbGUgaXMgXFwoMTUzLjReXFxjaXJjXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkFuIGFuZ2xlIG9mIFxcKC0yNi42XlxcY2lyY1xcKSBwbGFjZXMgdGhlIHBvaW50IGluIHF1YWRyYW50IElWLCBub3QgcXVhZHJhbnQgSUkuIiwiQyI6IlRoZSBhbmdsZSBpcyBjb3JyZWN0LCBidXQgdGhlIG1hZ25pdHVkZSBpcyBcXChcXHNxcnR7NX1cXCksIG5vdCBcXCg1XFwpLiIsIkQiOiJBbiBhbmdsZSBvZiBcXCgyNi42XlxcY2lyY1xcKSBwbGFjZXMgdGhlIHBvaW50IGluIHF1YWRyYW50IEksIG5vdCBxdWFkcmFudCBJSS4ifSwiaGludCI6IlF1YWRyYW50IElJIG1lYW5zIG5lZ2F0aXZlIHJlYWwgcGFydCBhbmQgcG9zaXRpdmUgaW1hZ2luYXJ5IHBhcnQg4oCUIHRoZSBhbmdsZSBpcyBiZXR3ZWVuIFxcKDkwXlxcY2lyY1xcKSBhbmQgXFwoMTgwXlxcY2lyY1xcKS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoiYXJnYW5kX3F1YWRyYW50X3NlbGVjdGlvbiIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiY29uanVnYXRlX2lkZW50aXR5IiwibGFiZWwiOiJDb25qdWdhdGVzIGFuZCBkZW5vbWluYXRvciBjbGVhbnVwIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJjb25qX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGF0IGlzIFxcKCgyICsgajMpKDIgLSBqMylcXCk/Iiwib3B0aW9ucyI6WyJBLiBcXCgtNVxcKSIsIkIuIFxcKDEzXFwpIiwiQy4gXFwoNCAtIGo5XFwpIiwiRC4gXFwoNCArIGo5XFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiQSBjb21wbGV4IG51bWJlciB0aW1lcyBpdHMgY29uanVnYXRlIGlzIHJlYWw6IFxcKCgyICsgajMpKDIgLSBqMykgPSAyXjIgKyAzXjIgPSA0ICsgOSA9IDEzXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgaW5jb3JyZWN0bHkgc3VidHJhY3RzIFxcKDNeMlxcKSBmcm9tIFxcKDJeMlxcKSBpbnN0ZWFkIG9mIGFkZGluZyB0aGVtLiIsIkMiOiJUaGUgY3Jvc3MgdGVybXMgXFwoK2o2XFwpIGFuZCBcXCgtajZcXCkgY2FuY2VsLCBzbyBubyBpbWFnaW5hcnkgdGVybSByZW1haW5zLiIsIkQiOiJBZ2FpbiwgdGhlIGNyb3NzIHRlcm1zIGNhbmNlbCBjb21wbGV0ZWx5LiJ9LCJoaW50IjoiVXNlIFxcKHp6XiogPSB8enxeMiA9IGFeMiArIGJeMlxcKS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJwb2xhcl9hcml0aG1ldGljIiwibGFiZWwiOiJNdWx0aXBsaWNhdGlvbiwgZGl2aXNpb24sIHJlY2lwcm9jYWxzLCBwb3dlcnMsIGFuZCByb290cyBpbiBwb2xhciBmb3JtIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoiYXJpdGhfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIFxcKHpfMSA9IDVlXntqNDBeXFxjaXJjfVxcKSBhbmQgXFwoel8yID0gMmVee2oxNV5cXGNpcmN9XFwpLCB3aGF0IGlzIFxcKHpfMSAvIHpfMlxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKDIuNVxcLGVee2oyNV5cXGNpcmN9XFwpIiwiQi4gXFwoMi41XFwsZV57ajU1XlxcY2lyY31cXCkiLCJDLiBcXCgzXFwsZV57ajI1XlxcY2lyY31cXCkiLCJELiBcXCgxMFxcLGVee2oyNV5cXGNpcmN9XFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiRm9yIGRpdmlzaW9uLCBkaXZpZGUgbWFnbml0dWRlcyBhbmQgc3VidHJhY3QgYW5nbGVzOiBcXCg1LzIgPSAyLjVcXCkgYW5kIFxcKDQwXlxcY2lyYyAtIDE1XlxcY2lyYyA9IDI1XlxcY2lyY1xcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGlzIGFkZHMgdGhlIGFuZ2xlcyBpbnN0ZWFkIG9mIHN1YnRyYWN0aW5nIHRoZW0uIiwiQyI6IlRoaXMgc3VidHJhY3RzIHRoZSBtYWduaXR1ZGVzIFxcKCg1IC0gMiA9IDMpXFwpIGluc3RlYWQgb2YgZGl2aWRpbmcgdGhlbS4iLCJEIjoiVGhpcyBtdWx0aXBsaWVzIHRoZSBtYWduaXR1ZGVzIGluc3RlYWQgb2YgZGl2aWRpbmcgdGhlbS4ifSwiaGludCI6IkRpdmlzaW9uIG1lYW5zIG1hZ25pdHVkZSByYXRpbyBhbmQgYW5nbGUgZGlmZmVyZW5jZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJhcml0aF9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggb3BlcmF0aW9uIGlzIHVzdWFsbHkgZWFzaWVzdCB0byBkbyBhZnRlciBjb252ZXJ0aW5nIHRvIHJlY3Rhbmd1bGFyIGZvcm0/Iiwib3B0aW9ucyI6WyJBLiBBZGRpdGlvbiBvciBzdWJ0cmFjdGlvbiIsIkIuIERpdmlzaW9uIG9mIHR3byBwb2xhciBudW1iZXJzIiwiQy4gVGFraW5nIGEgcG93ZXIgb2YgYSBwb2xhciBudW1iZXIiLCJELiBGaW5kaW5nIHJvb3RzIGZyb20gcG9sYXIgZm9ybSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IkFkZGl0aW9uIGFuZCBzdWJ0cmFjdGlvbiBjb21iaW5lIHJlYWwgcGFydHMgd2l0aCByZWFsIHBhcnRzIGFuZCBpbWFnaW5hcnkgcGFydHMgd2l0aCBpbWFnaW5hcnkgcGFydHMsIHNvIHJlY3Rhbmd1bGFyIGZvcm0gaXMgdGhlIG5hdHVyYWwgY2hvaWNlLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IkRpdmlzaW9uIGlzIGNsZWFuZXIgaW4gcG9sYXIgZm9ybTogZGl2aWRlIG1hZ25pdHVkZXMgYW5kIHN1YnRyYWN0IGFuZ2xlcy4iLCJDIjoiUG93ZXJzIGFyZSBjbGVhbmVyIGluIHBvbGFyIGZvcm06IHJhaXNlIHRoZSBtYWduaXR1ZGUgdG8gdGhlIHBvd2VyIGFuZCBtdWx0aXBseSB0aGUgYW5nbGUuIiwiRCI6IlJvb3RzIGFyZSBjbGVhbmVyIGluIHBvbGFyIGZvcm06IHRha2UgdGhlIHJvb3Qgb2YgdGhlIG1hZ25pdHVkZSBhbmQgZGl2aWRlIHRoZSBhZGp1c3RlZCBhbmdsZSBcXCgoXFx0aGV0YSArIDJcXHBpIGspXFwpIGJ5IFxcKG5cXCkuIn0sImhpbnQiOiJBc2sgd2hpY2ggb3BlcmF0aW9uIHdvcmtzIGNvbXBvbmVudC1ieS1jb21wb25lbnQuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJtYWduaXR1ZGVfcGhhc2VfbG9ncyIsImxhYmVsIjoiTWFnbml0dWRlLCBwaGFzZSwgYW5kIGNvbXBsZXggbG9nYXJpdGhtIGJyYW5jaCBhd2FyZW5lc3MiLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoiZnVuY19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIFxcKFgoXFxvbWVnYSkgPSBcXGRmcmFjezIgKyBqXFxvbWVnYX17MyArIGo0XFxvbWVnYX1cXCksIHdoYXQgaXMgdGhlIGNvcnJlY3QgcGhhc2UgcGF0dGVybj8iLCJvcHRpb25zIjpbIkEuIFxcKFxcYW5nbGUgWCA9IFxcdGFuXnstMX0oXFxvbWVnYS8yKSAtIFxcdGFuXnstMX0oNFxcb21lZ2EvMylcXCkiLCJCLiBcXChcXGFuZ2xlIFggPSBcXHRhbl57LTF9KFxcb21lZ2EvMikgKyBcXHRhbl57LTF9KDRcXG9tZWdhLzMpXFwpIiwiQy4gXFwoXFxhbmdsZSBYID0gXFx0YW5eey0xfSg0XFxvbWVnYS8zKSAtIFxcdGFuXnstMX0oXFxvbWVnYS8yKVxcKSIsIkQuIFxcKFxcYW5nbGUgWCA9IFxcdGFuXnstMX0oXFxvbWVnYS8yKSBcXGNkb3QgXFx0YW5eey0xfSg0XFxvbWVnYS8zKVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IkEgcXVvdGllbnQgc3VidHJhY3RzIHBoYXNlczogcGhhc2Ugb2YgbnVtZXJhdG9yIG1pbnVzIHBoYXNlIG9mIGRlbm9taW5hdG9yLiBUaGUgbnVtZXJhdG9yIFxcKDIgKyBqXFxvbWVnYVxcKSBoYXMgcGhhc2UgXFwoXFx0YW5eey0xfShcXG9tZWdhLzIpXFwpIGFuZCB0aGUgZGVub21pbmF0b3IgXFwoMyArIGo0XFxvbWVnYVxcKSBoYXMgcGhhc2UgXFwoXFx0YW5eey0xfSg0XFxvbWVnYS8zKVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJBZGRpbmcgcGhhc2VzIGNvcnJlc3BvbmRzIHRvIG11bHRpcGxpY2F0aW9uLCBub3QgZGl2aXNpb24uIiwiQyI6IlRoaXMgcmV2ZXJzZXMgbnVtZXJhdG9yIGFuZCBkZW5vbWluYXRvciBpbiB0aGUgc3VidHJhY3Rpb24uIiwiRCI6IlBoYXNlcyBhcmUgc3VidHJhY3RlZCBmb3IgZGl2aXNpb24sIG5ldmVyIG11bHRpcGxpZWQuIn0sImhpbnQiOiJEaXZpc2lvbiBzdWJ0cmFjdHMgYXJndW1lbnRzOiBudW1lcmF0b3IgYW5nbGUgbWludXMgZGVub21pbmF0b3IgYW5nbGUuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImxvZ19xMSIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiV2h5IGlzIFxcKFxcbG4gelxcKSBtdWx0aS12YWx1ZWQgZm9yIGNvbXBsZXggXFwoelxcKT8gR2l2ZSB0aGUga2V5IGZvcm11bGEuIiwiaWRlYWxfYW5zd2VyIjoiQmVjYXVzZSB0aGUgc2FtZSBjb21wbGV4IHBvaW50IGNhbiBiZSByZWFjaGVkIGFmdGVyIGFueSBudW1iZXIgb2YgZnVsbCByb3RhdGlvbnMsIHRoZSBhbmdsZSBpcyBub3QgdW5pcXVlOiBcXCh6ID0gcmVee2ooXFx0aGV0YSArIDJcXHBpIGspfVxcKSBmb3IgYW55IGludGVnZXIgXFwoa1xcKS4gVGhlcmVmb3JlIFxcKFxcbG4geiA9IFxcbG4gciArIGooXFx0aGV0YSArIDJcXHBpIGspXFwpLCBhbmQgZWFjaCBpbnRlZ2VyIFxcKGtcXCkgZ2l2ZXMgYSBkaWZmZXJlbnQgdmFsdWUgb2YgdGhlIGxvZ2FyaXRobS4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IG1lbnRpb24gcmVwZWF0ZWQgYW5nbGVzIG9yIHRoZSBcXCgyXFxwaSBrXFwpIHBlcmlvZGljaXR5IiwiTXVzdCBnaXZlIGEgZm9ybXVsYSBlcXVpdmFsZW50IHRvIFxcKFxcbG4geiA9IFxcbG4gciArIGooXFx0aGV0YSArIDJcXHBpIGspXFwpIiwiTXVzdCBjb25uZWN0IG11bHRpcGxlIHZhbHVlcyB0byBkaWZmZXJlbnQgaW50ZWdlcnMgXFwoa1xcKSJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIGJyYW5jaCBhd2FyZW5lc3MgcmF0aGVyIHRoYW4gcm91dGluZSBhcml0aG1ldGljLiBUaGUga2V5IGluc2lnaHQgaXMgdGhhdCBhbmdsZSBpcyBwZXJpb2RpYywgc28gdGhlIGxvZ2FyaXRobSBpbmhlcml0cyBpbmZpbml0ZWx5IG1hbnkgYnJhbmNoZXMuIiwiaGludCI6Ik9uZSBjb21wbGV4IHBvaW50IGNhbiBiZSByZWFjaGVkIGFmdGVyIGFueSBudW1iZXIgb2YgZnVsbCByb3RhdGlvbnMg4oCUIGVhY2ggcm90YXRpb24gYWRkcyBcXCgyXFxwaVxcKSB0byB0aGUgYW5nbGUuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfV19" style="display:none;"></div>%%KC_END%%
