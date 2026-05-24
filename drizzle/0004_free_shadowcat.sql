ALTER TABLE "decks" DROP CONSTRAINT "decks_player_id_players_id_fk";
--> statement-breakpoint
ALTER TABLE "players" DROP CONSTRAINT "players_selected_deck_id_decks_id_fk";
