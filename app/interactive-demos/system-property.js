// system-property — extracted from app.js Phase 3 PR #21 (hydrateInteractiveDemos dispatcher split).
// Loaded as a classic <script> BEFORE app.js. Reaches into the shared script-global
// lexical env for helpers (no bundler, no IIFE, no module.exports).
//
// External globals used at call time:
//   - escapeHtml, decodeInlineMarkdownFragment, getInteractiveDemoSpec, formatInteractiveDemoNumber, window.typesetMath (app.js + globals)
//
// Public surface (free-name lookup from the dispatcher in app.js):
//   - the top-level function defined below

function renderSystemPropertyFallback(node, demo) {
  const title = getInteractiveDemoTitle(demo, 'System property tester');
  const subtitle = getInteractiveDemoSubtitle(demo) || 'Compare two paths and watch whether the output curves agree.';
  const text = `${title} ${subtitle} ${getInteractiveDemoText(demo)}`.toLowerCase();
  const mode = /superposition|linear/.test(text) ? 'superposition'
    : /causality/.test(text) ? 'causality'
      : /bibo/.test(text) ? 'bibo'
        : 'time_invariance';
  const state = {
    system: mode === 'superposition' ? 'linear' : mode === 'causality' ? 'future' : mode === 'bibo' ? 'bounded' : 'linear',
    a: 2,
    b: -1,
    T: 1.5
  };
  const x1 = (t) => Math.sin(t);
  const x2 = (t) => Math.cos(t);
  const signal = (t) => Math.sin(t) + 0.4 * Math.cos(2 * t);
  const applySystem = (x, t) => {
    if (state.system === 'square') return x * x;
    if (state.system === 'offset') return x + 1;
    if (state.system === 'future') return signal(t + 1);
    if (state.system === 'integrator') return t;
    return 2 * x;
  };
  const systemOptions = mode === 'superposition'
    ? [
      ['linear', 'S{x}=2x'],
      ['square', 'S{x}=x^2'],
      ['offset', 'S{x}=x+1']
    ]
    : mode === 'causality'
      ? [
        ['linear', 'uses x(t)'],
        ['future', 'uses x(t+1)']
      ]
      : mode === 'bibo'
        ? [
          ['bounded', 'bounded gain'],
          ['integrator', 'unbounded ramp']
        ]
        : [
          ['linear', 'time-invariant gain'],
          ['square', 'nonlinear but time-invariant'],
          ['future', 'time-varying look-ahead']
        ];

  node.innerHTML = `
    <section class="interactive-demo-shell interactive-demo-shell--system">
      <div class="interactive-demo-head">
        <div class="interactive-demo-title">${escapeHtml(title)}</div>
        <div class="interactive-demo-subtitle">${escapeHtml(subtitle)}</div>
      </div>
      <div class="interactive-demo-grid">
        <div class="interactive-demo-controls">
          <label class="interactive-demo-control">
            <span class="interactive-demo-control-label">System</span>
            <select class="interactive-demo-select" data-control="system">
              ${systemOptions.map(([value, label]) => `<option value="${escapeHtml(value)}"${value === state.system ? ' selected' : ''}>${escapeHtml(label)}</option>`).join('')}
            </select>
          </label>
          <label class="interactive-demo-control" data-control-wrap="a">
            <span class="interactive-demo-control-label">a</span>
            <div class="interactive-demo-slider-row"><input type="range" min="-3" max="3" step="0.1" value="${state.a}" data-control="a"><strong class="interactive-demo-control-value" data-value="a"></strong></div>
          </label>
          <label class="interactive-demo-control" data-control-wrap="b">
            <span class="interactive-demo-control-label">b</span>
            <div class="interactive-demo-slider-row"><input type="range" min="-3" max="3" step="0.1" value="${state.b}" data-control="b"><strong class="interactive-demo-control-value" data-value="b"></strong></div>
          </label>
          <label class="interactive-demo-control" data-control-wrap="T">
            <span class="interactive-demo-control-label">Shift T</span>
            <div class="interactive-demo-slider-row"><input type="range" min="-3" max="3" step="0.25" value="${state.T}" data-control="T"><strong class="interactive-demo-control-value" data-value="T"></strong></div>
          </label>
          <div class="interactive-demo-brief-card">
            <div class="interactive-demo-brief-label">Verdict</div>
            <div class="interactive-demo-brief-copy" data-copy="verdict"></div>
          </div>
        </div>
        <div class="interactive-demo-stage"><canvas class="interactive-demo-canvas" height="300"></canvas></div>
      </div>
      <div class="interactive-demo-readouts">
        <div class="interactive-demo-readout" data-readout="left"></div>
        <div class="interactive-demo-readout" data-readout="right"></div>
      </div>
    </section>
  `;

  const canvas = node.querySelector('.interactive-demo-canvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  const controls = {
    system: node.querySelector('[data-control="system"]'),
    a: node.querySelector('[data-control="a"]'),
    b: node.querySelector('[data-control="b"]'),
    T: node.querySelector('[data-control="T"]')
  };
  const values = {
    a: node.querySelector('[data-value="a"]'),
    b: node.querySelector('[data-value="b"]'),
    T: node.querySelector('[data-value="T"]')
  };
  const verdictEl = node.querySelector('[data-copy="verdict"]');
  const leftEl = node.querySelector('[data-readout="left"]');
  const rightEl = node.querySelector('[data-readout="right"]');

  const update = () => {
    state.system = controls.system.value;
    state.a = Number(controls.a.value);
    state.b = Number(controls.b.value);
    state.T = Number(controls.T.value);
    Object.entries(values).forEach(([key, el]) => { if (el) el.textContent = fmt(state[key]); });

    const points = Array.from({ length: 260 }, (_, i) => {
      const t = ((Math.PI * 2) * i) / 259;
      let left;
      let right;
      if (mode === 'superposition') {
        left = applySystem(state.a * x1(t) + state.b * x2(t), t);
        right = state.a * applySystem(x1(t), t) + state.b * applySystem(x2(t), t);
      } else if (mode === 'bibo') {
        left = Math.sin(t);
        right = state.system === 'integrator' ? t / 2 : 0.8 * Math.sin(t);
      } else {
        left = applySystem(signal(t - state.T), t);
        right = applySystem(signal(t), t - state.T);
      }
      return { t, left, right, diff: Math.abs(left - right) };
    });
    const maxDiff = Math.max(...points.map((p) => p.diff));
    const pass = maxDiff < 0.08 && state.system !== 'integrator';
    if (verdictEl) verdictEl.textContent = pass ? 'Passes this visible test' : 'Fails this visible test';
    if (leftEl) leftEl.innerHTML = `<strong>Path A:</strong> ${mode === 'superposition' ? 'S{a x1 + b x2}' : mode === 'bibo' ? 'bounded input' : 'shift then system'}`;
    if (rightEl) rightEl.innerHTML = `<strong>Path B:</strong> ${mode === 'superposition' ? 'a S{x1} + b S{x2}' : mode === 'bibo' ? 'output behavior' : 'system then shift'}`;

    if (!ctx || !canvas) return;
    const { width, height } = setupInteractiveDemoCanvas(canvas, ctx, 300, 340);
    const left = 42;
    const right = width - 18;
    const top = 24;
    const bottom = height - 38;
    const all = points.flatMap((p) => [p.left, p.right]);
    const span = Math.max(1.5, Math.max(...all.map(Math.abs)));
    const toX = (i) => left + (i / (points.length - 1)) * (right - left);
    const toY = (v) => (top + bottom) / 2 - (v / span) * ((bottom - top) / 2 - 10);
    ctx.strokeStyle = '#dbe3f0';
    ctx.beginPath();
    ctx.moveTo(left, (top + bottom) / 2);
    ctx.lineTo(right, (top + bottom) / 2);
    ctx.stroke();
    ctx.fillStyle = '#334155';
    ctx.font = '700 13px Quicksand, sans-serif';
    ctx.fillText('Path comparison', left, top - 6);
    [
      ['left', '#0f766e', []],
      ['right', '#1d4ed8', [6, 4]]
    ].forEach(([key, color, dash]) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.6;
      ctx.setLineDash(dash);
      ctx.beginPath();
      points.forEach((p, i) => {
        const x = toX(i);
        const y = toY(p[key]);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    });
    ctx.setLineDash([]);
    ctx.fillStyle = pass ? '#166534' : '#991b1b';
    ctx.font = '900 15px Quicksand, sans-serif';
    ctx.fillText(pass ? 'curves overlap' : `max difference ${fmt(maxDiff)}`, left, bottom + 24);
  };

  Object.values(controls).forEach((control) => control?.addEventListener('input', update));
  update();
}

