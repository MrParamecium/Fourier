%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImdlbmVyYXRlZF9pbWFnZSIsInJhdGlvbmFsZSI6IlRoaXMgc2VjdGlvbiBpcyBtYXRoLWhlYXZ5IGFuZCBoYXMgbm8gZXh0cmFjdGVkIHRleHRib29rIGZpZ3VyZXMgYXZhaWxhYmxlLiBBIGNsZWFuIGdlbmVyYXRlZCB0ZWFjaGluZyBkaWFncmFtIGlzIHRoZSBiZXN0IHdheSB0byBtYWtlIHRoZSByZXBlYXRlZC1mYWN0b3IgY29lZmZpY2llbnQgcGF0dGVybiBpbnN0YW50bHkgcmVjb2duaXphYmxlIGZvciBleGFtIHVzZS4iLCJjcmFtIjoiVXNlIHZpc3VhbHMgdG8gc2hvdyB0aGUgZXhwYW5zaW9uIHRlbXBsYXRlIGFuZCB0aGUgY29lZmZpY2llbnQtZmluZGluZyB3b3JrZmxvdyBhdCBhIGdsYW5jZTogY292ZXIgdXAsIHBsdWcgaW4sIGRpZmZlcmVudGlhdGUsIHBsdWcgaW4gYWdhaW4uIiwic3RhbmRhcmQiOiJVc2UgdmlzdWFscyB0byBjb25uZWN0IHRoZSByZXBlYXRlZC1mYWN0b3IgZGVub21pbmF0b3IgdG8gdGhlIHN0YWNrIG9mIHRlcm1zIGFuZCBzaG93IHdoeSBzdWNjZXNzaXZlIGRlcml2YXRpdmVzIHByb2R1Y2Ugc3VjY2Vzc2l2ZSBjb2VmZmljaWVudHMuIiwidG9wX3Njb3JlIjoiVXNlIHZpc3VhbHMgdG8gZXhwb3NlIHRoZSBkaXN0aW5jdGlvbiBiZXR3ZWVuIHVucmVwZWF0ZWQtZmFjdG9yIGNvZWZmaWNpZW50cyBhbmQgcmVwZWF0ZWQtZmFjdG9yIGNvZWZmaWNpZW50cywgcGx1cyB0aGUgZmFjdG9yaWFsL2Rlcml2YXRpdmUgcGF0dGVybiBzdHVkZW50cyBvZnRlbiBmb3JnZXQuIn0=" style="display:none;"></div>%%KC_END%%
# Partial Fractions — Repeated Denominator Factors

> **Section Objective:** Master the partial fraction expansion when the denominator contains a repeated factor \((x-\lambda)^r\), and find all coefficients efficiently using the derivative-based shortcut.

---

**What gets tested:** Setting up the correct expansion template and computing every coefficient for a repeated root without missing a power.

**Pattern to memorize:** A repeated factor \((x-\lambda)^r\) forces a *stack* of \(r\) terms — one for each power from \(r\) down to \(1\). Unrepeated factors still get one ordinary term each.

**Fastest workflow:**
1. Write the full template (stack for repeated root, single terms for the rest).
2. Use ordinary Heaviside cover-up for all unrepeated-factor coefficients.
3. Hide \((x-\lambda)^r\), plug in \(x=\lambda\) to get \(a_0\).
4. Differentiate once, evaluate at \(x=\lambda\) to get \(a_1\); repeat with \(1/j!\) for each \(a_j\).

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="exam_pattern_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgdmlzdWFsIHRvIG1lbW9yaXplIHRoZSByZXBlYXRlZC1mYWN0b3IgdGVtcGxhdGUgYW5kIHRoZSBjb2VmZmljaWVudCBydWxlcyBpbiBzZWNvbmRzLiIsInN0YW5kYXJkIjoiVXNlIHRoaXMgdmlzdWFsIHRvIGNvbm5lY3QgZGVub21pbmF0b3Igc3RydWN0dXJlIHRvIHRoZSBjb3JyZWN0IHBhcnRpYWwgZnJhY3Rpb24gZm9ybS4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhpcyB2aXN1YWwgdG8gaGlnaGxpZ2h0IHRoZSBkZXJpdmF0aXZlIG9yZGVyIGFuZCBmYWN0b3JpYWwgcGF0dGVybiB0aGF0IHN0dWRlbnRzIG9mdGVuIG1pc2FwcGx5LiJ9" style="display:none;"></div>%%KC_END%%
*🎨 Repeated-factor expansion template (left) and the three-step coefficient workflow (right). The muted red box flags the most common exam mistake.*
![Illustration](/generated/gptimage2-1777212061623-2514.png)

## 1. Recognize the Repeated-Factor Setup

Whenever \((x-\lambda)^r\) appears in the denominator with \(r \geq 2\), the partial fraction expansion must include **a stack of \(r\) terms** for that repeated root — one term for every power from \(r\) down to \(1\):

$$\frac{a_0}{(x-\lambda)^r} + \frac{a_1}{(x-\lambda)^{r-1}} + \cdots + \frac{a_{r-1}}{x-\lambda}$$

Unrepeated factors such as \((x-\alpha_1)\) still contribute exactly one term each: \(k_1/(x-\alpha_1)\).

### COMMON TRAP

Students often skip middle powers — for example, writing only \(A/(x-\lambda)^3\) and \(B/(x-\lambda)\) while omitting \(C/(x-\lambda)^2\). This is wrong and will cost points.

#### Fastest Recognition Rule

A repeated root of order \(r\) means exactly \(r\) separate fractions tied to that root. Count the powers in the denominator — that is your stack size.

$$F(x)=\frac{P(x)}{(x-\lambda)^r(x-\alpha_1)(x-\alpha_2)\cdots(x-\alpha_j)}=\frac{a_0}{(x-\lambda)^r}+\frac{a_1}{(x-\lambda)^{r-1}}+\cdots+\frac{a_{r-1}}{x-\lambda}+\frac{k_1}{x-\alpha_1}+\cdots+\frac{k_j}{x-\alpha_j}$$
*The repeated denominator factor \((x-\lambda)^r\) generates a stack of \(r\) partial-fraction terms (one per power), while each unrepeated factor \((x-\alpha_i)\) contributes exactly one term.*

## 2. Fast Coefficient Rules for Repeated Factors

Here is the operational recipe — no long derivation needed.

**Step 1 — Unrepeated factors first:** Use ordinary Heaviside cover-up to find \(k_1, k_2, \ldots\) by hiding each simple factor and substituting its root.

**Step 2 — Hide the repeated factor:** Multiply both sides by \((x-\lambda)^r\) to define \(G(x) = (x-\lambda)^r F(x)\).

**Step 3 — Find \(a_0\):** Evaluate \(G(\lambda)\) directly. This is the same idea as cover-up, but applied to the whole stack.

**Step 4 — Find \(a_1, a_2, \ldots\):** Differentiate \(G(x)\) and evaluate at \(x=\lambda\):
$$a_j = \left.\frac{1}{j!}\frac{d^j G}{dx^j}\right|_{x=\lambda}$$

### WARNING

The factorial \(j!\) in the denominator is the most-forgotten step. For \(a_2\), you must divide the second derivative by \(2! = 2\). Weak students skip this and get the wrong answer every time.

$$a_j=\left.\frac{1}{j!}\frac{d^j}{dx^j}\left[(x-\lambda)^rF(x)\right]\right|_{x=\lambda}$$
*After removing the repeated factor to form \(G(x) = (x-\lambda)^r F(x)\), each successive coefficient \(a_j\) is obtained by taking the \(j\)-th derivative of \(G(x)\) and dividing by \(j!\) before evaluating at \(x = \lambda\).*

## 3. Example Pattern to Copy on Exams

Consider Example B.10:
$$F(x) = \frac{4x^3+16x^2+23x+13}{(x+1)^3(x+2)}$$

**Step 1 — Write the template:**
$$F(x) = \frac{a_0}{(x+1)^3}+\frac{a_1}{(x+1)^2}+\frac{a_2}{x+1}+\frac{k}{x+2}$$

**Step 2 — Find \(k\) by cover-up at \(x=-2\):**
$$k = \left.\frac{4x^3+16x^2+23x+13}{(x+1)^3}\right|_{x=-2} = \frac{-32+64-46+13}{(-1)^3} = \frac{-1}{-1} = 1$$

**Step 3 — Define \(G(x) = (x+1)^3 F(x)\), evaluate at \(x=-1\):**
$$a_0 = G(-1) = \frac{4(-1)^3+16(-1)^2+23(-1)+13}{(-1)+2} = \frac{-4+16-23+13}{1} = 2$$

**Step 4 — First derivative of \(G(x)\) at \(x=-1\) gives \(a_1 = 1\).**

**Step 5 — Second derivative divided by \(2!\) at \(x=-1\) gives \(a_2 = 3\).**

Final result: \(F(x) = \dfrac{2}{(x+1)^3}+\dfrac{1}{(x+1)^2}+\dfrac{3}{x+1}+\dfrac{1}{x+2}\)

### EXAM TIP

Once the template is written correctly, most exam mistakes come from applying the wrong derivative order or forgetting the \(j!\) divisor. Check both every time.

---
**📌 Key Takeaways**
- A repeated factor \((x-\lambda)^r\) requires a stack of \(r\) partial fraction terms, one per power down to 1.
- Find \(a_j\) by hiding the repeated factor, taking the \(j\)-th derivative, and dividing by \(j!\).
- The most common trap: skipping middle powers in the stack or forgetting the factorial divisor.

*In the next section we will see when this derivative-based method becomes cumbersome and what to use instead.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlcGVhdGVkX2ZhY3Rvcl90ZW1wbGF0ZSIsImxhYmVsIjoiUmVjb2duaXppbmcgdGhlIGNvcnJlY3QgcGFydGlhbCBmcmFjdGlvbiB0ZW1wbGF0ZSBmb3IgYSByZXBlYXRlZCByb290IiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBpcyB0aGUgY29ycmVjdCBwYXJ0aWFsIGZyYWN0aW9uIGZvcm0gZm9yIFxcKEYoeCk9XFxkZnJhY3tQKHgpfXsoeC0xKV4zKHgrNCl9XFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoXFxkZnJhY3tBfXsoeC0xKV4zfStcXGRmcmFje0J9e3gtMX0rXFxkZnJhY3tDfXt4KzR9XFwpIiwiQi4gXFwoXFxkZnJhY3tBfXsoeC0xKV4zfStcXGRmcmFje0J9eyh4LTEpXjJ9K1xcZGZyYWN7Q317eC0xfStcXGRmcmFje0R9e3grNH1cXCkiLCJDLiBcXChcXGRmcmFje0F9e3gtMX0rXFxkZnJhY3tCfXt4KzR9XFwpIiwiRC4gXFwoXFxkZnJhY3tBfXsoeC0xKV4yfStcXGRmcmFje0J9e3gtMX0rXFxkZnJhY3tDfXsoeCs0KV4yfVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkEgcmVwZWF0ZWQgZmFjdG9yIG9mIG9yZGVyIDMgcmVxdWlyZXMgdGhyZWUgc2VwYXJhdGUgdGVybXM6IHBvd2VycyAzLCAyLCBhbmQgMS4gVGhlIHVucmVwZWF0ZWQgZmFjdG9yIFxcKCh4KzQpXFwpIGNvbnRyaWJ1dGVzIG9uZSBvcmRpbmFyeSB0ZXJtLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6Ikl0IHNraXBzIHRoZSBtaWRkbGUgcG93ZXIgXFwoKHgtMSleMlxcKSwgd2hpY2ggaXMgcmVxdWlyZWQuIiwiQyI6Ikl0IHRyZWF0cyB0aGUgcmVwZWF0ZWQgZmFjdG9yIGFzIGlmIGl0IHdlcmUgdW5yZXBlYXRlZC4iLCJEIjoiSXQgaW52ZW50cyBhIHJlcGVhdGVkIGZhY3RvciBcXCgoeCs0KV4yXFwpIHRoYXQgaXMgbm90IGluIHRoZSBkZW5vbWluYXRvci4ifSwiaGludCI6IkEgcmVwZWF0ZWQgcm9vdCBvZiBvcmRlciBcXChyXFwpIG5lZWRzIFxcKHJcXCkgZnJhY3Rpb25zIHRpZWQgdG8gdGhhdCByb290LiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJvcGVuYWkvZ3B0LTUuNC1pbWFnZS0yIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJBIGRlbm9taW5hdG9yIGNvbnRhaW5zIFxcKCh4KzIpXjIoeC01KV4yXFwpLiBIb3cgbWFueSBjb25zdGFudC1udW1lcmF0b3IgcGFydGlhbCBmcmFjdGlvbiB0ZXJtcyBhcmUgbmVlZGVkIGJlZm9yZSBzb2x2aW5nIGNvZWZmaWNpZW50cz8iLCJvcHRpb25zIjpbIkEuIDIiLCJCLiAzIiwiQy4gNCIsIkQuIDUiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJFYWNoIHJlcGVhdGVkIHNxdWFyZSBjb250cmlidXRlcyB0d28gdGVybXM6IG9uZSBvdmVyIHRoZSBzcXVhcmUgYW5kIG9uZSBvdmVyIHRoZSBmaXJzdCBwb3dlci4gU28gdGhlIHRvdGFsIGlzIFxcKDIgKyAyID0gNFxcKSB0ZXJtcy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIGNvdW50cyBvbmx5IG9uZSB0ZXJtIHBlciByZXBlYXRlZCByb290LCB3aGljaCBpcyB0b28gZmV3LiIsIkIiOiJUaGVyZSBpcyBubyB3YXkgdG8gZ2V0IDMgZnJvbSB0d28gcmVwZWF0ZWQgc3F1YXJlIGZhY3RvcnMuIiwiRCI6IlRoaXMgb3ZlcmNvdW50cyB0aGUgcmVxdWlyZWQgc3RhY2suIn0sImhpbnQiOiJDb3VudCBwb3dlcnMgZG93biB0byAxIGZvciBlYWNoIHJlcGVhdGVkIGZhY3RvciBzZXBhcmF0ZWx5LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiY29lZmZpY2llbnRfcnVsZXMiLCJsYWJlbCI6IkZpbmRpbmcgY29lZmZpY2llbnRzIGZvciByZXBlYXRlZC1mYWN0b3IgdGVybXMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciBhIHJlcGVhdGVkIGZhY3RvciBcXCgoeC1cXGxhbWJkYSleclxcKSwgd2hpY2ggcnVsZSBjb3JyZWN0bHkgZ2l2ZXMgXFwoYV8xXFwpIGFmdGVyIGhpZGluZyB0aGUgcmVwZWF0ZWQgZmFjdG9yPyIsIm9wdGlvbnMiOlsiQS4gUGx1ZyBpbiBcXCh4PVxcbGFtYmRhXFwpIGRpcmVjdGx5IGludG8gXFwoRih4KVxcKSIsIkIuIERpZmZlcmVudGlhdGUgXFwoKHgtXFxsYW1iZGEpXnJGKHgpXFwpIG9uY2UsIHRoZW4gc2V0IFxcKHg9XFxsYW1iZGFcXCkiLCJDLiBEaWZmZXJlbnRpYXRlIFxcKEYoeClcXCkgb25jZSwgdGhlbiBzZXQgXFwoeD1cXGxhbWJkYVxcKSIsIkQuIFVzZSBvcmRpbmFyeSBjb3Zlci11cCBvbiBcXCgoeC1cXGxhbWJkYSlcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJBZnRlciByZW1vdmluZyB0aGUgcmVwZWF0ZWQgZmFjdG9yLCB0aGUgZmlyc3QgZGVyaXZhdGl2ZSBldmFsdWF0ZWQgYXQgXFwoeD1cXGxhbWJkYVxcKSBnaXZlcyBcXChhXzFcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiRGlyZWN0IHN1YnN0aXR1dGlvbiBpbnRvIFxcKEYoeClcXCkgdXN1YWxseSBoaXRzIHRoZSByZXBlYXRlZC1mYWN0b3Igc2luZ3VsYXJpdHkgYW5kIGRvZXMgbm90IGlzb2xhdGUgXFwoYV8xXFwpLiIsIkMiOiJEaWZmZXJlbnRpYXRpbmcgXFwoRih4KVxcKSBpdHNlbGYgaXMgbm90IHRoZSBzdGF0ZWQgY29lZmZpY2llbnQgcnVsZS4iLCJEIjoiT3JkaW5hcnkgY292ZXItdXAgYWxvbmUgb25seSB3b3JrcyBkaXJlY3RseSBmb3Igc2ltcGxlIGZhY3RvcnMsIG5vdCBhbGwgcmVwZWF0ZWQtZmFjdG9yIGNvZWZmaWNpZW50cy4ifSwiaGludCI6IkhpZGUgdGhlIHJlcGVhdGVkIGZhY3RvciBmaXJzdCwgdGhlbiBtb3ZlIHVwIGJ5IGRlcml2YXRpdmUgb3JkZXIuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AyX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBmb3JtdWxhIGlzIGNvcnJlY3QgZm9yIHRoZSBjb2VmZmljaWVudCBcXChhX2pcXCkgdGllZCB0byBhIHJlcGVhdGVkIGZhY3RvciBcXCgoeC1cXGxhbWJkYSleclxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKGFfaj1cXGxlZnQuXFxkZnJhY3tkXmp9e2R4Xmp9Rih4KVxccmlnaHR8X3t4PVxcbGFtYmRhfVxcKSIsIkIuIFxcKGFfaj1cXGxlZnQuXFxkZnJhY3sxfXtqIX1cXGRmcmFje2Rean17ZHhean1cXGJpZ1soeC1cXGxhbWJkYSleckYoeClcXGJpZ11cXHJpZ2h0fF97eD1cXGxhbWJkYX1cXCkiLCJDLiBcXChhX2o9XFxsZWZ0LmohXFxkZnJhY3tkXmp9e2R4Xmp9XFxiaWdbKHgtXFxsYW1iZGEpXnJGKHgpXFxiaWddXFxyaWdodHxfe3g9XFxsYW1iZGF9XFwpIiwiRC4gXFwoYV9qPVxcbGVmdC5cXGRmcmFjezF9e2ohfSh4LVxcbGFtYmRhKV5yRih4KVxccmlnaHR8X3t4PVxcbGFtYmRhfVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBjb3JyZWN0IHJ1bGUgaXMgdG8gcmVtb3ZlIHRoZSByZXBlYXRlZCBmYWN0b3IgZmlyc3QsIHRha2UgdGhlIFxcKGpcXCktdGggZGVyaXZhdGl2ZSwgZGl2aWRlIGJ5IFxcKGohXFwpLCBhbmQgdGhlbiBldmFsdWF0ZSBhdCBcXCh4PVxcbGFtYmRhXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6Ikl0IGZvcmdldHMgdG8gcmVtb3ZlIHRoZSByZXBlYXRlZCBmYWN0b3IgYmVmb3JlIGRpZmZlcmVudGlhdGluZy4iLCJDIjoiVGhlIGZhY3RvcmlhbCBiZWxvbmdzIGluIHRoZSBkZW5vbWluYXRvciwgbm90IHRoZSBudW1lcmF0b3IuIiwiRCI6IlRoaXMgb25seSByZXNlbWJsZXMgdGhlIFxcKGo9MFxcKSBjYXNlIGFuZCBpcyBub3QgdGhlIGdlbmVyYWwgcnVsZS4ifSwiaGludCI6IlRoZXJlIGFyZSB0aHJlZSBpbmdyZWRpZW50czogaGlkZSB0aGUgcmVwZWF0ZWQgZmFjdG9yLCBkaWZmZXJlbnRpYXRlIFxcKGpcXCkgdGltZXMsIGRpdmlkZSBieSBcXChqIVxcKS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTMiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkEgc3R1ZGVudCB3cml0ZXMgdGhlIGV4cGFuc2lvbiBmb3IgYSByZXBlYXRlZCBjdWJpYyBmYWN0b3IgY29ycmVjdGx5IGJ1dCBjb21wdXRlcyBcXChhXzJcXCkgYnkgdGFraW5nIHRoZSBzZWNvbmQgZGVyaXZhdGl2ZSBvZiB0aGUgaGlkZGVuIGV4cHJlc3Npb24gYW5kIGZvcmdldHRpbmcgdGhlIFxcKDIhXFwpLiBXaGF0IHNob3VsZCB0aGUgY29ycmVjdGVkIHN0ZXAgYmU/IiwiaWRlYWxfYW5zd2VyIjoiQWZ0ZXIgaGlkaW5nIHRoZSByZXBlYXRlZCBmYWN0b3IsIGNvbXB1dGUgXFwoYV8yPVxcbGVmdC5cXGRmcmFjezF9ezIhfVxcZGZyYWN7ZF4yfXtkeF4yfVtcXHRleHR7aGlkZGVuIGV4cHJlc3Npb259XVxccmlnaHR8X3t4PVxcbGFtYmRhfVxcKS4gVGhlIHNlY29uZCBkZXJpdmF0aXZlIG11c3QgYmUgZGl2aWRlZCBieSBcXCgyXFwpLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3Qgc3RhdGUgdGhhdCB0aGUgaGlkZGVuIGV4cHJlc3Npb24gaXMgZGlmZmVyZW50aWF0ZWQgdHdpY2UiLCJNdXN0IGluY2x1ZGUgZGl2aXNpb24gYnkgXFwoMiFcXCkgb3IgXFwoMlxcKSIsIk11c3QgaW5kaWNhdGUgZXZhbHVhdGlvbiBhdCBcXCh4ID0gXFxsYW1iZGFcXCkiXSwiZXhwbGFuYXRpb24iOiJUaGlzIGNoZWNrcyB0aGUgbW9zdCBjb21tb24gdHJhcCBpbiByZXBlYXRlZC1mYWN0b3IgY29lZmZpY2llbnQgZm9ybXVsYXMuIiwiaGludCI6IlNlY29uZCBkZXJpdmF0aXZlIG1lYW5zIFxcKGo9MlxcKSwgc28gdGhlIGZhY3RvcmlhbCBpcyBub3Qgb3B0aW9uYWwuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoid29ya2VkX2V4YW1wbGVfcmVhZGluZyIsImxhYmVsIjoiUmVhZGluZyBhbmQgcmVwcm9kdWNpbmcgdGhlIHN0YW5kYXJkIHdvcmtlZCBleGFtcGxlIHBhdHRlcm4iLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJbiBFeGFtcGxlIEIuMTAsIGFmdGVyIHdyaXRpbmcgXFwoRih4KT1cXGRmcmFje2FfMH17KHgrMSleM30rXFxkZnJhY3thXzF9eyh4KzEpXjJ9K1xcZGZyYWN7YV8yfXt4KzF9K1xcZGZyYWN7a317eCsyfVxcKSwgd2hpY2ggY29lZmZpY2llbnQgaXMgZm91bmQgZmlyc3QgYnkgb3JkaW5hcnkgY292ZXItdXAgYXQgXFwoeD0tMlxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKGFfMFxcKSIsIkIuIFxcKGFfMVxcKSIsIkMuIFxcKGFfMlxcKSIsIkQuIFxcKGtcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJEIiwiZXhwbGFuYXRpb24iOiJUaGUgdW5yZXBlYXRlZCBmYWN0b3IgXFwoKHgrMilcXCkgdXNlcyBvcmRpbmFyeSBIZWF2aXNpZGUgY292ZXItdXAgZGlyZWN0bHksIHNvIFxcKGtcXCkgaXMgZm91bmQgZmlyc3QgYXQgXFwoeD0tMlxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIG9uZSBjb21lcyBmcm9tIGhpZGluZyBcXCgoeCsxKV4zXFwpIGFuZCBldmFsdWF0aW5nIGF0IFxcKHg9LTFcXCkuIiwiQiI6IlRoaXMgcmVxdWlyZXMgYSBkZXJpdmF0aXZlIGFmdGVyIGhpZGluZyB0aGUgcmVwZWF0ZWQgZmFjdG9yLiIsIkMiOiJUaGlzIHJlcXVpcmVzIHRoZSBzZWNvbmQtZGVyaXZhdGl2ZSBydWxlIHdpdGggZmFjdG9yaWFsIGFkanVzdG1lbnQuIn0sImhpbnQiOiJTaW1wbGUgdW5yZXBlYXRlZCBmYWN0b3JzIHN0aWxsIHVzZSB0aGUgb3JkaW5hcnkgcXVpY2sgbWV0aG9kLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
