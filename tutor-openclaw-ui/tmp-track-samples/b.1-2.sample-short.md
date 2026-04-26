# B.1-2 Complex Numbers — Rectangular, Polar, and Euler Forms

> **Section Objective:** Understand how complex numbers are written, plotted, and converted between forms — skills that appear directly on exams.

Many engineering problems start and end with real numbers, but the algebra in between becomes dramatically cleaner when you allow complex numbers into the picture. Think of them as a temporary tool that makes the work easier before you return to the real answer.

In this section you will learn four things: how to read and write **rectangular form** z = a + jb, how to identify the **real part** and **imaginary part** without making the classic sign mistake, how to describe the same number using **polar coordinates** r and θ, and how **Euler's formula** ties everything together into the compact exponential form. Exam questions regularly test all four of these — so let's build each one carefully.

![Fig. B.2](/figures/page-005-fig__b_2-1.png)
*This figure is the core map for the entire section: it shows a complex number z = a + jb as the point (a, b), its magnitude r, its angle θ from the positive real axis, and its conjugate z* = a − jb reflected across the real axis.*

## 1. Rectangular Form on the Complex Plane

The expression z = a + jb is a set of instructions: move **a units** along the horizontal (real) axis, then move **b units** along the vertical (imaginary) axis. The number z is simply the point (a, b) on this 2-D plane.

Two definitions you must know cold:

- **Re(z) = a** — the real part is the horizontal coordinate.
- **Im(z) = b** — the imaginary part is the vertical coordinate.

### COMMON EXAM TRAP

The imaginary part of z = 4 − 3j is **−3**, not **−3j**. The imaginary part is always a plain real number — the coefficient of j, with j itself stripped away.

#### Axis Rule

If b = 0, the number is purely real and sits on the horizontal axis. If a = 0, the number is purely imaginary and sits on the vertical axis.

$$z = a + jb, \qquad \operatorname{Re}(z)=a, \qquad \operatorname{Im}(z)=b$$
*Rectangular form separates a complex number into its horizontal coordinate a (the real part) and its vertical coordinate b (the imaginary part), locating it as the unique point (a, b) on the complex plane.*

## 2. Polar Form and Euler Form

Look at the plotted point (a, b) from the origin. Two pieces of geometry describe its location just as well as the coordinates do: the **distance r** from the origin, and the **angle θ** measured counterclockwise from the positive real axis.

Basic trigonometry connects the two descriptions:

- a = r cos θ (horizontal projection)
- b = r sin θ (vertical projection)

Substituting into z = a + jb gives the **polar form**:

z = r(cos θ + j sin θ)

Now here is where Euler's formula enters. It states:

e^{jθ} = cos θ + j sin θ

This means the polar form can be written even more compactly as the **Euler (exponential) form**:

z = re^{jθ}

### KEY INSIGHT

Rectangular form, polar form, and Euler form are **three different notations for the same point**. No information is gained or lost when you switch between them — you are just changing the language.

$$a = r\cos\theta, \qquad b = r\sin\theta, \qquad z = r(\cos\theta + j\sin\theta), \qquad e^{j\theta}=\cos\theta + j\sin\theta$$
*Rectangular coordinates (a, b), polar coordinates (r, θ), and Euler exponential form re^{jθ} are three equivalent notations that describe exactly the same complex number on the plane.*

Think of the complex plane as a city grid. The real axis runs east-west and the imaginary axis runs north-south. Writing z = a + jb is like saying: "Walk a blocks east, then b blocks north" — you end up at a specific corner. Polar form is the GPS version of the same trip: r is the straight-line distance to that corner, and θ is the compass bearing. Same destination, two ways to give directions.

---
**📌 Key Takeaways**
- z = a + jb plots as point (a, b); Re(z) = a and Im(z) = b are both real numbers.
- Polar form r(cos θ + j sin θ) and Euler form re^{jθ} are equivalent to rectangular form.
- Im(z) is the coefficient of j, never the full term jb — a common exam mistake.

*In the next section we will use these forms to do calculations more efficiently.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlY3Rhbmd1bGFyX2Zvcm1fYW5kX3BhcnRzIiwibGFiZWwiOiJSZWFkaW5nIHJlY3Rhbmd1bGFyIGZvcm0gYW5kIGlkZW50aWZ5aW5nIHJlYWwvaW1hZ2luYXJ5IHBhcnRzIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeiA9IDQgLSAzaiwgd2hpY2ggc3RhdGVtZW50IGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBSZSh6KSA9IDQgYW5kIEltKHopID0gLTMiLCJCLiBSZSh6KSA9IDQgYW5kIEltKHopID0gLTNqIiwiQy4gUmUoeikgPSAtMyBhbmQgSW0oeikgPSA0IiwiRC4gUmUoeikgPSA0aiBhbmQgSW0oeikgPSAtMyJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlRoZSByZWFsIHBhcnQgaXMgdGhlIGNvZWZmaWNpZW50IG9uIHRoZSBob3Jpem9udGFsIGF4aXMsIDQsIGFuZCB0aGUgaW1hZ2luYXJ5IHBhcnQgaXMgdGhlIGNvZWZmaWNpZW50IG9mIGosIHdoaWNoIGlzIC0zLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IkltKHopIGlzIHRoZSBjb2VmZmljaWVudCBvZiBqLCBub3QgdGhlIGZ1bGwgdGVybSB3aXRoIGogYXR0YWNoZWQuIiwiQyI6IlRoaXMgc3dhcHMgdGhlIHJlYWwgYW5kIGltYWdpbmFyeSBwYXJ0cy4iLCJEIjoiVGhlIHJlYWwgcGFydCBpcyBhIHJlYWwgbnVtYmVyLCBub3QgNGouIn0sImhpbnQiOiJSZWFkIHogPSBhICsgamIgYW5kIG1hdGNoIGEgYW5kIGIgY2FyZWZ1bGx5LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQSBzdHVkZW50IHNheXMsICdUaGUgaW1hZ2luYXJ5IHBhcnQgb2YgNCAtIDNqIGlzIC0zai4nIEV4cGxhaW4gcHJlY2lzZWx5IHdoYXQgaXMgd3Jvbmcgd2l0aCB0aGF0IHN0YXRlbWVudC4iLCJpZGVhbF9hbnN3ZXIiOiJUaGUgaW1hZ2luYXJ5IHBhcnQgaXMgdGhlIHJlYWwgY29lZmZpY2llbnQgb2Ygaiwgc28gSW0oeikgPSAtMy4gVGhlIHRlcm0gLTNqIGlzIHRoZSBpbWFnaW5hcnkgdGVybSBpbiB0aGUgZXhwcmVzc2lvbiwgbm90IHRoZSBpbWFnaW5hcnkgcGFydCBpdHNlbGYuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBzdGF0ZSB0aGF0IEltKHopID0gLTMiLCJNdXN0IGRpc3Rpbmd1aXNoIGltYWdpbmFyeSBwYXJ0IGZyb20gaW1hZ2luYXJ5IHRlcm0iLCJNdXN0IG1lbnRpb24gdGhhdCBqIGlzIGEgbWFya2VyIGF0dGFjaGVkIHRvIHRoZSBjb2VmZmljaWVudCBpbiB0aGUgZXhwcmVzc2lvbiJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQgdW5kZXJzdGFuZHMgdGhlIGRlZmluaXRpb24gaW5zdGVhZCBvZiBjb3B5aW5nIHRoZSBzeW1ib2wgcGF0dGVybi4iLCJoaW50IjoiU2VwYXJhdGUgdGhlIGNvZWZmaWNpZW50IGZyb20gdGhlIHN5bWJvbCBqLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiY29tcGxleF9wbGFuZV9pbnRlcnByZXRhdGlvbiIsImxhYmVsIjoiSW50ZXJwcmV0aW5nIGEgY29tcGxleCBudW1iZXIgYXMgYSBwb2ludCBvbiB0aGUgY29tcGxleCBwbGFuZSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggcG9pbnQgb24gdGhlIGNvbXBsZXggcGxhbmUgcmVwcmVzZW50cyB6ID0gLTIgKyA1aj8iLCJvcHRpb25zIjpbIkEuICg1LCAtMikiLCJCLiAoLTIsIDUpIiwiQy4gKC0yLCAtNSkiLCJELiAoMiwgNSkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJBIGNvbXBsZXggbnVtYmVyIHogPSBhICsgamIgY29ycmVzcG9uZHMgdG8gdGhlIHBvaW50IChhLCBiKSwgc28geiA9IC0yICsgNWogaXMgdGhlIHBvaW50ICgtMiwgNSkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyByZXZlcnNlcyB0aGUgY29vcmRpbmF0ZXMuIiwiQyI6IlRoZSBpbWFnaW5hcnkgcGFydCBpcyBwb3NpdGl2ZSA1LCBub3QgbmVnYXRpdmUgNS4iLCJEIjoiVGhlIHJlYWwgcGFydCBpcyAtMiwgbm90IDIuIn0sImhpbnQiOiJVc2UgeCA9IHJlYWwgcGFydCBhbmQgeSA9IGltYWdpbmFyeSBwYXJ0LiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJweXRob25fbWF0cGxvdGxpYl9jb21wbGV4X3BsYW5lX3BvaW50Iiwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoicG9sYXJfZm9ybV9jb252ZXJzaW9uIiwibGFiZWwiOiJDb25uZWN0aW5nIHJlY3Rhbmd1bGFyIGFuZCBwb2xhciBjb29yZGluYXRlcyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSWYgYSBwb2ludCBpbiB0aGUgY29tcGxleCBwbGFuZSBoYXMgcG9sYXIgY29vcmRpbmF0ZXMgKHIsIHRoZXRhKSwgd2hpY2ggcGFpciBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gYSA9IHIgc2luIHRoZXRhLCBiID0gciBjb3MgdGhldGEiLCJCLiBhID0gciBjb3MgdGhldGEsIGIgPSByIHNpbiB0aGV0YSIsIkMuIGEgPSB0aGV0YSBjb3MgciwgYiA9IHRoZXRhIHNpbiByIiwiRC4gYSA9IHIgdGFuIHRoZXRhLCBiID0gciJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBob3Jpem9udGFsIGNvb3JkaW5hdGUgaXMgYSA9IHIgY29zIHRoZXRhIGFuZCB0aGUgdmVydGljYWwgY29vcmRpbmF0ZSBpcyBiID0gciBzaW4gdGhldGEuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBzd2FwcyBjb3NpbmUgYW5kIHNpbmUuIiwiQyI6IlRoaXMgY29uZnVzZXMgdGhlIHZhcmlhYmxlcyBhbmQgaGFzIHRoZSB3cm9uZyBzdHJ1Y3R1cmUuIiwiRCI6InRhbiB0aGV0YSBkb2VzIG5vdCBkaXJlY3RseSBnaXZlIHRoZSB4LWNvb3JkaW5hdGUuIn0sImhpbnQiOiJUaGluayBvZiBzdGFuZGFyZCBwb2xhci10by1DYXJ0ZXNpYW4gY29udmVyc2lvbi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgY29tcGxleCBudW1iZXIgaGFzIG1hZ25pdHVkZSByIGFuZCBhbmdsZSB0aGV0YS4gV2hpY2ggZXhwcmVzc2lvbiBnaXZlcyBpdHMgcG9sYXIgZm9ybT8iLCJvcHRpb25zIjpbIkEuIHogPSByICsgaiB0aGV0YSIsIkIuIHogPSByKGNvcyB0aGV0YSAtIGogc2luIHRoZXRhKSIsIkMuIHogPSByKGNvcyB0aGV0YSArIGogc2luIHRoZXRhKSIsIkQuIHogPSBhKGNvcyB0aGV0YSArIGogc2luIHRoZXRhKSJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlBvbGFyIGZvcm0gdXNlcyB0aGUgbWFnbml0dWRlIHIgYW5kIGFuZ2xlIHRoZXRhIGFzIHogPSByKGNvcyB0aGV0YSArIGogc2luIHRoZXRhKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIGlzIG5vdCBhIHN0YW5kYXJkIHJlcHJlc2VudGF0aW9uIG9mIGEgY29tcGxleCBudW1iZXIuIiwiQiI6IlRoZSBzaWduIGlzIHdyb25nIGZvciB0aGUgc3RhbmRhcmQgcG9pbnQgYXQgYW5nbGUgdGhldGEuIiwiRCI6IlRoZSBzY2FsZSBmYWN0b3Igc2hvdWxkIGJlIHIsIG5vdCBhLiJ9LCJoaW50IjoiVXNlIHRoZSB0ZXh0Ym9vayBmb3JtdWxhIGRpcmVjdGx5LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiZXVsZXJfZm9ybXVsYV9lcXVpdmFsZW5jZSIsImxhYmVsIjoiUmVjb2duaXppbmcgRXVsZXIgZm9ybSBhcyBlcXVpdmFsZW50IHRvIHBvbGFyIGZvcm0iLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3A0X3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJVc2luZyBFdWxlcidzIGZvcm11bGEsIHdoaWNoIGV4cHJlc3Npb24gaXMgZXF1aXZhbGVudCB0byByKGNvcyB0aGV0YSArIGogc2luIHRoZXRhKT8iLCJvcHRpb25zIjpbIkEuIHJlXnstaiB0aGV0YX0iLCJCLiByaiB0aGV0YSIsIkMuIHJlXntqIHRoZXRhfSIsIkQuIGVee3IgdGhldGF9Il0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiRXVsZXIncyBmb3JtdWxhIHNheXMgZV57aiB0aGV0YX0gPSBjb3MgdGhldGEgKyBqIHNpbiB0aGV0YSwgc28gbXVsdGlwbHlpbmcgYnkgciBnaXZlcyB6ID0gcmVee2ogdGhldGF9LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBuZWdhdGl2ZSBzaWduIHdvdWxkIGNvcnJlc3BvbmQgdG8gY29zIHRoZXRhIC0gaiBzaW4gdGhldGEuIiwiQiI6IlRoaXMgaXMgbm90IGV4cG9uZW50aWFsIG5vdGF0aW9uLiIsIkQiOiJUaGUgZXhwb25lbnQgc2hvdWxkIGJlIGogdGhldGEsIG5vdCByIHRoZXRhLiJ9LCJoaW50IjoiTWF0Y2ggdGhlIGZvcm11bGEgZV57aiB0aGV0YX0gZXhhY3RseS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
