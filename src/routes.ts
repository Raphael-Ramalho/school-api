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
      return { status: 200, response: "posts list" };
    }
  );

  fastify.get(
    "/posts/:postId",
    async (
      request: FastifyRequest<{ Params: { postId: string } }>,
      reply: FastifyReply
    ) => {
      const { postId } = request.params;
      return { status: 200, response: `returning post with id: ${postId}` };
    }
  );

  fastify.post(
    "/posts",
    async (
      request: FastifyRequest<{
        Body: { title: string; content: string; author: string };
      }>,
      reply: FastifyReply
    ) => {
      const { author, content, title } = request.body;
      return {
        status: 200,
        response: `post created`,
        postData: { title, content, author },
      };
    }
  );

  fastify.put(
    "/posts/:postId",
    async (
      request: FastifyRequest<{
        Params: { postId: string };
        Body: { title: string; content: string; author: string };
      }>,
      reply: FastifyReply
    ) => {
      const { author, content, title } = request.body;
      const { postId } = request.params;
      return {
        status: 200,
        response: `post updated with id: ${postId}`,
        postData: { title, content, author },
      };
    }
  );

  fastify.delete(
    "/posts/:postId",
    async (
      request: FastifyRequest<{ Params: { postId: string } }>,
      reply: FastifyReply
    ) => {
      const { postId } = request.params;
      return { status: 200, response: `deleted post with id: ${postId}` };
    }
  );

  fastify.get(
    "/posts/search",
    async (
      request: FastifyRequest<{ Querystring: { find: string } }>,
      reply: FastifyReply
    ) => {
      const { find } = request.query;
      return { status: 200, response: `searched for post with text fragment: ${find}` };
    }
  );
}
