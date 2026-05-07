%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImdlbmVyYXRlZF9pbWFnZSIsInJhdGlvbmFsZSI6IkFnZW50IEEgSlNPTiBmYWlsZWQsIHNvIHJlbHkgb24gb25lIGdlbmVyYXRlZCBncHRpbWFnZTIgdGVhY2hpbmcgdmlzdWFsIGluc3RlYWQgb2YgcmV0dXJuaW5nIGEgdGV4dC1vbmx5IGxlc3Nvbi4iLCJjcmFtIjoiVXNlIHRoZSB2aXN1YWwgdG8gcmVjb2duaXplIHRoZSBleGFtIHBhdHRlcm4gcXVpY2tseS4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgdmlzdWFsIHRvIGNsYXJpZnkgdGhlIGNvcmUgY29uY2VwdCB3aXRoIGEgc2luZ2xlIGNsZWFyIHBhdGguIiwidG9wX3Njb3JlIjoiVXNlIHRoZSB2aXN1YWwgdG8gaGlnaGxpZ2h0IHN1YnRsZSBkaXN0aW5jdGlvbnMsIHRyYXBzLCBvciB2YXJpYW50cy4ifQ==" style="display:none;"></div>%%KC_END%%
## Overview

> **Objective:** Build a compact, reliable reference of the mathematical tools that appear throughout signals and systems — and know which ones the exam actually tests.

Section B.8 collects the most frequently used mathematical facts into one place: key constants, complex number identities, finite and infinite sums, Taylor and Maclaurin series, power series expansions, trigonometric identities, and standard derivative and integral formulas. Rather than deriving each result from scratch, the goal is to recognize each formula family, understand its structural meaning, and apply it confidently under exam conditions. After working through this section you will be able to identify the right formula for a given problem, avoid the most common sign and index errors, and move efficiently between rectangular and polar representations of complex numbers.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiU2NhbiB0aGUgZml2ZSBiYW5kcyB0byBsb2NhdGUgdGhlIGZvcm11bGEgZmFtaWx5IHlvdSBuZWVkIHdpdGhpbiBzZWNvbmRzOyB1c2UgdGhlIHJlZCBjYWxsb3V0IHRvIGF2b2lkIHRoZSBtb3N0IGNvbW1vbiBzaWduIGVycm9yLiIsInN0YW5kYXJkIjoiUmVhZCBlYWNoIGJhbmQgaW4gb3JkZXIgdG8gc2VlIGhvdyB0aGUgZm9ybXVsYSBmYW1pbGllcyByZWxhdGUgYW5kIHdoZXJlIGVhY2ggb25lIGlzIHVzZWQgaW4gcHJvYmxlbS1zb2x2aW5nLiIsInRvcF9zY29yZSI6IlN0dWR5IHRoZSBzdHJ1Y3R1cmFsIHBhdHRlcm4gaW4gZWFjaCBiYW5kIOKAlCBlc3BlY2lhbGx5IHRoZSBjb21wbGV4LW51bWJlciBhbmQgdHJpZyBiYW5kcyDigJQgdG8gaGFuZGxlIHBhcmFtZXRlciB2YXJpYW50cyBhbmQgdHJhcCBxdWVzdGlvbnMuIn0=" style="display:none;"></div>%%KC_END%%
*🎨 Five formula families from B.8 arranged in a single reading path. The red callout flags the most common exam trap in the complex-number family.*
![Illustration](/generated/gptimage2-1777214504130-9883.png)

## Core Idea

The central thread of B.8 is **Euler's formula** and the rectangular-to-polar conversion for complex numbers, because nearly every other formula family in the appendix either feeds into it or depends on it.

Euler's formula states:

$$
e^{j\theta} = \cos\theta + j\sin\theta
$$

From this single identity, the conversion \ \(a + jb = re^{j\theta}\) follows immediately, where \ \(r = \sqrt{a^2 + b^2}\) and \ \(\theta = \tan^{-1}(b/a)\). The power rule \ \((re^{j\theta})^k = r^k e^{jk\theta}\) then makes multiplication and exponentiation of complex numbers trivial.

### EXAM TRAP

The imaginary **part** of \ \(z = a + jb\) is the real number \ \(b\), **not** \ \(jb\). Writing \ \(\text{Im}(z) = jb\) is one of the most penalized errors on exams.

### KEY INSIGHT

The trig identities (e.g., \ \(\sin(x \pm y)\), product-to-sum) are all derivable from Euler's formula by expanding \ \(e^{j(x \pm y)}\), so understanding the complex-number block unlocks the trig block automatically.

---
**📌 Key Takeaways**
- Euler's formula \(e^{j\theta} = \cos\theta + j\sin\theta\) is the central identity linking all formula families.
- The imaginary part of \(a + jb\) is the real number \(b\), never \(jb\) — a frequent exam trap.
- Trig identities, power series, and geometric sums each have a standard structural form to recognize on sight.

*With these reference formulas in hand, the next sections apply them directly to signal analysis — particularly to sinusoids, phasors, and system frequency response.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NCwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo0LCJtYXgiOjV9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImJfOF9hcHBlbmRpeF91c2VmdWxfbWF0aGVtYXRpY2FsX2Zvcm11bGFzX2NvcmUiLCJsYWJlbCI6IkIuOCBBcHBlbmRpeDogVXNlZnVsIE1hdGhlbWF0aWNhbCBGb3JtdWxhcyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImNvcmVfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIHN0YXRlbWVudCBiZXN0IGNhcHR1cmVzIHRoZSBtYWluIGxlYXJuaW5nIGdvYWwgb2YgQi44IEFwcGVuZGl4OiBVc2VmdWwgTWF0aGVtYXRpY2FsIEZvcm11bGFzPyIsIm9wdGlvbnMiOlsiQS4gTWVtb3JpemUgdGhlIGZpbmFsIHJlc3VsdCB3aXRob3V0IGNvbm5lY3RpbmcgaXQgdG8gdGhlIHZpc3VhbCBvciBzdHJ1Y3R1cmFsIG1lYW5pbmciLCJCLiBVbmRlcnN0YW5kIHRoZSBjb3JlIGRlZmluaXRpb24sIHRoZSB2aXN1YWwvc3RydWN0dXJhbCBtZWFuaW5nLCBhbmQgaG93IHRoZSBpZGVhIGFwcGVhcnMgaW4gZXhhbSBxdWVzdGlvbnMiLCJDLiBUcmVhdCB0aGUgdG9waWMgYXMgcHVyZSBzeW1ib2wgbWFuaXB1bGF0aW9uIHdpdGggbm8gY29uY2VwdHVhbCBzdHJ1Y3R1cmUiLCJELiBGb2N1cyBvbmx5IG9uIHRlcm1pbm9sb2d5IGJlY2F1c2UgdGhlIGV4YW0gbmV2ZXIgdGVzdHMgaW50ZXJwcmV0YXRpb24iXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJTdHJvbmcgdW5kZXJzdGFuZGluZyBpbiB0aGlzIHNlY3Rpb24gbWVhbnMgY29ubmVjdGluZyB0aGUgZGVmaW5pdGlvbiwgdGhlIHN0cnVjdHVyZS92aXN1YWwgbWVhbmluZywgYW5kIHRoZSBleGFtLWZhY2luZyBpbnRlcnByZXRhdGlvbi4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJNZW1vcml6YXRpb24gYWxvbmUgdXN1YWxseSBicmVha3Mgb24gdmFyaWFudHMgYW5kIHRyYXAgcXVlc3Rpb25zLiIsIkMiOiJUaGUgc2VjdGlvbiBpcyBtZWFudCB0byBiZSB1bmRlcnN0b29kIHN0cnVjdHVyYWxseSwgbm90IGFzIGVtcHR5IHN5bWJvbCBwdXNoaW5nLiIsIkQiOiJJbnRlcnByZXRhdGlvbiBpcyBleGFjdGx5IHdoYXQgbWFueSBleGFtIHF1ZXN0aW9ucyBwcm9iZS4ifSwiaGludCI6IlBpY2sgdGhlIG9wdGlvbiB0aGF0IGNvbWJpbmVzIG1lYW5pbmcsIHJlcHJlc2VudGF0aW9uLCBhbmQgZXhhbSB1c2UuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImNvcmVfcTIiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkluIDEtMiBzZW50ZW5jZXMsIGV4cGxhaW4gdGhlIGNvcmUgcmVsYXRpb25zaGlwIGEgc3R1ZGVudCBzaG91bGQgbm90aWNlIGZpcnN0IHdoZW4gbGVhcm5pbmcgQi44IEFwcGVuZGl4OiBVc2VmdWwgTWF0aGVtYXRpY2FsIEZvcm11bGFzLiIsImlkZWFsX2Fuc3dlciI6IlRoZSBzdHVkZW50IHNob3VsZCBmaXJzdCBpZGVudGlmeSBFdWxlcidzIGZvcm11bGEgXFwoZV57alxcdGhldGF9ID0gXFxjb3NcXHRoZXRhICsgalxcc2luXFx0aGV0YVxcKSBhcyB0aGUgY2VudHJhbCBzdHJ1Y3R1cmFsIHJlbGF0aW9uc2hpcCwgdGhlbiBjb25uZWN0IGl0IHRvIHRoZSByZWN0YW5ndWxhci10by1wb2xhciBjb252ZXJzaW9uIFxcKGEgKyBqYiA9IHJlXntqXFx0aGV0YX1cXCkgYW5kIHJlY29nbml6ZSBob3cgdGhpcyBpZGVudGl0eSB1bmRlcmxpZXMgdGhlIHRyaWcgaWRlbnRpdGllcyBhbmQgY29tcGxleCBhcml0aG1ldGljIHJ1bGVzIGluIHRoZSBhcHBlbmRpeC4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IG1lbnRpb24gdGhlIGNvcmUgZGVmaW5pdGlvbiBvciBzdHJ1Y3R1cmFsIHJlbGF0aW9uc2hpcCAoRXVsZXIncyBmb3JtdWxhIG9yIHJlY3Rhbmd1bGFyLXRvLXBvbGFyIGNvbnZlcnNpb24pIiwiTXVzdCBjb25uZWN0IGl0IHRvIGEgdmlzdWFsIG9yIHN5bWJvbGljIHJlcHJlc2VudGF0aW9uIChlLmcuLCB0aGUgY29tcGxleCBwbGFuZSwgdGhlIHJpZ2h0LXRyaWFuZ2xlIHNrZXRjaCwgb3IgdGhlIGV4cG9uZW50aWFsIGZvcm0pIiwiTXVzdCBtZW50aW9uIGV4YW0gaW50ZXJwcmV0YXRpb24gb3IgcHJvYmxlbS1zb2x2aW5nIHVzZSAoZS5nLiwgYXZvaWRpbmcgdGhlIEltKHopID0gamIgdHJhcCwgb3IgYXBwbHlpbmcgdGhlIHBvd2VyIHJ1bGUpIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCBzZWVzIHRoZSBtYWluIHRocmVhZCBvZiB0aGUgc2VjdGlvbiDigJQgRXVsZXIncyBmb3JtdWxhIGFzIHRoZSB1bmlmeWluZyBpZGVudGl0eSDigJQgaW5zdGVhZCBvZiB0cmVhdGluZyB0aGUgYXBwZW5kaXggYXMgYW4gdW5yZWxhdGVkIGxpc3Qgb2YgZmFjdHMuIiwiaGludCI6IlN0YXJ0IHdpdGggJ3RoZSBtYWluIHJlbGF0aW9uc2hpcCBpcy4uLicgYW5kIG5hbWUgdGhlIGZvcm11bGEgdGhhdCBjb25uZWN0cyBjb21wbGV4IGV4cG9uZW50aWFscyB0byB0cmlnb25vbWV0cnkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfV19" style="display:none;"></div>%%KC_END%%
