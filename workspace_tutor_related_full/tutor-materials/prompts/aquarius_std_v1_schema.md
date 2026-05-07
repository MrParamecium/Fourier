# Aquarius Standard Lesson Schema v1

## Purpose

`aquarius_std_v1` is the single standard lesson format for Signal Processing and Linear Systems.

The lesson must optimize for:

1. high-efficiency understanding
2. strong formula coverage
3. visual-first explanation where needed
4. dynamic interaction when a concept is better understood through change
5. minimal wasted wording

This is a product schema, not a free-form writing style.

---

## Core Design Rules

### Rule 1: Formula-first teaching
- Every section must surface the core textbook formulas explicitly.
- Core formulas must be rendered in LaTeX.
- Each core formula must explain:
  - what the formula means
  - what each symbol means
  - when to use it
  - what problem pattern should trigger it
  - the most common misuse

### Rule 2: Visuals are instructional, not decorative
- Use visuals aggressively when they improve comprehension, pattern recognition, comparison, correction, or transfer.
- Do not add images as aesthetic filler.
- Prefer Wikipedia / Wikimedia explanatory figures first for all static teaching visuals.
- Prefer Wikipedia / Wikimedia animated media first when a clean encyclopedic animation exists and motion genuinely teaches the concept better.
- Prefer interactive React + Canvas demos second when a concept depends on change, process, or manipulation and student control materially helps understanding.
- Use generated teaching visuals only for custom examples, wrong-vs-right correction visuals, or as a last-resort fallback when no suitable Wikipedia / Wikimedia asset exists.
- Do not use textbook original figures as a primary asset strategy in `aquarius_std_v1`.

### Rule 3: Dynamic demos are first-class teaching blocks
- If a concept is best understood by observing change over time, change of parameters, or input-output response, it should use an interactive demo.
- Demos should be specified as React + Canvas runtime specs, not arbitrary free-form frontend code.

### Rule 4: No wasted wording
- Explanations must be short, direct, and exam-useful.
- Each block should have one teaching job only.
- Avoid textbook-style historical filler and long generic intros.

### Rule 5: Intuition-first block design
- Do not let a knowledge block default to text-first explanation.
- For each important idea, first ask: what should the student see, compare, or manipulate to understand this fastest?
- If a concept becomes clearer through:
  - comparison
  - structure
  - step-by-step state change
  - wrong-vs-right contrast
  - interactive manipulation
  then a visual or demo block is required.

---

## Required Top-Level Lesson Shape

```json
{
  "version": "aquarius_std_v1",
  "section_id": "1.1",
  "section_title": "Size of a Signal",
  "language": "en",
  "book_source": "new",
  "status": "ready",
  "lesson_goal": "Understand what signal size means and how to compute it in common cases.",
  "visualization_need": {
    "level": "none | static | interactive",
    "reason": [],
    "recommended_assets": []
  },
  "core_formulas": [],
  "blocks": [],
  "assets": {
    "wiki_figures": [],
    "demos": []
  },
  "recap": {},
  "metadata": {
    "requires_web": true,
    "has_interactive_demo": false,
    "estimated_read_minutes": 6
  }
}
```

---

## Required Lesson Skeleton

Every standard lesson should be organized in this order unless there is a strong reason not to:

1. `lesson_goal`
2. `visual_anchor` or `comparison_visual`
3. `formula_core`
4. `concept_explain`
5. `worked_example`
6. `common_mistakes_visual` when applicable
7. `interactive_demo` when appropriate
8. `quick_recap`

Text-only explanation must not be the default teaching surface.

---

## Visualization Decision Logic

The system must not choose visuals vaguely. It must classify visualization need into one of three levels:

### `none`
Use this only if:
- the section is primarily algebraic or definitional
- visual support would add little instructional value
- dynamic observation is not needed for understanding

### `static`
Use this when:
- a figure helps students classify, identify, compare, recognize, or correct a pattern
- a Wikipedia/Wikimedia figure would reduce explanation cost significantly
- the student benefits from seeing one stable representation, but not necessarily changing parameters
- a wrong-vs-right contrast would prevent a common mistake

### `interactive`
Use this when one or more of the following are true:
- the concept is fundamentally about change over time
- the concept is fundamentally about change with parameters
- students commonly confuse the formula with the actual visual effect
- input-output response is easier to understand by watching it evolve
- understanding is significantly slower without manipulation

---

## Visualization Reason Rules

If `visualization_need.level` is `interactive`, the reasons should usually include one or more of:

- `depends_on_parameter_change`
- `depends_on_time_evolution`
- `formula_to_phenomenon_gap`
- `input_output_response_is_visual`
- `student_should_manipulate_to_understand`

If `visualization_need.level` is `static`, the reasons should usually include one or more of:

- `classification_benefits_from_figure`
- `pattern_recognition_benefits_from_figure`
- `wikipedia_has_standard_reference_visual`
- `misconception_needs_visual_correction`
- `wrong_vs_right_contrast_is_high_value`

---

## Visual Asset Priority

When a visual is needed, choose in this order:

1. Wikipedia / Wikimedia figure
2. Wikipedia / Wikimedia animated media
3. React + Canvas interactive demo
4. other web visual only if clearly better and still academically clean
5. generated teaching visual

Generated visuals are last-resort gap fillers for custom teaching needs. They should not be the default for standard definition, classification, or reference visuals.

## Visual Source Policy

Treat static and reference visuals as Wikipedia / Wikimedia first by default.

- `definition_visual` -> Wikipedia / Wikimedia first
- `classification_visual` -> Wikipedia / Wikimedia first
- `reference_visual` -> Wikipedia / Wikimedia first
- `animated_reference_visual` -> Wikipedia / Wikimedia animated media first
- `worked_example_visual` -> generated teaching visual or demo when customization matters
- `correction_visual` -> generated teaching visual or demo when a wrong-vs-right teaching contrast is needed

If a useful Wikimedia or Wikipedia asset exists, do not replace it with a generated image just for style.
If no suitable Wikimedia or Wikipedia asset exists, the fallback should happen silently in the product. Do not expose search failure messages to the student.

---

## Interactive Demo Block Spec

```json
{
  "type": "interactive_demo",
  "demo_type": "time_shift | sine_wave | sampling | convolution | system_response | complex_plane | custom",
  "title": "Time shift demo",
  "learning_objective": "See how shifting x(t) changes the waveform position without changing its shape.",
  "render_mode": "react_canvas",
  "controls": [
    {
      "key": "shift",
      "type": "slider",
      "min": -5,
      "max": 5,
      "step": 0.1,
      "default": 0
    }
  ],
  "observe": [
    "Watch how the graph moves left and right.",
    "Notice that the waveform shape does not change."
  ],
  "student_task": "Move the shift slider and explain what x(t-2) does."
}
```

### Demo Hard Rules
- Every demo must have a single learning objective.
- Every demo must specify what the student should observe.
- Every demo must end with a student task.
- Every demo must be controllable through a finite set of safe UI controls.
- Do not output arbitrary app code as lesson content.

---

## Required Core Formula Block

```json
{
  "type": "formula_core",
  "id": "energy_formula",
  "title": "Energy of a signal",
  "latex": "E = \\int_{-\\infty}^{\\infty} |x(t)|^2 \\, dt",
  "symbols": [
    { "symbol": "E", "meaning": "signal energy" },
    { "symbol": "x(t)", "meaning": "continuous-time signal" }
  ],
  "when_to_use": "Use this when deciding whether a signal has finite total energy.",
  "exam_trigger": "If the problem asks whether the total accumulated size is finite, start here.",
  "common_mistake": "Do not confuse total energy with average power."
}
```

---

## High-Priority Interactive Topics for This Course

The following topic types should default toward `interactive` unless there is a strong reason not to:

- sinusoids
- amplitude / frequency / phase change
- time shift / reversal / scaling
- complex plane interpretation
- signal classification by shape
- energy vs power
- sampling
- convolution
- impulse response / system response
- frequency-related geometric or waveform intuition

---

## Minimum Publishable Standard

A lesson is not ready unless it includes:

- at least 1 `formula_core`
- at least 2 visualized teaching blocks (`visual_anchor`, `comparison_visual`, `structure_visual`, `step_visual`, or `interactive_demo`)
- at least 1 `concept_explain`
- at least 2 worked examples or 1 worked example plus 1 explicit wrong-vs-right example
- at least 1 `quick_recap`

If the section is marked `interactive`, it must also include at least 1 `interactive_demo`.

If the section contains high-probability misconceptions, it must also include at least 1 visual correction block.

## Visualized Misconception Rule

`common_mistakes` must not default to plain text.

If a mistake becomes substantially clearer through:
- positional contrast
- wrong-vs-right comparison
- structure highlighting
- state change

then the lesson must include one of:
- `comparison_visual`
- `structure_visual`
- `step_visual`
- `interactive_demo`

Use plain text only when a visual would add little value.

---

## Quiz System for `aquarius_std_v1`

The quiz is not a generic question bank. It is a **teaching diagnostic layer**.

Its job is to:

1. detect what the student actually failed to understand
2. separate formula recall from real understanding
3. expose common misconceptions early
4. verify whether the student can transfer the idea to a slightly changed problem

### Dynamic question count

Question count must **not** be fixed across all sections.

Question count should be determined by:
- number of core knowledge points
- misconception density
- exam importance
- whether visual interpretation is important
- whether interactive-demo understanding must be verified

Recommended ranges:

- short / simple section: `3–5`
- normal section: `5–7`
- heavy / high-risk / high-value section: `7–10`

### Coverage standard (mandatory)

Even though question count is dynamic, every section should still try to cover these functions:

1. `core_concept_check`
2. `formula_trigger_check`
3. `common_trap_check`
4. `mini_transfer_check`

If the section is visual-heavy or interactive-heavy, also include:

5. `visual_or_demo_observation_check`

### Visual-first quiz rule

The quiz layer must not default to text-only checking.

If a question is about:
- structure recognition
- wrong vs right distinction
- parameter reading
- visual classification
- process understanding
- demo-based reasoning

then it should be planned as a visual-heavy or demo-heavy question whenever possible.

### Minimum visual quiz standard

- normal section: at least 1 visual-heavy question
- high-misconception section: at least 2 visual-heavy questions
- interactive section: at least 1 demo-observation question

Visual-heavy questions include:
- `wrong_vs_right_visual_check`
- `structure_comparison_check`
- `visual_pattern_recognition_check`
- `visual_or_demo_observation_check`
- `demo_observation_check`

### Default type mix

- mostly `multiple_choice`
- some `short_answer` only when needed
- optional `demo_observation` when interactive understanding must be tested

### Question metadata

Each question should carry structured teaching metadata where possible:

- `knowledge_point`
- `task_type`
- `difficulty`
- `exam_weight`
- `common_mistake_target`
- `needs_visual`
- `needs_demo`
- `if_wrong_then_review`

### High-value question types for this course

Prioritize:

- classification questions
- formula-trigger questions
- parameter-reading questions
- misconception / trap questions
- mini-transfer questions
- observe-and-conclude questions for demos

### Strong recommendation

Include at least one question of the form:
- `Why is this wrong?`
- or `Observe and conclude`

These are especially valuable for Signal Processing and Linear Systems.

When possible, make these visual rather than purely verbal.
