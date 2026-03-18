#!/usr/bin/env node
/**
 * WS-Bridge (current mode: direct skill runner)
 *
 * 前端 (HTTP) -> 本地 bridge (port 9000) -> 直接执行 skill 脚本
 *
 * 说明：
 * - 按 MVP 要求，用户原始 prompt 不做改写，直接透传给生图脚本。
 * - 脚本内部调用 OpenRouter 的 google/gemini-3.1-flash-image-preview。
 */

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const HTTP_PORT = 9000;

function resolveHomePath(p) {
    if (!p || typeof p !== 'string') return p;
    if (p === '~') return os.homedir();
    if (p.startsWith('~/')) return path.join(os.homedir(), p.slice(2));
    return p;
}

const SKILL_SCRIPT = resolveHomePath(
    process.env.TUTOR_SKILL_SCRIPT || '~/.agents/skills/image-animation-generation/scripts/gen_image.py'
);

// MIME types for static files
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// CORS headers
function setCORSHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// 静态文件服务
function serveStatic(res, filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Not found');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

/**
 * 直接运行技能脚本（原始 prompt 透传，不做 refine）。
 */
async function callTutorSkillRaw(prompt) {
    return new Promise((resolve, reject) => {
        const timeoutMs = 90000;
        const maxOutputBytes = 12 * 1024 * 1024; // 12MB，兼容 data URL 图片返回

        const child = spawn('python3', [SKILL_SCRIPT, prompt], {
            env: process.env,
            stdio: ['ignore', 'pipe', 'pipe']
        });

        let stdout = '';
        let stderr = '';
        let outputTooLarge = false;
        let timedOut = false;

        const timer = setTimeout(() => {
            timedOut = true;
            child.kill('SIGKILL');
        }, timeoutMs);

        child.stdout.on('data', (chunk) => {
            stdout += chunk.toString('utf8');
            if (Buffer.byteLength(stdout, 'utf8') > maxOutputBytes) {
                outputTooLarge = true;
                child.kill('SIGKILL');
            }
        });

        child.stderr.on('data', (chunk) => {
            stderr += chunk.toString('utf8');
        });

        child.on('error', (err) => {
            clearTimeout(timer);
            reject(new Error(`Failed to start skill script: ${err.message}`));
        });

        child.on('close', (code) => {
            clearTimeout(timer);

            if (timedOut) {
                reject(new Error('Request timeout (90s)'));
                return;
            }

            if (outputTooLarge) {
                reject(new Error('Skill output too large (>12MB)'));
                return;
            }

            if (code !== 0) {
                const errMsg = (stderr || `Skill exited with code ${code}`).trim();
                reject(new Error(errMsg));
                return;
            }

            const result = stdout.trim();
            resolve(result || '处理完成（无文本输出）');
        });
    });
}

// HTTP 服务器
const server = http.createServer(async (req, res) => {
    setCORSHeaders(res);

    // 处理 OPTIONS 预检请求
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    console.log(`[HTTP] ${req.method} ${pathname}`);

    // API 路由: /api/tutor
    if (pathname === '/api/tutor' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                const data = JSON.parse(body || '{}');
                const prompt = data.prompt;

                if (typeof prompt !== 'string' || prompt.trim() === '') {
                    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ error: 'Missing prompt' }));
                    return;
                }

                console.log('[API] Raw prompt passthrough to skill:', prompt);
                const result = await callTutorSkillRaw(prompt);

                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    response: result,
                    mode: 'direct-skill-script',
                    promptPassthrough: true
                }));
            } catch (err) {
                console.error('[API] Error:', err.message);
                res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
        return;
    }

    // 健康检查
    if (pathname === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
            status: 'ok',
            mode: 'direct-skill-script',
            skillScript: SKILL_SCRIPT
        }));
        return;
    }

    // 静态文件服务
    const staticDir = path.join(__dirname, '.');
    const filePath = path.join(staticDir, pathname === '/' ? 'index.html' : pathname);

    // 安全检查
    if (!filePath.startsWith(staticDir)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Forbidden');
        return;
    }

    serveStatic(res, filePath);
});

server.listen(HTTP_PORT, () => {
    console.log('='.repeat(60));
    console.log('Tutor Bridge (Direct Skill Script Mode)');
    console.log('='.repeat(60));
    console.log(`HTTP Server : http://localhost:${HTTP_PORT}`);
    console.log(`Skill Script: ${SKILL_SCRIPT}`);
    console.log('');
    console.log('Endpoints:');
    console.log(`  - http://localhost:${HTTP_PORT}/          (Web UI)`);
    console.log(`  - http://localhost:${HTTP_PORT}/api/tutor (API)`);
    console.log(`  - http://localhost:${HTTP_PORT}/health    (Health check)`);
    console.log('='.repeat(60));
});

// 优雅退出
process.on('SIGINT', () => {
    console.log('\n[Server] Shutting down...');
    server.close(() => process.exit(0));
});
