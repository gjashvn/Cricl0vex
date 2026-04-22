/* ── NAV SCROLL + PROGRESS BAR + ACTIVE LINK ── */
const nav         = document.getElementById('nav');
const navProgress = document.getElementById('navProgress');
const navItems    = document.querySelectorAll('.nav-item');
const sections    = ['about','pages','content'].map(id => document.getElementById(id)).filter(Boolean);

window.addEventListener('scroll', () => {
  const scrollY   = window.scrollY;
  const docH      = document.documentElement.scrollHeight - window.innerHeight;
  const progress  = Math.min((scrollY / docH) * 100, 100);

  // progress bar width
  navProgress.style.width = progress + '%';

  // scrolled class for glow line + bg
  nav.classList.toggle('scrolled', scrollY > 40);

  // active link based on section in viewport
  let current = '';
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navItems.forEach(a => {
    const href = a.getAttribute('href').replace('#','');
    a.classList.toggle('active', href === current);
  });
});

/* ── MOBILE MENU ── */
function toggleMenu() {
  const hbg = document.getElementById('hbg');
  const menu = document.getElementById('mobMenu');
  hbg.classList.toggle('open');
  menu.classList.toggle('open');
}
function closeMenu() {
  document.getElementById('hbg').classList.remove('open');
  document.getElementById('mobMenu').classList.remove('open');
}
window.addEventListener('resize', () => { if (window.innerWidth > 768) closeMenu(); });

/* ── MODAL ── */
function openModal() {
  document.getElementById('overlay').classList.add('open');
}
function closeModal() {
  document.getElementById('overlay').classList.remove('open');
}
function handleOC(e) { if (e.target === document.getElementById('overlay')) closeModal(); }
function handlePay(e) {
  e.preventDefault();
  closeModal();
  alert('Payment link coming soon!\nDM on Instagram @themindword_ for early access.');
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ── CONTACT FORM ── */
function handleFormSubmit(e) {
  e.preventDefault();
  const name    = document.getElementById('fname').value.trim();
  const email   = document.getElementById('femail').value.trim();
  const msg     = document.getElementById('fmsg').value.trim();
  const errEl   = document.getElementById('formError');
  const sendBtn = document.getElementById('sendBtn');

  // Basic validation
  if (!name || !email || !msg) {
    errEl.textContent = 'Please fill in all fields.';
    errEl.style.display = 'block';
    return;
  }
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRx.test(email)) {
    errEl.textContent = 'Please enter a valid email address.';
    errEl.style.display = 'block';
    return;
  }
  errEl.style.display = 'none';

  // Build mailto link — opens email client with prefilled message
  const subject = encodeURIComponent('Message from ' + name + ' via AshX Portfolio');
  const body    = encodeURIComponent(
    'Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + msg
  );
  const mailto  = 'mailto:vipsofficial4488@gmail.com?subject=' + subject + '&body=' + body;

  // Show loading state
  sendBtn.textContent = 'Opening email...';
  sendBtn.style.opacity = '.7';
  sendBtn.disabled = true;

  // Open mailto
  window.location.href = mailto;

  // After short delay show success
  setTimeout(() => {
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
  }, 1500);
}

/* ── SCROLL REVEAL (general) ── */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-scale').forEach(el => io.observe(el));

/* ── JOURNEY TIMELINE ANIMATION ── */
const journeyWrap = document.querySelector('.journey-wrap');
const jItems = document.querySelectorAll('.jitem');

// Animate the line first, then each item with staggered delay
const journeyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Draw the line
      journeyWrap.classList.add('line-in');

      // Stagger each jitem
      jItems.forEach((item, i) => {
        setTimeout(() => {
          item.classList.add('jitem-in');
        }, 200 + i * 260);
      });

      journeyObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

if (journeyWrap) journeyObserver.observe(journeyWrap);

/* ── REACH BARS — animate on scroll ── */
const reachBars = document.querySelectorAll('.reach-bar-fill');
const reachObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.getAttribute('data-width');
      // slight delay for stagger feel
      setTimeout(() => { bar.style.width = width + '%'; }, 300);
      reachObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });
reachBars.forEach(b => reachObserver.observe(b));

/* ── CARD SUBTLE TILT on mousemove ── */
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -5;
    const rotY = ((x - cx) / cx) * 5;
    card.style.transform = `translateY(-10px) scale(1.01) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    card.style.transition = 'transform .1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform .35s cubic-bezier(.34,1.10,.64,1)';
  });
});
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#' || href === '#0') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const y = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});
