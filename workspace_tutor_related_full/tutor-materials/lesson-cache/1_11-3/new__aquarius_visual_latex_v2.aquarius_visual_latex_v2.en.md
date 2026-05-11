%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJUaGlzIHNlY3Rpb24gaXMgYWJvdXQgaG93IGNoYW5naW5nIHRoZSBpbmRlcGVuZGVudCB2YXJpYWJsZSBjaGFuZ2VzIGEgc2lnbmFsLiBUaGUgdGV4dGJvb2sgZmlndXJlcyBhcmUgZGlyZWN0bHkgcmVsZXZhbnQgYW5kIHNob3VsZCBiZSB1c2VkIGJlY2F1c2UgdGhleSBzaG93IHRoZSBleGFjdCBNQVRMQUIgb3V0cHV0cyBzdHVkZW50cyBhcmUgZXhwZWN0ZWQgdG8gcmVjb2duaXplLiBBbiBpbnRlcmFjdGl2ZSBSZWFjdCArIENhbnZhcyBkZW1vIGlzIGFsc28gbmVlZGVkIGJlY2F1c2Ugc3R1ZGVudHMgbGVhcm4gdGltZSBzY2FsaW5nLCBzaGlmdGluZywgYW5kIHJlZmxlY3Rpb24gZmFzdGVzdCBieSBjaGFuZ2luZyBhIGFuZCBiIGFuZCBzZWVpbmcgdGhlIHdhdmVmb3JtIG1vdmUsIGNvbXByZXNzLCBvciBmbGlwLiIsImNyYW0iOiJVc2UgdmlzdWFscyB0byBpZGVudGlmeSB0aGUgZXhhbSBwYXR0ZXJuIHF1aWNrbHk6IGEgY29udHJvbHMgY29tcHJlc3Npb24vcmVmbGVjdGlvbiwgYiBhZmZlY3RzIHRoZSBzaGlmdCB0aHJvdWdoIHNvbHZpbmcgYXQrYj0wLiIsInN0YW5kYXJkIjoiVXNlIHRoZSBkZW1vIGFuZCB0ZXh0Ym9vayBwbG90cyB0byBjb25uZWN0IGVhY2ggZm9ybXVsYSB0byBvbmUgcmVwcmVzZW50YXRpdmUgZXhhbXBsZSwgZXNwZWNpYWxseSBnKDJ0KzEpLiIsInRvcF9zY29yZSI6IlVzZSB2aXN1YWxzIHRvIGV4cG9zZSB0aGUgdHJhcCB0aGF0IGI+MCBkb2VzIG5vdCBhbHdheXMgbWVhbiBhIHNpbXBsZSByaWdodCBzaGlmdDsgdGhlIGFjdHVhbCBmZWF0dXJlIGxvY2F0aW9uIGNvbWVzIGZyb20gc29sdmluZyB0aGUgaW5wdXQgYXJndW1lbnQuIn0=" style="display:none;"></div>%%KC_END%%
# Visualizing Operations on the Independent Variable

> **Section Objective:** Learn how changing the input of a signal, such as \(g(2t+1)\) or \(g(-t+1)\), changes its plotted waveform.

---

## Concepts In This Section

- causal signal \(g(t)\)
- time scaling
- time shifting
- time reversal
- turn-on location
- superposition of transformed signals

## 1. The base signal: g(t)

This is the signal being transformed throughout this section. The unit step \(u(t)\) makes the signal **causal**: it acts like a switch that is zero before it turns on, so the waveform is zero for \(t < 0\).

The factor \(e^{-t}\) controls exponential decay, and \(\cos(2\pi t)\) controls oscillation. Together they produce a damped oscillating waveform.

**Minimal example:** Because \(u(t)\) is present, \(g(t)\) turns on when its input equals 0 — that is, at \(t = 0\).

#### EXAM NOTE
When you see \(g(\text{something})\), inspect the something first; that input controls where the visible waveform begins.

$$g(t) = f(t)u(t) = e^{-t}\cos(2\pi t)\,u(t)$$

## 2. Scaling and shifting through the input

Writing \(x(t) = g(at + b)\) does not change the internal shape of \(g\). Instead, it changes the **time axis feeding into** \(g\).

| Condition | Effect |
|-----------|--------|
| \(|a| > 1\) | waveform **compressed** in time |
| \(0 < |a| < 1\) | waveform **stretched** in time |
| \(a < 0\) | waveform **reflected** about \(t = 0\) |

The constant \(b\) contributes to shifting, but **do not guess the shift from the sign of \(b\) alone**.

**Representative example — \(g(2t+1)\):** Here \(a = 2\), so the waveform is compressed by a factor of 2. The \(+1\) shifts the turn-on location **left**, found by solving the input equation \(2t + 1 = 0\).

#### COMMON MISTAKE
Saying "+1 means right shift" without solving the input equation. Always solve \(at + b = 0\) to find the actual turn-on.

$$x(t) = g(at + b)$$

## 3. Adding transformed signals

This is the fastest way to locate where a causal transformed signal **turns on**. Here \(a\) and \(b\) are the constants inside the input argument.

**When to use it:** Whenever the original signal \(g\) turns on when its own input is 0 — which is the case for any causal signal containing \(u(\cdot)\).

**Section example in one step:** For \(g(2t+1)\), solve \(2t + 1 = 0\), giving \(t = -0.5\). The waveform turns on at \(t = -0.5\).

#### EXAM TRIGGER
Any signal of the form \(g(at+b)\) with causal or unit-step behavior.

#### COMMON MISTAKE
Treating \(b\) alone as the shift amount. The actual turn-on is \(t = -b/a\), not \(t = -b\).

$$at + b = 0 \quad\Rightarrow\quad t = -\frac{b}{a}$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="interactive_demo" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiRHJhZyBhIGFuZCBiIHVudGlsIHlvdSBjYW4gaW5zdGFudGx5IHJlY29nbml6ZSBjb21wcmVzc2lvbiwgcmVmbGVjdGlvbiwgYW5kIHR1cm4tb24gbW92ZW1lbnQuIiwic3RhbmRhcmQiOiJVc2UgdGhlIGRlZmF1bHQgc2V0dGluZyBhPTIsIGI9MSBmaXJzdCwgdGhlbiBjb21wYXJlIHdpdGggYT0tMSwgYj0xLiIsInRvcF9zY29yZSI6IlByZWRpY3QgdGhlIHR1cm4tb24gbG9jYXRpb24gYmVmb3JlIHJldmVhbGluZyB0aGUgcGxvdHRlZCByZXN1bHQuIn0=" style="display:none;"></div><div class="kc-interactive-demo" data-demo-b64="eyJ0eXBlIjoiaW50ZXJhY3RpdmVfZGVtbyIsInRpdGxlIjoiRXhwbG9yZSBnKGF0K2IpIiwidGVhY2hpbmdfcm9sZSI6ImNvbmNlcHRfYW5jaG9yIiwibW9kZV9zcGVjaWZpY192aXN1YWxfdXNlIjp7ImNyYW0iOiJEcmFnIGEgYW5kIGIgdW50aWwgeW91IGNhbiBpbnN0YW50bHkgcmVjb2duaXplIGNvbXByZXNzaW9uLCByZWZsZWN0aW9uLCBhbmQgdHVybi1vbiBtb3ZlbWVudC4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgZGVmYXVsdCBzZXR0aW5nIGE9MiwgYj0xIGZpcnN0LCB0aGVuIGNvbXBhcmUgd2l0aCBhPS0xLCBiPTEuIiwidG9wX3Njb3JlIjoiUHJlZGljdCB0aGUgdHVybi1vbiBsb2NhdGlvbiBiZWZvcmUgcmV2ZWFsaW5nIHRoZSBwbG90dGVkIHJlc3VsdC4ifSwic3BlYyI6eyJmcmFtZXdvcmsiOiJSZWFjdCArIENhbnZhcyIsIm1vZGVsX3NpZ25hbCI6ImcocykgPSBlXnstc30gKiBjb3MoMipwaSpzKSAqIHUocyksIHdoZXJlIHUocyk9MCBmb3IgczwwLCB1KHMpPTEgZm9yIHM+PTAiLCJwbG90cyI6W3sibGFiZWwiOiJnKHQpIiwic3R5bGUiOiJsaWdodCBncmF5IHJlZmVyZW5jZSBjdXJ2ZSJ9LHsibGFiZWwiOiJnKGF0K2IpIiwic3R5bGUiOiJuYXZ5IHRyYW5zZm9ybWVkIGN1cnZlIn1dLCJzbGlkZXJzIjpbeyJwYXJhbSI6ImEiLCJyYW5nZSI6Wy0zLDNdLCJleGNsdWRlIjowLCJkZWZhdWx0IjoyfSx7InBhcmFtIjoiYiIsInJhbmdlIjpbLTMsM10sImRlZmF1bHQiOjF9XSwicHJlc2V0X2J1dHRvbnMiOlsiZygydCsxKSIsImcoLXQrMSkiLCJnKDAuNXQtMSkiXSwibGl2ZV9kaXNwbGF5Ijp7ImVxdWF0aW9uIjoiYXQgKyBiID0gMCIsImNvbXB1dGVkX3R1cm5fb24iOiJ0ID0gLWIvYSJ9LCJheGVzIjp7InhfbGFiZWwiOiJ0IiwieF9yYW5nZSI6Wy0zLDNdLCJiYWNrZ3JvdW5kIjoid2hpdGUifSwibWFya2VycyI6eyJ0dXJuX29uX21hcmtlciI6Im11dGVkIHJlZCB2ZXJ0aWNhbCBsaW5lIGF0IHQgPSAtYi9hIn0sIm5vdGVfYmVsb3dfZGVtbyI6IlByZWRpY3QgdGhlIHR1cm4tb24gYmVmb3JlIGxvb2tpbmcgYXQgdGhlIGN1cnZlLiJ9fQ=="></div>%%KC_END%%

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="example_support" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoZSBmaWd1cmUgdG8gbWVtb3JpemUgdGhlIHF1aWNrIGNoZWNrOiBnKDJ0KzEpIHR1cm5zIG9uIGF0IHQ9LTAuNS4iLCJzdGFuZGFyZCI6IlVzZSBpdCBhcyB0aGUgcmVwcmVzZW50YXRpdmUgd29ya2VkIGV4YW1wbGUgY29ubmVjdGluZyB0aGUgZm9ybXVsYSB0byB0aGUgTUFUTEFCIHBsb3QuIiwidG9wX3Njb3JlIjoiVXNlIGl0IHRvIHZlcmlmeSB0aGF0IGNvbXByZXNzaW9uIGFuZCBzaGlmdGluZyBhcmUgYm90aCB2aXNpYmxlLCBub3QganVzdCBzdGF0ZWQgYWxnZWJyYWljYWxseS4ifQ==" style="display:none;"></div>%%KC_END%%
![Fig. 1.51](/figures/page-130-fig__1_51-1.png)
*Figure 1.51 shows g(2t+1), a compressed and left-shifted version of the causal signal g(t).*
<div class="lesson-figure-description">The plot has a horizontal axis \(t\) ranging from \(-2\) to \(2\) and a vertical axis labeled \(g(2t+1)\). The waveform is zero for \(t &lt; -0.5\), then begins a damped oscillation starting near \(t = -0.5\) and decaying toward zero as \(t\) increases. This confirms the prediction from solving \(2t + 1 = 0\): the turn-on occurs exactly at \(t = -0.5\), and the waveform is visibly compressed compared to the original \(g(t)\).</div>

## 3. Adding transformed signals

\(h(t)\) is formed by **superposition**: evaluate each transformed copy of \(g\) at the same \(t\), then add their values.

**Term 1 — \(g(2t+1)\):** Compressed by factor 2, turns on at \(t = -0.5\) (solve \(2t+1=0\)).

**Term 2 — \(g(-t+1)\):** The coefficient of \(t\) is negative, so this term is **reflected**. Solve \(-t+1=0\) to find the turn-on at \(t = 1\).

#### EXAM NOTE
For sums, do not try to transform the final plot all at once. Analyze each term separately, then add.

#### COMMON MISTAKE
Combining the two input arguments into one imaginary single transformation. The two terms \(g(2t+1)\) and \(g(-t+1)\) cannot be merged into a single \(g(\text{combined input})\).

$$h(t) = g(2t+1) + g(-t+1)$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="example_support" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoZSBwbG90IHRvIHJlY29nbml6ZSB0aGF0IHN1bXMgb2YgdHJhbnNmb3JtZWQgc2lnbmFscyBhcmUgZWFzaWVyIHRvIHBsb3Qgd2l0aCBNQVRMQUIgdGhhbiBieSBoYW5kLiIsInN0YW5kYXJkIjoiVXNlIGl0IHRvIHNlZSBob3cgdHdvIHRyYW5zZm9ybWVkIGNvcGllcyBjb21iaW5lIHBvaW50LWJ5LXBvaW50IGludG8gaCh0KS4iLCJ0b3Bfc2NvcmUiOiJVc2UgaXQgdG8gaWRlbnRpZnkgd2hlcmUganVtcHMgYW5kIHBlYWtzIGNvbWUgZnJvbSBieSB0cmFjaW5nIGVhY2ggdGVybSdzIHR1cm4tb24gYmVoYXZpb3IuIn0=" style="display:none;"></div>%%KC_END%%
![Figure 1.53](/figures/page-131-figure_1_53-1.png)
*Figure 1.53 shows h(t) = g(2t+1) + g(-t+1), the point-by-point sum of two transformed signals.*
<div class="lesson-figure-description">The plot shows \(h(t)\) versus \(t\) over \(-2 \leq t \leq 2\). The waveform combines a compressed left-shifted copy \(g(2t+1)\) and a reflected right-shifted copy \(g(-t+1)\), producing noticeable activity near \(t = -0.5\) (where the first term turns on) and a prominent peak near \(t = 1\) (where the second term turns on). Students should trace each term's contribution separately to understand why features appear at those specific locations.</div>

---
**📌 Key Takeaways**
- Base signal: \(g(t) = e^{-t}\cos(2\pi t)\,u(t)\) — causal, decaying oscillation that is zero before its turn-on.
- Transformed signal \(x(t) = g(at+b)\): \(|a|\) controls time scale (compression or stretch), \(a < 0\) reflects.
- Turn-on rule: solve \(at + b = 0\) to get \(t = -b/a\); never guess the shift from \(b\) alone.
- Superposition \(h(t) = g(2t+1) + g(-t+1)\): analyze each term separately, then add point-by-point.

*Next, use these visual rules whenever MATLAB plots transformed signals or when you sketch signal operations by hand.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImJhc2VfY2F1c2FsX3NpZ25hbCIsImxhYmVsIjoiQ2F1c2FsIGJhc2Ugc2lnbmFsIGcodCkiLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJbiB0aGlzIHNlY3Rpb24sIHdoeSBkb2VzIFxcKGcodCkgPSBlXnstdH1cXGNvcygyXFxwaSB0KVxcLHUodClcXCkgdHVybiBvbiBvbmx5IGF0IGFuZCBhZnRlciBcXCh0ID0gMFxcKT8iLCJvcHRpb25zIjpbIkEuIEJlY2F1c2UgXFwoZV57LXR9XFwpIGlzIHplcm8gZm9yIFxcKHQgPCAwXFwpIiwiQi4gQmVjYXVzZSBcXChcXGNvcygyXFxwaSB0KVxcKSBpcyB6ZXJvIGZvciBcXCh0IDwgMFxcKSIsIkMuIEJlY2F1c2UgXFwodSh0KVxcKSBhY3RzIGxpa2UgYSBzd2l0Y2ggdGhhdCBpcyB6ZXJvIGJlZm9yZSBcXCh0ID0gMFxcKSIsIkQuIEJlY2F1c2UgTUFUTEFCIGNhbm5vdCBwbG90IG5lZ2F0aXZlIHRpbWUgdmFsdWVzIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiVGhlIHVuaXQgc3RlcCBcXCh1KHQpXFwpIG1ha2VzIHRoZSBzaWduYWwgY2F1c2FsIGJ5IHR1cm5pbmcgaXQgb2ZmIGJlZm9yZSBcXCh0ID0gMFxcKS4gVGhlIG90aGVyIGZhY3RvcnMgYXJlIG5vbnplcm8gZm9yIG5lZ2F0aXZlIFxcKHRcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiXFwoZV57LXR9XFwpIGlzIG5vdCB6ZXJvIGZvciBuZWdhdGl2ZSBcXCh0XFwpOyBpdCBhY3R1YWxseSBncm93cyBhcyBcXCh0XFwpIGJlY29tZXMgbW9yZSBuZWdhdGl2ZS4iLCJCIjoiXFwoXFxjb3MoMlxccGkgdClcXCkgb3NjaWxsYXRlcyBmb3IgYm90aCBwb3NpdGl2ZSBhbmQgbmVnYXRpdmUgXFwodFxcKS4iLCJEIjoiTUFUTEFCIGNhbiBwbG90IG5lZ2F0aXZlIFxcKHRcXCkgdmFsdWVzOyB0aGUgemVybyByZWdpb24gY29tZXMgZnJvbSBcXCh1KHQpXFwpLCBub3QgYSBzb2Z0d2FyZSBsaW1pdGF0aW9uLiJ9LCJoaW50IjoiTG9vayBmb3IgdGhlIGZhY3RvciB0aGF0IGJlaGF2ZXMgbGlrZSBhbiBvbi9vZmYgc3dpdGNoLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6ImlucHV0X3RyYW5zZm9ybWF0aW9uIiwibGFiZWwiOiJJbnRlcnByZXRpbmcgZyhhdCtiKSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIFxcKHgodCkgPSBnKDJ0KzEpXFwpLCB3aGljaCBkZXNjcmlwdGlvbiBpcyBtb3N0IGFjY3VyYXRlPyIsIm9wdGlvbnMiOlsiQS4gVGhlIHdhdmVmb3JtIGlzIHN0cmV0Y2hlZCBieSAyIGFuZCBzaGlmdGVkIHJpZ2h0IiwiQi4gVGhlIHdhdmVmb3JtIGlzIGNvbXByZXNzZWQgYnkgMiBhbmQgaXRzIHR1cm4tb24gbW92ZXMgdG8gXFwodCA9IC0wLjVcXCkiLCJDLiBUaGUgd2F2ZWZvcm0gaXMgcmVmbGVjdGVkIGFuZCBzaGlmdGVkIGxlZnQiLCJELiBUaGUgd2F2ZWZvcm0gaXMgdW5jaGFuZ2VkIGJlY2F1c2Ugb25seSB0aGUgaW5wdXQgdmFyaWFibGUgY2hhbmdlZCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBjb2VmZmljaWVudCBcXChhID0gMlxcKSBjb21wcmVzc2VzIHRoZSB3YXZlZm9ybSAoc2luY2UgXFwofGF8ID4gMVxcKSksIGFuZCBzb2x2aW5nIFxcKDJ0ICsgMSA9IDBcXCkgZ2l2ZXMgdGhlIHR1cm4tb24gYXQgXFwodCA9IC0wLjVcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiXFwofGF8ID4gMVxcKSBjb21wcmVzc2VzLCBub3Qgc3RyZXRjaGVzLCBhbmQgdGhlIHR1cm4tb24gaXMgdG8gdGhlIGxlZnQgb2YgemVybywgbm90IHRoZSByaWdodC4iLCJDIjoiUmVmbGVjdGlvbiByZXF1aXJlcyBhIG5lZ2F0aXZlIGNvZWZmaWNpZW50IG9mIFxcKHRcXCk7IGhlcmUgXFwoYSA9IDIgPiAwXFwpLiIsIkQiOiJDaGFuZ2luZyB0aGUgaW5wdXQgdmFyaWFibGUgY2hhbmdlcyB0aGUgcGxvdHRlZCB3YXZlZm9ybSDigJQgdGhhdCBpcyB0aGUgZW50aXJlIHBvaW50IG9mIHRoaXMgc2VjdGlvbi4ifSwiaGludCI6IkNoZWNrIHRoZSBzaWduIGFuZCBzaXplIG9mIFxcKGFcXCksIHRoZW4gc29sdmUgdGhlIGlucHV0IGVxdWFsIHRvIHplcm8uIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImJvb2tfZmlndXJlX3JlYWRpbmciLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgc3R1ZGVudCBzYXlzLCAnXFwoZygydCsxKVxcKSBzaGlmdHMgcmlnaHQgYmVjYXVzZSBvZiB0aGUgXFwoKzFcXCkuJyBXaGF0IGlzIHRoZSBiZXN0IGNvcnJlY3Rpb24/Iiwib3B0aW9ucyI6WyJBLiBDb3JyZWN0OyBldmVyeSBcXCgrYlxcKSBzaGlmdHMgcmlnaHQiLCJCLiBJbmNvcnJlY3Q7IGZpcnN0IHNvbHZlIFxcKDJ0KzE9MFxcKSwgd2hpY2ggZ2l2ZXMgYSBsZWZ0IHR1cm4tb24gYXQgXFwodD0tMC41XFwpIiwiQy4gSW5jb3JyZWN0OyBcXCgrMVxcKSBhbHdheXMgY2F1c2VzIHJlZmxlY3Rpb24iLCJELiBDb3JyZWN0IG9ubHkgaWYgdGhlIGdyYXBoIGlzIG1hZGUgaW4gTUFUTEFCIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIHNhZmUgbWV0aG9kIGlzIHRvIHNvbHZlIHRoZSBpbnB1dCBhcmd1bWVudC4gSGVyZSB0aGUgZmVhdHVyZSBvY2N1cnMgd2hlbiBcXCgydCsxPTBcXCksIGdpdmluZyBcXCh0ID0gLTAuNVxcKSwgd2hpY2ggaXMgYSBsZWZ0IHNoaWZ0LCBub3QgYSByaWdodCBzaGlmdC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGUgc2lnbiBvZiBcXChiXFwpIGFsb25lIGlzIG5vdCBlbm91Z2ggd2hlbiBcXChhXFwpIGlzIGFsc28gcHJlc2VudDsgeW91IG11c3Qgc29sdmUgXFwoYXQrYj0wXFwpLiIsIkMiOiJSZWZsZWN0aW9uIGRlcGVuZHMgb24gdGhlIHNpZ24gb2YgXFwoYVxcKSwgbm90IG9uIHRoZSBjb25zdGFudCBcXChiXFwpLiIsIkQiOiJUaGUgdHJhbnNmb3JtYXRpb24gcnVsZSBpcyBtYXRoZW1hdGljYWwgYW5kIGFwcGxpZXMgcmVnYXJkbGVzcyBvZiB0aGUgcGxvdHRpbmcgdG9vbC4ifSwiaGludCI6IkRvIG5vdCBndWVzcyBmcm9tIFxcKCsxXFwpOyBzb2x2ZSB0aGUgaW5wdXQgZXF1YXRpb24gXFwoYXQrYj0wXFwpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoidHVybl9vbl9sb2NhdGlvbiIsImxhYmVsIjoiRmluZGluZyB0aGUgdHVybi1vbiBsb2NhdGlvbiIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSWYgYSBjYXVzYWwgc2lnbmFsIGFwcGVhcnMgYXMgXFwoZygtdCsxKVxcKSwgd2hlcmUgZG9lcyBpdCB0dXJuIG9uPyIsIm9wdGlvbnMiOlsiQS4gXFwodCA9IC0xXFwpIiwiQi4gXFwodCA9IDBcXCkiLCJDLiBcXCh0ID0gMVxcKSIsIkQuIFxcKHQgPSAyXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiU2V0IHRoZSBpbnB1dCBlcXVhbCB0byB6ZXJvOiBcXCgtdCArIDEgPSAwXFwpLCBzbyBcXCh0ID0gMVxcKS4gVGhlIHdhdmVmb3JtIHR1cm5zIG9uIGF0IFxcKHQgPSAxXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlxcKHQgPSAtMVxcKSB3b3VsZCBjb21lIGZyb20gc29sdmluZyBcXCh0ICsgMSA9IDBcXCksIG5vdCBcXCgtdCArIDEgPSAwXFwpLiIsIkIiOiJBdCBcXCh0ID0gMFxcKSB0aGUgaW5wdXQgaXMgXFwoLTAgKyAxID0gMVxcKSwgbm90IDAsIHNvIHRoZSBzaWduYWwgaGFzIG5vdCB5ZXQgdHVybmVkIG9uLiIsIkQiOiJObyBjb21iaW5hdGlvbiBvZiB0aGUgZ2l2ZW4gY29uc3RhbnRzIHByb2R1Y2VzIFxcKHQgPSAyXFwpIGZyb20gXFwoLXQgKyAxID0gMFxcKS4ifSwiaGludCI6IlNvbHZlIHRoZSBleHByZXNzaW9uIGluc2lkZSBcXChnXFwpIGVxdWFsIHRvIHplcm8uIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImludGVyYWN0aXZlX2RlbW9fb2JzZXJ2YXRpb24iLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkZvciBcXChnKDN0LTYpXFwpLCBmaW5kIHRoZSB0dXJuLW9uIGxvY2F0aW9uIGFuZCBzdGF0ZSB3aGV0aGVyIHRoZSB3YXZlZm9ybSBpcyBjb21wcmVzc2VkIG9yIHN0cmV0Y2hlZC4iLCJpZGVhbF9hbnN3ZXIiOiJTZXQgXFwoM3QgLSA2ID0gMFxcKSwgc28gXFwodCA9IDJcXCkuIFNpbmNlIFxcKHxhfCA9IDMgPiAxXFwpLCB0aGUgd2F2ZWZvcm0gaXMgY29tcHJlc3NlZCBieSBhIGZhY3RvciBvZiAzLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3Qgc2V0IFxcKDN0IC0gNlxcKSBlcXVhbCB0byB6ZXJvIiwiTXVzdCBpZGVudGlmeSBcXCh0ID0gMlxcKSBhcyB0aGUgdHVybi1vbiBsb2NhdGlvbiIsIk11c3QgaWRlbnRpZnkgY29tcHJlc3Npb24sIG5vdCBzdHJldGNoaW5nIiwiTXVzdCBjb25uZWN0IGNvbXByZXNzaW9uIHRvIFxcKHxhfCA9IDMgPiAxXFwpIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCBjYW4gYXBwbHkgdGhlIHJ1bGUgXFwoYXQgKyBiID0gMCBcXFJpZ2h0YXJyb3cgdCA9IC1iL2FcXCkgdG8gYSBuZXcgaW5wdXQgYXJndW1lbnQsIG5vdCBqdXN0IHRoZSB0ZXh0Ym9vayBleGFtcGxlcy4gSGVyZSBcXChhID0gM1xcKSwgXFwoYiA9IC02XFwpLCBzbyBcXCh0ID0gLSgtNikvMyA9IDJcXCkuIiwiaGludCI6IlVzZSBcXChhdCArIGIgPSAwXFwpIHRvIGZpbmQgdGhlIHR1cm4tb24sIHRoZW4gaW5zcGVjdCBcXCh8YXxcXCkgdG8gZGV0ZXJtaW5lIGNvbXByZXNzaW9uIG9yIHN0cmV0Y2guIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJzdXBlcnBvc2l0aW9uX3RyYW5zZm9ybWVkX3NpZ25hbHMiLCJsYWJlbCI6IlN1cGVycG9zaXRpb24gb2YgdHJhbnNmb3JtZWQgc2lnbmFscyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3A0X3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgXFwoaCh0KSA9IGcoMnQrMSkgKyBnKC10KzEpXFwpLCB3aGF0IGlzIHRoZSBjb3JyZWN0IHBsb3R0aW5nIHN0cmF0ZWd5PyIsIm9wdGlvbnMiOlsiQS4gQ29tYmluZSB0aGUgaW5wdXRzIGludG8gXFwoZyh0KzIpXFwpIGFuZCBwbG90IG9uY2UiLCJCLiBBbmFseXplIGVhY2ggdHJhbnNmb3JtZWQgY29weSBvZiBcXChnXFwpIHNlcGFyYXRlbHksIHRoZW4gYWRkIHRoZWlyIHZhbHVlcyBwb2ludC1ieS1wb2ludCIsIkMuIElnbm9yZSB0aGUgbmVnYXRpdmUgc2lnbiBiZWNhdXNlIGl0IG9ubHkgY2hhbmdlcyBhbXBsaXR1ZGUiLCJELiBQbG90IG9ubHkgXFwoZygydCsxKVxcKSwgYmVjYXVzZSB0aGUgc2Vjb25kIHRlcm0gaXMgcmVkdW5kYW50Il0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiQSBzdW0gb2YgdHJhbnNmb3JtZWQgc2lnbmFscyBpcyBoYW5kbGVkIGJ5IGV2YWx1YXRpbmcgZWFjaCB0ZXJtIGF0IHRoZSBzYW1lIFxcKHRcXCkgYW5kIGFkZGluZyB0aGUgcmVzdWx0cy4gU3VwZXJwb3NpdGlvbiBhcHBsaWVzIHRlcm0gYnkgdGVybS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJcXChnKDJ0KzEpICsgZygtdCsxKVxcKSBpcyBub3QgdGhlIHNhbWUgYXMgb25lIHNpZ25hbCB3aXRoIGEgY29tYmluZWQgaW5wdXQ7IHRoZSB0d28gdGVybXMgY2Fubm90IGJlIG1lcmdlZC4iLCJDIjoiVGhlIG5lZ2F0aXZlIHNpZ24gaW4gXFwoLXQrMVxcKSBjYXVzZXMgcmVmbGVjdGlvbiBpbiB0aW1lLCBub3QgYW4gYW1wbGl0dWRlIGNoYW5nZS4iLCJEIjoiVGhlIHNlY29uZCB0ZXJtIFxcKGcoLXQrMSlcXCkgY29udHJpYnV0ZXMgaXRzIG93biByZWZsZWN0ZWQsIHNoaWZ0ZWQgd2F2ZWZvcm0gYW5kIGNhbm5vdCBiZSBpZ25vcmVkLiJ9LCJoaW50IjoiU3VtcyBvZiB0cmFuc2Zvcm1lZCBzaWduYWxzIGFyZSBoYW5kbGVkIHRlcm0gYnkgdGVybS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoiYm9va19maWd1cmVfcmVhZGluZyIsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDRfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkluIHRoZSBpbnRlcmFjdGl2ZSBkZW1vLCB3aGVuIFxcKGFcXCkgY2hhbmdlcyBmcm9tIDIgdG8gXFwoLTFcXCkgd2hpbGUgXFwoYlxcKSBzdGF5cyBhdCAxLCB3aGF0IHZpc3VhbCBjaGFuZ2Ugc2hvdWxkIHlvdSBleHBlY3Q/Iiwib3B0aW9ucyI6WyJBLiBUaGUgd2F2ZWZvcm0gb25seSBiZWNvbWVzIHRhbGxlciIsIkIuIFRoZSB3YXZlZm9ybSByZWZsZWN0cyBpbiB0aW1lLCBhbmQgdGhlIHR1cm4tb24gY2hhbmdlcyBhY2NvcmRpbmcgdG8gXFwoLXQrMT0wXFwpIiwiQy4gVGhlIHdhdmVmb3JtIGRpc2FwcGVhcnMgYmVjYXVzZSBcXChhXFwpIGlzIG5lZ2F0aXZlIiwiRC4gVGhlIHdhdmVmb3JtIGJlY29tZXMgYSBzdHJhaWdodCBsaW5lIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiQSBuZWdhdGl2ZSBcXChhXFwpIHJlZmxlY3RzIHRoZSB3YXZlZm9ybSBpbiB0aW1lLiBUaGUgdHVybi1vbiBtdXN0IHN0aWxsIGJlIGZvdW5kIGJ5IHNvbHZpbmcgXFwoYXQgKyBiID0gMFxcKTogaGVyZSBcXCgtdCArIDEgPSAwXFwpIGdpdmVzIFxcKHQgPSAxXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkNoYW5naW5nIFxcKGFcXCkgYWZmZWN0cyB0aGUgdGltZSBheGlzIGJlaGF2aW9yIChjb21wcmVzc2lvbiwgc3RyZXRjaCwgcmVmbGVjdGlvbiksIG5vdCBqdXN0IGFtcGxpdHVkZS4iLCJDIjoiTmVnYXRpdmUgXFwoYVxcKSBjYXVzZXMgdGltZSByZXZlcnNhbCAocmVmbGVjdGlvbiksIG5vdCBkaXNhcHBlYXJhbmNlIG9mIHRoZSBzaWduYWwuIiwiRCI6IlRoZSBkYW1wZWQgY29zaW5lIHJlbWFpbnMgYSB3YXZlZm9ybTsgY2hhbmdpbmcgXFwoYVxcKSB0byBcXCgtMVxcKSBvbmx5IHJlZmxlY3RzIGl0LCBub3QgbGluZWFyaXplcyBpdC4ifSwiaGludCI6IkEgbmVnYXRpdmUgY29lZmZpY2llbnQgb2YgXFwodFxcKSBtZWFucyByZWZsZWN0aW9uIGluIHRpbWUuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImludGVyYWN0aXZlX2RlbW9fb2JzZXJ2YXRpb24iLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
