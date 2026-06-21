// sequence-system-lab — extracted from app.js Phase 3 PR #21 (hydrateInteractiveDemos dispatcher split).
// Loaded as a classic <script> BEFORE app.js. Reaches into the shared script-global
// lexical env for helpers (no bundler, no IIFE, no module.exports).
//
// External globals used at call time:
//   - escapeHtml, renderInteractiveLabShell                 (app.js)
//
// Public surface (free-name lookup from the dispatcher in app.js):
//   - the top-level function defined below

function renderSequenceSystemLabDemo(node, demo) {
  const intent = getInteractiveDemoIntent(demo);
  const state = { pole: /resonance|mode/.test(intent) ? 0.9 : 0.65, input: 1 };
  renderInteractiveLabShell(node, demo, 'sequence-system', `
    <div class="interactive-demo-grid interactive-demo-grid--lab">
      <div class="interactive-demo-controls">
        <label class="interactive-demo-control"><span class="interactive-demo-control-label">System mode a</span><div class="interactive-demo-slider-row"><input data-control="pole" type="range" min="-0.95" max="0.95" step="0.01" value="${state.pole}"><strong data-value="pole"></strong></div></label>
        <label class="interactive-demo-control"><span class="interactive-demo-control-label">Input strength</span><div class="interactive-demo-slider-row"><input data-control="input" type="range" min="0" max="2" step="0.05" value="${state.input}"><strong data-value="input"></strong></div></label>
      </div>
      <div class="interactive-demo-stage"><canvas class="interactive-demo-canvas"></canvas></div>
    </div>
    <div class="interactive-demo-readouts"></div>
  `);
  const canvas = node.querySelector('.interactive-demo-canvas');
  const ctx = canvas?.getContext?.('2d');
  const readoutsEl = node.querySelector('.interactive-demo-readouts');
  const render = () => {
    const impulse = Array.from({ length: 18 }, (_, n) => n === 0 ? state.input : 0);
    const response = Array.from({ length: 18 }, (_, n) => state.input * Math.pow(state.pole, n));
    const { width, height } = setupInteractiveDemoCanvas(canvas, ctx, 300, 360);
    if (!width) return;
    const rowH = height / 2;
    const maxVal = Math.max(...response.map((v) => Math.abs(v)), state.input, 1);
    const drawRow = (label, values, row, color) => {
      ctx.save();
      ctx.translate(0, rowH * (row - 1));
      const axes = drawInteractiveDemoAxes(ctx, width, rowH, { minT: 0, maxT: 18, originY: Math.round(rowH * 0.62), tickStep: 3, pad: 36 });
      ctx.fillStyle = '#0f172a';
      ctx.font = '700 13px Quicksand, sans-serif';
      ctx.fillText(label, 38, 22);
      drawDemoStemSeries(ctx, values, 0, axes.toX, axes.originY, (rowH * 0.39) / maxVal, color, { labels: row === 2, radius: 3.5 });
      ctx.restore();
    };
    drawRow('input impulse δ[n]', impulse, 1, '#2563eb');
    drawRow('response h[n] = a^n u[n]', response, 2, '#0f766e');
    const behavior = Math.abs(state.pole) < 0.7 ? 'fast decay' : Math.abs(state.pole) < 0.92 ? 'slow decay / long memory' : 'near-resonant long tail';
    readoutsEl.innerHTML = `
      <div class="interactive-demo-readout"><strong>Behavior:</strong> ${escapeHtml(behavior)}. Larger |a| means the impulse response stays wide longer.</div>
      <div class="interactive-demo-readout"><strong>Exam cue:</strong> h[n] is the zero-state output when the input is δ[n], not an arbitrary output sequence.</div>
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

