%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6Im1hdHBsb3RsaWIiLCJyYXRpb25hbGUiOiJUaGlzIHNlY3Rpb24gaGFzIG5vIGV4dHJhY3RlZCB0ZXh0Ym9vayBmaWd1cmVzIGF2YWlsYWJsZSwgYnV0IHRoZSBrZXkgaWRlYSBpcyBoaWdobHkgdmlzdWFsOiBjb21wYXJlIHRoZSBpbXByb3BlciBmb3JtIHdpdGggbSA9IG4gdG8gdGhlIHVzdWFsIHByb3BlciBwYXJ0aWFsIGZyYWN0aW9uIGZvcm0gYW5kIHNob3cgd2hlcmUgdGhlIGV4dHJhIGNvbnN0YW50IHRlcm0gYXBwZWFycy4gQSBjbGVhbiBnZW5lcmF0ZWQgYWxnZWJyYSBsYXlvdXQgaXMgbW9yZSB1c2VmdWwgdGhhbiBhIGRlbnNlIHBhZ2Ugc2NyZWVuc2hvdC4iLCJjcmFtIjoiVXNlIHRoZSB2aXN1YWwgdG8gaGVscCBzdHVkZW50cyBpbnN0YW50bHkgc3BvdCB0aGUgcnVsZTogc2FtZSBkZWdyZWUgbWVhbnMgYWRkIG9uZSBjb25zdGFudCBmaXJzdCwgdGhlbiBkbyBwYXJ0aWFsIGZyYWN0aW9ucyBub3JtYWxseS4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgdmlzdWFsIHRvIGNvbm5lY3QgdGhlIGZvcm11bGEgcGF0dGVybiB0byBvbmUgd29ya2VkIGV4YW1wbGUsIHNvIHN0dWRlbnRzIGNhbiBzZWUgYm90aCB0aGUgZ2VuZXJhbCB0ZW1wbGF0ZSBhbmQgdGhlIG51bWVyaWMgY2FzZS4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhlIHZpc3VhbCB0byBjb250cmFzdCBwcm9wZXIgdnMgc3BlY2lhbCBpbXByb3BlciBzZXR1cCBhbmQgZXhwb3NlIHRoZSBjb21tb24gbWlzdGFrZSBvZiBmb3JnZXR0aW5nIHRoZSBsZWFkaW5nIGNvbnN0YW50IHRlcm0uIn0=" style="display:none;"></div>%%KC_END%%
# B.5-5 Improper Rational Functions — The Special Case m = n

> **Section Objective:** Learn to handle the special improper rational function where the numerator and denominator have the same degree, and apply the shortcut partial fraction setup directly.

---

Here is the good news: when the numerator and denominator of a rational function share the same degree (\ (m = n\)), the partial fraction process is almost identical to the proper case. You do not need to grind through full polynomial long division. The only difference is one extra constant term that appears at the front of the expansion.

This matters on exams because students often overcomplicate equal-degree cases by defaulting to long division when a direct pattern is available. Recognizing the \ (m = n\) signature and writing the correct setup immediately saves time and prevents errors.

In this section we will state the rule precisely, then walk through one representative worked example: \ (F(x) = (3x^2 + 9x - 20)/((x-2)(x+3))\).

> ⚠️ Chart render error: Traceback (most recent call last):
  File "/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/script-1777195922398-l4fo.py", line 50, in <module>
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
F(x)\;=\;\underbrace{b_n}_{\text{extra constant}}\;+\;\dfrac{k_1}{x-\lambda_1}\;+\;\dfrac{k_2}{x-\lambda_2}\;+\;\cdots\;+\;\dfrac{k_n}{x-\lambda_n}
         ^
ParseFatalException: Unknown symbol: \underbrace, found '\'  (at char 9), (line:1, col:10)


## 1. The Special Rule When m = n

When the numerator and denominator of a rational function have the **same degree**, the function is improper — but only barely. The textbook shows that in this specific case you do not need to perform full polynomial long division. Instead, the partial fraction expansion takes the same form as the proper case, with exactly **one extra constant term** prepended.

That constant is \(b_n\): the leading coefficient of the numerator, assuming the denominator is written with leading coefficient 1 (monic). Once you write \(b_n\) at the front, all remaining coefficients \(k_1, k_2, \ldots, k_n\) are found in the usual way — by the cover-up substitution rule, exactly as in the proper case.

### COMMON MISTAKES

- **Forgetting \(b_n\):** Starting with only fractional terms makes the setup wrong from the first line.
- **Over-applying the shortcut:** This equal-degree shortcut applies **only** when \(m = n\). If \(m > n\) by more than zero, full long division is required.

#### Note
Always check degrees before writing any partial fraction setup.

$$F(x)=\frac{b_n x^n+b_{n-1}x^{n-1}+\cdots+b_1x+b_0}{x^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0}=b_n+\frac{k_1}{x-\lambda_1}+\frac{k_2}{x-\lambda_2}+\cdots+\frac{k_n}{x-\lambda_n}$$
*When the numerator and denominator have equal degree, the partial fraction expansion is the standard proper-case sum of fractions plus one extra leading constant \(b_n\) — the only structural addition the equal-degree case requires.*

$$k_r=(x-\lambda_r)F(x)\big|_{x=\lambda_r}$$
*Each partial fraction coefficient \(k_r\) is still computed by the same cover-up substitution rule used in the proper case — the presence of the constant \(b_n\) in the setup does not change how the remaining coefficients are extracted.*

## 2. Worked Example

Consider the function

$$
F(x) = \frac{3x^2 + 9x - 20}{(x-2)(x+3)}
$$

**Step 1 — Check degrees.** The numerator has degree 2 and the expanded denominator \((x-2)(x+3) = x^2 + x - 6\) also has degree 2, so \(m = n = 2\). The equal-degree rule applies.

**Step 2 — Identify \(b_n\).** The leading numerator coefficient is \(b_2 = 3\).

**Step 3 — Write the setup.**

$$
F(x) = 3 + \frac{k_1}{x-2} + \frac{k_2}{x+3}
$$

**Step 4 — Compute \(k_1\)** by substituting \(x = 2\):

$$
k_1 = (x-2)F(x)\big|_{x=2} = \frac{3(4)+9(2)-20}{2+3} = \frac{12+18-20}{5} = \frac{10}{5} = 2
$$

**Step 5 — Compute \(k_2\)** by substituting \(x = -3\):

$$
k_2 = (x+3)F(x)\big|_{x=-3} = \frac{3(9)+9(-3)-20}{-3-2} = \frac{27-27-20}{-5} = \frac{-20}{-5} = 4
$$

**Final answer:**

$$
F(x) = 3 + \frac{2}{x-2} + \frac{4}{x+3}
$$

### EXAM TIP

If you begin by writing only \(k_1/(x-2) + k_2/(x+3)\) with no constant in front, your setup is already wrong before you solve a single equation.

> ⚠️ Chart render error: Traceback (most recent call last):
  File "/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/script-1777195923073-9d37.py", line 47, in <module>
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
k_1 = (x-2)F(x)\big|_{x=2} = \dfrac{12+18-20}{5} = \dfrac{10}{5} = 2
               ^
ParseFatalException: Unknown symbol: \big, found '\'  (at char 15), (line:1, col:16)


---
**📌 Key Takeaways**
- When numerator and denominator have equal degree, the m = n special improper case applies.
- Always include the extra constant term \(b_n\) at the front of the partial fraction setup.
- After writing \(b_n\), compute all remaining coefficients \(k_r\) using the standard cover-up substitution rule.

*In the next section we will look at modified partial fractions.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlY29nbml6ZV9lcXVhbF9kZWdyZWVfY2FzZSIsImxhYmVsIjoiUmVjb2duaXplIHdoZW4gdGhlIG0gPSBuIHNob3J0Y3V0IGFwcGxpZXMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHNpdHVhdGlvbiBtYXRjaGVzIHRoZSBzcGVjaWFsIHJ1bGUgaW4gdGhpcyBzZWN0aW9uPyIsIm9wdGlvbnMiOlsiQS4gVGhlIG51bWVyYXRvciBkZWdyZWUgaXMgbGVzcyB0aGFuIHRoZSBkZW5vbWluYXRvciBkZWdyZWUiLCJCLiBUaGUgbnVtZXJhdG9yIGRlZ3JlZSBpcyBncmVhdGVyIHRoYW4gdGhlIGRlbm9taW5hdG9yIGRlZ3JlZSBieSAxIiwiQy4gVGhlIG51bWVyYXRvciBhbmQgZGVub21pbmF0b3IgaGF2ZSB0aGUgc2FtZSBkZWdyZWUiLCJELiBUaGUgZGVub21pbmF0b3IgaGFzIGEgcmVwZWF0ZWQgcm9vdCJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlRoaXMgc2VjdGlvbiBoYW5kbGVzIHRoZSBzcGVjaWFsIGltcHJvcGVyIGNhc2UgXFwobSA9IG5cXCksIG1lYW5pbmcgdGhlIG51bWVyYXRvciBhbmQgZGVub21pbmF0b3IgaGF2ZSBlcXVhbCBkZWdyZWUuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhhdCBpcyB0aGUgb3JkaW5hcnkgcHJvcGVyIGNhc2UsIG5vdCB0aGUgc3BlY2lhbCBpbXByb3BlciBjYXNlIGhlcmUuIiwiQiI6IlRoYXQgaXMgc3RpbGwgaW1wcm9wZXIsIGJ1dCBpdCBpcyBub3QgdGhlIGVxdWFsLWRlZ3JlZSBzaG9ydGN1dCBkaXNjdXNzZWQgaGVyZS4iLCJEIjoiUmVwZWF0ZWQgcm9vdHMgY2hhbmdlIHRoZSBmcmFjdGlvbiBmb3JtLCBidXQgdGhleSBkbyBub3QgZGVmaW5lIHRoZSBcXChtID0gblxcKSBjYXNlLiJ9LCJoaW50IjoiRm9jdXMgb24gd2hhdCBcXChtXFwpIGFuZCBcXChuXFwpIGFyZSBjb21wYXJpbmcuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgcGFydGlhbCBmcmFjdGlvbnMsIHdoaWNoIGV4cHJlc3Npb24gaXMgdGhlIGNvcnJlY3Qgc2V0dXAgZm9yIGFuIGVxdWFsLWRlZ3JlZSByYXRpb25hbCBmdW5jdGlvbiB3aXRoIGRpc3RpbmN0IGxpbmVhciBmYWN0b3JzIGluIHRoZSBkZW5vbWluYXRvcj8iLCJvcHRpb25zIjpbIkEuIEZyYWN0aW9ucyBvbmx5LCB3aXRoIG5vIGNvbnN0YW50IHRlcm0iLCJCLiBPbmUgY29uc3RhbnQgdGVybSBwbHVzIHRoZSB1c3VhbCBwYXJ0aWFsIGZyYWN0aW9uIHRlcm1zIiwiQy4gQSBwb2x5bm9taWFsIG9mIGRlZ3JlZSAxIHBsdXMgdGhlIHVzdWFsIHBhcnRpYWwgZnJhY3Rpb24gdGVybXMiLCJELiBObyBleHBhbnNpb24gaXMgcG9zc2libGUgdW50aWwgbG9uZyBkaXZpc2lvbiBpcyBjb21wbGV0ZWQgaW4gZXZlcnkgY2FzZSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkZvciB0aGUgZXF1YWwtZGVncmVlIGNhc2UgaW4gdGhpcyBzZWN0aW9uLCB0aGUgc2V0dXAgaXMgdGhlIHByb3Blci1jYXNlIHBhcnRpYWwgZnJhY3Rpb25zIHBsdXMgb25lIGV4dHJhIGNvbnN0YW50IHRlcm0gXFwoYl9uXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgbWlzc2VzIHRoZSBrZXkgZmVhdHVyZSBvZiB0aGUgc2VjdGlvbjogdGhlIGV4dHJhIGNvbnN0YW50IHRlcm0gXFwoYl9uXFwpLiIsIkMiOiJBIGxpbmVhciBwb2x5bm9taWFsIGlzIG5vdCBuZWVkZWQgaGVyZTsgdGhlIGV4dHJhIHRlcm0gaXMganVzdCBhIHNpbmdsZSBjb25zdGFudC4iLCJEIjoiVGhlIHNlY3Rpb24gZ2l2ZXMgYSBkaXJlY3Qgc2V0dXAgZm9yIHRoaXMgc3BlY2lhbCBlcXVhbC1kZWdyZWUgY2FzZSB3aXRob3V0IHJlcXVpcmluZyBmdWxsIGxvbmcgZGl2aXNpb24uIn0sImhpbnQiOiJBc2sgd2hhdCBleHRyYSBwaWVjZSBhcHBlYXJzIHdoZW4gZGVncmVlcyBtYXRjaC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoicGF0dGVybl9jb21wYXJpc29uX2RpYWdyYW0iLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImlkZW50aWZ5X2V4dHJhX2NvbnN0YW50IiwibGFiZWwiOiJJZGVudGlmeSB0aGUgZXh0cmEgY29uc3RhbnQgdGVybSBibiIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSW4gdGhlIHRleHRib29rIGZvcm11bGEgZm9yIHRoZSBjYXNlIFxcKG0gPSBuXFwpLCB3aGF0IGlzIHRoZSBleHRyYSBjb25zdGFudCB0ZXJtIHRoYXQgYXBwZWFycyBiZWZvcmUgdGhlIHBhcnRpYWwgZnJhY3Rpb25zPyIsIm9wdGlvbnMiOlsiQS4gXFwoYV8wXFwpIiwiQi4gXFwoYl9uXFwpIiwiQy4gXFwoa19uXFwpIiwiRC4gXFwoXFxsYW1iZGFfblxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBzZWN0aW9uIHN0YXRlcyB0aGF0IHRoZSBvbmx5IGRpZmZlcmVuY2UgZnJvbSB0aGUgcHJvcGVyIGNhc2UgaXMgdGhlIGFwcGVhcmFuY2Ugb2YgdGhlIGV4dHJhIGNvbnN0YW50IFxcKGJfblxcKSwgdGhlIGxlYWRpbmcgbnVtZXJhdG9yIGNvZWZmaWNpZW50LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlxcKGFfMFxcKSBpcyBhIGRlbm9taW5hdG9yIGNvZWZmaWNpZW50LCBub3QgdGhlIGFkZGVkIGNvbnN0YW50IGluIHRoZSBleHBhbnNpb24uIiwiQyI6IlxcKGtfblxcKSBpcyBvbmUgb2YgdGhlIHBhcnRpYWwgZnJhY3Rpb24gY29lZmZpY2llbnRzLCBub3QgdGhlIHN0YW5kYWxvbmUgY29uc3RhbnQgdGVybS4iLCJEIjoiXFwoXFxsYW1iZGFfblxcKSBpcyBhIHJvb3QgbG9jYXRpb24sIG5vdCBhIGNvbnN0YW50IHRlcm0gaW4gdGhlIGV4cGFuc2lvbi4ifSwiaGludCI6Ikxvb2sgZm9yIHRoZSBsZWFkaW5nIG51bWVyYXRvciBjb2VmZmljaWVudC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIFxcKEYoeCkgPSAoNXheMiAtIHggKyAxKS8oeF4yICsgNHggLSAzKVxcKSBhbmQgdGhlIGRlbm9taW5hdG9yIGlzIG1vbmljLCB3aGF0IGNvbnN0YW50IHNob3VsZCBhcHBlYXIgZmlyc3QgaW4gdGhlIHBhcnRpYWwgZnJhY3Rpb24gc2V0dXA/Iiwib3B0aW9ucyI6WyJBLiAxIiwiQi4gLTEiLCJDLiA0IiwiRC4gNSJdLCJjb3JyZWN0X29wdGlvbiI6IkQiLCJleHBsYW5hdGlvbiI6IlRoZSBleHRyYSBjb25zdGFudCBpcyBcXChiX25cXCksIHRoZSBjb2VmZmljaWVudCBvZiB0aGUgaGlnaGVzdC1wb3dlciB0ZXJtIGluIHRoZSBudW1lcmF0b3IuIEhlcmUgdGhlIG51bWVyYXRvciBpcyBcXCg1eF4yIC0geCArIDFcXCksIHNvIFxcKGJfMiA9IDVcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiMSBpcyB0aGUgY29uc3RhbnQgdGVybSBcXChiXzBcXCkgaW4gdGhlIG51bWVyYXRvciwgbm90IHRoZSBsZWFkaW5nIGNvZWZmaWNpZW50LiIsIkIiOiItMSBpcyB0aGUgY29lZmZpY2llbnQgb2YgXFwoeFxcKSBpbiB0aGUgbnVtZXJhdG9yLCBub3Qgb2YgXFwoeF4yXFwpLiIsIkMiOiI0IGJlbG9uZ3MgdG8gdGhlIGRlbm9taW5hdG9yLCBzbyBpdCBwbGF5cyBubyByb2xlIGluIGRldGVybWluaW5nIFxcKGJfblxcKS4ifSwiaGludCI6IlVzZSB0aGUgY29lZmZpY2llbnQgb2YgdGhlIHRvcC1kZWdyZWUgbnVtZXJhdG9yIHRlcm0uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJjb21wdXRlX2NvZWZmaWNpZW50c19ub3JtYWxseSIsImxhYmVsIjoiQ29tcHV0ZSByZW1haW5pbmcgY29lZmZpY2llbnRzIGFzIGluIHRoZSBwcm9wZXIgY2FzZSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIFxcKEYoeCkgPSAoM3heMiArIDl4IC0gMjApLygoeC0yKSh4KzMpKVxcKSwgd2hpY2ggZmluYWwgZXhwYW5zaW9uIGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBcXCgzICsgXFxkZnJhY3syfXt4LTJ9ICsgXFxkZnJhY3s0fXt4KzN9XFwpIiwiQi4gXFwoMyArIFxcZGZyYWN7NH17eC0yfSArIFxcZGZyYWN7Mn17eCszfVxcKSIsIkMuIFxcKDIgKyBcXGRmcmFjezN9e3gtMn0gKyBcXGRmcmFjezR9e3grM31cXCkiLCJELiBcXCgzICsgXFxkZnJhY3syfXt4KzN9ICsgXFxkZnJhY3s0fXt4LTJ9XFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGhlIGVxdWFsLWRlZ3JlZSBzZXR1cCBnaXZlcyB0aGUgY29uc3RhbnQgXFwoYl8yID0gM1xcKSBmaXJzdCwgdGhlbiB0aGUgY292ZXItdXAgcnVsZSB5aWVsZHMgXFwoa18xID0gMlxcKSBhdCBcXCh4ID0gMlxcKSBhbmQgXFwoa18yID0gNFxcKSBhdCBcXCh4ID0gLTNcXCksIGVhY2ggYXR0YWNoZWQgdG8gaXRzIG93biBmYWN0b3IuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhlIGNvZWZmaWNpZW50cyBcXChrXzFcXCkgYW5kIFxcKGtfMlxcKSBhcmUgc3dhcHBlZCBiZXR3ZWVuIHRoZSB0d28gZmFjdG9ycy4iLCJDIjoiVGhlIGNvbnN0YW50IHRlcm0gc2hvdWxkIGJlIFxcKGJfMiA9IDNcXCksIG5vdCAyLiIsIkQiOiJFYWNoIGNvZWZmaWNpZW50IGlzIGF0dGFjaGVkIHRvIHRoZSB3cm9uZyBkZW5vbWluYXRvciBmYWN0b3IuIn0sImhpbnQiOiJNYXRjaCBlYWNoIHJvb3Qgd2l0aCBpdHMgb3duIGRlbm9taW5hdG9yIGZhY3RvciB3aGVuIGFwcGx5aW5nIHRoZSBjb3Zlci11cCBydWxlLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJ3b3JrZWRfZXhhbXBsZV9sYXlvdXQiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJBIHN0dWRlbnQgd3JpdGVzIFxcKEYoeCkgPSBcXGRmcmFjezJ9e3gtMn0gKyBcXGRmcmFjezR9e3grM31cXCkgZm9yIHRoZSBleGFtcGxlIGluIHRoaXMgc2VjdGlvbi4gV2hhdCBzaW5nbGUgdGVybSBpcyBtaXNzaW5nLCBhbmQgd2h5IG11c3QgaXQgYmUgdGhlcmU/IiwiaWRlYWxfYW5zd2VyIjoiVGhlIG1pc3NpbmcgdGVybSBpcyAzLiBJdCBtdXN0IGJlIHRoZXJlIGJlY2F1c2UgdGhlIG51bWVyYXRvciBhbmQgZGVub21pbmF0b3IgaGF2ZSB0aGUgc2FtZSBkZWdyZWUgKFxcKG0gPSBuID0gMlxcKSksIHNvIHRoZSBlcXVhbC1kZWdyZWUgc2V0dXAgcmVxdWlyZXMgdGhlIGV4dHJhIGNvbnN0YW50IFxcKGJfbiA9IDNcXCkgdG8gYXBwZWFyIGJlZm9yZSB0aGUgcGFydGlhbCBmcmFjdGlvbiB0ZXJtcy4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IGlkZW50aWZ5IHRoZSBtaXNzaW5nIHRlcm0gYXMgMyIsIk11c3Qgc3RhdGUgdGhhdCBcXChtID0gblxcKSBvciB0aGF0IHRoZSBkZWdyZWVzIGFyZSBlcXVhbCIsIk11c3QgZXhwbGFpbiB0aGF0IHRoZSBlcXVhbC1kZWdyZWUgY2FzZSByZXF1aXJlcyB0aGUgZXh0cmEgY29uc3RhbnQgXFwoYl9uXFwpIGluIHRoZSBzZXR1cCJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQgdW5kZXJzdGFuZHMgdGhlIGRlZmluaW5nIGZlYXR1cmUgb2YgdGhlIHNlY3Rpb24g4oCUIHRoZSBtYW5kYXRvcnkgZXh0cmEgY29uc3RhbnQg4oCUIHJhdGhlciB0aGFuIG9ubHkgY29weWluZyBhcml0aG1ldGljIGZyb20gdGhlIHdvcmtlZCBleGFtcGxlLiIsImhpbnQiOiJBc2sgd2hhdCBtYWtlcyB0aGlzIGV4YW1wbGUgc3RydWN0dXJhbGx5IGRpZmZlcmVudCBmcm9tIGFuIG9yZGluYXJ5IHByb3BlciBwYXJ0aWFsIGZyYWN0aW9uIHByb2JsZW0uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19XX0=" style="display:none;"></div>%%KC_END%%
