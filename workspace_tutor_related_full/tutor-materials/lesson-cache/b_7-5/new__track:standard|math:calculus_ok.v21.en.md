%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJUaGlzIHNlY3Rpb24gaXMgYWJvdXQgYSB2aXN1YWwgcGF0dGVybiBhbmQgYW4gb3BlcmF0b3IgcnVsZSBhdCB0aGUgc2FtZSB0aW1lLiBUaGUgdGV4dGJvb2sgZmlndXJlIGlzIHZhbHVhYmxlIGZvciBzaG93aW5nIHRoZSBmaW5hbCBjb21wYXJpc29uIGJldHdlZW4gZih0KSBhbmQgaCh0KSwgd2hpbGUgYSBnZW5lcmF0ZWQgdGVhY2hpbmcgdmlzdWFsIGlzIGJldHRlciBmb3IgbWFraW5nIGlubmVyIHByb2R1Y3QsIG91dGVyIHByb2R1Y3QsIGFuZCBlbGVtZW50LWJ5LWVsZW1lbnQgbXVsdGlwbGljYXRpb24gaW1tZWRpYXRlbHkgZGlzdGluZ3Vpc2hhYmxlLiIsImNyYW0iOiJVc2UgdmlzdWFscyB0byBoZWxwIHRoZSBzdHVkZW50IHF1aWNrbHkgaWRlbnRpZnk6IHN0YXIgbWVhbnMgbWF0cml4IG11bHRpcGxpY2F0aW9uLCBkb3Qtc3RhciBtZWFucyBzYW1lLXBvc2l0aW9uIG11bHRpcGxpY2F0aW9uLCBhbmQgaCh0KSBzaG91bGQga2VlcCB0aGUgc2FtZSB2ZWN0b3Igc2l6ZSBhcyBmIGFuZCBnLiIsInN0YW5kYXJkIjoiVXNlIG9uZSBjbGVhbiBnZW5lcmF0ZWQgY29tcGFyaXNvbiBkaWFncmFtIGZvciB0aGUgb3BlcmF0b3IgbWVhbmluZ3MsIHRoZW4gdXNlIHRoZSB0ZXh0Ym9vayBmaWd1cmUgdG8gc3VwcG9ydCB0aGUgcmVwcmVzZW50YXRpdmUgZXhhbXBsZSBoID0gZi4qZyBhbmQgaXRzIHBsb3R0ZWQgcmVzdWx0LiIsInRvcF9zY29yZSI6IlVzZSB2aXN1YWxzIHRvIGV4cG9zZSB0aGUgcm93LXZlcnN1cy1jb2x1bW4gdHJhcCwgZGltZW5zaW9uIG1pc21hdGNoIGVycm9ycywgYW5kIHdoeSB0aGUgd3Jvbmcgb3BlcmF0b3IgY2FuIHByb2R1Y2UgZWl0aGVyIGFuIGVycm9yIG9yIGEgY29tcGxldGVseSBkaWZmZXJlbnQgbWF0aGVtYXRpY2FsIG9iamVjdC4ifQ==" style="display:none;"></div>%%KC_END%%
# B.7-5 Element-by-Element Operations

> **Section Objective:** Learn how MATLAB combines sampled function vectors entry by entry, and why using the wrong operator produces either a dimension error or a completely different mathematical object.

When you want a new function such as \(h(t) = f(t)g(t)\), MATLAB does not automatically multiply vectors sample by sample. The key exam risk is that MATLAB's `*` operator follows **matrix algebra**, not automatic entry-by-entry multiplication. Getting this wrong causes either a dimension error or a result with the wrong shape entirely.

In this section you will learn three ideas:
1. Matrix multiplication versus element-by-element multiplication
2. The period operators `.*`, `./`, and `.^`
3. A plotting example that compares \(f(t)\) with \(h(t)\)


## 1. Matrix Multiplication vs Element-by-Element Multiplication

MATLAB's `*` operator follows the rules of matrix algebra, which means the dimensions of the two operands must **conform** in a specific way. There are three distinct cases:

- **Inner product:** A \(1 \times N\) row vector times an \(N \times 1\) column vector produces a single **scalar**.
- **Outer product:** An \(N \times 1\) column vector times a \(1 \times M\) row vector produces an \(N \times M\) **matrix**.
- **Element-by-element multiplication:** Two vectors of the **same size** are multiplied position by position, producing another vector of the same size. This is a completely different operation.

Because \(f(t)\) and \(g(t)\) are both stored as vectors of sampled values, \(h(t)\) should also be a vector of the same length. That means MATLAB must use `h = f.*g`, not `h = f*g`.

### EXAM TIP

If the result should stay the **same size** as the inputs, think element-by-element first. Reach for the dot operator.

$$h(t) = f(t)\,g(t), \quad g(t) = e^{-10t}, \quad \texttt{h = f.*g}$$
*The math definition \(h(t) = f(t)g(t)\) becomes `h = f.*g` in MATLAB because the sampled values of \(f\) and \(g\) are multiplied position by position — each time sample of \(f\) is paired with the corresponding time sample of \(g\) to produce the matching sample of \(h\).*

## 2. MATLAB Dot Operators and the Dimension Trap

Most element-by-element operations in MATLAB are written by placing a **period before the operator**:

- `.*` — multiply entries in matching positions
- `./` — divide entries in matching positions
- `.^` — raise each entry to a power separately

Addition (`+`) and subtraction (`-`) do **not** need a period because they are already entry-by-entry by nature.

### THE DIMENSION TRAP

Element-by-element operations require that both operands have **exactly the same dimensions**. A \(1 \times N\) row vector combined with another \(1 \times N\) row vector works fine. A \(1 \times N\) row vector combined with an \(N \times 1\) column vector causes a **dimension mismatch** for element-by-element operations — you must transpose one of them first.

#### Quick Check

Predict: does `f.^2` keep the same vector size as `f`? Think through the dimension rule before reading on.

$$.* \quad ./ \quad .^$$
*`.*` multiplies entries one by one at matching positions; `./` divides entries one by one at matching positions; `.^` raises each individual entry to the specified power separately — none of these follow matrix algebra rules.*

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="example_support" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgZmlndXJlIHRvIHJlY29nbml6ZSB0aGF0IG11bHRpcGx5aW5nIGJ5IGFuIGV4cG9uZW50aWFsIGVudmVsb3BlIGNoYW5nZXMgdGhlIHNoYXBlIGJ1dCBrZWVwcyB0aGUgc2FtZSB0aW1lIGF4aXMuIiwic3RhbmRhcmQiOiJVc2UgdGhpcyBmaWd1cmUgdG8gc3VwcG9ydCB0aGUgcmVwcmVzZW50YXRpdmUgZXhhbXBsZSBjb21wYXJpbmcgdGhlIG9yaWdpbmFsIHNpbnVzb2lkIGYodCkgd2l0aCB0aGUgZGFtcGVkIHJlc3VsdCBoKHQpLiIsInRvcF9zY29yZSI6IlVzZSB0aGlzIGZpZ3VyZSB0byBub3RpY2UgaG93IHRoZSBlbnZlbG9wZSBzaHJpbmtzIGFtcGxpdHVkZSBvdmVyIHRpbWUgYW5kIGNvbm5lY3QgdGhhdCB2aXN1YWwgZWZmZWN0IHRvIGggPSBmLipnLiJ9" style="display:none;"></div>%%KC_END%%
![Fig. B.14](/figures/page-049-fig__b_14-1.png)
*The plot compares the original function \(f(t)\) with the element-by-element product \(h(t) = f(t)g(t)\), showing how the exponential factor \(e^{-10t}\) progressively reduces the sinusoid's amplitude over time.*

## 3. Representative Example: Plotting f(t) and h(t)

Here is the practical sequence for building and plotting the comparison:

**Step 1 — Create the exponential vector:**
```
g = exp(-10*t);
```
This evaluates \(e^{-10t}\) at every sample in the time vector `t`.

**Step 2 — Compute h element by element:**
```
h = f.*g;
```
Each sample of `f` is multiplied by the corresponding sample of `g`.

**Step 3 — Plot both curves:**
```
plot(t, f, '-k', t, h, ':k');
```
`'-k'` draws `f(t)` as a **solid black line**; `':k'` draws `h(t)` as a **dotted black line**.

**Step 4 — Add labels:**
```
xlabel('t'); ylabel('Amplitude'); legend('f(t)', 'h(t)');
```

In the resulting figure, `h(t)` still oscillates like `f(t)`, but its peaks shrink as \(t\) increases because the exponential envelope decays.

### EXAM TIP

Whenever MATLAB code is meant to modify **every sample** of a signal, look for dot operators. If you see `.*`, `./`, or `.^`, the operation is being applied entry by entry.

---
**📌 Key Takeaways**
- In MATLAB, `*` means matrix multiplication — it does NOT multiply vectors sample by sample automatically.
- Dot operators `.*`, `./`, and `.^` perform entry-by-entry work; both operands must have the same dimensions.
- `h = f.*g` keeps the same vector size as `f` and `g` while computing each sample of \(h(t) = f(t)g(t)\).

*In the next section we will move from vector operations to creating and working with matrices.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6Im9wZXJhdG9yX21lYW5pbmciLCJsYWJlbCI6Ik1lYW5pbmcgb2YgKiB2ZXJzdXMgLioiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkluIE1BVExBQiwgd2hhdCBpcyB0aGUgbWFpbiByZWFzb24gYGggPSBmKmdgIGlzIG5vdCB0aGUgY29ycmVjdCBkZWZhdWx0IGNob2ljZSB3aGVuIGBmYCBhbmQgYGdgIGFyZSBzYW1wbGVkIGZ1bmN0aW9uIHZlY3RvcnMgYW5kIHlvdSB3YW50IFxcKGgodCkgPSBmKHQpZyh0KVxcKT8iLCJvcHRpb25zIjpbIkEuIEJlY2F1c2UgYCpgIGFsd2F5cyBwcm9kdWNlcyBhIHBsb3QgaW5zdGVhZCBvZiBhIHZlY3RvciIsIkIuIEJlY2F1c2UgYCpgIG1lYW5zIG1hdHJpeCBtdWx0aXBsaWNhdGlvbiwgbm90IGVudHJ5LWJ5LWVudHJ5IG11bHRpcGxpY2F0aW9uIiwiQy4gQmVjYXVzZSBgKmAgY2FuIG9ubHkgYmUgdXNlZCB3aXRoIHNjYWxhcnMiLCJELiBCZWNhdXNlIE1BVExBQiBkb2VzIG5vdCBhbGxvdyBtdWx0aXBsaWNhdGlvbiBvZiB2ZWN0b3JzIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIHN5bWJvbCBgKmAgZm9sbG93cyBtYXRyaXggYWxnZWJyYSBydWxlcyBpbiBNQVRMQUIuIElmIHlvdSB3YW50IGVhY2ggc2FtcGxlIG9mIGBmYCB0byBtdWx0aXBseSB0aGUgY29ycmVzcG9uZGluZyBzYW1wbGUgb2YgYGdgLCB5b3UgbmVlZCBlbGVtZW50LWJ5LWVsZW1lbnQgbXVsdGlwbGljYXRpb24gdXNpbmcgYC4qYC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJNdWx0aXBsaWNhdGlvbiBkb2VzIG5vdCBjcmVhdGUgcGxvdHM7IHBsb3R0aW5nIGlzIGRvbmUgYnkgY29tbWFuZHMgc3VjaCBhcyBgcGxvdGAuIiwiQyI6ImAqYCBpcyBub3QgbGltaXRlZCB0byBzY2FsYXJzOyBpdCBpcyB1c2VkIGZvciBtYXRyaXgtYWxnZWJyYSBtdWx0aXBsaWNhdGlvbi4iLCJEIjoiTUFUTEFCIGRvZXMgYWxsb3cgdmVjdG9yIG11bHRpcGxpY2F0aW9uLCBidXQgdGhlIHJlc3VsdCBkZXBlbmRzIG9uIG9yaWVudGF0aW9uIGFuZCBtYXRyaXggcnVsZXMuIn0sImhpbnQiOiJBc2sgd2hldGhlciBNQVRMQUIgaXMgdHJlYXRpbmcgdGhlIHZlY3RvcnMgYXMgYXJyYXlzIG9mIHNhbXBsZXMgb3IgYXMgbWF0cml4IG9iamVjdHMuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJZiBgZmAgYW5kIGBnYCBhcmUgc2FtZS1zaXplIHJvdyB2ZWN0b3JzIG9mIHNhbXBsZWQgdmFsdWVzLCB3aGljaCBNQVRMQUIgc3RhdGVtZW50IGNvcnJlY3RseSBmb3JtcyB0aGUgc2FtcGxlLWJ5LXNhbXBsZSBwcm9kdWN0PyIsIm9wdGlvbnMiOlsiQS4gYGggPSBmKmc7YCIsIkIuIGBoID0gZi4qZztgIiwiQy4gYGggPSBmXmc7YCIsIkQuIGBoID0gZi4vZztgIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIG9wZXJhdG9yIGAuKmAgbXVsdGlwbGllcyBlbnRyaWVzIGluIG1hdGNoaW5nIHBvc2l0aW9ucywgd2hpY2ggaXMgZXhhY3RseSB3aGF0IHNhbXBsZS1ieS1zYW1wbGUgbXVsdGlwbGljYXRpb24gbWVhbnMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBhc2tzIE1BVExBQiB0byBkbyBtYXRyaXggbXVsdGlwbGljYXRpb24sIG5vdCBlbnRyeS1ieS1lbnRyeSBtdWx0aXBsaWNhdGlvbi4iLCJDIjoiVGhpcyBpcyBub3QgdGhlIGNvcnJlY3Qgd2F5IHRvIGZvcm0gYSBwcm9kdWN0IG9mIHR3byB2ZWN0b3JzIG9mIHNhbXBsZXMuIiwiRCI6IlRoaXMgcGVyZm9ybXMgc2FtcGxlLWJ5LXNhbXBsZSBkaXZpc2lvbiwgbm90IG11bHRpcGxpY2F0aW9uLiJ9LCJoaW50IjoiTG9vayBmb3IgdGhlIGRvdCB3aGVuIHRoZSBwaHJhc2UgJ3NhbXBsZSBieSBzYW1wbGUnIGFwcGVhcnMuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJkaW1lbnNpb25fcnVsZSIsImxhYmVsIjoiU2FtZS1kaW1lbnNpb24gcmVxdWlyZW1lbnQgZm9yIGVsZW1lbnQtYnktZWxlbWVudCBvcGVyYXRpb25zIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBwYWlyIGNhbiBiZSBjb21iaW5lZCBkaXJlY3RseSB3aXRoIGVsZW1lbnQtYnktZWxlbWVudCBtdWx0aXBsaWNhdGlvbiBpbiBNQVRMQUI/Iiwib3B0aW9ucyI6WyJBLiBBIFxcKDEgXFx0aW1lcyBOXFwpIHJvdyB2ZWN0b3IgYW5kIGFuIFxcKE4gXFx0aW1lcyAxXFwpIGNvbHVtbiB2ZWN0b3IiLCJCLiBBIFxcKDEgXFx0aW1lcyBOXFwpIHJvdyB2ZWN0b3IgYW5kIGFub3RoZXIgXFwoMSBcXHRpbWVzIE5cXCkgcm93IHZlY3RvciIsIkMuIEFuIFxcKE4gXFx0aW1lcyAxXFwpIGNvbHVtbiB2ZWN0b3IgYW5kIGEgXFwoMSBcXHRpbWVzIE5cXCkgcm93IHZlY3RvciBvbmx5IGlmIGAqYCBpcyB1c2VkIiwiRC4gQW55IHR3byB2ZWN0b3JzLCByZWdhcmRsZXNzIG9mIG9yaWVudGF0aW9uIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiRWxlbWVudC1ieS1lbGVtZW50IG9wZXJhdGlvbnMgcmVxdWlyZSBtYXRjaGluZyBkaW1lbnNpb25zLiBUd28gXFwoMSBcXHRpbWVzIE5cXCkgcm93IHZlY3RvcnMgbWF0Y2ggZXhhY3RseSwgc28gYC4qYCBjYW4gYmUgYXBwbGllZCBkaXJlY3RseS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGVzZSBoYXZlIGRpZmZlcmVudCBzaGFwZXMgKFxcKDEgXFx0aW1lcyBOXFwpIHZzIFxcKE4gXFx0aW1lcyAxXFwpKSwgc28gZW50cnktYnktZW50cnkgbXVsdGlwbGljYXRpb24gaXMgbm90IGRpcmVjdGx5IGRlZmluZWQgd2l0aG91dCBhIHRyYW5zcG9zZS4iLCJDIjoiVXNpbmcgYCpgIGNoYW5nZXMgdGhlIG9wZXJhdGlvbiB0byBtYXRyaXggbXVsdGlwbGljYXRpb24sIG5vdCBlbGVtZW50LWJ5LWVsZW1lbnQgbXVsdGlwbGljYXRpb24uIiwiRCI6Ik9yaWVudGF0aW9uIG1hdHRlcnM7IGRpbWVuc2lvbnMgbXVzdCBtYXRjaCBleGFjdGx5IGZvciBlbGVtZW50LWJ5LWVsZW1lbnQgb3BlcmF0aW9ucy4ifSwiaGludCI6IkZvciBlbnRyeS1ieS1lbnRyeSB3b3JrLCB0aGUgdHdvIHNoYXBlcyBtdXN0IGxpbmUgdXAgZXhhY3RseS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoib3BlbmFpL2dwdC01LjQtaW1hZ2UtMiIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQSBzdHVkZW50IHRyaWVzIHRvIGFwcGx5IGAuKmAgdG8gYSByb3cgdmVjdG9yIGFuZCBhIGNvbHVtbiB2ZWN0b3IgYW5kIGdldHMgYW4gZXJyb3IuIFdoYXQgaXMgdGhlIG1vc3QgbGlrZWx5IGZpeD8iLCJpZGVhbF9hbnN3ZXIiOiJNYWtlIHRoZSBkaW1lbnNpb25zIG1hdGNoIGZpcnN0LCB1c3VhbGx5IGJ5IHRyYW5zcG9zaW5nIG9uZSB2ZWN0b3Igc28gYm90aCBvcGVyYW5kcyBoYXZlIHRoZSBzYW1lIG9yaWVudGF0aW9uIGFuZCBzaXplLCB0aGVuIHVzZSBgLipgLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3QgbWVudGlvbiBtYXRjaGluZyBkaW1lbnNpb25zIG9yIHNhbWUgc2l6ZSIsIk11c3QgbWVudGlvbiB0cmFuc3Bvc2luZyBvbmUgdmVjdG9yIGFzIHRoZSBsaWtlbHkgZml4IiwiTXVzdCBrZWVwIGAuKmAgYXMgdGhlIGludGVuZGVkIG9wZXJhdG9yIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCB1bmRlcnN0YW5kcyB0aGF0IHRoZSBpc3N1ZSBpcyBzaGFwZSBtaXNtYXRjaCwgbm90IHRoZSBkb3Qgb3BlcmF0b3IgaXRzZWxmLiBUaGUgZG90IG9wZXJhdG9yIGlzIGNvcnJlY3Q7IHRoZSB2ZWN0b3Igc2hhcGVzIG5lZWQgdG8gYmUgYWxpZ25lZCBmaXJzdC4iLCJoaW50IjoiVGhlIG9wZXJhdG9yIGlzIGZpbmU7IHRoZSB2ZWN0b3Igc2hhcGVzIGFyZSB0aGUgcHJvYmxlbS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImRvdF9vcGVyYXRvcl9mYW1pbHkiLCJsYWJlbCI6Ik1lYW5pbmcgb2YgLiosIC4vLCBhbmQgLl4iLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBNQVRMQUIgb3BlcmF0b3IgcmFpc2VzIGVhY2ggZWxlbWVudCBvZiBhIHZlY3RvciB0byBhIHBvd2VyIHNlcGFyYXRlbHk/Iiwib3B0aW9ucyI6WyJBLiBgXmAiLCJCLiBgKmAiLCJDLiBgLl5gIiwiRC4gYC4vYCJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6ImAuXmAgYXBwbGllcyBleHBvbmVudGlhdGlvbiBlbnRyeSBieSBlbnRyeSB0byBldmVyeSBlbGVtZW50IG9mIGEgdmVjdG9yIG9yIG1hdHJpeCBpbmRlcGVuZGVudGx5LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6ImBeYCB3aXRob3V0IHRoZSBkb3QgZm9sbG93cyBtYXRyaXggZXhwb25lbnRpYXRpb24gcnVsZXMsIG5vdCBlbnRyeS1ieS1lbnRyeSBiZWhhdmlvci4iLCJCIjoiYCpgIGlzIG11bHRpcGxpY2F0aW9uLCBub3QgZXhwb25lbnRpYXRpb24uIiwiRCI6ImAuL2AgaXMgZW50cnktYnktZW50cnkgZGl2aXNpb24sIG5vdCBleHBvbmVudGlhdGlvbi4ifSwiaGludCI6IlRoZSBkb3QgdmVyc2lvbiB1c3VhbGx5IHNpZ25hbHMgZWxlbWVudC1ieS1lbGVtZW50IGJlaGF2aW9yIGluIE1BVExBQi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJwbG90X2ludGVycHJldGF0aW9uIiwibGFiZWwiOiJJbnRlcnByZXQgdGhlIHBsb3R0ZWQgY29tcGFyaXNvbiBvZiBmKHQpIGFuZCBoKHQpIiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNF9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSW4gdGhlIHNlY3Rpb24gZXhhbXBsZSwgd2hhdCB2aXN1YWwgY2hhbmdlIHNob3VsZCB5b3UgZXhwZWN0IHdoZW4gXFwoaCh0KSA9IGYodCllXnstMTB0fVxcKSBpcyBwbG90dGVkIHRvZ2V0aGVyIHdpdGggXFwoZih0KVxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKGgodClcXCkga2VlcHMgdGhlIG9zY2lsbGF0aW9uIHBhdHRlcm4gYnV0IGl0cyBhbXBsaXR1ZGUgZGVjcmVhc2VzIG92ZXIgdGltZSIsIkIuIFxcKGgodClcXCkgYmVjb21lcyBhIGNvbnN0YW50IGhvcml6b250YWwgbGluZSIsIkMuIFxcKGgodClcXCkgaGFzIGxhcmdlciBhbXBsaXR1ZGUgdGhhbiBcXChmKHQpXFwpIGFzIHRpbWUgaW5jcmVhc2VzIiwiRC4gXFwoaCh0KVxcKSBtdXN0IGhhdmUgYSBkaWZmZXJlbnQgdGltZSBheGlzIGxlbmd0aCB0aGFuIFxcKGYodClcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJNdWx0aXBseWluZyBieSBcXChlXnstMTB0fVxcKSBjcmVhdGVzIGEgZGVjYXlpbmcgZW52ZWxvcGUsIHNvIHRoZSBvc2NpbGxhdGlvbiByZW1haW5zIGJ1dCBpdHMgYW1wbGl0dWRlIHNocmlua3MgYXMgXFwodFxcKSBpbmNyZWFzZXMuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiQW4gZXhwb25lbnRpYWwgZW52ZWxvcGUgZG9lcyBub3QgcmVtb3ZlIHRoZSBvc2NpbGxhdGlvbiBlbnRpcmVseTsgaXQgb25seSBzY2FsZXMgdGhlIGFtcGxpdHVkZSBhdCBlYWNoIG1vbWVudC4iLCJDIjoiQmVjYXVzZSBcXChlXnstMTB0fVxcKSBkZWNheXMgdG93YXJkIHplcm8sIGl0IHJlZHVjZXMgYW1wbGl0dWRlIHJhdGhlciB0aGFuIGluY3JlYXNpbmcgaXQuIiwiRCI6IkVsZW1lbnQtYnktZWxlbWVudCBtdWx0aXBsaWNhdGlvbiBrZWVwcyB0aGUgc2FtcGxlIGNvdW50IGFuZCB0aW1lIGxvY2F0aW9ucyBwZXJmZWN0bHkgYWxpZ25lZCBiZXR3ZWVuIFxcKGZcXCkgYW5kIFxcKGhcXCkuIn0sImhpbnQiOiJUaGluayBhYm91dCB3aGF0IGEgcG9zaXRpdmUgZGVjYXlpbmcgZXhwb25lbnRpYWwgZG9lcyB0byByZXBlYXRlZCBwZWFrcyBvdmVyIHRpbWUuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6Im9wZW5haS9ncHQtNS40LWltYWdlLTIiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
