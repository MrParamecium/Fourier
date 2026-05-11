%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6InN1bW1hcnlfbWFwIiwicmF0aW9uYWxlIjoiVGhpcyBpcyBhIGNoYXB0ZXIgc3VtbWFyeSwgc28gdGhlIGJlc3QgdmlzdWFsIGFuY2hvciBpcyBhIGNvbXBhY3QgY2xhc3NpZmljYXRpb24gbWFwIHRoYXQgaGVscHMgc3R1ZGVudHMgY29ubmVjdCBzaWduYWwgY2xhc3Nlcywgb3BlcmF0aW9ucywgc3BlY2lhbCBzaWduYWxzLCBhbmQgc3lzdGVtIHByb3BlcnRpZXMuIiwiY3JhbSI6IlVzZSB0aGUgbWFwIHRvIG1lbW9yaXplIGZhc3QgZGVjaXNpb24gdGVzdHMgZm9yIGVuZXJneS9wb3dlciwgY2F1c2FsaXR5LCBsaW5lYXJpdHksIHRpbWUgaW52YXJpYW5jZSwgYW5kIHN0YWJpbGl0eS4iLCJzdGFuZGFyZCI6IlVzZSB0aGUgbWFwIGFzIGEgcmV2aWV3IG9yZ2FuaXplciBiZWZvcmUgbW92aW5nIGludG8gQ2hhcHRlciAyLiIsInRvcF9zY29yZSI6IlVzZSB0aGUgbWFwIHRvIGNvbXBhcmUgc2ltaWxhci1sb29raW5nIGNvbmNlcHRzIGFuZCBhdm9pZCBjbGFzc2lmaWNhdGlvbiB0cmFwcy4ifQ==" style="display:none;"></div>%%KC_END%%
# Chapter 1 Summary

> **Section Objective:** Tie together the vocabulary of Chapter 1 so you can classify signals and systems quickly, choose the right formulas, and recognize what each model description is telling you.

---

## Concepts In This Section

- Signals and systems
- Energy and power
- Signal classifications
- Basic signal operations
- Step, impulse, exponential, even, and odd signals
- System classifications
- Internal, external, and state-space descriptions

## 1. The core picture: signals carry information, systems process it

A **signal** is a set of data or information. In this chapter the independent variable is usually time, so a signal might be written as \(x(t)\) or \(x[n]\).

A **system** takes an input signal, processes it, and produces an output signal:

$$x(t) \longrightarrow \text{system} \longrightarrow y(t)$$

- \(x(t)\): input signal, the cause applied from outside
- \(y(t)\): output signal, also called the response
- A physical circuit, a mechanical device, or a software algorithm can all be systems
- The response may depend on both the external input and the system's internal conditions

**Quick example:** a low-pass filter is a system. The input is a noisy audio waveform, and the output is a smoother waveform with high-frequency components reduced.

## 2. Signal size: energy first, power if energy is infinite

For continuous-time signals, energy measures the total accumulated squared magnitude:

$$E_x = \int_{-\infty}^{\infty} |x(t)|^2\,dt$$

If this integral is finite, \(x(t)\) is an **energy signal**.

When energy is infinite, the useful size measure may be average power:

$$P_x = \lim_{T\to\infty}\frac{1}{2T}\int_{-T}^{T}|x(t)|^2\,dt$$

For a periodic signal with period \(T_0\), the average can be taken over one period:

$$P_x = \frac{1}{T_0}\int_{t_0}^{t_0+T_0}|x(t)|^2\,dt$$

**How to decide fast:**

- Finite-duration nonzero signals are usually energy signals.
- Nonzero periodic signals are usually power signals.
- A signal cannot be both an energy signal and a power signal.
- Some signals are neither, for example signals that grow without bound.

## 3. Signal classifications: ask separate questions

Do not treat the classifications as one single label. Each classification answers a different question.

**Continuous-time vs. discrete-time:** Is the signal defined for every time in a continuum, or only at selected instants?

- \(x(t)\) is continuous-time.
- \(x[n]\) is discrete-time.

**Analog vs. digital:** Can the amplitude vary continuously, or only take values from a finite set?

- A continuous-valued voltage is analog.
- A binary sequence is digital.

**Periodic vs. aperiodic:** Does the signal repeat after a positive period \(T_0\)?

$$x(t) = x(t+T_0)$$

The smallest positive \(T_0\) that works is the **fundamental period**.

**Everlasting vs. causal:** Does the signal exist forever in both time directions, or is it zero before \(t=0\)?

- Periodic signals are everlasting.
- A causal signal satisfies \(x(t)=0\) for \(t<0\).

**Deterministic vs. random:** Is the exact mathematical or graphical description known, or only probabilistic information such as mean and variance?

## 4. Signal operations: read the argument carefully

Most transformation mistakes come from reading \(x(t-a)\), \(x(at)\), and \(x(-t)\) too casually.

**Delay and advance**

$$x(t-T) \quad \text{is delayed by } T$$

$$x(t+T) \quad \text{is advanced by } T$$

If \(T>0\), \(x(t-T)\) shifts right, and \(x(t+T)\) shifts left.

**Compression and expansion**

$$x(at),\quad a>1 \quad \text{is time-compressed by } a$$

$$x(t/a),\quad a>1 \quad \text{is time-expanded by } a$$

**Time reversal**

$$x(-t)$$

Time reversal flips the graph around the vertical axis \(t=0\).

**Quick example:** if a pulse originally occupies \(0\le t\le 2\), then \(x(t-3)\) occupies \(3\le t\le 5\). The shape did not change; only its time location changed.

## 5. Special signals: step, impulse, exponential, even, and odd

The **unit step** \(u(t)\) is the basic switch for turning signals on and off. It is especially useful for causal signals and piecewise definitions.

The **unit impulse** \(\delta(t)\) is concentrated at a single instant and has unit area. Its key property is sampling:

$$\int_{-\infty}^{\infty}x(t)\delta(t-t_0)\,dt = x(t_0)$$

This is why the impulse is often used to pick out a value of a signal.

The exponential signal \(e^{st}\), where \(s\) may be complex, is a unifying form. Depending on \(s\), it can represent:

- a constant
- a growing or decaying exponential
- a sinusoid
- a sinusoid with exponential growth or decay

Even and odd signals describe symmetry:

$$x_e(t)=x_e(-t)$$

$$x_o(t)=-x_o(-t)$$

Every real signal can be decomposed as:

$$x(t)=x_e(t)+x_o(t)$$

where

$$x_e(t)=\frac{x(t)+x(-t)}{2},\qquad x_o(t)=\frac{x(t)-x(-t)}{2}$$

Useful symmetry facts:

- even times even is even
- odd times odd is even
- even times odd is odd
- the integral of an odd function over \([-a,a]\) is zero
- the integral of an even function over \([-a,a]\) is twice the integral over \([0,a]\)

## 6. System classifications: test the input-output rule

Systems are classified by how the output depends on the input, time, memory, and internal behavior.

**Linear vs. nonlinear**

A linear system satisfies superposition. If input \(x_1\) produces \(y_1\), and input \(x_2\) produces \(y_2\), then input \(a x_1 + b x_2\) produces \(a y_1 + b y_2\).

**Time-invariant vs. time-varying**

A time-invariant system behaves the same way regardless of when the input is applied. If delaying the input by \(T\) delays the output by the same \(T\), the system is time-invariant.

**Memoryless vs. dynamic**

A memoryless system uses only the present input value:

$$y(t)=f(x(t))$$

A dynamic system depends on past values, stored energy, or internal state.

**Causal vs. noncausal**

A causal system never needs future input values. A noncausal temporal system is not physically realizable in real time because it would require future knowledge.

**Continuous-time vs. discrete-time**

This depends on whether the input and output signals are continuous-time or discrete-time.

**Analog vs. digital**

This depends on whether the input and output amplitudes are continuous-valued or finite-valued.

**Invertible vs. noninvertible**

A system is invertible if the input can be uniquely recovered from the output.

**Stable vs. unstable**

In the BIBO sense, a system is stable if every bounded input produces a bounded output.

## 7. Internal, external, and state-space descriptions

An **external description** treats the system as seen from its input and output terminals. You apply an input and observe the output.

An **internal description** is derived from the structure inside the system, such as masses, springs, dampers, circuit components, or differential equations.

Often these descriptions are equivalent, but not always. If some internal behavior is uncontrollable or unobservable from the terminals, an external description may miss important internal dynamics.

A **state-space description** uses a set of state variables to summarize the internal condition of the system. An \(N\)th-order system can be represented using \(N\) first-order differential equations:

$$\dot{\mathbf{x}}(t)=f(\mathbf{x}(t),u(t),t)$$

$$y(t)=g(\mathbf{x}(t),u(t),t)$$

- \(\mathbf{x}(t)\): state vector
- \(u(t)\): input
- \(y(t)\): output
- The state tells you what the system must remember in order to predict future behavior

## Fast Review Checklist

1. To classify a signal, separately check time axis, amplitude axis, periodicity, causality, energy/power, and randomness.
2. To transform a signal, inspect the argument of \(x(\cdot)\): subtraction delays, addition advances, multiplication by \(a>1\) compresses, and a negative sign reverses time.
3. To use \(\delta(t)\), look for the sampling property.
4. To test linearity, use superposition.
5. To test time invariance, delay the input and see whether the output is delayed by the same amount.
6. To test causality, ask whether the output needs future input.
7. To test BIBO stability, ask whether bounded input always forces bounded output.

## Mini Practice

**Problem 1:** Is \(x(t)=\cos(4t)\) an energy signal or a power signal?

It is a power signal. It is periodic and nonzero forever, so its energy is infinite but its average power is finite.

**Problem 2:** What does \(x(2t+4)\) do to \(x(t)\)?

Rewrite the argument:

$$x(2t+4)=x(2(t+2))$$

The signal is time-compressed by \(2\) and shifted left by \(2\). A reliable method is to transform key time points by solving \(2t+4=\tau\).

**Problem 3:** Is \(y(t)=x^2(t)\) linear?

No. Squaring violates superposition:

$$\bigl(x_1(t)+x_2(t)\bigr)^2 \ne x_1^2(t)+x_2^2(t)$$

**Problem 4:** Is \(y(t)=x(t+1)\) causal?

No. The output at time \(t\) needs the input at future time \(t+1\).

## Key Takeaways

Chapter 1 gives the language used throughout signals and systems. The most important habit is to classify carefully rather than by intuition: separate time-axis questions from amplitude questions, signal-size questions from periodicity questions, and system-memory questions from causality questions. Once those distinctions are stable, later tools such as convolution, differential equations, and state-space models become much easier to place.
