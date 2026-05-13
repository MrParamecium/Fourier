#!/usr/bin/env node
/*
 * Regenerate Background + Chapter 1 lesson caches using the section OCR pipeline.
 * Regenerates actual lesson caches only. Most parent sections are overview
 * directory pages, not lessons; backend guards parent_prelude separately.
 */

const { spawn } = require('child_process');
const path = require('path');

const UI_DIR = path.resolve(__dirname, '..');
const BRIDGE = path.join(UI_DIR, 'ws-bridge.js');
const CONCURRENCY = Number(process.env.PREGEN_CONCURRENCY || 4);

const syllabus = [
  {
    chapter: 'B Background',
    sections: [
      { title: 'B.1 Complex Numbers', subsections: ['B.1-1 A Historical Note', 'B.1-2 Algebra of Complex Numbers'] },
      { title: 'B.2 Sinusoids', subsections: ['B.2-1 Addition of Sinusoids', 'B.2-2 Sinusoids in Terms of Exponentials'] },
      { title: 'B.3 Sketching Signals', subsections: ['B.3-1 Monotonic Exponentials', 'B.3-2 The Exponentially Varying Sinusoid'] },
      { title: "B.4 Cramer's Rule", subsections: [] },
      { title: 'B.5 Partial Fraction Expansion', subsections: ['B.5-1 Method of Clearing Fractions', 'B.5-2 Heaviside Cover-Up Method', 'B.5-3 Repeated Factors of Q(x)', 'B.5-4 A Combination of Heaviside and Clearing Fractions', 'B.5-5 Improper F(x) with m=n', 'B.5-6 Modified Partial Fractions'] },
      { title: 'B.6 Vectors and Matrices', subsections: ['B.6-1 Some Definitions and Properties', 'B.6-2 Matrix Algebra'] },
      { title: 'B.7 MATLAB: Elementary Operations', subsections: ['B.7-1 MATLAB Overview', 'B.7-2 Calculator Operations', 'B.7-3 Vector Operations', 'B.7-4 Simple Plotting', 'B.7-5 Element-by-Element Operations', 'B.7-6 Matrix Operations', 'B.7-7 Partial Fraction Expansions'] },
      { title: 'B.8 Appendix: Useful Mathematical Formulas', subsections: ['B.8-1 Some Useful Constants', 'B.8-2 Complex Numbers', 'B.8-3 Sums', 'B.8-4 Taylor and Maclaurin Series', 'B.8-5 Power Series', 'B.8-6 Trigonometric Identities', 'B.8-7 Common Derivative Formulas', 'B.8-8 Indefinite Integrals', "B.8-9 L'Hopital's Rule", 'B.8-10 Solution of Quadratic and Cubic Equations'] }
    ]
  },
  {
    chapter: 'Chapter 1: Signals and Systems',
    sections: [
      { title: '1.1 Size of a Signal', subsections: ['1.1-1 Signal Energy', '1.1-2 Signal Power'] },
      { title: '1.2 Some Useful Signal Operations', subsections: ['1.2-1 Time Shifting', '1.2-2 Time Scaling', '1.2-3 Time Reversal', '1.2-4 Combined Operations'] },
      { title: '1.3 Classification of Signals', subsections: ['1.3-1 Continuous-Time and Discrete-Time Signals', '1.3-2 Analog and Digital Signals', '1.3-3 Periodic and Aperiodic Signals', '1.3-4 Energy and Power Signals', '1.3-5 Deterministic and Random Signals'] },
      { title: '1.4 Some Useful Signal Models', subsections: ['1.4-1 The Unit Step Function u(t)', '1.4-2 The Unit Impulse Function δ(t)', '1.4-3 The Exponential Function e^st'] },
      { title: '1.5 Even and Odd Functions', subsections: ['1.5-1 Some Properties of Even and Odd Functions', '1.5-2 Even and Odd Components of a Signal'] },
      { title: '1.6 Systems', subsections: [] },
      { title: '1.7 Classification of Systems', subsections: ['1.7-1 Linear and Nonlinear Systems', '1.7-2 Time-Invariant and Time-Varying Systems', '1.7-3 Instantaneous and Dynamic Systems', '1.7-4 Causal and Noncausal Systems', '1.7-5 Continuous-Time and Discrete-Time Systems', '1.7-6 Analog and Digital Systems', '1.7-7 Invertible and Noninvertible Systems', '1.7-8 Stable and Unstable Systems'] },
      { title: '1.8 System Model: Input-Output Description', subsections: ['1.8-1 Electrical Systems', '1.8-2 Mechanical Systems', '1.8-3 Electromechanical Systems'] },
      { title: '1.9 Internal and External Descriptions of a System', subsections: [] },
      { title: '1.10 Internal Description: The State-Space Description', subsections: [] },
      { title: '1.11 MATLAB: Working with Functions', subsections: ['1.11-1 Anonymous Functions', '1.11-2 Relational Operators and the Unit Step Function', '1.11-3 Visualizing Operations on the Independent Variable', '1.11-4 Numerical Integration and Estimating Signal Energy'] },
      { title: '1.12 Summary', subsections: [] }
    ]
  }
];

function makeTasks() {
  const tasks = [];
  for (const chapter of syllabus) {
    for (const section of chapter.sections) {
      if (/^B\.8\b/i.test(section.title)) continue;
      const hasSubs = Array.isArray(section.subsections) && section.subsections.length > 0;
      if (!hasSubs) {
        tasks.push({ sectionId: section.title, sectionTitle: section.title, cacheVariant: 'lesson' });
      }
      for (const sub of section.subsections || []) {
        if (/^B\.8\b/i.test(sub)) continue;
        tasks.push({ sectionId: sub, sectionTitle: sub, cacheVariant: 'lesson' });
      }
    }
  }
  return tasks;
}

function runTask(task, index, total) {
  return new Promise((resolve) => {
    const label = `[${index + 1}/${total}] ${task.cacheVariant} ${task.sectionId}`;
    const started = Date.now();
    console.log(`${label} START`);
    const child = spawn(process.execPath, [
      BRIDGE,
      '--pregen-section',
      task.sectionId,
      task.sectionTitle,
      'new',
      task.cacheVariant
    ], {
      cwd: UI_DIR,
      env: { ...process.env },
      stdio: ['ignore', 'pipe', 'pipe']
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', chunk => { stdout += chunk.toString(); });
    child.stderr.on('data', chunk => { stderr += chunk.toString(); });
    child.on('close', code => {
      const ms = Date.now() - started;
      if (code === 0) {
        console.log(`${label} OK ${ms}ms`);
        resolve({ task, ok: true, ms, stdout, stderr });
      } else {
        console.error(`${label} FAIL code=${code} ${ms}ms`);
        const tail = stderr.split(/\r?\n/).filter(Boolean).slice(-12).join('\n');
        if (tail) console.error(tail);
        resolve({ task, ok: false, ms, stdout, stderr, code });
      }
    });
  });
}

async function main() {
  const tasks = makeTasks();
  console.log(`Regenerating ${tasks.length} Background + Chapter 1 tasks with concurrency=${CONCURRENCY}`);
  const results = new Array(tasks.length);
  let next = 0;
  async function worker() {
    while (next < tasks.length) {
      const index = next++;
      results[index] = await runTask(tasks[index], index, tasks.length);
    }
  }
  await Promise.all(Array.from({ length: Math.max(1, CONCURRENCY) }, worker));
  const failed = results.filter(result => !result.ok);
  console.log(`Done. ok=${results.length - failed.length}, failed=${failed.length}`);
  if (failed.length) {
    console.log('Failed tasks:');
    failed.forEach(result => console.log(`- ${result.task.cacheVariant} ${result.task.sectionId}`));
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});
