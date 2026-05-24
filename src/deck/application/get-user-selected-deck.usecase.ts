import { playerRepository } from "../../player/infra/player.repository";
import { deckRepository } from "../infra/deck.repository";

export async function getSelectedDeckUseCase(playerId: number) {
  const player = await playerRepository.findById(playerId);

  if (!player || player.selectedDeckId === null) {
    return { status: 404 };
  }

  const deck = await deckRepository.findById(player.selectedDeckId);

  if (!deck) {
    return { status: 404 };
  }

  return { status: 200, deck };
}
