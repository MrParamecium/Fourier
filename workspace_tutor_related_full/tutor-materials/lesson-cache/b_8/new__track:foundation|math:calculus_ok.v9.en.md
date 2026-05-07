# B.8 Appendix: Useful Mathematical Formulas

> **Objective:** Recognize the main formula families in this appendix and know which one to reach for under exam pressure.

This appendix is a formula toolbox, not a new theory chapter. Nothing here requires you to learn a new concept from scratch. The goal is simple: when you see a certain type of expression, you know which formula family to reach for.

You will find six groups in this appendix: **constants**, **complex numbers**, **series**, **trigonometric identities**, **derivatives and integrals**, and **polynomial formulas**.

Because this is a foundation-level reference, you do not need to memorize everything at once. Start by learning what each formula is *for*. For example: if you see e^(jx), think cosine and sine — that is Euler's formula at work.

This appendix matters because later chapters and timed exams will assume you can locate and apply these formulas quickly. Knowing where to look is half the battle.

![This page begins the appendix and collects constants, complex-number formulas, and summation formulas that are often used as quick references.](/pages/page-054.png)

## 1. Complex Numbers and Euler Form

Before the formulas, a quick prerequisite patch. The symbol **j** marks the imaginary direction — it points perpendicular to the ordinary number line. The symbol **θ** is an angle measured in radians. The functions **cos** and **sin** give the horizontal and vertical coordinates of a point on a unit circle.

Now the anchor formula: **e^(jθ) = cos θ + j sin θ**. This is Euler's formula. It says that an exponential with an imaginary angle is the same as a cosine plus j times a sine. As a quick check: when θ = π/2, cos(π/2) = 0 and sin(π/2) = 1, so e^(jπ/2) = j.

A complex number can be written in two equivalent ways:

- **Rectangular form:** a + jb, where **a** is the real part and **b** is the coefficient of j (the imaginary part — note: the imaginary part is b, not jb).
- **Polar form:** re^(jθ), where **r** is the length (magnitude) and **θ** is the angle.

### COMMON MISTAKE

Do not say the imaginary part is "jb". The imaginary part is the plain number **b**. The j is a direction marker, not part of the value.

These forms connect directly to phasors and sinusoidal signals in later chapters.

$$e^{\pm j\theta}=\cos\theta \pm j\sin\theta,\qquad a+jb=re^{j\theta},\qquad r=\sqrt{a^2+b^2},\ \theta=\tan^{-1}\!\left(\frac{b}{a}\right)$$
*Euler's formula converts an angle θ into its cosine and sine components, linking the exponential form to the geometry of a circle. Rectangular form a + jb and polar form re^(jθ) describe the exact same complex number — one using horizontal and vertical coordinates, the other using a length and an angle.*

## 2. Series and Trig Formulas You Reach for Often

> **Clean rule:** Series help you approximate functions; trig identities help you rewrite expressions into simpler forms.

### NOTATION PATCH

Before diving in: **3!** means 3 × 2 × 1 = 6. The dots (**...**) in a series mean the pattern continues with more terms. You can stop at any term when you only need an approximation.

The **Maclaurin series** builds a function from powers of x near x = 0. Three you will see constantly:

- **e^x** = 1 + x + x²/2! + x³/3! + ...
- **sin x** = x − x³/3! + x⁵/5! − ...
- **cos x** = 1 − x²/2! + x⁴/4! − ...

#### Exam use for series
When x is small, drop higher-order terms to get a quick approximation. For example, sin x ≈ x for small x.

Now the **trigonometric identities** you will reach for most:

- **Pythagorean:** sin²x + cos²x = 1
- **Double angle:** 2 sin x cos x = sin 2x
- **Angle sum:** sin(x ± y) = sin x cos y ± cos x sin y
- **Angle sum:** cos(x ± y) = cos x cos y ∓ sin x sin y

#### Exam use for trig identities
Use them to simplify products into single terms, or to convert a squared function into a double-angle form.

![This page groups together series expansions and basic trigonometric identities that are especially useful for approximation and algebraic simplification.](/pages/page-055.png)

## 3. Calculus and Equation Formulas for Quick Lookup

> **Clean rule:** Derivatives tell you rates of change, integrals reverse derivatives or accumulate area, and polynomial formulas solve equations directly.

### PREREQUISITE PATCH

**d/dx** means "differentiate with respect to x" — find how fast the function changes. The **integral sign ∫** means "find an antiderivative" — reverse the derivative, or accumulate area under a curve.

---

### PART A — Derivative Patterns

Key entries from the appendix:

- **Chain rule:** d/dx[f(g(x))] = f'(g(x)) · g'(x)
- **Product rule:** d/dx[uv] = u'v + uv'
- **Quotient rule:** d/dx[u/v] = (u'v − uv') / v²
- d/dx[e^(bx)] = b e^(bx)
- d/dx[sin(ax)] = a cos(ax)
- d/dx[cos(ax)] = −a sin(ax)
- d/dx[tan⁻¹(ax)] = a / (1 + a²x²)

### PART B — Integral Patterns

- **Integration by parts:** ∫u dv = uv − ∫v du
- ∫sin(ax) dx = −(1/a)cos(ax)
- ∫cos(ax) dx = (1/a)sin(ax)
- ∫e^(ax) dx = (1/a)e^(ax)
- ∫e^(ax)sin(bx) dx — use the tabulated form from the appendix

### PART C — Equation-Solving Formulas

When you see **ax² + bx + c = 0**, reach immediately for the **quadratic formula**. That is the must-know item. The cubic formula exists in the appendix as a reference, but most students do not memorize it.

#### Warning
Always check signs and constants carefully — a single sign error in the quadratic formula changes both roots.

$$\frac{d}{dx}\,e^{bx}=be^{bx},\qquad \int e^{ax}\,dx=\frac{1}{a}e^{ax},\qquad x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$$
*These three are among the highest-frequency reference formulas in the appendix: the derivative of e^(bx) brings down the coefficient b, the integral of e^(ax) divides by a, and the quadratic formula gives both roots of any equation in the standard form ax² + bx + c = 0.*

---
**📌 Key Takeaways**
- Match the expression type to the correct formula family before calculating — identification comes first.
- Watch signs and coefficients carefully; one wrong sign in Euler, trig, or the quadratic formula changes the answer.
- Use this appendix as a fast lookup during exams — you do not need to rederive these from scratch.

*Highest-yield items to bookmark: Euler formula (e^(jθ) = cos θ + j sin θ), basic Maclaurin series (e^x, sin x, cos x), key trig identities (Pythagorean, double-angle, angle-sum), chain and product rules, common integrals (e^(ax), sin(ax), cos(ax)), and the quadratic formula. In the next section we will use these formulas as tools rather than studying the list itself.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6OCwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjl9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImNvbXBsZXhfZXVsZXJfYW5kX2Zvcm1zIiwibGFiZWwiOiJFdWxlciBmb3JtdWxhIGFuZCByZWN0YW5ndWxhci9wb2xhciBjb21wbGV4LW51bWJlciBmb3JtcyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggZm9ybXVsYSBjb3JyZWN0bHkgY29ubmVjdHMgdGhlIGV4cG9uZW50aWFsIGZvcm0gb2YgYSBjb21wbGV4IG51bWJlciB0byBzaW5lIGFuZCBjb3NpbmU/Iiwib3B0aW9ucyI6WyJBLiBlXntqXFx0aGV0YX0gPSBcXHNpblxcdGhldGEgKyBqXFxjb3NcXHRoZXRhIiwiQi4gZV57alxcdGhldGF9ID0gXFxjb3NcXHRoZXRhICsgalxcc2luXFx0aGV0YSIsIkMuIGVee2pcXHRoZXRhfSA9IFxcY29zXFx0aGV0YSAtIGpcXHNpblxcdGhldGEiLCJELiBlXntqXFx0aGV0YX0gPSBcXHRoZXRhICsgaiJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkV1bGVyJ3MgZm9ybXVsYSBpcyBlXntqXFx0aGV0YX0gPSBjb3NcXHRoZXRhICsgaiBzaW5cXHRoZXRhLiBJdCBsaW5rcyBhbmdsZSBmb3JtIHRvIGhvcml6b250YWwgYW5kIHZlcnRpY2FsIGNvbXBvbmVudHMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBzd2FwcyBzaW5lIGFuZCBjb3NpbmUsIHdoaWNoIGNoYW5nZXMgdGhlIGhvcml6b250YWwgYW5kIHZlcnRpY2FsIHJvbGVzLiIsIkMiOiJUaGUgbWludXMgc2lnbiB3b3VsZCBjb3JyZXNwb25kIHRvIGVeey1qXFx0aGV0YX0sIG5vdCBlXntqXFx0aGV0YX0uIiwiRCI6IlRoaXMgaXMgbm90IGEgdmFsaWQgZXhwb25lbnRpYWwtdHJpZ29ub21ldHJpYyBpZGVudGl0eS4ifSwiaGludCI6IkNvc2luZSBnaXZlcyB0aGUgaG9yaXpvbnRhbCBjb21wb25lbnQ7IHNpbmUgZ2l2ZXMgdGhlIHZlcnRpY2FsIGNvbXBvbmVudC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgeiA9IDMgKyA0aiwgd2hpY2ggc3RhdGVtZW50IGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBUaGUgcmVhbCBwYXJ0IGlzIDQgYW5kIHRoZSBpbWFnaW5hcnkgcGFydCBpcyAzIiwiQi4gVGhlIHJlYWwgcGFydCBpcyAzIGFuZCB0aGUgaW1hZ2luYXJ5IHBhcnQgaXMgNCIsIkMuIFRoZSBpbWFnaW5hcnkgcGFydCBpcyA0aiIsIkQuIFRoZSBtYWduaXR1ZGUgaXMgNyJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkluIHogPSBhICsgamIsIHRoZSByZWFsIHBhcnQgaXMgYSBhbmQgdGhlIGltYWdpbmFyeSBwYXJ0IGlzIHRoZSBjb2VmZmljaWVudCBvZiBqLCB3aGljaCBpcyBiLiBIZXJlIHRoYXQgZ2l2ZXMgUmUoeikgPSAzIGFuZCBJbSh6KSA9IDQuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyByZXZlcnNlcyB0aGUgcm9sZXMgb2YgdGhlIHJlYWwgYW5kIGltYWdpbmFyeSBwYXJ0cy4iLCJDIjoiNGogaXMgdGhlIGltYWdpbmFyeSB0ZXJtIGluIHRoZSBleHByZXNzaW9uLCBidXQgdGhlIGltYWdpbmFyeSBwYXJ0IGlzIHRoZSBjb2VmZmljaWVudCA0LCBub3QgNGouIiwiRCI6IlRoZSBtYWduaXR1ZGUgaXMgc3FydCgzwrIgKyA0wrIpID0gc3FydCgyNSkgPSA1LCBub3QgNy4ifSwiaGludCI6IlNlcGFyYXRlIHRoZSBjb2VmZmljaWVudCBmcm9tIHRoZSBzeW1ib2wgai4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InNlcmllc19hbmRfYXBwcm94aW1hdGlvbnMiLCJsYWJlbCI6IlJlY29nbml6aW5nIGNvbW1vbiBwb3dlciBzZXJpZXMgYW5kIGFwcHJveGltYXRpb24gdXNlIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHNlcmllcyBiZWdpbnMgdGhlIE1hY2xhdXJpbiBleHBhbnNpb24gb2Ygc2luIHg/Iiwib3B0aW9ucyI6WyJBLiAxICsgeCArIHheMi8yISArIC4uLiIsIkIuIHggLSB4XjMvMyEgKyB4XjUvNSEgLSAuLi4iLCJDLiAxIC0geF4yLzIhICsgeF40LzQhIC0gLi4uIiwiRC4geCArIHheMiArIHheMyArIC4uLiJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBzaW5lIHNlcmllcyB1c2VzIG9kZCBwb3dlcnMgd2l0aCBhbHRlcm5hdGluZyBzaWduczogeCAtIHheMy8zISArIHheNS81ISAtIC4uLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgaXMgdGhlIHNlcmllcyBmb3IgZV54LiIsIkMiOiJUaGlzIGlzIHRoZSBzZXJpZXMgZm9yIGNvcyB4LiIsIkQiOiJUaGlzIGlzIG5vdCB0aGUgc3RhbmRhcmQgTWFjbGF1cmluIHNlcmllcyBmb3Igc2luIHguIn0sImhpbnQiOiJTaW5lIHN0YXJ0cyB3aXRoIHgsIG5vdCAxLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoZW4geCBpcyB2ZXJ5IHNtYWxsLCB3aGljaCBhcHByb3hpbWF0aW9uIGZyb20gdGhlIGFwcGVuZGl4IGlzIG1vc3QgYXBwcm9wcmlhdGUgZm9yICgxICsgeClebj8iLCJvcHRpb25zIjpbIkEuICgxICsgeClebiBcXGFwcHJveCAxICsgbngiLCJCLiAoMSArIHgpXm4gXFxhcHByb3ggMSArIHhebiIsIkMuICgxICsgeClebiBcXGFwcHJveCBueCIsIkQuICgxICsgeClebiBcXGFwcHJveCAxICsgbi94Il0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiRm9yIHx4fCBtdWNoIGxlc3MgdGhhbiAxLCB0aGUgYmlub21pYWwgZXhwcmVzc2lvbiBpcyBhcHByb3hpbWF0ZWQgYnkga2VlcGluZyBvbmx5IHRoZSBjb25zdGFudCB0ZXJtIGFuZCB0aGUgZmlyc3Qtb3JkZXIgdGVybTogMSArIG54LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoaXMgaWdub3JlcyB0aGUgc3RhbmRhcmQgZmlyc3Qtb3JkZXIgYmlub21pYWwgcGF0dGVybi4iLCJDIjoiVGhpcyBpbmNvcnJlY3RseSBkcm9wcyB0aGUgY29uc3RhbnQgdGVybSAxLiIsIkQiOiJUaGlzIGlzIG5vdCBhIHZhbGlkIHNtYWxsLXggYXBwcm94aW1hdGlvbi4ifSwiaGludCI6IktlZXAgdGhlIGNvbnN0YW50IHRlcm0gYW5kIHRoZSBmaXJzdC1vcmRlciB0ZXJtLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6InRyaWdfaWRlbnRpdGllcyIsImxhYmVsIjoiVXNpbmcgYmFzaWMgdHJpZ29ub21ldHJpYyBpZGVudGl0aWVzIGNvcnJlY3RseSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggaWRlbnRpdHkgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIHNpbl4yIHggKyBjb3NeMiB4ID0gMiIsIkIuIDIgc2luIHggY29zIHggPSBjb3MgMngiLCJDLiBzaW5eMiB4ICsgY29zXjIgeCA9IDEiLCJELiBjb3NeMiB4IC0gc2luXjIgeCA9IHNpbiAyeCJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlRoZSBmdW5kYW1lbnRhbCBQeXRoYWdvcmVhbiBpZGVudGl0eSBpcyBzaW7CsnggKyBjb3PCsnggPSAxLiBUaGlzIGhvbGRzIGZvciBldmVyeSB2YWx1ZSBvZiB4LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBzdW0gb2Ygc2luwrJ4IGFuZCBjb3PCsnggaXMgYWx3YXlzIDEsIG5vdCAyLiIsIkIiOiIyIHNpbiB4IGNvcyB4IGVxdWFscyBzaW4gMngsIG5vdCBjb3MgMnguIiwiRCI6ImNvc8KyeCDiiJIgc2luwrJ4IGVxdWFscyBjb3MgMngsIG5vdCBzaW4gMnguIn0sImhpbnQiOiJPbmUgaWRlbnRpdHkgaW52b2x2ZXMgYSBzdW0gb2Ygc3F1YXJlcywgYW5vdGhlciBpbnZvbHZlcyBhIGRvdWJsZSBhbmdsZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGZvcm11bGEgY29ycmVjdGx5IGV4cGFuZHMgc2luKHggKyB5KT8iLCJvcHRpb25zIjpbIkEuIHNpbiB4IGNvcyB5ICsgY29zIHggc2luIHkiLCJCLiBzaW4geCBzaW4geSArIGNvcyB4IGNvcyB5IiwiQy4gc2luIHggY29zIHkgLSBjb3MgeCBzaW4geSIsIkQuIGNvcyB4IGNvcyB5IC0gc2luIHggc2luIHkiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJUaGUgYW5nbGUtc3VtIGZvcm11bGEgZm9yIHNpbmUgaXMgc2luKHggKyB5KSA9IHNpbiB4IGNvcyB5ICsgY29zIHggc2luIHkuIEJvdGggdGVybXMgYXJlIGFkZGVkLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoaXMgbWl4ZXMgdGhlIHNpbmUgYW5kIGNvc2luZSBzdW0gZm9ybXVsYXMgaW5jb3JyZWN0bHkuIiwiQyI6IlRoZSBtaW51cyBzaWduIGJlbG9uZ3MgdG8gc2luKHgg4oiSIHkpLCBub3Qgc2luKHggKyB5KS4iLCJEIjoiVGhpcyBpcyB0aGUgY29zaW5lIGFuZ2xlLXN1bSBwYXR0ZXJuLCBub3QgdGhlIHNpbmUgcGF0dGVybi4ifSwiaGludCI6IkZvciBzaW5lIG9mIGEgc3VtLCBib3RoIHRlcm1zIGFyZSBhZGRlZC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJkZXJpdmF0aXZlc19pbnRlZ3JhbHNfYW5kX2VxdWF0aW9ucyIsImxhYmVsIjoiSGlnaC1mcmVxdWVuY3kgY2FsY3VsdXMgYW5kIGFsZ2VicmEgcmVmZXJlbmNlIGZvcm11bGFzIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3A0X3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGF0IGlzIHRoZSBkZXJpdmF0aXZlIG9mIGVee2J4fSB3aXRoIHJlc3BlY3QgdG8geD8iLCJvcHRpb25zIjpbIkEuIGVee2J4fSIsIkIuIGJ4IGVee2J4fSIsIkMuIGIgZV57Ynh9IiwiRC4gYl4yIGVee2J4fSJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IkJ5IHRoZSBjaGFpbiBydWxlLCBkaWZmZXJlbnRpYXRpbmcgZV57Ynh9IGdpdmVzIGIgZV57Ynh9LiBUaGUgaW5uZXIgZnVuY3Rpb24gYnggZGlmZmVyZW50aWF0ZXMgdG8gYiwgd2hpY2ggbXVsdGlwbGllcyB0aGUgb3JpZ2luYWwgZXhwb25lbnRpYWwuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBtaXNzZXMgdGhlIGlubmVyIGRlcml2YXRpdmUgYiBmcm9tIGRpZmZlcmVudGlhdGluZyBieC4iLCJCIjoiQW4gZXh0cmEgZmFjdG9yIHggaXMgaW50cm9kdWNlZCBpbmNvcnJlY3RseSDigJQgdGhpcyBpcyBub3QgaG93IHRoZSBjaGFpbiBydWxlIHdvcmtzIGhlcmUuIiwiRCI6Ik9ubHkgb25lIGZhY3RvciBvZiBiIGFwcGVhcnMgZnJvbSBkaWZmZXJlbnRpYXRpbmcgYnggb25jZTsgYsKyIHdvdWxkIHJlcXVpcmUgZGlmZmVyZW50aWF0aW5nIHR3aWNlLiJ9LCJoaW50IjoiRGlmZmVyZW50aWF0ZSB0aGUgaW5zaWRlIGJ4IGZpcnN0LCB0aGVuIG11bHRpcGx5LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDRfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIGFuIGVxdWF0aW9uIGlzIGFscmVhZHkgaW4gdGhlIGZvcm0gYXheMiArIGJ4ICsgYyA9IDAsIHdoaWNoIHJlZmVyZW5jZSBmb3JtdWxhIHNob3VsZCB5b3UgcmVhY2ggZm9yIGZpcnN0PyIsIm9wdGlvbnMiOlsiQS4gTCdIb3BpdGFsJ3MgcnVsZSIsIkIuIFF1YWRyYXRpYyBmb3JtdWxhIiwiQy4gSW50ZWdyYXRpb24gYnkgcGFydHMiLCJELiBNYWNsYXVyaW4gc2VyaWVzIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIHF1YWRyYXRpYyBmb3JtdWxhIGlzIHRoZSBzdGFuZGFyZCBkaXJlY3QgbWV0aG9kIGZvciBlcXVhdGlvbnMgb2YgdGhlIGZvcm0gYXjCsiArIGJ4ICsgYyA9IDAuIFJlY29nbml6aW5nIHRoZSBmb3JtIGltbWVkaWF0ZWx5IHRlbGxzIHlvdSB3aGljaCB0b29sIHRvIHVzZS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJMJ0hvcGl0YWwncyBydWxlIGlzIGZvciBldmFsdWF0aW5nIGluZGV0ZXJtaW5hdGUgbGltaXRzLCBub3QgZm9yIHNvbHZpbmcgcXVhZHJhdGljIGVxdWF0aW9ucy4iLCJDIjoiSW50ZWdyYXRpb24gYnkgcGFydHMgaXMgYW4gaW50ZWdyYXRpb24gdGVjaG5pcXVlLCBub3QgYW4gYWxnZWJyYWljIGVxdWF0aW9uIHNvbHZlci4iLCJEIjoiTWFjbGF1cmluIHNlcmllcyBhcHByb3hpbWF0ZXMgZnVuY3Rpb24gdmFsdWVzIG5lYXIgeCA9IDA7IGl0IGRvZXMgbm90IGRpcmVjdGx5IHNvbHZlIGZvciByb290cyBvZiBhIHF1YWRyYXRpYy4ifSwiaGludCI6Ik1hdGNoIHRoZSBlcXVhdGlvbiBmb3JtIHRvIHRoZSBzb2x2aW5nIHRvb2wuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfV19" style="display:none;"></div>%%KC_END%%
