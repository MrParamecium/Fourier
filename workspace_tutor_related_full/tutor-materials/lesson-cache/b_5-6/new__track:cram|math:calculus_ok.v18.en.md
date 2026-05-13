%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6Im1hdHBsb3RsaWIiLCJyYXRpb25hbGUiOiJUaGVyZSBhcmUgbm8gdXNhYmxlIHRleHRib29rIGZpZ3VyZSBjcm9wcyBmb3IgdGhpcyBzZWN0aW9uLCBhbmQgdGhlIGtleSBleGFtIHZhbHVlIGlzIHN0cnVjdHVyYWwgcGF0dGVybiByZWNvZ25pdGlvbi4gQSBjbGVhbiBnZW5lcmF0ZWQgY29tcGFyaXNvbiBpcyBiZXR0ZXIgdGhhbiBkZW5zZSBPQ1IgbWF0aCBmb3Igc2hvd2luZyB0aGUgYmVmb3JlLWFuZC1hZnRlciBmb3JtOiBvcmRpbmFyeSBwYXJ0aWFsIGZyYWN0aW9ucyBvbiBGKHgpL3ggdmVyc3VzIG1vZGlmaWVkIHBhcnRpYWwgZnJhY3Rpb25zIGFmdGVyIG11bHRpcGx5aW5nIGJhY2sgYnkgeC4iLCJjcmFtIjoiVXNlIG9uZSBjbGVhbiBjb21wYXJpc29uIHZpc3VhbCB0byBoZWxwIHRoZSBzdHVkZW50IGluc3RhbnRseSByZWNvZ25pemUgdGhlIHNvbHZlIHBhdHRlcm46IGRpdmlkZSBieSB4LCBkZWNvbXBvc2Ugbm9ybWFsbHksIHRoZW4gbXVsdGlwbHkgYmFjay4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgdmlzdWFsIHRvIGNvbm5lY3QgdGhlIGFsZ2VicmEgc3RlcHMgYW5kIG1ha2UgdGhlIHRhcmdldCBmb3JtIGZlZWwgc3lzdGVtYXRpYyByYXRoZXIgdGhhbiBhcmJpdHJhcnkuIiwidG9wX3Njb3JlIjoiVXNlIHRoZSB2aXN1YWwgdG8gc3RyZXNzIHJlcGVhdGVkLWZhY3RvciBzdHJ1Y3R1cmUsIHRlcm0gbWF0Y2hpbmcsIGFuZCB3aGVyZSBzdHVkZW50cyBsb3NlIHBvaW50cyBieSBmb3JnZXR0aW5nIHRoZSBmaW5hbCBtdWx0aXBseS1ieS14IHN0ZXAuIn0=" style="display:none;"></div>%%KC_END%%
# B.5-6 Modified Partial Fractions

> **Section Objective:** Master the fastest exam method for rewriting a rational function into modified partial-fraction form — the kind needed for inverse z-transform work.

---

If a problem asks for terms like \(kx/(x-\lambda_i)^r\), do not try to force that form directly. The exam-winning move is: **divide by \(x\) first, do ordinary partial fractions, then multiply by \(x\) back**.

This three-step pattern appears whenever you are preparing a z-domain function for inverse z-transform lookup. The target form has \(x\) in every numerator, which is awkward to set up directly — but trivial once you recognize the shortcut.

### EXAM PATTERN TO MEMORIZE

1. Divide \(F(x)\) by \(x\) to get \(F(x)/x\)
2. Decompose \(F(x)/x\) using the standard partial-fraction template
3. Multiply every term by \(x\) to recover \(F(x)\) in modified form

Ordinary fractions first, modified fractions last.

$$F(x)=\frac{5x^2+20x+18}{(x+2)(x+3)^2}$$
*This is the running example for the section — the exam goal is not to decompose \(F(x)\) directly into ordinary partial fractions, but to rewrite it into modified partial fractions where \(x\) appears in every numerator, as required for inverse z-transform applications.*

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="exam_pattern_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgdG8gbWVtb3JpemUgdGhlIDMtc3RlcCBleGFtIHBhdHRlcm4gYXQgYSBnbGFuY2UuIiwic3RhbmRhcmQiOiJVc2UgdGhpcyB0byBjb25uZWN0IHRoZSB0YXJnZXQgZm9ybSB3aXRoIHRoZSBvcmRpbmFyeSBkZWNvbXBvc2l0aW9uIHN0ZXAuIiwidG9wX3Njb3JlIjoiVXNlIHRoaXMgdG8gaGlnaGxpZ2h0IHJlcGVhdGVkLWZhY3RvciBzbG90cyBhbmQgdGhlIGZpbmFsIHJlY29uc3RydWN0aW9uIHN0ZXAuIn0=" style="display:none;"></div>%%KC_END%%
*📊 The 3-step exam pattern: divide \(F(x)\) by \(x\), decompose \(F(x)/x\) into ordinary partial fractions, then multiply every term by \(x\) to recover the modified form.*
![Chart](/generated/fig-1777196038294-rix7jdqf.png)

## 1. Fast Setup Rule

When the target form is \(kx/(x-\lambda_i)^r\), the shortcut is to decompose \(F(x)/x\) in the usual way — not \(F(x)\) itself.

For the running example, dividing by \(x\) gives the denominator \(x(x+2)(x+3)^2\). This introduces four distinct denominator pieces:

- \(x\) — newly introduced by dividing by \(x\)
- \(x+2\) — a simple factor from the original
- \(x+3\) — first power of the repeated factor
- \((x+3)^2\) — second power of the repeated factor (required because \(x=-3\) is a repeated root)

### COMMON MISTAKE

Do **not** try to write the modified form \(kx/(x-\lambda_i)^r\) directly and solve for numerators — this leads to a messy, error-prone system. The standard template for \(F(x)/x\) is clean and mechanical.

#### Memory Cue

Ordinary fractions first, modified fractions last.

$$\frac{F(x)}{x}=\frac{5x^2+20x+18}{x(x+2)(x+3)^2}=\frac{a_1}{x}+\frac{a_2}{x+2}+\frac{a_3}{x+3}+\frac{a_4}{(x+3)^2}$$
*This is the standard partial-fraction template formed from one simple factor \(x\), one simple factor \(x+2\), and one repeated factor \((x+3)^2\) — which requires both a first-power term \(a_3/(x+3)\) and a second-power term \(a_4/(x+3)^2\).*

## 2. Finish the Example Fast

Solving the ordinary partial-fraction system for \(F(x)/x\) gives the coefficients directly:

$$a_1 = 1, \quad a_2 = 1, \quad a_3 = -2, \quad a_4 = 1$$

Substituting into the template:

$$\frac{F(x)}{x} = \frac{1}{x}+\frac{1}{x+2}-\frac{2}{x+3}+\frac{1}{(x+3)^2}$$

Now multiply **every term** by \(x\):

$$F(x) = 1+\frac{x}{x+2}-\frac{2x}{x+3}+\frac{x}{(x+3)^2}$$

### EXAM TIP

The constant \(1\) in the final answer is **not a mistake**. It comes from \(x \cdot (1/x) = 1\). Every term — including the \(1/x\) term — must be multiplied by \(x\). Students who skip this step or forget the \(1/x\) term will lose marks.

$$\frac{F(x)}{x}=\frac{1}{x}+\frac{1}{x+2}-\frac{2}{x+3}+\frac{1}{(x+3)^2}$$
*Once this ordinary decomposition of \(F(x)/x\) is known, the modified partial-fraction form of \(F(x)\) is obtained immediately by multiplying the entire equation by \(x\).*

$$F(x)=1+\frac{x}{x+2}-\frac{2x}{x+3}+\frac{x}{(x+3)^2}$$
*This is the required modified partial-fraction form, where each nonconstant term now has \(x\) in the numerator — exactly the structure needed for inverse z-transform table lookup.*

---
**📌 Key Takeaways**
- Use modified partial fractions when the target form is \(kx/(x-\lambda_i)^r\) for inverse z-transform work.
- Three-step pattern: divide \(F(x)\) by \(x\), decompose \(F(x)/x\) normally, then multiply every term by \(x\).
- Biggest trap: forgetting that \(x \cdot (1/x) = 1\), so a constant term in the final answer is valid.

*In the next section we will move to vectors and matrices.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6IndoZW5fdG9fdXNlX21vZGlmaWVkX3BhcnRpYWxfZnJhY3Rpb25zIiwibGFiZWwiOiJSZWNvZ25pemUgd2hlbiBtb2RpZmllZCBwYXJ0aWFsIGZyYWN0aW9ucyBhcmUgcmVxdWlyZWQiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgcHJvYmxlbSBhc2tzIHlvdSB0byByZXdyaXRlIGEgcmF0aW9uYWwgZnVuY3Rpb24gaW4gdGVybXMgbGlrZSBcXChreC8oeC1cXGxhbWJkYSleclxcKSBmb3IgaW52ZXJzZSB6LXRyYW5zZm9ybSB1c2UuIFdoYXQgaXMgdGhlIGZhc3Rlc3QgY29ycmVjdCBzZXR1cD8iLCJvcHRpb25zIjpbIkEuIEV4cGFuZCBcXChGKHgpXFwpIGRpcmVjdGx5IGludG8gXFwoa3gvKHgtXFxsYW1iZGEpXnJcXCkgdGVybXMgYnkgZ3Vlc3NpbmcgbnVtZXJhdG9ycyIsIkIuIEZpcnN0IGRpdmlkZSBieSBcXCh4XFwpLCBkZWNvbXBvc2UgXFwoRih4KS94XFwpIGludG8gb3JkaW5hcnkgcGFydGlhbCBmcmFjdGlvbnMsIHRoZW4gbXVsdGlwbHkgYnkgXFwoeFxcKSIsIkMuIERpZmZlcmVudGlhdGUgdGhlIGRlbm9taW5hdG9yIGZpcnN0LCB0aGVuIHN1YnN0aXR1dGUgcm9vdHMiLCJELiBNdWx0aXBseSBcXChGKHgpXFwpIGJ5IFxcKHhcXCkgYmVmb3JlIGRlY29tcG9zaW5nIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIHRleHRib29rIG1ldGhvZCBpcyB0byBjb252ZXJ0IHRoZSBwcm9ibGVtIGludG8gYW4gb3JkaW5hcnkgcGFydGlhbC1mcmFjdGlvbiBleHBhbnNpb24gZm9yIFxcKEYoeCkveFxcKSwgdGhlbiBtdWx0aXBseSBiYWNrIGJ5IFxcKHhcXCkgdG8gb2J0YWluIHRoZSBtb2RpZmllZCBmb3JtLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgaXMgc2xvd2VyIGFuZCBvZnRlbiBsZWFkcyB0byBzZXR1cCBlcnJvcnMuIiwiQyI6IkRpZmZlcmVudGlhdGluZyB0aGUgZGVub21pbmF0b3IgaXMgbm90IHRoZSBnZW5lcmFsIHNldHVwIHJ1bGUgaGVyZS4iLCJEIjoiTXVsdGlwbHlpbmcgYnkgXFwoeFxcKSBmaXJzdCBjaGFuZ2VzIHRoZSBwcm9ibGVtIGluIHRoZSB3cm9uZyBkaXJlY3Rpb24uIn0sImhpbnQiOiJUaGluazogb3JkaW5hcnkgZmlyc3QsIG1vZGlmaWVkIGxhc3QuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGF0IGlzIHRoZSBtYWluIGV4YW0gcmVhc29uIGZvciBkaXZpZGluZyBieSBcXCh4XFwpIGZpcnN0IGluIHRoaXMgc2VjdGlvbj8iLCJvcHRpb25zIjpbIkEuIEl0IHJlZHVjZXMgdGhlIHBvbHlub21pYWwgZGVncmVlIGF1dG9tYXRpY2FsbHkiLCJCLiBJdCBjcmVhdGVzIGEgc3RhbmRhcmQgcGFydGlhbC1mcmFjdGlvbiBwcm9ibGVtIHRoYXQgY2FuIGJlIHNvbHZlZCB3aXRoIHRoZSB1c3VhbCB0ZW1wbGF0ZXMiLCJDLiBJdCByZW1vdmVzIHJlcGVhdGVkIHJvb3RzIiwiRC4gSXQgZ3VhcmFudGVlcyBhbGwgY29lZmZpY2llbnRzIGFyZSBwb3NpdGl2ZSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkRpdmlkaW5nIGJ5IFxcKHhcXCkgY29udmVydHMgdGhlIG1vZGlmaWVkLWZvcm0gdGFyZ2V0IGludG8gYSBzdGFuZGFyZCBwYXJ0aWFsLWZyYWN0aW9uIGRlY29tcG9zaXRpb24gcHJvYmxlbS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGF0IG1heSBoYXBwZW4gaW4gb3RoZXIgY29udGV4dHMsIGJ1dCBpdCBpcyBub3QgdGhlIHJlYXNvbiBoZXJlLiIsIkMiOiJSZXBlYXRlZCByb290cyByZW1haW4gcmVwZWF0ZWQuIiwiRCI6IkNvZWZmaWNpZW50IHNpZ25zIGRlcGVuZCBvbiB0aGUgYWxnZWJyYS4ifSwiaGludCI6IlRoZSB0cmljayBpcyBhYm91dCBmb3JtLCBub3Qgc2lnbiBvciBkZWdyZWUuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJjb3JyZWN0X3RlbXBsYXRlX2Zvcl9GX292ZXJfeCIsImxhYmVsIjoiQnVpbGQgdGhlIGNvcnJlY3Qgb3JkaW5hcnkgcGFydGlhbC1mcmFjdGlvbiB0ZW1wbGF0ZSBhZnRlciBkaXZpZGluZyBieSB4IiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgXFwoRih4KSA9ICg1eF4yKzIweCsxOCkvKCh4KzIpKHgrMyleMilcXCksIHdoaWNoIGlzIHRoZSBjb3JyZWN0IGRlY29tcG9zaXRpb24gdGVtcGxhdGUgZm9yIFxcKEYoeCkveFxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKGFfMS94ICsgYV8yLyh4KzIpICsgYV8zLyh4KzMpXjJcXCkiLCJCLiBcXChhXzEveCArIGFfMi8oeCsyKSArIGFfMy8oeCszKSArIGFfNC8oeCszKV4yXFwpIiwiQy4gXFwoYV8xL3heMiArIGFfMi8oeCsyKSArIGFfMy8oeCszKSArIGFfNC8oeCszKV4yXFwpIiwiRC4gXFwoYV8xL3ggKyBhXzIvKHgrMileMiArIGFfMy8oeCszKSArIGFfNC8oeCszKV4yXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiRGl2aWRpbmcgYnkgXFwoeFxcKSBpbnRyb2R1Y2VzIHRoZSBzaW1wbGUgZmFjdG9yIFxcKHhcXCk7IHRoZSBmYWN0b3IgXFwoeCsyXFwpIHN0YXlzIHNpbXBsZTsgYW5kIHRoZSByZXBlYXRlZCBmYWN0b3IgXFwoKHgrMyleMlxcKSByZXF1aXJlcyBib3RoIGEgZmlyc3QtcG93ZXIgdGVybSBcXChhXzMvKHgrMylcXCkgYW5kIGEgc2Vjb25kLXBvd2VyIHRlcm0gXFwoYV80Lyh4KzMpXjJcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiSXQgb21pdHMgdGhlIHJlcXVpcmVkIHRlcm0gb3ZlciBcXCh4KzNcXCkuIiwiQyI6IlRoZSBpbnRyb2R1Y2VkIGZhY3RvciBpcyBcXCh4XFwpLCBub3QgXFwoeF4yXFwpLiIsIkQiOiJcXCh4KzJcXCkgaXMgbm90IGEgcmVwZWF0ZWQgZmFjdG9yLiJ9LCJoaW50IjoiTGlzdCB0aGUgZGVub21pbmF0b3IgZmFjdG9ycyB3aXRoIHRoZWlyIG11bHRpcGxpY2l0aWVzLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJ0ZW1wbGF0ZV9mYWN0b3Jfc2xvdHNfZGlhZ3JhbSIsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkFmdGVyIGRpdmlkaW5nIFxcKEYoeClcXCkgYnkgXFwoeFxcKSwgd2hpY2ggZmFjdG9yIGlzIG5ld2x5IGludHJvZHVjZWQgaW50byB0aGUgZGVub21pbmF0b3I/Iiwib3B0aW9ucyI6WyJBLiBcXCh4XFwpIiwiQi4gXFwoeCsxXFwpIiwiQy4gXFwoeC0yXFwpIiwiRC4gXFwoKHgrMileMlxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlRoZSBkZW5vbWluYXRvciBvZiBcXChGKHgpL3hcXCkgZ2FpbnMgdGhlIGV4dHJhIGZhY3RvciBcXCh4XFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6Ik5vIHN1Y2ggc2hpZnQgaXMgaW50cm9kdWNlZC4iLCJDIjoiVGhlIG9yaWdpbmFsIGZhY3RvciBpcyBcXCh4KzJcXCksIG5vdCBcXCh4LTJcXCkuIiwiRCI6IlRoZSBmYWN0b3IgXFwoeCsyXFwpIGlzIG5vdCBzcXVhcmVkIGJ5IGRpdmlkaW5nIGJ5IFxcKHhcXCkuIn0sImhpbnQiOiJEaXZpZGluZyBieSBcXCh4XFwpIGxpdGVyYWxseSBhZGRzIG9uZSBmYWN0b3Igb25seS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InJlY292ZXJfbW9kaWZpZWRfZm9ybV9hbmRfdHJhcHMiLCJsYWJlbCI6IlJlY292ZXIgdGhlIG1vZGlmaWVkIGZvcm0gYW5kIGF2b2lkIHRoZSBmaW5hbC1zdGVwIHRyYXAiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkdpdmVuIFxcKGFfMT0xXFwpLCBcXChhXzI9MVxcKSwgXFwoYV8zPS0yXFwpLCBcXChhXzQ9MVxcKSwgd2hpY2ggZmluYWwgbW9kaWZpZWQgcGFydGlhbC1mcmFjdGlvbiBmb3JtIGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBcXChGKHgpPTErXFxkZnJhY3t4fXt4KzJ9LVxcZGZyYWN7Mnh9e3grM30rXFxkZnJhY3t4fXsoeCszKV4yfVxcKSIsIkIuIFxcKEYoeCk9XFxkZnJhY3sxfXt4fStcXGRmcmFjezF9e3grMn0tXFxkZnJhY3syfXt4KzN9K1xcZGZyYWN7MX17KHgrMyleMn1cXCkiLCJDLiBcXChGKHgpPXgrXFxkZnJhY3t4fXt4KzJ9LVxcZGZyYWN7Mn17eCszfStcXGRmcmFje3h9eyh4KzMpXjJ9XFwpIiwiRC4gXFwoRih4KT0xK1xcZGZyYWN7MX17eCsyfS1cXGRmcmFjezJ4fXt4KzN9K1xcZGZyYWN7MX17KHgrMyleMn1cXCkiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJNdWx0aXBseWluZyB0aGUgb3JkaW5hcnkgZGVjb21wb3NpdGlvbiBvZiBcXChGKHgpL3hcXCkgYnkgXFwoeFxcKSBwcm9kdWNlcyB0aGUgcmVxdWlyZWQgbW9kaWZpZWQgZm9ybS4gVGhlIHRlcm0gXFwoeCBcXGNkb3QgKDEveClcXCkgYmVjb21lcyBcXCgxXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoaXMgaXMgc3RpbGwgXFwoRih4KS94XFwpLCBub3QgXFwoRih4KVxcKS4iLCJDIjoiXFwoeCBcXGNkb3QgKDEveClcXCkgZXF1YWxzIFxcKDFcXCksIG5vdCBcXCh4XFwpLiIsIkQiOiJFdmVyeSB0ZXJtIG9uIHRoZSByaWdodCBtdXN0IGJlIG11bHRpcGxpZWQgYnkgXFwoeFxcKS4ifSwiaGludCI6Ik11bHRpcGx5IGV2ZXJ5IHRlcm0gYnkgXFwoeFxcKSwgaW5jbHVkaW5nIFxcKDEveFxcKS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJBIHN0dWRlbnQgc2F5cyB0aGUgY29uc3RhbnQgdGVybSBcXCgxXFwpIGluIHRoZSBmaW5hbCBhbnN3ZXIgbXVzdCBiZSB3cm9uZyBiZWNhdXNlIG1vZGlmaWVkIHBhcnRpYWwgZnJhY3Rpb25zIHNob3VsZCBhbGwgbG9vayBsaWtlIFxcKGt4Lyh4LVxcbGFtYmRhKV5yXFwpLiBFeHBsYWluIHdoeSB0aGUgXFwoMVxcKSBpcyBhY3R1YWxseSBjb3JyZWN0IGhlcmUuIiwiaWRlYWxfYW5zd2VyIjoiSXQgY29tZXMgZnJvbSBtdWx0aXBseWluZyBcXCh4XFwpIGJ5IHRoZSB0ZXJtIFxcKDEveFxcKSBpbiB0aGUgZGVjb21wb3NpdGlvbiBvZiBcXChGKHgpL3hcXCkuIFNpbmNlIFxcKHggXFxjZG90ICgxL3gpID0gMVxcKSwgYSBjb25zdGFudCB0ZXJtIGNhbiBsZWdpdGltYXRlbHkgYXBwZWFyIGluIHRoZSBmaW5hbCBleHByZXNzaW9uLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3QgbWVudGlvbiB0aGF0IHRoZSBzdGFydGluZyBkZWNvbXBvc2l0aW9uIGlzIGZvciBcXChGKHgpL3hcXCkiLCJNdXN0IHN0YXRlIHRoYXQgbXVsdGlwbHlpbmcgYnkgXFwoeFxcKSB0dXJucyBcXCgxL3hcXCkgaW50byBcXCgxXFwpIiwiTXVzdCBjb25jbHVkZSB0aGF0IHRoZSBjb25zdGFudCB0ZXJtIGlzIHZhbGlkLCBub3QgYW4gZXJyb3IiXSwiZXhwbGFuYXRpb24iOiJUaGlzIGNoZWNrcyB3aGV0aGVyIHRoZSBzdHVkZW50IHVuZGVyc3RhbmRzIHRoZSByZWNvbnN0cnVjdGlvbiBzdGVwIGluc3RlYWQgb2YgbWVtb3JpemluZyB0aGUgZmluYWwgcGF0dGVybiBibGluZGx5LiIsImhpbnQiOiJUcmFjayB3aGF0IGhhcHBlbnMgc3BlY2lmaWNhbGx5IHRvIHRoZSBcXCgxL3hcXCkgdGVybS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX1dfQ==" style="display:none;"></div>%%KC_END%%
