(function () {
  const dropdown = document.querySelector("[data-dropdown]");
  const toggle = document.querySelector("[data-dropdown-toggle]");
  const menu = document.querySelector("[data-dropdown-menu]");
  const mobileToggle = document.querySelector("[data-mobile-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const themeToggles = document.querySelectorAll("[data-theme-toggle]");
  const typingTarget = document.querySelector("[data-typing-target]");
  const themeStorageKey = "site-theme";

  function getPreferredTheme() {
    const saved = localStorage.getItem(themeStorageKey);
    if (saved === "dark" || saved === "light") {
      return saved;
    }

    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    themeToggles.forEach(function (btn) {
      const isDark = theme === "dark";
      const nextLabel = isDark ? "light" : "dark";
      btn.innerHTML = isDark
        ? '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4.5" stroke-width="2"></circle><path d="M12 2v2.2M12 19.8V22M4.9 4.9l1.5 1.5M17.6 17.6l1.5 1.5M2 12h2.2M19.8 12H22M4.9 19.1l1.5-1.5M17.6 6.4l1.5-1.5" stroke-width="2" stroke-linecap="round"></path></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 13.1A8.9 8.9 0 1 1 10.9 3c-.2.6-.3 1.2-.3 1.9 0 4.5 3.6 8.1 8.1 8.1.8 0 1.6-.1 2.3-.4Z" stroke-width="2" stroke-linejoin="round"></path></svg>';
      btn.setAttribute("aria-label", "Switch to " + nextLabel + " mode");
    });
  }

  function setTheme(theme) {
    localStorage.setItem(themeStorageKey, theme);
    applyTheme(theme);
  }

  applyTheme(getPreferredTheme());

  if (toggle && dropdown && menu) {
    toggle.addEventListener("click", function () {
      const isOpen = dropdown.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", function (event) {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        dropdown.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener("click", function () {
      const isOpen = mobileNav.classList.toggle("open");
      mobileToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  if (themeToggles.length > 0) {
    themeToggles.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
        setTheme(current === "dark" ? "light" : "dark");
      });
    });
  }

  if (typingTarget) {
    const phrases = [
      "Turning complex data into clear action",
      "Finding signal inside noisy datasets",
      "Building practical insights with statistics"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let pause = 0;

    function typeLoop() {
      if (pause > 0) {
        pause -= 1;
        setTimeout(typeLoop, 80);
        return;
      }

      const phrase = phrases[phraseIndex];

      if (!deleting) {
        charIndex += 1;
        typingTarget.textContent = phrase.slice(0, charIndex);

        if (charIndex >= phrase.length) {
          deleting = true;
          pause = 18;
        }

        setTimeout(typeLoop, 60);
      } else {
        charIndex -= 1;
        typingTarget.textContent = phrase.slice(0, charIndex);

        if (charIndex <= 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          pause = 4;
        }

        setTimeout(typeLoop, 32);
      }
    }

    typeLoop();
  }
})();
