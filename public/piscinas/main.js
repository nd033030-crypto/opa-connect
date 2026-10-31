(() => {
  "use strict";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const year = document.getElementById("year");

  if (year) year.textContent = String(new Date().getFullYear());

  // Menu mobile simples, sem animação elaborada.
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
  }

  // Destaque translúcido da navbar após 40px de rolagem.
  const updateNavbar = () => {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 40);
  };
  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  // Lenis é opcional: sem a biblioteca, os links usam a rolagem nativa.
  let lenis = null;
  if (!reducedMotion && window.Lenis) {
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false
      });
      const raf = time => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    } catch (error) {
      lenis = null;
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      if (navLinks) navLinks.classList.remove("open");
      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
      }
      if (lenis && !reducedMotion) {
        lenis.scrollTo(target, { offset: -(navbar ? navbar.offsetHeight : 0) });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - (navbar ? navbar.offsetHeight : 0);
        window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
      }
    });
  });

  // Progressive enhancement: conteúdo visível por padrão; revela blocos apenas se JS e observer funcionarem.
  if (!reducedMotion && "IntersectionObserver" in window) {
    try {
      document.documentElement.classList.add("js-motion");
      const revealItems = Array.from(document.querySelectorAll(".reveal"));
      const groups = [
        Array.from(document.querySelectorAll(".difference-card")),
        Array.from(document.querySelectorAll(".project-card")),
        Array.from(document.querySelectorAll(".stat-item"))
      ];
      groups.forEach(items => items.forEach((item, index) => {
        item.style.transitionDelay = (index * 100) + "ms";
      }));
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.15 });
      revealItems.forEach(item => {
        // O hero não tem classes .reveal; a primeira seção animada é a de diferenciais.
        observer.observe(item);
      });
    } catch (error) {
      document.documentElement.classList.remove("js-motion");
      document.querySelectorAll(".reveal").forEach(item => item.classList.add("is-visible"));
    }
  }
})();