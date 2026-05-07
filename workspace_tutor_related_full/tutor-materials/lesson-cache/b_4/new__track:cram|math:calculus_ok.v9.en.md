# B.4 Cramer's Rule

> **Objective:** Solve square linear systems using determinants — fast, pattern-driven, exam-ready.

---

Cramer's rule is tested in one specific scenario: **n linear equations in n unknowns** where the coefficient determinant is nonzero. The core pattern is simple — to find unknown x_k, replace column k of the coefficient matrix with the right-hand-side constants, compute that new determinant, then divide by the original coefficient determinant.

### WHAT TO MEMORIZE

**x_k = Delta_k / Delta**, where Delta is the coefficient determinant and Delta_k has column k replaced by the constants.

### TWO EXAM TRAPS

1. **Replacing a row instead of a column** — always replace a column.
2. **Forgetting to compute Delta first** — if Delta = 0, stop immediately. Cramer's rule does not apply.

$$\begin{aligned}a_{11}x_1+a_{12}x_2+\cdots+a_{1n}x_n&=y_1\\a_{21}x_1+a_{22}x_2+\cdots+a_{2n}x_n&=y_2\\&\vdots\\a_{n1}x_1+a_{n2}x_2+\cdots+a_{nn}x_n&=y_n\end{aligned}$$
*This is the square system Cramer's rule is built for: n equations in exactly n unknowns. The coefficients a_ij fill the main determinant Delta, and the constants y_1, y_2, ..., y_n form the replacement column — swapped in one at a time to solve for each unknown.*

![Fig. B.11](/figures/page-023-fig__b_11-1.png)
*Fig. B.11 from the textbook illustrates a structured equation system layout — the same column-by-column organization that Cramer's rule exploits to isolate each unknown.*

## 1. The Rule You Actually Use on Exams

Follow this checklist every time:

1. **Build the coefficient matrix** — extract only the x-coefficients, aligned by variable order across all equations.
2. **Compute Delta** — the determinant of that coefficient matrix. If Delta = 0, stop.
3. **For x_1:** replace column 1 with the constants column, compute Delta_1, then x_1 = Delta_1 / Delta.
4. **Repeat** for x_2, x_3, etc., replacing the matching column each time.

### WORKED EXAMPLE (2x2)

System: **2x + y = 5** and **x - y = 1**

| Step | Calculation | Result |
|------|-------------|--------|
| Delta | (2)(-1) - (1)(1) | **-3** |
| Delta_x (replace col 1) | (5)(-1) - (1)(1) | **-6** |
| Delta_y (replace col 2) | (2)(1) - (5)(1) | **-3** |
| x = Delta_x / Delta | -6 / -3 | **x = 2** |
| y = Delta_y / Delta | -3 / -3 | **y = 1** |

> **Pattern check:** Delta first, then replace one column per unknown. Never skip the denominator step.

> ⚠️ Chart render error: exit 1

## 2. Fast Recognition Rules and Exam Traps

### WHEN TO USE CRAMER'S RULE

- **Square system only:** same number of equations and unknowns.
- **Compute Delta first.** If Delta = 0, the rule fails — stop and use another method.
- **Replace columns, never rows.** This is the single most common mechanical error.
- **Standard form required:** constants must be on the right-hand side, variables aligned in the same order across every equation.

### COMMON MISTAKE

Consider: **3x + 2y = 7** and **y + 3x = 4**. The second equation lists y before x. If you read coefficients left-to-right without reordering, your matrix columns will be mismatched. Always rewrite as **3x + y = 4** first, so both equations follow the same x-then-y order.

> **Fastest check:** Same variable order in every equation, then replace one column only.

$$x_k = \frac{\Delta_k}{\Delta}, \qquad \Delta \neq 0$$
*This is the formula reference for the entire section. Delta is the determinant of the original coefficient matrix. Delta_k is formed by replacing column k with the constants column from the right-hand side. The condition Delta not equal to zero is your exam checkpoint — verify it before computing anything else; if it fails, Cramer's rule cannot be applied.*

---
**📌 Key Takeaways**
- Use Cramer's rule only for square linear systems with a nonzero coefficient determinant Delta.
- To find x_k, replace column k with the constants column and compute Delta_k / Delta.
- If Delta = 0, stop immediately — Cramer's rule does not yield a unique solution.

*For exams: standardize equation order, compute Delta first, then replace columns carefully. In the next section we will explore additional matrix methods and properties that extend these determinant-based ideas to broader linear algebra problems.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NSwicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo0LCJtYXgiOjZ9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6IndoZW5fY3JhbWVyc19ydWxlX2FwcGxpZXMiLCJsYWJlbCI6IldoZW4gQ3JhbWVyJ3MgcnVsZSBjYW4gYmUgdXNlZCIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJoaWdoIiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoyfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwMV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiRm9yIHdoaWNoIHN5c3RlbSBpcyBDcmFtZXIncyBydWxlIGRpcmVjdGx5IGFwcGxpY2FibGU/Iiwib3B0aW9ucyI6WyJBLiBUd28gZXF1YXRpb25zIGluIHRocmVlIHVua25vd25zIiwiQi4gVGhyZWUgbGluZWFyIGVxdWF0aW9ucyBpbiB0aHJlZSB1bmtub3ducyB3aXRoIG5vbnplcm8gY29lZmZpY2llbnQgZGV0ZXJtaW5hbnQiLCJDLiBUaHJlZSBlcXVhdGlvbnMgaW4gdGhyZWUgdW5rbm93bnMgd2l0aCBjb2VmZmljaWVudCBkZXRlcm1pbmFudCBlcXVhbCB0byB6ZXJvIiwiRC4gT25lIG5vbmxpbmVhciBlcXVhdGlvbiBhbmQgb25lIGxpbmVhciBlcXVhdGlvbiBpbiB0d28gdW5rbm93bnMiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJDcmFtZXIncyBydWxlIGlzIGZvciBhIHNxdWFyZSBsaW5lYXIgc3lzdGVtIHdpdGggYSBub256ZXJvIGNvZWZmaWNpZW50IGRldGVybWluYW50LCB3aGljaCBndWFyYW50ZWVzIGEgdW5pcXVlIHNvbHV0aW9uIGJ5IHRoaXMgbWV0aG9kLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlRoZSBzeXN0ZW0gaXMgbm90IHNxdWFyZSwgc28gQ3JhbWVyJ3MgcnVsZSBkb2VzIG5vdCBhcHBseSBkaXJlY3RseS4iLCJDIjoiSWYgdGhlIG1haW4gZGV0ZXJtaW5hbnQgaXMgemVybywgdGhlIHJ1bGUgZG9lcyBub3QgcHJvZHVjZSBhIHVuaXF1ZSBzb2x1dGlvbi4iLCJEIjoiQ3JhbWVyJ3MgcnVsZSBpcyBmb3IgbGluZWFyIHN5c3RlbXMsIG5vdCBtaXhlZCBub25saW5lYXIgc3lzdGVtcy4ifSwiaGludCI6IkNoZWNrIHRocmVlIHRoaW5nczogbGluZWFyLCBzcXVhcmUsIG5vbnplcm8gbWFpbiBkZXRlcm1pbmFudC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkEgMngyIGxpbmVhciBzeXN0ZW0gaGFzIG1haW4gZGV0ZXJtaW5hbnQgRGVsdGEgPSAwLiBXaGF0IGlzIHRoZSBjb3JyZWN0IGV4YW0gbW92ZT8iLCJvcHRpb25zIjpbIkEuIENvbnRpbnVlIGFuZCBkaXZpZGUgYnkgemVybyIsIkIuIFJlcGxhY2UgYSByb3cgaW5zdGVhZCBvZiBhIGNvbHVtbiIsIkMuIFN0b3A6IENyYW1lcidzIHJ1bGUgZG9lcyBub3QgZ2l2ZSBhIHVuaXF1ZSBzb2x1dGlvbiBoZXJlIiwiRC4gU3dhcCB0aGUgdHdvIGVxdWF0aW9ucyBhbmQgdHJ5IGFnYWluIl0sImNvcnJlY3Rfb3B0aW9uIjoiQyIsImV4cGxhbmF0aW9uIjoiVGhlIGZvcm11bGEgeF9rID0gRGVsdGFfay9EZWx0YSByZXF1aXJlcyBEZWx0YSBub3QgZXF1YWwgdG8gemVyby4gSWYgRGVsdGEgPSAwLCBDcmFtZXIncyBydWxlIGNhbm5vdCBiZSB1c2VkIHRvIG9idGFpbiBhIHVuaXF1ZSBzb2x1dGlvbi4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkEiOiJEaXZpc2lvbiBieSB6ZXJvIGlzIGludmFsaWQuIiwiQiI6IlRoZSBtZXRob2QgYWx3YXlzIHJlcGxhY2VzIGNvbHVtbnMsIGFuZCB0aGF0IHN0aWxsIHdvdWxkIG5vdCBmaXggRGVsdGEgPSAwLiIsIkQiOiJTd2FwcGluZyBlcXVhdGlvbnMgY2hhbmdlcyBzaWduIGNvbnZlbnRpb25zIGF0IG1vc3QsIGJ1dCBkb2VzIG5vdCBjcmVhdGUgYSBub256ZXJvIGRldGVybWluYW50IGZyb20gYSB6ZXJvIG9uZS4ifSwiaGludCI6IlRoZSBkZW5vbWluYXRvciBpcyB0aGUgY2hlY2twb2ludC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9XX0seyJpZCI6ImNvbHVtbl9yZXBsYWNlbWVudF9wYXR0ZXJuIiwibGFiZWwiOiJIb3cgdG8gZm9ybSB0aGUgZGV0ZXJtaW5hbnQgZm9yIGVhY2ggdmFyaWFibGUiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDJfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkZvciB0aGUgc3lzdGVtIGExMXggKyBhMTJ5ID0geTEgYW5kIGEyMXggKyBhMjJ5ID0geTIsIHdoaWNoIGRldGVybWluYW50IGlzIHVzZWQgZm9yIHg/Iiwib3B0aW9ucyI6WyJBLiBSZXBsYWNlIHRoZSBmaXJzdCByb3cgYnkgeTEsIHkyIiwiQi4gUmVwbGFjZSB0aGUgZmlyc3QgY29sdW1uIGJ5IHkxLCB5MiIsIkMuIFJlcGxhY2UgdGhlIHNlY29uZCBjb2x1bW4gYnkgeTEsIHkyIiwiRC4gUmVwbGFjZSBib3RoIGNvbHVtbnMgYnkgeTEsIHkyIl0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVG8gZmluZCB4LCByZXBsYWNlIHRoZSB4LWNvbHVtbiwgd2hpY2ggaXMgdGhlIGZpcnN0IGNvbHVtbiwgYnkgdGhlIGNvbnN0YW50cyBjb2x1bW4uIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiQ3JhbWVyJ3MgcnVsZSByZXBsYWNlcyBjb2x1bW5zLCBub3Qgcm93cy4iLCJDIjoiUmVwbGFjaW5nIHRoZSBzZWNvbmQgY29sdW1uIHdvdWxkIHByb2R1Y2UgdGhlIGRldGVybWluYW50IGZvciB5LCBub3QgeC4iLCJEIjoiUmVwbGFjaW5nIGJvdGggY29sdW1ucyBpcyBub3QgQ3JhbWVyJ3MgcnVsZS4ifSwiaGludCI6Ik1hdGNoIHRoZSB2YXJpYWJsZSB0byBpdHMgY29sdW1uLiIsIm5lZWRzX3Zpc3VhbCI6dHJ1ZSwidmlzdWFsX3R5cGUiOiJtYXRyaXhfY29sdW1uX3JlcGxhY2VtZW50X2RpYWdyYW0iLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDJfcTIiLCJ0eXBlIjoic2hvcnRfYW5zd2VyIiwic3RlbSI6IldyaXRlIHRoZSBkZXRlcm1pbmFudCBleHByZXNzaW9uIGZvciB5IGluIHRoZSAyeDIgc3lzdGVtIDJ4ICsgeSA9IDUgYW5kIHggLSB5ID0gMSwgdGhlbiBnaXZlIHRoZSB2YWx1ZSBvZiB5LiIsImlkZWFsX2Fuc3dlciI6IlRoZSBtYWluIGRldGVybWluYW50IGlzIERlbHRhID0gfDIgMTsgMSAtMXwgPSAoMikoLTEpIC0gKDEpKDEpID0gLTMuIEZvciB5LCByZXBsYWNlIHRoZSBzZWNvbmQgY29sdW1uOiBEZWx0YV95ID0gfDIgNTsgMSAxfCA9ICgyKSgxKSAtICg1KSgxKSA9IC0zLiBTbyB5ID0gRGVsdGFfeSAvIERlbHRhID0gKC0zKSAvICgtMykgPSAxLiIsImdyYWRpbmdfcnVicmljIjpbIk11c3QgY29tcHV0ZSBvciBjb3JyZWN0bHkgc3RhdGUgdGhlIG1haW4gZGV0ZXJtaW5hbnQgRGVsdGEgPSAtMyIsIk11c3QgcmVwbGFjZSB0aGUgc2Vjb25kIGNvbHVtbiwgbm90IHRoZSBmaXJzdCIsIk11c3QgY29tcHV0ZSBEZWx0YV95ID0gLTMgY29ycmVjdGx5IiwiTXVzdCBjb25jbHVkZSB5ID0gMSJdLCJleHBsYW5hdGlvbiI6IlRoaXMgdmVyaWZpZXMgdGhhdCB0aGUgc3R1ZGVudCBjYW4gZXhlY3V0ZSB0aGUgcmVwbGFjZW1lbnQgcGF0dGVybiBhbmQgbm90IGp1c3QgcmVjb2duaXplIGl0LiIsImhpbnQiOiJGb3IgeSwgcmVwbGFjZSB0aGUgeS1jb2x1bW4gb25seS4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfV19LHsiaWQiOiJzdGFuZGFyZF9mb3JtX2FuZF9vcmRlciIsImxhYmVsIjoiU3RhbmRhcmQgZm9ybSBhbmQgY29uc2lzdGVudCB2YXJpYWJsZSBvcmRlciIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IkJlZm9yZSBhcHBseWluZyBDcmFtZXIncyBydWxlIHRvIHRoZSBzeXN0ZW0gM3ggKyAyeSA9IDcgYW5kIHkgKyAzeCA9IDQsIHdoYXQgc2hvdWxkIHlvdSBkbyBmaXJzdD8iLCJvcHRpb25zIjpbIkEuIFVzZSB0aGUgZXF1YXRpb25zIGFzIHdyaXR0ZW4gYmVjYXVzZSBvcmRlciBuZXZlciBtYXR0ZXJzIiwiQi4gUmV3cml0ZSB0aGUgc2Vjb25kIGVxdWF0aW9uIGFzIDN4ICsgeSA9IDQgc28gdGhlIHZhcmlhYmxlIG9yZGVyIG1hdGNoZXMiLCJDLiBNb3ZlIGFsbCBjb25zdGFudHMgdG8gdGhlIGxlZnQgc2lkZSIsIkQuIFJlcGxhY2UgdGhlIHNlY29uZCByb3cgd2l0aCA3IGFuZCA0Il0sImNvcnJlY3Rfb3B0aW9uIjoiQiIsImV4cGxhbmF0aW9uIjoiVGhlIGNvZWZmaWNpZW50IG1hdHJpeCBtdXN0IGJlIGJ1aWx0IHVzaW5nIGEgY29uc2lzdGVudCB2YXJpYWJsZSBvcmRlciBhY3Jvc3MgYWxsIGVxdWF0aW9ucywgc28gdGhlIHNlY29uZCBlcXVhdGlvbiBzaG91bGQgYmUgcmV3cml0dGVuIGFzIDN4ICsgeSA9IDQuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiT3JkZXIgbWF0dGVycyB3aGVuIHJlYWRpbmcgY29lZmZpY2llbnRzIGludG8gbWF0cml4IGNvbHVtbnMuIiwiQyI6IlN0YW5kYXJkIGZvcm0gaXMgaGVscGZ1bCwgYnV0IHRoZSBrZXkgaXNzdWUgaGVyZSBpcyBjb25zaXN0ZW50IHZhcmlhYmxlIG9yZGVyIGFuZCBrZWVwaW5nIGNvbnN0YW50cyBvbiB0aGUgcmlnaHQuIiwiRCI6IlJvd3MgYXJlIG5vdCByZXBsYWNlZCBpbiBDcmFtZXIncyBydWxlLiJ9LCJoaW50IjoiQ29sdW1ucyBjb3JyZXNwb25kIHRvIGEgZml4ZWQgdmFyaWFibGUgb3JkZXIuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50IjpmYWxzZX1dfV19" style="display:none;"></div>%%KC_END%%
