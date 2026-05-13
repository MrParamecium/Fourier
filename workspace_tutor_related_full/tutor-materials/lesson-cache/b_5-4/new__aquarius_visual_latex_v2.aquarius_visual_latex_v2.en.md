%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImdlbmVyYXRlZF9pbWFnZSIsInJhdGlvbmFsZSI6IlRoaXMgc2VjdGlvbiBoYXMgbm8gdGV4dGJvb2sgZmlndXJlcyBhbmQgdGhlIGNvcmUgc2tpbGwgaXMgYSBzeW1ib2xpYyB3b3JrZmxvdzogdXNlIGNvdmVyLXVwIGZvciBlYXN5IGNvZWZmaWNpZW50cywgdGhlbiBjbGVhciBkZW5vbWluYXRvcnMgZm9yIHRoZSByZXN0LiBBIGN1c3RvbSBsZWN0dXJlLW5vdGUgZmxvd2NoYXJ0IGlzIG1vcmUgdXNlZnVsIHRoYW4gYSBnZW5lcmljIHdlYiBpbWFnZSBiZWNhdXNlIHN0dWRlbnRzIG5lZWQgdG8gc2VlIHRoZSBleGFjdCBleGFtIGRlY2lzaW9uIHNlcXVlbmNlLCBub3QgYSBkZWNvcmF0aXZlIHBhcnRpYWwtZnJhY3Rpb25zIGdyYXBoaWMuIiwiY3JhbSI6IlVzZSB0aGUgZmxvd2NoYXJ0IHRvIHJlY29nbml6ZSB3aGVuIHJlcGVhdGVkIHJvb3RzIG1ha2UgcHVyZSBIZWF2aXNpZGUgZGlmZmVyZW50aWF0aW9uIGluZWZmaWNpZW50LiIsInN0YW5kYXJkIjoiVXNlIHRoZSB2aXN1YWwgYXMgdGhlIG1haW4gcHJvY2VzcyBtYXAsIHRoZW4gZm9sbG93IG9uZSByZXByZXNlbnRhdGl2ZSBleGFtcGxlIGZyb20gc2V0dXAgdG8gZmluYWwgY29lZmZpY2llbnRzLiIsInRvcF9zY29yZSI6IlVzZSB0aGUgdmlzdWFsIHRvIHNlcGFyYXRlIHRocmVlIGNhc2VzOiBzaW1wbGUgY292ZXItdXAsIHJlcGVhdGVkLXJvb3QgbGVmdG92ZXJzLCBhbmQgaW1wcm9wZXIgcmF0aW9uYWwgZnVuY3Rpb25zIHdpdGggYSBjb25zdGFudCB0ZXJtLiJ9" style="display:none;"></div>%%KC_END%%
# B.5-4 A Combination of Heaviside and Clearing Fractions

> **Section Objective:** Learn how to combine Heaviside cover-up with clearing fractions so repeated-root partial fraction expansions are faster.

---

**Concepts In This Section**

- Repeated-root partial fractions
- Heaviside cover-up for easy coefficients
- Clearing fractions for remaining coefficients
- Improper rational functions with equal degrees

## 1. Why Combine Heaviside with Clearing Fractions?

The Heaviside cover-up method is fast for simple (non-repeated) roots: just substitute the root and read off the coefficient. However, when a factor like \((x+2)^3\) appears, finding all three coefficients by pure Heaviside requires repeated differentiation — a slow, error-prone process.

The hybrid strategy is more efficient:

1. Write the full repeated-root expansion with all required terms.
2. Use cover-up only for the coefficients it finds quickly (typically the highest-power term and any simple-root terms).
3. Leave the remaining coefficients as unknowns \(A, B, \ldots\)
4. Multiply both sides by the full denominator to clear all fractions.
5. Solve the remaining constants by coefficient matching or substitution.

### EXAM TIP

If you see repeated factors like \((x+2)^3\), expect more than one coefficient over the same factor — one for each power from 1 through 3.

## 2. Representative example: keep the easy coefficients, solve the rest

This is the required pattern whenever the denominator contains a repeated linear factor \((x+a)^r\).

- \(N(x)\): the numerator polynomial
- \((x+a)^r\): the repeated factor of order \(r\)
- \(Q(x)\): the remaining denominator factors
- \(A_1, A_2, \ldots, A_r\): unknown constants, one for each power from 1 through \(r\)

**Exam trigger:** Any denominator power such as \((x+2)^3\) signals that you need three separate terms over that factor.

**Common misuse:** Writing only \(\frac{A}{(x+2)^3}\) and forgetting the lower-power terms \(\frac{A_1}{x+2}\) and \(\frac{A_2}{(x+2)^2}\). This incomplete expansion cannot match the original function.

$$\frac{N(x)}{(x+a)^r Q(x)} = \frac{A_1}{x+a} + \frac{A_2}{(x+a)^2} + \cdots + \frac{A_r}{(x+a)^r} + \text{other terms}$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="exam_pattern_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIGl0IGFzIGEgZmFzdCBkZWNpc2lvbiBjaGVja2xpc3QgZm9yIHJlcGVhdGVkLXJvb3QgcGFydGlhbCBmcmFjdGlvbnMuIiwic3RhbmRhcmQiOiJVc2UgaXQgdG8gZm9sbG93IHRoZSByZXByZXNlbnRhdGl2ZSBleGFtcGxlIHN0ZXAgYnkgc3RlcC4iLCJ0b3Bfc2NvcmUiOiJVc2UgaXQgdG8gbm90aWNlIHdoZXJlIHN0dWRlbnRzIHVzdWFsbHkgc3dpdGNoIG1ldGhvZHMgdG9vIGVhcmx5IG9yIHRvbyBsYXRlLiJ9" style="display:none;"></div>%%KC_END%%
*🎨 The hybrid workflow: write all terms first, use cover-up where it is fast, then clear fractions to find the rest.*
![Illustration](/generated/gptimage2-1778180897716-4899.png)

## 3. Equal degrees: include the constant first

The denominator has one simple factor \((x+1)\) and one repeated factor \((x+2)^3\), so the expansion requires four terms total.

Cover-up has already found the two easy coefficients:
- The coefficient over \(x+1\) is \(2\) (cover \(x+1\), set \(x=-1\)).
- The coefficient over \((x+2)^3\) is \(1\) (cover \((x+2)^3\), set \(x=-2\)).

Only \(A\) and \(B\) remain unknown.

**Exam trigger:** When repeated differentiation for the middle terms would take too long, switch to clearing fractions.

**Common misuse:** Changing the denominator powers (e.g., writing \((x+2)^2\) where \((x+2)^3\) belongs) or omitting the \(B/(x+2)^2\) term entirely.

$$\frac{4x^3+16x^2+23x+13}{(x+1)(x+2)^3} = \frac{2}{x+1} + \frac{A}{x+2} + \frac{B}{(x+2)^2} + \frac{1}{(x+2)^3}$$

$$4x^3+16x^2+23x+13 = 2(x+2)^3 + A(x+1)(x+2)^2 + B(x+1)(x+2) + (x+1)$$
*Multiply both sides of the previous equation by the full denominator \((x+1)(x+2)^3\). Every fraction disappears and the result is a polynomial identity.

**Solving for \(A\):** Compare the \(x^3\) coefficient on both sides. The right side contributes \(2 \cdot 1 + A \cdot 1 = 2 + A\). Setting \(2 + A = 4\) gives \(A = 2\).

**Solving for \(B\):** Substitute \(x = 0\). The left side gives \(13\). The right side gives \(2(8) + 2(1)(4) + B(1)(2) + 1 = 16 + 8 + 2B + 1 = 25 + 2B\). Setting \(25 + 2B = 13\) gives \(B = -6\).

**Final expansion:** The two missing terms are \(\dfrac{2}{x+2}\) and \(\dfrac{-6}{(x+2)^2}\).

**Common mistake:** Clearing only some denominators and leaving a fraction on one side of the identity.*

## 3. Equal Degrees: Include the Constant First

When \(\deg N = \deg D\), the rational function is **not proper** — the numerator is as large as the denominator, so the fraction does not go to zero as \(x \to \infty\). Partial fraction expansion cannot begin until this is resolved.

- \(k\): the constant quotient, equal to the ratio of the leading coefficients of \(N(x)\) and \(D(x)\).
- \(R(x)\): the remainder numerator after subtracting \(k \cdot D(x)\) from \(N(x)\). The degree of \(R(x)\) is strictly less than \(\deg D\), so \(R(x)/D(x)\) is now a proper fraction ready for partial fractions.

**Use this step before partial fractions whenever \(\deg N = \deg D\).**

**Exam trigger:** Numerator degree equals denominator degree.

**Common misuse:** Starting partial fractions immediately without extracting \(k\), which produces incorrect coefficients or an unsolvable system.

$$\frac{N(x)}{D(x)} = k + \frac{R(x)}{D(x)}$$

---
**📌 Key Takeaways**
- **Repeated-root pattern:** a factor \((x+a)^r\) in the denominator requires \(r\) separate terms — \(\dfrac{A_1}{x+a} + \dfrac{A_2}{(x+a)^2} + \cdots + \dfrac{A_r}{(x+a)^r}\). Never write only the highest-power term.
- **Hybrid method:** use Heaviside cover-up for the coefficients it finds quickly, then multiply both sides by the full denominator to clear all fractions and solve the remaining unknowns by coefficient matching or substitution. Example setup: \(\dfrac{4x^3+16x^2+23x+13}{(x+1)(x+2)^3} = \dfrac{2}{x+1} + \dfrac{A}{x+2} + \dfrac{B}{(x+2)^2} + \dfrac{1}{(x+2)^3}\).
- **Clearing fractions:** multiplying by the full denominator turns the equation into a polynomial identity; solve the unknowns by comparing \(x^n\) coefficients or substituting convenient values of \(x\).
- **Equal-degree case:** when \(\deg N = \deg D\), extract the constant \(k\) first using \(N(x)/D(x) = k + R(x)/D(x)\), then apply partial fractions to the proper remainder \(R(x)/D(x)\).

*In the next section we will use partial fraction expansions to make inverse transforms and system calculations easier.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlcGVhdGVkX3Jvb3RfcGF0dGVybiIsImxhYmVsIjoiUmVwZWF0ZWQtcm9vdCBwYXJ0aWFsIGZyYWN0aW9uIHBhdHRlcm4iLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIHRoZSBkZW5vbWluYXRvciBjb250YWlucyBcXCgoeCsyKV4zXFwpLCB3aGljaCBzZXQgb2YgdGVybXMgbXVzdCBhcHBlYXIgaW4gdGhlIHBhcnRpYWwgZnJhY3Rpb24gZXhwYW5zaW9uPyIsIm9wdGlvbnMiOlsiQS4gXFwoXFxkZnJhY3tBfXsoeCsyKV4zfVxcKSBvbmx5IiwiQi4gXFwoXFxkZnJhY3tBfXt4KzJ9ICsgXFxkZnJhY3tCfXsoeCsyKV4yfSArIFxcZGZyYWN7Q317KHgrMileM31cXCkiLCJDLiBcXChcXGRmcmFje0F9e3grMn0gKyBcXGRmcmFje0J9e3grM31cXCkiLCJELiBcXChcXGRmcmFje0F9eyh4KzIpXjJ9ICsgXFxkZnJhY3tCfXsoeCsyKV4zfVxcKSBvbmx5Il0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiQSByZXBlYXRlZCBmYWN0b3Igb2Ygb3JkZXIgMyByZXF1aXJlcyBvbmUgdGVybSBmb3IgZWFjaCBwb3dlciBmcm9tIDEgdGhyb3VnaCAzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgc2tpcHMgdGhlIGxvd2VyIHBvd2Vycywgc28gaXQgY2Fubm90IHJlcHJlc2VudCB0aGUgZ2VuZXJhbCBleHBhbnNpb24uIiwiQyI6IlRoZSBmYWN0b3IgaXMgcmVwZWF0ZWQgYXQgXFwoeCsyXFwpLCBub3Qgc3BsaXQgaW50byBcXCh4KzJcXCkgYW5kIFxcKHgrM1xcKS4iLCJEIjoiVGhpcyBzdGlsbCBza2lwcyB0aGUgZmlyc3QtcG93ZXIgdGVybSBcXChBLyh4KzIpXFwpLiJ9LCJoaW50IjoiQSByZXBlYXRlZCBmYWN0b3Igb2Ygb3JkZXIgXFwoclxcKSBnaXZlcyBcXChyXFwpIHNlcGFyYXRlIHRlcm1zLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hhdCBpcyB0aGUgbW9zdCBjb21tb24gc2V0dXAgZXJyb3IgZm9yIGEgZmFjdG9yIGxpa2UgXFwoKHgtYSleNFxcKT8iLCJvcHRpb25zIjpbIkEuIEluY2x1ZGluZyBmb3VyIHRlcm1zIHdpdGggcG93ZXJzIDEsIDIsIDMsIGFuZCA0IiwiQi4gVXNpbmcgY29uc3RhbnRzIGluIHRoZSBudW1lcmF0b3JzIiwiQy4gV3JpdGluZyBvbmx5IG9uZSB0ZXJtIG92ZXIgXFwoKHgtYSleNFxcKSIsIkQuIENsZWFyaW5nIGZyYWN0aW9ucyBhZnRlciB3cml0aW5nIHRoZSBleHBhbnNpb24iXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJGb3IgcmVwZWF0ZWQgbGluZWFyIGZhY3RvcnMsIHdyaXRpbmcgb25seSB0aGUgaGlnaGVzdC1wb3dlciBkZW5vbWluYXRvciBtaXNzZXMgdGhlIG5lY2Vzc2FyeSBsb3dlci1wb3dlciB0ZXJtcy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGF0IGlzIHRoZSBjb3JyZWN0IHN0cnVjdHVyZSBmb3IgYSBmb3VydGgtb3JkZXIgcmVwZWF0ZWQgZmFjdG9yLiIsIkIiOiJDb25zdGFudHMgYXJlIGNvcnJlY3QgZm9yIHJlcGVhdGVkIGxpbmVhciBmYWN0b3JzLiIsIkQiOiJDbGVhcmluZyBmcmFjdGlvbnMgaXMgYSB2YWxpZCB3YXkgdG8gc29sdmUgdW5rbm93biBjb2VmZmljaWVudHMuIn0sImhpbnQiOiJDb3VudCB0aGUgcG93ZXIgb24gdGhlIHJlcGVhdGVkIGZhY3Rvci4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6Imh5YnJpZF9tZXRob2RfdHJpZ2dlciIsImxhYmVsIjoiV2hlbiB0byBjb21iaW5lIEhlYXZpc2lkZSBhbmQgY2xlYXJpbmcgZnJhY3Rpb25zIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaHkgZG9lcyB0aGlzIHNlY3Rpb24gcmVjb21tZW5kIGNvbWJpbmluZyBIZWF2aXNpZGUgY292ZXItdXAgd2l0aCBjbGVhcmluZyBmcmFjdGlvbnMgZm9yIHJlcGVhdGVkIHJvb3RzPyIsIm9wdGlvbnMiOlsiQS4gQ292ZXItdXAgbmV2ZXIgd29ya3MgZm9yIHJlcGVhdGVkIHJvb3RzIiwiQi4gUmVwZWF0ZWQgcm9vdHMgbWF5IHJlcXVpcmUgcmVwZWF0ZWQgZGlmZmVyZW50aWF0aW9uLCBzbyBjbGVhcmluZyBmcmFjdGlvbnMgY2FuIGJlIGZhc3RlciBmb3IgbGVmdG92ZXIgY29lZmZpY2llbnRzIiwiQy4gQ2xlYXJpbmcgZnJhY3Rpb25zIGNhbiBvbmx5IGJlIHVzZWQgYWZ0ZXIgYWxsIGNvZWZmaWNpZW50cyBhcmUga25vd24iLCJELiBUaGUgbWV0aG9kIGF2b2lkcyB3cml0aW5nIGEgcGFydGlhbCBmcmFjdGlvbiBleHBhbnNpb24iXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgaHlicmlkIG1ldGhvZCBrZWVwcyB0aGUgZWFzeSBjb3Zlci11cCBjb2VmZmljaWVudHMgYW5kIHVzZXMgYWxnZWJyYSBmb3IgdGhlIHJlbWFpbmluZyByZXBlYXRlZC1yb290IGNvZWZmaWNpZW50cy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJDb3Zlci11cCBjYW4gc3RpbGwgZmluZCBzb21lIGNvZWZmaWNpZW50cywgZXNwZWNpYWxseSBjb252ZW5pZW50IG9uZXMgbGlrZSB0aGUgaGlnaGVzdC1wb3dlciB0ZXJtLiIsIkMiOiJDbGVhcmluZyBmcmFjdGlvbnMgaXMgdXNlZCBwcmVjaXNlbHkgYmVjYXVzZSBzb21lIGNvZWZmaWNpZW50cyBhcmUgc3RpbGwgdW5rbm93bi4iLCJEIjoiWW91IHN0aWxsIG11c3Qgd3JpdGUgdGhlIHBhcnRpYWwgZnJhY3Rpb24gZXhwYW5zaW9uIGZpcnN0LiJ9LCJoaW50IjoiVGhlIHBvaW50IGlzIGVmZmljaWVuY3ksIG5vdCByZXBsYWNpbmcgdGhlIGV4cGFuc2lvbi4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoiZmxvd2NoYXJ0X29ic2VydmF0aW9uIiwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoiY2xlYXJpbmdfZnJhY3Rpb25zX3N0ZXAiLCJsYWJlbCI6IkNsZWFyaW5nIGRlbm9taW5hdG9ycyB0byBzb2x2ZSB1bmtub3duIGNvZWZmaWNpZW50cyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIFxcKFxcZGZyYWN7NHheMysxNnheMisyM3grMTN9eyh4KzEpKHgrMileM30gPSBcXGRmcmFjezJ9e3grMX0gKyBcXGRmcmFje0F9e3grMn0gKyBcXGRmcmFje0J9eyh4KzIpXjJ9ICsgXFxkZnJhY3sxfXsoeCsyKV4zfVxcKSwgd2hhdCBzaG91bGQgeW91IG11bHRpcGx5IGJ5IHRvIGNsZWFyIGZyYWN0aW9ucz8iLCJvcHRpb25zIjpbIkEuIFxcKCh4KzEpKHgrMileM1xcKSIsIkIuIFxcKCh4KzEpKHgrMilcXCkiLCJDLiBcXCgoeCsyKV4zXFwpIG9ubHkiLCJELiBcXCh4KzFcXCkgb25seSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IllvdSBtdWx0aXBseSBieSB0aGUgZnVsbCBkZW5vbWluYXRvciBzbyBldmVyeSB0ZXJtIGJlY29tZXMgcG9seW5vbWlhbC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGlzIGxlYXZlcyBkZW5vbWluYXRvcnMgZm9yIHRlcm1zIHdpdGggXFwoKHgrMileMlxcKSBvciBcXCgoeCsyKV4zXFwpLiIsIkMiOiJUaGlzIGRvZXMgbm90IGNsZWFyIHRoZSBcXCh4KzFcXCkgZGVub21pbmF0b3IuIiwiRCI6IlRoaXMgbGVhdmVzIGFsbCBcXCgoeCsyKVxcKS1iYXNlZCBkZW5vbWluYXRvcnMuIn0sImhpbnQiOiJVc2UgdGhlIG9yaWdpbmFsIGZ1bGwgZGVub21pbmF0b3IuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJBZnRlciBjbGVhcmluZyBmcmFjdGlvbnMgaW4gdGhlIGV4YW1wbGUsIHRoZSBpZGVudGl0eSBpcyBcXCg0eF4zKzE2eF4yKzIzeCsxMyA9IDIoeCsyKV4zICsgQSh4KzEpKHgrMileMiArIEIoeCsxKSh4KzIpICsgKHgrMSlcXCkuIENvbXBhcmUgdGhlIFxcKHheM1xcKSBjb2VmZmljaWVudCB0byBmaW5kIFxcKEFcXCkuIiwiaWRlYWxfYW5zd2VyIjoiXFwoQSA9IDJcXCkuIFRoZSBcXCh4XjNcXCkgY29lZmZpY2llbnQgb24gdGhlIHJpZ2h0IGlzIFxcKDIgKyBBXFwpLCBhbmQgaXQgbXVzdCBlcXVhbCBcXCg0XFwpLCBzbyBcXChBID0gMlxcKS4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IGlkZW50aWZ5IHRoZSByaWdodC1zaWRlIFxcKHheM1xcKSBjb2VmZmljaWVudCBhcyBcXCgyICsgQVxcKSIsIk11c3Qgc2V0IFxcKDIgKyBBID0gNFxcKSIsIk11c3QgY29uY2x1ZGUgXFwoQSA9IDJcXCkiXSwiZXhwbGFuYXRpb24iOiJDb2VmZmljaWVudCBtYXRjaGluZyBpcyBvbmUgb2YgdGhlIGZhc3Rlc3Qgd2F5cyB0byBmaW5pc2ggdGhlIGNsZWFyZWQgaWRlbnRpdHkuIiwiaGludCI6Ik9ubHkgdGVybXMgdGhhdCBjYW4gcHJvZHVjZSBcXCh4XjNcXCkgbWF0dGVyLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiaW1wcm9wZXJfZXF1YWxfZGVncmVlX2Nhc2UiLCJsYWJlbCI6IkVxdWFsIG51bWVyYXRvciBhbmQgZGVub21pbmF0b3IgZGVncmVlcyIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDRfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIFxcKFxcZGVnIE4gPSBcXGRlZyBEXFwpLCB3aGF0IHNob3VsZCB0aGUgcGFydGlhbCBmcmFjdGlvbiBleHBhbnNpb24gaW5jbHVkZSBiZWZvcmUgdGhlIHByb3BlciBmcmFjdGlvbiB0ZXJtcz8iLCJvcHRpb25zIjpbIkEuIEEgY29uc3RhbnQgdGVybSBcXChrXFwpIiwiQi4gQW4gZXh0cmEgcmVwZWF0ZWQtcm9vdCB0ZXJtIGF1dG9tYXRpY2FsbHkiLCJDLiBObyBudW1lcmF0b3IgdGVybXMiLCJELiBPbmx5IHRoZSBoaWdoZXN0LXBvd2VyIGRlbm9taW5hdG9yIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiV2hlbiB0aGUgZGVncmVlcyBhcmUgZXF1YWwsIHRoZSByYXRpb25hbCBmdW5jdGlvbiBpcyBpbXByb3BlciBhbmQgc3RhcnRzIHdpdGggYSBjb25zdGFudCBcXChrXFwpLCB1c3VhbGx5IHRoZSByYXRpbyBvZiBsZWFkaW5nIGNvZWZmaWNpZW50cy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJSZXBlYXRlZC1yb290IHRlcm1zIGRlcGVuZCBvbiB0aGUgZGVub21pbmF0b3IgZmFjdG9ycywgbm90IGp1c3QgZGVncmVlIGVxdWFsaXR5LiIsIkMiOiJQYXJ0aWFsIGZyYWN0aW9ucyBzdGlsbCBoYXZlIG51bWVyYXRvciBjb25zdGFudHMgb3ZlciBkZW5vbWluYXRvciBmYWN0b3JzLiIsIkQiOiJUaGF0IHJlcGVhdHMgdGhlIGNvbW1vbiBlcnJvciBvZiBza2lwcGluZyByZXF1aXJlZCBsb3dlci1wb3dlciB0ZXJtcy4ifSwiaGludCI6IkVxdWFsIGRlZ3JlZXMgbWVhbiB0aGVyZSBpcyBhIG5vbnplcm8gcXVvdGllbnQuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfV19" style="display:none;"></div>%%KC_END%%
