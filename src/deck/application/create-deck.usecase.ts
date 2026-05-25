import { deckRepository } from "../infra/deck.repository";

export async function createDeckUseCase(
  playerId: number,
  deckName: string,
  cardIds: number[],
) {
  if (!deckName || deckName.trim() === "") {
    return { status: 400, error: "Deck name is required" };
  }

  const deck = await deckRepository.create(playerId, deckName, cardIds);

  if (!deck) {
    return { status: 500, error: "Failed to create deck" };
  }

  return { status: 200, deck };
}
