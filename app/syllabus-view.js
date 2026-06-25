// Syllabus tree renderer — extracted from app.js in Phase 3 (Workstream B, seam #5).
// Loaded as a classic <script> BEFORE app.js (like the other feature modules), so
// renderSyllabus is defined when app.js calls it at init AND before
// ui-friction-fixes.js (loaded AFTER app.js) monkey-patches/wraps it. The load
// chain is: data/syllabus-data.js -> syllabus-view.js -> app.js -> ui-friction-fixes.js.
//
// Renders the sidebar chapter/section/subsection accordion from syllabusData and
// binds the click handlers that open Learn Mode / Chapter Overview.
//
// External globals used at call time (owned by app.js / data modules, resolved
// cross-scope — render-time deps are live by the time app.js calls renderSyllabus):
//   - syllabusData                              (data/syllabus-data.js) — render time
//   - escapeHtml, courseSyllabus                (app.js)               — render time
//   - isAccordionOpen, setAccordionOpen         (app.js)               — accordion toggle (click)
//   - shouldOpenSectionAsChapterOverview, openChapterOverviewMode, openLearnMode,
//     openLearnModeKeepToc, findParentOverviewContextForSubsection (app.js) — on click
//
// Public surface: renderSyllabus — app.js calls it once at init (and on re-renders);
// ui-friction-fixes.js wraps it, so live re-renders run through the wrapped version.

function renderSyllabus() {
  let html = '';
  syllabusData.forEach((item, chIdx) => {
    const sections = item.sections.map(s => typeof s === 'string' ? { title: s, subsections: [] } : s);
    const sectionsHtml = sections.map((sec) => {
      const subsList = sec.subsections || [];
      const sectionSlug = `section-${chIdx}-${escapeHtml(sec.title).replace(/[^a-zA-Z0-9_-]/g, '')}`;
      const subsectionHtml = subsList.length ? `
        <div class="syllabus-subsections hidden" id="${sectionSlug}">
          ${subsList.map(sub => `
            <button class="syllabus-subsection" data-subsection="${escapeHtml(sub)}">${escapeHtml(sub)}</button>
          `).join('')}
        </div>
      ` : '';
      return `
        <div class="syllabus-section-wrap">
          <div class="syllabus-section-row">
            ${subsList.length ? `<button class="syllabus-section-caret" data-target="${sectionSlug}" type="button">›</button>` : `<span class="syllabus-section-caret-placeholder"></span>`}
            <button class="syllabus-section" data-section="${escapeHtml(sec.title)}" data-subsections="${escapeHtml(JSON.stringify(subsList))}">${escapeHtml(sec.title)}</button>
          </div>${subsectionHtml}
        </div>`;
    }).join('');

    html += `
      <div class="syllabus-item">
        <button class="syllabus-chapter" data-idx="${chIdx}">
          <span class="caret">›</span>
          <span>${escapeHtml(item.chapter)}</span>
        </button>
        <div class="syllabus-sections hidden" id="syllabus-${chIdx}">
          ${sectionsHtml}
        </div>
      </div>
    `;
  });
  courseSyllabus.innerHTML = html;

  // Chapter expand/collapse
  courseSyllabus.querySelectorAll('.syllabus-chapter').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-idx');
      const panel = document.getElementById(`syllabus-${idx}`);
      const caret = btn.querySelector('.caret');
      const open = !isAccordionOpen(panel);
      setAccordionOpen(panel, open);
      caret.classList.toggle('open', open);
    });
  });

  // Section click → show subsections in right TOC + open Learn Mode
  courseSyllabus.querySelectorAll('.syllabus-section').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const section = btn.getAttribute('data-section');
      const title   = btn.textContent.trim();

      // Mark active in sidebar
      courseSyllabus.querySelectorAll('.syllabus-section').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Parse subsections stored in data attribute
      let subs = [];
      try {
        const rawSubs = btn.getAttribute('data-subsections') || '[]';
        subs = JSON.parse(rawSubs.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&'));
      } catch(_) {}

      if (shouldOpenSectionAsChapterOverview(section, title, subs)) {
        openChapterOverviewMode(section, title, subs);
      } else {
        openLearnMode(section, title, subs);
      }
    });
  });

  courseSyllabus.querySelectorAll('.syllabus-section-caret').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute('data-target');
      const panel = targetId ? document.getElementById(targetId) : null;
      if (!panel) return;
      const open = !isAccordionOpen(panel);
      setAccordionOpen(panel, open);
      btn.classList.toggle('open', open);
    });
  });

  courseSyllabus.querySelectorAll('.syllabus-subsection').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const subTitle = btn.getAttribute('data-subsection');
      if (!subTitle) return;
      courseSyllabus.querySelectorAll('.syllabus-subsection').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      openLearnModeKeepToc(subTitle, subTitle, findParentOverviewContextForSubsection(subTitle, subTitle));
    });
  });
}
