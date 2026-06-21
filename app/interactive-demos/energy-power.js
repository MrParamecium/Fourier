// energy-power — extracted from app.js Phase 3 PR #21 (hydrateInteractiveDemos dispatcher split).
// Loaded as a classic <script> BEFORE app.js. Reaches into the shared script-global
// lexical env for helpers (no bundler, no IIFE, no module.exports).
//
// External globals used at call time:
//   - escapeHtml, decodeInlineMarkdownFragment, getInteractiveDemoSpec, formatInteractiveDemoNumber, window.typesetMath (app.js + globals)
//
// Public surface (free-name lookup from the dispatcher in app.js):
//   - the top-level function defined below

function renderEnergyPowerFallback(node, demo) {
  const title = getInteractiveDemoTitle(demo, 'Energy vs Power');
  const subtitle = getInteractiveDemoSubtitle(demo) || 'Watch the running energy and average power separate as T grows.';
  const titleText = `${title} ${subtitle} ${getInteractiveDemoText(demo)}`.toLowerCase();
  const state = {
    signal: /cosine|power/.test(titleText) ? 'cosine' : /ramp/.test(titleText) ? 'ramp' : 'pulse',
    T: 3,
    a: 1.5,
    omega: 2
  };

  const signalValue = (t) => {
    switch (state.signal) {
      case 'cosine':
        return Math.cos(t);
      case 'ramp':
        return t >= 0 ? t : 0;
      case 'real_exp':
        return t >= 0 ? Math.exp(-state.a * t) : Math.exp(state.a * t);
      default:
        return t < 0 ? 0 : t <= 1 ? 1 : 0;
    }
  };
  const sampleSignal = (fn, minT, maxT, steps = 240) => Array.from({ length: steps + 1 }, (_, i) => {
    const t = minT + ((maxT - minT) * i) / steps;
    return { t, value: fn(t) };
  });

  const classify = () => {
    if (state.signal === 'pulse') return 'Energy signal';
    if (state.signal === 'cosine') return 'Power signal';
    return 'Neither';
  };

  const integrate = (halfWindow) => {
    const dt = 0.01;
    let energy = 0;
    for (let t = -halfWindow; t <= halfWindow; t += dt) {
      const v = signalValue(t);
      energy += (v * v) * dt;
    }
    const power = halfWindow > 0 ? energy / (2 * halfWindow) : 0;
    return { energy, power };
  };

  node.innerHTML = `
    <section class="interactive-demo-shell interactive-demo-shell--energy">
      <div class="interactive-demo-head">
        <div class="interactive-demo-title">${escapeHtml(title)}</div>
        <div class="interactive-demo-subtitle">${escapeHtml(subtitle)}</div>
      </div>
      <div class="interactive-demo-grid">
        <div class="interactive-demo-controls">
          <label class="interactive-demo-control">
            <span class="interactive-demo-control-label">Signal</span>
            <select class="interactive-demo-select" data-control="signal">
              <option value="pulse">Finite pulse</option>
              <option value="cosine">Cosine</option>
              <option value="ramp">Ramp</option>
              <option value="real_exp">Real exponential</option>
            </select>
          </label>
          <label class="interactive-demo-control">
            <span class="interactive-demo-control-label">Observation half-window T</span>
            <div class="interactive-demo-slider-row">
              <input type="range" min="0.5" max="6" step="0.1" value="${state.T}" data-control="T">
              <strong class="interactive-demo-control-value" data-value="T"></strong>
            </div>
          </label>
          <label class="interactive-demo-control" data-hidden="a">
            <span class="interactive-demo-control-label">Real exponential a</span>
            <div class="interactive-demo-slider-row">
              <input type="range" min="0.25" max="4" step="0.05" value="${state.a}" data-control="a">
              <strong class="interactive-demo-control-value" data-value="a"></strong>
            </div>
          </label>
          <div class="interactive-demo-brief-card">
            <div class="interactive-demo-brief-label">Classification</div>
            <div class="interactive-demo-brief-copy" data-copy="classification"></div>
          </div>
        </div>
        <div class="interactive-demo-stage">
          <canvas class="interactive-demo-canvas" height="360"></canvas>
        </div>
      </div>
      <div class="interactive-demo-readouts">
        <div class="interactive-demo-readout" data-readout="energy"></div>
        <div class="interactive-demo-readout" data-readout="power"></div>
      </div>
    </section>
  `;

  const canvas = node.querySelector('.interactive-demo-canvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  const shellEl = node.querySelector('.interactive-demo-shell');
  const classificationEl = node.querySelector('[data-copy="classification"]');
  const energyReadout = node.querySelector('[data-readout="energy"]');
  const powerReadout = node.querySelector('[data-readout="power"]');
  const controls = {
    signal: node.querySelector('[data-control="signal"]'),
    T: node.querySelector('[data-control="T"]'),
    a: node.querySelector('[data-control="a"]')
  };
  const values = {
    T: node.querySelector('[data-value="T"]'),
    a: node.querySelector('[data-value="a"]')
  };
  const aControlWrap = node.querySelector('[data-hidden="a"]');

  const update = () => {
    state.signal = controls.signal.value;
    state.T = Number(controls.T.value);
    state.a = Number(controls.a.value);
    if (values.T) values.T.textContent = fmt(state.T);
    if (values.a) values.a.textContent = fmt(state.a);
    if (aControlWrap) aControlWrap.hidden = state.signal !== 'real_exp';

    const { energy, power } = integrate(state.T);
    if (classificationEl) classificationEl.textContent = classify();
    if (energyReadout) energyReadout.innerHTML = `<strong>Running energy:</strong> E(T) = ${fmt(energy)}`;
    if (powerReadout) powerReadout.innerHTML = `<strong>Average power:</strong> P(T) = ${fmt(power)}`;

    if (!ctx || !canvas) return;
    const { width, height } = setupInteractiveDemoCanvas(canvas, ctx, 360, 360);
    const panelH = Math.floor((height - 28) / 3);
    const panelMeta = [
      { y: 10, label: 'x(t)', color: '#1d4ed8' },
      { y: 10 + panelH + 8, label: 'E(T)', color: '#0f766e' },
      { y: 10 + (panelH + 8) * 2, label: 'P(T)', color: '#dc2626' }
    ];

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    const curveData = Array.from({ length: 240 }, (_, i) => {
      const T = (6 * i) / 239;
      const { energy: e, power: p } = integrate(T);
      return { T, energy: e, power: p };
    });
    const energyMax = Math.max(...curveData.map((d) => d.energy), 1.1);
    const powerMax = Math.max(...curveData.map((d) => d.power), 1.1);

    const drawPanel = (meta, fn, yMin, yMax) => {
      const left = 36;
      const right = width - 22;
      const top = meta.y + 20;
      const bottom = meta.y + panelH - 16;
      const midY = (top + bottom) / 2;
      const toX = (t) => left + (t / 6) * (right - left);
      const toY = (v) => bottom - ((v - yMin) / (yMax - yMin)) * (bottom - top);
      ctx.strokeStyle = '#dbe3f0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(left, midY);
      ctx.lineTo(right, midY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(left, top);
      ctx.lineTo(left, bottom);
      ctx.stroke();
      ctx.fillStyle = '#334155';
      ctx.font = '700 13px Quicksand, sans-serif';
      ctx.fillText(meta.label, left + 4, meta.y + 14);
      ctx.strokeStyle = meta.color;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      curveData.forEach((d, index) => {
        const x = toX(d.T);
        const y = toY(fn(d));
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      const cursorX = toX(state.T);
      ctx.strokeStyle = '#f59e0b';
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(cursorX, top);
      ctx.lineTo(cursorX, bottom);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#475569';
      ctx.fillText(`T = ${fmt(state.T)}`, cursorX - 18, meta.y + 14);
    };

    const tMin = -4;
    const tMax = 4;
    drawPanel(panelMeta[0], (d) => signalValue(tMin + ((tMax - tMin) * d.T) / 6), -1.4, 1.4);
    drawPanel(panelMeta[1], (d) => d.energy, 0, energyMax);
    drawPanel(panelMeta[2], (d) => d.power, 0, powerMax);

    const signalPoints = sampleSignal(signalValue, -4, 4, 360);
    const xOffset = 0;
    const axisTop = 18;
    const axisBottom = 104;
    ctx.strokeStyle = '#dbe3f0';
    ctx.beginPath();
    ctx.moveTo(width - 105, axisTop);
    ctx.lineTo(width - 105, axisBottom);
    ctx.stroke();
    if (xOffset === 0) {
      ctx.fillStyle = '#64748b';
      ctx.font = '600 12px Quicksand, sans-serif';
      ctx.fillText('signal preview', width - 130, axisTop + 12);
    }
    ctx.strokeStyle = '#1d4ed8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    signalPoints.forEach((pt, index) => {
      const x = width - 180 + ((pt.t + 4) / 8) * 140;
      const y = axisBottom - ((pt.value + 1.4) / 2.8) * 70;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  };

  Object.values(controls).forEach((control) => control?.addEventListener('input', update));
  if (shellEl) shellEl.classList.toggle('is-narrow', shellEl.clientWidth < 760);
  update();
}

