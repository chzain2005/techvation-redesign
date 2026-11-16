# Techvation CMS (Payload)

The admin dashboard is **Payload CMS 3**, running inside this Next.js app:

- Admin dashboard: `/admin` (e.g. http://localhost:3000/admin)
- REST API used by the admin: `/api/...`
- Config: `payload.config.ts`. Content model: `cms/collections` and `cms/globals`.
- The site reads content through `lib/cms/content.ts`.

## What admins can edit

| Sidebar group | What |
| --- | --- |
| **Inbox** | Form submissions from the website (contact, consultations, call bookings, job applications with CVs, newsletter and notify-me sign-ups). Set each one to In progress / Done. |
| **Services** | Services (each gets its page `/services/<slug>`, card and mega-menu entry), practice areas |
| **Blog** | Blog posts (drafts, versions, block editor), blog categories |
| **Careers** | Job openings (tick "Show on the site" off to hide a filled role) |
| **Company info** | FAQs, team members, client logos (homepage marquee), industries, solution suites |
| **Settings** | Image library, user accounts |
| **Website pages** | Headings and text of every page (one tab per section, top to bottom), plus "Menu & footer (every page)" |

In the list views you can drag rows to change the order they appear on the site.
Saving publishes immediately: the next visitor sees the change, with no rebuild.

### Made for non-technical editors

- The dashboard opens with shortcuts for common jobs and three tips.
- `cms/friendly.ts` gives every field a plain-English label (see `LABELS`), names list rows after their content, folds long lists and hides the developer "API" tab.
  Add a name to `LABELS` when you add a field without a `label`.
- Custom admin parts live in `cms/components`:
  - an icon picker that shows the real icons
  - a heading preview showing the coloured part
  - a department dropdown for job openings
  - the logo and the dashboard

Small interface labels ("Show fewer", form placeholders, pop-up texts) stay in `/data/*.ts`.
Those files also hold the original content, which the seed script copies into the CMS.

## Local setup

1. Set `DATABASE_URI` and `PAYLOAD_SECRET` in `.env.local` (see `.env.example`).
   `DATABASE_URI=file:./techvation.db` uses a local SQLite file. No database server is needed.
2. Run `npm run seed` to copy the current site content and images into the CMS.
   Run it with `SEED_RESET=1` set to wipe the CMS content and start again. Users are kept.
3. Run `npm run dev` and open `/admin`. The first account you create is an **Admin**.
   Admins can then invite **Editors**, who can edit content but not manage users.

## Production (Supabase)

1. `DATABASE_URI`: the Supabase connection string from Connect → *Transaction pooler* (port **6543**).
   The *Session pooler* (5432) allows only 15 connections, which a build or Vercel quickly runs out of.
   Write special characters in the password URL-encoded: `@` becomes `%40`.
2. Image storage: create a **public** bucket `media` in Supabase Storage.
   Then fill in the `S3_*` variables (Storage → S3 connection).
   This is required on Vercel, which cannot store uploaded files on disk.
3. Database schema: in development Payload creates the tables itself.
   For production, create a migration whenever the content model changes, and commit it.
   The Vercel build runs `payload migrate` before `next build`.
   Always create migrations with the `S3_*` variables set, because the storage plugin adds a column.
   ```bash
   npm run payload migrate:create <name>   # after changing cms/collections or cms/globals
   npm run payload migrate                 # applies pending migrations
   ```
4. The production database was filled once with `npm run seed`.
   To redo that (this replaces the CMS content), run it with these variables set:
   - the production `DATABASE_URI` and `S3_*`
   - `SEED_RESET=1`
   - `MEDIA_DIR` set to an empty folder, so local uploads don't affect file names
5. CVs from job applications go to a **private** bucket (`S3_PRIVATE_BUCKET`, "Public" off).
   They are only served through Payload, to signed-in users.
   Forms save through the server action in `lib/forms/actions.ts`, which has a honeypot spam check.
6. Supabase's Data API is switched off (Project Settings → Data API), so the CMS tables are not exposed through it.

## Security (what is in place)

- **Accounts:** only admins create accounts. The first account can only be made while none exist.
  Passwords must be at least 12 characters and are hashed by Payload with PBKDF2-SHA256 (600,000 rounds, random salt).
  An account locks for 15 minutes after 5 wrong passwords. The login cookie is httpOnly, and Secure on the live site.
- **Access:** only signed-in users can see the inbox and CVs; users can only see or edit their own account unless they are admins.
  Unpublished blog drafts are never public.
- **API:** only the site's own domain may call it from a browser (`cors` / `csrf` in `payload.config.ts`). GraphQL is off.
- **Forms:** checked and trimmed on the server (`lib/forms/actions.ts`), with a honeypot.
  Rate limited by a one-way hash of the IP (5 per 10 minutes, 30 per day; `lib/forms/rate-limit.ts`).
- **Content:** link fields only accept `/`, `#`, `https://`, `mailto:` and `tel:` addresses (`cms/friendly.ts`).
  Uploads are raster images only, so no SVG with scripts can be uploaded.
- **Headers:** frame protection, nosniff, referrer and permissions policies (`next.config.ts`), plus HSTS from Vercel.
  `robots.txt` keeps `/admin` and `/api` out of search engines.
- **Database:** encrypted connection (TLS); set `DATABASE_CA_CERT` to also verify Supabase's certificate.
  Supabase's public Data API is switched off.

## Changing the content model

After editing anything in `cms/`, run:

```bash
npm run generate:types       # updates cms/payload-types.ts
npm run generate:importmap   # only needed when adding custom admin components
```
