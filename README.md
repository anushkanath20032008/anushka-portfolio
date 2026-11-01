# Anushka Nath — desktop portfolio

A desktop-OS-style portfolio. Lock screen (Vanta + motion), illustrated folders that follow the Master CV, a "now running" dock, a phone home-screen layout under 768px, and a recruiter **Skim mode** at `/skim`.

## Run

```sh
npm install
npm run dev      # http://localhost:3000
npm test         # content-layer tests
npm run build
```

## Content and Supabase

All content lives in `src/data/snapshot.ts`. With no env vars the site renders from that snapshot. With Supabase configured it reads the same content from tables and falls back to the snapshot if the fetch fails or takes over 4 seconds.

1. Create a Supabase project and run `supabase/migrations/0001_portfolio_schema.sql`.
2. `npm run seed` regenerates `supabase/seed.sql` from the snapshot; run it in the SQL editor.
3. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (public, read-only by RLS policy).

Edit rows in the Supabase dashboard (for example `now_items` for the dock and sticky notes) and the live site updates without a deploy.

## Libraries

- Vanta (NET) on the lock screen, lazy-loaded, off on phones and reduced motion
- GSAP for the unlock-to-desktop entrance timeline
- Lenis for smooth scrolling inside windows
- React Bits: BlurText, Magnet, ClickSpark (copied into `src/reactbits/`)
- motion for hover and spring animation

## Routes

`/` desktop, `/f/:folder[/:entry]` folder windows (deep-linkable, skip the lock screen), `/now/:id` dock items, `/skim` one-page view with Save as PDF.
