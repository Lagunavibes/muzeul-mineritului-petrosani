(function () {
  const nav = document.getElementById("nav");
  const menuBtn = document.getElementById("menuBtn");
  const langBtn = document.getElementById("langBtn");
  const storageKey = "mmp-lang";

  function applyLang(lang) {
    const use = lang === "en" ? "en" : "ro";
    document.documentElement.lang = use;
    document.querySelectorAll("[data-ro][data-en]").forEach((el) => {
      const value = el.getAttribute(use === "en" ? "data-en" : "data-ro") || "";
      if (value.indexOf("<br") !== -1) el.innerHTML = value;
      else el.textContent = value;
    });
    if (langBtn) langBtn.textContent = use === "en" ? "RO" : "EN";
    try { localStorage.setItem(storageKey, use); } catch (e) {}
  }

  function currentLang() {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === "en" || saved === "ro") return saved;
    } catch (e) {}
    return "ro";
  }

  applyLang(currentLang());

  langBtn?.addEventListener("click", function () {
    applyLang(document.documentElement.lang === "en" ? "ro" : "en");
  });

  function closeMenu() {
    nav?.classList.remove("open");
    menuBtn?.setAttribute("aria-expanded", "false");
  }

  menuBtn?.addEventListener("click", function () {
    const open = nav?.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav?.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  document.addEventListener("click", function (e) {
    if (!nav || !menuBtn) return;
    if (!nav.classList.contains("open")) return;
    if (nav.contains(e.target) || menuBtn.contains(e.target)) return;
    closeMenu();
  });
})();
