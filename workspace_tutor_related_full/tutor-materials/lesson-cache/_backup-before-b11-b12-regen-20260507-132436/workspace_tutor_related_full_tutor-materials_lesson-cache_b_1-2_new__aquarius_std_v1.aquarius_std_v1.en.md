## Overview

> **Section Objective:** Understand complex numbers as points in the complex plane, then move confidently between rectangular and polar / exponential forms.

**Concepts In This Section**
- Complex plane
- Rectangular form
- Polar / exponential form
- Euler's formula
- Complex conjugate

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJzdGFuZGFyZCI6IlVzZSB0aGlzIHRleHRib29rIGZpZ3VyZSB0byBhbmNob3IgdGhlIGNvcmUgY29uY2VwdDogYSBjb21wbGV4IG51bWJlciBpcyBhIHBvaW50IGluIDJEIHNwYWNlLCB3aXRoIGl0cyBjb25qdWdhdGUgYXMgYSBtaXJyb3IgaW1hZ2UgYWNyb3NzIHRoZSByZWFsIGF4aXMuIn0=" style="display:none;"></div>%%KC_END%%
![Fig. B.2](/figures/page-005-fig__b_2-1.png)
*Fig. B.2 shows the complex plane with \(z = a + jb\) plotted as a point \((a, b)\), its magnitude \(r\) and angle \(\theta\) defining the polar form, and its conjugate \(z^* = a - jb\) reflected across the real axis.*

## 1. A complex number is a point on a plane

A complex number is a point in two-dimensional space. The horizontal coordinate is the real part, and the vertical coordinate is the imaginary coordinate.

In rectangular form,

\[
z = a + jb
\]

Here \(a\) is the real coordinate and \(b\) is the imaginary coordinate. Be careful: the imaginary part is the real number \(b\), not the whole term \(jb\).

**Minimal example:** If \(z = 5 - 3j\), then

\[
\operatorname{Re}\{z\} = 5, \qquad \operatorname{Im}\{z\} = -3.
\]

> **Common trap:** writing the imaginary part as \(-3j\). The \(j\) marks direction; the value of the imaginary part is \(-3\).

## 2. Rectangular and polar form describe the same point

Rectangular form writes the number directly as

\[
z = a + jb.
\]

Polar / exponential form writes the same point as

\[
z = re^{j\theta},
\]

where

\[
r = |z| = \sqrt{a^2 + b^2},
\qquad
\theta = \angle z.
\]

For first-quadrant examples, you can often use \(\theta = \arctan(b/a)\). In general, you must check the quadrant, so \(\operatorname{atan2}(b,a)\) is safer than blindly trusting \(\arctan(b/a)\).

**Example:** For \(z = 3 + j4\),

\[
r = \sqrt{3^2 + 4^2} = 5,
\qquad
\theta = \arctan(4/3) \approx 53.1^\circ,
\]

so

\[
z = 5e^{j53.1^\circ}.
\]

## 3. Euler's formula is the bridge

Euler's formula connects exponential form to rectangular coordinates:

\[
e^{j\theta} = \cos\theta + j\sin\theta.
\]

Multiplying by \(r\) gives

\[
re^{j\theta} = r\cos\theta + jr\sin\theta.
\]

So the coordinate conversion rules are

\[
a = r\cos\theta,
\qquad
b = r\sin\theta.
\]

This is why rectangular form and polar form are not two different numbers. They are two descriptions of the same point.

**Example:** 

\[
5e^{j53.1^\circ} = 5\cos(53.1^\circ) + j\,5\sin(53.1^\circ) \approx 3 + j4.
\]

## 4. The conjugate flips the imaginary sign

The complex conjugate changes only the sign of the imaginary part:

\[
z^* = a - jb.
\]

If \(z = re^{j\theta}\), then

\[
z^* = re^{-j\theta}.
\]

Geometrically, the conjugate reflects the point across the real axis. The distance from the origin stays the same, but the angle changes sign.

A key identity is

\[
zz^* = |z|^2 = a^2 + b^2.
\]

**Minimal example:** If \(z = 3 + j4\), then \(z^* = 3 - j4\), and

\[
(3 + j4)(3 - j4) = 25 = |z|^2.
\]

## 5. Choose the form that makes the job easier

Use rectangular form when you want to read coordinates, add, subtract, or identify real and imaginary parts quickly.

Use polar / exponential form when magnitude and angle matter, or when multiplication, division, powers, and roots are easier to think about geometrically.

> **Exam trap:** \(\arctan(b/a)\) by itself can give the wrong angle if the point is not in Quadrant I. Always check the signs of \(a\) and \(b\).

## Key Takeaways

- Rectangular form: \(z = a + jb\).
- Polar / exponential form: \(z = re^{j\theta}\).
- Magnitude: \(|z| = \sqrt{a^2 + b^2}\).
- Coordinate conversion: \(a = r\cos\theta\), \(b = r\sin\theta\).
- Euler's formula: \(e^{j\theta} = \cos\theta + j\sin\theta\).
- Conjugate: \(z^* = a - jb = re^{-j\theta}\).
- Conjugate product: \(zz^* = |z|^2 = a^2 + b^2\).
- The imaginary part of \(a + jb\) is \(b\), not \(jb\).
- Use rectangular form for addition / subtraction.
- Use polar form when magnitude and phase matter.

*In the next section, these same forms become tools for operations such as multiplication, division, powers, and signal phase shifts.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NCwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo0LCJtYXgiOjV9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImJfMV8yX2FsZ2VicmFfb2ZfY29tcGxleF9udW1iZXJzX2NvcmUiLCJsYWJlbCI6IkIuMS0yIEFsZ2VicmEgb2YgQ29tcGxleCBOdW1iZXJzIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoiY29yZV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggc3RhdGVtZW50IGJlc3QgY2FwdHVyZXMgdGhlIG1haW4gbGVhcm5pbmcgZ29hbCBvZiBCLjEtMiBBbGdlYnJhIG9mIENvbXBsZXggTnVtYmVycz8iLCJvcHRpb25zIjpbIkEuIE1lbW9yaXplIHRoZSBmaW5hbCByZXN1bHQgd2l0aG91dCBjb25uZWN0aW5nIGl0IHRvIHRoZSB2aXN1YWwgb3Igc3RydWN0dXJhbCBtZWFuaW5nIiwiQi4gVW5kZXJzdGFuZCB0aGUgY29yZSBkZWZpbml0aW9uLCB0aGUgdmlzdWFsL3N0cnVjdHVyYWwgbWVhbmluZywgYW5kIGhvdyB0aGUgaWRlYSBhcHBlYXJzIGluIGV4YW0gcXVlc3Rpb25zIiwiQy4gVHJlYXQgdGhlIHRvcGljIGFzIHB1cmUgc3ltYm9sIG1hbmlwdWxhdGlvbiB3aXRoIG5vIGNvbmNlcHR1YWwgc3RydWN0dXJlIiwiRC4gRm9jdXMgb25seSBvbiB0ZXJtaW5vbG9neSBiZWNhdXNlIHRoZSBleGFtIG5ldmVyIHRlc3RzIGludGVycHJldGF0aW9uIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiU3Ryb25nIHVuZGVyc3RhbmRpbmcgaW4gdGhpcyBzZWN0aW9uIG1lYW5zIGNvbm5lY3RpbmcgdGhlIGRlZmluaXRpb24sIHRoZSBzdHJ1Y3R1cmUvdmlzdWFsIG1lYW5pbmcsIGFuZCB0aGUgZXhhbS1mYWNpbmcgaW50ZXJwcmV0YXRpb24g4oCUIGZvciBleGFtcGxlLCBrbm93aW5nIHRoYXQgXFwoeiA9IGEgKyBqYiA9IHJlXntqXFx0aGV0YX1cXCkgYXJlIHR3byB2aWV3cyBvZiB0aGUgc2FtZSBwb2ludCwgYW5kIHRoYXQgdGhlIGltYWdpbmFyeSBwYXJ0IGlzIFxcKGJcXCksIG5vdCBcXChqYlxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJNZW1vcml6YXRpb24gYWxvbmUgdXN1YWxseSBicmVha3Mgb24gdmFyaWFudHMgYW5kIHRyYXAgcXVlc3Rpb25zIOKAlCBmb3IgaW5zdGFuY2UsIHNpZ24gZXJyb3JzIGluIHRoZSBjb25qdWdhdGUgb3IgY29uZnVzaW5nIHRoZSBpbWFnaW5hcnkgcGFydCB3aXRoIHRoZSBpbWFnaW5hcnkgdGVybS4iLCJDIjoiVGhlIHNlY3Rpb24gaXMgbWVhbnQgdG8gYmUgdW5kZXJzdG9vZCBzdHJ1Y3R1cmFsbHk6IGVhY2ggZm9ybSBoYXMgYSBnZW9tZXRyaWMgbWVhbmluZyBvbiB0aGUgY29tcGxleCBwbGFuZSwgbm90IGp1c3QgYSBzeW1ib2xpYyBydWxlLiIsIkQiOiJJbnRlcnByZXRhdGlvbiBpcyBleGFjdGx5IHdoYXQgbWFueSBleGFtIHF1ZXN0aW9ucyBwcm9iZSDigJQgZS5nLiwgaWRlbnRpZnlpbmcgXFwoXFx0ZXh0e0ltfVxce3pcXH1cXCkgY29ycmVjdGx5IG9yIGNvbnZlcnRpbmcgYmV0d2VlbiBmb3JtcyB1bmRlciB0aW1lIHByZXNzdXJlLiJ9LCJoaW50IjoiUGljayB0aGUgb3B0aW9uIHRoYXQgY29tYmluZXMgbWVhbmluZywgcmVwcmVzZW50YXRpb24sIGFuZCBleGFtIHVzZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
