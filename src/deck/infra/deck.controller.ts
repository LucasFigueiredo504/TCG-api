import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../..";
import { saveDeckUseCase } from "../application/save-deck.usecase";
import { getDeckUseCase } from "../application/get-deck.usecase";

app.post(
  "/deck/save",
  {
    preHandler: [app.authenticate],
  },
  async (request: FastifyRequest, reply: FastifyReply) => {
    const playerId = (request.user as any).id;
    const { deckName, cardIds } = request.body as {
      deckName: string;
      cardIds: Array<number>;
    };

    const result = await saveDeckUseCase(playerId, deckName, cardIds);

    if (result?.status === 404) {
      return reply.status(404).send({ error: "Deck not found" });
    }

    return reply.status(200).send({ message: "success" });
  }
);
app.post(
  "/deck/load",
  {
    preHandler: [app.authenticate],
  },
  async (request: FastifyRequest, reply: FastifyReply) => {
    const { deckId } = request.body as {
      deckId: number;
    };

    const result = await getDeckUseCase(deckId);

    if (result?.status === 404) {
      return reply.status(404).send({ error: "Deck not found" });
    }

    return reply.status(200).send({ message: "success" });
  }
); //implementar get user selectedDeck
