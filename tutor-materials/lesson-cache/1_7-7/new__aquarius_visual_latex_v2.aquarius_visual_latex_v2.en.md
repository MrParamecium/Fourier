%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJUaGUgdGV4dGJvb2sgY2FzY2FkZSBkaWFncmFtIGlzIHRoZSBjYW5vbmljYWwgdmlzdWFsIGZvciB0aGUgaW52ZXJzZS1zeXN0ZW0gaWRlYSwgc28gaXQgc2hvdWxkIGFuY2hvciB0aGUgaWRlbnRpdHktc3lzdGVtIGNvbmNlcHQuIEEgY3VzdG9tIHN0YXRpYyB0ZWFjaGluZyB2aXN1YWwgaXMgYWxzbyB1c2VmdWwgZm9yIHRoZSByZWN0aWZpZXIgYmVjYXVzZSBzdHVkZW50cyBuZWVkIHRvIHNlZSB0d28gZGlmZmVyZW50IGlucHV0cyBjb2xsYXBzaW5nIHRvIHRoZSBzYW1lIG91dHB1dCwgd2hpY2ggaXMgdGhlIGNvcmUgbm9uaW52ZXJ0aWJpbGl0eSB0cmFwLiIsImNyYW0iOiJVc2UgdGhlIGNhc2NhZGUgZGlhZ3JhbSB0byByZW1lbWJlciB0aGUgdGVzdDogc3lzdGVtIGZvbGxvd2VkIGJ5IGludmVyc2UgbXVzdCByZXR1cm4geCh0KS4gVXNlIHRoZSByZWN0aWZpZXIgdmlzdWFsIHRvIHNwb3QgbWFueS10by1vbmUgbWFwcGluZ3MgZmFzdC4iLCJzdGFuZGFyZCI6IlVzZSBvbmUgY2xlYW4gY2FzY2FkZSB2aXN1YWwgZm9yIHRoZSBtYWluIGRlZmluaXRpb24gYW5kIG9uZSBjdXN0b20gdHJhcCB2aXN1YWwgZm9yIHRoZSByZXByZXNlbnRhdGl2ZSBub25pbnZlcnRpYmxlIGV4YW1wbGUuIiwidG9wX3Njb3JlIjoiVXNlIHZpc3VhbHMgdG8gZGlzdGluZ3Vpc2ggcmV2ZXJzaWJsZSB0cmFuc2Zvcm1hdGlvbnMgZnJvbSBpbmZvcm1hdGlvbi1sb3NpbmcgdHJhbnNmb3JtYXRpb25zLCBlc3BlY2lhbGx5IHNpbmdsZS1wb2ludCBsb3NzIGFuZCBkYy1jb21wb25lbnQgbG9zcy4ifQ==" style="display:none;"></div>%%KC_END%%
# Invertible and Noninvertible Systems

> **Section Objective:** Decide when a system output contains enough information to recover the original input.

---

### CONCEPTS IN THIS SECTION

- Invertible system
- Inverse system
- Identity system
- Noninvertible system
- Rectifier
- Lost information

## 1. Invertible Means You Can Recover the Input

A system is **invertible** when every output comes from exactly one possible input. This means a second system — the **inverse system** \(S_i\) — can undo the original operation and return the original signal.

**Symbol guide:**
- \(S\): the original system
- \(S_i\): the inverse system
- \(x(t)\): the original input
- \(y(t)\): the intermediate output after \(S\)

**When to use this formula:** Any exam question asking whether a system can be undone, or whether an inverse exists, is testing this identity.

#### Common Misuse
Finding a recovery formula that works for *most* values of \(t\) is not enough. If even a single input value is lost, the system is noninvertible.

**Minimal example:** Integration can be undone by differentiation only under the ideal assumptions used by the textbook — in practice, the missing constant of integration is a real information loss.

$$S_i\bigl\{S\{x(t)\}\bigr\} = x(t)$$


## 2. Example of an Invertible System: Time Reversal

Time reversal is invertible because applying the same operation a second time returns the original signal.

**Recovery formula:** Starting from \(y(t) = x(-t)\), substitute \(-t\) for \(t\) to get \(x(t) = y(-t)\). The inverse system is identical to the original system.

**Symbol guide:**
- \(x(t)\): the original signal
- \(y(t)\): the time-reversed signal
- \(-t\): flips the time axis around \(t = 0\)

**Use-case trigger:** If the operation only re-labels or rearranges time without merging values from different inputs, suspect invertible.

#### Common Misuse
Students may assume any altered-looking waveform is noninvertible. The real question is not whether the waveform looks different, but whether any information was permanently lost.

$$y(t) = x(-t)$$

### Worked Example: solving for inverse formulas

For transformations of time, solve the output equation for the original input argument.

Example:

$$y(t)=x(3t-6)$$

Let \(s=3t-6\). Then \(t=(s+6)/3\), so:

$$x(s)=y\left(\frac{s+6}{3}\right)$$

Rename \(s\) to \(t\):

$$x(t)=y\left(\frac{t+6}{3}\right)$$

So the inverse system is:

$$S_i[y](t)=y\left(\frac{t+6}{3}\right)$$

### Quick Check: test whether the input can be recovered

After proposing a recovery rule, ask one blunt question: can two different inputs produce the same output? If yes, no inverse exists on that full input set.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="interactive_demo" data-teaching-role="example_support" style="display:none;"></div><div class="kc-interactive-demo" data-demo-b64="eyJ0eXBlIjoiaW50ZXJhY3RpdmVfZGVtbyIsImRlbW9fdHlwZSI6ImludmVydGliaWxpdHlfdGVzdGVyIiwidGl0bGUiOiJRdWljayBDaGVjazogdGVzdCB3aGV0aGVyIHRoZSBpbnB1dCBjYW4gYmUgcmVjb3ZlcmVkIiwiZXhwbGFuYXRpb24iOiJTd2l0Y2ggc3lzdGVtcyBhbmQgYXNrIHdoZXRoZXIgdHdvIGRpZmZlcmVudCBpbnB1dHMgY2FuIGNvbGxhcHNlIHRvIHRoZSBzYW1lIG91dHB1dC4ifQ=="></div>%%KC_END%%

## 3. Noninvertible Means Different Inputs Can Give the Same Output

The **rectifier** \(y(t) = |x(t)|\) is noninvertible because it removes the sign of the input.

**Symbol guide:**
- \(x(t)\): the input signal
- \(y(t)\): the rectified (nonnegative) output

**Concrete example:** At any time instant, \(x(t) = 3\) and \(x(t) = -3\) both produce \(y(t) = 3\). The output cannot tell which input occurred — the sign is gone.

**Exam trigger:** Absolute value, squaring, clipping, saturation, or any many-to-one mapping almost always signals noninvertibility. Look for two different inputs that collapse to the same output.

#### Common Misuse
Saying "apply absolute value again" is not an inverse. Repeating the operation gives the same nonnegative output but never recovers the original sign.

$$y(t) = |x(t)|$$

#### Common Trap: many-to-one systems

- \(y(t)=x^2(t)\): not invertible over all real inputs because \(x\) and \(-x\) give the same output.
- \(y(t)=\cos(x(t))\): not invertible without a restricted domain because many angles have the same cosine.
- \(y(t)=x^3(t)\): invertible over real inputs because cube is one-to-one.

## 4. Noninvertible Even If It Almost Looks Recoverable

A tempting recovery rule is \(x(t) = y(t)/t\), but this fails at \(t = 0\).

At \(t = 0\): \(y(0) = 0 \cdot x(0) = 0\) regardless of what \(x(0)\) was. The value \(x(0)\) is permanently lost.

**Symbol guide:**
- \(t\): time variable (acts as a multiplier)
- \(x(t)\): the input signal
- \(y(t)\): the output signal

**Exam trigger:** Whenever a proposed inverse formula involves division, check every point where the divisor equals zero. If the output is forced to zero at any such point, information is lost there.

#### Common Misuse
Saying the system is invertible because the inverse formula \(x(t) = y(t)/t\) works for every \(t \neq 0\) is incorrect. The textbook treats even a single lost point as sufficient to classify the system as noninvertible.

$$y(t) = t\,x(t)$$

## 5. Differentiation Loses the DC Component

Differentiation is noninvertible because constant offsets disappear entirely.

**Minimal example:** \(x_1(t) = 1\) and \(x_2(t) = 2\) are two different signals, but both have derivative \(y(t) = 0\). The output cannot identify which constant level the input had.

**DC component:** The constant offset (average level) of a signal. Differentiation always removes it.

**Use-case trigger:** If a system removes constants or offsets — any information that does not change over time — suspect lost information.

#### Common Misuse
Saying integration is automatically the inverse is incorrect. Integration can recover a *family* of possible inputs (differing by an arbitrary constant \(C\)), but without knowing the missing constant it cannot recover the exact original input.

$$y(t) = \frac{d}{dt}x(t)$$

---
**📌 Key Takeaways**
- **Inverse cascade:** \(S_i\{S\{x(t)\}\} = x(t)\) — cascading a system with its inverse returns the original input exactly.
- **Time reversal:** \(y(t) = x(-t)\) is invertible — applying reversal twice recovers \(x(t)\), so no information is lost.
- **Rectifier:** \(y(t) = |x(t)|\) is noninvertible — sign information is lost because \(x(t)\) and \(-x(t)\) produce the same output.
- **t-multiplication:** \(y(t) = t\,x(t)\) is noninvertible — the value \(x(0)\) is lost because \(y(0) = 0\) for any input.
- **Differentiation:** \(y(t) = \frac{d}{dt}x(t)\) is noninvertible — constants vanish, so the dc component of the input cannot be recovered.

*Next, we will use similar input-output reasoning to test other system properties.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImludmVydGliaWxpdHlfZGVmaW5pdGlvbiIsImxhYmVsIjoiSW52ZXJ0aWJpbGl0eSBhcyB1bmlxdWUgaW5wdXQgcmVjb3ZlcnkiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDFfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgc3lzdGVtIGlzIGludmVydGlibGUgd2hlbjoiLCJvcHRpb25zIjpbIkEuIEV2ZXJ5IGlucHV0IHByb2R1Y2VzIGFuIG91dHB1dCB0aGF0IGxvb2tzIHNpbXBsZSIsIkIuIFRoZSBpbnB1dCBjYW4gYmUgdW5pcXVlbHkgcmVjb3ZlcmVkIGZyb20gdGhlIGNvcnJlc3BvbmRpbmcgb3V0cHV0IiwiQy4gVGhlIHN5c3RlbSBvdXRwdXQgaXMgYWx3YXlzIG5vbnplcm8iLCJELiBUaGUgc3lzdGVtIGhhcyBubyB0aW1lIHZhcmlhYmxlIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiSW52ZXJ0aWJpbGl0eSBtZWFucyB0aGUgb3V0cHV0IGNvbnRhaW5zIGVub3VnaCBpbmZvcm1hdGlvbiB0byByZWNvdmVyIGV4YWN0bHkgb25lIG9yaWdpbmFsIGlucHV0LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlZpc3VhbCBzaW1wbGljaXR5IGlzIGlycmVsZXZhbnQ7IHRoZSBpc3N1ZSBpcyB1bmlxdWUgcmVjb3ZlcnkuIiwiQyI6IkEgbm9uemVybyBvdXRwdXQgZG9lcyBub3QgZ3VhcmFudGVlIHVuaXF1ZW5lc3MuIiwiRCI6IlN5c3RlbXMgd2l0aCB0aW1lIHZhcmlhYmxlcyBjYW4gYmUgaW52ZXJ0aWJsZSBvciBub25pbnZlcnRpYmxlLiJ9LCJoaW50IjoiQXNrIHdoZXRoZXIgdHdvIGRpZmZlcmVudCBpbnB1dHMgY291bGQgbGVhZCB0byB0aGUgc2FtZSBvdXRwdXQuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggZm9ybXVsYSBiZXN0IHJlcHJlc2VudHMgYSBzeXN0ZW0gXFwoU1xcKSBmb2xsb3dlZCBieSBpdHMgaW52ZXJzZSBzeXN0ZW0gXFwoU19pXFwpPyIsIm9wdGlvbnMiOlsiQS4gXFwoU19pXFx7U1xce3godClcXH1cXH0gPSB4KHQpXFwpIiwiQi4gXFwoU1xce3godClcXH0gPSAwXFwpIiwiQy4gXFwoU19pXFx7eCh0KVxcfSA9IFNcXHt4KHQpXFx9XFwpIiwiRC4gXFwoU1xce1NfaVxce3godClcXH1cXH0gPSB5KHQpICsgeCh0KVxcKSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlRoZSBpbnZlcnNlIHN5c3RlbSBtdXN0IHVuZG8gXFwoU1xcKSBhbmQgcmV0dXJuIHRoZSBvcmlnaW5hbCBpbnB1dCBcXCh4KHQpXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6Ilplcm8gb3V0cHV0IGlzIG5vdCB0aGUgZGVmaW5pdGlvbiBvZiBhbiBpbnZlcnNlLiIsIkMiOiJUaGUgaW52ZXJzZSBzeXN0ZW0gZG9lcyBub3QgZ2VuZXJhbGx5IHByb2R1Y2UgdGhlIHNhbWUgcmVzdWx0IGFzIHRoZSBvcmlnaW5hbCBzeXN0ZW0uIiwiRCI6IkFkZGluZyBcXCh5KHQpXFwpIGFuZCBcXCh4KHQpXFwpIGlzIG5vdCB0aGUgaWRlbnRpdHktc3lzdGVtIGNvbmRpdGlvbi4ifSwiaGludCI6IlRoZSBmaW5hbCBvdXRwdXQgb2YgdGhlIGNhc2NhZGUgc2hvdWxkIG1hdGNoIHRoZSBvcmlnaW5hbCBpbnB1dC4iLCJuZWVkc192aXN1YWwiOnRydWUsInZpc3VhbF90eXBlIjoiYm9va19jYXNjYWRlX2RpYWdyYW0iLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InRpbWVfcmV2ZXJzYWxfaW52ZXJ0aWJsZSIsImxhYmVsIjoiVGltZSByZXZlcnNhbCBpcyBpbnZlcnRpYmxlIiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHRoZSBzeXN0ZW0gXFwoeSh0KSA9IHgoLXQpXFwpLCBob3cgY2FuIFxcKHgodClcXCkgYmUgcmVjb3ZlcmVkIGZyb20gXFwoeSh0KVxcKT8iLCJvcHRpb25zIjpbIkEuIFxcKHgodCkgPSB5KC10KVxcKSIsIkIuIFxcKHgodCkgPSB8eSh0KXxcXCkiLCJDLiBcXCh4KHQpID0gdFxcLHkodClcXCkiLCJELiBcXCh4KHQpID0gXFxmcmFje2R9e2R0fXkodClcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJBcHBseWluZyB0aW1lIHJldmVyc2FsIGEgc2Vjb25kIHRpbWUgcmV0dXJucyB0aGUgc2lnbmFsIHRvIGl0cyBvcmlnaW5hbCB0aW1lIG9yaWVudGF0aW9uLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IkFic29sdXRlIHZhbHVlIHdvdWxkIGxvc2Ugc2lnbiBpbmZvcm1hdGlvbi4iLCJDIjoiTXVsdGlwbGljYXRpb24gYnkgXFwodFxcKSBpcyB1bnJlbGF0ZWQgdG8gdW5kb2luZyB0aW1lIHJldmVyc2FsLiIsIkQiOiJEaWZmZXJlbnRpYXRpb24gY2hhbmdlcyB0aGUgc2lnbmFsIGFuZCBkb2VzIG5vdCB1bmRvIHJlZmxlY3Rpb24uIn0sImhpbnQiOiJSZXZlcnNlIHRoZSB0aW1lIGF4aXMgYWdhaW4uIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoicmVjdGlmaWVyX25vbmludmVydGlibGUiLCJsYWJlbCI6IlJlY3RpZmllciBsb3NlcyBzaWduIGluZm9ybWF0aW9uIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaHkgaXMgXFwoeSh0KSA9IHx4KHQpfFxcKSBub25pbnZlcnRpYmxlPyIsIm9wdGlvbnMiOlsiQS4gQmVjYXVzZSB0aGUgb3V0cHV0IGlzIGFsd2F5cyBuZWdhdGl2ZSIsIkIuIEJlY2F1c2UgXFwoeCh0KVxcKSBhbmQgXFwoLXgodClcXCkgY2FuIHByb2R1Y2UgdGhlIHNhbWUgb3V0cHV0IiwiQy4gQmVjYXVzZSBhYnNvbHV0ZSB2YWx1ZSBjaGFuZ2VzIHRpbWUgaW50byBmcmVxdWVuY3kiLCJELiBCZWNhdXNlIGV2ZXJ5IGlucHV0IHByb2R1Y2VzIHplcm8gb3V0cHV0Il0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIHJlY3RpZmllciByZW1vdmVzIHNpZ24gaW5mb3JtYXRpb24sIHNvIHR3byBkaWZmZXJlbnQgaW5wdXRzIGNhbiBjb2xsYXBzZSB0byB0aGUgc2FtZSBvdXRwdXQuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiVGhlIG91dHB1dCBvZiBhbiBhYnNvbHV0ZSB2YWx1ZSBpcyBub25uZWdhdGl2ZSwgbm90IGFsd2F5cyBuZWdhdGl2ZS4iLCJDIjoiTm8gZnJlcXVlbmN5IGNvbnZlcnNpb24gaXMgaW52b2x2ZWQgaGVyZS4iLCJEIjoiVGhlIG91dHB1dCBpcyBub3QgYWx3YXlzIHplcm87IGZvciBleGFtcGxlLCBcXCh8M3wgPSAzXFwpLiJ9LCJoaW50IjoiQ29tcGFyZSBpbnB1dCB2YWx1ZXMgXFwoM1xcKSBhbmQgXFwoLTNcXCkuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6InJlY3RpZmllcl90d29faW5wdXRzX3NhbWVfb3V0cHV0Iiwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiQSBzdHVkZW50IGNsYWltcyBcXCh5KHQpID0gfHgodCl8XFwpIGlzIGludmVydGlibGUgYmVjYXVzZSB5b3UgY2FuIGFwcGx5IGFic29sdXRlIHZhbHVlIGFnYWluLiBFeHBsYWluIHdoeSB0aGlzIGlzIHdyb25nLiIsImlkZWFsX2Fuc3dlciI6IkFwcGx5aW5nIGFic29sdXRlIHZhbHVlIGFnYWluIGdpdmVzIHRoZSBzYW1lIG5vbm5lZ2F0aXZlIG91dHB1dCwgYnV0IGl0IGRvZXMgbm90IHJlY292ZXIgdGhlIG9yaWdpbmFsIHNpZ24gb2YgXFwoeCh0KVxcKS4gU2luY2UgXFwoeCh0KVxcKSBhbmQgXFwoLXgodClcXCkgY2FuIHByb2R1Y2UgdGhlIHNhbWUgXFwoeSh0KVxcKSwgdGhlIG9yaWdpbmFsIGlucHV0IGlzIG5vdCB1bmlxdWVseSByZWNvdmVyYWJsZS4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IG1lbnRpb24gbG9zcyBvZiBzaWduIGluZm9ybWF0aW9uIiwiTXVzdCBzdGF0ZSB0aGF0IHR3byBkaWZmZXJlbnQgaW5wdXRzIGNhbiBwcm9kdWNlIHRoZSBzYW1lIG91dHB1dCIsIk11c3QgZXhwbGFpbiB0aGF0IGFwcGx5aW5nIGFic29sdXRlIHZhbHVlIGFnYWluIGlzIG5vdCBhIHRydWUgaW52ZXJzZSJdLCJleHBsYW5hdGlvbiI6IlRoaXMgY2hlY2tzIHdoZXRoZXIgdGhlIHN0dWRlbnQgdW5kZXJzdGFuZHMgaW52ZXJzZSByZWNvdmVyeSwgbm90IGp1c3QgcmVwZWF0ZWQgb3BlcmF0aW9ucy4iLCJoaW50IjoiQW4gaW52ZXJzZSBtdXN0IHJlY292ZXIgdGhlIG9yaWdpbmFsIGlucHV0LCBub3QgbWVyZWx5IHJlcHJvZHVjZSB0aGUgb3V0cHV0LiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJ3cm9uZ192c19yaWdodF9yZWN0aWZpZXJfY2hlY2siLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6InNpbmdsZV9wb2ludF9sb3NzIiwibGFiZWwiOiJNdWx0aXBsaWNhdGlvbiBieSB0IGxvc2VzIHgoMCkiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNF9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIFxcKHkodCkgPSB0XFwseCh0KVxcKSwgd2h5IGRvZXMgdGhlIHJlY292ZXJ5IHJ1bGUgXFwoeCh0KSA9IHkodCkvdFxcKSBmYWlsIGFzIGFuIGludmVyc2U/Iiwib3B0aW9ucyI6WyJBLiBJdCBmYWlscyBhdCBcXCh0ID0gMFxcKSwgd2hlcmUgXFwoeSgwKSA9IDBcXCkgZm9yIGFueSB2YWx1ZSBvZiBcXCh4KDApXFwpIiwiQi4gSXQgZmFpbHMgYmVjYXVzZSBtdWx0aXBsaWNhdGlvbiBieSBcXCh0XFwpIGFsd2F5cyByZW1vdmVzIGFsbCBzaWduYWwgdmFsdWVzIiwiQy4gSXQgZmFpbHMgYmVjYXVzZSBkaXZpc2lvbiBpcyBuZXZlciBhbGxvd2VkIGluIHN5c3RlbSBhbmFseXNpcyIsIkQuIEl0IGZhaWxzIG9ubHkgaWYgXFwoeCh0KVxcKSBpcyBjb21wbGV4LXZhbHVlZCJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IkF0IFxcKHQgPSAwXFwpLCB0aGUgb3V0cHV0IGlzIGFsd2F5cyB6ZXJvLCBzbyB0aGUgb3JpZ2luYWwgdmFsdWUgXFwoeCgwKVxcKSBjYW5ub3QgYmUgcmVjb3ZlcmVkLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IlZhbHVlcyBmb3IgXFwodCBcXG5lcSAwXFwpIGNhbiBiZSByZWNvdmVyZWQgYnkgZGl2aXNpb247IHRoZSBwcm9ibGVtIGlzIHRoZSBzaW5nbGUgbG9zdCBwb2ludC4iLCJDIjoiRGl2aXNpb24gY2FuIGJlIHZhbGlkIHdoZW4gaXQgZG9lcyBub3QgZGl2aWRlIGJ5IHplcm8uIiwiRCI6IlRoZSBpc3N1ZSBpcyBcXCh0ID0gMFxcKSwgbm90IHdoZXRoZXIgdGhlIHNpZ25hbCBpcyBjb21wbGV4LiJ9LCJoaW50IjoiQ2hlY2sgdGhlIHByb3Bvc2VkIGludmVyc2UgZXhhY3RseSB3aGVyZSB0aGUgZGl2aXNvciBlcXVhbHMgemVyby4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJkaWZmZXJlbnRpYXRpb25fbG9zZXNfY29uc3RhbnRzIiwibGFiZWwiOiJEaWZmZXJlbnRpYXRpb24gbG9zZXMgdGhlIGRjIGNvbXBvbmVudCIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2h5IGlzIFxcKHkodCkgPSBcXGZyYWN7ZH17ZHR9eCh0KVxcKSBub25pbnZlcnRpYmxlIGluIHRoaXMgc2VjdGlvbidzIHNlbnNlPyIsIm9wdGlvbnMiOlsiQS4gRGlmZmVyZW50aWF0aW9uIGFsd2F5cyBwcm9kdWNlcyBhIGxhcmdlciBzaWduYWwiLCJCLiBEaWZmZXJlbnQgaW5wdXRzIHRoYXQgZGlmZmVyIGJ5IGEgY29uc3RhbnQgY2FuIGhhdmUgdGhlIHNhbWUgZGVyaXZhdGl2ZSIsIkMuIERpZmZlcmVudGlhdGlvbiBjYW5ub3QgYmUgYXBwbGllZCB0byBhbnkgc2lnbmFsIiwiRC4gVGhlIG91dHB1dCBuZXZlciBkZXBlbmRzIG9uIHRoZSBpbnB1dCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IkRpZmZlcmVudGlhdGlvbiByZW1vdmVzIGNvbnN0YW50IG9mZnNldHMsIHNvIHRoZSBleGFjdCBvcmlnaW5hbCBpbnB1dCBjYW5ub3QgYmUgdW5pcXVlbHkgcmVjb3ZlcmVkLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkRpZmZlcmVudGlhdGlvbiBkb2VzIG5vdCBhbHdheXMgaW5jcmVhc2Ugc2lnbmFsIHNpemUuIiwiQyI6Ik1hbnkgc2lnbmFscyBjYW4gYmUgZGlmZmVyZW50aWF0ZWQ7IHRoZSBpc3N1ZSBpcyBpbmZvcm1hdGlvbiBsb3NzLiIsIkQiOiJUaGUgb3V0cHV0IGRvZXMgZGVwZW5kIG9uIHRoZSBpbnB1dCdzIHJhdGUgb2YgY2hhbmdlLiJ9LCJoaW50IjoiV2hhdCBpcyB0aGUgZGVyaXZhdGl2ZSBvZiBcXCh4KHQpID0gMVxcKT8gV2hhdCBhYm91dCBcXCh4KHQpID0gMlxcKT8iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3A1X3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBwYWlyIG9mIGlucHV0cyBwcm92ZXMgdGhhdCBkaWZmZXJlbnRpYXRpb24gY2FuIGJlIG5vbmludmVydGlibGU/Iiwib3B0aW9ucyI6WyJBLiBcXCh4XzEodCkgPSAxXFwpIGFuZCBcXCh4XzIodCkgPSAyXFwpIiwiQi4gXFwoeF8xKHQpID0gdFxcKSBhbmQgXFwoeF8yKHQpID0gdF4yXFwpIiwiQy4gXFwoeF8xKHQpID0gXFxzaW4odClcXCkgYW5kIFxcKHhfMih0KSA9IFxcY29zKHQpXFwpIiwiRC4gXFwoeF8xKHQpID0gdFxcKSBhbmQgXFwoeF8yKHQpID0gLXRcXCkiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJCb3RoIGNvbnN0YW50cyBoYXZlIGRlcml2YXRpdmUgemVybywgc28gdGhlIHNhbWUgb3V0cHV0IGNvdWxkIGNvbWUgZnJvbSB0d28gZGlmZmVyZW50IGlucHV0cy4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGVpciBkZXJpdmF0aXZlcyBhcmUgXFwoMVxcKSBhbmQgXFwoMnRcXCksIHdoaWNoIGFyZSBub3QgZ2VuZXJhbGx5IHRoZSBzYW1lLiIsIkMiOiJUaGVpciBkZXJpdmF0aXZlcyBhcmUgXFwoXFxjb3ModClcXCkgYW5kIFxcKC1cXHNpbih0KVxcKSwgbm90IHRoZSBzYW1lLiIsIkQiOiJUaGVpciBkZXJpdmF0aXZlcyBhcmUgXFwoMVxcKSBhbmQgXFwoLTFcXCksIG5vdCB0aGUgc2FtZS4ifSwiaGludCI6Ikxvb2sgZm9yIHR3byBkaWZmZXJlbnQgc2lnbmFscyB3aXRoIHRoZSBzYW1lIGRlcml2YXRpdmUuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19XX0=" style="display:none;"></div>%%KC_END%%
