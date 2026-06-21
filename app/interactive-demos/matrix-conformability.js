// matrix-conformability — extracted from app.js Phase 3 PR #21 (hydrateInteractiveDemos dispatcher split).
// Loaded as a classic <script> BEFORE app.js. Reaches into the shared script-global lexical env.
//
// External globals used at call time:
//   - escapeHtml, normalizeInteractiveDemoControl, getDemoControlValue (app.js)
//
// Public surface (free-name lookup from the dispatcher in app.js):
//   - renderMatrixConformabilityDemo(node, demo, demoControls)

function renderMatrixConformabilityDemo(node, demo, demoControls) {
    const controls = demoControls.length ? demoControls.map(normalizeInteractiveDemoControl) : [
      { key: 'rowsA', label: 'rows of A', min: 1, max: 5, step: 1, default: 2 },
      { key: 'colsA', label: 'cols of A', min: 1, max: 5, step: 1, default: 3 },
      { key: 'rowsB', label: 'rows of B', min: 1, max: 5, step: 1, default: 3 },
      { key: 'colsB', label: 'cols of B', min: 1, max: 5, step: 1, default: 2 }
    ];
    const state = Object.create(null);
    controls.forEach((control) => {
      const labelText = String(control.label || control.key || '').toLowerCase();
      const mappedKey = labelText.includes('rows of a') || /^m\b/.test(labelText)
        ? 'rowsA'
        : labelText.includes('cols of a') || labelText.includes('cols of a = rows of b') || /^n\b/.test(labelText)
          ? 'colsA'
          : labelText.includes('rows of b') || labelText.includes('override rows of b')
            ? 'rowsB'
            : labelText.includes('cols of b') || /^p\b/.test(labelText)
              ? 'colsB'
              : control.key;
      control.key = mappedKey;
      const defaultValue = control.default ?? (mappedKey === 'rowsA' ? 2 : mappedKey === 'colsA' ? 3 : mappedKey === 'rowsB' ? 3 : mappedKey === 'colsB' ? 2 : control.min ?? 1);
      state[mappedKey] = Number(defaultValue);
    });
    if (!Number.isFinite(Number(state.rowsA))) state.rowsA = 2;
    if (!Number.isFinite(Number(state.colsA))) state.colsA = 3;
    if (!Number.isFinite(Number(state.rowsB))) state.rowsB = 3;
    if (!Number.isFinite(Number(state.colsB))) state.colsB = 2;

    node.innerHTML = `
      <section class="matrix-demo-shell">
        <div class="matrix-demo-head">
          <div class="matrix-demo-title">${escapeHtml(demo.title || 'Interactive demo')}</div>
          <div class="matrix-demo-subtitle">${escapeHtml(demo.learning_objective || '')}</div>
        </div>
        <div class="matrix-demo-controls"></div>
        <div class="matrix-demo-stage">
          <canvas class="matrix-demo-canvas"></canvas>
        </div>
        <div class="matrix-demo-status"></div>
        <div class="matrix-demo-formula"></div>
        <div class="matrix-demo-observe">
          ${(Array.isArray(demo.observe) ? demo.observe : []).map((item) => `<div class="matrix-demo-observe-item">${escapeHtml(item)}</div>`).join('')}
        </div>
        <div class="matrix-demo-task">${escapeHtml(demo.student_task || '')}</div>
      </section>
    `;

    const controlsEl = node.querySelector('.matrix-demo-controls');
    const canvas = node.querySelector('.matrix-demo-canvas');
    const statusEl = node.querySelector('.matrix-demo-status');
    const formulaEl = node.querySelector('.matrix-demo-formula');
    const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;

    const buildMatrix = (rows, cols, start = 1) =>
      Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => start + r * cols + c)
      );

    const computeEntry = (A, B, rowIndex, colIndex) => {
      const terms = [];
      let total = 0;
      for (let k = 0; k < A[0].length; k += 1) {
        const left = A[rowIndex][k];
        const right = B[k][colIndex];
        terms.push({ left, right, product: left * right });
        total += left * right;
      }
      return { total, terms };
    };

    const ensureCanvasResolution = () => {
      if (!canvas || !ctx) return null;
      const dpr = Math.max(window.devicePixelRatio || 1, 1);
      const width = Math.max(Math.floor(node.clientWidth - 32), 820);
      const height = 420;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { width, height };
    };

    const drawMatrix = (x, y, rows, cols, label, opts = {}) => {
      const cell = opts.cell || 44;
      const values = opts.values || null;
      const highlightRow = Number.isInteger(opts.highlightRow) ? opts.highlightRow : -1;
      const highlightCol = Number.isInteger(opts.highlightCol) ? opts.highlightCol : -1;
      const highlightCell = opts.highlightCell || null;
      const width = cols * cell;
      const height = rows * cell;

      ctx.save();
      ctx.fillStyle = '#0f172a';
      ctx.font = '600 18px Inter, sans-serif';
      ctx.fillText(label, x, y - 14);

      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const cx = x + c * cell;
          const cy = y + r * cell;
          const rowActive = r === highlightRow;
          const colActive = c === highlightCol;
          const cellActive = highlightCell && highlightCell.row === r && highlightCell.col === c;

          ctx.fillStyle = cellActive
            ? 'rgba(37, 99, 235, 0.18)'
            : rowActive
              ? 'rgba(20, 184, 166, 0.14)'
              : colActive
                ? 'rgba(99, 102, 241, 0.14)'
                : '#ffffff';
          ctx.fillRect(cx, cy, cell, cell);
          ctx.strokeStyle = cellActive ? '#2563eb' : 'rgba(148,163,184,0.95)';
          ctx.lineWidth = cellActive ? 2 : 1;
          ctx.strokeRect(cx, cy, cell, cell);

          const text = values ? String(values[r][c]) : '';
          ctx.fillStyle = '#0f172a';
          ctx.font = '500 17px Inter, sans-serif';
          const metrics = ctx.measureText(text);
          ctx.fillText(text, cx + (cell - metrics.width) / 2, cy + cell / 2 + 6);
        }
      }

      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x - 10, y);
      ctx.lineTo(x - 10, y + height);
      ctx.moveTo(x + width + 10, y);
      ctx.lineTo(x + width + 10, y + height);
      ctx.stroke();
      ctx.restore();

      return { width, height, cell };
    };

    const render = () => {
      if (!ctx) return;
      const canvasSize = ensureCanvasResolution();
      if (!canvasSize) return;
      const rowsA = getDemoControlValue({ key: 'rowsA', default: 2 }, state);
      const colsA = getDemoControlValue({ key: 'colsA', default: 3 }, state);
      const rowsB = getDemoControlValue({ key: 'rowsB', default: 3 }, state);
      const colsB = getDemoControlValue({ key: 'colsB', default: 2 }, state);
      const valid = colsA === rowsB;
      const focusEntry = Math.max(1, Math.min(getDemoControlValue({ key: 'focusEntry', default: 1 }, state), Math.max(rowsA * colsB, 1)));
      const focusRow = valid ? Math.floor((focusEntry - 1) / colsB) : 0;
      const focusCol = valid ? ((focusEntry - 1) % colsB) : 0;
      const { width, height } = canvasSize;
      const valuesA = buildMatrix(rowsA, colsA, 1);
      const valuesB = buildMatrix(rowsB, colsB, 1);
      const layout = {
        startX: 28,
        topY: 78,
        cell: 44,
        gapAB: 120,
        gapBC: 120
      };

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, width, height);

      const aBox = drawMatrix(layout.startX, layout.topY, rowsA, colsA, 'Matrix A', {
        cell: layout.cell,
        values: valuesA,
        highlightRow: valid ? focusRow : -1
      });
      const bX = layout.startX + aBox.width + layout.gapAB;
      const bBox = drawMatrix(bX, layout.topY, rowsB, colsB, 'Matrix B', {
        cell: layout.cell,
        values: valuesB,
        highlightCol: valid ? focusCol : -1
      });

      ctx.fillStyle = '#0f172a';
      ctx.font = '600 34px Inter, sans-serif';
      ctx.fillText('×', layout.startX + aBox.width + 42, layout.topY + 76);
      ctx.fillText('=', bX + bBox.width + 42, layout.topY + 76);

      const cX = bX + bBox.width + layout.gapBC;
      if (valid) {
        const { total, terms } = computeEntry(valuesA, valuesB, focusRow, focusCol);
        const valuesC = Array.from({ length: rowsA }, (_, r) =>
          Array.from({ length: colsB }, (_, c) => (r === focusRow && c === focusCol ? total : ''))
        );
        drawMatrix(cX, layout.topY, rowsA, colsB, 'Product C = AB', {
          cell: layout.cell,
          values: valuesC,
          highlightCell: { row: focusRow, col: focusCol }
        });

        const expansion = terms.map((t) => `${t.left}×${t.right}`).join(' + ');
        statusEl.innerHTML = `<span class="matrix-demo-pill matrix-demo-pill-good">Valid</span> inner dimensions match: <strong>${colsA}</strong> = <strong>${rowsB}</strong>. Output size is <strong>${rowsA} × ${colsB}</strong>.`;
        formulaEl.innerHTML = `
          <div class="matrix-demo-formula-title">Focused entry</div>
          <div class="matrix-demo-formula-main">\\(c_{${focusRow + 1}${focusCol + 1}} = ${expansion} = ${total}\\)</div>
          <div class="matrix-demo-formula-sub">Row ${focusRow + 1} of \\(A\\) pairs with column ${focusCol + 1} of \\(B\\).</div>
        `;
      } else {
        statusEl.innerHTML = `<span class="matrix-demo-pill matrix-demo-pill-bad">Invalid</span> inner dimensions do not match: <strong>${colsA}</strong> ≠ <strong>${rowsB}</strong>.`;
        formulaEl.innerHTML = `
          <div class="matrix-demo-formula-title">Why it fails</div>
          <div class="matrix-demo-formula-main">\\(AB\\) is undefined because the number of columns of \\(A\\) must equal the number of rows of \\(B\\).</div>
          <div class="matrix-demo-formula-sub">Change \\(colsA\\) or \\(rowsB\\) until the inner dimensions match.</div>
        `;
      }
    };

    controls.forEach((control) => {
      const wrap = document.createElement('label');
      wrap.className = 'matrix-demo-control';
      const label = document.createElement('span');
      label.className = 'matrix-demo-control-label';
      label.textContent = control.label || control.key;
      const input = document.createElement('input');
      input.type = 'range';
      input.min = String(control.min ?? 1);
      input.max = String(control.max ?? 4);
      input.step = String(control.step ?? 1);
      input.value = String(state[control.key]);
      const value = document.createElement('span');
      value.className = 'matrix-demo-control-value';
      value.textContent = String(state[control.key]);
      input.addEventListener('input', () => {
        state[control.key] = Number(input.value);
        value.textContent = input.value;
        render();
      });
      wrap.appendChild(label);
      wrap.appendChild(input);
      wrap.appendChild(value);
      controlsEl.appendChild(wrap);
    });

    const rerender = () => render();
    window.addEventListener('resize', rerender, { passive: true });
    render();
}
