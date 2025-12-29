import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { decksTable } from "./deck";
import { relations } from "drizzle-orm";

export const playersTable = pgTable("players", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userName: varchar("user_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password", { length: 255 }).notNull(),
  coins: integer("coins").notNull().default(0),
  ownedCards: integer("owned_cards").array().notNull().default([]),
  selectedDeckId: integer("selected_deck_id").references(() => decksTable.id, {
    onDelete: "set null",
  }),
});

export const playersRelations = relations(playersTable, ({ one, many }) => ({
  deck: one(decksTable, {
    fields: [playersTable.selectedDeckId],
    references: [decksTable.id],
  }),
  decks: many(decksTable),
}));
