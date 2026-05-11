%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImdlbmVyYXRlZF9pbWFnZSIsInJhdGlvbmFsZSI6IlRoaXMgc2VjdGlvbiBoYXMgbm8gZXh0cmFjdGVkIHRleHRib29rIGZpZ3VyZXMsIGJ1dCB0aGUga2V5IGlkZWFzIGFyZSBoaWdobHkgdmlzdWFsOiBzdGVwLWJ5LXN0ZXAgdmVjdG9yIGNyZWF0aW9uLCAxLWJhc2VkIGluZGV4aW5nLCBhbmQgdGhlIG1pc21hdGNoIGJldHdlZW4gaW5kZXggcG9zaXRpb24gYW5kIHZhcmlhYmxlIHZhbHVlLiBDbGVhbiBnZW5lcmF0ZWQgbGVjdHVyZS1ub3RlIHZpc3VhbHMgd2lsbCBtYWtlIHRoZSBleGFtIHBhdHRlcm5zIGZhc3RlciB0byByZWNvZ25pemUgdGhhbiBkZW5zZSBPQ1Itb25seSBleHBsYW5hdGlvbi4iLCJjcmFtIjoiVXNlIHZpc3VhbHMgdG8gc2hvdyB0aGUgZXhhY3QgcGF0dGVybiB0byByZWFkIGZhc3Q6IHN0YXJ0LCBzdGVwLCBzdG9wOyB0aGVuIGluZGV4IHN0YXJ0cyBhdCAxLCBub3QgYXQgdGhlIHZhcmlhYmxlIHZhbHVlLiIsInN0YW5kYXJkIjoiVXNlIHZpc3VhbHMgdG8gY29ubmVjdCBNQVRMQUIgc3ludGF4IHRvIHRoZSByZXN1bHRpbmcgdmVjdG9yIGFuZCBvbmUgaW5kZXhpbmcgZXhhbXBsZSBjbGVhcmx5LiIsInRvcF9zY29yZSI6IlVzZSB2aXN1YWxzIHRvIGV4cG9zZSBlZGdlIGNhc2VzOiB0ZXJtaW5hdGlvbiB2YWx1ZSBtYXkgYmUgZXhjbHVkZWQsIG5lZ2F0aXZlIHN0ZXBzIHN0aWxsIHdvcmssIGFuZCBpbmRleCBwb3NpdGlvbiBpcyBub3QgdGhlIHNhbWUgYXMgdCBvciBrLiJ9" style="display:none;"></div>%%KC_END%%
# B.7-3 Vector Operations

> **Section Objective:** Master MATLAB vector creation syntax and indexing so you can read, predict, and write vector commands without hesitation on the exam.

Type `0:2:11` in MATLAB and you instantly get `[0 2 4 6 8 10]` — six values in one command. This section tests three things repeatedly: reading the `a:b:c` notation, predicting whether the endpoint actually appears, and using index numbers without confusing them with the variable value. Get these three patterns right and vector questions become free points. The payoff is real: one short command replaces a loop of scalar assignments, and knowing exactly what it produces separates confident answers from guesses.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="exam_pattern_anchor" data-visual-use-b64="eyJjcmFtIjoiU2hvdyB0aGUgcmVhZC1vcmRlciBwYXR0ZXJuIGluc3RhbnRseTogc3RhcnQsIHN0ZXAsIGtlZXAgZ29pbmcsIHN0b3AgYmVmb3JlIG92ZXJzaG9vdGluZy4iLCJzdGFuZGFyZCI6IkNsYXJpZnkgaG93IE1BVExBQiBzeW50YXggdHVybnMgaW50byBhbiBhY3R1YWwgcm93IHZlY3Rvci4iLCJ0b3Bfc2NvcmUiOiJIaWdobGlnaHQgZW5kcG9pbnQgZXhjbHVzaW9uIGFuZCBuZWdhdGl2ZS1zdGVwIHZhcmlhbnRzIGFzIGNvbW1vbiB0cmFwcy4ifQ==" style="display:none;"></div>%%KC_END%%
*🎨 The a:b:c pattern: start at a, add b repeatedly, stop before overshooting c. The endpoint is a limit, not a guarantee.*
![Illustration](/generated/gptimage2-1777214537301-5943.png)

## 1. Reading MATLAB Vector Notation Fast

Every `a:b:c` command follows the same three-part rule:

| Part | Role | Example (`0:2:11`) |
|------|------|--------------------|
| `a` | First value | `0` |
| `b` | Step size | `2` |
| `c` | Stopping limit | `11` |

### HOW TO PARSE IT

Start at `a`, then keep adding `b`. Stop the moment the next value would pass `c`. Do not force `c` into the vector.

**Three OCR examples to know cold:**

- `k = 0:2:11` → `[0 2 4 6 8 10]` — next would be 12, which passes 11, so stop.
- `k = 11:-10/3:0` → `[11 7.6667 4.3333 1.0000]` — negative step works the same way downward.
- `k = 0:11` → `[0 1 2 3 ... 11]` — omitted step defaults to 1.

#### Default Step Rule

When only two numbers appear (`a:c`), MATLAB uses step size `b = 1` automatically.

> **The termination value is a stopping limit, not a guaranteed member of the vector.**

$$k = 0:2:11 \qquad k = 11:-\dfrac{10}{3}:0 \qquad k = 0:11$$
*These three forms illustrate positive-step, negative-step, and default-step (step omitted, so \(b = 1\)) row-vector creation in MATLAB.*

## 2. Indexing: The High-Frequency Trap

### THE CORE RULE

MATLAB indices start at **1**, not 0. This single fact causes more lost marks than any other MATLAB detail.

**Example 1 — the k = 0:99 trap:**

Let `k = 0:99`. The vector holds 100 values. Their positions and values are:

| Index position | 1 | 2 | 3 | 4 | 5 | ... |
|----------------|---|---|---|---|---|-----|
| k value | 0 | 1 | 2 | 3 | 4 | ... |

So `k(5) = 4`, not 5. Index position and variable value are different things.

**Example 2 — the sampled signal trap:**

If a time vector starts at \(t = 0\), then `f(1)` is the first stored sample — the value at \(t = 0\), not \(t = 1\). The index 1 labels the storage slot, not the time.

**Example 3 — range indexing:**

`w(98:100)` grabs three elements at once: the elements stored at positions 98, 99, and 100. When `k = 0:99`, those positions correspond to \(k = 97, 98, 99\) — not \(k = 98, 99, 100\).

### EXAM TIP

> **Index position and variable value are different things.** Always subtract 1 from the index to find the corresponding \(k\) or \(t\) value when the variable starts at 0.

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="trap_exposure" data-visual-use-b64="eyJjcmFtIjoiQnVybiBpbiB0aGUgcnVsZSB0aGF0IE1BVExBQiBwb3NpdGlvbiBzdGFydHMgYXQgMSBldmVuIHdoZW4gdGhlIHZhcmlhYmxlIHN0YXJ0cyBhdCAwLiIsInN0YW5kYXJkIjoiTWFrZSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIGluZGV4IGFuZCB2YXJpYWJsZSB2YWx1ZSBlYXN5IHRvIHNlZS4iLCJ0b3Bfc2NvcmUiOiJIaWdobGlnaHQgYm90aCBzaW5nbGUtaW5kZXggYW5kIGluZGV4LXJhbmdlIHJlYWRpbmcgdG8gcHJldmVudCBzdWJ0bGUgbm90YXRpb24gZXJyb3JzLiJ9" style="display:none;"></div>%%KC_END%%
*🎨 Index position (1, 2, 3, ...) is not the same as the variable value (0, 1, 2, ...). k(5) = 4 when k starts at 0.*
![Illustration](/generated/gptimage2-1777214727485-2893.png)

---
**📌 Key Takeaways**
- Use a:b:c to create vectors — start at a, add b repeatedly, stop before overshooting c.
- The termination value c is a stopping limit and may not appear in the final vector.
- MATLAB indices start at 1, so index position and variable value are always offset by 1.

*In the next section we will visualize vectors and signals with plotting.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NiwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo1LCJtYXgiOjd9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6InZlY3Rvcl9jcmVhdGlvbl9zeW50YXgiLCJsYWJlbCI6IlJlYWQgYW5kIHByZWRpY3QgTUFUTEFCIHZlY3RvciBjcmVhdGlvbiB3aXRoIGE6YjpjIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCB2ZWN0b3IgaXMgY3JlYXRlZCBieSB0aGUgTUFUTEFCIGNvbW1hbmQgYGsgPSAwOjI6MTFgPyIsIm9wdGlvbnMiOlsiQS4gWzAgMiA0IDYgOCAxMF0iLCJCLiBbMCAyIDQgNiA4IDEwIDExXSIsIkMuIFsyIDQgNiA4IDEwXSIsIkQuIFswIDIgNCA2IDggMTAgMTJdIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiU3RhcnQgYXQgMCBhbmQga2VlcCBhZGRpbmcgMi4gVGhlIG5leHQgdmFsdWUgYWZ0ZXIgMTAgd291bGQgYmUgMTIsIHdoaWNoIHBhc3NlcyAxMSwgc28gc3RvcCBhdCAxMC4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJDb3JyZWN0LiIsIkIiOiIxMSBpcyBub3QgZm9yY2VkIGluOyBpdCBtdXN0IGJlIHJlYWNoZWQgYnkgcmVwZWF0ZWQgc3RlcHMuIiwiQyI6IlRoZSBpbml0aWFsIHZhbHVlIDAgd2FzIGluY29ycmVjdGx5IHNraXBwZWQuIiwiRCI6IjEyIG92ZXJzaG9vdHMgdGhlIHRlcm1pbmF0aW9uIHZhbHVlIDExLiJ9LCJoaW50IjoiVHJlYXQgMTEgYXMgYSBzdG9wcGluZyBsaW1pdCwgbm90IGEgZ3VhcmFudGVlZCBmaW5hbCBlbGVtZW50LiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJnZW5lcmF0ZV9pbWFnZSIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hhdCBkb2VzIE1BVExBQiBwcm9kdWNlIGZvciBgayA9IDExOi0xMC8zOjBgPyIsIm9wdGlvbnMiOlsiQS4gWzExIDcuNjY2NyA0LjMzMzMgMS4wMDAwXSIsIkIuIFsxMSA4IDUgMiAwXSIsIkMuIFsxMSA3LjY2NjcgNC4zMzMzIDEuMDAwMCAtMi4zMzMzXSIsIkQuIFswIDMuMzMzMyA2LjY2NjcgMTBdIl0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiQSBuZWdhdGl2ZSBzdGVwIGlzIGFsbG93ZWQuIFN0YXJ0IGF0IDExIGFuZCByZXBlYXRlZGx5IHN1YnRyYWN0IFxcKDEwLzNcXCkgdW50aWwgdGhlIG5leHQgc3RlcCB3b3VsZCBwYXNzIGJlbG93IDAuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiQ29ycmVjdC4iLCJCIjoiVGhpcyByZXBsYWNlcyB0aGUgYWN0dWFsIHN0ZXAgd2l0aCByb3VuZGVkIGludGVnZXJzLiIsIkMiOiJUaGUgbGFzdCB2YWx1ZSBzaG93biBnb2VzIHBhc3QgdGhlIHRlcm1pbmF0aW9uIHZhbHVlIDAuIiwiRCI6IlRoaXMgcmV2ZXJzZXMgdGhlIGRpcmVjdGlvbiBhbmQgY2hhbmdlcyB0aGUgc3RlcC4ifSwiaGludCI6IkZvciBhIG5lZ2F0aXZlIHN0ZXAsIGtlZXAgbW92aW5nIGRvd253YXJkIHVudGlsIHRoZSBuZXh0IHZhbHVlIHdvdWxkIGdvIGJlbG93IHRoZSBzdG9wIHZhbHVlLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMV9xMyIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiSWYgTUFUTEFCIHNlZXMgdGhlIGNvbW1hbmQgYDA6MTFgLCB3aGF0IHN0ZXAgc2l6ZSBpcyB1c2VkPyIsIm9wdGlvbnMiOlsiQS4gMCIsIkIuIDEiLCJDLiAxMSIsIkQuIE1BVExBQiBjYW5ub3QgZGVjaWRlIHdpdGhvdXQgYSBtaWRkbGUgbnVtYmVyIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiV2hlbiB0aGUgc3RlcCBpcyBvbWl0dGVkLCBNQVRMQUIgYXNzdW1lcyBhIHN0ZXAgc2l6ZSBvZiAxLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkEgc3RlcCBvZiAwIHdvdWxkIG5ldmVyIHByb2dyZXNzIHRocm91Z2ggdGhlIHZlY3Rvci4iLCJCIjoiQ29ycmVjdC4iLCJDIjoiMTEgaXMgdGhlIHN0b3BwaW5nIHZhbHVlLCBub3QgdGhlIHN0ZXAuIiwiRCI6Ik1BVExBQiBoYXMgYSBkZWZhdWx0IHN0ZXAgdmFsdWUgb2YgMS4ifSwiaGludCI6IlJlbWVtYmVyIHRoZSBkZWZhdWx0LXN0ZXAgcnVsZS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJpbmRleGluZ192c192YXJpYWJsZSIsImxhYmVsIjoiU2VwYXJhdGUgaW5kZXggcG9zaXRpb24gZnJvbSB0aGUgYWN0dWFsIHZhcmlhYmxlIHZhbHVlIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJTdXBwb3NlIGBrID0gMDo5OWAgYW5kIGB3YCBpcyBjb21wdXRlZCBmcm9tIGBrYC4gV2hpY2ggc3RhdGVtZW50IGlzIGNvcnJlY3Q/Iiwib3B0aW9ucyI6WyJBLiB3KDUpIGNvcnJlc3BvbmRzIHRvIGsgPSA1IGJlY2F1c2UgdGhlIGluZGV4IGlzIDUiLCJCLiB3KDUpIGNvcnJlc3BvbmRzIHRvIGsgPSA0IGJlY2F1c2UgTUFUTEFCIGluZGV4aW5nIHN0YXJ0cyBhdCAxIiwiQy4gdyg1KSBjb3JyZXNwb25kcyB0byBrID0gMCBiZWNhdXNlIHZlY3RvcnMgYWx3YXlzIHN0YXJ0IGF0IDAiLCJELiB3KDUpIGlzIGludmFsaWQgYmVjYXVzZSBrIGlzIG5vdCBhbiBpbmRleCJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6IlRoZSBmaXJzdCBzdG9yZWQgZWxlbWVudCBoYXMgaW5kZXggMSwgc28gdGhlIGZpZnRoIHN0b3JlZCBlbGVtZW50IGxpbmVzIHVwIHdpdGggdGhlIGZpZnRoIGVudHJ5IG9mIFxcKGtcXCksIHdoaWNoIGlzIFxcKGsgPSA0XFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgY29uZnVzZXMgaW5kZXggcG9zaXRpb24gd2l0aCB0aGUgdmFsdWUgc3RvcmVkIGluIHRoZSB2ZWN0b3Igay4iLCJCIjoiQ29ycmVjdC4iLCJDIjoiT25seSB0aGUgdmFyaWFibGUgdmFsdWUgc3RhcnRzIGF0IDA7IHRoZSBpbmRleCBzdGlsbCBzdGFydHMgYXQgMS4iLCJEIjoidyg1KSBpcyB2YWxpZCBNQVRMQUIgaW5kZXhpbmcuIn0sImhpbnQiOiJMaXN0IHRoZSBmaXJzdCBmaXZlIGsgdmFsdWVzIHdpdGggdGhlaXIgcG9zaXRpb25zOiBpbmRleCAxIOKGkiBrID0gMCwgaW5kZXggMiDihpIgayA9IDEsIC4uLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJnZW5lcmF0ZV9pbWFnZSIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX0seyJpZCI6ImtwMl9xMiIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiQSBzaWduYWwgaXMgc2FtcGxlZCB1c2luZyBhIHRpbWUgdmVjdG9yIHRoYXQgc3RhcnRzIGF0IFxcKHQgPSAwXFwpLiBXaGF0IGRvZXMgYGYoMSlgIG1lYW4gaW4gTUFUTEFCPyIsIm9wdGlvbnMiOlsiQS4gVGhlIGZ1bmN0aW9uIHZhbHVlIGF0IHQgPSAxIiwiQi4gVGhlIGZpcnN0IHN0b3JlZCBzYW1wbGUsIHdoaWNoIGlzIHRoZSB2YWx1ZSBhdCB0ID0gMCIsIkMuIFRoZSBzbG9wZSBvZiBmIGF0IHQgPSAxIiwiRC4gVGhlIGZpcnN0IG5vbnplcm8gdmFsdWUgb2YgdGhlIGZ1bmN0aW9uIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiTUFUTEFCIHVzZXMgMS1iYXNlZCBpbmRleGluZywgc28gYGYoMSlgIG1lYW5zIHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBzdG9yZWQgdmVjdG9yLiBJZiB0aGUgdGltZSB2ZWN0b3Igc3RhcnRzIGF0IFxcKHQgPSAwXFwpLCB0aGF0IGZpcnN0IGVsZW1lbnQgaXMgdGhlIHZhbHVlIGF0IFxcKHQgPSAwXFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoaXMgaXMgdGhlIHN0YW5kYXJkIG1hdGggbm90YXRpb24gdHJhcDsgTUFUTEFCIGluZGV4aW5nIGlzIGRpZmZlcmVudC4iLCJCIjoiQ29ycmVjdC4iLCJDIjoiSW5kZXhpbmcgZG9lcyBub3QgYXNrIGZvciBhIGRlcml2YXRpdmUuIiwiRCI6IlRoZSBmaXJzdCBzdG9yZWQgc2FtcGxlIG1heSBvciBtYXkgbm90IGJlIG5vbnplcm8uIn0sImhpbnQiOiJTZXBhcmF0ZSBzdG9yZWQgcG9zaXRpb24gZnJvbSB0aGUgY29udGludW91cy12YXJpYWJsZSBsYWJlbC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTMiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IkV4cGxhaW4gd2h5IHRoZSBNQVRMQUIgY29tbWFuZCBgdyg5ODoxMDApYCBkb2VzIG5vdCBjb3JyZXNwb25kIHRvIFxcKGsgPSA5OCwgOTksIDEwMFxcKSB3aGVuIGBrID0gMDo5OWAuIiwiaWRlYWxfYW5zd2VyIjoiQmVjYXVzZSA5ODoxMDAgaXMgYW4gaW5kZXggcmFuZ2UsIG5vdCB0aGUgdmFyaWFibGUgdmFsdWVzLiBNQVRMQUIgaW5kaWNlcyBzdGFydCBhdCAxLCBzbyBwb3NpdGlvbnMgOTgsIDk5LCBhbmQgMTAwIGNvcnJlc3BvbmQgdG8gayB2YWx1ZXMgOTcsIDk4LCBhbmQgOTkuIiwiZ3JhZGluZ19ydWJyaWMiOlsiTXVzdCBzdGF0ZSB0aGF0IDk4OjEwMCByZWZlcnMgdG8gaW5kZXggcG9zaXRpb25zIiwiTXVzdCBtZW50aW9uIE1BVExBQiB1c2VzIDEtYmFzZWQgaW5kZXhpbmciLCJNdXN0IGNvcnJlY3RseSBtYXAgdGhlIGNvcnJlc3BvbmRpbmcgayB2YWx1ZXMgdG8gOTcsIDk4LCBhbmQgOTkiXSwiZXhwbGFuYXRpb24iOiJUaGlzIGNoZWNrcyB3aGV0aGVyIHRoZSBzdHVkZW50IGNhbiB0cmFuc2xhdGUgYmV0d2VlbiBzdG9yZWQgcG9zaXRpb24gYW5kIHZhcmlhYmxlIHZhbHVlIGluc3RlYWQgb2YganVzdCByZXBlYXRpbmcgdGhlIDEtYmFzZWQgcnVsZS4iLCJoaW50IjoiV3JpdGUgdGhlIGZpcnN0IGZldyBwYWlyczogaW5kZXggMSDihpIgayA9IDAsIGluZGV4IDIg4oaSIGsgPSAxLiBUaGVuIGV4dGVuZCB0aGUgcGF0dGVybiB0byBpbmRleCA5OC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19XX0=" style="display:none;"></div>%%KC_END%%
