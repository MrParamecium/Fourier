#!/usr/bin/env python3
import re

with open('tutor-openclaw-ui/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

modal_code = r"""
// ── Knowledge Check Modal ──────────────────────────────────────────────────
(function() {
  const modal     = document.getElementById('kcModal');
  const header    = document.getElementById('kcModalHeader');
  const closeBtn  = document.getElementById('kcModalClose');
  const questionEl= document.getElementById('kcQuestion');
  const answerEl  = document.getElementById('kcAnswer');
  const hintEl    = document.getElementById('kcHint');
  const revealBtn = document.getElementById('kcRevealBtn');
  const answerBox = document.getElementById('kcAnswerBox');
  const inputEl   = document.getElementById('kcAnswerInput');
  const submitBtn = document.getElementById('kcSubmitBtn');
  const feedbackEl= document.getElementById('kcFeedback');
  const loadingEl = document.getElementById('kcLoading');
  if (!modal) return;

  let kcHistory = [];
  let kcSectionId = '';
  let kcSectionTitle = '';
  let kcQuestion = '';
  let kcAnswer = '';

  // — open/close
  window.openKCModal = function(question, answer, hint, sectionId, sectionTitle) {
    kcQuestion = question; kcAnswer = answer;
    kcSectionId = sectionId; kcSectionTitle = sectionTitle;
    kcHistory = [];
    questionEl.textContent = question;
    answerEl.textContent = answer;
    hintEl.textContent = hint ? '💡 Hint: ' + hint : '';
    answerBox.style.display = 'none';
    revealBtn.style.display = 'inline-block';
    feedbackEl.style.display = 'none';
    feedbackEl.innerHTML = '';
    inputEl.value = '';
    modal.style.display = 'flex';
  };

  closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });

  revealBtn.addEventListener('click', () => {
    answerBox.style.display = 'block';
    revealBtn.style.display = 'none';
  });

  // — drag
  let dragging = false, dx = 0, dy = 0;
  header.addEventListener('mousedown', e => {
    dragging = true;
    const r = modal.getBoundingClientRect();
    dx = e.clientX - r.left; dy = e.clientY - r.top;
    header.style.cursor = 'grabbing';
    e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    let nx = e.clientX - dx, ny = e.clientY - dy;
    nx = Math.max(0, Math.min(window.innerWidth - modal.offsetWidth, nx));
    ny = Math.max(0, Math.min(window.innerHeight - modal.offsetHeight, ny));
    modal.style.left = nx + 'px'; modal.style.top = ny + 'px';
    modal.style.transform = 'none';
  });
  document.addEventListener('mouseup', () => { dragging = false; header.style.cursor = 'grab'; });

  // — submit answer to Haiku
  async function submitAnswer() {
    const userAnswer = inputEl.value.trim();
    if (!userAnswer) return;
    inputEl.value = '';
    submitBtn.disabled = true;
    loadingEl.style.display = 'block';
    feedbackEl.style.display = 'none';

    kcHistory.push({ role: 'user', content: userAnswer });

    try {
      const res = await callAsk(
        userAnswer,
        null,
        {
          mode: 'followup',
          history: [
            { role: 'assistant', content: 'Challenge question: ' + kcQuestion + '\n\nCorrect answer: ' + kcAnswer },
            ...kcHistory.slice(0, -1)
          ],
          sectionId: kcSectionId,
          sectionTitle: kcSectionTitle,
          language: 'en'
        }
      );
      const reply = res.explanation || res.answer || 'No response.';
      kcHistory.push({ role: 'assistant', content: reply });
      feedbackEl.innerHTML = markdownToHtml(reply);
      feedbackEl.style.display = 'block';
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([feedbackEl]).catch(() => {});
      }
    } catch (err) {
      feedbackEl.innerHTML = '<span style="color:#EF4444">Error: ' + (err.message || err) + '</span>';
      feedbackEl.style.display = 'block';
    } finally {
      loadingEl.style.display = 'none';
      submitBtn.disabled = false;
    }
  }

  submitBtn.addEventListener('click', submitAnswer);
  inputEl.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); submitAnswer(); }
  });
})();

"""

# Insert just before the View switcher comment line
marker = '// \u2500\u2500 View switcher'
idx = content.find(marker)
if idx == -1:
    print("ERROR: could not find marker")
    exit(1)

new_content = content[:idx] + modal_code + content[idx:]
with open('tutor-openclaw-ui/app.js', 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Done. Inserted modal code before View switcher section.")
