import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_services_capabilities_items_icon" AS ENUM('award', 'bar-chart', 'bell', 'bot', 'briefcase', 'calendar', 'cart', 'check', 'clock', 'cloud', 'code', 'cpu', 'database', 'dollar', 'file-text', 'globe', 'headset', 'heart', 'layers', 'mail', 'map-pin', 'megaphone', 'message', 'monitor', 'phone', 'rocket', 'search', 'shield', 'sliders', 'smartphone', 'sparkles', 'target', 'trending-up', 'truck', 'users', 'wrench', 'zap');
  CREATE TYPE "public"."enum_services_icon" AS ENUM('award', 'bar-chart', 'bell', 'bot', 'briefcase', 'calendar', 'cart', 'check', 'clock', 'cloud', 'code', 'cpu', 'database', 'dollar', 'file-text', 'globe', 'headset', 'heart', 'layers', 'mail', 'map-pin', 'megaphone', 'message', 'monitor', 'phone', 'rocket', 'search', 'shield', 'sliders', 'smartphone', 'sparkles', 'target', 'trending-up', 'truck', 'users', 'wrench', 'zap');
  CREATE TYPE "public"."enum_service_categories_icon" AS ENUM('award', 'bar-chart', 'bell', 'bot', 'briefcase', 'calendar', 'cart', 'check', 'clock', 'cloud', 'code', 'cpu', 'database', 'dollar', 'file-text', 'globe', 'headset', 'heart', 'layers', 'mail', 'map-pin', 'megaphone', 'message', 'monitor', 'phone', 'rocket', 'search', 'shield', 'sliders', 'smartphone', 'sparkles', 'target', 'trending-up', 'truck', 'users', 'wrench', 'zap');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_jobs_type" AS ENUM('Full-time', 'Part-time', 'Contract', 'Internship');
  CREATE TYPE "public"."enum_faq_categories_icon" AS ENUM('award', 'bar-chart', 'bell', 'bot', 'briefcase', 'calendar', 'cart', 'check', 'clock', 'cloud', 'code', 'cpu', 'database', 'dollar', 'file-text', 'globe', 'headset', 'heart', 'layers', 'mail', 'map-pin', 'megaphone', 'message', 'monitor', 'phone', 'rocket', 'search', 'shield', 'sliders', 'smartphone', 'sparkles', 'target', 'trending-up', 'truck', 'users', 'wrench', 'zap');
  CREATE TYPE "public"."enum_industries_icon" AS ENUM('factory', 'cart', 'heart', 'landmark', 'truck', 'briefcase', 'grad-cap', 'building');
  CREATE TYPE "public"."enum_solutions_icon" AS ENUM('factory', 'cart', 'heart', 'landmark', 'truck', 'briefcase', 'grad-cap', 'building');
  CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_homepage_unique_value_values_icon" AS ENUM('/assets/icons/sparkles-brand-16.svg', '/assets/icons/award-brand.svg', '/assets/icons/heart-brand-16.svg', '/assets/icons/check-brand.svg', '/assets/icons/clock-brand.svg');
  CREATE TYPE "public"."enum_homepage_unique_value_visual_pills_icon" AS ENUM('/assets/icons/sparkles-white-16.svg', '/assets/icons/award-white-16.svg', '/assets/icons/users-white-16.svg', '/assets/icons/trending-up-white-16.svg', '/assets/icons/heart-white-16.svg', '/assets/icons/briefcase-white-16.svg', '/assets/icons/building-white-16.svg', '/assets/icons/cart-white-16.svg', '/assets/icons/factory-white-16.svg', '/assets/icons/truck-white-16.svg');
  CREATE TYPE "public"."enum_homepage_unique_value_visual_pills_position" AS ENUM('topLeft', 'topRight', 'bottomRight', 'bottomLeft');
  CREATE TYPE "public"."enum_homepage_why_techvation_reasons_icon" AS ENUM('/assets/icons/users-white-22.svg', '/assets/icons/zap-white-22.svg', '/assets/icons/dollar-white-22.svg', '/assets/icons/shield-white-22.svg', '/assets/icons/globe-white-22.svg', '/assets/icons/headset-white-22.svg');
  CREATE TYPE "public"."enum_homepage_how_we_work_steps_icon" AS ENUM('/assets/icons/search-white-20.svg', '/assets/icons/layers-white-20.svg', '/assets/icons/code-white-20.svg', '/assets/icons/rocket-white-20.svg', '/assets/icons/bar-chart-white-20.svg', '/assets/icons/bot-white-20.svg', '/assets/icons/cpu-white-20.svg', '/assets/icons/database-white-20.svg', '/assets/icons/headset-white-20.svg', '/assets/icons/megaphone-white-20.svg', '/assets/icons/sliders-white-20.svg', '/assets/icons/smartphone-white-20.svg', '/assets/icons/sparkles-white-20.svg', '/assets/icons/users-white-20.svg', '/assets/icons/wrench-white-20.svg');
  CREATE TYPE "public"."enum_services_page_engagement_models_icon" AS ENUM('award', 'bar-chart', 'bell', 'bot', 'briefcase', 'calendar', 'cart', 'check', 'clock', 'cloud', 'code', 'cpu', 'database', 'dollar', 'file-text', 'globe', 'headset', 'heart', 'layers', 'mail', 'map-pin', 'megaphone', 'message', 'monitor', 'phone', 'rocket', 'search', 'shield', 'sliders', 'smartphone', 'sparkles', 'target', 'trending-up', 'truck', 'users', 'wrench', 'zap');
  CREATE TYPE "public"."enum_services_page_detail_tech_reasons_icon" AS ENUM('award', 'bar-chart', 'bell', 'bot', 'briefcase', 'calendar', 'cart', 'check', 'clock', 'cloud', 'code', 'cpu', 'database', 'dollar', 'file-text', 'globe', 'headset', 'heart', 'layers', 'mail', 'map-pin', 'megaphone', 'message', 'monitor', 'phone', 'rocket', 'search', 'shield', 'sliders', 'smartphone', 'sparkles', 'target', 'trending-up', 'truck', 'users', 'wrench', 'zap');
  CREATE TYPE "public"."enum_about_page_values_items_icon" AS ENUM('award', 'bar-chart', 'bell', 'bot', 'briefcase', 'calendar', 'cart', 'check', 'clock', 'cloud', 'code', 'cpu', 'database', 'dollar', 'file-text', 'globe', 'headset', 'heart', 'layers', 'mail', 'map-pin', 'megaphone', 'message', 'monitor', 'phone', 'rocket', 'search', 'shield', 'sliders', 'smartphone', 'sparkles', 'target', 'trending-up', 'truck', 'users', 'wrench', 'zap');
  CREATE TYPE "public"."enum_about_page_mission_icon" AS ENUM('award', 'bar-chart', 'bell', 'bot', 'briefcase', 'calendar', 'cart', 'check', 'clock', 'cloud', 'code', 'cpu', 'database', 'dollar', 'file-text', 'globe', 'headset', 'heart', 'layers', 'mail', 'map-pin', 'megaphone', 'message', 'monitor', 'phone', 'rocket', 'search', 'shield', 'sliders', 'smartphone', 'sparkles', 'target', 'trending-up', 'truck', 'users', 'wrench', 'zap');
  CREATE TYPE "public"."enum_about_page_vision_icon" AS ENUM('award', 'bar-chart', 'bell', 'bot', 'briefcase', 'calendar', 'cart', 'check', 'clock', 'cloud', 'code', 'cpu', 'database', 'dollar', 'file-text', 'globe', 'headset', 'heart', 'layers', 'mail', 'map-pin', 'megaphone', 'message', 'monitor', 'phone', 'rocket', 'search', 'shield', 'sliders', 'smartphone', 'sparkles', 'target', 'trending-up', 'truck', 'users', 'wrench', 'zap');
  CREATE TYPE "public"."enum_careers_page_perks_items_icon" AS ENUM('award', 'bar-chart', 'bell', 'bot', 'briefcase', 'calendar', 'cart', 'check', 'clock', 'cloud', 'code', 'cpu', 'database', 'dollar', 'file-text', 'globe', 'headset', 'heart', 'layers', 'mail', 'map-pin', 'megaphone', 'message', 'monitor', 'phone', 'rocket', 'search', 'shield', 'sliders', 'smartphone', 'sparkles', 'target', 'trending-up', 'truck', 'users', 'wrench', 'zap');
  CREATE TYPE "public"."enum_faqs_page_contact_cards_icon" AS ENUM('award', 'bar-chart', 'bell', 'bot', 'briefcase', 'calendar', 'cart', 'check', 'clock', 'cloud', 'code', 'cpu', 'database', 'dollar', 'file-text', 'globe', 'headset', 'heart', 'layers', 'mail', 'map-pin', 'megaphone', 'message', 'monitor', 'phone', 'rocket', 'search', 'shield', 'sliders', 'smartphone', 'sparkles', 'target', 'trending-up', 'truck', 'users', 'wrench', 'zap');
  CREATE TYPE "public"."enum_contact_page_quick_quick_contact_icon" AS ENUM('award', 'bar-chart', 'bell', 'bot', 'briefcase', 'calendar', 'cart', 'check', 'clock', 'cloud', 'code', 'cpu', 'database', 'dollar', 'file-text', 'globe', 'headset', 'heart', 'layers', 'mail', 'map-pin', 'megaphone', 'message', 'monitor', 'phone', 'rocket', 'search', 'shield', 'sliders', 'smartphone', 'sparkles', 'target', 'trending-up', 'truck', 'users', 'wrench', 'zap');
  CREATE TYPE "public"."enum_site_settings_footer_social_name" AS ENUM('LinkedIn', 'Facebook', 'Instagram', 'X', 'YouTube');
  CREATE TYPE "public"."enum_site_settings_footer_contact_items_icon" AS ENUM('/assets/icons/phone-16.svg', '/assets/icons/mail-16.svg', '/assets/icons/map-pin-16.svg');
  CREATE TABLE "services_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "services_overview_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services_capabilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_services_capabilities_items_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"category_id" integer NOT NULL,
  	"icon" "enum_services_icon" NOT NULL,
  	"image_id" integer NOT NULL,
  	"menu_description" varchar NOT NULL,
  	"card_description" varchar NOT NULL,
  	"home_card_tag" varchar NOT NULL,
  	"home_card_description" varchar NOT NULL,
  	"home_card_description_short" varchar NOT NULL,
  	"hero_heading_lead" varchar NOT NULL,
  	"hero_heading_highlight" varchar NOT NULL,
  	"hero_heading_tail" varchar,
  	"hero_description" varchar NOT NULL,
  	"hero_form_title" varchar NOT NULL,
  	"overview_heading_lead" varchar NOT NULL,
  	"overview_heading_highlight" varchar NOT NULL,
  	"overview_heading_tail" varchar,
  	"overview_description" varchar NOT NULL,
  	"overview_badge" varchar NOT NULL,
  	"capabilities_heading_lead" varchar NOT NULL,
  	"capabilities_heading_highlight" varchar NOT NULL,
  	"capabilities_heading_tail" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer
  );
  
  CREATE TABLE "service_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"anchor" varchar,
  	"icon" "enum_service_categories_icon" NOT NULL,
  	"description" varchar NOT NULL,
  	"expert_label" varchar NOT NULL,
  	"promo_title" varchar,
  	"promo_text" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts_blocks_lead" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_h2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_p" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "posts_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"title_highlight" varchar,
  	"excerpt" varchar,
  	"category_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"show_day" boolean DEFAULT true,
  	"read_minutes" numeric DEFAULT 5,
  	"featured" boolean DEFAULT false,
  	"cover_id" integer,
  	"author_name" varchar DEFAULT 'Techvation Team',
  	"author_avatar_id" integer,
  	"author_bio" varchar,
  	"cta_title" varchar,
  	"cta_button_label" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_posts_v_blocks_lead" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_h2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_p" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_title_highlight" varchar,
  	"version_excerpt" varchar,
  	"version_category_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_show_day" boolean DEFAULT true,
  	"version_read_minutes" numeric DEFAULT 5,
  	"version_featured" boolean DEFAULT false,
  	"version_cover_id" integer,
  	"version_author_name" varchar DEFAULT 'Techvation Team',
  	"version_author_avatar_id" integer,
  	"version_author_bio" varchar,
  	"version_cta_title" varchar,
  	"version_cta_button_label" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "blog_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"title" varchar NOT NULL,
  	"department" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"type" "enum_jobs_type" DEFAULT 'Full-time' NOT NULL,
  	"open" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faq_categories_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "faq_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"anchor" varchar,
  	"icon" "enum_faq_categories_icon" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"photo_id" integer NOT NULL,
  	"linkedin" varchar,
  	"email" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "clients" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "industries_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "industries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"explore_label" varchar NOT NULL,
  	"href" varchar DEFAULT '/contact' NOT NULL,
  	"image_id" integer NOT NULL,
  	"icon" "enum_industries_icon" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "solutions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"icon" "enum_solutions_icon" NOT NULL,
  	"image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
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
  
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"service_categories_id" integer,
  	"posts_id" integer,
  	"blog_categories_id" integer,
  	"jobs_id" integer,
  	"faq_categories_id" integer,
  	"team_members_id" integer,
  	"clients_id" integer,
  	"industries_id" integer,
  	"solutions_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "homepage_trusted_logos_title_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_unique_value_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"icon" "enum_homepage_unique_value_values_icon" NOT NULL
  );
  
  CREATE TABLE "homepage_unique_value_visual_pills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"icon" "enum_homepage_unique_value_visual_pills_icon" NOT NULL,
  	"position" "enum_homepage_unique_value_visual_pills_position" NOT NULL
  );
  
  CREATE TABLE "homepage_why_techvation_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_homepage_why_techvation_reasons_icon" NOT NULL
  );
  
  CREATE TABLE "homepage_why_techvation_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_how_we_work_steps_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_how_we_work_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"outcome" varchar NOT NULL,
  	"icon" "enum_homepage_how_we_work_steps_icon" NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_strategy_call_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar NOT NULL,
  	"hero_eyebrow_short" varchar NOT NULL,
  	"hero_heading_lead" varchar NOT NULL,
  	"hero_heading_highlight" varchar NOT NULL,
  	"hero_heading_tail" varchar,
  	"hero_description" varchar NOT NULL,
  	"hero_description_short" varchar NOT NULL,
  	"hero_primary_action_label" varchar NOT NULL,
  	"hero_primary_action_href" varchar NOT NULL,
  	"hero_secondary_action_label" varchar NOT NULL,
  	"hero_secondary_action_href" varchar NOT NULL,
  	"hero_form_title" varchar NOT NULL,
  	"hero_form_subtitle" varchar NOT NULL,
  	"hero_form_subtitle_short" varchar NOT NULL,
  	"hero_form_submit_label" varchar NOT NULL,
  	"hero_form_note" varchar NOT NULL,
  	"trusted_logos_title" varchar NOT NULL,
  	"unique_value_eyebrow" varchar NOT NULL,
  	"unique_value_title" varchar NOT NULL,
  	"unique_value_description" varchar NOT NULL,
  	"unique_value_action_label" varchar NOT NULL,
  	"unique_value_action_href" varchar NOT NULL,
  	"unique_value_visual_outline_word" varchar NOT NULL,
  	"unique_value_visual_stat_value" varchar NOT NULL,
  	"unique_value_visual_stat_label" varchar NOT NULL,
  	"services_eyebrow" varchar NOT NULL,
  	"services_heading_lead" varchar NOT NULL,
  	"services_heading_highlight" varchar NOT NULL,
  	"services_heading_tail" varchar,
  	"services_description" varchar NOT NULL,
  	"why_techvation_eyebrow" varchar NOT NULL,
  	"why_techvation_heading_lead" varchar NOT NULL,
  	"why_techvation_heading_highlight" varchar NOT NULL,
  	"why_techvation_heading_tail" varchar,
  	"why_techvation_description" varchar NOT NULL,
  	"why_techvation_hub_badge" varchar NOT NULL,
  	"why_techvation_primary_action_label" varchar NOT NULL,
  	"why_techvation_primary_action_href" varchar NOT NULL,
  	"why_techvation_secondary_action_label" varchar NOT NULL,
  	"why_techvation_secondary_action_href" varchar NOT NULL,
  	"how_we_work_eyebrow" varchar NOT NULL,
  	"how_we_work_heading_lead" varchar NOT NULL,
  	"how_we_work_heading_highlight" varchar NOT NULL,
  	"how_we_work_heading_tail" varchar,
  	"how_we_work_description" varchar NOT NULL,
  	"how_we_work_outcome_label" varchar NOT NULL,
  	"industries_eyebrow" varchar NOT NULL,
  	"industries_heading_lead" varchar NOT NULL,
  	"industries_heading_highlight" varchar NOT NULL,
  	"industries_heading_tail" varchar,
  	"industries_description" varchar NOT NULL,
  	"industries_hint" varchar NOT NULL,
  	"strategy_call_eyebrow" varchar NOT NULL,
  	"strategy_call_heading_lead" varchar NOT NULL,
  	"strategy_call_heading_highlight" varchar NOT NULL,
  	"strategy_call_heading_tail" varchar,
  	"strategy_call_description" varchar NOT NULL,
  	"blog_eyebrow" varchar NOT NULL,
  	"blog_heading_lead" varchar NOT NULL,
  	"blog_heading_highlight" varchar NOT NULL,
  	"blog_heading_tail" varchar,
  	"blog_view_all_label" varchar NOT NULL,
  	"blog_view_all_href" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer
  );
  
  CREATE TABLE "services_page_engagement_models_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services_page_engagement_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_services_page_engagement_models_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"best_for" varchar NOT NULL,
  	"popular" boolean
  );
  
  CREATE TABLE "services_page_mega_menu_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_page_detail_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services_page_detail_tech_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_services_page_detail_tech_reasons_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_breadcrumb" varchar NOT NULL,
  	"hero_eyebrow" varchar NOT NULL,
  	"hero_heading_lead" varchar NOT NULL,
  	"hero_heading_highlight" varchar NOT NULL,
  	"hero_heading_tail" varchar,
  	"hero_description" varchar NOT NULL,
  	"hero_finder_title" varchar NOT NULL,
  	"hero_finder_subtitle" varchar NOT NULL,
  	"engagement_eyebrow" varchar NOT NULL,
  	"engagement_heading_lead" varchar NOT NULL,
  	"engagement_heading_highlight" varchar NOT NULL,
  	"engagement_heading_tail" varchar,
  	"engagement_description" varchar NOT NULL,
  	"mega_menu_promo_eyebrow" varchar NOT NULL,
  	"mega_menu_promo_title" varchar NOT NULL,
  	"mega_menu_promo_text" varchar NOT NULL,
  	"mega_menu_promo_action_label" varchar NOT NULL,
  	"mega_menu_promo_image_id" integer NOT NULL,
  	"mega_menu_all_services_label" varchar NOT NULL,
  	"mega_menu_all_services_href" varchar NOT NULL,
  	"mega_menu_phone_label" varchar NOT NULL,
  	"mega_menu_phone_href" varchar NOT NULL,
  	"detail_hero_form_subtitle" varchar NOT NULL,
  	"detail_hero_form_submit_label" varchar NOT NULL,
  	"detail_overview_badge_subtitle" varchar NOT NULL,
  	"detail_process_heading_lead" varchar NOT NULL,
  	"detail_tech_title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "services_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"service_categories_id" integer
  );
  
  CREATE TABLE "about_page_story_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_story_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_values_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_about_page_values_items_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_presence_regions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"detail" varchar NOT NULL,
  	"phone" varchar
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_breadcrumb" varchar NOT NULL,
  	"hero_eyebrow" varchar NOT NULL,
  	"hero_heading_lead" varchar NOT NULL,
  	"hero_heading_highlight" varchar NOT NULL,
  	"hero_heading_tail" varchar,
  	"hero_description" varchar NOT NULL,
  	"hero_primary_label" varchar NOT NULL,
  	"hero_secondary_action_label" varchar NOT NULL,
  	"hero_secondary_action_href" varchar NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"story_eyebrow" varchar NOT NULL,
  	"story_heading_lead" varchar NOT NULL,
  	"story_heading_highlight" varchar NOT NULL,
  	"story_heading_tail" varchar,
  	"story_collage_main_id" integer NOT NULL,
  	"story_collage_inset_id" integer NOT NULL,
  	"story_collage_badge_title" varchar NOT NULL,
  	"story_collage_badge_text" varchar NOT NULL,
  	"mission_title" varchar NOT NULL,
  	"mission_icon" "enum_about_page_mission_icon" NOT NULL,
  	"mission_text" varchar NOT NULL,
  	"vision_title" varchar NOT NULL,
  	"vision_icon" "enum_about_page_vision_icon" NOT NULL,
  	"vision_text" varchar NOT NULL,
  	"values_eyebrow" varchar NOT NULL,
  	"values_heading_lead" varchar NOT NULL,
  	"values_heading_highlight" varchar NOT NULL,
  	"values_heading_tail" varchar,
  	"leadership_eyebrow" varchar NOT NULL,
  	"leadership_heading_lead" varchar NOT NULL,
  	"leadership_heading_highlight" varchar NOT NULL,
  	"leadership_heading_tail" varchar,
  	"leadership_action_label" varchar NOT NULL,
  	"leadership_action_href" varchar NOT NULL,
  	"presence_eyebrow" varchar NOT NULL,
  	"presence_heading_lead" varchar NOT NULL,
  	"presence_heading_highlight" varchar NOT NULL,
  	"presence_heading_tail" varchar,
  	"presence_description" varchar NOT NULL,
  	"presence_image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "careers_page_perks_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_careers_page_perks_items_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "careers_page_gallery_tab_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "careers_page_positions_departments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "careers_page_positions_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "careers_page_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "careers_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_breadcrumb" varchar NOT NULL,
  	"hero_eyebrow" varchar NOT NULL,
  	"hero_heading_lead" varchar NOT NULL,
  	"hero_heading_highlight" varchar NOT NULL,
  	"hero_heading_tail" varchar,
  	"hero_description" varchar NOT NULL,
  	"hero_primary_action_label" varchar NOT NULL,
  	"hero_primary_action_href" varchar NOT NULL,
  	"hero_secondary_action_label" varchar NOT NULL,
  	"hero_secondary_action_href" varchar NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"perks_eyebrow" varchar NOT NULL,
  	"perks_heading_lead" varchar NOT NULL,
  	"perks_heading_highlight" varchar NOT NULL,
  	"perks_heading_tail" varchar,
  	"positions_eyebrow" varchar NOT NULL,
  	"positions_heading_lead" varchar NOT NULL,
  	"positions_heading_highlight" varchar NOT NULL,
  	"positions_heading_tail" varchar,
  	"positions_empty_text" varchar NOT NULL,
  	"process_eyebrow" varchar NOT NULL,
  	"process_heading_lead" varchar NOT NULL,
  	"process_heading_highlight" varchar NOT NULL,
  	"process_heading_tail" varchar,
  	"application_eyebrow" varchar NOT NULL,
  	"application_heading_lead" varchar NOT NULL,
  	"application_heading_highlight" varchar NOT NULL,
  	"application_heading_tail" varchar,
  	"application_description" varchar NOT NULL,
  	"application_submit_label" varchar NOT NULL,
  	"application_success_title" varchar NOT NULL,
  	"application_success_text" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "faqs_page_contact_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_faqs_page_contact_cards_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"action_label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "faqs_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_breadcrumb" varchar NOT NULL,
  	"hero_eyebrow" varchar NOT NULL,
  	"hero_heading_lead" varchar NOT NULL,
  	"hero_heading_highlight" varchar NOT NULL,
  	"hero_heading_tail" varchar,
  	"hero_description" varchar NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"sidebar_title" varchar NOT NULL,
  	"sidebar_help_title" varchar NOT NULL,
  	"sidebar_help_text" varchar NOT NULL,
  	"sidebar_help_action_label" varchar NOT NULL,
  	"contact_eyebrow" varchar NOT NULL,
  	"contact_heading_lead" varchar NOT NULL,
  	"contact_heading_highlight" varchar NOT NULL,
  	"contact_heading_tail" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "blog_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar NOT NULL,
  	"hero_heading_lead" varchar NOT NULL,
  	"hero_heading_highlight" varchar NOT NULL,
  	"hero_heading_tail" varchar,
  	"hero_description" varchar NOT NULL,
  	"newsletter_title" varchar NOT NULL,
  	"newsletter_text" varchar NOT NULL,
  	"newsletter_submit_label" varchar NOT NULL,
  	"newsletter_success_text" varchar NOT NULL,
  	"article_defaults_cta_title" varchar NOT NULL,
  	"article_defaults_cta_button_label" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_quick_quick_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_contact_page_quick_quick_contact_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"short" varchar,
  	"detail" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page_form_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"short" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page_form_budgets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page_form_timelines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page_offices_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"phone_label" varchar NOT NULL,
  	"phone_href" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"photo_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_page_offices_hours_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_breadcrumb" varchar NOT NULL,
  	"hero_eyebrow" varchar NOT NULL,
  	"hero_heading_lead" varchar NOT NULL,
  	"hero_heading_highlight" varchar NOT NULL,
  	"hero_heading_tail" varchar,
  	"hero_description" varchar NOT NULL,
  	"hero_description_short" varchar NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"form_title" varchar NOT NULL,
  	"form_title_short" varchar NOT NULL,
  	"form_services_label" varchar NOT NULL,
  	"form_submit_label" varchar NOT NULL,
  	"offices_hours_title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "solutions_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar NOT NULL,
  	"hero_heading_lead" varchar NOT NULL,
  	"hero_heading_highlight" varchar NOT NULL,
  	"hero_heading_tail" varchar,
  	"hero_description" varchar NOT NULL,
  	"launch_launch_date" timestamp(3) with time zone NOT NULL,
  	"notify_placeholder" varchar NOT NULL,
  	"notify_submit_label" varchar NOT NULL,
  	"notify_note" varchar NOT NULL,
  	"notify_success_title" varchar NOT NULL,
  	"notify_success_text" varchar NOT NULL,
  	"sneak_peek_title" varchar NOT NULL,
  	"sneak_peek_badge" varchar NOT NULL,
  	"sneak_peek_primary_action_label" varchar NOT NULL,
  	"sneak_peek_primary_action_href" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_navbar_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"badge" varchar,
  	"has_dropdown" boolean
  );
  
  CREATE TABLE "site_settings_footer_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" "enum_site_settings_footer_social_name" NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"badge" varchar,
  	"arrow" boolean
  );
  
  CREATE TABLE "site_settings_footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_footer_columns_compact_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"badge" varchar,
  	"arrow" boolean
  );
  
  CREATE TABLE "site_settings_footer_columns_compact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_footer_contact_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_site_settings_footer_contact_items_icon" NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "site_settings_footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_seo_keywords" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"footer_cta_heading_lead" varchar NOT NULL,
  	"footer_cta_heading_highlight" varchar NOT NULL,
  	"footer_cta_heading_tail" varchar,
  	"footer_cta_description" varchar NOT NULL,
  	"footer_about" varchar NOT NULL,
  	"footer_about_short" varchar NOT NULL,
  	"footer_contact_title" varchar NOT NULL,
  	"footer_contact_link_label" varchar NOT NULL,
  	"footer_contact_link_href" varchar NOT NULL,
  	"footer_newsletter_title" varchar NOT NULL,
  	"footer_newsletter_title_short" varchar NOT NULL,
  	"footer_newsletter_description" varchar NOT NULL,
  	"footer_newsletter_placeholder" varchar NOT NULL,
  	"footer_newsletter_submit_label" varchar NOT NULL,
  	"footer_copyright" varchar NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "services_outcomes" ADD CONSTRAINT "services_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_overview_points" ADD CONSTRAINT "services_overview_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_capabilities_items" ADD CONSTRAINT "services_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_tools" ADD CONSTRAINT "services_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_faqs" ADD CONSTRAINT "services_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_category_id_service_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."service_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_lead" ADD CONSTRAINT "posts_blocks_lead_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_h2" ADD CONSTRAINT "posts_blocks_h2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_p" ADD CONSTRAINT "posts_blocks_p_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_quote" ADD CONSTRAINT "posts_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_list_items" ADD CONSTRAINT "posts_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_list" ADD CONSTRAINT "posts_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_image" ADD CONSTRAINT "posts_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_image" ADD CONSTRAINT "posts_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_blog_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."blog_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_author_avatar_id_media_id_fk" FOREIGN KEY ("author_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_lead" ADD CONSTRAINT "_posts_v_blocks_lead_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_h2" ADD CONSTRAINT "_posts_v_blocks_h2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_p" ADD CONSTRAINT "_posts_v_blocks_p_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_quote" ADD CONSTRAINT "_posts_v_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_list_items" ADD CONSTRAINT "_posts_v_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_list" ADD CONSTRAINT "_posts_v_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_image" ADD CONSTRAINT "_posts_v_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_image" ADD CONSTRAINT "_posts_v_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_category_id_blog_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."blog_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_cover_id_media_id_fk" FOREIGN KEY ("version_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_author_avatar_id_media_id_fk" FOREIGN KEY ("version_author_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faq_categories_questions" ADD CONSTRAINT "faq_categories_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "clients" ADD CONSTRAINT "clients_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "industries_tags" ADD CONSTRAINT "industries_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries" ADD CONSTRAINT "industries_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "solutions" ADD CONSTRAINT "solutions_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_service_categories_fk" FOREIGN KEY ("service_categories_id") REFERENCES "public"."service_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_categories_fk" FOREIGN KEY ("blog_categories_id") REFERENCES "public"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faq_categories_fk" FOREIGN KEY ("faq_categories_id") REFERENCES "public"."faq_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_clients_fk" FOREIGN KEY ("clients_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_industries_fk" FOREIGN KEY ("industries_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_solutions_fk" FOREIGN KEY ("solutions_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_trusted_logos_title_lines" ADD CONSTRAINT "homepage_trusted_logos_title_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_unique_value_values" ADD CONSTRAINT "homepage_unique_value_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_unique_value_visual_pills" ADD CONSTRAINT "homepage_unique_value_visual_pills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_why_techvation_reasons" ADD CONSTRAINT "homepage_why_techvation_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_why_techvation_stats" ADD CONSTRAINT "homepage_why_techvation_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_how_we_work_steps_deliverables" ADD CONSTRAINT "homepage_how_we_work_steps_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_how_we_work_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_how_we_work_steps" ADD CONSTRAINT "homepage_how_we_work_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_how_we_work_steps" ADD CONSTRAINT "homepage_how_we_work_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_strategy_call_steps" ADD CONSTRAINT "homepage_strategy_call_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_engagement_models_points" ADD CONSTRAINT "services_page_engagement_models_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page_engagement_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_engagement_models" ADD CONSTRAINT "services_page_engagement_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_mega_menu_columns" ADD CONSTRAINT "services_page_mega_menu_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_detail_process_steps" ADD CONSTRAINT "services_page_detail_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_detail_tech_reasons" ADD CONSTRAINT "services_page_detail_tech_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page" ADD CONSTRAINT "services_page_mega_menu_promo_image_id_media_id_fk" FOREIGN KEY ("mega_menu_promo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page_rels" ADD CONSTRAINT "services_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_rels" ADD CONSTRAINT "services_page_rels_service_categories_fk" FOREIGN KEY ("service_categories_id") REFERENCES "public"."service_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_story_paragraphs" ADD CONSTRAINT "about_page_story_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_story_stats" ADD CONSTRAINT "about_page_story_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_values_items" ADD CONSTRAINT "about_page_values_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_presence_regions" ADD CONSTRAINT "about_page_presence_regions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_story_collage_main_id_media_id_fk" FOREIGN KEY ("story_collage_main_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_story_collage_inset_id_media_id_fk" FOREIGN KEY ("story_collage_inset_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_presence_image_id_media_id_fk" FOREIGN KEY ("presence_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "careers_page_perks_items" ADD CONSTRAINT "careers_page_perks_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_page_gallery_tab_images" ADD CONSTRAINT "careers_page_gallery_tab_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "careers_page_gallery_tab_images" ADD CONSTRAINT "careers_page_gallery_tab_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_page_positions_departments" ADD CONSTRAINT "careers_page_positions_departments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_page_positions_locations" ADD CONSTRAINT "careers_page_positions_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_page_process_steps" ADD CONSTRAINT "careers_page_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_page" ADD CONSTRAINT "careers_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faqs_page_contact_cards" ADD CONSTRAINT "faqs_page_contact_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_page" ADD CONSTRAINT "faqs_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_quick_quick_contact" ADD CONSTRAINT "contact_page_quick_quick_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_form_services" ADD CONSTRAINT "contact_page_form_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_form_budgets" ADD CONSTRAINT "contact_page_form_budgets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_form_timelines" ADD CONSTRAINT "contact_page_form_timelines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_offices_offices" ADD CONSTRAINT "contact_page_offices_offices_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_offices_offices" ADD CONSTRAINT "contact_page_offices_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_offices_hours_lines" ADD CONSTRAINT "contact_page_offices_hours_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_navbar_links" ADD CONSTRAINT "site_settings_navbar_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_social" ADD CONSTRAINT "site_settings_footer_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_columns_links" ADD CONSTRAINT "site_settings_footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_columns" ADD CONSTRAINT "site_settings_footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_columns_compact_links" ADD CONSTRAINT "site_settings_footer_columns_compact_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_footer_columns_compact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_columns_compact" ADD CONSTRAINT "site_settings_footer_columns_compact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_contact_items" ADD CONSTRAINT "site_settings_footer_contact_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_legal_links" ADD CONSTRAINT "site_settings_footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_seo_keywords" ADD CONSTRAINT "site_settings_seo_keywords_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_outcomes_order_idx" ON "services_outcomes" USING btree ("_order");
  CREATE INDEX "services_outcomes_parent_id_idx" ON "services_outcomes" USING btree ("_parent_id");
  CREATE INDEX "services_overview_points_order_idx" ON "services_overview_points" USING btree ("_order");
  CREATE INDEX "services_overview_points_parent_id_idx" ON "services_overview_points" USING btree ("_parent_id");
  CREATE INDEX "services_capabilities_items_order_idx" ON "services_capabilities_items" USING btree ("_order");
  CREATE INDEX "services_capabilities_items_parent_id_idx" ON "services_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX "services_tools_order_idx" ON "services_tools" USING btree ("_order");
  CREATE INDEX "services_tools_parent_id_idx" ON "services_tools" USING btree ("_parent_id");
  CREATE INDEX "services_faqs_order_idx" ON "services_faqs" USING btree ("_order");
  CREATE INDEX "services_faqs_parent_id_idx" ON "services_faqs" USING btree ("_parent_id");
  CREATE INDEX "services__order_idx" ON "services" USING btree ("_order");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_category_idx" ON "services" USING btree ("category_id");
  CREATE INDEX "services_image_idx" ON "services" USING btree ("image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services_rels_order_idx" ON "services_rels" USING btree ("order");
  CREATE INDEX "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
  CREATE INDEX "services_rels_path_idx" ON "services_rels" USING btree ("path");
  CREATE INDEX "services_rels_services_id_idx" ON "services_rels" USING btree ("services_id");
  CREATE INDEX "service_categories__order_idx" ON "service_categories" USING btree ("_order");
  CREATE UNIQUE INDEX "service_categories_anchor_idx" ON "service_categories" USING btree ("anchor");
  CREATE INDEX "service_categories_updated_at_idx" ON "service_categories" USING btree ("updated_at");
  CREATE INDEX "service_categories_created_at_idx" ON "service_categories" USING btree ("created_at");
  CREATE INDEX "posts_blocks_lead_order_idx" ON "posts_blocks_lead" USING btree ("_order");
  CREATE INDEX "posts_blocks_lead_parent_id_idx" ON "posts_blocks_lead" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_lead_path_idx" ON "posts_blocks_lead" USING btree ("_path");
  CREATE INDEX "posts_blocks_h2_order_idx" ON "posts_blocks_h2" USING btree ("_order");
  CREATE INDEX "posts_blocks_h2_parent_id_idx" ON "posts_blocks_h2" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_h2_path_idx" ON "posts_blocks_h2" USING btree ("_path");
  CREATE INDEX "posts_blocks_p_order_idx" ON "posts_blocks_p" USING btree ("_order");
  CREATE INDEX "posts_blocks_p_parent_id_idx" ON "posts_blocks_p" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_p_path_idx" ON "posts_blocks_p" USING btree ("_path");
  CREATE INDEX "posts_blocks_quote_order_idx" ON "posts_blocks_quote" USING btree ("_order");
  CREATE INDEX "posts_blocks_quote_parent_id_idx" ON "posts_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_quote_path_idx" ON "posts_blocks_quote" USING btree ("_path");
  CREATE INDEX "posts_blocks_list_items_order_idx" ON "posts_blocks_list_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_list_items_parent_id_idx" ON "posts_blocks_list_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_list_order_idx" ON "posts_blocks_list" USING btree ("_order");
  CREATE INDEX "posts_blocks_list_parent_id_idx" ON "posts_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_list_path_idx" ON "posts_blocks_list" USING btree ("_path");
  CREATE INDEX "posts_blocks_image_order_idx" ON "posts_blocks_image" USING btree ("_order");
  CREATE INDEX "posts_blocks_image_parent_id_idx" ON "posts_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_image_path_idx" ON "posts_blocks_image" USING btree ("_path");
  CREATE INDEX "posts_blocks_image_image_idx" ON "posts_blocks_image" USING btree ("image_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_category_idx" ON "posts" USING btree ("category_id");
  CREATE INDEX "posts_cover_idx" ON "posts" USING btree ("cover_id");
  CREATE INDEX "posts_author_author_avatar_idx" ON "posts" USING btree ("author_avatar_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "_posts_v_blocks_lead_order_idx" ON "_posts_v_blocks_lead" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_lead_parent_id_idx" ON "_posts_v_blocks_lead" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_lead_path_idx" ON "_posts_v_blocks_lead" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_h2_order_idx" ON "_posts_v_blocks_h2" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_h2_parent_id_idx" ON "_posts_v_blocks_h2" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_h2_path_idx" ON "_posts_v_blocks_h2" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_p_order_idx" ON "_posts_v_blocks_p" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_p_parent_id_idx" ON "_posts_v_blocks_p" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_p_path_idx" ON "_posts_v_blocks_p" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_quote_order_idx" ON "_posts_v_blocks_quote" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_quote_parent_id_idx" ON "_posts_v_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_quote_path_idx" ON "_posts_v_blocks_quote" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_list_items_order_idx" ON "_posts_v_blocks_list_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_list_items_parent_id_idx" ON "_posts_v_blocks_list_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_list_order_idx" ON "_posts_v_blocks_list" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_list_parent_id_idx" ON "_posts_v_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_list_path_idx" ON "_posts_v_blocks_list" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_image_order_idx" ON "_posts_v_blocks_image" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_image_parent_id_idx" ON "_posts_v_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_image_path_idx" ON "_posts_v_blocks_image" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_image_image_idx" ON "_posts_v_blocks_image" USING btree ("image_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_category_idx" ON "_posts_v" USING btree ("version_category_id");
  CREATE INDEX "_posts_v_version_version_cover_idx" ON "_posts_v" USING btree ("version_cover_id");
  CREATE INDEX "_posts_v_version_author_version_author_avatar_idx" ON "_posts_v" USING btree ("version_author_avatar_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "blog_categories__order_idx" ON "blog_categories" USING btree ("_order");
  CREATE UNIQUE INDEX "blog_categories_name_idx" ON "blog_categories" USING btree ("name");
  CREATE INDEX "blog_categories_updated_at_idx" ON "blog_categories" USING btree ("updated_at");
  CREATE INDEX "blog_categories_created_at_idx" ON "blog_categories" USING btree ("created_at");
  CREATE INDEX "jobs__order_idx" ON "jobs" USING btree ("_order");
  CREATE INDEX "jobs_updated_at_idx" ON "jobs" USING btree ("updated_at");
  CREATE INDEX "jobs_created_at_idx" ON "jobs" USING btree ("created_at");
  CREATE INDEX "faq_categories_questions_order_idx" ON "faq_categories_questions" USING btree ("_order");
  CREATE INDEX "faq_categories_questions_parent_id_idx" ON "faq_categories_questions" USING btree ("_parent_id");
  CREATE INDEX "faq_categories__order_idx" ON "faq_categories" USING btree ("_order");
  CREATE UNIQUE INDEX "faq_categories_anchor_idx" ON "faq_categories" USING btree ("anchor");
  CREATE INDEX "faq_categories_updated_at_idx" ON "faq_categories" USING btree ("updated_at");
  CREATE INDEX "faq_categories_created_at_idx" ON "faq_categories" USING btree ("created_at");
  CREATE INDEX "team_members__order_idx" ON "team_members" USING btree ("_order");
  CREATE INDEX "team_members_photo_idx" ON "team_members" USING btree ("photo_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE INDEX "clients__order_idx" ON "clients" USING btree ("_order");
  CREATE INDEX "clients_logo_idx" ON "clients" USING btree ("logo_id");
  CREATE INDEX "clients_updated_at_idx" ON "clients" USING btree ("updated_at");
  CREATE INDEX "clients_created_at_idx" ON "clients" USING btree ("created_at");
  CREATE INDEX "industries_tags_order_idx" ON "industries_tags" USING btree ("_order");
  CREATE INDEX "industries_tags_parent_id_idx" ON "industries_tags" USING btree ("_parent_id");
  CREATE INDEX "industries__order_idx" ON "industries" USING btree ("_order");
  CREATE INDEX "industries_image_idx" ON "industries" USING btree ("image_id");
  CREATE INDEX "industries_updated_at_idx" ON "industries" USING btree ("updated_at");
  CREATE INDEX "industries_created_at_idx" ON "industries" USING btree ("created_at");
  CREATE INDEX "solutions__order_idx" ON "solutions" USING btree ("_order");
  CREATE INDEX "solutions_image_idx" ON "solutions" USING btree ("image_id");
  CREATE INDEX "solutions_updated_at_idx" ON "solutions" USING btree ("updated_at");
  CREATE INDEX "solutions_created_at_idx" ON "solutions" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_service_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("service_categories_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_blog_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_categories_id");
  CREATE INDEX "payload_locked_documents_rels_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("jobs_id");
  CREATE INDEX "payload_locked_documents_rels_faq_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("faq_categories_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_clients_id_idx" ON "payload_locked_documents_rels" USING btree ("clients_id");
  CREATE INDEX "payload_locked_documents_rels_industries_id_idx" ON "payload_locked_documents_rels" USING btree ("industries_id");
  CREATE INDEX "payload_locked_documents_rels_solutions_id_idx" ON "payload_locked_documents_rels" USING btree ("solutions_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "homepage_trusted_logos_title_lines_order_idx" ON "homepage_trusted_logos_title_lines" USING btree ("_order");
  CREATE INDEX "homepage_trusted_logos_title_lines_parent_id_idx" ON "homepage_trusted_logos_title_lines" USING btree ("_parent_id");
  CREATE INDEX "homepage_unique_value_values_order_idx" ON "homepage_unique_value_values" USING btree ("_order");
  CREATE INDEX "homepage_unique_value_values_parent_id_idx" ON "homepage_unique_value_values" USING btree ("_parent_id");
  CREATE INDEX "homepage_unique_value_visual_pills_order_idx" ON "homepage_unique_value_visual_pills" USING btree ("_order");
  CREATE INDEX "homepage_unique_value_visual_pills_parent_id_idx" ON "homepage_unique_value_visual_pills" USING btree ("_parent_id");
  CREATE INDEX "homepage_why_techvation_reasons_order_idx" ON "homepage_why_techvation_reasons" USING btree ("_order");
  CREATE INDEX "homepage_why_techvation_reasons_parent_id_idx" ON "homepage_why_techvation_reasons" USING btree ("_parent_id");
  CREATE INDEX "homepage_why_techvation_stats_order_idx" ON "homepage_why_techvation_stats" USING btree ("_order");
  CREATE INDEX "homepage_why_techvation_stats_parent_id_idx" ON "homepage_why_techvation_stats" USING btree ("_parent_id");
  CREATE INDEX "homepage_how_we_work_steps_deliverables_order_idx" ON "homepage_how_we_work_steps_deliverables" USING btree ("_order");
  CREATE INDEX "homepage_how_we_work_steps_deliverables_parent_id_idx" ON "homepage_how_we_work_steps_deliverables" USING btree ("_parent_id");
  CREATE INDEX "homepage_how_we_work_steps_order_idx" ON "homepage_how_we_work_steps" USING btree ("_order");
  CREATE INDEX "homepage_how_we_work_steps_parent_id_idx" ON "homepage_how_we_work_steps" USING btree ("_parent_id");
  CREATE INDEX "homepage_how_we_work_steps_image_idx" ON "homepage_how_we_work_steps" USING btree ("image_id");
  CREATE INDEX "homepage_strategy_call_steps_order_idx" ON "homepage_strategy_call_steps" USING btree ("_order");
  CREATE INDEX "homepage_strategy_call_steps_parent_id_idx" ON "homepage_strategy_call_steps" USING btree ("_parent_id");
  CREATE INDEX "homepage_rels_order_idx" ON "homepage_rels" USING btree ("order");
  CREATE INDEX "homepage_rels_parent_idx" ON "homepage_rels" USING btree ("parent_id");
  CREATE INDEX "homepage_rels_path_idx" ON "homepage_rels" USING btree ("path");
  CREATE INDEX "homepage_rels_services_id_idx" ON "homepage_rels" USING btree ("services_id");
  CREATE INDEX "services_page_engagement_models_points_order_idx" ON "services_page_engagement_models_points" USING btree ("_order");
  CREATE INDEX "services_page_engagement_models_points_parent_id_idx" ON "services_page_engagement_models_points" USING btree ("_parent_id");
  CREATE INDEX "services_page_engagement_models_order_idx" ON "services_page_engagement_models" USING btree ("_order");
  CREATE INDEX "services_page_engagement_models_parent_id_idx" ON "services_page_engagement_models" USING btree ("_parent_id");
  CREATE INDEX "services_page_mega_menu_columns_order_idx" ON "services_page_mega_menu_columns" USING btree ("_order");
  CREATE INDEX "services_page_mega_menu_columns_parent_id_idx" ON "services_page_mega_menu_columns" USING btree ("_parent_id");
  CREATE INDEX "services_page_detail_process_steps_order_idx" ON "services_page_detail_process_steps" USING btree ("_order");
  CREATE INDEX "services_page_detail_process_steps_parent_id_idx" ON "services_page_detail_process_steps" USING btree ("_parent_id");
  CREATE INDEX "services_page_detail_tech_reasons_order_idx" ON "services_page_detail_tech_reasons" USING btree ("_order");
  CREATE INDEX "services_page_detail_tech_reasons_parent_id_idx" ON "services_page_detail_tech_reasons" USING btree ("_parent_id");
  CREATE INDEX "services_page_mega_menu_promo_mega_menu_promo_image_idx" ON "services_page" USING btree ("mega_menu_promo_image_id");
  CREATE INDEX "services_page_rels_order_idx" ON "services_page_rels" USING btree ("order");
  CREATE INDEX "services_page_rels_parent_idx" ON "services_page_rels" USING btree ("parent_id");
  CREATE INDEX "services_page_rels_path_idx" ON "services_page_rels" USING btree ("path");
  CREATE INDEX "services_page_rels_service_categories_id_idx" ON "services_page_rels" USING btree ("service_categories_id");
  CREATE INDEX "about_page_story_paragraphs_order_idx" ON "about_page_story_paragraphs" USING btree ("_order");
  CREATE INDEX "about_page_story_paragraphs_parent_id_idx" ON "about_page_story_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "about_page_story_stats_order_idx" ON "about_page_story_stats" USING btree ("_order");
  CREATE INDEX "about_page_story_stats_parent_id_idx" ON "about_page_story_stats" USING btree ("_parent_id");
  CREATE INDEX "about_page_values_items_order_idx" ON "about_page_values_items" USING btree ("_order");
  CREATE INDEX "about_page_values_items_parent_id_idx" ON "about_page_values_items" USING btree ("_parent_id");
  CREATE INDEX "about_page_presence_regions_order_idx" ON "about_page_presence_regions" USING btree ("_order");
  CREATE INDEX "about_page_presence_regions_parent_id_idx" ON "about_page_presence_regions" USING btree ("_parent_id");
  CREATE INDEX "about_page_hero_hero_image_idx" ON "about_page" USING btree ("hero_image_id");
  CREATE INDEX "about_page_story_collage_story_collage_main_idx" ON "about_page" USING btree ("story_collage_main_id");
  CREATE INDEX "about_page_story_collage_story_collage_inset_idx" ON "about_page" USING btree ("story_collage_inset_id");
  CREATE INDEX "about_page_presence_presence_image_idx" ON "about_page" USING btree ("presence_image_id");
  CREATE INDEX "careers_page_perks_items_order_idx" ON "careers_page_perks_items" USING btree ("_order");
  CREATE INDEX "careers_page_perks_items_parent_id_idx" ON "careers_page_perks_items" USING btree ("_parent_id");
  CREATE INDEX "careers_page_gallery_tab_images_order_idx" ON "careers_page_gallery_tab_images" USING btree ("_order");
  CREATE INDEX "careers_page_gallery_tab_images_parent_id_idx" ON "careers_page_gallery_tab_images" USING btree ("_parent_id");
  CREATE INDEX "careers_page_gallery_tab_images_image_idx" ON "careers_page_gallery_tab_images" USING btree ("image_id");
  CREATE INDEX "careers_page_positions_departments_order_idx" ON "careers_page_positions_departments" USING btree ("_order");
  CREATE INDEX "careers_page_positions_departments_parent_id_idx" ON "careers_page_positions_departments" USING btree ("_parent_id");
  CREATE INDEX "careers_page_positions_locations_order_idx" ON "careers_page_positions_locations" USING btree ("_order");
  CREATE INDEX "careers_page_positions_locations_parent_id_idx" ON "careers_page_positions_locations" USING btree ("_parent_id");
  CREATE INDEX "careers_page_process_steps_order_idx" ON "careers_page_process_steps" USING btree ("_order");
  CREATE INDEX "careers_page_process_steps_parent_id_idx" ON "careers_page_process_steps" USING btree ("_parent_id");
  CREATE INDEX "careers_page_hero_hero_image_idx" ON "careers_page" USING btree ("hero_image_id");
  CREATE INDEX "faqs_page_contact_cards_order_idx" ON "faqs_page_contact_cards" USING btree ("_order");
  CREATE INDEX "faqs_page_contact_cards_parent_id_idx" ON "faqs_page_contact_cards" USING btree ("_parent_id");
  CREATE INDEX "faqs_page_hero_hero_image_idx" ON "faqs_page" USING btree ("hero_image_id");
  CREATE INDEX "contact_page_quick_quick_contact_order_idx" ON "contact_page_quick_quick_contact" USING btree ("_order");
  CREATE INDEX "contact_page_quick_quick_contact_parent_id_idx" ON "contact_page_quick_quick_contact" USING btree ("_parent_id");
  CREATE INDEX "contact_page_form_services_order_idx" ON "contact_page_form_services" USING btree ("_order");
  CREATE INDEX "contact_page_form_services_parent_id_idx" ON "contact_page_form_services" USING btree ("_parent_id");
  CREATE INDEX "contact_page_form_budgets_order_idx" ON "contact_page_form_budgets" USING btree ("_order");
  CREATE INDEX "contact_page_form_budgets_parent_id_idx" ON "contact_page_form_budgets" USING btree ("_parent_id");
  CREATE INDEX "contact_page_form_timelines_order_idx" ON "contact_page_form_timelines" USING btree ("_order");
  CREATE INDEX "contact_page_form_timelines_parent_id_idx" ON "contact_page_form_timelines" USING btree ("_parent_id");
  CREATE INDEX "contact_page_offices_offices_order_idx" ON "contact_page_offices_offices" USING btree ("_order");
  CREATE INDEX "contact_page_offices_offices_parent_id_idx" ON "contact_page_offices_offices" USING btree ("_parent_id");
  CREATE INDEX "contact_page_offices_offices_photo_idx" ON "contact_page_offices_offices" USING btree ("photo_id");
  CREATE INDEX "contact_page_offices_hours_lines_order_idx" ON "contact_page_offices_hours_lines" USING btree ("_order");
  CREATE INDEX "contact_page_offices_hours_lines_parent_id_idx" ON "contact_page_offices_hours_lines" USING btree ("_parent_id");
  CREATE INDEX "contact_page_hero_hero_image_idx" ON "contact_page" USING btree ("hero_image_id");
  CREATE INDEX "site_settings_navbar_links_order_idx" ON "site_settings_navbar_links" USING btree ("_order");
  CREATE INDEX "site_settings_navbar_links_parent_id_idx" ON "site_settings_navbar_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_social_order_idx" ON "site_settings_footer_social" USING btree ("_order");
  CREATE INDEX "site_settings_footer_social_parent_id_idx" ON "site_settings_footer_social" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_columns_links_order_idx" ON "site_settings_footer_columns_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_columns_links_parent_id_idx" ON "site_settings_footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_columns_order_idx" ON "site_settings_footer_columns" USING btree ("_order");
  CREATE INDEX "site_settings_footer_columns_parent_id_idx" ON "site_settings_footer_columns" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_columns_compact_links_order_idx" ON "site_settings_footer_columns_compact_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_columns_compact_links_parent_id_idx" ON "site_settings_footer_columns_compact_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_columns_compact_order_idx" ON "site_settings_footer_columns_compact" USING btree ("_order");
  CREATE INDEX "site_settings_footer_columns_compact_parent_id_idx" ON "site_settings_footer_columns_compact" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_contact_items_order_idx" ON "site_settings_footer_contact_items" USING btree ("_order");
  CREATE INDEX "site_settings_footer_contact_items_parent_id_idx" ON "site_settings_footer_contact_items" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_legal_links_order_idx" ON "site_settings_footer_legal_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_legal_links_parent_id_idx" ON "site_settings_footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_seo_keywords_order_idx" ON "site_settings_seo_keywords" USING btree ("_order");
  CREATE INDEX "site_settings_seo_keywords_parent_id_idx" ON "site_settings_seo_keywords" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "services_outcomes" CASCADE;
  DROP TABLE "services_overview_points" CASCADE;
  DROP TABLE "services_capabilities_items" CASCADE;
  DROP TABLE "services_tools" CASCADE;
  DROP TABLE "services_faqs" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_rels" CASCADE;
  DROP TABLE "service_categories" CASCADE;
  DROP TABLE "posts_blocks_lead" CASCADE;
  DROP TABLE "posts_blocks_h2" CASCADE;
  DROP TABLE "posts_blocks_p" CASCADE;
  DROP TABLE "posts_blocks_quote" CASCADE;
  DROP TABLE "posts_blocks_list_items" CASCADE;
  DROP TABLE "posts_blocks_list" CASCADE;
  DROP TABLE "posts_blocks_image" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "_posts_v_blocks_lead" CASCADE;
  DROP TABLE "_posts_v_blocks_h2" CASCADE;
  DROP TABLE "_posts_v_blocks_p" CASCADE;
  DROP TABLE "_posts_v_blocks_quote" CASCADE;
  DROP TABLE "_posts_v_blocks_list_items" CASCADE;
  DROP TABLE "_posts_v_blocks_list" CASCADE;
  DROP TABLE "_posts_v_blocks_image" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "blog_categories" CASCADE;
  DROP TABLE "jobs" CASCADE;
  DROP TABLE "faq_categories_questions" CASCADE;
  DROP TABLE "faq_categories" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "clients" CASCADE;
  DROP TABLE "industries_tags" CASCADE;
  DROP TABLE "industries" CASCADE;
  DROP TABLE "solutions" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "homepage_trusted_logos_title_lines" CASCADE;
  DROP TABLE "homepage_unique_value_values" CASCADE;
  DROP TABLE "homepage_unique_value_visual_pills" CASCADE;
  DROP TABLE "homepage_why_techvation_reasons" CASCADE;
  DROP TABLE "homepage_why_techvation_stats" CASCADE;
  DROP TABLE "homepage_how_we_work_steps_deliverables" CASCADE;
  DROP TABLE "homepage_how_we_work_steps" CASCADE;
  DROP TABLE "homepage_strategy_call_steps" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "homepage_rels" CASCADE;
  DROP TABLE "services_page_engagement_models_points" CASCADE;
  DROP TABLE "services_page_engagement_models" CASCADE;
  DROP TABLE "services_page_mega_menu_columns" CASCADE;
  DROP TABLE "services_page_detail_process_steps" CASCADE;
  DROP TABLE "services_page_detail_tech_reasons" CASCADE;
  DROP TABLE "services_page" CASCADE;
  DROP TABLE "services_page_rels" CASCADE;
  DROP TABLE "about_page_story_paragraphs" CASCADE;
  DROP TABLE "about_page_story_stats" CASCADE;
  DROP TABLE "about_page_values_items" CASCADE;
  DROP TABLE "about_page_presence_regions" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "careers_page_perks_items" CASCADE;
  DROP TABLE "careers_page_gallery_tab_images" CASCADE;
  DROP TABLE "careers_page_positions_departments" CASCADE;
  DROP TABLE "careers_page_positions_locations" CASCADE;
  DROP TABLE "careers_page_process_steps" CASCADE;
  DROP TABLE "careers_page" CASCADE;
  DROP TABLE "faqs_page_contact_cards" CASCADE;
  DROP TABLE "faqs_page" CASCADE;
  DROP TABLE "blog_page" CASCADE;
  DROP TABLE "contact_page_quick_quick_contact" CASCADE;
  DROP TABLE "contact_page_form_services" CASCADE;
  DROP TABLE "contact_page_form_budgets" CASCADE;
  DROP TABLE "contact_page_form_timelines" CASCADE;
  DROP TABLE "contact_page_offices_offices" CASCADE;
  DROP TABLE "contact_page_offices_hours_lines" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "solutions_page" CASCADE;
  DROP TABLE "site_settings_navbar_links" CASCADE;
  DROP TABLE "site_settings_footer_social" CASCADE;
  DROP TABLE "site_settings_footer_columns_links" CASCADE;
  DROP TABLE "site_settings_footer_columns" CASCADE;
  DROP TABLE "site_settings_footer_columns_compact_links" CASCADE;
  DROP TABLE "site_settings_footer_columns_compact" CASCADE;
  DROP TABLE "site_settings_footer_contact_items" CASCADE;
  DROP TABLE "site_settings_footer_legal_links" CASCADE;
  DROP TABLE "site_settings_seo_keywords" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_services_capabilities_items_icon";
  DROP TYPE "public"."enum_services_icon";
  DROP TYPE "public"."enum_service_categories_icon";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_jobs_type";
  DROP TYPE "public"."enum_faq_categories_icon";
  DROP TYPE "public"."enum_industries_icon";
  DROP TYPE "public"."enum_solutions_icon";
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_homepage_unique_value_values_icon";
  DROP TYPE "public"."enum_homepage_unique_value_visual_pills_icon";
  DROP TYPE "public"."enum_homepage_unique_value_visual_pills_position";
  DROP TYPE "public"."enum_homepage_why_techvation_reasons_icon";
  DROP TYPE "public"."enum_homepage_how_we_work_steps_icon";
  DROP TYPE "public"."enum_services_page_engagement_models_icon";
  DROP TYPE "public"."enum_services_page_detail_tech_reasons_icon";
  DROP TYPE "public"."enum_about_page_values_items_icon";
  DROP TYPE "public"."enum_about_page_mission_icon";
  DROP TYPE "public"."enum_about_page_vision_icon";
  DROP TYPE "public"."enum_careers_page_perks_items_icon";
  DROP TYPE "public"."enum_faqs_page_contact_cards_icon";
  DROP TYPE "public"."enum_contact_page_quick_quick_contact_icon";
  DROP TYPE "public"."enum_site_settings_footer_social_name";
  DROP TYPE "public"."enum_site_settings_footer_contact_items_icon";`)
}
