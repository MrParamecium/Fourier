// Lightweight, page-local interactions for the graphical-convolution lesson.
// The lesson cache owns the markup; this module only synchronizes trusted UI
// state and never evaluates cached code or formulas.

(function initConvolutionLessonInteractions(root) {
  const controllers = new WeakMap();

  function fillIfEmpty(node, html) {
    if (!node || node.querySelector('.convolution-preview-track, .convolution-contact-track')) return;
    node.innerHTML = html;
  }

  function paintChoiceVisuals(rootElement) {
    fillIfEmpty(
      rootElement.querySelector('[data-convolution-moving-signal]'),
      '<span class="convolution-preview-kicker">Moving signal g(t−τ)</span><span class="convolution-preview-track"><i></i></span>'
    );
    fillIfEmpty(
      rootElement.querySelector('[data-convolution-overlap-preview]'),
      '<span class="convolution-preview-kicker">Overlap</span><span class="convolution-preview-track convolution-preview-track--overlap"><i></i></span>'
    );
    fillIfEmpty(
      rootElement.querySelector('[data-convolution-output-dot]'),
      '<span class="convolution-preview-kicker">Output c(t)</span><span class="convolution-preview-track convolution-preview-track--output"><i></i></span>'
    );
    fillIfEmpty(
      rootElement.querySelector('[data-convolution-contact-diagram]'),
      '<span class="convolution-preview-kicker">Fixed x(τ)</span><span class="convolution-contact-track convolution-contact-track--fixed"><i></i></span><span class="convolution-preview-kicker">Moving g(t−τ)</span><span class="convolution-contact-track convolution-contact-track--moving"><i></i></span>'
    );
  }

  function selectTime(rootElement, value) {
    const next = String(value || 't1');
    rootElement.querySelectorAll('[data-convolution-time-choice]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.convolutionTimeChoice === next));
    });
    rootElement.querySelector('[data-convolution-moving-signal]')?.setAttribute('data-position', next);
    rootElement.querySelector('[data-convolution-overlap-preview]')?.setAttribute('data-position', next);
    rootElement.querySelector('[data-convolution-output-dot]')?.setAttribute('data-output-point', next);
  }

  function selectContact(rootElement, value) {
    const next = String(value || 'first');
    rootElement.querySelectorAll('[data-convolution-contact-choice]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.convolutionContactChoice === next));
    });
    rootElement.querySelector('[data-convolution-contact-diagram]')?.setAttribute('data-contact', next);
    rootElement.querySelectorAll('[data-convolution-breakpoint]').forEach((point) => {
      if (point.dataset.convolutionBreakpoint === next) point.setAttribute('aria-current', 'true');
      else point.removeAttribute('aria-current');
    });
  }

  function selectAnalogy(rootElement, value) {
    const next = String(value || 'ink');
    rootElement.querySelectorAll('[data-convolution-analogy-choice]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.convolutionAnalogyChoice === next));
    });
    rootElement.querySelectorAll('[data-convolution-analogy-panel]').forEach((panel) => {
      panel.hidden = panel.dataset.convolutionAnalogyPanel !== next;
    });
  }

  function destroy(rootElement) {
    controllers.get(rootElement)?.abort();
    controllers.delete(rootElement);
  }

  function mount(rootElement) {
    if (!rootElement) return;
    destroy(rootElement);
    paintChoiceVisuals(rootElement);
    const controller = new AbortController();
    controllers.set(rootElement, controller);
    rootElement.addEventListener('click', (event) => {
      const time = event.target.closest('[data-convolution-time-choice]');
      const contact = event.target.closest('[data-convolution-contact-choice]');
      const analogy = event.target.closest('[data-convolution-analogy-choice]');
      if (time) selectTime(rootElement, time.dataset.convolutionTimeChoice);
      if (contact) selectContact(rootElement, contact.dataset.convolutionContactChoice);
      if (analogy) selectAnalogy(rootElement, analogy.dataset.convolutionAnalogyChoice);
    }, { signal: controller.signal });
  }

  root.__ftutorConvolutionLessonInteractions = Object.freeze({ mount, destroy });
})(window);
