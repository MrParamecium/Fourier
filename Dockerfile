FROM nikolaik/python-nodejs:python3.12-nodejs20

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

RUN pip install --no-cache-dir requests beautifulsoup4 matplotlib numpy pillow pymupdf

COPY . .

ENV PORT=9000
EXPOSE 9000

CMD ["npm", "start"]
