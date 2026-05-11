%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImdlbmVyYXRlZF9pbWFnZSIsInJhdGlvbmFsZSI6IlRoZSBPQ1Igc2VjdGlvbiBoYXMgbm8gdGV4dGJvb2sgZmlndXJlcywgYW5kIHRoZSBhdmFpbGFibGUgd2ViIHNvdXJjZXMgZG8gbm90IHByb3ZpZGUgYSByZWxldmFudCBNQVRMQUIgY29sb24tbm90YXRpb24gb3IgaW5kZXhpbmcgdGVhY2hpbmcgZGlhZ3JhbS4gVGhlIGNvcmUgaWRlYXMgYXJlIHN5bWJvbGljIGFuZCBzdHJ1Y3R1cmFsLCBzbyBMYVRlWCBibG9ja3MgY2FycnkgdGhlIGRlZmluaXRpb25zIGFuZCBmb3JtdWxhcy4gVHdvIGdlbmVyYXRlZCBsZWN0dXJlLW5vdGUgdmlzdWFscyBhcmUganVzdGlmaWVkIG9ubHkgZm9yIGN1c3RvbSB0ZWFjaGluZyBuZWVkczogc2VlaW5nIGNvbG9uIG5vdGF0aW9uIGFzIHN0b3JlZCB2ZWN0b3IgZW50cmllcywgYW5kIGNvcnJlY3RpbmcgdGhlIGNvbW1vbiBmKDEpIGluZGV4aW5nIG1pc3Rha2UuIiwiY3JhbSI6IlVzZSB2aXN1YWxzIHRvIGlkZW50aWZ5IGNvbG9uIG5vdGF0aW9uLCB2ZWN0b3IgZW50cmllcywgYW5kIGluZGV4IHRyYXBzIHF1aWNrbHkuIiwic3RhbmRhcmQiOiJVc2UgdmlzdWFscyB0byBjb25uZWN0IGVhY2ggZm9ybXVsYSB0byBvbmUgcmVwcmVzZW50YXRpdmUgTUFUTEFCIGV4YW1wbGUuIiwidG9wX3Njb3JlIjoiVXNlIHZpc3VhbHMgdG8gZXhwb3NlIHN1YnRsZSBtaXN0YWtlczogdGVybWluYXRpb24gdmFsdWVzIG1heSBiZSBleGNsdWRlZCwgYW5kIGluZGljZXMgYXJlIG5vdCBmdW5jdGlvbiBpbnB1dHMuIn0=" style="display:none;"></div>%%KC_END%%
# B.7-3 Vector Operations

> **Section Objective:** Learn how MATLAB uses vectors to compute many values at once, and how to avoid confusing vector indices with function inputs.

## Concepts In This Section

- colon notation
- vectorized complex roots
- MATLAB indexing
- sampled sinusoid

## 1. Colon notation creates stored vectors

$$\texttt{a:b:c}$$
This is the core MATLAB pattern for creating a row vector of evenly spaced values.

- \(a\) is the **first value** (start)
- \(b\) is the **step size** (increment)
- \(c\) is the **stopping limit** (not guaranteed to appear)

MATLAB keeps adding the step while the next value does not pass \(c\). This means \(c\) itself may be excluded if it falls between steps.

**Representative example:** \(\texttt{0:2:11}\) produces \([0, 2, 4, 6, 8, 10]\). The value 11 is skipped because \(10 + 2 = 12 > 11\).

**Omitting the step:** \(\texttt{0:11}\) defaults to step size 1, producing \([0, 1, 2, \ldots, 11]\).

#### Exam Trigger
Any problem asking for evenly spaced values or a vector grid.

#### Common Misuse
Assuming the termination value \(c\) must always appear in the output vector.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiTWFrZSB0aGUgY29sb24gcGF0dGVybiBhbmQgZXhjbHVkZWQgZW5kcG9pbnQgb2J2aW91cyBhdCBhIGdsYW5jZS4iLCJzdGFuZGFyZCI6IkNvbm5lY3QgXFwoXFx0ZXh0dHR7MDoyOjExfVxcKSB0byB0aGUgc3RvcmVkIHZlY3RvciBlbnRyaWVzIHN0ZXAgYnkgc3RlcC4iLCJ0b3Bfc2NvcmUiOiJFbXBoYXNpemUgd2h5IDExIGlzIGEgc3RvcHBpbmcgbGltaXQsIG5vdCBndWFyYW50ZWVkIG91dHB1dC4ifQ==" style="display:none;"></div>%%KC_END%%
*🎨 The expression \(\texttt{0:2:11}\) produces six entries ending at 10 — the stop value 11 is a limit, not a guaranteed output.*
![Illustration](/generated/gptimage2-1778181824657-8466.png)

## 2. Vectorize the cube roots

$$w_k = e^{j\left(\frac{\pi}{3} + \frac{2\pi k}{3}\right)}, \quad k = 0, 1, 2$$
This formula gives the three unique cube roots of \(-1\).

**Why this formula:** Since \(-1 = e^{j(\pi + 2\pi k)}\), taking the cube root divides the exponent angle by 3, yielding \(e^{j(\pi/3 + 2\pi k/3)}\).

**Symbol meanings:**
- \(w_k\) — one cube root at index \(k\)
- \(j\) — imaginary unit (written as \(\texttt{1j}\) in MATLAB)
- \(k\) — integer vector selecting different angles: \([0, 1, 2]\)

**MATLAB line:**

$$\texttt{k = 0:2;}$$
$$\texttt{w = exp(1j*(pi/3 + 2*pi*k/3))}$$

MATLAB evaluates the expression for all three values of \(k\) simultaneously, producing:
- \(k=0\): \(0.5 + 0.8660i\)
- \(k=1\): \(-1\)
- \(k=2\): \(0.5 - 0.8660i\)

#### Exam Trigger
A formula evaluated for several consecutive integer values — use a colon vector, not a loop.

#### Common Misuse
Writing a loop mentally when one vectorized expression already evaluates all entries at once.

## 3. Index position is not function input

$$\texttt{f(1)} \ne f(t)\big|_{t=1}$$
**This is the most common indexing trap.**

In MATLAB, indexing starts at **1**. So \(\texttt{x(1)}\) means "the first stored element of vector x" — it does **not** mean the mathematical function value at input \(t = 1\).

**Concrete example from OCR:**
If \(\texttt{k = 0:99}\), the stored vector is \([0, 1, 2, 3, 4, \ldots, 99]\).
- \(\texttt{k(1)} = 0\) (first position stores value 0)
- \(\texttt{k(5)} = 4\) (fifth position stores value 4)

**For the roots vector:** \(\texttt{w(5)}\) corresponds to \(k = 4\), not \(k = 5\), because the fifth stored entry was computed with \(k = 4\).

#### Exam Trigger
Any expression like \(\texttt{f(1)}\), \(\texttt{w(5)}\), or \(\texttt{x(98:100)}\) — always ask: is this a storage position or a function input?

#### Common Misuse
Reading MATLAB parentheses as ordinary mathematical function notation.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="trap_exposure" data-visual-use-b64="eyJjcmFtIjoiU3BvdCB0aGUgaW5kZXgtdmVyc3VzLWlucHV0IHRyYXAgaW5zdGFudGx5LiIsInN0YW5kYXJkIjoiVXNlIHRoZSBzaWRlLWJ5LXNpZGUgY29udHJhc3QgdG8gcmVtZW1iZXIgdGhhdCBNQVRMQUIgcG9zaXRpb25zIHN0YXJ0IGF0IDEuIiwidG9wX3Njb3JlIjoiTm90aWNlIHRoYXQgdmVjdG9yIGluZGV4IGFuZCBpbmRlcGVuZGVudCB2YXJpYWJsZSB1c3VhbGx5IGRpZmZlci4ifQ==" style="display:none;"></div>%%KC_END%%
*🎨 \(\texttt{f(1)}\) retrieves the first stored sample — it does not evaluate the function at \(t = 1\).*
![Illustration](/generated/gptimage2-1778181998164-1306.png)

## 4. Build a sampled sinusoid vector

$$\texttt{t = 0:0.2/500:0.2-0.2/500}$$
This MATLAB line creates **500 uniformly spaced time samples** over \(0 \le t < 0.2\).

**Breaking down the three parts:**
- Start: \(0\) — first time value
- Step: \(0.2/500\) — spacing between consecutive samples
- Stop limit: \(0.2 - 0.2/500\) — last included time, stopping just before \(0.2\)

**Why stop before 0.2?** Ending at \(0.2 - 0.2/500\) ensures exactly 500 samples are created. If the stop were set to \(0.2\) exactly, a 501st sample might be included.

**Physical meaning:** For a 10 Hz sinusoid, one period is \(0.1\) seconds. The interval from \(0\) to just under \(0.2\) seconds covers exactly two full cycles.

#### Exam Trigger
Creating a sample grid over a specified interval.

#### Common Misuse
Ending at \(0.2\) and accidentally changing the intended sample count or endpoint behavior.

$$f(t) = \sin\!\left(2\pi \cdot 10t + \frac{\pi}{6}\right)$$
This is the representative sinusoidal signal evaluated at every entry of the time vector \(t\).

**Symbol meanings:**
- \(10\) — frequency in hertz
- \(2\pi \cdot 10\) — angular frequency in radians per second
- \(\pi/6\) — phase shift

**MATLAB evaluation:**

$$\texttt{f = sin(2*pi*10*t + pi/6)}$$

MATLAB applies this element by element across the entire vector \(t\), producing a vector of 500 sampled signal values.

**Quick check:** At \(t = 0\),

$$f(0) = \sin\!\left(\frac{\pi}{6}\right) = 0.5$$

In MATLAB, this first stored value is accessed as \(\texttt{f(1)}\) — the first position in the output vector, corresponding to \(t = 0\), not \(t = 1\).

---
**📌 Key Takeaways**
- \(\texttt{a:b:c}\) creates a row vector from \(a\) in steps of \(b\); the stop value \(c\) is a limit, not guaranteed output.
- \(w_k = e^{j(\pi/3 + 2\pi k/3)}\) for \(k = 0,1,2\) gives all three cube roots of \(-1\) in one vectorized expression.
- \(\texttt{f(1)} \ne f(t)|_{t=1}\): MATLAB index 1 means first stored position, not function input at \(t = 1\).
- \(f(t) = \sin(2\pi \cdot 10t + \pi/6)\) sampled over \(\texttt{t = 0:0.2/500:0.2-0.2/500}\) yields 500 values covering two cycles.

*Next, use the same vector mindset to perform larger MATLAB operations efficiently.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImNvbG9uX25vdGF0aW9uIiwibGFiZWwiOiJNQVRMQUIgY29sb24gbm90YXRpb24iLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJjb2xvbl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hhdCB2ZWN0b3IgZG9lcyBNQVRMQUIgY3JlYXRlIGZyb20gXFwoXFx0ZXh0dHR7MDoyOjExfVxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKFswLCAyLCA0LCA2LCA4LCAxMF1cXCkiLCJCLiBcXChbMCwgMiwgNCwgNiwgOCwgMTAsIDExXVxcKSIsIkMuIFxcKFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTFdXFwpIiwiRC4gXFwoWzIsIDQsIDYsIDgsIDEwXVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6Ik1BVExBQiBzdGFydHMgYXQgMCBhbmQgYWRkcyAyIHVudGlsIHRoZSBuZXh0IHN0ZXAgd291bGQgcGFzcyAxMSwgc28gdGhlIGZpbmFsIGluY2x1ZGVkIHZhbHVlIGlzIDEwLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoZSBzdG9wIHZhbHVlIGlzIGEgbGltaXQsIG5vdCBndWFyYW50ZWVkIHRvIGJlIGluY2x1ZGVkLiIsIkMiOiJUaGlzIHdvdWxkIGJlIFxcKFxcdGV4dHR0ezA6MTF9XFwpLCB3aGVyZSB0aGUgb21pdHRlZCBzdGVwIGRlZmF1bHRzIHRvIDEuIiwiRCI6IlRoZSBzdGFydCB2YWx1ZSAwIGlzIGluY2x1ZGVkLiJ9LCJoaW50IjoiS2VlcCBhZGRpbmcgdGhlIHN0ZXAgc2l6ZSAyIHdpdGhvdXQgcGFzc2luZyB0aGUgc3RvcCB2YWx1ZS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoiZ2VuZXJhdGVkX3N0YXRpY19jb2xvbl92ZWN0b3JfYm94ZXMiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJjb2xvbl9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggTUFUTEFCIGV4cHJlc3Npb24gY3JlYXRlcyBcXChbMTEsXFwgNy42NjY3LFxcIDQuMzMzMyxcXCAxLjAwMDBdXFwpIGFwcHJveGltYXRlbHk/Iiwib3B0aW9ucyI6WyJBLiBcXChcXHRleHR0dHsxMTotMTAvMzowfVxcKSIsIkIuIFxcKFxcdGV4dHR0ezExOjEwLzM6MH1cXCkiLCJDLiBcXChcXHRleHR0dHswOi0xMC8zOjExfVxcKSIsIkQuIFxcKFxcdGV4dHR0ezExOjA6LTEwLzN9XFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGhlIHZlY3RvciBzdGFydHMgYXQgMTEgYW5kIHVzZXMgdGhlIG5lZ2F0aXZlIHN0ZXAgXFwoLTEwLzNcXCksIHN0b3BwaW5nIGJlZm9yZSBpdCB3b3VsZCBwYXNzIDAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiQSBwb3NpdGl2ZSBzdGVwIGNhbm5vdCBtb3ZlIGZyb20gMTEgZG93biB0b3dhcmQgMC4iLCJDIjoiVGhpcyBzdGFydHMgYXQgMCwgbm90IDExLiIsIkQiOiJUaGUgbWlkZGxlIHZhbHVlIGlzIHRoZSBzdGVwIHNpemU7IGEgemVybyBzdGVwIGlzIGludmFsaWQgZm9yIHRoaXMgcHVycG9zZS4ifSwiaGludCI6IlRoZSBmb3JtYXQgaXMgc3RhcnQgOiBzdGVwIDogc3RvcC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InZlY3Rvcml6ZWRfY29tcGxleF9yb290cyIsImxhYmVsIjoiVmVjdG9yaXplZCBjb21wbGV4IHJvb3RzIiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6InJvb3RzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJbiBcXCh3X2sgPSBlXntqKFxccGkvMyArIDJcXHBpIGsvMyl9XFwpLCB3aHkgZG9lcyBNQVRMQUIgdXNlIFxcKFxcdGV4dHR0e2sgPSAwOjJ9XFwpPyIsIm9wdGlvbnMiOlsiQS4gSXQgc3VwcGxpZXMgdGhyZWUgY29uc2VjdXRpdmUgaW50ZWdlciB2YWx1ZXMgdG8gcHJvZHVjZSB0aGUgdGhyZWUgdW5pcXVlIGN1YmUgcm9vdHMuIiwiQi4gSXQgc3VwcGxpZXMgdHdvIHZhbHVlcyBiZWNhdXNlIHRoZSBub3RhdGlvbiBlbmRzIGF0IDIuIiwiQy4gSXQgZm9yY2VzIHRoZSByb290cyB0byBiZSByZWFsIG51bWJlcnMgb25seS4iLCJELiBJdCBtYWtlcyBNQVRMQUIgaWdub3JlIHRoZSBjb21wbGV4IGV4cG9uZW50aWFsLiJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlxcKFxcdGV4dHR0ezA6Mn1cXCkgbWVhbnMgXFwoWzAsIDEsIDJdXFwpLCBnaXZpbmcgdGhyZWUgdmFsdWVzIG9mIFxcKGtcXCkgYW5kIHRoZXJlZm9yZSB0aHJlZSByb290cy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGUgdmVjdG9yIFxcKFxcdGV4dHR0ezA6Mn1cXCkgaW5jbHVkZXMgMCwgMSwgYW5kIDIg4oCUIHRocmVlIGVsZW1lbnRzIHRvdGFsLiIsIkMiOiJUd28gb2YgdGhlIGN1YmUgcm9vdHMgYXJlIGNvbXBsZXguIiwiRCI6Ik1BVExBQiBldmFsdWF0ZXMgdGhlIGNvbXBsZXggZXhwb25lbnRpYWwgdXNpbmcgXFwoXFx0ZXh0dHR7MWp9XFwpLiJ9LCJoaW50IjoiUmVtZW1iZXIgdGhlIG9taXR0ZWQgc3RlcCBzaXplIGRlZmF1bHRzIHRvIDEuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoibWF0bGFiX2luZGV4aW5nIiwibGFiZWwiOiJNQVRMQUIgaW5kZXhpbmcgdmVyc3VzIGZ1bmN0aW9uIG5vdGF0aW9uIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoiaW5kZXhfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIFxcKFxcdGV4dHR0e2sgPSAwOjk5fVxcKSwgd2hhdCBpcyBcXChcXHRleHR0dHtrKDUpfVxcKT8iLCJvcHRpb25zIjpbIkEuIDQiLCJCLiA1IiwiQy4gMCIsIkQuIDk5Il0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiTUFUTEFCIGluZGljZXMgY291bnQgc3RvcmFnZSBwb3NpdGlvbnMgc3RhcnRpbmcgYXQgMS4gVGhlIGZpZnRoIHN0b3JlZCB2YWx1ZSBpbiBcXChbMCwgMSwgMiwgMywgNCwgXFxsZG90c11cXCkgaXMgNC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGF0IGNvbmZ1c2VzIHRoZSBpbmRleCBwb3NpdGlvbiB3aXRoIHRoZSBzdG9yZWQgdmFsdWUuIiwiQyI6IjAgaXMgdGhlIGZpcnN0IHN0b3JlZCB2YWx1ZSwgc28gaXQgaXMgXFwoXFx0ZXh0dHR7aygxKX1cXCkuIiwiRCI6Ijk5IGlzIHRoZSBsYXN0IHN0b3JlZCB2YWx1ZSwgbm90IHRoZSBmaWZ0aC4ifSwiaGludCI6IldyaXRlIG91dCB0aGUgZmlyc3QgZml2ZSBlbnRyaWVzIGFuZCBjb3VudCBwb3NpdGlvbnMuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImdlbmVyYXRlZF9zdGF0aWNfaW5kZXhfcG9zaXRpb25fYm94ZXMiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJpbmRleF9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBjbGFzc21hdGUgc2F5cyBcXChcXHRleHR0dHtmKDEpfVxcKSBpbiBNQVRMQUIgYWx3YXlzIG1lYW5zIHRoZSBtYXRoZW1hdGljYWwgdmFsdWUgXFwoZih0KVxcKSBhdCBcXCh0ID0gMVxcKS4gV2hhdCBpcyB0aGUgYmVzdCBjb3JyZWN0aW9uPyIsIm9wdGlvbnMiOlsiQS4gXFwoXFx0ZXh0dHR7ZigxKX1cXCkgbWVhbnMgdGhlIGZpcnN0IHN0b3JlZCBlbGVtZW50IG9mIHZlY3RvciBcXChmXFwpLCBub3QgbmVjZXNzYXJpbHkgdGhlIHZhbHVlIGF0IFxcKHQgPSAxXFwpLiIsIkIuIFxcKFxcdGV4dHR0e2YoMSl9XFwpIG1lYW5zIHRoZSBmaW5hbCBzdG9yZWQgZWxlbWVudCBvZiB2ZWN0b3IgXFwoZlxcKS4iLCJDLiBcXChcXHRleHR0dHtmKDEpfVxcKSBpcyBpbGxlZ2FsIE1BVExBQiBzeW50YXguIiwiRC4gXFwoXFx0ZXh0dHR7ZigxKX1cXCkgbWVhbnMgdGhlIGZpcnN0IGRlcml2YXRpdmUgb2YgXFwoZlxcKS4iXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJJbiBNQVRMQUIsIHBhcmVudGhlc2VzIGFmdGVyIGEgdmVjdG9yIG5hbWUgYWNjZXNzIHN0b3JlZCBwb3NpdGlvbnMuIFRoZXkgZG8gbm90IGF1dG9tYXRpY2FsbHkgcmVwcmVzZW50IG1hdGhlbWF0aWNhbCBmdW5jdGlvbiBpbnB1dHMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiSW5kZXggMSByZWZlcnMgdG8gdGhlIGZpcnN0IGVsZW1lbnQsIG5vdCB0aGUgZmluYWwgZWxlbWVudC4iLCJDIjoiXFwoXFx0ZXh0dHR7ZigxKX1cXCkgaXMgbGVnYWwgaWYgXFwoZlxcKSBoYXMgYXQgbGVhc3Qgb25lIGVsZW1lbnQuIiwiRCI6Ik1BVExBQiBpbmRleGluZyBpcyB1bnJlbGF0ZWQgdG8gZGVyaXZhdGl2ZSBub3RhdGlvbiBoZXJlLiJ9LCJoaW50IjoiQXNrIHdoZXRoZXIgdGhlIHBhcmVudGhlc2VzIGFyZSBiZWluZyB1c2VkIGJ5IE1BVExBQiBvciBieSBoYW5kd3JpdHRlbiBtYXRoIG5vdGF0aW9uLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJ3cm9uZ192c19yaWdodF92aXN1YWxfY2hlY2siLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InNhbXBsZWRfc2ludXNvaWQiLCJsYWJlbCI6IlZlY3RvciByZXByZXNlbnRhdGlvbiBvZiBhIHNpbnVzb2lkIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJzaW51c29pZF9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIFxcKGYodCkgPSBcXHNpbigyXFxwaSBcXGNkb3QgMTB0ICsgXFxwaS82KVxcKSwgd2hhdCBpcyB0aGUgZnJlcXVlbmN5PyIsIm9wdGlvbnMiOlsiQS4gMTAgSHoiLCJCLiBcXCgyXFxwaVxcKSBIeiIsIkMuIFxcKFxccGkvNlxcKSBIeiIsIkQuIDUwMCBIeiJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlRoZSBzdGFuZGFyZCBzaW51c29pZCBmb3JtIGlzIFxcKFxcc2luKDJcXHBpIGYgdCArIFxccGhpKVxcKSwgc28gdGhlIGZyZXF1ZW5jeSBpcyAxMCBIei4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJcXCgyXFxwaVxcKSBjb252ZXJ0cyBjeWNsZXMgdG8gcmFkaWFuczsgaXQgaXMgbm90IHRoZSBmcmVxdWVuY3kgaGVyZS4iLCJDIjoiXFwoXFxwaS82XFwpIGlzIHRoZSBwaGFzZSBzaGlmdC4iLCJEIjoiNTAwIGlzIHRoZSBudW1iZXIgb2Ygc2FtcGxlIHBvaW50cyBpbiB0aGUgdGltZSB2ZWN0b3IsIG5vdCB0aGUgc2ludXNvaWQgZnJlcXVlbmN5LiJ9LCJoaW50IjoiTWF0Y2ggdGhlIGZvcm11bGEgdG8gXFwoXFxzaW4oMlxccGkgZiB0ICsgXFxwaGkpXFwpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJzaW51c29pZF9xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiV2h5IGRvZXMgdGhlIGxpbmUgXFwoXFx0ZXh0dHR7dCA9IDA6MC4yLzUwMDowLjItMC4yLzUwMH1cXCkgc3RvcCBhdCBcXCgwLjIgLSAwLjIvNTAwXFwpIGluc3RlYWQgb2YgZXhhY3RseSBcXCgwLjJcXCk/IiwiaWRlYWxfYW5zd2VyIjoiSXQgY3JlYXRlcyA1MDAgdW5pZm9ybWx5IHNwYWNlZCBzYW1wbGVzIG92ZXIgXFwoMCBcXGxlIHQgPCAwLjJcXCkuIFN0b3BwaW5nIG9uZSBzdGVwIGJlZm9yZSAwLjIgYXZvaWRzIGluY2x1ZGluZyB0aGUgZW5kcG9pbnQgYXMgYW4gZXh0cmEgc2FtcGxlIGFuZCBrZWVwcyB0aGUgaW50ZW5kZWQgc2FtcGxlIGNvdW50LiIsImdyYWRpbmdfcnVicmljIjpbIk11c3Qgc3RhdGUgdGhhdCB0aGUgc2FtcGxlcyBjb3ZlciBcXCgwIFxcbGUgdCA8IDAuMlxcKSIsIk11c3QgaWRlbnRpZnkgXFwoMC4yLzUwMFxcKSBhcyB0aGUgc2FtcGxlIHNwYWNpbmciLCJNdXN0IGV4cGxhaW4gdGhhdCBzdG9wcGluZyBiZWZvcmUgMC4yIGhlbHBzIHByZXNlcnZlIHRoZSBpbnRlbmRlZCA1MDAgc2FtcGxlcyJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQgdW5kZXJzdGFuZHMgdGhlIHRpbWUgdmVjdG9yIGFzIGEgc2FtcGxlZCBncmlkLCBub3QganVzdCBhIHN0cmluZyBvZiBNQVRMQUIgc3ludGF4LiIsImhpbnQiOiJUaGluayBhYm91dCB3aGV0aGVyIGJvdGggZW5kcG9pbnRzIHNob3VsZCBiZSBpbmNsdWRlZCB3aGVuIHNwYWNpbmcgaXMgZml4ZWQuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfV19" style="display:none;"></div>%%KC_END%%
