import { relations } from "drizzle-orm";
import { decksTable } from "./deck";
import { playersTable } from "./player";

export const playersRelations = relations(playersTable, ({ one, many }) => ({
  deck: one(decksTable, {
    fields: [playersTable.selectedDeckId],
    references: [decksTable.id],
  }),
  decks: many(decksTable),
}));

export const decksRelations = relations(decksTable, ({ one }) => ({
  player: one(playersTable, {
    fields: [decksTable.playerId],
    references: [playersTable.id],
  }),
}));
