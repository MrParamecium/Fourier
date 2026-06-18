const API_BASE = (() => {
  const configured = window.AQUARIUS_CONFIG?.apiBase;
  if (typeof configured === 'string' && configured.trim()) {
    return configured.trim().replace(/\/+$/, '');
  }
  return window.location.hostname === 'localhost' ? 'http://127.0.0.1:9000' : window.location.origin;
})();

async function readApiJson(res, label = 'request') {
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    const detail = compactWhitespace(body).slice(0, 120);
    throw new Error(`${label} failed: ${res.status}${detail ? ` ${detail}` : ''}`);
  }
  return res.json();
}

const INTRO_LANDING_SEEN_KEY = 'aquarius-intro-seen';
const THEME_STORAGE_KEY = 'aquarius-theme';
let introScene = null;

function applyTheme(theme) {
  const normalized = theme === 'dusk' || theme === 'dark'
    ? 'dusk'
    : 'dawn';
  document.documentElement.setAttribute('data-theme', normalized);
  try { localStorage.setItem(THEME_STORAGE_KEY, normalized); } catch (_) {}
  document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.themeValue === normalized);
  });
}

function initTheme() {
  let stored = 'dawn';
  try {
    stored = localStorage.getItem(THEME_STORAGE_KEY) || 'dawn';
  } catch (_) {}
  applyTheme(stored);
}

function hideIntroLanding(persist = true) {
  const intro = document.getElementById('introLanding');
  if (intro) {
    intro.classList.add('hidden');
    intro.style.display = '';
  }
  document.body.classList.remove('intro-active');
  if (persist) {
    try { localStorage.setItem(INTRO_LANDING_SEEN_KEY, '1'); } catch (_) {}
  }
  if (introScene && typeof introScene.destroy === 'function') {
    introScene.destroy();
    introScene = null;
  }
}

function finishStartupBoot() {
  document.body.classList.remove('app-booting');
}

function shouldShowIntroLanding() {
  const params = new URLSearchParams(window.location.search);
  if (params.get(AUTH_VIEW_FLAG) === 'login' || params.has(AUTH_CALLBACK_FLAG)) {
    return false;
  }
  if (hasPendingAuthReturnIntent()) {
    return false;
  }
  return true;
}

function hasPendingAuthReturnIntent() {
  try { return Boolean(sessionStorage.getItem(AUTH_RETURN_INTENT_KEY)); } catch (_) { return false; }
}

function initIntroLanding() {
  const intro = document.getElementById('introLanding');
  const primaryButton = document.getElementById('introGetStartedBtn');
  const heroStartButton = document.getElementById('introHeroStartBtn');
  const heroExploreButton = document.getElementById('introHeroExploreBtn');
  const footerCtaButton = document.getElementById('introFooterCtaBtn');
  if (!intro || !primaryButton) return;

  if (!shouldShowIntroLanding()) {
    hideIntroLanding(false);
    return;
  }

  intro.style.display = '';
  intro.classList.remove('hidden');
  document.body.classList.add('intro-active');
  const shell = document.querySelector('.app');
  if (shell) shell.classList.add('hidden');

  const handleEnter = () => {
    prepareWorkspaceReturnTarget();
    hideIntroLanding(true);
    showLoginView();
  };

  const navbar = document.getElementById('introNavbar');
  const onScroll = () => {
    if (!navbar || intro.classList.contains('hidden')) return;
    navbar.classList.toggle('is-scrolled', intro.scrollTop > 24);
  };

  primaryButton.onclick = handleEnter;
  if (heroStartButton) heroStartButton.onclick = handleEnter;
  if (footerCtaButton) footerCtaButton.onclick = handleEnter;
  if (heroExploreButton) heroExploreButton.onclick = handleEnter;

  intro.removeEventListener('scroll', onScroll);
  intro.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function createIntroCosmos() {
  const container = document.getElementById('introWebglContainer');
  if (container) {
    while (container.firstChild) container.removeChild(container.firstChild);
  }
  return {
    destroy() {}
  };
}

function renderHyperknowLinks(webSources) {
  if (!webSources || !webSources.length) return '';
  const cleaned = sortSourcesByType(webSources)
    .filter(s => s && s.url)
    .slice(0, 10);
  if (!cleaned.length) return '';
  return `<section class="hyperknow-links-container">
    <div class="hyperknow-links-header">Searching Web ✓</div>
    <div class="hyperknow-links-list">
      ${renderWebSourceCards(cleaned, { compact: true, showBuckets: false })}
    </div>
  </section>`;
}


// ════════════════════════════════════════════════════════════════
// CLERK AUTH + USER MEMORY
// ════════════════════════════════════════════════════════════════

// ❗ Fill in your Clerk Publishable Key here after creating an app at https://clerk.com
const CLERK_PUBLISHABLE_KEY = 'pk_test_ZHJpdmVuLXRyb2xsLTI4LmNsZXJrLmFjY291bnRzLmRldiQ';
const AUTH_CALLBACK_FLAG = 'auth_callback';
const AUTH_VIEW_FLAG = 'view';
const AUTH_RETURN_INTENT_KEY = 'aquarius-auth-return-intent';
const AUTH_RETURN_TARGET_KEY = 'aquarius-auth-return-target';

let currentUser = null;  // { uid, name, email, imageUrl }
let userMemory  = {};    // loaded from backend after login

const DEFAULT_PREFERENCE_PROFILE = `# Fourier Learning Profile

## Current Goal
- Prepare for Linear Systems & Signals with enough conceptual understanding to solve exam problems confidently.

## Preferred Teaching Style
- Start with intuition, then show the formula.
- Use one minimal example after each new definition.
- Keep pages visually light; avoid long dense paragraphs.
- When formulas appear, summarize the core formulas clearly.

## Known Friction Points
- Complex numbers, phase, and sign conventions can become confusing.
- I need reminders about common traps and notation mistakes.

## Tutor Behavior
- Be direct, warm, and exam-aware.
- If I ask a question with an image, use the image as primary context.
- If a textbook figure already explains the concept, prefer that over generated images.
`;

let clerkInstance = null;
let loginScene = null;
let openClerkSignIn = () => {};
let loginActionBusy = false;
let authRedirectInProgress = false;
let allowAuthNavigation = false;

function isQuizProfileComplete(memory = userMemory) {
  return Boolean(memory && memory.quiz && ['track', 'math', 'timeline', 'preference', 'priority'].every(k => {
    const v = memory.quiz[k];
    return Array.isArray(v) ? v.length > 0 : !!v;
  }));
}

function setLoginStatus(message = '', type = 'error') {
  const statusEl = document.getElementById('loginStatusMessage');
  if (!statusEl) return;
  if (!message) {
    statusEl.textContent = '';
    statusEl.classList.add('hidden');
    statusEl.classList.remove('is-info');
    return;
  }
  statusEl.textContent = message;
  statusEl.classList.remove('hidden');
  statusEl.classList.toggle('is-info', type === 'info');
}

function setLoginButtonsBusy(isBusy) {
  loginActionBusy = isBusy;
  [
    'clerkGithubBtnLogin',
    'clerkGoogleBtnLogin',
    'clerkSignInBtnLogin',
    'guestModeBtnLogin'
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.disabled = isBusy;
  });
}

function destroyLoginScene() {
  if (loginScene && typeof loginScene.destroy === 'function') {
    loginScene.destroy();
    loginScene = null;
  }
}

function getBaseAppUrl() {
  return `${window.location.origin}${window.location.pathname}`;
}

function getLoginPageUrl() {
  const url = new URL(getBaseAppUrl());
  url.searchParams.set(AUTH_VIEW_FLAG, 'login');
  return url.toString();
}

function getAuthCallbackUrl(provider) {
  const url = new URL(getBaseAppUrl());
  url.searchParams.set(AUTH_CALLBACK_FLAG, provider);
  url.searchParams.set(AUTH_VIEW_FLAG, 'login');
  return url.toString();
}

function isAuthCallbackRequest() {
  const params = new URLSearchParams(window.location.search);
  return params.has(AUTH_CALLBACK_FLAG);
}

function clearAuthCallbackParams() {
  const url = new URL(window.location.href);
  url.searchParams.delete(AUTH_CALLBACK_FLAG);
  url.searchParams.delete(AUTH_VIEW_FLAG);
  window.history.replaceState({}, document.title, url.toString());
}

function setAuthReturnIntent(intent = 'workspace') {
  try { sessionStorage.setItem(AUTH_RETURN_INTENT_KEY, intent); } catch (_) {}
}

function peekAuthReturnIntent() {
  try { return sessionStorage.getItem(AUTH_RETURN_INTENT_KEY) || ''; } catch (_) { return ''; }
}

function ensureAuthReturnIntent(intent = 'workspace') {
  if (!peekAuthReturnIntent()) setAuthReturnIntent(intent);
}

function consumeAuthReturnIntent() {
  try {
    const intent = sessionStorage.getItem(AUTH_RETURN_INTENT_KEY) || '';
    sessionStorage.removeItem(AUTH_RETURN_INTENT_KEY);
    return intent;
  } catch (_) {
    return '';
  }
}

function setAuthReturnTarget(target) {
  if (!target) return;
  try { sessionStorage.setItem(AUTH_RETURN_TARGET_KEY, JSON.stringify(target)); } catch (_) {}
}

function clearAuthReturnTarget() {
  try { sessionStorage.removeItem(AUTH_RETURN_TARGET_KEY); } catch (_) {}
}

function peekAuthReturnTarget() {
  try {
    const raw = sessionStorage.getItem(AUTH_RETURN_TARGET_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

function consumeAuthReturnTarget() {
  const target = peekAuthReturnTarget();
  try { sessionStorage.removeItem(AUTH_RETURN_TARGET_KEY); } catch (_) {}
  return target;
}

function getFirstLearnTarget() {
  const chapters = Array.isArray(syllabusData) ? syllabusData : [];
  for (const chapter of chapters) {
    const sections = Array.isArray(chapter.sections) ? chapter.sections : [];
    for (const rawSection of sections) {
      const section = typeof rawSection === 'string' ? { title: rawSection, subsections: [] } : rawSection;
      const title = section.title || section.sectionTitle || '';
      const subsections = Array.isArray(section.subsections) ? section.subsections : [];
      if (subsections.length && !isB8TextbookOnlySection(title, title)) {
        return { type: 'lesson', sectionId: subsections[0], sectionTitle: subsections[0], book: currentBook };
      }
      if (title) return { type: 'lesson', sectionId: title, sectionTitle: title, book: currentBook };
    }
  }
  return null;
}

function prepareLearnReturnTarget(target = null) {
  setAuthReturnIntent('learn');
  setAuthReturnTarget(target || getFirstLearnTarget());
}

function prepareWorkspaceReturnTarget() {
  setAuthReturnIntent('workspace');
  clearAuthReturnTarget();
}

function continueToPendingLearnTarget() {
  const target = consumeAuthReturnTarget();
  if (!target) return false;
  if (target.book && target.book !== currentBook) {
    setBook(target.book, { preserveView: true });
  }
  if (target.type === 'overview' || shouldOpenSectionAsChapterOverview(target.sectionId, target.sectionTitle, target.subsections || [])) {
    openChapterOverviewMode(target.sectionId, target.sectionTitle, target.subsections || []);
  } else {
    openLearnMode(target.sectionId, target.sectionTitle, target.subsections || []);
  }
  return true;
}

async function enterWorkspaceWithExistingSession() {
  if (!clerkInstance?.user) return false;
  allowAuthNavigation = true;
  ensureAuthReturnIntent('workspace');
  await onUserSignedIn(clerkInstance.user);
  return true;
}

async function startOAuthRedirect(provider) {
  console.log(`[Login] startOAuthRedirect(${provider})`, { clerkLoaded: !!window.Clerk?.loaded, hasClient: !!window.Clerk?.client });
  if (loginActionBusy) return;
  if (!clerkInstance) {
    setLoginStatus('Sign-in service is still loading. Please wait a moment and try again.', 'error');
    openClerkSignIn();
    return;
  }
  try {
    await clerkInstance.load();
    if (clerkInstance.user) {
      await enterWorkspaceWithExistingSession();
      return;
    }
    allowAuthNavigation = true;
    ensureAuthReturnIntent('workspace');
    authRedirectInProgress = true;
    document.body.classList.add('auth-redirecting');
    showLoginView();
    setLoginStatus(`Connecting to ${provider === 'github' ? 'GitHub' : 'Google'}...`, 'info');
    setLoginButtonsBusy(true);
    const strategy = provider === 'github' ? 'oauth_github' : 'oauth_google';
    if (clerkInstance.client?.signIn?.authenticateWithRedirect) {
      await clerkInstance.client.signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: getAuthCallbackUrl(provider),
        redirectUrlComplete: getBaseAppUrl()
      });
      return;
    }
    setLoginStatus('');
    setLoginButtonsBusy(false);
    openClerkSignIn();
  } catch (err) {
    allowAuthNavigation = false;
    authRedirectInProgress = false;
    document.body.classList.remove('auth-redirecting');
    console.error(`[Clerk OAuth ${provider}]`, err);
    const status = err?.status || err?.errors?.[0]?.meta?.status;
    if (status === 429) {
      setLoginStatus('Google / GitHub login is temporarily rate-limited by Clerk. Please wait 20-30 seconds and try again.', 'error');
    } else if (status === 400) {
      setLoginStatus('This browser already has a sign-in session. Refresh once, then use Sign In or continue as Guest.', 'error');
    } else {
      setLoginStatus(`Could not start ${provider === 'github' ? 'GitHub' : 'Google'} login. Please try again or use Sign In below.`, 'error');
    }
    setLoginButtonsBusy(false);
  }
}

async function handleAuthRedirectIfNeeded() {
  if (!clerkInstance || !isAuthCallbackRequest()) return false;
  try {
    allowAuthNavigation = true;
    ensureAuthReturnIntent('workspace');
    authRedirectInProgress = true;
    document.body.classList.add('auth-redirecting');
    showLoginView();
    setLoginStatus('Completing sign-in...', 'info');
    setLoginButtonsBusy(true);
    await clerkInstance.handleRedirectCallback({
      signInUrl: getLoginPageUrl(),
      signUpUrl: getLoginPageUrl(),
      signInFallbackRedirectUrl: getBaseAppUrl(),
      signUpFallbackRedirectUrl: getBaseAppUrl()
    });
    clearAuthCallbackParams();
    return true;
  } catch (err) {
    allowAuthNavigation = false;
    authRedirectInProgress = false;
    document.body.classList.remove('auth-redirecting');
    console.error('[Clerk redirect callback]', err);
    setLoginButtonsBusy(false);
    setLoginStatus('OAuth callback could not be completed. Please try again or use Sign In below.', 'error');
    clearAuthCallbackParams();
    return false;
  }
}

function initLoginExperience() {
  const loginContainer = document.getElementById('loginWebglContainer');
  if (!loginContainer) return;

  if (!loginContainer.dataset.bound) {
    loginContainer.dataset.bound = '1';

    const wrapper = document.querySelector('.login-tilt-wrapper');
    const card = document.getElementById('loginCard');
    if (wrapper && card && window.matchMedia('(hover: hover)').matches) {
      wrapper.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        card.style.animation = 'none';
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });

      wrapper.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
        setTimeout(() => {
          card.style.animation = 'float-card 6s ease-in-out infinite';
        }, 150);
      });
    }

    const passwordInput = document.getElementById('loginPasswordInput');
    const passwordToggle = document.getElementById('loginPasswordToggleBtn');
    if (passwordInput && passwordToggle) {
      passwordToggle.addEventListener('click', () => {
        const nextType = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = nextType;
        passwordToggle.setAttribute('aria-label', nextType === 'password' ? 'Show password' : 'Hide password');
      });
    }

    const relayToClerk = (id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('clerkSignInBtnLogin')?.click();
      });
    };

    const directOAuth = (id, provider) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('click', (event) => {
        event.preventDefault();
        startOAuthRedirect(provider);
      });
    };

    directOAuth('clerkGoogleBtnLogin', 'google');
    directOAuth('clerkGithubBtnLogin', 'github');
    relayToClerk('loginForgotBtn');
    relayToClerk('loginSignupBtn');
  }

  if (!loginScene && window.THREE) {
    loginScene = createLoginCosmos();
  }
}

function createLoginCosmos() {
  const container = document.getElementById('loginWebglContainer');
  if (!container || !window.THREE) return null;

  while (container.firstChild) container.removeChild(container.firstChild);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020617, 0.0015);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.set(0, 400, 400);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const particlesCount = 15000;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);
  const sizes = new Float32Array(particlesCount);
  const colorPalette = [
    new THREE.Color(0x38BDF8),
    new THREE.Color(0x818CF8),
    new THREE.Color(0xFFFFFF),
    new THREE.Color(0x020617)
  ];

  for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3;
    const radius = Math.pow(Math.random(), 2) * 800;
    const angle = Math.random() * Math.PI * 2;
    const heightVariance = ((800 - radius) / 800) * 40;
    const y = (Math.random() - 0.5) * heightVariance;
    const spiralOffset = radius * 0.01;

    positions[i3] = Math.cos(angle + spiralOffset) * radius;
    positions[i3 + 1] = y;
    positions[i3 + 2] = Math.sin(angle + spiralOffset) * radius;

    let color;
    if (radius < 80) color = colorPalette[2];
    else if (radius < 300) color = Math.random() > 0.5 ? colorPalette[1] : colorPalette[2];
    else color = Math.random() > 0.3 ? colorPalette[0] : colorPalette[3];

    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
    sizes[i] = (1 - (radius / 800)) * 3 + 0.5;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0.0 },
      pixelRatio: { value: renderer.getPixelRatio() }
    },
    vertexShader: `
      uniform float time;
      uniform float pixelRatio;
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * pixelRatio * (800.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        float glow = pow(1.0 - (dist * 2.0), 2.0);
        gl_FragColor = vec4(vColor, glow * 0.9);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(geometry, material);
  particles.rotation.x = Math.PI * 0.1;
  scene.add(particles);

  let frameId = 0;
  let mouseX = 0;
  let mouseY = 0;
  const clock = new THREE.Clock();

  const onMouseMove = (event) => {
    mouseX = event.clientX - window.innerWidth / 2;
    mouseY = event.clientY - window.innerHeight / 2;
  };

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    material.uniforms.pixelRatio.value = renderer.getPixelRatio();
  };

  document.addEventListener('mousemove', onMouseMove);
  window.addEventListener('resize', onResize);

  const animate = () => {
    frameId = requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();
    material.uniforms.time.value = elapsedTime;
    particles.rotation.y += 0.0015;
    camera.position.x += (mouseX * 0.1 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 0.1 + 400 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  };

  animate();

  return {
    destroy() {
      cancelAnimationFrame(frameId);
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    }
  };
}

// ─────────────────────────────────────────────────
function hideAuthOverlay() {
  const o = document.getElementById('authOverlay');
  if (o) o.style.display = 'none';
}

function showAuthOverlay() {
  const intro = document.getElementById('introLanding');
  if (intro && !intro.classList.contains('hidden')) return;
  showLoginView();
}

let clerkSignInMounted = false;
const sidebarSettingsBtn = document.getElementById('sidebarSettingsBtn');
const settingsUserCard = document.getElementById('settingsUserCard');
const workspaceAccountBar = document.getElementById('workspaceAccountBar');
const workspaceGoogleBtn = document.getElementById('workspaceGoogleBtn');
const workspaceAccountAvatar = document.getElementById('workspaceAccountAvatar');

function renderWorkspaceAccountBar() {
  if (!workspaceAccountBar || !workspaceGoogleBtn || !workspaceAccountAvatar) return;
  const hasSignedInUser = currentUser && !currentUser.isGuest;
  const hasGuest = currentUser && currentUser.isGuest;
  workspaceGoogleBtn.classList.toggle('hidden', hasSignedInUser);
  workspaceAccountAvatar.classList.toggle('is-signed-in', hasSignedInUser);
  workspaceAccountAvatar.classList.toggle('is-guest', hasGuest);

  if (hasSignedInUser) {
    const name = currentUser.name || 'Student';
    const image = currentUser.imageUrl || '';
    workspaceAccountAvatar.title = `${name} · Account`;
    workspaceAccountAvatar.setAttribute('aria-label', `${name} account`);
    workspaceAccountAvatar.innerHTML = image
      ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(name)}">`
      : `<span class="workspace-account-initial">${escapeHtml((name[0] || '?').toUpperCase())}</span>`;
    return;
  }

  if (hasGuest) {
    workspaceGoogleBtn.classList.remove('hidden');
    workspaceGoogleBtn.querySelector('.workspace-google-label').textContent = 'Sign in';
    workspaceAccountAvatar.title = 'Guest mode';
    workspaceAccountAvatar.setAttribute('aria-label', 'Guest mode account');
    workspaceAccountAvatar.innerHTML = '<span class="workspace-account-initial">G</span>';
    return;
  }

  workspaceGoogleBtn.querySelector('.workspace-google-label').textContent = 'Sign in';
  workspaceAccountAvatar.title = 'Account';
  workspaceAccountAvatar.setAttribute('aria-label', 'Account');
  workspaceAccountAvatar.innerHTML = '<span class="workspace-account-initial">?</span>';
}

function bindWorkspaceAccountBar() {
  if (workspaceGoogleBtn && !workspaceGoogleBtn.dataset.boundAccountAction) {
    workspaceGoogleBtn.dataset.boundAccountAction = '1';
    workspaceGoogleBtn.addEventListener('click', () => startOAuthRedirect('google'));
  }
  if (workspaceAccountAvatar && !workspaceAccountAvatar.dataset.boundAccountAction) {
    workspaceAccountAvatar.dataset.boundAccountAction = '1';
    workspaceAccountAvatar.addEventListener('click', () => {
      if (currentUser && !currentUser.isGuest) showSettingsView();
      else startOAuthRedirect('google');
    });
  }
  renderWorkspaceAccountBar();
}

function setWorkspaceAccountBarVisible(visible) {
  if (!workspaceAccountBar) return;
  workspaceAccountBar.classList.toggle('hidden', !visible);
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
    const handledRedirect = await handleAuthRedirectIfNeeded();
    if (handledRedirect) {
      try { await clerkInstance.load(); } catch (_) {}
      if (clerkInstance.user) {
        await onUserSignedIn(clerkInstance.user);
      } else {
        showLoginView();
      }
      return;
    }

    // Add listener to intercept login changes during redirect/session resumption
    clerkInstance.addListener(async (e) => {
      if (e.user) {
        hideAuthOverlay();
        const shouldEnter = allowAuthNavigation || authRedirectInProgress || hasPendingAuthReturnIntent();
        if (shouldEnter) await onUserSignedIn(e.user);
        else await syncCurrentUserWithoutNavigation(e.user);
      } else {
        showAuthOverlay();
      }
    });

    // Check immediately if already logged in or session resumed early
    if (clerkInstance.user) {
      hideAuthOverlay();
      const shouldEnter = allowAuthNavigation || authRedirectInProgress || hasPendingAuthReturnIntent();
      if (shouldEnter) await onUserSignedIn(clerkInstance.user);
      else await syncCurrentUserWithoutNavigation(clerkInstance.user);
      return;
    }
  } else {
    // Show the choice overlay if Clerk completely failed and we have no fallback listener
    showAuthOverlay();
  }

  // ─ Sign In / Create Account button ─
  const mountDrawerSignIn = () => {
    console.log('[Login] openClerkSignIn()', { clerkInstance: !!clerkInstance, loaded: !!clerkInstance?.loaded });
    if (loginActionBusy) return;
    if (!clerkInstance) {
      setLoginStatus('Sign-in service failed to load. Please refresh the page and try again, or continue as Guest.', 'error');
      alert('Sign-in service failed to load. Please refresh the page and try again, or continue as Guest.');
      return;
    }
    allowAuthNavigation = true;
    ensureAuthReturnIntent('workspace');
    setLoginStatus('Opening sign-in form...', 'info');
    setLoginButtonsBusy(true);
    const targets = [
      {
        primaryBtn: document.getElementById('clerkSignInBtnSettings'),
        guestBtn: document.getElementById('guestModeBtnSettings'),
        mount: document.getElementById('clerkMountSettings')
      },
      {
        primaryBtn: document.getElementById('clerkSignInBtnLogin'),
        guestBtn: document.getElementById('guestModeBtnLogin'),
        mount: document.getElementById('clerkMountLogin')
      }
    ];
    const activeTarget = targets.find(t => t.primaryBtn && !t.primaryBtn.closest('.hidden') && t.primaryBtn.offsetParent !== null) || targets[0];
    if (activeTarget?.mount?.id === 'clerkMountLogin') {
      if (loginCustomStage) loginCustomStage.classList.add('hidden');
      if (loginClerkStage) loginClerkStage.classList.remove('hidden');
    }
    if (activeTarget?.primaryBtn) activeTarget.primaryBtn.style.display = 'none';
    if (activeTarget?.guestBtn) activeTarget.guestBtn.style.display = 'none';
    if (activeTarget?.mount) activeTarget.mount.style.display = 'block';
    if (activeTarget?.mount && !clerkSignInMounted) {
      clerkInstance.mountSignIn(activeTarget.mount);
      clerkSignInMounted = true;
    }
    setTimeout(() => {
      setLoginButtonsBusy(false);
      setLoginStatus('');
    }, 300);
  };
  openClerkSignIn = mountDrawerSignIn;
  const primaryBtn = document.getElementById('clerkSignInBtnSettings');
  if (primaryBtn) primaryBtn.onclick = mountDrawerSignIn;
  const primaryBtnLogin = document.getElementById('clerkSignInBtnLogin');
  if (primaryBtnLogin) primaryBtnLogin.onclick = mountDrawerSignIn;
  bindWorkspaceAccountBar();

  const enterGuestMode = (afterEnter = null) => {
    setLoginStatus('Entering guest mode...', 'info');
    startGuestMode();
    if (typeof afterEnter === 'function') afterEnter();
  };

  const guestBtn = document.getElementById('guestModeBtnSettings');
  if (guestBtn && !guestBtn.dataset.boundGuestMode) {
    guestBtn.dataset.boundGuestMode = '1';
    guestBtn.addEventListener('click', () => {
      enterGuestMode(() => showSettingsView());
    });
  }

  const guestBtnLogin = document.getElementById('guestModeBtnLogin');
  if (guestBtnLogin && !guestBtnLogin.dataset.boundGuestMode) {
    guestBtnLogin.dataset.boundGuestMode = '1';
    guestBtnLogin.addEventListener('click', () => {
      enterGuestMode();
    });
  }

  // Also listen for sign-in completion (e.g., after OAuth redirect)
  if (clerkInstance) {
    clerkInstance.addListener(({ user }) => {
      if (user && !currentUser) {
        hideAuthOverlay();
        const shouldEnter = allowAuthNavigation || authRedirectInProgress || hasPendingAuthReturnIntent();
        if (shouldEnter) onUserSignedIn(user);
        else syncCurrentUserWithoutNavigation(user);
      }
    });
  }
}

async function onUserSignedIn(user) {
  const navigationAllowed = allowAuthNavigation || authRedirectInProgress || hasPendingAuthReturnIntent();
  authRedirectInProgress = false;
  document.body.classList.remove('auth-redirecting');
  const authReturnIntent = consumeAuthReturnIntent();
  allowAuthNavigation = false;
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
  if (!userMemory.preferenceProfile || !userMemory.preferenceProfile.markdown) {
    userMemory.preferenceProfile = {
      markdown: DEFAULT_PREFERENCE_PROFILE,
      updatedAt: new Date().toISOString(),
      source: 'default',
      manualEdited: false
    };
  }
  updatePreferenceSidebarSummary();
  updateLearnModeBadge(userMemory && userMemory.quiz ? userMemory.quiz.track : null);
  renderUserBadge();

  const quizDone = isQuizProfileComplete(userMemory);
  const shouldEnterWorkspace = navigationAllowed && (authReturnIntent === 'workspace' || authReturnIntent === 'learn');

  if (!shouldEnterWorkspace) return;

  hideIntroLanding(true);
  if (authReturnIntent === 'learn' && quizDone && continueToPendingLearnTarget()) return;
  showWelcome();
  if (authReturnIntent === 'learn' && !quizDone) showQuiz();
}

async function syncCurrentUserWithoutNavigation(user) {
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
  if (!userMemory.preferenceProfile || !userMemory.preferenceProfile.markdown) {
    userMemory.preferenceProfile = {
      markdown: DEFAULT_PREFERENCE_PROFILE,
      updatedAt: new Date().toISOString(),
      source: 'default',
      manualEdited: false
    };
  }
  updatePreferenceSidebarSummary();
  updateLearnModeBadge(userMemory && userMemory.quiz ? userMemory.quiz.track : null);
  renderUserBadge();
}

function startGuestMode() {
  authRedirectInProgress = false;
  document.body.classList.remove('auth-redirecting');
  hideIntroLanding(true);
  // Guest uid lives only in sessionStorage (cleared on tab close)
  let gid = sessionStorage.getItem('guestUid');
  if (!gid) {
    gid = 'guest_' + Math.random().toString(36).slice(2, 10);
    sessionStorage.setItem('guestUid', gid);
  }
  currentUser = { uid: gid, name: 'Guest', isGuest: true };
  userMemory = {
    preferenceProfile: {
      markdown: DEFAULT_PREFERENCE_PROFILE,
      updatedAt: new Date().toISOString(),
      source: 'default',
      manualEdited: false
    }
  };
  setLoginButtonsBusy(false);
  setLoginStatus('');
  if (appShell) appShell.classList.remove('hidden');
  if (loginView) loginView.classList.add('hidden');
  if (welcomeScreen) welcomeScreen.classList.remove('hidden');
  if (answerScreen) answerScreen.classList.add('hidden');
  if (learnView) learnView.classList.add('hidden');
  if (settingsView) settingsView.classList.add('hidden');
  if (feedbackView) feedbackView.classList.add('hidden');
  if (homeworkView) homeworkView.classList.add('hidden');
  if (courseTrackerView) courseTrackerView.classList.add('hidden');
  if (mistakeNotebookView) mistakeNotebookView.classList.add('hidden');
  if (topbar) topbar.classList.add('hidden');
  renderUserBadge();
  updatePreferenceSidebarSummary();
  showQuiz();
}

// Helper for handling sign-out
async function handleSignOut() {
  authRedirectInProgress = false;
  document.body.classList.remove('auth-redirecting');
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
  renderWorkspaceAccountBar();
  const card = document.getElementById('settingsUserCard');
  if (!card || !currentUser) return;
  const shortUid = currentUser.uid.includes('_') ? currentUser.uid.split('_')[1].substring(0,6) : currentUser.uid.substring(currentUser.uid.length-6);
  if (currentUser.isGuest) {
    card.innerHTML = `
      <div class="settings-user-card" style="display:flex; align-items:center; gap:16px; padding:20px; border:3px solid #cbd5e1; border-radius:24px; background:#fff; box-shadow: 0 6px 0 #cbd5e1;">
        <div class="settings-user-avatar" style="width:56px; height:56px; border-radius:50%; border:3px solid #94a3b8; display:flex; align-items:center; justify-content:center; font-size:24px; background:#f1f5f9;">👤</div>
        <div class="settings-user-body" style="flex:1;">
          <div class="settings-user-name" style="font-family:'Quicksand', sans-serif; font-weight:800; font-size:18px; color:#1e293b;">Guest</div>
          <div class="settings-user-meta" style="font-family:'DM Mono', monospace; font-size:11px; color:#94a3b8; font-weight:600; letter-spacing:1px; margin-top:4px;">UID: ${shortUid.toUpperCase()}</div>
        </div>
        <button class="settings-user-link settings-user-danger" onclick="handleSignOut()" type="button" style="background:#fff1f2; border:2px solid #fca5a5; border-radius:10px; padding:6px 12px; font-weight:800; color:#e11d48; font-size:12px; box-shadow:0 2px 0 #fca5a5; cursor:pointer;">Exit</button>
      </div>
    `;
  } else {
    const av = currentUser.imageUrl ? `<img src="${currentUser.imageUrl}" class="settings-user-avatar-img" style="width:56px; height:56px; border-radius:50%; border:3px solid #38bdf8;" />` : `<div class="settings-user-avatar" style="width:56px; height:56px; border-radius:50%; border:3px solid #38bdf8; display:flex; align-items:center; justify-content:center; font-size:24px; background:#f0f9ff; color:#0284c7; font-weight:800;">${(currentUser.name[0]||'?').toUpperCase()}</div>`;
    card.innerHTML = `
      <div class="settings-user-card" style="display:flex; align-items:center; gap:16px; padding:20px; border:3px solid #cbd5e1; border-radius:24px; background:#fff; box-shadow: 0 6px 0 #cbd5e1;">
        ${av}
        <div class="settings-user-body" style="flex:1;">
          <div class="settings-user-name" style="font-family:'Quicksand', sans-serif; font-weight:800; font-size:18px; color:#1e293b;">${currentUser.name}</div>
          <div class="settings-user-meta" style="font-family:'DM Mono', monospace; font-size:11px; color:#94a3b8; font-weight:600; letter-spacing:1px; margin-top:4px;">ID: #${shortUid.toUpperCase()}</div>
        </div>
        <div class="settings-user-actions" style="display:flex; flex-direction:column; gap:8px;">
          <button class="settings-user-link" onclick="resetQuiz()" type="button" style="background:#f1f5f9; border:2px solid #cbd5e1; border-radius:10px; padding:6px 12px; font-weight:700; color:#475569; font-size:12px; box-shadow:0 2px 0 #cbd5e1; cursor:pointer;">Preferences</button>
          <button class="settings-user-link settings-user-danger" onclick="handleSignOut()" type="button" style="background:#fff1f2; border:2px solid #fca5a5; border-radius:10px; padding:6px 12px; font-weight:800; color:#e11d48; font-size:12px; box-shadow:0 2px 0 #fca5a5; cursor:pointer;">Sign out</button>
        </div>
      </div>
    `;
  }
}

function getPreferenceProfileMarkdown() {
  const stored = userMemory && userMemory.preferenceProfile && typeof userMemory.preferenceProfile.markdown === 'string'
    ? userMemory.preferenceProfile.markdown
    : '';
  return stored.trim() || DEFAULT_PREFERENCE_PROFILE;
}

function getQuizOptionLabel(key, value) {
  const question = QUIZ_QUESTIONS.find(item => item.key === key);
  const option = question && question.options.find(item => item.value === value);
  return option ? option.en.replace(/\s*[^\x00-\x7F]+$/g, '').trim() : String(value || '').replace(/_/g, ' ');
}

function getQuizAnswerLabels(key, value) {
  const values = Array.isArray(value) ? value : (value ? [value] : []);
  return values.map(item => getQuizOptionLabel(key, item)).filter(Boolean);
}

function buildQuizPreferenceMarkdown(quiz = {}) {
  const track = getQuizOptionLabel('track', quiz.track || 'standard');
  const math = getQuizOptionLabel('math', quiz.math || 'calculus_ok');
  const timeline = getQuizOptionLabel('timeline', quiz.timeline || 'two_weeks');
  const preference = getQuizAnswerLabels('preference', quiz.preference).join('; ') || 'Use a balanced concept-first start';
  const priority = getQuizAnswerLabels('priority', quiz.priority).join('; ') || 'Build confidence and solve standard problems';

  return `# Fourier Learning Profile

## Quick Setup Snapshot
- Learning mode: ${track}
- Math background: ${math}
- Exam timeline: ${timeline}
- Preferred lesson opening: ${preference}
- Current priorities: ${priority}

## Tutor Behavior
- Use this Quick Setup snapshot as the default pacing and format signal.
- Keep explanations aligned with the current exam timeline and math comfort level.
- Update the approach when later observed learning history gives stronger evidence.`;
}

function normalizePreferenceProfileMarkdown(markdown = '') {
  return String(markdown || '').replace(/\r\n/g, '\n').trim();
}

function isDefaultPreferenceProfile(markdown = '') {
  return normalizePreferenceProfileMarkdown(markdown) === normalizePreferenceProfileMarkdown(DEFAULT_PREFERENCE_PROFILE);
}

function isManuallyEditedPreferenceProfile(profile = {}) {
  if (!profile || !profile.markdown) return false;
  if (profile.manualEdited === true) return true;
  if (['quick_setup', 'merged_quick_setup', 'default'].includes(profile.source)) return false;
  return !isDefaultPreferenceProfile(profile.markdown);
}

function buildPreferenceProfileAfterQuiz(quiz = {}, existingProfile = {}) {
  const now = new Date().toISOString();
  const quickMarkdown = buildQuizPreferenceMarkdown(quiz);
  const existingMarkdown = normalizePreferenceProfileMarkdown(existingProfile.markdown);
  const hasManual = isManuallyEditedPreferenceProfile(existingProfile);

  if (!hasManual) {
    return {
      markdown: quickMarkdown,
      updatedAt: now,
      source: 'quick_setup',
      manualEdited: false,
      quizUpdatedAt: now
    };
  }

  const withoutOldQuickSetup = existingMarkdown
    .replace(/\n*---\n*## Latest Quick Setup[\s\S]*$/m, '')
    .trim();

  return {
    markdown: `${withoutOldQuickSetup}

---

## Latest Quick Setup
- Learning mode: ${getQuizOptionLabel('track', quiz.track || 'standard')}
- Math background: ${getQuizOptionLabel('math', quiz.math || 'calculus_ok')}
- Exam timeline: ${getQuizOptionLabel('timeline', quiz.timeline || 'two_weeks')}
- Preferred lesson opening: ${getQuizAnswerLabels('preference', quiz.preference).join('; ') || 'Use a balanced concept-first start'}
- Current priorities: ${getQuizAnswerLabels('priority', quiz.priority).join('; ') || 'Build confidence and solve standard problems'}

## Priority Rule
- Treat the manually written profile above as higher priority.
- Use this Quick Setup block as a recent pacing and format supplement.`,
    updatedAt: now,
    source: 'merged_quick_setup',
    manualEdited: true,
    quizUpdatedAt: now
  };
}

function summarizePreferenceProfile(markdown) {
  const text = String(markdown || '').replace(/^#+\s*/gm, '').replace(/[-*]\s+/g, '').trim();
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
  const preferred = lines.find(line => /intuition|formula|exam|visual|step|example|理解|公式|考试|图/i.test(line)) || lines[0] || 'Tell Fourier how you like to learn.';
  return preferred.length > 88 ? `${preferred.slice(0, 86)}...` : preferred;
}

function renderPreferenceMarkdownPreview(markdown) {
  if (!preferenceProfilePreview) return;
  const source = String(markdown || '').trim() || DEFAULT_PREFERENCE_PROFILE;
  const lines = source.split('\n').map(line => line.trim()).filter(Boolean);
  const bullets = lines
    .filter(line => /^[-*]\s+/.test(line))
    .map(line => line.replace(/^[-*]\s+/, '').trim())
    .filter(Boolean);
  const findSignal = (patterns, fallbackIndex) => {
    const found = bullets.find(line => patterns.some(pattern => pattern.test(line)));
    return found || bullets[fallbackIndex] || 'Keep tutoring concise, visual, and exam-aware.';
  };
  const signals = [
    {
      label: 'Goal',
      text: findSignal([/prepare|goal|exam|confident|solve/i], 0)
    },
    {
      label: 'Teaching Style',
      text: findSignal([/intuition|formula|example|visual|step|pages/i], 1)
    },
    {
      label: 'Watch For',
      text: findSignal([/\btrap\b|friction|confus|mistake|\bsign\b|notation/i], 2)
    }
  ];
  preferenceProfilePreview.innerHTML = signals.map(signal => `
    <article class="preference-signal-card">
      <div class="preference-signal-label">${escapeHtml(signal.label)}</div>
      <p>${escapeHtml(signal.text)}</p>
    </article>
  `).join('');
}

function updatePreferenceSidebarSummary() {
  if (!preferenceSidebarSummary) return;
  const markdown = getPreferenceProfileMarkdown();
  preferenceSidebarSummary.innerHTML = `
    <div class="preference-sidebar-kicker">Learning profile</div>
    <div class="preference-sidebar-text">${escapeHtml(summarizePreferenceProfile(markdown))}</div>
  `;
}

const COURSE_TRACKER_STORAGE_KEY = 'aquariusCourseTrackerFall2025';
const COURSE_TRACKER_STATUSES = ['Not started', 'In progress', 'Done', 'Review'];
const HOMEWORK_STORAGE_KEY = 'aquariusHomework.v1';
const HOMEWORK_EXPLANATION_STORAGE_KEY = 'aquariusHomeworkExplanations.v1';
const HOMEWORK_STATUSES = ['Todo', 'Working', 'Explained', 'Done'];
const MISTAKE_NOTEBOOK_STORAGE_KEY = 'aquariusMistakeNotebook.v1';
let currentHomeworkSetId = null;
let currentHomeworkId = null;
let currentMistakeId = null;
const COURSE_GRADE_RULES = [
  { label: 'Homework', detail: '10 HWs', weight: 20 },
  { label: 'Midterm 1', detail: '10/21', weight: 20 },
  { label: 'Midterm 2', detail: '11/18', weight: 20 },
  { label: 'Final', detail: 'Date TBA', weight: 40 }
];
const COURSE_SCHEDULE = [
  { id: 'lecture-1', date: '9/2', lecture: 'Lecture #1', topic: 'Math background: complex numbers, sinusoids', sections: 'B1-B2' },
  { id: 'lecture-2', date: '9/4', lecture: 'Lecture #2', topic: 'Signal energy, power; signal classifications; basic signal operations', sections: '1.1, 1.2, 1.3' },
  { id: 'lecture-3', date: '9/9', lecture: 'Lecture #3', topic: 'Useful signals; even and odd signals', sections: '1.4, 1.5' },
  { id: 'lecture-4', date: '9/11', lecture: 'Lecture #4', topic: 'Systems classifications', sections: '1.7' },
  { id: 'lecture-5', date: '9/16', lecture: 'Lecture #5', topic: 'Convolution and its properties', sections: '2.4.1' },
  { id: 'lecture-6', date: '9/18', lecture: 'Lecture #6', topic: 'Computing convolution: analytical and graphical methods', sections: '2.4-1, 2.4-2' },
  { id: 'lecture-7', date: '9/23', lecture: 'Lecture #7', topic: 'Responses of an LTI system, initial conditions, unit impulse response, zero-state response', sections: '2.1, 2.2, 2.3, 2.4' },
  { id: 'lecture-8', date: '9/25', lecture: 'Lecture #8', topic: 'Signal approximation by orthogonal signal set; trigonometric Fourier series; compact form', sections: '3.3.1, 3.3.2, 3.8, 3.4' },
  { id: 'lecture-9', date: '9/30', lecture: 'Lecture #9', topic: 'Existence conditions, determining fundamental frequency, exponential Fourier series', sections: '3.4, 3.5' },
  { id: 'lecture-10', date: '10/2', lecture: 'Lecture #10', topic: 'Relationship among different forms; properties of Fourier series', sections: 'Fourier series forms' },
  { id: 'lecture-11', date: '10/7', lecture: 'Lecture #11', topic: "Properties of Fourier series (cont'd)", sections: 'Fourier series properties' },
  { id: 'lecture-12', date: '10/9', lecture: 'Lecture #12', topic: 'Fourier transform and inverse; useful Fourier transforms', sections: '4.1, 4.2' },
  { id: 'lecture-13', date: '10/14', lecture: 'Lecture #13', topic: 'Problem session part 1; properties of Fourier transform', sections: '4.3' },
  { id: 'lecture-14', date: '10/16', lecture: 'Lecture #14', topic: 'Problem session part 2; application to communications', sections: '4.7' },
  { id: 'lecture-15', date: '10/21', lecture: 'Lecture #15', topic: 'Midterm 1', sections: 'Exam', milestone: 'Midterm 1' },
  { id: 'lecture-16', date: '10/23', lecture: 'Lecture #16', topic: 'Properties of Fourier transform', sections: '4.3' },
  { id: 'lecture-17', date: '10/28', lecture: 'Lecture #17', topic: 'Frequency response of an LTI system, ideal filters, Paley-Wiener criterion', sections: '4.4, 4.5, 3.7' },
  { id: 'lecture-18', date: '10/30', lecture: 'Lecture #18', topic: 'Fourier transform of periodic signals, LTI responses to periodic signals, Nyquist sampling theorem', sections: '4.6, 5.1' },
  { id: 'lecture-19', date: '11/6', lecture: 'Lecture #19', topic: 'Interpolation formula, aliasing and anti-aliasing filter, Laplace transform', sections: '5.1, 5.1-1, 5.1-2, 6.1' },
  { id: 'lecture-20', date: '11/11', lecture: 'Lecture #20', topic: 'Properties of Laplace transform', sections: '6.2, 6.4-2' },
  { id: 'lecture-21', date: '11/13', lecture: 'Lecture #21', topic: 'Inverse Laplace transform; calculating system response using Laplace transform', sections: '6.1-3, 6.3' },
  { id: 'lecture-22', date: '11/18', lecture: 'Lecture #22', topic: 'Midterm 2', sections: 'Exam', milestone: 'Midterm 2' },
  { id: 'lecture-23', date: '11/20', lecture: 'Lecture #23', topic: 'Calculating impulse response, asymptotic stability, BIBO stability', sections: '6.3-1, 2.6, 2.6-1' },
  { id: 'lecture-24', date: '11/25', lecture: 'Lecture #24', topic: 'Block diagrams; state-space representations', sections: '6.5, 6.6, 6.6-1, 6.6-2, 13.1, 13.2, 13.3' },
  { id: 'lecture-25', date: '12/2', lecture: 'Lecture #25', topic: 'State equations from transfer function; frequency response and zero-pole locations', sections: '7.1, 7.1-1, 7.4' },
  { id: 'lecture-26', date: '12/4', lecture: 'Lecture #26', topic: 'Review session', sections: 'Review', milestone: 'Review' }
];

function loadCourseTrackerState() {
  try {
    return JSON.parse(localStorage.getItem(COURSE_TRACKER_STORAGE_KEY) || '{}') || {};
  } catch {
    return {};
  }
}

function saveCourseTrackerState(state) {
  try {
    localStorage.setItem(COURSE_TRACKER_STORAGE_KEY, JSON.stringify(state || {}));
  } catch {}
}

function renderCourseTracker() {
  if (!courseTrackerView) return;
  const state = loadCourseTrackerState();
  const doneCount = COURSE_SCHEDULE.filter(item => state[item.id] === 'Done').length;
  const progressRatio = COURSE_SCHEDULE.length > 0 ? doneCount / COURSE_SCHEDULE.length : 0;
  const progressPercent = Math.round(progressRatio * 100);
  const progressDegrees = Math.round(progressRatio * 360);
  const nextItem = COURSE_SCHEDULE.find(item => state[item.id] !== 'Done') || COURSE_SCHEDULE[COURSE_SCHEDULE.length - 1];
  if (courseDoneCount) courseDoneCount.textContent = String(doneCount);
  if (courseProgressFill) courseProgressFill.style.width = `${progressPercent}%`;
  if (courseProgressRing) {
    courseProgressRing.style.setProperty('--course-progress-deg', `${progressDegrees}deg`);
    courseProgressRing.style.setProperty('--course-progress-percent', `${progressPercent}%`);
  }
  if (courseNextLecture && nextItem) courseNextLecture.textContent = `${nextItem.lecture} · ${nextItem.date}`;
  if (courseNextTopic && nextItem) courseNextTopic.textContent = nextItem.topic;

  if (courseGradeList) {
    courseGradeList.innerHTML = COURSE_GRADE_RULES.map(rule => `
      <div class="course-grade-row">
        <div>
          <div class="course-grade-label">${escapeHtml(rule.label)}</div>
          <div class="course-grade-detail">${escapeHtml(rule.detail)}</div>
        </div>
        <div class="course-grade-weight">${rule.weight}%</div>
      </div>
    `).join('');
  }

  if (courseTrackerTableBody) {
    let activeMonth = '';
    courseTrackerTableBody.innerHTML = COURSE_SCHEDULE.map(item => {
      const status = state[item.id] || 'Not started';
      const options = COURSE_TRACKER_STATUSES.map(option => `<option value="${escapeHtml(option)}"${option === status ? ' selected' : ''}>${escapeHtml(option)}</option>`).join('');
      const month = item.date.split('/')[0];
      const monthName = {
        '9': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December'
      }[month] || month;
      const monthMarker = month !== activeMonth ? `<div class="course-month-marker">${escapeHtml(monthName)}</div>` : '';
      activeMonth = month;
      return `
        ${monthMarker}
        <article class="course-timeline-item${item.milestone ? ' is-milestone' : ''}" data-status="${escapeHtml(status)}">
          <div class="course-date-pill">${escapeHtml(item.date)}</div>
          <div class="course-timeline-body">
            <div class="course-timeline-topline">
              <span class="course-lecture-label">${escapeHtml(item.lecture)}</span>
              ${item.milestone ? `<span class="course-milestone-chip">${escapeHtml(item.milestone)}</span>` : ''}
            </div>
            <h3>${escapeHtml(item.topic)}</h3>
            <div class="course-section-line">${escapeHtml(item.sections)}</div>
          </div>
          <div class="course-timeline-status">
            <select class="course-status-select" data-course-id="${escapeHtml(item.id)}" data-status="${escapeHtml(status)}">
              ${options}
            </select>
          </div>
        </article>
      `;
    }).join('');

    courseTrackerTableBody.querySelectorAll('.course-status-select').forEach(select => {
      select.addEventListener('change', event => {
        const id = event.currentTarget.dataset.courseId;
        const nextState = loadCourseTrackerState();
        nextState[id] = event.currentTarget.value;
        saveCourseTrackerState(nextState);
        renderCourseTracker();
      });
    });
  }
}

function createHomeworkSet(title, problems = []) {
  const now = new Date().toISOString();
  return {
    id: `hw-set-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: title || 'HW1',
    problems: Array.isArray(problems) ? problems : [],
    createdAt: now,
    updatedAt: now
  };
}

function normalizeHomeworkProblem(item = {}, index = 0) {
  const now = new Date().toISOString();
  return {
    id: item.id || `homework-${Date.now()}-${Math.random().toString(36).slice(2, 7)}-${index}`,
    title: item.title || `Problem ${index + 1}`,
    body: item.body || '',
    status: HOMEWORK_STATUSES.includes(item.status) ? item.status : 'Todo',
    explanation: item.explanation || '',
    qa: Array.isArray(item.qa) ? item.qa : [],
    images: Array.isArray(item.images) ? item.images.filter(Boolean) : [],
    createdAt: item.createdAt || now,
    updatedAt: item.updatedAt || now
  };
}

function normalizeHomeworkStore(raw) {
  if (raw && Array.isArray(raw.sets)) {
    const sets = raw.sets.map((set, setIndex) => ({
      id: set.id || `hw-set-${Date.now()}-${setIndex}`,
      title: set.title || `HW${setIndex + 1}`,
      problems: Array.isArray(set.problems) ? set.problems.map(normalizeHomeworkProblem) : [],
      createdAt: set.createdAt || new Date().toISOString(),
      updatedAt: set.updatedAt || new Date().toISOString()
    }));
    return { version: 2, activeSetId: raw.activeSetId || sets[0]?.id || null, sets };
  }
  if (Array.isArray(raw)) {
    const migrated = createHomeworkSet('HW1', raw.map(normalizeHomeworkProblem));
    return { version: 2, activeSetId: migrated.id, sets: [migrated] };
  }
  const first = createHomeworkSet('HW1', []);
  return { version: 2, activeSetId: first.id, sets: [first] };
}

async function refreshHomeworkStoreFromServer() {
  try {
    const res = await fetch(`${API_BASE}/api/homework`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const store = normalizeHomeworkStore(data);
    store.activeSetId = currentHomeworkSetId || store.activeSetId || store.sets[0]?.id || null;
    if (!store.sets.some(set => set.id === store.activeSetId)) store.activeSetId = store.sets[0]?.id || null;
    saveHomeworkStore(store);
    currentHomeworkSetId = store.activeSetId;
    return store;
  } catch (err) {
    setHomeworkSaveState(`Could not load HW folder: ${err.message}`, 'error');
    return loadHomeworkStore();
  }
}

function loadHomeworkStore() {
  try {
    const raw = JSON.parse(localStorage.getItem(HOMEWORK_STORAGE_KEY) || 'null');
    const store = normalizeHomeworkStore(raw);
    if (!store.sets.length) {
      const first = createHomeworkSet('HW1', []);
      store.sets = [first];
      store.activeSetId = first.id;
    }
    if (!store.sets.some(set => set.id === store.activeSetId)) store.activeSetId = store.sets[0].id;
    return store;
  } catch {
    const first = createHomeworkSet('HW1', []);
    return { version: 2, activeSetId: first.id, sets: [first] };
  }
}

function saveHomeworkStore(store) {
  try {
    localStorage.setItem(HOMEWORK_STORAGE_KEY, JSON.stringify(normalizeHomeworkStore(store)));
  } catch {}
}

function getCurrentHomeworkSet(store = loadHomeworkStore()) {
  if (!currentHomeworkSetId) currentHomeworkSetId = store.activeSetId || store.sets[0]?.id || null;
  return store.sets.find(set => set.id === currentHomeworkSetId) || store.sets[0] || null;
}

function getCurrentHomework(itemsOrSet = getCurrentHomeworkSet()) {
  const problems = Array.isArray(itemsOrSet)
    ? itemsOrSet
    : Array.isArray(itemsOrSet?.problems) ? itemsOrSet.problems : [];
  const item = problems.find(problem => problem.id === currentHomeworkId) || problems[0] || null;
  return item ? applyHomeworkProgress(item) : null;
}

function loadHomeworkProgress() {
  try {
    const data = JSON.parse(localStorage.getItem(HOMEWORK_EXPLANATION_STORAGE_KEY) || '{}');
    return data && typeof data === 'object' ? data : {};
  } catch {
    return {};
  }
}

function saveHomeworkProgress(progress) {
  try {
    localStorage.setItem(HOMEWORK_EXPLANATION_STORAGE_KEY, JSON.stringify(progress || {}));
  } catch {}
}

function applyHomeworkProgress(problem) {
  const progress = loadHomeworkProgress()[problem.id] || {};
  return {
    ...problem,
    status: progress.status || problem.status || 'Todo',
    explanation: progress.explanation || problem.explanation || '',
    qa: Array.isArray(progress.qa) ? progress.qa : (Array.isArray(problem.qa) ? problem.qa : [])
  };
}

function updateHomeworkStore(mutator) {
  const store = loadHomeworkStore();
  mutator(store);
  store.activeSetId = currentHomeworkSetId || store.activeSetId || store.sets[0]?.id || null;
  saveHomeworkStore(store);
  return store;
}

function homeworkProblemAttachments(item) {
  return (Array.isArray(item?.images) ? item.images : [])
    .filter(image => image && (image.dataUrl || image.url))
    .map((image, index) => ({
      type: 'image',
      name: image.name || `${item.title || 'homework-problem'}-${index + 1}.png`,
      dataUrl: image.dataUrl || image.url,
      mimeType: image.mimeType || 'image/png'
    }));
}

function setHomeworkSaveState(message, tone = 'idle') {
  if (!homeworkSaveState) return;
  homeworkSaveState.textContent = message || '';
  homeworkSaveState.dataset.tone = tone;
}

function updateHomeworkItem(id, patch, options = {}) {
  const progress = loadHomeworkProgress();
  progress[id] = { ...(progress[id] || {}), ...patch, updatedAt: new Date().toISOString() };
  saveHomeworkProgress(progress);
  if (!options.silent) setHomeworkSaveState('Saved locally', 'ok');
  return getCurrentHomeworkSet()?.problems || [];
}

function homeworkPreviewText(item) {
  const text = (item.body || item.explanation || '').trim().replace(/\s+/g, ' ');
  return text ? text.slice(0, 96) : 'No problem text yet';
}

function homeworkStatusLabel(status) {
  if (status === 'Done') return 'Done';
  if (status === 'Explained') return 'Explained';
  if (status === 'Working') return 'Working';
  return 'Todo';
}

function renderHomework() {
  if (!homeworkView) return;
  const store = loadHomeworkStore();
  if (!currentHomeworkSetId) currentHomeworkSetId = store.activeSetId || store.sets[0]?.id || null;
  if (!store.sets.some(set => set.id === currentHomeworkSetId)) currentHomeworkSetId = store.sets[0]?.id || null;
  store.activeSetId = currentHomeworkSetId;
  saveHomeworkStore(store);
  const currentSet = getCurrentHomeworkSet(store);
  const items = (currentSet?.problems || []).map(applyHomeworkProgress);
  if (!currentHomeworkId && items.length) currentHomeworkId = items[0].id;
  if (currentHomeworkId && !items.some(item => item.id === currentHomeworkId)) {
    currentHomeworkId = items[0]?.id || null;
  }

  renderHomeworkSetSelect(store);

  if (homeworkCountPill) {
    homeworkCountPill.textContent = String(items.length);
    homeworkCountPill.title = `${items.length} problems in ${currentSet?.title || 'HW'}`;
  }

  if (homeworkProblemList) {
    homeworkProblemList.innerHTML = items.length
      ? items.map((item, index) => `
        <button class="homework-list-item ${item.id === currentHomeworkId ? 'active' : ''}" data-homework-id="${escapeHtml(item.id)}" type="button" title="${escapeHtml(`${item.title || `Problem ${index + 1}`} · ${homeworkStatusLabel(item.status)}`)}" aria-label="${escapeHtml(`${item.title || `Problem ${index + 1}`} ${homeworkStatusLabel(item.status)}`)}">
          <span class="homework-list-index">${index + 1}</span>
          <span class="homework-status-dot" data-status="${escapeHtml(item.status || 'Todo')}"></span>
        </button>
      `).join('')
      : '<div class="homework-list-empty">No problems</div>';

    homeworkProblemList.querySelectorAll('.homework-list-item').forEach(btn => {
      btn.addEventListener('click', () => {
        currentHomeworkId = btn.dataset.homeworkId;
        if (homeworkQaPanel) homeworkQaPanel.classList.add('hidden');
        renderHomework();
      });
    });
  }

  const current = getCurrentHomework(items);
  const hasCurrent = Boolean(current);
  if (homeworkEmptyPanel) homeworkEmptyPanel.classList.toggle('hidden', hasCurrent);
  if (homeworkDetailContent) homeworkDetailContent.classList.toggle('hidden', !hasCurrent);
  if (!current) {
    if (homeworkQaList) homeworkQaList.innerHTML = '<div class="homework-qa-empty">Create a problem first, then Q&A will live here.</div>';
    return;
  }

  if (homeworkTitleInput) homeworkTitleInput.value = current.title || '';
  if (homeworkStatusSelect) homeworkStatusSelect.value = HOMEWORK_STATUSES.includes(current.status) ? current.status : 'Todo';
  if (homeworkProblemInput) homeworkProblemInput.value = current.body || '';
  renderHomeworkImages(current);
  if (homeworkExplanation) {
    homeworkExplanation.innerHTML = current.explanation
      ? markdownToHtml(current.explanation)
      : 'No explanation yet. Generate one when you are ready.';
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise([homeworkExplanation]).catch(() => {});
    }
  }
  renderHomeworkQa(current);
  setHomeworkSaveState(current.updatedAt ? `Saved ${new Date(current.updatedAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}` : 'Ready', 'idle');
}

function renderHomeworkSetSelect(store = loadHomeworkStore()) {
  if (!homeworkSetSelect) return;
  homeworkSetSelect.innerHTML = store.sets.map((set, index) => {
    const count = Array.isArray(set.problems) ? set.problems.length : 0;
    const label = `${set.title || `HW${index + 1}`} (${count})`;
    return `<option value="${escapeHtml(set.id)}"${set.id === currentHomeworkSetId ? ' selected' : ''}>${escapeHtml(label)}</option>`;
  }).join('');
}

function renderHomeworkImages(item) {
  if (!homeworkImageStrip) return;
  const images = Array.isArray(item?.images) ? item.images : [];
  if (!images.length) {
    homeworkImageStrip.innerHTML = '<div class="homework-image-empty">No problem image found in this HW folder.</div>';
    return;
  }
  homeworkImageStrip.innerHTML = images.map((image, index) => `
    <figure class="homework-image-card homework-problem-image-card">
      <button class="homework-image-preview" type="button" data-homework-image-index="${index}" aria-label="Preview ${escapeHtml(image.name || `image ${index + 1}`)}">
        <img src="${escapeHtml(image.dataUrl || image.url || '')}" alt="${escapeHtml(image.name || `Homework image ${index + 1}`)}">
      </button>
    </figure>
  `).join('');
  homeworkImageStrip.querySelectorAll('[data-homework-image-index]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.homeworkImageIndex || 0);
      const image = images[idx];
      const src = image?.dataUrl || image?.url;
      if (src) openAttachmentImageModal(src, image.name || 'Homework image');
    });
  });
}

function renderHomeworkQa(item) {
  if (!homeworkQaList) return;
  const qa = Array.isArray(item?.qa) ? item.qa : [];
  if (!item) {
    homeworkQaList.innerHTML = '<div class="homework-qa-empty">Create a problem first, then Q&A will live here.</div>';
    return;
  }
  if (!qa.length) {
    homeworkQaList.innerHTML = '<div class="homework-qa-empty">Ask follow-up questions after you add or explain this problem.</div>';
    return;
  }
  homeworkQaList.innerHTML = qa.map(turn => `
    <div class="homework-qa-turn ${turn.role === 'user' ? 'is-user' : 'is-assistant'}">
      <div class="homework-qa-role">${turn.role === 'user' ? 'You' : 'Fourier'}</div>
      <div class="homework-qa-body">${turn.role === 'assistant' ? markdownToHtml(turn.content || '') : escapeHtml(turn.content || '').replace(/\n/g, '<br>')}</div>
    </div>
  `).join('');
  homeworkQaList.scrollTop = homeworkQaList.scrollHeight;
  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise([homeworkQaList]).catch(() => {});
  }
}

function syncHomeworkFromInputs(options = {}) {
  const current = getCurrentHomework();
  if (!current) return;
  const patch = {
    status: HOMEWORK_STATUSES.includes(homeworkStatusSelect?.value) ? homeworkStatusSelect.value : current.status || 'Todo'
  };
  updateHomeworkItem(current.id, patch, options);
  if (!options.skipRenderList) renderHomework();
}

function buildHomeworkExplainPrompt(item) {
  return [
    '请讲解这道作业题。你必须同时看题目文本和学生实际问题，不要跳过题目内容。',
    '目标：先判断题目在考什么知识点，再给出清晰步骤、关键公式、常见错误，以及最后可以检查答案的方式。',
    '如果题目缺少条件，请明确指出缺什么，并给出下一步应该问什么。',
    '',
    `作业题目：\n${item.body || item.title || ''}`,
    homeworkProblemAttachments(item).length ? `\n题目图片：已附上 ${homeworkProblemAttachments(item).length} 张图片，请一起阅读。` : ''
  ].join('\n');
}

async function generateHomeworkExplanation() {
  syncHomeworkFromInputs({ silent: true, skipRenderList: true });
  const current = getCurrentHomework();
  if (!current) return;
  if (!(current.body || '').trim()) {
    setHomeworkSaveState('Paste the problem text first.', 'error');
    homeworkProblemInput?.focus();
    return;
  }
  const original = homeworkExplainBtn ? homeworkExplainBtn.textContent : '';
  if (homeworkExplainBtn) {
    homeworkExplainBtn.disabled = true;
    homeworkExplainBtn.textContent = 'Generating...';
  }
  if (homeworkExplanation) homeworkExplanation.textContent = 'Generating a problem-specific explanation...';
  setHomeworkSaveState('Asking Fourier...', 'busy');
  try {
    const prompt = buildHomeworkExplainPrompt(current);
    const data = await callAsk(prompt, undefined, {
      mode: 'ask',
      useWebSearch: true,
      language: detectLang(prompt),
      answerLength: 'detailed',
      attachments: homeworkProblemAttachments(current)
    });
    const explanation = data.explanation || '';
    updateHomeworkItem(current.id, {
      explanation,
      status: 'Explained',
      qa: Array.isArray(current.qa) ? current.qa : []
    }, { silent: true });
    setHomeworkSaveState('Explanation generated', 'ok');
    renderHomework();
  } catch (err) {
    if (homeworkExplanation) homeworkExplanation.innerHTML = `<div class="error-box"><strong>AI failed</strong><p>${escapeHtml(err.message || String(err))}</p></div>`;
    setHomeworkSaveState(`Failed: ${err.message || err}`, 'error');
  } finally {
    if (homeworkExplainBtn) {
      homeworkExplainBtn.disabled = false;
      homeworkExplainBtn.textContent = original;
    }
  }
}

async function sendHomeworkQuestion() {
  syncHomeworkFromInputs({ silent: true, skipRenderList: true });
  const current = getCurrentHomework();
  const question = (homeworkQaInput?.value || '').trim();
  if (!current || !question) return;
  if (!(current.body || '').trim()) {
    setHomeworkSaveState('Add the problem text before asking.', 'error');
    return;
  }
  if (homeworkQaInput) homeworkQaInput.value = '';
  const qa = Array.isArray(current.qa) ? [...current.qa] : [];
  qa.push({ role: 'user', content: question, createdAt: new Date().toISOString() });
  updateHomeworkItem(current.id, { qa }, { silent: true });
  renderHomeworkQa({ ...current, qa });

  const original = homeworkQaSendBtn ? homeworkQaSendBtn.textContent : '';
  if (homeworkQaSendBtn) {
    homeworkQaSendBtn.disabled = true;
    homeworkQaSendBtn.textContent = 'Asking...';
  }
  setHomeworkSaveState('Answering follow-up...', 'busy');
  try {
    const prompt = [
      '你正在围绕同一道作业题回答学生追问。',
      '必须先参考作业题目，再回答学生这次的问题；如果已有讲解，也要保持一致。',
      '',
      `作业题目：\n${current.body || current.title || ''}`,
      homeworkProblemAttachments(current).length ? `题目图片：已附上 ${homeworkProblemAttachments(current).length} 张图片，请一起参考。` : '',
      '',
      `已有讲解：\n${current.explanation || '(还没有生成讲解)'}`,
      '',
      `学生追问：\n${question}`
    ].join('\n');
    const history = [
      { role: 'user', content: `作业题目：\n${current.body || ''}` },
      current.explanation ? { role: 'assistant', content: current.explanation } : null,
      ...qa.slice(-8)
    ].filter(Boolean);
    const data = await callAsk(prompt, undefined, {
      mode: 'followup',
      history,
      useWebSearch: true,
      language: detectLang(`${current.body || ''}\n${question}`),
      answerLength: 'balanced',
      attachments: homeworkProblemAttachments(current)
    });
    const answer = data.explanation || '';
    const nextQa = [...qa, { role: 'assistant', content: answer, createdAt: new Date().toISOString() }];
    updateHomeworkItem(current.id, { qa: nextQa }, { silent: true });
    setHomeworkSaveState('Follow-up answered', 'ok');
    renderHomework();
  } catch (err) {
    const failedQa = [...qa, { role: 'assistant', content: `AI failed: ${err.message || String(err)}`, createdAt: new Date().toISOString() }];
    updateHomeworkItem(current.id, { qa: failedQa }, { silent: true });
    setHomeworkSaveState(`Failed: ${err.message || err}`, 'error');
    renderHomework();
  } finally {
    if (homeworkQaSendBtn) {
      homeworkQaSendBtn.disabled = false;
      homeworkQaSendBtn.textContent = original;
    }
  }
}

function bindHomeworkControls() {
  if (homeworkSetSelect) {
    homeworkSetSelect.addEventListener('change', () => {
      currentHomeworkSetId = homeworkSetSelect.value;
      currentHomeworkId = null;
      updateHomeworkStore(store => {
        store.activeSetId = currentHomeworkSetId;
      });
      renderHomework();
    });
  }
  if (homeworkAddSetBtn) homeworkAddSetBtn.addEventListener('click', () => {
    refreshHomeworkStoreFromServer().then(() => {
      renderHomework();
      setHomeworkSaveState('HW folder refreshed.', 'ok');
    });
  });
  if (homeworkAddBtn) homeworkAddBtn.addEventListener('click', () => {
    refreshHomeworkStoreFromServer().then(() => {
      renderHomework();
      setHomeworkSaveState('HW folder refreshed.', 'ok');
    });
  });
  if (homeworkEmptyAddBtn) homeworkEmptyAddBtn.addEventListener('click', () => {
    refreshHomeworkStoreFromServer().then(() => {
      renderHomework();
      setHomeworkSaveState('HW folder refreshed.', 'ok');
    });
  });
  if (homeworkSaveBtn) homeworkSaveBtn.addEventListener('click', () => syncHomeworkFromInputs());
  if (homeworkExplainBtn) homeworkExplainBtn.addEventListener('click', generateHomeworkExplanation);
  if (homeworkQaSendBtn) homeworkQaSendBtn.addEventListener('click', sendHomeworkQuestion);
  if (homeworkQaBubbleBtn) {
    homeworkQaBubbleBtn.addEventListener('click', () => {
      if (!homeworkQaPanel) return;
      homeworkQaPanel.classList.toggle('hidden');
      if (!homeworkQaPanel.classList.contains('hidden')) homeworkQaInput?.focus();
    });
  }
  if (homeworkQaCloseBtn) {
    homeworkQaCloseBtn.addEventListener('click', () => {
      if (homeworkQaPanel) homeworkQaPanel.classList.add('hidden');
    });
  }
  if (homeworkDeleteBtn) {
    homeworkDeleteBtn.addEventListener('click', () => {
      setHomeworkSaveState('Delete files from the project HW folder to remove preloaded problems.', 'idle');
    });
  }
  if (homeworkImageInput) {
    homeworkImageInput.addEventListener('click', () => {
      setHomeworkSaveState('Images are preloaded from the project HW folder.', 'idle');
    });
  }
  [
    [homeworkStatusSelect, 'change']
  ].forEach(([el, eventName]) => {
    if (!el) return;
    el.addEventListener(eventName, () => {
      syncHomeworkFromInputs({ silent: true, skipRenderList: false });
      setHomeworkSaveState('Saved locally', 'ok');
    });
  });
  if (homeworkQaInput) {
    homeworkQaInput.addEventListener('keydown', event => {
      if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
        event.preventDefault();
        sendHomeworkQuestion();
      }
    });
  }
}

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

const MISTAKE_NOTE_SPLIT_STORAGE_KEY = 'aquariusMistakeNoteSplit.v1';

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

function setPreferenceSaveState(message, tone = 'idle') {
  if (!preferenceSaveState) return;
  preferenceSaveState.textContent = message;
  preferenceSaveState.dataset.tone = tone;
}

function syncPreferenceEditorFromMemory() {
  const markdown = getPreferenceProfileMarkdown();
  if (preferenceProfileEditor) preferenceProfileEditor.value = markdown;
  renderPreferenceMarkdownPreview(markdown);
  updatePreferenceSidebarSummary();
  setPreferenceSaveState(userMemory?.preferenceProfile?.updatedAt ? `Saved ${userMemory.preferenceProfile.updatedAt.slice(0, 10)}` : 'Ready to personalize', 'idle');
}

async function savePreferenceProfile(markdown) {
  if (!currentUser) return;
  const cleaned = String(markdown || '').trim() || DEFAULT_PREFERENCE_PROFILE;
  setPreferenceSaveState('Saving...', 'working');
  const payload = {
    uid: currentUser.uid,
    preferenceProfile: {
      markdown: cleaned,
      updatedAt: new Date().toISOString(),
      source: 'manual',
      manualEdited: true
    }
  };
  const res = await fetch(`${API_BASE}/api/memory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  userMemory = data.memory || {
    ...(userMemory || {}),
    preferenceProfile: payload.preferenceProfile
  };
  if (preferenceProfileEditor) preferenceProfileEditor.value = getPreferenceProfileMarkdown();
  renderPreferenceMarkdownPreview(getPreferenceProfileMarkdown());
  updatePreferenceSidebarSummary();
  setPreferenceSaveState('Saved & active', 'saved');
}

async function requestPreferenceDraft() {
  if (!currentUser || !preferenceAiInstruction || !preferenceProfileEditor) return;
  const instruction = preferenceAiInstruction.value.trim();
  if (!instruction) {
    setPreferenceSaveState('Tell AI what to change first', 'error');
    return;
  }
  if (preferenceAiDraftBtn) {
    preferenceAiDraftBtn.disabled = true;
    preferenceAiDraftBtn.textContent = 'Drafting...';
  }
  try {
    const res = await fetch(`${API_BASE}/api/preference/draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid: currentUser.uid,
        currentProfile: preferenceProfileEditor.value || getPreferenceProfileMarkdown(),
        instruction
      })
    });
    const raw = await res.text();
    let data = {};
    if (raw) {
      try {
        data = JSON.parse(raw);
      } catch {
        data = { error: raw };
      }
    }
    if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
    if (preferenceDraftText) preferenceDraftText.textContent = data.draft || '';
    if (preferenceDraftPanel) preferenceDraftPanel.classList.remove('hidden');
    setPreferenceSaveState('AI draft ready', 'saved');
  } catch (err) {
    setPreferenceSaveState(err.message || 'Draft failed', 'error');
  } finally {
    if (preferenceAiDraftBtn) {
      preferenceAiDraftBtn.disabled = false;
      preferenceAiDraftBtn.textContent = 'Generate AI Draft';
    }
  }
}

function bindPreferenceControls() {
  if (preferenceProfileEditor) {
    preferenceProfileEditor.addEventListener('input', () => {
      renderPreferenceMarkdownPreview(preferenceProfileEditor.value);
      setPreferenceSaveState('Unsaved changes', 'working');
    });
  }
  if (preferenceSaveBtn) {
    preferenceSaveBtn.addEventListener('click', async () => {
      try {
        await savePreferenceProfile(preferenceProfileEditor?.value || DEFAULT_PREFERENCE_PROFILE);
      } catch (err) {
        setPreferenceSaveState(err.message || 'Save failed', 'error');
      }
    });
  }
  if (preferenceResetBtn) {
    preferenceResetBtn.addEventListener('click', () => {
      syncPreferenceEditorFromMemory();
    });
  }
  if (preferenceAiDraftBtn) {
    preferenceAiDraftBtn.addEventListener('click', requestPreferenceDraft);
  }
  if (preferenceApplyDraftBtn) {
    preferenceApplyDraftBtn.addEventListener('click', () => {
      if (preferenceProfileEditor && preferenceDraftText) {
        preferenceProfileEditor.value = preferenceDraftText.textContent || '';
        renderPreferenceMarkdownPreview(preferenceProfileEditor.value);
        setPreferenceSaveState('Draft applied, not saved yet', 'working');
      }
    });
  }
  if (preferenceDiscardDraftBtn) {
    preferenceDiscardDraftBtn.addEventListener('click', () => {
      if (preferenceDraftPanel) preferenceDraftPanel.classList.add('hidden');
      if (preferenceDraftText) preferenceDraftText.textContent = '';
    });
  }
}

async function resetQuiz() {
  if (!currentUser) return;
  try {
    await fetch(`${API_BASE}/api/memory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid: currentUser.uid, resetQuiz: true })
    });
  } catch (_) {}
  if (userMemory) userMemory.quiz = {};
  localStorage.removeItem('tutorQuiz');
  quizAnswers = {};
  showQuiz({ returnView: 'settings' });
}

const settingsResetQuizBtn = document.getElementById('settingsResetQuizBtn');
if (settingsResetQuizBtn) {
  settingsResetQuizBtn.addEventListener('click', async () => {
    await resetQuiz();
    showSettingsView();
  });
}

// ──────────────────────────────
// QUIZ
// ──────────────────────────────
const QUIZ_QUESTIONS = [
  {
    key: 'track',
    zh: '这节你想怎么学?',
    en: 'LEARNING MODE · Choose how you want to learn this section.',
    multi: false,
    options: [
      { value: 'cram', zh: '速通保分：先抓最常考，最快进入会做题状态 🚀', en: 'Cram mode: focus on the most tested ideas first 🚀' },
      { value: 'standard', zh: '标准提分：概念、例题、检查题一起走，稳稳提分 📘', en: 'Standard mode: concept + example + quick check 📘' },
      { value: 'top_score', zh: '冲刺高分：补足易混点、变式题和高分思路 🏆', en: 'Top-score mode: tricky variants + high-score reasoning 🏆' }
    ]
  },
  {
    key: 'math',
    zh: '你的数学基础怎么样?',
    en: 'MATH BACKGROUND · Tell me where math might slow you down.',
    multi: false,
    options: [
      { value: 'all_solid', zh: '基础比较稳：微积分、微分方程、复数这些都还可以', en: 'Math is solid: calculus, ODEs, and complex numbers are okay' },
      { value: 'calculus_ok', zh: '有些地方不太稳：微积分还行，但微分方程 / 复数会卡住', en: 'Some weak spots: calculus is okay, but ODEs / complex numbers can be shaky' },
      { value: 'math_weak', zh: '数学偏弱：希望少一点公式，多一点直觉和图像', en: 'Math feels weak: fewer formulas, more intuition and visuals' }
    ]
  },
  {
    key: 'timeline',
    zh: '距离这门课最近一次重要考试，还有多久?',
    en: 'EXAM TIMELINE · How soon do you need results?',
    multi: false,
    options: [
      { value: 'this_week', zh: '这周内', en: 'Within this week' },
      { value: 'two_weeks', zh: '两周左右', en: 'About two weeks' },
      { value: 'one_month', zh: '一个多月', en: 'About a month or more' },
      { value: 'early_stage', zh: '还比较早，先打基础', en: 'It is still early — build foundations first' }
    ]
  },
  {
    key: 'preference',
    zh: '这节开始时，你最想先看到什么?',
    en: 'LEARNING PREFERENCE · What do you want to see first when this lesson begins?',
    multi: true,
    maxSelect: 2,
    options: [
      { value: 'exam_first', zh: '先看这节最重要的考点', en: 'Show me the key tested ideas first' },
      { value: 'example_first', zh: '先看一个例子', en: 'Start with an example' },
      { value: 'step_by_step', zh: '先把步骤拆开', en: 'Break the steps down first' }
    ]
  },
  {
    key: 'priority',
    zh: '你现在最想优先解决哪件事?',
    en: 'YOUR PRIORITY · What do you want to improve first?',
    multi: true,
    maxSelect: 2,
    options: [
      { value: 'understand_concepts', zh: '先把概念听懂', en: 'Understand the concepts first' },
      { value: 'solve_faster', zh: '做题更快一点', en: 'Solve problems faster' },
      { value: 'avoid_careless', zh: '少犯低级错误', en: 'Make fewer careless mistakes' },
      { value: 'harder_problems', zh: '搞定更难的题', en: 'Handle harder problems' },
      { value: 'connect_topics', zh: '把知识点串起来', en: 'Connect the ideas across topics' },
      { value: 'exam_confidence', zh: '更有把握地上考场', en: 'Feel more confident in the exam' }
    ]
  }
];

let quizStep = 0;
let quizAnswers = {};
let quizReturnView = null;

function getTrackMeta(track) {
  switch (track) {
    case 'cram':
      return { label: '速通保分', en: 'CRAM MODE' };
    case 'standard':
      return { label: '标准提分', en: 'STANDARD MODE' };
    case 'top_score':
      return { label: '冲刺高分', en: 'TOP SCORE MODE' };
    default:
      return { label: '学习模式', en: 'LEARNING MODE' };
  }
}

function updateLearnModeBadge(track) {
  if (typeof learnModeBadge === 'undefined' || !learnModeBadge) return;
  const meta = getTrackMeta(track);
  learnModeBadge.textContent = meta.en;
  learnModeBadge.title = meta.label;
}

function showQuiz(options = {}) {
  quizStep = 0;
  quizAnswers = {};
  quizReturnView = options.returnView || null;
  const overlay = document.getElementById('quizOverlay');
  if (overlay) { overlay.style.display = 'flex'; }
  renderQuizStep();
}

function closeQuizWithoutSaving() {
  const overlay = document.getElementById('quizOverlay');
  if (overlay) overlay.style.display = 'none';
  quizStep = 0;
  quizAnswers = {};
  quizReturnView = null;
  renderQuizStep();
  renderUserBadge();
  updateLearnModeBadge(userMemory && userMemory.quiz ? userMemory.quiz.track : null);
}

function hasStartupViewClaimedScreen() {
  const intro = document.getElementById('introLanding');
  const quizOverlay = document.getElementById('quizOverlay');
  const params = new URLSearchParams(window.location.search);
  return Boolean(
    (intro && !intro.classList.contains('hidden')) ||
    (loginView && !loginView.classList.contains('hidden')) ||
    (quizOverlay && quizOverlay.style.display && quizOverlay.style.display !== 'none') ||
    params.get(AUTH_VIEW_FLAG) === 'login' ||
    params.has(AUTH_CALLBACK_FLAG)
  );
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
    <div style="font-size:18px;font-weight:800;color:#1E293B;margin-bottom:12px;line-height:1.4;font-family:'Quicksand', sans-serif;">${q.en}</div>
    ${q.multi && q.maxSelect ? `<div style="font-size:13px;color:#64748B;margin-bottom:16px;font-weight:700;font-family:'Nunito', sans-serif;">Choose up to ${q.maxSelect}</div>` : '<div style="margin-bottom:20px;"></div>'}
    <div style="display:flex;flex-direction:column;gap:12px;">
      ${q.options.map(opt => `
        <button class="quiz-option" data-value="${opt.value}"
          style="text-align:left;padding:14px 20px;border:2px solid #cbd5e1;border-radius:16px;background:#fff;font-size:15px;color:#475569;cursor:pointer;transition:all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);font-family:'Nunito', sans-serif;font-weight:700;outline:none;"
          onmouseover="if(this.dataset.selected!=='true') { this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 0 #e2e8f0'; }"
          onmouseout="if(this.dataset.selected!=='true') { this.style.transform='none'; this.style.boxShadow='none'; }">${opt.en}</button>
      `).join('')}
    </div>
  `;
  if (q.multi && !Array.isArray(quizAnswers[q.key])) quizAnswers[q.key] = [];
  container.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (q.multi) {
        const val = btn.dataset.value; const arr = quizAnswers[q.key]; const idx = arr.indexOf(val); const limit = q.maxSelect || Infinity;
        if (idx === -1) {
          if (arr.length >= limit) return; arr.push(val);
          btn.dataset.selected = 'true'; btn.style.borderColor = '#38BDF8'; btn.style.background = '#F0F9FF'; btn.style.color = '#0284C7'; btn.style.boxShadow = '0 4px 0px #BAE6FD'; btn.style.transform = 'translateY(-2px)';
        } else {
          arr.splice(idx, 1); btn.dataset.selected = 'false'; btn.style.borderColor = '#cbd5e1'; btn.style.background = '#fff'; btn.style.color = '#475569'; btn.style.boxShadow = 'none'; btn.style.transform = 'none';
        }
        if (nextBtn) nextBtn.disabled = arr.length === 0;
      } else {
        container.querySelectorAll('.quiz-option').forEach(b => {
          b.dataset.selected = 'false'; b.style.borderColor = '#cbd5e1'; b.style.background = '#fff'; b.style.color = '#475569'; b.style.boxShadow = 'none'; b.style.transform = 'none';
        });
        btn.dataset.selected = 'true'; btn.style.borderColor = '#38BDF8'; btn.style.background = '#F0F9FF'; btn.style.color = '#0284C7'; btn.style.boxShadow = '0 4px 0px #BAE6FD'; btn.style.transform = 'translateY(-2px)';
        quizAnswers[q.key] = btn.dataset.value;
        if (nextBtn) nextBtn.disabled = false;
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const bootParams = new URLSearchParams(window.location.search);
  const bootWantsLogin = bootParams.get(AUTH_VIEW_FLAG) === 'login' || bootParams.has(AUTH_CALLBACK_FLAG);
  if (bootWantsLogin) {
    showLoginView();
  }

  try {
    if (bootWantsLogin) {
      hideIntroLanding(false);
    } else {
      initIntroLanding();
    }
  } catch (e) {
    console.error('Intro landing failed to init:', e);
  } finally {
    finishStartupBoot();
  }
  const nextBtn = document.getElementById('quizNextBtn');
  const quizCloseBtn = document.getElementById('quizCloseBtn');
  if (quizCloseBtn && !quizCloseBtn.dataset.boundClose) {
    quizCloseBtn.dataset.boundClose = '1';
    quizCloseBtn.addEventListener('click', () => {
      closeQuizWithoutSaving();
      showWelcome();
    });
  }
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
            const quizProfile = buildPreferenceProfileAfterQuiz(quizAnswers, userMemory?.preferenceProfile || {});
            const res = await fetch(`${API_BASE}/api/memory`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                uid: currentUser.uid,
                quiz: quizAnswers,
                preferenceProfile: quizProfile
              })
            });
            const data = await res.json();
            userMemory = data.memory || userMemory;
            // Also persist quiz locally so profileOverride always works
            if (userMemory && userMemory.quiz) {
              localStorage.setItem('tutorQuiz', JSON.stringify(userMemory.quiz));
            }
            syncPreferenceEditorFromMemory();
          } catch (_) {}
        }
        if (userMemory && userMemory.quiz && !userMemory.quiz.timeline) {
          userMemory.quiz.timeline = 'two_weeks';
        }
        if (userMemory && userMemory.quiz && !userMemory.quiz.goal && userMemory.quiz.track) {
          userMemory.quiz.goal = userMemory.quiz.track;
        }
        updateLearnModeBadge(userMemory && userMemory.quiz ? userMemory.quiz.track : null);
        renderUserBadge();
        const returnView = quizReturnView;
        quizReturnView = null;
        if (returnView === 'settings') {
          showSettingsView();
          return;
        }
        if (returnView === 'preference') {
          showPreferenceView();
          return;
        }
        if (continueToPendingLearnTarget()) return;
        showWelcome();
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
      if (!userMemory.preferenceProfile || !userMemory.preferenceProfile.markdown) {
        userMemory.preferenceProfile = {
          markdown: DEFAULT_PREFERENCE_PROFILE,
          updatedAt: new Date().toISOString(),
          source: 'default',
          manualEdited: false
        };
      }
      if (userMemory && userMemory.quiz && !userMemory.quiz.timeline) {
        userMemory.quiz.timeline = 'two_weeks';
      }
      if (userMemory && userMemory.quiz && !userMemory.quiz.goal && userMemory.quiz.track) {
        userMemory.quiz.goal = userMemory.quiz.track;
      }
      updateLearnModeBadge(userMemory && userMemory.quiz ? userMemory.quiz.track : null);
      const quizDone = userMemory.quiz && ['track', 'math', 'timeline', 'preference', 'priority'].every(k => {
        const v = userMemory.quiz[k];
        return Array.isArray(v) ? v.length > 0 : !!v;
      });
      updatePreferenceSidebarSummary();
      renderUserBadge();
      const shouldEnter = allowAuthNavigation || authRedirectInProgress;
      if (shouldEnter && !quizDone) showQuiz();
    })
    .catch(() => {
      renderUserBadge();
      const shouldEnter = allowAuthNavigation || authRedirectInProgress;
      if (shouldEnter) showQuiz();
    });
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

let recentConversationMenuState = null;
let recentConversationMenuTargetTimestamp = null;
let pendingDeleteRecentConversationTimestamp = null;
let recentConversationDeleteOverlay = null;
const deletedRecentConversationTimestamps = new Set();
window.__recentConversationDebug = window.__recentConversationDebug || [];

function pushRecentConversationDebug(stage, detail = {}) {
  const entry = {
    time: new Date().toISOString(),
    stage,
    detail
  };
  window.__recentConversationDebug.push(entry);
  if (window.__recentConversationDebug.length > 200) {
    window.__recentConversationDebug.splice(0, window.__recentConversationDebug.length - 200);
  }
  console.log(`[RECENT_DEBUG] ${stage}`, detail);
}

function closeRecentConversationMenu() {
  const menu = document.getElementById('recentConversationContextMenu');
  if (menu) menu.remove();
  recentConversationMenuState = null;
  recentConversationMenuTargetTimestamp = null;
}

function closeDeleteConversationConfirm() {
  if (recentConversationDeleteOverlay) {
    recentConversationDeleteOverlay.remove();
    recentConversationDeleteOverlay = null;
  }
  pendingDeleteRecentConversationTimestamp = null;
}

function showDeleteConversationConfirm(timestamp) {
  pushRecentConversationDebug('modal:open', { timestamp });
  pendingDeleteRecentConversationTimestamp = timestamp;
  closeDeleteConversationConfirm();
  pendingDeleteRecentConversationTimestamp = timestamp;

  const session = loadRecentConversations().find(s => s.timestamp === timestamp);
  const rawTitle = session?.customTitle || session?.summaryTitle || session?.title || 'this conversation';
  const safeTitle = String(rawTitle).replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const overlay = document.createElement('div');
  overlay.id = 'recentConversationConfirmOverlay';
  overlay.style.cssText = [
    'position: fixed',
    'inset: 0',
    'z-index: 10000',
    'background: rgba(15, 23, 42, 0.28)',
    'backdrop-filter: blur(4px)',
    'display: flex',
    'align-items: center',
    'justify-content: center',
    'padding: 24px'
  ].join(';');

  const dialog = document.createElement('div');
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.style.cssText = 'width:min(460px, calc(100vw - 32px)); background:#FFFFFF; border:1px solid rgba(191, 219, 254, 0.95); border-radius:22px; box-shadow:0 30px 80px rgba(15, 23, 42, 0.24); overflow:hidden;';

  dialog.innerHTML = `
    <div style="padding:22px 22px 14px; display:flex; align-items:flex-start; gap:14px;">
      <div style="width:42px; height:42px; border-radius:14px; background:#FEF2F2; color:#B91C1C; display:flex; align-items:center; justify-content:center; font-size:20px; flex:0 0 auto;">🗑️</div>
      <div style="flex:1; min-width:0;">
        <div style="font-size:18px; font-weight:700; line-height:1.3; color:#0F172A; margin-bottom:8px;">Delete this conversation?</div>
        <div style="font-size:14px; line-height:1.65; color:#475569; margin-bottom:8px;">This will permanently remove the conversation and clear its impact from the user profile and memory.</div>
        <div style="font-size:13px; line-height:1.5; color:#0F172A; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:12px; padding:10px 12px;">${safeTitle}</div>
      </div>
    </div>
    <div style="display:flex; justify-content:flex-end; gap:10px; padding:16px 22px 22px; border-top:1px solid #E2E8F0; background:#FCFDFF;"></div>
  `;

  const actions = dialog.lastElementChild;
  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.textContent = 'Cancel';
  cancelBtn.style.cssText = 'height:42px; padding:0 16px; border-radius:12px; border:1px solid #CBD5E1; background:#FFFFFF; color:#334155; font-size:14px; font-weight:600; cursor:pointer;';

  const confirmBtn = document.createElement('button');
  confirmBtn.type = 'button';
  confirmBtn.textContent = 'Delete';
  confirmBtn.style.cssText = 'height:42px; padding:0 16px; border-radius:12px; border:none; background:linear-gradient(135deg, #DC2626 0%, #B91C1C 100%); color:#FFFFFF; font-size:14px; font-weight:700; cursor:pointer; box-shadow:0 14px 28px rgba(185, 28, 28, 0.28);';

  cancelBtn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    pushRecentConversationDebug('modal:cancel-click', { timestamp: pendingDeleteRecentConversationTimestamp });
    closeDeleteConversationConfirm();
  });

  confirmBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const targetTs = pendingDeleteRecentConversationTimestamp;
    pushRecentConversationDebug('modal:confirm-click', { targetTs });
    if (!targetTs) return;
    confirmBtn.disabled = true;
    cancelBtn.disabled = true;
    confirmBtn.textContent = 'Deleting...';
    confirmBtn.style.opacity = '0.8';
    try {
      pushRecentConversationDebug('modal:before-perform-delete', { targetTs });
      await window.performDeleteRecentConversation(targetTs);
      pushRecentConversationDebug('modal:after-perform-delete', { targetTs });
      closeDeleteConversationConfirm();
    } catch (err) {
      pushRecentConversationDebug('modal:perform-delete-error', { targetTs, message: err?.message || String(err) });
      console.error('[recentConversations] delete failed:', err);
      confirmBtn.disabled = false;
      cancelBtn.disabled = false;
      confirmBtn.textContent = 'Delete';
      confirmBtn.style.opacity = '1';
      alert(`Failed to delete conversation: ${err?.message || err}`);
    }
  });

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeDeleteConversationConfirm();
  });
  dialog.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  actions.appendChild(cancelBtn);
  actions.appendChild(confirmBtn);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);
  recentConversationDeleteOverlay = overlay;
}

window.openRecentConversationMenu = function(timestamp, anchorEl) {
  closeRecentConversationMenu();
  recentConversationMenuState = { timestamp };
  recentConversationMenuTargetTimestamp = timestamp;
  pushRecentConversationDebug('menu:open', { timestamp });

  const sessions = loadRecentConversations();
  const session = sessions.find(s => s.timestamp === timestamp) || null;
  const isStarred = !!(session && session.starred);

  const menu = document.createElement('div');
  menu.id = 'recentConversationContextMenu';
  menu.style.cssText = [
    'position: fixed',
    'z-index: 9999',
    'min-width: 168px',
    'background: #FFFFFF',
    'border: 1px solid #DBEAFE',
    'border-radius: 12px',
    'box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18)',
    'padding: 6px',
    'display: flex',
    'flex-direction: column',
    'gap: 4px'
  ].join(';');

  const makeActionBtn = (label, icon, action, hoverBg, color) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.style.cssText = `border:none;background:transparent;text-align:left;padding:9px 10px;border-radius:8px;font-size:12px;font-weight:600;color:${color};cursor:pointer;display:flex;align-items:center;gap:8px;`;
    btn.innerHTML = `<span>${icon}</span><span>${label}</span>`;
    btn.addEventListener('mouseenter', () => {
      btn.style.background = hoverBg;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.background = 'transparent';
    });
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      pushRecentConversationDebug('menu:action-click', { action, timestamp });
      closeRecentConversationMenu();
      if (action === 'delete') return window.deleteRecentConversation(timestamp);
      if (action === 'rename') return window.renameRecentConversation(timestamp);
      if (action === 'star') return window.toggleRecentConversationStar(timestamp);
    });
    return btn;
  };

  menu.appendChild(makeActionBtn(isStarred ? 'Unstar' : 'Star', isStarred ? '★' : '☆', 'star', '#EFF6FF', '#0F172A'));
  menu.appendChild(makeActionBtn('Rename', '✎', 'rename', '#EFF6FF', '#0F172A'));
  menu.appendChild(makeActionBtn('Delete', '🗑', 'delete', '#FEF2F2', '#B91C1C'));

  document.body.appendChild(menu);

  const anchorRect = anchorEl ? anchorEl.getBoundingClientRect() : { right: window.innerWidth / 2, bottom: window.innerHeight / 2 };
  menu.style.left = `${Math.max(8, anchorRect.right - menu.offsetWidth)}px`;
  menu.style.top = `${Math.min(window.innerHeight - menu.offsetHeight - 8, anchorRect.bottom + 6)}px`;

  setTimeout(() => {
    document.addEventListener('click', closeRecentConversationMenu, { once: true });
  }, 0);
}

// ── Language Toggle ──────────────────────────────────────────────────────────
let currentBook = 'new'; // always 3rd Ed

document.addEventListener('DOMContentLoaded', () => {
  setBook(currentBook, { preserveView: true }); // init book state without hijacking startup view
});

const welcomeScreen = document.getElementById('welcomeScreen');
const answerScreen  = document.getElementById('answerScreen');
const learnView     = document.getElementById('learnView');
const settingsView  = document.getElementById('settingsView');
const preferenceView = document.getElementById('preferenceView');
const feedbackView = document.getElementById('feedbackView');
const homeworkView = document.getElementById('homeworkView');
const courseTrackerView = document.getElementById('courseTrackerView');
const mistakeNotebookView = document.getElementById('mistakeNotebookView');
const loginView     = document.getElementById('loginView');
const appShell      = document.querySelector('.app');
const topbar        = document.getElementById('topbar');
const topbarBreadcrumb = document.getElementById('topbarBreadcrumb');
const navHomeBtn = document.getElementById('navHomeBtn');
const navSyllabusBtn = document.getElementById('navSyllabusBtn');
const navRecentBtn = document.getElementById('navRecentBtn');
const navCourseTrackerBtn = document.getElementById('navCourseTrackerBtn');
const navMistakeNotebookBtn = document.getElementById('navMistakeNotebookBtn');
const navPreferenceBtn = document.getElementById('navPreferenceBtn');
const navFeedbackBtn = document.getElementById('navFeedbackBtn');
const navSettingsBtn = document.getElementById('sidebarSettingsBtn');
const sidebarSyllabusPanel = document.getElementById('sidebarSyllabusPanel');
const sidebarRecentPanel = document.getElementById('sidebarRecentPanel');
const welcomeCoverBtn = document.getElementById('welcomeCoverBtn');
const settingsPageBackBtn = document.getElementById('settingsPageBackBtn');
const preferencePageBackBtn = document.getElementById('preferencePageBackBtn');
const feedbackCloseBtn = document.getElementById('feedbackCloseBtn');
const feedbackNameInput = document.getElementById('feedbackNameInput');
const feedbackTitleInput = document.getElementById('feedbackTitleInput');
const feedbackBodyInput = document.getElementById('feedbackBodyInput');
const feedbackSubmitBtn = document.getElementById('feedbackSubmitBtn');
const feedbackRefreshBtn = document.getElementById('feedbackRefreshBtn');
const feedbackList = document.getElementById('feedbackList');
const feedbackStatus = document.getElementById('feedbackStatus');
const feedbackReplyTargets = new Map();

function setFeedbackSubmitButtonLabel(label) {
  if (!feedbackSubmitBtn) return;
  feedbackSubmitBtn.innerHTML = `
    <span>${escapeHtml(label)}</span>
    <i class="ph-bold ph-paper-plane-tilt" aria-hidden="true"></i>
  `;
}

const homeworkCloseBtn = document.getElementById('homeworkCloseBtn');
const homeworkAddBtn = document.getElementById('homeworkAddBtn');
const homeworkEmptyAddBtn = document.getElementById('homeworkEmptyAddBtn');
const homeworkSetSelect = document.getElementById('homeworkSetSelect');
const homeworkAddSetBtn = document.getElementById('homeworkAddSetBtn');
const homeworkCountPill = document.getElementById('homeworkCountPill');
const homeworkProblemList = document.getElementById('homeworkProblemList');
const homeworkEmptyPanel = document.getElementById('homeworkEmptyPanel');
const homeworkDetailContent = document.getElementById('homeworkDetailContent');
const homeworkTitleInput = document.getElementById('homeworkTitleInput');
const homeworkStatusSelect = document.getElementById('homeworkStatusSelect');
const homeworkProblemInput = document.getElementById('homeworkProblemInput');
const homeworkImageInput = document.getElementById('homeworkImageInput');
const homeworkImageStrip = document.getElementById('homeworkImageStrip');
const homeworkExplainBtn = document.getElementById('homeworkExplainBtn');
const homeworkSaveBtn = document.getElementById('homeworkSaveBtn');
const homeworkDeleteBtn = document.getElementById('homeworkDeleteBtn');
const homeworkSaveState = document.getElementById('homeworkSaveState');
const homeworkExplanation = document.getElementById('homeworkExplanation');
const homeworkQaBubbleBtn = document.getElementById('homeworkQaBubbleBtn');
const homeworkQaPanel = document.getElementById('homeworkQaPanel');
const homeworkQaCloseBtn = document.getElementById('homeworkQaCloseBtn');
const homeworkQaList = document.getElementById('homeworkQaList');
const homeworkQaInput = document.getElementById('homeworkQaInput');
const homeworkQaSendBtn = document.getElementById('homeworkQaSendBtn');
const courseTrackerCloseBtn = document.getElementById('courseTrackerCloseBtn');
const mistakeNotebookCloseBtn = document.getElementById('mistakeNotebookCloseBtn');
const courseTrackerResetBtn = document.getElementById('courseTrackerResetBtn');
const courseTrackerTableBody = document.getElementById('courseTrackerTableBody');
const courseGradeList = document.getElementById('courseGradeList');
const courseDoneCount = document.getElementById('courseDoneCount');
const courseProgressFill = document.getElementById('courseProgressFill');
const courseProgressRing = document.getElementById('courseProgressRing');
const courseNextLecture = document.getElementById('courseNextLecture');
const courseNextTopic = document.getElementById('courseNextTopic');
const tocNav        = document.getElementById('tocNav');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const loginCustomStage = document.getElementById('loginCustomStage');
const loginClerkStage = document.getElementById('loginClerkStage');
const loginForm = document.getElementById('loginForm');
const preferenceSidebarSummary = document.getElementById('preferenceSidebarSummary');
const preferenceProfileEditor = document.getElementById('preferenceProfileEditor');
const preferenceProfilePreview = document.getElementById('preferenceProfilePreview');
const preferenceAiInstruction = document.getElementById('preferenceAiInstruction');
const preferenceAiDraftBtn = document.getElementById('preferenceAiDraftBtn');
const preferenceDraftPanel = document.getElementById('preferenceDraftPanel');
const preferenceDraftText = document.getElementById('preferenceDraftText');
const preferenceApplyDraftBtn = document.getElementById('preferenceApplyDraftBtn');
const preferenceDiscardDraftBtn = document.getElementById('preferenceDiscardDraftBtn');
const preferenceSaveBtn = document.getElementById('preferenceSaveBtn');
const preferenceResetBtn = document.getElementById('preferenceResetBtn');
const preferenceSaveState = document.getElementById('preferenceSaveState');
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

bindPreferenceControls();
bindHomeworkControls();
bindMistakeNotebookControls();

const SIDEBAR_ACCORDION_MS = 380;

function isAccordionOpen(panel) {
  return !!panel && !panel.classList.contains('hidden') && panel.classList.contains('is-open');
}

function setAccordionOpen(panel, open) {
  if (!panel) return;
  const token = String(Date.now() + Math.random());
  panel.dataset.accordionToken = token;
  panel.style.overflow = 'hidden';
  panel.style.pointerEvents = 'none';

  if (open) {
    panel.classList.remove('hidden');
    panel.classList.add('is-animating');
    panel.style.maxHeight = '0px';
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(-6px)';
    void panel.offsetHeight;
    panel.classList.add('is-open');
    panel.style.maxHeight = `${panel.scrollHeight}px`;
    panel.style.opacity = '1';
    panel.style.transform = 'translateY(0)';

    window.setTimeout(() => {
      if (panel.dataset.accordionToken !== token) return;
      panel.classList.remove('is-animating');
      panel.style.maxHeight = 'none';
      panel.style.opacity = '';
      panel.style.transform = '';
      panel.style.overflow = '';
      panel.style.pointerEvents = '';
      panel.dataset.accordionState = 'open';
    }, SIDEBAR_ACCORDION_MS + 40);
    return;
  }

  panel.dataset.accordionState = 'closing';
  panel.classList.add('is-animating');
  panel.style.maxHeight = `${panel.scrollHeight}px`;
  panel.style.opacity = '1';
  panel.style.transform = 'translateY(0)';
  void panel.offsetHeight;
  panel.classList.remove('is-open');
  panel.style.maxHeight = '0px';
  panel.style.opacity = '0';
  panel.style.transform = 'translateY(-6px)';

  window.setTimeout(() => {
    if (panel.dataset.accordionToken !== token) return;
    panel.classList.add('hidden');
    panel.classList.remove('is-animating');
    panel.style.maxHeight = '';
    panel.style.opacity = '';
    panel.style.transform = '';
    panel.style.overflow = '';
    panel.style.pointerEvents = '';
    panel.dataset.accordionState = 'closed';
  }, SIDEBAR_ACCORDION_MS + 40);
}

if (sidebarSettingsBtn) {
  sidebarSettingsBtn.addEventListener('click', showSettingsView);
}
if (navHomeBtn) {
  navHomeBtn.addEventListener('click', showWelcome);
}
if (navSyllabusBtn) {
  navSyllabusBtn.addEventListener('click', toggleSyllabusPanel);
}
if (navRecentBtn) {
  navRecentBtn.addEventListener('click', toggleRecentPanel);
}
if (navCourseTrackerBtn) {
  navCourseTrackerBtn.addEventListener('click', showCourseTrackerView);
}
if (navMistakeNotebookBtn) {
  navMistakeNotebookBtn.addEventListener('click', showMistakeNotebookView);
}
if (navPreferenceBtn) {
  navPreferenceBtn.addEventListener('click', showPreferenceView);
}
if (navFeedbackBtn) {
  navFeedbackBtn.addEventListener('click', showFeedbackView);
}
if (welcomeCoverBtn) {
  welcomeCoverBtn.addEventListener('click', () => toggleSyllabusPanel(true));
}
if (settingsPageBackBtn) {
  settingsPageBackBtn.addEventListener('click', () => {
    showWelcome();
  });
}
if (preferencePageBackBtn) {
  preferencePageBackBtn.addEventListener('click', () => {
    showWelcome();
  });
}
if (feedbackCloseBtn) {
  feedbackCloseBtn.addEventListener('click', showWelcome);
}
if (feedbackRefreshBtn) {
  feedbackRefreshBtn.addEventListener('click', loadFeedbackBoard);
}
if (feedbackSubmitBtn) {
  feedbackSubmitBtn.addEventListener('click', submitFeedbackItem);
}
if (homeworkCloseBtn) {
  homeworkCloseBtn.addEventListener('click', showWelcome);
}
if (courseTrackerCloseBtn) {
  courseTrackerCloseBtn.addEventListener('click', showWelcome);
}
if (mistakeNotebookCloseBtn) {
  mistakeNotebookCloseBtn.addEventListener('click', showWelcome);
}
if (courseTrackerResetBtn) {
  courseTrackerResetBtn.addEventListener('click', () => {
    saveCourseTrackerState({});
    renderCourseTracker();
  });
}
if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    setLoginStatus('');
    openClerkSignIn();
  });
}

// ── Attachment state ────────────────────────────────────────
// Each entry: { type: 'image'|'pdf'|'document', name, dataUrl, mimeType, size?, text? }
let attachmentsMain = [];
let attachmentsFollowup = [];
let attachmentsLearn = [];
const MAX_ATTACH_SIZE = 20 * 1024 * 1024; // 20MB
const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

function getAttachmentType(fileOrAttachment = {}) {
  const name = String(fileOrAttachment.name || '').toLowerCase();
  const rawType = String(fileOrAttachment.type || '').toLowerCase();
  const mime = String(fileOrAttachment.mimeType || (rawType.includes('/') ? rawType : '')).toLowerCase();
  const dataUrl = String(fileOrAttachment.dataUrl || '').toLowerCase();
  if (rawType === 'image' || rawType === 'pdf' || rawType === 'document' || rawType === 'word' || rawType === 'file') {
    if (rawType === 'file' && (dataUrl.startsWith('data:image/') || /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(name))) return 'image';
    if (rawType === 'file' && (dataUrl.startsWith('data:application/pdf') || name.endsWith('.pdf'))) return 'pdf';
    if (rawType === 'file' && (mime === DOCX_MIME || name.endsWith('.docx'))) return 'document';
    return rawType === 'word' ? 'document' : rawType;
  }
  if (dataUrl.startsWith('data:image/')) return 'image';
  if (dataUrl.startsWith('data:application/pdf')) return 'pdf';
  if (mime.startsWith('image/')) return 'image';
  if (/\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(name)) return 'image';
  if (mime === 'application/pdf' || name.endsWith('.pdf')) return 'pdf';
  if (mime === DOCX_MIME || mime.includes('wordprocessingml.document') || name.endsWith('.docx')) return 'document';
  return 'file';
}

function getAttachmentIcon(att = {}) {
  const name = String(att.name || '').toLowerCase();
  const mime = String(att.mimeType || '').toLowerCase();
  const kind = getAttachmentType(att);
  if (kind === 'image') return 'IMG';
  if (kind === 'pdf') return 'PDF';
  if (kind === 'document' || name.endsWith('.docx') || mime.includes('word')) return 'DOC';
  return 'FILE';
}

function getAttachmentMimeType(fileOrAttachment = {}) {
  const mimeType = fileOrAttachment.mimeType || '';
  if (mimeType) return mimeType;
  const rawType = String(fileOrAttachment.type || '').toLowerCase();
  if (rawType && rawType.includes('/')) return rawType;
  const dataUrlMatch = String(fileOrAttachment.dataUrl || '').match(/^data:([^;,]+)/i);
  if (dataUrlMatch) return dataUrlMatch[1];
  const kind = getAttachmentType(fileOrAttachment);
  if (kind === 'image') return 'image/png';
  if (kind === 'pdf') return 'application/pdf';
  if (kind === 'document') return DOCX_MIME;
  return 'application/octet-stream';
}

function isSupportedAttachment(fileOrAttachment = {}) {
  const kind = getAttachmentType(fileOrAttachment);
  return kind === 'image' || kind === 'pdf' || kind === 'document';
}

function attachmentUnsupportedMessage(fileOrAttachment = {}) {
  const name = String(fileOrAttachment.name || 'this file');
  if (/\.doc$/i.test(name)) {
    return '旧版 .doc 不能在浏览器里可靠预览。请上传 .docx、PDF 或图片。';
  }
  return '目前只支持图片、PDF 和 Word（.docx）。其他文件不会上传，也不会生成下载入口。';
}

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
    const kind = getAttachmentType(att);
    const chip = document.createElement('div');
    chip.className = 'attach-chip';
    if (kind === 'image') {
      chip.innerHTML = `<img src="${att.dataUrl}" alt=""><span class="attach-chip-name">${att.name}</span><button class="attach-chip-remove" data-idx="${idx}">×</button>`;
    } else {
      chip.innerHTML = `<span class="attach-chip-filetype">${escapeHtml(getAttachmentIcon(att))}</span><span class="attach-chip-name">${escapeHtml(att.name || 'Attachment')}</span><button class="attach-chip-remove" data-idx="${idx}">×</button>`;
    }
    chip.querySelector('.attach-chip-remove').addEventListener('click', () => {
      list.splice(idx, 1);
      renderAttachPreview(list, previewId);
      setSendState();
    });
    container.appendChild(chip);
  });
}

let activeMainAttachmentSources = [];
let activeMainAttachmentIndex = 0;
let attachmentCompareOpen = true;

function getAttachmentLabel(att, index) {
  const kind = getAttachmentType(att);
  const fallback = kind === 'pdf'
    ? `PDF ${index + 1}`
    : (kind === 'image' ? `Image ${index + 1}` : (kind === 'document' ? `Word ${index + 1}` : `Attachment ${index + 1}`));
  return String(att?.name || fallback);
}

function renderAttachmentSourcePanel(attachments = activeMainAttachmentSources) {
  activeMainAttachmentSources = Array.isArray(attachments) ? attachments : [];
  if (activeMainAttachmentIndex >= activeMainAttachmentSources.length) activeMainAttachmentIndex = 0;
  const hasSources = activeMainAttachmentSources.length > 0;
  const shouldShow = hasSources && attachmentCompareOpen;

  if (attachmentCompareToggle) {
    attachmentCompareToggle.classList.toggle('hidden', !hasSources);
    attachmentCompareToggle.setAttribute('aria-pressed', shouldShow ? 'true' : 'false');
    attachmentCompareToggle.classList.toggle('active', shouldShow);
  }
  if (attachmentSourcePanel) attachmentSourcePanel.classList.toggle('hidden', !shouldShow);
  if (answerCompareResizer) answerCompareResizer.classList.toggle('hidden', !shouldShow);

  if (!hasSources) {
    if (attachmentSourceTitle) attachmentSourceTitle.textContent = 'Compare';
    if (attachmentSourceTabs) attachmentSourceTabs.innerHTML = '';
    if (attachmentSourceBody) attachmentSourceBody.innerHTML = '<div class="attachment-source-empty">No attachment to compare.</div>';
    return;
  }

  const current = activeMainAttachmentSources[activeMainAttachmentIndex] || activeMainAttachmentSources[0];
  const currentKind = getAttachmentType(current);
  if (attachmentSourceTitle) attachmentSourceTitle.textContent = getAttachmentLabel(current, activeMainAttachmentIndex);
  if (attachmentSourceTabs) {
    attachmentSourceTabs.innerHTML = activeMainAttachmentSources.map((att, index) => `
      <button class="attachment-source-tab ${index === activeMainAttachmentIndex ? 'active' : ''}" type="button" data-attachment-source-index="${index}">
        ${escapeHtml(getAttachmentIcon(att))} ${index + 1}
      </button>
    `).join('');
    attachmentSourceTabs.querySelectorAll('.attachment-source-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeMainAttachmentIndex = Number(btn.dataset.attachmentSourceIndex || 0);
        renderAttachmentSourcePanel();
      });
    });
  }

  if (!attachmentSourceBody) return;
  if (currentKind === 'image') {
    const label = getAttachmentLabel(current, activeMainAttachmentIndex);
    attachmentSourceBody.innerHTML = `
      <figure class="attachment-source-figure">
        <button class="attachment-source-image-btn" type="button" aria-label="Open ${escapeHtml(label)} larger">
          <img src="${escapeHtml(current.dataUrl)}" alt="${escapeHtml(label)}">
          <span class="attachment-source-zoom-hint">Click to enlarge</span>
        </button>
        <figcaption>${escapeHtml(label)}</figcaption>
      </figure>
    `;
    const imageBtn = attachmentSourceBody.querySelector('.attachment-source-image-btn');
    if (imageBtn) {
      imageBtn.addEventListener('click', () => {
        openAttachmentImageModal(current.dataUrl, label);
      });
    }
  } else if (currentKind === 'pdf') {
    attachmentSourceBody.innerHTML = `
      <div class="attachment-source-pdf">
        <object data="${escapeHtml(current.dataUrl)}" type="application/pdf">
          <iframe src="${escapeHtml(current.dataUrl)}" title="${escapeHtml(getAttachmentLabel(current, activeMainAttachmentIndex))}"></iframe>
        </object>
      </div>
    `;
  } else if (currentKind === 'document') {
    const label = getAttachmentLabel(current, activeMainAttachmentIndex);
    const text = String(current.text || '').trim();
    attachmentSourceBody.innerHTML = `
      <article class="attachment-source-word">
        <div class="attachment-source-word-head">
          <div class="attachment-source-file-icon">DOC</div>
          <div>
            <div class="attachment-source-file-name">${escapeHtml(label)}</div>
            <div class="attachment-source-file-meta">Word preview</div>
          </div>
        </div>
        <pre class="attachment-source-word-text">${escapeHtml(text || '这个 Word 文件没有提取到可预览文本。')}</pre>
      </article>
    `;
  } else {
    attachmentSourceBody.innerHTML = `
      <div class="attachment-source-empty">
        Unsupported attachment. Please upload an image, PDF, or Word (.docx).
      </div>
    `;
  }
}

function closeAttachmentImageModal() {
  const modal = document.getElementById('attachmentImageModal');
  if (modal) modal.remove();
}

function openAttachmentImageModal(src, title = 'Attached image') {
  if (!src) return;
  closeAttachmentImageModal();
  const modal = document.createElement('div');
  modal.id = 'attachmentImageModal';
  modal.className = 'attachment-image-modal';
  modal.innerHTML = `
    <div class="attachment-image-backdrop" data-attachment-image-close="true"></div>
    <div class="attachment-image-dialog" role="dialog" aria-modal="true" aria-label="Attached image preview">
      <div class="attachment-image-head">
        <div>
          <div class="attachment-image-kicker">Attached Source</div>
          <div class="attachment-image-title">${escapeHtml(title)}</div>
        </div>
        <button class="attachment-image-close" type="button" data-attachment-image-close="true" aria-label="Close attached image">✕</button>
      </div>
      <div class="attachment-image-stage">
        <img src="${escapeHtml(src)}" alt="${escapeHtml(title)}">
      </div>
    </div>
  `;
  modal.addEventListener('click', (event) => {
    if (event.target && event.target.dataset && event.target.dataset.attachmentImageClose) closeAttachmentImageModal();
  });
  document.body.appendChild(modal);
}

function setAttachmentCompareOpen(open) {
  attachmentCompareOpen = Boolean(open);
  renderAttachmentSourcePanel();
}

function clearAttachmentSourcePanel() {
  activeMainAttachmentSources = [];
  activeMainAttachmentIndex = 0;
  attachmentCompareOpen = true;
  renderAttachmentSourcePanel([]);
}

function cloneAttachmentSourcesForStorage(attachments = activeMainAttachmentSources) {
  return (Array.isArray(attachments) ? attachments : [])
    .filter(att => att && att.dataUrl)
    .map(att => {
      const type = getAttachmentType(att);
      return {
        type,
        name: att.name || '',
        dataUrl: att.dataUrl,
        mimeType: getAttachmentMimeType(att),
        size: att.size || 0,
        text: type === 'document' ? String(att.text || '').slice(0, 100000) : ''
      };
    });
}

function getModelReadableAttachments(attachments = []) {
  return cloneAttachmentSourcesForStorage(attachments)
    .filter(att => att.type === 'image' || att.type === 'pdf' || (att.type === 'document' && att.text))
    .map(att => {
      if (att.type === 'document') {
        return {
          type: 'document',
          name: att.name,
          mimeType: att.mimeType,
          size: att.size,
          text: att.text
        };
      }
      return att;
    });
}

function mergeAttachmentSources(...groups) {
  const merged = [];
  const seen = new Set();
  groups.flat().forEach((att) => {
    if (!att || !att.dataUrl) return;
    const key = `${att.name || ''}|${getAttachmentType(att)}|${att.dataUrl.slice(0, 96)}`;
    if (seen.has(key)) return;
    seen.add(key);
    merged.push(att);
  });
  return merged;
}

function buildAttachmentOnlyPrompt(attachments = [], lang = 'en') {
  const files = cloneAttachmentSourcesForStorage(attachments);
  const names = files.map(file => file.name || getAttachmentIcon(file)).filter(Boolean).join(', ') || 'the attached file';
  const readable = getModelReadableAttachments(files).length > 0;
  if (lang === 'zh') {
    return readable
      ? `请根据我上传的附件讲解。附件：${names}`
      : `我上传了附件：${names}。请提醒我改传图片、PDF 或 Word（.docx）后再讲解。`;
  }
  return readable
    ? `Please explain the attached file(s): ${names}`
    : `I attached: ${names}. Please ask me to upload an image, PDF, or Word (.docx) before explaining it.`;
}

function readUInt16LE(bytes, offset) {
  return bytes[offset] | (bytes[offset + 1] << 8);
}

function readUInt32LE(bytes, offset) {
  return (bytes[offset] | (bytes[offset + 1] << 8) | (bytes[offset + 2] << 16) | (bytes[offset + 3] << 24)) >>> 0;
}

function dataUrlToBytes(dataUrl) {
  const base64 = String(dataUrl || '').split(',')[1] || '';
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function findZipCentralDirectory(bytes) {
  const minOffset = Math.max(0, bytes.length - 65558);
  for (let offset = bytes.length - 22; offset >= minOffset; offset -= 1) {
    if (readUInt32LE(bytes, offset) === 0x06054b50) {
      return {
        entries: readUInt16LE(bytes, offset + 10),
        size: readUInt32LE(bytes, offset + 12),
        offset: readUInt32LE(bytes, offset + 16)
      };
    }
  }
  throw new Error('DOCX central directory not found');
}

async function inflateZipEntry(compressedBytes, method) {
  if (method === 0) return compressedBytes;
  if (method !== 8) throw new Error(`Unsupported ZIP compression method ${method}`);
  if (typeof DecompressionStream !== 'function') {
    throw new Error('Browser does not support ZIP deflate preview');
  }
  const stream = new Blob([compressedBytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function extractZipEntry(bytes, targetName) {
  const decoder = new TextDecoder('utf-8');
  const central = findZipCentralDirectory(bytes);
  let offset = central.offset;
  const end = central.offset + central.size;
  for (let entryIndex = 0; entryIndex < central.entries && offset < end; entryIndex += 1) {
    if (readUInt32LE(bytes, offset) !== 0x02014b50) break;
    const method = readUInt16LE(bytes, offset + 10);
    const compressedSize = readUInt32LE(bytes, offset + 20);
    const fileNameLength = readUInt16LE(bytes, offset + 28);
    const extraLength = readUInt16LE(bytes, offset + 30);
    const commentLength = readUInt16LE(bytes, offset + 32);
    const localHeaderOffset = readUInt32LE(bytes, offset + 42);
    const fileName = decoder.decode(bytes.slice(offset + 46, offset + 46 + fileNameLength));
    if (fileName === targetName) {
      if (readUInt32LE(bytes, localHeaderOffset) !== 0x04034b50) {
        throw new Error('DOCX local file header not found');
      }
      const localNameLength = readUInt16LE(bytes, localHeaderOffset + 26);
      const localExtraLength = readUInt16LE(bytes, localHeaderOffset + 28);
      const dataStart = localHeaderOffset + 30 + localNameLength + localExtraLength;
      const compressedBytes = bytes.slice(dataStart, dataStart + compressedSize);
      return inflateZipEntry(compressedBytes, method);
    }
    offset += 46 + fileNameLength + extraLength + commentLength;
  }
  throw new Error(`${targetName} not found in DOCX`);
}

function decodeXmlEntities(text) {
  return String(text || '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

function extractWordTextFromDocumentXml(xml) {
  const normalized = String(xml || '')
    .replace(/<w:tab\s*\/>/g, '\t')
    .replace(/<w:br\s*\/>/g, '\n')
    .replace(/<\/w:p>/g, '\n')
    .replace(/<\/w:tr>/g, '\n')
    .replace(/<[^>]+>/g, '');
  return decodeXmlEntities(normalized)
    .split('\n')
    .map(line => line.replace(/[ \t]+/g, ' ').trim())
    .filter(Boolean)
    .join('\n')
    .slice(0, 100000);
}

async function extractDocxTextFromDataUrl(dataUrl) {
  const bytes = dataUrlToBytes(dataUrl);
  const documentXmlBytes = await extractZipEntry(bytes, 'word/document.xml');
  const xml = new TextDecoder('utf-8').decode(documentXmlBytes);
  return extractWordTextFromDocumentXml(xml);
}

async function processFile(file, list, previewId) {
  if (file.size > MAX_ATTACH_SIZE) {
    alert(`File too large (max 20MB): ${file.name}`);
    return;
  }
  if (!isSupportedAttachment(file)) {
    alert(attachmentUnsupportedMessage(file));
    return;
  }
  const type = getAttachmentType(file);
  const dataUrl = await readAsDataUrl(file);
  const attachment = {
    type,
    name: file.name,
    dataUrl,
    mimeType: getAttachmentMimeType(file),
    size: file.size || 0
  };
  if (type === 'document') {
    try {
      attachment.text = await extractDocxTextFromDataUrl(dataUrl);
      if (!attachment.text.trim()) {
        alert('这个 Word 文件没有提取到可预览文本。请上传包含正文的 .docx、PDF 或图片。');
        return;
      }
    } catch (err) {
      console.warn('[attachments] Failed to preview Word document:', err);
      alert('这个 Word 文件暂时无法预览。请上传 .docx、PDF 或图片。');
      return;
    }
  }
  list.push(attachment);
  renderAttachPreview(list, previewId);
  setSendState();
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
const topbarCloseBtn = document.getElementById('topbarCloseBtn');
const questionLabel = document.getElementById('questionLabel') || { textContent: '' };
const answerStatus = document.getElementById('answerStatus');

const stepsBar = document.getElementById('stepsBar');
const answerContent = document.getElementById('answerContent');
const answerScroll = document.getElementById('answerScroll');

const bookPagesContainer = document.getElementById('bookPagesContainer') || { innerHTML: '' };
const bookPanelMeta = document.getElementById('bookPanelMeta') || { textContent: '' };

const sourcesSection = document.getElementById('sourcesSection');
const referencesToggleBtn = document.getElementById('referencesToggleBtn');
const referencesCount = document.getElementById('referencesCount');
const referencesBody = document.getElementById('referencesBody');
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
const attachmentCompareToggle = document.getElementById('attachmentCompareToggle');
const attachmentSourcePanel = document.getElementById('attachmentSourcePanel');
const attachmentSourceTitle = document.getElementById('attachmentSourceTitle');
const attachmentSourceTabs = document.getElementById('attachmentSourceTabs');
const attachmentSourceBody = document.getElementById('attachmentSourceBody');
const attachmentSourceCloseBtn = document.getElementById('attachmentSourceCloseBtn');
const answerCompareResizer = document.getElementById('answerCompareResizer');

if (bookSourcesRail && bookSourcesRail.addEventListener) {
  bookSourcesRail.addEventListener('click', (event) => {
    const card = event.target.closest('.source-page-link');
    if (!card) return;
    openMainBookSource(Number(card.dataset.bookSourceIndex || 0));
  });
}

let currentAbortController = null;

const tutorState = {
  chatHistory: [],
  chatSessionStartTime: Date.now(),
  currentBookPages: [],
  currentWebSources: [],
  learnSectionId: '',
  learnSectionTitle: '',
  learnLessonMarkdown: '',
  learnHistory: [],
  learnBookPages: [],
  learnWebSources: []
};

const B8_TEXTBOOK_ONLY_MARKDOWN = [
  '## B.8 Appendix: Useful Mathematical Formulas',
  '',
  'This appendix is a compact formula reference. Use it as the lookup sheet for the algebra, series, calculus, and trigonometric identities that appear throughout the earlier background sections.',
  '',
  'Read it by formula family, not from top to bottom like a proof. First identify the kind of move you need: complex-number conversion, summation, Taylor/Maclaurin expansion, power series, trig simplification, derivative, integral, limit rule, or polynomial equation formula.',
  '',
  'The main exam trap is sign and condition copying. Check the plus/minus signs, whether a formula assumes a nonzero denominator, and whether the variable is in radians. For worked examples, connect these formulas back to B.1 complex numbers, B.2 sinusoids, and B.5 partial fractions.',
  '',
  'Switch to the **Textbook** tab for the full appendix pages.'
].join('\n');

function isB8TextbookOnlySection(sectionId = '', sectionTitle = '') {
  // Parent "B.8 Appendix" only — subtopics (B.8-1..B.8-10) are real lessons
  // served from cache; forcing the appendix blurb on them hides their content.
  return /\bB\.8\b(?!-\d)/i.test(`${sectionId || ''} ${sectionTitle || ''}`);
}

function isB73VectorOperationsSection(sectionId = '', sectionTitle = '') {
  const text = compactWhitespace(`${sectionId || ''} ${sectionTitle || ''}`);
  return /\bB\.7-3\b/i.test(text) || (/Vector Operations/i.test(text) && /\bB\.7\b/i.test(text));
}

function getB8TextbookOnlyMarkdown() {
  return B8_TEXTBOOK_ONLY_MARKDOWN;
}

function shouldOpenSectionAsChapterOverview(sectionId = '', sectionTitle = '', subsections = []) {
  return Boolean(compactWhitespace(`${sectionId || ''} ${sectionTitle || ''}`));
}

function forceB8TextbookOnlyLesson(sectionId = '', sectionTitle = '', markdown = '') {
  return isB8TextbookOnlySection(sectionId, sectionTitle) ? getB8TextbookOnlyMarkdown() : markdown;
}

webSourcesToggle.addEventListener('click', () => {
  const open = !webSourcesInline.classList.contains('hidden');
  webSourcesInline.classList.toggle('hidden', open);
  webSourcesToggle.classList.toggle('open', !open);
});

function setReferencesOpen(open) {
  if (!sourcesSection) return;
  sourcesSection.classList.toggle('references-collapsed', !open);
  if (referencesToggleBtn) referencesToggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

function updateReferencesSummary(bookCount = tutorState.currentBookPages?.length || 0, webCount = tutorState.currentWebSources?.length || 0) {
  const total = Number(bookCount || 0) + Number(webCount || 0);
  if (referencesCount) {
    const label = total === 1 ? '1 source' : `${total} sources`;
    referencesCount.textContent = total
      ? `${label} · ${Number(bookCount || 0)} content · ${Number(webCount || 0)} web`
      : '0 sources';
  }
  if (sourcesSection) {
    sourcesSection.classList.toggle('hidden', total === 0);
  }
}

if (referencesToggleBtn) {
  referencesToggleBtn.addEventListener('click', () => {
    const nextOpen = sourcesSection.classList.contains('references-collapsed');
    setReferencesOpen(nextOpen);
  });
}

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
    "en": "Signal energy and power are the fundamental metrics for measuring how 'big' a signal really is-not in amplitude, but in total content. These normalized measures (based on a 1-ohm load) become essential tools for comparing signals, analyzing approximation errors, and understanding signal-to-noise ratios on exams.",
    "zh": "信号能量和功率是衡量信号\"大小\"的基本指标--不是振幅,而是总体内容。这些归一化度量(基于1欧姆负载)成为比较信号、分析近似误差和理解信噪比的必要工具。",
    "emoji": "⚡",
    "refs": 8
  },
  "1.1": {
    "en": "Signal energy and power are the fundamental metrics for measuring how 'big' a signal really is-not in amplitude, but in total content. These normalized measures (based on a 1-ohm load) become essential tools for comparing signals, analyzing approximation errors, and understanding signal-to-noise ratios on exams.",
    "zh": "信号能量和功率是衡量信号\"大小\"的基本指标--不是振幅,而是总体内容。这些归一化度量(基于1欧姆负载)成为比较信号、分析近似误差和理解信噪比的必要工具。",
    "emoji": "⚡",
    "refs": 8
  },
  "1.1-2 Size of a Signal": {
    "en": "Signal energy and power are the fundamental metrics for quantifying how 'big' a signal really is. Energy (the integral of squared magnitude) works perfectly for signals that die out, while power (time-averaged energy) handles signals that persist forever-and you'll need to know which one applies to pass any exam problem involving signal classification.",
    "zh": "信号能量和功率是量化信号\"大小\"的基本指标。能量(幅度平方的积分)适用于衰减的信号,而功率(能量的时间平均)则用于永不衰减的信号--在任何涉及信号分类的考试题中,你都需要知道何时使用哪一个。",
    "emoji": "📏",
    "refs": 1
  },
  "1.1-2": {
    "en": "Signal energy and power are the fundamental metrics for quantifying how 'big' a signal really is. Energy (the integral of squared magnitude) works perfectly for signals that die out, while power (time-averaged energy) handles signals that persist forever-and you'll need to know which one applies to pass any exam problem involving signal classification.",
    "zh": "信号能量和功率是量化信号\"大小\"的基本指标。能量(幅度平方的积分)适用于衰减的信号,而功率(能量的时间平均)则用于永不衰减的信号--在任何涉及信号分类的考试题中,你都需要知道何时使用哪一个。",
    "emoji": "📏",
    "refs": 1
  },
  "1.10 Internal Description: The State-Space Description": {
    "en": "State-space descriptions capture the internal dynamics of a system by tracking key variables (like capacitor voltages and inductor currents) from which all other signals can be reconstructed. This internal view is essential for understanding system behavior, designing controllers, and identifying whether a system is truly controllable and observable-properties that determine if you can actually steer and measure what matters.",
    "zh": "状态空间描述通过跟踪系统的关键变量(如电容器电压和电感器电流)来捕捉系统的内部动态,所有其他信号都可以从这些变量重构出来。这种内部视角对于理解系统行为、设计控制器以及识别系统是否真正可控和可观测至关重要--这些性质决定了你是否能够真正控制和测量重要的量。",
    "emoji": "⚙️",
    "refs": 3
  },
  "1.10": {
    "en": "State-space descriptions capture the internal dynamics of a system by tracking key variables (like capacitor voltages and inductor currents) from which all other signals can be reconstructed. This internal view is essential for understanding system behavior, designing controllers, and identifying whether a system is truly controllable and observable-properties that determine if you can actually steer and measure what matters.",
    "zh": "状态空间描述通过跟踪系统的关键变量(如电容器电压和电感器电流)来捕捉系统的内部动态,所有其他信号都可以从这些变量重构出来。这种内部视角对于理解系统行为、设计控制器以及识别系统是否真正可控和可观测至关重要--这些性质决定了你是否能够真正控制和测量重要的量。",
    "emoji": "⚙️",
    "refs": 3
  },
  "1.10-2 Signals and Systems - Problems": {
    "en": "These problems push you to translate real circuits and mechanical systems into state-variable form-the language that makes higher-order systems solvable. You'll practice identifying which voltages and currents matter as states, then writing the differential equations that govern them, skills that show up constantly on exams and in system modeling.",
    "zh": "这些题目要求你将实际电路和机械系统转化为状态变量形式--这是求解高阶系统的关键语言。你将练习识别哪些电压和电流作为状态变量,然后写出控制它们的微分方程,这些技能在考试和系统建模中频繁出现。",
    "emoji": "⚙️",
    "refs": 1
  },
  "1.10-2": {
    "en": "These problems push you to translate real circuits and mechanical systems into state-variable form-the language that makes higher-order systems solvable. You'll practice identifying which voltages and currents matter as states, then writing the differential equations that govern them, skills that show up constantly on exams and in system modeling.",
    "zh": "这些题目要求你将实际电路和机械系统转化为状态变量形式--这是求解高阶系统的关键语言。你将练习识别哪些电压和电流作为状态变量,然后写出控制它们的微分方程,这些技能在考试和系统建模中频繁出现。",
    "emoji": "⚙️",
    "refs": 1
  },
  "1.11 MATLAB: Working with Functions": {
    "en": "Plotting oscillatory functions in MATLAB requires more finesse than you might think-too few sample points and your beautiful cosine wave becomes a jagged mess. This section shows why choosing the right sampling density (typically 100 points per oscillation) is essential for capturing fast-changing signals accurately, and introduces practical MATLAB commands like anonymous functions and axis formatting to make your plots publication-ready.",
    "zh": "在MATLAB中绘制振荡函数需要比你想象的更多技巧--样本点太少,你的余弦波就会变成锯齿状的混乱。本节展示为什么选择正确的采样密度(通常每个振荡100个点)对于准确捕捉快速变化的信号至关重要,并介绍实用的MATLAB命令(如匿名函数和坐标轴格式化)来使你的图表达到出版质量。",
    "emoji": "📈",
    "refs": 2
  },
  "1.11": {
    "en": "Plotting oscillatory functions in MATLAB requires more finesse than you might think-too few sample points and your beautiful cosine wave becomes a jagged mess. This section shows why choosing the right sampling density (typically 100 points per oscillation) is essential for capturing fast-changing signals accurately, and introduces practical MATLAB commands like anonymous functions and axis formatting to make your plots publication-ready.",
    "zh": "在MATLAB中绘制振荡函数需要比你想象的更多技巧--样本点太少,你的余弦波就会变成锯齿状的混乱。本节展示为什么选择正确的采样密度(通常每个振荡100个点)对于准确捕捉快速变化的信号至关重要,并介绍实用的MATLAB命令(如匿名函数和坐标轴格式化)来使你的图表达到出版质量。",
    "emoji": "📈",
    "refs": 2
  },
  "1.11-1 Anonymous Functions": {
    "en": "Anonymous functions let you define mathematical expressions on the fly in MATLAB without creating separate files-perfect for quickly testing exponentially damped sinusoids and other signals you'll encounter in homework and exams. The @ symbol syntax makes it easy to evaluate your function at any input, whether a single point or an entire vector for plotting.",
    "zh": "匿名函数让你在MATLAB中快速定义数学表达式,无需创建单独的文件--非常适合快速测试指数衰减正弦波和其他信号处理中常见的信号。使用@符号语法可以轻松在任意输入点(单个点或整个向量)处计算函数值,便于绘图。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.11-1": {
    "en": "Anonymous functions let you define mathematical expressions on the fly in MATLAB without creating separate files-perfect for quickly testing exponentially damped sinusoids and other signals you'll encounter in homework and exams. The @ symbol syntax makes it easy to evaluate your function at any input, whether a single point or an entire vector for plotting.",
    "zh": "匿名函数让你在MATLAB中快速定义数学表达式,无需创建单独的文件--非常适合快速测试指数衰减正弦波和其他信号处理中常见的信号。使用@符号语法可以轻松在任意输入点(单个点或整个向量)处计算函数值,便于绘图。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.11-2 Relational Operators and the Unit Step Function": {
    "en": "The unit step function is a fundamental building block in signals and systems, and MATLAB's relational operators make it surprisingly simple to define and visualize. This section shows how to use the >= operator to create u(t) as an anonymous function, then tackles two practical plotting pitfalls-axis scaling that hides your signal and the jagged appearance of discontinuities-that every student encounters when first coding step functions.",
    "zh": "单位阶跃函数是信号与系统中的基本构件,MATLAB的关系运算符使其定义和可视化变得出奇地简单。本节展示如何使用>=运算符将u(t)创建为匿名函数,然后解决两个实际绘图问题--隐藏信号的轴缩放和不连续性的锯齿状外观--这是每个学生首次编写阶跃函数时都会遇到的问题。",
    "emoji": "📊",
    "refs": 1
  },
  "1.11-2": {
    "en": "The unit step function is a fundamental building block in signals and systems, and MATLAB's relational operators make it surprisingly simple to define and visualize. This section shows how to use the >= operator to create u(t) as an anonymous function, then tackles two practical plotting pitfalls-axis scaling that hides your signal and the jagged appearance of discontinuities-that every student encounters when first coding step functions.",
    "zh": "单位阶跃函数是信号与系统中的基本构件,MATLAB的关系运算符使其定义和可视化变得出奇地简单。本节展示如何使用>=运算符将u(t)创建为匿名函数,然后解决两个实际绘图问题--隐藏信号的轴缩放和不连续性的锯齿状外观--这是每个学生首次编写阶跃函数时都会遇到的问题。",
    "emoji": "📊",
    "refs": 1
  },
  "1.11-3 Visualizing Operations on the Independent Variable": {
    "en": "Time shifting and scaling aren't just abstract concepts-they're operations you can visualize directly in MATLAB using anonymous functions. This section shows how to plot transformed versions of a function like g(2t+1), breaking down what happens when you compress time and shift the waveform left, with concrete examples using causal exponential cosines that help you see exactly where the signal turns on.",
    "zh": "时间移位和缩放不仅仅是抽象概念--你可以在MATLAB中使用匿名函数直接可视化这些操作。本节展示如何绘制函数的变换版本(如g(2t+1)),分解时间压缩和波形左移时发生的情况,并使用因果指数余弦的具体例子帮助你看到信号的确切开启点。",
    "emoji": "📊",
    "refs": 1
  },
  "1.11-3": {
    "en": "Time shifting and scaling aren't just abstract concepts-they're operations you can visualize directly in MATLAB using anonymous functions. This section shows how to plot transformed versions of a function like g(2t+1), breaking down what happens when you compress time and shift the waveform left, with concrete examples using causal exponential cosines that help you see exactly where the signal turns on.",
    "zh": "时间移位和缩放不仅仅是抽象概念--你可以在MATLAB中使用匿名函数直接可视化这些操作。本节展示如何绘制函数的变换版本(如g(2t+1)),分解时间压缩和波形左移时发生的情况,并使用因果指数余弦的具体例子帮助你看到信号的确切开启点。",
    "emoji": "📊",
    "refs": 1
  },
  "1.11-4 MATLAB: Working with Functions": {
    "en": "MATLAB transforms abstract signal operations into visual reality-this section shows how to plot reflected and time-shifted versions of signals like g(-t+1) and composite functions, then tackles numerical integration to estimate signal energy without solving integrals by hand. These practical coding skills bridge theory and the computational tools you'll use on exams and in labs.",
    "zh": "MATLAB 将抽象的信号运算转化为可视化现实--本节展示如何绘制反射和时移信号(如 g(-t+1) 和复合函数),然后介绍数值积分来估计信号能量,无需手工求解积分。这些实用的编程技能连接了理论与你在考试和实验中使用的计算工具。",
    "emoji": "📊",
    "refs": 2
  },
  "1.11-4": {
    "en": "MATLAB transforms abstract signal operations into visual reality-this section shows how to plot reflected and time-shifted versions of signals like g(-t+1) and composite functions, then tackles numerical integration to estimate signal energy without solving integrals by hand. These practical coding skills bridge theory and the computational tools you'll use on exams and in labs.",
    "zh": "MATLAB 将抽象的信号运算转化为可视化现实--本节展示如何绘制反射和时移信号(如 g(-t+1) 和复合函数),然后介绍数值积分来估计信号能量,无需手工求解积分。这些实用的编程技能连接了理论与你在考试和实验中使用的计算工具。",
    "emoji": "📊",
    "refs": 2
  },
  "1.12 Summary": {
    "en": "This chapter wrap-up consolidates everything you've learned about signals and systems-from energy calculations to stability conditions. You'll see how all the classifications (continuous vs. discrete, periodic vs. aperiodic, causal vs. noncausal) fit together, plus a MATLAB drill to cement your computational skills before moving to more complex topics.",
    "zh": "本章总结整合了你所学的信号与系统的全部内容--从能量计算到稳定性条件。你将看到所有分类(连续与离散、周期与非周期、因果与非因果)如何相互关联,以及一个MATLAB练习来巩固你的计算技能,为后续更复杂的主题做准备。",
    "emoji": "📋",
    "refs": 2
  },
  "1.12": {
    "en": "This chapter wrap-up consolidates everything you've learned about signals and systems-from energy calculations to stability conditions. You'll see how all the classifications (continuous vs. discrete, periodic vs. aperiodic, causal vs. noncausal) fit together, plus a MATLAB drill to cement your computational skills before moving to more complex topics.",
    "zh": "本章总结整合了你所学的信号与系统的全部内容--从能量计算到稳定性条件。你将看到所有分类(连续与离散、周期与非周期、因果与非因果)如何相互关联,以及一个MATLAB练习来巩固你的计算技能,为后续更复杂的主题做准备。",
    "emoji": "📋",
    "refs": 2
  },
  "1.2 Determining Power and RMS Value": {
    "en": "Power and RMS values reveal how much energy a signal carries-and for sinusoids, these quantities depend only on amplitude, not frequency or phase. This section walks through calculating power for both real sinusoids and complex exponentials using time-averaging, then introduces time scaling operations that compress or stretch signals by replacing t with at, a fundamental manipulation you'll use constantly when analyzing system responses.",
    "zh": "功率和RMS值揭示了信号携带的能量大小--对于正弦信号,这些量仅取决于幅度,与频率或相位无关。本节通过时间平均法演示如何计算实正弦和复指数信号的功率,随后介绍时间缩放操作,通过将t替换为at来压缩或拉伸信号,这是分析系统响应时经常使用的基本操作。",
    "emoji": "⚡",
    "refs": 4
  },
  "1.2": {
    "en": "Power and RMS values reveal how much energy a signal carries-and for sinusoids, these quantities depend only on amplitude, not frequency or phase. This section walks through calculating power for both real sinusoids and complex exponentials using time-averaging, then introduces time scaling operations that compress or stretch signals by replacing t with at, a fundamental manipulation you'll use constantly when analyzing system responses.",
    "zh": "功率和RMS值揭示了信号携带的能量大小--对于正弦信号,这些量仅取决于幅度,与频率或相位无关。本节通过时间平均法演示如何计算实正弦和复指数信号的功率,随后介绍时间缩放操作,通过将t替换为at来压缩或拉伸信号,这是分析系统响应时经常使用的基本操作。",
    "emoji": "⚡",
    "refs": 4
  },
  "1.2-1 Time Shifting": {
    "en": "Time shifting is the foundation of how signals move through systems-delay a signal by replacing t with (t-T), and you've got the core operation behind every filter and communication system. This section breaks down why positive delays shift right and negative delays shift left, with visual examples that make the pattern stick for exam problems.",
    "zh": "时间移位是信号在系统中运动的基础--通过用(t-T)替换t来延迟信号,这是每个滤波器和通信系统背后的核心操作。本节解释为什么正延迟向右移动,负延迟向左移动,并通过可视化示例帮助你掌握考试中的相关问题。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.2-1": {
    "en": "Time shifting is the foundation of how signals move through systems-delay a signal by replacing t with (t-T), and you've got the core operation behind every filter and communication system. This section breaks down why positive delays shift right and negative delays shift left, with visual examples that make the pattern stick for exam problems.",
    "zh": "时间移位是信号在系统中运动的基础--通过用(t-T)替换t来延迟信号,这是每个滤波器和通信系统背后的核心操作。本节解释为什么正延迟向右移动,负延迟向左移动,并通过可视化示例帮助你掌握考试中的相关问题。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.2-2 Time Scaling": {
    "en": "Time scaling reveals how speeding up or slowing down a signal changes its mathematical form-compress by factor a and you get x(at), expand and you get x(t/a), with t=0 always staying put as your anchor. This operation is essential for understanding how systems respond to signals played at different rates, a skill you'll need for both continuous and discrete signal problems on exams.",
    "zh": "时间缩放揭示了信号加速或减速如何改变其数学形式--压缩因子a得到x(at),扩展得到x(t/a),而t=0始终保持不变作为锚点。这个操作对于理解系统如何响应以不同速率播放的信号至关重要,是连续和离散信号问题考试中必需的技能。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.2-2": {
    "en": "Time scaling reveals how speeding up or slowing down a signal changes its mathematical form-compress by factor a and you get x(at), expand and you get x(t/a), with t=0 always staying put as your anchor. This operation is essential for understanding how systems respond to signals played at different rates, a skill you'll need for both continuous and discrete signal problems on exams.",
    "zh": "时间缩放揭示了信号加速或减速如何改变其数学形式--压缩因子a得到x(at),扩展得到x(t/a),而t=0始终保持不变作为锚点。这个操作对于理解系统如何响应以不同速率播放的信号至关重要,是连续和离散信号问题考试中必需的技能。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.2-3 Time Reversal": {
    "en": "Time reversal flips a signal backward in time by replacing t with -t, creating a mirror image across the vertical axis. This simple substitution is fundamental to understanding signal transformations and appears constantly in convolution, correlation, and system analysis-making it essential for predicting how signals behave under time manipulation.",
    "zh": "时间反转通过将 t 替换为 -t 来将信号向后翻转,在垂直轴上创建镜像。这个简单的替换对于理解信号变换至关重要,在卷积、相关性和系统分析中频繁出现,是预测信号在时间操作下行为的关键。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.2-3": {
    "en": "Time reversal flips a signal backward in time by replacing t with -t, creating a mirror image across the vertical axis. This simple substitution is fundamental to understanding signal transformations and appears constantly in convolution, correlation, and system analysis-making it essential for predicting how signals behave under time manipulation.",
    "zh": "时间反转通过将 t 替换为 -t 来将信号向后翻转,在垂直轴上创建镜像。这个简单的替换对于理解信号变换至关重要,在卷积、相关性和系统分析中频繁出现,是预测信号在时间操作下行为的关键。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.2-4 Some Useful Signal Operations": {
    "en": "Time reversal, scaling, and shifting rarely happen in isolation-this section shows how to combine them systematically. You'll see why x(2t - 6) can be built two different ways, and why the *order* of operations matters for getting the right answer on exams.",
    "zh": "时间反转、缩放和平移很少单独出现--本节系统地展示如何组合它们。你将看到为什么 x(2t - 6) 可以用两种不同的方式构建,以及为什么操作的*顺序*对于在考试中得到正确答案至关重要。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.2-4": {
    "en": "Time reversal, scaling, and shifting rarely happen in isolation-this section shows how to combine them systematically. You'll see why x(2t - 6) can be built two different ways, and why the *order* of operations matters for getting the right answer on exams.",
    "zh": "时间反转、缩放和平移很少单独出现--本节系统地展示如何组合它们。你将看到为什么 x(2t - 6) 可以用两种不同的方式构建,以及为什么操作的*顺序*对于在考试中得到正确答案至关重要。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.3 Time Shifting": {
    "en": "Time shifting shows how signals move left or right on the time axis-delay a signal by replacing t with (t-1), advance it by replacing t with (t+1). This fundamental operation appears constantly in real systems like audio processing and control, where you need to account for transmission delays or predict future behavior.",
    "zh": "时间移位展示了信号如何在时间轴上左右移动--用(t-1)替换t可以延迟信号,用(t+1)替换t可以提前信号。这个基本操作在音频处理和控制系统等实际应用中无处不在,用来处理传输延迟或预测未来行为。",
    "emoji": "⏱️",
    "refs": 3
  },
  "1.3": {
    "en": "Time shifting shows how signals move left or right on the time axis-delay a signal by replacing t with (t-1), advance it by replacing t with (t+1). This fundamental operation appears constantly in real systems like audio processing and control, where you need to account for transmission delays or predict future behavior.",
    "zh": "时间移位展示了信号如何在时间轴上左右移动--用(t-1)替换t可以延迟信号,用(t+1)替换t可以提前信号。这个基本操作在音频处理和控制系统等实际应用中无处不在,用来处理传输延迟或预测未来行为。",
    "emoji": "⏱️",
    "refs": 3
  },
  "1.3-2 Classification of Signals": {
    "en": "Signals come in five distinct flavors, and mixing them up is a common exam trap. This section separates continuous-time from analog, periodic from energy signals, and deterministic from random-each classification answers a different question about how a signal behaves. Getting these distinctions right is essential for choosing the right analysis tools later.",
    "zh": "信号有五种不同的分类方式,混淆它们是常见的考试陷阱。本节区分连续时间与模拟信号、周期与能量信号、确定性与随机信号--每种分类都回答了关于信号如何表现的不同问题。正确理解这些区别对于后续选择合适的分析工具至关重要。",
    "emoji": "🏷️",
    "refs": 1
  },
  "1.3-2": {
    "en": "Signals come in five distinct flavors, and mixing them up is a common exam trap. This section separates continuous-time from analog, periodic from energy signals, and deterministic from random-each classification answers a different question about how a signal behaves. Getting these distinctions right is essential for choosing the right analysis tools later.",
    "zh": "信号有五种不同的分类方式,混淆它们是常见的考试陷阱。本节区分连续时间与模拟信号、周期与能量信号、确定性与随机信号--每种分类都回答了关于信号如何表现的不同问题。正确理解这些区别对于后续选择合适的分析工具至关重要。",
    "emoji": "🏷️",
    "refs": 1
  },
  "1.3-3 Periodic and Aperiodic Signals": {
    "en": "Periodic signals repeat themselves forever-they satisfy x(t) = x(t + T0) for some fundamental period T0-while aperiodic signals don't follow this pattern. This classification is crucial for exam problems because periodic signals unlock powerful analysis tools like Fourier series, whereas aperiodic signals require different techniques like Fourier transforms.",
    "zh": "周期信号永远重复自身--满足 x(t) = x(t + T0),其中 T0 是基本周期--而非周期信号则不遵循这种模式。这种分类对考试至关重要,因为周期信号能够使用傅里叶级数等强大的分析工具,而非周期信号则需要傅里叶变换等不同的技术。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.3-3": {
    "en": "Periodic signals repeat themselves forever-they satisfy x(t) = x(t + T0) for some fundamental period T0-while aperiodic signals don't follow this pattern. This classification is crucial for exam problems because periodic signals unlock powerful analysis tools like Fourier series, whereas aperiodic signals require different techniques like Fourier transforms.",
    "zh": "周期信号永远重复自身--满足 x(t) = x(t + T0),其中 T0 是基本周期--而非周期信号则不遵循这种模式。这种分类对考试至关重要,因为周期信号能够使用傅里叶级数等强大的分析工具,而非周期信号则需要傅里叶变换等不同的技术。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.3-5 Some Useful Signal Models": {
    "en": "Energy and power signals represent two mutually exclusive categories that classify real-world signals-most practical signals are energy signals with finite total energy, while power signals require infinite duration and constant average power. This section also separates deterministic signals (completely predictable from a mathematical formula) from random signals (described only through probability), setting the stage for the fundamental signal models like steps, impulses, and exponentials that appear throughout systems analysis.",
    "zh": "能量信号和功率信号是两个互斥的分类,用来描述实际信号--大多数实际信号是具有有限总能量的能量信号,而功率信号需要无限持续时间和恒定平均功率。本节还区分了确定性信号(可以从数学公式完全预测)和随机信号(仅通过概率描述),为系统分析中出现的基本信号模型(如阶跃、冲激和指数函数)奠定基础。",
    "emoji": "📊",
    "refs": 1
  },
  "1.3-5": {
    "en": "Energy and power signals represent two mutually exclusive categories that classify real-world signals-most practical signals are energy signals with finite total energy, while power signals require infinite duration and constant average power. This section also separates deterministic signals (completely predictable from a mathematical formula) from random signals (described only through probability), setting the stage for the fundamental signal models like steps, impulses, and exponentials that appear throughout systems analysis.",
    "zh": "能量信号和功率信号是两个互斥的分类,用来描述实际信号--大多数实际信号是具有有限总能量的能量信号,而功率信号需要无限持续时间和恒定平均功率。本节还区分了确定性信号(可以从数学公式完全预测)和随机信号(仅通过概率描述),为系统分析中出现的基本信号模型(如阶跃、冲激和指数函数)奠定基础。",
    "emoji": "📊",
    "refs": 1
  },
  "1.3-6 Signals and Systems - Problems": {
    "en": "This problem set reinforces the foundational signal classifications that appear throughout signals and systems-from distinguishing energy versus power signals to determining periodicity in composite waveforms. These exercises are essential for building intuition about how signals behave under time scaling and transformations, skills you'll need to tackle more complex system analysis.",
    "zh": "这套习题强化了信号与系统中的基础信号分类--从区分能量信号与功率信号到确定复合波形的周期性。这些练习对于建立信号在时间缩放和变换下的行为直觉至关重要,这些技能是解决更复杂系统分析问题所必需的。",
    "emoji": "📋",
    "refs": 1
  },
  "1.3-6": {
    "en": "This problem set reinforces the foundational signal classifications that appear throughout signals and systems-from distinguishing energy versus power signals to determining periodicity in composite waveforms. These exercises are essential for building intuition about how signals behave under time scaling and transformations, skills you'll need to tackle more complex system analysis.",
    "zh": "这套习题强化了信号与系统中的基础信号分类--从区分能量信号与功率信号到确定复合波形的周期性。这些练习对于建立信号在时间缩放和变换下的行为直觉至关重要,这些技能是解决更复杂系统分析问题所必需的。",
    "emoji": "📋",
    "refs": 1
  },
  "1.4-1 The Unit Step Function u(t)": {
    "en": "The unit step function u(t) is your gateway to representing causal signals-those that start at t=0 and stay silent before. This section shows how multiplying any signal by u(t) instantly makes it causal, and how combining shifted step functions lets you build piecewise signals like rectangular pulses with a single elegant expression instead of messy case definitions.",
    "zh": "单位阶跃函数u(t)是表示因果信号的关键工具--这些信号从t=0开始,之前保持为零。本节展示如何将任何信号乘以u(t)使其变为因果信号,以及如何组合移位的阶跃函数用单一表达式构建分段信号(如矩形脉冲),而不需要繁琐的分段定义。",
    "emoji": "📍",
    "refs": 1
  },
  "1.4-1": {
    "en": "The unit step function u(t) is your gateway to representing causal signals-those that start at t=0 and stay silent before. This section shows how multiplying any signal by u(t) instantly makes it causal, and how combining shifted step functions lets you build piecewise signals like rectangular pulses with a single elegant expression instead of messy case definitions.",
    "zh": "单位阶跃函数u(t)是表示因果信号的关键工具--这些信号从t=0开始,之前保持为零。本节展示如何将任何信号乘以u(t)使其变为因果信号,以及如何组合移位的阶跃函数用单一表达式构建分段信号(如矩形脉冲),而不需要繁琐的分段定义。",
    "emoji": "📍",
    "refs": 1
  },
  "1.4-2 The Unit Impulse Function δ(t)": {
    "en": "The unit impulse δ(t) is a mathematical idealization of an infinitely tall, infinitesimally narrow pulse that carries exactly one unit of area-the foundation for analyzing how systems respond to sudden shocks. This section shows why the impulse matters: it's the building block for representing any signal and the key to understanding convolution and system response in signals and systems.",
    "zh": "单位冲激函数δ(t)是一个数学理想化模型,表示无限高、无穷窄但面积为1的脉冲--是分析系统对突然冲击响应的基础。本节揭示冲激函数的重要性:它是表示任意信号的基本单元,也是理解卷积和系统响应的关键。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.4-2": {
    "en": "The unit impulse δ(t) is a mathematical idealization of an infinitely tall, infinitesimally narrow pulse that carries exactly one unit of area-the foundation for analyzing how systems respond to sudden shocks. This section shows why the impulse matters: it's the building block for representing any signal and the key to understanding convolution and system response in signals and systems.",
    "zh": "单位冲激函数δ(t)是一个数学理想化模型,表示无限高、无穷窄但面积为1的脉冲--是分析系统对突然冲击响应的基础。本节揭示冲激函数的重要性:它是表示任意信号的基本单元,也是理解卷积和系统响应的关键。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.4-3 The Exponential Function est": {
    "en": "The exponential function e^st is the foundation of signal analysis-when s is complex (σ + jω), it captures both decay/growth and oscillation in a single elegant expression. This section builds from singularity functions (impulse, step, ramp) to show why e^st appears everywhere in system responses and Fourier analysis, making it essential for solving differential equations and understanding LTI behavior.",
    "zh": "指数函数e^st是信号分析的基础--当s为复数(σ + jω)时,它在一个优雅的表达式中同时捕捉衰减/增长和振荡。本节从奇异函数(冲激、阶跃、斜坡)出发,说明为什么e^st在系统响应和傅里叶分析中无处不在,这对求解微分方程和理解LTI系统行为至关重要。",
    "emoji": "📈",
    "refs": 2
  },
  "1.4-3": {
    "en": "The exponential function e^st is the foundation of signal analysis-when s is complex (σ + jω), it captures both decay/growth and oscillation in a single elegant expression. This section builds from singularity functions (impulse, step, ramp) to show why e^st appears everywhere in system responses and Fourier analysis, making it essential for solving differential equations and understanding LTI behavior.",
    "zh": "指数函数e^st是信号分析的基础--当s为复数(σ + jω)时,它在一个优雅的表达式中同时捕捉衰减/增长和振荡。本节从奇异函数(冲激、阶跃、斜坡)出发,说明为什么e^st在系统响应和傅里叶分析中无处不在,这对求解微分方程和理解LTI系统行为至关重要。",
    "emoji": "📈",
    "refs": 2
  },
  "1.5 Complex Frequency and the Exponential Function": {
    "en": "The complex exponential e^(st) is the Swiss Army knife of signals-it unifies constants, decaying/growing exponentials, sinusoids, and damped oscillations into a single framework. By plotting complex frequency s = σ + jω on the s-plane, you gain geometric insight into system behavior that's essential for Laplace transforms and stability analysis on exams.",
    "zh": "复指数函数 e^(st) 是信号分析的万能工具--它将常数、衰减/增长指数、正弦波和阻尼振荡统一在一个框架内。通过在 s 平面上绘制复频率 s = σ + jω,你可以获得对系统行为的几何直观理解,这对拉普拉斯变换和考试中的稳定性分析至关重要。",
    "emoji": "📈",
    "refs": 5
  },
  "1.5": {
    "en": "The complex exponential e^(st) is the Swiss Army knife of signals-it unifies constants, decaying/growing exponentials, sinusoids, and damped oscillations into a single framework. By plotting complex frequency s = σ + jω on the s-plane, you gain geometric insight into system behavior that's essential for Laplace transforms and stability analysis on exams.",
    "zh": "复指数函数 e^(st) 是信号分析的万能工具--它将常数、衰减/增长指数、正弦波和阻尼振荡统一在一个框架内。通过在 s 平面上绘制复频率 s = σ + jω,你可以获得对系统行为的几何直观理解,这对拉普拉斯变换和考试中的稳定性分析至关重要。",
    "emoji": "📈",
    "refs": 5
  },
  "1.5-1 Even and Odd Functions": {
    "en": "Symmetry is a powerful shortcut in signal analysis-even and odd functions reveal hidden structure that simplifies calculations throughout the course. This section defines these mirror-image properties mathematically and shows how multiplying even and odd functions together follows predictable rules, a pattern you'll exploit repeatedly in Fourier analysis and convolution problems.",
    "zh": "对称性是信号分析中的强大捷径--偶函数和奇函数揭示了隐藏的结构,可以简化整个课程中的计算。本节从数学角度定义了这些镜像性质,并展示了偶函数和奇函数相乘如何遵循可预测的规则,这是你在傅里叶分析和卷积问题中会反复利用的模式。",
    "emoji": "🪞",
    "refs": 1
  },
  "1.5-1": {
    "en": "Symmetry is a powerful shortcut in signal analysis-even and odd functions reveal hidden structure that simplifies calculations throughout the course. This section defines these mirror-image properties mathematically and shows how multiplying even and odd functions together follows predictable rules, a pattern you'll exploit repeatedly in Fourier analysis and convolution problems.",
    "zh": "对称性是信号分析中的强大捷径--偶函数和奇函数揭示了隐藏的结构,可以简化整个课程中的计算。本节从数学角度定义了这些镜像性质,并展示了偶函数和奇函数相乘如何遵循可预测的规则,这是你在傅里叶分析和卷积问题中会反复利用的模式。",
    "emoji": "🪞",
    "refs": 1
  },
  "1.5-2 Even and Odd Components of a Signal": {
    "en": "Every signal can be split into even and odd parts-a decomposition that simplifies integration and reveals hidden symmetries. This section shows why integrals of odd functions vanish over symmetric intervals and provides the exact formulas to extract both components from any signal, with exponential decay as a concrete example.",
    "zh": "任何信号都可以分解为偶部分和奇部分--这种分解简化了积分运算并揭示了隐藏的对称性。本节说明为什么奇函数在对称区间上的积分为零,并提供从任意信号中提取两个分量的精确公式,以指数衰减为具体例子。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.5-2": {
    "en": "Every signal can be split into even and odd parts-a decomposition that simplifies integration and reveals hidden symmetries. This section shows why integrals of odd functions vanish over symmetric intervals and provides the exact formulas to extract both components from any signal, with exponential decay as a concrete example.",
    "zh": "任何信号都可以分解为偶部分和奇部分--这种分解简化了积分运算并揭示了隐藏的对称性。本节说明为什么奇函数在对称区间上的积分为零,并提供从任意信号中提取两个分量的精确公式,以指数衰减为具体例子。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.6 Systems": {
    "en": "Systems are the engines that transform signals-whether it's an RC circuit filtering noise or a digital processor computing outputs. This section extends even/odd decomposition to complex signals using conjugate symmetry, then pivots to the big picture: how systems are modeled, analyzed, and designed through terminal relationships and interconnection laws. You'll see why the black-box view matters for everything from circuit analysis to control design.",
    "zh": "系统是转换信号的引擎--无论是RC电路滤除噪声还是数字处理器计算输出。本节将偶/奇分解扩展到复信号,使用共轭对称性和共轭反对称性,然后转向全局视角:系统如何通过端子关系和互连定律进行建模、分析和设计。你将看到黑箱视图为什么对从电路分析到控制设计的一切都很重要。",
    "emoji": "⚙️",
    "refs": 2
  },
  "1.6": {
    "en": "Systems are the engines that transform signals-whether it's an RC circuit filtering noise or a digital processor computing outputs. This section extends even/odd decomposition to complex signals using conjugate symmetry, then pivots to the big picture: how systems are modeled, analyzed, and designed through terminal relationships and interconnection laws. You'll see why the black-box view matters for everything from circuit analysis to control design.",
    "zh": "系统是转换信号的引擎--无论是RC电路滤除噪声还是数字处理器计算输出。本节将偶/奇分解扩展到复信号,使用共轭对称性和共轭反对称性,然后转向全局视角:系统如何通过端子关系和互连定律进行建模、分析和设计。你将看到黑箱视图为什么对从电路分析到控制设计的一切都很重要。",
    "emoji": "⚙️",
    "refs": 2
  },
  "1.7 Classification of Systems": {
    "en": "Every linear system splits into two independent pieces: what happens because of initial conditions (zero-input response) and what happens because of the input signal (zero-state response). This decomposition, proven through the superposition principle, is why constant-coefficient differential equations perfectly describe real circuits and systems-and it's essential for predicting system behavior on exams.",
    "zh": "每个线性系统都可以分解为两个独立的部分:由初始条件引起的响应(零输入响应)和由输入信号引起的响应(零状态响应)。通过叠加原理证明的这种分解方法,解释了为什么常系数微分方程能够完美描述实际电路和系统--这对于考试中预测系统行为至关重要。",
    "emoji": "🔀",
    "refs": 9
  },
  "1.7": {
    "en": "Every linear system splits into two independent pieces: what happens because of initial conditions (zero-input response) and what happens because of the input signal (zero-state response). This decomposition, proven through the superposition principle, is why constant-coefficient differential equations perfectly describe real circuits and systems-and it's essential for predicting system behavior on exams.",
    "zh": "每个线性系统都可以分解为两个独立的部分:由初始条件引起的响应(零输入响应)和由输入信号引起的响应(零状态响应)。通过叠加原理证明的这种分解方法,解释了为什么常系数微分方程能够完美描述实际电路和系统--这对于考试中预测系统行为至关重要。",
    "emoji": "🔀",
    "refs": 9
  },
  "1.7-1 Classification of Systems": {
    "en": "Systems fall into eight distinct categories-linear or nonlinear, causal or noncausal, stable or unstable-and knowing which type you're dealing with determines everything about how you analyze it. This section focuses on linearity, the most powerful property in signals and systems: if input x1 produces output y1 and input x2 produces output y2, then x1+x2 must produce y1+y2 (superposition). Mastering system classification is essential for exam problems because it tells you which tools and theorems you can actually use.",
    "zh": "系统分为八大类别--线性或非线性、因果或非因果、稳定或不稳定--而你处理的系统类型决定了分析方法的一切。本节重点讨论线性性,这是信号与系统中最强大的性质:如果输入x1产生输出y1,输入x2产生输出y2,那么x1+x2必须产生y1+y2(叠加原理)。掌握系统分类对考试至关重要,因为它告诉你哪些工具和定理实际上可以使用。",
    "emoji": "🏗️",
    "refs": 2
  },
  "1.7-1": {
    "en": "Systems fall into eight distinct categories-linear or nonlinear, causal or noncausal, stable or unstable-and knowing which type you're dealing with determines everything about how you analyze it. This section focuses on linearity, the most powerful property in signals and systems: if input x1 produces output y1 and input x2 produces output y2, then x1+x2 must produce y1+y2 (superposition). Mastering system classification is essential for exam problems because it tells you which tools and theorems you can actually use.",
    "zh": "系统分为八大类别--线性或非线性、因果或非因果、稳定或不稳定--而你处理的系统类型决定了分析方法的一切。本节重点讨论线性性,这是信号与系统中最强大的性质:如果输入x1产生输出y1,输入x2产生输出y2,那么x1+x2必须产生y1+y2(叠加原理)。掌握系统分类对考试至关重要,因为它告诉你哪些工具和定理实际上可以使用。",
    "emoji": "🏗️",
    "refs": 2
  },
  "1.7-2 Time-Invariant and Time-Varying Systems": {
    "en": "Time-invariant systems have a special superpower: delay the input, and the output gets delayed by exactly the same amount. This section reveals why this commutativity property matters-it's the defining characteristic that separates well-behaved, predictable systems from time-varying ones that break this rule. You'll see why this distinction is crucial for analyzing real circuits and signals on exams.",
    "zh": "时不变系统有一个特殊的性质:输入延迟多少,输出就延迟多少。本节揭示了这种交换性为什么重要--它是区分行为良好、可预测系统与违反此规则的时变系统的决定性特征。你将看到为什么这种区分对于在考试中分析真实电路和信号至关重要。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.7-2": {
    "en": "Time-invariant systems have a special superpower: delay the input, and the output gets delayed by exactly the same amount. This section reveals why this commutativity property matters-it's the defining characteristic that separates well-behaved, predictable systems from time-varying ones that break this rule. You'll see why this distinction is crucial for analyzing real circuits and signals on exams.",
    "zh": "时不变系统有一个特殊的性质:输入延迟多少,输出就延迟多少。本节揭示了这种交换性为什么重要--它是区分行为良好、可预测系统与违反此规则的时变系统的决定性特征。你将看到为什么这种区分对于在考试中分析真实电路和信号至关重要。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.7-3 Classification of Systems": {
    "en": "A system's behavior can change with time or stay consistent-and this distinction fundamentally shapes how you analyze it. This section separates time-invariant systems (where delaying the input delays the output by the same amount) from time-varying ones using concrete counterexamples, then introduces whether a system responds instantaneously or depends on past values. Mastering this classification is essential because LTI systems unlock powerful analysis tools like convolution and Fourier methods.",
    "zh": "系统的行为可能随时间变化,也可能保持一致--这种区别从根本上影响你的分析方法。本节通过具体反例区分时不变系统(输入延迟会导致输出相同延迟)和时变系统,然后介绍系统是瞬时响应还是依赖过去值。掌握这种分类至关重要,因为LTI系统能够解锁卷积和傅里叶等强大的分析工具。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.7-3": {
    "en": "A system's behavior can change with time or stay consistent-and this distinction fundamentally shapes how you analyze it. This section separates time-invariant systems (where delaying the input delays the output by the same amount) from time-varying ones using concrete counterexamples, then introduces whether a system responds instantaneously or depends on past values. Mastering this classification is essential because LTI systems unlock powerful analysis tools like convolution and Fourier methods.",
    "zh": "系统的行为可能随时间变化,也可能保持一致--这种区别从根本上影响你的分析方法。本节通过具体反例区分时不变系统(输入延迟会导致输出相同延迟)和时变系统,然后介绍系统是瞬时响应还是依赖过去值。掌握这种分类至关重要,因为LTI系统能够解锁卷积和傅里叶等强大的分析工具。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.7-4 Causal and Noncausal Systems": {
    "en": "A system's ability to 'remember' past inputs separates the practical from the impossible-memoryless systems respond instantly to the current input alone, while dynamic systems carry memory of what came before. Causality adds a crucial constraint: causal systems cannot peek into the future, making them the only kind you'll find in real circuits and physical devices. This section dissects when systems have memory, when they don't, and why noncausal systems are useful in theory but forbidden in real-time applications.",
    "zh": "系统是否具有'记忆'能力决定了它的本质--无记忆系统仅对当前输入做出瞬时响应,而动态系统则保留过去输入的信息。因果性施加了一个关键约束:因果系统无法预知未来,这使其成为实际电路和物理设备中唯一可行的类型。本节剖析系统何时具有记忆、何时没有记忆,以及为什么非因果系统在理论中有用但在实时应用中被禁用。",
    "emoji": "⏰",
    "refs": 1
  },
  "1.7-4": {
    "en": "A system's ability to 'remember' past inputs separates the practical from the impossible-memoryless systems respond instantly to the current input alone, while dynamic systems carry memory of what came before. Causality adds a crucial constraint: causal systems cannot peek into the future, making them the only kind you'll find in real circuits and physical devices. This section dissects when systems have memory, when they don't, and why noncausal systems are useful in theory but forbidden in real-time applications.",
    "zh": "系统是否具有'记忆'能力决定了它的本质--无记忆系统仅对当前输入做出瞬时响应,而动态系统则保留过去输入的信息。因果性施加了一个关键约束:因果系统无法预知未来,这使其成为实际电路和物理设备中唯一可行的类型。本节剖析系统何时具有记忆、何时没有记忆,以及为什么非因果系统在理论中有用但在实时应用中被禁用。",
    "emoji": "⏰",
    "refs": 1
  },
  "1.7-5 Continuous-Time and Discrete-Time Systems": {
    "en": "Noncausal systems look into the future-an impossible feat in the real world, but a clever time delay can make them practically useful. This section contrasts the mathematical ideal of noncausal behavior with physical reality, then pivots to the fundamental distinction between continuous-time and discrete-time systems, showing how sampling bridges the two worlds.",
    "zh": "非因果系统能够预知未来--这在现实中是不可能的,但巧妙的时间延迟可以使其在实践中变得有用。本节对比了非因果行为的数学理想与物理现实,然后转向连续时间系统和离散时间系统的根本区别,展示采样如何连接这两个世界。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.7-5": {
    "en": "Noncausal systems look into the future-an impossible feat in the real world, but a clever time delay can make them practically useful. This section contrasts the mathematical ideal of noncausal behavior with physical reality, then pivots to the fundamental distinction between continuous-time and discrete-time systems, showing how sampling bridges the two worlds.",
    "zh": "非因果系统能够预知未来--这在现实中是不可能的,但巧妙的时间延迟可以使其在实践中变得有用。本节对比了非因果行为的数学理想与物理现实,然后转向连续时间系统和离散时间系统的根本区别,展示采样如何连接这两个世界。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.7-7 Invertible and Noninvertible Systems": {
    "en": "Can you always recover the input from the output? Invertible systems preserve all input information through a one-to-one mapping, while noninvertible systems (like rectifiers) lose information by collapsing multiple inputs into the same output. This distinction is crucial for understanding when equalization and signal recovery are possible-and when they're fundamentally impossible.",
    "zh": "你能否总是从输出恢复输入信号?可逆系统通过一一映射保留所有输入信息,而不可逆系统(如整流器)会将多个输入映射到同一输出,导致信息丢失。这个区分对于判断何时可以进行均衡和信号恢复至关重要。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.7-7": {
    "en": "Can you always recover the input from the output? Invertible systems preserve all input information through a one-to-one mapping, while noninvertible systems (like rectifiers) lose information by collapsing multiple inputs into the same output. This distinction is crucial for understanding when equalization and signal recovery are possible-and when they're fundamentally impossible.",
    "zh": "你能否总是从输出恢复输入信号?可逆系统通过一一映射保留所有输入信息,而不可逆系统(如整流器)会将多个输入映射到同一输出,导致信息丢失。这个区分对于判断何时可以进行均衡和信号恢复至关重要。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.7-8 Stable and Unstable Systems": {
    "en": "A system's stability determines whether bounded inputs produce bounded outputs-the foundation of reliable signal processing. This section distinguishes between invertible and non-invertible systems, then applies BIBO stability tests to classify real systems like differentiators and time-scaling operations, showing why some amplify disturbances while others remain controlled.",
    "zh": "系统的稳定性决定了有界输入是否产生有界输出--这是可靠信号处理的基础。本节区分可逆和不可逆系统,然后对微分器和时间缩放等实际系统应用BIBO稳定性测试,说明为什么某些系统会放大干扰而其他系统保持受控。",
    "emoji": "⚖️",
    "refs": 1
  },
  "1.7-8": {
    "en": "A system's stability determines whether bounded inputs produce bounded outputs-the foundation of reliable signal processing. This section distinguishes between invertible and non-invertible systems, then applies BIBO stability tests to classify real systems like differentiators and time-scaling operations, showing why some amplify disturbances while others remain controlled.",
    "zh": "系统的稳定性决定了有界输入是否产生有界输出--这是可靠信号处理的基础。本节区分可逆和不可逆系统,然后对微分器和时间缩放等实际系统应用BIBO稳定性测试,说明为什么某些系统会放大干扰而其他系统保持受控。",
    "emoji": "⚖️",
    "refs": 1
  },
  "1.8 System Model: Input-Output Description": {
    "en": "The differential operator D notation transforms messy integral equations into clean algebraic expressions-this section shows how to write input-output relationships for circuits and mechanical systems in a form that's much easier to manipulate. You'll see RC circuits and mass-spring-dashpot systems expressed using operators, a skill that directly simplifies solving for system responses on exams.",
    "zh": "微分算子D记号将复杂的积分方程转化为简洁的代数表达式--本节展示如何用算子形式写出电路和机械系统的输入-输出关系。你将看到RC电路和质量-弹簧-阻尼器系统如何用算子表示,这项技能能直接简化考试中求解系统响应的过程。",
    "emoji": "⚙️",
    "refs": 6
  },
  "1.8": {
    "en": "The differential operator D notation transforms messy integral equations into clean algebraic expressions-this section shows how to write input-output relationships for circuits and mechanical systems in a form that's much easier to manipulate. You'll see RC circuits and mass-spring-dashpot systems expressed using operators, a skill that directly simplifies solving for system responses on exams.",
    "zh": "微分算子D记号将复杂的积分方程转化为简洁的代数表达式--本节展示如何用算子形式写出电路和机械系统的输入-输出关系。你将看到RC电路和质量-弹簧-阻尼器系统如何用算子表示,这项技能能直接简化考试中求解系统响应的过程。",
    "emoji": "⚙️",
    "refs": 6
  },
  "1.8-1 System Model: Input-Output Description": {
    "en": "Every physical system needs a mathematical language-this section shows how Kirchhoff's laws and component models translate circuits into input-output equations. You'll see the RLC circuit example worked through step-by-step, establishing the foundation for all the differential equations you'll solve on exams.",
    "zh": "每个物理系统都需要一种数学语言--本节展示基尔霍夫定律和元件模型如何将电路转化为输入输出方程。你将看到RLC电路示例的逐步推导,为考试中要解决的所有微分方程奠定基础。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.8-1": {
    "en": "Every physical system needs a mathematical language-this section shows how Kirchhoff's laws and component models translate circuits into input-output equations. You'll see the RLC circuit example worked through step-by-step, establishing the foundation for all the differential equations you'll solve on exams.",
    "zh": "每个物理系统都需要一种数学语言--本节展示基尔霍夫定律和元件模型如何将电路转化为输入输出方程。你将看到RLC电路示例的逐步推导,为考试中要解决的所有微分方程奠定基础。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.8-2 Mechanical Systems": {
    "en": "Mechanical systems follow the same mathematical rules as electrical circuits-Newton's second law replaces Kirchhoff's laws, but the differential equations look identical. This section shows how masses, springs, and dampers combine to create the mechanical analogs of resistors, capacitors, and inductors, giving you a unified framework for analyzing everything from car suspensions to seismic sensors.",
    "zh": "机械系统遵循与电路相同的数学规则--牛顿第二定律取代基尔霍夫定律,但微分方程形式完全相同。本节展示质量、弹簧和阻尼器如何组合成电阻、电容和电感的机械类似物,为你提供一个统一的框架来分析从汽车悬架到地震传感器的各种系统。",
    "emoji": "🔧",
    "refs": 1
  },
  "1.8-2": {
    "en": "Mechanical systems follow the same mathematical rules as electrical circuits-Newton's second law replaces Kirchhoff's laws, but the differential equations look identical. This section shows how masses, springs, and dampers combine to create the mechanical analogs of resistors, capacitors, and inductors, giving you a unified framework for analyzing everything from car suspensions to seismic sensors.",
    "zh": "机械系统遵循与电路相同的数学规则--牛顿第二定律取代基尔霍夫定律,但微分方程形式完全相同。本节展示质量、弹簧和阻尼器如何组合成电阻、电容和电感的机械类似物,为你提供一个统一的框架来分析从汽车悬架到地震传感器的各种系统。",
    "emoji": "🔧",
    "refs": 1
  },
  "1.8-3 Electromechanical Systems": {
    "en": "DC motors bridge electricity and motion-this section shows how current input becomes rotational output through the interplay of electromagnetic torque, inertia, and friction. You'll derive the fundamental differential equation governing motor behavior, a critical model for control systems and exam problems involving real-world actuators.",
    "zh": "直流电动机将电能转化为机械运动--本节展示电流输入如何通过电磁转矩、转动惯量和摩擦力的相互作用转化为旋转输出。你将推导控制电动机行为的基本微分方程,这是控制系统和涉及实际执行器的考试问题的关键模型。",
    "emoji": "⚙️",
    "refs": 1
  },
  "1.8-3": {
    "en": "DC motors bridge electricity and motion-this section shows how current input becomes rotational output through the interplay of electromagnetic torque, inertia, and friction. You'll derive the fundamental differential equation governing motor behavior, a critical model for control systems and exam problems involving real-world actuators.",
    "zh": "直流电动机将电能转化为机械运动--本节展示电流输入如何通过电磁转矩、转动惯量和摩擦力的相互作用转化为旋转输出。你将推导控制电动机行为的基本微分方程,这是控制系统和涉及实际执行器的考试问题的关键模型。",
    "emoji": "⚙️",
    "refs": 1
  },
  "1.9 Internal and External Descriptions of a System": {
    "en": "A system's behavior can be described two completely different ways: from the outside (what you measure at the terminals) or from the inside (every signal flowing through it). This section reveals why a black-box input-output relationship can hide internal dynamics-using a capacitor circuit to show how initial conditions and hidden states matter for real systems, and introducing the critical concepts of controllability and observability.",
    "zh": "系统的行为可以用两种完全不同的方式描述:从外部观察(在端子处测量的信号)或从内部分析(系统内部的每个信号)。本节揭示了为什么黑箱输入输出关系会隐藏内部动态--通过电容电路示例说明初始条件和隐藏状态的重要性,并引入可控性和可观测性这两个关键概念。",
    "emoji": "🔍",
    "refs": 2
  },
  "1.9": {
    "en": "A system's behavior can be described two completely different ways: from the outside (what you measure at the terminals) or from the inside (every signal flowing through it). This section reveals why a black-box input-output relationship can hide internal dynamics-using a capacitor circuit to show how initial conditions and hidden states matter for real systems, and introducing the critical concepts of controllability and observability.",
    "zh": "系统的行为可以用两种完全不同的方式描述:从外部观察(在端子处测量的信号)或从内部分析(系统内部的每个信号)。本节揭示了为什么黑箱输入输出关系会隐藏内部动态--通过电容电路示例说明初始条件和隐藏状态的重要性,并引入可控性和可观测性这两个关键概念。",
    "emoji": "🔍",
    "refs": 2
  },
  "B.1 Complex Numbers": {
    "en": "Complex numbers weren't invented out of thin air-they emerged from a 16th-century puzzle where mathematicians like Cardano found themselves taking square roots of negative numbers while solving perfectly real cubic equations. This section traces how imaginary numbers went from suspicious mathematical artifacts to indispensable tools, and shows you the core operations (conjugates, magnitude, angle) that make complex numbers essential for analyzing signals and systems.",
    "zh": "复数并非凭空产生,而是从16世纪的一个谜题中诞生的--卡尔达诺等数学家在求解实系数三次方程时,意外地遇到了负数的平方根。本节追溯了虚数从可疑的数学工具演变为不可或缺的分析手段的历程,并介绍了复数的核心运算(共轭、模、幅角),这些都是信号与系统分析的基础。",
    "emoji": "🔢",
    "refs": 8
  },
  "B.1": {
    "en": "Complex numbers weren't invented out of thin air-they emerged from a 16th-century puzzle where mathematicians like Cardano found themselves taking square roots of negative numbers while solving perfectly real cubic equations. This section traces how imaginary numbers went from suspicious mathematical artifacts to indispensable tools, and shows you the core operations (conjugates, magnitude, angle) that make complex numbers essential for analyzing signals and systems.",
    "zh": "复数并非凭空产生,而是从16世纪的一个谜题中诞生的--卡尔达诺等数学家在求解实系数三次方程时,意外地遇到了负数的平方根。本节追溯了虚数从可疑的数学工具演变为不可或缺的分析手段的历程,并介绍了复数的核心运算(共轭、模、幅角),这些都是信号与系统分析的基础。",
    "emoji": "🔢",
    "refs": 8
  },
  "B.1-1 Complex Numbers - A Historical Note": {
    "en": "Complex numbers aren't actually mysterious-they're just unfamiliar. This historical note traces how our number system evolved from simple counting to fractions to the complex plane, showing that imaginary numbers are as natural as the innovations that came before them. You'll see why engineers and scientists rely on complex numbers for signals and systems, making this foundation essential for everything that follows.",
    "zh": "复数其实并不神秘,只是我们还不够熟悉。这个历史注记追溯了我们的数字系统如何从简单计数演进到分数,再到复平面,说明虚数和之前的数学创新一样自然。你将看到为什么工程师和科学家在信号与系统中依赖复数,这个基础对后续所有内容都至关重要。",
    "emoji": "📜",
    "refs": 1
  },
  "B.1-1": {
    "en": "Complex numbers aren't actually mysterious-they're just unfamiliar. This historical note traces how our number system evolved from simple counting to fractions to the complex plane, showing that imaginary numbers are as natural as the innovations that came before them. You'll see why engineers and scientists rely on complex numbers for signals and systems, making this foundation essential for everything that follows.",
    "zh": "复数其实并不神秘,只是我们还不够熟悉。这个历史注记追溯了我们的数字系统如何从简单计数演进到分数,再到复平面,说明虚数和之前的数学创新一样自然。你将看到为什么工程师和科学家在信号与系统中依赖复数,这个基础对后续所有内容都至关重要。",
    "emoji": "📜",
    "refs": 1
  },
  "B.1-2 Algebra of Complex Numbers": {
    "en": "Complex numbers live on a 2D plane where the real and imaginary parts become coordinates-and Euler's formula is the bridge that lets you switch between rectangular form (a + jb) and polar form (re^(jθ)) effortlessly. This algebraic foundation is essential for analyzing AC circuits and frequency-domain signals, where complex exponentials replace messy trigonometry.",
    "zh": "复数存在于二维平面上,实部和虚部成为坐标--欧拉公式是让你在矩形形式(a + jb)和极坐标形式(re^(jθ))之间轻松切换的桥梁。这个代数基础对于分析交流电路和频域信号至关重要,其中复指数替代了复杂的三角函数。",
    "emoji": "📐",
    "refs": 1
  },
  "B.1-2": {
    "en": "Complex numbers live on a 2D plane where the real and imaginary parts become coordinates-and Euler's formula is the bridge that lets you switch between rectangular form (a + jb) and polar form (re^(jθ)) effortlessly. This algebraic foundation is essential for analyzing AC circuits and frequency-domain signals, where complex exponentials replace messy trigonometry.",
    "zh": "复数存在于二维平面上,实部和虚部成为坐标--欧拉公式是让你在矩形形式(a + jb)和极坐标形式(re^(jθ))之间轻松切换的桥梁。这个代数基础对于分析交流电路和频域信号至关重要,其中复指数替代了复杂的三角函数。",
    "emoji": "📐",
    "refs": 1
  },
  "B.2 Sinusoids": {
    "en": "Sinusoids are the building blocks of signal analysis-every periodic waveform you'll encounter starts here. This section breaks down amplitude, frequency, phase, and the crucial relationship between hertz and radians, then shows you how phase shifts translate directly into time delays, making it easy to sketch and manipulate these signals for circuit and system problems.",
    "zh": "正弦信号是信号分析的基础--你遇到的每个周期波形都从这里开始。本节分解了幅度、频率、相位的含义,以及赫兹与弧度之间的关键关系,然后展示相位移动如何直接转化为时间延迟,使你能轻松绘制和操纵这些信号来解决电路和系统问题。",
    "emoji": "〰️",
    "refs": 3
  },
  "B.2": {
    "en": "Sinusoids are the building blocks of signal analysis-every periodic waveform you'll encounter starts here. This section breaks down amplitude, frequency, phase, and the crucial relationship between hertz and radians, then shows you how phase shifts translate directly into time delays, making it easy to sketch and manipulate these signals for circuit and system problems.",
    "zh": "正弦信号是信号分析的基础--你遇到的每个周期波形都从这里开始。本节分解了幅度、频率、相位的含义,以及赫兹与弧度之间的关键关系,然后展示相位移动如何直接转化为时间延迟,使你能轻松绘制和操纵这些信号来解决电路和系统问题。",
    "emoji": "〰️",
    "refs": 3
  },
  "B.2-1 Addition of Sinusoids": {
    "en": "Two sinusoids at the same frequency always combine into a single sinusoid-a result that's fundamental to AC circuit analysis and signal processing. This section derives the exact formulas for the resultant amplitude and phase, then shows how phasors (rotating vectors in the complex plane) make this geometric addition intuitive and visual.",
    "zh": "同频率的两个正弦波总是合成为一个正弦波--这是交流电路分析和信号处理的基础。本节推导合成波的幅度和相位公式,然后用相量(复平面中的旋转向量)直观地展示这种几何加法。",
    "emoji": "➕",
    "refs": 1
  },
  "B.2-1": {
    "en": "Two sinusoids at the same frequency always combine into a single sinusoid-a result that's fundamental to AC circuit analysis and signal processing. This section derives the exact formulas for the resultant amplitude and phase, then shows how phasors (rotating vectors in the complex plane) make this geometric addition intuitive and visual.",
    "zh": "同频率的两个正弦波总是合成为一个正弦波--这是交流电路分析和信号处理的基础。本节推导合成波的幅度和相位公式,然后用相量(复平面中的旋转向量)直观地展示这种几何加法。",
    "emoji": "➕",
    "refs": 1
  },
  "B.3 Sketching Signals": {
    "en": "The time constant is your shortcut for sketching exponential decay-it tells you exactly when a signal drops to 37% of its starting value. This section shows how to use this single number to quickly sketch any decaying exponential without a calculator, making exam sketches fast and accurate.",
    "zh": "时间常数是绘制指数衰减的快捷方法--它告诉你信号何时衰减到初始值的37%。本节展示如何使用这个单一数字快速绘制任何衰减指数,无需计算器,使考试中的草图绘制快速准确。",
    "emoji": "📉",
    "refs": 1
  },
  "B.3": {
    "en": "The time constant is your shortcut for sketching exponential decay-it tells you exactly when a signal drops to 37% of its starting value. This section shows how to use this single number to quickly sketch any decaying exponential without a calculator, making exam sketches fast and accurate.",
    "zh": "时间常数是绘制指数衰减的快捷方法--它告诉你信号何时衰减到初始值的37%。本节展示如何使用这个单一数字快速绘制任何衰减指数,无需计算器,使考试中的草图绘制快速准确。",
    "emoji": "📉",
    "refs": 1
  },
  "B.3-1 Monotonic Exponentials": {
    "en": "Monotonic exponentials form the backbone of real-world signal decay and growth-think of how a battery discharges or how vibrations fade in a damped system. This section connects sinusoids to exponentials through Euler's formula, showing how complex exponentials elegantly unify sines and cosines, and teaches you to sketch these fundamental building blocks that appear in every transient response you'll analyze.",
    "zh": "单调指数信号是现实世界中信号衰减和增长的基础--想象电池放电或阻尼系统中振动衰减的过程。本节通过欧拉公式将正弦波与指数联系起来,展示复指数如何优雅地统一正弦和余弦,并教你绘制这些基本构件,它们出现在你将分析的每个瞬态响应中。",
    "emoji": "📉",
    "refs": 1
  },
  "B.3-1": {
    "en": "Monotonic exponentials form the backbone of real-world signal decay and growth-think of how a battery discharges or how vibrations fade in a damped system. This section connects sinusoids to exponentials through Euler's formula, showing how complex exponentials elegantly unify sines and cosines, and teaches you to sketch these fundamental building blocks that appear in every transient response you'll analyze.",
    "zh": "单调指数信号是现实世界中信号衰减和增长的基础--想象电池放电或阻尼系统中振动衰减的过程。本节通过欧拉公式将正弦波与指数联系起来,展示复指数如何优雅地统一正弦和余弦,并教你绘制这些基本构件,它们出现在你将分析的每个瞬态响应中。",
    "emoji": "📉",
    "refs": 1
  },
  "B.3-2 The Exponentially Varying Sinusoid": {
    "en": "Exponentially varying sinusoids combine two behaviors: a sinusoid that oscillates while an exponential envelope squeezes its amplitude to zero. This section shows how to sketch these signals by treating the decaying exponential and oscillation separately, then multiplying them together-a technique that appears constantly in transient response analysis and damped systems.",
    "zh": "指数衰减的正弦信号结合了两种行为:正弦振荡同时被指数包络压缩其幅度至零。本节展示如何通过分别处理衰减指数和振荡,然后将它们相乘来绘制这些信号--这种技术在瞬态响应分析和阻尼系统中频繁出现。",
    "emoji": "📉",
    "refs": 1
  },
  "B.3-2": {
    "en": "Exponentially varying sinusoids combine two behaviors: a sinusoid that oscillates while an exponential envelope squeezes its amplitude to zero. This section shows how to sketch these signals by treating the decaying exponential and oscillation separately, then multiplying them together-a technique that appears constantly in transient response analysis and damped systems.",
    "zh": "指数衰减的正弦信号结合了两种行为:正弦振荡同时被指数包络压缩其幅度至零。本节展示如何通过分别处理衰减指数和振荡,然后将它们相乘来绘制这些信号--这种技术在瞬态响应分析和阻尼系统中频繁出现。",
    "emoji": "📉",
    "refs": 1
  },
  "B.4 Cramer's Rule": {
    "en": "Cramer's Rule provides a determinant-based formula for solving systems of linear equations-a technique you'll use repeatedly when analyzing circuit equations and system responses. This section shows how to express solutions directly using determinants, plus visualizes how exponential envelopes modulate oscillating signals, a pattern central to damped system behavior.",
    "zh": "克拉默法则通过行列式公式求解线性方程组--这是分析电路方程和系统响应时反复使用的技术。本节展示如何用行列式直接表示解,并可视化指数包络如何调制振荡信号,这是阻尼系统行为的核心模式。",
    "emoji": "🔢",
    "refs": 1
  },
  "B.4": {
    "en": "Cramer's Rule provides a determinant-based formula for solving systems of linear equations-a technique you'll use repeatedly when analyzing circuit equations and system responses. This section shows how to express solutions directly using determinants, plus visualizes how exponential envelopes modulate oscillating signals, a pattern central to damped system behavior.",
    "zh": "克拉默法则通过行列式公式求解线性方程组--这是分析电路方程和系统响应时反复使用的技术。本节展示如何用行列式直接表示解,并可视化指数包络如何调制振荡信号,这是阻尼系统行为的核心模式。",
    "emoji": "🔢",
    "refs": 1
  },
  "B.5 Partial Fraction Expansion": {
    "en": "Partial fraction expansion breaks down complex rational functions into simpler pieces-a crucial technique for inverse Laplace transforms and system analysis. This section distinguishes between proper and improper rational functions, shows how polynomial long division handles the improper case, and reveals the Heaviside method for extracting residues from complex-conjugate pole pairs.",
    "zh": "部分分式展开将复杂的有理函数分解为更简单的部分--这是逆拉普拉斯变换和系统分析的关键技术。本节区分真分式和假分式,展示多项式长除法如何处理假分式情况,并揭示Heaviside方法从复共轭极点对中提取留数的过程。",
    "emoji": "🔀",
    "refs": 3
  },
  "B.5": {
    "en": "Partial fraction expansion breaks down complex rational functions into simpler pieces-a crucial technique for inverse Laplace transforms and system analysis. This section distinguishes between proper and improper rational functions, shows how polynomial long division handles the improper case, and reveals the Heaviside method for extracting residues from complex-conjugate pole pairs.",
    "zh": "部分分式展开将复杂的有理函数分解为更简单的部分--这是逆拉普拉斯变换和系统分析的关键技术。本节区分真分式和假分式,展示多项式长除法如何处理假分式情况,并揭示Heaviside方法从复共轭极点对中提取留数的过程。",
    "emoji": "🔀",
    "refs": 3
  },
  "B.5-1 Method of Clearing Fractions": {
    "en": "Partial fraction expansion breaks complex rational functions into simpler pieces-and the method of clearing fractions is your most direct tool for finding them. By multiplying through by the common denominator and matching coefficients, you'll systematically solve for each unknown constant, a technique that appears constantly on exams whenever you need to invert Laplace transforms or decompose system responses.",
    "zh": "部分分式展开将复杂的有理函数分解为更简单的部分--清分母法是求解这些部分的最直接工具。通过乘以公分母并匹配同次幂系数,你可以系统地求解每个未知常数,这种技术在反演拉普拉斯变换或分解系统响应时频繁出现。",
    "emoji": "🔀",
    "refs": 1
  },
  "B.5-1": {
    "en": "Partial fraction expansion breaks complex rational functions into simpler pieces-and the method of clearing fractions is your most direct tool for finding them. By multiplying through by the common denominator and matching coefficients, you'll systematically solve for each unknown constant, a technique that appears constantly on exams whenever you need to invert Laplace transforms or decompose system responses.",
    "zh": "部分分式展开将复杂的有理函数分解为更简单的部分--清分母法是求解这些部分的最直接工具。通过乘以公分母并匹配同次幂系数,你可以系统地求解每个未知常数,这种技术在反演拉普拉斯变换或分解系统响应时频繁出现。",
    "emoji": "🔀",
    "refs": 1
  },
  "B.5-2 The Heaviside \"Cover-Up\" Method": {
    "en": "The Heaviside cover-up method is a shortcut that replaces tedious algebra with a single evaluation trick-multiply by the factor you want to isolate, then plug in its root. This technique is essential for quickly decomposing rational functions into partial fractions, especially when all denominator factors are distinct, and it's a favorite on exams because it's fast and mechanical once you see the pattern.",
    "zh": "Heaviside掩盖法是一个巧妙的快速技巧,用单次代入替代繁琐的代数运算--将两边同乘要分离的因子,然后代入其根值即可。这种方法对于快速分解有理函数的部分分式至关重要,特别是当分母的所有因子都不重复时,它在考试中很受欢迎,因为一旦掌握规律就能机械地快速求解。",
    "emoji": "🎯",
    "refs": 1
  },
  "B.5-2": {
    "en": "The Heaviside cover-up method is a shortcut that replaces tedious algebra with a single evaluation trick-multiply by the factor you want to isolate, then plug in its root. This technique is essential for quickly decomposing rational functions into partial fractions, especially when all denominator factors are distinct, and it's a favorite on exams because it's fast and mechanical once you see the pattern.",
    "zh": "Heaviside掩盖法是一个巧妙的快速技巧,用单次代入替代繁琐的代数运算--将两边同乘要分离的因子,然后代入其根值即可。这种方法对于快速分解有理函数的部分分式至关重要,特别是当分母的所有因子都不重复时,它在考试中很受欢迎,因为一旦掌握规律就能机械地快速求解。",
    "emoji": "🎯",
    "refs": 1
  },
  "B.5-3 Repeated Factors of Q(x)": {
    "en": "Repeated factors in the denominator require a different partial fraction strategy than simple poles-you can't just cover up and substitute. This section extends the Heaviside cover-up method using differentiation to extract coefficients for repeated roots, a critical technique when the same factor appears multiple times in Q(x).",
    "zh": "分母中的重复因子需要与简单极点不同的部分分式策略--你不能只是遮住并代入。本节通过微分扩展Heaviside覆盖法来提取重复根的系数,这是当同一因子在Q(x)中出现多次时的关键技术。",
    "emoji": "🔄",
    "refs": 1
  },
  "B.5-3": {
    "en": "Repeated factors in the denominator require a different partial fraction strategy than simple poles-you can't just cover up and substitute. This section extends the Heaviside cover-up method using differentiation to extract coefficients for repeated roots, a critical technique when the same factor appears multiple times in Q(x).",
    "zh": "分母中的重复因子需要与简单极点不同的部分分式策略--你不能只是遮住并代入。本节通过微分扩展Heaviside覆盖法来提取重复根的系数,这是当同一因子在Q(x)中出现多次时的关键技术。",
    "emoji": "🔄",
    "refs": 1
  },
  "B.5-4 Partial Fraction Expansion with Repeated Factors": {
    "en": "Repeated factors in the denominator require a different strategy than simple poles-the Heaviside cover-up method alone isn't enough. This section shows how successive differentiation unlocks the coefficients for repeated roots, turning a seemingly complex algebraic puzzle into a systematic procedure that works every time.",
    "zh": "分母中的重根需要不同于简单极点的策略--单独使用Heaviside覆盖法是不够的。本节展示了如何通过逐次求导来解锁重根的系数,将看似复杂的代数问题转化为每次都有效的系统程序。",
    "emoji": "🔄",
    "refs": 1
  },
  "B.5-4": {
    "en": "Repeated factors in the denominator require a different strategy than simple poles-the Heaviside cover-up method alone isn't enough. This section shows how successive differentiation unlocks the coefficients for repeated roots, turning a seemingly complex algebraic puzzle into a systematic procedure that works every time.",
    "zh": "分母中的重根需要不同于简单极点的策略--单独使用Heaviside覆盖法是不够的。本节展示了如何通过逐次求导来解锁重根的系数,将看似复杂的代数问题转化为每次都有效的系统程序。",
    "emoji": "🔄",
    "refs": 1
  },
  "B.5-5 Improper F(x) with m = n": {
    "en": "When the numerator and denominator of a rational function have the same degree, you can't skip the partial fraction setup-there's an extra constant term hiding in the expansion. This section shows why polynomial long division is your first move, then how to find all coefficients using the same techniques as proper fractions.",
    "zh": "当有理函数的分子和分母次数相同时,不能跳过部分分式的设置--展开式中隐藏着一个额外的常数项。本节说明为什么多项式长除法是第一步,然后如何使用与真分式相同的技术来求所有系数。",
    "emoji": "⚖️",
    "refs": 1
  },
  "B.5-5": {
    "en": "When the numerator and denominator of a rational function have the same degree, you can't skip the partial fraction setup-there's an extra constant term hiding in the expansion. This section shows why polynomial long division is your first move, then how to find all coefficients using the same techniques as proper fractions.",
    "zh": "当有理函数的分子和分母次数相同时,不能跳过部分分式的设置--展开式中隐藏着一个额外的常数项。本节说明为什么多项式长除法是第一步,然后如何使用与真分式相同的技术来求所有系数。",
    "emoji": "⚖️",
    "refs": 1
  },
  "B.5-6 Modified Partial Fractions": {
    "en": "Partial fraction expansion gets trickier when you have repeated roots-this is where modified partial fractions save the day. By dividing by x first, expanding, then multiplying back, you unlock a clean form (kx/(x-λi)r) that's essential for inverse z-transforms and handling complex rational functions without messy algebra.",
    "zh": "当遇到重根时,标准部分分式展开会变得复杂--这正是改进型部分分式大显身手的地方。通过先除以x、展开、再乘回x的技巧,你可以得到简洁的形式(kx/(x-λi)r),这对反z变换和处理复杂有理函数至关重要,能避免繁琐的代数运算。",
    "emoji": "🔄",
    "refs": 1
  },
  "B.5-6": {
    "en": "Partial fraction expansion gets trickier when you have repeated roots-this is where modified partial fractions save the day. By dividing by x first, expanding, then multiplying back, you unlock a clean form (kx/(x-λi)r) that's essential for inverse z-transforms and handling complex rational functions without messy algebra.",
    "zh": "当遇到重根时,标准部分分式展开会变得复杂--这正是改进型部分分式大显身手的地方。通过先除以x、展开、再乘回x的技巧,你可以得到简洁的形式(kx/(x-λi)r),这对反z变换和处理复杂有理函数至关重要,能避免繁琐的代数运算。",
    "emoji": "🔄",
    "refs": 1
  },
  "B.6 Vectors and Matrices": {
    "en": "Matrices are the language of linear transformations-they encode how vectors get rotated, scaled, and combined. This section builds from n-dimensional vectors to matrix operations, showing how simultaneous linear equations become elegant matrix multiplications and why the conformability rules matter for your calculations.",
    "zh": "矩阵是线性变换的语言--它们编码向量如何被旋转、缩放和组合。本节从n维向量构建到矩阵运算,展示联立线性方程如何转化为优雅的矩阵乘法,以及为什么相容性规则对你的计算至关重要。",
    "emoji": "🔲",
    "refs": 3
  },
  "B.6": {
    "en": "Matrices are the language of linear transformations-they encode how vectors get rotated, scaled, and combined. This section builds from n-dimensional vectors to matrix operations, showing how simultaneous linear equations become elegant matrix multiplications and why the conformability rules matter for your calculations.",
    "zh": "矩阵是线性变换的语言--它们编码向量如何被旋转、缩放和组合。本节从n维向量构建到矩阵运算,展示联立线性方程如何转化为优雅的矩阵乘法,以及为什么相容性规则对你的计算至关重要。",
    "emoji": "🔲",
    "refs": 3
  },
  "B.6-1 Some Definitions and Properties": {
    "en": "Matrices come in several standard forms-diagonal, identity, zero, and symmetric-each with specific properties that simplify calculations and appear constantly in system analysis. This section establishes the notation and definitions you'll need to work with matrices fluently, including the transpose operation that swaps rows and columns.",
    "zh": "矩阵有多种标准形式--对角矩阵、单位矩阵、零矩阵和对称矩阵--每种都有特定的性质,能简化计算并在系统分析中频繁出现。本节建立了你需要熟练使用矩阵的记号和定义,包括交换行列的转置运算。",
    "emoji": "🔲",
    "refs": 1
  },
  "B.6-1": {
    "en": "Matrices come in several standard forms-diagonal, identity, zero, and symmetric-each with specific properties that simplify calculations and appear constantly in system analysis. This section establishes the notation and definitions you'll need to work with matrices fluently, including the transpose operation that swaps rows and columns.",
    "zh": "矩阵有多种标准形式--对角矩阵、单位矩阵、零矩阵和对称矩阵--每种都有特定的性质,能简化计算并在系统分析中频繁出现。本节建立了你需要熟练使用矩阵的记号和定义,包括交换行列的转置运算。",
    "emoji": "🔲",
    "refs": 1
  },
  "B.6-2 Matrix Algebra": {
    "en": "Matrix algebra forms the computational backbone for analyzing multi-input, multi-output systems and solving coupled differential equations. This section covers the essential operations-addition, scalar multiplication, and the foundations of matrix multiplication-that you'll use constantly when working with state-space representations and system matrices on exams.",
    "zh": "矩阵代数是分析多输入多输出系统和求解耦合微分方程的计算基础。本节介绍基本运算--加法、标量乘法和矩阵乘法的基础--这些是你在考试中处理状态空间表示和系统矩阵时必须掌握的工具。",
    "emoji": "📊",
    "refs": 1
  },
  "B.6-2": {
    "en": "Matrix algebra forms the computational backbone for analyzing multi-input, multi-output systems and solving coupled differential equations. This section covers the essential operations-addition, scalar multiplication, and the foundations of matrix multiplication-that you'll use constantly when working with state-space representations and system matrices on exams.",
    "zh": "矩阵代数是分析多输入多输出系统和求解耦合微分方程的计算基础。本节介绍基本运算--加法、标量乘法和矩阵乘法的基础--这些是你在考试中处理状态空间表示和系统矩阵时必须掌握的工具。",
    "emoji": "📊",
    "refs": 1
  },
  "B.6-5 Background - Problems": {
    "en": "This problem set reinforces two essential mathematical tools: decomposing rational functions into partial fractions and using matrix methods to solve linear systems. You'll practice both hand calculations and systematic approaches that directly apply to finding signal constants, analyzing system responses, and solving the kinds of equations that appear throughout signals and systems coursework.",
    "zh": "本题集强化了两个关键数学工具:将有理函数分解为部分分式,以及使用矩阵方法求解线性方程组。你将练习手工计算和系统方法,这些直接应用于求信号常数、分析系统响应,以及求解信号与系统课程中常见的方程。",
    "emoji": "📋",
    "refs": 1
  },
  "B.6-5": {
    "en": "This problem set reinforces two essential mathematical tools: decomposing rational functions into partial fractions and using matrix methods to solve linear systems. You'll practice both hand calculations and systematic approaches that directly apply to finding signal constants, analyzing system responses, and solving the kinds of equations that appear throughout signals and systems coursework.",
    "zh": "本题集强化了两个关键数学工具:将有理函数分解为部分分式,以及使用矩阵方法求解线性方程组。你将练习手工计算和系统方法,这些直接应用于求信号常数、分析系统响应,以及求解信号与系统课程中常见的方程。",
    "emoji": "📋",
    "refs": 1
  },
  "B.7 MATLAB: Elementary Operations": {
    "en": "MATLAB's plotting and matrix tools turn abstract math into visual insights and computational solutions. This section shows how to annotate plots with labels and titles, visualize complex roots on the unit circle, and solve systems of linear equations using matrix operations-essential skills for verifying your signal processing calculations by hand and in code.",
    "zh": "MATLAB的绘图和矩阵工具将抽象数学转化为可视化洞察和计算解决方案。本节展示如何用标签和标题注释图表、在单位圆上可视化复数根,以及使用矩阵运算求解线性方程组--这些是验证信号处理计算的必备技能。",
    "emoji": "📊",
    "refs": 3
  },
  "B.7": {
    "en": "MATLAB's plotting and matrix tools turn abstract math into visual insights and computational solutions. This section shows how to annotate plots with labels and titles, visualize complex roots on the unit circle, and solve systems of linear equations using matrix operations-essential skills for verifying your signal processing calculations by hand and in code.",
    "zh": "MATLAB的绘图和矩阵工具将抽象数学转化为可视化洞察和计算解决方案。本节展示如何用标签和标题注释图表、在单位圆上可视化复数根,以及使用矩阵运算求解线性方程组--这些是验证信号处理计算的必备技能。",
    "emoji": "📊",
    "refs": 3
  },
  "B.7-1 MATLAB Overview": {
    "en": "MATLAB's workspace is where all your variables live-and knowing how to navigate it with commands like whos, clear, and save is essential for efficient problem-solving in signals and systems. This section shows you how to organize, inspect, and persist your work across sessions, turning MATLAB from a calculator into a reproducible computational environment.",
    "zh": "MATLAB的工作区是所有变量的存储地--掌握whos、clear和save等命令对于在信号与系统中高效求解至关重要。本节介绍如何组织、检查和跨会话保存你的工作,将MATLAB从简单计算器转变为可重复的计算环境。",
    "emoji": "💾",
    "refs": 1
  },
  "B.7-1": {
    "en": "MATLAB's workspace is where all your variables live-and knowing how to navigate it with commands like whos, clear, and save is essential for efficient problem-solving in signals and systems. This section shows you how to organize, inspect, and persist your work across sessions, turning MATLAB from a calculator into a reproducible computational environment.",
    "zh": "MATLAB的工作区是所有变量的存储地--掌握whos、clear和save等命令对于在信号与系统中高效求解至关重要。本节介绍如何组织、检查和跨会话保存你的工作,将MATLAB从简单计算器转变为可重复的计算环境。",
    "emoji": "💾",
    "refs": 1
  },
  "B.7-2 Calculator Operations": {
    "en": "MATLAB functions as a powerful calculator, but first you need to know how to ask for help-this section shows you the help commands and navigation tools that let you quickly find what you need. You'll also master scalar arithmetic and complex number operations using MATLAB's built-in constants, skills that form the foundation for every computation you'll run.",
    "zh": "MATLAB 可以作为强大的计算器,但首先你需要知道如何寻求帮助--本节介绍帮助命令和导航工具,让你快速找到所需信息。你还将掌握标量运算和复数操作,这些基础技能是你运行任何计算的基础。",
    "emoji": "🧮",
    "refs": 1
  },
  "B.7-2": {
    "en": "MATLAB functions as a powerful calculator, but first you need to know how to ask for help-this section shows you the help commands and navigation tools that let you quickly find what you need. You'll also master scalar arithmetic and complex number operations using MATLAB's built-in constants, skills that form the foundation for every computation you'll run.",
    "zh": "MATLAB 可以作为强大的计算器,但首先你需要知道如何寻求帮助--本节介绍帮助命令和导航工具,让你快速找到所需信息。你还将掌握标量运算和复数操作,这些基础技能是你运行任何计算的基础。",
    "emoji": "🧮",
    "refs": 1
  },
  "B.7-3 Vector Operations": {
    "en": "MATLAB's colon notation (a:b:c) transforms tedious manual calculations into one-line vector operations-perfect for generating sequences of roots, powers, and complex logarithms all at once. This section shows how Euler's formula and vectorized functions let you compute cube roots of -1 or find all 100th roots simultaneously, a technique that appears constantly in signal processing when analyzing poles and zeros.",
    "zh": "MATLAB的冒号记号(a:b:c)将繁琐的手工计算转化为一行向量操作--非常适合一次性生成根、幂次和复对数的序列。本节展示欧拉公式和向量化函数如何让你同时计算-1的立方根或找到所有100次根,这种技术在分析极点和零点时频繁出现在信号处理中。",
    "emoji": "🔢",
    "refs": 1
  },
  "B.7-3": {
    "en": "MATLAB's colon notation (a:b:c) transforms tedious manual calculations into one-line vector operations-perfect for generating sequences of roots, powers, and complex logarithms all at once. This section shows how Euler's formula and vectorized functions let you compute cube roots of -1 or find all 100th roots simultaneously, a technique that appears constantly in signal processing when analyzing poles and zeros.",
    "zh": "MATLAB的冒号记号(a:b:c)将繁琐的手工计算转化为一行向量操作--非常适合一次性生成根、幂次和复对数的序列。本节展示欧拉公式和向量化函数如何让你同时计算-1的立方根或找到所有100次根,这种技术在分析极点和零点时频繁出现在信号处理中。",
    "emoji": "🔢",
    "refs": 1
  },
  "B.7-4 Simple Plotting": {
    "en": "MATLAB's plot command turns vectors into graphs, but there's a critical gotcha: vector indices start at 1, not 0, and they don't automatically align with your actual time or frequency values. This section shows how to create a 10 Hz sinusoid, evaluate it at the right points, and visualize it correctly-essential skills for any signal you'll need to display in homework or exams.",
    "zh": "MATLAB的plot命令能将向量转化为图形,但有一个关键陷阱:向量索引从1开始而非0,且不会自动对应你的实际时间或频率值。本节展示如何创建10 Hz正弦波、在正确的点进行求值,以及正确地将其可视化--这些是你在作业或考试中显示任何信号所需的基本技能。",
    "emoji": "📈",
    "refs": 1
  },
  "B.7-4": {
    "en": "MATLAB's plot command turns vectors into graphs, but there's a critical gotcha: vector indices start at 1, not 0, and they don't automatically align with your actual time or frequency values. This section shows how to create a 10 Hz sinusoid, evaluate it at the right points, and visualize it correctly-essential skills for any signal you'll need to display in homework or exams.",
    "zh": "MATLAB的plot命令能将向量转化为图形,但有一个关键陷阱:向量索引从1开始而非0,且不会自动对应你的实际时间或频率值。本节展示如何创建10 Hz正弦波、在正确的点进行求值,以及正确地将其可视化--这些是你在作业或考试中显示任何信号所需的基本技能。",
    "emoji": "📈",
    "refs": 1
  },
  "B.7-5 Element-by-Element Operations": {
    "en": "Element-by-element operations are what make MATLAB practical for signal processing-they let you multiply, divide, and exponentiate vectors term-by-term without reshaping matrices. This section shows you when to use .*, ./, and .^ instead of their matrix cousins, and how to layer multiple signals (like a sinusoid inside an exponential envelope) on a single plot with proper labels and legends.",
    "zh": "逐元素运算是MATLAB在信号处理中的实用工具--它们让你可以对向量逐项进行乘法、除法和幂运算,而无需重塑矩阵。本节展示何时使用 .*、./ 和 .^ 而不是矩阵运算,以及如何在单个图形上叠加多个信号(如指数包络内的正弦波),并添加适当的标签和图例。",
    "emoji": "⊙",
    "refs": 1
  },
  "B.7-5": {
    "en": "Element-by-element operations are what make MATLAB practical for signal processing-they let you multiply, divide, and exponentiate vectors term-by-term without reshaping matrices. This section shows you when to use .*, ./, and .^ instead of their matrix cousins, and how to layer multiple signals (like a sinusoid inside an exponential envelope) on a single plot with proper labels and legends.",
    "zh": "逐元素运算是MATLAB在信号处理中的实用工具--它们让你可以对向量逐项进行乘法、除法和幂运算,而无需重塑矩阵。本节展示何时使用 .*、./ 和 .^ 而不是矩阵运算,以及如何在单个图形上叠加多个信号(如指数包络内的正弦波),并添加适当的标签和图例。",
    "emoji": "⊙",
    "refs": 1
  },
  "B.7-6 Matrix Operations": {
    "en": "MATLAB treats matrices as its native language, and this section shows you how to build them efficiently using built-in functions like ones(), zeros(), and eye(). You'll see how square bracket notation with spaces or commas creates row and column vectors, plus how to visualize multiple signals side-by-side-essential skills for any computational problem in signals and systems.",
    "zh": "MATLAB 以矩阵作为其原生语言,本节展示如何使用 ones()、zeros() 和 eye() 等内置函数高效地构建矩阵。你将学会用方括号记号(用空格或逗号分隔元素)创建行向量和列向量,以及如何并排可视化多个信号--这些都是信号与系统计算问题中的必备技能。",
    "emoji": "🔲",
    "refs": 1
  },
  "B.7-6": {
    "en": "MATLAB treats matrices as its native language, and this section shows you how to build them efficiently using built-in functions like ones(), zeros(), and eye(). You'll see how square bracket notation with spaces or commas creates row and column vectors, plus how to visualize multiple signals side-by-side-essential skills for any computational problem in signals and systems.",
    "zh": "MATLAB 以矩阵作为其原生语言,本节展示如何使用 ones()、zeros() 和 eye() 等内置函数高效地构建矩阵。你将学会用方括号记号(用空格或逗号分隔元素)创建行向量和列向量,以及如何并排可视化多个信号--这些都是信号与系统计算问题中的必备技能。",
    "emoji": "🔲",
    "refs": 1
  },
  "B.7-7 Partial Fraction Expansions": {
    "en": "Partial fraction expansions break complex rational functions into simpler pieces-and MATLAB's residue command does the heavy lifting for you. This section shows how to use residue to find coefficients, poles, and direct terms automatically, including tricky cases with repeated roots, plus a quick look at residuez for discrete-time systems.",
    "zh": "部分分式展开将复杂的有理函数分解成更简单的部分--MATLAB的residue命令可以自动完成这项工作。本节展示如何使用residue找到系数、极点和直接项,包括处理重根的复杂情况,还简要介绍了用于离散时间系统的residuez函数。",
    "emoji": "🔧",
    "refs": 1
  },
  "B.7-7": {
    "en": "Partial fraction expansions break complex rational functions into simpler pieces-and MATLAB's residue command does the heavy lifting for you. This section shows how to use residue to find coefficients, poles, and direct terms automatically, including tricky cases with repeated roots, plus a quick look at residuez for discrete-time systems.",
    "zh": "部分分式展开将复杂的有理函数分解成更简单的部分--MATLAB的residue命令可以自动完成这项工作。本节展示如何使用residue找到系数、极点和直接项,包括处理重根的复杂情况,还简要介绍了用于离散时间系统的residuez函数。",
    "emoji": "🔧",
    "refs": 1
  },
  "B.8-10 Solution of Quadratic and Cubic Equations": {
    "en": "L'Hôpital's Rule and polynomial solving techniques form the algebraic backbone for handling limits and equation solutions that appear throughout signals analysis. This section covers the quadratic formula, Cardano's method for cubic equations, and how to transform complex cubics into simpler depressed forms-essential tools when characteristic equations arise in system analysis.",
    "zh": "洛必达法则和多项式求解技术构成了信号分析中处理极限和方程求解的代数基础。本节涵盖二次公式、三次方程的卡尔达诺方法,以及如何将复杂三次方程转化为更简单的压低三次方程--这些是系统分析中特征方程出现时的必备工具。",
    "emoji": "🔢",
    "refs": 1
  },
  "B.8-10": {
    "en": "L'Hôpital's Rule and polynomial solving techniques form the algebraic backbone for handling limits and equation solutions that appear throughout signals analysis. This section covers the quadratic formula, Cardano's method for cubic equations, and how to transform complex cubics into simpler depressed forms-essential tools when characteristic equations arise in system analysis.",
    "zh": "洛必达法则和多项式求解技术构成了信号分析中处理极限和方程求解的代数基础。本节涵盖二次公式、三次方程的卡尔达诺方法,以及如何将复杂三次方程转化为更简单的压低三次方程--这些是系统分析中特征方程出现时的必备工具。",
    "emoji": "🔢",
    "refs": 1
  },
  "B.8-3 Appendix: Useful Mathematical Formulas": {
    "en": "This appendix collects the mathematical formulas you'll reach for repeatedly-from Euler's formula and complex number identities to geometric series and power sums. Having these at your fingertips saves time on exams and lets you focus on the signals and systems concepts rather than deriving basics.",
    "zh": "这个附录汇集了你会反复使用的数学公式--从欧拉公式和复数恒等式到几何级数和幂和。将这些公式放在手边可以节省考试时间,让你专注于信号与系统的概念,而不是推导基础知识。",
    "emoji": "📋",
    "refs": 1
  },
  "B.8-3": {
    "en": "This appendix collects the mathematical formulas you'll reach for repeatedly-from Euler's formula and complex number identities to geometric series and power sums. Having these at your fingertips saves time on exams and lets you focus on the signals and systems concepts rather than deriving basics.",
    "zh": "这个附录汇集了你会反复使用的数学公式--从欧拉公式和复数恒等式到几何级数和幂和。将这些公式放在手边可以节省考试时间,让你专注于信号与系统的概念,而不是推导基础知识。",
    "emoji": "📋",
    "refs": 1
  },
  "B.8-6 Appendix: Useful Mathematical Formulas": {
    "en": "This reference page collects the mathematical formulas you'll reach for constantly: Taylor and Maclaurin series for function approximation, power series expansions for exponentials and trig functions, and the trigonometric identities (including Euler's formula) that appear throughout signal analysis. Bookmark this-you'll use it on every exam.",
    "zh": "这个参考页汇集了你在信号处理中经常需要的数学公式:泰勒级数和麦克劳林级数用于函数近似,指数和三角函数的幂级数展开,以及贯穿信号分析的三角恒等式(包括欧拉公式)。收藏这一页--考试中会频繁用到。",
    "emoji": "📋",
    "refs": 1
  },
  "B.8-6": {
    "en": "This reference page collects the mathematical formulas you'll reach for constantly: Taylor and Maclaurin series for function approximation, power series expansions for exponentials and trig functions, and the trigonometric identities (including Euler's formula) that appear throughout signal analysis. Bookmark this-you'll use it on every exam.",
    "zh": "这个参考页汇集了你在信号处理中经常需要的数学公式:泰勒级数和麦克劳林级数用于函数近似,指数和三角函数的幂级数展开,以及贯穿信号分析的三角恒等式(包括欧拉公式)。收藏这一页--考试中会频繁用到。",
    "emoji": "📋",
    "refs": 1
  },
  "B.8-7 Common Derivative Formulas": {
    "en": "Derivative formulas are your computational backbone-this reference page collects all the standard rules (power, product, quotient, chain) and derivatives of polynomials, exponentials, logarithms, and trig functions in one place. Paired with essential trigonometric identities (angle addition, power reduction, product-to-sum), this section is your go-to lookup when transforming signals and solving differential equations on exams.",
    "zh": "导数公式是你的计算基础--这个参考页面汇集了所有标准法则(幂法则、乘积法则、商法则、链式法则)以及多项式、指数、对数和三角函数的导数。结合基本的三角恒等式(角度加法、幂次化简、积化和差),这一部分是你在考试中变换信号和求解微分方程时的必查手册。",
    "emoji": "📋",
    "refs": 1
  },
  "B.8-7": {
    "en": "Derivative formulas are your computational backbone-this reference page collects all the standard rules (power, product, quotient, chain) and derivatives of polynomials, exponentials, logarithms, and trig functions in one place. Paired with essential trigonometric identities (angle addition, power reduction, product-to-sum), this section is your go-to lookup when transforming signals and solving differential equations on exams.",
    "zh": "导数公式是你的计算基础--这个参考页面汇集了所有标准法则(幂法则、乘积法则、商法则、链式法则)以及多项式、指数、对数和三角函数的导数。结合基本的三角恒等式(角度加法、幂次化简、积化和差),这一部分是你在考试中变换信号和求解微分方程时的必查手册。",
    "emoji": "📋",
    "refs": 1
  },
  "B.8-8 Indefinite Integrals": {
    "en": "This reference table collects the indefinite integral formulas you'll need most often-from integration by parts to tricky products of exponentials and trig functions. Rather than deriving each one during an exam, you can verify your integration technique against these standard forms and catch errors before they propagate through your Laplace transform or Fourier analysis work.",
    "zh": "这个参考表汇总了你最常用的不定积分公式--从分部积分到指数函数与三角函数的复杂乘积。与其在考试中逐个推导,不如用这些标准形式来验证你的积分技巧,在错误传播到拉普拉斯变换或傅里叶分析之前就发现问题。",
    "emoji": "∫",
    "refs": 1
  },
  "B.8-8": {
    "en": "This reference table collects the indefinite integral formulas you'll need most often-from integration by parts to tricky products of exponentials and trig functions. Rather than deriving each one during an exam, you can verify your integration technique against these standard forms and catch errors before they propagate through your Laplace transform or Fourier analysis work.",
    "zh": "这个参考表汇总了你最常用的不定积分公式--从分部积分到指数函数与三角函数的复杂乘积。与其在考试中逐个推导,不如用这些标准形式来验证你的积分技巧,在错误传播到拉普拉斯变换或傅里叶分析之前就发现问题。",
    "emoji": "∫",
    "refs": 1
  },
  "1.4 Describing a Triangle Function with the Unit Step": {
    "en": "Piecewise signals like triangles aren't as complicated as they look-unit step functions let you write them as clean mathematical expressions. This section shows how to decompose a triangular waveform into ramps and gates, then reconstruct it using step functions, a technique that's essential for analyzing real-world signals in exams and applications.",
    "zh": "三角形波形这样的分段信号看起来很复杂,但单位阶跃函数能让你用简洁的数学表达式描述它们。本节展示如何将三角波形分解为斜坡和门脉冲,然后用阶跃函数重新组合,这是考试和实际应用中分析真实信号的关键技巧。",
    "emoji": "📐",
    "refs": 7
  },
  "1.4": {
    "en": "Piecewise signals like triangles aren't as complicated as they look-unit step functions let you write them as clean mathematical expressions. This section shows how to decompose a triangular waveform into ramps and gates, then reconstruct it using step functions, a technique that's essential for analyzing real-world signals in exams and applications.",
    "zh": "三角形波形这样的分段信号看起来很复杂,但单位阶跃函数能让你用简洁的数学表达式描述它们。本节展示如何将三角波形分解为斜坡和门脉冲,然后用阶跃函数重新组合,这是考试和实际应用中分析真实信号的关键技巧。",
    "emoji": "📐",
    "refs": 7
  },
  "B.2-2 Sinusoids in Terms of Exponentials": {
    "en": "Euler's formula reveals the hidden connection between sinusoids and complex exponentials, showing that cos(ωt) and sin(ωt) are actually the real and imaginary parts of e^(jωt). This perspective transforms how you analyze AC circuits, modulation, and frequency-domain problems-mastering this bridge is essential for understanding why engineers prefer working with complex exponentials on exams.",
    "zh": "欧拉公式揭示了正弦波与复指数之间的隐藏联系,表明 cos(ωt) 和 sin(ωt) 实际上是 e^(jωt) 的实部和虚部。这个视角改变了你分析交流电路、调制和频域问题的方式--掌握这个桥梁对于理解工程师为什么更喜欢在考试中使用复指数至关重要。",
    "emoji": "🌉",
    "refs": 1
  },
  "B.5-2 Heaviside Cover-Up Method": {
    "en": "The Heaviside cover-up method is a clever algebraic trick that lets you find partial fraction coefficients in seconds instead of solving systems of equations. When your denominator factors into distinct linear terms, this technique eliminates the tedious algebra-you literally \"cover up\" factors and substitute strategic values to extract each coefficient instantly.",
    "zh": "Heaviside覆盖法是一个巧妙的代数技巧,能让你在几秒内求出部分分式系数,而不必求解方程组。当分母分解为不同的线性因子时,这种方法消除了繁琐的代数运算--你只需\"覆盖\"某些因子并代入特定值就能立即提取每个系数。",
    "emoji": "⚡",
    "refs": 1
  },
  "B.5-4 A Combination of Heaviside and Clearing Fractions": {
    "en": "When your partial fraction expansion has repeated factors, the standard cover-up method alone falls short-you'll need to combine it with strategic differentiation and algebraic clearing. This hybrid technique lets you efficiently find all coefficients without getting bogged down in messy systems of equations, making it essential for tackling complex rational functions on exams.",
    "zh": "当部分分式展开式中出现重根时,单纯的留数法(cover-up method)已经不够用了--你需要将其与有策略的求导和代数消元相结合。这种混合技巧能让你高效地求出所有系数,避免陷入复杂的方程组,是考试中处理复杂有理函数的关键。",
    "emoji": "🔄",
    "refs": 1
  },
  "B.5-5 Improper F(x) with m=n": {
    "en": "When your numerator and denominator have the same degree, you can't jump straight to partial fractions-polynomial long division comes first. This technique separates the rational function into a polynomial plus a proper fraction, which then becomes manageable for standard partial fraction decomposition. Mastering this step prevents common errors on exams where improper fractions trip up unprepared students.",
    "zh": "当分子和分母的次数相同时,不能直接进行部分分式分解,必须先进行多项式长除法。这种技巧将有理函数分解为多项式加上真分式,然后才能用标准的部分分式分解方法处理。掌握这一步骤能避免考试中许多学生在处理假分式时犯的常见错误。",
    "emoji": "➗",
    "refs": 1
  },
  "B.8 Appendix: Useful Mathematical Formulas": {
    "en": "This appendix collects the essential mathematical formulas you'll repeatedly reach for while solving signals and systems problems-trigonometric identities, derivatives, integrals, and algebraic manipulations all in one place. Having these formulas at your fingertips during problem-solving and exams saves time and reduces errors when you need to focus on the signals concepts rather than formula derivation.",
    "zh": "本附录汇集了你在解决信号与系统问题时会反复使用的基本数学公式--三角恒等式、导数规则、积分表和代数运算都集中在一处。在解题和考试中随时查阅这些公式可以节省时间,减少错误,让你能够专注于信号概念而不是公式推导。",
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
    "en": "Signal power measures how much energy a signal delivers on average over time-think of it as the steady hum of an engine rather than the total fuel burned. This concept becomes essential when dealing with infinite-duration signals where total energy would be undefined, making power the practical metric for comparing signal magnitudes on exams.",
    "zh": "信号功率衡量信号在一段时间内平均传递的能量--可以想象为引擎的稳定功率输出而非总燃料消耗。当处理无限持续时间的信号时这个概念至关重要,因为总能量会趋于无穷,因此功率成为考试中比较信号大小的实用指标。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.2 Some Useful Signal Operations": {
    "en": "Shifting, scaling, and reversal are the three fundamental moves you can perform on any signal-think of them as the basic edits in a signal's timeline. These operations show up constantly in filtering, modulation, and system analysis, making them essential tools for solving exam problems where you need to transform signals in time or amplitude.",
    "zh": "平移、缩放和反转是你可以对任何信号执行的三个基本操作--可以把它们看作信号时间轴上的基本编辑。这些操作在滤波、调制和系统分析中频繁出现,是解决需要在时间或幅度上变换信号的考试问题的必备工具。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.2-4 Combined Operations": {
    "en": "Real exam problems throw multiple operations at you simultaneously-what happens when you shift AND scale a signal, or reverse it AND then delay it? This section breaks down the correct sequence for combining transformations, because the order matters critically. Mastering these combinations is what separates confident problem-solvers from those who second-guess themselves on test day.",
    "zh": "真实考试题目往往同时应用多个操作--当你既要移位又要缩放一个信号时会发生什么?或者先反转再延迟?本节讲解组合变换的正确顺序,因为操作的先后顺序至关重要。掌握这些组合变换是区分考试中自信答题者和犹豫不决者的关键。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.3 Classification of Signals": {
    "en": "Signals come in different flavors, and knowing which type you're dealing with determines your entire analysis strategy. This section breaks down the major classifications-continuous versus discrete, periodic versus aperiodic, and energy versus power signals-so you can pick the right tools for the job on exams.",
    "zh": "信号有不同的类型,识别信号属于哪一类决定了你的整个分析策略。本节介绍主要分类--连续与离散、周期与非周期、能量与功率信号--帮助你在考试中选择正确的分析工具。",
    "emoji": "🏷️",
    "refs": 1
  },
  "1.3-1 Continuous-Time and Discrete-Time Signals": {
    "en": "Signals come in two fundamental flavors: continuous-time signals exist at every moment in time (like your heartbeat as a smooth curve), while discrete-time signals only have values at specific intervals (like your heart rate measured once per second). This distinction shapes everything about how you'll analyze and process signals on exams.",
    "zh": "信号有两种基本形式:连续时间信号在时间的每一刻都有定义(就像心跳的平滑曲线),而离散时间信号只在特定时刻有值(就像每秒测量一次心率)。这个区分决定了你在考试中如何分析和处理信号的方式。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.3-2 Analog and Digital Signals": {
    "en": "The real world speaks in analog-continuous signals that can take any value-but computers only understand digital: discrete, quantized levels. This section reveals why your smartphone converts sound waves into 1s and 0s, and what information gets lost (or preserved) in that conversion. Mastering this distinction is essential for understanding sampling, quantization, and why some signals need analog-to-digital converters.",
    "zh": "现实世界用模拟信号说话--连续信号可以取任何值--但计算机只能理解数字信号:离散的、量化的电平。本节揭示了你的智能手机如何将声波转换为1和0,以及在这个转换过程中哪些信息会丢失(或保留)。掌握这一区别对于理解采样、量化和为什么某些信号需要模数转换器至关重要。",
    "emoji": "🔄",
    "refs": 1
  },
  "1.3-4 Energy and Power Signals": {
    "en": "Signals split into two fundamental categories: those with finite energy (like a brief pulse that eventually dies out) and those with finite power (like an endless sinusoid that keeps going forever). This classification matters because it determines which mathematical tools you'll use for analysis and which theorems apply to your problem on exams.",
    "zh": "信号分为两个基本类别:有限能量信号(如最终衰减的脉冲)和有限功率信号(如永远持续的正弦波)。这个分类很重要,因为它决定了你在分析中使用哪些数学工具,以及在考试中哪些定理适用于你的问题。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.3-5 Deterministic and Random Signals": {
    "en": "Some signals follow predictable mathematical rules you can write down exactly, while others behave unpredictably and need statistical descriptions instead. This section shows you how to tell them apart and why the tools for analyzing each type are completely different-a crucial fork in the road between deterministic and probabilistic signal analysis.",
    "zh": "有些信号遵循可以精确写下的数学规则,而其他信号则表现得不可预测,需要用统计方法来描述。本节教你如何区分这两种信号,以及为什么分析每种信号的工具完全不同--这是确定性信号分析和概率信号分析之间的关键分岔点。",
    "emoji": "🎲",
    "refs": 1
  },
  "1.4 Some Useful Signal Models": {
    "en": "Three mathematical idealizations-the unit step, impulse, and complex exponential-form the foundation for analyzing real systems. These signal models appear repeatedly in exam problems because they're both mathematically tractable and physically meaningful, making them essential tools for decomposing and understanding more complex signals.",
    "zh": "单位阶跃、冲激和复指数这三个数学理想化模型是分析实际系统的基础。这些信号模型在考试题中频繁出现,因为它们既在数学上易于处理,又具有物理意义,是分解和理解复杂信号的必备工具。",
    "emoji": "📦",
    "refs": 1
  },
  "1.4-3 The Exponential Function e^st": {
    "en": "The complex exponential e^(st) is the Swiss Army knife of signal processing-a single formula that captures DC signals, growing/decaying exponentials, and sinusoids all at once. This section shows why e^(st) is the natural input for LTI systems and how its real and imaginary parts reveal the behavior of any signal you'll encounter on exams.",
    "zh": "复指数e^(st)是信号处理中的万能工具--一个公式就能同时表示直流信号、增长/衰减指数和正弦波。本节讲解为什么e^(st)是LTI系统的自然输入,以及它的实部和虚部如何揭示考试中任何信号的行为特征。",
    "emoji": "⚡",
    "refs": 1
  },
  "1.5 Even and Odd Functions": {
    "en": "Every signal hides a secret structure: it can always be decomposed into an even part (mirror-symmetric) and an odd part (antisymmetric). This decomposition isn't just elegant-it's a powerful tool that simplifies Fourier analysis, reduces computation, and reveals hidden symmetries in systems. Recognizing even and odd functions will save you time on exams and deepen your intuition about signal behavior.",
    "zh": "每个信号都隐藏着一个秘密结构:它总是可以分解为偶函数部分(镜像对称)和奇函数部分(反对称)。这种分解不仅优雅,而且是简化傅里叶分析、减少计算量和揭示系统隐藏对称性的强大工具。识别偶函数和奇函数将为你节省考试时间,并加深你对信号行为的直觉理解。",
    "emoji": "🪞",
    "refs": 1
  },
  "1.5-1 Some Properties of Even and Odd Functions": {
    "en": "Even and odd functions have special multiplication and integration properties that can dramatically simplify your calculations. When you multiply or integrate combinations of even and odd functions, the results follow predictable patterns-mastering these rules means you can often eliminate half the terms in Fourier analysis problems without doing the full computation.",
    "zh": "偶函数和奇函数的乘法与积分具有特殊性质,能够显著简化你的计算过程。当你将偶函数和奇函数的组合进行乘法或积分运算时,结果遵循可预测的规律--掌握这些规则意味着在傅里叶分析问题中,你往往可以跳过一半的项而无需完整计算。",
    "emoji": "⚖️",
    "refs": 1
  },
  "1.7-1 Linear and Nonlinear Systems": {
    "en": "The difference between linear and nonlinear systems determines whether you can use superposition to break complex problems into simpler pieces. Linear systems obey a fundamental rule: the response to a sum of inputs equals the sum of individual responses-this is what makes LTI analysis tractable on exams. Nonlinear systems shatter this assumption, which is why most real-world problems are either approximated as linear or require completely different solution techniques.",
    "zh": "线性系统和非线性系统的区别决定了你是否能用叠加原理将复杂问题分解成简单部分。线性系统遵循一个基本规则:对输入之和的响应等于各个响应之和--这正是LTI分析在考试中可行的原因。非线性系统打破了这一假设,这就是为什么大多数现实问题要么被近似为线性,要么需要完全不同的求解技术。",
    "emoji": "⚖️",
    "refs": 1
  },
  "1.7-3 Instantaneous and Dynamic Systems": {
    "en": "Some systems respond instantly to what you feed them right now-like a simple amplifier that just scales the input. Others have memory, storing past information to shape their current output-like a capacitor that remembers its charge. This section separates these two fundamentally different behaviors and explains why dynamic systems require differential equations while instantaneous ones don't.",
    "zh": "有些系统只对当前输入立即做出响应--就像一个简单的放大器只是缩放输入。而其他系统具有记忆性,存储过去的信息来影响当前输出--就像电容器记住其电荷一样。本节区分这两种根本不同的行为,并解释为什么动态系统需要微分方程,而瞬时系统则不需要。",
    "emoji": "⏱️",
    "refs": 1
  },
  "1.7-6 Analog and Digital Systems": {
    "en": "Analog systems work with continuous signals flowing through physical circuits, while digital systems chop those signals into discrete samples and process them mathematically. You'll encounter both on exams, and knowing their fundamental differences-continuous vs. discrete, hardware vs. computation-is essential for analyzing real-world applications from audio equipment to smartphones.",
    "zh": "模拟系统处理通过物理电路流动的连续信号,而数字系统将信号分割成离散样本并进行数学处理。考试中会同时出现这两种系统,理解它们的根本区别--连续与离散、硬件与计算--对分析从音频设备到智能手机等实际应用至关重要。",
    "emoji": "🔄",
    "refs": 1
  },
  "B.1-1 A Historical Note": {
    "en": "Complex numbers were not accepted overnight-for centuries, mathematicians dismissed √(-1) as meaningless. This section traces how \"impossible\" numbers became indispensable tools for engineering and signal analysis.",
    "zh": "复数并非一开始就被接受--几个世纪里,数学家们认为 √(-1) 毫无意义。这一节追溯了这些不可能的数如何从被排斥到成为工程与信号分析不可或缺的工具。",
    "emoji": "📜",
    "refs": 1
  }
};
// ── END SECTION_PREVIEWS_NEW ──

Object.assign(SECTION_PREVIEWS_NEW, {
  "3.1 Introduction": {
    "en": "This opening section moves the course from continuous-time thinking into discrete-time signals. It sets up sequences, sample indexing, and the energy/power viewpoint you need before solving difference-equation systems.",
    "emoji": "🔢",
    "refs": 1
  },
  "3.2 Useful Signal Operations": {
    "en": "Discrete-time signals can be shifted, reversed, and scaled, but the integer index makes each operation feel different from the continuous-time case. This section trains you to track samples without losing signs, offsets, or support intervals.",
    "emoji": "↔️",
    "refs": 1
  },
  "3.3 Some Useful Discrete-Time Signal Models": {
    "en": "Impulse, step, exponential, sinusoidal, and complex-exponential sequences are the building blocks for discrete-time analysis. This section gives you the standard models that later become inputs, modes, and test signals for LTID systems.",
    "emoji": "🧱",
    "refs": 5
  },
  "3.4 Examples of Discrete-Time Systems": {
    "en": "Discrete-time systems can delay, average, accumulate, difference, or filter a sequence. This section turns those operations into input-output rules, then classifies the systems so you know which analysis tools are allowed.",
    "emoji": "⚙️",
    "refs": 1
  },
  "3.5 Discrete-Time System Equations": {
    "en": "Difference equations are the discrete-time counterpart of differential equations. This section shows how recursive rules generate outputs step by step and why initial conditions must be handled carefully.",
    "emoji": "🧮",
    "refs": 1
  },
  "3.6 System Response to Internal Conditions: The Zero-Input Response": {
    "en": "The zero-input response explains what a discrete-time system does because of stored internal conditions alone. This section focuses on characteristic roots and natural modes before any external input is applied.",
    "emoji": "🌱",
    "refs": 1
  },
  "3.7 The Unit Impulse Response h[n]": {
    "en": "The impulse response is the fingerprint of an LTID system. This section shows how one response, h[n], contains enough information to predict the output for any input through convolution.",
    "emoji": "📍",
    "refs": 1
  },
  "3.8 System Response to External Input: The Zero-State Response": {
    "en": "The zero-state response is what the input alone contributes when the system starts from rest. This section builds the convolution-sum view and connects graphical shifting, summing, and interconnected systems.",
    "emoji": "🔁",
    "refs": 3
  },
  "3.9 System Stability": {
    "en": "Stability asks whether bounded inputs and internal modes stay under control. This section compares BIBO and asymptotic stability, then links both ideas to impulse responses and characteristic roots.",
    "emoji": "⚖️",
    "refs": 3
  },
  "3.10 Intuitive Insights into System Behavior": {
    "en": "This section builds quick visual intuition for discrete-time system behavior without solving every sample. It connects modes, resonance, impulse-response width, time constants, and pulse spreading.",
    "emoji": "💡",
    "refs": 1
  },
  "3.11 MATLAB: Discrete-Time Signals and Systems": {
    "en": "This MATLAB section turns the discrete-time theory into computation. You will create stem plots, simulate filtering, write custom system functions, and verify convolution numerically.",
    "emoji": "💻",
    "refs": 4
  },
  "3.12 Appendix: Impulse Response for a Special Case": {
    "en": "This appendix handles a special impulse-response derivation that is easy to skip but useful when roots or system equations take a particular form. It gives a compact reference for a case that often appears inside longer solutions.",
    "emoji": "📎",
    "refs": 1
  },
  "3.13 Summary": {
    "en": "The summary ties together discrete-time signals, difference equations, impulse responses, convolution, and stability. Use it as a checklist for what you should be able to recognize and compute before moving to transforms.",
    "emoji": "✅",
    "refs": 1
  },
  "4.1 The Laplace Transform": {
    "en": "The Laplace transform converts time-domain signals and system equations into algebraic expressions in the s-domain. This section introduces the transform pair, inverse transform idea, and why poles start to matter.",
    "emoji": "🔭",
    "refs": 1
  },
  "4.2 Some Properties of the Laplace Transform": {
    "en": "Laplace-transform properties are the shortcuts that keep problems from becoming long integrals. This section covers shifting, differentiation, integration, scaling, and convolution rules you will use constantly.",
    "emoji": "🧰",
    "refs": 6
  },
  "4.3 Solution of Differential and Integro-Differential Equations": {
    "en": "This section uses the Laplace transform to solve system equations with initial conditions, inputs, and feedback-like terms. It separates zero-input and zero-state thinking while making stability and inverse systems algebraic.",
    "emoji": "🧩",
    "refs": 4
  },
  "4.4 Analysis of Electrical Networks: The Transformed Network": {
    "en": "Circuit elements become algebraic impedances and sources in the transformed network. This section shows how Laplace-domain circuit analysis turns differential equations into familiar network equations.",
    "emoji": "🔌",
    "refs": 1
  },
  "4.5 Block Diagrams": {
    "en": "Block diagrams make system interconnections visible. This section teaches you to read cascades, sums, feedback loops, and equivalent transfer functions without getting lost in signal-flow notation.",
    "emoji": "▣",
    "refs": 1
  },
  "4.6 System Realization": {
    "en": "A transfer function is not just a formula; it can be built as an actual system. This section develops direct, cascade, parallel, and transposed realizations so you can move between algebra and implementation.",
    "emoji": "🏗️",
    "refs": 5
  },
  "4.7 Application to Feedback and Controls": {
    "en": "Feedback changes a system's poles, stability, and transient behavior. This section applies Laplace-domain tools to a control example where closed-loop structure matters more than the individual blocks.",
    "emoji": "🎛️",
    "refs": 1
  },
  "4.8 Frequency Response of an LTIC System": {
    "en": "Frequency response explains how an LTIC system scales and shifts sinusoids in steady state. This section connects H(s) to H(jw) and prepares the bridge from transient analysis to filtering.",
    "emoji": "📡",
    "refs": 1
  },
  "4.9 Bode Plots": {
    "en": "Bode plots turn a transfer function into magnitude and phase sketches. This section teaches the pole-zero building blocks, slopes, corner frequencies, and approximations that make frequency response readable by eye.",
    "emoji": "📈",
    "refs": 5
  },
  "4.10 Filter Design by Placement of Poles and Zeros of H(s)": {
    "en": "Pole-zero placement is the design language of analog filters. This section shows how lowpass, bandpass, notch, and practical filter specifications emerge from where poles and zeros sit in the s-plane.",
    "emoji": "🎚️",
    "refs": 5
  },
  "4.11 The Bilateral Laplace Transform": {
    "en": "The bilateral Laplace transform adds the region of convergence, which is essential for distinguishing signals with the same algebraic expression. This section connects ROC, causality, and system analysis.",
    "emoji": "🌐",
    "refs": 2
  },
  "4.12 MATLAB: Continuous-Time Filters": {
    "en": "This MATLAB section makes continuous-time filter analysis concrete. You will evaluate frequency responses, design Butterworth and Chebyshev filters, and use cascaded second-order sections for cleaner implementation.",
    "emoji": "💻",
    "refs": 4
  },
  "4.13 Summary": {
    "en": "The summary consolidates Laplace transforms, transformed circuits, transfer functions, realizations, feedback, Bode plots, and filter design. Use it to check whether you can move fluently between time, s-domain, and frequency views.",
    "emoji": "✅",
    "refs": 1
  },
  "5.1 The z-Transform": {
    "en": "The z-transform is the discrete-time counterpart of the Laplace transform. This section introduces transform pairs, inverse methods, power series, and partial fractions for sequences.",
    "emoji": "🔢",
    "refs": 2
  },
  "5.2 Some Properties of the z-Transform": {
    "en": "z-transform properties are the algebraic moves behind most discrete-time system solutions. This section covers shifting, scaling, differentiation, reversal, and convolution in the z-domain.",
    "emoji": "🧰",
    "refs": 5
  },
  "5.3 z-Transform Solution of Linear Difference Equations": {
    "en": "Difference equations become algebraic equations after the z-transform. This section uses transfer functions, zero-state response, stability, and inverse systems to analyze LTID systems efficiently.",
    "emoji": "🧩",
    "refs": 3
  },
  "5.4 System Realization": {
    "en": "Discrete-time transfer functions can be implemented as recursive structures. This section turns rational H(z) expressions into realizations that expose delays, gains, and feedback paths.",
    "emoji": "🏗️",
    "refs": 1
  },
  "5.5 Frequency Response of Discrete-Time Systems": {
    "en": "Discrete-time frequency response is periodic, which makes sampling and aliasing unavoidable. This section explains H(e^jw), the repeated spectrum, and why sampling rate changes what frequencies mean.",
    "emoji": "📡",
    "refs": 2
  },
  "5.6 Frequency Response from Pole-Zero Locations": {
    "en": "Pole-zero geometry lets you estimate magnitude and phase without expanding every formula. This section shows how locations in the z-plane shape peaks, notches, bandwidth, and stability intuition.",
    "emoji": "🎯",
    "refs": 1
  },
  "5.7 Digital Processing of Analog Signals": {
    "en": "Digital processing of analog signals links the continuous world to sampled computation. This section follows the chain from sampling through discrete-time processing and back toward analog reconstruction.",
    "emoji": "🔄",
    "refs": 1
  },
  "5.8 The Bilateral z-Transform": {
    "en": "The bilateral z-transform adds the region of convergence, making causality and stability visible in the z-plane. This section uses ROC logic to distinguish sequences and analyze LTID systems.",
    "emoji": "🌐",
    "refs": 2
  },
  "5.9 Connecting the Laplace and z-Transforms": {
    "en": "This section links s-domain and z-domain thinking through sampling relationships. It explains how continuous-time poles map into discrete-time behavior and why the two transforms tell compatible stories.",
    "emoji": "🔗",
    "refs": 1
  },
  "5.10 MATLAB: Discrete-Time IIR Filters": {
    "en": "This MATLAB section turns z-domain filter theory into working IIR designs. You will inspect pole-zero plots, transform analog filters, handle bilinear warping, and use second-order sections for numerical reliability.",
    "emoji": "💻",
    "refs": 8
  },
  "5.11 Summary": {
    "en": "The summary gathers z-transforms, difference-equation solutions, realizations, frequency response, pole-zero geometry, sampling links, and IIR filter design. Use it as the checklist before moving deeper into Fourier analysis.",
    "emoji": "✅",
    "refs": 1
  }
});

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
      { title: 'B.8 Appendix: Useful Mathematical Formulas', subsections: ['B.8-1 Some Useful Constants', 'B.8-2 Complex Numbers', 'B.8-3 Sums', 'B.8-4 Taylor and Maclaurin Series', 'B.8-5 Power Series', 'B.8-6 Trigonometric Identities', 'B.8-7 Common Derivative Formulas', 'B.8-8 Indefinite Integrals', "B.8-9 L'Hopital's Rule", 'B.8-10 Solution of Quadratic and Cubic Equations'] }
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
      { title: '1.7 Classification of Systems', subsections: ['1.7-1 Linear and Nonlinear Systems', '1.7-2 Time-Invariant and Time-Varying Systems', '1.7-3 Instantaneous and Dynamic Systems', '1.7-4 Causal and Noncausal Systems', '1.7-5 Continuous-Time and Discrete-Time Systems', '1.7-6 Analog and Digital Systems', '1.7-7 Invertible and Noninvertible Systems', '1.7-8 Stable and Unstable Systems'] },
      { title: '1.8 System Model: Input-Output Description', subsections: ['1.8-1 Electrical Systems', '1.8-2 Mechanical Systems', '1.8-3 Electromechanical Systems'] },
      { title: '1.9 Internal and External Descriptions of a System', subsections: [] },
      { title: '1.10 Internal Description: The State-Space Description', subsections: [] },
      { title: '1.11 MATLAB: Working with Functions', subsections: ['1.11-1 Anonymous Functions', '1.11-2 Relational Operators and the Unit Step Function', '1.11-3 Visualizing Operations on the Independent Variable', '1.11-4 Numerical Integration and Estimating Signal Energy'] },
      { title: '1.12 Summary', subsections: [] }
    ]
  },
  {
    chapter: 'Chapter 2: Time-Domain Analysis of Continuous-Time Systems',
    sections: [
      { title: '2.1 Introduction', subsections: [] },
      { title: '2.2 System Response to Internal Conditions: The Zero-Input Response', subsections: ['2.2-1 Some Insights into the Zero-Input Behavior of a System'] },
      { title: '2.3 The Unit Impulse Response h(t)', subsections: [] },
      { title: '2.4 System Response to External Input: The Zero-State Response', subsections: ['2.4-1 The Convolution Integral', '2.4-2 Graphical Understanding of Convolution Operation', '2.4-3 Interconnected Systems', '2.4-4 A Very Special Function for LTIC Systems: The Everlasting Exponential e^st', '2.4-5 Total Response'] },
      { title: '2.5 System Stability', subsections: ['2.5-1 External (BIBO) Stability', '2.5-2 Internal (Asymptotic) Stability', '2.5-3 Relationship Between BIBO and Asymptotic Stability'] },
      { title: '2.6 Intuitive Insights into System Behavior', subsections: ['2.6-1 Dependence of System Behavior on Characteristic Modes', '2.6-2 Response Time of a System: The System Time Constant', '2.6-3 Time Constant and Rise Time of a System', '2.6-4 Time Constant and Filtering', '2.6-5 Time Constant and Pulse Dispersion (Spreading)', '2.6-6 Time Constant and Rate of Information Transmission', '2.6-7 The Resonance Phenomenon'] },
      { title: '2.7 MATLAB: M-Files', subsections: ['2.7-1 Script M-Files', '2.7-2 Function M-Files', '2.7-3 For-Loops', '2.7-4 Graphical Understanding of Convolution'] },
      { title: '2.8 Appendix: Determining the Impulse Response', subsections: [] },
      { title: '2.9 Summary', subsections: [] }
    ]
  },
  {
    chapter: 'Chapter 3: Time-Domain Analysis of Discrete-Time Systems',
    sections: [
      { title: '3.1 Introduction', subsections: ['3.1-1 Size of a Discrete-Time Signal'] },
      { title: '3.2 Useful Signal Operations', subsections: [] },
      { title: '3.3 Some Useful Discrete-Time Signal Models', subsections: ['3.3-1 Discrete-Time Impulse Function delta[n]', '3.3-2 Discrete-Time Unit Step Function u[n]', '3.3-3 Discrete-Time Exponential gamma^n', '3.3-4 Discrete-Time Sinusoid cos(Omega n + theta)', '3.3-5 Discrete-Time Complex Exponential e^(j Omega n)'] },
      { title: '3.4 Examples of Discrete-Time Systems', subsections: ['3.4-1 Classification of Discrete-Time Systems'] },
      { title: '3.5 Discrete-Time System Equations', subsections: ['3.5-1 Recursive (Iterative) Solution of Difference Equation'] },
      { title: '3.6 System Response to Internal Conditions: The Zero-Input Response', subsections: [] },
      { title: '3.7 The Unit Impulse Response h[n]', subsections: ['3.7-1 The Closed-Form Solution of h[n]'] },
      { title: '3.8 System Response to External Input: The Zero-State Response', subsections: ['3.8-1 Graphical Procedure for the Convolution Sum', '3.8-2 Interconnected Systems', '3.8-3 Total Response'] },
      { title: '3.9 System Stability', subsections: ['3.9-1 External (BIBO) Stability', '3.9-2 Internal (Asymptotic) Stability', '3.9-3 Relationship Between BIBO and Asymptotic Stability'] },
      { title: '3.10 Intuitive Insights into System Behavior', subsections: [] },
      { title: '3.11 MATLAB: Discrete-Time Signals and Systems', subsections: ['3.11-1 Discrete-Time Functions and Stem Plots', '3.11-2 System Responses Through Filtering', '3.11-3 A Custom Filter Function', '3.11-4 Discrete-Time Convolution'] },
      { title: '3.12 Appendix: Impulse Response for a Special Case', subsections: [] },
      { title: '3.13 Summary', subsections: [] }
    ]
  },
  {
    chapter: 'Chapter 4: Continuous-Time System Analysis Using the Laplace Transform',
    sections: [
      { title: '4.1 The Laplace Transform', subsections: ['4.1-1 Finding the Inverse Transform'] },
      { title: '4.2 Some Properties of the Laplace Transform', subsections: ['4.2-1 Time Shifting', '4.2-2 Frequency Shifting', '4.2-3 The Time-Differentiation Property', '4.2-4 The Time-Integration Property', '4.2-5 The Scaling Property', '4.2-6 Time Convolution and Frequency Convolution'] },
      { title: '4.3 Solution of Differential and Integro-Differential Equations', subsections: ['4.3-1 Comments on Initial Conditions at 0- and at 0+', '4.3-2 Zero-State Response', '4.3-3 Stability', '4.3-4 Inverse Systems'] },
      { title: '4.4 Analysis of Electrical Networks: The Transformed Network', subsections: ['4.4-1 Analysis of Active Circuits'] },
      { title: '4.5 Block Diagrams', subsections: [] },
      { title: '4.6 System Realization', subsections: ['4.6-1 Direct Form I Realization', '4.6-2 Direct Form II Realization', '4.6-3 Cascade and Parallel Realizations', '4.6-4 Transposed Realization', '4.6-5 Using Operational Amplifiers for System Realization'] },
      { title: '4.7 Application to Feedback and Controls', subsections: ['4.7-1 Analysis of a Simple Control System'] },
      { title: '4.8 Frequency Response of an LTIC System', subsections: ['4.8-1 Steady-State Response to Causal Sinusoidal Inputs'] },
      { title: '4.9 Bode Plots', subsections: ['4.9-1 Constant Ka1 a2 / b1 b3', '4.9-2 Pole (or Zero) at the Origin', '4.9-3 First-Order Pole (or Zero)', '4.9-4 Second-Order Pole (or Zero)', '4.9-5 The Transfer Function from the Frequency Response'] },
      { title: '4.10 Filter Design by Placement of Poles and Zeros of H(s)', subsections: ['4.10-1 Dependence of Frequency Response on Poles and Zeros of H(s)', '4.10-2 Lowpass Filters', '4.10-3 Bandpass Filters', '4.10-4 Notch (Bandstop) Filters', '4.10-5 Practical Filters and Their Specifications'] },
      { title: '4.11 The Bilateral Laplace Transform', subsections: ['4.11-1 Properties of the Bilateral Laplace Transform', '4.11-2 Using the Bilateral Transform for Linear System Analysis'] },
      { title: '4.12 MATLAB: Continuous-Time Filters', subsections: ['4.12-1 Frequency Response and Polynomial Evaluation', '4.12-2 Butterworth Filters and the Find Command', '4.12-3 Using Cascaded Second-Order Sections for Butterworth Filter Realization', '4.12-4 Chebyshev Filters'] },
      { title: '4.13 Summary', subsections: [] }
    ]
  },
  {
    chapter: 'Chapter 5: Discrete-Time System Analysis Using the z-Transform',
    sections: [
      { title: '5.1 The z-Transform', subsections: ['5.1-1 Inverse Transform by Partial Fraction Expansion and Tables', '5.1-2 Inverse z-Transform by Power Series Expansion'] },
      { title: '5.2 Some Properties of the z-Transform', subsections: ['5.2-1 Time-Shifting Properties', '5.2-2 z-Domain Scaling Property (Multiplication by gamma^n)', '5.2-3 z-Domain Differentiation Property (Multiplication by n)', '5.2-4 Time-Reversal Property', '5.2-5 Convolution Property'] },
      { title: '5.3 z-Transform Solution of Linear Difference Equations', subsections: ['5.3-1 Zero-State Response of LTID Systems: The Transfer Function', '5.3-2 Stability', '5.3-3 Inverse Systems'] },
      { title: '5.4 System Realization', subsections: [] },
      { title: '5.5 Frequency Response of Discrete-Time Systems', subsections: ['5.5-1 The Periodic Nature of Frequency Response', '5.5-2 Aliasing and Sampling Rate'] },
      { title: '5.6 Frequency Response from Pole-Zero Locations', subsections: [] },
      { title: '5.7 Digital Processing of Analog Signals', subsections: [] },
      { title: '5.8 The Bilateral z-Transform', subsections: ['5.8-1 Properties of the Bilateral z-Transform', '5.8-2 Using the Bilateral z-Transform for Analysis of LTID Systems'] },
      { title: '5.9 Connecting the Laplace and z-Transforms', subsections: [] },
      { title: '5.10 MATLAB: Discrete-Time IIR Filters', subsections: ['5.10-1 Frequency Response and Pole-Zero Plots', '5.10-2 Transformation Basics', '5.10-3 Transformation by First-Order Backward Difference', '5.10-4 Bilinear Transformation', '5.10-5 Bilinear Transformation with Prewarping', '5.10-6 Example: Butterworth Filter Transformation', '5.10-7 Problems Finding Polynomial Roots', '5.10-8 Using Cascaded Second-Order Sections to Improve Design'] },
      { title: '5.11 Summary', subsections: [] }
    ]
  },
  {
    chapter: 'Chapter 6: Continuous-Time Signal Analysis: The Fourier Series',
    sections: [
      { title: '6.1 Periodic Signal Representation by Trigonometric Fourier Series', subsections: ['6.1-1 The Fourier Spectrum', '6.1-2 The Effect of Symmetry', '6.1-3 Determining the Fundamental Frequency and Period'] },
      { title: '6.2 Existence and Convergence of the Fourier Series', subsections: ['6.2-1 Convergence of a Series', '6.2-2 The Role of Amplitude and Phase Spectra in Waveshaping'] },
      { title: '6.3 Exponential Fourier Series', subsections: ['6.3-1 Exponential Fourier Spectra', "6.3-2 Parseval's Theorem", '6.3-3 Properties of the Fourier Series'] },
      { title: '6.4 LTIC System Response to Periodic Inputs', subsections: [] },
      { title: '6.5 Generalized Fourier Series: Signals as Vectors', subsections: ['6.5-1 Component of a Vector', '6.5-2 Signal Comparison and Component of a Signal', '6.5-3 Extension to Complex Signals', '6.5-4 Signal Representation by an Orthogonal Signal Set'] },
      { title: '6.6 Numerical Computation of Dn', subsections: [] },
      { title: '6.7 MATLAB: Fourier Series Applications', subsections: ['6.7-1 Periodic Functions and the Gibbs Phenomenon', '6.7-2 Optimization and Phase Spectra'] },
      { title: '6.8 Summary', subsections: [] }
    ]
  },
  {
    chapter: 'Chapter 7: Continuous-Time Signal Analysis: The Fourier Transform',
    sections: [
      { title: '7.1 Aperiodic Signal Representation by the Fourier Integral', subsections: ['7.1-1 Physical Appreciation of the Fourier Transform'] },
      { title: '7.2 Transforms of Some Useful Functions', subsections: ['7.2-1 Connection Between the Fourier and Laplace Transforms'] },
      { title: '7.3 Some Properties of the Fourier Transform', subsections: [] },
      { title: '7.4 Signal Transmission Through LTIC Systems', subsections: ['7.4-1 Signal Distortion During Transmission', '7.4-2 Bandpass Systems and Group Delay'] },
      { title: '7.5 Ideal and Practical Filters', subsections: [] },
      { title: '7.6 Signal Energy', subsections: [] },
      { title: '7.7 Application to Communications: Amplitude Modulation', subsections: ['7.7-1 Double-Sideband, Suppressed-Carrier (DSB-SC) Modulation', '7.7-2 Amplitude Modulation (AM)', '7.7-3 Single-Sideband Modulation (SSB)', '7.7-4 Frequency-Division Multiplexing'] },
      { title: '7.8 Data Truncation: Window Functions', subsections: ['7.8-1 Using Windows in Filter Design'] },
      { title: '7.9 MATLAB: Fourier Transform Topics', subsections: ['7.9-1 The Sinc Function and the Scaling Property', "7.9-2 Parseval's Theorem and Essential Bandwidth", '7.9-3 Spectral Sampling', '7.9-4 Kaiser Window Functions'] },
      { title: '7.10 Summary', subsections: [] }
    ]
  },
  {
    chapter: 'Chapter 8: Sampling: The Bridge from Continuous to Discrete',
    sections: [
      { title: '8.1 The Sampling Theorem', subsections: ['8.1-1 Practical Sampling'] },
      { title: '8.2 Signal Reconstruction', subsections: ['8.2-1 Practical Difficulties in Signal Reconstruction', '8.2-2 Some Applications of the Sampling Theorem'] },
      { title: '8.3 Analog-to-Digital (A/D) Conversion', subsections: [] },
      { title: '8.4 Dual of Time Sampling: Spectral Sampling', subsections: [] },
      { title: '8.5 Numerical Computation of the Fourier Transform: The Discrete Fourier Transform', subsections: ['8.5-1 Some Properties of the DFT', '8.5-2 Some Applications of the DFT'] },
      { title: '8.6 The Fast Fourier Transform (FFT)', subsections: [] },
      { title: '8.7 MATLAB: The Discrete Fourier Transform', subsections: ['8.7-1 Computing the Discrete Fourier Transform', '8.7-2 Improving the Picture with Zero Padding', '8.7-3 Quantization'] },
      { title: '8.8 Summary', subsections: [] }
    ]
  },
  {
    chapter: 'Chapter 9: Fourier Analysis of Discrete-Time Signals',
    sections: [
      { title: '9.1 Discrete-Time Fourier Series (DTFS)', subsections: ['9.1-1 Periodic Signal Representation by Discrete-Time Fourier Series', '9.1-2 Fourier Spectra of a Periodic Signal x[n]'] },
      { title: '9.2 Aperiodic Signal Representation by Fourier Integral', subsections: ['9.2-1 Nature of Fourier Spectra', '9.2-2 Connection Between the DTFT and the z-Transform'] },
      { title: '9.3 Properties of the DTFT', subsections: [] },
      { title: '9.4 LTI Discrete-Time System Analysis by DTFT', subsections: ['9.4-1 Distortionless Transmission', '9.4-2 Ideal and Practical Filters'] },
      { title: '9.5 DTFT Connection with the CTFT', subsections: ['9.5-1 Use of DFT and FFT for Numerical Computation of the DTFT'] },
      { title: '9.6 Generalization of the DTFT to the z-Transform', subsections: [] },
      { title: '9.7 MATLAB: Working with the DTFS and the DTFT', subsections: ['9.7-1 Computing the Discrete-Time Fourier Series', '9.7-2 Measuring Code Performance', '9.7-3 FIR Filter Design by Frequency Sampling'] },
      { title: '9.8 Summary', subsections: [] }
    ]
  },
  {
    chapter: 'Chapter 10: State-Space Analysis',
    sections: [
      { title: '10.1 Mathematical Preliminaries', subsections: ['10.1-1 Derivatives and Integrals of a Matrix', '10.1-2 The Characteristic Equation of a Matrix: The Cayley-Hamilton Theorem', '10.1-3 Computation of an Exponential and a Power of a Matrix'] },
      { title: '10.2 Introduction to State Space', subsections: [] },
      { title: '10.3 A Systematic Procedure to Determine State Equations', subsections: ['10.3-1 Electrical Circuits', '10.3-2 State Equations from a Transfer Function'] },
      { title: '10.4 Solution of State Equations', subsections: ['10.4-1 Laplace Transform Solution of State Equations', '10.4-2 Time-Domain Solution of State Equations'] },
      { title: '10.5 Linear Transformation of a State Vector', subsections: ['10.5-1 Diagonalization of Matrix A'] },
      { title: '10.6 Controllability and Observability', subsections: ['10.6-1 Inadequacy of the Transfer Function Description of a System'] },
      { title: '10.7 State-Space Analysis of Discrete-Time Systems', subsections: ['10.7-1 Solution in State Space', '10.7-2 The z-Transform Solution'] },
      { title: '10.8 MATLAB: Toolboxes and State-Space Analysis', subsections: ['10.8-1 z-Transform Solutions to Discrete-Time, State-Space Systems', '10.8-2 Transfer Functions from State-Space Representations', '10.8-3 Controllability and Observability of Discrete-Time Systems', '10.8-4 Matrix Exponentiation and the Matrix Exponential'] },
      { title: '10.9 Summary', subsections: [] }
    ]
  }
];

// Active syllabus (switches with book toggle)
let syllabusData = currentBook === 'new' ? syllabusDataNew : syllabusDataOld;

// ── Book toggle ──────────────────────────────────────────────
function setBook(book, options = {}) {
  const preserveView = Boolean(options && options.preserveView);
  const previousBook = currentBook;
  currentBook = book;
  localStorage.setItem('tutorBook', book);
  syllabusData = book === 'new' ? syllabusDataNew : syllabusDataOld;
  const btn = document.getElementById('bookToggleBtn');
  const label = document.getElementById('bookToggleLabel');
  if (btn && label) {
    if (book === 'new') {
      label.textContent = '3rd Ed';
      btn.classList.add('book-new');
      btn.title = 'Currently: 3rd Edition (digital) - click to switch to 2nd Edition';
    } else {
      label.textContent = '2nd Ed';
      btn.classList.remove('book-new');
      btn.title = 'Currently: 2nd Edition (scanned) - click to switch to 3rd Edition';
    }
  }
  // Re-render syllabus and reset state
  renderSyllabus();
updateRecentConversationsUI();
  tutorState.learnSectionId = null;
    tutorState.sessionStartTime = Date.now();
  tutorState.learnSectionTitle = null;
  if (previousBook !== book) {
    tutorState.currentBookPages = [];
    tutorState.learnBookPages = [];
    renderBookPages([]);
    renderBookSources([]);
  }
  if (!preserveView) {
    showWelcome();
  }
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
  sendBtn.disabled = !userInput.value.trim() && attachmentsMain.length === 0;
  followupBtn.disabled = !followupInput.value.trim() && attachmentsFollowup.length === 0;
}

function renderSyllabus() {
  let html = '';
  syllabusData.forEach((item, chIdx) => {
    const sections = item.sections.map(s => typeof s === 'string' ? { title: s, subsections: [] } : s);
    const sectionsHtml = sections.map((sec) => {
      const subsList = sec.subsections || [];
      const sectionSlug = `section-${chIdx}-${escapeHtml(sec.title).replace(/[^a-zA-Z0-9_-]/g, '')}`;
      const subsectionHtml = subsList.length ? `
        <div class="syllabus-subsections hidden" id="${sectionSlug}">
          ${subsList.map(sub => `
            <button class="syllabus-subsection" data-subsection="${escapeHtml(sub)}">${escapeHtml(sub)}</button>
          `).join('')}
        </div>
      ` : '';
      return `
        <div class="syllabus-section-wrap">
          <div class="syllabus-section-row">
            ${subsList.length ? `<button class="syllabus-section-caret" data-target="${sectionSlug}" type="button">›</button>` : `<span class="syllabus-section-caret-placeholder"></span>`}
            <button class="syllabus-section" data-section="${escapeHtml(sec.title)}" data-subsections="${escapeHtml(JSON.stringify(subsList))}">${escapeHtml(sec.title)}</button>
          </div>${subsectionHtml}
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
      const open = !isAccordionOpen(panel);
      setAccordionOpen(panel, open);
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

      if (shouldOpenSectionAsChapterOverview(section, title, subs)) {
        openChapterOverviewMode(section, title, subs);
      } else {
        openLearnMode(section, title, subs);
      }
    });
  });

  courseSyllabus.querySelectorAll('.syllabus-section-caret').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute('data-target');
      const panel = targetId ? document.getElementById(targetId) : null;
      if (!panel) return;
      const open = !isAccordionOpen(panel);
      setAccordionOpen(panel, open);
      btn.classList.toggle('open', open);
    });
  });

  courseSyllabus.querySelectorAll('.syllabus-subsection').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const subTitle = btn.getAttribute('data-subsection');
      if (!subTitle) return;
      courseSyllabus.querySelectorAll('.syllabus-subsection').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      openLearnModeKeepToc(subTitle, subTitle, findParentOverviewContextForSubsection(subTitle, subTitle));
    });
  });
}

// ============================================================
// LEARN MODE
// ============================================================
const learnOverlay    = null; // replaced by learnView inline mode
const learnTitle      = document.getElementById('learnTitle');
const learnModeBadge  = document.getElementById('learnModeBadge');
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
const learnChatEmptyState = document.getElementById('learnChatEmptyState');
const learnChatScroll  = document.getElementById('learnChatScroll');
const learnExplainScroll  = document.getElementById('learnExplainScroll');
const learnFollowupInput  = document.getElementById('learnFollowupInput');
const learnFollowupBtn    = document.getElementById('learnFollowupBtn');
const learnExplainColEl   = document.getElementById('learnExplainCol');
const learnExplainToolbarEl = document.getElementById('learnExplainToolbar');
const learnBookColEl = document.getElementById('learnBookCol');
const learnChatColPanel = document.getElementById('learnChatCol');
const learnChatFab = document.getElementById('learnChatFab');
const learnChatPopover = document.getElementById('learnChatPopover');
const learnChatPopoverHead = document.getElementById('learnChatPopoverHead');
const learnChatPopoverScroll = document.getElementById('learnChatPopoverScroll');
const learnFollowupInputPopover = document.getElementById('learnFollowupInputPopover');
const learnFollowupBtnPopover = document.getElementById('learnFollowupBtnPopover');
const answerLengthToggleLearnPopover = document.getElementById('answerLengthToggleLearnPopover');
const webSearchToggleBtnLearnPopover = document.getElementById('webSearchToggleBtnLearnPopover');
const answerLengthToggleMain = document.getElementById('answerLengthToggleMain');
const webSearchToggleBtnMain = document.getElementById('webSearchToggleBtnMain');
const learnChatPopoverDockBtn = document.getElementById('learnChatPopoverDockBtn');
const learnChatPopoverCloseBtn = document.getElementById('learnChatPopoverCloseBtn');
const learnResizerPanel = document.getElementById('learnResizer');
const learnKpPrevBtn      = document.getElementById('learnKpPrevBtn');
const learnKpNextBtn      = document.getElementById('learnKpNextBtn');

document.getElementById('learnChatShrinkBtn')?.remove();
document.getElementById('learnChatMinimizeBtn')?.remove();
document.querySelectorAll('.learn-chat-window-actions').forEach(node => node.remove());
const learnKpTitle        = document.getElementById('learnKpTitle');
const learnFocusPageIndicator = document.getElementById('learnFocusPageIndicator');
const learnTopbarActions = document.querySelector('#learnView .learn-topbar-actions');
const learnToolbarCenter = document.querySelector('#learnExplainToolbar .learn-toolbar-center');
const learnViewSelectorEl = document.getElementById('learnViewSelector');
if (learnTopbarActions && learnViewSelectorEl && !learnTopbarActions.contains(learnViewSelectorEl)) {
  learnTopbarActions.insertBefore(learnViewSelectorEl, learnTopbarActions.firstChild);
} else if (!learnTopbarActions && learnToolbarCenter && learnViewSelectorEl && !learnToolbarCenter.contains(learnViewSelectorEl)) {
  learnToolbarCenter.appendChild(learnViewSelectorEl);
}
const lecturePrevOverlayBtn = document.getElementById('lecturePrevOverlayBtn');
const lectureNextOverlayBtn = document.getElementById('lectureNextOverlayBtn');
const lectureFocusOverlayBtn = document.getElementById('lectureFocusOverlayBtn');
const learnFocusBtn       = document.getElementById('learnFocusBtn');
const learnExplainToggleBtn = document.getElementById('learnExplainToggleBtn');
const learnExplainRestoreBtn = document.getElementById('learnExplainRestoreBtn');
const learnChatRestoreBtn = document.getElementById('learnChatRestoreBtn');
const learnFocusModal     = document.getElementById('learnFocusModal');
const learnFocusBackdrop  = document.getElementById('learnFocusBackdrop');
const learnFocusClose     = document.getElementById('learnFocusClose');
const learnFocusPrevBtn   = document.getElementById('learnFocusPrevBtn');
const learnFocusNextBtn   = document.getElementById('learnFocusNextBtn');
const learnFocusTitle     = document.getElementById('learnFocusTitle');
const learnFocusContent   = document.getElementById('learnFocusContent');
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
let isLearnChatCollapsed = false;
let isLearnExplainCollapsed = false;
let learnPanelFocus = 'normal';
let isLearnChatPopoverOpen = false;
let _learnViewMode = 'lecture';
let _learnLayoutMode = 'lesson';
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
let learnKnowledgePoints = [];
let currentKnowledgePointIndex = 0;
let currentFullLessonHtml = '';
let currentLessonTrailingHtml = '';

function injectStampPaginationStyles() {
  if (document.getElementById('stampPaginationRuntimeStyle')) return;
  const style = document.createElement('style');
  style.id = 'stampPaginationRuntimeStyle';
  style.textContent = `
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar {
      display: block !important;
      position: relative !important;
      padding: 14px 24px !important;
      min-height: 104px !important;
      overflow: visible !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar .learn-toolbar-center,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar .learn-toolbar-center {
      overflow: visible !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar .learn-toolbar-center,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar .learn-toolbar-center {
      display: grid !important;
      position: absolute !important;
      left: 50% !important;
      top: 50% !important;
      transform: translate(-50%, -50%) !important;
      width: 320px !important;
      max-width: 100% !important;
      grid-template-columns: 42px 220px 42px !important;
      gap: 8px !important;
      align-items: center !important;
      justify-content: center !important;
      justify-items: center !important;
      padding: 8px 8px 12px 4px !important;
      z-index: 40 !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar .learn-view-selector,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar .learn-view-selector {
      grid-column: 2 !important;
      grid-row: 1 !important;
      width: 220px !important;
      min-width: 220px !important;
      max-width: 224px !important;
      flex: 0 0 220px !important;
      box-sizing: border-box !important;
      justify-self: center !important;
      display: grid !important;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar .learn-view-btn,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar .learn-view-btn {
      min-width: 0 !important;
      padding: 0 18px !important;
      font-size: 15px !important;
    }
    #learnView .stamp-page-btn,
    #learnView #learnExplainToolbar .stamp-page-btn.lecture-overlay-btn,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar .stamp-page-btn.lecture-overlay-btn,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar .stamp-page-btn.lecture-overlay-btn {
      position: relative !important;
      inset: auto !important;
      width: 40px !important;
      min-width: 40px !important;
      max-width: 40px !important;
      height: 40px !important;
      min-height: 40px !important;
      max-height: 40px !important;
      padding: 0 !important;
      border-radius: 50% !important;
      background: #fde047 !important;
      border: 3px solid #1e293b !important;
      color: #1e293b !important;
      box-shadow: 3px 3px 0 #1e293b !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      cursor: pointer !important;
      transform: none !important;
      opacity: 1 !important;
      filter: none !important;
      overflow: visible !important;
      margin: 0 5px 5px 0 !important;
      grid-row: 1 !important;
      pointer-events: auto !important;
      z-index: 2 !important;
    }
    #learnView .stamp-page-btn.lecture-overlay-btn-left { grid-column: 1 !important; }
    #learnView .stamp-page-btn.lecture-overlay-btn-right { grid-column: 3 !important; }
    #learnView .stamp-page-btn::before,
    #learnView #learnExplainToolbar .stamp-page-btn.lecture-overlay-btn::before {
      content: "" !important;
      position: absolute !important;
      inset: 3px !important;
      left: 3px !important;
      top: 3px !important;
      width: auto !important;
      height: auto !important;
      border: 2px dashed #1e293b !important;
      border-radius: 50% !important;
      background: transparent !important;
      opacity: 0.3 !important;
      transform: none !important;
      transition: transform 0.3s ease !important;
      pointer-events: none !important;
    }
    #learnView .stamp-page-btn::after,
    #learnView #learnExplainToolbar .stamp-page-btn.lecture-overlay-btn::after {
      content: none !important;
      display: none !important;
    }
    #learnView .stamp-page-btn .lecture-overlay-btn-text { display: none !important; }
    #learnView .stamp-page-btn .lecture-overlay-btn-icon {
      width: auto !important;
      height: auto !important;
      border: 0 !important;
      border-radius: 0 !important;
      background: transparent !important;
      color: transparent !important;
      font-size: 0 !important;
      line-height: 1 !important;
      box-shadow: none !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      z-index: 1 !important;
    }
    #learnView .stamp-page-btn.lecture-overlay-btn-left .lecture-overlay-btn-icon::after {
      content: "‹" !important;
      color: #2563eb !important;
      font-family: "Bricolage Grotesque", "Quicksand", sans-serif !important;
      font-size: 27px !important;
      font-weight: 950 !important;
      line-height: 1 !important;
      text-shadow: none !important;
      transform: translateY(-1px) !important;
    }
    #learnView .stamp-page-btn.lecture-overlay-btn-right .lecture-overlay-btn-icon::after {
      content: "›" !important;
      color: #2563eb !important;
      font-family: "Bricolage Grotesque", "Quicksand", sans-serif !important;
      font-size: 27px !important;
      font-weight: 950 !important;
      line-height: 1 !important;
      text-shadow: none !important;
      transform: translateY(-1px) !important;
    }
    #learnView .stamp-page-btn:hover:not(:disabled) {
      transform: translate(-2px, -2px) scale(1.04) !important;
      box-shadow: 5px 5px 0 #1e293b !important;
      background: #fff38a !important;
    }
    #learnView .stamp-page-btn:hover:not(:disabled)::before { transform: rotate(15deg) !important; }
    #learnView #learnExplainToolbar .stamp-page-btn.is-flipping,
    #learnView #learnExplainToolbar .lecture-overlay-btn-left.is-flipping,
    #learnView #learnExplainToolbar .lecture-overlay-btn-right.is-flipping {
      transform: translate(2px, 2px) scale(0.96) !important;
      box-shadow: 1px 1px 0 #1e293b !important;
      background: #fff38a !important;
    }
    #learnView .stamp-page-btn:active:not(:disabled) {
      transform: translate(4px, 4px) !important;
      box-shadow: 0 0 0 #1e293b !important;
    }
    #learnView .stamp-page-btn:disabled {
      background: #f1f5f9 !important;
      color: #94a3b8 !important;
      border-color: #cbd5e1 !important;
      box-shadow: 3px 3px 0 #e2e8f0 !important;
      cursor: not-allowed !important;
      opacity: 1 !important;
      filter: none !important;
    }
    #learnView .stamp-page-btn:disabled::before { border-color: #cbd5e1 !important; }
    #learnView .stamp-page-btn:disabled .lecture-overlay-btn-icon::after { color: #94a3b8 !important; }

    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn,
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle {
      position: relative !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 12px !important;
      width: auto !important;
      min-width: 0 !important;
      max-width: none !important;
      height: 52px !important;
      min-height: 52px !important;
      padding: 12px 24px !important;
      border: 3px solid #1e293b !important;
      border-radius: 12px !important;
      background: #fdfbf7 !important;
      color: #1e293b !important;
      box-shadow: 4px 4px 0 #1e293b !important;
      cursor: pointer !important;
      overflow: visible !important;
      font-family: "Quicksand", "Nunito", sans-serif !important;
      transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease !important;
      z-index: 45 !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn {
      position: absolute !important;
      left: clamp(28px, 3vw, 46px) !important;
      top: 50% !important;
      transform: translateY(-50%) rotate(2deg) !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle {
      transform: rotate(2deg) !important;
      margin: 0 auto !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn::before,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn::before,
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle::before,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle::before {
      content: "" !important;
      position: absolute !important;
      top: -12px !important;
      left: -12px !important;
      width: 60px !important;
      height: 24px !important;
      border: 0 !important;
      border-left: 2px dashed rgba(0, 0, 0, 0.1) !important;
      border-radius: 0 !important;
      background: repeating-linear-gradient(90deg, #f9a8d4, #f9a8d4 6px, rgba(255,255,255,0.42) 6px, rgba(255,255,255,0.42) 12px) !important;
      opacity: 0.9 !important;
      mix-blend-mode: multiply !important;
      transform: rotate(-15deg) !important;
      pointer-events: none !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn::after,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn::after,
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle::after,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle::after {
      content: none !important;
      display: none !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-label,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-label,
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-label,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-label {
      position: relative !important;
      z-index: 2 !important;
      display: inline-block !important;
      color: #1e293b !important;
      font-size: 18px !important;
      font-weight: 800 !important;
      line-height: 1 !important;
      white-space: nowrap !important;
      letter-spacing: 0 !important;
      text-transform: none !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-label::after,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-label::after,
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-label::after,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-label::after {
      content: "" !important;
      position: absolute !important;
      left: -5% !important;
      bottom: 2px !important;
      width: 110% !important;
      height: 14px !important;
      border-radius: 3px !important;
      background: #fde047 !important;
      transform: rotate(-2deg) !important;
      transition: background-color 0.3s ease !important;
      z-index: -1 !important;
      pointer-events: none !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-icon,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-icon,
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-icon,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-icon {
      position: relative !important;
      z-index: 2 !important;
      flex: 0 0 auto !important;
      width: 24px !important;
      height: 24px !important;
      border: 0 !important;
      border-radius: 0 !important;
      background: transparent !important;
      color: #1e293b !important;
      box-shadow: none !important;
      transition: transform 0.3s ease !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-icon svg,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-icon svg,
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-icon svg,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-icon svg {
      width: 24px !important;
      height: 24px !important;
      stroke: currentColor !important;
      stroke-width: 4 !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn:hover,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn:hover {
      transform: translateY(calc(-50% - 4px)) rotate(0deg) !important;
      box-shadow: 6px 6px 0 #1e293b !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle:hover,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle:hover {
      transform: translateY(-4px) rotate(0deg) !important;
      box-shadow: 6px 6px 0 #1e293b !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn:hover .learn-edge-toggle-label::after,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn:hover .learn-edge-toggle-label::after,
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle:hover .learn-edge-toggle-label::after,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle:hover .learn-edge-toggle-label::after {
      background: #6ee7b7 !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn:hover .learn-edge-toggle-icon,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn:hover .learn-edge-toggle-icon {
      transform: translateX(6px) !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle:hover .learn-edge-toggle-icon,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle:hover .learn-edge-toggle-icon {
      transform: translateX(-6px) !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn:active,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn:active {
      transform: translateY(calc(-50% + 4px)) rotate(0deg) !important;
      box-shadow: 0 0 0 #1e293b !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle:active,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle:active {
      transform: translateY(4px) rotate(0deg) !important;
      box-shadow: 0 0 0 #1e293b !important;
    }

    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn,
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle {
      gap: 7px !important;
      height: 38px !important;
      min-height: 38px !important;
      padding: 7px 12px !important;
      border-width: 2px !important;
      border-radius: 10px !important;
      box-shadow: 3px 3px 0 #1e293b !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn {
      left: clamp(18px, 2vw, 30px) !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn::before,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn::before,
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle::before,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle::before {
      top: -8px !important;
      left: -8px !important;
      width: 42px !important;
      height: 16px !important;
      background: repeating-linear-gradient(90deg, #f9a8d4, #f9a8d4 5px, rgba(255,255,255,0.42) 5px, rgba(255,255,255,0.42) 10px) !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-label,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-label,
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-label,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-label {
      font-size: 14px !important;
      font-weight: 800 !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-label::after,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-label::after,
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-label::after,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-label::after {
      bottom: 1px !important;
      height: 9px !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-icon,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-icon,
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-icon,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-icon,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-icon svg,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-icon svg,
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-icon svg,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-icon svg {
      width: 18px !important;
      height: 18px !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-icon svg,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-icon svg,
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-icon svg,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-icon svg {
      stroke-width: 3.2 !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn:hover,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn:hover {
      transform: translateY(calc(-50% - 2px)) rotate(0deg) !important;
      box-shadow: 4px 4px 0 #1e293b !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle:hover,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle:hover {
      transform: translateY(-2px) rotate(0deg) !important;
      box-shadow: 4px 4px 0 #1e293b !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn,
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle {
      gap: 5px !important;
      height: 32px !important;
      min-height: 32px !important;
      padding: 5px 9px !important;
      border-width: 2px !important;
      border-radius: 9px !important;
      box-shadow: 2px 2px 0 #1e293b !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn {
      left: 12px !important;
      right: auto !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) .learn-chat-topbar,
    #learnView #learnBody.chapter-overview-split-active .learn-chat-topbar {
      right: 12px !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle {
      margin-left: auto !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn::before,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn::before,
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle::before,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle::before {
      top: -6px !important;
      left: -6px !important;
      width: 30px !important;
      height: 11px !important;
      background: repeating-linear-gradient(90deg, #f9a8d4, #f9a8d4 4px, rgba(255,255,255,0.42) 4px, rgba(255,255,255,0.42) 8px) !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-label,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-label,
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-label,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-label {
      font-size: 12px !important;
      line-height: 1 !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-label::after,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-label::after,
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-label::after,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-label::after {
      bottom: 0 !important;
      height: 7px !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-icon,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-icon,
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-icon,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-icon,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-icon svg,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-icon svg,
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-icon svg,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle .learn-edge-toggle-icon svg {
      width: 14px !important;
      height: 14px !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn:hover,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn:hover {
      transform: translateY(calc(-50% - 1px)) rotate(0deg) !important;
      box-shadow: 3px 3px 0 #1e293b !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle:hover,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle:hover {
      transform: translateY(-1px) rotate(0deg) !important;
      box-shadow: 3px 3px 0 #1e293b !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) .learn-chat-topbar,
    #learnView #learnBody.chapter-overview-split-active .learn-chat-topbar {
      position: absolute !important;
      top: 18px !important;
      left: auto !important;
      right: 12px !important;
      width: max-content !important;
      min-width: 0 !important;
      max-width: calc(100% - 24px) !important;
      display: flex !important;
      justify-content: flex-end !important;
      align-items: center !important;
      padding: 0 !important;
      margin: 0 !important;
      background: transparent !important;
      border: 0 !important;
      border-bottom: 0 !important;
      box-shadow: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      pointer-events: none !important;
      transform: none !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) .learn-chat-topbar::before,
    #learnView #learnBody:not(.chapter-overview-active) .learn-chat-topbar::after,
    #learnView #learnBody.chapter-overview-split-active .learn-chat-topbar::before,
    #learnView #learnBody.chapter-overview-split-active .learn-chat-topbar::after {
      content: none !important;
      display: none !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle {
      position: relative !important;
      right: auto !important;
      left: auto !important;
      margin: 0 !important;
      transform: rotate(1deg) !important;
      pointer-events: auto !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnFocusBtn.learn-chat-corner-toggle:hover,
    #learnView #learnBody.chapter-overview-split-active #learnFocusBtn.learn-chat-corner-toggle:hover {
      transform: translateY(-1px) rotate(0deg) !important;
    }

    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar .learn-toolbar-center,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar .learn-toolbar-center {
      pointer-events: none !important;
    }
    #learnView #learnExplainToolbar {
      position: relative !important;
      z-index: 120 !important;
      pointer-events: none !important;
      isolation: isolate !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar .learn-view-selector,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar .learn-view-selector,
    #learnView #learnExplainToolbar .learn-view-selector {
      position: relative !important;
      z-index: 90 !important;
      pointer-events: auto !important;
      isolation: isolate !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar .learn-view-btn,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar .learn-view-btn,
    #learnView #learnExplainToolbar .learn-view-btn {
      position: relative !important;
      z-index: 91 !important;
      pointer-events: auto !important;
      cursor: pointer !important;
    }
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar .lecture-overlay-btn-left,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar .lecture-overlay-btn-right,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar .lecture-overlay-btn-left,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar .lecture-overlay-btn-right,
    #learnView #learnExplainToolbar .lecture-overlay-btn-left,
    #learnView #learnExplainToolbar .lecture-overlay-btn-right,
    #learnView #learnExplainToolbar #learnExplainToggleBtn,
    #learnView #learnExplainToolbar #learnFocusBtn {
      position: relative !important;
      z-index: 80 !important;
      pointer-events: auto !important;
    }
  `;
  document.head.appendChild(style);
  [learnKpPrevBtn, learnKpNextBtn, learnFocusPrevBtn, learnFocusNextBtn].forEach((button) => {
    if (button) button.classList.add('stamp-page-btn');
  });
}

injectStampPaginationStyles();

function injectFinalScrapbookToolbarStyles() {
  const style = document.createElement('style');
  style.id = 'final-scrapbook-toolbar-flip-style';
  style.textContent = `
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar,
    #learnView #learnExplainToolbar {
      position: relative !important;
      display: grid !important;
      grid-template-columns: 1fr auto auto auto 1fr !important;
      align-items: center !important;
      column-gap: 14px !important;
      padding: 24px 28px !important;
      min-height: 112px !important;
      overflow: visible !important;
    }

    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar .learn-toolbar-center,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar .learn-toolbar-center,
    #learnView #learnExplainToolbar .learn-toolbar-center {
      position: absolute !important;
      left: calc(50% + 36px) !important;
      top: 50% !important;
      transform: translate(-50%, -50%) !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 14px !important;
      width: auto !important;
      max-width: none !important;
      padding: 0 !important;
      margin: 0 !important;
      overflow: visible !important;
      z-index: 70 !important;
      pointer-events: auto !important;
    }

    #learnView #learnBody:not(.chapter-overview-active) #learnViewSelector,
    #learnView #learnBody.chapter-overview-split-active #learnViewSelector,
    #learnView #learnViewSelector {
      grid-column: auto !important;
      justify-self: auto !important;
      order: 2 !important;
      position: relative !important;
      z-index: 6 !important;
      flex: 0 0 auto !important;
    }

    #learnView #learnBody:not(.chapter-overview-active) #learnToolbarPagination,
    #learnView #learnBody.chapter-overview-split-active #learnToolbarPagination,
    #learnView #learnToolbarPagination {
      display: none !important;
      order: initial !important;
      margin: 0 !important;
      padding: 0 !important;
      gap: 0 !important;
      overflow: visible !important;
    }

    #learnView #learnExplainToolbar .learn-kp-nav,
    #learnView #learnExplainToolbar #learnKpPrevBtn,
    #learnView #learnExplainToolbar #learnKpNextBtn {
      display: none !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }

    #learnView #learnToolbarPagination .lecture-overlay-btn-left,
    #learnView #learnBody:not(.chapter-overview-active) #learnToolbarPagination .lecture-overlay-btn-left,
    #learnView #learnBody.chapter-overview-split-active #learnToolbarPagination .lecture-overlay-btn-left,
    #learnView #lecturePrevOverlayBtn {
      order: 1 !important;
      grid-column: auto !important;
      justify-self: auto !important;
      box-shadow: 4px 4px 0 #1e293b !important;
      transform: rotate(-2deg) !important;
    }

    #learnView #learnToolbarPagination .lecture-overlay-btn-right,
    #learnView #learnBody:not(.chapter-overview-active) #learnToolbarPagination .lecture-overlay-btn-right,
    #learnView #learnBody.chapter-overview-split-active #learnToolbarPagination .lecture-overlay-btn-right,
    #learnView #lectureNextOverlayBtn {
      order: 3 !important;
      grid-column: auto !important;
      justify-self: auto !important;
      box-shadow: -4px 4px 0 #1e293b !important;
      transform: rotate(2deg) !important;
    }

    #learnView #learnToolbarPagination .lecture-overlay-btn-left,
    #learnView #learnToolbarPagination .lecture-overlay-btn-right,
    #learnView #learnBody:not(.chapter-overview-active) #learnToolbarPagination .lecture-overlay-btn-left,
    #learnView #learnBody:not(.chapter-overview-active) #learnToolbarPagination .lecture-overlay-btn-right,
    #learnView #learnBody.chapter-overview-split-active #learnToolbarPagination .lecture-overlay-btn-left,
    #learnView #learnBody.chapter-overview-split-active #learnToolbarPagination .lecture-overlay-btn-right,
    #learnView #lecturePrevOverlayBtn,
    #learnView #lectureNextOverlayBtn {
      position: relative !important;
      inset: auto !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 7px !important;
      width: auto !important;
      min-width: 72px !important;
      max-width: none !important;
      height: 36px !important;
      min-height: 36px !important;
      max-height: 36px !important;
      padding: 7px 15px !important;
      border: 3px solid #1e293b !important;
      border-radius: 11px !important;
      background: #fdfbf7 !important;
      color: #1e293b !important;
      font-family: "Quicksand", "Nunito", sans-serif !important;
      font-size: 14px !important;
      font-weight: 900 !important;
      line-height: 1 !important;
      letter-spacing: 0 !important;
      opacity: 1 !important;
      filter: none !important;
      cursor: pointer !important;
      overflow: visible !important;
      z-index: 8 !important;
      pointer-events: auto !important;
    }

    #learnView #learnToolbarPagination .lecture-overlay-btn-left::before,
    #learnView #learnToolbarPagination .lecture-overlay-btn-left::after,
    #learnView #learnToolbarPagination .lecture-overlay-btn-right::before,
    #learnView #learnToolbarPagination .lecture-overlay-btn-right::after,
    #learnView #learnToolbarPagination .lecture-overlay-btn-text::before,
    #learnView #learnToolbarPagination .lecture-overlay-btn-text::after {
      content: none !important;
      display: none !important;
      background: none !important;
      border: 0 !important;
    }

    #learnView #learnToolbarPagination .lecture-overlay-btn-text {
      display: inline-flex !important;
      color: inherit !important;
      background: transparent !important;
      font-size: 14px !important;
      font-weight: 900 !important;
      line-height: 1 !important;
    }

    #learnView #learnToolbarPagination .lecture-overlay-btn-icon {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 14px !important;
      height: 14px !important;
      border: 0 !important;
      border-radius: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
      color: transparent !important;
      font-size: 0 !important;
      line-height: 1 !important;
      transform: none !important;
      transition: transform 0.2s ease !important;
    }

    #learnView #learnToolbarPagination .lecture-overlay-btn-left .lecture-overlay-btn-icon::after {
      content: "‹" !important;
      color: #1e293b !important;
      font-size: 24px !important;
      font-weight: 950 !important;
      line-height: 1 !important;
    }

    #learnView #learnToolbarPagination .lecture-overlay-btn-right .lecture-overlay-btn-icon::after {
      content: "›" !important;
      color: #1e293b !important;
      font-size: 24px !important;
      font-weight: 950 !important;
      line-height: 1 !important;
    }

    #learnView #lecturePrevOverlayBtn:hover:not(:disabled) {
      box-shadow: 6px 6px 0 #1e293b !important;
      transform: translate(-2px, -2px) rotate(0deg) !important;
    }

    #learnView #lectureNextOverlayBtn:hover:not(:disabled) {
      box-shadow: -6px 6px 0 #1e293b !important;
      transform: translate(2px, -2px) rotate(0deg) !important;
    }

    #learnView #lecturePrevOverlayBtn:hover:not(:disabled) .lecture-overlay-btn-icon {
      transform: translateX(-3px) !important;
    }

    #learnView #lectureNextOverlayBtn:hover:not(:disabled) .lecture-overlay-btn-icon {
      transform: translateX(3px) !important;
    }

    #learnView #lecturePrevOverlayBtn:disabled,
    #learnView #lectureNextOverlayBtn:disabled {
      background: #fdfbf7 !important;
      color: #1e293b !important;
      border-color: #1e293b !important;
      box-shadow: none !important;
      transform: translateY(1px) rotate(0deg) !important;
      cursor: not-allowed !important;
      opacity: 0.5 !important;
    }

    #learnView #lecturePrevOverlayBtn:disabled .lecture-overlay-btn-icon::after,
    #learnView #lectureNextOverlayBtn:disabled .lecture-overlay-btn-icon::after {
      color: #1e293b !important;
    }
  `;
  document.head.appendChild(style);
}

injectFinalScrapbookToolbarStyles();

function injectFinalPagerArrowStyles() {
  if (document.getElementById('final-pager-arrow-style')) return;
  const style = document.createElement('style');
  style.id = 'final-pager-arrow-style';
  style.textContent = `
    #learnView #learnToolbarPagination .lecture-overlay-btn-left::before,
    #learnView #learnToolbarPagination .lecture-overlay-btn-right::before,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar .lecture-overlay-btn-left::before,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar .lecture-overlay-btn-right::before,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar .lecture-overlay-btn-left::before,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar .lecture-overlay-btn-right::before,
    #learnView .stamp-page-btn::before {
      content: none !important;
      display: none !important;
      border: 0 !important;
      background: transparent !important;
      opacity: 0 !important;
    }

    #learnView #learnToolbarPagination .lecture-overlay-btn-icon,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar .lecture-overlay-btn-icon,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar .lecture-overlay-btn-icon,
    #learnView .stamp-page-btn .lecture-overlay-btn-icon {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 18px !important;
      height: 18px !important;
      color: transparent !important;
      font-size: 0 !important;
      line-height: 1 !important;
      transform: none !important;
    }

    #learnView #learnToolbarPagination .lecture-overlay-btn-text,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar .lecture-overlay-btn-text,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar .lecture-overlay-btn-text {
      display: none !important;
      visibility: hidden !important;
    }

    #learnView #learnToolbarPagination .lecture-overlay-btn-left .lecture-overlay-btn-icon::after,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar .lecture-overlay-btn-left .lecture-overlay-btn-icon::after,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar .lecture-overlay-btn-left .lecture-overlay-btn-icon::after,
    #learnView .stamp-page-btn.lecture-overlay-btn-left .lecture-overlay-btn-icon::after {
      content: "" !important;
      width: 0 !important;
      height: 0 !important;
      border-top: 8px solid transparent !important;
      border-bottom: 8px solid transparent !important;
      border-right: 13px solid #2563eb !important;
      border-left: 0 !important;
      filter: drop-shadow(1px 1px 0 rgba(30, 41, 59, 0.2)) !important;
      transform: translateX(-1px) !important;
    }

    #learnView #learnToolbarPagination .lecture-overlay-btn-right .lecture-overlay-btn-icon::after,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar .lecture-overlay-btn-right .lecture-overlay-btn-icon::after,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar .lecture-overlay-btn-right .lecture-overlay-btn-icon::after,
    #learnView .stamp-page-btn.lecture-overlay-btn-right .lecture-overlay-btn-icon::after {
      content: "" !important;
      width: 0 !important;
      height: 0 !important;
      border-top: 8px solid transparent !important;
      border-bottom: 8px solid transparent !important;
      border-left: 13px solid #2563eb !important;
      border-right: 0 !important;
      filter: drop-shadow(1px 1px 0 rgba(30, 41, 59, 0.2)) !important;
      transform: translateX(1px) !important;
    }

    #learnView #lecturePrevOverlayBtn:disabled .lecture-overlay-btn-icon::after,
    #learnView #lectureNextOverlayBtn:disabled .lecture-overlay-btn-icon::after,
    #learnView .stamp-page-btn:disabled .lecture-overlay-btn-icon::after {
      border-left-color: #94a3b8 !important;
      border-right-color: #94a3b8 !important;
      filter: none !important;
    }
  `;
  document.head.appendChild(style);
}

injectFinalPagerArrowStyles();

function injectFinalPagerTextArrowFix() {
  if (document.getElementById('final-pager-text-arrow-fix')) return;
  const style = document.createElement('style');
  style.id = 'final-pager-text-arrow-fix';
  style.textContent = `
    #learnView #learnExplainToolbar .learn-toolbar-center,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar .learn-toolbar-center,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar .learn-toolbar-center {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: clamp(12px, 1.4vw, 18px) !important;
      width: auto !important;
      max-width: calc(100% - 96px) !important;
      overflow: visible !important;
    }

    #learnView #lecturePrevOverlayBtn,
    #learnView #lectureNextOverlayBtn,
    #learnView #learnExplainToolbar #lecturePrevOverlayBtn,
    #learnView #learnExplainToolbar #lectureNextOverlayBtn,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar #lecturePrevOverlayBtn,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar #lectureNextOverlayBtn,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar #lecturePrevOverlayBtn,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar #lectureNextOverlayBtn {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 5px !important;
      width: auto !important;
      height: 34px !important;
      min-height: 34px !important;
      max-height: 34px !important;
      padding: 0 10px !important;
      border: 2px solid #1e293b !important;
      border-radius: 8px !important;
      background: #ffffff !important;
      background-image:
        linear-gradient(rgba(30, 41, 59, 0.045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(30, 41, 59, 0.035) 1px, transparent 1px) !important;
      background-size: 14px 14px !important;
      color: #1e293b !important;
      box-shadow: 2px 2px 0 #1e293b !important;
      font-size: 11px !important;
      font-weight: 850 !important;
      line-height: 1 !important;
      letter-spacing: 0 !important;
      text-transform: lowercase !important;
      overflow: visible !important;
      opacity: 1 !important;
    }

    #learnView #lecturePrevOverlayBtn,
    #learnView #learnExplainToolbar #lecturePrevOverlayBtn,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar #lecturePrevOverlayBtn,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar #lecturePrevOverlayBtn {
      width: auto !important;
      min-width: 96px !important;
      max-width: 104px !important;
    }

    #learnView #lectureNextOverlayBtn,
    #learnView #learnExplainToolbar #lectureNextOverlayBtn,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar #lectureNextOverlayBtn,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar #lectureNextOverlayBtn {
      width: auto !important;
      min-width: 70px !important;
      max-width: 78px !important;
    }

    #learnView #lecturePrevOverlayBtn .lecture-overlay-btn-icon,
    #learnView #lectureNextOverlayBtn .lecture-overlay-btn-icon,
    #learnView #learnExplainToolbar #lecturePrevOverlayBtn .lecture-overlay-btn-icon,
    #learnView #learnExplainToolbar #lectureNextOverlayBtn .lecture-overlay-btn-icon,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar #lecturePrevOverlayBtn .lecture-overlay-btn-icon,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar #lectureNextOverlayBtn .lecture-overlay-btn-icon,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar #lecturePrevOverlayBtn .lecture-overlay-btn-icon,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar #lectureNextOverlayBtn .lecture-overlay-btn-icon {
      position: static !important;
      display: inline-flex !important;
      visibility: visible !important;
      align-items: center !important;
      justify-content: center !important;
      width: 12px !important;
      min-width: 12px !important;
      height: 12px !important;
      margin: 0 !important;
      padding: 0 !important;
      color: #1e293b !important;
      -webkit-text-fill-color: #1e293b !important;
      font-size: 13px !important;
      font-weight: 950 !important;
      line-height: 1 !important;
      background: transparent !important;
      border: 0 !important;
      box-shadow: none !important;
      transform: none !important;
    }

    #learnView #lecturePrevOverlayBtn .lecture-overlay-btn-icon::before,
    #learnView #lecturePrevOverlayBtn .lecture-overlay-btn-icon::after,
    #learnView #lectureNextOverlayBtn .lecture-overlay-btn-icon::before,
    #learnView #lectureNextOverlayBtn .lecture-overlay-btn-icon::after,
    #learnView #learnExplainToolbar #lecturePrevOverlayBtn .lecture-overlay-btn-icon::before,
    #learnView #learnExplainToolbar #lecturePrevOverlayBtn .lecture-overlay-btn-icon::after,
    #learnView #learnExplainToolbar #lectureNextOverlayBtn .lecture-overlay-btn-icon::before,
    #learnView #learnExplainToolbar #lectureNextOverlayBtn .lecture-overlay-btn-icon::after {
      content: none !important;
      display: none !important;
    }

    #learnView #lecturePrevOverlayBtn .lecture-overlay-btn-text,
    #learnView #lectureNextOverlayBtn .lecture-overlay-btn-text,
    #learnView #learnExplainToolbar #lecturePrevOverlayBtn .lecture-overlay-btn-text,
    #learnView #learnExplainToolbar #lectureNextOverlayBtn .lecture-overlay-btn-text,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar #lecturePrevOverlayBtn .lecture-overlay-btn-text,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar #lectureNextOverlayBtn .lecture-overlay-btn-text,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar #lecturePrevOverlayBtn .lecture-overlay-btn-text,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar #lectureNextOverlayBtn .lecture-overlay-btn-text {
      position: static !important;
      display: inline-flex !important;
      visibility: visible !important;
      width: auto !important;
      min-width: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      color: #1e293b !important;
      -webkit-text-fill-color: #1e293b !important;
      opacity: 1 !important;
      font-size: 11px !important;
      font-weight: 850 !important;
      line-height: 1 !important;
      white-space: nowrap !important;
      overflow: visible !important;
      clip: auto !important;
      clip-path: none !important;
      transform: none !important;
    }

    #learnView #lecturePrevOverlayBtn:disabled,
    #learnView #lectureNextOverlayBtn:disabled {
      background: #f8fafc !important;
      color: #64748b !important;
      border-color: #1e293b !important;
      box-shadow: none !important;
      opacity: 0.55 !important;
    }
  `;
  document.head.appendChild(style);
}

function injectCenteredLectureToolbarStyles() {
  if (document.getElementById('centered-lecture-toolbar-style')) return;
  const style = document.createElement('style');
  style.id = 'centered-lecture-toolbar-style';
  style.textContent = `
    #learnView #learnExplainCol {
      position: relative !important;
      overflow: visible !important;
    }

    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar,
    #learnView #learnExplainToolbar {
      position: relative !important;
      display: none !important;
      height: 0 !important;
      min-height: 0 !important;
      max-height: 0 !important;
      padding: 0 !important;
      margin: 0 !important;
      border: 0 !important;
      overflow: hidden !important;
      pointer-events: none !important;
    }

    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar .learn-toolbar-center,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar .learn-toolbar-center,
    #learnView #learnExplainToolbar .learn-toolbar-center {
      display: none !important;
      pointer-events: none !important;
    }

    #learnView #learnBody:not(.chapter-overview-active) #learnViewSelector,
    #learnView #learnBody.chapter-overview-split-active #learnViewSelector,
    #learnView #learnViewSelector {
      width: auto !important;
      min-width: 0 !important;
      max-width: none !important;
      flex: 0 0 auto !important;
      pointer-events: auto !important;
      z-index: 92 !important;
    }

    #learnView #lecturePrevOverlayBtn,
    #learnView #lectureNextOverlayBtn,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar #lecturePrevOverlayBtn,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar #lectureNextOverlayBtn,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar #lecturePrevOverlayBtn,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar #lectureNextOverlayBtn {
      order: initial !important;
      justify-self: center !important;
      position: relative !important;
      left: auto !important;
      right: auto !important;
      top: auto !important;
      bottom: auto !important;
      transform: none !important;
      pointer-events: auto !important;
      z-index: 93 !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: auto !important;
      min-width: 88px !important;
      max-width: none !important;
      height: 38px !important;
      min-height: 38px !important;
      max-height: 38px !important;
      padding: 0 18px !important;
      border: 2px solid #1e293b !important;
      border-radius: 9px !important;
      background: #ffffff !important;
      background-image:
        linear-gradient(rgba(30, 41, 59, 0.045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(30, 41, 59, 0.035) 1px, transparent 1px) !important;
      background-size: 14px 14px !important;
      color: #1e293b !important;
      box-shadow: 3px 3px 0 #1e293b !important;
      font-family: "Quicksand", "Nunito", sans-serif !important;
      font-size: 13px !important;
      font-weight: 850 !important;
      line-height: 1 !important;
      letter-spacing: 0 !important;
      text-transform: lowercase !important;
      opacity: 1 !important;
      filter: none !important;
      cursor: pointer !important;
    }

    #learnView #lecturePrevOverlayBtn { grid-column: 1 !important; }
    #learnView #lectureNextOverlayBtn { grid-column: 3 !important; }

    #learnView #learnExplainToolbar #lecturePrevOverlayBtn::before,
    #learnView #learnExplainToolbar #lecturePrevOverlayBtn::after,
    #learnView #learnExplainToolbar #lectureNextOverlayBtn::before,
    #learnView #learnExplainToolbar #lectureNextOverlayBtn::after {
      content: none !important;
      display: none !important;
    }

    #learnView #learnExplainToolbar #lecturePrevOverlayBtn .lecture-overlay-btn-icon,
    #learnView #learnExplainToolbar #lectureNextOverlayBtn .lecture-overlay-btn-icon {
      display: none !important;
      visibility: hidden !important;
    }

    #learnView #learnExplainToolbar #lecturePrevOverlayBtn .lecture-overlay-btn-text,
    #learnView #learnExplainToolbar #lectureNextOverlayBtn .lecture-overlay-btn-text {
      display: inline-flex !important;
      visibility: visible !important;
      color: inherit !important;
      font-size: 13px !important;
      font-weight: 850 !important;
      line-height: 1 !important;
      background: transparent !important;
      white-space: nowrap !important;
    }

    #learnView #learnExplainToolbar #lecturePrevOverlayBtn:hover:not(:disabled),
    #learnView #learnExplainToolbar #lectureNextOverlayBtn:hover:not(:disabled) {
      background-color: #f8fafc !important;
      box-shadow: 4px 4px 0 #1e293b !important;
      transform: translate(-1px, -1px) !important;
    }

    #learnView #learnExplainToolbar #lecturePrevOverlayBtn:active:not(:disabled),
    #learnView #learnExplainToolbar #lectureNextOverlayBtn:active:not(:disabled) {
      box-shadow: 1px 1px 0 #1e293b !important;
      transform: translate(2px, 2px) !important;
    }

    #learnView #learnExplainToolbar #lecturePrevOverlayBtn:disabled,
    #learnView #learnExplainToolbar #lectureNextOverlayBtn:disabled {
      background: #f8fafc !important;
      color: #94a3b8 !important;
      border-color: #cbd5e1 !important;
      box-shadow: none !important;
      cursor: not-allowed !important;
      opacity: 0.72 !important;
    }

    #learnView #learnExplainToggleBtn.learn-explain-toggle-btn {
      pointer-events: auto !important;
      z-index: 94 !important;
    }

    @container lecture-panel (max-width: 720px) {
      #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar .learn-toolbar-center,
      #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar .learn-toolbar-center,
      #learnView #learnExplainToolbar .learn-toolbar-center {
        grid-template-columns: 72px clamp(188px, 48cqi, 260px) 72px !important;
        gap: 10px !important;
        max-width: calc(100% - 112px) !important;
      }

      #learnView #learnBody:not(.chapter-overview-active) #learnViewSelector,
      #learnView #learnBody.chapter-overview-split-active #learnViewSelector,
      #learnView #learnViewSelector {
        width: clamp(188px, 48cqi, 260px) !important;
        min-width: 188px !important;
        max-width: 260px !important;
      }

      #learnView #learnExplainToolbar #lecturePrevOverlayBtn,
      #learnView #learnExplainToolbar #lectureNextOverlayBtn {
        min-width: 72px !important;
        height: 34px !important;
        min-height: 34px !important;
        max-height: 34px !important;
        padding: 0 12px !important;
        font-size: 12px !important;
      }
    }

    #learnView #learnExplainToolbar #lecturePrevOverlayBtn .lecture-overlay-btn-text,
    #learnView #learnExplainToolbar #lectureNextOverlayBtn .lecture-overlay-btn-text,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar #lecturePrevOverlayBtn .lecture-overlay-btn-text,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar #lectureNextOverlayBtn .lecture-overlay-btn-text,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar #lecturePrevOverlayBtn .lecture-overlay-btn-text,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar #lectureNextOverlayBtn .lecture-overlay-btn-text {
      position: static !important;
      display: inline-flex !important;
      visibility: visible !important;
      width: auto !important;
      height: auto !important;
      min-width: 0 !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      color: #1e293b !important;
      -webkit-text-fill-color: #1e293b !important;
      opacity: 1 !important;
      font-size: 13px !important;
      font-weight: 850 !important;
      line-height: 1 !important;
      letter-spacing: 0 !important;
      text-indent: 0 !important;
      text-transform: lowercase !important;
      white-space: nowrap !important;
      overflow: visible !important;
      clip: auto !important;
      clip-path: none !important;
      transform: none !important;
    }

    #learnView #learnExplainToolbar #lecturePrevOverlayBtn .lecture-overlay-btn-icon,
    #learnView #learnExplainToolbar #lectureNextOverlayBtn .lecture-overlay-btn-icon,
    #learnView #learnExplainToolbar #lecturePrevOverlayBtn .lecture-overlay-btn-icon::before,
    #learnView #learnExplainToolbar #lecturePrevOverlayBtn .lecture-overlay-btn-icon::after,
    #learnView #learnExplainToolbar #lectureNextOverlayBtn .lecture-overlay-btn-icon::before,
    #learnView #learnExplainToolbar #lectureNextOverlayBtn .lecture-overlay-btn-icon::after {
      content: none !important;
      display: none !important;
      visibility: hidden !important;
    }

    @container lecture-panel (max-width: 760px) {
      #learnView #learnExplainToggleBtn.learn-explain-toggle-btn {
        left: 12px !important;
        width: 34px !important;
        min-width: 34px !important;
        max-width: 34px !important;
        height: 34px !important;
        min-height: 34px !important;
        max-height: 34px !important;
        padding: 0 !important;
        border-radius: 9px !important;
        overflow: visible !important;
      }

      #learnView #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-label {
        display: none !important;
        visibility: hidden !important;
      }

      #learnView #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-icon,
      #learnView #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-icon svg {
        width: 16px !important;
        height: 16px !important;
      }
    }

    #learnView #learnExplainToolbar .learn-toolbar-center,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar .learn-toolbar-center,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar .learn-toolbar-center {
      grid-template-columns: 64px clamp(216px, 24vw, 300px) 64px !important;
      gap: 12px !important;
      max-width: calc(100% - 118px) !important;
    }

    #learnView #learnViewSelector,
    #learnView #learnBody:not(.chapter-overview-active) #learnViewSelector,
    #learnView #learnBody.chapter-overview-split-active #learnViewSelector {
      width: clamp(216px, 24vw, 300px) !important;
      min-width: 216px !important;
      max-width: 300px !important;
    }

    #learnView #learnExplainToolbar #lecturePrevOverlayBtn,
    #learnView #learnExplainToolbar #lectureNextOverlayBtn,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar #lecturePrevOverlayBtn,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar #lectureNextOverlayBtn,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar #lecturePrevOverlayBtn,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar #lectureNextOverlayBtn {
      min-width: 64px !important;
      width: 64px !important;
      max-width: 64px !important;
      height: 34px !important;
      min-height: 34px !important;
      max-height: 34px !important;
      padding: 0 8px !important;
      border-width: 2px !important;
      border-radius: 8px !important;
      box-shadow: 2px 2px 0 #1e293b !important;
      font-size: 11px !important;
      overflow: hidden !important;
    }

    #learnView #learnExplainToolbar #lecturePrevOverlayBtn .lecture-overlay-btn-text,
    #learnView #learnExplainToolbar #lectureNextOverlayBtn .lecture-overlay-btn-text,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar #lecturePrevOverlayBtn .lecture-overlay-btn-text,
    #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar #lectureNextOverlayBtn .lecture-overlay-btn-text,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar #lecturePrevOverlayBtn .lecture-overlay-btn-text,
    #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar #lectureNextOverlayBtn .lecture-overlay-btn-text,
    #learnView #learnExplainToolbar .lecture-overlay-btn-left .lecture-overlay-btn-text,
    #learnView #learnExplainToolbar .lecture-overlay-btn-right .lecture-overlay-btn-text {
      display: inline-flex !important;
      visibility: visible !important;
      opacity: 1 !important;
      color: #1e293b !important;
      -webkit-text-fill-color: #1e293b !important;
      font-size: 11px !important;
      font-weight: 850 !important;
      line-height: 1 !important;
      white-space: nowrap !important;
    }

    #learnView #learnExplainToolbar #lecturePrevOverlayBtn:hover:not(:disabled),
    #learnView #learnExplainToolbar #lectureNextOverlayBtn:hover:not(:disabled) {
      box-shadow: 3px 3px 0 #1e293b !important;
      transform: translate(-1px, -1px) !important;
    }

    #learnView #learnExplainToolbar #lecturePrevOverlayBtn:active:not(:disabled),
    #learnView #learnExplainToolbar #lectureNextOverlayBtn:active:not(:disabled) {
      box-shadow: 1px 1px 0 #1e293b !important;
      transform: translate(1px, 1px) !important;
    }

    @container lecture-panel (max-width: 760px) {
      #learnView #learnExplainToolbar .learn-toolbar-center,
      #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar .learn-toolbar-center,
      #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar .learn-toolbar-center {
        grid-template-columns: 58px clamp(188px, 47cqi, 244px) 58px !important;
        gap: 9px !important;
        max-width: calc(100% - 84px) !important;
      }

      #learnView #learnViewSelector,
      #learnView #learnBody:not(.chapter-overview-active) #learnViewSelector,
      #learnView #learnBody.chapter-overview-split-active #learnViewSelector {
        width: clamp(188px, 47cqi, 244px) !important;
        min-width: 188px !important;
        max-width: 244px !important;
      }

      #learnView #learnExplainToolbar #lecturePrevOverlayBtn,
      #learnView #learnExplainToolbar #lectureNextOverlayBtn {
        min-width: 58px !important;
        width: 58px !important;
        max-width: 58px !important;
        height: 32px !important;
        min-height: 32px !important;
        max-height: 32px !important;
        padding: 0 6px !important;
        font-size: 10px !important;
      }

      #learnView #learnExplainToolbar #lecturePrevOverlayBtn .lecture-overlay-btn-text,
      #learnView #learnExplainToolbar #lectureNextOverlayBtn .lecture-overlay-btn-text {
        font-size: 10px !important;
      }
    }

    #learnView #learnExplainCol {
      container-type: inline-size !important;
      container-name: lecture-panel !important;
    }

    @container lecture-panel (max-width: 760px) {
      #learnView #learnExplainToolbar .learn-toolbar-center,
      #learnView #learnBody:not(.chapter-overview-active) #learnExplainToolbar .learn-toolbar-center,
      #learnView #learnBody.chapter-overview-split-active #learnExplainToolbar .learn-toolbar-center {
        grid-template-columns: 84px clamp(188px, 45cqi, 228px) 58px !important;
        gap: 8px !important;
        max-width: calc(100% - 64px) !important;
      }

      #learnView #learnViewSelector,
      #learnView #learnBody:not(.chapter-overview-active) #learnViewSelector,
      #learnView #learnBody.chapter-overview-split-active #learnViewSelector {
        width: clamp(188px, 45cqi, 228px) !important;
        min-width: 188px !important;
        max-width: 228px !important;
      }

      #learnView #learnExplainToolbar #lecturePrevOverlayBtn {
        width: 84px !important;
        min-width: 84px !important;
        max-width: 84px !important;
      }

      #learnView #learnExplainToolbar #lectureNextOverlayBtn {
        width: 58px !important;
        min-width: 58px !important;
        max-width: 58px !important;
      }

      #learnView #learnExplainToggleBtn.learn-explain-toggle-btn,
      #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn,
      #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn {
        left: 12px !important;
        width: 34px !important;
        min-width: 34px !important;
        max-width: 34px !important;
        height: 34px !important;
        min-height: 34px !important;
        max-height: 34px !important;
        padding: 0 !important;
        gap: 0 !important;
      }

      #learnView #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-label,
      #learnView #learnBody:not(.chapter-overview-active) #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-label,
      #learnView #learnBody.chapter-overview-split-active #learnExplainToggleBtn.learn-explain-toggle-btn .learn-edge-toggle-label {
        display: none !important;
        visibility: hidden !important;
        width: 0 !important;
        max-width: 0 !important;
        overflow: hidden !important;
      }

      #learnView #learnExplainToolbar #lecturePrevOverlayBtn .lecture-overlay-btn-text {
        font-size: 10px !important;
        transform: scaleX(0.94) !important;
        transform-origin: center !important;
      }
    }
  `;
  document.head.appendChild(style);
  if (lecturePrevOverlayBtn) {
    const text = lecturePrevOverlayBtn.querySelector('.lecture-overlay-btn-text');
    if (text) text.textContent = 'previous';
  }
  if (lectureNextOverlayBtn) {
    const text = lectureNextOverlayBtn.querySelector('.lecture-overlay-btn-text');
    if (text) text.textContent = 'next';
  }
}

injectCenteredLectureToolbarStyles();
injectFinalPagerTextArrowFix();

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

function decodeBase64Utf8(raw) {
  if (!raw) return '';
  try {
    const binary = atob(raw);
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    return new TextDecoder('utf-8').decode(bytes);
  } catch (_) {
    try {
      return atob(raw);
    } catch (err) {
      console.warn('[visual-meta] failed to decode b64 text:', err);
      return '';
    }
  }
}

function parseBase64JsonAttr(raw) {
  if (!raw) return null;
  try {
    return JSON.parse(decodeBase64Utf8(raw));
  } catch (err) {
    console.warn('[visual-meta] failed to parse b64 json:', err);
    return null;
  }
}

function decodeInlineMarkdownFragment(markdown) {
  const text = String(markdown || '').trim();
  if (!text) return '';
  const withoutHeading = text.replace(/^##\s+.*?(?:\n|$)/, '').trim();
  return withoutHeading ? markdownToHtml(withoutHeading) : '';
}

function getActiveLearnTrack() {
  return (userMemory && userMemory.quiz && userMemory.quiz.track) || 'standard';
}

function getPrimaryAnchorLabel(anchor) {
  switch (anchor) {
    case 'book_figure': return 'Textbook anchor';
    case 'matplotlib': return 'Matplotlib visual';
    case 'both': return 'Textbook + visual';
    default: return 'Visual plan';
  }
}

function getTeachingRoleLabel(role) {
  switch (role) {
    case 'concept_anchor': return 'Concept anchor';
    case 'example_support': return 'Worked example';
    case 'trap_exposure': return 'Common trap';
    case 'comparison_anchor': return 'Comparison';
    case 'exam_pattern_anchor': return 'Exam pattern';
    default: return compactWhitespace(String(role || '').replace(/_/g, ' '));
  }
}

function getVisualKindPriority(kind, plan) {
  const anchor = plan && plan.primary_anchor;
  if (anchor === 'book_figure') return kind === 'book_image' ? 2 : 1;
  if (anchor === 'matplotlib') return kind === 'generate_image' ? 2 : 1;
  if (anchor === 'both') return kind === 'book_image' ? 2 : (kind === 'generate_image' ? 2 : 1);
  return 1;
}

function findNextLessonImage(metaNode) {
  let el = metaNode ? metaNode.nextElementSibling : null;
  while (el) {
    const img = (el.matches && el.matches('img.lesson-img')) ? el : (el.querySelector ? el.querySelector('img.lesson-img') : null);
    if (img) {
      // Skip placeholder/unavailable images (src starts with # or contains 'figure-unavailable')
      const src = img.getAttribute('src') || '';
      if (src.startsWith('#') || src.includes('figure-unavailable')) {
        el = el.nextElementSibling;
        continue;
      }
      return img;
    }
    if (el.classList && el.classList.contains('kc-visual-meta')) return null;
    el = el.nextElementSibling;
  }
  return null;
}

function isStandaloneVisualCaption(node) {
  if (!node || node.nodeType !== Node.ELEMENT_NODE) return false;
  if (node.classList.contains('learn-visual-chip-row') || node.classList.contains('kc-visual-meta')) return false;
  if (node.querySelector && node.querySelector('img.lesson-img, .kc-visual-meta, .lesson-test-banner, .kc-quiz-plan')) return false;
  const text = compactWhitespace(node.textContent || '');
  if (!text || text.length > 220) return false;
  if (node.tagName === 'P') {
    return !!node.querySelector('em') || /^\*.*\*$/.test(text);
  }
  if (node.tagName === 'DIV') {
    return !!node.querySelector('em');
  }
  return false;
}

function getVisualBlockNodes(entry) {
  const host = entry.img.closest('p, div, figure') || entry.img;
  const nodes = [];
  const chipRow = entry.chipRow || (host.previousElementSibling && host.previousElementSibling.classList && host.previousElementSibling.classList.contains('learn-visual-chip-row')
    ? host.previousElementSibling
    : null);
  if (chipRow) nodes.push(chipRow);
  nodes.push(host);
  const captionNode = host.nextElementSibling;
  if (isStandaloneVisualCaption(captionNode)) nodes.push(captionNode);
  return nodes;
}

function createVisualChip(text, tone = 'default') {
  const chip = document.createElement('span');
  chip.className = `learn-visual-chip learn-visual-chip-${tone}`;
  chip.textContent = text;
  return chip;
}

function getPairedVisualSubtitle(track, bookEntry, genEntry) {
  const bookRole = getTeachingRoleLabel(bookEntry?.role || '').toLowerCase();
  const genRole = getTeachingRoleLabel(genEntry?.role || '').toLowerCase();

  switch (track) {
    case 'cram':
      return `Start with the textbook figure, then use the generated visual to recognize the exam pattern fast${genRole ? ` through a clearer ${genRole}` : ''}.`;
    case 'top_score':
      return `Compare the canonical textbook figure with the generated interpretation to spot subtle distinctions, traps, and higher-precision reasoning${bookRole ? ` around the ${bookRole}` : ''}.`;
    case 'standard':
    default:
      return `Read the textbook figure first, then use the generated visual to make the core idea intuitive${genRole ? ` through a clearer ${genRole}` : ''}.`;
  }
}

function getPairedVisualPanelTitle(track, side) {
  if (side === 'book') {
    switch (track) {
      case 'cram': return 'Textbook pattern';
      case 'top_score': return 'Canonical figure';
      case 'standard':
      default: return 'From the textbook';
    }
  }

  switch (track) {
    case 'cram': return 'Fast recognition view';
    case 'top_score': return 'High-precision interpretation';
    case 'standard':
    default: return 'Clarified visual';
  }
}

function decorateLectureContent(root) {
  if (!root || root.dataset.lectureDecorated === '1') return;

  const cardTypeForHeading = (text) => {
    const t = compactWhitespace(String(text || '')).toLowerCase();
    if (!t) return '';
    if (
      t.includes('example')
      || t.includes('worked example')
      || t.includes('representative example')
      || t.includes('minimal example')
      || t.includes('quick example')
      || t.includes('quick check')
      || t.includes('interactive check')
      || t.includes('interactive demo')
      || t.includes('near-miss')
    ) return 'example';
    if (
      t.includes('common mistake')
      || t.includes('common misuse')
      || t.includes('common trap')
      || t.includes('exam trap')
      || t === 'warning'
      || t.includes('warning:')
    ) return 'warning';
    if (
      t.includes('exam note')
      || t.includes('exam trigger')
      || t.includes('exam tip')
      || t.includes('key exam habit')
      || t.includes('key exam point')
    ) return 'exam';
    if (
      t.includes('quick reading rule')
      || t.includes('when to use it')
      || t.includes('bridge note')
      || t.includes('checklist')
      || t.includes('recipe')
    ) return 'rule';
    if (t.includes('important formulas') || t.includes('formula') || t.includes('identity')) return 'formula';
    return '';
  };

  const trimLeadingWhitespace = (node) => {
    while (node.firstChild && node.firstChild.nodeType === Node.TEXT_NODE && !node.firstChild.textContent.trim()) {
      node.firstChild.remove();
    }
    if (node.firstChild && node.firstChild.nodeType === Node.TEXT_NODE) {
      node.firstChild.textContent = node.firstChild.textContent.replace(/^[\s:：-]+/, '');
    }
  };

  const wrapInlineCallout = (paragraph) => {
    if (!paragraph || paragraph.closest('.lecture-note-card')) return;
    const firstElement = paragraph.firstElementChild;
    if (!firstElement || firstElement.tagName !== 'STRONG') return;
    let probe = paragraph.firstChild;
    while (probe && probe !== firstElement) {
      if (probe.nodeType !== Node.TEXT_NODE || probe.textContent.trim()) return;
      probe = probe.nextSibling;
    }
    const label = compactWhitespace(firstElement.textContent || '').replace(/[:：]\s*$/, '');
    const type = cardTypeForHeading(label);
    if (!type) return;
    const parent = paragraph.parentNode;
    if (!parent) return;
    const card = document.createElement('section');
    card.className = `lecture-note-card lecture-note-card-${type} lecture-note-card-compact`;
    const heading = document.createElement('h4');
    heading.textContent = label;
    parent.insertBefore(card, paragraph);
    firstElement.remove();
    trimLeadingWhitespace(paragraph);
    paragraph.classList.add('lecture-inline-callout-body');
    card.appendChild(heading);
    card.appendChild(paragraph);
  };

  const wrapHeadingCard = (heading) => {
    const type = cardTypeForHeading(heading.textContent || '');
    if (!type || heading.closest('.lecture-note-card')) return;
    const card = document.createElement('section');
    card.className = `lecture-note-card lecture-note-card-${type}`;
    const parent = heading.parentNode;
    if (!parent) return;
    const headingLevel = Number(String(heading.tagName || '').replace(/^H/i, '')) || 3;
    parent.insertBefore(card, heading);
    card.appendChild(heading);
    let sibling = card.nextSibling;
    while (sibling) {
      const next = sibling.nextSibling;
      if (sibling.nodeType === Node.ELEMENT_NODE && /^H[1-6]$/.test(sibling.tagName)) {
        const siblingLevel = Number(String(sibling.tagName || '').replace(/^H/i, '')) || headingLevel;
        if (siblingLevel <= headingLevel || cardTypeForHeading(sibling.textContent || '')) break;
      }
      card.appendChild(sibling);
      sibling = next;
    }
  };

  Array.from(root.querySelectorAll('p')).forEach(wrapInlineCallout);
  Array.from(root.querySelectorAll('h3, h4')).forEach(wrapHeadingCard);

  root.querySelectorAll('h2').forEach((h2) => {
    const next = h2.nextElementSibling;
    if (next && (next.tagName === 'P' || next.tagName === 'BLOCKQUOTE')) {
      next.classList.add('lecture-section-lead');
    }
  });

  const isTakeawayHeadingNode = (node) => {
    const text = compactWhitespace(node.textContent || '');
    return /^📌\s*Key Takeaways$/i.test(text) || /^Key Takeaways$/i.test(text);
  };
  const takeawayHeading = Array.from(root.querySelectorAll('h1, h2, h3, p')).find(isTakeawayHeadingNode);
  if (takeawayHeading && !root.querySelector('.lecture-note-card-summary')) {
    const takeawayNodes = [];
    let cursor = takeawayHeading.nextElementSibling;
    while (cursor) {
      if (/^H[1-6]$/.test(cursor.tagName)) break;
      if (cursor.querySelector('.kc-quiz-plan, .lesson-test-banner')) break;
      const text = compactWhitespace(cursor.textContent || '');
      if (/^next[,.:;]\s+/i.test(text)) break;
      if ((cursor.tagName === 'P' || cursor.tagName === 'LI') && text && !cursor.querySelector('img, table, .kc-quiz-plan, .lesson-test-banner')) {
        takeawayNodes.push(cursor);
      }
      if ((cursor.tagName === 'UL' || cursor.tagName === 'OL') && !cursor.querySelector('img, table, .kc-quiz-plan, .lesson-test-banner')) {
        Array.from(cursor.children || []).forEach((child) => {
          if (child.tagName === 'LI' && compactWhitespace(child.textContent || '')) takeawayNodes.push(child);
        });
      }
      cursor = cursor.nextElementSibling;
    }

    if (takeawayNodes.length >= 1) {
      const summaryCard = document.createElement('section');
      summaryCard.className = 'lecture-note-card lecture-note-card-summary';
      const list = document.createElement('ol');
      list.className = 'learn-key-takeaways-list';
      takeawayNodes.forEach((node, index) => {
        const li = document.createElement('li');
        const marker = document.createElement('span');
        marker.className = 'takeaway-index';
        marker.textContent = String(index + 1);
        const copy = document.createElement('div');
        copy.className = 'takeaway-copy';
        copy.innerHTML = node.innerHTML;
        li.append(marker, copy);
        list.appendChild(li);
      });
      takeawayHeading.parentNode.insertBefore(summaryCard, takeawayHeading);
      if (/^H[1-6]$/.test(takeawayHeading.tagName)) {
        summaryCard.appendChild(takeawayHeading);
      } else {
        const heading = document.createElement('h2');
        heading.innerHTML = takeawayHeading.innerHTML;
        summaryCard.appendChild(heading);
        takeawayHeading.remove();
      }
      summaryCard.appendChild(list);
      const removedParents = new Set();
      takeawayNodes.forEach((node) => {
        const parent = node.parentNode;
        if (parent && (parent.tagName === 'UL' || parent.tagName === 'OL')) removedParents.add(parent);
        else node.remove();
      });
      removedParents.forEach((node) => node.remove());
    }
  }

  root.dataset.lectureDecorated = '1';
}

function enhanceVisualMetadataUI(root) {
  if (!root) return;
  const track = getActiveLearnTrack();
  const planNode = root.querySelector('.kc-visual-plan');
  const plan = planNode
    ? (parseBase64JsonAttr(planNode.dataset.visualPlanB64 || planNode.getAttribute('data-visual-plan-b64')) || {})
    : null;

  if (planNode) {
    // Keep blueprint metadata available for parsing, but do not surface planner-facing
    // strategy copy to the student UI.
    planNode.remove();
  }

  root.querySelectorAll('.learn-visual-chip-row').forEach((node) => node.remove());

  const visualEntries = [];
  root.querySelectorAll('.kc-visual-meta').forEach((metaNode) => {
    const img = findNextLessonImage(metaNode);
    const role = metaNode.dataset.teachingRole || metaNode.getAttribute('data-teaching-role') || '';
    const kind = metaNode.dataset.visualKind || metaNode.getAttribute('data-visual-kind') || '';
    if (!img) return;
    visualEntries.push({ metaNode, img, role, kind });
  });

  if (plan && plan.primary_anchor && plan.primary_anchor !== 'both' && visualEntries.length >= 2) {
    const groups = new Map();
    visualEntries.forEach((entry) => {
      const key = entry.img.parentNode;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(entry);
    });

    groups.forEach((entries, parent) => {
      const ordered = entries.slice().sort((a, b) => getVisualKindPriority(b.kind, plan) - getVisualKindPriority(a.kind, plan));
      const current = entries.map(e => e.img);
      const desired = ordered.map(e => e.img);
      const changed = current.length === desired.length && current.some((img, idx) => img !== desired[idx]);
      if (!changed) return;
      const anchorNode = current[0];
      desired.forEach((img) => {
        if (img !== anchorNode) parent.insertBefore(img, anchorNode);
      });
    });
  }

  visualEntries.forEach((entry) => {
    const { metaNode } = entry;
    if (metaNode.dataset.uiBound === '1') return;
    metaNode.dataset.uiBound = '1';
  });

  if (plan && plan.primary_anchor === 'both' && visualEntries.length >= 2 && !root.querySelector('.learn-visual-pair-shell')) {
    const orderedEntries = visualEntries.slice().sort((a, b) => {
      if (a.metaNode === b.metaNode) return 0;
      const pos = a.metaNode.compareDocumentPosition(b.metaNode);
      return (pos & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1;
    });
    const used = new Set();

    for (let i = 0; i < orderedEntries.length; i += 1) {
      if (used.has(i)) continue;
      const leftEntry = orderedEntries[i];
      let matchIndex = -1;
      for (let j = i + 1; j < orderedEntries.length; j += 1) {
        if (used.has(j)) continue;
        const rightEntry = orderedEntries[j];
        const sameParent = (leftEntry.img.parentNode === rightEntry.img.parentNode)
          || ((leftEntry.img.closest('p, div, figure') || leftEntry.img).parentNode === (rightEntry.img.closest('p, div, figure') || rightEntry.img).parentNode);
        if (sameParent && leftEntry.kind !== rightEntry.kind) {
          matchIndex = j;
          break;
        }
      }
      if (matchIndex === -1) continue;

      const rightEntry = orderedEntries[matchIndex];
      const bookEntry = leftEntry.kind === 'book_image' ? leftEntry : rightEntry;
      const genEntry = leftEntry.kind === 'generate_image' ? leftEntry : rightEntry;
      const bookNodes = getVisualBlockNodes(bookEntry);
      const genNodes = getVisualBlockNodes(genEntry);
      if (!bookNodes.length || !genNodes.length) continue;

      const shell = document.createElement('section');
      shell.className = 'learn-visual-pair-shell';
      const head = document.createElement('div');
      head.className = 'learn-visual-pair-head';
      head.textContent = 'Textbook figure + generated visual';

      const subtitle = document.createElement('div');
      subtitle.className = 'learn-visual-pair-subtitle';
      subtitle.textContent = getPairedVisualSubtitle(track, bookEntry, genEntry);

      const grid = document.createElement('div');
      grid.className = 'learn-visual-pair-grid';

      const bookCard = document.createElement('div');
      bookCard.className = 'learn-visual-pair-card learn-visual-pair-card-book';
      const genCard = document.createElement('div');
      genCard.className = 'learn-visual-pair-card learn-visual-pair-card-generated';

      const bookTitle = document.createElement('div');
      bookTitle.className = 'learn-visual-pair-card-title';
      bookTitle.textContent = getPairedVisualPanelTitle(track, 'book');
      const genTitle = document.createElement('div');
      genTitle.className = 'learn-visual-pair-card-title';
      genTitle.textContent = getPairedVisualPanelTitle(track, 'generated');

      bookCard.appendChild(bookTitle);
      genCard.appendChild(genTitle);
      bookNodes.forEach((node) => bookCard.appendChild(node));
      genNodes.forEach((node) => genCard.appendChild(node));

      grid.appendChild(bookCard);
      grid.appendChild(genCard);
      shell.appendChild(head);
      shell.appendChild(subtitle);
      shell.appendChild(grid);

      const anchorNode = bookNodes[0];
      if (anchorNode && anchorNode.parentNode) {
        const parent = anchorNode.parentNode;
        // Verify we aren't accidentally putting the parent inside itself (e.g. DOM overlap issues)
        if (parent !== shell && !shell.contains(parent)) {
          parent.insertBefore(shell, anchorNode);
        }
      }

      used.add(i);
      used.add(matchIndex);
    }
  }
}

function getDemoControlValue(control, state) {
  const raw = state[control.key];
  const num = Number(raw);
  return Number.isFinite(num) ? num : Number(control.default ?? control.min ?? 1);
}

function fmt(value, digits = 2) {
  const num = Number(value);
  if (!Number.isFinite(num)) return '0';
  return Number((Math.abs(num) < 1e-9 ? 0 : num).toFixed(digits)).toString();
}

const CHAPTER_ONE_DEMO_TYPES = new Set([
  'energy_cross_term',
  'step_window_composer',
  'impulse_unit_area_limit',
  'impulse_sifting',
  'invertibility_tester'
]);

function inferChapterOneDemoType(demo = {}) {
  const explicit = demo.demo_type || demo.demo_spec?.demo_type || '';
  if (explicit) return explicit;
  const spec = demo.spec || demo.demo_spec || {};
  const text = [
    demo.title,
    demo.explanation,
    demo.content,
    spec.description,
    spec.note_below_demo,
    JSON.stringify(spec.pulse_formulas || {})
  ].filter(Boolean).join(' ');
  if (/impulse/i.test(text) && /unit[-\s]?area|pulse|rectangular|triangular|gaussian|exponential/i.test(text)) {
    return 'impulse_unit_area_limit';
  }
  return '';
}

function getInteractiveDemoSpec(demo = {}) {
  return demo.demo_spec || demo.spec || {};
}

function slugifyInteractiveDemoKey(value = '') {
  return compactWhitespace(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'control';
}

function getInteractiveDemoText(demo = {}) {
  const spec = getInteractiveDemoSpec(demo);
  const mode = demo.mode_specific_visual_use || {};
  return [
    demo.title,
    demo.demo_title,
    demo.explanation,
    demo.content,
    demo.caption,
    demo.student_prompt,
    demo.student_instruction,
    demo.student_task,
    demo.observation_note,
    demo.purpose,
    demo.page_title,
    demo.code,
    demo.component_code,
    demo.react_code,
    demo.demo_code,
    spec.title,
    spec.description,
    spec.note_below_demo,
    spec.note_below_canvas,
    spec.student_prompt,
    spec.student_task_prompt,
    spec.what_to_notice,
    spec.observation_prompt,
    JSON.stringify(spec || {}),
    JSON.stringify(mode || {})
  ].filter(Boolean).join(' ');
}

function getInteractiveDemoTitle(demo = {}, fallback = 'Interactive demo') {
  const spec = getInteractiveDemoSpec(demo);
  return compactWhitespace(demo.title || demo.demo_title || spec.title || demo.page_title || fallback);
}

function getInteractiveDemoSubtitle(demo = {}) {
  const spec = getInteractiveDemoSpec(demo);
  const mode = demo.mode_specific_visual_use || {};
  return compactWhitespace(
    demo.explanation
    || demo.content
    || demo.caption
    || demo.student_prompt
    || demo.student_instruction
    || spec.description
    || spec.student_prompt
    || spec.student_task_prompt
    || mode.standard
    || mode.cram
    || ''
  );
}

function normalizeInteractiveDemoControl(control = {}) {
  const key = control.key
    || control.id
    || control.param
    || control.name
    || slugifyInteractiveDemoKey(control.label || control.title || control.value || 'control');
  return { ...control, key };
}

function inferInteractiveDemoFamily(demo = {}) {
  const title = getInteractiveDemoTitle(demo, '');
  const text = getInteractiveDemoText(demo).toLowerCase();
  const spec = getInteractiveDemoSpec(demo);
  const frame = String(spec.framework || demo.framework || '').toLowerCase();
  const combinedText = `${title} ${text}`.toLowerCase();
  const hasLaplaceFlowIntent = /\b(visual recipe|three[-\s]?box flow|time domain to s[-\s]?domain|s[-\s]?domain and back|laplace[-\s]?domain multiplication|transforming x\(t\)|multiply(?:ing)? by h\(s\)|inverse[-\s]?(?:laplace[-\s]?)?transform|x\(s\)\s*h\(s\)|y\(s\)\s*=\s*x\(s\)\s*h\(s\)|canonical transfer functions|ideal delay|ideal differentiator|ideal integrator)\b/i.test(combinedText);
  const hasZTransformPropertyIntent = /\b(gamma\^n|multiplying by.*gamma|replacing.*z.*z\/gamma|reflect the sequence|invert z|z\/gamma|1\/z|z-transform property|time reversal property|exponential weighting)\b/i.test(combinedText);
  const hasSinusoidalSystemIntent = /\b(causal sinusoid through a stable ltic system|sinusoid.*stable ltic|steady[-\s]?state sinusoid|amplitude.*phase.*sinusoid|h\(j\\?omega\))\b/i.test(combinedText);
  const hasPoleRocIntent = /\b(roc|region of convergence|pole[-\s]?zero|poles?\s+and\s+zeros?|zeros?\s+and\s+poles?|root location|stability tester|stable pole|pole location|causal\s*\/\s*(?:right|outside)|anti[-\s]?causal\s*\/\s*(?:left|inside)|inside\s+the\s+unit\s+circle|outside\s+the\s+unit\s+circle)\b/i.test(combinedText);
  const hasTransformRuleIntent = /\b(z[-\s]?transform|z[-\s]?domain|laplace|s[-\s]?domain|transfer function|h\[z\]|x\[z\]|y\[z\]|block diagram|realization|direct form|op[-\s]?amp|transform[-\s]?scale|time integration|running area|time scaling|delay factor|frequency shifting)\b/i.test(combinedText);

  if (/\b(convol|sliding overlap|reverse.*shift.*multiply|overlap.*sum)\b/i.test(combinedText)) {
    return 'convolution_lab';
  }
  if (hasSinusoidalSystemIntent || /\b(bode|frequency response|filter|lowpass|low[-\s]?pass|highpass|high[-\s]?pass|bandpass|band[-\s]?pass|notch|butterworth|chebyshev|ripple|cutoff|prewarp|frequency folding|phase reversal|unit circle.*frequency)\b/i.test(combinedText)) {
    return 'frequency_response_lab';
  }
  if (hasLaplaceFlowIntent || hasZTransformPropertyIntent) {
    return 'transform_rule_lab';
  }
  if (/\b(difference equation|recurrence|recursive|impulse response|h\[n\]|zero[-\s]?state|zero[-\s]?input|characteristic mode|resonance|mode matching|unit sample|delta selector|gamma\^n|a\^n)\b/i.test(combinedText) && !hasPoleRocIntent) {
    return 'sequence_system_lab';
  }
  if (hasPoleRocIntent) {
    return 'pole_zero_roc_lab';
  }
  if (hasTransformRuleIntent) {
    return 'transform_rule_lab';
  }
  if (/\b(difference equation|recurrence|recursive|impulse response|h\[n\]|zero[-\s]?state|zero[-\s]?input|characteristic mode|resonance|mode matching)\b/i.test(combinedText)) {
    return 'sequence_system_lab';
  }

  if (demo.demo_type === 'matrix_multiplication_conformability'
    || /matrix multiplication conformability|matrix size compatibility|inner dimensions|rows of a.*rows of b|product c = ab/i.test(combinedText)) {
    return 'matrix_conformability';
  }
  if (/matrix size and entry locator|matrix entry locator|a_{ij}|row index|column index|entry locator/i.test(combinedText)) {
    return 'matrix_locator';
  }
  if (/point-by-point multiplication|point by point multiplication|sample-by-sample|element-by-element|vector orientation|dimension mismatch/i.test(combinedText)) {
    return 'pointwise_multiplication';
  }
  if (/watch energy grow but power settle|running energy|average power|energy vs power|energy signal|power signal|rectangular approximation of signal energy|classifier/i.test(combinedText)) {
    return 'energy_power';
  }
  if (/sampling a continuous-time signal|sampling time|quantizing amplitude|discrete-time|analog|digital|sample stems|sampled continuous-time/i.test(combinedText)) {
    return 'sampling_quantization';
  }
  if (/superposition|time-invariance|time invariance|causality|bibo|invertibility|recover the input|delay-then-system|system-then-delay|time-shift tester/i.test(combinedText)) {
    return 'system_property';
  }
  if (/dc motor|parameter response|motor parameter|inertia|damping|drive strength|step response/i.test(combinedText)) {
    return 'parameter_response';
  }
  if (/time constant|decay and growth controlled by a|exponential time constant|complex exponential|envelope-controlled sinusoid|decay|growth|e\^\(st\)|e\^st|sigma|omega|damped/i.test(combinedText)) {
    return 'exponential_envelope';
  }
  if (/opposite rotations create sine and cosine|e\^\{?j\\?phi|e\^\{-j\\?phi|conjugate rotations/i.test(combinedText)) {
    return 'opposite_rotations';
  }
  if (/rotating vector|sine and cosine|phasor|complex plane|polar form|rectangular form|quadrant-safe phase|same frequency/i.test(combinedText) || frame.includes('react_canvas')) {
    if (/complex plane|polar form|rectangular form/i.test(combinedText)) return 'complex_plane';
    return 'sinusoid';
  }
  if (/time scaling|mirror the signal|time reflection|shift-test|does the shift match|move and flip the unit step|explore y\(t\)\s*=\s*x\(at-b\)|explore g\(at\+b\)|y\(t\)\s*=\s*x\(at-b\)|unit step|window|landmark|periodicity|shift|reflection/i.test(combinedText)) {
    return 'signal_transform';
  }
  if (/clearing fractions|repeated-factor|fraction expansion|term ladder|partial fractions|matrix locator|point-by-point/i.test(combinedText)) {
    return 'algebra_brief';
  }
  return 'brief';
}

function setupInteractiveDemoCanvas(canvas, ctx, height = 260, minWidth = 320) {
  if (!canvas || !ctx) return { width: 0, height: 0 };
  const dpr = Math.max(window.devicePixelRatio || 1, 1);
  const width = Math.max(Math.floor(canvas.parentElement?.clientWidth || canvas.clientWidth || 0), minWidth);
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = '100%';
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  return { width, height };
}

function drawInteractiveDemoArrow(ctx, x1, y1, x2, y2, color = '#2563eb', width = 3, dashed = false) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = width;
  if (dashed) ctx.setLineDash([7, 6]);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  if (!dashed) {
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - 10 * Math.cos(angle - Math.PI / 6), y2 - 10 * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(x2 - 10 * Math.cos(angle + Math.PI / 6), y2 - 10 * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function drawInteractiveDemoAxes(ctx, width, height, options = {}) {
  const pad = options.pad ?? 42;
  const minT = options.minT ?? -4;
  const maxT = options.maxT ?? 6;
  const originY = options.originY ?? Math.round(height * 0.68);
  const toX = (t) => pad + ((t - minT) / (maxT - minT)) * (width - pad * 2);
  ctx.strokeStyle = options.axisColor || '#cbd5e1';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad, originY);
  ctx.lineTo(width - pad, originY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(pad, 18);
  ctx.lineTo(pad, height - 30);
  ctx.stroke();
  ctx.fillStyle = options.labelColor || '#64748b';
  ctx.font = '600 12px Quicksand, sans-serif';
  ctx.textAlign = 'center';
  for (let t = minT; t <= maxT; t += options.tickStep ?? 2) {
    const x = toX(t);
    ctx.beginPath();
    ctx.moveTo(x, originY - 4);
    ctx.lineTo(x, originY + 4);
    ctx.stroke();
    ctx.fillText(String(t), x, originY + 18);
  }
  return { toX, originY, minT, maxT, pad };
}

function drawInteractiveDemoRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function hydrateChapterOneDemo(node, demo) {
  const demoType = inferChapterOneDemoType(demo);
  const state = Object.create(null);
  const title = demo.title || 'Interactive check';
  const explanation = demo.explanation || 'Move the controls and watch the formulas update.';

  node.innerHTML = `
    <section class="chapter-demo-shell chapter-demo-shell-${escapeHtml(demoType)}">
      <div class="chapter-demo-head">
        <div class="chapter-demo-title">${escapeHtml(title)}</div>
        <div class="chapter-demo-subtitle">${escapeHtml(explanation)}</div>
      </div>
      <div class="chapter-demo-grid">
        <div class="chapter-demo-controls"></div>
        <div class="chapter-demo-stage">
          <canvas class="chapter-demo-canvas"></canvas>
        </div>
      </div>
      <div class="chapter-demo-readouts"></div>
    </section>
  `;

  const controlsEl = node.querySelector('.chapter-demo-controls');
  const readoutsEl = node.querySelector('.chapter-demo-readouts');
  const canvas = node.querySelector('.chapter-demo-canvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  const shellEl = node.querySelector('.chapter-demo-shell');

  const fmt = (value, digits = 2) => {
    const num = Number(value);
    if (!Number.isFinite(num)) return '0';
    return Number((Math.abs(num) < 1e-9 ? 0 : num).toFixed(digits)).toString();
  };
  const setReadouts = (items) => {
    readoutsEl.innerHTML = items.map((item) => `<div class="chapter-demo-readout">${item}</div>`).join('');
  };
  const setupCanvas = (height = 260) => {
    if (!canvas || !ctx) return { width: 0, height: 0 };
    const dpr = Math.max(window.devicePixelRatio || 1, 1);
    const width = Math.max(Math.floor(canvas.parentElement?.clientWidth || canvas.clientWidth || 0), 320);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = '100%';
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    return { width, height };
  };
  const drawAxis = (width, y, minT = -4, maxT = 6, pad = 42) => {
    const toX = (t) => pad + ((t - minT) / (maxT - minT)) * (width - pad * 2);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(width - pad, y);
    ctx.stroke();
    ctx.fillStyle = '#64748b';
    ctx.font = '600 12px Quicksand, sans-serif';
    ctx.textAlign = 'center';
    for (let t = minT; t <= maxT; t += 2) {
      const x = toX(t);
      ctx.beginPath();
      ctx.moveTo(x, y - 4);
      ctx.lineTo(x, y + 4);
      ctx.stroke();
      ctx.fillText(String(t), x, y + 20);
    }
    return toX;
  };
  const drawArrow = (x1, y1, x2, y2, color = '#2563eb', width = 3) => {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - 10 * Math.cos(angle - Math.PI / 6), y2 - 10 * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(x2 - 10 * Math.cos(angle + Math.PI / 6), y2 - 10 * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };
  const drawRoundedRect = (x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };
  const addRange = (key, label, min, max, step, value) => {
    state[key] = Number(value);
    const wrap = document.createElement('label');
    wrap.className = 'chapter-demo-control';
    wrap.innerHTML = `
      <span class="chapter-demo-control-label">${escapeHtml(label)}</span>
      <span class="chapter-demo-slider-row">
        <input type="range" min="${min}" max="${max}" step="${step}" value="${value}">
        <strong class="chapter-demo-control-value">${fmt(value)}</strong>
      </span>
    `;
    const input = wrap.querySelector('input');
    const valueEl = wrap.querySelector('.chapter-demo-control-value');
    input.addEventListener('input', () => {
      state[key] = Number(input.value);
      valueEl.textContent = fmt(state[key]);
      render();
    });
    controlsEl.appendChild(wrap);
    return wrap;
  };
  const addSelect = (key, label, options, value) => {
    state[key] = value;
    const wrap = document.createElement('label');
    wrap.className = 'chapter-demo-control';
    const selectHtml = options.map((option) => (
      `<option value="${escapeHtml(option.value)}"${option.value === value ? ' selected' : ''}>${escapeHtml(option.label)}</option>`
    )).join('');
    wrap.innerHTML = `
      <span class="chapter-demo-control-label">${escapeHtml(label)}</span>
      <select class="chapter-demo-select">${selectHtml}</select>
    `;
    wrap.querySelector('select').addEventListener('change', (event) => {
      state[key] = event.target.value;
      render();
    });
    controlsEl.appendChild(wrap);
    return wrap;
  };

  const renderEnergyCrossTerm = () => {
    const { width } = setupCanvas(260);
    const shift = Number(state.shift || 0);
    const overlap = Math.max(0, 2 - Math.abs(shift));
    const ex = 2;
    const ey = 2;
    const ePlus = ex + ey + (2 * overlap);
    const eMinus = ex + ey - (2 * overlap);
    const toX = drawAxis(width, 214, -4, 5);
    const drawPulse = (from, to, y, color, label) => {
      const x1 = toX(from);
      const x2 = toX(to);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.18;
      ctx.fillRect(x1, y - 44, x2 - x1, 44);
      ctx.globalAlpha = 1;
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.strokeRect(x1, y - 44, x2 - x1, 44);
      ctx.fillStyle = '#334155';
      ctx.font = '700 13px Quicksand, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(label, x1 + 8, y - 50);
    };
    drawPulse(-1, 1, 86, '#2563eb', 'x(t)');
    drawPulse(shift - 1, shift + 1, 154, '#f59e0b', 'y(t)');
    if (overlap > 0) {
      const left = Math.max(-1, shift - 1);
      const right = Math.min(1, shift + 1);
      ctx.fillStyle = '#10b981';
      ctx.globalAlpha = 0.24;
      ctx.fillRect(toX(left), 28, toX(right) - toX(left), 152);
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#047857';
      ctx.font = '700 13px Quicksand, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`overlap = ${fmt(overlap)}`, (toX(left) + toX(right)) / 2, 30);
    }
    setReadouts([
      `<strong>Cross term:</strong> integral x(t)y(t) dt = ${fmt(overlap)}`,
      `<strong>Energy sum:</strong> E[x+y] = 2 + 2 + 2(${fmt(overlap)}) = ${fmt(ePlus)}`,
      `<strong>Energy difference:</strong> E[x-y] = 2 + 2 - 2(${fmt(overlap)}) = ${fmt(eMinus)}`
    ]);
  };

  const renderStepWindow = () => {
    const { width } = setupCanvas(250);
    const a = Math.min(Number(state.start || 2), Number(state.end || 4));
    const b = Math.max(Number(state.start || 2), Number(state.end || 4));
    const toX = drawAxis(width, 190, -5, 6);
    const y0 = 160;
    const y1 = 78;
    ctx.fillStyle = '#2563eb';
    ctx.globalAlpha = 0.16;
    ctx.fillRect(toX(a), y1, toX(b) - toX(a), y0 - y1);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = '#1d4ed8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(toX(-5), y0);
    ctx.lineTo(toX(a), y0);
    ctx.lineTo(toX(a), y1);
    ctx.lineTo(toX(b), y1);
    ctx.lineTo(toX(b), y0);
    ctx.lineTo(toX(6), y0);
    ctx.stroke();
    drawArrow(toX(a), y0 + 10, toX(a), y1 + 8, '#2563eb', 2.5);
    drawArrow(toX(b), y1 - 10, toX(b), y0 - 8, '#2563eb', 2.5);
    ctx.fillStyle = '#334155';
    ctx.font = '700 13px Quicksand, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`turn on at a=${fmt(a)}`, toX(a), 42);
    ctx.fillText(`turn off at b=${fmt(b)}`, toX(b), 222);
    setReadouts([
      `<strong>Window:</strong> u(t-${fmt(a)}) - u(t-${fmt(b)})`,
      `<strong>Active interval:</strong> ${fmt(a)} <= t < ${fmt(b)}`,
      `<strong>Reading habit:</strong> first step turns on, second step cancels it back to zero.`
    ]);
  };

  const renderImpulseUnitAreaLimit = () => {
    const { width } = setupCanvas(250);
    const alpha = Math.max(1, Number(state.alpha || 3));
    const shape = state.shape || 'rectangular';
    const minT = -3;
    const maxT = 3;
    const pad = 42;
    const baseY = 190;
    const topY = 38;
    const usableHeight = baseY - topY;
    const toX = drawAxis(width, baseY, minT, maxT, pad);
    const maxAmplitude = Math.max(alpha, alpha / Math.sqrt(Math.PI), 1);
    const toY = (value) => baseY - (Math.min(value, maxAmplitude) / maxAmplitude) * usableHeight;
    const sampleCount = 360;
    const valueAt = (t) => {
      if (shape === 'triangular') return Math.max(0, alpha * (1 - alpha * Math.abs(t)));
      if (shape === 'exponential') return t >= 0 ? alpha * Math.exp(-alpha * t) : 0;
      if (shape === 'gaussian') return (alpha / Math.sqrt(Math.PI)) * Math.exp(-((alpha * t) ** 2));
      return Math.abs(t) <= (0.5 / alpha) ? alpha : 0;
    };
    const formulaMap = {
      rectangular: `height = ${fmt(alpha)}, width = ${fmt(1 / alpha)}`,
      triangular: `peak = ${fmt(alpha)}, base = ${fmt(2 / alpha)}`,
      exponential: `${fmt(alpha)} exp(-${fmt(alpha)}t) u(t)`,
      gaussian: `${fmt(alpha)}/sqrt(pi) exp(-(${fmt(alpha)}t)^2)`
    };
    ctx.fillStyle = 'rgba(37, 99, 235, 0.12)';
    ctx.beginPath();
    ctx.moveTo(toX(minT), baseY);
    for (let i = 0; i <= sampleCount; i += 1) {
      const t = minT + ((maxT - minT) * i) / sampleCount;
      ctx.lineTo(toX(t), toY(valueAt(t)));
    }
    ctx.lineTo(toX(maxT), baseY);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i <= sampleCount; i += 1) {
      const t = minT + ((maxT - minT) * i) / sampleCount;
      const x = toX(t);
      const y = toY(valueAt(t));
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(toX(0), baseY);
    ctx.lineTo(toX(0), topY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#334155';
    ctx.font = '700 13px Quicksand, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('area stays 1', toX(0), 24);
    setReadouts([
      `<strong>Shape:</strong> ${escapeHtml(shape)}`,
      `<strong>Sharpness:</strong> alpha = ${fmt(alpha)}; ${escapeHtml(formulaMap[shape] || formulaMap.rectangular)}`,
      `<strong>Limit idea:</strong> as alpha grows, width shrinks and height grows, but total area remains 1.`
    ]);
  };

  const renderImpulseSifting = () => {
    const { width } = setupCanvas(250);
    const form = state.form || 't_minus_a';
    let support = Number(state.a || 2);
    let factor = 1;
    let argument = `t - ${fmt(state.a || 2)}`;
    if (form === 'a_minus_t') {
      support = Number(state.a || 2);
      argument = `${fmt(state.a || 2)} - t`;
    } else if (form === 'k_t_minus_b') {
      const k = Number(state.k || 2);
      const b = Number(state.b || 4);
      support = b / k;
      factor = 1 / Math.abs(k || 1);
      argument = `${fmt(k)}t - ${fmt(b)}`;
    }
    const sample = (support ** 2) + 1;
    const integral = factor * sample;
    const toX = drawAxis(width, 184, -4, 6);
    const x = toX(support);
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 3;
    drawArrow(x, 178, x, 70, '#f97316', 3);
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.arc(x, 70, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#334155';
    ctx.font = '700 13px Quicksand, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`support t = ${fmt(support)}`, x, 44);
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 240; i += 1) {
      const t = -4 + (i / 240) * 9;
      const y = 168 - Math.min((t ** 2) + 1, 14) * 6;
      if (i === 0) ctx.moveTo(toX(t), y);
      else ctx.lineTo(toX(t), y);
    }
    ctx.stroke();
    setReadouts([
      `<strong>Set the argument to zero:</strong> ${argument} = 0 gives t = ${fmt(support)}`,
      `<strong>Scaling factor:</strong> 1 / |slope| = ${fmt(factor)}`,
      `<strong>With phi(t)=t^2+1:</strong> integral phi(t) delta(${argument}) dt = ${fmt(integral)}`
    ]);
  };

  const renderInvertibilityTester = () => {
    const { width } = setupCanvas(250);
    const cases = {
      reverse: {
        title: 'y(t) = x(-t)',
        status: 'Invertible',
        left: ['x(t)'],
        right: ['y(t)'],
        note: 'Time reversal changes the order, but no value is erased. Recover with x(t)=y(-t).'
      },
      affine: {
        title: 'y(t) = x(3t-6)',
        status: 'Invertible',
        left: ['x(t)'],
        right: ['y(t)'],
        note: 'Solve s=3t-6. Then x(t)=y((t+6)/3).'
      },
      abs: {
        title: 'y(t) = |x(t)|',
        status: 'Not invertible',
        left: ['x=3', 'x=-3'],
        right: ['y=3'],
        note: 'The sign is lost, so two different inputs give the same output.'
      },
      square: {
        title: 'y(t) = x^2(t)',
        status: 'Not invertible',
        left: ['x=2', 'x=-2'],
        right: ['y=4'],
        note: 'Squaring collapses positive and negative values together.'
      },
      multiply_t: {
        title: 'y(t) = t x(t)',
        status: 'Not invertible',
        left: ['x(0)=5', 'x(0)=-1'],
        right: ['y(0)=0'],
        note: 'At t=0, every input value is multiplied away.'
      }
    };
    const item = cases[state.system] || cases.reverse;
    const leftX = 74;
    const rightX = width - 86;
    const centerY = 124;
    ctx.fillStyle = '#334155';
    ctx.font = '800 15px Quicksand, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.title, width / 2, 38);
    item.left.forEach((label, index) => {
      const y = item.left.length === 1 ? centerY : centerY - 34 + index * 68;
      ctx.fillStyle = '#dbeafe';
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 2;
      drawRoundedRect(leftX - 42, y - 20, 84, 40, 8);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#1e3a8a';
      ctx.font = '700 13px Quicksand, sans-serif';
      ctx.fillText(label, leftX, y + 5);
      drawArrow(leftX + 50, y, rightX - 55, item.right.length === 1 ? centerY : y, '#2563eb', 2.4);
    });
    item.right.forEach((label, index) => {
      const y = item.right.length === 1 ? centerY : centerY - 28 + index * 56;
      ctx.fillStyle = item.status === 'Invertible' ? '#dcfce7' : '#fee2e2';
      ctx.strokeStyle = item.status === 'Invertible' ? '#16a34a' : '#ef4444';
      ctx.lineWidth = 2;
      drawRoundedRect(rightX - 46, y - 22, 92, 44, 8);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = item.status === 'Invertible' ? '#166534' : '#991b1b';
      ctx.font = '800 13px Quicksand, sans-serif';
      ctx.fillText(label, rightX, y + 5);
    });
    setReadouts([
      `<strong>Decision:</strong> ${item.status}`,
      `<strong>Reason:</strong> ${escapeHtml(item.note)}`
    ]);
  };

  function render() {
    if (!ctx) return;
    if (shellEl) shellEl.classList.toggle('is-narrow', shellEl.clientWidth < 740);
    if (demoType === 'energy_cross_term') renderEnergyCrossTerm();
    else if (demoType === 'step_window_composer') renderStepWindow();
    else if (demoType === 'impulse_unit_area_limit') renderImpulseUnitAreaLimit();
    else if (demoType === 'impulse_sifting') renderImpulseSifting();
    else if (demoType === 'invertibility_tester') renderInvertibilityTester();
  }

  if (demoType === 'energy_cross_term') {
    addRange('shift', 'Shift of y(t)', -3, 3, 0.1, 0.8);
  } else if (demoType === 'step_window_composer') {
    addRange('start', 'Start a', -4, 4, 0.5, 2);
    addRange('end', 'End b', -3, 5, 0.5, 4);
  } else if (demoType === 'impulse_unit_area_limit') {
    addRange('alpha', 'Sharpness alpha', 1, 50, 1, 3);
    addSelect('shape', 'Pulse shape', [
      { value: 'rectangular', label: 'Rectangular' },
      { value: 'triangular', label: 'Triangular' },
      { value: 'exponential', label: 'Exponential' },
      { value: 'gaussian', label: 'Gaussian' }
    ], 'rectangular');
  } else if (demoType === 'impulse_sifting') {
    const formControl = addSelect('form', 'Delta argument', [
      { value: 't_minus_a', label: 'delta(t-a)' },
      { value: 'a_minus_t', label: 'delta(a-t)' },
      { value: 'k_t_minus_b', label: 'delta(kt-b)' }
    ], 'k_t_minus_b');
    const aControl = addRange('a', 'a', -3, 4, 0.5, 2);
    const kControl = addRange('k', 'k', 1, 4, 0.5, 2.5);
    const bControl = addRange('b', 'b', -4, 6, 0.5, 4);
    const updateImpulseSiftingControls = () => {
      const usesScaledArgument = state.form === 'k_t_minus_b';
      aControl.hidden = usesScaledArgument;
      kControl.hidden = !usesScaledArgument;
      bControl.hidden = !usesScaledArgument;
    };
    formControl.querySelector('select')?.addEventListener('change', updateImpulseSiftingControls);
    const originalRender = render;
    render = () => {
      updateImpulseSiftingControls();
      originalRender();
    };
    updateImpulseSiftingControls();
  } else if (demoType === 'invertibility_tester') {
    addSelect('system', 'System', [
      { value: 'reverse', label: 'y(t)=x(-t)' },
      { value: 'affine', label: 'y(t)=x(3t-6)' },
      { value: 'abs', label: 'y(t)=|x(t)|' },
      { value: 'square', label: 'y(t)=x^2(t)' },
      { value: 'multiply_t', label: 'y(t)=t x(t)' }
    ], 'reverse');
  }

  let pendingFrame = 0;
  const rerender = () => {
    if (pendingFrame) return;
    pendingFrame = window.requestAnimationFrame(() => {
      pendingFrame = 0;
      render();
    });
  };
  if (window.ResizeObserver && shellEl) {
    const observer = new ResizeObserver(rerender);
    observer.observe(shellEl);
    node._chapterOneDemoResizeObserver = observer;
  }
  window.addEventListener('resize', rerender, { passive: true });
  render();
}

function hydrateInteractiveDemos(root) {
  if (!root) return;
  const seenDemoKeys = new Set();
  root.querySelectorAll('.kc-interactive-demo').forEach((node) => {
    if (!node || node.dataset.hydrated === '1') return;
    const demo = parseBase64JsonAttr(node.dataset.demoB64 || node.getAttribute('data-demo-b64'));
    if (!demo) return;
    const dedupKey = getInteractiveDemoDedupKey(demo);
    if (dedupKey && seenDemoKeys.has(dedupKey)) {
      node.remove();
      return;
    }
    if (dedupKey) seenDemoKeys.add(dedupKey);

    const demoSpec = getInteractiveDemoSpec(demo);
    const family = inferInteractiveDemoFamily(demo);
    const isMatrixDemo = family === 'matrix_conformability';
    const specControls = Array.isArray(demoSpec.controls) ? demoSpec.controls : [];
    const demoControls = specControls.length ? specControls : (Array.isArray(demo.controls) ? demo.controls : []);
    const demoText = getInteractiveDemoText(demo);
    const isComplexPlaneDemo = demo.type === 'interactive_demo'
      && demoSpec
      && String(demoSpec.framework || '').toLowerCase() === 'react_canvas'
      && demoControls.some((control) => (control.id || control.key) === 'slider_a')
      && demoControls.some((control) => (control.id || control.key) === 'slider_b')
      && /complex number|rectangular|polar|complex plane/i.test(demoText)
      && !/sinusoid|same frequency|cosine wave|phasor sum/i.test(demoText);
    const isPhasorDemo = !isComplexPlaneDemo
      && demo.type === 'interactive_demo'
      && demoSpec
      && String(demoSpec.framework || '').toLowerCase() === 'react_canvas'
      && Array.isArray(demoSpec.panels)
      && demoSpec.panels.some((panel) => panel.id === 'phasor_panel');
    const isSinusoidDemo = demo.demo_type === 'sinusoid_phasor_projection'
      || (demo.type === 'interactive_demo'
        && /sinusoid/i.test(demoText)
        && /phasor|amplitude|frequency|phase/i.test(demoText));
    const isOppositeRotationDemo = family === 'opposite_rotations';
    const chapterOneDemoType = inferChapterOneDemoType(demo);
    const isChapterOneDemo = CHAPTER_ONE_DEMO_TYPES.has(chapterOneDemoType);

    node.dataset.hydrated = '1';

    if (isChapterOneDemo) {
      hydrateChapterOneDemo(node, demo);
      return;
    }

    if (isOppositeRotationDemo) {
      renderOppositeRotationsDemo(node, demo);
      return;
    }

    if (isComplexPlaneDemo) {
      const controls = demoControls;
      const state = Object.create(null);
      controls.forEach((control) => {
        const key = control.id || control.key;
        if (!key) return;
        if (Array.isArray(control.options)) {
          state[key] = control.default || control.options[0] || 'degrees';
          return;
        }
        if (String(control.action || '').startsWith('set ')) return;
        state[key] = Number(control.default ?? control.min ?? 0);
      });
      if (!Object.prototype.hasOwnProperty.call(state, 'slider_a')) state.slider_a = 3;
      if (!Object.prototype.hasOwnProperty.call(state, 'slider_b')) state.slider_b = 4;
      if (!Object.prototype.hasOwnProperty.call(state, 'angle_toggle')) state.angle_toggle = 'degrees';

      node.innerHTML = `
        <section class="complex-demo-shell">
          <div class="complex-demo-head">
            <div class="complex-demo-title">${escapeHtml(demo.title || 'Drag the complex number')}</div>
            <div class="complex-demo-subtitle">${escapeHtml(demo.explanation || 'Connect rectangular form, magnitude, angle, and conjugate on the complex plane.')}</div>
          </div>
          <div class="complex-demo-intro">${decodeInlineMarkdownFragment(demo.content || '')}</div>
          <div class="complex-demo-grid">
            <div class="complex-demo-left">
              <div class="complex-demo-controls"></div>
              <div class="complex-demo-readouts"></div>
            </div>
            <div class="complex-demo-right">
              <div class="complex-demo-canvas-wrap">
                <canvas class="complex-demo-canvas"></canvas>
              </div>
              <div class="complex-demo-legend">
                <span><i class="complex-demo-swatch real"></i>Real part a</span>
                <span><i class="complex-demo-swatch imag"></i>Imaginary part jb</span>
                <span><i class="complex-demo-swatch vector"></i>z = a + jb</span>
                <span><i class="complex-demo-swatch conjugate"></i>z* = a - jb</span>
              </div>
            </div>
          </div>
        </section>
      `;

      const controlsEl = node.querySelector('.complex-demo-controls');
      const readoutsEl = node.querySelector('.complex-demo-readouts');
      const canvas = node.querySelector('.complex-demo-canvas');
      const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
      const shellEl = node.querySelector('.complex-demo-shell');
      const formatNum = (value) => {
        if (!Number.isFinite(value)) return '0';
        return Number((Math.abs(value) < 1e-9 ? 0 : value).toFixed(3)).toString();
      };
      const getA = () => Number(state.slider_a ?? 0);
      const getB = () => Number(state.slider_b ?? 0);
      const getR = () => Math.hypot(getA(), getB());
      const getThetaRad = () => Math.atan2(getB(), getA());
      const getThetaDeg = () => (getThetaRad() * 180) / Math.PI;
      const formatAngle = () => (
        state.angle_toggle === 'radians'
          ? `${formatNum(getThetaRad())} rad`
          : `${formatNum(getThetaDeg())}°`
      );
      const formatComplex = (a, b) => `${formatNum(a)} ${b < 0 ? '-' : '+'} j${formatNum(Math.abs(b))}`;

      const sizeCanvas = () => {
        if (!canvas || !ctx) return { width: 0, height: 0 };
        const dpr = Math.max(window.devicePixelRatio || 1, 1);
        const rect = canvas.getBoundingClientRect();
        const width = Math.max(Math.floor(rect.width || 0), 320);
        const height = Math.max(300, Math.min(430, Math.floor(width * 0.58)));
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = '100%';
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return { width, height };
      };

      const drawArrow = (x1, y1, x2, y2, color, width = 3, dashed = false) => {
        const angle = Math.atan2(y2 - y1, x2 - x1);
        ctx.save();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = width;
        if (dashed) ctx.setLineDash([7, 6]);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        if (!dashed) {
          ctx.beginPath();
          ctx.moveTo(x2, y2);
          ctx.lineTo(x2 - 11 * Math.cos(angle - Math.PI / 6), y2 - 11 * Math.sin(angle - Math.PI / 6));
          ctx.lineTo(x2 - 11 * Math.cos(angle + Math.PI / 6), y2 - 11 * Math.sin(angle + Math.PI / 6));
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      };

      const drawComplexPlane = () => {
        if (!ctx) return;
        const { width, height } = sizeCanvas();
        const a = getA();
        const b = getB();
        const maxCoord = Math.max(5, Math.ceil(Math.max(Math.abs(a), Math.abs(b), getR())));
        const pad = 44;
        const ox = width / 2;
        const oy = height / 2;
        const scale = Math.min((width - pad * 2) / (maxCoord * 2.2), (height - pad * 2) / (maxCoord * 2.2));
        const px = ox + a * scale;
        const py = oy - b * scale;
        const cy = oy + b * scale;

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        for (let x = ox % scale; x < width; x += scale) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = oy % scale; y < height; y += scale) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.7;
        ctx.beginPath();
        ctx.moveTo(24, oy);
        ctx.lineTo(width - 24, oy);
        ctx.moveTo(ox, 22);
        ctx.lineTo(ox, height - 22);
        ctx.stroke();
        ctx.fillStyle = '#64748b';
        ctx.font = '700 14px Quicksand, sans-serif';
        ctx.fillText('Re', width - 46, oy - 10);
        ctx.fillText('Im', ox + 10, 34);

        drawArrow(ox, oy, px, oy, '#2563eb', 3);
        drawArrow(px, oy, px, py, '#0f766e', 3);
        drawArrow(ox, oy, px, py, '#dc2626', 3.4);
        drawArrow(ox, oy, px, cy, '#a855f7', 2.2, true);

        ctx.fillStyle = '#2563eb';
        ctx.fillText('a', (ox + px) / 2 - 5, oy - 12);
        ctx.fillStyle = '#0f766e';
        ctx.fillText(`${b < 0 ? '-' : ''}jb`, px + 9, (oy + py) / 2);
        ctx.fillStyle = '#dc2626';
        ctx.fillText('z', (ox + px) / 2 + 10, (oy + py) / 2 - 10);
        ctx.fillStyle = '#a855f7';
        ctx.fillText('z*', (ox + px) / 2 + 10, (oy + cy) / 2 + 18);

        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#a855f7';
        ctx.beginPath();
        ctx.arc(px, cy, 4, 0, Math.PI * 2);
        ctx.fill();
      };

      const renderComplexDemo = () => {
        if (shellEl) shellEl.classList.toggle('is-narrow', shellEl.clientWidth < 760);
        drawComplexPlane();
        const a = getA();
        const b = getB();
        readoutsEl.innerHTML = `
          <div class="complex-demo-readout"><strong>Rectangular:</strong> \\(z = ${formatComplex(a, b)}\\)</div>
          <div class="complex-demo-readout"><strong>Polar:</strong> \\(z = ${formatNum(getR())}e^{j${formatAngle()}}\\)</div>
          <div class="complex-demo-readout"><strong>Magnitude:</strong> \\(r = ${formatNum(getR())}\\)</div>
          <div class="complex-demo-readout"><strong>Argument:</strong> \\(\\theta = ${formatAngle()}\\)</div>
          <div class="complex-demo-readout"><strong>Conjugate:</strong> \\(z^* = ${formatComplex(a, -b)}\\)</div>
        `;
        if (window.typesetMath) window.typesetMath(node).catch(() => {});
      };

      controls.forEach((control) => {
        const key = control.id || control.key;
        if (!key || String(control.action || '').startsWith('set ')) return;
        const wrap = document.createElement('label');
        wrap.className = 'complex-demo-control';
        const label = document.createElement('span');
        label.className = 'complex-demo-control-label';
        label.textContent = control.label || key;
        wrap.appendChild(label);

        if (Array.isArray(control.options)) {
          const select = document.createElement('select');
          select.className = 'complex-demo-select';
          control.options.forEach((option) => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            if (state[key] === option) opt.selected = true;
            select.appendChild(opt);
          });
          select.addEventListener('change', () => {
            state[key] = select.value;
            renderComplexDemo();
          });
          wrap.appendChild(select);
        } else {
          const row = document.createElement('div');
          row.className = 'complex-demo-slider-row';
          const input = document.createElement('input');
          input.type = 'range';
          input.min = String(control.min ?? -5);
          input.max = String(control.max ?? 5);
          input.step = String(control.step ?? 0.1);
          input.value = String(state[key]);
          const value = document.createElement('span');
          value.className = 'complex-demo-slider-value';
          value.textContent = formatNum(state[key]);
          input.addEventListener('input', () => {
            state[key] = Number(input.value);
            value.textContent = formatNum(state[key]);
            renderComplexDemo();
          });
          row.appendChild(input);
          row.appendChild(value);
          wrap.appendChild(row);
        }
        controlsEl.appendChild(wrap);
      });

      controls
        .filter((control) => String(control.action || '').startsWith('set '))
        .forEach((control) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'complex-demo-reset';
          btn.textContent = control.label || 'Reset';
          btn.addEventListener('click', () => {
            controls.forEach((item) => {
              const key = item.id || item.key;
              if (!key || String(item.action || '').startsWith('set ')) return;
              if (Array.isArray(item.options)) state[key] = item.default || item.options[0] || 'degrees';
              else state[key] = Number(item.default ?? item.min ?? 0);
            });
            controlsEl.querySelectorAll('.complex-demo-control').forEach((controlEl) => {
              const label = controlEl.querySelector('.complex-demo-control-label')?.textContent || '';
              const spec = controls.find((item) => (item.label || item.id || item.key) === label);
              const key = spec && (spec.id || spec.key);
              if (!key) return;
              const input = controlEl.querySelector('input, select');
              const value = controlEl.querySelector('.complex-demo-slider-value');
              if (input) input.value = String(state[key]);
              if (value) value.textContent = formatNum(state[key]);
            });
            renderComplexDemo();
          });
          controlsEl.appendChild(btn);
        });

      let pendingComplexFrame = 0;
      const rerender = () => {
        if (pendingComplexFrame) return;
        pendingComplexFrame = window.requestAnimationFrame(() => {
          pendingComplexFrame = 0;
          renderComplexDemo();
        });
      };
      if (window.ResizeObserver && shellEl) {
        const observer = new ResizeObserver(rerender);
        observer.observe(shellEl);
        node._complexResizeObserver = observer;
      }
      window.addEventListener('resize', rerender, { passive: true });
      renderComplexDemo();
      return;
    }

    if (isSinusoidDemo) {
      const state = {
        amplitude: 2,
        frequency: 1,
        phase: Math.PI / 3,
        running: true,
        start: performance.now(),
        pausedAt: 0
      };

      node.innerHTML = `
        <section class="sinusoid-demo-shell">
          <div class="sinusoid-demo-head">
            <div>
              <div class="sinusoid-demo-title">${escapeHtml(demo.title || 'Interactive sinusoid and phasor demo')}</div>
              <div class="sinusoid-demo-subtitle">The rotating phasor's horizontal projection is the cosine waveform.</div>
            </div>
            <button type="button" class="sinusoid-demo-play" aria-label="Pause or play demo">Pause</button>
          </div>
          <div class="sinusoid-demo-grid">
            <div class="sinusoid-demo-controls">
              <label class="sinusoid-demo-control">
                <span>C amplitude</span>
                <input type="range" min="0.5" max="4" step="0.1" data-demo-control="amplitude" value="2">
                <strong data-demo-value="amplitude">2</strong>
              </label>
              <label class="sinusoid-demo-control">
                <span>f₀ frequency</span>
                <input type="range" min="0.25" max="3" step="0.05" data-demo-control="frequency" value="1">
                <strong data-demo-value="frequency">1</strong>
              </label>
              <label class="sinusoid-demo-control">
                <span>θ phase</span>
                <input type="range" min="-3.14" max="3.14" step="0.05" data-demo-control="phase" value="${Math.PI / 3}">
                <strong data-demo-value="phase">60°</strong>
              </label>
              <button type="button" class="sinusoid-demo-reset">Reset</button>
            </div>
            <div class="sinusoid-demo-stage">
              <canvas class="sinusoid-demo-canvas sinusoid-demo-wave"></canvas>
              <canvas class="sinusoid-demo-canvas sinusoid-demo-phasor"></canvas>
            </div>
          </div>
          <div class="sinusoid-demo-readout">
            <div class="sinusoid-demo-formula"></div>
            <div class="sinusoid-demo-note">Watch the red dot on the real axis. As the vector rotates, that horizontal projection becomes the red dot moving on the cosine wave.</div>
          </div>
        </section>
      `;

      const shell = node.querySelector('.sinusoid-demo-shell');
      const waveCanvas = node.querySelector('.sinusoid-demo-wave');
      const phasorCanvas = node.querySelector('.sinusoid-demo-phasor');
      const waveCtx = waveCanvas && waveCanvas.getContext ? waveCanvas.getContext('2d') : null;
      const phasorCtx = phasorCanvas && phasorCanvas.getContext ? phasorCanvas.getContext('2d') : null;
      const formulaEl = node.querySelector('.sinusoid-demo-formula');
      const playBtn = node.querySelector('.sinusoid-demo-play');
      let lastFormulaHtml = '';

      const formatValue = (value) => Number((Math.abs(value) < 1e-9 ? 0 : value).toFixed(2)).toString();
      const formatPhase = () => `${Math.round((state.phase * 180) / Math.PI)}°`;
      const elapsedSeconds = (now) => state.running
        ? state.pausedAt + ((now - state.start) / 1000)
        : state.pausedAt;
      const sizeCanvas = (canvas, ctx, fallbackHeight) => {
        if (!canvas || !ctx) return { width: 0, height: 0 };
        const dpr = Math.max(window.devicePixelRatio || 1, 1);
        const rect = canvas.getBoundingClientRect();
        const parentWidth = canvas.parentElement ? canvas.parentElement.clientWidth : 0;
        const width = Math.max(Math.floor(rect.width || parentWidth || 0), 180);
        const height = fallbackHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = '100%';
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return { width, height };
      };
      const drawArrow = (ctx, x1, y1, x2, y2, color, width = 3) => {
        const angle = Math.atan2(y2 - y1, x2 - x1);
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - 10 * Math.cos(angle - Math.PI / 6), y2 - 10 * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(x2 - 10 * Math.cos(angle + Math.PI / 6), y2 - 10 * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();
      };
      const drawGrid = (ctx, width, height, left, right, top, bottom, midY) => {
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        for (let x = left; x <= right; x += 44) {
          ctx.beginPath();
          ctx.moveTo(x, top);
          ctx.lineTo(x, bottom);
          ctx.stroke();
        }
        for (let y = top; y <= bottom; y += 34) {
          ctx.beginPath();
          ctx.moveTo(left, y);
          ctx.lineTo(right, y);
          ctx.stroke();
        }
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(left, midY);
        ctx.lineTo(right, midY);
        ctx.stroke();
      };
      const drawDemo = (now = performance.now()) => {
        if (!node.isConnected) return;
        const t = elapsedSeconds(now);
        const omega = 2 * Math.PI * state.frequency;
        const angle = omega * t + state.phase;
        const value = state.amplitude * Math.cos(angle);
        const period = 1 / state.frequency;
        const phaseDeg = Math.round((state.phase * 180) / Math.PI);

        if (formulaEl) {
          const nextFormulaHtml = `\\(x(t) = ${formatValue(state.amplitude)}\\cos(2\\pi\\cdot ${formatValue(state.frequency)}t ${state.phase >= 0 ? '+' : '-'} ${Math.abs(phaseDeg)}^\\circ)\\), \\(T_0=${formatValue(period)}\\text{s}\\)`;
          if (nextFormulaHtml !== lastFormulaHtml) {
            lastFormulaHtml = nextFormulaHtml;
            formulaEl.innerHTML = nextFormulaHtml;
            if (window.typesetMath) window.typesetMath(formulaEl).catch(() => {});
          }
        }

        if (waveCtx) {
          const { width, height } = sizeCanvas(waveCanvas, waveCtx, 260);
          const left = 42;
          const right = width - 18;
          const top = 22;
          const bottom = height - 34;
          const midY = (top + bottom) / 2;
          const yScale = (bottom - top) / 8;
          const windowSeconds = 3;
          waveCtx.clearRect(0, 0, width, height);
          waveCtx.fillStyle = '#ffffff';
          waveCtx.fillRect(0, 0, width, height);
          drawGrid(waveCtx, width, height, left, right, top, bottom, midY);
          waveCtx.strokeStyle = '#0ea5e9';
          waveCtx.lineWidth = 2;
          waveCtx.beginPath();
          for (let i = 0; i <= 360; i += 1) {
            const localT = (i / 360) * windowSeconds;
            const x = left + ((right - left) * i) / 360;
            const y = midY - state.amplitude * Math.cos(omega * localT + state.phase) * yScale;
            if (i === 0) waveCtx.moveTo(x, y);
            else waveCtx.lineTo(x, y);
          }
          waveCtx.stroke();
          const dotT = t % windowSeconds;
          const dotX = left + ((right - left) * dotT) / windowSeconds;
          const dotY = midY - value * yScale;
          waveCtx.strokeStyle = '#ef4444';
          waveCtx.setLineDash([5, 5]);
          waveCtx.beginPath();
          waveCtx.moveTo(dotX, midY);
          waveCtx.lineTo(dotX, dotY);
          waveCtx.stroke();
          waveCtx.setLineDash([]);
          waveCtx.fillStyle = '#ef4444';
          waveCtx.beginPath();
          waveCtx.arc(dotX, dotY, 6, 0, Math.PI * 2);
          waveCtx.fill();
          waveCtx.fillStyle = '#475569';
          waveCtx.font = '700 13px Quicksand, sans-serif';
          waveCtx.fillText('cosine wave', left, top + 16);
          waveCtx.fillText('t', right - 8, midY - 8);
          waveCtx.fillText('x(t)', left + 6, top + 2);
        }

        if (phasorCtx) {
          const phasorRect = phasorCanvas.getBoundingClientRect();
          const phasorHeight = Math.max(240, Math.min(300, Math.floor(phasorRect.width || 260)));
          const { width, height } = sizeCanvas(phasorCanvas, phasorCtx, phasorHeight);
          const cx = width / 2;
          const cy = height / 2 + 4;
          const radius = Math.min(width, height) * 0.32;
          const px = cx + radius * Math.cos(angle);
          const py = cy - radius * Math.sin(angle);
          const projX = cx + radius * Math.cos(angle);
          phasorCtx.clearRect(0, 0, width, height);
          phasorCtx.fillStyle = '#ffffff';
          phasorCtx.fillRect(0, 0, width, height);
          phasorCtx.strokeStyle = '#dbeafe';
          phasorCtx.lineWidth = 2;
          phasorCtx.beginPath();
          phasorCtx.arc(cx, cy, radius, 0, Math.PI * 2);
          phasorCtx.stroke();
          phasorCtx.strokeStyle = '#94a3b8';
          phasorCtx.lineWidth = 1.5;
          phasorCtx.beginPath();
          phasorCtx.moveTo(cx - radius - 18, cy);
          phasorCtx.lineTo(cx + radius + 18, cy);
          phasorCtx.moveTo(cx, cy - radius - 18);
          phasorCtx.lineTo(cx, cy + radius + 18);
          phasorCtx.stroke();
          phasorCtx.strokeStyle = '#ef4444';
          phasorCtx.setLineDash([5, 5]);
          phasorCtx.beginPath();
          phasorCtx.moveTo(px, py);
          phasorCtx.lineTo(projX, cy);
          phasorCtx.stroke();
          phasorCtx.setLineDash([]);
          drawArrow(phasorCtx, cx, cy, px, py, '#1d4ed8', 3);
          phasorCtx.fillStyle = '#ef4444';
          phasorCtx.beginPath();
          phasorCtx.arc(projX, cy, 6, 0, Math.PI * 2);
          phasorCtx.fill();
          phasorCtx.fillStyle = '#475569';
          phasorCtx.font = '700 13px Quicksand, sans-serif';
          phasorCtx.fillText('phasor inset', 16, 24);
          phasorCtx.fillText('Re projection', cx - 38, cy + radius + 28);
        }
      };
      const updateControlLabels = () => {
        node.querySelector('[data-demo-value="amplitude"]').textContent = formatValue(state.amplitude);
        node.querySelector('[data-demo-value="frequency"]').textContent = formatValue(state.frequency);
        node.querySelector('[data-demo-value="phase"]').textContent = formatPhase();
      };
      node.querySelectorAll('[data-demo-control]').forEach((input) => {
        input.addEventListener('input', () => {
          const key = input.dataset.demoControl;
          state[key] = Number(input.value);
          updateControlLabels();
          drawDemo();
        });
      });
      node.querySelector('.sinusoid-demo-reset')?.addEventListener('click', () => {
        state.amplitude = 2;
        state.frequency = 1;
        state.phase = Math.PI / 3;
        node.querySelector('[data-demo-control="amplitude"]').value = String(state.amplitude);
        node.querySelector('[data-demo-control="frequency"]').value = String(state.frequency);
        node.querySelector('[data-demo-control="phase"]').value = String(state.phase);
        state.start = performance.now();
        state.pausedAt = 0;
        updateControlLabels();
        drawDemo();
      });
      playBtn?.addEventListener('click', () => {
        if (state.running) {
          state.pausedAt = elapsedSeconds(performance.now());
          state.running = false;
          playBtn.textContent = 'Play';
        } else {
          state.start = performance.now();
          state.running = true;
          playBtn.textContent = 'Pause';
        }
      });
      let pendingFrame = 0;
      const rerender = () => {
        if (pendingFrame) return;
        pendingFrame = window.requestAnimationFrame(() => {
          pendingFrame = 0;
          drawDemo();
        });
      };
      if (window.ResizeObserver && shell) {
        const observer = new ResizeObserver(rerender);
        observer.observe(shell);
        node._sinusoidResizeObserver = observer;
      }
      const tick = (now) => {
        if (!node.isConnected) return;
        drawDemo(now);
        window.requestAnimationFrame(tick);
      };
      updateControlLabels();
      window.requestAnimationFrame(tick);
      return;
    }

    if (isPhasorDemo) {
      const spec = demoSpec || {};
      const controls = Array.isArray(spec.controls) ? spec.controls : [];
      const state = Object.create(null);
      controls.forEach((control) => {
        const key = control.id || control.key;
        if (!key) return;
        if (Array.isArray(control.options)) {
          state[key] = control.default || control.options[0] || 'degrees';
          return;
        }
        if (String(control.action || '').startsWith('set ')) return;
        state[key] = Number(control.default ?? control.min ?? 0);
      });
      if (!Object.prototype.hasOwnProperty.call(state, 'slider_a')) state.slider_a = 1;
      if (!Object.prototype.hasOwnProperty.call(state, 'slider_b')) state.slider_b = -1.732;
      if (!Object.prototype.hasOwnProperty.call(state, 'angle_toggle')) state.angle_toggle = 'degrees';

      node.innerHTML = `
        <section class="phasor-demo-shell">
          <div class="phasor-demo-head">
            <div class="phasor-demo-title">${escapeHtml(demo.title || 'Interactive demo')}</div>
            <div class="phasor-demo-subtitle">${escapeHtml(demo.explanation || '')}</div>
          </div>
          <div class="phasor-demo-intro">${decodeInlineMarkdownFragment(demo.content || '')}</div>
          <div class="phasor-demo-grid">
            <div class="phasor-demo-left">
              <div class="phasor-demo-controls"></div>
              <div class="phasor-demo-readouts"></div>
              <div class="phasor-demo-formula"></div>
            </div>
            <div class="phasor-demo-right">
              <div class="phasor-demo-canvas-wrap">
                <canvas class="phasor-demo-canvas phasor-demo-plane"></canvas>
              </div>
              <div class="phasor-demo-canvas-wrap">
                <canvas class="phasor-demo-canvas phasor-demo-wave"></canvas>
              </div>
            </div>
          </div>
        </section>
      `;

      const controlsEl = node.querySelector('.phasor-demo-controls');
      const readoutsEl = node.querySelector('.phasor-demo-readouts');
      const formulaEl = node.querySelector('.phasor-demo-formula');
      const planeCanvas = node.querySelector('.phasor-demo-plane');
      const waveCanvas = node.querySelector('.phasor-demo-wave');
      const planeCtx = planeCanvas && planeCanvas.getContext ? planeCanvas.getContext('2d') : null;
      const waveCtx = waveCanvas && waveCanvas.getContext ? waveCanvas.getContext('2d') : null;
      const shellEl = node.querySelector('.phasor-demo-shell');

      const toRadians = (deg) => (deg * Math.PI) / 180;
      const formatNum = (value) => {
        if (!Number.isFinite(value)) return '0';
        const rounded = Math.abs(value) < 1e-9 ? 0 : value;
        return Number(rounded.toFixed(3)).toString();
      };
      const getA = () => Number(state.slider_a ?? 1);
      const getB = () => Number(state.slider_b ?? -1.732);
      const getThetaRad = () => Math.atan2(-getB(), getA());
      const getThetaDeg = () => (getThetaRad() * 180) / Math.PI;
      const getC = () => Math.sqrt((getA() ** 2) + (getB() ** 2));
      const formatAngle = () => {
        const deg = getThetaDeg();
        if (state.angle_toggle === 'radians') return `${formatNum(getThetaRad())} rad`;
        return `${formatNum(deg)}°`;
      };

      const sizeCanvas = (canvas, ctx, height) => {
        if (!canvas || !ctx) return { width: 0, height: 0 };
        const dpr = Math.max(window.devicePixelRatio || 1, 1);
        const parentEl = canvas.parentElement;
        const parentStyle = parentEl ? window.getComputedStyle(parentEl) : null;
        const horizontalPadding = parentStyle
          ? (parseFloat(parentStyle.paddingLeft) || 0) + (parseFloat(parentStyle.paddingRight) || 0)
          : 0;
        const availableWidth = Math.floor((parentEl ? parentEl.clientWidth : 0) - horizontalPadding);
        const width = Math.max(availableWidth || 0, 160);
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = '100%';
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return { width, height };
      };

      const drawArrow = (ctx, x1, y1, x2, y2, color) => {
        const headLength = 10;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const angle = Math.atan2(dy, dx);
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - headLength * Math.cos(angle - Math.PI / 6), y2 - headLength * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(x2 - headLength * Math.cos(angle + Math.PI / 6), y2 - headLength * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();
      };

      const drawPlane = () => {
        if (!planeCtx) return;
        const { width, height } = sizeCanvas(planeCanvas, planeCtx, 320);
        planeCtx.clearRect(0, 0, width, height);
        planeCtx.fillStyle = '#ffffff';
        planeCtx.fillRect(0, 0, width, height);
        const originX = width * 0.28;
        const originY = height * 0.72;
        const scale = Math.min(width, height) / 14;
        planeCtx.strokeStyle = '#cbd5e1';
        planeCtx.lineWidth = 1.5;
        planeCtx.beginPath();
        planeCtx.moveTo(32, originY);
        planeCtx.lineTo(width - 18, originY);
        planeCtx.moveTo(originX, 20);
        planeCtx.lineTo(originX, height - 24);
        planeCtx.stroke();

        planeCtx.fillStyle = '#64748b';
        planeCtx.font = '600 14px Inter, sans-serif';
        planeCtx.fillText('Re', width - 34, originY - 10);
        planeCtx.fillText('Im', originX + 10, 30);

        const a = getA();
        const b = getB();
        const px = originX + a * scale;
        const py = originY + b * scale;
        const projY = originY;

        drawArrow(planeCtx, originX, originY, px, projY, '#1d4ed8');
        drawArrow(planeCtx, px, projY, px, py, '#0f766e');
        drawArrow(planeCtx, originX, originY, px, py, '#dc2626');

        planeCtx.fillStyle = '#1d4ed8';
        planeCtx.fillText('a', (originX + px) / 2, projY - 12);
        planeCtx.fillStyle = '#0f766e';
        planeCtx.fillText('-jb', px + 8, (projY + py) / 2);
        planeCtx.fillStyle = '#dc2626';
        planeCtx.fillText('C∠θ', (originX + px) / 2 + 10, (originY + py) / 2 - 10);

        planeCtx.beginPath();
        planeCtx.fillStyle = '#0f172a';
        planeCtx.arc(px, py, 4, 0, Math.PI * 2);
        planeCtx.fill();
      };

      const drawWave = () => {
        if (!waveCtx) return;
        const { width, height } = sizeCanvas(waveCanvas, waveCtx, 220);
        waveCtx.clearRect(0, 0, width, height);
        waveCtx.fillStyle = '#ffffff';
        waveCtx.fillRect(0, 0, width, height);
        const midY = height / 2;
        const left = 24;
        const right = width - 18;
        const top = 18;
        const bottom = height - 24;
        waveCtx.strokeStyle = '#cbd5e1';
        waveCtx.lineWidth = 1.5;
        waveCtx.beginPath();
        waveCtx.moveTo(left, midY);
        waveCtx.lineTo(right, midY);
        waveCtx.moveTo(left, top);
        waveCtx.lineTo(left, bottom);
        waveCtx.stroke();

        const a = getA();
        const b = getB();
        const c = getC();
        const theta = getThetaRad();
        const drawCurve = (fn, color) => {
          waveCtx.beginPath();
          waveCtx.strokeStyle = color;
          waveCtx.lineWidth = 2.5;
          for (let i = 0; i <= 240; i += 1) {
            const t = (i / 240) * Math.PI * 2;
            const x = left + ((right - left) * i) / 240;
            const y = midY - fn(t) * (height * 0.18);
            if (i === 0) waveCtx.moveTo(x, y);
            else waveCtx.lineTo(x, y);
          }
          waveCtx.stroke();
        };
        drawCurve((t) => a * Math.cos(t), '#1d4ed8');
        drawCurve((t) => b * Math.sin(t), '#0f766e');
        drawCurve((t) => c * Math.cos(t + theta), '#dc2626');
      };

      const renderPhasor = () => {
        if (shellEl) {
          shellEl.classList.toggle('is-narrow', shellEl.clientWidth < 760);
        }
        drawPlane();
        drawWave();
        const a = getA();
        const b = getB();
        const c = getC();
        readoutsEl.innerHTML = `
          <div class="phasor-demo-readout"><strong>Phasor:</strong> \\(${formatNum(a)} - j(${formatNum(b)})\\)</div>
          <div class="phasor-demo-readout"><strong>Amplitude:</strong> \\(C = ${formatNum(c)}\\)</div>
          <div class="phasor-demo-readout"><strong>Phase:</strong> \\(\\theta = ${formatAngle()}\\)</div>
        `;
        formulaEl.innerHTML = `
          <div class="phasor-demo-formula-main">\\(x(t) = ${formatNum(c)}\\cos(\\omega_0 t ${getThetaDeg() >= 0 ? '+' : '-'} ${formatNum(Math.abs(state.angle_toggle === 'radians' ? getThetaRad() : getThetaDeg()))}${state.angle_toggle === 'radians' ? '' : '^\\circ'})\\)</div>
          <div class="phasor-demo-formula-sub">Same frequency, new amplitude and phase only.</div>
        `;
        if (window.typesetMath) {
          window.typesetMath(node).catch(() => {});
        }
      };

      controls.forEach((control) => {
        const key = control.id || control.key;
        if (!key || String(control.action || '').startsWith('set ')) return;
        const wrap = document.createElement('label');
        wrap.className = 'phasor-demo-control';
        const label = document.createElement('span');
        label.className = 'phasor-demo-control-label';
        label.textContent = control.label || key;
        wrap.appendChild(label);

        if (Array.isArray(control.options)) {
          const select = document.createElement('select');
          select.className = 'phasor-demo-select';
          control.options.forEach((option) => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            if (state[key] === option) opt.selected = true;
            select.appendChild(opt);
          });
          select.addEventListener('change', () => {
            state[key] = select.value;
            renderPhasor();
          });
          wrap.appendChild(select);
        } else {
          const row = document.createElement('div');
          row.className = 'phasor-demo-slider-row';
          const input = document.createElement('input');
          input.type = 'range';
          input.min = String(control.min ?? -5);
          input.max = String(control.max ?? 5);
          input.step = String(control.step ?? 0.1);
          input.value = String(state[key]);
          const value = document.createElement('span');
          value.className = 'phasor-demo-slider-value';
          value.textContent = formatNum(state[key]);
          input.addEventListener('input', () => {
            state[key] = Number(input.value);
            value.textContent = formatNum(state[key]);
            renderPhasor();
          });
          row.appendChild(input);
          row.appendChild(value);
          wrap.appendChild(row);
        }
        controlsEl.appendChild(wrap);
      });

      controls
        .filter((control) => String(control.action || '').startsWith('set '))
        .forEach((control) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'phasor-demo-reset';
          btn.textContent = control.label || 'Reset';
          btn.addEventListener('click', () => {
            state.slider_a = 1;
            state.slider_b = -1.732;
            const sliders = controlsEl.querySelectorAll('input[type="range"]');
            sliders.forEach((input) => {
              if (input.closest('.phasor-demo-control')?.querySelector('.phasor-demo-control-label')?.textContent === 'a') {
                input.value = String(state.slider_a);
                const value = input.parentElement.querySelector('.phasor-demo-slider-value');
                if (value) value.textContent = formatNum(state.slider_a);
              }
              if (input.closest('.phasor-demo-control')?.querySelector('.phasor-demo-control-label')?.textContent === 'b') {
                input.value = String(state.slider_b);
                const value = input.parentElement.querySelector('.phasor-demo-slider-value');
                if (value) value.textContent = formatNum(state.slider_b);
              }
            });
            renderPhasor();
          });
          controlsEl.appendChild(btn);
        });

      let pendingPhasorFrame = 0;
      const rerender = () => {
        if (pendingPhasorFrame) return;
        pendingPhasorFrame = window.requestAnimationFrame(() => {
          pendingPhasorFrame = 0;
          renderPhasor();
        });
      };
      if (window.ResizeObserver && shellEl) {
        const observer = new ResizeObserver(rerender);
        observer.observe(shellEl);
        node._phasorResizeObserver = observer;
      }
      window.addEventListener('resize', rerender, { passive: true });
      renderPhasor();
      return;
    }

    if (family === 'signal_transform') {
      renderSignalTransformFallback(node, demo);
      return;
    }

    if (family === 'energy_power') {
      renderEnergyPowerFallback(node, demo);
      return;
    }

    if (family === 'sampling_quantization') {
      renderSamplingQuantizationFallback(node, demo);
      return;
    }

    if (family === 'system_property') {
      renderSystemPropertyFallback(node, demo);
      return;
    }

    if (family === 'exponential_envelope') {
      renderExponentialEnvelopeFallback(node, demo);
      return;
    }

    if (family === 'matrix_locator') {
      renderMatrixLocatorFallback(node, demo);
      return;
    }

    if (family === 'parameter_response') {
      renderParameterResponseFallback(node, demo);
      return;
    }

    if (family === 'pointwise_multiplication') {
      renderPointwiseMultiplicationFallback(node, demo);
      return;
    }

    if (family === 'convolution_lab') {
      renderConvolutionLabDemo(node, demo);
      return;
    }

    if (family === 'pole_zero_roc_lab') {
      renderPoleZeroRocLabDemo(node, demo);
      return;
    }

    if (family === 'frequency_response_lab') {
      renderFrequencyResponseLabDemo(node, demo);
      return;
    }

    if (family === 'transform_rule_lab') {
      renderTransformRuleLabDemo(node, demo);
      return;
    }

    if (family === 'sequence_system_lab') {
      renderSequenceSystemLabDemo(node, demo);
      return;
    }

    if (!isMatrixDemo) {
      renderBriefDemoFallback(node, demo, family);
      return;
    }

    const controls = demoControls.length ? demoControls.map(normalizeInteractiveDemoControl) : [
      { key: 'rowsA', label: 'rows of A', min: 1, max: 5, step: 1, default: 2 },
      { key: 'colsA', label: 'cols of A', min: 1, max: 5, step: 1, default: 3 },
      { key: 'rowsB', label: 'rows of B', min: 1, max: 5, step: 1, default: 3 },
      { key: 'colsB', label: 'cols of B', min: 1, max: 5, step: 1, default: 2 }
    ];
    const state = Object.create(null);
    controls.forEach((control) => {
      const labelText = String(control.label || control.key || '').toLowerCase();
      const mappedKey = labelText.includes('rows of a') || /^m\b/.test(labelText)
        ? 'rowsA'
        : labelText.includes('cols of a') || labelText.includes('cols of a = rows of b') || /^n\b/.test(labelText)
          ? 'colsA'
          : labelText.includes('rows of b') || labelText.includes('override rows of b')
            ? 'rowsB'
            : labelText.includes('cols of b') || /^p\b/.test(labelText)
              ? 'colsB'
              : control.key;
      control.key = mappedKey;
      const defaultValue = control.default ?? (mappedKey === 'rowsA' ? 2 : mappedKey === 'colsA' ? 3 : mappedKey === 'rowsB' ? 3 : mappedKey === 'colsB' ? 2 : control.min ?? 1);
      state[mappedKey] = Number(defaultValue);
    });
    if (!Number.isFinite(Number(state.rowsA))) state.rowsA = 2;
    if (!Number.isFinite(Number(state.colsA))) state.colsA = 3;
    if (!Number.isFinite(Number(state.rowsB))) state.rowsB = 3;
    if (!Number.isFinite(Number(state.colsB))) state.colsB = 2;

    node.innerHTML = `
      <section class="matrix-demo-shell">
        <div class="matrix-demo-head">
          <div class="matrix-demo-title">${escapeHtml(demo.title || 'Interactive demo')}</div>
          <div class="matrix-demo-subtitle">${escapeHtml(demo.learning_objective || '')}</div>
        </div>
        <div class="matrix-demo-controls"></div>
        <div class="matrix-demo-stage">
          <canvas class="matrix-demo-canvas"></canvas>
        </div>
        <div class="matrix-demo-status"></div>
        <div class="matrix-demo-formula"></div>
        <div class="matrix-demo-observe">
          ${(Array.isArray(demo.observe) ? demo.observe : []).map((item) => `<div class="matrix-demo-observe-item">${escapeHtml(item)}</div>`).join('')}
        </div>
        <div class="matrix-demo-task">${escapeHtml(demo.student_task || '')}</div>
      </section>
    `;

    const controlsEl = node.querySelector('.matrix-demo-controls');
    const canvas = node.querySelector('.matrix-demo-canvas');
    const statusEl = node.querySelector('.matrix-demo-status');
    const formulaEl = node.querySelector('.matrix-demo-formula');
    const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;

    const buildMatrix = (rows, cols, start = 1) =>
      Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => start + r * cols + c)
      );

    const computeEntry = (A, B, rowIndex, colIndex) => {
      const terms = [];
      let total = 0;
      for (let k = 0; k < A[0].length; k += 1) {
        const left = A[rowIndex][k];
        const right = B[k][colIndex];
        terms.push({ left, right, product: left * right });
        total += left * right;
      }
      return { total, terms };
    };

    const ensureCanvasResolution = () => {
      if (!canvas || !ctx) return null;
      const dpr = Math.max(window.devicePixelRatio || 1, 1);
      const width = Math.max(Math.floor(node.clientWidth - 32), 820);
      const height = 420;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { width, height };
    };

    const drawMatrix = (x, y, rows, cols, label, opts = {}) => {
      const cell = opts.cell || 44;
      const values = opts.values || null;
      const highlightRow = Number.isInteger(opts.highlightRow) ? opts.highlightRow : -1;
      const highlightCol = Number.isInteger(opts.highlightCol) ? opts.highlightCol : -1;
      const highlightCell = opts.highlightCell || null;
      const width = cols * cell;
      const height = rows * cell;

      ctx.save();
      ctx.fillStyle = '#0f172a';
      ctx.font = '600 18px Inter, sans-serif';
      ctx.fillText(label, x, y - 14);

      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const cx = x + c * cell;
          const cy = y + r * cell;
          const rowActive = r === highlightRow;
          const colActive = c === highlightCol;
          const cellActive = highlightCell && highlightCell.row === r && highlightCell.col === c;

          ctx.fillStyle = cellActive
            ? 'rgba(37, 99, 235, 0.18)'
            : rowActive
              ? 'rgba(20, 184, 166, 0.14)'
              : colActive
                ? 'rgba(99, 102, 241, 0.14)'
                : '#ffffff';
          ctx.fillRect(cx, cy, cell, cell);
          ctx.strokeStyle = cellActive ? '#2563eb' : 'rgba(148,163,184,0.95)';
          ctx.lineWidth = cellActive ? 2 : 1;
          ctx.strokeRect(cx, cy, cell, cell);

          const text = values ? String(values[r][c]) : '';
          ctx.fillStyle = '#0f172a';
          ctx.font = '500 17px Inter, sans-serif';
          const metrics = ctx.measureText(text);
          ctx.fillText(text, cx + (cell - metrics.width) / 2, cy + cell / 2 + 6);
        }
      }

      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x - 10, y);
      ctx.lineTo(x - 10, y + height);
      ctx.moveTo(x + width + 10, y);
      ctx.lineTo(x + width + 10, y + height);
      ctx.stroke();
      ctx.restore();

      return { width, height, cell };
    };

    const render = () => {
      if (!ctx) return;
      const canvasSize = ensureCanvasResolution();
      if (!canvasSize) return;
      const rowsA = getDemoControlValue({ key: 'rowsA', default: 2 }, state);
      const colsA = getDemoControlValue({ key: 'colsA', default: 3 }, state);
      const rowsB = getDemoControlValue({ key: 'rowsB', default: 3 }, state);
      const colsB = getDemoControlValue({ key: 'colsB', default: 2 }, state);
      const valid = colsA === rowsB;
      const focusEntry = Math.max(1, Math.min(getDemoControlValue({ key: 'focusEntry', default: 1 }, state), Math.max(rowsA * colsB, 1)));
      const focusRow = valid ? Math.floor((focusEntry - 1) / colsB) : 0;
      const focusCol = valid ? ((focusEntry - 1) % colsB) : 0;
      const { width, height } = canvasSize;
      const valuesA = buildMatrix(rowsA, colsA, 1);
      const valuesB = buildMatrix(rowsB, colsB, 1);
      const layout = {
        startX: 28,
        topY: 78,
        cell: 44,
        gapAB: 120,
        gapBC: 120
      };

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, width, height);

      const aBox = drawMatrix(layout.startX, layout.topY, rowsA, colsA, 'Matrix A', {
        cell: layout.cell,
        values: valuesA,
        highlightRow: valid ? focusRow : -1
      });
      const bX = layout.startX + aBox.width + layout.gapAB;
      const bBox = drawMatrix(bX, layout.topY, rowsB, colsB, 'Matrix B', {
        cell: layout.cell,
        values: valuesB,
        highlightCol: valid ? focusCol : -1
      });

      ctx.fillStyle = '#0f172a';
      ctx.font = '600 34px Inter, sans-serif';
      ctx.fillText('×', layout.startX + aBox.width + 42, layout.topY + 76);
      ctx.fillText('=', bX + bBox.width + 42, layout.topY + 76);

      const cX = bX + bBox.width + layout.gapBC;
      if (valid) {
        const { total, terms } = computeEntry(valuesA, valuesB, focusRow, focusCol);
        const valuesC = Array.from({ length: rowsA }, (_, r) =>
          Array.from({ length: colsB }, (_, c) => (r === focusRow && c === focusCol ? total : ''))
        );
        drawMatrix(cX, layout.topY, rowsA, colsB, 'Product C = AB', {
          cell: layout.cell,
          values: valuesC,
          highlightCell: { row: focusRow, col: focusCol }
        });

        const expansion = terms.map((t) => `${t.left}×${t.right}`).join(' + ');
        statusEl.innerHTML = `<span class="matrix-demo-pill matrix-demo-pill-good">Valid</span> inner dimensions match: <strong>${colsA}</strong> = <strong>${rowsB}</strong>. Output size is <strong>${rowsA} × ${colsB}</strong>.`;
        formulaEl.innerHTML = `
          <div class="matrix-demo-formula-title">Focused entry</div>
          <div class="matrix-demo-formula-main">\\(c_{${focusRow + 1}${focusCol + 1}} = ${expansion} = ${total}\\)</div>
          <div class="matrix-demo-formula-sub">Row ${focusRow + 1} of \\(A\\) pairs with column ${focusCol + 1} of \\(B\\).</div>
        `;
      } else {
        statusEl.innerHTML = `<span class="matrix-demo-pill matrix-demo-pill-bad">Invalid</span> inner dimensions do not match: <strong>${colsA}</strong> ≠ <strong>${rowsB}</strong>.`;
        formulaEl.innerHTML = `
          <div class="matrix-demo-formula-title">Why it fails</div>
          <div class="matrix-demo-formula-main">\\(AB\\) is undefined because the number of columns of \\(A\\) must equal the number of rows of \\(B\\).</div>
          <div class="matrix-demo-formula-sub">Change \\(colsA\\) or \\(rowsB\\) until the inner dimensions match.</div>
        `;
      }
    };

    controls.forEach((control) => {
      const wrap = document.createElement('label');
      wrap.className = 'matrix-demo-control';
      const label = document.createElement('span');
      label.className = 'matrix-demo-control-label';
      label.textContent = control.label || control.key;
      const input = document.createElement('input');
      input.type = 'range';
      input.min = String(control.min ?? 1);
      input.max = String(control.max ?? 4);
      input.step = String(control.step ?? 1);
      input.value = String(state[control.key]);
      const value = document.createElement('span');
      value.className = 'matrix-demo-control-value';
      value.textContent = String(state[control.key]);
      input.addEventListener('input', () => {
        state[control.key] = Number(input.value);
        value.textContent = input.value;
        render();
      });
      wrap.appendChild(label);
      wrap.appendChild(input);
      wrap.appendChild(value);
      controlsEl.appendChild(wrap);
    });

    const rerender = () => render();
    window.addEventListener('resize', rerender, { passive: true });
    render();
  });
}

function formatInteractiveDemoNumber(value, digits = 2) {
  const num = Number(value);
  if (!Number.isFinite(num)) return '0';
  const clean = Math.abs(num) < 1e-9 ? 0 : num;
  return Number(clean.toFixed(digits)).toString();
}

function getInteractiveDemoIntent(demo = '') {
  return `${getInteractiveDemoTitle(demo, '')} ${getInteractiveDemoText(demo)}`.toLowerCase();
}

function getInteractiveDemoDedupKey(demo = {}) {
  const spec = getInteractiveDemoSpec(demo);
  const pieces = [
    getInteractiveDemoTitle(demo, ''),
    getInteractiveDemoSubtitle(demo),
    demo.page_title,
    demo.caption,
    demo.student_prompt,
    spec.title,
    spec.description,
    spec.note_below_demo,
    spec.student_prompt,
    JSON.stringify(spec.controls || demo.controls || []),
    JSON.stringify(spec.canvas_elements || demo.canvas_elements || []),
    JSON.stringify(spec.implementation_spec || demo.implementation_spec || {})
  ];
  return compactWhitespace(pieces.filter(Boolean).join(' ')).toLowerCase();
}

function isLaplaceFlowTransformDemo(demo = {}) {
  const intent = getInteractiveDemoIntent(demo);
  return /\b(visual recipe|three[-\s]?box flow|time domain to s[-\s]?domain|s[-\s]?domain and back|laplace[-\s]?domain multiplication|transforming x\(t\)|multiply(?:ing)? by h\(s\)|inverse[-\s]?(?:laplace[-\s]?)?transform|x\(s\)\s*h\(s\)|y\(s\)\s*=\s*x\(s\)\s*h\(s\)|ideal delay|ideal differentiator|ideal integrator)\b/i.test(intent);
}

function renderInteractiveLabShell(node, demo, modifier, bodyHtml = '') {
  const title = getInteractiveDemoTitle(demo, 'Interactive demo');
  const subtitle = getInteractiveDemoSubtitle(demo);
  node.innerHTML = `
    <section class="interactive-demo-shell interactive-demo-shell--lab interactive-demo-shell--${escapeHtml(modifier)}">
      <div class="interactive-demo-head">
        <div class="interactive-demo-title">${escapeHtml(title)}</div>
        <div class="interactive-demo-subtitle">${escapeHtml(subtitle || 'Move the controls and connect the graph to the formula.')}</div>
      </div>
      ${bodyHtml}
    </section>
  `;
  return node.querySelector('.interactive-demo-shell');
}

function renderLaplaceFlowTransformDemo(node, demo) {
  const state = { input: 'slow', system: 'delay', delay: 2 };
  const inputs = {
    slow: { label: 'x(t) = e^(-2t)u(t)', x: 'X(s) = 1/(s + 2)', yBase: 'e^(-2t)u(t)', amp: 1, rate: 2 },
    fast: { label: 'x(t) = 3e^(-5t)u(t)', x: 'X(s) = 3/(s + 5)', yBase: '3e^(-5t)u(t)', amp: 3, rate: 5 }
  };
  const systems = {
    delay: { label: 'Ideal Delay', h: 'H(s) = e^(-sT)', y: () => `y(t) = x(t - ${formatInteractiveDemoNumber(state.delay, 1)})`, note: 'Delay multiplies the transform by e^(-sT); the shape is preserved and starts later.' },
    differentiator: { label: 'Ideal Differentiator', h: 'H(s) = s', y: () => 'y(t) = dx(t)/dt', note: 'Differentiation is multiplication by s under zero initial conditions.' },
    integrator: { label: 'Ideal Integrator', h: 'H(s) = 1/s', y: () => 'y(t) = integral from 0 to t of x(tau)d tau', note: 'Integration divides by s, so the output accumulates area over time.' }
  };
  renderInteractiveLabShell(node, demo, 'laplace-flow', `
    <div class="interactive-demo-grid interactive-demo-grid--lab interactive-demo-grid--flow">
      <div class="interactive-demo-controls">
        <label class="interactive-demo-control">
          <span class="interactive-demo-control-label">Input signal</span>
          <select class="interactive-demo-select" data-flow-control="input">
            <option value="slow">${escapeHtml(inputs.slow.label)}</option>
            <option value="fast">${escapeHtml(inputs.fast.label)}</option>
          </select>
        </label>
        <label class="interactive-demo-control">
          <span class="interactive-demo-control-label">System H(s)</span>
          <select class="interactive-demo-select" data-flow-control="system">
            <option value="delay">${escapeHtml(systems.delay.label)}</option>
            <option value="differentiator">${escapeHtml(systems.differentiator.label)}</option>
            <option value="integrator">${escapeHtml(systems.integrator.label)}</option>
          </select>
        </label>
        <label class="interactive-demo-control" data-delay-control>
          <span class="interactive-demo-control-label">Delay T</span>
          <div class="interactive-demo-slider-row"><input data-flow-control="delay" type="range" min="0" max="3" step="0.1" value="${state.delay}"><strong data-value="delay"></strong></div>
        </label>
      </div>
      <div class="interactive-demo-stage interactive-demo-flow-stage">
        <div class="interactive-demo-flow" aria-label="Laplace-domain zero-state flow">
          <div class="interactive-demo-flow-card">
            <span class="interactive-demo-flow-kicker">1. Time domain</span>
            <strong data-flow-text="inputLabel"></strong>
            <small>Start with the actual input signal.</small>
          </div>
          <div class="interactive-demo-flow-arrow">
            <span>L</span>
          </div>
          <div class="interactive-demo-flow-card interactive-demo-flow-card--domain">
            <span class="interactive-demo-flow-kicker">2. s-domain</span>
            <strong data-flow-text="xFormula"></strong>
            <em data-flow-text="hFormula"></em>
            <b data-flow-text="yFormula"></b>
          </div>
          <div class="interactive-demo-flow-arrow">
            <span>L^-1</span>
          </div>
          <div class="interactive-demo-flow-card">
            <span class="interactive-demo-flow-kicker">3. Back to time</span>
            <strong data-flow-text="outputFormula"></strong>
            <small data-flow-text="outputNote"></small>
            <canvas class="interactive-demo-flow-canvas"></canvas>
          </div>
        </div>
      </div>
    </div>
    <div class="interactive-demo-readouts"></div>
  `);
  const canvas = node.querySelector('.interactive-demo-flow-canvas');
  const ctx = canvas?.getContext?.('2d');
  const readoutsEl = node.querySelector('.interactive-demo-readouts');
  const drawSketch = () => {
    if (!canvas || !ctx) return;
    const dpr = Math.max(window.devicePixelRatio || 1, 1);
    const width = Math.max(Math.floor(canvas.parentElement?.clientWidth || 0), 220);
    const height = 112;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = '100%';
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    const left = 18;
    const right = width - 14;
    const baseY = height - 24;
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(left, baseY);
    ctx.lineTo(right, baseY);
    ctx.stroke();
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.beginPath();
    const input = inputs[state.input];
    for (let i = 0; i <= 120; i += 1) {
      const t = i / 120 * 6;
      let value;
      if (state.system === 'integrator') {
        value = 1 - Math.exp(-input.rate * t / 2.6);
      } else if (state.system === 'differentiator') {
        value = Math.exp(-input.rate * t / 3.4) * (1 - t * 0.22);
      } else {
        const shifted = Math.max(t - state.delay, 0);
        value = t < state.delay ? 0 : Math.exp(-input.rate * shifted / 3.4);
      }
      const x = left + (right - left) * i / 120;
      const y = baseY - Math.max(-0.5, Math.min(1.15, value)) * 58;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  };
  const render = () => {
    const input = inputs[state.input] || inputs.slow;
    const system = systems[state.system] || systems.delay;
    const yFormula = state.system === 'delay'
      ? `Y(s) = ${input.x.replace(/^X\(s\)\s*=\s*/, '')} * e^(-s${formatInteractiveDemoNumber(state.delay, 1)})`
      : `Y(s) = X(s) * ${system.h.replace(/^H\(s\)\s*=\s*/, '')}`;
    const delayWrap = node.querySelector('[data-delay-control]');
    if (delayWrap) delayWrap.hidden = state.system !== 'delay';
    node.querySelector('[data-flow-text="inputLabel"]').textContent = input.label;
    node.querySelector('[data-flow-text="xFormula"]').textContent = input.x;
    node.querySelector('[data-flow-text="hFormula"]').textContent = system.h;
    node.querySelector('[data-flow-text="yFormula"]').textContent = yFormula;
    node.querySelector('[data-flow-text="outputFormula"]').textContent = system.y();
    node.querySelector('[data-flow-text="outputNote"]').textContent = system.note;
    const delayValue = node.querySelector('[data-value="delay"]');
    if (delayValue) delayValue.textContent = formatInteractiveDemoNumber(state.delay, 1);
    readoutsEl.innerHTML = `
      <div class="interactive-demo-readout"><strong>Zero-state recipe:</strong> transform the input, multiply by the system transfer function, then invert the product.</div>
      <div class="interactive-demo-readout"><strong>Important:</strong> the system action happens in the middle box as multiplication by H(s), not as pole/ROC selection.</div>
    `;
    drawSketch();
  };
  node.querySelectorAll('[data-flow-control]').forEach((input) => {
    const key = input.dataset.flowControl;
    const update = () => {
      state[key] = input.type === 'range' ? Number(input.value) : input.value;
      render();
    };
    input.addEventListener('input', update);
    input.addEventListener('change', update);
    update();
  });
  window.addEventListener('resize', render, { passive: true });
}

function drawDemoStemSeries(ctx, values, startIndex, toX, originY, scale, color, options = {}) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = options.lineWidth || 2.5;
  values.forEach((value, i) => {
    const n = startIndex + i;
    const x = toX(n);
    const y = originY - value * scale;
    ctx.beginPath();
    ctx.moveTo(x, originY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, options.radius || 4, 0, Math.PI * 2);
    ctx.fill();
    if (options.labels && values.length <= 16) {
      ctx.fillStyle = '#475569';
      ctx.font = '600 11px Quicksand, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(String(n), x, originY + 18);
      ctx.fillStyle = color;
    }
  });
  ctx.restore();
}

function renderConvolutionLabDemo(node, demo) {
  const state = { lengthA: 4, lengthB: 3, startA: 0, startB: 0, n: 2 };
  renderInteractiveLabShell(node, demo, 'convolution', `
    <div class="interactive-demo-grid interactive-demo-grid--lab">
      <div class="interactive-demo-controls">
        <label class="interactive-demo-control"><span class="interactive-demo-control-label">Length of x[n]</span><div class="interactive-demo-slider-row"><input data-control="lengthA" type="range" min="1" max="7" step="1" value="${state.lengthA}"><strong data-value="lengthA"></strong></div></label>
        <label class="interactive-demo-control"><span class="interactive-demo-control-label">Length of h[n]</span><div class="interactive-demo-slider-row"><input data-control="lengthB" type="range" min="1" max="7" step="1" value="${state.lengthB}"><strong data-value="lengthB"></strong></div></label>
        <label class="interactive-demo-control"><span class="interactive-demo-control-label">Start of x[n]</span><div class="interactive-demo-slider-row"><input data-control="startA" type="range" min="-5" max="5" step="1" value="${state.startA}"><strong data-value="startA"></strong></div></label>
        <label class="interactive-demo-control"><span class="interactive-demo-control-label">Start of h[n]</span><div class="interactive-demo-slider-row"><input data-control="startB" type="range" min="-5" max="5" step="1" value="${state.startB}"><strong data-value="startB"></strong></div></label>
        <label class="interactive-demo-control"><span class="interactive-demo-control-label">Inspect output y[n]</span><div class="interactive-demo-slider-row"><input data-control="n" type="range" min="-5" max="12" step="1" value="${state.n}"><strong data-value="n"></strong></div></label>
      </div>
      <div class="interactive-demo-stage"><canvas class="interactive-demo-canvas"></canvas></div>
    </div>
    <div class="interactive-demo-readouts"></div>
  `);
  const canvas = node.querySelector('.interactive-demo-canvas');
  const ctx = canvas?.getContext?.('2d');
  const readoutsEl = node.querySelector('.interactive-demo-readouts');
  const inputs = node.querySelectorAll('[data-control]');

  const convolve = (a, b) => {
    const out = Array(a.length + b.length - 1).fill(0);
    a.forEach((av, i) => b.forEach((bv, j) => { out[i + j] += av * bv; }));
    return out;
  };
  const render = () => {
    const x = Array.from({ length: state.lengthA }, (_, i) => i === 0 ? 1 : 1);
    const h = Array.from({ length: state.lengthB }, (_, i) => state.lengthB - i);
    const y = convolve(x, h);
    const yStart = state.startA + state.startB;
    state.n = Math.max(yStart, Math.min(yStart + y.length - 1, state.n));
    const { width, height } = setupInteractiveDemoCanvas(canvas, ctx, 330, 360);
    if (!width) return;
    const minN = Math.min(state.startA, state.startB, yStart) - 1;
    const maxN = Math.max(state.startA + x.length, state.startB + h.length, yStart + y.length) + 1;
    const rowH = height / 3;
    const maxVal = Math.max(...x, ...h, ...y, 1);
    const drawRow = (label, values, start, row, color, highlightIndex = null) => {
      ctx.save();
      ctx.translate(0, rowH * (row - 1));
      const axes = drawInteractiveDemoAxes(ctx, width, rowH, { minT: minN, maxT: maxN, originY: Math.round(rowH * 0.62), tickStep: 2, pad: 34 });
      ctx.fillStyle = '#0f172a';
      ctx.font = '700 13px Quicksand, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(label, 36, 20);
      drawDemoStemSeries(ctx, values, start, axes.toX, axes.originY, (rowH * 0.43) / maxVal, color, { labels: row === 3 });
      if (Number.isFinite(highlightIndex)) {
        const xPos = axes.toX(highlightIndex);
        ctx.strokeStyle = '#dc2626';
        ctx.setLineDash([6, 5]);
        ctx.beginPath();
        ctx.moveTo(xPos, 18);
        ctx.lineTo(xPos, rowH - 26);
        ctx.stroke();
      }
      ctx.restore();
    };
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#fffefa';
    ctx.fillRect(0, 0, width, height);
    drawRow('x[n]', x, state.startA, 1, '#2563eb');
    drawRow('h[n]', h, state.startB, 2, '#0f766e');
    drawRow('y[n] = x[n] * h[n]', y, yStart, 3, '#b45309', state.n);
    const yValue = y[state.n - yStart] ?? 0;
    const support = `${yStart} <= n <= ${yStart + y.length - 1}`;
    readoutsEl.innerHTML = `
      <div class="interactive-demo-readout"><strong>Support:</strong> ${escapeHtml(support)}. Changing either start index shifts the output support by the same amount.</div>
      <div class="interactive-demo-readout"><strong>Current sample:</strong> \\(y[${state.n}] = ${formatInteractiveDemoNumber(yValue)}\\). The values come from overlap-and-sum, not pointwise multiplication.</div>
    `;
    if (typeof renderMathInElement === 'function') renderMathInElement(readoutsEl);
  };
  inputs.forEach((input) => {
    const key = input.dataset.control;
    const valueEl = node.querySelector(`[data-value="${key}"]`);
    const update = () => {
      state[key] = Number(input.value);
      if (valueEl) valueEl.textContent = formatInteractiveDemoNumber(state[key], 0);
      render();
    };
    input.addEventListener('input', update);
    update();
  });
  window.addEventListener('resize', render, { passive: true });
}

function renderPoleZeroRocLabDemo(node, demo) {
  const intent = getInteractiveDemoIntent(demo);
  const titleIntent = getInteractiveDemoTitle(demo, '').toLowerCase();
  const isZPlane = /\bz[-\s]?plane|z[-\s]?domain|unit circle|z[-\s]?transform|\bz\b/i.test(intent) && !/\blaplace|\bs-plane|\bs-domain|\bs\)/i.test(intent);
  const state = { radius: isZPlane ? 0.72 : 1.1, angle: isZPlane ? 42 : 125, roc: /inside|anti/i.test(titleIntent) ? 'inside' : 'outside' };
  renderInteractiveLabShell(node, demo, 'pole-zero', `
    <div class="interactive-demo-grid interactive-demo-grid--lab">
      <div class="interactive-demo-controls">
        <label class="interactive-demo-control"><span class="interactive-demo-control-label">${isZPlane ? 'Pole radius |z|' : 'Pole distance from origin'}</span><div class="interactive-demo-slider-row"><input data-control="radius" type="range" min="0.2" max="1.6" step="0.01" value="${state.radius}"><strong data-value="radius"></strong></div></label>
        <label class="interactive-demo-control"><span class="interactive-demo-control-label">Pole angle</span><div class="interactive-demo-slider-row"><input data-control="angle" type="range" min="-170" max="170" step="1" value="${state.angle}"><strong data-value="angle"></strong></div></label>
        <div class="interactive-demo-tabs interactive-demo-tabs--inline">
          <button type="button" data-roc="outside" class="interactive-demo-tab${state.roc === 'outside' ? ' is-active' : ''}">${isZPlane ? 'causal / outside' : 'causal / right side'}</button>
          <button type="button" data-roc="inside" class="interactive-demo-tab${state.roc === 'inside' ? ' is-active' : ''}">${isZPlane ? 'anti-causal / inside' : 'anti-causal / left side'}</button>
        </div>
      </div>
      <div class="interactive-demo-stage"><canvas class="interactive-demo-canvas"></canvas></div>
    </div>
    <div class="interactive-demo-readouts"></div>
  `);
  const canvas = node.querySelector('.interactive-demo-canvas');
  const ctx = canvas?.getContext?.('2d');
  const readoutsEl = node.querySelector('.interactive-demo-readouts');
  const render = () => {
    const { width, height } = setupInteractiveDemoCanvas(canvas, ctx, 330, 360);
    if (!width) return;
    const cx = Math.round(width * 0.52);
    const cy = Math.round(height * 0.52);
    const scale = Math.min(width, height) * 0.29;
    const theta = state.angle * Math.PI / 180;
    const px = cx + Math.cos(theta) * state.radius * scale;
    const py = cy - Math.sin(theta) * state.radius * scale;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#fffefa';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(34, cy);
    ctx.lineTo(width - 34, cy);
    ctx.moveTo(cx, 26);
    ctx.lineTo(cx, height - 34);
    ctx.stroke();
    if (isZPlane) {
      ctx.strokeStyle = '#94a3b8';
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(cx, cy, scale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = state.roc === 'outside' ? 'rgba(34,197,94,0.12)' : 'rgba(96,165,250,0.12)';
      ctx.beginPath();
      if (state.roc === 'outside') {
        ctx.rect(0, 0, width, height);
        ctx.arc(cx, cy, state.radius * scale, 0, Math.PI * 2, true);
      } else {
        ctx.arc(cx, cy, state.radius * scale, 0, Math.PI * 2);
      }
      ctx.fill('evenodd');
    } else {
      const boundaryX = px;
      ctx.fillStyle = state.roc === 'outside' ? 'rgba(34,197,94,0.12)' : 'rgba(96,165,250,0.12)';
      ctx.fillRect(state.roc === 'outside' ? boundaryX : 0, 0, state.roc === 'outside' ? width - boundaryX : boundaryX, height);
      ctx.strokeStyle = '#64748b';
      ctx.setLineDash([6, 5]);
      ctx.beginPath();
      ctx.moveTo(boundaryX, 24);
      ctx.lineTo(boundaryX, height - 34);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px, py);
    ctx.stroke();
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(px - 8, py - 8);
    ctx.lineTo(px + 8, py + 8);
    ctx.moveTo(px + 8, py - 8);
    ctx.lineTo(px - 8, py + 8);
    ctx.stroke();
    ctx.strokeStyle = '#0f766e';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx + 0.28 * scale, cy, 7, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#0f172a';
    ctx.font = '700 13px Quicksand, sans-serif';
    ctx.fillText(isZPlane ? 'z-plane' : 's-plane sketch', 34, 28);
    ctx.fillStyle = '#64748b';
    ctx.font = '600 12px Quicksand, sans-serif';
    ctx.fillText(isZPlane ? 'unit circle' : 'real / imaginary axes', cx + scale + 10, cy - 10);
    const sigma = Math.cos(theta) * state.radius;
    const stable = isZPlane ? state.radius < 1 : sigma < 0;
    const rocText = isZPlane
      ? (state.roc === 'outside' ? `ROC: |z| > ${formatInteractiveDemoNumber(state.radius)}` : `ROC: |z| < ${formatInteractiveDemoNumber(state.radius)}`)
      : (state.roc === 'outside' ? `ROC: Re{s} > ${formatInteractiveDemoNumber(sigma)}` : `ROC: Re{s} < ${formatInteractiveDemoNumber(sigma)}`);
    readoutsEl.innerHTML = `
      <div class="interactive-demo-readout"><strong>${isZPlane ? 'ROC' : 'Pole geometry'}:</strong> ${escapeHtml(rocText)}</div>
      <div class="interactive-demo-readout"><strong>Stability cue:</strong> ${isZPlane ? (stable ? 'pole is inside the unit circle' : 'pole is outside the unit circle') : (stable ? 'left-half plane pole' : 'right-half plane pole')}.</div>
    `;
  };
  node.querySelectorAll('[data-control]').forEach((input) => {
    const key = input.dataset.control;
    const valueEl = node.querySelector(`[data-value="${key}"]`);
    const update = () => {
      state[key] = Number(input.value);
      if (valueEl) valueEl.textContent = key === 'angle' ? `${formatInteractiveDemoNumber(state[key], 0)}°` : formatInteractiveDemoNumber(state[key]);
      render();
    };
    input.addEventListener('input', update);
    update();
  });
  node.querySelectorAll('[data-roc]').forEach((button) => {
    button.addEventListener('click', () => {
      state.roc = button.dataset.roc;
      node.querySelectorAll('[data-roc]').forEach((item) => item.classList.toggle('is-active', item === button));
      render();
    });
  });
  window.addEventListener('resize', render, { passive: true });
}

function renderFrequencyResponseLabDemo(node, demo) {
  const intent = getInteractiveDemoIntent(demo);
  const state = {
    cutoff: /high/.test(intent) ? 0.38 : 0.55,
    q: /butterworth/i.test(intent) ? 0.71 : /chebyshev|ripple/i.test(intent) ? 1.2 : 0.9,
    ripple: /chebyshev|ripple/i.test(intent) ? 0.35 : 0.05
  };
  const type = /notch/.test(intent) ? 'notch' : /band/.test(intent) ? 'bandpass' : /high/.test(intent) ? 'highpass' : 'lowpass';
  renderInteractiveLabShell(node, demo, 'frequency-response', `
    <div class="interactive-demo-grid interactive-demo-grid--lab">
      <div class="interactive-demo-controls">
        <label class="interactive-demo-control"><span class="interactive-demo-control-label">Cutoff / center</span><div class="interactive-demo-slider-row"><input data-control="cutoff" type="range" min="0.1" max="0.9" step="0.01" value="${state.cutoff}"><strong data-value="cutoff"></strong></div></label>
        <label class="interactive-demo-control"><span class="interactive-demo-control-label">Q / selectivity</span><div class="interactive-demo-slider-row"><input data-control="q" type="range" min="0.35" max="3" step="0.01" value="${state.q}"><strong data-value="q"></strong></div></label>
        <label class="interactive-demo-control"><span class="interactive-demo-control-label">Ripple</span><div class="interactive-demo-slider-row"><input data-control="ripple" type="range" min="0" max="0.7" step="0.01" value="${state.ripple}"><strong data-value="ripple"></strong></div></label>
      </div>
      <div class="interactive-demo-stage"><canvas class="interactive-demo-canvas"></canvas></div>
    </div>
    <div class="interactive-demo-readouts"></div>
  `);
  const canvas = node.querySelector('.interactive-demo-canvas');
  const ctx = canvas?.getContext?.('2d');
  const readoutsEl = node.querySelector('.interactive-demo-readouts');
  const response = (w) => {
    const c = state.cutoff;
    const q = state.q;
    let base;
    if (type === 'highpass') base = Math.pow(w / Math.max(c, 0.01), 2) / Math.sqrt(1 + Math.pow(w / Math.max(c, 0.01), 4));
    else if (type === 'bandpass') base = Math.exp(-Math.pow((w - c) * q * 4, 2));
    else if (type === 'notch') base = 1 - Math.exp(-Math.pow((w - c) * q * 5, 2));
    else base = 1 / Math.sqrt(1 + Math.pow(w / Math.max(c, 0.01), 4));
    return Math.max(0, Math.min(1.35, base * (1 + state.ripple * Math.sin(8 * Math.PI * w))));
  };
  const render = () => {
    const { width, height } = setupInteractiveDemoCanvas(canvas, ctx, 300, 360);
    if (!width) return;
    const padL = 42, padR = 22, padT = 26, padB = 42;
    const toX = (w) => padL + w * (width - padL - padR);
    const toY = (mag) => height - padB - (Math.min(mag, 1.35) / 1.35) * (height - padT - padB);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#fffefa';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, height - padB);
    ctx.lineTo(width - padR, height - padB);
    ctx.stroke();
    ctx.strokeStyle = '#94a3b8';
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(padL, toY(0.707));
    ctx.lineTo(width - padR, toY(0.707));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i <= 180; i += 1) {
      const w = i / 180;
      const x = toX(w);
      const y = toY(response(w));
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    const cx = toX(state.cutoff);
    ctx.strokeStyle = '#dc2626';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(cx, padT);
    ctx.lineTo(cx, height - padB);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#0f172a';
    ctx.font = '700 13px Quicksand, sans-serif';
    ctx.fillText(`Magnitude response (${type})`, padL, 20);
    ctx.fillStyle = '#64748b';
    ctx.font = '600 12px Quicksand, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('normalized frequency', width / 2, height - 12);
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('|H|', 0, 0);
    ctx.restore();
    readoutsEl.innerHTML = `
      <div class="interactive-demo-readout"><strong>Shape:</strong> ${escapeHtml(type)} response; Q controls transition sharpness/peaking.</div>
      <div class="interactive-demo-readout"><strong>Exam cue:</strong> read the passband, transition band, stopband, and cutoff before doing algebra.</div>
    `;
  };
  node.querySelectorAll('[data-control]').forEach((input) => {
    const key = input.dataset.control;
    const valueEl = node.querySelector(`[data-value="${key}"]`);
    const update = () => {
      state[key] = Number(input.value);
      if (valueEl) valueEl.textContent = formatInteractiveDemoNumber(state[key]);
      render();
    };
    input.addEventListener('input', update);
    update();
  });
  window.addEventListener('resize', render, { passive: true });
}

function renderTransformRuleLabDemo(node, demo) {
  if (isLaplaceFlowTransformDemo(demo)) {
    renderLaplaceFlowTransformDemo(node, demo);
    return;
  }
  const intent = getInteractiveDemoIntent(demo);
  const isDelay = /delay|shift/.test(intent);
  const isScale = /scal|prewarp|bilinear/.test(intent);
  const state = { a: isScale ? 1.4 : 1, delay: isDelay ? 2 : 1 };
  renderInteractiveLabShell(node, demo, 'transform-rule', `
    <div class="interactive-demo-grid interactive-demo-grid--lab">
      <div class="interactive-demo-controls">
        <label class="interactive-demo-control"><span class="interactive-demo-control-label">Scale a</span><div class="interactive-demo-slider-row"><input data-control="a" type="range" min="0.4" max="2.5" step="0.05" value="${state.a}"><strong data-value="a"></strong></div></label>
        <label class="interactive-demo-control"><span class="interactive-demo-control-label">Shift / delay</span><div class="interactive-demo-slider-row"><input data-control="delay" type="range" min="-4" max="4" step="1" value="${state.delay}"><strong data-value="delay"></strong></div></label>
      </div>
      <div class="interactive-demo-stage"><canvas class="interactive-demo-canvas"></canvas></div>
    </div>
    <div class="interactive-demo-readouts"></div>
  `);
  const canvas = node.querySelector('.interactive-demo-canvas');
  const ctx = canvas?.getContext?.('2d');
  const readoutsEl = node.querySelector('.interactive-demo-readouts');
  const render = () => {
    const { width, height } = setupInteractiveDemoCanvas(canvas, ctx, 280, 360);
    if (!width) return;
    const axes = drawInteractiveDemoAxes(ctx, width, height, { minT: -6, maxT: 6, originY: Math.round(height * 0.68), tickStep: 2, pad: 42 });
    const toY = (v) => axes.originY - v * 70;
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 240; i += 1) {
      const t = -6 + i * 12 / 240;
      const v = Math.exp(-Math.max(t, 0) * 0.65) * (t >= 0 ? 1 : 0);
      const x = axes.toX(t);
      const y = toY(v);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i <= 240; i += 1) {
      const t = -6 + i * 12 / 240;
      const sourceT = state.a * (t - state.delay);
      const v = Math.exp(-Math.max(sourceT, 0) * 0.65) * (sourceT >= 0 ? 1 : 0);
      const x = axes.toX(t);
      const y = toY(v);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = '#0f172a';
    ctx.font = '700 13px Quicksand, sans-serif';
    ctx.fillText('gray: original    blue: transformed', 48, 28);
    const factor = isScale ? `scale factor a = ${formatInteractiveDemoNumber(state.a)}` : `delay = ${formatInteractiveDemoNumber(state.delay, 0)}`;
    readoutsEl.innerHTML = `
      <div class="interactive-demo-readout"><strong>Current rule:</strong> ${escapeHtml(factor)}. The picture moves first; the transform-domain multiplier/substitution follows from that move.</div>
      <div class="interactive-demo-readout"><strong>Do not memorize blindly:</strong> identify whether the operation is a shift, scaling, integration, or domain substitution before applying the formula.</div>
    `;
  };
  node.querySelectorAll('[data-control]').forEach((input) => {
    const key = input.dataset.control;
    const valueEl = node.querySelector(`[data-value="${key}"]`);
    const update = () => {
      state[key] = Number(input.value);
      if (valueEl) valueEl.textContent = formatInteractiveDemoNumber(state[key], key === 'delay' ? 0 : 2);
      render();
    };
    input.addEventListener('input', update);
    update();
  });
  window.addEventListener('resize', render, { passive: true });
}

function renderSequenceSystemLabDemo(node, demo) {
  const intent = getInteractiveDemoIntent(demo);
  const state = { pole: /resonance|mode/.test(intent) ? 0.9 : 0.65, input: 1 };
  renderInteractiveLabShell(node, demo, 'sequence-system', `
    <div class="interactive-demo-grid interactive-demo-grid--lab">
      <div class="interactive-demo-controls">
        <label class="interactive-demo-control"><span class="interactive-demo-control-label">System mode a</span><div class="interactive-demo-slider-row"><input data-control="pole" type="range" min="-0.95" max="0.95" step="0.01" value="${state.pole}"><strong data-value="pole"></strong></div></label>
        <label class="interactive-demo-control"><span class="interactive-demo-control-label">Input strength</span><div class="interactive-demo-slider-row"><input data-control="input" type="range" min="0" max="2" step="0.05" value="${state.input}"><strong data-value="input"></strong></div></label>
      </div>
      <div class="interactive-demo-stage"><canvas class="interactive-demo-canvas"></canvas></div>
    </div>
    <div class="interactive-demo-readouts"></div>
  `);
  const canvas = node.querySelector('.interactive-demo-canvas');
  const ctx = canvas?.getContext?.('2d');
  const readoutsEl = node.querySelector('.interactive-demo-readouts');
  const render = () => {
    const impulse = Array.from({ length: 18 }, (_, n) => n === 0 ? state.input : 0);
    const response = Array.from({ length: 18 }, (_, n) => state.input * Math.pow(state.pole, n));
    const { width, height } = setupInteractiveDemoCanvas(canvas, ctx, 300, 360);
    if (!width) return;
    const rowH = height / 2;
    const maxVal = Math.max(...response.map((v) => Math.abs(v)), state.input, 1);
    const drawRow = (label, values, row, color) => {
      ctx.save();
      ctx.translate(0, rowH * (row - 1));
      const axes = drawInteractiveDemoAxes(ctx, width, rowH, { minT: 0, maxT: 18, originY: Math.round(rowH * 0.62), tickStep: 3, pad: 36 });
      ctx.fillStyle = '#0f172a';
      ctx.font = '700 13px Quicksand, sans-serif';
      ctx.fillText(label, 38, 22);
      drawDemoStemSeries(ctx, values, 0, axes.toX, axes.originY, (rowH * 0.39) / maxVal, color, { labels: row === 2, radius: 3.5 });
      ctx.restore();
    };
    drawRow('input impulse δ[n]', impulse, 1, '#2563eb');
    drawRow('response h[n] = a^n u[n]', response, 2, '#0f766e');
    const behavior = Math.abs(state.pole) < 0.7 ? 'fast decay' : Math.abs(state.pole) < 0.92 ? 'slow decay / long memory' : 'near-resonant long tail';
    readoutsEl.innerHTML = `
      <div class="interactive-demo-readout"><strong>Behavior:</strong> ${escapeHtml(behavior)}. Larger |a| means the impulse response stays wide longer.</div>
      <div class="interactive-demo-readout"><strong>Exam cue:</strong> h[n] is the zero-state output when the input is δ[n], not an arbitrary output sequence.</div>
    `;
  };
  node.querySelectorAll('[data-control]').forEach((input) => {
    const key = input.dataset.control;
    const valueEl = node.querySelector(`[data-value="${key}"]`);
    const update = () => {
      state[key] = Number(input.value);
      if (valueEl) valueEl.textContent = formatInteractiveDemoNumber(state[key]);
      render();
    };
    input.addEventListener('input', update);
    update();
  });
  window.addEventListener('resize', render, { passive: true });
}

function renderBriefDemoFallback(node, demo, family = 'brief') {
  const title = getInteractiveDemoTitle(demo, 'Interactive demo');
  const subtitle = getInteractiveDemoSubtitle(demo);
  const mode = demo.mode_specific_visual_use || {};
  const spec = getInteractiveDemoSpec(demo);
  const tabs = [
    ['cram', mode.cram || spec.student_prompt || subtitle || ''],
    ['standard', mode.standard || spec.description || subtitle || ''],
    ['top_score', mode.top_score || spec.note_below_demo || spec.what_to_notice || '']
  ].filter(([, value]) => compactWhitespace(value));
  const initialTab = tabs[0] ? tabs[0][0] : 'standard';

  node.innerHTML = `
    <section class="interactive-demo-shell interactive-demo-shell--brief interactive-demo-shell--${escapeHtml(family)}">
      <div class="interactive-demo-head">
        <div class="interactive-demo-title">${escapeHtml(title)}</div>
        <div class="interactive-demo-subtitle">${escapeHtml(subtitle || 'This section is ready to teach, with a compact brief instead of a blank panel.')}</div>
      </div>
      ${tabs.length ? `
        <div class="interactive-demo-tabs" role="tablist">
          ${tabs.map(([key, label], index) => `<button type="button" class="interactive-demo-tab${key === initialTab ? ' is-active' : ''}" data-interactive-tab="${escapeHtml(key)}" aria-pressed="${key === initialTab ? 'true' : 'false'}">${escapeHtml(key.replace(/_/g, ' '))}</button>`).join('')}
        </div>
      ` : ''}
      <div class="interactive-demo-brief-card">
        <div class="interactive-demo-brief-label">Teaching emphasis</div>
        <div class="interactive-demo-brief-copy" data-interactive-brief-copy>${escapeHtml(tabs.find(([key]) => key === initialTab)?.[1] || subtitle || '')}</div>
      </div>
      <div class="interactive-demo-readouts">
        ${spec.note_below_demo ? `<div class="interactive-demo-readout"><strong>Note:</strong> ${decodeInlineMarkdownFragment(escapeHtml(spec.note_below_demo))}</div>` : ''}
        ${spec.student_prompt ? `<div class="interactive-demo-readout"><strong>Prompt:</strong> ${escapeHtml(spec.student_prompt)}</div>` : ''}
        ${spec.observation_prompt ? `<div class="interactive-demo-readout"><strong>Observe:</strong> ${escapeHtml(spec.observation_prompt)}</div>` : ''}
      </div>
    </section>
  `;

  const shellEl = node.querySelector('.interactive-demo-shell');
  const copyEl = node.querySelector('[data-interactive-brief-copy]');
  const tabsEl = node.querySelectorAll('[data-interactive-tab]');
  const tabMap = new Map(tabs);
  tabsEl.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-interactive-tab');
      tabsEl.forEach((item) => {
        const active = item === tab;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      if (copyEl) copyEl.textContent = tabMap.get(key) || '';
    });
  });
  if (shellEl) shellEl.classList.toggle('is-narrow', shellEl.clientWidth < 760);
}

function renderOppositeRotationsDemo(node, demo) {
  const title = getInteractiveDemoTitle(demo, 'Opposite rotations create sine and cosine');
  const subtitle = getInteractiveDemoSubtitle(demo) || 'Move the angle and watch conjugate phasors cancel or reinforce.';
  const controls = Array.isArray(demo.controls) ? demo.controls : [];
  const phiControl = controls.find((control) => /angle|phi/i.test(`${control.name || ''} ${control.key || ''} ${control.label || ''}`)) || {};
  const trailControl = controls.find((control) => /trail/i.test(`${control.name || ''} ${control.key || ''} ${control.label || ''}`)) || {};
  const state = {
    phi: Number(phiControl.default ?? Math.PI / 3),
    showTrails: Boolean(trailControl.default ?? true)
  };
  const minPhi = Number(phiControl.min ?? -Math.PI * 2);
  const maxPhi = Number(phiControl.max ?? Math.PI * 2);
  const stepPhi = Number(phiControl.step ?? 0.01);
  const trails = [];

  node.innerHTML = `
    <section class="interactive-demo-shell interactive-demo-shell--opposite-rotations">
      <div class="interactive-demo-head">
        <div class="interactive-demo-title">${escapeHtml(title)}</div>
        <div class="interactive-demo-subtitle">${escapeHtml(subtitle)}</div>
      </div>
      <div class="interactive-demo-grid">
        <div class="interactive-demo-controls">
          <label class="interactive-demo-control">
            <span class="interactive-demo-control-label">Angle phi</span>
            <div class="interactive-demo-slider-row">
              <input type="range" min="${minPhi}" max="${maxPhi}" step="${stepPhi}" value="${state.phi}" data-control="phi">
              <strong class="interactive-demo-control-value" data-value="phi"></strong>
            </div>
          </label>
          <label class="interactive-demo-check">
            <input type="checkbox" ${state.showTrails ? 'checked' : ''} data-control="showTrails">
            Show rotation trails
          </label>
          <div class="interactive-demo-brief-card">
            <div class="interactive-demo-brief-label">Cancellation</div>
            <div class="interactive-demo-brief-copy" data-copy="cancellation"></div>
          </div>
          <button type="button" class="interactive-demo-reset" data-control="reset">Reset</button>
        </div>
        <div class="interactive-demo-stage">
          <canvas class="interactive-demo-canvas" height="340"></canvas>
        </div>
      </div>
      <div class="interactive-demo-readouts">
        <div class="interactive-demo-readout" data-readout="cos"></div>
        <div class="interactive-demo-readout" data-readout="sin"></div>
      </div>
    </section>
  `;

  const canvas = node.querySelector('.interactive-demo-canvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  const shellEl = node.querySelector('.interactive-demo-shell');
  const phiInput = node.querySelector('[data-control="phi"]');
  const trailInput = node.querySelector('[data-control="showTrails"]');
  const phiValue = node.querySelector('[data-value="phi"]');
  const cancellationEl = node.querySelector('[data-copy="cancellation"]');
  const cosReadout = node.querySelector('[data-readout="cos"]');
  const sinReadout = node.querySelector('[data-readout="sin"]');
  const resetButton = node.querySelector('[data-control="reset"]');

  const formatRad = (value) => `${fmt(value, 2)} rad`;
  const formatDeg = (value) => `${fmt((value * 180) / Math.PI, 1)} deg`;
  const drawArrow = (x1, y1, x2, y2, color, width = 3, dashed = false) => {
    if (!ctx) return;
    const angle = Math.atan2(y2 - y1, x2 - x1);
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;
    if (dashed) ctx.setLineDash([6, 5]);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    if (!dashed) {
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - 11 * Math.cos(angle - Math.PI / 6), y2 - 11 * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(x2 - 11 * Math.cos(angle + Math.PI / 6), y2 - 11 * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  };

  const update = () => {
    state.phi = Number(phiInput?.value ?? state.phi);
    state.showTrails = Boolean(trailInput?.checked);
    if (state.showTrails) {
      trails.push(state.phi);
      if (trails.length > 80) trails.shift();
    } else {
      trails.length = 0;
    }

    const c = Math.cos(state.phi);
    const s = Math.sin(state.phi);
    if (phiValue) phiValue.textContent = `${formatRad(state.phi)} / ${formatDeg(state.phi)}`;
    if (cancellationEl) cancellationEl.textContent = `Real parts match: +cos(phi) and +cos(phi). Imaginary parts are opposites: +j sin(phi) and -j sin(phi).`;
    if (cosReadout) cosReadout.innerHTML = `<strong>Cosine from the sum:</strong> \\((e^{j\\phi}+e^{-j\\phi})/2 = ${fmt(c, 3)}\\)`;
    if (sinReadout) sinReadout.innerHTML = `<strong>Sine from the difference:</strong> \\((e^{j\\phi}-e^{-j\\phi})/(2j) = ${fmt(s, 3)}\\)`;

    if (ctx && canvas) {
      const { width, height } = setupInteractiveDemoCanvas(canvas, ctx, 340, 360);
      const cx = width * 0.36;
      const cy = height / 2;
      const radius = Math.min(width * 0.24, height * 0.34);
      const px = cx + radius * c;
      const pyPlus = cy - radius * s;
      const pyMinus = cy + radius * s;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = '#dbeafe';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - radius - 24, cy);
      ctx.lineTo(cx + radius + 24, cy);
      ctx.moveTo(cx, cy - radius - 24);
      ctx.lineTo(cx, cy + radius + 24);
      ctx.stroke();

      if (state.showTrails && trails.length > 1) {
        ctx.save();
        trails.forEach((angle, index) => {
          const alpha = (index + 1) / trails.length;
          ctx.fillStyle = `rgba(37, 99, 235, ${0.08 + alpha * 0.22})`;
          ctx.beginPath();
          ctx.arc(cx + radius * Math.cos(angle), cy - radius * Math.sin(angle), 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(15, 118, 110, ${0.08 + alpha * 0.22})`;
          ctx.beginPath();
          ctx.arc(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle), 2.5, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }

      drawArrow(cx, cy, px, pyPlus, '#2563eb', 3.2);
      drawArrow(cx, cy, px, pyMinus, '#0f766e', 3.2);
      drawArrow(px, pyPlus, px, pyMinus, '#ef4444', 2.4, true);
      drawArrow(cx, cy, px, cy, '#f59e0b', 2.8);

      ctx.fillStyle = '#2563eb';
      ctx.font = '800 13px Quicksand, sans-serif';
      ctx.fillText('e^{jphi}', px + 10, pyPlus - 8);
      ctx.fillStyle = '#0f766e';
      ctx.fillText('e^{-jphi}', px + 10, pyMinus + 18);
      ctx.fillStyle = '#f59e0b';
      ctx.fillText('cos(phi)', (cx + px) / 2 - 18, cy - 12);
      ctx.fillStyle = '#ef4444';
      ctx.fillText('2j sin(phi)', px + 10, (pyPlus + pyMinus) / 2);

      const formulaX = Math.min(width * 0.66, cx + radius + 60);
      ctx.fillStyle = '#f8fafc';
      ctx.strokeStyle = '#dbe3f0';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(formulaX - 18, 54, width - formulaX - 12, height - 108, 14);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#0f172a';
      ctx.font = '900 15px Quicksand, sans-serif';
      ctx.fillText('Euler pair', formulaX, 86);
      ctx.font = '700 13px Quicksand, sans-serif';
      ctx.fillStyle = '#334155';
      ctx.fillText(`cos(phi) = ${fmt(c, 3)}`, formulaX, 122);
      ctx.fillText(`sin(phi) = ${fmt(s, 3)}`, formulaX, 150);
      ctx.fillText('sum keeps horizontal parts', formulaX, 194);
      ctx.fillText('difference keeps vertical parts', formulaX, 222);
    }

    if (window.typesetMath) window.typesetMath(node).catch(() => {});
  };

  phiInput?.addEventListener('input', update);
  trailInput?.addEventListener('change', update);
  resetButton?.addEventListener('click', () => {
    state.phi = Number(phiControl.default ?? Math.PI / 3);
    state.showTrails = Boolean(trailControl.default ?? true);
    if (phiInput) phiInput.value = String(state.phi);
    if (trailInput) trailInput.checked = state.showTrails;
    trails.length = 0;
    update();
  });
  if (shellEl) shellEl.classList.toggle('is-narrow', shellEl.clientWidth < 760);
  update();
}

function renderSignalTransformFallback(node, demo) {
  const title = getInteractiveDemoTitle(demo, 'Signal transform sandbox');
  const subtitle = getInteractiveDemoSubtitle(demo) || 'Move the sliders and watch landmarks shift together.';
  const titleText = `${title} ${subtitle} ${getInteractiveDemoText(demo)}`.toLowerCase();
  const state = Object.create(null);
  state.waveform = /unit step|window/.test(titleText) ? 'step'
    : /periodic|periodicity|shift-test|does the shift match/.test(titleText) ? 'periodic'
      : /mirror|reflection|flip/.test(titleText) ? 'pulse'
        : /g\(at\+b\)|x\(at-b\)|landmark/.test(titleText) ? 'burst'
          : 'pulse';
  state.a = /reflection|mirror/.test(titleText) ? -1 : 2;
  state.b = /unit step|window/.test(titleText) ? 1 : 1;

  const baseSignal = (t) => {
    switch (state.waveform) {
      case 'step':
        return t >= 0 ? 1 : 0;
      case 'periodic':
        return 0.65 * Math.cos(Math.PI * t) + 0.15 * Math.cos(3 * Math.PI * t);
      case 'burst':
        return t < -0.5 || t > 2.5 ? 0 : Math.exp(-0.35 * (t + 0.5)) * Math.cos(2.2 * Math.PI * (t + 0.5));
      default:
        if (t < -1 || t > 2) return 0;
        if (t < 0) return t + 1;
        if (t < 1) return 1 - 0.25 * t;
        return Math.max(0, 0.75 - 0.75 * (t - 1));
    }
  };

  const sample = (fn, minT, maxT, steps = 320) => Array.from({ length: steps + 1 }, (_, i) => {
    const t = minT + ((maxT - minT) * i) / steps;
    return { t, value: fn(t) };
  });

  node.innerHTML = `
    <section class="interactive-demo-shell interactive-demo-shell--signal">
      <div class="interactive-demo-head">
        <div class="interactive-demo-title">${escapeHtml(title)}</div>
        <div class="interactive-demo-subtitle">${escapeHtml(subtitle)}</div>
      </div>
      <div class="interactive-demo-grid">
        <div class="interactive-demo-controls">
          <label class="interactive-demo-control">
            <span class="interactive-demo-control-label">Waveform</span>
            <select class="interactive-demo-select" data-control="waveform">
              <option value="pulse">Asymmetric pulse</option>
              <option value="step">Unit step</option>
              <option value="periodic">Periodic wave</option>
              <option value="burst">Causal burst</option>
            </select>
          </label>
          <label class="interactive-demo-control">
            <span class="interactive-demo-control-label">a</span>
            <div class="interactive-demo-slider-row">
              <input type="range" min="-3" max="3" step="0.5" value="${state.a}" data-control="a">
              <strong class="interactive-demo-control-value" data-value="a"></strong>
            </div>
          </label>
          <label class="interactive-demo-control">
            <span class="interactive-demo-control-label">b</span>
            <div class="interactive-demo-slider-row">
              <input type="range" min="-6" max="6" step="0.5" value="${state.b}" data-control="b">
              <strong class="interactive-demo-control-value" data-value="b"></strong>
            </div>
          </label>
          <div class="interactive-demo-brief-card">
            <div class="interactive-demo-brief-label">Shift rule</div>
            <div class="interactive-demo-brief-copy" data-copy="formula"></div>
          </div>
        </div>
        <div class="interactive-demo-stage">
          <canvas class="interactive-demo-canvas" height="320"></canvas>
        </div>
      </div>
      <div class="interactive-demo-readouts">
        <div class="interactive-demo-readout" data-readout="shift"></div>
        <div class="interactive-demo-readout" data-readout="rule"></div>
      </div>
    </section>
  `;

  const canvas = node.querySelector('.interactive-demo-canvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  const shellEl = node.querySelector('.interactive-demo-shell');
  const formulaEl = node.querySelector('[data-copy="formula"]');
  const shiftReadout = node.querySelector('[data-readout="shift"]');
  const ruleReadout = node.querySelector('[data-readout="rule"]');
  const controls = {
    waveform: node.querySelector('[data-control="waveform"]'),
    a: node.querySelector('[data-control="a"]'),
    b: node.querySelector('[data-control="b"]')
  };
  const values = {
    a: node.querySelector('[data-value="a"]'),
    b: node.querySelector('[data-value="b"]')
  };

  const draw = () => {
    state.waveform = controls.waveform.value;
    state.a = Number(controls.a.value);
    state.b = Number(controls.b.value);
    if (values.a) values.a.textContent = Number(state.a.toFixed(1)).toString();
    if (values.b) values.b.textContent = Number(state.b.toFixed(1)).toString();

    if (!ctx || !canvas) return;
    const { width, height } = setupInteractiveDemoCanvas(canvas, ctx, 320, 340);
    const panelH = Math.floor((height - 28) / 2);
    const panels = [
      { y: 12, label: 'x(t)', color: '#1d4ed8', fn: baseSignal },
      { y: 12 + panelH + 12, label: 'y(t) = x(at - b)', color: '#0f766e', fn: (t) => baseSignal(state.a * t - state.b) }
    ];
    const xRange = { minT: -4, maxT: 6 };
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    panels.forEach((panel) => {
      const originY = panel.y + Math.round(panelH * 0.64);
      const toX = (t) => 36 + ((t - xRange.minT) / (xRange.maxT - xRange.minT)) * (width - 72);
      const yMin = -1.4;
      const yMax = 1.4;
      const toY = (v) => panel.y + panelH - 18 - ((v - yMin) / (yMax - yMin)) * (panelH - 30);
      ctx.strokeStyle = '#dbe3f0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(36, originY);
      ctx.lineTo(width - 36, originY);
      ctx.stroke();
      ctx.strokeStyle = '#cbd5e1';
      ctx.beginPath();
      ctx.moveTo(36, panel.y + 10);
      ctx.lineTo(36, panel.y + panelH - 10);
      ctx.stroke();
      ctx.fillStyle = '#334155';
      ctx.font = '700 13px Quicksand, sans-serif';
      ctx.fillText(panel.label, 44, panel.y + 18);
      const points = sample(panel.fn, xRange.minT, xRange.maxT, 340);
      ctx.strokeStyle = panel.color;
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      points.forEach((pt, index) => {
        const x = toX(pt.t);
        const y = toY(pt.value);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      const shift = state.a !== 0 ? state.b / state.a : 0;
      const markerX = toX(shift);
      ctx.strokeStyle = '#f59e0b';
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(markerX, panel.y + 12);
      ctx.lineTo(markerX, panel.y + panelH - 18);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#475569';
      ctx.fillText('t = b/a', markerX - 16, panel.y + 28);
      if (panel.label === 'y(t) = x(at - b)') {
        ctx.fillStyle = '#334155';
        ctx.fillText(state.a < 0 ? 'time reversal' : 'time scaling', width - 140, panel.y + 18);
      }
    });

    const shift = state.a !== 0 ? state.b / state.a : 0;
    const formula = `y(t) = x(${Number(state.a.toFixed(2)).toString()}t ${state.b >= 0 ? '-' : '+'} ${Number(Math.abs(state.b).toFixed(2)).toString()})`;
    if (formulaEl) formulaEl.textContent = formula;
    if (shiftReadout) shiftReadout.innerHTML = `<strong>Effective shift:</strong> ${fmt(shift)} (${state.a >= 0 ? 'slide right when b > 0' : 'reflection plus shift'})`;
    if (ruleReadout) ruleReadout.innerHTML = `<strong>Rule:</strong> when a is negative, the waveform flips before it shifts.`;
  };

  Object.values(controls).forEach((control) => control?.addEventListener('input', draw));
  if (shellEl) shellEl.classList.toggle('is-narrow', shellEl.clientWidth < 760);
  draw();
}

function renderEnergyPowerFallback(node, demo) {
  const title = getInteractiveDemoTitle(demo, 'Energy vs Power');
  const subtitle = getInteractiveDemoSubtitle(demo) || 'Watch the running energy and average power separate as T grows.';
  const titleText = `${title} ${subtitle} ${getInteractiveDemoText(demo)}`.toLowerCase();
  const state = {
    signal: /cosine|power/.test(titleText) ? 'cosine' : /ramp/.test(titleText) ? 'ramp' : 'pulse',
    T: 3,
    a: 1.5,
    omega: 2
  };

  const signalValue = (t) => {
    switch (state.signal) {
      case 'cosine':
        return Math.cos(t);
      case 'ramp':
        return t >= 0 ? t : 0;
      case 'real_exp':
        return t >= 0 ? Math.exp(-state.a * t) : Math.exp(state.a * t);
      default:
        return t < 0 ? 0 : t <= 1 ? 1 : 0;
    }
  };
  const sampleSignal = (fn, minT, maxT, steps = 240) => Array.from({ length: steps + 1 }, (_, i) => {
    const t = minT + ((maxT - minT) * i) / steps;
    return { t, value: fn(t) };
  });

  const classify = () => {
    if (state.signal === 'pulse') return 'Energy signal';
    if (state.signal === 'cosine') return 'Power signal';
    return 'Neither';
  };

  const integrate = (halfWindow) => {
    const dt = 0.01;
    let energy = 0;
    for (let t = -halfWindow; t <= halfWindow; t += dt) {
      const v = signalValue(t);
      energy += (v * v) * dt;
    }
    const power = halfWindow > 0 ? energy / (2 * halfWindow) : 0;
    return { energy, power };
  };

  node.innerHTML = `
    <section class="interactive-demo-shell interactive-demo-shell--energy">
      <div class="interactive-demo-head">
        <div class="interactive-demo-title">${escapeHtml(title)}</div>
        <div class="interactive-demo-subtitle">${escapeHtml(subtitle)}</div>
      </div>
      <div class="interactive-demo-grid">
        <div class="interactive-demo-controls">
          <label class="interactive-demo-control">
            <span class="interactive-demo-control-label">Signal</span>
            <select class="interactive-demo-select" data-control="signal">
              <option value="pulse">Finite pulse</option>
              <option value="cosine">Cosine</option>
              <option value="ramp">Ramp</option>
              <option value="real_exp">Real exponential</option>
            </select>
          </label>
          <label class="interactive-demo-control">
            <span class="interactive-demo-control-label">Observation half-window T</span>
            <div class="interactive-demo-slider-row">
              <input type="range" min="0.5" max="6" step="0.1" value="${state.T}" data-control="T">
              <strong class="interactive-demo-control-value" data-value="T"></strong>
            </div>
          </label>
          <label class="interactive-demo-control" data-hidden="a">
            <span class="interactive-demo-control-label">Real exponential a</span>
            <div class="interactive-demo-slider-row">
              <input type="range" min="0.25" max="4" step="0.05" value="${state.a}" data-control="a">
              <strong class="interactive-demo-control-value" data-value="a"></strong>
            </div>
          </label>
          <div class="interactive-demo-brief-card">
            <div class="interactive-demo-brief-label">Classification</div>
            <div class="interactive-demo-brief-copy" data-copy="classification"></div>
          </div>
        </div>
        <div class="interactive-demo-stage">
          <canvas class="interactive-demo-canvas" height="360"></canvas>
        </div>
      </div>
      <div class="interactive-demo-readouts">
        <div class="interactive-demo-readout" data-readout="energy"></div>
        <div class="interactive-demo-readout" data-readout="power"></div>
      </div>
    </section>
  `;

  const canvas = node.querySelector('.interactive-demo-canvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  const shellEl = node.querySelector('.interactive-demo-shell');
  const classificationEl = node.querySelector('[data-copy="classification"]');
  const energyReadout = node.querySelector('[data-readout="energy"]');
  const powerReadout = node.querySelector('[data-readout="power"]');
  const controls = {
    signal: node.querySelector('[data-control="signal"]'),
    T: node.querySelector('[data-control="T"]'),
    a: node.querySelector('[data-control="a"]')
  };
  const values = {
    T: node.querySelector('[data-value="T"]'),
    a: node.querySelector('[data-value="a"]')
  };
  const aControlWrap = node.querySelector('[data-hidden="a"]');

  const update = () => {
    state.signal = controls.signal.value;
    state.T = Number(controls.T.value);
    state.a = Number(controls.a.value);
    if (values.T) values.T.textContent = fmt(state.T);
    if (values.a) values.a.textContent = fmt(state.a);
    if (aControlWrap) aControlWrap.hidden = state.signal !== 'real_exp';

    const { energy, power } = integrate(state.T);
    if (classificationEl) classificationEl.textContent = classify();
    if (energyReadout) energyReadout.innerHTML = `<strong>Running energy:</strong> E(T) = ${fmt(energy)}`;
    if (powerReadout) powerReadout.innerHTML = `<strong>Average power:</strong> P(T) = ${fmt(power)}`;

    if (!ctx || !canvas) return;
    const { width, height } = setupInteractiveDemoCanvas(canvas, ctx, 360, 360);
    const panelH = Math.floor((height - 28) / 3);
    const panelMeta = [
      { y: 10, label: 'x(t)', color: '#1d4ed8' },
      { y: 10 + panelH + 8, label: 'E(T)', color: '#0f766e' },
      { y: 10 + (panelH + 8) * 2, label: 'P(T)', color: '#dc2626' }
    ];

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    const curveData = Array.from({ length: 240 }, (_, i) => {
      const T = (6 * i) / 239;
      const { energy: e, power: p } = integrate(T);
      return { T, energy: e, power: p };
    });
    const energyMax = Math.max(...curveData.map((d) => d.energy), 1.1);
    const powerMax = Math.max(...curveData.map((d) => d.power), 1.1);

    const drawPanel = (meta, fn, yMin, yMax) => {
      const left = 36;
      const right = width - 22;
      const top = meta.y + 20;
      const bottom = meta.y + panelH - 16;
      const midY = (top + bottom) / 2;
      const toX = (t) => left + (t / 6) * (right - left);
      const toY = (v) => bottom - ((v - yMin) / (yMax - yMin)) * (bottom - top);
      ctx.strokeStyle = '#dbe3f0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(left, midY);
      ctx.lineTo(right, midY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(left, top);
      ctx.lineTo(left, bottom);
      ctx.stroke();
      ctx.fillStyle = '#334155';
      ctx.font = '700 13px Quicksand, sans-serif';
      ctx.fillText(meta.label, left + 4, meta.y + 14);
      ctx.strokeStyle = meta.color;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      curveData.forEach((d, index) => {
        const x = toX(d.T);
        const y = toY(fn(d));
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      const cursorX = toX(state.T);
      ctx.strokeStyle = '#f59e0b';
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(cursorX, top);
      ctx.lineTo(cursorX, bottom);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#475569';
      ctx.fillText(`T = ${fmt(state.T)}`, cursorX - 18, meta.y + 14);
    };

    const tMin = -4;
    const tMax = 4;
    drawPanel(panelMeta[0], (d) => signalValue(tMin + ((tMax - tMin) * d.T) / 6), -1.4, 1.4);
    drawPanel(panelMeta[1], (d) => d.energy, 0, energyMax);
    drawPanel(panelMeta[2], (d) => d.power, 0, powerMax);

    const signalPoints = sampleSignal(signalValue, -4, 4, 360);
    const xOffset = 0;
    const axisTop = 18;
    const axisBottom = 104;
    ctx.strokeStyle = '#dbe3f0';
    ctx.beginPath();
    ctx.moveTo(width - 105, axisTop);
    ctx.lineTo(width - 105, axisBottom);
    ctx.stroke();
    if (xOffset === 0) {
      ctx.fillStyle = '#64748b';
      ctx.font = '600 12px Quicksand, sans-serif';
      ctx.fillText('signal preview', width - 130, axisTop + 12);
    }
    ctx.strokeStyle = '#1d4ed8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    signalPoints.forEach((pt, index) => {
      const x = width - 180 + ((pt.t + 4) / 8) * 140;
      const y = axisBottom - ((pt.value + 1.4) / 2.8) * 70;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  };

  Object.values(controls).forEach((control) => control?.addEventListener('input', update));
  if (shellEl) shellEl.classList.toggle('is-narrow', shellEl.clientWidth < 760);
  update();
}

function renderSamplingQuantizationFallback(node, demo) {
  const title = getInteractiveDemoTitle(demo, 'Sampling and quantization');
  const subtitle = getInteractiveDemoSubtitle(demo) || 'Change one axis at a time and the classification changes with it.';
  const state = { timeMode: 'continuous', ampMode: 'continuous' };
  const levels = [0.1, 0.35, 0.6, 0.85];
  const quantize = (v) => levels.reduce((best, level) => (Math.abs(v - level) < Math.abs(v - best) ? level : best), levels[0]);
  const sineVal = (i, total) => {
    const t = i / (total - 1);
    return 0.5 + 0.38 * Math.sin(2 * Math.PI * t * 1.5 - 0.4) + 0.08 * Math.sin(2 * Math.PI * t * 4);
  };

  node.innerHTML = `
    <section class="interactive-demo-shell interactive-demo-shell--sampling">
      <div class="interactive-demo-head">
        <div class="interactive-demo-title">${escapeHtml(title)}</div>
        <div class="interactive-demo-subtitle">${escapeHtml(subtitle)}</div>
      </div>
      <div class="interactive-demo-switch-row">
        <div class="interactive-demo-switch-group">
          <span class="interactive-demo-switch-label">Time axis</span>
          <button type="button" class="interactive-demo-switch is-active" data-time-mode="continuous">Continuous</button>
          <button type="button" class="interactive-demo-switch" data-time-mode="discrete">Discrete</button>
        </div>
        <div class="interactive-demo-switch-group">
          <span class="interactive-demo-switch-label">Amplitude</span>
          <button type="button" class="interactive-demo-switch is-active" data-amp-mode="continuous">Continuous</button>
          <button type="button" class="interactive-demo-switch" data-amp-mode="quantized">Quantized</button>
        </div>
      </div>
      <div class="interactive-demo-stage">
        <canvas class="interactive-demo-canvas" height="280"></canvas>
      </div>
      <div class="interactive-demo-readouts">
        <div class="interactive-demo-readout"><strong>Classification:</strong> <span data-readout="class"></span></div>
        <div class="interactive-demo-readout">First inspect the horizontal axis, then inspect the vertical axis.</div>
      </div>
    </section>
  `;

  const canvas = node.querySelector('.interactive-demo-canvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  const classReadout = node.querySelector('[data-readout="class"]');
  const timeButtons = node.querySelectorAll('[data-time-mode]');
  const ampButtons = node.querySelectorAll('[data-amp-mode]');
  const classificationFor = () => `${state.timeMode === 'continuous' ? 'Continuous-time' : 'Discrete-time'} ${state.ampMode === 'continuous' ? 'analog' : 'digital'}`;
  const setButtons = (selector, value) => {
    node.querySelectorAll(selector).forEach((button) => button.classList.toggle('is-active', button.getAttribute(selector === '[data-time-mode]' ? 'data-time-mode' : 'data-amp-mode') === value));
  };

  const draw = () => {
    if (!ctx || !canvas) return;
    const { width, height } = setupInteractiveDemoCanvas(canvas, ctx, 280, 340);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    const left = 42;
    const right = width - 18;
    const top = 22;
    const bottom = height - 28;
    const midY = (top + bottom) / 2;
    const yScale = (bottom - top) / 8;
    const drawGrid = (panelTop, panelBottom) => {
      ctx.strokeStyle = '#e2e8f0';
      for (let x = left; x <= right; x += 44) {
        ctx.beginPath();
        ctx.moveTo(x, panelTop);
        ctx.lineTo(x, panelBottom);
        ctx.stroke();
      }
    };
    drawGrid(top, bottom);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(left, midY);
    ctx.lineTo(right, midY);
    ctx.stroke();
    ctx.fillStyle = '#475569';
    ctx.font = '700 13px Quicksand, sans-serif';
    ctx.fillText('Time / samples', left, top + 16);
    ctx.fillText('Amplitude', 10, top + 18);

    const levelsY = levels.map((value) => midY - (value - 0.5) * yScale * 2.2);
    if (state.ampMode === 'quantized') {
      ctx.save();
      ctx.setLineDash([4, 6]);
      ctx.strokeStyle = '#b0b8c8';
      levelsY.forEach((y) => {
        ctx.beginPath();
        ctx.moveTo(left, y);
        ctx.lineTo(right, y);
        ctx.stroke();
      });
      ctx.restore();
    }

    if (state.timeMode === 'continuous') {
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let i = 0; i <= 220; i += 1) {
        const rawV = sineVal(i, 221);
        const v = state.ampMode === 'quantized' ? quantize(rawV) : rawV;
        const x = left + ((right - left) * i) / 220;
        const y = midY - (v - 0.5) * yScale * 2.2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    } else {
      for (let i = 0; i < 16; i += 1) {
        const rawV = sineVal(i, 16);
        const v = state.ampMode === 'quantized' ? quantize(rawV) : rawV;
        const x = left + ((right - left) * i) / 15;
        const y = midY - (v - 0.5) * yScale * 2.2;
        ctx.strokeStyle = '#1d4ed8';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(x, midY);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = '#1d4ed8';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  timeButtons.forEach((button) => button.addEventListener('click', () => {
    state.timeMode = button.getAttribute('data-time-mode');
    setButtons('[data-time-mode]', state.timeMode);
    if (classReadout) classReadout.textContent = classificationFor();
    draw();
  }));
  ampButtons.forEach((button) => button.addEventListener('click', () => {
    state.ampMode = button.getAttribute('data-amp-mode');
    setButtons('[data-amp-mode]', state.ampMode);
    if (classReadout) classReadout.textContent = classificationFor();
    draw();
  }));
  if (classReadout) classReadout.textContent = classificationFor();
  draw();
  if (classReadout) classReadout.textContent = classificationFor();
}

function renderSystemPropertyFallback(node, demo) {
  const title = getInteractiveDemoTitle(demo, 'System property tester');
  const subtitle = getInteractiveDemoSubtitle(demo) || 'Compare two paths and watch whether the output curves agree.';
  const text = `${title} ${subtitle} ${getInteractiveDemoText(demo)}`.toLowerCase();
  const mode = /superposition|linear/.test(text) ? 'superposition'
    : /causality/.test(text) ? 'causality'
      : /bibo/.test(text) ? 'bibo'
        : 'time_invariance';
  const state = {
    system: mode === 'superposition' ? 'linear' : mode === 'causality' ? 'future' : mode === 'bibo' ? 'bounded' : 'linear',
    a: 2,
    b: -1,
    T: 1.5
  };
  const x1 = (t) => Math.sin(t);
  const x2 = (t) => Math.cos(t);
  const signal = (t) => Math.sin(t) + 0.4 * Math.cos(2 * t);
  const applySystem = (x, t) => {
    if (state.system === 'square') return x * x;
    if (state.system === 'offset') return x + 1;
    if (state.system === 'future') return signal(t + 1);
    if (state.system === 'integrator') return t;
    return 2 * x;
  };
  const systemOptions = mode === 'superposition'
    ? [
      ['linear', 'S{x}=2x'],
      ['square', 'S{x}=x^2'],
      ['offset', 'S{x}=x+1']
    ]
    : mode === 'causality'
      ? [
        ['linear', 'uses x(t)'],
        ['future', 'uses x(t+1)']
      ]
      : mode === 'bibo'
        ? [
          ['bounded', 'bounded gain'],
          ['integrator', 'unbounded ramp']
        ]
        : [
          ['linear', 'time-invariant gain'],
          ['square', 'nonlinear but time-invariant'],
          ['future', 'time-varying look-ahead']
        ];

  node.innerHTML = `
    <section class="interactive-demo-shell interactive-demo-shell--system">
      <div class="interactive-demo-head">
        <div class="interactive-demo-title">${escapeHtml(title)}</div>
        <div class="interactive-demo-subtitle">${escapeHtml(subtitle)}</div>
      </div>
      <div class="interactive-demo-grid">
        <div class="interactive-demo-controls">
          <label class="interactive-demo-control">
            <span class="interactive-demo-control-label">System</span>
            <select class="interactive-demo-select" data-control="system">
              ${systemOptions.map(([value, label]) => `<option value="${escapeHtml(value)}"${value === state.system ? ' selected' : ''}>${escapeHtml(label)}</option>`).join('')}
            </select>
          </label>
          <label class="interactive-demo-control" data-control-wrap="a">
            <span class="interactive-demo-control-label">a</span>
            <div class="interactive-demo-slider-row"><input type="range" min="-3" max="3" step="0.1" value="${state.a}" data-control="a"><strong class="interactive-demo-control-value" data-value="a"></strong></div>
          </label>
          <label class="interactive-demo-control" data-control-wrap="b">
            <span class="interactive-demo-control-label">b</span>
            <div class="interactive-demo-slider-row"><input type="range" min="-3" max="3" step="0.1" value="${state.b}" data-control="b"><strong class="interactive-demo-control-value" data-value="b"></strong></div>
          </label>
          <label class="interactive-demo-control" data-control-wrap="T">
            <span class="interactive-demo-control-label">Shift T</span>
            <div class="interactive-demo-slider-row"><input type="range" min="-3" max="3" step="0.25" value="${state.T}" data-control="T"><strong class="interactive-demo-control-value" data-value="T"></strong></div>
          </label>
          <div class="interactive-demo-brief-card">
            <div class="interactive-demo-brief-label">Verdict</div>
            <div class="interactive-demo-brief-copy" data-copy="verdict"></div>
          </div>
        </div>
        <div class="interactive-demo-stage"><canvas class="interactive-demo-canvas" height="300"></canvas></div>
      </div>
      <div class="interactive-demo-readouts">
        <div class="interactive-demo-readout" data-readout="left"></div>
        <div class="interactive-demo-readout" data-readout="right"></div>
      </div>
    </section>
  `;

  const canvas = node.querySelector('.interactive-demo-canvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  const controls = {
    system: node.querySelector('[data-control="system"]'),
    a: node.querySelector('[data-control="a"]'),
    b: node.querySelector('[data-control="b"]'),
    T: node.querySelector('[data-control="T"]')
  };
  const values = {
    a: node.querySelector('[data-value="a"]'),
    b: node.querySelector('[data-value="b"]'),
    T: node.querySelector('[data-value="T"]')
  };
  const verdictEl = node.querySelector('[data-copy="verdict"]');
  const leftEl = node.querySelector('[data-readout="left"]');
  const rightEl = node.querySelector('[data-readout="right"]');

  const update = () => {
    state.system = controls.system.value;
    state.a = Number(controls.a.value);
    state.b = Number(controls.b.value);
    state.T = Number(controls.T.value);
    Object.entries(values).forEach(([key, el]) => { if (el) el.textContent = fmt(state[key]); });

    const points = Array.from({ length: 260 }, (_, i) => {
      const t = ((Math.PI * 2) * i) / 259;
      let left;
      let right;
      if (mode === 'superposition') {
        left = applySystem(state.a * x1(t) + state.b * x2(t), t);
        right = state.a * applySystem(x1(t), t) + state.b * applySystem(x2(t), t);
      } else if (mode === 'bibo') {
        left = Math.sin(t);
        right = state.system === 'integrator' ? t / 2 : 0.8 * Math.sin(t);
      } else {
        left = applySystem(signal(t - state.T), t);
        right = applySystem(signal(t), t - state.T);
      }
      return { t, left, right, diff: Math.abs(left - right) };
    });
    const maxDiff = Math.max(...points.map((p) => p.diff));
    const pass = maxDiff < 0.08 && state.system !== 'integrator';
    if (verdictEl) verdictEl.textContent = pass ? 'Passes this visible test' : 'Fails this visible test';
    if (leftEl) leftEl.innerHTML = `<strong>Path A:</strong> ${mode === 'superposition' ? 'S{a x1 + b x2}' : mode === 'bibo' ? 'bounded input' : 'shift then system'}`;
    if (rightEl) rightEl.innerHTML = `<strong>Path B:</strong> ${mode === 'superposition' ? 'a S{x1} + b S{x2}' : mode === 'bibo' ? 'output behavior' : 'system then shift'}`;

    if (!ctx || !canvas) return;
    const { width, height } = setupInteractiveDemoCanvas(canvas, ctx, 300, 340);
    const left = 42;
    const right = width - 18;
    const top = 24;
    const bottom = height - 38;
    const all = points.flatMap((p) => [p.left, p.right]);
    const span = Math.max(1.5, Math.max(...all.map(Math.abs)));
    const toX = (i) => left + (i / (points.length - 1)) * (right - left);
    const toY = (v) => (top + bottom) / 2 - (v / span) * ((bottom - top) / 2 - 10);
    ctx.strokeStyle = '#dbe3f0';
    ctx.beginPath();
    ctx.moveTo(left, (top + bottom) / 2);
    ctx.lineTo(right, (top + bottom) / 2);
    ctx.stroke();
    ctx.fillStyle = '#334155';
    ctx.font = '700 13px Quicksand, sans-serif';
    ctx.fillText('Path comparison', left, top - 6);
    [
      ['left', '#0f766e', []],
      ['right', '#1d4ed8', [6, 4]]
    ].forEach(([key, color, dash]) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.6;
      ctx.setLineDash(dash);
      ctx.beginPath();
      points.forEach((p, i) => {
        const x = toX(i);
        const y = toY(p[key]);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    });
    ctx.setLineDash([]);
    ctx.fillStyle = pass ? '#166534' : '#991b1b';
    ctx.font = '900 15px Quicksand, sans-serif';
    ctx.fillText(pass ? 'curves overlap' : `max difference ${fmt(maxDiff)}`, left, bottom + 24);
  };

  Object.values(controls).forEach((control) => control?.addEventListener('input', update));
  update();
}

function renderExponentialEnvelopeFallback(node, demo) {
  const title = getInteractiveDemoTitle(demo, 'Exponential sketcher');
  const subtitle = getInteractiveDemoSubtitle(demo) || 'Change the decay rate and frequency; the envelope tells you the sketch.';
  const state = { a: 1, omega: 5, mode: 'decay', showEnvelope: true };

  node.innerHTML = `
    <section class="interactive-demo-shell interactive-demo-shell--exponential">
      <div class="interactive-demo-head">
        <div class="interactive-demo-title">${escapeHtml(title)}</div>
        <div class="interactive-demo-subtitle">${escapeHtml(subtitle)}</div>
      </div>
      <div class="interactive-demo-grid">
        <div class="interactive-demo-controls">
          <label class="interactive-demo-control">
            <span class="interactive-demo-control-label">a</span>
            <div class="interactive-demo-slider-row"><input type="range" min="0.25" max="5" step="0.05" value="${state.a}" data-control="a"><strong class="interactive-demo-control-value" data-value="a"></strong></div>
          </label>
          <label class="interactive-demo-control">
            <span class="interactive-demo-control-label">omega</span>
            <div class="interactive-demo-slider-row"><input type="range" min="1" max="12" step="0.25" value="${state.omega}" data-control="omega"><strong class="interactive-demo-control-value" data-value="omega"></strong></div>
          </label>
          <label class="interactive-demo-control">
            <span class="interactive-demo-control-label">Mode</span>
            <select class="interactive-demo-select" data-control="mode">
              <option value="decay">decay: e^(-at)</option>
              <option value="growth">growth: e^(at)</option>
              <option value="damped">damped sinusoid</option>
            </select>
          </label>
          <label class="interactive-demo-check"><input type="checkbox" checked data-control="showEnvelope"> Show envelope</label>
          <div class="interactive-demo-brief-card"><div class="interactive-demo-brief-label">Time constant</div><div class="interactive-demo-brief-copy" data-copy="tau"></div></div>
        </div>
        <div class="interactive-demo-stage"><canvas class="interactive-demo-canvas" height="300"></canvas></div>
      </div>
      <div class="interactive-demo-readouts"><div class="interactive-demo-readout" data-readout="note"></div></div>
    </section>
  `;

  const canvas = node.querySelector('.interactive-demo-canvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  const controls = {
    a: node.querySelector('[data-control="a"]'),
    omega: node.querySelector('[data-control="omega"]'),
    mode: node.querySelector('[data-control="mode"]'),
    showEnvelope: node.querySelector('[data-control="showEnvelope"]')
  };
  const values = {
    a: node.querySelector('[data-value="a"]'),
    omega: node.querySelector('[data-value="omega"]')
  };
  const tauEl = node.querySelector('[data-copy="tau"]');
  const noteEl = node.querySelector('[data-readout="note"]');
  const update = () => {
    state.a = Number(controls.a.value);
    state.omega = Number(controls.omega.value);
    state.mode = controls.mode.value;
    state.showEnvelope = controls.showEnvelope.checked;
    if (values.a) values.a.textContent = fmt(state.a);
    if (values.omega) values.omega.textContent = fmt(state.omega);
    const tau = 1 / state.a;
    if (tauEl) tauEl.textContent = `T = 1/a = ${fmt(tau)} s`;
    if (noteEl) noteEl.innerHTML = `<strong>Landmark:</strong> at one time constant, decay reaches about 1/e = 0.37 of the starting value.`;

    if (!ctx || !canvas) return;
    const { width, height } = setupInteractiveDemoCanvas(canvas, ctx, 300, 340);
    const left = 42;
    const right = width - 18;
    const top = 26;
    const bottom = height - 36;
    const toX = (t) => left + (t / 5) * (right - left);
    const yMax = state.mode === 'growth' ? Math.min(Math.exp(state.a * 5), 20) : 1.15;
    const toY = (v) => bottom - ((v + yMax) / (2 * yMax)) * (bottom - top);
    ctx.strokeStyle = '#dbe3f0';
    ctx.beginPath();
    ctx.moveTo(left, (top + bottom) / 2);
    ctx.lineTo(right, (top + bottom) / 2);
    ctx.stroke();
    ctx.fillStyle = '#334155';
    ctx.font = '700 13px Quicksand, sans-serif';
    ctx.fillText('t', right - 8, (top + bottom) / 2 - 8);
    if (state.showEnvelope) {
      ctx.strokeStyle = '#0f766e';
      ctx.setLineDash([6, 4]);
      [1, -1].forEach((sign) => {
        ctx.beginPath();
        for (let i = 0; i <= 260; i += 1) {
          const t = (5 * i) / 260;
          const env = sign * (state.mode === 'growth' ? Math.exp(state.a * t) : Math.exp(-state.a * t));
          const x = toX(t);
          const y = toY(Math.max(-yMax, Math.min(yMax, env)));
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });
      ctx.setLineDash([]);
    }
    ctx.strokeStyle = '#1d4ed8';
    ctx.lineWidth = 2.7;
    ctx.beginPath();
    for (let i = 0; i <= 360; i += 1) {
      const t = (5 * i) / 360;
      const env = state.mode === 'growth' ? Math.exp(state.a * t) : Math.exp(-state.a * t);
      const val = state.mode === 'damped' ? env * Math.cos(state.omega * t) : env;
      const x = toX(t);
      const y = toY(Math.max(-yMax, Math.min(yMax, val)));
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    const tauX = toX(Math.min(tau, 5));
    ctx.strokeStyle = '#f59e0b';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(tauX, top);
    ctx.lineTo(tauX, bottom);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#475569';
    ctx.fillText('T=1/a', tauX + 6, top + 16);
  };

  Object.values(controls).forEach((control) => control?.addEventListener('input', update));
  update();
}

function renderMatrixLocatorFallback(node, demo) {
  const title = getInteractiveDemoTitle(demo, 'Matrix entry locator');
  const subtitle = getInteractiveDemoSubtitle(demo) || 'Row index first, column index second.';
  const state = { m: 3, n: 4, i: 2, j: 3 };
  node.innerHTML = `
    <section class="interactive-demo-shell interactive-demo-shell--matrix-locator">
      <div class="interactive-demo-head"><div class="interactive-demo-title">${escapeHtml(title)}</div><div class="interactive-demo-subtitle">${escapeHtml(subtitle)}</div></div>
      <div class="interactive-demo-grid">
        <div class="interactive-demo-controls">
          ${['m','n','i','j'].map((key) => `<label class="interactive-demo-control"><span class="interactive-demo-control-label">${key === 'm' ? 'Rows m' : key === 'n' ? 'Columns n' : key === 'i' ? 'Row index i' : 'Column index j'}</span><div class="interactive-demo-slider-row"><input type="range" min="1" max="5" step="1" value="${state[key]}" data-control="${key}"><strong class="interactive-demo-control-value" data-value="${key}"></strong></div></label>`).join('')}
          <div class="interactive-demo-brief-card"><div class="interactive-demo-brief-label">Selected entry</div><div class="interactive-demo-brief-copy" data-copy="entry"></div></div>
        </div>
        <div class="interactive-demo-stage"><canvas class="interactive-demo-canvas" height="300"></canvas></div>
      </div>
    </section>
  `;
  const canvas = node.querySelector('.interactive-demo-canvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  const controls = Object.fromEntries(['m','n','i','j'].map((key) => [key, node.querySelector(`[data-control="${key}"]`)]));
  const values = Object.fromEntries(['m','n','i','j'].map((key) => [key, node.querySelector(`[data-value="${key}"]`)]));
  const entryEl = node.querySelector('[data-copy="entry"]');
  const update = () => {
    state.m = Number(controls.m.value);
    state.n = Number(controls.n.value);
    state.i = Math.min(Number(controls.i.value), state.m);
    state.j = Math.min(Number(controls.j.value), state.n);
    controls.i.max = String(state.m);
    controls.j.max = String(state.n);
    controls.i.value = String(state.i);
    controls.j.value = String(state.j);
    Object.entries(values).forEach(([key, el]) => { if (el) el.textContent = String(state[key]); });
    if (entryEl) entryEl.textContent = `a_${state.i}${state.j}: row ${state.i}, column ${state.j}`;
    if (!ctx || !canvas) return;
    const { width, height } = setupInteractiveDemoCanvas(canvas, ctx, 300, 340);
    const cell = Math.min(56, Math.floor((Math.min(width - 120, height - 70)) / Math.max(state.m, state.n)));
    const startX = Math.max(70, Math.floor((width - state.n * cell) / 2));
    const startY = Math.max(48, Math.floor((height - state.m * cell) / 2));
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    ctx.font = '800 13px Quicksand, sans-serif';
    ctx.textAlign = 'center';
    for (let c = 0; c < state.n; c += 1) {
      ctx.fillStyle = '#64748b';
      ctx.fillText(String(c + 1), startX + c * cell + cell / 2, startY - 12);
    }
    for (let r = 0; r < state.m; r += 1) {
      ctx.fillStyle = '#64748b';
      ctx.fillText(String(r + 1), startX - 22, startY + r * cell + cell / 2 + 5);
      for (let c = 0; c < state.n; c += 1) {
        const active = r === state.i - 1 && c === state.j - 1;
        ctx.fillStyle = active ? '#ccfbf1' : '#ffffff';
        ctx.strokeStyle = active ? '#0f766e' : '#cbd5e1';
        ctx.lineWidth = active ? 3 : 1.5;
        ctx.fillRect(startX + c * cell, startY + r * cell, cell, cell);
        ctx.strokeRect(startX + c * cell, startY + r * cell, cell, cell);
        ctx.fillStyle = active ? '#0f766e' : '#334155';
        ctx.fillText(`a${r + 1}${c + 1}`, startX + c * cell + cell / 2, startY + r * cell + cell / 2 + 5);
      }
    }
  };
  Object.values(controls).forEach((control) => control?.addEventListener('input', update));
  update();
}

function renderParameterResponseFallback(node, demo) {
  const title = getInteractiveDemoTitle(demo, 'DC motor parameter response');
  const subtitle = getInteractiveDemoSubtitle(demo) || 'Move one parameter at a time and watch only one aspect of the response change.';
  const state = { K_T: 1, J: 1.6, B: 1.4 };
  node.innerHTML = `
    <section class="interactive-demo-shell interactive-demo-shell--parameter-response">
      <div class="interactive-demo-head"><div class="interactive-demo-title">${escapeHtml(title)}</div><div class="interactive-demo-subtitle">${escapeHtml(subtitle)}</div></div>
      <div class="interactive-demo-grid">
        <div class="interactive-demo-controls">
          ${[
            ['K_T', 'Drive gain K_T', 0.5, 4, 0.05, state.K_T],
            ['J', 'Inertia J', 0.5, 4, 0.05, state.J],
            ['B', 'Damping B', 0.5, 4, 0.05, state.B]
          ].map(([key, label, min, max, step, value]) => `
            <label class="interactive-demo-control">
              <span class="interactive-demo-control-label">${escapeHtml(label)}</span>
              <div class="interactive-demo-slider-row"><input type="range" min="${min}" max="${max}" step="${step}" value="${value}" data-control="${key}"><strong class="interactive-demo-control-value" data-value="${key}"></strong></div>
            </label>
          `).join('')}
          <div class="interactive-demo-brief-card"><div class="interactive-demo-brief-label">Read this first</div><div class="interactive-demo-brief-copy" data-copy="summary"></div></div>
        </div>
        <div class="interactive-demo-stage"><canvas class="interactive-demo-canvas" height="300"></canvas></div>
      </div>
      <div class="interactive-demo-readouts">
        <div class="interactive-demo-readout" data-readout="gain"></div>
        <div class="interactive-demo-readout" data-readout="tau"></div>
      </div>
    </section>
  `;
  const canvas = node.querySelector('.interactive-demo-canvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  const controls = {
    K_T: node.querySelector('[data-control="K_T"]'),
    J: node.querySelector('[data-control="J"]'),
    B: node.querySelector('[data-control="B"]')
  };
  const values = {
    K_T: node.querySelector('[data-value="K_T"]'),
    J: node.querySelector('[data-value="J"]'),
    B: node.querySelector('[data-value="B"]')
  };
  const summaryEl = node.querySelector('[data-copy="summary"]');
  const gainEl = node.querySelector('[data-readout="gain"]');
  const tauEl = node.querySelector('[data-readout="tau"]');
  const update = () => {
    state.K_T = Number(controls.K_T.value);
    state.J = Number(controls.J.value);
    state.B = Number(controls.B.value);
    Object.entries(values).forEach(([key, el]) => { if (el) el.textContent = fmt(state[key]); });
    const gain = state.K_T / Math.max(state.B, 0.1);
    const tau = state.J / Math.max(state.B, 0.1);
    if (summaryEl) summaryEl.textContent = 'Change one parameter, then read the shape: gain, speed, and damping separate cleanly.';
    if (gainEl) gainEl.innerHTML = `<strong>Steady gain:</strong> ${fmt(gain)} (mostly set by K_T and B)`;
    if (tauEl) tauEl.innerHTML = `<strong>Time constant:</strong> ${fmt(tau)} s (mostly set by J and B)`;
    if (!ctx || !canvas) return;
    const { width, height } = setupInteractiveDemoCanvas(canvas, ctx, 300, 340);
    const left = 42;
    const right = width - 18;
    const top = 26;
    const bottom = height - 36;
    const toX = (t) => left + (t / 6) * (right - left);
    const response = Array.from({ length: 300 }, (_, i) => {
      const t = (6 * i) / 299;
      return gain * (1 - Math.exp(-t / Math.max(tau, 0.2)));
    });
    const yMax = Math.max(2, ...response) * 1.1;
    const toY = (v) => bottom - (v / yMax) * (bottom - top);
    ctx.strokeStyle = '#dbe3f0';
    ctx.beginPath();
    ctx.moveTo(left, bottom);
    ctx.lineTo(right, bottom);
    ctx.stroke();
    ctx.fillStyle = '#334155';
    ctx.font = '700 13px Quicksand, sans-serif';
    ctx.fillText('step response', left, top - 2);
    ctx.strokeStyle = '#1d4ed8';
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    response.forEach((value, index) => {
      const x = toX((6 * index) / 299);
      const y = toY(value);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    const tauX = toX(Math.min(tau, 6));
    ctx.strokeStyle = '#0f766e';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(tauX, top);
    ctx.lineTo(tauX, bottom);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#0f766e';
    ctx.fillText('t = tau', tauX + 6, top + 16);
  };
  Object.values(controls).forEach((control) => control?.addEventListener('input', update));
  update();
}

function renderPointwiseMultiplicationFallback(node, demo) {
  const title = getInteractiveDemoTitle(demo, 'Point-by-point multiplication');
  const subtitle = getInteractiveDemoSubtitle(demo) || 'Each sample multiplies only its matching sample.';
  const state = { a: 10, mismatch: false, highlight: true };
  const f = (t) => Math.sin(2 * Math.PI * t) + 0.35 * Math.cos(6 * Math.PI * t);
  const g = (t) => Math.exp(-state.a * t);
  node.innerHTML = `
    <section class="interactive-demo-shell interactive-demo-shell--pointwise">
      <div class="interactive-demo-head"><div class="interactive-demo-title">${escapeHtml(title)}</div><div class="interactive-demo-subtitle">${escapeHtml(subtitle)}</div></div>
      <div class="interactive-demo-grid">
        <div class="interactive-demo-controls">
          <label class="interactive-demo-control">
            <span class="interactive-demo-control-label">Decay rate a</span>
            <div class="interactive-demo-slider-row"><input type="range" min="1" max="30" step="0.5" value="${state.a}" data-control="a"><strong class="interactive-demo-control-value" data-value="a"></strong></div>
          </label>
          <label class="interactive-demo-check"><input type="checkbox" data-control="mismatch"> Vector orientation mismatch</label>
          <label class="interactive-demo-check"><input type="checkbox" checked data-control="highlight"> Highlight one sample</label>
          <div class="interactive-demo-brief-card"><div class="interactive-demo-brief-label">Formula</div><div class="interactive-demo-brief-copy" data-copy="formula"></div></div>
        </div>
        <div class="interactive-demo-stage"><canvas class="interactive-demo-canvas" height="300"></canvas></div>
      </div>
      <div class="interactive-demo-readouts">
        <div class="interactive-demo-readout" data-readout="status"></div>
      </div>
    </section>
  `;
  const canvas = node.querySelector('.interactive-demo-canvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  const controls = {
    a: node.querySelector('[data-control="a"]'),
    mismatch: node.querySelector('[data-control="mismatch"]'),
    highlight: node.querySelector('[data-control="highlight"]')
  };
  const values = { a: node.querySelector('[data-value="a"]') };
  const formulaEl = node.querySelector('[data-copy="formula"]');
  const statusEl = node.querySelector('[data-readout="status"]');
  const update = () => {
    state.a = Number(controls.a.value);
    state.mismatch = controls.mismatch.checked;
    state.highlight = controls.highlight.checked;
    if (values.a) values.a.textContent = fmt(state.a);
    if (formulaEl) formulaEl.textContent = 'h(t) = f(t) g(t), sample by sample';
    if (statusEl) statusEl.innerHTML = state.mismatch
      ? '<strong>Mismatch:</strong> row versus column orientation does not line up.'
      : '<strong>Match:</strong> each output sample uses the matching input samples only.';

    if (!ctx || !canvas) return;
    const { width, height } = setupInteractiveDemoCanvas(canvas, ctx, 300, 340);
    const left = 42;
    const right = width - 18;
    const top = 24;
    const bottom = height - 36;
    const toX = (t) => left + (t / 3) * (right - left);
    const toY = (v) => (top + bottom) / 2 - v * 40;
    const samples = Array.from({ length: 240 }, (_, i) => {
      const t = (3 * i) / 239;
      return { t, f: f(t), g: g(t), h: f(t) * g(t) };
    });
    ctx.strokeStyle = '#dbe3f0';
    ctx.beginPath();
    ctx.moveTo(left, (top + bottom) / 2);
    ctx.lineTo(right, (top + bottom) / 2);
    ctx.stroke();
    const curves = [
      ['f', '#1d4ed8', []],
      ['g', '#0f766e', [6, 4]],
      ['h', '#dc2626', [2, 3]]
    ];
    curves.forEach(([key, color, dash]) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.2;
      ctx.setLineDash(dash);
      ctx.beginPath();
      samples.forEach((sample, index) => {
        const x = toX(sample.t);
        const y = toY(sample[key]);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    });
    ctx.setLineDash([]);
    if (state.highlight) {
      const idx = 120;
      const sample = samples[idx];
      const x = toX(sample.t);
      ctx.strokeStyle = '#f59e0b';
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(x, top + 10);
      ctx.lineTo(x, bottom);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#f59e0b';
      ctx.fillText('k', x - 2, top + 16);
    }
  };
  Object.values(controls).forEach((control) => control?.addEventListener('input', update));
  update();
}

function resetLearnKnowledgePointState() {
  learnKnowledgePoints = [];
  currentKnowledgePointIndex = 0;
  currentFullLessonHtml = '';
  currentLessonTrailingHtml = '';
  if (learnKpTitle) learnKpTitle.textContent = 'Preparing lesson...';
  if (learnKpPrevBtn) learnKpPrevBtn.disabled = true;
  if (learnKpNextBtn) learnKpNextBtn.disabled = true;
}

function compactWhitespace(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function parseSectionTitleParts(value, fallbackCode = '', fallbackTitle = '') {
  const raw = compactWhitespace(value);
  const fallback = compactWhitespace(fallbackCode);
  const fallbackParsed = fallback && fallback !== raw
    ? parseSectionTitleParts(fallback, '', '')
    : null;
  const codeMatch = raw.match(/^((?:[A-Za-z]\.)?\d+(?:[.\-]\d+)*)(?=\s|$|[-:：–—])/);
  if (codeMatch) {
    const code = codeMatch[1];
    const title = raw
      .slice(code.length)
      .replace(/^\s*(?:[-:：–—]\s*)?/, '')
      .trim();
    return {
      code,
      title: title || compactWhitespace(fallbackTitle) || code
    };
  }
  if (fallbackParsed && fallbackParsed.code) {
    return {
      code: fallbackParsed.code,
      title: raw || compactWhitespace(fallbackTitle) || fallbackParsed.title || fallbackParsed.code
    };
  }
  return {
    code: fallback || '',
    title: raw || compactWhitespace(fallbackTitle) || fallback || ''
  };
}

// Lesson rendering rules enforced on the client so the first overview stays concise
// and visually distinct concepts do not collapse into one merged presentation block.
const LESSON_RENDER_RULES = Object.freeze({
  compactOverview: true,
  maxOverviewConcepts: 6,
  conceptNamesOnly: true,
  splitDiagonalIdentityVisuals: true
});

function isDiagonalIdentityCombinedTitle(title) {
  const text = compactWhitespace(title).toLowerCase();
  return (
    (text.includes('对角矩阵') && text.includes('单位矩阵'))
    || (text.includes('diagonal') && text.includes('identity'))
  );
}

function normalizeOverviewConceptLabel(value) {
  const text = compactWhitespace(value);
  if (!text) return '';

  const lower = text.toLowerCase();
  const rules = [
    { match: /read\s+a[_{]?ij[}\s]*as row/i, en: 'matrix entry notation', zh: '矩阵元素记号' },
    { match: /diagonal means|diagonal matrix|off-diagonal/i, en: 'diagonal matrix', zh: '对角矩阵' },
    { match: /identity is|identity matrix/i, en: 'identity matrix', zh: '单位矩阵' },
    { match: /zero means|zero matrix/i, en: 'zero matrix', zh: '零矩阵' },
    { match: /symmetric means|symmetric matrix/i, en: 'symmetric matrix', zh: '对称矩阵' },
    { match: /transpose swaps|transpose/i, en: 'transpose', zh: '转置' },
    { match: /row vector/i, en: 'row vector', zh: '行向量' },
    { match: /column vector/i, en: 'column vector', zh: '列向量' },
    { match: /square matrix/i, en: 'square matrix', zh: '方阵' },
    { match: /matrix equality/i, en: 'matrix equality', zh: '矩阵相等' }
  ];

  for (const rule of rules) {
    if (rule.match.test(lower)) {
      return detectLang(text) === 'zh' ? rule.zh : rule.en;
    }
  }

  const trimmed = text
    .replace(/^[-*•]\s*/, '')
    .replace(/^concepts?(?: in this section)?[:：]?\s*/i, '')
    .replace(/\b(means|is|are|when|where|with|that)\b[\s\S]*$/i, '')
    .replace(/[,:;].*$/, '')
    .trim();

  return compactWhitespace(trimmed || text);
}

function inferLessonChunkTitle(chunkHtml, fallbackTitle = 'Core Lesson', chunkIndex = 0) {
  const temp = document.createElement('div');
  temp.innerHTML = chunkHtml || '';
  const text = compactWhitespace(temp.textContent || '');
  const heading = Array.from(temp.querySelectorAll('h1, h2, h3')).find((node) => compactWhitespace(node.textContent || ''));
  if (heading) return compactWhitespace(heading.textContent || '');
  if (/a\s*:\s*b\s*:\s*c|0\s*:\s*2\s*:\s*11|colon notation|stop value|termination value/i.test(text)) {
    return '1. Colon notation creates stored vectors';
  }
  if (/w_k|cube roots|three unique cube roots|k\s*=\s*0\s*:\s*2|exp\(1j/i.test(text)) {
    return '2. Vectorize the cube roots';
  }
  if (/f\(1\)|indexing starts|first stored|function input|storage position|k\(5\)/i.test(text)) {
    return '3. Index position is not function input';
  }
  if (/sampled sinusoid|time vector|0\.2\/500|10\s*hz|sinusoidal signal|frequency in hertz/i.test(text)) {
    return '4. Build a sampled sinusoid vector';
  }
  return `${fallbackTitle || 'Core Lesson'} ${chunkIndex + 1}`;
}

function buildInlineMatrixVisual(kind = 'diagonal') {
  const isIdentity = kind === 'identity';
  const values = isIdentity
    ? [['1', '0', '0'], ['0', '1', '0'], ['0', '0', '1']]
    : [['2', '0', '0'], ['0', '-1', '0'], ['0', '0', '5']];

  const rowsHtml = values.map((row, rowIndex) => `
    <tr>
      ${row.map((cell, colIndex) => {
        const diagonal = rowIndex === colIndex;
        const bg = diagonal ? (isIdentity ? '#DBEAFE' : '#DCFCE7') : '#FFFFFF';
        const border = diagonal ? (isIdentity ? '#60A5FA' : '#4ADE80') : '#CBD5E1';
        return `<td style="min-width:34px;height:34px;padding:0 8px;text-align:center;font-size:18px;font-weight:700;color:#0F172A;background:${bg};border:1px solid ${border};border-radius:8px;">${cell}</td>`;
      }).join('')}
    </tr>
  `).join('');

  return `
    <div style="display:flex;justify-content:center;margin:14px 0 6px;">
      <div style="padding:10px 16px;border:1px solid #E2E8F0;border-radius:16px;background:linear-gradient(180deg,#FFFFFF 0%,#F8FAFC 100%);">
        <table style="border-collapse:separate;border-spacing:6px 8px;margin:0 auto;">
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>
    </div>
  `;
}

function buildDiagonalIdentitySplitHtml(block) {
  const title = compactWhitespace(block?.title || '');
  const isZh = detectLang(title) === 'zh';
  const headingTag = /^h1$/i.test(block?.headingTag || '') ? 'h1' : 'h2';
  const headingHtml = `<${headingTag}>${escapeHtml(title || (isZh ? '对角矩阵和单位矩阵' : 'Diagonal and Identity Matrices'))}</${headingTag}>`;

  const diagonalTitle = isZh ? '对角矩阵' : 'Diagonal Matrix';
  const diagonalCopy = isZh
    ? '主对角线以外的元素全为 0，主对角线上的元素可以是任意实数。'
    : 'All off-diagonal entries are zero, while diagonal entries can be any real numbers.';
  const identityTitle = isZh ? '单位矩阵' : 'Identity Matrix';
  const identityCopy = isZh
    ? '主对角线上的元素全为 1，因此它是对角矩阵的一个特殊情况。'
    : 'All diagonal entries are 1, so it is a special case of a diagonal matrix.';

  return `
    ${headingHtml}
    <div class="lecture-note-card lecture-note-card-rule">
      <h3>${diagonalTitle}</h3>
      <p>${diagonalCopy}</p>
      ${buildInlineMatrixVisual('diagonal')}
    </div>
    <div class="lecture-note-card lecture-note-card-example">
      <h3>${identityTitle}</h3>
      <p>${identityCopy}</p>
      ${buildInlineMatrixVisual('identity')}
    </div>
  `;
}

function isMatrixEqualityTitle(title) {
  const text = compactWhitespace(title).toLowerCase();
  return text.includes('matrix equality') || text.includes('矩阵相等');
}

function buildMatrixEqualityExampleHtml(title = '') {
  const isZh = detectLang(title) === 'zh';
  return `
    <div class="lecture-note-card lecture-note-card-example">
      <h3>${isZh ? '最小例子' : 'Minimal Example'}</h3>
      <p>${isZh
        ? '例如，若'
        : 'For example, if'}
      \\(
      \\begin{bmatrix}
      x & 2 \\\\
      3 & y
      \\end{bmatrix}
      =
      \\begin{bmatrix}
      1 & 2 \\\\
      3 & 4
      \\end{bmatrix}
      \\)，
      ${isZh
        ? '就按对应位置逐个比较，得到'
        : 'compare corresponding entries one by one to get'}
      \\(x=1\\) ${isZh ? '且' : 'and'} \\(y=4\\)。</p>
    </div>
  `;
}

function applyLessonRenderRulesToKnowledgePoint(block) {
  if (!block) return '';
  if (LESSON_RENDER_RULES.splitDiagonalIdentityVisuals && isDiagonalIdentityCombinedTitle(block.title || '')) {
    return buildDiagonalIdentitySplitHtml(block);
  }
  let html = block.html || '';
  if (isMatrixEqualityTitle(block.title || '') && !/Minimal Example|最小例子/i.test(html)) {
    html = html.replace(/(<h3[^>]*>.*?(Exam Trigger|考试触发).*?<\/h3>)/i, `${buildMatrixEqualityExampleHtml(block.title || '')}$1`);
    if (!/Minimal Example|最小例子/i.test(html)) {
      html += buildMatrixEqualityExampleHtml(block.title || '');
    }
  }
  return html;
}

function buildLessonOverviewHtml(nodes) {
  const sourceNodes = Array.isArray(nodes) ? nodes : [];
  if (!sourceNodes.length) return '';

  const topLevel = sourceNodes
    .map((node) => {
      if (!node || node.nodeType !== Node.ELEMENT_NODE) return null;
      return {
        tag: node.tagName,
        text: compactWhitespace(node.textContent || ''),
        html: node.innerHTML || ''
      };
    })
    .filter(Boolean);

  let objective = '';
  let collectingConcepts = false;
  const concepts = [];
  const stopCollectingConcepts = (entry) => {
    if (!entry) return false;
    const text = entry.text || '';
    if (!text) return false;
    if (/^After this overview/i.test(text) || /^After this section/i.test(text) || /^The next page/i.test(text)) {
      return true;
    }
    if (entry.tag === 'TABLE') return true;
    if (/^H[1-6]$/.test(entry.tag || '')) return true;
    if (entry.html && /lesson-img|kc-visual-meta|kc-container|kc-quiz-plan|lesson-test-banner|<img\b|<table\b|<details\b/i.test(entry.html)) {
      return true;
    }
    if (entry.tag === 'P') {
      if (/^[-*]\s+/.test(text)) return false;
      if (text.length > 90) return true;
      if (/[.:;!?]/.test(text) && text.length > 48) return true;
    }
    return false;
  };

  const isShortConceptLikeText = (text) => {
    const value = compactWhitespace(text || '');
    if (!value) return false;
    if (value.length > 60) return false;
    if (/[.!?;:]/.test(value)) return false;
    return true;
  };

  const pushConcept = (value) => {
    const rawText = compactWhitespace(value);
    const text = LESSON_RENDER_RULES.conceptNamesOnly ? normalizeOverviewConceptLabel(rawText) : rawText;
    if (!text) return;
    if (concepts.some((item) => item.toLowerCase() === text.toLowerCase())) return;
    concepts.push(text);
  };

  topLevel.forEach((entry) => {
    const text = entry.text;
    if (!text) return;

    if (!objective) {
      const objectiveMatch = text.match(/^>?\s*Section Objective[:：]?\s*(.+)$/i);
      if (objectiveMatch) {
        objective = compactWhitespace(objectiveMatch[1]);
        return;
      }
    }

    if (/^In this section, you will meet[:：]?$/i.test(text) || /^Concepts?(?: in this section)?[:：]?$/i.test(text)) {
      collectingConcepts = true;
      return;
    }

    if (collectingConcepts) {
      if (stopCollectingConcepts(entry)) {
        collectingConcepts = false;
        return;
      }

      if (entry.tag === 'UL' || entry.tag === 'OL') {
        const temp = document.createElement(entry.tag);
        temp.innerHTML = entry.html;
        Array.from(temp.querySelectorAll('li')).forEach((li) => pushConcept(li.textContent || ''));
        return;
      }

      if (entry.tag === 'P' && isShortConceptLikeText(text)) {
        pushConcept(text);
        return;
      }

      collectingConcepts = false;
    }
  });

  if (!objective) {
    const firstParagraph = topLevel.find((entry) => entry.tag === 'P' && entry.text.length > 20);
    if (firstParagraph) objective = firstParagraph.text;
  }

  if (!concepts.length) {
    const listNodes = topLevel.filter((entry) => entry.tag === 'UL' || entry.tag === 'OL');
    listNodes.forEach((entry) => {
      const temp = document.createElement(entry.tag);
      temp.innerHTML = entry.html;
      Array.from(temp.querySelectorAll('li')).forEach((li) => pushConcept(li.textContent || ''));
    });
  }

  if (!objective && !concepts.length) return '';

  const limitedConcepts = concepts.slice(0, LESSON_RENDER_RULES.maxOverviewConcepts);
  return `
    <div class="lecture-note-card lecture-note-card-example">
      <h3>Section Objective</h3>
      <p>${inlineFormat(objective || 'Understand the key idea of this section before moving into the detailed steps.')}</p>
    </div>
    <div class="lecture-note-card lecture-note-card-rule">
      <h3>Concepts In This Section</h3>
      <ol>
        ${limitedConcepts.map((item) => `<li>${inlineFormat(item)}</li>`).join('')}
      </ol>
    </div>
  `;
}

function parseLessonKnowledgePoints(html) {
  const source = String(html || '').trim();
  if (!source) return { points: [], trailingHtml: '' };

  const wrapper = document.createElement('div');
  wrapper.innerHTML = source;
  const nodes = Array.from(wrapper.childNodes);
  const points = [];
  let current = null;
  let summaryPage = null;
  const quizParts = [];
  const introNodes = [];
  let sawPrimaryHeading = false;
  let overviewInserted = false;
  let pendingLeadingKnowledgeHtml = '';

  const toHtml = (node) => node.outerHTML || node.textContent || '';
  const getNodeText = (node) => compactWhitespace(node?.textContent || '').trim();

  const isSectionTitleHeading = (node) => {
    if (!node || node.nodeType !== Node.ELEMENT_NODE || node.tagName !== 'H1') return false;
    const text = getNodeText(node);
    return /^(?:[A-Z]\.?\d+|\d+)(?:[-.]\d+)*\s+/.test(text);
  };

  const isPrimaryKnowledgeHeading = (node) => {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return false;
    if (node.tagName !== 'H2') return false;
    const text = getNodeText(node);
    return /^\d+[.)]\s+/.test(text) || /^[A-Z]\d+(?:[-.]\d+)*\s+/.test(text);
  };

  const isQuizNode = (node) => {
    return node
      && node.nodeType === Node.ELEMENT_NODE
      && (
        node.classList.contains('lesson-test-banner')
        || node.classList.contains('kc-quiz-plan')
      );
  };

  const isSummaryStart = (node) => {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return false;
    const text = getNodeText(node);
    // Match with or without bold markers / emoji variants
    return /^📌\s*Key Takeaways$/i.test(text)
      || /^Key Takeaways$/i.test(text)
      || /^\*{0,2}📌\s*Key Takeaways\*{0,2}$/i.test(text)
      || /^\*{0,2}Key Takeaways\*{0,2}$/i.test(text);
  };

  const hasMeaningfulKnowledgeBody = (html) => {
    const raw = String(html || '').trim();
    if (!raw) return false;
    const temp = document.createElement('div');
    temp.innerHTML = raw;

    Array.from(temp.querySelectorAll('h1, h2, h3, h4, h5, h6')).forEach((heading) => heading.remove());

    if (temp.querySelector('img, .lesson-img, .math-block, pre, blockquote, ul, ol, table, details, .kc-visual-meta, .kc-container, .lesson-test-banner, .kc-quiz-plan')) {
      return true;
    }

    const text = compactWhitespace(temp.textContent || '').trim();
    return Boolean(text);
  };

  const estimateLessonNodeWeight = (node) => {
    if (!node) return 0;
    if (node.nodeType === Node.TEXT_NODE) {
      return compactWhitespace(node.textContent || '').length / 420;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return 0;
    const textLength = compactWhitespace(node.textContent || '').length;
    let weight = Math.max(0.2, textLength / 420);
    const tag = node.tagName || '';
    if (/^H[1-6]$/.test(tag)) weight += 0.35;
    if (node.classList.contains('math-block') || tag === 'PRE') weight += 1.2;
    if (node.querySelector && node.querySelector('img, .lesson-img')) weight += 2.3;
    if (tag === 'UL' || tag === 'OL') weight += Math.min(1.8, Array.from(node.children || []).length * 0.35);
    if (node.querySelector && node.querySelector('table, details, .kc-container')) weight += 1.6;
    return weight;
  };

  const isMajorLessonSplitAnchor = (node) => {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return false;
    if (node.classList.contains('math-block')) {
      const text = compactWhitespace(node.textContent || '');
      if (!text || text.length < 6) return false;
      if (/^f\s*\(\s*0\s*\)\s*=/.test(text)) return false;
      return true;
    }
    if (/^H[2-3]$/.test(node.tagName || '')) return true;
    return false;
  };

  const splitAutoKnowledgePoint = (point) => {
    if (!point || point.type !== 'knowledge' || !point.autoSplit) return [point];
    const temp = document.createElement('div');
    temp.innerHTML = point.html || '';
    const children = Array.from(temp.childNodes);
    if (children.length < 8) return [point];

    const chunks = [];
    let chunkNodes = [];
    let chunkWeight = 0;

    const flushChunk = () => {
      const html = chunkNodes.map(toHtml).join('').trim();
      if (hasMeaningfulKnowledgeBody(html)) chunks.push(html);
      chunkNodes = [];
      chunkWeight = 0;
    };

    children.forEach((node) => {
      const shouldSplitBefore = isMajorLessonSplitAnchor(node)
        && chunkNodes.length > 0
        && chunkWeight >= 3.8;
      if (shouldSplitBefore) flushChunk();
      chunkNodes.push(node.cloneNode(true));
      chunkWeight += estimateLessonNodeWeight(node);
    });
    flushChunk();

    if (chunks.length <= 1) return [point];

    return chunks.map((chunkHtml, chunkIndex) => ({
      ...point,
      autoSplit: false,
      title: inferLessonChunkTitle(chunkHtml, point.title, chunkIndex),
      html: chunkHtml
    }));
  };

  const addParsedPoint = (point) => {
    splitAutoKnowledgePoint(point).forEach((entry) => {
      const cleanEntry = { ...entry };
      delete cleanEntry.autoSplit;
      points.push(cleanEntry);
    });
  };

  const pushCurrent = () => {
    if (!current) return;
    const content = current.parts.join('').trim();
    const plain = content.replace(/<[^>]+>/g, '').trim();
    const shouldKeep = current.type === 'overview'
      || current.type === 'summary'
      || current.type === 'quiz'
      || hasMeaningfulKnowledgeBody(content);
    if (content && plain && shouldKeep) addParsedPoint({
      type: current.type || 'knowledge',
      label: current.label || 'Knowledge Point',
      title: current.title,
      headingTag: current.headingTag || 'h2',
      html: content,
      autoSplit: Boolean(current.autoSplit)
    });
    current = null;
  };

  const ensureSummaryPage = () => {
    if (!summaryPage) {
      summaryPage = { type: 'summary', label: 'Summary', title: '📌 Key Takeaways', parts: [] };
    }
    return summaryPage;
  };

  const flushIntroNodes = ({ keepRemainderAsKnowledge = false } = {}) => {
    if (!introNodes.length) return;
    const objectiveNodes = [];
    const remainderNodes = [];
    let foundObjective = false;
    let collectingConcepts = false;
    let conceptsConsumed = false;

    const isConceptMarker = (node) => {
      if (!node || node.nodeType !== Node.ELEMENT_NODE) return false;
      const text = compactWhitespace(node.textContent || '');
      return /^In this section, you will meet[:：]?$/i.test(text)
        || /^Concepts?(?: in this section)?[:：]?$/i.test(text);
    };

    const isConceptListNode = (node) => {
      return node && node.nodeType === Node.ELEMENT_NODE && /^(UL|OL)$/i.test(node.tagName || '');
    };

    const isIntroConceptParagraph = (node) => {
      if (!node || node.nodeType !== Node.ELEMENT_NODE || node.tagName !== 'P') return false;
      const text = compactWhitespace(node.textContent || '');
      if (!text) return false;
      if (text.length > 60) return false;
      if (/[.:;!?]/.test(text)) return false;
      return true;
    };

    introNodes.forEach((node) => {
      if (!node || node.nodeType !== Node.ELEMENT_NODE) return;
      if (isSectionTitleHeading(node)) return;
      const text = compactWhitespace(node.textContent || '');
      const html = node.outerHTML || node.textContent || '';
      const isObjectiveNode = !foundObjective && /^>?\s*Section Objective[:：]?\s*(.+)$/i.test(text);

      if (isObjectiveNode) {
        foundObjective = true;
        objectiveNodes.push(node);
        return;
      }

      if (isConceptMarker(node)) {
        collectingConcepts = true;
        conceptsConsumed = true;
        objectiveNodes.push(node);
        return;
      }

      if (collectingConcepts) {
        if (isConceptListNode(node) || isIntroConceptParagraph(node)) {
          objectiveNodes.push(node);
          return;
        }
        collectingConcepts = false;
      }

      if (!conceptsConsumed && isConceptListNode(node)) {
        objectiveNodes.push(node);
        conceptsConsumed = true;
        return;
      }

      remainderNodes.push(html);
    });

    const overviewHtml = buildLessonOverviewHtml(objectiveNodes);
    if (overviewHtml) {
      points.push({ type: 'overview', label: 'Overview', title: 'Section Overview', html: overviewHtml });
      overviewInserted = true;
    }

    if (keepRemainderAsKnowledge) {
      const remainderHtml = remainderNodes.join('').trim();
      if (hasMeaningfulKnowledgeBody(remainderHtml)) {
        addParsedPoint({
          type: 'knowledge',
          label: 'Knowledge Point',
          title: 'Core Lesson',
          headingTag: 'h2',
          html: remainderHtml,
          autoSplit: true
        });
      }
    } else {
      const remainderHtml = remainderNodes.join('').trim();
      if (hasMeaningfulKnowledgeBody(remainderHtml)) {
        pendingLeadingKnowledgeHtml = `${pendingLeadingKnowledgeHtml}${remainderHtml}`;
      }
    }

    introNodes.length = 0;
  };

  nodes.forEach((node) => {
    if (isQuizNode(node)) {
      pushCurrent();
      quizParts.push(toHtml(node));
      return;
    }

    if (isSummaryStart(node)) {
      if (!sawPrimaryHeading && introNodes.length) {
        flushIntroNodes({ keepRemainderAsKnowledge: true });
      }
      pushCurrent();
      ensureSummaryPage().parts.push(toHtml(node));
      current = ensureSummaryPage();
      return;
    }

    if (isPrimaryKnowledgeHeading(node)) {
      if (!sawPrimaryHeading && introNodes.length) {
        flushIntroNodes({ keepRemainderAsKnowledge: false });
      }
      sawPrimaryHeading = true;
      pushCurrent();
      current = {
        type: 'knowledge',
        label: 'Knowledge Point',
        title: getNodeText(node) || 'Knowledge Point',
        headingTag: String(node.tagName || 'H2').toLowerCase(),
        parts: [toHtml(node)]
      };
      if (pendingLeadingKnowledgeHtml) {
        current.parts.push(pendingLeadingKnowledgeHtml);
        pendingLeadingKnowledgeHtml = '';
      }
      return;
    }

    if (current && current.type === 'summary') {
      current.parts.push(toHtml(node));
      return;
    }

    if (!sawPrimaryHeading) {
      introNodes.push(node.cloneNode(true));
      return;
    }

    if (!current) {
      current = {
        type: 'knowledge',
        label: 'Knowledge Point',
        title: 'Knowledge Point',
        headingTag: 'h2',
        parts: [],
        autoSplit: true
      };
    }
    current.parts.push(toHtml(node));
  });

  if (!sawPrimaryHeading && introNodes.length) {
    flushIntroNodes({ keepRemainderAsKnowledge: true });
  }

  pushCurrent();

  if (summaryPage) {
    const content = summaryPage.parts.join('').trim();
    if (hasMeaningfulKnowledgeBody(content)) {
      const existingSummaryIndex = points.findIndex((point) => point.type === 'summary');
      const normalizedSummary = {
        type: 'summary',
        label: 'Summary',
        title: '📌 Key Takeaways',
        headingTag: 'h2',
        html: content
      };
      if (existingSummaryIndex >= 0) points[existingSummaryIndex] = normalizedSummary;
      else addParsedPoint(normalizedSummary);
    }
  }

  while (points.length && !String((points[0].html || '')).replace(/<[^>]+>/g, '').trim()) {
    points.shift();
  }

  // Add the quiz page at the very end
  const quizHtml = quizParts.join('').trim();
  if (quizHtml) {
    addParsedPoint({ type: 'quiz', label: 'Quiz', title: 'Knowledge Check', html: quizHtml });
  }

  return {
    points,
    trailingHtml: ''
  };
}

function isBadLessonPageTitle(title) {
  const text = compactWhitespace(title || '');
  if (!text) return true;
  if (/\\(sin|left|right|frac|pi|cdot|texttt|begin|end|quad|sqrt|exp|big|sum|int)\b/i.test(text)) return true;
  if (/[\{\}\\]/.test(text)) return true;
  if (/\$\$|\$|\\\(|\\\)/.test(text)) return true;
  if (/=\s*\\?[a-z]+/i.test(text) && text.length > 24) return true;
  return false;
}

function getLessonPageDisplayTitle(block, index) {
  if (!block || block.type !== 'knowledge') return '';
  const title = compactWhitespace(block.title || '');
  if (!title || /^Knowledge Point$/i.test(title) || /^Core Lesson$/i.test(title) || isBadLessonPageTitle(title)) {
    const inferred = inferLessonChunkTitle(block.html || '', '', index);
    if (inferred && !/^Core Lesson\s+\d+$/i.test(inferred)) return inferred;
    return `${index + 1}. Knowledge Point`;
  }
  return title;
}

function stripDuplicatePageHeading(innerHtml, displayTitle) {
  const html = String(innerHtml || '');
  const normalizedTitle = compactWhitespace(String(displayTitle || '').replace(/<[^>]+>/g, ''));
  if (!html || !normalizedTitle) return html;
  const temp = document.createElement('div');
  temp.innerHTML = html;
  const children = Array.from(temp.children || []);
  const firstHeading = children.find((child) => {
    if (child.classList && (child.classList.contains('kc-visual-plan') || child.classList.contains('kc-visual-meta'))) return false;
    return /^H[1-3]$/.test(child.tagName || '');
  });
  if (firstHeading && compactWhitespace(firstHeading.textContent || '') === normalizedTitle) {
    firstHeading.remove();
  }
  return temp.innerHTML;
}

function buildLessonPageFrameHtml(innerHtml, block, index, total) {
  const rawType = compactWhitespace(block?.type || 'lesson').toLowerCase().replace(/[^a-z0-9_-]+/g, '-');
  const extraHtml = String(block?.extraHtml || '').trim();
  const displayTitle = getLessonPageDisplayTitle(block, index);
  const pageBodyHtml = displayTitle ? stripDuplicatePageHeading(innerHtml, displayTitle) : String(innerHtml || '');
  const titleHtml = displayTitle
    ? `<header class="lesson-page-heading"><h2>${inlineFormat(displayTitle)}</h2></header>`
    : '';
  return `
    <article class="lesson-page-frame lesson-page-frame-${rawType}" data-lesson-page="${index + 1}">
      ${titleHtml}
      <div class="lesson-page-content">
        ${pageBodyHtml || '<p class="ghost">No explanation available.</p>'}
      </div>
      ${extraHtml ? `<div class="lesson-page-extra">${extraHtml}</div>` : ''}
    </article>
  `;
}

function renderCurrentKnowledgePoint() {
  const learnExplainContent = document.getElementById('learnExplainContent');
  const learnExplainScroll = document.getElementById('learnExplainScroll');
  if (!learnExplainContent) return;
  if (!learnKnowledgePoints.length) {
    learnExplainContent.innerHTML = buildLessonPageFrameHtml(currentFullLessonHtml || '<p class="ghost">No explanation available.</p>', { type: 'full' }, 0, 1);
    delete learnExplainContent.dataset.lectureDecorated;
    if (learnExplainScroll) learnExplainScroll.scrollTop = 0;
    bindExpandableLessonImages(learnExplainContent);
    decorateLectureContent(learnExplainContent);
    enhanceVisualMetadataUI(learnExplainContent);
    const learnKpTitle = document.getElementById('learnKpTitle');
    if (learnKpTitle) learnKpTitle.textContent = 'Full Lesson';
    const learnKpPrevBtn = document.getElementById('learnKpPrevBtn');
    const learnKpNextBtn = document.getElementById('learnKpNextBtn');
    if (learnKpPrevBtn) learnKpPrevBtn.disabled = true;
    if (learnKpNextBtn) learnKpNextBtn.disabled = true;
    window.__ftutorRefreshPager?.();
    return;
  }
  currentKnowledgePointIndex = Math.max(0, Math.min(currentKnowledgePointIndex, learnKnowledgePoints.length - 1));
  const block = learnKnowledgePoints[currentKnowledgePointIndex];
  const pageHtml = applyLessonRenderRulesToKnowledgePoint(block) || '<p class="ghost">No explanation available.</p>';
  learnExplainContent.innerHTML = buildLessonPageFrameHtml(pageHtml, block, currentKnowledgePointIndex, learnKnowledgePoints.length);
  delete learnExplainContent.dataset.lectureDecorated;
  bindExpandableLessonImages(learnExplainContent);
  decorateLectureContent(learnExplainContent);
  enhanceVisualMetadataUI(learnExplainContent);
  hydrateInteractiveDemos(learnExplainContent);
  bindOverviewSubsectionCards();
  
  const learnKpTitle = document.getElementById('learnKpTitle');
  if (learnKpTitle) learnKpTitle.textContent = block.title || '';
  const labelEl = document.querySelector('.learn-kp-label');
  if (labelEl) labelEl.textContent = '';
  
  const learnKpPrevBtn = document.getElementById('learnKpPrevBtn');
  const learnKpNextBtn = document.getElementById('learnKpNextBtn');
  const lecturePrevOverlayBtn = document.getElementById('lecturePrevOverlayBtn');
  const lectureNextOverlayBtn = document.getElementById('lectureNextOverlayBtn');
  if (learnKpPrevBtn) learnKpPrevBtn.disabled = currentKnowledgePointIndex === 0;
  if (learnKpNextBtn) learnKpNextBtn.disabled = currentKnowledgePointIndex === learnKnowledgePoints.length - 1;
  if (lecturePrevOverlayBtn) lecturePrevOverlayBtn.disabled = currentKnowledgePointIndex === 0;
  if (lectureNextOverlayBtn) lectureNextOverlayBtn.disabled = currentKnowledgePointIndex === learnKnowledgePoints.length - 1;

  window.__ftutorRefreshPager?.();

  if (learnExplainScroll) learnExplainScroll.scrollTop = 0;
  syncFocusModeContent();

  const startTestBtn = learnExplainContent.querySelector('#startTestBtn');
  if (startTestBtn) {
    const banner = startTestBtn.closest('.lesson-test-banner');
    if (banner) {
      banner.style.cssText = "margin-top: 40px; padding: 24px; background: #ffffff; border-radius: 20px; border: 3px solid #cbd5e1; text-align: center; margin-bottom: 40px; box-shadow: 0 8px 0 #f1f5f9, 0 8px 0 1px #cbd5e1; font-family:'Nunito', sans-serif;";
      const h3 = banner.querySelector('h3');
      if (h3) {
        h3.style.fontFamily = "'Quicksand', sans-serif"; h3.style.fontWeight = "800"; h3.style.color = "#1e293b"; h3.style.fontSize = "20px";
        h3.innerHTML = '<span>🎯</span> ' + h3.textContent.trim();
      }
      const p = banner.querySelector('p');
      if (p) { p.style.fontWeight = "600"; p.style.color = "#64748b"; }
    }
    startTestBtn.style.cssText = "padding: 12px 28px; background: #38bdf8; color: #fff; border: 2px solid #0284c7; border-radius: 14px; font-family: 'Quicksand', sans-serif; font-size: 15px; font-weight: 800; cursor: pointer; box-shadow: 0 4px 0px #0284c7; transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);";
    startTestBtn.onmouseover = function() { if(!this.disabled){this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 0px #0284c7';}};
    startTestBtn.onmouseout = function() { if(!this.disabled){this.style.transform='none';this.style.boxShadow='0 4px 0px #0284c7';}};
  }
  setTimeout(() => {
    if (window.MathJax && window.MathJax.typesetPromise) { window.MathJax.typesetPromise([learnExplainContent]).catch(() => {}); }
    buildTocFromContent(learnExplainContent);
    bindStartTestBtnIfPresent();
    if (learnExplainScroll) learnExplainScroll.scrollTop = 0;
    requestAnimationFrame(() => {
      if (learnExplainScroll) learnExplainScroll.scrollTop = 0;
    });
  }, 60);
}

function bindStartTestBtnIfPresent() {
  const buttons = Array.from(document.querySelectorAll('#startTestBtn'));
  if (!buttons.length) return;

  buttons.forEach((startTestBtn) => {
    if (!startTestBtn || startTestBtn._bound) return;
    startTestBtn._bound = true;

    startTestBtn.addEventListener('click', () => {
      let opened = false;
      const root = (learnFocusContent && learnFocusContent.contains(startTestBtn))
        ? learnFocusContent
        : ((learnExplainContent && learnExplainContent.contains(startTestBtn)) ? learnExplainContent : document);
      const testBannerCard = startTestBtn.closest('#testBannerCard') || root.querySelector('#testBannerCard');
      const quizPlanNode = root.querySelector('.kc-quiz-plan') || document.querySelector('.kc-quiz-plan');
      const pregenCards = root.querySelectorAll('.kc-container');

      if (quizPlanNode && window.openQuizPlanModal) {
        try {
          const rawB64 = quizPlanNode.dataset.quizB64 || quizPlanNode.getAttribute('data-quiz-b64');
          let plan = null;
          if (rawB64) {
            plan = parseBase64JsonAttr(rawB64);
          } else {
            let raw = quizPlanNode.dataset.quiz || quizPlanNode.getAttribute('data-quiz') || '';
            const decode = (s) => { let v=s; for(let i=0;i<4;i++){const p=v;v=v.replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');if(v===p)break;} return v; };
            plan = JSON.parse(decode(raw));
          }
          if (plan && Array.isArray(plan.knowledge_points) && plan.knowledge_points.length) {
            window.openQuizPlanModal(plan, learnSectionId, learnSectionTitle);
            opened = true;
          }
        } catch (err) { console.error('[QuizPlan] parse failed:', err); }
      }

      if (!opened && pregenCards.length > 0) {
        const card = pregenCards[0];
        if (window.openKCModal) {
          window.openKCModal(
            card.dataset.question || card.getAttribute('data-question') || '(No question found)',
            card.dataset.answer || card.getAttribute('data-answer') || '',
            card.dataset.hint || card.getAttribute('data-hint') || '',
            learnSectionId, learnSectionTitle
          );
          opened = true;
        }
      }

      if (!opened) {
        startTestBtn.innerText = 'Generating challenge...';
        startTestBtn.disabled = true;
        sendLearnFollowup('I have finished reading this section. Give me an exam-oriented quiz plan for this section. Cover the important knowledge points, use mostly multiple-choice questions, and only use short-answer when necessary.')
          .then(() => { if (testBannerCard) testBannerCard.style.display = 'none'; })
          .catch(() => { startTestBtn.innerText = 'Error - try again'; startTestBtn.disabled = false; });
      }
    });
  });
}

function setLearnLessonContent(fullHtml, options = {}) {
  currentFullLessonHtml = String(fullHtml || '');
  try {
    const parsed = parseLessonKnowledgePoints(currentFullLessonHtml);
    learnKnowledgePoints = parsed.points;
    currentLessonTrailingHtml = parsed.trailingHtml;
    currentKnowledgePointIndex = Math.max(0, Math.min(options.index || 0, Math.max(learnKnowledgePoints.length - 1, 0)));
    renderCurrentKnowledgePoint();
  } catch (err) {
    console.error('[LessonRender] setLearnLessonContent failed:', err);
    learnKnowledgePoints = [];
    currentLessonTrailingHtml = '';
    currentKnowledgePointIndex = 0;
    if (learnExplainContent) {
      learnExplainContent.innerHTML = `<div class="error-box"><strong>Lesson render failed</strong><p>${escapeHtml(err?.message || 'Unknown render error')}</p></div>`;
    }
  }
}

let learnPageTurnTimer = null;
let learnPageTurnMidTimer = null;
let isLearnPageTurning = false;

function clearLearnPageTurnClasses() {
  const targets = [learnBody, learnExplainScroll, learnExplainContent].filter(Boolean);
  targets.forEach((el) => {
    el.classList.remove(
      'learn-page-turn-active',
      'learn-page-turn-next',
      'learn-page-turn-prev',
      'learn-page-turn-reveal'
    );
  });
  isLearnPageTurning = false;
}

function runLearnPageTurn(direction = 1, commit = () => {}) {
  const dir = Number(direction) < 0 ? -1 : 1;
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!learnExplainContent || prefersReducedMotion) {
    commit();
    return true;
  }
  if (isLearnPageTurning) return false;

  if (learnPageTurnTimer) window.clearTimeout(learnPageTurnTimer);
  if (learnPageTurnMidTimer) window.clearTimeout(learnPageTurnMidTimer);
  clearLearnPageTurnClasses();
  isLearnPageTurning = true;

  const turnClass = dir < 0 ? 'learn-page-turn-prev' : 'learn-page-turn-next';
  [learnBody, learnExplainScroll, learnExplainContent].filter(Boolean).forEach((el) => {
    el.classList.add('learn-page-turn-active', turnClass);
  });

  learnPageTurnMidTimer = window.setTimeout(() => {
    try {
      commit();
    } finally {
      window.requestAnimationFrame(() => {
        if (learnExplainContent) learnExplainContent.classList.add('learn-page-turn-reveal');
      });
    }
  }, 255);

  learnPageTurnTimer = window.setTimeout(() => {
    clearLearnPageTurnClasses();
    learnPageTurnTimer = null;
    learnPageTurnMidTimer = null;
  }, 720);

  return true;
}

function getOverviewPreludeFallbackTitle(markdownHeading = '', index = 0) {
  const text = compactWhitespace(String(markdownHeading || '')
    .replace(/^#{1,6}\s+/, '')
    .replace(/^\d+[.)]\s+/, '')
    .replace(/^[A-Z]\d+(?:[-.]\d+)*\s+/, '')
    .replace(/[*_`#]/g, ''));
  return text || `Chapter note ${index + 1}`;
}

function buildOverviewPreludePointsFromMarkdown(markdown = '', chooserHtml = '') {
  const source = String(markdown || '').trim();
  if (!source) return [];

  const lines = source.split(/\r?\n/);
  const introLines = [];
  const chunks = [];
  let current = null;
  const isPrimaryHeading = (line) => /^##\s+(?:\d+[.)]\s+|[A-Z]\d+(?:[-.]\d+)*\s+)/i.test(String(line || '').trim());

  lines.forEach((line) => {
    if (isPrimaryHeading(line)) {
      if (current && current.lines.length) chunks.push(current);
      current = {
        title: getOverviewPreludeFallbackTitle(line, chunks.length),
        lines: [line]
      };
      return;
    }
    if (current) current.lines.push(line);
    else introLines.push(line);
  });
  if (current && current.lines.length) chunks.push(current);

  if (!chunks.length) return [];

  const points = [];
  const introHtmlRaw = markdownToHtml(introLines.join('\n'));
  const introMount = document.createElement('div');
  introMount.innerHTML = introHtmlRaw;
  const overviewHtml = buildLessonOverviewHtml(Array.from(introMount.childNodes)) || introHtmlRaw;
  const introText = compactWhitespace(introMount.textContent || '');

  if (introText || introMount.querySelector('img, .kc-visual-plan, .kc-visual-meta, .math-block, table')) {
    points.push({
      type: 'overview',
      label: 'Overview',
      title: 'Section Overview',
      html: overviewHtml,
      extraHtml: chooserHtml
    });
  }

  chunks.forEach((chunk, idx) => {
    const html = markdownToHtml(chunk.lines.join('\n'));
    const temp = document.createElement('div');
    temp.innerHTML = html;
    if (!compactWhitespace(temp.textContent || '') && !temp.querySelector('img, .math-block, table, .kc-visual-meta, .kc-container')) return;
    points.push({
      type: 'knowledge',
      label: 'Knowledge Point',
      title: chunk.title || `Chapter note ${idx + 1}`,
      headingTag: 'h2',
      html
    });
  });

  if (points.length > 1) {
    points.push({
      type: 'quiz',
      label: 'Quiz',
      title: 'Knowledge Check',
      html: buildLessonTestBannerHtml()
    });
  }

  return points.length > 1 ? points : [];
}

function ensureOverviewPreludePagination(markdown = '', chooserHtml = '') {
  if (_learnLayoutMode !== 'overview_lesson' || learnKnowledgePoints.length > 1) return false;
  const fallbackPoints = buildOverviewPreludePointsFromMarkdown(markdown, chooserHtml);
  if (fallbackPoints.length <= 1) return false;
  learnKnowledgePoints = fallbackPoints;
  currentLessonTrailingHtml = '';
  currentKnowledgePointIndex = 0;
  return true;
}

// Returns false when the move was a no-op. The "no-op" reason is overloaded:
// it can mean (a) no knowledge points loaded, (b) a page-turn animation is in
// flight, or (c) we're already at the boundary. Callers MUST NOT treat false
// as "at boundary" — gate boundary-triggered actions (e.g. cross-subsection
// advance) on an explicit index check first.
function moveLearnKnowledgePoint(delta) {
  if (!learnKnowledgePoints.length) return false;
  if (isLearnPageTurning) return false;
  const nextIndex = Math.max(0, Math.min(currentKnowledgePointIndex + delta, learnKnowledgePoints.length - 1));
  if (nextIndex === currentKnowledgePointIndex) return false;
  return runLearnPageTurn(delta, () => {
    currentKnowledgePointIndex = nextIndex;
    renderCurrentKnowledgePoint();
  });
}

function animateLectureNavButton(delta) {
  const button = delta < 0 ? lecturePrevOverlayBtn : lectureNextOverlayBtn;
  if (!button) return;
  button.classList.remove('is-flipping');
  void button.offsetWidth;
  button.classList.add('is-flipping');
  window.setTimeout(() => button.classList.remove('is-flipping'), 560);
}

function getLectureOverlayDeltaFromEvent(event) {
  const target = event.target && event.target.closest
    ? event.target.closest('#lecturePrevOverlayBtn, #lectureNextOverlayBtn')
    : null;
  if (target) return target.id === 'lecturePrevOverlayBtn' ? -1 : 1;

  const pointX = Number(event.clientX);
  const pointY = Number(event.clientY);
  if (!Number.isFinite(pointX) || !Number.isFinite(pointY)) return 0;

  const candidates = [
    { button: lecturePrevOverlayBtn, delta: -1 },
    { button: lectureNextOverlayBtn, delta: 1 }
  ];
  for (const { button, delta } of candidates) {
    if (!button || button.classList.contains('hidden') || button.disabled) continue;
    const rect = button.getBoundingClientRect();
    const pad = 8;
    if (
      pointX >= rect.left - pad
      && pointX <= rect.right + pad
      && pointY >= rect.top - pad
      && pointY <= rect.bottom + pad
    ) {
      return delta;
    }
  }
  return 0;
}

let lastLectureOverlayNavAt = 0;

function handleLectureOverlayNavEvent(event) {
  const delta = getLectureOverlayDeltaFromEvent(event);
  if (!delta) return;
  const now = Date.now();
  if (event.type === 'click' && now - lastLectureOverlayNavAt < 350) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return;
  }
  const moved = moveLearnKnowledgePoint(delta);
  if (!moved) return;
  animateLectureNavButton(delta);
  lastLectureOverlayNavAt = now;
  event.preventDefault();
  event.stopImmediatePropagation();
}

function buildLessonTestBannerHtml() {
  return `
    <div class="lesson-test-banner" id="testBannerCard" style="margin-top: 40px; padding: 24px; background: linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%); border-radius: 12px; border: 1px solid #E2E8F0; text-align: center; margin-bottom: 40px;">
      <h3 style="margin: 0 0 8px 0; color: #0F172A; font-size: 18px; display: flex; align-items: center; justify-content: center; gap: 8px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4"/></svg>
        Ready to test your knowledge?
      </h3>
      <p style="margin: 0 0 16px 0; color: #475569; font-size: 14px;">Take the adaptive quick check to expose any blind spots.</p>
      <button id="startTestBtn" style="background: #2563EB; color: white; border: none; padding: 10px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer; transition: background 0.2s; box-shadow: 0 2px 4px rgba(37,99,235,0.2);">Start Quick Check</button>
    </div>
  `;
}

function syncFocusModeContent() {
  if (!learnFocusModal || learnFocusModal.classList.contains('hidden') || !learnFocusContent) return;
  const activeBlock = learnKnowledgePoints[currentKnowledgePointIndex];
  learnFocusContent.innerHTML = activeBlock?.html || learnExplainContent?.innerHTML || '';
  if (learnFocusTitle) learnFocusTitle.textContent = activeBlock?.title || learnKpTitle?.textContent || 'Knowledge Point';
  bindExpandableLessonImages(learnFocusContent);
  decorateLectureContent(learnFocusContent);
  enhanceVisualMetadataUI(learnFocusContent);
  hydrateInteractiveDemos(learnFocusContent);
  if (learnFocusPrevBtn) learnFocusPrevBtn.disabled = currentKnowledgePointIndex === 0;
  if (learnFocusNextBtn) learnFocusNextBtn.disabled = currentKnowledgePointIndex >= learnKnowledgePoints.length - 1;
  if (learnFocusPageIndicator) learnFocusPageIndicator.textContent = `${currentKnowledgePointIndex + 1} / ${learnKnowledgePoints.length || 1}`;
  setTimeout(() => {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise([learnFocusContent]).catch(() => {});
    }
  }, 40);
}

function openLearnFocusMode() {
  if (!learnFocusModal || !learnFocusContent) return;
  learnFocusModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  syncFocusModeContent();
  // Also bind the test button in focus mode
  setTimeout(() => {
    bindStartTestBtnIfPresent();
  }, 50);
}

function closeLearnFocusMode() {
  if (!learnFocusModal) return;
  learnFocusModal.classList.add('hidden');
  document.body.style.overflow = '';
}

function setChapterOverviewLayoutActive(active) {
  const isOverviewLesson = _learnLayoutMode === 'overview_lesson';
  if (learnBody) {
    learnBody.classList.toggle('chapter-overview-active', Boolean(active) && !isOverviewLesson);
    learnBody.classList.toggle('chapter-overview-split-active', Boolean(active) && isOverviewLesson);
  }
  if (!active) return;

  learnPanelFocus = 'normal';
  isLearnChatCollapsed = !isOverviewLesson;
  isLearnExplainCollapsed = false;
  isLearnChatPopoverOpen = false;

  const shell = learnBody || document.getElementById('learnBody');
  if (shell) {
    shell.dataset.panelFocus = learnPanelFocus || 'normal';
    shell.classList.toggle('chat-collapsed', !isOverviewLesson);
    shell.classList.remove('explain-collapsed');
    if (!isOverviewLesson) shell.classList.remove('panel-normal', 'panel-lecture-wide', 'panel-lecture-full', 'panel-qa-wide', 'panel-qa-full');
    const learnBodyInner = shell.querySelector?.('.learn-body-inner');
    if (learnBodyInner) {
      learnBodyInner.style.removeProperty('grid-template-columns');
      learnBodyInner.dataset.customSplit = '';
    }
  }
  if (learnExplainColEl) {
    learnExplainColEl.classList.remove('hidden');
    learnExplainColEl.style.display = '';
    if (!isOverviewLesson) {
      learnExplainColEl.style.flex = '';
      learnExplainColEl.style.width = '';
      learnExplainColEl.style.maxWidth = '';
      learnExplainColEl.style.borderRight = '1px solid var(--border)';
    } else {
      learnExplainColEl.style.flex = '';
      learnExplainColEl.style.width = '';
      learnExplainColEl.style.maxWidth = '';
      learnExplainColEl.style.borderRight = '1px solid var(--border)';
    }
  }
  if (learnBookColEl) learnBookColEl.style.display = 'none';
  if (learnChatColPanel) {
    learnChatColPanel.classList.toggle('hidden', !isOverviewLesson);
    learnChatColPanel.style.display = isOverviewLesson ? '' : 'none';
  }
  if (learnResizerPanel) {
    learnResizerPanel.classList.toggle('hidden', !isOverviewLesson);
    learnResizerPanel.style.display = isOverviewLesson ? '' : 'none';
  }
  if (learnChatRestoreBtn) learnChatRestoreBtn.classList.add('hidden');
  if (learnChatFab) learnChatFab.classList.add('hidden');
  if (learnChatPopover) learnChatPopover.classList.add('hidden');
}

function applyLearnPanelFocusState() {
  const shell = learnBody || document.getElementById('learnBody');
  if (!shell) return;
  const isOverviewLayout = false;
  const states = ['normal', 'lecture-wide', 'lecture-full', 'qa-wide', 'qa-full'];
  const normalized = states.includes(learnPanelFocus) ? learnPanelFocus : 'normal';
  learnPanelFocus = normalized;
  if (normalized === 'normal') {
    delete shell.dataset.panelFocus;
  } else {
    shell.dataset.panelFocus = normalized;
  }
  states.forEach(state => shell.classList.toggle(`panel-${state}`, normalized === state));
  shell.classList.remove('chat-collapsed', 'explain-collapsed');

  if (normalized !== 'normal') isLearnChatCollapsed = false;
  isLearnExplainCollapsed = false;

  const learnBodyInner = shell.querySelector?.('.learn-body-inner');
  if (learnBodyInner) {
    learnBodyInner.style.removeProperty('grid-template-columns');
    learnBodyInner.dataset.customSplit = '';
  }

  if (isOverviewLayout) return;

  if (learnExplainColEl) {
    learnExplainColEl.classList.remove('hidden');
    learnExplainColEl.style.display = '';
  }
  if (learnChatColPanel) {
    learnChatColPanel.classList.remove('hidden');
    learnChatColPanel.style.display = '';
  }
  if (learnResizerPanel) {
    learnResizerPanel.classList.remove('hidden');
    learnResizerPanel.style.display = '';
  }
  if (learnBookColEl) learnBookColEl.style.display = 'none';

  const setButtonCopy = (btn, label, title) => {
    if (!btn) return;
    const labelEl = btn.querySelector?.('.learn-edge-toggle-label');
    if (labelEl) labelEl.textContent = label;
    btn.title = title;
    btn.setAttribute('aria-label', title);
  };

  if (normalized === 'lecture-wide') {
  } else if (normalized === 'lecture-full') {
  } else if (normalized === 'qa-wide') {
  } else if (normalized === 'qa-full') {
  } else {
  }

  if (learnExplainRestoreBtn) learnExplainRestoreBtn.classList.add('hidden');
  if (learnChatRestoreBtn) learnChatRestoreBtn.classList.add('hidden');
  if (normalized === 'normal') {
    applyLearnChatCollapsedState();
  } else {
    if (learnChatFab) learnChatFab.classList.add('hidden');
    if (learnChatPopover) learnChatPopover.classList.add('hidden');
    isLearnChatPopoverOpen = false;
  }
  requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
}

function advanceLearnPanelFocus(side) {
  if (side === 'lecture') {
    learnPanelFocus = learnPanelFocus === 'lecture-wide'
      ? 'lecture-full'
      : (learnPanelFocus === 'lecture-full' ? 'normal' : 'lecture-wide');
  } else if (side === 'qa') {
    learnPanelFocus = learnPanelFocus === 'qa-wide'
      ? 'qa-full'
      : (learnPanelFocus === 'qa-full' ? 'normal' : 'qa-wide');
  } else {
    learnPanelFocus = 'normal';
  }
  applyLearnPanelFocusState();
}

function applyLearnChatCollapsedState() {
  const shell = learnBody || document.getElementById('learnBody');
  const isOverviewLayout = _learnLayoutMode === 'overview';
  if (isOverviewLayout || learnPanelFocus !== 'normal') {
    if (isOverviewLayout) {
      isLearnChatCollapsed = true;
      isLearnChatPopoverOpen = false;
      if (shell) {
        shell.classList.add('chat-collapsed');
        shell.classList.remove('explain-collapsed');
      }
      if (learnChatColPanel) {
        learnChatColPanel.classList.add('hidden');
        learnChatColPanel.style.display = 'none';
      }
      if (learnResizerPanel) {
        learnResizerPanel.classList.add('hidden');
        learnResizerPanel.style.display = 'none';
      }
      if (learnChatFab) learnChatFab.classList.add('hidden');
      if (learnChatPopover) learnChatPopover.classList.add('hidden');
      if (learnChatRestoreBtn) learnChatRestoreBtn.classList.add('hidden');
      return;
    }
    applyLearnPanelFocusState();
    return;
  }
  if (shell) shell.classList.toggle('chat-collapsed', isLearnChatCollapsed);
  const learnBodyInner = shell?.querySelector?.('.learn-body-inner');
  if (learnBodyInner) {
    if (isLearnChatCollapsed) {
      learnBodyInner.style.removeProperty('grid-template-columns');
      learnBodyInner.dataset.customSplit = '';
    } else {
      try {
        const savedRatio = parseFloat(localStorage.getItem('aquarius-learn-split') || '');
        if (Number.isFinite(savedRatio) && typeof window.applyLearnSplit === 'function') {
          window.applyLearnSplit(savedRatio);
        }
      } catch (_) {}
    }
  }
  if (learnChatColPanel) {
    learnChatColPanel.classList.toggle('hidden', isLearnChatCollapsed);
    learnChatColPanel.style.display = isLearnChatCollapsed ? 'none' : '';
  }
  if (learnResizerPanel) {
    learnResizerPanel.classList.toggle('hidden', isLearnChatCollapsed);
    learnResizerPanel.style.display = isLearnChatCollapsed ? 'none' : '';
  }

  const buttonTitle = isLearnChatCollapsed ? 'Show Q&A panel' : 'Hide Q&A panel';

  const syncBtn = (btn) => {
    if (!btn) return;
    btn.title = buttonTitle;
    btn.setAttribute('aria-label', buttonTitle);
    btn.classList.toggle('is-collapsed', isLearnChatCollapsed);
  };

  syncBtn(lectureFocusOverlayBtn);

  if (isLearnChatCollapsed) resetLearnChatFabPosition();
  if (learnChatFab) learnChatFab.classList.add('hidden');
  if (learnChatRestoreBtn) learnChatRestoreBtn.classList.add('hidden');
  if (!isLearnChatCollapsed && learnChatPopover) learnChatPopover.classList.add('hidden');
  if (!isLearnChatCollapsed) isLearnChatPopoverOpen = false;
  if (learnChatFab) {
    learnChatFab.title = isLearnChatCollapsed ? 'Open Q&A panel' : 'Minimize Q&A to bubble';
    learnChatFab.setAttribute('aria-label', learnChatFab.title);
  }

  if (learnChatPopoverScroll && learnChatContent && isLearnChatCollapsed) {
    learnChatPopoverScroll.innerHTML = learnChatContent.innerHTML || '';
    learnChatPopoverScroll.scrollTop = learnChatPopoverScroll.scrollHeight;
  }
}

function toggleLearnChatPanel(forceOpen = null) {
  const nextCollapsed = typeof forceOpen === 'boolean'
    ? !forceOpen
    : !isLearnChatCollapsed;
  isLearnChatCollapsed = nextCollapsed;
  applyLearnChatCollapsedState();
}

function openLearnQaSidebar() {
  learnPanelFocus = 'normal';
  isLearnChatCollapsed = false;
  isLearnChatPopoverOpen = false;
  applyLearnChatCollapsedState();
}

function minimizeLearnQaToBubble() {
  learnPanelFocus = 'normal';
  isLearnChatCollapsed = true;
  isLearnChatPopoverOpen = false;
  applyLearnChatCollapsedState();
}

function shrinkLearnQaToPopover() {
  learnPanelFocus = 'normal';
  isLearnChatCollapsed = true;
  applyLearnChatCollapsedState();
  setLearnChatPopoverOpen(true);
}

function applyLearnExplainCollapsedState() {
  const isOverviewLayout = false;
  if (isOverviewLayout || learnPanelFocus !== 'normal') {
    applyLearnPanelFocusState();
    return;
  }
  const shell = learnBody || document.getElementById('learnBody');
  if (shell) shell.classList.toggle('explain-collapsed', isLearnExplainCollapsed);
  if (learnExplainColEl) {
    learnExplainColEl.classList.remove('hidden');
    learnExplainColEl.style.display = '';
  }
  if (learnBookColEl) learnBookColEl.style.display = 'none';
  if (learnResizerPanel) {
    learnResizerPanel.classList.remove('hidden');
    learnResizerPanel.style.display = '';
  }

  const buttonTitle = isLearnExplainCollapsed ? 'Show lecture panel' : 'Hide lecture panel';
  if (learnExplainRestoreBtn) learnExplainRestoreBtn.classList.toggle('hidden', !isLearnExplainCollapsed);

  if (learnChatColPanel && !isLearnChatCollapsed) {
    if (isLearnExplainCollapsed) {
      learnChatColPanel.style.flex = '1 1 auto';
      learnChatColPanel.style.width = '100%';
      learnChatColPanel.style.minWidth = '0';
      learnChatColPanel.style.maxWidth = '100%';
    } else {
      learnChatColPanel.style.flex = '1 1 auto';
      learnChatColPanel.style.width = '100%';
      learnChatColPanel.style.minWidth = '0';
      learnChatColPanel.style.maxWidth = '100%';
    }
  }
}

function toggleLearnExplainPanel(forceOpen = null) {
  const nextCollapsed = typeof forceOpen === 'boolean'
    ? !forceOpen
    : !isLearnExplainCollapsed;
  isLearnExplainCollapsed = nextCollapsed;
  applyLearnExplainCollapsedState();
}

function setLearnChatPopoverOpen(open) {
  isLearnChatPopoverOpen = !!open;
  if (learnChatPopover) learnChatPopover.classList.toggle('hidden', !isLearnChatPopoverOpen);
  if (learnChatFab) learnChatFab.classList.add('hidden');
  if (learnChatPopoverScroll && learnChatContent && isLearnChatPopoverOpen) {
    learnChatPopoverScroll.innerHTML = learnChatContent.innerHTML || '';
    learnChatPopoverScroll.scrollTop = learnChatPopoverScroll.scrollHeight;
  }
}

function resetLearnChatFabPosition() {
  if (!learnChatFab) return;
  learnChatFab.style.left = 'auto';
  learnChatFab.style.top = 'auto';
  learnChatFab.style.right = '28px';
  learnChatFab.style.bottom = '28px';
  learnChatFab.style.width = '';
  learnChatFab.style.height = '';
  delete learnChatFab.dataset.dragJustEnded;
}

function enableFloatingDrag(handle, target, defaults = { right: 28, bottom: 28 }, options = {}) {
  if (!handle || !target) return;
  const threshold = Number(options.threshold || 5);
  const isInteractiveDragTarget = (node) => Boolean(node?.closest?.(
    'button, a, input, textarea, select, option, label, [role="button"], [data-no-drag]'
  ));
  let dragging = false;
  let moved = false;
  let offsetX = 0;
  let offsetY = 0;
  let startX = 0;
  let startY = 0;
  let startRect = null;

  handle.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    if (isInteractiveDragTarget(e.target)) return;
    dragging = true;
    moved = false;
    startX = e.clientX;
    startY = e.clientY;
    const rect = target.getBoundingClientRect();
    startRect = rect;
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    if (!moved) {
      const dx = Math.abs(e.clientX - startX);
      const dy = Math.abs(e.clientY - startY);
      if (dx < threshold && dy < threshold) return;
      moved = true;
      if (startRect) {
        target.style.width = `${startRect.width}px`;
        target.style.height = `${startRect.height}px`;
        target.style.left = `${startRect.left}px`;
        target.style.top = `${startRect.top}px`;
        target.style.bottom = 'auto';
        target.style.right = 'auto';
      }
    }
    const maxLeft = window.innerWidth - target.offsetWidth - 12;
    const maxTop = window.innerHeight - target.offsetHeight - 12;
    const left = Math.max(12, Math.min(maxLeft, e.clientX - offsetX));
    const top = Math.max(12, Math.min(maxTop, e.clientY - offsetY));
    target.style.left = `${left}px`;
    target.style.top = `${top}px`;
    target.style.right = 'auto';
    target.style.bottom = 'auto';
  });

  document.addEventListener('mouseup', () => {
    if (dragging && moved) {
      target.dataset.dragJustEnded = '1';
      setTimeout(() => {
        if (target.dataset.dragJustEnded === '1') delete target.dataset.dragJustEnded;
      }, 0);
    }
    dragging = false;
    moved = false;
    startRect = null;
  });

  target.addEventListener('click', (e) => {
    if (target.dataset.dragJustEnded === '1') {
      e.preventDefault();
      e.stopImmediatePropagation();
      delete target.dataset.dragJustEnded;
    }
  }, true);

  if (defaults) {
    target.style.left = 'auto';
    target.style.top = 'auto';
    target.style.right = `${defaults.right}px`;
    if (Object.prototype.hasOwnProperty.call(defaults, 'bottom')) {
      target.style.bottom = `${defaults.bottom}px`;
    }
  }
}

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

let learnPages = [];
let learnPageIndex = 0;
let learnSectionId = '';
let learnSectionTitle = '';
let learnWebData = [];
let learnAbort = null;
let learnRequestSeq = 0;
let splashShowDelayTimer = null;
let learnParentOverviewContext = null;

function clearLearnRenderedContent(message = 'Preparing lesson...') {
  currentFullLessonHtml = '';
  currentLessonTrailingHtml = '';
  learnKnowledgePoints = [];
  currentKnowledgePointIndex = 0;
  if (learnExplainContent) {
    learnExplainContent.innerHTML = message
      ? `<div class="lesson-transition-blank"><p class="ghost">${escapeHtml(message)}</p></div>`
      : '';
    delete learnExplainContent.dataset.lectureDecorated;
  }
  if (learnExplainScroll) {
    learnExplainScroll.scrollTop = 0;
    learnExplainScroll.scrollLeft = 0;
  }
  if (learnKpTitle) learnKpTitle.textContent = '';
  if (learnKpPrevBtn) learnKpPrevBtn.disabled = true;
  if (learnKpNextBtn) learnKpNextBtn.disabled = true;
  if (lecturePrevOverlayBtn) lecturePrevOverlayBtn.disabled = true;
  if (lectureNextOverlayBtn) lectureNextOverlayBtn.disabled = true;
  if (learnFocusContent) learnFocusContent.innerHTML = '';
  if (learnFocusPageIndicator) learnFocusPageIndicator.textContent = '';
}

function isCurrentLearnRequest(requestSeq, sectionId, sectionTitle, allowedModes = null) {
  const modeOk = !allowedModes || allowedModes.includes(_learnLayoutMode);
  return requestSeq === learnRequestSeq
    && sectionId === learnSectionId
    && sectionTitle === learnSectionTitle
    && modeOk;
}

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
  if (splashShowDelayTimer) { clearTimeout(splashShowDelayTimer); splashShowDelayTimer = null; }
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
    const favBase = typeof API_BASE !== 'undefined' ? API_BASE : '';
    const favSrc = d
      ? `${favBase}/api/favicon?url=${encodeURIComponent(w.url || ('https://' + d))}&domain=${encodeURIComponent(d)}`
      : '';
    const type = w.sourceType || 'web';
    const bucketHeader = showBuckets && type !== lastType
      ? `<div class="wsic-group-header"><span class="wsic-group-icon">${sourceTypeIcon(type)}</span><span>${escapeHtml(sourceTypeLabel(type))}</span></div>`
      : '';
    lastType = type;
    return `${bucketHeader}<a class="web-source-inline-card${compact ? ' compact' : ''}" href="${escapeHtml(w.url)}" target="_blank" rel="noopener noreferrer">
      <div class="wsic-left">
        ${favSrc ? `<img class="wsic-fav" src="${favSrc}" alt="" width="16" height="16" style="width:16px;height:16px;border-radius:4px;flex-shrink:0;">` : `<span class="wsic-type-badge wsic-type-${escapeHtml(type)}">${sourceTypeIcon(type)}</span>`}
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
  let cardsHtml = webSources.map((w, idx) => {
    const d = w.domain || domainOf(w.url);
    const fav = d ? `https://www.google.com/s2/favicons?sz=32&domain=${encodeURIComponent(d)}` : '';
    const hiddenClass = idx >= 3 ? ' learn-web-card-hidden' : '';
    return `<a class="learn-web-card${hiddenClass}" href="${escapeHtml(w.url)}" target="_blank" rel="noopener noreferrer">
      <div class="lwc-head">
        ${fav ? `<img class="lwc-fav" src="${fav}" alt="">` : ''}
        <div class="lwc-title">${escapeHtml(w.title || d || w.url)}</div>
      </div>
      ${d ? `<div class="lwc-domain">${escapeHtml(d)}</div>` : ''}
    </a>`;
  }).join('');

  if (webSources.length > 3) {
    cardsHtml += `<button class="web-expand-btn" id="expandWebCardsBtn" data-expanded="false">Show ${webSources.length - 3} more sources ⌄</button>`;
  }
  learnWebCards.innerHTML = cardsHtml;

  const expandBtn = document.getElementById('expandWebCardsBtn');
  if (expandBtn) {
    expandBtn.addEventListener('click', () => {
      const isExpanded = expandBtn.getAttribute('data-expanded') === 'true';
      const allCards = document.querySelectorAll('#learnWebCards .learn-web-card');
      if (!isExpanded) {
        allCards.forEach((el, idx) => {
          if (idx >= 3) el.classList.remove('learn-web-card-hidden');
        });
        expandBtn.setAttribute('data-expanded', 'true');
        expandBtn.textContent = 'Show less ⌃';
        learnWebSection.classList.add('expanded');
      } else {
        allCards.forEach((el, idx) => {
          if (idx >= 3) el.classList.add('learn-web-card-hidden');
        });
        expandBtn.setAttribute('data-expanded', 'false');
        expandBtn.textContent = `Show ${webSources.length - 3} more sources ⌄`;
        learnWebSection.classList.remove('expanded');
      }
    });
  }
  learnWebSection.classList.remove('hidden');
}

// Open Learn Mode without touching the right TOC (used when clicking sub-items in TOC)
async function openLearnModeKeepToc(sectionId, sectionTitle, parentOverviewContext = null) {
  const parentContext = parentOverviewContext || learnParentOverviewContext || findParentOverviewContextForSubsection(sectionId, sectionTitle);
  return openLearnMode(sectionId, sectionTitle, null /* null = keep existing TOC */, { parentOverviewContext: parentContext });
}

function getSectionPreview(sectionId, sectionTitle) {
  const previewsSource = currentBook === 'new'
    ? (typeof SECTION_PREVIEWS_NEW !== 'undefined' ? SECTION_PREVIEWS_NEW : SECTION_PREVIEWS)
    : SECTION_PREVIEWS;
  const parsed = parseSectionTitleParts(sectionTitle || sectionId, sectionId || sectionTitle, '');
  const sectionCode = parsed.code || null;
  return previewsSource[sectionTitle] || previewsSource[sectionId]
    || (sectionCode ? previewsSource[sectionCode] : null)
    || SECTION_PREVIEWS[sectionTitle] || SECTION_PREVIEWS[sectionId]
    || (sectionCode ? SECTION_PREVIEWS[sectionCode] : null)
    || null;
}

function findSyllabusSubsections(sectionTitle = '') {
  const target = String(sectionTitle || '').trim();
  if (!target) return [];
  for (const chapter of syllabusData || []) {
    const sections = (chapter.sections || []).map(s => typeof s === 'string' ? { title: s, subsections: [] } : s);
    const match = sections.find(sec => sec && sec.title === target);
    if (match && Array.isArray(match.subsections)) return match.subsections;
  }
  return [];
}

function createOverviewContext(sectionId = '', sectionTitle = '', subsections = []) {
  return {
    sectionId,
    sectionTitle,
    subsections: Array.isArray(subsections) ? [...subsections] : []
  };
}

function findParentOverviewContextForSubsection(sectionId = '', sectionTitle = '') {
  const targetId = String(sectionId || '').trim();
  const targetTitle = String(sectionTitle || '').trim();
  if (!targetId && !targetTitle) return null;
  for (const chapter of syllabusData || []) {
    const sections = (chapter.sections || []).map(s => typeof s === 'string' ? { title: s, subsections: [] } : s);
    for (const sec of sections) {
      const subs = Array.isArray(sec.subsections) ? sec.subsections : [];
      const match = subs.some(sub => {
        const raw = String(sub || '').trim();
        const parsed = parseSectionTitleParts(raw);
        return raw === targetId
          || raw === targetTitle
          || (parsed.code && (parsed.code === targetId || parsed.code === targetTitle));
      });
      if (match) return createOverviewContext(sec.title, sec.title, subs);
    }
  }
  return null;
}

function getOverviewLessonEntries(sectionId = '', sectionTitle = '', subsections = [], includeParentLesson = false) {
  const entries = [];
  const subList = Array.isArray(subsections) ? subsections : [];
  if (includeParentLesson && subList.length) {
    entries.push({
      title: sectionTitle || sectionId,
      isParentLesson: true
    });
  }
  if (!subList.length) {
    entries.push({
      title: sectionTitle || sectionId,
      isParentLesson: false
    });
  }
  subList.forEach(subTitle => {
    entries.push({
      title: subTitle,
      isParentLesson: false
    });
  });
  return entries;
}

function getOverviewSummaryHtml(sectionId, sectionTitle, subsections = [], options = {}) {
  const preview = getSectionPreview(sectionId, sectionTitle) || {};
  const summary = preview.en || preview.zh || 'This chapter gives you the key ideas first, then breaks them into smaller pieces below.';
  const rawTitle = String(sectionTitle || '').trim();
  const parsedSection = parseSectionTitleParts(rawTitle, sectionId || 'Chapter', rawTitle);
  const sectionCodeLabel = parsedSection.code || sectionId || 'Chapter';
  const sectionName = parsedSection.title || rawTitle;
  const hasPreludePanel = Boolean(options.preludeHtml || options.preludeLoading);
  const shellClass = hasPreludePanel ? 'chapter-overview-shell chapter-overview-shell-with-prelude' : 'chapter-overview-shell';
  const preludeHtml = options.preludeHtml
    ? `<section class="chapter-overview-prelude">${options.preludeHtml}</section>`
    : '';
  const preludeStatusHtml = options.preludeLoading
    ? `<section class="chapter-overview-prelude chapter-overview-prelude-loading" id="chapterOverviewPreludeStatus">Preparing chapter notes...</section>`
    : '';
  const entries = getOverviewLessonEntries(sectionId, sectionTitle, subsections, options.includeParentLesson === true);
  const cardsHtml = entries.map((entry, idx) => {
    const entryTitle = typeof entry === 'string' ? entry : entry.title;
    const isParentLesson = Boolean(entry && typeof entry === 'object' && entry.isParentLesson);
    const parsedSub = parseOverviewSubsectionTitle(entryTitle, idx);
    const noteTone = ['lemon', 'sky', 'mint', 'rose'][idx % 4];
    return `
      <button class="chapter-overview-subcard chapter-overview-subrow chapter-overview-note chapter-overview-note-${noteTone}" type="button" data-sublesson-title="${escapeHtml(entryTitle)}"${isParentLesson ? ' data-parent-lesson="true"' : ''}>
        <span class="chapter-overview-note-pin" aria-hidden="true"></span>
        <span class="chapter-overview-subcard-marker">${escapeHtml(parsedSub.code)}</span>
        <span class="chapter-overview-subcard-copy">
          <span class="chapter-overview-subcard-title">${escapeHtml(parsedSub.title)}</span>
        </span>
        <span class="chapter-overview-open-cue" aria-hidden="true">Open</span>
      </button>
    `;
  }).join('');

  const heroHtml = hasPreludePanel ? '' : `
      <div class="chapter-overview-map">
        <div class="chapter-overview-book-spread" aria-label="${escapeHtml(rawTitle || sectionTitle || sectionId)} overview">
          <section class="chapter-overview-hero chapter-overview-book-page chapter-overview-book-page-left">
            <div class="chapter-overview-page-rule" aria-hidden="true"></div>
            <div class="chapter-overview-hero-main">
              <div class="chapter-overview-kicker">Section</div>
              <div class="chapter-overview-code">${escapeHtml(sectionCodeLabel)}</div>
              <h1 class="chapter-overview-title">${escapeHtml(sectionName || rawTitle)}</h1>
              <p class="chapter-overview-summary">${escapeHtml(summary)}</p>
            </div>
          </section>

          <section class="chapter-overview-list-block chapter-overview-list-block-side chapter-overview-book-page chapter-overview-book-page-right">
            <div class="chapter-overview-page-rule" aria-hidden="true"></div>
            <div class="chapter-overview-list-head">
              <div>
                <div class="chapter-overview-list-eyebrow">Study sequence</div>
                <h2 class="chapter-overview-list-title">Subsections</h2>
              </div>
            </div>
            <div class="chapter-overview-grid">
              ${cardsHtml}
            </div>
          </section>
        </div>
      </div>
  `;

  return `
    <section class="${shellClass}">
      ${heroHtml}

      <div id="chapterOverviewPreludeMount">${preludeHtml || preludeStatusHtml}</div>

      ${hasPreludePanel ? `<section class="chapter-overview-list-block chapter-overview-list-block-side">
        <div class="chapter-overview-list-head">
          <div>
            <div class="chapter-overview-list-eyebrow">Study sequence</div>
            <h2 class="chapter-overview-list-title">Subsections</h2>
          </div>
        </div>
        <div class="chapter-overview-grid">
          ${cardsHtml}
        </div>
      </section>` : ''}
    </section>
  `;
}

function buildOverviewSubsectionCardsHtml(subsections = []) {
  return subsections.map((entry, idx) => {
    const entryTitle = typeof entry === 'string' ? entry : entry.title;
    const isParentLesson = Boolean(entry && typeof entry === 'object' && entry.isParentLesson);
    const parsedSub = parseOverviewSubsectionTitle(entryTitle, idx);
    const noteTone = ['lemon', 'sky', 'mint', 'rose'][idx % 4];
    return `
      <button class="chapter-overview-subcard chapter-overview-subrow chapter-overview-note chapter-overview-note-${noteTone}" type="button" data-sublesson-title="${escapeHtml(entryTitle)}"${isParentLesson ? ' data-parent-lesson="true"' : ''}>
        <span class="chapter-overview-note-pin" aria-hidden="true"></span>
        <span class="chapter-overview-subcard-marker">${escapeHtml(parsedSub.code)}</span>
        <span class="chapter-overview-subcard-copy">
          <span class="chapter-overview-subcard-title">${escapeHtml(parsedSub.title)}</span>
        </span>
        <span class="chapter-overview-open-cue" aria-hidden="true">Open</span>
      </button>
    `;
  }).join('');
}

function parseOverviewSubsectionTitle(subTitle, idx = 0) {
  const parsed = parseSectionTitleParts(subTitle);
  if (!parsed.code) {
    const raw = compactWhitespace(subTitle);
    return {
      code: String(idx + 1).padStart(2, '0'),
      title: raw || `Subsection ${idx + 1}`
    };
  }
  return {
    code: parsed.code,
    title: parsed.title || parsed.code
  };
}

function buildOverviewSubsectionChooserHtml(subsections = []) {
  return `
    <section class="chapter-overview-list-block chapter-overview-list-block-inline">
      <div class="chapter-overview-list-head">
        <div>
          <div class="chapter-overview-list-eyebrow">Study sequence</div>
          <h2 class="chapter-overview-list-title">Subsections</h2>
        </div>
      </div>
      <div class="chapter-overview-grid">
        ${buildOverviewSubsectionCardsHtml(subsections)}
      </div>
    </section>
  `;
}

function renderChapterOverviewContent(sectionId, sectionTitle, subsections = [], options = {}) {
  if (!learnExplainContent) return;
  _learnLayoutMode = options && options.preludeHtml ? 'overview_lesson' : 'overview';
  setChapterOverviewLayoutActive(true);
  learnKnowledgePoints = [];
  currentLessonTrailingHtml = '';
  currentKnowledgePointIndex = 0;
  learnExplainContent.innerHTML = getOverviewSummaryHtml(sectionId, sectionTitle, subsections, options);
  const enhancementSteps = [
    () => bindOverviewSubsectionCards(),
    () => bindExpandableLessonImages(learnExplainContent),
    () => decorateLectureContent(learnExplainContent),
    () => enhanceVisualMetadataUI(learnExplainContent),
    () => hydrateInteractiveDemos(learnExplainContent),
    () => buildTocFromContent(learnExplainContent)
  ];
  enhancementSteps.forEach((step) => {
    try {
      step();
    } catch (err) {
      console.warn('[ChapterOverview] render enhancement skipped:', err);
    }
  });
  try {
    if (window.MathJax && window.MathJax.typesetPromise) {
      setTimeout(() => window.MathJax.typesetPromise([learnExplainContent]).catch(() => {}), 40);
    }
  } catch (err) {
    console.warn('[ChapterOverview] MathJax scheduling skipped:', err);
  }
}

async function loadChapterOverviewPrelude(sectionId, sectionTitle, subsections = []) {
  const requestSeq = learnRequestSeq;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  const canWriteOverview = () => isCurrentLearnRequest(requestSeq, sectionId, sectionTitle, ['overview', 'overview_lesson']);
  try {
    const res = await fetch(`${API_BASE}/api/section`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        sectionId,
        sectionTitle,
        mode: 'overview',
        language: 'en',
        bookSource: currentBook
      })
    });
    clearTimeout(timeout);
    if (!canWriteOverview()) return;
    if (!res.ok) throw new Error(`overview request failed: ${res.status}`);
    const data = await res.json();
    if (!canWriteOverview()) return;
    renderChapterOverviewContent(sectionId, sectionTitle, subsections, { includeParentLesson: Boolean(data && data.hasPrelude && data.lesson) });
  } catch (err) {
    clearTimeout(timeout);
    if (!canWriteOverview()) return;
    console.warn('[ChapterOverview] prelude load failed:', err);
    renderChapterOverviewContent(sectionId, sectionTitle, subsections, { includeParentLesson: false });
  }
}

async function openChapterParentLessonFromOverview(sectionId, sectionTitle, subsections = []) {
  if (learnAbort) learnAbort.abort();
  const requestSeq = ++learnRequestSeq;
  const controller = new AbortController();
  learnAbort = controller;
  const parentContext = createOverviewContext(sectionId, sectionTitle, subsections);
  learnSectionId = sectionId;
  learnSectionTitle = sectionTitle;
  learnParentOverviewContext = parentContext;
  learnPages = [];
  learnPageIndex = 0;
  learnWebData = [];
  currentBookPageIndex = 0;
  _learnLayoutMode = 'lesson';
  setChapterOverviewLayoutActive(false);
  _setLearnMode('lecture');
  learnTitle.textContent = sectionTitle;
  clearLearnRenderedContent('Preparing lesson...');
  setLearnLoading(true);
  if (learnExplainScroll) learnExplainScroll.scrollTop = 0;

  const tocItems = [{ title: sectionTitle, depth: 1, anchor: '' }];
  (Array.isArray(subsections) ? subsections : []).forEach(sub => tocItems.push({ title: sub, depth: 2, anchor: '' }));
  buildToc(tocItems);

  const canWriteParentLesson = () => isCurrentLearnRequest(requestSeq, sectionId, sectionTitle, ['lesson']);
  const renderParentLessonMarkdown = (markdown = '', data = {}) => {
    learnBody.classList.remove('hidden');
    learnPages = data.bookPages || learnPages;
    tutorState.learnSectionId = learnSectionId;
    tutorState.learnSectionTitle = learnSectionTitle;
    tutorState.learnLessonMarkdown = markdown || '';
    tutorState.learnBookPages = data.bookPages || [];
    tutorState.learnWebSources = data.webSources || [];
    renderLearnPages();
    setLearnLessonContent(`${markdownToHtml(markdown || 'No explanation available.')}${buildLessonTestBannerHtml()}`);
    if (learnChatContent) learnChatContent.innerHTML = '';
    updateLearnChatEmptyState();
    renderLearnWebSources(data.webSources || []);
    renderLearnWebSection(data.webSources || []);
  };
  try {
    const res = await fetch(`${API_BASE}/api/section`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        sectionId,
        sectionTitle,
        mode: 'overview',
        language: 'en',
        bookSource: currentBook
      })
    });
    if (!canWriteParentLesson()) return;
    if (!res.ok) throw new Error(`overview lesson request failed: ${res.status}`);
    const data = await res.json();
    if (!canWriteParentLesson()) return;
    if (data && data.hasPrelude && data.lesson) {
      renderParentLessonMarkdown(data.lesson, data);
      return;
    }
    controller.abort();
    return openLearnMode(sectionId, sectionTitle, null, { parentOverviewContext: parentContext });
  } catch (err) {
    if (err.name === 'AbortError') return;
    if (!canWriteParentLesson()) return;
    return openLearnMode(sectionId, sectionTitle, null, { parentOverviewContext: parentContext });
  } finally {
    if (canWriteParentLesson()) setLearnLoading(false);
  }
}

function bindOverviewSubsectionCards() {
  if (!learnExplainContent) return;
  learnExplainContent.querySelectorAll('.chapter-overview-subcard').forEach(btn => {
    if (btn._learnOverviewTurnBound) return;
    btn._learnOverviewTurnBound = true;
    btn.addEventListener('click', () => {
      const subTitle = btn.getAttribute('data-sublesson-title');
      if (!subTitle) return;
      if (isLearnPageTurning) return;
      btn.classList.add('is-launching');
      if (btn.getAttribute('data-parent-lesson') === 'true') {
        runLearnPageTurn(1, () => {
          openChapterParentLessonFromOverview(learnSectionId, learnSectionTitle, findSyllabusSubsections(learnSectionTitle));
        });
        return;
      }
      const parentContext = createOverviewContext(learnSectionId, learnSectionTitle, findSyllabusSubsections(learnSectionTitle));
      runLearnPageTurn(1, () => {
        openLearnModeKeepToc(subTitle, subTitle, parentContext);
      });
    });
  });
}

function updateLearnChatEmptyState() {
  if (!learnChatEmptyState || !learnChatContent) return;
  const hasChat = Boolean(learnChatContent.children.length || learnChatContent.textContent.trim());
  learnChatEmptyState.classList.toggle('hidden', hasChat);
  if (hasChat) {
    learnChatEmptyState.style.setProperty('display', 'none', 'important');
    learnChatEmptyState.style.setProperty('visibility', 'hidden', 'important');
    learnChatEmptyState.style.setProperty('opacity', '0', 'important');
  } else {
    if (_learnLayoutMode === 'overview') {
      learnChatEmptyState.style.setProperty('display', 'none', 'important');
      learnChatEmptyState.style.setProperty('visibility', 'hidden', 'important');
      learnChatEmptyState.style.setProperty('opacity', '0', 'important');
    } else {
      learnChatEmptyState.style.removeProperty('display');
      learnChatEmptyState.style.removeProperty('visibility');
      learnChatEmptyState.style.removeProperty('opacity');
    }
  }
  learnChatContent.classList.toggle('is-chat-active', hasChat);
  learnChatContent.closest('#learnChatCol')?.classList.toggle('is-chat-active', hasChat);
  learnChatContent.closest('#learnChatScroll')?.classList.toggle('is-chat-active', hasChat);
  if (isTextbookFocusQaOpen) syncTextbookFocusQaFromLearnChat();
}

if (learnChatContent && learnChatEmptyState) {
  new MutationObserver(updateLearnChatEmptyState).observe(learnChatContent, {
    childList: true,
    subtree: true,
    characterData: true
  });
  updateLearnChatEmptyState();
}

function openChapterOverviewMode(sectionId, sectionTitle, subsections = []) {
  console.log('[openChapterOverviewMode]', { sectionId, sectionTitle, subsectionCount: subsections.length, currentBook });
  if (learnAbort) learnAbort.abort();
  learnRequestSeq += 1;
  closeTextbookFocusMode();
  learnSectionId = sectionId;
  learnSectionTitle = sectionTitle;
  learnParentOverviewContext = null;
  learnPages = [];
  learnPageIndex = 0;
  learnWebData = [];
  currentBookPageIndex = 0;
  _learnLayoutMode = 'overview';
  setChapterOverviewLayoutActive(true);
  _setLearnMode('lecture');

  learnTitle.textContent = sectionTitle;
  updateLearnModeBadge(userMemory && userMemory.quiz ? userMemory.quiz.track : null);
  clearLearnRenderedContent('');
  showLearnView();
  if (learnIntroCard) learnIntroCard.classList.add('hidden');
  if (learnBody) learnBody.classList.remove('hidden');
  hideSplash();
  setLearnLoading(false);
  if (learnChatContent) learnChatContent.innerHTML = '';
  updateLearnChatEmptyState();
  if (learnWebSection) learnWebSection.classList.add('hidden');

  const tocItems = [{ title: sectionTitle, depth: 1, anchor: '' }];
  subsections.forEach(sub => tocItems.push({ title: sub, depth: 2, anchor: '' }));
  buildToc(tocItems);

  renderChapterOverviewContent(sectionId, sectionTitle, subsections);
  loadChapterOverviewPrelude(sectionId, sectionTitle, subsections);
  if (learnExplainScroll) learnExplainScroll.scrollTop = 0;
}

async function openLearnMode(sectionId, sectionTitle, subsections = [], options = {}) {
  console.log('[openLearnMode]', { sectionId, sectionTitle, currentBook });
  if (learnAbort) learnAbort.abort();
  learnRequestSeq += 1;
  closeTextbookFocusMode();
  learnSectionId = sectionId;
  learnSectionTitle = sectionTitle;
  learnParentOverviewContext = options.parentOverviewContext || (
    subsections === null ? findParentOverviewContextForSubsection(sectionId, sectionTitle) : null
  );
  learnPages = [];
  learnPageIndex = 0;
  learnWebData = [];
  currentBookPageIndex = 0; // Fixed pagination resets to 0
  _learnLayoutMode = 'lesson';
  setChapterOverviewLayoutActive(false);
  _setLearnMode('lecture');

  learnTitle.textContent = sectionTitle;
  updateLearnModeBadge(userMemory && userMemory.quiz ? userMemory.quiz.track : null);
  if(learnIntroCard) learnIntroCard.classList.add('hidden');
  clearLearnRenderedContent('Preparing lesson...');
  showLearnView();
  // Bypass intro card: auto-start lesson immediately
  if (typeof startLesson === 'function') startLesson({ silent: true });

  // ── Use pre-generated preview if available (instant, no API call) ──
  const preview = getSectionPreview(sectionId, sectionTitle);
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

    // startLesson() above already owns learnAbort for its in-flight lesson
    // request; aborting or replacing it here kills that request and strands
    // the pane on "Preparing lesson...". Chain the intro fetch to the same
    // lifecycle with its own controller instead.
    const introAbort = new AbortController();
    if (learnAbort) learnAbort.signal.addEventListener('abort', () => introAbort.abort(), { once: true });
    try {
      const res = await fetch(`${API_BASE}/api/section`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sectionId, sectionTitle, mode: 'intro', language: 'en', bookSource: currentBook }),
        signal: introAbort.signal
      });
      const data = await readApiJson(res, 'section preview request');
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
            const parentContext = createOverviewContext(sectionId, sectionTitle, subsections);
            openLearnModeKeepToc(subTitle, subTitle, parentContext);
          });
        }
      });
    }
  }
}

async function startLesson(options = {}) {
  const silent = Boolean(options && options.silent);
  const requestSeq = ++learnRequestSeq;
  const requestSectionId = learnSectionId;
  const requestSectionTitle = learnSectionTitle;
  learnIntroCard.classList.add('hidden');
  let splashVisible = false;
  if (splashShowDelayTimer) clearTimeout(splashShowDelayTimer);
  if (!silent) {
    splashShowDelayTimer = setTimeout(() => {
      splashShowDelayTimer = null;
      splashVisible = true;
      showSplash();
      startSplashProgress(1, 3, 8000); // animate stages 1-3 over ~8s (real API determines actual timing)
    }, 1800);
  } else {
    hideSplash();
  }

  if (learnAbort) learnAbort.abort();
  learnAbort = new AbortController();

  try {
    const res = await fetch(`${API_BASE}/api/section`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sectionId: requestSectionId,
        sectionTitle: requestSectionTitle,
        mode: 'lesson',
        language: 'en',
        bookSource: 'new',
        webSources: []
      }),
      signal: learnAbort.signal
    });
    if (requestSeq !== learnRequestSeq || requestSectionId !== learnSectionId || requestSectionTitle !== learnSectionTitle) {
      return;
    }
    if (splashShowDelayTimer) {
      clearTimeout(splashShowDelayTimer);
      splashShowDelayTimer = null;
    }
    if (splashVisible) setSplashStage(4); // charts / rendering
    const data = await readApiJson(res, 'lesson request');
    hideSplash();
    if (isB8TextbookOnlySection(learnSectionId, learnSectionTitle)) {
      data.lesson = getB8TextbookOnlyMarkdown();
      data.formulaAppendix = true;
    }
    if (requestSeq !== learnRequestSeq || requestSectionId !== learnSectionId || requestSectionTitle !== learnSectionTitle) {
      return;
    }

    learnBody.classList.remove('hidden');
    learnPages = data.bookPages || learnPages;
    tutorState.learnSectionId = learnSectionId;
    tutorState.sessionStartTime = Date.now();
    tutorState.learnSectionTitle = learnSectionTitle;
    tutorState.learnLessonMarkdown = data.lesson || '';
    tutorState.learnBookPages = data.bookPages || [];
    tutorState.learnWebSources = data.webSources || [];
    const isCacheMissLesson = Boolean(data && data.cacheMiss);
    tutorState.learnHistory = (!isCacheMissLesson && tutorState.learnLessonMarkdown)
      ? [{ role: 'assistant', content: tutorState.learnLessonMarkdown }]
      : [];
    renderLearnPages();

    // Add the "Start Test" bottom section
    const isFormulaAppendixLesson = Boolean(data && data.formulaAppendix);
    if (isCacheMissLesson) {
      const fallbackSubsections = findSyllabusSubsections(requestSectionTitle);
      if (fallbackSubsections.length) {
        const parentContext = createOverviewContext(requestSectionId, requestSectionTitle, fallbackSubsections);
        openLearnModeKeepToc(fallbackSubsections[0], fallbackSubsections[0], parentContext);
        return;
      }
    }
    const lessonHtml = isCacheMissLesson
      ? `<p class="ghost">${escapeHtml(data.lesson || 'This section has not been prepared yet.')}</p>`
      : markdownToHtml(data.lesson || 'No explanation available.');
    const testSectionHtml = isFormulaAppendixLesson ? '' : buildLessonTestBannerHtml();
    setLearnLessonContent(lessonHtml + testSectionHtml);
    const parsedPages = parseLessonKnowledgePoints(lessonHtml + testSectionHtml);
    const quizPage = parsedPages.points.find(p => p.type === 'quiz');
    const quizPageHtml = quizPage?.html || '';
    const quizTemp = document.createElement('div');
    quizTemp.innerHTML = quizPageHtml;
    const quizPlanNodeGlobal = quizTemp.querySelector('.kc-quiz-plan');
    const pregenCardsGlobal = quizTemp.querySelectorAll('.kc-container');
    if (learnChatContent) learnChatContent.innerHTML = ''; // Clear chat history on new section
    updateLearnChatEmptyState();
    // startTestBtn is bound by bindStartTestBtnIfPresent() called from renderCurrentKnowledgePoint on each page render

    renderLearnWebSources(data.webSources || []);
    renderLearnWebSection(data.webSources || []);
    learnExplainScroll.scrollTop = 0;
    openLearnQaSidebar();
    setLearnLoading(false);
    // Async: save session summary
    saveSessionSummary(`Studied section "${learnSectionTitle}".`);
  } catch (err) {
    hideSplash();
    if (err.name === 'AbortError') return;
    if (!isCurrentLearnRequest(requestSeq, requestSectionId, requestSectionTitle, ['lesson'])) return;
    learnBody.classList.remove('hidden');
    learnExplainContent.innerHTML = `<div class="error-box"><strong>Failed to load lesson</strong><p>${escapeHtml(err.message)}</p></div>`;
    setLearnLoading(false);
  }
}

function closeLearnMode() {
  if (learnAbort) learnAbort.abort();
  hideSplash();
  closeLearnFocusMode();
  closeTextbookFocusMode();
  resetLearnKnowledgePointState();
  _learnLayoutMode = 'lesson';
  learnParentOverviewContext = null;
  setChapterOverviewLayoutActive(false);
  _setLearnMode('lecture');
  _textbookZoomed = false;
  showWelcome();
  clearToc();
}

function handleLearnBack() {
  if (learnAbort) learnAbort.abort();
  hideSplash();
  closeLearnFocusMode();
  closeTextbookFocusMode();
  resetLearnKnowledgePointState();
  if (_learnLayoutMode === 'lesson' && learnParentOverviewContext) {
    const target = learnParentOverviewContext;
    learnParentOverviewContext = null;
    openChapterOverviewMode(target.sectionId, target.sectionTitle, target.subsections || []);
    return;
  }
  closeLearnMode();
}

// Learn mode events
learnClose.addEventListener('click', handleLearnBack);
learnStartBtn.addEventListener('click', startLesson);

// ── LECTURE vs TEXTBOOK SWITCH ──
const _btnLecture = document.getElementById('btnLectureView');
const _btnTextbook = document.getElementById('btnTextbookView');
const learnExplainToggleLabel = document.getElementById('learnExplainToggleLabel');
const learnExplainRestoreLabel = document.getElementById('learnExplainRestoreLabel');
const _bookOverlay = document.getElementById('learnBookOverlay');
const _explainContent = document.getElementById('learnExplainContent');
const _tocSidebar = document.getElementById('tocSidebar');
let _textbookZoomed = false;

// Pre-load section page map for instant textbook lookup (no waiting for API)
let _sectionPageMap = {};
let _sectionDisplayPageMap = {};
let _sectionPageAnchorMap = {};
let _textbookStartRatio = 0;
const SECTION_PAGE_MAP_VERSION = '1778673277';
fetch(API_BASE + `/section-page-map-new.json?v=${SECTION_PAGE_MAP_VERSION}`, { cache: 'no-store' })
  .then(r => r.json())
  .then(d => { _sectionPageMap = d; })
  .catch(() => {});
fetch(API_BASE + `/section-page-map-display-new.json?v=${SECTION_PAGE_MAP_VERSION}`, { cache: 'no-store' })
  .then(r => r.json())
  .then(d => { _sectionDisplayPageMap = d; })
  .catch(() => {});
fetch(API_BASE + `/section-page-anchor-new.json?v=${SECTION_PAGE_MAP_VERSION}`, { cache: 'no-store' })
  .then(r => r.json())
  .then(d => { _sectionPageAnchorMap = d; })
  .catch(() => {});

function _setTabActive(activeBtn, inactiveBtn) {
  if (activeBtn) activeBtn.classList.add('active');
  if (inactiveBtn) inactiveBtn.classList.remove('active');
}

function syncInlineTextbookViewportToStart(options = {}) {
  if (!_bookOverlay) return;
  const alignFirstPage = options.alignFirstPage !== false;
  const startRatio = 0;
  const reset = () => {
    if (learnExplainScroll) {
      learnExplainScroll.scrollTop = 0;
      learnExplainScroll.scrollLeft = 0;
    }
    _bookOverlay.scrollTop = 0;
    _bookOverlay.scrollLeft = 0;
    if (!alignFirstPage || !learnExplainScroll) return;
    const firstCard = _bookOverlay.querySelector('.textbook-page-card');
    if (firstCard && typeof firstCard.offsetTop === 'number') {
      const anchorOffset = startRatio > 0 ? firstCard.offsetHeight * startRatio : 0;
      const leadIn = startRatio > 0 ? 18 : 0;
      learnExplainScroll.scrollTop = Math.max(0, firstCard.offsetTop + anchorOffset - leadIn);
    }
  };
  reset();
  requestAnimationFrame(reset);
  setTimeout(reset, 80);
}

function _setLearnMode(mode) {
  _learnViewMode = mode;
  const isOverviewLayout = _learnLayoutMode === 'overview';
  const isLessonLikeLayout = _learnLayoutMode === 'lesson' || _learnLayoutMode === 'overview_lesson';
  const supportsTextbookLayout = isLessonLikeLayout || isOverviewLayout;
  const isOverviewOnlyLayout = _learnLayoutMode === 'overview';
  _setTabActive(mode === 'textbook' ? _btnTextbook : _btnLecture, mode === 'textbook' ? _btnLecture : _btnTextbook);
  if (learnBody) learnBody.classList.toggle('learn-textbook-active', mode === 'textbook' && supportsTextbookLayout);
  if (learnExplainScroll) learnExplainScroll.classList.toggle('textbook-mode', mode === 'textbook');
  if (_bookOverlay) {
    _bookOverlay.classList.toggle('hidden', mode !== 'textbook' || !supportsTextbookLayout);
    _bookOverlay.style.display = mode === 'textbook' && supportsTextbookLayout ? 'block' : 'none';
  }
  if (mode === 'textbook' && supportsTextbookLayout) {
    syncInlineTextbookViewportToStart();
  }
  if (_explainContent) {
    const hideExplainForTextbook = mode === 'textbook' && supportsTextbookLayout;
    _explainContent.style.opacity = hideExplainForTextbook ? '0' : '1';
    _explainContent.style.pointerEvents = hideExplainForTextbook ? 'none' : 'auto';
    _explainContent.style.display = hideExplainForTextbook ? 'none' : '';
  }
  if (_tocSidebar) {
    _tocSidebar.style.display = isOverviewOnlyLayout ? 'none' : 'flex';
    _tocSidebar.classList.toggle('textbook-mode', mode === 'textbook');
  }
  if (learnExplainRestoreBtn) {
    const restoreCopy = mode === 'textbook' ? 'Show Notes' : 'Show';
    learnExplainRestoreBtn.title = mode === 'textbook' ? 'Show lecture notes' : 'Show lecture panel';
    learnExplainRestoreBtn.setAttribute('aria-label', mode === 'textbook' ? 'Show lecture notes' : 'Show lecture panel');
    if (learnExplainRestoreLabel) learnExplainRestoreLabel.textContent = restoreCopy;
  }
  if (learnExplainToolbarEl) learnExplainToolbarEl.style.display = isOverviewOnlyLayout ? 'none' : '';
  if (learnBookColEl) learnBookColEl.style.display = 'none';
  if (learnChatColPanel) {
    learnChatColPanel.classList.toggle('hidden', isOverviewOnlyLayout);
    learnChatColPanel.style.display = isOverviewOnlyLayout ? 'none' : '';
  }
  if (learnResizerPanel) {
    learnResizerPanel.classList.toggle('hidden', isOverviewOnlyLayout);
    learnResizerPanel.style.display = isOverviewOnlyLayout ? 'none' : '';
  }
  if (learnExplainColEl) {
    learnExplainColEl.style.flex = isOverviewLayout ? '1' : '1 1 auto';
    if (isOverviewLayout) {
      learnExplainColEl.style.width = '100%';
      learnExplainColEl.style.borderRight = 'none';
    } else {
      learnExplainColEl.style.width = '100%';
      learnExplainColEl.style.minWidth = '0';
      learnExplainColEl.style.maxWidth = '100%';
      learnExplainColEl.style.borderRight = '1px solid var(--border)';
    }
  }
  if (!isOverviewLayout && learnChatColPanel) {
    if (learnPanelFocus !== 'normal') {
      learnChatColPanel.style.flex = '';
      learnChatColPanel.style.width = '';
      learnChatColPanel.style.minWidth = '';
      learnChatColPanel.style.maxWidth = '';
    } else if (isLearnExplainCollapsed) {
      learnChatColPanel.style.flex = '1 1 auto';
      learnChatColPanel.style.width = '100%';
      learnChatColPanel.style.minWidth = '0';
      learnChatColPanel.style.maxWidth = '100%';
    } else {
      learnChatColPanel.style.flex = '1 1 auto';
      learnChatColPanel.style.width = '100%';
      learnChatColPanel.style.minWidth = '0';
      learnChatColPanel.style.maxWidth = '100%';
    }
  }
  if (lecturePrevOverlayBtn) lecturePrevOverlayBtn.classList.toggle('hidden', mode !== 'lecture' || !isLessonLikeLayout);
  if (lectureNextOverlayBtn) lectureNextOverlayBtn.classList.toggle('hidden', mode !== 'lecture' || !isLessonLikeLayout);
  if (lectureFocusOverlayBtn) lectureFocusOverlayBtn.classList.add('hidden');
  applyLearnPanelFocusState();
  if (isLessonLikeLayout && learnPanelFocus === 'normal') {
    isLearnChatCollapsed = false;
    isLearnChatPopoverOpen = false;
    applyLearnChatCollapsedState();
  }
}

if (_btnLecture && _btnTextbook) {
  _btnLecture.addEventListener('click', () => {
    _setTabActive(_btnLecture, _btnTextbook);
    _setLearnMode('lecture');
  });

  _btnTextbook.addEventListener('click', () => {
    _setTabActive(_btnTextbook, _btnLecture);
    _setLearnMode('textbook');
    loadTextbookPages();
    syncInlineTextbookViewportToStart({ startRatio: 0 });
  });
}

function loadTextbookPages() {
  if (!_bookOverlay) return;

  // Get current section ID from learnSectionId (global) or tutorState
  const rawId = (typeof learnSectionId !== 'undefined' ? learnSectionId : '') ||
                (typeof tutorState !== 'undefined' ? tutorState.learnSectionId : '') || '';

  // Normalize: e.g. 'B.1-2 Algebra of Complex Numbers' -> 'b.1-2'
  const codeMatch = rawId.match(/^([A-Za-z]?\.?\d+(?:[.\-]\d+)*)/);
  const code = codeMatch ? codeMatch[1].toLowerCase() : rawId.toLowerCase().trim();

  // Lookup display pages first. This file is the source of truth for the Textbook tab.
  const pageNames = _sectionDisplayPageMap[code] ||
    _sectionDisplayPageMap[rawId.toLowerCase()] ||
    _sectionPageMap[code] ||
    _sectionPageMap[rawId.toLowerCase()] ||
    [];
  const pageAnchor = _sectionPageAnchorMap[code] ||
    _sectionPageAnchorMap[rawId.toLowerCase()] ||
    null;
  const startRatio = Number(pageAnchor?.startRatio || 0);

  if (!pageNames.length) {
    // Fallback to tutorState.learnBookPages if map has no entry
    const apiFallback = (typeof tutorState !== 'undefined') ? (tutorState.learnBookPages || []) : [];
    if (apiFallback.length) {
      _renderTextbookPages(apiFallback.map(p => p.image || p.url || p), { startRatio: 0 });
    } else {
      _textbookStartRatio = 0;
      _bookOverlay.innerHTML = '<div style="padding:40px;text-align:center;color:#64748B;font-size:14px;">No textbook pages found for this section.</div>';
    }
    return;
  }

  const urls = pageNames.map((pn) => {
    const name = String(pn || '').trim();
    if (/^https?:\/\//i.test(name) || name.startsWith('/')) return name;
    const filename = /\.(png|jpe?g|webp)$/i.test(name) ? name : name + '.png';
    return API_BASE + '/pages/' + filename;
  });
  _renderTextbookPages(urls, { startRatio });
}

function _renderTextbookPages(urls, options = {}) {
  if (!_bookOverlay) return;
  const requestedRatio = Number(options.startRatio ?? 0);
  _textbookStartRatio = Number.isFinite(requestedRatio)
    ? Math.max(0, Math.min(0.92, requestedRatio))
    : 0;
  const pagesHtml = urls.map((url, idx) => `
    <div class="textbook-page-card">
      <img src="${url}" alt="Textbook page ${idx + 1}" loading="eager" decoding="sync" data-textbook-page="${idx + 1}">
    </div>
  `).join('');
  _bookOverlay.classList.toggle('zoomed', _textbookZoomed);
  _bookOverlay.innerHTML = `<div class="textbook-pages-flow">${pagesHtml}</div>`;
  syncInlineTextbookViewportToStart({ startRatio: _textbookStartRatio });

  const imgs = Array.from(_bookOverlay.querySelectorAll('.textbook-page-card img'));
  const scheduleRealign = () => {
    requestAnimationFrame(() => {
      syncInlineTextbookViewportToStart({ startRatio: _textbookStartRatio });
      requestAnimationFrame(() => syncInlineTextbookViewportToStart({ startRatio: _textbookStartRatio }));
    });
  };
  setTimeout(scheduleRealign, 120);
  setTimeout(scheduleRealign, 360);

  imgs.forEach((img, idx) => {
    if (idx < 4) {
      if (img.complete) {
        scheduleRealign();
      } else {
        img.addEventListener('load', scheduleRealign, { once: true });
        img.addEventListener('error', scheduleRealign, { once: true });
      }
    }
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      openTextbookFocusMode(idx);
    });
  });
}
learnWebBtn.addEventListener('click', () => {
  const open = !learnWebSources.classList.contains('hidden');
  learnWebSources.classList.toggle('hidden', open);
  learnWebBtn.classList.toggle('open', !open);
});
lightboxClose.addEventListener('click', () => closeLightbox());
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
if (learnKpPrevBtn) {
  learnKpPrevBtn.addEventListener('click', () => {
    moveLearnKnowledgePoint(-1);
  });
}
if (learnKpNextBtn) {
  learnKpNextBtn.addEventListener('click', () => {
    moveLearnKnowledgePoint(1);
  });
}
  if (lecturePrevOverlayBtn) {
    lecturePrevOverlayBtn.addEventListener('click', (event) => {
      event.preventDefault();
      if (isLearnPageTurning) return;
      if (moveLearnKnowledgePoint(-1)) animateLectureNavButton(-1);
    });
  }
  if (lectureNextOverlayBtn) {
    lectureNextOverlayBtn.addEventListener('click', (event) => {
      event.preventDefault();
      if (isLearnPageTurning) return;
      if (moveLearnKnowledgePoint(1)) animateLectureNavButton(1);
    });
  }
document.addEventListener('pointerdown', handleLectureOverlayNavEvent, true);
document.addEventListener('click', handleLectureOverlayNavEvent, true);
if (lectureFocusOverlayBtn) lectureFocusOverlayBtn.addEventListener('click', () => advanceLearnPanelFocus('qa'));
if (learnFocusBtn) learnFocusBtn.addEventListener('click', () => advanceLearnPanelFocus('qa'));
if (learnExplainToggleBtn) learnExplainToggleBtn.addEventListener('click', () => advanceLearnPanelFocus('lecture'));
if (learnExplainRestoreBtn) learnExplainRestoreBtn.addEventListener('click', () => advanceLearnPanelFocus('lecture'));
if (learnChatRestoreBtn) learnChatRestoreBtn.addEventListener('click', openLearnQaSidebar);

if (learnChatFab) {
  learnChatFab.addEventListener('click', () => {
    if (learnChatFab.dataset.dragJustEnded === 'true') {
      delete learnChatFab.dataset.dragJustEnded;
      return;
    }
    openLearnQaSidebar();
  });
}

if (learnChatPopoverDockBtn) {
  learnChatPopoverDockBtn.addEventListener('click', () => {
    openLearnQaSidebar();
  });
}

if (learnChatPopoverCloseBtn) {
  learnChatPopoverCloseBtn.addEventListener('click', () => {
    minimizeLearnQaToBubble();
  });
}

enableFloatingDrag(learnChatPopoverHead, learnChatPopover, { right: 28, bottom: 110 });
enableFloatingDrag(textbookFocusQaHead, textbookFocusQaPanel, null);
if (learnFocusClose) learnFocusClose.addEventListener('click', closeLearnFocusMode);
if (learnFocusBackdrop) learnFocusBackdrop.addEventListener('click', closeLearnFocusMode);
if (textbookFocusClose) textbookFocusClose.addEventListener('click', closeTextbookFocusMode);
if (textbookFocusBackdrop) textbookFocusBackdrop.addEventListener('click', closeTextbookFocusMode);
  if (textbookFocusZoomOutBtn) textbookFocusZoomOutBtn.addEventListener('click', () => stepTextbookFocusZoom(-0.15));
  if (textbookFocusZoomInBtn) textbookFocusZoomInBtn.addEventListener('click', () => stepTextbookFocusZoom(0.15));
  if (textbookFocusZoomResetBtn) textbookFocusZoomResetBtn.addEventListener('click', () => resetTextbookFocusTransform(1.5));
if (textbookFocusQaToggle) textbookFocusQaToggle.addEventListener('click', () => setTextbookFocusQaOpen(!isTextbookFocusQaOpen));
if (textbookFocusQaClose) textbookFocusQaClose.addEventListener('click', () => setTextbookFocusQaOpen(false));
if (textbookFocusQaSend) textbookFocusQaSend.addEventListener('click', sendTextbookFocusQuestion);
if (textbookFocusQaInput) {
  textbookFocusQaInput.addEventListener('input', () => {
    autoResize(textbookFocusQaInput);
    if (textbookFocusQaSend) textbookFocusQaSend.disabled = !textbookFocusQaInput.value.trim();
  });
  textbookFocusQaInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendTextbookFocusQuestion();
    }
  });
  if (textbookFocusQaSend) textbookFocusQaSend.disabled = !textbookFocusQaInput.value.trim();
}
if (learnFocusPrevBtn) {
  learnFocusPrevBtn.addEventListener('click', () => {
    if (currentKnowledgePointIndex > 0) {
      currentKnowledgePointIndex -= 1;
      renderCurrentKnowledgePoint();
    }
  });
}
if (learnFocusNextBtn) {
  learnFocusNextBtn.addEventListener('click', () => {
    if (currentKnowledgePointIndex < learnKnowledgePoints.length - 1) {
      currentKnowledgePointIndex += 1;
      renderCurrentKnowledgePoint();
    }
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.getElementById('attachmentImageModal')) {
    closeAttachmentImageModal();
    return;
  }
  if (e.key === 'Escape' && document.getElementById('mainBookSourceModal')) {
    closeMainBookSourceModal();
    return;
  }
  if (learnFocusModal && !learnFocusModal.classList.contains('hidden')) {
    if (e.key === 'Escape') {
      closeLearnFocusMode();
      return;
    }
    if (e.key === 'ArrowLeft' && currentKnowledgePointIndex > 0) {
      currentKnowledgePointIndex -= 1;
      renderCurrentKnowledgePoint();
      return;
    }
    if (e.key === 'ArrowRight' && currentKnowledgePointIndex < learnKnowledgePoints.length - 1) {
      currentKnowledgePointIndex += 1;
      renderCurrentKnowledgePoint();
      return;
    }
  }
  if (textbookFocusModal && !textbookFocusModal.classList.contains('hidden')) {
    if (e.key === 'Escape') {
      closeTextbookFocusMode();
      return;
    }
    if ((e.key === '=' || e.key === '+') && !e.metaKey) {
      e.preventDefault();
      stepTextbookFocusZoom(0.15);
      return;
    }
    if ((e.key === '-' || e.key === '_') && !e.metaKey) {
      e.preventDefault();
      stepTextbookFocusZoom(-0.15);
      return;
    }
    if (e.key === '0' && !e.metaKey) {
      e.preventDefault();
      resetTextbookFocusTransform(1.5);
      return;
    }
  }
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
  if (lightboxDragging && lightboxScale > 1) {
    lightboxPanX = e.clientX - lightboxDragStartX;
    lightboxPanY = e.clientY - lightboxDragStartY;
    applyLightboxTransform();
  }
  const textbookImg = textbookFocusContent?.querySelector('.textbook-focus-single-page');
  if (textbookFocusDragging && textbookImg && textbookFocusScale > 1.01) {
    textbookFocusPanX = e.clientX - textbookFocusDragStartX;
    textbookFocusPanY = e.clientY - textbookFocusDragStartY;
    applyTextbookFocusTransform();
  }
});
document.addEventListener('mouseup', () => {
  lightboxDragging = false;
  if (lightboxImg) lightboxImg.classList.remove('is-dragging');
  textbookFocusDragging = false;
  const textbookImg = textbookFocusContent?.querySelector('.textbook-focus-single-page');
  if (textbookImg) textbookImg.classList.remove('is-dragging');
});

learnFollowupInput.addEventListener('input', () => {
  autoResize(learnFollowupInput);
  learnFollowupBtn.disabled = !learnFollowupInput.value.trim();
  if (learnFollowupInputPopover && document.activeElement !== learnFollowupInputPopover) {
    learnFollowupInputPopover.value = learnFollowupInput.value;
    autoResize(learnFollowupInputPopover);
    if (learnFollowupBtnPopover) learnFollowupBtnPopover.disabled = !learnFollowupInputPopover.value.trim();
  }
});
async function sendLearnFollowup(rawPrompt, options = {}) {
  const prompt = (rawPrompt || learnFollowupInput.value || '').trim();
  const attachments = [...attachmentsLearn];
  if (!prompt && attachments.length === 0) return;
  const promptLang = detectLang(prompt);

  // Clear learn attachments
  attachmentsLearn.length = 0;
  renderAttachPreview(attachmentsLearn, 'attachPreviewLearn');

  learnFollowupInput.value = '';
  autoResize(learnFollowupInput);
  learnFollowupBtn.disabled = true;
  if (learnFollowupInputPopover) {
    learnFollowupInputPopover.value = '';
    autoResize(learnFollowupInputPopover);
  }
  if (learnFollowupBtnPopover) learnFollowupBtnPopover.disabled = true;

  const answerId = `learn-followup-answer-${Date.now()}`;
  learnChatContent.insertAdjacentHTML('beforeend', `
    <div class="followup-bubble" id="${answerId}">
      <div class="fub-q">${escapeHtml(prompt)}</div>
      <div class="fub-a ghost">
        ${buildSearchProgressMarkup('followup', promptLang)}
      </div>
    </div>
  `);
  updateLearnChatEmptyState();
  learnChatScroll.scrollTop = learnChatScroll.scrollHeight;
  if (learnChatPopoverScroll) {
    learnChatPopoverScroll.innerHTML = learnChatContent.innerHTML || '';
    learnChatPopoverScroll.scrollTop = learnChatPopoverScroll.scrollHeight;
  }
  syncTextbookFocusQaFromLearnChat();

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
      steps[0].classList.remove('is-muted');
      if (sp) { sp.className = 'step-icon step-done'; sp.textContent = '✓'; }
    }
    if (learnStep >= 2 && steps[1]) {
      steps[1].classList.remove('is-muted');
      const sp = steps[1].querySelector('.step-icon');
      if (sp) { sp.className = 'step-icon step-done'; sp.textContent = '✓'; }
    }
    if (steps[2]) {
      steps[2].classList.remove('is-muted');
      const sp = steps[2].querySelector('.step-icon');
      if (sp && !sp.classList.contains('step-done')) {
        sp.className = 'step-icon step-spinner';
        sp.textContent = '';
      }
    }
  }, 1200);

  try {
    const selectedAnswerLength = normalizeAnswerStyle(options.answerLength || document.getElementById('answerLengthToggleLearn')?.value || 'balanced');
    const selectedUseWebSearch = typeof options.useWebSearch === 'boolean'
      ? options.useWebSearch
      : Boolean(webSearchBtnLearn?.classList.contains('active'));
    const data = await callAsk(prompt, localLearnSignal, {
      mode: 'followup',
      history: tutorState.learnHistory.slice(-8),
      sectionId: tutorState.learnSectionId,
      sectionTitle: tutorState.learnSectionTitle,
      lessonContext: tutorState.learnLessonMarkdown,
      bookPages: tutorState.learnBookPages,
      webSources: tutorState.learnWebSources,
      useWebSearch: selectedUseWebSearch,
      answerLength: selectedAnswerLength,
      answerStyleInstruction: getAnswerStyleInstruction(selectedAnswerLength, detectLang(prompt)),
      language: detectLang(prompt),
      attachments: getModelReadableAttachments(attachments)
    });

    if (window.loadingTimerLearn) clearInterval(window.loadingTimerLearn);

    const target = document.getElementById(answerId);
    if (target) {
      replayLiveSearchEvents(target, data.liveSearchEvents || [], data.webSources || [], promptLang);
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
      if (learnChatPopoverScroll) {
        learnChatPopoverScroll.innerHTML = learnChatContent.innerHTML || '';
        learnChatPopoverScroll.scrollTop = learnChatPopoverScroll.scrollHeight;
      }
      syncTextbookFocusQaFromLearnChat();
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
    updateRecentConversations('learn:stream-finished');
    learnChatScroll.scrollTop = learnChatScroll.scrollHeight;
  } catch (err) {
    if (window.loadingTimerLearn) clearInterval(window.loadingTimerLearn);
    if (err.name === 'AbortError') return;
    const target = document.getElementById(answerId);
    if (target) {
      // Clear loading state in the answer div first, then show error
      const answerDiv = target.querySelector('.fub-a') || target;
      answerDiv.className = 'fub-a';
      const failedTitle = promptLang === 'zh' ? '加载失败' : 'Loading failed';
      answerDiv.innerHTML = `<div class="error-box"><strong>${failedTitle}</strong><p>${escapeHtml(err.message)}</p></div>`;
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
if (learnFollowupInputPopover) {
  learnFollowupInputPopover.addEventListener('input', () => {
    autoResize(learnFollowupInputPopover);
    if (learnFollowupBtnPopover) learnFollowupBtnPopover.disabled = !learnFollowupInputPopover.value.trim();
    if (learnFollowupInput && document.activeElement !== learnFollowupInput) {
      learnFollowupInput.value = learnFollowupInputPopover.value;
      autoResize(learnFollowupInput);
      learnFollowupBtn.disabled = !learnFollowupInput.value.trim();
    }
  });

  learnFollowupInputPopover.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      if (!learnFollowupInputPopover.value.trim()) return;
      sendLearnFollowup(learnFollowupInputPopover.value.trim());
    }
  });
}
learnFollowupBtn.addEventListener('click', () => {
  if (!learnFollowupInput.value.trim()) return;
  sendLearnFollowup(learnFollowupInput.value.trim());
});
if (learnFollowupBtnPopover) learnFollowupBtnPopover.addEventListener('click', () => {
  if (!learnFollowupInputPopover.value.trim()) return;
  sendLearnFollowup(learnFollowupInputPopover.value.trim());
});

// Esc to close
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (!lightbox.classList.contains('hidden')) lightbox.classList.add('hidden');
    else if (!learnView.classList.contains('hidden')) closeLearnMode();
  }
});

function parseMdTable(block) {
  const rows = block
    .trim()
    .split('\n')
    .map(r => r.trim().replace(/^>\s?/, '').trim())
    .filter(r => r.startsWith('|'));
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

  // Normalize legacy MathJax display blocks so standalone \[ ... \] delimiters become display math.
  // Keep this line-bound so LaTeX spacing such as \\[4pt] inside equations is not treated as a delimiter.
  text = text
    .replace(/(^|\n)\s*\\\[\s*([^\n]+?)\s*\\\]\s*(?=\n|$)/g, '$1$$\n$2\n$$')
    .replace(/(^|\n)\s*\\\[\s*(?=\n)/g, '$1$$\n')
    .replace(/(^|\n)\s*\\\]\s*(?=\n|$)/g, '$1$$');

  // Ensure a blank line after --- separators so the next element parses correctly
  text = text.replace(/\n(---+)\n([^\n])/g, '\n$1\n\n$2');

  // Normalize blockquoted markdown tables like:
  // > | Col A | Col B |
  // > | --- | --- |
  // > | x | y |
  text = text.replace(/((?:^|\n)(?:>\s*\|[^\n]*\|[ \t]*\n?){2,})/g, (match) => {
    const unquoted = match
      .split('\n')
      .map(line => line.replace(/^>\s?/, ''))
      .join('\n');
    const parsed = parseMdTable(unquoted);
    return parsed ? '\n' + parsed + '\n' : unquoted;
  });

  // First, convert any normal Markdown tables to HTML tables
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

  // Protect KC blocks fully
  const kcPlaceholders = [];
  text = text.replace(/%%KC_BLOCK%%([\s\S]*?)%%KC_END%%/g, (match) => {
    const idx = kcPlaceholders.length;
    kcPlaceholders.push(match);
    return `\n\x00KC_BLOCK_${idx}\x00\n`;
  });

  // Pre-process: convert $...$ to \(...\) for MathJax
  if (window.preprocessMath) {
    text = window.preprocessMath(text);
  } else {
    // Fallback: simple regex to convert single $...$ to \(...\)
    text = text
      .replace(/(^|\n)\s*\$\s*\n([\s\S]*?)\n\s*\$\s*(?=\n|$)/g, (_m, lead, body) => `${lead}$$\n${String(body || '').trim()}\n$$`)
      .replace(/(?<!\$)\$(?!\$)(.+?)(?<!\$)\$(?!\$)/g, '\\($1\\)');
  }
  const lines = text.replace(/\r/g, '').split('\n');
  let html = '';
  let listTag = '';
  let inCode = false;
  let inMath = false;
  let codeBuf = [];
  let mathBuf = [];

  const flushList = () => {
    if (listTag) { html += `</${listTag}>`; listTag = ''; }
  };
  const ensureList = (tag) => {
    if (listTag === tag) return;
    flushList();
    html += `<${tag}>`;
    listTag = tag;
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
      html += `<div class="math-block">$$\n${mathBuf.join('\n')}\n$$</div>`;
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
    if (/^\$\$[\s\S]+\$\$$/.test(t) && t !== '$$') {
      flushList();
      html += `<div class="math-block">${t}</div>`;
      continue;
    }
    if (!inMath && t.startsWith('$$') && t !== '$$') {
      flushList();
      const rest = raw.replace(/^\s*\$\$\s*/, '');
      if (/\$\$\s*$/.test(rest)) {
        html += `<div class="math-block">$$
${rest.replace(/\s*\$\$\s*$/, '')}
$$</div>`;
      } else {
        inMath = true;
        if (rest.trim()) mathBuf.push(rest);
      }
      continue;
    }
    if (t === '$$') {
      flushList();
      if (inMath) flushMath(); else inMath = true;
      continue;
    }
    if (inMath) {
      if (/\$\$\s*$/.test(t)) {
        const cleaned = raw.replace(/\s*\$\$\s*$/, '');
        if (cleaned.trim()) mathBuf.push(cleaned);
        flushMath();
      } else {
        mathBuf.push(raw);
      }
      continue;
    }

    if (!t) { flushList(); continue; }

    if (/^#{1,6}\s+/.test(t)) {
      flushList();
      const lv = Math.min((t.match(/^#+/) || ['#'])[0].length, 6);
      const txt = t.replace(/^#{1,6}\s+/, '');
      html += `<h${lv}>${inlineFormat(txt)}</h${lv}>`;
      continue;
    }

    if (/^\x00TABLE_\d+\x00$/.test(t) || /^\x00KC_BLOCK_\d+\x00$/.test(t)) {
      flushList();
      html += t;
      continue;
    }

    if (/^[-*+]\s+/.test(t)) {
      ensureList('ul');
      html += `<li>${inlineFormat(t.replace(/^[-*+]\s+/, ''))}</li>`;
      continue;
    }

    if (/^\d+[.)]\s+/.test(t)) {
      ensureList('ol');
      html += `<li>${inlineFormat(t.replace(/^\d+[.)]\s+/, ''))}</li>`;
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

  // Restore KC placeholders first
  html = html.replace(/\x00KC_BLOCK_(\d+)\x00/g, (_, idx) => kcPlaceholders[Number(idx)] || '');

  // Now process the KC tags (it's safe now because markdown parser didn't touch it)
  html = html.replace(/%%KC_BLOCK%%([\s\S]*?)%%KC_END%%/g, (_, rawHtml) => {
    // rawHtml hasn't been mangled into <p> tags, just unescape base HTML entities
    const txt = rawHtml
      .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"');
    return txt;
  });

  return html;
}

function decodeHtmlEntities(text) {
  let value = text == null ? '' : String(text);
  for (let i = 0; i < 3; i += 1) {
    const el = document.createElement('textarea');
    el.innerHTML = value;
    const decoded = el.value;
    if (decoded === value) break;
    value = decoded;
  }
  return value;
}

function inlineFormat(text) {
  const placeholders = [];
  let s = text.replace(/\x00TABLE_(\d+)\x00/g, (_, idx) => {
    placeholders.push({ idx, orig: `\x00TABLE_${idx}\x00` });
    return `__TABLE_PLACEHOLDER_${idx}__`;
  });
  s = s.replace(/<\/?(details|summary)( [^>]*)?>/gi, (match) => {
    placeholders.push({ idx: placeholders.length, orig: match });
    return `__SAFE_TAG_${placeholders.length - 1}__`;
  });
  s = s.replace(/\\\((.*?)\\\)/g, (match, mathContent) => {
    placeholders.push({ idx: placeholders.length, orig: match });
    return `__MATH_PLACEHOLDER_${placeholders.length - 1}__`;
  });
  s = escapeHtml(s);
  placeholders.forEach(({ idx, orig }) => {
    s = s.replace(`__TABLE_PLACEHOLDER_${idx}__`, orig);
    s = s.replace(`__SAFE_TAG_${idx}__`, orig);
  });
  s = s.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#0f172a; font-weight:800;">$1</strong>');
  s = s.replace(/\*(.*?)\*/g, '<em style="color:#64748b; font-style:italic;">$1</em>');
  s = s.replace(/`([^`]+)`/g, (match, codeContent) => {
    if (/\\|&#94;|&amp;|\{|=|cos\b|sin\b|tan\b|θ|π|\^|_/i.test(codeContent)) {
      return `\\(${codeContent}\\)`;
    }
    return `<code style="background:#f1f5f9; padding:2px 4px; border-radius:4px; font-family:'DM Mono', monospace; font-size:0.9em; color:#6366F1;">${codeContent}</code>`;
  });
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
    const rawSrc = String(src || '').trim();
    const finalSrc = /^https?:\/\//i.test(rawSrc) ? rawSrc : (rawSrc.startsWith('/') ? `${API_BASE}${rawSrc}` : rawSrc);
    return `<img src="${finalSrc}" alt="${alt}" class="lesson-img" loading="lazy">`;
  });
  placeholders.forEach(({ idx, orig }) => {
    s = s.replace(`__MATH_PLACEHOLDER_${idx}__`, orig);
  });
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  return s;
}


// ── Knowledge Check / Quiz Modal ───────────────────────────────────────────
(function() {
  const modal      = document.getElementById('kcModal');
  const header     = document.getElementById('kcModalHeader');
  const closeBtn   = document.getElementById('kcModalClose');
  const questionEl = document.getElementById('kcQuestion');
  const answerEl   = document.getElementById('kcAnswer');
  const hintEl     = document.getElementById('kcHint');
  const revealBtn  = document.getElementById('kcRevealBtn');
  const answerBox  = document.getElementById('kcAnswerBox');
  const inputEl    = document.getElementById('kcAnswerInput');
  const submitBtn  = document.getElementById('kcSubmitBtn');
  const feedbackEl = document.getElementById('kcFeedback');
  const loadingEl  = document.getElementById('kcLoading');
  if (!modal) return;

  let kcHistory = [];
  let kcSectionId = '';
  let kcSectionTitle = '';
  let kcQuestion = '';
  let kcAnswer = '';
  let kcHint = '';
  let kcQuizPlan = null;
  let kcFlatQuestions = [];
  let kcCurrentIndex = 0;
  let kcCurrentQuestion = null;
  let kcCurrentPointId = '';
  let kcCurrentPointLabel = '';
  let kcPointStates = {};
  let isMaximized = false;
  let isMinimized = false;
  const KC_PROGRESS_STORAGE_KEY = 'kcQuizProgress_v1';

  function getQuizProgressSnapshot() {
    if (!kcSectionId || !kcQuizPlan || !kcFlatQuestions.length) return null;
    return {
      sectionId: kcSectionId,
      sectionTitle: kcSectionTitle,
      quizPlan: kcQuizPlan,
      flatQuestions: kcFlatQuestions,
      currentIndex: kcCurrentIndex,
      currentPointId: kcCurrentPointId,
      currentPointLabel: kcCurrentPointLabel,
      pointStates: kcPointStates,
      history: kcHistory,
      isMaximized,
      isMinimized,
      savedAt: Date.now()
    };
  }

  function saveQuizProgress() {
    try {
      const snapshot = getQuizProgressSnapshot();
      if (!snapshot) return;
      sessionStorage.setItem(KC_PROGRESS_STORAGE_KEY, JSON.stringify(snapshot));
    } catch (_) {}
  }

  function clearQuizProgress() {
    try { sessionStorage.removeItem(KC_PROGRESS_STORAGE_KEY); } catch (_) {}
  }

  function loadQuizProgress(sectionId) {
    try {
      const raw = sessionStorage.getItem(KC_PROGRESS_STORAGE_KEY);
      if (!raw) return null;
      const snapshot = JSON.parse(raw);
      if (!snapshot || !snapshot.sectionId) return null;
      if (sectionId && snapshot.sectionId !== sectionId) return null;
      return snapshot;
    } catch (_) {
      return null;
    }
  }

  function applyQuizProgressSnapshot(snapshot) {
    if (!snapshot) return false;
    kcSectionId = snapshot.sectionId || kcSectionId;
    kcSectionTitle = snapshot.sectionTitle || kcSectionTitle;
    kcQuizPlan = snapshot.quizPlan || kcQuizPlan;
    kcFlatQuestions = Array.isArray(snapshot.flatQuestions) ? snapshot.flatQuestions : [];
    kcCurrentIndex = Math.max(0, Math.min(Number(snapshot.currentIndex || 0), Math.max(0, kcFlatQuestions.length - 1)));
    kcCurrentQuestion = kcFlatQuestions[kcCurrentIndex] || null;
    kcCurrentPointId = snapshot.currentPointId || kcCurrentQuestion?.pointId || '';
    kcCurrentPointLabel = snapshot.currentPointLabel || kcCurrentQuestion?.pointLabel || '';
    kcPointStates = snapshot.pointStates || {};
    kcHistory = Array.isArray(snapshot.history) ? snapshot.history : [];
    isMaximized = !!snapshot.isMaximized;
    isMinimized = !!snapshot.isMinimized;
    return true;
  }

  function ensureQuizChrome() {


    const modalEl = document.getElementById('kcModal');
    let addMistakeBtn = document.getElementById('kcAddMistakeBtn');
    if (!addMistakeBtn) {
      addMistakeBtn = document.createElement('button');
      addMistakeBtn.id = 'kcAddMistakeBtn';
      addMistakeBtn.type = 'button';
      addMistakeBtn.className = 'kc-add-mistake-btn';
      addMistakeBtn.textContent = 'Add to Mistake Notebook';
      questionEl.insertAdjacentElement('beforebegin', addMistakeBtn);
      addMistakeBtn.addEventListener('click', addCurrentQuizQuestionToMistakeNotebook);
    }
    let visualEl = document.getElementById('kcQuestionVisual');
    if (!visualEl) {
      visualEl = document.createElement('div');
      visualEl.id = 'kcQuestionVisual';
      visualEl.style.cssText = 'display:none;margin:0 0 16px;padding:12px;border:1px solid #E2E8F0;border-radius:12px;background:#F8FAFC;';
      const optionsAnchor = document.getElementById('kcAnswerBox') || document.getElementById('kcOptions');
      if (optionsAnchor && optionsAnchor.parentNode) {
        optionsAnchor.parentNode.insertBefore(visualEl, optionsAnchor);
      } else {
        questionEl.insertAdjacentElement('afterend', visualEl);
      }
    }
    let optionsEl = document.getElementById('kcOptions');
    if (!optionsEl) {
      optionsEl = document.createElement('div');
      optionsEl.id = 'kcOptions';
      optionsEl.style.cssText = 'display:none;gap:10px;flex-direction:column;margin:0 0 16px;';
      questionEl.insertAdjacentElement('afterend', optionsEl);
    }




  }

  function escapeAttr(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function renderQuizInlineText(value) {
    const raw = decodeHtmlEntities(value == null ? '' : String(value));
    const normalized = window.preprocessMath ? window.preprocessMath(raw) : raw;
    return inlineFormat(normalized).replace(/\n/g, '<br>');
  }

  function renderQuizMatrixTable(values, options = {}) {
    const rows = Array.isArray(values) ? values : [];
    if (!rows.length) return '';
    const highlight = String(options.highlight || '').toLowerCase();
    return `
      <table style="border-collapse:separate;border-spacing:6px 8px;margin:0 auto;">
        <tbody>
          ${rows.map((row, rowIndex) => `
            <tr>
              ${(Array.isArray(row) ? row : []).map((cell, colIndex) => {
                const isDiagonal = rowIndex === colIndex;
                const isMirrorPair = rowIndex !== colIndex && highlight === 'symmetric';
                const bg = highlight === 'zero'
                  ? '#F8FAFC'
                  : (highlight === 'diagonal' || highlight === 'identity') && isDiagonal
                    ? '#DBEAFE'
                    : isMirrorPair
                      ? '#E0F2FE'
                      : '#FFFFFF';
                const border = (highlight === 'diagonal' || highlight === 'identity') && isDiagonal
                  ? '#60A5FA'
                  : isMirrorPair
                    ? '#38BDF8'
                    : '#CBD5E1';
                return `<td style="min-width:32px;height:32px;padding:0 8px;text-align:center;font-size:18px;font-weight:600;color:#0F172A;background:${bg};border:1px solid ${border};border-radius:8px;">${renderQuizInlineText(cell)}</td>`;
              }).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  function getQuizMatrixVisualHtml(question = {}) {
    const visual = question && typeof question.matrix_visual === 'object' ? question.matrix_visual : null;
    if (!visual) return '';
    const cards = Array.isArray(visual.cards) ? visual.cards : [];
    if (!cards.length) return '';
    const layout = String(visual.layout || 'row').toLowerCase();
    const caption = String(question.image_caption || question.visual_caption || visual.caption || '').trim();
    const note = String(visual.note || '').trim();
    const cardHtml = cards.map((card) => {
      const values = Array.isArray(card.values) ? card.values : [];
      const label = String(card.label || '').trim();
      const title = String(card.title || '').trim();
      return `
        <div style="flex:1 1 0;min-width:0;padding:12px;border:1px solid #CBD5E1;border-radius:14px;background:linear-gradient(180deg,#FFFFFF 0%,#F8FAFC 100%);">
          ${label ? `<div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#2563EB;margin-bottom:4px;">${escapeHtml(label)}</div>` : ''}
          ${title ? `<div style="font-size:13px;font-weight:700;color:#0F172A;margin-bottom:10px;">${escapeHtml(title)}</div>` : ''}
          ${renderQuizMatrixTable(values, { highlight: card.highlight })}
        </div>
      `;
    }).join('');
    return `
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div style="display:flex;flex-direction:${layout === 'stack' ? 'column' : 'row'};gap:12px;align-items:stretch;">
          ${cardHtml}
        </div>
        ${note ? `<div style="font-size:13px;color:#334155;">${renderQuizInlineText(note)}</div>` : ''}
        ${caption ? `<div style="font-size:13px;color:#475569;">${renderQuizInlineText(caption)}</div>` : ''}
      </div>
    `;
  }

  function getQuizVisualHtml(question = {}) {
    const matrixVisualHtml = getQuizMatrixVisualHtml(question);
    if (matrixVisualHtml) return matrixVisualHtml;

    const explicitUrl = String(question.image_url || question.visual_url || '').trim();
    const explicitCaption = String(question.image_caption || question.visual_caption || '').trim();
    if (explicitUrl) {
      return `
        <div style="display:flex;flex-direction:column;gap:10px;">
          <img src="${escapeAttr(explicitUrl)}" alt="Question visual" style="max-width:100%;border-radius:10px;border:1px solid #CBD5E1;background:#fff;">
          ${explicitCaption ? `<div style="font-size:13px;color:#475569;">${renderQuizInlineText(explicitCaption)}</div>` : ''}
        </div>
      `;
    }

    return '';
  }

  function typesetQuizNodes(nodes) {
    if (!window.MathJax || !window.MathJax.typesetPromise) return;
    const targets = (Array.isArray(nodes) ? nodes : [nodes]).filter(Boolean);
    if (!targets.length) return;
    window.MathJax.typesetPromise(targets).catch(() => {});
  }

  function getCurrentQuizMistakePayload() {
    const q = kcCurrentQuestion?.question || {};
    const stem = q.stem || q.question || kcQuestion || '(No question)';
    const options = Array.isArray(q.options) && q.options.length
      ? q.options.map(opt => `- ${String(opt || '').trim()}`).join('\n')
      : '';
    const correct = q.correct_option || q.ideal_answer || q.answer || kcAnswer || '';
    const explanation = q.explanation || kcAnswer || '';
    const hint = q.hint || kcHint || '';
    const source = `${kcSectionId || ''} ${kcSectionTitle || ''}`.trim() || 'Knowledge Check';
    const problemText = [
      `## ${source}`,
      `### Question`,
      stem,
      options ? `### Options\n${options}` : '',
      correct ? `### Correct Answer\n${correct}` : '',
      hint ? `### Hint\n${hint}` : ''
    ].filter(Boolean).join('\n\n');
    return {
      title: `${source ? source + ' · ' : ''}${String(stem).replace(/\s+/g, ' ').slice(0, 54)}`,
      tags: [source, kcCurrentPointLabel, 'quiz'].filter(Boolean).join(', '),
      notes: [
        `## Why I saved this`,
        `Add your mistake pattern here.`,
        ``,
        `## Correct answer`,
        correct || '(fill in after review)',
        explanation ? `\n## Explanation\n${explanation}` : ''
      ].join('\n'),
      aiAnswer: explanation || '',
      problemText,
      sourceType: 'quiz',
      sectionId: kcSectionId,
      sectionTitle: kcSectionTitle,
      pointLabel: kcCurrentPointLabel
    };
  }

  function addCurrentQuizQuestionToMistakeNotebook() {
    const btn = document.getElementById('kcAddMistakeBtn');
    const payload = getCurrentQuizMistakePayload();
    addMistakeNotebookItem(payload);
    if (btn) {
      const old = btn.textContent;
      btn.textContent = 'Added';
      btn.classList.add('is-added');
      setTimeout(() => {
        btn.textContent = old;
        btn.classList.remove('is-added');
      }, 1200);
    }
  }

  function resetQuizState(options = {}) {
    const { preserveStoredProgress = false } = options;
    kcHistory = [];
    kcQuizPlan = null;
    kcFlatQuestions = [];
    kcCurrentIndex = 0;
    kcCurrentQuestion = null;
    kcCurrentPointId = '';
    kcCurrentPointLabel = '';
    kcPointStates = {};

    isMaximized = false;
    isMinimized = false;
    if (!preserveStoredProgress) clearQuizProgress();
    const modalEl = document.getElementById('kcModal');
    const wrapper = document.getElementById('kcModalWrapper');
    const minBtn = document.getElementById('kcModalMinBtn');
    const maxBtn = document.getElementById('kcModalMaxBtn');
    if (modalEl) {
      modalEl.style.top = '80px';
      modalEl.style.left = '50%';
      modalEl.style.transform = 'translateX(-50%)';
      modalEl.style.width = '800px';
      modalEl.style.height = 'auto';
      modalEl.style.maxWidth = '96vw';
      modalEl.style.maxHeight = '85vh';
      modalEl.style.borderRadius = '16px';
      modalEl.style.minHeight = '480px';
      modalEl.style.right = 'auto';
      modalEl.style.bottom = 'auto';
    }
    if (wrapper) wrapper.style.display = 'flex';
    if (minBtn) minBtn.textContent = '_';
    if (maxBtn) maxBtn.textContent = '□';

    const header = document.getElementById('kcModalHeader');
    if (header) header.style.borderRadius = '16px 16px 0 0';
  }

  function flattenQuizPlan(plan) {
    const items = [];
    const points = Array.isArray(plan?.knowledge_points) ? plan.knowledge_points : [];
    points.forEach((point, pointIndex) => {
      const pointId = point.id || `kp_${pointIndex + 1}`;
      const pointLabel = point.label || `Knowledge Point ${pointIndex + 1}`;
      const streakRequired = Math.max(1, Number(point?.mastery_rule?.correct_streak_required || 1));
      (point.questions || []).forEach((question, questionIndex) => {
        items.push({
          pointId,
          pointLabel,
          pointIndex,
          questionIndex,
          streakRequired,
          point,
          question
        });
      });
      kcPointStates[pointId] = { correctStreak: 0, passed: false, attempts: 0, required: streakRequired };
    });
    return items;
  }

  function renderProgress() {
    ensureQuizChrome();
    const headerEl = document.getElementById('kcModalHeader');
    let pbWrap = document.getElementById('kcProgressWrap');
    if (!pbWrap && headerEl) {
      pbWrap = document.createElement('div');
      pbWrap.id = 'kcProgressWrap';
      pbWrap.style.cssText = 'position:absolute; left:20px; right:20px; bottom:14px; height:10px; background:rgba(255,255,255,0.22); border:1px solid rgba(255,255,255,0.16); border-radius:999px; overflow:hidden; box-shadow:inset 0 1px 2px rgba(0,0,0,0.12);';
      const pbFill = document.createElement('div');
      pbFill.id = 'kcProgressFill';
      pbFill.style.cssText = 'height:100%; background:linear-gradient(90deg, #22C55E 0%, #10B981 55%, #059669 100%); width:0%; transition:width 0.35s ease-out; box-shadow:0 0 14px rgba(16,185,129,0.45); border-radius:999px;';
      pbWrap.appendChild(pbFill);
      headerEl.style.position = 'relative';
      headerEl.style.paddingBottom = '30px';
      headerEl.appendChild(pbWrap);
    }

    let textEl = document.getElementById('kcProgressText');
    if (!textEl) {
      textEl = document.createElement('div');
      textEl.id = 'kcProgressText';
      textEl.style.cssText = 'font-size:12px; color:#ECFDF5; font-weight:600; font-family:-apple-system, system-ui, sans-serif; margin-top:6px; opacity:0.98;';
      const spanTitle = headerEl.querySelector('span');
      if (spanTitle) spanTitle.appendChild(textEl);
    }

    if (!kcQuizPlan || !kcFlatQuestions.length || !kcCurrentQuestion) {
      if (textEl) textEl.textContent = '';
      return;
    }

    const points = Array.isArray(kcQuizPlan.knowledge_points) ? kcQuizPlan.knowledge_points : [];
    const totalPoints = points.length;
    let completedPoints = 0;
    const currentPointIndex = kcCurrentQuestion.pointIndex + 1;

    points.forEach((pt, idx) => {
      const pointId = pt.id || `kp_${idx + 1}`;
      const state = kcPointStates[pointId];
      if (state && state.passed) completedPoints++;
    });

    const percent = totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;
    const pbFill = document.getElementById('kcProgressFill');
    if (pbFill) pbFill.style.width = `${percent}%`;

    const state = kcPointStates[kcCurrentPointId] || { correctStreak: 0, required: 1 };
    textEl.innerHTML = `✅ <b>${percent}%</b> completed <span style="opacity:0.8; margin:0 6px;">•</span> Topic <b>${currentPointIndex}</b> / ${totalPoints} <span style="opacity:0.8; margin:0 6px;">•</span> Current streak <b>${state.correctStreak}/${state.required}</b>`;

    const oldProgress = document.getElementById('kcProgress');
    if (oldProgress) oldProgress.remove();
    saveQuizProgress();
  }

  function renderCurrentQuestion() {
    ensureQuizChrome();
    const optionsEl = document.getElementById('kcOptions');
    const visualEl = document.getElementById('kcQuestionVisual');
    const askWrap = document.getElementById('kcAskWrap');
    const askReply = document.getElementById('kcAskReply');
    const askLoading = document.getElementById('kcAskLoading');
    const askInput = document.getElementById('kcAskInput');
    const nextBtn = document.getElementById('kcNextBtn');

    answerBox.style.display = 'none';
    revealBtn.style.display = 'none';
    feedbackEl.style.display = 'none';
    feedbackEl.innerHTML = '';
    inputEl.value = '';
    inputEl.placeholder = 'Your answer...';
    inputEl.style.display = 'block';
    submitBtn.style.display = 'inline-block';
    submitBtn.textContent = 'Submit';
    if(nextBtn) nextBtn.style.display = 'none';
    if(askWrap) askWrap.style.display = 'none';
    if(askReply) { askReply.style.display = 'none'; askReply.innerHTML = ''; }
    if(askLoading) askLoading.style.display = 'none';
    if(askInput) askInput.value = '';

    if (!kcCurrentQuestion) {
      questionEl.innerHTML = renderQuizInlineText(kcQuestion);
      answerEl.innerHTML = renderQuizInlineText(kcAnswer);
      hintEl.innerHTML = kcHint ? `💡 Hint: ${renderQuizInlineText(kcHint)}` : '';
      revealBtn.style.display = 'inline-block';
      if (visualEl) {
        visualEl.style.display = 'none';
        visualEl.innerHTML = '';
      }
      optionsEl.style.display = 'none';
      renderProgress();
      typesetQuizNodes([questionEl, answerEl, hintEl, visualEl]);
      return;
    }

    const q = kcCurrentQuestion.question || {};
    questionEl.innerHTML = `<div style="font-size:12px;font-weight:700;color:#2563EB;margin-bottom:8px;letter-spacing:0.04em;">${escapeHtml(kcCurrentPointLabel.toUpperCase())}</div><div>${renderQuizInlineText(q.stem || q.question || '(No question)')}</div>`;
    answerEl.innerHTML = q.type === 'multiple_choice'
      ? `<div><strong>Right answer:</strong> ${renderQuizInlineText(q.correct_option || '')}</div><div style="margin-top:8px;"><strong>Why:</strong> ${renderQuizInlineText((q.explanation || '').trim())}</div>`
      : renderQuizInlineText(q.ideal_answer || q.answer || q.explanation || '');
    hintEl.innerHTML = q.hint ? `💡 Hint: ${renderQuizInlineText(q.hint)}` : '';
    if (visualEl) {
      const visualHtml = getQuizVisualHtml(q);
      visualEl.innerHTML = visualHtml;
      visualEl.style.display = visualHtml ? 'block' : 'none';
    }

    if (q.type === 'multiple_choice' && Array.isArray(q.options) && q.options.length) {
      optionsEl.innerHTML = q.options.map((opt, idx) => `
        <button class="kc-option-btn" data-option-index="${idx}" data-option-value="${escapeAttr(opt)}" style="text-align:left;background:#fff;border:1px solid #CBD5E1;border-radius:10px;padding:10px 12px;font-size:14px;color:#1E293B;cursor:pointer;transition:all 0.15s;">${renderQuizInlineText(opt)}</button>
      `).join('');
      optionsEl.style.display = 'flex';
      inputEl.style.display = 'none';
      optionsEl.querySelectorAll('.kc-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          optionsEl.querySelectorAll('.kc-option-btn').forEach(x => x.style.borderColor = '#CBD5E1');
          btn.style.borderColor = '#2563EB';
          inputEl.value = btn.dataset.optionValue || btn.textContent.trim();
        });
      });
    } else {
      optionsEl.style.display = 'none';
      inputEl.style.display = 'block';
      inputEl.placeholder = q.type === 'short_answer'
        ? 'Explain your reasoning...'
        : 'Your answer...';
    }

    renderProgress();
    typesetQuizNodes([questionEl, answerEl, hintEl, optionsEl, visualEl]);
  }

  function advanceToNextPoint() {
    if (!kcFlatQuestions.length) return;
    const currentPoint = kcCurrentPointId;
    let nextIndex = kcCurrentIndex + 1;
    while (nextIndex < kcFlatQuestions.length && kcFlatQuestions[nextIndex].pointId === currentPoint) {
      nextIndex += 1;
    }
    if (nextIndex >= kcFlatQuestions.length) {
      questionEl.innerHTML = '<strong>🎯 Mastery complete.</strong> You cleared all current knowledge points in this section.';
      document.getElementById('kcOptions').style.display = 'none';
      inputEl.style.display = 'none';
      submitBtn.style.display = 'none';
      revealBtn.style.display = 'none';
      answerBox.style.display = 'none';
      feedbackEl.style.display = 'block';
      feedbackEl.innerHTML = '<div style="padding:12px;background:#ECFDF5;border:1px solid #A7F3D0;border-radius:10px;">Nice. The quiz engine thinks you have passed the current section\'s major knowledge points. You can still use Haiku below to ask about any item.</div>';
      if(document.getElementById('kcAskWrap')) document.getElementById('kcAskWrap').style.display = 'flex';
      // Issue 8 fix: don't leave the "Next Knowledge Point" button as a no-op.
      // Mark completion + repurpose the button to "Next Topic" so the user can
      // advance to the next sub-sub-chapter without leaving the modal manually.
      try { window.__ftutorMarkCompleted && window.__ftutorMarkCompleted(kcSectionId, kcSectionTitle); } catch(_) {}
      const _nextBtn = document.getElementById('kcNextBtn');
      if (_nextBtn) {
        const nextSub = (typeof window.__ftutorPeekNextSubsection === 'function')
          ? window.__ftutorPeekNextSubsection(kcSectionId, kcSectionTitle)
          : null;
        _nextBtn.dataset.kcEndState = nextSub ? 'continue' : 'finish';
        _nextBtn.style.display = 'inline-block';
        if (nextSub) {
          _nextBtn.textContent = 'Next Topic →';
          _nextBtn.title = `Continue to: ${nextSub.title}`;
        } else {
          _nextBtn.textContent = 'Back to Syllabus';
          _nextBtn.title = 'You finished this lesson — return to the syllabus.';
        }
      }
      renderProgress();
      clearQuizProgress();
      return;
    }
    kcCurrentIndex = nextIndex;
    kcCurrentQuestion = kcFlatQuestions[kcCurrentIndex];
    kcCurrentPointId = kcCurrentQuestion.pointId;
    kcCurrentPointLabel = kcCurrentQuestion.pointLabel;
    kcHistory = [];
    renderCurrentQuestion();
  }

  function moveWithinPointOnWrong() {
    const samePointIndexes = kcFlatQuestions
      .map((item, idx) => ({ item, idx }))
      .filter(({ item }) => item.pointId === kcCurrentPointId)
      .map(({ idx }) => idx);
    const currentPos = samePointIndexes.indexOf(kcCurrentIndex);

    if (currentPos >= 0 && currentPos < samePointIndexes.length - 1) {
      // We have another prepared question for this knowledge point
      kcCurrentIndex = samePointIndexes[currentPos + 1];
      kcCurrentQuestion = kcFlatQuestions[kcCurrentIndex];
      renderCurrentQuestion();
    } else {
      // Out of questions! Generate a new one on the fly.
      generateFollowupQuestion(kcCurrentQuestion.pointLabel, kcCurrentQuestion.question);
    }
  }

  function parseGeneratedFollowupQuestion(rawText, pointLabel) {
    const raw = String(rawText || '').trim();
    if (!raw) return null;

    const candidates = [];

    const fencedBlocks = [...raw.matchAll(/```(?:json)?\s*([\s\S]*?)```/gi)].map(m => m[1]?.trim()).filter(Boolean);
    candidates.push(...fencedBlocks);

    const firstIdx = raw.indexOf('{');
    const lastIdx = raw.lastIndexOf('}');
    if (firstIdx !== -1 && lastIdx !== -1 && lastIdx > firstIdx) {
      candidates.push(raw.substring(firstIdx, lastIdx + 1).trim());
    }

    candidates.push(raw);

    function tryNormalize(obj) {
      if (!obj || typeof obj !== 'object') return null;
      const stem = obj.stem || obj.question || obj.prompt || obj.title;
      const options = Array.isArray(obj.options)
        ? obj.options
        : Array.isArray(obj.choices)
          ? obj.choices
          : Array.isArray(obj.answers)
            ? obj.answers
            : null;
      let correctOption = obj.correct_option || obj.correctOption || obj.correct_answer || obj.correctAnswer || obj.answer;
      const explanation = obj.explanation || obj.reason || obj.rationale || obj.why || '';

      if (!stem || !options || options.length < 2) return null;

      const normalizedOptions = options.map(opt => String(opt || '').trim()).filter(Boolean);
      if (normalizedOptions.length < 2) return null;

      if (typeof correctOption === 'number' && normalizedOptions[correctOption]) {
        correctOption = String.fromCharCode(65 + correctOption);
      }
      correctOption = String(correctOption || '').trim();

      if (!/^[A-D]$/i.test(correctOption)) {
        const matchedIndex = normalizedOptions.findIndex(opt => opt === correctOption || opt.replace(/^[A-D][\).:\-]\s*/, '') === correctOption);
        if (matchedIndex >= 0) correctOption = String.fromCharCode(65 + matchedIndex);
      }
      if (!/^[A-D]$/i.test(correctOption)) correctOption = 'A';

      const labeledOptions = normalizedOptions.map((opt, idx) => {
        const letter = String.fromCharCode(65 + idx);
        return /^[A-D][\).:\-]\s*/i.test(opt) ? opt : `${letter}. ${opt}`;
      });

      return {
        type: 'multiple_choice',
        stem: String(stem).trim(),
        options: labeledOptions.slice(0, 4),
        correct_option: correctOption.toUpperCase(),
        explanation: String(explanation || `This follow-up question targets ${pointLabel}.`).trim()
      };
    }

    for (const candidate of candidates) {
      if (!candidate) continue;
      try {
        const parsed = JSON.parse(candidate);
        const normalized = tryNormalize(parsed);
        if (normalized) return normalized;
      } catch (_) {}
    }

    return null;
  }

  async function generateFollowupQuestion(pointLabel, previousQuestion) {
    const loadingEl = document.getElementById('kcLoading');
    const feedbackEl = document.getElementById('kcFeedback');
    const submitBtn = document.getElementById('kcSubmitBtn');
    const nextBtn = document.getElementById('kcNextBtn');
    const questionEl = document.getElementById('kcQuestion');
    const optionsEl = document.getElementById('kcOptions');
    const answerBox = document.getElementById('kcAnswerBox');
    const inputEl = document.getElementById('kcAnswerInput');

    if (questionEl) questionEl.style.display = 'none';
    if (optionsEl) optionsEl.style.display = 'none';
    if (answerBox) answerBox.style.display = 'none';
    if (inputEl) inputEl.style.display = 'none';
    if (submitBtn) submitBtn.style.display = 'none';

    if (nextBtn) {
      nextBtn.disabled = true;
      nextBtn.textContent = 'Generating...';
    }

    feedbackEl.style.display = 'block';
    feedbackEl.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:300px; text-align:center;">
        <div style="width:40px; height:40px; border:4px solid #E2E8F0; border-top-color:#3B82F6; border-radius:50%; animation:kcSpin 1s linear infinite; margin-bottom:20px;"></div>
        <style>@keyframes kcSpin { 0% {transform: rotate(0deg);} 100% {transform: rotate(360deg);} }</style>
        <div style="font-size:16px; font-weight:700; color:#1E293B; margin-bottom:8px;">Haiku is crafting a new question</div>
        <div style="font-size:13px; color:#64748B; max-width:80%;">Because you ran out of pre-made variants for <b>"${escapeHtml(pointLabel)}"</b>, we are generating a targeted one on the fly... (about 5-8s)</div>
      </div>
    `;

    try {
      const parentQ = previousQuestion.stem || previousQuestion.question;
      const promptBase = `I just failed the concept "${pointLabel}" from the question: "${parentQ}". Generate ONE targeted multiple choice challenge question directly covering this concept.`;
      const strictJsonInstruction = `Return ONLY valid JSON. No markdown, no code fences, no commentary. Use exactly this schema: {"type":"multiple_choice","stem":"...","options":["A. ...","B. ...","C. ...","D. ..."],"correct_option":"A","explanation":"..."}`;
      let res = await callAsk(
        `${promptBase} ${strictJsonInstruction}`,
        null,
        {
           mode: 'followup',
           history: [],
           sectionId: kcSectionId,
           sectionTitle: kcSectionTitle,
           language: 'en',
           useWebSearch: false
        }
      );

      let rawText = res.explanation || res.answer || '';
      let newQ = parseGeneratedFollowupQuestion(rawText, pointLabel);

      if (!newQ) {
        res = await callAsk(
          `${promptBase} Reply again and output STRICT JSON only. Do not include any sentence before or after the JSON object.` ,
          null,
          {
             mode: 'followup',
             history: [],
             sectionId: kcSectionId,
             sectionTitle: kcSectionTitle,
             language: 'en',
             useWebSearch: false
          }
        );
        rawText = res.explanation || res.answer || '';
        newQ = parseGeneratedFollowupQuestion(rawText, pointLabel);
      }

      if (!newQ || newQ.type !== 'multiple_choice') {
        throw new Error("Haiku returned content, but it was not valid quiz JSON.");
      }

      kcFlatQuestions.splice(kcCurrentIndex + 1, 0, {
        pointId: kcCurrentPointId,
        pointLabel: kcCurrentPointLabel,
        pointIndex: kcCurrentQuestion.pointIndex,
        questionIndex: kcCurrentQuestion.questionIndex + 1,
        streakRequired: kcCurrentQuestion.streakRequired,
        point: kcCurrentQuestion.point,
        question: newQ
      });

      kcCurrentIndex++;
      kcCurrentQuestion = kcFlatQuestions[kcCurrentIndex];

      if (questionEl) questionEl.style.display = 'block';
      if (nextBtn) {
        nextBtn.disabled = false;
      }
      renderCurrentQuestion();

    } catch (e) {
      feedbackEl.innerHTML = `
        <div style="padding:16px; background:#FEF2F2; border:1px solid #FECACA; border-radius:10px; text-align:center;">
          <div style="font-weight:700; color:#B91C1C; margin-bottom:6px;">Failed to generate new question</div>
          <div style="font-size:13px; color:#991B1B;">${e.message}</div>
          <div style="margin-top:12px; font-size:13px;">You can click the <b>Next Variant</b> button below to retry.</div>
        </div>
      `;
      if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.textContent = 'Retry Generation';
      }
    }
  }

  function evaluateLocally(userAnswer) {
    const q = kcCurrentQuestion?.question || {};
    if (!q.type) return { correct: false, explanation: '', answerHtml: '' };
    if (q.type === 'multiple_choice') {
      const raw = String(userAnswer || '').trim();
      const selectedLetter = (raw.match(/^([A-D])/i) || [null, ''])[1].toUpperCase();
      const correct = selectedLetter && selectedLetter === String(q.correct_option || '').trim().toUpperCase();
      const wrongMap = q.wrong_option_explanations || {};
      const optionExplanation = correct ? '' : (wrongMap[selectedLetter] || 'This option sounds tempting, but it reveals a misunderstanding of the concept.');
      
      return {
        correct,
        answerHtml: `
          <div style="margin-top:16px; padding:20px; background:${correct ? '#f0fdf4' : '#fff1f2'}; border:2px dashed ${correct ? '#6ee7b7' : '#fca5a5'}; border-radius:18px; font-family:'Nunito', sans-serif;">
            <div style="font-family:'Quicksand', sans-serif; font-weight:800; color:${correct ? '#059669' : '#e11d48'}; margin-bottom:8px; font-size:16px; display:flex; align-items:center; gap:8px;">
             <span>${correct ? '🎉 Brilliant!' : "💡 Let's Review"}</span>
            </div>
            <p style="font-weight:700; color:#1e293b; margin-bottom:10px; font-size:15px; margin-top:0;">${correct ? 'You nailed the logic!' : 'Not quite. Here is the missing piece:'}</p>
            <div style="margin-bottom:8px; color:#1e293b;"><strong>Right answer:</strong> ${renderQuizInlineText(q.correct_option || '')}</div>
            <div style="margin-bottom:8px; color:#475569;"><strong>Why:</strong> ${renderQuizInlineText(q.explanation || '')}</div>
            ${!correct ? `<div style="color:#e11d48;"><strong>Why your choice is wrong:</strong> ${renderQuizInlineText(optionExplanation)}</div>` : ''}
          </div>
        `
      };
    }
    const rubric = Array.isArray(q.grading_rubric) ? q.grading_rubric : [];
    const normalized = String(userAnswer || '').toLowerCase();
    const hits = rubric.filter(line => {
      const keywords = String(line).toLowerCase().replace(/must\s+|should\s+/g, '').split(/[^a-z0-9]+/).filter(Boolean);
      return keywords.some(k => k.length > 3 && normalized.includes(k));
    }).length;
    const threshold = rubric.length ? Math.max(1, Math.ceil(rubric.length * 0.5)) : 1;
    const correct = hits >= threshold;
    return {
      correct,
      answerHtml: `
        <div style="margin-top:16px; padding:20px; background:${correct ? '#f0fdf4' : '#fff1f2'}; border:2px dashed ${correct ? '#6ee7b7' : '#fca5a5'}; border-radius:18px; font-family:'Nunito', sans-serif;">
          <div style="font-family:'Quicksand', sans-serif; font-weight:800; color:${correct ? '#059669' : '#e11d48'}; margin-bottom:8px; font-size:16px;">
            ${correct ? '🎉 Good enough to pass this step' : '💡 Your explanation is still missing key logic'}
          </div>
          <div style="margin-bottom:8px; color:#1e293b;"><strong>Ideal answer:</strong> ${renderQuizInlineText(q.ideal_answer || q.answer || '')}</div>
          <div style="margin-bottom:8px; color:#475569;"><strong>Why:</strong> ${renderQuizInlineText(q.explanation || '')}</div>
          ${rubric.length ? `<div style="color:#475569;"><strong>What the grader looks for:</strong><ul style="margin:6px 0 0 18px;">${rubric.map(item => `<li>${renderQuizInlineText(item)}</li>`).join('')}</ul></div>` : ''}
        </div>
      `
    };
  }

  async function askHaikuAboutCurrent(questionText) {
    const askReply = document.getElementById('kcAskReply');
    const askLoading = document.getElementById('kcAskLoading');
    askReply.style.display = 'none';
    askLoading.style.display = 'block';
    try {
      const q = kcCurrentQuestion?.question || {};
      const res = await callAsk(questionText, null, {
        mode: 'followup',
        history: [
          {
            role: 'assistant',
            content: [
              `Current challenge: ${q.stem || kcQuestion}`,
              q.type === 'multiple_choice' && Array.isArray(q.options) ? `Options: ${q.options.join(' | ')}` : '',
              `Correct answer: ${q.correct_option || q.ideal_answer || kcAnswer}`,
              `Explanation: ${q.explanation || kcAnswer}`,
              q.hint ? `Hint: ${q.hint}` : ''
            ].filter(Boolean).join('\n')
          }
        ],
        sectionId: kcSectionId,
        sectionTitle: kcSectionTitle,
        language: 'en',
        useWebSearch: false
      });
      const reply = res.explanation || res.answer || 'No response.';
      askReply.innerHTML = markdownToHtml(reply);
      askReply.style.display = 'block';
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([askReply]).catch(() => {});
      }
    } catch (err) {
      askReply.innerHTML = '<span style="color:#EF4444">Error: ' + (err.message || err) + '</span>';
      askReply.style.display = 'block';
    } finally {
      askLoading.style.display = 'none';
    }
  }

  function openLegacy(question, answer, hint, sectionId, sectionTitle) {
    const saved = loadQuizProgress(sectionId);
    if (saved && applyQuizProgressSnapshot(saved)) {
      modal.style.display = 'flex';
      renderCurrentQuestion();
      return;
    }
    resetQuizState({ preserveStoredProgress: true });
    kcQuestion = question;
    kcAnswer = answer;
    kcHint = hint || '';
    kcSectionId = sectionId;
    kcSectionTitle = sectionTitle;
    modal.style.display = 'flex';
    renderCurrentQuestion();
  }

  function openQuizPlan(plan, sectionId, sectionTitle) {
    const saved = loadQuizProgress(sectionId);
    if (saved && applyQuizProgressSnapshot(saved)) {
      modal.style.display = 'flex';
      renderCurrentQuestion();
      return;
    }
    resetQuizState({ preserveStoredProgress: true });
    kcSectionId = sectionId;
    kcSectionTitle = sectionTitle;
    kcQuizPlan = plan;
    kcFlatQuestions = flattenQuizPlan(plan);
    if (!kcFlatQuestions.length) {
      openLegacy('(No question found)', '', '', sectionId, sectionTitle);
      return;
    }
    kcCurrentIndex = 0;
    kcCurrentQuestion = kcFlatQuestions[0];
    kcCurrentPointId = kcCurrentQuestion.pointId;
    kcCurrentPointLabel = kcCurrentQuestion.pointLabel;
    modal.style.display = 'flex';
    renderCurrentQuestion();
  }

  window.openKCModal = function(question, answer, hint, sectionId, sectionTitle) {
    openLegacy(question, answer, hint, sectionId, sectionTitle);
  };

  window.openQuizPlanModal = function(plan, sectionId, sectionTitle) {
    openQuizPlan(plan, sectionId, sectionTitle);
  };

  const stAskBtn = document.getElementById('kcAskBtn');
  const stNextBtn = document.getElementById('kcNextBtn');
  if (stAskBtn) {
    stAskBtn.addEventListener('click', () => {
      const askInput = document.getElementById('kcAskInput');
      if (askInput.value.trim()) askHaikuAboutCurrent(askInput.value.trim());
    });
  }
  if (stNextBtn) {
    stNextBtn.addEventListener('click', () => {
      // Issue 8: after mastery-complete, the same button advances to the next
      // sub-sub-chapter (or returns to the syllabus when none is left).
      if (stNextBtn.dataset.kcEndState) {
        try { saveQuizProgress(); } catch(_) {}
        modal.style.display = 'none';
        // Reset button so the next quiz opens with the default look.
        delete stNextBtn.dataset.kcEndState;
        stNextBtn.textContent = 'Next Knowledge Point';
        stNextBtn.style.display = 'none';
        const advance = window.__ftutorAdvanceSubsection;
        if (typeof advance === 'function') advance(kcSectionId, kcSectionTitle);
        return;
      }
      const state = kcPointStates[kcCurrentPointId] || { passed: false };
      if (state.passed) {
        advanceToNextPoint();
      } else {
        moveWithinPointOnWrong();
      }
    });
  }

  // Already moved let isMaximized = false; etc to root closure...
  const maxBtn = document.getElementById('kcModalMaxBtn');
  const minBtn = document.getElementById('kcModalMinBtn');
  const wrapper = document.getElementById('kcModalWrapper');
  const resizer = document.getElementById('kcResizer');
  const leftCol = document.getElementById('kcLeftCol');
  const rightCol = document.getElementById('kcRightCol');

  if (resizer && leftCol && rightCol && wrapper) {
    let isResizing = false;
    resizer.addEventListener('mousedown', (e) => {
      isResizing = true;
      resizer.style.background = '#94A3B8';
      document.body.style.cursor = 'col-resize';
      leftCol.style.pointerEvents = 'none';
      rightCol.style.pointerEvents = 'none';
      e.preventDefault();
    });
    window.addEventListener('mousemove', (e) => {
      if (!isResizing) return;
      const containerRect = wrapper.getBoundingClientRect();
      let newWidth = e.clientX - containerRect.left;

      // Keep it within bounds (20% to 80%)
      if (newWidth < containerRect.width * 0.2) newWidth = containerRect.width * 0.2;
      if (newWidth > containerRect.width * 0.8) newWidth = containerRect.width * 0.8;

      leftCol.style.flex = 'none';
      leftCol.style.width = `${newWidth}px`;
      rightCol.style.flex = '1';
      rightCol.style.width = 'auto';
    });
    window.addEventListener('mouseup', () => {
      if (isResizing) {
        isResizing = false;
        resizer.style.background = '#E2E8F0';
        document.body.style.cursor = 'default';
        leftCol.style.pointerEvents = 'auto';
        rightCol.style.pointerEvents = 'auto';
      }
    });

    // Hover effect
    resizer.addEventListener('mouseenter', () => { if (!isResizing) resizer.style.background = '#CBD5E1'; });
    resizer.addEventListener('mouseleave', () => { if (!isResizing) resizer.style.background = '#E2E8F0'; });
  }

  closeBtn.addEventListener('click', () => {
    saveQuizProgress();
    modal.style.display = 'none';
  });

  if (maxBtn) {
    maxBtn.addEventListener('click', () => {
      isMaximized = !isMaximized;
      if (isMaximized) {
        modal.style.top = '0px';
        modal.style.left = '0px';
        modal.style.transform = 'none';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.maxWidth = '100vw';
        modal.style.maxHeight = '100vh';
        modal.style.borderRadius = '0px';
        header.style.borderRadius = '0px';
        maxBtn.textContent = '❐';
      } else {
        modal.style.top = '80px';
        modal.style.left = '50%';
        modal.style.transform = 'translateX(-50%)';
        modal.style.width = '800px';
        modal.style.height = 'auto';
        modal.style.maxWidth = '96vw';
        modal.style.maxHeight = '85vh';
        modal.style.borderRadius = '16px';
        header.style.borderRadius = '16px 16px 0 0';
        maxBtn.textContent = '□';
      }
    });
  }

  if (minBtn) {
    minBtn.addEventListener('click', () => {
      isMinimized = !isMinimized;
      if (isMinimized) {
        wrapper.style.display = 'none';
        modal.style.width = '300px';
        modal.style.height = 'auto';
        modal.style.minHeight = '0';
        modal.style.maxHeight = 'none';
        modal.style.overflow = 'hidden';
        modal.style.left = 'auto';
        modal.style.right = '20px';
        modal.style.top = 'auto';
        modal.style.bottom = '20px';
        modal.style.transform = 'none';
        modal.style.paddingBottom = '0';
        minBtn.textContent = '▲';
      } else {
        wrapper.style.display = 'flex';
        modal.style.width = isMaximized ? '100vw' : '800px';
        modal.style.height = isMaximized ? '100vh' : 'auto';
        modal.style.minHeight = '480px';
        modal.style.maxHeight = isMaximized ? '100vh' : '85vh';
        modal.style.overflow = 'hidden';
        modal.style.right = 'auto';
        modal.style.bottom = 'auto';
        // restore max/pos state
        if (isMaximized) {
          modal.style.top = '0px';
          modal.style.left = '0px';
        } else {
          modal.style.top = '80px';
          modal.style.left = '50%';
          modal.style.transform = 'translateX(-50%)';
        }
        minBtn.textContent = '_';
      }
    });
  }

  revealBtn.addEventListener('click', () => {
    answerBox.style.display = 'block';
    revealBtn.style.display = 'none';
    if(document.getElementById('kcAskWrap')) document.getElementById('kcAskWrap').style.display = 'flex';
  });

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
    const dragHeight = isMinimized ? header.offsetHeight : modal.offsetHeight;
    ny = Math.max(0, Math.min(window.innerHeight - dragHeight, ny));
    modal.style.left = nx + 'px';
    modal.style.top = ny + 'px';
    modal.style.bottom = 'auto';
    modal.style.right = 'auto';
    modal.style.transform = 'none';
  });
  document.addEventListener('mouseup', () => { dragging = false; header.style.cursor = 'grab'; });

  async function submitAnswer() {
    const userAnswer = inputEl.value.trim();
    if (!userAnswer) return;
    submitBtn.disabled = true;
    loadingEl.style.display = 'block';
    feedbackEl.style.display = 'none';

    if (!kcCurrentQuestion) {
      inputEl.value = '';
      kcHistory.push({ role: 'user', content: userAnswer });
      try {
        const res = await callAsk(userAnswer, null, {
          mode: 'followup',
          history: [
            { role: 'assistant', content: 'Challenge question: ' + kcQuestion + '\n\nCorrect answer: ' + kcAnswer },
            ...kcHistory.slice(0, -1)
          ],
          sectionId: kcSectionId,
          sectionTitle: kcSectionTitle,
          language: 'en'
        });
        const reply = res.explanation || res.answer || 'No response.';
        kcHistory.push({ role: 'assistant', content: reply });
        feedbackEl.innerHTML = markdownToHtml(reply);
        feedbackEl.style.display = 'block';
        if(document.getElementById('kcAskWrap')) document.getElementById('kcAskWrap').style.display = 'flex';
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
      return;
    }

    const result = evaluateLocally(userAnswer);
    const state = kcPointStates[kcCurrentPointId] || { correctStreak: 0, attempts: 0, required: 1 };
    state.attempts += 1;
    if (result.correct) {
      state.correctStreak += 1;
      if (state.correctStreak >= state.required) state.passed = true;
    } else {
      state.correctStreak = 0;
    }
    kcPointStates[kcCurrentPointId] = state;

    inputEl.value = '';
    feedbackEl.innerHTML = result.answerHtml;
    feedbackEl.style.display = 'block';
    answerBox.style.display = 'block';
    typesetQuizNodes([feedbackEl]);
    if(document.getElementById('kcAskWrap')) document.getElementById('kcAskWrap').style.display = 'flex';
    const nextBtn = document.getElementById('kcNextBtn');
    if (result.correct && state.passed) {
      nextBtn.textContent = 'Next Knowledge Point ➔';
      nextBtn.style.background = '#10B981';
      nextBtn.style.display = 'inline-block';
    } else if (!result.correct) {
      nextBtn.textContent = `Next Variant - Needs ${state.required} streak`;
      nextBtn.style.background = '#F59E0B'; // Orange warning
      nextBtn.style.display = 'inline-block';
    } else {
      nextBtn.textContent = `Next (Streak ${state.correctStreak}/${state.required})`;
      nextBtn.style.background = '#3B82F6'; // Blue progress
      nextBtn.style.display = 'inline-block';
    }

    renderProgress();
    loadingEl.style.display = 'none';
    submitBtn.disabled = false;
  }

  submitBtn.addEventListener('click', submitAnswer);
  inputEl.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); submitAnswer(); }
  });

  document.addEventListener('click', e => {
    if (e.target && e.target.id === 'kcAskBtn') {
      const askInput = document.getElementById('kcAskInput');
      const val = askInput.value.trim();
      if (!val) return;
      askHaikuAboutCurrent(val);
    }
  });
})();

// ── View switcher ───────────────────────────────────────────────────────────
function showWelcome() {
  destroyLoginScene();
  if (appShell) appShell.classList.remove('hidden');
  welcomeScreen.classList.remove('hidden');
  answerScreen.classList.add('hidden');
  learnView.classList.add('hidden');
  if (settingsView) settingsView.classList.add('hidden');
  if (preferenceView) preferenceView.classList.add('hidden');
  if (feedbackView) feedbackView.classList.add('hidden');
  if (homeworkView) homeworkView.classList.add('hidden');
  if (courseTrackerView) courseTrackerView.classList.add('hidden');
  if (mistakeNotebookView) mistakeNotebookView.classList.add('hidden');
  if (loginView) loginView.classList.add('hidden');
  if (topbar) topbar.classList.add('hidden');
  setWorkspaceAccountBarVisible(true);
  clearAttachmentSourcePanel();
  clearToc();
  toggleSyllabusPanel(false);
  toggleRecentPanel(false);
  updateSidebarNavActive('home');
}

function showAnswer(question) {
  destroyLoginScene();
  if (appShell) appShell.classList.remove('hidden');
  welcomeScreen.classList.add('hidden');
  answerScreen.classList.remove('hidden');
  learnView.classList.add('hidden');
  if (settingsView) settingsView.classList.add('hidden');
  if (preferenceView) preferenceView.classList.add('hidden');
  if (feedbackView) feedbackView.classList.add('hidden');
  if (homeworkView) homeworkView.classList.add('hidden');
  if (courseTrackerView) courseTrackerView.classList.add('hidden');
  if (mistakeNotebookView) mistakeNotebookView.classList.add('hidden');
  if (loginView) loginView.classList.add('hidden');
  if (topbar) topbar.classList.remove('hidden');
  setWorkspaceAccountBarVisible(false);
  if (topbarBreadcrumb) topbarBreadcrumb.textContent = question;
  updateSidebarNavActive(null);
}

function showLearnView() {
  destroyLoginScene();
  if (appShell) appShell.classList.remove('hidden');
  welcomeScreen.classList.add('hidden');
  answerScreen.classList.add('hidden');
  learnView.classList.remove('hidden');
  if (settingsView) settingsView.classList.add('hidden');
  if (preferenceView) preferenceView.classList.add('hidden');
  if (feedbackView) feedbackView.classList.add('hidden');
  if (homeworkView) homeworkView.classList.add('hidden');
  if (courseTrackerView) courseTrackerView.classList.add('hidden');
  if (mistakeNotebookView) mistakeNotebookView.classList.add('hidden');
  if (loginView) loginView.classList.add('hidden');
  _setLearnMode(_learnViewMode || 'lecture');
  if (topbar) topbar.classList.add('hidden');
  setWorkspaceAccountBarVisible(false);
  updateSidebarNavActive(null);
}

function showSettingsView() {
  destroyLoginScene();
  if (appShell) appShell.classList.remove('hidden');
  welcomeScreen.classList.add('hidden');
  answerScreen.classList.add('hidden');
  learnView.classList.add('hidden');
  if (settingsView) settingsView.classList.remove('hidden');
  if (preferenceView) preferenceView.classList.add('hidden');
  if (feedbackView) feedbackView.classList.add('hidden');
  if (homeworkView) homeworkView.classList.add('hidden');
  if (courseTrackerView) courseTrackerView.classList.add('hidden');
  if (mistakeNotebookView) mistakeNotebookView.classList.add('hidden');
  if (loginView) loginView.classList.add('hidden');
  if (topbar) topbar.classList.add('hidden');
  setWorkspaceAccountBarVisible(false);
  renderUserBadge();
  clearToc();
  updateSidebarNavActive('settings');
}

function showPreferenceView() {
  destroyLoginScene();
  if (appShell) appShell.classList.remove('hidden');
  welcomeScreen.classList.add('hidden');
  answerScreen.classList.add('hidden');
  learnView.classList.add('hidden');
  if (settingsView) settingsView.classList.add('hidden');
  if (preferenceView) preferenceView.classList.remove('hidden');
  if (feedbackView) feedbackView.classList.add('hidden');
  if (homeworkView) homeworkView.classList.add('hidden');
  if (courseTrackerView) courseTrackerView.classList.add('hidden');
  if (mistakeNotebookView) mistakeNotebookView.classList.add('hidden');
  if (loginView) loginView.classList.add('hidden');
  if (topbar) topbar.classList.add('hidden');
  setWorkspaceAccountBarVisible(false);
  updateSidebarNavActive('preference');
  syncPreferenceEditorFromMemory();
}

function showFeedbackView() {
  destroyLoginScene();
  if (appShell) appShell.classList.remove('hidden');
  welcomeScreen.classList.add('hidden');
  answerScreen.classList.add('hidden');
  learnView.classList.add('hidden');
  if (settingsView) settingsView.classList.add('hidden');
  if (preferenceView) preferenceView.classList.add('hidden');
  if (feedbackView) feedbackView.classList.remove('hidden');
  if (homeworkView) homeworkView.classList.add('hidden');
  if (courseTrackerView) courseTrackerView.classList.add('hidden');
  if (mistakeNotebookView) mistakeNotebookView.classList.add('hidden');
  if (loginView) loginView.classList.add('hidden');
  if (topbar) topbar.classList.add('hidden');
  setWorkspaceAccountBarVisible(false);
  clearToc();
  updateSidebarNavActive('feedback');
  loadFeedbackBoard();
}

function feedbackAuthorName() {
  const typed = (feedbackNameInput?.value || '').trim();
  if (typed) return typed;
  if (currentUser && currentUser.name) return currentUser.name;
  return 'Anonymous';
}

function formatFeedbackTime(value) {
  const date = new Date(value || Date.now());
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function setFeedbackStatus(message, kind = 'idle') {
  if (!feedbackStatus) return;
  feedbackStatus.textContent = message || '';
  feedbackStatus.dataset.kind = kind;
}

function feedbackReplyTargetForItem(item) {
  return {
    type: 'thread',
    id: item.id || '',
    author: item.author || 'Anonymous',
    body: item.body || item.title || ''
  };
}

function feedbackReplyTargetForReply(reply) {
  return {
    type: 'reply',
    id: reply.id || '',
    author: reply.author || 'Anonymous',
    body: reply.body || ''
  };
}

function feedbackTargetSnippet(text = '') {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  return clean.length > 54 ? `${clean.slice(0, 54)}...` : clean;
}

function setFeedbackReplyTarget(thread, target) {
  if (!thread || !target) return;
  const id = thread.dataset.feedbackId;
  if (!id) return;
  feedbackReplyTargets.set(id, target);
  thread.querySelectorAll('.feedback-click-reply.is-target').forEach(node => node.classList.remove('is-target'));
  const targetNode = thread.querySelector(`[data-feedback-reply-anchor="${CSS.escape(target.id || 'thread')}"]`);
  if (targetNode) targetNode.classList.add('is-target');
  const chip = thread.querySelector('.feedback-reply-target');
  const chipName = thread.querySelector('.feedback-reply-target-name');
  const chipText = thread.querySelector('.feedback-reply-target-text');
  if (chip) chip.classList.remove('hidden');
  if (chipName) chipName.textContent = `Replying to ${target.author || 'Anonymous'}`;
  if (chipText) chipText.textContent = feedbackTargetSnippet(target.body || '');
  const input = thread.querySelector('.feedback-reply-input');
  if (input) {
    input.placeholder = `Reply to ${target.author || 'this note'}...`;
    input.focus();
  }
}

function clearFeedbackReplyTarget(thread) {
  if (!thread) return;
  const id = thread.dataset.feedbackId;
  if (id) feedbackReplyTargets.delete(id);
  thread.querySelectorAll('.feedback-click-reply.is-target').forEach(node => node.classList.remove('is-target'));
  const chip = thread.querySelector('.feedback-reply-target');
  if (chip) chip.classList.add('hidden');
  const input = thread.querySelector('.feedback-reply-input');
  if (input) input.placeholder = 'Discuss this suggestion...';
}

function renderFeedbackBoard(items = []) {
  if (!feedbackList) return;
  if (!items.length) {
    feedbackList.innerHTML = '<div class="feedback-empty">No suggestions yet. Be the first to pin one here.</div>';
    return;
  }
  feedbackList.innerHTML = items.map(item => {
    const replies = Array.isArray(item.replies) ? item.replies : [];
    const authorLaneMap = new Map([[String(item.author || 'Anonymous').trim().toLowerCase(), 'left']]);
    const authorToneMap = new Map();
    let nextReplyLane = 'right';
    let nextAuthorTone = 0;
    const toneForAuthor = (author) => {
      const key = String(author || 'Anonymous').trim().toLowerCase();
      if (!authorToneMap.has(key)) {
        authorToneMap.set(key, nextAuthorTone % 6);
        nextAuthorTone += 1;
      }
      return authorToneMap.get(key);
    };
    const laneForAuthor = (author) => {
      const key = String(author || 'Anonymous').trim().toLowerCase();
      if (!authorLaneMap.has(key)) {
        authorLaneMap.set(key, nextReplyLane);
        nextReplyLane = nextReplyLane === 'right' ? 'left' : 'right';
      }
      return authorLaneMap.get(key) || 'left';
    };
    const threadTone = toneForAuthor(item.author);
    return `
      <article class="feedback-thread tone-${threadTone}" data-feedback-id="${escapeHtml(item.id)}">
        <div class="feedback-thread-pin" aria-hidden="true"></div>
        <div class="feedback-thread-head">
          <div class="feedback-thread-click-target feedback-click-reply" data-feedback-reply-anchor="thread" role="button" tabindex="0" aria-label="Reply to ${escapeHtml(item.author || 'Anonymous')}">
            <h3>${escapeHtml(item.title || 'Untitled suggestion')}</h3>
            <div class="feedback-thread-meta">${escapeHtml(item.author || 'Anonymous')} · ${escapeHtml(formatFeedbackTime(item.createdAt))}</div>
          </div>
          <span class="feedback-reply-count">${replies.length} replies</span>
        </div>
        <p class="feedback-thread-body feedback-click-reply" data-feedback-reply-anchor="thread-body" role="button" tabindex="0" aria-label="Reply to this suggestion">${escapeHtml(item.body || '').replace(/\n/g, '<br>')}</p>
        <div class="feedback-replies">
          ${replies.map((reply, idx) => {
            const align = laneForAuthor(reply.author);
            const tone = toneForAuthor(reply.author);
            const replyToAuthor = reply.replyToAuthor || item.author || '';
            return `
            <div class="feedback-reply feedback-click-reply is-${align} tone-${tone}" data-feedback-reply-anchor="${escapeHtml(reply.id || '')}" role="button" tabindex="0" aria-label="Reply to ${escapeHtml(reply.author || 'Anonymous')}">
              <div class="feedback-reply-meta">${escapeHtml(reply.author || 'Anonymous')} · ${escapeHtml(formatFeedbackTime(reply.createdAt))}</div>
              ${reply.replyTo ? `<div class="feedback-reply-context">to ${escapeHtml(replyToAuthor || 'this note')}${reply.replyToBody ? ` · ${escapeHtml(feedbackTargetSnippet(reply.replyToBody))}` : ''}</div>` : ''}
              <div class="feedback-reply-body">${escapeHtml(reply.body || '').replace(/\n/g, '<br>')}</div>
            </div>
          `;
          }).join('')}
        </div>
        <div class="feedback-reply-compose">
          <div class="feedback-reply-target hidden">
            <span class="feedback-reply-target-name"></span>
            <span class="feedback-reply-target-text"></span>
            <button class="feedback-reply-target-clear" type="button" aria-label="Clear reply target">×</button>
          </div>
          <input class="feedback-reply-name" type="text" maxlength="60" placeholder="Name (optional)">
          <textarea class="feedback-reply-input" maxlength="800" placeholder="Discuss this suggestion..."></textarea>
          <button class="feedback-reply-btn" type="button">Reply</button>
        </div>
      </article>
    `;
  }).join('');

  feedbackList.querySelectorAll('.feedback-thread').forEach(thread => {
    const id = thread.dataset.feedbackId;
    const item = items.find(entry => entry.id === id);
    if (!item) return;
    const threadTarget = feedbackReplyTargetForItem(item);
    const bodyTarget = { ...threadTarget, id: 'thread-body' };
    thread.querySelector('[data-feedback-reply-anchor="thread"]')?.addEventListener('click', () => setFeedbackReplyTarget(thread, threadTarget));
    thread.querySelector('[data-feedback-reply-anchor="thread-body"]')?.addEventListener('click', () => setFeedbackReplyTarget(thread, bodyTarget));
    thread.querySelectorAll('.feedback-reply[data-feedback-reply-anchor]').forEach(node => {
      const reply = (Array.isArray(item.replies) ? item.replies : []).find(entry => entry.id === node.dataset.feedbackReplyAnchor);
      if (!reply) return;
      node.addEventListener('click', () => setFeedbackReplyTarget(thread, feedbackReplyTargetForReply(reply)));
    });
    thread.querySelectorAll('.feedback-click-reply').forEach(node => {
      node.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          node.click();
        }
      });
    });
    thread.querySelector('.feedback-reply-target-clear')?.addEventListener('click', event => {
      event.stopPropagation();
      clearFeedbackReplyTarget(thread);
    });
    const savedTarget = feedbackReplyTargets.get(id);
    if (savedTarget) setFeedbackReplyTarget(thread, savedTarget);
  });

  feedbackList.querySelectorAll('.feedback-reply-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const thread = btn.closest('.feedback-thread');
      if (!thread) return;
      const id = thread.dataset.feedbackId;
      const nameEl = thread.querySelector('.feedback-reply-name');
      const bodyEl = thread.querySelector('.feedback-reply-input');
      const body = (bodyEl?.value || '').trim();
      if (!body) return;
      const target = feedbackReplyTargets.get(id) || {
        id: 'thread',
        author: thread.querySelector('.feedback-thread-meta')?.textContent?.split(' · ')[0] || '',
        body: thread.querySelector('.feedback-thread-body')?.textContent || ''
      };
      btn.disabled = true;
      btn.textContent = 'Posting...';
      try {
        const res = await fetch(`${API_BASE}/api/feedback/${encodeURIComponent(id)}/replies`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            author: (nameEl?.value || '').trim() || feedbackAuthorName(),
            body,
            replyTo: target.id || '',
            replyToAuthor: target.author || '',
            replyToBody: target.body || ''
          })
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `HTTP ${res.status}`);
        }
        if (bodyEl) bodyEl.value = '';
        clearFeedbackReplyTarget(thread);
        await loadFeedbackBoard();
      } catch (err) {
        alert(`Reply failed: ${err.message}`);
      } finally {
        btn.disabled = false;
        btn.textContent = 'Reply';
      }
    });
  });
}

async function loadFeedbackBoard() {
  if (!feedbackList) return;
  feedbackList.innerHTML = '<div class="feedback-empty">Loading suggestions...</div>';
  try {
    const res = await fetch(`${API_BASE}/api/feedback`);
    const data = res.ok ? await res.json() : { items: [] };
    renderFeedbackBoard(Array.isArray(data.items) ? data.items : []);
    setFeedbackStatus('', 'idle');
  } catch (err) {
    feedbackList.innerHTML = `<div class="feedback-empty">Could not load the board: ${escapeHtml(err.message)}</div>`;
  }
}

async function submitFeedbackItem() {
  const title = (feedbackTitleInput?.value || '').trim();
  const body = (feedbackBodyInput?.value || '').trim();
  if (!title || !body) {
    setFeedbackStatus('Please add a title and suggestion body.', 'error');
    return;
  }
  if (feedbackSubmitBtn) {
    feedbackSubmitBtn.disabled = true;
    setFeedbackSubmitButtonLabel('Posting...');
  }
  setFeedbackStatus('Pinning your suggestion...', 'busy');
  try {
    const res = await fetch(`${API_BASE}/api/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        author: feedbackAuthorName(),
        title,
        body
      })
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `HTTP ${res.status}`);
    }
    if (feedbackTitleInput) feedbackTitleInput.value = '';
    if (feedbackBodyInput) feedbackBodyInput.value = '';
    setFeedbackStatus('Posted. Harrison can review it later.', 'ok');
    await loadFeedbackBoard();
  } catch (err) {
    setFeedbackStatus(`Post failed: ${err.message}`, 'error');
  } finally {
    if (feedbackSubmitBtn) {
      feedbackSubmitBtn.disabled = false;
      setFeedbackSubmitButtonLabel('Post Suggestion');
    }
  }
}

function showCourseTrackerView() {
  destroyLoginScene();
  if (appShell) appShell.classList.remove('hidden');
  welcomeScreen.classList.add('hidden');
  answerScreen.classList.add('hidden');
  learnView.classList.add('hidden');
  if (settingsView) settingsView.classList.add('hidden');
  if (preferenceView) preferenceView.classList.add('hidden');
  if (feedbackView) feedbackView.classList.add('hidden');
  if (homeworkView) homeworkView.classList.add('hidden');
  if (courseTrackerView) courseTrackerView.classList.remove('hidden');
  if (mistakeNotebookView) mistakeNotebookView.classList.add('hidden');
  if (loginView) loginView.classList.add('hidden');
  if (topbar) topbar.classList.add('hidden');
  setWorkspaceAccountBarVisible(false);
  clearToc();
  updateSidebarNavActive('course-tracker');
  renderCourseTracker();
}

function showMistakeNotebookView() {
  destroyLoginScene();
  if (appShell) appShell.classList.remove('hidden');
  welcomeScreen.classList.add('hidden');
  answerScreen.classList.add('hidden');
  learnView.classList.add('hidden');
  if (settingsView) settingsView.classList.add('hidden');
  if (preferenceView) preferenceView.classList.add('hidden');
  if (feedbackView) feedbackView.classList.add('hidden');
  if (homeworkView) homeworkView.classList.add('hidden');
  if (courseTrackerView) courseTrackerView.classList.add('hidden');
  if (mistakeNotebookView) mistakeNotebookView.classList.remove('hidden');
  if (loginView) loginView.classList.add('hidden');
  if (topbar) topbar.classList.add('hidden');
  setWorkspaceAccountBarVisible(false);
  clearToc();
  updateSidebarNavActive('mistake-notebook');
  renderMistakeNotebook();
}

function toggleSyllabusPanel(forceOpen = null) {
  if (!sidebarSyllabusPanel) return;
  const nextOpen = typeof forceOpen === 'boolean'
    ? forceOpen
    : !isAccordionOpen(sidebarSyllabusPanel);
  setAccordionOpen(sidebarSyllabusPanel, nextOpen);
  if (nextOpen) toggleRecentPanel(false);
  updateSidebarNavActive(nextOpen ? 'syllabus' : null);
}

function toggleRecentPanel(forceOpen = null) {
  if (!sidebarRecentPanel) return;
  const nextOpen = typeof forceOpen === 'boolean'
    ? forceOpen
    : !isAccordionOpen(sidebarRecentPanel);
  setAccordionOpen(sidebarRecentPanel, nextOpen);
  if (nextOpen) toggleSyllabusPanel(false);
  updateSidebarNavActive(nextOpen ? 'recent' : null);
}


function showLoginView() {
  if (appShell) appShell.classList.add('hidden');
  setWorkspaceAccountBarVisible(false);
  welcomeScreen.classList.add('hidden');
  answerScreen.classList.add('hidden');
  learnView.classList.add('hidden');
  if (settingsView) settingsView.classList.add('hidden');
  if (preferenceView) preferenceView.classList.add('hidden');
  if (feedbackView) feedbackView.classList.add('hidden');
  if (homeworkView) homeworkView.classList.add('hidden');
  if (courseTrackerView) courseTrackerView.classList.add('hidden');
  if (mistakeNotebookView) mistakeNotebookView.classList.add('hidden');
  if (loginView) loginView.classList.remove('hidden');
  if (topbar) topbar.classList.add('hidden');
  clearToc();
  updateSidebarNavActive(null);
  if (loginCustomStage) loginCustomStage.classList.remove('hidden');
  if (loginClerkStage) loginClerkStage.classList.add('hidden');
  const loginMount = document.getElementById('clerkMountLogin');
  if (loginMount) loginMount.style.display = 'none';
  const loginPrimaryBtn = document.getElementById('clerkSignInBtnLogin');
  if (loginPrimaryBtn) loginPrimaryBtn.style.display = '';
  const loginGuestBtn = document.getElementById('guestModeBtnLogin');
  if (loginGuestBtn) loginGuestBtn.style.display = '';
  setLoginButtonsBusy(false);
  setLoginStatus('');
  initLoginExperience();
}

function updateSidebarNavActive(key) {
  if (navHomeBtn) navHomeBtn.classList.toggle('active', key === 'home');
  if (navSyllabusBtn) navSyllabusBtn.classList.toggle('active', key === 'syllabus');
  if (navRecentBtn) navRecentBtn.classList.toggle('active', key === 'recent');
  if (navCourseTrackerBtn) navCourseTrackerBtn.classList.toggle('active', key === 'course-tracker');
  if (navMistakeNotebookBtn) navMistakeNotebookBtn.classList.toggle('active', key === 'mistake-notebook');
  if (navPreferenceBtn) navPreferenceBtn.classList.toggle('active', key === 'preference');
  if (navFeedbackBtn) navFeedbackBtn.classList.toggle('active', key === 'feedback');
  if (navSettingsBtn) navSettingsBtn.classList.toggle('active', key === 'settings');
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

function getTocContextForCurrentLesson() {
  const sectionId = String(tutorState.learnSectionId || '').trim();
  const sectionTitle = String(tutorState.learnSectionTitle || '').trim();
  const probe = `${sectionId} ${sectionTitle}`.trim();
  const isSubLesson = /(^|\s)([A-Z]?\.?\d+|\d+\.\d+)-\d+(\b|\s)/i.test(probe);

  if (!isSubLesson) {
    return { mode: 'index', siblingSubsections: [] };
  }

  for (const chapter of (syllabusData || [])) {
    const sections = (chapter.sections || []).map(s => typeof s === 'string' ? { title: s, subsections: [] } : s);
    for (const sec of sections) {
      const subs = Array.isArray(sec.subsections) ? sec.subsections : [];
      if (subs.some(sub => String(sub).trim() === sectionTitle || String(sub).trim() === sectionId || probe.includes(String(sub).trim()))) {
        return { mode: 'sublesson', siblingSubsections: subs };
      }
    }
  }

  return { mode: 'sublesson', siblingSubsections: [] };
}

// Generate TOC from rendered lesson HTML headings
// Index pages keep their subsection list above the divider.
// Sub-lessons keep only their sibling mini-navigation above the divider.
function buildTocFromContent(containerEl) {
  if (!containerEl || !tocNav) return;
  const headings = containerEl.querySelectorAll('h1, h2, h3, h4');

  const sectionId = String(tutorState.learnSectionId || '').trim();
  const sectionTitle = String(tutorState.learnSectionTitle || '').trim();
  const tocContext = getTocContextForCurrentLesson();
  const existingSubItems = [];

  if (tocContext.mode === 'index') {
    tocNav.querySelectorAll('.toc-item.depth-2:not(.content-anchor)').forEach(btn => {
      existingSubItems.push(btn.cloneNode(true));
    });
  } else if (tocContext.mode === 'sublesson' && tocContext.siblingSubsections.length) {
    tocContext.siblingSubsections.forEach(subTitle => {
      const btn = document.createElement('button');
      btn.className = 'toc-item depth-2 lesson-sibling-anchor';
      btn.textContent = subTitle;
      btn.dataset.lessonTitle = subTitle;
      if (String(subTitle).trim() === sectionTitle || String(subTitle).trim() === sectionId) {
        btn.classList.add('active');
      }
      existingSubItems.push(btn);
    });
  }

  const items = [];
  let counter = 0;
  headings.forEach(h => {
    const depth = parseInt(h.tagName[1], 10);
    const title = h.textContent.trim();
    const anchor = `toc-anchor-${counter++}`;
    h.id = anchor;
    items.push({ title, depth, anchor });
  });

  tocNav.innerHTML = '';

  if (existingSubItems.length) {
    existingSubItems.forEach(btn => tocNav.appendChild(btn));
  }

  if (_learnViewMode !== 'textbook' && items.length) {
    if (existingSubItems.length) {
      const divider = document.createElement('div');
      divider.className = 'toc-divider';
      divider.textContent = 'Index';
      divider.style.color = '#000';
      divider.style.fontWeight = 'bold';
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
        tocNav.querySelectorAll('.toc-item.content-anchor').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
      tocNav.appendChild(btn);
    });
  }

  if (existingSubItems.length) {
    tocNav.querySelectorAll('.toc-item.depth-2:not(.content-anchor)').forEach((btn) => {
      if (btn._learnBound) return;
      btn._learnBound = true;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isLearnPageTurning) return;
        const subTitle = btn.dataset.lessonTitle || btn.textContent.trim();
        tocNav.querySelectorAll('.toc-item.depth-2:not(.content-anchor)').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        runLearnPageTurn(1, () => {
          openLearnModeKeepToc(subTitle, subTitle, learnParentOverviewContext || findParentOverviewContextForSubsection(subTitle, subTitle));
        });
      });
    });
  }

  if (_learnViewMode !== 'textbook' && items.length) {
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
  updateReferencesSummary(bookPages.length || 0, tutorState.currentWebSources?.length || 0);
  if (!bookPages.length) {
    bookSourcesRail.innerHTML = '<div class="source-empty">No content sources</div>';
    return;
  }

  bookSourcesRail.innerHTML = bookPages.map((p, i) => `
    <button class="source-card source-page-link" type="button" data-book-source-index="${i}" title="Open this textbook page">
      <div class="source-index">书页${i + 1}</div>
      <div class="source-title">${escapeHtml(p.page)}</div>
      <div class="source-meta">${escapeHtml(p.subsection || p.title || 'Textbook')}</div>
    </button>
  `).join('');
}

function closeMainBookSourceModal() {
  const modal = document.getElementById('mainBookSourceModal');
  if (modal) modal.remove();
}

function openMainBookSource(index) {
  const pages = tutorState.currentBookPages || [];
  const page = pages[index];
  if (!page || !page.image) return;
  closeMainBookSourceModal();
  const modal = document.createElement('div');
  modal.id = 'mainBookSourceModal';
  modal.className = 'source-page-modal';
  modal.innerHTML = `
    <div class="source-page-backdrop" data-source-page-close="true"></div>
    <div class="source-page-dialog" role="dialog" aria-modal="true" aria-label="Textbook source page">
      <div class="source-page-head">
        <div>
          <div class="source-page-kicker">Content Source</div>
          <div class="source-page-title">${escapeHtml(page.page || `书页${index + 1}`)}</div>
          <div class="source-page-meta">${escapeHtml(page.subsection || page.title || 'Textbook')}</div>
        </div>
        <button class="source-page-close" type="button" data-source-page-close="true" aria-label="Close source page">✕</button>
      </div>
      <div class="source-page-stage">
        <img src="${escapeHtml(page.image)}" alt="${escapeHtml(page.page || `Textbook page ${index + 1}`)}">
      </div>
    </div>
  `;
  modal.addEventListener('click', (event) => {
    if (event.target && event.target.dataset && event.target.dataset.sourcePageClose) closeMainBookSourceModal();
  });
  document.body.appendChild(modal);
}

function renderWebSources(webSources = []) {
  webSourcesCount.textContent = String(webSources.length || 0);
  updateReferencesSummary(tutorState.currentBookPages?.length || 0, webSources.length || 0);
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

function renderMainConversationThread(options = {}) {
  if (!answerContent) return;
  const history = Array.isArray(tutorState.chatHistory) ? tutorState.chatHistory : [];
  const pendingPrompt = String(options.pendingPrompt || '').trim();
  const pendingAssistantHtml = options.pendingAssistantHtml || '';
  const pendingAssistantClass = options.pendingAssistantClass || '';
  const turns = [];

  history.forEach((item) => {
    if (!item || !item.role || !String(item.content || '').trim()) return;
    if (item.role === 'user') {
      turns.push(`
        <article class="main-chat-turn main-chat-turn-user">
          <div class="main-chat-label">You</div>
          <div class="main-chat-user-text">${escapeHtml(item.content).replace(/\n/g, '<br>')}</div>
        </article>
      `);
      return;
    }
    if (item.role === 'assistant') {
      turns.push(`
        <article class="main-chat-turn main-chat-turn-assistant">
          <div class="main-chat-label">Fourier</div>
          <div class="main-chat-answer">${markdownToHtml(item.content || '暂无讲解内容')}</div>
        </article>
      `);
    }
  });

  if (pendingPrompt) {
    turns.push(`
      <article class="main-chat-turn main-chat-turn-user">
        <div class="main-chat-label">You</div>
        <div class="main-chat-user-text">${escapeHtml(pendingPrompt).replace(/\n/g, '<br>')}</div>
      </article>
    `);
  }

  if (pendingAssistantHtml) {
    turns.push(`
      <article class="main-chat-turn main-chat-turn-assistant ${escapeHtml(pendingAssistantClass)}">
        <div class="main-chat-label">Fourier</div>
        <div class="main-chat-answer">${pendingAssistantHtml}</div>
      </article>
    `);
  }

  answerContent.innerHTML = `<div class="main-chat-thread">${turns.join('')}</div>`;
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

function normalizeAnswerStyle(value) {
  const raw = String(value || '').trim().toLowerCase();
  if (raw === 'short') return 'fast';
  if (raw === 'medium') return 'balanced';
  if (raw === 'long') return 'detailed';
  if (raw === 'fast' || raw === 'balanced' || raw === 'detailed') return raw;
  return 'balanced';
}

function getAnswerStyleInstruction(style, lang = 'en') {
  const normalized = normalizeAnswerStyle(style);
  const instructions = {
    fast: {
      en: 'Explain in a fast, low-friction way. Prioritize the core idea, the exam-relevant takeaway, and at most one minimal example. Avoid long derivations and unnecessary background.',
      zh: '请用快速、低负担的方式解释。优先讲核心概念、考试相关结论，最多给一个最小例子。避免冗长推导和不必要背景。'
    },
    balanced: {
      en: 'Explain in a balanced teaching style. Cover the key idea clearly, include essential reasoning steps, and use one helpful example or intuition when appropriate. Keep it clear and complete without overwhelming detail.',
      zh: '请用平衡型教学风格解释。清楚讲明核心概念，包含必要推理步骤，并在合适时加入一个有帮助的例子或直觉解释。保持清楚完整，但不要信息过载。'
    },
    detailed: {
      en: 'Explain in a detailed but student-friendly way. Expand the reasoning step by step, include intuition, common mistakes, and exam-relevant implications. Depth should improve clarity, not create verbosity for its own sake.',
      zh: '请用详细但对学生友好的方式解释。分步骤展开推理，补充直觉、常见错误和考试相关提醒。深入是为了更清楚，不是为了单纯变长。'
    }
  };
  return instructions[normalized]?.[lang] || instructions[normalized]?.en || instructions.balanced.en;
}

async function callAsk(prompt, signal, extra = {}) {
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, uid: getUid(), bookSource: currentBook, ...extra })
  };
  if (signal) fetchOptions.signal = signal;
  const res = await fetch(`${API_BASE}/api/ask`, fetchOptions);

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

function replayLiveSearchEvents(container, events = [], finalSources = [], lang = 'en') {
  if (!container) return;
  const liveSources = container.querySelector('.search-live-sources');
  if (!liveSources) return;
  const isZh = lang === 'zh';
  const titleBase = isZh ? '检索资料' : 'Reference check';

  liveSources.classList.remove('hidden');
  liveSources.innerHTML = `<div class="search-tree-title">${titleBase}</div>`;

  const snapshots = [];
  for (const evt of events) {
    if (evt && evt.type === 'source' && Array.isArray(evt.sources)) {
      snapshots.push(evt.sources);
    }
  }

  if (!snapshots.length) {
    const rendered = sortSourcesByType(finalSources).slice(0, 8);
    liveSources.innerHTML = `<div class="search-tree-title">${titleBase} ✓</div>` + renderWebSourceCards(rendered, { compact: true, showBuckets: true });
    return;
  }

  let idx = 0;
  const tick = () => {
    const current = sortSourcesByType(snapshots[idx]).slice(0, 8);
    liveSources.innerHTML = `<div class="search-tree-title">${titleBase}${idx === snapshots.length - 1 ? ' ✓' : ' ...'}</div>` + renderWebSourceCards(current, { compact: true, showBuckets: true });
    idx += 1;
    if (idx < snapshots.length) {
      setTimeout(tick, Math.min(220, 60 + idx * 15));
    } else if (finalSources.length > 8) {
      liveSources.innerHTML += `<div class="search-live-more">${isZh ? `还有 ${finalSources.length - 8} 个...` : `${finalSources.length - 8} more...`}</div>`;
    }
  };
  tick();
}

function buildSearchProgressMarkup(context = 'answer', lang = 'en') {
  const isZh = lang === 'zh';
  const copy = isZh ? {
    kicker: '生成中',
    title: '正在准备可靠回答',
    summary: context === 'followup'
      ? '正在结合本节内容和必要资料，整理一个可以继续追问的回答。'
      : '先锁定本节教材和公式，再检索必要资料，最后整理成可直接学习的解释。',
    tape: 'textbook notes',
    steps: ['提取本节概念与公式', '检索辅助资料', '组织最终讲解']
  } : {
    kicker: 'Working',
    title: 'Preparing a grounded answer',
    summary: context === 'followup'
      ? 'Linking this page, your question, and any useful references before writing the reply.'
      : 'First I pin the textbook concepts and formulas, then check useful references, then write the explanation.',
    tape: 'textbook notes',
    steps: ['Extract section concepts and formulas', 'Check supporting references', 'Write the final explanation']
  };
  return `
    <div class="search-progress-card" aria-live="polite">
      <div class="search-progress-tape">${copy.tape}</div>
      <div class="search-progress-pin" aria-hidden="true"></div>
      <div class="search-progress-head">
        <div class="search-progress-kicker">${copy.kicker}</div>
        <div class="search-progress-title">${copy.title}</div>
        <div class="search-progress-summary">${copy.summary}</div>
      </div>
      <div class="search-progress-list">
        <div class="search-step">
          <span class="step-icon step-spinner" aria-hidden="true"></span>
          <span class="search-step-index">01</span>
          <span class="search-step-label">${copy.steps[0]}</span>
        </div>
        <div class="search-step is-muted">
          <span class="step-icon step-spinner" aria-hidden="true"></span>
          <span class="search-step-index">02</span>
          <span class="search-step-label">${copy.steps[1]}</span>
        </div>
        <div class="search-live-sources hidden"></div>
        <div class="search-step is-muted">
          <span class="step-icon step-spinner" aria-hidden="true"></span>
          <span class="search-step-index">03</span>
          <span class="search-step-label">${copy.steps[2]}</span>
        </div>
      </div>
    </div>
  `;
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

async function sendQuestion(rawPrompt, source = 'auto') {
  let prompt = (rawPrompt || userInput.value || followupInput.value || '').trim();
  if (!prompt && attachmentsMain.length === 0 && attachmentsFollowup.length === 0) return;

  const isFollowup = source === 'followup' || (source === 'auto' && (document.activeElement === followupInput || !!followupInput.value.trim()));
  if (!isFollowup && (!tutorState.chatHistory || tutorState.chatHistory.length === 0)) {
    tutorState.chatSessionStartTime = Date.now();
  }
  const attachments = isFollowup
    ? mergeAttachmentSources(activeMainAttachmentSources, attachmentsFollowup)
    : [...attachmentsMain];
  const visibleAttachments = isFollowup ? [...attachmentsFollowup] : attachments;
  const hasReadableAttachments = getModelReadableAttachments(attachments).length > 0;
  const shouldCompareAttachments = !isFollowup && attachments.length > 0;
  if (!prompt && visibleAttachments.length) {
    prompt = buildAttachmentOnlyPrompt(attachments, 'zh');
  }

  const answerStyleToggle = isFollowup
    ? (document.getElementById('answerLengthToggleLearn')?.value || 'balanced')
    : (answerLengthToggleMain?.value || document.getElementById('answerLengthToggleLearn')?.value || 'balanced');
  const useWebSearch = isFollowup
    ? Boolean(webSearchBtnLearn?.classList.contains('active'))
    : Boolean(webSearchToggleBtnMain?.classList.contains('active'));
  const answerLength = normalizeAnswerStyle(answerStyleToggle);


  userInput.value = prompt;
  followupInput.value = '';
  autoResize(userInput);
  autoResize(followupInput);

  // Clear attachments after grab
  if (isFollowup) { attachmentsFollowup.length = 0; renderAttachPreview(attachmentsFollowup, 'attachPreviewFollowup'); }
  else { attachmentsMain.length = 0; renderAttachPreview(attachmentsMain, 'attachPreviewMain'); }

  setSendState();

  showAnswer(prompt || '(Attachment)');
  if (shouldCompareAttachments) {
    attachmentCompareOpen = true;
    activeMainAttachmentIndex = 0;
    renderAttachmentSourcePanel(attachments);
  } else if (!isFollowup) {
    clearAttachmentSourcePanel();
  }
  setStatus('Working', 'working');
  renderBookPages([]);
  renderBookSources([]);
  renderWebSources([]);
  updateReferencesSummary(0, 0);
  setReferencesOpen(false);
  renderMainConversationThread({
    pendingPrompt: prompt,
    pendingAssistantHtml: buildSearchProgressMarkup(isFollowup ? 'followup' : 'answer', detectLang(prompt)),
    pendingAssistantClass: 'main-chat-turn-pending'
  });
  answerScroll.scrollTop = isFollowup ? answerScroll.scrollHeight : 0;

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
    if (step >= 2 && steps[1]) steps[1].classList.remove('is-muted');
    if (steps[2]) steps[2].classList.remove('is-muted');
  }, 1500);

  try {
    const data = await callAsk(prompt, currentAbortController.signal, {
      mode: isFollowup ? 'followup' : 'ask',
      history: tutorState.chatHistory.slice(-8),
      bookPages: hasReadableAttachments ? [] : tutorState.currentBookPages,
      webSources: hasReadableAttachments ? [] : tutorState.currentWebSources,
      attachmentFirst: hasReadableAttachments,
      useWebSearch: useWebSearch,
      answerLength: answerLength,
      answerStyleInstruction: getAnswerStyleInstruction(answerLength, detectLang(prompt)),
      language: detectLang(prompt),
      attachments: getModelReadableAttachments(attachments)
    });
    stopStepAnimation();
    replayLiveSearchEvents(answerContent, data.liveSearchEvents || [], data.webSources || [], detectLang(prompt));
    const finalStep = answerContent.querySelectorAll('.search-step')[2];
    if (finalStep) {
      finalStep.classList.remove('is-muted');
      const sp = finalStep.querySelector('.step-icon');
      if (sp) { sp.className = 'step-icon step-done'; sp.textContent = '✓'; }
    }
    currentAbortController = null;
    stopBtn.classList.add('hidden');

    tutorState.chatHistory.push(
      { role: 'user', content: prompt },
      { role: 'assistant', content: data.explanation || '' }
    );
    tutorState.currentBookPages = data.bookPages || [];
    tutorState.currentWebSources = data.webSources || [];
    updateRecentConversations('answer:stream-finished');

    renderBookPages(data.bookPages || []);
    renderMainConversationThread();
    answerScroll.scrollTop = isFollowup ? answerScroll.scrollHeight : 0;

    renderBookSources(data.bookPages || []);
    renderWebSources(data.webSources || []);
    renderWebSourcesInline(data.webSources || []);
    updateReferencesSummary(data.bookPages?.length || 0, data.webSources?.length || 0);
    setReferencesOpen(false);

    setStatus('Done', 'done');
  } catch (err) {
    stopStepAnimation();
    currentAbortController = null;
    stopBtn.classList.add('hidden');
    if (err.name === 'AbortError') {
      setStatus('Stopped', 'idle');
      if (isFollowup) {
        renderMainConversationThread({
          pendingPrompt: prompt,
          pendingAssistantHtml: `<p class="ghost">${detectLang(prompt) === 'zh' ? '已停止。' : 'Stopped.'}</p>`,
          pendingAssistantClass: 'main-chat-turn-pending'
        });
      } else {
        renderMainConversationThread({
          pendingPrompt: prompt,
          pendingAssistantHtml: `<p class="ghost">${detectLang(prompt) === 'zh' ? '已停止。' : 'Stopped.'}</p>`,
          pendingAssistantClass: 'main-chat-turn-pending'
        });
      }
    } else {
      setStatus('Error', 'error');
      const failedTitle = detectLang(prompt) === 'zh' ? '请求失败' : 'Request failed';
      const errorHtml = `
        <div class="error-box">
          <strong>${failedTitle}</strong>
          <p>${escapeHtml(err.message)}</p>
        </div>
      `;
      if (isFollowup) {
        renderMainConversationThread({
          pendingPrompt: prompt,
          pendingAssistantHtml: errorHtml,
          pendingAssistantClass: 'main-chat-turn-pending'
        });
      } else {
        renderMainConversationThread({
          pendingPrompt: prompt,
          pendingAssistantHtml: errorHtml,
          pendingAssistantClass: 'main-chat-turn-pending'
        });
      }
    }
  }
}

stopBtn.addEventListener('click', () => {
  if (currentAbortController) currentAbortController.abort();
});

if (attachmentCompareToggle) {
  attachmentCompareToggle.addEventListener('click', () => {
    setAttachmentCompareOpen(!attachmentCompareOpen);
  });
}

if (attachmentSourceCloseBtn) {
  attachmentSourceCloseBtn.addEventListener('click', () => {
    setAttachmentCompareOpen(false);
  });
}

function setupAnswerCompareResizer() {
  if (!answerCompareResizer || !attachmentSourcePanel) return;
  let dragging = false;
  const minWidth = 260;
  const maxRatio = 0.68;

  const resizeTo = (clientX) => {
    const cols = answerCompareResizer.closest('.answer-cols');
    if (!cols) return;
    const rect = cols.getBoundingClientRect();
    const maxWidth = Math.max(minWidth, rect.width * maxRatio);
    const next = Math.min(maxWidth, Math.max(minWidth, clientX - rect.left));
    cols.style.setProperty('--attachment-source-width', `${Math.round(next)}px`);
  };

  answerCompareResizer.addEventListener('pointerdown', (event) => {
    dragging = true;
    answerCompareResizer.setPointerCapture(event.pointerId);
    document.body.classList.add('answer-compare-resizing');
    event.preventDefault();
  });

  answerCompareResizer.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    resizeTo(event.clientX);
  });

  const stopDragging = (event) => {
    if (!dragging) return;
    dragging = false;
    document.body.classList.remove('answer-compare-resizing');
    try { answerCompareResizer.releasePointerCapture(event.pointerId); } catch (_) {}
  };

  answerCompareResizer.addEventListener('pointerup', stopDragging);
  answerCompareResizer.addEventListener('pointercancel', stopDragging);
  answerCompareResizer.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    const cols = answerCompareResizer.closest('.answer-cols');
    if (!cols) return;
    const current = parseFloat(getComputedStyle(cols).getPropertyValue('--attachment-source-width')) || attachmentSourcePanel.getBoundingClientRect().width || 420;
    const delta = event.key === 'ArrowLeft' ? -28 : 28;
    cols.style.setProperty('--attachment-source-width', `${Math.max(minWidth, current + delta)}px`);
    event.preventDefault();
  });
}

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
    sendQuestion(userInput.value, 'main');
  }
});

followupInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
    e.preventDefault();
    sendQuestion(followupInput.value, 'followup');
  }
});

sendBtn.addEventListener('click', () => sendQuestion(userInput.value, 'main'));
followupBtn.addEventListener('click', () => sendQuestion(followupInput.value, 'followup'));

if (backBtn) {
  backBtn.addEventListener('click', () => {
    saveCurrentLearnSession('main:back-before-clear');
    showWelcome();
    setStatus('', 'idle');
    tutorState.chatHistory = [];
    tutorState.chatSessionStartTime = Date.now();
    tutorState.currentBookPages = [];
    tutorState.currentWebSources = [];
  });
}
if (topbarCloseBtn) {
  topbarCloseBtn.addEventListener('click', () => {
    saveCurrentLearnSession('main:topbar-close-before-clear');
    showWelcome();
    setStatus('', 'idle');
    tutorState.chatHistory = [];
    tutorState.chatSessionStartTime = Date.now();
    tutorState.currentBookPages = [];
    tutorState.currentWebSources = [];
  });
}

quickChips.querySelectorAll('.chip').forEach(btn => {
  btn.addEventListener('click', () => {
    const prompt = btn.getAttribute('data-prompt') || '';
    sendQuestion(prompt, 'main');
  });
});

document.querySelectorAll('.home-feature-chip').forEach(btn => {
  btn.addEventListener('click', () => {
    const prompt = btn.getAttribute('data-prompt') || '';
    if (!prompt || !userInput) return;
    userInput.value = prompt;
    autoResize(userInput);
    setSendState();
    userInput.focus();
  });
});

renderSyllabus();
updateRecentConversationsUI();
autoResize(userInput);
autoResize(followupInput);
setSendState();
initTheme();
if (!hasStartupViewClaimedScreen()) {
  showWelcome();
}
setStatus('', 'idle');

document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    applyTheme(btn.dataset.themeValue || 'dawn');
  });
});

// ── Init attachment UI ────────────────────────────────────────
setupAttachBtn('attachBtnMain', 'fileInputMain', userInput);
setupAttachBtn('attachBtnFollowup', 'fileInputFollowup', followupInput);
setupAttachBtn('attachBtnLearn', 'fileInputLearn', learnFollowupInput);
setupAttachBtn('attachBtnLearnPopover', 'fileInputLearnPopover', learnFollowupInputPopover || learnFollowupInput);
setupDragDrop(document.getElementById('searchBox'), userInput);
setupDragDrop(document.getElementById('followupBar'), followupInput);
setupDragDrop(document.getElementById('learnFollowupBar'), learnFollowupInput);
setupDragDrop(document.querySelector('.learn-chat-popover-input'), learnFollowupInputPopover || learnFollowupInput);
setupPaste(userInput);
setupPaste(followupInput);
setupPaste(learnFollowupInput);
if (learnFollowupInputPopover) setupPaste(learnFollowupInputPopover);
setupAnswerCompareResizer();

// --- Sidebar Toggle Logic ---
setTimeout(() => {
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const sidebarLogoExpandBtn = document.getElementById('sidebarLogoExpandBtn');
  const floatToggleBtn = document.getElementById('floatToggleBtn');
  const appContainer = document.querySelector('.app');
  const leftSidebar = document.getElementById('leftSidebar');
  const tocSidebar = document.getElementById('tocSidebar');
  const notifySidebarLayoutChange = () => {
    requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
    window.setTimeout(() => window.dispatchEvent(new Event('resize')), 560);
  };
  const setWorkspaceSidebarCollapsed = (collapsed) => {
    if (!appContainer || !leftSidebar) return;
    if (menuToggleBtn) {
      menuToggleBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      menuToggleBtn.title = collapsed ? 'Expand sidebar' : 'Collapse sidebar';
    }
    if (sidebarLogoExpandBtn) {
      sidebarLogoExpandBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      sidebarLogoExpandBtn.title = collapsed ? 'Expand sidebar' : 'Fourier';
      sidebarLogoExpandBtn.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Fourier');
    }
    if (collapsed) {
      requestAnimationFrame(() => {
        leftSidebar.classList.add('collapsed');
        if (tocSidebar) tocSidebar.classList.add('collapsed');
        appContainer.classList.add('sidebar-collapsed');
        notifySidebarLayoutChange();
      });
      return;
    }
    leftSidebar.classList.add('collapsed');
    if (tocSidebar) tocSidebar.classList.add('collapsed');
    appContainer.classList.add('sidebar-collapsed');
    leftSidebar.getBoundingClientRect();
    requestAnimationFrame(() => {
      appContainer.classList.remove('sidebar-collapsed');
      if (tocSidebar) tocSidebar.classList.remove('collapsed');
      leftSidebar.classList.remove('collapsed');
      notifySidebarLayoutChange();
    });
  };

  if (menuToggleBtn && leftSidebar) {
    menuToggleBtn.setAttribute('aria-expanded', leftSidebar.classList.contains('collapsed') ? 'false' : 'true');
    menuToggleBtn.addEventListener('click', () => {
      setWorkspaceSidebarCollapsed(!leftSidebar.classList.contains('collapsed'));
    });
  }
  if (sidebarLogoExpandBtn && leftSidebar) {
    sidebarLogoExpandBtn.setAttribute('aria-expanded', leftSidebar.classList.contains('collapsed') ? 'false' : 'true');
    sidebarLogoExpandBtn.addEventListener('click', () => {
      if (leftSidebar.classList.contains('collapsed')) {
        setWorkspaceSidebarCollapsed(false);
      }
    });
  }
  if (floatToggleBtn && leftSidebar) {
    floatToggleBtn.addEventListener('click', () => {
      setWorkspaceSidebarCollapsed(false);
    });
  }
}, 500);

// --- Resizer Logic ---
const learnResizer = document.getElementById('learnResizer');
const learnExplainCol = learnExplainColEl || document.querySelector('.learn-explain-col');
const learnChatCol = document.getElementById('learnChatCol');
let isResizing = false;

if (learnResizer && learnExplainCol && learnChatCol) {
  const LEARN_LAYOUT_KEY = 'aquarius-learn-split';
  const learnBodyInner = learnResizer.closest('.learn-body-inner') || learnExplainCol.parentElement;
  const MIN_EXPLAIN_WIDTH = 320;
  const MIN_CHAT_WIDTH = 260;
  const MIN_CHAT_RATIO = 0.16;
  const MAX_CHAT_RATIO = 0.78;
  const DEFAULT_CHAT_RATIO = 0.45;
  const DEFAULT_SPLIT_VERSION = '2026-06-14-flex-resizable-v2';
  try {
    const storedVersion = localStorage.getItem(`${LEARN_LAYOUT_KEY}-version`);
    if (storedVersion !== DEFAULT_SPLIT_VERSION) {
      localStorage.setItem(LEARN_LAYOUT_KEY, String(DEFAULT_CHAT_RATIO));
      localStorage.setItem(`${LEARN_LAYOUT_KEY}-version`, DEFAULT_SPLIT_VERSION);
    }
  } catch (_) {}

  const resizeFollowupInput = () => {
    const input = document.getElementById('learnFollowupInput');
    if (input) autoResize(input);
  };

  const getSplitConstraints = (availableWidth) => {
    let explainMin = Math.min(MIN_EXPLAIN_WIDTH, Math.max(220, availableWidth * 0.22));
    let chatMin = Math.min(MIN_CHAT_WIDTH, Math.max(210, availableWidth * 0.16));

    if (explainMin + chatMin > availableWidth) {
      const scale = availableWidth / Math.max(1, explainMin + chatMin);
      explainMin = Math.floor(explainMin * scale);
      chatMin = Math.floor(chatMin * scale);
    }

    return {
      explainMin: Math.max(0, Math.floor(explainMin)),
      chatMin: Math.max(0, Math.floor(chatMin)),
    };
  };

  const clampSplitValue = (value, min, max) => Math.max(min, Math.min(value, max));

  const clearLearnSplitStyles = () => {
    const shell = learnBody || document.getElementById('learnBody');
    learnBodyInner.style.removeProperty('grid-template-columns');
    learnBodyInner.dataset.customSplit = '';
    if (shell) {
      shell.style.removeProperty('--learn-explain-basis');
      shell.style.removeProperty('--learn-chat-basis');
    }
    [learnExplainCol, learnChatCol].forEach((col) => {
      col.style.removeProperty('flex');
      col.style.removeProperty('flex-basis');
      col.style.removeProperty('width');
      col.style.removeProperty('min-width');
      col.style.removeProperty('max-width');
    });
  };

  const applyLearnSplit = (chatRatio) => {
    if (!learnBodyInner) return;
    if (isLearnChatCollapsed || isLearnExplainCollapsed || learnPanelFocus !== 'normal' || window.matchMedia('(max-width: 900px)').matches) {
      clearLearnSplitStyles();
      return;
    }
    const boundedChatRatio = clampSplitValue(Number(chatRatio) || DEFAULT_CHAT_RATIO, MIN_CHAT_RATIO, MAX_CHAT_RATIO);
    const rect = learnBodyInner.getBoundingClientRect();
    const resizerWidth = learnResizer.offsetWidth || 10;
    const availableWidth = Math.max(0, rect.width - resizerWidth);
    if (!availableWidth) return;

    const { explainMin, chatMin } = getSplitConstraints(availableWidth);
    let chatWidth = Math.round(availableWidth * boundedChatRatio);
    chatWidth = clampSplitValue(chatWidth, chatMin, Math.max(chatMin, availableWidth - explainMin));
    const explainWidth = Math.max(explainMin, availableWidth - chatWidth);
    const shell = learnBody || document.getElementById('learnBody');

    learnBodyInner.style.setProperty(
      'grid-template-columns',
      `minmax(0, ${explainWidth}px) ${resizerWidth}px minmax(0, ${chatWidth}px)`,
      'important'
    );
    learnBodyInner.dataset.customSplit = 'true';
    if (shell) {
      shell.style.setProperty('--learn-explain-basis', `${explainWidth}px`);
      shell.style.setProperty('--learn-chat-basis', `${chatWidth}px`);
    }
    learnExplainCol.style.setProperty('flex', `0 0 ${explainWidth}px`, 'important');
    learnExplainCol.style.setProperty('flex-basis', `${explainWidth}px`, 'important');
    learnExplainCol.style.setProperty('width', `${explainWidth}px`, 'important');
    learnExplainCol.style.setProperty('min-width', '0', 'important');
    learnExplainCol.style.setProperty('max-width', `${explainWidth}px`, 'important');
    learnChatCol.style.setProperty('flex', `0 0 ${chatWidth}px`, 'important');
    learnChatCol.style.setProperty('flex-basis', `${chatWidth}px`, 'important');
    learnChatCol.style.setProperty('width', `${chatWidth}px`, 'important');
    learnChatCol.style.setProperty('min-width', '0', 'important');
    learnChatCol.style.setProperty('max-width', `${chatWidth}px`, 'important');
    resizeFollowupInput();
  };
  window.applyLearnSplit = applyLearnSplit;

  try {
    const savedRatio = parseFloat(localStorage.getItem(LEARN_LAYOUT_KEY) || '');
    if (Number.isFinite(savedRatio)) applyLearnSplit(savedRatio);
  } catch (_) {}

  const startResize = (e) => {
    if (window.matchMedia('(max-width: 900px)').matches) return;
    if (learnPanelFocus !== 'normal') {
      learnPanelFocus = 'normal';
      applyLearnPanelFocusState();
    }
    isResizing = true;
    document.body.style.cursor = 'col-resize';
    document.body.classList.add('learn-resizing');
    if (learnResizer.setPointerCapture && e.pointerId != null) {
      try { learnResizer.setPointerCapture(e.pointerId); } catch (_) {}
    }
    e.preventDefault();
  };

  const moveResize = (e) => {
    if (!isResizing) return;
    const rect = learnBodyInner.getBoundingClientRect();
    const resizerWidth = learnResizer.offsetWidth || 10;
    const availableWidth = Math.max(0, rect.width - resizerWidth);
    if (!availableWidth) return;

    const { explainMin, chatMin } = getSplitConstraints(availableWidth);
    let explainWidth = e.clientX - rect.left;
    explainWidth = clampSplitValue(explainWidth, explainMin, Math.max(explainMin, availableWidth - chatMin));
    const chatWidth = availableWidth - explainWidth;
    const chatRatio = chatWidth / availableWidth;
    applyLearnSplit(chatRatio);
    try { localStorage.setItem(LEARN_LAYOUT_KEY, String(chatRatio)); } catch (_) {}
  };

  const stopResize = () => {
    if (isResizing) {
      isResizing = false;
      document.body.style.cursor = 'default';
      document.body.classList.remove('learn-resizing');
      resizeFollowupInput();
    }
  };

  learnResizer.addEventListener('pointerdown', startResize);
  document.addEventListener('pointermove', moveResize);
  document.addEventListener('pointerup', stopResize);
  document.addEventListener('pointercancel', stopResize);
  window.addEventListener('resize', () => {
    if (window.matchMedia('(max-width: 900px)').matches) {
      clearLearnSplitStyles();
      return;
    }
    try {
      const savedRatio = parseFloat(localStorage.getItem(LEARN_LAYOUT_KEY) || '');
      if (Number.isFinite(savedRatio)) applyLearnSplit(savedRatio);
    } catch (_) {}
  });
}

const webSearchBtnLearn = document.getElementById('webSearchToggleBtnLearn');
const homeModeToggleBtn = document.getElementById('homeModeToggleBtn');
const homeModeMenu = document.getElementById('homeModeMenu');
const homeModeCurrentText = document.getElementById('homeModeCurrentText');
const homeModeCurrentIcon = document.getElementById('homeModeCurrentIcon');
const followupModeToggleBtn = document.getElementById('followupModeToggleBtn');
const followupModeMenu = document.getElementById('followupModeMenu');
const followupModeCurrentText = document.getElementById('followupModeCurrentText');
const followupModeCurrentIcon = document.getElementById('followupModeCurrentIcon');
const webSearchToggleBtnFollowup = document.getElementById('webSearchToggleBtnFollowup');
const homeModeSequence = ['fast', 'balanced', 'detailed'];
const homeModeCopy = {
  fast: { label: 'Fast', iconClass: 'icon-fast', phClass: 'ph-bold ph-lightning' },
  balanced: { label: 'Balanced', iconClass: 'icon-balanced', phClass: 'ph-bold ph-scales' },
  detailed: { label: 'Detailed', iconClass: 'icon-detailed', phClass: 'ph-bold ph-magnifying-glass' }
};

function syncHomeModeToggle() {
  if (!answerLengthToggleMain) return;
  const value = answerLengthToggleMain.value || 'balanced';
  const mode = homeModeCopy[value] || homeModeCopy.balanced;
  if (homeModeCurrentText) homeModeCurrentText.textContent = mode.label;
  if (homeModeCurrentIcon) {
    homeModeCurrentIcon.className = `home-mode-icon ${mode.iconClass}`;
    homeModeCurrentIcon.innerHTML = `<i class="${mode.phClass}"></i>`;
  }
  if (followupModeCurrentText) followupModeCurrentText.textContent = mode.label;
  if (followupModeCurrentIcon) {
    followupModeCurrentIcon.className = `followup-mode-icon ${mode.iconClass}`;
    followupModeCurrentIcon.innerHTML = `<i class="${mode.phClass}"></i>`;
  }
  homeModeMenu?.querySelectorAll('.home-mode-option').forEach(option => {
    option.classList.toggle('selected', option.dataset.homeMode === value);
  });
  followupModeMenu?.querySelectorAll('.followup-mode-option').forEach(option => {
    option.classList.toggle('selected', option.dataset.homeMode === value);
  });
}

function syncFollowupWebToggle() {
  if (!webSearchToggleBtnFollowup || !webSearchToggleBtnMain) return;
  const isActive = webSearchToggleBtnMain.classList.contains('active');
  webSearchToggleBtnFollowup.classList.toggle('active', isActive);
  webSearchToggleBtnFollowup.title = isActive ? 'Web Search: ON' : 'Web Search: OFF';
  webSearchToggleBtnFollowup.setAttribute('aria-pressed', isActive ? 'true' : 'false');
}

if (homeModeToggleBtn && homeModeMenu && answerLengthToggleMain) {
  syncHomeModeToggle();
  homeModeToggleBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = homeModeMenu.classList.toggle('show');
    homeModeToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  homeModeMenu.querySelectorAll('.home-mode-option').forEach(option => {
    option.addEventListener('click', (event) => {
      event.stopPropagation();
      answerLengthToggleMain.value = homeModeSequence.includes(option.dataset.homeMode)
        ? option.dataset.homeMode
        : 'balanced';
      answerLengthToggleMain.dispatchEvent(new Event('change', { bubbles: true }));
      syncHomeModeToggle();
      homeModeMenu.classList.remove('show');
      homeModeToggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('click', (event) => {
    if (!homeModeMenu.contains(event.target) && !homeModeToggleBtn.contains(event.target)) {
      homeModeMenu.classList.remove('show');
      homeModeToggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

if (webSearchToggleBtnMain) {
  webSearchToggleBtnMain.addEventListener('click', () => {
    webSearchToggleBtnMain.classList.toggle('active');
    webSearchToggleBtnMain.style.color = webSearchToggleBtnMain.classList.contains('active') ? '#2563EB' : '#94A3B8';
    syncFollowupWebToggle();
  });
  webSearchToggleBtnMain.classList.add('active');
  webSearchToggleBtnMain.style.color = '#2563EB';
  syncFollowupWebToggle();
}

if (followupModeToggleBtn && followupModeMenu && answerLengthToggleMain) {
  followupModeToggleBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = followupModeMenu.classList.toggle('show');
    followupModeToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  followupModeMenu.querySelectorAll('.followup-mode-option').forEach(option => {
    option.addEventListener('click', (event) => {
      event.stopPropagation();
      answerLengthToggleMain.value = homeModeSequence.includes(option.dataset.homeMode)
        ? option.dataset.homeMode
        : 'balanced';
      answerLengthToggleMain.dispatchEvent(new Event('change', { bubbles: true }));
      syncHomeModeToggle();
      followupModeMenu.classList.remove('show');
      followupModeToggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('click', (event) => {
    if (!followupModeMenu.contains(event.target) && !followupModeToggleBtn.contains(event.target)) {
      followupModeMenu.classList.remove('show');
      followupModeToggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

if (webSearchToggleBtnFollowup && webSearchToggleBtnMain) {
  webSearchToggleBtnFollowup.addEventListener('click', () => {
    webSearchToggleBtnMain.click();
    syncFollowupWebToggle();
  });
  syncFollowupWebToggle();
}

function syncLearnNetworkToggle() {
  if (!webSearchBtnLearn) return;
  const isActive = webSearchBtnLearn.classList.contains('active');
  webSearchBtnLearn.classList.toggle('network-on', isActive);
  webSearchBtnLearn.classList.toggle('network-off', !isActive);
  webSearchBtnLearn.title = isActive ? 'Web Search: ON' : 'Web Search: OFF';
  webSearchBtnLearn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  webSearchBtnLearn.style.color = '';
}

if (webSearchBtnLearn) {
  webSearchBtnLearn.classList.add('active');
  syncLearnNetworkToggle();
  webSearchBtnLearn.addEventListener('click', () => {
    webSearchBtnLearn.classList.toggle('active');
    syncLearnNetworkToggle();
    if (webSearchToggleBtnLearnPopover) {
      webSearchToggleBtnLearnPopover.classList.toggle('active', webSearchBtnLearn.classList.contains('active'));
      webSearchToggleBtnLearnPopover.style.color = webSearchBtnLearn.classList.contains('active') ? '#2563EB' : '#94A3B8';
    }
  });
}

if (webSearchToggleBtnLearnPopover) {
  webSearchToggleBtnLearnPopover.classList.toggle('active', webSearchBtnLearn?.classList.contains('active'));
  webSearchToggleBtnLearnPopover.style.color = webSearchBtnLearn?.classList.contains('active') ? '#2563EB' : '#94A3B8';
  webSearchToggleBtnLearnPopover.addEventListener('click', () => {
    webSearchBtnLearn?.click();
  });
}

if (webSearchToggleBtnTextbookFocus) {
  webSearchToggleBtnTextbookFocus.classList.toggle('active', webSearchBtnLearn?.classList.contains('active'));
  webSearchToggleBtnTextbookFocus.addEventListener('click', () => {
    webSearchToggleBtnTextbookFocus.classList.toggle('active');
  });
}

if (answerLengthToggleLearnPopover) {
  answerLengthToggleLearnPopover.value = document.getElementById('answerLengthToggleLearn')?.value || 'balanced';
  answerLengthToggleLearnPopover.addEventListener('change', () => {
    const mainSelect = document.getElementById('answerLengthToggleLearn');
    if (mainSelect) mainSelect.value = answerLengthToggleLearnPopover.value;
    syncLearnModeMenu();
  });
}
const answerLengthToggleLearn = document.getElementById('answerLengthToggleLearn');
const learnModeToggleBtn = document.getElementById('learnModeToggleBtn');
const learnModeMenu = document.getElementById('learnModeMenu');
const learnModeCurrentText = document.getElementById('learnModeCurrentText');
const learnModeCurrentIcon = document.getElementById('learnModeCurrentIcon');
const learnModeCopy = {
  fast: { label: 'Fast', iconClass: 'icon-fast', phClass: 'ph-bold ph-lightning' },
  balanced: { label: 'Balanced', iconClass: 'icon-balanced', phClass: 'ph-bold ph-scales' },
  detailed: { label: 'Detailed', iconClass: 'icon-detailed', phClass: 'ph-bold ph-magnifying-glass' }
};

function syncLearnModeMenu() {
  const value = normalizeAnswerStyle(answerLengthToggleLearn?.value || 'balanced');
  if (answerLengthToggleLearn && answerLengthToggleLearn.value !== value) answerLengthToggleLearn.value = value;
  if (learnModeCurrentText) learnModeCurrentText.textContent = learnModeCopy[value]?.label || 'Balanced';
  if (learnModeCurrentIcon) {
    const mode = learnModeCopy[value] || learnModeCopy.balanced;
    learnModeCurrentIcon.className = `edu-mode-icon ${mode.iconClass}`;
    learnModeCurrentIcon.innerHTML = `<i class="${mode.phClass}"></i>`;
  }
  learnModeMenu?.querySelectorAll('.edu-mode-option').forEach(option => {
    option.classList.toggle('selected', option.dataset.learnMode === value);
  });
  if (answerLengthToggleLearnPopover) answerLengthToggleLearnPopover.value = value;
}

answerLengthToggleLearn?.addEventListener('change', () => {
  if (answerLengthToggleLearnPopover) {
    answerLengthToggleLearnPopover.value = answerLengthToggleLearn?.value || 'balanced';
  }
  syncLearnModeMenu();
});

if (learnModeToggleBtn && learnModeMenu) {
  learnModeToggleBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = learnModeMenu.classList.toggle('show');
    learnModeToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  learnModeMenu.querySelectorAll('.edu-mode-option').forEach(option => {
    option.addEventListener('click', (event) => {
      event.stopPropagation();
      if (answerLengthToggleLearn) {
        answerLengthToggleLearn.value = normalizeAnswerStyle(option.dataset.learnMode || 'balanced');
        answerLengthToggleLearn.dispatchEvent(new Event('change', { bubbles: true }));
      }
      learnModeMenu.classList.remove('show');
      learnModeToggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    if (!learnModeMenu.contains(event.target) && !learnModeToggleBtn.contains(event.target)) {
      learnModeMenu.classList.remove('show');
      learnModeToggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

syncLearnModeMenu();

if (answerLengthToggleTextbookFocus) {
  answerLengthToggleTextbookFocus.value = document.getElementById('answerLengthToggleLearn')?.value || 'balanced';
}

if (answerLengthToggleMain) {
  answerLengthToggleMain.value = 'balanced';
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
function normalizeRecentConversationTimestamp(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : String(value ?? '');
}

function loadRecentConversations() {
  const saved = localStorage.getItem('tutorRecentSessions');
  if (saved) {
    try {
      return (JSON.parse(saved) || []).map(session => ({
        ...session,
        timestamp: normalizeRecentConversationTimestamp(session.timestamp),
        lessonMarkdown: forceB8TextbookOnlyLesson(session.sectionId, session.sectionTitle, session.lessonMarkdown || '')
      }));
    } catch(e) {}
  }
  return [];
}

function saveRecentConversations(sessions) {
  localStorage.setItem('tutorRecentSessions', JSON.stringify(Array.isArray(sessions) ? sessions.map(session => ({
    ...session,
    timestamp: normalizeRecentConversationTimestamp(session.timestamp),
    lessonMarkdown: forceB8TextbookOnlyLesson(session.sectionId, session.sectionTitle, session.lessonMarkdown || '')
  })) : []));
}

async function rebuildUserMemoryFromRemainingSessions(sessions) {
  const uid = getUid();
  if (!uid) return;
  try {
    const res = await fetch(`${API_BASE}/api/memory/rebuild`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid, sessions })
    });
    const data = await res.json();
    if (res.ok && data && data.memory) {
      userMemory = data.memory;
      if (userMemory && userMemory.quiz) {
        localStorage.setItem('tutorQuiz', JSON.stringify(userMemory.quiz));
      }
      renderUserBadge();
    }
  } catch (err) {
    console.warn('[recentConversations] failed to rebuild user memory:', err);
  }
}

function summarizeRecentConversation(history = [], sectionTitle = '') {
  const cleaned = (history || [])
    .filter(m => m && typeof m.content === 'string' && m.content.trim())
    .map(m => ({ role: m.role, content: m.content.replace(/\s+/g, ' ').trim() }));

  const userMsgs = cleaned.filter(m => m.role === 'user').map(m => m.content);
  const assistantMsgs = cleaned.filter(m => m.role === 'assistant').map(m => m.content);
  const firstUser = userMsgs[0] || '';
  const lastUser = userMsgs[userMsgs.length - 1] || '';
  const lastAssistant = assistantMsgs[assistantMsgs.length - 1] || '';

  const stripMarkdown = (text) => String(text || '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]+\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[>*_~\-]+/g, ' ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$[^$]+\$/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const compact = (text, max = 52) => {
    const normalized = stripMarkdown(text).replace(/^[::,,.。!?!?\---\s]+/, '').trim();
    if (!normalized) return '';
    return normalized.length > max ? normalized.slice(0, max).trim() + '...' : normalized;
  };

  const pickSentence = (text) => {
    const normalized = stripMarkdown(text);
    if (!normalized) return '';
    const parts = normalized.split(/(?<=[。!?.!?])\s+|\n+/).map(s => s.trim()).filter(Boolean);
    return compact(parts[0] || normalized);
  };

  const sectionPrefix = sectionTitle ? `${sectionTitle} · ` : '';

  if (lastAssistant) {
    const sentence = pickSentence(lastAssistant);
    if (sentence) return compact(sectionPrefix + sentence, 64);
  }
  if (lastUser && lastUser !== firstUser) {
    return compact(sectionPrefix + lastUser, 64);
  }
  if (firstUser) {
    return compact(sectionPrefix + firstUser, 64);
  }
  return compact(sectionPrefix + 'Saved conversation', 64) || 'Saved conversation';
}

const performDeleteRecentConversationImpl = async (timestamp) => {
  const normalizedTs = normalizeRecentConversationTimestamp(timestamp);
  pushRecentConversationDebug('delete:start', {
    normalizedTs,
    type: typeof normalizedTs,
    currentSessionStartTime: normalizeRecentConversationTimestamp(tutorState.sessionStartTime || 0)
  });
  deletedRecentConversationTimestamps.add(normalizedTs);

  const allSessions = loadRecentConversations();
  pushRecentConversationDebug('delete:before-filter', {
    count: allSessions.length,
    timestamps: allSessions.map(s => normalizeRecentConversationTimestamp(s.timestamp))
  });

  const sessions = allSessions.filter(s => normalizeRecentConversationTimestamp(s.timestamp) !== normalizedTs);
  pushRecentConversationDebug('delete:after-filter', {
    count: sessions.length,
    timestamps: sessions.map(s => normalizeRecentConversationTimestamp(s.timestamp))
  });

  if (normalizeRecentConversationTimestamp(tutorState.sessionStartTime || 0) === normalizedTs) {
    pushRecentConversationDebug('delete:clear-current-session', { normalizedTs });
    tutorState.learnHistory = [];
    tutorState.sessionStartTime = normalizedTs;
  }
  if (normalizeRecentConversationTimestamp(tutorState.chatSessionStartTime || 0) === normalizedTs) {
    pushRecentConversationDebug('delete:clear-current-main-session', { normalizedTs });
    tutorState.chatHistory = [];
    tutorState.chatSessionStartTime = Date.now();
  }

  saveRecentConversations(sessions);
  pushRecentConversationDebug('delete:after-save', {
    count: loadRecentConversations().length,
    deletedSet: Array.from(deletedRecentConversationTimestamps)
  });
  updateRecentConversationsUI();
  pushRecentConversationDebug('delete:after-ui-update', {});
  await rebuildUserMemoryFromRemainingSessions(sessions);
  pushRecentConversationDebug('delete:after-memory-rebuild', {
    count: loadRecentConversations().length
  });
};

window.toggleRecentConversationStar = function(timestamp) {
  const normalizedTs = normalizeRecentConversationTimestamp(timestamp);
  const sessions = loadRecentConversations();
  const next = sessions.map(session => normalizeRecentConversationTimestamp(session.timestamp) === normalizedTs ? { ...session, starred: !session.starred } : session);
  next.sort((a, b) => {
    if (!!b.starred !== !!a.starred) return Number(!!b.starred) - Number(!!a.starred);
    return (b.timestamp || 0) - (a.timestamp || 0);
  });
  saveRecentConversations(next);
  updateRecentConversationsUI();
};

window.renameRecentConversation = function(timestamp) {
  const normalizedTs = normalizeRecentConversationTimestamp(timestamp);
  const sessions = loadRecentConversations();
  const session = sessions.find(s => normalizeRecentConversationTimestamp(s.timestamp) === normalizedTs);
  if (!session) return;
  const currentTitle = session.customTitle || session.summaryTitle || session.title || '';
  const renamed = window.prompt('Rename this conversation', currentTitle);
  if (renamed == null) return;
  const cleanTitle = String(renamed).trim();
  const next = sessions.map(s => normalizeRecentConversationTimestamp(s.timestamp) === normalizedTs
    ? { ...s, customTitle: cleanTitle || '', summaryTitle: cleanTitle || summarizeRecentConversation(s.history || [], s.sectionTitle || ''), title: cleanTitle || summarizeRecentConversation(s.history || [], s.sectionTitle || '') }
    : s
  );
  saveRecentConversations(next);
  updateRecentConversationsUI();
};

window.deleteRecentConversation = function(timestamp) {
  pushRecentConversationDebug('delete:entry-via-window', { timestamp });
  showDeleteConversationConfirm(timestamp);
};

window.performDeleteRecentConversation = function(timestamp) {
  pushRecentConversationDebug('delete:entry-via-window-perform', { timestamp });
  return performDeleteRecentConversationImpl(timestamp);
};

function buildRecentConversationSnapshot(source = 'unknown') {
  const sourceKey = String(source || '');
  const answerVisible = answerScreen && !answerScreen.classList.contains('hidden');
  const shouldUseMain = sourceKey.startsWith('answer:') || sourceKey.startsWith('main:') || (answerVisible && (tutorState.chatHistory || []).length >= 2);
  const history = shouldUseMain ? tutorState.chatHistory : tutorState.learnHistory;
  if (!history || history.length < 2) return null;

  const timestamp = shouldUseMain
    ? normalizeRecentConversationTimestamp(tutorState.chatSessionStartTime || Date.now())
    : normalizeRecentConversationTimestamp(tutorState.sessionStartTime || Date.now());
  const sectionId = shouldUseMain ? 'general-qa' : (tutorState.learnSectionId || '');
  const sectionTitle = shouldUseMain ? 'General Q&A' : (tutorState.learnSectionTitle || 'Saved Conversation');
  const lessonMarkdown = shouldUseMain ? '' : (tutorState.learnLessonMarkdown || '');
  const bookPages = shouldUseMain ? (tutorState.currentBookPages || []) : (tutorState.learnBookPages || []);
  const webSources = shouldUseMain ? (tutorState.currentWebSources || []) : (tutorState.learnWebSources || []);
  const attachments = shouldUseMain ? cloneAttachmentSourcesForStorage(activeMainAttachmentSources) : [];

  return {
    origin: shouldUseMain ? 'main' : 'learn',
    history,
    timestamp,
    sectionId,
    sectionTitle,
    lessonMarkdown,
    bookPages,
    webSources,
    attachments,
    sessionId: `${shouldUseMain ? 'main' : sectionId || 'learn'}-${timestamp}`
  };
}

function saveCurrentLearnSession(source = 'unknown') {
  const snapshot = buildRecentConversationSnapshot(source);
  if (!snapshot) {
    pushRecentConversationDebug('save:skipped-history-too-short', {
      source,
      learnHistoryLength: tutorState.learnHistory ? tutorState.learnHistory.length : 0,
      chatHistoryLength: tutorState.chatHistory ? tutorState.chatHistory.length : 0
    });
    return;
  }
  
  let sessions = loadRecentConversations();
  
  // if current session already exists in top, replace it to update history
  const normalizedSessionTs = snapshot.timestamp;
  const sessionId = snapshot.sessionId;
  const existingIdx = sessions.findIndex(s => normalizeRecentConversationTimestamp(s.timestamp) === normalizedSessionTs || s.id === sessionId);
  if (deletedRecentConversationTimestamps.has(normalizedSessionTs)) {
    pushRecentConversationDebug('save:blocked-by-deleted-set', {
      source,
      normalizedSessionTs,
      deletedSet: Array.from(deletedRecentConversationTimestamps)
    });
    return;
  }
  pushRecentConversationDebug('save:proceed', {
    source,
    origin: snapshot.origin,
    normalizedSessionTs,
    historyLength: snapshot.history.length,
    existingIdx,
    sessionId
  });

  const generatedTitle = summarizeRecentConversation(snapshot.history, snapshot.sectionTitle);
  const existingSession = existingIdx !== -1 ? sessions[existingIdx] : null;
  const displayTitle = existingSession && existingSession.customTitle ? existingSession.customTitle : generatedTitle;

  const currentSession = {
    id: sessionId,
    origin: snapshot.origin,
    title: displayTitle,
    summaryTitle: displayTitle,
    customTitle: existingSession?.customTitle || '',
    starred: !!existingSession?.starred,
    timestamp: normalizedSessionTs,
    sectionId: snapshot.sectionId,
    sectionTitle: snapshot.sectionTitle,
    lessonMarkdown: snapshot.lessonMarkdown,
    bookPages: snapshot.bookPages,
    webSources: snapshot.webSources,
    attachments: snapshot.attachments,
    history: JSON.parse(JSON.stringify(snapshot.history))
  };

  if (existingIdx !== -1) {
    sessions[existingIdx] = currentSession;
  } else {
    sessions.unshift(currentSession);
    if (snapshot.origin === 'main') tutorState.chatSessionStartTime = normalizedSessionTs;
    else tutorState.sessionStartTime = normalizedSessionTs;
  }

  sessions = sessions.slice(0, 30); // max 30
  saveRecentConversations(sessions);
  updateRecentConversationsUI();
}

window.loadHistoricalSession = function(timestamp) {
  const normalizedTs = normalizeRecentConversationTimestamp(timestamp);
  const sessions = loadRecentConversations();
  const session = sessions.find(s => normalizeRecentConversationTimestamp(s.timestamp) === normalizedTs);
  if (!session) return;

  try {
    // Stop ongoing flows and save current before switching
    saveCurrentLearnSession('loadHistoricalSession:before-switch');
    if (window.loadingTimerLearn) clearInterval(window.loadingTimerLearn);
    if (learnAbort) learnAbort.abort();

    const sessionOrigin = session.origin || (session.sectionId === 'general-qa' ? 'main' : 'learn');
    if (sessionOrigin === 'main') {
      if (currentAbortController) currentAbortController.abort();
      currentAbortController = null;
      stopBtn.classList.add('hidden');
      if (loadingTimer) clearInterval(loadingTimer);

      tutorState.chatHistory = JSON.parse(JSON.stringify(session.history || []));
      tutorState.chatSessionStartTime = session.timestamp;
      tutorState.currentBookPages = Array.isArray(session.bookPages) ? session.bookPages : [];
      tutorState.currentWebSources = Array.isArray(session.webSources) ? session.webSources : [];
      const restoredAttachments = cloneAttachmentSourcesForStorage(session.attachments || []);

      const lastUser = [...tutorState.chatHistory].reverse().find(m => m.role === 'user')?.content || session.title || 'Saved conversation';
      showAnswer(lastUser);
      stepsBar.classList.add('hidden');
      setStatus('Restored', 'done');
      if (restoredAttachments.length) {
        attachmentCompareOpen = true;
        activeMainAttachmentIndex = 0;
        renderAttachmentSourcePanel(restoredAttachments);
      } else {
        clearAttachmentSourcePanel();
      }
      renderBookPages(tutorState.currentBookPages);
      renderBookSources(tutorState.currentBookPages);
      renderWebSources(tutorState.currentWebSources);
      renderWebSourcesInline(tutorState.currentWebSources);
      updateReferencesSummary(tutorState.currentBookPages.length, tutorState.currentWebSources.length);
      setReferencesOpen(false);
      renderMainConversationThread();
      return;
    }

    tutorState.learnSectionId = session.sectionId || '';
    tutorState.learnSectionTitle = session.sectionTitle || 'Saved Conversation';
    tutorState.learnLessonMarkdown = forceB8TextbookOnlyLesson(
      tutorState.learnSectionId,
      tutorState.learnSectionTitle,
      session.lessonMarkdown || ''
    );
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
        setLearnLessonContent(markdownToHtml(tutorState.learnLessonMarkdown || 'No explanation available.'));
      } catch (renderErr) {
        console.warn('[loadHistoricalSession] lesson render failed:', renderErr);
        contentEl.innerHTML = `<div class="error-box"><strong>Failed to render saved lesson</strong><p>${escapeHtml(renderErr.message || String(renderErr))}</p></div>`;
      }
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
          const targets = [learnExplainContent, chatContent].filter(Boolean);
          window.MathJax.typesetPromise(targets).catch(() => {});
        }
        buildTocFromContent(learnExplainContent);
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

  let sessions = loadRecentConversations();
  let changed = false;
  sessions = sessions.map(session => {
    const computedTitle = session.customTitle || summarizeRecentConversation(session.history || [], session.sectionTitle || '');
    if (session.summaryTitle !== computedTitle || session.title !== computedTitle) {
      changed = true;
      return { ...session, title: computedTitle, summaryTitle: computedTitle };
    }
    return session;
  });
  sessions.sort((a, b) => {
    if (!!b.starred !== !!a.starred) return Number(!!b.starred) - Number(!!a.starred);
    return (b.timestamp || 0) - (a.timestamp || 0);
  });
  if (changed) saveRecentConversations(sessions);

  container.innerHTML = '';

  if (!sessions.length) {
    const empty = document.createElement('div');
    empty.style.opacity = '0.55';
    empty.style.fontStyle = 'italic';
    empty.style.color = '#222';
    empty.style.fontSize = '12px';
    empty.textContent = 'No saved conversations yet.';
    container.appendChild(empty);
    return;
  }

  sessions.forEach((session) => {
    const fullTitle = session.summaryTitle || session.title || 'Saved conversation';
    const displayTitle = fullTitle.length > 24 ? fullTitle.slice(0, 24) + '...' : fullTitle;
    const fullSectionTitle = session.sectionTitle || 'General';

    const dt = new Date(session.timestamp);
    const dateStr = dt.getMonth() + 1 + '/' + dt.getDate();
    const timeStr = dt.getHours() + ':' + String(dt.getMinutes()).padStart(2, '0');

    const card = document.createElement('div');
    card.title = fullTitle;
    card.setAttribute('aria-label', `Open conversation: ${fullTitle}`);
    card.className = 'sidebar-recent-item';
    card.addEventListener('click', () => {
      window.loadHistoricalSession(session.timestamp);
    });

    const topRow = document.createElement('div');
    topRow.className = 'sidebar-recent-top';

    const title = document.createElement('div');
    title.className = 'sidebar-recent-title';
    title.textContent = `${session.starred ? '★ ' : ''}${displayTitle}`;
    title.title = fullTitle;

    const menuBtn = document.createElement('button');
    menuBtn.type = 'button';
    menuBtn.setAttribute('aria-label', 'Conversation actions');
    menuBtn.title = 'Conversation actions';
    menuBtn.textContent = '⋯';
    menuBtn.className = 'sidebar-recent-menu';
    menuBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      window.openRecentConversationMenu(session.timestamp, menuBtn);
    });

    topRow.appendChild(title);
    topRow.appendChild(menuBtn);

    const metaRow = document.createElement('div');
    metaRow.className = 'sidebar-recent-meta';

    const sectionSpan = document.createElement('span');
    sectionSpan.className = 'sidebar-recent-section';
    sectionSpan.textContent = fullSectionTitle;
    sectionSpan.title = fullSectionTitle;
    const dateSpan = document.createElement('span');
    dateSpan.className = 'sidebar-recent-date';
    dateSpan.textContent = `${dateStr} ${timeStr}`;

    metaRow.appendChild(sectionSpan);
    metaRow.appendChild(dateSpan);

    card.appendChild(topRow);
    card.appendChild(metaRow);
    container.appendChild(card);
  });
}

// Hook it into existing updateRecentConversations calls smoothly
function updateRecentConversations(source = 'unknown') {
  pushRecentConversationDebug('updateRecentConversations:called', { source });
  saveCurrentLearnSession(source);
  updateRecentConversationsUI();
}

// Learn QA final visual override. Keep this at file end so runtime style injections do not win.
(function injectFinalLearnQAFinalFramekiller() {
  if (document.getElementById('final-learn-qa-framekiller-style')) return;
  const style = document.createElement('style');
  style.id = 'final-learn-qa-framekiller-style';
  style.textContent = `
    #learnView #learnChatCol,
    #learnView #learnBody:not(.chapter-overview-active) #learnChatCol,
    #learnView #learnBody.chapter-overview-split-active #learnChatCol,
    #learnView #learnBody[data-panel-focus="normal"] #learnChatCol,
    #learnView #learnBody[data-panel-focus="qa-wide"] #learnChatCol,
    #learnView #learnBody[data-panel-focus="qa-full"] #learnChatCol {
      position: relative !important;
      isolation: isolate !important;
      display: flex !important;
      flex-direction: column !important;
      min-width: 0 !important;
      min-height: 0 !important;
      padding: 0 !important;
      gap: 0 !important;
      overflow: hidden !important;
      border: 0 !important;
      border-left: 0 !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      background: var(--theme-page-surface-soft) !important;
      background-image: var(--theme-page-surface-soft) !important;
    }

    #learnView #learnBody.chat-collapsed #learnChatCol {
      display: none !important;
      width: 0 !important;
      min-width: 0 !important;
      max-width: 0 !important;
      padding: 0 !important;
      margin: 0 !important;
      border: 0 !important;
      box-shadow: none !important;
      background: none !important;
      background-image: none !important;
      opacity: 0 !important;
      pointer-events: none !important;
      overflow: hidden !important;
    }

    #learnView #learnBody.chat-collapsed #learnChatCol::before,
    #learnView #learnBody.chat-collapsed #learnChatCol::after,
    #learnView #learnChatCol::before,
    #learnView #learnChatCol::after {
      content: none !important;
      display: none !important;
    }

    #learnView #learnChatCol .ambient-background,
    #learnView #learnChatCol .orb-edu-blue,
    #learnView #learnChatCol .orb-edu-green,
    #learnView #learnChatCol .learn-chat-topbar {
      display: none !important;
    }

    #learnView #learnChatCol .learn-chat-scroll,
    #learnView #learnChatCol.is-chat-active #learnChatScroll,
    #learnView #learnChatScroll.is-chat-active {
      position: relative !important;
      z-index: 1 !important;
      flex: 1 1 auto !important;
      width: 100% !important;
      max-width: none !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: clamp(96px, 14vh, 156px) clamp(24px, 5vw, 72px) 24px !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: stretch !important;
      justify-content: center !important;
      overflow-y: auto !important;
      overflow-x: visible !important;
      background: transparent !important;
      background-image: none !important;
      border: 0 !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }

    #learnView #learnChatCol .learn-chat-empty-state,
    #learnView #learnChatCol #learnChatEmptyState,
    #learnView #learnChatCol .edu-tutor-empty {
      position: relative !important;
      inset: auto !important;
      z-index: 2 !important;
      width: 100% !important;
      max-width: none !important;
      min-height: 0 !important;
      height: auto !important;
      margin: auto 0 !important;
      padding: 0 !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 0 !important;
      text-align: center !important;
      color: #0f172a !important;
      background: transparent !important;
      background-image: none !important;
      border: 0 !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      pointer-events: none !important;
    }

    #learnView #learnChatCol #learnChatEmptyState.hidden,
    #learnView #learnChatCol.is-chat-active #learnChatEmptyState,
    #learnView #learnChatCol.is-chat-active .learn-chat-empty-state {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
      width: 0 !important;
      height: 0 !important;
      min-height: 0 !important;
      padding: 0 !important;
      margin: 0 !important;
    }

    #learnView #learnChatCol .widget-icon {
      width: 28px !important;
      height: 28px !important;
      margin: 0 0 18px !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      color: #0284c7 !important;
      background: transparent !important;
      border: 0 !important;
      box-shadow: none !important;
    }

    #learnView #learnChatCol .qa-hero-icon,
    #learnView #learnChatCol .qa-hero-icon svg {
      width: 28px !important;
      height: 28px !important;
      display: block !important;
    }

    #learnView #learnChatCol .empty-title {
      margin: 0 !important;
      color: #0f172a !important;
      font-family: "Source Serif 4", "Bricolage Grotesque", "Inter", sans-serif !important;
      font-size: clamp(24px, 2vw, 30px) !important;
      line-height: 1.14 !important;
      font-weight: 650 !important;
      letter-spacing: 0 !important;
    }

    #learnView #learnChatCol .empty-subtitle {
      margin: 12px 0 0 !important;
      max-width: 560px !important;
      color: #64748b !important;
      font-size: clamp(13px, 0.92vw, 16px) !important;
      line-height: 1.45 !important;
      font-weight: 500 !important;
      letter-spacing: 0 !important;
    }

    #learnView #learnChatCol .tag-group {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      flex-wrap: wrap !important;
      gap: 10px !important;
      margin-top: 16px !important;
    }

    #learnView #learnChatCol .edu-tag {
      min-height: 30px !important;
      display: inline-flex !important;
      align-items: center !important;
      gap: 6px !important;
      padding: 0 13px !important;
      border: 2px solid rgba(255, 255, 255, 0.92) !important;
      border-radius: 999px !important;
      background: rgba(255, 255, 255, 0.62) !important;
      box-shadow: 0 1px 0 rgba(255, 255, 255, 0.92) inset !important;
      font-size: clamp(12px, 0.82vw, 14px) !important;
      font-weight: 750 !important;
      line-height: 1 !important;
      letter-spacing: 0 !important;
      text-transform: none !important;
    }

    #learnView #learnChatCol .edu-tag svg,
    #learnView #learnChatCol .edu-tag .qa-inline-icon,
    #learnView #learnChatCol .edu-tag .qa-inline-icon svg {
      width: 14px !important;
      height: 14px !important;
      margin: 0 !important;
    }

    #learnView #learnChatCol .tag-formula { color: #0369a1 !important; }
    #learnView #learnChatCol .tag-screenshot { color: #7e22ce !important; }
    #learnView #learnChatCol .tag-trap { color: #c2410c !important; }

    #learnView #learnChatCol #learnFollowupBar,
    #learnView #learnBody #learnChatCol #learnFollowupBar,
    #learnView #learnBody[data-panel-focus] #learnChatCol #learnFollowupBar,
    #learnView #learnChatCol #learnFollowupBar:focus-within {
      position: relative !important;
      z-index: 3 !important;
      width: min(820px, calc(100% - 36px)) !important;
      max-width: 820px !important;
      min-height: 112px !important;
      margin: 0 auto clamp(14px, 2.4vh, 26px) !important;
      padding: 14px 18px 16px !important;
      display: block !important;
      overflow: visible !important;
      border: 1px solid rgba(255, 255, 255, 0.66) !important;
      border-radius: 18px !important;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.46), rgba(255, 255, 255, 0.18)) !important;
      background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.46), rgba(255, 255, 255, 0.18)) !important;
      box-shadow:
        0 30px 78px rgba(20, 118, 156, 0.16),
        0 12px 30px rgba(15, 23, 42, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.86),
        inset 0 -1px 0 rgba(255, 255, 255, 0.22) !important;
      backdrop-filter: blur(34px) saturate(190%) brightness(1.05) !important;
      -webkit-backdrop-filter: blur(34px) saturate(190%) brightness(1.05) !important;
    }

    #learnView #learnChatCol #learnFollowupBar::before,
    #learnView #learnChatCol #learnFollowupBar::after {
      content: "" !important;
      position: absolute !important;
      inset: 1px !important;
      border-radius: inherit !important;
      pointer-events: none !important;
      background:
        linear-gradient(135deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.10) 42%, rgba(255, 255, 255, 0.34) 100%) !important;
      opacity: 0.46 !important;
      mix-blend-mode: screen !important;
    }

    #learnView #learnChatCol #learnFollowupBar::after {
      inset: 0 !important;
      background:
        radial-gradient(520px 120px at 18% 0%, rgba(255, 255, 255, 0.48), transparent 70%),
        radial-gradient(420px 120px at 92% 100%, rgba(255, 255, 255, 0.22), transparent 72%) !important;
      opacity: 0.72 !important;
    }

    #learnView #learnChatCol #learnFollowupBar .attach-preview,
    #learnView #learnChatCol #learnFollowupBar .input-wrapper,
    #learnView #learnChatCol #learnFollowupBar .bottom-actions {
      position: relative !important;
      z-index: 1 !important;
    }

    #learnView #learnChatCol #learnFollowupBar .input-wrapper,
    #learnView #learnChatCol #learnFollowupBar .input-wrapper:focus-within {
      display: grid !important;
      grid-template-columns: 40px minmax(0, 1fr) 40px !important;
      align-items: center !important;
      gap: 10px !important;
      width: 100% !important;
      min-height: 44px !important;
      margin: 0 !important;
      padding: 0 !important;
      background: transparent !important;
      background-image: none !important;
      border: 0 !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      outline: 0 !important;
    }

    #learnView #learnChatCol #learnFollowupBar .btn-clip,
    #learnView #learnChatCol #learnFollowupBar .btn-send {
      width: 38px !important;
      min-width: 38px !important;
      height: 38px !important;
      min-height: 38px !important;
      padding: 0 !important;
      border-radius: 12px !important;
      box-shadow: none !important;
      transform: none !important;
    }

    #learnView #learnChatCol #learnFollowupBar .btn-clip {
      color: #94a3b8 !important;
      background: transparent !important;
      border: 0 !important;
    }

    #learnView #learnChatCol #learnFollowupBar .btn-send {
      position: relative !important;
      top: auto !important;
      right: auto !important;
      color: #ffffff !important;
      border: 1px solid rgba(255, 255, 255, 0.46) !important;
      background: linear-gradient(135deg, rgba(14, 165, 233, 0.78), rgba(37, 99, 235, 0.58)) !important;
      box-shadow: 0 14px 28px rgba(14, 165, 233, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.42) !important;
      backdrop-filter: blur(18px) saturate(160%) !important;
      -webkit-backdrop-filter: blur(18px) saturate(160%) !important;
    }

    #learnView #learnChatCol #learnFollowupBar .input-field {
      min-height: 40px !important;
      max-height: 96px !important;
      padding: 8px 6px !important;
      color: #0f172a !important;
      font-size: clamp(14px, 0.95vw, 16px) !important;
      font-weight: 500 !important;
      line-height: 1.35 !important;
      background: transparent !important;
      border: 0 !important;
      outline: 0 !important;
      box-shadow: none !important;
      resize: none !important;
    }

    #learnView #learnChatCol #learnFollowupBar .input-field::placeholder {
      color: #94a3b8 !important;
      font-weight: 600 !important;
    }

    #learnView #learnChatCol #learnFollowupBar .bottom-actions {
      display: flex !important;
      align-items: center !important;
      justify-content: flex-end !important;
      gap: 10px !important;
      flex-wrap: wrap !important;
      margin-top: 8px !important;
      padding: 0 !important;
      overflow: visible !important;
    }

    #learnView #learnChatCol #learnFollowupBar .edu-mode-toggle,
    #learnView #learnChatCol #learnFollowupBar #webSearchToggleBtnLearn {
      height: 38px !important;
      min-height: 38px !important;
      padding: 0 15px !important;
      border: 1px solid rgba(255, 255, 255, 0.62) !important;
      border-radius: 14px !important;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.50), rgba(255, 255, 255, 0.22)) !important;
      background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.50), rgba(255, 255, 255, 0.22)) !important;
      box-shadow:
        0 14px 34px rgba(148, 47, 62, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.78),
        inset 0 -1px 0 rgba(255, 255, 255, 0.18) !important;
      backdrop-filter: blur(22px) saturate(175%) !important;
      -webkit-backdrop-filter: blur(22px) saturate(175%) !important;
    }

    #learnView #learnChatCol #learnFollowupBar .edu-mode-toggle {
      color: #475569 !important;
      gap: 6px !important;
    }

    #learnView #learnChatCol #learnFollowupBar #webSearchToggleBtnLearn {
      width: 44px !important;
      min-width: 44px !important;
      padding: 0 !important;
    }

    #learnView #learnChatCol .edu-mode-menu {
      width: min(292px, calc(100vw - 48px)) !important;
      min-width: 256px !important;
      right: 58px !important;
      bottom: calc(100% + 14px) !important;
      padding: 10px !important;
      border-radius: 22px !important;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.58), rgba(255, 255, 255, 0.24)) !important;
      background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.58), rgba(255, 255, 255, 0.24)) !important;
      backdrop-filter: blur(30px) saturate(190%) brightness(1.05) !important;
      -webkit-backdrop-filter: blur(30px) saturate(190%) brightness(1.05) !important;
      border: 1px solid rgba(255, 255, 255, 0.68) !important;
      box-shadow:
        0 26px 62px rgba(20, 118, 156, 0.18),
        0 10px 26px rgba(15, 23, 42, 0.10),
        inset 0 1px 0 rgba(255, 255, 255, 0.86),
        inset 0 -1px 0 rgba(255, 255, 255, 0.20) !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 7px !important;
      opacity: 0 !important;
      pointer-events: none !important;
      transform: translateY(10px) scale(0.96) !important;
      transform-origin: bottom right !important;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
      z-index: 300 !important;
    }

    #learnView #learnChatCol .edu-mode-menu.show {
      opacity: 1 !important;
      pointer-events: auto !important;
      transform: translateY(0) scale(1) !important;
    }

    #learnView #learnChatCol .edu-mode-option {
      width: 100% !important;
      display: flex !important;
      align-items: flex-start !important;
      gap: 13px !important;
      min-height: 66px !important;
      padding: 12px 14px !important;
      border: 1px solid transparent !important;
      border-radius: 16px !important;
      background: transparent !important;
      text-align: left !important;
      cursor: pointer !important;
      transition: all 0.2s ease !important;
    }

    #learnView #learnChatCol .edu-mode-option:hover:not(.selected) {
      border-color: rgba(255, 255, 255, 0.42) !important;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.38), rgba(255, 255, 255, 0.14)) !important;
    }

    #learnView #learnChatCol .edu-mode-option.selected {
      border-color: rgba(255, 255, 255, 0.58) !important;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.54), rgba(224, 242, 254, 0.36)) !important;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.78),
        0 10px 24px rgba(14, 165, 233, 0.10) !important;
    }

    #learnView #learnChatCol .edu-mode-icon {
      width: 20px !important;
      min-width: 20px !important;
      height: 20px !important;
      min-height: 20px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      font-size: 20px !important;
      line-height: 1 !important;
      flex-shrink: 0 !important;
    }

    #learnView #learnChatCol .edu-mode-icon i {
      display: block !important;
      font-size: 20px !important;
      line-height: 1 !important;
    }

    #learnView #learnChatCol .icon-fast { color: #f59e0b !important; }
    #learnView #learnChatCol .icon-balanced { color: #0284c7 !important; }
    #learnView #learnChatCol .icon-detailed { color: #8b5cf6 !important; }

    #learnView #learnChatCol .edu-mode-text {
      display: flex !important;
      flex-direction: column !important;
      gap: 4px !important;
      min-width: 0 !important;
    }

    #learnView #learnChatCol .edu-mode-text strong {
      color: #0f172a !important;
      font-size: 14px !important;
      font-weight: 700 !important;
      line-height: 1.16 !important;
    }

    #learnView #learnChatCol .edu-mode-text small {
      color: #64748b !important;
      font-size: 12px !important;
      font-weight: 500 !important;
      line-height: 1.3 !important;
    }

    #learnView #learnChatCol #learnFollowupBar .edu-mode-toggle:hover {
      color: #0284c7 !important;
      border-color: #bae6fd !important;
      box-shadow: 0 4px 8px rgba(2, 132, 199, 0.08) !important;
    }

    #learnView #learnChatCol #webSearchToggleBtnLearn.network-on,
    #learnView #learnChatCol .network-on {
      background: #e0f2fe !important;
      border-color: #bae6fd !important;
      color: #0284c7 !important;
      box-shadow: 0 2px 8px rgba(2, 132, 199, 0.15) !important;
    }

    #learnView #learnChatCol #webSearchToggleBtnLearn.network-off,
    #learnView #learnChatCol .network-off {
      background: rgba(255, 255, 255, 0.4) !important;
      border-color: transparent !important;
      color: #94a3b8 !important;
      box-shadow: none !important;
    }

    #learnView #learnChatCol #webSearchToggleBtnLearn .qa-inline-icon,
    #learnView #learnChatCol #learnModeCurrentIcon {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      line-height: 1 !important;
      transform: none !important;
    }

    #learnView #learnChatCol.is-chat-active {
      padding: 0 0 18px !important;
      overflow: hidden !important;
    }

    #learnView #learnChatCol.is-chat-active #learnChatScroll {
      justify-content: flex-start !important;
      padding-top: 24px !important;
      padding-inline: 0 !important;
    }

    #learnView #learnChatCol.is-chat-active #learnChatContent {
      display: flex !important;
      flex: 1 1 auto !important;
      width: 100% !important;
      max-width: none !important;
      min-height: 0 !important;
      margin: 0 !important;
      align-self: stretch !important;
      justify-content: flex-start !important;
      align-items: stretch !important;
      gap: 18px !important;
      box-sizing: border-box !important;
      padding: 0 clamp(24px, 4vw, 48px) 18px !important;
    }

    #learnView #learnChatContent.is-chat-active .followup-bubble,
    #learnView #learnChatCol.is-chat-active #learnChatContent .followup-bubble {
      width: 100% !important;
      margin: 0 !important;
    }

    #learnView #learnChatCol.is-chat-active .followup-bubble::before,
    #learnView #learnChatCol.is-chat-active .followup-bubble .fub-a::before {
      content: none !important;
      display: none !important;
    }

    #learnView #learnChatCol.is-chat-active .followup-bubble .fub-a {
      padding: 0 !important;
      border: 0 !important;
      border-radius: 0 !important;
      background: transparent !important;
      background-image: none !important;
      box-shadow: none !important;
      overflow: visible !important;
    }

    #learnView#learnView #learnBody#learnBody #learnChatCol#learnChatCol #learnFollowupBar#learnFollowupBar,
    #learnView#learnView #learnBody#learnBody:not(.explain-collapsed):not(.chat-collapsed) #learnChatCol#learnChatCol #learnFollowupBar#learnFollowupBar,
    #learnView#learnView #learnBody#learnBody.explain-collapsed:not(.chat-collapsed) #learnChatCol#learnChatCol #learnFollowupBar#learnFollowupBar,
    #learnView#learnView #learnBody#learnBody[data-panel-focus="normal"] #learnChatCol#learnChatCol #learnFollowupBar#learnFollowupBar,
    #learnView#learnView #learnBody#learnBody[data-panel-focus="qa-wide"] #learnChatCol#learnChatCol #learnFollowupBar#learnFollowupBar,
    #learnView#learnView #learnBody#learnBody[data-panel-focus="qa-full"] #learnChatCol#learnChatCol #learnFollowupBar#learnFollowupBar {
      position: relative !important;
      width: min(820px, calc(100% - 36px)) !important;
      max-width: 820px !important;
      min-height: 112px !important;
      margin: 0 auto clamp(14px, 2.4vh, 26px) !important;
      padding: 14px 18px 16px !important;
      display: block !important;
      overflow: visible !important;
      border: 1px solid rgba(255, 255, 255, 0.66) !important;
      border-radius: 18px !important;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.46), rgba(255, 255, 255, 0.18)) !important;
      background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.46), rgba(255, 255, 255, 0.18)) !important;
      box-shadow:
        0 30px 78px rgba(20, 118, 156, 0.16),
        0 12px 30px rgba(15, 23, 42, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.86),
        inset 0 -1px 0 rgba(255, 255, 255, 0.22) !important;
      backdrop-filter: blur(34px) saturate(190%) brightness(1.05) !important;
      -webkit-backdrop-filter: blur(34px) saturate(190%) brightness(1.05) !important;
      filter: none !important;
      transform: none !important;
    }

    #learnView#learnView #learnBody#learnBody #learnChatCol#learnChatCol .empty-title.empty-title {
      font-size: clamp(24px, 2vw, 30px) !important;
    }

    #learnView#learnView #learnBody#learnBody #learnChatCol#learnChatCol #learnFollowupBar#learnFollowupBar .input-wrapper,
    #learnView#learnView #learnBody#learnBody #learnChatCol#learnChatCol #learnFollowupBar#learnFollowupBar .input-wrapper:focus-within {
      display: grid !important;
      grid-template-columns: 40px minmax(0, 1fr) 40px !important;
      min-height: 44px !important;
      padding: 0 !important;
      background: transparent !important;
      border: 0 !important;
      box-shadow: none !important;
    }

    #learnView#learnView #learnBody#learnBody #learnChatCol#learnChatCol #learnFollowupBar#learnFollowupBar .input-field {
      min-height: 40px !important;
      max-height: 86px !important;
      font-size: 14px !important;
      font-weight: 500 !important;
    }

    #learnView#learnView #learnBody#learnBody #learnChatCol#learnChatCol #learnFollowupBar#learnFollowupBar .bottom-actions {
      position: relative !important;
      right: auto !important;
      bottom: auto !important;
      margin-top: 8px !important;
      gap: 10px !important;
    }

    #learnView #learnBody:not(.chat-collapsed) #learnChatCol:not(.is-chat-active) #learnChatEmptyState,
    #learnView #learnBody:not(.chat-collapsed) #learnChatCol:not(.is-chat-active) .learn-chat-empty-state.edu-tutor-empty,
    #learnView#learnView #learnBody#learnBody:not(.chat-collapsed) #learnChatCol#learnChatCol:not(.is-chat-active) #learnChatEmptyState {
      transform: translateY(clamp(38px, 5.2vh, 62px)) !important;
    }

    #learnView #learnChatCol #learnFollowupBar,
    #learnView #learnBody #learnChatCol #learnFollowupBar,
    #learnView #learnBody[data-panel-focus] #learnChatCol #learnFollowupBar,
    #learnView#learnView #learnBody#learnBody #learnChatCol#learnChatCol #learnFollowupBar#learnFollowupBar {
      transform: none !important;
      will-change: translate, box-shadow, border-color !important;
    }

    #learnView #learnChatCol #learnFollowupBar:focus-within,
    #learnView #learnBody #learnChatCol #learnFollowupBar:focus-within,
    #learnView #learnBody[data-panel-focus] #learnChatCol #learnFollowupBar:focus-within,
    #learnView#learnView #learnBody#learnBody #learnChatCol#learnChatCol #learnFollowupBar#learnFollowupBar:focus-within {
      border-color: rgba(255, 255, 255, 0.78) !important;
      box-shadow:
        0 30px 74px rgba(20, 118, 156, 0.18),
        0 12px 30px rgba(15, 23, 42, 0.09),
        inset 0 1px 0 rgba(255, 255, 255, 0.90),
        inset 0 -1px 0 rgba(255, 255, 255, 0.26) !important;
      animation: learn-qa-composer-focus-bounce 360ms cubic-bezier(0.2, 0.9, 0.22, 1.18) both !important;
    }

    @keyframes learn-qa-composer-focus-bounce {
      0% {
        translate: 0 0;
      }

      38% {
        translate: 0 -5px;
      }

      72% {
        translate: 0 1.5px;
      }

      100% {
        translate: 0 0;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      #learnView #learnChatCol #learnFollowupBar:focus-within,
      #learnView #learnBody #learnChatCol #learnFollowupBar:focus-within,
      #learnView #learnBody[data-panel-focus] #learnChatCol #learnFollowupBar:focus-within,
      #learnView#learnView #learnBody#learnBody #learnChatCol#learnChatCol #learnFollowupBar#learnFollowupBar:focus-within {
        animation: none !important;
      }
    }

    #learnView #learnBody #learnChatCol #learnChatEmptyState .tag-group,
    #learnView #learnBody #learnChatCol .learn-chat-empty-state.edu-tutor-empty .tag-group,
    #learnView #learnChatCol #learnChatEmptyState .tag-group,
    #learnView #learnChatCol .edu-tutor-empty .tag-group {
      margin-top: 12px !important;
      transform: translateY(-22px) !important;
    }

    #learnView #learnBody #learnChatCol #learnChatEmptyState .edu-tag,
    #learnView #learnBody #learnChatCol .learn-chat-empty-state.edu-tutor-empty .edu-tag,
    #learnView #learnChatCol #learnChatEmptyState .edu-tag,
    #learnView #learnChatCol .edu-tutor-empty .edu-tag {
      transform: none !important;
    }
  `;
  document.head.appendChild(style);
})();

// ============================================================
// UI Friction Fix Pack v1.2.3 (2026-06-17)
// Issues 1, 2, 3, 4, 5 — see /mnt/d/Github/fourier-tutor-agent/CLAUDE.md
// ============================================================
(function ftutorUiFrictionFixV123() {
  // ── Issue 5: persistent completion store ──────────────────────────
  const STORE_KEY = 'aquariusCompletedSubsections.v1';
  const COMPLETION_EVENT = 'ftutor:completion-changed';

  function loadCompletionSet() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      return new Set(raw ? JSON.parse(raw) : []);
    } catch (_) { return new Set(); }
  }
  function saveCompletionSet(set) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(Array.from(set))); } catch(_) {}
    window.dispatchEvent(new CustomEvent(COMPLETION_EVENT));
  }
  function variantsFor(value) {
    const out = new Set();
    const raw = String(value || '').trim();
    if (!raw) return out;
    out.add(raw);
    try {
      const parsed = parseSectionTitleParts(raw, raw, raw);
      if (parsed && parsed.code) out.add(parsed.code);
    } catch(_) {}
    return out;
  }
  function markCompleted(idOrTitle, titleHint) {
    if (!idOrTitle && !titleHint) return;
    const set = loadCompletionSet();
    let changed = false;
    [idOrTitle, titleHint].forEach(v => {
      variantsFor(v).forEach(key => {
        if (!set.has(key)) { set.add(key); changed = true; }
      });
    });
    if (changed) saveCompletionSet(set);
  }
  function isCompleted(idOrTitle, titleHint) {
    const set = loadCompletionSet();
    if (!set.size) return false;
    let hit = false;
    [idOrTitle, titleHint].forEach(v => {
      variantsFor(v).forEach(key => { if (set.has(key)) hit = true; });
    });
    return hit;
  }
  window.__ftutorMarkCompleted = markCompleted;
  window.__ftutorIsCompleted = isCompleted;

  // ── Apply completion indicators to the syllabus DOM ───────────────
  // Diff-then-write: each DOM mutation here is a potential reflow + mutation
  // record, so skip when state is already correct.
  function setClassIfChanged(el, cls, want) {
    if (!el) return;
    if (el.classList.contains(cls) !== want) el.classList.toggle(cls, want);
  }
  function applyCompletionIndicators() {
    const root = document.getElementById('courseSyllabus');
    if (!root) return;
    const data = (typeof syllabusData !== 'undefined' ? syllabusData : window.syllabusData) || [];

    root.querySelectorAll('.syllabus-subsection').forEach(btn => {
      const sub = btn.getAttribute('data-subsection') || btn.textContent.trim();
      setClassIfChanged(btn, 'is-completed', isCompleted(sub, sub));
    });
    root.querySelectorAll('.syllabus-section-wrap').forEach(wrap => {
      const sectionBtn = wrap.querySelector('.syllabus-section');
      if (!sectionBtn) return;
      const subs = Array.from(wrap.querySelectorAll('.syllabus-subsection'));
      let done = false;
      if (subs.length) {
        done = subs.every(s => s.classList.contains('is-completed'));
      } else {
        const t = sectionBtn.getAttribute('data-section') || sectionBtn.textContent.trim();
        done = isCompleted(t, t);
      }
      setClassIfChanged(sectionBtn, 'is-completed', done);
    });
    const items = root.querySelectorAll('.syllabus-item');
    data.forEach((chapter, chIdx) => {
      const item = items[chIdx];
      if (!item) return;
      const chBtn = item.querySelector('.syllabus-chapter');
      if (!chBtn) return;
      const sections = (chapter.sections || []).map(s => typeof s === 'string' ? { title: s, subsections: [] } : s);
      let total = 0, done = 0;
      sections.forEach(sec => {
        const subs = (sec.subsections && sec.subsections.length) ? sec.subsections : [sec.title];
        subs.forEach(t => {
          total += 1;
          if (isCompleted(t, t)) done += 1;
        });
      });
      let badge = chBtn.querySelector('.chapter-progress');
      if (total > 0) {
        const wantText = done === total ? '✓ done' : (done + '/' + total);
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'chapter-progress';
          chBtn.appendChild(badge);
        }
        if (badge.textContent !== wantText) badge.textContent = wantText;
        setClassIfChanged(badge, 'is-done', done === total);
      } else if (badge) {
        badge.remove();
      }
      setClassIfChanged(chBtn, 'is-completed', total > 0 && done === total);
    });
  }
  window.__ftutorApplyCompletionIndicators = applyCompletionIndicators;
  window.addEventListener(COMPLETION_EVENT, applyCompletionIndicators);

  // Re-wrap renderSyllabus so post-render we re-apply indicators + chapter hooks.
  if (typeof renderSyllabus === 'function') {
    const _origRenderSyllabus = renderSyllabus;
    function wrappedRenderSyllabus() {
      const r = _origRenderSyllabus.apply(this, arguments);
      try { applyCompletionIndicators(); } catch(e) { console.warn('[ftutor] completion-render failed', e); }
      try { patchChapterClicks(); } catch(e) { console.warn('[ftutor] chapter hook failed', e); }
      return r;
    }
    try { renderSyllabus = wrappedRenderSyllabus; } catch(_) {}
    window.renderSyllabus = wrappedRenderSyllabus;
  }
  // Initial pass for the syllabus already rendered at module init.
  setTimeout(() => {
    applyCompletionIndicators();
    patchChapterClicks();
  }, 250);

  // ── Issue 2: Chapter click also opens first section overview ──────
  function patchChapterClicks() {
    const root = document.getElementById('courseSyllabus');
    if (!root) return;
    const data = (typeof syllabusData !== 'undefined' ? syllabusData : window.syllabusData) || [];
    root.querySelectorAll('.syllabus-chapter').forEach(btn => {
      if (btn.dataset.ftutorChapterHook === '1') return;
      btn.dataset.ftutorChapterHook = '1';
      btn.addEventListener('click', () => {
        const chIdx = Number(btn.getAttribute('data-idx'));
        const chapter = data[chIdx];
        if (!chapter || !Array.isArray(chapter.sections) || !chapter.sections.length) return;
        // The original handler (renderSyllabus) toggles `is-open` on the panel
        // synchronously before our handler runs. Skip on collapse so clicking an
        // open chapter just closes it instead of re-opening the overview.
        const panel = document.getElementById('syllabus-' + chIdx);
        if (!panel || !isAccordionOpen(panel)) return;
        const first = chapter.sections[0];
        const firstObj = typeof first === 'string' ? { title: first, subsections: [] } : first;
        if (!firstObj || !firstObj.title) return;
        try {
          if (typeof openChapterOverviewMode === 'function') {
            openChapterOverviewMode(firstObj.title, firstObj.title, Array.isArray(firstObj.subsections) ? firstObj.subsections : []);
          }
        } catch(e) { console.warn('[ftutor] chapter overview open failed', e); }
      });
    });
  }

  // ── Issue 4: Cross-subsection / cross-section advance ─────────────
  function locateSubsection(idOrTitle, titleHint) {
    const data = (typeof syllabusData !== 'undefined' ? syllabusData : window.syllabusData) || [];
    const candidates = [idOrTitle, titleHint].filter(Boolean).map(v => String(v).trim());
    function matches(value) {
      return candidates.some(c => {
        if (!c) return false;
        if (c === value) return true;
        try {
          const pV = parseSectionTitleParts(value, value, value);
          const pC = parseSectionTitleParts(c, c, c);
          return pV && pC && pV.code && pC.code && pV.code === pC.code;
        } catch(_) { return false; }
      });
    }
    for (let ci = 0; ci < data.length; ci++) {
      const sections = (data[ci].sections || []).map(s => typeof s === 'string' ? { title: s, subsections: [] } : s);
      for (let si = 0; si < sections.length; si++) {
        const sec = sections[si];
        const subs = Array.isArray(sec.subsections) ? sec.subsections : [];
        for (let i = 0; i < subs.length; i++) {
          if (matches(subs[i])) {
            return { chapterIdx: ci, sectionIdx: si, subIdx: i, level: 'sub' };
          }
        }
        if (matches(sec.title)) {
          return { chapterIdx: ci, sectionIdx: si, subIdx: -1, level: 'section' };
        }
      }
    }
    return null;
  }
  function pickAdjacentSubsection(loc, direction) {
    if (!loc) return null;
    const data = (typeof syllabusData !== 'undefined' ? syllabusData : window.syllabusData) || [];
    let { chapterIdx, sectionIdx, subIdx } = loc;
    const safety = 256;
    let n = 0;
    while (chapterIdx >= 0 && chapterIdx < data.length && n++ < safety) {
      const sections = (data[chapterIdx].sections || []).map(s => typeof s === 'string' ? { title: s, subsections: [] } : s);
      while (sectionIdx >= 0 && sectionIdx < sections.length) {
        const sec = sections[sectionIdx];
        const subs = Array.isArray(sec.subsections) ? sec.subsections : [];
        const nextSubIdx = subIdx + direction;
        if (nextSubIdx >= 0 && nextSubIdx < subs.length) {
          return {
            title: subs[nextSubIdx],
            sectionTitle: sec.title,
            sectionSubsections: subs.slice(),
            chapterIdx, sectionIdx, subIdx: nextSubIdx
          };
        }
        // step to next/prev section
        sectionIdx += direction;
        if (direction > 0) {
          subIdx = -1;
        } else {
          const ns = sections[sectionIdx] && Array.isArray(sections[sectionIdx].subsections) ? sections[sectionIdx].subsections.length : 0;
          subIdx = ns; // so subIdx-1 = last subsection
        }
      }
      chapterIdx += direction;
      if (chapterIdx >= 0 && chapterIdx < data.length) {
        const nsLen = (data[chapterIdx].sections || []).length;
        sectionIdx = direction > 0 ? 0 : nsLen - 1;
        if (direction > 0) {
          subIdx = -1;
        } else {
          const lastSec = data[chapterIdx].sections[nsLen - 1];
          const lastSecObj = typeof lastSec === 'string' ? { subsections: [] } : (lastSec || { subsections: [] });
          subIdx = Array.isArray(lastSecObj.subsections) ? lastSecObj.subsections.length : 0;
        }
      }
    }
    return null;
  }
  function peekNextSubsection(sectionId, sectionTitle) {
    const loc = locateSubsection(sectionId, sectionTitle);
    return pickAdjacentSubsection(loc, +1);
  }
  function advanceSubsection(sectionId, sectionTitle, direction) {
    const loc = locateSubsection(sectionId, sectionTitle);
    const next = pickAdjacentSubsection(loc, direction);
    if (!next) return false;
    try {
      const parentContext = (typeof findParentOverviewContextForSubsection === 'function')
        ? findParentOverviewContextForSubsection(next.title, next.title)
        : null;
      if (typeof openLearnModeKeepToc === 'function') {
        openLearnModeKeepToc(next.title, next.title, parentContext);
      } else if (typeof openLearnMode === 'function') {
        openLearnMode(next.title, next.title, [], { parentOverviewContext: parentContext });
      }
      return true;
    } catch (e) { console.warn('[ftutor] advanceSubsection failed', e); return false; }
  }
  window.__ftutorPeekNextSubsection = peekNextSubsection;
  window.__ftutorAdvanceSubsection = (id, title) => advanceSubsection(id, title, +1);
  window.__ftutorRetreatSubsection = (id, title) => advanceSubsection(id, title, -1);

  // ── Issue 1 + 4: bottom pager wiring ──────────────────────────────
  const pager = document.getElementById('learnExplainPager');
  const pagerPrevBtn = document.getElementById('learnPagerPrevBtn');
  const pagerNextBtn = document.getElementById('learnPagerNextBtn');
  const pagerPos = document.getElementById('learnPagerPosition');
  const pagerNextLabel = document.getElementById('learnPagerNextLabel');

  function getKnowledgePointState() {
    const points = (typeof learnKnowledgePoints !== 'undefined' ? learnKnowledgePoints : (window.learnKnowledgePoints || []));
    const idx = (typeof currentKnowledgePointIndex !== 'undefined') ? currentKnowledgePointIndex : (window.currentKnowledgePointIndex || 0);
    return { points: Array.isArray(points) ? points : [], idx: Number(idx) || 0 };
  }
  function inLessonMode() {
    const body = document.getElementById('learnBody');
    if (!body) return false;
    if (body.classList.contains('chapter-overview-active')) return false;
    if (body.classList.contains('chapter-overview-split-active')) return false;
    if (body.classList.contains('hidden')) return false;
    return true;
  }
  function currentSectionRefs() {
    const id = (typeof learnSectionId !== 'undefined' ? learnSectionId : window.learnSectionId) || '';
    const title = (typeof learnSectionTitle !== 'undefined' ? learnSectionTitle : window.learnSectionTitle) || '';
    return { id, title };
  }
  function setDisabledIfChanged(btn, want) {
    if (!btn) return;
    if (!!btn.disabled !== !!want) btn.disabled = !!want;
  }
  function setTextIfChanged(el, text) {
    if (el && el.textContent !== text) el.textContent = text;
  }
  function setAttrIfChanged(el, name, value) {
    if (el && el.getAttribute(name) !== value) el.setAttribute(name, value);
  }
  // rAF-coalesced. Without this, MathJax typesetting inside #learnView can fire
  // the MutationObservers below thousands of times per typeset cycle and wedge
  // the main thread (blocks contextmenu / devtools events).
  let _pagerScheduled = false;
  let _lastAtEnd = false;
  function refreshPager() {
    if (_pagerScheduled) return;
    _pagerScheduled = true;
    requestAnimationFrame(() => { _pagerScheduled = false; refreshPagerNow(); });
  }
  function refreshPagerNow() {
    if (!pager || !pagerPrevBtn || !pagerNextBtn) return;
    const learnView = document.getElementById('learnView');
    const learnVisible = learnView && !learnView.classList.contains('hidden') && inLessonMode();
    if (!learnVisible) {
      setClassIfChanged(pager, 'hidden', true);
      _lastAtEnd = false;
      return;
    }
    const { points, idx } = getKnowledgePointState();
    const total = Math.max(points.length, 1);
    const cur = Math.min(Math.max(idx, 0), total - 1);
    setClassIfChanged(pager, 'hidden', false);
    setTextIfChanged(pagerPos, (cur + 1) + ' / ' + total);
    setDisabledIfChanged(pagerPrevBtn, cur <= 0);
    const atEnd = cur >= total - 1;
    const { id, title } = currentSectionRefs();
    if (atEnd) {
      const next = peekNextSubsection(id, title);
      if (next) {
        setDisabledIfChanged(pagerNextBtn, false);
        setClassIfChanged(pagerNextBtn, 'is-next-topic', true);
        setTextIfChanged(pagerNextLabel, 'Next topic');
        setAttrIfChanged(pagerNextBtn, 'title', 'Continue to: ' + next.title);
      } else {
        setDisabledIfChanged(pagerNextBtn, true);
        setClassIfChanged(pagerNextBtn, 'is-next-topic', false);
        setTextIfChanged(pagerNextLabel, 'End');
        setAttrIfChanged(pagerNextBtn, 'title', 'You finished the syllabus.');
      }
    } else {
      setDisabledIfChanged(pagerNextBtn, false);
      setClassIfChanged(pagerNextBtn, 'is-next-topic', false);
      setTextIfChanged(pagerNextLabel, 'Next');
      setAttrIfChanged(pagerNextBtn, 'title', 'Next page');
    }
    // Mark completion only on the false→true transition into the final page,
    // not on every rAF tick that lands while the user is sitting at the end.
    if (atEnd && !_lastAtEnd && (id || title)) markCompleted(id, title);
    _lastAtEnd = atEnd;
  }
  window.__ftutorRefreshPager = refreshPager;

  // Cross-topic advance must trigger ONLY at the true boundary, never as a
  // side-effect of clicking during a page-turn animation. The handler checks
  // the boundary explicitly instead of relying on moveLearnKnowledgePoint's
  // overloaded false return (see its JSDoc).
  function bindPager(btn, delta) {
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (isLearnPageTurning) return;
      const { points, idx } = getKnowledgePointState();
      const total = Math.max(points.length, 1);
      const atEdge = delta < 0 ? idx <= 0 : idx >= total - 1;
      if (!atEdge) {
        moveLearnKnowledgePoint(delta);
      } else {
        const { id, title } = currentSectionRefs();
        if (delta > 0 && (id || title)) markCompleted(id, title);
        advanceSubsection(id, title, delta);
      }
      animateLectureNavButton(delta);
      refreshPager();
    });
  }
  bindPager(pagerPrevBtn, -1);
  bindPager(pagerNextBtn, +1);

  // Observe only the learn-body class flag (lesson vs chapter-overview mode).
  // The previous `subtree:true` on `#learnView` re-fired on every class change
  // produced by MathJax typesetting, which saturated the main thread. KP-change
  // refreshes now call `__ftutorRefreshPager` directly in renderCurrentKnowledgePoint.
  [
    ['learnBody',                 { attributes: true, attributeFilter: ['class'] }],
    ['learnView',                 { attributes: true, attributeFilter: ['class'] }],
  ].forEach(([id, opts]) => {
    const el = document.getElementById(id);
    if (el) new MutationObserver(refreshPager).observe(el, opts);
  });

  // ── Issue 3: Auto-open syllabus panel after login ─────────────────
  // Run once when the welcome screen first becomes visible, then disconnect.
  // Returns true when the panel ends up open (already-open counts), so callers
  // know to stop watching.
  const welcomeEl = document.getElementById('welcomeScreen');
  function autoOpenSyllabus() {
    try {
      const panel = document.getElementById('sidebarSyllabusPanel');
      if (!panel || !welcomeEl) return false;
      if (welcomeEl.classList.contains('hidden')) return false;
      if (typeof isAccordionOpen === 'function' && isAccordionOpen(panel)) return true;
      if (typeof toggleSyllabusPanel === 'function') {
        toggleSyllabusPanel(true);
        return true;
      }
    } catch(_) {}
    return false;
  }
  if (welcomeEl) {
    const wm = new MutationObserver(() => {
      if (autoOpenSyllabus()) wm.disconnect();
    });
    wm.observe(welcomeEl, { attributes: true, attributeFilter: ['class'] });
    setTimeout(() => { if (autoOpenSyllabus()) wm.disconnect(); }, 400);
  }
})();

