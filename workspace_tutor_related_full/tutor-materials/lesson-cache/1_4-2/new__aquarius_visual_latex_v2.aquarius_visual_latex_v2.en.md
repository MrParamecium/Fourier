%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJUaGUgc2VjdGlvbiBhbHJlYWR5IGluY2x1ZGVzIGEgY2Fub25pY2FsIHRleHRib29rIGltcHVsc2UgZGlhZ3JhbSBzaG93aW5nIHRoZSBhcnJvdyBzeW1ib2wgYW5kIHJlY3Rhbmd1bGFyLXB1bHNlIGxpbWl0LCBzbyB0aGF0IHNob3VsZCBiZSB1c2VkIGZpcnN0LiBUaGUgbGltaXRpbmcgcHJvY2VzcyBpcyBwYXJhbWV0ZXItZGVwZW5kZW50LCBzbyBhIFJlYWN0IENhbnZhcyBkZW1vIGlzIGFsc28gbmVlZGVkIHRvIGxldCBzdHVkZW50cyBzZWUgd2lkdGggc2hyaW5rLCBoZWlnaHQgZ3JvdywgYW5kIGFyZWEgcmVtYWluIGNvbnN0YW50LiIsImNyYW0iOiJVc2UgdGhlIHZpc3VhbHMgdG8gcmVjb2duaXplIHRoYXQgYW4gaW1wdWxzZSBpcyBqdWRnZWQgYnkgYXJlYSBhbmQgbG9jYXRpb24sIG5vdCBieSBvcmRpbmFyeSBoZWlnaHQuIiwic3RhbmRhcmQiOiJVc2UgdGhlIHRleHRib29rIGZpZ3VyZSBmb3IgdGhlIGNvcmUgcGljdHVyZSwgdGhlbiB0aGUgZGVtbyB0byBjb25uZWN0IHNocmlua2luZyBwdWxzZSB3aWR0aCB3aXRoIGZpeGVkIHVuaXQgYXJlYS4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhlIGRlbW8gdG8gY29tcGFyZSByZWN0YW5ndWxhciwgZXhwb25lbnRpYWwsIHRyaWFuZ3VsYXIsIGFuZCBHYXVzc2lhbiBhcHByb3hpbWF0aW9ucyBhbmQgbm90aWNlIHRoYXQgc2hhcGUgaXMgbm90IHRoZSBkZWZpbmluZyBmZWF0dXJlLiJ9" style="display:none;"></div>%%KC_END%%
# 1.4-2 The Unit Impulse Function δ(t)

> **Section Objective:** Learn how the unit impulse \(\delta(t)\) represents a zero-duration signal with finite area, and how it samples functions inside products and integrals.

---

## Concepts In This Section

- Unit impulse definition
- Pulse approximations
- Impulse strength
- Multiplication property
- Sampling property
- Generalized function view
- Unit step connection

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiRm9jdXMgb24gdGhlIGFycm93IGF0IFxcKHQ9MFxcKSBhbmQgdGhlIHBocmFzZSAndW5pdCBhcmVhJy4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgcmVjdGFuZ3VsYXIgcHVsc2UgbGltaXQgdG8gY29ubmVjdCB3aWR0aCwgaGVpZ2h0LCBhbmQgYXJlYS4iLCJ0b3Bfc2NvcmUiOiJFbXBoYXNpemUgdGhhdCB0aGUgaW1wdWxzZSBpcyBub3QgYSBub3JtYWwgZmluaXRlLWhlaWdodCBmdW5jdGlvbiBhdCBcXCh0PTBcXCkuIn0=" style="display:none;"></div>%%KC_END%%
![unknown](/figures/page-086-unknown-2.png)
*The unit impulse \(\delta(t)\) shown as an arrow at \(t=0\) in (a), and as the limit of a rectangular pulse with width \(\varepsilon\) and height \(1/\varepsilon\) as \(\varepsilon \to 0\) in (b).*
<div class="lesson-figure-description">The left plot (a) shows a spear-like upward arrow at \(t=0\) labeled \(\delta(t)\), representing the impulse symbol. The right plot (b) shows a rectangle centered at \(t=0\) extending from \(-\varepsilon/2\) to \(\varepsilon/2\) with height \(1/\varepsilon\); an annotation indicates \(\varepsilon \to 0\). Students should notice that as the pulse width shrinks and height grows, the area (width times height) remains exactly 1 — the area, not the height, is the meaningful quantity.</div>

## 1. Unit Impulse Definition

The unit impulse \(\delta(t)\) is zero at every point except \(t=0\). At \(t=0\) itself, the value is **not** treated as an ordinary finite number — instead, the impulse is defined entirely by its total area of 1.

**Symbols:** \(t\) is time, \(\delta(t)\) is located at the origin, and the integral gives the area under the impulse.

**When to use it:** Whenever a problem contains an idealized instantaneous signal, or whenever an impulse appears inside an integral.

### EXAM TRIGGER

Look for \(\delta(t)\), \(\delta(t-T)\), or a very narrow unit-area pulse in the problem statement.

### COMMON MISTAKE

Do **not** say the impulse has height 1. Its **area** is 1, not its height.

#### Minimal Example

\(5\delta(t)\) has area 5, so its impulse strength is 5.

$$\delta(t)=0\ \text{for }t\ne 0,\quad \int_{-\infty}^{\infty}\delta(t)\,dt=1\tag{1.9}$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="interactive_demo" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoZSBzbGlkZXIgdG8gcmVtZW1iZXI6IG5hcnJvd2VyIHB1bHNlIG1lYW5zIHRhbGxlciBwdWxzZSwgYnV0IGFyZWEgc3RheXMgZml4ZWQuIiwic3RhbmRhcmQiOiJDb21wYXJlIG9uZSByZWN0YW5ndWxhciBwdWxzZSBhbmQgb25lIGV4cG9uZW50aWFsIHB1bHNlIHdoaWxlIHdhdGNoaW5nIHRoZSBhcmVhIGxhYmVsIHJlbWFpbiAxLiIsInRvcF9zY29yZSI6IlN3aXRjaCBhbW9uZyByZWN0YW5ndWxhciwgdHJpYW5ndWxhciwgZXhwb25lbnRpYWwsIGFuZCBHYXVzc2lhbiBhcHByb3hpbWF0aW9ucyB0byBzZWUgdGhhdCBzaGFwZSBpcyBub3QgdGhlIGRlZmluaW5nIHByb3BlcnR5LiJ9" style="display:none;"></div><div class="kc-interactive-demo" data-demo-b64="eyJ0eXBlIjoiaW50ZXJhY3RpdmVfZGVtbyIsInRvb2wiOiJyZWFjdF9jYW52YXNfZGVtbyIsInRlYWNoaW5nX3JvbGUiOiJjb25jZXB0X2FuY2hvciIsIm1vZGVfc3BlY2lmaWNfdmlzdWFsX3VzZSI6eyJjcmFtIjoiVXNlIHRoZSBzbGlkZXIgdG8gcmVtZW1iZXI6IG5hcnJvd2VyIHB1bHNlIG1lYW5zIHRhbGxlciBwdWxzZSwgYnV0IGFyZWEgc3RheXMgZml4ZWQuIiwic3RhbmRhcmQiOiJDb21wYXJlIG9uZSByZWN0YW5ndWxhciBwdWxzZSBhbmQgb25lIGV4cG9uZW50aWFsIHB1bHNlIHdoaWxlIHdhdGNoaW5nIHRoZSBhcmVhIGxhYmVsIHJlbWFpbiAxLiIsInRvcF9zY29yZSI6IlN3aXRjaCBhbW9uZyByZWN0YW5ndWxhciwgdHJpYW5ndWxhciwgZXhwb25lbnRpYWwsIGFuZCBHYXVzc2lhbiBhcHByb3hpbWF0aW9ucyB0byBzZWUgdGhhdCBzaGFwZSBpcyBub3QgdGhlIGRlZmluaW5nIHByb3BlcnR5LiJ9LCJ0aXRsZSI6IkltcHVsc2UgYXMgYSBMaW1pdCBvZiBVbml0LUFyZWEgUHVsc2VzIiwic3BlYyI6eyJkZXNjcmlwdGlvbiI6IkEgUmVhY3QgKyBDYW52YXMgaW50ZXJhY3RpdmUgZGVtbyBzaG93aW5nIGhvdyBkaWZmZXJlbnQgcHVsc2Ugc2hhcGVzIGFwcHJvYWNoIHRoZSB1bml0IGltcHVsc2UgYXMgYSBzaGFycG5lc3MgcGFyYW1ldGVyIGluY3JlYXNlcy4iLCJ1aV9lbGVtZW50cyI6W3siZWxlbWVudCI6InNsaWRlciIsImxhYmVsIjoiU2hhcnBuZXNzIHBhcmFtZXRlciDOsSAob3IgMS/OtSkiLCJyYW5nZSI6WzEsNTBdLCJkZWZhdWx0IjozLCJlZmZlY3QiOiJJbmNyZWFzaW5nIM6xIG1ha2VzIHRoZSBwdWxzZSBuYXJyb3dlciBhbmQgdGFsbGVyIHdoaWxlIGtlZXBpbmcgYXJlYSA9IDEuIn0seyJlbGVtZW50IjoicmFkaW9fYnV0dG9ucyIsImxhYmVsIjoiUHVsc2Ugc2hhcGUiLCJvcHRpb25zIjpbIlJlY3Rhbmd1bGFyIiwiVHJpYW5ndWxhciIsIkV4cG9uZW50aWFsIChvbmUtc2lkZWQpIiwiR2F1c3NpYW4iXX0seyJlbGVtZW50IjoiYXJlYV9yZWFkb3V0IiwibGFiZWwiOiJBcmVhIOKJiCAxIiwiZGVzY3JpcHRpb24iOiJEaXNwbGF5ZWQgcHJvbWluZW50bHkgbmVhciB0aGUgcGxvdDsgcmVtYWlucyBhcHByb3hpbWF0ZWx5IDEgYXMgdGhlIHBhcmFtZXRlciBjaGFuZ2VzLiJ9XSwiY2FudmFzIjp7ImF4ZXMiOiJIb3Jpem9udGFsIGF4aXM6IHRpbWUgdCBjZW50ZXJlZCBhdCAwLCByYW5nZSBbLTMsIDNdLiBWZXJ0aWNhbCBheGlzOiBhbXBsaXR1ZGUsIGF1dG8tc2NhbGVkLiIsInB1bHNlX2Zvcm11bGFzIjp7InJlY3Rhbmd1bGFyIjoiSGVpZ2h0ID0gzrEsIHdpZHRoID0gMS/OsSwgY2VudGVyZWQgYXQgdD0wLiIsInRyaWFuZ3VsYXIiOiJQZWFrID0gzrEgYXQgdD0wLCBiYXNlIGZyb20gLTEvzrEgdG8gMS/OsS4iLCJleHBvbmVudGlhbCI6Is6xwrdleHAoLc6xwrd0KcK3dSh0KSwgb25lLXNpZGVkLCBzdGFydGluZyBhdCBoZWlnaHQgzrEgYXQgdD0wLiIsImdhdXNzaWFuIjoiKM6xL+KImigyz4ApKcK3ZXhwKC3OscKydMKyLzIpLCBzeW1tZXRyaWMgYWJvdXQgdD0wLiJ9LCJkaXNwbGF5X2Zvcm11bGEiOiIkJFxcaW50XzBeXFxpbmZ0eSBcXGFscGhhIGVeey1cXGFscGhhIHR9XFwsZHQgPSAxJCQiLCJkaXNwbGF5X2Zvcm11bGFfbm90ZSI6IlNob3duIG5lYXIgdGhlIGRlbW8gd2hlbiBFeHBvbmVudGlhbCBpcyBzZWxlY3RlZC4ifSwibm90ZV9iZWxvd19kZW1vIjoiRGlmZmVyZW50IHNoYXBlcyBjYW4gYXBwcm9hY2ggdGhlIHNhbWUgaW1wdWxzZSBpZiB0aGVpciBkdXJhdGlvbiBnb2VzIHRvIDAgd2hpbGUgdGhlaXIgYXJlYSBzdGF5cyAxLiJ9fQ=="></div>%%KC_END%%

## 2. Multiplication Property

When any continuous function \(\phi(t)\) multiplies an impulse \(\delta(t-T)\), only the value of \(\phi\) at the impulse location \(t=T\) survives. The result is a scaled impulse at the same location.

**Symbols:** \(\phi(t)\) is any function continuous at \(T\); \(T\) is the impulse location; \(\phi(T)\) becomes the new impulse strength.

**When to use it:** Simplifying products such as \((t^3+3)\delta(t)\) or \(e^{-2t}\delta(t-1)\).

### EXAM TRIGGER

Any function multiplying \(\delta(t-T)\) — evaluate the function at \(t=T\).

### COMMON MISTAKE

Do **not** automatically substitute \(t=0\) when the impulse is \(\delta(t-T)\) with \(T\ne 0\). Always use the shift \(T\).

#### Example

$$(t^3+3)\,\delta(t) = 3\,\delta(t)$$

Because the impulse is at \(t=0\), evaluate \(t^3+3\) at \(t=0\): \(0+3=3\).

$$\phi(t)\,\delta(t-T)=\phi(T)\,\delta(t-T)\tag{1.10}$$

## 3. Sampling Property

When an impulse \(\delta(t-T)\) appears inside an integral, it **samples** the value of the surrounding function at the impulse location \(t=T\). The entire integral collapses to a single number.

**Symbols:** \(\phi(t)\) is the function being sampled; \(\delta(t-T)\) is the impulse at \(t=T\); the result \(\phi(T)\) is a scalar.

**When to use it:** Any integral over a range that includes the point \(T\).

### EXAM TRIGGER

Any expression of the form \(\int \phi(t)\,\delta(t-T)\,dt\) — the answer is \(\phi(T)\).

### COMMON MISTAKE

Evaluating at the wrong point, or ignoring whether the integration interval actually contains \(T\). If \(T\) is outside the integration limits, the result is 0.

#### Worked Example

$$\int_{-\infty}^{\infty}\delta(t-2)\cos\!\left(\frac{\pi t}{4}\right)dt = \cos\!\left(\frac{\pi\cdot 2}{4}\right) = \cos\!\left(\frac{\pi}{2}\right) = 0$$

The impulse is at \(t=2\), so substitute \(t=2\) into \(\cos(\pi t/4)\).

$$\int_{-\infty}^{\infty}\phi(t)\,\delta(t-T)\,dt=\phi(T)\tag{1.11}$$

### Exam Note: shifted and scaled delta arguments

First locate impulse support by setting the argument to zero.

Example:
$$\delta(2-t)=\delta(t-2)$$
because \(2-t=0\) at \(t=2\), and \(\left|d(2-t)/dt\right|=1\).

More generally:

$$\delta(a t-b)=\frac{1}{|a|}\delta\left(t-\frac{b}{a}\right)$$

So in an integral, \(\delta(3-t)\) samples at \(t=3\), not \(t=-3\), and no minus sign appears.

#### Exam Trap

Forgetting the \(1/|a|\) factor when the delta argument has slope other than \(\pm1\).

### Interactive Check: locate first, then sample

For delta integrals, do the algebra in this order: set the argument to zero, include the \(1/|\text{slope}|\) factor if needed, then substitute the support point into the surrounding function.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="interactive_demo" data-teaching-role="example_support" style="display:none;"></div><div class="kc-interactive-demo" data-demo-b64="eyJ0eXBlIjoiaW50ZXJhY3RpdmVfZGVtbyIsImRlbW9fdHlwZSI6ImltcHVsc2Vfc2lmdGluZyIsInRpdGxlIjoiSW50ZXJhY3RpdmUgQ2hlY2s6IGxvY2F0ZSBmaXJzdCwgdGhlbiBzYW1wbGUiLCJleHBsYW5hdGlvbiI6IkNob29zZSBhIGRlbHRhIGFyZ3VtZW50IGFuZCB3YXRjaCB0aGUgc3VwcG9ydCBwb2ludCBhbmQgc2NhbGluZyBmYWN0b3IgdXBkYXRlIGJlZm9yZSBldmFsdWF0aW5nIHRoZSBpbnRlZ3JhbC4ifQ=="></div>%%KC_END%%

## 4. Generalized-Function View

The impulse \(\delta(t)\) is **not** an ordinary function. At \(t=0\), its value is undefined in the usual pointwise sense — you cannot assign it a finite height. Instead, \(\delta(t)\) is defined by what it **does** inside integrals: it samples test functions. This is the generalized-function (or distribution) interpretation.

**Connection to the unit step:** The unit step \(u(t)\) has a jump of height 1 at \(t=0\). In the generalized-function sense, differentiating that jump produces an impulse. Conversely, integrating \(\delta(t)\) recovers \(u(t)\).

#### Example

A jump of height 1 creates \(\delta(t)\); a jump of height 5 creates \(5\delta(t)\).

### EXAM NOTE

Do **not** treat \(\delta(0)\) as a normal finite number. The impulse is only meaningful inside an integral or a product with a continuous function.

$$\frac{d}{dt}u(t)=\delta(t)$$

---
**📌 Key Takeaways**
- \(\delta(t)=0\) for \(t\ne 0\) and \(\int_{-\infty}^{\infty}\delta(t)\,dt=1\): the impulse is defined by unit area, not by height.
- Strength: \(k\delta(t)\) has area \(k\); the coefficient in front is the impulse strength.
- Multiplication property: \(\phi(t)\,\delta(t-T)=\phi(T)\,\delta(t-T)\) — evaluate \(\phi\) at the impulse location \(T\).
- Sampling property: \(\int_{-\infty}^{\infty}\phi(t)\,\delta(t-T)\,dt=\phi(T)\) — the integral collapses to one function value.
- Unit step connection: \(\dfrac{d}{dt}u(t)=\delta(t)\); a jump of height \(k\) differentiates to \(k\delta(t)\).

*Next, we will use the impulse and related singularity functions to model signals more compactly.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InVuaXRfaW1wdWxzZV9kZWZpbml0aW9uIiwibGFiZWwiOiJVbml0IGltcHVsc2UgZGVmaW5pdGlvbiBhbmQgc3RyZW5ndGgiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHN0YXRlbWVudCBiZXN0IGRlc2NyaWJlcyB0aGUgdW5pdCBpbXB1bHNlIFxcKFxcZGVsdGEodClcXCk/Iiwib3B0aW9ucyI6WyJBLiBJdCBoYXMgaGVpZ2h0IDEgYXQgXFwodD0wXFwpIGFuZCBpcyB6ZXJvIGVsc2V3aGVyZS4iLCJCLiBJdCBpcyB6ZXJvIGZvciBcXCh0XFxuZTBcXCkgYW5kIGhhcyB0b3RhbCBhcmVhIDEuIiwiQy4gSXQgaXMgYSByZWN0YW5ndWxhciBwdWxzZSBvZiBmaXhlZCB3aWR0aCAxLiIsIkQuIEl0IGlzIGVxdWFsIHRvIHRoZSB1bml0IHN0ZXAgZnVuY3Rpb24uIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIHVuaXQgaW1wdWxzZSBpcyBkZWZpbmVkIGJ5IGJlaW5nIHplcm8gYXdheSBmcm9tIGl0cyBsb2NhdGlvbiBhbmQgaGF2aW5nIHVuaXQgYXJlYS4gSXRzIHZhbHVlIGF0IHRoZSBpbXB1bHNlIGxvY2F0aW9uIGlzIG5vdCB0cmVhdGVkIGFzIGFuIG9yZGluYXJ5IGZpbml0ZSBoZWlnaHQuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlIGFyZWEgaXMgMSwgbm90IHRoZSBoZWlnaHQuIiwiQyI6IlJlY3Rhbmd1bGFyIHB1bHNlcyBhcmUgb25seSBhcHByb3hpbWF0aW9ucyB3aGVuIHRoZWlyIHdpZHRoIHNocmlua3MgYW5kIGhlaWdodCBncm93cy4iLCJEIjoiVGhlIHVuaXQgc3RlcCBpcyByZWxhdGVkIGJ5IGludGVncmF0aW9uL2RpZmZlcmVudGlhdGlvbiwgYnV0IGl0IGlzIG5vdCB0aGUgaW1wdWxzZS4ifSwiaGludCI6IkFzayB3aGV0aGVyIHRoZSBudW1iZXIgMSBkZXNjcmliZXMgaGVpZ2h0IG9yIGFyZWEuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGF0IGlzIHRoZSBzdHJlbmd0aCwgb3IgYXJlYSwgb2YgXFwoN1xcZGVsdGEodClcXCk/Iiwib3B0aW9ucyI6WyJBLiAwIiwiQi4gMSIsIkMuIDciLCJELiBVbmRlZmluZWQsIHNvIGl0IGNhbm5vdCBoYXZlIGFyZWEiXSwiY29ycmVjdF9vcHRpb24iOiJDIiwiZXhwbGFuYXRpb24iOiJNdWx0aXBseWluZyBhIHVuaXQgaW1wdWxzZSBieSA3IHNjYWxlcyBpdHMgYXJlYSBmcm9tIDEgdG8gNy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGUgaW1wdWxzZSBpcyB6ZXJvIGF3YXkgZnJvbSBpdHMgbG9jYXRpb24sIGJ1dCBpdHMgdG90YWwgYXJlYSBpcyBub3QgemVyby4iLCJCIjoiT25seSBcXChcXGRlbHRhKHQpXFwpIGhhcyB1bml0IGFyZWE7IFxcKDdcXGRlbHRhKHQpXFwpIGhhcyBhcmVhIDcuIiwiRCI6IlRoZSB2YWx1ZSBhdCB0aGUgaW1wdWxzZSBsb2NhdGlvbiBpcyB1bmRlZmluZWQsIGJ1dCB0aGUgaW1wdWxzZSBzdHJlbmd0aCBpcyBzdGlsbCBkZWZpbmVkLiJ9LCJoaW50IjoiVGhlIGNvZWZmaWNpZW50IGluIGZyb250IG9mIHRoZSBpbXB1bHNlIGlzIGl0cyBzdHJlbmd0aC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImltcHVsc2VfYXBwcm94aW1hdGlvbiIsImxhYmVsIjoiUHVsc2UgYXBwcm94aW1hdGlvbnMgdG8gdGhlIGltcHVsc2UiLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJbiB0aGUgaW50ZXJhY3RpdmUgZGVtbywgYXMgYSByZWN0YW5ndWxhciB1bml0LWFyZWEgcHVsc2UgYmVjb21lcyBuYXJyb3dlciwgd2hhdCBtdXN0IGhhcHBlbiB0byBpdHMgaGVpZ2h0PyIsIm9wdGlvbnMiOlsiQS4gSXQgbXVzdCBkZWNyZWFzZSBzbyB0aGUgYXJlYSBzdGF5cyAxLiIsIkIuIEl0IG11c3QgaW5jcmVhc2Ugc28gdGhlIGFyZWEgc3RheXMgMS4iLCJDLiBJdCBtdXN0IHN0YXkgZXhhY3RseSAxLiIsIkQuIEl0IG11c3QgYmVjb21lIG5lZ2F0aXZlLiJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkZvciBhIHVuaXQtYXJlYSBwdWxzZSwgYXJlYSBlcXVhbHMgd2lkdGggdGltZXMgaGVpZ2h0LiBJZiB3aWR0aCBzaHJpbmtzLCBoZWlnaHQgbXVzdCBncm93IHRvIGtlZXAgYXJlYSBmaXhlZC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJJZiBib3RoIHdpZHRoIGFuZCBoZWlnaHQgZGVjcmVhc2UsIHRoZSBhcmVhIHdvdWxkIGdvIHRvIDAuIiwiQyI6IkhlaWdodCAxIHdpdGggc2hyaW5raW5nIHdpZHRoIHdvdWxkIG1ha2UgdGhlIGFyZWEgc2hyaW5rLiIsIkQiOiJBIHN0YW5kYXJkIHBvc2l0aXZlIGltcHVsc2UgYXBwcm94aW1hdGlvbiBkb2VzIG5vdCByZXF1aXJlIG5lZ2F0aXZlIGhlaWdodC4ifSwiaGludCI6IkZvciBhIHJlY3RhbmdsZSwgYXJlYSA9IHdpZHRoIMOXIGhlaWdodC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoiZGVtb19vYnNlcnZhdGlvbl9jaGVjayIsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6Im11bHRpcGxpY2F0aW9uX3Byb3BlcnR5IiwibGFiZWwiOiJNdWx0aXBsaWNhdGlvbiBieSBhbiBpbXB1bHNlIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJTaW1wbGlmeSBcXCgodF4yKzQpXFxkZWx0YSh0LTMpXFwpLiIsIm9wdGlvbnMiOlsiQS4gXFwoNFxcZGVsdGEodC0zKVxcKSIsIkIuIFxcKDEzXFxkZWx0YSh0LTMpXFwpIiwiQy4gXFwoKHReMis0KVxcZGVsdGEodClcXCkiLCJELiBcXCgxM1xcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBpbXB1bHNlIFxcKFxcZGVsdGEodC0zKVxcKSBpcyBsb2NhdGVkIGF0IFxcKHQ9M1xcKSwgc28gZXZhbHVhdGUgXFwodF4yKzRcXCkgYXQgMzogXFwoOSs0PTEzXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgaW5jb3JyZWN0bHkgZXZhbHVhdGVzIGF0IFxcKHQ9MFxcKS4iLCJDIjoiVGhlIGltcHVsc2UgbG9jYXRpb24gZG9lcyBub3QgY2hhbmdlIGZyb20gXFwodD0zXFwpIHRvIFxcKHQ9MFxcKS4iLCJEIjoiVGhlIHJlc3VsdCBpcyBzdGlsbCBhbiBpbXB1bHNlOyBvbmx5IGl0cyBzdHJlbmd0aCBiZWNvbWVzIDEzLiJ9LCJoaW50IjoiVXNlIHRoZSBsb2NhdGlvbiBpbnNpZGUgXFwoXFxkZWx0YSh0LVQpXFwpLCBub3QgYXV0b21hdGljYWxseSB6ZXJvLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQSBzdHVkZW50IHNpbXBsaWZpZXMgXFwoXFxzaW4odClcXCxcXGRlbHRhKHQtXFxwaSlcXCkgYXMgXFwoMFxcLFxcZGVsdGEodC1cXHBpKVxcKSBiZWNhdXNlIFxcKFxcc2luKDApPTBcXCkuIEV4cGxhaW4gdGhlIG1pc3Rha2UuIiwiaWRlYWxfYW5zd2VyIjoiVGhlIGltcHVsc2UgXFwoXFxkZWx0YSh0LVxccGkpXFwpIGlzIGxvY2F0ZWQgYXQgXFwodD1cXHBpXFwpLCBzbyB0aGUgZnVuY3Rpb24gbXVzdCBiZSBldmFsdWF0ZWQgYXQgXFwodD1cXHBpXFwpLCBub3QgYXQgMC4gU2luY2UgXFwoXFxzaW4oXFxwaSk9MFxcKSwgdGhlIGZpbmFsIHJlc3VsdCBpcyBzdGlsbCAwLCBidXQgdGhlIHJlYXNvbmluZyB3YXMgd3Jvbmcg4oCUIHRoZSBzdHVkZW50IHVzZWQgdGhlIHdyb25nIHN1YnN0aXR1dGlvbiBwb2ludC4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IGlkZW50aWZ5IHRoZSBpbXB1bHNlIGxvY2F0aW9uIGFzIFxcKHQ9XFxwaVxcKSIsIk11c3Qgc3RhdGUgdGhhdCB0aGUgZnVuY3Rpb24gc2hvdWxkIGJlIGV2YWx1YXRlZCBhdCB0aGUgaW1wdWxzZSBsb2NhdGlvbiIsIk11c3QgZGlzdGluZ3Vpc2ggY29ycmVjdCBhbnN3ZXIgZnJvbSBjb3JyZWN0IHJlYXNvbmluZyJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQgaXMgYXBwbHlpbmcgdGhlIHByb3BlcnR5IGRlbGliZXJhdGVseSByYXRoZXIgdGhhbiBhbHdheXMgcGx1Z2dpbmcgaW4gemVyby4iLCJoaW50IjoiTG9vayBhdCB0aGUgc2hpZnQgaW4gXFwoXFxkZWx0YSh0LVQpXFwpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoic2FtcGxpbmdfcHJvcGVydHkiLCJsYWJlbCI6IlNhbXBsaW5nIHByb3BlcnR5IGluIGludGVncmFscyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNF9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRXZhbHVhdGUgXFwoXFxpbnRfey1cXGluZnR5fV57XFxpbmZ0eX0gZV57LTJ0fVxcZGVsdGEodC0xKVxcLGR0XFwpLiIsIm9wdGlvbnMiOlsiQS4gXFwoMVxcKSIsIkIuIFxcKGVeey0yfVxcKSIsIkMuIFxcKGVeezJ9XFwpIiwiRC4gXFwoMFxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBpbXB1bHNlIHNhbXBsZXMgdGhlIGZ1bmN0aW9uIGF0IFxcKHQ9MVxcKSwgc28gdGhlIGludGVncmFsIGVxdWFscyBcXChlXnstMigxKX09ZV57LTJ9XFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBpbnRlZ3JhbCBvZiB0aGUgaW1wdWxzZSBhbG9uZSBpcyAxLCBidXQgaGVyZSBpdCBzYW1wbGVzIFxcKGVeey0ydH1cXCkuIiwiQyI6IlRoZSBleHBvbmVudCBzaWduIHdhcyByZXZlcnNlZC4iLCJEIjoiVGhlIGltcHVsc2UgbGllcyBpbnNpZGUgdGhlIGludGVncmF0aW9uIGludGVydmFsLCBzbyB0aGUgcmVzdWx0IGlzIG5vdCB6ZXJvLiJ9LCJoaW50IjoiUmVwbGFjZSBcXCh0XFwpIGluIHRoZSBub24taW1wdWxzZSBmdW5jdGlvbiBieSB0aGUgaW1wdWxzZSBsb2NhdGlvbi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDRfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkV2YWx1YXRlIFxcKFxcaW50X3stXFxpbmZ0eX1ee1xcaW5mdHl9XFxkZWx0YSh0LTIpXFxjb3MoXFxwaSB0LzQpXFwsZHRcXCkuIiwib3B0aW9ucyI6WyJBLiBcXCgwXFwpIiwiQi4gXFwoMVxcKSIsIkMuIFxcKFxcY29zKFxccGkvNClcXCkiLCJELiBcXCgyXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiVGhlIGltcHVsc2UgaXMgYXQgXFwodD0yXFwpLCBzbyB0aGUgaW50ZWdyYWwgZXF1YWxzIFxcKFxcY29zKFxccGlcXGNkb3QyLzQpPVxcY29zKFxccGkvMik9MFxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGF0IHdvdWxkIGJlIHRoZSBhcmVhIG9mIHRoZSBpbXB1bHNlIGFsb25lLCBub3QgdGhlIHNhbXBsZWQgZnVuY3Rpb24gdmFsdWUuIiwiQyI6IlRoaXMgZXZhbHVhdGVzIGF0IFxcKHQ9MVxcKSwgbm90IFxcKHQ9MlxcKS4iLCJEIjoiVGhlIGltcHVsc2UgbG9jYXRpb24gaXMgbm90IHRoZSB2YWx1ZSBvZiB0aGUgaW50ZWdyYWwuIn0sImhpbnQiOiJUaGUgYW5zd2VyIGlzIHRoZSBmdW5jdGlvbiB2YWx1ZSBhdCBcXCh0PTJcXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJnZW5lcmFsaXplZF9mdW5jdGlvbl9jb25uZWN0aW9uIiwibGFiZWwiOiJHZW5lcmFsaXplZCBmdW5jdGlvbiBhbmQgdW5pdCBzdGVwIGNvbm5lY3Rpb24iLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3A1X3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaHkgaXMgXFwoXFxkZWx0YSh0KVxcKSB0cmVhdGVkIGFzIGEgZ2VuZXJhbGl6ZWQgZnVuY3Rpb24gcmF0aGVyIHRoYW4gYW4gb3JkaW5hcnkgZnVuY3Rpb24/Iiwib3B0aW9ucyI6WyJBLiBCZWNhdXNlIGl0IGlzIHBlcmlvZGljLiIsIkIuIEJlY2F1c2UgaXRzIG9yZGluYXJ5IHZhbHVlIGF0IFxcKHQ9MFxcKSBpcyBub3QgZmluaXRlLCBidXQgaXRzIGVmZmVjdCBpbnNpZGUgaW50ZWdyYWxzIGlzIHdlbGwtZGVmaW5lZC4iLCJDLiBCZWNhdXNlIGl0IGlzIGFsd2F5cyBlcXVhbCB0byB6ZXJvLiIsIkQuIEJlY2F1c2UgaXQgY2FuIG9ubHkgYmUgdXNlZCBpbiBkaXNjcmV0ZSB0aW1lLiJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBpbXB1bHNlIGlzIGRlZmluZWQgYnkgaXRzIHNhbXBsaW5nIGFjdGlvbiBpbiBpbnRlZ3JhbHMsIG5vdCBieSBhbiBvcmRpbmFyeSBwb2ludHdpc2UgdmFsdWUgYXQgZXZlcnkgdGltZS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJQZXJpb2RpY2l0eSBpcyBub3QgdGhlIGlzc3VlLiIsIkMiOiJJdCBpcyB6ZXJvIGF3YXkgZnJvbSBpdHMgbG9jYXRpb24sIGJ1dCBpdHMgYXJlYS9lZmZlY3QgaXMgbm90IHplcm8uIiwiRCI6IlRoaXMgc2VjdGlvbiBpcyBhYm91dCBjb250aW51b3VzLXRpbWUgaW1wdWxzZXMuIn0sImhpbnQiOiJUaGluayBhYm91dCB3aGF0IGlzIHVuZGVmaW5lZCBhbmQgd2hhdCByZW1haW5zIHVzZWZ1bC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3A1X3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCByZWxhdGlvbnNoaXAgY29ubmVjdHMgdGhlIHVuaXQgc3RlcCBhbmQgdGhlIHVuaXQgaW1wdWxzZT8iLCJvcHRpb25zIjpbIkEuIFxcKHUodCk9XFxkZWx0YSh0KVxcKSIsIkIuIFxcKFxcZGZyYWN7ZH17ZHR9dSh0KT1cXGRlbHRhKHQpXFwpIiwiQy4gXFwoXFxkZnJhY3tkfXtkdH1cXGRlbHRhKHQpPXUodClcXCkiLCJELiBcXCh1KHQpXFwsXFxkZWx0YSh0KT0wXFwpIGFsd2F5cyJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkluIHRoZSBnZW5lcmFsaXplZC1mdW5jdGlvbiBzZW5zZSwgdGhlIGRlcml2YXRpdmUgb2YgdGhlIHVuaXQgc3RlcCBpcyB0aGUgdW5pdCBpbXB1bHNlLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSB1bml0IHN0ZXAgYW5kIGltcHVsc2UgYXJlIHJlbGF0ZWQgYnV0IG5vdCBlcXVhbC4iLCJDIjoiVGhpcyByZXZlcnNlcyB0aGUgcmVsYXRpb25zaGlwIGluY29ycmVjdGx5LiIsIkQiOiJQcm9kdWN0cyBpbnZvbHZpbmcgZGlzY29udGludWl0aWVzIGF0IHRoZSBpbXB1bHNlIGxvY2F0aW9uIHJlcXVpcmUgY2FyZSBhbmQgYXJlIG5vdCB0aGUgbWFpbiByZWxhdGlvbnNoaXAgaGVyZS4ifSwiaGludCI6IkEganVtcCBjcmVhdGVzIGFuIGltcHVsc2Ugd2hlbiBkaWZmZXJlbnRpYXRlZC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoic3RydWN0dXJlX2NvbXBhcmlzb25fY2hlY2siLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
