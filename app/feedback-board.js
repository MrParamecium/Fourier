// Feedback board subsystem — extracted from app.js in Phase 3 (Workstream B, seam #1).
// Loaded as a classic <script> BEFORE app.js. Other classic scripts (app.js)
// reach in via the shared script-global lexical env. No bundler, no IIFE.
// Pattern matches mistake-notebook.js / preference-profile.js (Phase 2).
//
// Scope: the "/feedback" suggestion board — an API-backed thread+reply wall
// (GET/POST /api/feedback, POST /api/feedback/:id/replies). Owns the per-thread
// reply-target state, the multi-tone thread/reply render, and the submit/reply
// network paths.
//
// External globals used at call time:
//   - escapeHtml                                         (app.js)
//   - API_BASE                                           (app.js)
//   - currentUser                                        (clerk-auth.js)
//   - feedbackList, feedbackStatus, feedbackNameInput,
//     feedbackTitleInput, feedbackBodyInput, feedbackSubmitBtn   (app.js DOM consts)
//
// Public surface (callers outside this module):
//   - loadFeedbackBoard   (app.js showFeedbackView + #feedbackRefreshBtn handler)
//   - submitFeedbackItem  (app.js #feedbackSubmitBtn handler)

const feedbackReplyTargets = new Map();

function setFeedbackSubmitButtonLabel(label) {
  if (!feedbackSubmitBtn) return;
  feedbackSubmitBtn.innerHTML = `
    <span>${escapeHtml(label)}</span>
    <i class="ph-bold ph-paper-plane-tilt" aria-hidden="true"></i>
  `;
}

function feedbackAuthorName() {
  const typed = (feedbackNameInput?.value || '').trim();
  if (typed) return typed;
  if (currentUser && currentUser.name) return currentUser.name;
  return 'Anonymous';
}

function formatFeedbackTime(value) {
  const date = new Date(value || Date.now());
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function setFeedbackStatus(message, kind = 'idle') {
  if (!feedbackStatus) return;
  feedbackStatus.textContent = message || '';
  feedbackStatus.dataset.kind = kind;
}

function feedbackReplyTargetForItem(item) {
  return {
    type: 'thread',
    id: item.id || '',
    author: item.author || 'Anonymous',
    body: item.body || item.title || ''
  };
}

function feedbackReplyTargetForReply(reply) {
  return {
    type: 'reply',
    id: reply.id || '',
    author: reply.author || 'Anonymous',
    body: reply.body || ''
  };
}

function feedbackTargetSnippet(text = '') {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  return clean.length > 54 ? `${clean.slice(0, 54)}...` : clean;
}

function setFeedbackReplyTarget(thread, target) {
  if (!thread || !target) return;
  const id = thread.dataset.feedbackId;
  if (!id) return;
  feedbackReplyTargets.set(id, target);
  thread.querySelectorAll('.feedback-click-reply.is-target').forEach(node => node.classList.remove('is-target'));
  const targetNode = thread.querySelector(`[data-feedback-reply-anchor="${CSS.escape(target.id || 'thread')}"]`);
  if (targetNode) targetNode.classList.add('is-target');
  const chip = thread.querySelector('.feedback-reply-target');
  const chipName = thread.querySelector('.feedback-reply-target-name');
  const chipText = thread.querySelector('.feedback-reply-target-text');
  if (chip) chip.classList.remove('hidden');
  if (chipName) chipName.textContent = `Replying to ${target.author || 'Anonymous'}`;
  if (chipText) chipText.textContent = feedbackTargetSnippet(target.body || '');
  const input = thread.querySelector('.feedback-reply-input');
  if (input) {
    input.placeholder = `Reply to ${target.author || 'this note'}...`;
    input.focus();
  }
}

function clearFeedbackReplyTarget(thread) {
  if (!thread) return;
  const id = thread.dataset.feedbackId;
  if (id) feedbackReplyTargets.delete(id);
  thread.querySelectorAll('.feedback-click-reply.is-target').forEach(node => node.classList.remove('is-target'));
  const chip = thread.querySelector('.feedback-reply-target');
  if (chip) chip.classList.add('hidden');
  const input = thread.querySelector('.feedback-reply-input');
  if (input) input.placeholder = 'Discuss this suggestion...';
}

function renderFeedbackBoard(items = []) {
  if (!feedbackList) return;
  if (!items.length) {
    feedbackList.innerHTML = '<div class="feedback-empty">No suggestions yet. Be the first to pin one here.</div>';
    return;
  }
  feedbackList.innerHTML = items.map(item => {
    const replies = Array.isArray(item.replies) ? item.replies : [];
    const authorLaneMap = new Map([[String(item.author || 'Anonymous').trim().toLowerCase(), 'left']]);
    const authorToneMap = new Map();
    let nextReplyLane = 'right';
    let nextAuthorTone = 0;
    const toneForAuthor = (author) => {
      const key = String(author || 'Anonymous').trim().toLowerCase();
      if (!authorToneMap.has(key)) {
        authorToneMap.set(key, nextAuthorTone % 6);
        nextAuthorTone += 1;
      }
      return authorToneMap.get(key);
    };
    const laneForAuthor = (author) => {
      const key = String(author || 'Anonymous').trim().toLowerCase();
      if (!authorLaneMap.has(key)) {
        authorLaneMap.set(key, nextReplyLane);
        nextReplyLane = nextReplyLane === 'right' ? 'left' : 'right';
      }
      return authorLaneMap.get(key) || 'left';
    };
    const threadTone = toneForAuthor(item.author);
    return `
      <article class="feedback-thread tone-${threadTone}" data-feedback-id="${escapeHtml(item.id)}">
        <div class="feedback-thread-pin" aria-hidden="true"></div>
        <div class="feedback-thread-head">
          <div class="feedback-thread-click-target feedback-click-reply" data-feedback-reply-anchor="thread" role="button" tabindex="0" aria-label="Reply to ${escapeHtml(item.author || 'Anonymous')}">
            <h3>${escapeHtml(item.title || 'Untitled suggestion')}</h3>
            <div class="feedback-thread-meta">${escapeHtml(item.author || 'Anonymous')} · ${escapeHtml(formatFeedbackTime(item.createdAt))}</div>
          </div>
          <span class="feedback-reply-count">${replies.length} replies</span>
        </div>
        <p class="feedback-thread-body feedback-click-reply" data-feedback-reply-anchor="thread-body" role="button" tabindex="0" aria-label="Reply to this suggestion">${escapeHtml(item.body || '').replace(/\n/g, '<br>')}</p>
        <div class="feedback-replies">
          ${replies.map((reply, idx) => {
            const align = laneForAuthor(reply.author);
            const tone = toneForAuthor(reply.author);
            const replyToAuthor = reply.replyToAuthor || item.author || '';
            return `
            <div class="feedback-reply feedback-click-reply is-${align} tone-${tone}" data-feedback-reply-anchor="${escapeHtml(reply.id || '')}" role="button" tabindex="0" aria-label="Reply to ${escapeHtml(reply.author || 'Anonymous')}">
              <div class="feedback-reply-meta">${escapeHtml(reply.author || 'Anonymous')} · ${escapeHtml(formatFeedbackTime(reply.createdAt))}</div>
              ${reply.replyTo ? `<div class="feedback-reply-context">to ${escapeHtml(replyToAuthor || 'this note')}${reply.replyToBody ? ` · ${escapeHtml(feedbackTargetSnippet(reply.replyToBody))}` : ''}</div>` : ''}
              <div class="feedback-reply-body">${escapeHtml(reply.body || '').replace(/\n/g, '<br>')}</div>
            </div>
          `;
          }).join('')}
        </div>
        <div class="feedback-reply-compose">
          <div class="feedback-reply-target hidden">
            <span class="feedback-reply-target-name"></span>
            <span class="feedback-reply-target-text"></span>
            <button class="feedback-reply-target-clear" type="button" aria-label="Clear reply target">×</button>
          </div>
          <input class="feedback-reply-name" type="text" maxlength="60" placeholder="Name (optional)">
          <textarea class="feedback-reply-input" maxlength="800" placeholder="Discuss this suggestion..."></textarea>
          <button class="feedback-reply-btn" type="button">Reply</button>
        </div>
      </article>
    `;
  }).join('');

  feedbackList.querySelectorAll('.feedback-thread').forEach(thread => {
    const id = thread.dataset.feedbackId;
    const item = items.find(entry => entry.id === id);
    if (!item) return;
    const threadTarget = feedbackReplyTargetForItem(item);
    const bodyTarget = { ...threadTarget, id: 'thread-body' };
    thread.querySelector('[data-feedback-reply-anchor="thread"]')?.addEventListener('click', () => setFeedbackReplyTarget(thread, threadTarget));
    thread.querySelector('[data-feedback-reply-anchor="thread-body"]')?.addEventListener('click', () => setFeedbackReplyTarget(thread, bodyTarget));
    thread.querySelectorAll('.feedback-reply[data-feedback-reply-anchor]').forEach(node => {
      const reply = (Array.isArray(item.replies) ? item.replies : []).find(entry => entry.id === node.dataset.feedbackReplyAnchor);
      if (!reply) return;
      node.addEventListener('click', () => setFeedbackReplyTarget(thread, feedbackReplyTargetForReply(reply)));
    });
    thread.querySelectorAll('.feedback-click-reply').forEach(node => {
      node.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          node.click();
        }
      });
    });
    thread.querySelector('.feedback-reply-target-clear')?.addEventListener('click', event => {
      event.stopPropagation();
      clearFeedbackReplyTarget(thread);
    });
    const savedTarget = feedbackReplyTargets.get(id);
    if (savedTarget) setFeedbackReplyTarget(thread, savedTarget);
  });

  feedbackList.querySelectorAll('.feedback-reply-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const thread = btn.closest('.feedback-thread');
      if (!thread) return;
      const id = thread.dataset.feedbackId;
      const nameEl = thread.querySelector('.feedback-reply-name');
      const bodyEl = thread.querySelector('.feedback-reply-input');
      const body = (bodyEl?.value || '').trim();
      if (!body) return;
      const target = feedbackReplyTargets.get(id) || {
        id: 'thread',
        author: thread.querySelector('.feedback-thread-meta')?.textContent?.split(' · ')[0] || '',
        body: thread.querySelector('.feedback-thread-body')?.textContent || ''
      };
      btn.disabled = true;
      btn.textContent = 'Posting...';
      try {
        const res = await fetch(`${API_BASE}/api/feedback/${encodeURIComponent(id)}/replies`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            author: (nameEl?.value || '').trim() || feedbackAuthorName(),
            body,
            replyTo: target.id || '',
            replyToAuthor: target.author || '',
            replyToBody: target.body || ''
          })
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `HTTP ${res.status}`);
        }
        if (bodyEl) bodyEl.value = '';
        clearFeedbackReplyTarget(thread);
        await loadFeedbackBoard();
      } catch (err) {
        alert(`Reply failed: ${err.message}`);
      } finally {
        btn.disabled = false;
        btn.textContent = 'Reply';
      }
    });
  });
}

async function loadFeedbackBoard() {
  if (!feedbackList) return;
  feedbackList.innerHTML = '<div class="feedback-empty">Loading suggestions...</div>';
  try {
    const res = await fetch(`${API_BASE}/api/feedback`);
    const data = res.ok ? await res.json() : { items: [] };
    renderFeedbackBoard(Array.isArray(data.items) ? data.items : []);
    setFeedbackStatus('', 'idle');
  } catch (err) {
    feedbackList.innerHTML = `<div class="feedback-empty">Could not load the board: ${escapeHtml(err.message)}</div>`;
  }
}

async function submitFeedbackItem() {
  const title = (feedbackTitleInput?.value || '').trim();
  const body = (feedbackBodyInput?.value || '').trim();
  if (!title || !body) {
    setFeedbackStatus('Please add a title and suggestion body.', 'error');
    return;
  }
  if (feedbackSubmitBtn) {
    feedbackSubmitBtn.disabled = true;
    setFeedbackSubmitButtonLabel('Posting...');
  }
  setFeedbackStatus('Pinning your suggestion...', 'busy');
  try {
    const res = await fetch(`${API_BASE}/api/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        author: feedbackAuthorName(),
        title,
        body
      })
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `HTTP ${res.status}`);
    }
    if (feedbackTitleInput) feedbackTitleInput.value = '';
    if (feedbackBodyInput) feedbackBodyInput.value = '';
    setFeedbackStatus('Posted. Harrison can review it later.', 'ok');
    await loadFeedbackBoard();
  } catch (err) {
    setFeedbackStatus(`Post failed: ${err.message}`, 'error');
  } finally {
    if (feedbackSubmitBtn) {
      feedbackSubmitBtn.disabled = false;
      setFeedbackSubmitButtonLabel('Post Suggestion');
    }
  }
}
