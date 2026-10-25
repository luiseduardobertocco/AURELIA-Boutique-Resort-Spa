const galleryModule = {
  init() {
    const items = document.querySelectorAll('.gallery-item');
    if (!items.length) return;

    items.forEach((item) => {
      item.addEventListener('click', () => {
        const title = item.dataset.title || 'Gallery item';
        const description = item.dataset.description || 'Image from Aurelia resort';
        console.info(`Gallery clicked: ${title} — ${description}`);
      });
    });
  },
};

document.addEventListener('DOMContentLoaded', () => {
  galleryModule.init();
});
