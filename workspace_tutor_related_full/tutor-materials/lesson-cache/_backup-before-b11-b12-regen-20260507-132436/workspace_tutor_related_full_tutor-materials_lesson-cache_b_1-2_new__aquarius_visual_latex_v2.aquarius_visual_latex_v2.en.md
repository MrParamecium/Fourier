%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJVc2UgdGV4dGJvb2sgY29tcGxleC1wbGFuZSBmaWd1cmVzIHdoZXJlIHRoZSBib29rIGFscmVhZHkgcHJvdmlkZXMgdGhlIGNhbm9uaWNhbCBnZW9tZXRyeSwgYW5kIHVzZSBMYVRlWC1uYXRpdmUgZm9ybXVsYSBibG9ja3MgZm9yIGFsZ2VicmEgcnVsZXMgdGhhdCBhcmUgbW9yZSBwcmVjaXNlIHN5bWJvbGljYWxseSB0aGFuIGFzIGltYWdlcy4gRG8gbm90IHVzZSBHUFRJbWFnZTIgYmVjYXVzZSByZWFkeS1tYWRlIHRleHRib29rIHZpc3VhbHMgYW5kIGZvcm11bGFzIGFyZSBzdWZmaWNpZW50LiIsImNyYW0iOiJVc2UgdGhlIGZpZ3VyZXMgdG8gcmVjb2duaXplIHF1YWRyYW50LCBzaWduLCBtYWduaXR1ZGUsIGFuZCBhbmdsZSBxdWlja2x5LiIsInN0YW5kYXJkIjoiVXNlIGVhY2ggdmlzdWFsIGJlc2lkZSBvbmUgcmVwcmVzZW50YXRpdmUgY29udmVyc2lvbiBvciBpZGVudGl0eSBleGFtcGxlLiIsInRvcF9zY29yZSI6IlVzZSB2aXN1YWxzIHRvIGNhdGNoIHF1YWRyYW50LCBjb25qdWdhdGUtcmVmbGVjdGlvbiwgYW5kIGFuZ2xlLXBlcmlvZGljaXR5IHRyYXBzLiJ9" style="display:none;"></div>%%KC_END%%
# Algebra of Complex Numbers

> **Section Objective:** Use complex-number forms and algebra rules to compute, convert, and interpret magnitude and phase.

---

**Concepts In This Section**

- Cartesian form
- Polar / exponential form
- Euler formula
- Conjugate
- Magnitude and phase
- Multiplication and division
- Powers and roots
- Complex logarithms

## 1. Cartesian, polar, and exponential forms

$$\begin{aligned}
z &= a + jb, \qquad \operatorname{Re}\{z\} = a, \qquad \operatorname{Im}\{z\} = b \\
a &= r\cos\theta, \qquad b = r\sin\theta \\
r &= \sqrt{a^2 + b^2}, \qquad \theta = \tan^{-1}\!\left(\frac{b}{a}\right) \text{ with quadrant correction} \\
z &= r(\cos\theta + j\sin\theta) = re^{j\theta}, \qquad e^{j\theta} = \cos\theta + j\sin\theta
\end{aligned}$$
***Three ways to write the same number.** Cartesian form \(z = a + jb\) uses the horizontal component \(a\) (real part) and vertical component \(b\) (imaginary part). Polar/exponential form \(re^{j\theta}\) uses distance \(r\) from the origin and angle \(\theta\) from the positive real axis. The bridge is Euler's formula \(e^{j\theta} = \cos\theta + j\sin\theta\).

**When to use which form:** Cartesian for addition and subtraction; polar/exponential for multiplication, division, and powers.

#### TRAP — Quadrant correction
The calculator gives \(\tan^{-1}(b/a)\) in \((-90°, 90°)\) only. Always check the signs of \(a\) and \(b\) to place the angle in the correct quadrant.

**Example:** For \(z = 2 + j3\), \(r = \sqrt{4+9} = \sqrt{13}\) and \(\theta \approx 56.3°\).*

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiUmVhZCBcXChhXFwpLCBcXChiXFwpLCBcXChyXFwpLCBhbmQgXFwoXFx0aGV0YVxcKSBkaXJlY3RseSBmcm9tIHRoZSBkaWFncmFtLiIsInN0YW5kYXJkIjoiQ29ubmVjdCB0aGUgZm9ybXVsYSBcXCh6ID0gYSArIGpiID0gcmVee2pcXHRoZXRhfVxcKSB0byBvbmUgcG9pbnQgaW4gdGhlIGNvbXBsZXggcGxhbmUuIiwidG9wX3Njb3JlIjoiTm90aWNlIHRoYXQgdGhlIGNvbmp1Z2F0ZSBoYXMgdGhlIHNhbWUgcmVhbCBwYXJ0IGFuZCBvcHBvc2l0ZSBpbWFnaW5hcnkgcGFydC4ifQ==" style="display:none;"></div>%%KC_END%%
![Fig. B.2](/figures/page-005-fig__b_2-1.png)
*This figure shows one complex number in the complex plane using coordinates, magnitude, angle, and conjugate reflection.*
<div class="lesson-figure-description">The horizontal axis is labeled Real and the vertical axis is labeled Imaginary. A point \(z\) is plotted at coordinates \((a, b)\) with dashed guides to both axes. A vector from the origin to \(z\) is labeled with magnitude \(r\) and angle \(\theta\) measured from the positive real axis. A second point \(z^* = a - jb\) appears at \((a, -b)\), reflected across the real axis. Students should notice that \(r\) is the distance from the origin, \(\theta\) is measured counterclockwise from the positive real axis, and \(z^*\) shares the same real part \(a\) but has the opposite imaginary part \(-b\).</div>

## 2. Conjugates and unit-angle identities

$$\begin{aligned}
z^* &= a - jb = re^{-j\theta} = |z|e^{-j\angle z} \\
\operatorname{Re}\{z\} &= \frac{z + z^*}{2}, \qquad \operatorname{Im}\{z\} = \frac{z - z^*}{2j} \\
zz^* &= |z|^2, \qquad \frac{1}{z} = \frac{1}{r}e^{-j\theta} \\
1 &= e^{j2\pi n}, \quad -1 = e^{j(\pi + 2\pi n)}, \quad j = e^{j(\pi/2 + 2\pi n)}, \quad -j = e^{j(-\pi/2 + 2\pi n)}
\end{aligned}$$
***Conjugation reflects across the real axis:** it changes \(\theta\) to \(-\theta\) and leaves \(r\) unchanged. Here \(n\) is any integer, capturing the \(2\pi\) periodicity of angle.

**When to use these identities:**
- Simplify denominators: multiply numerator and denominator by \(z^*\).
- Extract real/imaginary parts: use the \((z \pm z^*)/2\) formulas.
- Compute reciprocals: \(1/z = e^{-j\theta}/r\) in polar form.
- Recognize special numbers: \(1, -1, j, -j\) as unit-circle points.

#### TRAP
Conjugation changes **only** the sign of the imaginary part. The real part \(a\) is unchanged.

**Example:** If \(z = 3 - j4\), then \(z^* = 3 + j4\) and \(zz^* = 3^2 + 4^2 = 25\).*

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="exam_pattern_anchor" data-visual-use-b64="eyJjcmFtIjoiTWVtb3JpemUgd2hlcmUgXFwoMSwgLTEsIGosXFwpIGFuZCBcXCgtalxcKSBzaXQgb24gdGhlIHVuaXQgY2lyY2xlLiIsInN0YW5kYXJkIjoiVXNlIHRoZSBkaWFncmFtIHRvIGNvbm5lY3QgXFwoZV57alxcdGhldGF9XFwpIHdpdGggcm90YXRpb24gYW5nbGUuIiwidG9wX3Njb3JlIjoiVXNlIHRoZSByZXBlYXRlZCBcXCgyXFxwaVxcKSBhbmdsZSBpZGVhIHRvIGF2b2lkIHJlamVjdGluZyBlcXVpdmFsZW50IGFuZ2xlcy4ifQ==" style="display:none;"></div>%%KC_END%%
![Fig. B.3](/figures/page-007-fig__b_3-1.png)
*This figure shows how exponential form \(re^{j\theta}\) places a complex number by radius and angle, and where \(1, -1, j, -j\) sit on the unit circle.*
<div class="lesson-figure-description">Two complex-plane diagrams with horizontal Re and vertical Im axes. In (a), a vector from the origin to a point labeled \(re^{j\theta}\) has magnitude \(r\) and angle \(\theta\) from the positive real axis, illustrating polar form. In (b), the unit points \(1, -1, j, -j\) are marked on the axes with circular arrows labeled \(\pi/2, -\pi/2, \pi, -\pi\), showing how multiplying by \(e^{j\theta}\) corresponds to rotation and how standard angles map to key points on the unit circle. Adding any integer multiple of \(2\pi\) to the angle returns to the same point.</div>

## 3. Complex arithmetic: choose the form that makes the work shortest

$$\begin{aligned}
(a+jb)+(c+jd) &= (a+c)+j(b+d) \\
(a+jb)(c+jd) &= (ac-bd)+j(ad+bc) \\
\frac{a+jb}{c+jd} &= \frac{(a+jb)(c-jd)}{c^2+d^2} \\
z_1 z_2 &= r_1 r_2\, e^{j(\theta_1+\theta_2)}, \qquad \frac{z_1}{z_2} = \frac{r_1}{r_2}\, e^{j(\theta_1-\theta_2)} \\
z^n &= r^n e^{jn\theta}, \qquad z^{1/n} = r^{1/n} e^{j(\theta+2\pi k)/n} \\
\ln z &= \ln r + j(\theta + 2\pi k), \qquad \operatorname{Ln}\, z = \ln r + j\theta_{\text{principal}}
\end{aligned}$$
***Rule of thumb:** Use Cartesian form for addition and subtraction. Use polar/exponential form for multiplication, division, powers, roots, and logarithms — the algebra collapses to scalar operations on \(r\) and \(\theta\).

For roots and logarithms, \(k\) is an integer branch index. Each value of \(k\) gives a distinct root or branch of the logarithm. The principal value uses \(k = 0\) and the principal argument \(\theta \in (-\pi, \pi]\).

**Worked example — division in polar form:**

Let \(z_1 = 2e^{j\pi/4}\) and \(z_2 = 4e^{j2\pi/3}\). Then:
$$\frac{z_1}{z_2} = \frac{2}{4}\, e^{j(\pi/4 - 2\pi/3)} = \frac{1}{2}\, e^{j(3\pi/12 - 8\pi/12)} = \frac{1}{2}\, e^{-j5\pi/12}$$

#### TRAPS
- Do **not** add magnitudes when multiplying — multiply them.
- Do **not** add angles when dividing — subtract them.
- Do **not** forget the \(k\) branches when taking roots or logarithms.*

---
**📌 Key Takeaways**
- Cartesian form: \(z = a + jb\), where \(\operatorname{Re}\{z\} = a\) and \(\operatorname{Im}\{z\} = b\).
- Polar/exponential form: \(z = re^{j\theta}\), \(r = \sqrt{a^2+b^2}\), \(\theta = \tan^{-1}(b/a)\) with quadrant correction.
- Conjugate: \(z^* = a - jb\); product \(zz^* = |z|^2\); conjugation never changes the real part.
- Polar arithmetic: \(z_1 z_2 = r_1 r_2\, e^{j(\theta_1+\theta_2)}\) and \(z_1/z_2 = (r_1/r_2)\, e^{j(\theta_1-\theta_2)}\).

*Next, these complex-number tools become the shortcut language for sinusoids and phasors.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NSwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo0LCJtYXgiOjV9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImZvcm1zX2FuZF9jb252ZXJzaW9uIiwibGFiZWwiOiJDYXJ0ZXNpYW4sIHBvbGFyLCBhbmQgZXhwb25lbnRpYWwgZm9ybXMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJxMV9xdWFkcmFudF9jb252ZXJzaW9uIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGF0IGlzIHRoZSBwcmluY2lwYWwgcG9sYXIgZm9ybSBvZiBcXCh6ID0gLTIgLSBqM1xcKT8iLCJvcHRpb25zIjpbIkEuIFxcKFxcc3FydHsxM31cXCwgZV57ajU2LjPCsH1cXCkiLCJCLiBcXChcXHNxcnR7MTN9XFwsIGVeey1qMTIzLjfCsH1cXCkiLCJDLiBcXChcXHNxcnR7NX1cXCwgZV57ajE1My40wrB9XFwpIiwiRC4gXFwoMTNcXCwgZV57LWoxMjMuN8KwfVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBtYWduaXR1ZGUgaXMgXFwociA9IFxcc3FydHsoLTIpXjIgKyAoLTMpXjJ9ID0gXFxzcXJ0ezEzfVxcKS4gQm90aCByZWFsIGFuZCBpbWFnaW5hcnkgcGFydHMgYXJlIG5lZ2F0aXZlLCBzbyB0aGUgcG9pbnQgaXMgaW4gcXVhZHJhbnQgSUlJLiBUaGUgcHJpbmNpcGFsIGFuZ2xlIGlzIFxcKC0xMjMuN8KwXFwpLCBub3QgdGhlIHJhdyBjYWxjdWxhdG9yIHZhbHVlIFxcKDU2LjPCsFxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJcXCg1Ni4zwrBcXCkgaXMgdGhlIGNhbGN1bGF0b3IgdGFuZ2VudCBhbmdsZSBiZWZvcmUgcXVhZHJhbnQgY29ycmVjdGlvbiDigJQgaXQgcGxhY2VzIHRoZSBwb2ludCBpbiBxdWFkcmFudCBJLCBub3QgSUlJLiIsIkMiOiJcXChcXHNxcnR7NX1cXCkgaXMgdGhlIG1hZ25pdHVkZSBvZiBcXCgtMiArIGoxXFwpLCBub3QgXFwoLTIgLSBqM1xcKS4iLCJEIjoiVGhlIG1hZ25pdHVkZSBpcyBcXChcXHNxcnR7MTN9XFwpLCBub3QgXFwoMTNcXCkuIFNxdWFyaW5nIHRoZSBtYWduaXR1ZGUgaXMgYSBjb21tb24gZXJyb3IuIn0sImhpbnQiOiJQbG90IHRoZSBzaWducyBvZiBcXChhXFwpIGFuZCBcXChiXFwpIGJlZm9yZSB0cnVzdGluZyB0aGUgdGFuZ2VudCBvdXRwdXQuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImNvbXBsZXhfcGxhbmVfcG9pbnRfcGxvdCIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6InEyX3BvbGFyX3RvX2NhcnRlc2lhbiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQ29udmVydCBcXCgyZV57alxccGkvM31cXCkgdG8gQ2FydGVzaWFuIGZvcm0uIiwib3B0aW9ucyI6WyJBLiBcXCgxICsgalxcc3FydHszfVxcKSIsIkIuIFxcKFxcc3FydHszfSArIGoxXFwpIiwiQy4gXFwoMiArIGpcXHBpLzNcXCkiLCJELiBcXCgtMSArIGpcXHNxcnR7M31cXCkiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJBcHBseSBcXChhID0gclxcY29zXFx0aGV0YVxcKSBhbmQgXFwoYiA9IHJcXHNpblxcdGhldGFcXCk6IFxcKGEgPSAyXFxjb3MoXFxwaS8zKSA9IDIgXFxjZG90IFxcZnJhY3sxfXsyfSA9IDFcXCkgYW5kIFxcKGIgPSAyXFxzaW4oXFxwaS8zKSA9IDIgXFxjZG90IFxcZnJhY3tcXHNxcnR7M319ezJ9ID0gXFxzcXJ0ezN9XFwpLiBTbyBcXCh6ID0gMSArIGpcXHNxcnR7M31cXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhlIGNvc2luZSBhbmQgc2luZSB2YWx1ZXMgYXJlIHN3YXBwZWQg4oCUIFxcKFxcY29zKFxccGkvMykgPSAxLzJcXCkgYW5kIFxcKFxcc2luKFxccGkvMykgPSBcXHNxcnR7M30vMlxcKSwgbm90IHRoZSByZXZlcnNlLiIsIkMiOiJUaGUgYW5nbGUgXFwoXFxwaS8zXFwpIGlzIG5vdCB0aGUgaW1hZ2luYXJ5IGNvZWZmaWNpZW50OyBpdCBtdXN0IGJlIHBhc3NlZCB0aHJvdWdoIHNpbmUgYW5kIGNvc2luZSBmaXJzdC4iLCJEIjoiXFwoXFxwaS8zXFwpIGlzIGluIHF1YWRyYW50IEksIHNvIHRoZSByZWFsIHBhcnQgXFwoXFxjb3MoXFxwaS8zKSA9IDEvMiA+IDBcXCkgaXMgcG9zaXRpdmUuIn0sImhpbnQiOiJVc2UgXFwoYSA9IHJcXGNvc1xcdGhldGFcXCkgYW5kIFxcKGIgPSByXFxzaW5cXHRoZXRhXFwpIHdpdGggXFwociA9IDJcXCkgYW5kIFxcKFxcdGhldGEgPSBcXHBpLzNcXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoiY29uanVnYXRlX2lkZW50aXRpZXMiLCJsYWJlbCI6IkNvbmp1Z2F0ZSwgbWFnbml0dWRlLCBhbmQgcmVjaXByb2NhbCIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6InEzX2Nvbmp1Z2F0ZV9wcm9kdWN0IiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgXFwoeiA9IDMgLSBqNFxcKSwgd2hpY2ggc3RhdGVtZW50IGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBcXCh6XiogPSAtMyArIGo0XFwpIGFuZCBcXCh6el4qID0gMjVcXCkiLCJCLiBcXCh6XiogPSAzICsgajRcXCkgYW5kIFxcKHp6XiogPSAyNVxcKSIsIkMuIFxcKHpeKiA9IDMgKyBqNFxcKSBhbmQgXFwoenpeKiA9IDVcXCkiLCJELiBcXCh6XiogPSAzIC0gajRcXCkgYW5kIFxcKHp6XiogPSAyNVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkNvbmp1Z2F0aW9uIGNoYW5nZXMgb25seSB0aGUgc2lnbiBvZiB0aGUgaW1hZ2luYXJ5IHBhcnQ6IFxcKHpeKiA9IDMgKyBqNFxcKS4gVGhlIG1hZ25pdHVkZSBzcXVhcmVkIGlzIFxcKHx6fF4yID0gM14yICsgNF4yID0gOSArIDE2ID0gMjVcXCksIHNvIFxcKHp6XiogPSAyNVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGUgcmVhbCBwYXJ0IG11c3Qgbm90IGNoYW5nZSBzaWduIGR1cmluZyBjb25qdWdhdGlvbiDigJQgb25seSB0aGUgaW1hZ2luYXJ5IHBhcnQgZmxpcHMuIiwiQyI6IlxcKDVcXCkgaXMgXFwofHp8XFwpLCBub3QgXFwofHp8XjJcXCkuIFRoZSBwcm9kdWN0IFxcKHp6XiogPSB8enxeMiA9IDI1XFwpLiIsIkQiOiJUaGF0IGlzIFxcKHpcXCkgaXRzZWxmLCBub3QgaXRzIGNvbmp1Z2F0ZS4gVGhlIGltYWdpbmFyeSBwYXJ0IG11c3QgZmxpcCBzaWduLiJ9LCJoaW50IjoiQ29uanVnYXRpb24gcmVmbGVjdHMgYWNyb3NzIHRoZSByZWFsIGF4aXMg4oCUIHRoZSByZWFsIHBhcnQgc3RheXMgZml4ZWQuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImNvbmp1Z2F0ZV9yZWZsZWN0aW9uX2NoZWNrIiwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoicG9sYXJfYXJpdGhtZXRpYyIsImxhYmVsIjoiTXVsdGlwbGljYXRpb24sIGRpdmlzaW9uLCBwb3dlcnMsIGFuZCByb290cyBpbiBwb2xhciBmb3JtIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoicTRfcG9sYXJfZGl2aXNpb24iLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIFxcKHpfMSA9IDJlXntqXFxwaS80fVxcKSBhbmQgXFwoel8yID0gNGVee2oyXFxwaS8zfVxcKSwgd2hhdCBpcyBcXCh6XzEvel8yXFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoOFxcLCBlXntqMTFcXHBpLzEyfVxcKSIsIkIuIFxcKFxcdGZyYWN7MX17Mn1cXCwgZV57ajExXFxwaS8xMn1cXCkiLCJDLiBcXChcXHRmcmFjezF9ezJ9XFwsIGVeey1qNVxccGkvMTJ9XFwpIiwiRC4gXFwoMlxcLCBlXnstajVcXHBpLzEyfVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IkRpdmlkZSBtYWduaXR1ZGVzOiBcXCgyLzQgPSAxLzJcXCkuIFN1YnRyYWN0IGFuZ2xlczogXFwoXFxwaS80IC0gMlxccGkvMyA9IDNcXHBpLzEyIC0gOFxccGkvMTIgPSAtNVxccGkvMTJcXCkuIFJlc3VsdDogXFwoXFx0ZnJhY3sxfXsyfVxcLCBlXnstajVcXHBpLzEyfVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGF0IG11bHRpcGxpZXMgdGhlIG1hZ25pdHVkZXMgKFxcKDIgXFx0aW1lcyA0ID0gOFxcKSkgYW5kIGFkZHMgdGhlIGFuZ2xlcyDigJQgdGhlIHJ1bGUgZm9yIG11bHRpcGxpY2F0aW9uLCBub3QgZGl2aXNpb24uIiwiQiI6IlRoZSBtYWduaXR1ZGUgXFwoMS8yXFwpIGlzIGNvcnJlY3QsIGJ1dCB0aGUgYW5nbGVzIHdlcmUgYWRkZWQgaW5zdGVhZCBvZiBzdWJ0cmFjdGVkLiIsIkQiOiJUaGUgYW5nbGUgXFwoLTVcXHBpLzEyXFwpIGlzIGNvcnJlY3QsIGJ1dCB0aGUgbWFnbml0dWRlIFxcKDJcXCkgd2FzIG5vdCBkaXZpZGVkIOKAlCBpdCBzaG91bGQgYmUgXFwoMS8yXFwpLiJ9LCJoaW50IjoiRGl2aXNpb24gaW4gcG9sYXIgZm9ybTogbWFnbml0dWRlIHJhdGlvIGFuZCBhbmdsZSBkaWZmZXJlbmNlLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6InF1YWRyYW50X3RyYXAiLCJsYWJlbCI6IlF1YWRyYW50IGNvcnJlY3Rpb24gZm9yIGludmVyc2UgdGFuZ2VudCIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6InE1X3doeV9hbmdsZV93cm9uZyIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQSBzdHVkZW50IHNheXMgdGhlIGFuZ2xlIG9mIFxcKC0yIC0gajNcXCkgaXMgXFwoXFx0YW5eey0xfVxcIVxcbGVmdChcXGZyYWN7LTN9ey0yfVxccmlnaHQpID0gNTYuM8KwXFwpLiBFeHBsYWluIHdoeSB0aGlzIGlzIHdyb25nIGFuZCBnaXZlIHRoZSBwcmluY2lwYWwgYW5nbGUuIiwiaWRlYWxfYW5zd2VyIjoiVGhlIHRhbmdlbnQgcmF0aW8gXFwoKC0zKS8oLTIpID0gMy8yXFwpIGlzIHBvc2l0aXZlLCBzbyB0aGUgY2FsY3VsYXRvciByZXR1cm5zIFxcKDU2LjPCsFxcKSwgd2hpY2ggaXMgYSBmaXJzdC1xdWFkcmFudCBhbmdsZS4gSG93ZXZlciwgdGhlIHBvaW50IFxcKC0yIC0gajNcXCkgaGFzIGJvdGggcmVhbCBhbmQgaW1hZ2luYXJ5IHBhcnRzIG5lZ2F0aXZlLCBwbGFjaW5nIGl0IGluIHF1YWRyYW50IElJSS4gVGhlIGNvcnJlY3QgcHJpbmNpcGFsIGFuZ2xlIGlzIFxcKDU2LjPCsCAtIDE4MMKwID0gLTEyMy43wrBcXCkuIiwiZ3JhZGluZ19ydWJyaWMiOlsiU3RhdGVzIHRoYXQgdGhlIHBvaW50IGlzIGluIHF1YWRyYW50IElJSSBiZWNhdXNlIGJvdGggXFwoYSA8IDBcXCkgYW5kIFxcKGIgPCAwXFwpLiIsIkV4cGxhaW5zIHRoYXQgXFwoNTYuM8KwXFwpIGlzIG9ubHkgdGhlIHJlZmVyZW5jZS9jYWxjdWxhdG9yIGFuZ2xlLCBub3QgdGhlIHRydWUgYXJndW1lbnQuIiwiR2l2ZXMgXFwoLTEyMy43wrBcXCkgYXMgdGhlIHByaW5jaXBhbCBhbmdsZS4iXSwiZXhwbGFuYXRpb24iOiJUaGlzIHF1ZXN0aW9uIHRhcmdldHMgdGhlIG1vc3QgY29tbW9uIGNvbnZlcnNpb24gdHJhcDogdHJ1c3RpbmcgXFwoXFx0YW5eey0xfShiL2EpXFwpIHdpdGhvdXQgY2hlY2tpbmcgdGhlIHNpZ25zIG9mIFxcKGFcXCkgYW5kIFxcKGJcXCkgdG8gZGV0ZXJtaW5lIHRoZSBjb3JyZWN0IHF1YWRyYW50LiIsImhpbnQiOiJGaXJzdCBsb2NhdGUgdGhlIHBvaW50IG9uIHRoZSBjb21wbGV4IHBsYW5lIHVzaW5nIHRoZSBzaWducyBvZiBcXChhXFwpIGFuZCBcXChiXFwpLCB0aGVuIGNob29zZSB0aGUgYW5nbGUuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6Indyb25nX3ZzX3JpZ2h0X3F1YWRyYW50X2FuZ2xlIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19XX0=" style="display:none;"></div>%%KC_END%%


## 4. Try It: Drag the Point

Use this demo before memorizing the conversion formulas.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="interactive_demo" data-teaching-role="interactive_demo" data-visual-use-b64="eyJjcmFtIjoiVXNlIGl0IHRvIHJlY29nbml6ZSB0aGUgY29udmVyc2lvbiBwYXR0ZXJuIHF1aWNrbHkuIiwic3RhbmRhcmQiOiJVc2UgaXQgdG8gY29ubmVjdCBhLCBiLCByLCBhbmQgdGhldGEuIiwidG9wX3Njb3JlIjoiVXNlIGl0IHRvIGNhdGNoIHF1YWRyYW50IGFuZCBzaWduIG1pc3Rha2VzLiJ9" style="display:none;"></div><div class="kc-interactive-demo" data-demo-b64="eyJ0eXBlIjoiaW50ZXJhY3RpdmVfZGVtbyIsInRpdGxlIjoiRHJhZyB0aGUgY29tcGxleCBudW1iZXIiLCJjb250ZW50IjoiTW92ZSB0aGUgcmVhbCBhbmQgaW1hZ2luYXJ5IGNvbXBvbmVudHMuIFdhdGNoIHRoZSBzYW1lIHBvaW50IGJlY29tZSByZWN0YW5ndWxhciBmb3JtLCBtYWduaXR1ZGUsIGFuZCBhbmdsZS4iLCJleHBsYW5hdGlvbiI6IlRoaXMgZGVtbyBsaW5rcyBjb29yZGluYXRlcyB0byBwb2xhciBmb3JtIGFuZCBxdWFkcmFudC1zYWZlIHBoYXNlLiIsInRlYWNoaW5nX3JvbGUiOiJpbnRlcmFjdGl2ZV9kZW1vIiwibW9kZV9zcGVjaWZpY192aXN1YWxfdXNlIjp7ImNyYW0iOiJVc2UgaXQgdG8gcmVjb2duaXplIHRoZSBjb252ZXJzaW9uIHBhdHRlcm4gcXVpY2tseS4iLCJzdGFuZGFyZCI6IlVzZSBpdCB0byBjb25uZWN0IGEsIGIsIHIsIGFuZCB0aGV0YS4iLCJ0b3Bfc2NvcmUiOiJVc2UgaXQgdG8gY2F0Y2ggcXVhZHJhbnQgYW5kIHNpZ24gbWlzdGFrZXMuIn0sImRlbW9fc3BlYyI6eyJmcmFtZXdvcmsiOiJyZWFjdF9jYW52YXMiLCJwYW5lbHMiOlt7ImlkIjoicGhhc29yX3BhbmVsIiwidGl0bGUiOiJDb21wbGV4IHBsYW5lIn0seyJpZCI6IndhdmVfcGFuZWwiLCJ0aXRsZSI6IkVxdWl2YWxlbnQgcGhhc2UgdmlldyJ9XSwiY29udHJvbHMiOlt7ImlkIjoic2xpZGVyX2EiLCJsYWJlbCI6ImEiLCJtaW4iOi01LCJtYXgiOjUsInN0ZXAiOjAuMSwiZGVmYXVsdCI6M30seyJpZCI6InNsaWRlcl9iIiwibGFiZWwiOiJiIiwibWluIjotNSwibWF4Ijo1LCJzdGVwIjowLjEsImRlZmF1bHQiOjR9LHsiaWQiOiJhbmdsZV90b2dnbGUiLCJsYWJlbCI6ImFuZ2xlIHVuaXRzIiwib3B0aW9ucyI6WyJkZWdyZWVzIiwicmFkaWFucyJdLCJkZWZhdWx0IjoiZGVncmVlcyJ9LHsiaWQiOiJyZXNldF9kZW1vIiwibGFiZWwiOiJSZXNldCIsImFjdGlvbiI6InNldCBkZWZhdWx0cyJ9XX0sInNlY3Rpb25faWQiOiJCLjEtMiIsInNlY3Rpb25fdGl0bGUiOiJBbGdlYnJhIG9mIENvbXBsZXggTnVtYmVycyJ9"></div>%%KC_END%%
