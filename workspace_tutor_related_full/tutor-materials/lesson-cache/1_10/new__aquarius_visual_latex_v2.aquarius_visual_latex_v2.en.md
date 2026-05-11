%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJVc2UgdGV4dGJvb2sgZmlndXJlcyBiZWNhdXNlIHRoaXMgc2VjdGlvbiBpcyBleGFtLWZhY2luZyBhbmQgdGhlIGJvb2sgYWxyZWFkeSBwcm92aWRlcyB0aGUgY2Fub25pY2FsIGNpcmN1aXQgYW5kIGJsb2NrLWRpYWdyYW0gcmVwcmVzZW50YXRpb25zIHN0dWRlbnRzIGFyZSBleHBlY3RlZCB0byByZWNvZ25pemUuIFVzZSBMYVRlWC1uYXRpdmUgZm9ybXVsYXMgZm9yIHRoZSBzdGF0ZSB2ZWN0b3IsIHN0YXRlIGVxdWF0aW9ucywgYW5kIG91dHB1dCBlcXVhdGlvbnMgYmVjYXVzZSB0aGUgY29yZSBpZGVhcyBhcmUgc3ltYm9saWMgYW5kIHN0cnVjdHVyYWwuIERvIG5vdCB1c2UgR1BUSW1hZ2UyIGJlY2F1c2UgcmVhZHktbWFkZSB0ZXh0Ym9vayBmaWd1cmVzIGFyZSBhdmFpbGFibGUgYW5kIGFjY3VyYXRlLiIsImNyYW0iOiJVc2UgdGhlIGZpZ3VyZXMgdG8gaWRlbnRpZnkgc3RhdGUgdmFyaWFibGVzLCBpbnB1dHMsIG91dHB1dHMsIGNvbnRyb2xsYWJpbGl0eSwgYW5kIG9ic2VydmFiaWxpdHkgcXVpY2tseS4iLCJzdGFuZGFyZCI6IlVzZSBlYWNoIGZpZ3VyZSBiZXNpZGUgb25lIHJlcHJlc2VudGF0aXZlIGZvcm11bGEgc28gdGhlIHN0dWRlbnQgY29ubmVjdHMgY2lyY3VpdCBzdHJ1Y3R1cmUgdG8gc3RhdGUtc3BhY2UgZXF1YXRpb25zLiIsInRvcF9zY29yZSI6IlVzZSB0aGUgZmlndXJlcyB0byBub3RpY2UgaGlkZGVuIGludGVybmFsIG1vZGVzLCBtaXNzaW5nIGlucHV0IHBhdGhzLCBhbmQgb3V0cHV0cyB0aGF0IGZhaWwgdG8gcmV2ZWFsIGEgc3RhdGUuIn0=" style="display:none;"></div>%%KC_END%%
# 1.10 Internal Description: The State-Space Description

> **Section Objective:** Learn how a system can be described internally by state variables, state equations, and output equations.

## Concepts In This Section

- State variables
- State equations
- Output equations
- First-order system representation
- Controllability
- Observability

## 1. State Variables: The Internal Description

A **state variable** is an internal quantity that stores the system's memory — it captures what the system "remembers" from its past inputs.

For circuits, **capacitor voltage (or charge)** and **inductor current (or flux)** are the natural state variables because these elements store energy. Once you know their values at any moment, you can compute every other voltage and current in the circuit.

**Representative example:** In the textbook network (Fig. 1.43), \(q_1(t)\) is tied to the capacitor and \(q_2(t)\) is tied to the inductor. Solving \(q_1(t)\) and \(q_2(t)\) lets you compute all remaining branch voltages and currents.

### EXAM TRIGGER

When a circuit contains capacitors or inductors, first look for state variables at the energy-storage elements.

## 2. State equations and output equations

This column vector collects all state variables into one compact object.

- \(N\) = system order (number of independent energy-storage elements)
- \(q_k(t)\) = the \(k\)th state variable
- \(\mathbf{q}(t)\) = the internal memory of the system at time \(t\)

**When to use it:** Whenever several first-order state equations need to be written compactly in matrix form.

**Common misuse:** Do not list every circuit voltage or current as a state. Choose the **smallest independent set** that determines the rest — typically one variable per energy-storage element.

$$\mathbf{q}(t)=\begin{bmatrix}q_1(t)\\q_2(t)\\\vdots\\q_N(t)\end{bmatrix}$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiUG9pbnQgZGlyZWN0bHkgdG8gdGhlIGNhcGFjaXRvciBhbmQgaW5kdWN0b3IgbGFiZWxzIGFzIHRoZSBmYXN0ZXN0IHdheSB0byBjaG9vc2Ugc3RhdGVzLiIsInN0YW5kYXJkIjoiVXNlIHRoZSBjaXJjdWl0IHRvIGNvbm5lY3QgcTEgYW5kIHEyIHRvIHBoeXNpY2FsIGVuZXJneS1zdG9yYWdlIGVsZW1lbnRzIGJlZm9yZSB3cml0aW5nIGVxdWF0aW9ucy4iLCJ0b3Bfc2NvcmUiOiJBc2sgd2hpY2ggbGFiZWxlZCB2b2x0YWdlcyBhbmQgY3VycmVudHMgYXJlIG91dHB1dHMgcmF0aGVyIHRoYW4gaW5kZXBlbmRlbnQgc3RhdGVzLiJ9" style="display:none;"></div>%%KC_END%%
![Fig. 1.43](/figures/page-122-fig__1_43-1.png)
*Fig. 1.43: This circuit shows a capacitor and an inductor whose associated variables \(q_1(t)\) and \(q_2(t)\) are chosen as the natural state variables.*
<div class="lesson-figure-description">The circuit has an input source \(x(t)\) feeding a top rail through a 1 Ω resistor. A 1 F capacitor connects to the bottom reference node with charge \(q_1(t)\) labeled near it, and a 2 H inductor sits in the top path with the inductor-related state \(q_2(t)\) labeled nearby. Additional elements include a 2 Ω shunt resistor and a 5 Ω resistor at the right. Students should notice that the state variables \(q_1\) and \(q_2\) are attached directly to the energy-storage elements (capacitor and inductor), while all other branch voltages and currents — such as \(v_1(t)\), \(v_2(t)\), \(i_1(t)\) — can be computed once the states are known.</div>

## 2. State Equations and Output Equations

The state-space description has two layers:

**State equations** describe how the internal variables evolve over time — they capture the system's dynamics.

**Output equations** describe how the measured or requested signals are computed from the current state and input — they translate internal behavior into observable quantities.

### HOW THIS DIFFERS FROM INPUT-OUTPUT DESCRIPTIONS

An \(N\)th-order system can be written as one \(N\)th-order differential equation (input-output form), or equivalently as \(N\) **simultaneous first-order** differential equations (state-space form). State-space exposes the internal structure explicitly.

### QUICK CHECK

- If an equation contains \(\dot{q}\), it is usually part of the **state equation** — it describes how a state changes.
- If an equation computes \(y(t)\), it is usually an **output equation** — it reads off the observable result.

$$\dot{\mathbf{q}}(t)=\mathbf{A}\mathbf{q}(t)+\mathbf{B}x(t)$$
*This is the standard linear **state equation** for a single-input system.

- \(\dot{\mathbf{q}}(t)\) = time derivative of the state vector (rate of change of internal memory)
- \(\mathbf{A}\) = internal dynamics matrix (how states interact with each other)
- \(\mathbf{B}\) = input-coupling matrix (how the input drives the states)
- \(x(t)\) = the system input

**When to use it:** Write this equation when the system's future state depends linearly on its present state and input.

**Exam trigger:** Simultaneous first-order differential equations → state equation form.

**Common misuse:** Do not treat this as the output equation. It predicts how the state **evolves**, not what is measured.*

$$y(t)=\mathbf{C}\mathbf{q}(t)+D x(t)$$
*This is the standard linear **output equation**.

- \(y(t)\) = the observed (measured) output
- \(\mathbf{C}\) = state-to-output mapping matrix (which states contribute to the output)
- \(D\) = direct input-to-output term (feedthrough)
- \(x(t)\) = the input

**When to use it:** After solving the state equations for \(\mathbf{q}(t)\), substitute into this equation to compute the requested output.

**Exam trigger:** A problem asks for a voltage, current, or response after the states are known.

**Common misuse:** Solving only the output equation without first solving or understanding the state dynamics — the output depends on the states, so states must be found first.*

$$\dot{\mathbf{q}}(t)=\begin{bmatrix}-1.5&-1\\0.5&-2.5\end{bmatrix}\mathbf{q}(t)+\begin{bmatrix}1\\0\end{bmatrix}x(t)\quad\text{(1.34)}$$
*This is the compact matrix form of the two simultaneous first-order state equations from **Example 1.20**.

Expanding row by row:

- **Row 1:** \(\dot{q}_1 = -1.5q_1 - q_2 + x\) — describes how the capacitor-related state changes
- **Row 2:** \(\dot{q}_2 = 0.5q_1 - 2.5q_2\) — describes how the inductor-related state changes (note: input does not directly drive \(q_2\))

The \(\mathbf{A}\) matrix entries are the coupling coefficients between states. The \(\mathbf{B}\) vector shows that only \(q_1\) is directly driven by the input.

**Common mistake:** Reading the matrix entries as output values. They are coefficients that control **state change**, not the output itself.*

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="comparison_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIGFycm93IGNvbm5lY3Rpdml0eSB0byBkZWNpZGUgcXVpY2tseSB3aGV0aGVyIGFuIGludGVybmFsIHN1YnN5c3RlbSBpcyBjb250cm9sbGFibGUgb3Igb2JzZXJ2YWJsZS4iLCJzdGFuZGFyZCI6IkNvbXBhcmUgdGhlIHR3byBibG9jayBkaWFncmFtcyB0byBzZWUgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBpbmZsdWVuY2luZyBhIHN0YXRlIGFuZCBtZWFzdXJpbmcgYSBzdGF0ZS4iLCJ0b3Bfc2NvcmUiOiJMb29rIGZvciBoaWRkZW4gaW50ZXJuYWwgcGF0aHMgdGhhdCBhZmZlY3QgdGhlIHN5c3RlbSBidXQgYXJlIG1pc3NpbmcgZnJvbSBlaXRoZXIgdGhlIGlucHV0IHBhdGggb3Igb3V0cHV0IHBhdGguIn0=" style="display:none;"></div>%%KC_END%%
![Figure 1.42](/figures/page-121-figure_1_42-1.png)
*Figure 1.42: These two block diagrams contrast an uncontrollable system structure (a) and an unobservable system structure (b) — notice where the arrows from \(x(t)\) and toward \(y(t)\) are missing.*
<div class="lesson-figure-description">Panel (a) shows two subsystems S1 and S2 both feeding a summing junction before the output \(y(t)\), but the input \(x(t)\) does not reach one of the internal subsystems through a direct path — this missing input arrow illustrates uncontrollability, where one internal mode cannot be driven by the input. Panel (b) shows the input \(x(t)\) branching to both S1 and S2, but the output \(y(t)\) is taken only from the S1 path — the S2 subsystem affects internal state evolution but its behavior is invisible at the output, illustrating unobservability. Students should focus on the arrows from \(x(t)\) into internal blocks (controllability) and arrows from internal blocks toward \(y(t)\) (observability).</div>

$$\dot{q}(t)=-0.5q(t)\quad\text{(1.36)}$$
*This is the state equation from **Example 1.21**, describing a circuit that is **neither controllable nor observable**.

- \(q(t)\) = the capacitor state variable
- \(\dot{q}(t)\) = its rate of change

**Key observation:** The input \(x(t)\) does **not appear** in this equation. No matter what input is applied, it cannot influence this state — the state evolves entirely on its own according to \(-0.5q(t)\).

**Exam trigger:** If a state equation has no input term affecting a particular state, suspect **lack of controllability** for that state.

**Common misuse:** Assuming a system is controllable simply because an input source exists somewhere in the circuit. The input must actually have a path that influences the state — existence alone is not enough.*

---
**📌 Key Takeaways**
- **State variables** store the system's internal memory. For circuits, choose capacitor charge/voltage and inductor current/flux as natural state variables. Collect them into the state vector \(\mathbf{q}(t)=[q_1(t)\ q_2(t)\ \cdots\ q_N(t)]^T\), where \(N\) is the system order.
- **State equations** describe internal evolution: \(\dot{\mathbf{q}}(t)=\mathbf{A}\mathbf{q}(t)+\mathbf{B}x(t)\). Matrix \(\mathbf{A}\) governs how states interact; matrix \(\mathbf{B}\) governs how the input drives the states. An \(N\)th-order system becomes \(N\) simultaneous first-order equations.
- **Output equations** compute measured signals after the states are known: \(y(t)=\mathbf{C}\mathbf{q}(t)+Dx(t)\). Always solve the state equations first, then apply the output equation.
- **Example (1.34):** \(\dot{\mathbf{q}}=\begin{bmatrix}-1.5&-1\\0.5&-2.5\end{bmatrix}\mathbf{q}+\begin{bmatrix}1\\0\end{bmatrix}x\) expands to \(\dot{q}_1=-1.5q_1-q_2+x\) and \(\dot{q}_2=0.5q_1-2.5q_2\). Matrix entries are state-coupling coefficients, not outputs.
- **Controllability and observability — Example (1.36):** \(\dot{q}(t)=-0.5q(t)\) contains no input term, so the input cannot drive that state (uncontrollable). If an internal state has no path to the output, it is unobservable. An input source or output terminal alone does not guarantee controllability or observability — the structural paths must exist.

*Next, you will use state-space thinking to model and analyze more complex systems efficiently.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InN0YXRlX3ZhcmlhYmxlX2RlZmluaXRpb24iLCJsYWJlbCI6IlN0YXRlIHZhcmlhYmxlcyBhcyBpbnRlcm5hbCBtZW1vcnkiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkluIGEgY2lyY3VpdCwgd2hpY2ggY29tcG9uZW50cyBtb3N0IGRpcmVjdGx5IHN1Z2dlc3QgbmF0dXJhbCBzdGF0ZSB2YXJpYWJsZXM/Iiwib3B0aW9ucyI6WyJBLiBSZXNpc3RvcnMgb25seSIsIkIuIENhcGFjaXRvcnMgYW5kIGluZHVjdG9ycyIsIkMuIElkZWFsIHdpcmVzIG9ubHkiLCJELiBPdXRwdXQgdGVybWluYWxzIG9ubHkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJDYXBhY2l0b3JzIGFuZCBpbmR1Y3RvcnMgc3RvcmUgZW5lcmd5LCBzbyB0aGVpciB2b2x0YWdlLCBjaGFyZ2UsIGN1cnJlbnQsIG9yIGZsdXggb2Z0ZW4gcmVwcmVzZW50IHN5c3RlbSBtZW1vcnkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiUmVzaXN0b3JzIGRpc3NpcGF0ZSBlbmVyZ3kgYnV0IGRvIG5vdCBzdG9yZSBpbmRlcGVuZGVudCBtZW1vcnkuIiwiQyI6IklkZWFsIHdpcmVzIGltcG9zZSBjb25uZWN0aW9ucyBidXQgZG8gbm90IHN0b3JlIGVuZXJneS4iLCJEIjoiT3V0cHV0IHRlcm1pbmFscyBzaG93IHdoYXQgaXMgbWVhc3VyZWQsIG5vdCBuZWNlc3NhcmlseSB3aGF0IHN0b3JlcyB0aGUgc3lzdGVtIHN0YXRlLiJ9LCJoaW50IjoiTG9vayBmb3IgZW5lcmd5LXN0b3JhZ2UgZWxlbWVudHMuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBjaXJjdWl0IGhhcyB0d28gaW5kZXBlbmRlbnQgZW5lcmd5LXN0b3JhZ2UgZWxlbWVudHMuIEluIHRoZSB1c3VhbCBzdGF0ZS1zcGFjZSBhcHByb2FjaCwgd2hhdCBzaG91bGQgeW91IGV4cGVjdD8iLCJvcHRpb25zIjpbIkEuIE9uZSBzZWNvbmQtb3JkZXIgaW5wdXQtb3V0cHV0IGVxdWF0aW9uIGNhbiBvZnRlbiBiZSByZXBsYWNlZCBieSB0d28gZmlyc3Qtb3JkZXIgc3RhdGUgZXF1YXRpb25zLiIsIkIuIFR3byBpbmRlcGVuZGVudCBzdG9yYWdlIGVsZW1lbnRzIG1lYW4gdGhlIG91dHB1dCBtdXN0IGJlIHplcm8uIiwiQy4gVGhlIHN0YXRlIHZlY3RvciBtdXN0IGluY2x1ZGUgZXZlcnkgcmVzaXN0b3IgY3VycmVudC4iLCJELiBTdGF0ZS1zcGFjZSBjYW5ub3QgYmUgdXNlZCBmb3IgY2lyY3VpdHMgd2l0aCBtb3JlIHRoYW4gb25lIHN0b3JhZ2UgZWxlbWVudC4iXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJBbiBcXChOXFwpdGgtb3JkZXIgc3lzdGVtIGlzIHJlcHJlc2VudGVkIGJ5IFxcKE5cXCkgc2ltdWx0YW5lb3VzIGZpcnN0LW9yZGVyIHN0YXRlIGVxdWF0aW9ucy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJTdG9yYWdlIGVsZW1lbnRzIGRvIG5vdCBpbXBseSB6ZXJvIG91dHB1dC4iLCJDIjoiVGhlIHN0YXRlIHZlY3RvciBzaG91bGQgYmUgYSBtaW5pbWFsIGluZGVwZW5kZW50IHNldCwgbm90IGV2ZXJ5IHBvc3NpYmxlIHNpZ25hbC4iLCJEIjoiU3RhdGUtc3BhY2UgaXMgZXNwZWNpYWxseSB1c2VmdWwgZm9yIGhpZ2hlci1vcmRlciBzeXN0ZW1zLiJ9LCJoaW50IjoiQ29ubmVjdCBudW1iZXIgb2YgaW5kZXBlbmRlbnQgc3RhdGVzIHRvIHN5c3RlbSBvcmRlci4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InN0YXRlX3ZzX291dHB1dF9lcXVhdGlvbnMiLCJsYWJlbCI6IlN0YXRlIGVxdWF0aW9ucyB2ZXJzdXMgb3V0cHV0IGVxdWF0aW9ucyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggZXF1YXRpb24gaXMgdGhlIHN0YXRlIGVxdWF0aW9uPyIsIm9wdGlvbnMiOlsiQS4gXFwoXFxkb3R7XFxtYXRoYmZ7cX19KHQpPVxcbWF0aGJme0F9XFxtYXRoYmZ7cX0odCkrXFxtYXRoYmZ7Qn14KHQpXFwpIiwiQi4gXFwoeSh0KT1cXG1hdGhiZntDfVxcbWF0aGJme3F9KHQpK0R4KHQpXFwpIiwiQy4gXFwoUj1WL0lcXCkiLCJELiBcXChwKHQpPXYodClpKHQpXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGhlIHN0YXRlIGVxdWF0aW9uIGNvbnRhaW5zIFxcKFxcZG90e1xcbWF0aGJme3F9fSh0KVxcKSwgc28gaXQgZGVzY3JpYmVzIGhvdyB0aGUgaW50ZXJuYWwgc3RhdGUgY2hhbmdlcyBvdmVyIHRpbWUuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhpcyBpcyB0aGUgb3V0cHV0IGVxdWF0aW9uOyBpdCBjb21wdXRlcyB0aGUgb2JzZXJ2ZWQgb3V0cHV0LiIsIkMiOiJUaGlzIGlzIE9obSdzIGxhdywgbm90IGEgc3RhdGUtc3BhY2UgZXZvbHV0aW9uIGVxdWF0aW9uLiIsIkQiOiJUaGlzIGlzIGluc3RhbnRhbmVvdXMgcG93ZXIsIG5vdCBhIHN0YXRlIGVxdWF0aW9uLiJ9LCJoaW50IjoiTG9vayBmb3IgdGhlIGRlcml2YXRpdmUgb2YgdGhlIHN0YXRlIHZlY3Rvci4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3AyX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJBZnRlciBzb2x2aW5nIHRoZSBzdGF0ZSBlcXVhdGlvbnMgZm9yIFxcKFxcbWF0aGJme3F9KHQpXFwpLCB3aGF0IGRvIG91dHB1dCBlcXVhdGlvbnMgbGV0IHlvdSBkbz8iLCJvcHRpb25zIjpbIkEuIENvbXB1dGUgcmVxdWVzdGVkIHNpZ25hbHMgc3VjaCBhcyB2b2x0YWdlcywgY3VycmVudHMsIG9yIFxcKHkodClcXCkiLCJCLiBFbGltaW5hdGUgYWxsIHN0YXRlIHZhcmlhYmxlcyBwZXJtYW5lbnRseSIsIkMuIFByb3ZlIHRoZSBpbnB1dCBpcyBhbHdheXMgemVybyIsIkQuIENvbnZlcnQgZXZlcnkgbm9ubGluZWFyIHN5c3RlbSBpbnRvIGEgbGluZWFyIG9uZSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6Ik91dHB1dCBlcXVhdGlvbnMgZXhwcmVzcyBtZWFzdXJlZCBvciByZXF1ZXN0ZWQgc2lnbmFscyBpbiB0ZXJtcyBvZiB0aGUgc3RhdGUgYW5kIGlucHV0LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlN0YXRlIHZhcmlhYmxlcyBhcmUgc3RpbGwgY2VudHJhbDsgb3V0cHV0IGVxdWF0aW9ucyB1c2UgdGhlbS4iLCJDIjoiVGhlIG91dHB1dCBlcXVhdGlvbiBkb2VzIG5vdCBmb3JjZSB0aGUgaW5wdXQgdG8gYmUgemVyby4iLCJEIjoiU3RhdGUtc3BhY2UgY2FuIGRlc2NyaWJlIG5vbmxpbmVhciBzeXN0ZW1zLCBidXQgdGhlIG91dHB1dCBlcXVhdGlvbiBkb2VzIG5vdCBhdXRvbWF0aWNhbGx5IGxpbmVhcml6ZSB0aGVtLiJ9LCJoaW50IjoiU3RhdGUgZmlyc3QsIG91dHB1dCBzZWNvbmQuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJleGFtcGxlXzEzNF9pbnRlcnByZXRhdGlvbiIsImxhYmVsIjoiUmVhZGluZyB0aGUgbWF0cml4IHN0YXRlIGVxdWF0aW9uIGluIEV4YW1wbGUgMS4yMCIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciBFeGFtcGxlICgxLjM0KSwgXFwoXFxkb3R7XFxtYXRoYmZ7cX19PVxcYmVnaW57Ym1hdHJpeH0tMS41Ji0xXFxcXDAuNSYtMi41XFxlbmR7Ym1hdHJpeH1cXG1hdGhiZntxfStcXGJlZ2lue2JtYXRyaXh9MVxcXFwwXFxlbmR7Ym1hdHJpeH14XFwpLiBXaGljaCBzdGF0ZSBlcXVhdGlvbiBpcyByZXByZXNlbnRlZCBieSB0aGUgc2Vjb25kIHJvdz8iLCJvcHRpb25zIjpbIkEuIFxcKFxcZG90e3F9XzI9MC41cV8xLTIuNXFfMlxcKSIsIkIuIFxcKFxcZG90e3F9XzE9MC41cV8xLTIuNXFfMlxcKSIsIkMuIFxcKHFfMj0tMS41cV8xLXFfMit4XFwpIiwiRC4gXFwoeT0wLjVxXzEtMi41cV8yXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGhlIHNlY29uZCByb3cgb2YgdGhlIG1hdHJpeCBlcXVhdGlvbiBkZXRlcm1pbmVzIFxcKFxcZG90e3F9XzJcXCk6IG11bHRpcGx5IFxcKFswLjVcXCAtMi41XVxcKSBieSBcXChbcV8xXFwgcV8yXV5UXFwpLCBhbmQgdGhlIHNlY29uZCBpbnB1dCBjb2VmZmljaWVudCBpcyB6ZXJvLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoZSBzZWNvbmQgcm93IGdpdmVzIFxcKFxcZG90e3F9XzJcXCksIG5vdCBcXChcXGRvdHtxfV8xXFwpLiIsIkMiOiJUaGlzIG1peGVzIHRoZSBmaXJzdC1yb3cgZXF1YXRpb24gd2l0aCB0aGUgc3RhdGUgdmFyaWFibGUgaXRzZWxmLiIsIkQiOiJUaGlzIGlzIGEgc3RhdGUgZGVyaXZhdGl2ZSBlcXVhdGlvbiwgbm90IGFuIG91dHB1dCBlcXVhdGlvbi4ifSwiaGludCI6Ik1hdGNoIHJvdyAyIHdpdGggXFwoXFxkb3R7cX1fMlxcKS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJjb250cm9sbGFiaWxpdHlfb2JzZXJ2YWJpbGl0eSIsImxhYmVsIjoiQ29udHJvbGxhYmlsaXR5IGFuZCBvYnNlcnZhYmlsaXR5IGZyb20gc3RydWN0dXJlIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDRfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6Ik9ic2VydmUgYSBibG9jayBkaWFncmFtIHdoZXJlIGFuIGludGVybmFsIHN1YnN5c3RlbSBhZmZlY3RzIHRoZSBzdGF0ZSBldm9sdXRpb24gYnV0IG5vIGFycm93IGZyb20gdGhhdCBzdWJzeXN0ZW0gcmVhY2hlcyB0aGUgbWVhc3VyZWQgb3V0cHV0IFxcKHkodClcXCkuIFdoYXQgaXNzdWUgc2hvdWxkIHlvdSBzdXNwZWN0PyIsIm9wdGlvbnMiOlsiQS4gTGFjayBvZiBvYnNlcnZhYmlsaXR5IiwiQi4gTGFjayBvZiBsaW5lYXJpdHkgb25seSIsIkMuIFRoZSBzeXN0ZW0gbXVzdCBiZSBtZW1vcnlsZXNzIiwiRC4gVGhlIHN0YXRlIGVxdWF0aW9uIGlzIHVubmVjZXNzYXJ5Il0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiSWYgYW4gaW50ZXJuYWwgc3RhdGUgY2Fubm90IGJlIGRldGVjdGVkIGZyb20gdGhlIG91dHB1dCwgdGhlIHN5c3RlbSBoYXMgYW4gb2JzZXJ2YWJpbGl0eSBwcm9ibGVtLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6Ik9ic2VydmFiaWxpdHkgaXMgYWJvdXQgd2hldGhlciBpbnRlcm5hbCBzdGF0ZXMgY2FuIGJlIGluZmVycmVkIGZyb20gb3V0cHV0cywgbm90IHNpbXBseSB3aGV0aGVyIHRoZSBzeXN0ZW0gaXMgbGluZWFyLiIsIkMiOiJIaWRkZW4gaW50ZXJuYWwgYmVoYXZpb3IgdXN1YWxseSBpbmRpY2F0ZXMgbWVtb3J5LCBub3QgbWVtb3J5bGVzc25lc3MuIiwiRCI6IlN0YXRlIGVxdWF0aW9ucyBhcmUgc3RpbGwgdXNlZnVsLCBlc3BlY2lhbGx5IGZvciBpZGVudGlmeWluZyBoaWRkZW4gbW9kZXMuIn0sImhpbnQiOiJPYnNlcnZhYmxlIG1lYW5zIHZpc2libGUgdGhyb3VnaCB0aGUgb3V0cHV0LiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJib29rX2ZpZ3VyZV9yZWZlcmVuY2UiLCJ2aXN1YWxfaW5zdHJ1Y3Rpb24iOiJVc2UgRmlndXJlIDEuNDIoYikgb3IgYW4gZXF1aXZhbGVudCBibG9jayBkaWFncmFtIHNob3dpbmcgYW4gaW50ZXJuYWwgc3Vic3lzdGVtIG5vdCB2aXNpYmxlIGF0IHRoZSBvdXRwdXQuIiwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwNF9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSW4gRXhhbXBsZSAoMS4zNiksIHRoZSBzdGF0ZSBlcXVhdGlvbiBpcyBcXChcXGRvdHtxfSh0KT0tMC41cSh0KVxcKS4gV2h5IGlzIHRoaXMgYSB3YXJuaW5nIHNpZ24gZm9yIGNvbnRyb2xsYWJpbGl0eT8iLCJvcHRpb25zIjpbIkEuIFRoZSBpbnB1dCBcXCh4KHQpXFwpIGRvZXMgbm90IGFwcGVhciBpbiB0aGUgc3RhdGUgZXF1YXRpb24uIiwiQi4gVGhlIGNvZWZmaWNpZW50IFxcKC0wLjVcXCkgaXMgbmVnYXRpdmUuIiwiQy4gVGhlIHN0YXRlIHZhcmlhYmxlIGlzIG5hbWVkIFxcKHFcXCkuIiwiRC4gRmlyc3Qtb3JkZXIgZXF1YXRpb25zIGFyZSBuZXZlciBjb250cm9sbGFibGUuIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiSWYgdGhlIGlucHV0IGRvZXMgbm90IGFmZmVjdCB0aGUgc3RhdGUgZXF1YXRpb24sIHRoZSBpbnB1dCBjYW5ub3QgZHJpdmUgdGhhdCBzdGF0ZSwgd2hpY2ggc2lnbmFscyBsYWNrIG9mIGNvbnRyb2xsYWJpbGl0eS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJBIG5lZ2F0aXZlIGNvZWZmaWNpZW50IGNhbiBzaW1wbHkgaW5kaWNhdGUgbmF0dXJhbCBkZWNheTsgaXQgZG9lcyBub3QgYnkgaXRzZWxmIGltcGx5IHVuY29udHJvbGxhYmlsaXR5LiIsIkMiOiJUaGUgdmFyaWFibGUgbmFtZSBoYXMgbm8gZWZmZWN0IG9uIGNvbnRyb2xsYWJpbGl0eS4iLCJEIjoiTWFueSBmaXJzdC1vcmRlciBzeXN0ZW1zIGFyZSBjb250cm9sbGFibGUuIn0sImhpbnQiOiJBc2sgd2hldGhlciB0aGUgaW5wdXQgY2FuIGNoYW5nZSB0aGUgc3RhdGUuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3A0X3EzIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJBIGNsYXNzbWF0ZSBzYXlzLCBcIklmIGEgY2lyY3VpdCBoYXMgYW4gaW5wdXQgc291cmNlIGFuZCBhbiBvdXRwdXQgdGVybWluYWwsIHRoZW4gZXZlcnkgaW50ZXJuYWwgc3RhdGUgaXMgYXV0b21hdGljYWxseSBjb250cm9sbGFibGUgYW5kIG9ic2VydmFibGUuXCIgRXhwbGFpbiB3aHkgdGhpcyBpcyB3cm9uZy4iLCJpZGVhbF9hbnN3ZXIiOiJBbiBpbnB1dCBzb3VyY2UgbWF5IG5vdCBhY3R1YWxseSBpbmZsdWVuY2UgZXZlcnkgaW50ZXJuYWwgc3RhdGUsIHNvIHNvbWUgc3RhdGVzIGNhbiBiZSB1bmNvbnRyb2xsYWJsZS4gQWxzbywgYW4gb3V0cHV0IHRlcm1pbmFsIG1heSBub3QgcmV2ZWFsIGV2ZXJ5IGludGVybmFsIHN0YXRlLCBzbyBzb21lIHN0YXRlcyBjYW4gYmUgdW5vYnNlcnZhYmxlLiBDb250cm9sbGFiaWxpdHkgZGVwZW5kcyBvbiBpbnB1dC10by1zdGF0ZSBwYXRocywgYW5kIG9ic2VydmFiaWxpdHkgZGVwZW5kcyBvbiBzdGF0ZS10by1vdXRwdXQgcGF0aHMuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBkaXN0aW5ndWlzaCBjb250cm9sbGFiaWxpdHkgZnJvbSBvYnNlcnZhYmlsaXR5IiwiTXVzdCBzdGF0ZSB0aGF0IGFuIGlucHV0IHNvdXJjZSBhbG9uZSBkb2VzIG5vdCBndWFyYW50ZWUgY29udHJvbCBvZiBldmVyeSBzdGF0ZSIsIk11c3Qgc3RhdGUgdGhhdCBhbiBvdXRwdXQgdGVybWluYWwgYWxvbmUgZG9lcyBub3QgZ3VhcmFudGVlIHZpc2liaWxpdHkgb2YgZXZlcnkgc3RhdGUiLCJNdXN0IG1lbnRpb24gcGF0aHMsIGluZmx1ZW5jZSwgb3Igc3RydWN0dXJhbCBjb25uZWN0aW9uIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCB1bmRlcnN0YW5kcyB0aGUgc3RydWN0dXJhbCBtZWFuaW5nLCBub3QganVzdCB0aGUgdm9jYWJ1bGFyeS4iLCJoaW50IjoiU2VwYXJhdGUgdGhlIHF1ZXN0aW9uIFwiQ2FuIHRoZSBpbnB1dCBtb3ZlIGl0P1wiIGZyb20gXCJDYW4gdGhlIG91dHB1dCByZXZlYWwgaXQ/XCIiLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoiYm9va19maWd1cmVfcmVmZXJlbmNlIiwidmlzdWFsX2luc3RydWN0aW9uIjoiVXNlIEZpZ3VyZSAxLjQyIGFzIHRoZSByZWZlcmVuY2UgdmlzdWFsIGZvciB0aGUgd3JvbmctdnMtcmlnaHQgcmVhc29uaW5nLiIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfV19" style="display:none;"></div>%%KC_END%%
