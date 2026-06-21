// signal-transform — extracted from app.js Phase 3 PR #21 (hydrateInteractiveDemos dispatcher split).
// Loaded as a classic <script> BEFORE app.js. Reaches into the shared script-global
// lexical env for helpers (no bundler, no IIFE, no module.exports).
//
// External globals used at call time:
//   - escapeHtml, decodeInlineMarkdownFragment, getInteractiveDemoSpec, formatInteractiveDemoNumber, window.typesetMath (app.js + globals)
//
// Public surface (free-name lookup from the dispatcher in app.js):
//   - the top-level function defined below

function renderSignalTransformFallback(node, demo) {
  const title = getInteractiveDemoTitle(demo, 'Signal transform sandbox');
  const subtitle = getInteractiveDemoSubtitle(demo) || 'Move the sliders and watch landmarks shift together.';
  const titleText = `${title} ${subtitle} ${getInteractiveDemoText(demo)}`.toLowerCase();
  const state = Object.create(null);
  state.waveform = /unit step|window/.test(titleText) ? 'step'
    : /periodic|periodicity|shift-test|does the shift match/.test(titleText) ? 'periodic'
      : /mirror|reflection|flip/.test(titleText) ? 'pulse'
        : /g\(at\+b\)|x\(at-b\)|landmark/.test(titleText) ? 'burst'
          : 'pulse';
  state.a = /reflection|mirror/.test(titleText) ? -1 : 2;
  state.b = /unit step|window/.test(titleText) ? 1 : 1;

  const baseSignal = (t) => {
    switch (state.waveform) {
      case 'step':
        return t >= 0 ? 1 : 0;
      case 'periodic':
        return 0.65 * Math.cos(Math.PI * t) + 0.15 * Math.cos(3 * Math.PI * t);
      case 'burst':
        return t < -0.5 || t > 2.5 ? 0 : Math.exp(-0.35 * (t + 0.5)) * Math.cos(2.2 * Math.PI * (t + 0.5));
      default:
        if (t < -1 || t > 2) return 0;
        if (t < 0) return t + 1;
        if (t < 1) return 1 - 0.25 * t;
        return Math.max(0, 0.75 - 0.75 * (t - 1));
    }
  };

  const sample = (fn, minT, maxT, steps = 320) => Array.from({ length: steps + 1 }, (_, i) => {
    const t = minT + ((maxT - minT) * i) / steps;
    return { t, value: fn(t) };
  });

  node.innerHTML = `
    <section class="interactive-demo-shell interactive-demo-shell--signal">
      <div class="interactive-demo-head">
        <div class="interactive-demo-title">${escapeHtml(title)}</div>
        <div class="interactive-demo-subtitle">${escapeHtml(subtitle)}</div>
      </div>
      <div class="interactive-demo-grid">
        <div class="interactive-demo-controls">
          <label class="interactive-demo-control">
            <span class="interactive-demo-control-label">Waveform</span>
            <select class="interactive-demo-select" data-control="waveform">
              <option value="pulse">Asymmetric pulse</option>
              <option value="step">Unit step</option>
              <option value="periodic">Periodic wave</option>
              <option value="burst">Causal burst</option>
            </select>
          </label>
          <label class="interactive-demo-control">
            <span class="interactive-demo-control-label">a</span>
            <div class="interactive-demo-slider-row">
              <input type="range" min="-3" max="3" step="0.5" value="${state.a}" data-control="a">
              <strong class="interactive-demo-control-value" data-value="a"></strong>
            </div>
          </label>
          <label class="interactive-demo-control">
            <span class="interactive-demo-control-label">b</span>
            <div class="interactive-demo-slider-row">
              <input type="range" min="-6" max="6" step="0.5" value="${state.b}" data-control="b">
              <strong class="interactive-demo-control-value" data-value="b"></strong>
            </div>
          </label>
          <div class="interactive-demo-brief-card">
            <div class="interactive-demo-brief-label">Shift rule</div>
            <div class="interactive-demo-brief-copy" data-copy="formula"></div>
          </div>
        </div>
        <div class="interactive-demo-stage">
          <canvas class="interactive-demo-canvas" height="320"></canvas>
        </div>
      </div>
      <div class="interactive-demo-readouts">
        <div class="interactive-demo-readout" data-readout="shift"></div>
        <div class="interactive-demo-readout" data-readout="rule"></div>
      </div>
    </section>
  `;

  const canvas = node.querySelector('.interactive-demo-canvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  const shellEl = node.querySelector('.interactive-demo-shell');
  const formulaEl = node.querySelector('[data-copy="formula"]');
  const shiftReadout = node.querySelector('[data-readout="shift"]');
  const ruleReadout = node.querySelector('[data-readout="rule"]');
  const controls = {
    waveform: node.querySelector('[data-control="waveform"]'),
    a: node.querySelector('[data-control="a"]'),
    b: node.querySelector('[data-control="b"]')
  };
  const values = {
    a: node.querySelector('[data-value="a"]'),
    b: node.querySelector('[data-value="b"]')
  };

  const draw = () => {
    state.waveform = controls.waveform.value;
    state.a = Number(controls.a.value);
    state.b = Number(controls.b.value);
    if (values.a) values.a.textContent = Number(state.a.toFixed(1)).toString();
    if (values.b) values.b.textContent = Number(state.b.toFixed(1)).toString();

    if (!ctx || !canvas) return;
    const { width, height } = setupInteractiveDemoCanvas(canvas, ctx, 320, 340);
    const panelH = Math.floor((height - 28) / 2);
    const panels = [
      { y: 12, label: 'x(t)', color: '#1d4ed8', fn: baseSignal },
      { y: 12 + panelH + 12, label: 'y(t) = x(at - b)', color: '#0f766e', fn: (t) => baseSignal(state.a * t - state.b) }
    ];
    const xRange = { minT: -4, maxT: 6 };
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    panels.forEach((panel) => {
      const originY = panel.y + Math.round(panelH * 0.64);
      const toX = (t) => 36 + ((t - xRange.minT) / (xRange.maxT - xRange.minT)) * (width - 72);
      const yMin = -1.4;
      const yMax = 1.4;
      const toY = (v) => panel.y + panelH - 18 - ((v - yMin) / (yMax - yMin)) * (panelH - 30);
      ctx.strokeStyle = '#dbe3f0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(36, originY);
      ctx.lineTo(width - 36, originY);
      ctx.stroke();
      ctx.strokeStyle = '#cbd5e1';
      ctx.beginPath();
      ctx.moveTo(36, panel.y + 10);
      ctx.lineTo(36, panel.y + panelH - 10);
      ctx.stroke();
      ctx.fillStyle = '#334155';
      ctx.font = '700 13px Quicksand, sans-serif';
      ctx.fillText(panel.label, 44, panel.y + 18);
      const points = sample(panel.fn, xRange.minT, xRange.maxT, 340);
      ctx.strokeStyle = panel.color;
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      points.forEach((pt, index) => {
        const x = toX(pt.t);
        const y = toY(pt.value);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      const shift = state.a !== 0 ? state.b / state.a : 0;
      const markerX = toX(shift);
      ctx.strokeStyle = '#f59e0b';
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(markerX, panel.y + 12);
      ctx.lineTo(markerX, panel.y + panelH - 18);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#475569';
      ctx.fillText('t = b/a', markerX - 16, panel.y + 28);
      if (panel.label === 'y(t) = x(at - b)') {
        ctx.fillStyle = '#334155';
        ctx.fillText(state.a < 0 ? 'time reversal' : 'time scaling', width - 140, panel.y + 18);
      }
    });

    const shift = state.a !== 0 ? state.b / state.a : 0;
    const formula = `y(t) = x(${Number(state.a.toFixed(2)).toString()}t ${state.b >= 0 ? '-' : '+'} ${Number(Math.abs(state.b).toFixed(2)).toString()})`;
    if (formulaEl) formulaEl.textContent = formula;
    if (shiftReadout) shiftReadout.innerHTML = `<strong>Effective shift:</strong> ${fmt(shift)} (${state.a >= 0 ? 'slide right when b > 0' : 'reflection plus shift'})`;
    if (ruleReadout) ruleReadout.innerHTML = `<strong>Rule:</strong> when a is negative, the waveform flips before it shifts.`;
  };

  Object.values(controls).forEach((control) => control?.addEventListener('input', draw));
  if (shellEl) shellEl.classList.toggle('is-narrow', shellEl.clientWidth < 760);
  draw();
}

