// convolution-lab — extracted from app.js Phase 3 PR #21 (hydrateInteractiveDemos dispatcher split).
// Loaded as a classic <script> BEFORE app.js. Reaches into the shared script-global
// lexical env for helpers (no bundler, no IIFE, no module.exports).
//
// External globals used at call time:
//   - escapeHtml, renderInteractiveLabShell                 (app.js)
//
// Public surface (free-name lookup from the dispatcher in app.js):
//   - the top-level function defined below

function renderConvolutionLabDemo(node, demo) {
  const state = { lengthA: 4, lengthB: 3, startA: 0, startB: 0, n: 2 };
  renderInteractiveLabShell(node, demo, 'convolution', `
    <div class="interactive-demo-grid interactive-demo-grid--lab">
      <div class="interactive-demo-controls">
        <label class="interactive-demo-control"><span class="interactive-demo-control-label">Length of x[n]</span><div class="interactive-demo-slider-row"><input data-control="lengthA" type="range" min="1" max="7" step="1" value="${state.lengthA}"><strong data-value="lengthA"></strong></div></label>
        <label class="interactive-demo-control"><span class="interactive-demo-control-label">Length of h[n]</span><div class="interactive-demo-slider-row"><input data-control="lengthB" type="range" min="1" max="7" step="1" value="${state.lengthB}"><strong data-value="lengthB"></strong></div></label>
        <label class="interactive-demo-control"><span class="interactive-demo-control-label">Start of x[n]</span><div class="interactive-demo-slider-row"><input data-control="startA" type="range" min="-5" max="5" step="1" value="${state.startA}"><strong data-value="startA"></strong></div></label>
        <label class="interactive-demo-control"><span class="interactive-demo-control-label">Start of h[n]</span><div class="interactive-demo-slider-row"><input data-control="startB" type="range" min="-5" max="5" step="1" value="${state.startB}"><strong data-value="startB"></strong></div></label>
        <label class="interactive-demo-control"><span class="interactive-demo-control-label">Inspect output y[n]</span><div class="interactive-demo-slider-row"><input data-control="n" type="range" min="-5" max="12" step="1" value="${state.n}"><strong data-value="n"></strong></div></label>
      </div>
      <div class="interactive-demo-stage"><canvas class="interactive-demo-canvas"></canvas></div>
    </div>
    <div class="interactive-demo-readouts"></div>
  `);
  const canvas = node.querySelector('.interactive-demo-canvas');
  const ctx = canvas?.getContext?.('2d');
  const readoutsEl = node.querySelector('.interactive-demo-readouts');
  const inputs = node.querySelectorAll('[data-control]');

  const convolve = (a, b) => {
    const out = Array(a.length + b.length - 1).fill(0);
    a.forEach((av, i) => b.forEach((bv, j) => { out[i + j] += av * bv; }));
    return out;
  };
  const render = () => {
    const x = Array.from({ length: state.lengthA }, (_, i) => i === 0 ? 1 : 1);
    const h = Array.from({ length: state.lengthB }, (_, i) => state.lengthB - i);
    const y = convolve(x, h);
    const yStart = state.startA + state.startB;
    state.n = Math.max(yStart, Math.min(yStart + y.length - 1, state.n));
    const { width, height } = setupInteractiveDemoCanvas(canvas, ctx, 330, 360);
    if (!width) return;
    const minN = Math.min(state.startA, state.startB, yStart) - 1;
    const maxN = Math.max(state.startA + x.length, state.startB + h.length, yStart + y.length) + 1;
    const rowH = height / 3;
    const maxVal = Math.max(...x, ...h, ...y, 1);
    const drawRow = (label, values, start, row, color, highlightIndex = null) => {
      ctx.save();
      ctx.translate(0, rowH * (row - 1));
      const axes = drawInteractiveDemoAxes(ctx, width, rowH, { minT: minN, maxT: maxN, originY: Math.round(rowH * 0.62), tickStep: 2, pad: 34 });
      ctx.fillStyle = '#0f172a';
      ctx.font = '700 13px Quicksand, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(label, 36, 20);
      drawDemoStemSeries(ctx, values, start, axes.toX, axes.originY, (rowH * 0.43) / maxVal, color, { labels: row === 3 });
      if (Number.isFinite(highlightIndex)) {
        const xPos = axes.toX(highlightIndex);
        ctx.strokeStyle = '#dc2626';
        ctx.setLineDash([6, 5]);
        ctx.beginPath();
        ctx.moveTo(xPos, 18);
        ctx.lineTo(xPos, rowH - 26);
        ctx.stroke();
      }
      ctx.restore();
    };
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#fffefa';
    ctx.fillRect(0, 0, width, height);
    drawRow('x[n]', x, state.startA, 1, '#2563eb');
    drawRow('h[n]', h, state.startB, 2, '#0f766e');
    drawRow('y[n] = x[n] * h[n]', y, yStart, 3, '#b45309', state.n);
    const yValue = y[state.n - yStart] ?? 0;
    const support = `${yStart} <= n <= ${yStart + y.length - 1}`;
    readoutsEl.innerHTML = `
      <div class="interactive-demo-readout"><strong>Support:</strong> ${escapeHtml(support)}. Changing either start index shifts the output support by the same amount.</div>
      <div class="interactive-demo-readout"><strong>Current sample:</strong> \\(y[${state.n}] = ${formatInteractiveDemoNumber(yValue)}\\). The values come from overlap-and-sum, not pointwise multiplication.</div>
    `;
    if (typeof renderMathInElement === 'function') renderMathInElement(readoutsEl);
  };
  inputs.forEach((input) => {
    const key = input.dataset.control;
    const valueEl = node.querySelector(`[data-value="${key}"]`);
    const update = () => {
      state[key] = Number(input.value);
      if (valueEl) valueEl.textContent = formatInteractiveDemoNumber(state[key], 0);
      render();
    };
    input.addEventListener('input', update);
    update();
  });
  window.addEventListener('resize', render, { passive: true });
}

