import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/content/site";
import "./globals.css";

// Self-hosted (latin variable fonts from Google Fonts, OFL) so the build never has to
// reach Google: next/font/google failed on Netlify's build servers.
const display = localFont({ src: "./fonts/InterTight-latin.woff2", weight: "400 800", variable: "--font-display", fallback: ["system-ui", "sans-serif"] });
const mono = localFont({ src: "./fonts/JetBrainsMono-latin.woff2", weight: "400 500", variable: "--font-mono", fallback: ["ui-monospace", "monospace"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://lmaroria.com"),
  title: site.name,
  description: "Software engineer & photographer. This is where I'll put cool things I've built or made.",
  openGraph: {
    title: site.name,
    description: "Software engineer & photographer.",
    url: "https://lmaroria.com",
    siteName: site.name,
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#0c0c0b" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Runs before first paint: if the loader was already shown this session, hide it
            right away (see SEEN_KEY in components/Loader.tsx). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("lmar-loader-seen"))document.documentElement.classList.add("loader-seen")}catch(e){}`,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
