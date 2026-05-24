import { deckRepository } from "../infra/deck.repository";
import { playerRepository } from "../../player/infra/player.repository";

export async function selectDeckUseCase(playerId: number, deckId: number) {
  const deck = await deckRepository.findById(deckId);

  if (!deck) {
    return { status: 404 };
  }

  if (deck.playerId !== playerId) {
    return { status: 403 };
  }

  await playerRepository.updateSelectedDeck(playerId, deckId);

  return { status: 200 };
}
