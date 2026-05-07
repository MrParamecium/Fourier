%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImdlbmVyYXRlZF9pbWFnZSIsInJhdGlvbmFsZSI6IlRoaXMgc2VjdGlvbiBpcyBhIGNvbXBhY3QgZm9ybXVsYSByZWZlcmVuY2UgcGFnZSB3aXRoIG5vIHVzYWJsZSB0ZXh0Ym9vayBmaWd1cmVzLiBBIGdlbmVyYXRlZCBsZWN0dXJlLW5vdGVzIHZpc3VhbCBpcyB0aGUgc3Ryb25nZXN0IHdheSB0byBvcmdhbml6ZSBkZXJpdmF0aXZlIGZhbWlsaWVzLCBzaG93IHRoZSBkZWNpc2lvbiBwYXRoIGZvciBjaG9vc2luZyBhIHJ1bGUsIGFuZCBleHBvc2UgY29tbW9uIHRyYXBzIGNsZWFybHkuIiwiY3JhbSI6IlVzZSBvbmUgY2xlYW4gdmlzdWFsIGFzIGEgZmFzdCBydWxlLXBpY2tlcjogcG93ZXIsIHByb2R1Y3QsIHF1b3RpZW50LCBleHBvbmVudGlhbC9sb2csIHRyaWcsIGludmVyc2UgdHJpZy4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgdmlzdWFsIHRvIGNvbm5lY3QgZWFjaCBmb3JtdWxhIGZhbWlseSB0byBvbmUgcmVwcmVzZW50YXRpdmUgZm9ybSBhbmQgaXRzIGRlcml2YXRpdmUgcGF0dGVybi4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhlIHZpc3VhbCB0byBleHBvc2Ugd2hlcmUgc3R1ZGVudHMgbG9zZSBwb2ludHM6IGZvcmdldHRpbmcgdGhlIGlubmVyIGRlcml2YXRpdmUsIG1pc2hhbmRsaW5nIGNvbnN0YW50cywgYW5kIGNvbmZ1c2luZyBpbnZlcnNlIHRyaWcgZGVyaXZhdGl2ZXMgd2l0aCByZWNpcHJvY2FsIHRyaWcuIn0=" style="display:none;"></div>%%KC_END%%
# B.8-7 Common Derivative Formulas

> **Objective:** Build a fast, reliable system for choosing and applying derivative rules — not a list of formulas to memorize in isolation.

This page is a compact derivative toolbox, not a full derivation lesson. You will learn three things: how to identify which rule applies before you differentiate, how the chain rule quietly operates inside formulas like \(\ln(ax)\), \(e^{bx}\), \(\sin(ax)\), and \(\tan^{-1}(ax)\), and which formulas carry the highest exam error rate. Strong exam performance starts with seeing structure first — is this a power, a product or quotient, an outer function wrapping an inner expression, or an inverse trig form? The lesson groups these formulas into a fast decision system rather than a random list.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIGl0IGFzIGEgcXVpY2sgcnVsZS1zZWxlY3Rpb24gbWFwIGJlZm9yZSBzb2x2aW5nLiIsInN0YW5kYXJkIjoiVXNlIGl0IHRvIGNvbm5lY3QgZWFjaCBmb3JtdWxhIGZhbWlseSB0byB0aGUgcmlnaHQgcGF0dGVybi4iLCJ0b3Bfc2NvcmUiOiJVc2UgaXQgdG8gc2VwYXJhdGUgc2ltaWxhci1sb29raW5nIGNhc2VzIGFuZCBoaWdobGlnaHQgdHJhcCB6b25lcy4ifQ==" style="display:none;"></div>%%KC_END%%
*🎨 Derivative rule decision map: classify the expression first, then apply the matching formula. Red boxes mark the two most common exam errors.*
![Illustration](/generated/gptimage2-1777220515045-8307.png)

## 1. Structure First: Which Derivative Rule Are You Actually Using?

Most differentiation errors happen before the pencil moves — students jump to a formula without classifying the expression. Train yourself to ask one question first: **what is the overall shape of this expression?**

Follow this order:

- If the expression is \(x\) raised to a power, use the **power rule**.
- If two expressions are **multiplied**, use the **product rule**.
- If one expression is **divided** by another, use the **quotient rule**.
- If a standard function contains \(ax\) or another inner expression, apply the listed formula **together with the chain rule**.

#### Warning

\(\frac{d}{dx}(uv) \neq \frac{du}{dx} \cdot \frac{dv}{dx}\). Multiplying the two separate derivatives is a fundamental error.

The chain rule is the hidden parent rule behind \(\ln(ax)\), \(e^{bx}\), \(\sin(ax)\), \(\cos(ax)\), \(\tan(ax)\), and all inverse trig forms. Every time you see a standard function wrapping an inner expression, the chain rule is operating — even when the formula looks self-contained.

$$\frac{d}{dx}f(u)=\frac{df}{du}\cdot\frac{du}{dx}$$
*This is the master rule behind every formula where \(x\) first passes through an inner expression such as \(ax\): differentiate the outer function with respect to \(u\), then multiply by the derivative of \(u\) with respect to \(x\).*

## 2. High-Yield Formula Families and the Traps Behind Them

Group the formulas into four exam-relevant families and learn the trap in each.

### ALGEBRAIC / PRODUCT-QUOTIENT

The product rule requires **two terms**, each keeping one original factor. The quotient rule requires careful sign placement: the numerator term with the minus sign uses \(u\) differentiated, not \(v\).

### LOGARITHMIC-EXPONENTIAL

**Trap 1 — \(\ln(ax)\):** Many students write \(a/x\) instead of \(1/x\). The chain rule gives \(\frac{1}{ax} \cdot a = \frac{1}{x}\); the \(a\) cancels. Writing \(a/x\) means you applied the outer derivative but forgot the denominator already contains \(a\).

**Trap 2 — \(a^{bx}\):** Students forget the \(\ln a\) factor. Base-\(e\) exponentials absorb this factor silently, but any other base requires it explicitly.

### TRIGONOMETRIC

**Trap 3 — \(\cos(ax)\):** The derivative of cosine is **negative** sine. The minus sign is easy to drop under exam pressure, especially when the chain-rule factor \(a\) is also present.

### INVERSE TRIGONOMETRIC

**Trap 4 — \(\tan^{-1}(ax)\):** Students confuse this with \(1/\tan(ax)\) and attempt a quotient rule. The notation \(\tan^{-1}\) means the **inverse tangent function**, not a reciprocal.

### TOP SCORE INSIGHT

Formulas with \(ax\) inside may simplify more than expected because the inner derivative \(a\) can cancel — as in \(\frac{d}{dx}\ln(ax) = \frac{1}{x}\). However, do not assume cancellation unless the chain rule actually produces it. Write the chain rule step explicitly, then simplify.

$$\frac{d}{dx}\ln(ax)=\frac{1}{x} \qquad \frac{d}{dx}a^{bx}=b(\ln a)\,a^{bx} \qquad \frac{d}{dx}\bigl(\tan^{-1}(ax)\bigr)=\frac{a}{1+a^2x^2}$$
*These three formulas are high-frequency exam targets because they look deceptively simple yet each hides a different idea: the first involves a cancellation that students often miss, the second requires a base-change factor \(\ln a\) that disappears only when the base is \(e\), and the third uses inverse-trig structure that is completely unrelated to the reciprocal of a trig function.*

## 3. How to Write Safe Exam Solutions

High scorers protect marks by showing enough structure to make the rule visible, not just writing the final answer.

Use this three-step habit on every differentiation problem:

1. **Name the rule** — state whether you are using the power rule, product rule, chain rule, etc.
2. **Differentiate the outer form** — apply the formula to the main function.
3. **Multiply by the inner derivative** if needed, then simplify carefully.

**Example 1:** For \(y = \sin(3x)\), the outer sine differentiates to cosine, then the chain rule multiplies by the inner derivative of \(3x\), which is \(3\). Result: \(y' = 3\cos(3x)\).

**Example 2:** For \(y = \ln(5x)\), the chain rule gives \(\frac{1}{5x} \cdot 5\). The factor \(5\) in the numerator cancels with the \(5\) in the denominator, leaving \(y' = \frac{1}{x}\). Writing the intermediate step makes the cancellation visible and earns method marks.

High scorers protect marks by writing enough structure to show the rule, not just the final line.

---
**📌 Key Takeaways**
- Classify the expression first — power, product, quotient, or outer-inner — before choosing any rule.
- The chain rule is the hidden engine inside \(\ln(ax)\), \(e^{bx}\), \(\sin(ax)\), and all inverse trig formulas.
- Inverse trig notation such as \(\tan^{-1}(ax)\) means inverse function, never reciprocal trig.

*In the next section we will use these formulas as tools rather than memorizing them in isolation.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJ1bGVfaWRlbnRpZmljYXRpb25fYW5kX3N0cnVjdHVyZSIsImxhYmVsIjoiSWRlbnRpZnkgdGhlIGNvcnJlY3QgZGlmZmVyZW50aWF0aW9uIHN0cnVjdHVyZSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggcnVsZSBpcyB0aGUgbWFpbiBzdGFydGluZyBwb2ludCBmb3IgZGlmZmVyZW50aWF0aW5nIFxcKHkgPSAoeF4yICsgMSllXnszeH1cXCk/Iiwib3B0aW9ucyI6WyJBLiBQb3dlciBydWxlIG9ubHkiLCJCLiBQcm9kdWN0IHJ1bGUiLCJDLiBRdW90aWVudCBydWxlIiwiRC4gSW52ZXJzZSB0cmlnb25vbWV0cmljIHJ1bGUiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgZXhwcmVzc2lvbiBpcyBhIHByb2R1Y3Qgb2YgdHdvIG5vbnRyaXZpYWwgZmFjdG9ycywgc28gdGhlIHByb2R1Y3QgcnVsZSBpcyB0aGUgY29ycmVjdCBzdGFydGluZyBzdHJ1Y3R1cmUuIFRoZSBleHBvbmVudGlhbCBmYWN0b3Igd2lsbCBhbHNvIHJlcXVpcmUgY2hhaW4tcnVsZSBhd2FyZW5lc3MgaW5zaWRlIFxcKGVeezN4fVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJQb3dlciBydWxlIGFsb25lIGNhbm5vdCBkaWZmZXJlbnRpYXRlIGEgcHJvZHVjdCBvZiB0d28gc2VwYXJhdGUgZmFjdG9ycy4iLCJDIjoiVGhlcmUgaXMgbm8gZGl2aXNpb24gc3RydWN0dXJlIGhlcmUuIiwiRCI6Ik5vIGludmVyc2UgdHJpZ29ub21ldHJpYyBmdW5jdGlvbiBhcHBlYXJzLiJ9LCJoaW50IjoiQ2xhc3NpZnkgdGhlIHdob2xlIGV4cHJlc3Npb24gYmVmb3JlIGxvb2tpbmcgaW5zaWRlIGVhY2ggZmFjdG9yLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBzdHVkZW50IHdyaXRlcyBcXChcXGZyYWN7ZH17ZHh9KHV2KSA9IFxcZnJhY3tkdX17ZHh9IFxcY2RvdCBcXGZyYWN7ZHZ9e2R4fVxcKS4gV2hhdCBpcyB0aGUgYmVzdCBjb3JyZWN0aW9uPyIsIm9wdGlvbnMiOlsiQS4gXFwoXFxmcmFje2R9e2R4fSh1dikgPSB1XFxmcmFje2R2fXtkeH0gKyB2XFxmcmFje2R1fXtkeH1cXCkiLCJCLiBcXChcXGZyYWN7ZH17ZHh9KHV2KSA9IFxcZnJhY3tkdX17ZHh9ICsgXFxmcmFje2R2fXtkeH1cXCkiLCJDLiBcXChcXGZyYWN7ZH17ZHh9KHV2KSA9IFxcZnJhY3t1fXt2fVxcKSIsIkQuIFxcKFxcZnJhY3tkfXtkeH0odXYpID0gdXZcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJUaGUgZGVyaXZhdGl2ZSBvZiBhIHByb2R1Y3QgaXMgdGhlIHN1bSBvZiB0d28gdGVybXMsIGVhY2gga2VlcGluZyBvbmUgb3JpZ2luYWwgZmFjdG9yIGFuZCBkaWZmZXJlbnRpYXRpbmcgdGhlIG90aGVyLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoaXMgZHJvcHMgdGhlIG9yaWdpbmFsIGZhY3RvcnMgXFwodVxcKSBhbmQgXFwodlxcKSwgc28gaXQgaXMgbm90IHRoZSBwcm9kdWN0IHJ1bGUuIiwiQyI6IlRoaXMgaXMgdW5yZWxhdGVkIHRvIGRpZmZlcmVudGlhdGlvbi4iLCJEIjoiVGhpcyBzaW1wbHkgcmVwZWF0cyB0aGUgb3JpZ2luYWwgcHJvZHVjdC4ifSwiaGludCI6IkluIHRoZSBwcm9kdWN0IHJ1bGUsIG9uZSBmYWN0b3Igc3RheXMgd2hpbGUgdGhlIG90aGVyIGdldHMgZGlmZmVyZW50aWF0ZWQuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJjaGFpbl9ydWxlX2FuZF9zdGFuZGFyZF9mb3JtcyIsImxhYmVsIjoiQXBwbHkgY2hhaW4gcnVsZSBpbnNpZGUgc3RhbmRhcmQgZm9ybXVsYXMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoYXQgaXMgXFwoXFxmcmFje2R9e2R4fVtcXHNpbig0eCldXFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoXFxjb3MoNHgpXFwpIiwiQi4gXFwoNFxcY29zKDR4KVxcKSIsIkMuIFxcKC00XFxzaW4oNHgpXFwpIiwiRC4gXFwoNFxcc2luKDR4KVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkRpZmZlcmVudGlhdGUgdGhlIG91dGVyIHNpbmUgdG8gY29zaW5lLCB0aGVuIG11bHRpcGx5IGJ5IHRoZSBpbm5lciBkZXJpdmF0aXZlIG9mIFxcKDR4XFwpLCB3aGljaCBpcyBcXCg0XFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgZm9yZ2V0cyB0aGUgY2hhaW4tcnVsZSBmYWN0b3IgXFwoNFxcKS4iLCJDIjoiVGhpcyB1c2VzIHRoZSBkZXJpdmF0aXZlIHBhdHRlcm4gb2YgY29zaW5lLCBub3Qgc2luZS4iLCJEIjoiVGhlIG91dGVyIGRlcml2YXRpdmUgb2Ygc2luZSBpcyBjb3NpbmUsIG5vdCBzaW5lLiJ9LCJoaW50IjoiT3V0ZXIgZnVuY3Rpb24gZmlyc3QsIGlubmVyIGRlcml2YXRpdmUgc2Vjb25kLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hhdCBpcyBcXChcXGZyYWN7ZH17ZHh9W1xcbG4oN3gpXVxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKFxcZnJhY3sxfXs3eH1cXCkiLCJCLiBcXChcXGZyYWN7N317eH1cXCkiLCJDLiBcXChcXGZyYWN7MX17eH1cXCkiLCJELiBcXChcXGxuIDdcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJVc2luZyB0aGUgY2hhaW4gcnVsZSBnaXZlcyBcXChcXGZyYWN7MX17N3h9IFxcY2RvdCA3ID0gXFxmcmFjezF9e3h9XFwpLiBUaGlzIGlzIGEgY2xhc3NpYyBjYW5jZWxsYXRpb24gY2FzZS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIGFwcGxpZXMgb25seSB0aGUgb3V0ZXIgZGVyaXZhdGl2ZSBhbmQgZm9yZ2V0cyB0aGUgaW5uZXIgZGVyaXZhdGl2ZSBcXCg3XFwpLiIsIkIiOiJUaGlzIG11bHRpcGxpZXMgYnkgXFwoN1xcKSBidXQgZm9yZ2V0cyB0aGUgZGVub21pbmF0b3IgaXMgXFwoN3hcXCkgYmVmb3JlIGNhbmNlbGxhdGlvbi4iLCJEIjoiVGhlIGRlcml2YXRpdmUgb2YgXFwoXFxsbig3eClcXCkgaXMgbm90IGEgY29uc3RhbnQuIn0sImhpbnQiOiJXcml0ZSB0aGUgY2hhaW4gcnVsZSBleHBsaWNpdGx5IGJlZm9yZSBzaW1wbGlmeWluZy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImZvcm11bGFfc3BlY2lmaWNfdHJhcHMiLCJsYWJlbCI6IkF2b2lkIGNvbW1vbiB0cmFwIGZvcm11bGFzIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBpcyB0aGUgY29ycmVjdCBkZXJpdmF0aXZlIG9mIFxcKHkgPSA1XnsyeH1cXCk/Iiwib3B0aW9ucyI6WyJBLiBcXCgyIFxcY2RvdCA1XnsyeH1cXCkiLCJCLiBcXCgoXFxsbiA1KVxcLDVeezJ4fVxcKSIsIkMuIFxcKDIoXFxsbiA1KVxcLDVeezJ4fVxcKSIsIkQuIFxcKDEwXnsyeH1cXCkiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJGb3IgXFwoYV57dX1cXCksIGRpZmZlcmVudGlhdGUgYXMgXFwoYV57dX0oXFxsbiBhKVxcLHUnXFwpLiBIZXJlIFxcKGEgPSA1XFwpIGFuZCBcXCh1ID0gMnhcXCksIHNvIHRoZSBmYWN0b3IgaXMgXFwoMlxcbG4gNVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIGZvcmdldHMgdGhlIHJlcXVpcmVkIFxcKFxcbG4gNVxcKSBmYWN0b3IgZm9yIGJhc2UtNSBleHBvbmVudGlhbHMuIiwiQiI6IlRoaXMgaW5jbHVkZXMgXFwoXFxsbiA1XFwpIGJ1dCBmb3JnZXRzIHRoZSBpbm5lciBkZXJpdmF0aXZlIG9mIFxcKDJ4XFwpLiIsIkQiOiJUaGlzIGlzIG5vdCBhIGRlcml2YXRpdmUgcnVsZSBhbmQgY2hhbmdlcyB0aGUgYmFzZSBpbmNvcnJlY3RseS4ifSwiaGludCI6IkJhc2UgXFwoZVxcKSBiZWhhdmVzIGRpZmZlcmVudGx5IGZyb20gYmFzZSBcXChhXFwpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hhdCBpcyBcXChcXGZyYWN7ZH17ZHh9W1xcY29zKDN4KV1cXCk/Iiwib3B0aW9ucyI6WyJBLiBcXCgzXFxzaW4oM3gpXFwpIiwiQi4gXFwoLTNcXHNpbigzeClcXCkiLCJDLiBcXCgtXFxzaW4oM3gpXFwpIiwiRC4gXFwoM1xcY29zKDN4KVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBkZXJpdmF0aXZlIG9mIGNvc2luZSBpcyBuZWdhdGl2ZSBzaW5lLCBhbmQgdGhlIGNoYWluIHJ1bGUgY29udHJpYnV0ZXMgdGhlIGZhY3RvciBcXCgzXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgbWlzc2VzIHRoZSBuZWdhdGl2ZSBzaWduLiIsIkMiOiJUaGlzIG1pc3NlcyB0aGUgY2hhaW4tcnVsZSBmYWN0b3IgXFwoM1xcKS4iLCJEIjoiVGhlIGRlcml2YXRpdmUgb2YgY29zaW5lIGlzIG5vdCBjb3NpbmUuIn0sImhpbnQiOiJDb3NpbmUgaXMgdGhlIHRyaWcgZGVyaXZhdGl2ZSB3aGVyZSB0aGUgbWludXMgc2lnbiBpcyBlYXN5IHRvIGxvc2UuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EzIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJBIGNsYXNzbWF0ZSBzYXlzIHRoYXQgXFwoXFx0YW5eey0xfShheClcXCkgbWVhbnMgXFwoXFxmcmFjezF9e1xcdGFuKGF4KX1cXCksIHNvIGl0cyBkZXJpdmF0aXZlIHNob3VsZCBjb21lIGZyb20gdGhlIHF1b3RpZW50IHJ1bGUuIEV4cGxhaW4gd2h5IHRoaXMgaXMgd3JvbmcgYW5kIGdpdmUgdGhlIGNvcnJlY3QgZGVyaXZhdGl2ZS4iLCJpZGVhbF9hbnN3ZXIiOiJcXChcXHRhbl57LTF9KGF4KVxcKSBtZWFucyB0aGUgaW52ZXJzZSB0YW5nZW50IGZ1bmN0aW9uLCBub3QgdGhlIHJlY2lwcm9jYWwgb2YgXFwoXFx0YW4oYXgpXFwpLiBJdHMgZGVyaXZhdGl2ZSBpcyBcXChcXGRmcmFje2F9ezEgKyBhXjJ4XjJ9XFwpIGJ5IHRoZSBpbnZlcnNlLXRyaWdvbm9tZXRyaWMgZGVyaXZhdGl2ZSBmb3JtdWxhIHRvZ2V0aGVyIHdpdGggdGhlIGNoYWluIHJ1bGUuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBzdGF0ZSB0aGF0IFxcKFxcdGFuXnstMX0oYXgpXFwpIGlzIGludmVyc2UgdGFuZ2VudCwgbm90IHJlY2lwcm9jYWwgdGFuZ2VudC4iLCJNdXN0IGdpdmUgdGhlIGNvcnJlY3QgZGVyaXZhdGl2ZSBcXChcXGRmcmFje2F9ezEgKyBhXjJ4XjJ9XFwpLiIsIk11c3QgbWVudGlvbiBjaGFpbi1ydWxlIGludm9sdmVtZW50IG9yIHRoZSBpbm5lciBkZXJpdmF0aXZlIFxcKGFcXCkuIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgb25lIG9mIHRoZSBtb3N0IGNvbW1vbiBub3RhdGlvbiBjb25mdXNpb25zIGluIGZvcm11bGEgc2hlZXRzLiIsImhpbnQiOiJBc2sgd2hldGhlciB0aGUgbm90YXRpb24gaXMgbmFtaW5nIGFuIGludmVyc2UgZnVuY3Rpb24gb3IgYSByZWNpcHJvY2FsIHF1YW50aXR5LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfV19" style="display:none;"></div>%%KC_END%%
