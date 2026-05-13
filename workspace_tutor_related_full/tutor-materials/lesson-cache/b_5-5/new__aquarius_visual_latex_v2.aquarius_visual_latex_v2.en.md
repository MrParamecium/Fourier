%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImdlbmVyYXRlZF9pbWFnZSIsInJhdGlvbmFsZSI6IlRoaXMgc2VjdGlvbiBpcyBtb3N0bHkgc3ltYm9saWMsIHNvIExhVGVYIGZvcm11bGFzIHNob3VsZCBjYXJyeSB0aGUgZXhhY3QgbWF0aGVtYXRpY3MuIEhvd2V2ZXIsIHN0dWRlbnRzIG9mdGVuIG1pc3MgdGhlIHdvcmtmbG93OiBmaXJzdCBleHRyYWN0IHRoZSBjb25zdGFudCB0ZXJtLCB0aGVuIHBhcnRpYWwtZnJhY3Rpb24gb25seSB0aGUgcHJvcGVyIHJlbWFpbmRlciwgdGhlbiBhZGQgdGhlIGNvbnN0YW50IGJhY2suIFRoZXJlIGlzIG5vIHRleHRib29rIGZpZ3VyZSBhbmQgbm8gcmVsZXZhbnQgV2lraXBlZGlhL1dpa2ltZWRpYSByZWZlcmVuY2UgdmlzdWFsIGZvciB0aGlzIHNwZWNpZmljIGFsZ2VicmFpYyBkZWNpc2lvbiBmbG93LCBzbyBvbmUgY3VzdG9tIGxlY3R1cmUtbm90ZSB3b3JrZmxvdyB2aXN1YWwgaXMganVzdGlmaWVkLiIsImNyYW0iOiJVc2UgdGhlIHZpc3VhbCB0byByZWNvZ25pemUgdGhlIGV4YW0gdHJpZ2dlciBtPW4gYW5kIGltbWVkaWF0ZWx5IHJlbWVtYmVyOiBjb25zdGFudCBmaXJzdCwgcGFydGlhbCBmcmFjdGlvbnMgc2Vjb25kLiIsInN0YW5kYXJkIjoiVXNlIHRoZSB2aXN1YWwgYXMgYSBjbGVhbiB3b3JrZmxvdyBiZXNpZGUgb25lIHJlcHJlc2VudGF0aXZlIHdvcmtlZCBleGFtcGxlLiIsInRvcF9zY29yZSI6IlVzZSB0aGUgdmlzdWFsIHRvIGNhdGNoIHRoZSBzdWJ0bGUgdHJhcCBvZiBhcHBseWluZyBjb3Zlci11cCBjb2VmZmljaWVudHMgYmVmb3JlIHJlbW92aW5nIHRoZSBjb25zdGFudCB0ZXJtLiJ9" style="display:none;"></div>%%KC_END%%
# B.5-5 Improper F(x) with m=n

> **Section Objective:** Learn how to expand an improper rational function when the numerator and denominator have the same degree.

## Concepts In This Section

- Equal-degree improper rational functions
- Constant quotient term
- Proper remainder
- Partial fraction expansion after division

## 1. The m=n trigger: pull out a constant first

If \(F(x) = N(x)/D(x)\) and both the numerator \(N(x)\) and denominator \(D(x)\) have the same degree, the rational function is **improper**. Ordinary partial fractions cannot be applied immediately to an improper fraction.

The first step is to extract the constant quotient term \(K\):

- \(N(x)\) — the numerator polynomial
- \(D(x)\) — the denominator polynomial
- \(K\) — the constant you remove before expanding the remainder

#### Exam Trigger
If the top and bottom powers match, extract \(K\) first.

#### COMMON MISUSE
Starting cover-up directly on the original fraction and forgetting the constant term \(K\) entirely.

$$K=\frac{\text{leading coefficient of }N(x)}{\text{leading coefficient of }D(x)}$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="exam_pattern_anchor" data-visual-use-b64="eyJjcmFtIjoiTWFrZSB0aGUgZGVjaXNpb24gc2VxdWVuY2UgaW5zdGFudGx5IHJlY29nbml6YWJsZTogbT1uIG1lYW5zIGV4dHJhY3QgSyBmaXJzdC4iLCJzdGFuZGFyZCI6IlN1cHBvcnQgdGhlIHJlcHJlc2VudGF0aXZlIGV4YW1wbGUgYnkgc2hvd2luZyB0aGUgY29ycmVjdCBvcmRlciBvZiBvcGVyYXRpb25zLiIsInRvcF9zY29yZSI6IkhpZ2hsaWdodCB0aGUgd3JvbmcgcGF0aDogYXBwbHlpbmcgY292ZXItdXAgYmVmb3JlIHJlbW92aW5nIEsuIn0=" style="display:none;"></div>%%KC_END%%
*🎨 Workflow: always extract the constant K before applying partial fractions to the remainder.*
![Illustration](/generated/gptimage2-1778180916313-2967.png)

## 2. Turn the improper fraction into a proper one

After finding \(K\), subtract \(K \cdot D(x)\) from the numerator. The new numerator \(N(x) - K\,D(x)\) has degree **strictly lower** than \(D(x)\), making the remaining fraction proper.

**When to use this formula:** whenever \(\deg N = \deg D\).

**Minimal example:** Suppose the denominator has leading coefficient \(1\) and the numerator has leading coefficient \(3\). Then \(K = 3/1 = 3\). You subtract \(3 \cdot D(x)\) from \(N(x)\) to get a proper remainder, then expand that remainder using standard partial fractions.

#### COMMON MISUSE
Subtracting only the scalar \(K\) from the numerator instead of the full polynomial product \(K\,D(x)\). This leaves a degree mismatch and gives wrong coefficients.

$$F(x)=K+\frac{N(x)-K\,D(x)}{D(x)}$$

## 3. Apply cover-up only to the proper remainder

For a simple linear factor \((x - \lambda_i)\), the partial fraction coefficient \(k_i\) is found using the cover-up method — but **only after** the constant part \(K\) has been removed.

- \(\lambda_i\) — the root that makes the factor \((x - \lambda_i)\) equal to zero
- \(k_i\) — the numerator coefficient of that partial fraction term
- \(F(x) - K\) — the proper part, which is what cover-up is actually applied to

#### Exam Trigger
Distinct linear denominator factors with \(m = n\): always subtract \(K\) first, then cover-up.

#### COMMON MISUSE
Using \(F(x)\) instead of \(F(x) - K\) in the cover-up formula. This silently includes the constant quotient term and produces wrong coefficients for every partial fraction.

$$k_i=\left[(x-\lambda_i)\bigl(F(x)-K\bigr)\right]_{x=\lambda_i}$$

## 4. Representative example from the textbook

The denominator \((x-2)(x+3)\) expands to a degree-2 polynomial, and the numerator \(3x^2 + 9x - 20\) is also degree 2. The function is therefore **improper with \(m = n\)**.

**Step 1 — Extract \(K\):** The leading coefficient of the numerator is \(3\) and of the denominator is \(1\), so \(K = 3/1 = 3\).

**Step 2 — Form the proper remainder:** Subtract \(3 \cdot (x-2)(x+3)\) from the numerator. The result is a degree-1 polynomial, which is proper.

**Step 3 — Partial fractions on the remainder:** Cover-up on the proper part gives \(2/(x-2)\) and \(4/(x+3)\).

**Step 4 — Reassemble:** The final answer includes all three pieces: the constant \(3\), the term with \((x-2)\), and the term with \((x+3)\).

#### Exam Note
If your answer contains no constant term, it is incomplete. A missing \(K\) is one of the most common errors on this type of problem.

$$\frac{3x^2+9x-20}{(x-2)(x+3)}=3+\frac{2}{x-2}+\frac{4}{x+3}$$

## 5. Quick exam check: what can go wrong?

**Wrong path:** "I see factors \((x-2)(x+3)\), so I immediately use cover-up on the original fraction."

**Right path:** "Because the top and bottom degrees match, I first extract \(K = 3\), then expand only the proper remainder \(F(x) - K\) using cover-up."

Skipping the constant extraction step means every coefficient you compute will absorb part of the constant quotient, making all of them wrong simultaneously — with no obvious error signal.

### FAST CHECK BEFORE SUBMITTING

- Did I compare the degree of the numerator and the degree of the denominator?
- Did I include the constant term \(K\) in the final answer?
- Did I compute the partial fraction coefficients from the proper part \(F(x) - K\) only?

---
**📌 Key Takeaways**
- When \(\deg N = \deg D\), extract \(K = \dfrac{\text{leading coeff of }N(x)}{\text{leading coeff of }D(x)}\) before anything else.
- Rewrite as \(F(x) = K + \dfrac{N(x) - K\,D(x)}{D(x)}\); the remainder fraction is now proper and safe for partial fractions.
- Cover-up coefficients use \(k_i = \left[(x-\lambda_i)(F(x)-K)\right]_{x=\lambda_i}\); never apply cover-up to the original improper \(F(x)\).
- Textbook example: \(\dfrac{3x^2+9x-20}{(x-2)(x+3)} = 3 + \dfrac{2}{x-2} + \dfrac{4}{x+3}\); a missing constant means an incomplete answer.

*Next, modified partial fractions adapt this idea for inverse z-transform forms.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImVxdWFsX2RlZ3JlZV90cmlnZ2VyIiwibGFiZWwiOiJSZWNvZ25pemluZyB0aGUgbT1uIGltcHJvcGVyIGNhc2UiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciBcXChGKHgpPVxcZGZyYWN7NHheMi03eCsxfXsyeF4yKzN4LTV9XFwpLCB3aGF0IGlzIHRoZSBmaXJzdCBzdGVwIGJlZm9yZSBwYXJ0aWFsIGZyYWN0aW9uIGV4cGFuc2lvbj8iLCJvcHRpb25zIjpbIkEuIEFwcGx5IGNvdmVyLXVwIGRpcmVjdGx5IHRvIHRoZSBvcmlnaW5hbCBmcmFjdGlvbiIsIkIuIEV4dHJhY3QgYSBjb25zdGFudCB0ZXJtIGJlY2F1c2UgdGhlIGRlZ3JlZXMgYXJlIGVxdWFsIiwiQy4gSWdub3JlIHRoZSBoaWdoZXN0LWRlZ3JlZSB0ZXJtcyIsIkQuIEZhY3RvciBvbmx5IHRoZSBudW1lcmF0b3IiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgbnVtZXJhdG9yIGFuZCBkZW5vbWluYXRvciBhcmUgYm90aCBkZWdyZWUgMiwgc28gdGhlIHJhdGlvbmFsIGZ1bmN0aW9uIGlzIGltcHJvcGVyIHdpdGggXFwobT1uXFwpLiBBIGNvbnN0YW50IHRlcm0gbXVzdCBiZSByZW1vdmVkIGZpcnN0LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkNvdmVyLXVwIGFwcGxpZXMgdG8gdGhlIHByb3BlciByZW1haW5kZXIsIG5vdCB0aGUgb3JpZ2luYWwgZXF1YWwtZGVncmVlIGZyYWN0aW9uLiIsIkMiOiJUaGUgaGlnaGVzdC1kZWdyZWUgdGVybXMgZGV0ZXJtaW5lIHRoZSBjb25zdGFudCBxdW90aWVudCB0ZXJtIFxcKEtcXCkuIiwiRCI6IlBhcnRpYWwgZnJhY3Rpb25zIGRlcGVuZCBvbiB0aGUgZGVub21pbmF0b3IgZmFjdG9ycywgbm90IGp1c3QgdGhlIG51bWVyYXRvci4ifSwiaGludCI6IkNvbXBhcmUgdGhlIHRvcCBkZWdyZWUgYW5kIGJvdHRvbSBkZWdyZWUgZmlyc3QuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlLCJxdWVzdGlvbl9yb2xlIjoiZm9ybXVsYV90cmlnZ2VyX2NoZWNrIn0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBzdHVkZW50IHNlZXMgXFwoXFxkZnJhY3szeF4yKzl4LTIwfXsoeC0yKSh4KzMpfVxcKSBhbmQgd3JpdGVzIG9ubHkgXFwoXFxkZnJhY3syfXt4LTJ9K1xcZGZyYWN7NH17eCszfVxcKS4gV2hhdCBpcyB3cm9uZz8iLCJvcHRpb25zIjpbIkEuIFRoZSBkZW5vbWluYXRvciBjYW5ub3QgYmUgZmFjdG9yZWQiLCJCLiBUaGUgYW5zd2VyIGZvcmdvdCB0aGUgY29uc3RhbnQgdGVybSIsIkMuIFRoZSByb290cyBzaG91bGQgYmUgXFwoLTJcXCkgYW5kIFxcKDNcXCkiLCJELiBQYXJ0aWFsIGZyYWN0aW9ucyBjYW5ub3QgYmUgdXNlZCBhdCBhbGwiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJCZWNhdXNlIHRoZSBudW1lcmF0b3IgYW5kIGRlbm9taW5hdG9yIGhhdmUgdGhlIHNhbWUgZGVncmVlLCB0aGUgZXhwYW5zaW9uIG11c3QgaW5jbHVkZSB0aGUgY29uc3RhbnQgdGVybSBcXCgzXFwpLiBPbWl0dGluZyBpdCBnaXZlcyBhbiBpbmNvbXBsZXRlIGFuc3dlci4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGUgZGVub21pbmF0b3IgaXMgYWxyZWFkeSBmYWN0b3JlZCBhcyBcXCgoeC0yKSh4KzMpXFwpLiIsIkMiOiJUaGUgcm9vdHMgYXJlIFxcKHg9MlxcKSBhbmQgXFwoeD0tM1xcKSwgbm90IFxcKC0yXFwpIGFuZCBcXCgzXFwpLiIsIkQiOiJQYXJ0aWFsIGZyYWN0aW9ucyBjYW4gYmUgdXNlZCBhZnRlciByZW1vdmluZyB0aGUgY29uc3RhbnQgdGVybSBcXChLXFwpLiJ9LCJoaW50IjoiQXNrIHdoZXRoZXIgdGhlIG9yaWdpbmFsIGZyYWN0aW9uIGlzIHByb3BlciBvciBpbXByb3Blci4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWUsInF1ZXN0aW9uX3JvbGUiOiJjb21tb25fdHJhcF9jaGVjayJ9XX0seyJpZCI6ImNvbnN0YW50X3F1b3RpZW50X2FuZF9yZW1haW5kZXIiLCJsYWJlbCI6IkZpbmRpbmcgSyBhbmQgZm9ybWluZyB0aGUgcHJvcGVyIHJlbWFpbmRlciIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIFxcKEYoeCk9XFxkZnJhY3s2eF4zK3gtNH17M3heMy0yeCsxfVxcKSwgd2hhdCBpcyBcXChLXFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoSz0yXFwpIiwiQi4gXFwoSz0zXFwpIiwiQy4gXFwoSz02XFwpIiwiRC4gXFwoSz1cXGRmcmFjezF9ezJ9XFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiXFwoS1xcKSBpcyB0aGUgcmF0aW8gb2YgbGVhZGluZyBjb2VmZmljaWVudHM6IFxcKDYvMyA9IDJcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiXFwoM1xcKSBpcyB0aGUgZGVub21pbmF0b3IgbGVhZGluZyBjb2VmZmljaWVudCBhbG9uZSwgbm90IHRoZSByYXRpby4iLCJDIjoiXFwoNlxcKSBpcyB0aGUgbnVtZXJhdG9yIGxlYWRpbmcgY29lZmZpY2llbnQgYWxvbmUsIG5vdCB0aGUgcmF0aW8uIiwiRCI6IlxcKDEvMlxcKSByZXZlcnNlcyB0aGUgcmF0aW87IGl0IHNob3VsZCBiZSBudW1lcmF0b3Igb3ZlciBkZW5vbWluYXRvci4ifSwiaGludCI6IlVzZSBudW1lcmF0b3IgbGVhZGluZyBjb2VmZmljaWVudCBkaXZpZGVkIGJ5IGRlbm9taW5hdG9yIGxlYWRpbmcgY29lZmZpY2llbnQuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlLCJxdWVzdGlvbl9yb2xlIjoiY29yZV9jb25jZXB0X2NoZWNrIn0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQWZ0ZXIgZmluZGluZyBcXChLXFwpLCB3aGljaCBleHByZXNzaW9uIGdpdmVzIHRoZSBudW1lcmF0b3Igb2YgdGhlIHByb3BlciByZW1haW5kZXI/Iiwib3B0aW9ucyI6WyJBLiBcXChOKHgpLUtcXCkiLCJCLiBcXChEKHgpLUtcXCxOKHgpXFwpIiwiQy4gXFwoTih4KS1LXFwsRCh4KVxcKSIsIkQuIFxcKEstTih4KVxcLEQoeClcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJUaGUgcHJvcGVyIHJlbWFpbmRlciBjb21lcyBmcm9tIHN1YnRyYWN0aW5nIHRoZSBmdWxsIHBvbHlub21pYWwgcHJvZHVjdCBcXChLXFwsRCh4KVxcKSBmcm9tIFxcKE4oeClcXCksIHJlZHVjaW5nIHRoZSBkZWdyZWUgYmVsb3cgdGhhdCBvZiBcXChEKHgpXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IllvdSBtdXN0IHN1YnRyYWN0IFxcKEtcXCxEKHgpXFwpLCBub3QganVzdCB0aGUgc2NhbGFyIFxcKEtcXCkuIiwiQiI6IlRoaXMgcmV2ZXJzZXMgdGhlIHJvbGVzIG9mIG51bWVyYXRvciBhbmQgZGVub21pbmF0b3IuIiwiRCI6IlRoaXMgbXVsdGlwbGllcyBudW1lcmF0b3IgYW5kIGRlbm9taW5hdG9yIHRvZ2V0aGVyLCB3aGljaCBpcyBpbmNvcnJlY3QuIn0sImhpbnQiOiJUaGluayBwb2x5bm9taWFsIGRpdmlzaW9uOiBxdW90aWVudCB0aW1lcyBkaXZpc29yIGlzIHN1YnRyYWN0ZWQgZnJvbSB0aGUgbnVtZXJhdG9yLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZSwicXVlc3Rpb25fcm9sZSI6ImNvbW1vbl90cmFwX2NoZWNrIn1dfSx7ImlkIjoid29ya2Zsb3dfdmlzdWFsX2ludGVycHJldGF0aW9uIiwibGFiZWwiOiJDb3JyZWN0IHdvcmtmbG93IG9yZGVyIiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSW4gdGhlIHdvcmtmbG93IHZpc3VhbCwgd2hpY2ggc3RlcCBtdXN0IGhhcHBlbiBpbW1lZGlhdGVseSBiZWZvcmUgdXNpbmcgb3JkaW5hcnkgcGFydGlhbCBmcmFjdGlvbnM/Iiwib3B0aW9ucyI6WyJBLiBDb21wYXJlIG9ubHkgdGhlIGNvbnN0YW50IHRlcm1zIG9mIG51bWVyYXRvciBhbmQgZGVub21pbmF0b3IiLCJCLiBSZW1vdmUgdGhlIGNvbnN0YW50IHF1b3RpZW50IGFuZCBmb3JtIGEgcHJvcGVyIHJlbWFpbmRlciIsIkMuIE11bHRpcGx5IHRoZSBudW1lcmF0b3IgYnkgZXZlcnkgZGVub21pbmF0b3IgZmFjdG9yIiwiRC4gU2V0IGFsbCBkZW5vbWluYXRvciByb290cyBlcXVhbCB0byB6ZXJvIGF0IG9uY2UiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJQYXJ0aWFsIGZyYWN0aW9ucyBhcmUgYXBwbGllZCB0byB0aGUgcHJvcGVyIHJlbWFpbmRlciBcXChGKHgpLUtcXCksIG5vdCB0byB0aGUgb3JpZ2luYWwgaW1wcm9wZXIgZXhwcmVzc2lvbi4gVGhlIGZsb3djaGFydCBzaG93cyB0aGlzIGFzIHRoZSB0aGlyZCBib3ggYmVmb3JlIHRoZSBmaW5hbCBleHBhbnNpb24gc3RlcC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJDb25zdGFudCB0ZXJtcyBkbyBub3QgZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGZyYWN0aW9uIGlzIHByb3BlciBvciBpbXByb3BlcjsgdGhlIGRlZ3JlZXMgZG8uIiwiQyI6IlRoYXQgaXMgbm90IHBhcnQgb2YgdGhlIGVxdWFsLWRlZ3JlZSByZWR1Y3Rpb24gc3RlcC4iLCJEIjoiUm9vdHMgYXJlIHVzZWQgbGF0ZXIgZm9yIGluZGl2aWR1YWwgY292ZXItdXAgY29lZmZpY2llbnRzLCBub3QgYWxsIGF0IG9uY2UgYXMgdGhlIGZpcnN0IHN0ZXAuIn0sImhpbnQiOiJUaGUgdmlzdWFsIHdhcm5zIGFnYWluc3QgdXNpbmcgY292ZXItdXAgdG9vIGVhcmx5LiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJnZW5lcmF0ZWRfZmxvd2NoYXJ0Iiwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZSwicXVlc3Rpb25fcm9sZSI6InZpc3VhbF9vcl9kZW1vX29ic2VydmF0aW9uX2NoZWNrIn1dfSx7ImlkIjoiY292ZXJfdXBfYWZ0ZXJfY29uc3RhbnRfcmVtb3ZhbCIsImxhYmVsIjoiVXNpbmcgY292ZXItdXAgYWZ0ZXIgcmVtb3ZpbmcgSyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNF9xMSIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQSBjbGFzc21hdGUgc2F5czogJ1NpbmNlIHRoZSBkZW5vbWluYXRvciBpcyBmYWN0b3JlZCwgSSBjYW4gdXNlIGNvdmVyLXVwIGRpcmVjdGx5IG9uIFxcKEYoeClcXCksIGV2ZW4gd2hlbiBcXChtPW5cXCkuJyBFeHBsYWluIHdoeSB0aGlzIGlzIHdyb25nIGluIG9uZSBvciB0d28gc2VudGVuY2VzLiIsImlkZWFsX2Fuc3dlciI6IldoZW4gXFwobT1uXFwpLCBcXChGKHgpXFwpIGlzIGltcHJvcGVyIGFuZCBjb250YWlucyBhIGNvbnN0YW50IHF1b3RpZW50IHRlcm0gXFwoS1xcKS4gQ292ZXItdXAgbXVzdCBiZSBhcHBsaWVkIHRvIHRoZSBwcm9wZXIgcGFydCBcXChGKHgpLUtcXCksIGFuZCB0aGVuIFxcKEtcXCkgbXVzdCBiZSBhZGRlZCBiYWNrIHRvIHRoZSBmaW5hbCByZXN1bHQuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBzdGF0ZSB0aGF0IGVxdWFsIGRlZ3JlZSBtZWFucyB0aGUgZnVuY3Rpb24gaXMgaW1wcm9wZXIiLCJNdXN0IG1lbnRpb24gcmVtb3Zpbmcgb3IgZXh0cmFjdGluZyB0aGUgY29uc3RhbnQgdGVybSBcXChLXFwpIiwiTXVzdCBzdGF0ZSB0aGF0IGNvdmVyLXVwIGFwcGxpZXMgdG8gdGhlIHByb3BlciByZW1haW5kZXIgXFwoRih4KS1LXFwpLCBub3QgdGhlIG9yaWdpbmFsIGZyYWN0aW9uIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCB1bmRlcnN0YW5kcyB0aGUgcmVxdWlyZWQgb3JkZXIgb2Ygb3BlcmF0aW9ucywgbm90IGp1c3QgdGhlIGFsZ2VicmFpYyByZXN1bHQuIiwiaGludCI6IkFzayB3aGF0IGhhcHBlbnMgdG8gdGhlIHBvbHlub21pYWwgcXVvdGllbnQgdGVybSB3aGVuIHlvdSBza2lwIHRoZSBleHRyYWN0aW9uIHN0ZXAuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZSwicXVlc3Rpb25fcm9sZSI6Im1pbmlfdHJhbnNmZXJfY2hlY2sifV19XX0=" style="display:none;"></div>%%KC_END%%
