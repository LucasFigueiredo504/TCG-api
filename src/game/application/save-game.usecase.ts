export async function saveUserGame(
  playerId: number,
  ownedCards: Array<number>,
  coins: number
) {
  try {
    return { status: 200, message: "success" };
  } catch (error) {
    console.log("Error saving Game", error);
  }
}
