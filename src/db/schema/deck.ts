import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { playersTable } from "./player";

export const decksTable = pgTable("decks", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  cardsIds: integer("cards_ids").array().notNull().default([]),
  playerId: integer("player_id")
    .notNull()
    .references(() => playersTable.id, { onDelete: "cascade" }),
});

export const decksRelations = relations(decksTable, ({ one }) => ({
  player: one(playersTable, {
    fields: [decksTable.playerId],
    references: [playersTable.id],
  }),
}));
