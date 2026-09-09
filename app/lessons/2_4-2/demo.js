/* Four independent constructions with isolated state and one shared runtime loader. */
(() => {
  let loader;
  const waitForRuntime = () => loader ||= new Promise((resolve, reject) => {
    if (window.GGBApplet) return resolve();
    const script=document.createElement('script');
    script.src='https://www.geogebra.org/apps/deployggb.js';
    const timer=setTimeout(()=>reject(new Error('GeoGebra download timed out.')),25000);
    script.onload=()=>{clearTimeout(timer);window.GGBApplet?resolve():reject(new Error('GeoGebra did not initialize.'));};
    script.onerror=()=>{clearTimeout(timer);reject(new Error('GeoGebra could not be downloaded.'));};
    document.head.append(script);
  });
  const text=(root,selector,value)=>{root.querySelector(selector).textContent=value;};
  const controllers=[];
  function mount(root) {
    const id=root.dataset.demo, m=window.ConvolutionModels[id];
    let upper,lower,step=1,t=0,animation=0,flipping=0,playing=false,loaded=false;
    const play=root.querySelector('[data-play]'), slider=root.querySelector('input[type=range]');
    slider.min=m.min;slider.max=m.max;slider.step='0.01';slider.value=0;
    root.querySelector('[data-functions]').replaceChildren(...m.formulas.map(value=>{const li=document.createElement('li');li.textContent=value;return li;}));
    text(root,'[data-model-note]',m.note);
    m.checkpoints.forEach(value=>{const b=document.createElement('button');b.type='button';b.textContent=`t = ${Number(value.toFixed(2))}`;b.dataset.time=value;b.onclick=()=>{stop();t=value;slider.value=value;sync();};root.querySelector('[data-times]').append(b);});
    function stop() { playing=false;cancelAnimationFrame(animation);animation=0;play.textContent='Play'; }
    function sync() {
      text(root,'[data-time-value]',t.toFixed(2));
      text(root,'[data-interval]',step>=3?m.interval(t):'Read / flip at t = 0');
      text(root,'[data-bounds]',step>=3?m.bounds(t):'Find the overlap in step 3');
      text(root,'[data-area-value]',step===4?m.value(t).toFixed(4):'Integrate in step 4');
      if(upper) {
        upper.setValue('t',t);
        upper.setValue('s',step);
        const [l,r]=m.limits(t);
        upper.setValue('L',l);upper.setValue('R',Math.max(l,r));
        upper.setTextValue('caseLabel',step>=3?m.interval(t):step===1?'Original signals':'Time reversal about τ = 0');
        upper.setTextValue('movingLabel',step===1?`${m.movingName}(τ)`:step===2?`${m.movingName}(−τ)`:`${m.movingName}(t−τ)`);
      }
      lower?.setValue('t',t);
    }
    function setStep(next) {
      stop();cancelAnimationFrame(flipping);flipping=0;step=next;
      if(step<3){t=0;slider.value=0;}
      const notes=[`Keep ${m.fixedLabel} fixed and read the original ${m.movingName}(τ).`,
        m.movingName==='x'?'Flip x(τ) to x(−τ). The even rectangle keeps its shape; colored endpoints exchange sides.':'Flip about τ = 0. Watch the orange curve reflect and its endpoint markers change sides.',
        `Drag t to shift ${m.movingName}(−τ) to ${m.movingName}(t−τ). Read the boundaries before integrating.`,
        'The upper signed product area gives one lower output point. Press Play to trace the result as t changes.'];
      text(root,'[data-step-note]',notes[step-1]);
      root.querySelectorAll('[data-step]').forEach(b=>{const active=+b.dataset.step===step;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active);});
      slider.disabled=step<3||!loaded;
      root.querySelectorAll('[data-time]').forEach(b=>b.disabled=step<3||!loaded);
      play.hidden=step!==4;play.disabled=!loaded;
      if(upper) {
        upper.setValue('q',step===1?1:-1);
        ['shade','A','p'].forEach(n=>upper.setVisible(n,step===4));
        ['edgeLeft','edgeRight','leftLabel','rightLabel'].forEach(n=>upper.setVisible(n,step>=3));
        ['E','F'].forEach(n=>upper.setVisible(n,step<3));
        upper.setVisible('flipCurve',false);upper.setVisible('r',true);
        upper.setAuxiliary('A',step!==4);
      }
      if(lower){lower.setVisible('trace',step===4);lower.setVisible('P',step===4);['c','P'].forEach(n=>lower.setAuxiliary(n,step!==4));}
      sync();
    }
    root.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>{
      setStep(+b.dataset.step);
      if(step!==2||!upper||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
      upper.setValue('q',1);upper.setVisible('r',false);upper.setVisible('flipCurve',true);
      const start=performance.now();
      const tick=now=>{const f=Math.min(1,(now-start)/900);upper.setValue('q',Math.cos(Math.PI*f));if(f<1)flipping=requestAnimationFrame(tick);else{upper.setVisible('flipCurve',false);upper.setVisible('r',true);}};
      flipping=requestAnimationFrame(tick);
    });
    slider.oninput=()=>{stop();t=Number(slider.value);sync();};
    root.querySelector('[data-reset]').onclick=()=>setStep(1);
    play.onclick=()=>{
      if(!loaded||step!==4)return;
      if(playing){stop();return;}
      controllers.forEach(c=>c.stop());
      if(t>=m.max)t=m.min;
      playing=true;play.textContent='Pause';let prev=0;
      const tick=now=>{if(!playing)return;if(!prev)prev=now;if(now-prev>=32){t=Math.min(m.max,t+(now-prev)*0.00055);prev=now;slider.value=t;sync();}if(t>=m.max){stop();return;}animation=requestAnimationFrame(tick);};
      animation=requestAnimationFrame(tick);
    };
    const hideHelpers=(api,keep)=>api.getAllObjectNames().forEach(name=>api.setAuxiliary(name,!keep.includes(name)));
    const command=(api,source)=>{if(!api.evalCommand(source))throw new Error(`Construction command failed: ${source}`);};
    const configure=(api,view)=>{api.setPerspective('AG');api.setCoordSystem(...view);api.setGridVisible(true);};
    function startApplet(host,kind) {
      return new Promise((resolve,reject)=>{
        const timer=setTimeout(()=>reject(new Error('GeoGebra construction timed out.')),35000);
        const applet=new window.GGBApplet({id:`fresh_${id}_${kind}`,appName:'classic',language:'en',perspective:'AG',showAuxiliaryObjects:false,width:Math.max(400,root.clientWidth-2),height:kind==='upper'?360:280,
          showToolBar:false,showMenuBar:false,showAlgebraInput:false,showResetIcon:false,showZoomButtons:false,enableRightClick:false,enableLabelDrags:false,enableShiftDragZoom:false,
          appletOnLoad:api=>{try{
            if(kind==='upper') {
              const [xmin,xmax,ymin,ymax]=m.view;
              ['t=0','s=1','q=1','L=0','R=0',`g(x)=${m.fixed}`,`original(x)=${m.original}`,
                'r(x)=If(s<2,original(x),If(s<3,original(-x),original(t-x)))',
                `flipCurve=Curve(q*u,original(u),u,${m.flipDomain[0]},${m.flipDomain[1]})`,
                'p(x)=g(x)*r(x)','shade=Integral(p,L,R)',`A=${m.area}`,
                `edgeLeft: x=${m.left}`,`edgeRight: x=${m.right}`,
                `leftLabel=Text("${m.leftLabel}",(${m.left},${ymin*0.65}))`,
                `rightLabel=Text("${m.rightLabel}",(${m.right},${ymin*0.65}))`,
                `fixedLabel=Text("${m.fixedLabel}",(${xmin+0.4},${ymax-0.2}))`,
                `movingLabel=Text("${m.movingName}(τ)",(${xmin+(xmax-xmin)*0.35},${ymax-0.2}))`,
                `caseLabel=Text("Read the signals",(${xmin+(xmax-xmin)*0.50},${ymax-0.4}))`,
                `E=(q*${m.markers[0]},original(${m.markers[0]}))`,`F=(q*${m.markers[1]},original(${m.markers[1]}))`
              ].forEach(c=>command(api,c));
              api.setVisible('original',false);api.setVisible('p',false);
              configure(api,m.view);api.setAxisLabels(1,'τ','Amplitude');
              ['g','fixedLabel'].forEach(n=>api.setColor(n,52,120,216));
              ['r','flipCurve','movingLabel'].forEach(n=>api.setColor(n,223,133,47));
              ['p','shade','A'].forEach(n=>api.setColor(n,128,86,186));api.setFilling('shade',0.32);
              ['g','r','p'].forEach(n=>{api.setLineThickness(n,3);api.setLabelVisible(n,false);});
              ['edgeLeft','edgeRight'].forEach(n=>{api.setLineStyle(n,1);api.setColor(n,140,150,165);api.setLabelVisible(n,false);});
              api.setColor('E',195,72,100);api.setColor('F',36,140,158);
              api.setCaption('E','Original left');api.setCaption('F','Original right');
              ['E','F'].forEach(n=>{api.setPointSize(n,5);api.setLabelStyle(n,3);api.setLabelVisible(n,true);});
              hideHelpers(api,['g','r','A']);upper=api;
            } else {
              ['t=0',`c(x)=${m.output}`,'P=(t,c(t))',`trace(x)=If(x>=${m.min} && x<=t,c(x))`].forEach(c=>command(api,c));
              configure(api,m.outputView);api.setAxisLabels(1,'t','c(t)');api.setVisible('c',false);
              ['c','trace'].forEach(n=>{api.setColor(n,128,86,186);api.setLineThickness(n,4);api.setLabelVisible(n,false);});
              api.setColor('P',223,133,47);api.setPointSize('P',6);api.setLabelStyle('P',1);api.setLabelVisible('P',true);
              hideHelpers(api,['c','P']);lower=api;
            }
            clearTimeout(timer);resolve(api);
          }catch(e){clearTimeout(timer);reject(e);}}
        },true);
        applet.inject(host);
      });
    }
    async function init() {
      text(root,'[data-status]','Loading GeoGebra…');
      try {
        await waitForRuntime();
        await startApplet(root.querySelector('[data-upper]'),'upper');
        await startApplet(root.querySelector('[data-lower]'),'lower');
        loaded=true;root.dataset.ready='true';text(root,'[data-status]','');setStep(step);
        const observer=new ResizeObserver(()=>{const width=Math.max(400,root.clientWidth-2);upper.setSize(width,360);lower.setSize(width,280);});observer.observe(root);
      }catch(e){root.dataset.ready='error';text(root,'[data-status]',`${e.message} Reload this lesson to retry. The textbook figure remains available above.`);console.error(e);}
    }
    setStep(1);
    const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){observer.disconnect();init();}},{rootMargin:'250px'});observer.observe(root);
    controllers.push({stop});
  }
  document.querySelectorAll('[data-demo]').forEach(mount);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)controllers.forEach(c=>c.stop());});
  window.addEventListener('pagehide',()=>controllers.forEach(c=>c.stop()));
})();
