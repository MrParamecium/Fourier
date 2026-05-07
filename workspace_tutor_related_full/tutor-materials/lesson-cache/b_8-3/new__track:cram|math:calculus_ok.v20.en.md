%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImdlbmVyYXRlZF9pbWFnZSIsInJhdGlvbmFsZSI6IlRoaXMgc2VjdGlvbiBpcyBhIGZvcm11bGEtcmVmZXJlbmNlIHBhZ2Ugd2l0aCBubyB1c2FibGUgdGV4dGJvb2sgZmlndXJlcy4gQSBnZW5lcmF0ZWQgbGVjdHVyZS1ub3RlcyB2aXN1YWwgaXMgdGhlIGNsZWFyZXN0IHdheSB0byBoZWxwIHN0dWRlbnRzIHJlY29nbml6ZSB3aGljaCBzdW0gZm9ybXVsYSBtYXRjaGVzIHdoaWNoIHBhdHRlcm4uIiwiY3JhbSI6IlVzZSBvbmUgZGVjaXNpb24tbWFwIHZpc3VhbCBzbyBzdHVkZW50cyBjYW4gaWRlbnRpZnkgdGhlIGZvcm11bGEgdHlwZSBpbiBzZWNvbmRzOiBwbGFpbiBnZW9tZXRyaWMsIHBsYWluIGludGVnZXIgc3VtLCBzcXVhcmUgc3VtLCBvciBrLXdlaWdodGVkIGdlb21ldHJpYyBzdW0uIiwic3RhbmRhcmQiOiJVc2UgdGhlIHZpc3VhbCB0byBjb25uZWN0IGVhY2ggc3VtbWF0aW9uIHBhdHRlcm4gdG8gaXRzIGNsb3NlZCBmb3JtIGFuZCB0aGUgY29uZGl0aW9uIG9uIHIuIiwidG9wX3Njb3JlIjoiVXNlIHRoZSB2aXN1YWwgdG8gZXhwb3NlIGluZGV4LXNoaWZ0IHRyYXBzLCByID0gMSByZXN0cmljdGlvbnMsIGFuZCB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHJrLCBrLCBrXjIsIGtyXmssIGFuZCBrXjJyXmsuIn0=" style="display:none;"></div>%%KC_END%%
# B.8-3 Summation Formulas — Quick Reference

> **Exam Payoff:** These formulas save minutes on exams. Questions test pattern recognition, not re-derivation — your job is to match the summand to the right formula instantly.

---

### BIGGEST TRAP

Choosing the wrong sum type, or forgetting the condition \(r \ne 1\) on geometric formulas.

This section covers **four formula families**:

1. **Geometric sum** — terms of the form \(r^k\)
2. **Sum of integers** — summand is just \(k\)
3. **Sum of squares** — summand is \(k^2\)
4. **Weighted geometric sums** — summand is \(k r^k\) or \(k^2 r^k\)

Know which pattern you are looking at before you reach for any formula.


## 1. Recognize the Sum Type First

The fastest recognition rules:

- **Terms multiply by the same factor each step?** → Geometric sum. Use the \(r^k\) formula.
- **Summand is just \(k\)?** → Integer-sum formula.
- **Summand is \(k^2\)?** → Square-sum formula.
- **\(k\) is attached to \(r^k\)?** → Weighted geometric formula — do NOT use the plain geometric formula.

The appendix gives you the formulas. The exam move is **selection**, not re-derivation.

### COMMON TRAPS

1. **Mixing up \(k\) with \(r^k\):** If you see \(k \cdot r^k\), the plain geometric formula is wrong — you need the weighted version.
2. **Ignoring the lower index \(m\):** In \(\sum_{k=m}^{n} r^k\), the starting index \(m\) changes the first power included. The numerator uses \(r^m\), not \(r^0\).

$$\sum_{k=m}^{n} r^k = \frac{r^{n+1}-r^m}{r-1},\; r \ne 1$$
*This is the geometric-sum formula for a run of powers from \(k = m\) to \(k = n\). The lower limit \(m\) matters directly: it sets the first power in the numerator as \(r^m\), so shifting the starting index changes the result.*

## 2. The Must-Memorize Formulas

Group these by summand pattern — that is the only thing you need to match on an exam.

| Summand | Formula family | Exam frequency |
|---------|---------------|----------------|
| \(k\) | Integer sum | High |
| \(k^2\) | Square sum | High |
| \(r^k\) | Geometric sum | High |
| \(k r^k\) | Weighted geometric | Lower, but high-value |
| \(k^2 r^k\) | Weighted geometric (squared) | Lower, but high-value |

**Fastest wins:** \(\sum k\), \(\sum k^2\), and plain geometric sum. Know these cold.

**Weighted geometric sums** (\(\sum k r^k\), \(\sum k^2 r^k\)) appear less often, but students frequently freeze when they do — knowing the formula is an instant advantage.

### EXAM TIP

Memorize the **visual shape of each summand**, not just the final algebraic form. Recognizing \(k r^k\) versus \(r^k\) at a glance is the real skill.

$$\sum_{k=0}^{n} k = \frac{n(n+1)}{2}, \qquad \sum_{k=0}^{n} k^2 = \frac{n(n+1)(2n+1)}{6}$$
*These are the standard closed forms for the sum of the first \(n\) integers and the sum of the first \(n\) squares — recall them immediately when you see a summand of \(k\) or \(k^2\) with no \(r^k\) factor.*

$$\sum_{k=0}^{n} k r^k = \frac{r + [n(r-1)-1]r^{n+1}}{(r-1)^2},\; r \ne 1$$
*This is the weighted geometric sum formula — it applies when the coefficient \(k\) multiplies each power term \(r^k\), distinguishing it from the plain geometric sum where no such \(k\) factor is present.*

---
**📌 Key Takeaways**
- Match the summand pattern first — geometric, integer, square, or weighted geometric.
- Always check \(r \ne 1\) before applying any geometric or weighted geometric formula.
- Watch the lower index \(m\): it sets the starting power in the geometric-sum numerator.

*In the next section we will use the reference formulas that best fit the problem structure.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InN1bV90eXBlX3JlY29nbml0aW9uIiwibGFiZWwiOiJSZWNvZ25pemUgd2hpY2ggc3VtbWF0aW9uIGZvcm11bGEgYXBwbGllcyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggZm9ybXVsYSBpcyB0aGUgYmVzdCBkaXJlY3QgbWF0Y2ggZm9yIFxcKFxcc3VtX3trPTB9XntufSBrXjJcXCk/Iiwib3B0aW9ucyI6WyJBLiBHZW9tZXRyaWMtc3VtIGZvcm11bGEiLCJCLiBcXChcXHN1bV97az0wfV57bn0gayA9IG4obisxKS8yXFwpIiwiQy4gXFwoXFxzdW1fe2s9MH1ee259IGteMiA9IG4obisxKSgybisxKS82XFwpIiwiRC4gV2VpZ2h0ZWQgZ2VvbWV0cmljIGZvcm11bGEgZm9yIFxcKFxcc3VtIGsgcl5rXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiVGhlIHN1bW1hbmQgaXMgZXhhY3RseSBcXChrXjJcXCksIHNvIHRoZSBzcXVhcmUtc3VtIGZvcm11bGEgYXBwbGllcyBkaXJlY3RseS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJBIGdlb21ldHJpYyBzdW0gbmVlZHMgcG93ZXJzIGxpa2UgXFwocl5rXFwpLCBub3QgXFwoa14yXFwpLiIsIkIiOiJUaGF0IGZvcm11bGEgaXMgb25seSBmb3IgdGhlIGZpcnN0IHBvd2VycyBvZiBcXChrXFwpLCBub3Qgc3F1YXJlcy4iLCJEIjoiVGhhdCBmb3JtdWxhIHJlcXVpcmVzIGEgZmFjdG9yIFxcKHJea1xcKSwgd2hpY2ggaXMgYWJzZW50IGhlcmUuIn0sImhpbnQiOiJMb29rIG9ubHkgYXQgdGhlIHN1bW1hbmQgcGF0dGVybiBiZWZvcmUgdGhpbmtpbmcgYWJvdXQgYWxnZWJyYS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgc3R1ZGVudCBzZWVzIFxcKFxcc3VtX3trPTB9XntufSBrXFwsMl5rXFwpLiBXaGljaCBmb3JtdWxhIGZhbWlseSBzaG91bGQgdGhleSBjaG9vc2UgZmlyc3Q/Iiwib3B0aW9ucyI6WyJBLiBQbGFpbiBnZW9tZXRyaWMgc3VtIiwiQi4gSW50ZWdlci1zdW0gZm9ybXVsYSIsIkMuIFNxdWFyZS1zdW0gZm9ybXVsYSIsIkQuIFdlaWdodGVkIGdlb21ldHJpYyBzdW0iXSwiY29ycmVjdF9vcHRpb24iOiJEIiwiZXhwbGFuYXRpb24iOiJUaGUgZmFjdG9yIFxcKGtcXCkgbXVsdGlwbGllcyBhIGdlb21ldHJpYyB0ZXJtIFxcKDJea1xcKSwgc28gdGhpcyBpcyBhIHdlaWdodGVkIGdlb21ldHJpYyBzdW0uIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiUGxhaW4gZ2VvbWV0cmljIHN1bXMgZG8gbm90IGluY2x1ZGUgdGhlIGV4dHJhIGZhY3RvciBcXChrXFwpLiIsIkIiOiJUaGUgdGVybXMgYXJlIG5vdCBqdXN0IFxcKGtcXCk7IHRoZXkgYWxzbyBjb250YWluIFxcKDJea1xcKS4iLCJDIjoiVGhlIHN1bW1hbmQgaXMgbm90IFxcKGteMlxcKS4ifSwiaGludCI6IklmIFxcKGtcXCkgaXMgYXR0YWNoZWQgdG8gXFwocl5rXFwpLCB0aGluayB3ZWlnaHRlZCBnZW9tZXRyaWMgaW1tZWRpYXRlbHkuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6Im9wZW5haS9ncHQtNS40LWltYWdlLTIiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6Imdlb21ldHJpY19zdW1fZGV0YWlscyIsImxhYmVsIjoiVXNlIHRoZSBnZW9tZXRyaWMtc3VtIGZvcm11bGEgd2l0aCBjb3JyZWN0IGxpbWl0cyBhbmQgY29uZGl0aW9uIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBjbG9zZWQgZm9ybSBtYXRjaGVzIFxcKFxcc3VtX3trPTN9Xns3fSByXmtcXCkgZm9yIFxcKHIgXFxuZSAxXFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoXFxkZnJhY3tyXjgtcl4zfXtyLTF9XFwpIiwiQi4gXFwoXFxkZnJhY3tyXjctcl4zfXtyLTF9XFwpIiwiQy4gXFwoXFxkZnJhY3tyXjgtcl4yfXtyLTF9XFwpIiwiRC4gXFwoXFxkZnJhY3tyXjctcl4yfXtyLTF9XFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVXNlIFxcKFxcc3VtX3trPW19XntufSByXmsgPSAocl57bisxfS1yXm0pLyhyLTEpXFwpLiBIZXJlIFxcKG0gPSAzXFwpIGFuZCBcXChuID0gN1xcKSwgc28gdGhlIHJlc3VsdCBpcyBcXCgocl44LXJeMykvKHItMSlcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhlIHRvcCBleHBvbmVudCBzaG91bGQgYmUgXFwobisxID0gOFxcKSwgbm90IFxcKG4gPSA3XFwpLiIsIkMiOiJUaGUgbG93ZXIgZXhwb25lbnQgc2hvdWxkIGJlIFxcKG0gPSAzXFwpLCBub3QgXFwobS0xID0gMlxcKS4iLCJEIjoiQm90aCB0aGUgdG9wIGFuZCBsb3dlciBleHBvbmVudHMgYXJlIHNoaWZ0ZWQgaW5jb3JyZWN0bHkuIn0sImhpbnQiOiJNZW1vcml6ZSB0aGUgZXhwb25lbnQgcGF0dGVybjogdG9wIGlzIFxcKG4rMVxcKSwgYm90dG9tIGlzIFxcKG1cXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AyX3EyIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJXaHkgaXMgdGhlIGNvbmRpdGlvbiBcXChyIFxcbmUgMVxcKSB3cml0dGVuIG5leHQgdG8gdGhlIGdlb21ldHJpYy1zdW0gZm9ybXVsYT8iLCJpZGVhbF9hbnN3ZXIiOiJCZWNhdXNlIHRoZSBkZW5vbWluYXRvciBpcyBcXChyLTFcXCksIHNvIGlmIFxcKHI9MVxcKSB0aGUgZm9ybXVsYSBkaXZpZGVzIGJ5IHplcm8gYW5kIGNhbm5vdCBiZSB1c2VkIGluIHRoYXQgZm9ybS4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IG1lbnRpb24gdGhlIGRlbm9taW5hdG9yIFxcKHIgLSAxXFwpIiwiTXVzdCBzdGF0ZSB0aGF0IFxcKHIgPSAxXFwpIGNhdXNlcyBkaXZpc2lvbiBieSB6ZXJvIiwiTXVzdCBzYXkgdGhlIGdpdmVuIGNsb3NlZCBmb3JtIGlzIGludmFsaWQgd2hlbiBcXChyID0gMVxcKSJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQgbm90aWNlcyB0aGUgZG9tYWluIHJlc3RyaWN0aW9uIGluc3RlYWQgb2YgYmxpbmRseSBhcHBseWluZyB0aGUgZm9ybXVsYS4iLCJoaW50IjoiTG9vayBhdCB0aGUgZGVub21pbmF0b3Igb2YgdGhlIGNsb3NlZCBmb3JtLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6InN0YW5kYXJkX2Nsb3NlZF9mb3JtcyIsImxhYmVsIjoiUmVjYWxsIHN0YW5kYXJkIGNsb3NlZCBmb3JtcyBmb3Igc3VtIGsgYW5kIHN1bSBrIHNxdWFyZWQiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggZXhwcmVzc2lvbiBlcXVhbHMgXFwoXFxzdW1fe2s9MH1ee259IGtcXCk/Iiwib3B0aW9ucyI6WyJBLiBcXChcXGRmcmFje24obisxKX17Mn1cXCkiLCJCLiBcXChcXGRmcmFje24obisxKSgybisxKX17Nn1cXCkiLCJDLiBcXChcXGRmcmFje24obi0xKX17Mn1cXCkiLCJELiBcXChcXGRmcmFjeyhuKzEpKDJuKzEpfXs2fVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlRoZSBzdGFuZGFyZCBmb3JtdWxhIGZvciB0aGUgc3VtIG9mIHRoZSBmaXJzdCBcXChuXFwpIGludGVnZXJzIGlzIFxcKG4obisxKS8yXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoYXQgaXMgdGhlIHN1bSBvZiBzcXVhcmVzIGZvcm11bGEuIiwiQyI6IlRoaXMgaXMgYSBjb21tb24gbmVhci1taXNzIGJ1dCBub3QgdGhlIHN0YW5kYXJkIHJlc3VsdC4iLCJEIjoiVGhpcyBpcyBtaXNzaW5nIGEgZmFjdG9yIG9mIFxcKG5cXCkgYW5kIGRvZXMgbm90IG1hdGNoIHRoZSBjb3JyZWN0IGZvcm11bGEuIn0sImhpbnQiOiJQYWlyIGludGVnZXIgc3VtIHdpdGggdGhlIHNpbXBsZSB0d28tZmFjdG9yIG51bWVyYXRvci4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBleHByZXNzaW9uIGVxdWFscyBcXChcXHN1bV97az0wfV57bn0ga14yXFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoXFxkZnJhY3tuKG4rMSl9ezJ9XFwpIiwiQi4gXFwoXFxkZnJhY3tuKG4rMSkoMm4rMSl9ezZ9XFwpIiwiQy4gXFwoXFxkZnJhY3tuXjIobisxKV4yfXs0fVxcKSIsIkQuIFxcKFxcZGZyYWN7Mm4rMX17Nn1cXCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgc3F1YXJlLXN1bSBmb3JtdWxhIGluY2x1ZGVzIHRocmVlIGZhY3RvcnMgaW4gdGhlIG51bWVyYXRvcjogXFwoblxcKSwgXFwobisxXFwpLCBhbmQgXFwoMm4rMVxcKSwgb3ZlciBcXCg2XFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoYXQgaXMgb25seSB0aGUgZm9ybXVsYSBmb3IgXFwoXFxzdW0ga1xcKS4iLCJDIjoiVGhhdCBleHByZXNzaW9uIGlzIHJlbGF0ZWQgdG8gb3RoZXIgaWRlbnRpdGllcywgbm90IHRoZSBzdGFuZGFyZCBcXChcXHN1bSBrXjJcXCkgcmVzdWx0IGhlcmUuIiwiRCI6IlRoaXMgaXMgb25seSBhIGZyYWdtZW50IG9mIHRoZSBjb3JyZWN0IGZvcm11bGEuIn0sImhpbnQiOiJGb3Igc3F1YXJlcywgcmVtZW1iZXIgdGhlIGV4dHJhIGZhY3RvciBcXCgybisxXFwpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
