%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJUaGUgc2VjdGlvbiBpcyBkZWZpbml0aW9uLWZpcnN0LCBzbyB0aGUgY29yZSBzeW1tZXRyeSBjb25kaXRpb25zIG11c3QgYmUgdGF1Z2h0IHdpdGggc3RhbmRhbG9uZSBMYVRlWCBmb3JtdWxhcy4gVGhlIHRleHRib29rIGFscmVhZHkgcHJvdmlkZXMgdGhlIGNhbm9uaWNhbCB0aW1lLWRvbWFpbiBzeW1tZXRyeSBkaWFncmFtcyBmb3IgZXZlbiBhbmQgb2RkIHNpZ25hbHMsIHNvIHRob3NlIGZpZ3VyZXMgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZCBvZiBnZW5lcmF0ZWQgaW1hZ2VzLiIsImNyYW0iOiJVc2UgdGhlIHZpc3VhbHMgdG8gcmVjb2duaXplIG1pcnJvciBzeW1tZXRyeSBvciBzaWduLWZsaXBwZWQgbWlycm9yIHN5bW1ldHJ5IHF1aWNrbHkuIiwic3RhbmRhcmQiOiJVc2Ugb25lIGZvcm11bGEgYW5kIG9uZSBtYXRjaGluZyB0ZXh0Ym9vayBwYW5lbCBmb3IgZWFjaCBjb25jZXB0LCBmb2xsb3dlZCBieSBvbmUgcmVwcmVzZW50YXRpdmUgZXhhbXBsZS4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhlIHZpc3VhbHMgdG8gc2VwYXJhdGUgdHJ1ZSBvZGQgc3ltbWV0cnkgZnJvbSBtZXJlbHkgY3Jvc3NpbmcgdGhlIG9yaWdpbiBvciBsb29raW5nIHZpc3VhbGx5IGJhbGFuY2VkLiJ9" style="display:none;"></div>%%KC_END%%
# 1.5 Even and Odd Functions

> **Section Objective:** Learn how to identify even and odd functions from symmetry and from formulas.

---

**Concepts In This Section**

- Even function
- Odd function
- Formula test for symmetry

## 1. Even Function: Mirror Symmetry

An even function has the same value at matching times \(t\) and \(-t\). To check visually, fold the graph along the vertical axis — if both halves line up perfectly, the function is even.

Formally, for every \(t\), the value on the left side of the axis equals the value on the right side at the mirrored position.

#### Note
The sign-flipped case — where the mirrored value is the negative of the original — is a different symmetry type handled on the next page.

## 2. Odd function: sign-flipped mirror symmetry

This is the even-function condition from equation (1.15). Here, \(x_e(t)\) is the value of the even signal at time \(t\), and \(x_e(-t)\) is the value at the mirrored time \(-t\). The condition says these two values must be equal for every \(t\).

**Representative example:** Let \(x_e(t) = t^2\). Then \(x_e(-t) = (-t)^2 = t^2 = x_e(t)\). The condition holds for all \(t\), confirming even symmetry.

**Exam trigger:** If a graph or formula gives equal values at \(t\) and \(-t\), test for even symmetry.

**Common misuse:** Checking only one pair of points is not sufficient unless the problem only asks for a visual guess. The condition must hold for every mirrored pair.

$$x_e(t) = x_e(-t)$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoZSBlcXVhbC1oZWlnaHQgbWlycm9yZWQgcG9pbnRzIGFzIHRoZSBpbnN0YW50IHJlY29nbml0aW9uIGN1ZS4iLCJzdGFuZGFyZCI6IkNvbm5lY3QgdGhlIGZvcm11bGEgXFwoeF9lKHQpID0geF9lKC10KVxcKSBkaXJlY3RseSB0byB0aGUgbWF0Y2hpbmcgZ3JhcGggaGVpZ2h0cy4iLCJ0b3Bfc2NvcmUiOiJFbXBoYXNpemUgdGhhdCB0aGUgc3ltbWV0cnkgbXVzdCBob2xkIGZvciBldmVyeSBtaXJyb3JlZCBwYWlyLCBub3QganVzdCB0aGUgbWFya2VkIHBhaXIuIn0=" style="display:none;"></div>%%KC_END%%
![Fig. 1.23a](/figures/page-092-unknown-1.png)
*This panel shows an even signal whose values match at mirrored times \(t = -a\) and \(t = a\).*
<div class="lesson-figure-description">The figure shows a time-domain plot with a horizontal \(t\)-axis and a vertical axis at \(t = 0\). The signal \(x_e(t)\) is drawn symmetrically about the vertical axis: the left half and right half are mirror images of each other. Dashed guide lines at \(t = -a\) and \(t = a\) land at the same height on the signal curve, visually confirming that \(x_e(-a) = x_e(a)\). Students should notice that this equal-height property at every mirrored pair is exactly what the condition \(x_e(t) = x_e(-t)\) requires.</div>

## 3. Quick formula test

An odd function does not simply mirror across the vertical axis — it mirrors **and flips sign**. The value at time \(t\) is the negative of the value at \(-t\).

This is a stricter condition than visual balance. A graph can look roughly symmetric or pass through the origin without being odd.

#### Common Mistake
Many students wrongly call any graph that crosses the origin an odd function. Crossing the origin at \(t = 0\) is a consequence of odd symmetry, but it is not sufficient evidence on its own. Every mirrored pair must satisfy the sign-flip condition.

$$x_o(t) = -x_o(-t)$$
*This is the odd-function condition from equation (1.15). Here, \(x_o(t)\) is the value of the odd signal at time \(t\), and \(x_o(-t)\) is the value at the mirrored time \(-t\). The condition says the two values must be equal in magnitude and opposite in sign for every \(t\).

**Representative example:** Let \(x_o(t) = t^3\). Then \(x_o(-t) = (-t)^3 = -t^3\), so \(-x_o(-t) = t^3 = x_o(t)\). The condition holds for all \(t\), confirming odd symmetry.

**Exam trigger:** If mirrored points have equal magnitude but opposite sign, test for odd symmetry.

**Common misuse:** Odd symmetry is not the same as ordinary mirror symmetry. Mirror symmetry is the even condition; odd symmetry requires the additional sign flip.*

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIG9wcG9zaXRlLXNpZGUgZXF1YWwtbWFnbml0dWRlIHBvaW50cyBhcyB0aGUgaW5zdGFudCByZWNvZ25pdGlvbiBjdWUuIiwic3RhbmRhcmQiOiJDb25uZWN0IHRoZSBmb3JtdWxhIFxcKHhfbyh0KSA9IC14X28oLXQpXFwpIHRvIHRoZSBzaWduLWZsaXBwZWQgZ3JhcGggaGVpZ2h0cy4iLCJ0b3Bfc2NvcmUiOiJFbXBoYXNpemUgdGhhdCBvcmlnaW4gY3Jvc3NpbmcgYWxvbmUgZG9lcyBub3QgcHJvdmUgb2RkIHN5bW1ldHJ5LiJ9" style="display:none;"></div>%%KC_END%%
![Fig. 1.23b](/figures/page-092-unknown-1.png)
*This panel shows an odd signal whose mirrored values have equal magnitude and opposite sign.*
<div class="lesson-figure-description">The figure shows a time-domain plot with a horizontal \(t\)-axis and a vertical axis at \(t = 0\). The signal \(x_o(t)\) is antisymmetric about the vertical axis. At \(t = a\), the signal value is above the axis; at the mirrored time \(t = -a\), the signal value is below the axis by the same amount. This opposite-side, equal-magnitude relationship is the graphical expression of \(x_o(t) = -x_o(-t)\), and is distinct from ordinary mirror symmetry where both values would be on the same side.</div>

## 3. Quick Formula Test

To classify any function algebraically, follow three steps:

1. **Replace** \(t\) with \(-t\) in the formula.
2. **Simplify** the result.
3. **Compare** with the original:
   - If \(x(-t) = x(t)\): the function is **even**.
   - If \(x(-t) = -x(t)\): the function is **odd**.
   - Otherwise: the function is **neither**.

---

### WORKED EXAMPLE

Let \(x(t) = t^2 + 1\).

Step 1: \(x(-t) = (-t)^2 + 1\)

Step 2: \(x(-t) = t^2 + 1\)

Step 3: \(x(-t) = x(t)\) — the function is **even**.

---

### NEAR-MISS TRAP

Let \(x(t) = t + 1\).

Step 1–2: \(x(-t) = -t + 1\)

Step 3: \(-t + 1 \neq t + 1\) (not even) and \(-t + 1 \neq -(t+1) = -t - 1\) (not odd).

Conclusion: \(x(t) = t + 1\) is **neither** even nor odd. The constant \(+1\) breaks the odd symmetry that \(t\) alone would have had.

---
**📌 Key Takeaways**
- Even function: \(x_e(t) = x_e(-t)\) — fold the graph along the vertical axis and both halves match.
- Odd function: \(x_o(t) = -x_o(-t)\) — mirrored values are equal in magnitude and opposite in sign.
- Formula test: substitute \(-t\); if \(x(-t) = x(t)\) it is even, if \(x(-t) = -x(t)\) it is odd, otherwise neither.

*Next, use these symmetry tests whenever signal shape affects simplification or classification.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImV2ZW5fZnVuY3Rpb25fZGVmaW5pdGlvbiIsImxhYmVsIjoiRXZlbiBmdW5jdGlvbiBzeW1tZXRyeSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImV2ZW5fcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGNvbmRpdGlvbiBkZWZpbmVzIGFuIGV2ZW4gZnVuY3Rpb24gXFwoeF9lKHQpXFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoeF9lKHQpID0geF9lKC10KVxcKSIsIkIuIFxcKHhfZSh0KSA9IC14X2UoLXQpXFwpIiwiQy4gXFwoeF9lKC10KSA9IC14X2UodCkgKyAxXFwpIiwiRC4gXFwoeF9lKHQpID0gMFxcKSBmb3IgYWxsIFxcKHRcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJBbiBldmVuIGZ1bmN0aW9uIGhhcyB0aGUgc2FtZSB2YWx1ZSBhdCBtaXJyb3JlZCB0aW1lcyBcXCh0XFwpIGFuZCBcXCgtdFxcKS4gVGhlIGNvbmRpdGlvbiBcXCh4X2UodCkgPSB4X2UoLXQpXFwpIG11c3QgaG9sZCBmb3IgZXZlcnkgXFwodFxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGlzIGlzIHRoZSBvZGQtZnVuY3Rpb24gY29uZGl0aW9uLCBub3QgdGhlIGV2ZW4tZnVuY3Rpb24gY29uZGl0aW9uLiIsIkMiOiJBZGRpbmcgMSBpcyBub3QgcGFydCBvZiB0aGUgc3ltbWV0cnkgZGVmaW5pdGlvbi4iLCJEIjoiVGhlIHplcm8gZnVuY3Rpb24gaXMgZXZlbiwgYnV0IGV2ZW4gZnVuY3Rpb25zIGRvIG5vdCBoYXZlIHRvIGJlIHplcm8gZXZlcnl3aGVyZS4ifSwiaGludCI6IkV2ZW4gbWVhbnMgdGhlIGdyYXBoIG1hdGNoZXMgYWZ0ZXIgcmVmbGVjdGluZyBhY3Jvc3MgdGhlIHZlcnRpY2FsIGF4aXMuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImV2ZW5fcTJfdmlzdWFsIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJbiBhIGdyYXBoLCB0aGUgcG9pbnRzIGF0IFxcKHQgPSAtYVxcKSBhbmQgXFwodCA9IGFcXCkgaGF2ZSB0aGUgc2FtZSBoZWlnaHQgZm9yIGV2ZXJ5IFxcKGFcXCkuIFdoYXQgY2xhc3NpZmljYXRpb24gZG9lcyB0aGlzIHN1cHBvcnQ/Iiwib3B0aW9ucyI6WyJBLiBFdmVuIiwiQi4gT2RkIiwiQy4gTmVpdGhlciIsIkQuIFBlcmlvZGljIG9ubHkiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJFcXVhbCBoZWlnaHRzIGF0IG1pcnJvcmVkIHRpbWVzIHNob3cgXFwoeCh0KSA9IHgoLXQpXFwpLCB3aGljaCBpcyBleGFjdGx5IHRoZSBldmVuLWZ1bmN0aW9uIHRlc3QuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiT2RkIHN5bW1ldHJ5IHJlcXVpcmVzIG9wcG9zaXRlIHNpZ25zIGF0IG1pcnJvcmVkIHRpbWVzLCBub3QgZXF1YWwgaGVpZ2h0cy4iLCJDIjoiSWYgdGhlIGVxdWFsLWhlaWdodCBjb25kaXRpb24gaG9sZHMgZm9yIGV2ZXJ5IG1pcnJvcmVkIHBhaXIsIHRoZSBmdW5jdGlvbiBpcyBub3QgbmVpdGhlci4iLCJEIjoiUGVyaW9kaWNpdHkgaXMgYWJvdXQgcmVwZWF0aW5nIGFmdGVyIGEgdGltZSBzaGlmdCwgbm90IG1pcnJvciBzeW1tZXRyeSBhYm91dCB0aGUgdmVydGljYWwgYXhpcy4ifSwiaGludCI6IkFzayB3aGV0aGVyIHRoZSBsZWZ0IGFuZCByaWdodCBzaWRlcyBhcmUgbWlycm9yIGltYWdlcy4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoiYm9va19maWd1cmVfcGFuZWxfZXZlbiIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoib2RkX2Z1bmN0aW9uX2RlZmluaXRpb24iLCJsYWJlbCI6Ik9kZCBmdW5jdGlvbiBhbnRpc3ltbWV0cnkiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJvZGRfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGNvbmRpdGlvbiBkZWZpbmVzIGFuIG9kZCBmdW5jdGlvbiBcXCh4X28odClcXCk/Iiwib3B0aW9ucyI6WyJBLiBcXCh4X28odCkgPSB4X28oLXQpXFwpIiwiQi4gXFwoeF9vKHQpID0gLXhfbygtdClcXCkiLCJDLiBcXCh4X28odCkgPSB4X28odC0xKVxcKSIsIkQuIFxcKHhfbyh0KSA9IHx4X28oLXQpfFxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkFuIG9kZCBmdW5jdGlvbiBoYXMgdmFsdWVzIGF0IG1pcnJvcmVkIHRpbWVzIHRoYXQgYXJlIGVxdWFsIGluIG1hZ25pdHVkZSBhbmQgb3Bwb3NpdGUgaW4gc2lnbjogXFwoeF9vKHQpID0gLXhfbygtdClcXCkgZm9yIGFsbCBcXCh0XFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgaXMgdGhlIGV2ZW4tc3ltbWV0cnkgY29uZGl0aW9uLiIsIkMiOiJUaGlzIGRlc2NyaWJlcyBhIHRpbWUtc2hpZnQgcmVsYXRpb25zaGlwLCBub3Qgb2RkIHN5bW1ldHJ5LiIsIkQiOiJBYnNvbHV0ZSB2YWx1ZSByZW1vdmVzIHNpZ24gaW5mb3JtYXRpb24sIGJ1dCBvZGQgc3ltbWV0cnkgZGVwZW5kcyBlbnRpcmVseSBvbiBzaWduIHJldmVyc2FsLiJ9LCJoaW50IjoiT2RkIG1lYW5zIG1pcnJvcmVkIHZhbHVlcyBmbGlwIHNpZ24uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6Im9kZF9xMl90cmFwIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJBIGdyYXBoIGNyb3NzZXMgdGhlIG9yaWdpbi4gQSBzdHVkZW50IGltbWVkaWF0ZWx5IHNheXMgaXQgbXVzdCBiZSBvZGQuIFdoeSBpcyB0aGlzIHJlYXNvbmluZyB3cm9uZz8iLCJvcHRpb25zIjpbIkEuIE9kZCBmdW5jdGlvbnMgbmV2ZXIgY3Jvc3MgdGhlIG9yaWdpbi4iLCJCLiBDcm9zc2luZyB0aGUgb3JpZ2luIGlzIG5vdCBlbm91Z2g7IGV2ZXJ5IG1pcnJvcmVkIHBhaXIgbXVzdCBoYXZlIG9wcG9zaXRlIHZhbHVlcy4iLCJDLiBDcm9zc2luZyB0aGUgb3JpZ2luIHByb3ZlcyB0aGUgZnVuY3Rpb24gaXMgZXZlbi4iLCJELiBPZGQgZnVuY3Rpb25zIG11c3QgYWx3YXlzIGJlIHN0cmFpZ2h0IGxpbmVzLiJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6Ik9kZCBzeW1tZXRyeSByZXF1aXJlcyBcXCh4KHQpID0gLXgoLXQpXFwpIGZvciBhbGwgXFwodFxcKSwgbm90IGp1c3QgYXQgdGhlIHNpbmdsZSBwb2ludCBcXCh0ID0gMFxcKS4gQ3Jvc3NpbmcgdGhlIG9yaWdpbiBpcyBhIGNvbnNlcXVlbmNlIG9mIG9kZCBzeW1tZXRyeSwgbm90IHByb29mIG9mIGl0LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6Ik1hbnkgb2RkIGZ1bmN0aW9ucyBkbyBjcm9zcyB0aGUgb3JpZ2luIOKAlCBpbiBmYWN0LCBldmVyeSBvZGQgZnVuY3Rpb24gc2F0aXNmaWVzIFxcKHgoMCkgPSAwXFwpLiIsIkMiOiJFdmVuIHN5bW1ldHJ5IGlzIGFib3V0IGVxdWFsIG1pcnJvcmVkIHZhbHVlcywgbm90IGFib3V0IGNyb3NzaW5nIHRoZSBvcmlnaW4uIiwiRCI6IkZ1bmN0aW9ucyBsaWtlIFxcKHReM1xcKSBhcmUgb2RkIGJ1dCBhcmUgbm90IHN0cmFpZ2h0IGxpbmVzLiJ9LCJoaW50IjoiT25lIHBvaW50IGNhbm5vdCBwcm92ZSBhIGNvbmRpdGlvbiB0aGF0IG11c3QgaG9sZCBmb3IgZXZlcnkgXFwodFxcKS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoid3JvbmdfdnNfcmlnaHRfdmlzdWFsX2NoZWNrIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJmb3JtdWxhX3Rlc3QiLCJsYWJlbCI6IlRlc3RpbmcgYSBmb3JtdWxhIGJ5IHN1YnN0aXR1dGluZyAtdCIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6InRlc3RfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkNsYXNzaWZ5IFxcKHgodCkgPSB0XjIgKyAzXFwpLiIsIm9wdGlvbnMiOlsiQS4gRXZlbiIsIkIuIE9kZCIsIkMuIE5laXRoZXIiLCJELiBDYW5ub3QgYmUgY2xhc3NpZmllZCB3aXRob3V0IGEgZ3JhcGgiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJcXCh4KC10KSA9ICgtdCleMiArIDMgPSB0XjIgKyAzID0geCh0KVxcKSwgc28gdGhlIGZ1bmN0aW9uIHNhdGlzZmllcyB0aGUgZXZlbiBjb25kaXRpb24gZXhhY3RseS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJPZGQgd291bGQgcmVxdWlyZSBcXCh4KC10KSA9IC14KHQpXFwpLCB3aGljaCB3b3VsZCBnaXZlIFxcKC0odF4yKzMpXFwpLiBUaGF0IGlzIG5vdCB0aGUgY2FzZSBoZXJlLiIsIkMiOiJUaGUgZXZlbiBjb25kaXRpb24gaXMgc2F0aXNmaWVkIGV4YWN0bHksIHNvIHRoZSBmdW5jdGlvbiBpcyBub3QgbmVpdGhlci4iLCJEIjoiQSBncmFwaCBpcyBoZWxwZnVsIGZvciBpbnR1aXRpb24sIGJ1dCB0aGUgZm9ybXVsYSB0ZXN0IGlzIGZ1bGx5IHN1ZmZpY2llbnQuIn0sImhpbnQiOiJSZXBsYWNlIFxcKHRcXCkgd2l0aCBcXCgtdFxcKSBhbmQgc2ltcGxpZnkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6InRlc3RfcTIiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkNsYXNzaWZ5IFxcKHgodCkgPSB0ICsgMVxcKSBhcyBldmVuLCBvZGQsIG9yIG5laXRoZXIuIFNob3cgdGhlIHN1YnN0aXR1dGlvbiBzdGVwLiIsImlkZWFsX2Fuc3dlciI6IlxcKHgoLXQpID0gLXQgKyAxXFwpLiBUaGlzIGlzIG5vdCBlcXVhbCB0byBcXCh4KHQpID0gdCArIDFcXCkgKHNvIG5vdCBldmVuKSBhbmQgbm90IGVxdWFsIHRvIFxcKC14KHQpID0gLXQgLSAxXFwpIChzbyBub3Qgb2RkKS4gVGhlcmVmb3JlIFxcKHgodCkgPSB0ICsgMVxcKSBpcyBuZWl0aGVyIGV2ZW4gbm9yIG9kZC4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IGNvbXB1dGUgXFwoeCgtdCkgPSAtdCArIDFcXCkiLCJNdXN0IGNvbXBhcmUgYWdhaW5zdCBcXCh4KHQpID0gdCArIDFcXCkgYW5kIGNvbmNsdWRlIG5vdCBldmVuIiwiTXVzdCBjb21wYXJlIGFnYWluc3QgXFwoLXgodCkgPSAtdCAtIDFcXCkgYW5kIGNvbmNsdWRlIG5vdCBvZGQiLCJNdXN0IHN0YXRlIHRoZSBmaW5hbCBjb25jbHVzaW9uOiBuZWl0aGVyIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCB1c2VzIHRoZSBmdWxsIHRocmVlLXN0ZXAgZm9ybXVsYSB0ZXN0IHJhdGhlciB0aGFuIGd1ZXNzaW5nIGZyb20gdGhlIGFwcGVhcmFuY2Ugb2YgdGhlIGV4cHJlc3Npb24uIiwiaGludCI6IkZvciB0aGUgb2RkIGNoZWNrLCBjb21wYXJlIFxcKHgoLXQpXFwpIHRvIFxcKC14KHQpXFwpLCBub3QganVzdCB0byBhIG5lZ2F0aXZlLWxvb2tpbmcgZXhwcmVzc2lvbi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
