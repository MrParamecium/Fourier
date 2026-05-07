#!/usr/bin/env python3
"""
按小节切块，把 background-ocr/ 里的文本合并成结构化索引
输出: background-ocr/sections.json
"""

import json
from pathlib import Path

OCR_DIR = Path(__file__).parent / "background-ocr"

# 根据 head 扫描结果确定的小节页码映射
# page-XXX 对应书内页码见 head -1 输出
SECTION_MAP = {
    "B.1": {
        "title": "B.1 Complex Numbers",
        "pages": ["page-007", "page-008", "page-009", "page-010", "page-011", "page-012", "page-013"]
    },
    "B.2": {
        "title": "B.2 Sinusoids",
        "pages": ["page-014", "page-015", "page-016"]
    },
    "B.3": {
        "title": "B.3 Sketching Signals",
        "pages": ["page-017", "page-018"]
    },
    "B.4": {
        "title": "B.4 Cramer's Rule",
        "pages": ["page-019"]
    },
    "B.5": {
        "title": "B.5 Partial Fraction Expansion",
        "pages": ["page-020", "page-021", "page-022", "page-023"]
    },
    "B.6": {
        "title": "B.6 Vectors and Matrices",
        "pages": ["page-024", "page-025", "page-026", "page-027", "page-028", "page-029"]
    },
    "B.7": {
        "title": "B.7 Miscellaneous",
        "pages": ["page-030", "page-031", "page-032"]
    }
}

sections = {}

for sec_id, meta in SECTION_MAP.items():
    texts = []
    for page in meta["pages"]:
        txt_path = OCR_DIR / f"{page}.txt"
        if txt_path.exists():
            texts.append(txt_path.read_text(encoding="utf-8").strip())
        else:
            print(f"WARNING: {txt_path} not found")
    
    combined = "\n\n---\n\n".join(texts)
    sections[sec_id] = {
        "id": sec_id,
        "title": meta["title"],
        "pages": meta["pages"],
        "content": combined,
        "char_count": len(combined),
        "token_estimate": len(combined) // 4
    }
    print(f"{sec_id} ({meta['title']}): {len(combined):,} 字符 / ~{len(combined)//4:,} tokens ({len(meta['pages'])} 页)")

# 保存
out_path = OCR_DIR / "sections.json"
out_path.write_text(json.dumps(sections, ensure_ascii=False, indent=2))
print(f"\n✅ 索引已保存: {out_path}")
print(f"共 {len(sections)} 个小节")
total = sum(s['char_count'] for s in sections.values())
print(f"总字符: {total:,} / ~{total//4:,} tokens")
