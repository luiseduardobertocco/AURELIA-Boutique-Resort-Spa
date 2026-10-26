const galleryModule = {
  init() {
    const items = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const prevBtn = document.querySelector('[data-direction="prev"]');
    const nextBtn = document.querySelector('[data-direction="next"]');
    const closeBtn = document.querySelector('.lightbox__close');
    const backdrop = document.querySelector('.lightbox__backdrop');

    if (!items.length || !lightbox || !lightboxImage || !lightboxTitle || !lightboxDescription) return;

    const galleryItems = Array.from(items);
    let activeIndex = 0;

    const openLightbox = (index) => {
      activeIndex = index;
      const item = galleryItems[index];
      if (!item) return;

      const imageSrc = item.dataset.image || '';
      const title = item.dataset.title || 'Gallery image';
      const description = item.dataset.description || 'Resort image';

      lightboxImage.src = imageSrc;
      lightboxImage.alt = title;
      lightboxTitle.textContent = title;
      lightboxDescription.textContent = description;
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.hidden = true;
      document.body.style.overflow = '';
    };

    const swapImage = (direction) => {
      const nextIndex = direction === 'next'
        ? (activeIndex + 1) % galleryItems.length
        : (activeIndex - 1 + galleryItems.length) % galleryItems.length;
      openLightbox(nextIndex);
    };

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => openLightbox(index));
    });

    closeBtn.addEventListener('click', closeLightbox);
    backdrop.addEventListener('click', (event) => {
      if (event.target.dataset.close === 'true') closeLightbox();
    });

    prevBtn.addEventListener('click', () => swapImage('prev'));
    nextBtn.addEventListener('click', () => swapImage('next'));

    document.addEventListener('keydown', (event) => {
      if (lightbox.hidden) return;
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') swapImage('prev');
      if (event.key === 'ArrowRight') swapImage('next');
    });
  },
};

document.addEventListener('DOMContentLoaded', () => {
  galleryModule.init();
});
