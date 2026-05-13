%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJUaGUgdGV4dGJvb2sgYWxyZWFkeSBwcm92aWRlcyBhIGNhbm9uaWNhbCBmaWd1cmUgZm9yIHRpbWUgcmV2ZXJzYWwsIHdoaWNoIHNob3VsZCBhbmNob3IgdGhlIGlkZWEgdGhhdCBuZWdhdGl2ZSBzY2FsaW5nIGZsaXBzIHRoZSBzaWduYWwuIEEgY2xlYW4gbWF0cGxvdGxpYiBkaWFncmFtIGlzIGFsc28gbmVlZGVkIGJlY2F1c2UgdGhlIGNvcmUgc2VjdGlvbiBnb2FsIGlzIHRoZSBjb21iaW5lZCBvcGVyYXRpb24geChhdCAtIGIpLCBhbmQgYSBzaWRlLWJ5LXNpZGUgY29uc3RydWN0aW9uIHZpc3VhbCBtYWtlcyB0aGUgb3JkZXItc2Vuc2l0aXZlIGxvZ2ljIGFuZCBleGFtIHRyYXAgYXJvdW5kIGIgdmVyc3VzIGIvYSBtdWNoIGNsZWFyZXIgdGhhbiB0ZXh0IGFsb25lLiIsImNyYW0iOiJVc2UgdGhlIHRleHRib29rIGZpZ3VyZSB0byBsb2NrIGluIHdoYXQgcmV2ZXJzYWwgbG9va3MgbGlrZSwgdGhlbiB1c2Ugb25lIGNsZWFuIGNvbXBhcmlzb24gZGlhZ3JhbSB0byBtZW1vcml6ZSB0aGUgdHdvIHZhbGlkIHBhdGhzIHRvIHgoYXQgLSBiKS4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgdGV4dGJvb2sgZmlndXJlIHRvIGV4cGxhaW4gcmV2ZXJzYWwgaW50dWl0aXZlbHksIHRoZW4gdXNlIHRoZSBnZW5lcmF0ZWQgcGxvdCB0byBzaG93IGhvdyBzaGlmdCBhbmQgc2NhbGluZyBjb21iaW5lIGludG8gdGhlIHNhbWUgZmluYWwgc2lnbmFsLiIsInRvcF9zY29yZSI6IlVzZSB0aGUgdGV4dGJvb2sgZmlndXJlIHRvIGFuY2hvciByZXZlcnNhbCwgdGhlbiB1c2UgdGhlIGdlbmVyYXRlZCBjb21wYXJpc29uIHRvIGV4cG9zZSB0aGUgc3VidGxlIGRpc3RpbmN0aW9uIGJldHdlZW4gc2hpZnQgYnkgYiBhbmQgc2hpZnQgYnkgYi9hLCBlc3BlY2lhbGx5IHdoZW4gc2NhbGluZyBoYXBwZW5zIGZpcnN0LiJ9" style="display:none;"></div>%%KC_END%%
# 1.2-4 Combined Operations

> **Objective:** Decode combined time operations of the form x(at - b) without falling into order-of-operations traps.

Consider x(2t - 6). This expression combines two operations — a time shift and a time scaling — and the order in which you apply them changes the intermediate signal, even though the final result is always the same.

The general form is **x(at - b)**, where a controls scaling (and possibly reversal if a < 0) and b controls the shift. Your exam goal: identify what happens first, how much shift is actually applied at each stage, and whether reversal is present.

There are exactly **two valid construction routes**. Strong students know both — and they never confuse "shift by b" with "shift by b/a" after scaling first. That confusion is the single most common trap in this topic.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgdG8gcmVjb2duaXplIGluc3RhbnRseSB0aGF0IHJlcGxhY2luZyB0IGJ5IC10IHJlZmxlY3RzIHRoZSBzaWduYWwgYWNyb3NzIHQgPSAwLiIsInN0YW5kYXJkIjoiVXNlIHRoaXMgdG8gZXhwbGFpbiB3aGF0IHJldmVyc2FsIGRvZXMgdG8gYm90aCB0aGUgd2F2ZWZvcm0gc2hhcGUgYW5kIHRoZSB0aW1lIGludGVydmFsLiIsInRvcF9zY29yZSI6IlVzZSB0aGlzIHRvIHN0cmVzcyB0aGF0IG5lZ2F0aXZlIHNjYWxpbmcgY2hhbmdlcyB0aW1lIGxvY2F0aW9ucyBhbmQgc2hhcGUgb3JpZW50YXRpb24gdG9nZXRoZXIsIG5vdCBqdXN0IHRoZSBmb3JtdWxhLiJ9" style="display:none;"></div>%%KC_END%%
![Fig. 1.9](/figures/page-077-fig__1_9-1.png)
*Time reversal maps each time instant t to -t, so interval endpoints flip sign and the waveform is mirrored about t = 0.*

## 1. Two Correct Ways to Build x(at - b)

The textbook gives two valid sequences for constructing x(at - b) from x(t).

**Route 1 — Shift first, then scale:**
1. Start with x(t). Shift by b to get x(t - b).
2. Replace t with at to get x(at - b). Done.

For x(2t - 6): delay by 6 to get x(t - 6), then compress by 2 to get x(2t - 6).

**Route 2 — Scale first, then shift:**
1. Start with x(t). Scale by a to get x(at).
2. Rewrite the target: x(at - b) = x[a(t - b/a)]. So after scaling, shift by **b/a**.

For x(2t - 6): compress by 2 to get x(2t), then delay by **3** (not 6) to get x[2(t - 3)] = x(2t - 6).

Both routes produce the same final signal. The intermediate signals differ.

### CLASSIC EXAM TRAP

> If you scale first, the shift is **b/a = 3**, not b = 6. Applying a delay of 6 after scaling first is the single most common wrong answer on this topic.

$$x(at-b)=x\big[a\left(t-\frac{b}{a}\right)\big]$$
*This is the key exam rewrite: if scaling happens first, the subsequent shift is by b/a — not by b.*

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="comparison_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgdG8gbWVtb3JpemUgdGhlIGZhc3QgcGF0dGVybjogc2NhbGUgZmlyc3QgbWVhbnMgdGhlIHZpc2libGUgc2hpZnQgYmVjb21lcyBiL2EuIiwic3RhbmRhcmQiOiJVc2UgdGhpcyB0byBjb21wYXJlIHRoZSB0d28gY29uc3RydWN0aW9uIHBhdGhzIGFuZCBzZWUgdGhhdCB0aGV5IHJlYWNoIHRoZSBzYW1lIGZpbmFsIHNpZ25hbC4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhpcyB0byBoaWdobGlnaHQgaW50ZXJtZWRpYXRlLXNpZ25hbCBkaWZmZXJlbmNlcyBhbmQgdGhlIHRyYXAgb2YgYXBwbHlpbmcgdGhlIHdyb25nIHNoaWZ0IGFmdGVyIGNvbXByZXNzaW9uLiJ9" style="display:none;"></div>%%KC_END%%
*📊 Two valid construction routes to x(2t - 6). Route 1 (top): delay by 6, then compress by 2. Route 2 (bottom): compress by 2, then delay by 3 (= b/a). Both routes reach the same final signal on [3, 4]. The red annotation marks the classic trap: applying a delay of 6 after scaling first produces the wrong signal.*
![Chart](/generated/chart-1777139176827-xenll.png)

## 2. Negative a Means Reversal Is Included

In x(at - b), if **a < 0**, the scaling step automatically includes **time reversal**. This is not a separate operation you add — it is built into the negative sign.

Recall the textbook figure: x(-t) takes the original signal and mirrors it about t = 0. Every time instant t maps to -t, so the interval [t₁, t₂] becomes [-t₂, -t₁].

When a is negative, the same flip is embedded inside the combined operation. The safe method is to **factor first**.

### EXAM TRAP — NEGATIVE SCALING

Consider x(-2t - 6). A common mistake is to read this as "left shift by 6, then compress" — but this ignores the reversal and gets the shift direction wrong.

**Correct approach:** Factor the argument:

$$-2t - 6 = -2(t + 3)$$

So x(-2t - 6) = x[-2(t + 3)]. After scaling by -2 (which includes reversal), the shift is **left by 3**, not left by 6. Reading the sign outside without factoring produces the wrong shift amount and the wrong direction.

Think of time scaling as stretching or squeezing a printed photo of the signal along the horizontal axis. Compressing by 2 squishes everything toward the center; expanding by 2 pulls it outward. A **negative** scale factor does all of that, but also holds the photo up to a mirror — left becomes right, and the whole waveform flips around t = 0.

Adding the shift is then like sliding that already-transformed photo left or right along the table. Here is the key insight: if you slide the photo *before* squishing it, you slide by the full amount b. But if you squish it *first* and then slide, the squishing has already changed the scale of the axis, so you only need to slide by b/a to land in the right place. The final photo looks identical either way — but the intermediate positions are completely different, and mixing up the slide amounts is where the exam points are lost.

---
**📌 Key Takeaways**
- Shift first then scale uses shift b; scale first then shift uses b/a — never confuse the two.
- Both construction routes for x(at - b) produce the same final signal via different intermediate steps.
- When a < 0, time reversal is automatically included in the scaling step — factor first to read the shift correctly.

*In the next section we will build on these operations to analyze more complicated signals.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InR3b192YWxpZF9zZXF1ZW5jZXMiLCJsYWJlbCI6IlR3byB2YWxpZCBjb25zdHJ1Y3Rpb24gcm91dGVzIGZvciB4KGF0LWIpIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBzZXF1ZW5jZSBjb3JyZWN0bHkgcHJvZHVjZXMgeCgydCAtIDYpIGZyb20geCh0KSBpZiB5b3UgY2hvb3NlIHRvIHNoaWZ0IGZpcnN0PyIsIm9wdGlvbnMiOlsiQS4gRGVsYXkgYnkgMywgdGhlbiBjb21wcmVzcyBieSAyIiwiQi4gRGVsYXkgYnkgNiwgdGhlbiBjb21wcmVzcyBieSAyIiwiQy4gQ29tcHJlc3MgYnkgMiwgdGhlbiBkZWxheSBieSA2IiwiRC4gQWR2YW5jZSBieSA2LCB0aGVuIGNvbXByZXNzIGJ5IDIiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJJZiB5b3Ugc2hpZnQgZmlyc3QsIHlvdSBmb3JtIHgodCAtIDYpLCB0aGVuIHJlcGxhY2UgdCBieSAydCB0byBnZXQgeCgydCAtIDYpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkRlbGF5IGJ5IDMgaXMgdGhlIHNoaWZ0IGFtb3VudCBvbmx5IGluIHRoZSBzY2FsZS1maXJzdCByb3V0ZS4iLCJDIjoiSWYgeW91IHNjYWxlIGZpcnN0LCB0aGUgbGF0ZXIgc2hpZnQgaXMgbm90IDYgYnV0IDMuIiwiRCI6InQgLSA2IGlzIGEgZGVsYXksIG5vdCBhbiBhZHZhbmNlLiJ9LCJoaW50IjoiTWF0Y2ggdGhlIGV4cHJlc3Npb24gZGlyZWN0bHkgdG8geCh0IC0gYikgYmVmb3JlIHNjYWxpbmcuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBzZXF1ZW5jZSBjb3JyZWN0bHkgcHJvZHVjZXMgeCgydCAtIDYpIGZyb20geCh0KSBpZiB5b3UgY2hvb3NlIHRvIHNjYWxlIGZpcnN0PyIsIm9wdGlvbnMiOlsiQS4gQ29tcHJlc3MgYnkgMiwgdGhlbiBkZWxheSBieSAzIiwiQi4gQ29tcHJlc3MgYnkgMiwgdGhlbiBkZWxheSBieSA2IiwiQy4gRGVsYXkgYnkgNiwgdGhlbiBjb21wcmVzcyBieSAyIiwiRC4gRXhwYW5kIGJ5IDIsIHRoZW4gZGVsYXkgYnkgMyJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlJld3JpdGUgeCgydCAtIDYpIGFzIHhbMih0IC0gMyldLiBBZnRlciBzY2FsaW5nIGZpcnN0IHRvIGdldCB4KDJ0KSwgdGhlIG5lZWRlZCBzaGlmdCBpcyAzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoaXMgaXMgdGhlIGNsYXNzaWMgdHJhcDogYWZ0ZXIgc2NhbGluZyBmaXJzdCwgdGhlIHNoaWZ0IGJlY29tZXMgYi9hID0gMywgbm90IDYuIiwiQyI6IlRoaXMgaXMgYSB2YWxpZCByb3V0ZSBvbmx5IGlmIHRoZSBzaGlmdCBoYXBwZW5zIGZpcnN0LiIsIkQiOiJ4KDJ0KSBpcyBjb21wcmVzc2lvbiwgbm90IGV4cGFuc2lvbi4ifSwiaGludCI6IkZhY3RvciB0aGUgaW5zaWRlIGV4cHJlc3Npb24gYmVmb3JlIGRlY2lkaW5nIHRoZSBzaGlmdC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoibWF0cGxvdGxpYl9jb21wYXJpc29uX29mX3NoaWZ0X2ZpcnN0X3ZzX3NjYWxlX2ZpcnN0Iiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJyZXdyaXRlX2lkZW50aXR5IiwibGFiZWwiOiJVc2luZyB4KGF0LWIpID0geFthKHQtYi9hKV0gdG8gYXZvaWQgc2hpZnQgbWlzdGFrZXMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkluIHRoZSBleHByZXNzaW9uIHgoNHQgLSA4KSwgd2hhdCBpcyB0aGUgc2hpZnQgYW1vdW50IGlmIHRoZSBvcGVyYXRpb24gaXMgcGVyZm9ybWVkIGFmdGVyIHNjYWxpbmcgZmlyc3Q/Iiwib3B0aW9ucyI6WyJBLiA4IHVuaXRzIGRlbGF5IiwiQi4gNCB1bml0cyBkZWxheSIsIkMuIDIgdW5pdHMgZGVsYXkiLCJELiAyIHVuaXRzIGFkdmFuY2UiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJGYWN0b3IgdGhlIGFyZ3VtZW50OiA0dCAtIDggPSA0KHQgLSAyKS4gU28gYWZ0ZXIgc2NhbGluZyBmaXJzdCwgdGhlIHNoaWZ0IGlzIGEgZGVsYXkgYnkgMi4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiI4IGlzIGIsIG5vdCB0aGUgcG9zdC1zY2FsaW5nIHNoaWZ0LiIsIkIiOiI0IGlzIHRoZSBzY2FsaW5nIGZhY3Rvciwgbm90IHRoZSBzaGlmdC4iLCJEIjoidCAtIDIgaW5kaWNhdGVzIGRlbGF5LCBub3QgYWR2YW5jZS4ifSwiaGludCI6IkFsd2F5cyBmYWN0b3Igb3V0IHRoZSBjb2VmZmljaWVudCBvZiB0LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQSBzdHVkZW50IHNheXM6ICdGb3IgeCgzdCAtIDkpLCBpZiBJIHNjYWxlIGZpcnN0LCBJIHNob3VsZCBkZWxheSBieSA5LicgRXhwbGFpbiBwcmVjaXNlbHkgd2h5IHRoaXMgaXMgd3JvbmcuIiwiaWRlYWxfYW5zd2VyIjoiSXQgaXMgd3JvbmcgYmVjYXVzZSBhZnRlciBzY2FsaW5nIGZpcnN0LCB0aGUgZXhwcmVzc2lvbiBtdXN0IGJlIHJlYWQgYXMgeFszKHQgLSAzKV0sIHNvIHRoZSBzaGlmdCBpcyBieSBiL2EgPSA5LzMgPSAzLCBub3QgOS4gQSBkZWxheSBieSA5IGFmdGVyIHNjYWxpbmcgd291bGQgcHJvZHVjZSB4WzModCAtIDkpXSA9IHgoM3QgLSAyNyksIHdoaWNoIGlzIGEgZGlmZmVyZW50IHNpZ25hbC4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IHJld3JpdGUgM3QgLSA5IGFzIDModCAtIDMpIG9yIHN0YXRlIHNoaWZ0IGlzIGIvYSIsIk11c3Qgc3RhdGUgdGhlIGNvcnJlY3Qgc2hpZnQgaXMgMyIsIk11c3QgZXhwbGFpbiB0aGF0IGRlbGF5aW5nIGJ5IDkgZ2l2ZXMgYSBkaWZmZXJlbnQgYXJndW1lbnQsIG5vdCB0aGUgdGFyZ2V0IHNpZ25hbCJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQgdW5kZXJzdGFuZHMgdGhlIGFsZ2VicmEgYmVoaW5kIHRoZSBvcGVyYXRpb24sIG5vdCBqdXN0IHRoZSBwYXR0ZXJuLiIsImhpbnQiOiJDb21wYXJlIHhbMyh0IC0gMyldIHdpdGggeFszKHQgLSA5KV0uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJuZWdhdGl2ZV9zY2FsaW5nX3JldmVyc2FsIiwibGFiZWwiOiJOZWdhdGl2ZSBzY2FsaW5nIGluY2x1ZGVzIHRpbWUgcmV2ZXJzYWwiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hhdCBleHRyYSBlZmZlY3QgaXMgYXV0b21hdGljYWxseSBpbmNsdWRlZCB3aGVuIGEgPCAwIGluIHgoYXQgLSBiKT8iLCJvcHRpb25zIjpbIkEuIEFtcGxpdHVkZSBzY2FsaW5nIiwiQi4gVGltZSByZXZlcnNhbCIsIkMuIFZlcnRpY2FsIHNoaWZ0aW5nIiwiRC4gRGlmZmVyZW50aWF0aW9uIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiQSBuZWdhdGl2ZSB0aW1lLXNjYWxpbmcgZmFjdG9yIHJlZmxlY3RzIHRoZSBzaWduYWwgaW4gdGltZSwgc28gcmV2ZXJzYWwgaXMgYnVpbHQgaW50byB0aGUgb3BlcmF0aW9uLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBleHByZXNzaW9uIGNoYW5nZXMgdGltZSwgbm90IGFtcGxpdHVkZS4iLCJDIjoiVGhlcmUgaXMgbm8gdmVydGljYWwgc2hpZnQgaW4geChhdCAtIGIpLiIsIkQiOiJEaWZmZXJlbnRpYXRpb24gaXMgdW5yZWxhdGVkIGhlcmUuIn0sImhpbnQiOiJUaGluayBvZiB0aGUgdGV4dGJvb2sncyB4KHQpIHZlcnN1cyB4KC10KSBmaWd1cmUuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImJvb2tfZmlndXJlX3RpbWVfcmV2ZXJzYWwiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCByZXdyaXRlIGlzIG1vc3QgdXNlZnVsIGZvciByZWFkaW5nIHRoZSBzaGlmdCBjb3JyZWN0bHkgaW4geCgtMnQgLSA2KT8iLCJvcHRpb25zIjpbIkEuIHhbLTIodCAtIDMpXSIsIkIuIHhbLTIodCArIDMpXSIsIkMuIHhbMih0IC0gMyldIiwiRC4geFsyKHQgKyAzKV0iXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJGYWN0b3JpbmcgZ2l2ZXMgLTJ0IC0gNiA9IC0yKHQgKyAzKS4gVGhpcyBtYWtlcyB0aGUgbmVnYXRpdmUgc2NhbGluZyBhbmQgdGhlIHNoaWZ0IGRpcmVjdGlvbiB2aXNpYmxlIGF0IHRoZSBzYW1lIHRpbWUuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBleHBhbmRzIHRvIC0ydCArIDYsIG5vdCB0aGUgdGFyZ2V0IGV4cHJlc3Npb24uIiwiQyI6IlRoaXMgbG9zZXMgdGhlIHJldmVyc2FsIGJlY2F1c2UgdGhlIGZhY3RvciBzaG91bGQgYmUgbmVnYXRpdmUuIiwiRCI6IlRoaXMgZXhwYW5kcyB0byAydCArIDYsIHdoaWNoIGlzIGRpZmZlcmVudC4ifSwiaGludCI6IkZhY3RvciBvdXQgLTIgZXhhY3RseSwgaW5jbHVkaW5nIHRoZSBzaWduLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfV19" style="display:none;"></div>%%KC_END%%
