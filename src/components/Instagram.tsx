"use client";

import { useEffect, useState } from "react";

// Instagram feed via Behold's JSON feed (behold.so), rendered with our own markup
// so it matches the rest of the site. The feed ID can be overridden in .env.local
// with NEXT_PUBLIC_BEHOLD_FEED_ID=...
const FEED_ID = process.env.NEXT_PUBLIC_BEHOLD_FEED_ID || "SFaobFIe5lxmUBUTTfqS";
const FEED_URL = `https://feeds.behold.so/${FEED_ID}`;
const PLACEHOLDERS = 4;

type Size = { width: number; height: number; mediaUrl: string };
type Post = {
  id: string;
  permalink: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  prunedCaption?: string;
  colorPalette?: { dominant?: string };
  sizes: { small: Size; medium: Size; large: Size; full: Size };
};

export default function Instagram() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(FEED_URL, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((feed: { posts?: Post[] }) => setPosts(feed.posts ?? []))
      .catch(() => {}); // keep the placeholders if the feed can't be reached
    return () => ctrl.abort();
  }, []);

  // The wrapper's className never changes, so React won't wipe the `in` class Reveals adds.
  return (
    <div className="insta r">
      {posts?.length
        ? posts.map((p) => (
            <a
              key={p.id}
              className="ig"
              href={p.permalink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: p.colorPalette?.dominant ? `rgb(${p.colorPalette.dominant})` : undefined }}
            >
              {/* plain <img>: static export has no image optimizer, and Behold already serves sized copies */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.sizes.medium.mediaUrl}
                srcSet={`${p.sizes.small.mediaUrl} 400w, ${p.sizes.medium.mediaUrl} 700w, ${p.sizes.large.mediaUrl} 1000w`}
                sizes="(max-width: 640px) 50vw, 25vw"
                alt={p.prunedCaption || "Instagram post"}
                loading="lazy"
              />
              {p.mediaType !== "IMAGE" && (
                <span className="ig-badge" aria-label={p.mediaType === "VIDEO" ? "video" : "multiple photos"}>
                  {p.mediaType === "VIDEO" ? "▶" : "❐"}
                </span>
              )}
            </a>
          ))
        : Array.from({ length: PLACEHOLDERS }, (_, i) => <div key={i} className="ph" />)}
    </div>
  );
}
