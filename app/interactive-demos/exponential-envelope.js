// exponential-envelope — extracted from app.js Phase 3 PR #21 (hydrateInteractiveDemos dispatcher split).
// Loaded as a classic <script> BEFORE app.js. Reaches into the shared script-global
// lexical env for helpers (no bundler, no IIFE, no module.exports).
//
// External globals used at call time:
//   - escapeHtml, decodeInlineMarkdownFragment, getInteractiveDemoSpec, formatInteractiveDemoNumber, window.typesetMath (app.js + globals)
//
// Public surface (free-name lookup from the dispatcher in app.js):
//   - the top-level function defined below

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

