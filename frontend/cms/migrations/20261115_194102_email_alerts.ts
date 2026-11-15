import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "notifications_recipients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "notifications_job_recipients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "notifications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"newsletter_alerts" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "notifications_recipients" ADD CONSTRAINT "notifications_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."notifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notifications_job_recipients" ADD CONSTRAINT "notifications_job_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."notifications"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "notifications_recipients_order_idx" ON "notifications_recipients" USING btree ("_order");
  CREATE INDEX "notifications_recipients_parent_id_idx" ON "notifications_recipients" USING btree ("_parent_id");
  CREATE INDEX "notifications_job_recipients_order_idx" ON "notifications_job_recipients" USING btree ("_order");
  CREATE INDEX "notifications_job_recipients_parent_id_idx" ON "notifications_job_recipients" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "notifications_recipients" CASCADE;
  DROP TABLE "notifications_job_recipients" CASCADE;
  DROP TABLE "notifications" CASCADE;`)
}
