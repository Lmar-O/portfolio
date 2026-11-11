// Everything you'd normally edit lives here: projects, links, email.

export const site = {
  name: "Lmar Oria",
  firstName: "Lmar",
  email: "hello@lmaroria.com",
  instagram: "lmaroria",
  links: {
    github: "https://github.com/Lmar-O",
    linkedin: "https://www.linkedin.com/in/lmaroria",
    instagram: "https://www.instagram.com/lmaroria/",
  },
  // Background text on the loading screen.
  loaderLine: "This is my space where I like to dibble and dabble here and there.",
};

export type Job = {
  company: string;   // shown in the sidebar tab
  role: string;
  href?: string;     // makes the whole card a link, with a button at the bottom
  linkLabel?: string; // button text; defaults to the URL without https://
  note?: string;      // small aside under the company name
  dates: string;     // e.g. "Sep 2026 – Present"
  location?: string;
  stack?: string[];
  points: string[];
  color?: "accent" | "lime" | "violet" | "cream"; // card colour, same options as projects (default cream)
};

// Newest first. Add a job to the top of this list and it gets its own tab.
export const jobs: Job[] = [
  {
    company: "Lmar Media",
    role: "Software Engineer",
    href: "https://lmarmagazine.com/shop",
    linkLabel: "lmarmagazine.com",
    note: "(yes, we share a name and no, it's not my company.)",
    dates: "Sep 2026 – Present",
    location: "Remote",
    color: "accent",
    stack: ["PHP", "JavaScript", "MySQL", "Stripe", "GitHub Actions"],
    points: [
      "Built the magazine's online shop from scratch: a bilingual Dari/English storefront with RTL/LTR layouts, a vanilla JS front end and a PHP API on Stripe Checkout, with prices resolved server-side so clients can't tamper with totals.",
      "Designed reservation-based inventory with atomic MySQL updates and Stripe session-expiry webhooks to release held stock and zero overselling when testing 20 concurrent checkouts racing for a single copy.",
      "Hardened Stripe webhooks against forged, replayed and duplicate events, backed by a PHPUnit suite that has to pass in the CI/CD pipeline before any merge.",
      "Rebuilt the public site on headless WordPress with an RTL-first Dari/Pashto front end for 259+ articles, keeping existing URLs and search traffic intact with redirects.",
    ],
  },
];

export type Project = {
  title: string;
  blurb: string;
  tag: string; // e.g. "iOS · 2026"
  href?: string;      // makes the whole card a link, with a round arrow button at the bottom
  note?: string;      // small aside under the blurb, e.g. team credit
  stack?: string[];
  points?: string[];
  color: "accent" | "lime" | "violet" | "cream";
};

// The first project gets the wide card at the top (and the last one too, if it would sit alone).
export const projects: Project[] = [
  {
    title: "Phishing Email Detection",
    blurb: "Classifying phishing emails from their text alone, classical ML vs. a fine-tuned transformer.",
    tag: "ML · NLP · 2026",
    href: "https://github.com/cam-ortiz/phishing-email-detection-nlp",
    note: "Team of 4.",
    color: "accent",
    stack: ["Python", "PyTorch", "Hugging Face", "scikit-learn"],
    points: [
      "Built the DistilBERT fine-tuning and experiment runner, reaching 99.6% F1 on a balanced phishing dataset and 98.8% on Enron.",
      "Benchmarked it against TF-IDF baselines (Logistic Regression, Naive Bayes, LinearSVC), with the best baseline at 99.1% F1.",
      "Linguistic analysis showed phishing emails use about 15× more urgency, authority and sensitive-request cues than legitimate mail.",
    ],
  },
  {
    title: "Maal",
    blurb: "A halal personal-finance roadmap: milestones, Sharia-compliant products and a zakat calculator.",
    tag: "Web · 2026",
    href: "https://github.com/Lmar-O/Maal",
    color: "violet",
    stack: ["Next.js", "TypeScript", "Prisma", "Clerk", "Stripe", "Tailwind CSS"],
    points: [
      "Four-step onboarding (income, savings and debt, investments, goals) feeds a personalised milestone roadmap, with plain-language explanations of key financial literacy terms along the way.",
      "Halal product catalog with compliance badges and affiliate click tracking, plus a zakat calculator with saved history.",
      "Prisma/Postgres schema across 8 models, Clerk auth with just-in-time user sync, and Stripe subscriptions via checkout, billing portal and webhooks.",
    ],
  },
  {
    title: "Captured",
    blurb: "Get footage off a card and onto your Mac, organized, in one pass.",
    tag: "macOS · 2026",
    href: "https://github.com/Lmar-O/captured",
    color: "cream",
    stack: ["Electron", "JavaScript", "Node.js", "GitHub Actions"],
    points: [
      "Desktop app that finds mounted cards, scans them for video (MP4, MOV, MXF, BRAW, R3D, INSV and more) with Finder-quality thumbnails, and imports the picked clips into dated folders.",
      "Renames clips in shoot order across every date folder and can tag frame rate read from the file itself, so C1850.MP4 lands as C1850_120fps.MP4.",
      "Keeps sidecars (XML, SRT, THM) paired and renamed with their clips, skips DJI proxy files, never overwrites anything and preserves capture times.",
      "Tagged releases build a universal Apple Silicon/Intel DMG on GitHub Actions, backed by a 32-test unit suite.",
    ],
  },
  {
    title: "Docker Weather App",
    blurb: "A Flask weather app, containerized and deployed to a local Kubernetes cluster.",
    tag: "DevOps · 2025",
    href: "https://github.com/costello-aaron/DockerApp",
    note: "Team project.",
    color: "accent",
    stack: ["Python", "Flask", "Docker", "Kubernetes"],
    points: [
      "Search any U.S. city for current, hourly and 7-day forecasts in °F and °C, built on the National Weather Service and OpenStreetMap APIs.",
      "Wrote the Kubernetes manifests: a replicated Deployment with health checks and resource limits, and a Service exposing it outside the cluster.",
      "Documented the full minikube workflow, from building inside minikube's Docker daemon to deploying with kubectl.",
    ],
  },
];
