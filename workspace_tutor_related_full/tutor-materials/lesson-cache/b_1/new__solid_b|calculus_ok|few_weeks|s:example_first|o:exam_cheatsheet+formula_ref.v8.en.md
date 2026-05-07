# B.1 Complex Numbers

> **Section Objective:** Build a working toolkit for complex numbers — rectangular form, polar/exponential form, conjugate, and key identities — so that signal and system problems become easier to solve.

Start with a concrete example. The complex number **z = 3 + j4** means exactly this: move 3 units along the horizontal (real) axis, then 4 units along the vertical (imaginary) axis. That's it — a point on a 2D plane.

Why do we bother? Because signals and systems problems that look messy in the real domain often become clean algebra in the complex plane. We work there temporarily, then return to real answers.

Complex numbers are not mysterious. They are simply an organized way to track two coordinates at once.

**In this section you will learn:**
- Rectangular form and how to read Re(z), Im(z), and the conjugate
- Polar and exponential form, and how to convert between them
- How to correct quadrant errors when computing angles
- Key identities that appear repeatedly on exams

---

> **Formula Reference**
>
> | Expression | Meaning |
> |---|---|
> | $z = a + jb$ | Rectangular form |
> | $\text{Re}(z) = a$ | Real part |
> | $\text{Im}(z) = b$ | Imaginary part (the coefficient, not the term) |
> | $z = r(\cos\theta + j\sin\theta)$ | Polar form |

![Fig. B.2](/figures/page-005-fig__b_2-1.png)
*A complex number z = a + jb is a point on the complex plane with horizontal coordinate a, vertical coordinate b, magnitude r (distance from the origin), angle θ (measured from the positive real axis), and conjugate z* = a − jb reflected symmetrically across the real axis.*

## 1. Reading a Complex Number on the Plane

Take **z = 3 + j4** as our running example. Written in **rectangular form** z = a + jb:

- **a** is the horizontal coordinate — the real part
- **b** is the vertical coordinate — the imaginary part

### CRITICAL DISTINCTION

The **imaginary part** is the coefficient **b**, not the full term **jb**. For z = 3 + j4, Im(z) = 4, not j4.

**Conjugate:** The conjugate z\* = a − jb is the mirror image of z reflected across the real axis. Only the sign of the imaginary term flips; the real part stays the same.

**Magnitude and angle** can be read visually from the figure: r is the straight-line distance from the origin to the point, and θ is the angle that line makes with the positive real axis.

---

### WORKED EXAMPLE

For **z = −2 + j1**:

| Quantity | Value |
|---|---|
| Re(z) | −2 |
| Im(z) | 1 |
| z\* | −2 − j1 |

---

> **Formula Reference**
>
> $z = a + jb$ $\quad$ $z^* = a - jb$ $\quad$ $\text{Re}(z) = a$ $\quad$ $\text{Im}(z) = b$

$$z = a + jb = r(\cos\theta + j\sin\theta), \qquad a = r\cos\theta, \qquad b = r\sin\theta, \qquad e^{j\theta} = \cos\theta + j\sin\theta$$
*This set of equations is the bridge between rectangular and polar/exponential form. The same point z can be described either by its horizontal and vertical components (a, b) or by its distance from the origin and its direction (r, θ) — both descriptions are equally valid. Euler's formula, e^(jθ) = cos θ + j sin θ, compresses the trigonometric polar form into the compact exponential notation z = re^(jθ), which is the form you will encounter most often in signals and systems.*

![unknown](/figures/page-009-unknown-1.png)
*Argand diagrams for four complex numbers in different quadrants — note the exam trap: the calculator's arctangent always returns a reference angle in quadrant I or IV, so you must inspect the signs of a and b and correct the angle to the actual quadrant before writing the final answer.*

## 2. Converting Between Rectangular and Polar Form

### WORKED EXAMPLE — Rectangular to Polar

Convert **z = −2 + j1** to polar form.

**Step 1 — Magnitude:**
$$r = \sqrt{(-2)^2 + 1^2} = \sqrt{4 + 1} = \sqrt{5} \approx 2.236$$

**Step 2 — Locate the quadrant:** a = −2 (negative), b = 1 (positive) → **Quadrant II**.

**Step 3 — Reference angle from calculator:**
$$\tan^{-1}\!\left(\frac{|b|}{|a|}\right) = \tan^{-1}\!\left(\frac{1}{2}\right) \approx 26.6°$$

**Step 4 — Correct for quadrant II:**
$$\theta = 180° - 26.6° = 153.4°$$

**Result:** $z = \sqrt{5}\, e^{j153.4°}$

### COMMON MISTAKE

Never use $\tan^{-1}(b/a)$ blindly. The calculator returns a value between −90° and 90°, which is always in quadrant I or IV. If your point is in quadrant II or III, you must correct the angle manually.

**General rules:**

| Direction | Formula |
|---|---|
| Rectangular → Polar | $r = \sqrt{a^2+b^2}$, then find θ with quadrant correction |
| Polar → Rectangular | $a = r\cos\theta$, $b = r\sin\theta$ |

Principal angle is typically chosen in the range **−180° to 180°**.

---

> **Formula Reference**
>
> $r = \sqrt{a^2 + b^2}$ $\quad$ θ from quadrant-aware reading $\quad$ $z = re^{j\theta}$ $\quad$ $a = r\cos\theta$ $\quad$ $b = r\sin\theta$

![Fig. B.5](/figures/page-011-fig__b_5-1.png)
*These examples show how polar and exponential expressions map back to Cartesian coordinates, including positive angles, negative angles, and full rotations (such as 4π) that return to the same point on the plane.*

## 3. Useful Identities and Angle Facts

Four special values appear constantly in signals and systems — memorize them:

| Expression | Value | Angle |
|---|---|---|
| $e^{j \cdot 0}$ | 1 | 0 |
| $e^{j(\pi + 2\pi n)}$ | −1 | π (plus full rotations) |
| $e^{j(\pi/2 + 2\pi n)}$ | j | π/2 (plus full rotations) |
| $e^{j(-\pi/2 + 2\pi n)}$ | −j | −π/2 (plus full rotations) |

for any integer n.

### WHY THIS MATTERS

Adding 2π to an angle does not move the point — it is one full rotation back to the same location. So angles are defined **modulo 2π**: two angles that differ by an integer multiple of 2π represent the same complex number.

In signals and systems, complex exponentials appear everywhere. You must recognize when different-looking expressions are actually the same number.

### WORKED EXAMPLE

- $2e^{j4\pi}$: the angle 4π = 2 × 2π is two full rotations, landing on the positive real axis. So $2e^{j4\pi} = 2$.
- $2e^{-j4\pi}$: rotating clockwise by 4π also returns to the same point. So $2e^{-j4\pi} = 2$ as well.

Both expressions represent the single real number **2**.

---

> **Formula Reference**
>
> $1 = e^{j2\pi n}$ $\quad$ $-1 = e^{j(\pi + 2\pi n)}$ $\quad$ $j = e^{j(\pi/2 + 2\pi n)}$ $\quad$ $-j = e^{j(-\pi/2 + 2\pi n)}$
>
> **Angles are defined modulo 2π** — adding any integer multiple of 2π gives the same point.

---
**📌 Key Takeaways**
- Im(z) is the coefficient b in z = a + jb — never include j in the value.
- Magnitude: r = sqrt(a² + b²); always correct the angle for the actual quadrant.
- Polar and rectangular are two descriptions of the same point; use a = r cosθ, b = r sinθ to switch.
- Angles differing by 2π multiples are identical — reduce before comparing expressions.

*## Exam Cheat-Sheet

> **Likely exam tasks:**
> 1. Convert a + jb to re^(jθ) — compute magnitude, locate quadrant, correct angle.
> 2. Convert re^(jθ) to a + jb — apply a = r cosθ and b = r sinθ directly.
> 3. Identify conjugate, magnitude, and angle from a diagram or expression.

In the next section we will build on this complex-number toolkit in a more applied setting.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlY3Rhbmd1bGFyX3BhcnRzX2FuZF9jb25qdWdhdGUiLCJsYWJlbCI6IlJlY3Rhbmd1bGFyIGZvcm0sIHJlYWwgcGFydCwgaW1hZ2luYXJ5IHBhcnQsIGNvbmp1Z2F0ZSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHogPSAtMiArIGoxLCB3aGljaCBzdGF0ZW1lbnQgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIFJlKHopID0gMSIsIkIuIEltKHopID0gaiIsIkMuIEltKHopID0gMSIsIkQuIHoqID0gMiArIGoxIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiVGhlIGltYWdpbmFyeSBwYXJ0IGlzIHRoZSBjb2VmZmljaWVudCBvZiBqLCBzbyBJbSh6KSA9IDEuIFRoZSBjb25qdWdhdGUgY2hhbmdlcyB0aGUgc2lnbiBvZiB0aGUgaW1hZ2luYXJ5IHRlcm0gb25seSwgZ2l2aW5nIHoqID0gLTIgLSBqMS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGUgcmVhbCBwYXJ0IGlzIHRoZSBob3Jpem9udGFsIGNvb3JkaW5hdGUsIHdoaWNoIGlzIC0yLiIsIkIiOiJqIGlzIHRoZSBtYXJrZXIgZm9yIHRoZSBpbWFnaW5hcnkgYXhpcywgbm90IHRoZSB2YWx1ZSBvZiB0aGUgaW1hZ2luYXJ5IHBhcnQuIiwiRCI6IlRoZSBjb25qdWdhdGUga2VlcHMgdGhlIHJlYWwgcGFydCB0aGUgc2FtZSBhbmQgZmxpcHMgdGhlIHNpZ24gb2YgdGhlIGltYWdpbmFyeSB0ZXJtLiJ9LCJoaW50IjoiU2VwYXJhdGUgdGhlIGNvZWZmaWNpZW50IGZyb20gdGhlIHN5bWJvbCBqLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQSBzdHVkZW50IHNheXM6ICdUaGUgaW1hZ2luYXJ5IHBhcnQgb2YgNSAtIDJqIGlzIC0yai4nIEV4cGxhaW4gdGhlIG1pc3Rha2UgcHJlY2lzZWx5LiIsImlkZWFsX2Fuc3dlciI6IlRoZSBpbWFnaW5hcnkgcGFydCBpcyB0aGUgcmVhbC1udW1iZXIgY29lZmZpY2llbnQgb2Ygaiwgc28gaXQgaXMgLTIuIFRoZSB0ZXJtIC0yaiBpcyB0aGUgaW1hZ2luYXJ5IHRlcm0gaW4gdGhlIGV4cHJlc3Npb24sIG5vdCB0aGUgaW1hZ2luYXJ5IHBhcnQgaXRzZWxmLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3Qgc3RhdGUgdGhhdCBJbSh6KSA9IC0yIiwiTXVzdCBkaXN0aW5ndWlzaCBpbWFnaW5hcnkgcGFydCBmcm9tIGltYWdpbmFyeSB0ZXJtIiwiTXVzdCBub3RlIHRoYXQgaiBpcyBhIG1hcmtlciwgbm90IHBhcnQgb2YgdGhlIHBhcnQgdmFsdWUiXSwiZXhwbGFuYXRpb24iOiJUaGlzIGNoZWNrcyB3aGV0aGVyIHRoZSBzdHVkZW50IHRydWx5IHVuZGVyc3RhbmRzIHRoZSBkZWZpbml0aW9uIHJhdGhlciB0aGFuIGNvcHlpbmcgc3VyZmFjZSBub3RhdGlvbi4iLCJoaW50IjoiQXNrIHdoYXQgdmFsdWUgbXVsdGlwbGllcyBqLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoicmVjdGFuZ3VsYXJfdG9fcG9sYXIiLCJsYWJlbCI6Ik1hZ25pdHVkZSBhbmQgYW5nbGUgZnJvbSByZWN0YW5ndWxhciBmb3JtIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBwb2xhciBmb3JtIGlzIGNvcnJlY3QgZm9yIHogPSAtMiArIGoxIHVzaW5nIHRoZSBwcmluY2lwYWwgYW5nbGUgaW4gZGVncmVlcz8iLCJvcHRpb25zIjpbIkEuIHNxcnQoNSllXihqMjYuNsKwKSIsIkIuIHNxcnQoNSllXihqMTUzLjTCsCkiLCJDLiBzcXJ0KDUpZV4oLWoyNi42wrApIiwiRC4gNWVeKGoxNTMuNMKwKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBtYWduaXR1ZGUgaXMgc3FydCg1KSwgYW5kIHRoZSBwb2ludCBsaWVzIGluIHF1YWRyYW50IElJLCBzbyB0aGUgcHJpbmNpcGFsIGFuZ2xlIGlzIDE1My40IGRlZ3JlZXMsIG5vdCAyNi42IGRlZ3JlZXMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiMjYuNiBkZWdyZWVzIGlzIHRoZSByZWZlcmVuY2UgYW5nbGUsIGJ1dCB0aGUgcXVhZHJhbnQgaXMgd3JvbmcuIiwiQyI6Ik5lZ2F0aXZlIDI2LjYgZGVncmVlcyBwb2ludHMgaW50byBxdWFkcmFudCBJViwgbm90IHF1YWRyYW50IElJLiIsIkQiOiJUaGUgbWFnbml0dWRlIGlzIHNxcnQoNSksIG5vdCA1LiJ9LCJoaW50IjoiRmluZCB0aGUgcXVhZHJhbnQgYmVmb3JlIHRydXN0aW5nIGFyY3RhbmdlbnQuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImNvbXBsZXhfcGxhbmVfcXVhZHJhbnRfcG9pbnQiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgY2FsY3VsYXRvciBnaXZlcyB0YW7igbvCuSgoLTMpLygtMikpID0gNTYuM8KwLiBXaGljaCBpcyB0aGUgY29ycmVjdCBwcmluY2lwYWwgYW5nbGUgZm9yIHogPSAtMiAtIGozPyIsIm9wdGlvbnMiOlsiQS4gNTYuM8KwIiwiQi4gMTIzLjfCsCIsIkMuIC0xMjMuN8KwIiwiRC4gLTU2LjPCsCJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlRoZSBwb2ludCAoLTIsIC0zKSBpcyBpbiBxdWFkcmFudCBJSUksIHNvIHRoZSBhbmdsZSBtdXN0IHBvaW50IHRoZXJlLiBUaGUgcHJpbmNpcGFsIGFuZ2xlIGluIHRoZSB1c3VhbCAtMTgwwrAgdG8gMTgwwrAgcmFuZ2UgaXMgLTEyMy43wrAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiNTYuM8KwIHBvaW50cyB0byBxdWFkcmFudCBJLiIsIkIiOiIxMjMuN8KwIHBvaW50cyB0byBxdWFkcmFudCBJSS4iLCJEIjoiTmVnYXRpdmUgNTYuM8KwIHBvaW50cyB0byBxdWFkcmFudCBJVi4ifSwiaGludCI6IlVzZSB0aGUgc2lnbnMgb2YgYm90aCBjb29yZGluYXRlcyB0byBsb2NhdGUgdGhlIHF1YWRyYW50LiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJjb21wbGV4X3BsYW5lX3F1YWRyYW50X3BvaW50Iiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJwb2xhcl90b19yZWN0YW5ndWxhciIsImxhYmVsIjoiQ29udmVydCBleHBvbmVudGlhbCBmb3JtIHRvIENhcnRlc2lhbiBmb3JtIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGF0IGlzIHRoZSBDYXJ0ZXNpYW4gZm9ybSBvZiAyZV4oas+ALzIpPyIsIm9wdGlvbnMiOlsiQS4gMiArIGowIiwiQi4gMCArIGoyIiwiQy4gLTIgKyBqMCIsIkQuIDAgLSBqMiJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlVzaW5nIGEgPSByIGNvcyDOuCBhbmQgYiA9IHIgc2luIM64LCB3ZSBnZXQgYSA9IDIgY29zKM+ALzIpID0gMCBhbmQgYiA9IDIgc2luKM+ALzIpID0gMi4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGF0IHdvdWxkIGNvcnJlc3BvbmQgdG8gYW5nbGUgMC4iLCJDIjoiVGhhdCB3b3VsZCBjb3JyZXNwb25kIHRvIGFuZ2xlIM+ALiIsIkQiOiJUaGF0IHdvdWxkIGNvcnJlc3BvbmQgdG8gYW5nbGUgLc+ALzIuIn0sImhpbnQiOiJUaGluayBvZiB0aGUgcG9pbnQgb24gdGhlIHVuaXQgY2lyY2xlIGZpcnN0LCB0aGVuIHNjYWxlIGJ5IDIuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoiZXF1aXZhbGVudF9hbmdsZXNfYW5kX3NwZWNpYWxfaWRlbnRpdGllcyIsImxhYmVsIjoiRXF1aXZhbGVudCBhbmdsZXMgYW5kIHNwZWNpYWwgZXhwb25lbnRpYWwgaWRlbnRpdGllcyIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDRfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHN0YXRlbWVudCBpcyB0cnVlPyIsIm9wdGlvbnMiOlsiQS4gZV4oajApIGFuZCBlXihqMs+AKSByZXByZXNlbnQgZGlmZmVyZW50IGNvbXBsZXggbnVtYmVycyIsIkIuIGogPSBlXihqz4ApIiwiQy4gLTEgPSBlXihqKM+AICsgMs+AbikpIGZvciBpbnRlZ2VyIG4iLCJELiBUaGUgYW5nbGUgb2YgYSBjb21wbGV4IG51bWJlciBpcyB1bmlxdWUiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJBbmdsZXMgdGhhdCBkaWZmZXIgYnkgaW50ZWdlciBtdWx0aXBsZXMgb2YgMs+AIHJlcHJlc2VudCB0aGUgc2FtZSBwb2ludC4gVGhlIG51bWJlciAtMSBsaWVzIG9uIHRoZSBuZWdhdGl2ZSByZWFsIGF4aXMsIHNvIGl0cyBhbmdsZSBpcyDPgCBwbHVzIGFueSBtdWx0aXBsZSBvZiAyz4AuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlc2UgYXJlIHRoZSBzYW1lIHBvaW50IGJlY2F1c2UgYWRkaW5nIDLPgCBkb2VzIG5vdCBjaGFuZ2UgdGhlIGRpcmVjdGlvbi4iLCJCIjoiZV4oas+AKSA9IC0xLCBub3Qgai4iLCJEIjoiQW5nbGVzIGFyZSBub3QgdW5pcXVlOyB0aGV5IGFyZSBkZWZpbmVkIG1vZHVsbyAyz4AuIn0sImhpbnQiOiJQaWN0dXJlIHRoZSBwb2ludCBvbiB0aGUgY29tcGxleCBwbGFuZSBhZnRlciBvbmUgZnVsbCByb3RhdGlvbi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDRfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHBhaXIgcmVwcmVzZW50cyB0aGUgc2FtZSBjb21wbGV4IG51bWJlcj8iLCJvcHRpb25zIjpbIkEuIDJlXihqNM+AKSBhbmQgMiIsIkIuIDJlXihqz4AvMikgYW5kIDIiLCJDLiBlXihqz4ApIGFuZCAxIiwiRC4gZV4oLWrPgC8yKSBhbmQgaiJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IkEgZnVsbCByb3RhdGlvbiBvZiA0z4AgbGFuZHMgYmFjayBvbiB0aGUgcG9zaXRpdmUgcmVhbCBheGlzLCBzbyAyZV4oajTPgCkgPSAyLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IjJlXihqz4AvMikgPSAyaiwgbm90IDIuIiwiQyI6ImVeKGrPgCkgPSAtMS4iLCJEIjoiZV4oLWrPgC8yKSA9IC1qLiJ9LCJoaW50IjoiUmVkdWNlIHRoZSBhbmdsZSBieSBtdWx0aXBsZXMgb2YgMs+ALiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfV19" style="display:none;"></div>%%KC_END%%
