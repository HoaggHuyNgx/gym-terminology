// ============================================
// ELITE CUTTING PROGRAM — SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- SCROLL REVEAL ----
  const revealEls = document.querySelectorAll(
    '.day-card, .principle-card, .champ-card, .section-header'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger the animation for cards in a grid
        const siblings = [...entry.target.parentElement.children];
        const index = siblings.indexOf(entry.target);
        const delay = (index % 4) * 80;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));


  // ---- ACTIVE DAY HIGHLIGHT ----
  const dayMap = {
    1: 'cn', // Sunday
    2: '2',  // Monday
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',  // Saturday
  };

  const today = new Date().getDay(); // 0=Sun, 1=Mon ...
  const dayKey = today === 0 ? 'cn' : String(today + 1);

  const todayCard = document.querySelector(`.day-card[data-day="${today === 0 ? 'cn' : today + 1}"]`);
  if (todayCard) {
    todayCard.style.borderColor = 'rgba(255,61,0,0.6)';
    todayCard.style.boxShadow = '0 0 40px rgba(255,61,0,0.08)';

    // Add "HÔM NAY" badge
    const dayLabel = todayCard.querySelector('.day-label');
    if (dayLabel) {
      const todayBadge = document.createElement('span');
      todayBadge.textContent = '● HÔM NAY';
      todayBadge.style.cssText = `
        font-family: var(--font-mono, monospace);
        font-size: 9px;
        letter-spacing: 0.15em;
        color: #ff3d00;
        margin-left: auto;
        animation: blink 1.5s ease-in-out infinite;
      `;
      dayLabel.appendChild(todayBadge);
    }
  }


  // ---- EXERCISE HOVER GLOW ----
  document.querySelectorAll('.exercise').forEach(ex => {
    ex.addEventListener('mouseenter', () => {
      ex.style.backgroundColor = 'rgba(255,61,0,0.03)';
    });
    ex.addEventListener('mouseleave', () => {
      ex.style.backgroundColor = '';
    });
  });


  // ---- PRINCIPLE CARD CLICK EXPAND ----
  document.querySelectorAll('.principle-card').forEach(card => {
    card.style.cursor = 'pointer';
    const p = card.querySelector('p');
    p.style.overflow = 'hidden';

    card.addEventListener('click', () => {
      const isExpanded = card.dataset.expanded === 'true';
      card.dataset.expanded = !isExpanded;
      card.style.borderColor = isExpanded ? '' : 'rgba(212,175,55,0.5)';
    });
  });


  // ---- SMOOTH PROGRESS INDICATOR ----
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    background: linear-gradient(90deg, #ff3d00, #d4af37);
    z-index: 9999;
    width: 0%;
    transition: width 0.1s linear;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  });


  // ---- BLINK ANIMATION ----
  const style = document.createElement('style');
  style.textContent = `
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
  `;
  document.head.appendChild(style);


  // ---- COPY SCHEDULE ----
  // Long press on day card copies exercise list as text (mobile friendly)
  document.querySelectorAll('.day-card').forEach(card => {
    let pressTimer;

    card.addEventListener('touchstart', () => {
      pressTimer = setTimeout(() => {
        const title = card.querySelector('.day-title')?.textContent || '';
        const exercises = [...card.querySelectorAll('.ex-name')].map(e => e.textContent.trim());
        if (exercises.length === 0) return;

        const text = `${title}\n${exercises.map((e, i) => `${i+1}. ${e}`).join('\n')}`;
        navigator.clipboard?.writeText(text).then(() => {
          showToast('Đã copy lịch tập!');
        });
      }, 600);
    });

    card.addEventListener('touchend', () => clearTimeout(pressTimer));
    card.addEventListener('touchmove', () => clearTimeout(pressTimer));
  });


  // ---- TOAST NOTIFICATION ----
  function showToast(msg) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = `
      position: fixed;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%);
      background: #ff3d00;
      color: white;
      font-family: monospace;
      font-size: 12px;
      letter-spacing: 0.1em;
      padding: 10px 24px;
      border-radius: 2px;
      z-index: 10000;
      animation: fadeUp 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

});
