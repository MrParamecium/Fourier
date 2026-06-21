// pointwise-multiplication — extracted from app.js Phase 3 PR #21 (hydrateInteractiveDemos dispatcher split).
// Loaded as a classic <script> BEFORE app.js. Reaches into the shared script-global
// lexical env for helpers (no bundler, no IIFE, no module.exports).
//
// External globals used at call time:
//   - escapeHtml, decodeInlineMarkdownFragment, getInteractiveDemoSpec, formatInteractiveDemoNumber, window.typesetMath (app.js + globals)
//
// Public surface (free-name lookup from the dispatcher in app.js):
//   - the top-level function defined below

function renderPointwiseMultiplicationFallback(node, demo) {
  const title = getInteractiveDemoTitle(demo, 'Point-by-point multiplication');
  const subtitle = getInteractiveDemoSubtitle(demo) || 'Each sample multiplies only its matching sample.';
  const state = { a: 10, mismatch: false, highlight: true };
  const f = (t) => Math.sin(2 * Math.PI * t) + 0.35 * Math.cos(6 * Math.PI * t);
  const g = (t) => Math.exp(-state.a * t);
  node.innerHTML = `
    <section class="interactive-demo-shell interactive-demo-shell--pointwise">
      <div class="interactive-demo-head"><div class="interactive-demo-title">${escapeHtml(title)}</div><div class="interactive-demo-subtitle">${escapeHtml(subtitle)}</div></div>
      <div class="interactive-demo-grid">
        <div class="interactive-demo-controls">
          <label class="interactive-demo-control">
            <span class="interactive-demo-control-label">Decay rate a</span>
            <div class="interactive-demo-slider-row"><input type="range" min="1" max="30" step="0.5" value="${state.a}" data-control="a"><strong class="interactive-demo-control-value" data-value="a"></strong></div>
          </label>
          <label class="interactive-demo-check"><input type="checkbox" data-control="mismatch"> Vector orientation mismatch</label>
          <label class="interactive-demo-check"><input type="checkbox" checked data-control="highlight"> Highlight one sample</label>
          <div class="interactive-demo-brief-card"><div class="interactive-demo-brief-label">Formula</div><div class="interactive-demo-brief-copy" data-copy="formula"></div></div>
        </div>
        <div class="interactive-demo-stage"><canvas class="interactive-demo-canvas" height="300"></canvas></div>
      </div>
      <div class="interactive-demo-readouts">
        <div class="interactive-demo-readout" data-readout="status"></div>
      </div>
    </section>
  `;
  const canvas = node.querySelector('.interactive-demo-canvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  const controls = {
    a: node.querySelector('[data-control="a"]'),
    mismatch: node.querySelector('[data-control="mismatch"]'),
    highlight: node.querySelector('[data-control="highlight"]')
  };
  const values = { a: node.querySelector('[data-value="a"]') };
  const formulaEl = node.querySelector('[data-copy="formula"]');
  const statusEl = node.querySelector('[data-readout="status"]');
  const update = () => {
    state.a = Number(controls.a.value);
    state.mismatch = controls.mismatch.checked;
    state.highlight = controls.highlight.checked;
    if (values.a) values.a.textContent = fmt(state.a);
    if (formulaEl) formulaEl.textContent = 'h(t) = f(t) g(t), sample by sample';
    if (statusEl) statusEl.innerHTML = state.mismatch
      ? '<strong>Mismatch:</strong> row versus column orientation does not line up.'
      : '<strong>Match:</strong> each output sample uses the matching input samples only.';

    if (!ctx || !canvas) return;
    const { width, height } = setupInteractiveDemoCanvas(canvas, ctx, 300, 340);
    const left = 42;
    const right = width - 18;
    const top = 24;
    const bottom = height - 36;
    const toX = (t) => left + (t / 3) * (right - left);
    const toY = (v) => (top + bottom) / 2 - v * 40;
    const samples = Array.from({ length: 240 }, (_, i) => {
      const t = (3 * i) / 239;
      return { t, f: f(t), g: g(t), h: f(t) * g(t) };
    });
    ctx.strokeStyle = '#dbe3f0';
    ctx.beginPath();
    ctx.moveTo(left, (top + bottom) / 2);
    ctx.lineTo(right, (top + bottom) / 2);
    ctx.stroke();
    const curves = [
      ['f', '#1d4ed8', []],
      ['g', '#0f766e', [6, 4]],
      ['h', '#dc2626', [2, 3]]
    ];
    curves.forEach(([key, color, dash]) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.2;
      ctx.setLineDash(dash);
      ctx.beginPath();
      samples.forEach((sample, index) => {
        const x = toX(sample.t);
        const y = toY(sample[key]);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    });
    ctx.setLineDash([]);
    if (state.highlight) {
      const idx = 120;
      const sample = samples[idx];
      const x = toX(sample.t);
      ctx.strokeStyle = '#f59e0b';
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(x, top + 10);
      ctx.lineTo(x, bottom);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#f59e0b';
      ctx.fillText('k', x - 2, top + 16);
    }
  };
  Object.values(controls).forEach((control) => control?.addEventListener('input', update));
  update();
}
