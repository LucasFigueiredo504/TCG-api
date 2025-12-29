export async function loadUserGame(playerId: number) {
  try {
    return { status: 200, message: "success" };
  } catch (error) {
    console.log("Error loading Game", error);
  }
}
