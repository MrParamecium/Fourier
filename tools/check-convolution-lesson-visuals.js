'use strict';

// Validation for the current 2.4-2 lesson package. The former validator
// encoded the retired 18-page/10-demo contract and is intentionally removed.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const DIR = path.join(ROOT, 'app', 'lessons', '2_4-2');
const failures = [];
const fail = message => failures.push(message);
const read = name => { const file = path.join(DIR, name); if (!fs.existsSync(file)) { fail(`missing ${name}`); return ''; } return fs.readFileSync(file, 'utf8'); };
const headings = ['Why draw a convolution?', 'Two time variables, two different jobs', 'Four actions for one output point', 'Example 2.10 · Two causal exponentials', 'Example 2.11 · Positive and negative contributions', 'Example 2.12 · Edges decide the cases', 'Transfer the method'];
const demos = ['figure27', 'example210', 'example211', 'example212'];
const markdown = read('lesson.md');
const html = read('lesson.html');
const css = read('lesson.css');
const lessonJs = read('lesson.js');
const demoJs = read('demo.js');
const models = read('demo-models.js');
if (markdown && !/^# 2\.4-2 · Graphical Understanding of Convolution Operation$/m.test(markdown)) fail('lesson.md must have the 2.4-2 title');
const mdHeadings = [...markdown.matchAll(/^## (\d+)\. ([^\r\n]+)$/gm)];
if (mdHeadings.length !== headings.length) fail(`lesson.md must contain ${headings.length} numbered sections, found ${mdHeadings.length}`);
mdHeadings.forEach((match, index) => { if (Number(match[1]) !== index + 1) fail(`lesson.md section ${index + 1} has the wrong number`); if (match[2] !== headings[index]) fail(`lesson.md section ${index + 1} heading must be "${headings[index]}"`); });
const htmlHeadings = [...html.matchAll(/<h2\b[^>]*data-section="(\d+)"[^>]*>([^<]+)<\/h2>/g)];
if (htmlHeadings.length !== headings.length) fail(`lesson.html must contain ${headings.length} sections, found ${htmlHeadings.length}`);
htmlHeadings.forEach((match, index) => { if (Number(match[1]) !== index + 1) fail(`lesson.html section ${index + 1} has the wrong data-section`); if (!match[2].includes(headings[index])) fail(`lesson.html section ${index + 1} heading is missing`); });
if ((html.match(/data-demo="/g) || []).length !== demos.length) fail(`lesson.html must contain ${demos.length} demos`);
demos.forEach(name => { if (!new RegExp(`data-demo="${name}"`).test(html)) fail(`lesson.html is missing demo ${name}`); });
if ((html.match(/class="plot-host"/g) || []).length !== demos.length * 2) fail('each demo must contain linked upper and lower plot hosts');
if (!/data-step="1"/.test(html) || !/data-step="4"/.test(html)) fail('demos must expose four convolution steps');
if (!/data-time-value/.test(html) || !/data-interval/.test(html) || !/data-bounds/.test(html) || !/data-area-value/.test(html)) fail('demos must expose time and area readouts');
if (!/theme-toggle/.test(html) || !/fresh-20260909/.test(html)) fail('lesson.html must expose the current theme/revision shell');
for (const asset of ['figure-2-7.png', 'figure-2-8.png', 'figure-2-9.png', 'figure-2-10.png']) { const file = path.join(DIR, 'assets', 'textbook-crops', asset); if (!fs.existsSync(file)) fail(`missing textbook crop ${asset}`); if (!new RegExp(`textbook-crops/${asset}`).test(html)) fail(`lesson.html is missing textbook crop ${asset}`); }
if (!/data-correct|onclick|querySelectorAll/.test(lessonJs)) fail('lesson.js must wire checkpoint interactions');
if (!/data-demo/.test(demoJs) || !/figure27|example210|example211|example212/.test(models)) fail('demo runtime/model registry is incomplete');
if (!/--accent|--surface|--ink/.test(css)) fail('lesson.css must define lesson visual tokens');
if (failures.length) { console.error(`[convolution-lesson-visuals] FAIL - ${failures.length} error(s)`); failures.forEach(message => console.error(`  - ${message}`)); process.exitCode = 1; } else console.log('[convolution-lesson-visuals] PASS - fresh 2.4-2 package: 7 sections, 4 demos, current assets and runtime hooks');
