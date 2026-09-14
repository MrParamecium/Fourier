(() => {
  'use strict';
  const home = document.getElementById('welcomeScreen');
  const title = '2.4-2 Graphical Understanding of Convolution Operation';
  let step = 0, dialog, ring, target, frame, active = false, revision = 0;
  let removeTargetListener = () => {};
  const steps = [
    ['Open the syllabus', 'Today we will study 2.4-2: graphical convolution. Click Syllabus to find the lesson.', ''],
    ['Open Chapter 2', 'Click Chapter 2 to see its sections.', ''],
    ['Open section 2.4', 'Click 2.4 to see its lesson list.', ''],
    ['Choose lesson 2.4-2', 'In the chapter overview, click Graphical Understanding of Convolution Operation.', ''],
    ['Read the overview', 'Read the introduction, then click Start lesson to enter the explanation.', ''],
    ['Start with one goal', 'Choose a time, find the overlap, and calculate one output value. Read this goal before continuing.', 'Next'],
    ['Move the signal', 'Drag time t to see how the overlap and signed product area change.', 'Next'],
    ['Ask your Tutor', 'Try asking: "Why do we flip the signal first?" Enter your question in the Tutor panel.', 'Start learning']
  ];
  function stop() {
    active = false; revision++;
    removeTargetListener();
    dialog?.remove(); ring?.remove();
    window.removeEventListener('resize', position);
    window.removeEventListener('scroll', position, true);
    frame?.contentWindow?.removeEventListener('scroll', position);
    document.removeEventListener('keydown', keydown);
    if (step === 7) document.getElementById('learnFollowupInput')?.focus();
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
      if (step < 5) {
        for (let attempt = 0; attempt < 100; attempt++) {
          if (!active || token !== revision) return;
          target = step === 0 ? document.getElementById('navSyllabusBtn')
            : step === 1 ? [...document.querySelectorAll('#courseSyllabus .syllabus-chapter')].find(e => /Chapter 2\b/.test(e.textContent))
            : step === 2 ? document.querySelector('[data-course-title="2.4 System Response to External Input: The Zero-State Response"]')
            : step === 3 ? document.querySelector(`[data-course-title="${title}"]`)
            : document.getElementById('courseStartLesson');
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
      else {
        frame = await waitForFrame(token);
        if (!frame || !active || token !== revision) return;
        frame.contentWindow.addEventListener('scroll', position, {passive:true});
        if (step === 7) {
          openLearnQaSidebar();
          target = document.getElementById('learnFollowupBar');
        } else {
          target = frame.contentDocument.querySelector(step === 5 ? 'main > p:nth-of-type(2)' : '#demo-figure27 .time-controls');
        }
        target.scrollIntoView({block:'center',behavior:'instant'});
      }
      const copy = steps[step];
      dialog.querySelector('.lesson-tour-count').textContent = `${step+1} / ${steps.length}`;
      dialog.querySelector('h2').textContent = copy[0];
      dialog.querySelector('p').textContent = copy[1];
      next.textContent = step < 5 ? ['Open syllabus', 'Open Chapter 2', 'Open section 2.4', 'Open lesson overview', 'Start lesson'][step] : copy[2];
      next.hidden = false;
      dialog.querySelector('.lesson-tour-back').hidden = step < 6;
      requestAnimationFrame(position);
    } catch (_) {
      dialog.querySelector('p').textContent = 'This section is still loading. Please try again.';
      next.hidden = false;
      next.textContent = 'Retry';
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
    dialog.innerHTML = '<span class="lesson-tour-count"></span><h2></h2><p aria-live="polite"></p><div class="lesson-tour-actions"><button class="lesson-tour-skip">Skip tour</button><button class="lesson-tour-back" aria-label="Previous step" title="Previous step"><i class="ph-bold ph-arrow-left" aria-hidden="true"></i></button><button class="lesson-tour-next">Next</button></div>';
    document.body.append(ring,dialog);
    dialog.querySelector('.lesson-tour-skip').onclick = stop;
    dialog.querySelector('.lesson-tour-back').onclick = () => { step=Math.max(0,step-1);show(); };
    dialog.querySelector('.lesson-tour-next').onclick = event => {
      if (event.currentTarget.dataset.retry) { delete event.currentTarget.dataset.retry; show(); return; }
      if (step < 5) {
        const alreadyOpen = step === 0 && document.getElementById('sidebarSyllabusPanel')?.classList.contains('is-open');
        if (alreadyOpen) { step++; show(); }
        else { target.focus(); target.click(); }
        return;
      }
      if (step === 7) stop(); else { step++;show(); }
    };
    window.addEventListener('resize',position);
    window.addEventListener('scroll',position,true);
    document.addEventListener('keydown',keydown);
    show(); dialog.querySelector('.lesson-tour-skip').focus();
  }
  // Trigger once per home entry, not on every mutation while the home is open.
  let wasHomeVisible = false;
  let scheduled = false;
  function syncHome() {
    scheduled = false;
    const visible = Boolean(home?.getClientRects().length)
      && getComputedStyle(home).visibility !== 'hidden'
      && !document.getElementById('loginView')?.getClientRects().length;
    if (visible && !wasHomeVisible && !active) start();
    wasHomeVisible = visible;
  }
  const observer = new MutationObserver(() => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(syncHome); }
  });
  observer.observe(document.body, {subtree:true, attributes:true, attributeFilter:['class','style']});
  syncHome();
})();
