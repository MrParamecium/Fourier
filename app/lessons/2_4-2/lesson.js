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
  const headings=[...document.querySelectorAll('h2[data-section]')];
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
    const total=headings.length,percent=Math.round(100*current/total);
    positionLabel.textContent=`Current ${current}/${total}`;
    percentLabel.textContent=`${percent}%`;
    progressBar.style.width=`${100*current/total}%`;
  }
  checks.forEach(check=>{
    const feedback=check.querySelector('.feedback');
    if(passed.has(check.dataset.checkpoint)){check.dataset.passed='true';feedback.textContent='Completed previously. Try again whenever you want.';}
    check.querySelectorAll('[data-correct]').forEach(b=>b.onclick=()=>{
      const right=b.dataset.correct==='true';feedback.textContent=b.dataset.feedback;
      if(right){passed.add(check.dataset.checkpoint);check.dataset.passed='true';try{localStorage.setItem(key,JSON.stringify([...passed]));}catch(_){}progress();}
    });
  });
  let scheduled=false;window.addEventListener('scroll',()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;progress();});},{passive:true});
  window.addEventListener('resize',progress);window.addEventListener('load',progress);progress();
})();
