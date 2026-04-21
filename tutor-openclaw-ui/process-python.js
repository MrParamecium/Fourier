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

async function processEmbeddedPython(markdown, genDir) {
    let resultMarkdown = markdown;
    const pythonRegex = /```python\n([\s\S]*?)```/g;
    let match;
    // Because replacing changes length, let's collect matches first
    const matches = [];
    while ((match = pythonRegex.exec(resultMarkdown)) !== null) {
        matches.push({ full: match[0], code: match[1] });
    }
    
    for (const m of matches) {
        let scriptContent = m.code;
        
        const figId = `fig-${Date.now()}-${crypto.randomBytes(4).toString('hex')}.png`;
        const localPath = path.join(genDir, figId);
        
        scriptContent = `import matplotlib\nmatplotlib.use('Agg')\n\n` + scriptContent;
        if (!scriptContent.includes('plt.savefig')) {
            scriptContent += `\nimport matplotlib.pyplot as plt\nplt.savefig(r"${localPath}", dpi=150, bbox_inches="tight")\n`;
        } else {
            scriptContent = scriptContent.replace(/plt\.savefig\([^)]+\)/g, `plt.savefig(r"${localPath}", dpi=150, bbox_inches="tight")`);
        }
        
        const scriptFile = path.join(genDir, `script-${Date.now()}-${crypto.randomBytes(2).toString('hex')}.py`);
        fs.writeFileSync(scriptFile, scriptContent);
        
        try {
            await runPython3(scriptFile, '', 15000);
            if (fs.existsSync(localPath)) {
                const mdImage = `\n\n![Generated Visualization](/generated/${figId})\n\n`;
                const detailBlock = `\n\n<details><summary>View Visualization Code</summary>\n\n\`\`\`python\n${m.code}\n\`\`\`\n</details>\n\n`;
                resultMarkdown = resultMarkdown.replace(m.full, mdImage + detailBlock);
            }
        } catch (err) {
            console.error('[Python Execution Failed]', err.message);
            // Show a concise error message instead of re-displaying the broken code block
            const isSyntax = /SyntaxError|unterminated|invalid syntax/i.test(err.message);
            const errType = isSyntax ? 'Syntax error in generated code' : 'Runtime error';
            const shortMsg = err.message.split('\n').slice(0, 3).join(' | ').substring(0, 200);
            resultMarkdown = resultMarkdown.replace(
                m.full,
                `\n> *⚠️ Diagram generation failed (${errType}): ${shortMsg}*\n\n` +
                `<details><summary>View Code</summary>\n\n\`\`\`python\n${m.code}\n\`\`\`\n</details>\n`
            );
        }
        // cleanup script
        if (fs.existsSync(scriptFile)) fs.unlinkSync(scriptFile);
    }
    return resultMarkdown;
}

module.exports = { processEmbeddedPython };
