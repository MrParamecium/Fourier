// Tutor Agent Frontend
// 连接 ws-bridge 代理与 OpenClaw 后端通信

const API_BASE = window.location.hostname === 'localhost' 
    ? 'http://localhost:9000' 
    : ''; // 生产环境使用相对路径

const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// 回车发送
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;
    
    // 添加用户消息
    addMessage('user', text);
    userInput.value = '';
    
    // 显示加载中
    const loadingId = addLoadingMessage();
    
    // 调用后端
    callTutorAgent(text)
        .then(response => {
            removeMessage(loadingId);
            addMessage('assistant', response);
        })
        .catch(error => {
            removeMessage(loadingId);
            addMessage('assistant', '抱歉，出错了：' + error.message);
            showError(error.message);
        });
}

async function callTutorAgent(prompt) {
    const response = await fetch(`${API_BASE}/api/tutor`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
    });
    
    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || `HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return data.response || data.message || JSON.stringify(data);
}

function addMessage(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = role === 'user' ? '👤' : '🤖';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'content';
    
    // 支持 Markdown 图片
    if (content.includes('![') && content.includes('](')) {
        contentDiv.innerHTML = markdownToHtml(content);
    } else {
        contentDiv.textContent = content;
    }
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    chatContainer.appendChild(messageDiv);
    
    scrollToBottom();
    return messageDiv;
}

function addLoadingMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant';
    messageDiv.id = 'loading-' + Date.now();
    
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = '🤖';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'content';
    contentDiv.innerHTML = '<div class="loading">正在生成图解...</div>';
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    chatContainer.appendChild(messageDiv);
    
    scrollToBottom();
    return messageDiv.id;
}

function removeMessage(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showError(message) {
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function markdownToHtml(markdown) {
    // 简单的 Markdown 转 HTML，主要处理图片
    return markdown
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:8px;">')
        .replace(/\n/g, '<br>');
}

// 快捷提示词
function bindPromptChips() {
    const chips = document.querySelectorAll('.prompt-chip');
    chips.forEach((chip) => {
        chip.addEventListener('click', () => {
            const prompt = chip.getAttribute('data-prompt') || '';
            userInput.value = prompt;
            userInput.focus();
        });
    });
}

// 页面加载完成
window.addEventListener('load', () => {
    bindPromptChips();
    console.log('Tutor Agent UI loaded');
    console.log('API endpoint:', API_BASE);
});
