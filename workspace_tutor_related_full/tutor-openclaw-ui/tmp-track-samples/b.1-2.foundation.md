# B.1-2 Algebra of Complex Numbers

> **Section Objective:** Master rectangular form, polar form, Euler's formula, and the complex conjugate — the four tools that make complex-number algebra work in engineering problems.

---

Complex numbers often appear as an **intermediate tool**: the original problem is real-valued, the final answer is real-valued, but working through complex numbers in the middle makes the algebra dramatically shorter. That is why this section matters for exams.

This section covers four tightly connected ideas:

- **Rectangular form** — z = a + jb
- **Polar form** — z = r(cos θ + j sin θ)
- **Euler's formula** — e^{jθ} = cos θ + j sin θ
- **Complex conjugate** — z* = a − jb

### WATCH OUT FOR THESE TRAPS

Three confusion points appear repeatedly on exams:

1. Mixing up **a** (horizontal coordinate) with **r** (distance from origin) — they are not the same.
2. Writing the imaginary **part** as **jb** instead of **b** — the imaginary part is the number b, not the term jb.
3. Treating the **magnitude** as if it were the real part.

These are among the most common exam mistakes in this topic.

![Fig. B.2](/figures/page-005-fig__b_2-1.png)
*Fig. B.2 shows the point z = a + jb at rectangular coordinates (a, b), its polar magnitude r and angle θ measured from the positive real axis, and its conjugate z* = a − jb reflected directly below — one figure that unifies rectangular form, polar form, and conjugation.*

## 1. Rectangular Form vs. Polar Form

Start with a concrete example before the general rule.

Take **z = 3 + 4j**.

- Re(z) = **3** — the horizontal coordinate, the real part.
- Im(z) = **4** — the vertical coefficient of j, the imaginary part (not 4j).
- Magnitude: r = √(3² + 4²) = √(9 + 16) = √25 = **5**.

Now the general rule:

For any z = a + jb:

- **a** is the horizontal coordinate on the complex plane.
- **b** is the vertical coordinate (the imaginary part — a plain real number).
- **r** is the straight-line distance from the origin to the point.

#### Key Distinction

r is the hypotenuse of the right triangle formed by a and b. It equals √(a² + b²). **r equals a only when b = 0**, i.e., when the point sits exactly on the real axis. In all other cases, r > a.

Rectangular form describes location by two coordinates (a, b). Polar form describes the same location by a distance r and an angle θ. Both describe the same point.

$$z = a + jb = r(\cos\theta + j\sin\theta)$$
*This single equation gives two equivalent descriptions of the same complex number: the left side uses rectangular coordinates a and b, while the right side uses polar coordinates r and θ. The connection between them is a = r cos θ and b = r sin θ — the rectangular parts are simply the projections of the radius r onto the horizontal and vertical axes, exactly as in any right-triangle decomposition.*

## 2. Deriving Polar Form and Euler's Formula

**The core principle:** if a point in the plane has polar coordinates (r, θ), its horizontal and vertical components are found by projecting the radius r along each axis.

- Horizontal component: a = r cos θ
- Vertical component: b = r sin θ

Now substitute into rectangular form, one line at a time:

1. Start with z = a + jb
2. Replace a with r cos θ and b with r sin θ:
   z = r cos θ + j(r sin θ)
3. Factor out r:
   z = r(cos θ + j sin θ)

This is **polar form**.

### EULER'S FORMULA

Euler's formula provides a compact rewrite:

e^{jθ} = cos θ + j sin θ

Substituting into polar form gives the **exponential form**:

z = r e^{jθ}

#### Remember

r is the **magnitude** — the distance from the origin. It is not the real part. Re(z) = a = r cos θ, which is generally different from r.

$$e^{j\theta} = \cos\theta + j\sin\theta$$
*Euler's formula packages the cosine and sine functions into a single exponential expression, which is why polar-form complex numbers are written compactly as z = re^{jθ} — it is simply a shorthand for r(cos θ + j sin θ), not a separate concept.*

## 3. The Complex Conjugate

If z = a + jb, then the **complex conjugate** is:

z* = a − jb

The real part stays the same; the sign of the imaginary part flips.

### GEOMETRIC MEANING

On the complex plane, conjugation **reflects the point across the real axis**. The point moves from (a, b) to (a, −b). The horizontal position is unchanged; only the vertical coordinate changes sign.

Because the distance from the origin depends on both a and b through r = √(a² + b²), and because (−b)² = b², the magnitude is preserved: |z*| = |z|.

**Worked example:**

For z = 3 + 4j:
- z* = 3 − 4j
- z has coordinates (3, 4); z* has coordinates (3, −4)
- |z| = √(9 + 16) = 5; |z*| = √(9 + 16) = 5

Same distance from the origin, mirror image across the real axis.

---
**📌 Key Takeaways**
- Rectangular form (a, b) and polar form (r, θ) describe the same point; r = √(a² + b²), not equal to a.
- The projections a = r cos θ and b = r sin θ connect rectangular and polar coordinates.
- The conjugate z* = a − jb reflects z across the real axis; magnitude is unchanged.

*In the next section we will apply these forms to the algebra of complex numbers — addition, multiplication, and division — and see why polar form makes multiplication especially elegant.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlY3Rhbmd1bGFyX3ZzX21hZ25pdHVkZSIsImxhYmVsIjoiRGlzdGluZ3Vpc2hpbmcgcmVhbCBwYXJ0LCBpbWFnaW5hcnkgcGFydCwgYW5kIG1hZ25pdHVkZSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHogPSAzICsgNGosIHdoaWNoIHN0YXRlbWVudCBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gUmUoeik9NSwgSW0oeik9NCIsIkIuIFJlKHopPTMsIEltKHopPTQsIHx6fD01IiwiQy4gUmUoeik9MywgSW0oeik9NGosIHx6fD03IiwiRC4gUmUoeik9NSwgSW0oeik9NGosIHx6fD0zIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIHJlYWwgcGFydCBpcyB0aGUgY29lZmZpY2llbnQgb24gdGhlIGhvcml6b250YWwgYXhpcywgMy4gVGhlIGltYWdpbmFyeSBwYXJ0IGlzIHRoZSBjb2VmZmljaWVudCBvZiBqLCB3aGljaCBpcyA0IChhIHBsYWluIG51bWJlciwgbm90IDRqKS4gVGhlIG1hZ25pdHVkZSBpcyDiiJooM8KyICsgNMKyKSA9IOKImjI1ID0gNS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiI1IGlzIHRoZSBtYWduaXR1ZGUsIG5vdCB0aGUgcmVhbCBwYXJ0LiBUaGUgcmVhbCBwYXJ0IGlzIDMuIiwiQyI6IlRoZSBpbWFnaW5hcnkgcGFydCBpcyA0LCBub3QgNGog4oCUIHRoZSBpbWFnaW5hcnkgcGFydCBuZXZlciBpbmNsdWRlcyB0aGUgc3ltYm9sIGouIEFsc28sIHRoZSBtYWduaXR1ZGUgaXMgNSwgbm90IDcuIiwiRCI6IlRoaXMgY29uZnVzZXMgdGhlIHJlYWwgcGFydCwgaW1hZ2luYXJ5IHBhcnQsIGFuZCBtYWduaXR1ZGUgYWxsIGF0IG9uY2UuIn0sImhpbnQiOiJTZXBhcmF0ZSB0aHJlZSBkaXN0aW5jdCBpZGVhczogaG9yaXpvbnRhbCBjb29yZGluYXRlIChhKSwgdmVydGljYWwgY29lZmZpY2llbnQgKGIpLCBhbmQgZGlzdGFuY2UgZnJvbSBvcmlnaW4gKHIgPSB8enwpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgc3R1ZGVudCBzYXlzOiAnRm9yIHogPSBhICsgamIsIHIgbXVzdCBlcXVhbCBhIGJlY2F1c2UgYm90aCBhcmUgb24gdGhlIGhvcml6b250YWwgc2lkZS4nIFdoYXQgaXMgdGhlIGJlc3QgY29ycmVjdGlvbj8iLCJvcHRpb25zIjpbIkEuIENvcnJlY3QsIGJlY2F1c2UgciBhbmQgYSBib3RoIG1lYXN1cmUgdGhlIHJlYWwgYXhpcyB2YWx1ZS4iLCJCLiBJbmNvcnJlY3QsIGJlY2F1c2UgciBpcyB0aGUgZGlzdGFuY2UgZnJvbSB0aGUgb3JpZ2luLCB3aGlsZSBhIGlzIG9ubHkgdGhlIGhvcml6b250YWwgY29vcmRpbmF0ZS4iLCJDLiBJbmNvcnJlY3QsIGJlY2F1c2UgciBpcyB0aGUgaW1hZ2luYXJ5IHBhcnQuIiwiRC4gSW5jb3JyZWN0LCBiZWNhdXNlIGEgYWx3YXlzIGVxdWFscyBiLiJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkluIHJlY3Rhbmd1bGFyIGZvcm0sIGEgaXMgdGhlIGhvcml6b250YWwgY29vcmRpbmF0ZS4gSW4gcG9sYXIgZm9ybSwgciBpcyB0aGUgZnVsbCBzdHJhaWdodC1saW5lIGRpc3RhbmNlIGZyb20gdGhlIG9yaWdpbiB0byB0aGUgcG9pbnQsIGNvbXB1dGVkIGFzIHIgPSDiiJooYcKyICsgYsKyKS4gVGhleSBhcmUgZXF1YWwgb25seSBpbiB0aGUgc3BlY2lhbCBjYXNlIGIgPSAwLCBub3QgaW4gZ2VuZXJhbC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIGlzIHRoZSBleGFjdCBtaXNjb25jZXB0aW9uIHRoZSBxdWVzdGlvbiBpcyB0ZXN0aW5nIOKAlCByIGlzIG5vdCB0aGUgc2FtZSBhcyBhLiIsIkMiOiJyIGlzIHRoZSBtYWduaXR1ZGUgfHp8LCBub3QgdGhlIGltYWdpbmFyeSBwYXJ0LiIsIkQiOiJUaGVyZSBpcyBubyBydWxlIHJlcXVpcmluZyBhIGFuZCBiIHRvIGJlIGVxdWFsLiJ9LCJoaW50IjoiVGhpbmsgb2YgYSByaWdodCB0cmlhbmdsZTogYSBpcyBvbmUgbGVnLCBiIGlzIHRoZSBvdGhlciBsZWcsIGFuZCByIGlzIHRoZSBoeXBvdGVudXNlLiBUaGUgaHlwb3RlbnVzZSBpcyBuZXZlciBlcXVhbCB0byBhIGxlZyB1bmxlc3MgdGhlIG90aGVyIGxlZyBpcyB6ZXJvLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJjb21wbGV4X3BsYW5lX3JpZ2h0X3RyaWFuZ2xlIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJwb2xhcl9jb252ZXJzaW9uX3JlbGF0aW9ucyIsImxhYmVsIjoiVXNpbmcgYSA9IHIgY29zIM64IGFuZCBiID0gciBzaW4gzrgiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIHogaGFzIHBvbGFyIGNvb3JkaW5hdGVzIChyLCDOuCksIHdoaWNoIHJlY3Rhbmd1bGFyIGZvcm0gaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIHogPSByICsgas64IiwiQi4geiA9IHIoc2luIM64ICsgaiBjb3MgzrgpIiwiQy4geiA9IHIoY29zIM64ICsgaiBzaW4gzrgpIiwiRC4geiA9IGEoY29zIHIgKyBqIHNpbiByKSJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlRoZSBob3Jpem9udGFsIGNvbXBvbmVudCBpcyByIGNvcyDOuCBhbmQgdGhlIHZlcnRpY2FsIGNvbXBvbmVudCBpcyByIHNpbiDOuCwgc28geiA9IHIgY29zIM64ICsgaihyIHNpbiDOuCkgPSByKGNvcyDOuCArIGogc2luIM64KS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIGluY29ycmVjdGx5IHRyZWF0cyByIGFuZCDOuCBhcyByZWN0YW5ndWxhciBjb29yZGluYXRlcyBhbmQgbWl4ZXMgY29vcmRpbmF0ZSBzeXN0ZW1zLiIsIkIiOiJDb3NpbmUgYW5kIHNpbmUgYXJlIHN3YXBwZWQg4oCUIGNvc2luZSBiZWxvbmdzIG9uIHRoZSByZWFsIGF4aXMsIHNpbmUgb24gdGhlIGltYWdpbmFyeSBheGlzLiIsIkQiOiJUaGlzIHVzZXMgdGhlIHdyb25nIHZhcmlhYmxlcyBpbiB0aGUgd3JvbmcgcGxhY2VzOyByIGFuZCBhIGFyZSBub3QgaW50ZXJjaGFuZ2VhYmxlLiJ9LCJoaW50IjoiVGhlIHJlYWwgYXhpcyB1c2VzIGNvc2luZTsgdGhlIGltYWdpbmFyeS1heGlzIGNvZWZmaWNpZW50IHVzZXMgc2luZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3AyX3EyIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJTdGFydGluZyBmcm9tIGEgPSByIGNvcyDOuCBhbmQgYiA9IHIgc2luIM64LCBkZXJpdmUgeiA9IHIoY29zIM64ICsgaiBzaW4gzrgpIGxpbmUgYnkgbGluZS4iLCJpZGVhbF9hbnN3ZXIiOiJTdGFydCB3aXRoIHogPSBhICsgamIuIFN1YnN0aXR1dGUgYSA9IHIgY29zIM64IGFuZCBiID0gciBzaW4gzrggdG8gZ2V0IHogPSByIGNvcyDOuCArIGoociBzaW4gzrgpLiBUaGVuIGZhY3RvciBvdXQgciB0byBvYnRhaW4geiA9IHIoY29zIM64ICsgaiBzaW4gzrgpLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3Qgc3RhcnQgZXhwbGljaXRseSBmcm9tIHogPSBhICsgamIiLCJNdXN0IHN1YnN0aXR1dGUgYm90aCBhID0gciBjb3MgzrggYW5kIGIgPSByIHNpbiDOuCBjb3JyZWN0bHkiLCJNdXN0IHNob3cgdGhlIGludGVybWVkaWF0ZSBsaW5lIHogPSByIGNvcyDOuCArIGoociBzaW4gzrgpIGJlZm9yZSBmYWN0b3JpbmciLCJNdXN0IGVuZCB3aXRoIHogPSByKGNvcyDOuCArIGogc2luIM64KSJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQgY2FuIHJlcHJvZHVjZSB0aGUgZGVyaXZhdGlvbiBzdGVwIGJ5IHN0ZXAsIHJhdGhlciB0aGFuIG9ubHkgbWVtb3JpemluZyB0aGUgZmluYWwgZm9ybXVsYS4iLCJoaW50IjoiRG8gbm90IGp1bXAgc3RyYWlnaHQgdG8gdGhlIGZpbmFsIGFuc3dlciDigJQgd3JpdGUgb3V0IHRoZSBzdWJzdGl0dXRpb24gc3RlcCBleHBsaWNpdGx5IGJlZm9yZSBmYWN0b3Jpbmcgb3V0IHIuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJjb25qdWdhdGVfZ2VvbWV0cnkiLCJsYWJlbCI6IkNvbXBsZXggY29uanVnYXRlIGFzIHJlZmxlY3Rpb24gYWNyb3NzIHRoZSByZWFsIGF4aXMiLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBpcyB0aGUgY29tcGxleCBjb25qdWdhdGUgb2YgeiA9IC0yICsgNWo/Iiwib3B0aW9ucyI6WyJBLiAtMiAtIDVqIiwiQi4gMiArIDVqIiwiQy4gLTIgKyA1aiIsIkQuIDIgLSA1aiJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlRoZSBjb25qdWdhdGUga2VlcHMgdGhlIHJlYWwgcGFydCB0aGUgc2FtZSAoLTIgc3RheXMgLTIpIGFuZCBjaGFuZ2VzIHRoZSBzaWduIG9mIHRoZSBpbWFnaW5hcnkgcGFydCAoKzVqIGJlY29tZXMgLTVqKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGlzIGNoYW5nZXMgdGhlIHNpZ24gb2YgdGhlIHJlYWwgcGFydCwgd2hpY2ggY29uanVnYXRpb24gZG9lcyBub3QgZG8uIiwiQyI6IlRoaXMgbGVhdmVzIHRoZSBudW1iZXIgY29tcGxldGVseSB1bmNoYW5nZWQg4oCUIHRoYXQgaXMgeiBpdHNlbGYsIG5vdCB6Ki4iLCJEIjoiVGhpcyBjaGFuZ2VzIHRoZSBzaWduIG9mIGJvdGggdGhlIHJlYWwgYW5kIGltYWdpbmFyeSBwYXJ0cywgd2hpY2ggaXMgbm90IGNvbmp1Z2F0aW9uLiJ9LCJoaW50IjoiT25seSB0aGUgc2lnbiBpbiBmcm9udCBvZiB0aGUgaW1hZ2luYXJ5IHRlcm0gZmxpcHMuIFRoZSByZWFsIHBhcnQgaXMgdW50b3VjaGVkLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6Ik9uIHRoZSBjb21wbGV4IHBsYW5lLCB3aGF0IGRvZXMgY29uanVnYXRpb24gZG8gdG8gYSBwb2ludCB6ID0gYSArIGpiPyIsIm9wdGlvbnMiOlsiQS4gUmVmbGVjdHMgaXQgYWNyb3NzIHRoZSBpbWFnaW5hcnkgYXhpcyIsIkIuIFJvdGF0ZXMgaXQgYnkgOTAgZGVncmVlcyIsIkMuIFJlZmxlY3RzIGl0IGFjcm9zcyB0aGUgcmVhbCBheGlzIiwiRC4gRG91YmxlcyBpdHMgbWFnbml0dWRlIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiQ29uanVnYXRpb24gY2hhbmdlcyBiIHRvIC1iLCBzbyB0aGUgcG9pbnQgbW92ZXMgZnJvbSBjb29yZGluYXRlcyAoYSwgYikgdG8gKGEsIC1iKS4gVGhlIGhvcml6b250YWwgcG9zaXRpb24gYSBpcyB1bmNoYW5nZWQ7IG9ubHkgdGhlIHZlcnRpY2FsIGNvb3JkaW5hdGUgZmxpcHMgc2lnbi4gVGhpcyBpcyBleGFjdGx5IGEgcmVmbGVjdGlvbiBhY3Jvc3MgdGhlIHJlYWwgKGhvcml6b250YWwpIGF4aXMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiUmVmbGVjdGlvbiBhY3Jvc3MgdGhlIGltYWdpbmFyeSBheGlzIHdvdWxkIGNoYW5nZSBhIHRvIC1hLCBsZWF2aW5nIGIgdW5jaGFuZ2VkIOKAlCB0aGF0IGlzIG5vdCBjb25qdWdhdGlvbi4iLCJCIjoiQSA5MC1kZWdyZWUgcm90YXRpb24gY2hhbmdlcyBib3RoIGNvb3JkaW5hdGVzIGluIGEgc3BlY2lmaWMgcm90YXRpb25hbCB3YXksIG5vdCBhIHNpbXBsZSBzaWduIGZsaXAuIiwiRCI6Ik1hZ25pdHVkZSBpcyBwcmVzZXJ2ZWQgdW5kZXIgY29uanVnYXRpb246IHx6KnwgPSDiiJooYcKyICsgKC1iKcKyKSA9IOKImihhwrIgKyBiwrIpID0gfHp8LiJ9LCJoaW50IjoiQXNrIHlvdXJzZWxmOiB3aGljaCBjb29yZGluYXRlIGNoYW5nZXMgc2lnbiB1bmRlciBjb25qdWdhdGlvbj8gVGhlbiBpZGVudGlmeSB3aGljaCBheGlzIHRoYXQgY29vcmRpbmF0ZSBpcyBtZWFzdXJlZCBmcm9tLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJjb21wbGV4X3BsYW5lX2Nvbmp1Z2F0ZV9yZWZsZWN0aW9uIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19XX0=" style="display:none;"></div>%%KC_END%%
