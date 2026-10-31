/* Ultra 2 concept interactions — GSAP/ScrollTrigger + Lenis, with a no-library fallback. */
(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progress = document.querySelector('#scroll-progress');
  const sections = [...document.querySelectorAll('[data-accent]')];
  let lenis = null;

  // Lenis smooth scrolling is disabled for reduced-motion preferences.
  if (!reducedMotion && window.Lenis) {
    lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.9 });
    lenis.on('scroll', () => {
      if (window.ScrollTrigger) ScrollTrigger.update();
      updateProgress();
    });
    if (window.gsap) {
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) { event.preventDefault(); lenis.scrollTo(target, { offset: -55 }); }
      });
    });
  }

  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (progress) progress.style.height = value + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  // Smoothly update the shared accent colour based on the section in view.
  if ('IntersectionObserver' in window) {
    const accentObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) root.style.setProperty('--accent', entry.target.dataset.accent);
      });
    }, { threshold: 0.35 });
    sections.forEach((section) => accentObserver.observe(section));
  }

  // Count-up numbers. The intermediate digits create a restrained scramble effect.
  function animateCount(element) {
    if (element.dataset.done === 'true') return;
    element.dataset.done = 'true';
    const target = Number(element.dataset.count || 0);
    const start = Number(element.dataset.start || 0);
    if (reducedMotion) { element.textContent = target.toLocaleString('en-US'); return; }
    const duration = target > 1000 ? 1500 : 1050;
    const begin = performance.now();
    function frame(now) {
      const t = Math.min((now - begin) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      const value = Math.round(start + (target - start) * eased);
      element.textContent = value.toLocaleString('en-US');
      if (t < 1) requestAnimationFrame(frame);
      else {
        element.textContent = target.toLocaleString('en-US');
        element.classList.add('count-settled');
        element.animate([{filter:'blur(2px)',opacity:.75},{filter:'blur(0)',opacity:1}], {duration:260});
      }
    }
    requestAnimationFrame(frame);
  }
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { animateCount(entry.target); countObserver.unobserve(entry.target); } });
  }, { threshold: 0.45 });
  document.querySelectorAll('.count').forEach((element) => countObserver.observe(element));

  // Live watch details: the displayed time and elapsed timer tick independently.
  const timer = document.querySelector('#live-timer');
  const heart = document.querySelector('#heart-rate');
  let elapsed = 1 * 3600 + 4 * 60 + 46;
  if (!reducedMotion) {
    window.setInterval(() => {
      elapsed += 1;
      if (timer) {
        const h = Math.floor(elapsed / 3600);
        const m = Math.floor((elapsed % 3600) / 60);
        const s = elapsed % 60;
        timer.textContent = h + ':' + String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
      }
      if (heart) heart.textContent = String(124 + Math.floor(Math.random() * 9));
    }, 1000);
  }

  // Switch band colour with a quick crossfade and a subtle tilt.
  const strap = document.querySelector('#selectable-strap');
  const bandCaption = document.querySelector('#band-caption');
  const bandButtons = [...document.querySelectorAll('.band-option')];
  const bandNames = { ember: 'EMBER TRAIL / WOVEN LOOP', glacier: 'GLACIER TRAIL / WOVEN LOOP', basalt: 'BASALT TRAIL / WOVEN LOOP' };
  bandButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const band = button.dataset.band;
      bandButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      if (strap) {
        strap.style.transition = 'opacity .22s ease, transform .5s cubic-bezier(.2,.8,.2,1), background .55s ease';
        strap.style.opacity = '.25';
        strap.style.transform = 'rotateY(22deg) rotateX(8deg)';
        window.setTimeout(() => {
          strap.classList.remove('strap-ember','strap-glacier','strap-basalt');
          strap.classList.add('strap-' + band);
          strap.style.opacity = '1';
          strap.style.transform = 'rotateY(0) rotateX(0)';
        }, 180);
      }
      if (bandCaption) bandCaption.textContent = bandNames[band];
    });
  });

  // GSAP adds scroll-linked movement and line-draw effects when available.
  if (!reducedMotion && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    if (lenis) lenis.on('scroll', ScrollTrigger.update);
    gsap.utils.toArray('.hero-copy h1, .section-copy h2, .bands-heading h2, .compare-heading h2').forEach((heading) => {
      gsap.fromTo(heading, { y: 28, opacity: 0, filter: 'blur(8px)' }, {
        y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: heading, start: 'top 88%', once: true }
      });
    });
    gsap.utils.toArray('.watch-scene').forEach((watch, index) => {
      gsap.to(watch, {
        rotateY: index % 2 ? 8 : -7, y: -18, ease: 'none',
        scrollTrigger: { trigger: watch.closest('.section'), start: 'top bottom', end: 'bottom top', scrub: 1.2 }
      });
    });
    gsap.utils.toArray('.ultra-word').forEach((word) => {
      gsap.to(word, { yPercent: 18, ease: 'none', scrollTrigger: { trigger: word.closest('.section'), start: 'top top', end: 'bottom top', scrub: 1 } });
    });
    gsap.utils.toArray('.callout-lines path').forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      gsap.to(path, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: path.closest('.profile-stage'), start: 'top 72%', end: 'center center', scrub: 1 } });
    });
    gsap.utils.toArray('.hero-word span').forEach((letter, i) => {
      gsap.from(letter, { y: 70, opacity: 0, filter: 'blur(12px)', duration: .9, delay: i * .14, ease: 'power3.out' });
    });
    gsap.from('.hero-watch', { y: 90, opacity: 0, scale: .92, duration: 1.2, delay: .25, ease: 'power3.out' });
    gsap.from('.hero-copy', { y: 28, opacity: 0, filter: 'blur(8px)', duration: 1, delay: .45, ease: 'power3.out' });
    gsap.from('.compare-row', { y: 18, opacity: 0, stagger: .07, duration: .65, ease: 'power2.out', scrollTrigger: { trigger: '.comparison-table', start: 'top 82%', once: true } });
  }

  // CSS handles a complete visual fallback when animation CDNs are unavailable.
  document.documentElement.classList.add('concept-ready');
})();