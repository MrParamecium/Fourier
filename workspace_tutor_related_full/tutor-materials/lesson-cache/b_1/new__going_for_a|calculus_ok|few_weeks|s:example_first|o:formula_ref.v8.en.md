# B.1 Complex Numbers

> **Section Objective:** Master the two coordinate systems for describing a complex number — rectangular form and polar/exponential form — and convert between them correctly, including quadrant-aware angle selection.

---

Consider z = -2 + j1. In rectangular form, this tells you two things immediately: the real part is -2 (two units left of the origin) and the imaginary part is 1 (one unit up). But a different and often more useful question arises: how far is this point from the origin, and in what direction? That is exactly what this section answers.

We will cover rectangular form, polar form, exponential form, how to compute magnitude r and angle θ, how to correct the angle for the right quadrant, and how to convert back to Cartesian form.

### WHY THIS MATTERS FOR THE EXAM

Two mistakes dominate exam errors: confusing magnitude r with the real part a, and blindly using a calculator's tan⁻¹ output without checking which quadrant the point actually occupies.

---

> **Formula reference:** z = a + jb, &nbsp;&nbsp; z = r(cosθ + j sinθ) = re^{jθ}

![Fig. B.2](/figures/page-005-fig__b_2-1.png)
*The same complex number z = a + jb can be read in two coordinate systems: rectangular coordinates (a, b) give horizontal and vertical components, while polar coordinates (r, θ) give distance from the origin and direction — this distinction is the core of Section B.1.*

## 1. Rectangular Form vs Polar Form

Every complex number has two equivalent descriptions. Take z = -2 + j1 as our running example.

In **rectangular form**, we read off two coordinates directly: the real part a = -2 and the imaginary part b = 1. These are horizontal and vertical positions on the complex plane — nothing more.

In **polar form**, we instead ask: what is the *distance* from the origin to this point, and what *angle* does the line make with the positive real axis?

- The distance is called the **magnitude** r. For z = -2 + j1: r = sqrt((-2)² + 1²) = sqrt(5) ≈ 2.24.
- The angle is called the **argument** θ.

### COMMON MISTAKE

r is **not** the real part. Here a = -2 but r = sqrt(5). They measure completely different things: a is a horizontal coordinate, r is a distance. They happen to be equal only in special cases.

Geometrically, r is the length of the arrow from the origin to the point, and θ is the direction that arrow points.

---

> **Formula reference:** a = r cosθ, &nbsp;&nbsp; b = r sinθ

$$z = a + jb = r(\cos\theta + j\sin\theta) = re^{j\theta}$$
*This is not three different numbers — it is one complex number written three equivalent ways: component form (rectangular), trigonometric polar form, and compact exponential polar form. All three describe the same point on the complex plane.*

![unknown](/figures/page-009-unknown-1.png)
*Study all four Argand diagrams carefully: in each case, magnitude r is the distance from the origin to the point (never just the real part), and the angle θ must be chosen from the correct quadrant — a calculator's tan⁻¹ output alone is not sufficient.*

## 2. Converting Rectangular Form to Polar Form Correctly

We will convert z = -2 + j1 step by step.

**Step 1 — Compute the magnitude:**

r = sqrt(a² + b²) = sqrt((-2)² + 1²) = sqrt(4 + 1) = sqrt(5) ≈ 2.236

**Step 2 — Find the reference angle:**

A calculator gives tan⁻¹(|b/a|) = tan⁻¹(1/2) ≈ 26.6°. This is only the reference angle — the acute angle between the arrow and the nearest horizontal axis.

**Step 3 — Apply quadrant correction:**

The point (-2, 1) has a negative real part and a positive imaginary part, so it lies in **Quadrant II**. The principal angle in Quadrant II is:

θ = 180° - 26.6° = **153.4°**

The calculator's raw output of -26.6° would place the point in Quadrant IV — completely wrong.

**Final answer:** z = sqrt(5) e^{j153.4°}

---

**Contrast example — Quadrant III:** For z = -2 - j3, the point has both components negative, placing it in Quadrant III. The reference angle is tan⁻¹(3/2) ≈ 56.3°. The principal angle is -(180° - 56.3°) = **-123.7°** (using the -180° to 180° convention).

### EXAM TIP

Always locate the point on the plane first. The principal value convention uses angles in the range (-180°, 180°]. A calculator's tan⁻¹ output is never automatically the correct argument — it must be adjusted for the actual quadrant.

---

> **Formula reference:** r = sqrt(a² + b²), &nbsp;&nbsp; θ from quadrant-aware angle selection

![Fig. B.5](/figures/page-011-fig__b_5-1.png)
*Polar-to-Cartesian conversion means projecting the length r onto the real axis (r cosθ) and the imaginary axis (r sinθ); notice that different angle labels — including angles that differ by full rotations of 2π — can still land on exactly the same Cartesian point.*

## 3. Converting Polar Form Back to Cartesian Form

Start with a concrete example: z = 2e^{jπ/3}.

**Step 1 — Expand using Euler's formula:**

z = 2(cos(π/3) + j sin(π/3))

**Step 2 — Substitute exact values:**

cos(π/3) = 1/2, &nbsp; sin(π/3) = sqrt(3)/2

z = 2(1/2 + j·sqrt(3)/2)

**Step 3 — Distribute:**

z = 2·(1/2) + j·2·(sqrt(3)/2) = **1 + j sqrt(3)**

**General rule:** For any z = re^{jθ}, the Cartesian components are:

- Real part: a = r cosθ
- Imaginary part: b = r sinθ

#### Note

Angles that differ by multiples of 2π represent the same direction, so they produce the same Cartesian point. For example, 2e^{j4π} = 2(cos 4π + j sin 4π) = 2(1 + j·0) = 2. The factor e^{j4π} equals 1 because four full rotations return to the starting direction.

---

> **Formula reference:** a = r cosθ, &nbsp;&nbsp; b = r sinθ, &nbsp;&nbsp; z = a + jb

---
**📌 Key Takeaways**
- Rectangular form gives (a, b) coordinates; polar form gives distance r and direction θ — same point, two descriptions.
- Magnitude r is the distance from the origin, not the real part a; they are not interchangeable.
- Always check the quadrant before accepting a calculator's tan⁻¹ output as the argument θ.

*In the next section we will use these forms to perform operations on complex numbers more efficiently.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImtwX3JlY3RfdnNfcG9sYXJfbWVhbmluZyIsImxhYmVsIjoiUmVjdGFuZ3VsYXIgY29tcG9uZW50cyB2ZXJzdXMgcG9sYXIgbWFnbml0dWRlLWFuZ2xlIGRlc2NyaXB0aW9uIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeiA9IC0yICsgajEsIHdoaWNoIHN0YXRlbWVudCBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gVGhlIG1hZ25pdHVkZSByIGVxdWFscyB0aGUgcmVhbCBwYXJ0LCBzbyByID0gLTIiLCJCLiBUaGUgbWFnbml0dWRlIHIgaXMgdGhlIGRpc3RhbmNlIGZyb20gdGhlIG9yaWdpbiwgc28gciA9IHNxcnQoNSkiLCJDLiBUaGUgbWFnbml0dWRlIHIgZXF1YWxzIHRoZSBpbWFnaW5hcnkgcGFydCwgc28gciA9IDEiLCJELiBUaGUgbWFnbml0dWRlIHIgZXF1YWxzIC0yICsgMSA9IC0xIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiSW4gcG9sYXIgZm9ybSwgciBpcyB0aGUgZGlzdGFuY2UgZnJvbSB0aGUgb3JpZ2luOiByID0gc3FydCgoLTIpwrIgKyAxwrIpID0gc3FydCg1KS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGUgcmVhbCBwYXJ0IGlzIGEgaG9yaXpvbnRhbCBjb29yZGluYXRlLCBub3QgdGhlIG1hZ25pdHVkZS4iLCJDIjoiVGhlIGltYWdpbmFyeSBwYXJ0IGlzIHRoZSB2ZXJ0aWNhbCBjb29yZGluYXRlLCBub3QgdGhlIG1hZ25pdHVkZS4iLCJEIjoiTWFnbml0dWRlIGlzIG5vdCBmb3VuZCBieSBhZGRpbmcgY29tcG9uZW50cyBkaXJlY3RseS4ifSwiaGludCI6IkFzayB3aGF0IGdlb21ldHJpYyBxdWFudGl0eSByIHJlcHJlc2VudHMuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJFeHBsYWluIHByZWNpc2VseSB3aHkgdGhlIHN5bWJvbCByIGluIHogPSByZV57as64fSBzaG91bGQgbm90IGJlIGNvbmZ1c2VkIHdpdGggdGhlIHJlYWwgcGFydCBhIGluIHogPSBhICsgamIuIiwiaWRlYWxfYW5zd2VyIjoiVGhlIHJlYWwgcGFydCBhIGlzIHRoZSBob3Jpem9udGFsIGNvb3JkaW5hdGUgb2YgdGhlIHBvaW50LCB3aGlsZSByIGlzIHRoZSBkaXN0YW5jZSBvZiB0aGUgcG9pbnQgZnJvbSB0aGUgb3JpZ2luLiBUaGV5IGRlc2NyaWJlIGRpZmZlcmVudCBnZW9tZXRyaWMgcXVhbnRpdGllcywgc28gdGhleSBhcmUgZXF1YWwgb25seSBpbiBzcGVjaWFsIGNhc2VzLCBub3QgaW4gZ2VuZXJhbC4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IHN0YXRlIHRoYXQgYSBpcyB0aGUgaG9yaXpvbnRhbCBjb29yZGluYXRlIG9yIHJlYWwgY29tcG9uZW50IiwiTXVzdCBzdGF0ZSB0aGF0IHIgaXMgZGlzdGFuY2UgZnJvbSB0aGUgb3JpZ2luIG9yIG1hZ25pdHVkZSIsIk11c3QgY2xlYXJseSBzYXkgdGhleSBhcmUgbm90IGdlbmVyYWxseSBlcXVhbCJdLCJleHBsYW5hdGlvbiI6IlRoaXMgdGVzdHMgd2hldGhlciB0aGUgc3R1ZGVudCB1bmRlcnN0YW5kcyB0aGUgbWVhbmluZyBvZiB0aGUgc3ltYm9scyBpbnN0ZWFkIG9mIHRyZWF0aW5nIGZvcm11bGFzIGFzIGludGVyY2hhbmdlYWJsZSBub3RhdGlvbi4iLCJoaW50IjoiQ29tcGFyZSB3aGF0IGVhY2ggc3ltYm9sIG1lYXN1cmVzIG9uIHRoZSBkaWFncmFtLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoia3BfbWFnbml0dWRlX2Zyb21fcmVjdGFuZ3VsYXIiLCJsYWJlbCI6Ik1hZ25pdHVkZSBmcm9tIHJlY3Rhbmd1bGFyIGZvcm0iLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoYXQgaXMgdGhlIG1hZ25pdHVkZSBvZiB6ID0gMSAtIGozPyIsIm9wdGlvbnMiOlsiQS4gNCIsIkIuIHNxcnQoMTApIiwiQy4gc3FydCg4KSIsIkQuIC1zcXJ0KDEwKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6Ik1hZ25pdHVkZSBpcyByID0gc3FydChhwrIgKyBiwrIpID0gc3FydCgxwrIgKyAoLTMpwrIpID0gc3FydCgxICsgOSkgPSBzcXJ0KDEwKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGF0IGlzIHRoZSBzdW0gb2YgYWJzb2x1dGUgdmFsdWVzLCBub3QgdGhlIG1hZ25pdHVkZSBmb3JtdWxhLiIsIkMiOiJUaGUgc3F1YXJlcyB3ZXJlIGFkZGVkIGluY29ycmVjdGx5LiIsIkQiOiJBIG1hZ25pdHVkZSBjYW5ub3QgYmUgbmVnYXRpdmUuIn0sImhpbnQiOiJVc2UgdGhlIGRpc3RhbmNlIGZvcm11bGEuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJrcF9hcmd1bWVudF9xdWFkcmFudF9jb3JyZWN0aW9uIiwibGFiZWwiOiJBcmd1bWVudCBhbmQgcXVhZHJhbnQgY29ycmVjdGlvbiIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBjYWxjdWxhdG9yIGdpdmVzIHRhbuKBu8K5KDEvKC0yKSkgPSAtMjYuNsKwIHdoZW4gd29ya2luZyB3aXRoIHogPSAtMiArIGoxLiBXaGF0IGlzIHRoZSBjb3JyZWN0IHByaW5jaXBhbCBhcmd1bWVudD8iLCJvcHRpb25zIjpbIkEuIC0yNi42wrAiLCJCLiAyNi42wrAiLCJDLiAxNTMuNMKwIiwiRC4gMjA2LjbCsCJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlRoZSBwb2ludCAoLTIsIDEpIGxpZXMgaW4gUXVhZHJhbnQgSUksIHNvIHRoZSBwcmluY2lwYWwgYW5nbGUgbXVzdCBiZSBpbiBRdWFkcmFudCBJSS4gVGhhdCBnaXZlcyAxODDCsCAtIDI2LjbCsCA9IDE1My40wrAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBhbmdsZSBsaWVzIGluIFF1YWRyYW50IElWLCBub3Qgd2hlcmUgdGhlIHBvaW50IGlzLiIsIkIiOiJUaGlzIGFuZ2xlIGxpZXMgaW4gUXVhZHJhbnQgSSwgYWxzbyBpbmNvcnJlY3QuIiwiRCI6IlRoaXMgaXMgY290ZXJtaW5hbCB3aXRoIHRoZSBwb2ludCBidXQgaXMgbm90IHRoZSBwcmluY2lwYWwgdmFsdWUgaW4gdGhlIHVzdWFsIC0xODDCsCB0byAxODDCsCByYW5nZS4ifSwiaGludCI6IkxvY2F0ZSB0aGUgcG9pbnQgYmVmb3JlIHRydXN0aW5nIHRoZSBpbnZlcnNlIHRhbmdlbnQgb3V0cHV0LiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJweXRob25fbWF0cGxvdGxpYiBjb21wbGV4LXBsYW5lIHBvaW50IGluIFF1YWRyYW50IElJIHdpdGggcmVmZXJlbmNlIGFuZ2xlIGFuZCBjb3JyZWN0ZWQgcHJpbmNpcGFsIGFuZ2xlIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBwb2xhciBmb3JtIGlzIGNvcnJlY3QgZm9yIHogPSAtMiAtIGozIHVzaW5nIGEgcHJpbmNpcGFsIGFuZ2xlPyIsIm9wdGlvbnMiOlsiQS4gc3FydCgxMyllXntqNTYuM8KwfSIsIkIuIHNxcnQoMTMpZV57LWoxMjMuN8KwfSIsIkMuIDVlXnstajEyMy43wrB9IiwiRC4gc3FydCgxMyllXnstajU2LjPCsH0iXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJNYWduaXR1ZGUgaXMgc3FydCgoLTIpwrIgKyAoLTMpwrIpID0gc3FydCgxMykuIFRoZSBwb2ludCAoLTIsIC0zKSBpcyBpbiBRdWFkcmFudCBJSUksIHNvIHRoZSBwcmluY2lwYWwgYW5nbGUgaXMgLSgxODDCsCAtIDU2LjPCsCkgPSAtMTIzLjfCsCwgbm90IDU2LjPCsCBvciAtNTYuM8KwLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IjU2LjPCsCBpcyB0aGUgcmVmZXJlbmNlIGFuZ2xlIGluIFF1YWRyYW50IEksIG5vdCB0aGUgYWN0dWFsIGFyZ3VtZW50LiIsIkMiOiJUaGUgbWFnbml0dWRlIGlzIHdyb25nOyBzcXJ0KCgtMinCsiArICgtMynCsikgPSBzcXJ0KDEzKSwgbm90IDUuIiwiRCI6IlRoaXMgYW5nbGUgbGllcyBpbiBRdWFkcmFudCBJViwgbm90IFF1YWRyYW50IElJSS4ifSwiaGludCI6IkNoZWNrIGJvdGggbWFnbml0dWRlIGFuZCBxdWFkcmFudC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoicHl0aG9uX21hdHBsb3RsaWIgY29tcGxleC1wbGFuZSBwb2ludCBpbiBRdWFkcmFudCBJSUkgd2l0aCBheGVzIGFuZCBhbmdsZSBsYWJlbCIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoia3BfcG9sYXJfdG9fY2FydGVzaWFuIiwibGFiZWwiOiJDb252ZXJ0aW5nIHBvbGFyL2V4cG9uZW50aWFsIGZvcm0gdG8gQ2FydGVzaWFuIGZvcm0iLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3A0X3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJDb252ZXJ0IHogPSAyZV57as+ALzN9IHRvIENhcnRlc2lhbiBmb3JtLiIsIm9wdGlvbnMiOlsiQS4gMiArIGooz4AvMykiLCJCLiAxICsgaiBzcXJ0KDMpIiwiQy4gc3FydCgzKSArIGoiLCJELiAyc3FydCgzKSArIGoiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJVc2UgeiA9IHIoY29zzrggKyBqIHNpbs64KTogMihjb3Moz4AvMykgKyBqIHNpbijPgC8zKSkgPSAyKDEvMiArIGrCt3NxcnQoMykvMikgPSAxICsgaiBzcXJ0KDMpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkV4cG9uZW50aWFsIGZvcm0gY2Fubm90IGJlIGNvbnZlcnRlZCBieSBzaW1wbHkgYXR0YWNoaW5nIHRoZSBhbmdsZSBhcyBhbiBpbWFnaW5hcnkgdGVybS4iLCJDIjoiVGhlIGNvc2luZSBhbmQgc2luZSB2YWx1ZXMgd2VyZSBzd2FwcGVkLiIsIkQiOiJUaGUgY29zaW5lIGZhY3RvciB3YXMgY29tcHV0ZWQgaW5jb3JyZWN0bHkuIn0sImhpbnQiOiJFeHBhbmQgd2l0aCBjb3NpbmUgYW5kIHNpbmUgZmlyc3QuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3A0X3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBzdGF0ZW1lbnQgaXMgdHJ1ZSBhYm91dCAyZV57ajTPgH0/Iiwib3B0aW9ucyI6WyJBLiBJdCBlcXVhbHMgMiIsIkIuIEl0IGVxdWFscyAtMiIsIkMuIEl0IGVxdWFscyA0z4AiLCJELiBJdCBjYW5ub3QgYmUgd3JpdHRlbiBpbiBDYXJ0ZXNpYW4gZm9ybSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IkJlY2F1c2UgY29zKDTPgCkgPSAxIGFuZCBzaW4oNM+AKSA9IDAsIHdlIGdldCAyZV57ajTPgH0gPSAyKDEgKyBqwrcwKSA9IDIuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhhdCB3b3VsZCBjb3JyZXNwb25kIHRvIGFuIG9kZCBtdWx0aXBsZSBvZiDPgCwgbm90IDTPgC4iLCJDIjoiVGhlIGV4cG9uZW50aWFsIGFuZ2xlIGlzIG5vdCBhIHNjYWxhciBtdWx0aXBsaWNhdGlvbiByZXN1bHQuIiwiRCI6IkV2ZXJ5IHBvbGFyIGZvcm0gY2FuIGJlIGNvbnZlcnRlZCB0byBDYXJ0ZXNpYW4gZm9ybS4ifSwiaGludCI6IkFuZ2xlcyBkaWZmZXJpbmcgYnkgbXVsdGlwbGVzIG9mIDLPgCByZXR1cm4gdG8gdGhlIHNhbWUgcG9pbnQuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfV19" style="display:none;"></div>%%KC_END%%
