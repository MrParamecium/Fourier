// matrix-locator — extracted from app.js Phase 3 PR #21 (hydrateInteractiveDemos dispatcher split).
// Loaded as a classic <script> BEFORE app.js. Reaches into the shared script-global
// lexical env for helpers (no bundler, no IIFE, no module.exports).
//
// External globals used at call time:
//   - escapeHtml, decodeInlineMarkdownFragment, getInteractiveDemoSpec, formatInteractiveDemoNumber, window.typesetMath (app.js + globals)
//
// Public surface (free-name lookup from the dispatcher in app.js):
//   - the top-level function defined below

function renderMatrixLocatorFallback(node, demo) {
  const title = getInteractiveDemoTitle(demo, 'Matrix entry locator');
  const subtitle = getInteractiveDemoSubtitle(demo) || 'Row index first, column index second.';
  const state = { m: 3, n: 4, i: 2, j: 3 };
  node.innerHTML = `
    <section class="interactive-demo-shell interactive-demo-shell--matrix-locator">
      <div class="interactive-demo-head"><div class="interactive-demo-title">${escapeHtml(title)}</div><div class="interactive-demo-subtitle">${escapeHtml(subtitle)}</div></div>
      <div class="interactive-demo-grid">
        <div class="interactive-demo-controls">
          ${['m','n','i','j'].map((key) => `<label class="interactive-demo-control"><span class="interactive-demo-control-label">${key === 'm' ? 'Rows m' : key === 'n' ? 'Columns n' : key === 'i' ? 'Row index i' : 'Column index j'}</span><div class="interactive-demo-slider-row"><input type="range" min="1" max="5" step="1" value="${state[key]}" data-control="${key}"><strong class="interactive-demo-control-value" data-value="${key}"></strong></div></label>`).join('')}
          <div class="interactive-demo-brief-card"><div class="interactive-demo-brief-label">Selected entry</div><div class="interactive-demo-brief-copy" data-copy="entry"></div></div>
        </div>
        <div class="interactive-demo-stage"><canvas class="interactive-demo-canvas" height="300"></canvas></div>
      </div>
    </section>
  `;
  const canvas = node.querySelector('.interactive-demo-canvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  const controls = Object.fromEntries(['m','n','i','j'].map((key) => [key, node.querySelector(`[data-control="${key}"]`)]));
  const values = Object.fromEntries(['m','n','i','j'].map((key) => [key, node.querySelector(`[data-value="${key}"]`)]));
  const entryEl = node.querySelector('[data-copy="entry"]');
  const update = () => {
    state.m = Number(controls.m.value);
    state.n = Number(controls.n.value);
    state.i = Math.min(Number(controls.i.value), state.m);
    state.j = Math.min(Number(controls.j.value), state.n);
    controls.i.max = String(state.m);
    controls.j.max = String(state.n);
    controls.i.value = String(state.i);
    controls.j.value = String(state.j);
    Object.entries(values).forEach(([key, el]) => { if (el) el.textContent = String(state[key]); });
    if (entryEl) entryEl.textContent = `a_${state.i}${state.j}: row ${state.i}, column ${state.j}`;
    if (!ctx || !canvas) return;
    const { width, height } = setupInteractiveDemoCanvas(canvas, ctx, 300, 340);
    const cell = Math.min(56, Math.floor((Math.min(width - 120, height - 70)) / Math.max(state.m, state.n)));
    const startX = Math.max(70, Math.floor((width - state.n * cell) / 2));
    const startY = Math.max(48, Math.floor((height - state.m * cell) / 2));
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    ctx.font = '800 13px Quicksand, sans-serif';
    ctx.textAlign = 'center';
    for (let c = 0; c < state.n; c += 1) {
      ctx.fillStyle = '#64748b';
      ctx.fillText(String(c + 1), startX + c * cell + cell / 2, startY - 12);
    }
    for (let r = 0; r < state.m; r += 1) {
      ctx.fillStyle = '#64748b';
      ctx.fillText(String(r + 1), startX - 22, startY + r * cell + cell / 2 + 5);
      for (let c = 0; c < state.n; c += 1) {
        const active = r === state.i - 1 && c === state.j - 1;
        ctx.fillStyle = active ? '#ccfbf1' : '#ffffff';
        ctx.strokeStyle = active ? '#0f766e' : '#cbd5e1';
        ctx.lineWidth = active ? 3 : 1.5;
        ctx.fillRect(startX + c * cell, startY + r * cell, cell, cell);
        ctx.strokeRect(startX + c * cell, startY + r * cell, cell, cell);
        ctx.fillStyle = active ? '#0f766e' : '#334155';
        ctx.fillText(`a${r + 1}${c + 1}`, startX + c * cell + cell / 2, startY + r * cell + cell / 2 + 5);
      }
    }
  };
  Object.values(controls).forEach((control) => control?.addEventListener('input', update));
  update();
}

