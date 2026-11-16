import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "form_submissions" ADD COLUMN "visitor" varchar;
  CREATE INDEX "form_submissions_visitor_idx" ON "form_submissions" USING btree ("visitor");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "form_submissions_visitor_idx";
  ALTER TABLE "form_submissions" DROP COLUMN "visitor";`)
}
