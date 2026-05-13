# Chapter 1 HW2 Distillation

Source list:
- Assignment selector PDF: `/Users/chenghaoxiang/Desktop/HW2/HW2_05_15.pdf`
- Extra assigned-problem screenshots: `/Users/chenghaoxiang/Desktop/HW2/截屏2026-05-11 16.39.36.png`, `/Users/chenghaoxiang/Desktop/HW2/截屏2026-05-11 16.39.58.png`, `/Users/chenghaoxiang/Desktop/HW2/截屏2026-05-11 16.40.12.png`

Scope: `Chapter 1: Introduction to Signals and Systems`

## Stitched Assigned Problem Set

The PDF provides the main Chapter 1 assignment list. The three screenshots add only the selected `1.7-*` subparts listed by Harrison.

Assigned problems:
1. `1.1-3 (a)` — energy of two signals and of `x(t)+y(t)`, `x(t)-y(t)`
2. `1.1-4` — power and rms of a periodic signal and scaled/sign-changed versions
3. `1.1-6 (c)` — power/rms of `(10 + 2 sin 3t) cos 10t`
4. `1.3-3` — sketch `f(t-4)`, `f(t/1.5)`, `f(-t)`, `f(2t-4)`, `f(2-t)`
5. `1.4-1 (b), (d)` — sketch signals built with unit-step windows
6. `1.4-2` — express plotted signals as one formula valid for all `t`
7. `1.4-4 (a), (c), (f)` — simplify products with impulse functions
8. `1.4-5 (b), (d), (e)` — evaluate impulse-sifting integrals
9. `1.4-6` — differentiate plotted signals and identify impulse behavior
10. `1.4-7` — integrate a plotted signal from `-infinity` to `t`
11. `1.4-11` — locate complex frequencies of exponentially varying sinusoids
12. `1.5-1 (b), (f)` — even/odd decomposition of `t u(t)` and `cos(omega_0 t)`
13. `1.7-1 (a), (c), (e), (g)` — classify linear vs nonlinear systems
14. `1.7-2 (a), (c), (e), (f)` — classify time-invariant vs time-varying systems
15. `1.7-7 (b), (c), (d)` — classify causal vs noncausal systems
16. `1.7-8 (a), (b), (c)` — classify invertible vs noninvertible systems and find inverse relations when possible

## Why This Matters

HW2 is the first strong Chapter 1 exam signal. It shows that the instructor is not mainly testing memorized definitions. The tested skill is applying definitions to concrete signals and systems: compute size measures, transform/sketch signals, manipulate step/impulse functions, decompose symmetry, and test system properties from input-output equations.

The homework heavily rewards procedural recognition:
- See a signal expression and know how it moves, scales, gates, differentiates, or integrates.
- See an impulse expression and immediately apply the sifting rule at the correct location.
- See a system equation and test the exact property, not the superficial appearance of the equation.

## High-Priority Concepts

1. Signal energy, power, and rms
2. Orthogonality/cross-term logic when evaluating energy or average power
3. Time shifting, time scaling, time reversal, and combined transformations
4. Unit-step gating and rectangular windows
5. Writing piecewise/plotted signals as compact expressions
6. Impulse sifting: `g(t) delta(t-a) = g(a) delta(t-a)`
7. Impulse integrals and correct impulse location
8. Differentiating discontinuous signals, including impulse terms at jumps
9. Running integrals of signals and accumulated area
10. Complex frequency location for `e^{sigma t} cos(omega t)`
11. Even and odd signal decomposition
12. Linearity of systems: additivity + homogeneity, with zero-input offset traps
13. Time invariance vs time-varying behavior under input delay
14. Causality: dependence on present/past vs future input values
15. Invertibility: whether the input can be uniquely recovered from the output

## High-Priority Problem Types

1. Compute energy of combinations such as `x+y` and `x-y`
2. Compute power/rms of periodic and scaled signals
3. Sketch transformed signals from a graph
4. Convert a sketch into unit-step or piecewise formula form
5. Simplify impulse products by evaluating the multiplier at the impulse support
6. Evaluate impulse integrals using the correct root/location of the delta argument
7. Differentiate piecewise signals and account for impulses at discontinuities
8. Integrate a plotted signal and sketch the accumulated-area result
9. Place complex frequencies `sigma +/- j omega` in the complex plane
10. Compute even/odd components with `x_e(t) = [x(t)+x(-t)]/2` and `x_o(t) = [x(t)-x(-t)]/2`
11. Test linearity from equations involving `f^2`, constants, `(dy/dt)^2`, or `f df/dt`
12. Test time invariance for delay, scaling, fixed-limit integration, derivative-square, and explicit time dependence
13. Test causality for `f(-t)` and `f(a t)` under `a>1` or `a<1`
14. Find inverse systems for integration, time scaling/shifting, and powers when invertible

## What The Homework Implies About Exam Weighting

- Heavy weight on signal operations and graph literacy.
- Heavy weight on impulse/step manipulation.
- Heavy weight on system-property classification, especially definition-based reasoning.
- Medium weight on energy/power/rms computation.
- Medium weight on even/odd decomposition.
- Medium weight on complex-frequency interpretation.
- Low weight on long conceptual prose without calculation or classification.

## Required Explanation Bias For Chapter 1 Lessons

When generating Chapter 1 lessons, bias toward:
1. Definition -> test procedure -> small worked example.
2. More examples than prose for transformations and system properties.
3. Visual/graph reasoning whenever the topic involves sketching or time operations.
4. Formula-first clarity for energy, power, rms, even/odd decomposition, and impulse rules.
5. Explicit trap warnings for every property test: linearity, time invariance, causality, invertibility.
6. Section/topic filtering: use only the homework topics relevant to the current lesson section.

## Required Example Patterns

1. Energy of `x(t)+y(t)` and `x(t)-y(t)`, including cross-term interpretation.
2. Power/rms under `-f(t)`, `2f(t)`, and `c f(t)`.
3. Sketch `f(t-a)`, `f(t/a)`, `f(-t)`, and combined forms like `f(2t-4)`.
4. Write a gated signal with `u(t-a)-u(t-b)`.
5. Simplify `g(t) delta(t-a)` by substituting `t=a`.
6. Evaluate `integral f(tau) delta(t-tau) d tau` and shifted impulse variants.
7. Differentiate a signal with jumps and label impulse areas.
8. Accumulate area under a plotted signal to sketch an integral.
9. Locate `sigma +/- j omega` for damped/growing sinusoids.
10. Decompose `t u(t)` into even and odd parts.
11. Classify `dy/dt + 2y = f^2(t)` as nonlinear because the input is squared.
12. Classify `3y(t)+2=f(t)` as nonlinear because zero input gives nonzero offset.
13. Classify `y(t)=f(at)` causality differently depending on `a>1` or `a<1`.
14. Invert `y(t)=f(3t-6)` by solving for the original input argument.

## Common Traps To Explicitly Teach

1. Thinking sign change or time shift changes energy/power.
2. Forgetting power uses time average over one period for periodic signals.
3. Mishandling cross terms in `|x+y|^2` or `|x-y|^2`.
4. Reversing the direction of shifts: `f(t-a)` shifts right, `f(t+a)` shifts left.
5. Applying time scaling in the wrong order for expressions like `f(2t-4) = f(2(t-2))`.
6. Treating `delta(1-t)` or `delta(3-t)` as if it were located at a negative time.
7. Forgetting impulse area equals jump size when differentiating a discontinuity.
8. Confusing even/odd decomposition with simply choosing the visible half of a signal.
9. Calling a system linear just because `y` appears linearly while the input appears as `f^2` or `f df/dt`.
10. Missing affine offset nonlinearity such as `3y+2=f`.
11. Confusing time invariance with absence of explicit `t`; time-scaling operators still fail the delay test.
12. For causality of `f(at)`, forgetting the sign of the comparison between `at` and `t` changes with `a`.
13. Calling `f^n(t)` invertible for all integers without checking uniqueness, parity, zero, and domain assumptions.
14. Calling `cos[f(t)]` invertible despite many-to-one mapping.

## What To De-Emphasize

1. Long philosophical definitions of signal/system properties without test examples.
2. Decorative visuals not tied to a specific transformation or property test.
3. Proof-heavy treatment of generalized functions beyond the rules needed for homework.
4. Overexplaining chapter introductions when the assigned work is operational.
5. Full solution derivations for unassigned subparts unless they support a relevant pattern.

## Lesson Generation Rules Derived From This Homework

For Chapter 1 lessons, the lesson generator should:
1. Treat this file as a section-filtered exam-priority signal, not a global rewrite of every Chapter 1 lesson.
2. For `1.1`, emphasize energy/power/rms formulas, scaling effects, and worked computations.
3. For `1.2` and `1.3`, emphasize signal transformation literacy and sketching order.
4. For `1.4`, emphasize step gating, impulse sifting, derivative/integral operations, and graph-to-formula conversion.
5. For `1.5`, emphasize even/odd formulas and symmetry checks.
6. For `1.7`, emphasize definition-based classification with one clean diagnostic test per property.
7. Keep examples close to the exact homework patterns before adding new variants.
8. Include quiz questions that require classification or calculation, not just vocabulary recall.

## Quiz Bias

Quiz generation for Chapter 1 should favor:
1. Short calculation items on energy, power, and rms.
2. Visual reasoning questions on time shift/scale/reversal.
3. Step/impulse simplification questions.
4. Even/odd decomposition questions.
5. System-property classification with reasons.
6. Trap questions where an expression looks linear/time-invariant/causal/invertible but fails one condition.

## Section Prioritization Heuristic

Raise priority for a section if it covers:
- signal energy/power/rms
- time transformations and sketching
- unit step and impulse functions
- signal differentiation/integration
- even/odd decomposition
- system linearity
- time invariance
- causality
- invertibility

Keep unrelated Chapter 1 content shorter unless it directly supports these assigned problem types.
