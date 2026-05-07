%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJBZ2VudCBBIEpTT04gZmFpbGVkLCBzbyBrZWVwIG9uZSB0ZXh0Ym9vayBmaWd1cmUgYXMgdGhlIGZhY3R1YWwgYW5jaG9yIGFuZCBhZGQgb25lIGdlbmVyYXRlZCBncHRpbWFnZTIgdGVhY2hpbmcgdmlzdWFsIHRvIHByZXNlcnZlIGNsYXJpdHkuIiwiY3JhbSI6IlVzZSB0aGUgdmlzdWFsIHRvIHJlY29nbml6ZSB0aGUgZXhhbSBwYXR0ZXJuIHF1aWNrbHkuIiwic3RhbmRhcmQiOiJVc2UgdGhlIHZpc3VhbCB0byBjbGFyaWZ5IHRoZSBjb3JlIGNvbmNlcHQgd2l0aCBhIHNpbmdsZSBjbGVhciBwYXRoLiIsInRvcF9zY29yZSI6IlVzZSB0aGUgdmlzdWFsIHRvIGhpZ2hsaWdodCBzdWJ0bGUgZGlzdGluY3Rpb25zLCB0cmFwcywgb3IgdmFyaWFudHMuIn0=" style="display:none;"></div>%%KC_END%%
## Overview

> **Objective:** Understand how two sinusoids of the same frequency combine into a single sinusoid, and apply the amplitude-phase formulas confidently.

When two sinusoidal signals share the same frequency but differ in phase, they always add up to produce **one** sinusoid at that same frequency. This is not obvious at first glance — you might expect a complicated waveform — but a trigonometric identity makes it clean and exact.

Specifically, any expression of the form \(a\cos\omega_0 t + b\sin\omega_0 t\) can be rewritten as \(C\cos(\omega_0 t + \theta)\), where \(C\) and \(\theta\) are determined by \(a\) and \(b\). After this section you will be able to identify \(a\) and \(b\), compute \(C\) and \(\theta\), and write the combined sinusoid in standard cosine form.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiU2NhbiB0aGUgcGhhc29yIGxlbmd0aHMgYW5kIGFuZ2xlcyDigJQgdGhvc2UgbnVtYmVycyBhcmUgdGhlIEMgYW5kIM64IHlvdSBuZWVkIHRvIHdyaXRlIGRvd24gZmFzdC4iLCJzdGFuZGFyZCI6IlN0dWR5IGhvdyBlYWNoIGNvbXBvbmVudCBzaW51c29pZCBtYXBzIHRvIGEgcGhhc29yIGFycm93LCBhbmQgaG93IHRoZSByZXN1bHRhbnQgcGhhc29yIGdpdmVzIGJvdGggYW1wbGl0dWRlIEMgYW5kIHBoYXNlIM64IG9mIHRoZSBjb21iaW5lZCBzaW51c29pZC4iLCJ0b3Bfc2NvcmUiOiJOb3RpY2UgdGhlIHNpZ24gY29udmVudGlvbnM6IGEgbmVnYXRpdmUgcmVhbCBwYXJ0IG9yIG5lZ2F0aXZlIGltYWdpbmFyeSBwYXJ0IHNoaWZ0cyB0aGUgcGhhc29yIGludG8gYSBkaWZmZXJlbnQgcXVhZHJhbnQsIGNoYW5naW5nIHRoZSBzaWduIG9mIM64IOKAlCBhIGNvbW1vbiBleGFtIHRyYXAuIn0=" style="display:none;"></div>%%KC_END%%
![Fig. B.8](/figures/page-019-fig__b_8-1.png)
*Phasor diagrams for Example B.6 show how two same-frequency sinusoids add geometrically: the resultant phasor's length is \(C\) and its angle is \(\theta\), directly giving the combined sinusoid \(C\cos(\omega_0 t + \theta)\).*

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="comparison_anchor" data-visual-use-b64="eyJjcmFtIjoiUmVhZCB0aGUgdHdvIGZvcm11bGEgYm94ZXMg4oCUIG1lbW9yaXplIFxcKEMgPSBcXHNxcnR7YV4yICsgYl4yfVxcKSBhbmQgXFwoXFx0aGV0YSA9IFxcYXJjdGFuKC1iL2EpXFwpIGFuZCB5b3UgY2FuIHNvbHZlIGFueSBhZGRpdGlvbiBwcm9ibGVtLiIsInN0YW5kYXJkIjoiRm9sbG93IHRoZSByZWFkaW5nIHBhdGg6IHN0YXJ0IGZyb20gdGhlIGdlbmVyYWwgZm9ybSwgc2VlIGhvdyBcXChDXFwpIGFuZCBcXChcXHRoZXRhXFwpIGFyZSBleHRyYWN0ZWQsIHRoZW4gc2VlIHRoZSBwaGFzb3IgZGlhZ3JhbSBjb25maXJtIHRoZSBnZW9tZXRyeS4iLCJ0b3Bfc2NvcmUiOiJGb2N1cyBvbiB0aGUgcmVkIGNhbGxvdXQg4oCUIHRoZSBxdWFkcmFudCBvZiBcXChcXHRoZXRhXFwpIGlzIGRldGVybWluZWQgYnkgdGhlIHNpZ25zIG9mIGJvdGggXFwoYVxcKSBhbmQgXFwoYlxcKSwgbm90IGp1c3QgdGhlIHJhdGlvIFxcKC1iL2FcXCkuIFVzZSB0aGUgcGhhc29yIGRpYWdyYW0gdG8gcmVzb2x2ZSBhbWJpZ3VpdHkuIn0=" style="display:none;"></div>%%KC_END%%
*🎨 One reading path: the general addition formula at top, the two extraction formulas for \(C\) and \(\theta\) in the middle, and the phasor geometry at the bottom confirming the result.*
![Illustration](/generated/gptimage2-1777216798557-2989.png)

## Core Idea

The central relationship in this section is **Equation (B.16)**:

$$
a\cos\omega_0 t + b\sin\omega_0 t = C\cos(\omega_0 t + \theta)
$$

where the amplitude and phase are recovered by:

$$
C = \sqrt{a^2 + b^2}, \qquad \theta = \tan^{-1}\!\left(\frac{-b}{a}\right) \tag{B.17}
$$

These come from setting \(a = C\cos\theta\) and \(b = -C\sin\theta\) and using the Pythagorean identity.

### VISUAL INTUITION

Think of \(a\) and \(-b\) as the horizontal and vertical components of a phasor arrow. The arrow's length is \(C\) and its angle from the horizontal is \(\theta\). Adding two sinusoids is exactly vector addition of their phasors.

### EXAM TRAP

The formula for \(\theta\) is \(\tan^{-1}(-b/a)\), **not** \(\tan^{-1}(b/a)\). The minus sign on \(b\) is easy to drop. Always check the quadrant of \(\theta\) using the signs of \(a\) and \(-b\) separately — \(\arctan\) alone only returns values in \((-90°, 90°)\).

**Quick example:** For \(x(t) = \cos\omega_0 t - \sqrt{3}\sin\omega_0 t\), we have \(a = 1\), \(b = -\sqrt{3}\), so \(C = \sqrt{1+3} = 2\) and \(\theta = \tan^{-1}(\sqrt{3}/1) = 60°\), giving \(x(t) = 2\cos(\omega_0 t + 60°)\).

---
**📌 Key Takeaways**
- Two same-frequency sinusoids always combine into one sinusoid at the same frequency.
- Use \(C = \sqrt{a^2 + b^2}\) and \(\theta = \tan^{-1}(-b/a)\) to find amplitude and phase.
- Always verify the quadrant of \(\theta\) using the signs of \(a\) and \(-b\) separately.

*In the next section we will extend this idea to phasor representation, where sinusoids are treated as rotating complex vectors — making addition, phase shifts, and frequency-domain analysis even more systematic.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NCwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo0LCJtYXgiOjV9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImJfMl8xX2FkZGl0aW9uX29mX3NpbnVzb2lkc19jb3JlIiwibGFiZWwiOiJCLjItMSBBZGRpdGlvbiBvZiBTaW51c29pZHMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJjb3JlX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBzdGF0ZW1lbnQgYmVzdCBjYXB0dXJlcyB0aGUgbWFpbiBsZWFybmluZyBnb2FsIG9mIEIuMi0xIEFkZGl0aW9uIG9mIFNpbnVzb2lkcz8iLCJvcHRpb25zIjpbIkEuIE1lbW9yaXplIHRoZSBmaW5hbCByZXN1bHQgd2l0aG91dCBjb25uZWN0aW5nIGl0IHRvIHRoZSB2aXN1YWwgb3Igc3RydWN0dXJhbCBtZWFuaW5nIiwiQi4gVW5kZXJzdGFuZCB0aGUgY29yZSBkZWZpbml0aW9uLCB0aGUgdmlzdWFsL3N0cnVjdHVyYWwgbWVhbmluZywgYW5kIGhvdyB0aGUgaWRlYSBhcHBlYXJzIGluIGV4YW0gcXVlc3Rpb25zIiwiQy4gVHJlYXQgdGhlIHRvcGljIGFzIHB1cmUgc3ltYm9sIG1hbmlwdWxhdGlvbiB3aXRoIG5vIGNvbmNlcHR1YWwgc3RydWN0dXJlIiwiRC4gRm9jdXMgb25seSBvbiB0ZXJtaW5vbG9neSBiZWNhdXNlIHRoZSBleGFtIG5ldmVyIHRlc3RzIGludGVycHJldGF0aW9uIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiU3Ryb25nIHVuZGVyc3RhbmRpbmcgaW4gdGhpcyBzZWN0aW9uIG1lYW5zIGNvbm5lY3RpbmcgdGhlIGRlZmluaXRpb24gXFwoYVxcY29zXFxvbWVnYV8wIHQgKyBiXFxzaW5cXG9tZWdhXzAgdCA9IENcXGNvcyhcXG9tZWdhXzAgdCtcXHRoZXRhKVxcKSwgdGhlIHBoYXNvciBnZW9tZXRyeSwgYW5kIHRoZSBleGFtLWZhY2luZyBpbnRlcnByZXRhdGlvbi4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJNZW1vcml6YXRpb24gYWxvbmUgdXN1YWxseSBicmVha3Mgb24gdmFyaWFudHMgYW5kIHRyYXAgcXVlc3Rpb25zIOKAlCBlc3BlY2lhbGx5IHRoZSBxdWFkcmFudCBpc3N1ZSB3aXRoIFxcKFxcdGhldGFcXCkuIiwiQyI6IlRoZSBzZWN0aW9uIGlzIG1lYW50IHRvIGJlIHVuZGVyc3Rvb2Qgc3RydWN0dXJhbGx5IHZpYSBwaGFzb3IgZ2VvbWV0cnksIG5vdCBhcyBlbXB0eSBzeW1ib2wgcHVzaGluZy4iLCJEIjoiSW50ZXJwcmV0YXRpb24g4oCUIHN1Y2ggYXMgaWRlbnRpZnlpbmcgXFwoYVxcKSwgXFwoYlxcKSwgYW5kIHRoZSBjb3JyZWN0IHF1YWRyYW50IGZvciBcXChcXHRoZXRhXFwpIOKAlCBpcyBleGFjdGx5IHdoYXQgZXhhbSBxdWVzdGlvbnMgcHJvYmUuIn0sImhpbnQiOiJQaWNrIHRoZSBvcHRpb24gdGhhdCBjb21iaW5lcyBtZWFuaW5nLCBwaGFzb3IgcmVwcmVzZW50YXRpb24sIGFuZCBleGFtIHVzZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoiY29yZV9xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiSW4gMeKAkzIgc2VudGVuY2VzLCBleHBsYWluIHRoZSBjb3JlIHJlbGF0aW9uc2hpcCBhIHN0dWRlbnQgc2hvdWxkIG5vdGljZSBmaXJzdCB3aGVuIGxlYXJuaW5nIEIuMi0xIEFkZGl0aW9uIG9mIFNpbnVzb2lkcy4iLCJpZGVhbF9hbnN3ZXIiOiJUaGUgY29yZSByZWxhdGlvbnNoaXAgaXMgdGhhdCBhbnkgc3VtIFxcKGFcXGNvc1xcb21lZ2FfMCB0ICsgYlxcc2luXFxvbWVnYV8wIHRcXCkgY29sbGFwc2VzIGludG8gYSBzaW5nbGUgc2ludXNvaWQgXFwoQ1xcY29zKFxcb21lZ2FfMCB0K1xcdGhldGEpXFwpLCB3aGVyZSBcXChDID0gXFxzcXJ0e2FeMitiXjJ9XFwpIGFuZCBcXChcXHRoZXRhID0gXFx0YW5eey0xfSgtYi9hKVxcKS4gVGhpcyBjYW4gYmUgdmlzdWFsaXplZCBhcyBwaGFzb3IgYWRkaXRpb246IFxcKGFcXCkgYW5kIFxcKC1iXFwpIGFyZSB0aGUgaG9yaXpvbnRhbCBhbmQgdmVydGljYWwgY29tcG9uZW50cywgXFwoQ1xcKSBpcyB0aGUgcmVzdWx0YW50IGxlbmd0aCwgYW5kIFxcKFxcdGhldGFcXCkgaXMgaXRzIGFuZ2xlLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3Qgc3RhdGUgdGhhdCB0d28gc2FtZS1mcmVxdWVuY3kgc2ludXNvaWRzIGNvbWJpbmUgaW50byBvbmUgc2ludXNvaWQiLCJNdXN0IGdpdmUgb3IgZGVzY3JpYmUgdGhlIGZvcm11bGFzIGZvciBcXChDXFwpIGFuZCBcXChcXHRoZXRhXFwpIiwiTXVzdCBjb25uZWN0IHRoZSByZXN1bHQgdG8gYSB2aXN1YWwgb3IgcGhhc29yIGludGVycHJldGF0aW9uIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCBzZWVzIHRoZSBtYWluIHRocmVhZCDigJQgc3RydWN0dXJhbCBjb2xsYXBzZSBwbHVzIGdlb21ldHJpYyBtZWFuaW5nIOKAlCByYXRoZXIgdGhhbiBpc29sYXRlZCBmYWN0cy4iLCJoaW50IjoiU3RhcnQgd2l0aCAndGhlIG1haW4gcmVsYXRpb25zaGlwIGlzLi4uJyBhbmQgdGhlbiBtZW50aW9uIGJvdGggdGhlIGZvcm11bGEgYW5kIHRoZSBwaGFzb3IgcGljdHVyZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
