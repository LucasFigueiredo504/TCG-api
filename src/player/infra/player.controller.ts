import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../..";
import { getPlayerUseCase } from "../application/get-player.usecase";

app.get(
  "/player/me",
  { preHandler: [app.authenticate] },
  async (request: FastifyRequest, reply: FastifyReply) => {
    const playerId = (request.user as any).id;

    const result = await getPlayerUseCase(playerId);

    if (result?.status === 404) {
      return reply.status(404).send({ error: result.error });
    }

    return reply.status(200).send({ player: result.player });
  },
);
