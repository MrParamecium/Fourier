const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:9000' : '';

// ── Language Toggle ──────────────────────────────────────────────────────────
let currentLang = localStorage.getItem('tutorLang') || 'en'; // 'en' | 'zh'

const LANG_CONFIG = {
  en: {
    flag: '🇬🇧 EN',
    placeholder: 'Ask me to explain a concept, solve a problem, or walk through a topic…',
    followupPlaceholder: 'Ask a follow-up…',
    learnFollowupPlaceholder: 'Have a question? Ask here…',
    startBtn: 'Start Learning This Section',
    chips: [
      { label: '🔢 Complex Numbers', prompt: 'What are complex numbers? Explain from a signal processing perspective' },
      { label: '🌀 Euler\'s Formula', prompt: "Explain Euler's formula e^j\u03c9 and its meaning in signal processing" },
      { label: '🔗 Convolution', prompt: 'What is convolution? Explain with an example' },
      { label: '📐 Laplace Transform', prompt: 'Explain the Laplace transform and its applications' },
      { label: '〰️ Sine & Cosine', prompt: 'What is the relationship between sine and cosine waves?' },
    ]
  },
  zh: {
    flag: '🇨🇳 中文',
    placeholder: '问我解释一个概念、解一道题，或者带你过一遍某个主题…',
    followupPlaceholder: '继续追问…',
    learnFollowupPlaceholder: '有问题？直接问…',
    startBtn: '开始学习这一节',
    chips: [
      { label: '🔢 什么是复数？', prompt: '什么是复数？请从信号处理的角度解释' },
      { label: '🌀 欧拉公式', prompt: '解释欧拉公式 e^j\u03c9 在信号处理中的意义' },
      { label: '🔗 什么是卷积？', prompt: '什么是卷积？请举例说明' },
      { label: '📐 拉普拉斯变换', prompt: '解释拉普拉斯变换及其应用' },
      { label: '〰️ 正弦与余弦', prompt: '正弦波与余弦波有什么关系？' },
    ]
  }
};

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('tutorLang', lang);
  const cfg = LANG_CONFIG[lang];
  // update toggle button
  const btn = document.getElementById('langToggleBtn');
  const lbl = document.getElementById('langToggleLabel');
  if (lbl) lbl.textContent = cfg.flag;
  if (btn) btn.classList.toggle('lang-active', lang === 'zh');
  // update placeholders
  if (userInput) userInput.placeholder = cfg.placeholder;
  const fi = document.getElementById('followupInput');
  if (fi) fi.placeholder = cfg.followupPlaceholder;
  const lfi = document.getElementById('learnFollowupInput');
  if (lfi) lfi.placeholder = cfg.learnFollowupPlaceholder;
  const lsb = document.getElementById('learnStartBtn');
  if (lsb) lsb.childNodes[lsb.childNodes.length - 1].textContent = ' ' + cfg.startBtn;
  // update chips
  const chipsEl = document.getElementById('quickChips');
  if (chipsEl) {
    chipsEl.innerHTML = cfg.chips.map(c =>
      `<button class="chip" data-prompt="${c.prompt}">${c.label}</button>`
    ).join('');
    chipsEl.querySelectorAll('.chip').forEach(btn => {
      btn.addEventListener('click', () => sendQuestion(btn.getAttribute('data-prompt') || ''));
    });
  }
  // expose to backend calls
  window.tutorLang = lang;
}

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('langToggleBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      applyLang(currentLang === 'en' ? 'zh' : 'en');
    });
  }
  applyLang(currentLang);
});

const welcomeScreen = document.getElementById('welcomeScreen');
const answerScreen  = document.getElementById('answerScreen');
const learnView     = document.getElementById('learnView');
const topbar        = document.getElementById('topbar');
const topbarBreadcrumb = document.getElementById('topbarBreadcrumb');
const tocNav        = document.getElementById('tocNav');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const quickChips = document.getElementById('quickChips');
const backBtn = document.getElementById('backBtn');
const questionLabel = document.getElementById('questionLabel') || { textContent: '' };
const answerStatus = document.getElementById('answerStatus');

const stepsBar = document.getElementById('stepsBar');
const answerContent = document.getElementById('answerContent');
const answerScroll = document.getElementById('answerScroll');

const bookPagesContainer = document.getElementById('bookPagesContainer');
const bookPanelMeta = document.getElementById('bookPanelMeta');

const sourcesSection = document.getElementById('sourcesSection');
const bookSourcesRail = document.getElementById('bookSourcesRail');
const webSourcesRail = document.getElementById('webSourcesRail');
const bookSourcesCount = document.getElementById('bookSourcesCount');
const webSourcesCount = document.getElementById('webSourcesCount');

const followupInput = document.getElementById('followupInput');
const followupBtn = document.getElementById('followupBtn');
const courseSyllabus = document.getElementById('courseSyllabus');
const stopBtn = document.getElementById('stopBtn');
const webSourcesToggle = document.getElementById('webSourcesToggle');
const webSourcesToggleCount = document.getElementById('webSourcesToggleCount');
const webSourcesInline = document.getElementById('webSourcesInline');

let currentAbortController = null;

const tutorState = {
  chatHistory: [],
  currentBookPages: [],
  currentWebSources: [],
  learnSectionId: '',
  learnSectionTitle: '',
  learnLessonMarkdown: '',
  learnHistory: [],
  learnBookPages: [],
  learnWebSources: []
};

webSourcesToggle.addEventListener('click', () => {
  const open = !webSourcesInline.classList.contains('hidden');
  webSourcesInline.classList.toggle('hidden', open);
  webSourcesToggle.classList.toggle('open', !open);
});

const syllabusData = [
  {
    chapter: 'B Background',
    sections: [
      { title: 'B.1 Complex Numbers', subsections: ['B.1-1 A Historical Note', 'B.1-2 Algebra of Complex Numbers'] },
      { title: 'B.2 Sinusoids', subsections: ['B.2-1 Addition of Sinusoids'] },
      { title: 'B.3 Sketching Signals', subsections: ['B.3-1 Monotonic Exponentials', 'B.3-2 The Exponentially Varying Sinusoid'] },
      { title: 'B.4 Cramer\'s Rule', subsections: [] },
      { title: 'B.5 Partial Fraction Expansion', subsections: ['B.5-1 Method of Clearing Fractions', 'B.5-2 Heaviside Cover-Up Method', 'B.5-3 Complex and Repeated Roots', 'B.5-4 Hybrid Method', 'B.5-5 Improper F(x) with m=n', 'B.5-6 Modified Partial Fractions'] },
      { title: 'B.6 Vectors and Matrices', subsections: ['B.6-1 Some Definitions and Properties', 'B.6-2 Matrix Algebra', 'B.6-3 Derivatives and Integrals of a Matrix', 'B.6-4 The Characteristic Equation of a Matrix', 'B.6-5 Computation of Exponential and Power of a Matrix'] },
      { title: 'B.7 Miscellaneous', subsections: ['B.7-1 L\'Hôpital\'s Rule'] }
    ]
  },
  {
    chapter: 'Chapter 1: Introduction to Signals and Systems',
    sections: [
      { title: '1.1 Size of a Signal', subsections: [] },
      { title: '1.2 Classification of Signals', subsections: ['1.2-1 Continuous-Time and Discrete-Time Signals', '1.2-2 Analog and Digital Signals', '1.2-3 Periodic and Aperiodic Signals', '1.2-4 Energy and Power Signals', '1.2-5 Deterministic and Random Signals'] },
      { title: '1.3 Some Useful Signal Operations', subsections: ['1.3-1 Time Shifting', '1.3-2 Time Scaling', '1.3-3 Time Inversion (Time Reversal)', '1.3-4 Combined Operations'] },
      { title: '1.4 Some Useful Signal Models', subsections: [] },
      { title: '1.5 Even and Odd Functions', subsections: ['1.5-1 Some Properties of Even and Odd Functions', '1.5-2 Even and Odd Components of a Signal'] },
      { title: '1.6 Systems', subsections: [] },
      { title: '1.7 Classification of Systems', subsections: ['1.7-1 Linear and Nonlinear Systems', '1.7-2 Time-Invariant and Time-Varying Parameter Systems', '1.7-3 Instantaneous and Dynamic Systems', '1.7-4 Causal and Noncausal Systems', '1.7-5 Lumped-Parameter and Distributed-Parameter Systems', '1.7-6 Continuous-Time and Discrete-Time Systems', '1.7-7 Analog and Digital Systems'] },
      { title: '1.8 System Model: Input-Output Description', subsections: ['1.8-1 Internal and External Descriptions of a System'] },
      { title: '1.9 Summary', subsections: [] }
    ]
  },
  {
    chapter: 'Chapter 2: Time-Domain Analysis of Continuous-Time Systems',
    sections: [
      '2.1 Introduction',
      '2.2 Zero-Input response',
      '2.3 Unit Impulse response h(t)',
      '2.4 Zero-State Response',
      '2.5 Differential equations',
      '2.6 System Stability',
      '2.7 Intuitive Insights',
      '2.8 Appendix',
      '2.9 Summary'
    ]
  },
  {
    chapter: 'Chapter 3: Fourier Series',
    sections: [
      '3.1 Signals and Vectors',
      '3.2 Correlation',
      '3.3 Orthogonal Signal Set',
      '3.4 Trigonometric Fourier Series',
      '3.5 Exponential Fourier Series',
      '3.6 Numerical Computation',
      '3.7 LTIC Periodic Response',
      '3.8 Appendix',
      '3.9 Summary'
    ]
  },
  {
    chapter: 'Chapter 4: Fourier Transform',
    sections: [
      '4.1 Fourier Integral',
      '4.2 Useful Functions',
      '4.3 Properties',
      '4.4 LTIC Systems',
      '4.5 Filters',
      '4.6 Signal Energy',
      '4.7 Amplitude Modulation',
      '4.8 Angle Modulation',
      '4.9 Window Functions',
      '4.10 Summary'
    ]
  },
  {
    chapter: 'Chapter 5: Sampling',
    sections: [
      '5.1 The Sampling Theorem',
      '5.2 Numerical Computation of Fourier Transform: DFT',
      '5.3 The Fast Fourier Transform (FFT)',
      '5.4 Appendix 5.1',
      '5.5 Summary'
    ]
  },
  {
    chapter: 'Chapter 6: Continuous-Time System Analysis Using the Laplace Transform',
    sections: [
      '6.1 The Laplace Transform',
      '6.2 Properties of the Laplace Transform',
      '6.3 Solution of Differential and Integro-Differential Equations',
      '6.4 Analysis of Electrical Networks',
      '6.5 Block Diagrams',
      '6.6 System Realization',
      '6.7 Application to Feedback and Controls',
      '6.8 The Bilateral Laplace Transform',
      '6.9 Appendix 6.1',
      '6.10 Summary'
    ]
  },
  {
    chapter: 'Chapter 7: Frequency Response and Analog Filters',
    sections: [
      '7.1 Frequency Response of an LTIC System',
      '7.2 Bode Plots',
      '7.3 Control System Design Using Frequency Response',
      '7.4 Filter Design by Placement of Poles and Zeros',
      '7.5 Butterworth Filters',
      '7.6 Chebyshev Filters',
      '7.7 Frequency Transformations',
      '7.8 Filters for Distortionless Transmission',
      '7.9 Summary'
    ]
  },
  {
    chapter: 'Chapter 8: Discrete-Time Signals and Systems',
    sections: [
      '8.1 Introduction',
      '8.2 Some Useful Discrete-Time Signal Models',
      '8.3 Sampling Continuous-Time Sinusoids and Aliasing',
      '8.4 Useful Signal Operations',
      '8.5 Examples of Discrete-Time Systems',
      '8.6 Summary'
    ]
  },
  {
    chapter: 'Chapter 9: Time-Domain Analysis of Discrete-Time Systems',
    sections: [
      '9.1 Discrete-Time System Equations',
      '9.2 Zero-Input Response',
      '9.3 Unit Impulse Response h[k]',
      '9.4 Zero-State Response',
      '9.5 Classical Solution of Linear Difference Equations',
      '9.6 System Stability',
      '9.7 Appendix 9.1',
      '9.8 Summary'
    ]
  },
  {
    chapter: 'Chapter 10: Fourier Analysis of Discrete-Time Signals',
    sections: [
      '10.1 Periodic Signal Representation by DTFS',
      '10.2 Aperiodic Signal Representation by Fourier Integral',
      '10.3 Properties of DTFT',
      '10.4 DTFT Connection With Continuous-Time Fourier Transform',
      '10.5 Discrete-Time Linear System Analysis by DTFT',
      '10.6 Signal Processing Using DFT and FFT',
      '10.7 Generalization of DTFT to the Z-Transform',
      '10.8 Summary'
    ]
  },
  {
    chapter: 'Chapter 11: Discrete-Time System Analysis Using the Z-Transform',
    sections: [
      '11.1 The Z-Transform',
      '11.2 Properties of the Z-Transform',
      '11.3 Z-Transform Solution of Linear Difference Equations',
      '11.4 System Realization',
      '11.5 Connection Between the Laplace and the Z-Transform',
      '11.6 Sampled-Data (Hybrid) Systems',
      '11.7 The Bilateral Z-Transform',
      '11.8 Summary'
    ]
  },
  {
    chapter: 'Chapter 12: Frequency Response and Digital Filters',
    sections: [
      '12.1 Frequency Response of Discrete-Time Systems',
      '12.2 Frequency Response From Pole-Zero Location',
      '12.3 Digital Filters',
      '12.4 Filter Design Criteria',
      '12.5 Recursive Filter Design: Impulse Invariance Method',
      '12.6 Recursive Filter Design: Bilinear Transformation Method',
      '12.7 Nonrecursive Filters',
      '12.8 Nonrecursive Filter Design',
      '12.9 Summary'
    ]
  },
  {
    chapter: 'Chapter 13: State-Space Analysis',
    sections: [
      '13.1 Introduction',
      '13.2 Systematic Procedure for Determining State Equations',
      '13.3 Solution of State Equations',
      '13.4 Linear Transformation of State Vector',
      '13.5 Controllability and Observability',
      '13.6 State-Space Analysis of Discrete-Time Systems',
      '13.7 Summary'
    ]
  }
];

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
}

function setSendState() {
  sendBtn.disabled = !userInput.value.trim();
  followupBtn.disabled = !followupInput.value.trim();
}

function renderSyllabus() {
  let html = '';
  syllabusData.forEach((item, chIdx) => {
    // Normalize: support both old string[] and new {title, subsections}[] formats
    const sections = item.sections.map(s => typeof s === 'string' ? { title: s, subsections: [] } : s);

    const sectionsHtml = sections.map((sec, secIdx) => {
      const hasChildren = sec.subsections && sec.subsections.length > 0;
      const subId = `syllabus-${chIdx}-${secIdx}`;
      const subsHtml = hasChildren
        ? `<div class="syllabus-subsections hidden" id="${subId}">${sec.subsections.map(sub =>
            `<button class="syllabus-subsection" data-section="${escapeHtml(sub)}">${escapeHtml(sub)}</button>`
          ).join('')}</div>`
        : '';
      return `
        <div class="syllabus-section-wrap">
          <div class="syllabus-section-row">
            ${hasChildren ? `<button class="syllabus-section-caret" data-sub-id="${subId}"><span class="caret">›</span></button>` : '<span class="syllabus-section-caret-placeholder"></span>'}
            <button class="syllabus-section" data-section="${escapeHtml(sec.title)}">${escapeHtml(sec.title)}</button>
          </div>
          ${subsHtml}
        </div>`;
    }).join('');

    html += `
      <div class="syllabus-item">
        <button class="syllabus-chapter" data-idx="${chIdx}">
          <span class="caret">›</span>
          <span>${escapeHtml(item.chapter)}</span>
        </button>
        <div class="syllabus-sections hidden" id="syllabus-${chIdx}">
          ${sectionsHtml}
        </div>
      </div>
    `;
  });
  courseSyllabus.innerHTML = html;

  // Chapter expand/collapse
  courseSyllabus.querySelectorAll('.syllabus-chapter').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-idx');
      const panel = document.getElementById(`syllabus-${idx}`);
      const caret = btn.querySelector('.caret');
      const open = panel.classList.contains('hidden');
      panel.classList.toggle('hidden', !open);
      caret.classList.toggle('open', open);
    });
  });

  // Section caret (expand subsections)
  courseSyllabus.querySelectorAll('.syllabus-section-caret').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const subId = btn.getAttribute('data-sub-id');
      const panel = document.getElementById(subId);
      const caret = btn.querySelector('.caret');
      const open = panel.classList.contains('hidden');
      panel.classList.toggle('hidden', !open);
      caret.classList.toggle('open', open);
    });
  });

  // Section / subsection click → open Learn Mode
  courseSyllabus.querySelectorAll('.syllabus-section, .syllabus-subsection').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const section = btn.getAttribute('data-section');
      const title   = btn.textContent.trim();
      openLearnMode(section, title);
    });
  });
}

// ============================================================
// LEARN MODE
// ============================================================
const learnOverlay    = null; // replaced by learnView inline mode
const learnTitle      = document.getElementById('learnTitle');
const learnClose      = document.getElementById('learnClose');
const learnIntroCard  = document.getElementById('learnIntroCard');
const learnIntroMeta  = document.getElementById('learnIntroMeta');
const learnIntroText  = document.getElementById('learnIntroText');
const learnStartBtn   = document.getElementById('learnStartBtn');
const learnBody       = document.getElementById('learnBody');
const learnLoading    = document.getElementById('learnLoading');
const learnLoadingText = document.getElementById('learnLoadingText');
const learnSplash     = document.getElementById('learnSplash');
const learnSplashNote = document.getElementById('learnSplashNote');
const learnWebSection  = document.getElementById('learnWebSection');
const learnWebSectionCount = document.getElementById('learnWebSectionCount');
const learnWebCards    = document.getElementById('learnWebCards');
const learnBookPages  = document.getElementById('learnBookPages');
const learnPageLabel  = document.getElementById('learnPageLabel');
const learnPagePrev   = document.getElementById('learnPagePrev');
const learnPageNext   = document.getElementById('learnPageNext');
const learnExplainContent = document.getElementById('learnExplainContent');
const learnExplainScroll  = document.getElementById('learnExplainScroll');
const learnFollowupInput  = document.getElementById('learnFollowupInput');
const learnFollowupBtn    = document.getElementById('learnFollowupBtn');
const learnWebToggle  = document.getElementById('learnWebToggle');
const learnWebBtn     = document.getElementById('learnWebBtn');
const learnWebCount   = document.getElementById('learnWebCount');
const learnWebSources = document.getElementById('learnWebSources');
const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxClose   = document.getElementById('lightboxClose');

let learnPages = [];
let learnPageIndex = 0;
let learnSectionId = '';
let learnSectionTitle = '';
let learnWebData = [];
let learnAbort = null;

// ── Splash stage control ──────────────────────────────────────────────────
let splashTimer = null;
function showSplash() {
  learnSplash.classList.remove('hidden');
  [1,2,3,4].forEach(n => {
    const el = document.getElementById(`lss-${n}`);
    if (el) { el.classList.remove('active','done'); }
  });
  setSplashStage(1);
}
function hideSplash() {
  if (splashTimer) { clearInterval(splashTimer); splashTimer = null; }
  learnSplash.classList.add('hidden');
}
function setSplashStage(n) {
  [1,2,3,4].forEach(i => {
    const el = document.getElementById(`lss-${i}`);
    if (!el) return;
    el.classList.remove('active','done');
    if (i < n) el.classList.add('done');
    else if (i === n) el.classList.add('active');
  });
}
function startSplashProgress(fromStage, toStage, totalMs) {
  let stage = fromStage;
  setSplashStage(stage);
  const steps = toStage - fromStage;
  if (steps <= 0) return;
  const interval = totalMs / steps;
  splashTimer = setInterval(() => {
    stage++;
    setSplashStage(stage);
    if (stage >= toStage) { clearInterval(splashTimer); splashTimer = null; }
  }, interval);
}
// ─────────────────────────────────────────────────────────────────────────────

function setLearnLoading(show, text = 'Loading…') {
  learnLoading.classList.toggle('hidden', !show);
  if (show) learnLoadingText.textContent = text;
}

function renderLearnPages() {
  if (!learnPages.length) {
    learnBookPages.innerHTML = '<p class="learn-empty">No book pages found for this section.</p>';
    learnPageLabel.textContent = '—';
    learnPagePrev.classList.add('hidden');
    learnPageNext.classList.add('hidden');
    return;
  }

  learnPageLabel.textContent = `${learnPages.length} 页`;
  learnPagePrev.classList.add('hidden');
  learnPageNext.classList.add('hidden');

  learnBookPages.innerHTML = learnPages.map((p, i) => `
    <div class="learn-page-wrap">
      <img class="learn-page-img" src="${escapeHtml(p.image)}" alt="${escapeHtml(p.page)}" data-idx="${i}">
      <div class="learn-page-meta">${escapeHtml(p.subsection || p.title || p.page)}</div>
    </div>
  `).join('');

  // Lightbox on click
  learnBookPages.querySelectorAll('.learn-page-img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.remove('hidden');
    });
  });
}

function renderLearnWebSources(sources) {
  if (!sources || !sources.length) {
    learnWebToggle.classList.add('hidden');
    return;
  }
  learnWebData = sources;
  learnWebCount.textContent = sources.length;
  learnWebToggle.classList.remove('hidden');
  learnWebSources.innerHTML = sources.map(w => {
    const d = w.domain || domainOf(w.url);
    const fav = d ? `https://www.google.com/s2/favicons?sz=32&domain=${encodeURIComponent(d)}` : '';
    return `<a class="web-source-inline-card" href="${escapeHtml(w.url)}" target="_blank" rel="noopener noreferrer">
      <div class="wsic-left">
        ${fav ? `<img class="wsic-fav" src="${fav}" alt="">` : '<span class="wsic-fav-placeholder"></span>'}
        <div class="wsic-body">
          <div class="wsic-title">${escapeHtml(w.title || d || w.url)}</div>
          <div class="wsic-url">${escapeHtml(d || w.url)}</div>
          ${w.snippet ? `<div class="wsic-snippet">${escapeHtml(w.snippet)}</div>` : ''}
        </div>
      </div>
      <svg class="wsic-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
    </a>`;
  }).join('');
}

function renderLearnWebSection(webSources) {
  if (!learnWebSection) return;
  if (!webSources || !webSources.length) {
    learnWebSection.classList.add('hidden');
    return;
  }
  learnWebSectionCount.textContent = webSources.length;
  learnWebCards.innerHTML = webSources.map(w => {
    const d = w.domain || domainOf(w.url);
    const fav = d ? `https://www.google.com/s2/favicons?sz=32&domain=${encodeURIComponent(d)}` : '';
    return `<a class="learn-web-card" href="${escapeHtml(w.url)}" target="_blank" rel="noopener noreferrer">
      <div class="lwc-head">
        ${fav ? `<img class="lwc-fav" src="${fav}" alt="">` : ''}
        <div class="lwc-title">${escapeHtml(w.title || d || w.url)}</div>
      </div>
      ${d ? `<div class="lwc-domain">${escapeHtml(d)}</div>` : ''}
      ${w.snippet ? `<div class="lwc-snippet">${escapeHtml(w.snippet)}</div>` : ''}
    </a>`;
  }).join('');
  learnWebSection.classList.remove('hidden');
}

async function openLearnMode(sectionId, sectionTitle) {
  learnSectionId = sectionId;
  learnSectionTitle = sectionTitle;
  learnPages = [];
  learnPageIndex = 0;
  learnWebData = [];

  learnTitle.textContent = sectionTitle;
  learnIntroCard.classList.remove('hidden');
  learnBody.classList.add('hidden');
  learnIntroText.textContent = '';
  if (learnIntroMeta) learnIntroMeta.innerHTML = '';
  showLearnView();
  showSplash();
  // Seed TOC with section title while loading
  buildToc([{ title: sectionTitle, depth: 1, anchor: '' }]);

  if (learnAbort) learnAbort.abort();
  learnAbort = new AbortController();

  try {
    const res = await fetch(`${API_BASE}/api/section`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sectionId, sectionTitle, mode: 'intro', language: window.tutorLang || 'en' }),
      signal: learnAbort.signal
    });
    const data = await res.json();
    learnPages = data.bookPages || [];
    hideSplash();
    if (learnIntroMeta && data.bookPages && data.bookPages.length) {
      learnIntroMeta.innerHTML = [
        `<span class="learn-intro-badge">📚 ${data.bookPages.length} textbook page${data.bookPages.length !== 1 ? 's' : ''}</span>`,
        `<span class="learn-intro-badge">💡 ${sectionTitle}</span>`
      ].join('');
    }
    learnIntroText.textContent = data.intro || 'Ready to start learning.';
    setLearnLoading(false);
  } catch (err) {
    hideSplash();
    if (err.name === 'AbortError') return;
    learnIntroText.textContent = 'Failed to load: ' + err.message;
    setLearnLoading(false);
  }
}

async function startLesson() {
  learnIntroCard.classList.add('hidden');
  showSplash();
  startSplashProgress(1, 3, 8000); // animate stages 1-3 over ~8s (real API determines actual timing)

  if (learnAbort) learnAbort.abort();
  learnAbort = new AbortController();

  try {
    const res = await fetch(`${API_BASE}/api/section`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sectionId: learnSectionId, sectionTitle: learnSectionTitle, mode: 'lesson', language: window.tutorLang || 'en' }),
      signal: learnAbort.signal
    });
    setSplashStage(4); // charts / rendering
    const data = await res.json();
    hideSplash();

    learnBody.classList.remove('hidden');
    learnPages = data.bookPages || learnPages;
    tutorState.learnSectionId = learnSectionId;
    tutorState.learnSectionTitle = learnSectionTitle;
    tutorState.learnLessonMarkdown = data.lesson || '';
    tutorState.learnBookPages = data.bookPages || [];
    tutorState.learnWebSources = data.webSources || [];
    tutorState.learnHistory = tutorState.learnLessonMarkdown
      ? [{ role: 'assistant', content: tutorState.learnLessonMarkdown }]
      : [];
    renderLearnPages();
    learnExplainContent.innerHTML = markdownToHtml(data.lesson || 'No explanation available.');
    setTimeout(() => {
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([learnExplainContent]).catch(() => {});
      }
      buildTocFromContent(learnExplainContent);
    }, 80);
    renderLearnWebSources(data.webSources || []);
    renderLearnWebSection(data.webSources || []);
    learnExplainScroll.scrollTop = 0;
    setLearnLoading(false);
  } catch (err) {
    hideSplash();
    if (err.name === 'AbortError') return;
    learnBody.classList.remove('hidden');
    learnExplainContent.innerHTML = `<div class="error-box"><strong>Failed to load lesson</strong><p>${escapeHtml(err.message)}</p></div>`;
  }
}

function closeLearnMode() {
  if (learnAbort) learnAbort.abort();
  hideSplash();
  showWelcome();
  clearToc();
}

// Learn mode events
learnClose.addEventListener('click', closeLearnMode);
learnStartBtn.addEventListener('click', startLesson);
learnPagePrev.addEventListener('click', () => {});
learnPageNext.addEventListener('click', () => {});
learnWebBtn.addEventListener('click', () => {
  const open = !learnWebSources.classList.contains('hidden');
  learnWebSources.classList.toggle('hidden', open);
  learnWebBtn.classList.toggle('open', !open);
});
lightboxClose.addEventListener('click', () => lightbox.classList.add('hidden'));
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.add('hidden'); });

learnFollowupInput.addEventListener('input', () => {
  autoResize(learnFollowupInput);
  learnFollowupBtn.disabled = !learnFollowupInput.value.trim();
});
async function sendLearnFollowup(rawPrompt) {
  const prompt = (rawPrompt || learnFollowupInput.value || '').trim();
  if (!prompt) return;

  learnFollowupInput.value = '';
  autoResize(learnFollowupInput);
  learnFollowupBtn.disabled = true;

  const answerId = `learn-followup-answer-${Date.now()}`;
  learnExplainContent.insertAdjacentHTML('beforeend', `
    <div class="followup-bubble" id="${answerId}">
      <div class="fub-q">${escapeHtml(prompt)}</div>
      <div class="fub-a ghost">Thinking with context from this section…</div>
    </div>
  `);
  learnExplainScroll.scrollTop = learnExplainScroll.scrollHeight;

  if (learnAbort) learnAbort.abort();
  learnAbort = new AbortController();

  try {
    const data = await callAsk(prompt, learnAbort.signal, {
      mode: 'followup',
      history: tutorState.learnHistory.slice(-8),
      sectionId: tutorState.learnSectionId,
      sectionTitle: tutorState.learnSectionTitle,
      lessonContext: tutorState.learnLessonMarkdown,
      bookPages: tutorState.learnBookPages,
      webSources: tutorState.learnWebSources,
      language: window.tutorLang || 'en'
    });

    const target = document.getElementById(answerId);
    if (target) {
      const answerDiv = target.querySelector('.fub-a') || target;
      answerDiv.className = 'fub-a';
      answerDiv.innerHTML = markdownToHtml(data.explanation || 'No explanation available.');
    }
    setTimeout(() => {
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([learnExplainContent]).catch(() => {});
      }
    }, 50);

    tutorState.learnHistory.push(
      { role: 'user', content: prompt },
      { role: 'assistant', content: data.explanation || '' }
    );
    tutorState.learnBookPages = data.bookPages || tutorState.learnBookPages;
    tutorState.learnWebSources = data.webSources || tutorState.learnWebSources;
    renderLearnWebSources(tutorState.learnWebSources);
    renderLearnWebSection(tutorState.learnWebSources);
    learnExplainScroll.scrollTop = learnExplainScroll.scrollHeight;
  } catch (err) {
    if (err.name === 'AbortError') return;
    const target = document.getElementById(answerId);
    if (target) {
      target.innerHTML = `<div class="error-box"><strong>加载失败</strong><p>${escapeHtml(err.message)}</p></div>`;
    }
  }
}

learnFollowupInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    if (!learnFollowupInput.value.trim()) return;
    sendLearnFollowup(learnFollowupInput.value.trim());
  }
});
learnFollowupBtn.addEventListener('click', () => {
  if (!learnFollowupInput.value.trim()) return;
  sendLearnFollowup(learnFollowupInput.value.trim());
});

// Esc to close
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (!lightbox.classList.contains('hidden')) lightbox.classList.add('hidden');
    else if (!learnView.classList.contains('hidden')) closeLearnMode();
  }
});

function markdownToHtml(md) {
  if (!md) return '<p>暂无内容</p>';
  // Pre-process: convert $...$ to \(...\) for MathJax
  let text = String(md);
  if (window.preprocessMath) {
    text = window.preprocessMath(text);
  } else {
    // Fallback: simple regex to convert single $...$ to \(...\)
    text = text.replace(/(?<!\$)\$(?!\$)(.+?)(?<!\$)\$(?!\$)/g, '\\($1\\)');
  }
  const lines = text.replace(/\r/g, '').split('\n');
  let html = '';
  let inList = false;
  let inCode = false;
  let inMath = false;
  let codeBuf = [];
  let mathBuf = [];

  const flushList = () => {
    if (inList) { html += '</ul>'; inList = false; }
  };
  const flushCode = () => {
    if (inCode) {
      html += `<pre><code>${escapeHtml(codeBuf.join('\n'))}</code></pre>`;
      inCode = false; codeBuf = [];
    }
  };
  const flushMath = () => {
    if (inMath) {
      // output as raw $$ block — MathJax will render it
      html += `<div class="math-block">$$${mathBuf.join('\n')}$$</div>`;
      inMath = false; mathBuf = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const t = line.trim();

    // ``` code block
    if (t.startsWith('```')) {
      flushList(); flushMath();
      if (inCode) flushCode(); else inCode = true;
      continue;
    }
    if (inCode) { codeBuf.push(raw); continue; }

    // $$ math block
    if (t === '$$') {
      flushList();
      if (inMath) flushMath(); else inMath = true;
      continue;
    }
    if (inMath) { mathBuf.push(raw); continue; }

    if (!t) { flushList(); continue; }

    if (/^#{1,6}\s+/.test(t)) {
      flushList();
      const lv = Math.min((t.match(/^#+/) || ['#'])[0].length, 6);
      const txt = t.replace(/^#{1,6}\s+/, '');
      html += `<h${lv}>${inlineFormat(txt)}</h${lv}>`;
      continue;
    }

    if (/^[-*+]\s+/.test(t)) {
      if (!inList) { html += '<ul>'; inList = true; }
      html += `<li>${inlineFormat(t.replace(/^[-*+]\s+/, ''))}</li>`;
      continue;
    }

    flushList();
    html += `<p>${inlineFormat(t)}</p>`;
  }

  flushList(); flushCode(); flushMath();
  return html;
}

function inlineFormat(text) {
  let s = escapeHtml(text);
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*(.+?)\*/g, '<em>$1</em>');
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  return s;
}

// ── View switcher ───────────────────────────────────────────────────────────
function showWelcome() {
  welcomeScreen.classList.remove('hidden');
  answerScreen.classList.add('hidden');
  learnView.classList.add('hidden');
  if (topbar) topbar.classList.add('hidden');
  clearToc();
}

function showAnswer(question) {
  welcomeScreen.classList.add('hidden');
  answerScreen.classList.remove('hidden');
  learnView.classList.add('hidden');
  if (topbar) topbar.classList.remove('hidden');
  if (topbarBreadcrumb) topbarBreadcrumb.textContent = question;
}

function showLearnView() {
  welcomeScreen.classList.add('hidden');
  answerScreen.classList.add('hidden');
  learnView.classList.remove('hidden');
  if (topbar) topbar.classList.add('hidden');
}

// ── Right TOC ───────────────────────────────────────────────────────────
function buildToc(items) {
  if (!tocNav) return;
  if (!items || !items.length) { clearToc(); return; }
  tocNav.innerHTML = items.map(item => {
    const depthClass = `depth-${item.depth || 1}`;
    return `<button class="toc-item ${depthClass}" data-anchor="${escapeHtml(item.anchor || '')}">${escapeHtml(item.title)}</button>`;
  }).join('');
  tocNav.querySelectorAll('.toc-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const anchor = btn.dataset.anchor;
      if (anchor) {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      tocNav.querySelectorAll('.toc-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function clearToc() {
  if (!tocNav) return;
  tocNav.innerHTML = '<div class="toc-empty"><p>Select a section<br>from the syllabus<br>to begin.</p></div>';
}

function buildTocFromSyllabus(chapterTitle, sections) {
  const items = [];
  if (chapterTitle) items.push({ title: chapterTitle, depth: 1, anchor: '' });
  (sections || []).forEach(sec => {
    items.push({ title: sec.sectionId + ' ' + (sec.title || sec.sectionTitle || ''), depth: 2, anchor: '' });
    (sec.subsections || []).forEach(sub => {
      items.push({ title: sub.sectionId + ' ' + (sub.title || sub.sectionTitle || ''), depth: 3, anchor: '' });
    });
  });
  buildToc(items);
}

// Generate TOC from rendered lesson HTML headings
function buildTocFromContent(containerEl) {
  if (!containerEl || !tocNav) return;
  const headings = containerEl.querySelectorAll('h1, h2, h3, h4');
  if (!headings.length) return;
  const items = [];
  let counter = 0;
  headings.forEach(h => {
    const depth = parseInt(h.tagName[1], 10);
    const title = h.textContent.trim();
    const anchor = `toc-anchor-${counter++}`;
    h.id = anchor;
    items.push({ title, depth, anchor });
  });
  buildToc(items);
  // Intersection observer to highlight active section
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocNav.querySelectorAll('.toc-item').forEach(b => {
          b.classList.toggle('active', b.dataset.anchor === id);
        });
      }
    });
  }, { threshold: 0.4 });
  headings.forEach(h => observer.observe(h));
}

function setStatus(text, type = 'idle') {
  answerStatus.textContent = text;
  answerStatus.className = `status-chip ${type}`;
}

function renderStepState(activeStep = 1) {
  stepsBar.classList.remove('hidden');
  const dots = stepsBar.querySelectorAll('.step-dot');
  dots.forEach((dot, idx) => {
    const n = idx + 1;
    dot.classList.remove('pending', 'active', 'done');
    if (n < activeStep) dot.classList.add('done');
    else if (n === activeStep) dot.classList.add('active');
    else dot.classList.add('pending');
  });
}

function setStepsDone() {
  const dots = stepsBar.querySelectorAll('.step-dot');
  dots.forEach(dot => {
    dot.classList.remove('pending', 'active');
    dot.classList.add('done');
  });
}

function renderBookPages(bookPages = []) {
  bookPanelMeta.textContent = bookPages.length ? `${bookPages.length}` : '';

  if (!bookPages.length) {
    bookPagesContainer.innerHTML = `
      <div class="col-empty">
        <p>No pages matched in this run.</p>
      </div>
    `;
    return;
  }

  bookPagesContainer.innerHTML = bookPages.map((p, i) => `
    <article class="page-card">
      <div class="page-card-head">
        <span class="page-tag">[书页${i + 1}]</span>
        <span class="page-title">${escapeHtml(p.page)} · ${escapeHtml(p.subsection || p.title || 'Textbook')}</span>
      </div>
      <img class="page-image" src="${escapeHtml(p.image)}" alt="${escapeHtml(p.page)}" loading="lazy">
      <p class="page-summary">${escapeHtml(p.summary || 'No summary')}</p>
    </article>
  `).join('');
}

function domainOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch (_) {
    return '';
  }
}

function renderBookSources(bookPages = []) {
  bookSourcesCount.textContent = String(bookPages.length || 0);
  if (!bookPages.length) {
    bookSourcesRail.innerHTML = '<div class="source-empty">No book sources</div>';
    return;
  }

  bookSourcesRail.innerHTML = bookPages.map((p, i) => `
    <div class="source-card">
      <div class="source-index">书页${i + 1}</div>
      <div class="source-title">${escapeHtml(p.page)}</div>
      <div class="source-meta">${escapeHtml(p.subsection || p.title || 'Textbook')}</div>
    </div>
  `).join('');
}

function renderWebSources(webSources = []) {
  webSourcesCount.textContent = String(webSources.length || 0);
  if (!webSources.length) {
    webSourcesRail.innerHTML = '<div class="source-empty">No web sources</div>';
    return;
  }

  webSourcesRail.innerHTML = webSources.map((w, i) => {
    const d = w.domain || domainOf(w.url);
    const fav = d ? `https://www.google.com/s2/favicons?sz=64&domain=${encodeURIComponent(d)}` : '';
    return `
      <a class="source-card source-link" href="${escapeHtml(w.url)}" target="_blank" rel="noopener noreferrer">
        <div class="source-index">来源${i + 1}</div>
        <div class="source-title">${escapeHtml(w.title || d || w.url)}</div>
        <div class="source-meta">${fav ? `<img src="${fav}" alt="">` : ''}${escapeHtml(d || '')}</div>
      </a>
    `;
  }).join('');
}

function renderWebSourcesInline(webSources = []) {
  if (!webSources.length) {
    webSourcesToggle.classList.add('hidden');
    webSourcesInline.classList.add('hidden');
    return;
  }

  webSourcesToggleCount.textContent = `${webSources.length} pages found`;
  webSourcesToggle.classList.remove('hidden');
  webSourcesToggle.classList.remove('open');
  webSourcesInline.classList.add('hidden'); // collapsed by default

  webSourcesInline.innerHTML = webSources.map((w, i) => {
    const d = w.domain || domainOf(w.url);
    const fav = d ? `https://www.google.com/s2/favicons?sz=32&domain=${encodeURIComponent(d)}` : '';
    return `
      <a class="web-source-inline-card" href="${escapeHtml(w.url)}" target="_blank" rel="noopener noreferrer">
        <div class="wsic-left">
          ${fav ? `<img class="wsic-fav" src="${fav}" alt="">` : '<span class="wsic-fav-placeholder"></span>'}
          <div class="wsic-body">
            <div class="wsic-title">${escapeHtml(w.title || d || w.url)}</div>
            <div class="wsic-url">${escapeHtml(d || w.url)}</div>
            ${w.snippet ? `<div class="wsic-snippet">${escapeHtml(w.snippet)}</div>` : ''}
          </div>
        </div>
        <svg class="wsic-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
      </a>
    `;
  }).join('');
}

function renderExplanation(markdown) {
  answerContent.innerHTML = markdownToHtml(markdown || '暂无讲解内容');
  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise([answerContent]).catch(() => {});
  }
  setTimeout(() => buildTocFromContent(answerContent), 80);
}

async function callAsk(prompt, signal, extra = {}) {
  const res = await fetch(`${API_BASE}/api/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, ...extra }),
    signal
  });

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch (_) {
    throw new Error(text || `HTTP ${res.status}`);
  }

  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

let loadingTimer = null;

function startStepAnimation() {
  let step = 1;
  renderStepState(step);
  loadingTimer = setInterval(() => {
    step = Math.min(3, step + 1);
    renderStepState(step);
  }, 1200);
}

function stopStepAnimation() {
  if (loadingTimer) {
    clearInterval(loadingTimer);
    loadingTimer = null;
  }
  setStepsDone();
}

async function sendQuestion(rawPrompt) {
  const prompt = (rawPrompt || userInput.value || followupInput.value || '').trim();
  if (!prompt) return;

  const isFollowup = document.activeElement === followupInput || !!followupInput.value.trim();

  userInput.value = prompt;
  followupInput.value = '';
  autoResize(userInput);
  autoResize(followupInput);
  setSendState();

  showAnswer(prompt);
  setStatus('Working', 'working');
  renderBookPages([]);
  renderBookSources([]);
  renderWebSources([]);
  sourcesSection.classList.add('hidden');
  answerContent.innerHTML = '<p class="ghost">Preparing textbook retrieval and web research...</p>';
  answerScroll.scrollTop = 0;

  // Abort any in-flight request
  if (currentAbortController) currentAbortController.abort();
  currentAbortController = new AbortController();
  stopBtn.classList.remove('hidden');

  startStepAnimation();

  try {
    const data = await callAsk(prompt, currentAbortController.signal, {
      mode: isFollowup ? 'followup' : 'ask',
      history: tutorState.chatHistory.slice(-8),
      bookPages: tutorState.currentBookPages,
      webSources: tutorState.currentWebSources,
      language: window.tutorLang || 'en'
    });
    stopStepAnimation();
    currentAbortController = null;
    stopBtn.classList.add('hidden');

    tutorState.chatHistory.push(
      { role: 'user', content: prompt },
      { role: 'assistant', content: data.explanation || '' }
    );
    tutorState.currentBookPages = data.bookPages || [];
    tutorState.currentWebSources = data.webSources || [];

    renderBookPages(data.bookPages || []);
    renderExplanation(data.explanation || '暂无讲解内容');

    renderBookSources(data.bookPages || []);
    renderWebSources(data.webSources || []);
    renderWebSourcesInline(data.webSources || []);
    sourcesSection.classList.remove('hidden');

    setStatus('Done', 'done');
  } catch (err) {
    stopStepAnimation();
    currentAbortController = null;
    stopBtn.classList.add('hidden');
    if (err.name === 'AbortError') {
      setStatus('Stopped', 'idle');
      answerContent.innerHTML = '<p class="ghost">已停止。</p>';
    } else {
      setStatus('Error', 'error');
      answerContent.innerHTML = `
        <div class="error-box">
          <strong>请求失败</strong>
          <p>${escapeHtml(err.message)}</p>
        </div>
      `;
    }
  }
}

stopBtn.addEventListener('click', () => {
  if (currentAbortController) currentAbortController.abort();
});

userInput.addEventListener('input', () => {
  autoResize(userInput);
  setSendState();
});

followupInput.addEventListener('input', () => {
  autoResize(followupInput);
  setSendState();
});

userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendQuestion(userInput.value);
  }
});

followupInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendQuestion(followupInput.value);
  }
});

sendBtn.addEventListener('click', () => sendQuestion(userInput.value));
followupBtn.addEventListener('click', () => sendQuestion(followupInput.value));

backBtn.addEventListener('click', () => {
  showWelcome();
  setStatus('', 'idle');
  tutorState.chatHistory = [];
  tutorState.currentBookPages = [];
  tutorState.currentWebSources = [];
});

quickChips.querySelectorAll('.chip').forEach(btn => {
  btn.addEventListener('click', () => {
    const prompt = btn.getAttribute('data-prompt') || '';
    sendQuestion(prompt);
  });
});

renderSyllabus();
autoResize(userInput);
autoResize(followupInput);
setSendState();
showWelcome();
setStatus('', 'idle');
