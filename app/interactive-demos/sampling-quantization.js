// sampling-quantization — extracted from app.js Phase 3 PR #21 (hydrateInteractiveDemos dispatcher split).
// Loaded as a classic <script> BEFORE app.js. Reaches into the shared script-global
// lexical env for helpers (no bundler, no IIFE, no module.exports).
//
// External globals used at call time:
//   - escapeHtml, decodeInlineMarkdownFragment, getInteractiveDemoSpec, formatInteractiveDemoNumber, window.typesetMath (app.js + globals)
//
// Public surface (free-name lookup from the dispatcher in app.js):
//   - the top-level function defined below

function renderSamplingQuantizationFallback(node, demo) {
  const title = getInteractiveDemoTitle(demo, 'Sampling and quantization');
  const subtitle = getInteractiveDemoSubtitle(demo) || 'Change one axis at a time and the classification changes with it.';
  const state = { timeMode: 'continuous', ampMode: 'continuous' };
  const levels = [0.1, 0.35, 0.6, 0.85];
  const quantize = (v) => levels.reduce((best, level) => (Math.abs(v - level) < Math.abs(v - best) ? level : best), levels[0]);
  const sineVal = (i, total) => {
    const t = i / (total - 1);
    return 0.5 + 0.38 * Math.sin(2 * Math.PI * t * 1.5 - 0.4) + 0.08 * Math.sin(2 * Math.PI * t * 4);
  };

  node.innerHTML = `
    <section class="interactive-demo-shell interactive-demo-shell--sampling">
      <div class="interactive-demo-head">
        <div class="interactive-demo-title">${escapeHtml(title)}</div>
        <div class="interactive-demo-subtitle">${escapeHtml(subtitle)}</div>
      </div>
      <div class="interactive-demo-switch-row">
        <div class="interactive-demo-switch-group">
          <span class="interactive-demo-switch-label">Time axis</span>
          <button type="button" class="interactive-demo-switch is-active" data-time-mode="continuous">Continuous</button>
          <button type="button" class="interactive-demo-switch" data-time-mode="discrete">Discrete</button>
        </div>
        <div class="interactive-demo-switch-group">
          <span class="interactive-demo-switch-label">Amplitude</span>
          <button type="button" class="interactive-demo-switch is-active" data-amp-mode="continuous">Continuous</button>
          <button type="button" class="interactive-demo-switch" data-amp-mode="quantized">Quantized</button>
        </div>
      </div>
      <div class="interactive-demo-stage">
        <canvas class="interactive-demo-canvas" height="280"></canvas>
      </div>
      <div class="interactive-demo-readouts">
        <div class="interactive-demo-readout"><strong>Classification:</strong> <span data-readout="class"></span></div>
        <div class="interactive-demo-readout">First inspect the horizontal axis, then inspect the vertical axis.</div>
      </div>
    </section>
  `;

  const canvas = node.querySelector('.interactive-demo-canvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  const classReadout = node.querySelector('[data-readout="class"]');
  const timeButtons = node.querySelectorAll('[data-time-mode]');
  const ampButtons = node.querySelectorAll('[data-amp-mode]');
  const classificationFor = () => `${state.timeMode === 'continuous' ? 'Continuous-time' : 'Discrete-time'} ${state.ampMode === 'continuous' ? 'analog' : 'digital'}`;
  const setButtons = (selector, value) => {
    node.querySelectorAll(selector).forEach((button) => button.classList.toggle('is-active', button.getAttribute(selector === '[data-time-mode]' ? 'data-time-mode' : 'data-amp-mode') === value));
  };

  const draw = () => {
    if (!ctx || !canvas) return;
    const { width, height } = setupInteractiveDemoCanvas(canvas, ctx, 280, 340);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    const left = 42;
    const right = width - 18;
    const top = 22;
    const bottom = height - 28;
    const midY = (top + bottom) / 2;
    const yScale = (bottom - top) / 8;
    const drawGrid = (panelTop, panelBottom) => {
      ctx.strokeStyle = '#e2e8f0';
      for (let x = left; x <= right; x += 44) {
        ctx.beginPath();
        ctx.moveTo(x, panelTop);
        ctx.lineTo(x, panelBottom);
        ctx.stroke();
      }
    };
    drawGrid(top, bottom);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(left, midY);
    ctx.lineTo(right, midY);
    ctx.stroke();
    ctx.fillStyle = '#475569';
    ctx.font = '700 13px Quicksand, sans-serif';
    ctx.fillText('Time / samples', left, top + 16);
    ctx.fillText('Amplitude', 10, top + 18);

    const levelsY = levels.map((value) => midY - (value - 0.5) * yScale * 2.2);
    if (state.ampMode === 'quantized') {
      ctx.save();
      ctx.setLineDash([4, 6]);
      ctx.strokeStyle = '#b0b8c8';
      levelsY.forEach((y) => {
        ctx.beginPath();
        ctx.moveTo(left, y);
        ctx.lineTo(right, y);
        ctx.stroke();
      });
      ctx.restore();
    }

    if (state.timeMode === 'continuous') {
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let i = 0; i <= 220; i += 1) {
        const rawV = sineVal(i, 221);
        const v = state.ampMode === 'quantized' ? quantize(rawV) : rawV;
        const x = left + ((right - left) * i) / 220;
        const y = midY - (v - 0.5) * yScale * 2.2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    } else {
      for (let i = 0; i < 16; i += 1) {
        const rawV = sineVal(i, 16);
        const v = state.ampMode === 'quantized' ? quantize(rawV) : rawV;
        const x = left + ((right - left) * i) / 15;
        const y = midY - (v - 0.5) * yScale * 2.2;
        ctx.strokeStyle = '#1d4ed8';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(x, midY);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = '#1d4ed8';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  timeButtons.forEach((button) => button.addEventListener('click', () => {
    state.timeMode = button.getAttribute('data-time-mode');
    setButtons('[data-time-mode]', state.timeMode);
    if (classReadout) classReadout.textContent = classificationFor();
    draw();
  }));
  ampButtons.forEach((button) => button.addEventListener('click', () => {
    state.ampMode = button.getAttribute('data-amp-mode');
    setButtons('[data-amp-mode]', state.ampMode);
    if (classReadout) classReadout.textContent = classificationFor();
    draw();
  }));
  if (classReadout) classReadout.textContent = classificationFor();
  draw();
  if (classReadout) classReadout.textContent = classificationFor();
}

