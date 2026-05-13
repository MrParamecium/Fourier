FROM nikolaik/python-nodejs:python3.10-nodejs20

# 设置工作目录
WORKDIR /app

# 拷贝核心服务（注意：根据目录层级调整）
COPY package*.json ./
RUN npm install --production

# 拷贝必要的 Python 依赖（如果使用到 pip 包如 requests / matplotlib）
# 如果没有 requirements.txt，确保默认环境充足或通过 RUN pip install 添加
RUN pip install requests bs4

# 拷贝全量代码（会被 .dockerignore 或 .gitignore 规则保护）
COPY . .

# 暴露 OpenClaw 后端使用的端口 (默认 9000)
EXPOSE 9000

# 建立预期的持久化文件夹占位符（Render Persistent Disk可挂载到这里）
RUN mkdir -p tutor-materials/lesson-cache tutor-openclaw-ui/generated users

# 启动服务器（Render 会执行这个命令）
CMD ["node", "tutor-openclaw-ui/ws-bridge.js"]