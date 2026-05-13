%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6InJlYWN0X2RlbW8iLCJyYXRpb25hbGUiOiJDb21iaW5lZCBzaWduYWwgb3BlcmF0aW9ucyBhcmUgZWFzaWVzdCB0byBsZWFybiBieSB3YXRjaGluZyBhIHNpZ25hbCBzaGlmdCwgc2NhbGUsIGFuZCByZWZsZWN0IGFzIFxcKGFcXCkgYW5kIFxcKGJcXCkgY2hhbmdlLiBUaGUgT0NSIG1lbnRpb25zIGEgZmlndXJlIG9uIHBhZ2UtMDc3LCBidXQgbm8gY3JvcHBlZCBmaWd1cmUgYXNzZXQgaXMgYXZhaWxhYmxlLCBhbmQgZnVsbC1wYWdlIHNjcmVlbnNob3RzIGFyZSBmb3JiaWRkZW4uIEEgUmVhY3QgKyBDYW52YXMgZGVtbyBpcyBtb3JlIHByZWNpc2UgdGhhbiBhIHN0YXRpYyBpbWFnZSBiZWNhdXNlIHRoZSBtYWluIGNvbmZ1c2lvbiBpcyBwYXJhbWV0ZXItZGVwZW5kZW50OiBzdHVkZW50cyBvZnRlbiBtaXN0YWtlIHRoZSBhcHBhcmVudCBzaGlmdCBhcyBcXChiXFwpIGluc3RlYWQgb2YgXFwoYi9hXFwpLiIsImNyYW0iOiJVc2UgdGhlIGRlbW8gdG8gcmVjb2duaXplIHRoZSBleGFtIHBhdHRlcm4gXFwoeChhdC1iKT14KGEodC1iL2EpKVxcKSBxdWlja2x5IGFuZCBjaG9vc2UgdGhlIGNvcnJlY3Qgb3BlcmF0aW9uIG9yZGVyLiIsInN0YW5kYXJkIjoiVXNlIHRoZSBkZW1vIHRvIGNvbm5lY3QgdGhlIGZvcm11bGEgdG8gb25lIHJlcHJlc2VudGF0aXZlIGV4YW1wbGUsIGVzcGVjaWFsbHkgXFwoeCgydC02KT14KDIodC0zKSlcXCkuIiwidG9wX3Njb3JlIjoiVXNlIHRoZSBkZW1vIHRvIHRlc3QgbmVnYXRpdmUgXFwoYVxcKSwgcmV2ZXJzYWwsIGFuZCBob3cgbGFuZG1hcmtzIG1vdmUgdW5kZXIgXFwodD0oXFx0YXUrYikvYVxcKS4ifQ==" style="display:none;"></div>%%KC_END%%
# 1.2-4 Combined Operations

> **Section Objective:** Learn how to combine time shifting, time scaling, and time reversal in expressions like \(x(at-b)\).

---

### CONCEPTS IN THIS SECTION

- Combined time operation
- Two operation orders
- Effective shift \(b/a\)
- Negative scaling and reversal
- Worked example \(x(2t-6)\)

## 1. The Combined Operation x(at-b)

The expression \(x(at-b)\) does not change the shape of the signal algebraically — it changes what time value you feed into the signal. The original signal \(x(t)\) is evaluated at a new time input \(at-b\), which means the time axis is being shifted, scaled, and possibly reversed all at once.

Think of it this way: the signal itself is unchanged, but you are reading it through a distorted time lens.

### KEY EXAM HABIT

The safest exam habit is to rewrite the inside as \(a(t-b/a)\) whenever \(a \neq 0\). This immediately reveals the effective shift.

#### Quick Example

For \(x(2t-6)\), rewrite the inside:

$$2t - 6 = 2(t - 3)$$

The effective shift is **3**, not 6.

## 2. Two valid operation orders

This is the core combined-operation form for this section.

- \(y(t)\): the transformed output signal
- \(x(t)\): the original input signal
- \(a\): the time-scaling factor (compresses if \(|a|>1\), expands if \(|a|<1\), reverses if \(a<0\))
- \(b\): the shift parameter appearing inside the signal argument

**When to use it:** Any exam expression that contains both a multiplication of \(t\) and an addition or subtraction inside the signal argument matches this form.

**Common misuse:** Treating \(b\) as the final visible shift without checking \(b/a\). After factoring, the actual visible shift is \(b/a\), not \(b\).

$$y(t) = x(at - b)$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="interactive_demo" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiTWFrZSBzdHVkZW50cyBpbnN0YW50bHkgc2VlIHdoZXRoZXIgdGhlIHRyYW5zZm9ybWVkIHNpZ25hbCBpcyBkZWxheWVkLCBhZHZhbmNlZCwgY29tcHJlc3NlZCwgZXhwYW5kZWQsIG9yIHJldmVyc2VkLiIsInN0YW5kYXJkIjoiTGV0IHN0dWRlbnRzIGFkanVzdCBcXChhXFwpIGFuZCBcXChiXFwpIGFuZCBjb21wYXJlIHRoZSBvcmlnaW5hbCBhbmQgdHJhbnNmb3JtZWQgc2lnbmFsIHNpZGUgYnkgc2lkZS4iLCJ0b3Bfc2NvcmUiOiJVc2UgbGFuZG1hcmsgdHJhY2tpbmcgdG8gc2hvdyBleGFjdGx5IHdoeSB0aGUgYXBwYXJlbnQgc2hpZnQgaXMgXFwoYi9hXFwpIGFuZCB3aHkgbmVnYXRpdmUgXFwoYVxcKSByZXZlcnNlcyB0aW1lLiJ9" style="display:none;"></div><div class="kc-interactive-demo" data-demo-b64="eyJ0eXBlIjoiaW50ZXJhY3RpdmVfZGVtbyIsInRpdGxlIjoiRXhwbG9yZSB5KHQpID0geChhdC1iKSIsInRlYWNoaW5nX3JvbGUiOiJjb25jZXB0X2FuY2hvciIsIm1vZGVfc3BlY2lmaWNfdmlzdWFsX3VzZSI6eyJjcmFtIjoiTWFrZSBzdHVkZW50cyBpbnN0YW50bHkgc2VlIHdoZXRoZXIgdGhlIHRyYW5zZm9ybWVkIHNpZ25hbCBpcyBkZWxheWVkLCBhZHZhbmNlZCwgY29tcHJlc3NlZCwgZXhwYW5kZWQsIG9yIHJldmVyc2VkLiIsInN0YW5kYXJkIjoiTGV0IHN0dWRlbnRzIGFkanVzdCBcXChhXFwpIGFuZCBcXChiXFwpIGFuZCBjb21wYXJlIHRoZSBvcmlnaW5hbCBhbmQgdHJhbnNmb3JtZWQgc2lnbmFsIHNpZGUgYnkgc2lkZS4iLCJ0b3Bfc2NvcmUiOiJVc2UgbGFuZG1hcmsgdHJhY2tpbmcgdG8gc2hvdyBleGFjdGx5IHdoeSB0aGUgYXBwYXJlbnQgc2hpZnQgaXMgXFwoYi9hXFwpIGFuZCB3aHkgbmVnYXRpdmUgXFwoYVxcKSByZXZlcnNlcyB0aW1lLiJ9LCJkZW1vX3NwZWMiOnsiZnJhbWV3b3JrIjoicmVhY3QiLCJyZW5kZXJpbmciOiJSZWFjdCArIENhbnZhcy4gVHdvIHN0YWNrZWQgcGxvdHMgb24gYSB3aGl0ZSBiYWNrZ3JvdW5kLiBUb3AgcGxvdCBsYWJlbGVkICdPcmlnaW5hbCB4KHQpJyBpbiBuYXZ5LiBCb3R0b20gcGxvdCBsYWJlbGVkICdUcmFuc2Zvcm1lZCB5KHQpPXgoYXQtYiknIGluIG11dGVkIHRlYWwuIiwiYmFzZV9zaWduYWwiOiJBc3ltbWV0cmljIHRyaWFuZ3VsYXIgcHVsc2Ugd2l0aCBrZXkgcG9pbnRzICgtMSwgMCksICgwLCAxKSwgKDIsIDApLiBNYXJrIHRoZSBwZWFrIGF0ICgwLDEpIHdpdGggYSBzbWFsbCBmaWxsZWQgZG90IGxhYmVsZWQgJ3BlYWsnLiIsImNvbnRyb2xzIjpbeyJ0eXBlIjoic2xpZGVyIiwibGFiZWwiOiJhIiwibWluIjotMywibWF4IjozLCJzdGVwIjowLjUsInNuYXBfdmFsdWVzIjpbLTIsLTEsMC41LDEsMl0sImV4Y2x1ZGVzX3plcm8iOnRydWUsImRlZmF1bHQiOjJ9LHsidHlwZSI6InNsaWRlciIsImxhYmVsIjoiYiIsIm1pbiI6LTYsIm1heCI6Niwic3RlcCI6MSwiZGVmYXVsdCI6Nn0seyJ0eXBlIjoiYnV0dG9uIiwibGFiZWwiOiJSZXNldCIsImFjdGlvbiI6InNldCBhPTIsIGI9NiJ9XSwiZHluYW1pY19sYWJlbHMiOlsiRGlzcGxheSBjdXJyZW50IGZvcm11bGE6IFxcKHkodCkgPSB4KGF0IC0gYilcXCkiLCJEaXNwbGF5IHJld3JpdHRlbiBmb3JtOiBcXCh5KHQpID0geFxcIVxcbGVmdChhXFxsZWZ0KHQgLSBcXGRmcmFje2J9e2F9XFxyaWdodClcXHJpZ2h0KVxcKSIsIkRpc3BsYXk6IGVmZmVjdGl2ZSBzaGlmdCBcXCg9IGIvYVxcKSB3aGVuIFxcKGEgXFxuZXEgMFxcKSIsIklmIFxcKGEgPCAwXFwpLCBkaXNwbGF5IGluIG11dGVkIHJlZDogJ25lZ2F0aXZlIGEgaW5jbHVkZXMgdGltZSByZXZlcnNhbCciXSwic3R1ZGVudF90YXNrX3Byb21wdCI6IlNldCBcXChhID0gMlxcKSBhbmQgXFwoYiA9IDZcXCkuIE9ic2VydmUgdGhhdCB0aGUgdHJhbnNmb3JtZWQgc2lnbmFsIGJlaGF2ZXMgbGlrZSBhIGNvbXByZXNzaW9uIGJ5IDIgd2l0aCBhbiBlZmZlY3RpdmUgc2hpZnQgb2YgMywgbm90IDYuIiwid2hhdF90b19ub3RpY2UiOiJMYW5kbWFya3MgbW92ZSBhY2NvcmRpbmcgdG8gdGhlIGVxdWF0aW9uIFxcKGF0IC0gYiA9IFxcdGF1XFwpLCBzbyBhIGZlYXR1cmUgb3JpZ2luYWxseSBhdCBcXCh0ID0gXFx0YXVcXCkgYXBwZWFycyBhdCBcXCh0ID0gKFxcdGF1ICsgYikvYVxcKS4ifX0="></div>%%KC_END%%

## 3. Worked example: x(2t-6)

The textbook gives two equivalent routes to produce \(x(at-b)\) from \(x(t)\).

**Order 1 — Shift first, then scale:**
Delay \(x(t)\) by \(b\) to get \(x(t-b)\), then replace \(t\) with \(at\) to get \(x(at-b)\).

**Order 2 — Scale first, then shift:**
Form \(x(at)\) first, then shift by \(\mathbf{b/a}\) (not by \(b\)) to get \(x(a(t-b/a)) = x(at-b)\).

### KEY EXAM POINT

Both paths produce the same final expression. However, Order 2 makes the effective visible shift \(b/a\) explicit and is usually the cleaner exam route.

> **Quick check:** If your final expression is not exactly \(x(at-b)\), the order or shift amount was wrong.

#### Note on Negative a

If \(a < 0\), the scaling step in either order also includes time reversal — the signal is reflected about \(t = 0\) as part of the operation.

$$x(t-b) \;\longrightarrow\; x(at-b)$$
*This arrow represents the **shift-first route** (Order 1).

1. Start with \(x(t)\).
2. Shift by \(b\): replace \(t\) with \(t - b\) to get \(x(t-b)\).
3. Time-scale: replace \(t\) with \(at\) inside the shifted expression to get \(x(at - b)\).

**When to use it:** When the problem explicitly asks you to shift first.

**Common misuse:** Stopping at \(x(t-b)\) and forgetting that the subsequent replacement \(t \mapsto at\) acts inside the already-shifted expression. The final result must be \(x(at-b)\), not \(x(at) - b\).*

$$x(at) \;\longrightarrow\; x\!\left(a\left(t - \frac{b}{a}\right)\right) = x(at-b)$$
*This arrow represents the **scale-first route** (Order 2).

1. Start with \(x(t)\).
2. Time-scale: replace \(t\) with \(at\) to get \(x(at)\).
3. Shift by \(b/a\): replace \(t\) with \(t - b/a\) to get \(x\!\left(a(t - b/a)\right) = x(at-b)\).

**The effective shift** after factoring is \(b/a\), not \(b\).

**Exam trigger:** Any expression like \(x(2t-6)\), \(x(3t+12)\), or \(x(-2t+4)\) — factor the inside to find the true shift.

**Common misuse:** Using \(b\) as the shift amount after scaling. This gives the wrong graph position.*

## 3. Worked Example: x(2t-6)

Here \(a = 2\) and \(b = 6\).

**Textbook Route (shift first):**
1. Delay \(x(t)\) by 6 to get \(x(t-6)\).
2. Time-compress by factor 2: replace \(t\) with \(2t\) to get \(x(2t-6)\).

**Cleaner Exam Route (scale first):**

Factor the inside expression:

$$2t - 6 = 2(t - 3)$$

So \(x(2t-6) = x(2(t-3))\). This means: compress by factor 2 first, then delay by **3**.

### EXAM TIP

> **The trap is saying the final graph is delayed by 6; after factoring, the visible shift is 3.**

Both routes produce the same signal. The scale-first route makes the effective shift of 3 immediately visible, which is what you need for sketching or identifying the graph.

$$x(2t-6) = x\bigl(2(t-3)\bigr)$$
*This is the key simplification for the worked example.

- \(a = 2\): time compression by factor 2
- \(b = 6\): the raw shift parameter inside the argument
- \(b/a = 6/2 = 3\): the **effective visible shift** after factoring

**When to use it:** Whenever the inside expression can be factored to reveal the true shift — which is almost always on an exam.

**Common misuse:** Reading \(x(2t-6)\) as a delay of 6. The compression factor 2 is present, so the actual delay seen on the graph is 3, not 6.*

### Sketch Checklist: track landmarks, not memory

Use landmark tracking. If a feature of \(f\) was at original time \(\tau\), set the new inside argument equal to \(\tau\) and solve for the new time \(t\).

| Expression | Landmark equation | What happens |
|---|---:|---|
| \(f(t-4)\) | \(t-4=\tau\Rightarrow t=\tau+4\) | shift right by 4 |
| \(f(t/1.5)\) | \(t/1.5=\tau\Rightarrow t=1.5\tau\) | expand by 1.5 |
| \(f(-t)\) | \(-t=\tau\Rightarrow t=-\tau\) | mirror about the vertical axis |
| \(f(2t-4)\) | \(2t-4=\tau\Rightarrow t=\tau/2+2\) | compress by 2, then move landmarks right by 2 |
| \(f(2-t)\) | \(2-t=\tau\Rightarrow t=2-\tau\) | reverse the order of landmarks around \(t=1\) |

#### Exam Trap

For combined transformations, do not rely on memory of "which comes first." Solving the landmark equation is safer and usually faster.

---
**📌 Key Takeaways**
- The combined form \(y(t) = x(at-b)\) applies time scaling, shifting, and (if \(a < 0\)) reversal to the time axis.
- Always factor the inside: \(x(at-b) = x(a(t-b/a))\); the effective visible shift is \(b/a\), not \(b\).
- Example: \(x(2t-6) = x(2(t-3))\) — compression by 2, delay by 3, not by 6.
- When \(a < 0\), the scaling step includes time reversal; the signal is reflected about \(t = 0\).

*Next, you will use these operation rules to read and sketch transformed signals more confidently.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImNvbWJpbmVkX29wZXJhdGlvbl9mb3JtIiwibGFiZWwiOiJSZWNvZ25pemluZyB0aGUgY29tYmluZWQtb3BlcmF0aW9uIGZvcm0iLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGV4cHJlc3Npb24gbWF0Y2hlcyB0aGUgZ2VuZXJhbCBjb21iaW5lZC1vcGVyYXRpb24gZm9ybSBmcm9tIHRoaXMgc2VjdGlvbj8iLCJvcHRpb25zIjpbIkEuIFxcKHgodCkrYS1iXFwpIiwiQi4gXFwoeChhdC1iKVxcKSIsIkMuIFxcKGF4KHQtYilcXCkiLCJELiBcXCh4KHQpLyhhLWIpXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiXFwoeChhdC1iKVxcKSBjaGFuZ2VzIHRoZSB0aW1lIGlucHV0IG9mIHRoZSBzaWduYWwsIGNvbWJpbmluZyB0aW1lIHNjYWxpbmcgYW5kIHRpbWUgc2hpZnRpbmcgaW5zaWRlIHRoZSBhcmd1bWVudC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIGFkZHMgY29uc3RhbnRzIG91dHNpZGUgdGhlIHNpZ25hbCBpbnB1dDsgaXQgaXMgbm90IGEgdGltZS1heGlzIG9wZXJhdGlvbi4iLCJDIjoiVGhpcyBzY2FsZXMgdGhlIGFtcGxpdHVkZSBieSBcXChhXFwpLCBub3QgdGhlIHRpbWUgdmFyaWFibGUgYnkgXFwoYVxcKS4iLCJEIjoiVGhpcyBkaXZpZGVzIHRoZSBzaWduYWwgdmFsdWUsIG5vdCB0aGUgdGltZSBpbnB1dC4ifSwiaGludCI6Ikxvb2sgZm9yIHRoZSBvcGVyYXRpb24gaW5zaWRlIHRoZSBwYXJlbnRoZXNlcyBvZiBcXCh4KFxcY2RvdClcXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoiZWZmZWN0aXZlX3NoaWZ0IiwibGFiZWwiOiJFZmZlY3RpdmUgc2hpZnQgaXMgYi9hIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJSZXdyaXRlIFxcKHgoMnQtNilcXCkgdG8gcmV2ZWFsIHRoZSBlZmZlY3RpdmUgc2hpZnQuIiwib3B0aW9ucyI6WyJBLiBcXCh4KDIodC02KSlcXCkiLCJCLiBcXCh4KDIodC0zKSlcXCkiLCJDLiBcXCh4KHQtMylcXCkiLCJELiBcXCgyeCh0LTYpXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiRmFjdG9yIHRoZSBpbnNpZGU6IFxcKDJ0LTYgPSAyKHQtMylcXCksIHNvIHRoZSBlZmZlY3RpdmUgc2hpZnQgYWZ0ZXIgc2NhbGluZyBpcyAzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlxcKDIodC02KSA9IDJ0LTEyXFwpLCBub3QgXFwoMnQtNlxcKS4iLCJDIjoiVGhpcyBsb3NlcyB0aGUgdGltZS1jb21wcmVzc2lvbiBmYWN0b3IgMi4iLCJEIjoiVGhpcyBjaGFuZ2VzIGFtcGxpdHVkZSBhbmQgZG9lcyBub3QgbWF0Y2ggdGhlIGlucHV0IHRyYW5zZm9ybWF0aW9uLiJ9LCJoaW50IjoiRmFjdG9yIHRoZSBjb2VmZmljaWVudCBvZiBcXCh0XFwpIGZyb20gdGhlIGVudGlyZSBpbnNpZGUgZXhwcmVzc2lvbi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciBcXCh4KDN0LTEyKVxcKSwgd2hhdCBpcyB0aGUgZWZmZWN0aXZlIHNoaWZ0IGFmdGVyIGZhY3RvcmluZz8iLCJvcHRpb25zIjpbIkEuIERlbGF5IGJ5IDEyIiwiQi4gRGVsYXkgYnkgNCIsIkMuIEFkdmFuY2UgYnkgNCIsIkQuIFRpbWUgZXhwYW5zaW9uIGJ5IDEyIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiXFwoM3QtMTIgPSAzKHQtNClcXCksIHNvIHRoZSBlZmZlY3RpdmUgc2hpZnQgaXMgYSBkZWxheSBvZiA0LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgbWlzdGFrZXMgXFwoYlxcKSBmb3IgdGhlIHZpc2libGUgc2hpZnQ7IHRoZSBzaGlmdCBpcyBcXChiL2EgPSAxMi8zID0gNFxcKS4iLCJDIjoiXFwodC00XFwpIGluZGljYXRlcyBkZWxheSwgbm90IGFkdmFuY2UuIiwiRCI6IlRoZSBudW1iZXIgMTIgaXMgbm90IHRoZSB0aW1lLXNjYWxpbmcgZmFjdG9yLiJ9LCJoaW50IjoiVXNlIFxcKHgoYXQtYikgPSB4KGEodC1iL2EpKVxcKS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6Im9wZXJhdGlvbl9vcmRlciIsImxhYmVsIjoiVHdvIHZhbGlkIG9wZXJhdGlvbiBvcmRlcnMiLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBzY2FsZS1maXJzdCBzZXF1ZW5jZSBjb3JyZWN0bHkgcHJvZHVjZXMgXFwoeChhdC1iKVxcKT8iLCJvcHRpb25zIjpbIkEuIEZvcm0gXFwoeChhdClcXCksIHRoZW4gc2hpZnQgYnkgXFwoYi9hXFwpIiwiQi4gRm9ybSBcXCh4KGF0KVxcKSwgdGhlbiBzaGlmdCBieSBcXChiXFwpIiwiQy4gRm9ybSBcXCh4KHQtYilcXCksIHRoZW4gc2hpZnQgYWdhaW4gYnkgXFwoYVxcKSIsIkQuIEZvcm0gXFwoYXgodClcXCksIHRoZW4gc2hpZnQgYnkgXFwoYlxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IkFmdGVyIHNjYWxpbmcgZmlyc3QsIHRoZSBzaGlmdCBtdXN0IGJlIFxcKGIvYVxcKSBiZWNhdXNlIFxcKGF0LWIgPSBhKHQtYi9hKVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJTaGlmdGluZyBieSBcXChiXFwpIGFmdGVyIHNjYWxpbmcgdXN1YWxseSBnaXZlcyB0aGUgd3JvbmcgaW5zaWRlIGV4cHJlc3Npb24uIiwiQyI6IlRoaXMgaXMgbm90IHRoZSB0ZXh0Ym9vaydzIHNjYWxlLWZpcnN0IHJvdXRlIGFuZCBkb2VzIG5vdCBjb3JyZWN0bHkgYWNjb3VudCBmb3Igc2NhbGluZy4iLCJEIjoiXFwoYXgodClcXCkgaXMgYW1wbGl0dWRlIHNjYWxpbmcsIG5vdCB0aW1lIHNjYWxpbmcuIn0sImhpbnQiOiJGYWN0b3IgXFwoYVxcKSBmcm9tIFxcKGF0LWJcXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoibmVnYXRpdmVfYV9yZXZlcnNhbCIsImxhYmVsIjoiTmVnYXRpdmUgc2NhbGluZyBpbmNsdWRlcyB0aW1lIHJldmVyc2FsIiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNF9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hhdCBleHRyYSBvcGVyYXRpb24gb2NjdXJzIHdoZW4gXFwoYSA8IDBcXCkgaW4gXFwoeChhdC1iKVxcKT8iLCJvcHRpb25zIjpbIkEuIEFtcGxpdHVkZSBpbnZlcnNpb24iLCJCLiBUaW1lIHJldmVyc2FsIiwiQy4gVmVydGljYWwgc2hpZnRpbmciLCJELiBObyBleHRyYSBvcGVyYXRpb24iXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJBIG5lZ2F0aXZlIHRpbWUtc2NhbGluZyBmYWN0b3IgcmV2ZXJzZXMgdGhlIHRpbWUgYXhpcywgc28gdGhlIHNpZ25hbCBpcyByZWZsZWN0ZWQgaW4gdGltZSBhcyBwYXJ0IG9mIHRoZSBzY2FsaW5nIG9wZXJhdGlvbi4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJBbXBsaXR1ZGUgaW52ZXJzaW9uIHdvdWxkIG11bHRpcGx5IHRoZSBzaWduYWwgdmFsdWUgYnkgYSBuZWdhdGl2ZSBudW1iZXIsIG5vdCB0aGUgdGltZSB2YXJpYWJsZS4iLCJDIjoiVmVydGljYWwgc2hpZnRpbmcgY2hhbmdlcyBzaWduYWwgdmFsdWUsIG5vdCB0aW1lIGlucHV0LiIsIkQiOiJUaGUgc2lnbiBvZiBcXChhXFwpIG1hdHRlcnM7IG5lZ2F0aXZlIFxcKGFcXCkgY2F1c2VzIHJldmVyc2FsLiJ9LCJoaW50IjoiTmVnYXRpdmUgaW5zaWRlIHRoZSB0aW1lIGFyZ3VtZW50IGZsaXBzIHRoZSB0aW1lIGF4aXMuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoiZGVtb19vYnNlcnZhdGlvbiIsImxhYmVsIjoiSW50ZXJwcmV0aW5nIHRoZSBpbnRlcmFjdGl2ZSBzaWduYWwgdHJhbnNmb3JtYXRpb24iLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSW4gdGhlIGRlbW8sIHNldCBcXChhPTJcXCkgYW5kIFxcKGI9NlxcKS4gQSBmZWF0dXJlIG9yaWdpbmFsbHkgYXQgXFwodD0wXFwpIGFwcGVhcnMgd2hlcmUgaW4gdGhlIHRyYW5zZm9ybWVkIHNpZ25hbD8iLCJvcHRpb25zIjpbIkEuIFxcKHQ9NlxcKSIsIkIuIFxcKHQ9M1xcKSIsIkMuIFxcKHQ9LTNcXCkiLCJELiBcXCh0PTEyXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiQSBmZWF0dXJlIGF0IG9yaWdpbmFsIHRpbWUgXFwoXFx0YXUgPSAwXFwpIGFwcGVhcnMgd2hlcmUgXFwoMnQgLSA2ID0gMFxcKSwgc28gXFwodCA9IDNcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBpcyB0aGUgY29tbW9uIHRyYXAgb2YgdXNpbmcgXFwoYlxcKSBpbnN0ZWFkIG9mIFxcKGIvYVxcKS4iLCJDIjoiVGhlIHNpZ24gaXMgd3Jvbmc7IFxcKDJ0IC0gNiA9IDBcXCkgZ2l2ZXMgXFwodCA9IDNcXCkuIiwiRCI6IlRoaXMgbXVsdGlwbGllcyBpbnN0ZWFkIG9mIHNvbHZpbmcgdGhlIHRpbWUtaW5wdXQgZXF1YXRpb24uIn0sImhpbnQiOiJTb2x2ZSBcXChhdCAtIGIgPSBcXHRhdVxcKSB3aXRoIFxcKFxcdGF1ID0gMFxcKS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoiaW50ZXJhY3RpdmVfZGVtb19zdGF0ZSIsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6ImV4cGxhaW5fY29tbW9uX3RyYXAiLCJsYWJlbCI6IkV4cGxhaW5pbmcgd2h5IHRoZSBiLXNoaWZ0IGFuc3dlciBpcyB3cm9uZyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNl9xMSIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQSBjbGFzc21hdGUgc2F5cyBcXCh4KDJ0LTYpXFwpIGlzIHNpbXBseSBcXCh4KHQpXFwpIGRlbGF5ZWQgYnkgNi4gRXhwbGFpbiBwcmVjaXNlbHkgd2h5IHRoYXQgaXMgd3JvbmcuIiwiaWRlYWxfYW5zd2VyIjoiXFwoeCgydC02KVxcKSBtdXN0IGJlIGZhY3RvcmVkIGFzIFxcKHgoMih0LTMpKVxcKS4gVGhlIGZhY3RvciAyIG1lYW5zIHRpbWUgY29tcHJlc3Npb24gaXMgYWxzbyBwcmVzZW50LCBhbmQgdGhlIGVmZmVjdGl2ZSBzaGlmdCBpcyBcXCg2LzIgPSAzXFwpLCBub3QgNi4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IGZhY3RvciBcXCgydC02XFwpIGFzIFxcKDIodC0zKVxcKSIsIk11c3Qgc3RhdGUgdGhhdCB0aW1lIGNvbXByZXNzaW9uIGJ5IGZhY3RvciAyIGlzIHByZXNlbnQiLCJNdXN0IGlkZW50aWZ5IHRoZSBlZmZlY3RpdmUgc2hpZnQgYXMgMywgbm90IDYiLCJNdXN0IGF2b2lkIGRlc2NyaWJpbmcgaXQgYXMgb25seSBhIGRlbGF5Il0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCB1bmRlcnN0YW5kcyB0aGUgbWFpbiBleGFtIHRyYXAgcmF0aGVyIHRoYW4gb25seSByZWNvZ25pemluZyB0aGUgZm9ybXVsYS4iLCJoaW50IjoiUmV3cml0ZSB0aGUgaW5zaWRlIGluIHRoZSBmb3JtIFxcKGEodCAtIGIvYSlcXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfV19" style="display:none;"></div>%%KC_END%%
