(() => {
  'use strict';
  // Shared soundtrack controller. Installed on the landing page and each proposal page.
  // The preference defaults to ON, unless this visitor explicitly mutes it.
  const audio = document.getElementById('rainforest-audio');
  const toggle = document.getElementById('sound-toggle');
  if (!audio || !toggle) return;

  const symbol = toggle.querySelector('.sound-symbol');
  const label = toggle.querySelector('.sound-label');
  const PREF = 'pierce-rainforest-audio-enabled-v1';
  const POSITION = 'pierce-rainforest-audio-position-v1';

  const storage = {
    get(key, scope = localStorage) {
      try { return scope.getItem(key); } catch { return null; }
    },
    set(key, value, scope = localStorage) {
      try { scope.setItem(key, value); } catch { /* local files/private mode */ }
    }
  };

  let enabled = storage.get(PREF) !== 'off';
  let blocked = false;
  let pauseForHidden = false;
  let destroyed = false;
  let hasRestoredPosition = false;
  audio.volume = 0.30;
  audio.loop = true;
  audio.preload = 'auto';
  audio.autoplay = enabled;

  const reflect = () => {
    const playing = !audio.paused && !audio.ended;
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.dataset.playback = !enabled ? 'off' : playing ? 'playing' : blocked ? 'waiting' : 'loading';
    if (symbol) symbol.textContent = !enabled ? '♪' : playing ? '♫' : '♬';
    if (label) label.textContent = !enabled ? 'Rainforest sound off'
      : playing ? 'Rainforest sound on'
      : blocked ? 'Tap for rainforest sound'
      : 'Rainforest sound on';
    toggle.setAttribute('aria-label', !enabled ? 'Turn rainforest sound on'
      : playing ? 'Mute rainforest sound'
      : 'Start rainforest sound (on by default; tap if autoplay is blocked)');
    toggle.title = !enabled ? 'Rainforest ambience is muted on every proposal page.'
      : playing ? 'Rainforest ambience plays throughout the research pages. Click to mute.'
      : 'Sound is enabled by default. Your browser may require a tap or click to play.';
  };

  // A source reload is required for static HTML navigation. Carry the playback
  // offset across pages so it feels like the same looping track when resumed.
  const restorePosition = () => {
    if (hasRestoredPosition || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
    hasRestoredPosition = true;
    try {
      const saved = JSON.parse(storage.get(POSITION, sessionStorage) || 'null');
      if (!saved || !Number.isFinite(saved.at) || !Number.isFinite(saved.position)) return;
      if (Date.now() - saved.at > 30 * 60 * 1000) return;
      const elapsed = saved.playing && enabled ? Math.max(0, (Date.now() - saved.at) / 1000) : 0;
      audio.currentTime = (saved.position + elapsed) % audio.duration;
    } catch { /* reset to the start if resume isn't available */ }
  };

  const rememberPosition = () => {
    storage.set(POSITION, JSON.stringify({
      position: Number.isFinite(audio.currentTime) ? audio.currentTime : 0,
      at: Date.now(),
      playing: enabled && !audio.paused
    }), sessionStorage);
  };

  const playIfAllowed = () => {
    if (!enabled || destroyed || document.hidden) { reflect(); return; }
    if (!audio.paused) { blocked = false; reflect(); return; }
    try {
      const request = audio.play();
      if (request && typeof request.then === 'function') {
        request.then(() => {
          if (!enabled || destroyed) { audio.pause(); return; }
          blocked = false;
          reflect();
        }).catch(() => { blocked = true; reflect(); });
      }
    } catch { blocked = true; }
    reflect();
  };

  if (audio.readyState >= 1) restorePosition();
  else audio.addEventListener('loadedmetadata', restorePosition, { once:true });
  audio.addEventListener('playing', () => { blocked = false; reflect(); });
  audio.addEventListener('pause', reflect);
  audio.addEventListener('error', () => {
    blocked = true;
    if (label) label.textContent = 'Rainforest audio unavailable';
    toggle.title = 'The audio file could not be loaded.';
  });

  toggle.addEventListener('click', () => {
    if (!enabled) {
      enabled = true;
      storage.set(PREF, 'on');
      blocked = false;
      playIfAllowed();
    } else if (audio.paused) {
      // If autoplay was blocked, a click on the visible control enables playback.
      blocked = false;
      playIfAllowed();
    } else {
      enabled = false;
      storage.set(PREF, 'off');
      audio.pause();
      rememberPosition();
      reflect();
    }
  });

  // Browsers commonly disallow audible autoplay before a user gesture.
  // Retry in that very gesture (not in a later async callback) on every page.
  // This handler never overrides an explicit mute choice.
  const resumeOnGesture = (event) => {
    if (!enabled || event.target.closest?.('#sound-toggle')) return;
    playIfAllowed();
  };
  document.addEventListener('pointerdown', resumeOnGesture, { passive: true });
  document.addEventListener('keydown', (event) => {
    if (!event.repeat && !event.metaKey && !event.altKey && !event.ctrlKey) resumeOnGesture(event);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pauseForHidden = !audio.paused;
      rememberPosition();
      audio.pause();
    } else if (enabled) {
      playIfAllowed();
    }
  });
  window.addEventListener('pagehide', () => { rememberPosition(); destroyed = true; });
  window.addEventListener('pageshow', () => { destroyed = false; if (enabled) playIfAllowed(); });
  window.addEventListener('beforeunload', rememberPosition);

  reflect();
  // Default ON. An immediate playback attempt succeeds in browsers that allow
  // audible autoplay; in stricter browsers, the next visitor gesture starts it.
  playIfAllowed();
})();
