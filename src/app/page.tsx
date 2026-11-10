import Loader from "@/components/Loader";
import Reveals from "@/components/Reveals";
import Instagram from "@/components/Instagram";
import { projects, site, type Project } from "@/content/site";

// Splits a headline into per-letter spans so it can blur in letter by letter.
function BlurIn({ text }: { text: string }) {
  return (
    <h1 className="blur-in" aria-label={text}>
      {text.split("").map((c, i) => (
        <span key={i} aria-hidden="true" style={{ "--i": i } as React.CSSProperties}>{c}</span>
      ))}
    </h1>
  );
}

function Squiggle({ kind }: { kind: Project["squiggle"] }) {
  if (!kind) return null;
  const d = kind === "wave" ? "M0 80 Q 25 0 50 50 T 100 50 T 150 50 T 200 20" : "M0 90 L40 20 L80 80 L120 10 L160 70 L200 0";
  return (
    <svg className="squig" viewBox="0 0 200 100" aria-hidden="true">
      <path d={d} stroke="#151514" strokeWidth="6" fill="none" />
    </svg>
  );
}

export default function Home() {
  const marquee = Array.from({ length: 4 }, () => ["software engineer", "✦", "photographer", "✦"]).flat();

  return (
    <>
      <Loader />
      <Reveals />

      <nav className="nav">
        <div className="wrap">
          <a className="logo" href="#">{site.name}</a>
          <ul>
            <li><a href="#built">built</a></li>
            <li><a href="#shot">shot</a></li>
            <li><a href="#hi">say hi</a></li>
          </ul>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="wrap">
          <BlurIn text={`Hi! I'm ${site.firstName}.`} />
          <p className="role r" style={{ "--d": ".5s" } as React.CSSProperties}><b>Software engineer</b> &amp; photographer.</p>
          <p className="hi r" style={{ "--d": ".65s" } as React.CSSProperties}>This is where I&apos;ll put cool things I&apos;ve built or made.</p>
        </div>
        <span className="scroll-hint">↓ scroll</span>
        {/* the strip sits inside the hero so the glow carries on behind it and fades out below */}
        <div className="marquee" aria-hidden="true">
          <div>{marquee.map((w, i) => <span key={i}>{w}</span>)}</div>
        </div>
      </header>

      <main className="wrap">
        <section id="built">
          <div className="bloom side-bloom" aria-hidden="true" />
          <h2 className="big r">Stuff I&apos;ve<span className="sub">built</span></h2>
          <div className="projects">
            {projects.map((p, i) => (
              <a key={p.title} className={`p ${p.color} r`} href={p.href} style={{ "--d": `${(i % 2) * 0.1}s` } as React.CSSProperties}>
                <span className="tag">{p.tag}</span>
                <span className="arrow" aria-hidden="true">→</span>
                <h3>{p.title}</h3>
                <p className="desc">{p.blurb}</p>
                <Squiggle kind={p.squiggle} />
              </a>
            ))}
          </div>
        </section>

        <section id="shot">
          <h2 className="big r">Stuff I&apos;ve<span className="sub">shot</span></h2>
          <Instagram />
          <a className="more" href={site.links.instagram} target="_blank" rel="noopener noreferrer">more on @{site.instagram} →</a>
        </section>

        <section id="hi">
          <h2 className="big r">Say<span className="sub">hi</span></h2>
          <a className="hi-btn r" href={`mailto:${site.email}`}>{site.email} <span aria-hidden="true">↗</span></a>
        </section>

        <footer className="footer">
          <div className="bloom foot-bloom" aria-hidden="true" />
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>
            <a href={site.links.github}>GitHub</a> · <a href={site.links.linkedin}>LinkedIn</a> · <a href={site.links.instagram}>Instagram</a>
          </span>
        </footer>
      </main>
    </>
  );
}
