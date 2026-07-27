document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Theme Toggle (Light / Dark Mode)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    if (themeLabel) {
      themeLabel.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }
  }

  // Initialize theme
  const initialTheme = getPreferredTheme();
  setTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || initialTheme;
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // --------------------------------------------------------------------------
  // 2. Populate Featured Papers from Full Publication List
  // --------------------------------------------------------------------------
  const featuredContainer = document.getElementById('featured-papers-container');
  const fullPubList = document.getElementById('full-pub-list');

  if (featuredContainer && fullPubList) {
    const featuredItems = fullPubList.querySelectorAll('.pub-item[data-featured="true"]');
    featuredContainer.innerHTML = '';
    
    if (featuredItems.length > 0) {
      featuredItems.forEach(item => {
        const clone = item.cloneNode(true);
        featuredContainer.appendChild(clone);
      });
    } else {
      featuredContainer.innerHTML = '<p style="color: var(--text-subtle);">No featured publications at this time.</p>';
    }
  }

  // --------------------------------------------------------------------------
  // 3. Scrollable Box Toggle ("Show More" / "Show Less")
  // --------------------------------------------------------------------------
  document.querySelectorAll('.btn-toggle-scroll').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const box = document.getElementById(targetId);
      if (box) {
        const isExpanded = box.classList.toggle('expanded');
        btn.textContent = isExpanded ? 'Show Less' : 'Show More';
      }
    });
  });

  // --------------------------------------------------------------------------
  // 4. BibTeX Toggle Event Delegation
  // --------------------------------------------------------------------------
  document.addEventListener('click', (e) => {
    const bibtexBtn = e.target.closest('.btn-bibtex');
    if (bibtexBtn) {
      e.preventDefault();
      const pubItem = bibtexBtn.closest('.pub-item');
      if (pubItem) {
        const bibtexBlock = pubItem.querySelector('.bibtex-block');
        if (bibtexBlock) {
          bibtexBlock.classList.toggle('active');
        }
      }
    }
  });

  // --------------------------------------------------------------------------
  // 5. Click-and-Drag Horizontal Scroll for Mobile Profile Navigation
  // --------------------------------------------------------------------------
  const profileNav = document.querySelector('.profile-nav');
  if (profileNav) {
    let isDown = false;
    let startX;
    let scrollLeft;

    profileNav.addEventListener('mousedown', (e) => {
      isDown = true;
      profileNav.classList.add('active-drag');
      startX = e.pageX - profileNav.offsetLeft;
      scrollLeft = profileNav.scrollLeft;
    });

    profileNav.addEventListener('mouseleave', () => {
      isDown = false;
      profileNav.classList.remove('active-drag');
    });

    profileNav.addEventListener('mouseup', () => {
      isDown = false;
      profileNav.classList.remove('active-drag');
    });

    profileNav.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - profileNav.offsetLeft;
      const walk = (x - startX) * 1.8;
      profileNav.scrollLeft = scrollLeft - walk;
    });
  }
});
