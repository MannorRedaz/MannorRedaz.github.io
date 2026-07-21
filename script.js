(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-button");
  const mobileNav = document.querySelector(".mobile-nav");

  if (window.lucide) window.lucide.createIcons();

  const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 18);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  menuButton.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "关闭导航菜单" : "打开导航菜单");
    menuButton.innerHTML = `<i data-lucide="${isOpen ? "x" : "menu"}"></i>`;
    if (window.lucide) window.lucide.createIcons();
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.innerHTML = '<i data-lucide="menu"></i>';
      if (window.lucide) window.lucide.createIcons();
    });
  });

  const roles = ["后端开发工程师", "运维工程师", "开源工具开发者", "技术干货创作者"];
  const typeTarget = document.querySelector("#typewriter");
  if (!reducedMotion) {
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = true;
    const type = () => {
      const word = roles[roleIndex];
      charIndex += deleting ? -1 : 1;
      typeTarget.textContent = word.slice(0, charIndex);
      let delay = deleting ? 45 : 90;
      if (!deleting && charIndex === word.length) {
        deleting = true;
        delay = 1600;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 280;
      }
      window.setTimeout(type, delay);
    };
    window.setTimeout(type, 1300);
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  const filters = document.querySelectorAll(".filter");
  const projectCards = document.querySelectorAll(".project-card");
  filters.forEach((button) => {
    button.addEventListener("click", () => {
      filters.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      const category = button.dataset.filter;
      projectCards.forEach((card) => {
        card.classList.toggle("hidden", category !== "all" && card.dataset.category !== category);
      });
    });
  });

  const stats = document.querySelectorAll(".stat-number");
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.count);
      if (reducedMotion) {
        element.textContent = String(target);
      } else {
        const started = performance.now();
        const duration = 1100;
        const tick = (now) => {
          const progress = Math.min((now - started) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          element.textContent = String(Math.round(target * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
      statObserver.unobserve(element);
    });
  }, { threshold: 0.7 });
  stats.forEach((stat) => statObserver.observe(stat));

  const heatmap = document.querySelector("#heatmap");
  const activeCells = new Map([
    [4, 1], [17, 2], [23, 1], [31, 2], [35, 3], [39, 1], [46, 2], [53, 3], [60, 1], [72, 2], [75, 4], [81, 1],
    [95, 2], [103, 3], [117, 1], [125, 2], [138, 1], [144, 3], [151, 2], [163, 4], [164, 3], [165, 2], [172, 1],
    [180, 3], [181, 4], [182, 2], [195, 1], [204, 2], [217, 3], [231, 1], [244, 2], [260, 4], [274, 1], [291, 2],
    [305, 3], [319, 1], [333, 2], [347, 3], [359, 1]
  ]);
  for (let index = 0; index < 364; index += 1) {
    const cell = document.createElement("span");
    const level = activeCells.get(index);
    if (level) cell.className = `l${level}`;
    cell.setAttribute("aria-hidden", "true");
    heatmap.appendChild(cell);
  }

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".desktop-nav a");
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-35% 0px -58%", threshold: 0 });
  sections.forEach((section) => navObserver.observe(section));

  const canvas = document.querySelector("#particle-canvas");
  const context = canvas.getContext("2d");
  let particles = [];
  let animationFrame;

  const resizeCanvas = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.min(72, Math.floor(rect.width / 18));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      radius: Math.random() * 1.2 + .35,
      speed: Math.random() * .08 + .025,
      alpha: Math.random() * .42 + .13
    }));
  };

  const drawParticles = () => {
    const rect = canvas.getBoundingClientRect();
    context.clearRect(0, 0, rect.width, rect.height);
    particles.forEach((particle) => {
      particle.y -= particle.speed;
      if (particle.y < -3) {
        particle.y = rect.height + 3;
        particle.x = Math.random() * rect.width;
      }
      context.beginPath();
      context.fillStyle = `rgba(34, 209, 238, ${particle.alpha})`;
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    });
    animationFrame = requestAnimationFrame(drawParticles);
  };

  resizeCanvas();
  if (!reducedMotion) drawParticles();
  window.addEventListener("resize", resizeCanvas, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (reducedMotion) return;
    if (document.hidden) cancelAnimationFrame(animationFrame);
    else drawParticles();
  });

  document.querySelector("#year").textContent = String(new Date().getFullYear());
})();
