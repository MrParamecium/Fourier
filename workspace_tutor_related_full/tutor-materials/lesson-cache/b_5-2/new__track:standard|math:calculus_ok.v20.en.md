%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImdlbmVyYXRlZF9pbWFnZSIsInJhdGlvbmFsZSI6Ik5vIHByZWNpc2lvbi1jcm9wcGVkIHRleHRib29rIGZpZ3VyZXMgYXJlIGF2YWlsYWJsZSwgYnV0IHRoaXMgc2VjdGlvbiBpcyBoaWdobHkgdmlzdWFsIGluIHByb2NlZHVyZTogaGlkZSBvbmUgZmFjdG9yLCBzdWJzdGl0dXRlIHRoZSBtYXRjaGluZyByb290LCBhbmQgcmVhZCBvZmYgdGhlIGNvZWZmaWNpZW50LiBBIGNsZWFuIGdlbmVyYXRlZCBsZWN0dXJlLW5vdGVzIGRpYWdyYW0gd2lsbCBtYWtlIHRoZSBzaG9ydGN1dCBmZWVsIGZhc3RlciBhbmQgbW9yZSBtZW1vcmFibGUgdGhhbiBkZW5zZSBhbGdlYnJhIGFsb25lLiIsImNyYW0iOiJVc2UgdmlzdWFscyB0byBzaG93IHRoZSBleGFjdCBleGFtIG1vdmU6IGNvdmVyIG9uZSBmYWN0b3IsIHBsdWcgaW4gaXRzIHplcm8sIHdyaXRlIHRoZSBjb2VmZmljaWVudCBpbW1lZGlhdGVseS4iLCJzdGFuZGFyZCI6IlVzZSB2aXN1YWxzIHRvIGNvbm5lY3QgdGhlIGZvcm11bGEgdG8gb25lIHJlcHJlc2VudGF0aXZlIHdvcmtlZCBleGFtcGxlIGFuZCBtYWtlIHRoZSBzdGVwIG9yZGVyIGVhc3kgdG8gZm9sbG93LiIsInRvcF9zY29yZSI6IlVzZSB2aXN1YWxzIHRvIGNvbnRyYXN0IHRoZSBkaXJlY3QgZGlzdGluY3QtZmFjdG9yIGNhc2Ugd2l0aCB0aGUgbm9uLWRpcmVjdCBjYXNlcyBzdWNoIGFzIHF1YWRyYXRpYyBvciByZXBlYXRlZCBmYWN0b3JzLiJ9" style="display:none;"></div>%%KC_END%%
# B.5-2 Heaviside Cover-Up Method

> **Section Objective:** Learn a fast shortcut for finding partial-fraction coefficients without solving a full system of equations.

When you decompose a rational function into partial fractions, the standard approach — expanding both sides and matching coefficients — works, but it is slow under exam pressure. The **Heaviside cover-up method** gives you each coefficient in a single substitution step.

In this section you will learn to find constants such as \(k_1\), \(k_2\), and \(k_3\) one at a time, directly, with no simultaneous equations.

#### Key Condition

The shortcut works cleanly only when every denominator factor is **distinct** (non-repeated) and **linear**. If any factor is repeated or irreducible quadratic, extra steps are needed — we will flag those cases clearly.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgdmlzdWFsIHRvIG1lbW9yaXplIHRoZSAzLXN0ZXAgc2hvcnRjdXQgaW4gb25lIGdsYW5jZS4iLCJzdGFuZGFyZCI6IlVzZSB0aGlzIHZpc3VhbCB0byBjb25uZWN0IHRoZSBmb3JtdWxhIGFuZCB0aGUgcHJvY2VkdXJhbCBtZWFuaW5nIG9mIGNvdmVyLXVwLiIsInRvcF9zY29yZSI6IlVzZSB0aGlzIHZpc3VhbCB0byBub3RpY2UgZXhhY3RseSB3aHkgYWxsIG90aGVyIHRlcm1zIHZhbmlzaCBhZnRlciBzdWJzdGl0dXRpb24uIn0=" style="display:none;"></div>%%KC_END%%
*🎨 The cover-up workflow: hide one factor, substitute its root, and every other partial-fraction term vanishes — leaving the coefficient directly.*
![Illustration](/generated/gptimage2-1777212318807-1236.png)

$$k_r = (x-\lambda_r)F(x)\big|_{x=\lambda_r}, \quad r=1,2,\dots,n$$
*Multiplying \(F(x)\) by \((x - \lambda_r)\) cancels the \((x - \lambda_r)\) in the denominator of the \(r\)-th term, leaving \(k_r\) exposed. Substituting \(x = \lambda_r\) then forces every other term to zero — because each remaining term still carries a factor \((\lambda_r - \lambda_j)\) with \(j \neq r\) in its denominator, which is nonzero for distinct roots — so only \(k_r\) survives.*

## 1. How the Cover-Up Method Works

Suppose the denominator of \(F(x)\) factors into \(n\) **distinct linear factors** \((x - \lambda_1)(x - \lambda_2)\cdots(x - \lambda_n)\). The partial-fraction expansion takes the form:

$$
F(x) = \frac{k_1}{x - \lambda_1} + \frac{k_2}{x - \lambda_2} + \cdots + \frac{k_n}{x - \lambda_n}
$$

To find any single coefficient \(k_r\):

1. **Cover** the factor \((x - \lambda_r)\) in the denominator of \(F(x)\).
2. **Substitute** \(x = \lambda_r\) into what remains.
3. **Read off** the result — that is \(k_r\).

This is dramatically faster than building and solving a system of \(n\) equations. Each coefficient is independent and computed in one line.

> **Exam Note:** If any factor is **repeated** — for example \((x - \lambda_1)^2\) — this direct one-shot shortcut does not fully determine every coefficient. Extra steps are required.

## 2. Representative Example

Decompose \(F(x) = \dfrac{2x^2 + 9x - 11}{(x+1)(x-2)(x+3)}\) into partial fractions.

**Setup:**
$$
F(x) = \frac{k_1}{x+1} + \frac{k_2}{x-2} + \frac{k_3}{x+3}
$$

**Find \(k_1\):** Cover \((x+1)\), set \(x = -1\):
$$
k_1 = \frac{2(-1)^2 + 9(-1) - 11}{(-1-2)(-1+3)} = \frac{2 - 9 - 11}{(-3)(2)} = \frac{-18}{-6} = 3
$$

**Find \(k_2\):** Cover \((x-2)\), set \(x = 2\):
$$
k_2 = \frac{2(4) + 9(2) - 11}{(2+1)(2+3)} = \frac{8 + 18 - 11}{(3)(5)} = \frac{15}{15} = 1
$$

**Find \(k_3\):** Cover \((x+3)\), set \(x = -3\):
$$
k_3 = \frac{2(9) + 9(-3) - 11}{(-3+1)(-3-2)} = \frac{18 - 27 - 11}{(-2)(-5)} = \frac{-20}{10} = -2
$$

**Final answer:**
$$
F(x) = \frac{3}{x+1} + \frac{1}{x-2} - \frac{2}{x+3}
$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="exam_pattern_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgdmlzdWFsIGFzIGEgZmFzdCBwYXR0ZXJuIGNhcmQgZm9yIHdoZXJlIHRvIHBsdWcgaW4gZWFjaCByb290LiIsInN0YW5kYXJkIjoiVXNlIHRoaXMgdmlzdWFsIHRvIHJlaW5mb3JjZSB0aGUgcmVwcmVzZW50YXRpdmUgZXhhbXBsZSBzdGVwIGJ5IHN0ZXAuIiwidG9wX3Njb3JlIjoiVXNlIHRoaXMgdmlzdWFsIHRvIGNvbXBhcmUgY29ycmVjdCBzdWJzdGl0dXRpb24gd2l0aCBjb21tb24gc2lnbiBtaXN0YWtlcy4ifQ==" style="display:none;"></div>%%KC_END%%
*🎨 Three cover-up panels for the worked example: each panel covers one factor, substitutes its root, and reads off the coefficient directly.*
![Illustration](/generated/gptimage2-1777212488350-9679.png)

## 3. When This Shortcut Is Not Enough

The cover-up method is powerful, but it has clear boundaries. Use this as an **exam recognition guide**:

| Denominator type | Cover-up status | What to do |
|---|---|---|
| Distinct linear factors only | **Direct use** | One substitution per coefficient |
| Complex conjugate factor pair | **Use with extra algebra** | Coefficients are conjugate pairs; find one, write the other |
| Irreducible quadratic factor | **Use with extra algebra** | Numerator must be \(c_1 x + c_2\); cover-up finds linear-factor coefficients, then substitute or match to find \(c_1\) and \(c_2\) |
| Repeated linear factor | **Not the full story** | Extra steps — and later, derivatives — are required |

### KEY INSIGHT

For real-coefficient rational functions, complex-conjugate denominator factors always produce conjugate-pair coefficients, so you only need to compute one of them.

> **Exam Tip:** Identify the factor type first. If all factors are distinct and linear, go straight to cover-up. Otherwise, plan for extra algebra before you start.

---
**📌 Key Takeaways**
- Cover-up applies directly only when all denominator factors are distinct and linear.
- To find \(k_r\): cover \((x - \lambda_r)\) in \(F(x)\), then substitute \(x = \lambda_r\) — one step, one coefficient.
- Repeated or quadratic factors require extra algebra; cover-up alone is not sufficient.

*In the next section we will handle repeated factors more systematically.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImFwcGxpY2FiaWxpdHlfb2ZfY292ZXJfdXAiLCJsYWJlbCI6IlJlY29nbml6aW5nIHdoZW4gdGhlIEhlYXZpc2lkZSBjb3Zlci11cCBtZXRob2QgYXBwbGllcyBkaXJlY3RseSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHdoaWNoIGRlbm9taW5hdG9yIGNhbiB0aGUgSGVhdmlzaWRlIGNvdmVyLXVwIG1ldGhvZCBiZSBhcHBsaWVkIGRpcmVjdGx5IHRvIGFsbCBjb2VmZmljaWVudHMgd2l0aCBubyBleHRyYSBhbGdlYnJhPyIsIm9wdGlvbnMiOlsiQS4gXFwoKHgrMSkoeC0yKSh4KzMpXFwpIiwiQi4gXFwoKHgrMSleMih4LTIpXFwpIiwiQy4gXFwoKHgrMSkoeF4yKzR4KzEzKVxcKSIsIkQuIFxcKHgoeF4yKzJ4KzUpXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGhlIGRpcmVjdCBjb3Zlci11cCBzaG9ydGN1dCB3b3JrcyBjbGVhbmx5IHdoZW4gdGhlIGRlbm9taW5hdG9yIGhhcyBkaXN0aW5jdCBsaW5lYXIgZmFjdG9ycy4gVGhlbiBlYWNoIGNvZWZmaWNpZW50IGlzIGZvdW5kIGJ5IGNvdmVyaW5nIG9uZSBmYWN0b3IgYW5kIHN1YnN0aXR1dGluZyBpdHMgcm9vdC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJDb3JyZWN0LiIsIkIiOiJSZXBlYXRlZCBmYWN0b3JzIHJlcXVpcmUgZXh0cmEgc3RlcHM7IGRpcmVjdCBvbmUtc2hvdCBjb3Zlci11cCBkb2VzIG5vdCBkZXRlcm1pbmUgZXZlcnkgY29lZmZpY2llbnQuIiwiQyI6IlRoZSBsaW5lYXItZmFjdG9yIGNvZWZmaWNpZW50IGNhbiBiZSBmb3VuZCBkaXJlY3RseSwgYnV0IHRoZSBxdWFkcmF0aWMtZmFjdG9yIG51bWVyYXRvciBzdGlsbCBuZWVkcyBleHRyYSBhbGdlYnJhLiIsIkQiOiJUaGUgXFwoeFxcKS10ZXJtIGNvZWZmaWNpZW50IGNhbiBiZSBmb3VuZCBkaXJlY3RseSwgYnV0IHRoZSBxdWFkcmF0aWMtZmFjdG9yIG51bWVyYXRvciBzdGlsbCBuZWVkcyBleHRyYSBhbGdlYnJhLiJ9LCJoaW50IjoiTG9vayBmb3IgZGlzdGluY3Qgbm9uLXJlcGVhdGVkIGxpbmVhciBmYWN0b3JzIG9ubHkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBzdGF0ZW1lbnQgYmVzdCBkZXNjcmliZXMgdGhlIGNvdmVyLXVwIG1ldGhvZD8iLCJvcHRpb25zIjpbIkEuIERpZmZlcmVudGlhdGUgdGhlIGRlbm9taW5hdG9yIGFuZCBzdWJzdGl0dXRlIGVhY2ggcm9vdC4iLCJCLiBIaWRlIG9uZSBkZW5vbWluYXRvciBmYWN0b3IsIHRoZW4gc3Vic3RpdHV0ZSB0aGUgcm9vdCBvZiB0aGF0IGZhY3RvciBpbnRvIHRoZSByZW1haW5pbmcgZXhwcmVzc2lvbi4iLCJDLiBFeHBhbmQgYm90aCBzaWRlcyBhbmQgbWF0Y2ggcG93ZXJzIG9mIFxcKHhcXCkuIiwiRC4gTXVsdGlwbHkgYnkgdGhlIGVudGlyZSBkZW5vbWluYXRvciBhbmQgY29tcGFyZSBjb25zdGFudHMgb25seS4iXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgbWV0aG9kIHJlbW92ZXMgb25lIGZhY3RvciwgdGhlbiBwbHVncyBpbiB0aGUgdmFsdWUgdGhhdCBtYWtlcyB0aGF0IGZhY3RvciB6ZXJvLCBsZWF2aW5nIHRoZSBtYXRjaGluZyBjb2VmZmljaWVudC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJEaWZmZXJlbnRpYXRpb24gaXMgYXNzb2NpYXRlZCB3aXRoIHJlcGVhdGVkLWZhY3RvciBleHRlbnNpb25zLCBub3QgdGhlIGJhc2ljIGRpc3RpbmN0LWZhY3RvciBzaG9ydGN1dC4iLCJDIjoiVGhhdCBpcyB0aGUgY29lZmZpY2llbnQtY29tcGFyaXNvbiBtZXRob2QsIG5vdCB0aGUgY292ZXItdXAgbWV0aG9kLiIsIkQiOiJNdWx0aXBseWluZyBieSB0aGUgZnVsbCBkZW5vbWluYXRvciBkb2VzIG5vdCBpc29sYXRlIGEgc2luZ2xlIGNvZWZmaWNpZW50IGJ5IGl0c2VsZi4ifSwiaGludCI6IlRoaW5rOiBjb3ZlciBvbmUgZmFjdG9yLCB0aGVuIHBsdWcgaW4gaXRzIHplcm8uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJjb2VmZmljaWVudF9jb21wdXRhdGlvbiIsImxhYmVsIjoiQ29tcHV0aW5nIGNvZWZmaWNpZW50cyBieSBzdWJzdGl0dXRpb24gYWZ0ZXIgY292ZXItdXAiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkxldCBcXChGKHgpID0gXFxkZnJhY3syeF4yICsgOXggLSAxMX17KHgrMSkoeC0yKSh4KzMpfSA9IFxcZGZyYWN7a18xfXt4KzF9ICsgXFxkZnJhY3trXzJ9e3gtMn0gKyBcXGRmcmFje2tfM317eCszfVxcKS4gV2hhdCBpcyBcXChrXzFcXCk/Iiwib3B0aW9ucyI6WyJBLiBcXCgtM1xcKSIsIkIuIFxcKDFcXCkiLCJDLiBcXCgzXFwpIiwiRC4gXFwoLTJcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJDb3ZlciBcXCgoeCsxKVxcKSwgdGhlbiBzdWJzdGl0dXRlIFxcKHggPSAtMVxcKSBpbnRvIHRoZSByZW1haW5pbmcgZXhwcmVzc2lvbjogXFwoXFxkZnJhY3syKC0xKV4yICsgOSgtMSkgLSAxMX17KC0xLTIpKC0xKzMpfSA9IFxcZGZyYWN7MiAtIDkgLSAxMX17KC0zKSgyKX0gPSBcXGRmcmFjey0xOH17LTZ9ID0gM1xcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIGNvbWVzIGZyb20gYSBzaWduIGVycm9yIGluIHRoZSBkZW5vbWluYXRvciBvciBudW1lcmF0b3IuIiwiQiI6IlRoaXMgaXMgYWN0dWFsbHkgdGhlIHZhbHVlIG9mIFxcKGtfMlxcKSwgbm90IFxcKGtfMVxcKS4iLCJEIjoiVGhpcyBpcyB0aGUgdmFsdWUgb2YgXFwoa18zXFwpLCBub3QgXFwoa18xXFwpLiJ9LCJoaW50IjoiQWZ0ZXIgY292ZXJpbmcgXFwoKHgrMSlcXCksIHVzZSBcXCh4ID0gLTFcXCkgY2FyZWZ1bGx5IOKAlCB3YXRjaCBib3RoIG51bWVyYXRvciBhbmQgZGVub21pbmF0b3Igc2lnbnMuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImdlbmVyYXRlZF9pbWFnZSIsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IlVzaW5nIHRoZSBzYW1lIGZ1bmN0aW9uIFxcKEYoeCkgPSBcXGRmcmFjezJ4XjIgKyA5eCAtIDExfXsoeCsxKSh4LTIpKHgrMyl9XFwpLCB3aGF0IGlzIFxcKGtfM1xcKSwgdGhlIGNvZWZmaWNpZW50IG9mIFxcKFxcZGZyYWN7MX17eCszfVxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKC0yXFwpIiwiQi4gXFwoMlxcKSIsIkMuIFxcKC0zXFwpIiwiRC4gXFwoM1xcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IkNvdmVyIFxcKCh4KzMpXFwpLCB0aGVuIHN1YnN0aXR1dGUgXFwoeCA9IC0zXFwpOiBcXChcXGRmcmFjezIoOSkgKyA5KC0zKSAtIDExfXsoLTMrMSkoLTMtMil9ID0gXFxkZnJhY3sxOCAtIDI3IC0gMTF9eygtMikoLTUpfSA9IFxcZGZyYWN7LTIwfXsxMH0gPSAtMlxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJDb3JyZWN0LiIsIkIiOiJUaGlzIG1pc3NlcyB0aGUgbmVnYXRpdmUgc2lnbiBmcm9tIHRoZSBudW1lcmF0b3IuIiwiQyI6IlRoaXMgaXMgYSBwbGF1c2libGUgYXJpdGhtZXRpYyBzbGlwLCBidXQgbm90IHRoZSBhY3R1YWwgcmVzdWx0LiIsIkQiOiJUaGlzIGlzIHRoZSB2YWx1ZSBvZiBcXChrXzFcXCksIG5vdCBcXChrXzNcXCkuIn0sImhpbnQiOiJTdWJzdGl0dXRlIFxcKHggPSAtM1xcKSBvbmx5IGFmdGVyIHJlbW92aW5nIHRoZSBcXCgoeCszKVxcKSBmYWN0b3IuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AyX3EzIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJXcml0ZSB0aGUgZnVsbCBwYXJ0aWFsLWZyYWN0aW9uIGV4cGFuc2lvbiBvZiBcXChcXGRmcmFjezJ4XjIgKyA5eCAtIDExfXsoeCsxKSh4LTIpKHgrMyl9XFwpLiIsImlkZWFsX2Fuc3dlciI6IlxcKFxcZGZyYWN7M317eCsxfSArIFxcZGZyYWN7MX17eC0yfSAtIFxcZGZyYWN7Mn17eCszfVxcKSIsImdyYWRpbmdfcnVicmljIjpbIk11c3QgZ2l2ZSBhbGwgdGhyZWUgdGVybXMiLCJNdXN0IG1hdGNoIGNvZWZmaWNpZW50cyBcXChrXzEgPSAzXFwpLCBcXChrXzIgPSAxXFwpLCBhbmQgXFwoa18zID0gLTJcXCkgY29ycmVjdGx5IiwiTWlub3IgZm9ybWF0dGluZyBkaWZmZXJlbmNlcyBhcmUgYWNjZXB0YWJsZSBpZiBkZW5vbWluYXRvcnMgYXJlIGNsZWFyIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCBjYW4gY29tYmluZSB0aGUgc2VwYXJhdGVseSBjb21wdXRlZCBjb2VmZmljaWVudHMgaW50byB0aGUgZmluYWwgZXhhbS1zdHlsZSBhbnN3ZXIuIiwiaGludCI6IlVzZSBcXChrXzEgPSAzXFwpLCBcXChrXzIgPSAxXFwpLCBhbmQgXFwoa18zID0gLTJcXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoibGltaXRzX2FuZF9leHRlbnNpb25zIiwibGFiZWwiOiJSZWNvZ25pemluZyBsaW1pdHMgb2YgdGhlIHNob3J0Y3V0IiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IlN1cHBvc2UgXFwoRih4KVxcKSBoYXMgcmVhbCBjb2VmZmljaWVudHMgYW5kIGEgZGVub21pbmF0b3IgZmFjdG9yIHBhaXIgXFwoKHgrMi0zailcXCkgYW5kIFxcKCh4KzIrM2opXFwpLiBXaGljaCBzdGF0ZW1lbnQgaXMgdHJ1ZT8iLCJvcHRpb25zIjpbIkEuIFRoZSBjb3JyZXNwb25kaW5nIGNvZWZmaWNpZW50cyBtdXN0IGJlIGVxdWFsIHJlYWwgbnVtYmVycy4iLCJCLiBUaGUgY29ycmVzcG9uZGluZyBjb2VmZmljaWVudHMgYXJlIHVucmVsYXRlZC4iLCJDLiBUaGUgY29ycmVzcG9uZGluZyBjb2VmZmljaWVudHMgYXJlIGNvbXBsZXggY29uanVnYXRlcy4iLCJELiBUaGUgY292ZXItdXAgbWV0aG9kIGNhbm5vdCBiZSB1c2VkIGF0IGFsbC4iXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJGb3IgcmF0aW9uYWwgZnVuY3Rpb25zIHdpdGggcmVhbCBjb2VmZmljaWVudHMsIGNvZWZmaWNpZW50cyBhc3NvY2lhdGVkIHdpdGggY29tcGxleC1jb25qdWdhdGUgZmFjdG9ycyBhbHNvIGNvbWUgaW4gY29uanVnYXRlIHBhaXJzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZXkgbmVlZCBub3QgYmUgcmVhbCwgYW5kIHRoZXkgbmVlZCBub3QgYmUgZXhhY3RseSBlcXVhbC4iLCJCIjoiVGhleSBhcmUgbGlua2VkIGJ5IGNvbmp1Z2FjeSB3aGVuIHRoZSBvcmlnaW5hbCBjb2VmZmljaWVudHMgYXJlIHJlYWwuIiwiRCI6IlRoZSBtZXRob2QgY2FuIHN0aWxsIGJlIHVzZWQgd2l0aCBjb21wbGV4IGZhY3RvcnMuIn0sImhpbnQiOiJSZWFsIGNvZWZmaWNpZW50cyBmb3JjZSBjb25qdWdhdGUgc3ltbWV0cnkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2h5IGlzIGRpcmVjdCBjb3Zlci11cCBhbG9uZSBub3QgZW5vdWdoIGZvciBhIHRlcm0gb3ZlciBhbiBpcnJlZHVjaWJsZSBxdWFkcmF0aWMgZmFjdG9yIHN1Y2ggYXMgXFwoKHheMiArIDR4ICsgMTMpXFwpPyIsIm9wdGlvbnMiOlsiQS4gQmVjYXVzZSB0aGUgbnVtZXJhdG9yIG92ZXIgdGhhdCBmYWN0b3IgbXVzdCBiZSBhIGxpbmVhciBleHByZXNzaW9uIFxcKGNfMSB4ICsgY18yXFwpLiIsIkIuIEJlY2F1c2UgcXVhZHJhdGljIGZhY3RvcnMgYXJlIG5ldmVyIGFsbG93ZWQgaW4gcGFydGlhbCBmcmFjdGlvbnMuIiwiQy4gQmVjYXVzZSB0aGUgY29lZmZpY2llbnQgb3ZlciB0aGUgcXVhZHJhdGljIGZhY3RvciBpcyBhbHdheXMgemVyby4iLCJELiBCZWNhdXNlIFxcKHhcXCkgY2Fubm90IGJlIHN1YnN0aXR1dGVkIGludG8gcXVhZHJhdGljIGV4cHJlc3Npb25zLiJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IkEgcXVhZHJhdGljIGRlbm9taW5hdG9yIHJlcXVpcmVzIGEgbGluZWFyIG51bWVyYXRvciwgc28gYWZ0ZXIgZmluZGluZyBhbnkgc2ltcGxlIGxpbmVhci1mYWN0b3IgY29lZmZpY2llbnRzLCBleHRyYSBhbGdlYnJhIGlzIG5lZWRlZCB0byBkZXRlcm1pbmUgXFwoY18xXFwpIGFuZCBcXChjXzJcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiQ29ycmVjdC4iLCJCIjoiUXVhZHJhdGljIGZhY3RvcnMgYXJlIGFsbG93ZWQ7IHRoZXkganVzdCByZXF1aXJlIGEgZGlmZmVyZW50IG51bWVyYXRvciBmb3JtLiIsIkMiOiJUaGVyZSBpcyBubyByZWFzb24gZm9yIHRoYXQgY29lZmZpY2llbnQgdG8gYmUgemVybyBpbiBnZW5lcmFsLiIsIkQiOiJTdWJzdGl0dXRpb24gaXMgc3RpbGwgcG9zc2libGU7IGl0IGp1c3QgZG9lcyBub3QgaXNvbGF0ZSBib3RoIHVua25vd25zIGJ5IGl0c2VsZi4ifSwiaGludCI6IkFzayBob3cgbWFueSB1bmtub3duIG51bWJlcnMgc2l0IGFib3ZlIHRoZSBxdWFkcmF0aWMgZmFjdG9yLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
