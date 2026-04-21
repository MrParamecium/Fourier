const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:9000' : '';

// ════════════════════════════════════════════════════════════════
// CLERK AUTH + USER MEMORY
// ════════════════════════════════════════════════════════════════

// ❗ Fill in your Clerk Publishable Key here after creating an app at https://clerk.com
const CLERK_PUBLISHABLE_KEY = 'pk_test_ZHJpdmVuLXRyb2xsLTI4LmNsZXJrLmFjY291bnRzLmRldiQ';

let currentUser = null;  // { uid, name, email, imageUrl }
let userMemory  = {};    // loaded from backend after login

let clerkInstance = null;

// ─────────────────────────────────────────────────
function hideAuthOverlay() {
  const o = document.getElementById('authOverlay');
  if (o) o.style.display = 'none';
}

function showAuthOverlay() {
  const o = document.getElementById('authOverlay');
  if (o) o.style.display = 'flex';
}

async function waitForClerk(ms = 15000) {
  const t = Date.now();
  // Wait for window.Clerk to exist AND be loaded
  while (true) {
    if (window.Clerk && !window.Clerk.loaded) {
      // Trigger initialization if it hasn't started
      try { await window.Clerk.load(); } catch (e) { /* ignore if already loading */ }
    }
    if (window.Clerk && window.Clerk.loaded) return;
    if (Date.now() - t > ms) throw new Error('timeout');
    await new Promise(r => setTimeout(r, 200));
  }
}

async function initClerk() {
  try {
    await waitForClerk();
  } catch (e) {
    console.warn('[Clerk] failed:', e.message);
    clerkInstance = null;
  }

  clerkInstance = window.Clerk;

  if (clerkInstance) {
    // Add listener to intercept login changes during redirect/session resumption
    clerkInstance.addListener(async (e) => {
      if (e.user) {
        hideAuthOverlay();
        await onUserSignedIn(e.user);
      } else {
        showAuthOverlay();
      }
    });

    // Check immediately if already logged in or session resumed early
    if (clerkInstance.user) {
      hideAuthOverlay();
      await onUserSignedIn(clerkInstance.user);
      return;
    }
  } else {
    // Show the choice overlay if Clerk completely failed and we have no fallback listener
    showAuthOverlay();
  }

  // ─ Sign In / Create Account button ─
  document.getElementById('clerkSignInBtn').onclick = () => {
    if (!clerkInstance) {
      // Clerk failed to load - show error, don't silently skip
      alert('Sign-in service failed to load. Please refresh the page and try again, or continue as Guest.');
      return;
    }
    // Hide the two buttons, show Clerk's embedded component
    document.getElementById('clerkSignInBtn').style.display = 'none';
    document.getElementById('guestModeBtn').style.display = 'none';
    const mount = document.getElementById('clerkMount');
    mount.style.display = 'block';
    clerkInstance.mountSignIn(mount);
  };

  // ─ Guest Mode button ─
  document.getElementById('guestModeBtn').onclick = () => {
    hideAuthOverlay();
    startGuestMode();
  };

  // Also listen for sign-in completion (e.g., after OAuth redirect)
  if (clerkInstance) {
    clerkInstance.addListener(({ user }) => {
      if (user && !currentUser) {
        hideAuthOverlay();
        onUserSignedIn(user);
      }
    });
  }
}

async function onUserSignedIn(user) {
  currentUser = {
    uid: user.id,
    name: user.fullName || user.firstName || 'Student',
    email: (user.emailAddresses[0] || {}).emailAddress || '',
    imageUrl: user.imageUrl || '',
    isGuest: false
  };
  try {
    const res = await fetch(`${API_BASE}/api/memory?uid=${encodeURIComponent(currentUser.uid)}`);
    userMemory = res.ok ? await res.json() : {};
  } catch (_) { userMemory = {}; }

  // New user = show quiz; returning user = go straight in
  const quizDone = userMemory.quiz && Object.keys(userMemory.quiz).length >= 5;
  if (!quizDone) {
    showQuiz();
  } else {
    renderUserBadge();
  }
}

function startGuestMode() {
  // Guest uid lives only in sessionStorage (cleared on tab close)
  let gid = sessionStorage.getItem('guestUid');
  if (!gid) {
    gid = 'guest_' + Math.random().toString(36).slice(2, 10);
    sessionStorage.setItem('guestUid', gid);
  }
  currentUser = { uid: gid, name: 'Guest', isGuest: true };
  userMemory = {};
  // Guests always see the quiz (fresh each tab)
  showQuiz();
  renderUserBadge();
}

// Helper for handling sign-out
async function handleSignOut() {
  if (clerkInstance) {
    try { await clerkInstance.signOut(); } catch (e) { console.error('Sign-out error:', e); }
  } else if (currentUser && currentUser.isGuest) {
    sessionStorage.removeItem('guestUid');
  }
  currentUser = null;
  userMemory = {};
  window.location.reload(); // Reload to show login screen
}

function renderUserBadge() {
  if (!currentUser) return;

  // Place badge inside the right toc-sidebar top container
  const container = document.getElementById('userBadgeContainer');
  if (!container) return;
  let badge = document.getElementById('userBadge');
  if (!badge) {
    badge = document.createElement('div');
    badge.id = 'userBadge';
    badge.style.cssText = 'display:flex;align-items:center;gap:8px;width:100%;';
    container.appendChild(badge);
  }

  // Extract a shorter specific code from uid (last 6 chars of the id)
  const shortUid = currentUser.uid.includes('_') ? currentUser.uid.split('_')[1].substring(0,6) : currentUser.uid.substring(currentUser.uid.length-6);

  if (currentUser.isGuest) {
    badge.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;">
        <div style="width:28px;height:28px;border-radius:50%;background:#94A3B8;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0">👤</div>
        <div style="display:flex;flex-direction:column;line-height:1.2;">
          <span style="font-size:13px;font-weight:600;color:#334155;">Guest</span>
          <span style="font-size:11px;color:#94A3B8;">UID: ${shortUid}</span>
        </div>
      </div>
      <button onclick="handleSignOut()" style="background:transparent;border:none;color:#EF4444;font-size:12px;font-weight:600;cursor:pointer;padding:4px;" title="End Session">Exit</button>
    `;
  } else {
    const av = currentUser.imageUrl
      ? `<img src="${currentUser.imageUrl}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;flex-shrink:0;border:1px solid #E2E8F0;"/>`
      : `<div style="width:28px;height:28px;border-radius:50%;background:#2563EB;color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0">${(currentUser.name[0]||'?').toUpperCase()}</div>`;

    badge.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;">
        ${av}
        <div style="display:flex;flex-direction:column;line-height:1.2;">
          <span style="font-size:13px;font-weight:600;color:#334155;max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${currentUser.name}</span>
          <span style="font-size:11px;color:#94A3B8;font-family:'DM Mono',monospace;">#${shortUid.toUpperCase()}</span>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:4px;align-items:flex-end;">
        <button onclick="handleSignOut()" style="background:transparent;border:none;color:#64748B;font-size:12px;font-weight:600;cursor:pointer;padding:2px 4px;" onmouseover="this.style.color='#EF4444'" onmouseout="this.style.color='#64748B'">Sign out</button>
        <button onclick="resetQuiz()" style="background:transparent;border:none;color:#94A3B8;font-size:11px;cursor:pointer;padding:2px 4px;white-space:nowrap;" onmouseover="this.style.color='#2563EB'" onmouseout="this.style.color='#94A3B8'" title="Reset learning preferences">⚙ Preferences</button>
      </div>
    `;
    badge.title = currentUser.email || currentUser.name;
  }
}

async function resetQuiz() {
  if (!currentUser) return;
  try {
    await fetch(`${API_BASE}/api/memory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid: currentUser.uid, quiz: {} })
    });
  } catch (_) {}
  quizAnswers = {};
  showQuiz();
}

// ──────────────────────────────
// QUIZ
// ──────────────────────────────
const QUIZ_QUESTIONS = [
  {
    key: 'goal',
    zh: '你对这门课的目标是？',
    en: "What's your goal for this course?",
    multi: false,
    options: [
      { value: 'just_pass',     zh: '考及格就行（C 及以上）😅', en: 'Just need to pass (C or above) 😅' },
      { value: 'solid_b',      zh: '争取 B / B+ 就好',            en: 'Aiming for a solid B / B+' },
      { value: 'going_for_a',  zh: '我要拿 A！真正弄懂它',         en: 'Going for an A — I want to really nail this' },
      { value: 'getting_ahead',zh: '提前预习，还没正式开课',        en: "Getting ahead — course hasn't started yet" }
    ]
  },
  {
    key: 'math',
    zh: '你的数学基础怎么样？',
    en: 'How is your math background?',
    multi: false,
    options: [
      { value: 'all_solid',    zh: '微积分、微分方程、复数都没问题',   en: 'Calculus, ODEs, and complex numbers — all solid' },
      { value: 'calculus_ok', zh: '微积分还行，微分方程 / 复数有点虚', en: 'Calculus OK, but ODEs / complex numbers are shaky' },
      { value: 'math_weak',   zh: '数学比较薄弱，公式能少用就少用',   en: 'Math is weak — fewer formulas, more intuition please' }
    ]
  },
  {
    key: 'timeline',
    zh: '距下次考试 / 用到这门课还有多久？',
    en: 'How much time do you have before your next exam or deadline?',
    multi: false,
    options: [
      { value: 'midterm_week', zh: '期中考试在 1 周内（急救模式）🚨', en: 'Midterm in < 1 week — URGENT 🚨' },
      { value: 'final_week',   zh: 'Final 在 1 周内（急救模式）🚨',   en: 'Final in < 1 week — URGENT 🚨' },
      { value: 'few_weeks',    zh: '还有几周，时间还够',              en: 'A few weeks away — still time' },
      { value: 'keeping_up',   zh: '我在跟课，还没到考试',            en: 'Just keeping up with lectures' },
      { value: 'self_study',   zh: '纯自学，没有考试压力',            en: 'Self-studying — no exam pressure' }
    ]
  },
  {
    key: 'style',
    zh: '怎么学你最容易进入状态？（可多选）',
    en: 'How do you learn best? (select all that apply)',
    multi: true,
    options: [
      { value: 'example_first',   zh: '先给我一个具体例子，我看一遍就懂',   en: 'Example first — show me one and I\'ll get it' },
      { value: 'principle_first', zh: '先把原理讲清楚，再用例子说明',       en: 'Principle first, then examples' },
      { value: 'visual',          zh: '图表和可视化对我帮助最大',            en: 'Visual learner — diagrams and sketches help me most' },
      { value: 'step_by_step',    zh: '需要一步一步带着我走，跳步我就跟不上', en: "Step-by-step — don't skip anything, I fall behind" }
    ]
  },
  {
    key: 'outcome',
    zh: '你希望每节学完后得到什么？（可多选）',
    en: 'What do you want to walk away with after each section? (select all that apply)',
    multi: true,
    options: [
      { value: 'one_liner',     zh: '一句话核心总结，记住最关键的点',     en: 'One-liner takeaway — the single most important idea' },
      { value: 'worked_example',zh: '例题 + 完整解题过程',               en: 'Worked example with full solution walkthrough' },
      { value: 'exam_cheatsheet',zh: '考点清单 + 高频考题提示',          en: 'Exam cheat-sheet — key facts and likely question types' },
      { value: 'formula_ref',   zh: '公式速查，直接能用',                en: 'Formula reference I can use right away' }
    ]
  }
];

let quizStep = 0;
let quizAnswers = {};

function showQuiz() {
  quizStep = 0;
  quizAnswers = {};
  const overlay = document.getElementById('quizOverlay');
  if (overlay) { overlay.style.display = 'flex'; }
  renderQuizStep();
}

function renderQuizStep() {
  const q = QUIZ_QUESTIONS[quizStep];
  const container = document.getElementById('quizSteps');
  const stepNum = document.getElementById('quizStepNum');
  const nextBtn = document.getElementById('quizNextBtn');
  if (!container || !q) return;
  if (stepNum) stepNum.textContent = quizStep + 1;
  if (nextBtn) {
    nextBtn.disabled = true;
    nextBtn.textContent = quizStep < QUIZ_QUESTIONS.length - 1 ? 'Next →' : 'Start Learning →';
  }

  container.innerHTML = `
    <div style="font-size:16px;font-weight:600;color:#0F172A;margin-bottom:20px;line-height:1.5;">
      ${q.en}
    </div>
    <div style="display:flex;flex-direction:column;gap:10px;">
      ${q.options.map(opt => `
        <button class="quiz-option" data-value="${opt.value}"
          style="text-align:left;padding:12px 18px;border:1.5px solid #E2E8F0;border-radius:12px;background:#fff;font-size:14px;color:#334155;cursor:pointer;transition:all 0.15s;font-family:inherit;">
          ${opt.en}
        </button>
      `).join('')}
    </div>
  `;

  // Init multi-select state
  if (q.multi && !Array.isArray(quizAnswers[q.key])) quizAnswers[q.key] = [];

  container.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (q.multi) {
        // Toggle selection
        const val = btn.dataset.value;
        const arr = quizAnswers[q.key];
        const idx = arr.indexOf(val);
        if (idx === -1) {
          arr.push(val);
          btn.style.borderColor = '#2563EB';
          btn.style.background = 'rgba(37,99,235,0.06)';
          btn.style.color = '#2563EB';
        } else {
          arr.splice(idx, 1);
          btn.style.borderColor = '#E2E8F0';
          btn.style.background = '#fff';
          btn.style.color = '#334155';
        }
        if (nextBtn) nextBtn.disabled = arr.length === 0;
      } else {
        container.querySelectorAll('.quiz-option').forEach(b => {
          b.style.borderColor = '#E2E8F0';
          b.style.background = '#fff';
          b.style.color = '#334155';
        });
        btn.style.borderColor = '#2563EB';
        btn.style.background = 'rgba(37,99,235,0.06)';
        btn.style.color = '#2563EB';
        quizAnswers[q.key] = btn.dataset.value;
        if (nextBtn) nextBtn.disabled = false;
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const nextBtn = document.getElementById('quizNextBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', async () => {
      quizStep++;
      if (quizStep < QUIZ_QUESTIONS.length) {
        renderQuizStep();
      } else {
        // Done: save quiz to backend
        const overlay = document.getElementById('quizOverlay');
        if (overlay) overlay.style.display = 'none';
        if (currentUser) {
          try {
            const res = await fetch(`${API_BASE}/api/memory`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ uid: currentUser.uid, quiz: quizAnswers })
            });
            const data = await res.json();
            userMemory = data.memory || userMemory;
            // Also persist quiz locally so profileOverride always works
            if (userMemory && userMemory.quiz) {
              localStorage.setItem('tutorQuiz', JSON.stringify(userMemory.quiz));
            }
          } catch (_) {}
        }
        renderUserBadge();
      }
    });
  }

  // Always try Clerk if key is set
  initClerk();
});

function fallbackLocalUid() {
  // No Clerk available - use persistent localStorage uid
  const uid = localStorage.getItem('tutorUid') || (() => {
    const id = 'local_' + Math.random().toString(36).slice(2, 10);
    localStorage.setItem('tutorUid', id);
    return id;
  })();
  currentUser = { uid, name: 'You', isGuest: false };
  fetch(`${API_BASE}/api/memory?uid=${encodeURIComponent(uid)}`)
    .then(r => r.ok ? r.json() : {})
    .then(mem => {
      userMemory = mem || {};
      // Fallback: if server doesn't have quiz, restore from localStorage
      if (!userMemory.quiz) {
        const saved = localStorage.getItem('tutorQuiz');
        if (saved) try { userMemory.quiz = JSON.parse(saved); } catch (_) {}
      } else {
        // Keep localStorage in sync
        localStorage.setItem('tutorQuiz', JSON.stringify(userMemory.quiz));
      }
      const quizDone = userMemory.quiz && Object.keys(userMemory.quiz).length >= 5;
      if (!quizDone) showQuiz(); else renderUserBadge();
    })
    .catch(() => showQuiz());
}

// Helper: get current uid for API calls
function getUid() {
  return currentUser ? currentUser.uid : null;
}

// Save a session summary after lesson load
async function saveSessionSummary(summary) {
  const uid = getUid();
  if (!uid || !summary) return;
  try {
    await fetch(`${API_BASE}/api/memory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid, sessionSummary: summary })
    });
  } catch (_) {}
}

// ── Language Toggle ──────────────────────────────────────────────────────────
let currentBook = 'new'; // always 3rd Ed

document.addEventListener('DOMContentLoaded', () => {
  // Book toggle
  const bookBtn = document.getElementById('bookToggleBtn');
  if (bookBtn) {
    bookBtn.addEventListener('click', () => {
      setBook(currentBook === 'new' ? 'old' : 'new');
    });
  }
  setBook(currentBook); // init button state
});

const welcomeScreen = document.getElementById('welcomeScreen');
const answerScreen  = document.getElementById('answerScreen');
const learnView     = document.getElementById('learnView');
const topbar        = document.getElementById('topbar');
const topbarBreadcrumb = document.getElementById('topbarBreadcrumb');
const tocNav        = document.getElementById('tocNav');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// ── Attachment state ────────────────────────────────────────
// Each entry: { type: 'image'|'pdf', name, dataUrl, mimeType, pdfText? }
let attachmentsMain = [];
let attachmentsFollowup = [];
let attachmentsLearn = [];
const MAX_ATTACH_SIZE = 20 * 1024 * 1024; // 20MB

function getAttachContext(inputEl) {
  if (inputEl === userInput) return { list: attachmentsMain, previewId: 'attachPreviewMain', dropTarget: document.getElementById('searchBox') };
  if (inputEl && inputEl.id === 'learnFollowupInput') return { list: attachmentsLearn, previewId: 'attachPreviewLearn', dropTarget: document.getElementById('learnFollowupBar') };
  return { list: attachmentsFollowup, previewId: 'attachPreviewFollowup', dropTarget: document.getElementById('followupBar') };
}

function renderAttachPreview(list, previewId) {
  const container = document.getElementById(previewId);
  if (!container) return;
  container.innerHTML = '';
  list.forEach((att, idx) => {
    const chip = document.createElement('div');
    chip.className = 'attach-chip';
    if (att.type === 'image') {
      chip.innerHTML = `<img src="${att.dataUrl}" alt=""><span class="attach-chip-name">${att.name}</span><button class="attach-chip-remove" data-idx="${idx}">×</button>`;
    } else {
      chip.innerHTML = `<span style="font-size:16px">📄</span><span class="attach-chip-name">${att.name}</span><button class="attach-chip-remove" data-idx="${idx}">×</button>`;
    }
    chip.querySelector('.attach-chip-remove').addEventListener('click', () => {
      list.splice(idx, 1);
      renderAttachPreview(list, previewId);
    });
    container.appendChild(chip);
  });
}

async function processFile(file, list, previewId) {
  if (file.size > MAX_ATTACH_SIZE) {
    alert(`File too large (max 20MB): ${file.name}`);
    return;
  }
  if (file.type.startsWith('image/')) {
    const dataUrl = await readAsDataUrl(file);
    list.push({ type: 'image', name: file.name, dataUrl, mimeType: file.type });
    renderAttachPreview(list, previewId);
  } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
    const dataUrl = await readAsDataUrl(file);
    list.push({ type: 'pdf', name: file.name, dataUrl, mimeType: 'application/pdf' });
    renderAttachPreview(list, previewId);
  } else {
    alert(`Unsupported file type: ${file.name}`);
  }
}

function readAsDataUrl(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

function setupAttachBtn(btnId, fileInputId, inputEl) {
  const btn = document.getElementById(btnId);
  const fileInput = document.getElementById(fileInputId);
  if (!btn || !fileInput) return;
  btn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', async () => {
    const { list, previewId } = getAttachContext(inputEl);
    for (const f of Array.from(fileInput.files)) await processFile(f, list, previewId);
    fileInput.value = '';
  });
}

function setupDragDrop(dropTargetEl, inputEl) {
  if (!dropTargetEl) return;
  dropTargetEl.addEventListener('dragover', e => {
    e.preventDefault();
    dropTargetEl.classList.add('drag-over');
  });
  dropTargetEl.addEventListener('dragleave', e => {
    if (!dropTargetEl.contains(e.relatedTarget)) dropTargetEl.classList.remove('drag-over');
  });
  dropTargetEl.addEventListener('drop', async e => {
    e.preventDefault();
    dropTargetEl.classList.remove('drag-over');
    const { list, previewId } = getAttachContext(inputEl);
    for (const f of Array.from(e.dataTransfer.files)) await processFile(f, list, previewId);
  });
}

function setupPaste(inputEl) {
  inputEl.addEventListener('paste', async e => {
    const { list, previewId } = getAttachContext(inputEl);
    for (const item of Array.from(e.clipboardData.items)) {
      if (item.type.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) await processFile(new File([file], `pasted-image.png`, { type: file.type }), list, previewId);
      }
    }
  });
}
const quickChips = document.getElementById('quickChips');
const backBtn = document.getElementById('backBtn');
const questionLabel = document.getElementById('questionLabel') || { textContent: '' };
const answerStatus = document.getElementById('answerStatus');

const stepsBar = document.getElementById('stepsBar');
const answerContent = document.getElementById('answerContent');
const answerScroll = document.getElementById('answerScroll');

const bookPagesContainer = document.getElementById('bookPagesContainer') || { innerHTML: '' };
const bookPanelMeta = document.getElementById('bookPanelMeta') || { textContent: '' };

const sourcesSection = document.getElementById('sourcesSection');
const bookSourcesRail = document.getElementById('bookSourcesRail') || { innerHTML: '' };
const webSourcesRail = document.getElementById('webSourcesRail');
const bookSourcesCount = document.getElementById('bookSourcesCount') || { textContent: '' };
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

// ═══════════════════════════════════════════════════════════
// PRE-GENERATED SECTION PREVIEWS (Background + Chapter 1)
// No API call needed - instant display on click
// ═══════════════════════════════════════════════════════════
const SECTION_PREVIEWS = {
  // ── Background ──────────────────────────────────────────
  'B.1 Complex Numbers': { emoji: '🔢', refs: 3,
    zh: '复数是信号处理的核心语言。这一节介绍虚数单位 j、代数运算、极坐标与直角坐标互转,以及共轭与模长。掌握后,你能看懂绝大多数公式中的 e^jω。',
    en: 'Complex numbers are the language of signal processing. This section covers the imaginary unit j, algebraic operations, polar ↔ rectangular conversion, conjugates, and magnitude - the foundation for understanding e^jω in any formula.'
  },
  'B.1-1 A Historical Note': { emoji: '📜', refs: 1,
    zh: '复数的诞生并非一帆风顺--这段历史讲述数学家们如何被迫接受"不存在"的数,并最终发现它是解方程与工程分析不可缺少的工具。',
    en: 'Complex numbers were not accepted overnight. This section traces how mathematicians were forced to embrace "impossible" numbers, ultimately making them indispensable for solving equations and engineering analysis.'
  },
  'B.1-2 Algebra of Complex Numbers': { emoji: '➕', refs: 2,
    zh: '加减乘除、共轭、取模、辐角--本节系统练习复数四则运算,并在直角坐标与极坐标之间自如转换,是后续一切运算的基础。',
    en: 'Add, subtract, multiply, divide, conjugate, modulus, argument - this section drills complex arithmetic in both rectangular and polar form, the foundation for all subsequent operations.'
  },
  'B.2 Sinusoids': { emoji: '〰️', refs: 4,
    zh: '正弦信号是工程中最基础的信号。这节讲振幅、频率、相位,以及多个同频正弦信号叠加的化简技巧。',
    en: 'Sinusoids are the most fundamental signal in engineering. This section covers amplitude, frequency, phase, and how to combine multiple same-frequency sinusoids into one.'
  },
  'B.2-1 Addition of Sinusoids': { emoji: '🎵', refs: 2,
    zh: '两个或多个同频正弦信号相加时,结果仍是同频正弦信号。本节介绍如何利用复数/相量法快速求合成后的振幅与相位--考试必考技能。',
    en: 'The sum of same-frequency sinusoids is still a sinusoid. This section shows how to use phasors / complex numbers to quickly find the resulting amplitude and phase - a must-know exam skill.'
  },
  'B.3 Sketching Signals': { emoji: '📈', refs: 3,
    zh: '学会快速画出信号波形是分析的基本功。本节介绍单调指数信号(增长与衰减)和指数调幅正弦信号的草图画法,帮你建立直觉。',
    en: 'Being able to sketch signal waveforms quickly is a core skill. This section covers monotonic exponentials (growth and decay) and exponentially modulated sinusoids - essential for reading and drawing time-domain plots.'
  },
  'B.3-1 Monotonic Exponentials': { emoji: '📉', refs: 2,
    zh: 'e^(at) 是系统响应中最常出现的函数。本节练习根据 a 的正负、大小快速判断曲线形状,并在坐标系上准确勾勒出来。',
    en: 'e^(at) appears constantly in system responses. This section trains you to sketch growth or decay curves by reading the sign and magnitude of a - quickly and accurately.'
  },
  'B.3-2 The Exponentially Varying Sinusoid': { emoji: '🌊', refs: 2,
    zh: '指数调幅正弦信号形如 e^(at)cos(ωt),是电路暂态响应的核心形态。本节讲解如何根据衰减包络和振荡频率快速画出草图。',
    en: 'The signal e^(at)cos(ωt) appears in transient circuit responses. This section teaches you to sketch it quickly using its exponential envelope and oscillation frequency.'
  },
  "B.4 Cramer's Rule": { emoji: '🔣', refs: 2,
    zh: '克拉默法则用行列式求解线性方程组,在电路节点分析和系统方程中常用。本节帮你快速掌握这个工具,让联立方程不再是障碍。',
    en: "Cramer's Rule solves linear systems using determinants - widely used in circuit node analysis. This section gives you a fast, reliable method to tackle simultaneous equations."
  },
  'B.5 Partial Fraction Expansion': { emoji: '➗', refs: 6,
    zh: '部分分式展开是拉普拉斯逆变换的核心工具。本节系统讲解待定系数法、Heaviside 覆盖法、复数根与重复根,是后续章节的必备基础。',
    en: 'Partial fraction expansion is essential for inverse Laplace transforms. This section covers the method of clearing fractions, Heaviside cover-up, complex roots, and repeated roots - prerequisite for later chapters.'
  },
  'B.5-1 Method of Clearing Fractions': { emoji: '🔧', refs: 1,
    zh: '通过两边同乘分母,将有理函数化为多项式方程后比较系数,求出各项系数。这是最基础、最通用的方法。',
    en: 'Multiply both sides by the denominator to convert to a polynomial equation and match coefficients. This is the most general approach for any partial fraction problem.'
  },
  'B.5-2 Heaviside Cover-Up Method': { emoji: '🎩', refs: 1,
    zh: '覆盖法:直接用极点值代入,遮住对应因子后求残差。对单极点情形速度极快,考场首选。',
    en: 'Cover-up method: substitute each pole value directly, covering the corresponding factor to find its residue. Extremely fast for simple poles - the go-to exam technique.'
  },
  'B.5-3 Complex and Repeated Roots': { emoji: '🌀', refs: 1,
    zh: '当极点为复数或重复极点时,展开方式有所不同。本节讲清楚对应的系数公式和求解技巧,避免考试踩坑。',
    en: 'When poles are complex or repeated, the expansion requires different formulas. This section explains the correct techniques for both cases to avoid common exam mistakes.'
  },
  'B.5-4 Hybrid Method': { emoji: '🔀', refs: 1,
    zh: '混合法将覆盖法与待定系数法结合,处理混有不同类型极点的复杂分式,兼顾速度与准确性。',
    en: 'The hybrid method combines cover-up and coefficient matching to handle fractions with mixed pole types - balancing speed and accuracy for complex problems.'
  },
  'B.5-5 Improper F(x) with m=n': { emoji: '⚠️', refs: 1,
    zh: '当分子次数等于分母次数(m=n)时,需要先做多项式除法提取整式部分,再对余式做部分分式展开。',
    en: 'When the numerator degree equals the denominator degree (m=n), perform polynomial long division first to extract the integer part before expanding the remainder.'
  },
  'B.5-6 Modified Partial Fractions': { emoji: '🛠️', refs: 1,
    zh: '改进的部分分式方法处理一些特殊结构,使后续反变换更加便捷,常出现在系统分析题目的最后一步。',
    en: 'Modified partial fractions handle special structures to make the subsequent inverse transform easier - often the final step in system analysis problems.'
  },
  'B.6 Vectors and Matrices': { emoji: '🧮', refs: 5,
    zh: '矩阵和向量贯穿整个系统分析。本节覆盖矩阵定义、运算、转置、特征方程,以及矩阵指数与矩阵幂,为状态空间分析奠定基础。',
    en: 'Matrices and vectors permeate system analysis. This section covers definitions, operations, transpose, characteristic equations, and matrix exponentials/powers - the foundation for state-space analysis.'
  },
  'B.6-1 Some Definitions and Properties': { emoji: '📋', refs: 1,
    zh: '行向量、列向量、方阵、零矩阵、单位矩阵......建立矩阵运算的基本词汇表,后续所有内容的出发点。',
    en: 'Row vectors, column vectors, square matrices, zero matrix, identity matrix - build the vocabulary for matrix operations. Everything else starts here.'
  },
  'B.6-2 Matrix Algebra': { emoji: '✖️', refs: 1,
    zh: '矩阵加法、数乘、矩阵乘法、逆矩阵的求法与条件。重点理解矩阵乘法不满足交换律,以及逆矩阵的存在条件。',
    en: 'Addition, scalar multiplication, matrix multiplication, and matrix inversion. Key insight: matrix multiplication is not commutative, and inverses exist only under specific conditions.'
  },
  'B.6-3 Derivatives and Integrals of a Matrix': { emoji: '∂', refs: 1,
    zh: '对矩阵逐元素求导或积分,在状态方程的推导和解法中经常用到。本节明确运算规则并给出实例。',
    en: 'Element-wise differentiation and integration of matrices appear frequently in deriving and solving state equations. This section defines the rules with concrete examples.'
  },
  'B.6-4 The Characteristic Equation of a Matrix': { emoji: '🎯', refs: 1,
    zh: '特征方程 det(λI - A) = 0 的根就是特征值,决定了系统的固有频率与稳定性。本节从定义出发,手把手推导求解方法。',
    en: 'The roots of det(λI - A) = 0 are the eigenvalues, which determine the natural frequencies and stability of a system. This section derives and solves the characteristic equation step by step.'
  },
  'B.6-5 Computation of Exponential and Power of a Matrix': { emoji: '🔋', refs: 1,
    zh: '矩阵指数 e^(At) 是线性系统时域解的核心。本节介绍利用特征值分解计算矩阵指数与矩阵幂的方法。',
    en: 'The matrix exponential e^(At) is central to the time-domain solution of linear systems. This section shows how to compute it using eigenvalue decomposition.'
  },
  'B.7 Miscellaneous': { emoji: '🔍', refs: 2,
    zh: "本节收录实用但零散的数学工具,重点是 L'Hôpital 法则--处理极限中的 0/0 或 ∞/∞ 不定型,在频率响应分析中非常有用。",
    en: "This section collects handy math tools, with emphasis on L'Hôpital's Rule for resolving 0/0 or ∞/∞ indeterminate limits - frequently needed in frequency response analysis."
  },
  "B.7-1 L'Hôpital's Rule": { emoji: '📉', refs: 2,
    zh: "当极限出现不定型时,L'Hôpital 法则允许对分子分母分别求导后再取极限。本节通过例题讲清楚适用条件与使用步骤。",
    en: "When a limit yields an indeterminate form, L'Hôpital's Rule lets you differentiate numerator and denominator separately before taking the limit. This section clarifies when and how to apply it."
  },

  // ── Chapter 1 ────────────────────────────────────────────
  '1.1 Size of a Signal': { emoji: '📏', refs: 3,
    zh: '如何衡量一个信号有多"大"?本节引入信号能量和信号功率的定义,区分能量信号与功率信号,是所有后续分析的起点。',
    en: 'How do you measure how "big" a signal is? This section defines signal energy and power, distinguishes energy signals from power signals - the starting point for all subsequent analysis.'
  },
  '1.2 Classification of Signals': { emoji: '🗂️', refs: 5,
    zh: '连续时间 vs 离散时间、模拟 vs 数字、周期 vs 非周期、能量 vs 功率、确定性 vs 随机--这节逐一澄清五大分类维度,建立你的信号分类框架。',
    en: 'Continuous-time vs discrete-time, analog vs digital, periodic vs aperiodic, energy vs power, deterministic vs random - this section clarifies all five classification dimensions and builds your signal taxonomy.'
  },
  '1.2-1 Continuous-Time and Discrete-Time Signals': { emoji: '⏱️', refs: 1,
    zh: '连续时间信号在每一个时刻都有定义;离散时间信号只在整数时刻有值。两者的数学表示和运算规则各有不同。',
    en: 'Continuous-time signals are defined at every instant; discrete-time signals exist only at integer time steps. Their representations and operations differ fundamentally.'
  },
  '1.2-2 Analog and Digital Signals': { emoji: '🔌', refs: 1,
    zh: '模拟信号幅度连续,数字信号幅度量化为有限个离散值。这对概念与连续/离散时间相互独立,理解它们的区别避免混淆。',
    en: 'Analog signals have continuous amplitude; digital signals have quantized amplitude. This distinction is independent of continuous/discrete time - understanding both avoids confusion.'
  },
  '1.2-3 Periodic and Aperiodic Signals': { emoji: '🔁', refs: 1,
    zh: '周期信号以固定周期 T 无限重复,非周期信号则不然。判断信号是否周期性是傅里叶分析的第一步。',
    en: 'Periodic signals repeat with a fixed period T; aperiodic signals do not. Determining periodicity is the first step in Fourier analysis.'
  },
  '1.2-4 Energy and Power Signals': { emoji: '⚡', refs: 1,
    zh: '有限能量、零平均功率的信号称为能量信号;有限平均功率、无限能量的称为功率信号。两类信号的数学工具不同。',
    en: 'Finite energy, zero average power → energy signal; finite average power, infinite energy → power signal. Each class uses different mathematical tools in analysis.'
  },
  '1.2-5 Deterministic and Random Signals': { emoji: '🎲', refs: 1,
    zh: '确定性信号可以用精确的数学表达式描述;随机信号需要用概率统计来刻画。本节只简要介绍概念,随机信号在更高级的课程中深入讨论。',
    en: 'Deterministic signals can be described by exact mathematical expressions; random signals require probability and statistics. This section introduces the concept briefly - random signals are covered in depth in advanced courses.'
  },
  '1.3 Some Useful Signal Operations': { emoji: '⚙️', refs: 4,
    zh: '时间平移(延迟/超前)、时间尺度变换(压缩/拉伸)、时间反转,以及这些操作的组合顺序--掌握这些,你能看懂任何时域图形变换题。',
    en: 'Time shifting (delay/advance), time scaling (compress/stretch), time reversal, and their combined order - master these to solve any time-domain waveform transformation problem.'
  },
  '1.3-1 Time Shifting': { emoji: '⏩', refs: 1,
    zh: '将信号 x(t) 替换为 x(t-t0) 得到延迟信号,x(t+t0) 得到超前信号。本节用图示清楚说明正负方向的直觉。',
    en: 'Replacing x(t) with x(t-t0) delays the signal; x(t+t0) advances it. This section uses diagrams to build clear intuition for the direction of shift.'
  },
  '1.3-2 Time Scaling': { emoji: '🔍', refs: 1,
    zh: 'x(at) 当 a>1 时信号在时间轴上压缩,0<a<1 时拉伸。本节练习快速判断压缩/拉伸方向和比例。',
    en: 'x(at) compresses the signal when a>1, stretches it when 0<a<1. This section drills quick identification of direction and ratio of scaling.'
  },
  '1.3-3 Time Inversion (Time Reversal)': { emoji: '↩️', refs: 1,
    zh: 'x(-t) 是 x(t) 关于纵轴的镜像翻转,也称时间反转。这是卷积运算中常需要的基本操作。',
    en: 'x(-t) is the mirror image of x(t) about the vertical axis - also called time reversal. This operation appears frequently in convolution computations.'
  },
  '1.3-4 Combined Operations': { emoji: '🔄', refs: 1,
    zh: '当多种操作组合时,顺序至关重要:先平移后缩放与先缩放后平移的结果不同。本节通过例题讲清楚正确的操作顺序。',
    en: 'Order matters when combining operations: shift-then-scale gives a different result from scale-then-shift. This section uses worked examples to clarify the correct sequence.'
  },
  '1.4 Some Useful Signal Models': { emoji: '📐', refs: 4,
    zh: '单位阶跃 u(t)、单位冲激 δ(t)、斜坡函数、矩形脉冲......这些"理想信号"是所有系统分析的基本积木,本节讲清楚它们的定义与相互关系。',
    en: 'Unit step u(t), unit impulse δ(t), ramp function, rectangular pulse - these idealized signals are the building blocks of all system analysis. This section defines them and explains their relationships.'
  },
  '1.5 Even and Odd Functions': { emoji: '⚖️', refs: 3,
    zh: '任何信号都能唯一分解为偶分量和奇分量之和。本节讲解性质、乘积规则,以及如何把任意信号拆成 Even + Odd,这在傅里叶分析中极为有用。',
    en: 'Any signal can be uniquely decomposed into even and odd parts. This section covers properties, product rules, and how to split any signal - a technique heavily used in Fourier analysis.'
  },
  '1.5-1 Some Properties of Even and Odd Functions': { emoji: '🔵', refs: 1,
    zh: '偶函数乘偶函数得偶函数;奇函数乘奇函数得偶函数;偶×奇得奇函数。这些乘积规则在化简积分时非常省力。',
    en: 'Even × even = even; odd × odd = even; even × odd = odd. These product rules greatly simplify integrals and are essential for Fourier series calculations.'
  },
  '1.5-2 Even and Odd Components of a Signal': { emoji: '⚔️', refs: 1,
    zh: '任意信号 x(t) 的偶分量为 [x(t)+x(-t)]/2,奇分量为 [x(t)-x(-t)]/2。本节通过例题练习分解与重组。',
    en: 'The even part of x(t) is [x(t)+x(-t)]/2 and the odd part is [x(t)-x(-t)]/2. This section practices decomposition and reconstruction with worked examples.'
  },
  '1.6 Systems': { emoji: '📦', refs: 2,
    zh: '系统就是对信号进行处理的"黑箱"。本节引入系统的基本概念与数学描述,说明输入-输出关系的含义,是后续所有系统分类和分析的出发点。',
    en: 'A system is a "black box" that processes signals. This section introduces the fundamental concept and mathematical description of systems - the starting point for all classification and analysis.'
  },
  '1.7 Classification of Systems': { emoji: '🔬', refs: 7,
    zh: '线性 vs 非线性、时不变 vs 时变、即时 vs 动态、因果 vs 非因果、集总 vs 分布参数......考试高频考点全在这一节,帮你建立清晰的判断标准。',
    en: 'Linear vs nonlinear, time-invariant vs time-varying, instantaneous vs dynamic, causal vs noncausal, lumped vs distributed - all high-frequency exam topics are here. Build clear criteria for each classification.'
  },
  '1.7-1 Linear and Nonlinear Systems': { emoji: '📊', refs: 1,
    zh: '线性系统满足叠加原理:齐次性(缩放输入)和可加性(多个输入叠加)。这是后续所有分析方法成立的根本前提。',
    en: 'A linear system obeys superposition: homogeneity (scaling the input) and additivity (summing inputs). This is the fundamental assumption behind all subsequent analysis methods.'
  },
  '1.7-2 Time-Invariant and Time-Varying Parameter Systems': { emoji: '🕐', refs: 1,
    zh: '时不变系统的响应不随时间平移而改变:输入延迟 t0,输出也同样延迟 t0。时变系统的参数随时间变化,分析更为复杂。',
    en: 'A time-invariant system: delaying the input by t0 delays the output by t0. Time-varying systems have parameters that change with time, making analysis significantly more complex.'
  },
  '1.7-3 Instantaneous and Dynamic Systems': { emoji: '⚡', refs: 1,
    zh: '即时系统(无记忆系统)的当前输出只取决于当前输入;动态系统(有记忆系统)的输出还取决于过去的输入或状态。',
    en: 'Instantaneous (memoryless) systems: output depends only on the current input. Dynamic (memory) systems: output also depends on past inputs or stored state.'
  },
  '1.7-4 Causal and Noncausal Systems': { emoji: '⏱️', refs: 1,
    zh: '因果系统的输出不会早于输入出现,符合物理实现的因果律。非因果系统在理论分析中有用,但不能直接实时实现。',
    en: 'Causal systems produce no output before the input occurs - physically realizable. Noncausal systems are useful in theory but cannot be implemented in real-time.'
  },
  '1.7-5 Lumped-Parameter and Distributed-Parameter Systems': { emoji: '🔌', refs: 1,
    zh: '集总参数系统用常微分方程描述(如 RLC 电路);分布参数系统用偏微分方程描述(如传输线)。本节简要说明二者的适用边界。',
    en: 'Lumped-parameter systems are described by ordinary differential equations (e.g. RLC circuits); distributed-parameter systems by partial differential equations (e.g. transmission lines). This section clarifies when each applies.'
  },
  '1.7-6 Continuous-Time and Discrete-Time Systems': { emoji: '📡', refs: 1,
    zh: '连续时间系统处理连续信号,用微分方程描述;离散时间系统处理序列,用差分方程描述。数字信号处理是离散时间系统的典型应用。',
    en: 'Continuous-time systems process continuous signals (described by differential equations); discrete-time systems process sequences (described by difference equations). Digital signal processing is a prime example.'
  },
  '1.7-7 Analog and Digital Systems': { emoji: '💾', refs: 1,
    zh: '模拟系统处理连续幅度信号;数字系统处理量化信号。现代工程中两者往往通过 ADC/DAC 相互转换,协同工作。',
    en: 'Analog systems handle continuously-valued signals; digital systems handle quantized signals. In modern engineering, both coexist and interact through ADC/DAC converters.'
  },
  '1.8 System Model: Input-Output Description': { emoji: '🔄', refs: 3,
    zh: '输入-输出(外部)描述从整体视角建模,不关注内部结构,只看信号进出的关系。本节还对比了内部描述(状态空间)的概念与适用场景。',
    en: 'The input-output (external) description models the system from a black-box perspective, focusing only on the relationship between inputs and outputs. This section also introduces the internal (state-space) description.'
  },
  '1.8-1 Internal and External Descriptions of a System': { emoji: '🏗️', refs: 2,
    zh: '外部描述(传递函数)适合 LTI 系统;内部描述(状态方程)适合更一般的情形。理解两者的联系与取舍是系统建模的核心能力。',
    en: 'External description (transfer function) suits LTI systems; internal description (state equations) handles more general cases. Understanding their relationship is the core competency of system modeling.'
  },
  '1.9 Summary': { emoji: '📝', refs: 2,
    zh: '第一章精华回顾:信号的分类与运算、系统概念与七大分类维度、常用信号模型。考前 5 分钟必刷,把整章知识串联一遍。',
    en: "Chapter 1 recap: signal classification and operations, the concept of systems and all seven classification dimensions, useful signal models. A must-read 5-minute review before exams."
  }
};


// ── SECTION_PREVIEWS_NEW (auto-generated) ──
const SECTION_PREVIEWS_NEW = {
  "1.1 Size of a Signal": {
    "en": "Signal energy and power are the fundamental metrics for measuring how 'big' a signal really is—not in amplitude, but in total content. These normalized measures (based on a 1-ohm load) become essential tools for comparing signals, analyzing approximation errors, and understanding signal-to-noise ratios on exams.",
    "zh": "信号能量和功率是衡量信号\"大小\"的基本指标——不是振幅，而是总体内容。这些归一化度量（基于1欧姆负载）成为比较信号、分析近似误差和理解信噪比的必要工具。",
    "emoji": "⚡",
    "refs": 8
  },
  "1.1": {
    "en": "Signal energy and power are the fundamental metrics for measuring how 'big' a signal really is—not in amplitude, but in total content. These normalized measures (based on a 1-ohm load) become essential tools for comparing signals, analyzing approximation errors, and understanding signal-to-noise ratios on exams.",
    "zh": "信号能量和功率是衡量信号\"大小\"的基本指标——不是振幅，而是总体内容。这些归一化度量（基于1欧姆负载）成为比较信号、分析近似误差和理解信噪比的必要工具。",
    "emoji": "⚡",
    "refs": 8
  },
  "1.1-2 Size of a Signal": {
    "en": "Signal energy and power are the fundamental metrics for quantifying how 'big' a signal really is. Energy (the integral of squared magnitude) works perfectly for signals that die out, while power (time-averaged energy) handles signals that persist forever—and you'll need to know which one applies to pass any exam problem involving signal classification.",
    "zh": "信号能量和功率是量化信号\"大小\"的基本指标。能量（幅度平方的积分）适用于衰减的信号，而功率（能量的时间平均）则用于永不衰减的信号——在任何涉及信号分类的考试题中，你都需要知道何时使用哪一个。",
    "emoji": "📏",
    "refs": 1
  },
  "1.1-2": {
    "en": "Signal energy and power are the fundamental metrics for quantifying how 'big' a signal really is. Energy (the integral of squared magnitude) works perfectly for signals that die out, while power (time-averaged energy) handles signals that persist forever—and you'll need to know which one applies to pass any exam problem involving signal classification.",
    "zh": "信号能量和功率是量化信号\"大小\"的基本指标。能量（幅度平方的积分）适用于衰减的信号，而功率（能量的时间平均）则用于永不衰减的信号——在任何涉及信号分类的考试题中，你都需要知道何时使用哪一个。",
    "emoji": "📏",
    "refs": 1
  },
  "1.10 Internal Description: The State-Space Description": {
    "en": "State-space descriptions capture the internal dynamics of a system by tracking key variables (like capacitor voltages and inductor currents) from which all other signals can be reconstructed. This internal view is essential for understanding system behavior, designing controllers, and identifying whether a system is truly controllable and observable—properties that determine if you can actually steer and measure what matters.",
    "zh": "状态空间描述通过跟踪系统的关键变量（如电容器电压和电感器电流）来捕捉系统的内部动态，所有其他信号都可以从这些变量重构出来。这种内部视角对于理解系统行为、设计控制器以及识别系统是否真正可控和可观测至关重要——这些性质决定了你是否能够真正控制和测量重要的量。",
    "emoji": "⚙️",
    "refs": 3
  },
  "1.10": {
    "en": "State-space descriptions capture the internal dynamics of a system by tracking key variables (like capacitor voltages and inductor currents) from which all other signals can be reconstructed. This internal view is essential for understanding system behavior, designing controllers, and identifying whether a system is truly controllable and observable—properties that determine if you can actually steer and measure what matters.",
    "zh": "状态空间描述通过跟踪系统的关键变量（如电容器电压和电感器电流）来捕捉系统的内部动态，所有其他信号都可以从这些变量重构出来。这种内部视角对于理解系统行为、设计控制器以及识别系统是否真正可控和可观测至关重要——这些性质决定了你是否能够真正控制和测量重要的量。",
    "emoji": "⚙️",
    "refs": 3
  },
  "1.10-2 Signals and Systems - Problems": {
    "en": "These problems push you to translate real circuits and mechanical systems into state-variable form—the language that makes higher-order systems solvable. You'll practice identifying which voltages and currents matter as states, then writing the differential equations that govern them, skills that show up constantly on exams and in system modeling.",
    "zh": "这些题目要求你将实际电路和机械系统转化为状态变量形式——这是求解高阶系统的关键语言。你将练习识别哪些电压和电流作为状态变量，然后写出控制它们的微分方程，这些技能在考试和系统建模中频繁出现。",
    "emoji": "⚙️",
    "refs": 1
  },
  "1.10-2": {
    "en": "These problems push you to translate real circuits and mechanical systems into state-variable form—the language that makes higher-order systems solvable. You'll practice identifying which voltages and currents matter as states, then writing the differential equations that govern them, skills that show up constantly on exams and in system modeling.",
    "zh": "这些题目要求你将实际电路和机械系统转化为状态变量形式——这是求解高阶系统的关键语言。你将练习识别哪些电压和电流作为状态变量，然后写出控制它们的微分方程，这些技能在考试和系统建模中频繁出现。",
    "emoji": "⚙️",
    "refs": 1
  },
  "1.11 MATLAB: Working with Functions": {
    "en": "Plotting oscillatory functions in MATLAB requires more finesse than you might think—too few sample points and your beautiful cosine wave becomes a jagged mess. This section shows why choosing the right sampling density (typically 100 points per oscillation) is essential for capturing fast-changing signals accurately, and introduces practical MATLAB commands like anonymous functions and axis formatting to make your plots publication-ready.",
    "zh": "在MATLAB中绘制振荡函数需要比你想象的更多技巧——样本点太少，你的余弦波就会变成锯齿状的混乱。本节展示为什么选择正确的采样密度（通常每个振荡100个点）对于准确捕捉快速变化的信号至关重要，并介绍实用的MATLAB命令（如匿名函数和坐标轴格式化）来使你的图表达到出版质量。",
    "emoji": "📈",
    "refs": 2
  },
  "1.11": {
    "en": "Plotting oscillatory functions in MATLAB requires more finesse than you might think—too few sample points and your beautiful cosine wave becomes a jagged mess. This section shows why choosing the right sampling density (typically 100 points per oscillation) is essential for capturing fast-changing signals accurately, and introduces practical MATLAB commands like anonymous functions and axis formatting to make your plots publication-ready.",
    "zh": "在MATLAB中绘制振荡函数需要比你想象的更多技巧——样本点太少，你的余弦波就会变成锯齿状的混乱。本节展示为什么选择正确的采样密度（通常每个振荡100个点）对于准确捕捉快速变化的信号至关重要，并介绍实用的MATLAB命令（如匿名函数和坐标轴格式化）来使你的图表达到出版质量。",
    "emoji": "📈",
    "refs": 2
  },
  "1.11-1 Anonymous Functions": {
    "en": "Anonymous functions let you define mathematical expressions on the fly in MATLAB without creating separate files—perfect for quickly testing exponentially damped sinusoids and other signals you'll encounter in homework and exams. The @ symbol syntax makes it easy to evaluate your function at any input, whether a single point or an entire vector for plotting.",
    "zh": "匿名函数让你在MATLAB中快速定义数学表达式，无需创建单独的文件——非常适合快速测试指数衰减正弦波和其他信号处理中常见的信号。使用@符号语法可以轻松在任意输入点（单个点或整个向量）处计算函数值，便于绘图。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.11-1": {
    "en": "Anonymous functions let you define mathematical expressions on the fly in MATLAB without creating separate files—perfect for quickly testing exponentially damped sinusoids and other signals you'll encounter in homework and exams. The @ symbol syntax makes it easy to evaluate your function at any input, whether a single point or an entire vector for plotting.",
    "zh": "匿名函数让你在MATLAB中快速定义数学表达式，无需创建单独的文件——非常适合快速测试指数衰减正弦波和其他信号处理中常见的信号。使用@符号语法可以轻松在任意输入点（单个点或整个向量）处计算函数值，便于绘图。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.11-2 Relational Operators and the Unit Step Function": {
    "en": "The unit step function is a fundamental building block in signals and systems, and MATLAB's relational operators make it surprisingly simple to define and visualize. This section shows how to use the >= operator to create u(t) as an anonymous function, then tackles two practical plotting pitfalls—axis scaling that hides your signal and the jagged appearance of discontinuities—that every student encounters when first coding step functions.",
    "zh": "单位阶跃函数是信号与系统中的基本构件，MATLAB的关系运算符使其定义和可视化变得出奇地简单。本节展示如何使用>=运算符将u(t)创建为匿名函数，然后解决两个实际绘图问题——隐藏信号的轴缩放和不连续性的锯齿状外观——这是每个学生首次编写阶跃函数时都会遇到的问题。",
    "emoji": "📊",
    "refs": 1
  },
  "1.11-2": {
    "en": "The unit step function is a fundamental building block in signals and systems, and MATLAB's relational operators make it surprisingly simple to define and visualize. This section shows how to use the >= operator to create u(t) as an anonymous function, then tackles two practical plotting pitfalls—axis scaling that hides your signal and the jagged appearance of discontinuities—that every student encounters when first coding step functions.",
    "zh": "单位阶跃函数是信号与系统中的基本构件，MATLAB的关系运算符使其定义和可视化变得出奇地简单。本节展示如何使用>=运算符将u(t)创建为匿名函数，然后解决两个实际绘图问题——隐藏信号的轴缩放和不连续性的锯齿状外观——这是每个学生首次编写阶跃函数时都会遇到的问题。",
    "emoji": "📊",
    "refs": 1
  },
  "1.11-3 Visualizing Operations on the Independent Variable": {
    "en": "Time shifting and scaling aren't just abstract concepts—they're operations you can visualize directly in MATLAB using anonymous functions. This section shows how to plot transformed versions of a function like g(2t+1), breaking down what happens when you compress time and shift the waveform left, with concrete examples using causal exponential cosines that help you see exactly where the signal turns on.",
    "zh": "时间移位和缩放不仅仅是抽象概念——你可以在MATLAB中使用匿名函数直接可视化这些操作。本节展示如何绘制函数的变换版本（如g(2t+1)），分解时间压缩和波形左移时发生的情况，并使用因果指数余弦的具体例子帮助你看到信号的确切开启点。",
    "emoji": "📊",
    "refs": 1
  },
  "1.11-3": {
    "en": "Time shifting and scaling aren't just abstract concepts—they're operations you can visualize directly in MATLAB using anonymous functions. This section shows how to plot transformed versions of a function like g(2t+1), breaking down what happens when you compress time and shift the waveform left, with concrete examples using causal exponential cosines that help you see exactly where the signal turns on.",
    "zh": "时间移位和缩放不仅仅是抽象概念——你可以在MATLAB中使用匿名函数直接可视化这些操作。本节展示如何绘制函数的变换版本（如g(2t+1)），分解时间压缩和波形左移时发生的情况，并使用因果指数余弦的具体例子帮助你看到信号的确切开启点。",
    "emoji": "📊",
    "refs": 1
  },
  "1.11-4 MATLAB: Working with Functions": {
    "en": "MATLAB transforms abstract signal operations into visual reality—this section shows how to plot reflected and time-shifted versions of signals like g(−t+1) and composite functions, then tackles numerical integration to estimate signal energy without solving integrals by hand. These practical coding skills bridge theory and the computational tools you'll use on exams and in labs.",
    "zh": "MATLAB 将抽象的信号运算转化为可视化现实——本节展示如何绘制反射和时移信号（如 g(−t+1) 和复合函数），然后介绍数值积分来估计信号能量，无需手工求解积分。这些实用的编程技能连接了理论与你在考试和实验中使用的计算工具。",
    "emoji": "📊",
    "refs": 2
  },
  "1.11-4": {
    "en": "MATLAB transforms abstract signal operations into visual reality—this section shows how to plot reflected and time-shifted versions of signals like g(−t+1) and composite functions, then tackles numerical integration to estimate signal energy without solving integrals by hand. These practical coding skills bridge theory and the computational tools you'll use on exams and in labs.",
    "zh": "MATLAB 将抽象的信号运算转化为可视化现实——本节展示如何绘制反射和时移信号（如 g(−t+1) 和复合函数），然后介绍数值积分来估计信号能量，无需手工求解积分。这些实用的编程技能连接了理论与你在考试和实验中使用的计算工具。",
    "emoji": "📊",
    "refs": 2
  },
  "1.12 Summary": {
    "en": "This chapter wrap-up consolidates everything you've learned about signals and systems—from energy calculations to stability conditions. You'll see how all the classifications (continuous vs. discrete, periodic vs. aperiodic, causal vs. noncausal) fit together, plus a MATLAB drill to cement your computational skills before moving to more complex topics.",
    "zh": "本章总结整合了你所学的信号与系统的全部内容——从能量计算到稳定性条件。你将看到所有分类（连续与离散、周期与非周期、因果与非因果）如何相互关联，以及一个MATLAB练习来巩固你的计算技能，为后续更复杂的主题做准备。",
    "emoji": "📋",
    "refs": 2
  },
  "1.12": {
    "en": "This chapter wrap-up consolidates everything you've learned about signals and systems—from energy calculations to stability conditions. You'll see how all the classifications (continuous vs. discrete, periodic vs. aperiodic, causal vs. noncausal) fit together, plus a MATLAB drill to cement your computational skills before moving to more complex topics.",
    "zh": "本章总结整合了你所学的信号与系统的全部内容——从能量计算到稳定性条件。你将看到所有分类（连续与离散、周期与非周期、因果与非因果）如何相互关联，以及一个MATLAB练习来巩固你的计算技能，为后续更复杂的主题做准备。",
    "emoji": "📋",
    "refs": 2
  },
  "1.2 Determining Power and RMS Value": {
    "en": "Power and RMS values reveal how much energy a signal carries—and for sinusoids, these quantities depend only on amplitude, not frequency or phase. This section walks through calculating power for both real sinusoids and complex exponentials using time-averaging, then introduces time scaling operations that compress or stretch signals by replacing t with at, a fundamental manipulation you'll use constantly when analyzing system responses.",
    "zh": "功率和RMS值揭示了信号携带的能量大小——对于正弦信号，这些量仅取决于幅度，与频率或相位无关。本节通过时间平均法演示如何计算实正弦和复指数信号的功率，随后介绍时间缩放操作，通过将t替换为at来压缩或拉伸信号，这是分析系统响应时经常使用的基本操作。",
    "emoji": "⚡",
    "refs": 4
  },
  "1.2": {
    "en": "Power and RMS values reveal how much energy a signal carries—and for sinusoids, these quantities depend only on amplitude, not frequency or phase. This section walks through calculating power for both real sinusoids and complex exponentials using time-averaging, then introduces time scaling operations that compress or stretch signals by replacing t with at, a fundamental manipulation you'll use constantly when analyzing system responses.",
    "zh": "功率和RMS值揭示了信号携带的能量大小——对于正弦信号，这些量仅取决于幅度，与频率或相位无关。本节通过时间平均法演示如何计算实正弦和复指数信号的功率，随后介绍时间缩放操作，通过将t替换为at来压缩或拉伸信号，这是分析系统响应时经常使用的基本操作。",
    "emoji": "⚡",
    "refs": 4
  },
  "1.2-1 Time Shifting": {
    "en": "Time shifting is the foundation of how signals move through systems—delay a signal by replacing t with (t−T), and you've got the core operation behind every filter and communication system. This section breaks down why positive delays shift right and negative delays shift left, with visual examples that make the pattern stick for exam problems.",
    "zh": "时间移位是信号在系统中运动的基础——通过用(t−T)替换t来延迟信号，这是每个滤波器和通信系统背后的核心操作。本节解释为什么正延迟向右移动，负延迟向左移动，并通过可视化示例帮助你掌握考试中的相关问题。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.2-1": {
    "en": "Time shifting is the foundation of how signals move through systems—delay a signal by replacing t with (t−T), and you've got the core operation behind every filter and communication system. This section breaks down why positive delays shift right and negative delays shift left, with visual examples that make the pattern stick for exam problems.",
    "zh": "时间移位是信号在系统中运动的基础——通过用(t−T)替换t来延迟信号，这是每个滤波器和通信系统背后的核心操作。本节解释为什么正延迟向右移动，负延迟向左移动，并通过可视化示例帮助你掌握考试中的相关问题。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.2-2 Time Scaling": {
    "en": "Time scaling reveals how speeding up or slowing down a signal changes its mathematical form—compress by factor a and you get x(at), expand and you get x(t/a), with t=0 always staying put as your anchor. This operation is essential for understanding how systems respond to signals played at different rates, a skill you'll need for both continuous and discrete signal problems on exams.",
    "zh": "时间缩放揭示了信号加速或减速如何改变其数学形式——压缩因子a得到x(at)，扩展得到x(t/a)，而t=0始终保持不变作为锚点。这个操作对于理解系统如何响应以不同速率播放的信号至关重要，是连续和离散信号问题考试中必需的技能。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.2-2": {
    "en": "Time scaling reveals how speeding up or slowing down a signal changes its mathematical form—compress by factor a and you get x(at), expand and you get x(t/a), with t=0 always staying put as your anchor. This operation is essential for understanding how systems respond to signals played at different rates, a skill you'll need for both continuous and discrete signal problems on exams.",
    "zh": "时间缩放揭示了信号加速或减速如何改变其数学形式——压缩因子a得到x(at)，扩展得到x(t/a)，而t=0始终保持不变作为锚点。这个操作对于理解系统如何响应以不同速率播放的信号至关重要，是连续和离散信号问题考试中必需的技能。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.2-3 Time Reversal": {
    "en": "Time reversal flips a signal backward in time by replacing t with −t, creating a mirror image across the vertical axis. This simple substitution is fundamental to understanding signal transformations and appears constantly in convolution, correlation, and system analysis—making it essential for predicting how signals behave under time manipulation.",
    "zh": "时间反转通过将 t 替换为 −t 来将信号向后翻转，在垂直轴上创建镜像。这个简单的替换对于理解信号变换至关重要，在卷积、相关性和系统分析中频繁出现，是预测信号在时间操作下行为的关键。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.2-3": {
    "en": "Time reversal flips a signal backward in time by replacing t with −t, creating a mirror image across the vertical axis. This simple substitution is fundamental to understanding signal transformations and appears constantly in convolution, correlation, and system analysis—making it essential for predicting how signals behave under time manipulation.",
    "zh": "时间反转通过将 t 替换为 −t 来将信号向后翻转，在垂直轴上创建镜像。这个简单的替换对于理解信号变换至关重要，在卷积、相关性和系统分析中频繁出现，是预测信号在时间操作下行为的关键。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.2-4 Some Useful Signal Operations": {
    "en": "Time reversal, scaling, and shifting rarely happen in isolation—this section shows how to combine them systematically. You'll see why x(2t - 6) can be built two different ways, and why the *order* of operations matters for getting the right answer on exams.",
    "zh": "时间反转、缩放和平移很少单独出现——本节系统地展示如何组合它们。你将看到为什么 x(2t - 6) 可以用两种不同的方式构建，以及为什么操作的*顺序*对于在考试中得到正确答案至关重要。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.2-4": {
    "en": "Time reversal, scaling, and shifting rarely happen in isolation—this section shows how to combine them systematically. You'll see why x(2t - 6) can be built two different ways, and why the *order* of operations matters for getting the right answer on exams.",
    "zh": "时间反转、缩放和平移很少单独出现——本节系统地展示如何组合它们。你将看到为什么 x(2t - 6) 可以用两种不同的方式构建，以及为什么操作的*顺序*对于在考试中得到正确答案至关重要。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.3 Time Shifting": {
    "en": "Time shifting shows how signals move left or right on the time axis—delay a signal by replacing t with (t−1), advance it by replacing t with (t+1). This fundamental operation appears constantly in real systems like audio processing and control, where you need to account for transmission delays or predict future behavior.",
    "zh": "时间移位展示了信号如何在时间轴上左右移动——用(t−1)替换t可以延迟信号，用(t+1)替换t可以提前信号。这个基本操作在音频处理和控制系统等实际应用中无处不在，用来处理传输延迟或预测未来行为。",
    "emoji": "⏱️",
    "refs": 3
  },
  "1.3": {
    "en": "Time shifting shows how signals move left or right on the time axis—delay a signal by replacing t with (t−1), advance it by replacing t with (t+1). This fundamental operation appears constantly in real systems like audio processing and control, where you need to account for transmission delays or predict future behavior.",
    "zh": "时间移位展示了信号如何在时间轴上左右移动——用(t−1)替换t可以延迟信号，用(t+1)替换t可以提前信号。这个基本操作在音频处理和控制系统等实际应用中无处不在，用来处理传输延迟或预测未来行为。",
    "emoji": "⏱️",
    "refs": 3
  },
  "1.3-2 Classification of Signals": {
    "en": "Signals come in five distinct flavors, and mixing them up is a common exam trap. This section separates continuous-time from analog, periodic from energy signals, and deterministic from random—each classification answers a different question about how a signal behaves. Getting these distinctions right is essential for choosing the right analysis tools later.",
    "zh": "信号有五种不同的分类方式，混淆它们是常见的考试陷阱。本节区分连续时间与模拟信号、周期与能量信号、确定性与随机信号——每种分类都回答了关于信号如何表现的不同问题。正确理解这些区别对于后续选择合适的分析工具至关重要。",
    "emoji": "🏷️",
    "refs": 1
  },
  "1.3-2": {
    "en": "Signals come in five distinct flavors, and mixing them up is a common exam trap. This section separates continuous-time from analog, periodic from energy signals, and deterministic from random—each classification answers a different question about how a signal behaves. Getting these distinctions right is essential for choosing the right analysis tools later.",
    "zh": "信号有五种不同的分类方式，混淆它们是常见的考试陷阱。本节区分连续时间与模拟信号、周期与能量信号、确定性与随机信号——每种分类都回答了关于信号如何表现的不同问题。正确理解这些区别对于后续选择合适的分析工具至关重要。",
    "emoji": "🏷️",
    "refs": 1
  },
  "1.3-3 Periodic and Aperiodic Signals": {
    "en": "Periodic signals repeat themselves forever—they satisfy x(t) = x(t + T₀) for some fundamental period T₀—while aperiodic signals don't follow this pattern. This classification is crucial for exam problems because periodic signals unlock powerful analysis tools like Fourier series, whereas aperiodic signals require different techniques like Fourier transforms.",
    "zh": "周期信号永远重复自身——满足 x(t) = x(t + T₀)，其中 T₀ 是基本周期——而非周期信号则不遵循这种模式。这种分类对考试至关重要，因为周期信号能够使用傅里叶级数等强大的分析工具，而非周期信号则需要傅里叶变换等不同的技术。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.3-3": {
    "en": "Periodic signals repeat themselves forever—they satisfy x(t) = x(t + T₀) for some fundamental period T₀—while aperiodic signals don't follow this pattern. This classification is crucial for exam problems because periodic signals unlock powerful analysis tools like Fourier series, whereas aperiodic signals require different techniques like Fourier transforms.",
    "zh": "周期信号永远重复自身——满足 x(t) = x(t + T₀)，其中 T₀ 是基本周期——而非周期信号则不遵循这种模式。这种分类对考试至关重要，因为周期信号能够使用傅里叶级数等强大的分析工具，而非周期信号则需要傅里叶变换等不同的技术。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.3-5 Some Useful Signal Models": {
    "en": "Energy and power signals represent two mutually exclusive categories that classify real-world signals—most practical signals are energy signals with finite total energy, while power signals require infinite duration and constant average power. This section also separates deterministic signals (completely predictable from a mathematical formula) from random signals (described only through probability), setting the stage for the fundamental signal models like steps, impulses, and exponentials that appear throughout systems analysis.",
    "zh": "能量信号和功率信号是两个互斥的分类，用来描述实际信号——大多数实际信号是具有有限总能量的能量信号，而功率信号需要无限持续时间和恒定平均功率。本节还区分了确定性信号（可以从数学公式完全预测）和随机信号（仅通过概率描述），为系统分析中出现的基本信号模型（如阶跃、冲激和指数函数）奠定基础。",
    "emoji": "📊",
    "refs": 1
  },
  "1.3-5": {
    "en": "Energy and power signals represent two mutually exclusive categories that classify real-world signals—most practical signals are energy signals with finite total energy, while power signals require infinite duration and constant average power. This section also separates deterministic signals (completely predictable from a mathematical formula) from random signals (described only through probability), setting the stage for the fundamental signal models like steps, impulses, and exponentials that appear throughout systems analysis.",
    "zh": "能量信号和功率信号是两个互斥的分类，用来描述实际信号——大多数实际信号是具有有限总能量的能量信号，而功率信号需要无限持续时间和恒定平均功率。本节还区分了确定性信号（可以从数学公式完全预测）和随机信号（仅通过概率描述），为系统分析中出现的基本信号模型（如阶跃、冲激和指数函数）奠定基础。",
    "emoji": "📊",
    "refs": 1
  },
  "1.3-6 Signals and Systems - Problems": {
    "en": "This problem set reinforces the foundational signal classifications that appear throughout signals and systems—from distinguishing energy versus power signals to determining periodicity in composite waveforms. These exercises are essential for building intuition about how signals behave under time scaling and transformations, skills you'll need to tackle more complex system analysis.",
    "zh": "这套习题强化了信号与系统中的基础信号分类——从区分能量信号与功率信号到确定复合波形的周期性。这些练习对于建立信号在时间缩放和变换下的行为直觉至关重要，这些技能是解决更复杂系统分析问题所必需的。",
    "emoji": "📋",
    "refs": 1
  },
  "1.3-6": {
    "en": "This problem set reinforces the foundational signal classifications that appear throughout signals and systems—from distinguishing energy versus power signals to determining periodicity in composite waveforms. These exercises are essential for building intuition about how signals behave under time scaling and transformations, skills you'll need to tackle more complex system analysis.",
    "zh": "这套习题强化了信号与系统中的基础信号分类——从区分能量信号与功率信号到确定复合波形的周期性。这些练习对于建立信号在时间缩放和变换下的行为直觉至关重要，这些技能是解决更复杂系统分析问题所必需的。",
    "emoji": "📋",
    "refs": 1
  },
  "1.4-1 The Unit Step Function u(t)": {
    "en": "The unit step function u(t) is your gateway to representing causal signals—those that start at t=0 and stay silent before. This section shows how multiplying any signal by u(t) instantly makes it causal, and how combining shifted step functions lets you build piecewise signals like rectangular pulses with a single elegant expression instead of messy case definitions.",
    "zh": "单位阶跃函数u(t)是表示因果信号的关键工具——这些信号从t=0开始，之前保持为零。本节展示如何将任何信号乘以u(t)使其变为因果信号，以及如何组合移位的阶跃函数用单一表达式构建分段信号（如矩形脉冲），而不需要繁琐的分段定义。",
    "emoji": "📍",
    "refs": 1
  },
  "1.4-1": {
    "en": "The unit step function u(t) is your gateway to representing causal signals—those that start at t=0 and stay silent before. This section shows how multiplying any signal by u(t) instantly makes it causal, and how combining shifted step functions lets you build piecewise signals like rectangular pulses with a single elegant expression instead of messy case definitions.",
    "zh": "单位阶跃函数u(t)是表示因果信号的关键工具——这些信号从t=0开始，之前保持为零。本节展示如何将任何信号乘以u(t)使其变为因果信号，以及如何组合移位的阶跃函数用单一表达式构建分段信号（如矩形脉冲），而不需要繁琐的分段定义。",
    "emoji": "📍",
    "refs": 1
  },
  "1.4-2 The Unit Impulse Function δ(t)": {
    "en": "The unit impulse δ(t) is a mathematical idealization of an infinitely tall, infinitesimally narrow pulse that carries exactly one unit of area—the foundation for analyzing how systems respond to sudden shocks. This section shows why the impulse matters: it's the building block for representing any signal and the key to understanding convolution and system response in signals and systems.",
    "zh": "单位冲激函数δ(t)是一个数学理想化模型，表示无限高、无穷窄但面积为1的脉冲——是分析系统对突然冲击响应的基础。本节揭示冲激函数的重要性：它是表示任意信号的基本单元，也是理解卷积和系统响应的关键。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.4-2": {
    "en": "The unit impulse δ(t) is a mathematical idealization of an infinitely tall, infinitesimally narrow pulse that carries exactly one unit of area—the foundation for analyzing how systems respond to sudden shocks. This section shows why the impulse matters: it's the building block for representing any signal and the key to understanding convolution and system response in signals and systems.",
    "zh": "单位冲激函数δ(t)是一个数学理想化模型，表示无限高、无穷窄但面积为1的脉冲——是分析系统对突然冲击响应的基础。本节揭示冲激函数的重要性：它是表示任意信号的基本单元，也是理解卷积和系统响应的关键。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.4-3 The Exponential Function est": {
    "en": "The exponential function e^st is the foundation of signal analysis—when s is complex (σ + jω), it captures both decay/growth and oscillation in a single elegant expression. This section builds from singularity functions (impulse, step, ramp) to show why e^st appears everywhere in system responses and Fourier analysis, making it essential for solving differential equations and understanding LTI behavior.",
    "zh": "指数函数e^st是信号分析的基础——当s为复数(σ + jω)时，它在一个优雅的表达式中同时捕捉衰减/增长和振荡。本节从奇异函数(冲激、阶跃、斜坡)出发，说明为什么e^st在系统响应和傅里叶分析中无处不在，这对求解微分方程和理解LTI系统行为至关重要。",
    "emoji": "📈",
    "refs": 2
  },
  "1.4-3": {
    "en": "The exponential function e^st is the foundation of signal analysis—when s is complex (σ + jω), it captures both decay/growth and oscillation in a single elegant expression. This section builds from singularity functions (impulse, step, ramp) to show why e^st appears everywhere in system responses and Fourier analysis, making it essential for solving differential equations and understanding LTI behavior.",
    "zh": "指数函数e^st是信号分析的基础——当s为复数(σ + jω)时，它在一个优雅的表达式中同时捕捉衰减/增长和振荡。本节从奇异函数(冲激、阶跃、斜坡)出发，说明为什么e^st在系统响应和傅里叶分析中无处不在，这对求解微分方程和理解LTI系统行为至关重要。",
    "emoji": "📈",
    "refs": 2
  },
  "1.5 Complex Frequency and the Exponential Function": {
    "en": "The complex exponential e^(st) is the Swiss Army knife of signals—it unifies constants, decaying/growing exponentials, sinusoids, and damped oscillations into a single framework. By plotting complex frequency s = σ + jω on the s-plane, you gain geometric insight into system behavior that's essential for Laplace transforms and stability analysis on exams.",
    "zh": "复指数函数 e^(st) 是信号分析的万能工具——它将常数、衰减/增长指数、正弦波和阻尼振荡统一在一个框架内。通过在 s 平面上绘制复频率 s = σ + jω，你可以获得对系统行为的几何直观理解，这对拉普拉斯变换和考试中的稳定性分析至关重要。",
    "emoji": "📈",
    "refs": 5
  },
  "1.5": {
    "en": "The complex exponential e^(st) is the Swiss Army knife of signals—it unifies constants, decaying/growing exponentials, sinusoids, and damped oscillations into a single framework. By plotting complex frequency s = σ + jω on the s-plane, you gain geometric insight into system behavior that's essential for Laplace transforms and stability analysis on exams.",
    "zh": "复指数函数 e^(st) 是信号分析的万能工具——它将常数、衰减/增长指数、正弦波和阻尼振荡统一在一个框架内。通过在 s 平面上绘制复频率 s = σ + jω，你可以获得对系统行为的几何直观理解，这对拉普拉斯变换和考试中的稳定性分析至关重要。",
    "emoji": "📈",
    "refs": 5
  },
  "1.5-1 Even and Odd Functions": {
    "en": "Symmetry is a powerful shortcut in signal analysis—even and odd functions reveal hidden structure that simplifies calculations throughout the course. This section defines these mirror-image properties mathematically and shows how multiplying even and odd functions together follows predictable rules, a pattern you'll exploit repeatedly in Fourier analysis and convolution problems.",
    "zh": "对称性是信号分析中的强大捷径——偶函数和奇函数揭示了隐藏的结构，可以简化整个课程中的计算。本节从数学角度定义了这些镜像性质，并展示了偶函数和奇函数相乘如何遵循可预测的规则，这是你在傅里叶分析和卷积问题中会反复利用的模式。",
    "emoji": "🪞",
    "refs": 1
  },
  "1.5-1": {
    "en": "Symmetry is a powerful shortcut in signal analysis—even and odd functions reveal hidden structure that simplifies calculations throughout the course. This section defines these mirror-image properties mathematically and shows how multiplying even and odd functions together follows predictable rules, a pattern you'll exploit repeatedly in Fourier analysis and convolution problems.",
    "zh": "对称性是信号分析中的强大捷径——偶函数和奇函数揭示了隐藏的结构，可以简化整个课程中的计算。本节从数学角度定义了这些镜像性质，并展示了偶函数和奇函数相乘如何遵循可预测的规则，这是你在傅里叶分析和卷积问题中会反复利用的模式。",
    "emoji": "🪞",
    "refs": 1
  },
  "1.5-2 Even and Odd Components of a Signal": {
    "en": "Every signal can be split into even and odd parts—a decomposition that simplifies integration and reveals hidden symmetries. This section shows why integrals of odd functions vanish over symmetric intervals and provides the exact formulas to extract both components from any signal, with exponential decay as a concrete example.",
    "zh": "任何信号都可以分解为偶部分和奇部分——这种分解简化了积分运算并揭示了隐藏的对称性。本节说明为什么奇函数在对称区间上的积分为零，并提供从任意信号中提取两个分量的精确公式，以指数衰减为具体例子。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.5-2": {
    "en": "Every signal can be split into even and odd parts—a decomposition that simplifies integration and reveals hidden symmetries. This section shows why integrals of odd functions vanish over symmetric intervals and provides the exact formulas to extract both components from any signal, with exponential decay as a concrete example.",
    "zh": "任何信号都可以分解为偶部分和奇部分——这种分解简化了积分运算并揭示了隐藏的对称性。本节说明为什么奇函数在对称区间上的积分为零，并提供从任意信号中提取两个分量的精确公式，以指数衰减为具体例子。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.6 Systems": {
    "en": "Systems are the engines that transform signals—whether it's an RC circuit filtering noise or a digital processor computing outputs. This section extends even/odd decomposition to complex signals using conjugate symmetry, then pivots to the big picture: how systems are modeled, analyzed, and designed through terminal relationships and interconnection laws. You'll see why the black-box view matters for everything from circuit analysis to control design.",
    "zh": "系统是转换信号的引擎——无论是RC电路滤除噪声还是数字处理器计算输出。本节将偶/奇分解扩展到复信号，使用共轭对称性和共轭反对称性，然后转向全局视角：系统如何通过端子关系和互连定律进行建模、分析和设计。你将看到黑箱视图为什么对从电路分析到控制设计的一切都很重要。",
    "emoji": "⚙️",
    "refs": 2
  },
  "1.6": {
    "en": "Systems are the engines that transform signals—whether it's an RC circuit filtering noise or a digital processor computing outputs. This section extends even/odd decomposition to complex signals using conjugate symmetry, then pivots to the big picture: how systems are modeled, analyzed, and designed through terminal relationships and interconnection laws. You'll see why the black-box view matters for everything from circuit analysis to control design.",
    "zh": "系统是转换信号的引擎——无论是RC电路滤除噪声还是数字处理器计算输出。本节将偶/奇分解扩展到复信号，使用共轭对称性和共轭反对称性，然后转向全局视角：系统如何通过端子关系和互连定律进行建模、分析和设计。你将看到黑箱视图为什么对从电路分析到控制设计的一切都很重要。",
    "emoji": "⚙️",
    "refs": 2
  },
  "1.7 Classification of Systems": {
    "en": "Every linear system splits into two independent pieces: what happens because of initial conditions (zero-input response) and what happens because of the input signal (zero-state response). This decomposition, proven through the superposition principle, is why constant-coefficient differential equations perfectly describe real circuits and systems—and it's essential for predicting system behavior on exams.",
    "zh": "每个线性系统都可以分解为两个独立的部分：由初始条件引起的响应（零输入响应）和由输入信号引起的响应（零状态响应）。通过叠加原理证明的这种分解方法，解释了为什么常系数微分方程能够完美描述实际电路和系统——这对于考试中预测系统行为至关重要。",
    "emoji": "🔀",
    "refs": 9
  },
  "1.7": {
    "en": "Every linear system splits into two independent pieces: what happens because of initial conditions (zero-input response) and what happens because of the input signal (zero-state response). This decomposition, proven through the superposition principle, is why constant-coefficient differential equations perfectly describe real circuits and systems—and it's essential for predicting system behavior on exams.",
    "zh": "每个线性系统都可以分解为两个独立的部分：由初始条件引起的响应（零输入响应）和由输入信号引起的响应（零状态响应）。通过叠加原理证明的这种分解方法，解释了为什么常系数微分方程能够完美描述实际电路和系统——这对于考试中预测系统行为至关重要。",
    "emoji": "🔀",
    "refs": 9
  },
  "1.7-1 Classification of Systems": {
    "en": "Systems fall into eight distinct categories—linear or nonlinear, causal or noncausal, stable or unstable—and knowing which type you're dealing with determines everything about how you analyze it. This section focuses on linearity, the most powerful property in signals and systems: if input x₁ produces output y₁ and input x₂ produces output y₂, then x₁+x₂ must produce y₁+y₂ (superposition). Mastering system classification is essential for exam problems because it tells you which tools and theorems you can actually use.",
    "zh": "系统分为八大类别——线性或非线性、因果或非因果、稳定或不稳定——而你处理的系统类型决定了分析方法的一切。本节重点讨论线性性，这是信号与系统中最强大的性质：如果输入x₁产生输出y₁，输入x₂产生输出y₂，那么x₁+x₂必须产生y₁+y₂（叠加原理）。掌握系统分类对考试至关重要，因为它告诉你哪些工具和定理实际上可以使用。",
    "emoji": "🏗️",
    "refs": 2
  },
  "1.7-1": {
    "en": "Systems fall into eight distinct categories—linear or nonlinear, causal or noncausal, stable or unstable—and knowing which type you're dealing with determines everything about how you analyze it. This section focuses on linearity, the most powerful property in signals and systems: if input x₁ produces output y₁ and input x₂ produces output y₂, then x₁+x₂ must produce y₁+y₂ (superposition). Mastering system classification is essential for exam problems because it tells you which tools and theorems you can actually use.",
    "zh": "系统分为八大类别——线性或非线性、因果或非因果、稳定或不稳定——而你处理的系统类型决定了分析方法的一切。本节重点讨论线性性，这是信号与系统中最强大的性质：如果输入x₁产生输出y₁，输入x₂产生输出y₂，那么x₁+x₂必须产生y₁+y₂（叠加原理）。掌握系统分类对考试至关重要，因为它告诉你哪些工具和定理实际上可以使用。",
    "emoji": "🏗️",
    "refs": 2
  },
  "1.7-2 Time-Invariant and Time-Varying Systems": {
    "en": "Time-invariant systems have a special superpower: delay the input, and the output gets delayed by exactly the same amount. This section reveals why this commutativity property matters—it's the defining characteristic that separates well-behaved, predictable systems from time-varying ones that break this rule. You'll see why this distinction is crucial for analyzing real circuits and signals on exams.",
    "zh": "时不变系统有一个特殊的性质：输入延迟多少，输出就延迟多少。本节揭示了这种交换性为什么重要——它是区分行为良好、可预测系统与违反此规则的时变系统的决定性特征。你将看到为什么这种区分对于在考试中分析真实电路和信号至关重要。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.7-2": {
    "en": "Time-invariant systems have a special superpower: delay the input, and the output gets delayed by exactly the same amount. This section reveals why this commutativity property matters—it's the defining characteristic that separates well-behaved, predictable systems from time-varying ones that break this rule. You'll see why this distinction is crucial for analyzing real circuits and signals on exams.",
    "zh": "时不变系统有一个特殊的性质：输入延迟多少，输出就延迟多少。本节揭示了这种交换性为什么重要——它是区分行为良好、可预测系统与违反此规则的时变系统的决定性特征。你将看到为什么这种区分对于在考试中分析真实电路和信号至关重要。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.7-3 Classification of Systems": {
    "en": "A system's behavior can change with time or stay consistent—and this distinction fundamentally shapes how you analyze it. This section separates time-invariant systems (where delaying the input delays the output by the same amount) from time-varying ones using concrete counterexamples, then introduces whether a system responds instantaneously or depends on past values. Mastering this classification is essential because LTI systems unlock powerful analysis tools like convolution and Fourier methods.",
    "zh": "系统的行为可能随时间变化，也可能保持一致——这种区别从根本上影响你的分析方法。本节通过具体反例区分时不变系统（输入延迟会导致输出相同延迟）和时变系统，然后介绍系统是瞬时响应还是依赖过去值。掌握这种分类至关重要，因为LTI系统能够解锁卷积和傅里叶等强大的分析工具。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.7-3": {
    "en": "A system's behavior can change with time or stay consistent—and this distinction fundamentally shapes how you analyze it. This section separates time-invariant systems (where delaying the input delays the output by the same amount) from time-varying ones using concrete counterexamples, then introduces whether a system responds instantaneously or depends on past values. Mastering this classification is essential because LTI systems unlock powerful analysis tools like convolution and Fourier methods.",
    "zh": "系统的行为可能随时间变化，也可能保持一致——这种区别从根本上影响你的分析方法。本节通过具体反例区分时不变系统（输入延迟会导致输出相同延迟）和时变系统，然后介绍系统是瞬时响应还是依赖过去值。掌握这种分类至关重要，因为LTI系统能够解锁卷积和傅里叶等强大的分析工具。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.7-4 Causal and Noncausal Systems": {
    "en": "A system's ability to 'remember' past inputs separates the practical from the impossible—memoryless systems respond instantly to the current input alone, while dynamic systems carry memory of what came before. Causality adds a crucial constraint: causal systems cannot peek into the future, making them the only kind you'll find in real circuits and physical devices. This section dissects when systems have memory, when they don't, and why noncausal systems are useful in theory but forbidden in real-time applications.",
    "zh": "系统是否具有'记忆'能力决定了它的本质——无记忆系统仅对当前输入做出瞬时响应，而动态系统则保留过去输入的信息。因果性施加了一个关键约束：因果系统无法预知未来，这使其成为实际电路和物理设备中唯一可行的类型。本节剖析系统何时具有记忆、何时没有记忆，以及为什么非因果系统在理论中有用但在实时应用中被禁用。",
    "emoji": "⏰",
    "refs": 1
  },
  "1.7-4": {
    "en": "A system's ability to 'remember' past inputs separates the practical from the impossible—memoryless systems respond instantly to the current input alone, while dynamic systems carry memory of what came before. Causality adds a crucial constraint: causal systems cannot peek into the future, making them the only kind you'll find in real circuits and physical devices. This section dissects when systems have memory, when they don't, and why noncausal systems are useful in theory but forbidden in real-time applications.",
    "zh": "系统是否具有'记忆'能力决定了它的本质——无记忆系统仅对当前输入做出瞬时响应，而动态系统则保留过去输入的信息。因果性施加了一个关键约束：因果系统无法预知未来，这使其成为实际电路和物理设备中唯一可行的类型。本节剖析系统何时具有记忆、何时没有记忆，以及为什么非因果系统在理论中有用但在实时应用中被禁用。",
    "emoji": "⏰",
    "refs": 1
  },
  "1.7-5 Continuous-Time and Discrete-Time Systems": {
    "en": "Noncausal systems look into the future—an impossible feat in the real world, but a clever time delay can make them practically useful. This section contrasts the mathematical ideal of noncausal behavior with physical reality, then pivots to the fundamental distinction between continuous-time and discrete-time systems, showing how sampling bridges the two worlds.",
    "zh": "非因果系统能够预知未来——这在现实中是不可能的，但巧妙的时间延迟可以使其在实践中变得有用。本节对比了非因果行为的数学理想与物理现实，然后转向连续时间系统和离散时间系统的根本区别，展示采样如何连接这两个世界。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.7-5": {
    "en": "Noncausal systems look into the future—an impossible feat in the real world, but a clever time delay can make them practically useful. This section contrasts the mathematical ideal of noncausal behavior with physical reality, then pivots to the fundamental distinction between continuous-time and discrete-time systems, showing how sampling bridges the two worlds.",
    "zh": "非因果系统能够预知未来——这在现实中是不可能的，但巧妙的时间延迟可以使其在实践中变得有用。本节对比了非因果行为的数学理想与物理现实，然后转向连续时间系统和离散时间系统的根本区别，展示采样如何连接这两个世界。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.7-7 Invertible and Noninvertible Systems": {
    "en": "Can you always recover the input from the output? Invertible systems preserve all input information through a one-to-one mapping, while noninvertible systems (like rectifiers) lose information by collapsing multiple inputs into the same output. This distinction is crucial for understanding when equalization and signal recovery are possible—and when they're fundamentally impossible.",
    "zh": "你能否总是从输出恢复输入信号？可逆系统通过一一映射保留所有输入信息，而不可逆系统（如整流器）会将多个输入映射到同一输出，导致信息丢失。这个区分对于判断何时可以进行均衡和信号恢复至关重要。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.7-7": {
    "en": "Can you always recover the input from the output? Invertible systems preserve all input information through a one-to-one mapping, while noninvertible systems (like rectifiers) lose information by collapsing multiple inputs into the same output. This distinction is crucial for understanding when equalization and signal recovery are possible—and when they're fundamentally impossible.",
    "zh": "你能否总是从输出恢复输入信号？可逆系统通过一一映射保留所有输入信息，而不可逆系统（如整流器）会将多个输入映射到同一输出，导致信息丢失。这个区分对于判断何时可以进行均衡和信号恢复至关重要。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.7-8 Stable and Unstable Systems": {
    "en": "A system's stability determines whether bounded inputs produce bounded outputs—the foundation of reliable signal processing. This section distinguishes between invertible and non-invertible systems, then applies BIBO stability tests to classify real systems like differentiators and time-scaling operations, showing why some amplify disturbances while others remain controlled.",
    "zh": "系统的稳定性决定了有界输入是否产生有界输出——这是可靠信号处理的基础。本节区分可逆和不可逆系统，然后对微分器和时间缩放等实际系统应用BIBO稳定性测试，说明为什么某些系统会放大干扰而其他系统保持受控。",
    "emoji": "⚖️",
    "refs": 1
  },
  "1.7-8": {
    "en": "A system's stability determines whether bounded inputs produce bounded outputs—the foundation of reliable signal processing. This section distinguishes between invertible and non-invertible systems, then applies BIBO stability tests to classify real systems like differentiators and time-scaling operations, showing why some amplify disturbances while others remain controlled.",
    "zh": "系统的稳定性决定了有界输入是否产生有界输出——这是可靠信号处理的基础。本节区分可逆和不可逆系统，然后对微分器和时间缩放等实际系统应用BIBO稳定性测试，说明为什么某些系统会放大干扰而其他系统保持受控。",
    "emoji": "⚖️",
    "refs": 1
  },
  "1.8 System Model: Input–Output Description": {
    "en": "The differential operator D notation transforms messy integral equations into clean algebraic expressions—this section shows how to write input-output relationships for circuits and mechanical systems in a form that's much easier to manipulate. You'll see RC circuits and mass-spring-dashpot systems expressed using operators, a skill that directly simplifies solving for system responses on exams.",
    "zh": "微分算子D记号将复杂的积分方程转化为简洁的代数表达式——本节展示如何用算子形式写出电路和机械系统的输入-输出关系。你将看到RC电路和质量-弹簧-阻尼器系统如何用算子表示，这项技能能直接简化考试中求解系统响应的过程。",
    "emoji": "⚙️",
    "refs": 6
  },
  "1.8": {
    "en": "The differential operator D notation transforms messy integral equations into clean algebraic expressions—this section shows how to write input-output relationships for circuits and mechanical systems in a form that's much easier to manipulate. You'll see RC circuits and mass-spring-dashpot systems expressed using operators, a skill that directly simplifies solving for system responses on exams.",
    "zh": "微分算子D记号将复杂的积分方程转化为简洁的代数表达式——本节展示如何用算子形式写出电路和机械系统的输入-输出关系。你将看到RC电路和质量-弹簧-阻尼器系统如何用算子表示，这项技能能直接简化考试中求解系统响应的过程。",
    "emoji": "⚙️",
    "refs": 6
  },
  "1.8-1 System Model: Input–Output Description": {
    "en": "Every physical system needs a mathematical language—this section shows how Kirchhoff's laws and component models translate circuits into input–output equations. You'll see the RLC circuit example worked through step-by-step, establishing the foundation for all the differential equations you'll solve on exams.",
    "zh": "每个物理系统都需要一种数学语言——本节展示基尔霍夫定律和元件模型如何将电路转化为输入输出方程。你将看到RLC电路示例的逐步推导，为考试中要解决的所有微分方程奠定基础。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.8-1": {
    "en": "Every physical system needs a mathematical language—this section shows how Kirchhoff's laws and component models translate circuits into input–output equations. You'll see the RLC circuit example worked through step-by-step, establishing the foundation for all the differential equations you'll solve on exams.",
    "zh": "每个物理系统都需要一种数学语言——本节展示基尔霍夫定律和元件模型如何将电路转化为输入输出方程。你将看到RLC电路示例的逐步推导，为考试中要解决的所有微分方程奠定基础。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.8-2 Mechanical Systems": {
    "en": "Mechanical systems follow the same mathematical rules as electrical circuits—Newton's second law replaces Kirchhoff's laws, but the differential equations look identical. This section shows how masses, springs, and dampers combine to create the mechanical analogs of resistors, capacitors, and inductors, giving you a unified framework for analyzing everything from car suspensions to seismic sensors.",
    "zh": "机械系统遵循与电路相同的数学规则——牛顿第二定律取代基尔霍夫定律，但微分方程形式完全相同。本节展示质量、弹簧和阻尼器如何组合成电阻、电容和电感的机械类似物，为你提供一个统一的框架来分析从汽车悬架到地震传感器的各种系统。",
    "emoji": "🔧",
    "refs": 1
  },
  "1.8-2": {
    "en": "Mechanical systems follow the same mathematical rules as electrical circuits—Newton's second law replaces Kirchhoff's laws, but the differential equations look identical. This section shows how masses, springs, and dampers combine to create the mechanical analogs of resistors, capacitors, and inductors, giving you a unified framework for analyzing everything from car suspensions to seismic sensors.",
    "zh": "机械系统遵循与电路相同的数学规则——牛顿第二定律取代基尔霍夫定律，但微分方程形式完全相同。本节展示质量、弹簧和阻尼器如何组合成电阻、电容和电感的机械类似物，为你提供一个统一的框架来分析从汽车悬架到地震传感器的各种系统。",
    "emoji": "🔧",
    "refs": 1
  },
  "1.8-3 Electromechanical Systems": {
    "en": "DC motors bridge electricity and motion—this section shows how current input becomes rotational output through the interplay of electromagnetic torque, inertia, and friction. You'll derive the fundamental differential equation governing motor behavior, a critical model for control systems and exam problems involving real-world actuators.",
    "zh": "直流电动机将电能转化为机械运动——本节展示电流输入如何通过电磁转矩、转动惯量和摩擦力的相互作用转化为旋转输出。你将推导控制电动机行为的基本微分方程，这是控制系统和涉及实际执行器的考试问题的关键模型。",
    "emoji": "⚙️",
    "refs": 1
  },
  "1.8-3": {
    "en": "DC motors bridge electricity and motion—this section shows how current input becomes rotational output through the interplay of electromagnetic torque, inertia, and friction. You'll derive the fundamental differential equation governing motor behavior, a critical model for control systems and exam problems involving real-world actuators.",
    "zh": "直流电动机将电能转化为机械运动——本节展示电流输入如何通过电磁转矩、转动惯量和摩擦力的相互作用转化为旋转输出。你将推导控制电动机行为的基本微分方程，这是控制系统和涉及实际执行器的考试问题的关键模型。",
    "emoji": "⚙️",
    "refs": 1
  },
  "1.9 Internal and External Descriptions of a System": {
    "en": "A system's behavior can be described two completely different ways: from the outside (what you measure at the terminals) or from the inside (every signal flowing through it). This section reveals why a black-box input-output relationship can hide internal dynamics—using a capacitor circuit to show how initial conditions and hidden states matter for real systems, and introducing the critical concepts of controllability and observability.",
    "zh": "系统的行为可以用两种完全不同的方式描述：从外部观察（在端子处测量的信号）或从内部分析（系统内部的每个信号）。本节揭示了为什么黑箱输入输出关系会隐藏内部动态——通过电容电路示例说明初始条件和隐藏状态的重要性，并引入可控性和可观测性这两个关键概念。",
    "emoji": "🔍",
    "refs": 2
  },
  "1.9": {
    "en": "A system's behavior can be described two completely different ways: from the outside (what you measure at the terminals) or from the inside (every signal flowing through it). This section reveals why a black-box input-output relationship can hide internal dynamics—using a capacitor circuit to show how initial conditions and hidden states matter for real systems, and introducing the critical concepts of controllability and observability.",
    "zh": "系统的行为可以用两种完全不同的方式描述：从外部观察（在端子处测量的信号）或从内部分析（系统内部的每个信号）。本节揭示了为什么黑箱输入输出关系会隐藏内部动态——通过电容电路示例说明初始条件和隐藏状态的重要性，并引入可控性和可观测性这两个关键概念。",
    "emoji": "🔍",
    "refs": 2
  },
  "B.1 Complex Numbers": {
    "en": "Complex numbers weren't invented out of thin air—they emerged from a 16th-century puzzle where mathematicians like Cardano found themselves taking square roots of negative numbers while solving perfectly real cubic equations. This section traces how imaginary numbers went from suspicious mathematical artifacts to indispensable tools, and shows you the core operations (conjugates, magnitude, angle) that make complex numbers essential for analyzing signals and systems.",
    "zh": "复数并非凭空产生，而是从16世纪的一个谜题中诞生的——卡尔达诺等数学家在求解实系数三次方程时，意外地遇到了负数的平方根。本节追溯了虚数从可疑的数学工具演变为不可或缺的分析手段的历程，并介绍了复数的核心运算（共轭、模、幅角），这些都是信号与系统分析的基础。",
    "emoji": "🔢",
    "refs": 8
  },
  "B.1": {
    "en": "Complex numbers weren't invented out of thin air—they emerged from a 16th-century puzzle where mathematicians like Cardano found themselves taking square roots of negative numbers while solving perfectly real cubic equations. This section traces how imaginary numbers went from suspicious mathematical artifacts to indispensable tools, and shows you the core operations (conjugates, magnitude, angle) that make complex numbers essential for analyzing signals and systems.",
    "zh": "复数并非凭空产生，而是从16世纪的一个谜题中诞生的——卡尔达诺等数学家在求解实系数三次方程时，意外地遇到了负数的平方根。本节追溯了虚数从可疑的数学工具演变为不可或缺的分析手段的历程，并介绍了复数的核心运算（共轭、模、幅角），这些都是信号与系统分析的基础。",
    "emoji": "🔢",
    "refs": 8
  },
  "B.1-1 Complex Numbers - A Historical Note": {
    "en": "Complex numbers aren't actually mysterious—they're just unfamiliar. This historical note traces how our number system evolved from simple counting to fractions to the complex plane, showing that imaginary numbers are as natural as the innovations that came before them. You'll see why engineers and scientists rely on complex numbers for signals and systems, making this foundation essential for everything that follows.",
    "zh": "复数其实并不神秘，只是我们还不够熟悉。这个历史注记追溯了我们的数字系统如何从简单计数演进到分数，再到复平面，说明虚数和之前的数学创新一样自然。你将看到为什么工程师和科学家在信号与系统中依赖复数，这个基础对后续所有内容都至关重要。",
    "emoji": "📜",
    "refs": 1
  },
  "B.1-1": {
    "en": "Complex numbers aren't actually mysterious—they're just unfamiliar. This historical note traces how our number system evolved from simple counting to fractions to the complex plane, showing that imaginary numbers are as natural as the innovations that came before them. You'll see why engineers and scientists rely on complex numbers for signals and systems, making this foundation essential for everything that follows.",
    "zh": "复数其实并不神秘，只是我们还不够熟悉。这个历史注记追溯了我们的数字系统如何从简单计数演进到分数，再到复平面，说明虚数和之前的数学创新一样自然。你将看到为什么工程师和科学家在信号与系统中依赖复数，这个基础对后续所有内容都至关重要。",
    "emoji": "📜",
    "refs": 1
  },
  "B.1-2 Algebra of Complex Numbers": {
    "en": "Complex numbers live on a 2D plane where the real and imaginary parts become coordinates—and Euler's formula is the bridge that lets you switch between rectangular form (a + jb) and polar form (re^(jθ)) effortlessly. This algebraic foundation is essential for analyzing AC circuits and frequency-domain signals, where complex exponentials replace messy trigonometry.",
    "zh": "复数存在于二维平面上，实部和虚部成为坐标——欧拉公式是让你在矩形形式(a + jb)和极坐标形式(re^(jθ))之间轻松切换的桥梁。这个代数基础对于分析交流电路和频域信号至关重要，其中复指数替代了复杂的三角函数。",
    "emoji": "📐",
    "refs": 1
  },
  "B.1-2": {
    "en": "Complex numbers live on a 2D plane where the real and imaginary parts become coordinates—and Euler's formula is the bridge that lets you switch between rectangular form (a + jb) and polar form (re^(jθ)) effortlessly. This algebraic foundation is essential for analyzing AC circuits and frequency-domain signals, where complex exponentials replace messy trigonometry.",
    "zh": "复数存在于二维平面上，实部和虚部成为坐标——欧拉公式是让你在矩形形式(a + jb)和极坐标形式(re^(jθ))之间轻松切换的桥梁。这个代数基础对于分析交流电路和频域信号至关重要，其中复指数替代了复杂的三角函数。",
    "emoji": "📐",
    "refs": 1
  },
  "B.2 Sinusoids": {
    "en": "Sinusoids are the building blocks of signal analysis—every periodic waveform you'll encounter starts here. This section breaks down amplitude, frequency, phase, and the crucial relationship between hertz and radians, then shows you how phase shifts translate directly into time delays, making it easy to sketch and manipulate these signals for circuit and system problems.",
    "zh": "正弦信号是信号分析的基础——你遇到的每个周期波形都从这里开始。本节分解了幅度、频率、相位的含义，以及赫兹与弧度之间的关键关系，然后展示相位移动如何直接转化为时间延迟，使你能轻松绘制和操纵这些信号来解决电路和系统问题。",
    "emoji": "〰️",
    "refs": 3
  },
  "B.2": {
    "en": "Sinusoids are the building blocks of signal analysis—every periodic waveform you'll encounter starts here. This section breaks down amplitude, frequency, phase, and the crucial relationship between hertz and radians, then shows you how phase shifts translate directly into time delays, making it easy to sketch and manipulate these signals for circuit and system problems.",
    "zh": "正弦信号是信号分析的基础——你遇到的每个周期波形都从这里开始。本节分解了幅度、频率、相位的含义，以及赫兹与弧度之间的关键关系，然后展示相位移动如何直接转化为时间延迟，使你能轻松绘制和操纵这些信号来解决电路和系统问题。",
    "emoji": "〰️",
    "refs": 3
  },
  "B.2-1 Addition of Sinusoids": {
    "en": "Two sinusoids at the same frequency always combine into a single sinusoid—a result that's fundamental to AC circuit analysis and signal processing. This section derives the exact formulas for the resultant amplitude and phase, then shows how phasors (rotating vectors in the complex plane) make this geometric addition intuitive and visual.",
    "zh": "同频率的两个正弦波总是合成为一个正弦波——这是交流电路分析和信号处理的基础。本节推导合成波的幅度和相位公式，然后用相量（复平面中的旋转向量）直观地展示这种几何加法。",
    "emoji": "➕",
    "refs": 1
  },
  "B.2-1": {
    "en": "Two sinusoids at the same frequency always combine into a single sinusoid—a result that's fundamental to AC circuit analysis and signal processing. This section derives the exact formulas for the resultant amplitude and phase, then shows how phasors (rotating vectors in the complex plane) make this geometric addition intuitive and visual.",
    "zh": "同频率的两个正弦波总是合成为一个正弦波——这是交流电路分析和信号处理的基础。本节推导合成波的幅度和相位公式，然后用相量（复平面中的旋转向量）直观地展示这种几何加法。",
    "emoji": "➕",
    "refs": 1
  },
  "B.3 Sketching Signals": {
    "en": "The time constant is your shortcut for sketching exponential decay—it tells you exactly when a signal drops to 37% of its starting value. This section shows how to use this single number to quickly sketch any decaying exponential without a calculator, making exam sketches fast and accurate.",
    "zh": "时间常数是绘制指数衰减的快捷方法——它告诉你信号何时衰减到初始值的37%。本节展示如何使用这个单一数字快速绘制任何衰减指数，无需计算器，使考试中的草图绘制快速准确。",
    "emoji": "📉",
    "refs": 1
  },
  "B.3": {
    "en": "The time constant is your shortcut for sketching exponential decay—it tells you exactly when a signal drops to 37% of its starting value. This section shows how to use this single number to quickly sketch any decaying exponential without a calculator, making exam sketches fast and accurate.",
    "zh": "时间常数是绘制指数衰减的快捷方法——它告诉你信号何时衰减到初始值的37%。本节展示如何使用这个单一数字快速绘制任何衰减指数，无需计算器，使考试中的草图绘制快速准确。",
    "emoji": "📉",
    "refs": 1
  },
  "B.3-1 Monotonic Exponentials": {
    "en": "Monotonic exponentials form the backbone of real-world signal decay and growth—think of how a battery discharges or how vibrations fade in a damped system. This section connects sinusoids to exponentials through Euler's formula, showing how complex exponentials elegantly unify sines and cosines, and teaches you to sketch these fundamental building blocks that appear in every transient response you'll analyze.",
    "zh": "单调指数信号是现实世界中信号衰减和增长的基础——想象电池放电或阻尼系统中振动衰减的过程。本节通过欧拉公式将正弦波与指数联系起来，展示复指数如何优雅地统一正弦和余弦，并教你绘制这些基本构件，它们出现在你将分析的每个瞬态响应中。",
    "emoji": "📉",
    "refs": 1
  },
  "B.3-1": {
    "en": "Monotonic exponentials form the backbone of real-world signal decay and growth—think of how a battery discharges or how vibrations fade in a damped system. This section connects sinusoids to exponentials through Euler's formula, showing how complex exponentials elegantly unify sines and cosines, and teaches you to sketch these fundamental building blocks that appear in every transient response you'll analyze.",
    "zh": "单调指数信号是现实世界中信号衰减和增长的基础——想象电池放电或阻尼系统中振动衰减的过程。本节通过欧拉公式将正弦波与指数联系起来，展示复指数如何优雅地统一正弦和余弦，并教你绘制这些基本构件，它们出现在你将分析的每个瞬态响应中。",
    "emoji": "📉",
    "refs": 1
  },
  "B.3-2 The Exponentially Varying Sinusoid": {
    "en": "Exponentially varying sinusoids combine two behaviors: a sinusoid that oscillates while an exponential envelope squeezes its amplitude to zero. This section shows how to sketch these signals by treating the decaying exponential and oscillation separately, then multiplying them together—a technique that appears constantly in transient response analysis and damped systems.",
    "zh": "指数衰减的正弦信号结合了两种行为：正弦振荡同时被指数包络压缩其幅度至零。本节展示如何通过分别处理衰减指数和振荡，然后将它们相乘来绘制这些信号——这种技术在瞬态响应分析和阻尼系统中频繁出现。",
    "emoji": "📉",
    "refs": 1
  },
  "B.3-2": {
    "en": "Exponentially varying sinusoids combine two behaviors: a sinusoid that oscillates while an exponential envelope squeezes its amplitude to zero. This section shows how to sketch these signals by treating the decaying exponential and oscillation separately, then multiplying them together—a technique that appears constantly in transient response analysis and damped systems.",
    "zh": "指数衰减的正弦信号结合了两种行为：正弦振荡同时被指数包络压缩其幅度至零。本节展示如何通过分别处理衰减指数和振荡，然后将它们相乘来绘制这些信号——这种技术在瞬态响应分析和阻尼系统中频繁出现。",
    "emoji": "📉",
    "refs": 1
  },
  "B.4 Cramer's Rule": {
    "en": "Cramer's Rule provides a determinant-based formula for solving systems of linear equations—a technique you'll use repeatedly when analyzing circuit equations and system responses. This section shows how to express solutions directly using determinants, plus visualizes how exponential envelopes modulate oscillating signals, a pattern central to damped system behavior.",
    "zh": "克拉默法则通过行列式公式求解线性方程组——这是分析电路方程和系统响应时反复使用的技术。本节展示如何用行列式直接表示解，并可视化指数包络如何调制振荡信号，这是阻尼系统行为的核心模式。",
    "emoji": "🔢",
    "refs": 1
  },
  "B.4": {
    "en": "Cramer's Rule provides a determinant-based formula for solving systems of linear equations—a technique you'll use repeatedly when analyzing circuit equations and system responses. This section shows how to express solutions directly using determinants, plus visualizes how exponential envelopes modulate oscillating signals, a pattern central to damped system behavior.",
    "zh": "克拉默法则通过行列式公式求解线性方程组——这是分析电路方程和系统响应时反复使用的技术。本节展示如何用行列式直接表示解，并可视化指数包络如何调制振荡信号，这是阻尼系统行为的核心模式。",
    "emoji": "🔢",
    "refs": 1
  },
  "B.5 Partial Fraction Expansion": {
    "en": "Partial fraction expansion breaks down complex rational functions into simpler pieces—a crucial technique for inverse Laplace transforms and system analysis. This section distinguishes between proper and improper rational functions, shows how polynomial long division handles the improper case, and reveals the Heaviside method for extracting residues from complex-conjugate pole pairs.",
    "zh": "部分分式展开将复杂的有理函数分解为更简单的部分——这是逆拉普拉斯变换和系统分析的关键技术。本节区分真分式和假分式，展示多项式长除法如何处理假分式情况，并揭示Heaviside方法从复共轭极点对中提取留数的过程。",
    "emoji": "🔀",
    "refs": 3
  },
  "B.5": {
    "en": "Partial fraction expansion breaks down complex rational functions into simpler pieces—a crucial technique for inverse Laplace transforms and system analysis. This section distinguishes between proper and improper rational functions, shows how polynomial long division handles the improper case, and reveals the Heaviside method for extracting residues from complex-conjugate pole pairs.",
    "zh": "部分分式展开将复杂的有理函数分解为更简单的部分——这是逆拉普拉斯变换和系统分析的关键技术。本节区分真分式和假分式，展示多项式长除法如何处理假分式情况，并揭示Heaviside方法从复共轭极点对中提取留数的过程。",
    "emoji": "🔀",
    "refs": 3
  },
  "B.5-1 Method of Clearing Fractions": {
    "en": "Partial fraction expansion breaks complex rational functions into simpler pieces—and the method of clearing fractions is your most direct tool for finding them. By multiplying through by the common denominator and matching coefficients, you'll systematically solve for each unknown constant, a technique that appears constantly on exams whenever you need to invert Laplace transforms or decompose system responses.",
    "zh": "部分分式展开将复杂的有理函数分解为更简单的部分——清分母法是求解这些部分的最直接工具。通过乘以公分母并匹配同次幂系数，你可以系统地求解每个未知常数，这种技术在反演拉普拉斯变换或分解系统响应时频繁出现。",
    "emoji": "🔀",
    "refs": 1
  },
  "B.5-1": {
    "en": "Partial fraction expansion breaks complex rational functions into simpler pieces—and the method of clearing fractions is your most direct tool for finding them. By multiplying through by the common denominator and matching coefficients, you'll systematically solve for each unknown constant, a technique that appears constantly on exams whenever you need to invert Laplace transforms or decompose system responses.",
    "zh": "部分分式展开将复杂的有理函数分解为更简单的部分——清分母法是求解这些部分的最直接工具。通过乘以公分母并匹配同次幂系数，你可以系统地求解每个未知常数，这种技术在反演拉普拉斯变换或分解系统响应时频繁出现。",
    "emoji": "🔀",
    "refs": 1
  },
  "B.5-2 The Heaviside \"Cover-Up\" Method": {
    "en": "The Heaviside cover-up method is a shortcut that replaces tedious algebra with a single evaluation trick—multiply by the factor you want to isolate, then plug in its root. This technique is essential for quickly decomposing rational functions into partial fractions, especially when all denominator factors are distinct, and it's a favorite on exams because it's fast and mechanical once you see the pattern.",
    "zh": "Heaviside掩盖法是一个巧妙的快速技巧，用单次代入替代繁琐的代数运算——将两边同乘要分离的因子，然后代入其根值即可。这种方法对于快速分解有理函数的部分分式至关重要，特别是当分母的所有因子都不重复时，它在考试中很受欢迎，因为一旦掌握规律就能机械地快速求解。",
    "emoji": "🎯",
    "refs": 1
  },
  "B.5-2": {
    "en": "The Heaviside cover-up method is a shortcut that replaces tedious algebra with a single evaluation trick—multiply by the factor you want to isolate, then plug in its root. This technique is essential for quickly decomposing rational functions into partial fractions, especially when all denominator factors are distinct, and it's a favorite on exams because it's fast and mechanical once you see the pattern.",
    "zh": "Heaviside掩盖法是一个巧妙的快速技巧，用单次代入替代繁琐的代数运算——将两边同乘要分离的因子，然后代入其根值即可。这种方法对于快速分解有理函数的部分分式至关重要，特别是当分母的所有因子都不重复时，它在考试中很受欢迎，因为一旦掌握规律就能机械地快速求解。",
    "emoji": "🎯",
    "refs": 1
  },
  "B.5-3 Repeated Factors of Q(x)": {
    "en": "Repeated factors in the denominator require a different partial fraction strategy than simple poles—you can't just cover up and substitute. This section extends the Heaviside cover-up method using differentiation to extract coefficients for repeated roots, a critical technique when the same factor appears multiple times in Q(x).",
    "zh": "分母中的重复因子需要与简单极点不同的部分分式策略——你不能只是遮住并代入。本节通过微分扩展Heaviside覆盖法来提取重复根的系数，这是当同一因子在Q(x)中出现多次时的关键技术。",
    "emoji": "🔄",
    "refs": 1
  },
  "B.5-3": {
    "en": "Repeated factors in the denominator require a different partial fraction strategy than simple poles—you can't just cover up and substitute. This section extends the Heaviside cover-up method using differentiation to extract coefficients for repeated roots, a critical technique when the same factor appears multiple times in Q(x).",
    "zh": "分母中的重复因子需要与简单极点不同的部分分式策略——你不能只是遮住并代入。本节通过微分扩展Heaviside覆盖法来提取重复根的系数，这是当同一因子在Q(x)中出现多次时的关键技术。",
    "emoji": "🔄",
    "refs": 1
  },
  "B.5-4 Partial Fraction Expansion with Repeated Factors": {
    "en": "Repeated factors in the denominator require a different strategy than simple poles—the Heaviside cover-up method alone isn't enough. This section shows how successive differentiation unlocks the coefficients for repeated roots, turning a seemingly complex algebraic puzzle into a systematic procedure that works every time.",
    "zh": "分母中的重根需要不同于简单极点的策略——单独使用Heaviside覆盖法是不够的。本节展示了如何通过逐次求导来解锁重根的系数，将看似复杂的代数问题转化为每次都有效的系统程序。",
    "emoji": "🔄",
    "refs": 1
  },
  "B.5-4": {
    "en": "Repeated factors in the denominator require a different strategy than simple poles—the Heaviside cover-up method alone isn't enough. This section shows how successive differentiation unlocks the coefficients for repeated roots, turning a seemingly complex algebraic puzzle into a systematic procedure that works every time.",
    "zh": "分母中的重根需要不同于简单极点的策略——单独使用Heaviside覆盖法是不够的。本节展示了如何通过逐次求导来解锁重根的系数，将看似复杂的代数问题转化为每次都有效的系统程序。",
    "emoji": "🔄",
    "refs": 1
  },
  "B.5-5 Improper F(x) with m = n": {
    "en": "When the numerator and denominator of a rational function have the same degree, you can't skip the partial fraction setup—there's an extra constant term hiding in the expansion. This section shows why polynomial long division is your first move, then how to find all coefficients using the same techniques as proper fractions.",
    "zh": "当有理函数的分子和分母次数相同时，不能跳过部分分式的设置——展开式中隐藏着一个额外的常数项。本节说明为什么多项式长除法是第一步，然后如何使用与真分式相同的技术来求所有系数。",
    "emoji": "⚖️",
    "refs": 1
  },
  "B.5-5": {
    "en": "When the numerator and denominator of a rational function have the same degree, you can't skip the partial fraction setup—there's an extra constant term hiding in the expansion. This section shows why polynomial long division is your first move, then how to find all coefficients using the same techniques as proper fractions.",
    "zh": "当有理函数的分子和分母次数相同时，不能跳过部分分式的设置——展开式中隐藏着一个额外的常数项。本节说明为什么多项式长除法是第一步，然后如何使用与真分式相同的技术来求所有系数。",
    "emoji": "⚖️",
    "refs": 1
  },
  "B.5-6 Modified Partial Fractions": {
    "en": "Partial fraction expansion gets trickier when you have repeated roots—this is where modified partial fractions save the day. By dividing by x first, expanding, then multiplying back, you unlock a clean form (kx/(x-λᵢ)ʳ) that's essential for inverse z-transforms and handling complex rational functions without messy algebra.",
    "zh": "当遇到重根时，标准部分分式展开会变得复杂——这正是改进型部分分式大显身手的地方。通过先除以x、展开、再乘回x的技巧，你可以得到简洁的形式（kx/(x-λᵢ)ʳ），这对反z变换和处理复杂有理函数至关重要，能避免繁琐的代数运算。",
    "emoji": "🔄",
    "refs": 1
  },
  "B.5-6": {
    "en": "Partial fraction expansion gets trickier when you have repeated roots—this is where modified partial fractions save the day. By dividing by x first, expanding, then multiplying back, you unlock a clean form (kx/(x-λᵢ)ʳ) that's essential for inverse z-transforms and handling complex rational functions without messy algebra.",
    "zh": "当遇到重根时，标准部分分式展开会变得复杂——这正是改进型部分分式大显身手的地方。通过先除以x、展开、再乘回x的技巧，你可以得到简洁的形式（kx/(x-λᵢ)ʳ），这对反z变换和处理复杂有理函数至关重要，能避免繁琐的代数运算。",
    "emoji": "🔄",
    "refs": 1
  },
  "B.6 Vectors and Matrices": {
    "en": "Matrices are the language of linear transformations—they encode how vectors get rotated, scaled, and combined. This section builds from n-dimensional vectors to matrix operations, showing how simultaneous linear equations become elegant matrix multiplications and why the conformability rules matter for your calculations.",
    "zh": "矩阵是线性变换的语言——它们编码向量如何被旋转、缩放和组合。本节从n维向量构建到矩阵运算，展示联立线性方程如何转化为优雅的矩阵乘法，以及为什么相容性规则对你的计算至关重要。",
    "emoji": "🔲",
    "refs": 3
  },
  "B.6": {
    "en": "Matrices are the language of linear transformations—they encode how vectors get rotated, scaled, and combined. This section builds from n-dimensional vectors to matrix operations, showing how simultaneous linear equations become elegant matrix multiplications and why the conformability rules matter for your calculations.",
    "zh": "矩阵是线性变换的语言——它们编码向量如何被旋转、缩放和组合。本节从n维向量构建到矩阵运算，展示联立线性方程如何转化为优雅的矩阵乘法，以及为什么相容性规则对你的计算至关重要。",
    "emoji": "🔲",
    "refs": 3
  },
  "B.6-1 Some Definitions and Properties": {
    "en": "Matrices come in several standard forms—diagonal, identity, zero, and symmetric—each with specific properties that simplify calculations and appear constantly in system analysis. This section establishes the notation and definitions you'll need to work with matrices fluently, including the transpose operation that swaps rows and columns.",
    "zh": "矩阵有多种标准形式——对角矩阵、单位矩阵、零矩阵和对称矩阵——每种都有特定的性质，能简化计算并在系统分析中频繁出现。本节建立了你需要熟练使用矩阵的记号和定义，包括交换行列的转置运算。",
    "emoji": "🔲",
    "refs": 1
  },
  "B.6-1": {
    "en": "Matrices come in several standard forms—diagonal, identity, zero, and symmetric—each with specific properties that simplify calculations and appear constantly in system analysis. This section establishes the notation and definitions you'll need to work with matrices fluently, including the transpose operation that swaps rows and columns.",
    "zh": "矩阵有多种标准形式——对角矩阵、单位矩阵、零矩阵和对称矩阵——每种都有特定的性质，能简化计算并在系统分析中频繁出现。本节建立了你需要熟练使用矩阵的记号和定义，包括交换行列的转置运算。",
    "emoji": "🔲",
    "refs": 1
  },
  "B.6-2 Matrix Algebra": {
    "en": "Matrix algebra forms the computational backbone for analyzing multi-input, multi-output systems and solving coupled differential equations. This section covers the essential operations—addition, scalar multiplication, and the foundations of matrix multiplication—that you'll use constantly when working with state-space representations and system matrices on exams.",
    "zh": "矩阵代数是分析多输入多输出系统和求解耦合微分方程的计算基础。本节介绍基本运算——加法、标量乘法和矩阵乘法的基础——这些是你在考试中处理状态空间表示和系统矩阵时必须掌握的工具。",
    "emoji": "📊",
    "refs": 1
  },
  "B.6-2": {
    "en": "Matrix algebra forms the computational backbone for analyzing multi-input, multi-output systems and solving coupled differential equations. This section covers the essential operations—addition, scalar multiplication, and the foundations of matrix multiplication—that you'll use constantly when working with state-space representations and system matrices on exams.",
    "zh": "矩阵代数是分析多输入多输出系统和求解耦合微分方程的计算基础。本节介绍基本运算——加法、标量乘法和矩阵乘法的基础——这些是你在考试中处理状态空间表示和系统矩阵时必须掌握的工具。",
    "emoji": "📊",
    "refs": 1
  },
  "B.6-5 Background - Problems": {
    "en": "This problem set reinforces two essential mathematical tools: decomposing rational functions into partial fractions and using matrix methods to solve linear systems. You'll practice both hand calculations and systematic approaches that directly apply to finding signal constants, analyzing system responses, and solving the kinds of equations that appear throughout signals and systems coursework.",
    "zh": "本题集强化了两个关键数学工具：将有理函数分解为部分分式，以及使用矩阵方法求解线性方程组。你将练习手工计算和系统方法，这些直接应用于求信号常数、分析系统响应，以及求解信号与系统课程中常见的方程。",
    "emoji": "📋",
    "refs": 1
  },
  "B.6-5": {
    "en": "This problem set reinforces two essential mathematical tools: decomposing rational functions into partial fractions and using matrix methods to solve linear systems. You'll practice both hand calculations and systematic approaches that directly apply to finding signal constants, analyzing system responses, and solving the kinds of equations that appear throughout signals and systems coursework.",
    "zh": "本题集强化了两个关键数学工具：将有理函数分解为部分分式，以及使用矩阵方法求解线性方程组。你将练习手工计算和系统方法，这些直接应用于求信号常数、分析系统响应，以及求解信号与系统课程中常见的方程。",
    "emoji": "📋",
    "refs": 1
  },
  "B.7 MATLAB: Elementary Operations": {
    "en": "MATLAB's plotting and matrix tools turn abstract math into visual insights and computational solutions. This section shows how to annotate plots with labels and titles, visualize complex roots on the unit circle, and solve systems of linear equations using matrix operations—essential skills for verifying your signal processing calculations by hand and in code.",
    "zh": "MATLAB的绘图和矩阵工具将抽象数学转化为可视化洞察和计算解决方案。本节展示如何用标签和标题注释图表、在单位圆上可视化复数根，以及使用矩阵运算求解线性方程组——这些是验证信号处理计算的必备技能。",
    "emoji": "📊",
    "refs": 3
  },
  "B.7": {
    "en": "MATLAB's plotting and matrix tools turn abstract math into visual insights and computational solutions. This section shows how to annotate plots with labels and titles, visualize complex roots on the unit circle, and solve systems of linear equations using matrix operations—essential skills for verifying your signal processing calculations by hand and in code.",
    "zh": "MATLAB的绘图和矩阵工具将抽象数学转化为可视化洞察和计算解决方案。本节展示如何用标签和标题注释图表、在单位圆上可视化复数根，以及使用矩阵运算求解线性方程组——这些是验证信号处理计算的必备技能。",
    "emoji": "📊",
    "refs": 3
  },
  "B.7-1 MATLAB Overview": {
    "en": "MATLAB's workspace is where all your variables live—and knowing how to navigate it with commands like whos, clear, and save is essential for efficient problem-solving in signals and systems. This section shows you how to organize, inspect, and persist your work across sessions, turning MATLAB from a calculator into a reproducible computational environment.",
    "zh": "MATLAB的工作区是所有变量的存储地——掌握whos、clear和save等命令对于在信号与系统中高效求解至关重要。本节介绍如何组织、检查和跨会话保存你的工作，将MATLAB从简单计算器转变为可重复的计算环境。",
    "emoji": "💾",
    "refs": 1
  },
  "B.7-1": {
    "en": "MATLAB's workspace is where all your variables live—and knowing how to navigate it with commands like whos, clear, and save is essential for efficient problem-solving in signals and systems. This section shows you how to organize, inspect, and persist your work across sessions, turning MATLAB from a calculator into a reproducible computational environment.",
    "zh": "MATLAB的工作区是所有变量的存储地——掌握whos、clear和save等命令对于在信号与系统中高效求解至关重要。本节介绍如何组织、检查和跨会话保存你的工作，将MATLAB从简单计算器转变为可重复的计算环境。",
    "emoji": "💾",
    "refs": 1
  },
  "B.7-2 Calculator Operations": {
    "en": "MATLAB functions as a powerful calculator, but first you need to know how to ask for help—this section shows you the help commands and navigation tools that let you quickly find what you need. You'll also master scalar arithmetic and complex number operations using MATLAB's built-in constants, skills that form the foundation for every computation you'll run.",
    "zh": "MATLAB 可以作为强大的计算器，但首先你需要知道如何寻求帮助——本节介绍帮助命令和导航工具，让你快速找到所需信息。你还将掌握标量运算和复数操作，这些基础技能是你运行任何计算的基础。",
    "emoji": "🧮",
    "refs": 1
  },
  "B.7-2": {
    "en": "MATLAB functions as a powerful calculator, but first you need to know how to ask for help—this section shows you the help commands and navigation tools that let you quickly find what you need. You'll also master scalar arithmetic and complex number operations using MATLAB's built-in constants, skills that form the foundation for every computation you'll run.",
    "zh": "MATLAB 可以作为强大的计算器，但首先你需要知道如何寻求帮助——本节介绍帮助命令和导航工具，让你快速找到所需信息。你还将掌握标量运算和复数操作，这些基础技能是你运行任何计算的基础。",
    "emoji": "🧮",
    "refs": 1
  },
  "B.7-3 Vector Operations": {
    "en": "MATLAB's colon notation (a:b:c) transforms tedious manual calculations into one-line vector operations—perfect for generating sequences of roots, powers, and complex logarithms all at once. This section shows how Euler's formula and vectorized functions let you compute cube roots of –1 or find all 100th roots simultaneously, a technique that appears constantly in signal processing when analyzing poles and zeros.",
    "zh": "MATLAB的冒号记号(a:b:c)将繁琐的手工计算转化为一行向量操作——非常适合一次性生成根、幂次和复对数的序列。本节展示欧拉公式和向量化函数如何让你同时计算–1的立方根或找到所有100次根，这种技术在分析极点和零点时频繁出现在信号处理中。",
    "emoji": "🔢",
    "refs": 1
  },
  "B.7-3": {
    "en": "MATLAB's colon notation (a:b:c) transforms tedious manual calculations into one-line vector operations—perfect for generating sequences of roots, powers, and complex logarithms all at once. This section shows how Euler's formula and vectorized functions let you compute cube roots of –1 or find all 100th roots simultaneously, a technique that appears constantly in signal processing when analyzing poles and zeros.",
    "zh": "MATLAB的冒号记号(a:b:c)将繁琐的手工计算转化为一行向量操作——非常适合一次性生成根、幂次和复对数的序列。本节展示欧拉公式和向量化函数如何让你同时计算–1的立方根或找到所有100次根，这种技术在分析极点和零点时频繁出现在信号处理中。",
    "emoji": "🔢",
    "refs": 1
  },
  "B.7-4 Simple Plotting": {
    "en": "MATLAB's plot command turns vectors into graphs, but there's a critical gotcha: vector indices start at 1, not 0, and they don't automatically align with your actual time or frequency values. This section shows how to create a 10 Hz sinusoid, evaluate it at the right points, and visualize it correctly—essential skills for any signal you'll need to display in homework or exams.",
    "zh": "MATLAB的plot命令能将向量转化为图形，但有一个关键陷阱：向量索引从1开始而非0，且不会自动对应你的实际时间或频率值。本节展示如何创建10 Hz正弦波、在正确的点进行求值，以及正确地将其可视化——这些是你在作业或考试中显示任何信号所需的基本技能。",
    "emoji": "📈",
    "refs": 1
  },
  "B.7-4": {
    "en": "MATLAB's plot command turns vectors into graphs, but there's a critical gotcha: vector indices start at 1, not 0, and they don't automatically align with your actual time or frequency values. This section shows how to create a 10 Hz sinusoid, evaluate it at the right points, and visualize it correctly—essential skills for any signal you'll need to display in homework or exams.",
    "zh": "MATLAB的plot命令能将向量转化为图形，但有一个关键陷阱：向量索引从1开始而非0，且不会自动对应你的实际时间或频率值。本节展示如何创建10 Hz正弦波、在正确的点进行求值，以及正确地将其可视化——这些是你在作业或考试中显示任何信号所需的基本技能。",
    "emoji": "📈",
    "refs": 1
  },
  "B.7-5 Element-by-Element Operations": {
    "en": "Element-by-element operations are what make MATLAB practical for signal processing—they let you multiply, divide, and exponentiate vectors term-by-term without reshaping matrices. This section shows you when to use .*, ./, and .^ instead of their matrix cousins, and how to layer multiple signals (like a sinusoid inside an exponential envelope) on a single plot with proper labels and legends.",
    "zh": "逐元素运算是MATLAB在信号处理中的实用工具——它们让你可以对向量逐项进行乘法、除法和幂运算，而无需重塑矩阵。本节展示何时使用 .*、./ 和 .^ 而不是矩阵运算，以及如何在单个图形上叠加多个信号（如指数包络内的正弦波），并添加适当的标签和图例。",
    "emoji": "⊙",
    "refs": 1
  },
  "B.7-5": {
    "en": "Element-by-element operations are what make MATLAB practical for signal processing—they let you multiply, divide, and exponentiate vectors term-by-term without reshaping matrices. This section shows you when to use .*, ./, and .^ instead of their matrix cousins, and how to layer multiple signals (like a sinusoid inside an exponential envelope) on a single plot with proper labels and legends.",
    "zh": "逐元素运算是MATLAB在信号处理中的实用工具——它们让你可以对向量逐项进行乘法、除法和幂运算，而无需重塑矩阵。本节展示何时使用 .*、./ 和 .^ 而不是矩阵运算，以及如何在单个图形上叠加多个信号（如指数包络内的正弦波），并添加适当的标签和图例。",
    "emoji": "⊙",
    "refs": 1
  },
  "B.7-6 Matrix Operations": {
    "en": "MATLAB treats matrices as its native language, and this section shows you how to build them efficiently using built-in functions like ones(), zeros(), and eye(). You'll see how square bracket notation with spaces or commas creates row and column vectors, plus how to visualize multiple signals side-by-side—essential skills for any computational problem in signals and systems.",
    "zh": "MATLAB 以矩阵作为其原生语言，本节展示如何使用 ones()、zeros() 和 eye() 等内置函数高效地构建矩阵。你将学会用方括号记号（用空格或逗号分隔元素）创建行向量和列向量，以及如何并排可视化多个信号——这些都是信号与系统计算问题中的必备技能。",
    "emoji": "🔲",
    "refs": 1
  },
  "B.7-6": {
    "en": "MATLAB treats matrices as its native language, and this section shows you how to build them efficiently using built-in functions like ones(), zeros(), and eye(). You'll see how square bracket notation with spaces or commas creates row and column vectors, plus how to visualize multiple signals side-by-side—essential skills for any computational problem in signals and systems.",
    "zh": "MATLAB 以矩阵作为其原生语言，本节展示如何使用 ones()、zeros() 和 eye() 等内置函数高效地构建矩阵。你将学会用方括号记号（用空格或逗号分隔元素）创建行向量和列向量，以及如何并排可视化多个信号——这些都是信号与系统计算问题中的必备技能。",
    "emoji": "🔲",
    "refs": 1
  },
  "B.7-7 Partial Fraction Expansions": {
    "en": "Partial fraction expansions break complex rational functions into simpler pieces—and MATLAB's residue command does the heavy lifting for you. This section shows how to use residue to find coefficients, poles, and direct terms automatically, including tricky cases with repeated roots, plus a quick look at residuez for discrete-time systems.",
    "zh": "部分分式展开将复杂的有理函数分解成更简单的部分——MATLAB的residue命令可以自动完成这项工作。本节展示如何使用residue找到系数、极点和直接项，包括处理重根的复杂情况，还简要介绍了用于离散时间系统的residuez函数。",
    "emoji": "🔧",
    "refs": 1
  },
  "B.7-7": {
    "en": "Partial fraction expansions break complex rational functions into simpler pieces—and MATLAB's residue command does the heavy lifting for you. This section shows how to use residue to find coefficients, poles, and direct terms automatically, including tricky cases with repeated roots, plus a quick look at residuez for discrete-time systems.",
    "zh": "部分分式展开将复杂的有理函数分解成更简单的部分——MATLAB的residue命令可以自动完成这项工作。本节展示如何使用residue找到系数、极点和直接项，包括处理重根的复杂情况，还简要介绍了用于离散时间系统的residuez函数。",
    "emoji": "🔧",
    "refs": 1
  },
  "B.8-10 Solution of Quadratic and Cubic Equations": {
    "en": "L'Hôpital's Rule and polynomial solving techniques form the algebraic backbone for handling limits and equation solutions that appear throughout signals analysis. This section covers the quadratic formula, Cardano's method for cubic equations, and how to transform complex cubics into simpler depressed forms—essential tools when characteristic equations arise in system analysis.",
    "zh": "洛必达法则和多项式求解技术构成了信号分析中处理极限和方程求解的代数基础。本节涵盖二次公式、三次方程的卡尔达诺方法，以及如何将复杂三次方程转化为更简单的压低三次方程——这些是系统分析中特征方程出现时的必备工具。",
    "emoji": "🔢",
    "refs": 1
  },
  "B.8-10": {
    "en": "L'Hôpital's Rule and polynomial solving techniques form the algebraic backbone for handling limits and equation solutions that appear throughout signals analysis. This section covers the quadratic formula, Cardano's method for cubic equations, and how to transform complex cubics into simpler depressed forms—essential tools when characteristic equations arise in system analysis.",
    "zh": "洛必达法则和多项式求解技术构成了信号分析中处理极限和方程求解的代数基础。本节涵盖二次公式、三次方程的卡尔达诺方法，以及如何将复杂三次方程转化为更简单的压低三次方程——这些是系统分析中特征方程出现时的必备工具。",
    "emoji": "🔢",
    "refs": 1
  },
  "B.8-3 Appendix: Useful Mathematical Formulas": {
    "en": "This appendix collects the mathematical formulas you'll reach for repeatedly—from Euler's formula and complex number identities to geometric series and power sums. Having these at your fingertips saves time on exams and lets you focus on the signals and systems concepts rather than deriving basics.",
    "zh": "这个附录汇集了你会反复使用的数学公式——从欧拉公式和复数恒等式到几何级数和幂和。将这些公式放在手边可以节省考试时间，让你专注于信号与系统的概念，而不是推导基础知识。",
    "emoji": "📋",
    "refs": 1
  },
  "B.8-3": {
    "en": "This appendix collects the mathematical formulas you'll reach for repeatedly—from Euler's formula and complex number identities to geometric series and power sums. Having these at your fingertips saves time on exams and lets you focus on the signals and systems concepts rather than deriving basics.",
    "zh": "这个附录汇集了你会反复使用的数学公式——从欧拉公式和复数恒等式到几何级数和幂和。将这些公式放在手边可以节省考试时间，让你专注于信号与系统的概念，而不是推导基础知识。",
    "emoji": "📋",
    "refs": 1
  },
  "B.8-6 Appendix: Useful Mathematical Formulas": {
    "en": "This reference page collects the mathematical formulas you'll reach for constantly: Taylor and Maclaurin series for function approximation, power series expansions for exponentials and trig functions, and the trigonometric identities (including Euler's formula) that appear throughout signal analysis. Bookmark this—you'll use it on every exam.",
    "zh": "这个参考页汇集了你在信号处理中经常需要的数学公式：泰勒级数和麦克劳林级数用于函数近似，指数和三角函数的幂级数展开，以及贯穿信号分析的三角恒等式（包括欧拉公式）。收藏这一页——考试中会频繁用到。",
    "emoji": "📋",
    "refs": 1
  },
  "B.8-6": {
    "en": "This reference page collects the mathematical formulas you'll reach for constantly: Taylor and Maclaurin series for function approximation, power series expansions for exponentials and trig functions, and the trigonometric identities (including Euler's formula) that appear throughout signal analysis. Bookmark this—you'll use it on every exam.",
    "zh": "这个参考页汇集了你在信号处理中经常需要的数学公式：泰勒级数和麦克劳林级数用于函数近似，指数和三角函数的幂级数展开，以及贯穿信号分析的三角恒等式（包括欧拉公式）。收藏这一页——考试中会频繁用到。",
    "emoji": "📋",
    "refs": 1
  },
  "B.8-7 Common Derivative Formulas": {
    "en": "Derivative formulas are your computational backbone—this reference page collects all the standard rules (power, product, quotient, chain) and derivatives of polynomials, exponentials, logarithms, and trig functions in one place. Paired with essential trigonometric identities (angle addition, power reduction, product-to-sum), this section is your go-to lookup when transforming signals and solving differential equations on exams.",
    "zh": "导数公式是你的计算基础——这个参考页面汇集了所有标准法则（幂法则、乘积法则、商法则、链式法则）以及多项式、指数、对数和三角函数的导数。结合基本的三角恒等式（角度加法、幂次化简、积化和差），这一部分是你在考试中变换信号和求解微分方程时的必查手册。",
    "emoji": "📋",
    "refs": 1
  },
  "B.8-7": {
    "en": "Derivative formulas are your computational backbone—this reference page collects all the standard rules (power, product, quotient, chain) and derivatives of polynomials, exponentials, logarithms, and trig functions in one place. Paired with essential trigonometric identities (angle addition, power reduction, product-to-sum), this section is your go-to lookup when transforming signals and solving differential equations on exams.",
    "zh": "导数公式是你的计算基础——这个参考页面汇集了所有标准法则（幂法则、乘积法则、商法则、链式法则）以及多项式、指数、对数和三角函数的导数。结合基本的三角恒等式（角度加法、幂次化简、积化和差），这一部分是你在考试中变换信号和求解微分方程时的必查手册。",
    "emoji": "📋",
    "refs": 1
  },
  "B.8-8 Indefinite Integrals": {
    "en": "This reference table collects the indefinite integral formulas you'll need most often—from integration by parts to tricky products of exponentials and trig functions. Rather than deriving each one during an exam, you can verify your integration technique against these standard forms and catch errors before they propagate through your Laplace transform or Fourier analysis work.",
    "zh": "这个参考表汇总了你最常用的不定积分公式——从分部积分到指数函数与三角函数的复杂乘积。与其在考试中逐个推导，不如用这些标准形式来验证你的积分技巧，在错误传播到拉普拉斯变换或傅里叶分析之前就发现问题。",
    "emoji": "∫",
    "refs": 1
  },
  "B.8-8": {
    "en": "This reference table collects the indefinite integral formulas you'll need most often—from integration by parts to tricky products of exponentials and trig functions. Rather than deriving each one during an exam, you can verify your integration technique against these standard forms and catch errors before they propagate through your Laplace transform or Fourier analysis work.",
    "zh": "这个参考表汇总了你最常用的不定积分公式——从分部积分到指数函数与三角函数的复杂乘积。与其在考试中逐个推导，不如用这些标准形式来验证你的积分技巧，在错误传播到拉普拉斯变换或傅里叶分析之前就发现问题。",
    "emoji": "∫",
    "refs": 1
  },
  "1.4 Describing a Triangle Function with the Unit Step": {
    "en": "Piecewise signals like triangles aren't as complicated as they look—unit step functions let you write them as clean mathematical expressions. This section shows how to decompose a triangular waveform into ramps and gates, then reconstruct it using step functions, a technique that's essential for analyzing real-world signals in exams and applications.",
    "zh": "三角形波形这样的分段信号看起来很复杂，但单位阶跃函数能让你用简洁的数学表达式描述它们。本节展示如何将三角波形分解为斜坡和门脉冲，然后用阶跃函数重新组合，这是考试和实际应用中分析真实信号的关键技巧。",
    "emoji": "📐",
    "refs": 7
  },
  "1.4": {
    "en": "Piecewise signals like triangles aren't as complicated as they look—unit step functions let you write them as clean mathematical expressions. This section shows how to decompose a triangular waveform into ramps and gates, then reconstruct it using step functions, a technique that's essential for analyzing real-world signals in exams and applications.",
    "zh": "三角形波形这样的分段信号看起来很复杂，但单位阶跃函数能让你用简洁的数学表达式描述它们。本节展示如何将三角波形分解为斜坡和门脉冲，然后用阶跃函数重新组合，这是考试和实际应用中分析真实信号的关键技巧。",
    "emoji": "📐",
    "refs": 7
  },
  "B.2-2 Sinusoids in Terms of Exponentials": {
    "en": "Euler's formula reveals the hidden connection between sinusoids and complex exponentials, showing that cos(ωt) and sin(ωt) are actually the real and imaginary parts of e^(jωt). This perspective transforms how you analyze AC circuits, modulation, and frequency-domain problems—mastering this bridge is essential for understanding why engineers prefer working with complex exponentials on exams.",
    "zh": "欧拉公式揭示了正弦波与复指数之间的隐藏联系，表明 cos(ωt) 和 sin(ωt) 实际上是 e^(jωt) 的实部和虚部。这个视角改变了你分析交流电路、调制和频域问题的方式——掌握这个桥梁对于理解工程师为什么更喜欢在考试中使用复指数至关重要。",
    "emoji": "🌉",
    "refs": 1
  },
  "B.5-2 Heaviside Cover-Up Method": {
    "en": "The Heaviside cover-up method is a clever algebraic trick that lets you find partial fraction coefficients in seconds instead of solving systems of equations. When your denominator factors into distinct linear terms, this technique eliminates the tedious algebra—you literally \"cover up\" factors and substitute strategic values to extract each coefficient instantly.",
    "zh": "Heaviside覆盖法是一个巧妙的代数技巧，能让你在几秒内求出部分分式系数，而不必求解方程组。当分母分解为不同的线性因子时，这种方法消除了繁琐的代数运算——你只需\"覆盖\"某些因子并代入特定值就能立即提取每个系数。",
    "emoji": "⚡",
    "refs": 1
  },
  "B.5-4 A Combination of Heaviside and Clearing Fractions": {
    "en": "When your partial fraction expansion has repeated factors, the standard cover-up method alone falls short—you'll need to combine it with strategic differentiation and algebraic clearing. This hybrid technique lets you efficiently find all coefficients without getting bogged down in messy systems of equations, making it essential for tackling complex rational functions on exams.",
    "zh": "当部分分式展开式中出现重根时，单纯的留数法（cover-up method）已经不够用了——你需要将其与有策略的求导和代数消元相结合。这种混合技巧能让你高效地求出所有系数，避免陷入复杂的方程组，是考试中处理复杂有理函数的关键。",
    "emoji": "🔄",
    "refs": 1
  },
  "B.5-5 Improper F(x) with m=n": {
    "en": "When your numerator and denominator have the same degree, you can't jump straight to partial fractions—polynomial long division comes first. This technique separates the rational function into a polynomial plus a proper fraction, which then becomes manageable for standard partial fraction decomposition. Mastering this step prevents common errors on exams where improper fractions trip up unprepared students.",
    "zh": "当分子和分母的次数相同时，不能直接进行部分分式分解，必须先进行多项式长除法。这种技巧将有理函数分解为多项式加上真分式，然后才能用标准的部分分式分解方法处理。掌握这一步骤能避免考试中许多学生在处理假分式时犯的常见错误。",
    "emoji": "➗",
    "refs": 1
  },
  "B.8 Appendix: Useful Mathematical Formulas": {
    "en": "This appendix collects the essential mathematical formulas you'll repeatedly reach for while solving signals and systems problems—trigonometric identities, derivatives, integrals, and algebraic manipulations all in one place. Having these formulas at your fingertips during problem-solving and exams saves time and reduces errors when you need to focus on the signals concepts rather than formula derivation.",
    "zh": "本附录汇集了你在解决信号与系统问题时会反复使用的基本数学公式——三角恒等式、导数规则、积分表和代数运算都集中在一处。在解题和考试中随时查阅这些公式可以节省时间，减少错误，让你能够专注于信号概念而不是公式推导。",
    "emoji": "📋",
    "refs": 1
  },
  "1.1-1 Signal Energy": {
    "en": "Signal energy measures the total power contained in a finite-duration signal by integrating the square of its amplitude over time. This metric is essential for comparing signal magnitudes and appears frequently in exam problems involving signal classification and power calculations.",
    "zh": "信号能量通过对信号幅度平方在时间上的积分来衡量有限持续时间信号中包含的总功率。这个指标对于比较信号大小和在考试中涉及信号分类及功率计算的问题中频繁出现。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.1-2 Signal Power": {
    "en": "Signal power measures how much energy a signal delivers on average over time—think of it as the steady hum of an engine rather than the total fuel burned. This concept becomes essential when dealing with infinite-duration signals where total energy would be undefined, making power the practical metric for comparing signal magnitudes on exams.",
    "zh": "信号功率衡量信号在一段时间内平均传递的能量——可以想象为引擎的稳定功率输出而非总燃料消耗。当处理无限持续时间的信号时这个概念至关重要，因为总能量会趋于无穷，因此功率成为考试中比较信号大小的实用指标。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.2 Some Useful Signal Operations": {
    "en": "Shifting, scaling, and reversal are the three fundamental moves you can perform on any signal—think of them as the basic edits in a signal's timeline. These operations show up constantly in filtering, modulation, and system analysis, making them essential tools for solving exam problems where you need to transform signals in time or amplitude.",
    "zh": "平移、缩放和反转是你可以对任何信号执行的三个基本操作——可以把它们看作信号时间轴上的基本编辑。这些操作在滤波、调制和系统分析中频繁出现，是解决需要在时间或幅度上变换信号的考试问题的必备工具。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.2-4 Combined Operations": {
    "en": "Real exam problems throw multiple operations at you simultaneously—what happens when you shift AND scale a signal, or reverse it AND then delay it? This section breaks down the correct sequence for combining transformations, because the order matters critically. Mastering these combinations is what separates confident problem-solvers from those who second-guess themselves on test day.",
    "zh": "真实考试题目往往同时应用多个操作——当你既要移位又要缩放一个信号时会发生什么？或者先反转再延迟？本节讲解组合变换的正确顺序，因为操作的先后顺序至关重要。掌握这些组合变换是区分考试中自信答题者和犹豫不决者的关键。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.3 Classification of Signals": {
    "en": "Signals come in different flavors, and knowing which type you're dealing with determines your entire analysis strategy. This section breaks down the major classifications—continuous versus discrete, periodic versus aperiodic, and energy versus power signals—so you can pick the right tools for the job on exams.",
    "zh": "信号有不同的类型，识别信号属于哪一类决定了你的整个分析策略。本节介绍主要分类——连续与离散、周期与非周期、能量与功率信号——帮助你在考试中选择正确的分析工具。",
    "emoji": "🏷️",
    "refs": 1
  },
  "1.3-1 Continuous-Time and Discrete-Time Signals": {
    "en": "Signals come in two fundamental flavors: continuous-time signals exist at every moment in time (like your heartbeat as a smooth curve), while discrete-time signals only have values at specific intervals (like your heart rate measured once per second). This distinction shapes everything about how you'll analyze and process signals on exams.",
    "zh": "信号有两种基本形式：连续时间信号在时间的每一刻都有定义（就像心跳的平滑曲线），而离散时间信号只在特定时刻有值（就像每秒测量一次心率）。这个区分决定了你在考试中如何分析和处理信号的方式。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.3-2 Analog and Digital Signals": {
    "en": "The real world speaks in analog—continuous signals that can take any value—but computers only understand digital: discrete, quantized levels. This section reveals why your smartphone converts sound waves into 1s and 0s, and what information gets lost (or preserved) in that conversion. Mastering this distinction is essential for understanding sampling, quantization, and why some signals need analog-to-digital converters.",
    "zh": "现实世界用模拟信号说话——连续信号可以取任何值——但计算机只能理解数字信号：离散的、量化的电平。本节揭示了你的智能手机如何将声波转换为1和0，以及在这个转换过程中哪些信息会丢失（或保留）。掌握这一区别对于理解采样、量化和为什么某些信号需要模数转换器至关重要。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.3-4 Energy and Power Signals": {
    "en": "Signals split into two fundamental categories: those with finite energy (like a brief pulse that eventually dies out) and those with finite power (like an endless sinusoid that keeps going forever). This classification matters because it determines which mathematical tools you'll use for analysis and which theorems apply to your problem on exams.",
    "zh": "信号分为两个基本类别：有限能量信号（如最终衰减的脉冲）和有限功率信号（如永远持续的正弦波）。这个分类很重要，因为它决定了你在分析中使用哪些数学工具，以及在考试中哪些定理适用于你的问题。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.3-5 Deterministic and Random Signals": {
    "en": "Some signals follow predictable mathematical rules you can write down exactly, while others behave unpredictably and need statistical descriptions instead. This section shows you how to tell them apart and why the tools for analyzing each type are completely different—a crucial fork in the road between deterministic and probabilistic signal analysis.",
    "zh": "有些信号遵循可以精确写下的数学规则，而其他信号则表现得不可预测，需要用统计方法来描述。本节教你如何区分这两种信号，以及为什么分析每种信号的工具完全不同——这是确定性信号分析和概率信号分析之间的关键分岔点。",
    "emoji": "🎲",
    "refs": 1
  },
  "1.4 Some Useful Signal Models": {
    "en": "Three mathematical idealizations—the unit step, impulse, and complex exponential—form the foundation for analyzing real systems. These signal models appear repeatedly in exam problems because they're both mathematically tractable and physically meaningful, making them essential tools for decomposing and understanding more complex signals.",
    "zh": "单位阶跃、冲激和复指数这三个数学理想化模型是分析实际系统的基础。这些信号模型在考试题中频繁出现，因为它们既在数学上易于处理，又具有物理意义，是分解和理解复杂信号的必备工具。",
    "emoji": "📦",
    "refs": 1
  },
  "1.4-3 The Exponential Function e^st": {
    "en": "The complex exponential e^(st) is the Swiss Army knife of signal processing—a single formula that captures DC signals, growing/decaying exponentials, and sinusoids all at once. This section shows why e^(st) is the natural input for LTI systems and how its real and imaginary parts reveal the behavior of any signal you'll encounter on exams.",
    "zh": "复指数e^(st)是信号处理中的万能工具——一个公式就能同时表示直流信号、增长/衰减指数和正弦波。本节讲解为什么e^(st)是LTI系统的自然输入，以及它的实部和虚部如何揭示考试中任何信号的行为特征。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.5 Even and Odd Functions": {
    "en": "Every signal hides a secret structure: it can always be decomposed into an even part (mirror-symmetric) and an odd part (antisymmetric). This decomposition isn't just elegant—it's a powerful tool that simplifies Fourier analysis, reduces computation, and reveals hidden symmetries in systems. Recognizing even and odd functions will save you time on exams and deepen your intuition about signal behavior.",
    "zh": "每个信号都隐藏着一个秘密结构：它总是可以分解为偶函数部分（镜像对称）和奇函数部分（反对称）。这种分解不仅优雅，而且是简化傅里叶分析、减少计算量和揭示系统隐藏对称性的强大工具。识别偶函数和奇函数将为你节省考试时间，并加深你对信号行为的直觉理解。",
    "emoji": "🪞",
    "refs": 1
  },
  "1.5-1 Some Properties of Even and Odd Functions": {
    "en": "Even and odd functions have special multiplication and integration properties that can dramatically simplify your calculations. When you multiply or integrate combinations of even and odd functions, the results follow predictable patterns—mastering these rules means you can often eliminate half the terms in Fourier analysis problems without doing the full computation.",
    "zh": "偶函数和奇函数的乘法与积分具有特殊性质，能够显著简化你的计算过程。当你将偶函数和奇函数的组合进行乘法或积分运算时，结果遵循可预测的规律——掌握这些规则意味着在傅里叶分析问题中，你往往可以跳过一半的项而无需完整计算。",
    "emoji": "⚖️",
    "refs": 1
  },
  "1.7-1 Linear and Nonlinear Systems": {
    "en": "The difference between linear and nonlinear systems determines whether you can use superposition to break complex problems into simpler pieces. Linear systems obey a fundamental rule: the response to a sum of inputs equals the sum of individual responses—this is what makes LTI analysis tractable on exams. Nonlinear systems shatter this assumption, which is why most real-world problems are either approximated as linear or require completely different solution techniques.",
    "zh": "线性系统和非线性系统的区别决定了你是否能用叠加原理将复杂问题分解成简单部分。线性系统遵循一个基本规则：对输入之和的响应等于各个响应之和——这正是LTI分析在考试中可行的原因。非线性系统打破了这一假设，这就是为什么大多数现实问题要么被近似为线性，要么需要完全不同的求解技术。",
    "emoji": "⚖️",
    "refs": 1
  },
  "1.7-3 Instantaneous and Dynamic Systems": {
    "en": "Some systems respond instantly to what you feed them right now—like a simple amplifier that just scales the input. Others have memory, storing past information to shape their current output—like a capacitor that remembers its charge. This section separates these two fundamentally different behaviors and explains why dynamic systems require differential equations while instantaneous ones don't.",
    "zh": "有些系统只对当前输入立即做出响应——就像一个简单的放大器只是缩放输入。而其他系统具有记忆性，存储过去的信息来影响当前输出——就像电容器记住其电荷一样。本节区分这两种根本不同的行为，并解释为什么动态系统需要微分方程，而瞬时系统则不需要。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.7-6 Analog and Digital Systems": {
    "en": "Analog systems work with continuous signals flowing through physical circuits, while digital systems chop those signals into discrete samples and process them mathematically. You'll encounter both on exams, and knowing their fundamental differences—continuous vs. discrete, hardware vs. computation—is essential for analyzing real-world applications from audio equipment to smartphones.",
    "zh": "模拟系统处理通过物理电路流动的连续信号，而数字系统将信号分割成离散样本并进行数学处理。考试中会同时出现这两种系统，理解它们的根本区别——连续与离散、硬件与计算——对分析从音频设备到智能手机等实际应用至关重要。",
    "emoji": "🔄",
    "refs": 1
  },
  "B.1-1 A Historical Note": {
    "en": "Complex numbers were not accepted overnight—for centuries, mathematicians dismissed √(−1) as meaningless. This section traces how \"impossible\" numbers became indispensable tools for engineering and signal analysis.",
    "zh": "复数并非一开始就被接受——几个世纪里，数学家们认为 √(−1) 毫无意义。这一节追溯了这些不可能的数如何从被排斥到成为工程与信号分析不可或缺的工具。",
    "emoji": "📜",
    "refs": 1
  }
};
// ── END SECTION_PREVIEWS_NEW ──

// ── Syllabus: OLD book (2nd Ed, scanned) ──────────────────────────────
const syllabusDataOld = [
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

// ── Syllabus: NEW book (3rd Ed, digital) ──────────────────────────────
const syllabusDataNew = [
  {
    chapter: 'B Background',
    sections: [
      { title: 'B.1 Complex Numbers', subsections: ['B.1-1 A Historical Note', 'B.1-2 Algebra of Complex Numbers'] },
      { title: 'B.2 Sinusoids', subsections: ['B.2-1 Addition of Sinusoids', 'B.2-2 Sinusoids in Terms of Exponentials'] },
      { title: 'B.3 Sketching Signals', subsections: ['B.3-1 Monotonic Exponentials', 'B.3-2 The Exponentially Varying Sinusoid'] },
      { title: "B.4 Cramer's Rule", subsections: [] },
      { title: 'B.5 Partial Fraction Expansion', subsections: ['B.5-1 Method of Clearing Fractions', 'B.5-2 Heaviside Cover-Up Method', 'B.5-3 Repeated Factors of Q(x)', 'B.5-4 A Combination of Heaviside and Clearing Fractions', 'B.5-5 Improper F(x) with m=n', 'B.5-6 Modified Partial Fractions'] },
      { title: 'B.6 Vectors and Matrices', subsections: ['B.6-1 Some Definitions and Properties', 'B.6-2 Matrix Algebra'] },
      { title: 'B.7 MATLAB: Elementary Operations', subsections: ['B.7-1 MATLAB Overview', 'B.7-2 Calculator Operations', 'B.7-3 Vector Operations', 'B.7-4 Simple Plotting', 'B.7-5 Element-by-Element Operations', 'B.7-6 Matrix Operations', 'B.7-7 Partial Fraction Expansions'] },
      { title: 'B.8 Appendix: Useful Mathematical Formulas', subsections: [] }
    ]
  },
  {
    chapter: 'Chapter 1: Signals and Systems',
    sections: [
      { title: '1.1 Size of a Signal', subsections: ['1.1-1 Signal Energy', '1.1-2 Signal Power'] },
      { title: '1.2 Some Useful Signal Operations', subsections: ['1.2-1 Time Shifting', '1.2-2 Time Scaling', '1.2-3 Time Reversal', '1.2-4 Combined Operations'] },
      { title: '1.3 Classification of Signals', subsections: ['1.3-1 Continuous-Time and Discrete-Time Signals', '1.3-2 Analog and Digital Signals', '1.3-3 Periodic and Aperiodic Signals', '1.3-4 Energy and Power Signals', '1.3-5 Deterministic and Random Signals'] },
      { title: '1.4 Some Useful Signal Models', subsections: ['1.4-1 The Unit Step Function u(t)', '1.4-2 The Unit Impulse Function δ(t)', '1.4-3 The Exponential Function e^st'] },
      { title: '1.5 Even and Odd Functions', subsections: ['1.5-1 Some Properties of Even and Odd Functions', '1.5-2 Even and Odd Components of a Signal'] },
      { title: '1.6 Systems', subsections: [] },
      { title: '1.7 Classification of Systems', subsections: ['1.7-1 Linear and Nonlinear Systems', '1.7-2 Time-Invariant and Time-Varying Systems', '1.7-3 Instantaneous and Dynamic Systems', '1.7-4 Causal and Noncausal Systems', '1.7-5 Continuous-Time and Discrete-Time Systems', '1.7-6 Analog and Digital Systems', '1.7-7 Invertible and Noninvertible Systems', '1.7-8 Stable and Unstable Systems'] }
    ]
  }
];

// Active syllabus (switches with book toggle)
let syllabusData = currentBook === 'new' ? syllabusDataNew : syllabusDataOld;

// ── Book toggle ──────────────────────────────────────────────
function setBook(book) {
  currentBook = book;
  localStorage.setItem('tutorBook', book);
  syllabusData = book === 'new' ? syllabusDataNew : syllabusDataOld;
  const btn = document.getElementById('bookToggleBtn');
  const label = document.getElementById('bookToggleLabel');
  if (btn && label) {
    if (book === 'new') {
      label.textContent = '3rd Ed';
      btn.classList.add('book-new');
      btn.title = 'Currently: 3rd Edition (digital) — click to switch to 2nd Edition';
    } else {
      label.textContent = '2nd Ed';
      btn.classList.remove('book-new');
      btn.title = 'Currently: 2nd Edition (scanned) — click to switch to 3rd Edition';
    }
  }
  // Re-render syllabus and reset state
  renderSyllabus();
updateRecentConversationsUI();
  tutorState.learnSectionId = null;
    tutorState.sessionStartTime = Date.now();
  tutorState.learnSectionTitle = null;
  showWelcome();
  console.log(`[Book] Switched to ${book === 'new' ? '3rd Ed (new)' : '2nd Ed (old)'}`);
}

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

    // Subsections NOT shown in left sidebar - only appear in right TOC when section clicked
    const sectionsHtml = sections.map((sec) => {
      const subsList = sec.subsections || [];
      return `
        <div class="syllabus-section-wrap">
          <div class="syllabus-section-row">
            <span class="syllabus-section-caret-placeholder"></span>
            <button class="syllabus-section" data-section="${escapeHtml(sec.title)}" data-subsections="${escapeHtml(JSON.stringify(subsList))}">${escapeHtml(sec.title)}</button>
          </div>
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

  // Section click → show subsections in right TOC + open Learn Mode
  courseSyllabus.querySelectorAll('.syllabus-section').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const section = btn.getAttribute('data-section');
      const title   = btn.textContent.trim();

      // Mark active in sidebar
      courseSyllabus.querySelectorAll('.syllabus-section').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Parse subsections stored in data attribute
      let subs = [];
      try {
        const rawSubs = btn.getAttribute('data-subsections') || '[]';
        subs = JSON.parse(rawSubs.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&'));
      } catch(_) {}

      openLearnMode(section, title, subs);
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
const learnBookPages = document.getElementById('learnBookPages');
const bookPageIndicator = document.getElementById('bookPageIndicator');
const bookPrevBtn = document.getElementById('bookPrevBtn');
const bookNextBtn = document.getElementById('bookNextBtn');
const learnExplainContent = document.getElementById('learnExplainContent');
const learnChatContent = document.getElementById('learnChatContent');
const learnChatScroll  = document.getElementById('learnChatScroll');
const learnExplainScroll  = document.getElementById('learnExplainScroll');
const learnFollowupInput  = document.getElementById('learnFollowupInput');
const learnFollowupBtn    = document.getElementById('learnFollowupBtn');
const learnWebToggle  = document.getElementById('learnWebToggle') || { classList: { add() {}, remove() {}, toggle() {} } };
const learnWebBtn     = document.getElementById('learnWebBtn') || { classList: { add() {}, remove() {}, toggle() {} }, addEventListener() {} };
const learnWebCount   = document.getElementById('learnWebCount') || { textContent: '' };
const learnWebSources = document.getElementById('learnWebSources') || { innerHTML: '', classList: { add() {}, remove() {}, toggle() {}, contains() { return true; } } };
const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxClose   = document.getElementById('lightboxClose');
let lightboxScale = 1;
let lightboxPanX = 0;
let lightboxPanY = 0;
let lightboxDragging = false;
let lightboxDragStartX = 0;
let lightboxDragStartY = 0;

function applyLightboxTransform() {
  if (!lightboxImg) return;
  lightboxImg.style.transform = `translate(${lightboxPanX}px, ${lightboxPanY}px) scale(${lightboxScale})`;
}

function resetLightboxTransform() {
  lightboxScale = 1;
  lightboxPanX = 0;
  lightboxPanY = 0;
  lightboxDragging = false;
  if (lightboxImg) lightboxImg.classList.remove('is-dragging');
  applyLightboxTransform();
}

function openLightbox(src, alt = '') {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  resetLightboxTransform();
  lightbox.classList.remove('hidden');
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.add('hidden');
  resetLightboxTransform();
}

function bindExpandableLessonImages(root) {
  if (!root) return;
  root.querySelectorAll('img.lesson-img').forEach(img => {
    if (img.dataset.zoomBound === '1') return;
    img.dataset.zoomBound = '1';
    img.addEventListener('click', () => openLightbox(img.src, img.alt || ''));
  });
}

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

function setLearnLoading(show, text = 'Loading...') {
  learnLoading.classList.toggle('hidden', !show);
  if (show) learnLoadingText.textContent = text;
}

let currentBookPageIndex = 0;

function renderLearnPages() {
  if (!learnBookPages) return;
  const pages = tutorState.learnBookPages || [];

  if (pages.length === 0) {
    learnBookPages.innerHTML = '<div class="ghost" style="margin:auto;">No book pages for this section.</div>';
    if (bookPageIndicator) bookPageIndicator.textContent = 'Page 0 of 0';
    if (bookPrevBtn) bookPrevBtn.disabled = true;
    if (bookNextBtn) bookNextBtn.disabled = true;
    return;
  }

  if (currentBookPageIndex >= pages.length) currentBookPageIndex = pages.length - 1;
  const currentPage = pages[currentBookPageIndex] || {};
  const rawSrc = currentPage.path || currentPage.image || (currentPage.pageImage ? `/pages/${currentPage.pageImage}` : '');
  const finalSrc = rawSrc && /^https?:\/\//.test(rawSrc)
    ? rawSrc
    : `${API_BASE}${rawSrc || ''}`;

  if (!finalSrc) {
    learnBookPages.innerHTML = '<div class="ghost" style="margin:auto;">Saved conversation restored, but no page image is available.</div>';
  } else {
    learnBookPages.innerHTML = `
      <div class="book-page-wrap">
        <img src="${finalSrc}" alt="Book Page">
      </div>
    `;
  }

  if (bookPageIndicator) bookPageIndicator.textContent = `Page ${currentBookPageIndex + 1} of ${pages.length}`;
  if (bookPrevBtn) bookPrevBtn.disabled = currentBookPageIndex === 0;
  if (bookNextBtn) bookNextBtn.disabled = currentBookPageIndex === pages.length - 1;
}

if (bookPrevBtn) {
  bookPrevBtn.addEventListener('click', () => {
    if (currentBookPageIndex > 0) {
      currentBookPageIndex--;
      renderLearnPages();
    }
  });
}

if (bookNextBtn) {
  bookNextBtn.addEventListener('click', () => {
    if (currentBookPageIndex < (tutorState.learnBookPages || []).length - 1) {
      currentBookPageIndex++;
      renderLearnPages();
    }
  });
}

function sourceTypeLabel(type) {
  return {
    video: 'Video',
    visual: 'Visual',
    reference: 'Reference',
    course: 'Course',
    insight: 'Insight',
    blog: 'Blog',
    community: 'Community',
    web: 'Web'
  }[type] || 'Web';
}

function sourceTypeRank(type) {
  return {
    video: 1,
    visual: 2,
    course: 3,
    reference: 4,
    insight: 5,
    blog: 6,
    community: 7,
    web: 8
  }[type] || 99;
}

function sortSourcesByType(sources = []) {
  return [...sources].sort((a, b) => {
    const ra = sourceTypeRank(a.sourceType);
    const rb = sourceTypeRank(b.sourceType);
    if (ra !== rb) return ra - rb;
    return String(a.domain || '').localeCompare(String(b.domain || ''));
  });
}

function sourceTypeIcon(type) {
  return {
    video: '▶',
    visual: '◎',
    reference: '◈',
    course: '📘',
    insight: '✦',
    blog: '✎',
    community: '💬',
    web: '•'
  }[type] || '•';
}

function renderWebSourceCards(sources = [], options = {}) {
  const compact = !!options.compact;
  const showBuckets = !!options.showBuckets;
  const sorted = sortSourcesByType(sources);
  let lastType = null;
  return sorted.map(w => {
    const d = w.domain || domainOf(w.url);
    const fav = d ? `https://www.google.com/s2/favicons?sz=32&domain=${encodeURIComponent(d)}` : '';
    const type = w.sourceType || 'web';
    const bucketHeader = showBuckets && type !== lastType
      ? `<div class="wsic-group-header"><span class="wsic-group-icon">${sourceTypeIcon(type)}</span><span>${escapeHtml(sourceTypeLabel(type))}</span></div>`
      : '';
    lastType = type;
    return `${bucketHeader}<a class="web-source-inline-card${compact ? ' compact' : ''}" href="${escapeHtml(w.url)}" target="_blank" rel="noopener noreferrer">
      <div class="wsic-left">
        <div class="wsic-type-badge wsic-type-${escapeHtml(type)}">${sourceTypeIcon(type)}</div>
        ${fav ? `<img class="wsic-fav" src="${fav}" alt="">` : '<span class="wsic-fav-placeholder"></span>'}
        <div class="wsic-body">
          <div class="wsic-title-row">
            <div class="wsic-title">${escapeHtml(w.title || d || w.url)}</div>
            <span class="wsic-domain-pill">${escapeHtml(d || w.url)}</span>
          </div>
          ${!compact && w.snippet ? `<div class="wsic-snippet">${escapeHtml(w.snippet)}</div>` : ''}
          <div class="wsic-meta-row">
            <span class="wsic-type-label">${escapeHtml(sourceTypeLabel(type))}</span>
          </div>
        </div>
      </div>
      <svg class="wsic-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
    </a>`;
  }).join('');
}

function renderLearnWebSources(sources) {
  if (!sources || !sources.length) {
    learnWebToggle.classList.add('hidden');
    return;
  }
  learnWebData = sources;
  learnWebCount.textContent = sources.length;
  learnWebToggle.classList.remove('hidden');
  learnWebSources.innerHTML = renderWebSourceCards(sources, { showBuckets: true });
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

// Open Learn Mode without touching the right TOC (used when clicking sub-items in TOC)
async function openLearnModeKeepToc(sectionId, sectionTitle) {
  return openLearnMode(sectionId, sectionTitle, null /* null = keep existing TOC */);
}

async function openLearnMode(sectionId, sectionTitle, subsections = []) {
  console.log('[openLearnMode]', { sectionId, sectionTitle, currentBook });
  learnSectionId = sectionId;
  learnSectionTitle = sectionTitle;
  learnPages = [];
  learnPageIndex = 0;
  learnWebData = [];
  currentBookPageIndex = 0; // Fixed pagination resets to 0

  learnTitle.textContent = sectionTitle;
  learnIntroCard.classList.remove('hidden');
  learnBody.classList.add('hidden');
  showLearnView();

  // ── Use pre-generated preview if available (instant, no API call) ──
  const previewsSource = currentBook === 'new'
    ? (typeof SECTION_PREVIEWS_NEW !== 'undefined' ? SECTION_PREVIEWS_NEW : SECTION_PREVIEWS)
    : SECTION_PREVIEWS;
  // Extract section code (e.g. "B.5-4" from "B.5-4 A Combination of...") for fallback lookup
  const _codeMatch = (sectionId || sectionTitle || '').match(/^([A-Za-z]?\.?\d+(?:[.\-]\d+)*)/);
  const _sectionCode = _codeMatch ? _codeMatch[1] : null;
  console.log('[preview lookup]', { sectionTitle, sectionId, _sectionCode, hasNew: typeof SECTION_PREVIEWS_NEW !== 'undefined', keys: typeof SECTION_PREVIEWS_NEW !== 'undefined' ? Object.keys(SECTION_PREVIEWS_NEW).filter(k => k.startsWith('B.5-4')) : [] });
  const preview = previewsSource[sectionTitle] || previewsSource[sectionId]
    || (_sectionCode ? previewsSource[_sectionCode] : null)
    || SECTION_PREVIEWS[sectionTitle] || SECTION_PREVIEWS[sectionId]
    || (_sectionCode ? SECTION_PREVIEWS[_sectionCode] : null);
  console.log('[preview result]', preview ? 'FOUND' : 'NOT FOUND');
  const imgWrap = document.getElementById('learnIntroImgWrap');
  if (preview) {
    const introText = preview.en || preview.zh || '';
    if (imgWrap) imgWrap.textContent = preview.emoji;
    if (learnIntroMeta) learnIntroMeta.innerHTML = [
      `<span class="learn-intro-badge">${preview.refs} reference${preview.refs !== 1 ? 's' : ''}</span>`,
      `<span class="learn-intro-badge">${sectionTitle}</span>`
    ].join('');
    learnIntroText.textContent = introText;
    setLearnLoading(false);
  } else {
    // Fallback: fetch from API for sections without pre-generated previews
    if (imgWrap) imgWrap.textContent = '📖';
    if (learnIntroMeta) learnIntroMeta.innerHTML = '';
    learnIntroText.textContent = 'Loading section preview...';

    if (learnAbort) learnAbort.abort();
    learnAbort = new AbortController();
    try {
      const res = await fetch(`${API_BASE}/api/section`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sectionId, sectionTitle, mode: 'intro', language: 'en', uid: getUid(), bookSource: currentBook }),
        signal: learnAbort.signal
      });
      const data = await res.json();
      learnPages = data.bookPages || [];
      hideSplash();
      if (learnIntroMeta && data.bookPages && data.bookPages.length) {
        learnIntroMeta.innerHTML = [
          `<span class="learn-intro-badge">${data.bookPages.length} reference${data.bookPages.length !== 1 ? 's' : ''}</span>`,
          `<span class="learn-intro-badge">${sectionTitle}</span>`
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

  // Build right TOC: section title + subsections (skip if null = preserve existing TOC)
  if (subsections !== null) {
    const tocItems = [{ title: sectionTitle, depth: 1, anchor: '' }];
    subsections.forEach(sub => tocItems.push({ title: sub, depth: 2, anchor: '' }));
    buildToc(tocItems);
    // Wire depth-2 items to open sub-lesson WITHOUT rebuilding TOC
    if (tocNav && subsections.length) {
      tocNav.querySelectorAll('.toc-item.depth-2').forEach((tocBtn, i) => {
        const subTitle = subsections[i];
        if (subTitle) {
          tocBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            tocNav.querySelectorAll('.toc-item').forEach(b => b.classList.remove('active'));
            tocBtn.classList.add('active');
            openLearnModeKeepToc(subTitle, subTitle);
          });
        }
      });
    }
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
      body: JSON.stringify({ sectionId: learnSectionId, sectionTitle: learnSectionTitle, mode: 'lesson', language: 'en', uid: getUid(), bookSource: currentBook, profileOverride: userMemory && userMemory.quiz ? { ...userMemory.quiz } : undefined }),
      signal: learnAbort.signal
    });
    setSplashStage(4); // charts / rendering
    const data = await res.json();
    hideSplash();

    learnBody.classList.remove('hidden');
    learnPages = data.bookPages || learnPages;
    tutorState.learnSectionId = learnSectionId;
    tutorState.sessionStartTime = Date.now();
    tutorState.learnSectionTitle = learnSectionTitle;
    tutorState.learnLessonMarkdown = data.lesson || '';
    tutorState.learnBookPages = data.bookPages || [];
    tutorState.learnWebSources = data.webSources || [];
    tutorState.learnHistory = tutorState.learnLessonMarkdown
      ? [{ role: 'assistant', content: tutorState.learnLessonMarkdown }]
      : [];
    renderLearnPages();
    learnExplainContent.innerHTML = markdownToHtml(data.lesson || 'No explanation available.');
    bindExpandableLessonImages(learnExplainContent);
    if (learnChatContent) learnChatContent.innerHTML = ''; // Clear chat history on new section
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
    // Async: save session summary
    saveSessionSummary(`Studied section "${learnSectionTitle}".`);
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
learnWebBtn.addEventListener('click', () => {
  const open = !learnWebSources.classList.contains('hidden');
  learnWebSources.classList.toggle('hidden', open);
  learnWebBtn.classList.toggle('open', !open);
});
lightboxClose.addEventListener('click', () => closeLightbox());
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox && !lightbox.classList.contains('hidden')) closeLightbox();
});
lightboxImg.addEventListener('wheel', (e) => {
  e.preventDefault();
  const delta = e.deltaY < 0 ? 0.12 : -0.12;
  lightboxScale = Math.max(1, Math.min(4, lightboxScale + delta));
  if (lightboxScale === 1) {
    lightboxPanX = 0;
    lightboxPanY = 0;
  }
  applyLightboxTransform();
}, { passive: false });
lightboxImg.addEventListener('mousedown', (e) => {
  if (lightboxScale <= 1) return;
  lightboxDragging = true;
  lightboxDragStartX = e.clientX - lightboxPanX;
  lightboxDragStartY = e.clientY - lightboxPanY;
  lightboxImg.classList.add('is-dragging');
});
document.addEventListener('mousemove', (e) => {
  if (!lightboxDragging || lightboxScale <= 1) return;
  lightboxPanX = e.clientX - lightboxDragStartX;
  lightboxPanY = e.clientY - lightboxDragStartY;
  applyLightboxTransform();
});
document.addEventListener('mouseup', () => {
  lightboxDragging = false;
  if (lightboxImg) lightboxImg.classList.remove('is-dragging');
});

learnFollowupInput.addEventListener('input', () => {
  autoResize(learnFollowupInput);
  learnFollowupBtn.disabled = !learnFollowupInput.value.trim();
});
async function sendLearnFollowup(rawPrompt) {
  const prompt = (rawPrompt || learnFollowupInput.value || '').trim();
  const attachments = [...attachmentsLearn];
  if (!prompt && attachments.length === 0) return;

  // Clear learn attachments
  attachmentsLearn.length = 0;
  renderAttachPreview(attachmentsLearn, 'attachPreviewLearn');

  learnFollowupInput.value = '';
  autoResize(learnFollowupInput);
  learnFollowupBtn.disabled = true;

  const answerId = `learn-followup-answer-${Date.now()}`;
  learnChatContent.insertAdjacentHTML('beforeend', `
    <div class="followup-bubble" id="${answerId}">
      <div class="fub-q">${escapeHtml(prompt)}</div>
      <div class="fub-a ghost">
        <details open class="search-progress">
          <summary>Thinking with context and web sources...</summary>
          <div style="font-size: 0.9em; padding-top: 10px; color: #555;">
            <div class="search-step"><span class="step-icon step-spinner"></span> Reading Section Objectives...</div>
            <div class="search-step" style="opacity: 0.5;"><span class="step-icon step-spinner"></span> Searching Across the Web...</div>
            <div class="search-live-sources hidden"></div>
            <div class="search-step" style="opacity: 0.2;"><span class="step-icon step-spinner"></span> Generating Final Explanation...</div>
          </div>
        </details>
      </div>
    </div>
  `);
  learnChatScroll.scrollTop = learnChatScroll.scrollHeight;

  if (learnAbort) learnAbort.abort();
  learnAbort = new AbortController();
  const localLearnSignal = learnAbort.signal; // capture before any reassignment

  let learnStep = 1;
  const answerEl = document.getElementById(answerId);
  if (window.loadingTimerLearn) clearInterval(window.loadingTimerLearn);
  window.loadingTimerLearn = setInterval(() => {
    if (!answerEl) return clearInterval(window.loadingTimerLearn);
    learnStep = Math.min(2, learnStep + 1);
    const steps = answerEl.querySelectorAll('.search-step');
    if (steps[0]) {
      const sp = steps[0].querySelector('.step-icon');
      if (sp) { sp.className = 'step-icon step-done'; sp.textContent = '✓'; }
    }
    if (learnStep >= 2 && steps[1]) {
      steps[1].style.opacity = '1';
      const sp = steps[1].querySelector('.step-icon');
      if (sp) { sp.className = 'step-icon step-done'; sp.textContent = '✓'; }
    }
    if (steps[2]) {
      steps[2].style.opacity = '1';
      const sp = steps[2].querySelector('.step-icon');
      if (sp && !sp.classList.contains('step-done')) {
        sp.className = 'step-icon step-spinner';
        sp.textContent = '';
      }
    }
  }, 1200);

  try {
    const data = await callAsk(prompt, localLearnSignal, {
      mode: 'followup',
      history: tutorState.learnHistory.slice(-8),
      sectionId: tutorState.learnSectionId,
      sectionTitle: tutorState.learnSectionTitle,
      lessonContext: tutorState.learnLessonMarkdown,
      bookPages: tutorState.learnBookPages,
      webSources: tutorState.learnWebSources,
      useWebSearch: document.getElementById('webSearchToggleFollowup')?.checked,
      answerLength: document.getElementById('answerLengthToggleFollowup')?.value || 'medium',
      language: detectLang(prompt),
      attachments: attachments.map(a => ({ type: a.type, name: a.name, dataUrl: a.dataUrl, mimeType: a.mimeType }))
    });

    if (window.loadingTimerLearn) clearInterval(window.loadingTimerLearn);

    const target = document.getElementById(answerId);
    if (target) {
      replayLiveSearchEvents(target, data.liveSearchEvents || [], data.webSources || []);
      const finalStep = target.querySelectorAll('.search-step')[2];
      if (finalStep) {
        const sp = finalStep.querySelector('.step-icon');
        if (sp) { sp.className = 'step-icon step-done'; sp.textContent = '✓'; }
      }
    }
    if (target) {
      const answerDiv = target.querySelector('.fub-a') || target;
      answerDiv.classList.remove('ghost');
      answerDiv.className = 'fub-a learn-explain-content';

      // Render explanation only; web sources now surface in the upper search panel instead of a bottom details block
      try {
        answerDiv.innerHTML = markdownToHtml(data.explanation || 'No explanation available.');
        bindExpandableLessonImages(answerDiv);
      } catch (renderErr) {
        answerDiv.innerHTML = `<p>${escapeHtml(data.explanation || 'No explanation available.')}</p>`;
      }
      setTimeout(() => {
        if (window.MathJax && window.MathJax.typesetPromise) {
          window.MathJax.typesetPromise([answerDiv]).catch(() => {});
        }
      }, 50);
    }

    tutorState.learnHistory.push(
      { role: 'user', content: prompt },
      { role: 'assistant', content: data.explanation || '' }
    );

    if (Array.isArray(data.bookPages) && data.bookPages.length) {
      tutorState.learnBookPages = data.bookPages;
      currentBookPageIndex = 0;
      renderLearnPages();
    } else if (tutorState.learnBookPages && tutorState.learnBookPages.length) {
      renderLearnPages();
    }

    tutorState.learnWebSources = data.webSources || tutorState.learnWebSources;
    renderLearnWebSources(tutorState.learnWebSources);
    renderLearnWebSection(tutorState.learnWebSources);
    updateRecentConversations();
    learnChatScroll.scrollTop = learnChatScroll.scrollHeight;
  } catch (err) {
    if (window.loadingTimerLearn) clearInterval(window.loadingTimerLearn);
    if (err.name === 'AbortError') return;
    const target = document.getElementById(answerId);
    if (target) {
      // Clear loading state in the answer div first, then show error
      const answerDiv = target.querySelector('.fub-a') || target;
      answerDiv.className = 'fub-a';
      answerDiv.innerHTML = `<div class="error-box"><strong>加载失败</strong><p>${escapeHtml(err.message)}</p></div>`;
    }
  }
}

learnFollowupInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
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

function parseMdTable(block) {
  const rows = block.trim().split('\n').map(r => r.trim()).filter(r => r.startsWith('|'));
  if (rows.length < 2) return null;
  const isSep = r => /^\|[\s\-:|]+\|$/.test(r) && r.replace(/[|:\-\s]/g,'').length === 0;
  const headerRow = rows[0];
  const sepRow = rows[1];
  if (!isSep(sepRow)) return null;
  const bodyRows = rows.slice(2);
  
  // Format the cell using a modified inline format that ensures $...$ becomes \(...\) for MathJax.
  const formatCell = (text) => {
    let c = text.trim();
    if (window.preprocessMath) {
      c = window.preprocessMath(c);
    } else {
      c = c.replace(/(?<!\$)\$(?!\$)(.+?)(?<!\$)\$(?!\$)/g, '\\($1\\)');
    }
    return inlineFormat(c);
  };

  const parseCells = (r, tag) =>
    r.split('|').slice(1,-1).map(c => `<${tag}>${formatCell(c)}</${tag}>`).join('');
    
  let html = '<table class="md-table">';
  html += `<thead><tr>${parseCells(headerRow,'th')}</tr></thead>`;
  if (bodyRows.length) {
    html += '<tbody>' + bodyRows.map(r => `<tr>${parseCells(r,'td')}</tr>`).join('') + '</tbody>';
  }
  html += '</table>';
  return html;
}

function markdownToHtml(md) {
  if (!md) return '<p>暂无内容</p>';
  // Pre-process: convert markdown tables to HTML before line-by-line parsing
  let text = String(md);
  
  // First, convert any Markdown tables to HTML tables
  text = text.replace(/((?:^|\n)(\|[^\n]+\|[ \t]*\n){2,})/g, (match) => {
    const parsed = parseMdTable(match);
    return parsed ? '\n' + parsed + '\n' : match;
  });

  // Then, protect all HTML <table>...</table> blocks (both AI-generated and parseMdTable-generated) from escaping
  const htmlTablePlaceholders = [];
  text = text.replace(/<table[\s\S]*?<\/table>/gi, (match) => {
    const idx = htmlTablePlaceholders.length;
    htmlTablePlaceholders.push(match);
    return `\n\x00TABLE_${idx}\x00\n`;
  });

  // Pre-process: convert $...$ to \(...\) for MathJax
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
      // output as raw $$ block - MathJax will render it
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

    if (/^\x00TABLE_\d+\x00$/.test(t)) {
      flushList();
      html += t;
      continue;
    }

    if (/^[-*+]\s+/.test(t)) {
      if (!inList) { html += '<ul>'; inList = true; }
      html += `<li>${inlineFormat(t.replace(/^[-*+]\s+/, ''))}</li>`;
      continue;
    }

    if (/^<\/?(details|summary)( [^>]*)?>/i.test(t)) {
      flushList();
      html += inlineFormat(t);
      continue;
    }

    flushList();
    html += `<p>${inlineFormat(t)}</p>`;
  }

  flushList(); flushCode(); flushMath();
  // Restore raw HTML table placeholders
  html = html.replace(/\x00TABLE_(\d+)\x00/g, (_, idx) => htmlTablePlaceholders[Number(idx)] || '');
  
  return html;
}

function inlineFormat(text) {
  // Protect table placeholders from escaping
  const placeholders = [];
  let s = text.replace(/\x00TABLE_(\d+)\x00/g, (_, idx) => {
    placeholders.push({ idx, orig: `\x00TABLE_${idx}\x00` });
    return `__TABLE_PLACEHOLDER_${idx}__`;
  });
  
  // Protect safe html tags before escaping
  s = s.replace(/<\/?(details|summary)( [^>]*)?>/gi, (match) => {
    placeholders.push({ idx: placeholders.length, orig: match });
    return `__SAFE_TAG_${placeholders.length - 1}__`;
  });

  // Protect inline math from escaping or double-processing
  s = s.replace(/\\\((.*?)\\\)/g, (match, mathContent) => {
    placeholders.push({ idx: placeholders.length, orig: match });
    return `__MATH_PLACEHOLDER_${placeholders.length - 1}__`;
  });
  
  s = escapeHtml(s);

  // Restore placeholders after escaping
  placeholders.forEach(({ idx, orig }) => {
    s = s.replace(`__TABLE_PLACEHOLDER_${idx}__`, orig);
    s = s.replace(`__SAFE_TAG_${idx}__`, orig);
    s = s.replace(`__MATH_PLACEHOLDER_${idx}__`, orig);
  });

  s = s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Automatically fix inline math improperly wrapped in backticks (e.g. `e^{j\theta}`)
  s = s.replace(/`([^`]+)`/g, (match, codeContent) => {
    // If the backtick code contains common math markers, switch it to MathJax inline `\( ... \)`
    if (/\\|&#94;|&amp;|\{|=|cos\b|sin\b|tan\b|θ|π|\^|_/i.test(codeContent)) {
      return `\\(${codeContent}\\)`;
    }
    return `<code>${codeContent}</code>`;
  });
  
  // Images (must come before links)
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="lesson-img" loading="lazy">');
  // Links
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
// Preserves existing subsection items (depth-2) above a divider, then appends content anchors below
function buildTocFromContent(containerEl) {
  if (!containerEl || !tocNav) return;
  const headings = containerEl.querySelectorAll('h1, h2, h3, h4');
  if (!headings.length) return;

  // Collect existing subsection items to preserve them
  const existingSubItems = [];
  tocNav.querySelectorAll('.toc-item.depth-2').forEach(btn => {
    existingSubItems.push(btn.cloneNode(true));
  });

  const items = [];
  let counter = 0;
  headings.forEach(h => {
    const depth = parseInt(h.tagName[1], 10);
    const title = h.textContent.trim();
    const anchor = `toc-anchor-${counter++}`;
    h.id = anchor;
    items.push({ title, depth, anchor });
  });

 // Rebuild: subsections first, then a divider, then content headings
tocNav.innerHTML = '';
if (existingSubItems.length) {
    existingSubItems.forEach(btn => tocNav.appendChild(btn));
    const divider = document.createElement('div');
    divider.className = 'toc-divider';
    divider.textContent = 'Index';
    // 新增:文字黑色 + 加粗
    divider.style.color = "#000";
    divider.style.fontWeight = "bold";
    tocNav.appendChild(divider);
}
items.forEach(item => {
    const btn = document.createElement('button');
    btn.className = `toc-item depth-${item.depth || 1} content-anchor`;
    btn.dataset.anchor = item.anchor || '';
    btn.textContent = item.title;
    btn.addEventListener('click', () => {
        const el = document.getElementById(item.anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        tocNav.querySelectorAll('.toc-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
    tocNav.appendChild(btn);
});
  // Re-wire preserved subsection clicks
  tocNav.querySelectorAll('.toc-item.depth-2:not(.content-anchor)').forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const subTitle = btn.textContent.trim();
      tocNav.querySelectorAll('.toc-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      openLearnModeKeepToc(subTitle, subTitle);
    });
  });

  // Intersection observer to highlight active content section
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocNav.querySelectorAll('.toc-item.content-anchor').forEach(b => {
          b.classList.toggle('active', b.dataset.anchor === id);
        });
      }
    });
  }, { threshold: 0.3 });
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
    bookSourcesRail.innerHTML = '<div class="source-empty">No content sources</div>';
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

  webSourcesInline.innerHTML = renderWebSourceCards(webSources, { compact: true, showBuckets: true });
}

function renderExplanation(markdown) {
  answerContent.innerHTML = markdownToHtml(markdown || '暂无讲解内容');
  bindExpandableLessonImages(answerContent);
  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise([answerContent]).catch(() => {});
  }
  setTimeout(() => buildTocFromContent(answerContent), 80);
}


function detectLang(text) {
  const t = String(text || '');
  return /[\u4e00-\u9fa5]/.test(t) ? 'zh' : 'en';
}

async function callAsk(prompt, signal, extra = {}) {
  const res = await fetch(`${API_BASE}/api/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, uid: getUid(), bookSource: currentBook, ...extra }),
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

function replayLiveSearchEvents(container, events = [], finalSources = []) {
  if (!container) return;
  const liveSources = container.querySelector('.search-live-sources');
  if (!liveSources) return;

  liveSources.classList.remove('hidden');
  liveSources.innerHTML = '<div class="search-tree-title">搜索网络</div>';

  const snapshots = [];
  for (const evt of events) {
    if (evt && evt.type === 'source' && Array.isArray(evt.sources)) {
      snapshots.push(evt.sources);
    }
  }

  if (!snapshots.length) {
    const rendered = sortSourcesByType(finalSources).slice(0, 8);
    liveSources.innerHTML = '<div class="search-tree-title">搜索网络 ✓</div>' + renderWebSourceCards(rendered, { compact: true, showBuckets: true });
    return;
  }

  let idx = 0;
  const tick = () => {
    const current = sortSourcesByType(snapshots[idx]).slice(0, 8);
    liveSources.innerHTML = `<div class="search-tree-title">搜索网络${idx === snapshots.length - 1 ? ' ✓' : ' ...'}</div>` + renderWebSourceCards(current, { compact: true, showBuckets: true });
    idx += 1;
    if (idx < snapshots.length) {
      setTimeout(tick, Math.min(220, 60 + idx * 15));
    } else if (finalSources.length > 8) {
      liveSources.innerHTML += `<div class="search-live-more">还有 ${finalSources.length - 8} 个...</div>`;
    }
  };
  tick();
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
  if (!prompt && attachmentsMain.length === 0 && attachmentsFollowup.length === 0) return;

  const isFollowup = document.activeElement === followupInput || !!followupInput.value.trim();
  const attachments = isFollowup ? [...attachmentsFollowup] : [...attachmentsMain];

  const webSearchToggle = document.getElementById('webSearchToggle')?.checked;
  const answerLengthToggle = document.getElementById('answerLengthToggle')?.value || 'medium';
  const webSearchToggleFollowup = document.getElementById('webSearchToggleFollowup')?.checked;
  const answerLengthToggleFollowup = document.getElementById('answerLengthToggleFollowup')?.value || 'medium';
  const useWebSearch = isFollowup ? webSearchToggleFollowup : webSearchToggle;
  const answerLength = isFollowup ? answerLengthToggleFollowup : answerLengthToggle;


  userInput.value = prompt;
  followupInput.value = '';
  autoResize(userInput);
  autoResize(followupInput);

  // Clear attachments after grab
  if (isFollowup) { attachmentsFollowup.length = 0; renderAttachPreview(attachmentsFollowup, 'attachPreviewFollowup'); }
  else { attachmentsMain.length = 0; renderAttachPreview(attachmentsMain, 'attachPreviewMain'); }

  setSendState();

  showAnswer(prompt || '(Attachment)');
  setStatus('Working', 'working');
  renderBookPages([]);
  renderBookSources([]);
  renderWebSources([]);
  sourcesSection.classList.add('hidden');
  answerContent.innerHTML = `
    <details open class="search-progress">
      <summary>Thinking with context from this section...</summary>
      <div style="font-size: 0.9em; padding-top: 10px; color: #555;">
        <div class="search-step">1. 📚 Reading Section Objectives...</div>
        <div class="search-step" style="opacity: 0.5;">2. 🔍 Searching Across the Web...</div>
        <div class="search-live-sources hidden"></div>
        <div class="search-step" style="opacity: 0.2;">3. 🧠 Generating Final Explanation...</div>
      </div>
    </details>
  `;
  answerScroll.scrollTop = 0;

  // Abort any in-flight request
  if (currentAbortController) currentAbortController.abort();
  currentAbortController = new AbortController();
  stopBtn.classList.remove('hidden');

  let step = 1;
  renderStepState(step);
  if (loadingTimer) clearInterval(loadingTimer);
  loadingTimer = setInterval(() => {
    step = Math.min(2, step + 1);
    renderStepState(step);
    const steps = answerContent.querySelectorAll('.search-step');
    if (step >= 2 && steps[1]) steps[1].style.opacity = '1';
    if (steps[2]) steps[2].style.opacity = '1';
  }, 1500);

  try {
    const data = await callAsk(prompt, currentAbortController.signal, {
      mode: isFollowup ? 'followup' : 'ask',
      history: tutorState.chatHistory.slice(-8),
      bookPages: tutorState.currentBookPages,
      webSources: tutorState.currentWebSources,
      useWebSearch: useWebSearch,
      answerLength: answerLength,
      language: detectLang(prompt),
      attachments: attachments.map(a => ({ type: a.type, name: a.name, dataUrl: a.dataUrl, mimeType: a.mimeType }))
    });
    stopStepAnimation();
    replayLiveSearchEvents(answerContent, data.liveSearchEvents || [], data.webSources || []);
    const finalStep = answerContent.querySelectorAll('.search-step')[2];
    if (finalStep) {
      const label = finalStep.textContent.replace(/^\s*3\.\s*🧠\s*/, '').trim();
      finalStep.innerHTML = `3. 🧠 ${label}`;
    }
    currentAbortController = null;
    stopBtn.classList.add('hidden');

    tutorState.chatHistory.push(
      { role: 'user', content: prompt },
      { role: 'assistant', content: data.explanation || '' }
    );
    updateRecentConversations();
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
  if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
    e.preventDefault();
    sendQuestion(userInput.value);
  }
});

followupInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
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
updateRecentConversationsUI();
autoResize(userInput);
autoResize(followupInput);
setSendState();
showWelcome();
setStatus('', 'idle');

// ── Init attachment UI ────────────────────────────────────────
setupAttachBtn('attachBtnMain', 'fileInputMain', userInput);
setupAttachBtn('attachBtnFollowup', 'fileInputFollowup', followupInput);
setupAttachBtn('attachBtnLearn', 'fileInputLearn', learnFollowupInput);
setupDragDrop(document.getElementById('searchBox'), userInput);
setupDragDrop(document.getElementById('followupBar'), followupInput);
setupDragDrop(document.getElementById('learnFollowupBar'), learnFollowupInput);
setupPaste(userInput);
setupPaste(followupInput);
setupPaste(learnFollowupInput);

// --- Sidebar Toggle Logic ---
setTimeout(() => {
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const floatToggleBtn = document.getElementById('floatToggleBtn');
  const appContainer = document.querySelector('.app');

  const leftSidebar = document.getElementById('leftSidebar');

  if (menuToggleBtn && leftSidebar) {
    menuToggleBtn.addEventListener('click', () => {
      leftSidebar.classList.add('collapsed');
      appContainer.classList.add('sidebar-collapsed');
    });
  }
  if (floatToggleBtn && leftSidebar) {
    floatToggleBtn.addEventListener('click', () => {
      leftSidebar.classList.remove('collapsed');
      appContainer.classList.remove('sidebar-collapsed');
    });
  }
}, 500);

// --- Resizer Logic ---
const learnResizer = document.getElementById('learnResizer');
const learnExplainCol = document.querySelector('.learn-explain-col');
const learnChatCol = document.getElementById('learnChatCol');
let isResizing = false;

if (learnResizer) {
  learnResizer.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.body.style.cursor = 'col-resize';
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    const containerWidth = learnExplainCol.parentElement.offsetWidth;
    let newWidth = e.clientX - learnExplainCol.getBoundingClientRect().left;
    if (newWidth < 300) newWidth = 300;
    if (newWidth > containerWidth - 300) newWidth = containerWidth - 300;
    
    // Switch from flex-grow to fixed pixel widths for precision drag
    learnExplainCol.style.flex = 'none';
    learnExplainCol.style.width = newWidth + 'px';
    learnChatCol.style.flex = '1';
    
    // Automatically trigger resize/reflow for contained panels
    learnFollowupInput.style.width = '100%';
    autoResize(document.getElementById('learnFollowupInput'));
  });

  document.addEventListener('mouseup', () => {
    if (isResizing) {
      isResizing = false;
      document.body.style.cursor = 'default';
      learnFollowupInput.style.width = '';
      autoResize(document.getElementById('learnFollowupInput'));
    }
  });
}

const webSearchBtnLearn = document.getElementById('webSearchToggleBtnLearn');
if (webSearchBtnLearn) {
  webSearchBtnLearn.addEventListener('click', () => {
    webSearchBtnLearn.classList.toggle('active');
    webSearchBtnLearn.style.color = webSearchBtnLearn.classList.contains('active') ? '#2563EB' : '#94A3B8';
  });
}


// Add event listener for top half (TOC) collapse
// tocHeader, tocNav, tocHeaderChevron already declared above
function initTocCollapse() {
  const hdr = document.getElementById('tocHeader');
  const nav = document.getElementById('tocNav');
  const chevron = document.getElementById('tocHeaderChevron');
  if (hdr && nav) {
    hdr.addEventListener('click', () => {
      const isHidden = nav.style.display === 'none';
      nav.style.display = isHidden ? 'block' : 'none';
      if (chevron) chevron.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(-90deg)';
    });
  }
}
initTocCollapse();

// Update tocHeaderTitle on section change
// Inside startLesson or when rendering a specific section's outline
function updateSidebarNav(title) {
  const t = document.getElementById('tocHeaderTitle');
  if (t) t.textContent = title ? title : 'Table of Contents';
}






// Persistent Recent Conversations replacing transient one
function loadRecentConversations() {
  const saved = localStorage.getItem('tutorRecentSessions');
  if (saved) {
    try { return JSON.parse(saved) || []; } catch(e) {}
  }
  return [];
}

function saveCurrentLearnSession() {
  if (!tutorState.learnHistory || tutorState.learnHistory.length < 2) return;
  
  const firstUserMsg = tutorState.learnHistory.find(m => m.role === 'user');
  if (!firstUserMsg) return;
  
  let sessions = loadRecentConversations();
  
  // if current session already exists in top, replace it to update history
  const sessionId = tutorState.learnSectionId + '-' + (tutorState.sessionStartTime || Date.now());
  const existingIdx = sessions.findIndex(s => s.id === sessionId);
  
  const currentSession = {
    id: sessionId,
    title: firstUserMsg.content,
    timestamp: tutorState.sessionStartTime || Date.now(),
    sectionId: tutorState.learnSectionId,
    sectionTitle: tutorState.learnSectionTitle,
    lessonMarkdown: tutorState.learnLessonMarkdown,
    bookPages: tutorState.learnBookPages,
    webSources: tutorState.learnWebSources,
    history: JSON.parse(JSON.stringify(tutorState.learnHistory))
  };
  
  if (existingIdx !== -1) {
    sessions[existingIdx] = currentSession;
  } else {
    sessions.unshift(currentSession);
    tutorState.sessionStartTime = currentSession.timestamp;
  }
  
  sessions = sessions.slice(0, 30); // max 30
  localStorage.setItem('tutorRecentSessions', JSON.stringify(sessions));
  updateRecentConversationsUI();
}

window.loadHistoricalSession = function(timestamp) {
  const sessions = loadRecentConversations();
  const session = sessions.find(s => s.timestamp === timestamp);
  if (!session) return;

  try {
    // Stop ongoing flows and save current before switching
    saveCurrentLearnSession();
    if (window.loadingTimerLearn) clearInterval(window.loadingTimerLearn);
    if (learnAbort) learnAbort.abort();

    tutorState.learnSectionId = session.sectionId || '';
    tutorState.learnSectionTitle = session.sectionTitle || 'Saved Conversation';
    tutorState.learnLessonMarkdown = session.lessonMarkdown || '';
    tutorState.learnBookPages = Array.isArray(session.bookPages) ? session.bookPages : [];
    tutorState.learnWebSources = Array.isArray(session.webSources) ? session.webSources : [];
    tutorState.learnHistory = JSON.parse(JSON.stringify(session.history || []));
    tutorState.sessionStartTime = session.timestamp;
    currentBookPageIndex = 0;

    showLearnView();
    if (learnIntroCard) learnIntroCard.classList.add('hidden');
    if (learnBody) learnBody.classList.remove('hidden');
    hideSplash();
    setLearnLoading(false);

    const titleEl = document.getElementById('learnSectionTitle');
    if (titleEl) titleEl.textContent = tutorState.learnSectionTitle;
    updateSidebarNav(tutorState.learnSectionTitle);

    const contentEl = document.getElementById('learnExplainContent');
    if (contentEl) {
      try {
        contentEl.innerHTML = markdownToHtml(tutorState.learnLessonMarkdown || 'No explanation available.');
      } catch (renderErr) {
        console.warn('[loadHistoricalSession] lesson render failed:', renderErr);
        contentEl.innerHTML = `<div class="error-box"><strong>Failed to render saved lesson</strong><p>${escapeHtml(renderErr.message || String(renderErr))}</p></div>`;
      }
      bindExpandableLessonImages(contentEl);
    }

    renderLearnPages();
    renderLearnWebSources(tutorState.learnWebSources);
    renderLearnWebSection(tutorState.learnWebSources);

    const chatContent = document.getElementById('learnChatContent');
    const chatScroll = document.getElementById('learnChatScroll');
    if (chatContent && chatScroll) {
      chatContent.innerHTML = '';
      tutorState.learnHistory.forEach(msg => {
        const b = document.createElement('div');
        if (msg.role === 'user') {
          b.className = 'fub-user';
          b.textContent = msg.content || '';
        } else {
          b.className = 'fub-a learn-explain-content';
          try {
            b.innerHTML = markdownToHtml(msg.content || '');
          } catch (renderErr) {
            b.innerHTML = `<p>${escapeHtml(msg.content || '')}</p>`;
          }
          bindExpandableLessonImages(b);
        }
        chatContent.appendChild(b);
      });

      setTimeout(() => {
        if (window.MathJax && window.MathJax.typesetPromise) {
          const targets = [contentEl, chatContent].filter(Boolean);
          window.MathJax.typesetPromise(targets).catch(() => {});
        }
        buildTocFromContent(contentEl);
        chatScroll.scrollTop = chatScroll.scrollHeight;
      }, 80);
    }
  } catch (err) {
    console.error('[loadHistoricalSession] failed:', err);
    alert(`Failed to restore this conversation: ${err.message || err}`);
  }
};

function updateRecentConversationsUI() {
  const container = document.getElementById('recentConversationsNav');
  if (!container) return;
  
  const sessions = loadRecentConversations();
  if (!sessions.length) {
    container.innerHTML = '<div style="opacity: 0.5; font-style: italic;">No saved conversations yet.</div>';
    return;
  }
  
  const itemsHtml = sessions.map(session => {
    let truncated = session.title;
    if (truncated.length > 35) truncated = truncated.slice(0, 35) + '...';
    // Format timestamp nicely
    const dt = new Date(session.timestamp);
    const dateStr = dt.getMonth()+1 + '/' + dt.getDate() + ' ' + dt.getHours() + ':' + String(dt.getMinutes()).padStart(2, '0');
    
    return `<div style="
        background: rgba(255,255,255,0.05); 
        padding: 10px 12px; 
        border-radius: 6px; 
        margin-bottom: 8px; 
        color: #E2E8F0;
        cursor: pointer;
        transition: background 0.15s, transform 0.1s;
        box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05);
        display: flex;
        flex-direction: column;
        gap: 4px;
      "
      onmouseover="this.style.background='rgba(255,255,255,0.1)'"
      onmouseout="this.style.background='rgba(255,255,255,0.05)'"
      onmousedown="this.style.transform='scale(0.98)'"
      onmouseup="this.style.transform='scale(1)'"
      onclick="window.loadHistoricalSession(${session.timestamp})"
      >
        <div style="font-weight: 500; font-size: 13px; color: #F8FAFC;">${escapeHtml(truncated)}</div>
        <div style="font-size: 10px; color: #94A3B8; display: flex; justify-content: space-between;">
           <span>${escapeHtml(session.sectionTitle || 'General')}</span>
           <span>${dateStr}</span>
        </div>
      </div>`;
  }).join('');
  
  container.innerHTML = itemsHtml;
}

// Hook it into existing updateRecentConversations calls smoothly
function updateRecentConversations() {
  saveCurrentLearnSession();
  updateRecentConversationsUI();
}
