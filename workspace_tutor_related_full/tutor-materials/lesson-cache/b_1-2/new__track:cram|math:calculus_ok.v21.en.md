%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJBZ2VudCBBIEpTT04gZmFpbGVkLCBzbyBrZWVwIG9uZSB0ZXh0Ym9vayBmaWd1cmUgYXMgdGhlIGZhY3R1YWwgYW5jaG9yIGFuZCBhZGQgb25lIGdlbmVyYXRlZCBncHRpbWFnZTIgdGVhY2hpbmcgdmlzdWFsIHRvIHByZXNlcnZlIGNsYXJpdHkuIiwiY3JhbSI6IlVzZSB0aGUgdmlzdWFsIHRvIHJlY29nbml6ZSB0aGUgZXhhbSBwYXR0ZXJuIHF1aWNrbHkuIiwic3RhbmRhcmQiOiJVc2UgdGhlIHZpc3VhbCB0byBjbGFyaWZ5IHRoZSBjb3JlIGNvbmNlcHQgd2l0aCBhIHNpbmdsZSBjbGVhciBwYXRoLiIsInRvcF9zY29yZSI6IlVzZSB0aGUgdmlzdWFsIHRvIGhpZ2hsaWdodCBzdWJ0bGUgZGlzdGluY3Rpb25zLCB0cmFwcywgb3IgdmFyaWFudHMuIn0=" style="display:none;"></div>%%KC_END%%
## Overview

> **Objective:** Understand how complex numbers are represented graphically, how to perform arithmetic on them, and why this matters for solving real-world engineering problems.

Complex numbers are not just abstract symbols — they are points on a 2D plane. Section B.1-2 introduces the **algebra of complex numbers**: how to add, subtract, multiply, and divide them, and how to move between rectangular form \(a + jb\) and polar form \(re^{j\theta}\). The textbook uses a memorable analogy: just as a traveler might pass through Country Y to reach a destination in Country X more efficiently, engineers use complex numbers as a powerful shortcut. After this section, you will be able to manipulate complex numbers fluently and recognize which form is most useful for a given problem.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgdGV4dGJvb2sgZmlndXJlIGZvciBmYXN0IHBhdHRlcm4gcmVjb2duaXRpb24g4oCUIGxvY2F0ZSBcXChhXFwpLCBcXChiXFwpLCBcXChyXFwpLCBhbmQgXFwoXFx0aGV0YVxcKSBpbW1lZGlhdGVseS4iLCJzdGFuZGFyZCI6IlVzZSB0aGlzIHRleHRib29rIGZpZ3VyZSB0byBhbmNob3IgdGhlIGNvcmUgY29uY2VwdDogYSBjb21wbGV4IG51bWJlciBcXCh6ID0gYSArIGpiXFwpIGlzIGEgcG9pbnQgaW4gdGhlIDJEIGNvbXBsZXggcGxhbmUgd2l0aCBtYWduaXR1ZGUgXFwoclxcKSBhbmQgYW5nbGUgXFwoXFx0aGV0YVxcKS4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhpcyB0ZXh0Ym9vayBmaWd1cmUgdG8gY29tcGFyZSBcXCh6XFwpIGFuZCBpdHMgY29uanVnYXRlIFxcKHpeKlxcKSwgbm90aW5nIHRoZSByZWZsZWN0aW9uIGFjcm9zcyB0aGUgcmVhbCBheGlzIGFuZCBob3cgdGhlIHNpZ24gb2YgXFwoXFx0aGV0YVxcKSBmbGlwcy4ifQ==" style="display:none;"></div>%%KC_END%%
![Fig. B.2](/figures/page-005-fig__b_2-1.png)
*Fig. B.2 shows the complex plane with \(z = a + jb\) plotted as a point \((a, b)\), its polar coordinates \(r\) and \(\theta\), and its conjugate \(z^* = a - jb\) reflected across the real axis — this single diagram anchors every algebraic operation in this section.*

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="comparison_anchor" data-visual-use-b64="eyJjcmFtIjoiU2NhbiB0aGUgdHdvLWNvbHVtbiBsYXlvdXQ6IGxlZnQgPSByZWN0YW5ndWxhciBmb3JtLCByaWdodCA9IHBvbGFyIGZvcm0uIE1lbW9yaXplIHRoZSBjb252ZXJzaW9uIGFycm93cy4iLCJzdGFuZGFyZCI6IkZvbGxvdyB0aGUgc2luZ2xlIHJlYWRpbmcgcGF0aCB0b3AtdG8tYm90dG9tOiBkZWZpbml0aW9uIOKGkiBjb252ZXJzaW9uIGZvcm11bGFzIOKGkiBjb25qdWdhdGUgcnVsZSDihpIgb25lIHdvcmtlZCBleGFtcGxlLiIsInRvcF9zY29yZSI6IkZvY3VzIG9uIHRoZSBjb25qdWdhdGUgYm94IGFuZCB0aGUgbWFnbml0dWRlIGZvcm11bGEgXFwoenpeKiA9IHx6fF4yXFwpIOKAlCB0aGVzZSBhcmUgdGhlIG1vc3QgY29tbW9uIGV4YW0gdHJhcHMuIn0=" style="display:none;"></div>%%KC_END%%
*🎨 Rectangular form \(z = a + jb\) and polar form \(z = re^{j\theta}\) are two descriptions of the same point; the conjugate \(z^*\) flips the sign of \(\theta\), and the product \(zz^* = |z|^2\) is always real.*
![Illustration](/generated/gptimage2-1777214178672-6292.png)

## Core Idea

Every complex number has **two equivalent forms**:

$$
z = a + jb \quad \text{(rectangular)} \qquad z = re^{j\theta} \quad \text{(polar/exponential)}
$$

where \(r = \sqrt{a^2 + b^2}\) is the **magnitude** and \(\theta = \arctan(b/a)\) is the **angle** (phase). These are not two different numbers — they are two languages describing the same point on the complex plane.

### KEY ALGEBRAIC OPERATIONS

- **Addition/Subtraction:** easiest in rectangular form — add real parts and imaginary parts separately.
- **Multiplication/Division:** easiest in polar form — multiply magnitudes and add angles.
- **Conjugate:** flip the sign of the imaginary part: \(z^* = a - jb = re^{-j\theta}\).

### EXAM TRAP

The **imaginary part** of \(z = a + jb\) is \(b\), not \(jb\). The product \(zz^* = |z|^2\) is always a **real** number — this identity appears constantly in simplification problems.

**Example:** For \(z = 3 + j4\): \(r = 5\), \(\theta = \arctan(4/3) \approx 53.1°\), and \(zz^* = 25\).

---
**📌 Key Takeaways**
- A complex number \(z = a + jb\) is a point on the 2D complex plane with magnitude \(r\) and angle \(\theta\).
- Rectangular form is best for addition; polar form \(re^{j\theta}\) is best for multiplication and division.
- The conjugate \(z^*\) flips the imaginary sign, and \(zz^* = |z|^2\) is always real — a key exam identity.

*In the next section we will apply these algebraic tools to Euler's formula and explore how exponential form connects complex numbers to sinusoidal signals.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NCwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo0LCJtYXgiOjV9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImJfMV8yX2FsZ2VicmFfb2ZfY29tcGxleF9udW1iZXJzX2NvcmUiLCJsYWJlbCI6IkIuMS0yIEFsZ2VicmEgb2YgQ29tcGxleCBOdW1iZXJzIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoiY29yZV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggc3RhdGVtZW50IGJlc3QgY2FwdHVyZXMgdGhlIG1haW4gbGVhcm5pbmcgZ29hbCBvZiBCLjEtMiBBbGdlYnJhIG9mIENvbXBsZXggTnVtYmVycz8iLCJvcHRpb25zIjpbIkEuIE1lbW9yaXplIHRoZSBmaW5hbCByZXN1bHQgd2l0aG91dCBjb25uZWN0aW5nIGl0IHRvIHRoZSB2aXN1YWwgb3Igc3RydWN0dXJhbCBtZWFuaW5nIiwiQi4gVW5kZXJzdGFuZCB0aGUgY29yZSBkZWZpbml0aW9uLCB0aGUgdmlzdWFsL3N0cnVjdHVyYWwgbWVhbmluZywgYW5kIGhvdyB0aGUgaWRlYSBhcHBlYXJzIGluIGV4YW0gcXVlc3Rpb25zIiwiQy4gVHJlYXQgdGhlIHRvcGljIGFzIHB1cmUgc3ltYm9sIG1hbmlwdWxhdGlvbiB3aXRoIG5vIGNvbmNlcHR1YWwgc3RydWN0dXJlIiwiRC4gRm9jdXMgb25seSBvbiB0ZXJtaW5vbG9neSBiZWNhdXNlIHRoZSBleGFtIG5ldmVyIHRlc3RzIGludGVycHJldGF0aW9uIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiU3Ryb25nIHVuZGVyc3RhbmRpbmcgaW4gdGhpcyBzZWN0aW9uIG1lYW5zIGNvbm5lY3RpbmcgdGhlIGRlZmluaXRpb24sIHRoZSBzdHJ1Y3R1cmUvdmlzdWFsIG1lYW5pbmcsIGFuZCB0aGUgZXhhbS1mYWNpbmcgaW50ZXJwcmV0YXRpb24uIEtub3dpbmcgdGhhdCBcXCh6ID0gYSArIGpiID0gcmVee2pcXHRoZXRhfVxcKSBpcyBhIHBvaW50IG9uIHRoZSBjb21wbGV4IHBsYW5lIOKAlCBhbmQga25vd2luZyB3aGVuIHRvIHVzZSBlYWNoIGZvcm0g4oCUIGlzIHRoZSBjb3JlIHNraWxsLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6Ik1lbW9yaXphdGlvbiBhbG9uZSB1c3VhbGx5IGJyZWFrcyBvbiB2YXJpYW50cyBhbmQgdHJhcCBxdWVzdGlvbnMg4oCUIGZvciBleGFtcGxlLCBjb25mdXNpbmcgdGhlIGltYWdpbmFyeSBwYXJ0IFxcKGJcXCkgd2l0aCB0aGUgaW1hZ2luYXJ5IHRlcm0gXFwoamJcXCkuIiwiQyI6IlRoZSBzZWN0aW9uIGlzIG1lYW50IHRvIGJlIHVuZGVyc3Rvb2Qgc3RydWN0dXJhbGx5OiByZWN0YW5ndWxhciBmb3JtIGZvciBhZGRpdGlvbiwgcG9sYXIgZm9ybSBmb3IgbXVsdGlwbGljYXRpb24sIGNvbmp1Z2F0ZSBmb3Igc2ltcGxpZmljYXRpb24uIiwiRCI6IkludGVycHJldGF0aW9uIGlzIGV4YWN0bHkgd2hhdCBtYW55IGV4YW0gcXVlc3Rpb25zIHByb2JlIOKAlCBmb3IgaW5zdGFuY2UsIGNvbXB1dGluZyBcXCh6el4qXFwpIG9yIGlkZW50aWZ5aW5nIFxcKFxcdGV4dHtJbX0oeilcXCkgY29ycmVjdGx5LiJ9LCJoaW50IjoiUGljayB0aGUgb3B0aW9uIHRoYXQgY29tYmluZXMgbWVhbmluZywgcmVwcmVzZW50YXRpb24sIGFuZCBleGFtIHVzZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoiY29yZV9xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiSW4gMS0yIHNlbnRlbmNlcywgZXhwbGFpbiB0aGUgY29yZSByZWxhdGlvbnNoaXAgYSBzdHVkZW50IHNob3VsZCBub3RpY2UgZmlyc3Qgd2hlbiBsZWFybmluZyBCLjEtMiBBbGdlYnJhIG9mIENvbXBsZXggTnVtYmVycy4iLCJpZGVhbF9hbnN3ZXIiOiJUaGUgY2VudHJhbCByZWxhdGlvbnNoaXAgaXMgdGhhdCByZWN0YW5ndWxhciBmb3JtIFxcKHogPSBhICsgamJcXCkgYW5kIHBvbGFyIGZvcm0gXFwoeiA9IHJlXntqXFx0aGV0YX1cXCkgZGVzY3JpYmUgdGhlIHNhbWUgcG9pbnQgb24gdGhlIGNvbXBsZXggcGxhbmUsIGNvbm5lY3RlZCBieSBcXChyID0gXFxzcXJ0e2FeMiArIGJeMn1cXCkgYW5kIFxcKFxcdGhldGEgPSBcXGFyY3RhbihiL2EpXFwpLiBDaG9vc2luZyB0aGUgcmlnaHQgZm9ybSDigJQgcmVjdGFuZ3VsYXIgZm9yIGFkZGl0aW9uLCBwb2xhciBmb3IgbXVsdGlwbGljYXRpb24g4oCUIGlzIHRoZSBrZXkgcHJvYmxlbS1zb2x2aW5nIHNraWxsIHRlc3RlZCBvbiBleGFtcy4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IG1lbnRpb24gdGhlIGVxdWl2YWxlbmNlIG9mIHJlY3Rhbmd1bGFyIGFuZCBwb2xhciBmb3JtcyIsIk11c3QgY29ubmVjdCB0byBhIHZpc3VhbCBvciBzeW1ib2xpYyByZXByZXNlbnRhdGlvbiAoZS5nLiwgdGhlIGNvbXBsZXggcGxhbmUsIHRoZSBjb252ZXJzaW9uIGZvcm11bGFzKSIsIk11c3QgbWVudGlvbiBleGFtIGludGVycHJldGF0aW9uIG9yIHByb2JsZW0tc29sdmluZyB1c2UgKGUuZy4sIHdoaWNoIGZvcm0gdG8gdXNlIGZvciB3aGljaCBvcGVyYXRpb24pIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCBzZWVzIHRoZSBtYWluIHRocmVhZCBvZiB0aGUgc2VjdGlvbiDigJQgdGhlIGR1YWwgcmVwcmVzZW50YXRpb24gb2YgYSBjb21wbGV4IG51bWJlciDigJQgaW5zdGVhZCBvZiBpc29sYXRlZCBmYWN0cyBsaWtlIGluZGl2aWR1YWwgZm9ybXVsYXMuIiwiaGludCI6IlN0YXJ0IHdpdGggJ3RoZSBtYWluIHJlbGF0aW9uc2hpcCBpcy4uLicgYW5kIHRoZW4gc2F5IHdoZW4gZWFjaCBmb3JtIGlzIG1vc3QgdXNlZnVsLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
