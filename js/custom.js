 (function () {
      const THEME_KEY = 'site-theme'; // localStorage key
      const html = document.documentElement;
      const btn = document.getElementById('themeToggle');
      const icon = document.getElementById('themeIcon');

      // Determine initial theme:
      function getPreferredTheme() {
        // 1) saved in localStorage
        const saved = localStorage.getItem(THEME_KEY);
        if (saved === 'light' || saved === 'dark') return saved;

        // 2) follow OS preference if available
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return 'dark';
        }

        // 3) default to light
        return 'light';
      }

      // Apply theme to document
      function applyTheme(theme) {
        if (theme === 'dark') {
          html.setAttribute('data-theme', 'dark');
          icon.classList.remove('fa-sun');
          icon.classList.add('fa-moon');
          icon.setAttribute('title', 'Switch to light mode');
        } else {
          html.setAttribute('data-theme', 'light');
          icon.classList.remove('fa-moon');
          icon.classList.add('fa-sun');
          icon.setAttribute('title', 'Switch to dark mode');
        }
      }

      // Toggle and persist
      function toggleTheme() {
        const current = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try {
          localStorage.setItem(THEME_KEY, next);
        } catch (e) {
          // ignore storage failures (e.g., private mode)
        }
      }

      // Initialize
      const initial = getPreferredTheme();
      applyTheme(initial);

      // Button handler
      btn.addEventListener('click', toggleTheme);

      // If user OS preference changes while page open, update unless user saved a preference
      if (window.matchMedia) {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        mq.addEventListener('change', (e) => {
          // only react if user hasn't explicitly set a theme
          if (!localStorage.getItem(THEME_KEY)) {
            applyTheme(e.matches ? 'dark' : 'light');
          }
        });
      }
    })();