ALTER TABLE "players" ADD COLUMN "coins" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "decks" DROP COLUMN "coins";