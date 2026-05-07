#!/usr/bin/env python3
"""
OCR Background 章节 - v2
用 gemini-3.1-pro-preview 重跑全部47页，强化章节标题识别
"""

import os
import base64
import json
import time
import requests
from pathlib import Path

API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
MODEL = "google/gemini-3.1-pro-preview"
BASE_URL = "https://openrouter.ai/api/v1/chat/completions"

INPUT_DIR = Path(__file__).parent / "background-pages"
OUTPUT_DIR = Path(__file__).parent / "background-ocr"
OUTPUT_DIR.mkdir(exist_ok=True)

PROMPT = """请将这页教材的所有内容完整提取为文本。严格要求：

1. **章节标题必须单独成行**，严格保留原始编号格式：
   - 大节标题：如 "B.1 Complex Numbers"、"B.6 Vectors and Matrices"
   - 小节标题：如 "B.1-1 A Historical Note"、"B.6-2 Matrix Operations"、"B.7-3 Some Useful Constants"
   - 例题编号：如 "Example B.3"、"Computer Example CB.5"
   - 不要在标题前后加 ** 或 ### 等 markdown 符号

2. 保留所有文字、公式、方程（公式用 LaTeX 格式）

3. 不要省略任何内容，包括脚注、图注、表格

4. 保持原文段落结构

直接输出文本内容，不要加任何前言或说明。"""


def ocr_page(img_path: Path) -> str:
    with open(img_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()

    payload = {
        "model": MODEL,
        "messages": [{
            "role": "user",
            "content": [
                {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{b64}"}},
                {"type": "text", "text": PROMPT}
            ]
        }],
        "max_tokens": 4096
    }

    resp = requests.post(BASE_URL, json=payload, headers={
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }, timeout=90)
    resp.raise_for_status()
    return resp.json()["choices"][0]["message"]["content"]


def main():
    pages = sorted(INPUT_DIR.glob("*.png"))
    print(f"共找到 {len(pages)} 页图片，全部重跑（覆盖旧文件）")

    all_results = {}
    total_chars = 0
    errors = []

    for i, img_path in enumerate(pages):
        out_path = OUTPUT_DIR / f"{img_path.stem}.txt"
        print(f"[{i+1}/{len(pages)}] OCR: {img_path.name} ...", end=" ", flush=True)
        t0 = time.time()

        try:
            text = ocr_page(img_path)
            out_path.write_text(text, encoding="utf-8")
            elapsed = time.time() - t0
            chars = len(text)
            total_chars += chars
            all_results[img_path.stem] = chars
            print(f"✓ {chars} 字符, {elapsed:.1f}s")
        except Exception as e:
            print(f"✗ 错误: {e}")
            errors.append(img_path.name)
            time.sleep(3)
            continue

        # 避免 rate limit，每页间隔
        if i < len(pages) - 1:
            time.sleep(1)

    print(f"\n=== 完成 ===")
    print(f"成功: {len(all_results)} 页 / 总字符: {total_chars:,} / 平均: {total_chars // max(len(all_results), 1):,}/页")
    if errors:
        print(f"失败页面: {errors}")

    # 更新索引
    index_path = OUTPUT_DIR / "_index.json"
    index_path.write_text(json.dumps(all_results, indent=2, ensure_ascii=False))
    print(f"索引已更新: {index_path}")


if __name__ == "__main__":
    if not API_KEY:
        print("错误：请设置 OPENROUTER_API_KEY 环境变量")
        exit(1)
    main()
