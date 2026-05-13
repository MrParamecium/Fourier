%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6Im1hdHBsb3RsaWIiLCJyYXRpb25hbGUiOiJObyB0ZXh0Ym9vayBmaWd1cmUgY3JvcHMgYXJlIGF2YWlsYWJsZSwgYnV0IHRoaXMgc2VjdGlvbiBiZW5lZml0cyBmcm9tIGEgY2xlYW4gdmlzdWFsIHRoYXQgY29udHJhc3RzIHVucmVwZWF0ZWQgZmFjdG9ycyB3aXRoIHRoZSByZXBlYXRlZC1mYWN0b3IgbGFkZGVyIDEvKHgtbGFtYmRhKV5yIGRvd24gdG8gMS8oeC1sYW1iZGEpLiBBIGdlbmVyYXRlZCBkaWFncmFtIGNhbiBtYWtlIHRoZSBzdHJ1Y3R1cmUgYW5kIGNvZWZmaWNpZW50IHdvcmtmbG93IGVhc2llciB0byBzZWUgdGhhbiBkZW5zZSBPQ1IgbWF0aCBhbG9uZS4iLCJjcmFtIjoiVXNlIHRoZSB2aXN1YWwgYXMgYSByZWNvZ25pdGlvbiBjaGFydDogcmVwZWF0ZWQgZmFjdG9yIG9mIG9yZGVyIHIgbWVhbnMgd3JpdGUgZXZlcnkgcG93ZXIgZnJvbSByIGRvd24gdG8gMSwgdGhlbiB1c2UgZXZhbHVhdGUsIGRpZmZlcmVudGlhdGUsIGRpZmZlcmVudGlhdGUgYWdhaW4uIiwic3RhbmRhcmQiOiJVc2UgdGhlIHZpc3VhbCB0byBjb25uZWN0IHRoZSBnZW5lcmFsIGV4cGFuc2lvbiBmb3JtIHRvIG9uZSB3b3JrZWQgZXhhbXBsZSBhbmQgc2hvdyB3aGVyZSBlYWNoIGNvZWZmaWNpZW50IGNvbWVzIGZyb20uIiwidG9wX3Njb3JlIjoiVXNlIHRoZSB2aXN1YWwgdG8gc3RyZXNzIHRoZSB0cmFwIHRoYXQgb25lIHJlcGVhdGVkIGZhY3RvciBjcmVhdGVzIHNldmVyYWwgdGVybXMsIG5vdCBqdXN0IG9uZSwgYW5kIHRoYXQgdGhlIGp0aCBjb2VmZmljaWVudCBjb21lcyBmcm9tIHRoZSBqdGggZGVyaXZhdGl2ZSBkaXZpZGVkIGJ5IGohLiJ9" style="display:none;"></div>%%KC_END%%
# B.5-3 Repeated Factors of Q(x)

> **Section Objective:** Understand what changes in partial fraction expansion when the denominator contains a repeated factor such as \((x-\lambda)^r\).

---

This section answers one focused question: what changes when the denominator of \(F(x)\) contains a repeated factor like \((x-\lambda)^r\)? The key new idea is that **one repeated factor of order \(r\) produces \(r\) separate partial-fraction terms** — one for each power from \(r\) down to 1 — rather than just a single term.

You will learn two skills: writing the correct expanded form for a repeated factor, and finding each coefficient using a combination of the Heaviside cover-up method and successive differentiation.

> **Exam Warning:** A very common source of lost points is writing only one term for a repeated factor. If \((x-\lambda)^r\) appears in the denominator, you must write all \(r\) terms.

> ⚠️ Chart render error: Traceback (most recent call last):
  File "/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/script-1777195659653-rj20.py", line 97, in <module>
    plt.tight_layout(pad=1.5)
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/pyplot.py", line 2843, in tight_layout
    gcf().tight_layout(pad=pad, h_pad=h_pad, w_pad=w_pad, rect=rect)
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/figure.py", line 3640, in tight_layout
    engine.execute(self)
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/layout_engine.py", line 188, in execute
    kwargs = get_tight_layout_figure(
             ^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/_tight_layout.py", line 266, in get_tight_layout_figure
    kwargs = _auto_adjust_subplotpars(fig, renderer,
             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/_tight_layout.py", line 82, in _auto_adjust_subplotpars
    bb += [martist._get_tightbbox_for_layout_only(ax, renderer)]
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/artist.py", line 1402, in _get_tightbbox_for_layout_only
    return obj.get_tightbbox(*args, **{**kwargs, "for_layout_only": True})
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/axes/_base.py", line 4587, in get_tightbbox
    bbox = a.get_tightbbox(renderer)
           ^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/artist.py", line 364, in get_tightbbox
    bbox = self.get_window_extent(renderer)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/text.py", line 969, in get_window_extent
    bbox, info, descent = self._get_layout(self._renderer)
                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/text.py", line 382, in _get_layout
    w, h, d = _get_text_metrics_with_cache(
              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/text.py", line 69, in _get_text_metrics_with_cache
    return _get_text_metrics_with_cache_impl(
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/text.py", line 77, in _get_text_metrics_with_cache_impl
    return renderer_ref().get_text_width_height_descent(text, fontprop, ismath)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/backends/backend_agg.py", line 215, in get_text_width_height_descent
    self.mathtext_parser.parse(s, self.dpi, prop)
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/mathtext.py", line 86, in parse
    return self._parse_cached(s, dpi, prop, antialiased, load_glyph_flags)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/mathtext.py", line 100, in _parse_cached
    box = self._parser.parse(s, fontset, fontsize, dpi)
          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/matplotlib/_mathtext.py", line 2167, in parse
    raise ValueError("\n" + ParseException.explain(err, 0)) from None
ValueError: 
\dfrac{P(x)}{\underbrace{(x-\lambda)^r}_{\text{repeated}} \cdot \underbrace{(x-\alpha_1)(x-\alpha_2)\cdots}_{\text{unrepeated}}}
             ^
ParseSyntaxException: Unknown symbol: \underbrace, found '\'  (at char 13), (line:1, col:14)


$$F(x)=\frac{P(x)}{(x-\lambda)^r(x-\alpha_1)(x-\alpha_2)\cdots(x-\alpha_j)}=\frac{a_0}{(x-\lambda)^r}+\frac{a_1}{(x-\lambda)^{r-1}}+\cdots+\frac{a_{r-1}}{x-\lambda}+\frac{k_1}{x-\alpha_1}+\frac{k_2}{x-\alpha_2}+\cdots+\frac{k_j}{x-\alpha_j}$$
*A repeated factor of order \(r\) in the denominator creates exactly \(r\) separate terms in the partial-fraction expansion — one for each power from \((x-\lambda)^r\) down to \((x-\lambda)^1\) — while each unrepeated linear factor \((x-\alpha_i)\) still contributes just one simple-fraction term.*

## 1. How Repeated-Factor Coefficients Are Found

Coefficients for **unrepeated** factors are found exactly as before: use the ordinary Heaviside cover-up method, substituting the root of each simple factor directly into the remaining expression.

For the **repeated factor** \((x-\lambda)^r\), the procedure is a step-by-step ladder:

1. **Conceal the repeated factor** by multiplying \(F(x)\) by \((x-\lambda)^r\). Call this \(G(x) = (x-\lambda)^r F(x)\).
2. **Substitute \(x = \lambda\)** into \(G(x)\) to get \(a_0\).
3. **Differentiate \(G(x)\) once**, then substitute \(x = \lambda\) to get \(a_1\).
4. **Differentiate again** and substitute \(x = \lambda\) to get \(a_2\), and so on.
5. In general, \(a_j\) comes from the **\(j\)th derivative of \(G(x)\) divided by \(j!\)**, evaluated at \(x = \lambda\).

> **Exam Note:** The two most common mistakes are (1) forgetting the \(1/j!\) factorial factor, and (2) differentiating \(F(x)\) itself instead of the concealed expression \(G(x) = (x-\lambda)^r F(x)\). Always remove the repeated factor first.

$$a_j=\left.\frac{1}{j!}\frac{d^j}{dx^j}\left[(x-\lambda)^rF(x)\right]\right|_{x=\lambda}$$
*This compact formula captures the entire repeated-factor procedure in one expression: multiply \(F(x)\) by \((x-\lambda)^r\) to conceal the repeated factor, differentiate the result \(j\) times, divide by \(j!\), then evaluate at \(x = \lambda\) to obtain \(a_j\).*

## 2. Representative Example

Consider the function

$$
F(x) = \frac{4x^3 + 16x^2 + 23x + 13}{(x+1)^3(x+2)}
$$

The denominator has a **repeated factor** \((x+1)^3\) of order 3 and one **simple factor** \((x+2)\). The correct partial-fraction form is therefore:

$$
\frac{a_0}{(x+1)^3} + \frac{a_1}{(x+1)^2} + \frac{a_2}{x+1} + \frac{k}{x+2}
$$

**Step 1 — Find \(k\) by ordinary cover-up at \(x = -2\):**

$$
k = \left.\frac{4x^3+16x^2+23x+13}{(x+1)^3}\right|_{x=-2} = \frac{-32+64-46+13}{(-1)^3} = \frac{-1}{-1} = 1
$$

**Step 2 — Conceal \((x+1)^3\):** Let \(G(x) = (x+1)^3 F(x) = \dfrac{4x^3+16x^2+23x+13}{x+2}\).

- \(a_0 = G(-1) = \dfrac{4(-1)+16(1)+23(-1)+13}{-1+2} = \dfrac{-4+16-23+13}{1} = 2\)
- \(a_1 = G'(-1)\): differentiating \(G(x)\) and evaluating at \(x=-1\) gives \(a_1 = 1\).
- \(a_2 = \tfrac{1}{2}G''(-1)\): taking the second derivative and dividing by \(2!\) gives \(a_2 = 3\).

The repeated factor \((x+1)^3\) of power 3 correctly produced **three terms**, confirming the structure is complete.

$$\frac{4x^3+16x^2+23x+13}{(x+1)^3(x+2)}=\frac{2}{(x+1)^3}+\frac{1}{(x+1)^2}+\frac{3}{x+1}+\frac{1}{x+2}$$
*This final result shows the complete ladder of three descending terms for the repeated factor \((x+1)^3\) — with coefficients 2, 1, and 3 — plus one additional term for the simple factor \((x+2)\) with coefficient 1.*

---
**📌 Key Takeaways**
- A repeated factor \((x-\lambda)^r\) creates a ladder of \(r\) separate partial-fraction terms, one per power.
- Unrepeated linear factors still use the ordinary Heaviside cover-up method at their own root.
- Each repeated-factor coefficient \(a_j\) requires the \(j\)th derivative of the concealed expression, divided by \(j!\).

*In the next section we will look at a mixed method that combines cover-up with clearing fractions.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImV4cGFuc2lvbl9mb3JtX3JlcGVhdGVkX2ZhY3RvciIsImxhYmVsIjoiQ29ycmVjdCBleHBhbnNpb24gZm9ybSBmb3IgYSByZXBlYXRlZCBmYWN0b3IiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIGEgZGVub21pbmF0b3IgY29udGFpbnMgXFwoKHgtMyleMih4KzEpXFwpLCB3aGljaCBwYXJ0aWFsLWZyYWN0aW9uIGZvcm0gaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIFxcKFxcZGZyYWN7QX17KHgtMyleMn0gKyBcXGRmcmFje0J9e3grMX1cXCkiLCJCLiBcXChcXGRmcmFje0F9e3gtM30gKyBcXGRmcmFje0J9e3grMX1cXCkiLCJDLiBcXChcXGRmcmFje0F9eyh4LTMpXjJ9ICsgXFxkZnJhY3tCfXt4LTN9ICsgXFxkZnJhY3tDfXt4KzF9XFwpIiwiRC4gXFwoXFxkZnJhY3tBfXsoeC0zKV4yfSArIFxcZGZyYWN7Qn17eC0zfSArIFxcZGZyYWN7Q317KHgrMSleMn1cXCkiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJBIHJlcGVhdGVkIGZhY3RvciBvZiBvcmRlciAyIHJlcXVpcmVzIHR3byB0ZXJtczogb25lIG92ZXIgXFwoKHgtMyleMlxcKSBhbmQgb25lIG92ZXIgXFwoKHgtMylcXCkuIFRoZSBzaW1wbGUgZmFjdG9yIFxcKCh4KzEpXFwpIGNvbnRyaWJ1dGVzIGV4YWN0bHkgb25lIHRlcm0uIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiSXQgaXMgbWlzc2luZyB0aGUgXFwoMS8oeC0zKVxcKSB0ZXJtIHJlcXVpcmVkIGJ5IHRoZSByZXBlYXRlZCBmYWN0b3Igb2Ygb3JkZXIgMi4iLCJCIjoiSXQgb21pdHMgdGhlIGhpZ2hlc3QtcG93ZXIgcmVwZWF0ZWQtZmFjdG9yIHRlcm0gXFwoMS8oeC0zKV4yXFwpLiIsIkQiOiJUaGUgZmFjdG9yIFxcKCh4KzEpXFwpIGlzIG5vdCByZXBlYXRlZCwgc28gaXQgbXVzdCBub3QgcHJvZHVjZSBhIHNxdWFyZWQtZGVub21pbmF0b3IgdGVybS4ifSwiaGludCI6IkEgcmVwZWF0ZWQgZmFjdG9yIG9mIHBvd2VyIDIgY3JlYXRlcyBhIHR3by1zdGVwIGxhZGRlcjogb25lIHRlcm0gZm9yIGVhY2ggcG93ZXIgZnJvbSAyIGRvd24gdG8gMS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoicGFydGlhbF9mcmFjdGlvbl9zdHJ1Y3R1cmVfZGlhZ3JhbSIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIGEgZGVub21pbmF0b3IgY29udGFpbmluZyBcXCgoeC1cXGxhbWJkYSleNFxcKSwgaG93IG1hbnkgc2VwYXJhdGUgcGFydGlhbC1mcmFjdGlvbiB0ZXJtcyBjb21lIGZyb20gdGhhdCByZXBlYXRlZCBmYWN0b3IgYWxvbmU/Iiwib3B0aW9ucyI6WyJBLiAxIiwiQi4gMiIsIkMuIDMiLCJELiA0Il0sImNvcnJlY3Rfb3B0aW9uIjoiRCIsImV4cGxhbmF0aW9uIjoiQSByZXBlYXRlZCBmYWN0b3Igb2Ygb3JkZXIgNCBjb250cmlidXRlcyBmb3VyIHRlcm1zOiBkZW5vbWluYXRvcnMgXFwoKHgtXFxsYW1iZGEpXjRcXCksIFxcKCh4LVxcbGFtYmRhKV4zXFwpLCBcXCgoeC1cXGxhbWJkYSleMlxcKSwgYW5kIFxcKCh4LVxcbGFtYmRhKVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGF0IHdvdWxkIGJlIHRydWUgb25seSBmb3IgYSBzaW1wbGUgdW5yZXBlYXRlZCBmYWN0b3IuIiwiQiI6IkEgZm91cnRoLW9yZGVyIHJlcGVhdGVkIGZhY3RvciBuZWVkcyBtb3JlIHRoYW4gdHdvIHRlcm1zLiIsIkMiOiJTdGlsbCBtaXNzaW5nIG9uZSBkZW5vbWluYXRvciBwb3dlciDigJQgdGhlIGxhZGRlciBtdXN0IGdvIGFsbCB0aGUgd2F5IGRvd24gdG8gcG93ZXIgMS4ifSwiaGludCI6IkNvdW50IGV2ZXJ5IGludGVnZXIgcG93ZXIgZnJvbSA0IGRvd24gdG8gMSDigJQgdGhhdCBpcyBob3cgbWFueSB0ZXJtcyB5b3UgbmVlZC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImNvZWZmaWNpZW50X21ldGhvZF9yZXBlYXRlZF9mYWN0b3IiLCJsYWJlbCI6IkhvdyB0byBjb21wdXRlIGNvZWZmaWNpZW50cyBmb3IgcmVwZWF0ZWQgZmFjdG9ycyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiU3VwcG9zZSBcXChGKHgpXFwpIGhhcyBhIHJlcGVhdGVkIGZhY3RvciBcXCgoeC1cXGxhbWJkYSleM1xcKS4gQWZ0ZXIgZm9ybWluZyBcXChHKHgpID0gKHgtXFxsYW1iZGEpXjMgRih4KVxcKSwgd2hhdCBnaXZlcyBcXChhXzFcXCk/Iiwib3B0aW9ucyI6WyJBLiBTdWJzdGl0dXRlIFxcKHggPSBcXGxhbWJkYVxcKSBkaXJlY3RseSBpbnRvIFxcKEYoeClcXCkiLCJCLiBTdWJzdGl0dXRlIFxcKHggPSBcXGxhbWJkYVxcKSBpbnRvIFxcKEcoeCkgPSAoeC1cXGxhbWJkYSleMyBGKHgpXFwpIiwiQy4gRGlmZmVyZW50aWF0ZSBcXChHKHgpXFwpIG9uY2UsIHRoZW4gc2V0IFxcKHggPSBcXGxhbWJkYVxcKSIsIkQuIERpZmZlcmVudGlhdGUgXFwoRih4KVxcKSBvbmNlLCB0aGVuIHNldCBcXCh4ID0gXFxsYW1iZGFcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJBZnRlciBjb25jZWFsaW5nIHRoZSByZXBlYXRlZCBmYWN0b3IgdG8gZm9ybSBcXChHKHgpXFwpLCBkaXJlY3Qgc3Vic3RpdHV0aW9uIFxcKHggPSBcXGxhbWJkYVxcKSBnaXZlcyBcXChhXzBcXCkuIFRoZSBuZXh0IGNvZWZmaWNpZW50IFxcKGFfMVxcKSByZXF1aXJlcyBkaWZmZXJlbnRpYXRpbmcgXFwoRyh4KVxcKSBvbmNlIGFuZCB0aGVuIGV2YWx1YXRpbmcgYXQgXFwoeCA9IFxcbGFtYmRhXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IllvdSBtdXN0IGZpcnN0IHJlbW92ZSB0aGUgcmVwZWF0ZWQgZmFjdG9yOyBzdWJzdGl0dXRpbmcgaW50byBcXChGKHgpXFwpIGl0c2VsZiB0eXBpY2FsbHkgcHJvZHVjZXMgYW4gaW5kZXRlcm1pbmF0ZSBmb3JtLiIsIkIiOiJTdWJzdGl0dXRpbmcgXFwoeCA9IFxcbGFtYmRhXFwpIGludG8gXFwoRyh4KVxcKSB3aXRob3V0IGRpZmZlcmVudGlhdGluZyBnaXZlcyBcXChhXzBcXCksIG5vdCBcXChhXzFcXCkuIiwiRCI6IkRpZmZlcmVudGlhdGluZyBcXChGKHgpXFwpIGJlZm9yZSBjb25jZWFsaW5nIHRoZSByZXBlYXRlZCBmYWN0b3IgaXMgbm90IHRoZSBjb3JyZWN0IHByb2NlZHVyZS4ifSwiaGludCI6IkZpcnN0IGNvbmNlYWwgdGhlIHJlcGVhdGVkIGZhY3RvciB0byBnZXQgXFwoRyh4KVxcKSwgdGhlbiBtYXRjaCB0aGUgZGVyaXZhdGl2ZSBvcmRlciB0byB0aGUgY29lZmZpY2llbnQgaW5kZXguIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AyX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBmb3JtdWxhIGNvcnJlY3RseSBnaXZlcyB0aGUgY29lZmZpY2llbnQgXFwoYV9qXFwpIGZvciB0aGUgcmVwZWF0ZWQgZmFjdG9yIFxcKCh4LVxcbGFtYmRhKV5yXFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoYV9qID0gXFxsZWZ0LlxcZGZyYWN7ZF5qfXtkeF5qfUYoeClcXHJpZ2h0fF97eD1cXGxhbWJkYX1cXCkiLCJCLiBcXChhX2ogPSBcXGxlZnQuXFxkZnJhY3sxfXtqIX1cXGRmcmFje2Rean17ZHhean1cXGxlZnRbKHgtXFxsYW1iZGEpXnIgRih4KVxccmlnaHRdXFxyaWdodHxfe3g9XFxsYW1iZGF9XFwpIiwiQy4gXFwoYV9qID0gXFxsZWZ0LlxcZGZyYWN7MX17aiF9KHgtXFxsYW1iZGEpXnIgRih4KVxccmlnaHR8X3t4PVxcbGFtYmRhfVxcKSIsIkQuIFxcKGFfaiA9IFxcbGVmdC5cXGRmcmFje2R9e2R4fVxcbGVmdFsoeC1cXGxhbWJkYSleaiBGKHgpXFxyaWdodF1cXHJpZ2h0fF97eD1cXGxhbWJkYX1cXCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgcmVwZWF0ZWQgZmFjdG9yIG11c3QgYmUgY29uY2VhbGVkIGZpcnN0IGJ5IG11bHRpcGx5aW5nIGJ5IFxcKCh4LVxcbGFtYmRhKV5yXFwpLCB0aGVuIHRoZSByZXN1bHQgaXMgZGlmZmVyZW50aWF0ZWQgXFwoalxcKSB0aW1lcywgZGl2aWRlZCBieSBcXChqIVxcKSwgYW5kIGZpbmFsbHkgZXZhbHVhdGVkIGF0IFxcKHggPSBcXGxhbWJkYVxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJJdCBpZ25vcmVzIHRoZSByZXF1aXJlZCBjb25jZWFsbWVudCBvZiB0aGUgcmVwZWF0ZWQgZmFjdG9yIOKAlCBkaWZmZXJlbnRpYXRpbmcgXFwoRih4KVxcKSBkaXJlY3RseSBpcyBub3QgdGhlIHJ1bGUuIiwiQyI6Ikl0IGhhcyBubyBcXChqXFwpdGggZGVyaXZhdGl2ZSwgc28gaXQgY2Fubm90IHByb2R1Y2UgdGhlIGNvcnJlY3QgXFwoYV9qXFwpIHZhbHVlcyBmb3IgXFwoaiBcXGdlcSAxXFwpLiIsIkQiOiJJdCB1c2VzIHRoZSB3cm9uZyBwb3dlciBpbnNpZGUgdGhlIGJyYWNrZXQgYW5kIHRoZSB3cm9uZyBkZXJpdmF0aXZlIG9yZGVyLiJ9LCJoaW50IjoiVGhlIGZ1bGwgcnVsZSBoYXMgdGhyZWUgcGFydHM6IGNvbmNlYWwgdGhlIHJlcGVhdGVkIGZhY3RvciwgZGlmZmVyZW50aWF0ZSBcXChqXFwpIHRpbWVzLCBkaXZpZGUgYnkgXFwoaiFcXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJ3b3JrZWRfZXhhbXBsZV92YWx1ZXMiLCJsYWJlbCI6IlJlYWRpbmcgYW5kIGFwcGx5aW5nIHRoZSByZXByZXNlbnRhdGl2ZSBleGFtcGxlIiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkluIHRoZSBleGFtcGxlIFxcKEYoeCkgPSBcXGRmcmFjezR4XjMrMTZ4XjIrMjN4KzEzfXsoeCsxKV4zKHgrMil9XFwpLCB3aGljaCBjb2VmZmljaWVudCBpcyBmb3VuZCBieSBvcmRpbmFyeSBjb3Zlci11cCBhdCBcXCh4ID0gLTJcXCk/Iiwib3B0aW9ucyI6WyJBLiBcXChhXzBcXCkiLCJCLiBcXChhXzFcXCkiLCJDLiBcXChhXzJcXCkiLCJELiBcXChrXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiRCIsImV4cGxhbmF0aW9uIjoiVGhlIGZhY3RvciBcXCgoeCsyKVxcKSBpcyB1bnJlcGVhdGVkLCBzbyBpdHMgY29lZmZpY2llbnQgXFwoa1xcKSBpcyBmb3VuZCBieSB0aGUgb3JkaW5hcnkgSGVhdmlzaWRlIGNvdmVyLXVwIG1ldGhvZDogY292ZXIgXFwoKHgrMilcXCkgYW5kIHN1YnN0aXR1dGUgXFwoeCA9IC0yXFwpIGludG8gdGhlIHJlc3QuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiXFwoYV8wXFwpIGJlbG9uZ3MgdG8gdGhlIHJlcGVhdGVkIGZhY3RvciBcXCgoeCsxKV4zXFwpIGFuZCBpcyBmb3VuZCBieSBjb25jZWFsaW5nIHRoYXQgZmFjdG9yIGFuZCBzdWJzdGl0dXRpbmcgXFwoeCA9IC0xXFwpLiIsIkIiOiJcXChhXzFcXCkgY29tZXMgZnJvbSBkaWZmZXJlbnRpYXRpbmcgdGhlIGNvbmNlYWxlZCByZXBlYXRlZC1mYWN0b3IgZXhwcmVzc2lvbiBvbmNlIGFuZCBldmFsdWF0aW5nIGF0IFxcKHggPSAtMVxcKS4iLCJDIjoiXFwoYV8yXFwpIGNvbWVzIGZyb20gdGhlIHNlY29uZC1kZXJpdmF0aXZlIHJ1bGUgYXBwbGllZCB0byB0aGUgY29uY2VhbGVkIHJlcGVhdGVkLWZhY3RvciBleHByZXNzaW9uLiJ9LCJoaW50IjoiU2ltcGxlLCB1bnJlcGVhdGVkIGZhY3RvcnMgdXNlIHRoZSBvcmRpbmFyeSBjb3Zlci11cCB2YWx1ZSBhdCB0aGVpciBvd24gcm9vdC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJXcml0ZSB0aGUgZmluYWwgcGFydGlhbC1mcmFjdGlvbiBleHBhbnNpb24gZm9yIFxcKEYoeCkgPSBcXGRmcmFjezR4XjMrMTZ4XjIrMjN4KzEzfXsoeCsxKV4zKHgrMil9XFwpLiIsImlkZWFsX2Fuc3dlciI6IiQkXFxmcmFjezJ9eyh4KzEpXjN9K1xcZnJhY3sxfXsoeCsxKV4yfStcXGZyYWN7M317eCsxfStcXGZyYWN7MX17eCsyfSQkIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBpbmNsdWRlIGFsbCBmb3VyIHRlcm1zIiwiTXVzdCB1c2UgZGVzY2VuZGluZyByZXBlYXRlZC1mYWN0b3IgcG93ZXJzIFxcKCh4KzEpXjNcXCksIFxcKCh4KzEpXjJcXCksIGFuZCBcXCgoeCsxKVxcKSIsIk11c3QgZ2l2ZSBjb2VmZmljaWVudHMgMiwgMSwgMywgYW5kIDEgY29ycmVjdGx5Il0sImV4cGxhbmF0aW9uIjoiVGhpcyBjb25maXJtcyB0aGF0IHRoZSBzdHVkZW50IGNhbiByZWNvbnN0cnVjdCB0aGUgZnVsbCBleHBhbnNpb24sIG5vdCBqdXN0IGlkZW50aWZ5IG9uZSBjb2VmZmljaWVudC4gVGhlIHJlcGVhdGVkIGZhY3RvciBcXCgoeCsxKV4zXFwpIG9mIG9yZGVyIDMgbXVzdCBwcm9kdWNlIGV4YWN0bHkgdGhyZWUgdGVybXMuIiwiaGludCI6IlRoZSByZXBlYXRlZCBmYWN0b3IgXFwoKHgrMSleM1xcKSBjcmVhdGVzIHRocmVlIHRlcm1zIChvbmUgcGVyIHBvd2VyKSwgdGhlbiBhZGQgdGhlIHNpbmdsZSB0ZXJtIGZvciB0aGUgc2ltcGxlIGZhY3RvciBcXCgoeCsyKVxcKS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
