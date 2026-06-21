// transform-rule-lab — extracted from app.js Phase 3 PR #21 (hydrateInteractiveDemos dispatcher split).
// Loaded as a classic <script> BEFORE app.js. Reaches into the shared script-global
// lexical env for helpers (no bundler, no IIFE, no module.exports).
//
// External globals used at call time:
//   - escapeHtml, renderInteractiveLabShell, isLaplaceFlowTransformDemo, renderLaplaceFlowTransformDemo (app.js)
//
// Public surface (free-name lookup from the dispatcher in app.js):
//   - the top-level function defined below

function renderTransformRuleLabDemo(node, demo) {
  if (isLaplaceFlowTransformDemo(demo)) {
    renderLaplaceFlowTransformDemo(node, demo);
    return;
  }
  const intent = getInteractiveDemoIntent(demo);
  const isDelay = /delay|shift/.test(intent);
  const isScale = /scal|prewarp|bilinear/.test(intent);
  const state = { a: isScale ? 1.4 : 1, delay: isDelay ? 2 : 1 };
  renderInteractiveLabShell(node, demo, 'transform-rule', `
    <div class="interactive-demo-grid interactive-demo-grid--lab">
      <div class="interactive-demo-controls">
        <label class="interactive-demo-control"><span class="interactive-demo-control-label">Scale a</span><div class="interactive-demo-slider-row"><input data-control="a" type="range" min="0.4" max="2.5" step="0.05" value="${state.a}"><strong data-value="a"></strong></div></label>
        <label class="interactive-demo-control"><span class="interactive-demo-control-label">Shift / delay</span><div class="interactive-demo-slider-row"><input data-control="delay" type="range" min="-4" max="4" step="1" value="${state.delay}"><strong data-value="delay"></strong></div></label>
      </div>
      <div class="interactive-demo-stage"><canvas class="interactive-demo-canvas"></canvas></div>
    </div>
    <div class="interactive-demo-readouts"></div>
  `);
  const canvas = node.querySelector('.interactive-demo-canvas');
  const ctx = canvas?.getContext?.('2d');
  const readoutsEl = node.querySelector('.interactive-demo-readouts');
  const render = () => {
    const { width, height } = setupInteractiveDemoCanvas(canvas, ctx, 280, 360);
    if (!width) return;
    const axes = drawInteractiveDemoAxes(ctx, width, height, { minT: -6, maxT: 6, originY: Math.round(height * 0.68), tickStep: 2, pad: 42 });
    const toY = (v) => axes.originY - v * 70;
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 240; i += 1) {
      const t = -6 + i * 12 / 240;
      const v = Math.exp(-Math.max(t, 0) * 0.65) * (t >= 0 ? 1 : 0);
      const x = axes.toX(t);
      const y = toY(v);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i <= 240; i += 1) {
      const t = -6 + i * 12 / 240;
      const sourceT = state.a * (t - state.delay);
      const v = Math.exp(-Math.max(sourceT, 0) * 0.65) * (sourceT >= 0 ? 1 : 0);
      const x = axes.toX(t);
      const y = toY(v);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = '#0f172a';
    ctx.font = '700 13px Quicksand, sans-serif';
    ctx.fillText('gray: original    blue: transformed', 48, 28);
    const factor = isScale ? `scale factor a = ${formatInteractiveDemoNumber(state.a)}` : `delay = ${formatInteractiveDemoNumber(state.delay, 0)}`;
    readoutsEl.innerHTML = `
      <div class="interactive-demo-readout"><strong>Current rule:</strong> ${escapeHtml(factor)}. The picture moves first; the transform-domain multiplier/substitution follows from that move.</div>
      <div class="interactive-demo-readout"><strong>Do not memorize blindly:</strong> identify whether the operation is a shift, scaling, integration, or domain substitution before applying the formula.</div>
    `;
  };
  node.querySelectorAll('[data-control]').forEach((input) => {
    const key = input.dataset.control;
    const valueEl = node.querySelector(`[data-value="${key}"]`);
    const update = () => {
      state[key] = Number(input.value);
      if (valueEl) valueEl.textContent = formatInteractiveDemoNumber(state[key], key === 'delay' ? 0 : 2);
      render();
    };
    input.addEventListener('input', update);
    update();
  });
  window.addEventListener('resize', render, { passive: true });
}

