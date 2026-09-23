(() => {
  'use strict';
  const home = document.getElementById('welcomeScreen');
  const title = '2.4-2 Graphical Understanding of Convolution Operation';
  const i18n = () => window.FourierI18N || { t: k => k };
  let step = 0, dialog, ring, target, frame, active = false, revision = 0;
  let removeTargetListener = () => {};
  // Steps store i18n keys; copy resolves at render time to follow language switches.
  const steps = [
    ['tour.openSyllabus', 'tour.openSyllabus.body', ''],
    ['tour.openChapter2', 'tour.openChapter2.body', ''],
    ['tour.openSection24', 'tour.openSection24.body', ''],
    ['tour.chooseLesson', 'tour.chooseLesson.body', ''],
    ['tour.oneGoal', 'tour.oneGoal.body', 'tour.next'],
    ['tour.readOverview', 'tour.readOverview.body', 'tour.readOverview.btn'],
    ['tour.readingMode', 'tour.readingMode.body', 'tour.next'],
    ['tour.viewToggle', 'tour.viewToggle.body', 'tour.next'],
    ['tour.focus', 'tour.focus.body', 'tour.next'],
    ['tour.moveSignal', 'tour.moveSignal.body', 'tour.next'],
    ['tour.askTutor', 'tour.askTutor.body', 'tour.startLearning']
  ];
  function stop() {
    active = false; revision++;
    removeTargetListener();
    dialog?.remove(); ring?.remove();
    window.removeEventListener('resize', position);
    window.removeEventListener('scroll', position, true);
    frame?.contentWindow?.removeEventListener('scroll', position);
    document.removeEventListener('keydown', keydown);
    if (step === 10) document.getElementById('learnFollowupInput')?.focus();
    else document.getElementById('navHomeBtn')?.focus();
  }
  function keydown(event) {
    if (event.key === 'Escape') stop();
  }
  function position() {
    if (!active || !target?.isConnected) return;
    const r = target.getBoundingClientRect();
    const iframeTarget = target.ownerDocument !== document;
    const f = iframeTarget ? frame.getBoundingClientRect() : { left:0, top:0, bottom:innerHeight, right:innerWidth };
    const left = Math.max(4, r.left + f.left), top = Math.max(4, r.top + f.top);
    const right = Math.min(innerWidth - 4, r.right + f.left, f.right);
    const bottom = Math.min(innerHeight - 4, r.bottom + f.top, f.bottom);
    Object.assign(ring.style, { left:left+'px', top:top+'px', width:Math.max(0,right-left)+'px', height:Math.max(0,bottom-top)+'px' });
    const x = right + 16 + 310 < innerWidth ? right + 16 : Math.max(12,left - 326);
    const y = Math.max(12,Math.min(top,innerHeight - dialog.offsetHeight - 12));
    Object.assign(dialog.style,{left:x+'px',top:y+'px'});
  }
  async function waitForFrame(token) {
    for (let i=0; i<100; i++) {
      if (!active || token !== revision) return null;
      const node = document.querySelector('iframe.embedded-lesson-frame');
      if (node?.contentDocument?.querySelector('#section-1')) return node;
      await new Promise(resolve => setTimeout(resolve,100));
    }
    throw new Error('Lesson not ready');
  }
  async function show() {
    const token = ++revision;
    removeTargetListener();
    const next = dialog.querySelector('.lesson-tour-next');
    next.disabled = true;
    try {
      if (step < 4) {
        for (let attempt = 0; attempt < 100; attempt++) {
          if (!active || token !== revision) return;
          target = step === 0 ? document.getElementById('navSyllabusBtn')
            : step === 1 ? document.querySelector('#courseSyllabus .syllabus-chapter[data-idx="2"]')
            : step === 2 ? document.querySelector('[data-course-title="2.4 System Response to External Input: The Zero-State Response"]')
            : document.querySelector(`[data-course-title="${title}"]`);
          if (target?.getClientRects().length) break;
          await new Promise(resolve => setTimeout(resolve,100));
        }
        if (!target?.getClientRects().length) throw new Error('Navigation target not ready');
        target.scrollIntoView({block:'center',behavior:'instant'});
        const clickTarget = target;
        const clicked = event => {
          if (!clickTarget.contains(event.target)) return;
          setTimeout(() => {
            if (!active || token !== revision) return;
            if (step === 0 && !document.getElementById('sidebarSyllabusPanel')?.classList.contains('is-open')) return;

            removeTargetListener(); step++; show();
          }, 300);
        };
        document.addEventListener('click', clicked, true);
        removeTargetListener = () => document.removeEventListener('click', clicked, true);
      }
      else if (step === 4) {
        // The goal paragraph lives on the lesson overview now — highlight it there.
        for (let attempt = 0; attempt < 100; attempt++) {
          if (!active || token !== revision) return;
          target = document.querySelector('#learnExplainContent [data-tour="goal"]');
          if (target?.getClientRects().length) break;
          await new Promise(resolve => setTimeout(resolve,100));
        }
        if (!target?.getClientRects().length) throw new Error('Overview goal not ready');
        target.scrollIntoView({block:'center',behavior:'instant'});
      }
      else if (step === 5) {
        for (let attempt = 0; attempt < 100; attempt++) {
          if (!active || token !== revision) return;
          target = document.getElementById('courseStartLesson');
          if (target?.getClientRects().length) break;
          await new Promise(resolve => setTimeout(resolve,100));
        }
        if (!target?.getClientRects().length) throw new Error('Start button not ready');
        target.scrollIntoView({block:'center',behavior:'instant'});
        const clickTarget = target;
        const clicked = event => {
          if (!clickTarget.contains(event.target)) return;
          setTimeout(() => {
            if (!active || token !== revision) return;
            removeTargetListener(); step++; show();
          }, 300);
        };
        document.addEventListener('click', clicked, true);
        removeTargetListener = () => document.removeEventListener('click', clicked, true);
      }
      else {
        frame = await waitForFrame(token);
        if (!frame || !active || token !== revision) return;
        frame.contentWindow.addEventListener('scroll', position, {passive:true});
        if (step === 10) {
          openLearnQaSidebar();
          target = document.getElementById('learnFollowupBar');
        } else {
          target = step === 6
            ? document.querySelector('.reading-modes')
              : step === 7
                ? document.getElementById('learnViewSelector')
              : step === 8
                ? (() => {
                  // lesson.js moves the fullscreen button into the parent topbar when embedded;
                  // resolve the first actually visible instance.
                  const visible = el => el && el.getClientRects().length && el.getBoundingClientRect().width > 0;
                  return [document.getElementById('lesson-fullscreen'),
                    frame.contentDocument?.getElementById('lesson-fullscreen'),
                    document.getElementById('learnFullscreenBtn')].find(visible) || document.querySelector('.reading-modes');
                })()
                : frame.contentDocument.querySelector('#demo-figure27 .time-controls');
        }
        target.scrollIntoView({block:'center',behavior:'instant'});
      }
      const copy = steps[step];
      dialog.querySelector('.lesson-tour-count').textContent = `${step+1} / ${steps.length}`;
      dialog.querySelector('h2').textContent = i18n().t(copy[0]);
      dialog.querySelector('p').textContent = i18n().t(copy[1]);
      next.textContent = step < 4 ? i18n().t(['tour.openSyllabus.btn', 'tour.openChapter2.btn', 'tour.openSection24.btn', 'tour.chooseLesson.btn'][step]) : i18n().t(copy[2]);
      next.hidden = false;
      dialog.querySelector('.lesson-tour-back').hidden = step < 5;
      requestAnimationFrame(position);
    } catch (_) {
      dialog.querySelector('p').textContent = i18n().t('tour.loading');
      next.hidden = false;
      next.textContent = i18n().t('tour.retry');
      next.dataset.retry = 'true';
    } finally { next.disabled = false; }
  }
  function start() {
    if (active) stop();
    active = true; step = 0;
    if (document.getElementById('sidebarSyllabusPanel')?.classList.contains('is-open')) step = 1;
    ring = document.createElement('div'); ring.className = 'lesson-tour-ring';
    dialog = document.createElement('section'); dialog.className = 'lesson-tour-dialog';
    dialog.setAttribute('role','dialog'); dialog.setAttribute('aria-label','Lesson 2.4-2 tour');
    dialog.innerHTML = `<span class="lesson-tour-count"></span><h2></h2><p aria-live="polite"></p><div class="lesson-tour-actions"><button class="lesson-tour-skip">${i18n().t('tour.skip')}</button><button class="lesson-tour-back" aria-label="Previous step" title="Previous step"><i class="ph-bold ph-arrow-left" aria-hidden="true"></i></button><button class="lesson-tour-next">${i18n().t('tour.next')}</button></div>`;
    document.body.append(ring,dialog);
    dialog.querySelector('.lesson-tour-skip').onclick = stop;
    dialog.querySelector('.lesson-tour-back').onclick = () => { step=Math.max(0,step-1);show(); };
    dialog.querySelector('.lesson-tour-next').onclick = event => {
      if (event.currentTarget.dataset.retry) { delete event.currentTarget.dataset.retry; show(); return; }
      if (step < 4) {
        const alreadyOpen = step === 0 && document.getElementById('sidebarSyllabusPanel')?.classList.contains('is-open');
        if (alreadyOpen) { step++; show(); }
        else { target.focus(); target.click(); }
        return;
      }
      if (step === 5) { target.focus(); target.click(); return; }
      if (step === 10) stop(); else { step++;show(); }
    };
    window.addEventListener('resize',position);
    window.addEventListener('scroll',position,true);
    document.addEventListener('keydown',keydown);
    show(); dialog.querySelector('.lesson-tour-skip').focus();
  }
  // Replay the tour on every return to the home screen. The intro landing is
  // the only state that must not be interrupted: when it covers the screen the
  // tour stands down, and it restarts as soon as the user lands on home.
  let wasHomeVisible = false;
  let scheduled = false;
  function syncHome() {
    scheduled = false;
    const introEl = document.getElementById('introLanding');
    const introVisible = Boolean(introEl?.getClientRects().length);
    if (introVisible && active) { stop(); wasHomeVisible = false; return; }
    const visible = Boolean(home?.getClientRects().length)
      && getComputedStyle(home).visibility !== 'hidden'
      && !document.getElementById('loginView')?.getClientRects().length
      && !introVisible;
    // Every arrival on home opens a fresh tour — even replacing one that is
    // still active (e.g. left mid-step in the lesson view), so a stale active
    // tour can never block the next replay.
    if (visible && !wasHomeVisible) { if (active) stop(); start(); }
    wasHomeVisible = visible;
  }
  window.FourierLessonTour = {
    start: () => start(),
    debug: () => ({ wasHomeVisible, active,
      homeRects: home ? home.getClientRects().length : -1,
      loginRects: document.getElementById('loginView')?.getClientRects().length ?? -1,
      introRects: document.getElementById('introLanding')?.getClientRects().length ?? -1,
      panelOpen: document.getElementById('sidebarSyllabusPanel')?.classList.contains('is-open') })
  };
  const schedule = () => { if (!scheduled) { scheduled = true; requestAnimationFrame(syncHome); } };
  const observer = new MutationObserver(schedule);
  observer.observe(document.body, {subtree:true, attributes:true, attributeFilter:['class','style']});
  // Clicks are the reliable signal for "user just navigated" — mutations alone
  // can race the entry flow and skip the first home edge.
  document.addEventListener('pointerup', schedule, true);
  // Safety net: a boot-time reload can swallow a mutation/rAF edge, so poll
  // gently — the tour then appears within 500ms of any home entry.
  setInterval(schedule, 500);
  schedule();
})();
