const navToggle = document.querySelector('.nav-toggle');
const navPanel = document.querySelector('.nav-panel');
const header = document.querySelector('.site-header');
const filterButtons = document.querySelectorAll('.filter-btn');

const handleHeaderScroll = () => {
  const isScrolled = window.scrollY > 20;
  header.classList.toggle('is-scrolled', isScrolled);
};

const toggleMenu = () => {
  const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isExpanded));
  navPanel.classList.toggle('is-open');
};

if (navToggle && navPanel) {
  navToggle.addEventListener('click', toggleMenu);
  navPanel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navPanel.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

window.addEventListener('scroll', handleHeaderScroll, { passive: true });
handleHeaderScroll();

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });

    const cards = document.querySelectorAll('.room-card');
    cards.forEach((card) => {
      const category = card.dataset.category;
      const matches = selected === 'all' || category === selected;
      card.style.display = matches ? '' : 'none';
    });
  });
});
