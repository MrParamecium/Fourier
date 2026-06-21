// brief-fallback — extracted from app.js Phase 3 PR #21 (hydrateInteractiveDemos dispatcher split).
// Loaded as a classic <script> BEFORE app.js. Reaches into the shared script-global
// lexical env for helpers (no bundler, no IIFE, no module.exports).
//
// External globals used at call time:
//   - escapeHtml, decodeInlineMarkdownFragment, getInteractiveDemoTitle, getInteractiveDemoText (app.js)
//
// Public surface (free-name lookup from the dispatcher in app.js):
//   - the top-level function defined below

function renderBriefDemoFallback(node, demo, family = 'brief') {
  const title = getInteractiveDemoTitle(demo, 'Interactive demo');
  const subtitle = getInteractiveDemoSubtitle(demo);
  const mode = demo.mode_specific_visual_use || {};
  const spec = getInteractiveDemoSpec(demo);
  const tabs = [
    ['cram', mode.cram || spec.student_prompt || subtitle || ''],
    ['standard', mode.standard || spec.description || subtitle || ''],
    ['top_score', mode.top_score || spec.note_below_demo || spec.what_to_notice || '']
  ].filter(([, value]) => compactWhitespace(value));
  const initialTab = tabs[0] ? tabs[0][0] : 'standard';

  node.innerHTML = `
    <section class="interactive-demo-shell interactive-demo-shell--brief interactive-demo-shell--${escapeHtml(family)}">
      <div class="interactive-demo-head">
        <div class="interactive-demo-title">${escapeHtml(title)}</div>
        <div class="interactive-demo-subtitle">${escapeHtml(subtitle || 'This section is ready to teach, with a compact brief instead of a blank panel.')}</div>
      </div>
      ${tabs.length ? `
        <div class="interactive-demo-tabs" role="tablist">
          ${tabs.map(([key, label], index) => `<button type="button" class="interactive-demo-tab${key === initialTab ? ' is-active' : ''}" data-interactive-tab="${escapeHtml(key)}" aria-pressed="${key === initialTab ? 'true' : 'false'}">${escapeHtml(key.replace(/_/g, ' '))}</button>`).join('')}
        </div>
      ` : ''}
      <div class="interactive-demo-brief-card">
        <div class="interactive-demo-brief-label">Teaching emphasis</div>
        <div class="interactive-demo-brief-copy" data-interactive-brief-copy>${escapeHtml(tabs.find(([key]) => key === initialTab)?.[1] || subtitle || '')}</div>
      </div>
      <div class="interactive-demo-readouts">
        ${spec.note_below_demo ? `<div class="interactive-demo-readout"><strong>Note:</strong> ${decodeInlineMarkdownFragment(escapeHtml(spec.note_below_demo))}</div>` : ''}
        ${spec.student_prompt ? `<div class="interactive-demo-readout"><strong>Prompt:</strong> ${escapeHtml(spec.student_prompt)}</div>` : ''}
        ${spec.observation_prompt ? `<div class="interactive-demo-readout"><strong>Observe:</strong> ${escapeHtml(spec.observation_prompt)}</div>` : ''}
      </div>
    </section>
  `;

  const shellEl = node.querySelector('.interactive-demo-shell');
  const copyEl = node.querySelector('[data-interactive-brief-copy]');
  const tabsEl = node.querySelectorAll('[data-interactive-tab]');
  const tabMap = new Map(tabs);
  tabsEl.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-interactive-tab');
      tabsEl.forEach((item) => {
        const active = item === tab;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      if (copyEl) copyEl.textContent = tabMap.get(key) || '';
    });
  });
  if (shellEl) shellEl.classList.toggle('is-narrow', shellEl.clientWidth < 760);
}

