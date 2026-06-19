// Markdown engine: parseMdTable, markdownToHtml, decodeHtmlEntities, inlineFormat.
// Loaded as a classic <script> before app.js. External globals used at call time:
// escapeHtml (app.js), API_BASE (app.js), window.preprocessMath (optional).

function parseMdTable(block) {
  const rows = block
    .trim()
    .split('\n')
    .map(r => r.trim().replace(/^>\s?/, '').trim())
    .filter(r => r.startsWith('|'));
  if (rows.length < 2) return null;
  const isSep = r => /^\|[\s\-:|]+\|$/.test(r) && r.replace(/[|:\-\s]/g,'').length === 0;
  const headerRow = rows[0];
  const sepRow = rows[1];
  if (!isSep(sepRow)) return null;
  const bodyRows = rows.slice(2);

  // Format the cell using a modified inline format that ensures $...$ becomes \(...\) for MathJax.
  const formatCell = (text) => {
    let c = text.trim();
    if (window.preprocessMath) {
      c = window.preprocessMath(c);
    } else {
      c = c.replace(/(?<!\$)\$(?!\$)(.+?)(?<!\$)\$(?!\$)/g, '\\($1\\)');
    }
    return inlineFormat(c);
  };

  const parseCells = (r, tag) =>
    r.split('|').slice(1,-1).map(c => `<${tag}>${formatCell(c)}</${tag}>`).join('');

  let html = '<table class="md-table">';
  html += `<thead><tr>${parseCells(headerRow,'th')}</tr></thead>`;
  if (bodyRows.length) {
    html += '<tbody>' + bodyRows.map(r => `<tr>${parseCells(r,'td')}</tr>`).join('') + '</tbody>';
  }
  html += '</table>';
  return html;
}

function markdownToHtml(md) {
  if (!md) return '<p>暂无内容</p>';
  // Pre-process: convert markdown tables to HTML before line-by-line parsing
  let text = String(md);

  // Normalize legacy MathJax display blocks so standalone \[ ... \] delimiters become display math.
  // Keep this line-bound so LaTeX spacing such as \\[4pt] inside equations is not treated as a delimiter.
  text = text
    .replace(/(^|\n)\s*\\\[\s*([^\n]+?)\s*\\\]\s*(?=\n|$)/g, '$1$$\n$2\n$$')
    .replace(/(^|\n)\s*\\\[\s*(?=\n)/g, '$1$$\n')
    .replace(/(^|\n)\s*\\\]\s*(?=\n|$)/g, '$1$$');

  // Ensure a blank line after --- separators so the next element parses correctly
  text = text.replace(/\n(---+)\n([^\n])/g, '\n$1\n\n$2');

  // Normalize blockquoted markdown tables like:
  // > | Col A | Col B |
  // > | --- | --- |
  // > | x | y |
  text = text.replace(/((?:^|\n)(?:>\s*\|[^\n]*\|[ \t]*\n?){2,})/g, (match) => {
    const unquoted = match
      .split('\n')
      .map(line => line.replace(/^>\s?/, ''))
      .join('\n');
    const parsed = parseMdTable(unquoted);
    return parsed ? '\n' + parsed + '\n' : unquoted;
  });

  // First, convert any normal Markdown tables to HTML tables
  text = text.replace(/((?:^|\n)(\|[^\n]+\|[ \t]*\n){2,})/g, (match) => {
    const parsed = parseMdTable(match);
    return parsed ? '\n' + parsed + '\n' : match;
  });

  // Then, protect all HTML <table>...</table> blocks (both AI-generated and parseMdTable-generated) from escaping
  const htmlTablePlaceholders = [];
  text = text.replace(/<table[\s\S]*?<\/table>/gi, (match) => {
    const idx = htmlTablePlaceholders.length;
    htmlTablePlaceholders.push(match);
    return `\n\x00TABLE_${idx}\x00\n`;
  });

  // Protect KC blocks fully
  const kcPlaceholders = [];
  text = text.replace(/%%KC_BLOCK%%([\s\S]*?)%%KC_END%%/g, (match) => {
    const idx = kcPlaceholders.length;
    kcPlaceholders.push(match);
    return `\n\x00KC_BLOCK_${idx}\x00\n`;
  });

  // Pre-process: convert $...$ to \(...\) for MathJax
  if (window.preprocessMath) {
    text = window.preprocessMath(text);
  } else {
    // Fallback: simple regex to convert single $...$ to \(...\)
    text = text
      .replace(/(^|\n)\s*\$\s*\n([\s\S]*?)\n\s*\$\s*(?=\n|$)/g, (_m, lead, body) => `${lead}$$\n${String(body || '').trim()}\n$$`)
      .replace(/(?<!\$)\$(?!\$)(.+?)(?<!\$)\$(?!\$)/g, '\\($1\\)');
  }
  const lines = text.replace(/\r/g, '').split('\n');
  let html = '';
  let listTag = '';
  let inCode = false;
  let inMath = false;
  let codeBuf = [];
  let mathBuf = [];

  const flushList = () => {
    if (listTag) { html += `</${listTag}>`; listTag = ''; }
  };
  const ensureList = (tag) => {
    if (listTag === tag) return;
    flushList();
    html += `<${tag}>`;
    listTag = tag;
  };
  const flushCode = () => {
    if (inCode) {
      html += `<pre><code>${escapeHtml(codeBuf.join('\n'))}</code></pre>`;
      inCode = false; codeBuf = [];
    }
  };
  const flushMath = (closed = true) => {
    if (inMath) {
      if (closed) {
        // output as raw $$ block - MathJax will render it
        html += `<div class="math-block">$$\n${mathBuf.join('\n')}\n$$</div>`;
      } else if (mathBuf.length) {
        // Never properly closed (blank line or EOF). Real display math has no
        // paragraph breaks, so treat the buffer as ordinary markdown instead of
        // dumping a raw $$ block that MathJax can't render (prose-in-math bug).
        html += markdownToHtml(mathBuf.join('\n'));
      }
      inMath = false; mathBuf = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const t = line.trim();

    // ``` code block
    if (t.startsWith('```')) {
      flushList(); flushMath();
      if (inCode) flushCode(); else inCode = true;
      continue;
    }
    if (inCode) { codeBuf.push(raw); continue; }

    // $$ math block
    if (/^\$\$[\s\S]+\$\$$/.test(t) && t !== '$$') {
      flushList();
      html += `<div class="math-block">${t}</div>`;
      continue;
    }
    if (!inMath && t.startsWith('$$') && t !== '$$') {
      flushList();
      const rest = raw.replace(/^\s*\$\$\s*/, '');
      if (/\$\$\s*$/.test(rest)) {
        html += `<div class="math-block">$$
${rest.replace(/\s*\$\$\s*$/, '')}
$$</div>`;
      } else {
        inMath = true;
        if (rest.trim()) mathBuf.push(rest);
      }
      continue;
    }
    if (t === '$$') {
      flushList();
      if (inMath) flushMath(); else inMath = true;
      continue;
    }
    if (inMath) {
      if (!t) {
        // Blank line: real display math never spans a paragraph break, so an
        // unclosed $$ ends here instead of swallowing the rest of the document.
        flushMath(false);
        flushList();
        continue;
      }
      if (/\$\$\s*$/.test(t)) {
        const cleaned = raw.replace(/\s*\$\$\s*$/, '');
        if (cleaned.trim()) mathBuf.push(cleaned);
        flushMath();
      } else {
        mathBuf.push(raw);
      }
      continue;
    }

    if (!t) { flushList(); continue; }

    if (/^#{1,6}\s+/.test(t)) {
      flushList();
      const lv = Math.min((t.match(/^#+/) || ['#'])[0].length, 6);
      const txt = t.replace(/^#{1,6}\s+/, '');
      html += `<h${lv}>${inlineFormat(txt)}</h${lv}>`;
      continue;
    }

    if (/^\x00TABLE_\d+\x00$/.test(t) || /^\x00KC_BLOCK_\d+\x00$/.test(t)) {
      flushList();
      html += t;
      continue;
    }

    if (/^[-*+]\s+/.test(t)) {
      ensureList('ul');
      html += `<li>${inlineFormat(t.replace(/^[-*+]\s+/, ''))}</li>`;
      continue;
    }

    if (/^\d+[.)]\s+/.test(t)) {
      ensureList('ol');
      html += `<li>${inlineFormat(t.replace(/^\d+[.)]\s+/, ''))}</li>`;
      continue;
    }

    if (/^<\/?(details|summary)( [^>]*)?>/i.test(t)) {
      flushList();
      html += inlineFormat(t);
      continue;
    }

    flushList();
    html += `<p>${inlineFormat(t)}</p>`;
  }

  flushList(); flushCode(); flushMath(false);
  // Restore raw HTML table placeholders
  html = html.replace(/\x00TABLE_(\d+)\x00/g, (_, idx) => htmlTablePlaceholders[Number(idx)] || '');

  // Restore KC placeholders first
  html = html.replace(/\x00KC_BLOCK_(\d+)\x00/g, (_, idx) => kcPlaceholders[Number(idx)] || '');

  // Now process the KC tags (it's safe now because markdown parser didn't touch it)
  html = html.replace(/%%KC_BLOCK%%([\s\S]*?)%%KC_END%%/g, (_, rawHtml) => {
    // rawHtml hasn't been mangled into <p> tags, just unescape base HTML entities
    const txt = rawHtml
      .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"');
    return txt;
  });

  return html;
}

function decodeHtmlEntities(text) {
  let value = text == null ? '' : String(text);
  for (let i = 0; i < 3; i += 1) {
    const el = document.createElement('textarea');
    el.innerHTML = value;
    const decoded = el.value;
    if (decoded === value) break;
    value = decoded;
  }
  return value;
}

function inlineFormat(text) {
  const placeholders = [];
  let s = text.replace(/\x00TABLE_(\d+)\x00/g, (_, idx) => {
    placeholders.push({ idx, orig: `\x00TABLE_${idx}\x00` });
    return `__TABLE_PLACEHOLDER_${idx}__`;
  });
  s = s.replace(/<\/?(details|summary)( [^>]*)?>/gi, (match) => {
    placeholders.push({ idx: placeholders.length, orig: match });
    return `__SAFE_TAG_${placeholders.length - 1}__`;
  });
  s = s.replace(/\\\((.*?)\\\)/g, (match, mathContent) => {
    placeholders.push({ idx: placeholders.length, orig: match });
    return `__MATH_PLACEHOLDER_${placeholders.length - 1}__`;
  });
  s = escapeHtml(s);
  placeholders.forEach(({ idx, orig }) => {
    s = s.replace(`__TABLE_PLACEHOLDER_${idx}__`, orig);
    s = s.replace(`__SAFE_TAG_${idx}__`, orig);
  });
  s = s.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#0f172a; font-weight:800;">$1</strong>');
  s = s.replace(/\*(.*?)\*/g, '<em style="color:#64748b; font-style:italic;">$1</em>');
  s = s.replace(/`([^`]+)`/g, (match, codeContent) => {
    if (/\\|&#94;|&amp;|\{|=|cos\b|sin\b|tan\b|θ|π|\^|_/i.test(codeContent)) {
      return `\\(${codeContent}\\)`;
    }
    return `<code style="background:#f1f5f9; padding:2px 4px; border-radius:4px; font-family:'DM Mono', monospace; font-size:0.9em; color:#6366F1;">${codeContent}</code>`;
  });
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
    const rawSrc = String(src || '').trim();
    const finalSrc = /^https?:\/\//i.test(rawSrc) ? rawSrc : (rawSrc.startsWith('/') ? `${API_BASE}${rawSrc}` : rawSrc);
    return `<img src="${finalSrc}" alt="${alt}" class="lesson-img" loading="lazy">`;
  });
  placeholders.forEach(({ idx, orig }) => {
    s = s.replace(`__MATH_PLACEHOLDER_${idx}__`, orig);
  });
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  return s;
}
