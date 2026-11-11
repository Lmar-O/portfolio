import Loader from "@/components/Loader";
import Reveals from "@/components/Reveals";
import Instagram from "@/components/Instagram";
import Work from "@/components/Work";
import { projects, site } from "@/content/site";

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

export default function Home() {
  const stack = [
    "TypeScript", "Next.js", "React", "Node.js", "Python", "PHP",
    "Stripe", "Docker", "Kubernetes", "AWS", "PostgreSQL", "Supabase",
    "MySQL", "Prisma", "Tailwind CSS", "GitHub Actions",
  ];
  // Two copies so the -50% translate loops seamlessly.
  const marquee = [...stack, ...stack];

  return (
    <>
      <Loader />
      <Reveals />

      <nav className="nav">
        <div className="wrap">
          <a className="logo" href="#">{site.name}</a>
          <ul>
            <li><a href="#worked">worked</a></li>
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
          <p className="role r" style={{ "--d": ".5s" } as React.CSSProperties}><b>A <span className="shimmer">software engineer</span></b> &amp; <span className="shimmer purple" style={{ "--sd": "-.6s" } as React.CSSProperties}>photographer</span>.</p>
          <p className="hi r" style={{ "--d": ".65s" } as React.CSSProperties}>This is where I&apos;ll put cool things I&apos;ve built or made.</p>
        </div>
        <span className="scroll-hint">↓ scroll</span>
        {/* the strip sits inside the hero so the glow carries on behind it and fades out below */}
        <div className="marquee" aria-hidden="true">
          <div>{marquee.map((w, i) => <span key={i}>{w}</span>)}</div>
        </div>
      </header>

      <main className="wrap">
        <section id="worked">
          <div className="bloom left-bloom" aria-hidden="true" />
          <h2 className="big r">Where I&apos;ve<span className="sub shimmer violet" style={{ "--sd": "-.3s" } as React.CSSProperties}>worked</span></h2>
          <Work />
        </section>

        <section id="built">
          <div className="bloom side-bloom" aria-hidden="true" />
          <h2 className="big r">Stuff I&apos;ve<span className="sub shimmer">built</span></h2>
          <div className="projects">
            {projects.map((p, i) => {
              const body = (
                <>
                  <span className="tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p className="desc">{p.blurb}</p>
                  {p.note && <p className="work-note">{p.note}</p>}
                  {p.points && <ul className="work-points">{p.points.map((pt, j) => <li key={j}>{pt}</li>)}</ul>}
                  {p.stack && <ul className="work-stack">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>}
                  {p.href && <span className="p-link" aria-hidden="true"><span>↗</span></span>}
                </>
              );
              const props = { className: `p ${p.color} r`, style: { "--d": `${(i % 2) * 0.1}s` } as React.CSSProperties };
              return p.href ? (
                <a key={p.title} {...props} href={p.href} target="_blank" rel="noopener noreferrer">{body}</a>
              ) : (
                <div key={p.title} {...props}>{body}</div>
              );
            })}
          </div>
        </section>

        <section id="shot">
          <h2 className="big r">Stuff I&apos;ve<span className="sub shimmer purple" style={{ "--sd": "-.6s" } as React.CSSProperties}>shot</span></h2>
          <Instagram />
          <a className="more" href={site.links.instagram} target="_blank" rel="noopener noreferrer">more on @{site.instagram} →</a>
        </section>

        <section id="hi">
          {/* heading + email button on the left, social links on the right, spanning the same height */}
          <div className="hi-row">
            <div className="hi-main">
              <h2 className="big r">Say<span className="sub shimmer violet" style={{ "--sd": "-1.2s" } as React.CSSProperties}>hi</span></h2>
              <a className="hi-btn r" href={`mailto:${site.email}`}>{site.email} <span aria-hidden="true">↗</span></a>
            </div>
            <nav className="social r" aria-label="Social">
              <span className="social-label">Social</span>
              <a href={site.links.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
              <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
              <a href={site.links.instagram} target="_blank" rel="noopener noreferrer">Instagram <span aria-hidden="true">↗</span></a>
            </nav>
          </div>
        </section>

        <footer className="footer">
          <div className="bloom foot-bloom" aria-hidden="true" />
          <span>© {new Date().getFullYear()} {site.name}</span>
        </footer>
      </main>
    </>
  );
}
