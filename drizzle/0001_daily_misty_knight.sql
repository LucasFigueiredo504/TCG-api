ALTER TABLE "decks" ADD COLUMN "coins" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "players" ADD COLUMN "selected_deck_id" integer;--> statement-breakpoint
ALTER TABLE "players" ADD CONSTRAINT "players_selected_deck_id_decks_id_fk" FOREIGN KEY ("selected_deck_id") REFERENCES "public"."decks"("id") ON DELETE set null ON UPDATE no action;