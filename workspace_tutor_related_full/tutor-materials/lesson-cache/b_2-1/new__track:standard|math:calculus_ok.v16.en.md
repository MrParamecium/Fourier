%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJUaGlzIHNlY3Rpb24gaXMgYmVzdCB0YXVnaHQgd2l0aCBib3RoIHRoZSB0ZXh0Ym9vayBwaGFzb3IgZmlndXJlIGFuZCBvbmUgY2xlYW4gZ2VuZXJhdGVkIHdhdmVmb3JtL3BoYXNvciBkaWFncmFtLiBUaGUgdGV4dGJvb2sgZmlndXJlIGFuY2hvcnMgdGhlIGxlc3NvbiB0byB0aGUgYm9vaydzIGV4YWN0IG1ldGhvZCwgd2hpbGUgYSBzaW1wbGUgbWF0cGxvdGxpYiB2aXN1YWwgY2FuIG1ha2UgdGhlIHNhbWUtZnJlcXVlbmN5ICdjb21iaW5lIGludG8gb25lIHNpbnVzb2lkJyBpZGVhIGVhc2llciB0byBzZWUgcXVpY2tseS4iLCJjcmFtIjoiVXNlIHZpc3VhbHMgdG8gaGVscCB0aGUgc3R1ZGVudCBpbnN0YW50bHkgcmVjb2duaXplIHRoZSBzdGFuZGFyZCBwYXR0ZXJuOiBob3Jpem9udGFsIGNvc2luZSBjb21wb25lbnQgcGx1cyB2ZXJ0aWNhbCBzaW5lIGNvbXBvbmVudCBnaXZlcyBvbmUgcmVzdWx0YW50IHBoYXNvci4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgYm9vayBmaWd1cmUgZm9yIHRoZSBjb3JlIHBoYXNvciBpZGVhLCB0aGVuIG9uZSBjbGVhbiBnZW5lcmF0ZWQgdmlzdWFsIHRvIGNvbm5lY3QgdGhlIGFsZ2VicmEgdG8gYSByZXByZXNlbnRhdGl2ZSBleGFtcGxlLiIsInRvcF9zY29yZSI6IlVzZSB2aXN1YWxzIHRvIHN0cmVzcyBhbmdsZSBpbnRlcnByZXRhdGlvbiwgcXVhZHJhbnQgY2hvaWNlLCBhbmQgZXF1aXZhbGVudCBwaGFzZSBmb3JtcyB0aGF0IGxvb2sgZGlmZmVyZW50IGJ1dCByZXByZXNlbnQgdGhlIHNhbWUgc2ludXNvaWQuIn0=" style="display:none;"></div>%%KC_END%%
# B.2-1 Addition of Sinusoids

> **Objective:** Learn to combine two same-frequency sinusoids into one, compute the resulting amplitude and phase, and avoid the classic angle-quadrant mistake.

Here is a surprising fact: if you add ω₀t cosine and a phase-shifted sine of the **same** frequency, the result still looks like a single sinusoid — same frequency, just a new amplitude and phase. No new frequencies appear.

This section is about exactly that: taking an expression of the form αω₀t cosine plus βω₀t sine and collapsing it into one clean cosine with a new amplitude and phase shift. This skill simplifies signal expressions, speeds up exam work, and lays the groundwork for phasors and frequency-response analysis.

The main pattern to master:

$$
a\cos(\omega_0 t) + b\sin(\omega_0 t) \longrightarrow \text{one sinusoid}
$$

## 1. Main Idea: Same Frequency Means One Combined Sinusoid

The key requirement is **same frequency**. When both terms share ω₀, only the amplitude and phase change after addition — the frequency stays fixed.

The logic comes from the cosine addition identity:

$$
C\cos(\omega_0 t + \theta) = C\cos\theta\cos(\omega_0 t) - C\sin\theta\sin(\omega_0 t)
$$

Matching coefficients gives:

$$
a = C\cos\theta, \qquad b = -C\sin\theta
$$

So the exam pattern is:

$$
a\cos(\omega_0 t) + b\sin(\omega_0 t) = C\cos(\omega_0 t + \theta)
$$

where \(C\) and \(\theta\) are computed from \(a\) and \(b\) using the formulas in the next block.

### EXAM NOTE

If the two terms have **different** frequencies, this shortcut does not apply — the sum cannot be written as a single sinusoid.

$$a\cos(\omega_0 t) + b\sin(\omega_0 t) = C\cos(\omega_0 t + \theta)$$
*This formula rewrites two same-frequency sinusoidal terms as one cosine with a new amplitude \(C\) and a new phase shift \(\theta\), without changing the frequency \(\omega_0\).*

$$C = \sqrt{a^2 + b^2}, \qquad \theta = \tan^{-1}\!\left(\frac{-b}{a}\right)$$
*\(C\) is the magnitude of the phasor formed by components \(a\) and \(-b\), while \(\theta\) must be interpreted with the correct quadrant — never trust the raw calculator arctangent output without checking the signs of \(a\) and \(-b\) first.*

## 2. Representative Example: Convert to One Sinusoid

Let us work through:

$$
x(t) = \cos(\omega_0 t) - \sqrt{3}\,\sin(\omega_0 t)
$$

**Step 1 — Identify \(a\) and \(b\).**

Comparing with \(a\cos(\omega_0 t) + b\sin(\omega_0 t)\): \(a = 1\) and \(b = -\sqrt{3}\).

**Step 2 — Compute \(C\).**

$$
C = \sqrt{a^2 + b^2} = \sqrt{1^2 + (-\sqrt{3})^2} = \sqrt{1 + 3} = \sqrt{4} = 2
$$

**Step 3 — Compute \(\theta\).**

$$
\theta = \tan^{-1}\!\left(\frac{-b}{a}\right) = \tan^{-1}\!\left(\frac{\sqrt{3}}{1}\right) = 60°
$$

Both \(a = 1 > 0\) and \(-b = \sqrt{3} > 0\), so the phasor is in the first quadrant — 60° is correct.

**Result:**

$$
x(t) = 2\cos(\omega_0 t + 60°)
$$

### EXAM SPEED TIP

Once \(a\) and \(b\) are identified, always compute \(C\) first, then \(\theta\). This order prevents sign errors from propagating.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgZmlndXJlIHRvIGxvY2sgaW4gdGhlIHN0YW5kYXJkIHBhdHRlcm46IGhvcml6b250YWwgYSwgdmVydGljYWwgLWIsIHJlc3VsdGFudCBDIGF0IGFuZ2xlIM64LiIsInN0YW5kYXJkIjoiVXNlIHRoaXMgZmlndXJlIHRvIGNvbm5lY3QgdGhlIGZvcm11bGEgZm9yIEMgYW5kIM64IHRvIHRoZSBwaGFzb3IgdHJpYW5nbGUgY2xlYXJseS4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhpcyBmaWd1cmUgdG8gc3RyZXNzIHdoeSB0aGUgc2lnbiBvZiBiIGFmZmVjdHMgdGhlIGFuZ2xlIGFuZCB3aHkgcXVhZHJhbnQgY2hlY2tpbmcgbWF0dGVycy4ifQ==" style="display:none;"></div>%%KC_END%%
![unknown](/figures/page-018-unknown-1.png)
*The cosine term contributes a horizontal phasor component \(a\) and the sine term contributes a vertical component \(-b\); their vector sum has magnitude \(C = \sqrt{a^2+b^2}\) and angle \(\theta\), giving the amplitude and phase of the single equivalent sinusoid.*

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="example_support" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgZGlhZ3JhbSB0byBoZWxwIHRoZSBzdHVkZW50IHNwb3QgdGhlIG51bWJlcnMgMSwg4oiaMywgMiwgYW5kIDYwwrAgYXMgb25lIHJldXNhYmxlIHBhdHRlcm4uIiwic3RhbmRhcmQiOiJVc2UgdGhpcyBkaWFncmFtIHRvIHN1cHBvcnQgdGhlIHdvcmtlZCBleGFtcGxlIGFuZCBzaG93IGhvdyB0aGUgcmVzdWx0YW50IHBoYXNvciBtYXRjaGVzIHRoZSBmaW5hbCBzaW5nbGUgc2ludXNvaWQuIiwidG9wX3Njb3JlIjoiVXNlIHRoaXMgZGlhZ3JhbSB0byBjb21wYXJlIHNpZ24gY29udmVudGlvbnMgYW5kIHJlaW5mb3JjZSB3aHkgdGhlIGFuZ2xlIGxhbmRzIGluIHRoZSBjb3JyZWN0IHF1YWRyYW50LiJ9" style="display:none;"></div>%%KC_END%%
*📊 Phasor diagram for \(x(t) = \cos(\omega_0 t) - \sqrt{3}\,\sin(\omega_0 t)\): the horizontal component \(a = 1\) and vertical component \(-b = \sqrt{3}\) combine to give resultant \(C = 2\) at angle \(\theta = 60°\), confirming \(x(t) = 2\cos(\omega_0 t + 60°)\).*
![Chart](/generated/fig-1777189207597-4mer6is2.png)

## 3. Phasor Method and the Main Trap

Here is the geometric picture behind the formula. The term \(a\cos(\omega_0 t)\) is a **horizontal phasor** of length \(a\). The term \(b\sin(\omega_0 t)\) can be rewritten as \(b\cos(\omega_0 t - \pi/2)\), which is a **vertical phasor** of length \(b\) pointing downward (or upward if \(b < 0\)). The resultant of these two perpendicular phasors has magnitude \(C\) and angle \(\theta\).

### THE MAIN TRAP

The calculator's \(\tan^{-1}\) always returns a value in \((-90°, 90°)\). This is only the **principal value** — it may not match the actual quadrant of the phasor.

For example, if \(a = -3\) and \(b = 4\), then \(-b = -4\). The phasor components are \(a = -3\) (left) and \(-b = -4\) (down), placing the phasor in the **third quadrant**. The magnitude is \(C = \sqrt{9 + 16} = 5\), and the correct angle is approximately \(-126.9°\) in principal-value form — not the raw arctangent output.

#### Quick Check

Always inspect the signs of \(a\) and \(-b\) before trusting \(\theta\). The quadrant of the phasor must match the signs of both components.

---
**📌 Key Takeaways**
- Only same-frequency cosine and sine terms can be combined into one sinusoid using this method.
- The combined amplitude is always \(C = \sqrt{a^2 + b^2}\), a nonnegative magnitude.
- Always check the signs of \(a\) and \(-b\) to confirm the correct quadrant for \(\theta\).

*In the next section we will extend these ideas to the general phasor representation and see how sinusoid addition connects to complex exponentials and frequency-domain analysis.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InNhbWVfZnJlcXVlbmN5X3NpbmdsZV9zaW51c29pZCIsImxhYmVsIjoiUmVjb2duaXppbmcgd2hlbiB0d28gc2ludXNvaWRzIGNhbiBiZSBjb21iaW5lZCBpbnRvIG9uZSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggZXhwcmVzc2lvbiBjYW4gYmUgcmV3cml0dGVuIGRpcmVjdGx5IGFzIGEgc2luZ2xlIHNpbnVzb2lkIHVzaW5nIHRoaXMgc2VjdGlvbidzIG1ldGhvZD8iLCJvcHRpb25zIjpbIkEuIFxcKDJcXGNvcygzdCkgKyA1XFxzaW4oM3QpXFwpIiwiQi4gXFwoMlxcY29zKDN0KSArIDVcXHNpbig0dClcXCkiLCJDLiBcXCgyXFxjb3MoM3QpICsgNXRcXCkiLCJELiBcXCgyXFxjb3MoM3QpICsgNVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlRoZSBtZXRob2QgYXBwbGllcyB3aGVuIHRoZSBzaW5lIGFuZCBjb3NpbmUgdGVybXMgaGF2ZSB0aGUgc2FtZSBmcmVxdWVuY3kuIEluIGNob2ljZSBBLCBib3RoIHVzZSBcXCgzdFxcKSwgc28gdGhleSBjYW4gYmUgY29tYmluZWQgaW50byBvbmUgc2ludXNvaWQuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhlIGZyZXF1ZW5jaWVzIGRpZmZlciAoXFwoM3RcXCkgdnMgXFwoNHRcXCkpLCBzbyB0aGUgc3VtIGlzIG5vdCBhIHNpbmdsZSBzaW51c29pZCBvZiBvbmUgZnJlcXVlbmN5IGJ5IHRoaXMgbWV0aG9kLiIsIkMiOiJUaGUgc2Vjb25kIHRlcm0gXFwoNXRcXCkgaXMgbm90IGEgc2ludXNvaWQuIiwiRCI6IlRoZSBjb25zdGFudCB0ZXJtIFxcKDVcXCkgaXMgbm90IGEgc2FtZS1mcmVxdWVuY3kgc2ludXNvaWQuIn0sImhpbnQiOiJDaGVjayB3aGV0aGVyIGJvdGggdHJpZyB0ZXJtcyB1c2UgdGhlIHNhbWUgYW5ndWxhciBmcmVxdWVuY3kuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaHkgZG9lcyBcXChhXFxjb3MoXFxvbWVnYV8wIHQpICsgYlxcc2luKFxcb21lZ2FfMCB0KVxcKSBjb21iaW5lIGludG8gb25lIHNpbnVzb2lkIG9mIHRoZSBzYW1lIGZyZXF1ZW5jeT8iLCJvcHRpb25zIjpbIkEuIEJlY2F1c2Ugc2luZSBhbmQgY29zaW5lIGFyZSBhbHdheXMgZXF1YWwiLCJCLiBCZWNhdXNlIGNoYW5naW5nIGFtcGxpdHVkZSBhbmQgcGhhc2UgY2FuIGFic29yYiB0aGUgdHdvIGNvZWZmaWNpZW50cyB3aGVuIHRoZSBmcmVxdWVuY3kgaXMgdGhlIHNhbWUiLCJDLiBCZWNhdXNlIGFueSBzdW0gb2YgZnVuY3Rpb25zIGJlY29tZXMgb25lIGZ1bmN0aW9uIiwiRC4gQmVjYXVzZSB0aGUgcmVzdWx0IG11c3QgYmUgemVybyBhdCBcXCh0ID0gMFxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSB0d28gc2FtZS1mcmVxdWVuY3kgY29tcG9uZW50cyBjYW4gYmUgcmVwcmVzZW50ZWQgYXMgb25lIHNpbnVzb2lkIHdpdGggYSBuZXcgYW1wbGl0dWRlIGFuZCBwaGFzZSwgYmVjYXVzZSB0aGUgY29zaW5lIGFkZGl0aW9uIGlkZW50aXR5IGFsbG93cyB0aGUgY29lZmZpY2llbnRzIFxcKGFcXCkgYW5kIFxcKGJcXCkgdG8gYmUgYWJzb3JiZWQgaW50byBcXChDXFwpIGFuZCBcXChcXHRoZXRhXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlNpbmUgYW5kIGNvc2luZSBhcmUgcGhhc2Utc2hpZnRlZCB2ZXJzaW9ucyBvZiBlYWNoIG90aGVyLCBub3QgZXF1YWwgZnVuY3Rpb25zLiIsIkMiOiJUaGF0IHN0YXRlbWVudCBpcyB0b28gdmFndWUgYW5kIG5vdCBtYXRoZW1hdGljYWxseSByZWxldmFudCBoZXJlLiIsIkQiOiJUaGUgdmFsdWUgYXQgXFwodCA9IDBcXCkgZG9lcyBub3QgZGV0ZXJtaW5lIHRoaXMgaWRlbnRpdHkuIn0sImhpbnQiOiJUaGluayBpbiB0ZXJtcyBvZiBhbXBsaXR1ZGUgYW5kIHBoYXNlLCBub3QgY2hhbmdpbmcgZnJlcXVlbmN5LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiY29tcHV0ZV9jX2FuZF90aGV0YSIsImxhYmVsIjoiQ29tcHV0aW5nIGFtcGxpdHVkZSBhbmQgcGhhc2UgZnJvbSBhIGFuZCBiIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgXFwoeCh0KSA9IFxcY29zKFxcb21lZ2FfMCB0KSAtIFxcc3FydHszfVxcLFxcc2luKFxcb21lZ2FfMCB0KVxcKSwgd2hhdCBpcyB0aGUgY29ycmVjdCBzaW5nbGUtc2ludXNvaWQgZm9ybT8iLCJvcHRpb25zIjpbIkEuIFxcKDJcXGNvcyhcXG9tZWdhXzAgdCAtIDYwwrApXFwpIiwiQi4gXFwoMlxcY29zKFxcb21lZ2FfMCB0ICsgNjDCsClcXCkiLCJDLiBcXCgyXFxzaW4oXFxvbWVnYV8wIHQgKyA2MMKwKVxcKSIsIkQuIFxcKFxcc3FydHsyfVxcY29zKFxcb21lZ2FfMCB0ICsgNDXCsClcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJIZXJlIFxcKGEgPSAxXFwpIGFuZCBcXChiID0gLVxcc3FydHszfVxcKSwgc28gXFwoQyA9IFxcc3FydHsxICsgM30gPSAyXFwpIGFuZCBcXChcXHRoZXRhID0gXFx0YW5eey0xfVxcIVxcbGVmdChcXGZyYWN7LWJ9e2F9XFxyaWdodCkgPSBcXHRhbl57LTF9KFxcc3FydHszfSkgPSA2MMKwXFwpLiBCb3RoIGNvbXBvbmVudHMgYXJlIHBvc2l0aXZlLCBjb25maXJtaW5nIGZpcnN0LXF1YWRyYW50IHBsYWNlbWVudC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGUgc2lnbiBvZiB0aGUgcGhhc2UgaXMgd3JvbmcgZm9yIHRoaXMgXFwoYVxcKSBhbmQgXFwoYlxcKSBwYWlyOyBcXCgtYiA9IFxcc3FydHszfSA+IDBcXCkgcGxhY2VzIHRoZSBwaGFzb3IgaW4gdGhlIGZpcnN0IHF1YWRyYW50LCBnaXZpbmcgYSBwb3NpdGl2ZSBhbmdsZS4iLCJDIjoiVGhlIHNlY3Rpb24ncyBzdGFuZGFyZCByZXN1bHQgaXMgZXhwcmVzc2VkIGluIGNvc2luZSBmb3JtOyB0aGlzIG9wdGlvbiBkb2VzIG5vdCBtYXRjaCB0aGUgY29tcHV0ZWQgZXF1aXZhbGVudCBkaXJlY3RseS4iLCJEIjoiQm90aCBhbXBsaXR1ZGUgYW5kIHBoYXNlIGFyZSBpbmNvcnJlY3QgZm9yIHRoZXNlIHZhbHVlcyBvZiBcXChhXFwpIGFuZCBcXChiXFwpLiJ9LCJoaW50IjoiSWRlbnRpZnkgXFwoYVxcKSBhbmQgXFwoYlxcKSBmaXJzdCwgdGhlbiBjb21wdXRlIFxcKENcXCkgYmVmb3JlIFxcKFxcdGhldGFcXCkuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6InBoYXNvcl9kaWFncmFtIiwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIFxcKHgodCkgPSAtM1xcY29zKFxcb21lZ2FfMCB0KSArIDRcXHNpbihcXG9tZWdhXzAgdClcXCksIHdoYXQgaXMgXFwoQ1xcKT8iLCJvcHRpb25zIjpbIkEuIFxcKDFcXCkiLCJCLiBcXCg1XFwpIiwiQy4gXFwoN1xcKSIsIkQuIFxcKC01XFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiXFwoQyA9IFxcc3FydHsoLTMpXjIgKyA0XjJ9ID0gXFxzcXJ0ezkgKyAxNn0gPSBcXHNxcnR7MjV9ID0gNVxcKS4gQW1wbGl0dWRlIGlzIGFsd2F5cyB0YWtlbiBhcyBhIHBvc2l0aXZlIG1hZ25pdHVkZS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIGRvZXMgbm90IGNvbWUgZnJvbSB0aGUgbWFnbml0dWRlIGZvcm11bGEgXFwoXFxzcXJ0e2FeMitiXjJ9XFwpLiIsIkMiOiJUaGlzIGFkZHMgdGhlIGNvZWZmaWNpZW50cyBkaXJlY3RseSAoXFwoLTMgKyA0ID0gMVxcKSwgb3IgXFwoMyArIDQgPSA3XFwpKSBpbnN0ZWFkIG9mIHVzaW5nIFxcKFxcc3FydHthXjIrYl4yfVxcKS4iLCJEIjoiQW1wbGl0dWRlIG1hZ25pdHVkZSBpcyBub25uZWdhdGl2ZSBieSBkZWZpbml0aW9uLiJ9LCJoaW50IjoiVXNlIHRoZSBtYWduaXR1ZGUgZm9ybXVsYSBcXChDID0gXFxzcXJ0e2FeMiArIGJeMn1cXCksIG5vdCBzaW1wbGUgYWRkaXRpb24uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJwaGFzb3JfaW50ZXJwcmV0YXRpb25fYW5kX3F1YWRyYW50IiwibGFiZWwiOiJSZWFkaW5nIHRoZSBwaGFzb3IgcGljdHVyZSBhbmQgY2hlY2tpbmcgcXVhZHJhbnQiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkluIHRoZSBwaGFzb3IgbWV0aG9kIGZvciBcXChhXFxjb3MoXFxvbWVnYV8wIHQpICsgYlxcc2luKFxcb21lZ2FfMCB0KVxcKSwgd2hhdCBkb2VzIHRoZSBzaW5lIHRlcm0gY29ycmVzcG9uZCB0byB3aGVuIHJld3JpdHRlbiBpbiBjb3NpbmUgZm9ybT8iLCJvcHRpb25zIjpbIkEuIFxcKGJcXGNvcyhcXG9tZWdhXzAgdCArIFxccGkvMilcXCkiLCJCLiBcXChiXFxjb3MoXFxvbWVnYV8wIHQgLSBcXHBpLzIpXFwpIiwiQy4gXFwoYlxcY29zKFxcb21lZ2FfMCB0KVxcKSIsIkQuIFxcKC1iXFxjb3MoXFxvbWVnYV8wIHQgLSBcXHBpKVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlNpbmNlIFxcKFxcc2luKFxcb21lZ2FfMCB0KSA9IFxcY29zKFxcb21lZ2FfMCB0IC0gXFxwaS8yKVxcKSwgdGhlIHRlcm0gXFwoYlxcc2luKFxcb21lZ2FfMCB0KVxcKSBiZWNvbWVzIFxcKGJcXGNvcyhcXG9tZWdhXzAgdCAtIFxccGkvMilcXCksIHdoaWNoIGlzIHJlcHJlc2VudGVkIGJ5IGEgdmVydGljYWwgcGhhc29yIGxhZ2dpbmcgdGhlIGNvc2luZSBieSBcXCg5MMKwXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkEgcGhhc2Ugc2hpZnQgb2YgXFwoK1xccGkvMlxcKSB3b3VsZCBjb3JyZXNwb25kIHRvIFxcKC1cXHNpbihcXG9tZWdhXzAgdClcXCksIG5vdCBcXCgrXFxzaW4oXFxvbWVnYV8wIHQpXFwpLiIsIkMiOiJUaGlzIGlnbm9yZXMgdGhlIFxcKDkwwrBcXCkgcGhhc2Ugc2hpZnQgYmV0d2VlbiBzaW5lIGFuZCBjb3NpbmUgZW50aXJlbHkuIiwiRCI6IlRoaXMgaXMgbm90IHRoZSBzdGFuZGFyZCBjb252ZXJzaW9uIHVzZWQgaW4gdGhpcyBzZWN0aW9uLiJ9LCJoaW50IjoiUmVtZW1iZXI6IHNpbmUgbGFncyBjb3NpbmUgYnkgXFwoOTDCsFxcKSwgaS5lLiwgXFwoXFxzaW4oXFxvbWVnYV8wIHQpID0gXFxjb3MoXFxvbWVnYV8wIHQgLSBcXHBpLzIpXFwpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9LHsiaWQiOiJrcDNfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgc3R1ZGVudCBjb21wdXRlcyBcXChcXHRoZXRhID0gXFx0YW5eey0xfVxcIVxcbGVmdChcXGZyYWN7LWJ9e2F9XFxyaWdodClcXCkgYW5kIGdldHMgXFwoNTMuMcKwXFwpLiBCdXQgXFwoYSA8IDBcXCkgYW5kIFxcKC1iIDwgMFxcKS4gV2hhdCBzaG91bGQgdGhlIHN0dWRlbnQgZG8gbmV4dD8iLCJvcHRpb25zIjpbIkEuIEFjY2VwdCBcXCg1My4xwrBcXCkgaW1tZWRpYXRlbHkgYmVjYXVzZSBjYWxjdWxhdG9ycyBhcmUgYWx3YXlzIGNvcnJlY3QiLCJCLiBDaGFuZ2UgXFwoQ1xcKSB0byBhIG5lZ2F0aXZlIHZhbHVlIiwiQy4gQ2hlY2sgdGhlIHBoYXNvciBxdWFkcmFudCBhbmQgYWRqdXN0IHRoZSBhbmdsZSBhY2NvcmRpbmdseSIsIkQuIFJlcGxhY2UgY29zaW5lIHdpdGggc2luZSBhdXRvbWF0aWNhbGx5Il0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiSW52ZXJzZSB0YW5nZW50IGFsb25lIG1heSByZXR1cm4gb25seSB0aGUgcHJpbmNpcGFsIHZhbHVlIGluIFxcKCgtOTDCsCwgOTDCsClcXCksIG1pc3NpbmcgdGhlIGNvcnJlY3QgcXVhZHJhbnQuIFNpbmNlIGJvdGggXFwoYSA8IDBcXCkgYW5kIFxcKC1iIDwgMFxcKSwgdGhlIHBoYXNvciBsaWVzIGluIHRoZSB0aGlyZCBxdWFkcmFudCwgc28gdGhlIGFuZ2xlIG11c3QgYmUgYWRqdXN0ZWQgKGUuZy4sIHN1YnRyYWN0IFxcKDE4MMKwXFwpIGZyb20gdGhlIHJhdyByZXN1bHQpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBjYWxjdWxhdG9yJ3MgYXJjdGFuZ2VudCBvdXRwdXQgaXMgb25seSBhIHByaW5jaXBhbCB2YWx1ZSBhbmQgbWF5IG5vdCByZWZsZWN0IHRoZSBhY3R1YWwgcGhhc29yIHF1YWRyYW50LiIsIkIiOiJcXChDXFwpIGlzIGEgbWFnbml0dWRlIGFuZCBtdXN0IHJlbWFpbiBub25uZWdhdGl2ZS4iLCJEIjoiQ2hhbmdpbmcgdGhlIGZ1bmN0aW9uIHR5cGUgZG9lcyBub3QgZml4IGEgcXVhZHJhbnQgbWlzdGFrZS4ifSwiaGludCI6IlVzZSB0aGUgc2lnbnMgb2YgdGhlIGhvcml6b250YWwgY29tcG9uZW50IFxcKGFcXCkgYW5kIHZlcnRpY2FsIGNvbXBvbmVudCBcXCgtYlxcKSB0byBkZXRlcm1pbmUgd2hpY2ggcXVhZHJhbnQgdGhlIHBoYXNvciBsaWVzIGluLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJxdWFkcmFudF9waGFzb3JfcGxvdCIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwM19xMyIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiRXhwbGFpbiBicmllZmx5IHdoeSBjaGVja2luZyB0aGUgc2lnbnMgb2YgXFwoYVxcKSBhbmQgXFwoLWJcXCkgaGVscHMgeW91IGNob29zZSB0aGUgY29ycmVjdCBwaGFzZSBhbmdsZSBcXChcXHRoZXRhXFwpLiIsImlkZWFsX2Fuc3dlciI6IlRoZSBwaGFzb3IgZm9yIFxcKGFcXGNvcyhcXG9tZWdhXzAgdCkgKyBiXFxzaW4oXFxvbWVnYV8wIHQpXFwpIGhhcyBob3Jpem9udGFsIGNvbXBvbmVudCBcXChhXFwpIGFuZCB2ZXJ0aWNhbCBjb21wb25lbnQgXFwoLWJcXCkuIFRoZWlyIHNpZ25zIHRlbGwgd2hpY2ggcXVhZHJhbnQgdGhlIHJlc3VsdGFudCBwaGFzb3IgbGllcyBpbiwgc28gdGhleSBkZXRlcm1pbmUgd2hldGhlciB0aGUgcmF3IGNhbGN1bGF0b3IgYXJjdGFuZ2VudCBhbmdsZSBtdXN0IGJlIGFkanVzdGVkIHRvIG1hdGNoIHRoYXQgcXVhZHJhbnQuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBtZW50aW9uIGhvcml6b250YWwgY29tcG9uZW50IFxcKGFcXCkiLCJNdXN0IG1lbnRpb24gdmVydGljYWwgY29tcG9uZW50IFxcKC1iXFwpIiwiTXVzdCBzdGF0ZSB0aGF0IHNpZ25zIGRldGVybWluZSB0aGUgcXVhZHJhbnQiLCJNdXN0IGNvbm5lY3QgcXVhZHJhbnQgdG8gY29ycmVjdGluZyBcXChcXHRoZXRhXFwpIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCB1bmRlcnN0YW5kcyB0aGUgZ2VvbWV0cnkgYmVoaW5kIHRoZSBhbmdsZSBmb3JtdWxhIHJhdGhlciB0aGFuIGp1c3QgbWVtb3JpemluZyB0aGUgYXJjdGFuZ2VudCBleHByZXNzaW9uLiIsImhpbnQiOiJTdGF0ZSB3aGF0IHRoZSBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBjb21wb25lbnRzIG9mIHRoZSBwaGFzb3IgYXJlLCB0aGVuIGV4cGxhaW4gaG93IHRoZWlyIHNpZ25zIGxvY2F0ZSB0aGUgcGhhc29yIGluIHRoZSBwbGFuZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
