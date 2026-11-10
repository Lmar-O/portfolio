import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function config(phase: string): NextConfig {
  return {
    // Static export: `npm run build` writes a plain HTML/CSS/JS site to ./out
    // that can be hosted anywhere (Vercel, Netlify, GitHub Pages, Cloudflare Pages).
    output: "export",
    // Keep the dev server's files separate from production builds, so running
    // `npm run build` while `npm run dev` is up doesn't break the dev server.
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
    // There's a package-lock.json in the home folder too; pin the project root to this repo.
    outputFileTracingRoot: process.cwd(),
  };
}
