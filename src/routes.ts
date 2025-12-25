import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get(
    "/posts",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return { status: 200, response: "posts" };
    }
  );
}
