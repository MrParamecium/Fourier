%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJUaGlzIHNlY3Rpb24gaXMgZm9ybXVsYS1kcml2ZW4sIGJ1dCBzdHVkZW50cyB1bmRlcnN0YW5kIGl0IGZhc3RlciB3aGVuIHRoZXkgc2VlIHRpbWUgcmVmbGVjdGlvbiBhbmQgc3ltbWV0cnkuIFVzZSBMYVRlWCBmb3IgdGhlIGV4YWN0IGRlY29tcG9zaXRpb24gZm9ybXVsYXMsIGFuIGludGVyYWN0aXZlIFJlYWN0IENhbnZhcyBkZW1vIGZvciBjaGFuZ2luZyBiZXR3ZWVuIHgodCksIHgoLXQpLCB4X2UodCksIGFuZCB4X28odCksIGFuZCB0aGUgYXZhaWxhYmxlIHRleHRib29rIEZpZ3VyZSAxLjI0IGFzIHRoZSBjYW5vbmljYWwgd29ya2VkLWV4YW1wbGUgdmlzdWFsLiBEbyBub3QgdXNlIEdQVEltYWdlMiBiZWNhdXNlIHRoZSB0ZXh0Ym9vayBhbHJlYWR5IHByb3ZpZGVzIHRoZSBleGFjdCBleGFtLWZhY2luZyBkaWFncmFtIGZvciB0aGUgY2F1c2FsIGV4cG9uZW50aWFsIGV4YW1wbGUuIiwiY3JhbSI6IlVzZSB0aGUgdmlzdWFscyB0byByZWNvZ25pemUgbWlycm9yIHN5bW1ldHJ5LCBzaWduLWZsaXAgc3ltbWV0cnksIGFuZCB0aGUgZGVjb21wb3NpdGlvbiBwYXR0ZXJuIHF1aWNrbHkuIiwic3RhbmRhcmQiOiJVc2UgdGhlIGRlbW8gcGx1cyBGaWd1cmUgMS4yNCB0byBjb25uZWN0IHRoZSBmb3JtdWxhIHRvIG9uZSByZXByZXNlbnRhdGl2ZSBleGFtcGxlLiIsInRvcF9zY29yZSI6IlVzZSB0aGUgdmlzdWFsIGNvbXBhcmlzb24gdG8gY2F0Y2ggc3VidGxlIGVycm9yczogY29uZnVzaW5nIHgoLXQpIHdpdGggLXgodCksIG9yIGZvcmdldHRpbmcgdGhlIGZhY3RvciAxLzIuIiwibWFpbl92aXN1YWxfc3RyYXRlZ3kiOiJMYVRlWC1uYXRpdmUgZm9ybXVsYXMgcGx1cyBSZWFjdCBDYW52YXMgbWFuaXB1bGF0aW9uIHBsdXMgdGV4dGJvb2sgRmlndXJlIDEuMjQgZm9yIHRoZSB3b3JrZWQgZXhhbXBsZS4ifQ==" style="display:none;"></div>%%KC_END%%
# Even and Odd Components of a Signal

> **Section Objective:** Learn how any signal can be split into an even component and an odd component.

## Concepts In This Section

- Even signal symmetry
- Odd signal symmetry
- Even-odd decomposition formula
- Causal exponential example

## 1. Symmetry test: even vs odd signals

Replacing \(t\) by \(-t\) is a **time reflection** — it flips the signal horizontally about \(t = 0\).

- **Even signal:** the reflected signal is identical to the original. \(x(-t) = x(t)\). Example: \(\cos(t)\) is even because \(\cos(-t) = \cos(t)\).
- **Odd signal:** the reflected signal is the negative of the original. \(x(-t) = -x(t)\). Example: \(\sin(t)\) is odd because \(\sin(-t) = -\sin(t)\).

**Symbol meanings:** \(x(t)\) is the original signal, \(x(-t)\) is the time-reflected signal, and \(-x(t)\) is the vertically sign-flipped signal.

#### Exam Trigger
When asked whether a signal is even or odd, substitute \(-t\) and compare the result to \(x(t)\) and \(-x(t)\).

#### Common Misuse
Do not confuse \(x(-t)\) (horizontal reflection) with \(-x(t)\) (vertical sign flip). They are different operations.

$$\text{even: }x(-t)=x(t)\quad \text{odd: }x(-t)=-x(t)$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="interactive_demo" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoZSBkZW1vIHRvIGlkZW50aWZ5IHdoZXRoZXIgYSBncmFwaCBzdGF5cyB0aGUgc2FtZSBvciBmbGlwcyBzaWduIGFmdGVyIHRpbWUgcmVmbGVjdGlvbi4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgZGVtbyB0byBjb25uZWN0IHRoZSBzeW1tZXRyeSBmb3JtdWxhcyB0byB0aGUgdmlzdWFsIGJlaGF2aW9yIG9mIGEgc2lnbmFsLiIsInRvcF9zY29yZSI6IlVzZSB0aGUgZGVtbyB0byB0ZXN0IGJvcmRlcmxpbmUgY2FzZXMgYW5kIGNhdGNoIHgoLXQpIHZlcnN1cyAteCh0KSBjb25mdXNpb24uIn0=" style="display:none;"></div><div class="kc-interactive-demo" data-demo-b64="eyJ0eXBlIjoiaW50ZXJhY3RpdmVfZGVtbyIsInRlYWNoaW5nX3JvbGUiOiJjb25jZXB0X2FuY2hvciIsIm1vZGVfc3BlY2lmaWNfdmlzdWFsX3VzZSI6eyJjcmFtIjoiVXNlIHRoZSBkZW1vIHRvIGlkZW50aWZ5IHdoZXRoZXIgYSBncmFwaCBzdGF5cyB0aGUgc2FtZSBvciBmbGlwcyBzaWduIGFmdGVyIHRpbWUgcmVmbGVjdGlvbi4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgZGVtbyB0byBjb25uZWN0IHRoZSBzeW1tZXRyeSBmb3JtdWxhcyB0byB0aGUgdmlzdWFsIGJlaGF2aW9yIG9mIGEgc2lnbmFsLiIsInRvcF9zY29yZSI6IlVzZSB0aGUgZGVtbyB0byB0ZXN0IGJvcmRlcmxpbmUgY2FzZXMgYW5kIGNhdGNoIHgoLXQpIHZlcnN1cyAteCh0KSBjb25mdXNpb24uIn0sInRpdGxlIjoiVGltZSBSZWZsZWN0aW9uIFN5bW1ldHJ5IFRlc3QiLCJkZXNjcmlwdGlvbiI6IkFuIGludGVyYWN0aXZlIFJlYWN0ICsgQ2FudmFzIGRlbW8gc2hvd2luZyB0aHJlZSBzeW5jaHJvbml6ZWQgcGxvdHM6IHgodCkgaW4gbmF2eSwgeCgtdCkgaW4gbXV0ZWQgdGVhbCwgYW5kIC14KHQpIGluIG11dGVkIHJlZC4gQSBkcm9wZG93biBsZXRzIHRoZSBzdHVkZW50IHNlbGVjdCBmcm9tIGNvcyh0KSwgc2luKHQpLCBhbmQgZV57LXR9dSh0KS4gVHdvIHRvZ2dsZXMgYWxsb3cgb3ZlcmxheWluZyB4KHQpIHdpdGggeCgtdCkgYW5kIG92ZXJsYXlpbmcgeCgtdCkgd2l0aCAteCh0KS4gRm9yIGNvcyh0KSwgdGhlIHgodCkgYW5kIHgoLXQpIG92ZXJsYXkgbWF0Y2hlcyBhbmQgc2hvd3MgdGhlIGxhYmVsICdldmVuJy4gRm9yIHNpbih0KSwgeCgtdCkgbWF0Y2hlcyAteCh0KSBhbmQgc2hvd3MgJ29kZCcuIEZvciBlXnstdH11KHQpLCBuZWl0aGVyIG92ZXJsYXkgbWF0Y2hlcyBhbmQgc2hvd3MgJ25laXRoZXIgYmVmb3JlIGRlY29tcG9zaXRpb24nLiBBeGVzIGFyZSBsYWJlbGVkIHQgYW5kIGFtcGxpdHVkZS4iLCJub3RlIjoiUmVmbGVjdGlvbiBjaGFuZ2VzIFxcKHRcXCkgdG8gXFwoLXRcXCk7IHNpZ24gZmxpcCBjaGFuZ2VzIFxcKHhcXCkgdG8gXFwoLXhcXCkuIiwic2lnbmFscyI6WyJjb3ModCkiLCJzaW4odCkiLCJlXnstdH11KHQpIl0sInRvZ2dsZXMiOlsiT3ZlcmxheSB4KHQpIHdpdGggeCgtdCkiLCJPdmVybGF5IHgoLXQpIHdpdGggLXgodCkiXSwiY29sb3Jfc2NoZW1lIjp7InhfdCI6Im5hdnkiLCJ4X25lZ190IjoibXV0ZWQgdGVhbCIsIm5lZ194X3QiOiJtdXRlZCByZWQifX0="></div>%%KC_END%%

## 2. Every signal has an even part and an odd part

Even-odd decomposition is **not** asking whether the original signal is even or odd. Instead, it guarantees that **any** signal — symmetric or not — can be rebuilt by adding one even component and one odd component.

The idea is straightforward:
- **Even part:** average \(x(t)\) with its time reflection \(x(-t)\).
- **Odd part:** subtract the reflection from \(x(t)\) and halve the result.

This is useful in exams because it converts a non-symmetric signal into two symmetry-controlled pieces, each of which is easier to analyze.

The exact formula appears in the next block.

## 3. Worked example: causal exponential signal

**Eq. (1.17)** decomposes any signal into two parts:

- **Even component:** \(x_e(t) = \dfrac{1}{2}\big[x(t)+x(-t)\big]\) — unchanged when \(t\) is replaced by \(-t\).
- **Odd component:** \(x_o(t) = \dfrac{1}{2}\big[x(t)-x(-t)\big]\) — changes sign when \(t\) is replaced by \(-t\).

**Symbol meanings:** \(x(t)\) is the original signal, \(x(-t)\) is its time-reflected version, \(x_e(t)\) is symmetric about \(t=0\), and \(x_o(t)\) is antisymmetric about \(t=0\).

**When to use it:** any time a problem asks for the even and odd components of a signal.

#### Exam Trigger
Phrases like "find the even and odd components" or "decompose \(x(t)\)" call for Eq. (1.17) directly.

#### Common Misuse
Do not forget the factor \(\tfrac{1}{2}\). Writing \(x(t)+x(-t)\) without halving gives twice the even component, not the even component itself.

$$x(t)=\frac{1}{2}\big[x(t)+x(-t)\big]+\frac{1}{2}\big[x(t)-x(-t)\big]\quad\text{(1.17)}$$

## 3. Worked example: causal exponential signal

For \(x(t) = e^{-at}u(t)\), the time-reflected signal is obtained by substituting \(-t\) everywhere:

$$x(-t) = e^{-a(-t)}u(-t) = e^{at}u(-t)$$

- \(u(t)\) turns the signal **on for \(t > 0\)**; \(u(-t)\) turns the reflected version **on for \(t < 0\)**.
- The even component \(x_e(t)\) averages the right-side decaying exponential with its left-side mirror, producing a shape that is **symmetric about \(t = 0\)**.

#### Common Trap
When computing \(x(-t)\), the exponent \(-a(-t)\) becomes \(+at\), not \(-at\). Do not leave the exponent unchanged.

$$x_e(t)=\frac{1}{2}\big[e^{-at}u(t)+e^{at}u(-t)\big]$$

$$x_o(t)=\frac{1}{2}\big[e^{-at}u(t)-e^{at}u(-t)\big]$$
*The odd component \(x_o(t)\) uses the same reflected signal but **subtracts** it instead of adding it.

- For \(t > 0\): \(x_o(t) = \tfrac{1}{2}e^{-at}\) (positive, decaying).
- For \(t < 0\): \(x_o(t) = -\tfrac{1}{2}e^{at}\) (negative, growing toward zero).

This makes \(x_o(t)\) **antisymmetric** about \(t = 0\). When you add \(x_e(t) + x_o(t)\), the left-side terms cancel and the right-side terms double, restoring the original causal signal \(x(t) = e^{-at}u(t)\).

#### Exam Note
If your odd component does not appear antisymmetric, check the minus sign in front of the reflected term \(e^{at}u(-t)\).*

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="example_support" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoZSB0aHJlZSBwbG90cyB0byBtZW1vcml6ZSB0aGUgc2hhcGUgcGF0dGVybiBvZiB0aGUgZGVjb21wb3NpdGlvbi4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgZmlndXJlIHRvIHZlcmlmeSB0aGUgcmVwcmVzZW50YXRpdmUgd29ya2VkIGV4YW1wbGUgdmlzdWFsbHkuIiwidG9wX3Njb3JlIjoiVXNlIHRoZSBmaWd1cmUgdG8gY2hlY2sgdGhlIHNpZ24gYW5kIHN5bW1ldHJ5IG9mIGVhY2ggY29tcG9uZW50IHNlcGFyYXRlbHkuIn0=" style="display:none;"></div>%%KC_END%%
![Figure 1.24](/figures/page-094-figure_1_24-1.png)
*Figure 1.24 shows how the causal exponential \(x(t) = e^{-at}u(t)\) splits into its even component \(x_e(t)\) and odd component \(x_o(t)\).*
<div class="lesson-figure-description">The figure contains three stacked time-domain plots, each with a horizontal axis labeled t and a vertical axis centered at t=0. Plot (a) shows x(t): zero for t&lt;0 and a decaying exponential e^{-at} starting at value 1 at t=0. Plot (b) shows x_e(t): a symmetric double-sided exponential with peak 1/2 at the origin, labeled (1/2)e^{at} for t&lt;0 and (1/2)e^{-at} for t&gt;0, illustrating even symmetry. Plot (c) shows x_o(t): an antisymmetric shape equal to (1/2)e^{-at} for t&gt;0 and -(1/2)e^{at} for t&lt;0, illustrating odd symmetry. Students should notice that x_e(t) is a perfect mirror image about t=0, x_o(t) has opposite signs on each side, and their sum reconstructs the original one-sided signal x(t).</div>

### Worked Example: \(t u(t)\) and \(\cos(\omega_0 t)\)

Example 1: \(x(t)=t u(t)\).

For \(t>0\), \(x(t)=t\); for \(t<0\), \(x(t)=0\). Also \(x(-t)=(-t)u(-t)\).

$$x_e(t)=\frac{1}{2}[t u(t)-t u(-t)]=\frac{|t|}{2}$$
$$x_o(t)=\frac{1}{2}[t u(t)+t u(-t)]=\frac{t}{2}$$

Check: for \(t<0\), \(x_e+x_o=(-t/2)+(t/2)=0\); for \(t>0\), \(x_e+x_o=t\).

Example 2: \(x(t)=\cos(\omega_0 t)\).

Since \(\cos(-\omega_0 t)=\cos(\omega_0 t)\), it is already even:

$$x_e(t)=\cos(\omega_0 t),\qquad x_o(t)=0$$

#### Exam Trap

A causal signal can still have a nonzero even component. Do not "keep the right half" and call that the even part.

---
**📌 Key Takeaways**
- **Even test:** \(x(-t) = x(t)\); **Odd test:** \(x(-t) = -x(t)\). Substitute \(-t\) and compare.
- **Decomposition (Eq. 1.17):** \(x(t) = \dfrac{1}{2}[x(t)+x(-t)] + \dfrac{1}{2}[x(t)-x(-t)]\); the first bracket is \(x_e(t)\), the second is \(x_o(t)\). Never forget the factor \(\tfrac{1}{2}\).
- **Causal exponential even part:** \(x_e(t) = \dfrac{1}{2}\big[e^{-at}u(t)+e^{at}u(-t)\big]\) — symmetric about \(t=0\).
- **Causal exponential odd part:** \(x_o(t) = \dfrac{1}{2}\big[e^{-at}u(t)-e^{at}u(-t)\big]\) — antisymmetric; \(x_e(t)+x_o(t)\) restores \(x(t)\).

*Next, use symmetry to simplify signal calculations instead of doing unnecessary work.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImV2ZW5fb2RkX3N5bW1ldHJ5X3Rlc3QiLCJsYWJlbCI6IkV2ZW4gYW5kIG9kZCBzeW1tZXRyeSB0ZXN0cyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBzaWduYWwgc2F0aXNmaWVzIFxcKHgoLXQpID0geCh0KVxcKS4gV2hhdCBjYW4geW91IGNvbmNsdWRlPyIsIm9wdGlvbnMiOlsiQS4gVGhlIHNpZ25hbCBpcyBldmVuLiIsIkIuIFRoZSBzaWduYWwgaXMgb2RkLiIsIkMuIFRoZSBzaWduYWwgaXMgY2F1c2FsLiIsIkQuIFRoZSBzaWduYWwgaXMgemVybyBmb3IgXFwodCA8IDBcXCkuIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiQW4gZXZlbiBzaWduYWwgaXMgdW5jaGFuZ2VkIHdoZW4gdGltZSBpcyByZWZsZWN0ZWQgZnJvbSBcXCh0XFwpIHRvIFxcKC10XFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6Ik9kZCBzeW1tZXRyeSByZXF1aXJlcyBcXCh4KC10KSA9IC14KHQpXFwpLCBub3QgXFwoeCgtdCkgPSB4KHQpXFwpLiIsIkMiOiJDYXVzYWxpdHkgaXMgYWJvdXQgYmVpbmcgemVybyBiZWZvcmUgXFwodCA9IDBcXCksIG5vdCBtaXJyb3Igc3ltbWV0cnkuIiwiRCI6IkJlaW5nIHplcm8gZm9yIFxcKHQgPCAwXFwpIGRlc2NyaWJlcyBhIGNhdXNhbC1zdHlsZSBzaWduYWwsIG5vdCBldmVuIHN5bW1ldHJ5LiJ9LCJoaW50IjoiQXNrIHdoZXRoZXIgcmVmbGVjdGlvbiBsZWF2ZXMgdGhlIHNpZ25hbCB1bmNoYW5nZWQgb3IgZmxpcHMgaXRzIHNpZ24uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AxX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBzdGF0ZW1lbnQgY29ycmVjdGx5IGRlc2NyaWJlcyBhbiBvZGQgc2lnbmFsPyIsIm9wdGlvbnMiOlsiQS4gXFwoeCgtdCkgPSB4KHQpXFwpIiwiQi4gXFwoeCgtdCkgPSAteCh0KVxcKSIsIkMuIFxcKHgodCkgPSAwXFwpIGZvciBhbGwgXFwodCA8IDBcXCkiLCJELiBcXCh4KHQpICsgeCgtdCkgPSB4KHQpXFwpIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiT2RkIHN5bW1ldHJ5IG1lYW5zIHJlZmxlY3RpbmcgdGltZSBwcm9kdWNlcyB0aGUgbmVnYXRpdmUgb2YgdGhlIG9yaWdpbmFsIHNpZ25hbC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGF0IGlzIHRoZSBldmVuIHN5bW1ldHJ5IGNvbmRpdGlvbi4iLCJDIjoiVGhhdCBkZXNjcmliZXMgYSBvbmUtc2lkZWQgb3IgY2F1c2FsLXR5cGUgc2lnbmFsLCBub3Qgb2RkIHN5bW1ldHJ5LiIsIkQiOiJUaGlzIGlzIG5vdCB0aGUgb2RkIHN5bW1ldHJ5IGRlZmluaXRpb24gYW5kIGlzIGdlbmVyYWxseSBmYWxzZS4ifSwiaGludCI6Ik9kZCBzeW1tZXRyeSBwYWlycyBob3Jpem9udGFsIHJlZmxlY3Rpb24gd2l0aCBhIHZlcnRpY2FsIHNpZ24gZmxpcC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImRlY29tcG9zaXRpb25fZm9ybXVsYSIsImxhYmVsIjoiRXZlbi1vZGQgZGVjb21wb3NpdGlvbiBmb3JtdWxhIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBmb3JtdWxhIGdpdmVzIHRoZSBldmVuIGNvbXBvbmVudCBvZiBhbnkgc2lnbmFsIFxcKHgodClcXCk/Iiwib3B0aW9ucyI6WyJBLiBcXCh4X2UodCkgPSB4KHQpICsgeCgtdClcXCkiLCJCLiBcXCh4X2UodCkgPSBcXGRmcmFjezF9ezJ9W3godCkgKyB4KC10KV1cXCkiLCJDLiBcXCh4X2UodCkgPSBcXGRmcmFjezF9ezJ9W3godCkgLSB4KC10KV1cXCkiLCJELiBcXCh4X2UodCkgPSB4KHQpIC0geCgtdClcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJUaGUgZXZlbiBjb21wb25lbnQgaXMgdGhlIGF2ZXJhZ2Ugb2YgdGhlIHNpZ25hbCBhbmQgaXRzIHRpbWUgcmVmbGVjdGlvbi4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGlzIG1pc3NlcyB0aGUgcmVxdWlyZWQgZmFjdG9yIFxcKFxcdGZyYWN7MX17Mn1cXCkuIiwiQyI6IlRoaXMgaXMgdGhlIG9kZCBjb21wb25lbnQsIG5vdCB0aGUgZXZlbiBjb21wb25lbnQuIiwiRCI6IlRoaXMgbWlzc2VzIHRoZSBmYWN0b3IgXFwoXFx0ZnJhY3sxfXsyfVxcKSBhbmQgdXNlcyB0aGUgb2RkLWNvbXBvbmVudCBzdWJ0cmFjdGlvbiBwYXR0ZXJuLiJ9LCJoaW50IjoiRXZlbiBwYXJ0IG1lYW5zIGF2ZXJhZ2Ugd2l0aCB0aGUgcmVmbGVjdGVkIHNpZ25hbC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgc3R1ZGVudCB3cml0ZXMgXFwoeF9vKHQpID0gXFxkZnJhY3sxfXsyfVt4KHQpICsgeCgtdCldXFwpLiBXaHkgaXMgdGhpcyB3cm9uZz8iLCJvcHRpb25zIjpbIkEuIFRoZSBwbHVzIHNpZ24gbWFrZXMgdGhlIGV4cHJlc3Npb24gZXZlbiwgbm90IG9kZC4iLCJCLiBUaGUgZmFjdG9yIFxcKFxcdGZyYWN7MX17Mn1cXCkgc2hvdWxkIG5ldmVyIGFwcGVhci4iLCJDLiBcXCh4KC10KVxcKSBpcyBub3QgYWxsb3dlZCBpbiBkZWNvbXBvc2l0aW9uIGZvcm11bGFzLiIsIkQuIE9kZCBjb21wb25lbnRzIG11c3QgYWx3YXlzIGJlIGNhdXNhbC4iXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJBZGRpbmcgXFwoeCh0KVxcKSBhbmQgXFwoeCgtdClcXCkgY3JlYXRlcyB0aGUgZXZlbiBjb21wb25lbnQuIFRoZSBvZGQgY29tcG9uZW50IHVzZXMgc3VidHJhY3Rpb24uIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiVGhlIGZhY3RvciBcXChcXHRmcmFjezF9ezJ9XFwpIGlzIHJlcXVpcmVkIGluIGJvdGggY29tcG9uZW50cy4iLCJDIjoiXFwoeCgtdClcXCkgaXMgZXNzZW50aWFsIGJlY2F1c2UgZGVjb21wb3NpdGlvbiBjb21wYXJlcyB0aGUgc2lnbmFsIHdpdGggaXRzIHJlZmxlY3Rpb24uIiwiRCI6Ik9kZCBzeW1tZXRyeSBpcyB1bnJlbGF0ZWQgdG8gY2F1c2FsaXR5LiJ9LCJoaW50IjoiUGx1cyBjcmVhdGVzIHN5bW1ldHJ5OyBtaW51cyBjcmVhdGVzIGFudGlzeW1tZXRyeS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImNhdXNhbF9leHBvbmVudGlhbF9leGFtcGxlIiwibGFiZWwiOiJDYXVzYWwgZXhwb25lbnRpYWwgZGVjb21wb3NpdGlvbiIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciBcXCh4KHQpID0gZV57LWF0fXUodClcXCksIHdoYXQgaXMgXFwoeCgtdClcXCk/Iiwib3B0aW9ucyI6WyJBLiBcXChlXnstYXR9dSgtdClcXCkiLCJCLiBcXChlXnthdH11KC10KVxcKSIsIkMuIFxcKC1lXnstYXR9dSh0KVxcKSIsIkQuIFxcKGVee2F0fXUodClcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJTdWJzdGl0dXRlIFxcKC10XFwpIGZvciBldmVyeSBcXCh0XFwpOiBcXChlXnstYSgtdCl9XFwpIGJlY29tZXMgXFwoZV57YXR9XFwpLCBhbmQgXFwodSh0KVxcKSBiZWNvbWVzIFxcKHUoLXQpXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSB1bml0IHN0ZXAgaXMgcmVmbGVjdGVkLCBidXQgdGhlIGV4cG9uZW50aWFsIGV4cG9uZW50IHdhcyBub3QgdXBkYXRlZCBjb3JyZWN0bHkuIiwiQyI6IlRpbWUgcmVmbGVjdGlvbiBpcyBub3QgdGhlIHNhbWUgYXMgbXVsdGlwbHlpbmcgdGhlIHdob2xlIHNpZ25hbCBieSBcXCgtMVxcKS4iLCJEIjoiVGhlIGV4cG9uZW50aWFsIGNoYW5nZWQgY29ycmVjdGx5LCBidXQgdGhlIHVuaXQgc3RlcCB3YXMgbm90IHJlZmxlY3RlZC4ifSwiaGludCI6IlJlcGxhY2UgZXZlcnkgXFwodFxcKSBieSBcXCgtdFxcKSwgbm90IGp1c3QgdGhlIFxcKHUodClcXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoidmlzdWFsX2ludGVycHJldGF0aW9uIiwibGFiZWwiOiJWaXN1YWwgaW50ZXJwcmV0YXRpb24gb2YgeF9lKHQpIGFuZCB4X28odCkiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNF9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiT2JzZXJ2ZSB0aGUgZGVjb21wb3NpdGlvbiBwbG90cyBmb3IgXFwoeCh0KSA9IGVeey1hdH11KHQpXFwpLiBXaGljaCB2aXN1YWwgZGVzY3JpcHRpb24gbWF0Y2hlcyBcXCh4X28odClcXCk/Iiwib3B0aW9ucyI6WyJBLiBJdCBpcyBpZGVudGljYWwgb24gdGhlIGxlZnQgYW5kIHJpZ2h0IHNpZGVzIG9mIFxcKHQgPSAwXFwpLiIsIkIuIEl0IGlzIHBvc2l0aXZlIG9uIHRoZSByaWdodCBhbmQgbmVnYXRpdmUgd2l0aCBtYXRjaGluZyBzaGFwZSBvbiB0aGUgbGVmdC4iLCJDLiBJdCBpcyB6ZXJvIGZvciBhbGwgXFwodCA8IDBcXCkuIiwiRC4gSXQgaXMgYWx3YXlzIG5vbm5lZ2F0aXZlLiJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBvZGQgY29tcG9uZW50IGlzIGFudGlzeW1tZXRyaWM6IHRoZSBsZWZ0IHNpZGUgaXMgdGhlIG5lZ2F0aXZlIG1pcnJvciBvZiB0aGUgcmlnaHQgc2lkZS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJUaGF0IGRlc2NyaWJlcyBldmVuIHN5bW1ldHJ5LCB3aGljaCBiZWxvbmdzIHRvIFxcKHhfZSh0KVxcKS4iLCJDIjoiVGhlIG9yaWdpbmFsIGNhdXNhbCBzaWduYWwgaXMgemVybyBmb3IgXFwodCA8IDBcXCksIGJ1dCB0aGUgb2RkIGNvbXBvbmVudCBpcyBnZW5lcmFsbHkgbm90LiIsIkQiOiJUaGUgb2RkIGNvbXBvbmVudCBoYXMgbmVnYXRpdmUgdmFsdWVzIG9uIG9uZSBzaWRlIG9mIHRoZSBvcmlnaW4uIn0sImhpbnQiOiJPZGQgbWVhbnMgbWlycm9yZWQgc2hhcGUgd2l0aCBvcHBvc2l0ZSBzaWduLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJib29rX2ZpZ3VyZV9vcl9kZW1vX29ic2VydmF0aW9uIiwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwNF9xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiSW4gb25lIG9yIHR3byBzZW50ZW5jZXMsIGV4cGxhaW4gd2h5IFxcKHhfZSh0KSArIHhfbyh0KVxcKSByZWNvbnN0cnVjdHMgdGhlIG9yaWdpbmFsIFxcKHgodClcXCkuIiwiaWRlYWxfYW5zd2VyIjoiVGhlIHJlZmxlY3RlZCB0ZXJtcyBjYW5jZWwgd2hlbiB0aGUgdHdvIGNvbXBvbmVudHMgYXJlIGFkZGVkOiBcXChcXHRmcmFjezF9ezJ9W3godCkreCgtdCldICsgXFx0ZnJhY3sxfXsyfVt4KHQpLXgoLXQpXSA9IHgodClcXCkuIFRoZSBldmVuIGFuZCBvZGQgcGFydHMgYXJlIGRlc2lnbmVkIHRvIHN1bSBiYWNrIHRvIHRoZSBvcmlnaW5hbCBzaWduYWwuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBtZW50aW9uIHRoYXQgdGhlIFxcKHgoLXQpXFwpIHRlcm1zIGNhbmNlbCIsIk11c3QgaW5jbHVkZSBvciBkZXNjcmliZSB0aGUgZmFjdG9yIFxcKFxcdGZyYWN7MX17Mn1cXCkgY29ycmVjdGx5IiwiTXVzdCBzdGF0ZSB0aGF0IHRoZSBzdW0gZXF1YWxzIHRoZSBvcmlnaW5hbCBcXCh4KHQpXFwpIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCB1bmRlcnN0YW5kcyBkZWNvbXBvc2l0aW9uIGFsZ2VicmEgaW5zdGVhZCBvZiBqdXN0IG1lbW9yaXppbmcgdHdvIGZvcm11bGFzLiIsImhpbnQiOiJBZGQgdGhlIHR3byBicmFja2V0cyBhbmQgd2F0Y2ggd2hhdCBoYXBwZW5zIHRvIFxcKCt4KC10KVxcKSBhbmQgXFwoLXgoLXQpXFwpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
