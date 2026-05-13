%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJUaGlzIHNlY3Rpb24gaXMgYnVpbHQgYXJvdW5kIGNpcmN1aXQtdG8tZXF1YXRpb24gdHJhbnNsYXRpb24uIFRoZSBzdHJvbmdlc3QgdmlzdWFscyBhcmUgdGhlIHByb3ZpZGVkIHRleHRib29rIGNpcmN1aXQgZGlhZ3JhbXMgb24gcGFnZS0xMTEgYW5kIHBhZ2UtMTEzIGJlY2F1c2UgdGhleSBzaG93IHRoZSBleGFjdCBleGFtLWZhY2luZyB0b3BvbG9neSwgY29tcG9uZW50IHZhbHVlcywgaW5wdXQsIGFuZCBjaG9zZW4gb3V0cHV0LiBUaGUgZm9ybXVsYXMgc2hvdWxkIGJlIHJlbmRlcmVkIGFzIGNsZWFuIExhVGVYLW5hdGl2ZSB2aXN1YWxzIGJlY2F1c2UgdGhlIGtleSBsZWFybmluZyB0YXNrIGlzIHJlY29nbml6aW5nIGhvdyBwaHlzaWNhbCBsYXdzIGJlY29tZSBkaWZmZXJlbnRpYWwgZXF1YXRpb25zLiBEbyBub3QgdXNlIGdlbmVyYXRlZCBpbWFnZXMgYmVjYXVzZSByZWFkeS1tYWRlIHRleHRib29rIGNpcmN1aXQgZmlndXJlcyBhcmUgYXZhaWxhYmxlLiIsImNyYW0iOiJVc2UgdGhlIGNpcmN1aXQgZGlhZ3JhbXMgdG8gaWRlbnRpZnkgaW5wdXQsIG91dHB1dCwgc2VyaWVzIGN1cnJlbnQsIGFuZCB3aGljaCBsYXcgdHJpZ2dlcnMgdGhlIGVxdWF0aW9uLiIsInN0YW5kYXJkIjoiVXNlIGVhY2ggY2lyY3VpdCBkaWFncmFtIG5leHQgdG8gb25lIHJlcHJlc2VudGF0aXZlIGRlcml2YXRpb24gc28gc3R1ZGVudHMgY29ubmVjdCB0b3BvbG9neSB0byBmb3JtdWxhLiIsInRvcF9zY29yZSI6IlVzZSB2aXN1YWxzIHRvIGRpc3Rpbmd1aXNoIG91dHB1dCBjdXJyZW50IGZyb20gY2FwYWNpdG9yIHZvbHRhZ2UgYW5kIHByZXZlbnQgb3BlcmF0b3Itbm90YXRpb24gbWlzdGFrZXMuIn0=" style="display:none;"></div>%%KC_END%%
# System Model: Input-Output Description

> **Section Objective:** Learn how to turn a continuous-time electrical system into an input-output equation.

---

## Concepts In This Section

- Input-output description
- System model
- Kirchhoff voltage law
- Element voltage-current laws
- Differential operator D
- RLC circuit equation
- RC circuit equation

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="web_reference_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiUG9pbnQgdG8gdGhlIHNvdXJjZSB4KHQpLCBsb29wIGN1cnJlbnQgeSh0KSwgYW5kIHRoZSB0aHJlZSB2b2x0YWdlIGRyb3BzIGJlZm9yZSB3cml0aW5nIEtWTC4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgZGlhZ3JhbSBhcyB0aGUgbWFwIGZvciB0cmFuc2xhdGluZyBlYWNoIGVsZW1lbnQgaW50byBvbmUgdGVybSBvZiB0aGUgZXF1YXRpb24uIiwidG9wX3Njb3JlIjoiRW1waGFzaXplIHRoYXQgY2hhbmdpbmcgdGhlIG1lYXN1cmVkIG91dHB1dCBjaGFuZ2VzIHRoZSBmaW5hbCBpbnB1dC1vdXRwdXQgZXF1YXRpb24uIn0=" style="display:none;"></div>%%KC_END%%
![Electrical network](https://upload.wikimedia.org/wikipedia/commons/b/b4/Ohm%27s_Law_with_Voltage_source_TeX.svg)
*Reference visual from Wikipedia: Electrical network*
%%KC_BLOCK%%<div class="kc-reference-source"><a href="https://upload.wikimedia.org/wikipedia/commons/b/b4/Ohm%27s_Law_with_Voltage_source_TeX.svg" target="_blank" rel="noopener noreferrer">Reference image from Wikipedia</a></div>%%KC_END%%

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgdmlzdWFsIGZvciBmYXN0IHJlY29nbml0aW9uIG9mIHRoZSBrZXkgcGF0dGVybi4iLCJzdGFuZGFyZCI6IlVzZSB0aGlzIHZpc3VhbCB0byBjbGFyaWZ5IHRoZSBtYWluIGNvbmNlcHQuIiwidG9wX3Njb3JlIjoiVXNlIHRoaXMgdmlzdWFsIHRvIHN1cmZhY2UgYSBzdWJ0bGUgZGlzdGluY3Rpb24sIHRyYXAsIG9yIHZhcmlhbnQuIn0=" style="display:none;"></div>%%KC_END%%
![unknown](/figures/page-111-unknown-1.png)
*A series RLC circuit driven by input voltage \(x(t)\), with loop current \(y(t)\) and output defined as the capacitor voltage \(v_C(t)\) — the starting point for deriving the input-output equation.*
<div class="lesson-figure-description">The figure is a circuit diagram with no plotted axes. It shows a single series loop containing an input voltage source labeled \(x(t)\), an inductor labeled \(L = 1\) H, a resistor labeled \(R = 3\) \(\Omega\), and a capacitor labeled \(C = 1/2\) F, all connected in series. A circular arrow inside the loop marks the loop current \(y(t)\). The output is the capacitor voltage \(v_C(t)\), measured across the capacitor with clearly marked positive and negative terminals. Students should notice that the source drives all three series elements together, and that the chosen output — capacitor voltage — is distinct from the loop current that flows through every element.</div>

## 1. Start from the loop law

This is **Kirchhoff's Voltage Law (KVL)** applied to the series RLC circuit: the source voltage \(x(t)\) equals the sum of the voltage drops across the inductor \(v_L(t)\), resistor \(v_R(t)\), and capacitor \(v_C(t)\).

- \(x(t)\): input voltage (the source)
- \(v_L(t)\), \(v_R(t)\), \(v_C(t)\): voltage drops across each element

**When to use:** any single-loop circuit where you need an input-output equation.

**Minimal example:** For this circuit, the output is the loop current \(y(t)\), so each voltage drop must be rewritten using \(y(t)\).

#### Exam Trigger
Series circuit + source voltage + output current.

#### Common Misuse
Writing component laws before deciding the sign convention and loop direction.

$$v_L(t) + v_R(t) + v_C(t) = x(t)$$

## 2. Replace each circuit element by its voltage-current law

Substituting element laws into KVL converts the circuit into Eq. (1.27):

- **Inductor** \(L = 1\) H: voltage \(= L\,\frac{dy}{dt} = \frac{dy(t)}{dt}\)
- **Resistor** \(R = 3\) \(\Omega\): voltage \(= Ry(t) = 3y(t)\)
- **Capacitor** \(C = 1/2\) F: voltage \(= \frac{1}{C}\int_{-\infty}^{t} y(\tau)\,d\tau = 2\int_{-\infty}^{t} y(\tau)\,d\tau\)

Here \(\tau\) is a dummy integration variable, and \(y(t)\) is the loop current.

**When to use:** after applying KVL when the output is current.

#### Exam Trigger
RLC series circuit asking for an equation in loop current.

#### Quick Check
Which term came from the capacitor? — The integral term \(2\int_{-\infty}^{t} y(\tau)\,d\tau\), because capacitor voltage depends on accumulated charge, not instantaneous current.

#### Common Misuse
Forgetting that capacitor voltage depends on the **integral** of current, not directly on current.

$$\frac{dy(t)}{dt} + 3y(t) + 2\int_{-\infty}^{t} y(\tau)\,d\tau = x(t) \quad (1.27)$$

## 3. Use D notation as differential-operator shorthand

\(D\) means "differentiate with respect to \(t\)". So:

$$D\,y(t) = \frac{dy(t)}{dt}, \quad D^2 y(t) = \frac{d^2 y(t)}{dt^2}$$

Multiplying Eq. (1.27) through by \(D\) differentiates both sides, which removes the integral and yields the operator equation above.

Read \((D^2 + 3D + 2)\,y(t)\) as an **instruction**, not ordinary multiplication:

> Take the second derivative of \(y(t)\), add 3 times the first derivative, then add \(2y(t)\).

**When to use:** to write linear differential equations compactly, especially when an integral term needs to be eliminated.

#### Exam Trigger
Equations containing both derivatives and integrals that can be cleaned up with \(D\).

#### Common Misuse
Canceling \(D\) like a number — \(D\) represents differentiation and cannot be treated as a scalar factor.

$$(D^2 + 3D + 2)\,y(t) = D\,x(t)$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="example_support" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoZSBkaWFncmFtIHRvIHF1aWNrbHkgaWRlbnRpZnkgXFwoUiA9IDE1XFwpIFxcKFxcT21lZ2FcXCksIFxcKEMgPSAxLzVcXCkgRiwgaW5wdXQgXFwoeCh0KVxcKSwgY3VycmVudCBcXChpKHQpXFwpLCBhbmQgb3V0cHV0IFxcKHkodClcXCkuIiwic3RhbmRhcmQiOiJVc2UgdGhlIGRpYWdyYW0gYmVzaWRlIHRoZSBkZXJpdmF0aW9uIHNvIHN0dWRlbnRzIHNlZSB3aHkgdGhlIHNhbWUgY3VycmVudCBlbnRlcnMgYm90aCBlbGVtZW50IGxhd3MuIiwidG9wX3Njb3JlIjoiVXNlIGl0IHRvIGNvbnRyYXN0IHRoZSB0d28gcG9zc2libGUgb3V0cHV0czogbG9vcCBjdXJyZW50IFxcKGkodClcXCkgdmVyc3VzIGNhcGFjaXRvciB2b2x0YWdlIFxcKHkodClcXCkuIn0=" style="display:none;"></div>%%KC_END%%
![unknown](/figures/page-113-unknown-1.png)
*An RC series circuit with \(R = 15\) \(\Omega\) and \(C = 1/5\) F driven by \(x(t)\), showing loop current \(i(t)\) and capacitor voltage output \(y(t)\) — the same circuit yields two different equations depending on which variable is chosen as the output.*
<div class="lesson-figure-description">The figure shows a single-loop RC series circuit with no plotted axes. An input voltage source labeled \(x(t)\) drives a resistor labeled \(R = 15\) \(\Omega\) on the top branch and a capacitor labeled \(C = 1/5\) F on the right branch, all in series. A curved arrow inside the loop marks the loop current \(i(t)\). The output voltage \(y(t)\) is measured across the capacitor with polarity labels \(+\) at the top terminal and \(-\) at the bottom terminal. The key relationship is that the same current \(i(t)\) flows through both the resistor and the capacitor, while \(y(t)\) is specifically the capacitor voltage — not the current.</div>

## 4. RC example: output is loop current

Apply KVL to the RC circuit: resistor voltage plus capacitor voltage equals \(x(t)\).

- **Resistor** \(R = 15\) \(\Omega\): voltage \(= 15\,i(t)\)
- **Capacitor** \(C = 1/5\) F: voltage \(= \frac{1}{C}\int_{-\infty}^{t} i(\tau)\,d\tau = 5\int_{-\infty}^{t} i(\tau)\,d\tau\)

This gives:

$$15\,i(t) + 5\int_{-\infty}^{t} i(\tau)\,d\tau = x(t)$$

Multiplying both sides by \(D\) eliminates the integral and yields Eq. (1.30), where \(D\,x(t) = dx(t)/dt\).

**When to use:** when the requested output is the loop current \(i(t)\).

#### Exam Trigger
Find the equation relating input voltage to loop current in an RC circuit.

#### Common Misuse
Leaving the integral form when the question expects operator notation — always apply \(D\) to both sides to clear the integral.

$$(15D + 5)\,i(t) = D\,x(t) \quad (1.30)$$

## 5. RC example: output is capacitor voltage

If the output is capacitor voltage \(y(t)\) instead of current, rewrite the loop current using the capacitor current-voltage law:

$$i(t) = C\,\frac{dy(t)}{dt} = \frac{1}{5}\,D\,y(t)$$

Substituting into the RC loop equation:

$$15 \cdot \frac{1}{5}\,D\,y(t) + y(t) = x(t) \implies (3D + 1)\,y(t) = x(t)$$

Here \(y(t)\) is the capacitor voltage, \(D\) means differentiation, and \(x(t)\) is the input voltage.

**When to use:** when the measured output is capacitor voltage, not current.

#### Exam Trigger
Capacitor voltage as output — substitute \(i(t) = C\,Dy(t)\) before writing the equation.

#### Quick Check
If \(y(t)\) is constant, then \(D\,y(t) = 0\), so Eq. (1.31) reduces to \(y(t) = x(t)\) — the capacitor fully charges to the source voltage, which makes physical sense.

#### Common Misuse
Reusing the current-output equation (1.30) without converting \(i(t)\) into \(\frac{1}{5}D\,y(t)\).

$$(3D + 1)\,y(t) = x(t) \quad (1.31)$$

---
**📌 Key Takeaways**
- An **input-output description** relates the measured output variable directly to the input, eliminating all internal variables.
- **Step 1 — KVL:** \(v_L(t) + v_R(t) + v_C(t) = x(t)\)
- **Step 2 — Element laws → RLC current equation (1.27):** \(\dfrac{dy(t)}{dt} + 3y(t) + 2\displaystyle\int_{-\infty}^{t} y(\tau)\,d\tau = x(t)\)
- **Step 3 — Operator form (multiply by D):** \((D^2 + 3D + 2)\,y(t) = D\,x(t)\)
- **RC circuit, current output (1.30):** \((15D + 5)\,i(t) = D\,x(t)\)
- **RC circuit, capacitor-voltage output (1.31):** \((3D + 1)\,y(t) = x(t)\) — derived by substituting \(i(t) = C\,Dy(t)\)
- The chosen output variable determines which equation you write — never reuse the current-output equation when the output is capacitor voltage.

*Next, these input-output equations become the starting point for analyzing system behavior.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImlucHV0X291dHB1dF9kZXNjcmlwdGlvbiIsImxhYmVsIjoiTWVhbmluZyBvZiBpbnB1dC1vdXRwdXQgZGVzY3JpcHRpb24iLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImlvX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGF0IGlzIHRoZSBtYWluIGdvYWwgb2YgYW4gaW5wdXQtb3V0cHV0IGRlc2NyaXB0aW9uIG9mIGEgc3lzdGVtPyIsIm9wdGlvbnMiOlsiQS4gVG8gbGlzdCBldmVyeSBpbnRlcm5hbCBwaHlzaWNhbCB2YXJpYWJsZSBpbiB0aGUgc3lzdGVtIiwiQi4gVG8gcmVsYXRlIHRoZSBtZWFzdXJlZCBvdXRwdXQgdmFyaWFibGUgZGlyZWN0bHkgdG8gdGhlIGlucHV0IHZhcmlhYmxlIiwiQy4gVG8gZHJhdyBhIGRldGFpbGVkIHBoeXNpY2FsIGRpYWdyYW0gd2l0aG91dCBlcXVhdGlvbnMiLCJELiBUbyByZXBsYWNlIEtpcmNoaG9mZidzIGxhd3Mgd2l0aCBleHBlcmltZW50YWwgZ3Vlc3NpbmciXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJBbiBpbnB1dC1vdXRwdXQgZGVzY3JpcHRpb24ga2VlcHMgdGhlIGZvY3VzIG9uIHRoZSByZWxhdGlvbnNoaXAgYmV0d2VlbiB0aGUgZXh0ZXJuYWxseSBhcHBsaWVkIGlucHV0IGFuZCB0aGUgbWVhc3VyZWQgb3V0cHV0LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkludGVybmFsIHZhcmlhYmxlcyBtYXkgYXBwZWFyIHRlbXBvcmFyaWx5LCBidXQgdGhlIGZpbmFsIGdvYWwgaXMgdG8gZWxpbWluYXRlIHVud2FudGVkIHZhcmlhYmxlcy4iLCJDIjoiQSBkaWFncmFtIGhlbHBzLCBidXQgdGhlIG1vZGVsIGlzIHRoZSBtYXRoZW1hdGljYWwgcmVsYXRpb25zaGlwLiIsIkQiOiJDaXJjdWl0IGxhd3MgYXJlIHRoZSB0b29scyB1c2VkIHRvIGRlcml2ZSB0aGUgbW9kZWwuIn0sImhpbnQiOiJBc2sgd2hhdCB2YXJpYWJsZXMgcmVtYWluIGluIHRoZSBmaW5hbCBlcXVhdGlvbi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJybGNfa3ZsX3RyYW5zbGF0aW9uIiwibGFiZWwiOiJSTEMgY2lyY3VpdCBsYXcgdHJhbnNsYXRpb24iLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJybGNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciB0aGUgc2VyaWVzIFJMQyBjaXJjdWl0IHdpdGggaW5wdXQgdm9sdGFnZSBcXCh4KHQpXFwpIGFuZCBsb29wIGN1cnJlbnQgXFwoeSh0KVxcKSwgd2hpY2ggdGVybSBpbiBFcS4gKDEuMjcpIGNvbWVzIGZyb20gdGhlIGNhcGFjaXRvcj8iLCJvcHRpb25zIjpbIkEuIFxcKFxcZGZyYWN7ZHkodCl9e2R0fVxcKSIsIkIuIFxcKDN5KHQpXFwpIiwiQy4gXFwoMlxcZGlzcGxheXN0eWxlXFxpbnRfey1cXGluZnR5fV57dH0geShcXHRhdSlcXCxkXFx0YXVcXCkiLCJELiBcXCh4KHQpXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiQ2FwYWNpdG9yIHZvbHRhZ2UgaXMgcHJvcG9ydGlvbmFsIHRvIGFjY3VtdWxhdGVkIGNoYXJnZSwgc28gd2hlbiBjdXJyZW50IGlzIHRoZSBvdXRwdXQsIHRoZSBjYXBhY2l0b3Igdm9sdGFnZSBhcHBlYXJzIGFzIGFuIGludGVncmFsIG9mIGN1cnJlbnQuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhhdCBpcyB0aGUgaW5kdWN0b3Igdm9sdGFnZSBiZWNhdXNlIGluZHVjdG9yIHZvbHRhZ2UgaXMgcHJvcG9ydGlvbmFsIHRvIHRoZSBkZXJpdmF0aXZlIG9mIGN1cnJlbnQuIiwiQiI6IlRoYXQgaXMgdGhlIHJlc2lzdG9yIHZvbHRhZ2UgZnJvbSBPaG0ncyBsYXcuIiwiRCI6IlRoYXQgaXMgdGhlIGlucHV0IHNvdXJjZSB2b2x0YWdlLCBub3QgYSBjb21wb25lbnQgdm9sdGFnZSBkcm9wLiJ9LCJoaW50IjoiQ2FwYWNpdG9ycyBzdG9yZSBjaGFyZ2UsIHNvIGxvb2sgZm9yIGFjY3VtdWxhdGlvbiBvdmVyIHRpbWUuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6InByb3ZpZGVkX3RleHRib29rX2NpcmN1aXRfZmlndXJlX3BhZ2UtMTExIiwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoiZF9vcGVyYXRvcl9tZWFuaW5nIiwibGFiZWwiOiJEaWZmZXJlbnRpYWwgb3BlcmF0b3IgRCIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImRvcF9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hhdCBkb2VzIFxcKChEXjIgKyAzRCArIDIpXFwseSh0KVxcKSBtZWFuPyIsIm9wdGlvbnMiOlsiQS4gTXVsdGlwbHkgXFwoeSh0KVxcKSBieSB0aGUgbnVtYmVyIFxcKEReMiArIDNEICsgMlxcKSIsIkIuIFRha2UgXFwoeScnKHQpICsgM3knKHQpICsgMnkodClcXCkiLCJDLiBUYWtlIFxcKHkodCleMiArIDN5KHQpICsgMlxcKSIsIkQuIERpZmZlcmVudGlhdGUgXFwoeCh0KVxcKSB0d2ljZSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlxcKERcXCkgaXMgYW4gb3BlcmF0b3I6IFxcKERcXCkgbWVhbnMgZGlmZmVyZW50aWF0ZSBvbmNlLCBhbmQgXFwoRF4yXFwpIG1lYW5zIGRpZmZlcmVudGlhdGUgdHdpY2UuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiXFwoRFxcKSBpcyBub3QgYW4gb3JkaW5hcnkgbnVtYmVyIGluIHRoaXMgY29udGV4dC4iLCJDIjoiVGhlIHBvd2VycyBhcmUgb24gdGhlIG9wZXJhdG9yIFxcKERcXCksIG5vdCBvbiBcXCh5KHQpXFwpLiIsIkQiOiJUaGUgZXhwcmVzc2lvbiBvcGVyYXRlcyBvbiBcXCh5KHQpXFwpLCBub3QgXFwoeCh0KVxcKS4ifSwiaGludCI6IlJlYWQgXFwoRFxcKSBhcyAnZGlmZmVyZW50aWF0ZScuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoiZG9wX3EyIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJBIGNsYXNzbWF0ZSBzYXlzIFxcKEReMiArIDNEICsgMlxcKSBpcyBqdXN0IGFuIGFsZ2VicmFpYyBmYWN0b3IgbXVsdGlwbHlpbmcgXFwoeSh0KVxcKS4gRXhwbGFpbiB3aHkgdGhhdCBpcyB3cm9uZy4iLCJpZGVhbF9hbnN3ZXIiOiJJdCBpcyBhIGRpZmZlcmVudGlhbCBvcGVyYXRvciwgbm90IGFuIG9yZGluYXJ5IGFsZ2VicmFpYyBmYWN0b3IuIFxcKChEXjIgKyAzRCArIDIpXFwseSh0KVxcKSBtZWFucyB0YWtlIHRoZSBzZWNvbmQgZGVyaXZhdGl2ZSBvZiBcXCh5KHQpXFwpLCBhZGQgMyB0aW1lcyB0aGUgZmlyc3QgZGVyaXZhdGl2ZSwgYW5kIGFkZCBcXCgyeSh0KVxcKS4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IHN0YXRlIHRoYXQgRCBpcyBhIGRpZmZlcmVudGlhbCBvcGVyYXRvciIsIk11c3QgZXhwbGFpbiBhdCBsZWFzdCBEIGFuZCBEXjIgY29ycmVjdGx5IiwiTXVzdCBpZGVudGlmeSB0aGUgcmVzdWx0IGFzIG9wZXJhdGlvbnMgb24geSh0KSwgbm90IG9yZGluYXJ5IG11bHRpcGxpY2F0aW9uIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3MgdGhlIG1vc3QgaW1wb3J0YW50IG5vdGF0aW9uIHRyYXAgaW4gdGhlIHNlY3Rpb24uIiwiaGludCI6IkV4cGFuZCB3aGF0IFxcKERcXCkgZG9lcyB0byBcXCh5KHQpXFwpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoicmNfb3V0cHV0X2Nob2ljZSIsImxhYmVsIjoiUkMgY2lyY3VpdCBvdXRwdXQgY2hvaWNlIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoicmNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkluIHRoZSBSQyBjaXJjdWl0IHdpdGggXFwoUiA9IDE1XFwpIFxcKFxcT21lZ2FcXCkgYW5kIFxcKEMgPSAxLzVcXCkgRiwgd2hpY2ggZXF1YXRpb24gbWF0Y2hlcyB0aGUgY2FzZSB3aGVyZSB0aGUgb3V0cHV0IGlzIGxvb3AgY3VycmVudCBcXChpKHQpXFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoKDE1RCArIDUpXFwsaSh0KSA9IERcXCx4KHQpXFwpIiwiQi4gXFwoKDNEICsgMSlcXCx5KHQpID0geCh0KVxcKSIsIkMuIFxcKChEXjIgKyAzRCArIDIpXFwsaSh0KSA9IERcXCx4KHQpXFwpIiwiRC4gXFwoMTVcXCxpKHQpICsgNVxcLHkodCkgPSBEXFwseCh0KVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IldoZW4gY3VycmVudCBpcyB0aGUgb3V0cHV0LCB0aGUgUkMgZXF1YXRpb24gaXMgd3JpdHRlbiBkaXJlY3RseSBpbiB0ZXJtcyBvZiBcXChpKHQpXFwpLCBhbmQgZGlmZmVyZW50aWF0aW5nIGdpdmVzIFxcKCgxNUQgKyA1KVxcLGkodCkgPSBEXFwseCh0KVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGF0IGlzIHRoZSBjYXBhY2l0b3Itdm9sdGFnZSBvdXRwdXQgZXF1YXRpb24uIiwiQyI6IlRoYXQgc2Vjb25kLW9yZGVyIGZvcm0gYmVsb25ncyB0byB0aGUgUkxDIGNpcmN1aXQsIG5vdCB0aGlzIFJDIGNpcmN1aXQuIiwiRCI6IlRoaXMgaW5jb3JyZWN0bHkgbWl4ZXMgY3VycmVudCBhbmQgdm9sdGFnZSBvdXRwdXQgdmFyaWFibGVzLiJ9LCJoaW50IjoiTG9vayBmb3IgdGhlIGVxdWF0aW9uIHdob3NlIG91dHB1dCB2YXJpYWJsZSBpcyBcXChpKHQpXFwpLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJwcm92aWRlZF90ZXh0Ym9va19jaXJjdWl0X2ZpZ3VyZV9wYWdlLTExMyIsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJyY19xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2h5IGRvZXMgdGhlIGNhcGFjaXRvci12b2x0YWdlIG91dHB1dCBlcXVhdGlvbiBmb3IgdGhlIFJDIGNpcmN1aXQgYmVjb21lIFxcKCgzRCArIDEpXFwseSh0KSA9IHgodClcXCk/Iiwib3B0aW9ucyI6WyJBLiBCZWNhdXNlIHRoZSBjYXBhY2l0b3IgY3VycmVudCBpcyBcXChpKHQpID0gQ1xcLERcXCx5KHQpID0gXFx0ZnJhY3sxfXs1fVxcLERcXCx5KHQpXFwpIiwiQi4gQmVjYXVzZSB0aGUgcmVzaXN0b3Igdm9sdGFnZSBpcyBhbHdheXMgZXF1YWwgdG8gXFwoeSh0KVxcKSIsIkMuIEJlY2F1c2UgdGhlIGNhcGFjaXRvciByZW1vdmVzIGFsbCBkZXJpdmF0aXZlcyBmcm9tIHRoZSBlcXVhdGlvbiIsIkQuIEJlY2F1c2UgXFwoRFxcKSBjYW4gYmUgY2FuY2VsZWQgZnJvbSBib3RoIHNpZGVzIGxpa2UgYSBjb21tb24gbnVtYmVyIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiV2hlbiB0aGUgb3V0cHV0IGlzIGNhcGFjaXRvciB2b2x0YWdlIFxcKHkodClcXCksIGN1cnJlbnQgbXVzdCBiZSByZXdyaXR0ZW4gYXMgY2FwYWNpdG9yIGN1cnJlbnQ6IFxcKGkodCkgPSBDXFwsZHkodCkvZHRcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhlIHJlc2lzdG9yIHZvbHRhZ2UgaXMgXFwoMTVcXCxpKHQpXFwpLCBub3QgXFwoeSh0KVxcKS4iLCJDIjoiVGhlIGRlcml2YXRpdmUgYXBwZWFycyBiZWNhdXNlIGN1cnJlbnQgdGhyb3VnaCBhIGNhcGFjaXRvciBkZXBlbmRzIG9uIHRoZSBkZXJpdmF0aXZlIG9mIGNhcGFjaXRvciB2b2x0YWdlLiIsIkQiOiJcXChEXFwpIHJlcHJlc2VudHMgZGlmZmVyZW50aWF0aW9uIGFuZCBjYW5ub3QgYmUgY2FzdWFsbHkgY2FuY2VsZWQgbGlrZSBhIG51bWJlci4ifSwiaGludCI6IlVzZSB0aGUgY2FwYWNpdG9yIGN1cnJlbnQtdm9sdGFnZSBsYXcuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6InByb3ZpZGVkX3RleHRib29rX2NpcmN1aXRfZmlndXJlX3BhZ2UtMTEzIiwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoiZXhhbV9wcm9jZXNzIiwibGFiZWwiOiJEZXJpdmF0aW9uIHdvcmtmbG93IiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJwcm9jZXNzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCB3b3JrZmxvdyBiZXN0IG1hdGNoZXMgdGhlIGRlcml2YXRpb24gb2YgYW4gZWxlY3RyaWNhbCBpbnB1dC1vdXRwdXQgZXF1YXRpb24gaW4gdGhpcyBzZWN0aW9uPyIsIm9wdGlvbnMiOlsiQS4gR3Vlc3MgdGhlIGZpbmFsIGRpZmZlcmVudGlhbCBlcXVhdGlvbiwgdGhlbiBkcmF3IGEgY2lyY3VpdCIsIkIuIFdyaXRlIEtWTCBvciBLQ0wsIHN1YnN0aXR1dGUgZWxlbWVudCBsYXdzLCBlbGltaW5hdGUgdW53YW50ZWQgdmFyaWFibGVzLCB0aGVuIHdyaXRlIHRoZSByZXN1bHQgaW4gdGhlIGRlc2lyZWQgb3V0cHV0IHZhcmlhYmxlIiwiQy4gVXNlIG9ubHkgT2htJ3MgbGF3IGZvciBldmVyeSBjaXJjdWl0IGVsZW1lbnQiLCJELiBJZ25vcmUgdGhlIGNob3NlbiBvdXRwdXQgdW50aWwgdGhlIGZpbmFsIG51bWVyaWNhbCBhbnN3ZXIiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgc2VjdGlvbidzIG1ldGhvZCBpcyBzeXN0ZW1hdGljOiBpbnRlcmNvbm5lY3Rpb24gbGF3IGZpcnN0LCBlbGVtZW50IGxhd3Mgc2Vjb25kLCBlbGltaW5hdGUgdW53YW50ZWQgdmFyaWFibGVzLCB0aGVuIGV4cHJlc3MgaW5wdXQgYWdhaW5zdCBvdXRwdXQuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlIGVxdWF0aW9uIGlzIGRlcml2ZWQgZnJvbSBwaHlzaWNhbCBsYXdzLCBub3QgZ3Vlc3NlZC4iLCJDIjoiSW5kdWN0b3JzIGFuZCBjYXBhY2l0b3JzIHJlcXVpcmUgZGVyaXZhdGl2ZSBvciBpbnRlZ3JhbCBsYXdzLCBub3QganVzdCBPaG0ncyBsYXcuIiwiRCI6IlRoZSBjaG9zZW4gb3V0cHV0IGRldGVybWluZXMgd2hpY2ggdmFyaWFibGVzIG11c3QgcmVtYWluIGluIHRoZSBmaW5hbCBlcXVhdGlvbi4ifSwiaGludCI6IlRoaW5rOiBjaXJjdWl0IGxhdyDihpIgZWxlbWVudCBsYXcg4oaSIGVsaW1pbmF0ZSB2YXJpYWJsZXMuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfV19" style="display:none;"></div>%%KC_END%%
