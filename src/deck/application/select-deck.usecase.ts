export async function selectDeckUseCase(playerId: number, deckId: number) {
  try {
    return { status: 200, message: "success" };
  } catch (error) {
    console.log("Error when selecting deck", error);
  }
}
