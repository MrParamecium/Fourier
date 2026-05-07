%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJUaGlzIHNlY3Rpb24gaGFzIG9uZSBzdHJvbmcgdGV4dGJvb2sgZmlndXJlIGZvciB0aGUgY29tcGxleCBwbGFuZSBhbmQgYWxzbyBiZW5lZml0cyBmcm9tIGEgY2xlYW4gZ2VuZXJhdGVkIGRpYWdyYW0gdGhhdCBpc29sYXRlcyB0aGUgc2FtZSByZWxhdGlvbnNoaXBzIG1vcmUgY2xlYXJseSBmb3IgZmlyc3QtdGltZSBsZWFybmVycy4gVXNlIHRoZSBib29rIGZpZ3VyZSBmb3IgdGV4dGJvb2sgYWxpZ25tZW50IGFuZCBhIG1hdHBsb3RsaWIgcGxvdCBmb3IgdmlzdWFsIHNpbXBsaWZpY2F0aW9uIGFuZCBvbmUgd29ya2VkIGV4YW1wbGUuIiwiY3JhbSI6IlVzZSB2aXN1YWxzIHRvIGhlbHAgc3R1ZGVudHMgaW5zdGFudGx5IHJlY29nbml6ZSB0aGUgY29tcGxleC1wbGFuZSBkaWFncmFtLCBheGlzIG1lYW5pbmdzLCBtYWduaXR1ZGUtYW5nbGUgbGFiZWxpbmcsIGFuZCBjb25qdWdhdGUgcmVmbGVjdGlvbiBwYXR0ZXJuLiIsInN0YW5kYXJkIjoiVXNlIHRoZSB0ZXh0Ym9vayBmaWd1cmUgdG8gZXhwbGFpbiB0aGUgY29yZSBzdHJ1Y3R1cmUsIHRoZW4gdXNlIG9uZSBjbGVhbiBnZW5lcmF0ZWQgZXhhbXBsZSB0byBjb25uZWN0IHRoZSBpZGVhIHRvIGEgcmVwcmVzZW50YXRpdmUgY2FsY3VsYXRpb24uIiwidG9wX3Njb3JlIjoiVXNlIHZpc3VhbHMgdG8gY29tcGFyZSByZWN0YW5ndWxhciB2cyBwb2xhciByZWFkaW5nLCBkaXN0aW5ndWlzaCBpbWFnaW5hcnkgcGFydCBmcm9tIGltYWdpbmFyeSB0ZXJtLCBhbmQgZXhwb3NlIHRoZSBjb25qdWdhdGUtYXMtcmVmbGVjdGlvbiBwYXR0ZXJuIHByZWNpc2VseS4ifQ==" style="display:none;"></div>%%KC_END%%
# B.1-1 Complex Numbers

> **Section Objective:** Understand why complex numbers exist, how to read them on the complex plane, and how rectangular and polar forms connect.

Complex numbers are not a detour — they are a practical extension of the number system that makes later work in signals and systems significantly cleaner. The textbook's core message is direct: many engineering problems start and end with real numbers, but the path through complex numbers is far easier.

In this section you will learn four things: how to write a complex number in rectangular form \(z = a + jb\), how to read that form as a point on the complex plane, how to distinguish the real part from the imaginary part, and how rectangular form connects to polar form. For the exam, you must be able to read the standard complex-plane diagram and interpret basic notation quickly and without hesitation.

## 1. Why Complex Numbers Exist

Once negative numbers were accepted, a new problem appeared: equations like \(x^2 + 1 = 0\) still had no real solution. No real number, when squared, gives a negative result. To fix this, mathematicians defined a new symbol \(j\) by the single rule \(j^2 = -1\). Think of \(j\) as a symbol that opens up a new direction of number values — it is not a magic object, just a consistent extension of the rules you already know.

Engineers write \(j\) instead of \(i\) to avoid confusion with electrical current. With \(j\) available, negative square roots become straightforward: \(\sqrt{-4} = \pm 2j\).

### COMMON MISTAKE

Students often write \(j = -1\). That is wrong. The definition is \(j^2 = -1\), not \(j = -1\). If \(j\) were \(-1\), then \(j^2\) would equal \(1\), which contradicts the definition entirely.

$$j^2 = -1, \qquad \sqrt{-1} = \pm j, \qquad \sqrt{-4} = \pm 2j$$
*The symbol \(j\) is defined entirely by its square: \(j^2 = -1\). Once that rule is in place, square roots of any negative number become possible by factoring out \(\sqrt{-1} = j\).*

## 2. Rectangular Form and the Complex Plane

A complex number \(z = a + jb\) can be read directly as a point with coordinates \((a,\, b)\): move \(a\) units along the horizontal real axis and \(b\) units along the vertical imaginary axis. The two parts have precise names:

$$
\operatorname{Re}(z) = a, \qquad \operatorname{Im}(z) = b
$$

### COMMON MISTAKE

The imaginary **part** is \(b\) — a plain real number. The imaginary **term** in the expression is \(jb\). These are not the same thing. When an exam asks for \(\operatorname{Im}(z)\), the answer is the coefficient of \(j\), not the full term.

**Worked example:** For \(z = 3 - 2j\), the real part is \(3\), the imaginary part is \(-2\), and the plotted point is \((3,\, -2)\) — below the real axis because the imaginary part is negative.

#### Exam Note

When asked for \(\operatorname{Im}(z)\), read the coefficient of \(j\) only. For \(z = 5 - 2j\), the answer is \(-2\), not \(-2j\).

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoZSBmaWd1cmUgdG8gbWVtb3JpemUgdGhlIHN0YW5kYXJkIGxheW91dDogcmVhbCBheGlzIGhvcml6b250YWwsIGltYWdpbmFyeSBheGlzIHZlcnRpY2FsLCBhbmdsZSBhbmQgbWFnbml0dWRlIGF0dGFjaGVkIHRvIHRoZSBwb2ludC4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgZmlndXJlIHRvIGV4cGxhaW4gaG93IFxcKGEgKyBqYlxcKSwgY29vcmRpbmF0ZXMgXFwoKGEsIGIpXFwpLCBtYWduaXR1ZGUgXFwoclxcKSwgYW5nbGUgXFwoXFx0aGV0YVxcKSwgYW5kIGNvbmp1Z2F0ZSBcXCh6XipcXCkgZml0IHRvZ2V0aGVyIGluIG9uZSBkaWFncmFtLiIsInRvcF9zY29yZSI6IlVzZSB0aGUgZmlndXJlIHRvIGhpZ2hsaWdodCB0aGUgY29uanVnYXRlIHJlZmxlY3Rpb24gYWNyb3NzIHRoZSByZWFsIGF4aXMgYW5kIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gY29vcmRpbmF0ZSByZWFkaW5nIGFuZCBwb2xhciByZWFkaW5nLiJ9" style="display:none;"></div>%%KC_END%%
![Fig. B.2](/figures/page-005-fig__b_2-1.png)
*This textbook figure shows the main visual language of the section: a complex number as a point with rectangular coordinates \((a, b)\), its polar description via magnitude \(r\) and angle \(\theta\), and its complex conjugate \(z^* = a - jb\) reflected across the real axis.*

> ⚠️ Chart render error: Traceback (most recent call last):
  File "/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/generated/script-1777184963182-oz31.py", line 1, in <module>
    import matplotlib
ModuleNotFoundError: No module named 'matplotlib'


## 3. From Rectangular Form to Polar Form

The same complex number can be described in two equivalent ways. Rectangular form uses horizontal and vertical components \(a\) and \(b\). Polar form uses a magnitude \(r\) (the distance from the origin) and an angle \(\theta\) (measured from the positive real axis). The two descriptions are linked by:

$$
a = r\cos\theta, \qquad b = r\sin\theta
$$

Substituting these into \(z = a + jb\) gives the polar form directly:

$$
z = r(\cos\theta + j\sin\theta)
$$

Euler's formula is simply a compact shorthand for the same cosine-sine combination — it is not a separate, unrelated fact. If a point has magnitude \(r\) and angle \(\theta\), its rectangular components are recovered immediately by cosine and sine.

#### Exam Note

Rectangular form and polar form represent the **same** complex number — not two different numbers. They are two coordinate systems for the same point, just as Cartesian and polar coordinates describe the same location in the plane.

$$z = a + jb = r(\cos\theta + j\sin\theta), \qquad e^{j\theta} = \cos\theta + j\sin\theta$$
*The first formula converts the same complex point between rectangular coordinates \((a, b)\) and polar coordinates \((r, \theta)\); the second is Euler's compact shorthand, replacing the cosine-sine pair with a single exponential.*

---
**📌 Key Takeaways**
- \(j\) is introduced so that \(j^2 = -1\), extending the number system to include square roots of negative numbers.
- \(z = a + jb\) is a point \((a, b)\) on the complex plane; \(\operatorname{Re}(z) = a\) and \(\operatorname{Im}(z) = b\), not \(jb\).
- Rectangular form \(a + jb\) and polar form \(r(\cos\theta + j\sin\theta)\) describe the same complex number two ways.

*In the next section we will use these forms of complex numbers more actively in calculations.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImpfZGVmaW5pdGlvbiIsImxhYmVsIjoiRGVmaW5pdGlvbiBhbmQgbWVhbmluZyBvZiBqIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHN0YXRlbWVudCBpcyBjb3JyZWN0IGFib3V0IFxcKGpcXCkgaW4gZW5naW5lZXJpbmcgbm90YXRpb24/Iiwib3B0aW9ucyI6WyJBLiBcXChqID0gLTFcXCkiLCJCLiBcXChqXjIgPSAtMVxcKSIsIkMuIFxcKGpcXCkgaXMgdGhlIHNhbWUgYXMgdGhlIHJlYWwgbnVtYmVyIFxcKDFcXCkiLCJELiBcXChqXjIgPSAxXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIGRlZmluaW5nIHByb3BlcnR5IGlzIFxcKGpeMiA9IC0xXFwpLiBUaGF0IGlzIHdoYXQgZXh0ZW5kcyB0aGUgbnVtYmVyIHN5c3RlbSB0byBpbmNsdWRlIHNxdWFyZSByb290cyBvZiBuZWdhdGl2ZSBudW1iZXJzLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IklmIFxcKGpcXCkgd2VyZSBcXCgtMVxcKSwgdGhlbiBcXChqXjJcXCkgd291bGQgYmUgXFwoMVxcKSwgbm90IFxcKC0xXFwpLiIsIkMiOiJcXChqXFwpIGlzIG5vdCBhIHJlYWwgbnVtYmVyOyBpdCBpcyBkZWZpbmVkIHRvIHNhdGlzZnkgXFwoal4yID0gLTFcXCkuIiwiRCI6IlRoYXQgd291bGQgZGVzY3JpYmUgXFwoXFxwbSAxXFwpLCBub3QgXFwoalxcKS4ifSwiaGludCI6IkZvY3VzIG9uIHRoZSBkZWZpbmluZyBzcXVhcmUgcHJvcGVydHksIG5vdCBhIGRpcmVjdCB2YWx1ZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoYXQgaXMgXFwoXFxzcXJ0ey00fVxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKDJqXFwpIG9ubHkiLCJCLiBcXCgtMmpcXCkgb25seSIsIkMuIFxcKFxccG0gMmpcXCkiLCJELiBcXChcXHBtIDRqXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiU2luY2UgXFwoLTQgPSA0IFxcY2RvdCAoLTEpXFwpLCB3ZSBoYXZlIFxcKFxcc3FydHstNH0gPSBcXHNxcnR7NH1cXGNkb3RcXHNxcnR7LTF9ID0gXFxwbSAyalxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIG1pc3NlcyB0aGUgbmVnYXRpdmUgcm9vdC4iLCJCIjoiVGhpcyBhbHNvIG1pc3NlcyB0aGUgcG9zaXRpdmUgcm9vdC4iLCJEIjoiVGhlIG1hZ25pdHVkZSBpcyBcXCgyXFwpLCBub3QgXFwoNFxcKS4ifSwiaGludCI6IlRha2UgdGhlIHNxdWFyZSByb290IG9mIFxcKDRcXCkgc2VwYXJhdGVseSBmcm9tIHRoZSBzcXVhcmUgcm9vdCBvZiBcXCgtMVxcKS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InJlY3Rhbmd1bGFyX2Zvcm1fcmVhZGluZyIsImxhYmVsIjoiUmVhZGluZyByZWFsIGFuZCBpbWFnaW5hcnkgcGFydHMgZnJvbSB6ID0gYSArIGpiIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgXFwoeiA9IDUgLSAyalxcKSwgd2hpY2ggc3RhdGVtZW50IGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiBcXChcXG9wZXJhdG9ybmFtZXtSZX0oeikgPSAtMlxcKSBhbmQgXFwoXFxvcGVyYXRvcm5hbWV7SW19KHopID0gNVxcKSIsIkIuIFxcKFxcb3BlcmF0b3JuYW1le1JlfSh6KSA9IDVcXCkgYW5kIFxcKFxcb3BlcmF0b3JuYW1le0ltfSh6KSA9IC0yXFwpIiwiQy4gXFwoXFxvcGVyYXRvcm5hbWV7UmV9KHopID0gNVxcKSBhbmQgXFwoXFxvcGVyYXRvcm5hbWV7SW19KHopID0gLTJqXFwpIiwiRC4gXFwoXFxvcGVyYXRvcm5hbWV7UmV9KHopID0gNSAtIDJqXFwpIGFuZCBcXChcXG9wZXJhdG9ybmFtZXtJbX0oeikgPSAwXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiSW4gXFwoeiA9IGEgKyBqYlxcKSwgdGhlIHJlYWwgcGFydCBpcyB0aGUgcmVhbCBudW1iZXIgXFwoYVxcKSBhbmQgdGhlIGltYWdpbmFyeSBwYXJ0IGlzIHRoZSBjb2VmZmljaWVudCBcXChiXFwpIG9mIFxcKGpcXCkuIEhlcmUgXFwoYSA9IDVcXCkgYW5kIFxcKGIgPSAtMlxcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIHN3YXBzIHRoZSByZWFsIGFuZCBpbWFnaW5hcnkgY29tcG9uZW50cy4iLCJDIjoiVGhlIGltYWdpbmFyeSBwYXJ0IGlzIFxcKC0yXFwpLCBub3QgdGhlIGZ1bGwgdGVybSBcXCgtMmpcXCkuIiwiRCI6IkEgY29tcGxleCBudW1iZXIgZ2VuZXJhbGx5IGhhcyBib3RoIGEgcmVhbCBhbmQgYW4gaW1hZ2luYXJ5IGNvbXBvbmVudC4ifSwiaGludCI6IlJlYWQgdGhlIGNvZWZmaWNpZW50IG9mIFxcKGpcXCksIG5vdCB0aGUgZW50aXJlIHRlcm0uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AyX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBwb2ludCBpbiB0aGUgY29tcGxleCBwbGFuZSByZXByZXNlbnRzIFxcKHogPSAzIC0gMmpcXCk/Iiwib3B0aW9ucyI6WyJBLiBcXCgoLTIsXFwsIDMpXFwpIiwiQi4gXFwoKDMsXFwsIC0yKVxcKSIsIkMuIFxcKCgzLFxcLCAyKVxcKSIsIkQuIFxcKCgtMyxcXCwgMilcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgcmVhbCBwYXJ0IGdpdmVzIHRoZSBob3Jpem9udGFsIGNvb3JkaW5hdGUgYW5kIHRoZSBpbWFnaW5hcnkgcGFydCBnaXZlcyB0aGUgdmVydGljYWwgY29vcmRpbmF0ZSwgc28gXFwoeiA9IDMgLSAyalxcKSBpcyB0aGUgcG9pbnQgXFwoKDMsXFwsLTIpXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgc3dhcHMgdGhlIGNvb3JkaW5hdGVzLiIsIkMiOiJUaGlzIGlnbm9yZXMgdGhlIG5lZ2F0aXZlIHNpZ24gb24gdGhlIGltYWdpbmFyeSBwYXJ0LiIsIkQiOiJUaGlzIGNoYW5nZXMgYm90aCBzaWducyBpbmNvcnJlY3RseS4ifSwiaGludCI6Ik1hcCBcXChhICsgamJcXCkgdG8gXFwoKGEsXFwsIGIpXFwpLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJjb21wbGV4X3BsYW5lX3BvaW50X3Bsb3QiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InBvbGFyX2xpbmsiLCJsYWJlbCI6IkxpbmsgYmV0d2VlbiByZWN0YW5ndWxhciBhbmQgcG9sYXIgZm9ybSIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBleHByZXNzaW9uIGlzIHRoZSBwb2xhci1mb3JtIHZlcnNpb24gb2YgXFwoelxcKSB3cml0dGVuIGZyb20gcmVjdGFuZ3VsYXIgY29tcG9uZW50cyBcXChhXFwpIGFuZCBcXChiXFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoeiA9IHIgKyBqXFx0aGV0YVxcKSIsIkIuIFxcKHogPSBhKFxcY29zXFx0aGV0YSArIGpcXHNpblxcdGhldGEpXFwpIiwiQy4gXFwoeiA9IHIoXFxjb3NcXHRoZXRhICsgalxcc2luXFx0aGV0YSlcXCkiLCJELiBcXCh6ID0gXFx0aGV0YShcXGNvcyByICsgalxcc2luIHIpXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiUG9sYXIgZm9ybSB1c2VzIG1hZ25pdHVkZSBcXChyXFwpIGFuZCBhbmdsZSBcXChcXHRoZXRhXFwpLCBnaXZpbmcgXFwoeiA9IHIoXFxjb3NcXHRoZXRhICsgalxcc2luXFx0aGV0YSlcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhpcyBpcyBub3QgYSB2YWxpZCBwb2xhciByZXByZXNlbnRhdGlvbi4iLCJCIjoiVGhlIHNjYWxlIGZhY3RvciBpcyB0aGUgbWFnbml0dWRlIFxcKHJcXCksIG5vdCB0aGUgcmVhbCBwYXJ0IFxcKGFcXCkuIiwiRCI6IlRoaXMgc3dhcHMgdGhlIHJvbGVzIG9mIFxcKHJcXCkgYW5kIFxcKFxcdGhldGFcXCkuIn0sImhpbnQiOiJUaGluayBtYWduaXR1ZGUgdGltZXMgZGlyZWN0aW9uLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkEgc3R1ZGVudCBzYXlzIFxcKHogPSBhICsgamJcXCkgYW5kIFxcKHogPSByKFxcY29zXFx0aGV0YSArIGpcXHNpblxcdGhldGEpXFwpIG11c3QgYmUgZGlmZmVyZW50IG51bWJlcnMgYmVjYXVzZSB0aGV5IGxvb2sgZGlmZmVyZW50LiBFeHBsYWluIHdoeSB0aGF0IGlzIHdyb25nLiIsImlkZWFsX2Fuc3dlciI6IlRoZXkgYXJlIHR3byBkZXNjcmlwdGlvbnMgb2YgdGhlIHNhbWUgcG9pbnQgaW4gdGhlIGNvbXBsZXggcGxhbmUuIFRoZSBmaXJzdCB1c2VzIHJlY3Rhbmd1bGFyIGNvbXBvbmVudHMgXFwoYVxcKSBhbmQgXFwoYlxcKSwgd2hpbGUgdGhlIHNlY29uZCB1c2VzIG1hZ25pdHVkZSBcXChyXFwpIGFuZCBhbmdsZSBcXChcXHRoZXRhXFwpLiBCb3RoIGxvY2F0ZSB0aGUgc2FtZSBwb2ludDsgb25seSB0aGUgY29vcmRpbmF0ZSBzeXN0ZW0gZGlmZmVycy4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IHN0YXRlIHRoYXQgYm90aCBmb3JtcyByZXByZXNlbnQgdGhlIHNhbWUgY29tcGxleCBudW1iZXIgb3IgdGhlIHNhbWUgcG9pbnQiLCJNdXN0IGRpc3Rpbmd1aXNoIHJlY3Rhbmd1bGFyIGNvb3JkaW5hdGVzIFxcKChhLCBiKVxcKSBmcm9tIHBvbGFyIGNvb3JkaW5hdGVzIFxcKChyLCBcXHRoZXRhKVxcKSIsIlNob3VsZCBtZW50aW9uIFxcKGEsIGJcXCkgdmVyc3VzIFxcKHIsIFxcdGhldGFcXCkgZXhwbGljaXRseSJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQgdW5kZXJzdGFuZHMgcmVwcmVzZW50YXRpb24sIG5vdCBqdXN0IGZvcm11bGEgcmVjYWxsLiIsImhpbnQiOiJDb21wYXJlIENhcnRlc2lhbiBjb29yZGluYXRlcyBhbmQgcG9sYXIgY29vcmRpbmF0ZXMgZm9yIGFuIG9yZGluYXJ5IHBvaW50IGluIHRoZSBwbGFuZSDigJQgc2FtZSBsb2NhdGlvbiwgdHdvIGRlc2NyaXB0aW9ucy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
