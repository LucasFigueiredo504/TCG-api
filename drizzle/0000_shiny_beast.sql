CREATE TABLE "decks" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "decks_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"cards_ids" integer[] DEFAULT '{}' NOT NULL,
	"player_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "players" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "players_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "players_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "decks" ADD CONSTRAINT "decks_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;