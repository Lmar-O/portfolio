# lmaroria.com

Personal site. Next.js (App Router, TypeScript), exported as a static site.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000 (includes the dev-only accent picker)
```

## Build

```bash
npm run build      # static site in ./out
```

## Where things live

- `src/content/site.ts` — projects, links, email, loader text
- `src/app/globals.css` — all styles; `--accent` sets the site color
- `src/components/` — `Loader`, `HeroOrb`, `Reveals` (scroll animations), `Instagram`, `AccentTool` (dev only)
- `designs/` — the static HTML mockups this was built from

## Instagram

Photos come from @lmaroria through [Behold](https://behold.so). Create a feed there and put its ID in
`.env.local` as `NEXT_PUBLIC_BEHOLD_FEED_ID` (see `.env.example`). Until then, placeholder tiles show.
