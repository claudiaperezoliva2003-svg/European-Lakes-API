/* ============================================
   European Lakes Explorer — main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------
     Smooth scroll for internal anchor links
  ------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80, // offset for fixed nav height
          behavior: 'smooth'
        });
      }
    });
  });


  /* ------------------------------------------
     Hero background parallax on scroll
  ------------------------------------------ */
  const heroBg = document.querySelector('.hero__bg-image');

  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.15}px)`;
    }, { passive: true });
  }


  /* ------------------------------------------
     Gallery live search / filter
  ------------------------------------------ */
  const searchInput = document.querySelector('.gallery__search');
  const lakeCards  = document.querySelectorAll('.lake-card');

  if (searchInput && lakeCards.length) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();

      lakeCards.forEach(card => {
        const name     = card.querySelector('.lake-card__name')?.textContent.toLowerCase()     ?? '';
        const location = card.querySelector('.lake-card__location')?.textContent.toLowerCase() ?? '';
        const matches  = name.includes(query) || location.includes(query);

        card.style.display = matches ? '' : 'none';
      });
    });
  }


  /* ------------------------------------------
     Register form — basic submit handler
     (replace with real API call as needed)
  ------------------------------------------ */
  const registerForm = document.querySelector('.register-form');

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(registerForm);
      const data = Object.fromEntries(formData.entries());

      console.log('New lake discovery submitted:', data);

      // TODO: POST data to /api/v1/lakes
      // fetch('/api/v1/lakes', { method: 'POST', body: JSON.stringify(data) ... })

      // Temporary visual feedback
      const submitBtn = registerForm.querySelector('.btn-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '✓ Added to Database';
      submitBtn.style.background = '#00897b';

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        registerForm.reset();
      }, 2500);
    });
  }


  /* ------------------------------------------
     Lake card action buttons
  ------------------------------------------ */
  document.querySelectorAll('.lake-card__action-btn--edit').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.currentTarget.closest('.lake-card');
      const name = card.querySelector('.lake-card__name')?.textContent;
      console.log('Edit lake:', name);
      // TODO: open edit modal or navigate to edit page
    });
  });

  document.querySelectorAll('.lake-card__action-btn--delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.currentTarget.closest('.lake-card');
      const name = card.querySelector('.lake-card__name')?.textContent;
      if (confirm(`Remove "${name}" from the database?`)) {
        card.style.transition = 'opacity 0.4s, transform 0.4s';
        card.style.opacity    = '0';
        card.style.transform  = 'scale(0.9)';
        setTimeout(() => card.remove(), 400);
      }
    });
  });


  /* ------------------------------------------
     API endpoint rows — copy path on click
  ------------------------------------------ */
  document.querySelectorAll('.api-endpoint').forEach(row => {
    row.addEventListener('click', () => {
      const path = row.querySelector('.api-endpoint__path')?.textContent?.trim();
      if (!path) return;

      navigator.clipboard.writeText(path).then(() => {
        const originalDesc = row.querySelector('.api-endpoint__desc')?.textContent;
        const descEl = row.querySelector('.api-endpoint__desc');
        if (descEl) {
          descEl.textContent = 'Copied!';
          setTimeout(() => { descEl.textContent = originalDesc; }, 1500);
        }
      }).catch(() => {});
    });
  });

});