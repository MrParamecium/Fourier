%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImdlbmVyYXRlZF9pbWFnZSIsInJhdGlvbmFsZSI6IlRoaXMgc2VjdGlvbiBpcyBhbGdlYnJhaWMgYW5kIGhhcyBubyB0ZXh0Ym9vayBmaWd1cmVzLiBXaWtpcGVkaWEtc3R5bGUgcmVmZXJlbmNlIGltYWdlcyBhcmUgbm90IHVzZWZ1bCBmb3IgdGhpcyBzcGVjaWZpYyBleGFtIHdvcmtmbG93LiBBIGN1c3RvbSBzdGF0aWMgZGVjaXNpb24tZmxvdyB2aXN1YWwgaXMganVzdGlmaWVkIGJlY2F1c2Ugc3R1ZGVudHMgbXVzdCByZWNvZ25pemUgd2hldGhlciB0byBkaXZpZGUgZmlyc3QsIGV4cGFuZCBGKHgpLCBvciBleHBhbmQgRih4KS94IGRlcGVuZGluZyBvbiB0aGUgdGFyZ2V0IHBhcnRpYWwgZnJhY3Rpb24gZm9ybS4iLCJjcmFtIjoiVXNlIHRoZSB2aXN1YWwgYXMgYSBmYXN0IGRlY2lzaW9uIHRyZWU6IGRlZ3JlZSBjaGVjayBmaXJzdCwgdGhlbiBjaG9vc2Ugb3JkaW5hcnkgb3IgbW9kaWZpZWQgZXhwYW5zaW9uLiIsInN0YW5kYXJkIjoiVXNlIHRoZSB2aXN1YWwgdG8gY29ubmVjdCB0aGUgZm9ybXVsYXMgdG8gb25lIHJlcHJlc2VudGF0aXZlIHdvcmtlZCBleGFtcGxlIHdpdGhvdXQgYWRkaW5nIGV4dHJhIGVkZ2UgY2FzZXMuIiwidG9wX3Njb3JlIjoiVXNlIHRoZSB2aXN1YWwgdG8gaGlnaGxpZ2h0IHRoZSB0cmFwOiBleHBhbmRpbmcgRih4KSBkaXJlY3RseSBkb2VzIG5vdCBwcm9kdWNlIGt4Lyh4IC0gzrspXnIgdGVybXMuIn0=" style="display:none;"></div>%%KC_END%%
# B.5-6 Improper F(x) with m > n

> **Section Objective:** Learn how to handle improper rational functions and the modified partial fraction form needed for inverse z-transform work.

---

## Concepts In This Section

- degree check
- polynomial division
- proper rational remainder
- modified partial fractions
- multiply-back step

## 1. Reduce an improper rational function first

When the numerator degree \(m\) is greater than or equal to the denominator degree \(n\), the rational function is **improper** and ordinary partial fractions must not start immediately.

- \(N(x)\): numerator polynomial
- \(D(x)\): denominator polynomial
- \(Q(x)\): polynomial quotient from division
- \(R(x)\): remainder, which satisfies \(\deg R < \deg D\)

**Exam trigger:** If \(m \geq n\), divide first.

**Common misuse:** Attempting cover-up or partial fractions on the original improper fraction before dividing. This produces wrong coefficients.

**Minimal example:** \(\frac{3x^2+9x-20}{(x-2)(x+3)}\) has \(m=2, n=2\), so divide first. The result is \(3 + \frac{\text{proper fraction}}{1}\), where the constant 3 is part of the final answer.

$$F(x)=\frac{N(x)}{D(x)}=Q(x)+\frac{R(x)}{D(x)},\quad \deg R<\deg D$$

## 2. Modified partial fractions: expand F(x)/x

Let \(F(x) = \dfrac{3x^2+9x-20}{(x-2)(x+3)}\).

Expand the denominator: \((x-2)(x+3) = x^2+x-6\).

Divide \(3x^2+9x-20\) by \(x^2+x-6\):

$$3x^2+9x-20 = 3(x^2+x-6) + (6x-2)$$

So the quotient is \(Q(x)=3\) and the remainder is \(R(x)=6x-2\).

Now expand the proper part using cover-up:

$$\frac{6x-2}{(x-2)(x+3)} = \frac{2}{x-2}+\frac{4}{x+3}$$

**Final result:**

$$F(x) = 3 + \frac{2}{x-2} + \frac{4}{x+3}$$

#### Exam Note
The constant \(3\) is part of the answer. Do not discard it — it came from polynomial division and must appear in the final expression.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="exam_pattern_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIGl0IHRvIGlkZW50aWZ5IHRoZSBjb3JyZWN0IGZpcnN0IG1vdmUgaW4gc2Vjb25kczogZGVncmVlIGNoZWNrLCBkaXZpZGUsIG9yIGV4cGFuZCBGKHgpL3guIiwic3RhbmRhcmQiOiJVc2UgaXQgYWZ0ZXIgdGhlIHdvcmtlZCBleGFtcGxlIHRvIGNvbm5lY3QgdGhlIHN5bWJvbGljIHN0ZXBzIGludG8gb25lIGNsZWFuIHdvcmtmbG93LiIsInRvcF9zY29yZSI6IlVzZSBpdCB0byBub3RpY2UgdGhlIHN1YnRsZSBkaXN0aW5jdGlvbiBiZXR3ZWVuIG9yZGluYXJ5IHBhcnRpYWwgZnJhY3Rpb25zIGFuZCBtb2RpZmllZCBwYXJ0aWFsIGZyYWN0aW9ucy4ifQ==" style="display:none;"></div>%%KC_END%%
*🎨 Decision flow: check degrees first, then choose the correct expansion route. The red warning box marks the most common exam trap.*
![Illustration](/generated/gptimage2-1778181344387-9238.png)

## 3. Multiply back by x to get the required form

Inverse z-transform tables often require terms shaped like \(\dfrac{kx}{(x-\lambda)^r}\), not \(\dfrac{k}{(x-\lambda)^r}\). To produce that form, use the **modified partial fraction method**:

1. Divide \(F(x)\) by \(x\) to form \(F(x)/x\).
2. Expand \(F(x)/x\) using ordinary partial fractions.
3. Multiply the entire result by \(x\) to recover \(F(x)\).

**Symbol guide:**
- \(a_1\): coefficient of the \(1/x\) term
- \(a_{i,r}\): coefficient for the \(r\)-th power of the \(i\)-th pole
- \(\lambda_i\): the \(i\)-th pole location
- \(r\): repeated-root order

**Exam trigger:** The problem asks for terms with \(x\) in the numerator.

**Common misuse:** Expanding \(F(x)\) directly and getting constant numerators \(k\) instead of \(x\)-multiples \(kx\).

$$\frac{F(x)}{x}=\frac{a_1}{x}+\sum_i\sum_{r=1}^{m_i}\frac{a_{i,r}}{(x-\lambda_i)^r}$$

## Worked Example: Modified Partial Fractions

Let \(F(x) = \dfrac{5x^2+20x+18}{(x+2)(x+3)^2}\).

**Step 1 — Form \(F(x)/x\):**

$$\frac{F(x)}{x} = \frac{5x^2+20x+18}{x(x+2)(x+3)^2}$$

**Step 2 — Expand using partial fractions** (coefficients found by cover-up and repeated-root methods):

$$\frac{F(x)}{x} = \frac{1}{x}+\frac{1}{x+2}-\frac{2}{x+3}+\frac{1}{(x+3)^2}$$

#### Quick Check
Every factor of the denominator \(x(x+2)(x+3)^2\) appears exactly once in the expansion: \(x\), \((x+2)\), \((x+3)\), and \((x+3)^2\). If any factor is missing, the expansion is incomplete.

The next step multiplies every term by \(x\) to return to \(F(x)\).

## 3. Multiply back by x to get the required form

After expanding \(F(x)/x\), multiply **every term** by \(x\) to return to \(F(x)\):

$$F(x) = x \cdot \frac{1}{x} + x \cdot \frac{1}{x+2} - x \cdot \frac{2}{x+3} + x \cdot \frac{1}{(x+3)^2}$$

- The first term: \(x \cdot (1/x) = 1\).
- The remaining three terms match the target pattern \(\dfrac{kx}{(x-\lambda)^r}\).

**Exam trigger:** Stop only after this multiply-back step. The expression \(F(x)/x\) is an intermediate tool, not the final answer. Inverse z-transform table entries require the \(F(x)\) form.

**Common misuse:** Leaving the answer as \(F(x)/x = 1/x + 1/(x+2) - 2/(x+3) + 1/(x+3)^2\) and reading off coefficients directly. This skips the multiply-back step and produces the wrong table match.

$$F(x)=1+\frac{x}{x+2}-\frac{2x}{x+3}+\frac{x}{(x+3)^2}$$

---
**📌 Key Takeaways**
- If \(m \geq n\), divide first: \(F(x)=Q(x)+R(x)/D(x)\) with \(\deg R < \deg D\); keep \(Q(x)\) in the final answer.
- For modified partial fractions, expand \(F(x)/x\) using ordinary methods, then multiply every term by \(x\).
- Final multiply-back form: \(F(x)=1+\dfrac{x}{x+2}-\dfrac{2x}{x+3}+\dfrac{x}{(x+3)^2}\).
- Use modified partial fractions when inverse z-transform tables require \(kx/(x-\lambda)^r\) terms, not \(k/(x-\lambda)^r\).

*Next, we move from rational-function tools into vectors and matrices.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImltcHJvcGVyX2RlZ3JlZV9jaGVjayIsImxhYmVsIjoiUmVjb2duaXppbmcgYW4gaW1wcm9wZXIgcmF0aW9uYWwgZnVuY3Rpb24iLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgcmF0aW9uYWwgZnVuY3Rpb24gaGFzIG51bWVyYXRvciBkZWdyZWUgXFwobSA9IDRcXCkgYW5kIGRlbm9taW5hdG9yIGRlZ3JlZSBcXChuID0gMlxcKS4gV2hhdCBzaG91bGQgeW91IGRvIGJlZm9yZSBvcmRpbmFyeSBwYXJ0aWFsIGZyYWN0aW9uIGV4cGFuc2lvbj8iLCJvcHRpb25zIjpbIkEuIEFwcGx5IGNvdmVyLXVwIGRpcmVjdGx5IHRvIHRoZSBvcmlnaW5hbCBmcmFjdGlvbiIsIkIuIFBlcmZvcm0gcG9seW5vbWlhbCBkaXZpc2lvbiBmaXJzdCIsIkMuIENhbmNlbCB0aGUgaGlnaGVzdCBwb3dlcnMgb2YgXFwoeFxcKSBvbmx5IiwiRC4gUmV3cml0ZSBldmVyeSBkZW5vbWluYXRvciBmYWN0b3IgYXMgXFwoeCAtIFxcbGFtYmRhXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiV2hlbiBcXChtIFxcZ2VxIG5cXCksIHRoZSByYXRpb25hbCBmdW5jdGlvbiBpcyBpbXByb3Blci4gRmlyc3QgZGl2aWRlIHRvIGdldCBhIHBvbHlub21pYWwgcGFydCBwbHVzIGEgcHJvcGVyIHJhdGlvbmFsIHJlbWFpbmRlci4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJDb3Zlci11cCBhcHBsaWVzIGNsZWFubHkgb25seSBhZnRlciB0aGUgcmF0aW9uYWwgcGFydCBpcyBwcm9wZXIuIiwiQyI6IkNhbmNlbGluZyBoaWdoZXN0IHBvd2VycyBpcyBub3QgdmFsaWQgYWxnZWJyYSB1bmxlc3MgdGhlcmUgaXMgYSBjb21tb24gZmFjdG9yLiIsIkQiOiJGYWN0b3JpbmcgbWF5IGJlIG5lZWRlZCBsYXRlciwgYnV0IGl0IGRvZXMgbm90IGZpeCBpbXByb3ByaWV0eS4ifSwiaGludCI6IkNoZWNrIG51bWVyYXRvciBkZWdyZWUgdmVyc3VzIGRlbm9taW5hdG9yIGRlZ3JlZSBmaXJzdC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGZvcm11bGEgY29ycmVjdGx5IGRlc2NyaWJlcyB0aGUgcmVzdWx0IG9mIHJlZHVjaW5nIGFuIGltcHJvcGVyIHJhdGlvbmFsIGZ1bmN0aW9uPyIsIm9wdGlvbnMiOlsiQS4gXFwoRih4KT1RKHgpK1IoeCkvRCh4KVxcKSwgd2l0aCBcXChcXGRlZyBSIDwgXFxkZWcgRFxcKSIsIkIuIFxcKEYoeCk9Uih4KStRKHgpL0QoeClcXCksIHdpdGggXFwoXFxkZWcgUSA8IFxcZGVnIERcXCkiLCJDLiBcXChGKHgpPU4oeClEKHgpK1IoeClcXCkiLCJELiBcXChGKHgpPVEoeCkvUih4KStEKHgpXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiUG9seW5vbWlhbCBkaXZpc2lvbiBzcGxpdHMgXFwoRih4KVxcKSBpbnRvIGEgcG9seW5vbWlhbCBxdW90aWVudCBcXChRKHgpXFwpIHBsdXMgYSBwcm9wZXIgcmF0aW9uYWwgcmVtYWluZGVyIFxcKFIoeCkvRCh4KVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGUgcG9seW5vbWlhbCBwYXJ0IGlzIFxcKFEoeClcXCksIG5vdCBcXChSKHgpXFwpLiIsIkMiOiJUaGlzIG11bHRpcGxpZXMgaW5zdGVhZCBvZiBkaXZpZGluZyBhbmQgZG9lcyBub3QgcmVwcmVzZW50IHBhcnRpYWwgZnJhY3Rpb24gcHJlcGFyYXRpb24uIiwiRCI6IlRoaXMgaGFzIG5vIHN0YW5kYXJkIG1lYW5pbmcgaW4gcG9seW5vbWlhbCBkaXZpc2lvbiBmb3IgcmF0aW9uYWwgZnVuY3Rpb25zLiJ9LCJoaW50IjoiVGhlIHJlbWFpbmRlciBtdXN0IGJlIHRoZSBudW1lcmF0b3Igb2YgdGhlIHByb3BlciBmcmFjdGlvbi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InBvbHlub21pYWxfZGl2aXNpb25fZXhhbXBsZSIsImxhYmVsIjoiS2VlcGluZyB0aGUgcG9seW5vbWlhbCBwYXJ0IGFmdGVyIGRpdmlzaW9uIiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIFxcKEYoeCkgPSAoM3heMis5eC0yMCkvKCh4LTIpKHgrMykpXFwpLCB0aGUgdGV4dGJvb2sgcmVzdWx0IGlzIFxcKEYoeCk9MysyLyh4LTIpKzQvKHgrMylcXCkuIFdoYXQgaXMgdGhlIG1vc3QgY29tbW9uIG1pc3Rha2UgaW4gdGhpcyByZXN1bHQ/Iiwib3B0aW9ucyI6WyJBLiBEcm9wcGluZyB0aGUgY29uc3RhbnQgdGVybSBcXCgzXFwpIiwiQi4gQ2hhbmdpbmcgXFwoeC0yXFwpIGludG8gXFwoeCsyXFwpIiwiQy4gQ29tYmluaW5nIHRoZSB0d28gZnJhY3Rpb25zIGludG8gb25lIGRlbm9taW5hdG9yIiwiRC4gUmVwbGFjaW5nIFxcKHhcXCkgYnkgXFwoMS94XFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGhlIGNvbnN0YW50IFxcKDNcXCkgY29tZXMgZnJvbSBwb2x5bm9taWFsIGRpdmlzaW9uIGFuZCByZW1haW5zIHBhcnQgb2YgXFwoRih4KVxcKS4gSXQgaXMgbm90IGFuIGludGVybWVkaWF0ZSBzdGVwIHRvIHRocm93IGF3YXkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiU2lnbiBlcnJvcnMgY2FuIGhhcHBlbiwgYnV0IHRoaXMgcXVlc3Rpb24gdGFyZ2V0cyB0aGUgaW1wcm9wZXItZnJhY3Rpb24gc3RlcC4iLCJDIjoiQ29tYmluaW5nIGZyYWN0aW9ucyByZXZlcnNlcyB0aGUgcGFydGlhbCBmcmFjdGlvbiBmb3JtIGJ1dCBpcyBub3QgdGhlIG1haW4gaW1wcm9wZXItZnJhY3Rpb24gdHJhcC4iLCJEIjoiUmVwbGFjaW5nIFxcKHhcXCkgYnkgXFwoMS94XFwpIGlzIHVucmVsYXRlZCB0byB0aGlzIGV4YW1wbGUuIn0sImhpbnQiOiJBc2sgd2hhdCBwb2x5bm9taWFsIGRpdmlzaW9uIGNvbnRyaWJ1dGVkIGJlZm9yZSBwYXJ0aWFsIGZyYWN0aW9ucyBiZWdhbi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJtb2RpZmllZF9wYXJ0aWFsX2ZyYWN0aW9uX3RyaWdnZXIiLCJsYWJlbCI6Iktub3dpbmcgd2hlbiB0byBleHBhbmQgRih4KS94IiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJBbiBpbnZlcnNlIHotdHJhbnNmb3JtIHByb2JsZW0gcmVxdWlyZXMgcGFydGlhbCBmcmFjdGlvbnMgb2YgdGhlIGZvcm0gXFwoa3gvKHgtXFxsYW1iZGEpXnJcXCkuIFdoYXQgaXMgdGhlIGNvcnJlY3Qgc3RyYXRlZ3k/Iiwib3B0aW9ucyI6WyJBLiBFeHBhbmQgXFwoRih4KVxcKSBkaXJlY3RseSBhbmQgc3RvcCIsIkIuIEV4cGFuZCBcXChGKHgpL3hcXCksIHRoZW4gbXVsdGlwbHkgdGhlIHJlc3VsdCBieSBcXCh4XFwpIiwiQy4gRGlmZmVyZW50aWF0ZSBcXChGKHgpXFwpIHdpdGggcmVzcGVjdCB0byBcXCh4XFwpIiwiRC4gUmVwbGFjZSBldmVyeSBcXChrXFwpIGJ5IFxcKGt4XFwpIHdpdGhvdXQgY2hhbmdpbmcgY29lZmZpY2llbnRzIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiRGl2aWRpbmcgYnkgXFwoeFxcKSBmaXJzdCBjcmVhdGVzIG9yZGluYXJ5IGNvbnN0YW50LW51bWVyYXRvciBmcmFjdGlvbnMuIE11bHRpcGx5aW5nIGJhY2sgYnkgXFwoeFxcKSBwcm9kdWNlcyB0aGUgcmVxdWlyZWQgXFwoa3gvKHgtXFxsYW1iZGEpXnJcXCkgZm9ybS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJEaXJlY3QgZXhwYW5zaW9uIHVzdWFsbHkgZ2l2ZXMgXFwoay8oeC1cXGxhbWJkYSleclxcKSwgbm90IFxcKGt4Lyh4LVxcbGFtYmRhKV5yXFwpLiIsIkMiOiJEaWZmZXJlbnRpYXRpb24gaXMgbm90IHBhcnQgb2YgdGhpcyBtZXRob2QuIiwiRCI6IllvdSBjYW5ub3QgaW5zZXJ0IFxcKHhcXCkgaW50byBudW1lcmF0b3JzIHdpdGhvdXQgY2hhbmdpbmcgdGhlIGV4cHJlc3Npb24uIn0sImhpbnQiOiJUaGUgdGFyZ2V0IG51bWVyYXRvciBjb250YWlucyBcXCh4XFwpLCBzbyB1c2UgdGhlIGRpdmlkZS10aGVuLW11bHRpcGx5IHRyaWNrLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJnZW5lcmF0ZWRfd29ya2Zsb3dfZGlhZ3JhbSIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQSBjbGFzc21hdGUgZXhwYW5kcyBcXChGKHgpXFwpIGRpcmVjdGx5IGFuZCBnZXRzIHRlcm1zIGxpa2UgXFwoMS8oeCsyKVxcKSBhbmQgXFwoLTIvKHgrMylcXCksIHRoZW4gY2xhaW1zIHRoaXMgaXMgYWxyZWFkeSB0aGUgbW9kaWZpZWQgcGFydGlhbCBmcmFjdGlvbiBmb3JtLiBFeHBsYWluIHdoeSB0aGF0IGlzIHdyb25nLiIsImlkZWFsX2Fuc3dlciI6IlRoZSBtb2RpZmllZCBmb3JtIG5lZWRlZCBoZXJlIGhhcyBcXCh4XFwpIGluIHRoZSBudW1lcmF0b3IsIGxpa2UgXFwoa3gvKHgtXFxsYW1iZGEpXnJcXCkuIFRvIGdldCB0aGF0IGZvcm0sIHdlIGV4cGFuZCBcXChGKHgpL3hcXCkgZmlyc3QgYW5kIHRoZW4gbXVsdGlwbHkgdGhlIGV4cGFuc2lvbiBieSBcXCh4XFwpLiBEaXJlY3RseSBleHBhbmRpbmcgXFwoRih4KVxcKSBnaXZlcyBjb25zdGFudC1udW1lcmF0b3IgdGVybXMgYW5kIG1pc3NlcyB0aGUgcmVxdWlyZWQgdGFibGUtbWF0Y2hpbmcgZm9ybS4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IG1lbnRpb24gdGhhdCB0aGUgcmVxdWlyZWQgZm9ybSBoYXMgXFwoeFxcKSBpbiB0aGUgbnVtZXJhdG9yIiwiTXVzdCBzdGF0ZSB0aGF0IFxcKEYoeCkveFxcKSBzaG91bGQgYmUgZXhwYW5kZWQgZmlyc3QiLCJNdXN0IG1lbnRpb24gbXVsdGlwbHlpbmcgYmFjayBieSBcXCh4XFwpIiwiTXVzdCBkaXN0aW5ndWlzaCBvcmRpbmFyeSBwYXJ0aWFsIGZyYWN0aW9ucyBmcm9tIG1vZGlmaWVkIHBhcnRpYWwgZnJhY3Rpb25zIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCB1bmRlcnN0YW5kcyB0aGUgcHVycG9zZSBvZiB0aGUgbW9kaWZpZWQgbWV0aG9kLCBub3QganVzdCB0aGUgYWxnZWJyYSBzdGVwcy4iLCJoaW50IjoiQ29tcGFyZSBcXChrLyh4LVxcbGFtYmRhKV5yXFwpIHdpdGggXFwoa3gvKHgtXFxsYW1iZGEpXnJcXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJtdWx0aXBseV9iYWNrX3N0ZXAiLCJsYWJlbCI6IlJldHVybmluZyBmcm9tIEYoeCkveCB0byBGKHgpIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3A0X3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJHaXZlbiBcXChGKHgpL3ggPSAxL3ggKyAxLyh4KzIpIC0gMi8oeCszKSArIDEvKHgrMyleMlxcKSwgd2hpY2ggaXMgXFwoRih4KVxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKEYoeCk9MS94ICsgMS8oeCsyKSAtIDIvKHgrMykgKyAxLyh4KzMpXjJcXCkiLCJCLiBcXChGKHgpPTEgKyB4Lyh4KzIpIC0gMngvKHgrMykgKyB4Lyh4KzMpXjJcXCkiLCJDLiBcXChGKHgpPXggKyAxLyh4KzIpIC0gMi8oeCszKSArIDEvKHgrMyleMlxcKSIsIkQuIFxcKEYoeCk9MSArIDEvKHgrMikgLSAyLyh4KzMpICsgMS8oeCszKV4yXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiTXVsdGlwbHkgZXZlcnkgdGVybSBpbiB0aGUgZXhwYW5zaW9uIG9mIFxcKEYoeCkveFxcKSBieSBcXCh4XFwpLiBUaGUgdGVybSBcXCh4IFxcY2RvdCAoMS94KVxcKSBiZWNvbWVzIFxcKDFcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBpcyBzdGlsbCBcXChGKHgpL3hcXCksIG5vdCBcXChGKHgpXFwpLiIsIkMiOiJPbmx5IHRoZSBmaXJzdCB0ZXJtIHdhcyBtdWx0aXBsaWVkIGluY29ycmVjdGx5OyBcXCh4IFxcY2RvdCAoMS94KSA9IDFcXCksIG5vdCBcXCh4XFwpLiIsIkQiOiJPbmx5IHRoZSBmaXJzdCB0ZXJtIHdhcyBhZGp1c3RlZDsgZXZlcnkgdGVybSBtdXN0IGJlIG11bHRpcGxpZWQgYnkgXFwoeFxcKS4ifSwiaGludCI6Ik11bHRpcGx5IHRoZSBlbnRpcmUgcmlnaHQtaGFuZCBzaWRlIGJ5IFxcKHhcXCksIG5vdCBqdXN0IG9uZSB0ZXJtLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
