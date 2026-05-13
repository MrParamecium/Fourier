%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJVc2UgdGhlIGF2YWlsYWJsZSB0ZXh0Ym9vayBmaWd1cmUgb24gcGFnZS0wOTIgYXMgdGhlIG1haW4gdmlzdWFsIGFuY2hvciBiZWNhdXNlIGl0IGRpcmVjdGx5IHNob3dzIHRoZSBldmVuIGNvbXBvbmVudCBzeW1tZXRyaWMgYWJvdXQgdGhlIHZlcnRpY2FsIGF4aXMgYW5kIHRoZSBvZGQgY29tcG9uZW50IGFudGlzeW1tZXRyaWMgYWJvdXQgdGhlIHZlcnRpY2FsIGF4aXMuIFVzZSBMYVRlWC1uYXRpdmUgZm9ybXVsYSBibG9ja3MgZm9yIHRoZSBwcm9kdWN0IGFuZCBpbnRlZ3JhbCBwcm9wZXJ0aWVzIGJlY2F1c2UgdGhlIGV4YWN0IHN5bWJvbGljIGNvbmRpdGlvbnMgYXJlIHRoZSBleGFtLWZhY2luZyBjb250ZW50LiBEbyBub3QgdXNlIEdQVEltYWdlMiBiZWNhdXNlIHRoZSB0ZXh0Ym9vayBhbHJlYWR5IHN1cHBsaWVzIHRoZSBjYW5vbmljYWwgdmlzdWFsIGFuZCB0aGUgcmVtYWluaW5nIGlkZWFzIGFyZSBiZXN0IHNob3duIHN5bWJvbGljYWxseS4iLCJjcmFtIjoiVXNlIHRoZSBmaWd1cmUgdG8gcmVjb2duaXplIG1pcnJvciBzeW1tZXRyeSBxdWlja2x5LCB0aGVuIG1lbW9yaXplIHRoZSBwcm9kdWN0IGFuZCBpbnRlZ3JhbCBzaG9ydGN1dHMuIiwic3RhbmRhcmQiOiJVc2UgdGhlIGZpZ3VyZSB0byBjb25uZWN0IHN5bW1ldHJ5IHdpdGggZm9ybXVsYXMsIHRoZW4gd29yayBvbmUgcmVwcmVzZW50YXRpdmUgcHJvZHVjdCBleGFtcGxlIGFuZCBvbmUgaW50ZWdyYWwgc2hvcnRjdXQgZXhhbXBsZS4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhlIGZpZ3VyZSBhbmQgZm9ybXVsYXMgdG8gY2F0Y2ggZWRnZSBjb25kaXRpb25zOiBzeW1tZXRyaWMgbGltaXRzLCBzaWduIGNhbmNlbGxhdGlvbiwgYW5kIHRoZSBuby1pbXB1bHNlLWF0LW9yaWdpbiBhc3N1bXB0aW9uLiJ9" style="display:none;"></div>%%KC_END%%
# Some Properties of Even and Odd Functions

> **Section Objective:** Use even/odd symmetry to predict products and simplify integrals over symmetric intervals.

---

**Concepts In This Section**

- Even symmetry
- Odd symmetry
- Product parity rules
- Symmetric-interval integrals
- Origin impulse exception

## 1. Even Symmetry

An even function returns the same value at mirrored times \(t\) and \(-t\). The vertical axis \(t = 0\) acts like a mirror: the left half of the graph is a perfect reflection of the right half.

**Minimal example:** \(\cos t\) is even because \(\cos(-t) = \cos t\).

### EXAM TRIGGER

If the graph has left-right mirror symmetry, or if replacing \(t\) by \(-t\) leaves the formula unchanged, the function is even — use the even-function shortcut.

#### Common Misuse

Do not call a function even just because it is positive or non-negative. Positivity and even symmetry are unrelated properties.

$$x_e(t) = x_e(-t)$$

## 2. Odd Symmetry

An odd function has equal magnitude but opposite sign at mirrored times \(t\) and \(-t\). Geometrically: reflect the graph across the vertical axis, then flip it vertically — you get the same curve back.

**Minimal example:** \(t^3\) is odd because \((-t)^3 = -t^3\).

### EXAM TRIGGER

If substituting \(-t\) into the formula produces the negative of the original expression, the function is odd — apply odd-function properties.

#### Common Misuse

Odd symmetry is not the same as looking visually irregular or having an unusual shape. The test is strictly algebraic: does \(x(-t) = -x(t)\) hold for every \(t\)?

$$x_o(t) = -x_o(-t)$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="comparison_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoZSBzaWRlLWJ5LXNpZGUgcGxvdHMgdG8gbWVtb3JpemUgbWlycm9yIHN5bW1ldHJ5IHZlcnN1cyBzaWduLWZsaXBwZWQgbWlycm9yIHN5bW1ldHJ5LiIsInN0YW5kYXJkIjoiVXNlIHRoZSBwbG90cyB0byBjb25uZWN0IHRoZSBmb3JtdWxhcyBcXCh4X2UodCk9eF9lKC10KVxcKSBhbmQgXFwoeF9vKHQpPS14X28oLXQpXFwpIHRvIHdoYXQgdGhlIGdyYXBoIGxvb2tzIGxpa2UuIiwidG9wX3Njb3JlIjoiVXNlIHRoZSBtYXJrZWQgcG9pbnRzIGF0IFxcKC1hXFwpIGFuZCBcXChhXFwpIHRvIHByZXBhcmUgZm9yIGludGVncmFsIGNhbmNlbGxhdGlvbiBhbmQgZG91YmxpbmcgYXJndW1lbnRzLiJ9" style="display:none;"></div>%%KC_END%%
![unknown](/figures/page-092-unknown-1.png)
*This figure compares an even signal with mirror symmetry and an odd signal with opposite-sign mirror symmetry.*
<div class="lesson-figure-description">The figure contains two time-domain plots. Panel (a) shows \(x_e(t)\) with matching values at \(t = -a\) and \(t = a\) marked by dashed guide lines, so the left and right sides mirror each other about the vertical axis. Panel (b) shows \(x_o(t)\) with equal magnitude and opposite sign at mirrored times, which explains why odd parts cancel over symmetric intervals when integrated.</div>

## 3. Product Parity Rules

This compact formula encodes three textbook rules:

| Product | Parity labels | Result |
|---|---|---|
| even \(\times\) even | \((+1)(+1)\) | even |
| odd \(\times\) odd | \((-1)(-1)\) | even |
| even \(\times\) odd | \((+1)(-1)\) | odd |

Here \(p(f)\) is a parity label — not a function value. Multiplying signs works because replacing \(t\) by \(-t\) either leaves a factor unchanged (even) or adds a minus sign (odd).

**Worked example:** \(\cos t\) is even and \(t\) is odd, so \(t\cos t\) is odd. Verify: substituting \(-t\) gives \((-t)\cos(-t) = -t\cos t\), confirming odd symmetry.

### EXAM TIP

When asked for the parity of a product, classify each factor first, then multiply the parity labels.

#### Common Misuse

Do not expand or integrate the product before checking parity — parity classification is faster and avoids algebra errors.

$$p(fg) = p(f)\,p(g), \quad p(\text{even}) = +1, \quad p(\text{odd}) = -1$$

## 4. Integrals over Symmetric Intervals: Even Functions

For an even function, the area from \(-a\) to \(0\) equals the area from \(0\) to \(a\) — the two halves are mirror images. So the full integral over \([-a, a]\) is exactly twice the right-half integral.

Here \(a > 0\) is the positive endpoint and \(x_e(t)\) satisfies \(x_e(-t) = x_e(t)\).

**Minimal example:**

$$\int_{-2}^{2} \cos t\,dt = 2\int_{0}^{2} \cos t\,dt$$

### EXAM TRIGGER

Symmetric limits \([-a, a]\) plus an even integrand — immediately apply the doubling rule.

#### Common Misuse

This shortcut does **not** apply to nonsymmetric limits such as \([0, a]\) or \([-a, b]\) when \(a \ne b\). Both endpoints must be symmetric about the origin.

$$\int_{-a}^{a} x_e(t)\,dt = 2\int_{0}^{a} x_e(t)\,dt \quad \text{(1.16)}$$

## 5. Integrals over Symmetric Intervals: Odd Functions

An odd function has equal and opposite signed area on the left and right of the origin. Over a symmetric interval \([-a, a]\), the positive area on one side is exactly canceled by the negative area on the other side, giving zero.

Here \(x_o(t)\) satisfies \(x_o(-t) = -x_o(t)\) and \([-a, a]\) is a symmetric interval.

**Minimal example:**

$$\int_{-3}^{3} t^3\,dt = 0$$

### EXAM TRIGGER

Symmetric limits plus an odd integrand — the answer is immediately zero.

### IMPORTANT EXCEPTION

These results assume there is **no impulse or derivative of an impulse at the origin**. If the integrand contains \(\delta(t)\) or \(\delta'(t)\), the cancellation argument breaks down.

#### Common Misuse

Do not set an integral to zero just because the integrand contains an odd factor. If another factor changes the overall parity — making the product even — the integral is not zero.

$$\int_{-a}^{a} x_o(t)\,dt = 0 \quad \text{(1.16)}$$

---
**📌 Key Takeaways**
- Even symmetry: \(x_e(t) = x_e(-t)\) — same value at mirrored times; graph mirrors about the vertical axis.
- Odd symmetry: \(x_o(t) = -x_o(-t)\) — opposite sign at mirrored times; graph flips under reflection.
- Product parity: \(\text{even} \times \text{odd} = \text{odd}\); \(\text{odd} \times \text{odd} = \text{even}\); \(\text{even} \times \text{even} = \text{even}\).
- Even integral shortcut: \(\int_{-a}^{a} x_e(t)\,dt = 2\int_0^a x_e(t)\,dt\) — requires symmetric limits \([-a,a]\).
- Odd integral shortcut: \(\int_{-a}^{a} x_o(t)\,dt = 0\) — requires symmetric limits and no impulse at the origin.

*Next, these symmetry shortcuts will help simplify signal calculations before doing heavier algebra.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImV2ZW5fb2RkX3JlY29nbml0aW9uIiwibGFiZWwiOiJSZWNvZ25pemluZyBldmVuIGFuZCBvZGQgc3ltbWV0cnkiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgZnVuY3Rpb24gc2F0aXNmaWVzIFxcKHgoLXQpID0geCh0KVxcKSBmb3IgZXZlcnkgXFwodFxcKS4gV2hhdCBjYW4geW91IGNvbmNsdWRlPyIsIm9wdGlvbnMiOlsiQS4gVGhlIGZ1bmN0aW9uIGlzIGV2ZW4uIiwiQi4gVGhlIGZ1bmN0aW9uIGlzIG9kZC4iLCJDLiBUaGUgZnVuY3Rpb24gbXVzdCBiZSBwb3NpdGl2ZS4iLCJELiBUaGUgZnVuY3Rpb24gbXVzdCBiZSB6ZXJvIGF0IHRoZSBvcmlnaW4uIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGhlIGNvbmRpdGlvbiBcXCh4KC10KSA9IHgodClcXCkgaXMgZXhhY3RseSBldmVuIHN5bW1ldHJ5OiBtaXJyb3JlZCB0aW1lIHZhbHVlcyBoYXZlIHRoZSBzYW1lIGZ1bmN0aW9uIHZhbHVlLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6Ik9kZCBzeW1tZXRyeSByZXF1aXJlcyBcXCh4KC10KSA9IC14KHQpXFwpLCBub3QgdGhlIHNhbWUgdmFsdWUuIiwiQyI6IkV2ZW4gZnVuY3Rpb25zIG1heSBiZSBwb3NpdGl2ZSwgbmVnYXRpdmUsIG9yIGNoYW5nZSBzaWduLiIsIkQiOiJPZGQgZnVuY3Rpb25zIG11c3Qgc2F0aXNmeSBcXCh4KDApID0gMFxcKSBpZiBvcmRpbmFyeSBhbmQgZmluaXRlOyBldmVuIGZ1bmN0aW9ucyBkbyBub3QgaGF2ZSB0by4ifSwiaGludCI6IkFzayB3aGV0aGVyIHJlcGxhY2luZyBcXCh0XFwpIGJ5IFxcKC10XFwpIGNoYW5nZXMgdGhlIHZhbHVlLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSW4gYSBncmFwaCwgdGhlIHBvaW50IGF0IFxcKHQgPSBhXFwpIGhhcyB2YWx1ZSA1IGFuZCB0aGUgcG9pbnQgYXQgXFwodCA9IC1hXFwpIGhhcyB2YWx1ZSBcXCgtNVxcKS4gV2hpY2ggc3ltbWV0cnkgZG9lcyB0aGlzIG1hdGNoPyIsIm9wdGlvbnMiOlsiQS4gRXZlbiBzeW1tZXRyeSIsIkIuIE9kZCBzeW1tZXRyeSIsIkMuIE5laXRoZXIgZXZlbiBub3Igb2RkIHN5bW1ldHJ5IiwiRC4gQm90aCBldmVuIGFuZCBvZGQgc3ltbWV0cnkgZm9yIGFueSBub256ZXJvIGZ1bmN0aW9uIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiT2RkIHN5bW1ldHJ5IG1lYW5zIG1pcnJvcmVkIHBvaW50cyBoYXZlIGVxdWFsIG1hZ25pdHVkZSBhbmQgb3Bwb3NpdGUgc2lnbi4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJFdmVuIHN5bW1ldHJ5IHdvdWxkIHJlcXVpcmUgdGhlIHR3byB2YWx1ZXMgdG8gYmUgZXF1YWwsIG5vdCBvcHBvc2l0ZS4iLCJDIjoiVGhlIGdpdmVuIHBhaXIgaXMgY29uc2lzdGVudCB3aXRoIG9kZCBzeW1tZXRyeS4iLCJEIjoiQSBub256ZXJvIGZ1bmN0aW9uIGNhbm5vdCBnZW5lcmFsbHkgYmUgYm90aCBldmVuIGFuZCBvZGQuIn0sImhpbnQiOiJDb21wYXJlIHRoZSBzaWducyBhdCBcXCgtYVxcKSBhbmQgXFwoYVxcKS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoidGV4dGJvb2tfZXZlbl9vZGRfc3ltbWV0cnlfcGxvdCIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoicHJvZHVjdF9wYXJpdHkiLCJsYWJlbCI6IlByb2R1Y3QgcGFyaXR5IHJ1bGVzIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IlxcKGYodClcXCkgaXMgb2RkIGFuZCBcXChnKHQpXFwpIGlzIG9kZC4gV2hhdCBpcyB0aGUgcGFyaXR5IG9mIFxcKGYodClnKHQpXFwpPyIsIm9wdGlvbnMiOlsiQS4gT2RkIiwiQi4gRXZlbiIsIkMuIE5laXRoZXIgZXZlbiBub3Igb2RkIiwiRC4gSXQgZGVwZW5kcyBvbiB3aGV0aGVyIHRoZSBmdW5jdGlvbnMgYXJlIHBvc2l0aXZlIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiT2RkIHRpbWVzIG9kZCBpcyBldmVuIGJlY2F1c2UgdGhlIHR3byBzaWduIGNoYW5nZXMgY2FuY2VsOiBcXCgoLTEpKC0xKSA9ICsxXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6Ik9uZSBvZGQgZmFjdG9yIGdpdmVzIGEgc2lnbiBjaGFuZ2U7IHR3byBvZGQgZmFjdG9ycyBnaXZlIHR3byBzaWduIGNoYW5nZXMsIHdoaWNoIGNhbmNlbC4iLCJDIjoiVGhlIHByb2R1Y3Qgb2YgdHdvIG9kZCBmdW5jdGlvbnMgaGFzIGEgZGVmaW5pdGUgcGFyaXR5OiBldmVuLiIsIkQiOiJQYXJpdHkgaXMgYWJvdXQgYmVoYXZpb3IgdW5kZXIgXFwodCBcXG1hcHN0byAtdFxcKSwgbm90IHBvc2l0aXZpdHkuIn0sImhpbnQiOiJVc2UgdGhlIHNpZ24tbGFiZWwgaWRlYTogb2RkIGlzIGxpa2UgXFwoLTFcXCksIGFuZCBcXCgoLTEpKC0xKSA9ICsxXFwpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHByb2R1Y3QgaXMgZ3VhcmFudGVlZCB0byBiZSBvZGQ/Iiwib3B0aW9ucyI6WyJBLiBldmVuIGZ1bmN0aW9uIFxcKFxcdGltZXNcXCkgZXZlbiBmdW5jdGlvbiIsIkIuIG9kZCBmdW5jdGlvbiBcXChcXHRpbWVzXFwpIG9kZCBmdW5jdGlvbiIsIkMuIGV2ZW4gZnVuY3Rpb24gXFwoXFx0aW1lc1xcKSBvZGQgZnVuY3Rpb24iLCJELiBldmVuIGZ1bmN0aW9uIFxcKFxcdGltZXNcXCkgZXZlbiBmdW5jdGlvbiBcXChcXHRpbWVzXFwpIG9kZCBmdW5jdGlvbiBcXChcXHRpbWVzXFwpIG9kZCBmdW5jdGlvbiJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IkEgcHJvZHVjdCB3aXRoIGV4YWN0bHkgb25lIG9kZC1wYXJpdHkgc2lnbiBjaGFuZ2UgaXMgb2RkLiBFdmVuIHRpbWVzIG9kZCBpcyBvZGQuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiRXZlbiB0aW1lcyBldmVuIHJlbWFpbnMgZXZlbi4iLCJCIjoiT2RkIHRpbWVzIG9kZCBiZWNvbWVzIGV2ZW4gYmVjYXVzZSB0aGUgdHdvIHNpZ24gY2hhbmdlcyBjYW5jZWwuIiwiRCI6IlR3byBvZGQgZmFjdG9ycyBwcm9kdWNlIGV2ZW4gcGFyaXR5IG92ZXJhbGwuIn0sImhpbnQiOiJDb3VudCBob3cgbWFueSBvZGQgZmFjdG9ycyBhcHBlYXIuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJzeW1tZXRyaWNfaW50ZXJ2YWxfaW50ZWdyYWxzIiwibGFiZWwiOiJJbnRlZ3JhbCBzaG9ydGN1dHMgb3ZlciBzeW1tZXRyaWMgaW50ZXJ2YWxzIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJZiBcXCh4KHQpXFwpIGlzIG9kZCBhbmQgaGFzIG5vIGltcHVsc2UgYXQgdGhlIG9yaWdpbiwgd2hhdCBpcyBcXChcXGludF97LTR9Xns0fSB4KHQpXFwsZHRcXCk/Iiwib3B0aW9ucyI6WyJBLiBcXCgwXFwpIiwiQi4gXFwoMlxcaW50XzBeNCB4KHQpXFwsZHRcXCkiLCJDLiBcXChcXGludF8wXjQgeCh0KVxcLGR0XFwpIiwiRC4gQ2Fubm90IGJlIHNpbXBsaWZpZWQgYmVjYXVzZSB0aGUgbGltaXRzIGNvbnRhaW4gbmVnYXRpdmUgbnVtYmVycyJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IkFuIG9kZCBmdW5jdGlvbiBoYXMgZXF1YWwgYW5kIG9wcG9zaXRlIHNpZ25lZCBhcmVhcyBvbiBzeW1tZXRyaWMgbGltaXRzLCBzbyB0aGUgaW50ZWdyYWwgaXMgemVyby4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGF0IGRvdWJsaW5nIHJ1bGUgaXMgZm9yIGV2ZW4gZnVuY3Rpb25zLCBub3Qgb2RkIGZ1bmN0aW9ucy4iLCJDIjoiVGhlIHJpZ2h0LWhhbGYgaW50ZWdyYWwgaXMgY2FuY2VsZWQgYnkgdGhlIGxlZnQtaGFsZiBpbnRlZ3JhbC4iLCJEIjoiTmVnYXRpdmUgbGltaXRzIGFyZSBleGFjdGx5IHdoYXQgbWFrZSB0aGUgc3ltbWV0cnkgc2hvcnRjdXQgdXNlZnVsLiJ9LCJoaW50IjoiT2RkIGZ1bmN0aW9uIHBsdXMgc3ltbWV0cmljIGludGVydmFsIG1lYW5zIGNhbmNlbGxhdGlvbi4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoiYXJlYV9jYW5jZWxsYXRpb25fb25fb2RkX3N5bW1ldHJ5X3Bsb3QiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHNpbXBsaWZpY2F0aW9uIGlzIHZhbGlkIGZvciBhbiBldmVuIGZ1bmN0aW9uIFxcKHhfZSh0KVxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKFxcaW50X3stYX1ee2F9IHhfZSh0KVxcLGR0ID0gMFxcKSIsIkIuIFxcKFxcaW50X3stYX1ee2F9IHhfZSh0KVxcLGR0ID0gMlxcaW50XzBeYSB4X2UodClcXCxkdFxcKSIsIkMuIFxcKFxcaW50X3swfV57YX0geF9lKHQpXFwsZHQgPSAwXFwpIiwiRC4gXFwoXFxpbnRfey1hfV57Yn0geF9lKHQpXFwsZHQgPSAyXFxpbnRfMF5hIHhfZSh0KVxcLGR0XFwpIGZvciBhbnkgXFwoYlxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkZvciBhbiBldmVuIGZ1bmN0aW9uLCB0aGUgbGVmdCBhbmQgcmlnaHQgaGFsdmVzIG92ZXIgXFwoWy1hLCBhXVxcKSBoYXZlIGVxdWFsIGFyZWEsIHNvIHRoZSBmdWxsIGludGVncmFsIGlzIHR3aWNlIHRoZSByaWdodCBoYWxmLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6Ilplcm8gb3ZlciBzeW1tZXRyaWMgbGltaXRzIGlzIHRoZSBvZGQtZnVuY3Rpb24gc2hvcnRjdXQuIiwiQyI6IkV2ZW4gc3ltbWV0cnkgZG9lcyBub3QgbWFrZSB0aGUgcmlnaHQtaGFsZiBhcmVhIHplcm8uIiwiRCI6IlRoZSBpbnRlcnZhbCBtdXN0IGJlIHN5bW1ldHJpYzogXFwoWy1hLCBhXVxcKSwgbm90IFxcKFstYSwgYl1cXCkgd2l0aCBhcmJpdHJhcnkgXFwoYlxcKS4ifSwiaGludCI6IkV2ZW4gZnVuY3Rpb25zIGRvdWJsZSBvdmVyIHN5bW1ldHJpYyBpbnRlcnZhbHM7IG9kZCBmdW5jdGlvbnMgY2FuY2VsLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiZXhjZXB0aW9uX2FuZF9leGFtX3RyYXBzIiwibGFiZWwiOiJDb25kaXRpb25zIGFuZCBjb21tb24gdHJhcHMiLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3A0X3ExIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJBIHN0dWRlbnQgc2F5czogJ1RoZSBpbnRlZ3JhbmQgaXMgb2RkLCBzbyBcXChcXGludF97MH1eezV9IHhfbyh0KVxcLGR0ID0gMFxcKS4nIEV4cGxhaW4gcHJlY2lzZWx5IHdoYXQgaXMgd3JvbmcuIiwiaWRlYWxfYW5zd2VyIjoiVGhlIHplcm8gc2hvcnRjdXQgZm9yIG9kZCBmdW5jdGlvbnMgcmVxdWlyZXMgc3ltbWV0cmljIGxpbWl0cywgc3VjaCBhcyBcXChbLTUsIDVdXFwpLiBUaGUgaW50ZXJ2YWwgXFwoWzAsIDVdXFwpIG9ubHkgY292ZXJzIG9uZSBzaWRlLCBzbyB0aGUgY2FuY2VsbGF0aW9uIGJldHdlZW4gbGVmdCBhbmQgcmlnaHQgc2lkZXMgaXMgbWlzc2luZy4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IHN0YXRlIHRoYXQgb2RkLWZ1bmN0aW9uIGNhbmNlbGxhdGlvbiByZXF1aXJlcyBzeW1tZXRyaWMgbGltaXRzLiIsIk11c3QgaWRlbnRpZnkgXFwoWzAsIDVdXFwpIGFzIG5vdCBzeW1tZXRyaWMgYWJvdXQgdGhlIG9yaWdpbi4iLCJNdXN0IGV4cGxhaW4gdGhhdCB0aGUgbWlzc2luZyBsZWZ0IHNpZGUgcHJldmVudHMgY2FuY2VsbGF0aW9uLiJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQga25vd3MgdGhlIGNvbmRpdGlvbiBiZWhpbmQgdGhlIHNob3J0Y3V0LCBub3QganVzdCB0aGUgc2hvcnRjdXQgcmVzdWx0LiIsImhpbnQiOiJXaGVyZSBpcyB0aGUgbmVnYXRpdmUtdGltZSBpbnRlcnZhbCB0aGF0IHdvdWxkIGNhbmNlbCB0aGUgcG9zaXRpdmUtdGltZSBhcmVhPyIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJ3cm9uZ192c19yaWdodF9zeW1tZXRyaWNfaW50ZXJ2YWxfY29tcGFyaXNvbiIsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
