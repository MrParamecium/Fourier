%%KC_BLOCK%%<div class="kc-visual-plan" data-visual-plan-b64="eyJwcmltYXJ5X2FuY2hvciI6ImdlbmVyYXRlZF9pbWFnZSIsInJhdGlvbmFsZSI6IlRoaXMgc2VjdGlvbiBoYXMgbm8gdGV4dGJvb2sgZmlndXJlcyBhbmQgbm8gYXZhaWxhYmxlIHdlYiBzb3VyY2VzLiBUaGUgbW9zdCB1c2VmdWwgdmlzdWFsIGlzIGEgY2xlYW4gY3VzdG9tIHdvcmtmbG93IGRpYWdyYW0gc2hvd2luZyBob3cgdGhlIGNvbW1hbmQgcHJvbXB0IGNyZWF0ZXMgb2JqZWN0cyBpbiB0aGUgd29ya3NwYWNlLiBUaGlzIGlzIG5vdCBkZWNvcmF0aXZlOyBpdCBwcmV2ZW50cyBiZWdpbm5lcnMgZnJvbSBzZWVpbmcgTUFUTEFCIGNvbW1hbmRzIGFzIGlzb2xhdGVkIG1lbW9yaXphdGlvbiBpdGVtcy4iLCJjcmFtIjoiVXNlIHRoZSB2aXN1YWwgdG8gcmVtZW1iZXIgdGhlIHNlc3Npb24gZmxvdzogdHlwZSBjb21tYW5kLCBjcmVhdGUgd29ya3NwYWNlIG9iamVjdCwgaW5zcGVjdCwgY2xlYXIsIHNhdmUsIG9yIGxvYWQuIiwic3RhbmRhcmQiOiJVc2UgdGhlIHZpc3VhbCBhcyB0aGUgbWFpbiBtZW50YWwgbW9kZWwgZm9yIG9uZSByZXByZXNlbnRhdGl2ZSBNQVRMQUIgc2Vzc2lvbi4iLCJ0b3Bfc2NvcmUiOiJVc2UgdGhlIHZpc3VhbCB0byBzZXBhcmF0ZSBzaW1pbGFyLWxvb2tpbmcgYWN0aW9uczogY2xlYXJpbmcgdGhlIGNvbW1hbmQgd2luZG93LCBjbGVhcmluZyB2YXJpYWJsZXMsIGFuZCBzYXZpbmcgd29ya3NwYWNlIGRhdGEuIn0=" style="display:none;"></div>%%KC_END%%
# B.7-1 MATLAB Overview

> **Section Objective:** Learn the basic MATLAB environment commands needed to start, inspect, save, recover, get help, and end a MATLAB session.

## Concepts In This Section

- Command prompt and workspace
- who and whos
- clear, clc, and clf
- save and load
- command history
- help and lookfor
- format, print, and exit

## 1. Command Prompt and Workspace

MATLAB work begins at the **command prompt**, displayed as \(\texttt{>>}\). Every command you type at this prompt either creates or modifies an **object**, and that object is stored in the **workspace**.

An object is simply stored MATLAB data — a number, an array, a string, or a function handle. The workspace keeps track of every object's **name**, **size**, and **class** (data type).

To open the workspace window if it is not already visible, type \(\texttt{workspace}\) at the prompt.

#### Exam Note

If a question asks where variables live after commands run, the answer is the **workspace**.

## 2. Opening the Workspace Window

Typing \(\texttt{workspace}\) at the command prompt opens the Workspace window if it is not already visible.

- **What it is:** A MATLAB session command, not a mathematical variable.
- **When to use it:** When you need to visually inspect stored objects — their names, sizes, and classes.
- **Exam trigger:** Wording such as 'view the workspace' or 'see variable name, size, and class.'
- **Common misuse:** Expecting this command to create data. It only opens a view of existing workspace data; it does not generate any new objects.

$$\texttt{workspace}$$

%%KC_BLOCK%%<div class="kc-visual-meta" data-visual-kind="generate_image" data-teaching-role="concept_anchor" data-visual-use-b64="eyJjcmFtIjoiVXNlIGl0IHRvIGluc3RhbnRseSBjb25uZWN0ICc+PiBjb21tYW5kJyB3aXRoICd3b3Jrc3BhY2Ugb2JqZWN0IGFwcGVhcnMnLiIsInN0YW5kYXJkIjoiVXNlIGl0IGFzIHRoZSBtZW50YWwgbW9kZWwgZm9yIGhvdyBNQVRMQUIgc2Vzc2lvbnMgcHJvZHVjZSBzdG9yZWQgdmFyaWFibGVzLiIsInRvcF9zY29yZSI6IlVzZSBpdCB0byBkaXN0aW5ndWlzaCBjb21tYW5kLXdpbmRvdyB0ZXh0IGZyb20gYWN0dWFsIHNhdmVkIHdvcmtzcGFjZSBvYmplY3RzLiJ9" style="display:none;"></div>%%KC_END%%
*🎨 Every command typed at \(\texttt{>>}\) creates or modifies an object stored in the Workspace, which tracks each object's name, size, and class.*
![Illustration](/generated/gptimage2-1778572263443-3819.png)

## 3. Inspecting and Clearing Stored Objects

### INSPECTION COMMANDS

Two commands let you see what is currently in the workspace:

| Command | What it shows |
|---------|---------------|
| \(\texttt{who}\) | Lists object **names** only |
| \(\texttt{whos}\) | Lists names **plus** size and class (fuller summary) |

### CLEARING COMMANDS

Four commands remove or reset things — but they target very different things:

| Command | What it clears |
|---------|----------------|
| \(\texttt{clear x}\) | Removes variable \(\texttt{x}\) from the workspace |
| \(\texttt{clear}\) | Removes **all** workspace objects |
| \(\texttt{clc}\) | Clears **command-window text** only |
| \(\texttt{clf}\) | Clears the **current figure window** |

#### Quick Check

Do not confuse clearing the screen with deleting variables. \(\texttt{clc}\) erases visible text in the command window but leaves all workspace variables untouched.

## 4. Removing One Variable

This command removes one named variable from the MATLAB workspace.

- **\(\texttt{variableName}\):** The exact name of the stored object to remove.
- **When to use it:** When a question asks how to delete selected data without deleting everything else.
- **Exam trigger:** 'Remove specific variables' or 'free resources but keep other variables.'
- **Common misuse:** Using \(\texttt{clc}\) instead — \(\texttt{clc}\) only clears visible command-window text and does **not** remove any workspace variables.

$$\texttt{clear variableName}$$

## 5. Saving and Loading Session Data

MATLAB does **not** automatically preserve workspace data between sessions. When you exit, all unsaved variables are lost. To keep important variables, save them to a MATLAB data file with the \(\texttt{.mat}\) extension.

### REPRESENTATIVE EXAMPLE

Suppose a student has variables \(\texttt{x}\) and \(\texttt{y}\) in the workspace:

- \(\texttt{save lab1 x y}\) — saves only \(\texttt{x}\) and \(\texttt{y}\) into the file \(\texttt{lab1.mat}\).
- \(\texttt{load lab1}\) — restores those variables from \(\texttt{lab1.mat}\) in a later session.

To save the **entire** workspace at once, use \(\texttt{save filename}\) with no variable names listed.

#### Exam Note

\(\texttt{save}\) **writes** a file. \(\texttt{load}\) **reads** it back. These two commands are always paired.

$$\texttt{save filename variableName}$$
*This is the **selective-save** pattern: save only named workspace objects into a \(\texttt{.mat}\) file.*

- **\(\texttt{filename}\):** The name of the output file (MATLAB appends \(\texttt{.mat}\) automatically).
- **\(\texttt{variableName}\):** The variable to store; multiple variable names may follow, separated by spaces.
- **When to use it:** When a problem asks to save specific variables but not the whole workspace.
- **Exam trigger:** 'Selectively save objects' or 'save only certain variables.'
- **Common misuse:** Assuming MATLAB automatically saves workspace variables when you exit — it does not.

## 6. Command History, Help, and Session Utilities

### COMMAND HISTORY

MATLAB remembers previously typed commands. Use the **up and down arrow keys** to scroll through them. Typing the first few characters of a command before pressing the up arrow filters the history to matching entries only — a fast way to re-run a recent command.

### HELP COMMANDS

| Situation | Command to use |
|-----------|----------------|
| You **know** the function name | \(\texttt{help functionName}\) |
| You only know a **keyword** | \(\texttt{lookfor keyword}\) |

HTML help (accessed from the Help menu) adds indexes, full-text search, graphics, and special character support beyond what command-line help provides.

### SESSION UTILITIES

- \(\texttt{format}\) — controls how numbers are **displayed** (e.g., short, long, scientific).
- \(\texttt{print}\) — saves the current figure to common file formats (e.g., PNG, PDF).
- \(\texttt{exit}\) — terminates the MATLAB session.

#### Note

\(\texttt{format}\) changes only the display of numbers, not their stored precision.

$$\texttt{help functionName}$$
*This command displays command-line documentation for a known MATLAB function.*

- **\(\texttt{functionName}\):** The exact name of the function you want to learn about.
- **When to use it:** When you already know the command name but need its syntax or parameter details.
- **Exam trigger:** 'Learn more about a function' or 'get documentation for a known command.'
- **Common misuse:** Using \(\texttt{help}\) when the function name is unknown. If you only know a topic keyword, use \(\texttt{lookfor keyword}\) instead — it searches across all function descriptions.

---
**📌 Key Takeaways**
- Commands typed at \(\texttt{>>}\) create or modify objects stored in the **workspace** (name, size, class).
- \(\texttt{workspace}\) — opens the Workspace window to view stored objects.
- \(\texttt{who}\) — lists workspace variable names only.
- \(\texttt{whos}\) — lists names plus size and class (fuller summary).
- \(\texttt{clear variableName}\) — removes one named variable from the workspace.
- \(\texttt{clear}\) — removes **all** workspace objects.
- \(\texttt{clc}\) — clears command-window text only; does **not** delete variables.
- \(\texttt{clf}\) — clears the current figure window.
- \(\texttt{save filename}\) — saves the entire workspace to a \(\texttt{.mat}\) file.
- \(\texttt{save filename variableName}\) — saves only named variables to a \(\texttt{.mat}\) file.
- \(\texttt{load filename}\) — restores variables from a \(\texttt{.mat}\) file.
- \(\texttt{help functionName}\) — shows documentation for a known function.
- \(\texttt{lookfor keyword}\) — searches functions by keyword when the name is unknown.
- \(\texttt{format}\) — controls displayed numeric format (not stored precision).
- \(\texttt{print}\) — saves the current figure to a file format.
- \(\texttt{exit}\) — terminates the MATLAB session.

*Next, you will use these basics to perform elementary MATLAB operations.*

%%KC_BLOCK%%<div class="kc-quiz-plan" data-quiz-b64="eyJ0eXBlIjoicXVpel9wbGFuIiwidGFyZ2V0X3F1ZXN0aW9ucyI6NywicXVlc3Rpb25fcmFuZ2UiOnsibWluIjo2LCJtYXgiOjh9LCJrbm93bGVkZ2VfcG9pbnRzIjpbeyJpZCI6ImNvbW1hbmRfcHJvbXB0X3dvcmtzcGFjZSIsImxhYmVsIjoiQ29tbWFuZCBwcm9tcHQgYW5kIHdvcmtzcGFjZSIsImltcG9ydGFuY2UiOiJoaWdoIiwiZXhhbV93ZWlnaHQiOiJtZWRpdW0iLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AxX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJJbiBNQVRMQUIsIHdoZXJlIGFyZSB2YXJpYWJsZXMgYW5kIGRhdGEgb2JqZWN0cyBjcmVhdGVkIGJ5IGNvbW1hbmRzIG5vcm1hbGx5IHN0b3JlZCBkdXJpbmcgYSBzZXNzaW9uPyIsIm9wdGlvbnMiOlsiQS4gSW4gdGhlIGNvbW1hbmQgaGlzdG9yeSIsIkIuIEluIHRoZSB3b3Jrc3BhY2UiLCJDLiBJbiB0aGUgaGVscCBicm93c2VyIiwiRC4gSW4gdGhlIGNvbW1hbmQgcHJvbXB0IGl0c2VsZiJdLCJjb3JyZWN0X29wdGlvbiI6IkIiLCJleHBsYW5hdGlvbiI6Ik9iamVjdHMgY3JlYXRlZCBieSBjb21tYW5kcyBhcmUgc3RvcmVkIGluIHRoZSBNQVRMQUIgd29ya3NwYWNlLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IkNvbW1hbmQgaGlzdG9yeSByZWNvcmRzIHByZXZpb3VzIGNvbW1hbmQgbGluZXMsIG5vdCB0aGUgc3RvcmVkIGRhdGEgb2JqZWN0cy4iLCJDIjoiVGhlIGhlbHAgYnJvd3NlciBpcyBmb3IgZG9jdW1lbnRhdGlvbiwgbm90IHZhcmlhYmxlIHN0b3JhZ2UuIiwiRCI6IlRoZSBjb21tYW5kIHByb21wdCBpcyB3aGVyZSBjb21tYW5kcyBhcmUgdHlwZWQ7IGl0IGlzIG5vdCB0aGUgc3RvcmFnZSBhcmVhLiJ9LCJoaW50IjoiVGhpbmsgb2YgdGhlIHBsYWNlIHRoYXQgdHJhY2tzIHZhcmlhYmxlIG5hbWUsIHNpemUsIGFuZCBjbGFzcy4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOnRydWV9LHsiaWQiOiJrcDFfcTIiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6Ik9ic2VydmUgYSBkaWFncmFtIHdoZXJlIGFuIGFycm93IGdvZXMgZnJvbSAnPj4gY29tbWFuZCcgdG8gYSB0YWJsZSBsYWJlbGVkIE5hbWUsIFNpemUsIENsYXNzLiBXaGF0IGlzIHRoZSB0YWJsZSByZXByZXNlbnRpbmc/Iiwib3B0aW9ucyI6WyJBLiBUaGUgd29ya3NwYWNlIiwiQi4gVGhlIGNvbW1hbmQgaGlzdG9yeSIsIkMuIFRoZSBIVE1MIGhlbHAgaW5kZXgiLCJELiBUaGUgY3VycmVudCBmaWd1cmUgd2luZG93Il0sImNvcnJlY3Rfb3B0aW9uIjoiQSIsImV4cGxhbmF0aW9uIjoiQSB0YWJsZSBzaG93aW5nIG9iamVjdCBuYW1lcywgc2l6ZXMsIGFuZCBjbGFzc2VzIHJlcHJlc2VudHMgdGhlIHdvcmtzcGFjZS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJDb21tYW5kIGhpc3Rvcnkgc3RvcmVzIHByZXZpb3VzbHkgdHlwZWQgY29tbWFuZCBsaW5lcywgbm90IHZhcmlhYmxlIG1ldGFkYXRhLiIsIkMiOiJIVE1MIGhlbHAgcHJvdmlkZXMgZG9jdW1lbnRhdGlvbiBhbmQgc2VhcmNoLCBub3QgbGl2ZSB3b3Jrc3BhY2UgZGF0YS4iLCJEIjoiVGhlIGZpZ3VyZSB3aW5kb3cgZGlzcGxheXMgZ3JhcGhpY3MsIG5vdCBhIHZhcmlhYmxlIHRhYmxlLiJ9LCJoaW50IjoiTmFtZSwgc2l6ZSwgYW5kIGNsYXNzIGFyZSB3b3Jrc3BhY2UgY2x1ZXMuIiwibmVlZHNfdmlzdWFsIjp0cnVlLCJ2aXN1YWxfdHlwZSI6ImdlbmVyYXRlZCBzZXNzaW9uLWZsb3cgZGlhZ3JhbSIsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiaW5zcGVjdF9hbmRfY2xlYXIiLCJsYWJlbCI6Ikluc3BlY3RpbmcgYW5kIGNsZWFyaW5nIE1BVExBQiBkYXRhIiwiaW1wb3J0YW5jZSI6ImhpZ2giLCJleGFtX3dlaWdodCI6ImhpZ2giLCJtYXN0ZXJ5X3J1bGUiOnsiY29ycmVjdF9zdHJlYWtfcmVxdWlyZWQiOjJ9LCJxdWVzdGlvbnMiOlt7ImlkIjoia3AyX3ExIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJXaGljaCBjb21tYW5kIGdpdmVzIGEgZnVsbGVyIHdvcmtzcGFjZSBzdW1tYXJ5LCBpbmNsdWRpbmcgaW5mb3JtYXRpb24gc3VjaCBhcyBzaXplIGFuZCBjbGFzcz8iLCJvcHRpb25zIjpbIkEuIHdobyIsIkIuIHdob3MiLCJDLiBjbGMiLCJELiBjbGYiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJcXChcXHRleHR0dHt3aG9zfVxcKSBnaXZlcyBhIG1vcmUgZGV0YWlsZWQgd29ya3NwYWNlIHN1bW1hcnkgdGhhbiBcXChcXHRleHR0dHt3aG99XFwpLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlxcKFxcdGV4dHR0e3dob31cXCkgbGlzdHMgbmFtZXMgb25seS4iLCJDIjoiXFwoXFx0ZXh0dHR7Y2xjfVxcKSBjbGVhcnMgY29tbWFuZC13aW5kb3cgdGV4dC4iLCJEIjoiXFwoXFx0ZXh0dHR7Y2xmfVxcKSBjbGVhcnMgdGhlIGN1cnJlbnQgZmlndXJlIHdpbmRvdy4ifSwiaGludCI6IlRoZSBsb25nZXIgY29tbWFuZCBnaXZlcyB0aGUgbG9uZ2VyIHJlcG9ydC4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3AyX3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJBIHN0dWRlbnQgd2FudHMgdG8gcmVtb3ZlIHZhcmlhYmxlIFxcKFxcdGV4dHR0e3h9XFwpIGZyb20gdGhlIHdvcmtzcGFjZSBidXQga2VlcCBvdGhlciB2YXJpYWJsZXMuIFdoaWNoIGNvbW1hbmQgaXMgYmVzdD8iLCJvcHRpb25zIjpbIkEuIGNsYyIsIkIuIGNsZWFyIiwiQy4gY2xlYXIgeCIsIkQuIGNsZiJdLCJjb3JyZWN0X29wdGlvbiI6IkMiLCJleHBsYW5hdGlvbiI6IlxcKFxcdGV4dHR0e2NsZWFyIHh9XFwpIHJlbW92ZXMgb25seSB2YXJpYWJsZSBcXChcXHRleHR0dHt4fVxcKSBmcm9tIHRoZSB3b3Jrc3BhY2UuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJBIjoiXFwoXFx0ZXh0dHR7Y2xjfVxcKSBjbGVhcnMgY29tbWFuZC13aW5kb3cgdGV4dCBidXQgZG9lcyBub3QgcmVtb3ZlIHZhcmlhYmxlcy4iLCJCIjoiXFwoXFx0ZXh0dHR7Y2xlYXJ9XFwpIHdpdGggbm8gdmFyaWFibGUgbmFtZSByZW1vdmVzIGFsbCB3b3Jrc3BhY2Ugb2JqZWN0cy4iLCJEIjoiXFwoXFx0ZXh0dHR7Y2xmfVxcKSBjbGVhcnMgdGhlIGN1cnJlbnQgZmlndXJlIHdpbmRvdy4ifSwiaGludCI6IlVzZSBjbGVhciBwbHVzIHRoZSBzcGVjaWZpYyB2YXJpYWJsZSBuYW1lLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoic2F2ZV9hbmRfbG9hZCIsImxhYmVsIjoiU2F2aW5nIGFuZCBsb2FkaW5nIC5tYXQgZmlsZXMiLCJpbXBvcnRhbmNlIjoiaGlnaCIsImV4YW1fd2VpZ2h0IjoiaGlnaCIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6Mn0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDNfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IldoaWNoIGNvbW1hbmQgc2F2ZXMgb25seSB2YXJpYWJsZXMgXFwoXFx0ZXh0dHR7eH1cXCkgYW5kIFxcKFxcdGV4dHR0e3l9XFwpIGludG8gYSBmaWxlIG5hbWVkIFxcKFxcdGV4dHR0e2xhYjEubWF0fVxcKT8iLCJvcHRpb25zIjpbIkEuIHNhdmUgbGFiMSB4IHkiLCJCLiBsb2FkIGxhYjEgeCB5IiwiQy4gY2xlYXIgbGFiMSB4IHkiLCJELiBwcmludCBsYWIxIHggeSJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlxcKFxcdGV4dHR0e3NhdmUgbGFiMSB4IHl9XFwpIHNlbGVjdGl2ZWx5IHNhdmVzIFxcKFxcdGV4dHR0e3h9XFwpIGFuZCBcXChcXHRleHR0dHt5fVxcKSB0byBcXChcXHRleHR0dHtsYWIxLm1hdH1cXCkuIiwid3Jvbmdfb3B0aW9uX2V4cGxhbmF0aW9ucyI6eyJCIjoiXFwoXFx0ZXh0dHR7bG9hZH1cXCkgcmVhZHMgZGF0YSBmcm9tIGEgZmlsZTsgaXQgZG9lcyBub3Qgc2F2ZSB2YXJpYWJsZXMuIiwiQyI6IlxcKFxcdGV4dHR0e2NsZWFyfVxcKSByZW1vdmVzIHdvcmtzcGFjZSB2YXJpYWJsZXMuIiwiRCI6IlxcKFxcdGV4dHR0e3ByaW50fVxcKSBpcyB1c2VkIGZvciBzYXZpbmcgZmlndXJlcyBpbiBmaWxlIGZvcm1hdHMsIG5vdCB3b3Jrc3BhY2UgdmFyaWFibGVzLiJ9LCJoaW50IjoiU2F2aW5nIHdvcmtzcGFjZSBkYXRhIHVzZXMgXFwoXFx0ZXh0dHR7c2F2ZX1cXCksIG5vdCBcXChcXHRleHR0dHtwcmludH1cXCkuIiwibmVlZHNfdmlzdWFsIjpmYWxzZSwic2FtZV9wb2ludF92YXJpYW50Ijp0cnVlfSx7ImlkIjoia3AzX3EyIiwidHlwZSI6InNob3J0X2Fuc3dlciIsInN0ZW0iOiJBIGNsYXNzbWF0ZSBzYXlzIE1BVExBQiBhdXRvbWF0aWNhbGx5IHNhdmVzIGFsbCB3b3Jrc3BhY2UgdmFyaWFibGVzIHdoZW4geW91IGV4aXQuIENvcnJlY3QgdGhlIHN0YXRlbWVudCBhbmQgbmFtZSB0aGUgY29tbWFuZCBmYW1pbHkgdXNlZCBpbnN0ZWFkLiIsImlkZWFsX2Fuc3dlciI6Ik1BVExBQiBkb2VzIG5vdCBhdXRvbWF0aWNhbGx5IHNhdmUgd29ya3NwYWNlIGRhdGEgYmV0d2VlbiBzZXNzaW9ucy4gVXNlIFxcKFxcdGV4dHR0e3NhdmV9XFwpIHRvIHN0b3JlIHZhcmlhYmxlcyBpbiBhIFxcKFxcdGV4dHR0ey5tYXR9XFwpIGZpbGUgYW5kIFxcKFxcdGV4dHR0e2xvYWR9XFwpIHRvIHJlc3RvcmUgdGhlbSBsYXRlci4iLCJncmFkaW5nX3J1YnJpYyI6WyJNdXN0IHN0YXRlIHRoYXQgd29ya3NwYWNlIGRhdGEgaXMgbm90IGF1dG9tYXRpY2FsbHkgc2F2ZWQiLCJNdXN0IG1lbnRpb24gXFwoXFx0ZXh0dHR7c2F2ZX1cXCkiLCJNdXN0IG1lbnRpb24gXFwoXFx0ZXh0dHR7bG9hZH1cXCkgb3IgcmVzdG9yaW5nIGZyb20gYSBcXChcXHRleHR0dHsubWF0fVxcKSBmaWxlIl0sImV4cGxhbmF0aW9uIjoiVGhpcyBjaGVja3MgdGhlIGNvcmUgdHJhcDogY29uZnVzaW5nIGNvbW1hbmQgaGlzdG9yeSB3aXRoIHNhdmVkIHdvcmtzcGFjZSBkYXRhLiIsImhpbnQiOiJDb21tYW5kIGhpc3RvcnkgaXMgc2F2ZWQgZGlmZmVyZW50bHkgZnJvbSB2YXJpYWJsZSBkYXRhLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoiaGVscF9hbmRfaGlzdG9yeSIsImxhYmVsIjoiSGVscCwgbG9va2ZvciwgYW5kIGNvbW1hbmQgaGlzdG9yeSIsImltcG9ydGFuY2UiOiJtZWRpdW0iLCJleGFtX3dlaWdodCI6Im1lZGl1bSIsIm1hc3RlcnlfcnVsZSI6eyJjb3JyZWN0X3N0cmVha19yZXF1aXJlZCI6MX0sInF1ZXN0aW9ucyI6W3siaWQiOiJrcDRfcTEiLCJ0eXBlIjoibXVsdGlwbGVfY2hvaWNlIiwic3RlbSI6IllvdSBrbm93IHRoZSBNQVRMQUIgZnVuY3Rpb24gbmFtZSBhbmQgd2FudCBjb21tYW5kLWxpbmUgZG9jdW1lbnRhdGlvbiBmb3IgaXQuIFdoaWNoIHBhdHRlcm4gc2hvdWxkIHlvdSB1c2U/Iiwib3B0aW9ucyI6WyJBLiBoZWxwIGZ1bmN0aW9uTmFtZSIsIkIuIGxvb2tmb3IgZnVuY3Rpb25OYW1lIiwiQy4gd29ya3NwYWNlIGZ1bmN0aW9uTmFtZSIsIkQuIGZvcm1hdCBmdW5jdGlvbk5hbWUiXSwiY29ycmVjdF9vcHRpb24iOiJBIiwiZXhwbGFuYXRpb24iOiJcXChcXHRleHR0dHtoZWxwIGZ1bmN0aW9uTmFtZX1cXCkgZGlzcGxheXMgZG9jdW1lbnRhdGlvbiBmb3IgYSBrbm93biBmdW5jdGlvbi4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJcXChcXHRleHR0dHtsb29rZm9yIGtleXdvcmR9XFwpIGlzIGJldHRlciB3aGVuIHlvdSBkbyBub3Qga25vdyB0aGUgZXhhY3QgZnVuY3Rpb24gbmFtZS4iLCJDIjoiXFwoXFx0ZXh0dHR7d29ya3NwYWNlfVxcKSBvcGVucyB0aGUgd29ya3NwYWNlIHZpZXcuIiwiRCI6IlxcKFxcdGV4dHR0e2Zvcm1hdH1cXCkgY29udHJvbHMgZGlzcGxheWVkIG51bWVyaWMgZm9ybWF0LiJ9LCJoaW50IjoiVXNlIFxcKFxcdGV4dHR0e2hlbHB9XFwpIHdoZW4gdGhlIG5hbWUgaXMgYWxyZWFkeSBrbm93bi4iLCJuZWVkc192aXN1YWwiOmZhbHNlLCJzYW1lX3BvaW50X3ZhcmlhbnQiOmZhbHNlfSx7ImlkIjoia3A0X3EyIiwidHlwZSI6Im11bHRpcGxlX2Nob2ljZSIsInN0ZW0iOiJZb3UgY2Fubm90IHJlbWVtYmVyIHRoZSBleGFjdCBmdW5jdGlvbiBuYW1lLCBidXQgeW91IGtub3cgYSBrZXl3b3JkIHJlbGF0ZWQgdG8gdGhlIHRhc2suIFdoaWNoIGNvbW1hbmQgaXMgbW9zdCBhcHByb3ByaWF0ZT8iLCJvcHRpb25zIjpbIkEuIGhlbHAga2V5d29yZCIsIkIuIGxvb2tmb3Iga2V5d29yZCIsIkMuIGNsZWFyIGtleXdvcmQiLCJELiBleGl0IGtleXdvcmQiXSwiY29ycmVjdF9vcHRpb24iOiJCIiwiZXhwbGFuYXRpb24iOiJcXChcXHRleHR0dHtsb29rZm9yIGtleXdvcmR9XFwpIHNlYXJjaGVzIE1BVExBQiBmdW5jdGlvbnMgdXNpbmcgYSBrZXl3b3JkLiIsIndyb25nX29wdGlvbl9leHBsYW5hdGlvbnMiOnsiQSI6IlxcKFxcdGV4dHR0e2hlbHB9XFwpIHdvcmtzIGJlc3Qgd2hlbiB0aGUgZnVuY3Rpb24gbmFtZSBpcyBhbHJlYWR5IGtub3duLiIsIkMiOiJcXChcXHRleHR0dHtjbGVhcn1cXCkgcmVtb3ZlcyB2YXJpYWJsZXMsIG5vdCBzZWFyY2hlcyBkb2N1bWVudGF0aW9uLiIsIkQiOiJcXChcXHRleHR0dHtleGl0fVxcKSB0ZXJtaW5hdGVzIE1BVExBQi4ifSwiaGludCI6IlRoZSBrZXl3b3JkLXNlYXJjaCBjb21tYW5kIGlzIFxcKFxcdGV4dHR0e2xvb2tmb3J9XFwpLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6dHJ1ZX1dfSx7ImlkIjoic2Vzc2lvbl91dGlsaXRpZXMiLCJsYWJlbCI6IkZvcm1hdCwgcHJpbnQsIGFuZCBleGl0IiwiaW1wb3J0YW5jZSI6Im1lZGl1bSIsImV4YW1fd2VpZ2h0IjoibG93IiwibWFzdGVyeV9ydWxlIjp7ImNvcnJlY3Rfc3RyZWFrX3JlcXVpcmVkIjoxfSwicXVlc3Rpb25zIjpbeyJpZCI6ImtwNV9xMSIsInR5cGUiOiJtdWx0aXBsZV9jaG9pY2UiLCJzdGVtIjoiV2hpY2ggbWF0Y2hpbmcgaXMgY29ycmVjdD8iLCJvcHRpb25zIjpbIkEuIGZvcm1hdCBjb250cm9scyBkaXNwbGF5ZWQgbnVtZXJpYyBmb3JtYXQ7IHByaW50IHNhdmVzIGZpZ3VyZXM7IGV4aXQgdGVybWluYXRlcyBNQVRMQUIiLCJCLiBmb3JtYXQgZGVsZXRlcyB2YXJpYWJsZXM7IHByaW50IG9wZW5zIGhlbHA7IGV4aXQgc2F2ZXMgdGhlIHdvcmtzcGFjZSIsIkMuIGZvcm1hdCBjbGVhcnMgZmlndXJlczsgcHJpbnQgbGlzdHMgd29ya3NwYWNlIG5hbWVzOyBleGl0IGxvYWRzIGEgLm1hdCBmaWxlIiwiRC4gZm9ybWF0IHNlYXJjaGVzIGtleXdvcmRzOyBwcmludCBjbGVhcnMgdGhlIGNvbW1hbmQgd2luZG93OyBleGl0IG9wZW5zIEhUTUwgaGVscCJdLCJjb3JyZWN0X29wdGlvbiI6IkEiLCJleHBsYW5hdGlvbiI6IlxcKFxcdGV4dHR0e2Zvcm1hdH1cXCksIFxcKFxcdGV4dHR0e3ByaW50fVxcKSwgYW5kIFxcKFxcdGV4dHR0e2V4aXR9XFwpIGNvbnRyb2wgZGlzcGxheSBmb3JtYXQsIGZpZ3VyZSBvdXRwdXQsIGFuZCBzZXNzaW9uIHRlcm1pbmF0aW9uIHJlc3BlY3RpdmVseS4iLCJ3cm9uZ19vcHRpb25fZXhwbGFuYXRpb25zIjp7IkIiOiJOb25lIG9mIHRob3NlIGNvbW1hbmQgbWVhbmluZ3MgYXJlIGNvcnJlY3QuIiwiQyI6IlxcKFxcdGV4dHR0e2NsZn1cXCksIFxcKFxcdGV4dHR0e3dob31cXCksIGFuZCBcXChcXHRleHR0dHtsb2FkfVxcKSBhcmUgYmVpbmcgY29uZnVzZWQgd2l0aCB0aGVzZSBjb21tYW5kcy4iLCJEIjoiXFwoXFx0ZXh0dHR7bG9va2Zvcn1cXCksIFxcKFxcdGV4dHR0e2NsY31cXCksIGFuZCBIVE1MIGhlbHAgYXJlIGJlaW5nIGNvbmZ1c2VkIHdpdGggdGhlc2UgY29tbWFuZHMuIn0sImhpbnQiOiJUaGluazogZGlzcGxheSBudW1iZXJzLCBzYXZlIGdyYXBoaWNzLCBlbmQgTUFUTEFCLiIsIm5lZWRzX3Zpc3VhbCI6ZmFsc2UsInNhbWVfcG9pbnRfdmFyaWFudCI6ZmFsc2V9XX1dfQ==" style="display:none;"></div>%%KC_END%%
