# B.1 Complex Numbers

> **Section Objective:** Learn to switch fluently between rectangular form (a + jb) and polar/exponential form (re^{jθ}), and avoid the most common exam trap along the way.

---

Consider z = −2 + j1. You can describe this number in two completely different languages. In **rectangular form**, you say: go left 2 units, go up 1 unit. In **polar form**, you say: travel a distance r at angle θ from the positive real axis. Same point, two descriptions.

This section is about switching between those two languages. You already know the complex plane and what real and imaginary parts mean — so the focus here is the part that trips students up on exams: what r actually means, what θ actually means, and how to convert between forms without making a quadrant mistake.

### EXAM TRAP

The single most common error: confusing the magnitude r with the real part a. For z = 3 + j4, the real part is 3 — but the magnitude is **5**, not 3. Keep that distinction sharp throughout this section.

![Fig. B.2](/figures/page-005-fig__b_2-1.png)
*Fig. B.2 is the core map of this section: it shows a complex number z = a + jb as a point (a, b) in the plane, its magnitude r as the distance from the origin, its angle θ measured from the positive real axis, and its conjugate z* = a − jb reflected across the real axis.*

$$z = a + jb = r(\cos\theta + j\sin\theta) = re^{j\theta}$$
*This is one complex number written in three equivalent forms: rectangular (a + jb), trigonometric (r(cosθ + j sinθ)), and exponential (re^{jθ}) — all three describe the exact same point. The connection between them is a = r cosθ and b = r sinθ, which means r is the straight-line distance from the origin to the point, not the horizontal coordinate a.*

## 1. Rectangular Form vs Polar Form

The core principle: **rectangular form** tells you horizontal and vertical components; **polar form** tells you distance and direction. Neither is more correct — they are two coordinate systems for the same 2D plane.

Let's work through z = 3 + j4 completely.

**Step 1 — Read the components:** a = 3, b = 4.

**Step 2 — Compute the magnitude:**

r = √(3² + 4²) = √(9 + 16) = √25 = **5**

**Step 3 — Compute the angle:**

θ = tan⁻¹(b/a) = tan⁻¹(4/3) ≈ **53.1°**

Since both a and b are positive, the point is in quadrant I, so the calculator's output is already correct.

**Step 4 — Write polar form:**

z = 5e^{j53.1°}

### COMMON MISTAKE

For z = 3 + j4: the real part is 3, the imaginary part is 4, and the magnitude is **5**. These are three different quantities. The magnitude is never just one of the components — it is the hypotenuse of the right triangle formed by a and b. Writing r = 3 because "3 is the first number" is the most frequent error on this topic.

![unknown](/figures/page-009-unknown-1.png)
*These four Argand diagrams show why quadrant awareness is the essential skill for rectangular-to-polar conversion: the same magnitude-and-arctangent procedure produces a different principal angle depending on which quadrant the point falls in — and getting the quadrant wrong means getting the entire answer wrong.*

## 2. Converting Rectangular to Polar Without Quadrant Mistakes

The trap with z = −2 + j1 is that a raw calculator arctangent will give you the wrong angle. Here is the reliable six-step method.

**Step 1 — Read a and b:** a = −2, b = 1.

**Step 2 — Compute the magnitude:**

r = √((−2)² + 1²) = √(4 + 1) = **√5**

**Step 3 — Compute the reference angle using absolute values:**

α = tan⁻¹(|b| / |a|) = tan⁻¹(1/2) ≈ **26.6°**

The reference angle is always a positive acute angle — it tells you how far the point is from the nearest horizontal axis.

**Step 4 — Determine the quadrant from the signs of a and b:**

a < 0 and b > 0 → **Quadrant II**

**Step 5 — Choose the principal angle:**

In quadrant II, the principal angle = 180° − reference angle = 180° − 26.6° = **153.4°**

**Step 6 — Write the final polar form:**

z = √5 · e^{j153.4°}

### KEY INSIGHT

The calculator's raw arctangent of (−1/2) or (1/−2) alone is not enough. Arctangent only returns values between −90° and 90°, so it cannot distinguish quadrant II from quadrant IV, or quadrant I from quadrant III. Always inspect the signs of a and b separately to place the point in the correct quadrant before choosing the final angle.

![Fig. B.5](/figures/page-011-fig__b_5-1.png)
*Fig. B.5 reverses the conversion direction: starting from a known magnitude r and angle θ, you recover the rectangular coordinates by computing a = r cosθ and b = r sinθ — the diagrams include examples with negative angles and angles involving multiple full rotations, confirming that the same cosine-and-sine rule applies in every case.*

## 3. Converting Polar Back to Rectangular

The rule is direct: if z = re^{jθ}, then

a = r cosθ and b = r sinθ, so z = a + jb.

There is no quadrant decision needed here — cosine and sine handle the signs automatically.

**Worked example — z = 2e^{jπ/3}:**

a = 2 cos(π/3) = 2 × (1/2) = **1**

b = 2 sin(π/3) = 2 × (√3/2) = **√3**

Therefore z = **1 + j√3**.

### EQUIVALENT ANGLES

One clarification worth making explicit: adding or subtracting full rotations (multiples of 2π) does not change the point. For example:

2e^{j4π} = 2(cos 4π + j sin 4π) = 2(1 + j·0) = **2**

The radius stays 2 regardless of how many full turns the angle contains. The extra rotations cancel out because cos(4π) = 1 and sin(4π) = 0, landing back on the positive real axis. This means 2e^{j4π} and 2e^{j0} are the same number.

#### Note

When converting, always evaluate cosine and sine numerically first — do not leave the angle sitting next to r as if it were a rectangular component.

---
**📌 Key Takeaways**
- Rectangular form gives real and imaginary components (a, b); polar form gives magnitude r and angle θ.
- Magnitude is r = √(a² + b²) — never the same as the real part a.
- Always use quadrant-aware angle selection; raw arctangent alone gives the wrong angle in quadrants II and III.

*In the next section we will use these forms to make complex-number calculations easier.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImtwX3JlY3RfdnNfcG9sYXJfbWVhbmluZyIsImxhYmVsIjoiTWVhbmluZyBvZiByZWN0YW5ndWxhciB2cyBwb2xhciBwYXJhbWV0ZXJzIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeiA9IDMgKyBqNCwgd2hpY2ggcXVhbnRpdHkgaXMgdGhlIG1hZ25pdHVkZT8iLCJvcHRpb25zIjpbIkEuIDMiLCJCLiA0IiwiQy4gNSIsIkQuIDciXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJUaGUgbWFnbml0dWRlIGlzIHIgPSDiiJooM8KyICsgNMKyKSA9IOKImjI1ID0gNS4gSXQgaXMgdGhlIGRpc3RhbmNlIGZyb20gdGhlIG9yaWdpbiB0byB0aGUgcG9pbnQgKDMsIDQpIGluIHRoZSBjb21wbGV4IHBsYW5lLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IjMgaXMgdGhlIHJlYWwgcGFydCBhLCBub3QgdGhlIG1hZ25pdHVkZS4gVGhlIG1hZ25pdHVkZSByZXF1aXJlcyB0aGUgZGlzdGFuY2UgZm9ybXVsYS4iLCJCIjoiNCBpcyB0aGUgaW1hZ2luYXJ5IHBhcnQgYiwgbm90IHRoZSBtYWduaXR1ZGUuIiwiRCI6IjMgKyA0ID0gNyBpcyBub3QgdGhlIG1hZ25pdHVkZSBmb3JtdWxhLiBZb3UgbXVzdCBzcXVhcmUsIHN1bSwgdGhlbiB0YWtlIHRoZSBzcXVhcmUgcm9vdC4ifSwiaGludCI6IlVzZSB0aGUgZGlzdGFuY2UgZm9ybXVsYSBpbiB0aGUgY29tcGxleCBwbGFuZTogciA9IOKImihhwrIgKyBiwrIpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggc3RhdGVtZW50IGNvcnJlY3RseSBjb21wYXJlcyByZWN0YW5ndWxhciBhbmQgcG9sYXIgZm9ybT8iLCJvcHRpb25zIjpbIkEuIFJlY3Rhbmd1bGFyIGZvcm0gZ2l2ZXMgbWFnbml0dWRlIGFuZCBhbmdsZTsgcG9sYXIgZm9ybSBnaXZlcyByZWFsIGFuZCBpbWFnaW5hcnkgcGFydHMuIiwiQi4gUmVjdGFuZ3VsYXIgZm9ybSBnaXZlcyByZWFsIGFuZCBpbWFnaW5hcnkgY29tcG9uZW50czsgcG9sYXIgZm9ybSBnaXZlcyBtYWduaXR1ZGUgYW5kIGFuZ2xlLiIsIkMuIEJvdGggZm9ybXMgZ2l2ZSBvbmx5IHRoZSByZWFsIHBhcnQgZGlyZWN0bHkuIiwiRC4gUG9sYXIgZm9ybSBjYW5ub3QgcmVwcmVzZW50IG51bWJlcnMgaW4gcXVhZHJhbnQgSUkgb3IgSUlJLiJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlJlY3Rhbmd1bGFyIGZvcm0gaXMgY29tcG9uZW50LWJhc2VkIChob3Jpem9udGFsIGEsIHZlcnRpY2FsIGIpLCB3aGlsZSBwb2xhciBmb3JtIGlzIGxlbmd0aC1hbmQtZGlyZWN0aW9uIGJhc2VkIChtYWduaXR1ZGUgciwgYW5nbGUgzrgpLiBUaGV5IGRlc2NyaWJlIHRoZSBzYW1lIHBvaW50IGluIHR3byBkaWZmZXJlbnQgY29vcmRpbmF0ZSBsYW5ndWFnZXMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyByZXZlcnNlcyB0aGUgcm9sZXMgb2YgdGhlIHR3byBmb3JtcyDigJQgcmVjdGFuZ3VsYXIgZ2l2ZXMgY29tcG9uZW50cywgcG9sYXIgZ2l2ZXMgbWFnbml0dWRlIGFuZCBhbmdsZS4iLCJDIjoiQm90aCBmb3JtcyBkZXNjcmliZSB0aGUgY29tcGxldGUgY29tcGxleCBudW1iZXIsIG5vdCBvbmx5IHRoZSByZWFsIHBhcnQuIiwiRCI6IlBvbGFyIGZvcm0gd29ya3MgaW4gYWxsIGZvdXIgcXVhZHJhbnRzOyB0aGUgYW5nbGUgzrggc2ltcGx5IHRha2VzIGEgZGlmZmVyZW50IHZhbHVlIGluIGVhY2ggcXVhZHJhbnQuIn0sImhpbnQiOiJBc2sgd2hhdCBlYWNoIGZvcm0gdGVsbHMgeW91IG1vc3QgbmF0dXJhbGx5OiBjb29yZGluYXRlcyBvciBkaXN0YW5jZS1hbmdsZT8iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImtwX3JlY3RfdG9fcG9sYXIiLCJsYWJlbCI6IlJlY3Rhbmd1bGFyIHRvIHBvbGFyIGNvbnZlcnNpb24iLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldyaXRlIHogPSDiiJIyICsgajEgaW4gcG9sYXIgZm9ybSB1c2luZyB0aGUgcHJpbmNpcGFsIGFuZ2xlIGluIGRlZ3JlZXMuIiwib3B0aW9ucyI6WyJBLiDiiJo1IMK3IGVee2oyNi42wrB9IiwiQi4g4oiaNSDCtyBlXnviiJJqMjYuNsKwfSIsIkMuIOKImjUgwrcgZV57ajE1My40wrB9IiwiRC4gNWVee2oxNTMuNMKwfSJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlRoZSBtYWduaXR1ZGUgaXMgciA9IOKImig0ICsgMSkgPSDiiJo1LiBTaW5jZSBhID0g4oiSMiA8IDAgYW5kIGIgPSAxID4gMCwgdGhlIHBvaW50IGlzIGluIHF1YWRyYW50IElJLiBUaGUgcmVmZXJlbmNlIGFuZ2xlIGlzIHRhbuKBu8K5KDEvMikg4omIIDI2LjbCsCwgc28gdGhlIHByaW5jaXBhbCBhbmdsZSBpcyAxODDCsCDiiJIgMjYuNsKwID0gMTUzLjTCsC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiIyNi42wrAgaXMgb25seSB0aGUgcmVmZXJlbmNlIGFuZ2xlIG1lYXN1cmVkIGZyb20gdGhlIG5lZ2F0aXZlIHJlYWwgYXhpcyDigJQgaXQgcGxhY2VzIHRoZSBwb2ludCBpbiBxdWFkcmFudCBJLCB3aGljaCBpcyB3cm9uZy4iLCJCIjoiQSBuZWdhdGl2ZSBhbmdsZSBvZiDiiJIyNi42wrAgcGxhY2VzIHRoZSBwb2ludCBpbiBxdWFkcmFudCBJViwgd2hpY2ggaGFzIGEgPiAwIGFuZCBiIDwgMCDigJQgdGhlIG9wcG9zaXRlIHNpZ24gcGF0dGVybi4iLCJEIjoiVGhlIG1hZ25pdHVkZSBpcyDiiJo1IOKJiCAyLjI0LCBub3QgNS4gQ2hlY2sgdGhlIGRpc3RhbmNlIGZvcm11bGEuIn0sImhpbnQiOiJDaGVjayBib3RoIHRoZSBtYWduaXR1ZGUgYW5kIHRoZSBxdWFkcmFudCBzZXBhcmF0ZWx5IGJlZm9yZSB3cml0aW5nIHRoZSBmaW5hbCBhbnN3ZXIuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImNvbXBsZXhfcGxhbmVfcG9pbnRfd2l0aF9xdWFkcmFudHMiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgY2FsY3VsYXRvciBnaXZlcyB0YW7igbvCuSgo4oiSMykvKOKIkjIpKSA9IDU2LjPCsCB3aGlsZSBjb252ZXJ0aW5nIHogPSDiiJIyIOKIkiBqMyB0byBwb2xhciBmb3JtLiBXaGF0IHNob3VsZCB0aGUgcHJpbmNpcGFsIGFuZ2xlIGJlPyIsIm9wdGlvbnMiOlsiQS4gNTYuM8KwIiwiQi4gMTIzLjfCsCIsIkMuIOKIkjEyMy43wrAiLCJELiDiiJI1Ni4zwrAiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJUaGUgcG9pbnQgKOKIkjIsIOKIkjMpIGlzIGluIHF1YWRyYW50IElJSSAoYm90aCBhIGFuZCBiIGFyZSBuZWdhdGl2ZSkuIFRoZSByZWZlcmVuY2UgYW5nbGUgaXMgNTYuM8KwLCBzbyB0aGUgcXVhZHJhbnQgSUlJIGFuZ2xlIGlzIDU2LjPCsCArIDE4MMKwID0gMjM2LjPCsC4gRXhwcmVzc2VkIGFzIGEgcHJpbmNpcGFsIHZhbHVlIGluIHRoZSByYW5nZSAo4oiSMTgwwrAsIDE4MMKwXSwgdGhpcyBpcyAyMzYuM8KwIOKIkiAzNjDCsCA9IOKIkjEyMy43wrAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiNTYuM8KwIGlzIHRoZSByZWZlcmVuY2UgYW5nbGUgb25seTsgaXQgcGxhY2VzIHRoZSBwb2ludCBpbiBxdWFkcmFudCBJLCB3aGljaCBoYXMgdGhlIHdyb25nIHNpZ25zLiIsIkIiOiIxMjMuN8KwIGlzIGluIHF1YWRyYW50IElJIChhIDwgMCwgYiA+IDApLCBub3QgcXVhZHJhbnQgSUlJLiIsIkQiOiLiiJI1Ni4zwrAgaXMgaW4gcXVhZHJhbnQgSVYgKGEgPiAwLCBiIDwgMCksIGFsc28gaW5jb3JyZWN0LiJ9LCJoaW50IjoiRG8gbm90IHRydXN0IGFyY3RhbmdlbnQgYWxvbmUg4oCUIGluc3BlY3QgdGhlIHNpZ25zIG9mIGEgYW5kIGIgdG8gaWRlbnRpZnkgdGhlIGNvcnJlY3QgcXVhZHJhbnQgZmlyc3QuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImNvbXBsZXhfcGxhbmVfcG9pbnRfd2l0aF9xdWFkcmFudHMiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTMiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkNvbnZlcnQgeiA9IDEg4oiSIGozIHRvIHBvbGFyIGZvcm0uIFNob3cgdGhlIG1hZ25pdHVkZSwgdGhlIHJlZmVyZW5jZSBhbmdsZSwgdGhlIHF1YWRyYW50IGRlY2lzaW9uLCBhbmQgdGhlIGZpbmFsIHByaW5jaXBhbCBhbmdsZS4iLCJpZGVhbF9hbnN3ZXIiOiJhID0gMSBhbmQgYiA9IOKIkjMuIFRoZSBtYWduaXR1ZGUgaXMgciA9IOKImigxwrIgKyAo4oiSMynCsikgPSDiiJooMSArIDkpID0g4oiaMTAuIFRoZSByZWZlcmVuY2UgYW5nbGUgaXMgdGFu4oG7wrkofOKIkjN8L3wxfCkgPSB0YW7igbvCuSgzKSDiiYggNzEuNsKwLiBTaW5jZSBhID4gMCBhbmQgYiA8IDAsIHRoZSBwb2ludCBpcyBpbiBxdWFkcmFudCBJViwgc28gdGhlIHByaW5jaXBhbCBhbmdsZSBpcyDiiJI3MS42wrAuIFRoZXJlZm9yZSB6ID0g4oiaMTAgwrcgZV574oiSajcxLjbCsH0uIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBjb21wdXRlIHIgPSDiiJoxMCBjb3JyZWN0bHkiLCJNdXN0IHNob3cgYSByZWZlcmVuY2UgYW5nbGUgZGVyaXZlZCBmcm9tIGFyY3RhbmdlbnQgb2YgfGIvYXwiLCJNdXN0IGlkZW50aWZ5IHF1YWRyYW50IElWIGZyb20gdGhlIHNpZ25zIGEgPiAwLCBiIDwgMCIsIk11c3QgZ2l2ZSB0aGUgZmluYWwgcHJpbmNpcGFsIGFuZ2xlIGFzIOKIkjcxLjbCsCBvciBhbiBlcXVpdmFsZW50IGNvcnJlY3QgdmFsdWUiLCJNdXN0IHdyaXRlIHRoZSBjb21wbGV0ZSBmaW5hbCBwb2xhciBmb3JtIOKImjEwIMK3IGVee+KIkmo3MS42wrB9Il0sImV4cGxhbmF0aW9uIjoiVGhpcyBxdWVzdGlvbiBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCBjYW4gZXhlY3V0ZSB0aGUgZnVsbCBzaXgtc3RlcCBjb252ZXJzaW9uIG1ldGhvZCBvbiBhIG5ldyBleGFtcGxlLCByYXRoZXIgdGhhbiBwYXR0ZXJuLW1hdGNoaW5nIHRoZSBtZW1vcml6ZWQgeiA9IOKIkjIgKyBqMSBjYXNlLiIsImhpbnQiOiJUcmVhdCBtYWduaXR1ZGUgYW5kIGFuZ2xlIGFzIHR3byBjb21wbGV0ZWx5IHNlcGFyYXRlIHRhc2tzLCB0aGVuIGNvbWJpbmUgYXQgdGhlIGVuZC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJrcF9wb2xhcl90b19yZWN0YW5ndWxhciIsImxhYmVsIjoiUG9sYXIgdG8gcmVjdGFuZ3VsYXIgY29udmVyc2lvbiIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJDb252ZXJ0IHogPSAyZV57as+ALzN9IHRvIHJlY3Rhbmd1bGFyIGZvcm0uIiwib3B0aW9ucyI6WyJBLiAxICsgauKImjMiLCJCLiDiiJozICsgaiIsIkMuIDIgKyBqz4AvMyIsIkQuIDEg4oiSIGriiJozIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiQXBwbHkgYSA9IHIgY29zzrggYW5kIGIgPSByIHNpbs64LiBIZXJlIGEgPSAyIGNvcyjPgC8zKSA9IDIgw5cgKDEvMikgPSAxIGFuZCBiID0gMiBzaW4oz4AvMykgPSAyIMOXICjiiJozLzIpID0g4oiaMy4gU28geiA9IDEgKyBq4oiaMy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGlzIHN3YXBzIHRoZSBjb3NpbmUgYW5kIHNpbmUgdmFsdWVzIOKAlCBjb3NpbmUgZ2l2ZXMgdGhlIHJlYWwgcGFydCwgc2luZSBnaXZlcyB0aGUgaW1hZ2luYXJ5IHBhcnQsIG5vdCB0aGUgb3RoZXIgd2F5IGFyb3VuZC4iLCJDIjoiWW91IGNhbm5vdCBjb252ZXJ0IGJ5IHdyaXRpbmcgdGhlIHBhcmFtZXRlcnMgc2lkZSBieSBzaWRlLiBZb3UgbXVzdCBldmFsdWF0ZSBjb3MgYW5kIHNpbiBudW1lcmljYWxseS4iLCJEIjoiVGhlIGFuZ2xlIM+ALzMgaXMgcG9zaXRpdmUgYW5kIGluIHF1YWRyYW50IEksIHNvIHNpbijPgC8zKSBpcyBwb3NpdGl2ZSDigJQgdGhlIGltYWdpbmFyeSBwYXJ0IG11c3QgYmUgcG9zaXRpdmUuIn0sImhpbnQiOiJDb21wdXRlIGNvc2luZSBmb3IgdGhlIHJlYWwgcGFydCBhbmQgc2luZSBmb3IgdGhlIGltYWdpbmFyeSBwYXJ0LCB0aGVuIG11bHRpcGx5IGVhY2ggYnkgciA9IDIuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGF0IGlzIHRoZSByZWN0YW5ndWxhciBmb3JtIG9mIDJlXnviiJJqNM+AfT8iLCJvcHRpb25zIjpbIkEuIOKIkjIiLCJCLiAyIiwiQy4gMmoiLCJELiDiiJIyaiJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkFuIGFuZ2xlIG9mIOKIkjTPgCByZXByZXNlbnRzIHR3byBjb21wbGV0ZSBjbG9ja3dpc2Ugcm90YXRpb25zLCB3aGljaCByZXR1cm5zIHRvIHRoZSBzdGFydGluZyBwb2ludCBvbiB0aGUgcG9zaXRpdmUgcmVhbCBheGlzLiBUaGVyZWZvcmUgY29zKOKIkjTPgCkgPSAxIGFuZCBzaW4o4oiSNM+AKSA9IDAsIGdpdmluZyAyKDEgKyBqwrcwKSA9IDIuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoi4oiSMiBjb3JyZXNwb25kcyB0byBhbiBhbmdsZSBvZiDPgCAob3IgMTgwwrApLCBub3Qg4oiSNM+ALiIsIkMiOiIyaiBjb3JyZXNwb25kcyB0byBhbiBhbmdsZSBvZiDPgC8yICg5MMKwKSwgbm90IOKIkjTPgC4iLCJEIjoi4oiSMmogY29ycmVzcG9uZHMgdG8gYW4gYW5nbGUgb2Yg4oiSz4AvMiAo4oiSOTDCsCksIG5vdCDiiJI0z4AuIn0sImhpbnQiOiJGdWxsIHJvdGF0aW9ucyAobXVsdGlwbGVzIG9mIDLPgCkgZG8gbm90IGNoYW5nZSB0aGUgZmluYWwgcG9zaXRpb24gb2YgdGhlIHBvaW50LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfV19" style="display:none;"></div>%%KC_END%%
