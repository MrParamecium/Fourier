const fs = require('fs');
const path = require('path');
const { processEmbeddedPython } = require('./process-python.js');

(async () => {
  const genDir = path.join(__dirname, 'generated');
  fs.mkdirSync(genDir, { recursive: true });

  const mdOk = [
    'Here is a chart:',
    '```python',
    'import numpy as np',
    'x = np.linspace(-2, 2, 100)',
    'plt.figure(figsize=(4,3))',
    'plt.plot(x, x**2)',
    'plt.savefig("/tmp/tutor-plot-auto.png", dpi=150)',
    '```'
  ].join('\n');

  const mdBad = [
    'Broken chart:',
    '```python',
    'plt.figure(figsize=(4,3)',
    'plt.plot([1,2],[3,4])',
    '```'
  ].join('\n');

  const ok = await processEmbeddedPython(mdOk, genDir);
  const bad = await processEmbeddedPython(mdBad, genDir);

  console.log('===OK===');
  console.log(ok);
  console.log('===BAD===');
  console.log(bad);
})();
