%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJVc2UgdGhlIGF2YWlsYWJsZSB0ZXh0Ym9vayBmaWd1cmVzIGFzIHRoZSBtYWluIHZpc3VhbCBhbmNob3JzOiB0aGUgTUlNTyBibG9jayBkaWFncmFtIGZvciB0aGUgZ2VuZXJhbCBzeXN0ZW0gaWRlYSBhbmQgRmlnLiAxLjI2IGZvciB0aGUgUkMgY2lyY3VpdCByZXNwb25zZSBleGFtcGxlLiBVc2UgTGFUZVgtbmF0aXZlIGZvcm11bGFzIGZvciB0aGUgb3BlcmF0b3IgdmlldyBhbmQgUkMgZGlmZmVyZW50aWFsIGVxdWF0aW9uIGJlY2F1c2UgdGhlIHN5bWJvbGljIHJlbGF0aW9uc2hpcHMgYXJlIGNlbnRyYWwgYW5kIG11c3QgYmUgcmVhZCBwcmVjaXNlbHkuIERvIG5vdCB1c2UgZ2VuZXJhdGVkIGltYWdlcyBiZWNhdXNlIHJlYWR5LW1hZGUgdGV4dGJvb2sgZmlndXJlcyBhcmUgYXZhaWxhYmxlIGZvciB0aGUga2V5IHZpc3VhbCBjb25jZXB0cy4iLCJjcmFtIjoiVXNlIHRoZSBibG9jayBkaWFncmFtIHRvIGluc3RhbnRseSByZWNvZ25pemUgaW5wdXQtb3V0cHV0IHN5c3RlbSBub3RhdGlvbiBhbmQgdGhlIFJDIGZpZ3VyZSB0byByZWNvZ25pemUgaW5pdGlhbC1jb25kaXRpb24gcmVzcG9uc2UgcXVlc3Rpb25zLiIsInN0YW5kYXJkIjoiVXNlIGVhY2ggdGV4dGJvb2sgZmlndXJlIGJlc2lkZSBvbmUgcmVwcmVzZW50YXRpdmUgZm9ybXVsYSBhbmQgb25lIHdvcmtlZCBpbnRlcnByZXRhdGlvbiBzbyB0aGUgc3R1ZGVudCBjb25uZWN0cyBwaWN0dXJlLCBlcXVhdGlvbiwgYW5kIGV4YW0gdXNlLiIsInRvcF9zY29yZSI6IlVzZSB0aGUgdmlzdWFscyB0byBzZXBhcmF0ZSBleHRlcm5hbCBpbnB1dCBkYXRhIGZyb20gc3RvcmVkIGludGVybmFsIHN0YXRlLCB3aGljaCBpcyB0aGUgc3VidGxlIGRpc3RpbmN0aW9uIGJlaGluZCByZXNwb25zZSBwcmVkaWN0aW9uLiJ9" style="display:none;"></div>%%KC_END%%
# 1.6 Systems

> **Section Objective:** Understand systems as input-output mappings, and learn what information is needed to compute a system response.

---

## Concepts In This Section

- System input and output
- Analysis versus design
- State and initial condition
- RC circuit response

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVHJhaW4gcmVjb2duaXRpb24gb2YgeCh0KSBlbnRlcmluZyBhIGJsb2NrIGFuZCB5KHQpIGxlYXZpbmcgaXQuIiwic3RhbmRhcmQiOiJVc2UgdGhlIGRpYWdyYW0gYXMgdGhlIHZpc3VhbCBkZWZpbml0aW9uIG9mIGEgc3lzdGVtIGJlZm9yZSBzaG93aW5nIHRoZSBmb3JtdWxhLiIsInRvcF9zY29yZSI6IkVtcGhhc2l6ZSB0aGF0IG9uZSBzeXN0ZW0gbWF5IGhhdmUgbXVsdGlwbGUgY291cGxlZCBpbnB1dHMgYW5kIG91dHB1dHMsIG5vdCBqdXN0IGEgc2luZ2xlIHgodCkgYW5kIHkodCkuIn0=" style="display:none;"></div>%%KC_END%%
![MIMO system block diagram on page-095](/figures/page-095-unknown-1.png)
*This figure shows a multiple-input, multiple-output system mapping several input signals to several output signals.*
<div class="lesson-figure-description">The diagram shows a central rectangular system block. On the left, input signals labeled \(x_1(t), x_2(t), \ldots, x_j(t)\) enter the block via arrows pointing right. On the right, output signals labeled \(y_1(t), y_2(t), \ldots, y_k(t)\) leave the block via arrows pointing right. Vertical dots indicate additional channels between the first and last labeled signals. Students should notice that a system is treated as a rule or device that transforms input signal(s) into output signal(s) — it is not one specific physical object, but any mapping from inputs to outputs.</div>

## 1. System as an Input-Output Rule

Here \(x(t)\) is the **input signal**, \(y(t)\) is the **output signal**, and \(\mathcal{T}\{\cdot\}\) represents the **system's rule** — which could be a physical circuit, a digital filter, an algorithm, or a mathematical model.

The operator \(\mathcal{T}\) acts on the entire input signal and produces the output. For example, if \(x(t)\) is a microphone recording, a filter system may output \(y(t)\) with high-frequency noise reduced.

**When to use this:** Whenever a problem asks what output a system produces from a given input.

### EXAM TRIGGER

Diagrams with arrows entering and leaving a labeled block.

#### Common Misuse

\(\mathcal{T}\) is **not** multiplication by a constant \(T\). It is an operator that acts on the whole signal \(x(t)\), not a scalar factor.

$$y(t) = \mathcal{T}\{x(t)\}$$

## 2. Analysis versus Design

**Analysis** means the input signal and the system model are both given — the task is to find the output \(y(t)\).

**Design (synthesis)** means the desired output behavior is specified — the task is to construct or choose a system that produces it.

### EXAMPLE

- **Analysis:** *Given this RC circuit and input current \(x(t)\), find \(y(t)\).*
- **Design:** *Choose a circuit so that noise is reduced while the useful signal remains.*

### EXAM NOTE

Most early signals-and-systems problems are **analysis** problems. When you see one, immediately identify:
1. The input signal \(x(t)\)
2. The system rule or model
3. The output \(y(t)\) to be found
4. Any known initial conditions

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="example_support" data-visual-use-b64="eyJjcmFtIjoiUmVjb2duaXplIGNhcGFjaXRvciB2b2x0YWdlIGFzIHRoZSBzdG9yZWQgaW5pdGlhbCBjb25kaXRpb24gaW4gUkMgcmVzcG9uc2UgcXVlc3Rpb25zLiIsInN0YW5kYXJkIjoiQ29ubmVjdCB0aGUgY2lyY3VpdCBwaWN0dXJlIHRvIHRoZSBkaWZmZXJlbnRpYWwgZXF1YXRpb24gZm9yIHkodCkuIiwidG9wX3Njb3JlIjoiSGlnaGxpZ2h0IHRoYXQgdGhlIHByZXNlbnQgb3V0cHV0IGRlcGVuZHMgb24gYm90aCB0aGUgYXBwbGllZCBpbnB1dCBhbmQgdGhlIHN0b3JlZCBjYXBhY2l0b3IgZW5lcmd5LiJ9" style="display:none;"></div>%%KC_END%%
![Fig. 1.26](/figures/page-096-unknown-1.png)
*This figure shows a parallel RC circuit driven by input current x(t), with output voltage y(t) measured across the capacitor.*
<div class="lesson-figure-description">The circuit diagram shows a current source labeled \(x(t)\) feeding a parallel combination of resistor \(R\) and capacitor \(C\). The capacitor voltage is labeled \(v_c(t)\) with polarity marks across \(C\), and the output \(y(t)\) is measured as the voltage between the top and bottom right terminals. The resistor and capacitor share the same two nodes, forming a parallel RC arrangement. Students should notice that the capacitor voltage \(v_c(t)\) is both the output being measured and the stored state that affects all future behavior — the capacitor holds energy from the past.</div>

$$x(t) = C\frac{dy(t)}{dt} + \frac{1}{R}y(t)$$
This is **Kirchhoff's current law** applied to the parallel RC circuit shown in Fig. 1.26. The input current \(x(t)\) splits into two branch currents:

- \(C\dfrac{dy(t)}{dt}\) — the **capacitor current**, proportional to the rate of change of voltage
- \(\dfrac{1}{R}y(t)\) — the **resistor current**, proportional to the voltage itself

**Symbol guide:** \(x(t)\) is the applied input current, \(y(t)\) is the output voltage across the parallel combination, \(C\) is capacitance in farads, \(R\) is resistance in ohms, and \(\dfrac{dy(t)}{dt}\) is the rate of change of the output voltage.

Because the equation contains a derivative, it describes how the output **evolves over time**, not just its value at one instant.

**When to use:** RC or RLC circuits where the output voltage or current changes over time.

### EXAM TRIGGER

RC/RLC circuits with "find the response."

#### Common Misuse

Solving for \(y(t)\) using only \(x(t)\) while ignoring the initial capacitor voltage \(y(t_0)\).

## 3. What Data Is Needed to Compute the Response

This formula gives the complete output \(y(t)\) for \(t \ge t_0\). It has two distinct parts:

**Part 1 — Initial-condition contribution:**
$$y(t_0)\,e^{-\frac{t-t_0}{RC}}$$
This is the stored capacitor voltage at \(t_0\), decaying exponentially with time constant \(RC\).

**Part 2 — Input contribution:**
$$\frac{1}{C}\int_{t_0}^{t}e^{-\frac{t-\tau}{RC}}x(\tau)\,d\tau$$
This accumulates the effect of the input \(x(\tau)\) over the interval from \(t_0\) to \(t\), each past input value weighted by an exponential decay.

**Minimal worked example:** If \(x(t) = 0\) for all \(t \ge t_0\), the integral term vanishes and the output becomes simply \(y(t) = y(t_0)\,e^{-(t-t_0)/(RC)}\). The stored capacitor voltage decays to zero even with no new input applied.

### EXAM TRIGGER

Questions asking for \(y(t)\) for \(t \ge t_0\).

#### Common Misuse

Using only the future input \(x(t)\) and forgetting that the system may already contain stored energy at \(t_0\).

$$y(t) = y(t_0)e^{-\frac{t-t_0}{RC}} + \frac{1}{C}\int_{t_0}^{t}e^{-\frac{t-\tau}{RC}}x(\tau)\,d\tau$$

## 4. State and Initial Conditions

A **state variable** stores the information from the past that is still needed to predict the future response. You do not need the entire history of the input — only the state at the starting time \(t_0\).

For the RC circuit, the required initial condition is the capacitor voltage:
$$v_c(t_0) = y(t_0)$$

For more complex passive RLC networks, you may need **both** initial capacitor voltages **and** initial inductor currents.

### QUICK CHECK

> If two identical RC circuits receive the same future input \(x(t)\) for \(t \ge t_0\), but start with different capacitor voltages, must their outputs match?

**No.** Because the initial condition \(y(t_0)\) contributes directly to the response through the term \(y(t_0)\,e^{-(t-t_0)/(RC)}\), different starting voltages produce different outputs even under identical future inputs.

---
**📌 Key Takeaways**
- A system maps inputs to outputs: \(y(t)=\mathcal{T}\{x(t)\}\); \(\mathcal{T}\) is an operator, not a scalar multiplier.
- The parallel RC circuit obeys \(x(t)=C\frac{dy(t)}{dt}+\frac{1}{R}y(t)\), splitting input current into capacitor and resistor branches.
- Full RC response: \(y(t)=y(t_0)e^{-\frac{t-t_0}{RC}}+\frac{1}{C}\int_{t_0}^{t}e^{-\frac{t-\tau}{RC}}x(\tau)\,d\tau\) — initial condition plus input contribution.
- Response prediction requires two data items: the future input over \([t_0,\,t]\) and the relevant initial condition (e.g., capacitor voltage \(y(t_0)\)).

*Next, we classify systems by properties such as linearity, causality, and stability.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InN5c3RlbV9vcGVyYXRvcl92aWV3IiwibGFiZWwiOiJTeXN0ZW0gYXMgaW5wdXQtb3V0cHV0IG1hcHBpbmciLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkluIHRoZSBub3RhdGlvbiBcXCh5KHQpPVxcbWF0aGNhbHtUfVxce3godClcXH1cXCksIHdoYXQgZG9lcyBcXChcXG1hdGhjYWx7VH1cXCkgcmVwcmVzZW50PyIsIm9wdGlvbnMiOlsiQS4gQSBjb25zdGFudCBtdWx0aXBsaWVkIGJ5IHRoZSBpbnB1dCBzaWduYWwiLCJCLiBUaGUgdGltZSB2YXJpYWJsZSBvZiB0aGUgc2lnbmFsIiwiQy4gVGhlIHN5c3RlbSBydWxlIG9yIG9wZXJhdG9yIHRoYXQgbWFwcyBpbnB1dCB0byBvdXRwdXQiLCJELiBUaGUgb3V0cHV0IHNpZ25hbCBpdHNlbGYiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJcXChcXG1hdGhjYWx7VH1cXCkgcmVwcmVzZW50cyB0aGUgc3lzdGVtIG9wZXJhdGlvbiBhcHBsaWVkIHRvIHRoZSBlbnRpcmUgaW5wdXQgc2lnbmFsIFxcKHgodClcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiQW4gb3BlcmF0b3IgaXMgbm90IG5lY2Vzc2FyaWx5IG11bHRpcGxpY2F0aW9uIGJ5IGEgY29uc3RhbnQuIiwiQiI6IlRoZSB0aW1lIHZhcmlhYmxlIGlzIFxcKHRcXCksIG5vdCBcXChcXG1hdGhjYWx7VH1cXCkuIiwiRCI6IlRoZSBvdXRwdXQgaXMgXFwoeSh0KVxcKSwgbm90IFxcKFxcbWF0aGNhbHtUfVxcKS4ifSwiaGludCI6IkFzayB3aGF0IG9iamVjdCBjaGFuZ2VzIFxcKHgodClcXCkgaW50byBcXCh5KHQpXFwpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBibG9jayBkaWFncmFtIGhhcyBzaWduYWxzIFxcKHhfMSh0KSx4XzIodCksXFxsZG90cyx4X2oodClcXCkgZW50ZXJpbmcgYSBzeXN0ZW0gYW5kIFxcKHlfMSh0KSx5XzIodCksXFxsZG90cyx5X2sodClcXCkgbGVhdmluZyBpdC4gV2hhdCBpcyB0aGUgYmVzdCBpbnRlcnByZXRhdGlvbj8iLCJvcHRpb25zIjpbIkEuIFRoZSBkaWFncmFtIHNob3dzIG9ubHkgb25lIGlucHV0IGFuZCBvbmUgb3V0cHV0LiIsIkIuIFRoZSBkaWFncmFtIHNob3dzIGEgbXVsdGlwbGUtaW5wdXQsIG11bHRpcGxlLW91dHB1dCBzeXN0ZW0uIiwiQy4gVGhlIGRpYWdyYW0gc2hvd3MgYSBzaWduYWwgd2l0aCBubyBzeXN0ZW0gbW9kZWwuIiwiRC4gVGhlIGRpYWdyYW0gc2hvd3MgdGhhdCBvdXRwdXRzIG11c3QgZXF1YWwgaW5wdXRzLiJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6Ik11bHRpcGxlIGFycm93cyBlbnRlcmluZyBhbmQgbGVhdmluZyBpbmRpY2F0ZSBhIE1JTU8gc3lzdGVtOiBzZXZlcmFsIGlucHV0cyBhcmUgbWFwcGVkIHRvIHNldmVyYWwgb3V0cHV0cy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGVyZSBhcmUgc2V2ZXJhbCBsYWJlbGVkIGlucHV0IGFuZCBvdXRwdXQgY2hhbm5lbHMuIiwiQyI6IlRoZSBjZW50cmFsIGJsb2NrIHJlcHJlc2VudHMgdGhlIHN5c3RlbSBtb2RlbCBvciBydWxlLiIsIkQiOiJBIHN5c3RlbSB0cmFuc2Zvcm1zIGlucHV0czsgb3V0cHV0cyBkbyBub3QgaGF2ZSB0byBlcXVhbCBpbnB1dHMuIn0sImhpbnQiOiJDb3VudCB0aGUgYXJyb3dzIGVudGVyaW5nIGFuZCBsZWF2aW5nIHRoZSBibG9jay4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoidGV4dGJvb2tfbWltb19ibG9ja19kaWFncmFtIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJhbmFseXNpc192c19kZXNpZ24iLCJsYWJlbCI6IkFuYWx5c2lzIHZlcnN1cyBkZXNpZ24iLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCB0YXNrIGlzIGEgc3lzdGVtcyBhbmFseXNpcyBwcm9ibGVtPyIsIm9wdGlvbnMiOlsiQS4gR2l2ZW4gYW4gaW5wdXQgYW5kIGEga25vd24gc3lzdGVtIG1vZGVsLCBjb21wdXRlIHRoZSBvdXRwdXQuIiwiQi4gSW52ZW50IGEgc3lzdGVtIHRoYXQgcHJvZHVjZXMgYSBkZXNpcmVkIG91dHB1dCBiZWhhdmlvci4iLCJDLiBDaG9vc2UgY29tcG9uZW50IHZhbHVlcyBiZWZvcmUgYW55IGlucHV0IGlzIHNwZWNpZmllZC4iLCJELiBSZW5hbWUgdGhlIGlucHV0IHNpZ25hbCBhcyB0aGUgb3V0cHV0IHNpZ25hbC4iXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJBbmFseXNpcyBtZWFucyB0aGUgc3lzdGVtIGFuZCBpbnB1dCBhcmUga25vd24sIGFuZCB0aGUgb3V0cHV0IGlzIHRoZSB1bmtub3duLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoYXQgaXMgZGVzaWduIG9yIHN5bnRoZXNpcy4iLCJDIjoiVGhhdCBpcyBjbG9zZXIgdG8gZGVzaWduLCBub3QgYW5hbHlzaXMuIiwiRCI6IkEgc3lzdGVtIGdlbmVyYWxseSB0cmFuc2Zvcm1zIHRoZSBpbnB1dDsgdGhlIG5hbWVzIGFyZSBub3QgaW50ZXJjaGFuZ2VhYmxlLiJ9LCJoaW50IjoiQW5hbHlzaXMgYXNrczogd2hhdCBvdXRwdXQgZG9lcyB0aGlzIGtub3duIHN5c3RlbSBwcm9kdWNlPyIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6InJjX2RpZmZlcmVudGlhbF9lcXVhdGlvbiIsImxhYmVsIjoiUkMgY2lyY3VpdCByZXNwb25zZSBlcXVhdGlvbiIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHRoZSBSQyBjaXJjdWl0IGluIHRoaXMgc2VjdGlvbiwgdGhlIGVxdWF0aW9uIFxcKHgodCk9Q1xcZnJhY3tkeSh0KX17ZHR9K1xcZnJhY3sxfXtSfXkodClcXCkgc2F5cyB0aGF0IHRoZSBpbnB1dCBjdXJyZW50IHNwbGl0cyBpbnRvIHdoaWNoIHR3byBjdXJyZW50cz8iLCJvcHRpb25zIjpbIkEuIENhcGFjaXRvciBjdXJyZW50IGFuZCByZXNpc3RvciBjdXJyZW50IiwiQi4gVHdvIGVxdWFsIGNhcGFjaXRvciBjdXJyZW50cyIsIkMuIElucHV0IHZvbHRhZ2UgYW5kIG91dHB1dCB2b2x0YWdlIiwiRC4gUGFzdCBjdXJyZW50IGFuZCBmdXR1cmUgY3VycmVudCJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlRoZSB0ZXJtIFxcKENcXGZyYWN7ZHkodCl9e2R0fVxcKSBpcyBjYXBhY2l0b3IgY3VycmVudCwgYW5kIFxcKFxcZnJhY3sxfXtSfXkodClcXCkgaXMgcmVzaXN0b3IgY3VycmVudC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJPbmx5IG9uZSB0ZXJtIGlzIHRoZSBjYXBhY2l0b3IgY3VycmVudC4iLCJDIjoiVGhlIGVxdWF0aW9uIGlzIHdyaXR0ZW4gaW4gY3VycmVudHMsIG5vdCBhcyBhIHN1bSBvZiB2b2x0YWdlcy4iLCJEIjoiVGhlIHRlcm1zIGFyZSBjaXJjdWl0LWJyYW5jaCBjdXJyZW50cywgbm90IHRpbWUgY2F0ZWdvcmllcy4ifSwiaGludCI6Ik1hdGNoIGVhY2ggdGVybSB0byBhIGJyYW5jaCBpbiB0aGUgcGFyYWxsZWwgUkMgY2lyY3VpdC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoidGV4dGJvb2tfcmNfY2lyY3VpdCIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2h5IGlzIFxcKHgodCk9Q1xcZnJhY3tkeSh0KX17ZHR9K1xcZnJhY3sxfXtSfXkodClcXCkgYSBkaWZmZXJlbnRpYWwgZXF1YXRpb24/Iiwib3B0aW9ucyI6WyJBLiBJdCBjb250YWlucyBib3RoIGlucHV0IGFuZCBvdXRwdXQgc2lnbmFscy4iLCJCLiBJdCBjb250YWlucyB0aGUgZGVyaXZhdGl2ZSBcXChcXGZyYWN7ZHkodCl9e2R0fVxcKS4iLCJDLiBJdCBjb250YWlucyB0aGUgY29uc3RhbnRzIFxcKFJcXCkgYW5kIFxcKENcXCkuIiwiRC4gSXQgdXNlcyBwYXJlbnRoZXNlcyBhcm91bmQgXFwodFxcKS4iXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJBIGRpZmZlcmVudGlhbCBlcXVhdGlvbiByZWxhdGVzIGEgZnVuY3Rpb24gdG8gb25lIG9yIG1vcmUgb2YgaXRzIGRlcml2YXRpdmVzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IklucHV0LW91dHB1dCByZWxhdGlvbnNoaXBzIGFyZSBub3QgYXV0b21hdGljYWxseSBkaWZmZXJlbnRpYWwgZXF1YXRpb25zLiIsIkMiOiJDb25zdGFudHMgZG8gbm90IG1ha2UgYW4gZXF1YXRpb24gZGlmZmVyZW50aWFsLiIsIkQiOiJGdW5jdGlvbiBub3RhdGlvbiBkb2VzIG5vdCBtYWtlIGFuIGVxdWF0aW9uIGRpZmZlcmVudGlhbC4ifSwiaGludCI6Ikxvb2sgZm9yIGEgcmF0ZS1vZi1jaGFuZ2UgdGVybS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImluaXRpYWxfY29uZGl0aW9uX2FuZF9yZXNwb25zZSIsImxhYmVsIjoiSW5pdGlhbCBjb25kaXRpb24gYW5kIHJlc3BvbnNlIGNvbXB1dGF0aW9uIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3A0X3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJbiB0aGUgcmVzcG9uc2UgZm9ybXVsYSBcXCh5KHQpPXkodF8wKWVeey1cXGZyYWN7dC10XzB9e1JDfX0rXFxmcmFjezF9e0N9XFxpbnRfe3RfMH1ee3R9ZV57LVxcZnJhY3t0LVxcdGF1fXtSQ319eChcXHRhdSlcXCxkXFx0YXVcXCksIHdoaWNoIHBhcnQgcmVwcmVzZW50cyB0aGUgZWZmZWN0IG9mIHRoZSBpbml0aWFsIGNvbmRpdGlvbj8iLCJvcHRpb25zIjpbIkEuIFxcKHkodF8wKWVeey1cXGZyYWN7dC10XzB9e1JDfX1cXCkiLCJCLiBcXChcXGZyYWN7MX17Q31cXGludF97dF8wfV57dH1lXnstXFxmcmFje3QtXFx0YXV9e1JDfX14KFxcdGF1KVxcLGRcXHRhdVxcKSIsIkMuIE9ubHkgXFwoeChcXHRhdSlcXCkiLCJELiBPbmx5IFxcKFJDXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGhlIGZhY3RvciBcXCh5KHRfMClcXCkgaXMgdGhlIHN0YXJ0aW5nIG91dHB1dCBvciBjYXBhY2l0b3Igdm9sdGFnZSwgYW5kIGl0cyBjb250cmlidXRpb24gZGVjYXlzIGV4cG9uZW50aWFsbHkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhlIGludGVncmFsIHRlcm0gcmVwcmVzZW50cyB0aGUgY29udHJpYnV0aW9uIG9mIHRoZSBpbnB1dCBvdmVyIHRoZSBpbnRlcnZhbC4iLCJDIjoiXFwoeChcXHRhdSlcXCkgaXMgdGhlIGlucHV0IHNpZ25hbCBpbnNpZGUgdGhlIGludGVncmFsLCBub3QgdGhlIGluaXRpYWwgY29uZGl0aW9uLiIsIkQiOiJcXChSQ1xcKSBpcyB0aGUgdGltZSBjb25zdGFudCwgbm90IHRoZSBpbml0aWFsLWNvbmRpdGlvbiB0ZXJtLiJ9LCJoaW50IjoiRmluZCB0aGUgdGVybSBjb250YWluaW5nIFxcKHkodF8wKVxcKS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDRfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IlR3byBpZGVudGljYWwgUkMgY2lyY3VpdHMgcmVjZWl2ZSB0aGUgc2FtZSBpbnB1dCBcXCh4KHQpXFwpIGZvciBcXCh0XFxnZSB0XzBcXCksIGJ1dCBvbmUgc3RhcnRzIHdpdGggXFwoeSh0XzApPTBcXCkgYW5kIHRoZSBvdGhlciBzdGFydHMgd2l0aCBcXCh5KHRfMCk9NVxcKS4gTXVzdCB0aGVpciBmdXR1cmUgb3V0cHV0cyBiZSBpZGVudGljYWw/Iiwib3B0aW9ucyI6WyJBLiBZZXMsIGJlY2F1c2UgdGhlIGZ1dHVyZSBpbnB1dCBpcyBpZGVudGljYWwuIiwiQi4gWWVzLCBiZWNhdXNlIGlkZW50aWNhbCBjaXJjdWl0cyBhbHdheXMgaGF2ZSBpZGVudGljYWwgb3V0cHV0cy4iLCJDLiBObywgYmVjYXVzZSBkaWZmZXJlbnQgaW5pdGlhbCBjb25kaXRpb25zIGNvbnRyaWJ1dGUgdG8gdGhlIHJlc3BvbnNlLiIsIkQuIE5vLCBiZWNhdXNlIHRoZSByZXNpc3RvciB2YWx1ZSBkaXNhcHBlYXJzIGZyb20gdGhlIGVxdWF0aW9uLiJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IkZvciBzeXN0ZW1zIHdpdGggc3RvcmVkIGVuZXJneSwgdGhlIGZ1dHVyZSByZXNwb25zZSBkZXBlbmRzIG9uIGJvdGggZnV0dXJlIGlucHV0IGFuZCBpbml0aWFsIHN0YXRlLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBmdXR1cmUgaW5wdXQgaXMgbm90IHRoZSBvbmx5IHJlcXVpcmVkIGRhdGEuIiwiQiI6IklkZW50aWNhbCBjaXJjdWl0cyBjYW4gcmVzcG9uZCBkaWZmZXJlbnRseSBpZiB0aGVpciBzdG9yZWQgaW5pdGlhbCBlbmVyZ3kgZGlmZmVycy4iLCJEIjoiVGhlIHJlc2lzdG9yIHJlbWFpbnMgaW4gdGhlIHJlc3BvbnNlIHRocm91Z2ggdGhlIGZhY3RvciBcXChSQ1xcKS4ifSwiaGludCI6Ikxvb2sgYXQgdGhlIHRlcm0gY29udGFpbmluZyBcXCh5KHRfMClcXCkuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6InJjX2luaXRpYWxfY29uZGl0aW9uX2NvbXBhcmlzb25fdXNpbmdfdGV4dGJvb2tfY2lyY3VpdCIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwNF9xMyIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiU3RhdGUgdGhlIHR3byBraW5kcyBvZiBpbmZvcm1hdGlvbiBuZWVkZWQgdG8gY29tcHV0ZSB0aGUgcmVzcG9uc2UgXFwoeSh0KVxcKSBmb3IgXFwodFxcZ2UgdF8wXFwpIGluIHRoZSBSQyBleGFtcGxlLiIsImlkZWFsX2Fuc3dlciI6IldlIG5lZWQgdGhlIGlucHV0IHNpZ25hbCBvdmVyIHRoZSBpbnRlcnZhbCBmcm9tIFxcKHRfMFxcKSB0byBcXCh0XFwpLCBhbmQgdGhlIHJlbGV2YW50IGluaXRpYWwgY29uZGl0aW9uIGF0IFxcKHRfMFxcKSwgaGVyZSB0aGUgY2FwYWNpdG9yL291dHB1dCB2b2x0YWdlIFxcKHkodF8wKT12X2ModF8wKVxcKS4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IG1lbnRpb24gaW5wdXQgb3ZlciB0aGUgaW50ZXJ2YWwgZnJvbSBcXCh0XzBcXCkgdG8gXFwodFxcKSIsIk11c3QgbWVudGlvbiB0aGUgaW5pdGlhbCBjb25kaXRpb24gYXQgXFwodF8wXFwpIiwiTXVzdCBpZGVudGlmeSB0aGUgUkMgaW5pdGlhbCBjb25kaXRpb24gYXMgY2FwYWNpdG9yIHZvbHRhZ2Ugb3Igb3V0cHV0IHZvbHRhZ2UiXSwiZXhwbGFuYXRpb24iOiJUaGlzIGNoZWNrcyB3aGV0aGVyIHRoZSBzdHVkZW50IHVuZGVyc3RhbmRzIHRoZSByZXNwb25zZS1kYXRhIGlkZWEgcmF0aGVyIHRoYW4gb25seSBtZW1vcml6aW5nIGZvcm11bGFzLiIsImhpbnQiOiJPbmUgcGllY2UgY29tZXMgZnJvbSBvdXRzaWRlIHRoZSBzeXN0ZW07IG9uZSBwaWVjZSBpcyBzdG9yZWQgaW5zaWRlIHRoZSBzeXN0ZW0uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19XX0=" style="display:none;"></div>%%KC_END%%
