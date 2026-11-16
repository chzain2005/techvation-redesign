# Techvation website

The Techvation marketing site (Next.js 16) with its content editor (Payload CMS 3), in one app.

- Website: `app/(site)`, `components/`, `lib/`
- Content editor at `/admin`: `payload.config.ts` and `cms/` (see [cms/README.md](cms/README.md))
- Original content and the small interface labels: `data/` (the CMS was first filled from these files)

## Run it locally

```bash
npm install
cp .env.example .env.local   # then set PAYLOAD_SECRET (see the comments in the file)
npm run seed                 # fills the local CMS (SQLite file) with the site content
npm run dev                  # http://localhost:3000 and http://localhost:3000/admin
```

## Useful commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / server |
| `npm run lint` | ESLint |
| `npm test` | All tests (unit + integration) |
| `npm run test:unit` | Unit tests only (fast, no database) |
| `npm run test:integration` | Integration tests against a throwaway SQLite database in `.test-data/` |
| `npm run seed` | Copy the `data/` content into an empty CMS |
| `npm run generate:types` | Refresh `cms/payload-types.ts` after changing `cms/` |
| `npm run payload migrate:create <name>` | Database migration after changing `cms/` (see cms/README.md) |

## Deployment

Vercel (root directory `frontend`, build command `npm run payload migrate && npm run build`) with Supabase Postgres and Supabase Storage. Environment variables are listed in `.env.example`; production notes are in [cms/README.md](cms/README.md).
