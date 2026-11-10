"use client";

import { useEffect, useState } from "react";

// Dev-only panel for trying accent colors live (only rendered by `npm run dev`).
// When you settle on one, put it in --accent in src/app/globals.css.

const PRESETS: [string, string][] = [
  ["orange", "#ff6b2c"], ["red", "#ff3b30"], ["pink", "#ff5fa2"], ["violet", "#8b5cf6"],
  ["blue", "#3b82f6"], ["cyan", "#3dd6e1"], ["teal", "#14b8a6"], ["green", "#22c55e"],
  ["yellow", "#facc15"], ["amber", "#f59e0b"], ["cream", "#e8dcc4"], ["white", "#f2efe8"],
];
const KEY = "lmar-accent";

// dark or light text on top of the accent, whichever reads better
const onColor = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.22 ? "#151514" : "#f2efe8";
};

export default function AccentTool() {
  const [hex, setHex] = useState("");
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const apply = (h: string) => {
    if (!/^#[0-9a-f]{6}$/i.test(h)) return;
    h = h.toLowerCase();
    document.documentElement.style.setProperty("--accent", h);
    document.documentElement.style.setProperty("--on-accent", onColor(h));
    setHex(h);
    try { localStorage.setItem(KEY, h); } catch {}
  };

  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(KEY); } catch {}
    apply(saved || getComputedStyle(document.documentElement).getPropertyValue("--accent").trim());
  }, []);

  return (
    <div className={`at${open ? "" : " min"}`}>
      <style>{`
        .at { position:fixed; right:16px; bottom:16px; z-index:9000; width:248px; padding:14px; border-radius:16px;
          background:rgba(24,24,22,.92); backdrop-filter:blur(14px); border:1px solid #2c2b28; color:#f2efe8;
          font:500 13px/1.3 var(--display); box-shadow:0 12px 40px rgba(0,0,0,.4); }
        .at.min .at-body { display:none; }
        .at-head { display:flex; justify-content:space-between; align-items:center; cursor:pointer; user-select:none; background:none; border:0; color:inherit; font:inherit; width:100%; padding:0; }
        .at-head b { display:flex; align-items:center; gap:8px; font-weight:700; }
        .at-head b i { width:14px; height:14px; border-radius:50%; background:var(--accent); }
        .at-head span { color:#8a877f; }
        .at-sw { display:grid; grid-template-columns:repeat(6,1fr); gap:6px; margin:12px 0; }
        .at-sw button { aspect-ratio:1; border-radius:8px; border:2px solid transparent; cursor:pointer; padding:0; }
        .at-sw button.on { border-color:#f2efe8; }
        .at-row { display:flex; gap:8px; align-items:center; }
        .at-row input[type=color] { width:36px; height:32px; border:0; padding:0; background:none; cursor:pointer; }
        .at-row input[type=text] { flex:1; min-width:0; height:32px; border-radius:8px; border:1px solid #2c2b28; background:#111110; color:inherit; padding:0 10px; font:inherit; }
        .at-row button { height:32px; padding:0 10px; border-radius:8px; border:0; background:#f2efe8; color:#151514; font:inherit; font-weight:700; cursor:pointer; }
        .at-hint { margin-top:10px; color:#8a877f; font-size:12px; }
      `}</style>
      <button className="at-head" onClick={() => setOpen(!open)}>
        <b><i />Accent</b><span>{open ? "hide" : "show"}</span>
      </button>
      <div className="at-body">
        <div className="at-sw">
          {PRESETS.map(([name, h]) => (
            <button key={h} title={name} style={{ background: h }} className={hex === h ? "on" : ""} onClick={() => apply(h)} />
          ))}
        </div>
        <div className="at-row">
          <input type="color" aria-label="Pick any color" value={hex || "#000000"} onChange={(e) => apply(e.target.value)} />
          <input type="text" aria-label="Hex value" spellCheck={false} defaultValue={hex} key={hex}
            onBlur={(e) => apply(e.target.value.startsWith("#") ? e.target.value : "#" + e.target.value)} />
          <button onClick={() => { navigator.clipboard?.writeText(hex); setCopied(true); setTimeout(() => setCopied(false), 1200); }}>
            {copied ? "copied" : "copy"}
          </button>
        </div>
        <div className="at-hint">Dev only. When you&apos;ve picked one, set --accent in globals.css.</div>
      </div>
    </div>
  );
}
