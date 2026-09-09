(() => {
  const root=document.documentElement, button=document.getElementById('theme-toggle');
  const headings=[...document.querySelectorAll('h2[data-section]')];
  const checks=[...document.querySelectorAll('[data-checkpoint]')];
  const key='fourier:2.4-2:fresh-20260909:completed';
  let passed=new Set();
  try { const saved=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(saved))passed=new Set(saved.filter(x=>checks.some(c=>c.dataset.checkpoint===x))); } catch (_) {}
  function theme(value,notify=true) {
    const next=value==='dark'?'dark':'light';root.dataset.theme=next;
    button.setAttribute('aria-label',`Switch to ${next==='dark'?'light':'dark'} mode`);
    try{localStorage.setItem('fourier-theme',next);}catch(_){}
    if(notify&&window.parent!==window)window.parent.postMessage({type:'fourier-lesson-theme',theme:next},location.origin);
  }
  button.onclick=()=>theme(root.dataset.theme==='dark'?'light':'dark');
  window.addEventListener('message',e=>{if(e.origin===location.origin&&e.source===parent&&e.data?.type==='fourier-lesson-theme')theme(e.data.theme,false);});
  theme(root.dataset.theme,false);
  function progress() {
    const bottom=document.querySelector('.progress-shell').getBoundingClientRect().bottom;
    let current=1;for(const h of headings)if(h.getBoundingClientRect().top<=bottom+32)current=Number(h.dataset.section);
    const total=headings.length,percent=Math.round(100*current/total);
    document.getElementById('progress-position').textContent=`Current ${current}/${total}`;
    document.getElementById('progress-completed').textContent=`Completed ${passed.size}/${total}`;
    document.getElementById('progress-percent').textContent=`${percent}%`;
    document.getElementById('progress-bar').style.width=`${100*current/total}%`;
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
