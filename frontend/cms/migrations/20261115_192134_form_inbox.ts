import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_form_submissions_status" AS ENUM('new', 'in-progress', 'done');
  CREATE TYPE "public"."enum_form_submissions_form" AS ENUM('contact', 'consultation', 'home-consultation', 'service-consultation', 'article-consultation', 'booking', 'job-application', 'newsletter', 'solutions-notify');
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_form_submissions_status" DEFAULT 'new' NOT NULL,
  	"notes" varchar,
  	"form" "enum_form_submissions_form" NOT NULL,
  	"page" varchar,
  	"name" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"company" varchar,
  	"service" varchar,
  	"message" varchar,
  	"details" jsonb,
  	"cv_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cv_uploads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"original_name" varchar,
  	"prefix" varchar DEFAULT 'cvs',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "form_submissions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "cv_uploads_id" integer;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_cv_id_cv_uploads_id_fk" FOREIGN KEY ("cv_id") REFERENCES "public"."cv_uploads"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "form_submissions_cv_idx" ON "form_submissions" USING btree ("cv_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "cv_uploads_updated_at_idx" ON "cv_uploads" USING btree ("updated_at");
  CREATE INDEX "cv_uploads_created_at_idx" ON "cv_uploads" USING btree ("created_at");
  CREATE UNIQUE INDEX "cv_uploads_filename_idx" ON "cv_uploads" USING btree ("filename");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cv_uploads_fk" FOREIGN KEY ("cv_uploads_id") REFERENCES "public"."cv_uploads"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_cv_uploads_id_idx" ON "payload_locked_documents_rels" USING btree ("cv_uploads_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "form_submissions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cv_uploads" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "cv_uploads" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_form_submissions_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_cv_uploads_fk";
  
  DROP INDEX "payload_locked_documents_rels_form_submissions_id_idx";
  DROP INDEX "payload_locked_documents_rels_cv_uploads_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "form_submissions_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "cv_uploads_id";
  DROP TYPE "public"."enum_form_submissions_status";
  DROP TYPE "public"."enum_form_submissions_form";`)
}
