%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImJvdGgiLCJyYXRpb25hbGUiOiJUaGlzIHNlY3Rpb24gdGVhY2hlcyBNQVRMQUIgY29tbWFuZCBzeW50YXggYW5kIGNvbXBsZXgtbnVtYmVyIG9wZXJhdGlvbnMuIFRoZSBwcmltYXJ5IHRlYWNoaW5nIHN1cmZhY2UgaXMgTGFUZVggZm9yIGZvcm11bGFzIGFuZCBNQVRMQUIgY29tbWFuZCBub3RhdGlvbi4gU3RhdGljIHJlZmVyZW5jZSB2aXN1YWxzIChjb21wbGV4IHBsYW5lLCBxdWFkcmFudCBkaWFncmFtKSBoZWxwIHN0dWRlbnRzIHZpc3VhbGl6ZSB3aHkgYXRhbjIgaXMgbmVjZXNzYXJ5IGFuZCB3aGF0IG1hZ25pdHVkZS9waGFzZSBtZWFuIGdlb21ldHJpY2FsbHkuIE5vIGludGVyYWN0aXZlIGRlbW8gaXMgbmVlZGVkIGJlY2F1c2UgdGhlIGNvbmNlcHRzIGFyZSBjb21tYW5kLWRyaXZlbiwgbm90IHBhcmFtZXRlci1kcml2ZW4uIiwiY3JhbSI6IlZpc3VhbHMgc2hvdWxkIGhlbHAgc3R1ZGVudHMgcXVpY2tseSByZWNvZ25pemU6ICgxKSB3aGF0IGVhY2ggTUFUTEFCIGNvbW1hbmQgZG9lcywgKDIpIHdoeSB8enwgPSDiiJooesK3eiopIHdvcmtzLCAoMykgd2h5IGF0YW4yIGlzIGJldHRlciB0aGFuIGF0YW4gZm9yIGFuZ2xlcy4gVXNlIGxhYmVsZWQgY29tcGxleC1wbGFuZSBkaWFncmFtIHRvIHNob3cgcXVhZHJhbnQgc2Vuc2l0aXZpdHkuIiwic3RhbmRhcmQiOiJWaXN1YWxzIHNob3VsZCBjbGFyaWZ5IHRoZSBnZW9tZXRyaWMgbWVhbmluZyBvZiBtYWduaXR1ZGUgYW5kIHBoYXNlLCBhbmQgc2hvdyB3aHkgdGhlIHRocmVlIG1hZ25pdHVkZSBtZXRob2RzIGFyZSBlcXVpdmFsZW50LiBPbmUgcmVwcmVzZW50YXRpdmUgd29ya2VkIGV4YW1wbGUgKHogPSAtMyAtIDRqKSBzaG91bGQgYmUgc2hvd24gYm90aCBpbiBNQVRMQUIgc3ludGF4IGFuZCBvbiBhIGNvbXBsZXggcGxhbmUuIiwidG9wX3Njb3JlIjoiVmlzdWFscyBzaG91bGQgZXhwb3NlIHRoZSBxdWFkcmFudCBpc3N1ZSBpbiBhdGFuIHZzIGF0YW4yLCBhbmQgaGlnaGxpZ2h0IHRoZSBzdWJ0bGUgZGlmZmVyZW5jZSBiZXR3ZWVuIGFuZ2xlKHopIGFuZCBhdGFuMihpbWFnKHopLCByZWFsKHopKS4gSW5jbHVkZSBhIG5vdGUgb24gd2h5IHxjb3MoeCl8IOKJpCAxIGZhaWxzIGZvciBjb21wbGV4IHguIn0=" style="display:none;"></div>%%KC_END%%
# B.7-2 Calculator Operations

> **Section Objective:** Learn to use MATLAB as a calculator for complex numbers, extracting components, computing magnitude and phase, and converting between angle units.

## Concepts In This Section

- complex number entry in MATLAB
- real and imaginary parts
- magnitude with abs
- phase with angle
- radians-to-degrees conversion
- atan2 quadrant awareness
- complex arguments in MATLAB functions

MATLAB treats complex numbers as naturally as real numbers, using the same arithmetic operators \(+, -, *, /, ^\). This section teaches how to extract the real and imaginary components of any complex number, compute its magnitude (distance from origin) and phase (angle from the positive real axis), and convert angles between radians and degrees. By the end of this section, you will be able to use MATLAB to analyze any complex number in seconds.

## 1. Creating and Extracting Complex Numbers

MATLAB predefines both \(i\) and \(j\) as \(\sqrt{-1}\), so you can write complex numbers directly in Cartesian coordinates. For example, \(z = -3 - 4j\) is valid syntax. Semicolons suppress output, allowing you to store results without printing them.

Once a complex number is created, use the \(\text{real}()\) function to extract the real part and the \(\text{imag}()\) function to extract the imaginary part (the real coefficient of \(j\), not including \(j\) itself).

$$z = a + jb$$
*In MATLAB, a complex number \(z\) is created by writing the real part \(a\), then \(+/-\) the imaginary part \(jb\), where \(j\) is the imaginary unit.*

### Worked Example: Extract Components

```
z = -3 - 4j;
z_real = real(z);
z_imag = imag(z);
```

Results: \(z_{\text{real}} = -3\), \(z_{\text{imag}} = -4\). These extracted values are now available for further calculations or analysis.

## 2. Magnitude (Modulus)

The magnitude of a complex number is the distance from the origin to the point \((a, b)\) on the complex plane. For \(z = -3 - 4j\), imagine a right triangle with legs of length 3 and 4; the hypotenuse has length 5, so \(|z| = 5\). MATLAB offers three equivalent ways to compute this distance.

$$|z| = \sqrt{a^2 + b^2}$$
*The magnitude of \(z = a + jb\) is the Euclidean distance from the origin to the point \((a, b)\).*

### Three Methods to Compute Magnitude

**Method 1:** Direct formula from components.
```
z_mag = \\sqrt(z_real^2 + z_imag^2);
```

**Method 2:** Using the conjugate property \(|z|^2 = z \cdot z^*\).
```
z_mag = \\sqrt(z*conj(z));
```

**Method 3:** Direct MATLAB command (simplest).
```
z_mag = abs(z);
```

For \(z = -3 - 4j\), all three methods return \(5\). Use \(\text{abs}(z)\) in practice—it is the most concise.

*The magnitude |z| = 5 is the hypotenuse of the right triangle with legs 3 and 4.*

## 3. Phase (Angle)

The phase of a complex number is the angle \(\theta\) measured counterclockwise from the positive real axis to the point \(z\) on the complex plane. For \(z = -3 - 4j\), the angle is in the third quadrant, so \(\theta \approx -2.2143\) radians or \(-126.87°\). MATLAB returns angles in radians by default.

$$\theta = \angle z = \text{atan2}(b, a)$$
*The phase \(\theta\) of \(z = a + jb\) is the angle from the positive real axis to the point \((a, b)\), computed using the two-argument arctangent function \(\text{atan2}(b, a)\).*

### Computing Phase and Converting to Degrees

```
z_rad = angle(z);
z_deg = angle(z)*180/pi;
```

For \(z = -3 - 4j\): \(z_{\text{rad}} \approx -2.2143\) and \(z_{\text{deg}} \approx -126.87°\). MATLAB predefines \(\pi\) as the constant `pi`.

## 4. Why atan2 Is Better Than atan

A single-argument arctangent \(\text{atan}(b/a)\) cannot distinguish quadrants: \(\text{atan}(-4/-3)\) and \(\text{atan}(4/3)\) both return the same value, even though \(z_1 = -3 - 4j\) (third quadrant) and \(z_2 = 3 + 4j\) (first quadrant) are in different quadrants.

The two-argument \(\text{atan2}(b, a)\) uses both the sign of \(a\) and the sign of \(b\) to return the correct quadrant-aware angle. For \(z = -3 - 4j\), \(\text{atan2}(-4, -3)\) correctly returns \(-2.2143\) radians (third quadrant), not the ambiguous first-quadrant result.

*atan2 correctly identifies the quadrant by using both the sign of the real part and the sign of the imaginary part.*

## 5. Worked Example: Magnitude and Phase Together

For \(z = -3 - 4j\):

```
z_mag = abs(z);        % Returns 5
z_rad = angle(z);      % Returns -2.2143
z_deg = angle(z)*180/pi;  % Returns -126.8699
```

Conclusion: \(z = -3 - 4j\) has magnitude \(5\) and phase \(-126.87°\), or equivalently \(z = 5 \angle -126.87°\).

## 6. Complex Arguments in Trigonometric Functions

MATLAB supports a full suite of trigonometric functions (\(\sin\), \(\cos\), \(\tan\), \(\arcsin\), \(\arccos\), \(\arctan\), and hyperbolic variants) that accept complex arguments. However, some familiar rules break down for complex inputs:

- \(|\cos(x)| \leq 1\) is true for real \(x\) but **false** for complex \(x\).
- \(\ln(-1) = j\pi\) is possible for complex numbers (the complex logarithm).

These subtleties will be explored in later sections. For now, remember that complex arithmetic is more general than real arithmetic.

---
**📌 Key Takeaways**
- MATLAB treats complex numbers naturally: create with \(z = a + jb\), extract with \(\text{real}(z)\) and \(\text{imag}(z)\).
- Magnitude \(|z| = \sqrt{a^2 + b^2}\) can be computed three ways: \(\sqrt{z_{\text{real}}^2 + z_{\text{imag}}^2}\), \(\sqrt{z \cdot \text{conj}(z)}\), or \(\text{abs}(z)\) (simplest).
- Phase \(\theta = \text{atan2}(b, a)\) in radians; convert to degrees by multiplying by \(180/\pi\). Use \(\text{atan2}\), not \(\text{atan}\), to handle all quadrants correctly.

*In the next section, we will explore MATLAB vector operations and array indexing, extending these scalar operations to collections of numbers.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImNvbXBsZXhfY3JlYXRpb25fZXh0cmFjdGlvbiIsImxhYmVsIjoiQ3JlYXRpbmcgYW5kIGV4dHJhY3RpbmcgY29tcGxleCBudW1iZXJzIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJbiBNQVRMQUIsIHdoaWNoIGNvbW1hbmQgY29ycmVjdGx5IGV4dHJhY3RzIHRoZSBpbWFnaW5hcnkgcGFydCBvZiBcXCh6ID0gNSArIDNqXFwpPyIsIm9wdGlvbnMiOlsiQS4gcmVhbCh6KSIsIkIuIGltYWcoeikiLCJDLiBhYnMoeikiLCJELiBhbmdsZSh6KSJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBcXChcXHRleHR7aW1hZ30oKVxcKSBmdW5jdGlvbiByZXR1cm5zIHRoZSByZWFsIGNvZWZmaWNpZW50IG9mIFxcKGpcXCksIHdoaWNoIGlzIFxcKDNcXCkuIFRoZSBcXChcXHRleHR7cmVhbH0oKVxcKSBmdW5jdGlvbiByZXR1cm5zIFxcKDVcXCksIFxcKFxcdGV4dHthYnN9KClcXCkgcmV0dXJucyB0aGUgbWFnbml0dWRlLCBhbmQgXFwoXFx0ZXh0e2FuZ2xlfSgpXFwpIHJldHVybnMgdGhlIHBoYXNlLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlxcKFxcdGV4dHtyZWFsfSh6KVxcKSBleHRyYWN0cyB0aGUgcmVhbCBwYXJ0LCBub3QgdGhlIGltYWdpbmFyeSBwYXJ0LiIsIkMiOiJcXChcXHRleHR7YWJzfSh6KVxcKSBjb21wdXRlcyB0aGUgbWFnbml0dWRlIFxcKHx6fFxcKSwgbm90IHRoZSBpbWFnaW5hcnkgcGFydC4iLCJEIjoiXFwoXFx0ZXh0e2FuZ2xlfSh6KVxcKSBjb21wdXRlcyB0aGUgcGhhc2UsIG5vdCB0aGUgaW1hZ2luYXJ5IHBhcnQuIn0sImhpbnQiOiJXaGljaCBmdW5jdGlvbiBuYW1lIG1hdGNoZXMgJ2ltYWdpbmFyeSc/IiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiV3JpdGUgdGhlIE1BVExBQiBjb21tYW5kIHRvIGNyZWF0ZSB0aGUgY29tcGxleCBudW1iZXIgXFwoeiA9IDIgLSA1alxcKSBhbmQgZXh0cmFjdCBib3RoIGl0cyByZWFsIGFuZCBpbWFnaW5hcnkgcGFydHMgb24gYSBzaW5nbGUgbGluZSB1c2luZyBzZW1pY29sb25zLiIsImlkZWFsX2Fuc3dlciI6InogPSAyIC0gNWo7IHpfcmVhbCA9IHJlYWwoeik7IHpfaW1hZyA9IGltYWcoeik7IiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCB1c2UgY29ycmVjdCBzeW50YXggZm9yIGNvbXBsZXggbnVtYmVyOiAyIC0gNWoiLCJNdXN0IHVzZSByZWFsKCkgYW5kIGltYWcoKSBmdW5jdGlvbnMgY29ycmVjdGx5IiwiTXVzdCB1c2Ugc2VtaWNvbG9ucyB0byBzdXBwcmVzcyBvdXRwdXQiLCJNYXkgYXNzaWduIHRvIHZhcmlhYmxlcyBvciBqdXN0IGNhbGwgZnVuY3Rpb25zIl0sImV4cGxhbmF0aW9uIjoiVGhpcyB0ZXN0cyB3aGV0aGVyIHRoZSBzdHVkZW50IGNhbiB3cml0ZSB2YWxpZCBNQVRMQUIgc3ludGF4IGFuZCB1bmRlcnN0YW5kcyB0aGF0IHNlbWljb2xvbnMgYWxsb3cgbXVsdGlwbGUgY29tbWFuZHMgb24gb25lIGxpbmUuIiwiaGludCI6IlVzZSBzZW1pY29sb25zIGJldHdlZW4gY29tbWFuZHMuIFRoZSBpbWFnaW5hcnkgdW5pdCBpcyBqLCBub3QgaS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJtYWduaXR1ZGVfY29tcHV0YXRpb24iLCJsYWJlbCI6IkNvbXB1dGluZyBtYWduaXR1ZGUgdXNpbmcgdGhyZWUgbWV0aG9kcyIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMl9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIFxcKHogPSAtMyAtIDRqXFwpLCB3aGljaCBNQVRMQUIgY29tbWFuZCBpcyB0aGUgc2ltcGxlc3Qgd2F5IHRvIGNvbXB1dGUgdGhlIG1hZ25pdHVkZT8iLCJvcHRpb25zIjpbIkEuIHNxcnQoel9yZWFsXjIgKyB6X2ltYWdeMikiLCJCLiBzcXJ0KHoqY29uaih6KSkiLCJDLiBhYnMoeikiLCJELiBhbmdsZSh6KSJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlxcKFxcdGV4dHthYnN9KHopXFwpIGlzIHRoZSBkaXJlY3QgTUFUTEFCIGNvbW1hbmQgZm9yIG1hZ25pdHVkZS4gT3B0aW9ucyBBIGFuZCBCIGFyZSBlcXVpdmFsZW50IGJ1dCBtb3JlIHZlcmJvc2UuIE9wdGlvbiBEIGNvbXB1dGVzIHBoYXNlLCBub3QgbWFnbml0dWRlLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgbWV0aG9kIHdvcmtzIGJ1dCByZXF1aXJlcyBleHRyYWN0aW5nIHJlYWwgYW5kIGltYWdpbmFyeSBwYXJ0cyBmaXJzdC4iLCJCIjoiVGhpcyBtZXRob2Qgd29ya3MgYnV0IHVzZXMgdGhlIGNvbmp1Z2F0ZSBwcm9wZXJ0eSwgd2hpY2ggaXMgbW9yZSBjb21wbGV4IHRoYW4gbmVlZGVkLiIsIkQiOiJcXChcXHRleHR7YW5nbGV9KHopXFwpIHJldHVybnMgdGhlIHBoYXNlLCBub3QgdGhlIG1hZ25pdHVkZS4ifSwiaGludCI6IldoaWNoIGZ1bmN0aW9uIG5hbWUgc3VnZ2VzdHMgJ2Fic29sdXRlIHZhbHVlJyBvciAnbWFnbml0dWRlJz8iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3AyX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaHkgZG9lcyB0aGUgbWV0aG9kIFxcKFxcc3FydHt6IFxcY2RvdCBcXHRleHR7Y29uan0oeil9XFwpIGNvbXB1dGUgdGhlIG1hZ25pdHVkZSBvZiBcXCh6XFwpPyIsIm9wdGlvbnMiOlsiQS4gQmVjYXVzZSBcXCh6IFxcY2RvdCBcXHRleHR7Y29uan0oeikgPSB8enxeMlxcKSIsIkIuIEJlY2F1c2UgXFwoXFx0ZXh0e2Nvbmp9KHopXFwpIHJldmVyc2VzIHRoZSBzaWduIG9mIHRoZSBpbWFnaW5hcnkgcGFydCIsIkMuIEJlY2F1c2UgbXVsdGlwbGljYXRpb24gYWx3YXlzIGdpdmVzIGEgcmVhbCByZXN1bHQiLCJELiBCZWNhdXNlIE1BVExBQiByZXF1aXJlcyB0aGUgY29uanVnYXRlIGZvciBtYWduaXR1ZGUiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJUaGUgcHJvcGVydHkgXFwoeiBcXGNkb3Qgel4qID0gfHp8XjJcXCkgaXMgYSBmdW5kYW1lbnRhbCBpZGVudGl0eS4gRm9yIFxcKHogPSBhICsgamJcXCksIFxcKHogXFxjZG90IHpeKiA9IChhICsgamIpKGEgLSBqYikgPSBhXjIgKyBiXjIgPSB8enxeMlxcKS4gT3B0aW9ucyBCLCBDLCBhbmQgRCBhcmUgZWl0aGVyIGluY29tcGxldGUgb3IgaW5jb3JyZWN0LiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQiI6IldoaWxlIFxcKFxcdGV4dHtjb25qfSh6KVxcKSBkb2VzIHJldmVyc2UgdGhlIGltYWdpbmFyeSBwYXJ0LCB0aGF0IGFsb25lIGRvZXMgbm90IGV4cGxhaW4gd2h5IHRoZSBwcm9kdWN0IGdpdmVzIG1hZ25pdHVkZS4iLCJDIjoiVGhlIHByb2R1Y3QgXFwoeiBcXGNkb3QgXFx0ZXh0e2Nvbmp9KHopXFwpIGlzIHJlYWwsIGJ1dCB0aGF0IGlzIGEgY29uc2VxdWVuY2Ugb2YgdGhlIGlkZW50aXR5LCBub3QgdGhlIHJlYXNvbi4iLCJEIjoiTUFUTEFCIGRvZXMgbm90IHJlcXVpcmUgdGhlIGNvbmp1Z2F0ZTsgXFwoXFx0ZXh0e2Fic30oeilcXCkgaXMgc2ltcGxlci4ifSwiaGludCI6IlJlY2FsbCB0aGUgaWRlbnRpdHkgXFwofHp8XjIgPSB6IFxcY2RvdCB6XipcXCkuIFdoYXQgaXMgXFwoeiBcXGNkb3Qgel4qXFwpIGZvciBcXCh6ID0gYSArIGpiXFwpPyIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX0seyJpZCI6InBoYXNlX2NvbXB1dGF0aW9uIiwibGFiZWwiOiJDb21wdXRpbmcgcGhhc2UgYW5kIGNvbnZlcnRpbmcgYmV0d2VlbiByYWRpYW5zIGFuZCBkZWdyZWVzIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjF9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AzX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJGb3IgXFwoeiA9IC0zIC0gNGpcXCksIHRoZSBcXChcXHRleHR7YW5nbGV9KClcXCkgY29tbWFuZCByZXR1cm5zIFxcKC0yLjIxNDNcXCkgcmFkaWFucy4gV2hhdCBpcyB0aGUgZXF1aXZhbGVudCBhbmdsZSBpbiBkZWdyZWVzPyIsIm9wdGlvbnMiOlsiQS4gLTEyNi44N8KwIiwiQi4gLTUzLjEzwrAiLCJDLiAxMjYuODfCsCIsIkQuIDUzLjEzwrAiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJUbyBjb252ZXJ0IHJhZGlhbnMgdG8gZGVncmVlcywgbXVsdGlwbHkgYnkgXFwoMTgwL1xccGlcXCkuIFNvIFxcKC0yLjIxNDMgXFx0aW1lcyAxODAvXFxwaSBcXGFwcHJveCAtMTI2Ljg3wrBcXCkuIFRoZSBuZWdhdGl2ZSBzaWduIGluZGljYXRlcyB0aGUgdGhpcmQgcXVhZHJhbnQuIE9wdGlvbnMgQiBhbmQgRCBhcmUgdGhlIHJlZmVyZW5jZSBhbmdsZSwgYW5kIG9wdGlvbiBDIGhhcyB0aGUgd3Jvbmcgc2lnbi4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJUaGlzIGlzIHRoZSByZWZlcmVuY2UgYW5nbGUgaW4gdGhlIGZpcnN0IHF1YWRyYW50LCBub3QgdGhlIGFuZ2xlIGluIHRoZSB0aGlyZCBxdWFkcmFudC4iLCJDIjoiVGhpcyBoYXMgdGhlIHdyb25nIHNpZ247IHRoZSBhbmdsZSBpcyBuZWdhdGl2ZSBiZWNhdXNlIFxcKHpcXCkgaXMgaW4gdGhlIHRoaXJkIHF1YWRyYW50LiIsIkQiOiJUaGlzIGlzIHRoZSByZWZlcmVuY2UgYW5nbGUsIG5vdCB0aGUgYWN0dWFsIGFuZ2xlLiJ9LCJoaW50IjoiTXVsdGlwbHkgdGhlIHJhZGlhbiBhbmdsZSBieSBcXCgxODAvXFxwaVxcKS4gUmVtZW1iZXIgdGhhdCBcXCh6ID0gLTMgLSA0alxcKSBpcyBpbiB0aGUgdGhpcmQgcXVhZHJhbnQsIHNvIHRoZSBhbmdsZSBzaG91bGQgYmUgbmVnYXRpdmUgb3IgYmV0d2VlbiBcXCgxODDCsFxcKSBhbmQgXFwoMjcwwrBcXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX0seyJpZCI6ImtwM19xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2h5IGlzIFxcKFxcdGV4dHthdGFuMn0oel97XFx0ZXh0e2ltYWd9fSwgel97XFx0ZXh0e3JlYWx9fSlcXCkgYmV0dGVyIHRoYW4gXFwoXFx0ZXh0e2F0YW59KHpfe1xcdGV4dHtpbWFnfX0vel97XFx0ZXh0e3JlYWx9fSlcXCkgZm9yIGNvbXB1dGluZyB0aGUgYW5nbGUgb2YgXFwoeiA9IGEgKyBqYlxcKT8iLCJvcHRpb25zIjpbIkEuIGF0YW4yIGlzIGZhc3RlciB0aGFuIGF0YW4iLCJCLiBhdGFuMiB1c2VzIGJvdGggdGhlIHNpZ24gb2YgYSBhbmQgdGhlIHNpZ24gb2YgYiB0byBkZXRlcm1pbmUgdGhlIGNvcnJlY3QgcXVhZHJhbnQiLCJDLiBhdGFuMiBhbHdheXMgcmV0dXJucyBhIHBvc2l0aXZlIGFuZ2xlIiwiRC4gYXRhbjIgd29ya3Mgb25seSBmb3IgY29tcGxleCBudW1iZXJzIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIHR3by1hcmd1bWVudCBcXChcXHRleHR7YXRhbjJ9KGIsIGEpXFwpIHVzZXMgYm90aCBjb21wb25lbnRzIHRvIGRldGVybWluZSB3aGljaCBxdWFkcmFudCB0aGUgYW5nbGUgaXMgaW4uIEEgc2luZ2xlLWFyZ3VtZW50IFxcKFxcdGV4dHthdGFufShiL2EpXFwpIGNhbm5vdCBkaXN0aW5ndWlzaCBiZXR3ZWVuIHF1YWRyYW50cyBiZWNhdXNlIHRoZSByYXRpbyBcXChiL2FcXCkgaXMgdGhlIHNhbWUgaW4gb3Bwb3NpdGUgcXVhZHJhbnRzLiBPcHRpb25zIEEsIEMsIGFuZCBEIGFyZSBpbmNvcnJlY3QuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiU3BlZWQgaXMgbm90IHRoZSBtYWluIHJlYXNvbjsgY29ycmVjdG5lc3MgaXMuIiwiQyI6IlxcKFxcdGV4dHthdGFuMn1cXCkgY2FuIHJldHVybiBuZWdhdGl2ZSBhbmdsZXMsIGVzcGVjaWFsbHkgZm9yIHBvaW50cyBpbiB0aGUgdGhpcmQgYW5kIGZvdXJ0aCBxdWFkcmFudHMuIiwiRCI6IlxcKFxcdGV4dHthdGFuMn1cXCkgd29ya3MgZm9yIGFueSByZWFsIG51bWJlcnMsIG5vdCBqdXN0IGNvbXBsZXggbnVtYmVycy4ifSwiaGludCI6IkNvbnNpZGVyIFxcKHpfMSA9IDMgKyA0alxcKSBhbmQgXFwoel8yID0gLTMgLSA0alxcKS4gQm90aCBoYXZlIHRoZSBzYW1lIHJhdGlvIFxcKGIvYVxcKSwgYnV0IHRoZWlyIGFuZ2xlcyBhcmUgZGlmZmVyZW50LiBXaGljaCBmdW5jdGlvbiBoYW5kbGVzIHRoaXMgY29ycmVjdGx5PyIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJxdWFkcmFudF9kaWFncmFtX3dpdGhfYW5nbGVzIiwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfSx7ImlkIjoid29ya2VkX2V4YW1wbGVfaW50ZWdyYXRpb24iLCJsYWJlbCI6IkNvbWJpbmluZyBtYWduaXR1ZGUgYW5kIHBoYXNlIGluIG9uZSBwcm9ibGVtIiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoibWVkaXVtIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNF9xMSIsInR5cGUiOiJzaG9ydF9hbnN3ZXIiLCJzdGVtIjoiRm9yIFxcKHogPSAxICsgalxcKSwgd3JpdGUgTUFUTEFCIGNvbW1hbmRzIHRvIGNvbXB1dGUgdGhlIG1hZ25pdHVkZSBhbmQgcGhhc2UgaW4gcmFkaWFucy4gVGhlbiBjb252ZXJ0IHRoZSBwaGFzZSB0byBkZWdyZWVzLiIsImlkZWFsX2Fuc3dlciI6InogPSAxICsgajsgel9tYWcgPSBhYnMoeik7IHpfcmFkID0gYW5nbGUoeik7IHpfZGVnID0gel9yYWQqMTgwL3BpOyBSZXN1bHRzOiB6X21hZyDiiYggMS40MTQsIHpfcmFkIOKJiCAwLjc4NTQsIHpfZGVnIOKJiCA0NcKwIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCB1c2UgYWJzKHopIG9yIGVxdWl2YWxlbnQgZm9yIG1hZ25pdHVkZSIsIk11c3QgdXNlIGFuZ2xlKHopIGZvciBwaGFzZSBpbiByYWRpYW5zIiwiTXVzdCBtdWx0aXBseSBieSAxODAvcGkgdG8gY29udmVydCB0byBkZWdyZWVzIiwiU2hvdWxkIHNob3cgb3Igc3RhdGUgdGhlIG51bWVyaWNhbCByZXN1bHRzIl0sImV4cGxhbmF0aW9uIjoiVGhpcyB0ZXN0cyB3aGV0aGVyIHRoZSBzdHVkZW50IGNhbiBhcHBseSBib3RoIG1hZ25pdHVkZSBhbmQgcGhhc2UgY29tbWFuZHMgaW4gc2VxdWVuY2UgYW5kIHBlcmZvcm0gdGhlIHJhZGlhbi10by1kZWdyZWUgY29udmVyc2lvbi4iLCJoaW50IjoiVXNlIGFicygpIGZvciBtYWduaXR1ZGUsIGFuZ2xlKCkgZm9yIHBoYXNlIGluIHJhZGlhbnMsIGFuZCBtdWx0aXBseSBieSAxODAvcGkgdG8gY29udmVydCB0byBkZWdyZWVzLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
