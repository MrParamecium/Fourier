/* Independent textbook models; no dependency on the legacy course demos. */
(function (root) {
  const ZH = typeof document !== 'undefined' && document.documentElement.lang === 'zh';
  const T = (en, zh) => ZH ? zh : en;
  const exp = Math.exp;
  const models = {
    figure27: {
      title: T('Figure 2.7 · The graphical procedure','图 2.7 · 图解流程'), fixedLabel: 'x(τ)', movingName: 'g',
      formulas: ['x(t) = u(t + 1)', T('Demo realization: g(t) = 2 exp(−(t + 2)) u(t + 2)','演示实现：g(t) = 2 exp(−(t + 2)) u(t + 2)')],
      note: T('The book specifies the decaying shape graphically. This analytic realization preserves its edge at −2 and starting height 2.','教材以图形方式给出衰减形状。这一解析实现保持了它在 −2 处的边缘和 2 的起始高度。'),
      fixed: 'If(x>=-1,1,0)', original: 'If(x>=-2,2*exp(-(x+2)),0)',
      output: 'If(x<=-3,0,2*(1-exp(-(x+3))))',
      value: t => t <= -3 ? 0 : 2 * (1 - exp(-(t + 3))),
      limits: t => [-1, t + 2],
      area: 'If(t<=-3,0,2*(1-exp(-(t+3))))',
      left: '-1', right: 't+2', leftLabel: '−1', rightLabel: 't+2',
      min: -4, max: 3, initial: 0, view: [-4, 6, -0.6, 2.7], outputView: [-4, 3, -0.3, 2.5],
      flipDomain: [-2, 6], markers: [-2, 0], checkpoints: [-4, -3, -2, 0, 1],
      interval: t => t <= -3 ? T('t ≤ −3 · no overlap','t ≤ −3 · 无重叠') : T('t > −3 · overlap','t > −3 · 有重叠'),
      bounds: t => t <= -3 ? T('No overlap','无重叠') : `−1 ≤ τ ≤ t+2 = ${(t+2).toFixed(2)}`
    },
    example210: {
      title: T('Example 2.10 · Two causal exponentials','例题 2.10 · 两个因果指数信号'), fixedLabel: 'x(τ)', movingName: 'h',
      formulas: ['x(t) = exp(−t) u(t)', 'h(t) = exp(−2t) u(t)'], note: T('Both signals vanish before zero. Compare the two support inequalities.','两个信号在零之前都为零。比较两条支集不等式。'),
      fixed: 'If(x>=0,exp(-x),0)', original: 'If(x>=0,exp(-2*x),0)',
      output: 'If(x<0,0,exp(-x)-exp(-2*x))', area: 'If(t<0,0,exp(-t)-exp(-2*t))',
      value: t => t < 0 ? 0 : exp(-t)-exp(-2*t), limits: t => [0,t],
      left: '0', right: 't', leftLabel: '0', rightLabel: 't',
      min: -2, max: 5, initial: 1, view: [-3, 6, -0.3, 1.55], outputView: [-2, 5, -0.06, 0.34],
      flipDomain: [0,5], markers: [0,1], checkpoints: [-1,0,1,3],
      interval: t => t < 0 ? T('t < 0 · no overlap','t < 0 · 无重叠') : T('t ≥ 0 · causal overlap','t ≥ 0 · 因果重叠'),
      bounds: t => t <= 0 ? T('Zero-width or no overlap','零宽度或无重叠') : `0 ≤ τ ≤ t = ${t.toFixed(2)}`
    },
    example211: {
      title: T('Example 2.11 · A two-sided signal','例题 2.11 · 一个双边信号'), fixedLabel: 'x(τ)', movingName: 'g',
      formulas: ['x(t) = u(t)', 'g(t) = 2 exp(−t) for t ≥ 0; −2 exp(2t) for t < 0'],
      note: T('The plotted tail is clipped to the window. A is the exact signed integral including the infinite tail.','绘图窗口裁掉了无限尾段。A 是包含无限尾段的精确带符号积分。'),
      fixed: 'If(x>=0,1,0)', original: 'If(x>=0,2*exp(-x),-2*exp(2*x))',
      output: 'If(x<0,-exp(2*x),1-2*exp(-x))', area: 'If(t<0,-exp(2*t),1-2*exp(-t))',
      value: t => t < 0 ? -exp(2*t) : 1-2*exp(-t), limits: () => [0,9],
      left: '0', right: 't', leftLabel: '0', rightLabel: 't · branch boundary',
      min: -3, max: 4, initial: 1, view: [-3.5,9,-2.6,2.9], outputView: [-3,4,-1.3,1.4],
      flipDomain: [-5,9], markers: [-0.5,0.5], checkpoints: [-1,0,Math.log(2),1,2],
      interval: t => t < 0 ? T('t < 0 · negative branch only','t < 0 · 仅负分支') : T('t ≥ 0 · positive + negative branches','t ≥ 0 · 正分支 + 负分支'),
      bounds: t => t < 0 ? '0 ≤ τ < ∞' : `A: 0 ≤ τ ≤ ${t.toFixed(2)}; B: τ > ${t.toFixed(2)}`
    },
    example212: {
      title: T('Example 2.12 · A rectangle and a ramp','例题 2.12 · 矩形与斜坡'), fixedLabel: 'g(τ)', movingName: 'x',
      formulas: ['x(t) = 1 for −1 ≤ t ≤ 1; zero elsewhere', 'g(t) = t/3 for 0 ≤ t ≤ 3; zero elsewhere'],
      note: T('The rectangle is even: flipping changes endpoint identities but not its outline.','矩形是偶函数：翻转只交换端点身份，轮廓不变。'),
      fixed: 'If(0<=x && x<=3,x/3,0)', original: 'If(-1<=x && x<=1,1,0)',
      output: 'If(x<=-1,0,If(x<1,(x+1)^2/6,If(x<2,2*x/3,If(x<4,(9-(x-1)^2)/6,0))))',
      area: 'If(R>L,(R^2-L^2)/6,0)', limits: t => [Math.max(0,t-1),Math.min(3,t+1)],
      value(t) { const [l,r]=this.limits(t); return r>l?(r*r-l*l)/6:0; },
      left: 't-1', right: 't+1', leftLabel: 't−1', rightLabel: 't+1',
      min: -2, max: 5, initial: 1.5, view: [-2.5,6,-0.3,1.6], outputView: [-2,5,-0.2,1.7],
      flipDomain: [-1,1], markers: [-1,1], checkpoints: [-1,0,1,1.5,2,3,4],
      interval: t => t < -1 ? T('t < −1 · no overlap','t < −1 · 无重叠') : t < 1 ? T('−1 ≤ t < 1 · entering','−1 ≤ t < 1 · 进入') : t < 2 ? T('1 ≤ t < 2 · passing','1 ≤ t < 2 · 经过') : t < 4 ? T('2 ≤ t < 4 · leaving','2 ≤ t < 4 · 离开') : T('t ≥ 4 · no overlap','t ≥ 4 · 无重叠'),
      bounds(t) { const [l,r]=this.limits(t); return r>l?`${l.toFixed(2)} ≤ τ ≤ ${r.toFixed(2)}`:T('Zero-width or no overlap','零宽度或无重叠'); }
    }
  };
  if (typeof module !== 'undefined') module.exports=models;
  else root.ConvolutionModels=models;
})(typeof window === 'undefined' ? {} : window);
