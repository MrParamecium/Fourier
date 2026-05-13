%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJUaGUgdW5pdCBzdGVwIGhhcyBhIHN0YW5kYXJkIHNpZ25hbCBzaGFwZSB0aGF0IGNhbiBiZSBzdXBwb3J0ZWQgYnkgYSBXaWtpcGVkaWEvV2lraW1lZGlhIHJlZmVyZW5jZSB2aXN1YWwsIHdoaWxlIHRoZSBNQVRMQUIgcGxvdHRpbmcgbWlzdGFrZXMgaW4gdGhpcyBzZWN0aW9uIHJlcXVpcmUgY3VzdG9tIHdyb25nLXZzLXJpZ2h0IHRlYWNoaW5nIHZpc3VhbHMgYmVjYXVzZSB0aGUgYXZhaWxhYmxlIGJvb2sgYXNzZXRzIGFyZSBvbmx5IGZ1bGwgcGFnZSBzY3JlZW5zaG90cyBhbmQgbm8gY2xlYW4gY3JvcHBlZCBmaWd1cmVzIGFyZSBwcm92aWRlZC4iLCJjcmFtIjoiVXNlIHZpc3VhbHMgdG8gaW5zdGFudGx5IHJlY29nbml6ZSBzdGVwLCBwdWxzZSwgaGFsZi1vcGVuIGludGVydmFsLCBhbmQgYmFkIGRpc2NvbnRpbnVpdHkgcGxvdHMuIiwic3RhbmRhcmQiOiJVc2UgdmlzdWFscyB0byBjb25uZWN0IGVhY2ggTUFUTEFCIGV4cHJlc3Npb24gdG8gb25lIHJlcHJlc2VudGF0aXZlIHNpZ25hbCBwbG90IGFuZCBvbmUgcGxvdHRpbmcgY29ycmVjdGlvbi4iLCJ0b3Bfc2NvcmUiOiJVc2UgdmlzdWFscyB0byBleHBvc2UgZW5kcG9pbnQgdHJhcHMsIGVsZW1lbnR3aXNlIGxvZ2ljIHRyYXBzLCBhbmQgdGhlIG1pc2xlYWRpbmcgc2xvcGVkIHNlZ21lbnQgY3JlYXRlZCBieSBjb2Fyc2Ugc2FtcGxlcy4ifQ==" style="display:none;"></div>%%KC_END%%
# Relational Operators and the Unit Step Function

> **Section Objective:** Use MATLAB relational operators to build and plot step-like signals.

---

## Concepts In This Section

- Relational operators
- Unit step function
- Unit pulse function
- Plotting jump discontinuities
- Logical operators

## 1. Unit Step from a Relational Test

In MATLAB, the relational test `t>=0` returns logical **1** wherever the condition is true and logical **0** wherever it is false. Multiplying by `1.0` converts that logical array into a numeric signal.

The MATLAB anonymous function is:

```matlab
u = @(t) 1.0.*(t>=0);
```

**Symbol meanings:**
- \(t\) — input vector or scalar
- \(u(t)\) — output signal (0 or 1 at each sample)
- \(\ge\) — includes the switching instant: \(u(0) = 1\)

**Example:** For `t = [-1 0 2]`, `u(t)` returns `[0 1 1]`.

### EXAM TRIGGER

Use this pattern when a signal turns on at zero.

### COMMON MISTAKE

Using `>` instead of `>=` gives \(u(0) = 0\), which changes the value at exactly the switching instant.

$$u(t) = 1.0\,(t \ge 0)$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="web_reference_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoZSBzaGFwZSB0byByZWNvZ25pemUgYSB1bml0IHN0ZXAgaW1tZWRpYXRlbHkuIiwic3RhbmRhcmQiOiJDb25uZWN0IHRoZSBncmFwaCBkaXJlY3RseSB0byB0aGUgY29uZGl0aW9uIHQgPj0gMC4iLCJ0b3Bfc2NvcmUiOiJDaGVjayB0aGUgZW5kcG9pbnQgY29udmVudGlvbiBhdCB0ID0gMCBpbnN0ZWFkIG9mIGFzc3VtaW5nIGl0IGlzIGV4Y2x1ZGVkLiJ9" style="display:none;"></div>%%KC_END%%
![Rectangular function](https://upload.wikimedia.org/wikipedia/commons/1/11/Rectangular_function.svg)
*The unit step is 0 for all \(t < 0\) and jumps to 1 at \(t = 0\). Notice the filled dot at \(t = 0\) confirming the convention \(u(0) = 1\).*
%%KC_BLOCK%%<div class="kc-reference-source"><a href="https://upload.wikimedia.org/wikipedia/commons/1/11/Rectangular_function.svg" target="_blank" rel="noopener noreferrer">Reference image from Wikipedia</a></div>%%KC_END%%

## 2. Unit Pulse from Two Relational Tests

A unit pulse is 1 only when **both** conditions are simultaneously true: \(t \ge 0\) AND \(t < 1\). Outside that interval the output is 0.

The MATLAB anonymous function is:

```matlab
p = @(t) 1.0.*((t>=0)&(t<1));
```

**Symbol meanings:**
- \(\ge\) — left endpoint \(t = 0\) is **included**
- \(<\) — right endpoint \(t = 1\) is **excluded**
- `&` — elementwise logical AND; tests every entry of a vector independently

**Example:** For `t = [-0.5 0 0.5 1]`, `p(t)` returns `[0 1 1 0]`.

### EXAM TRIGGER

Use this pattern for a rectangular pulse over a half-open interval \([0,\,1)\).

### COMMON MISTAKE

Replacing `&` with `&&` causes an error or wrong result for vector inputs because `&&` is a scalar short-circuit operator.

$$p(t) = 1.0\,\big((t \ge 0)\ \&\(t < 1)\big)$$

## 3. Plotting jump discontinuities without misleading yourself

**Alternative construction — shifted step subtraction:**

The same pulse can be built by subtracting a delayed unit step:

```matlab
p = @(t) u(t) - u(t-1);
```

- \(u(t)\) turns the signal **on** at \(t = 0\).
- \(u(t-1)\) turns on at \(t = 1\); subtracting it turns the pulse **off** at \(t = 1\).

Both expressions produce the same half-open pulse \([0,\,1)\).

### EXAM TRIGGER

If a rectangular pulse starts at one time and ends one unit later, think: *step on minus shifted step off*.

### COMMON MISTAKE

Writing \(u(t+1)\) shifts the turn-off to \(t = -1\), not \(t = 1\). The delay inside the argument must match the desired turn-off time.

$$p(t) = u(t) - u(t-1)$$

## 4. Logical operators: vector tests vs scalar short-circuit tests

MATLAB's `plot` command connects sample points with straight line segments. If your time vector is coarse — for example `t = (-2:2)` with only 5 points — the jump in the unit step appears as a **diagonal ramp** between adjacent samples. That ramp is a plotting artifact, not part of the mathematical signal.

**Two fixes:**

1. **Increase sample density:** Use `t = (-2:0.01:2)` so the jump spans only one tiny segment.
2. **Set the axis window:** Use `axis([-2 2 -0.1 1.1])` to prevent auto-scaling from compressing or hiding the jump.

**The four axis entries in order:**

| Entry | Meaning |
|-------|---------|
| \(x_{\min}\) | left edge of the horizontal axis |
| \(x_{\max}\) | right edge of the horizontal axis |
| \(y_{\min}\) | bottom edge of the vertical axis |
| \(y_{\max}\) | top edge of the vertical axis |

### EXAM TRIGGER

When a jump discontinuity plot looks like a diagonal line, increase sample density and adjust axes.

### COMMON MISTAKE

Assuming the plotted ramp is part of the mathematical signal. The unit step jumps instantly; the ramp is only a connect-the-dots artifact.

$$\operatorname{axis}\big([\,x_{\min}\ \ x_{\max}\ \ y_{\min}\ \ y_{\max}\,]\big)$$

## 4. Logical Operators: Vector Tests vs Scalar Short-Circuit Tests

MATLAB provides two families of logical operators, and choosing the wrong one inside an anonymous function is a common source of bugs.

---

### RELATIONAL OPERATORS (return logical arrays)

| Operator | Meaning |
|----------|---------|
| `<` | less than |
| `>` | greater than |
| `<=` | less than or equal |
| `>=` | greater than or equal |
| `==` | equal |
| `~=` | not equal |

---

### VECTOR LOGICAL OPERATORS (elementwise, for arrays)

- `&` — elementwise AND
- `|` — elementwise OR
- `~` — elementwise NOT

**Example:** `(t>0)&(t<1)` tests the condition \(0 < t < 1\) for **every element** of the vector `t`.

---

### SCALAR SHORT-CIRCUIT OPERATORS (for scalars only)

- `&&` — scalar AND; skips the second test if the first is false
- `||` — scalar OR; skips the second test if the first is true

These operators evaluate only as many conditions as necessary, but they **do not operate element-by-element** on arrays.

### EXAM NOTE

For anonymous functions that accept vector inputs, always prefer `&` and `|` over `&&` and `||`.

### COMMON MISTAKE

Writing `(t>0)&&(t<1)` and expecting it to work element-by-element on a vector `t`. MATLAB will either error or return a single scalar result instead of a logical array.

---
**📌 Key Takeaways**
- Unit step: `u = @(t) 1.0.*(t>=0);` — returns 1 for \(t \ge 0\), 0 otherwise; \(u(0) = 1\) by convention.
- Unit pulse (AND form): `p = @(t) 1.0.*((t>=0)&(t<1));` — half-open interval \([0,\,1)\); right endpoint excluded.
- Unit pulse (step form): `p = @(t) u(t)-u(t-1);` — step on at 0, shifted step turns off at 1; same result.
- Fix coarse-sample ramps: use `t = (-2:0.01:2)` for density and `axis([xmin xmax ymin ymax])` to set the view window.
- Use elementwise `&` / `|` inside anonymous functions for vector inputs; reserve scalar short-circuit `&&` / `||` for scalar conditions only.

*Next, you will use these signal-building tools inside larger signal and system examples.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlbGF0aW9uYWxfb3BlcmF0b3Jfb3V0cHV0cyIsImxhYmVsIjoiUmVsYXRpb25hbCBvcGVyYXRvcnMgcmV0dXJuIGxvZ2ljYWwgMC8xIHZhbHVlcyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSW4gTUFUTEFCLCB3aGF0IGRvZXMgdGhlIGV4cHJlc3Npb24gYCh0Pj0wKWAgcmV0dXJuIHdoZW4gYHQgPSBbLTIgMCAzXWA/Iiwib3B0aW9ucyI6WyJBLiBgWzAgMCAxXWAiLCJCLiBgWzAgMSAxXWAiLCJDLiBgWy0yIDAgM11gIiwiRC4gYFtmYWxzZSBmYWxzZSB0cnVlXWAgb25seSwgd2l0aCBubyBudW1lcmljIHVzZSBwb3NzaWJsZSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6ImB0Pj0wYCBpcyB0cnVlIGZvciAwIGFuZCAzLCBmYWxzZSBmb3IgLTIsIHNvIGl0IHJldHVybnMgbG9naWNhbCB2YWx1ZXMgZXF1aXZhbGVudCB0byBgWzAgMSAxXWAgaW4gbnVtZXJpYyBzaWduYWwgY29uc3RydWN0aW9uLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgdHJlYXRzIDAgYXMgZmFsc2UsIGJ1dCBgPj1gIGluY2x1ZGVzIGVxdWFsaXR5LCBzbyBcXCh0ID0gMFxcKSBzYXRpc2ZpZXMgdGhlIGNvbmRpdGlvbi4iLCJDIjoiQSByZWxhdGlvbmFsIHRlc3QgcmV0dXJucyBsb2dpY2FsIHJlc3VsdHMgKDAgb3IgMSksIG5vdCB0aGUgb3JpZ2luYWwgdmVjdG9yIHZhbHVlcy4iLCJEIjoiTUFUTEFCIGxvZ2ljYWwgdmFsdWVzIGNhbiBiZSB1c2VkIG51bWVyaWNhbGx5IGFzIDAgYW5kIDEgaW4gYXJpdGhtZXRpYyBleHByZXNzaW9ucy4ifSwiaGludCI6IkNoZWNrIHdoZXRoZXIgZXF1YWxpdHkgYXQgemVybyBpcyBpbmNsdWRlZCBpbiB0aGUgYD49YCBvcGVyYXRvci4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGFub255bW91cyBmdW5jdGlvbiBtYXRjaGVzIHRoZSBzZWN0aW9uJ3MgdW5pdCBzdGVwIGNvbnZlbnRpb24/Iiwib3B0aW9ucyI6WyJBLiBgdSA9IEAodCkgMS4wLioodD4wKTtgIiwiQi4gYHUgPSBAKHQpIDEuMC4qKHQ+PTApO2AiLCJDLiBgdSA9IEAodCkgMS4wLioodDw9MCk7YCIsIkQuIGB1ID0gQCh0KSAxLjAuKih0fj0wKTtgIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIHVuaXQgc3RlcCB1c2VkIGhlcmUgdHVybnMgb24gYXQgemVybywgc28gYHQ+PTBgIGdpdmVzIFxcKHUoMCkgPSAxXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgZXhjbHVkZXMgemVybywgZ2l2aW5nIFxcKHUoMCkgPSAwXFwpLCB3aGljaCB2aW9sYXRlcyB0aGUgY29udmVudGlvbi4iLCJDIjoiVGhpcyBpcyAxIGJlZm9yZSBvciBhdCB6ZXJvIOKAlCB0aGUgb3Bwb3NpdGUgZGlyZWN0aW9uIG9mIGEgc3RhbmRhcmQgdW5pdCBzdGVwLiIsIkQiOiJUaGlzIHJldHVybnMgMCBvbmx5IGF0IHplcm8gYW5kIDEgZXZlcnl3aGVyZSBlbHNlLCB3aGljaCBpcyBub3QgYSBzdGVwIGZ1bmN0aW9uLiJ9LCJoaW50IjoiVGhlIHRleHRib29rIGRlZmluaXRpb24gaW5jbHVkZXMgdGhlIHN3aXRjaGluZyBpbnN0YW50IFxcKHQgPSAwXFwpLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJ1bml0X3N0ZXBfZW5kcG9pbnRfY2hlY2siLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InVuaXRfcHVsc2VfZGVmaW5pdGlvbiIsImxhYmVsIjoiVW5pdCBwdWxzZSBmcm9tIGxvZ2ljYWwgQU5EIG9yIHNoaWZ0ZWQgc3RlcHMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciBgcCA9IEAodCkgMS4wLiooKHQ+PTApJih0PDEpKTtgLCB3aGF0IGlzIGBwKFswIDAuNSAxXSlgPyIsIm9wdGlvbnMiOlsiQS4gYFsxIDEgMV1gIiwiQi4gYFswIDEgMV1gIiwiQy4gYFsxIDEgMF1gIiwiRC4gYFswIDEgMF1gIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiVGhlIHB1bHNlIGlzIDEgZm9yIFxcKDAgXFxsZSB0IDwgMVxcKS4gVGhlcmVmb3JlIFxcKHQgPSAwXFwpIGFuZCBcXCh0ID0gMC41XFwpIGFyZSBpbmNsdWRlZCwgYnV0IFxcKHQgPSAxXFwpIGlzIGV4Y2x1ZGVkIGJ5IHRoZSBzdHJpY3QgYDxgIGluZXF1YWxpdHkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBpbmNvcnJlY3RseSBpbmNsdWRlcyB0aGUgcmlnaHQgZW5kcG9pbnQgXFwodCA9IDFcXCksIGJ1dCBgdDwxYCBpcyBzdHJpY3QuIiwiQiI6IlRoaXMgaW5jb3JyZWN0bHkgZXhjbHVkZXMgdGhlIGxlZnQgZW5kcG9pbnQgXFwodCA9IDBcXCksIGJ1dCBgPj1gIGluY2x1ZGVzIGVxdWFsaXR5LiIsIkQiOiJUaGlzIGluY29ycmVjdGx5IGV4Y2x1ZGVzIFxcKHQgPSAwXFwpIGV2ZW4gdGhvdWdoIGA+PWAgaW5jbHVkZXMgaXQuIn0sImhpbnQiOiJSZWFkIHRoZSB0d28gaW5lcXVhbGl0aWVzIHNlcGFyYXRlbHk6IGxlZnQgZW5kcG9pbnQgaW5jbHVkZWQgKGA+PWApLCByaWdodCBlbmRwb2ludCBleGNsdWRlZCAoYDxgKS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoiaGFsZl9vcGVuX2ludGVydmFsX3B1bHNlIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AyX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBleHByZXNzaW9uIGlzIGVxdWl2YWxlbnQgdG8gYSBwdWxzZSB0aGF0IHR1cm5zIG9uIGF0IFxcKHQgPSAwXFwpIGFuZCB0dXJucyBvZmYgYXQgXFwodCA9IDFcXCk/Iiwib3B0aW9ucyI6WyJBLiBgdSh0KSAtIHUodC0xKWAiLCJCLiBgdSh0LTEpIC0gdSh0KWAiLCJDLiBgdSh0KSArIHUodC0xKWAiLCJELiBgdSh0KzEpIC0gdSh0KWAiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJgdSh0KWAgdHVybnMgb24gYXQgXFwodCA9IDBcXCksIGFuZCBzdWJ0cmFjdGluZyBgdSh0LTEpYCByZW1vdmVzIHRoZSBzaWduYWwgc3RhcnRpbmcgYXQgXFwodCA9IDFcXCksIHByb2R1Y2luZyBhIHB1bHNlIG92ZXIgXFwoWzAsXFwsMSlcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhpcyBnaXZlcyBhIG5lZ2F0aXZlIHB1bHNlIG92ZXIgdGhlIGludGVydmFsIGluc3RlYWQgb2YgYSBwb3NpdGl2ZSBvbmUuIiwiQyI6IlRoaXMgYWRkcyB0d28gc3RlcHMgYW5kIGNyZWF0ZXMgc2lnbmFsIGxldmVscyBvZiAxIGFuZCAyLCBub3QgYSBwdWxzZSB0aGF0IHR1cm5zIG9mZi4iLCJEIjoiYHUodCsxKWAgdHVybnMgb24gYXQgXFwodCA9IC0xXFwpLCBzbyB0aGUgaW50ZXJ2YWwgaXMgc2hpZnRlZCB0byBcXChbLTEsXFwsMClcXCkuIn0sImhpbnQiOiJUaGluazogZmlyc3Qgc3RlcCB0dXJucyBvbiBhdCAwLCBzaGlmdGVkIHN0ZXAgdHVybnMgb2ZmIGF0IDEuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6InN0ZXBfc3VidHJhY3Rpb25fcHVsc2UiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InBsb3R0aW5nX2Rpc2NvbnRpbnVpdGllcyIsImxhYmVsIjoiUGxvdHRpbmcganVtcCBkaXNjb250aW51aXRpZXMgd2l0aCBiZXR0ZXIgc2FtcGxlIGRlbnNpdHkgYW5kIGF4ZXMiLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJBIHBsb3R0ZWQgdW5pdCBzdGVwIHNob3dzIGEgZGlhZ29uYWwgcmFtcCBiZXR3ZWVuIFxcKHQgPSAtMVxcKSBhbmQgXFwodCA9IDBcXCkuIFdoYXQgaXMgdGhlIGJlc3QgaW50ZXJwcmV0YXRpb24/Iiwib3B0aW9ucyI6WyJBLiBUaGUgdHJ1ZSB1bml0IHN0ZXAgaGFzIGEgbGluZWFyIHJhbXAgYmVmb3JlIHplcm8uIiwiQi4gTUFUTEFCIGNvbm5lY3RlZCBzcGFyc2Ugc2FtcGxlIHBvaW50cyB3aXRoIGEgc3RyYWlnaHQgbGluZS4iLCJDLiBUaGUgcmVsYXRpb25hbCBvcGVyYXRvciBgPj1gIGNyZWF0ZXMgYSByYW1wLiIsIkQuIFRoZSBheGlzIGNvbW1hbmQgY2F1c2VkIHRoZSByYW1wLiJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6Ik1BVExBQidzIGRlZmF1bHQgbGluZSBwbG90IGNvbm5lY3RzIHNhbXBsZWQgZGF0YSBwb2ludHMgd2l0aCBzdHJhaWdodCBzZWdtZW50cy4gV2l0aCBjb2Fyc2Ugc2FtcGxlcywgYSBqdW1wIGRpc2NvbnRpbnVpdHkgY2FuIGxvb2sgbGlrZSBhIHNsb3BlZCBzZWdtZW50IOKAlCB0aGlzIGlzIGEgcGxvdHRpbmcgYXJ0aWZhY3QsIG5vdCBhIHByb3BlcnR5IG9mIHRoZSBzaWduYWwuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlIHVuaXQgc3RlcCBqdW1wcyBpbnN0YW50YW5lb3VzbHk7IGl0IGRvZXMgbm90IHJhbXAuIiwiQyI6IlRoZSByZWxhdGlvbmFsIHRlc3QgcmV0dXJucyBvbmx5IDAgb3IgMSwgbmV2ZXIgaW50ZXJtZWRpYXRlIHJhbXAgdmFsdWVzLiIsIkQiOiJUaGUgYXhpcyBjb21tYW5kIGNoYW5nZXMgdGhlIHZpZXdpbmcgd2luZG93LCBub3QgdGhlIHNpZ25hbCB2YWx1ZXMgb3IgdGhlIHBsb3R0ZWQgc2VnbWVudHMuIn0sImhpbnQiOiJBc2sgd2hldGhlciB0aGUgc2xvcGUgaXMgYSBtYXRoZW1hdGljYWwgcHJvcGVydHkgb2YgdGhlIHNpZ25hbCBvciBqdXN0IGFuIGFydGlmYWN0IG9mIGNvbm5lY3Rpbmcgc2FtcGxlIHBvaW50cy4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoid3JvbmdfdnNfcmlnaHRfZGlzY29udGludWl0eV9wbG90Iiwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSW4gYGF4aXMoWy0yIDIgLTAuMSAxLjFdKWAsIHdoYXQgZG8gdGhlIGZvdXIgbnVtYmVycyBtZWFuPyIsIm9wdGlvbnMiOlsiQS4gYFt4bWluIHhtYXggeW1pbiB5bWF4XWAiLCJCLiBgW3ltaW4geW1heCB4bWluIHhtYXhdYCIsIkMuIGBbeHN0ZXAgeXN0ZXAgeG1pbiB5bWF4XWAiLCJELiBgW2xlZnQgcmlnaHQgZ3JpZCBjb2xvcl1gIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGhlIGBheGlzYCBjb21tYW5kIHVzZXMgYFt4bWluIHhtYXggeW1pbiB5bWF4XWAgdG8gc2V0IHRoZSB2aXNpYmxlIHBsb3Qgd2luZG93OiBob3Jpem9udGFsIGxpbWl0cyBmaXJzdCwgdGhlbiB2ZXJ0aWNhbCBsaW1pdHMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhpcyByZXZlcnNlcyB0aGUgeCBhbmQgeSByYW5nZXM7IHgtbGltaXRzIGFsd2F5cyBjb21lIGZpcnN0LiIsIkMiOiJUaGUgYGF4aXNgIGNvbW1hbmQgZG9lcyBub3Qgc2V0IHNhbXBsZSBzcGFjaW5nIG9yIHN0ZXAgc2l6ZS4iLCJEIjoiVGhlIGBheGlzYCBjb21tYW5kIGRvZXMgbm90IGNvbnRyb2wgZ3JpZCBsaW5lcyBvciBjb2xvci4ifSwiaGludCI6IlRoZSB4LWxpbWl0cyBjb21lIGZpcnN0LCB0aGVuIHRoZSB5LWxpbWl0cy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJsb2dpY2FsX29wZXJhdG9yX2Nob2ljZSIsImxhYmVsIjoiQ2hvb3NpbmcgdmVjdG9yIGxvZ2ljYWwgb3BlcmF0b3JzIHZlcnN1cyBzY2FsYXIgc2hvcnQtY2lyY3VpdCBvcGVyYXRvcnMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNF9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggb3BlcmF0b3Igc2hvdWxkIGJlIHVzZWQgaW5zaWRlIGEgdmVjdG9yaXplZCBhbm9ueW1vdXMgZnVuY3Rpb24gdG8gdGVzdCBcXCgwIDwgdCA8IDFcXCkgZm9yIGV2ZXJ5IGVsZW1lbnQgb2YgYHRgPyIsIm9wdGlvbnMiOlsiQS4gYCYmYCIsIkIuIGAmYCIsIkMuIGB8fGAiLCJELiBgPT1gIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiYCZgIHBlcmZvcm1zIGVsZW1lbnR3aXNlIGxvZ2ljYWwgQU5ELCB3aGljaCBpcyByZXF1aXJlZCB3aGVuIGB0YCBpcyBhIHZlY3RvciBzbyB0aGF0IGVhY2ggZWxlbWVudCBpcyB0ZXN0ZWQgaW5kZXBlbmRlbnRseS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJgJiZgIGlzIHNjYWxhciBzaG9ydC1jaXJjdWl0IEFORDsgaXQgZG9lcyBub3Qgb3BlcmF0ZSBlbGVtZW50LWJ5LWVsZW1lbnQgb24gYXJyYXlzLiIsIkMiOiJgfHxgIGlzIHNjYWxhciBzaG9ydC1jaXJjdWl0IE9SLCBhbmQgaXQgYWxzbyBhcHBsaWVzIHRoZSB3cm9uZyBsb2dpY2FsIG9wZXJhdGlvbi4iLCJEIjoiYD09YCB0ZXN0cyBlcXVhbGl0eSwgbm90IHdoZXRoZXIgdHdvIHNlcGFyYXRlIGluZXF1YWxpdGllcyBhcmUgYm90aCBzYXRpc2ZpZWQuIn0sImhpbnQiOiJGb3IgdmVjdG9ycywgY2hvb3NlIHRoZSBlbGVtZW50d2lzZSBsb2dpY2FsIG9wZXJhdG9yLCBub3QgdGhlIHNjYWxhciBzaG9ydC1jaXJjdWl0IHZlcnNpb24uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3A0X3EyIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJBIGNsYXNzbWF0ZSB3cml0ZXMgYHAgPSBAKHQpIDEuMC4qKCh0Pj0wKSYmKHQ8MSkpO2AgZm9yIGEgcHVsc2Ugd2l0aCB2ZWN0b3IgaW5wdXQgYHRgLiBFeHBsYWluIHdoYXQgaXMgd3JvbmcgYW5kIGdpdmUgdGhlIGNvcnJlY3RlZCB2ZXJzaW9uLiIsImlkZWFsX2Fuc3dlciI6IlRoZSBvcGVyYXRvciBgJiZgIGlzIGZvciBzY2FsYXIgc2hvcnQtY2lyY3VpdCBsb2dpYywgbm90IGVsZW1lbnR3aXNlIHZlY3RvciB0ZXN0aW5nLiBGb3IgYSB2ZWN0b3IgaW5wdXQsIHVzZSBgJmA6IGBwID0gQCh0KSAxLjAuKigodD49MCkmKHQ8MSkpO2AuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBpZGVudGlmeSBgJiZgIGFzIHNjYWxhciBzaG9ydC1jaXJjdWl0IGxvZ2ljLCBub3QgZWxlbWVudHdpc2UiLCJNdXN0IHN0YXRlIHRoYXQgdmVjdG9yIGlucHV0cyByZXF1aXJlIHRoZSBlbGVtZW50d2lzZSBvcGVyYXRvciBgJmAiLCJNdXN0IHByb3ZpZGUgdGhlIGNvcnJlY3RlZCBhbm9ueW1vdXMgZnVuY3Rpb24gdXNpbmcgYCZgIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCBjYW4gY2hvb3NlIHRoZSBjb3JyZWN0IE1BVExBQiBsb2dpY2FsIG9wZXJhdG9yIGZvciBzaWduYWwgdmVjdG9ycywgbm90IGp1c3QgcmVtZW1iZXIgdGhlIHB1bHNlIHNoYXBlLiIsImhpbnQiOiJBc2sgd2hldGhlciB0aGUgb3BlcmF0b3IgdGVzdHMgb25lIHNjYWxhciBjb25kaXRpb24gb3IgZXZlcnkgZW50cnkgb2YgYSB2ZWN0b3IgaW5kZXBlbmRlbnRseS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX1dfQ==" style="display:none;"></div>%%KC_END%%
