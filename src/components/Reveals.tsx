"use client";

import { useEffect } from "react";
import { onEnter } from "@/lib/enter";

// After the loader opens, fade/slide in every `.r` element (and blur in every `.blur-in`
// headline, and radially fade in every `.bloom`) as it scrolls into view. Set `--d` inline on an element to delay it.
export default function Reveals() {
  useEffect(() => {
    let io: IntersectionObserver | undefined;
    const off = onEnter(() => {
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in"); io!.unobserve(e.target); }
        }),
        { threshold: 0.15 },
      );
      document.querySelectorAll(".r, .blur-in, .bloom").forEach((el) => io!.observe(el));
    });
    return () => { off(); io?.disconnect(); };
  }, []);
  return null;
}
