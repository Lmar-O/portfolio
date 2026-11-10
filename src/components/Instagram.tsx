"use client";

import { useEffect } from "react";

// Instagram feed via Behold (behold.so).
// 1. Connect @lmaroria at behold.so and create a feed.
// 2. Put its feed ID in .env.local as NEXT_PUBLIC_BEHOLD_FEED_ID=...
// Until then, placeholder tiles show instead.
const FEED_ID = process.env.NEXT_PUBLIC_BEHOLD_FEED_ID;

export default function Instagram() {
  useEffect(() => {
    if (!FEED_ID || document.querySelector('script[src="https://w.behold.so/widget.js"]')) return;
    const s = document.createElement("script");
    s.type = "module";
    s.src = "https://w.behold.so/widget.js";
    document.head.append(s);
  }, []);

  if (FEED_ID) {
    return <div className="insta-feed r" dangerouslySetInnerHTML={{ __html: `<behold-widget feed-id="${FEED_ID}"></behold-widget>` }} />;
  }
  return (
    <div className="insta r">
      {Array.from({ length: 8 }, (_, i) => <div key={i} className="ph" />)}
    </div>
  );
}
