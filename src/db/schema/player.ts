import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const playersTable = pgTable("players", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userName: varchar("user_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password", { length: 255 }).notNull(),
});
