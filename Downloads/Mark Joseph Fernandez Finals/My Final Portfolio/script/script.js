'use strict';

// Navigation stays available without JavaScript.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');
if (menuButton && navigation) {
  const smallScreen = window.matchMedia('(max-width: 600px)');
  const setMenuOpen = (open) => {
    navigation.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.innerHTML = open ? 'Close <span aria-hidden="true">✕</span>' : 'Menu <span aria-hidden="true">☰</span>';
  };
  const syncNavigation = () => {
    const focusInMenu = navigation.contains(document.activeElement);
    const focusOnButton = document.activeElement === menuButton;
    menuButton.hidden = !smallScreen.matches;
    setMenuOpen(!smallScreen.matches);
    if (smallScreen.matches && focusInMenu) menuButton.focus();
    if (!smallScreen.matches && focusOnButton) navigation.querySelector('a')?.focus();
  };
  menuButton.addEventListener('click', () => setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && smallScreen.matches && !navigation.hidden) {
      setMenuOpen(false);
      menuButton.focus();
    }
  });
  navigation.addEventListener('click', (event) => {
    if (smallScreen.matches && event.target.closest('a')) setMenuOpen(false);
  });
  document.addEventListener('click', (event) => {
    if (smallScreen.matches && !navigation.hidden && !event.target.closest('.site-nav')) setMenuOpen(false);
  });
  smallScreen.addEventListener('change', syncNavigation);
  syncNavigation();
}

document.querySelectorAll('[data-year]').forEach(element => {
  element.textContent = String(new Date().getFullYear());
});

// A project can belong to more than one platform.
const filterBar = document.querySelector('.filter-bar');
const projectCards = [...document.querySelectorAll('[data-category]')];
if (filterBar) {
  filterBar.hidden = false;
  filterBar.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    filterBar.querySelectorAll('[data-filter]').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    const filter = button.dataset.filter;
    let visibleCount = 0;
    projectCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category.split(' ').includes(filter);
      card.hidden = !show;
      if (show) { visibleCount++; card.classList.add('visible'); }
    });
    document.querySelector('[data-filter-status]').textContent = visibleCount + (visibleCount === 1 ? ' project shown.' : ' projects shown.');
  });
}

// Search all note text, including the practice examples.
const search = document.querySelector('#note-search');
if (search) {
  document.querySelector('.notes-search').hidden = false;
  const entries = [...document.querySelectorAll('.reading-entry')];
  search.addEventListener('input', () => {
    const term = search.value.toLocaleLowerCase().trim();
    let count = 0;
    entries.forEach(entry => {
      const match = entry.textContent.toLocaleLowerCase().includes(term);
      entry.hidden = !match;
      if (match) { count++; entry.classList.add('visible'); }
    });
    document.querySelector('[data-search-status]').textContent = term ? count + (count === 1 ? ' note found.' : ' notes found.') : '';
    document.querySelector('.empty-state').hidden = count !== 0;
  });
}

// Native dialog provides focus containment and Escape handling.
const dialog = document.querySelector('.image-dialog');
if (dialog && typeof dialog.showModal === 'function') {
  let previewTrigger;
  document.querySelectorAll('[data-preview]').forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      previewTrigger = button;
      const image = dialog.querySelector('img');
      image.src = button.dataset.preview;
      image.alt = button.querySelector('img').alt;
      dialog.querySelector('h2').textContent = button.dataset.caption;
      dialog.showModal();
    });
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => previewTrigger?.focus({preventScroll: true}));
} else {
  document.querySelectorAll('[data-preview]').forEach(button => {
    button.addEventListener('click', () => { window.location.href = button.dataset.preview; });
  });
}

// One-time entrances; respect reduced motion and keep content visible by default.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.05});
  document.querySelectorAll('.project-card, .about-story, .toolkit-grid, .education-section, .reading-entry, .contact-banner').forEach(element => {
    element.classList.add('reveal');
    observer.observe(element);
  });
  document.documentElement.classList.add('motion-ready');
  reducedMotion.addEventListener('change', event => {
    if (event.matches) {
      document.documentElement.classList.remove('motion-ready');
      observer.disconnect();
    }
  });
}
