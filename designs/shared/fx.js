// Loader: counts to 100, turns into a "come in" button, then the pill
// expands to fill the screen and reveals the page underneath.
(function loader() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // 19 rows of the same line, tilted (oversized so the corners stay filled); every other row scrolls the opposite way.
  function rows() {
    const line = '<span>This is my space where I like to dibble and dabble here and there.</span>'.repeat(4);
    // brighter tones that still sit nicely on the cream background
    const colors = ['#f07f4f', '#4fb87a', '#5a96e0', '#e8679c', '#e3ae2a', '#9a78e6', '#2fb8a8'];
    const count = 19, mid = (count - 1) / 2;
    return Array.from({ length: count }, (_, i) => {
      const rev = Math.abs(i - mid) % 2 === 1;
      return `<div class="ld-row${rev ? ' rev' : ''}" style="color:${colors[i % colors.length]}"><div class="ld-track" style="--delay:-${(i * 7.3) % 45}s">${line}</div></div>`;
    }).join('');
  }
  const el = document.createElement('div');
  el.className = 'ld';
  el.innerHTML = `
    <div class="ld-lines">${rows()}</div>
    <div class="ld-btn">
      <span class="ld-glow"><span class="ld-ring"></span></span>
      <button class="ld-pill" aria-label="Enter site">
        <span class="glow"></span>
        <span class="t">loading</span><span class="n">0</span><span class="cur"></span>
      </button>
      <span class="ld-shine"></span>
    </div>
    <div class="ld-fill"></div>`;
  document.body.prepend(el);
  document.documentElement.style.overflow = 'hidden';

  const pill = el.querySelector('.ld-pill');
  const t = el.querySelector('.t'), n = el.querySelector('.n'), cur = el.querySelector('.cur');
  pill.addEventListener('pointermove', e => {
    const r = pill.getBoundingClientRect();
    pill.style.setProperty('--mx', e.clientX - r.left + 'px');
    pill.style.setProperty('--my', e.clientY - r.top + 'px');
  });

  const enter = (e) => {
    if (!el.classList.contains('ready') || el.classList.contains('open')) return;
    // grow the circle from wherever you clicked (or the pill's center)
    const r = pill.getBoundingClientRect();
    el.style.setProperty('--fx', (e && e.clientX ? e.clientX : r.left + r.width / 2) + 'px');
    el.style.setProperty('--fy', (e && e.clientY ? e.clientY : r.top + r.height / 2) + 'px');
    el.classList.add('open', 'gone');
    document.documentElement.style.overflow = '';
    setTimeout(() => document.dispatchEvent(new Event('site:enter')), reduce ? 0 : 900);
    setTimeout(() => el.remove(), reduce ? 0 : 1500);
  };
  pill.addEventListener('click', enter);
  addEventListener('keydown', e => { if (e.key === 'Enter') enter(); });

  const dur = reduce ? 0 : 2400, start = performance.now();
  (function tick(now) {
    const p = Math.min(1, (now - start) / (dur || 1));
    const eased = 1 - Math.pow(1 - p, 3);
    n.textContent = Math.round(eased * 100);
    // outline fills in step with the counter; the glint rides the leading edge
    const btn = el.querySelector('.ld-btn');
    btn.style.setProperty('--p', eased);
    el.querySelector('.ld-shine').style.setProperty('--spin', eased * 360 + 'deg');
    if (p < 1) return requestAnimationFrame(tick);
    const word = 'welcome →';
    if (reduce) { n.remove(); t.textContent = word; el.classList.add('ready'); return; }
    // backspace "loading", then type the welcome like a terminal
    n.remove();
    cur.classList.add('typing');
    const step = (fn, ms) => setTimeout(fn, ms);
    (function erase() {
      if (t.textContent.length) { t.textContent = t.textContent.slice(0, -1); return step(erase, 45); }
      let i = 0;
      step(function type() {
        t.textContent = word.slice(0, ++i);
        if (i < word.length) return step(type, 70 + Math.random() * 60);
        cur.classList.remove('typing');
        el.classList.add('ready');
      }, 250);
    })();
  })(start);
})();

// Scroll reveals + blur-in headline.
(function reveal() {
  document.querySelectorAll('.blur-in').forEach(h => {
    h.innerHTML = h.textContent.split('').map((c, i) => `<span style="--i:${i}">${c}</span>`).join('');
  });
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.15 });
  const go = () => document.querySelectorAll('[data-r], .blur-in').forEach(x => io.observe(x));
  document.addEventListener('site:enter', go, { once: true });
})();
