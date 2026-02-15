export function initTheme() {
  const themeBtn = document.getElementById("themeBtn");
  const themeMenu = document.getElementById("themeMenu");
  const themeOptions = document.querySelectorAll(".theme-option");

  let currentTheme = localStorage.getItem("lotmdle_theme") || "theme-lotm";

  function setTheme(theme) {
    document.body.classList.remove("theme-classic", "theme-lotm");
    document.body.classList.add(theme);
    currentTheme = theme;
    localStorage.setItem("lotmdle_theme", theme);

    themeOptions.forEach(opt => {
      opt.classList.toggle("active", opt.dataset.theme === theme);
    });
  }

  setTheme(currentTheme);

  if (themeBtn && themeMenu) {
    themeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      themeMenu.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!themeMenu.contains(e.target) && e.target !== themeBtn) {
        themeMenu.classList.add("hidden");
      }
    });

    themeOptions.forEach(opt => {
      opt.addEventListener("click", () => {
        setTheme(opt.dataset.theme);
        themeMenu.classList.add("hidden");
      });
    });
  }
}
