import { FastifyReply, FastifyRequest } from "fastify";

export class PostController {
  public static build() {
    return new PostController();
  }

  public async getAllPosts(request: FastifyRequest, reply: FastifyReply) {
    reply.status(200).send({ response: "posts list" });
  }

  public async getPost(
    request: FastifyRequest<{ Params: { postId: string } }>,
    reply: FastifyReply
  ) {
    const { postId } = request.params;

    reply.status(200).send({ response: `returning post with id: ${postId}` });
  }

  public async createPost(
    request: FastifyRequest<{
      Body: { title: string; content: string; author: string };
    }>,
    reply: FastifyReply
  ) {
    const { author, content, title } = request.body;

    reply
      .status(200)
      .send({ response: `post created`, postData: { title, content, author } });
  }

  public async editPost(
    request: FastifyRequest<{
      Params: { postId: string };
      Body: { title: string; content: string; author: string };
    }>,
    reply: FastifyReply
  ) {
    const { author, content, title } = request.body;
    const { postId } = request.params;

    reply.status(200).send({
      response: `post updated with id: ${postId}`,
      postData: { title, content, author },
    });
  }

  public async deletePost(
    request: FastifyRequest<{ Params: { postId: string } }>,
    reply: FastifyReply
  ) {
    const { postId } = request.params;

    reply.status(200).send({ response: `deleted post with id: ${postId}` });
  }

  public async findPost(
    request: FastifyRequest<{ Querystring: { find: string } }>,
    reply: FastifyReply
  ) {
    const { find } = request.query;

    reply
      .status(200)
      .send({ response: `searched for post with text fragment: ${find}` });
  }
}
