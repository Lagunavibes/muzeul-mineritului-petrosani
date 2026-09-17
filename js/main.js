(() => {
  const root = document.documentElement;
  const nav = document.getElementById("nav") || document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const langBtn = document.querySelector("button.lang");
  const form = document.getElementById("mail-form");

  const saved = localStorage.getItem("muzeu-lang");
  const start = saved === "en" || saved === "ro" ? saved : "ro";
  setLang(start);

  langBtn?.addEventListener("click", () => {
    setLang(root.lang === "ro" ? "en" : "ro");
  });

  toggle?.addEventListener("click", () => {
    const open = nav?.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(!!open));
  });

  nav?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject =
      root.lang === "en"
        ? "Petroșani Mining Museum"
        : "Muzeul Mineritului Petroșani";
    const body = `${name} <${email}>\n\n${message}`;
    const url =
      "mailto:primarie@primariapetrosani.ro" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
    window.location.href = url;
  });

  function setLang(lang) {
    root.lang = lang;
    localStorage.setItem("muzeu-lang", lang);
    if (langBtn) {
      langBtn.textContent = lang === "ro" ? "EN" : "RO";
      langBtn.setAttribute(
        "aria-label",
        lang === "ro" ? "Switch to English" : "Comută în română"
      );
    }
    document.title =
      lang === "en"
        ? "Petroșani Mining Museum — Jiu Valley"
        : "Muzeul Mineritului din Petroșani — Valea Jiului";
  }
})();
