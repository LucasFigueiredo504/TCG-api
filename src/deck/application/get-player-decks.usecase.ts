import { deckRepository } from "../infra/deck.repository";

export async function getPlayerDecksUseCase(playerId: number) {
  const decks = await deckRepository.findByPlayerId(playerId);

  if (!decks || decks.length === 0) {
    return { status: 404, error: "No decks found for this player" };
  }

  return { status: 200, decks };
}
