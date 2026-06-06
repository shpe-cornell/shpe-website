shpe-website
Public-facing website for SHPE Cornell built with Next.js App Router.

## Getting Started
```
npm install
npm run dev
```
Open http://localhost:3000

Create a `.env` file in the project root with:

```
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

## File Structure
```
src/
  app/
    about/              # About page
    gallery/            # Photo gallery page
    join/               # Membership join form
    member-info/        # Member points and info lookup
    points/             # Points leaderboard page
    sponsorship/        # Sponsorship info page
    team/               # Exec team page
    checkin/[eventId]/  # Event check-in flow
    register/[eventId]/ # Event registration flow
    api/
      checkin/          # Check-in API route
      join/             # Join/membership API route
      points/           # Points lookup API routes
      register/         # Event registration API route
    components/         # Shared UI components (nav, footer, hero, cards, etc.)
    data/               # Static content data (team, events, navigation, etc.)
    globals.css         # Shared styles
    layout.tsx          # Root layout (font, HTML shell)
    page.tsx            # Home page
  lib/
    supabase-server.ts  # Supabase client
    rate-limit.ts       # API rate limiter
    api-guards.ts       # Shared API guard helpers
    validation.ts       # Input validation
```

## Security Notes

- All database operations are server-side through API routes.
- Uses service role key only (`SUPABASE_SERVICE_ROLE_KEY`), never anon key.
- Includes in-memory rate limiting (20 requests per minute per IP) on all public API routes.
