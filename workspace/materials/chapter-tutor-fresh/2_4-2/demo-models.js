/* Independent textbook models; no dependency on the legacy course demos. */
(function (root) {
  const exp = Math.exp;
  const models = {
    figure27: {
      title: 'Figure 2.7 · The graphical procedure', fixedLabel: 'x(τ)', movingName: 'g',
      formulas: ['x(t) = u(t + 1)', 'Demo realization: g(t) = 2 exp(−(t + 2)) u(t + 2)'],
      note: 'The book specifies the decaying shape graphically. This analytic realization preserves its edge at −2 and starting height 2.',
      fixed: 'If(x>=-1,1,0)', original: 'If(x>=-2,2*exp(-(x+2)),0)',
      output: 'If(x<=-3,0,2*(1-exp(-(x+3))))',
      value: t => t <= -3 ? 0 : 2 * (1 - exp(-(t + 3))),
      limits: t => [-1, t + 2],
      area: 'If(t<=-3,0,2*(1-exp(-(t+3))))',
      left: '-1', right: 't+2', leftLabel: '−1', rightLabel: 't+2',
      min: -4, max: 3, initial: 0, view: [-4, 6, -0.6, 2.7], outputView: [-4, 3, -0.3, 2.5],
      flipDomain: [-2, 6], markers: [-2, 0], checkpoints: [-4, -3, -2, 0, 1],
      interval: t => t <= -3 ? 't ≤ −3 · no overlap' : 't > −3 · overlap',
      bounds: t => t <= -3 ? 'No overlap' : `−1 ≤ τ ≤ t+2 = ${(t+2).toFixed(2)}`
    },
    example210: {
      title: 'Example 2.10 · Two causal exponentials', fixedLabel: 'x(τ)', movingName: 'h',
      formulas: ['x(t) = exp(−t) u(t)', 'h(t) = exp(−2t) u(t)'], note: 'Both signals vanish before zero. Compare the two support inequalities.',
      fixed: 'If(x>=0,exp(-x),0)', original: 'If(x>=0,exp(-2*x),0)',
      output: 'If(x<0,0,exp(-x)-exp(-2*x))', area: 'If(t<0,0,exp(-t)-exp(-2*t))',
      value: t => t < 0 ? 0 : exp(-t)-exp(-2*t), limits: t => [0,t],
      left: '0', right: 't', leftLabel: '0', rightLabel: 't',
      min: -2, max: 5, initial: 1, view: [-3, 6, -0.3, 1.55], outputView: [-2, 5, -0.06, 0.34],
      flipDomain: [0,5], markers: [0,1], checkpoints: [-1,0,1,3],
      interval: t => t < 0 ? 't < 0 · no overlap' : 't ≥ 0 · causal overlap',
      bounds: t => t <= 0 ? 'Zero-width or no overlap' : `0 ≤ τ ≤ t = ${t.toFixed(2)}`
    },
    example211: {
      title: 'Example 2.11 · A two-sided signal', fixedLabel: 'x(τ)', movingName: 'g',
      formulas: ['x(t) = u(t)', 'g(t) = 2 exp(−t) for t ≥ 0; −2 exp(2t) for t < 0'],
      note: 'The plotted tail is clipped to the window. A is the exact signed integral including the infinite tail.',
      fixed: 'If(x>=0,1,0)', original: 'If(x>=0,2*exp(-x),-2*exp(2*x))',
      output: 'If(x<0,-exp(2*x),1-2*exp(-x))', area: 'If(t<0,-exp(2*t),1-2*exp(-t))',
      value: t => t < 0 ? -exp(2*t) : 1-2*exp(-t), limits: () => [0,9],
      left: '0', right: 't', leftLabel: '0', rightLabel: 't · branch boundary',
      min: -3, max: 4, initial: 1, view: [-3.5,9,-2.6,2.9], outputView: [-3,4,-1.3,1.4],
      flipDomain: [-5,9], markers: [-0.5,0.5], checkpoints: [-1,0,Math.log(2),1,2],
      interval: t => t < 0 ? 't < 0 · negative branch only' : 't ≥ 0 · positive + negative branches',
      bounds: t => t < 0 ? '0 ≤ τ < ∞' : `A: 0 ≤ τ ≤ ${t.toFixed(2)}; B: τ > ${t.toFixed(2)}`
    },
    example212: {
      title: 'Example 2.12 · A rectangle and a ramp', fixedLabel: 'g(τ)', movingName: 'x',
      formulas: ['x(t) = 1 for −1 ≤ t ≤ 1; zero elsewhere', 'g(t) = t/3 for 0 ≤ t ≤ 3; zero elsewhere'],
      note: 'The rectangle is even: flipping changes endpoint identities but not its outline.',
      fixed: 'If(0<=x && x<=3,x/3,0)', original: 'If(-1<=x && x<=1,1,0)',
      output: 'If(x<=-1,0,If(x<1,(x+1)^2/6,If(x<2,2*x/3,If(x<4,(9-(x-1)^2)/6,0))))',
      area: 'If(R>L,(R^2-L^2)/6,0)', limits: t => [Math.max(0,t-1),Math.min(3,t+1)],
      value(t) { const [l,r]=this.limits(t); return r>l?(r*r-l*l)/6:0; },
      left: 't-1', right: 't+1', leftLabel: 't−1', rightLabel: 't+1',
      min: -2, max: 5, initial: 1.5, view: [-2.5,6,-0.3,1.6], outputView: [-2,5,-0.2,1.7],
      flipDomain: [-1,1], markers: [-1,1], checkpoints: [-1,0,1,1.5,2,3,4],
      interval: t => t < -1 ? 't < −1 · no overlap' : t < 1 ? '−1 ≤ t < 1 · entering' : t < 2 ? '1 ≤ t < 2 · passing' : t < 4 ? '2 ≤ t < 4 · leaving' : 't ≥ 4 · no overlap',
      bounds(t) { const [l,r]=this.limits(t); return r>l?`${l.toFixed(2)} ≤ τ ≤ ${r.toFixed(2)}`:'Zero-width or no overlap'; }
    }
  };
  if (typeof module !== 'undefined') module.exports=models;
  else root.ConvolutionModels=models;
})(typeof window === 'undefined' ? {} : window);
