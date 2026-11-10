"use client";

import dynamic from "next/dynamic";

// Design-time panels (accent picker, bloom sizes). The dev-only check is resolved at build
// time, so production builds drop this import entirely and the panels' code never ships.
const Panels =
  process.env.NODE_ENV === "development"
    ? dynamic(() => import("./DevPanels"), { ssr: false })
    : () => null;

export default function DevTools() {
  return <Panels />;
}
