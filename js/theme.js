const themeModule = {
  storageKey: 'aurelia-theme',

  getPreferredTheme() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved === 'light' || saved === 'dark') return saved;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  },

  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const toggle = document.querySelector('.theme-toggle');
    const label = toggle?.querySelector('.theme-toggle__label');

    if (label) {
      label.textContent = theme === 'dark' ? 'Dark' : 'Light';
    }

    if (toggle) {
      const isDark = theme === 'dark';
      toggle.setAttribute('aria-pressed', String(isDark));
      toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  },

  init() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    const initialTheme = this.getPreferredTheme();
    this.apply(initialTheme);

    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      this.apply(nextTheme);
      localStorage.setItem(this.storageKey, nextTheme);
    });
  },
};

document.addEventListener('DOMContentLoaded', () => {
  themeModule.init();
});
