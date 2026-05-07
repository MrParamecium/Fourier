#!/usr/bin/env python3
"""
用 OpenRouter GPT-5.4 视觉识别每页书页图片，
识别该页属于哪个小节（section header），生成 section-page-map.json
"""
import os, json, base64, glob, re, time, sys, ssl
import urllib.request, urllib.error

# 跳过 SSL 证书验证（macOS 常见问题）
ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
API_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL   = "openai/gpt-5.4"

PAGES_DIR  = "/Users/chenghaoxiang/.openclaw/workspace/tutor-materials/background-pages-split"
OUTPUT     = "/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/section-page-map.json"
CACHE_FILE = "/Users/chenghaoxiang/.openclaw/workspace/tutor-materials/gpt54_page_cache.json"

# 加载已有缓存（断点续跑）
if os.path.exists(CACHE_FILE):
    cache = json.load(open(CACHE_FILE))
else:
    cache = {}

def encode_image(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

def ask_gpt54(page_name, img_path):
    b64 = encode_image(img_path)
    ext = os.path.splitext(img_path)[1].lower().replace('.', '')
    if ext == 'jpg': ext = 'jpeg'

    prompt = (
        "Look at this textbook page image. "
        "Your task: identify ALL section/subsection headings that START on this page. "
        "Section headings look like: 'B.1', 'B.1-1', 'B.5-3', '1.2', '1.2-1', '1.3-2', etc. "
        "They appear as bold headers at the top or partway through the page. "
        "Return ONLY a JSON array of strings, e.g.: [\"B.5-3\"] or [\"1.2\", \"1.2-1\"] or [] if none. "
        "Do not include section numbers that appear only in body text or formulas — only headers/titles. "
        "Return raw JSON array only, no explanation."
    )

    payload = json.dumps({
        "model": MODEL,
        "max_tokens": 200,
        "temperature": 0,
        "messages": [{
            "role": "user",
            "content": [
                {"type": "text", "text": prompt},
                {"type": "image_url", "image_url": {
                    "url": f"data:image/{ext};base64,{b64}"
                }}
            ]
        }]
    }).encode("utf-8")

    req = urllib.request.Request(
        API_URL,
        data=payload,
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://tutor.local",
            "X-Title": "TutorAgent PageScan"
        }
    )

    try:
        with urllib.request.urlopen(req, timeout=30, context=ssl_ctx) as resp:
            data = json.loads(resp.read())
            text = data["choices"][0]["message"]["content"].strip()
            # 解析 JSON 数组
            m = re.search(r'\[.*?\]', text, re.DOTALL)
            if m:
                return json.loads(m.group())
            return []
    except Exception as e:
        print(f"  ERROR {page_name}: {e}")
        return None

# 找所有书页图片，排序
imgs = sorted(glob.glob(os.path.join(PAGES_DIR, "book-*.png")))
if not imgs:
    imgs = sorted(glob.glob(os.path.join(PAGES_DIR, "book-*.jpg")))

print(f"找到 {len(imgs)} 张书页图片")
print(f"缓存已有 {len(cache)} 页结果")

for img_path in imgs:
    page = os.path.basename(img_path).replace(".png","").replace(".jpg","")
    page_num = int(page.replace("book-",""))

    # 跳过 book-000（目录）和 book-096+（习题）
    if page_num == 0 or page_num >= 96:
        print(f"  跳过 {page}（目录/习题页）")
        continue

    if page in cache:
        print(f"  ✓ {page}: {cache[page]} (cached)")
        continue

    print(f"  → {page} ... ", end="", flush=True)
    result = ask_gpt54(page, img_path)

    if result is None:
        print("失败，跳过")
        time.sleep(2)
        continue

    cache[page] = result
    print(result)

    # 每页都保存缓存
    with open(CACHE_FILE, "w") as f:
        json.dump(cache, f, ensure_ascii=False, indent=2)

    time.sleep(0.3)  # 避免 rate limit

print("\n识别完成！开始生成 section-page-map.json ...")

# 从缓存构建映射
# 逻辑：某页识别到的所有 sections，该页就属于那些 section
# 另外：某页没有识别到新 section，继承上一页的 section（填充空白页）

page_order = sorted(
    [p for p in cache.keys() if int(p.replace("book-","")) < 96 and int(p.replace("book-","")) > 0],
    key=lambda p: int(p.replace("book-",""))
)

# 建立每页 -> sections 的完整映射（包含继承）
page_to_sections = {}
active = []
for page in page_order:
    found = cache.get(page, [])
    if found:
        active = found
    page_to_sections[page] = list(active)

# 反转：section -> pages
section_map = {}
for page, sections in page_to_sections.items():
    for sid in sections:
        section_map.setdefault(sid, []).append(page)

# 去重排序
for sid in section_map:
    section_map[sid] = sorted(set(section_map[sid]), key=lambda p: int(p.replace("book-","")))

# 对于父节（如 B.5），包含所有子节的页
# 已经通过继承逻辑处理了

sorted_map = dict(sorted(section_map.items()))
with open(OUTPUT, "w", encoding="utf-8") as f:
    json.dump(sorted_map, f, ensure_ascii=False, indent=2)

print(f"✅ 生成完成！共 {len(sorted_map)} 个小节")
for k, v in sorted_map.items():
    print(f"  {k}: {v}")
