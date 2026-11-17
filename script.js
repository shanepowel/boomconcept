const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');

if (menuButton && mainNav) {
  const page = document.body.dataset.page;
  const activeLink = mainNav.querySelector(`[data-nav="${page}"]`);
  activeLink?.setAttribute('aria-current', 'page');

  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    mainNav.classList.remove('is-open');
  };

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    mainNav.classList.toggle('is-open', !isOpen);
  });

  mainNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', (event) => {
    if (menuButton.getAttribute('aria-expanded') === 'true' && !event.target.closest('.site-header')) closeMenu();
  });
}

const therapySearch = document.querySelector('#therapy-search');
const therapyRows = [...document.querySelectorAll('.therapy-item')];
const therapyCount = document.querySelector('#therapy-count');
const noResults = document.querySelector('#no-results');

if (therapySearch && therapyCount && noResults) {
  therapySearch.addEventListener('input', () => {
    const query = therapySearch.value.trim().toLocaleLowerCase('en-GB');
    let visibleCount = 0;

    therapyRows.forEach((row) => {
      const content = `${row.dataset.therapy} ${row.textContent}`.toLocaleLowerCase('en-GB');
      const matches = content.includes(query);
      row.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    therapyCount.textContent = query
      ? `${visibleCount} ${visibleCount === 1 ? 'specialism' : 'specialisms'} found`
      : `${therapyRows.length} specialisms across 70+ therapy areas`;
    noResults.hidden = visibleCount !== 0;
  });
}

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!motionPreference.matches && 'IntersectionObserver' in window) {
  const revealTargets = document.querySelectorAll('main > section:not(.hero)');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealTargets.forEach((target) => {
    target.classList.add('reveal-ready');
    revealObserver.observe(target);
  });

  const countTargets = document.querySelectorAll('.proof-item strong[data-count]');
  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = entry.target;
      const end = Number(target.dataset.count);
      const prefix = target.dataset.prefix || '';
      const startTime = performance.now();
      const duration = 850;
      const update = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(end * eased).toLocaleString('en-GB');
        target.textContent = `${prefix}${value}`;
        if (progress < 1) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
      observer.unobserve(target);
    });
  }, { threshold: 0.7 });
  countTargets.forEach((target) => countObserver.observe(target));
}
