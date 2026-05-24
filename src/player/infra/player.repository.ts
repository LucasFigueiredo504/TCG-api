import { eq } from "drizzle-orm";
import { db } from "../../db";
import { playersTable } from "../../db/schema";

export const playerRepository = {
  async findById(playerId: number) {
    const [player] = await db
      .select()
      .from(playersTable)
      .where(eq(playersTable.id, playerId));
    return player ?? null;
  },

  async updateSelectedDeck(playerId: number, deckId: number | null) {
    const [updated] = await db
      .update(playersTable)
      .set({ selectedDeckId: deckId })
      .where(eq(playersTable.id, playerId))
      .returning();
    return updated ?? null;
  },
};
