"use client";

import { useEffect, useRef, useState } from "react";
import { markEntered } from "@/lib/enter";
import { site } from "@/content/site";

// Loading screen: counts to 100 while a white outline fills around the pill, backspaces
// "loading", types "welcome →", then a black circle grows from the click and reveals the site.

const ROWS = 19;
const COLORS = ["#f07f4f", "#4fb87a", "#5a96e0", "#e8679c", "#e3ae2a", "#9a78e6", "#2fb8a8"];
const WORD = "welcome →";
const LOAD_MS = 2400;
// Remembered for the browser tab's session: reloads and in-site navigation skip the loader,
// a new tab or a fresh visit shows it again. The inline script in layout.tsx reads the same key
// before first paint so a returning visitor never sees a flash of the loader.
export const SEEN_KEY = "lmar-loader-seen";

export default function Loader() {
  const [gone, setGone] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (document.documentElement.classList.contains("loader-seen")) {
      setGone(true);
      markEntered();
      return;
    }
    const el = root.current!;
    const pill = el.querySelector<HTMLButtonElement>(".ld-pill")!;
    const btn = el.querySelector<HTMLDivElement>(".ld-btn")!;
    const shine = el.querySelector<HTMLSpanElement>(".ld-shine")!;
    const t = el.querySelector<HTMLSpanElement>(".t")!;
    const n = el.querySelector<HTMLSpanElement>(".n")!;
    const cur = el.querySelector<HTMLSpanElement>(".cur")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    let raf = 0;

    document.documentElement.style.overflow = "hidden";

    const onMove = (e: PointerEvent) => {
      const r = pill.getBoundingClientRect();
      pill.style.setProperty("--mx", e.clientX - r.left + "px");
      pill.style.setProperty("--my", e.clientY - r.top + "px");
    };

    const enter = (e?: MouseEvent) => {
      if (!el.classList.contains("ready") || el.classList.contains("open")) return;
      // grow the circle from wherever you clicked (or the pill's center)
      const r = pill.getBoundingClientRect();
      el.style.setProperty("--fx", (e?.clientX || r.left + r.width / 2) + "px");
      el.style.setProperty("--fy", (e?.clientY || r.top + r.height / 2) + "px");
      el.classList.add("open", "gone");
      try { sessionStorage.setItem(SEEN_KEY, "1"); } catch {}
      document.documentElement.style.overflow = "";
      timers.push(window.setTimeout(markEntered, reduce ? 0 : 900));
      timers.push(window.setTimeout(() => setGone(true), reduce ? 0 : 1500));
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Enter") enter(); };

    pill.addEventListener("pointermove", onMove);
    pill.addEventListener("click", enter);
    window.addEventListener("keydown", onKey);

    const ready = () => {
      el.classList.add("ready");
      pill.setAttribute("aria-label", "Enter site");
    };

    // count up, filling the outline as we go
    const start = performance.now();
    const tick = (now: number) => {
      const p = reduce ? 1 : Math.min(1, (now - start) / LOAD_MS);
      const eased = 1 - Math.pow(1 - p, 3);
      n.textContent = String(Math.round(eased * 100));
      btn.style.setProperty("--p", String(eased));
      shine.style.setProperty("--spin", eased * 360 + "deg");
      if (p < 1) { raf = requestAnimationFrame(tick); return; }

      n.style.display = "none";
      if (reduce) { t.textContent = WORD; ready(); return; }
      // backspace "loading", then type the welcome like a terminal
      cur.classList.add("typing");
      const erase = () => {
        if (t.textContent!.length) { t.textContent = t.textContent!.slice(0, -1); timers.push(window.setTimeout(erase, 45)); return; }
        let i = 0;
        const type = () => {
          t.textContent = WORD.slice(0, ++i);
          if (i < WORD.length) { timers.push(window.setTimeout(type, 70 + Math.random() * 60)); return; }
          cur.classList.remove("typing");
          ready();
        };
        timers.push(window.setTimeout(type, 250));
      };
      erase();
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      pill.removeEventListener("pointermove", onMove);
      pill.removeEventListener("click", enter);
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  const mid = (ROWS - 1) / 2;
  return (
    <div className="ld" ref={root} aria-live="polite">
      <div className="ld-lines" aria-hidden="true">
        {Array.from({ length: ROWS }, (_, i) => (
          <div key={i} className={`ld-row${Math.abs(i - mid) % 2 === 1 ? " rev" : ""}`} style={{ color: COLORS[i % COLORS.length] }}>
            <div className="ld-track" style={{ "--delay": `-${(i * 7.3) % 45}s` } as React.CSSProperties}>
              {Array.from({ length: 4 }, (_, k) => <span key={k}>{site.loaderLine}</span>)}
            </div>
          </div>
        ))}
      </div>
      <div className="ld-btn">
        <span className="ld-glow"><span className="ld-ring" /></span>
        <button className="ld-pill" aria-label="Loading">
          <span className="glow" />
          <span className="t">loading</span><span className="n">0</span><span className="cur" />
        </button>
        <span className="ld-shine" />
      </div>
      <div className="ld-fill" />
    </div>
  );
}
