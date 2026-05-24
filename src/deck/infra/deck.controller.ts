import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../..";
import { saveDeckUseCase } from "../application/save-deck.usecase";
import { getDeckUseCase } from "../application/get-deck.usecase";
import { getSelectedDeckUseCase } from "../application/get-user-selected-deck.usecase";
import { selectDeckUseCase } from "../application/select-deck.usecase";

app.post(
  "/deck/save",
  { preHandler: [app.authenticate] },
  async (request: FastifyRequest, reply: FastifyReply) => {
    const playerId = (request.user as any).id;
    const { deckName, cardIds } = request.body as {
      deckName: string;
      cardIds: Array<number>;
    };

    const result = await saveDeckUseCase(playerId, deckName, cardIds);

    if (result?.status === 400) {
      return reply.status(400).send({ error: result.error });
    }

    if (result?.status === 404) {
      return reply.status(404).send({ error: "Deck not found" });
    }

    return reply.status(200).send({ message: "success" });
  },
);

app.post(
  "/deck/load",
  { preHandler: [app.authenticate] },
  async (request: FastifyRequest, reply: FastifyReply) => {
    const { deckId } = request.body as { deckId: number };

    const result = await getDeckUseCase(deckId);

    if (result?.status === 404) {
      return reply.status(404).send({ error: "Deck not found" });
    }

    return reply.status(200).send({ deck: result.deck });
  },
);

app.get(
  "/deck/selected/:playerId",
  async (request: FastifyRequest, reply: FastifyReply) => {
    const { playerId } = request.params as { playerId: number };

    const result = await getSelectedDeckUseCase(playerId);

    if (result?.status === 404) {
      return reply.status(404).send({ error: "No selected deck found" });
    }

    return reply.status(200).send({ deck: result.deck });
  },
);

app.post(
  "/deck/select",
  { preHandler: [app.authenticate] },
  async (request: FastifyRequest, reply: FastifyReply) => {
    const playerId = (request.user as any).id;
    const { deckId } = request.body as { deckId: number };

    const result = await selectDeckUseCase(playerId, deckId);

    if (result?.status === 404) {
      return reply.status(404).send({ error: "Deck not found" });
    }

    if (result?.status === 403) {
      return reply
        .status(403)
        .send({ error: "Deck does not belong to player" });
    }

    return reply.status(200).send({ message: "Deck selected successfully" });
  },
);
