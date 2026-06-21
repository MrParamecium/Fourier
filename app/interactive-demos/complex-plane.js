// complex-plane — extracted from app.js Phase 3 PR #21 (hydrateInteractiveDemos dispatcher split).
// Loaded as a classic <script> BEFORE app.js. Reaches into the shared script-global lexical env.
//
// External globals used at call time:
//   - escapeHtml, decodeInlineMarkdownFragment            (app.js)
//   - window.typesetMath, window.ResizeObserver           (CDN / browser)
//
// Public surface (free-name lookup from the dispatcher in app.js):
//   - renderComplexPlaneDemo(node, demo, demoSpec, demoControls)
// Preserve `node._complexResizeObserver` — introspected by external callers.

function renderComplexPlaneDemo(node, demo, demoSpec, demoControls) {
      const controls = demoControls;
      const state = Object.create(null);
      controls.forEach((control) => {
        const key = control.id || control.key;
        if (!key) return;
        if (Array.isArray(control.options)) {
          state[key] = control.default || control.options[0] || 'degrees';
          return;
        }
        if (String(control.action || '').startsWith('set ')) return;
        state[key] = Number(control.default ?? control.min ?? 0);
      });
      if (!Object.prototype.hasOwnProperty.call(state, 'slider_a')) state.slider_a = 3;
      if (!Object.prototype.hasOwnProperty.call(state, 'slider_b')) state.slider_b = 4;
      if (!Object.prototype.hasOwnProperty.call(state, 'angle_toggle')) state.angle_toggle = 'degrees';

      node.innerHTML = `
        <section class="complex-demo-shell">
          <div class="complex-demo-head">
            <div class="complex-demo-title">${escapeHtml(demo.title || 'Drag the complex number')}</div>
            <div class="complex-demo-subtitle">${escapeHtml(demo.explanation || 'Connect rectangular form, magnitude, angle, and conjugate on the complex plane.')}</div>
          </div>
          <div class="complex-demo-intro">${decodeInlineMarkdownFragment(demo.content || '')}</div>
          <div class="complex-demo-grid">
            <div class="complex-demo-left">
              <div class="complex-demo-controls"></div>
              <div class="complex-demo-readouts"></div>
            </div>
            <div class="complex-demo-right">
              <div class="complex-demo-canvas-wrap">
                <canvas class="complex-demo-canvas"></canvas>
              </div>
              <div class="complex-demo-legend">
                <span><i class="complex-demo-swatch real"></i>Real part a</span>
                <span><i class="complex-demo-swatch imag"></i>Imaginary part jb</span>
                <span><i class="complex-demo-swatch vector"></i>z = a + jb</span>
                <span><i class="complex-demo-swatch conjugate"></i>z* = a - jb</span>
              </div>
            </div>
          </div>
        </section>
      `;

      const controlsEl = node.querySelector('.complex-demo-controls');
      const readoutsEl = node.querySelector('.complex-demo-readouts');
      const canvas = node.querySelector('.complex-demo-canvas');
      const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
      const shellEl = node.querySelector('.complex-demo-shell');
      const formatNum = (value) => {
        if (!Number.isFinite(value)) return '0';
        return Number((Math.abs(value) < 1e-9 ? 0 : value).toFixed(3)).toString();
      };
      const getA = () => Number(state.slider_a ?? 0);
      const getB = () => Number(state.slider_b ?? 0);
      const getR = () => Math.hypot(getA(), getB());
      const getThetaRad = () => Math.atan2(getB(), getA());
      const getThetaDeg = () => (getThetaRad() * 180) / Math.PI;
      const formatAngle = () => (
        state.angle_toggle === 'radians'
          ? `${formatNum(getThetaRad())} rad`
          : `${formatNum(getThetaDeg())}°`
      );
      const formatComplex = (a, b) => `${formatNum(a)} ${b < 0 ? '-' : '+'} j${formatNum(Math.abs(b))}`;

      const sizeCanvas = () => {
        if (!canvas || !ctx) return { width: 0, height: 0 };
        const dpr = Math.max(window.devicePixelRatio || 1, 1);
        const rect = canvas.getBoundingClientRect();
        const width = Math.max(Math.floor(rect.width || 0), 320);
        const height = Math.max(300, Math.min(430, Math.floor(width * 0.58)));
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = '100%';
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return { width, height };
      };

      const drawArrow = (x1, y1, x2, y2, color, width = 3, dashed = false) => {
        const angle = Math.atan2(y2 - y1, x2 - x1);
        ctx.save();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = width;
        if (dashed) ctx.setLineDash([7, 6]);
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

      const drawComplexPlane = () => {
        if (!ctx) return;
        const { width, height } = sizeCanvas();
        const a = getA();
        const b = getB();
        const maxCoord = Math.max(5, Math.ceil(Math.max(Math.abs(a), Math.abs(b), getR())));
        const pad = 44;
        const ox = width / 2;
        const oy = height / 2;
        const scale = Math.min((width - pad * 2) / (maxCoord * 2.2), (height - pad * 2) / (maxCoord * 2.2));
        const px = ox + a * scale;
        const py = oy - b * scale;
        const cy = oy + b * scale;

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        for (let x = ox % scale; x < width; x += scale) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = oy % scale; y < height; y += scale) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.7;
        ctx.beginPath();
        ctx.moveTo(24, oy);
        ctx.lineTo(width - 24, oy);
        ctx.moveTo(ox, 22);
        ctx.lineTo(ox, height - 22);
        ctx.stroke();
        ctx.fillStyle = '#64748b';
        ctx.font = '700 14px Quicksand, sans-serif';
        ctx.fillText('Re', width - 46, oy - 10);
        ctx.fillText('Im', ox + 10, 34);

        drawArrow(ox, oy, px, oy, '#2563eb', 3);
        drawArrow(px, oy, px, py, '#0f766e', 3);
        drawArrow(ox, oy, px, py, '#dc2626', 3.4);
        drawArrow(ox, oy, px, cy, '#a855f7', 2.2, true);

        ctx.fillStyle = '#2563eb';
        ctx.fillText('a', (ox + px) / 2 - 5, oy - 12);
        ctx.fillStyle = '#0f766e';
        ctx.fillText(`${b < 0 ? '-' : ''}jb`, px + 9, (oy + py) / 2);
        ctx.fillStyle = '#dc2626';
        ctx.fillText('z', (ox + px) / 2 + 10, (oy + py) / 2 - 10);
        ctx.fillStyle = '#a855f7';
        ctx.fillText('z*', (ox + px) / 2 + 10, (oy + cy) / 2 + 18);

        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#a855f7';
        ctx.beginPath();
        ctx.arc(px, cy, 4, 0, Math.PI * 2);
        ctx.fill();
      };

      const renderComplexDemo = () => {
        if (shellEl) shellEl.classList.toggle('is-narrow', shellEl.clientWidth < 760);
        drawComplexPlane();
        const a = getA();
        const b = getB();
        readoutsEl.innerHTML = `
          <div class="complex-demo-readout"><strong>Rectangular:</strong> \\(z = ${formatComplex(a, b)}\\)</div>
          <div class="complex-demo-readout"><strong>Polar:</strong> \\(z = ${formatNum(getR())}e^{j${formatAngle()}}\\)</div>
          <div class="complex-demo-readout"><strong>Magnitude:</strong> \\(r = ${formatNum(getR())}\\)</div>
          <div class="complex-demo-readout"><strong>Argument:</strong> \\(\\theta = ${formatAngle()}\\)</div>
          <div class="complex-demo-readout"><strong>Conjugate:</strong> \\(z^* = ${formatComplex(a, -b)}\\)</div>
        `;
        if (window.typesetMath) window.typesetMath(node).catch(() => {});
      };

      controls.forEach((control) => {
        const key = control.id || control.key;
        if (!key || String(control.action || '').startsWith('set ')) return;
        const wrap = document.createElement('label');
        wrap.className = 'complex-demo-control';
        const label = document.createElement('span');
        label.className = 'complex-demo-control-label';
        label.textContent = control.label || key;
        wrap.appendChild(label);

        if (Array.isArray(control.options)) {
          const select = document.createElement('select');
          select.className = 'complex-demo-select';
          control.options.forEach((option) => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            if (state[key] === option) opt.selected = true;
            select.appendChild(opt);
          });
          select.addEventListener('change', () => {
            state[key] = select.value;
            renderComplexDemo();
          });
          wrap.appendChild(select);
        } else {
          const row = document.createElement('div');
          row.className = 'complex-demo-slider-row';
          const input = document.createElement('input');
          input.type = 'range';
          input.min = String(control.min ?? -5);
          input.max = String(control.max ?? 5);
          input.step = String(control.step ?? 0.1);
          input.value = String(state[key]);
          const value = document.createElement('span');
          value.className = 'complex-demo-slider-value';
          value.textContent = formatNum(state[key]);
          input.addEventListener('input', () => {
            state[key] = Number(input.value);
            value.textContent = formatNum(state[key]);
            renderComplexDemo();
          });
          row.appendChild(input);
          row.appendChild(value);
          wrap.appendChild(row);
        }
        controlsEl.appendChild(wrap);
      });

      controls
        .filter((control) => String(control.action || '').startsWith('set '))
        .forEach((control) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'complex-demo-reset';
          btn.textContent = control.label || 'Reset';
          btn.addEventListener('click', () => {
            controls.forEach((item) => {
              const key = item.id || item.key;
              if (!key || String(item.action || '').startsWith('set ')) return;
              if (Array.isArray(item.options)) state[key] = item.default || item.options[0] || 'degrees';
              else state[key] = Number(item.default ?? item.min ?? 0);
            });
            controlsEl.querySelectorAll('.complex-demo-control').forEach((controlEl) => {
              const label = controlEl.querySelector('.complex-demo-control-label')?.textContent || '';
              const spec = controls.find((item) => (item.label || item.id || item.key) === label);
              const key = spec && (spec.id || spec.key);
              if (!key) return;
              const input = controlEl.querySelector('input, select');
              const value = controlEl.querySelector('.complex-demo-slider-value');
              if (input) input.value = String(state[key]);
              if (value) value.textContent = formatNum(state[key]);
            });
            renderComplexDemo();
          });
          controlsEl.appendChild(btn);
        });

      let pendingComplexFrame = 0;
      const rerender = () => {
        if (pendingComplexFrame) return;
        pendingComplexFrame = window.requestAnimationFrame(() => {
          pendingComplexFrame = 0;
          renderComplexDemo();
        });
      };
      if (window.ResizeObserver && shellEl) {
        const observer = new ResizeObserver(rerender);
        observer.observe(shellEl);
        node._complexResizeObserver = observer;
      }
      window.addEventListener('resize', rerender, { passive: true });
      renderComplexDemo();
      return;
}
