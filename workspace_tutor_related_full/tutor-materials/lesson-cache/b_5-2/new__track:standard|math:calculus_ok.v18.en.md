%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6Im1hdHBsb3RsaWIiLCJyYXRpb25hbGUiOiJUaGlzIHNlY3Rpb24gaGFzIG5vIGV4dHJhY3RlZCB0ZXh0Ym9vayBmaWd1cmVzLCBidXQgdGhlIG1ldGhvZCBpcyBoaWdobHkgdmlzdWFsOiBzdHVkZW50cyBiZW5lZml0IGZyb20gc2VlaW5nIHdoaWNoIGRlbm9taW5hdG9yIGZhY3RvciBpcyBjb3ZlcmVkLCB3aGljaCB2YWx1ZSBpcyBzdWJzdGl0dXRlZCwgYW5kIGhvdyB0aGUgcmVtYWluaW5nIGV4cHJlc3Npb24gcHJvZHVjZXMgb25lIGNvZWZmaWNpZW50IGF0IGEgdGltZS4gQ2xlYW4gZ2VuZXJhdGVkIGRpYWdyYW1zIHdpbGwgbWFrZSB0aGUgc3BlZWQgcGF0dGVybiBlYXNpZXIgdG8gcmVjb2duaXplIHRoYW4gZGVuc2UgT0NSIG1hdGggYWxvbmUuIiwiY3JhbSI6IlVzZSB2aXN1YWxzIHRvIHRyYWluIHRoZSBwYXR0ZXJuOiBjb3ZlciBvbmUgZmFjdG9yLCBwbHVnIGluIGl0cyByb290LCByZWFkIG9mZiB0aGUgY29lZmZpY2llbnQgZmFzdC4iLCJzdGFuZGFyZCI6IlVzZSB2aXN1YWxzIHRvIGNvbm5lY3QgdGhlIGFsZ2VicmEgdG8gb25lIHJlcHJlc2VudGF0aXZlIHdvcmtlZCBleGFtcGxlIGFuZCBzaG93IHdoeSBhbGwgb3RoZXIgdGVybXMgdmFuaXNoLiIsInRvcF9zY29yZSI6IlVzZSB2aXN1YWxzIHRvIGNvbnRyYXN0IGRpcmVjdCBjb3Zlci11cCBjYXNlcyB3aXRoIHF1YWRyYXRpYyBhbmQgcmVwZWF0ZWQtZmFjdG9yIGNhc2VzLCBzbyBzdHVkZW50cyBub3RpY2UgZXhhY3RseSB3aGVyZSB0aGUgc2hvcnRjdXQgc3RvcHMgYmVpbmcgYXV0b21hdGljLiJ9" style="display:none;"></div>%%KC_END%%
# B.5-2 Heaviside Cover-Up Method

> **Section Objective:** Master a fast, systematic technique for reading off partial fraction coefficients one at a time — no simultaneous equations required.

Suppose a denominator has three distinct factors: (x+1), (x-2), and (x+3). The Heaviside cover-up method lets you find each coefficient by hiding one factor and plugging in the root that makes it zero. The result pops out immediately from the remaining expression.

This section teaches that speed method for proper rational functions with **distinct** denominator factors. Compared with setting up and solving a system of simultaneous equations, cover-up cuts the work to a single substitution per coefficient — exactly why exam questions favor it. One important caveat: **repeated factors require extra derivative-based steps** and are not handled by direct cover-up alone.

> ⚠️ Chart render error: Traceback (most recent call last):
  File "/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/script-1777196131335-3c3v.py", line 66, in <module>
    plt.tight_layout()
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
\boxed{\text{cover}} \cdot (x-\lambda_2)(x-\lambda_3)
^
ParseFatalException: Unknown symbol: \boxed, found '\'  (at char 0), (line:1, col:1)


$$F(x)=\frac{k_1}{x-\lambda_1}+\frac{k_2}{x-\lambda_2}+\cdots+\frac{k_n}{x-\lambda_n},\qquad k_r=\left.(x-\lambda_r)F(x)\right|_{x=\lambda_r}$$
*For a proper rational function with distinct non-repeated linear factors, each coefficient \(k_r\) is found by removing the factor \((x - \lambda_r)\) from the denominator and then evaluating the resulting expression at \(x = \lambda_r\).*

## 1. Distinct Linear Factors: The Main Cover-Up Rule

Why does the method work? Multiply both sides of the partial fraction expansion by \((x - \lambda_r)\). Every term on the right except the \(k_r\) term still carries a factor of the form \((\lambda_r - \lambda_j)\) with \(j \neq r\). Because all factors are **distinct**, none of those differences is zero, so every other term evaluates to zero when \(x = \lambda_r\). Only \(k_r\) survives.

The practical recipe is three words: **cover the factor, plug in the root, read off the coefficient.**

### WHEN IT APPLIES DIRECTLY

This one-step shortcut works only when:
- The rational function is **proper** (degree of numerator < degree of denominator), and
- All denominator factors are **distinct** (no repeated roots).

> **Exam Note:** If the function is improper, perform polynomial long division first to make it proper before applying cover-up.

#### Quick Check
For the factor \((x + 4)\), what value should you substitute? *(Answer: \(x = -4\), because that makes \(x + 4 = 0\).)*

## 2. Worked Example: Compute the Coefficients Fast

Let \(F(x) = \dfrac{2x^2 + 9x - 11}{(x+1)(x-2)(x+3)}\). We seek \(k_1, k_2, k_3\) such that

$$F(x) = \frac{k_1}{x+1} + \frac{k_2}{x-2} + \frac{k_3}{x+3}.$$

**Finding \(k_1\):** Cover \((x+1)\), substitute \(x = -1\):
$$k_1 = \frac{2(-1)^2 + 9(-1) - 11}{(-1-2)(-1+3)} = \frac{2 - 9 - 11}{(-3)(2)} = \frac{-18}{-6} = 3.$$

**Finding \(k_2\):** Cover \((x-2)\), substitute \(x = 2\):
$$k_2 = \frac{2(4) + 9(2) - 11}{(2+1)(2+3)} = \frac{8 + 18 - 11}{(3)(5)} = \frac{15}{15} = 1.$$

**Finding \(k_3\):** Cover \((x+3)\), substitute \(x = -3\):
$$k_3 = \frac{2(9) + 9(-3) - 11}{(-3+1)(-3-2)} = \frac{18 - 27 - 11}{(-2)(-5)} = \frac{-20}{10} = -2.$$

Final result:
$$F(x) = \frac{3}{x+1} + \frac{1}{x-2} + \frac{-2}{x+3}.$$

> **Exam Framing:** On a timed test, the main risk is plugging in the wrong root or forgetting the sign — always set the covered factor equal to zero first, then read off \(x\).

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="example_support" data-visual-use-b64="eyJjcmFtIjoiVXNlIGl0IHRvIG1hdGNoIGVhY2ggY292ZXJlZCBmYWN0b3IgdG8gaXRzIHN1YnN0aXR1dGlvbiB2YWx1ZS4iLCJzdGFuZGFyZCI6IlVzZSBpdCB0byBzdXBwb3J0IHRoZSB3b3JrZWQgZXhhbXBsZSBhbmQgcmVkdWNlIHNpZ24gbWlzdGFrZXMuIiwidG9wX3Njb3JlIjoiVXNlIGl0IHRvIGNvbXBhcmUgY29lZmZpY2llbnQgZXh0cmFjdGlvbiBzdGVwcyBhbmQgc3BvdCB3aGVyZSBzdHVkZW50cyB1c3VhbGx5IHNsaXAuIn0=" style="display:none;"></div>%%KC_END%%
*📊 Three side-by-side panels showing the cover-up computation for each coefficient. The covered factor is grayed out; the substitution value and arithmetic are shown explicitly, with the final coefficient highlighted.*
![Chart](/generated/fig-1777196132505-phuzmqg6.png)

## 3. Where the Shortcut Changes: Complex, Quadratic, and Repeated Factors

### COMPLEX LINEAR FACTORS

The cover-up formula \(k_r = \left.(x - \lambda_r)F(x)\right|_{x=\lambda_r}\) still applies when \(\lambda_r\) is complex. If the original rational function has **real coefficients**, then complex roots appear in conjugate pairs \((\lambda, \bar{\lambda})\), and their coefficients are automatically complex conjugates of each other — so you only need to compute one of them.

### IRREDUCIBLE QUADRATIC FACTORS

When the denominator contains an irreducible quadratic such as \(x^2 + 4x + 13\), the corresponding numerator must be linear: \(\dfrac{c_1 x + c_2}{x^2 + 4x + 13}\). The standard approach is: use cover-up to find the easy linear-factor coefficients first, then substitute convenient values of \(x\) (or compare leading-term coefficients) to solve for \(c_1\) and \(c_2\).

### REPEATED FACTORS

> **Warning:** Direct one-step cover-up does **not** work for repeated factors such as \((x - 1)^2\). After covering the repeated block, derivatives of the covered expression are needed to extract the higher-order coefficients. This is handled in the next section.

### DECISION RULE SUMMARY

| Denominator type | Cover-up status |
|---|---|
| Distinct linear factors | Direct, one step per coefficient |
| Distinct complex linear factors | Direct; conjugate pairing halves the work |
| Irreducible quadratic factor | Partial — cover-up gets linear coefficients; algebra gets the rest |
| Repeated factors | Not direct — derivatives required |

---
**📌 Key Takeaways**
- For distinct linear factors: cover the factor, substitute its root, and read off the coefficient directly.
- Main exam mistake: substituting the wrong root — always set the covered factor to zero first.
- Quadratic factors need extra algebra for numerator constants; repeated factors require derivative-based steps.

*In the next section we will extend partial fraction expansion to cases that need more than direct cover-up.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImRpcmVjdF9jb3Zlcl91cF9ydWxlIiwibGFiZWwiOiJBcHBseSB0aGUgSGVhdmlzaWRlIHJ1bGUgdG8gZGlzdGluY3QgbGluZWFyIGZhY3RvcnMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciBcXChGKHgpID0gXFxkZnJhY3s3eCsxfXsoeC0xKSh4KzIpfVxcKSwgd2hhdCBpcyB0aGUgY29lZmZpY2llbnQgb2YgXFwoXFxkZnJhY3sxfXt4LTF9XFwpIGluIHRoZSBwYXJ0aWFsIGZyYWN0aW9uIGV4cGFuc2lvbj8iLCJvcHRpb25zIjpbIkEuIFxcKDgvM1xcKSIsIkIuIFxcKC04LzNcXCkiLCJDLiBcXCgzLzhcXCkiLCJELiBcXCg2XFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiQ292ZXIgdXAgXFwoKHgtMSlcXCksIHRoZW4gc3Vic3RpdHV0ZSBcXCh4ID0gMVxcKSBpbnRvIHRoZSByZW1haW5pbmcgZXhwcmVzc2lvbjogXFwoXFxkZnJhY3s3KDEpKzF9ezErMn0gPSBcXGRmcmFjezh9ezN9XFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoaXMgc2lnbiBlcnJvciB1c3VhbGx5IGNvbWVzIGZyb20gc3Vic3RpdHV0aW5nIHRoZSB3cm9uZyByb290IG9yIG1pc2hhbmRsaW5nIFxcKHgrMlxcKS4iLCJDIjoiVGhpcyBpcyB0aGUgcmVjaXByb2NhbCBvZiB0aGUgY29ycmVjdCBhbnN3ZXIsIG5vdCB0aGUgY29lZmZpY2llbnQuIiwiRCI6IlRoaXMgY29tZXMgZnJvbSBpZ25vcmluZyB0aGUgZGVub21pbmF0b3IgYWZ0ZXIgc3Vic3RpdHV0aW9uLiJ9LCJoaW50IjoiSGlkZSB0aGUgdGFyZ2V0IGZhY3RvciBcXCgoeC0xKVxcKSwgdGhlbiBwbHVnIGluIHRoZSByb290IHRoYXQgbWFrZXMgdGhhdCBmYWN0b3IgemVyby4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciBcXChGKHgpID0gXFxkZnJhY3szeC01fXsoeCs0KSh4LTIpfVxcKSwgd2hpY2ggc3Vic3RpdHV0aW9uIGdpdmVzIHRoZSBjb2VmZmljaWVudCBvZiBcXChcXGRmcmFjezF9e3grNH1cXCk/Iiwib3B0aW9ucyI6WyJBLiBcXCh4ID0gNFxcKSIsIkIuIFxcKHggPSAtNFxcKSIsIkMuIFxcKHggPSAyXFwpIiwiRC4gXFwoeCA9IDBcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgZmFjdG9yIFxcKHgrNFxcKSBiZWNvbWVzIHplcm8gYXQgXFwoeCA9IC00XFwpLCBzbyB0aGF0IGlzIHRoZSBzdWJzdGl0dXRpb24gdmFsdWUgZm9yIGl0cyBjb2VmZmljaWVudC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJcXCh4ID0gNFxcKSBkb2VzIG5vdCB6ZXJvIG91dCBcXCh4KzRcXCk7IGl0IGdpdmVzIFxcKHgrNCA9IDhcXCkuIiwiQyI6IlxcKHggPSAyXFwpIGNvcnJlc3BvbmRzIHRvIHRoZSBvdGhlciBmYWN0b3IgXFwoKHgtMilcXCksIG5vdCBcXCgoeCs0KVxcKS4iLCJEIjoiXFwoeCA9IDBcXCkgaXMgbm90IHRpZWQgdG8gZWl0aGVyIGxpbmVhciBmYWN0b3IuIn0sImhpbnQiOiJTZXQgdGhlIGNvdmVyZWQgZmFjdG9yIGVxdWFsIHRvIHplcm8gYW5kIHNvbHZlIGZvciBcXCh4XFwpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoid29ya2VkX2V4YW1wbGVfcGF0dGVybiIsImxhYmVsIjoiUmVhZCBhbmQgY29tcGxldGUgYSB0aHJlZS1mYWN0b3IgY292ZXItdXAgc2V0dXAiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IlVzaW5nIGNvdmVyLXVwIG9uIFxcKEYoeCkgPSBcXGRmcmFjezJ4XjIrOXgtMTF9eyh4KzEpKHgtMikoeCszKX1cXCksIHdoYXQgaXMgXFwoa18zXFwpLCB0aGUgY29lZmZpY2llbnQgb2YgXFwoXFxkZnJhY3sxfXt4KzN9XFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoMlxcKSIsIkIuIFxcKC0yXFwpIiwiQy4gXFwoMVxcKSIsIkQuIFxcKDNcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJDb3ZlciB1cCBcXCgoeCszKVxcKSBhbmQgc3Vic3RpdHV0ZSBcXCh4ID0gLTNcXCk6IFxcKFxcZGZyYWN7Mig5KSs5KC0zKS0xMX17KC0zKzEpKC0zLTIpfSA9IFxcZGZyYWN7MTgtMjctMTF9eygtMikoLTUpfSA9IFxcZGZyYWN7LTIwfXsxMH0gPSAtMlxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIGlzIHRoZSBjb3JyZWN0IG1hZ25pdHVkZSBidXQgd2l0aCB0aGUgd3Jvbmcgc2lnbiDigJQgYSBjbGFzc2ljIGFyaXRobWV0aWMgc2xpcC4iLCJDIjoiVGhpcyBpcyBcXChrXzJcXCksIHRoZSBjb2VmZmljaWVudCBmb3IgdGhlIFxcKCh4LTIpXFwpIGZhY3Rvciwgbm90IFxcKCh4KzMpXFwpLiIsIkQiOiJUaGlzIGlzIFxcKGtfMVxcKSwgdGhlIGNvZWZmaWNpZW50IGZvciB0aGUgXFwoKHgrMSlcXCkgZmFjdG9yLiJ9LCJoaW50IjoiVXNlIHRoZSByb290IHRpZWQgdG8gXFwoKHgrMylcXCksIHdoaWNoIGlzIFxcKHggPSAtM1xcKSwgbm90IHRoZSByb290IGZyb20gYW5vdGhlciBmYWN0b3IuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImFubm90YXRlZF9jb3Zlcl91cF9leGFtcGxlIiwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQSBzdHVkZW50IGNvdmVycyB1cCBcXCgoeC0yKVxcKSBpbiBcXChcXGRmcmFjezJ4XjIrOXgtMTF9eyh4KzEpKHgtMikoeCszKX1cXCkgYnV0IHRoZW4gc3Vic3RpdHV0ZXMgXFwoeCA9IC0yXFwpLiBFeHBsYWluIHRoZSBtaXN0YWtlIGFuZCBnaXZlIHRoZSBjb3JyZWN0IGNvZWZmaWNpZW50LiIsImlkZWFsX2Fuc3dlciI6IlRoZSBtaXN0YWtlIGlzIHVzaW5nIHRoZSB3cm9uZyByb290LiBGb3IgdGhlIGZhY3RvciBcXCgoeC0yKVxcKSwgd2UgbXVzdCBzdWJzdGl0dXRlIFxcKHggPSAyXFwpIGJlY2F1c2UgdGhhdCBpcyB0aGUgdmFsdWUgdGhhdCBtYWtlcyBcXCh4IC0gMiA9IDBcXCkuIFRoZSBjb3JyZWN0IGNvZWZmaWNpZW50IGlzIFxcKFxcZGZyYWN7MigyKV4yKzkoMiktMTF9eygyKzEpKDIrMyl9ID0gXFxkZnJhY3sxNX17MTV9ID0gMVxcKS4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IHN0YXRlIHRoYXQgdGhlIHN1YnN0aXR1dGlvbiBtdXN0IG1ha2UgXFwoeC0yXFwpIGVxdWFsIHplcm8iLCJNdXN0IGlkZW50aWZ5IFxcKHggPSAyXFwpIGFzIHRoZSBjb3JyZWN0IHN1YnN0aXR1dGlvbiB2YWx1ZSIsIk11c3QgZ2l2ZSB0aGUgY29ycmVjdCBjb2VmZmljaWVudCBcXChrXzIgPSAxXFwpIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCB1bmRlcnN0YW5kcyB0aGUgcm9vdC1mYWN0b3IgY29ubmVjdGlvbiByYXRoZXIgdGhhbiBjb3B5aW5nIGEgcHJvY2VkdXJlIGJsaW5kbHkuIiwiaGludCI6IkFzayB3aGljaCBcXCh4XFwpLXZhbHVlIG1ha2VzIHRoZSBoaWRkZW4gZmFjdG9yIFxcKCh4LTIpXFwpIHZhbmlzaC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImRlY2lzaW9uX3J1bGVzX2xpbWl0cyIsImxhYmVsIjoiS25vdyB3aGVuIGRpcmVjdCBjb3Zlci11cCBkb2VzIGFuZCBkb2VzIG5vdCBmdWxseSBmaW5pc2ggdGhlIHByb2JsZW0iLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSW4gd2hpY2ggY2FzZSBkb2VzIHRoZSBIZWF2aXNpZGUgY292ZXItdXAgbWV0aG9kIHdvcmsgZGlyZWN0bHkgdG8gZmluZCBlYWNoIGNvZWZmaWNpZW50IGluIG9uZSBzdGVwPyIsIm9wdGlvbnMiOlsiQS4gRGlzdGluY3QgbGluZWFyIGZhY3RvcnMgaW4gYSBwcm9wZXIgcmF0aW9uYWwgZnVuY3Rpb24iLCJCLiBSZXBlYXRlZCBmYWN0b3JzIHN1Y2ggYXMgXFwoKHgtMSleMlxcKSIsIkMuIEFuIGlycmVkdWNpYmxlIHF1YWRyYXRpYyBmYWN0b3IgcmVxdWlyaW5nIGEgbGluZWFyIG51bWVyYXRvciIsIkQuIEFueSBkZW5vbWluYXRvciBhdCBhbGwsIHdpdGggbm8gcmVzdHJpY3Rpb25zIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGhlIGRpcmVjdCBvbmUtc3RlcCBmb3JtIGFwcGxpZXMgdG8gcHJvcGVyIHJhdGlvbmFsIGZ1bmN0aW9ucyB3aG9zZSBkZW5vbWluYXRvciBmYWN0b3JzIGFyZSBkaXN0aW5jdCBhbmQgbm9uLXJlcGVhdGVkIGxpbmVhciBmYWN0b3JzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlJlcGVhdGVkIGZhY3RvcnMgcmVxdWlyZSBhZGRpdGlvbmFsIGRlcml2YXRpdmUtYmFzZWQgd29yayBmb3IgdGhlIHJlcGVhdGVkIGJsb2NrLiIsIkMiOiJBIHF1YWRyYXRpYyBibG9jayBuZWVkcyBleHRyYSBjb25zdGFudHMgaW4gdGhlIG51bWVyYXRvciwgc28gY292ZXItdXAgYWxvbmUgZG9lcyBub3QgZmluaXNoIGV2ZXJ5dGhpbmcuIiwiRCI6IlRoZSBtZXRob2QgaGFzIGNsZWFyIGxpbWl0cyBhbmQgaXMgbm90IHVuaXZlcnNhbCBpbiBvbmUgc3RlcC4ifSwiaGludCI6IkZvY3VzIG9uIHRoZSBleGFjdCBjb25kaXRpb24gZW1waGFzaXplZCBpbiB0aGUgc2VjdGlvbiB0aXRsZSBhbmQgZGVyaXZhdGlvbi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IlN1cHBvc2UgYSByYXRpb25hbCBmdW5jdGlvbiB3aXRoIHJlYWwgY29lZmZpY2llbnRzIGhhcyBkZW5vbWluYXRvciBmYWN0b3JzIFxcKCh4KzItM2opXFwpIGFuZCBcXCgoeCsyKzNqKVxcKS4gV2hpY2ggc3RhdGVtZW50IGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBUaGUgY29ycmVzcG9uZGluZyBjb2VmZmljaWVudHMgbXVzdCBiZSBlcXVhbCByZWFsIG51bWJlcnMiLCJCLiBUaGUgY29ycmVzcG9uZGluZyBjb2VmZmljaWVudHMgYXJlIHVucmVsYXRlZCIsIkMuIFRoZSBjb3JyZXNwb25kaW5nIGNvZWZmaWNpZW50cyBhcmUgY29tcGxleCBjb25qdWdhdGVzIiwiRC4gVGhlIGNvdmVyLXVwIG1ldGhvZCBjYW5ub3QgYmUgdXNlZCBhdCBhbGwiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJGb3IgcmVhbC1jb2VmZmljaWVudCByYXRpb25hbCBmdW5jdGlvbnMsIGNvZWZmaWNpZW50cyBhdHRhY2hlZCB0byBjb21wbGV4LWNvbmp1Z2F0ZSBmYWN0b3JzIGNvbWUgaW4gY29uanVnYXRlIHBhaXJzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZXkgYXJlIGdlbmVyYWxseSBub3QgZXF1YWwgcmVhbCBudW1iZXJzOyB0aGV5IGFyZSBjb21wbGV4IGNvbmp1Z2F0ZXMgb2YgZWFjaCBvdGhlci4iLCJCIjoiVGhleSBhcmUgZGlyZWN0bHkgbGlua2VkIGJ5IHRoZSBjb25qdWdhdGUgc3RydWN0dXJlIGltcG9zZWQgYnkgcmVhbCBjb2VmZmljaWVudHMuIiwiRCI6IlRoZSBtZXRob2Qgc3RpbGwgYXBwbGllcyB0byBkaXN0aW5jdCBjb21wbGV4IGxpbmVhciBmYWN0b3JzIOKAlCB0aGUgZm9ybXVsYSBcXChrX3IgPSBcXGxlZnQuKHgtXFxsYW1iZGFfcilGKHgpXFxyaWdodHxfe3g9XFxsYW1iZGFfcn1cXCkgd29ya3MgZXZlbiB3aGVuIFxcKFxcbGFtYmRhX3JcXCkgaXMgY29tcGxleC4ifSwiaGludCI6IlJlYWwgY29lZmZpY2llbnRzIHVzdWFsbHkgZm9yY2UgY29uanVnYXRlIHBhaXJpbmcgb2YgY29tcGxleCByb290cyBhbmQgdGhlaXIgcmVzaWR1ZXMuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwM19xMyIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQWZ0ZXIgZmluZGluZyB0aGUgZWFzeSBsaW5lYXItZmFjdG9yIGNvZWZmaWNpZW50IGJ5IGNvdmVyLXVwIGluIFxcKFxcZGZyYWN7UCh4KX17KHgrMSkoeF4yKzR4KzEzKX1cXCksIHdoYXQgaXMgdGhlIHVzdWFsIG5leHQgc3RlcCB0byBkZXRlcm1pbmUgdGhlIHF1YWRyYXRpYyBudW1lcmF0b3IgY29uc3RhbnRzPyIsIm9wdGlvbnMiOlsiQS4gSWdub3JlIHRoZSBxdWFkcmF0aWMgdGVybSBiZWNhdXNlIGNvdmVyLXVwIGFscmVhZHkgZGV0ZXJtaW5lcyBldmVyeXRoaW5nIiwiQi4gV3JpdGUgdGhlIHJlbWFpbmluZyBwYXJ0IGFzIFxcKFxcZGZyYWN7Y18xIHggKyBjXzJ9e3heMis0eCsxM31cXCkgYW5kIHNvbHZlIGZvciBcXChjXzEsIGNfMlxcKSBieSBzdWJzdGl0dXRpb24gb3IgY29tcGFyaW5nIGxlYWRpbmcgdGVybXMiLCJDLiBEaWZmZXJlbnRpYXRlIHRoZSBvcmlnaW5hbCByYXRpb25hbCBmdW5jdGlvbiBpbW1lZGlhdGVseSBmb3IgYWxsIGNvZWZmaWNpZW50cyIsIkQuIFJlcGxhY2UgdGhlIHF1YWRyYXRpYyBmYWN0b3IgYnkgdHdvIHVucmVsYXRlZCByZWFsIGxpbmVhciBmYWN0b3JzIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiQWZ0ZXIgZ2V0dGluZyB0aGUgZWFzeSBjb2VmZmljaWVudCB2aWEgY292ZXItdXAsIHRoZSBxdWFkcmF0aWMgYmxvY2sgaXMgaGFuZGxlZCBieSBzb2x2aW5nIGZvciB0aGUgbGluZWFyIG51bWVyYXRvciBjb25zdGFudHMgXFwoY18xXFwpIGFuZCBcXChjXzJcXCkgdXNpbmcgY29udmVuaWVudCBcXCh4XFwpLXZhbHVlcyBvciBsZWFkaW5nLXRlcm0gY29tcGFyaXNvbi4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJDb3Zlci11cCBhbG9uZSBkb2VzIG5vdCBkZXRlcm1pbmUgdGhlIG51bWVyYXRvciBjb25zdGFudHMgb2YgYSBxdWFkcmF0aWMgYmxvY2suIiwiQyI6IlRoZSBkZXJpdmF0aXZlIHByb2NlZHVyZSBpcyB0aWVkIHRvIHJlcGVhdGVkIGZhY3RvcnMsIG5vdCB0aGUgc3RhbmRhcmQgcXVhZHJhdGljIGNhc2UuIiwiRCI6IlRoZSBxdWFkcmF0aWMgXFwoeF4yKzR4KzEzXFwpIGlzIGlycmVkdWNpYmxlIG92ZXIgdGhlIHJlYWxzIGFuZCBjYW5ub3QgYmUgc3BsaXQgaW50byB0d28gcmVhbCBsaW5lYXIgZmFjdG9ycy4ifSwiaGludCI6IlRoaW5rOiBvbmUgZWFzeSBjb2VmZmljaWVudCBieSBjb3Zlci11cCwgdGhlbiB0d28gcmVtYWluaW5nIGNvbnN0YW50cyBieSBhbGdlYnJhLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfV19" style="display:none;"></div>%%KC_END%%
