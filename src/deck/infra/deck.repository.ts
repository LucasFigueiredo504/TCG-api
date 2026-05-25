import { eq } from "drizzle-orm";
import { db } from "../../db";
import { decksTable } from "../../db/schema";

export const deckRepository = {
  async findById(deckId: number) {
    const [deck] = await db
      .select()
      .from(decksTable)
      .where(eq(decksTable.id, deckId));
    return deck ?? null;
  },

  async findByPlayerId(playerId: number) {
    return db
      .select()
      .from(decksTable)
      .where(eq(decksTable.playerId, playerId));
  },
  async create(playerId: number, deckName: string, cardIds: number[]) {
    const [created] = await db
      .insert(decksTable)
      .values({ playerId, name: deckName, cardsIds: cardIds })
      .returning();
    return created ?? null;
  },
  async update(deckId: number, deckName: string, cardIds: number[]) {
    const [updated] = await db
      .update(decksTable)
      .set({ name: deckName, cardsIds: cardIds })
      .where(eq(decksTable.id, deckId))
      .returning();
    return updated ?? null;
  },

  async upsert(playerId: number, deckName: string, cardIds: number[]) {
    const [existing] = await db
      .select()
      .from(decksTable)
      .where(eq(decksTable.playerId, playerId));

    if (existing) {
      const [updated] = await db
        .update(decksTable)
        .set({ name: deckName, cardsIds: cardIds })
        .where(eq(decksTable.id, existing.id))
        .returning();
      return updated;
    }

    const [created] = await db
      .insert(decksTable)
      .values({ playerId, name: deckName, cardsIds: cardIds })
      .returning();
    return created;
  },
};
