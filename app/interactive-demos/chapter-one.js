// chapter-one — legacy chapter-one demo renderer extracted from app.js
// in Phase 3 Step G.2 (Phase 2 #18 part 2). Handles the early-return
// branch of hydrateInteractiveDemos when CHAPTER_ONE_DEMO_TYPES matches
// (energy_cross_term, step_window_composer, impulse_unit_area_limit,
// impulse_sifting, invertibility_tester).
//
// Loaded as a classic <script> BEFORE dispatcher.js — dispatcher's
// hydrateInteractiveDemos calls hydrateChapterOneDemo as a free name
// at runtime, but the script must be in scope by then.
//
// Public surface (free-name lookup from the dispatcher):
//   - hydrateChapterOneDemo(node, demo)
// Preserve `node._chapterOneDemoResizeObserver` — introspected by external callers.
//
// External free-names used at call time:
//   - escapeHtml                                                            (app.js)
//   - inferChapterOneDemoType, fmt                                          (dispatcher.js)
//   - applyCanvasDpr, drawCanvasArrow, coalesceFrames                       (helpers.js)
//   - window.ResizeObserver                                                 (browser)

function hydrateChapterOneDemo(node, demo) {
  const demoType = inferChapterOneDemoType(demo);
  const state = Object.create(null);
  const title = demo.title || 'Interactive check';
  const explanation = demo.explanation || 'Move the controls and watch the formulas update.';

  node.innerHTML = `
    <section class="chapter-demo-shell chapter-demo-shell-${escapeHtml(demoType)}">
      <div class="chapter-demo-head">
        <div class="chapter-demo-title">${escapeHtml(title)}</div>
        <div class="chapter-demo-subtitle">${escapeHtml(explanation)}</div>
      </div>
      <div class="chapter-demo-grid">
        <div class="chapter-demo-controls"></div>
        <div class="chapter-demo-stage">
          <canvas class="chapter-demo-canvas"></canvas>
        </div>
      </div>
      <div class="chapter-demo-readouts"></div>
    </section>
  `;

  const controlsEl = node.querySelector('.chapter-demo-controls');
  const readoutsEl = node.querySelector('.chapter-demo-readouts');
  const canvas = node.querySelector('.chapter-demo-canvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  const shellEl = node.querySelector('.chapter-demo-shell');

  const setReadouts = (items) => {
    readoutsEl.innerHTML = items.map((item) => `<div class="chapter-demo-readout">${item}</div>`).join('');
  };
  const setupCanvas = (height = 260) => {
    if (!canvas || !ctx) return { width: 0, height: 0 };
    const width = Math.max(Math.floor(canvas.parentElement?.clientWidth || canvas.clientWidth || 0), 320);
    const sized = applyCanvasDpr(canvas, ctx, width, height);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    return sized;
  };
  const drawAxis = (width, y, minT = -4, maxT = 6, pad = 42) => {
    const toX = (t) => pad + ((t - minT) / (maxT - minT)) * (width - pad * 2);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(width - pad, y);
    ctx.stroke();
    ctx.fillStyle = '#64748b';
    ctx.font = '600 12px Quicksand, sans-serif';
    ctx.textAlign = 'center';
    for (let t = minT; t <= maxT; t += 2) {
      const x = toX(t);
      ctx.beginPath();
      ctx.moveTo(x, y - 4);
      ctx.lineTo(x, y + 4);
      ctx.stroke();
      ctx.fillText(String(t), x, y + 20);
    }
    return toX;
  };
  const drawArrow = (x1, y1, x2, y2, color = '#2563eb', width = 3) => {
    drawCanvasArrow(ctx, x1, y1, x2, y2, color, { width });
  };
  const drawRoundedRect = (x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };
  const addRange = (key, label, min, max, step, value) => {
    state[key] = Number(value);
    const wrap = document.createElement('label');
    wrap.className = 'chapter-demo-control';
    wrap.innerHTML = `
      <span class="chapter-demo-control-label">${escapeHtml(label)}</span>
      <span class="chapter-demo-slider-row">
        <input type="range" min="${min}" max="${max}" step="${step}" value="${value}">
        <strong class="chapter-demo-control-value">${fmt(value)}</strong>
      </span>
    `;
    const input = wrap.querySelector('input');
    const valueEl = wrap.querySelector('.chapter-demo-control-value');
    input.addEventListener('input', () => {
      state[key] = Number(input.value);
      valueEl.textContent = fmt(state[key]);
      render();
    });
    controlsEl.appendChild(wrap);
    return wrap;
  };
  const addSelect = (key, label, options, value) => {
    state[key] = value;
    const wrap = document.createElement('label');
    wrap.className = 'chapter-demo-control';
    const selectHtml = options.map((option) => (
      `<option value="${escapeHtml(option.value)}"${option.value === value ? ' selected' : ''}>${escapeHtml(option.label)}</option>`
    )).join('');
    wrap.innerHTML = `
      <span class="chapter-demo-control-label">${escapeHtml(label)}</span>
      <select class="chapter-demo-select">${selectHtml}</select>
    `;
    wrap.querySelector('select').addEventListener('change', (event) => {
      state[key] = event.target.value;
      render();
    });
    controlsEl.appendChild(wrap);
    return wrap;
  };

  const renderEnergyCrossTerm = () => {
    const { width } = setupCanvas(260);
    const shift = Number(state.shift || 0);
    const overlap = Math.max(0, 2 - Math.abs(shift));
    const ex = 2;
    const ey = 2;
    const ePlus = ex + ey + (2 * overlap);
    const eMinus = ex + ey - (2 * overlap);
    const toX = drawAxis(width, 214, -4, 5);
    const drawPulse = (from, to, y, color, label) => {
      const x1 = toX(from);
      const x2 = toX(to);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.18;
      ctx.fillRect(x1, y - 44, x2 - x1, 44);
      ctx.globalAlpha = 1;
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.strokeRect(x1, y - 44, x2 - x1, 44);
      ctx.fillStyle = '#334155';
      ctx.font = '700 13px Quicksand, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(label, x1 + 8, y - 50);
    };
    drawPulse(-1, 1, 86, '#2563eb', 'x(t)');
    drawPulse(shift - 1, shift + 1, 154, '#f59e0b', 'y(t)');
    if (overlap > 0) {
      const left = Math.max(-1, shift - 1);
      const right = Math.min(1, shift + 1);
      ctx.fillStyle = '#10b981';
      ctx.globalAlpha = 0.24;
      ctx.fillRect(toX(left), 28, toX(right) - toX(left), 152);
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#047857';
      ctx.font = '700 13px Quicksand, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`overlap = ${fmt(overlap)}`, (toX(left) + toX(right)) / 2, 30);
    }
    setReadouts([
      `<strong>Cross term:</strong> integral x(t)y(t) dt = ${fmt(overlap)}`,
      `<strong>Energy sum:</strong> E[x+y] = 2 + 2 + 2(${fmt(overlap)}) = ${fmt(ePlus)}`,
      `<strong>Energy difference:</strong> E[x-y] = 2 + 2 - 2(${fmt(overlap)}) = ${fmt(eMinus)}`
    ]);
  };

  const renderStepWindow = () => {
    const { width } = setupCanvas(250);
    const a = Math.min(Number(state.start || 2), Number(state.end || 4));
    const b = Math.max(Number(state.start || 2), Number(state.end || 4));
    const toX = drawAxis(width, 190, -5, 6);
    const y0 = 160;
    const y1 = 78;
    ctx.fillStyle = '#2563eb';
    ctx.globalAlpha = 0.16;
    ctx.fillRect(toX(a), y1, toX(b) - toX(a), y0 - y1);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = '#1d4ed8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(toX(-5), y0);
    ctx.lineTo(toX(a), y0);
    ctx.lineTo(toX(a), y1);
    ctx.lineTo(toX(b), y1);
    ctx.lineTo(toX(b), y0);
    ctx.lineTo(toX(6), y0);
    ctx.stroke();
    drawArrow(toX(a), y0 + 10, toX(a), y1 + 8, '#2563eb', 2.5);
    drawArrow(toX(b), y1 - 10, toX(b), y0 - 8, '#2563eb', 2.5);
    ctx.fillStyle = '#334155';
    ctx.font = '700 13px Quicksand, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`turn on at a=${fmt(a)}`, toX(a), 42);
    ctx.fillText(`turn off at b=${fmt(b)}`, toX(b), 222);
    setReadouts([
      `<strong>Window:</strong> u(t-${fmt(a)}) - u(t-${fmt(b)})`,
      `<strong>Active interval:</strong> ${fmt(a)} <= t < ${fmt(b)}`,
      `<strong>Reading habit:</strong> first step turns on, second step cancels it back to zero.`
    ]);
  };

  const renderImpulseUnitAreaLimit = () => {
    const { width } = setupCanvas(250);
    const alpha = Math.max(1, Number(state.alpha || 3));
    const shape = state.shape || 'rectangular';
    const minT = -3;
    const maxT = 3;
    const pad = 42;
    const baseY = 190;
    const topY = 38;
    const usableHeight = baseY - topY;
    const toX = drawAxis(width, baseY, minT, maxT, pad);
    const maxAmplitude = Math.max(alpha, alpha / Math.sqrt(Math.PI), 1);
    const toY = (value) => baseY - (Math.min(value, maxAmplitude) / maxAmplitude) * usableHeight;
    const sampleCount = 360;
    const valueAt = (t) => {
      if (shape === 'triangular') return Math.max(0, alpha * (1 - alpha * Math.abs(t)));
      if (shape === 'exponential') return t >= 0 ? alpha * Math.exp(-alpha * t) : 0;
      if (shape === 'gaussian') return (alpha / Math.sqrt(Math.PI)) * Math.exp(-((alpha * t) ** 2));
      return Math.abs(t) <= (0.5 / alpha) ? alpha : 0;
    };
    const formulaMap = {
      rectangular: `height = ${fmt(alpha)}, width = ${fmt(1 / alpha)}`,
      triangular: `peak = ${fmt(alpha)}, base = ${fmt(2 / alpha)}`,
      exponential: `${fmt(alpha)} exp(-${fmt(alpha)}t) u(t)`,
      gaussian: `${fmt(alpha)}/sqrt(pi) exp(-(${fmt(alpha)}t)^2)`
    };
    ctx.fillStyle = 'rgba(37, 99, 235, 0.12)';
    ctx.beginPath();
    ctx.moveTo(toX(minT), baseY);
    for (let i = 0; i <= sampleCount; i += 1) {
      const t = minT + ((maxT - minT) * i) / sampleCount;
      ctx.lineTo(toX(t), toY(valueAt(t)));
    }
    ctx.lineTo(toX(maxT), baseY);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i <= sampleCount; i += 1) {
      const t = minT + ((maxT - minT) * i) / sampleCount;
      const x = toX(t);
      const y = toY(valueAt(t));
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(toX(0), baseY);
    ctx.lineTo(toX(0), topY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#334155';
    ctx.font = '700 13px Quicksand, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('area stays 1', toX(0), 24);
    setReadouts([
      `<strong>Shape:</strong> ${escapeHtml(shape)}`,
      `<strong>Sharpness:</strong> alpha = ${fmt(alpha)}; ${escapeHtml(formulaMap[shape] || formulaMap.rectangular)}`,
      `<strong>Limit idea:</strong> as alpha grows, width shrinks and height grows, but total area remains 1.`
    ]);
  };

  const renderImpulseSifting = () => {
    const { width } = setupCanvas(250);
    const form = state.form || 't_minus_a';
    let support = Number(state.a || 2);
    let factor = 1;
    let argument = `t - ${fmt(state.a || 2)}`;
    if (form === 'a_minus_t') {
      support = Number(state.a || 2);
      argument = `${fmt(state.a || 2)} - t`;
    } else if (form === 'k_t_minus_b') {
      const k = Number(state.k || 2);
      const b = Number(state.b || 4);
      support = b / k;
      factor = 1 / Math.abs(k || 1);
      argument = `${fmt(k)}t - ${fmt(b)}`;
    }
    const sample = (support ** 2) + 1;
    const integral = factor * sample;
    const toX = drawAxis(width, 184, -4, 6);
    const x = toX(support);
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 3;
    drawArrow(x, 178, x, 70, '#f97316', 3);
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.arc(x, 70, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#334155';
    ctx.font = '700 13px Quicksand, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`support t = ${fmt(support)}`, x, 44);
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 240; i += 1) {
      const t = -4 + (i / 240) * 9;
      const y = 168 - Math.min((t ** 2) + 1, 14) * 6;
      if (i === 0) ctx.moveTo(toX(t), y);
      else ctx.lineTo(toX(t), y);
    }
    ctx.stroke();
    setReadouts([
      `<strong>Set the argument to zero:</strong> ${argument} = 0 gives t = ${fmt(support)}`,
      `<strong>Scaling factor:</strong> 1 / |slope| = ${fmt(factor)}`,
      `<strong>With phi(t)=t^2+1:</strong> integral phi(t) delta(${argument}) dt = ${fmt(integral)}`
    ]);
  };

  const renderInvertibilityTester = () => {
    const { width } = setupCanvas(250);
    const cases = {
      reverse: {
        title: 'y(t) = x(-t)',
        status: 'Invertible',
        left: ['x(t)'],
        right: ['y(t)'],
        note: 'Time reversal changes the order, but no value is erased. Recover with x(t)=y(-t).'
      },
      affine: {
        title: 'y(t) = x(3t-6)',
        status: 'Invertible',
        left: ['x(t)'],
        right: ['y(t)'],
        note: 'Solve s=3t-6. Then x(t)=y((t+6)/3).'
      },
      abs: {
        title: 'y(t) = |x(t)|',
        status: 'Not invertible',
        left: ['x=3', 'x=-3'],
        right: ['y=3'],
        note: 'The sign is lost, so two different inputs give the same output.'
      },
      square: {
        title: 'y(t) = x^2(t)',
        status: 'Not invertible',
        left: ['x=2', 'x=-2'],
        right: ['y=4'],
        note: 'Squaring collapses positive and negative values together.'
      },
      multiply_t: {
        title: 'y(t) = t x(t)',
        status: 'Not invertible',
        left: ['x(0)=5', 'x(0)=-1'],
        right: ['y(0)=0'],
        note: 'At t=0, every input value is multiplied away.'
      }
    };
    const item = cases[state.system] || cases.reverse;
    const leftX = 74;
    const rightX = width - 86;
    const centerY = 124;
    ctx.fillStyle = '#334155';
    ctx.font = '800 15px Quicksand, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.title, width / 2, 38);
    item.left.forEach((label, index) => {
      const y = item.left.length === 1 ? centerY : centerY - 34 + index * 68;
      ctx.fillStyle = '#dbeafe';
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 2;
      drawRoundedRect(leftX - 42, y - 20, 84, 40, 8);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#1e3a8a';
      ctx.font = '700 13px Quicksand, sans-serif';
      ctx.fillText(label, leftX, y + 5);
      drawArrow(leftX + 50, y, rightX - 55, item.right.length === 1 ? centerY : y, '#2563eb', 2.4);
    });
    item.right.forEach((label, index) => {
      const y = item.right.length === 1 ? centerY : centerY - 28 + index * 56;
      ctx.fillStyle = item.status === 'Invertible' ? '#dcfce7' : '#fee2e2';
      ctx.strokeStyle = item.status === 'Invertible' ? '#16a34a' : '#ef4444';
      ctx.lineWidth = 2;
      drawRoundedRect(rightX - 46, y - 22, 92, 44, 8);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = item.status === 'Invertible' ? '#166534' : '#991b1b';
      ctx.font = '800 13px Quicksand, sans-serif';
      ctx.fillText(label, rightX, y + 5);
    });
    setReadouts([
      `<strong>Decision:</strong> ${item.status}`,
      `<strong>Reason:</strong> ${escapeHtml(item.note)}`
    ]);
  };

  function render() {
    if (!ctx) return;
    if (shellEl) shellEl.classList.toggle('is-narrow', shellEl.clientWidth < 740);
    if (demoType === 'energy_cross_term') renderEnergyCrossTerm();
    else if (demoType === 'step_window_composer') renderStepWindow();
    else if (demoType === 'impulse_unit_area_limit') renderImpulseUnitAreaLimit();
    else if (demoType === 'impulse_sifting') renderImpulseSifting();
    else if (demoType === 'invertibility_tester') renderInvertibilityTester();
  }

  if (demoType === 'energy_cross_term') {
    addRange('shift', 'Shift of y(t)', -3, 3, 0.1, 0.8);
  } else if (demoType === 'step_window_composer') {
    addRange('start', 'Start a', -4, 4, 0.5, 2);
    addRange('end', 'End b', -3, 5, 0.5, 4);
  } else if (demoType === 'impulse_unit_area_limit') {
    addRange('alpha', 'Sharpness alpha', 1, 50, 1, 3);
    addSelect('shape', 'Pulse shape', [
      { value: 'rectangular', label: 'Rectangular' },
      { value: 'triangular', label: 'Triangular' },
      { value: 'exponential', label: 'Exponential' },
      { value: 'gaussian', label: 'Gaussian' }
    ], 'rectangular');
  } else if (demoType === 'impulse_sifting') {
    const formControl = addSelect('form', 'Delta argument', [
      { value: 't_minus_a', label: 'delta(t-a)' },
      { value: 'a_minus_t', label: 'delta(a-t)' },
      { value: 'k_t_minus_b', label: 'delta(kt-b)' }
    ], 'k_t_minus_b');
    const aControl = addRange('a', 'a', -3, 4, 0.5, 2);
    const kControl = addRange('k', 'k', 1, 4, 0.5, 2.5);
    const bControl = addRange('b', 'b', -4, 6, 0.5, 4);
    const updateImpulseSiftingControls = () => {
      const usesScaledArgument = state.form === 'k_t_minus_b';
      aControl.hidden = usesScaledArgument;
      kControl.hidden = !usesScaledArgument;
      bControl.hidden = !usesScaledArgument;
    };
    formControl.querySelector('select')?.addEventListener('change', updateImpulseSiftingControls);
    const originalRender = render;
    render = () => {
      updateImpulseSiftingControls();
      originalRender();
    };
    updateImpulseSiftingControls();
  } else if (demoType === 'invertibility_tester') {
    addSelect('system', 'System', [
      { value: 'reverse', label: 'y(t)=x(-t)' },
      { value: 'affine', label: 'y(t)=x(3t-6)' },
      { value: 'abs', label: 'y(t)=|x(t)|' },
      { value: 'square', label: 'y(t)=x^2(t)' },
      { value: 'multiply_t', label: 'y(t)=t x(t)' }
    ], 'reverse');
  }

  const rerender = coalesceFrames(render);
  if (window.ResizeObserver && shellEl) {
    const observer = new ResizeObserver(rerender);
    observer.observe(shellEl);
    node._chapterOneDemoResizeObserver = observer;
  }
  window.addEventListener('resize', rerender, { passive: true });
  render();
}
