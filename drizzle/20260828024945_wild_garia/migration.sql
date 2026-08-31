CREATE TYPE "gender" AS ENUM('Male', 'Female');--> statement-breakpoint
CREATE TYPE "name" AS ENUM('CE', 'Archi', 'ME', 'CEIT', 'EP', 'EC', 'ChE', 'MC', 'Bio-T', 'Agri', 'NT');--> statement-breakpoint
CREATE TYPE "title" AS ENUM('King', 'Queen', 'Smart', 'Style', 'Popular');--> statement-breakpoint
CREATE TABLE "admins" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "admins_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "nominees" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "nominees_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"number" integer NOT NULL,
	"gender" "gender",
	"title" "title",
	"major" "name",
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "votes" (
	"id" uuid PRIMARY KEY,
	"king_nominee_id" integer,
	"queen_nominee_id" integer,
	"smart_nominee_id" integer,
	"style_nominee_id" integer,
	"popular_nominee_id" integer,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_king_nominee_id_nominees_id_fkey" FOREIGN KEY ("king_nominee_id") REFERENCES "nominees"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_queen_nominee_id_nominees_id_fkey" FOREIGN KEY ("queen_nominee_id") REFERENCES "nominees"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_smart_nominee_id_nominees_id_fkey" FOREIGN KEY ("smart_nominee_id") REFERENCES "nominees"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_style_nominee_id_nominees_id_fkey" FOREIGN KEY ("style_nominee_id") REFERENCES "nominees"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_popular_nominee_id_nominees_id_fkey" FOREIGN KEY ("popular_nominee_id") REFERENCES "nominees"("id") ON DELETE CASCADE;