import { playerRepository } from "../../player/infra/player.repository";
import { deckRepository } from "../infra/deck.repository";

export async function getSelectedDeckUseCase(playerIds: number[]) {
  const results = await Promise.all(
    playerIds.map(async (playerId) => {
      const player = await playerRepository.findById(playerId);

      if (!player || player.selectedDeckId === null) {
        return { playerId, status: 404, deck: null };
      }

      const deck = await deckRepository.findById(player.selectedDeckId);

      if (!deck) {
        return { playerId, status: 404, deck: null };
      }

      return { playerId, status: 200, deck };
    }),
  );

  const failed = results.find((r) => r.status === 404);
  if (failed) {
    return { status: 404, playerId: failed.playerId };
  }

  return {
    status: 200,
    decks: results.map((r) => ({ playerId: r.playerId, deck: r.deck })),
  };
}
