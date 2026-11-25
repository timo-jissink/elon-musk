// Highlights the current section in the side nav. That's all the JS there is.
(() => {
  const links = [...document.querySelectorAll('.sidenav a, .navmenu a')];
  const byId = id => links.filter(a => a.getAttribute('href') === '#' + id);
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { links.forEach(a => a.classList.remove('active')); byId(e.target.id).forEach(a => a.classList.add('active')); }
  }), { rootMargin: '-30% 0px -65% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => io.observe(s));
  document.querySelectorAll('.navmenu a').forEach(a => a.addEventListener('click', () => a.closest('details').open = false));
})();
