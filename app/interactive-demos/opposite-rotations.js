// opposite-rotations — extracted from app.js Phase 3 PR #21 (hydrateInteractiveDemos dispatcher split).
// Loaded as a classic <script> BEFORE app.js. Reaches into the shared script-global
// lexical env for helpers (no bundler, no IIFE, no module.exports).
//
// External globals used at call time:
//   - escapeHtml, decodeInlineMarkdownFragment, window.typesetMath, window.ResizeObserver (app.js + globals)
//
// Public surface (free-name lookup from the dispatcher in app.js):
//   - the top-level function defined below

function renderOppositeRotationsDemo(node, demo) {
  const title = getInteractiveDemoTitle(demo, 'Opposite rotations create sine and cosine');
  const subtitle = getInteractiveDemoSubtitle(demo) || 'Move the angle and watch conjugate phasors cancel or reinforce.';
  const controls = Array.isArray(demo.controls) ? demo.controls : [];
  const phiControl = controls.find((control) => /angle|phi/i.test(`${control.name || ''} ${control.key || ''} ${control.label || ''}`)) || {};
  const trailControl = controls.find((control) => /trail/i.test(`${control.name || ''} ${control.key || ''} ${control.label || ''}`)) || {};
  const state = {
    phi: Number(phiControl.default ?? Math.PI / 3),
    showTrails: Boolean(trailControl.default ?? true)
  };
  const minPhi = Number(phiControl.min ?? -Math.PI * 2);
  const maxPhi = Number(phiControl.max ?? Math.PI * 2);
  const stepPhi = Number(phiControl.step ?? 0.01);
  const trails = [];

  node.innerHTML = `
    <section class="interactive-demo-shell interactive-demo-shell--opposite-rotations">
      <div class="interactive-demo-head">
        <div class="interactive-demo-title">${escapeHtml(title)}</div>
        <div class="interactive-demo-subtitle">${escapeHtml(subtitle)}</div>
      </div>
      <div class="interactive-demo-grid">
        <div class="interactive-demo-controls">
          <label class="interactive-demo-control">
            <span class="interactive-demo-control-label">Angle phi</span>
            <div class="interactive-demo-slider-row">
              <input type="range" min="${minPhi}" max="${maxPhi}" step="${stepPhi}" value="${state.phi}" data-control="phi">
              <strong class="interactive-demo-control-value" data-value="phi"></strong>
            </div>
          </label>
          <label class="interactive-demo-check">
            <input type="checkbox" ${state.showTrails ? 'checked' : ''} data-control="showTrails">
            Show rotation trails
          </label>
          <div class="interactive-demo-brief-card">
            <div class="interactive-demo-brief-label">Cancellation</div>
            <div class="interactive-demo-brief-copy" data-copy="cancellation"></div>
          </div>
          <button type="button" class="interactive-demo-reset" data-control="reset">Reset</button>
        </div>
        <div class="interactive-demo-stage">
          <canvas class="interactive-demo-canvas" height="340"></canvas>
        </div>
      </div>
      <div class="interactive-demo-readouts">
        <div class="interactive-demo-readout" data-readout="cos"></div>
        <div class="interactive-demo-readout" data-readout="sin"></div>
      </div>
    </section>
  `;

  const canvas = node.querySelector('.interactive-demo-canvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  const shellEl = node.querySelector('.interactive-demo-shell');
  const phiInput = node.querySelector('[data-control="phi"]');
  const trailInput = node.querySelector('[data-control="showTrails"]');
  const phiValue = node.querySelector('[data-value="phi"]');
  const cancellationEl = node.querySelector('[data-copy="cancellation"]');
  const cosReadout = node.querySelector('[data-readout="cos"]');
  const sinReadout = node.querySelector('[data-readout="sin"]');
  const resetButton = node.querySelector('[data-control="reset"]');

  const formatRad = (value) => `${fmt(value, 2)} rad`;
  const formatDeg = (value) => `${fmt((value * 180) / Math.PI, 1)} deg`;
  const drawArrow = (x1, y1, x2, y2, color, width = 3, dashed = false) => {
    if (!ctx) return;
    const angle = Math.atan2(y2 - y1, x2 - x1);
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;
    if (dashed) ctx.setLineDash([6, 5]);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    if (!dashed) {
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - 11 * Math.cos(angle - Math.PI / 6), y2 - 11 * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(x2 - 11 * Math.cos(angle + Math.PI / 6), y2 - 11 * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  };

  const update = () => {
    state.phi = Number(phiInput?.value ?? state.phi);
    state.showTrails = Boolean(trailInput?.checked);
    if (state.showTrails) {
      trails.push(state.phi);
      if (trails.length > 80) trails.shift();
    } else {
      trails.length = 0;
    }

    const c = Math.cos(state.phi);
    const s = Math.sin(state.phi);
    if (phiValue) phiValue.textContent = `${formatRad(state.phi)} / ${formatDeg(state.phi)}`;
    if (cancellationEl) cancellationEl.textContent = `Real parts match: +cos(phi) and +cos(phi). Imaginary parts are opposites: +j sin(phi) and -j sin(phi).`;
    if (cosReadout) cosReadout.innerHTML = `<strong>Cosine from the sum:</strong> \\((e^{j\\phi}+e^{-j\\phi})/2 = ${fmt(c, 3)}\\)`;
    if (sinReadout) sinReadout.innerHTML = `<strong>Sine from the difference:</strong> \\((e^{j\\phi}-e^{-j\\phi})/(2j) = ${fmt(s, 3)}\\)`;

    if (ctx && canvas) {
      const { width, height } = setupInteractiveDemoCanvas(canvas, ctx, 340, 360);
      const cx = width * 0.36;
      const cy = height / 2;
      const radius = Math.min(width * 0.24, height * 0.34);
      const px = cx + radius * c;
      const pyPlus = cy - radius * s;
      const pyMinus = cy + radius * s;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = '#dbeafe';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - radius - 24, cy);
      ctx.lineTo(cx + radius + 24, cy);
      ctx.moveTo(cx, cy - radius - 24);
      ctx.lineTo(cx, cy + radius + 24);
      ctx.stroke();

      if (state.showTrails && trails.length > 1) {
        ctx.save();
        trails.forEach((angle, index) => {
          const alpha = (index + 1) / trails.length;
          ctx.fillStyle = `rgba(37, 99, 235, ${0.08 + alpha * 0.22})`;
          ctx.beginPath();
          ctx.arc(cx + radius * Math.cos(angle), cy - radius * Math.sin(angle), 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(15, 118, 110, ${0.08 + alpha * 0.22})`;
          ctx.beginPath();
          ctx.arc(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle), 2.5, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }

      drawArrow(cx, cy, px, pyPlus, '#2563eb', 3.2);
      drawArrow(cx, cy, px, pyMinus, '#0f766e', 3.2);
      drawArrow(px, pyPlus, px, pyMinus, '#ef4444', 2.4, true);
      drawArrow(cx, cy, px, cy, '#f59e0b', 2.8);

      ctx.fillStyle = '#2563eb';
      ctx.font = '800 13px Quicksand, sans-serif';
      ctx.fillText('e^{jphi}', px + 10, pyPlus - 8);
      ctx.fillStyle = '#0f766e';
      ctx.fillText('e^{-jphi}', px + 10, pyMinus + 18);
      ctx.fillStyle = '#f59e0b';
      ctx.fillText('cos(phi)', (cx + px) / 2 - 18, cy - 12);
      ctx.fillStyle = '#ef4444';
      ctx.fillText('2j sin(phi)', px + 10, (pyPlus + pyMinus) / 2);

      const formulaX = Math.min(width * 0.66, cx + radius + 60);
      ctx.fillStyle = '#f8fafc';
      ctx.strokeStyle = '#dbe3f0';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(formulaX - 18, 54, width - formulaX - 12, height - 108, 14);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#0f172a';
      ctx.font = '900 15px Quicksand, sans-serif';
      ctx.fillText('Euler pair', formulaX, 86);
      ctx.font = '700 13px Quicksand, sans-serif';
      ctx.fillStyle = '#334155';
      ctx.fillText(`cos(phi) = ${fmt(c, 3)}`, formulaX, 122);
      ctx.fillText(`sin(phi) = ${fmt(s, 3)}`, formulaX, 150);
      ctx.fillText('sum keeps horizontal parts', formulaX, 194);
      ctx.fillText('difference keeps vertical parts', formulaX, 222);
    }

    if (window.typesetMath) window.typesetMath(node).catch(() => {});
  };

  phiInput?.addEventListener('input', update);
  trailInput?.addEventListener('change', update);
  resetButton?.addEventListener('click', () => {
    state.phi = Number(phiControl.default ?? Math.PI / 3);
    state.showTrails = Boolean(trailControl.default ?? true);
    if (phiInput) phiInput.value = String(state.phi);
    if (trailInput) trailInput.checked = state.showTrails;
    trails.length = 0;
    update();
  });
  if (shellEl) shellEl.classList.toggle('is-narrow', shellEl.clientWidth < 760);
  update();
}

