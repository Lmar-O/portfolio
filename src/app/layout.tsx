import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { site } from "@/content/site";
import DevTools from "@/components/DevTools";
import "./globals.css";

const display = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "700", "800"], variable: "--font-display" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

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
        {/* design-time panels; dev only, not included in production builds */}
        <DevTools />
      </body>
    </html>
  );
}
