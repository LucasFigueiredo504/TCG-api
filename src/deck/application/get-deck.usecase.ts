import { deckRepository } from "../infra/deck.repository";

export async function getDeckUseCase(deckId: number) {
  const deck = await deckRepository.findById(deckId);

  if (!deck) {
    return { status: 404 };
  }

  return { status: 200, deck };
}
