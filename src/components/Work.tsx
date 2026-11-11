"use client";

import { useRef, useState } from "react";
import { jobs } from "@/content/site";

// Company list on the left (styled like the "Say hi" social links), the selected job on the
// right as a card in the same style as the project cards. Add jobs in content/site.ts.
export default function Work() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const job = jobs[active];

  // arrow keys move between tabs, like a native tablist
  function onKey(e: React.KeyboardEvent) {
    const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + jobs.length) % jobs.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  const card = (
    <>
      <span className="tag">{job.dates}{job.location && <> · {job.location}</>}</span>
      <h3>{job.role}</h3>
      <p className="at">@ {job.company}</p>
      {job.note && <p className="work-note">{job.note}</p>}
      <ul className="work-points">{job.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
      {job.stack && <ul className="work-stack">{job.stack.map((s) => <li key={s}>{s}</li>)}</ul>}
      {/* a pill like the "Say hi" email button, so it's obvious the card goes somewhere */}
      {job.href && (
        <span className="work-link">{job.linkLabel ?? job.href.replace(/^https?:\/\/(www\.)?/, "")} <span aria-hidden="true">↗</span></span>
      )}
    </>
  );

  return (
    <div className="work">
      <div className="work-tabs r" role="tablist" aria-label="Places I've worked" aria-orientation="vertical" onKeyDown={onKey}>
        <span className="social-label">Places</span>
        {jobs.map((j, i) => (
          <button key={j.company} ref={(el) => { tabs.current[i] = el; }} role="tab" id={`work-tab-${i}`}
            aria-selected={i === active} aria-controls="work-panel" tabIndex={i === active ? 0 : -1}
            className={i === active ? "on" : undefined} onClick={() => setActive(i)}>
            {j.company} <span aria-hidden="true">→</span>
          </button>
        ))}
      </div>

      {/* key remounts the card so it fades in fresh on each switch; the whole card links to the company site */}
      <div className="work-panel r" style={{ "--d": ".1s" } as React.CSSProperties}>
        {job.href ? (
          <a key={active} className={`p work-card ${job.color ?? "cream"}`} href={job.href} target="_blank" rel="noopener noreferrer"
            role="tabpanel" id="work-panel" aria-labelledby={`work-tab-${active}`}>{card}</a>
        ) : (
          <div key={active} className={`p work-card ${job.color ?? "cream"}`}
            role="tabpanel" id="work-panel" aria-labelledby={`work-tab-${active}`}>{card}</div>
        )}
      </div>
    </div>
  );
}
