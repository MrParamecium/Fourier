# 1.1-1 Signal Energy

> **Section Objective:** Understand signal energy as a single-number measure of signal size, learn the formula, and know when to apply it.

---

**Signal energy measures signal size by adding up squared amplitude over time.**

This section matters because exams regularly ask you to choose the correct size measure and compute it from a graph or formula. Getting this wrong is one of the most common beginner mistakes.

First, a quick prerequisite patch: an **integral** simply adds up many tiny pieces across time — think of it as a very fine-grained sum.

Now, why not just measure amplitude alone? Because a short, strong signal and a long, weak signal can have very different total effects, even if their peak heights look similar. Amplitude alone misses the duration story.

This section will show you why plain signed area fails as a size measure, why squaring fixes the problem, and how to read the energy formula symbol by symbol.

## 1. Why Area Under x(t) Is Not Enough

Imagine a signal that rises to +3 for one second, then dips to -3 for another second. If you simply add up the area under that curve, the positive part and the negative part cancel perfectly — the result is zero. But the signal is clearly not small or silent. It was swinging between +3 and -3 the entire time.

This is the core problem with using the plain integral of x(t) as a size measure: **positive and negative parts should not cancel when we measure size.**

So instead of integrating x(t) directly, we use the integral of **|x(t)|²**. Let's unpack each symbol:

- **x(t)** — the signal's value at time t
- **|x(t)|** — the magnitude (absolute value), which removes any negative sign
- **|x(t)|²** — squaring ensures every contribution is nonnegative, no matter what

By squaring first, we guarantee that every moment in time adds something positive to the total. The size measure can never be fooled by cancellation.

$$E_x = \int_{-\infty}^{\infty} |x(t)|^2\,dt$$
*Read this formula in three steps:

1. **E_x** is the signal energy — a single number that summarizes the total size of the signal.
2. **|x(t)|²** is the squared magnitude of the signal at time t — it tells you how large the signal is at one particular instant, always as a nonnegative number.
3. **The integral from −∞ to ∞** adds that squared size over all time, from the far left of the time axis to the far right.

For a real-valued signal (one with no imaginary part), the absolute value bars are not needed because squaring already removes any negative sign. In that case the formula simplifies to E_x = ∫ x²(t) dt.*

![Figure 1.1](/figures/page-066-figure_1_1-1.png)
*Panel (a) shows a signal whose amplitude fades toward zero as time grows large, making finite energy possible; panel (b) shows a signal that persists indefinitely, so energy would grow without bound and is not a suitable finite size measure.*

## 2. When Is Energy the Right Measure?

Energy is a useful size measure only when the energy integral actually converges to a finite number. The textbook states a necessary condition for this: **the signal amplitude must go to zero as |t| goes to infinity.**

In plain English: look very far to the left on the time axis, and very far to the right. If the signal is still bouncing around at a nonzero level out there, the energy integral keeps accumulating forever and never settles. The signal must **die away** in both directions for finite energy to be possible.

This is a necessary condition — it tells you when energy *might* be finite, not a guarantee that it always will be. You still need to evaluate the integral.

Energy is not the only size measure. For signals that persist forever, a different measure called **power** is more appropriate — that is the topic of the next section.

#### Exam Reminder
If the waveform does not die away as time goes far left or far right, be cautious about calling it an energy signal.

![Fig. 1.2](/figures/page-067-fig_12-1.png)
*Example 1.1(a) is a good energy-signal example: the rectangular pulse is limited in time and the exponential tail decays smoothly toward zero, so the energy integral converges to a finite value.*

## 3. Worked Example: Reading Energy From a Graph

Let's walk through Example 1.1(a) step by step.

**What the graph shows:**
- From t = −1 to t = 0, the signal equals 2 (a flat rectangular pulse).
- For t > 0, the signal becomes 2e^(−t/2) (an exponential that decays toward zero).
- Outside these regions, the signal is zero.

**Setting up the energy integral piece by piece:**

Because the signal has two distinct pieces, we handle each one separately:

E_x = ∫ from −1 to 0 of (2)² dt + ∫ from 0 to ∞ of (2e^(−t/2))² dt

**Simplifying each piece:**

- First piece: (2)² = 4, and the interval length is 1, so this contributes **4 × 1 = 4**.
- Second piece: (2e^(−t/2))² = 4e^(−t). Integrating 4e^(−t) from 0 to ∞ gives **4 × 1 = 4**.

**Final result:**

E_x = 4 + 4 = **8**

#### Takeaway
Energy adds contributions from every time interval, so piecewise signals are handled one piece at a time.

---
**📌 Key Takeaways**
- Signal energy = integral of |x(t)|² over all time; squaring prevents positive/negative cancellation.
- For energy to be finite, the signal must die away as |t| goes to infinity.
- Piecewise signals: split the integral at each breakpoint and add the results.

*Formula reference: E_x = ∫ |x(t)|² dt — square the signal, then integrate over all time.

In the next section we will see when power is a better size measure than energy.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImVuZXJneV9kZWZpbml0aW9uIiwibGFiZWwiOiJEZWZpbml0aW9uIG9mIHNpZ25hbCBlbmVyZ3kiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGZvcm11bGEgY29ycmVjdGx5IGRlZmluZXMgdGhlIGVuZXJneSBvZiBhIHNpZ25hbCB4KHQpPyIsIm9wdGlvbnMiOlsiQS4gRV94ID0gXFxpbnRfey1cXGluZnR5fV57XFxpbmZ0eX0geCh0KVxcLGR0IiwiQi4gRV94ID0gXFxpbnRfey1cXGluZnR5fV57XFxpbmZ0eX0gfHgodCl8XjJcXCxkdCIsIkMuIEVfeCA9IFxcbGltX3tUXFx0b1xcaW5mdHl9IFxcZnJhY3sxfXtUfVxcaW50X3stVC8yfV57VC8yfSB8eCh0KXxeMlxcLGR0IiwiRC4gRV94ID0gfHgodCl8XjIiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJTaWduYWwgZW5lcmd5IGlzIGRlZmluZWQgYnkgaW50ZWdyYXRpbmcgdGhlIHNxdWFyZWQgbWFnbml0dWRlIG92ZXIgYWxsIHRpbWUuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBpcyBzaWduZWQgYXJlYSwgd2hpY2ggY2FuIGNhbmNlbCBhbmQgZG9lcyBub3QgcmVsaWFibHkgbWVhc3VyZSBzaWduYWwgc2l6ZS4iLCJDIjoiVGhpcyBpcyB0aGUgZGVmaW5pdGlvbiBvZiBhdmVyYWdlIHBvd2VyLCBub3QgZW5lcmd5LiIsIkQiOiJUaGlzIGlzIG9ubHkgdGhlIHNxdWFyZWQgbWFnbml0dWRlIGF0IG9uZSBpbnN0YW50LCBub3Qgb3ZlciBhbGwgdGltZS4ifSwiaGludCI6IkVuZXJneSBtdXN0IGluY2x1ZGUgYm90aCBzcXVhcmluZyBhbmQgYWRkaW5nIG92ZXIgdGltZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkluIG9uZSBvciB0d28gc2VudGVuY2VzLCBleHBsYWluIHdoeSDiiKsgeCh0KSBkdCBpcyBhIGRlZmVjdGl2ZSBtZWFzdXJlIG9mIHNpZ25hbCBzaXplLiIsImlkZWFsX2Fuc3dlciI6IlBvc2l0aXZlIGFuZCBuZWdhdGl2ZSBwYXJ0cyBvZiB4KHQpIGNhbiBjYW5jZWwgaW4gdGhlIGludGVncmFsLCBzbyBhIHNpZ25hbCB0aGF0IGlzIGNsZWFybHkgbGFyZ2UgbWF5IGFwcGVhciBzbWFsbC4gVXNpbmcgfHgodCl8wrIgYXZvaWRzIHRoaXMgY2FuY2VsbGF0aW9uIGJlY2F1c2UgZXZlcnkgY29udHJpYnV0aW9uIGlzIG5vbm5lZ2F0aXZlLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3QgbWVudGlvbiBjYW5jZWxsYXRpb24gb2YgcG9zaXRpdmUgYW5kIG5lZ2F0aXZlIGFyZWFzIiwiTXVzdCBzdGF0ZSB0aGF0IHx4KHQpfMKyIHByZXZlbnRzIHRoaXMgcHJvYmxlbSIsIkFuc3dlciBjYW4gYmUgYnJpZWYgYnV0IG11c3QgYmUgY29uY2VwdHVhbGx5IHByZWNpc2UiXSwiZXhwbGFuYXRpb24iOiJUaGlzIGNoZWNrcyB3aGV0aGVyIHRoZSBzdHVkZW50IHVuZGVyc3RhbmRzIHRoZSByZWFzb24gZm9yIHNxdWFyaW5nLCBub3QganVzdCB0aGUgZm9ybXVsYS4iLCJoaW50IjoiVGhpbmsgYWJvdXQgYSBzaWduYWwgdGhhdCBnb2VzIGFib3ZlIGFuZCBiZWxvdyB6ZXJvLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoic3ltYm9sX3JlYWRpbmciLCJsYWJlbCI6IlJlYWRpbmcgdGhlIGZvcm11bGEgc3ltYm9sIGJ5IHN5bWJvbCIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkluIEVfeCA9IOKIqyBmcm9tIOKIkuKIniB0byDiiJ4gb2YgfHgodCl8wrIgZHQsIHdoYXQgZG9lcyBkdCB0ZWxsIHlvdT8iLCJvcHRpb25zIjpbIkEuIFNxdWFyZSB0aGUgdGltZSB2YXJpYWJsZSIsIkIuIEFkZCB0aGUgc2lnbmFsIG9ubHkgYXQgdCA9IDAiLCJDLiBBZGQgY29udHJpYnV0aW9ucyBvdmVyIHRpbnkgdGltZSBpbnRlcnZhbHMiLCJELiBUYWtlIHRoZSBkZXJpdmF0aXZlIG9mIHgodCkiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJUaGUgZHQgaW5kaWNhdGVzIGludGVncmF0aW9uIHdpdGggcmVzcGVjdCB0byB0aW1lLCBtZWFuaW5nIHdlIGFkZCBtYW55IHRpbnkgdGltZSBjb250cmlidXRpb25zLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZXJlIGlzIG5vIGluc3RydWN0aW9uIGhlcmUgdG8gc3F1YXJlIHRpbWUuIiwiQiI6IlRoZSBpbnRlZ3JhbCBydW5zIG92ZXIgYWxsIHRpbWUsIG5vdCBqdXN0IHQgPSAwLiIsIkQiOiJkdCBpbiBhbiBpbnRlZ3JhbCBkb2VzIG5vdCBtZWFuIGRpZmZlcmVudGlhdGUgeCh0KS4ifSwiaGludCI6IkFuIGludGVncmFsIGlzIGFuIGFkZGluZyBwcm9jZXNzIGFjcm9zcyBhIHZhcmlhYmxlLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6ImZpbml0ZV9lbmVyZ3lfY29uZGl0aW9uIiwibGFiZWwiOiJSZWNvZ25pemluZyB3aGVuIGVuZXJneSBjYW4gYmUgZmluaXRlIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJBY2NvcmRpbmcgdG8gdGhlIHNlY3Rpb24sIHdoaWNoIHN0YXRlbWVudCBpcyBhIG5lY2Vzc2FyeSBjb25kaXRpb24gZm9yIGEgc2lnbmFsIHRvIGhhdmUgZmluaXRlIGVuZXJneT8iLCJvcHRpb25zIjpbIkEuIHgodCkgbXVzdCBiZSBwZXJpb2RpYyIsIkIuIHgodCkgbXVzdCBiZSBwb3NpdGl2ZSBmb3IgYWxsIHQiLCJDLiB4KHQpIG11c3QgZ28gdG8gMCBhcyB8dHwgZ29lcyB0byBpbmZpbml0eSIsIkQuIHgodCkgbXVzdCBiZSBjb25zdGFudCJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlRoZSB0ZXh0IHN0YXRlcyB0aGF0IGZvciB0aGUgZW5lcmd5IGludGVncmFsIHRvIGJlIGZpbml0ZSwgYSBuZWNlc3NhcnkgY29uZGl0aW9uIGlzIHRoYXQgdGhlIHNpZ25hbCBkaWVzIGF3YXkgYXMgdGltZSBnb2VzIGZhciBsZWZ0IGFuZCBmYXIgcmlnaHQuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiUGVyaW9kaWMgc2lnbmFscyB1c3VhbGx5IGxlYWQgbmF0dXJhbGx5IHRvIHBvd2VyIGRpc2N1c3Npb25zLCBub3QgZmluaXRlIGVuZXJneSBvdmVyIGFsbCB0aW1lLiIsIkIiOiJBIHNpZ25hbCBjYW4gaGF2ZSBmaW5pdGUgZW5lcmd5IGV2ZW4gaWYgaXQgY2hhbmdlcyBzaWduLiIsIkQiOiJBIG5vbnplcm8gY29uc3RhbnQgc2lnbmFsIG92ZXIgYWxsIHRpbWUgZ2l2ZXMgaW5maW5pdGUgZW5lcmd5LiJ9LCJoaW50IjoiQXNrIHdoZXRoZXIgdGhlIHNpZ25hbCBkaWVzIGF3YXkgb3Iga2VlcHMgZ29pbmcgZm9yZXZlci4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgd2F2ZWZvcm0gc3RheXMgbmVhciB0aGUgc2FtZSBub256ZXJvIHNpemUgZm9yZXZlciBpbnN0ZWFkIG9mIGZhZGluZyBvdXQuIFdoYXQgaXMgdGhlIHNhZmVzdCBleGFtIGNvbmNsdXNpb24/Iiwib3B0aW9ucyI6WyJBLiBJdCBkZWZpbml0ZWx5IGhhcyBmaW5pdGUgZW5lcmd5IiwiQi4gQmUgY2F1dGlvdXM6IGVuZXJneSBpcyBub3QgbGlrZWx5IHRoZSByaWdodCBmaW5pdGUgc2l6ZSBtZWFzdXJlIiwiQy4gSXRzIGVuZXJneSBtdXN0IGJlIHplcm8iLCJELiBJdCBjYW4gb25seSBiZSBhbmFseXplZCB3aXRoIGRlcml2YXRpdmVzIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiSWYgdGhlIHNpZ25hbCBkb2VzIG5vdCBkaWUgYXdheSBhcyB8dHwgYmVjb21lcyBsYXJnZSwgdGhlIGVuZXJneSBpbnRlZ3JhbCB3aWxsIGdlbmVyYWxseSBub3QgY29udmVyZ2UgdG8gYSBmaW5pdGUgdmFsdWUsIHNvIGVuZXJneSBpcyB1c3VhbGx5IG5vdCB0aGUgc3VpdGFibGUgZmluaXRlIG1lYXN1cmUuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBnb2VzIGFnYWluc3QgdGhlIGtleSB3YXJuaW5nIGZyb20gdGhlIHNlY3Rpb24uIiwiQyI6IkEgcGVyc2lzdGVudCBub256ZXJvIHNpZ25hbCBkb2VzIG5vdCBoYXZlIHplcm8gZW5lcmd5LiIsIkQiOiJEZXJpdmF0aXZlcyBhcmUgdW5yZWxhdGVkIHRvIHRoZSBiYXNpYyBlbmVyZ3ktdnMtcGVyc2lzdGVuY2UgaWRlYSBoZXJlLiJ9LCJoaW50IjoiQ29ubmVjdCB0aGlzIHdpdGggRmlndXJlIDEuMShiKS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoic2ltcGxlIHR3by1wYW5lbCBtYXRwbG90bGliIHNrZXRjaCBjb250cmFzdGluZyBhIGRlY2F5aW5nIHNpZ25hbCBhbmQgYSBwZXJzaXN0ZW50IHNpZ25hbCIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiZ3JhcGhfYmFzZWRfc2V0dXAiLCJsYWJlbCI6IlNldHRpbmcgdXAgZW5lcmd5IGZyb20gYSBncmFwaCIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNF9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiU3VwcG9zZSB4KHQpID0gMiBmb3Ig4oiSMSDiiaQgdCDiiaQgMCBhbmQgeCh0KSA9IDAgZWxzZXdoZXJlLiBXaGF0IGlzIHRoZSBlbmVyZ3k/Iiwib3B0aW9ucyI6WyJBLiAxIiwiQi4gMiIsIkMuIDQiLCJELiA4Il0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiRW5lcmd5IGlzIOKIqyB8eCh0KXzCsiBkdCA9IOKIqyBmcm9tIOKIkjEgdG8gMCBvZiAywrIgZHQgPSA0IMOXIDEgPSA0LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgaWdub3JlcyB0aGUgYW1wbGl0dWRlIHNxdWFyZWQuIiwiQiI6IlRoaXMgdXNlcyBhbXBsaXR1ZGUgcmF0aGVyIHRoYW4gc3F1YXJlZCBhbXBsaXR1ZGUuIiwiRCI6IlRoaXMgZG91YmxlcyB0aGUgY29ycmVjdCByZXN1bHQuIn0sImhpbnQiOiJTcXVhcmUgdGhlIGhlaWdodCBmaXJzdCwgdGhlbiBtdWx0aXBseSBieSB0aGUgdGltZSB3aWR0aC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoibWF0cGxvdGxpYiByZWN0YW5nbGUgcHVsc2UgZnJvbSB0PS0xIHRvIDAgd2l0aCBoZWlnaHQgMiIsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
