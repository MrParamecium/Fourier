%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImdlbmVyYXRlZF9pbWFnZSIsInJhdGlvbmFsZSI6IlRoaXMgc2VjdGlvbiBoYXMgbm8gZXh0cmFjdGVkIHRleHRib29rIGZpZ3VyZXMsIGJ1dCBpdCB0ZWFjaGVzIGhpZ2hseSB2aXN1YWwgaWRlYXM6IGNvbXBsZXggbnVtYmVyIHBhcnRzLCBtYWduaXR1ZGUsIGFuZCBwaGFzZSBvbiB0aGUgY29tcGxleCBwbGFuZS4gQ2xlYW4gZ2VuZXJhdGVkIHZpc3VhbHMgd2lsbCBtYWtlIHRoZSBjb21tYW5kLXRvLWNvbmNlcHQgbWFwcGluZyBmYXN0ZXIgYW5kIG1vcmUgZXhhbS11c2VmdWwgdGhhbiBkZW5zZSB0ZXh0IGFsb25lLiIsImNyYW0iOiJVc2UgdmlzdWFscyB0byBoZWxwIHN0dWRlbnRzIGluc3RhbnRseSBtYXRjaCBhIE1BVExBQiBjb21tYW5kIHRvIHRoZSBxdWFudGl0eSBpdCByZXR1cm5zOiBob3Jpem9udGFsIHBhcnQsIHZlcnRpY2FsIHBhcnQsIGxlbmd0aCwgb3IgYW5nbGUuIiwic3RhbmRhcmQiOiJVc2UgdmlzdWFscyB0byBjb25uZWN0IGVhY2ggTUFUTEFCIGNvbW1hbmQgdG8gdGhlIGdlb21ldHJpYyBtZWFuaW5nIG9mIGEgY29tcGxleCBudW1iZXIgb24gdGhlIHBsYW5lLiIsInRvcF9zY29yZSI6IlVzZSB2aXN1YWxzIHRvIGV4cG9zZSBxdWFkcmFudCBoYW5kbGluZywgcmFkaWFucy12cy1kZWdyZWVzIGNvbnZlcnNpb24sIGFuZCB3aHkgYXRhbjIgaXMgc2FmZXIgdGhhbiBhIG9uZS1pbnB1dCBhcmN0YW5nZW50LiJ9" style="display:none;"></div>%%KC_END%%
# B.7-2 Calculator Operations

> **Objective:** Master the five MATLAB commands that cover every complex-number exam task: entering a number, reading its parts, finding its magnitude, and finding its phase in the correct quadrant.

For \ (z = -3 - 4j\), MATLAB tests four things: entering the number, extracting parts, computing magnitude, and reading phase. Memorize this command map cold:

| Quantity | Command | Result for \(z = -3-4j\) |
|---|---|---|
| Real part | `real(z)` | \(-3\) |
| Imaginary part | `imag(z)` | \(-4\) |
| Magnitude | `abs(z)` | \(5\) |
| Phase (rad) | `angle(z)` | \(-2.2143\) |
| Phase (deg) | `angle(z)*180/pi` | \(-126.87°\) |
| Safe quadrant angle | `atan2(imag(z),real(z))` | same as `angle(z)` |

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIHRoaXMgdG8gbWVtb3JpemUgd2hhdCBlYWNoIGNvbW1hbmQgcmVhZHMgb2ZmIHRoZSBjb21wbGV4IHBsYW5lIGluIHNlY29uZHMuIiwic3RhbmRhcmQiOiJVc2UgdGhpcyB0byBjb25uZWN0IE1BVExBQiBvdXRwdXRzIHRvIHRoZSBnZW9tZXRyeSBvZiBvbmUgY29tcGxleCBudW1iZXIuIiwidG9wX3Njb3JlIjoiVXNlIHRoaXMgdG8gaGlnaGxpZ2h0IHNpZ24sIHF1YWRyYW50LCBhbmQgYW5nbGUtcmVhZGluZyBwcmVjaXNpb24uIn0=" style="display:none;"></div>%%KC_END%%
*🎨 One complex number \(z = -3 - 4j\), four MATLAB commands, four geometric quantities. The warning box flags the quadrant trap.*
![Illustration](/generated/gptimage2-1777214722241-2401.png)

## 1. Entering and Reading a Complex Number

MATLAB treats both `i` and `j` as \(\sqrt{-1}\) by default, so typing `z = -3 - 4j` creates a complex constant immediately — no setup required.

To read off the two components:

- **`real(z)`** returns the horizontal component: the real part \(-3\).
- **`imag(z)`** returns the vertical component: the imaginary part \(-4\).

Adding a semicolon (`z = -3 - 4j;`) suppresses screen output, which keeps worked solutions clean.

### COMMON MISTAKE

`imag(z)` returns the **numeric coefficient** \(-4\), not the full imaginary term \(-4j\). The symbol \(j\) is a direction marker, not part of the returned value.

$$z = -3 - 4j, \quad \mathrm{real}(z) = -3, \quad \mathrm{imag}(z) = -4$$
*MATLAB stores the complex number directly and lets you extract its horizontal component with `real` and its vertical component with `imag` — no manual arithmetic needed.*

## 2. Magnitude and Phase: Fastest Commands and Traps

For magnitude, use **`abs(z)`** — it returns \(5\) for \(z = -3 - 4j\) in one call. You can also write `sqrt(real(z)^2 + imag(z)^2)`, but `abs(z)` is faster and less error-prone on an exam.

For phase, **`angle(z)`** returns the result in **radians** — always. To convert to degrees, multiply explicitly:

$$
\theta_{\deg} = \mathrm{angle}(z) \cdot \frac{180}{\pi}
$$

### QUADRANT SAFETY RULE

**`atan2(imag(z), real(z))`** is safer than a one-input arctangent because it uses the signs of both components to place the angle in the correct quadrant. A basic `atan` call sees only the ratio and cannot distinguish quadrant I from quadrant III.

#### Warning

All MATLAB angle-related outputs — `angle`, `atan`, `atan2` — are in **radians** unless you convert. Forgetting this is one of the most common exam unit errors.

$$|z| = \sqrt{z \cdot \mathrm{conj}(z)} = \mathrm{abs}(z), \quad \angle z = \mathrm{angle}(z), \quad \theta_{\deg} = \mathrm{angle}(z) \cdot \frac{180}{\pi}$$
*`abs(z)` gives the magnitude directly, `angle(z)` gives the phase in radians, and multiplying by \(180/\pi\) converts that phase to degrees.*

---
**📌 Key Takeaways**
- Use `abs(z)` for magnitude and `angle(z)` for phase — both are single-call exam shortcuts.
- `angle(z)` always returns radians; convert to degrees with `angle(z)*180/pi`.
- Use `atan2(imag(z), real(z))` instead of one-input arctangent to get the correct quadrant.

*In the next section we will use MATLAB on vectors instead of single numbers.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImNvbXBsZXhfZW50cnlfYW5kX3BhcnRzIiwibGFiZWwiOiJFbnRlcmluZyBhIGNvbXBsZXggbnVtYmVyIGFuZCBleHRyYWN0aW5nIHBhcnRzIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJTdXBwb3NlIFxcKHogPSAtMyAtIDRqXFwpIGluIE1BVExBQi4gV2hpY2ggY29tbWFuZCByZXR1cm5zIFxcKC00XFwpPyIsIm9wdGlvbnMiOlsiQS4gcmVhbCh6KSIsIkIuIGltYWcoeikiLCJDLiBhYnMoeikiLCJELiBhbmdsZSh6KSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6ImBpbWFnKHopYCByZXR1cm5zIHRoZSBudW1lcmljIGNvZWZmaWNpZW50IG9mIFxcKGpcXCksIHdoaWNoIGlzIFxcKC00XFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6ImByZWFsKHopYCByZXR1cm5zIHRoZSBob3Jpem9udGFsIGNvbXBvbmVudCwgd2hpY2ggaXMgXFwoLTNcXCkuIiwiQyI6ImBhYnMoeilgIHJldHVybnMgdGhlIG1hZ25pdHVkZSwgd2hpY2ggaXMgXFwoNVxcKS4iLCJEIjoiYGFuZ2xlKHopYCByZXR1cm5zIHRoZSBwaGFzZSBhbmdsZSwgbm90IHRoZSBpbWFnaW5hcnkgY29tcG9uZW50LiJ9LCJoaW50IjoiQXNrIHdoaWNoIGNvbW1hbmQgcmVhZHMgdGhlIHZlcnRpY2FsLWF4aXMgY29tcG9uZW50LiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggc3RhdGVtZW50IGFib3V0IGBpbWFnKHopYCBpcyBjb3JyZWN0IHdoZW4gXFwoeiA9IC0zIC0gNGpcXCk/Iiwib3B0aW9ucyI6WyJBLiBpbWFnKHopIHJldHVybnMgLTRqIiwiQi4gaW1hZyh6KSByZXR1cm5zIGoiLCJDLiBpbWFnKHopIHJldHVybnMgLTQiLCJELiBpbWFnKHopIHJldHVybnMgNCJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6Ik1BVExBQidzIGBpbWFnYCBmdW5jdGlvbiByZXR1cm5zIHRoZSByZWFsLW51bWJlciBjb2VmZmljaWVudCBvZiBcXChqXFwpLCBub3QgdGhlIGZ1bGwgaW1hZ2luYXJ5IHRlcm0uIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiXFwoLTRqXFwpIGlzIHRoZSBpbWFnaW5hcnkgdGVybSBpbnNpZGUgdGhlIGV4cHJlc3Npb24sIG5vdCBNQVRMQUIncyBgaW1hZ2Agb3V0cHV0LiIsIkIiOiJcXChqXFwpIGlzIHRoZSBzeW1ib2wgbWFya2luZyB0aGUgaW1hZ2luYXJ5IGRpcmVjdGlvbiwgbm90IHRoZSByZXR1cm5lZCB2YWx1ZSBoZXJlLiIsIkQiOiJUaGUgc2lnbiBpcyB3cm9uZzsgdGhlIGltYWdpbmFyeSBjb21wb25lbnQgaXMgXFwoLTRcXCksIG5vdCBcXCg0XFwpLiJ9LCJoaW50IjoiU2VwYXJhdGUgdGhlIGNvZWZmaWNpZW50IGZyb20gdGhlIHN5bWJvbCBcXChqXFwpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoibWFnbml0dWRlX2NvbW1hbmRzIiwibGFiZWwiOiJNYWduaXR1ZGUgb2YgYSBjb21wbGV4IG51bWJlciIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIFxcKHogPSAtMyAtIDRqXFwpLCB3aGljaCBNQVRMQUIgY29tbWFuZCBpcyB0aGUgZmFzdGVzdCBkaXJlY3Qgd2F5IHRvIGNvbXB1dGUgdGhlIG1hZ25pdHVkZT8iLCJvcHRpb25zIjpbIkEuIGFicyh6KSIsIkIuIHJlYWwoeikiLCJDLiBhbmdsZSh6KSIsIkQuIGNvbmooeikiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJgYWJzKHopYCBkaXJlY3RseSByZXR1cm5zIHRoZSBtYWduaXR1ZGUgb2YgYSBjb21wbGV4IG51bWJlci4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJgcmVhbCh6KWAgcmV0dXJucyBvbmx5IHRoZSByZWFsIHBhcnQgXFwoLTNcXCkuIiwiQyI6ImBhbmdsZSh6KWAgcmV0dXJucyBwaGFzZSwgbm90IG1hZ25pdHVkZS4iLCJEIjoiYGNvbmooeilgIGdpdmVzIHRoZSBjb21wbGV4IGNvbmp1Z2F0ZSBcXCgtMyArIDRqXFwpLCBub3QgdGhlIG1hZ25pdHVkZSBieSBpdHNlbGYuIn0sImhpbnQiOiJDaG9vc2UgdGhlIGNvbW1hbmQgdGhhdCBhbHJlYWR5IG1lYW5zIGFic29sdXRlIHZhbHVlLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6InBoYXNlX2FuZF9xdWFkcmFudCIsImxhYmVsIjoiUGhhc2UgYW5nbGUsIHJhZGlhbnMsIGRlZ3JlZXMsIGFuZCBxdWFkcmFudCBoYW5kbGluZyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwM19xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggY29tbWFuZCByZXR1cm5zIHRoZSBwaGFzZSBvZiBcXCh6XFwpIGRpcmVjdGx5IGluIE1BVExBQidzIGRlZmF1bHQgYW5nbGUgdW5pdD8iLCJvcHRpb25zIjpbIkEuIGFicyh6KSIsIkIuIGFuZ2xlKHopIiwiQy4gYXRhbih6KSIsIkQuIHJlYWwoeikiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJgYW5nbGUoeilgIHJldHVybnMgdGhlIHBoYXNlIGFuZ2xlIG9mIHRoZSBjb21wbGV4IG51bWJlciwgYW5kIE1BVExBQiB1c2VzIHJhZGlhbnMgYnkgZGVmYXVsdC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJgYWJzKHopYCBnaXZlcyBtYWduaXR1ZGUsIG5vdCBwaGFzZS4iLCJDIjoiYGF0YW5gIGlzIG5vdCB0aGUgZGlyZWN0IGNvbXBsZXgtcGhhc2UgY29tbWFuZCBhbmQgY2FuIHByb2R1Y2UgcXVhZHJhbnQgZXJyb3JzLiIsIkQiOiJgcmVhbCh6KWAgZ2l2ZXMgb25seSB0aGUgcmVhbCBjb21wb25lbnQuIn0sImhpbnQiOiJUaGUgY29tbWFuZCBuYW1lIG1hdGNoZXMgdGhlIHF1YW50aXR5IGJlaW5nIGFza2VkIGZvci4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaHkgaXMgYGF0YW4yKGltYWcoeiksIHJlYWwoeikpYCBzYWZlciB0aGFuIHVzaW5nIGEgYmFzaWMgb25lLWlucHV0IGFyY3RhbmdlbnQgdG8gZmluZCB0aGUgYW5nbGUgb2YgYSBjb21wbGV4IG51bWJlcj8iLCJvcHRpb25zIjpbIkEuIEl0IGF1dG9tYXRpY2FsbHkgY29udmVydHMgcmFkaWFucyB0byBkZWdyZWVzIiwiQi4gSXQgdXNlcyBib3RoIGNvbXBvbmVudHMgYW5kIGdpdmVzIHRoZSBjb3JyZWN0IHF1YWRyYW50IiwiQy4gSXQgYWx3YXlzIGdpdmVzIGEgcG9zaXRpdmUgYW5nbGUiLCJELiBJdCBjb21wdXRlcyBtYWduaXR1ZGUgYW5kIGFuZ2xlIGF0IHRoZSBzYW1lIHRpbWUiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJgYXRhbjJgIHVzZXMgdGhlIHNpZ25zIG9mIGJvdGggdGhlIGltYWdpbmFyeSBhbmQgcmVhbCBwYXJ0cywgc28gdGhlIGFuZ2xlIGxhbmRzIGluIHRoZSBwcm9wZXIgcXVhZHJhbnQuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiYGF0YW4yYCBkb2VzIG5vdCBjaGFuZ2UgdGhlIGFuZ2xlIHVuaXQ7IE1BVExBQiBzdGlsbCB3b3JrcyBpbiByYWRpYW5zIHVubGVzcyB5b3UgY29udmVydC4iLCJDIjoiQW5nbGVzIGNhbiBzdGlsbCBiZSBuZWdhdGl2ZSBkZXBlbmRpbmcgb24gdGhlIHF1YWRyYW50IGFuZCBjb252ZW50aW9uLiIsIkQiOiJgYXRhbjJgIGZpbmRzIGFuZ2xlIG9ubHksIG5vdCBtYWduaXR1ZGUuIn0sImhpbnQiOiJUaGluayBhYm91dCB3aGF0IGV4dHJhIGluZm9ybWF0aW9uIGlzIG5lZWRlZCB0byBkaXN0aW5ndWlzaCBxdWFkcmFudHMuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6Im9wZW5haS9ncHQtNS40LWltYWdlLTIiLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDNfcTMiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkEgc3R1ZGVudCByZXBvcnRzIGB6X2RlZyA9IGFuZ2xlKHopYCBmb3IgXFwoeiA9IC0zIC0gNGpcXCkgYW5kIHNheXMgdGhlIGFuc3dlciBpcyBpbiBkZWdyZWVzLiBDb3JyZWN0IHRoZSBzdGF0ZW1lbnQgaW4gb25lIG9yIHR3byBzZW50ZW5jZXMuIiwiaWRlYWxfYW5zd2VyIjoiYGFuZ2xlKHopYCByZXR1cm5zIHRoZSBwaGFzZSBpbiByYWRpYW5zLCBub3QgZGVncmVlcy4gVG8gY29udmVydCB0byBkZWdyZWVzLCB1c2UgYGFuZ2xlKHopKjE4MC9waWAuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBzdGF0ZSB0aGF0IGBhbmdsZSh6KWAgaXMgaW4gcmFkaWFucyIsIk11c3QgZ2l2ZSB0aGUgZGVncmVlIGNvbnZlcnNpb24gYGFuZ2xlKHopKjE4MC9waWAiLCJSZXNwb25zZSBzaG91bGQgY2xlYXJseSBjb3JyZWN0IHRoZSBzdHVkZW50J3MgdW5pdCBtaXN0YWtlIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3Mgd2hldGhlciB0aGUgc3R1ZGVudCByZW1lbWJlcnMgb25lIG9mIHRoZSBtb3N0IGNvbW1vbiBleGFtIGFuZCBjYWxjdWxhdG9yLW91dHB1dCB0cmFwczogd3JvbmcgdW5pdHMuIiwiaGludCI6Ik1BVExBQiBhbmdsZS1yZWxhdGVkIG91dHB1dHMgdXNlIHJhZGlhbnMgdW5sZXNzIHlvdSBleHBsaWNpdGx5IGNvbnZlcnQuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfV19XX0=" style="display:none;"></div>%%KC_END%%
