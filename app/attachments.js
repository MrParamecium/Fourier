// Attachments pipeline — extracted from app.js in Phase 2 #15.
// Loaded as a classic <script> BEFORE app.js. Pattern matches mistake-notebook.js
// (Phase 2 #12) / preference-profile.js (Phase 2 #14): top-level function
// declarations + `const`/`let` bindings share the script-global lexical env.
//
// Owns:
//   - attachment classification (image / pdf / docx / file)
//   - per-input attachment list state (attachmentsMain/Followup/Learn)
//   - chip preview rendering, source-compare side panel
//   - DOCX text extraction (zip + word/document.xml parse, no deps)
//   - file pipeline: processFile -> readFileAsDataUrl -> render chips
//   - drag-drop / paste / file-input wiring helpers
//
// External globals used at call time:
//   - escapeHtml                       (app.js)
//   - readFileAsDataUrl                (mistake-notebook.js, Phase 2 #12 —
//                                       shared util, future cross-module move)
//   - userInput, answerCompareResizer  (app.js DOM consts)
//   - setSendState                     (app.js)
//
// Public surface (callers in app.js):
//   - attachmentsMain, attachmentsFollowup, attachmentsLearn (mutable arrays)
//   - getAttachmentType, getAttachmentIcon, getAttachmentMimeType,
//     getAttachmentLabel, isSupportedAttachment, attachmentUnsupportedMessage,
//     MAX_ATTACH_SIZE
//   - renderAttachPreview, renderAttachmentSourcePanel,
//     clearAttachmentSourcePanel, setAttachmentCompareOpen,
//     openAttachmentImageModal, closeAttachmentImageModal
//   - cloneAttachmentSourcesForStorage, getModelReadableAttachments,
//     mergeAttachmentSources, buildAttachmentOnlyPrompt
//   - processFile, setupAttachBtn, setupDragDrop, setupPaste
//   - activeMainAttachmentSources, activeMainAttachmentIndex,
//     attachmentCompareOpen (state read by the source panel)

// ── Attachment state ────────────────────────────────────────
// Each entry: { type: 'image'|'pdf'|'document', name, dataUrl, mimeType, size?, text? }
let attachmentsMain = [];
let attachmentsFollowup = [];
let attachmentsLearn = [];
const MAX_ATTACH_SIZE = 20 * 1024 * 1024; // 20MB
const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

const attachmentCompareToggle = document.getElementById('attachmentCompareToggle');
const attachmentSourcePanel = document.getElementById('attachmentSourcePanel');
const attachmentSourceTitle = document.getElementById('attachmentSourceTitle');
const attachmentSourceTabs = document.getElementById('attachmentSourceTabs');
const attachmentSourceBody = document.getElementById('attachmentSourceBody');
const attachmentSourceCloseBtn = document.getElementById('attachmentSourceCloseBtn');

function getAttachmentType(fileOrAttachment = {}) {
  const name = String(fileOrAttachment.name || '').toLowerCase();
  const rawType = String(fileOrAttachment.type || '').toLowerCase();
  const mime = String(fileOrAttachment.mimeType || (rawType.includes('/') ? rawType : '')).toLowerCase();
  const dataUrl = String(fileOrAttachment.dataUrl || '').toLowerCase();
  if (rawType === 'image' || rawType === 'pdf' || rawType === 'document' || rawType === 'word' || rawType === 'file') {
    if (rawType === 'file' && (dataUrl.startsWith('data:image/') || /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(name))) return 'image';
    if (rawType === 'file' && (dataUrl.startsWith('data:application/pdf') || name.endsWith('.pdf'))) return 'pdf';
    if (rawType === 'file' && (mime === DOCX_MIME || name.endsWith('.docx'))) return 'document';
    return rawType === 'word' ? 'document' : rawType;
  }
  if (dataUrl.startsWith('data:image/')) return 'image';
  if (dataUrl.startsWith('data:application/pdf')) return 'pdf';
  if (mime.startsWith('image/')) return 'image';
  if (/\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(name)) return 'image';
  if (mime === 'application/pdf' || name.endsWith('.pdf')) return 'pdf';
  if (mime === DOCX_MIME || mime.includes('wordprocessingml.document') || name.endsWith('.docx')) return 'document';
  return 'file';
}

function getAttachmentIcon(att = {}) {
  const name = String(att.name || '').toLowerCase();
  const mime = String(att.mimeType || '').toLowerCase();
  const kind = getAttachmentType(att);
  if (kind === 'image') return 'IMG';
  if (kind === 'pdf') return 'PDF';
  if (kind === 'document' || name.endsWith('.docx') || mime.includes('word')) return 'DOC';
  return 'FILE';
}

function getAttachmentMimeType(fileOrAttachment = {}) {
  const mimeType = fileOrAttachment.mimeType || '';
  if (mimeType) return mimeType;
  const rawType = String(fileOrAttachment.type || '').toLowerCase();
  if (rawType && rawType.includes('/')) return rawType;
  const dataUrlMatch = String(fileOrAttachment.dataUrl || '').match(/^data:([^;,]+)/i);
  if (dataUrlMatch) return dataUrlMatch[1];
  const kind = getAttachmentType(fileOrAttachment);
  if (kind === 'image') return 'image/png';
  if (kind === 'pdf') return 'application/pdf';
  if (kind === 'document') return DOCX_MIME;
  return 'application/octet-stream';
}

function isSupportedAttachment(fileOrAttachment = {}) {
  const kind = getAttachmentType(fileOrAttachment);
  return kind === 'image' || kind === 'pdf' || kind === 'document';
}

function attachmentUnsupportedMessage(fileOrAttachment = {}) {
  const name = String(fileOrAttachment.name || 'this file');
  if (/\.doc$/i.test(name)) {
    return '旧版 .doc 不能在浏览器里可靠预览。请上传 .docx、PDF 或图片。';
  }
  return '目前只支持图片、PDF 和 Word（.docx）。其他文件不会上传，也不会生成下载入口。';
}

function getAttachContext(inputEl) {
  if (inputEl === userInput) return { list: attachmentsMain, previewId: 'attachPreviewMain', dropTarget: document.getElementById('searchBox') };
  if (inputEl && inputEl.id === 'learnFollowupInput') return { list: attachmentsLearn, previewId: 'attachPreviewLearn', dropTarget: document.getElementById('learnFollowupBar') };
  return { list: attachmentsFollowup, previewId: 'attachPreviewFollowup', dropTarget: document.getElementById('followupBar') };
}

function renderAttachPreview(list, previewId) {
  const container = document.getElementById(previewId);
  if (!container) return;
  container.innerHTML = '';
  list.forEach((att, idx) => {
    const kind = getAttachmentType(att);
    const chip = document.createElement('div');
    chip.className = 'attach-chip';
    if (kind === 'image') {
      chip.innerHTML = `<img src="${att.dataUrl}" alt=""><span class="attach-chip-name">${att.name}</span><button class="attach-chip-remove" data-idx="${idx}">×</button>`;
    } else {
      chip.innerHTML = `<span class="attach-chip-filetype">${escapeHtml(getAttachmentIcon(att))}</span><span class="attach-chip-name">${escapeHtml(att.name || 'Attachment')}</span><button class="attach-chip-remove" data-idx="${idx}">×</button>`;
    }
    chip.querySelector('.attach-chip-remove').addEventListener('click', () => {
      list.splice(idx, 1);
      renderAttachPreview(list, previewId);
      setSendState();
    });
    container.appendChild(chip);
  });
}

let activeMainAttachmentSources = [];
let activeMainAttachmentIndex = 0;
let attachmentCompareOpen = true;

function getAttachmentLabel(att, index) {
  const kind = getAttachmentType(att);
  const fallback = kind === 'pdf'
    ? `PDF ${index + 1}`
    : (kind === 'image' ? `Image ${index + 1}` : (kind === 'document' ? `Word ${index + 1}` : `Attachment ${index + 1}`));
  return String(att?.name || fallback);
}

function renderAttachmentSourcePanel(attachments = activeMainAttachmentSources) {
  activeMainAttachmentSources = Array.isArray(attachments) ? attachments : [];
  if (activeMainAttachmentIndex >= activeMainAttachmentSources.length) activeMainAttachmentIndex = 0;
  const hasSources = activeMainAttachmentSources.length > 0;
  const shouldShow = hasSources && attachmentCompareOpen;

  if (attachmentCompareToggle) {
    attachmentCompareToggle.classList.toggle('hidden', !hasSources);
    attachmentCompareToggle.setAttribute('aria-pressed', shouldShow ? 'true' : 'false');
    attachmentCompareToggle.classList.toggle('active', shouldShow);
  }
  if (attachmentSourcePanel) attachmentSourcePanel.classList.toggle('hidden', !shouldShow);
  if (answerCompareResizer) answerCompareResizer.classList.toggle('hidden', !shouldShow);

  if (!hasSources) {
    if (attachmentSourceTitle) attachmentSourceTitle.textContent = 'Compare';
    if (attachmentSourceTabs) attachmentSourceTabs.innerHTML = '';
    if (attachmentSourceBody) attachmentSourceBody.innerHTML = '<div class="attachment-source-empty">No attachment to compare.</div>';
    return;
  }

  const current = activeMainAttachmentSources[activeMainAttachmentIndex] || activeMainAttachmentSources[0];
  const currentKind = getAttachmentType(current);
  if (attachmentSourceTitle) attachmentSourceTitle.textContent = getAttachmentLabel(current, activeMainAttachmentIndex);
  if (attachmentSourceTabs) {
    attachmentSourceTabs.innerHTML = activeMainAttachmentSources.map((att, index) => `
      <button class="attachment-source-tab ${index === activeMainAttachmentIndex ? 'active' : ''}" type="button" data-attachment-source-index="${index}">
        ${escapeHtml(getAttachmentIcon(att))} ${index + 1}
      </button>
    `).join('');
    attachmentSourceTabs.querySelectorAll('.attachment-source-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeMainAttachmentIndex = Number(btn.dataset.attachmentSourceIndex || 0);
        renderAttachmentSourcePanel();
      });
    });
  }

  if (!attachmentSourceBody) return;
  if (currentKind === 'image') {
    const label = getAttachmentLabel(current, activeMainAttachmentIndex);
    attachmentSourceBody.innerHTML = `
      <figure class="attachment-source-figure">
        <button class="attachment-source-image-btn" type="button" aria-label="Open ${escapeHtml(label)} larger">
          <img src="${escapeHtml(current.dataUrl)}" alt="${escapeHtml(label)}">
          <span class="attachment-source-zoom-hint">Click to enlarge</span>
        </button>
        <figcaption>${escapeHtml(label)}</figcaption>
      </figure>
    `;
    const imageBtn = attachmentSourceBody.querySelector('.attachment-source-image-btn');
    if (imageBtn) {
      imageBtn.addEventListener('click', () => {
        openAttachmentImageModal(current.dataUrl, label);
      });
    }
  } else if (currentKind === 'pdf') {
    attachmentSourceBody.innerHTML = `
      <div class="attachment-source-pdf">
        <object data="${escapeHtml(current.dataUrl)}" type="application/pdf">
          <iframe src="${escapeHtml(current.dataUrl)}" title="${escapeHtml(getAttachmentLabel(current, activeMainAttachmentIndex))}"></iframe>
        </object>
      </div>
    `;
  } else if (currentKind === 'document') {
    const label = getAttachmentLabel(current, activeMainAttachmentIndex);
    const text = String(current.text || '').trim();
    attachmentSourceBody.innerHTML = `
      <article class="attachment-source-word">
        <div class="attachment-source-word-head">
          <div class="attachment-source-file-icon">DOC</div>
          <div>
            <div class="attachment-source-file-name">${escapeHtml(label)}</div>
            <div class="attachment-source-file-meta">Word preview</div>
          </div>
        </div>
        <pre class="attachment-source-word-text">${escapeHtml(text || '这个 Word 文件没有提取到可预览文本。')}</pre>
      </article>
    `;
  } else {
    attachmentSourceBody.innerHTML = `
      <div class="attachment-source-empty">
        Unsupported attachment. Please upload an image, PDF, or Word (.docx).
      </div>
    `;
  }
}

function closeAttachmentImageModal() {
  const modal = document.getElementById('attachmentImageModal');
  if (modal) modal.remove();
}

function openAttachmentImageModal(src, title = 'Attached image') {
  if (!src) return;
  closeAttachmentImageModal();
  const modal = document.createElement('div');
  modal.id = 'attachmentImageModal';
  modal.className = 'attachment-image-modal';
  modal.innerHTML = `
    <div class="attachment-image-backdrop" data-attachment-image-close="true"></div>
    <div class="attachment-image-dialog" role="dialog" aria-modal="true" aria-label="Attached image preview">
      <div class="attachment-image-head">
        <div>
          <div class="attachment-image-kicker">Attached Source</div>
          <div class="attachment-image-title">${escapeHtml(title)}</div>
        </div>
        <button class="attachment-image-close" type="button" data-attachment-image-close="true" aria-label="Close attached image">✕</button>
      </div>
      <div class="attachment-image-stage">
        <img src="${escapeHtml(src)}" alt="${escapeHtml(title)}">
      </div>
    </div>
  `;
  modal.addEventListener('click', (event) => {
    if (event.target && event.target.dataset && event.target.dataset.attachmentImageClose) closeAttachmentImageModal();
  });
  document.body.appendChild(modal);
}

function setAttachmentCompareOpen(open) {
  attachmentCompareOpen = Boolean(open);
  renderAttachmentSourcePanel();
}

function clearAttachmentSourcePanel() {
  activeMainAttachmentSources = [];
  activeMainAttachmentIndex = 0;
  attachmentCompareOpen = true;
  renderAttachmentSourcePanel([]);
}

function cloneAttachmentSourcesForStorage(attachments = activeMainAttachmentSources) {
  return (Array.isArray(attachments) ? attachments : [])
    .filter(att => att && att.dataUrl)
    .map(att => {
      const type = getAttachmentType(att);
      return {
        type,
        name: att.name || '',
        dataUrl: att.dataUrl,
        mimeType: getAttachmentMimeType(att),
        size: att.size || 0,
        text: type === 'document' ? String(att.text || '').slice(0, 100000) : ''
      };
    });
}

function getModelReadableAttachments(attachments = []) {
  return cloneAttachmentSourcesForStorage(attachments)
    .filter(att => att.type === 'image' || att.type === 'pdf' || (att.type === 'document' && att.text))
    .map(att => {
      if (att.type === 'document') {
        return {
          type: 'document',
          name: att.name,
          mimeType: att.mimeType,
          size: att.size,
          text: att.text
        };
      }
      return att;
    });
}

function mergeAttachmentSources(...groups) {
  const merged = [];
  const seen = new Set();
  groups.flat().forEach((att) => {
    if (!att || !att.dataUrl) return;
    const key = `${att.name || ''}|${getAttachmentType(att)}|${att.dataUrl.slice(0, 96)}`;
    if (seen.has(key)) return;
    seen.add(key);
    merged.push(att);
  });
  return merged;
}

function buildAttachmentOnlyPrompt(attachments = [], lang = 'en') {
  const files = cloneAttachmentSourcesForStorage(attachments);
  const names = files.map(file => file.name || getAttachmentIcon(file)).filter(Boolean).join(', ') || 'the attached file';
  const readable = getModelReadableAttachments(files).length > 0;
  if (lang === 'zh') {
    return readable
      ? `请根据我上传的附件讲解。附件：${names}`
      : `我上传了附件：${names}。请提醒我改传图片、PDF 或 Word（.docx）后再讲解。`;
  }
  return readable
    ? `Please explain the attached file(s): ${names}`
    : `I attached: ${names}. Please ask me to upload an image, PDF, or Word (.docx) before explaining it.`;
}

function readUInt16LE(bytes, offset) {
  return bytes[offset] | (bytes[offset + 1] << 8);
}

function readUInt32LE(bytes, offset) {
  return (bytes[offset] | (bytes[offset + 1] << 8) | (bytes[offset + 2] << 16) | (bytes[offset + 3] << 24)) >>> 0;
}

function dataUrlToBytes(dataUrl) {
  const base64 = String(dataUrl || '').split(',')[1] || '';
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function findZipCentralDirectory(bytes) {
  const minOffset = Math.max(0, bytes.length - 65558);
  for (let offset = bytes.length - 22; offset >= minOffset; offset -= 1) {
    if (readUInt32LE(bytes, offset) === 0x06054b50) {
      return {
        entries: readUInt16LE(bytes, offset + 10),
        size: readUInt32LE(bytes, offset + 12),
        offset: readUInt32LE(bytes, offset + 16)
      };
    }
  }
  throw new Error('DOCX central directory not found');
}

async function inflateZipEntry(compressedBytes, method) {
  if (method === 0) return compressedBytes;
  if (method !== 8) throw new Error(`Unsupported ZIP compression method ${method}`);
  if (typeof DecompressionStream !== 'function') {
    throw new Error('Browser does not support ZIP deflate preview');
  }
  const stream = new Blob([compressedBytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function extractZipEntry(bytes, targetName) {
  const decoder = new TextDecoder('utf-8');
  const central = findZipCentralDirectory(bytes);
  let offset = central.offset;
  const end = central.offset + central.size;
  for (let entryIndex = 0; entryIndex < central.entries && offset < end; entryIndex += 1) {
    if (readUInt32LE(bytes, offset) !== 0x02014b50) break;
    const method = readUInt16LE(bytes, offset + 10);
    const compressedSize = readUInt32LE(bytes, offset + 20);
    const fileNameLength = readUInt16LE(bytes, offset + 28);
    const extraLength = readUInt16LE(bytes, offset + 30);
    const commentLength = readUInt16LE(bytes, offset + 32);
    const localHeaderOffset = readUInt32LE(bytes, offset + 42);
    const fileName = decoder.decode(bytes.slice(offset + 46, offset + 46 + fileNameLength));
    if (fileName === targetName) {
      if (readUInt32LE(bytes, localHeaderOffset) !== 0x04034b50) {
        throw new Error('DOCX local file header not found');
      }
      const localNameLength = readUInt16LE(bytes, localHeaderOffset + 26);
      const localExtraLength = readUInt16LE(bytes, localHeaderOffset + 28);
      const dataStart = localHeaderOffset + 30 + localNameLength + localExtraLength;
      const compressedBytes = bytes.slice(dataStart, dataStart + compressedSize);
      return inflateZipEntry(compressedBytes, method);
    }
    offset += 46 + fileNameLength + extraLength + commentLength;
  }
  throw new Error(`${targetName} not found in DOCX`);
}

function decodeXmlEntities(text) {
  return String(text || '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

function extractWordTextFromDocumentXml(xml) {
  const normalized = String(xml || '')
    .replace(/<w:tab\s*\/>/g, '\t')
    .replace(/<w:br\s*\/>/g, '\n')
    .replace(/<\/w:p>/g, '\n')
    .replace(/<\/w:tr>/g, '\n')
    .replace(/<[^>]+>/g, '');
  return decodeXmlEntities(normalized)
    .split('\n')
    .map(line => line.replace(/[ \t]+/g, ' ').trim())
    .filter(Boolean)
    .join('\n')
    .slice(0, 100000);
}

async function extractDocxTextFromDataUrl(dataUrl) {
  const bytes = dataUrlToBytes(dataUrl);
  const documentXmlBytes = await extractZipEntry(bytes, 'word/document.xml');
  const xml = new TextDecoder('utf-8').decode(documentXmlBytes);
  return extractWordTextFromDocumentXml(xml);
}

async function processFile(file, list, previewId) {
  if (file.size > MAX_ATTACH_SIZE) {
    alert(`File too large (max 20MB): ${file.name}`);
    return;
  }
  if (!isSupportedAttachment(file)) {
    alert(attachmentUnsupportedMessage(file));
    return;
  }
  const type = getAttachmentType(file);
  const dataUrl = await readFileAsDataUrl(file);
  const attachment = {
    type,
    name: file.name,
    dataUrl,
    mimeType: getAttachmentMimeType(file),
    size: file.size || 0
  };
  if (type === 'document') {
    try {
      attachment.text = await extractDocxTextFromDataUrl(dataUrl);
      if (!attachment.text.trim()) {
        alert('这个 Word 文件没有提取到可预览文本。请上传包含正文的 .docx、PDF 或图片。');
        return;
      }
    } catch (err) {
      console.warn('[attachments] Failed to preview Word document:', err);
      alert('这个 Word 文件暂时无法预览。请上传 .docx、PDF 或图片。');
      return;
    }
  }
  list.push(attachment);
  renderAttachPreview(list, previewId);
  setSendState();
}

function setupAttachBtn(btnId, fileInputId, inputEl) {
  const btn = document.getElementById(btnId);
  const fileInput = document.getElementById(fileInputId);
  if (!btn || !fileInput) return;
  btn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', async () => {
    const { list, previewId } = getAttachContext(inputEl);
    for (const f of Array.from(fileInput.files)) await processFile(f, list, previewId);
    fileInput.value = '';
  });
}

function setupDragDrop(dropTargetEl, inputEl) {
  if (!dropTargetEl) return;
  dropTargetEl.addEventListener('dragover', e => {
    e.preventDefault();
    dropTargetEl.classList.add('drag-over');
  });
  dropTargetEl.addEventListener('dragleave', e => {
    if (!dropTargetEl.contains(e.relatedTarget)) dropTargetEl.classList.remove('drag-over');
  });
  dropTargetEl.addEventListener('drop', async e => {
    e.preventDefault();
    dropTargetEl.classList.remove('drag-over');
    const { list, previewId } = getAttachContext(inputEl);
    for (const f of Array.from(e.dataTransfer.files)) await processFile(f, list, previewId);
  });
}

function setupPaste(inputEl) {
  inputEl.addEventListener('paste', async e => {
    const { list, previewId } = getAttachContext(inputEl);
    for (const item of Array.from(e.clipboardData.items)) {
      if (item.type.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) await processFile(new File([file], `pasted-image.png`, { type: file.type }), list, previewId);
      }
    }
  });
}
