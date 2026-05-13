%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJUaGUgdGV4dGJvb2sgYWxyZWFkeSBwcm92aWRlcyBhIHN0cm9uZyBmaWd1cmUgZm9yIHRoZSB0aW1lLWNvbnN0YW50IGlkZWEsIHNvIHRoZSBsZXNzb24gc2hvdWxkIHN0YXkgYW5jaG9yZWQgaW4gdGhlIGJvb2suIEEgZ2VuZXJhdGVkIHZpc3VhbCBpcyBzdGlsbCB1c2VmdWwgYmVjYXVzZSB0aGlzIHNlY3Rpb24gaXMgaGlnaGx5IHBhdHRlcm4tYmFzZWQ6IHN0dWRlbnRzIGJlbmVmaXQgZnJvbSBhIGNsZWFuZXIgc2lkZS1ieS1zaWRlIHZpZXcgb2YgZGVjYXkgdmVyc3VzIGdyb3d0aCB3aXRoIHRoZSByZXBlYXRlZCAnZXZlcnkgMS9hIHNlY29uZHMnIHJ1bGUgbWFkZSB2aXN1YWxseSBvYnZpb3VzLiIsImNyYW0iOiJVc2UgdmlzdWFscyB0byBoZWxwIHRoZSBzdHVkZW50IGluc3RhbnRseSByZWNvZ25pemUgZGVjYXksIGdyb3d0aCwgYW5kIHRoZSAnb25lIHRpbWUgY29uc3RhbnQgbWVhbnMgbXVsdGlwbHkgYnkgMS9lIG9yIGUnIHJ1bGUuIiwic3RhbmRhcmQiOiJVc2UgdGhlIHRleHRib29rIGZpZ3VyZSB0byBleHBsYWluIHRoZSB0aW1lIGNvbnN0YW50IGNsZWFybHksIHRoZW4gdXNlIG9uZSBjbGVhbiBnZW5lcmF0ZWQgY29tcGFyaXNvbiB2aXN1YWwgdG8gY29ubmVjdCB0aGUgcnVsZSB0byBza2V0Y2hpbmcgc3BlZWQuIiwidG9wX3Njb3JlIjoiVXNlIHZpc3VhbHMgdG8gZGlzdGluZ3Vpc2ggaW5pdGlhbCB2YWx1ZSwgdGltZSBjb25zdGFudCwgcmVwZWF0ZWQgc2NhbGluZywgYW5kIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gYSBhbmQgMS9hIHNvIHN0dWRlbnRzIGF2b2lkIGNvbW1vbiBpbnRlcnByZXRhdGlvbiBtaXN0YWtlcy4ifQ==" style="display:none;"></div>%%KC_END%%
# B.3-1 Monotonic Exponentials

> **Section Objective:** Recognize and sketch monotonic exponentials quickly using the time constant, without plotting many points.

Consider \ (x(t) = e^{-2t}\). At \ (t = 0\) the value is exactly 1. At \ (t = 0.5\) it has already fallen to about 0.37. At \ (t = 1\) it falls again to about 0.135. Three points, and the shape is already clear.

This section teaches you to read that pattern instantly. The key tool is the **time constant**: a single number that tells you how fast the curve drops or rises. Once you know the initial value and the time constant, you can sketch any monotonic exponential in seconds — no calculator needed. On exams, that speed matters. The goal here is to build that reflex.

## 1. Decay vs Growth

For any \ (a > 0\), the sign in the exponent decides everything:

- \ (e^{-at}\): as \ (t\) increases, the exponent becomes more negative, so the value **decreases**.
- \ (e^{at}\): as \ (t\) increases, the exponent becomes more positive, so the value **increases**.

Both signals start at exactly 1 when \ (t = 0\), because \ (e^0 = 1\) in both cases. After that, they move in opposite directions.

**Mini-example:** Compare \ (e^{-2t}\) and \ (e^{2t}\) at two moments:

| \ (t\) | \ (e^{-2t}\) | \ (e^{2t}\) |
|--------|-------------|------------|
| 0 | 1 | 1 |
| 0.5 | \ (\approx 0.37\) | \ (\approx 2.72\) |

### COMMON MISTAKE

Do not confuse a **negative exponent** with a **negative signal**. \ (e^{-at}\) is always strictly positive — it never crosses zero or goes negative. The word "decay" means the value shrinks toward zero, not that it becomes negative.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="comparison_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgdmlzdWFsIHRvIGxvY2sgaW4gdGhlIGZhc3QgcmVjb2duaXRpb24gcGF0dGVybjogZV57LWF0fSBnb2VzIGRvd24sIGVee2F0fSBnb2VzIHVwLiIsInN0YW5kYXJkIjoiVXNlIHRoaXMgdmlzdWFsIHRvIGNvbXBhcmUgdGhlIHR3byBzaGFwZXMgYW5kIGNvbm5lY3QgZWFjaCB0byB0aGUgc2lnbiBpbiB0aGUgZXhwb25lbnQuIiwidG9wX3Njb3JlIjoiVXNlIHRoaXMgdmlzdWFsIHRvIHN0cmVzcyB0aGF0IHRoZSBzYW1lIHBhcmFtZXRlciBhIGNvbnRyb2xzIHRoZSByYXRlLCB3aGlsZSB0aGUgc2lnbiBjb250cm9scyBkZWNheSB2ZXJzdXMgZ3Jvd3RoLiJ9" style="display:none;"></div>%%KC_END%%
*🎨 Side-by-side comparison: the sign in the exponent is the only difference, yet it completely determines whether the signal decays or grows.*
![Illustration](/generated/gptimage2-1777213071227-1214.png)

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgZmlndXJlIHRvIG1lbW9yaXplIHRoZSBrZXkgY2hlY2twb2ludHMgMSwgMC4zNywgYW5kIDAuMTM1IGZhc3QuIiwic3RhbmRhcmQiOiJVc2UgdGhpcyBmaWd1cmUgdG8gZXhwbGFpbiB3aGF0IG9uZSB0aW1lIGNvbnN0YW50IG1lYW5zIGFuZCBob3cgaXQgZ3VpZGVzIHRoZSBza2V0Y2guIiwidG9wX3Njb3JlIjoiVXNlIHRoaXMgZmlndXJlIHRvIGhpZ2hsaWdodCB0aGF0IGVhY2ggYWRkaXRpb25hbCBpbnRlcnZhbCBvZiBsZW5ndGggMS9hIG11bHRpcGxpZXMgdGhlIHZhbHVlIGJ5IDEvZSBhZ2Fpbi4ifQ==" style="display:none;"></div>%%KC_END%%
![Fig. B.10](/figures/page-021-fig__b_10-1.png)
*This figure shows how a decaying exponential drops by the same factor \(1/e\) over each time interval of length \(1/a\), which is why the time constant makes sketching fast.*

$$\tau = \frac{1}{a}, \qquad \frac{e^{-a t_2}}{e^{-a t_1}} = e^{-a(t_2-t_1)} = \frac{1}{e}\ \text{when}\ t_2-t_1=\frac{1}{a}$$
*The time constant is \ (\tau = 1/a\). Every time \ (t\) advances by one time constant \ (1/a\), a decaying exponential is multiplied by \ (1/e \approx 0.368\) — it drops to about 37% of whatever value it had at the start of that interval.*

## 2. The Time Constant and Quick Sketching

The **time constant** \ (\tau = 1/a\) is the single most useful shortcut in this section. It tells you the natural time scale of the exponential.

**The rule:** After every interval of length \ (\tau\), the signal is multiplied by \ (1/e \approx 0.37\).

### SKETCHING RECIPE

Apply this to \ (x(t) = e^{-2t}\):

1. **Time constant:** \ (\tau = 1/2 = 0.5\)
2. **Start:** \ (x(0) = 1\)
3. **One time constant later:** \ (x(0.5) = e^{-1} = 1/e \approx 0.37\)
4. **Two time constants later:** \ (x(1) = e^{-2} = 1/e^2 \approx 0.135\)
5. **Draw:** Plot these three anchor points, then draw a smooth decreasing curve through them.

That is the entire sketch. No calculator, no table of values.

### EXAM TIP

A **larger** \ (a\) means a **faster** decay, because \ (\tau = 1/a\) is smaller — the signal reaches 37% sooner. If you see \ (e^{-10t}\) versus \ (e^{-t}\), the first one collapses to near zero much faster.

$$x(t)=e^{-2t}, \qquad \tau=\frac{1}{2}=0.5, \qquad x(0)=1,\ x(0.5)=\frac{1}{e},\ x(1)=\frac{1}{e^2}$$
*This example turns the general time-constant rule into a concrete sketching plan: mark equally spaced points at \ (t = 0, 0.5, 1\) with values \ (1, 1/e, 1/e^2\), then connect them with a smooth decreasing curve.*

---
**📌 Key Takeaways**
- For \(a > 0\): \(e^{-at}\) decays and \(e^{at}\) grows; the sign in the exponent decides which.
- The time constant is \(\tau = 1/a\): the natural time scale of the exponential.
- Every interval of \(1/a\) multiplies a decaying exponential by \(1/e \approx 0.37\).

*In the next section we will sketch exponentially varying sinusoids by combining a sinusoid with an exponential envelope.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InNoYXBlX3JlY29nbml0aW9uIiwibGFiZWwiOiJSZWNvZ25pemluZyBtb25vdG9uaWMgZGVjYXkgdmVyc3VzIG1vbm90b25pYyBncm93dGgiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkFzc3VtZSBcXChhID4gMFxcKS4gV2hpY2ggc3RhdGVtZW50IGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBcXChlXnstYXR9XFwpIGdyb3dzIG1vbm90b25pY2FsbHkgYW5kIFxcKGVee2F0fVxcKSBkZWNheXMgbW9ub3RvbmljYWxseSIsIkIuIFxcKGVeey1hdH1cXCkgZGVjYXlzIG1vbm90b25pY2FsbHkgYW5kIFxcKGVee2F0fVxcKSBncm93cyBtb25vdG9uaWNhbGx5IiwiQy4gQm90aCBcXChlXnstYXR9XFwpIGFuZCBcXChlXnthdH1cXCkgZGVjYXkgbW9ub3RvbmljYWxseSIsIkQuIEJvdGggXFwoZV57LWF0fVxcKSBhbmQgXFwoZV57YXR9XFwpIG9zY2lsbGF0ZSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkZvciBwb3NpdGl2ZSBcXChhXFwpLCB0aGUgbmVnYXRpdmUgZXhwb25lbnQgY2F1c2VzIHRoZSBzaWduYWwgdG8gZGVjcmVhc2UgYXMgXFwodFxcKSBpbmNyZWFzZXMsIHdoaWxlIHRoZSBwb3NpdGl2ZSBleHBvbmVudCBjYXVzZXMgaXQgdG8gaW5jcmVhc2UuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyByZXZlcnNlcyB0aGUgY29ycmVjdCBiZWhhdmlvci4iLCJDIjoiT25seSBcXChlXnstYXR9XFwpIGRlY2F5czsgXFwoZV57YXR9XFwpIGdyb3dzLiIsIkQiOiJFeHBvbmVudGlhbHMgZG8gbm90IG9zY2lsbGF0ZSBieSB0aGVtc2VsdmVzLiJ9LCJoaW50IjoiQ2hlY2sgdGhlIHNpZ24gaW4gdGhlIGV4cG9uZW50LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggc3RhdGVtZW50IGFib3V0IFxcKGVeey1hdH1cXCkgZm9yIFxcKGEgPiAwXFwpIGlzIHRydWU/Iiwib3B0aW9ucyI6WyJBLiBJdCBiZWNvbWVzIG5lZ2F0aXZlIGZvciBsYXJnZSBcXCh0XFwpIiwiQi4gSXQgc3RhcnRzIGF0IDAgYW5kIHJpc2VzIHRvIDEiLCJDLiBJdCBzdGFydHMgYXQgMSB3aGVuIFxcKHQgPSAwXFwpIGFuZCBzdGF5cyBwb3NpdGl2ZSB3aGlsZSBkZWNheWluZyIsIkQuIEl0cyB2YWx1ZSBhZnRlciBvbmUgdGltZSBjb25zdGFudCBpcyAwIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiQXQgXFwodCA9IDBcXCksIFxcKGVeey1hdH0gPSAxXFwpLiBBcyBcXCh0XFwpIGluY3JlYXNlcywgdGhlIHZhbHVlIGRlY3JlYXNlcyBidXQgcmVtYWlucyBzdHJpY3RseSBwb3NpdGl2ZS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJBIGRlY2F5aW5nIGV4cG9uZW50aWFsIHN0YXlzIGFib3ZlIHplcm8gZm9yIGFsbCBmaW5pdGUgXFwodFxcKS4iLCJCIjoiQXQgXFwodCA9IDBcXCkgaXQgZXF1YWxzIDEsIG5vdCAwLiIsIkQiOiJBZnRlciBvbmUgdGltZSBjb25zdGFudCBpdCBpcyBcXCgxL2UgXFxhcHByb3ggMC4zN1xcKSwgbm90IDAuIn0sImhpbnQiOiJFdmFsdWF0ZSB0aGUgZXhwcmVzc2lvbiBhdCBcXCh0ID0gMFxcKSBhbmQgcmVtZW1iZXIgdGhhdCBleHBvbmVudGlhbHMgYXJlIGFsd2F5cyBwb3NpdGl2ZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InRpbWVfY29uc3RhbnRfZGVmaW5pdGlvbiIsImxhYmVsIjoiTWVhbmluZyBvZiB0aGUgdGltZSBjb25zdGFudCIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIFxcKHgodCkgPSBlXnstYXR9XFwpIHdpdGggXFwoYSA+IDBcXCksIHdoYXQgaXMgdGhlIHRpbWUgY29uc3RhbnQ/Iiwib3B0aW9ucyI6WyJBLiBcXChhXFwpIiwiQi4gXFwoMS9hXFwpIiwiQy4gXFwoZS9hXFwpIiwiRC4gXFwoMS9lXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIHRpbWUgY29uc3RhbnQgb2YgXFwoZV57LWF0fVxcKSBpcyBcXChcXHRhdSA9IDEvYVxcKSwgdGhlIHRpbWUgaW50ZXJ2YWwgb3ZlciB3aGljaCB0aGUgc2lnbmFsIGRyb3BzIGJ5IGEgZmFjdG9yIG9mIFxcKDEvZVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJcXChhXFwpIGNvbnRyb2xzIHRoZSByYXRlLCBidXQgdGhlIHRpbWUgY29uc3RhbnQgaXMgaXRzIHJlY2lwcm9jYWwgXFwoMS9hXFwpLiIsIkMiOiJUaGlzIGlzIG5vdCB0aGUgc3RhbmRhcmQgZGVmaW5pdGlvbi4iLCJEIjoiXFwoMS9lXFwpIGlzIHRoZSBkcm9wIGZhY3RvciAoYSBkaW1lbnNpb25sZXNzIHJhdGlvKSwgbm90IGEgdGltZSBpbnRlcnZhbC4ifSwiaGludCI6IlRoZSB0aW1lIGNvbnN0YW50IGlzIGEgdGltZSBpbnRlcnZhbCwgbm90IGEgZGltZW5zaW9ubGVzcyByYXRpby4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3AyX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJZiBcXCh0XzIgLSB0XzEgPSAxL2FcXCkgZm9yIFxcKHgodCkgPSBlXnstYXR9XFwpLCB0aGVuIFxcKHgodF8yKVxcKSBlcXVhbHMiLCJvcHRpb25zIjpbIkEuIFxcKGUgXFxjZG90IHgodF8xKVxcKSIsIkIuIFxcKHgodF8xKVxcKSIsIkMuIFxcKFxcZnJhY3sxfXtlfSBcXGNkb3QgeCh0XzEpXFwpIiwiRC4gXFwoMCBcXGNkb3QgeCh0XzEpXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiT3ZlciBvbmUgdGltZSBjb25zdGFudCwgdGhlIHZhbHVlIG9mIGEgZGVjYXlpbmcgZXhwb25lbnRpYWwgaXMgbXVsdGlwbGllZCBieSBcXCgxL2VcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiTXVsdGlwbHlpbmcgYnkgXFwoZVxcKSB3b3VsZCBkZXNjcmliZSBncm93dGgsIG5vdCBkZWNheS4iLCJCIjoiVGhlIHNpZ25hbCBjaGFuZ2VzIG92ZXIgdGhhdCBpbnRlcnZhbDsgaXQgZG9lcyBub3Qgc3RheSBjb25zdGFudC4iLCJEIjoiVGhlIGV4cG9uZW50aWFsIG5ldmVyIHJlYWNoZXMgemVybyBpbiBmaW5pdGUgdGltZS4ifSwiaGludCI6IlVzZSB0aGUgcmF0aW8gXFwoeCh0XzIpL3godF8xKSA9IGVeey1hKHRfMiAtIHRfMSl9XFwpIGFuZCBzdWJzdGl0dXRlIFxcKHRfMiAtIHRfMSA9IDEvYVxcKS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InF1aWNrX3NrZXRjaF9leGFtcGxlIiwibGFiZWwiOiJVc2luZyB0aGUgdGltZSBjb25zdGFudCB0byBza2V0Y2ggYSBzcGVjaWZpYyBleHBvbmVudGlhbCIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgXFwoeCh0KSA9IGVeey0ydH1cXCksIHdoaWNoIHZhbHVlIGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBUaGUgdGltZSBjb25zdGFudCBpcyAyIiwiQi4gXFwoeCgwLjUpID0gZV57LTJ9XFwpIiwiQy4gXFwoeCgwLjUpID0gMS9lXFwpIiwiRC4gXFwoeCgxKSA9IDEvZVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IkZvciBcXCh4KHQpID0gZV57LTJ0fVxcKSwgdGhlIHRpbWUgY29uc3RhbnQgaXMgXFwoXFx0YXUgPSAxLzIgPSAwLjVcXCkuIEF0IFxcKHQgPSAwLjVcXCksIHRoZSBleHBvbmVudCBpcyBcXCgtMiBcXHRpbWVzIDAuNSA9IC0xXFwpLCBzbyBcXCh4KDAuNSkgPSBlXnstMX0gPSAxL2VcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlIHRpbWUgY29uc3RhbnQgaXMgXFwoMS9hID0gMS8yXFwpLCBub3QgXFwoYSA9IDJcXCkuIiwiQiI6IkF0IFxcKHQgPSAwLjVcXCksIHRoZSBleHBvbmVudCBpcyBcXCgtMVxcKSwgbm90IFxcKC0yXFwpLCBzbyB0aGUgdmFsdWUgaXMgXFwoZV57LTF9XFwpLCBub3QgXFwoZV57LTJ9XFwpLiIsIkQiOiJBdCBcXCh0ID0gMVxcKSwgdGhlIGV4cG9uZW50IGlzIFxcKC0yXFwpLCBzbyBcXCh4KDEpID0gZV57LTJ9ID0gMS9lXjJcXCksIG5vdCBcXCgxL2VcXCkuIn0sImhpbnQiOiJTdWJzdGl0dXRlIFxcKHQgPSAwLjVcXCkgY2FyZWZ1bGx5OiB0aGUgZXhwb25lbnQgYmVjb21lcyBcXCgtMiBcXHRpbWVzIDAuNSA9IC0xXFwpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkZvciBcXCh4KHQpID0gZV57LTJ0fVxcKSwgZ2l2ZSB0aHJlZSBhbmNob3IgcG9pbnRzIHRoYXQgYXJlIGVub3VnaCBmb3IgYSBxdWljayBza2V0Y2ggdXNpbmcgdGhlIHRpbWUtY29uc3RhbnQgbWV0aG9kLiIsImlkZWFsX2Fuc3dlciI6Ik9uZSB2YWxpZCBzZXQgaXMgXFwoKDAsXFwsIDEpXFwpLCBcXCgoMC41LFxcLCAxL2UgXFxhcHByb3ggMC4zNylcXCksIGFuZCBcXCgoMSxcXCwgMS9lXjIgXFxhcHByb3ggMC4xMzUpXFwpLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3QgaW5jbHVkZSBcXCh0ID0gMFxcKSB3aXRoIHZhbHVlIDEiLCJNdXN0IGlkZW50aWZ5IHRoZSB0aW1lIGNvbnN0YW50IGFzIDAuNSBvciB1c2UgdGhlIGNvcnJlY3QgMC41LXN0ZXAgc3BhY2luZyIsIk11c3QgZ2l2ZSBhdCBsZWFzdCBvbmUgY29ycmVjdCBsYXRlciB2YWx1ZSBzdWNoIGFzIFxcKDEvZVxcKSBhdCBcXCh0ID0gMC41XFwpIGFuZCBwcmVmZXJhYmx5IFxcKDEvZV4yXFwpIGF0IFxcKHQgPSAxXFwpIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCBjYW4gdHVybiB0aGUgdGltZS1jb25zdGFudCBydWxlIGludG8gYW4gYWN0dWFsIHNrZXRjaGluZyBwbGFuIHdpdGggc3BlY2lmaWMgbnVtZXJpY2FsIGFuY2hvciBwb2ludHMuIiwiaGludCI6IlN0YXJ0IGF0IFxcKHQgPSAwXFwpLCB0aGVuIG1vdmUgZm9yd2FyZCBieSBvbmUgdGltZSBjb25zdGFudCAoXFwoXFx0YXUgPSAwLjVcXCkpIGVhY2ggc3RlcC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
