// Design-time tool: try accent colors live. Remove this script tag before launch.
(function () {
  const presets = [
    ['orange', '#ff6b2c'], ['red', '#ff3b30'], ['pink', '#ff5fa2'], ['violet', '#8b5cf6'],
    ['blue', '#3b82f6'], ['cyan', '#22d3ee'], ['teal', '#14b8a6'], ['green', '#22c55e'],
    ['yellow', '#facc15'], ['amber', '#f59e0b'], ['cream', '#e8dcc4'], ['white', '#f2efe8'],
  ];
  const KEY = 'lmar-accent';
  const root = document.documentElement;
  const initial = getComputedStyle(root).getPropertyValue('--accent').trim() || '#ff6b2c';

  // dark or light text on top of the accent, whichever reads better
  const onColor = hex => {
    const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map(c => c <= .03928 ? c / 12.92 : Math.pow((c + .055) / 1.055, 2.4));
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) > 0.22 ? '#151514' : '#f2efe8';
  };

  const panel = document.createElement('div');
  panel.innerHTML = `
    <style>
      .at { position:fixed; right:16px; bottom:16px; z-index:9000; width:248px; padding:14px; border-radius:16px;
        background:rgba(24,24,22,.92); backdrop-filter:blur(14px); border:1px solid #2c2b28; color:#f2efe8;
        font:500 13px/1.3 "Inter Tight", system-ui, sans-serif; box-shadow:0 12px 40px rgba(0,0,0,.4); }
      .at.min .at-body { display:none; }
      .at-head { display:flex; justify-content:space-between; align-items:center; cursor:pointer; user-select:none; }
      .at-head b { display:flex; align-items:center; gap:8px; font-weight:700; }
      .at-head b i { width:14px; height:14px; border-radius:50%; background:var(--accent); }
      .at-head span { color:#8a877f; }
      .at-sw { display:grid; grid-template-columns:repeat(6,1fr); gap:6px; margin:12px 0; }
      .at-sw button { aspect-ratio:1; border-radius:8px; border:2px solid transparent; cursor:pointer; padding:0; }
      .at-sw button.on { border-color:#f2efe8; }
      .at-row { display:flex; gap:8px; align-items:center; }
      .at-row input[type=color] { width:36px; height:32px; border:0; padding:0; background:none; cursor:pointer; }
      .at-row input[type=text] { flex:1; min-width:0; height:32px; border-radius:8px; border:1px solid #2c2b28; background:#111110; color:inherit; padding:0 10px; font:inherit; text-transform:lowercase; }
      .at-row button { height:32px; padding:0 10px; border-radius:8px; border:0; background:#f2efe8; color:#151514; font:inherit; font-weight:700; cursor:pointer; }
      .at-hint { margin-top:10px; color:#8a877f; font-size:12px; }
      .at-label { margin:14px 0 8px; color:#8a877f; font-size:12px; }
      .at-bg { display:flex; gap:6px; }
      .at-bg button { flex:1; height:32px; border-radius:8px; border:1px solid #2c2b28; background:#111110; color:#f2efe8; font:inherit; cursor:pointer; }
      .at-bg button.on { background:#f2efe8; color:#151514; border-color:#f2efe8; }
    </style>
    <div class="at">
      <div class="at-head"><b><i></i>Accent</b><span class="at-tog">hide</span></div>
      <div class="at-body">
        <div class="at-sw"></div>
        <div class="at-row">
          <input type="color" aria-label="Pick any color">
          <input type="text" aria-label="Hex value" spellcheck="false">
          <button class="at-copy">copy</button>
        </div>
        <div class="at-label">Hero background</div>
        <div class="at-bg"></div>
        <div class="at-hint">Accent tints the hero, status dot, first card and hovers. Both are remembered on reload.</div>
      </div>
    </div>`;
  document.body.append(panel);

  const box = panel.querySelector('.at'), sw = panel.querySelector('.at-sw');
  const picker = panel.querySelector('input[type=color]'), text = panel.querySelector('input[type=text]');

  presets.forEach(([name, hex]) => {
    const b = document.createElement('button');
    b.title = name; b.style.background = hex; b.dataset.hex = hex;
    b.onclick = () => apply(hex);
    sw.append(b);
  });

  function apply(hex) {
    if (!/^#[0-9a-f]{6}$/i.test(hex)) return;
    hex = hex.toLowerCase();
    root.style.setProperty('--accent', hex);
    root.style.setProperty('--on-accent', onColor(hex));
    picker.value = hex; text.value = hex;
    sw.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.hex === hex));
    try { localStorage.setItem(KEY, hex); } catch (e) {}
  }

  picker.oninput = () => apply(picker.value);
  text.onchange = () => apply(text.value.startsWith('#') ? text.value : '#' + text.value);
  panel.querySelector('.at-copy').onclick = e => {
    navigator.clipboard?.writeText(text.value);
    e.target.textContent = 'copied'; setTimeout(() => e.target.textContent = 'copy', 1200);
  };
  panel.querySelector('.at-head').onclick = () => {
    box.classList.toggle('min');
    panel.querySelector('.at-tog').textContent = box.classList.contains('min') ? 'show' : 'hide';
  };

  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  apply(saved || initial);

  // hero background buttons (filled in once shared/hero-bg.js has loaded)
  addEventListener('load', () => {
    if (!window.heroBg) return panel.querySelector('.at-label').remove();
    const row = panel.querySelector('.at-bg');
    Object.entries(window.heroBg.modes).forEach(([key, label]) => {
      const b = document.createElement('button');
      b.textContent = label; b.dataset.m = key;
      b.classList.toggle('on', window.heroBg.get() === key);
      b.onclick = () => window.heroBg.set(key);
      row.append(b);
    });
  });
})();
