/* ============================================================
   Ondřej Svoboda — Portfolio · main.js
   ============================================================ */

'use strict';

// ── Navbar: transparent → dark on scroll ──────────────────────
const navbar = document.querySelector('.navbar');
if (navbar) {
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Hamburger menu ─────────────────────────────────────────────
const hamburger  = document.querySelector('.hamburger');
const navMobile  = document.querySelector('.nav-mobile');
if (hamburger && navMobile) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navMobile.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMobile.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── Scroll fade-in (IntersectionObserver) ─────────────────────
const fadeEls = document.querySelectorAll('.fade-in');
if (fadeEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  fadeEls.forEach(el => observer.observe(el));
}

// ── Hero infinite strip ────────────────────────────────────────
(function () {
  const container = document.querySelector('.hero-slideshow');
  if (!container) return;

  const candidates = [
    'images/gallery/portrait/portrait_01.jpg',
    'images/gallery/portrait/portrait_02.jpg',
    'images/gallery/portrait/portrait_03.jpg',
    'images/gallery/portrait/portrait_04.jpg',
    'images/gallery/portrait/portrait_05.jpg',
    'images/gallery/portrait/portrait_06.jpg',
    'images/gallery/fashion/fashion_01.jpg',
    'images/gallery/fashion/fashion_02.jpg',
    'images/gallery/fashion/fashion_03.jpg',
    'images/gallery/fashion/fashion_04.jpg',
    'images/gallery/lifestyle/lifestyle_01.jpg',
    'images/gallery/lifestyle/lifestyle_02.jpg',
    'images/gallery/lifestyle/lifestyle_03.jpg',
  ];

  let resolved = 0;
  const valid = [];

  function build() {
    if (valid.length === 0) return;

    const strip = document.createElement('div');
    strip.className = 'hero-strip';

    // Original set + duplicate = seamless -50% loop
    [...valid, ...valid].forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      strip.appendChild(img);
    });

    container.appendChild(strip);

    // Set speed after images paint so we know the real strip width
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const halfWidth = strip.scrollWidth / 2;   // width of one set
        const pxPerSec  = 60;                      // adjust for faster/slower
        strip.style.animationDuration = (halfWidth / pxPerSec) + 's';
        strip.classList.add('animate');
      });
    });
  }

  candidates.forEach(src => {
    const img = new Image();
    img.onload  = () => { valid.push(src); if (++resolved === candidates.length) build(); };
    img.onerror = () => {                   if (++resolved === candidates.length) build(); };
    img.src = src;
  });
}());

// ── Gallery filter ─────────────────────────────────────────────
const filterBtns  = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterBtns.length && galleryItems.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.filter;

      galleryItems.forEach(item => {
        const match = cat === 'all' || item.dataset.category === cat;
        if (match) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

// ── Animated counter (ohlasy page) ────────────────────────────
function animateCounter(el, target, duration) {
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + (progress === 1 ? '+' : '');
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counterEl = document.querySelector('.counter-number[data-target]');
if (counterEl) {
  const target = parseInt(counterEl.dataset.target, 10);
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateCounter(counterEl, target, 1800);
      observer.disconnect();
    }
  }, { threshold: 0.5 });
  observer.observe(counterEl);
}

// ── Hide gallery items until their image actually loads ────────
document.querySelectorAll('.gallery-item').forEach(item => {
  item.style.display = 'none';
  const img = item.querySelector('img');
  if (!img) return;
  const show = () => { item.style.display = ''; };
  img.addEventListener('load', show);
  img.addEventListener('error', () => { /* stays hidden */ });
  // Already cached / already failed (complete fires before listener attaches)
  if (img.complete) {
    if (img.naturalWidth > 0) show();
  }
});


// ── Logo image fallback → show text instead ───────────────────
document.querySelectorAll('.nav-logo-img').forEach(img => {
  img.addEventListener('error', () => {
    img.closest('.nav-logo').classList.add('logo-fallback');
  });
  if (img.complete && img.naturalWidth === 0) {
    img.closest('.nav-logo').classList.add('logo-fallback');
  }
});

// ── About photo: hide column if about.jpg missing ─────────────
const aboutImg = document.getElementById('aboutImg');
const aboutWrap = document.getElementById('aboutImageWrap');
if (aboutImg && aboutWrap) {
  const hideAbout = () => {
    aboutWrap.style.display = 'none';
    const grid = aboutWrap.closest('.about-grid');
    if (grid) grid.classList.add('no-photo');
  };
  aboutImg.addEventListener('error', hideAbout);
  if (aboutImg.complete && aboutImg.naturalWidth === 0) hideAbout();
}

// ── Cookies banner ─────────────────────────────────────────────
const cookieBanner = document.querySelector('.cookie-banner');
const cookieBtn    = document.querySelector('.cookie-accept');
if (cookieBanner) {
  if (!localStorage.getItem('cookies_ok')) {
    setTimeout(() => cookieBanner.classList.add('visible'), 800);
  }
  if (cookieBtn) {
    cookieBtn.addEventListener('click', () => {
      localStorage.setItem('cookies_ok', 'true');
      cookieBanner.classList.remove('visible');
    });
  }
}

// ── Smooth scroll for anchor links ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h'), 10) || 72;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: 'smooth'
    });
  });
});
