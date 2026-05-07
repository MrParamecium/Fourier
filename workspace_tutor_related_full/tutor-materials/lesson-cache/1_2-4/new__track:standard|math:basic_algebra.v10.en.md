%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJUaGUgdGV4dGJvb2sgYWxyZWFkeSBwcm92aWRlcyBhIHVzZWZ1bCBzaWduYWwtdHJhbnNmb3JtYXRpb24gZmlndXJlIHNob3dpbmcgdGltZSByZXZlcnNhbCwgd2hpY2ggYW5jaG9ycyB0aGUgaWRlYSB0aGF0IHNpZ24gY2hhbmdlcyBpbiB0aGUgdGltZSBhcmd1bWVudCBmbGlwIHRoZSBzaWduYWwuIEEgY2xlYW4gbWF0cGxvdGxpYi1nZW5lcmF0ZWQgY29tcGFyaXNvbiBpcyBhbHNvIGhlbHBmdWwgZm9yIHRoaXMgc2VjdGlvbiBiZWNhdXNlIHRoZSBtYWluIGxlYXJuaW5nIGdvYWwgaXMgcHJvY2VkdXJhbDogc3R1ZGVudHMgbXVzdCBzZWUgaG93IHgoYXQtYikgY2FuIGJlIGZvcm1lZCB0aHJvdWdoIG9yZGVyZWQgc3RlcHMuIiwiY3JhbSI6IlVzZSB2aXN1YWxzIHRvIGhlbHAgdGhlIHN0dWRlbnQgaW5zdGFudGx5IHJlY29nbml6ZSB0aGUgcGF0dGVybiBpbnNpZGUgeChhdC1iKTogaWRlbnRpZnkgc2NhbGluZyBmaXJzdCBmcm9tIGEsIHRoZW4gbG9jYXRlIHRoZSBlZmZlY3RpdmUgc2hpZnQuIiwic3RhbmRhcmQiOiJVc2UgdGhlIHRleHRib29rIGZpZ3VyZSB0byByZW1pbmQgdGhlIHN0dWRlbnQgd2hhdCByZXZlcnNhbCBtZWFucywgdGhlbiB1c2Ugb25lIGNsZWFuIGdlbmVyYXRlZCBjb21wYXJpc29uIHRvIHdhbGsgdGhyb3VnaCBhIHJlcHJlc2VudGF0aXZlIGNvbWJpbmVkLW9wZXJhdGlvbiBleGFtcGxlLiIsInRvcF9zY29yZSI6IlVzZSB2aXN1YWxzIHRvIGNvbXBhcmUgb3BlcmF0aW9uIG9yZGVyLCBzaG93IHdoeSB0aGUgc2hpZnQgYmVjb21lcyBiL2EgaW4gb25lIHJvdXRlLCBhbmQgZXhwb3NlIHRoZSBuZWdhdGl2ZS1hIHRyYXAuIn0=" style="display:none;"></div>%%KC_END%%
# 1.2-4 Combined Operations

> **Section Objective:** Understand what x(at - b) means, learn the two valid ways to build it from basic operations, and avoid the common exam trap involving the shift amount.

Consider the signal x(2t - 6). At first glance it looks like a single expression, but it actually hides two separate time modifications happening at once: a compression in time and a shift. This section is about signals whose time variable is changed in more than one way simultaneously — what we call **combined operations**.

Combined operations can mix time shifting, time scaling, and, when the coefficient of t is negative, time reversal. Exam questions frequently disguise a simple two-step sequence inside x(at - b). To handle these confidently, you need to know exactly **two legal construction routes** for building x(at - b) from x(t), and understand why they give different-looking intermediate steps but always arrive at the same final signal.

## 1. The Meaning of x(at - b)

The expression x(at - b) means the original signal x(t) has been modified by **both scaling and shifting** in time simultaneously. The parameter **a** controls time scaling (and reversal if negative), while **b** controls the time shift.

There are exactly two equivalent sequences for constructing x(at - b) from x(t):

**Route A — Shift first, then scale:**
1. Shift x(t) by b to obtain x(t - b)
2. Replace t with at to obtain x(at - b)

**Route B — Scale first, then shift:**
1. Scale x(t) by a to obtain x(at)
2. Shift that result by **b/a** to obtain x[a(t - b/a)] = x(at - b)

### EXAM NOTE

Route B is where most students lose marks. After scaling first, the required shift is **b/a**, not b. This is because the time axis has already been compressed or stretched by a, so the shift must be adjusted accordingly. Always factor out a from the argument to find the correct shift in Route B.

$$x(at - b)$$
*This is the most general combined time operation covered in this section. The factor a scales (and compresses or stretches) the time axis, b shifts the signal, and when a < 0, the scaling step automatically includes a time reversal — flipping the signal horizontally about t = 0.*

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="comparison_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoZSBmaWd1cmUgdG8gcmVjb2duaXplIHRoZSB0d28tc3RlcCBwYXR0ZXJuIGZvciB4KDJ0LTYpIHF1aWNrbHkuIiwic3RhbmRhcmQiOiJVc2UgdGhlIGZpZ3VyZSB0byBjb21wYXJlIHNoaWZ0LXRoZW4tc2NhbGUgdmVyc3VzIHNjYWxlLXRoZW4tc2hpZnQgZm9yIG9uZSByZXByZXNlbnRhdGl2ZSBleGFtcGxlLiIsInRvcF9zY29yZSI6IlVzZSB0aGUgZmlndXJlIHRvIG5vdGljZSB0aGF0IHRoZSBzZWNvbmQgcm91dGUgdXNlcyBhIHNoaWZ0IG9mIDMsIG5vdCA2LiJ9" style="display:none;"></div>%%KC_END%%
*📊 Three-panel diagram showing the construction of x(2t - 6). Route A (left to center): shift x(t) by 6, then compress by 2. Route B (noted in the right panel): compress x(t) by 2 first to get x(2t), then shift by 3 — not 6 — because the time axis has already been scaled.*
![Chart](/generated/chart-1777139043190-ncqg5.png)

## 2. Representative Example: x(2t - 6)

Let x(t) be a rectangular pulse from t = 0 to t = 2. We want to find x(2t - 6).

**Route A — Shift first, then scale:**
1. Delay x(t) by 6 to get x(t - 6). The pulse now runs from t = 6 to t = 8.
2. Replace t with 2t to compress by factor 2: x(2t - 6). The pulse now runs from t = 3 to t = 4.

**Route B — Scale first, then shift:**
1. Compress x(t) by factor 2 to get x(2t). The pulse now runs from t = 0 to t = 1.
2. Delay x(2t) by **3** to get x[2(t - 3)] = x(2t - 6). The pulse runs from t = 3 to t = 4.

Both routes arrive at the same final signal. The critical teaching point is that **Route B uses a shift of 3, not 6**, because the time axis was already compressed before the shift was applied.

### QUICK CHECK

If you scale x(t) by a = 2 first, what shift must you then apply to obtain x(2t - 6)? *(Answer: shift by b/a = 6/2 = 3.)*

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="trap_exposure" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgZmlndXJlIHRvIHJlbWVtYmVyIHRoYXQgYSBuZWdhdGl2ZSB0aW1lIGFyZ3VtZW50IGZsaXBzIHRoZSBzaWduYWwgaG9yaXpvbnRhbGx5LiIsInN0YW5kYXJkIjoiVXNlIHRoaXMgZmlndXJlIHRvIGNvbm5lY3QgY29tYmluZWQgb3BlcmF0aW9ucyB0byB0aGUgYWxyZWFkeS1sZWFybmVkIGlkZWEgb2YgdGltZSByZXZlcnNhbC4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhpcyBmaWd1cmUgdG8gc3BvdCB3aGVuIGEgbmVnYXRpdmUgc2NhbGluZyBmYWN0b3Igc2VjcmV0bHkgaW5jbHVkZXMgcmV2ZXJzYWwgYmVmb3JlIHNoaWZ0aW5nLiJ9" style="display:none;"></div>%%KC_END%%
![Fig. 1.9](/figures/page-077-fig__1_9-1.png)
*This textbook figure illustrates what time reversal looks like — a reminder that when the coefficient a in x(at - b) is negative, the scaling step automatically flips the signal horizontally in time.*

## 3. Negative a Means Reversal Is Included

When a is negative in x(at - b), the transformation is no longer a plain shift-and-compress. The negative sign in front of t flips the signal in time — this is **time reversal** — and it happens as part of the scaling step, not as a separate operation.

Look back at the textbook figure above: the growing exponential on the left becomes a decaying exponential on the right after reversal. That same flip is embedded inside x(-2t - 6).

### COMMON MISTAKE

Do not treat x(-2t - 6) like a plain shift-and-compress problem without noticing the flip. The negative coefficient changes the orientation of the entire signal in time.

#### Exam Note

Always check the sign of a first. If a < 0, reversal is part of the operation and must be accounted for when sketching or analyzing the result.

---
**📌 Key Takeaways**
- x(at - b) combines time scaling and shifting; negative a also includes time reversal.
- Scaling first changes the required shift from b to b/a — a common exam trap.
- Both construction routes (shift-then-scale or scale-then-shift) produce the same final signal.

*In the next section we will examine how these time-domain operations affect the properties of signals, including their energy and power.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImdlbmVyYWxfbWVhbmluZ19vZl9jb21iaW5lZF9vcGVyYXRpb25zIiwibGFiZWwiOiJNZWFuaW5nIG9mIHgoYXQtYikiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHN0YXRlbWVudCBiZXN0IGRlc2NyaWJlcyB4KGF0IC0gYik/Iiwib3B0aW9ucyI6WyJBLiBJdCBhbHdheXMgcmVwcmVzZW50cyBvbmx5IGEgdGltZSBzaGlmdCIsIkIuIEl0IGNvbWJpbmVzIHRpbWUgc2NhbGluZyB3aXRoIHRpbWUgc2hpZnRpbmcsIGFuZCBtYXkgaW5jbHVkZSByZXZlcnNhbCBpZiBhIGlzIG5lZ2F0aXZlIiwiQy4gSXQgYWx3YXlzIHJlcHJlc2VudHMgb25seSB0aW1lIHJldmVyc2FsIiwiRC4gSXQgY2hhbmdlcyBhbXBsaXR1ZGUsIG5vdCB0aW1lIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIGV4cHJlc3Npb24geChhdCAtIGIpIG1vZGlmaWVzIHRoZSB0aW1lIHZhcmlhYmxlIGluIG1vcmUgdGhhbiBvbmUgd2F5LiBUaGUgZmFjdG9yIGEgY29udHJvbHMgc2NhbGluZywgYW5kIHRoZSB0ZXJtIGIgY29udHJpYnV0ZXMgc2hpZnRpbmcuIElmIGEgaXMgbmVnYXRpdmUsIHJldmVyc2FsIGlzIGluY2x1ZGVkIGluIHRoZSBzY2FsaW5nIHN0ZXAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlIGZhY3RvciBhIHNob3dzIHRoYXQgbW9yZSB0aGFuIGEgc2hpZnQgaXMgaGFwcGVuaW5nLiIsIkMiOiJSZXZlcnNhbCBoYXBwZW5zIG9ubHkgd2hlbiBhIGlzIG5lZ2F0aXZlLCBub3QgYWx3YXlzLiIsIkQiOiJUaGUgb3BlcmF0aW9ucyBoZXJlIGFjdCBvbiB0aW1lLCBub3QgYW1wbGl0dWRlLiJ9LCJoaW50IjoiTG9vayBhdCBob3cgdCBpcyBjaGFuZ2VkIGluc2lkZSB0aGUgcGFyZW50aGVzZXMuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoidHdvX3ZhbGlkX3NlcXVlbmNlcyIsImxhYmVsIjoiVHdvIGVxdWl2YWxlbnQgcm91dGVzIHRvIGZvcm0geChhdC1iKSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggaXMgYSBjb3JyZWN0IHdheSB0byBvYnRhaW4geChhdCAtIGIpIGZyb20geCh0KT8iLCJvcHRpb25zIjpbIkEuIFNoaWZ0IGJ5IGIsIHRoZW4gc2NhbGUgYnkgYSIsIkIuIFNjYWxlIGJ5IGIsIHRoZW4gc2hpZnQgYnkgYSIsIkMuIFNoaWZ0IGJ5IGEsIHRoZW4gc2NhbGUgYnkgYiIsIkQuIFJldmVyc2UgZmlyc3QsIHRoZW4gYWx3YXlzIHNoaWZ0IGJ5IGIiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJPbmUgdmFsaWQgcm91dGUgaXMgdG8gZmlyc3QgZm9ybSB4KHQgLSBiKSwgdGhlbiByZXBsYWNlIHQgd2l0aCBhdCB0byBnZXQgeChhdCAtIGIpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkNvcnJlY3QuIiwiQiI6IlRoZSBwYXJhbWV0ZXJzIGFyZSBhc3NpZ25lZCB0byB0aGUgd3Jvbmcgb3BlcmF0aW9ucy4iLCJDIjoiQWdhaW4sIGEgYW5kIGIgYXJlIGJlaW5nIHVzZWQgaW5jb3JyZWN0bHkuIiwiRCI6IlJldmVyc2FsIGlzIG5vdCBhbHdheXMgcmVxdWlyZWQ7IGl0IGRlcGVuZHMgb24gdGhlIHNpZ24gb2YgYS4ifSwiaGludCI6Ik1hdGNoIGVhY2ggcGFyYW1ldGVyIHRvIGl0cyBqb2I6IGEgZm9yIHNjYWxpbmcsIGIgZm9yIHNoaWZ0aW5nLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSWYgeW91IHNjYWxlIGZpcnN0LCB3aGljaCBzaGlmdCBtdXN0IGJlIGFwcGxpZWQgdG8gb2J0YWluIHgoYXQgLSBiKSBmcm9tIHgoYXQpPyIsIm9wdGlvbnMiOlsiQS4gU2hpZnQgYnkgYiIsIkIuIFNoaWZ0IGJ5IGEvYiIsIkMuIFNoaWZ0IGJ5IGIvYSIsIkQuIE5vIHNoaWZ0IGlzIG5lZWRlZCJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlN0YXJ0aW5nIGZyb20geChhdCksIHNoaWZ0aW5nIGJ5IGIvYSBnaXZlcyB4W2EodCAtIGIvYSldID0geChhdCAtIGIpLiBUaGlzIGlzIHRoZSBjb21tb24gZXhhbSB0cmFwIGluIHRoaXMgc2VjdGlvbi4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGF0IGlnbm9yZXMgdGhlIGZhY3QgdGhhdCB0aW1lIGhhcyBhbHJlYWR5IGJlZW4gc2NhbGVkLiIsIkIiOiJUaGlzIGlzIHRoZSByZWNpcHJvY2FsIG9mIHRoZSBjb3JyZWN0IHF1YW50aXR5LiIsIkQiOiJBIHNoaWZ0IGlzIHN0aWxsIHJlcXVpcmVkIHVubGVzcyBiID0gMC4ifSwiaGludCI6IldyaXRlIHgoYXQgLSBiKSBhcyB4W2EodCAtIHNvbWV0aGluZyldLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoicmVwcmVzZW50YXRpdmVfZXhhbXBsZV94XzJ0X21pbnVzXzYiLCJsYWJlbCI6IkFwcGx5aW5nIHRoZSBydWxlIHRvIHgoMnQtNikiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IlVzaW5nIHRoZSBzY2FsZS1maXJzdCByb3V0ZSwgd2hhdCBpcyB0aGUgY29ycmVjdCBzZWNvbmQgc3RlcCBmb3Igb2J0YWluaW5nIHgoMnQgLSA2KT8iLCJvcHRpb25zIjpbIkEuIEFmdGVyIGZvcm1pbmcgeCgydCksIGRlbGF5IGl0IGJ5IDYiLCJCLiBBZnRlciBmb3JtaW5nIHgoMnQpLCBkZWxheSBpdCBieSAzIiwiQy4gQWZ0ZXIgZm9ybWluZyB4KDJ0KSwgYWR2YW5jZSBpdCBieSAzIiwiRC4gQWZ0ZXIgZm9ybWluZyB4KDJ0KSwgcmV2ZXJzZSBpdCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkJlY2F1c2UgeCgydCAtIDYpID0geFsyKHQgLSAzKV0sIHRoZSBzY2FsZWQgc2lnbmFsIHgoMnQpIG11c3QgdGhlbiBiZSBkZWxheWVkIGJ5IDMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhhdCB3b3VsZCBwcm9kdWNlIHhbMih0IC0gNildID0geCgydCAtIDEyKSwgbm90IHgoMnQgLSA2KS4iLCJDIjoiQW4gYWR2YW5jZSB3b3VsZCB1c2UgdCArIDMsIG5vdCB0IC0gMy4iLCJEIjoiTm8gcmV2ZXJzYWwgaXMgaW1wbGllZCBiZWNhdXNlIHRoZSBzY2FsaW5nIGZhY3RvciBpcyBwb3NpdGl2ZS4ifSwiaGludCI6IkZhY3RvciBvdXQgdGhlIDIgaW5zaWRlIHRoZSBhcmd1bWVudC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoibWF0cGxvdGxpYl9zaWduYWxfY29tcGFyaXNvbiIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiU2hvdyBicmllZmx5IHdoeSB4KDJ0IC0gNikgY2FuIGFsc28gYmUgd3JpdHRlbiBpbiBhIGZvcm0gdGhhdCBtYWtlcyB0aGUgc2NhbGUtZmlyc3Qgcm91dGUgb2J2aW91cy4iLCJpZGVhbF9hbnN3ZXIiOiJXcml0ZSB4KDJ0IC0gNikgYXMgeFsyKHQgLSAzKV0uIFRoaXMgc2hvd3MgdGhhdCBhZnRlciBmb3JtaW5nIHgoMnQpLCB0aGUgcmVzdWx0IGlzIHNoaWZ0ZWQgcmlnaHQgYnkgMy4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IHJld3JpdGUgMnQgLSA2IGFzIDIodCAtIDMpIiwiTXVzdCBjb25uZWN0IHRoaXMgZm9ybSB0byBzY2FsaW5nIGZpcnN0IiwiTXVzdCBpZGVudGlmeSB0aGUgcmVzdWx0aW5nIHNoaWZ0IGFzIDMgdG8gdGhlIHJpZ2h0IG9yIGEgZGVsYXkgb2YgMyJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQgY2FuIGNvbnZlcnQgdGhlIGFsZ2VicmEgaW50byB0aGUgY29ycmVjdCBvcGVyYXRpb24gc2VxdWVuY2UgcmF0aGVyIHRoYW4gbWVtb3JpemluZyBhIHJ1bGUgbWVjaGFuaWNhbGx5LiIsImhpbnQiOiJGYWN0b3Igb3V0IHRoZSBjb2VmZmljaWVudCBvZiB0LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoibmVnYXRpdmVfYV90cmFwIiwibGFiZWwiOiJOZWdhdGl2ZSBzY2FsaW5nIGZhY3RvciBpbXBsaWVzIHJldmVyc2FsIiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNF9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hhdCBleHRyYSBlZmZlY3QgaXMgcHJlc2VudCB3aGVuIGEgaXMgbmVnYXRpdmUgaW4geChhdCAtIGIpPyIsIm9wdGlvbnMiOlsiQS4gQW1wbGl0dWRlIGludmVyc2lvbiIsIkIuIFRpbWUgcmV2ZXJzYWwgYXMgcGFydCBvZiBzY2FsaW5nIiwiQy4gVGhlIHNoaWZ0IGRpc2FwcGVhcnMiLCJELiBUaGUgc2lnbmFsIGJlY29tZXMgcGVyaW9kaWMiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJBIG5lZ2F0aXZlIGNvZWZmaWNpZW50IG9uIHQgZmxpcHMgdGhlIHNpZ25hbCBpbiB0aW1lLCBzbyByZXZlcnNhbCBpcyBidWlsdCBpbnRvIHRoZSBzY2FsaW5nIHN0ZXAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBzZWN0aW9uIGlzIGFib3V0IHRpbWUgb3BlcmF0aW9ucywgbm90IGFtcGxpdHVkZSBzaWduIGNoYW5nZXMuIiwiQyI6IlRoZSBzaGlmdCB0ZXJtIHN0aWxsIG1hdHRlcnMuIiwiRCI6IlBlcmlvZGljaXR5IGlzIHVucmVsYXRlZCBoZXJlLiJ9LCJoaW50IjoiVGhpbmsgYWJvdXQgd2hhdCB4KC10KSBtZWFucy4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoidGltZV9yZXZlcnNhbF9yZWZlcmVuY2UiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
