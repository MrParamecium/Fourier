# B.6-1 Blueprint Draft

## Target section

- `section_id`: `B.6-1`
- `section_title`: `Some Definitions and Properties`
- `version`: `aquarius_std_v1`

## Planning judgment

### visualization_need

```json
{
  "level": "static",
  "reason": [
    "classification_benefits_from_figure",
    "pattern_recognition_benefits_from_figure"
  ],
  "recommended_assets": [
    "generated_image"
  ]
}
```

### Why not interactive by default

This section is primarily about:

- notation
- structure
- named matrix types
- transpose
- equality conditions

Students benefit most from:

- one clear matrix layout visual
- one transpose visual
- one classification comparison visual

They do not yet need a heavy parameter-driven demo to understand the core ideas.

---

## Top-level lesson goal

> Understand matrix notation, matrix order, standard matrix types, transpose, and matrix equality well enough to read later matrix algebra and system equations without hesitation.

---

## Core formulas / math objects that must appear

### Formula / object 1

```latex
A = [a_{ij}]
```

Teaching job:
- establish matrix notation
- make row/column indexing explicit

Must explain:
- `i` = row index
- `j` = column index
- order of matrix = number of rows by number of columns

### Formula / object 2

```latex
A^T = [a_{ji}]
```

Teaching job:
- define transpose precisely
- show that transpose swaps row/column positions

Must explain:
- transpose changes shape from `m \\times n` to `n \\times m`
- transpose repositions entries, not just symbols

### Formula / object 3

```latex
A = B \iff a_{ij} = b_{ij} \text{ for all } i,j
```

Teaching job:
- define matrix equality strictly

Must explain:
- same order is required
- same corresponding entries are required

### Formula / object 4

```latex
(A^T)^T = A
```

Teaching job:
- reinforce transpose intuition

---

## Recommended page structure

### Page 1 — Overview

Block type:
- `text_explanation`

Goal:
- explain why matrices appear in this course
- frame them as containers for multi-variable linear relationships
- tell the student that this section is building the vocabulary needed before matrix algebra

Constraints:
- concise
- no long linear algebra history
- exam-useful tone

---

### Page 2 — Matrix notation and order

Blocks:
- `math_block` for `A = [a_{ij}]`
- `text_explanation`
- `generate_image`

Teaching emphasis:
- what an entry `a_{ij}` means
- row vs column
- shape / order matters

Generated visual suggestion:
- a clean labeled matrix with highlighted row index and column index
- one sample entry boxed
- arrows showing `i -> row`, `j -> column`

Teaching role:
- `concept_anchor`

---

### Page 3 — Special matrix types

Blocks:
- `text_explanation`
- `math_block` or compact formula snippets for:
  - diagonal matrix
  - identity matrix
  - zero matrix
  - symmetric matrix
- `generate_image`

Teaching emphasis:
- these are named patterns the student should recognize instantly
- identity matrix should be linked to “does not change a compatible vector/matrix under multiplication” lightly, but not overdeveloped here

Generated visual suggestion:
- side-by-side small matrix panels:
  - diagonal
  - identity
  - zero
  - symmetric
- each one labeled with exactly one recognition cue

Teaching role:
- `classification_anchor`

---

### Page 4 — Equality and transpose

Blocks:
- `math_block` for matrix equality
- `math_block` for transpose
- `text_explanation`
- `generate_image`

Teaching emphasis:
- equality is stricter than “looks similar”
- transpose swaps positions across the main diagonal

Generated visual suggestion:
- left matrix A
- right matrix A^T
- arrows showing element movement across the diagonal

Teaching role:
- `comparison_anchor`

---

### Page 5 — Worked example

Blocks:
- `text_explanation`

Worked example should do all of these in one compact flow:
- identify the order of a given matrix
- decide whether it is diagonal / identity / zero / symmetric
- compute transpose
- decide whether two small matrices are equal

Important:
- keep it compact
- step-by-step but not slow

---

### Page 6 — Common mistakes + recap

Blocks:
- `text_explanation` or `section_summary`

Must include:
- row index / column index confusion
- transpose misconception
- equality misconception

Recap should compress to recognition rules.

---

### Final page — Quiz

Block:
- `quiz_plan`

Recommended question count:
- `5–7`

Must cover:

1. `core_concept_check`
   - identify order of a matrix

2. `formula_trigger_check`
   - interpret `a_{ij}` or `A^T`

3. `common_trap_check`
   - e.g. wrong statement about transpose or equality

4. `mini_transfer_check`
   - classify a fresh matrix not identical to the teaching example

5. optional `visual_or_demo_observation_check`
   - only if generated visual is central enough to justify it

---

## Quiz direction

### Good question styles

- “Which statement is correct?”
- “Why is this wrong?”
- “Which matrix is symmetric?”
- “What is the order of this matrix?”
- “After transposition, what becomes the entry in row __, column __?”

### Avoid

- long symbolic derivation
- too many arithmetic-heavy computations
- generic linear algebra trivia

---

## Tone for Agent B

- concise
- confident
- notation-first
- visually grounded
- no fluff
- each paragraph should reduce future confusion in `B.6-2`

---

## Strong editorial note

This section should feel like:

- “I now know how to read matrices correctly”

not:

- “I read a lot of definitions”
