import { deckRepository } from "../infra/deck.repository";

export async function editDeckUseCase(
  playerId: number,
  deckId: number,
  deckName: string,
  cardIds: number[],
) {
  const deck = await deckRepository.findById(deckId);

  if (!deck) {
    return { status: 404, error: "Deck not found" };
  }

  if (deck.playerId !== playerId) {
    return { status: 403, error: "Deck does not belong to player" };
  }

  if (!deckName || deckName.trim() === "") {
    return { status: 400, error: "Deck name is required" };
  }

  const updated = await deckRepository.update(deckId, deckName, cardIds);

  if (!updated) {
    return { status: 500, error: "Failed to update deck" };
  }

  return { status: 200, deck: updated };
}
