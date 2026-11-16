import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_form_submissions_status" ADD VALUE 'cancelled';
  ALTER TABLE "form_submissions" ADD COLUMN "booking_start" timestamp(3) with time zone;
  CREATE INDEX "form_submissions_booking_start_idx" ON "form_submissions" USING btree ("booking_start");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "form_submissions" ALTER COLUMN "status" SET DATA TYPE text;
  ALTER TABLE "form_submissions" ALTER COLUMN "status" SET DEFAULT 'new'::text;
  DROP TYPE "public"."enum_form_submissions_status";
  CREATE TYPE "public"."enum_form_submissions_status" AS ENUM('new', 'in-progress', 'done');
  ALTER TABLE "form_submissions" ALTER COLUMN "status" SET DEFAULT 'new'::"public"."enum_form_submissions_status";
  ALTER TABLE "form_submissions" ALTER COLUMN "status" SET DATA TYPE "public"."enum_form_submissions_status" USING "status"::"public"."enum_form_submissions_status";
  DROP INDEX "form_submissions_booking_start_idx";
  ALTER TABLE "form_submissions" DROP COLUMN "booking_start";`)
}
