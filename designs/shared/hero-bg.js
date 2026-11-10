// Animated hero backgrounds, drawn on a canvas behind the hero text.
// Three modes to compare: "bokeh" (out-of-focus lights), "aurora" (drifting color),
// "orb" (one soft glowing light). All of them tint with --accent and react to the cursor.
(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-bg';
  hero.prepend(canvas);
  const ctx = canvas.getContext('2d');

  let W = 0, H = 0, dpr = 1;
  const mouse = { x: .5, y: .4, tx: .5, ty: .4, on: false };
  let accent = [255, 107, 44];
  let mode, state, t = 0, raf = 0, visible = true;

  const hexToRgb = h => { h = h.trim().replace('#', ''); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)); };
  const readAccent = () => { try { accent = hexToRgb(getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#ff6b2c'); } catch (e) {} };
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  const mix = (a, b, k) => a.map((v, i) => Math.round(v + (b[i] - v) * k));
  const rand = (a, b) => a + Math.random() * (b - a);

  function resize() {
    dpr = Math.min(2, devicePixelRatio || 1);
    W = hero.clientWidth; H = hero.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (mode) state = modes[mode].init();
  }

  hero.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect();
    mouse.tx = (e.clientX - r.left) / W; mouse.ty = (e.clientY - r.top) / H; mouse.on = true;
  });
  hero.addEventListener('pointerleave', () => { mouse.on = false; mouse.tx = .5; mouse.ty = .4; });

  const modes = {
    // ---- out-of-focus lights, like a fast lens at night ----
    bokeh: {
      label: 'Bokeh',
      init() {
        const n = Math.round(Math.min(46, Math.max(18, W * H / 32000)));
        return Array.from({ length: n }, () => {
          const depth = Math.random();
          return { x: rand(0, W), y: rand(0, H), r: 18 + depth * 110, depth, vy: -(.08 + depth * .25), vx: rand(-.08, .08),
                   tone: Math.random(), a: .1 + (1 - depth) * .22, ph: rand(0, 6.28) };
        });
      },
      draw() {
        ctx.fillStyle = '#0c0c0b'; ctx.fillRect(0, 0, W, H);
        const warm = [255, 196, 140], cream = [242, 239, 232];
        ctx.globalCompositeOperation = 'lighter';
        for (const b of state) {
          b.x += b.vx; b.y += b.vy;
          if (b.y < -b.r * 2) { b.y = H + b.r; b.x = rand(0, W); }
          const px = b.x + (mouse.x - .5) * -60 * (b.depth + .2);
          const py = b.y + (mouse.y - .5) * -40 * (b.depth + .2);
          const c = b.tone < .55 ? accent : b.tone < .85 ? mix(accent, warm, .6) : cream;
          const a = b.a * (.75 + .25 * Math.sin(t * .02 + b.ph));
          // soft disc with a slightly brighter rim, the way real bokeh renders
          const g = ctx.createRadialGradient(px, py, 0, px, py, b.r);
          g.addColorStop(0, rgba(c, a * .55));
          g.addColorStop(.82, rgba(c, a * .75));
          g.addColorStop(.95, rgba(c, a));
          g.addColorStop(1, rgba(c, 0));
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, b.r, 0, 6.283); ctx.fill();
        }
        ctx.globalCompositeOperation = 'source-over';
      }
    },

    // ---- slow drifting color, with one blob that follows the cursor ----
    aurora: {
      label: 'Aurora',
      init() {
        return [0, 1, 2, 3].map(i => ({ ph: i * 1.7, sp: .0016 + i * .0004, r: Math.max(W, H) * (.45 + i * .08), k: i }));
      },
      draw() {
        ctx.fillStyle = '#0c0c0b'; ctx.fillRect(0, 0, W, H);
        ctx.globalCompositeOperation = 'lighter';
        const palette = [accent, mix(accent, [255, 60, 120], .5), mix(accent, [90, 120, 255], .55), mix(accent, [255, 210, 120], .5)];
        for (const b of state) {
          const x = W * (.5 + .42 * Math.sin(t * b.sp + b.ph));
          const y = H * (.45 + .35 * Math.cos(t * b.sp * 1.3 + b.ph * 2));
          const g = ctx.createRadialGradient(x, y, 0, x, y, b.r);
          g.addColorStop(0, rgba(palette[b.k], .2)); g.addColorStop(1, rgba(palette[b.k], 0));
          ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        }
        const mx = mouse.x * W, my = mouse.y * H, mr = Math.min(W, H) * .45;
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, mr);
        g.addColorStop(0, rgba(accent, mouse.on ? .22 : .08)); g.addColorStop(1, rgba(accent, 0));
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        ctx.globalCompositeOperation = 'source-over';
      }
    },

    // ---- one soft glowing orb that breathes and drifts slowly, leaning a little
    //      toward the cursor; the hero's CSS blur softens it further ----
    orb: {
      label: 'Orb',
      init() {
        const narrow = W < 700;
        return { x: W * (narrow ? .6 : .72), y: H * (narrow ? .3 : .42), R: Math.min(W, H) * (narrow ? .32 : .24) + 30, dim: narrow ? .7 : 1 };
      },
      draw() {
        const o = state;
        ctx.fillStyle = '#0c0c0b'; ctx.fillRect(0, 0, W, H);
        // a very gentle bob: ~8s up-and-down cycle, a few px of sideways sway,
        // and only a slight lean toward the cursor
        const lean = mouse.on ? .05 : 0;
        const x = o.x + Math.sin(t * .0065) * 6 + (mouse.x * W - o.x) * lean;
        const y = o.y + Math.sin(t * .013) * 14 + (mouse.y * H - o.y) * lean;
        const R = o.R * (1 + .015 * Math.sin(t * .013 + 1));      // barely breathes, in step with the bob
        const core = mix(accent, [255, 255, 255], .3);

        ctx.globalCompositeOperation = 'lighter';
        // wide, faint halo
        let g = ctx.createRadialGradient(x, y, 0, x, y, R * 3.6);
        g.addColorStop(0, rgba(accent, .1 * o.dim)); g.addColorStop(.5, rgba(accent, .035 * o.dim)); g.addColorStop(1, rgba(accent, 0));
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        // the orb: dimmer core with a long, heavily feathered falloff (no visible edge)
        const F = R * 1.7;
        g = ctx.createRadialGradient(x, y, 0, x, y, F);
        g.addColorStop(0,   rgba(core,   .42 * o.dim));
        g.addColorStop(.18, rgba(accent, .32 * o.dim));
        g.addColorStop(.4,  rgba(accent, .17 * o.dim));
        g.addColorStop(.65, rgba(accent, .06 * o.dim));
        g.addColorStop(.85, rgba(accent, .015 * o.dim));
        g.addColorStop(1,   rgba(accent, 0));
        ctx.fillStyle = g; ctx.fillRect(x - F, y - F, F * 2, F * 2);
        ctx.globalCompositeOperation = 'source-over';
      }
    },
  };

  function frame() {
    t++;
    if (t % 30 === 1) readAccent();
    mouse.x += (mouse.tx - mouse.x) * .05; mouse.y += (mouse.ty - mouse.y) * .05;
    modes[mode].draw();
    if (!reduce && visible) raf = requestAnimationFrame(frame);
  }

  function setMode(m) {
    if (!modes[m]) m = 'orb';
    mode = m;
    try { localStorage.setItem('lmar-hero-bg-v4', m); } catch (e) {}
    cancelAnimationFrame(raf);
    readAccent(); state = modes[m].init();
    if (reduce) { for (let i = 0; i < 60; i++) { t++; modes[m].draw(); } } else frame();
    document.querySelectorAll('.at-bg button').forEach(b => b.classList.toggle('on', b.dataset.m === m));
  }

  // pause drawing while the hero is scrolled out of view
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !reduce) { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); }
  }).observe(hero);
  addEventListener('resize', () => { clearTimeout(resize.t); resize.t = setTimeout(resize, 150); });

  let saved = null;
  try { saved = localStorage.getItem('lmar-hero-bg-v4'); } catch (e) {}
  resize();
  setMode(saved || 'orb');

  window.heroBg = { modes: Object.fromEntries(Object.entries(modes).map(([k, v]) => [k, v.label])), set: setMode, get: () => mode };
})();
