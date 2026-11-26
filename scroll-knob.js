// Mobile scroll knob: a neon-glass bubble on the right that tracks scroll.
// The same icons form the rail (hold to scrub) and unfold into the section list (tap).
(() => {
  const mq = matchMedia('(max-width:900px)');
  if (!mq.matches) return;

  const sections = [...document.querySelectorAll('main section[id]')];
  if (!sections.length) return;

  const ICONS = {
    'summary': '<circle cx="12" cy="12" r="3"/><path d="M4 12h4M16 12h4M12 4v4M12 16v4"/>',
    'tesla-and-the-ev-push': '<path d="M5 16l2-8h10l2 8"/><circle cx="7.5" cy="16.5" r="1.6"/><circle cx="16.5" cy="16.5" r="1.6"/><path d="M9 10h6"/>',
    'spacex': '<path d="M12 2c2.4 4.2 3.4 7.4 3.4 10.2A3.4 3.4 0 0 1 12 15.6a3.4 3.4 0 0 1-3.4-3.4C8.6 9.4 9.6 6.2 12 2z"/><path d="M9.2 15.2L7 21M14.8 15.2L17 21M12 11.5V20"/>',
    'starlink': '<rect x="9.2" y="9.2" width="5.6" height="5.6" rx="1" transform="rotate(45 12 12)"/><path d="M6 6l2.6 2.6M18 6l-2.6 2.6M6 18l2.6-2.6M18 18l-2.6-2.6"/>',
    'starlink-in-ukraine': '<path d="M12 3a9 9 0 0 0 0 18c2.5 0 4-2 4-4.5S14.7 12 12 12"/><path d="M3.5 12h17M12 3c3 3.2 4.5 6.4 4.5 9S15 17.8 12 21"/>',
    'energy': '<path d="M13 2L6 13h6l-1 9 8-12h-6z"/>',
    'neuralink': '<path d="M15 5.5c2.4 1 4 3.2 4 5.8 0 2.2-1.2 3.8-2.6 4.5v3.2h-3.2v-2.2h-2.4v2.2H7.6v-3.2C6.2 15.1 5 13.5 5 11.3c0-2.6 1.6-4.8 4-5.8 1-.8 2.4-1.3 3-1.3s2 .5 3 1.3z"/><circle cx="12" cy="11.2" r="1.5"/>',
    'the-boring-company': '<path d="M3 14c2-6 5-9 9-9s7 3 9 9"/><path d="M5 14h14M8 14v4M16 14v4M4 18h16"/>',
    'openai-and-xai': '<circle cx="12" cy="12" r="8"/><path d="M8 12h8M12 8v8M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6"/>',
    'paypal': '<rect x="4" y="6" width="16" height="12" rx="2"/><path d="M8 12h4.2a2.2 2.2 0 0 0 0-4.4H8v8"/>',
    'contested-stories': '<circle cx="12" cy="12" r="8"/><path d="M12 8v5M12 16.5h.01"/>',
    'free-speech-vs-cancel-culture': '<path d="M5 6h10a3 3 0 0 1 0 6H9l-4 3V6z"/><path d="M15 13.5V16l-3 2v-2.2"/>',
    'his-public-style': '<circle cx="8" cy="9" r="2.2"/><circle cx="16" cy="9" r="2.2"/><path d="M4.5 16c1-2.4 2.8-3.5 3.5-3.5S10 13.6 11 16M13 16c1-2.4 2.8-3.5 3.5-3.5S19 13.6 20 16"/>',
    'timelines': '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/>',
    'lawsuits': '<path d="M12 3v18M5 8h14M7 8l-2 5h4l-2 8M17 8l-2 5h4l-2 8"/>',
    'timeline-of-criticism': '<path d="M5 4v16M5 7h8M5 12h11M5 17h6"/>',
    'scorecard': '<path d="M5 12l4 4 10-10"/><path d="M4 19h16"/>',
    'the-human-side': '<circle cx="12" cy="8" r="3"/><path d="M5.5 19c0-3.4 2.9-5.5 6.5-5.5s6.5 2.1 6.5 5.5"/>',
    'personal-note': '<path d="M7 4h8l4 4v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><path d="M15 4v4h4M9 13h6M9 17h4"/>',
    'sources': '<path d="M7 4h8a2 2 0 0 1 2 2v14l-6-2-6 2V6a2 2 0 0 1 2-2z"/>',
    'image-credits': '<rect x="4" y="6" width="16" height="13" rx="2"/><circle cx="9" cy="11" r="1.6"/><path d="M4 16l4.5-3.5L13 16l3-2.5 4 3"/>'
  };
  const FALLBACK = '<circle cx="12" cy="12" r="3"/>';

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.createElement('div');
  root.className = 'scroll-knob';
  root.dataset.glow = 'blue';
  root.innerHTML = `<div class="sk-wash" aria-hidden="true"></div>
    <div class="sk-rail" hidden role="menu" aria-label="On this page"></div>
    <button type="button" class="sk-thumb" aria-label="Scroll position. Tap for the list of sections, or hold and drag to move through the page." aria-haspopup="true" aria-expanded="false">
      <span class="sk-flare sk-flare-a" aria-hidden="true"></span>
      <span class="sk-flare sk-flare-b" aria-hidden="true"></span>
      <span class="sk-flare sk-flare-c" aria-hidden="true"></span>
    </button>`;
  document.body.append(root);
  const rail = root.querySelector('.sk-rail');
  const thumb = root.querySelector('.sk-thumb');

  const titleOf = sec => {
    const a = document.querySelector('.sidenav a[href="#' + sec.id + '"], .navmenu a[href="#' + sec.id + '"]');
    return ((a && a.textContent) || (sec.querySelector('h2') || {}).textContent || sec.id).trim();
  };
  const svg = id => '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[id] || FALLBACK) + '</svg>';

  const icons = sections.map(sec => {
    const a = document.createElement('a');
    a.className = 'sk-icon';
    a.href = '#' + sec.id;
    a.dataset.id = sec.id;
    const title = titleOf(sec);
    a.setAttribute('role', 'menuitem');
    a.setAttribute('aria-label', title);
    a.dataset.title = title;
    a.innerHTML = '<span class="sk-name"></span><span class="sk-mi">' + svg(sec.id) + '</span>';
    a.querySelector('.sk-name').textContent = title;
    a.addEventListener('click', e => { e.preventDefault(); jump(sec); });
    rail.append(a);
    return { el: a, sec, title };
  });

  const jump = sec => {
    closeMenu();
    release();
    sec.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  let padTop = 0, padBot = 0, track = 1, docH = 1, viewH = 1, maxY = 1;
  let holding = false, menuOpen = false, holdTimer = 0, foldTimer = 0, moved = false, startY = 0, startX = 0;

  const layoutMap = () => {
    icons.forEach(it => {
      const top = it.sec.getBoundingClientRect().top + scrollY;
      it.t = Math.min(1, Math.max(0, top / docH));
      it.y = padTop + it.t * track;
    });
    const gap = 32;
    for (let i = 1; i < icons.length; i++) if (icons[i].y < icons[i-1].y + gap) icons[i].y = icons[i-1].y + gap;
    const floor = padTop + track;
    if (icons.length && icons[icons.length-1].y > floor) {
      icons[icons.length-1].y = floor;
      for (let i = icons.length - 2; i >= 0; i--) if (icons[i].y > icons[i+1].y - gap) icons[i].y = icons[i+1].y - gap;
    }
    if (icons.length && icons[0].y < padTop) {
      icons[0].y = padTop;
      for (let i = 1; i < icons.length; i++) if (icons[i].y < icons[i-1].y + gap) icons[i].y = icons[i-1].y + gap;
    }
  };

  const layoutList = p => {
    const n = icons.length, row = 34;
    const cur = currentAt(p), ci = Math.max(0, icons.indexOf(cur));
    const thumbY = padTop + p * track;
    let start = thumbY - ci * row;
    const total = Math.max(0, (n - 1) * row);
    start = Math.min(Math.max(start, padTop), Math.max(padTop, padTop + track - total));
    icons.forEach((it, i) => { it.listY = start + i * row; });
  };

  const measure = () => {
    const cs = getComputedStyle(root);
    padTop = 16 + (parseFloat(cs.paddingTop) || 0);
    padBot = 16 + (parseFloat(cs.paddingBottom) || 0);
    viewH = innerHeight;
    track = Math.max(1, viewH - padTop - padBot);
    docH = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    maxY = Math.max(1, docH - viewH);
    layoutMap();
    if (!menuOpen && !root.classList.contains('is-folding')) icons.forEach(it => { it.el.style.top = it.y + 'px'; });
  };

  const progress = () => Math.min(1, Math.max(0, scrollY / maxY));
  const placeThumb = p => { thumb.style.top = (padTop + p * track) + 'px'; };
  const currentAt = p => {
    let cur = icons[0];
    for (const it of icons) if (p + 0.012 >= it.t) cur = it;
    return cur;
  };

  const paint = p => {
    placeThumb(p);
    const cur = currentAt(p);
    const thumbY = padTop + p * track;
    icons.forEach(it => {
      const iconY = menuOpen ? it.listY : it.y;
      const near = !menuOpen && Math.abs(iconY - thumbY) < 34;
      const passed = !menuOpen && (p + 0.008 >= it.t || near);
      it.el.classList.toggle('is-passed', passed);
      it.el.classList.toggle('is-current', it === cur);
    });
  };

  const onScroll = () => { if (!holding) paint(progress()); };

  const setHeld = on => {
    holding = on;
    if (on) { closeMenu(true); measure(); rail.hidden = false; }
    root.classList.toggle('is-held', on);
    if (!on && !menuOpen) rail.hidden = true;
    thumb.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (on) paint(progress());
  };

  const openMenu = () => {
    if (holding) return;
    clearTimeout(foldTimer);
    measure();
    const p = progress();
    const thumbY = padTop + p * track;
    rail.hidden = false;
    // Start every icon on the bubble, then let them unfold into the list.
    icons.forEach(it => {
      it.el.style.transition = 'none';
      it.el.style.top = thumbY + 'px';
    });
    layoutList(p);
    menuOpen = true;
    root.classList.add('is-menu');
    root.classList.remove('is-folding');
    thumb.setAttribute('aria-expanded', 'true');
    paint(p);
    requestAnimationFrame(() => {
      icons.forEach(it => {
        it.el.style.transition = '';
        it.el.style.top = it.listY + 'px';
      });
    });
  };

  const closeMenu = instant => {
    if (!menuOpen) { root.classList.remove('is-menu'); return; }
    menuOpen = false;
    thumb.setAttribute('aria-expanded', 'false');
    const thumbY = padTop + progress() * track;
    if (instant || reduce) {
      root.classList.remove('is-menu', 'is-folding');
      if (!holding) rail.hidden = true;
      measure();
      return;
    }
    // Fold the same icons back into the bubble.
    root.classList.add('is-folding');
    root.classList.remove('is-menu');
    icons.forEach(it => { it.el.style.top = thumbY + 'px'; });
    foldTimer = setTimeout(() => {
      root.classList.remove('is-folding');
      if (!holding && !menuOpen) rail.hidden = true;
      measure();
    }, 280);
  };

  const yToProgress = clientY => Math.min(1, Math.max(0, (clientY - padTop) / track));
  const scrub = clientY => {
    const p = yToProgress(clientY);
    scrollTo({ top: p * maxY, behavior: 'auto' });
    paint(p);
  };

  const release = ev => {
    clearTimeout(holdTimer); holdTimer = 0;
    const wasHeld = holding;
    if (holding) setHeld(false);
    if (!wasHeld && !moved) {
      if (menuOpen) closeMenu(); else openMenu();
    }
    paint(progress());
  };

  const startHold = ev => {
    if (ev.pointerType === 'mouse' && ev.button !== 0) return;
    ev.preventDefault();
    moved = false;
    startY = ev.clientY; startX = ev.clientX;
    measure();
    holdTimer = setTimeout(() => setHeld(true), 220);
    try { thumb.setPointerCapture(ev.pointerId); } catch (_) {}
  };

  thumb.addEventListener('pointerdown', startHold);
  thumb.addEventListener('pointermove', ev => {
    if (!thumb.hasPointerCapture(ev.pointerId)) return;
    const dx = ev.clientX - startX, dy = ev.clientY - startY;
    if (!moved && (dx * dx + dy * dy) > 36) moved = true;
    if (!holding && !moved) return;
    ev.preventDefault();
    if (!holding) setHeld(true);
    scrub(ev.clientY);
  });
  thumb.addEventListener('pointerup', release);
  thumb.addEventListener('pointercancel', ev => { moved = true; release(ev); });

  thumb.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); menuOpen ? closeMenu() : openMenu(); }
    if (e.key === 'Escape') closeMenu();
  });
  addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  addEventListener('pointerdown', e => { if (menuOpen && !root.contains(e.target)) closeMenu(); }, true);

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => { measure(); if (menuOpen) layoutList(progress()); paint(progress()); }, { passive: true });
  addEventListener('load', () => { measure(); paint(progress()); });
  measure(); paint(progress());

  // Preview only: three glow hues that share the same neon-glass language. Default is mid blue.
  if (document.querySelector('.preview-flag')) {
    const bar = document.createElement('div');
    bar.className = 'sk-variants';
    bar.innerHTML = 'Glow <button type="button" data-glow="blue" class="is-on" aria-label="Blue glow (default)"></button><button type="button" data-glow="cyan" aria-label="Cyan glow"></button><button type="button" data-glow="ice" aria-label="Ice glow"></button>';
    document.body.append(bar);
    bar.addEventListener('click', e => {
      const b = e.target.closest('button[data-glow]'); if (!b) return;
      root.dataset.glow = b.dataset.glow;
      bar.querySelectorAll('button').forEach(x => x.classList.toggle('is-on', x === b));
    });
  }
})();
