// parameter-response — extracted from app.js Phase 3 PR #21 (hydrateInteractiveDemos dispatcher split).
// Loaded as a classic <script> BEFORE app.js. Reaches into the shared script-global
// lexical env for helpers (no bundler, no IIFE, no module.exports).
//
// External globals used at call time:
//   - escapeHtml, decodeInlineMarkdownFragment, getInteractiveDemoSpec, formatInteractiveDemoNumber, window.typesetMath (app.js + globals)
//
// Public surface (free-name lookup from the dispatcher in app.js):
//   - the top-level function defined below

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

