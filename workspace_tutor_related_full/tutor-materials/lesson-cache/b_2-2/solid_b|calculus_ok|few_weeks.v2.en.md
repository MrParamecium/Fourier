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

Think of a sinusoid like a spinning wheel — it completes one full rotation every T₀ seconds, and f₀ tells you how many full rotations happen per second.

---

## Adding Two Sinusoids of the Same Frequency

Here's something really useful: **if you add two sinusoids that have the same frequency, you always get back a single sinusoid at that same frequency.** The amplitude and phase will change, but the frequency stays the same.

This comes from a trigonometric identity:

$$a\cos\omega_0 t + b\sin\omega_0 t = C\cos(\omega_0 t + \theta)$$

where:

$$\boxed{C = \sqrt{a^2 + b^2} \qquad \text{and} \qquad \theta = \tan^{-1}\!\left(\frac{-b}{a}\right)}$$

### 🔑 A Handy Trick to Remember This

Notice that $$C$$ and $$\theta$$ are exactly the **magnitude and angle** of the complex number $$a - jb$$. So if you write:

$$a - jb = Ce^{j\theta}$$

...then converting $$a - jb$$ to polar form immediately gives you $$C$$ and $$\theta$$. This is a huge time-saver!

---

## Phasors: A Visual Way to Add Sinusoids

A **phasor** is just an arrow (vector) in the complex plane that represents a sinusoid:

- The **length** of the arrow = amplitude $$C$$
- The **angle** of the arrow from the horizontal = phase $$\theta$$

So:
- $$a\cos\omega_0 t$$ → a horizontal arrow of length $$a$$ (angle = 0°)
- $$b\sin\omega_0 t = b\cos(\omega_0 t - 90°)$$ → a downward arrow of length $$b$$ (angle = −90°)

To add two sinusoids, you just **add their phasor arrows tip-to-tail**, like adding vectors. The resulting arrow gives you the amplitude and phase of the combined sinusoid.

---

## Worked Example: Part (a)

$$x(t) = \cos\omega_0 t - \sqrt{3}\sin\omega_0 t$$

**Step 1:** Identify $$a$$ and $$b$$

Here, $$a = 1$$ and $$b = -\sqrt{3}$$

**Step 2:** Find the amplitude $$C$$

$$C = \sqrt{a^2 + b^2} = \sqrt{1^2 + (-\sqrt{3})^2} = \sqrt{1 + 3} = \sqrt{4} = 2$$

**Step 3:** Find the phase $$\theta$$

$$\theta = \tan^{-1}\!\left(\frac{-b}{a}\right) = \tan^{-1}\!\left(\frac{\sqrt{3}}{1}\right) = 60°$$

**Result:**

$$\boxed{x(t) = 2\cos(\omega_0 t + 60°)}$$

> 💡 **Check with the complex number trick:** $$a - jb = 1 + j\sqrt{3}$$. Converting to polar: magnitude = 2, angle = 60°. ✅ Same answer!

---

## Worked Example: Part (b)

$$x(t) = -3\cos\omega_0 t + 4\sin\omega_0 t$$

**Step 1:** Identify $$a$$ and $$b$$

Here, $$a = -3$$ and $$b = 4$$

**Step 2:** Find the amplitude $$C$$

$$C = \sqrt{(-3)^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5$$

**Step 3:** Find the phase $$\theta$$

$$\theta = \tan^{-1}\!\left(\frac{-b}{a}\right) = \tan^{-1}\!\left(\frac{-4}{-3}\right)$$

> ⚠️ **Watch out!** Both $$a$$ and $$b$$ are negative here, which means the phasor points into the **third quadrant** (both components negative). A calculator will give you $$\tan^{-1}(4/3) \approx 53.1°$$, but that's in the wrong quadrant! The correct angle is:

$$\theta = 53.1° - 180° = -126.9°$$

**Result:**

$$\boxed{x(t) = 5\cos(\omega_0 t - 126.9°)}$$

---

## Key Takeaways

| Concept | What It Means |
|---|---|
| Same-frequency sinusoids always add to a sinusoid | The frequency never changes when you add |
| $$C = \sqrt{a^2+b^2}$$ | Amplitude of the result |
| $$\theta = \tan^{-1}(-b/a)$$ | Phase of the result |
| Phasors | Visual arrows that make addition geometric |
| $$a - jb = Ce^{j\theta}$$ | Shortcut using complex numbers |

---

## ✅ Quick-Check Questions

**Question 1:** Given $$x(t) = 3\cos\omega_0 t + 3\sin\omega_0 t$$, what are the amplitude $$C$$ and phase $$\theta$$ of the equivalent single sinusoid? *(Hint: identify $$a$$ and $$b$$ first.)*

**Question 2:** A phasor representing $$\cos\omega_0 t$$ points horizontally to the right. In which direction does the phasor for $$\sin\omega_0 t$$ point, and why?