%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImdlbmVyYXRlZF9pbWFnZSIsInJhdGlvbmFsZSI6IlRoaXMgc2VjdGlvbiBpcyBjb21wdXRhdGlvbmFsIGFuZCB0aGUgYXZhaWxhYmxlIHRleHRib29rIHBhZ2UgaGFzIG5vIGV4dHJhY3RlZCBmaWd1cmVzLCBzbyBhIGNsZWFuIGdlbmVyYXRlZCB0ZWFjaGluZyB2aXN1YWwgaXMgdGhlIHN0cm9uZ2VzdCB3YXkgdG8gc2hvdyBob3cgdGhlIHJlc2lkdWUgaW5wdXRzIGFuZCBvdXRwdXRzIG1hcCBpbnRvIHRoZSBmaW5hbCBwYXJ0aWFsIGZyYWN0aW9uIGV4cGFuc2lvbi4iLCJjcmFtIjoiVXNlIG9uZSBtYXBwaW5nIGRpYWdyYW0gc28gc3R1ZGVudHMgY2FuIHJlY29nbml6ZSBmYXN0OiBjb2VmZmljaWVudHMgaW4sIHJlc2lkdWVzL3BvbGVzL2RpcmVjdCB0ZXJtcyBvdXQsIHRoZW4gd3JpdGUgdGhlIGV4cGFuc2lvbiBpbW1lZGlhdGVseS4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgdmlzdWFsIHRvIGNvbm5lY3QgdGhlIGNvbW1hbmQgc3ludGF4LCB0aGUgbWVhbmluZyBvZiBSL1AvSywgYW5kIG9uZSByZXByZXNlbnRhdGl2ZSBleGFtcGxlIHdpdGhvdXQgb3ZlcmxvYWRpbmcgZGV0YWlscy4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhlIHZpc3VhbCB0byBoaWdobGlnaHQgcmVwZWF0ZWQtcm9vdCBvcmRlcmluZyBhbmQgdGhlIHJvbGUgb2YgSyB3aGVuIHRoZSByYXRpb25hbCBmdW5jdGlvbiBpcyBpbXByb3Blci4ifQ==" style="display:none;"></div>%%KC_END%%
# B.7-7 Partial Fraction Expansions

> **Section Objective:** Learn how MATLAB's `residue` command turns a rational function into partial fractions, what each output vector means, and how to read the result in standard mathematical form.

Imagine spending ten minutes factoring a messy denominator by hand — then discovering MATLAB can do it in one line. The command `[R,P,K] = residue(B,A)` takes the numerator and denominator coefficient vectors of a rational function \(F(x) = B(x)/A(x)\) and returns everything you need to write the full partial fraction expansion.

This section covers three things: what each output vector means, how to reconstruct the standard mathematical form from the output, and two special cases that trip students up — repeated roots and improper rational functions. Mastering this saves algebra time, lets you check manual work instantly, and is especially valuable when the denominator has repeated factors.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgdG8gbWVtb3JpemUgdGhlIGlucHV0LW91dHB1dCBwYXR0ZXJuIGluIHNlY29uZHMuIiwic3RhbmRhcmQiOiJVc2UgdGhpcyB0byB1bmRlcnN0YW5kIGhvdyB0aGUgY29tbWFuZCBwaWVjZXMgY29ubmVjdCB0byB0aGUgZmluYWwgZXhwYW5zaW9uLiIsInRvcF9zY29yZSI6IlVzZSB0aGlzIHRvIG5vdGljZSByZXBlYXRlZCBwb2xlcyBhbmQgZGlyZWN0IHRlcm1zIHdpdGhvdXQgY29uZnVzaW9uLiJ9" style="display:none;"></div>%%KC_END%%
*🎨 The residue command: inputs B and A map to outputs R, P, and K, which together reconstruct the full partial fraction expansion.*
![Illustration](/generated/gptimage2-1777216566343-4481.png)

$$[R,P,K] = \mathrm{residue}(B,A)$$
*Here \(B\) and \(A\) are the numerator and denominator coefficient vectors (in descending powers of \(x\)), and MATLAB returns \(R\), \(P\), and \(K\) — the three pieces needed to rebuild the complete partial fraction expansion.*

## 1. What residue Returns

The `residue` command produces three output vectors, each with a distinct role:

- **R** stores the partial-fraction coefficients (also called residues). Each entry in \(R\) is the numerator of one fraction term.
- **P** stores the matching poles — the roots of the denominator \(A(x)\). Each entry in \(P\) pairs with the corresponding entry in \(R\).
- **K** stores the direct polynomial terms. This output is nonempty only when the rational function is **improper** — that is, when the degree of \(B(x)\) is at least the degree of \(A(x)\).

#### Important Input Rule

Both \(B\) and \(A\) must be entered in **descending powers** of \(x\), including zero coefficients. Skipping a zero will encode the wrong polynomial.

### EXAM TIP

Students often know the command but lose points by misreading \(K\) (treating it as a fraction term instead of a polynomial) or by forgetting that repeated entries in \(P\) produce several fraction terms with ascending denominator powers.

**Quick check:** If \(K\) is nonempty, what does that tell you about the original rational function?

$$F(x)=\frac{B(x)}{A(x)}$$
*The `residue` command starts from a rational function written as a polynomial numerator \(B(x)\) divided by a polynomial denominator \(A(x)\), and decomposes it into simpler fraction terms.*

## 2. Reading the Example Output

Consider the rational function from the textbook:

$$F(x) = \frac{x^5 + \pi}{x^4 - \sqrt{8}\,x^3 + \sqrt{32}\,x - 4}$$

Because the numerator degree (5) exceeds the denominator degree (4), this is an **improper** rational function. After calling `[R,P,K] = residue(B,A)`, MATLAB returns:

- \(R = [7.8888,\ 5.9713,\ 3.1107,\ 0.1112]\)
- \(P = [1.4142,\ 1.4142,\ 1.4142,\ -1.4142]\)
- \(K = [1.0000,\ 2.8284]\)

**Interpreting \(P\):** The value \(1.4142\) appears **three times**, signaling a pole of multiplicity 3. This produces three fraction terms with denominators \((x - 1.4142)\), \((x - 1.4142)^2\), and \((x - 1.4142)^3\). The fourth entry \(-1.4142\) is a simple pole giving one term over \((x + 1.4142)\).

**Interpreting \(K\):** Two entries \([1.0000,\ 2.8284]\) mean the direct polynomial part is \(x + 2.8284\).

Combining everything gives the full expansion shown below.

$$F(x)=x+2.8284+\frac{7.8888}{x-1.4142}+\frac{5.9713}{(x-1.4142)^2}+\frac{3.1107}{(x-1.4142)^3}+\frac{0.1112}{x+1.4142}$$
*This is the standard partial fraction form rebuilt from the `residue` output: the direct polynomial \(x + 2.8284\) comes from \(K\), the three terms with \((x - 1.4142)\) in the denominator come from the repeated pole of multiplicity 3, and the final term comes from the simple pole at \(x = -1.4142\).*

## 3. Fast Interpretation Rules

Three rules cover almost every exam scenario involving `residue`:

1. **Enter \(B\) and \(A\) in descending powers of \(x\).** Include every coefficient, even zeros. The order encodes the polynomial structure MATLAB reads.

2. **Repeated entries in \(P\) mean repeated-factor denominators with ascending powers.** If a value appears \(k\) times, write \(k\) fraction terms: \(1/(x-p)\), \(1/(x-p)^2\), up to \(1/(x-p)^k\).

3. **A nonempty \(K\) means write the direct polynomial terms first**, before any fraction terms. The entries of \(K\) are the coefficients of that polynomial in descending order.

### CONFIDENCE NOTE

On a test, if you can clearly explain what \(R\), \(P\), and \(K\) each represent, you can usually reconstruct the final partial fraction answer correctly — even without performing the algebra by hand.

---
**📌 Key Takeaways**
- \(R\), \(P\), \(K\) = residue coefficients, poles, and direct polynomial terms from `residue(B,A)`
- Repeated values in \(P\) produce ascending denominator powers: \((x-p)\), \((x-p)^2\), \((x-p)^3\), ...
- Nonempty \(K\) signals an improper rational function; write those polynomial terms first

*In the next section we will explore how to apply partial fraction expansions to solve inverse Laplace and inverse Z-transforms analytically.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InJlc2lkdWVfb3V0cHV0c19tZWFuaW5nIiwibGFiZWwiOiJNZWFuaW5nIG9mIFIsIFAsIGFuZCBLIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJbiBNQVRMQUIsIHdoYXQgZG9lcyBcXChLXFwpIHJlcHJlc2VudCBpbiBgW1IsUCxLXSA9IHJlc2lkdWUoQixBKWA/Iiwib3B0aW9ucyI6WyJBLiBUaGUgcm9vdHMgb2YgdGhlIGRlbm9taW5hdG9yIiwiQi4gVGhlIGRpcmVjdCBwb2x5bm9taWFsIHRlcm1zIHdoZW4gdGhlIHJhdGlvbmFsIGZ1bmN0aW9uIGlzIGltcHJvcGVyIiwiQy4gVGhlIGNvZWZmaWNpZW50cyBvZiB0aGUgbnVtZXJhdG9yIG9ubHkiLCJELiBUaGUgcmVwZWF0ZWQgcG9sZXMgb25seSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlxcKEtcXCkgc3RvcmVzIHRoZSBkaXJlY3QgdGVybXMgdGhhdCBhcHBlYXIgd2hlbiB0aGUgbnVtZXJhdG9yIGRlZ3JlZSBpcyBhdCBsZWFzdCB0aGUgZGVub21pbmF0b3IgZGVncmVlLCBzbyB0aGUgcmF0aW9uYWwgZnVuY3Rpb24gaXMgbm90IHByb3Blci4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGUgcm9vdHMgb3IgcG9sZXMgYXJlIHN0b3JlZCBpbiBcXChQXFwpLCBub3QgXFwoS1xcKS4iLCJDIjoiVGhlIG51bWVyYXRvciBjb2VmZmljaWVudHMgYXJlIHBhcnQgb2YgdGhlIGlucHV0IHZlY3RvciBcXChCXFwpLCBub3QgdGhlIG91dHB1dCBcXChLXFwpLiIsIkQiOiJSZXBlYXRlZCBwb2xlcyBhcmUgaWRlbnRpZmllZCB0aHJvdWdoIHJlcGVhdGVkIHZhbHVlcyBpbiBcXChQXFwpLCBub3QgYnkgXFwoS1xcKS4ifSwiaGludCI6IkFzayB3aGV0aGVyIFxcKEtcXCkgZGVzY3JpYmVzIGZyYWN0aW9uIHBpZWNlcyBvciBwb2x5bm9taWFsIHBpZWNlcy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHN0YXRlbWVudCBhYm91dCB0aGUgaW5wdXQgdmVjdG9ycyBcXChCXFwpIGFuZCBcXChBXFwpIGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBUaGV5IG11c3QgYmUgZW50ZXJlZCBpbiBhc2NlbmRpbmcgcG93ZXJzIG9mIFxcKHhcXCkiLCJCLiBUaGV5IGxpc3Qgb25seSB0aGUgbm9uemVybyBjb2VmZmljaWVudHMiLCJDLiBUaGV5IG11c3QgYmUgZW50ZXJlZCBpbiBkZXNjZW5kaW5nIHBvd2VycyBvZiBcXCh4XFwpIiwiRC4gVGhleSBtdXN0IGhhdmUgdGhlIHNhbWUgbGVuZ3RoIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiTUFUTEFCIGByZXNpZHVlYCBleHBlY3RzIGNvZWZmaWNpZW50IHZlY3RvcnMgb3JkZXJlZCBmcm9tIGhpZ2hlc3QgcG93ZXIgZG93biB0byB0aGUgY29uc3RhbnQgdGVybS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIHJldmVyc2VzIHRoZSByZXF1aXJlZCBvcmRlciBhbmQgd291bGQgZW5jb2RlIHRoZSB3cm9uZyBwb2x5bm9taWFsLiIsIkIiOiJaZXJvIGNvZWZmaWNpZW50cyBtdXN0IHN0aWxsIGJlIGluY2x1ZGVkIHRvIHByZXNlcnZlIHRoZSBjb3JyZWN0IHBvd2Vycy4iLCJEIjoiVGhlIG51bWVyYXRvciBhbmQgZGVub21pbmF0b3IgY2FuIGhhdmUgZGlmZmVyZW50IGRlZ3JlZXMsIHNvIHRoZSB2ZWN0b3JzIG5lZWQgbm90IGJlIHRoZSBzYW1lIGxlbmd0aC4ifSwiaGludCI6IlRoaW5rIGFib3V0IHN0YW5kYXJkIHBvbHlub21pYWwgY29lZmZpY2llbnQtdmVjdG9yIGZvcm1hdCBpbiBNQVRMQUIuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJyZXBlYXRlZF9wb2xlc19pbnRlcnByZXRhdGlvbiIsImxhYmVsIjoiUmVwZWF0ZWQgcG9sZXMgYW5kIGRlbm9taW5hdG9yIHBvd2VycyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiU3VwcG9zZSBgcmVzaWR1ZWAgcmV0dXJucyBcXChQID0gWzIsXFwgMixcXCAyLFxcIC0xXVxcKS4gV2hhdCBpcyB0aGUgYmVzdCBpbnRlcnByZXRhdGlvbj8iLCJvcHRpb25zIjpbIkEuIFRoZXJlIGlzIG9uZSB0ZXJtIG92ZXIgXFwoeC0yXFwpIGFuZCBvbmUgdGVybSBvdmVyIFxcKHgrMVxcKSBvbmx5IiwiQi4gVGhlcmUgYXJlIHRocmVlIHNlcGFyYXRlIHVucmVsYXRlZCBwb2xlcyBhdCBcXCh4PTJcXCkiLCJDLiBUaGVyZSBpcyBhIHJlcGVhdGVkIHBvbGUgYXQgXFwoeD0yXFwpIHByb2R1Y2luZyB0ZXJtcyB3aXRoIGRlbm9taW5hdG9ycyBcXCgoeC0yKVxcKSwgXFwoKHgtMileMlxcKSwgYW5kIFxcKCh4LTIpXjNcXCksIHBsdXMgb25lIHRlcm0gb3ZlciBcXCh4KzFcXCkiLCJELiBUaGUgb3V0cHV0IGlzIGludmFsaWQgYmVjYXVzZSBwb2xlcyBzaG91bGQgbm90IHJlcGVhdCJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlJlcGVhdGVkIGVudHJpZXMgaW4gXFwoUFxcKSBpbmRpY2F0ZSBhIHJlcGVhdGVkIHJvb3QsIHNvIHRoZSBleHBhbnNpb24gaW5jbHVkZXMgYXNjZW5kaW5nIHBvd2VycyBvZiB0aGUgcmVwZWF0ZWQgZGVub21pbmF0b3IgZmFjdG9yLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgaWdub3JlcyB0aGUgcmVwZWF0ZWQtcm9vdCBzdHJ1Y3R1cmUgYW5kIGxvc2VzIHR3byBuZWVkZWQgdGVybXMuIiwiQiI6IlRoZXkgYXJlIG5vdCB1bnJlbGF0ZWQ7IHJlcGV0aXRpb24gc2lnbmFscyBtdWx0aXBsaWNpdHkgb2YgdGhlIHNhbWUgcG9sZS4iLCJEIjoiUmVwZWF0aW5nIHBvbGVzIGlzIHZhbGlkIGFuZCBleHBlY3RlZCBmb3IgcmVwZWF0ZWQgcm9vdHMuIn0sImhpbnQiOiJSZXBlYXRlZCB2YWx1ZXMgaW4gXFwoUFxcKSBtZWFuIG11bHRpcGxpY2l0eSwgbm90IHNlcGFyYXRlIHVucmVsYXRlZCBwb2xlcy4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoiZ2VuZXJhdGVkX2ltYWdlIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AyX3EyIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJBIHN0dWRlbnQgc2VlcyB0aGUgdmFsdWUgXFwoMS40MTQyXFwpIHJlcGVhdGVkIHRocmVlIHRpbWVzIGluIFxcKFBcXCkuIFdoYXQgZGVub21pbmF0b3IgZmFjdG9ycyBzaG91bGQgYXBwZWFyIGluIHRoZSBwYXJ0aWFsIGZyYWN0aW9uIGV4cGFuc2lvbj8iLCJpZGVhbF9hbnN3ZXIiOiJUaGUgZXhwYW5zaW9uIHNob3VsZCBpbmNsdWRlIHRlcm1zIHdpdGggZGVub21pbmF0b3JzIFxcKCh4LTEuNDE0MilcXCksIFxcKCh4LTEuNDE0MileMlxcKSwgYW5kIFxcKCh4LTEuNDE0MileM1xcKS4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IGluY2x1ZGUgdGhlIHJlcGVhdGVkIGJhc2UgZmFjdG9yIFxcKCh4LTEuNDE0MilcXCkiLCJNdXN0IGxpc3QgcG93ZXJzIDEsIDIsIGFuZCAzIiwiTXVzdCBub3QgdHJlYXQgdGhlIHRocmVlIHJlcGVhdHMgYXMgdW5yZWxhdGVkIGRpZmZlcmVudCBmYWN0b3JzIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCBjYW4gdHJhbnNsYXRlIG11bHRpcGxpY2l0eSBpbnRvIHRoZSBjb3JyZWN0IHNlcXVlbmNlIG9mIGRlbm9taW5hdG9yIHBvd2Vycy4iLCJoaW50IjoiQSBwb2xlIHJlcGVhdGVkIHRocmVlIHRpbWVzIGNyZWF0ZXMgdGhyZWUgZnJhY3Rpb24gdGVybXMgd2l0aCBhc2NlbmRpbmcgcG93ZXJzLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoicmVjb25zdHJ1Y3Rfc3RhbmRhcmRfZm9ybSIsImxhYmVsIjoiUmVidWlsZGluZyB0aGUgZmluYWwgcGFydGlhbCBmcmFjdGlvbiBleHBhbnNpb24iLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSWYgYHJlc2lkdWVgIHJldHVybnMgXFwoUiA9IFs0LFxcIC0zXVxcKSwgXFwoUCA9IFsxLFxcIC0yXVxcKSwgYW5kIFxcKEsgPSBbMl1cXCksIHdoaWNoIGV4cHJlc3Npb24gbWF0Y2hlcyB0aGUgb3V0cHV0PyIsIm9wdGlvbnMiOlsiQS4gXFwoRih4KSA9IDIgKyBcXGRmcmFjezR9e3gtMX0gLSBcXGRmcmFjezN9e3grMn1cXCkiLCJCLiBcXChGKHgpID0gMiArIFxcZGZyYWN7NH17eCsxfSAtIFxcZGZyYWN7M317eC0yfVxcKSIsIkMuIFxcKEYoeCkgPSBcXGRmcmFjezR9e3gtMX0gLSBcXGRmcmFjezN9e3grMn1cXCkiLCJELiBcXChGKHgpID0gMnggKyBcXGRmcmFjezR9e3gtMX0gLSBcXGRmcmFjezN9e3grMn1cXCkiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJFYWNoIHJlc2lkdWUgcGFpcnMgd2l0aCBpdHMgbWF0Y2hpbmcgcG9sZTogXFwoUCA9IDFcXCkgZ2l2ZXMgXFwoeC0xXFwpIGFuZCBcXChQID0gLTJcXCkgZ2l2ZXMgXFwoeCsyXFwpLCB3aGlsZSBcXChLID0gWzJdXFwpIGdpdmVzIHRoZSBkaXJlY3QgY29uc3RhbnQgdGVybSBcXCgyXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoZSBkZW5vbWluYXRvciBzaWducyBhcmUgcmV2ZXJzZWQgZnJvbSB0aGUgcG9sZSB2YWx1ZXMuIiwiQyI6IlRoaXMgb21pdHMgdGhlIGRpcmVjdCB0ZXJtIHN0b3JlZCBpbiBcXChLXFwpLiIsIkQiOiJcXChLID0gWzJdXFwpIG1lYW5zIGEgY29uc3RhbnQgZGlyZWN0IHRlcm0sIG5vdCBcXCgyeFxcKS4ifSwiaGludCI6Ik1hdGNoIGVhY2ggcmVzaWR1ZSB3aXRoIFxcKHhcXCkgbWludXMgdGhlIHBvbGUgdmFsdWUsIHRoZW4gYWRkIFxcKEtcXCkgZmlyc3QuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hhdCBpcyB0aGUgc3Ryb25nZXN0IGNsdWUgdGhhdCB0aGUgb3JpZ2luYWwgcmF0aW9uYWwgZnVuY3Rpb24gd2FzIGltcHJvcGVyPyIsIm9wdGlvbnMiOlsiQS4gXFwoUlxcKSBjb250YWlucyBkZWNpbWFsIHZhbHVlcyIsIkIuIFxcKFBcXCkgY29udGFpbnMgYSBuZWdhdGl2ZSB2YWx1ZSIsIkMuIFxcKEtcXCkgaXMgbm9uZW1wdHkiLCJELiBUaGUgZGVub21pbmF0b3IgaGFzIHJlcGVhdGVkIHJvb3RzIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiQSBub25lbXB0eSBcXChLXFwpIG1lYW5zIE1BVExBQiBoYWQgdG8gc2VwYXJhdGUgb3V0IGRpcmVjdCBwb2x5bm9taWFsIHRlcm1zLCB3aGljaCBoYXBwZW5zIHByZWNpc2VseSB3aGVuIHRoZSByYXRpb25hbCBmdW5jdGlvbiBpcyBpbXByb3Blci4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJEZWNpbWFsIHZhbHVlcyBpbiBcXChSXFwpIGRvIG5vdCBkZXRlcm1pbmUgd2hldGhlciBhIHJhdGlvbmFsIGZ1bmN0aW9uIGlzIHByb3BlciBvciBpbXByb3Blci4iLCJCIjoiQSBuZWdhdGl2ZSBwb2xlIHZhbHVlIGlzIG5vcm1hbCBhbmQgc2F5cyBub3RoaW5nIGFib3V0IHByb3Blcm5lc3MuIiwiRCI6IlJlcGVhdGVkIHJvb3RzIGFmZmVjdCB0aGUgZnJhY3Rpb24gc3RydWN0dXJlIGJ1dCBkbyBub3QgYnkgdGhlbXNlbHZlcyBpbXBseSBpbXByb3Blcm5lc3MuIn0sImhpbnQiOiJJbXByb3BlciBmdW5jdGlvbnMgY3JlYXRlIHNvbWV0aGluZyBleHRyYSBiZXNpZGVzIGZyYWN0aW9uIHRlcm1zLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
