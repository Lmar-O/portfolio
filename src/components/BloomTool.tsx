"use client";

import { useEffect, useState } from "react";

// Dev-only panel for sizing the scroll-in blooms live (only rendered by `npm run dev`).
// Sliders write inline styles on the bloom elements; "copy CSS" gives you the rule to paste
// into src/app/globals.css (or just tell Claude the numbers).

type Key = "side" | "foot";
type Vals = { width: number; height: number; ew: number; eh: number; shift: number };

const DEFAULTS: Record<Key, Vals> = {
  // shift = px the glow's center sits below the middle of the gap between Built and Shot
  side: { width: 78, height: 1360, ew: 51, eh: 67, shift: 150 },
  foot: { width: 100, height: 440, ew: 62, eh: 72, shift: 0 },
};
const LABEL: Record<Key, string> = { side: "Right (Built → Shot)", foot: "Footer" };
const SEL: Record<Key, string> = { side: ".side-bloom", foot: ".foot-bloom" };
const STORE = "lmar-bloom-sizes";

// CSS for each bloom given the slider values
function rule(k: Key, v: Vals) {
  if (k === "side") {
    // keep the center on the gap: bottom = -(height/2 - 70px) + shift
    const bottom = -(v.height / 2 - 70) - v.shift;
    return { width: `min(${v.width}vw, ${Math.round(v.width * 14.1)}px)`, height: `${v.height}px`, bottom: `${bottom}px`, "--ew": `${v.ew}%`, "--eh": `${v.eh}%` };
  }
  return { width: `${v.width}vw`, left: `calc(50% - ${v.width / 2}vw)`, height: `${v.height}px`, bottom: `${-v.shift}px`, "--ew": `${v.ew}%`, "--eh": `${v.eh}%` };
}

const SLIDERS: { k: keyof Vals; label: string; min: number; max: number; unit: string; only?: Key }[] = [
  { k: "width", label: "Width", min: 30, max: 100, unit: "vw" },
  { k: "height", label: "Height", min: 200, max: 2000, unit: "px" },
  { k: "ew", label: "Glow width", min: 20, max: 120, unit: "%" },
  { k: "eh", label: "Glow height", min: 20, max: 120, unit: "%" },
  { k: "shift", label: "Move down", min: -600, max: 600, unit: "px" },
];

export default function BloomTool() {
  const [which, setWhich] = useState<Key>("side");
  const [vals, setVals] = useState<Record<Key, Vals>>(DEFAULTS);
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  // load saved values once
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE) || "null");
      if (saved) setVals({ side: { ...DEFAULTS.side, ...saved.side }, foot: { ...DEFAULTS.foot, ...saved.foot } });
    } catch {}
  }, []);

  // apply to the page whenever values change
  useEffect(() => {
    (Object.keys(vals) as Key[]).forEach((k) => {
      const el = document.querySelector<HTMLElement>(SEL[k]);
      if (!el) return;
      Object.entries(rule(k, vals[k])).forEach(([p, v]) => el.style.setProperty(p, v));
    });
    try { localStorage.setItem(STORE, JSON.stringify(vals)); } catch {}
  }, [vals]);

  const set = (k: keyof Vals, n: number) => setVals((v) => ({ ...v, [which]: { ...v[which], [k]: n } }));

  const show = () => {
    const el = document.querySelector<HTMLElement>(SEL[which]);
    if (!el) return;
    el.classList.add("in");
    const r = el.getBoundingClientRect();
    scrollTo({ top: scrollY + r.top + r.height / 2 - innerHeight / 2, behavior: "smooth" });
  };

  const css = () => {
    const r = rule(which, vals[which]);
    const decl = Object.entries(r).map(([p, v]) => `${p}: ${v};`).join(" ");
    return `${SEL[which]} { ${decl} }`;
  };

  const v = vals[which];

  return (
    <div className={`bt${open ? "" : " min"}`}>
      <style>{`
        .bt { position:fixed; left:16px; bottom:64px; z-index:9000; width:272px; padding:14px; border-radius:16px;
          background:rgba(24,24,22,.92); backdrop-filter:blur(14px); border:1px solid #2c2b28; color:#f2efe8;
          font:500 13px/1.3 var(--display); box-shadow:0 12px 40px rgba(0,0,0,.4); }
        .bt.min .bt-body { display:none; }
        .bt-head { display:flex; justify-content:space-between; align-items:center; cursor:pointer; user-select:none; background:none; border:0; color:inherit; font:inherit; width:100%; padding:0; }
        .bt-head b { font-weight:700; }
        .bt-head span { color:#8a877f; }
        .bt-tabs { display:flex; gap:6px; margin:12px 0; }
        .bt-tabs button { flex:1; height:30px; border-radius:8px; border:1px solid #2c2b28; background:#111110; color:#f2efe8; font:inherit; font-size:12px; cursor:pointer; }
        .bt-tabs button.on { background:#f2efe8; color:#151514; border-color:#f2efe8; }
        .bt-row { display:grid; grid-template-columns:78px 1fr 58px; gap:8px; align-items:center; margin:8px 0; }
        .bt-row label { color:#bdb9b0; font-size:12px; }
        .bt-row input { width:100%; accent-color:var(--accent); }
        .bt-row output { text-align:right; font-variant-numeric:tabular-nums; font-size:12px; color:#bdb9b0; }
        .bt-btns { display:flex; gap:6px; margin-top:12px; }
        .bt-btns button { flex:1; height:30px; border-radius:8px; border:0; background:#2a2926; color:#f2efe8; font:inherit; font-size:12px; cursor:pointer; }
        .bt-btns button.pri { background:#f2efe8; color:#151514; font-weight:700; }
        .bt-hint { margin-top:10px; color:#8a877f; font-size:11.5px; }
      `}</style>
      <button className="bt-head" onClick={() => setOpen(!open)}>
        <b>Bloom size</b><span>{open ? "hide" : "show"}</span>
      </button>
      <div className="bt-body">
        <div className="bt-tabs">
          {(Object.keys(LABEL) as Key[]).map((k) => (
            <button key={k} className={which === k ? "on" : ""} onClick={() => setWhich(k)}>{LABEL[k]}</button>
          ))}
        </div>
        {SLIDERS.map((s) => (
          <div className="bt-row" key={s.k}>
            <label htmlFor={`bt-${s.k}`}>{s.label}</label>
            <input id={`bt-${s.k}`} type="range" min={s.min} max={s.max} step={s.unit === "px" ? 10 : 1}
              value={v[s.k]} onChange={(e) => set(s.k, Number(e.target.value))} />
            <output>{v[s.k]}{s.unit}</output>
          </div>
        ))}
        <div className="bt-btns">
          <button onClick={show}>show it</button>
          <button onClick={() => setVals((all) => ({ ...all, [which]: DEFAULTS[which] }))}>reset</button>
          <button className="pri" onClick={() => { navigator.clipboard?.writeText(css()); setCopied(true); setTimeout(() => setCopied(false), 1200); }}>
            {copied ? "copied" : "copy CSS"}
          </button>
        </div>
        <div className="bt-hint">Dev only. Changes are live and remembered on reload. Send me the copied CSS (or the numbers) and I&apos;ll bake them in.</div>
      </div>
    </div>
  );
}
