// Highlights the current section in the side nav, and keeps your place when you switch language (EN | NL).
(() => {
  const links = [...document.querySelectorAll('.sidenav a, .navmenu a')];
  const byId = id => links.filter(a => a.getAttribute('href') === '#' + id);
  let current = '';
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { current = e.target.id; links.forEach(a => a.classList.remove('active')); byId(e.target.id).forEach(a => a.classList.add('active')); }
  }), { rootMargin: '-30% 0px -65% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => io.observe(s));
  document.querySelectorAll('.navmenu a').forEach(a => a.addEventListener('click', () => a.closest('details').open = false));
  // Language switch: section ids are the same in both languages, so jump to the same section on the other page.
  document.querySelectorAll('[data-lang-switch]').forEach(a => a.addEventListener('click', () => {
    // Pick the last section whose top is above 30% of the screen (works even before the observer catches up).
    let id = '';
    if (window.scrollY > 300) document.querySelectorAll('main section[id]').forEach(s => { if (s.getBoundingClientRect().top < innerHeight * .3) id = s.id; });
    id = id || current || (location.hash || '').slice(1);
    a.href = a.getAttribute('href').split('#')[0] + (id ? '#' + id : '');
  }));
  // Open a folded block when a link points into it (e.g. the Starship card -> #starship-calc).
  const openTarget = () => { const id = decodeURIComponent(location.hash.slice(1)); const el = id && document.getElementById(id); if (!el) return;
    let d = el.closest('details'); if (!d) d = el.querySelector(':scope > details');
    for (; d; d = d.parentElement && d.parentElement.closest('details')) d.open = true;
    if (el.querySelector(':scope > details')) el.querySelector(':scope > details').open = true; };
  addEventListener('hashchange', openTarget); openTarget();
})();
