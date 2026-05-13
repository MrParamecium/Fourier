#!/usr/bin/env python3
"""
OCR Background 章节 (书内页码 1-47)
用 OpenRouter Gemini 2.5 Pro 识别每页图片 -> 存为文本
"""

import os
import base64
import json
import time
import requests
from pathlib import Path

API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
MODEL = "google/gemini-2.5-pro"
BASE_URL = "https://openrouter.ai/api/v1/chat/completions"

INPUT_DIR = Path(__file__).parent / "background-pages"
OUTPUT_DIR = Path(__file__).parent / "background-ocr"
OUTPUT_DIR.mkdir(exist_ok=True)

PROMPT = """请将这页教材的所有内容完整提取为文本。要求：
1. 保留所有文字、公式、方程、数学符号（用 LaTeX 格式表示公式）
2. 保留标题、小节编号、例题编号
3. 保留图注（如果有）
4. 不要省略任何内容
5. 保持原文的段落结构
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
    }, timeout=60)
    resp.raise_for_status()
    return resp.json()["choices"][0]["message"]["content"]

def main():
    pages = sorted(INPUT_DIR.glob("page-*.png")) + sorted(INPUT_DIR.glob("page_*.png"))
    pages = sorted(INPUT_DIR.glob("*.png"))
    pages = sorted(pages)
    
    print(f"共找到 {len(pages)} 页图片")
    
    all_results = {}
    total_chars = 0
    
    for i, img_path in enumerate(pages):
        out_path = OUTPUT_DIR / f"{img_path.stem}.txt"
        
        if out_path.exists():
            print(f"[{i+1}/{len(pages)}] {img_path.name} 已存在，跳过")
            text = out_path.read_text()
            total_chars += len(text)
            all_results[img_path.stem] = len(text)
            continue
        
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
            time.sleep(2)
        
        # 避免 rate limit
        if i < len(pages) - 1:
            time.sleep(0.5)
    
    print(f"\n=== 完成 ===")
    print(f"总字符数: {total_chars:,}")
    print(f"平均每页: {total_chars // max(len(all_results), 1):,} 字符")
    print(f"输出目录: {OUTPUT_DIR}")
    
    # 保存索引
    index_path = OUTPUT_DIR / "_index.json"
    index_path.write_text(json.dumps(all_results, indent=2, ensure_ascii=False))
    print(f"索引已保存: {index_path}")

if __name__ == "__main__":
    if not API_KEY:
        print("请设置 OPENROUTER_API_KEY 环境变量")
        exit(1)
    main()
