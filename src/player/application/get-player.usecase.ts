import { playerRepository } from "../infra/player.repository";

export async function getPlayerUseCase(playerId: number) {
  const player = await playerRepository.findById(playerId);

  if (!player) {
    return { status: 404, error: "Player not found" };
  }

  const { passwordHash, ...safePlayer } = player;

  return { status: 200, player: safePlayer };
}
