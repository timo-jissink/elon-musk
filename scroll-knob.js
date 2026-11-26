// Mobile scroll knob: neon-glass bubble on the right that tracks scroll.
// The same icons form the rail (hold to scrub along an arc) and unfold into the section list (tap).
(() => {
  // Company logos: Simple Icons (CC0) where available; otherwise the official mark
  // (see comments). Simple Icons: Tesla, SpaceX, X, OpenAI, PayPal.
  const SI = {
    tesla: `M12 5.362l2.475-3.026s4.245.09 8.471 2.054c-1.082 1.636-3.231 2.438-3.231 2.438-.146-1.439-1.154-1.79-4.354-1.79L12 24 8.619 5.034c-3.18 0-4.188.354-4.335 1.792 0 0-2.146-.795-3.229-2.43C5.28 2.431 9.525 2.34 9.525 2.34L12 5.362l-.004.002H12v-.002zm0-3.899c3.415-.03 7.326.528 11.328 2.28.535-.968.672-1.395.672-1.395C19.625.612 15.528.015 12 0 8.472.015 4.375.61 0 2.349c0 0 .195.525.672 1.396C4.674 1.989 8.585 1.435 12 1.46v.003z`,
    spacex: `M24 7.417C8.882 8.287 1.89 14.75.321 16.28L0 16.583h2.797C10.356 9.005 21.222 7.663 24 7.417zm-17.046 6.35c-.472.321-.945.68-1.398 1.02l2.457 1.796h2.778zM2.948 10.8H.189l3.25 2.381c.473-.321 1.02-.661 1.512-.945Z`,
    x: `M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z`,
    openai: `M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z`,
    paypal: `M15.607 4.653H8.941L6.645 19.251H1.82L4.862 0h7.995c3.754 0 6.375 2.294 6.473 5.513-.648-.478-2.105-.86-3.722-.86m6.57 5.546c0 3.41-3.01 6.853-6.958 6.853h-2.493L11.595 24H6.74l1.845-11.538h3.592c4.208 0 7.346-3.634 7.153-6.949a5.24 5.24 0 0 1 2.848 4.686M9.653 5.546h6.408c.907 0 1.942.222 2.363.541-.195 2.741-2.655 5.483-6.441 5.483H8.714Z`
  };
  const p = d => `<path d="${d}"/>`;
  const opt = (svg, s) => s===1 ? svg : `<g transform="translate(12,12) scale(${s}) translate(-12,-12)">${svg}</g>`;
  const LOGOS = {
    tesla: p(SI.tesla),
    // SpaceX SI mark, scaled/centered; swoosh tail is allowed to peek past the circle.
    spacex: `<g class="sk-spacex" transform="translate(16.4,12.2) scale(1.22) translate(-12,-13)">${p(SI.spacex)}</g>`,
    // Official Starlink 2024 Hohmann-transfer geometry (Wikimedia File:Starlink Logo 2024.svg).
    // Site uses variant B: same shape, medium stroke, enlarged dots (official hairlines
    // and official-size dots vanish at 16px). See preview/starlink-compare.png for A vs B.
    starlink: `<g transform="translate(12,12) scale(0.348) translate(-103.19,-49)" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M 133.52588,49.312842 A 30.33927,30.612972 0 0 1 102.7941,79.388922 30.33927,30.612972 0 0 1 72.853116,48.511427 30.33927,30.612972 0 0 1 103.32361,18.165891 30.33927,30.612972 0 0 1 133.5305,48.778572"/>
      <path d="M 129.16394,54.807626 A 25.98844,25.033722 0 0 1 102.83928,79.402305 25.98844,25.033722 0 0 1 77.192009,54.15227 25.98844,25.033722 0 0 1 103.29285,29.337244 25.98844,25.033722 0 0 1 129.1679,54.370728"/>
      <path d="M 122.97742,49.383246 A 19.801708,19.721062 0 0 1 102.91953,68.758438 19.801708,19.721062 0 0 1 83.377772,48.86697 19.801708,19.721062 0 0 1 103.26513,29.318192 a 19.801708,19.721062 0 0 1 19.7153,19.720874"/>
      <circle cx="103.19055" cy="29.241154" r="4.5" fill="currentColor" stroke="none"/>
      <circle cx="103.20589" cy="49.074612" r="5.3" fill="currentColor" stroke="none"/>
      <circle cx="103.17043" cy="79.370766" r="4.1" fill="currentColor" stroke="none"/>
    </g>`,
    x: p(SI.x),
    openai: p(SI.openai),
    paypal: p(SI.paypal),
    // Energy: Tesla T as the main, centered mark; small bolt offset to the right.
    energy: `<g transform="translate(-0.2,0.2) scale(0.86)">${p(SI.tesla)}</g><path d="M20.4 8.2 18.6 12.4h1.7L17.2 18.8l1.3-4.1h-1.8L20.4 8.2z"/>`,
    // Official Neuralink symbol from the neuralink.com header (26 Nov 2026).
    // Trademark of Neuralink Corp. Older Wikimedia wordmark is PD-textlogo but
    // unreadable at this size, so the official compact emblem is used instead.
    neuralink: `<g transform="translate(0.6,4.88) scale(0.4071)"><path fill="currentColor" fill-rule="evenodd" d="M30.8777 22.4886H0.705078L22.5011 2.28693C24.3585 0.565492 27.0293 -0.000275522 29.47 0.809903C31.9102 1.62058 33.6439 3.6498 33.994 6.10498L37.476 30.5019C37.5803 31.2306 38.0767 31.8049 38.8036 32.0367C39.5305 32.2696 40.2868 32.0946 40.8255 31.572L50.1712 22.4886H39.4676L39.1096 20.2688H55.7051L42.4717 33.131C41.6499 33.9302 40.5593 34.3566 39.4367 34.3566C38.9823 34.3566 38.5221 34.2862 38.073 34.1429C36.5143 33.6455 35.4074 32.3656 35.1842 30.8031L31.7021 6.40672C31.4673 4.75921 30.3499 3.45166 28.7127 2.90802C27.0759 2.36337 25.3548 2.72899 24.108 3.88365L6.42923 20.2688H30.5522L30.8777 22.4886Z"/></g>`,
    // The Boring Company wordmark vanishes at this size; tunnel portal mark instead.
    boring: opt(`<path d="M4 20V11.2A8 8 0 0 1 20 11.2V20" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round"/><path d="M8 20V12.1a4 4 0 0 1 8 0V20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round"/><path d="M4 20h16" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round"/>`, 1.09),
    // Official xAI mark. Source: Wikimedia Commons File:XAI-Logo.svg (from x.ai).
    // PD-textlogo / simple geometry; trademark of xAI (X.AI Corp.).
    xai: `<g fill="currentColor"><polygon points="0.12 182.71 234.14 516.92 338.15 516.92 104.13 182.71 0.12 182.71"/><polygon points="0 516.92 104.08 516.92 156.08 442.67 104.04 368.34 0 516.92"/><polygon points="466.04 0 361.96 0 182.1 256.86 234.15 331.18 466.04 0"/><polygon points="380.78 516.92 466.04 516.92 466.04 37.16 380.78 158.92 380.78 516.92"/></g>`,
    // DOGE (Department of Government Efficiency): shield with a D. Not on a rail slot (no DOGE section).
    doge: `<path d="M12 2.2l7.2 3v7.3c0 4.4-3 7.6-7.2 9.5-4.2-1.9-7.2-5.1-7.2-9.5V5.2L12 2.2z"/><path d="M10 8.1h2.4c2.15 0 3.5 1.35 3.5 3.4s-1.35 3.4-3.5 3.4H10V8.1zm1.55 1.45v3.9h.85c1.2 0 1.9-.7 1.9-1.95s-.7-1.95-1.9-1.95h-.85z" fill="#0b1220"/>`
  };
  // Generic monochrome marks for remaining sections (not company sub-topics).
  const GENERIC = {
    summary: opt(p("M12 3.2 14.2 9h6.3l-5.1 3.8 1.9 6.2L12 15.6 6.7 19l1.9-6.2L3.5 9h6.3z"), 1.20),
    contested: opt(`<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 8v5M12 16.5h.01" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>`, 1.15),
    speech: LOGOS.x,
    style: opt(`<circle cx="7.5" cy="8" r="3.35"/><circle cx="16.5" cy="8" r="3.35"/><path d="M3 19c1.3-3.4 3.5-5 4.5-5s3.2 1.6 4.5 5M12 19c1.3-3.4 3.5-5 4.5-5s3.2 1.6 4.5 5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>`, 1.04),
    timelines: opt(`<rect x="4" y="5" width="16" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M8 3v4M16 3v4M4 10h16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>`, 1.09),
    lawsuits: opt(`<g fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4.6v13.6M7.2 20.4h9.6"/><path d="M12 4.6 4.4 8.4h15.2z" /><path d="M5.4 8.4 3.4 13.4c0 .15 1.9 1.35 3.6 1.35s3.6-1.2 3.6-1.35L8.6 8.4"/><path d="M15.4 8.4 13.4 13.4c0 .15 1.9 1.35 3.6 1.35s3.6-1.2 3.6-1.35L18.6 8.4"/></g>`, 1.08),
    criticism: opt(`<g fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M3.8 9h4.2l9.2-4.8v15.6L8 15H3.8z"/><path d="M8.2 15.2v3.4l-2.8 1.2"/><path d="M19.2 10c1.15.7 1.15 3.3 0 4"/></g>`, 1.14),
    scorecard: opt(`<path d="M5 12l4 4 10-10M4 19h16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`, 1.15),
    human: opt(`<circle cx="9.3" cy="7.8" r="3.2"/><path d="M3.5 19.8c0-3.6 2.6-5.8 5.8-5.8s5.8 2.2 5.8 5.8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M15.05 9.55c0-2.05 1.75-3.25 3.25-1.95 1.5-1.3 3.25-.15 3.25 1.95 0 2.35-3.25 4.55-3.25 4.55s-3.25-2.2-3.25-4.55z" fill="currentColor"/>`, 1.08),
    note: `<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="M8.6 14.2c-2.1 0-3.8-1.6-3.8-3.6 0-1.6 1.1-3 2.6-3.5.5-2.1 2.4-3.5 4.6-3.5 1.6 0 3 .7 3.9 1.9 1.2-.8 2.9-.6 3.9.7 1.1.4 1.9 1.6 1.9 2.9 0 1.8-1.4 3.3-3.1 3.5-.3 1.6-1.8 2.8-3.6 2.8-1.1 0-2.1-.5-2.8-1.2-.7.6-1.6.9-2.6.9z"/><circle cx="6.7" cy="16.8" r="1.5"/><circle cx="4.3" cy="20.15" r=".9"/></g>`,
    sources: opt(`<path d="M7 4h8a2 2 0 0 1 2 2v14l-6-2-6 2V6a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`, 1.16),
    credits: opt(`<rect x="4" y="6" width="16" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="9" cy="11" r="1.6"/><path d="M4 16l4.5-3.5L13 16l3-2.5 4 3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>`, 1.16)
  };
  // OpenAI + xAI share one section: both marks, side by side.
  LOGOS.openai_xai = `<g transform="translate(0.05,5.2) scale(0.55)">${LOGOS.openai}</g><g transform="translate(13.15,5.2) scale(0.02553)">${LOGOS.xai}</g>`;

  const BY_ID = {
    'tesla-and-the-ev-push': LOGOS.tesla,
    'spacex': LOGOS.spacex,
    'starlink': LOGOS.starlink,
    'starlink-in-ukraine': LOGOS.starlink, // reuse Starlink logo; not shown on the hold rail
    'energy': LOGOS.energy,
    'neuralink': LOGOS.neuralink,
    'the-boring-company': LOGOS.boring,
    'openai-and-xai': LOGOS.openai_xai,
    'paypal': LOGOS.paypal,
    'free-speech-vs-cancel-culture': LOGOS.x,
    'summary': GENERIC.summary,
    'contested-stories': GENERIC.contested,
    'his-public-style': GENERIC.style,
    'timelines': GENERIC.timelines,
    'lawsuits': GENERIC.lawsuits,
    'timeline-of-criticism': GENERIC.criticism,
    'scorecard': GENERIC.scorecard,
    'the-human-side': GENERIC.human,
    'personal-note': GENERIC.note,
    'sources': GENERIC.sources,
    'image-credits': GENERIC.credits
  };
  const FALLBACK = `<circle cx="12" cy="12" r="3"/>`;
  const svgFor = id => '<svg class="sk-logo' + (id==='spacex' ? ' is-spacex' : '') + '" viewBox="0 0 24 24" overflow="visible" aria-hidden="true">' + (BY_ID[id] || FALLBACK) + '</svg>';

  // Desktop (>=901px): icons + glow pill on the "On this page" list. No scroll knob.
  const decorateSidenav = () => {
    const nav = document.querySelector('.sidenav');
    if (!nav) return;
    nav.classList.add('sk-side');
    nav.querySelectorAll('a[href^="#"]').forEach(a => {
      const id = decodeURIComponent((a.getAttribute('href') || '').slice(1));
      if (!id || a.querySelector('.sk-logo')) return;
      a.insertAdjacentHTML('afterbegin', svgFor(id));
      const label = document.createElement('span');
      label.className = 'sk-slabel';
      while (a.childNodes.length > 1) label.appendChild(a.childNodes[1]);
      a.appendChild(label);
    });
  };
  const mq = matchMedia('(max-width:900px)');
  if (!mq.matches) { decorateSidenav(); return; }

  const sections = [...document.querySelectorAll('main section[id]')];
  if (!sections.length) return;

  // Hold rail omits Starlink in Ukraine (and would omit any Tesla sub-topic).
  const LIST_ONLY = new Set(['starlink-in-ukraine']);

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Default look is option A. ?bubble=a|b|c|d is still honoured if present, otherwise ignored.
  const params = new URLSearchParams(location.search);
  const bubbleOpt = /^[abcd]$/.test(params.get('bubble') || '') ? params.get('bubble') : 'a';
  const root = document.createElement('div');
  root.className = 'scroll-knob';
  root.dataset.bubble = bubbleOpt;
  root.innerHTML = `<div class="sk-wash" aria-hidden="true"></div>
    <div class="sk-rail" hidden role="menu" aria-label="On this page"></div>
    <button type="button" class="sk-thumb" aria-label="Scroll position. Tap for the list of sections, or hold and drag to move through the page." aria-haspopup="true" aria-expanded="false">
      <span class="sk-flare sk-flare-a" aria-hidden="true"></span>
      <span class="sk-flare sk-flare-b" aria-hidden="true"></span>
      <span class="sk-flare sk-flare-c" aria-hidden="true"></span>
    </button>
    <div class="sk-hint" hidden aria-hidden="true"></div>`;
  document.body.append(root);
  const rail = root.querySelector('.sk-rail');
  const thumb = root.querySelector('.sk-thumb');
  const hintEl = root.querySelector('.sk-hint');

  const titleOf = sec => {
    const a = document.querySelector('.sidenav a[href="#' + sec.id + '"], .navmenu a[href="#' + sec.id + '"]');
    return ((a && a.textContent) || (sec.querySelector('h2') || {}).textContent || sec.id).trim();
  };
  const icons = sections.map(sec => {
    const a = document.createElement('a');
    a.className = 'sk-icon' + (LIST_ONLY.has(sec.id) ? ' is-list-only' : '');
    a.href = '#' + sec.id;
    a.dataset.id = sec.id;
    const title = titleOf(sec);
    a.setAttribute('role', 'menuitem');
    a.setAttribute('aria-label', title);
    a.dataset.title = title;
    a.innerHTML = '<span class="sk-name"></span><span class="sk-mi">' + svgFor(sec.id) + '</span>';
    a.querySelector('.sk-name').textContent = title;
    a.addEventListener('click', e => { e.preventDefault(); jump(sec); });
    rail.append(a);
    return { el: a, sec, title, rail: !LIST_ONLY.has(sec.id) };
  });
  const railIcons = icons.filter(it => it.rail);

  const jump = sec => {
    closeMenu();
    release();
    sec.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  let padTop = 0, padBot = 0, track = 1, docH = 1, viewH = 1, maxY = 1;
  const docEl = document.documentElement;
  let pendingY = null, scrubRaf = 0;
  let dismissHint = () => {};
  let holding = false, menuOpen = false, holdTimer = 0, foldTimer = 0, moved = false, startY = 0, startX = 0;

  // Icons on the hold rail follow a circular/cosine arc around the bubble, then return to the right edge.
  const ARC_R = 86, ARC_X = 66;
  const arcOffset = dy => {
    const u = Math.abs(dy) / ARC_R;
    if (u >= 1) return 0;
    const circ = Math.sqrt(1 - u * u);           // circular falloff (arc around the bubble)
    const cos = 0.5 + 0.5 * Math.cos(Math.PI * u); // smooth cosine falloff
    return ARC_X * (0.72 * circ + 0.28 * cos);
  };

  const layoutMap = () => {
    railIcons.forEach(it => {
      const top = it.sec.getBoundingClientRect().top + scrollY;
      it.t = Math.min(1, Math.max(0, top / docH));
      it.y = padTop + it.t * track;
    });
    const gap = 32;
    for (let i = 1; i < railIcons.length; i++) if (railIcons[i].y < railIcons[i-1].y + gap) railIcons[i].y = railIcons[i-1].y + gap;
    const floor = padTop + track;
    if (railIcons.length && railIcons[railIcons.length-1].y > floor) {
      railIcons[railIcons.length-1].y = floor;
      for (let i = railIcons.length - 2; i >= 0; i--) if (railIcons[i].y > railIcons[i+1].y - gap) railIcons[i].y = railIcons[i+1].y - gap;
    }
    if (railIcons.length && railIcons[0].y < padTop) {
      railIcons[0].y = padTop;
      for (let i = 1; i < railIcons.length; i++) if (railIcons[i].y < railIcons[i-1].y + gap) railIcons[i].y = railIcons[i-1].y + gap;
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
    if (!menuOpen && !root.classList.contains('is-folding')) railIcons.forEach(it => { it.el.style.top = it.y + 'px'; });
  };

  const progress = () => Math.min(1, Math.max(0, scrollY / maxY));
  const placeThumb = p => {
    const y = `translate3d(0,${(padTop + p * track).toFixed(1)}px,0)`;
    thumb.style.transform = y;
    hintEl.style.transform = y;
  };
  const currentAt = p => {
    let cur = railIcons[0] || icons[0];
    for (const it of railIcons) if (p + 0.012 >= it.t) cur = it;
    return cur;
  };

  const paint = p => {
    placeThumb(p);
    const cur = currentAt(p);
    const thumbY = padTop + p * track;
    icons.forEach(it => {
      if (menuOpen) {
        if (it.arc) { it.el.style.setProperty('--sk-arc', '0px'); it.arc = 0; }
        it.el.classList.toggle('is-current', it === cur || it.sec.id === cur.sec.id);
        it.el.classList.remove('is-arc');
        return;
      }
      if (!it.rail) return;
      const o = holding ? arcOffset(it.y - thumbY) : 0;
      const r = Math.round(o * 10) / 10;
      if (r !== it.arc) {                       // write only when the offset changed
        it.arc = r;
        it.el.style.setProperty('--sk-arc', r ? `${-r}px` : '0px');
        it.el.classList.toggle('is-arc', r > ARC_X * 0.2);
      }
      it.el.classList.toggle('is-current', it === cur);
    });
  };

  let scrollRaf = 0;
  const onScroll = () => {
    if (holding || scrollRaf) return;
    scrollRaf = requestAnimationFrame(() => { scrollRaf = 0; if (!holding) paint(progress()); });
  };

  const setHeld = on => {
    if (on) dismissHint();
    holding = on;
    docEl.classList.toggle('sk-scrubbing', on);
    if (on) { closeMenu(true); measure(); rail.hidden = false; }
    else { pendingY = null; }
    root.classList.toggle('is-held', on);
    if (!on && !menuOpen) {
      railIcons.forEach(it => { it.arc = 0; it.el.style.setProperty('--sk-arc', '0px'); it.el.classList.remove('is-arc'); });
      rail.hidden = true;
    }
    thumb.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (on) paint(progress());
  };

  const FOLD_MS = 340;
  const rowStagger = (it, thumbY) => Math.round(Math.abs((it.listY ?? it.y) - thumbY) / 34) * 14;
  const clearFoldStyles = () => {
    icons.forEach(it => {
      const st = it.el.style;
      st.transition = ''; st.transitionDelay = ''; st.willChange = '';
      st.transform = ''; st.opacity = ''; st.visibility = ''; st.pointerEvents = '';
    });
  };

  const openMenu = () => {
    if (holding) return;
    dismissHint();
    clearTimeout(foldTimer);
    measure();
    const p = progress();
    const thumbY = padTop + p * track;
    rail.hidden = false;
    layoutList(p);
    menuOpen = true;
    root.classList.add('is-menu', 'is-unfolding');
    root.classList.remove('is-folding');
    thumb.setAttribute('aria-expanded', 'true');
    paint(p);
    let maxDelay = 0;
    icons.forEach(it => {
      const delay = rowStagger(it, thumbY);
      if (delay > maxDelay) maxDelay = delay;
      const st = it.el.style;
      st.visibility = '';
      st.pointerEvents = 'none';
      st.willChange = 'transform, opacity';
      st.transition = 'none';
      st.transitionDelay = '0s';
      st.top = it.listY + 'px';
      st.transform = `translate3d(0, ${(thumbY - it.listY).toFixed(1)}px, 0)`;
      st.opacity = '0';
      it._delay = delay;
    });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!menuOpen) return;
        icons.forEach(it => {
          const st = it.el.style;
          st.transition = `transform ${FOLD_MS}ms ease, opacity ${Math.round(FOLD_MS * 0.85)}ms ease`;
          st.transitionDelay = it._delay + 'ms';
          st.transform = 'translate3d(0,0,0)';
          st.opacity = '';
        });
      });
    });
    foldTimer = setTimeout(() => {
      if (!menuOpen) return;
      root.classList.remove('is-unfolding');
      icons.forEach(it => {
        const st = it.el.style;
        st.transition = ''; st.transitionDelay = ''; st.willChange = '';
        st.transform = ''; st.pointerEvents = '';
      });
    }, FOLD_MS + maxDelay + 40);
  };

  const closeMenu = instant => {
    if (!menuOpen && !root.classList.contains('is-unfolding') && !root.classList.contains('is-folding')) {
      root.classList.remove('is-menu');
      return;
    }
    menuOpen = false;
    thumb.setAttribute('aria-expanded', 'false');
    const thumbY = padTop + progress() * track;
    if (instant || reduce) {
      root.classList.remove('is-menu', 'is-folding', 'is-unfolding');
      clearFoldStyles();
      if (!holding) rail.hidden = true;
      measure();
      return;
    }
    clearTimeout(foldTimer);
    root.classList.add('is-folding');
    let maxDelay = 0;
    icons.forEach(it => {
      const delay = rowStagger(it, thumbY);
      if (delay > maxDelay) maxDelay = delay;
      it._delay = delay;
      const st = it.el.style;
      st.willChange = 'transform, opacity';
      st.pointerEvents = 'none';
      st.transition = 'none';
      st.transitionDelay = '0s';
      st.top = (it.listY ?? it.y) + 'px';
      st.transform = 'translate3d(0,0,0)';
      st.opacity = '0.92';
    });
    root.classList.remove('is-menu', 'is-unfolding');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (menuOpen || !root.classList.contains('is-folding')) return;
        icons.forEach(it => {
          const st = it.el.style;
          const y = it.listY ?? it.y;
          st.transition = `transform ${FOLD_MS}ms ease, opacity ${Math.round(FOLD_MS * 0.75)}ms ease`;
          st.transitionDelay = it._delay + 'ms';
          st.transform = `translate3d(0, ${(thumbY - y).toFixed(1)}px, 0)`;
          st.opacity = '0';
        });
      });
    });
    foldTimer = setTimeout(() => {
      root.classList.remove('is-folding');
      icons.forEach(it => { it.el.style.visibility = 'hidden'; it.el.style.pointerEvents = 'none'; });
      if (!holding && !menuOpen) rail.hidden = true;
      clearFoldStyles();
      measure();
    }, FOLD_MS + maxDelay + 80);
  };

  const yToProgress = clientY => Math.min(1, Math.max(0, (clientY - padTop) / track));
  // Immediate scrub: the latest pointer Y is applied once per frame with an instant jump.
  // (scrollTo behavior:'auto' defers to html{scroll-behavior:smooth}, which eased every move.)
  const flushScrub = () => {
    scrubRaf = 0;
    if (pendingY === null || !holding) return;
    const p = yToProgress(pendingY);
    scrollTo({ top: p * maxY, behavior: 'instant' });
    paint(p);
  };
  const scrub = clientY => {
    pendingY = clientY;
    if (!scrubRaf) scrubRaf = requestAnimationFrame(flushScrub);
  };

  const release = ev => {
    clearTimeout(holdTimer); holdTimer = 0;
    const wasHeld = holding;
    if (holding && pendingY !== null) flushScrub();
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

  // First-visit hint: a slow breath on the bubble plus a small tip. Shown once, then
  // remembered in localStorage. Fades out after a hold, or after 4s of no use.
  const HINT_KEY = 'sk-bubble-hint';
  const hintSeen = () => { try { return localStorage.getItem(HINT_KEY) === '1'; } catch { return false; } };
  const hintMark = () => { try { localStorage.setItem(HINT_KEY, '1'); } catch {} };
  let hintTimer = 0;
  dismissHint = () => {
    if (!root.classList.contains('is-hint')) return;
    clearTimeout(hintTimer);
    hintMark();
    root.classList.remove('is-hint');
    root.classList.add('is-hint-out');
    setTimeout(() => {
      root.classList.remove('is-hint-out');
      hintEl.hidden = true;
    }, 1500);
  };
  if (!hintSeen()) {
    const nl = (document.documentElement.lang || '').toLowerCase().startsWith('nl') || /\/nl(\/|$)/.test(location.pathname);
    hintEl.textContent = nl ? 'Vasthouden om te scrollen · tik voor secties' : 'Hold to scrub · tap for sections';
    hintEl.hidden = false;
    root.classList.add('is-hint');
    hintTimer = setTimeout(dismissHint, 4000);
  }
})();
