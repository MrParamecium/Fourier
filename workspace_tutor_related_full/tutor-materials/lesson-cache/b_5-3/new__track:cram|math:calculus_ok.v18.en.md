%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6Im1hdHBsb3RsaWIiLCJyYXRpb25hbGUiOiJObyB0ZXh0Ym9vayBmaWd1cmUgY3JvcHMgYXJlIGF2YWlsYWJsZSwgYnV0IHRoaXMgc2VjdGlvbiBpcyBoaWdobHkgcGF0dGVybi1iYXNlZC4gQSBjbGVhbiBnZW5lcmF0ZWQgdmlzdWFsIGNhbiBzaG93IHRoZSBkZW5vbWluYXRvciBzdHJ1Y3R1cmUgYW5kIHRoZSBtYXRjaGluZyBwYXJ0aWFsLWZyYWN0aW9uIHRlbXBsYXRlIGZhc3RlciB0aGFuIGRlbnNlIGFsZ2VicmEgdGV4dC4iLCJjcmFtIjoiVXNlIHZpc3VhbHMgdG8gaGVscCB0aGUgc3R1ZGVudCBpbnN0YW50bHkgc3BvdDogcmVwZWF0ZWQgZmFjdG9yIG1lYW5zIGEgc3RhY2sgb2YgcG93ZXJzIGluIHRoZSBleHBhbnNpb24sIGFuZCB0aGUgcmVwZWF0ZWQgcm9vdCBpcyB3aGVyZSBkZXJpdmF0aXZlcyBhcmUgZXZhbHVhdGVkLiIsInN0YW5kYXJkIjoiVXNlIHZpc3VhbHMgdG8gbWFwIHRoZSBkZW5vbWluYXRvciBzdHJ1Y3R1cmUgdG8gdGhlIGV4cGFuc2lvbiBmb3JtIGFuZCBzdXBwb3J0IHRoZSB3b3JrZWQgZXhhbXBsZS4iLCJ0b3Bfc2NvcmUiOiJVc2UgdmlzdWFscyB0byBjb250cmFzdCByZXBlYXRlZCB2ZXJzdXMgdW5yZXBlYXRlZCBmYWN0b3JzIGFuZCBleHBvc2UgaW5kZXhpbmcgbWlzdGFrZXMsIG1pc3NpbmcgdGVybXMsIGFuZCBkZXJpdmF0aXZlLW9yZGVyIHRyYXBzLiJ9" style="display:none;"></div>%%KC_END%%
# B.5-3 Repeated Factors of Q(x)

> **Section Objective:** Master the partial-fraction template and coefficient-finding rules when the denominator contains a repeated linear factor — a reliable exam topic.

---

Three things get tested here. First, writing the **correct expansion template**: a repeated factor \((x-\lambda)^r\) demands exactly \(r\) separate terms, one for each power from \(r\) down to \(1\). Second, using the **ordinary Heaviside cover-up** for every unrepeated factor — that part is unchanged. Third, using **derivatives at the repeated root** to find the repeated-factor coefficients: evaluate the concealed expression at \(x=\lambda\) for the first coefficient, then differentiate once for the next, twice for the next, and so on.

**Fast recognition rule:** the moment you see \((x-\lambda)^r\) in the denominator, you must write a stack of \(r\) terms.

#### Warning
The single most common trap is writing only one term for a repeated factor. Every intermediate power is required — none may be skipped.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="exam_pattern_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgdG8gbWVtb3JpemUgdGhlIHJlcGVhdGVkLWZhY3RvciB0ZW1wbGF0ZSBhdCBhIGdsYW5jZS4iLCJzdGFuZGFyZCI6IlVzZSB0aGlzIHRvIGNvbm5lY3QgZGVub21pbmF0b3Igc3RydWN0dXJlIHRvIHRoZSBjb3JyZWN0IGV4cGFuc2lvbiBmb3JtLiIsInRvcF9zY29yZSI6IlVzZSB0aGlzIHRvIGNvbXBhcmUgcmVwZWF0ZWQgYW5kIHVucmVwZWF0ZWQgZmFjdG9ycyBhbmQgY2F0Y2ggb21pdHRlZCB0ZXJtcy4ifQ==" style="display:none;"></div>%%KC_END%%
*📊 Template map: a repeated factor \((x-\lambda)^r\) expands into \(r\) stacked terms (red), while each unrepeated factor gives exactly one term (blue). No intermediate power may be omitted.*
![Chart](/generated/fig-1777195826480-yoqzsv20.png)

$$F(x)=\frac{P(x)}{(x-\lambda)^r(x-\alpha_1)(x-\alpha_2)\cdots(x-\alpha_j)}=\frac{a_0}{(x-\lambda)^r}+\frac{a_1}{(x-\lambda)^{r-1}}+\cdots+\frac{a_{r-1}}{x-\lambda}+\frac{k_1}{x-\alpha_1}+\frac{k_2}{x-\alpha_2}+\cdots+\frac{k_j}{x-\alpha_j}$$
*A repeated factor of order \(r\) in the denominator generates exactly \(r\) separate partial-fraction terms, one for each integer power from \(r\) down to \(1\), while each unrepeated factor \((x-\alpha_i)\) contributes exactly one term.*

## 1. Fast Coefficient Rules

Once the template is written, finding each coefficient follows a two-track rule.

**Unrepeated factors** — use the standard **Heaviside cover-up**: multiply both sides by \((x-\alpha_i)\) and set \(x=\alpha_i\). Nothing new here.

**Repeated factor \((x-\lambda)^r\)** — first **conceal** the entire repeated factor by forming the product \((x-\lambda)^r F(x)\). Call this \(G(x)\).

- Evaluate \(G(x)\) at \(x=\lambda\) → gives \(a_0\).
- Take one derivative \(G'(x)\) and evaluate at \(x=\lambda\) → gives \(a_1\).
- In general: \(a_j = \dfrac{1}{j!}\, G^{(j)}(\lambda)\).

Memory hook: **same root, higher derivative order** — you return to \(x=\lambda\) every time, but increase the derivative order by one for each successive coefficient.

#### Trap
Do **not** differentiate the original \(F(x)\). Always differentiate the concealed expression \(G(x) = (x-\lambda)^r F(x)\).

$$a_0=\left[(x-\lambda)^rF(x)\right]_{x=\lambda},\qquad a_1=\left[\frac{d}{dx}\big((x-\lambda)^rF(x)\big)\right]_{x=\lambda},\qquad a_j=\left[\frac{1}{j!}\frac{d^j}{dx^j}\big((x-\lambda)^rF(x)\big)\right]_{x=\lambda}$$
*Every repeated-factor coefficient is extracted from the same concealed expression \((x-\lambda)^r F(x)\), evaluated at the repeated root \(x=\lambda\) after taking \(0, 1, 2, \ldots, r-1\) derivatives in turn — with the \(j\)-th coefficient divided by \(j!\) to cancel the factorial from differentiation.*

## 2. Example Pattern You Should Copy on Exams

Consider Example B.10:

$$
F(x) = \frac{4x^3+16x^2+23x+13}{(x+1)^3(x+2)}
$$

**Step 1 — Write the template:**

$$
F(x) = \frac{a_0}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{k}{x+2}
$$

**Step 2 — Unrepeated root \(x=-2\):** cover-up gives \(k = 1\).

**Step 3 — Repeated root \(x=-1\), used three times:**

Form \(G(x) = (x+1)^3 F(x)\).

- **0th derivative** at \(x=-1\): \(a_0 = G(-1) = 2\).
- **1st derivative** at \(x=-1\): \(a_1 = G'(-1) = 1\).
- **2nd derivative** at \(x=-1\): \(a_2 = \tfrac{1}{2!}G''(-1) = 3\).

Notice: the repeated root \(x=-1\) is reused three times, with derivative orders \(0, 1, 2\) respectively.

**Final result:**

$$
F(x) = \frac{2}{(x+1)^3} + \frac{1}{(x+1)^2} + \frac{3}{x+1} + \frac{1}{x+2}
$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="example_support" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgYXMgYSBvbmUtZ2xhbmNlIHNvbHZlIG9yZGVyOiB0ZW1wbGF0ZSwgaXNvbGF0ZWQgcm9vdCwgZGVyaXZhdGl2ZSBvcmRlciwgZmluYWwgY29lZmZpY2llbnRzLiIsInN0YW5kYXJkIjoiVXNlIHRoaXMgdG8gZm9sbG93IHRoZSB3b3JrZWQgZXhhbXBsZSB3aXRob3V0IGdldHRpbmcgbG9zdCBpbiBzeW1ib2xzLiIsInRvcF9zY29yZSI6IlVzZSB0aGlzIHRvIHZlcmlmeSB3aHkgZWFjaCBjb2VmZmljaWVudCBjb21lcyBmcm9tIGEgZGlmZmVyZW50IGV2YWx1YXRpb24gcnVsZS4ifQ==" style="display:none;"></div>%%KC_END%%
*📊 Example B.10 solve-order map. Left branch: unrepeated root \(x=-2\) gives \(k=1\) by cover-up. Right branch: repeated root \(x=-1\) is visited three times with increasing derivative orders to yield \(a_0=2\), \(a_1=1\), \(a_2=3\).*
![Chart](/generated/fig-1777195827276-cysy8jhe.png)

---
**📌 Key Takeaways**
- A repeated factor \((x-\lambda)^r\) requires exactly \(r\) template terms — one per power, none skipped.
- Unrepeated factors use ordinary Heaviside cover-up; evaluate at the corresponding simple root.
- Repeated-factor coefficients come from derivatives of \((x-\lambda)^r F(x)\) evaluated at the repeated root.

*In the next section we will see a mixed strategy that avoids too much repeated differentiation.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InRlbXBsYXRlX2Zvcl9yZXBlYXRlZF9mYWN0b3IiLCJsYWJlbCI6IldyaXRlIHRoZSBjb3JyZWN0IGV4cGFuc2lvbiB0ZW1wbGF0ZSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggaXMgdGhlIGNvcnJlY3QgcGFydGlhbC1mcmFjdGlvbiBmb3JtIGZvciBcXChGKHgpPVxcZGZyYWN7UCh4KX17KHgtMSleMyh4KzQpfVxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKFxcZGZyYWN7QX17KHgtMSleM30rXFxkZnJhY3tCfXt4LTF9K1xcZGZyYWN7Q317eCs0fVxcKSIsIkIuIFxcKFxcZGZyYWN7QX17KHgtMSleM30rXFxkZnJhY3tCfXsoeC0xKV4yfStcXGRmcmFje0N9e3gtMX0rXFxkZnJhY3tEfXt4KzR9XFwpIiwiQy4gXFwoXFxkZnJhY3tBfXsoeC0xKV4yfStcXGRmcmFje0J9e3gtMX0rXFxkZnJhY3tDfXt4KzR9XFwpIiwiRC4gXFwoXFxkZnJhY3tBfXsoeC0xKV4zKHgrNCl9K1xcZGZyYWN7Qn17eC0xfVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkEgcmVwZWF0ZWQgZmFjdG9yIG9mIG9yZGVyIDMgcmVxdWlyZXMgdGhyZWUgdGVybXM6IHBvd2VycyAzLCAyLCBhbmQgMSwgcGx1cyBvbmUgdGVybSBmb3IgdGhlIHVucmVwZWF0ZWQgZmFjdG9yIFxcKHgrNFxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJJdCBza2lwcyB0aGUgbWlkZGxlIHBvd2VyIFxcKCh4LTEpXjJcXCksIHdoaWNoIGlzIGEgc3RhbmRhcmQgcmVwZWF0ZWQtZmFjdG9yIG1pc3Rha2UuIiwiQyI6Ikl0IGlzIG1pc3NpbmcgdGhlIGhpZ2hlc3QtcG93ZXIgdGVybSBcXChcXGRmcmFjezF9eyh4LTEpXjN9XFwpLiIsIkQiOiJUaGlzIGlzIG5vdCB0aGUgc3RhbmRhcmQgZGVjb21wb3NlZCBwYXJ0aWFsLWZyYWN0aW9uIGZvcm0uIn0sImhpbnQiOiJGb3IgYSBjdWJlLCBsaXN0IGV2ZXJ5IGRlbm9taW5hdG9yIHBvd2VyIGRvd24gdG8gdGhlIGZpcnN0IHBvd2VyLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJ0ZW1wbGF0ZV9tYXBwaW5nX2RpYWdyYW0iLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIHRoZSBkZW5vbWluYXRvciBjb250YWlucyBcXCgoeCsyKV4yKHgtNSleMlxcKSwgaG93IG1hbnkgc2VwYXJhdGUgcGFydGlhbC1mcmFjdGlvbiB0ZXJtcyBjb21lIGZyb20gdGhlc2UgcmVwZWF0ZWQgZmFjdG9ycyB0b2dldGhlcj8iLCJvcHRpb25zIjpbIkEuIDIiLCJCLiAzIiwiQy4gNCIsIkQuIDUiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJFYWNoIHNxdWFyZWQgZmFjdG9yIGNvbnRyaWJ1dGVzIHR3byB0ZXJtczogb25lIG92ZXIgdGhlIHNxdWFyZSBhbmQgb25lIG92ZXIgdGhlIGZpcnN0IHBvd2VyLCBzbyBcXCgyKzI9NFxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGF0IHdvdWxkIGNvdW50IG9uZSB0ZXJtIHBlciByZXBlYXRlZCBmYWN0b3IsIHdoaWNoIGlzIHRvbyBmZXcuIiwiQiI6IlRoZXJlIGlzIG5vIHJlYXNvbiBvbmUgb2YgdGhlIHNxdWFyZWQgZmFjdG9ycyB3b3VsZCBjb250cmlidXRlIG9ubHkgb25lIHRlcm0uIiwiRCI6IlRoYXQgd291bGQgcmVxdWlyZSBhbiBleHRyYSBkZW5vbWluYXRvciBwb3dlciB0aGF0IGRvZXMgbm90IGV4aXN0LiJ9LCJoaW50IjoiQSBzcXVhcmVkIGZhY3RvciBhbHdheXMgZ2l2ZXMgdHdvIHRlcm1zLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiY29lZmZpY2llbnRfcnVsZXMiLCJsYWJlbCI6IlVzZSBjb3Zlci11cCBhbmQgZGVyaXZhdGl2ZXMgY29ycmVjdGx5IiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgYSByZXBlYXRlZCBmYWN0b3IgXFwoKHgtXFxsYW1iZGEpXnJcXCksIHdoaWNoIGV4cHJlc3Npb24gc2hvdWxkIHlvdSBkaWZmZXJlbnRpYXRlIHRvIG9idGFpbiBcXChhXzEsIGFfMiwgXFxsZG90c1xcKT8iLCJvcHRpb25zIjpbIkEuIFxcKEYoeClcXCkiLCJCLiBcXChcXGRmcmFje0YoeCl9eyh4LVxcbGFtYmRhKV5yfVxcKSIsIkMuIFxcKCh4LVxcbGFtYmRhKV5yIEYoeClcXCkiLCJELiBPbmx5IHRoZSBudW1lcmF0b3IgXFwoUCh4KVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IllvdSBmaXJzdCBjb25jZWFsIHRoZSByZXBlYXRlZCBmYWN0b3IgYnkgbXVsdGlwbHlpbmcgXFwoRih4KVxcKSBieSBcXCgoeC1cXGxhbWJkYSleclxcKS4gVGhlbiB5b3UgZGlmZmVyZW50aWF0ZSB0aGF0IGNvbmNlYWxlZCBleHByZXNzaW9uIGFuZCBldmFsdWF0ZSBhdCBcXCh4PVxcbGFtYmRhXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkRpZmZlcmVudGlhdGluZyB0aGUgb3JpZ2luYWwgcmF0aW9uYWwgZnVuY3Rpb24gZGlyZWN0bHkgaXMgbm90IHRoZSB0ZXh0Ym9vayBydWxlIGhlcmUuIiwiQiI6IlRoaXMgaW5zZXJ0cyB0aGUgcmVwZWF0ZWQgZmFjdG9yIGFnYWluIGluIHRoZSBkZW5vbWluYXRvciBpbnN0ZWFkIG9mIGNvbmNlYWxpbmcgaXQuIiwiRCI6IlRoZSBkZW5vbWluYXRvciBzdGlsbCBtYXR0ZXJzIHRocm91Z2ggdGhlIGNvbmNlYWxlZCBleHByZXNzaW9uLiJ9LCJoaW50IjoiQ29uY2VhbCBmaXJzdCwgdGhlbiBkaWZmZXJlbnRpYXRlLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiU3VwcG9zZSBcXChGKHgpPVxcZGZyYWN7UCh4KX17KHgtMyleNCh4KzEpfVxcKS4gV2hpY2ggcnVsZSBnaXZlcyB0aGUgY29lZmZpY2llbnQgb2YgXFwoXFxkZnJhY3sxfXsoeC0zKV4yfVxcKSBpbiB0aGUgZXhwYW5zaW9uPyIsIm9wdGlvbnMiOlsiQS4gRXZhbHVhdGUgXFwoKHgtMyleNCBGKHgpXFwpIGF0IFxcKHg9M1xcKSIsIkIuIEV2YWx1YXRlIHRoZSBmaXJzdCBkZXJpdmF0aXZlIG9mIFxcKCh4LTMpXjQgRih4KVxcKSBhdCBcXCh4PTNcXCkiLCJDLiBFdmFsdWF0ZSBcXChcXGRmcmFjezF9ezIhfVxcKSB0aW1lcyB0aGUgc2Vjb25kIGRlcml2YXRpdmUgb2YgXFwoKHgtMyleNCBGKHgpXFwpIGF0IFxcKHg9M1xcKSIsIkQuIFVzZSBjb3Zlci11cCBhdCBcXCh4PS0xXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiVGhlIHRlcm0gXFwoXFxkZnJhY3sxfXsoeC0zKV4yfVxcKSBjb3JyZXNwb25kcyB0byBjb2VmZmljaWVudCBcXChhXzJcXCkgaW4gdGhlIHRleHRib29rIG5vdGF0aW9uLCBzbyB1c2UgdGhlIHNlY29uZCBkZXJpdmF0aXZlIGRpdmlkZWQgYnkgXFwoMiFcXCkgYXQgdGhlIHJlcGVhdGVkIHJvb3QuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhhdCBnaXZlcyBcXChhXzBcXCksIHRoZSBjb2VmZmljaWVudCBvZiBcXChcXGRmcmFjezF9eyh4LTMpXjR9XFwpLiIsIkIiOiJUaGF0IGdpdmVzIFxcKGFfMVxcKSwgdGhlIGNvZWZmaWNpZW50IG9mIFxcKFxcZGZyYWN7MX17KHgtMyleM31cXCkuIiwiRCI6IlxcKHg9LTFcXCkgaXMgZm9yIHRoZSB1bnJlcGVhdGVkIGZhY3Rvciwgbm90IHRoZSByZXBlYXRlZC1yb290IHN0YWNrLiJ9LCJoaW50IjoiTWF0Y2ggZGVub21pbmF0b3IgcG93ZXIgdG8gZGVyaXZhdGl2ZSBvcmRlciBjYXJlZnVsbHkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJleGFtcGxlX0IxMF9leGVjdXRpb24iLCJsYWJlbCI6IlJlYWQgYW5kIGV4ZWN1dGUgdGhlIHJlcGVhdGVkLXJvb3QgZXhhbXBsZSBwYXR0ZXJuIiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkluIEV4YW1wbGUgQi4xMCwgd2hpY2ggdmFsdWUgaXMgZm91bmQgYnkgb3JkaW5hcnkgY292ZXItdXAgYXQgXFwoeD0tMlxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKGFfMFxcKSIsIkIuIFxcKGFfMVxcKSIsIkMuIFxcKGFfMlxcKSIsIkQuIFxcKGtcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJEIiwiZXhwbGFuYXRpb24iOiJcXCh4PS0yXFwpIGNvbWVzIGZyb20gdGhlIHVucmVwZWF0ZWQgZmFjdG9yIFxcKHgrMlxcKSwgc28gb3JkaW5hcnkgY292ZXItdXAgZ2l2ZXMgdGhlIGNvZWZmaWNpZW50IFxcKGtcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiXFwoYV8wXFwpIGJlbG9uZ3MgdG8gdGhlIHJlcGVhdGVkIGZhY3RvciBhdCBcXCh4PS0xXFwpLiIsIkIiOiJcXChhXzFcXCkgaXMgZnJvbSB0aGUgZmlyc3QgZGVyaXZhdGl2ZSBhdCBcXCh4PS0xXFwpLiIsIkMiOiJcXChhXzJcXCkgaXMgZnJvbSB0aGUgc2Vjb25kIGRlcml2YXRpdmUgYXQgXFwoeD0tMVxcKS4ifSwiaGludCI6IlVucmVwZWF0ZWQgcm9vdCDihpIgb3JkaW5hcnkgY292ZXItdXAuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiRm9yIEV4YW1wbGUgQi4xMCwgbGlzdCB0aGUgY29lZmZpY2llbnRzIGluIHRoZSBvcmRlciB0aGV5IGFyZSBtb3N0IG5hdHVyYWxseSBmb3VuZCBkdXJpbmcgdGhlIHNvbHV0aW9uLCBhbmQgc3RhdGUgdGhlIG9wZXJhdGlvbiB1c2VkIGZvciBlYWNoLiIsImlkZWFsX2Fuc3dlciI6IlxcKGs9MVxcKSBieSBjb3Zlci11cCBhdCBcXCh4PS0yXFwpOyBcXChhXzA9MlxcKSBieSBldmFsdWF0aW5nIHRoZSBjb25jZWFsZWQgZXhwcmVzc2lvbiBcXCgoeCsxKV4zIEYoeClcXCkgYXQgXFwoeD0tMVxcKTsgXFwoYV8xPTFcXCkgYnkgdGhlIGZpcnN0IGRlcml2YXRpdmUgb2YgdGhlIGNvbmNlYWxlZCBleHByZXNzaW9uIGF0IFxcKHg9LTFcXCk7IFxcKGFfMj0zXFwpIGJ5IG9uZS1oYWxmIG9mIHRoZSBzZWNvbmQgZGVyaXZhdGl2ZSBvZiB0aGUgY29uY2VhbGVkIGV4cHJlc3Npb24gYXQgXFwoeD0tMVxcKS4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IGxpc3QgXFwoa1xcKSwgXFwoYV8wXFwpLCBcXChhXzFcXCksIFxcKGFfMlxcKSBpbiBhIHNlbnNpYmxlIHNvbHZpbmcgb3JkZXIiLCJNdXN0IGNvbm5lY3QgXFwoeD0tMlxcKSB0byBjb3Zlci11cCBmb3IgdGhlIHVucmVwZWF0ZWQgZmFjdG9yIiwiTXVzdCBjb25uZWN0IFxcKHg9LTFcXCkgdG8gZXZhbHVhdGlvbiwgZmlyc3QgZGVyaXZhdGl2ZSwgYW5kIHNlY29uZCBkZXJpdmF0aXZlIGRpdmlkZWQgYnkgXFwoMiFcXCkgZm9yIHRoZSByZXBlYXRlZCBmYWN0b3IiLCJOdW1lcmljYWwgdmFsdWVzIFxcKGs9MVxcKSwgXFwoYV8wPTJcXCksIFxcKGFfMT0xXFwpLCBcXChhXzI9M1xcKSBtdXN0IGFsbCBiZSBjb3JyZWN0Il0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCBjYW4gcmVwcm9kdWNlIHRoZSBleGFtcGxlIGFzIGEgc29sdmUgcHJvY2VkdXJlLCBub3QganVzdCByZWNvZ25pemUgaXNvbGF0ZWQgZmFjdHMuIiwiaGludCI6IlRoZXJlIGlzIG9uZSB1bnJlcGVhdGVkIHJvb3QgYW5kIG9uZSByZXBlYXRlZCByb290IHVzZWQgdGhyZWUgdGltZXMuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfV19" style="display:none;"></div>%%KC_END%%
