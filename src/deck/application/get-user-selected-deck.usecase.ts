export async function getUserSelectedDeckUseCase(playerId: number) {
  try {
    return { status: 200, message: "success" };
  } catch (error) {
    console.log("Error when geting selected deck", error);
  }
}
