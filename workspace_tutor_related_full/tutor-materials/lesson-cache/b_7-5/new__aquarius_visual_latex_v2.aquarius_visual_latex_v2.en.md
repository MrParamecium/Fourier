%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJUaGlzIHNlY3Rpb24gaXMgbW9zdGx5IHN5bWJvbGljIE1BVExBQiBzeW50YXgsIHNvIGZvcm11bGFzIHNob3VsZCBiZSBMYVRlWC1uYXRpdmUuIEhvd2V2ZXIsIHRoZSBtYWluIGlkZWEgaCh0KT1mKHQpZyh0KSBpcyBlYXNpZXIgdG8gdW5kZXJzdGFuZCBieSBzZWVpbmcgZWFjaCBzYW1wbGUgb2YgZih0KSBzY2FsZWQgYnkgZyh0KS4gVXNlIGEgUmVhY3QgQ2FudmFzIGRlbW8gZm9yIHRoZSBwb2ludC1ieS1wb2ludCBwcm9jZXNzIGFuZCB0aGUgYXZhaWxhYmxlIHRleHRib29rIEZpZy4gQi4xNCBmb3IgdGhlIGZpbmFsIHdhdmVmb3JtIGNvbXBhcmlzb24uIiwiY3JhbSI6IlVzZSB2aXN1YWxzIHRvIG1ha2UgdGhlIGV4YW0gdHJpZ2dlciBvYnZpb3VzOiB1c2UgLiogd2hlbiBlYWNoIHNhbXBsZSBtdXN0IHBhaXIgd2l0aCB0aGUgbWF0Y2hpbmcgc2FtcGxlLiIsInN0YW5kYXJkIjoiVXNlIHRoZSBkZW1vIGFuZCBGaWcuIEIuMTQgdG8gY29ubmVjdCBNQVRMQUIgc3ludGF4IGg9Zi4qZyB3aXRoIHRoZSB3YXZlZm9ybSBoKHQpPWYodClnKHQpLiIsInRvcF9zY29yZSI6IlVzZSB2aXN1YWxzIHRvIHN0cmVzcyB0aGUgdHJhcDogc2FtZS1sb29raW5nIHZlY3RvcnMgbWF5IGZhaWwgaWYgb25lIGlzIGEgcm93IHZlY3RvciBhbmQgdGhlIG90aGVyIGlzIGEgY29sdW1uIHZlY3Rvci4ifQ==" style="display:none;"></div>%%KC_END%%
# Element-by-Element Operations

> **Section Objective:** Learn when MATLAB needs element-by-element operations instead of ordinary matrix multiplication.

---

### CONCEPTS IN THIS SECTION

- Standard matrix multiplication
- Element-by-element multiplication
- Matching dimensions
- Period operators
- Waveform comparison

## 1. Why ordinary * is not the right tool here

MATLAB's `*` operator follows the rules of matrix algebra. That means the **inner dimensions must match**: a \(1 \times N\) row vector times an \(N \times 1\) column vector is legal and produces one scalar. But two \(1 \times N\) row vectors cannot be multiplied with `*` — their inner dimensions do not agree.

This matters because many signal-processing tasks require pairing the **first entry of f with the first entry of g**, the second with the second, and so on. That is not what matrix multiplication does.

#### Minimal Example

If `f` is \(1 \times 4\) and `g` is \(1 \times 4\), then `f*g` throws a dimension error. You need `f.*g`.

> **Exam Note:** If the problem asks for matching entries or matching time samples, ordinary `*` is probably the wrong operator.

## 2. Element-by-element operations pair matching entries

- **Inner product case:** the \(N\) inner dimensions match, so multiplication is allowed.
- **N entries collapse into one scalar:** each pair is multiplied and all products are summed.
- **Use it when** the goal is one accumulated value — for example, a dot product or energy calculation.
- **Exam trigger:** wording like 'dot product', 'inner product', or 'sum of products'.
- **Common misuse:** using `*` when the desired output should still be a length-\(N\) vector — that requires `.*` instead.

$$(1 \times N)(N \times 1) \rightarrow 1 \times 1$$

## 3. MATLAB period operators

- **Outer product case:** a column vector times a row vector creates a full \(N \times M\) matrix.
- **Every row entry pairs with every column entry:** entry \((i,j)\) of the result equals \(a_i b_j\).
- **Use it when** you need a table or grid of all pairings between two sets of values.
- **Exam trigger:** a requested \(N \times M\) table or 'all combinations' phrasing.
- **Common misuse:** expecting a same-sized vector result — the output is a matrix, not a vector.

$$(N \times 1)(1 \times M) \rightarrow N \times M$$

## 2. Element-by-Element Operations Pair Matching Entries

Element-by-element operations keep the **same shape** as the input vectors because each output entry is formed from the two corresponding input entries — nothing more.

Consider the MATLAB code:

```matlab
g = exp(-10*t);
h = f.*g;
```

Here `t`, `f`, and `g` must all be the same size. The operator `.*` tells MATLAB: multiply entry 1 of `f` by entry 1 of `g`, entry 2 by entry 2, and so on. The result `h` has exactly the same number of entries as `f` and `g`.

**Critical trap:** A row vector and a column vector with the same number of entries are **not** the same dimensions. A \(1 \times N\) vector and an \(N \times 1\) vector will cause a dimension error with `.*`, even though both contain \(N\) numbers. Make sure both vectors share the same orientation before applying any period operator.

$$h_k = f_k \, g_k, \quad k = 1, 2, \ldots, N$$
*- **\(h_k\)** is the \(k\)th output sample — the result at position \(k\).
- **\(f_k\) and \(g_k\)** are the \(k\)th samples of the two input vectors; only matching indices interact.
- **Use this when** each time sample should be scaled by the matching time sample of another signal.
- **Exam trigger:** wording like 'element-by-element', 'pointwise', 'sample-by-sample', or any MATLAB syntax containing a period before an operator.
- **Common misuse:** writing `h = f*g`, which asks MATLAB for matrix multiplication and will either error or produce a scalar — not the desired length-\(N\) vector.*

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="interactive_demo" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiRHJhZyB0aGUgZGVjYXkgc2xpZGVyIGFuZCBpbW1lZGlhdGVseSBzZWUgdGhhdCAuKiBwcmVzZXJ2ZXMgdmVjdG9yIGxlbmd0aCB3aGlsZSBzY2FsaW5nIGVhY2ggc2FtcGxlLiIsInN0YW5kYXJkIjoiU2hvdyBmKHQpLCBnKHQpPWVeey0xMHR9LCBhbmQgaCh0KT1mKHQpZyh0KSB0b2dldGhlciBzbyB0aGUgc3ludGF4IGg9Zi4qZyBiZWNvbWVzIHZpc3VhbC4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhlIHJvdy12cy1jb2x1bW4gdG9nZ2xlIHRvIGV4cG9zZSB3aHkgZXF1YWwgZW50cnkgY291bnQgaXMgbm90IGVub3VnaCB3aGVuIGRpbWVuc2lvbnMgZGlmZmVyLiJ9" style="display:none;"></div><div class="kc-interactive-demo" data-demo-b64="eyJ0eXBlIjoiaW50ZXJhY3RpdmVfZGVtbyIsInRlYWNoaW5nX3JvbGUiOiJjb25jZXB0X2FuY2hvciIsIm1vZGVfc3BlY2lmaWNfdmlzdWFsX3VzZSI6eyJjcmFtIjoiRHJhZyB0aGUgZGVjYXkgc2xpZGVyIGFuZCBpbW1lZGlhdGVseSBzZWUgdGhhdCAuKiBwcmVzZXJ2ZXMgdmVjdG9yIGxlbmd0aCB3aGlsZSBzY2FsaW5nIGVhY2ggc2FtcGxlLiIsInN0YW5kYXJkIjoiU2hvdyBmKHQpLCBnKHQpPWVeey0xMHR9LCBhbmQgaCh0KT1mKHQpZyh0KSB0b2dldGhlciBzbyB0aGUgc3ludGF4IGg9Zi4qZyBiZWNvbWVzIHZpc3VhbC4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhlIHJvdy12cy1jb2x1bW4gdG9nZ2xlIHRvIGV4cG9zZSB3aHkgZXF1YWwgZW50cnkgY291bnQgaXMgbm90IGVub3VnaCB3aGVuIGRpbWVuc2lvbnMgZGlmZmVyLiJ9LCJkZW1vX3NwZWMiOnsidGl0bGUiOiJQb2ludC1ieS1Qb2ludCBNdWx0aXBsaWNhdGlvbiBEZW1vIiwiZGVzY3JpcHRpb24iOiJBbiBpbnRlcmFjdGl2ZSBSZWFjdCArIENhbnZhcyBsaW5lIHBsb3Qgb24gYSBwdXJlIHdoaXRlIGJhY2tncm91bmQgc2hvd2luZyB0aHJlZSBjbGVhcmx5IGxhYmVsZWQgY3VydmVzOiBmKHQpIChzb2xpZCBibHVlKSwgZyh0KSA9IGVeey1hdH0gKHNvbGlkIGdyZWVuKSwgYW5kIGgodCkgPSBmKHQpZyh0KSAoZGFzaGVkIHJlZCkuIEEgdmVydGljYWwgZ3VpZGUgbGluZSBoaWdobGlnaHRzIG9uZSBzZWxlY3RlZCBzYW1wbGUgaW5kZXggaywgZHJvcHBpbmcgZnJvbSBmX2sgYW5kIGdfayBkb3duIHRvIGhfayB0byBzaG93IHRoZSBwYWlyaW5nIHZpc3VhbGx5LiIsImNvbnRyb2xzIjpbeyJpZCI6ImRlY2F5X3NsaWRlciIsImxhYmVsIjoiRGVjYXkgcmF0ZSBhIGluIGcodCkgPSBlXnstYXR9IiwidHlwZSI6InNsaWRlciIsInJhbmdlIjpbMSwzMF0sImRlZmF1bHQiOjEwfSx7ImlkIjoiZGltZW5zaW9uX3RvZ2dsZSIsImxhYmVsIjoiVmVjdG9yIG9yaWVudGF0aW9uOiBib3RoIHJvdyB2ZWN0b3JzIHZzIHJvdyDDlyBjb2x1bW4gKG1pc21hdGNoKSIsInR5cGUiOiJ0b2dnbGUifSx7ImlkIjoic2FtcGxlX2hpZ2hsaWdodCIsImxhYmVsIjoiSGlnaGxpZ2h0IHNhbXBsZSBpbmRleCBrIHdpdGggdmVydGljYWwgZ3VpZGUgbGluZXMiLCJ0eXBlIjoiY2hlY2tib3gifV0sInN0dWRlbnRfdGFzayI6Ik1vdmUgdGhlIGRlY2F5IHNsaWRlciBhbmQgb2JzZXJ2ZSB0aGF0IGgodCkgY2hhbmdlcyBzYW1wbGUtYnktc2FtcGxlIOKAlCBlYWNoIHBvaW50IG9mIGggaXMgdGhlIHByb2R1Y3Qgb2YgdGhlIG1hdGNoaW5nIHBvaW50cyBvZiBmIGFuZCBnLCBub3QgYSBzaW5nbGUgZ2xvYmFsIG1hdHJpeCBwcm9kdWN0LiBUaGVuIHRvZ2dsZSB0aGUgZGltZW5zaW9uIG1pc21hdGNoIHRvIHNlZSB3aHkgcm93IHZzIGNvbHVtbiBvcmllbnRhdGlvbiBtYXR0ZXJzLiIsImltcGxlbWVudGF0aW9uX25vdGUiOiJEaXNwbGF5IHRoZSBmb3JtdWxhIGFzIGcodCkgPSBlXnstYXR9IHdpdGggYSBjbG9zaW5nIHBhcmVudGhlc2lzIG9uIHRoZSBleHBvbmVudC4gRG8gbm90IGluY2x1ZGUgdGhlIG1hbGZvcm1lZCBlXnstYXQpIHR5cG8uIFdoZW4gdGhlIGRpbWVuc2lvbiB0b2dnbGUgaXMgc2V0IHRvIG1pc21hdGNoLCBkaXNwbGF5IGEgY2xlYXIgZXJyb3IgbWVzc2FnZTogJ0RpbWVuc2lvbiBtaXNtYXRjaDogMcOXTiBjYW5ub3QgdXNlIC4qIHdpdGggTsOXMSBkaXJlY3RseS4nIn19"></div>%%KC_END%%

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="example_support" data-visual-use-b64="eyJjcmFtIjoiVGhlIGRvdHRlZCBzbWFsbGVyLWFtcGxpdHVkZSBjdXJ2ZSBpcyB0aGUgZmFzdCB2aXN1YWwgY3VlIGZvciBlbGVtZW50LWJ5LWVsZW1lbnQgc2NhbGluZy4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgZmlndXJlIGFzIHRoZSByZXByZXNlbnRhdGl2ZSByZXN1bHQgb2YgbXVsdGlwbHlpbmcgZih0KSBhbmQgZyh0KSBwb2ludCBieSBwb2ludC4iLCJ0b3Bfc2NvcmUiOiJFeHBsYWluIHdoeSB0aGUgb3V0cHV0IHJlbWFpbnMgYSB0aW1lIHZlY3RvciByYXRoZXIgdGhhbiBiZWNvbWluZyBhIHNjYWxhciBvciBtYXRyaXguIn0=" style="display:none;"></div>%%KC_END%%
![Fig. B.14](/figures/page-049-fig__b_14-1.png)
*Fig. B.14 compares the original sinusoid f(t) with the element-by-element product h(t) = f(t)g(t).*
<div class="lesson-figure-description">The horizontal axis shows time t from 0 to 0.2 and the vertical axis shows Amplitude from approximately -1 to 1. The solid curve f(t) oscillates with full amplitude across the entire interval, while the dotted curve h(t) follows the same sinusoidal pattern but with progressively reduced amplitude — the exponential envelope g(t) = e^{-10t} shrinks each sample of f(t) by the matching value of g(t). Students should connect the dotted curve h(t) directly to the MATLAB command h = f.*g, not h = f*g: the output is still a time vector of the same length, not a scalar or matrix.</div>

## 3. MATLAB Period Operators

Whenever multiplication, division, or exponentiation must happen **entry by entry**, place a period before the operator:

- `.*` — element-by-element multiplication
- `./` — element-by-element division
- `.^` — element-by-element exponentiation

> **Important:** Addition (`+`) and subtraction (`-`) are already element-by-element in MATLAB. They do not need a period.

#### Quick Check

If `f` and `g` are same-sized row vectors:
- `h = f.*g` — **valid**: pairs matching entries, result is the same size.
- `h = f*g` — **not valid** for two row vectors: MATLAB expects matrix-conformable dimensions.

### EXAM TIP

Whenever you see a power operation on a vector (e.g., squaring every sample), always ask: should this be `.^` or `^`? For entry-by-entry operations, the period is required.

---
**📌 Key Takeaways**
- Ordinary `*` follows matrix algebra: \((1 \times N)(N \times 1) \rightarrow 1 \times 1\) (scalar) and \((N \times 1)(1 \times M) \rightarrow N \times M\) (matrix); two same-orientation vectors are not conformable.
- Element-by-element multiplication pairs matching entries: \(h_k = f_k g_k\) for \(k = 1, 2, \ldots, N\); the output vector is the same size as the inputs.
- Use `h = f.*g` in MATLAB for pointwise multiplication; `f` and `g` must have identical dimensions — same size **and** same orientation (both row or both column).
- Period operators `.*`, `./`, and `.^` apply operations entry by entry; addition and subtraction are already element-by-element and need no period.

*Next, matrix operations use MATLAB commands to build and manipulate vectors and matrices.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NSwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo0LCJtYXgiOjV9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InN0YW5kYXJkX3ZzX2VsZW1lbnR3aXNlX211bHRpcGxpY2F0aW9uIiwibGFiZWwiOiJPcmRpbmFyeSAqIHZlcnN1cyBlbGVtZW50LWJ5LWVsZW1lbnQgLioiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkluIE1BVExBQiwgYGZgIGFuZCBgZ2AgYXJlIGJvdGggXFwoMSBcXHRpbWVzIE5cXCkgcm93IHZlY3RvcnMsIGFuZCB5b3Ugd2FudCBgaGAgdG8gY29udGFpbiBcXChoX2sgPSBmX2sgZ19rXFwpLiBXaGljaCBjb21tYW5kIGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBoID0gZipnIiwiQi4gaCA9IGYuKmciLCJDLiBoID0gZi9nIiwiRC4gaCA9IGZeZyJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkVsZW1lbnQtYnktZWxlbWVudCBtdWx0aXBsaWNhdGlvbiB1c2VzIGAuKmAsIHNvIGVhY2ggZW50cnkgb2YgYGZgIGlzIG11bHRpcGxpZWQgYnkgdGhlIG1hdGNoaW5nIGVudHJ5IG9mIGBnYC4gVGhlIHJlc3VsdCBgaGAgaGFzIHRoZSBzYW1lIHNpemUgYXMgYGZgIGFuZCBgZ2AuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiYCpgIGFza3MgZm9yIG1hdHJpeCBtdWx0aXBsaWNhdGlvbiwgYW5kIHR3byBcXCgxIFxcdGltZXMgTlxcKSByb3cgdmVjdG9ycyBhcmUgbm90IGNvbmZvcm1hYmxlIGZvciBgKmAuIiwiQyI6ImAvYCBpcyBtYXRyaXggcmlnaHQgZGl2aXNpb24sIG5vdCBwb2ludC1ieS1wb2ludCBtdWx0aXBsaWNhdGlvbi4iLCJEIjoiYF5gIGlzIG1hdHJpeCBwb3dlciwgbm90IHRoZSBNQVRMQUIgc3ludGF4IGZvciBtdWx0aXBseWluZyBtYXRjaGluZyB2ZWN0b3IgZW50cmllcy4ifSwiaGludCI6Ikxvb2sgZm9yIHRoZSBwZXJpb2QgYmVmb3JlIHRoZSBtdWx0aXBsaWNhdGlvbiBzeW1ib2wuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCB3b3JkaW5nIGlzIHRoZSBzdHJvbmdlc3QgdHJpZ2dlciBmb3IgdXNpbmcgYC4qYCBpbnN0ZWFkIG9mIGAqYD8iLCJvcHRpb25zIjpbIkEuIENvbXB1dGUgb25lIHNjYWxhciBpbm5lciBwcm9kdWN0IiwiQi4gTXVsdGlwbHkgZXZlcnkgc2FtcGxlIGJ5IHRoZSBtYXRjaGluZyBzYW1wbGUgb2YgYW5vdGhlciB2ZWN0b3IiLCJDLiBDcmVhdGUgYW4gXFwoTiBcXHRpbWVzIE1cXCkgdGFibGUgb2YgYWxsIHBhaXJpbmdzIiwiRC4gVHJhbnNwb3NlIGEgcm93IHZlY3RvciBpbnRvIGEgY29sdW1uIHZlY3RvciJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6Ik1hdGNoaW5nLXNhbXBsZSBtdWx0aXBsaWNhdGlvbiBpcyBleGFjdGx5IGVsZW1lbnQtYnktZWxlbWVudCBtdWx0aXBsaWNhdGlvbiDigJQgZWFjaCBvdXRwdXQgZW50cnkgY29tZXMgZnJvbSB0aGUgdHdvIGNvcnJlc3BvbmRpbmcgaW5wdXQgZW50cmllcy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJBIHNjYWxhciBpbm5lciBwcm9kdWN0IHVzZXMgb3JkaW5hcnkgbWF0cml4IG11bHRpcGxpY2F0aW9uIHdpdGggY29uZm9ybWFibGUgZGltZW5zaW9uczogXFwoKDEgXFx0aW1lcyBOKShOIFxcdGltZXMgMSkgXFxyaWdodGFycm93IDEgXFx0aW1lcyAxXFwpLiIsIkMiOiJBIHRhYmxlIG9mIGFsbCBwYWlyaW5ncyBkZXNjcmliZXMgYW4gb3V0ZXIgcHJvZHVjdCBcXCgoTiBcXHRpbWVzIDEpKDEgXFx0aW1lcyBNKSBcXHJpZ2h0YXJyb3cgTiBcXHRpbWVzIE1cXCksIG5vdCBlbGVtZW50LWJ5LWVsZW1lbnQgbXVsdGlwbGljYXRpb24uIiwiRCI6IlRyYW5zcG9zaXRpb24gY2hhbmdlcyB2ZWN0b3Igb3JpZW50YXRpb247IGl0IGRvZXMgbm90IG11bHRpcGx5IGVudHJpZXMuIn0sImhpbnQiOiJBc2sgd2hldGhlciB0aGUgb3V0cHV0IHNob3VsZCBzdGF5IHRoZSBzYW1lIHNpemUgYXMgdGhlIGlucHV0IHZlY3RvcnMuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJkaW1lbnNpb25fY29uZm9ybWFiaWxpdHkiLCJsYWJlbCI6IkRpbWVuc2lvbiBydWxlcyBmb3IgdmVjdG9yIG11bHRpcGxpY2F0aW9uIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGF0IGlzIHRoZSByZXN1bHQgc2l6ZSBvZiBvcmRpbmFyeSBtYXRyaXggbXVsdGlwbGljYXRpb24gXFwoKDEgXFx0aW1lcyBOKShOIFxcdGltZXMgMSlcXCk/Iiwib3B0aW9ucyI6WyJBLiBcXCgxIFxcdGltZXMgMVxcKSIsIkIuIFxcKDEgXFx0aW1lcyBOXFwpIiwiQy4gXFwoTiBcXHRpbWVzIDFcXCkiLCJELiBcXChOIFxcdGltZXMgTlxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IkEgcm93IHZlY3RvciB0aW1lcyBhIGNvbmZvcm1hYmxlIGNvbHVtbiB2ZWN0b3IgZ2l2ZXMgdGhlIGlubmVyIHByb2R1Y3QsIHdoaWNoIGlzIG9uZSBzY2FsYXIg4oCUIGEgXFwoMSBcXHRpbWVzIDFcXCkgcmVzdWx0LiBUaGUgb3V0ZXIgZGltZW5zaW9ucyAoYm90aCAxKSBkZXRlcm1pbmUgdGhlIG91dHB1dCBzaXplLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlxcKDEgXFx0aW1lcyBOXFwpIGlzIHRoZSBvcmlnaW5hbCByb3ctdmVjdG9yIHNpemUsIG5vdCB0aGUgcmVzdWx0IG9mIGFuIGlubmVyIHByb2R1Y3QuIiwiQyI6IlxcKE4gXFx0aW1lcyAxXFwpIGlzIGEgY29sdW1uIHZlY3RvciwgYnV0IHRoZSBpbm5lciBkaW1lbnNpb25zIGNvbGxhcHNlIHRvIG9uZSBzY2FsYXIuIiwiRCI6IlxcKE4gXFx0aW1lcyBOXFwpIHdvdWxkIGNvbWUgZnJvbSBtdWx0aXBseWluZyBhbiBcXChOIFxcdGltZXMgMVxcKSBjb2x1bW4gdmVjdG9yIGJ5IGEgXFwoMSBcXHRpbWVzIE5cXCkgcm93IHZlY3RvciDigJQgdGhlIG91dGVyIHByb2R1Y3QuIn0sImhpbnQiOiJUaGUgb3V0ZXIgZGltZW5zaW9ucyBvZiB0aGUgdHdvIG1hdHJpY2VzIGdpdmUgdGhlIHJlc3VsdCBzaXplLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6IndhdmVmb3JtX2ludGVycHJldGF0aW9uIiwibGFiZWwiOiJWaXN1YWwgbWVhbmluZyBvZiBoKHQpID0gZih0KWcodCkiLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJPYnNlcnZlIEZpZy4gQi4xNCBvciB0aGUgZGVtbzogXFwoaCh0KVxcKSBpcyBwcm9kdWNlZCBmcm9tIFxcKGYodClcXCkgdXNpbmcgXFwoZyh0KSA9IGVeey0xMHR9XFwpLiBXaGF0IHNob3VsZCBoYXBwZW4gdG8gdGhlIGFtcGxpdHVkZSBvZiBcXChoKHQpXFwpIGFzIFxcKHRcXCkgaW5jcmVhc2VzPyIsIm9wdGlvbnMiOlsiQS4gSXQgZ2VuZXJhbGx5IHNocmlua3MgYmVjYXVzZSB0aGUgZXhwb25lbnRpYWwgZmFjdG9yIGRlY3JlYXNlcyIsIkIuIEl0IGJlY29tZXMgYSBjb25zdGFudCBzY2FsYXIiLCJDLiBJdCBiZWNvbWVzIGFuIFxcKE4gXFx0aW1lcyBOXFwpIG1hdHJpeCIsIkQuIEl0IG11c3QgaGF2ZSBsYXJnZXIgcGVha3MgdGhhbiBcXChmKHQpXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGhlIGV4cG9uZW50aWFsIGVudmVsb3BlIFxcKGVeey0xMHR9XFwpIGRlY3JlYXNlcyB0b3dhcmQgemVybyBhcyBcXCh0XFwpIGluY3JlYXNlcywgc28gbXVsdGlwbHlpbmcgZWFjaCBzYW1wbGUgb2YgXFwoZih0KVxcKSBwb2ludCBieSBwb2ludCByZWR1Y2VzIHRoZSBzaW51c29pZCdzIGFtcGxpdHVkZSBvdmVyIHRpbWUuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiRWxlbWVudC1ieS1lbGVtZW50IG11bHRpcGxpY2F0aW9uIGtlZXBzIGEgdmVjdG9yIG9mIHRpbWUgc2FtcGxlcyDigJQgdGhlIHNhbWUgbGVuZ3RoIGFzIHRoZSBpbnB1dHMg4oCUIG5vdCBvbmUgc2NhbGFyLiIsIkMiOiJBbiBcXChOIFxcdGltZXMgTlxcKSBtYXRyaXggd291bGQgY29tZSBmcm9tIGFuIG91dGVyIHByb2R1Y3QsIG5vdCBwb2ludC1ieS1wb2ludCBtdWx0aXBsaWNhdGlvbi4iLCJEIjoiQSBkZWNheWluZyBleHBvbmVudGlhbCBmYWN0b3IgXFwoZV57LTEwdH0gXFxsZXEgMVxcKSBmb3IgXFwodCBcXGdlcSAwXFwpIGNhbm5vdCBmb3JjZSBsYXJnZXIgcGVha3MuIn0sImhpbnQiOiJGb2N1cyBvbiB3aGF0IFxcKGVeey0xMHR9XFwpIGRvZXMgYXMgXFwodFxcKSBncm93cyBsYXJnZXIuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImJvb2tfZmlndXJlX29yX2RlbW9fb2JzZXJ2YXRpb24iLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJwZXJpb2Rfb3BlcmF0b3Jfc3ludGF4IiwibGFiZWwiOiJNQVRMQUIgcGVyaW9kIG9wZXJhdG9ycyIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDRfcTEiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkEgc3R1ZGVudCB3cml0ZXMgYHkgPSB4XjJgIHRvIHNxdWFyZSBldmVyeSBlbnRyeSBvZiB2ZWN0b3IgYHhgLiBXcml0ZSB0aGUgY29ycmVjdGVkIE1BVExBQiBjb21tYW5kIGFuZCBleHBsYWluIHRoZSBtaXN0YWtlLiIsImlkZWFsX2Fuc3dlciI6IlRoZSBjb3JyZWN0ZWQgY29tbWFuZCBpcyBgeSA9IHguXjJgLiBUaGUgcGVyaW9kIHRlbGxzIE1BVExBQiB0byBzcXVhcmUgZWFjaCBlbnRyeSBzZXBhcmF0ZWx5LiBgeF4yYCBhc2tzIGZvciBtYXRyaXggcG93ZXIsIHdoaWNoIGlzIG5vdCBlbGVtZW50LWJ5LWVsZW1lbnQgdmVjdG9yIHNxdWFyaW5nLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3Qgd3JpdGUgeSA9IHguXjIiLCJNdXN0IGlkZW50aWZ5IGAuXmAgYXMgZWxlbWVudC1ieS1lbGVtZW50IGV4cG9uZW50aWF0aW9uIiwiTXVzdCBkaXN0aW5ndWlzaCBlbGVtZW50LWJ5LWVsZW1lbnQgcG93ZXIgZnJvbSBtYXRyaXggcG93ZXIiXSwiZXhwbGFuYXRpb24iOiJUaGlzIGNoZWNrcyB3aGV0aGVyIHRoZSBzdHVkZW50IGNhbiB0cmFuc2ZlciB0aGUgcGVyaW9kLW9wZXJhdG9yIHJ1bGUgYmV5b25kIG11bHRpcGxpY2F0aW9uIHRvIGV4cG9uZW50aWF0aW9uLiBUaGUgc2FtZSBsb2dpYyBhcHBsaWVzOiBgLipgIGZvciBtdWx0aXBseSwgYC4vYCBmb3IgZGl2aWRlLCBgLl5gIGZvciBwb3dlci4iLCJoaW50IjoiTXVsdGlwbGljYXRpb24gdXNlcyBgLipgLCBkaXZpc2lvbiB1c2VzIGAuL2AsIGFuZCBwb3dlcnMgdXNlIGAuXmAuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfV19" style="display:none;"></div>%%KC_END%%
