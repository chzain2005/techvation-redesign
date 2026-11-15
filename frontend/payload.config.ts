/*
 * ---------------------------------------------------------------------------
 * PAYLOAD CMS
 * ---------------------------------------------------------------------------
 * The admin dashboard lives at /admin and its API at /api, inside this same
 * Next.js app (see app/(payload)). The content model is in /cms.
 *
 * Database (DATABASE_URI):
 *   postgres://…   Supabase Postgres (production, and local if you like)
 *   file:./…       a local SQLite file (quick local development)
 *
 * Images: saved to /frontend/media locally. When the S3_* variables are set
 * they go to Supabase Storage instead (needed on Vercel, which has no disk).
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Media } from "./cms/collections/Media";
import { Posts } from "./cms/collections/Posts";
import { ServiceCategories } from "./cms/collections/ServiceCategories";
import { Services } from "./cms/collections/Services";
import {
  BlogCategories,
  Clients,
  FaqCategories,
  Industries,
  Jobs,
  Solutions,
  TeamMembers,
} from "./cms/collections/simple";
import { Users } from "./cms/collections/Users";
import { friendlyCollection, friendlyGlobal } from "./cms/friendly";
import { Homepage } from "./cms/globals/Homepage";
import {
  AboutPage,
  BlogPage,
  CareersPage,
  ContactPage,
  FaqsPage,
  ServicesPage,
  SolutionsPage,
} from "./cms/globals/pages";
import { SiteSettings } from "./cms/globals/SiteSettings";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const databaseUri = process.env.DATABASE_URI || "file:./techvation.db";

const db = databaseUri.startsWith("file:")
  ? sqliteAdapter({ client: { url: databaseUri } })
  : postgresAdapter({
      // A few connections per server process: on Vercel many processes run at
      // once, and Supabase's pooler limits the total. Use Supabase's
      // "Transaction pooler" address (port 6543) in production.
      pool: { connectionString: databaseUri, max: Number(process.env.DATABASE_POOL_MAX ?? 3) },
      // Schema changes are applied by migrations in production
      // (npm run payload migrate); in development they are pushed directly.
      push: process.env.NODE_ENV !== "production",
      migrationDir: path.resolve(dirname, "cms/migrations"),
    });

const useS3 = Boolean(process.env.S3_BUCKET && process.env.S3_ACCESS_KEY_ID);

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
  secret: process.env.PAYLOAD_SECRET || "",
  admin: {
    user: Users.slug,
    importMap: { baseDir: dirname },
    meta: {
      titleSuffix: " · Techvation editor",
      icons: [{ rel: "icon", type: "image/png", url: "/icon.png" }],
    },
    components: {
      // Welcome text and shortcuts above the list of everything.
      beforeDashboard: ["/cms/components/Dashboard#Dashboard"],
      graphics: {
        Logo: "/cms/components/Brand#Logo",
        Icon: "/cms/components/Brand#Icon",
      },
    },
  },
  // The order here is the order of the groups in the admin sidebar.
  collections: [
    Services,
    ServiceCategories,
    Posts,
    BlogCategories,
    Jobs,
    FaqCategories,
    TeamMembers,
    Clients,
    Industries,
    Solutions,
    Media,
    Users,
  ].map(friendlyCollection),
  globals: [
    Homepage,
    ServicesPage,
    AboutPage,
    CareersPage,
    FaqsPage,
    BlogPage,
    ContactPage,
    SolutionsPage,
    SiteSettings,
  ].map(friendlyGlobal),
  db,
  sharp,
  typescript: { outputFile: path.resolve(dirname, "cms/payload-types.ts") },
  graphQL: { disable: true },
  telemetry: false,
  plugins: useS3
    ? [
        s3Storage({
          collections: { media: true },
          bucket: process.env.S3_BUCKET!,
          config: {
            endpoint: process.env.S3_ENDPOINT,
            region: process.env.S3_REGION || "us-east-1",
            forcePathStyle: true,
            credentials: {
              accessKeyId: process.env.S3_ACCESS_KEY_ID!,
              secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
            },
          },
        }),
      ]
    : [],
});
