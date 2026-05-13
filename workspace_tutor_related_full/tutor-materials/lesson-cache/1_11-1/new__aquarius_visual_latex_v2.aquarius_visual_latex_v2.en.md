%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJUaGlzIHNlY3Rpb24gaXMgbW9zdGx5IGNvZGUtYW5kLWZvcm11bGEgYmFzZWQsIHNvIExhVGVYL2NvZGUtbmF0aXZlIGRpc3BsYXlzIHNob3VsZCB0ZWFjaCB0aGUgYW5vbnltb3VzLWZ1bmN0aW9uIHN0cnVjdHVyZS4gVGhlIGF2YWlsYWJsZSB0ZXh0Ym9vayBmaWd1cmUgaXMgdGhlIGJlc3QgdmlzdWFsIGFuY2hvciBmb3IgdGhlIHNhbXBsaW5nLXJlc29sdXRpb24gdHJhcCBiZWNhdXNlIGl0IGRpcmVjdGx5IGNvbXBhcmVzIHRoZSB3cm9uZyBjb2Fyc2UgcGxvdCB3aXRoIHRoZSBjb3JyZWN0IGZpbmUgcGxvdC4iLCJjcmFtIjoiVXNlIHRoZSB2aXN1YWwgdG8gaW5zdGFudGx5IHJlY29nbml6ZSB0aGUgZXhhbSB0cmFwOiB0b28gZmV3IHNhbXBsZSBwb2ludHMgY2FuIGhpZGUgb3NjaWxsYXRpb25zLiIsInN0YW5kYXJkIjoiVXNlIHRoZSBmb3JtdWxhLWNvZGUgcGFpcmluZyBmb3IgdGhlIG1haW4gaWRlYSwgdGhlbiB1c2UgdGhlIHRleHRib29rIHBsb3QgY29tcGFyaXNvbiBhcyB0aGUgcmVwcmVzZW50YXRpdmUgZXhhbXBsZS4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhlIHBsb3QgY29tcGFyaXNvbiB0byBzdHJlc3MgdGhlIGRpc3RpbmN0aW9uIGJldHdlZW4gdGhlIHRydWUgZnVuY3Rpb24gYW5kIHRoZSBzYW1wbGVkIHBsb3QgZHJhd24gZnJvbSBjaG9zZW4gaW5wdXQgcG9pbnRzLiJ9" style="display:none;"></div>%%KC_END%%
# 1.11-1 Anonymous Functions

> **Section Objective:** Learn how MATLAB anonymous functions turn formulas into reusable functions that can be evaluated and plotted.

---

## Concepts In This Section

- Anonymous function syntax
- Input arguments
- Scalar evaluation
- Vector evaluation
- Plot sampling resolution

## 1. From a formula to an anonymous function

This is the mathematical function we want to represent in MATLAB. The MATLAB line that creates it is:

```matlab
f = @(t) exp(-t).*\\cos(2*pi*t);
```

Breaking it down:
- `@` tells MATLAB you are creating an anonymous function.
- `(t)` declares `t` as the input argument.
- `exp(-t)` computes \(e^{-t}\).
- `\\cos(2*pi*t)` computes \(\cos(2\pi t)\).
- `.*` is element-wise multiplication, required when `t` may be a vector.

**When to use this:** Any time a formula must be reused for many input values.

### EXAM TRIGGER

If a problem asks you to define, evaluate, or plot a function in MATLAB, reach for `@(t)` syntax.

### COMMON MISTAKE

Forgetting the dot in `.*` — if `t` is a vector, plain `*` will attempt matrix multiplication and throw an error.

$$f(t) = e^{-t}\cos(2\pi t)$$

## 2. Vector inputs evaluate many points at once

Evaluate the function at \(t = 0\):

```matlab
t = 0;
f(t)       % returns ans = 1
f(0)       % also returns ans = 1
```

This matches the formula exactly: \(e^{0} = 1\) and \(\cos(0) = 1\), so \(f(0) = 1 \times 1 = 1\).

#### Note

The `t` inside `@(t)` is **local** to the anonymous function. Even if your workspace has a variable also named `t`, the function's input argument is independent. The name inside `@(...)` is just a placeholder label.

## 3. Choose enough sample points for plotting

When the input is a vector, MATLAB applies the anonymous function to each element and returns a vector of outputs.

Using the textbook example:

```matlab
t = (-2:2);
f(t)
% ans = [7.3891  2.7183  1.0000  0.3679  0.1353]
```

Here \(\mathbf{t} = [-2,\,-1,\,0,\,1,\,2]\). Each \(t_k\) is one element of the input vector, and \(f(t_k)\) is the corresponding output value.

### COMMON MISTAKE

Using `*` instead of `.*` in the function definition. When `t` is a vector, `exp(-t)*\\cos(2*pi*t)` attempts matrix multiplication and fails. Always use `.*` so each element is multiplied independently.

$$f(\mathbf{t}) = \bigl[f(t_1),\, f(t_2),\, \ldots,\, f(t_n)\bigr]$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="trap_exposure" data-visual-use-b64="eyJjcmFtIjoiTWVtb3JpemUgdGhlIHZpc3VhbCB3YXJuaW5nOiB0b28gZmV3IHBvaW50cyBjYW4gcHJvZHVjZSBhIG1pc2xlYWRpbmcgcGxvdC4iLCJzdGFuZGFyZCI6IkNvbXBhcmUgdGhlIHR3byBwbG90cyBhbmQgY29ubmVjdCBlYWNoIG9uZSB0byBpdHMgTUFUTEFCIGlucHV0IHZlY3Rvci4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhlIGZpZ3VyZSB0byBzZXBhcmF0ZSB0cnVlIGZ1bmN0aW9uIGJlaGF2aW9yIGZyb20gdGhlIHBsb3R0aW5nIGFydGlmYWN0IGNhdXNlZCBieSBzcGFyc2Ugc2FtcGxlcy4ifQ==" style="display:none;"></div>%%KC_END%%
![Figure 1.46 and Figure 1.47](/figures/page-127-figure_1_46_and_figure_1_47-1.png)
*These two plots show how coarse versus fine sampling changes the plotted appearance of the same function.*
<div class="lesson-figure-description">The figure contains two plots of \(f(t) = e^{-t}\cos(2\pi t)\). The top plot uses `t = (-2:2)` — only 5 integer sample points — so the connected line misses all oscillations and falsely appears as a simple decreasing curve. The bottom plot uses `t = (-2:0.01:2)` — 401 points — which reveals the true damped cosine waveform with clearly visible peaks, troughs, and sign changes. The mathematical function did not change between the two plots; only the number of sampled input points changed.</div>

## 3. Choose enough sample points for plotting

The function \(\cos(2\pi t)\) completes exactly one full oscillation per unit of \(t\), so its period is \(T = 1\). To capture that oscillation faithfully, the textbook rule is **100 points per period**, giving a spacing of \(\Delta t = 0.01\).

The corresponding MATLAB vector is:

```matlab
t = (-2:0.01:2);
```

Symbol meanings:
- \(T\) — period of the oscillation (here \(T = 1\))
- \(\Delta t\) — spacing between consecutive sampled input values

**Use case:** Any time you plot an oscillatory function.

### EXAM TRIGGER

If a plot looks too smooth, too straight, or is missing expected oscillations, the first thing to check is whether the sampling step \(\Delta t\) is small enough relative to the period.

### COMMON MISTAKE

Assuming MATLAB plots the true continuous curve automatically. MATLAB only connects the sampled values you provide — it does not fill in the gaps.

$$\Delta t = \frac{T}{100} = \frac{1}{100} = 0.01$$

---
**📌 Key Takeaways**
- Define an anonymous function with `f = @(t) exp(-t).*\\cos(2*pi*t);` — `@(t)` names the input, `.*` handles vector inputs element-wise.
- Scalar evaluation: \(f(0) = e^{0}\cos(0) = 1\); vector evaluation returns \(f(\mathbf{t}) = [f(t_1), \ldots, f(t_n)]\) for each element.
- Use `.*` (not `*`) whenever the input may be a vector; plain `*` attempts matrix multiplication and will error.
- For oscillatory functions, choose \(\Delta t = T/100 = 0.01\) and use `t = (-2:0.01:2);` — too few points hide oscillations entirely.

*Next, you will use these function-building ideas to represent standard signals more efficiently.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NSwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo0LCJtYXgiOjV9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImFub255bW91c19mdW5jdGlvbl9zeW50YXgiLCJsYWJlbCI6IkFub255bW91cyBmdW5jdGlvbiBzeW50YXgiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJxMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggTUFUTEFCIGxpbmUgY29ycmVjdGx5IGRlZmluZXMgXFwoZih0KSA9IGVeey10fVxcY29zKDJcXHBpIHQpXFwpIGFzIGFuIGFub255bW91cyBmdW5jdGlvbiB0aGF0IGNhbiBhY2NlcHQgdmVjdG9yIGlucHV0cz8iLCJvcHRpb25zIjpbIkEuIGBmID0gQCh0KSBleHAoLXQpLipjb3MoMipwaSp0KTtgIiwiQi4gYGYodCkgPSBleHAoLXQpKmNvcygyKnBpKnQpO2AiLCJDLiBgZiA9IEAodCkgZV4oLXQpLipjb3MoMipwaSp0KTtgIiwiRC4gYGYgPSBAdCBleHAoLXQpLipjb3MoMipwaSp0KTtgIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiT3B0aW9uIEEgdXNlcyBgQCh0KWAgdG8gZGVjbGFyZSB0aGUgaW5wdXQgYXJndW1lbnQgYW5kIHVzZXMgYC4qYCBzbyB2ZWN0b3IgaW5wdXRzIGFyZSBoYW5kbGVkIGVsZW1lbnQgYnkgZWxlbWVudC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGlzIGlzIG5vdCB2YWxpZCBNQVRMQUIgYW5vbnltb3VzLWZ1bmN0aW9uIHN5bnRheCBhbmQgdXNlcyBgKmAgaW5zdGVhZCBvZiBlbGVtZW50LXdpc2UgbXVsdGlwbGljYXRpb24uIiwiQyI6Ik1BVExBQiB1c2VzIGBleHAoLXQpYCwgbm90IGBlXigtdClgLCBmb3IgdGhlIGV4cG9uZW50aWFsIGZ1bmN0aW9uLiIsIkQiOiJUaGUgaW5wdXQgYXJndW1lbnQgbXVzdCBiZSB3cml0dGVuIGluc2lkZSBwYXJlbnRoZXNlcyBhcyBgQCh0KWAsIG5vdCBgQHRgLiJ9LCJoaW50IjoiTG9vayBmb3IgYm90aCBgQCh0KWAgYW5kIGVsZW1lbnQtd2lzZSBtdWx0aXBsaWNhdGlvbiBgLipgLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6InNjYWxhcl9ldmFsdWF0aW9uIiwibGFiZWwiOiJTY2FsYXIgZXZhbHVhdGlvbiIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJxMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIFxcKGYodCkgPSBlXnstdH1cXGNvcygyXFxwaSB0KVxcKSwgd2hhdCBzaG91bGQgYGYoMClgIHJldHVybj8iLCJvcHRpb25zIjpbIkEuIDAiLCJCLiAxIiwiQy4gXFwoMlxccGlcXCkiLCJELiBcXCgtMVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkF0IFxcKHQgPSAwXFwpLCBcXChlXnswfSA9IDFcXCkgYW5kIFxcKFxcY29zKDApID0gMVxcKSwgc28gXFwoZigwKSA9IDEgXFx0aW1lcyAxID0gMVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJOZWl0aGVyIGZhY3RvciBlcXVhbHMgemVybyBhdCBcXCh0ID0gMFxcKS4iLCJDIjoiXFwoMlxccGlcXCkgYXBwZWFycyBpbnNpZGUgdGhlIGNvc2luZSBhcmd1bWVudCwgYnV0IGl0IGlzIG5vdCB0aGUgb3V0cHV0IHZhbHVlLiIsIkQiOiJcXChcXGNvcygwKSA9IDFcXCksIG5vdCBcXCgtMVxcKS4ifSwiaGludCI6IkV2YWx1YXRlIGVhY2ggZmFjdG9yIHNlcGFyYXRlbHkgYXQgXFwodCA9IDBcXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoidmVjdG9yX2V2YWx1YXRpb24iLCJsYWJlbCI6IlZlY3RvciBpbnB1dCBiZWhhdmlvciIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6InEzIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJZiBgdCA9ICgtMjoyKTtgLCB3aGF0IGRvZXMgTUFUTEFCIHVzZSBhcyB0aGUgaW5wdXQgdmVjdG9yPyIsIm9wdGlvbnMiOlsiQS4gYFstMiAtMSAwIDEgMl1gIiwiQi4gYFstMiAyXWAiLCJDLiBgWy0yIDAgMl1gIiwiRC4gYFstMiAtMC4wMSAwIDAuMDEgMl1gIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGhlIGNvbG9uIGV4cHJlc3Npb24gYC0yOjJgIHVzZXMgdGhlIGRlZmF1bHQgc3RlcCBzaXplIG9mIDEsIHByb2R1Y2luZyBldmVyeSBpbnRlZ2VyIGZyb20gXFwoLTJcXCkgdGhyb3VnaCBcXCgyXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoaXMgbGlzdHMgb25seSB0aGUgZW5kcG9pbnRzLCBub3QgdGhlIGZ1bGwgY29sb24tZ2VuZXJhdGVkIHZlY3Rvci4iLCJDIjoiVGhpcyBza2lwcyBcXCgtMVxcKSBhbmQgXFwoMVxcKSBldmVuIHRob3VnaCB0aGUgZGVmYXVsdCBzdGVwIGlzIDEuIiwiRCI6IkEgc3RlcCBvZiAwLjAxIG11c3QgYmUgZXhwbGljaXRseSB3cml0dGVuIGFzIGAtMjowLjAxOjJgLiJ9LCJoaW50IjoiSWYgbm8gc3RlcCBzaXplIGlzIHdyaXR0ZW4sIE1BVExBQiB1c2VzIGEgZGVmYXVsdCBzdGVwIG9mIDEuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoic2FtcGxpbmdfcmVzb2x1dGlvbl9wbG90dGluZyIsImxhYmVsIjoiU2FtcGxpbmcgcmVzb2x1dGlvbiBmb3IgcGxvdHMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJxNCIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiT2JzZXJ2ZSB0aGUgdGV4dGJvb2sgY29tcGFyaXNvbiBvZiBGaWd1cmUgMS40NiBhbmQgRmlndXJlIDEuNDcuIFdoeSBkb2VzIHRoZSB0b3AgcGxvdCBmYWlsIHRvIHNob3cgdGhlIGV4cGVjdGVkIG9zY2lsbGF0aW9ucz8iLCJvcHRpb25zIjpbIkEuIFRoZSBmdW5jdGlvbiBmb3JtdWxhIGlzIHdyb25nIGluIHRoZSB0b3AgcGxvdC4iLCJCLiBUaGUgdG9wIHBsb3QgdXNlcyB0b28gZmV3IHNhbXBsZWQgaW5wdXQgcG9pbnRzLiIsIkMuIFRoZSBjb3NpbmUgdGVybSBkaXNhcHBlYXJzIHdoZW4gTUFUTEFCIHBsb3RzIHZlY3RvcnMuIiwiRC4gVGhlIGV4cG9uZW50aWFsIGZhY3RvciBwcmV2ZW50cyBhbGwgb3NjaWxsYXRpb24uIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIHRvcCBwbG90IHNhbXBsZXMgb25seSBhdCBpbnRlZ2VyIHZhbHVlcyBmcm9tIFxcKC0yXFwpIHRvIFxcKDJcXCksIHNvIGl0IG1pc3NlcyB0aGUgcGVha3MsIHRyb3VnaHMsIGFuZCBzaWduIGNoYW5nZXMgdGhhdCBvY2N1ciBiZXR3ZWVuIHRob3NlIHBvaW50cy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGUgc2FtZSBmdW5jdGlvbiBmb3JtdWxhIGlzIHVzZWQgaW4gYm90aCBwbG90czsgb25seSB0aGUgc2FtcGxpbmcgdmVjdG9yIGNoYW5nZXMuIiwiQyI6Ik1BVExBQiBkb2VzIG5vdCByZW1vdmUgdGhlIGNvc2luZSB0ZXJtIHdoZW4gcGxvdHRpbmcgdmVjdG9ycy4iLCJEIjoiVGhlIGV4cG9uZW50aWFsIGNoYW5nZXMgdGhlIGVudmVsb3BlIGFtcGxpdHVkZSwgYnV0IHRoZSBjb3NpbmUgc3RpbGwgb3NjaWxsYXRlcy4ifSwiaGludCI6IkFzayB3aGF0IGNoYW5nZWQgYmV0d2VlbiB0aGUgdHdvIHBsb3RzOiB0aGUgZm9ybXVsYSwgb3IgdGhlIGlucHV0IHZlY3Rvcj8iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoidGV4dGJvb2tfZmlndXJlX2NvbXBhcmlzb24iLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoicTUiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IlRoZSBmdW5jdGlvbiBjb250YWlucyBcXChcXGNvcygyXFxwaSB0KVxcKSwgc28gb25lIG9zY2lsbGF0aW9uIGhhcyBwZXJpb2QgXFwoVCA9IDFcXCkuIElmIHlvdSB3YW50IDEwMCBwb2ludHMgcGVyIG9zY2lsbGF0aW9uLCB3aGF0IE1BVExBQiB2ZWN0b3Igc2hvdWxkIHlvdSB1c2UgZnJvbSBcXCgtMlxcKSB0byBcXCgyXFwpPyIsImlkZWFsX2Fuc3dlciI6ImB0ID0gKC0yOjAuMDE6Mik7YCBiZWNhdXNlIFxcKFxcRGVsdGEgdCA9IFQvMTAwID0gMS8xMDAgPSAwLjAxXFwpLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3QgZ2l2ZSB0aGUgTUFUTEFCIHZlY3RvciB3aXRoIGVuZHBvaW50cyAtMiBhbmQgMi4iLCJNdXN0IHVzZSBzdGVwIHNpemUgMC4wMS4iLCJNdXN0IGNvbm5lY3QgMC4wMSB0byAxMDAgcG9pbnRzIHBlciBwZXJpb2QuIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCBjYW4gY29udmVydCB0aGUgc2FtcGxpbmcgcnVsZSBpbnRvIHRoZSBhY3R1YWwgTUFUTEFCIGNvbG9uIGV4cHJlc3Npb24uIiwiaGludCI6IlVzZSB0aGUgZm9ybSBgc3RhcnQ6c3RlcDpzdG9wYC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX1dfQ==" style="display:none;"></div>%%KC_END%%
