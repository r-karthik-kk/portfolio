/**
 * R KARTHIK PORTFOLIO INTERACTIVE CONTROLLER
 * Canvas Spark & Particle Engine, LeetCode / GitHub Stats Fetcher,
 * Project Filters & Certificate Modal Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Navigation
  initMobileMenu();

  // 2. Interactive Canvas Spark & Particle Engine
  initParticleEngine();

  // 3. Scroll Spy & Header Elevation
  initScrollSpy();

  // 4. Project Category Filter
  initProjectFilters();

  // 5. Certificate Modal Lightbox (Images & PDFs)
  initCertModal();

  // 6. Live / Fallback Stats Loader (LeetCode & GitHub)
  initStatsLoader();

  // 7. Quick Copy Toast Notification
  initQuickCopy();

  // 8. Set Current Copyright Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ==========================================================================
   1. Mobile Navigation Drawer
   ========================================================================== */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-close');
  const overlay = document.getElementById('overlay');
  if (!hamburger || !mobileMenu) return;

  const openMenu = () => {
    mobileMenu.classList.add('is-open');
    overlay.classList.add('is-visible');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ==========================================================================
   2. Interactive Canvas Spark & Particle Engine
   ========================================================================== */
function initParticleEngine() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Particle System Configuration
  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 60);

  const mouse = {
    x: null,
    y: null,
    radius: 120
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Spark Effect on Click
  window.addEventListener('click', (e) => {
    createSparkBurst(e.clientX, e.clientY);
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.size = Math.random() * 2.5 + 1;
      this.baseAlpha = Math.random() * 0.4 + 0.15;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse Proximity Repulsion
      if (mouse.x && mouse.y) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 3;
          this.y -= (dy / dist) * force * 3;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(15, 23, 42, ${this.baseAlpha})`;
      ctx.fill();
    }
  }

  // Spark Particles
  const sparks = [];
  function createSparkBurst(x, y) {
    for (let i = 0; i < 16; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1.5;
      sparks.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 1,
        life: 1,
        decay: Math.random() * 0.03 + 0.02,
        color: `hsl(${Math.random() * 40 + 200}, 90%, 40%)`
      });
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw Constellation Lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          const alpha = (1 - dist / 140) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(15, 23, 42, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Render Click Sparks
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.life -= s.decay;

      if (s.life <= 0) {
        sparks.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = s.life;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   3. Scroll Spy & Header Elevation
   ========================================================================== */
function initScrollSpy() {
  const header = document.getElementById('site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav a');

  const onScroll = () => {
    // Header shadow toggle
    if (window.scrollY > 10) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    // ScrollSpy active link highlight
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ==========================================================================
   4. Project Category Filter
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const category = card.dataset.category || '';
        if (filter === 'all' || category.includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   5. Certificate Modal Lightbox (Images & PDFs)
   ========================================================================== */
function initCertModal() {
  const certCards = document.querySelectorAll('.cert-card');
  const modal = document.getElementById('cert-modal');
  if (!modal) return;

  const modalTitle = document.getElementById('cert-modal-title');
  const modalBody = document.getElementById('cert-modal-body');
  const closeBtn = document.getElementById('cert-modal-close');

  const openCertModal = (title, src, type) => {
    modalTitle.textContent = title;
    modalBody.innerHTML = '';

    if (type === 'pdf') {
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.title = title;
      modalBody.appendChild(iframe);
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.alt = title;
      modalBody.appendChild(img);
    }

    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  const closeCertModal = () => {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
    setTimeout(() => {
      modalBody.innerHTML = '';
    }, 300);
  };

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.dataset.title || 'Certificate';
      const src = card.dataset.src;
      const type = card.dataset.type || 'image';
      openCertModal(title, src, type);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeCertModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeCertModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeCertModal();
    }
  });
}

/* ==========================================================================
   6. Live / Fallback Stats Loader (LeetCode & GitHub)
   ========================================================================== */
function initStatsLoader() {
  // LeetCode Stats Elements
  const lcTotal = document.getElementById('lc-total');
  const lcEasy = document.getElementById('lc-easy');
  const lcMedium = document.getElementById('lc-medium');
  const lcHard = document.getElementById('lc-hard');
  const lcRate = document.getElementById('lc-rate');

  // Attempt LeetCode API Fetch with reliable fallback
  fetch('https://leetcode-stats-api.herokuapp.com/r-karthik')
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success' && data.totalSolved > 0) {
        if (lcTotal) lcTotal.textContent = data.totalSolved;
        if (lcEasy) lcEasy.textContent = data.easySolved;
        if (lcMedium) lcMedium.textContent = data.mediumSolved;
        if (lcHard) lcHard.textContent = data.hardSolved;
        if (lcRate) lcRate.textContent = data.acceptanceRate.toFixed(1) + '%';
      }
    })
    .catch(() => {
      // Fallback verified practice metrics if API is rate-limited
      if (lcTotal) lcTotal.textContent = '399+';
      if (lcEasy) lcEasy.textContent = '316';
      if (lcMedium) lcMedium.textContent = '73';
      if (lcHard) lcHard.textContent = '10';
      if (lcRate) lcRate.textContent = '86.77%';
    });

  // GitHub Stats Elements
  const ghRepos = document.getElementById('gh-repos');
  fetch('https://api.github.com/users/r-karthik-kk')
    .then(res => res.json())
    .then(data => {
      if (data && data.public_repos !== undefined) {
        if (ghRepos) ghRepos.textContent = data.public_repos;
      }
    })
    .catch(() => {
      if (ghRepos) ghRepos.textContent = '12+';
    });
}

/* ==========================================================================
   7. Quick Copy Toast Notification
   ========================================================================== */
function initQuickCopy() {
  const copyBtns = document.querySelectorAll('[data-copy]');
  const toast = document.getElementById('toast');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.dataset.copy;
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied "${textToCopy}" to clipboard!`);
      }).catch(() => {
        showToast('Direct copy failed. Text selected.');
      });
    });
  });

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-show');
    setTimeout(() => {
      toast.classList.remove('is-show');
    }, 3000);
  }
}