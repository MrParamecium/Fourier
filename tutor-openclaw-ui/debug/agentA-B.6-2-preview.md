# Agent A Preview: B.6-2 Matrix Algebra

- Difficulty: intermediate
- Estimated read minutes: 8

## Learning Objectives

- Perform entry-by-entry matrix addition and subtraction only when matrix orders match.
- Recognize when matrix multiplication is defined and compute entries using row-column products.
- Use identity matrices, determinant product rules, matrix-vector multiplication, and inverses in linear systems.

## Visualization Need

```json
{
  "level": "interactive",
  "reason": [
    "depends_on_parameter_change",
    "student_should_manipulate_to_understand",
    "formula_to_phenomenon_gap",
    "misconception_needs_visual_correction"
  ],
  "recommended_assets": [
    "react_canvas_demo",
    "latex_native_visual"
  ]
}
```

## Visual Plan

```json
{
  "primary_anchor": "react_demo",
  "rationale": "This section is mostly symbolic matrix algebra, so clean LaTeX-native matrix displays are the best visual surface for definitions. The one concept that students commonly misunderstand visually is matrix multiplication conformability, so a React + Canvas demo should let them change matrix sizes and see valid versus invalid products.",
  "cram": "Use the demo to recognize dimension-matching patterns quickly: inner dimensions must match and outer dimensions give the answer size.",
  "standard": "Use LaTeX for exact formulas and the demo for one representative multiplication example with row-column highlighting.",
  "top_score": "Use the demo to expose order traps such as AB being defined while BA may be undefined or a different size."
}
```

## Planned Blocks

### Block 1: `text_explanation`
- **instruction**: Create the first page as a minimal overview only. Use exactly two short sections: 'Section Objective' and 'Concepts In This Section'. Under Section Objective, write one sentence: 'Learn the basic algebra rules for adding, multiplying, and inverting matrices.' Under Concepts In This Section, list concept names only: matrix addition and subtraction; matrix multiplication; conformability; identity matrix; determinant product rule; matrix-vector multiplication; matrix inverse. Do not add background paragraphs, examples, formulas, or exam tips on this page.

### Block 2: `math_block`
- **latex**: A \pm B = \left(a_{ij} \pm b_{ij}\right)_{m\times n}
- **explanation_instruction**: Start a new page headed '## 1. Matrix Addition and Subtraction'. Explain in 90-130 words that addition and subtraction are entry-by-entry operations and are defined only when A and B have the same order. Define every symbol: A and B are m by n matrices, a_{ij} and b_{ij} are entries in the same row i and column j, and the result is also m by n. Include one minimal example: if the top-left entries are 3 and 5, the top-left entry of A+B is 8. Exam trigger: the phrase 'add two matrices' should make the student check dimensions first. Common misuse: trying to add a 2 by 3 matrix to a 3 by 2 matrix just because both contain six entries.

### Block 3: `interactive_demo`
- **teaching_role**: concept_anchor
- **mode_specific_visual_use**:
```json
{
  "cram": "Let students instantly see the inner-dimension match rule and the output size.",
  "standard": "Use one valid product and one invalid product to connect dimensions with row-column multiplication.",
  "top_score": "Let students compare AB and BA to see why order matters."
}
```
- **title**: Matrix Multiplication Conformability Demo
- **demo_instruction**: Build a React + Canvas demo with three labeled panels: A is m by n, B is n by p, and C=AB is m by p. Provide simple sliders or step buttons for m, n, p, plus an optional separate control for the number of rows of B so students can intentionally break conformability. When columns of A equal rows of B, show a green 'DEFINED' badge and display the resulting size C as m by p. When they do not match, show a muted red 'NOT DEFINED' badge and hide C. In the valid state, animate or highlight row i of A and column j of B meeting at entry c_{ij}. Keep the design white, clean, low-saturation, and lecture-note style. Include a short note below the canvas: 'Inner dimensions must match; outer dimensions become the answer size.'

### Block 4: `math_block`
- **latex**: c_{ij}=a_{i1}b_{1j}+a_{i2}b_{2j}+\cdots+a_{in}b_{nj}=\sum_{k=1}^{n}a_{ik}b_{kj}\quad\text{(B.33)}
- **explanation_instruction**: Start a new page headed '## 2. Matrix Multiplication: Row Times Column'. Explain in 110-150 words that entry c_{ij} of C=AB is found by multiplying row i of A with column j of B and adding the products. Define c_{ij}, a_{ik}, b_{kj}, k, and n. State when to use it: whenever the problem asks for an entry of AB or a full matrix product. Include one tiny representative example in words: for row [2, 1] and column [3, 4]^T, the entry is 2·3+1·4=10. Exam trigger: 'find AB' means check dimensions first, then compute row-column dot products. Common misuse: multiplying matching positions entry-by-entry instead of using row-column products.

### Block 5: `math_block`
- **latex**: AI=IA=A
- **explanation_instruction**: Start a new page headed '## 3. Identity Matrix: Multiplication That Changes Nothing'. Explain in 90-130 words that the identity matrix I acts like the number 1 for matrix multiplication, but its order must fit the multiplication. Define A, I, and why both AI and IA are written: the left and right identity matrices may need different sizes when A is not square. Include one minimal example: a 2 by 3 matrix A can be postmultiplied by a 3 by 3 identity to give A, and premultiplied by a 2 by 2 identity to give A. Exam trigger: if a matrix expression contains I, check whether the identity matrix has the conformable order. Common misuse: assuming one fixed identity size works everywhere.

### Block 6: `math_block`
- **latex**: |AB|=|A|\,|B|
- **explanation_instruction**: Start a new page headed '## 4. Determinant Product Rule'. Explain in 80-120 words that the determinant of a product of square matrices equals the product of their determinants. Define |A| and |B| as determinants, not absolute values of individual entries. State when to use it: when an exam gives a product AB but asks for its determinant or invertibility. Include one representative example: if |A|=2 and |B|=-3, then |AB|=-6. Common misuse: applying this rule to non-square matrices or confusing |AB| with entry-by-entry absolute value.

### Block 7: `math_block`
- **latex**: y=Ax\quad\text{(B.36)}
- **explanation_instruction**: Start a new page headed '## 5. Matrix Times Vector'. Explain in 100-140 words that a vector x can be treated as an n by 1 matrix, so Ax is defined when A has n columns. Define y, A, and x: A maps the input vector x into the output vector y. Include one minimal example: if A is 3 by 2, then x must be 2 by 1 and y becomes 3 by 1. Exam trigger: equations like y=Ax represent a whole system of linear equations compactly. Common misuse: writing xA with a column vector x; in this context xA is not defined because the dimensions do not conform.

### Block 8: `math_block`
- **latex**: y=Ax\Rightarrow x=A^{-1}y\quad\text{(B.37)}
- **explanation_instruction**: Start a new page headed '## 6. Matrix Inverse: Undoing a Matrix'. Explain in 110-150 words that the inverse A^{-1} reverses multiplication by a square matrix A, similar to dividing by a nonzero number. Explicitly state in text that the defining property is \(A^{-1}A=I\). Define A^{-1}, I, x, and y. State when to use it: when a square linear system is written as y=Ax and the problem asks for x. Include one minimal example in words: if y is known and A^{-1} is given, multiply A^{-1}y to recover x. Exam trigger: 'solve the matrix equation' often means isolate the vector using the inverse. Common misuse: using A^{-1} when A is not square or not invertible.

### Block 9: `section_summary`
- **instruction**: Create a recap page titled '📌 Key Takeaways'. Summarize the section in compact bullets, but include the core formulas explicitly. Include these formulas exactly as review items: \(A\pm B=(a_{ij}\pm b_{ij})_{m\times n}\); \(c_{ij}=\sum_{k=1}^{n}a_{ik}b_{kj}\) from (B.33); \(AI=IA=A\); \(|AB|=|A||B|\); \(y=Ax\) from (B.36); \(y=Ax\Rightarrow x=A^{-1}y\) from (B.37). Keep each bullet under 25 words. End with one bridge sentence: 'Next, these rules let us manipulate systems of equations more efficiently.'

### Block 10: `quiz_plan`
- **target_questions**:
```json
6
```
- **question_range**:
```json
{
  "min": 5,
  "max": 7
}
```
- **knowledge_points**:
```json
[
  {
    "id": "entrywise_matrix_addition",
    "label": "Matrix addition and subtraction require same order",
    "importance": "high",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp1_q1",
        "type": "multiple_choice",
        "stem": "Matrix A is 2 by 3 and matrix B is 3 by 2. Which statement is correct?",
        "options": [
          "A. A+B is defined because both matrices contain six entries.",
          "B. A+B is not defined because the orders are different.",
          "C. A+B is a 5 by 5 matrix.",
          "D. A+B is defined only if AB is also defined."
        ],
        "correct_option": "B",
        "explanation": "Matrix addition is entry-by-entry, so entries must have matching positions. A 2 by 3 matrix and a 3 by 2 matrix do not have the same order.",
        "wrong_option_explanations": {
          "A": "Having the same number of entries is not enough; the entries must be arranged in the same positions.",
          "C": "Matrix addition does not add dimensions together.",
          "D": "Addition and multiplication have different dimension rules."
        },
        "hint": "For addition, compare the full order, not just the number of entries.",
        "needs_visual": false,
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "matrix_multiplication_conformability",
    "label": "Matrix multiplication dimensions and output size",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp2_q1",
        "type": "multiple_choice",
        "stem": "A is 4 by 2 and B is 2 by 5. What is the order of AB?",
        "options": [
          "A. 4 by 5",
          "B. 2 by 2",
          "C. 5 by 4",
          "D. AB is not defined"
        ],
        "correct_option": "A",
        "explanation": "The inner dimensions match: 2 equals 2. The outer dimensions become the result size, so AB is 4 by 5.",
        "wrong_option_explanations": {
          "B": "The matching inner dimensions tell you the product is defined; they are not the output size.",
          "C": "This reverses the outer dimensions.",
          "D": "AB is defined because the columns of A equal the rows of B."
        },
        "hint": "Check inner dimensions first, then keep the outer dimensions.",
        "needs_visual": false,
        "same_point_variant": true
      },
      {
        "id": "kp2_q2",
        "type": "multiple_choice",
        "stem": "In the conformability demo, A is 3 by 4 and B is changed from 4 by 2 to 5 by 2. What should happen to AB?",
        "options": [
          "A. It changes from 3 by 2 to 3 by 2, so it stays defined.",
          "B. It changes from defined to not defined because the inner dimensions no longer match.",
          "C. It changes from 3 by 2 to 5 by 4.",
          "D. It stays defined because B still has two columns."
        ],
        "correct_option": "B",
        "explanation": "For A=3 by 4, B must have 4 rows. When B becomes 5 by 2, the inner dimensions are 4 and 5, so AB is not defined.",
        "wrong_option_explanations": {
          "A": "The output size 3 by 2 only exists when the product is defined.",
          "C": "Matrix multiplication does not reverse and combine dimensions this way.",
          "D": "The number of columns of B affects the output width, but the number of rows of B must match columns of A."
        },
        "hint": "Watch the inner dimensions in the demo: columns of A and rows of B.",
        "needs_visual": true,
        "visual_type": "react_canvas_demo",
        "question_style": "demo_observation_check",
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "row_column_entry_formula",
    "label": "Computing c_ij by row-column dot product",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 2
    },
    "questions": [
      {
        "id": "kp3_q1",
        "type": "multiple_choice",
        "stem": "To compute c23 in C=AB, which parts do you multiply?",
        "options": [
          "A. Row 2 of A with column 3 of B",
          "B. Column 2 of A with row 3 of B",
          "C. Row 3 of A with column 2 of B",
          "D. Entry a23 with entry b23 only"
        ],
        "correct_option": "A",
        "explanation": "The entry c_{ij} is found from row i of A and column j of B. Therefore c23 uses row 2 of A and column 3 of B.",
        "wrong_option_explanations": {
          "B": "This reverses the row-column rule.",
          "C": "This swaps the indices.",
          "D": "Matrix multiplication is not entry-by-entry multiplication."
        },
        "hint": "The first index selects the row of A; the second selects the column of B.",
        "needs_visual": true,
        "visual_type": "latex_native_matrix_highlight",
        "question_style": "visual_pattern_recognition_check",
        "same_point_variant": true
      }
    ]
  },
  {
    "id": "identity_and_determinant_properties",
    "label": "Identity matrix and determinant product rule",
    "importance": "medium",
    "exam_weight": "medium",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp4_q1",
        "type": "multiple_choice",
        "stem": "Which statement is always correct when the products are conformable and determinants exist?",
        "options": [
          "A. AI=IA=A",
          "B. |AB|=|A|+|B|",
          "C. Multiplying by I changes every diagonal entry to 1.",
          "D. |AB| is found by multiplying matching entries of A and B."
        ],
        "correct_option": "A",
        "explanation": "The identity matrix leaves a matrix unchanged when the dimensions conform. The determinant product rule is |AB|=|A||B|, not a sum.",
        "wrong_option_explanations": {
          "B": "Determinants multiply over matrix products; they do not add.",
          "C": "The identity matrix does not overwrite A; it leaves A unchanged.",
          "D": "The determinant of AB is not computed by entry-by-entry multiplication."
        },
        "hint": "The identity matrix acts like 1 for multiplication.",
        "needs_visual": false,
        "same_point_variant": false
      }
    ]
  },
  {
    "id": "matrix_vector_and_inverse",
    "label": "Using y=Ax and x=A^{-1}y",
    "importance": "high",
    "exam_weight": "high",
    "mastery_rule": {
      "correct_streak_required": 1
    },
    "questions": [
      {
        "id": "kp5_q1",
        "type": "multiple_choice",
        "stem": "A is 3 by 2 and x is a column vector. Which size must x have for y=Ax to be defined?",
        "options": [
          "A. 2 by 1",
          "B. 3 by 1",
          "C. 1 by 2",
          "D. 1 by 3"
        ],
        "correct_option": "A",
        "explanation": "A has 2 columns, so the column vector must have 2 rows. The output y will then be 3 by 1.",
        "wrong_option_explanations": {
          "B": "3 by 1 is the output size, not the required input size.",
          "C": "The section treats x as a column vector, not a row vector.",
          "D": "This does not match the columns of A."
        },
        "hint": "For Ax, rows of x must match columns of A.",
        "needs_visual": false,
        "same_point_variant": false
      },
      {
        "id": "kp5_q2",
        "type": "short_answer",
        "stem": "A classmate sees y=Ax and writes yA^{-1}=x. Explain why the textbook instead uses x=A^{-1}y.",
        "ideal_answer": "The inverse must premultiply both sides because A multiplies x on the left in y=Ax. Premultiplying gives A^{-1}y=A^{-1}Ax=Ix=x, so x=A^{-1}y. Writing yA^{-1} changes the order and may not even be defined.",
        "grading_rubric": [
          "Must mention that matrix multiplication order matters.",
          "Must state that A^{-1} premultiplies y.",
          "Must use or describe A^{-1}A=I.",
          "Must conclude x=A^{-1}y."
        ],
        "explanation": "This checks whether the student understands inverse multiplication as an operation with order, not ordinary scalar division.",
        "hint": "You must undo A on the same side where A is multiplying x.",
        "needs_visual": false,
        "same_point_variant": false
      }
    ]
  }
]
```

## Raw JSON

```json
{
  "section_id": "B.6-2",
  "section_title": "Matrix Algebra",
  "difficulty": "intermediate",
  "estimated_read_minutes": 8,
  "learning_objectives": [
    "Perform entry-by-entry matrix addition and subtraction only when matrix orders match.",
    "Recognize when matrix multiplication is defined and compute entries using row-column products.",
    "Use identity matrices, determinant product rules, matrix-vector multiplication, and inverses in linear systems."
  ],
  "visualization_need": {
    "level": "interactive",
    "reason": [
      "depends_on_parameter_change",
      "student_should_manipulate_to_understand",
      "formula_to_phenomenon_gap",
      "misconception_needs_visual_correction"
    ],
    "recommended_assets": [
      "react_canvas_demo",
      "latex_native_visual"
    ]
  },
  "visual_plan": {
    "primary_anchor": "react_demo",
    "rationale": "This section is mostly symbolic matrix algebra, so clean LaTeX-native matrix displays are the best visual surface for definitions. The one concept that students commonly misunderstand visually is matrix multiplication conformability, so a React + Canvas demo should let them change matrix sizes and see valid versus invalid products.",
    "cram": "Use the demo to recognize dimension-matching patterns quickly: inner dimensions must match and outer dimensions give the answer size.",
    "standard": "Use LaTeX for exact formulas and the demo for one representative multiplication example with row-column highlighting.",
    "top_score": "Use the demo to expose order traps such as AB being defined while BA may be undefined or a different size."
  },
  "blocks": [
    {
      "type": "text_explanation",
      "instruction": "Create the first page as a minimal overview only. Use exactly two short sections: 'Section Objective' and 'Concepts In This Section'. Under Section Objective, write one sentence: 'Learn the basic algebra rules for adding, multiplying, and inverting matrices.' Under Concepts In This Section, list concept names only: matrix addition and subtraction; matrix multiplication; conformability; identity matrix; determinant product rule; matrix-vector multiplication; matrix inverse. Do not add background paragraphs, examples, formulas, or exam tips on this page."
    },
    {
      "type": "math_block",
      "latex": "A \\pm B = \\left(a_{ij} \\pm b_{ij}\\right)_{m\\times n}",
      "explanation_instruction": "Start a new page headed '## 1. Matrix Addition and Subtraction'. Explain in 90-130 words that addition and subtraction are entry-by-entry operations and are defined only when A and B have the same order. Define every symbol: A and B are m by n matrices, a_{ij} and b_{ij} are entries in the same row i and column j, and the result is also m by n. Include one minimal example: if the top-left entries are 3 and 5, the top-left entry of A+B is 8. Exam trigger: the phrase 'add two matrices' should make the student check dimensions first. Common misuse: trying to add a 2 by 3 matrix to a 3 by 2 matrix just because both contain six entries."
    },
    {
      "type": "interactive_demo",
      "teaching_role": "concept_anchor",
      "mode_specific_visual_use": {
        "cram": "Let students instantly see the inner-dimension match rule and the output size.",
        "standard": "Use one valid product and one invalid product to connect dimensions with row-column multiplication.",
        "top_score": "Let students compare AB and BA to see why order matters."
      },
      "title": "Matrix Multiplication Conformability Demo",
      "demo_instruction": "Build a React + Canvas demo with three labeled panels: A is m by n, B is n by p, and C=AB is m by p. Provide simple sliders or step buttons for m, n, p, plus an optional separate control for the number of rows of B so students can intentionally break conformability. When columns of A equal rows of B, show a green 'DEFINED' badge and display the resulting size C as m by p. When they do not match, show a muted red 'NOT DEFINED' badge and hide C. In the valid state, animate or highlight row i of A and column j of B meeting at entry c_{ij}. Keep the design white, clean, low-saturation, and lecture-note style. Include a short note below the canvas: 'Inner dimensions must match; outer dimensions become the answer size.'"
    },
    {
      "type": "math_block",
      "latex": "c_{ij}=a_{i1}b_{1j}+a_{i2}b_{2j}+\\cdots+a_{in}b_{nj}=\\sum_{k=1}^{n}a_{ik}b_{kj}\\quad\\text{(B.33)}",
      "explanation_instruction": "Start a new page headed '## 2. Matrix Multiplication: Row Times Column'. Explain in 110-150 words that entry c_{ij} of C=AB is found by multiplying row i of A with column j of B and adding the products. Define c_{ij}, a_{ik}, b_{kj}, k, and n. State when to use it: whenever the problem asks for an entry of AB or a full matrix product. Include one tiny representative example in words: for row [2, 1] and column [3, 4]^T, the entry is 2·3+1·4=10. Exam trigger: 'find AB' means check dimensions first, then compute row-column dot products. Common misuse: multiplying matching positions entry-by-entry instead of using row-column products."
    },
    {
      "type": "math_block",
      "latex": "AI=IA=A",
      "explanation_instruction": "Start a new page headed '## 3. Identity Matrix: Multiplication That Changes Nothing'. Explain in 90-130 words that the identity matrix I acts like the number 1 for matrix multiplication, but its order must fit the multiplication. Define A, I, and why both AI and IA are written: the left and right identity matrices may need different sizes when A is not square. Include one minimal example: a 2 by 3 matrix A can be postmultiplied by a 3 by 3 identity to give A, and premultiplied by a 2 by 2 identity to give A. Exam trigger: if a matrix expression contains I, check whether the identity matrix has the conformable order. Common misuse: assuming one fixed identity size works everywhere."
    },
    {
      "type": "math_block",
      "latex": "|AB|=|A|\\,|B|",
      "explanation_instruction": "Start a new page headed '## 4. Determinant Product Rule'. Explain in 80-120 words that the determinant of a product of square matrices equals the product of their determinants. Define |A| and |B| as determinants, not absolute values of individual entries. State when to use it: when an exam gives a product AB but asks for its determinant or invertibility. Include one representative example: if |A|=2 and |B|=-3, then |AB|=-6. Common misuse: applying this rule to non-square matrices or confusing |AB| with entry-by-entry absolute value."
    },
    {
      "type": "math_block",
      "latex": "y=Ax\\quad\\text{(B.36)}",
      "explanation_instruction": "Start a new page headed '## 5. Matrix Times Vector'. Explain in 100-140 words that a vector x can be treated as an n by 1 matrix, so Ax is defined when A has n columns. Define y, A, and x: A maps the input vector x into the output vector y. Include one minimal example: if A is 3 by 2, then x must be 2 by 1 and y becomes 3 by 1. Exam trigger: equations like y=Ax represent a whole system of linear equations compactly. Common misuse: writing xA with a column vector x; in this context xA is not defined because the dimensions do not conform."
    },
    {
      "type": "math_block",
      "latex": "y=Ax\\Rightarrow x=A^{-1}y\\quad\\text{(B.37)}",
      "explanation_instruction": "Start a new page headed '## 6. Matrix Inverse: Undoing a Matrix'. Explain in 110-150 words that the inverse A^{-1} reverses multiplication by a square matrix A, similar to dividing by a nonzero number. Explicitly state in text that the defining property is \\(A^{-1}A=I\\). Define A^{-1}, I, x, and y. State when to use it: when a square linear system is written as y=Ax and the problem asks for x. Include one minimal example in words: if y is known and A^{-1} is given, multiply A^{-1}y to recover x. Exam trigger: 'solve the matrix equation' often means isolate the vector using the inverse. Common misuse: using A^{-1} when A is not square or not invertible."
    },
    {
      "type": "section_summary",
      "instruction": "Create a recap page titled '📌 Key Takeaways'. Summarize the section in compact bullets, but include the core formulas explicitly. Include these formulas exactly as review items: \\(A\\pm B=(a_{ij}\\pm b_{ij})_{m\\times n}\\); \\(c_{ij}=\\sum_{k=1}^{n}a_{ik}b_{kj}\\) from (B.33); \\(AI=IA=A\\); \\(|AB|=|A||B|\\); \\(y=Ax\\) from (B.36); \\(y=Ax\\Rightarrow x=A^{-1}y\\) from (B.37). Keep each bullet under 25 words. End with one bridge sentence: 'Next, these rules let us manipulate systems of equations more efficiently.'"
    },
    {
      "type": "quiz_plan",
      "target_questions": 6,
      "question_range": {
        "min": 5,
        "max": 7
      },
      "knowledge_points": [
        {
          "id": "entrywise_matrix_addition",
          "label": "Matrix addition and subtraction require same order",
          "importance": "high",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp1_q1",
              "type": "multiple_choice",
              "stem": "Matrix A is 2 by 3 and matrix B is 3 by 2. Which statement is correct?",
              "options": [
                "A. A+B is defined because both matrices contain six entries.",
                "B. A+B is not defined because the orders are different.",
                "C. A+B is a 5 by 5 matrix.",
                "D. A+B is defined only if AB is also defined."
              ],
              "correct_option": "B",
              "explanation": "Matrix addition is entry-by-entry, so entries must have matching positions. A 2 by 3 matrix and a 3 by 2 matrix do not have the same order.",
              "wrong_option_explanations": {
                "A": "Having the same number of entries is not enough; the entries must be arranged in the same positions.",
                "C": "Matrix addition does not add dimensions together.",
                "D": "Addition and multiplication have different dimension rules."
              },
              "hint": "For addition, compare the full order, not just the number of entries.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "matrix_multiplication_conformability",
          "label": "Matrix multiplication dimensions and output size",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp2_q1",
              "type": "multiple_choice",
              "stem": "A is 4 by 2 and B is 2 by 5. What is the order of AB?",
              "options": [
                "A. 4 by 5",
                "B. 2 by 2",
                "C. 5 by 4",
                "D. AB is not defined"
              ],
              "correct_option": "A",
              "explanation": "The inner dimensions match: 2 equals 2. The outer dimensions become the result size, so AB is 4 by 5.",
              "wrong_option_explanations": {
                "B": "The matching inner dimensions tell you the product is defined; they are not the output size.",
                "C": "This reverses the outer dimensions.",
                "D": "AB is defined because the columns of A equal the rows of B."
              },
              "hint": "Check inner dimensions first, then keep the outer dimensions.",
              "needs_visual": false,
              "same_point_variant": true
            },
            {
              "id": "kp2_q2",
              "type": "multiple_choice",
              "stem": "In the conformability demo, A is 3 by 4 and B is changed from 4 by 2 to 5 by 2. What should happen to AB?",
              "options": [
                "A. It changes from 3 by 2 to 3 by 2, so it stays defined.",
                "B. It changes from defined to not defined because the inner dimensions no longer match.",
                "C. It changes from 3 by 2 to 5 by 4.",
                "D. It stays defined because B still has two columns."
              ],
              "correct_option": "B",
              "explanation": "For A=3 by 4, B must have 4 rows. When B becomes 5 by 2, the inner dimensions are 4 and 5, so AB is not defined.",
              "wrong_option_explanations": {
                "A": "The output size 3 by 2 only exists when the product is defined.",
                "C": "Matrix multiplication does not reverse and combine dimensions this way.",
                "D": "The number of columns of B affects the output width, but the number of rows of B must match columns of A."
              },
              "hint": "Watch the inner dimensions in the demo: columns of A and rows of B.",
              "needs_visual": true,
              "visual_type": "react_canvas_demo",
              "question_style": "demo_observation_check",
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "row_column_entry_formula",
          "label": "Computing c_ij by row-column dot product",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 2
          },
          "questions": [
            {
              "id": "kp3_q1",
              "type": "multiple_choice",
              "stem": "To compute c23 in C=AB, which parts do you multiply?",
              "options": [
                "A. Row 2 of A with column 3 of B",
                "B. Column 2 of A with row 3 of B",
                "C. Row 3 of A with column 2 of B",
                "D. Entry a23 with entry b23 only"
              ],
              "correct_option": "A",
              "explanation": "The entry c_{ij} is found from row i of A and column j of B. Therefore c23 uses row 2 of A and column 3 of B.",
              "wrong_option_explanations": {
                "B": "This reverses the row-column rule.",
                "C": "This swaps the indices.",
                "D": "Matrix multiplication is not entry-by-entry multiplication."
              },
              "hint": "The first index selects the row of A; the second selects the column of B.",
              "needs_visual": true,
              "visual_type": "latex_native_matrix_highlight",
              "question_style": "visual_pattern_recognition_check",
              "same_point_variant": true
            }
          ]
        },
        {
          "id": "identity_and_determinant_properties",
          "label": "Identity matrix and determinant product rule",
          "importance": "medium",
          "exam_weight": "medium",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp4_q1",
              "type": "multiple_choice",
              "stem": "Which statement is always correct when the products are conformable and determinants exist?",
              "options": [
                "A. AI=IA=A",
                "B. |AB|=|A|+|B|",
                "C. Multiplying by I changes every diagonal entry to 1.",
                "D. |AB| is found by multiplying matching entries of A and B."
              ],
              "correct_option": "A",
              "explanation": "The identity matrix leaves a matrix unchanged when the dimensions conform. The determinant product rule is |AB|=|A||B|, not a sum.",
              "wrong_option_explanations": {
                "B": "Determinants multiply over matrix products; they do not add.",
                "C": "The identity matrix does not overwrite A; it leaves A unchanged.",
                "D": "The determinant of AB is not computed by entry-by-entry multiplication."
              },
              "hint": "The identity matrix acts like 1 for multiplication.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        },
        {
          "id": "matrix_vector_and_inverse",
          "label": "Using y=Ax and x=A^{-1}y",
          "importance": "high",
          "exam_weight": "high",
          "mastery_rule": {
            "correct_streak_required": 1
          },
          "questions": [
            {
              "id": "kp5_q1",
              "type": "multiple_choice",
              "stem": "A is 3 by 2 and x is a column vector. Which size must x have for y=Ax to be defined?",
              "options": [
                "A. 2 by 1",
                "B. 3 by 1",
                "C. 1 by 2",
                "D. 1 by 3"
              ],
              "correct_option": "A",
              "explanation": "A has 2 columns, so the column vector must have 2 rows. The output y will then be 3 by 1.",
              "wrong_option_explanations": {
                "B": "3 by 1 is the output size, not the required input size.",
                "C": "The section treats x as a column vector, not a row vector.",
                "D": "This does not match the columns of A."
              },
              "hint": "For Ax, rows of x must match columns of A.",
              "needs_visual": false,
              "same_point_variant": false
            },
            {
              "id": "kp5_q2",
              "type": "short_answer",
              "stem": "A classmate sees y=Ax and writes yA^{-1}=x. Explain why the textbook instead uses x=A^{-1}y.",
              "ideal_answer": "The inverse must premultiply both sides because A multiplies x on the left in y=Ax. Premultiplying gives A^{-1}y=A^{-1}Ax=Ix=x, so x=A^{-1}y. Writing yA^{-1} changes the order and may not even be defined.",
              "grading_rubric": [
                "Must mention that matrix multiplication order matters.",
                "Must state that A^{-1} premultiplies y.",
                "Must use or describe A^{-1}A=I.",
                "Must conclude x=A^{-1}y."
              ],
              "explanation": "This checks whether the student understands inverse multiplication as an operation with order, not ordinary scalar division.",
              "hint": "You must undo A on the same side where A is multiplying x.",
              "needs_visual": false,
              "same_point_variant": false
            }
          ]
        }
      ]
    }
  ]
}
```
