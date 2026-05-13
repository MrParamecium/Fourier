%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImdlbmVyYXRlZF9pbWFnZSIsInJhdGlvbmFsZSI6IlRoaXMgc2VjdGlvbiBoYXMgbm8gZXh0cmFjdGVkIHRleHRib29rIGZpZ3VyZXMgYXZhaWxhYmxlLCBidXQgdGhlIGNvcmUgaWRlYSBpcyBoaWdobHkgdmlzdWFsOiBjb3NpbmUgYW5kIHNpbmUgZW1lcmdlIGZyb20gYWRkaW5nIGFuZCBzdWJ0cmFjdGluZyB0d28gcm90YXRpbmcgY29tcGxleCBleHBvbmVudGlhbHMuIEEgY2xlYW4gZ2VuZXJhdGVkIHRlYWNoaW5nIGRpYWdyYW0gd2lsbCBjbGFyaWZ5IHRoZSBzdHJ1Y3R1cmUgZmFzdGVyIHRoYW4gdGV4dCBhbG9uZS4iLCJjcmFtIjoiVXNlIG9uZSBkaWFncmFtIHRvIGxvY2sgaW4gdGhlIHBhdHRlcm46IGFkZCBleHBvbmVudGlhbHMgZm9yIGNvc2luZSwgc3VidHJhY3QgYW5kIGRpdmlkZSBieSAyaiBmb3Igc2luZS4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgdmlzdWFsIHRvIHNob3cgaG93IEV1bGVyJ3MgZm9ybXVsYSBzcGxpdHMgaW50byByZWFsIGFuZCBpbWFnaW5hcnkgY29tcG9uZW50cyBhbmQgdGhlbiByZWNvbWJpbmVzIGludG8gY29zaW5lIGFuZCBzaW5lLiIsInRvcF9zY29yZSI6IlVzZSB0aGUgdmlzdWFsIHRvIGV4cG9zZSB0aGUgaGlnaC1yaXNrIGRpc3RpbmN0aW9uczogcGx1cyB2cyBtaW51cywgMS8yIHZzIDEvKDJqKSwgYW5kIHdoeSBjb3NpbmUgaXMgdGhlIHN5bW1ldHJpYyBjb21iaW5hdGlvbiB3aGlsZSBzaW5lIGlzIHRoZSBhbnRpc3ltbWV0cmljIG9uZS4ifQ==" style="display:none;"></div>%%KC_END%%
# B.2-2 Sinusoids in Terms of Exponentials

> **Section Objective:** Learn to rewrite cosine and sine as sums and differences of complex exponentials — a core algebraic tool in signals, phasors, and differential equations.

---

Here is the exam question you will encounter in many forms: *How do you convert a cosine or sine into exponentials?* This section gives you the exact tool.

Euler's formula packages cosine and sine together inside a single complex exponential. That packaging is useful because exponentials are far easier to manipulate algebraically than trigonometric functions — they multiply, divide, and differentiate cleanly. In signals and systems work, this trick appears constantly: convert sinusoids to exponentials, do the algebra, then convert back.

By the end of this section you will have two target formulas locked in:

$$
\cos\phi = \frac{e^{j\phi}+e^{-j\phi}}{2}, \qquad \sin\phi = \frac{e^{j\phi}-e^{-j\phi}}{2j}
$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiTWVtb3JpemUgdGhlIHZpc3VhbCBwYXR0ZXJuOiBzdW0gZ2l2ZXMgY29zaW5lLCBkaWZmZXJlbmNlIG92ZXIgMmogZ2l2ZXMgc2luZS4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgc3ltbWV0cnkgb2YgdGhlIHR3byBleHBvbmVudGlhbHMgdG8gdW5kZXJzdGFuZCB3aGVyZSBlYWNoIGZvcm11bGEgY29tZXMgZnJvbS4iLCJ0b3Bfc2NvcmUiOiJGb2N1cyBvbiB0aGUgc2lnbiBzdHJ1Y3R1cmUgYW5kIHNjYWxpbmcgZmFjdG9ycyB0byBhdm9pZCBmb3JtdWxhLW1peGluZyBlcnJvcnMgdW5kZXIgZXhhbSBwcmVzc3VyZS4ifQ==" style="display:none;"></div>%%KC_END%%
*🎨 The Euler conjugate pair splits cleanly: adding isolates cosine, subtracting and dividing by \(2j\) isolates sine.*
![Illustration](/generated/gptimage2-1777214451370-9968.png)

$$e^{j\phi}=\cos\phi + j\sin\phi, \qquad e^{-j\phi}=\cos\phi - j\sin\phi$$
*These are the two Euler identities at the heart of this section. The second is the complex conjugate of the first: replacing \(j\) with \(-j\) flips the sign on the sine term only, leaving the cosine term unchanged.*

## 1. Getting Cosine and Sine from Euler's Formula

Start by writing both Euler identities side by side and adding them:

$$
e^{j\phi} + e^{-j\phi} = (\cos\phi + j\sin\phi) + (\cos\phi - j\sin\phi) = 2\cos\phi
$$

The \(+j\sin\phi\) and \(-j\sin\phi\) terms cancel exactly, leaving \(2\cos\phi\). Divide both sides by 2 and you have the cosine formula.

Now subtract instead of adding:

$$
e^{j\phi} - e^{-j\phi} = (\cos\phi + j\sin\phi) - (\cos\phi - j\sin\phi) = 2j\sin\phi
$$

The cosine terms cancel, leaving \(2j\sin\phi\). Dividing by \(2j\) isolates sine.

### EXAM TRAPS

- **Trap 1:** Forgetting the factor \(\frac{1}{2}\) in the cosine formula — the sum gives \(2\cos\phi\), not \(\cos\phi\).
- **Trap 2:** Writing \(\sin\phi = \frac{e^{j\phi}-e^{-j\phi}}{2}\) — the denominator must be \(2j\), not \(2\).

### TOP SCORE INSIGHT

Cosine comes from the **symmetric** (even) combination of the pair — both exponentials contribute equally with the same sign. Sine comes from the **antisymmetric** (odd) combination — the two exponentials appear with opposite signs. Recognizing this symmetry structure makes it impossible to mix up the two formulas in later derivations.

$$\cos\phi = \frac{e^{j\phi}+e^{-j\phi}}{2}, \qquad \sin\phi = \frac{e^{j\phi}-e^{-j\phi}}{2j}$$
*These are the two conversion formulas to memorize. The safest mental shortcut: **cosine = average of the conjugate pair** (sum divided by 2); **sine = difference of the pair scaled by \(\frac{1}{2j}\)**. The factor \(j\) in the sine denominator is not optional — it is required because subtraction leaves \(2j\sin\phi\), and dividing by \(2j\) removes the \(j\) to recover the real-valued sine.*

Think of \(e^{j\phi}\) and \(e^{-j\phi}\) as two mirror-image arrows rotating in opposite directions — one tilted above the horizontal axis, one tilted below by the same angle. Each arrow has a horizontal component (cosine) and a vertical component (sine), but the vertical components point in opposite directions.

When you **add** the two arrows, the upward vertical part of one exactly cancels the downward vertical part of the other. What survives is purely horizontal: twice the cosine. Divide by 2 and you have \(\cos\phi\) alone.

When you **subtract** one arrow from the other, the horizontal parts are identical and cancel completely. What survives is purely vertical: twice the sine, scaled by \(j\). Divide by \(2j\) and you recover \(\sin\phi\) alone.

The mirror symmetry is the whole story. Cosine is what the two arrows share; sine is what makes them different.

## 2. What Exam Questions Are Really Testing Here

These formulas are not just identities to memorize — they are **algebraic tools**. The standard workflow is: convert sinusoids into exponentials, perform the algebra (multiply, differentiate, integrate), then convert back to sinusoids at the end.

### PATTERN RECOGNITION

Train yourself to read in both directions:

- See \(\cos\phi\)? Think: *two exponentials, plus sign, factor of \(\frac{1}{2}\)*.
- See \(\sin\phi\)? Think: *difference of exponentials, divide by \(2j\)*.

### HIGH-SCORE CAUTION

Do not confuse the angle \(\phi\) with amplitude or frequency notation — \(\phi\) is just the argument of the sinusoid, which may itself be a function like \(2\pi F_0 t + \theta\). Also, do not drop \(j\) during simplification just because the final answer is a real signal; \(j\) must be carried through until the algebra is complete.

### EXAM TIP

On exams, write the identity explicitly before substituting values. Writing \(\cos\phi = \frac{e^{j\phi}+e^{-j\phi}}{2}\) as a labeled step earns partial credit and prevents sign errors.

---
**📌 Key Takeaways**
- \(\cos\phi = \frac{e^{j\phi}+e^{-j\phi}}{2}\): sum of conjugate pair divided by 2.
- \(\sin\phi = \frac{e^{j\phi}-e^{-j\phi}}{2j}\): difference divided by \(2j\), not \(2\) — common trap.
- Cosine is the symmetric combination; sine is the antisymmetric one — use this to avoid mix-ups.

*In the next section we will sketch exponential signals and read their key shape features quickly.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImV1bGVyX3BhaXJfc3RydWN0dXJlIiwibGFiZWwiOiJVc2luZyB0aGUgRXVsZXIgcGFpciBjb3JyZWN0bHkiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHBhaXIgb2YgaWRlbnRpdGllcyBpcyBjb3JyZWN0PyIsIm9wdGlvbnMiOlsiQS4gXFwoZV57alxccGhpfT1cXGNvc1xccGhpK2pcXHNpblxccGhpXFwpIGFuZCBcXChlXnstalxccGhpfT1cXGNvc1xccGhpLWpcXHNpblxccGhpXFwpIiwiQi4gXFwoZV57alxccGhpfT1cXGNvc1xccGhpLWpcXHNpblxccGhpXFwpIGFuZCBcXChlXnstalxccGhpfT1cXGNvc1xccGhpK2pcXHNpblxccGhpXFwpIiwiQy4gXFwoZV57alxccGhpfT1cXHNpblxccGhpK2pcXGNvc1xccGhpXFwpIGFuZCBcXChlXnstalxccGhpfT1cXHNpblxccGhpLWpcXGNvc1xccGhpXFwpIiwiRC4gXFwoZV57alxccGhpfT1cXGNvc1xccGhpK2pcXHNpblxccGhpXFwpIGFuZCBcXChlXnstalxccGhpfT0tXFxjb3NcXHBoaStqXFxzaW5cXHBoaVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IkV1bGVyJ3MgZm9ybXVsYSBnaXZlcyBcXChlXntqXFxwaGl9PVxcY29zXFxwaGkralxcc2luXFxwaGlcXCkuIFJlcGxhY2luZyBcXChqXFwpIHdpdGggXFwoLWpcXCkgZmxpcHMgdGhlIHNpZ24gb2YgdGhlIHNpbmUgdGVybSBvbmx5LCBnaXZpbmcgXFwoZV57LWpcXHBoaX09XFxjb3NcXHBoaS1qXFxzaW5cXHBoaVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGUgc2lnbnMgYXJlIHJldmVyc2VkOyB0aGlzIHN3YXBzIHRoZSByb2xlcyBvZiB0aGUgdHdvIGV4cG9uZW50aWFscy4iLCJDIjoiQ29zaW5lIGFuZCBzaW5lIGFyZSBtaXNwbGFjZWQg4oCUIGNvc2luZSBiZWxvbmdzIHdpdGggdGhlIHJlYWwgcGFydC4iLCJEIjoiVGhlIGNvc2luZSB0ZXJtIGRvZXMgbm90IGNoYW5nZSBzaWduIHdoZW4gdGhlIGFuZ2xlIHNpZ24gZmxpcHM7IG9ubHkgdGhlIHNpbmUgdGVybSBkb2VzLiJ9LCJoaW50IjoiT25seSB0aGUgc2luZSB0ZXJtIGNoYW5nZXMgc2lnbiBiZXR3ZWVuIHRoZSBwYWlyLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2h5IGRvZXMgYWRkaW5nIFxcKGVee2pcXHBoaX1cXCkgYW5kIFxcKGVeey1qXFxwaGl9XFwpIGlzb2xhdGUgY29zaW5lPyIsIm9wdGlvbnMiOlsiQS4gVGhlIGNvc2luZSB0ZXJtcyBjYW5jZWwiLCJCLiBUaGUgc2luZSB0ZXJtcyBjYW5jZWwiLCJDLiBCb3RoIGNvc2luZSBhbmQgc2luZSB0ZXJtcyBkb3VibGUiLCJELiBUaGUgXFwoalxcKSB0ZXJtcyBkaXNhcHBlYXIgYmVjYXVzZSBcXChqPTBcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgXFwoK2pcXHNpblxccGhpXFwpIGFuZCBcXCgtalxcc2luXFxwaGlcXCkgdGVybXMgY2FuY2VsLCBsZWF2aW5nIFxcKDJcXGNvc1xccGhpXFwpLiBEaXZpZGluZyBieSAyIGdpdmVzIFxcKFxcY29zXFxwaGlcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiQ29zaW5lIHRlcm1zIGFkZDsgdGhleSBkbyBub3QgY2FuY2VsLiIsIkMiOiJPbmx5IGNvc2luZSBkb3VibGVzOyB0aGUgc2luZSB0ZXJtcyBjYW5jZWwgY29tcGxldGVseS4iLCJEIjoiXFwoalxcKSBpcyBub3QgemVybzsgY2FuY2VsbGF0aW9uIGNvbWVzIGZyb20gdGhlIG9wcG9zaXRlIHNpZ25zIG9uIHRoZSBzaW5lIHRlcm1zLiJ9LCJoaW50IjoiV3JpdGUgdGhlIHR3byBFdWxlciBleHByZXNzaW9ucyBkaXJlY3RseSB1bmRlciBlYWNoIG90aGVyIGFuZCBhZGQgdGVybSBieSB0ZXJtLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJvcGVuYWkvZ3B0LTUuNC1pbWFnZS0yIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJjb3NpbmVfc2luZV9jb252ZXJzaW9uIiwibGFiZWwiOiJDb252ZXJ0aW5nIGNvc2luZSBhbmQgc2luZSBpbnRvIGV4cG9uZW50aWFscyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggZXhwcmVzc2lvbiBlcXVhbHMgXFwoXFxzaW5cXHBoaVxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKFxcZGZyYWN7ZV57alxccGhpfStlXnstalxccGhpfX17Mn1cXCkiLCJCLiBcXChcXGRmcmFje2Vee2pcXHBoaX0tZV57LWpcXHBoaX19ezJ9XFwpIiwiQy4gXFwoXFxkZnJhY3tlXntqXFxwaGl9LWVeey1qXFxwaGl9fXsyan1cXCkiLCJELiBcXChcXGRmcmFje2Veey1qXFxwaGl9LWVee2pcXHBoaX19ezJqfVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlRoZSBzdGFuZGFyZCBpZGVudGl0eSBpcyBcXChcXHNpblxccGhpPVxcZnJhY3tlXntqXFxwaGl9LWVeey1qXFxwaGl9fXsyan1cXCkuIFN1YnRyYWN0aW5nIHRoZSBFdWxlciBwYWlyIGxlYXZlcyBcXCgyalxcc2luXFxwaGlcXCksIHNvIGRpdmlzaW9uIGJ5IFxcKDJqXFwpIGlzIHJlcXVpcmVkLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgaXMgdGhlIGNvc2luZSBmb3JtdWxhLCBub3Qgc2luZS4iLCJCIjoiVGhlIGRlbm9taW5hdG9yIGlzIG1pc3NpbmcgdGhlIGZhY3RvciBcXChqXFwpOyB0aGlzIGRvZXMgbm90IGVxdWFsIFxcKFxcc2luXFxwaGlcXCkuIiwiRCI6IlJldmVyc2luZyB0aGUgb3JkZXIgb2Ygc3VidHJhY3Rpb24gZ2l2ZXMgXFwoLVxcc2luXFxwaGlcXCksIG5vdCBcXChcXHNpblxccGhpXFwpLiJ9LCJoaW50IjoiU2luZSBjb21lcyBmcm9tIHRoZSBkaWZmZXJlbmNlLCBidXQgdGhlIGRlbm9taW5hdG9yIG11c3QgYWNjb3VudCBmb3IgdGhlIFxcKGpcXCkgdGhhdCByZW1haW5zIGFmdGVyIHN1YnRyYWN0aW9uLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggZXhwcmVzc2lvbiBlcXVhbHMgXFwoXFxjb3NcXHBoaVxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKFxcZGZyYWN7ZV57alxccGhpfStlXnstalxccGhpfX17Mn1cXCkiLCJCLiBcXChcXGRmcmFje2Vee2pcXHBoaX0tZV57LWpcXHBoaX19ezJqfVxcKSIsIkMuIFxcKFxcZGZyYWN7ZV57alxccGhpfS1lXnstalxccGhpfX17Mn1cXCkiLCJELiBcXChlXntqXFxwaGl9K2Veey1qXFxwaGl9XFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiQ29zaW5lIGlzIHRoZSBhdmVyYWdlIG9mIHRoZSBjb25qdWdhdGUgcGFpcjogXFwoXFxjb3NcXHBoaT1cXGZyYWN7ZV57alxccGhpfStlXnstalxccGhpfX17Mn1cXCkuIFRoZSBmYWN0b3IgXFwoXFxmcmFjezF9ezJ9XFwpIGlzIGVzc2VudGlhbC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGlzIGlzIHRoZSBzaW5lIGZvcm11bGEuIiwiQyI6IkEgZGlmZmVyZW5jZSBpc29sYXRlcyBzaW5lLXJlbGF0ZWQgdGVybXMsIG5vdCBjb3NpbmUuIiwiRCI6IlRoaXMgZXF1YWxzIFxcKDJcXGNvc1xccGhpXFwpLCBzbyBpdCBpcyBvZmYgYnkgYSBmYWN0b3Igb2YgMi4ifSwiaGludCI6IlRoaW5rOiBjb3NpbmUgPSBzeW1tZXRyaWMgYXZlcmFnZSBvZiB0aGUgcGFpci4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImV4YW1fdXNhZ2VfYW5kX3RyYXBzIiwibGFiZWwiOiJSZWNvZ25pemluZyBwcmFjdGljYWwgdXNlIGFuZCBhdm9pZGluZyB0cmFwcyIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJBIHN0dWRlbnQgd3JpdGVzIFxcKFxcc2luXFxwaGk9XFxmcmFje2Vee2pcXHBoaX0tZV57LWpcXHBoaX19ezJ9XFwpLiBXaGF0IGlzIHRoZSBtYWluIG1pc3Rha2U/Iiwib3B0aW9ucyI6WyJBLiBUaGUgb3JkZXIgb2YgdGhlIGV4cG9uZW50aWFscyBzaG91bGQgYmUgcmV2ZXJzZWQiLCJCLiBUaGUgZGVub21pbmF0b3Igc2hvdWxkIGJlIFxcKDJcXHBoaVxcKSIsIkMuIFRoZSBkZW5vbWluYXRvciBzaG91bGQgYmUgXFwoMmpcXCkiLCJELiBTaW5lIGNhbm5vdCBiZSB3cml0dGVuIHdpdGggZXhwb25lbnRpYWxzIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiU3VidHJhY3RpbmcgdGhlIEV1bGVyIHBhaXIgbGVhdmVzIFxcKDJqXFxzaW5cXHBoaVxcKSwgc28gZGl2aXNpb24gYnkgXFwoMmpcXCkgaXMgcmVxdWlyZWQgdG8gaXNvbGF0ZSBcXChcXHNpblxccGhpXFwpLiBXcml0aW5nIFxcKDJcXCkgaW4gdGhlIGRlbm9taW5hdG9yIGluc3RlYWQgb2YgXFwoMmpcXCkgbGVhdmVzIGFuIGV4dHJhIGZhY3RvciBvZiBcXChqXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlJldmVyc2luZyB0aGUgb3JkZXIgd291bGQgY2hhbmdlIHRoZSBzaWduIG9mIHRoZSByZXN1bHQsIGJ1dCB0aGUgZGVlcGVyIGVycm9yIGhlcmUgaXMgdGhlIG1pc3NpbmcgXFwoalxcKSBpbiB0aGUgZGVub21pbmF0b3IuIiwiQiI6IlRoZSBhbmdsZSBcXChcXHBoaVxcKSBkb2VzIG5vdCBiZWxvbmcgaW4gdGhlIGRlbm9taW5hdG9yLiIsIkQiOiJTaW5lIGFic29sdXRlbHkgY2FuIGJlIHdyaXR0ZW4gaW4gZXhwb25lbnRpYWwgZm9ybSDigJQgdGhpcyBpcyBhIHN0YW5kYXJkIGlkZW50aXR5LiJ9LCJoaW50IjoiQWZ0ZXIgc3VidHJhY3RpbmcgdGhlIHR3byBFdWxlciBleHByZXNzaW9ucywgY2hlY2sgd2hhdCBjb2VmZmljaWVudCBtdWx0aXBsaWVzIFxcKFxcc2luXFxwaGlcXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJFeHBsYWluIGluIG9uZSBvciB0d28gcHJlY2lzZSBzZW50ZW5jZXMgd2h5IGNvc2luZSBpcyBhc3NvY2lhdGVkIHdpdGggYSBzdW0gd2hpbGUgc2luZSBpcyBhc3NvY2lhdGVkIHdpdGggYSBkaWZmZXJlbmNlLiIsImlkZWFsX2Fuc3dlciI6IkluIHRoZSBFdWxlciBwYWlyLCB0aGUgY29zaW5lIHRlcm1zIGhhdmUgdGhlIHNhbWUgc2lnbiBpbiBib3RoIFxcKGVee2pcXHBoaX1cXCkgYW5kIFxcKGVeey1qXFxwaGl9XFwpLCBzbyBhZGRpbmcgdGhlIHR3byBleHByZXNzaW9ucyBkb3VibGVzIGNvc2luZS4gVGhlIHNpbmUgdGVybXMgaGF2ZSBvcHBvc2l0ZSBzaWducyAoXFwoK2pcXHNpblxccGhpXFwpIGFuZCBcXCgtalxcc2luXFxwaGlcXCkpLCBzbyBzdWJ0cmFjdGluZyBpc29sYXRlcyBzaW5lIOKAlCB3aGljaCBpcyB3aHkgdGhlIHNpbmUgZm9ybXVsYSB1c2VzIGEgZGlmZmVyZW5jZSBhbmQgZGl2aXNpb24gYnkgXFwoMmpcXCkuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBtZW50aW9uIHRoYXQgY29zaW5lIHRlcm1zIGhhdmUgdGhlIHNhbWUgc2lnbiBpbiBib3RoIEV1bGVyIGV4cHJlc3Npb25zIiwiTXVzdCBtZW50aW9uIHRoYXQgc2luZSB0ZXJtcyBoYXZlIG9wcG9zaXRlIHNpZ25zIGluIHRoZSB0d28gRXVsZXIgZXhwcmVzc2lvbnMiLCJNdXN0IGNvcnJlY3RseSBleHBsYWluIHdoeSBzdWJ0cmFjdGlvbiBsZWFkcyB0byB0aGUgc2luZSBmb3JtdWxhIGFuZCB3aHkgZGl2aXNpb24gYnkgXFwoMmpcXCkgaXMgbmVlZGVkIl0sImV4cGxhbmF0aW9uIjoiVGhpcyB0ZXN0cyB3aGV0aGVyIHRoZSBzdHVkZW50IHVuZGVyc3RhbmRzIHRoZSBhbGdlYnJhaWMgc3RydWN0dXJlIG9mIHRoZSBFdWxlciBwYWlyIHJhdGhlciB0aGFuIG9ubHkgbWVtb3JpemluZyB0aGUgZmluYWwgZm9ybXVsYXMuIiwiaGludCI6IkNvbXBhcmUgdGhlIHNpZ25zIG9mIHRoZSBjb3NpbmUgdGVybXMgYW5kIHNpbmUgdGVybXMgaW4gXFwoZV57alxccGhpfVxcKSBhbmQgXFwoZV57LWpcXHBoaX1cXCkgc2lkZSBieSBzaWRlLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
