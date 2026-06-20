// Mistake Notebook subsystem — extracted from app.js in Phase 2 #12.
// Loaded as a classic <script> BEFORE app.js. Other classic scripts (markdown-engine.js,
// app.js) reach in via the shared script-global lexical env. No bundler, no IIFE.
//
// External globals used at call time:
//   - escapeHtml, callAsk, detectLang     (app.js)
//   - markdownToHtml                       (markdown-engine.js)
//   - window.MathJax                       (CDN)
//
// Public surface (free-name lookup from app.js):
//   - addMistakeNotebookItem  (app.js Quick-Check Add-Mistake button)
//   - renderMistakeNotebook   (app.js showMistakeNotebookView)
//   - bindMistakeNotebookControls (called at app.js top-level once)
//   - readFileAsDataUrl       (also used by app.js processFile in the
//                              attachments pipeline — will move to a shared
//                              util when Phase 2 #15 extracts attachments)
//   - the loadMistakeNotebook/saveMistakeNotebook/getCurrentMistake/
//     updateMistakeItem/addMistakeImageFile/addMistakeNoteImageFile/
//     isMistakeNotebookVisible/handleMistakeNotebookPaste/runMistakeAi/
//     and resizer/normalize/typeset helpers are module-private in practice
//     (no current external callers) but live in the same script-global env
//   - DOM consts: mistakeNotebookView, navMistakeNotebookBtn,
//     mistakeNotebookCloseBtn, mistakeImageInput, mistakeSearchInput,
//     mistakeCountPill, mistakeList, mistakeEmptyPanel, mistakeDetailContent,
//     mistakeTitleInput, mistakeTagsInput, mistakeNotesInput,
//     mistakeNoteImageInput, mistakeNoteImages, mistakeNoteResizer,
//     mistakeDraftNotesOutput, mistakeImagePreview, mistakeTextPreview,
//     mistakeAiAnswer, mistakePrevBtn, mistakeNextBtn, mistakePageIndicator,
//     mistakeSolveBtn, mistakeDraftNotesBtn, mistakeDeleteBtn
//   - state: currentMistakeId (let, shared mutable)

const MISTAKE_NOTEBOOK_STORAGE_KEY = 'aquariusMistakeNotebook.v1';
const MISTAKE_NOTE_SPLIT_STORAGE_KEY = 'aquariusMistakeNoteSplit.v1';
let currentMistakeId = null;

const mistakeNotebookView = document.getElementById('mistakeNotebookView');
const navMistakeNotebookBtn = document.getElementById('navMistakeNotebookBtn');
const mistakeNotebookCloseBtn = document.getElementById('mistakeNotebookCloseBtn');
const mistakeImageInput = document.getElementById('mistakeImageInput');
const mistakeSearchInput = document.getElementById('mistakeSearchInput');
const mistakeCountPill = document.getElementById('mistakeCountPill');
const mistakeList = document.getElementById('mistakeList');
const mistakeEmptyPanel = document.getElementById('mistakeEmptyPanel');
const mistakeDetailContent = document.getElementById('mistakeDetailContent');
const mistakeTitleInput = document.getElementById('mistakeTitleInput');
const mistakeTagsInput = document.getElementById('mistakeTagsInput');
const mistakeNotesInput = document.getElementById('mistakeNotesInput');
const mistakeNoteImageInput = document.getElementById('mistakeNoteImageInput');
const mistakeNoteImages = document.getElementById('mistakeNoteImages');
const mistakeNoteResizer = document.getElementById('mistakeNoteResizer');
const mistakeDraftNotesOutput = document.getElementById('mistakeDraftNotesOutput');
const mistakeImagePreview = document.getElementById('mistakeImagePreview');
const mistakeTextPreview = document.getElementById('mistakeTextPreview');
const mistakeAiAnswer = document.getElementById('mistakeAiAnswer');
const mistakePrevBtn = document.getElementById('mistakePrevBtn');
const mistakeNextBtn = document.getElementById('mistakeNextBtn');
const mistakePageIndicator = document.getElementById('mistakePageIndicator');
const mistakeSolveBtn = document.getElementById('mistakeSolveBtn');
const mistakeDraftNotesBtn = document.getElementById('mistakeDraftNotesBtn');
const mistakeDeleteBtn = document.getElementById('mistakeDeleteBtn');

function loadMistakeNotebook() {
  try {
    const data = JSON.parse(localStorage.getItem(MISTAKE_NOTEBOOK_STORAGE_KEY) || '[]');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveMistakeNotebook(items) {
  try {
    localStorage.setItem(MISTAKE_NOTEBOOK_STORAGE_KEY, JSON.stringify(Array.isArray(items) ? items : []));
  } catch {}
}

function getCurrentMistake(items = loadMistakeNotebook()) {
  return items.find(item => item.id === currentMistakeId) || items[0] || null;
}

function updateMistakeItem(id, patch) {
  const items = loadMistakeNotebook();
  const idx = items.findIndex(item => item.id === id);
  if (idx < 0) return items;
  items[idx] = { ...items[idx], ...patch, updatedAt: new Date().toISOString() };
  saveMistakeNotebook(items);
  return items;
}

function addMistakeNotebookItem(item) {
  const items = loadMistakeNotebook();
  const next = {
    id: `mistake-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: `Problem ${items.length + 1}`,
    tags: '',
    notes: '',
    noteImages: [],
    aiDraftNotes: '',
    aiAnswer: '',
    imageDataUrl: '',
    mimeType: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...item
  };
  items.unshift(next);
  currentMistakeId = next.id;
  saveMistakeNotebook(items);
  renderMistakeNotebook();
  return next;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(reader.error || new Error('Could not read image file.'));
    reader.readAsDataURL(file);
  });
}

async function addMistakeImageFile(file, options = {}) {
  if (!file || !String(file.type || '').startsWith('image/')) return false;
  const imageDataUrl = await readFileAsDataUrl(file);
  const fallbackTitle = options.title || `Pasted Screenshot ${loadMistakeNotebook().length + 1}`;
  addMistakeNotebookItem({
    title: fallbackTitle,
    tags: '',
    notes: '',
    aiAnswer: '',
    imageDataUrl,
    mimeType: file.type || 'image/png',
  });
  return true;
}

function getPrimaryMistakeTag(tags = '') {
  return String(tags || '')
    .split(/[,，;；|#\n]/)
    .map(tag => tag.trim())
    .find(Boolean) || '';
}

function isDefaultMistakeTitle(title = '') {
  return /^(Pasted Screenshot|Problem)\s+\d+$/i.test(String(title || '').trim());
}

async function addMistakeNoteImageFile(file) {
  const current = getCurrentMistake();
  if (!current || !file || !String(file.type || '').startsWith('image/')) return false;
  const dataUrl = await readFileAsDataUrl(file);
  const noteImages = Array.isArray(current.noteImages) ? current.noteImages : [];
  updateMistakeItem(current.id, {
    noteImages: [
      ...noteImages,
      {
        id: `note-image-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: file.name || `note-image-${noteImages.length + 1}.png`,
        mimeType: file.type || 'image/png',
        dataUrl
      }
    ]
  });
  renderMistakeNotebook();
  return true;
}

function isMistakeNotebookVisible() {
  return Boolean(mistakeNotebookView && !mistakeNotebookView.classList.contains('hidden'));
}

function shouldPasteIntoMistakeNotes(target) {
  if (!target) return false;
  return Boolean(
    target === mistakeNotesInput ||
    target === mistakeNoteImages ||
    target.closest?.('.mistake-user-note-card')
  );
}

async function handleMistakeNotebookPaste(event) {
  if (!isMistakeNotebookVisible()) return;
  const items = Array.from(event.clipboardData?.items || []);
  const imageItem = items.find(item => String(item.type || '').startsWith('image/'));
  if (!imageItem) return;
  const file = imageItem.getAsFile();
  if (!file) return;
  event.preventDefault();
  if (shouldPasteIntoMistakeNotes(event.target) && getCurrentMistake()) {
    await addMistakeNoteImageFile(new File([file], file.name || 'note-screenshot.png', { type: file.type || 'image/png' }));
    return;
  }
  await addMistakeImageFile(new File([file], file.name || 'pasted-screenshot.png', { type: file.type || 'image/png' }), {
    title: `Pasted Screenshot ${loadMistakeNotebook().length + 1}`
  });
}

function renderMistakeNotebook() {
  const items = loadMistakeNotebook();
  const query = (mistakeSearchInput?.value || '').trim().toLowerCase();
  if (!currentMistakeId && items.length) currentMistakeId = items[0].id;
  if (currentMistakeId && !items.some(item => item.id === currentMistakeId)) {
    currentMistakeId = items[0]?.id || null;
  }

  const filtered = query
    ? items.filter(item => [item.title, item.tags, item.notes, item.aiDraftNotes, item.aiAnswer].join(' ').toLowerCase().includes(query))
    : items;

  if (mistakeCountPill) mistakeCountPill.textContent = `${items.length} problem${items.length === 1 ? '' : 's'}`;

  if (mistakeList) {
    mistakeList.innerHTML = filtered.length
      ? filtered.map((item, index) => `
        <button class="mistake-list-item ${item.id === currentMistakeId ? 'active' : ''}" data-mistake-id="${escapeHtml(item.id)}" type="button">
          <span class="mistake-list-thumb">${item.imageDataUrl ? `<img src="${escapeHtml(item.imageDataUrl)}" alt="">` : 'Q'}</span>
          <span class="mistake-list-meta">
            <strong>${escapeHtml(item.title || `Problem ${index + 1}`)}</strong>
            <small>${escapeHtml(item.tags || 'No tags yet')}</small>
          </span>
        </button>
      `).join('')
      : `<div class="mistake-list-empty">${items.length ? 'No matching problems.' : 'Upload your first problem image.'}</div>`;

    mistakeList.querySelectorAll('.mistake-list-item').forEach(btn => {
      btn.addEventListener('click', () => {
        currentMistakeId = btn.dataset.mistakeId;
        renderMistakeNotebook();
      });
    });
  }

  const current = getCurrentMistake(items);
  const hasCurrent = Boolean(current);
  if (mistakeEmptyPanel) mistakeEmptyPanel.classList.toggle('hidden', hasCurrent);
  if (mistakeDetailContent) mistakeDetailContent.classList.toggle('hidden', !hasCurrent);
  if (!current) return;

  const currentIndex = items.findIndex(item => item.id === current.id);
  if (mistakeTitleInput) mistakeTitleInput.value = current.title || '';
  if (mistakeTagsInput) mistakeTagsInput.value = current.tags || '';
  if (mistakeNotesInput) mistakeNotesInput.value = current.notes || '';
  if (mistakeNoteImages) {
    const noteImages = Array.isArray(current.noteImages) ? current.noteImages : [];
    mistakeNoteImages.innerHTML = noteImages.length
      ? noteImages.map((image, index) => `
        <figure class="mistake-note-image-chip">
          <img src="${escapeHtml(image.dataUrl || '')}" alt="${escapeHtml(image.name || `Note image ${index + 1}`)}">
          <button type="button" data-note-image-index="${index}" aria-label="Remove note image">×</button>
        </figure>
      `).join('')
      : '<div class="mistake-note-image-empty">Paste or add images here.</div>';
    mistakeNoteImages.querySelectorAll('[data-note-image-index]').forEach(btn => {
      btn.addEventListener('click', () => {
        const current = getCurrentMistake();
        if (!current) return;
        const nextImages = (Array.isArray(current.noteImages) ? current.noteImages : []).filter((_, idx) => idx !== Number(btn.dataset.noteImageIndex));
        updateMistakeItem(current.id, { noteImages: nextImages });
        renderMistakeNotebook();
      });
    });
  }
  if (mistakeDraftNotesOutput) {
    mistakeDraftNotesOutput.innerHTML = current.aiDraftNotes
      ? markdownToHtml(normalizeMistakeNotebookMarkdown(current.aiDraftNotes))
      : 'No AI notes yet.';
  }
  if (mistakeImagePreview) {
    mistakeImagePreview.src = current.imageDataUrl || '';
    mistakeImagePreview.classList.toggle('hidden', !current.imageDataUrl);
  }
  if (mistakeTextPreview) {
    mistakeTextPreview.classList.toggle('hidden', Boolean(current.imageDataUrl) || !current.problemText);
    mistakeTextPreview.innerHTML = current.problemText ? markdownToHtml(current.problemText) : '';
  }
  if (mistakeAiAnswer) {
    mistakeAiAnswer.innerHTML = current.aiAnswer
      ? markdownToHtml(normalizeMistakeNotebookMarkdown(current.aiAnswer))
      : 'No AI answer yet.';
  }
  typesetMistakeNotebookMath();
  if (mistakePageIndicator) mistakePageIndicator.textContent = `${currentIndex + 1} / ${items.length}`;
  if (mistakePrevBtn) mistakePrevBtn.disabled = currentIndex <= 0;
  if (mistakeNextBtn) mistakeNextBtn.disabled = currentIndex < 0 || currentIndex >= items.length - 1;
}

function normalizeMistakeNotebookMarkdown(markdown = '') {
  return String(markdown || '')
    .replace(/\\\\\(/g, '\\(')
    .replace(/\\\\\)/g, '\\)')
    .replace(/\\\\\[/g, '\\[')
    .replace(/\\\\\]/g, '\\]')
    .replace(/\\\\delta/g, '\\delta')
    .replace(/\\\\omega/g, '\\omega')
    .replace(/\\\\text/g, '\\text')
    .replace(/\\\\frac/g, '\\frac')
    .replace(/\\\\sin/g, '\\sin')
    .replace(/\\\\cos/g, '\\cos')
    .replace(/\\\\cdot/g, '\\cdot')
    .replace(/\\\\times/g, '\\times');
}

function typesetMistakeNotebookMath() {
  const targets = [mistakeDraftNotesOutput, mistakeAiAnswer, mistakeTextPreview].filter(Boolean);
  if (!targets.length || !window.MathJax || !window.MathJax.typesetPromise) return;
  window.MathJax.typesetPromise(targets).catch(() => {});
}

function clampMistakeNoteSplit(value) {
  if (value === null || value === undefined || value === '') return 0.5;
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 0.5;
  return Math.min(0.72, Math.max(0.28, numeric));
}

function applyMistakeNoteSplit(columns, ratio) {
  if (!columns) return;
  const nextRatio = clampMistakeNoteSplit(ratio);
  const topRatio = Math.round(nextRatio * 1000) / 1000;
  const bottomRatio = Math.round((1 - topRatio) * 1000) / 1000;
  columns.style.setProperty('--mistake-note-top', `${topRatio}fr`);
  columns.style.setProperty('--mistake-note-bottom', `${bottomRatio}fr`);
  columns.dataset.splitRatio = String(topRatio);
  if (mistakeNoteResizer) {
    mistakeNoteResizer.setAttribute('aria-valuemin', '28');
    mistakeNoteResizer.setAttribute('aria-valuemax', '72');
    mistakeNoteResizer.setAttribute('aria-valuenow', String(Math.round(topRatio * 100)));
  }
}

function setupMistakeNoteResizer() {
  if (!mistakeNoteResizer) return;
  const columns = mistakeNoteResizer.closest('.mistake-note-columns');
  if (!columns || columns.dataset.resizerReady === 'true') return;
  columns.dataset.resizerReady = 'true';

  let storedRatio = 0.5;
  try {
    storedRatio = clampMistakeNoteSplit(localStorage.getItem(MISTAKE_NOTE_SPLIT_STORAGE_KEY));
  } catch (_) {
    storedRatio = 0.5;
  }
  applyMistakeNoteSplit(columns, storedRatio);

  const saveRatio = ratio => {
    try {
      localStorage.setItem(MISTAKE_NOTE_SPLIT_STORAGE_KEY, String(clampMistakeNoteSplit(ratio)));
    } catch (_) {}
  };

  const updateFromClientY = clientY => {
    const rect = columns.getBoundingClientRect();
    if (!rect.height) return;
    const ratio = clampMistakeNoteSplit((clientY - rect.top) / rect.height);
    applyMistakeNoteSplit(columns, ratio);
    saveRatio(ratio);
  };

  mistakeNoteResizer.addEventListener('pointerdown', event => {
    event.preventDefault();
    mistakeNoteResizer.classList.add('is-dragging');
    mistakeNoteResizer.setPointerCapture(event.pointerId);
    updateFromClientY(event.clientY);
  });

  mistakeNoteResizer.addEventListener('pointermove', event => {
    if (!mistakeNoteResizer.classList.contains('is-dragging')) return;
    updateFromClientY(event.clientY);
  });

  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(type => {
    mistakeNoteResizer.addEventListener(type, () => {
      mistakeNoteResizer.classList.remove('is-dragging');
    });
  });

  mistakeNoteResizer.addEventListener('dblclick', () => {
    applyMistakeNoteSplit(columns, 0.5);
    saveRatio(0.5);
  });

  mistakeNoteResizer.addEventListener('keydown', event => {
    if (!['ArrowUp', 'ArrowDown', 'Home'].includes(event.key)) return;
    event.preventDefault();
    const currentRatio = clampMistakeNoteSplit(columns.dataset.splitRatio);
    const nextRatio = event.key === 'Home'
      ? 0.5
      : currentRatio + (event.key === 'ArrowUp' ? -0.04 : 0.04);
    applyMistakeNoteSplit(columns, nextRatio);
    saveRatio(nextRatio);
  });
}

function bindMistakeNotebookControls() {
  setupMistakeNoteResizer();

  if (mistakeImageInput) {
    mistakeImageInput.addEventListener('change', async () => {
      const file = mistakeImageInput.files && mistakeImageInput.files[0];
      if (!file) return;
      await addMistakeImageFile(file, {
        title: file.name.replace(/\.[^.]+$/, '') || `Problem ${loadMistakeNotebook().length + 1}`
      });
      mistakeImageInput.value = '';
    });
  }
  if (mistakeNoteImageInput) {
    mistakeNoteImageInput.addEventListener('change', async () => {
      const files = Array.from(mistakeNoteImageInput.files || []).filter(file => String(file.type || '').startsWith('image/'));
      for (const file of files) {
        await addMistakeNoteImageFile(file);
      }
      mistakeNoteImageInput.value = '';
    });
  }
  document.addEventListener('paste', handleMistakeNotebookPaste);

  if (mistakeSearchInput) mistakeSearchInput.addEventListener('input', renderMistakeNotebook);

  [
    [mistakeTitleInput, 'title'],
    [mistakeTagsInput, 'tags'],
    [mistakeNotesInput, 'notes']
  ].forEach(([el, field]) => {
    if (!el) return;
    el.addEventListener('input', () => {
      const current = getCurrentMistake();
      if (!current) return;
      const patch = { [field]: el.value };
      if (field === 'tags') {
        const primaryTag = getPrimaryMistakeTag(el.value);
        if (primaryTag && (!current.title || isDefaultMistakeTitle(current.title))) {
          patch.title = primaryTag;
        }
      }
      updateMistakeItem(current.id, patch);
      if (field === 'title' || field === 'tags') renderMistakeNotebook();
    });
  });

  if (mistakePrevBtn) {
    mistakePrevBtn.addEventListener('click', () => {
      const items = loadMistakeNotebook();
      const idx = items.findIndex(item => item.id === currentMistakeId);
      if (idx > 0) {
        currentMistakeId = items[idx - 1].id;
        renderMistakeNotebook();
      }
    });
  }

  if (mistakeNextBtn) {
    mistakeNextBtn.addEventListener('click', () => {
      const items = loadMistakeNotebook();
      const idx = items.findIndex(item => item.id === currentMistakeId);
      if (idx >= 0 && idx < items.length - 1) {
        currentMistakeId = items[idx + 1].id;
        renderMistakeNotebook();
      }
    });
  }

  if (mistakeDeleteBtn) {
    mistakeDeleteBtn.addEventListener('click', () => {
      const current = getCurrentMistake();
      if (!current) return;
      const items = loadMistakeNotebook().filter(item => item.id !== current.id);
      currentMistakeId = items[0]?.id || null;
      saveMistakeNotebook(items);
      renderMistakeNotebook();
    });
  }

  if (mistakeSolveBtn) mistakeSolveBtn.addEventListener('click', () => runMistakeAi('solve'));
  if (mistakeDraftNotesBtn) mistakeDraftNotesBtn.addEventListener('click', () => runMistakeAi('notes'));
}

async function runMistakeAi(kind) {
  const current = getCurrentMistake();
  if (!current) return;
  const isNotes = kind === 'notes';
  const btn = isNotes ? mistakeDraftNotesBtn : mistakeSolveBtn;
  const original = btn ? btn.textContent : '';
  if (btn) {
    btn.disabled = true;
    btn.textContent = isNotes ? 'Generating...' : 'Solving...';
  }
  if (isNotes) {
    if (mistakeDraftNotesOutput) mistakeDraftNotesOutput.textContent = 'Generating AI notes...';
  } else if (mistakeAiAnswer) {
    mistakeAiAnswer.textContent = 'Solving this problem...';
  }
  try {
    const noteImages = Array.isArray(current.noteImages) ? current.noteImages : [];
    const imageAttachments = [
      current.imageDataUrl ? {
        type: 'image',
        name: current.title || 'mistake-problem',
        dataUrl: current.imageDataUrl,
        mimeType: current.mimeType || 'image/png'
      } : null,
      ...noteImages.map((image, index) => ({
        type: 'image',
        name: image.name || `note-image-${index + 1}`,
        dataUrl: image.dataUrl,
        mimeType: image.mimeType || 'image/png'
      }))
    ].filter(attachment => attachment && attachment.dataUrl);
    const prompt = isNotes
      ? [
          'Create concise study notes for this mistake notebook page based on the problem image, any images inside Your Notes, and any user-written notes.',
          imageAttachments.length ? 'Use the attached images as the visual source.' : `Use this saved quiz problem as the problem source:\n${current.problemText || current.title || ''}`,
          `User notes so far: ${current.notes || '(empty)'}`,
          'Return notes with: mistake pattern, correct method, key formula, and a short review checklist. Do not ask for extra instructions.'
        ].join('\n')
      : [
          current.imageDataUrl ? 'Solve this uploaded problem image step by step.' : `Solve this saved quiz problem step by step:\n${current.problemText || current.title || ''}`,
          'Explain the final answer clearly and point out common traps.',
          `Tags/context: ${current.tags || '(none)'}`,
          `Student notes: ${current.notes || '(empty)'}`
        ].join('\n');

    const data = await callAsk(prompt, undefined, {
      mode: 'ask',
      useWebSearch: false,
      language: detectLang(prompt),
      answerLength: isNotes ? 'balanced' : 'detailed',
      attachments: imageAttachments
    });
    const answer = data.explanation || '';
    if (isNotes) {
      updateMistakeItem(current.id, { aiDraftNotes: answer });
    } else {
      updateMistakeItem(current.id, { aiAnswer: answer });
    }
    renderMistakeNotebook();
  } catch (err) {
    const errorHtml = `<div class="error-box"><strong>AI failed</strong><p>${escapeHtml(err.message || String(err))}</p></div>`;
    if (isNotes && mistakeDraftNotesOutput) {
      mistakeDraftNotesOutput.innerHTML = errorHtml;
    } else if (mistakeAiAnswer) {
      mistakeAiAnswer.innerHTML = errorHtml;
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = original;
    }
  }
}
