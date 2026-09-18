// User-authored teaching instructions. Signed-in users persist them server-side; guests keep them in the current tab.

const MAX_TEACHING_INSTRUCTIONS_LENGTH = 1000;
const tr = k => (window.FourierI18N ? window.FourierI18N.t(k) : k);

const preferenceProfileEditor = document.getElementById('preferenceProfileEditor');
const preferenceSaveBtn = document.getElementById('preferenceSaveBtn');
const preferenceClearBtn = document.getElementById('preferenceClearBtn');
const preferenceSaveState = document.getElementById('preferenceSaveState');
const preferenceCharacterCount = document.getElementById('preferenceCharacterCount');

function getTeachingInstructions() {
  return userMemory && typeof userMemory.teachingInstructions === 'string'
    ? userMemory.teachingInstructions.trim()
    : '';
}

function summarizeTeachingInstructions(instructions) {
  const text = String(instructions || '').replace(/\s+/g, ' ').trim();
  if (!text) return 'No teaching instructions set';
  return text.length > 88 ? `${text.slice(0, 86)}...` : text;
}

function updatePreferenceSidebarSummary() {}

function setPreferenceSaveState(message, tone = 'idle') {
  if (!preferenceSaveState) return;
  preferenceSaveState.textContent = message;
  preferenceSaveState.dataset.tone = tone;
}

function updatePreferenceCharacterCount() {
  if (!preferenceCharacterCount) return;
  const length = preferenceProfileEditor ? preferenceProfileEditor.value.length : 0;
  preferenceCharacterCount.textContent = `${length} / ${MAX_TEACHING_INSTRUCTIONS_LENGTH}`;
  preferenceCharacterCount.dataset.overLimit = String(length > MAX_TEACHING_INSTRUCTIONS_LENGTH);
}

function syncPreferenceEditorFromMemory() {
  if (preferenceProfileEditor) preferenceProfileEditor.value = getTeachingInstructions();
  updatePreferenceCharacterCount();
  updatePreferenceSidebarSummary();
  const updatedAt = userMemory && typeof userMemory.updatedAt === 'string' ? userMemory.updatedAt : '';
  setPreferenceSaveState(updatedAt ? `${tr('settings.teaching.savedOn')} ${updatedAt.slice(0, 10)}` : tr('settings.teaching.notSaved'), 'idle');
}

function setPreferenceControlsBusy(isBusy) {
  if (preferenceSaveBtn) preferenceSaveBtn.disabled = isBusy;
  if (preferenceClearBtn) preferenceClearBtn.disabled = isBusy;
}

async function saveTeachingInstructions(value) {
  if (!currentUser) throw new Error(tr('settings.teaching.guestFirst'));
  const teachingInstructions = String(value || '').trim();
  if (teachingInstructions.length > MAX_TEACHING_INSTRUCTIONS_LENGTH) {
    throw new Error(tr('settings.teaching.exceeds'));
  }

  setPreferenceControlsBusy(true);
  setPreferenceSaveState(tr('settings.teaching.saving'), 'working');
  try {
    if (currentUser.isGuest) {
      userMemory = {
        ...(userMemory || {}),
        teachingInstructions,
        updatedAt: new Date().toISOString()
      };
      saveGuestMemory(userMemory);
      setPreferenceSaveState(teachingInstructions ? tr('settings.teaching.savedTab') : tr('settings.teaching.cleared'), 'saved');
    } else {
      const res = await apiFetch('/api/memory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teachingInstructions })
      });
      if (res.status === 401) throw new Error(tr('settings.teaching.sessionExpired'));
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Save failed (HTTP ${res.status})`);
      userMemory = data.memory || {
        ...(userMemory || {}),
        teachingInstructions,
        updatedAt: new Date().toISOString()
      };
      setPreferenceSaveState(teachingInstructions ? tr('settings.teaching.saved') : tr('settings.teaching.cleared'), 'saved');
    }

    if (preferenceProfileEditor) preferenceProfileEditor.value = getTeachingInstructions();
    updatePreferenceCharacterCount();
    updatePreferenceSidebarSummary();
  } finally {
    setPreferenceControlsBusy(false);
  }
}

function bindPreferenceControls() {
  if (preferenceProfileEditor) {
    preferenceProfileEditor.addEventListener('input', () => {
      updatePreferenceCharacterCount();
      const overLimit = preferenceProfileEditor.value.length > MAX_TEACHING_INSTRUCTIONS_LENGTH;
      setPreferenceSaveState(overLimit ? tr('settings.teaching.overLimit') : tr('settings.teaching.unsaved'), overLimit ? 'error' : 'working');
    });
  }

  if (preferenceSaveBtn) {
    preferenceSaveBtn.addEventListener('click', async () => {
      try {
        await saveTeachingInstructions(preferenceProfileEditor ? preferenceProfileEditor.value : '');
      } catch (err) {
        setPreferenceSaveState(err.message || tr('settings.teaching.saveFailed'), 'error');
      }
    });
  }

  if (preferenceClearBtn) {
    preferenceClearBtn.addEventListener('click', async () => {
      try {
        await saveTeachingInstructions('');
      } catch (err) {
        setPreferenceSaveState(err.message || tr('settings.teaching.clearFailed'), 'error');
      }
    });
  }
}
