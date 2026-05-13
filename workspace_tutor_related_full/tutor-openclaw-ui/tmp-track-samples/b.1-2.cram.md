# B.1-2 Algebra of Complex Numbers

> **Section Objective:** Learn how complex numbers are written, visualized, and converted between rectangular and polar descriptions.

Consider z = 3 + 4j. This single expression tells you exactly where to go: 3 units along the horizontal real axis, then 4 units up the vertical imaginary axis. You land on a specific point in a two-dimensional plane — no ambiguity.

This section covers three things you will be tested on repeatedly: reading Re(z) and Im(z) directly from rectangular form, converting between rectangular and polar descriptions using magnitude r and angle θ, and recognizing the compact exponential form using Euler's formula.

> **Core takeaway:** A complex number is a point on a 2D plane, and rectangular, polar, and exponential forms are three different ways to describe the same point.

![Fig. B.2](/figures/page-005-fig__b_2-1.png)
*The complex plane with point z = a + jb at coordinates (a, b): magnitude r is the straight-line distance from the origin, angle θ is measured from the real axis, and the conjugate z* = a − jb is the mirror reflection across the real axis — one picture unifies rectangular and polar thinking.*

## 1. Rectangular Form: What a + jb Tells You Immediately

Take z = −2 + 5j. You can read off both coordinates instantly: the real part Re(z) is the plain number on the horizontal axis, and the imaginary part Im(z) is the coefficient of j on the vertical axis.

So for z = −2 + 5j: **Re(z) = −2** and **Im(z) = 5**.

### COMMON MISTAKE

Do not say the imaginary part is 5j. The expression **5j** is the *imaginary term* — the full piece of the sum. The *imaginary part* is the real number **5**, the coefficient alone. Exams frequently test this distinction, and writing 5j instead of 5 will cost you marks.

In general, for z = a + jb: Re(z) = a and Im(z) = b. Both are ordinary real numbers.

> **Core takeaway:** Re(z) and Im(z) are both real numbers — Im(z) is the coefficient of j, never the term jb itself.

$$z = a + jb, \quad \mathrm{Re}\,z = a, \quad \mathrm{Im}\,z = b$$
*Rectangular form separates a complex number into its horizontal coordinate a (real part) and its vertical coordinate b (imaginary part), both of which are ordinary real numbers.*

## 2. Polar Form: Same Number, Different Description

Rectangular form tells you *where* a point is by giving its x-y address. Polar form tells you the same thing by giving *distance and direction* from the origin.

Start with z = 3 + 4j, so a = 3 and b = 4.

**Step-by-step conversion:**

1. **Magnitude r** — the straight-line distance from the origin to the point (3, 4):

   r = √(3² + 4²) = √(9 + 16) = √25 = **5**

2. **Angle θ** — the direction from the positive real axis:

   θ = tan⁻¹(b/a) = tan⁻¹(4/3) ≈ 53.1°

3. **Polar form** — substitute back using a = r cos θ and b = r sin θ:

   z = 5(cos θ + j sin θ)

The two forms are completely equivalent: rectangular gives you the address directly, polar gives you the compass bearing and distance.

> **Core takeaway:** Polar form uses r = √(a² + b²) and θ = tan⁻¹(b/a) to rewrite the same point as z = r(cos θ + j sin θ).

$$a = r\cos\theta, \quad b = r\sin\theta, \quad z = a + jb = r(\cos\theta + j\sin\theta)$$
*Rectangular coordinates (a, b) and polar coordinates (r, θ) are two equivalent descriptions of the same complex number — one gives the x-y address, the other gives distance and angle from the origin.*

## 3. Euler's Formula Links Geometry to Algebra

You have already seen the polar expression r(cos θ + j sin θ). Euler's formula provides a compact shorthand for the bracket:

e^{jθ} = cos θ + j sin θ

Substituting directly gives the exponential form: **z = re^{jθ}**.

For exam purposes, the key skill is *recognition*: rectangular form a + jb, polar form r(cos θ + j sin θ), and exponential form re^{jθ} all represent the same complex number. You will encounter this notation throughout engineering and differential equations, where the compact exponential form makes calculations significantly cleaner.

> **Core takeaway:** Euler's formula e^{jθ} = cos θ + j sin θ converts polar form into the shorter exponential form z = re^{jθ}.

$$e^{j\theta} = \cos\theta + j\sin\theta$$
*Euler's formula packages the cosine and sine of an angle into a single exponential expression, making the polar form of a complex number shorter and easier to manipulate algebraically.*

---
**📌 Key Takeaways**
- Rectangular form z = a + jb: Re(z) = a and Im(z) = b are both real numbers, not terms.
- Polar form z = r(cos θ + j sin θ): r = √(a² + b²) gives distance, θ = tan⁻¹(b/a) gives angle.
- Euler form z = re^{jθ}: a compact equivalent of polar form via e^{jθ} = cos θ + j sin θ.

*In the next section we will use these forms to perform calculations more efficiently.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlY3Rhbmd1bGFyX3BhcnRzIiwibGFiZWwiOiJJZGVudGlmeSByZWFsIHBhcnQgYW5kIGltYWdpbmFyeSBwYXJ0IGZyb20gYSArIGpiIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeiA9IC0zICsgN2osIHdoaWNoIHN0YXRlbWVudCBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gUmUoeikgPSA3IGFuZCBJbSh6KSA9IC0zIiwiQi4gUmUoeikgPSAtMyBhbmQgSW0oeikgPSA3IiwiQy4gUmUoeikgPSAtMyBhbmQgSW0oeikgPSA3aiIsIkQuIFJlKHopID0gLTNqIGFuZCBJbSh6KSA9IDciXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJJbiB6ID0gYSArIGpiLCB0aGUgcmVhbCBwYXJ0IGlzIHRoZSBjb2VmZmljaWVudCB3aXRob3V0IGogYW5kIHRoZSBpbWFnaW5hcnkgcGFydCBpcyB0aGUgY29lZmZpY2llbnQgb2Ygai4gU28gUmUoeikgPSAtMyBhbmQgSW0oeikgPSA3LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgc3dhcHMgdGhlIGhvcml6b250YWwgYW5kIHZlcnRpY2FsIGNvbXBvbmVudHMuIiwiQyI6IlRoZSBpbWFnaW5hcnkgcGFydCBpcyA3LCBub3QgN2o7IDdqIGlzIHRoZSBpbWFnaW5hcnkgdGVybS4iLCJEIjoiVGhlIHJlYWwgcGFydCBjYW5ub3QgY29udGFpbiBqLiJ9LCJoaW50IjoiUmVhZCB0aGUgbnVtYmVyIGFzIGhvcml6b250YWwgcGFydCBwbHVzIHZlcnRpY2FsLWF4aXMgcGFydC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkEgc3R1ZGVudCBzYXlzOiAnRm9yIHogPSA0IC0gMmosIHRoZSBpbWFnaW5hcnkgcGFydCBpcyAtMmouJyBFeHBsYWluIHByZWNpc2VseSB3aGF0IGlzIHdyb25nIHdpdGggdGhhdCBzdGF0ZW1lbnQuIiwiaWRlYWxfYW5zd2VyIjoiVGhlIGltYWdpbmFyeSBwYXJ0IGlzIHRoZSBjb2VmZmljaWVudCBvZiBqLCBzbyBpdCBpcyAtMi4gVGhlIGV4cHJlc3Npb24gLTJqIGlzIHRoZSBpbWFnaW5hcnkgdGVybSwgbm90IHRoZSBpbWFnaW5hcnkgcGFydCBpdHNlbGYuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBzdGF0ZSB0aGF0IEltKHopID0gLTIiLCJNdXN0IGRpc3Rpbmd1aXNoIGltYWdpbmFyeSBwYXJ0IGZyb20gaW1hZ2luYXJ5IHRlcm0iLCJNdXN0IG1lbnRpb24gdGhhdCBqIGlzIGEgbWFya2VyIGF0dGFjaGVkIHRvIHRoZSB0ZXJtLCBub3QgcGFydCBvZiBJbSh6KSJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQga25vd3MgdGhlIGZvcm1hbCBkZWZpbml0aW9uIHJhdGhlciB0aGFuIGp1c3QgY29weWluZyBzeW1ib2xzLiIsImhpbnQiOiJTZXBhcmF0ZSB0aGUgY29lZmZpY2llbnQgZnJvbSB0aGUgc3ltYm9sIGouIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJwbGFuZV9pbnRlcnByZXRhdGlvbiIsImxhYmVsIjoiSW50ZXJwcmV0IGEgY29tcGxleCBudW1iZXIgYXMgYSBwb2ludCBvbiB0aGUgY29tcGxleCBwbGFuZSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBwb2ludCBvbiB0aGUgY29tcGxleCBwbGFuZSByZXByZXNlbnRzIHogPSAyIC0gNWo/Iiwib3B0aW9ucyI6WyJBLiAoMiwgLTUpIiwiQi4gKC01LCAyKSIsIkMuICgyLCA1KSIsIkQuICgtMiwgLTUpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiQSBjb21wbGV4IG51bWJlciB6ID0gYSArIGpiIG1hcHMgdG8gdGhlIHBvaW50IChhLCBiKS4gSGVyZSBhID0gMiBhbmQgYiA9IC01LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoaXMgcmV2ZXJzZXMgdGhlIGNvb3JkaW5hdGVzLiIsIkMiOiJUaGUgc2lnbiBvZiB0aGUgaW1hZ2luYXJ5IHBhcnQgaXMgd3JvbmcuIiwiRCI6IlRoZSBzaWduIG9mIHRoZSByZWFsIHBhcnQgaXMgd3JvbmcuIn0sImhpbnQiOiJVc2UgcG9pbnQgPSAocmVhbCBwYXJ0LCBpbWFnaW5hcnkgcGFydCkuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImNvbXBsZXhfcGxhbmVfcG9pbnRfcGxvdCIsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6InBvbGFyX3JlbGF0aW9uc2hpcCIsImxhYmVsIjoiUmVsYXRlIHJlY3Rhbmd1bGFyIGZvcm0gdG8gcG9sYXIgZm9ybSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSWYgeiA9IGEgKyBqYiBoYXMgcG9sYXIgY29vcmRpbmF0ZXMgKHIsIHRoZXRhKSwgd2hpY2ggc3RhdGVtZW50IGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBhID0gciBzaW4gdGhldGEgYW5kIGIgPSByIGNvcyB0aGV0YSIsIkIuIGEgPSByIGNvcyB0aGV0YSBhbmQgYiA9IHIgc2luIHRoZXRhIiwiQy4geiA9IHIoY29zIHRoZXRhIC0gaiBzaW4gdGhldGEpIiwiRC4gciA9IGEgKyBiIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIGhvcml6b250YWwgY29vcmRpbmF0ZSBpcyBhID0gciBjb3MgdGhldGEgYW5kIHRoZSB2ZXJ0aWNhbCBjb29yZGluYXRlIGlzIGIgPSByIHNpbiB0aGV0YSwgc28geiA9IHIoY29zIHRoZXRhICsgaiBzaW4gdGhldGEpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgc3dhcHMgY29zaW5lIGFuZCBzaW5lLiIsIkMiOiJUaGUgc2lnbiBiZWZvcmUgaiBzaW4gdGhldGEgc2hvdWxkIGJlIHBvc2l0aXZlIGZvciB6ID0gYSArIGpiLiIsIkQiOiJNYWduaXR1ZGUgaXMgbm90IGZvdW5kIGJ5IHNpbXBsZSBhZGRpdGlvbi4ifSwiaGludCI6IkNvc2luZSBnaXZlcyBob3Jpem9udGFsIGNvbXBvbmVudDsgc2luZSBnaXZlcyB2ZXJ0aWNhbCBjb21wb25lbnQuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeiA9IDMgKyA0aiwgd2hhdCBpcyB0aGUgbWFnbml0dWRlIHI/Iiwib3B0aW9ucyI6WyJBLiA0IiwiQi4gNSIsIkMuIDciLCJELiAyNSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlVzaW5nIHRoZSAzLTQtNSB0cmlhbmdsZSwgdGhlIGRpc3RhbmNlIGZyb20gdGhlIG9yaWdpbiB0byAoMywgNCkgaXMgNS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiI0IGlzIG9ubHkgdGhlIGltYWdpbmFyeSBjb29yZGluYXRlLiIsIkMiOiI3IGlzIHRoZSBzdW0gb2YgdGhlIGNvb3JkaW5hdGVzLCBub3QgdGhlIG1hZ25pdHVkZS4iLCJEIjoiMjUgaXMgciBzcXVhcmVkLCBub3Qgci4ifSwiaGludCI6IlRoaW5rIG9mIGRpc3RhbmNlIGZyb20gdGhlIG9yaWdpbiB0byB0aGUgcG9pbnQgKDMsIDQpLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJjb21wbGV4X3BsYW5lX3JpZ2h0X3RyaWFuZ2xlIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJldWxlcl9mb3JtdWxhIiwibGFiZWwiOiJSZWNvZ25pemUgRXVsZXIgZm9ybSBhcyBlcXVpdmFsZW50IHRvIHBvbGFyIGZvcm0iLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3A0X3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJVc2luZyBFdWxlcidzIGZvcm11bGEsIHdoaWNoIGV4cHJlc3Npb24gaXMgZXF1aXZhbGVudCB0byByKGNvcyB0aGV0YSArIGogc2luIHRoZXRhKT8iLCJvcHRpb25zIjpbIkEuIHJlXnRoZXRhIiwiQi4gcmVee2ogdGhldGF9IiwiQy4gcmpedGhldGEiLCJELiBlXntyIHRoZXRhfSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkV1bGVyJ3MgZm9ybXVsYSBzYXlzIGVee2ogdGhldGF9ID0gY29zIHRoZXRhICsgaiBzaW4gdGhldGEsIHNvIG11bHRpcGx5aW5nIGJ5IHIgZ2l2ZXMgeiA9IHJlXntqIHRoZXRhfS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIGlzIG1pc3NpbmcgdGhlIGZhY3RvciBqIGluIHRoZSBleHBvbmVudC4iLCJDIjoial50aGV0YSBpcyBub3QgRXVsZXIgZm9ybS4iLCJEIjoiVGhpcyBjaGFuZ2VzIGJvdGggdGhlIG1lYW5pbmcgYW5kIHRoZSByb2xlIG9mIHIuIn0sImhpbnQiOiJSZW1lbWJlciB0aGUgZXhhY3QgZm9ybXVsYTogZV57aiB0aGV0YX0gPSBjb3MgdGhldGEgKyBqIHNpbiB0aGV0YS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
