import { eq } from "drizzle-orm";
import { db } from "../../db";
import { playersTable } from "../../db/schema";

export class GameRepository {
  static async savePlayer(
    playerId: number,
    newCoins: number,
    cards: Array<number>
  ): Promise<void> {
    await db
      .update(playersTable)
      .set({ coins: newCoins, ownedCards: cards })
      .where(eq(playersTable.id, playerId));
  }
}
