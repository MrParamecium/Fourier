const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

function runPython3(scriptPath, arg, timeoutMs = 30000) {
    return new Promise((resolve, reject) => {
        const child = spawn('python3', [scriptPath, arg], {
            env: process.env,
            stdio: ['ignore', 'pipe', 'pipe']
        });
        let stdout = '';
        let stderr = '';
        const timer = setTimeout(() => { child.kill('SIGKILL'); reject(new Error('python3 timeout')); }, timeoutMs);
        child.stdout.on('data', d => { stdout += d.toString('utf8'); });
        child.stderr.on('data', d => { stderr += d.toString('utf8'); });
        child.on('error', e => { clearTimeout(timer); reject(e); });
        child.on('close', code => {
            clearTimeout(timer);
            if (code !== 0) return reject(new Error(stderr || `exit ${code}`));
            resolve(stdout.trim());
        });
    });
}

function normalizePythonCode(code, localPath) {
    let scriptContent = String(code || '');

    // Remove markdown fences if they leaked in
    scriptContent = scriptContent.replace(/^```python\s*/i, '').replace(/```\s*$/i, '');

    // Strip any existing backend selection and bare matplotlib import
    scriptContent = scriptContent.replace(/matplotlib\.use\(['"][^'"]*['"]\)\s*/g, '');
    scriptContent = scriptContent.replace(/^import matplotlib\s*$/gm, '');

    // Normalize save target used by the model
    scriptContent = scriptContent.replace(/\/tmp\/tutor-plot-auto\.png/g, localPath.replace(/\\/g, '/'));

    // Ensure pyplot import exists
    if (!/import\s+matplotlib\.pyplot\s+as\s+plt/.test(scriptContent)) {
        scriptContent = 'import matplotlib.pyplot as plt\n' + scriptContent;
    }
    // Ensure numpy import exists if referenced
    if (/\bnp\./.test(scriptContent) && !/import\s+numpy\s+as\s+np/.test(scriptContent)) {
        scriptContent = 'import numpy as np\n' + scriptContent;
    }

    // Inject Agg backend at top
    scriptContent = `import matplotlib\nmatplotlib.use('Agg')\n` + scriptContent;

    // If no savefig exists, append one
    if (!/plt\.savefig\(/.test(scriptContent)) {
        scriptContent += `\nplt.tight_layout()\nplt.savefig(r"${localPath}", dpi=150, bbox_inches="tight")\n`;
        return scriptContent;
    }

    // Replace the *whole* savefig call robustly instead of a fragile regex that breaks on nested parentheses
    const savefigIndex = scriptContent.indexOf('plt.savefig(');
    if (savefigIndex !== -1) {
        let i = savefigIndex + 'plt.savefig('.length;
        let depth = 1;
        while (i < scriptContent.length && depth > 0) {
            const ch = scriptContent[i];
            if (ch === '(') depth += 1;
            else if (ch === ')') depth -= 1;
            i += 1;
        }
        scriptContent = scriptContent.slice(0, savefigIndex) + `plt.savefig(r"${localPath}", dpi=150, bbox_inches="tight")` + scriptContent.slice(i);
    }

    return scriptContent;
}

async function processEmbeddedPython(markdown, genDir) {
    let resultMarkdown = markdown;
    const pythonRegex = /```python\n([\s\S]*?)```/g;
    let match;
    const matches = [];
    while ((match = pythonRegex.exec(resultMarkdown)) !== null) {
        matches.push({ full: match[0], code: match[1] });
    }

    for (const m of matches) {
        const figId = `fig-${Date.now()}-${crypto.randomBytes(4).toString('hex')}.png`;
        const localPath = path.join(genDir, figId);
        const scriptContent = normalizePythonCode(m.code, localPath);
        const scriptFile = path.join(genDir, `script-${Date.now()}-${crypto.randomBytes(2).toString('hex')}.py`);
        fs.writeFileSync(scriptFile, scriptContent);

        try {
            await runPython3(scriptFile, '', 15000);
            if (fs.existsSync(localPath)) {
                const mdImage = `\n\n![Generated Visualization](/generated/${figId})\n\n`;
                const detailBlock = `\n\n<details><summary>View Visualization Code</summary>\n\n\`\`\`python\n${m.code}\n\`\`\`\n</details>\n\n`;
                resultMarkdown = resultMarkdown.replace(m.full, mdImage + detailBlock);
            } else {
                resultMarkdown = resultMarkdown.replace(
                    m.full,
                    `\n> *⚠️ Diagram generation failed: renderer finished but no image file was produced.*\n\n` +
                    `<details><summary>View Code</summary>\n\n\`\`\`python\n${m.code}\n\`\`\`\n</details>\n`
                );
            }
        } catch (err) {
            console.error('[Python Execution Failed]', err.message);
            const isSyntax = /SyntaxError|unterminated|invalid syntax/i.test(err.message);
            const errType = isSyntax ? 'Syntax error in generated code' : 'Runtime error';
            const shortMsg = err.message.split('\n').slice(0, 4).join(' | ').substring(0, 260);
            resultMarkdown = resultMarkdown.replace(
                m.full,
                `\n> *⚠️ Diagram generation failed (${errType}): ${shortMsg}*\n\n` +
                `<details><summary>View Code</summary>\n\n\`\`\`python\n${m.code}\n\`\`\`\n</details>\n`
            );
        }
    }
    return resultMarkdown;
}

module.exports = { processEmbeddedPython };
