// Everything you'd normally edit lives here: projects, links, email.

export const site = {
  name: "Lmar Oria",
  firstName: "Lmar",
  email: "hello@lmaroria.com", // TODO: swap in your real email
  instagram: "lmaroria",
  links: {
    github: "#", // TODO
    linkedin: "#", // TODO
    instagram: "https://instagram.com/lmaroria",
  },
  // Background text on the loading screen.
  loaderLine: "This is my space where I like to dibble and dabble here and there.",
};

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
