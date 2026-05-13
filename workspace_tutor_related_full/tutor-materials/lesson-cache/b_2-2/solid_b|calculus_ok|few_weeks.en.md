# B.2-2 Sinusoids in Terms of Exponentials

## Quick Recap: What's a Sinusoid?

Before we dive into the new material, let's make sure we're comfortable with the basics.

A **sinusoid** is a signal of the form:

$$x(t) = C\cos(\omega_0 t + \theta)$$

where:
- **C** = amplitude (how tall the wave is)
- **ω₀** = radian frequency (how fast it oscillates), related to regular frequency by $$\omega_0 = 2\pi f_0$$
- **θ** = phase (where the wave "starts")
- **T₀** = period = $$\frac{1}{f_0} = \frac{2\pi}{\omega_0}$$ (how long one full cycle takes)

---

## Adding Two Sinusoids of the Same Frequency

Here's something really useful: **if you add two sinusoids that have the same frequency, you always get back a single sinusoid at that same frequency.** The amplitude and phase will change, but the frequency stays the same.

This comes from a trigonometric identity:

$$a\cos\omega_0 t + b\sin\omega_0 t = C\cos(\omega_0 t + \theta)$$

where:

$$\boxed{C = \sqrt{a^2 + b^2} \qquad \text{and} \qquad \theta = \tan^{-1}\!\left(\frac{-b}{a}\right)}$$

> 💡 **Handy trick:** Notice that $$C$$ and $$\theta$$ are just the **magnitude and angle** of the complex number $$a - jb$$. So if you convert $$a - jb$$ to polar form, you're done!

---

## Visualizing This With Phasors

A **phasor** is just an arrow (a vector) in the complex plane that represents a sinusoid:

- The **length** of the arrow = amplitude $$C$$
- The **angle** from the horizontal = phase $$\theta$$

So:
- $$a\cos\omega_0 t$$ → a horizontal arrow of length $$a$$ (angle = 0°)
- $$b\sin\omega_0 t = b\cos(\omega_0 t - 90°)$$ → a downward arrow of length $$b$$ (angle = −90°)

To add the two sinusoids, you just **add the arrows tip-to-tail** (like regular vector addition). The resulting arrow gives you $$C$$ and $$\theta$$ directly. Pretty neat!

---

## Worked Example: Part (a)

$$x(t) = \cos\omega_0 t - \sqrt{3}\sin\omega_0 t$$

**Step 1: Identify a and b.**

Matching to the form $$a\cos\omega_0 t + b\sin\omega_0 t$$:

$$a = 1, \qquad b = -\sqrt{3}$$

**Step 2: Find C.**

$$C = \sqrt{a^2 + b^2} = \sqrt{1^2 + (-\sqrt{3})^2} = \sqrt{1 + 3} = \sqrt{4} = 2$$

**Step 3: Find θ.**

$$\theta = \tan^{-1}\!\left(\frac{-b}{a}\right) = \tan^{-1}\!\left(\frac{\sqrt{3}}{1}\right) = 60°$$

**Result:**

$$\boxed{x(t) = 2\cos(\omega_0 t + 60°)}$$

> 🔍 **Double-check with complex numbers:** Form $$a - jb = 1 - j(-\sqrt{3}) = 1 + j\sqrt{3}$$. Converting to polar: magnitude = 2, angle = 60°. ✓

---

## Worked Example: Part (b)

$$x(t) = -3\cos\omega_0 t + 4\sin\omega_0 t$$

**Step 1: Identify a and b.**

$$a = -3, \qquad b = 4$$

**Step 2: Find C.**

$$C = \sqrt{(-3)^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5$$

**Step 3: Find θ.**

$$\theta = \tan^{-1}\!\left(\frac{-b}{a}\right) = \tan^{-1}\!\left(\frac{-4}{-3}\right)$$

> ⚠️ **Watch out!** Both $$a$$ and $$b$$ are negative here, which means the complex number $$a - jb = -3 - j4$$ sits in the **third quadrant** of the complex plane. A basic calculator will give you $$\tan^{-1}(4/3) \approx 53.1°$$, but the correct angle (in the third quadrant) is:

$$\theta = -180° + 53.1° = -126.9°$$

**Result:**

$$\boxed{x(t) = 5\cos(\omega_0 t - 126.9°)}$$

---

## Key Takeaways

| Concept | Formula |
|---|---|
| Period | $$T_0 = \frac{2\pi}{\omega_0}$$ |
| Combining sinusoids | $$a\cos\omega_0 t + b\sin\omega_0 t = C\cos(\omega_0 t + \theta)$$ |
| Amplitude | $$C = \sqrt{a^2+b^2}$$ |
| Phase | $$\theta = \angle(a - jb)$$ |

> 🧠 **Always** check which quadrant your complex number $$a - jb$$ falls in when computing $$\theta$$. Don't just blindly trust your calculator's $$\tan^{-1}$$ output!

---

## Quick-Check Questions

**Q1.** Express $$x(t) = 3\cos\omega_0 t + 3\sin\omega_0 t$$ as a single sinusoid $$C\cos(\omega_0 t + \theta)$$. What are $$C$$ and $$\theta$$?

**Q2.** A phasor representing $$5\sin\omega_0 t$$ points in which direction — upward or downward from the horizontal axis, and at what angle? *(Hint: rewrite $$\sin$$ as a shifted $$\cos$$ first.)*