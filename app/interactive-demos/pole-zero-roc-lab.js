// pole-zero-roc-lab — extracted from app.js Phase 3 PR #21 (hydrateInteractiveDemos dispatcher split).
// Loaded as a classic <script> BEFORE app.js. Reaches into the shared script-global
// lexical env for helpers (no bundler, no IIFE, no module.exports).
//
// External globals used at call time:
//   - escapeHtml, renderInteractiveLabShell                 (app.js)
//
// Public surface (free-name lookup from the dispatcher in app.js):
//   - the top-level function defined below

function renderPoleZeroRocLabDemo(node, demo) {
  const intent = getInteractiveDemoIntent(demo);
  const titleIntent = getInteractiveDemoTitle(demo, '').toLowerCase();
  const isZPlane = /\bz[-\s]?plane|z[-\s]?domain|unit circle|z[-\s]?transform|\bz\b/i.test(intent) && !/\blaplace|\bs-plane|\bs-domain|\bs\)/i.test(intent);
  const state = { radius: isZPlane ? 0.72 : 1.1, angle: isZPlane ? 42 : 125, roc: /inside|anti/i.test(titleIntent) ? 'inside' : 'outside' };
  renderInteractiveLabShell(node, demo, 'pole-zero', `
    <div class="interactive-demo-grid interactive-demo-grid--lab">
      <div class="interactive-demo-controls">
        <label class="interactive-demo-control"><span class="interactive-demo-control-label">${isZPlane ? 'Pole radius |z|' : 'Pole distance from origin'}</span><div class="interactive-demo-slider-row"><input data-control="radius" type="range" min="0.2" max="1.6" step="0.01" value="${state.radius}"><strong data-value="radius"></strong></div></label>
        <label class="interactive-demo-control"><span class="interactive-demo-control-label">Pole angle</span><div class="interactive-demo-slider-row"><input data-control="angle" type="range" min="-170" max="170" step="1" value="${state.angle}"><strong data-value="angle"></strong></div></label>
        <div class="interactive-demo-tabs interactive-demo-tabs--inline">
          <button type="button" data-roc="outside" class="interactive-demo-tab${state.roc === 'outside' ? ' is-active' : ''}">${isZPlane ? 'causal / outside' : 'causal / right side'}</button>
          <button type="button" data-roc="inside" class="interactive-demo-tab${state.roc === 'inside' ? ' is-active' : ''}">${isZPlane ? 'anti-causal / inside' : 'anti-causal / left side'}</button>
        </div>
      </div>
      <div class="interactive-demo-stage"><canvas class="interactive-demo-canvas"></canvas></div>
    </div>
    <div class="interactive-demo-readouts"></div>
  `);
  const canvas = node.querySelector('.interactive-demo-canvas');
  const ctx = canvas?.getContext?.('2d');
  const readoutsEl = node.querySelector('.interactive-demo-readouts');
  const render = () => {
    const { width, height } = setupInteractiveDemoCanvas(canvas, ctx, 330, 360);
    if (!width) return;
    const cx = Math.round(width * 0.52);
    const cy = Math.round(height * 0.52);
    const scale = Math.min(width, height) * 0.29;
    const theta = state.angle * Math.PI / 180;
    const px = cx + Math.cos(theta) * state.radius * scale;
    const py = cy - Math.sin(theta) * state.radius * scale;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#fffefa';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(34, cy);
    ctx.lineTo(width - 34, cy);
    ctx.moveTo(cx, 26);
    ctx.lineTo(cx, height - 34);
    ctx.stroke();
    if (isZPlane) {
      ctx.strokeStyle = '#94a3b8';
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(cx, cy, scale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = state.roc === 'outside' ? 'rgba(34,197,94,0.12)' : 'rgba(96,165,250,0.12)';
      ctx.beginPath();
      if (state.roc === 'outside') {
        ctx.rect(0, 0, width, height);
        ctx.arc(cx, cy, state.radius * scale, 0, Math.PI * 2, true);
      } else {
        ctx.arc(cx, cy, state.radius * scale, 0, Math.PI * 2);
      }
      ctx.fill('evenodd');
    } else {
      const boundaryX = px;
      ctx.fillStyle = state.roc === 'outside' ? 'rgba(34,197,94,0.12)' : 'rgba(96,165,250,0.12)';
      ctx.fillRect(state.roc === 'outside' ? boundaryX : 0, 0, state.roc === 'outside' ? width - boundaryX : boundaryX, height);
      ctx.strokeStyle = '#64748b';
      ctx.setLineDash([6, 5]);
      ctx.beginPath();
      ctx.moveTo(boundaryX, 24);
      ctx.lineTo(boundaryX, height - 34);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px, py);
    ctx.stroke();
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(px - 8, py - 8);
    ctx.lineTo(px + 8, py + 8);
    ctx.moveTo(px + 8, py - 8);
    ctx.lineTo(px - 8, py + 8);
    ctx.stroke();
    ctx.strokeStyle = '#0f766e';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx + 0.28 * scale, cy, 7, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#0f172a';
    ctx.font = '700 13px Quicksand, sans-serif';
    ctx.fillText(isZPlane ? 'z-plane' : 's-plane sketch', 34, 28);
    ctx.fillStyle = '#64748b';
    ctx.font = '600 12px Quicksand, sans-serif';
    ctx.fillText(isZPlane ? 'unit circle' : 'real / imaginary axes', cx + scale + 10, cy - 10);
    const sigma = Math.cos(theta) * state.radius;
    const stable = isZPlane ? state.radius < 1 : sigma < 0;
    const rocText = isZPlane
      ? (state.roc === 'outside' ? `ROC: |z| > ${formatInteractiveDemoNumber(state.radius)}` : `ROC: |z| < ${formatInteractiveDemoNumber(state.radius)}`)
      : (state.roc === 'outside' ? `ROC: Re{s} > ${formatInteractiveDemoNumber(sigma)}` : `ROC: Re{s} < ${formatInteractiveDemoNumber(sigma)}`);
    readoutsEl.innerHTML = `
      <div class="interactive-demo-readout"><strong>${isZPlane ? 'ROC' : 'Pole geometry'}:</strong> ${escapeHtml(rocText)}</div>
      <div class="interactive-demo-readout"><strong>Stability cue:</strong> ${isZPlane ? (stable ? 'pole is inside the unit circle' : 'pole is outside the unit circle') : (stable ? 'left-half plane pole' : 'right-half plane pole')}.</div>
    `;
  };
  node.querySelectorAll('[data-control]').forEach((input) => {
    const key = input.dataset.control;
    const valueEl = node.querySelector(`[data-value="${key}"]`);
    const update = () => {
      state[key] = Number(input.value);
      if (valueEl) valueEl.textContent = key === 'angle' ? `${formatInteractiveDemoNumber(state[key], 0)}°` : formatInteractiveDemoNumber(state[key]);
      render();
    };
    input.addEventListener('input', update);
    update();
  });
  node.querySelectorAll('[data-roc]').forEach((button) => {
    button.addEventListener('click', () => {
      state.roc = button.dataset.roc;
      node.querySelectorAll('[data-roc]').forEach((item) => item.classList.toggle('is-active', item === button));
      render();
    });
  });
  window.addEventListener('resize', render, { passive: true });
}

