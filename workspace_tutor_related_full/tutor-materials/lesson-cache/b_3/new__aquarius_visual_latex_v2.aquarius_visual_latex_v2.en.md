%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJVc2UgdGhlIHRleHRib29rJ3MgRmlnLiBCLjEwIGJlY2F1c2UgaXQgaXMgdGhlIGNhbm9uaWNhbCBleGFtLWZhY2luZyBza2V0Y2ggZm9yIHRpbWUgY29uc3RhbnRzLCB0aGVuIGFkZCBhbiBpbnRlcmFjdGl2ZSBleHBvbmVudGlhbCBza2V0Y2hlciBiZWNhdXNlIHN0dWRlbnRzIHVuZGVyc3RhbmQgdGhlIHJvbGUgb2YgYSBmYXN0ZXIgd2hlbiB0aGV5IGNhbiBjaGFuZ2UgaXQgYW5kIHNlZSB0aGUgY3VydmUgY29tcHJlc3Mgb3Igc3RyZXRjaC4iLCJjcmFtIjoiVXNlIHZpc3VhbHMgdG8gbWVtb3JpemUgdGhlIHNrZXRjaCBsYW5kbWFya3M6IHN0YXJ0IGF0IDEsIGhpdCAwLjM3IGFmdGVyIG9uZSB0aW1lIGNvbnN0YW50LCBoaXQgMC4xMzUgYWZ0ZXIgdHdvLiIsInN0YW5kYXJkIjoiVXNlIHRoZSB0ZXh0Ym9vayBmaWd1cmUgcGx1cyBvbmUgaW50ZXJhY3RpdmUgZGVtbyB0byBjb25uZWN0IHRoZSBmb3JtdWxhIFQgPSAxL2Egd2l0aCB0aGUgdmlzaWJsZSBjdXJ2ZSBzaGFwZS4iLCJ0b3Bfc2NvcmUiOiJVc2UgdmlzdWFscyB0byBub3RpY2UgdGhhdCB0aGUgMzclIGRyb3AgaGFwcGVucyBvdmVyIGFueSBpbnRlcnZhbCBvZiBsZW5ndGggMS9hLCBub3Qgb25seSBmcm9tIHQgPSAwLiJ9" style="display:none;"></div>%%KC_END%%
# B.3 Sketching Signals

> **Section Objective:** Learn how to sketch exponential signals quickly using growth/decay direction and the time constant.

## Concepts In This Section

- Monotonic exponential signals
- Decaying versus growing exponentials
- Time constant
- Quick sketch landmarks

## 1. Recognize Monotonic Exponentials

A **monotonic exponential** moves in one direction only — it never oscillates or reverses. This makes it one of the simplest signals to sketch once you know the direction.

For a positive constant \(a\):

- \(e^{-at}\) **decays**: as \(t\) increases, the exponent becomes more negative, so the signal falls toward 0.
- \(e^{at}\) **grows**: as \(t\) increases, the exponent becomes more positive, so the signal rises without bound.

**Representative example:** \(e^{-2t}\) decays faster than \(e^{-t}\) because the multiplier 2 makes the exponent become negative more quickly.

### EXAM NOTE

The **sign** in the exponent tells you the direction; the **size** of \(a\) tells you how fast the change happens.

## 2. Use the time constant to sketch quickly

This is the **standard decaying exponential**.

- \(x(t)\): signal value at time \(t\)
- \(t\): time (horizontal axis)
- \(a\): positive decay rate — larger \(a\) means faster decay

**When to use it:** whenever the waveform starts high and moves toward 0 as \(t\) increases.

**Exam trigger:** a signal that loses a fixed *fraction* of its value over equal time intervals.

#### Common Misuse
A larger \(a\) does **not** mean a taller starting value. The signal always starts at \(x(0) = e^0 = 1\). Larger \(a\) only makes the decay faster.

$$x(t) = e^{-at}$$

$$a > 0$$

## 3. Why the same percentage drop repeats

This is the **standard growing exponential**.

- \(a\): positive growth rate — larger \(a\) means faster growth

**When to use it:** whenever the waveform increases by a constant factor over equal time intervals.

**Exam trigger:** language such as "grows exponentially" or "increases by a factor \(e\) every fixed interval."

#### Common Misuse
Do not confuse \(e^{at}\) with \(e^{-at}\). The missing minus sign completely reverses the sketch direction — a decaying curve becomes a growing one.

$$x(t) = e^{at}$$

$$a > 0$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="book_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiRm9jdXMgb24gdGhlIHRocmVlIHNrZXRjaCBwb2ludHM6IDEsIDAuMzcsIGFuZCAwLjEzNS4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgZmlndXJlIHRvIGNvbm5lY3QgdGltZSBjb25zdGFudCBsYWJlbHMgd2l0aCB0aGUgY3VydmUgc2hhcGUuIiwidG9wX3Njb3JlIjoiTm90aWNlIHRoYXQgY2hhbmdpbmcgYSBjaGFuZ2VzIHRoZSBob3Jpem9udGFsIHNwYWNpbmcgb2YgdGhlIHNhbWUgcGVyY2VudGFnZSBkcm9wcy4ifQ==" style="display:none;"></div>%%KC_END%%
![Fig. B.10](/figures/page-021-fig__b_10-1.png)
*Fig. B.10 shows how a decaying exponential reaches \(1/e\) after one time constant and \(1/e^2\) after two time constants.*
<div class="lesson-figure-description">The figure contains two coordinate plots, each with a horizontal axis labeled \(t\) and a vertical amplitude axis. Both plots show a curve that starts at value 1 at \(t = 0\) and decreases monotonically toward 0. The left plot is the general case \(e^{-at}u(t)\): it marks the amplitude \(1/e \approx 0.37\) at \(t = 1/a\) and \(1/e^2 \approx 0.135\) at \(t = 2/a\), making the time-constant relationship explicit. The right plot shows the specific case \(e^{-2t}u(t)\) with \(a = 2\): the same amplitude landmarks 0.37 and 0.135 now occur at \(t = 0.5\) and \(t = 1\) because the time constant is \(T = 1/2 = 0.5\). Students should notice that a larger \(a\) compresses the landmarks closer to the origin.</div>

## 2. Use the Time Constant to Sketch Quickly

\(T\) is the **time constant** of \(e^{-at}\). It is the time needed for the signal to drop to \(1/e \approx 0.37\) of its current value.

- \(T\): time constant (seconds)
- \(a\): positive decay rate
- \(1/e \approx 0.368\): the fraction remaining after one time constant

**Representative example:** For \(x(t) = e^{-2t}\), we have \(a = 2\), so \(T = 1/2 = 0.5\).

| Time | Value |
|------|-------|
| \(t = 0\) | \(x = 1\) |
| \(t = 0.5\) | \(x = 1/e \approx 0.37\) |
| \(t = 1\) | \(x = 1/e^2 \approx 0.135\) |

#### Common Misuse
The signal does **not** become zero after one time constant. It only becomes smaller by a factor of \(1/e\). The curve approaches zero asymptotically and never actually reaches it.

$$T = \frac{1}{a}$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="interactive_demo" data-teaching-role="example_support" data-visual-use-b64="eyJjcmFtIjoiRHJhZyBhIHRvIHNlZSBob3cgdGhlIHNrZXRjaCBsYW5kbWFya3MgbW92ZSwgdGhlbiBtZW1vcml6ZSB0aGUgbGFuZG1hcmsgcGF0dGVybi4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgc2xpZGVyIHRvIGNvbm5lY3QgYSwgVCA9IDEvYSwgYW5kIHRoZSBjdXJ2ZSBzcGFjaW5nLiIsInRvcF9zY29yZSI6IlRlc3QgdGhhdCBldmVyeSBpbnRlcnZhbCBvZiBsZW5ndGggVCBnaXZlcyB0aGUgc2FtZSBmYWN0b3IgZHJvcCwgZXZlbiBpZiB0aGUgaW50ZXJ2YWwgZG9lcyBub3Qgc3RhcnQgYXQgemVyby4ifQ==" style="display:none;"></div><div class="kc-interactive-demo" data-demo-b64="eyJ0eXBlIjoiaW50ZXJhY3RpdmVfZGVtbyIsImRlbW9faWQiOiJleHBvbmVudGlhbF90aW1lX2NvbnN0YW50X3NrZXRjaGVyIiwidGVhY2hpbmdfcm9sZSI6ImV4YW1wbGVfc3VwcG9ydCIsIm1vZGVfc3BlY2lmaWNfdmlzdWFsX3VzZSI6eyJjcmFtIjoiRHJhZyBhIHRvIHNlZSBob3cgdGhlIHNrZXRjaCBsYW5kbWFya3MgbW92ZSwgdGhlbiBtZW1vcml6ZSB0aGUgbGFuZG1hcmsgcGF0dGVybi4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgc2xpZGVyIHRvIGNvbm5lY3QgYSwgVCA9IDEvYSwgYW5kIHRoZSBjdXJ2ZSBzcGFjaW5nLiIsInRvcF9zY29yZSI6IlRlc3QgdGhhdCBldmVyeSBpbnRlcnZhbCBvZiBsZW5ndGggVCBnaXZlcyB0aGUgc2FtZSBmYWN0b3IgZHJvcCwgZXZlbiBpZiB0aGUgaW50ZXJ2YWwgZG9lcyBub3Qgc3RhcnQgYXQgemVyby4ifSwic3BlYyI6eyJmcmFtZXdvcmsiOiJyZWFjdF9jYW52YXMiLCJ0aXRsZSI6IkV4cG9uZW50aWFsIFRpbWUgQ29uc3RhbnQgU2tldGNoZXIiLCJwbG90Ijp7InNpZ25hbCI6IngodCkgPSBlXnstYXR9IHUodCkiLCJ0X3JhbmdlIjpbMCw0XSwieV9yYW5nZSI6WzAsMS4xXX0sImNvbnRyb2xzIjpbeyJpZCI6ImFfc2xpZGVyIiwidHlwZSI6InNsaWRlciIsImxhYmVsIjoiRGVjYXkgcmF0ZSBhIiwibWluIjowLjI1LCJtYXgiOjQsInN0ZXAiOjAuMDUsImRlZmF1bHQiOjJ9LHsiaWQiOiJzaG93X2dyb3dpbmciLCJ0eXBlIjoidG9nZ2xlIiwibGFiZWwiOiJTaG93IGdyb3dpbmcgZXhwb25lbnRpYWwgZV57YXR9IiwiZGVmYXVsdCI6ZmFsc2V9XSwiZGVyaXZlZF9kaXNwbGF5IjpbeyJsYWJlbCI6IlRpbWUgY29uc3RhbnQgVCA9IDEvYSIsImZvcm11bGEiOiJUID0gMS9hIn1dLCJndWlkZV9saW5lcyI6eyJ2ZXJ0aWNhbF9kYXNoZWQiOlsidCA9IFQiLCJ0ID0gMlQiXSwiaG9yaXpvbnRhbF9kYXNoZWQiOlsieSA9IDEvZSDiiYggMC4zNyIsInkgPSAxL2VeMiDiiYggMC4xMzUiXSwibGFiZWxlZF9wb2ludHMiOlsiKFQsIDAuMzcpIiwiKDJULCAwLjEzNSkiXX0sImdyb3dpbmdfbW9kZSI6eyJzaWduYWwiOiJ4KHQpID0gZV57YXR9IHUodCkiLCJub3RlIjoiR3Jvd2luZyBleHBvbmVudGlhbHMgaW5jcmVhc2UgYnkgYSBmYWN0b3IgZSBldmVyeSBUIHNlY29uZHMuIn0sInN0eWxlIjp7ImJhY2tncm91bmQiOiJ3aGl0ZSIsImN1cnZlX2NvbG9yIjoibmF2eSIsImd1aWRlX2xpbmVfY29sb3IiOiJtdXRlZCB0ZWFsIiwid2FybmluZ19jb2xvciI6Im11dGVkIHJlZCIsIndhcm5pbmdfbm90ZSI6IlRoZSBjdXJ2ZSBuZXZlciByZWFjaGVzIHplcm8g4oCUIGl0IG9ubHkgYXBwcm9hY2hlcyBpdCBhc3ltcHRvdGljYWxseS4ifSwib2JzZXJ2YXRpb25fcHJvbXB0IjoiV2hlbiBhIGluY3JlYXNlcywgZG9lcyB0aGUgY3VydmUgYmVjb21lIHdpZGVyIG9yIG5hcnJvd2VyPyJ9fQ=="></div>%%KC_END%%

## 3. Why the Same Percentage Drop Repeats

The time constant is not just a trick that works at \(t = 0\). It works **anywhere** on the curve.

If two instants \(t_1\) and \(t_2\) are separated by exactly one time constant — that is, \(t_2 - t_1 = T = 1/a\) — then the ratio of the later value to the earlier value is always \(1/e\), regardless of where on the curve you start.

**Quick example:** Suppose the curve has value 0.50 at some time \(t_1\). One time constant later at \(t_2 = t_1 + T\), the value is:

$$\frac{0.50}{e} \approx 0.184$$

not \(0.50 - 0.37 = 0.13\).

### EXAM TRAP

Time constants **multiply** by \(\approx 0.37\). They do **not** subtract 0.37. The drop is always a multiplicative factor, never a fixed subtracted amount.

$$\frac{e^{-at_2}}{e^{-at_1}} = e^{-a(t_2 - t_1)} = \frac{1}{e} \quad \text{when} \quad t_2 - t_1 = \frac{1}{a}$$

---
**📌 Key Takeaways**
- Decaying signal \(x(t) = e^{-at}\) falls toward 0; growing signal \(x(t) = e^{at}\) rises — the exponent sign decides direction.
- Time constant \(T = 1/a\): sketch landmarks are 1 at \(t=0\), then 0.37 at \(t=T\), then 0.135 at \(t=2T\).
- Larger \(a\) means faster decay and a smaller \(T\) — the curve compresses horizontally, not vertically.
- The ratio \(e^{-at_2}/e^{-at_1} = 1/e\) whenever \(t_2 - t_1 = 1/a\) — the 37% drop repeats over every interval of length \(T\).

- Core formula: \(a > 0\).
*In the next section, we will use these sketching habits for more complicated signal shapes.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImRlY2F5X3ZzX2dyb3d0aCIsImxhYmVsIjoiRGVjYXlpbmcgdmVyc3VzIGdyb3dpbmcgZXhwb25lbnRpYWwgc2lnbmFscyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIGEgcG9zaXRpdmUgY29uc3RhbnQgXFwoYVxcKSwgd2hpY2ggc2lnbmFsIGRlY2F5cyB0b3dhcmQgMCBhcyBcXCh0XFwpIGluY3JlYXNlcz8iLCJvcHRpb25zIjpbIkEuIFxcKHgodCkgPSBlXnthdH1cXCkiLCJCLiBcXCh4KHQpID0gZV57LWF0fVxcKSIsIkMuIFxcKHgodCkgPSBhIGVee3R9XFwpIiwiRC4gXFwoeCh0KSA9IGVeey1hfVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBuZWdhdGl2ZSBzaWduIGluIHRoZSBleHBvbmVudCBtYWtlcyBcXChlXnstYXR9XFwpIHNocmluayBhcyBcXCh0XFwpIGluY3JlYXNlcy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJcXChlXnthdH1cXCkgZ3Jvd3MgYmVjYXVzZSB0aGUgZXhwb25lbnQgYmVjb21lcyBsYXJnZXIgYW5kIHBvc2l0aXZlLiIsIkMiOiJcXChhIGVee3R9XFwpIGdyb3dzIHdpdGggXFwodFxcKTsgXFwoYVxcKSBvbmx5IHNjYWxlcyB0aGUgaGVpZ2h0LiIsIkQiOiJcXChlXnstYX1cXCkgaXMgYSBjb25zdGFudCB3aXRoIHJlc3BlY3QgdG8gXFwodFxcKSwgbm90IGEgc2lnbmFsIHRoYXQgZGVjYXlzIG92ZXIgdGltZS4ifSwiaGludCI6Ikxvb2sgZm9yIHdoZXRoZXIgdGhlIGV4cG9uZW50IGJlY29tZXMgbW9yZSBuZWdhdGl2ZSBhcyBcXCh0XFwpIGluY3JlYXNlcy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgc3R1ZGVudCBza2V0Y2hlcyBcXChlXnstNHR9XFwpIGFzIGEgY3VydmUgdGhhdCBzdGFydHMgYXQgNCBhbmQgZGVjYXlzLiBXaGF0IGlzIHdyb25nPyIsIm9wdGlvbnMiOlsiQS4gSXQgc2hvdWxkIHN0YXJ0IGF0IDEsIG5vdCA0LiIsIkIuIEl0IHNob3VsZCBncm93LCBub3QgZGVjYXkuIiwiQy4gSXQgc2hvdWxkIGNyb3NzIHplcm8gYXQgXFwodCA9IDRcXCkuIiwiRC4gSXQgc2hvdWxkIGJlIG5lZ2F0aXZlIGZvciBcXCh0ID4gMFxcKS4iXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJBdCBcXCh0ID0gMFxcKSwgXFwoZV57LTR0fSA9IGVeMCA9IDFcXCkuIFRoZSA0IGNoYW5nZXMgdGhlIGRlY2F5IHNwZWVkLCBub3QgdGhlIHN0YXJ0aW5nIHZhbHVlLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlRoZSBuZWdhdGl2ZSBleHBvbmVudCBtZWFucyBpdCBkZWNheXMuIiwiQyI6IkFuIGV4cG9uZW50aWFsIGFwcHJvYWNoZXMgemVybyBidXQgZG9lcyBub3QgY3Jvc3MgaXQuIiwiRCI6IlxcKGVeey00dH1cXCkgc3RheXMgcG9zaXRpdmUgZm9yIGFsbCBcXCh0XFwpLiJ9LCJoaW50IjoiRXZhbHVhdGUgdGhlIHNpZ25hbCBhdCBcXCh0ID0gMFxcKS4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoid3JvbmdfdnNfcmlnaHRfdmlzdWFsX2NoZWNrIiwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19LHsiaWQiOiJ0aW1lX2NvbnN0YW50X2Zvcm11bGEiLCJsYWJlbCI6IlRpbWUgY29uc3RhbnQgVCA9IDEvYSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIFxcKHgodCkgPSBlXnstMnR9XFwpLCB3aGF0IGlzIHRoZSB0aW1lIGNvbnN0YW50PyIsIm9wdGlvbnMiOlsiQS4gMiIsIkIuIDEiLCJDLiAwLjUiLCJELiAwLjM3Il0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiRm9yIFxcKGVeey1hdH1cXCksIHRoZSB0aW1lIGNvbnN0YW50IGlzIFxcKFQgPSAxL2FcXCkuIEhlcmUgXFwoYSA9IDJcXCksIHNvIFxcKFQgPSAwLjVcXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiMiBpcyB0aGUgZGVjYXkgcmF0ZSBcXChhXFwpLCBub3QgdGhlIHRpbWUgY29uc3RhbnQuIiwiQiI6IjEgaXMgdGhlIGluaXRpYWwgdmFsdWUgXFwoZV4wXFwpLCBub3QgXFwoVFxcKS4iLCJEIjoiMC4zNyBpcyBhcHByb3hpbWF0ZWx5IFxcKDEvZVxcKSwgdGhlIGFtcGxpdHVkZSBmcmFjdGlvbiBhZnRlciBvbmUgdGltZSBjb25zdGFudCDigJQgbm90IHRoZSB0aW1lIGludGVydmFsIGl0c2VsZi4ifSwiaGludCI6IlVzZSBcXChUID0gMS9hXFwpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSW4gYSBwbG90IG9mIFxcKGVeey1hdH1cXCksIHRoZSBjdXJ2ZSByZWFjaGVzIGFib3V0IDAuMzcgb2YgaXRzIGN1cnJlbnQgdmFsdWUgYWZ0ZXIgd2hhdCB0aW1lIGludGVydmFsPyIsIm9wdGlvbnMiOlsiQS4gXFwoYVxcKSBzZWNvbmRzIiwiQi4gXFwoMS9hXFwpIHNlY29uZHMiLCJDLiBcXChlXFwpIHNlY29uZHMiLCJELiBcXCgxL2VcXCkgc2Vjb25kcyJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6Ik9uZSB0aW1lIGNvbnN0YW50IGlzIFxcKDEvYVxcKSBzZWNvbmRzLCBhbmQgYWZ0ZXIgdGhhdCBpbnRlcnZhbCB0aGUgdmFsdWUgaXMgbXVsdGlwbGllZCBieSBcXCgxL2UgXFxhcHByb3ggMC4zN1xcKS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJcXChhXFwpIGlzIHRoZSByYXRlIHBhcmFtZXRlciwgbm90IHRoZSB0aW1lIGludGVydmFsLiIsIkMiOiJcXChlXFwpIGlzIHRoZSBiYXNlIG9mIHRoZSBleHBvbmVudGlhbCwgbm90IGEgdGltZSBpbnRlcnZhbC4iLCJEIjoiXFwoMS9lXFwpIGlzIHRoZSBhbXBsaXR1ZGUgZnJhY3Rpb24sIG5vdCB0aGUgZWxhcHNlZCB0aW1lLiJ9LCJoaW50IjoiU2VwYXJhdGUgdGhlIHRpbWUgaW50ZXJ2YWwgZnJvbSB0aGUgYW1wbGl0dWRlIGZyYWN0aW9uLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJib29rX2ZpZ3VyZV9yZWZlcmVuY2UiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InJlcGVhdGVkX3BlcmNlbnRhZ2VfZHJvcCIsImxhYmVsIjoiUmVwZWF0ZWQgZmFjdG9yIGRyb3Agb3ZlciBlcXVhbCB0aW1lIGNvbnN0YW50cyIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IklmIGEgZGVjYXlpbmcgZXhwb25lbnRpYWwgaGFzIHZhbHVlIDAuNjAgYXQgc29tZSB0aW1lLCB3aGF0IGlzIGl0cyB2YWx1ZSBvbmUgdGltZSBjb25zdGFudCBsYXRlcj8iLCJvcHRpb25zIjpbIkEuIEFib3V0IFxcKDAuNjAvZVxcKSIsIkIuIEFib3V0IFxcKDAuNjAgLSAwLjM3XFwpIiwiQy4gRXhhY3RseSAwIiwiRC4gQWJvdXQgXFwoMC42MCBcXGNkb3QgZVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6Ik9uZSB0aW1lIGNvbnN0YW50IGxhdGVyLCB0aGUgdmFsdWUgaXMgbXVsdGlwbGllZCBieSBcXCgxL2VcXCksIHJlZ2FyZGxlc3Mgb2Ygd2hlcmUgdGhlIGludGVydmFsIHN0YXJ0cy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGUgZHJvcCBpcyBtdWx0aXBsaWNhdGl2ZSwgbm90IHN1YnRyYWN0aXZlLiIsIkMiOiJBIGRlY2F5aW5nIGV4cG9uZW50aWFsIGFwcHJvYWNoZXMgemVybyBidXQgZG9lcyBub3QgYmVjb21lIHplcm8gYWZ0ZXIgb25lIHRpbWUgY29uc3RhbnQuIiwiRCI6Ik11bHRpcGx5aW5nIGJ5IFxcKGVcXCkgd291bGQgZGVzY3JpYmUgZ3Jvd3RoLCBub3QgZGVjYXkuIn0sImhpbnQiOiJBIHRpbWUgY29uc3RhbnQgY2hhbmdlcyB0aGUgdmFsdWUgYnkgYSBmYWN0b3IsIG5vdCBieSBhIGZpeGVkIGFtb3VudC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJpbnRlcmFjdGl2ZV9za2V0Y2hfb2JzZXJ2YXRpb24iLCJsYWJlbCI6IkludGVycHJldGluZyB0aGUgZXhwb25lbnRpYWwgc2tldGNoZXIiLCJpbXBvcnRhbmNlIjoibWVkaXVtIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3A0X3ExIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJJbiB0aGUgaW50ZXJhY3RpdmUgc2tldGNoZXIsIHlvdSBpbmNyZWFzZSBcXChhXFwpIGZyb20gMSB0byA0IGZvciBcXCh4KHQpID0gZV57LWF0fVxcKS4gV2hhdCBoYXBwZW5zIHRvIHRoZSBjdXJ2ZSwgYW5kIHdoeT8iLCJpZGVhbF9hbnN3ZXIiOiJUaGUgY3VydmUgYmVjb21lcyBuYXJyb3dlciBhbmQgZGVjYXlzIGZhc3RlciBiZWNhdXNlIHRoZSB0aW1lIGNvbnN0YW50IFxcKFQgPSAxL2FcXCkgYmVjb21lcyBzbWFsbGVyLiBUaGUgMC4zNyBsYW5kbWFyayBvY2N1cnMgc29vbmVyLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3Qgc3RhdGUgdGhhdCB0aGUgY3VydmUgZGVjYXlzIGZhc3RlciBvciBiZWNvbWVzIGhvcml6b250YWxseSBjb21wcmVzc2VkIiwiTXVzdCBjb25uZWN0IHRoaXMgdG8gXFwoVCA9IDEvYVxcKSBkZWNyZWFzaW5nIiwiTXVzdCBtZW50aW9uIHRoYXQgdGhlIDAuMzcgcG9pbnQgb2NjdXJzIGVhcmxpZXIiXSwiZXhwbGFuYXRpb24iOiJUaGlzIGNoZWNrcyB3aGV0aGVyIHRoZSBzdHVkZW50IGNvbm5lY3RzIHRoZSBwYXJhbWV0ZXIgXFwoYVxcKSB0byB0aGUgdmlzaWJsZSBza2V0Y2gsIG5vdCBqdXN0IHRvIGEgbWVtb3JpemVkIGZvcm11bGEuIiwiaGludCI6IkFzayB3aGF0IGhhcHBlbnMgdG8gXFwoVCA9IDEvYVxcKSB3aGVuIFxcKGFcXCkgZ2V0cyBsYXJnZXIuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImludGVyYWN0aXZlX2RlbW9fb2JzZXJ2YXRpb24iLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
