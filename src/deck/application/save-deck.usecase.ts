export async function saveDeckUseCase(
  playerId: number,
  deckName: string | null,
  cardIds: Array<number>
) {
  try {
    return { status: 200, message: "success" };
  } catch (error) {
    console.log("Error when saving deck", error);
  }
}
