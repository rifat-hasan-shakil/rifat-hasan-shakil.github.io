(function () {
  const siteHeader = document.querySelector(".site-header");
  const dropdown = document.querySelector("[data-dropdown]");
  const dropToggle = document.querySelector("[data-dropdown-toggle]");
  const mobileToggle = document.querySelector("[data-mobile-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const themeButtons = document.querySelectorAll("[data-theme-toggle]");
  const typingTarget = document.querySelector("[data-typing-target]");
  const revealElements = document.querySelectorAll(".reveal");
  const contactForm = document.querySelector("[data-contact-form]");
  const yearTarget = document.querySelector("[data-year]");
  const themeKey = "rifat-site-theme";
  const isMobilePerf = window.matchMedia("(max-width: 900px), (pointer: coarse)").matches;

  if (isMobilePerf) {
    document.documentElement.classList.add("mobile-perf");
  }

  function updateHeaderState() {
    if (!siteHeader) {
      return;
    }
    siteHeader.classList.toggle("scrolled", window.scrollY > 12);
  }

  if (!isMobilePerf) {
    let headerTicking = false;
    window.addEventListener(
      "scroll",
      function () {
        if (headerTicking) {
          return;
        }
        headerTicking = true;
        window.requestAnimationFrame(function () {
          updateHeaderState();
          headerTicking = false;
        });
      },
      { passive: true }
    );
    updateHeaderState();
  } else if (siteHeader) {
    siteHeader.classList.remove("scrolled");
  }

  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem(themeKey, theme);

    themeButtons.forEach(function (btn) {
      btn.classList.toggle("is-light", theme === "light");
      btn.setAttribute("aria-label", "Switch to " + (theme === "dark" ? "light" : "dark") + " mode");
      btn.title = "Switch to " + (theme === "dark" ? "light" : "dark") + " mode";
      btn.setAttribute("aria-pressed", String(theme === "light"));
    });
  }

  function getTheme() {
    const stored = localStorage.getItem(themeKey);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  setTheme(getTheme());

  themeButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
      setTheme(current === "dark" ? "light" : "dark");
    });
  });

  if (dropToggle && dropdown) {
    function closeDropdown() {
      dropdown.classList.remove("open");
      dropToggle.setAttribute("aria-expanded", "false");
    }

    dropToggle.addEventListener("click", function () {
      const open = dropdown.classList.toggle("open");
      dropToggle.setAttribute("aria-expanded", String(open));
    });

    document.addEventListener("click", function (event) {
      if (!dropdown.contains(event.target)) {
        closeDropdown();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeDropdown();
      }
    });

    dropdown.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeDropdown();
      });
    });
  }

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener("click", function () {
      const open = mobileNav.classList.toggle("open");
      mobileToggle.setAttribute("aria-expanded", String(open));
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("open");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (typingTarget && !isMobilePerf) {
    const phrases = [
      "statistical rigor",
      "predictive modeling",
      "clear visual storytelling"
    ];
    let pIndex = 0;
    let cIndex = 0;
    let deleting = false;

    function tick() {
      const phrase = phrases[pIndex];
      if (!deleting) {
        cIndex += 1;
        typingTarget.textContent = phrase.slice(0, cIndex);
        if (cIndex === phrase.length) {
          deleting = true;
          setTimeout(tick, 1300);
          return;
        }
        setTimeout(tick, 70);
      } else {
        cIndex -= 1;
        typingTarget.textContent = phrase.slice(0, cIndex);
        if (cIndex === 0) {
          deleting = false;
          pIndex = (pIndex + 1) % phrases.length;
        }
        setTimeout(tick, 40);
      }
    }
    tick();
  }

  if (revealElements.length > 0) {
    if (isMobilePerf) {
      revealElements.forEach(function (item) {
        item.classList.add("visible");
      });
    } else {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        { threshold: 0.14 }
      );

      revealElements.forEach(function (item) {
        observer.observe(item);
      });
    }
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      alert("Thanks! Your message was captured on this static portfolio page.");
      contactForm.reset();
    });
  }
})();
