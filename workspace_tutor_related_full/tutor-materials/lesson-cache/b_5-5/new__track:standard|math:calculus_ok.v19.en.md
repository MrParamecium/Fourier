%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImdlbmVyYXRlZF9pbWFnZSIsInJhdGlvbmFsZSI6IlRoaXMgc2VjdGlvbiBoYXMgbm8gZXh0cmFjdGVkIHRleHRib29rIGZpZ3VyZXMsIGJ1dCB0aGUgbWFpbiBpZGVhIGlzIGhpZ2hseSB2aXN1YWw6IHN0dWRlbnRzIG5lZWQgdG8gc2VlIHRoZSBzdHJ1Y3R1cmUgJ2NvbnN0YW50IHBsdXMgb3JkaW5hcnkgcGFydGlhbCBmcmFjdGlvbnMnIGFuZCB0aGUgc3RlcCBvcmRlciBmb3IgdGhlIHdvcmtlZCBleGFtcGxlLiBDbGVhbiBnZW5lcmF0ZWQgbGVjdHVyZS1ub3RlIHZpc3VhbHMgd2lsbCBtYWtlIHRoZSBtID0gbiBjYXNlIGVhc2llciB0byBkaXN0aW5ndWlzaCBmcm9tIHRoZSB1c3VhbCBwcm9wZXIgY2FzZSBhbmQgd2lsbCBzdXBwb3J0IHRoZSBzdHVkZW50J3Mgd2VhayBhcmVhIGluIGludmVyc2Ugei10cmFuc2Zvcm0gYXBwbGljYXRpb24uIiwiY3JhbSI6IlVzZSB2aXN1YWxzIHRvIG1ha2UgdGhlIHJlY29nbml0aW9uIHBhdHRlcm4gaW1tZWRpYXRlOiBzYW1lIGRlZ3JlZSBtZWFucyBwdWxsIG91dCBvbmUgY29uc3RhbnQgZmlyc3QsIHRoZW4gc29sdmUgdGhlIHJlbWFpbmluZyBmcmFjdGlvbnMgbm9ybWFsbHkuIiwic3RhbmRhcmQiOiJVc2UgdmlzdWFscyB0byBzaG93IHRoZSBjb25jZXB0IHN0cnVjdHVyZSBhbmQgb25lIHJlcHJlc2VudGF0aXZlIHdvcmtlZCBleGFtcGxlIHdpdGggYSBjbGVhbiBsZWZ0LXRvLXJpZ2h0IHJlYWRpbmcgcGF0aC4iLCJ0b3Bfc2NvcmUiOiJVc2UgdmlzdWFscyB0byBleHBvc2UgdGhlIGRpc3RpbmN0aW9uIGJldHdlZW4gb3JkaW5hcnkgaW1wcm9wZXIgaGFuZGxpbmcgYW5kIHRoZSBzcGVjaWFsIG0gPSBuIHNob3J0Y3V0LCBwbHVzIHRoZSBsaW5rIHRvIG1vZGlmaWVkIHBhcnRpYWwgZnJhY3Rpb25zLiJ9" style="display:none;"></div>%%KC_END%%
# Partial Fractions — The Special Case \(m = n\)

> **Section Objective:** Handle the improper rational function case where the numerator and denominator share the same degree, using a compact shortcut that avoids full polynomial long division.

---

Sometimes a rational function \(F(x)\) is improper — the numerator degree equals the denominator degree. This is the **special case \(m = n\)**. Rather than performing a full long division, this section shows a direct shortcut: the expansion looks almost identical to the proper-function case, with exactly one extra constant term added at the front.

Mastering this case speeds up partial-fraction work and directly supports inverse z-transform techniques covered later.

First, identify the extra constant; then find the remaining coefficients in the usual way.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiU2hvdyB0aGUgcmVjb2duaXRpb24gcnVsZSBpbiBvbmUgZ2xhbmNlOiBzYW1lIGRlZ3JlZSBsZWFkcyB0byBjb25zdGFudCBwbHVzIGZyYWN0aW9ucy4iLCJzdGFuZGFyZCI6IkNsYXJpZnkgdGhlIGNvbmNlcHQgYnkgY29udHJhc3RpbmcgdGhlIG0gPSBuIGNhc2Ugd2l0aCB0aGUgdXN1YWwgcHJvcGVyLWZvcm0gdGVtcGxhdGUuIiwidG9wX3Njb3JlIjoiSGlnaGxpZ2h0IGV4YWN0bHkgd2hhdCBjaGFuZ2VzIGFuZCB3aGF0IHN0YXlzIHVuY2hhbmdlZCBpbiB0aGUgY29lZmZpY2llbnQtZmluZGluZyBwcm9jZXNzLiJ9" style="display:none;"></div>%%KC_END%%
*🎨 Left: the proper case leads directly to partial fractions. Right: when \(m = n\), one extra constant \(b_n\) appears before the same partial-fraction terms.*
![Illustration](/generated/gptimage2-1777212134245-7877.png)

$$F(x)=\frac{b_n x^n+b_{n-1}x^{n-1}+\cdots+b_1x+b_0}{x^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0}=b_n+\frac{k_1}{x-\lambda_1}+\frac{k_2}{x-\lambda_2}+\cdots+\frac{k_n}{x-\lambda_n}$$
*When the numerator and denominator have equal degree \(n\), the expansion gains exactly one extra constant term \(b_n\) — the leading coefficient of the numerator. Everything to the right of \(b_n\) is an ordinary partial-fraction decomposition, handled exactly as in the proper case.*

$$k_r=\left.(x-\lambda_r)F(x)\right|_{x=\lambda_r}$$
*This cover-up formula for each coefficient \(k_r\) is unchanged. After the extra constant \(b_n\) has been identified and separated, you apply this substitution rule to the remaining partial-fraction terms exactly as you would for a proper rational function.*

## 1. How the \(m = n\) Case Works

Follow three clear steps whenever you encounter a rational function whose numerator and denominator share the same degree.

**Step 1 — Check degrees.** Confirm that the numerator degree equals the denominator degree. If \(m < n\), you are in the ordinary proper case and no extra constant is needed.

**Step 2 — Write the expanded template.** Place the leading numerator coefficient \(b_n\) as a standalone constant, then append the usual partial-fraction terms for each factor of the denominator.

**Step 3 — Compute coefficients normally.** Use the cover-up substitution \(k_r = (x - \lambda_r)F(x)\big|_{x=\lambda_r}\) for each root. Repeated or quadratic factors follow their usual procedures — nothing changes there.

### EXAM TIP

Students often overcomplicate this case by performing full polynomial long division. For this textbook form, the only visible change is the single extra constant \(b_n\) at the front. Recognize it, write it down, and proceed.

## 2. Representative Example

Work through the textbook example:

$$
F(x) = \frac{3x^2 + 9x - 20}{(x-2)(x+3)}
$$

**Identify degrees.** The numerator is degree 2; the denominator expands to degree 2. So \(m = n = 2\), and the extra constant equals the leading numerator coefficient: \(b_2 = 3\).

**Write the template.**

$$
F(x) = 3 + \frac{k_1}{x-2} + \frac{k_2}{x+3}
$$

**Find \(k_1\).** Substitute \(x = 2\):

$$
k_1 = (x-2)F(x)\big|_{x=2} = \frac{3x^2+9x-20}{x+3}\bigg|_{x=2} = \frac{12+18-20}{5} = \frac{10}{5} = 2
$$

**Find \(k_2\).** Substitute \(x = -3\):

$$
k_2 = (x+3)F(x)\big|_{x=-3} = \frac{3x^2+9x-20}{x-2}\bigg|_{x=-3} = \frac{27-27-20}{-5} = \frac{-20}{-5} = 4
$$

**Final expansion.**

$$
F(x) = 3 + \frac{2}{x-2} + \frac{4}{x+3}
$$

### KEY INSIGHT

Both \(k_1\) and \(k_2\) were found using the same cover-up idea the student already knows — the extra constant \(3\) did not interfere with the coefficient calculation at all.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="example_support" data-visual-use-b64="eyJjcmFtIjoiVHVybiB0aGUgZXhhbXBsZSBpbnRvIGEgZmFzdCByZXVzYWJsZSB0ZW1wbGF0ZSBmb3Igc2ltaWxhciBleGFtIHF1ZXN0aW9ucy4iLCJzdGFuZGFyZCI6IlNob3cgdGhlIGV4YWN0IG9yZGVyOiBpZGVudGlmeSBjb25zdGFudCwgd3JpdGUgdGVtcGxhdGUsIHBsdWcgcm9vdHMsIGZpbmlzaCBleHBhbnNpb24uIiwidG9wX3Njb3JlIjoiRW1waGFzaXplIHdoaWNoIHF1YW50aXRpZXMgY29tZSBmcm9tIGRlZ3JlZSBjb21wYXJpc29uIHZlcnN1cyB3aGljaCBjb21lIGZyb20gZmFjdG9yIHN1YnN0aXR1dGlvbi4ifQ==" style="display:none;"></div>%%KC_END%%
*🎨 Step-flow for \(F(x) = (3x^2+9x-20)/((x-2)(x+3))\): the constant \(3\) comes from degree comparison; \(k_1 = 2\) and \(k_2 = 4\) come from root substitution.*
![Illustration](/generated/gptimage2-1777212323987-9203.png)

## 3. Why This Matters for Modified Partial Fractions

> **Preview:** The next topic uses a variation called *modified partial fractions*, where the desired term shape is \(kx/(x-\lambda)^r\) rather than \(k/(x-\lambda)^r\).

The standard move is to expand \(F(x)/x\) first using ordinary partial fractions, then multiply every term back by \(x\). This converts each \(k/(x-\lambda)\) into \(kx/(x-\lambda)\), which is the modified form needed for inverse z-transform tables.

For example, after expanding \(F(x)/x\) and multiplying back, you obtain terms like \(x/(x+2)\), \(2x/(x+3)\), and \(x/(x+3)^2\). The \(m = n\) shortcut from this section appears naturally in that process whenever the degrees match before or after the division by \(x\).

This page is a preview only — the full method is developed in the next section.

---
**📌 Key Takeaways**
- When numerator and denominator degrees are equal (\(m = n\)), add one extra constant \(b_n\) to the expansion.
- The extra constant equals the leading numerator coefficient; no long division is required.
- All remaining partial-fraction coefficients \(k_r\) are found by the same cover-up substitution as in the proper case.

*In the next section, we extend this idea to modified partial fractions — expanding \(F(x)/x\) and multiplying back by \(x\) — which is the key technique for computing inverse z-transforms from tables.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlY29nbml6ZV9tX2VxdWFsc19uX3N0cnVjdHVyZSIsImxhYmVsIjoiUmVjb2duaXplIHRoZSBzcGVjaWFsIG0gPSBuIHNldHVwIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJZiB0aGUgbnVtZXJhdG9yIGFuZCBkZW5vbWluYXRvciBvZiBcXChGKHgpXFwpIGhhdmUgdGhlIHNhbWUgZGVncmVlLCB3aGljaCBwYXJ0aWFsLWZyYWN0aW9uIGZvcm0gbWF0Y2hlcyB0aGlzIHNlY3Rpb24/Iiwib3B0aW9ucyI6WyJBLiBcXChGKHgpPVxcZGZyYWN7a18xfXt4LVxcbGFtYmRhXzF9K1xcY2RvdHMrXFxkZnJhY3trX259e3gtXFxsYW1iZGFfbn1cXCkgb25seSIsIkIuIFxcKEYoeCk9Yl9uK1xcZGZyYWN7a18xfXt4LVxcbGFtYmRhXzF9K1xcY2RvdHMrXFxkZnJhY3trX259e3gtXFxsYW1iZGFfbn1cXCkiLCJDLiBcXChGKHgpPXgrYl9uK1xcZGZyYWN7a18xfXt4LVxcbGFtYmRhXzF9K1xcY2RvdHNcXCkiLCJELiBcXChGKHgpXFwpIGNhbm5vdCBiZSBleHBhbmRlZCBieSBwYXJ0aWFsIGZyYWN0aW9ucyJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkZvciB0aGUgc3BlY2lhbCBpbXByb3BlciBjYXNlIFxcKG0gPSBuXFwpLCB0aGUgZXhwYW5zaW9uIGlzIHRoZSB1c3VhbCBwYXJ0aWFsLWZyYWN0aW9uIGZvcm0gcGx1cyBvbmUgZXh0cmEgY29uc3RhbnQgdGVybSBcXChiX25cXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBtaXNzZXMgdGhlIGV4dHJhIGNvbnN0YW50IHRlcm0gdGhhdCBhcHBlYXJzIHdoZW4gdGhlIGRlZ3JlZXMgYXJlIGVxdWFsLiIsIkMiOiJUaGUgYWRkZWQgdGVybSBpcyBhIGNvbnN0YW50LCBub3QgYW4gZXh0cmEgXFwoeFxcKSB0ZXJtLiIsIkQiOiJJdCBjYW4gc3RpbGwgYmUgZXhwYW5kZWQ7IHRoaXMgc2VjdGlvbiBnaXZlcyB0aGUgc3BlY2lhbCBmb3JtLiJ9LCJoaW50IjoiQXNrIHdoYXQgY2hhbmdlcyBjb21wYXJlZCB3aXRoIHRoZSBwcm9wZXIgY2FzZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoYXQgaXMgdGhlIG1haW4gcHJhY3RpY2FsIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgcHJvcGVyIGNhc2UgYW5kIHRoZSBzcGVjaWFsIGltcHJvcGVyIGNhc2UgXFwobSA9IG5cXCk/Iiwib3B0aW9ucyI6WyJBLiBZb3UgbXVzdCB1c2UgYSBjb21wbGV0ZWx5IGRpZmZlcmVudCBjb2VmZmljaWVudCBmb3JtdWxhIiwiQi4gWW91IG11c3QgYWx3YXlzIGZhY3RvciB0aGUgbnVtZXJhdG9yIGZpcnN0IiwiQy4gQW4gZXh0cmEgY29uc3RhbnQgYXBwZWFycywgYnV0IHRoZSByZW1haW5pbmcgY29lZmZpY2llbnQgcHJvY2VzcyBzdGF5cyB0aGUgc2FtZSIsIkQuIFJlcGVhdGVkIHJvb3RzIGFyZSBubyBsb25nZXIgYWxsb3dlZCJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlRoZSB0ZXh0Ym9vaydzIGtleSBwb2ludCBpcyB0aGF0IHRoZSBvbmx5IGRpZmZlcmVuY2UgaXMgdGhlIGV4dHJhIGNvbnN0YW50IHRlcm0uIFRoZSByZXN0IG9mIHRoZSBjb2VmZmljaWVudC1maW5kaW5nIG1ldGhvZCBpcyB1bmNoYW5nZWQuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlIGNvZWZmaWNpZW50IGlkZWEgcmVtYWlucyB0aGUgc2FtZS4iLCJCIjoiRmFjdG9yaW5nIHRoZSBudW1lcmF0b3IgaXMgbm90IHRoZSBrZXkgcnVsZSBoZXJlLiIsIkQiOiJSZXBlYXRlZCByb290cyBhcmUgc3RpbGwgaGFuZGxlZCBieSB0aGUgdXN1YWwgcHJvY2VkdXJlcy4ifSwiaGludCI6IkZvY3VzIG9uIHdoYXQgdGhlIHRleHRib29rIHNheXMgaXMgdGhlICdvbmx5IGRpZmZlcmVuY2UuJyIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiZmluZF9jb25zdGFudF9hbmRfY29lZmZpY2llbnRzIiwibGFiZWwiOiJGaW5kIHRoZSBjb25zdGFudCB0ZXJtIGFuZCByZW1haW5pbmcgY29lZmZpY2llbnRzIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgXFwoRih4KT1cXGRmcmFjezN4XjIrOXgtMjB9eyh4LTIpKHgrMyl9XFwpLCB3aGF0IGNvbnN0YW50IGFwcGVhcnMgZmlyc3QgaW4gdGhlIGV4cGFuc2lvbj8iLCJvcHRpb25zIjpbIkEuIDIiLCJCLiAzIiwiQy4gNCIsIkQuIC0zIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiQmVjYXVzZSBcXChtID0gbiA9IDJcXCksIHRoZSBleHRyYSBjb25zdGFudCBpcyB0aGUgbGVhZGluZyBjb2VmZmljaWVudCBvZiB0aGUgbnVtZXJhdG9yLCB3aGljaCBpcyBcXCgzXFwpIGluIHRoaXMgdGV4dGJvb2sgZm9ybS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJcXCgyXFwpIGlzIG9uZSBvZiB0aGUgcGFydGlhbC1mcmFjdGlvbiBjb2VmZmljaWVudHMsIG5vdCB0aGUgY29uc3RhbnQgdGVybS4iLCJDIjoiXFwoNFxcKSBpcyB0aGUgb3RoZXIgcGFydGlhbC1mcmFjdGlvbiBjb2VmZmljaWVudCwgbm90IHRoZSBjb25zdGFudCB0ZXJtLiIsIkQiOiJUaGUgc2lnbiBhbmQgdmFsdWUgZG8gbm90IG1hdGNoIHRoZSBsZWFkaW5nIG51bWVyYXRvciBjb2VmZmljaWVudC4ifSwiaGludCI6Ikxvb2sgYXQgdGhlIGhpZ2hlc3QtZGVncmVlIGNvZWZmaWNpZW50IGluIHRoZSBudW1lcmF0b3IuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiVXNpbmcgXFwoRih4KT0zK1xcZGZyYWN7a18xfXt4LTJ9K1xcZGZyYWN7a18yfXt4KzN9XFwpLCB3aGF0IGlzIFxcKGtfMVxcKT8iLCJvcHRpb25zIjpbIkEuIDEiLCJCLiAyIiwiQy4gMyIsIkQuIDQiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJTdWJzdGl0dXRlIFxcKHg9MlxcKSBpbnRvIFxcKCh4LTIpRih4KVxcKS4gVGhpcyBnaXZlcyBcXChrXzEgPSBcXGRmcmFjezN4XjIrOXgtMjB9e3grM31cXGJpZ2d8X3t4PTJ9ID0gXFxkZnJhY3sxMH17NX0gPSAyXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgZG9lcyBub3QgbWF0Y2ggdGhlIHN1YnN0aXR1dGlvbiByZXN1bHQuIiwiQyI6IlxcKDNcXCkgaXMgdGhlIGNvbnN0YW50IHRlcm0sIG5vdCBcXChrXzFcXCkuIiwiRCI6IlxcKDRcXCkgaXMgXFwoa18yXFwpLCBub3QgXFwoa18xXFwpLiJ9LCJoaW50IjoiVXNlIHRoZSBmYWN0b3IgdGhhdCBjYW5jZWxzIHdoZW4gXFwoeD0yXFwpLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJvcGVuYWkvZ3B0LTUuNC1pbWFnZS0yIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AyX3EzIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJDb21wbGV0ZSB0aGUgZXhwYW5zaW9uOlxuJCRGKHgpPVxcZnJhY3szeF4yKzl4LTIwfXsoeC0yKSh4KzMpfSA9IFxcID8kJCIsImlkZWFsX2Fuc3dlciI6IiQkRih4KT0zK1xcZnJhY3syfXt4LTJ9K1xcZnJhY3s0fXt4KzN9JCQiLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IGluY2x1ZGUgdGhlIGNvbnN0YW50IHRlcm0gMyIsIk11c3QgZ2l2ZSBjb2VmZmljaWVudCAyIG9uIFxcKDEvKHgtMilcXCkiLCJNdXN0IGdpdmUgY29lZmZpY2llbnQgNCBvbiBcXCgxLyh4KzMpXFwpIiwiTWlub3IgZm9ybWF0dGluZyBkaWZmZXJlbmNlcyBhcmUgYWNjZXB0YWJsZSBpZiBtYXRoZW1hdGljYWxseSBlcXVpdmFsZW50Il0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCBjYW4gY2FycnkgdGhlIG1ldGhvZCBhbGwgdGhlIHdheSB0byB0aGUgZmluYWwgZm9ybSBpbnN0ZWFkIG9mIHN0b3BwaW5nIGFmdGVyIG9uZSBjb2VmZmljaWVudC4iLCJoaW50IjoiRG8gbm90IGZvcmdldCB0aGUgY29uc3RhbnQgYmVmb3JlIHRoZSBmcmFjdGlvbnMuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJtb2RpZmllZF9wYXJ0aWFsX2ZyYWN0aW9uX2JyaWRnZSIsImxhYmVsIjoiQnJpZGdlIHRvIG1vZGlmaWVkIHBhcnRpYWwgZnJhY3Rpb25zIiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2h5IGRvZXMgdGhlIHRleHRib29rIGRpdmlkZSBieSBcXCh4XFwpIGJlZm9yZSBleHBhbmRpbmcgaW4gdGhlIG1vZGlmaWVkIHBhcnRpYWwtZnJhY3Rpb25zIHNldHVwPyIsIm9wdGlvbnMiOlsiQS4gVG8gZWxpbWluYXRlIHJlcGVhdGVkIGZhY3RvcnMgY29tcGxldGVseSIsIkIuIFRvIGNyZWF0ZSB0ZXJtcyB0aGF0IGNhbiBsYXRlciBiZWNvbWUgXFwoa3gvKHgtXFxsYW1iZGEpXnJcXCkgYWZ0ZXIgbXVsdGlwbHlpbmcgYmFjayBieSBcXCh4XFwpIiwiQy4gVG8gbWFrZSB0aGUgbnVtZXJhdG9yIGRlZ3JlZSBsYXJnZXIiLCJELiBCZWNhdXNlIG9yZGluYXJ5IHBhcnRpYWwgZnJhY3Rpb25zIG5vIGxvbmdlciB3b3JrIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIGdvYWwgaXMgdG8gZ2V0IGEgZGVjb21wb3NpdGlvbiBmb3IgXFwoRih4KS94XFwpLCB0aGVuIG11bHRpcGx5IGJ5IFxcKHhcXCkgc28gdGhlIGZpbmFsIHRlcm1zIGhhdmUgdGhlIGRlc2lyZWQgbW9kaWZpZWQgZm9ybSB3aXRoIFxcKHhcXCkgaW4gdGhlIG51bWVyYXRvci4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJSZXBlYXRlZCBmYWN0b3JzIG1heSBzdGlsbCByZW1haW47IGRpdmlzaW9uIGJ5IFxcKHhcXCkgZG9lcyBub3QgZWxpbWluYXRlIHRoZW0uIiwiQyI6IkRpdmlkaW5nIGJ5IFxcKHhcXCkgbG93ZXJzIGRlZ3JlZSByYXRoZXIgdGhhbiByYWlzaW5nIGl0LiIsIkQiOiJPcmRpbmFyeSBwYXJ0aWFsLWZyYWN0aW9uIG1ldGhvZHMgYXJlIHN0aWxsIGJlaW5nIHVzZWQgb24gXFwoRih4KS94XFwpLiJ9LCJoaW50IjoiVGhpbmsgYWJvdXQgd2hhdCBoYXBwZW5zIGFmdGVyIG11bHRpcGx5aW5nIGJvdGggc2lkZXMgYmFjayBieSBcXCh4XFwpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
