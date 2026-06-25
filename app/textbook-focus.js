// Textbook focus-mode subsystem — extracted from app.js in Phase 3 (Workstream B, seam #2).
// Loaded as a classic <script> BEFORE app.js, like the sibling feature modules.
// Shared script-global lexical env: app.js reaches the public functions + state
// (e.g. isTextbookFocusQaOpen) by free-name lookup at call-time, and this module
// reaches app.js globals the same way. No bundler, no IIFE.
//
// Scope: the full-page zoom/pan textbook reader modal (#textbookFocusModal) —
// page render, scroll/zoom/pan transform + HUD, pointer/wheel/touch gestures,
// and the side QA panel that mirrors the learn-chat thread and forwards new
// questions through the shared learn-followup path.
//
// External globals used at call time (all owned by app.js):
//   - sendLearnFollowup, learnChatContent, learnSectionTitle, tutorState, _bookOverlay
//   - window.typesetMath                                    (MathJax, set up in app.js)
//
// Public surface (callers live in app.js — button wiring, keyboard shortcuts,
// learn-chat render hooks, view-switch close paths, the page-card click opener):
//   - openTextbookFocusMode / closeTextbookFocusMode
//   - setTextbookFocusQaOpen / sendTextbookFocusQuestion / syncTextbookFocusQaFromLearnChat
//   - stepTextbookFocusZoom / resetTextbookFocusTransform / applyTextbookFocusTransform
//   - isTextbookFocusQaOpen  (state read by app.js's QA-toggle handler + learn-chat hook)
//
// Shared mutable state crossing back into app.js (live bindings in the shared
// global lexical env, NOT module-private): app.js's document-level mouse drag
// handler — the same listener that drags the image lightbox — reads
// textbookFocusDragging / textbookFocusScale / textbookFocusDragStart{X,Y} and
// writes textbookFocusPan{X,Y} during a drag (mousedown is bound here in
// bindTextbookFocusInteractions; the mousemove/mouseup half stays in that shared
// app.js handler because it also serves the lightbox). Keep these as module-scope
// `let`s, not a closure/object, or those app.js references break.

// DOM elements + module state — queried once at load (this <script> runs after the
// body is parsed, like the sibling feature modules). app.js reaches the button
// consts (event wiring) and the drag/pan state (shared mouse handler) cross-scope.
const textbookFocusModal    = document.getElementById('textbookFocusModal');
const textbookFocusBackdrop = document.getElementById('textbookFocusBackdrop');
const textbookFocusClose    = document.getElementById('textbookFocusClose');
const textbookFocusZoomOutBtn = document.getElementById('textbookFocusZoomOutBtn');
const textbookFocusZoomResetBtn = document.getElementById('textbookFocusZoomResetBtn');
const textbookFocusZoomInBtn = document.getElementById('textbookFocusZoomInBtn');
const textbookFocusTitle    = document.getElementById('textbookFocusTitle');
const textbookFocusContent  = document.getElementById('textbookFocusContent');
const textbookFocusPageIndicator = document.getElementById('textbookFocusPageIndicator');
const textbookFocusDialog = document.getElementById('textbookFocusDialog');
const textbookFocusQaToggle = document.getElementById('textbookFocusQaToggle');
const textbookFocusQaPanel = document.getElementById('textbookFocusQaPanel');
const textbookFocusQaHead = document.getElementById('textbookFocusQaHead');
const textbookFocusQaClose = document.getElementById('textbookFocusQaClose');
const textbookFocusQaScroll = document.getElementById('textbookFocusQaScroll');
const textbookFocusQaInput = document.getElementById('textbookFocusQaInput');
const textbookFocusQaSend = document.getElementById('textbookFocusQaSend');
const answerLengthToggleTextbookFocus = document.getElementById('answerLengthToggleTextbookFocus');
const webSearchToggleBtnTextbookFocus = document.getElementById('webSearchToggleBtnTextbookFocus');
let textbookFocusPages = [];
let textbookFocusScale = 1.5;
let textbookFocusPanX = 0;
let textbookFocusPanY = 0;
let textbookFocusDragging = false;
let textbookFocusDragStartX = 0;
let textbookFocusDragStartY = 0;
let textbookFocusPinchDistance = 0;
let isTextbookFocusQaOpen = false;

function clampTextbookFocusScale(v) {
  return Math.max(0.75, Math.min(3, Number(v) || 1.5));
}

function syncTextbookFocusQaFromLearnChat() {
  if (!textbookFocusQaScroll || !learnChatContent) return;
  const hasChat = Boolean(learnChatContent.textContent.trim());
  textbookFocusQaScroll.innerHTML = hasChat
    ? learnChatContent.innerHTML
    : '<div class="textbook-focus-qa-empty">No questions yet.</div>';
  textbookFocusQaScroll.scrollTop = textbookFocusQaScroll.scrollHeight;
  if (window.typesetMath) window.typesetMath(textbookFocusQaScroll).catch(() => {});
}

function setTextbookFocusQaOpen(open) {
  isTextbookFocusQaOpen = Boolean(open);
  if (textbookFocusQaPanel) textbookFocusQaPanel.classList.toggle('hidden', !isTextbookFocusQaOpen);
  if (textbookFocusQaToggle) {
    textbookFocusQaToggle.classList.toggle('is-open', isTextbookFocusQaOpen);
    textbookFocusQaToggle.setAttribute('aria-expanded', isTextbookFocusQaOpen ? 'true' : 'false');
  }
  if (textbookFocusDialog) textbookFocusDialog.classList.toggle('textbook-focus-qa-open', isTextbookFocusQaOpen);
  if (isTextbookFocusQaOpen) {
    syncTextbookFocusQaFromLearnChat();
    requestAnimationFrame(() => textbookFocusQaInput?.focus({ preventScroll: true }));
  }
}

function sendTextbookFocusQuestion() {
  const prompt = (textbookFocusQaInput?.value || '').trim();
  if (!prompt) return;
  if (textbookFocusQaInput) textbookFocusQaInput.value = '';
  if (textbookFocusQaSend) textbookFocusQaSend.disabled = true;
  setTextbookFocusQaOpen(true);
  sendLearnFollowup(prompt, {
    useWebSearch: Boolean(webSearchToggleBtnTextbookFocus?.classList.contains('active')),
    answerLength: answerLengthToggleTextbookFocus?.value || 'balanced'
  }).finally(() => {
    if (textbookFocusQaSend) textbookFocusQaSend.disabled = false;
    if (textbookFocusQaInput) textbookFocusQaInput.focus({ preventScroll: true });
  });
}

function updateTextbookFocusZoomHud() {
  if (textbookFocusZoomResetBtn) textbookFocusZoomResetBtn.textContent = `${textbookFocusScale.toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1')}×`;
  if (textbookFocusZoomOutBtn) textbookFocusZoomOutBtn.disabled = textbookFocusScale <= 0.76;
  if (textbookFocusZoomInBtn) textbookFocusZoomInBtn.disabled = textbookFocusScale >= 2.99;
}

function getTextbookFocusBasePageHeight(img) {
  const viewportHeight = Math.max(0, (window.innerHeight || document.documentElement.clientHeight || 0) - 12);
  const viewportWidth = Math.max(0, (window.innerWidth || document.documentElement.clientWidth || 0) - 24);
  const naturalWidth = Number(img?.naturalWidth) || viewportWidth || 1;
  const naturalHeight = Number(img?.naturalHeight) || viewportHeight || 1;
  if (!viewportHeight || !viewportWidth) return Math.max(img?.offsetHeight || 0, 0);
  const widthLimitedHeight = viewportWidth * (naturalHeight / naturalWidth);
  return Math.min(viewportHeight, widthLimitedHeight || viewportHeight);
}

function syncTextbookFocusPageLayout() {
  const scrollEl = textbookFocusContent?.querySelector('.textbook-focus-scroll');
  const pages = scrollEl ? Array.from(scrollEl.querySelectorAll('.textbook-focus-scroll-page')) : [];
  if (!scrollEl || !pages.length) return;
  pages.forEach(page => {
    const img = page.querySelector('.textbook-focus-single-page');
    if (!img) return;
    const baseHeight = getTextbookFocusBasePageHeight(img);
    const scaledHeight = Math.max(
      Math.ceil(baseHeight * textbookFocusScale) + 28,
      Math.ceil(baseHeight) + 16,
      Math.ceil(scrollEl.clientHeight || 0)
    );
    page.style.minHeight = `${scaledHeight}px`;
  });
}

function applyTextbookFocusTransform() {
  const scrollEl = textbookFocusContent?.querySelector('.textbook-focus-scroll');
  const imgs = scrollEl ? Array.from(scrollEl.querySelectorAll('.textbook-focus-single-page')) : [];
  if (!scrollEl || !imgs.length) return;
  syncTextbookFocusPageLayout();
  imgs.forEach(img => {
    img.style.transform = `translate(${textbookFocusPanX}px, ${textbookFocusPanY}px) scale(${textbookFocusScale})`;
    img.classList.toggle('is-zoomed', textbookFocusScale > 1.01);
  });
  updateTextbookFocusZoomHud();
}

function resetTextbookFocusTransform(scale = 1.5) {
  textbookFocusScale = clampTextbookFocusScale(scale);
  textbookFocusPanX = 0;
  textbookFocusPanY = 0;
  textbookFocusDragging = false;
  textbookFocusPinchDistance = 0;
  applyTextbookFocusTransform();
}

function stepTextbookFocusZoom(delta) {
  textbookFocusScale = clampTextbookFocusScale(textbookFocusScale + delta);
  if (textbookFocusScale <= 1.01) {
    textbookFocusPanX = 0;
    textbookFocusPanY = 0;
  }
  applyTextbookFocusTransform();
}

function bindTextbookFocusInteractions() {
  const scrollEl = textbookFocusContent?.querySelector('.textbook-focus-scroll');
  if (!scrollEl) return;
  const imgs = Array.from(scrollEl.querySelectorAll('.textbook-focus-single-page'));
  if (!imgs.length) return;

  const applyToAll = () => {
    syncTextbookFocusPageLayout();
    imgs.forEach(img => {
      img.style.transform = `translate(${textbookFocusPanX}px, ${textbookFocusPanY}px) scale(${textbookFocusScale})`;
      img.classList.toggle('is-zoomed', textbookFocusScale > 1.01);
    });
    updateTextbookFocusZoomHud();
  };

  imgs.forEach(img => {
    img.addEventListener('dblclick', (e) => {
      e.preventDefault();
      if (textbookFocusScale < 1.95) resetTextbookFocusTransform(2.2);
      else resetTextbookFocusTransform(1.5);
    });

    img.addEventListener('mousedown', (e) => {
      if (textbookFocusScale <= 1.01) return;
      e.preventDefault();
      textbookFocusDragging = true;
      textbookFocusDragStartX = e.clientX - textbookFocusPanX;
      textbookFocusDragStartY = e.clientY - textbookFocusPanY;
      img.classList.add('is-dragging');
    });
  });

  scrollEl.addEventListener('wheel', (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.12 : -0.12;
      stepTextbookFocusZoom(delta);
      return;
    }
  }, { passive: false });

  scrollEl.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const [a, b] = e.touches;
      textbookFocusPinchDistance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      return;
    }
    if (e.touches.length === 1 && textbookFocusScale > 1.01) {
      const t = e.touches[0];
      textbookFocusDragging = true;
      textbookFocusDragStartX = t.clientX - textbookFocusPanX;
      textbookFocusDragStartY = t.clientY - textbookFocusPanY;
    }
  }, { passive: false });

  scrollEl.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const [a, b] = e.touches;
      const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      if (textbookFocusPinchDistance) {
        const delta = (dist - textbookFocusPinchDistance) / 220;
        textbookFocusScale = clampTextbookFocusScale(textbookFocusScale + delta);
        applyToAll();
      }
      textbookFocusPinchDistance = dist;
      return;
    }
    if (e.touches.length === 1 && textbookFocusDragging && textbookFocusScale > 1.01) {
      e.preventDefault();
      const t = e.touches[0];
      textbookFocusPanX = t.clientX - textbookFocusDragStartX;
      textbookFocusPanY = t.clientY - textbookFocusDragStartY;
      applyToAll();
    }
  }, { passive: false });

  scrollEl.addEventListener('touchend', () => {
    textbookFocusDragging = false;
    textbookFocusPinchDistance = 0;
    imgs.forEach(img => img.classList.remove('is-dragging'));
  });

  applyToAll();
}

function renderTextbookFocusPages(clickedIndex = 0) {
  if (!textbookFocusContent) return;
  const total = textbookFocusPages.length || 1;
  if (!textbookFocusPages.length) {
    textbookFocusContent.innerHTML = '<div class="textbook-focus-stage"><div class="textbook-focus-empty">No page available.</div></div>';
    if (textbookFocusPageIndicator) textbookFocusPageIndicator.textContent = '1 / 1';
    return;
  }
  textbookFocusContent.innerHTML = `
    <div class="textbook-focus-scroll" id="textbookFocusScroll">
      ${textbookFocusPages.map((page, idx) => `
        <div class="textbook-focus-scroll-page" data-page-index="${idx}">
          <img class="textbook-focus-single-page" src="${page.src}" alt="${page.alt || `Textbook page ${idx + 1}`}" draggable="false">
        </div>
      `).join('')}
    </div>
  `;

  const scrollEl = document.getElementById('textbookFocusScroll');
  const updateIndicator = () => {
    if (!scrollEl || !textbookFocusPageIndicator) return;
    const cards = Array.from(scrollEl.querySelectorAll('.textbook-focus-scroll-page'));
    const mid = scrollEl.scrollTop + scrollEl.clientHeight * 0.45;
    let bestIndex = 0;
    let bestDist = Infinity;
    cards.forEach((card, idx) => {
      const cardMid = card.offsetTop + card.offsetHeight / 2;
      const dist = Math.abs(cardMid - mid);
      if (dist < bestDist) {
        bestDist = dist;
        bestIndex = idx;
      }
    });
    textbookFocusPageIndicator.textContent = `${bestIndex + 1} / ${total}`;
  };

  if (scrollEl) {
    scrollEl.addEventListener('scroll', updateIndicator, { passive: true });
    requestAnimationFrame(() => {
      const safeIndex = Math.max(0, Math.min(clickedIndex, total - 1));
      const target = scrollEl.querySelector(`[data-page-index="${safeIndex}"]`);
      if (target) {
        scrollEl.scrollTop = Math.max(0, target.offsetTop);
      } else {
        scrollEl.scrollTop = 0;
      }
      updateIndicator();
    });
  }

  bindTextbookFocusInteractions();
  scrollEl?.querySelectorAll('.textbook-focus-single-page').forEach(img => {
    if (!img.complete) img.addEventListener('load', () => applyTextbookFocusTransform(), { once: true });
  });
  resetTextbookFocusTransform(1.5);
}

function openTextbookFocusMode(clickedIndex = 0) {
  if (!textbookFocusModal || !textbookFocusContent || !_bookOverlay) return;
  const imgs = Array.from(_bookOverlay.querySelectorAll('.textbook-page-card img'));
  if (!imgs.length) return;
  textbookFocusPages = imgs.map((img, idx) => ({
    src: img.getAttribute('src') || '',
    alt: img.getAttribute('alt') || `Textbook page ${idx + 1}`
  })).filter(p => p.src);
  if (textbookFocusTitle) {
    textbookFocusTitle.textContent = learnSectionTitle || tutorState.learnSectionTitle || 'Original Pages';
  }
  textbookFocusModal.classList.remove('hidden');
  document.body.classList.add('textbook-focus-active');
  document.body.style.overflow = 'hidden';
  renderTextbookFocusPages(clickedIndex);
  setTextbookFocusQaOpen(window.innerWidth >= 1180);
}

function closeTextbookFocusMode() {
  if (!textbookFocusModal) return;
  textbookFocusModal.classList.add('hidden');
  document.body.classList.remove('textbook-focus-active');
  document.body.style.overflow = '';
  setTextbookFocusQaOpen(false);
  textbookFocusContent.innerHTML = '';
  textbookFocusPages = [];
  textbookFocusScale = 1.5;
  textbookFocusPanX = 0;
  textbookFocusPanY = 0;
  textbookFocusDragging = false;
  textbookFocusPinchDistance = 0;
}
