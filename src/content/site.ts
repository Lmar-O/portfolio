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
  color?: "accent" | "lime" | "cream"; // card colour, same options as projects (default cream)
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
      "Designed reservation-based inventory with atomic MySQL updates and Stripe session-expiry webhooks to release held stock — zero overselling with 20 concurrent checkouts racing for a single copy.",
      "Hardened Stripe webhooks against forged, replayed and duplicate events, backed by a PHPUnit suite GitHub Actions requires before any merge.",
      "Rebuilt the public site on headless WordPress with an RTL-first Dari/Pashto front end for 259+ articles, keeping existing URLs and search traffic intact with redirects.",
    ],
  },
];

export type Project = {
  title: string;
  blurb: string;
  tag: string; // e.g. "iOS · 2026"
  href: string;
  color: "accent" | "lime" | "cream";
  squiggle?: "wave" | "zigzag";
};

// The first project gets the wide card at the top.
export const projects: Project[] = [
  { title: "Project one", blurb: "one line on what it does", tag: "iOS · 2026", href: "#", color: "accent", squiggle: "wave" },
  { title: "Project two", blurb: "one line on what it does", tag: "Web · 2025", href: "#", color: "lime", squiggle: "zigzag" },
  { title: "Project three", blurb: "one line on what it does", tag: "Tool · 2025", href: "#", color: "cream" },
];
