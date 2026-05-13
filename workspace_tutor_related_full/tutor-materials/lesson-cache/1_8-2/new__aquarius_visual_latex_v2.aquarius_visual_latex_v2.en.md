%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJVc2UgdGhlIHRleHRib29rIGZpZ3VyZXMgYXMgdGhlIG1haW4gdmlzdWFsIGFuY2hvcnMgYmVjYXVzZSB0aGUgc2VjdGlvbiBpcyBidWlsdCBhcm91bmQgcmVjb2duaXppbmcgbWVjaGFuaWNhbCBlbGVtZW50cywgZHJhd2luZyBmcmVlLWJvZHkgZGlhZ3JhbXMsIGFuZCBtYXRjaGluZyB0aGUgZXhhY3Qgbm90YXRpb24gdXNlZCBpbiB0aGUgZXhhbXBsZXMuIFVzZSBMYVRlWC1uYXRpdmUgZm9ybXVsYSBibG9ja3MgZm9yIHRoZSB0ZXJtaW5hbCBsYXdzIGFuZCBkaWZmZXJlbnRpYWwgZXF1YXRpb25zLiBEbyBub3QgdXNlIEdQVEltYWdlMiBiZWNhdXNlIHRoZSBhdmFpbGFibGUgdGV4dGJvb2sgZmlndXJlcyBhbHJlYWR5IHByb3ZpZGUgdGhlIGNhbm9uaWNhbCBkaWFncmFtcyBmb3IgdGhpcyBzZWN0aW9uLiIsImNyYW0iOiJVc2UgdGhlIGZpZ3VyZXMgdG8gcXVpY2tseSBpZGVudGlmeSBlbGVtZW50IHR5cGUsIGZvcmNlIGRpcmVjdGlvbiwgYW5kIHRoZSBkaWZmZXJlbnRpYWwtZXF1YXRpb24gcGF0dGVybi4iLCJzdGFuZGFyZCI6IlVzZSBlYWNoIGZpZ3VyZSBiZXNpZGUgb25lIHJlcHJlc2VudGF0aXZlIGZvcm11bGEgc28gc3R1ZGVudHMgY29ubmVjdCB0aGUgcGh5c2ljYWwgZGlhZ3JhbSB0byB0aGUgbW9kZWwuIiwidG9wX3Njb3JlIjoiVXNlIHRoZSBkaWFncmFtcyB0byBub3RpY2Ugc2lnbiBjb252ZW50aW9ucywgZXF1aXZhbGVudCBwaHlzaWNhbCBsYXlvdXRzLCBhbmQgdHJhbnNsYXRpb25hbC10by1yb3RhdGlvbmFsIGFuYWxvZ2llcy4ifQ==" style="display:none;"></div>%%KC_END%%
# 1.8 Mechanical Systems

> **Section Objective:** Model simple mechanical systems by turning forces, torques, displacements, and rotations into differential equations.

---

**Concepts In This Section:**

- Translational elements
- Free-body diagrams
- Mass-spring-damper input-output equation
- Rotational mechanical analogy

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiTWVtb3JpemUgd2hpY2ggZWxlbWVudCBjb25uZWN0cyBmb3JjZSB0byBhY2NlbGVyYXRpb24sIGRpc3BsYWNlbWVudCwgb3IgdmVsb2NpdHkuIiwic3RhbmRhcmQiOiJVc2UgdGhlIHRocmVlIHBhbmVscyB0byBhdHRhY2ggZWFjaCBwaHlzaWNhbCBlbGVtZW50IHRvIGl0cyB0ZXJtaW5hbCBlcXVhdGlvbi4iLCJ0b3Bfc2NvcmUiOiJOb3RpY2UgdGhhdCB0aGUgc2FtZSBpbnB1dC1vdXRwdXQgbm90YXRpb24gY2FuIHJlcHJlc2VudCBkaWZmZXJlbnQgcGh5c2ljYWwgbGF3cyBkZXBlbmRpbmcgb24gdGhlIGVsZW1lbnQuIn0=" style="display:none;"></div>%%KC_END%%
![Figure 1.36](/figures/page-115-fig__1_36-1.png)
*## 1. Translational Elements

Mass, spring, and dashpot are the three basic one-dimensional mechanical modeling blocks.*
<div class="lesson-figure-description">Figure 1.36 contains three panels showing the fundamental translational mechanical elements. Panel (a) shows a mass M: an applied force x(t) acts on the mass and produces displacement output y(t), so force is proportional to acceleration. Panel (b) shows a spring with stiffness K: the force through the spring depends on the relative displacement y(t), giving the law x(t) = Ky(t). Panel (c) shows a linear dashpot with damping coefficient B: the force through the dashpot depends on velocity, giving x(t) = B·ẏ(t). Exams often begin by asking students to identify which terminal law each element contributes before writing the system equation.</div>

$$x_M(t) = M\ddot{y}(t)$$
***Mass law:** Force equals mass times acceleration. Use this whenever a mass element appears in the diagram.*

$$x_K(t) = K y(t)$$
***Spring law:** Force equals stiffness times displacement. Use this for any spring element.*

$$x_B(t) = B\dot{y}(t)$$
**Dashpot law:** Force equals damping coefficient times velocity. Use this for any dashpot element.

---

In all three laws, \(x(t)\) is the force applied through the element and \(y(t)\) is the displacement of the moving point. The derivatives follow the operator notation \(Dy(t) = \dot{y}(t)\) and \(D^2 y(t) = \ddot{y}(t)\).

**Minimal example:** A dashpot with coefficient \(B = 4\) and velocity \(\dot{y}(t)\) contributes a force of \(4\dot{y}(t)\) to the force balance.

### EXAM TRIGGER

A diagram showing M, K, and B all attached to the same moving point — you must write one terminal law per element and then sum them.

### COMMON MISTAKE

Using \(Ky(t)\) for a dashpot or \(B\dot{y}(t)\) for a spring. Each element has exactly one law; do not swap the derivative orders.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="example_support" data-visual-use-b64="eyJjcmFtIjoiRm9jdXMgb24gdGhlIGZyZWUtYm9keSBkaWFncmFtIGFuZCBtZW1vcml6ZSB0aGUgc2lnbiBwYXR0ZXJuOiBpbnB1dCBmb3JjZSBwb3NpdGl2ZSwgcmVzdG9yaW5nIGZvcmNlcyBuZWdhdGl2ZS4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgZmlndXJlIGFzIHRoZSB3b3JrZWQgZXhhbXBsZSBmb3IgZGVyaXZpbmcgdGhlIG1hc3Mtc3ByaW5nLWRhbXBlciBlcXVhdGlvbi4iLCJ0b3Bfc2NvcmUiOiJDb21wYXJlIHBhbmVscyAoYSkgYW5kIChiKSB0byBzZWUgdGhhdCBkaWZmZXJlbnQgcGh5c2ljYWwgbGF5b3V0cyBjYW4gcHJvZHVjZSB0aGUgc2FtZSBtYXRoZW1hdGljYWwgbW9kZWwuIn0=" style="display:none;"></div>%%KC_END%%
![Fig. 1.37](/figures/page-115-fig__1_37-2.png)
*## 2. Free-Body Diagram for a Mass-Spring-Damper System

Fig. 1.37 turns the physical system into forces acting on the mass.*
<div class="lesson-figure-description">Fig. 1.37 shows a translational mass-spring-damper system in three sub-panels. In panels (a) and (b), mass M is connected to a wall by spring K and dashpot B in two physically different but mathematically equivalent layouts — one with a separate dashpot on a frictionless surface, one with viscous damping at the base. Panel (c) is the free-body diagram: the applied input force x(t) acts to the right (positive direction), while the spring restoring force Ky(t) and the damping force Bẏ(t) both act to the left (opposing the motion). Exam note: the most common mistake is assigning the spring or damper force the same sign as the applied input force, which reverses the physics of the restoring mechanism.</div>

$$\left(MD^2 + BD + K\right)y(t) = x(t)$$
This is the input-output equation for the mass-spring-damper system (Example 1.18).

**Derivation logic (Newton's second law on the free-body diagram):**

Net force on mass = mass × acceleration:

$$M\ddot{y}(t) = x(t) - B\dot{y}(t) - Ky(t)$$

Move all \(y(t)\) terms to the left side and write in operator form:

$$MD^2 y(t) + BD\,y(t) + Ky(t) = x(t)$$

Factor out \(y(t)\) to get the displayed operator equation.

**Quick check:** If \(B = 0\), the dashpot vanishes and the equation reduces to \((MD^2 + K)y(t) = x(t)\), an undamped mass-spring system.

### EXAM TRIGGER

A mass connected to a spring and dashpot with force input \(x(t)\) and displacement output \(y(t)\).

### COMMON MISTAKE

\(D^2\) acts on \(y(t)\), not on \(M\). The operator \(MD^2\) means \(M\) times the second derivative of \(y(t)\).

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiUmVjb2duaXplIHRvcnF1ZSBpbnB1dCwgYW5ndWxhciBkaXNwbGFjZW1lbnQgb3V0cHV0LCBhbmQgcm90YXRpb25hbCBkYW1waW5nIGFzIHRoZSBzYW1lIG1vZGVsaW5nIHBhdHRlcm4gYXMgZm9yY2Ugc3lzdGVtcy4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgYWlycGxhbmUgcm9sbCBleGFtcGxlIHRvIHRyYW5zZmVyIHRyYW5zbGF0aW9uYWwgbW9kZWxpbmcgaWRlYXMgdG8gcm90YXRpb25hbCBtb3Rpb24uIiwidG9wX3Njb3JlIjoiVHJhY2sgd2hpY2ggYW5nbGUgaXMgaW5wdXQgZGVmbGVjdGlvbiBhbmQgd2hpY2ggYW5nbGUgaXMgb3V0cHV0IHJvbGw7IGRvIG5vdCBjb25mdXNlIM64KHQpIHdpdGggz4YodCkuIn0=" style="display:none;"></div>%%KC_END%%
![Figure 1.38](/figures/page-117-figure_1_38-1.png)
*## 3. Rotational Mechanical Systems

The airplane roll example models torque, angular position, angular velocity, and angular acceleration.*
<div class="lesson-figure-description">Figure 1.38 shows a perspective diagram of an airplane with its attitude-control surfaces labeled. The ailerons on both wings, the elevators on the horizontal tail, and the rudder on the vertical tail are all identified. The roll axis runs along the fuselage (x-axis), and the roll angle φ(t) is indicated by a curved arrow near the nose. Aileron deflection angles θ(t) are marked at both wings, showing how the control-surface motion drives rolling about the longitudinal axis. The aileron deflection θ(t) is the control input that generates a torque, while the roll angle φ(t) is the output motion. Exam note: rotational systems use the same structural model as translational systems — force becomes torque and mass becomes moment of inertia.</div>

$$J\ddot{\phi}(t) = c\,\theta(t) - B\dot{\phi}(t)$$
This is the rotational equation of motion for the airplane roll model.

**Symbol meanings:**

- \(J\) — moment of inertia about the roll axis
- \(\phi(t)\) — roll angle (output); \(\ddot{\phi}(t)\) — angular acceleration
- \(\theta(t)\) — aileron deflection angle (input)
- \(c\,\theta(t)\) — torque generated by the ailerons, proportional to deflection
- \(B\dot{\phi}(t)\) — damping torque from air friction, proportional to roll rate

**Translational analogy:**

| Translational | Rotational |
|---|---|
| Mass \(M\) | Moment of inertia \(J\) |
| Force \(x(t)\) | Torque \(c\,\theta(t)\) |
| Velocity damping \(B\dot{y}(t)\) | Angular-velocity damping \(B\dot{\phi}(t)\) |

### EXAM TRIGGER

A rotating body with torque input and angular displacement output — write \(J\ddot{\phi}\) on the left, then sum the applied and opposing torques on the right.

### COMMON MISTAKE

Treating \(\theta(t)\) and \(\phi(t)\) as the same angle. \(\theta(t)\) is the commanded aileron deflection (input); \(\phi(t)\) is the resulting roll angle (output). They are different physical quantities.

---
**📌 Key Takeaways**
- Translational terminal laws: \(x_M(t)=M\ddot{y}(t)\) (mass), \(x_K(t)=Ky(t)\) (spring), \(x_B(t)=B\dot{y}(t)\) (dashpot) — each element has a unique derivative order.
- Mass-spring-damper input-output equation: \((MD^2+BD+K)y(t)=x(t)\) — derived by applying Newton's second law to the free-body diagram with restoring forces negative.
- Airplane roll equation: \(J\ddot{\phi}(t)=c\,\theta(t)-B\dot{\phi}(t)\) — aileron deflection \(\theta(t)\) is the input; roll angle \(\phi(t)\) is the output.
- Force-to-torque analogy: replace mass \(M\) with inertia \(J\), linear force with torque, and linear velocity with angular velocity — the equation structure is identical.

*Next, use these input-output equations to analyze system behavior from the differential equation itself.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InRyYW5zbGF0aW9uYWxfZWxlbWVudF9sYXdzIiwibGFiZWwiOiJNYXNzLCBzcHJpbmcsIGFuZCBkYXNocG90IHRlcm1pbmFsIGxhd3MiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgdHJhbnNsYXRpb25hbCBkYXNocG90IGhhcyBkYW1waW5nIGNvZWZmaWNpZW50IFxcKEJcXCkgYW5kIHJlbGF0aXZlIHZlbG9jaXR5IFxcKFxcZG90e3l9KHQpXFwpLiBXaGljaCBmb3JjZSBsYXcgbWF0Y2hlcyB0aGUgZGFzaHBvdD8iLCJvcHRpb25zIjpbIkEuIFxcKHgodCk9TVxcZGRvdHt5fSh0KVxcKSIsIkIuIFxcKHgodCk9S3kodClcXCkiLCJDLiBcXCh4KHQpPUJcXGRvdHt5fSh0KVxcKSIsIkQuIFxcKHgodCk9QkReMnkodClcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJBIGxpbmVhciBkYXNocG90IGNyZWF0ZXMgZm9yY2UgcHJvcG9ydGlvbmFsIHRvIHJlbGF0aXZlIHZlbG9jaXR5LCBzbyBpdHMgbGF3IGlzIFxcKHgodCk9QlxcZG90e3l9KHQpPUJEeSh0KVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGF0IGlzIHRoZSBtYXNzIGxhdzsgbWFzcyBjb25uZWN0cyBmb3JjZSB0byBhY2NlbGVyYXRpb24uIiwiQiI6IlRoYXQgaXMgdGhlIHNwcmluZyBsYXc7IHNwcmluZyBmb3JjZSBkZXBlbmRzIG9uIGRpc3BsYWNlbWVudC4iLCJEIjoiVGhlIGRhc2hwb3QgdXNlcyBmaXJzdCBkZXJpdmF0aXZlIFxcKERcXCksIG5vdCBzZWNvbmQgZGVyaXZhdGl2ZSBcXChEXjJcXCkuIn0sImhpbnQiOiJEYXNocG90cyByZXNpc3QgdmVsb2NpdHksIG5vdCBkaXNwbGFjZW1lbnQgb3IgYWNjZWxlcmF0aW9uLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiVXNpbmcgRmlndXJlIDEuMzYsIHdoaWNoIG1hdGNoaW5nIGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBNYXNzIOKGkiBkaXNwbGFjZW1lbnQgbGF3LCBzcHJpbmcg4oaSIHZlbG9jaXR5IGxhdywgZGFzaHBvdCDihpIgYWNjZWxlcmF0aW9uIGxhdyIsIkIuIE1hc3Mg4oaSIGFjY2VsZXJhdGlvbiBsYXcsIHNwcmluZyDihpIgZGlzcGxhY2VtZW50IGxhdywgZGFzaHBvdCDihpIgdmVsb2NpdHkgbGF3IiwiQy4gTWFzcyDihpIgdmVsb2NpdHkgbGF3LCBzcHJpbmcg4oaSIGFjY2VsZXJhdGlvbiBsYXcsIGRhc2hwb3Qg4oaSIGRpc3BsYWNlbWVudCBsYXciLCJELiBBbGwgdGhyZWUgZWxlbWVudHMgdXNlIHRoZSBzYW1lIGZvcmNlIGxhdyJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSB0aHJlZSBiYXNpYyB0cmFuc2xhdGlvbmFsIGVsZW1lbnRzIGFyZSBkaXN0aW5ndWlzaGVkIGJ5IHdoYXQgZm9yY2UgaXMgcHJvcG9ydGlvbmFsIHRvOiBhY2NlbGVyYXRpb24gZm9yIG1hc3MsIGRpc3BsYWNlbWVudCBmb3Igc3ByaW5nLCBhbmQgdmVsb2NpdHkgZm9yIGRhc2hwb3QuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyByZXZlcnNlcyBhbGwgdGhyZWUgcGh5c2ljYWwgbWVhbmluZ3MuIiwiQyI6IlRoaXMgYXNzaWducyB0aGUgZGVyaXZhdGl2ZSBvcmRlciBpbmNvcnJlY3RseS4iLCJEIjoiVGhlIHdob2xlIHBvaW50IG9mIHRoZSBtb2RlbCBpcyB0aGF0IGVhY2ggZWxlbWVudCBjb250cmlidXRlcyBhIGRpZmZlcmVudCBsYXcuIn0sImhpbnQiOiJBc2sgd2hhdCBwaHlzaWNhbCBxdWFudGl0eSBlYWNoIGVsZW1lbnQgcmVzaXN0cyBvciBzdG9yZXMuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImJvb2tfZmlndXJlOkZpZ3VyZSAxLjM2Iiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJtYXNzX3NwcmluZ19kYW1wZXJfZXF1YXRpb24iLCJsYWJlbCI6IkZyZWUtYm9keSBkaWFncmFtIGFuZCBtYXNzLXNwcmluZy1kYW1wZXIgaW5wdXQtb3V0cHV0IGVxdWF0aW9uIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJbiB0aGUgRmlndXJlIDEuMzcgZnJlZS1ib2R5IGRpYWdyYW0sIHRoZSBhcHBsaWVkIGZvcmNlIFxcKHgodClcXCkgYWN0cyBwb3NpdGl2ZS4gV2hpY2ggcGFpciBvZiBmb3JjZXMgb3Bwb3NlcyB0aGUgbWFzcyBkaXNwbGFjZW1lbnQgYW5kIHZlbG9jaXR5PyIsIm9wdGlvbnMiOlsiQS4gXFwoS3kodClcXCkgYW5kIFxcKEJcXGRvdHt5fSh0KVxcKSIsIkIuIFxcKE1cXGRkb3R7eX0odClcXCkgYW5kIFxcKHgodClcXCkiLCJDLiBcXChLXFxkb3R7eX0odClcXCkgYW5kIFxcKEJ5KHQpXFwpIiwiRC4gXFwoTUR5KHQpXFwpIGFuZCBcXChLRF4yeSh0KVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlRoZSBzcHJpbmcgZm9yY2UgXFwoS3kodClcXCkgb3Bwb3NlcyBkaXNwbGFjZW1lbnQsIGFuZCB0aGUgZGFzaHBvdCBmb3JjZSBcXChCXFxkb3R7eX0odClcXCkgb3Bwb3NlcyB2ZWxvY2l0eS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGUgbWFzcyB0ZXJtIGlzIHRoZSBpbmVydGlhbCByZXNwb25zZSwgYW5kIFxcKHgodClcXCkgaXMgdGhlIGFwcGxpZWQgaW5wdXQgZm9yY2UuIiwiQyI6IlRoaXMgc3dhcHMgdGhlIHNwcmluZyBhbmQgZGFzaHBvdCBkZXBlbmRlbmNpZXMuIiwiRCI6IlRoZXNlIGRlcml2YXRpdmUgb3JkZXJzIGRvIG5vdCBtYXRjaCB0aGUgcGh5c2ljYWwgZWxlbWVudHMuIn0sImhpbnQiOiJMb29rIGZvciB0aGUgcmVzdG9yaW5nIGZvcmNlcyBkcmF3biBvcHBvc2l0ZSB0byBcXCh4KHQpXFwpLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJib29rX2ZpZ3VyZTpGaWcuIDEuMzciLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciB0aGUgbWFzcy1zcHJpbmctZGFtcGVyIHN5c3RlbSBpbiBFeGFtcGxlIDEuMTgsIHdoaWNoIGlucHV0LW91dHB1dCBlcXVhdGlvbiBpcyBjb3JyZWN0IGFmdGVyIGNvbGxlY3RpbmcgdGVybXM/Iiwib3B0aW9ucyI6WyJBLiBcXCgoTUReMitCRCtLKXkodCk9eCh0KVxcKSIsIkIuIFxcKChNK0IrSyl5KHQpPXgodClcXCkiLCJDLiBcXCgoTUQrQkReMitLKXkodCk9eCh0KVxcKSIsIkQuIFxcKChNRF4yLUJELUspeSh0KT14KHQpXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiTWFzcyBjb250cmlidXRlcyBcXChNRF4yeSh0KVxcKSwgZGFtcGluZyBjb250cmlidXRlcyBcXChCRHkodClcXCksIGFuZCB0aGUgc3ByaW5nIGNvbnRyaWJ1dGVzIFxcKEt5KHQpXFwpLCBzbyB0aGUgY29sbGVjdGVkIGVxdWF0aW9uIGlzIFxcKChNRF4yK0JEK0speSh0KT14KHQpXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoaXMgaWdub3JlcyBkZXJpdmF0aXZlIG9yZGVyLCB3aGljaCBpcyBlc3NlbnRpYWwgaW4gZGlmZmVyZW50aWFsIGVxdWF0aW9ucy4iLCJDIjoiVGhpcyBzd2FwcyB0aGUgZGVyaXZhdGl2ZSBvcmRlcnMgZm9yIG1hc3MgYW5kIGRhbXBpbmcuIiwiRCI6IkFmdGVyIG1vdmluZyByZXN0b3JpbmctZm9yY2UgdGVybXMgdG8gdGhlIGxlZnQgc2lkZSwgdGhlaXIgY29lZmZpY2llbnRzIGJlY29tZSBwb3NpdGl2ZS4ifSwiaGludCI6Ik1hc3MgdXNlcyBcXChEXjJcXCksIGRhc2hwb3QgdXNlcyBcXChEXFwpLCBzcHJpbmcgdXNlcyBubyBkZXJpdmF0aXZlLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMl9xMyIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQSBzdHVkZW50IHdyaXRlcyBcXChNXFxkZG90e3l9KHQpPUJcXGRvdHt5fSh0KStLeSh0KSt4KHQpXFwpIGZvciBGaWd1cmUgMS4zNy4gRXhwbGFpbiB0aGUgc2lnbiBtaXN0YWtlLiIsImlkZWFsX2Fuc3dlciI6IlRoZSBzcHJpbmcgYW5kIGRhc2hwb3QgZm9yY2VzIG9wcG9zZSB0aGUgcG9zaXRpdmUgZGlzcGxhY2VtZW50IGFuZCB2ZWxvY2l0eSBvZiB0aGUgbWFzcywgc28gdGhleSBzaG91bGQgYXBwZWFyIGFzIFxcKC1LeSh0KVxcKSBhbmQgXFwoLUJcXGRvdHt5fSh0KVxcKSBpbiB0aGUgZm9yY2UgYmFsYW5jZS4gVGhlIGNvcnJlY3QgTmV3dG9uIGVxdWF0aW9uIGlzIFxcKE1cXGRkb3R7eX0odCk9LUJcXGRvdHt5fSh0KS1LeSh0KSt4KHQpXFwpLCB3aGljaCBjb2xsZWN0cyB0byBcXCgoTUReMitCRCtLKXkodCk9eCh0KVxcKS4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IHN0YXRlIHRoYXQgc3ByaW5nIGFuZCBkYXNocG90IGZvcmNlcyBvcHBvc2UgdGhlIG1vdGlvbiIsIk11c3QgaWRlbnRpZnkgdGhlIHNpZ25zIG9mIFxcKEt5KHQpXFwpIGFuZCBcXChCXFxkb3R7eX0odClcXCkgYXMgbmVnYXRpdmUgaW4gdGhlIGZvcmNlIGJhbGFuY2UiLCJNdXN0IGNvbm5lY3QgdGhlIGNvcnJlY3RlZCBiYWxhbmNlIHRvIHRoZSBjb2xsZWN0ZWQgaW5wdXQtb3V0cHV0IGZvcm0iXSwiZXhwbGFuYXRpb24iOiJUaGlzIHRlc3RzIHdoZXRoZXIgdGhlIHN0dWRlbnQgdW5kZXJzdGFuZHMgdGhlIGZyZWUtYm9keSBkaWFncmFtIHJhdGhlciB0aGFuIG9ubHkgbWVtb3JpemluZyB0aGUgZmluYWwgZXF1YXRpb24uIiwiaGludCI6Ikxvb2sgYXQgdGhlIGZvcmNlIGFycm93cyBpbiB0aGUgZnJlZS1ib2R5IGRpYWdyYW06IHJlc3RvcmluZyBmb3JjZXMgcG9pbnQgb3Bwb3NpdGUgdG8gdGhlIGFwcGxpZWQgaW5wdXQuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImJvb2tfZmlndXJlOkZpZy4gMS4zNyIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoicm90YXRpb25hbF9tZWNoYW5pY2FsX2FuYWxvZ3kiLCJsYWJlbCI6IlJvdGF0aW9uYWwgbW90aW9uIGFuYWxvZ3kgYW5kIGFpcnBsYW5lIHJvbGwgZXF1YXRpb24iLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJbiB0aGUgYWlycGxhbmUgcm9sbCBtb2RlbCwgd2hpY2ggc3RhdGVtZW50IGNvcnJlY3RseSBpZGVudGlmaWVzIHRoZSBpbnB1dCBhbmQgb3V0cHV0IHZhcmlhYmxlcz8iLCJvcHRpb25zIjpbIkEuIElucHV0OiByb2xsIGFuZ2xlIFxcKFxccGhpKHQpXFwpOyBvdXRwdXQ6IGFpbGVyb24gZGVmbGVjdGlvbiBcXChcXHRoZXRhKHQpXFwpIiwiQi4gSW5wdXQ6IGFpbGVyb24gZGVmbGVjdGlvbiBcXChcXHRoZXRhKHQpXFwpOyBvdXRwdXQ6IHJvbGwgYW5nbGUgXFwoXFxwaGkodClcXCkiLCJDLiBJbnB1dDogZGFtcGluZyBjb2VmZmljaWVudCBcXChCXFwpOyBvdXRwdXQ6IG1vbWVudCBvZiBpbmVydGlhIFxcKEpcXCkiLCJELiBJbnB1dDogYW5ndWxhciBhY2NlbGVyYXRpb24gXFwoXFxkZG90e1xccGhpfSh0KVxcKTsgb3V0cHV0OiB0b3JxdWUgY29uc3RhbnQgXFwoY1xcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBhaWxlcm9uIGRlZmxlY3Rpb24gXFwoXFx0aGV0YSh0KVxcKSBnZW5lcmF0ZXMgdG9ycXVlLCBhbmQgdGhlIGFpcnBsYW5lIHJvbGwgYW5nbGUgXFwoXFxwaGkodClcXCkgaXMgdGhlIHJlc3VsdGluZyBvdXRwdXQgbW90aW9uLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgcmV2ZXJzZXMgdGhlIGNvbnRyb2wgaW5wdXQgYW5kIHRoZSBtb3Rpb24gb3V0cHV0LiIsIkMiOiJcXChCXFwpIGFuZCBcXChKXFwpIGFyZSBzeXN0ZW0gcGFyYW1ldGVycywgbm90IHNpZ25hbCBpbnB1dCBhbmQgb3V0cHV0LiIsIkQiOiJBbmd1bGFyIGFjY2VsZXJhdGlvbiBpcyBwYXJ0IG9mIHRoZSByZXNwb25zZSBlcXVhdGlvbiwgbm90IHRoZSBjb21tYW5kZWQgaW5wdXQuIn0sImhpbnQiOiJUaGUgY29udHJvbCBzdXJmYWNlIGlzIHRoZSBjYXVzZTsgdGhlIHJvbGwgYW5nbGUgaXMgdGhlIGVmZmVjdC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoiYm9va19maWd1cmU6RmlndXJlIDEuMzgiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCByb3RhdGlvbmFsIGVxdWF0aW9uIG1hdGNoZXMgdGhlIGFpcnBsYW5lIHJvbGwgbW9kZWwgZGVzY3JpYmVkIGluIHRoZSBzZWN0aW9uPyIsIm9wdGlvbnMiOlsiQS4gXFwoSlxcZGRvdHtcXHBoaX0odCk9Y1xcLFxcdGhldGEodCktQlxcZG90e1xccGhpfSh0KVxcKSIsIkIuIFxcKE1cXGRkb3R7eX0odCk9Y1xcLFxcdGhldGEodCktQlxcZG90e3l9KHQpXFwpIiwiQy4gXFwoSlxcZG90e1xccGhpfSh0KT1jXFwsXFxkb3R7XFx0aGV0YX0odCktQlxccGhpKHQpXFwpIiwiRC4gXFwoS1xccGhpKHQpPWNcXCxcXHRoZXRhKHQpK0JcXGRvdHtcXHBoaX0odClcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJNb21lbnQgb2YgaW5lcnRpYSB0aW1lcyBhbmd1bGFyIGFjY2VsZXJhdGlvbiBlcXVhbHMgdGhlIGFwcGxpZWQgYWlsZXJvbiB0b3JxdWUgbWludXMgdGhlIGRhbXBpbmcgdG9ycXVlOiBcXChKXFxkZG90e1xccGhpfSh0KT1jXFwsXFx0aGV0YSh0KS1CXFxkb3R7XFxwaGl9KHQpXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoaXMgbWl4ZXMgdHJhbnNsYXRpb25hbCBtYXNzIG5vdGF0aW9uIFxcKE1cXCkgd2l0aCByb3RhdGlvbmFsIHZhcmlhYmxlcy4iLCJDIjoiVGhlIGluZXJ0aWEgdGVybSBtdXN0IHVzZSBhbmd1bGFyIGFjY2VsZXJhdGlvbiBcXChcXGRkb3R7XFxwaGl9XFwpLCBub3QgYW5ndWxhciB2ZWxvY2l0eSBcXChcXGRvdHtcXHBoaX1cXCkuIiwiRCI6IlRoZXJlIGlzIG5vIHRvcnNpb25hbCBzcHJpbmcgdGVybSBcXChLXFxwaGkodClcXCkgaW4gdGhlIGFpcnBsYW5lIHJvbGwgZXF1YXRpb24gc2hvd24gaGVyZS4ifSwiaGludCI6IlJvdGF0aW9uYWwgaW5lcnRpYSB1c2VzIFxcKEpcXGRkb3R7XFxwaGl9KHQpXFwpIG9uIHRoZSBsZWZ0IHNpZGUuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfV19" style="display:none;"></div>%%KC_END%%
