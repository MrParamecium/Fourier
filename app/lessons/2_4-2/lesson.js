(() => {
  const fullscreenButton = document.getElementById('lesson-fullscreen');
  const hostDocument = window.parent === window ? document : window.parent.document;
  const syncFullscreen = () => {
    const active = Boolean(hostDocument.fullscreenElement);
    fullscreenButton.setAttribute('aria-label', active ? '退出全屏' : '进入全屏');
    fullscreenButton.title = fullscreenButton.getAttribute('aria-label');
    fullscreenButton.setAttribute('aria-pressed', String(active));
    fullscreenButton.querySelector('path').setAttribute('d', active
      ? 'M9 3v6H3M15 3v6h6M9 21v-6H3M21 15h-6v6'
      : 'M8 3H3v5M16 3h5v5M8 21H3v-5M21 16v5h-5');
  };
  fullscreenButton.onclick = async () => {
    if (window.parent !== window) {
      hostDocument.getElementById('learnFullscreenBtn')?.click();
      return;
    }
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch (_) { fullscreenButton.title = '当前浏览器不支持全屏'; }
  };
  hostDocument.addEventListener('fullscreenchange', syncFullscreen);
  window.addEventListener('pagehide', () => hostDocument.removeEventListener('fullscreenchange', syncFullscreen));
  syncFullscreen();
  const root=document.documentElement, button=document.getElementById('theme-toggle');
  const header = document.querySelector('.progress-shell');
  const positionLabel = document.getElementById('progress-position');
  const percentLabel = document.getElementById('progress-percent');
  const progressBar = document.getElementById('progress-bar');
  const embedded = window.parent !== window;
  if (embedded) {
    root.classList.add('embedded-lesson');
    header.classList.add('embedded-lesson-controls');
    const topbar = hostDocument.querySelector('#learnView .learn-topbar');
    topbar.querySelector('.embedded-lesson-controls')?.remove();
    topbar.appendChild(header);
    window.addEventListener('pagehide', () => header.remove());
  }
  const L = document.documentElement.lang === 'zh';
  const label = {
    scroll: L ? '滚动' : 'Scroll',
    pages: L ? '翻页' : 'Pages',
    scrollTitle: L ? '连续滚动阅读' : 'Continuous scrolling',
    pagesTitle: L ? '每节一页' : 'One section per page',
    groupAria: L ? '讲解阅读方式' : 'Lecture reading mode',
    pagerAria: L ? '讲解翻页' : 'Lecture pagination',
    prev: L ? '上一页' : 'Previous page',
    next: L ? '下一页' : 'Next page',
    current: L ? '当前' : 'Current',
    completed: L ? '之前已完成，随时可以重做。' : 'Completed previously. Try again whenever you want.'
  };
  const headings=[...document.querySelectorAll('h2[data-section]')];
  const main = document.querySelector('main');
  const groups = [[]];
  let group = 0;
  [...main.children].forEach(node => {
    const section = headings.indexOf(node);
    if (section >= 0) group = section;
    (groups[group] ||= []).push(node);
  });
  let readingMode = 'pages', pageIndex = 0;
  const modes = document.createElement('div');
  modes.className = 'reading-modes';
  modes.setAttribute('role', 'group');
  modes.setAttribute('aria-label', label.groupAria);
  modes.innerHTML = `<button type="button" data-mode="scroll" aria-pressed="true" title="${label.scrollTitle}">${label.scroll}</button><button type="button" data-mode="pages" aria-pressed="false" title="${label.pagesTitle}">${label.pages}</button>`;
  header.querySelector('.lesson-tools').prepend(modes);
  const pager = document.createElement('nav');
  pager.className = 'reading-pager';
  pager.setAttribute('aria-label', label.pagerAria);
  pager.innerHTML = `<button type="button" title="${label.prev}" aria-label="${label.prev}">←</button><span aria-live="polite"></span><button type="button" title="${label.next}" aria-label="${label.next}">→</button>`;
  document.body.append(pager);
  const [previous, next] = pager.querySelectorAll('button');
  function renderReadingMode() {
    groups.forEach((nodes, i) => nodes.forEach(node => { node.hidden = readingMode === 'pages' && i !== pageIndex; }));
    root.dataset.readingMode = readingMode;
    pager.hidden = readingMode !== 'pages';
    previous.disabled = pageIndex === 0;
    next.disabled = pageIndex === groups.length - 1;
    pager.querySelector('span').textContent = `${pageIndex + 1} / ${groups.length}`;
    modes.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === readingMode)));
    progress();
    window.dispatchEvent(new Event('resize'));
  }
  modes.addEventListener('click', event => {
    const mode = event.target.closest('[data-mode]')?.dataset.mode;
    if (!mode || mode === readingMode) return;
    if (readingMode === 'scroll') {
      pageIndex = 0;
      headings.forEach((h, i) => { if (h.getBoundingClientRect().top <= window.innerHeight * .35) pageIndex = i; });
    }
    readingMode = mode;
    renderReadingMode();
    if (mode === 'pages') window.scrollTo(0, 0);
    else headings[pageIndex]?.scrollIntoView({block: 'start'});
  });
  function turn(delta) {
    pageIndex = Math.max(0, Math.min(groups.length - 1, pageIndex + delta));
    renderReadingMode();
    window.scrollTo(0, 0);
  }
  previous.onclick = () => turn(-1);
  next.onclick = () => turn(1);
  // Parent-side hook: let the guided tour bring a hidden section's demo on page.
  window.lessonGoToPage = idx => {
    readingMode = 'pages';
    pageIndex = Math.max(0, Math.min(groups.length - 1, idx | 0));
    renderReadingMode();
    window.scrollTo(0, 0);
  };
  // Parent-side hook: let the guided tour bring a hidden section's demo on page.
  window.lessonGoToPage = idx => {
    readingMode = 'pages';
    pageIndex = Math.max(0, Math.min(groups.length - 1, idx | 0));
    renderReadingMode();
    window.scrollTo(0, 0);
  };
  window.addEventListener('keydown', event => {
    if (readingMode !== 'pages' || event.target.closest('input,textarea,select,button,[contenteditable],.demo')) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); turn(event.key === 'ArrowLeft' ? -1 : 1); }
  });
  renderReadingMode();
  const checks=[...document.querySelectorAll('[data-checkpoint]')];
  const key='fourier:2.4-2:fresh-20260909:completed';
  let passed=new Set();
  try { const saved=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(saved))passed=new Set(saved.filter(x=>checks.some(c=>c.dataset.checkpoint===x))); } catch (_) {}
  function theme(value,notify=true) {
    const next=value==='dark'?'dark':'light';root.dataset.theme=next;
    header.dataset.theme=next;
    button.setAttribute('aria-label',`切换到${next==='dark'?'浅色':'深色'}模式`);
    try{localStorage.setItem('fourier-theme',next);}catch(_){}
    if(notify&&window.parent!==window)window.parent.postMessage({type:'fourier-lesson-theme',theme:next},location.origin);
  }
  button.onclick=()=>theme(root.dataset.theme==='dark'?'light':'dark');
  window.addEventListener('message',e=>{if(e.origin===location.origin&&e.source===parent&&e.data?.type==='fourier-lesson-theme')theme(e.data.theme,false);});
  theme(root.dataset.theme,false);
  function progress() {
    const bottom=embedded ? 0 : header.getBoundingClientRect().bottom;
    let current=1;for(const h of headings)if(h.getBoundingClientRect().top<=bottom+32)current=Number(h.dataset.section);
    if (readingMode === 'pages') current = pageIndex + 1;
    const total=headings.length,percent=Math.round(100*current/total);
    positionLabel.textContent=`${label.current} ${current}/${total}`;
    percentLabel.textContent=`${percent}%`;
    progressBar.style.width=`${100*current/total}%`;
  }
  checks.forEach(check=>{
    const feedback=check.querySelector('.feedback');
    if(passed.has(check.dataset.checkpoint)){check.dataset.passed='true';feedback.textContent=label.completed;}
    check.querySelectorAll('[data-correct]').forEach(b=>b.onclick=()=>{
      const right=b.dataset.correct==='true';feedback.textContent=b.dataset.feedback;
      if(right){passed.add(check.dataset.checkpoint);check.dataset.passed='true';try{localStorage.setItem(key,JSON.stringify([...passed]));}catch(_){}progress();}
    });
  });
  let scheduled=false;window.addEventListener('scroll',()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;progress();});},{passive:true});
  window.addEventListener('resize',progress);window.addEventListener('load',progress);progress();
})();
