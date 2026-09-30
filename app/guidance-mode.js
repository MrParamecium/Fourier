/*
 * Optional per-turn teaching-path guidance for the main and lesson Q&A flows.
 * Only the enabled flag is persisted. Options and selections live in memory.
 */
'use strict';

(function attachGuidanceMode(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory;
    return;
  }
  root.guidanceMode = factory({
    document: root.document,
    storage: (() => {
      try { return root.localStorage; } catch (_) { return null; }
    })(),
    request: (path, options) => apiFetch(path, options),
  });
}(typeof globalThis !== 'undefined' ? globalThis : this, function createGuidanceMode(deps = {}) {
  const doc = deps.document || null;
  const storage = deps.storage || null;
  const request = deps.request;
  const storageKey = 'aquarius-guidance-enabled-v1';
  const scopes = {
    main: { selected: null },
    learn: { selected: null },
  };
  let enabled = false;
  let state = 'closed';
  let activeRequest = null;

  try { enabled = storage && storage.getItem(storageKey) === '1'; } catch (_) {}
  state = enabled ? 'waiting' : 'closed';

  function copy(language = 'en') {
    const zh = language === 'zh';
    return {
      loadingTitle: zh ? '正在准备教学路径' : 'Preparing teaching paths', loadingBody: zh ? '正在检索教材，为你准备不同的讲解方式。' : 'Searching the textbook before offering distinct ways to explain this.', title: zh ? '你卡在哪里？' : 'Where are you stuck?', empty: zh ? '教材中没有找到直接匹配；以下路径只根据你的问题生成。' : 'No direct textbook match was found. These paths are based on your question only.', skip: zh ? '跳过，直接回答' : 'Skip and answer now', cancel: zh ? '取消' : 'Cancel', retry: zh ? '重试' : 'Retry', errorTitle: zh ? '教学引导加载失败' : 'Guidance failed', stage: zh ? '阶段' : 'Stage', request: zh ? '请求编号' : 'Request ID', clear: zh ? '清除当前教学路径' : 'Clear this teaching path', selected: zh ? '教学路径' : 'Teaching path', cancelled: zh ? '已取消，你的问题仍保留在输入框中。' : 'Cancelled. Your question is still in the input.', networkError: zh ? '无法连接 Tutor 服务，请确认本地服务正在运行后重试。' : 'Unable to connect to the Tutor service. Make sure the local service is running, then try again.'
    };
  }

  function setText(parent, tag, className, value) {
    const element = doc.createElement(tag);
    if (className) element.className = className;
    element.textContent = value;
    parent.appendChild(element);
    return element;
  }

  function scopeState(scope) {
    return scopes[scope] || scopes.main;
  }

  function syncUi() {
    if (!doc) return;
    doc.querySelectorAll('[data-guidance-toggle]').forEach((button) => {
      const scope = button.dataset.guidanceScope === 'learn' ? 'learn' : 'main';
      const selected = scopeState(scope).selected;
      button.classList.toggle('active', enabled);
      button.classList.toggle('guidance-on', enabled);
      button.classList.toggle('has-selection', Boolean(enabled && selected));
      button.setAttribute('aria-pressed', enabled ? 'true' : 'false');
      button.setAttribute('aria-label', enabled ? 'Guided: On' : 'Guided: Off');
      button.title = enabled
        ? 'Get hints and step-by-step prompts · Guidance: On'
        : 'Get hints and step-by-step prompts · Guidance: Off';
    });

    doc.querySelectorAll('.guidance-path-chip').forEach(node => node.remove());
    if (!enabled) return;
    doc.querySelectorAll('[data-guidance-toggle]').forEach((button) => {
      const scope = button.dataset.guidanceScope === 'learn' ? 'learn' : 'main';
      const selected = scopeState(scope).selected;
      if (!selected || !button.parentNode) return;
      const chip = doc.createElement('span');
      chip.className = 'guidance-path-chip';
      chip.dataset.guidanceScope = scope;
      chip.title = selected.title;
      setText(chip, 'span', 'guidance-path-chip-label', selected.title);
      const clearButton = doc.createElement('button');
      clearButton.type = 'button';
      clearButton.className = 'guidance-path-chip-clear';
      clearButton.setAttribute('aria-label', copy().clear);
      clearButton.textContent = '\u00d7';
      clearButton.addEventListener('click', (event) => {
        event.stopPropagation();
        clearSelection(scope);
      });
      chip.appendChild(clearButton);
      button.insertAdjacentElement('afterend', chip);
    });
  }

  function abortCurrent(reason = 'cancelled') {
    if (!activeRequest) return;
    const current = activeRequest;
    activeRequest = null;
    current.controller.abort();
    if (current.externalSignal && current.onExternalAbort) {
      current.externalSignal.removeEventListener('abort', current.onExternalAbort);
    }
    current.resolve({ status: 'cancelled', guidance: null, reason });
    state = enabled ? 'waiting' : 'closed';
  }

  function clearSelection(scope) {
    scopeState(scope).selected = null;
    if (!activeRequest) state = enabled ? 'waiting' : 'closed';
    syncUi();
  }

  function resetScope(scope) {
    if (activeRequest && activeRequest.scope === scope) abortCurrent('scope_reset');
    clearSelection(scope);
  }

  function setEnabled(nextEnabled) {
    enabled = Boolean(nextEnabled);
    try {
      if (storage) storage.setItem(storageKey, enabled ? '1' : '0');
    } catch (_) {}
    if (!enabled) {
      abortCurrent('disabled');
      scopes.main.selected = null;
      scopes.learn.selected = null;
      state = 'closed';
    } else {
      state = 'waiting';
    }
    syncUi();
  }

  function renderLoading(mount, language) {
    const words = copy(language);
    mount.replaceChildren();
    const panel = doc.createElement('section');
    panel.className = 'guidance-panel guidance-loading';
    panel.setAttribute('aria-live', 'polite');
    const heading = doc.createElement('div');
    heading.className = 'guidance-heading';
    const spinner = doc.createElement('span');
    spinner.className = 'guidance-spinner';
    spinner.setAttribute('aria-hidden', 'true');
    heading.appendChild(spinner);
    setText(heading, 'strong', '', words.loadingTitle);
    panel.appendChild(heading);
    setText(panel, 'p', 'guidance-copy', words.loadingBody);
    mount.appendChild(panel);
  }

  function renderCancelled(mount, language) {
    mount.replaceChildren();
    setText(mount, 'p', 'guidance-cancelled', copy(language).cancelled);
  }

  function addAction(actions, label, className, handler) {
    const button = doc.createElement('button');
    button.type = 'button';
    button.className = className;
    button.textContent = label;
    button.addEventListener('click', handler);
    actions.appendChild(button);
  }

  function settle(current, result) {
    if (activeRequest !== current) return;
    activeRequest = null;
    if (current.externalSignal && current.onExternalAbort) {
      current.externalSignal.removeEventListener('abort', current.onExternalAbort);
    }
    current.resolve(result);
  }

  function renderChoices(current, data) {
    if (activeRequest !== current) return;
    const words = copy(current.language);
    const mount = current.mount;
    mount.replaceChildren();
    const panel = doc.createElement('section');
    panel.className = 'guidance-panel guidance-choices';
    panel.setAttribute('aria-label', words.title);
    setText(panel, 'h3', 'guidance-title', words.title);
    if (data.status === 'empty') setText(panel, 'p', 'guidance-empty-note', words.empty);
    const list = doc.createElement('div');
    list.className = 'guidance-option-list';
    data.options.forEach((option) => {
      const button = doc.createElement('button');
      button.type = 'button';
      button.className = 'guidance-option';
      setText(button, 'strong', 'guidance-option-title', option.title);
      setText(button, 'span', 'guidance-option-description', option.description);
      const arrow = setText(button, 'span', 'guidance-option-arrow', '\u2192');
      arrow.setAttribute('aria-hidden', 'true');
      button.addEventListener('click', () => {
        const selected = { id: option.id, title: option.title, instruction: option.instruction };
        scopeState(current.scope).selected = selected;
        state = 'answering';
        syncUi();
        settle(current, { status: 'selected', guidance: selected, requestId: data.request_id || '' });
      });
      list.appendChild(button);
    });
    list.addEventListener('keydown', (event) => {
      const buttons = [...list.querySelectorAll('.guidance-option')];
      const index = buttons.indexOf(doc.activeElement);
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const next = event.key === 'ArrowDown' ? Math.min(buttons.length - 1, index + 1) : Math.max(0, index - 1);
        buttons[next]?.focus();
      } else if (event.key === 'Enter' && index >= 0) {
        event.preventDefault();
        buttons[index].click();
      }
    });
    panel.appendChild(list);
    const custom = doc.createElement('textarea');
    custom.className = 'guidance-custom-input';
    custom.placeholder = current.language === 'zh' ? '也可以自己描述你的卡点…' : 'Describe where you are stuck…';
    custom.rows = 2;
    panel.appendChild(custom);
    const customSubmit = doc.createElement('button');
    customSubmit.type = 'button';
    customSubmit.className = 'guidance-action guidance-action-custom';
    customSubmit.textContent = current.language === 'zh' ? '提交我的描述' : 'Submit my description';
    customSubmit.disabled = true;
    custom.addEventListener('input', () => { customSubmit.disabled = !custom.value.trim(); });
    custom.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.shiftKey && !customSubmit.disabled) { event.preventDefault(); customSubmit.click(); }
    });
    customSubmit.addEventListener('click', () => {
      const text = custom.value.trim();
      if (!text) return;
      state = 'answering';
      settle(current, { status: 'custom', guidance: { id: 'custom', title: text.slice(0, 24), instruction: `Student own description of the stuck point: ${text}`, source: 'custom' }, requestId: data.request_id || '' });
    });
    panel.appendChild(customSubmit);
    const fromStart = doc.createElement('button');
    fromStart.type = 'button';
    fromStart.className = 'guidance-action guidance-action-from-start';
    fromStart.textContent = current.language === 'zh' ? '还分不清，带我从头看' : 'I am not sure; start from the basics';
    fromStart.addEventListener('click', () => settle(current, { status: 'from_start', guidance: { id: 'from_start', title: fromStart.textContent, instruction: 'Start from intuition and basics, then check understanding step by step.', source: 'from_start' }, requestId: data.request_id || '' }));
    panel.appendChild(fromStart);
    const actions = doc.createElement('div');
    actions.className = 'guidance-actions';
    addAction(actions, words.skip, 'guidance-action guidance-action-primary', () => {
      state = 'answering';
      settle(current, { status: 'skipped', guidance: null, requestId: data.request_id || '' });
    });
    addAction(actions, words.cancel, 'guidance-action', () => {
      renderCancelled(mount, current.language);
      state = 'waiting';
      settle(current, { status: 'cancelled', guidance: null, requestId: data.request_id || '' });
    });
    panel.appendChild(actions);
    mount.appendChild(panel);
    state = 'choosing';
  }

  function renderError(current, error) {
    if (activeRequest !== current) return;
    const words = copy(current.language);
    const mount = current.mount;
    mount.replaceChildren();
    const panel = doc.createElement('section');
    panel.className = 'guidance-panel guidance-error';
    panel.setAttribute('role', 'alert');
    setText(panel, 'h3', 'guidance-title', words.errorTitle);
    setText(panel, 'p', 'guidance-copy', /failed to fetch|network|load failed/i.test(error.message || '') ? words.networkError : words.errorTitle);
    const meta = doc.createElement('dl');
    meta.className = 'guidance-error-meta';
    setText(meta, 'dt', '', words.stage);
    setText(meta, 'dd', '', error.stage || 'generation');
    setText(meta, 'dt', '', words.request);
    setText(meta, 'dd', '', error.requestId || '-');
    panel.appendChild(meta);
    const actions = doc.createElement('div');
    actions.className = 'guidance-actions';
    addAction(actions, words.retry, 'guidance-action guidance-action-primary', () => runRequest(current));
    addAction(actions, words.skip, 'guidance-action', () => {
      state = 'answering';
      settle(current, { status: 'skipped', guidance: null, requestId: error.requestId || '' });
    });
    addAction(actions, words.cancel, 'guidance-action', () => {
      renderCancelled(mount, current.language);
      state = 'waiting';
      settle(current, { status: 'cancelled', guidance: null, requestId: error.requestId || '' });
    });
    panel.appendChild(actions);
    mount.appendChild(panel);
    state = 'error';
  }

  function validateResponse(data) {
    if (!data || !['hit', 'empty'].includes(data.status) || !Array.isArray(data.options)) {
      throw new Error('Invalid guidance response');
    }
    if (data.options.length !== 3) throw new Error('Guidance must contain exactly 3 options');
    data.options.forEach((option) => {
      if (!option || !/^path_[1-3]$/.test(option.id) || !option.title || !option.description || !option.instruction) {
        throw new Error('Invalid guidance option');
      }
    });
    return data;
  }

  async function runRequest(current) {
    if (activeRequest !== current) return;
    state = 'generating';
    renderLoading(current.mount, current.language);
    try {
      const response = await request('/api/ask-guidance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: current.controller.signal,
        body: JSON.stringify(current.payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const error = new Error(data.error || `HTTP ${response.status}`);
        error.stage = data.stage || 'generation';
        error.requestId = data.request_id || '';
        throw error;
      }
      renderChoices(current, validateResponse(data));
    } catch (error) {
      if (activeRequest !== current) return;
      if (error.name === 'AbortError') {
        renderCancelled(current.mount, current.language);
        state = enabled ? 'waiting' : 'closed';
        settle(current, { status: 'cancelled', guidance: null, reason: 'aborted' });
        return;
      }
      renderError(current, {
        message: error.message,
        stage: error.stage || 'generation',
        requestId: error.requestId || '',
      });
    }
  }

  function requestChoice({ scope = 'main', payload = {}, mount, signal = null, bypassEnabled = false } = {}) {
    if (!enabled && !bypassEnabled) return Promise.resolve({ status: 'disabled', guidance: null });
    const existing = scopeState(scope).selected;
    if (existing) return Promise.resolve({ status: 'selected', guidance: existing, reused: true });
    if (!doc || !mount || typeof request !== 'function') {
      return Promise.reject(new Error('Guidance UI is unavailable'));
    }
    abortCurrent('superseded');
    return new Promise((resolve) => {
      const current = {
        scope,
        payload,
        mount,
        language: payload.language === 'zh' ? 'zh' : 'en',
        controller: new AbortController(),
        externalSignal: signal,
        onExternalAbort: null,
        resolve,
      };
      if (signal) {
        current.onExternalAbort = () => {
          if (activeRequest === current) abortCurrent('external_abort');
        };
        if (signal.aborted) {
          resolve({ status: 'cancelled', guidance: null, reason: 'external_abort' });
          return;
        }
        signal.addEventListener('abort', current.onExternalAbort, { once: true });
      }
      activeRequest = current;
      runRequest(current);
    });
  }

  function markDone() {
    if (!activeRequest) state = enabled ? 'done' : 'closed';
  }

  function init() {
    if (!doc) return;
    doc.querySelectorAll('[data-guidance-toggle]').forEach((button) => {
      if (button.dataset.guidanceBound === 'true') return;
      button.dataset.guidanceBound = 'true';
      button.addEventListener('click', () => setEnabled(!enabled));
    });
    syncUi();
  }

  function getSnapshot() {
    return {
      enabled,
      state,
      mainSelection: scopes.main.selected ? { ...scopes.main.selected } : null,
      learnSelection: scopes.learn.selected ? { ...scopes.learn.selected } : null,
      hasActiveRequest: Boolean(activeRequest),
    };
  }

  return {
    init,
    isEnabled: () => enabled,
    setEnabled,
    requestChoice,
    getSelection: scope => scopeState(scope).selected,
    clearSelection,
    resetScope,
    abortCurrent,
    markDone,
    getSnapshot,
  };
}));
