// frequency-response-lab — extracted from app.js Phase 3 PR #21 (hydrateInteractiveDemos dispatcher split).
// Loaded as a classic <script> BEFORE app.js. Reaches into the shared script-global
// lexical env for helpers (no bundler, no IIFE, no module.exports).
//
// External globals used at call time:
//   - escapeHtml, renderInteractiveLabShell                 (app.js)
//
// Public surface (free-name lookup from the dispatcher in app.js):
//   - the top-level function defined below

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

