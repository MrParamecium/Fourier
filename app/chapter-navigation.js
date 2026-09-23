// Chapter navigation shares the existing classroom shell and lesson loader.
(() => {
  const root = document.getElementById('courseSyllabus');
  const style = document.createElement('style');
  style.id = 'course-navigation-styles';
  style.textContent = `:root,:root[data-theme="dawn"],:root[data-theme="light"]{
      --course-overview-surface:linear-gradient(135deg,#c4efff 0%,#e1fbf2 52%,#bff2db 100%);
      --course-glass-surface:linear-gradient(135deg,rgba(255,255,255,.48),rgba(247,255,252,.24));
      --course-card-surface:linear-gradient(135deg,rgba(255,255,255,.48),rgba(239,252,247,.28));
      --course-card-hover:linear-gradient(135deg,rgba(255,255,255,.68),rgba(232,250,243,.44));
      --course-glass-border:rgba(255,255,255,.68);
      --course-glass-shadow:0 24px 64px rgba(48,92,82,.10),inset 0 1px 0 rgba(255,255,255,.86),inset 0 -1px 0 rgba(255,255,255,.18);
      --course-ink:#293f48;
      --course-muted:#587071;
    }
    :root[data-theme="dusk"],:root[data-theme="dark"]{
      --course-overview-surface:linear-gradient(135deg,#ffcfc8 0%,#ffe8ed 52%,#ffc7d7 100%);
      --course-glass-surface:linear-gradient(135deg,rgba(255,255,255,.46),rgba(255,243,246,.24));
      --course-card-surface:linear-gradient(135deg,rgba(255,255,255,.46),rgba(255,232,238,.28));
      --course-card-hover:linear-gradient(135deg,rgba(255,255,255,.66),rgba(255,226,232,.44));
      --course-glass-border:rgba(255,255,255,.62);
      --course-glass-shadow:0 24px 68px rgba(148,47,62,.12),inset 0 1px 0 rgba(255,255,255,.82),inset 0 -1px 0 rgba(255,255,255,.16);
      --course-ink:#46393d;
      --course-muted:#766266;
    }
    #courseSyllabus .syllabus-sections,#courseSyllabus .syllabus-chapter .caret{display:none!important}
    #courseSyllabus .syllabus-chapter[aria-current="page"]{background:rgba(255,255,255,.65)!important}
    #learnExplainContent .course-overview{width:100%;height:calc(100vh - 90px);min-height:0;overflow:auto;padding:clamp(12px,1.8vw,24px) clamp(16px,3vw,48px) 30px;margin:0;background:var(--course-overview-surface)!important;box-sizing:border-box}
    #learnExplainContent .course-glass{position:relative;isolation:isolate;display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:clamp(28px,4vw,56px);width:min(100%,1280px);min-height:calc(100vh - 158px);margin:0 auto;padding:clamp(26px,3.4vw,48px);overflow:hidden;border:1px solid var(--course-glass-border)!important;border-radius:16px;background:var(--course-glass-surface)!important;box-shadow:var(--course-glass-shadow)!important;backdrop-filter:blur(32px) saturate(165%);-webkit-backdrop-filter:blur(32px) saturate(165%)}
    #learnExplainContent .course-glass.course-glass-with-return{grid-template-rows:auto 1fr}
    #learnExplainContent .course-glass-with-return>.course-return{grid-column:1/-1;justify-self:start;margin:0 0 2px}
    #learnExplainContent .course-glass::before{content:"";position:absolute;inset:1px;z-index:-1;pointer-events:none;border:1px solid rgba(255,255,255,.20);border-radius:15px;background:linear-gradient(120deg,rgba(255,255,255,.28),transparent 42%)}
    #learnExplainContent .course-glass section{min-width:0}
    #learnExplainContent .course-glass h1{font:600 44px/1.2 var(--font-sans,system-ui)!important;letter-spacing:0!important;color:var(--course-ink)!important;margin:18px 0 24px!important;border:0!important;padding:0!important}
    #learnExplainContent .course-glass h2{font:600 19px/1.4 var(--font-sans,system-ui)!important;letter-spacing:0!important;color:var(--course-ink)!important;border:0!important;margin:0 0 20px!important;padding:0!important}
    #learnExplainContent .course-glass p{font:400 15px/1.8 var(--font-sans,system-ui)!important;color:var(--course-muted)!important;letter-spacing:0!important;margin:12px 0!important}
    #learnExplainContent .course-glass section>p:first-child{font-size:11px!important;font-weight:700!important;letter-spacing:0!important;color:#39765f!important}
    #learnExplainContent .course-glass h1::after,#learnExplainContent .course-glass h2::after,#learnExplainContent .course-glass p::after{display:none!important}
    #learnExplainContent .course-list{display:grid;gap:12px}
    #learnExplainContent .course-glass>section:last-child{min-height:0}
    #learnExplainContent .course-glass>section:last-child .course-list{max-height:min(62vh,620px);overflow-y:auto;padding:4px 10px 8px 2px;scrollbar-width:thin;scrollbar-color:rgba(73,139,119,.46) rgba(255,255,255,.18)}
    #learnExplainContent .course-glass>section:last-child .course-list::-webkit-scrollbar{width:8px}
    #learnExplainContent .course-glass>section:last-child .course-list::-webkit-scrollbar-track{background:rgba(255,255,255,.18);border-radius:8px}
    #learnExplainContent .course-glass>section:last-child .course-list::-webkit-scrollbar-thumb{background:rgba(73,139,119,.46);border-radius:8px;border:2px solid transparent;background-clip:padding-box}
    #learnExplainContent .course-card{display:block;width:100%;min-height:66px;text-align:left;padding:17px 20px;border:1px solid var(--course-glass-border)!important;border-radius:8px;background:var(--course-card-surface)!important;box-shadow:0 8px 24px rgba(48,78,70,.045),inset 0 1px 0 rgba(255,255,255,.64)!important;backdrop-filter:blur(18px) saturate(145%);-webkit-backdrop-filter:blur(18px) saturate(145%);color:var(--course-ink)!important;font:500 14px/1.55 var(--font-sans,system-ui);cursor:pointer;transition:background .18s,box-shadow .18s,transform .18s}
    #learnExplainContent .course-card:hover{background:var(--course-card-hover);box-shadow:0 12px 28px rgba(48,78,70,.09),inset 0 1px 0 rgba(255,255,255,.78);transform:translateY(-1px)}
    #learnExplainContent .course-card{display:grid;grid-template-columns:minmax(0,1fr) auto auto;align-items:center;gap:14px}
    #learnExplainContent .course-card-copy{min-width:0}
    #learnExplainContent .course-card-arrow{font-size:30px;line-height:1;color:var(--course-muted);font-weight:300;transform:translateY(-2px)}
    #learnExplainContent .course-progress-ring,#courseSyllabus .syllabus-chapter .chapter-progress{--progress-deg:0deg;display:inline-grid;place-items:center;width:38px;min-width:38px;height:38px;border-radius:50%;background:conic-gradient(var(--course-accent,#4a927b) var(--progress-deg),rgba(255,255,255,.38) 0deg);color:var(--course-ink);font-size:10px;font-weight:800;position:relative}
    #learnExplainContent .course-progress-ring::after,#courseSyllabus .syllabus-chapter .chapter-progress::after{content:"";position:absolute;inset:4px;border-radius:50%;background:rgba(238,251,246,.78);box-shadow:inset 0 1px rgba(255,255,255,.72)}
    #learnExplainContent .course-progress-ring span,#courseSyllabus .syllabus-chapter .chapter-progress span{position:relative;z-index:1}
    #learnExplainContent .course-progress-ring.is-done,#courseSyllabus .syllabus-chapter .chapter-progress.is-done{background:var(--course-accent,#4a927b);color:#fff}
    #learnExplainContent .course-progress-ring.is-done::after,#courseSyllabus .syllabus-chapter .chapter-progress.is-done::after{display:none}
    #courseSyllabus .syllabus-chapter .chapter-progress::after{display:none}
    #learnExplainContent.course-page-transition{animation:courseOverviewIn .28s ease both}
    @keyframes courseOverviewIn{from{opacity:0;transform:translateX(12px)}to{opacity:1;transform:none}}
    @media(prefers-reduced-motion:reduce){#learnExplainContent.course-page-transition{animation:none}}
    #learnExplainContent .lesson-overview-visual{border:1px solid var(--course-glass-border);border-radius:14px;padding:16px;background:rgba(255,255,255,.18);box-shadow:inset 0 1px 0 rgba(255,255,255,.7);margin-bottom:18px}
    #learnExplainContent .lesson-overview-visual svg{display:block;width:100%;height:auto}
    #learnExplainContent .lesson-overview-caption{font-size:12px!important;line-height:1.5!important;margin:10px 2px 0!important}
    #learnExplainContent .lesson-overview-goals{display:grid;gap:8px;padding:0;margin:0;list-style:none}
    #learnExplainContent .lesson-overview-goals li{display:flex;gap:9px;align-items:flex-start;color:var(--course-muted);font-size:14px;line-height:1.55}
    #learnExplainContent .lesson-overview-goals li::before{content:"✓";color:var(--course-accent,#398b72);font-weight:800}
    #learnExplainContent .course-overview button:focus-visible{outline:3px solid #5c9b83;outline-offset:3px}
    .course-overview .course-return,.course-overview .course-start,#courseLessonReturn{padding:9px 14px;border:1px solid rgba(115,174,149,.42);border-radius:8px;background:rgba(220,245,234,.46);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);box-shadow:inset 0 1px 0 rgba(255,255,255,.72),0 6px 18px rgba(48,78,70,.055);color:#286c52;cursor:pointer;margin:0;font:inherit}
    .course-overview .course-start{margin-top:24px}
    @media(max-width:900px){#learnExplainContent .course-glass{grid-template-columns:1fr;min-height:0;gap:28px;padding:24px}#learnExplainContent .course-glass h1{font-size:34px!important}#learnExplainContent .course-overview{height:auto;min-height:100%;padding:16px}#learnExplainContent .course-glass>section:last-child .course-list{max-height:none;overflow:visible;padding:0}}
    @media(prefers-reduced-motion:reduce){#learnExplainContent .course-card{transition:none}}
    .learn-back-btn{display:grid;place-items:center;width:34px;height:34px;margin-right:10px;padding:0;border:1px solid rgba(255,255,255,.66);border-radius:10px;background:linear-gradient(135deg,rgba(255,255,255,.5),rgba(255,255,255,.22));color:inherit;font:inherit;font-size:17px;line-height:1;cursor:pointer;backdrop-filter:blur(14px) saturate(160%);-webkit-backdrop-filter:blur(14px) saturate(160%);box-shadow:inset 0 1px 0 rgba(255,255,255,.6),0 6px 16px rgba(15,23,42,.06);transition:transform .12s ease,background .15s ease}
    .learn-back-btn:hover{background:rgba(255,255,255,.75);transform:translateY(-1px)}
    .learn-back-btn[hidden]{display:none!important}`;
  document.head.append(style);
  const i18n = () => window.FourierI18N || { t: k => k, tt: k => k };
  let chapterIndex = 0;
  let lessonTitle = '';
  const back = document.createElement('button');
  back.id = 'courseLessonReturn'; back.type = 'button'; back.textContent = `← ${i18n().t('overview.lessonOverview')}`; back.hidden = true;
  document.getElementById('learnExplainToolbar').prepend(back);
  back.onclick = () => showLesson(chapterIndex, lessonTitle);
  // Compact back button in the learn topbar (visible for embedded lessons,
  // where the legacy explain toolbar is hidden).
  const backTop = document.createElement('button');
  backTop.id = 'courseLessonReturnTop'; backTop.type = 'button'; backTop.className = 'learn-back-btn';
  backTop.textContent = '←'; backTop.title = i18n().t('overview.lessonOverview');
  backTop.setAttribute('aria-label', i18n().t('overview.lessonOverview'));
  backTop.hidden = true;
  backTop.onclick = () => showLesson(chapterIndex, lessonTitle);
  const topbarLeft = document.querySelector('#learnView .learn-topbar-left');
  if (topbarLeft) topbarLeft.prepend(backTop); else document.body.append(backTop);
  function entries(chapter) {
    return chapter.sections.map(s => typeof s === 'string' ? s : s.title);
  }
  function shell(index, title, render) {
    chapterIndex = index;
    back.hidden = true; backTop.hidden = true;
    root.querySelectorAll('.syllabus-chapter').forEach(b => {
      if (Number(b.dataset.idx) === index) b.setAttribute('aria-current', 'page');
      else b.removeAttribute('aria-current');
    });
    openChapterOverviewMode(title, title, [], { render });
  }
  function paint(html) {
    replaceLearnContent(learnExplainContent, `<div class="course-overview">${html}</div>`);
    // Each navigation state is a new overview page; never inherit the previous page's scroll offset.
    learnExplainContent.scrollTop = 0;
    const overview = learnExplainContent.querySelector('.course-overview');
    if (overview) overview.scrollTop = 0;
    learnExplainContent.classList.remove('course-page-transition');
    requestAnimationFrame(() => {
      learnExplainContent.scrollTop = 0;
      const nextOverview = learnExplainContent.querySelector('.course-overview');
      if (nextOverview) nextOverview.scrollTop = 0;
      learnExplainContent.classList.add('course-page-transition');
    });
  }
  function completionStats(title, children = []) {
    const items = children.length ? children : [title];
    const done = items.filter(item => window.__ftutorIsCompleted?.(item, item)).length;
    return { done, total: items.length, degree: items.length ? Math.round(done / items.length * 360) : 0 };
  }
  function progressBadge(stats) {
    const done = stats.done === stats.total && stats.total > 0;
    return `<span class="course-progress-ring${done ? ' is-done' : ''}" style="--progress-deg:${stats.degree}deg" aria-label="${done ? 'Completed' : `${stats.done} of ${stats.total} completed`}"><span>${done ? '✓' : `${stats.done}/${stats.total}`}</span></span>`;
  }
  function courseCard(title, stats, options = {}) {
    const progress = options.showProgress === false ? '' : progressBadge(stats);
    return `<button type="button" class="course-card" data-course-title="${escapeHtml(title)}"><span class="course-card-copy">${escapeHtml(i18n().tt(title))}</span>${progress}<span class="course-card-arrow" aria-hidden="true">↗</span></button>`;
  }
  function chapterSummary(chapter) {
    if (chapter.chapter.startsWith('Chapter 2:')) {
      return i18n().t('overview.chapter2.summary');
    }
    return i18n().t('overview.chapterDefault.summary');
  }
  function sectionSummary(title) {
    if (title.startsWith('2.4 ')) {
      return i18n().t('overview.section24.summary');
    }
    return i18n().t('overview.sectionDefault.summary');
  }
  function showSection(index, section) {
    const title = typeof section === 'string' ? section : section.title;
    const subs = typeof section === 'string' ? [] : (section.subsections || []);
    shell(index, title, () => {
      paint(`<div class="course-glass course-glass-with-return"><button class="course-return" type="button">← ${escapeHtml(i18n().tt(syllabusData[index].chapter))}</button><section><p>${i18n().t('overview.sectionOverview').toUpperCase()}</p><h1 class="course-title">${escapeHtml(i18n().tt(title))}</h1><p class="course-summary">${escapeHtml(sectionSummary(title))}</p></section><section><h2>${i18n().t('overview.lessons')}</h2><div class="course-list">${[title, ...subs].map(t => courseCard(t, completionStats(t), { showProgress: false })).join('')}</div></section></div>`);
      learnExplainContent.querySelector('.course-return').onclick = () => showChapter(index);
      learnExplainContent.querySelectorAll('[data-course-title]').forEach(b => b.onclick = () => showLesson(index, b.dataset.courseTitle));
    });
  }
  function showChapter(index) {
    const chapter = syllabusData[index];
    if (!chapter) return;
    shell(index, chapter.chapter, () => {
      paint(`<div class="course-glass"><section><p>${i18n().t('overview.chapterOverview').toUpperCase()}</p><h1 class="course-title">${escapeHtml(i18n().tt(chapter.chapter))}</h1><p class="course-summary">${escapeHtml(chapterSummary(chapter))}</p></section><section><h2>${i18n().t('overview.studySequence')}</h2><div class="course-list">${entries(chapter).map(title => { const sec=chapter.sections.find(x => (typeof x==='string'?x:x.title)===title); const children=typeof sec==='string'?[]:(sec.subsections||[]); return courseCard(title, completionStats(title, children)); }).join('')}</div></section></div>`);
      learnExplainContent.querySelectorAll('[data-course-title]').forEach(b => { const sec=chapter.sections.find(x => (typeof x==='string'?x:x.title)===b.dataset.courseTitle); b.onclick=()=> sec ? showSection(index, sec) : showLesson(index,b.dataset.courseTitle); });
    });
  }
  function showLesson(index, title) {
    lessonTitle = title;
    const parent = syllabusData[index].sections.find(s => typeof s !== 'string' && s.subsections?.length && (s.title === title || s.subsections.includes(title)));
    const preview = getSectionPreview(title, title);
    const intro = preview?.en || `Explore ${title.replace(/^\S+\s+/, '')} through the explanation and examples in this lesson.`;
    const isConvolutionLesson = /^2\.4-2\b/.test(title);
    const lessonBody = isConvolutionLesson
      ? `<section><p>${i18n().t('overview.beforeYouBegin').toUpperCase()}</p><h1 class="course-title">${escapeHtml(i18n().tt(title))}</h1><p class="course-summary">${i18n().t('overview.lesson242.opening')}</p><p class="course-summary"><strong>${i18n().t('overview.lesson242.goalLabel')}</strong> ${i18n().t('overview.lesson242.goal')}</p><p class="course-summary" data-tour="goal"><strong>${i18n().t('overview.lesson242.routeLabel')}</strong> ${i18n().t('overview.lesson242.route')}</p></section><section><h2>${i18n().t('overview.onePicture')}</h2><div class="lesson-overview-visual"><svg viewBox="0 0 680 150" role="img" aria-label="Flip, shift, overlap, integrate diagram"><defs><linearGradient id="lessonFlow" x1="0" x2="1"><stop stop-color="#56a4c4"/><stop offset="1" stop-color="#5ab18d"/></linearGradient></defs><g font-family="Inter,system-ui,sans-serif" text-anchor="middle"><g transform="translate(72 58)"><circle r="34" fill="rgba(255,255,255,.5)" stroke="rgba(255,255,255,.8)"/><path d="M-20 10h10v-24h10v24h10" fill="none" stroke="#3c8b88" stroke-width="4" stroke-linejoin="round"/><text y="54" fill="var(--course-ink)" font-size="13" font-weight="700">${i18n().t('overview.flip')}</text></g><path d="M113 58h58" stroke="url(#lessonFlow)" stroke-width="3"/><path d="m164 50 10 8-10 8" fill="none" stroke="#5a9c87" stroke-width="3"/><g transform="translate(244 58)"><circle r="34" fill="rgba(255,255,255,.5)" stroke="rgba(255,255,255,.8)"/><path d="M-22 10h44M-11 10V-13M-11-13h24" fill="none" stroke="#3c8b88" stroke-width="4" stroke-linecap="round"/><text y="54" fill="var(--course-ink)" font-size="13" font-weight="700">${i18n().t('overview.shift')}</text></g><path d="M285 58h58" stroke="url(#lessonFlow)" stroke-width="3"/><path d="m336 50 10 8-10 8" fill="none" stroke="#5a9c87" stroke-width="3"/><g transform="translate(416 58)"><circle r="34" fill="rgba(255,255,255,.5)" stroke="rgba(255,255,255,.8)"/><path d="M-22 10h44M-13 10V-7h26v17" fill="none" stroke="#3c8b88" stroke-width="4"/><path d="M-3-7h13" stroke="#d57679" stroke-width="5"/><text y="54" fill="var(--course-ink)" font-size="13" font-weight="700">${i18n().t('overview.overlap')}</text></g><path d="M457 58h58" stroke="url(#lessonFlow)" stroke-width="3"/><path d="m508 50 10 8-10 8" fill="none" stroke="#5a9c87" stroke-width="3"/><g transform="translate(588 58)"><circle r="34" fill="rgba(255,255,255,.5)" stroke="rgba(255,255,255,.8)"/><path d="M-19 10h38M-13 10V-5l9-10 9 10v15" fill="none" stroke="#3c8b88" stroke-width="4" stroke-linejoin="round"/><text y="54" fill="var(--course-ink)" font-size="13" font-weight="700">${i18n().t('overview.integrate')}</text></g></g></svg><p class="lesson-overview-caption">${i18n().t('overview.caption')}</p></div><h2 class="lesson-overview-after">${i18n().t('overview.afterOverview')}</h2><ul class="lesson-overview-goals"><li>${i18n().t('overview.goal1')}</li><li>${i18n().t('overview.goal2')}</li><li>${i18n().t('overview.goal3')}</li></ul><button type="button" class="course-start" id="courseStartLesson">${i18n().t('overview.startLesson')} ↗</button></section>`
      : `<section><p>${i18n().t('overview.overview').toUpperCase()}</p><h1 class="course-title">${escapeHtml(i18n().tt(title))}</h1><p class="course-summary">${escapeHtml(intro)}</p></section><section><h2>${i18n().t('overview.goals')}</h2><p>${escapeHtml(`The central idea of ${title.replace(/^\S+\s+/, '')}, and how to apply it in the lesson examples.`)}</p><button type="button" class="course-start" id="courseStartLesson">${i18n().t('overview.startLesson')} ↗</button></section>`;
    shell(index, title, () => {
      paint(`<div class="course-glass course-glass-with-return${isConvolutionLesson ? ' lesson-overview-glass' : ''}"><button class="course-return" type="button">← ${escapeHtml(i18n().tt(parent ? parent.title : syllabusData[index].chapter))}</button>${lessonBody}</div>`);
      learnExplainContent.querySelector('.course-return').onclick = () => parent ? showSection(index, parent) : showChapter(index);
      document.getElementById('courseStartLesson').onclick = () => {
        openLearnMode(title, title, []);
        back.hidden = false; backTop.hidden = false;
      };
    });
  }
  // Capture before legacy accordion and completion hooks can expand the tree.
  root.addEventListener('click', event => {
    const button = event.target.closest('.syllabus-chapter');
    if (!button) return;
    event.preventDefault(); event.stopImmediatePropagation();
    showChapter(Number(button.dataset.idx));
  }, true);
  window.courseNavigation = { showChapter, showSection, showLesson };
})();
