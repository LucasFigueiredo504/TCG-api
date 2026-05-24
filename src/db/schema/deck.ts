import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const decksTable = pgTable("decks", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  cardsIds: integer("cards_ids").array().notNull().default([]),
  playerId: integer("player_id").notNull(),
});
