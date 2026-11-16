document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cafeCards = document.querySelectorAll('.cafe-card');
  const emptyState = document.getElementById('empty-state');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedTag = btn.getAttribute('data-filter');
      let visibleCount = 0;

      cafeCards.forEach((card) => {
        const rawTags = card.getAttribute('data-tags') || '';
        const cardTags = rawTags.split(',').map((t) => t.trim());

        if (selectedTag === 'all' || cardTags.includes(selectedTag)) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      if (emptyState) {
        if (visibleCount === 0) {
          emptyState.classList.add('visible');
        } else {
          emptyState.classList.remove('visible');
        }
      }
    });
  });
});
