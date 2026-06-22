// interactive-demos/helpers — shared canvas + rAF helpers used by the
// canvas-driven family modules (complex-plane.js, sinusoid-phasor.js,
// phasor.js). Pulled out of those modules in Phase 3 Step F (PR #21 Pass 2)
// to reconcile drawArrow signature drift (ctx-as-first-arg vs
// outer-ctx-capture) and the dpr-and-setTransform tail of each family's
// per-canvas sizeCanvas closure.
//
// Loaded as a classic <script> BEFORE the family modules in app/index.html.
// Reaches into the shared script-global lexical env — no IIFE wrapper,
// no module.exports.
//
// Public surface (free-name lookup from family modules):
//   - applyCanvasDpr(canvas, ctx, width, height) → { width, height }
//   - drawCanvasArrow(ctx, x1, y1, x2, y2, color, opts?)
//   - coalesceFrames(callback) → function (rAF-coalesced trigger)
//
// What is intentionally NOT shared:
//   - formatNum / formatValue: complex-plane + phasor use toFixed(3);
//     sinusoid-phasor uses toFixed(2). Semantic difference per family.
//   - getA / getB / getThetaRad / getC: defaults and sign conventions
//     diverge per family (phasor's atan2 flips b; complex-plane defaults
//     0,0 vs phasor 1,-1.732). Keeping per-family closures preserves
//     intentional design.
//   - sizeCanvas width/height calc: each family computes its own
//     dimensions (min width 320 vs 180 vs 160; height-from-width vs
//     fallback-height vs explicit-height). Only the dpr+setTransform
//     tail is shared via applyCanvasDpr.
//   - drawGrid: only sinusoid-phasor uses it. Single-use, no consolidation.

function applyCanvasDpr(canvas, ctx, width, height) {
  const dpr = Math.max(window.devicePixelRatio || 1, 1);
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = '100%';
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { width, height };
}

function drawCanvasArrow(ctx, x1, y1, x2, y2, color, opts) {
  const { width = 3, dashed = false, headLength = 10 } = opts || {};
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
    ctx.lineTo(x2 - headLength * Math.cos(angle - Math.PI / 6), y2 - headLength * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(x2 - headLength * Math.cos(angle + Math.PI / 6), y2 - headLength * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function coalesceFrames(callback) {
  let pending = 0;
  return function coalesced() {
    if (pending) return;
    pending = window.requestAnimationFrame(() => {
      pending = 0;
      callback();
    });
  };
}
