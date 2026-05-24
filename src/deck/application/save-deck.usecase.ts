import { deckRepository } from "../infra/deck.repository";

export async function saveDeckUseCase(
  playerId: number,
  deckName: string,
  cardIds: number[],
) {
  if (!deckName || cardIds.length === 0) {
    return {
      status: 400,
      error: "Deck name and at least one card are required",
    };
  }

  const deck = await deckRepository.upsert(playerId, deckName, cardIds);

  if (!deck) {
    return { status: 404 };
  }

  return { status: 200, deck };
}
