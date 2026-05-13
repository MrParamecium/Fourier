import re

with open('tutor-openclaw-ui/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

old_func = """function renderLearnWebSection(webSources) {
  if (!learnWebSection) return;
  if (!webSources || !webSources.length) {
    learnWebSection.classList.add('hidden');
    return;
  }
  learnWebSectionCount.textContent = webSources.length;
  learnWebCards.innerHTML = webSources.map(w => {
    const d = w.domain || domainOf(w.url);
    const fav = d ? `https://www.google.com/s2/favicons?sz=32&domain=${encodeURIComponent(d)}` : '';
    return `<a class="learn-web-card" href="${escapeHtml(w.url)}" target="_blank" rel="noopener noreferrer">
      <div class="lwc-head">
        ${fav ? `<img class="lwc-fav" src="${fav}" alt="">` : ''}
        <div class="lwc-title">${escapeHtml(w.title || d || w.url)}</div>
      </div>
      ${d ? `<div class="lwc-domain">${escapeHtml(d)}</div>` : ''}
      ${w.snippet ? `<div class="lwc-snippet">${escapeHtml(w.snippet)}</div>` : ''}
    </a>`;
  }).join('');
  learnWebSection.classList.remove('hidden');
}"""

new_func = """function renderLearnWebSection(webSources) {
  if (!learnWebSection) return;
  if (!webSources || !webSources.length) {
    learnWebSection.classList.add('hidden');
    return;
  }
  learnWebSectionCount.textContent = webSources.length;
  let cardsHtml = webSources.map((w, idx) => {
    const d = w.domain || domainOf(w.url);
    const fav = d ? `https://www.google.com/s2/favicons?sz=32&domain=${encodeURIComponent(d)}` : '';
    const hiddenClass = idx >= 3 ? ' learn-web-card-hidden' : '';
    return `<a class="learn-web-card${hiddenClass}" href="${escapeHtml(w.url)}" target="_blank" rel="noopener noreferrer">
      <div class="lwc-head">
        ${fav ? `<img class="lwc-fav" src="${fav}" alt="">` : ''}
        <div class="lwc-title">${escapeHtml(w.title || d || w.url)}</div>
      </div>
      ${d ? `<div class="lwc-domain">${escapeHtml(d)}</div>` : ''}
    </a>`;
  }).join('');

  if (webSources.length > 3) {
    cardsHtml += `<button class="web-expand-btn" id="expandWebCardsBtn">Show all ${webSources.length} sources</button>`;
  }
  learnWebCards.innerHTML = cardsHtml;

  const expandBtn = document.getElementById('expandWebCardsBtn');
  if (expandBtn) {
    expandBtn.addEventListener('click', () => {
      document.querySelectorAll('.learn-web-card-hidden').forEach(el => {
        el.classList.remove('learn-web-card-hidden');
      });
      expandBtn.remove();
    });
  }
  learnWebSection.classList.remove('hidden');
}"""

content = content.replace(old_func, new_func)

with open('tutor-openclaw-ui/app.js', 'w', encoding='utf-8') as f:
    f.write(content)

