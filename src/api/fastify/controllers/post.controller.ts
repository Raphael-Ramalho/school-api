import { FastifyReply, FastifyRequest } from "fastify";
import { PostRepositoryPrisma } from "../../../repository/prisma/post.repository.prisma.ts";
import { prisma } from "../../../util/prisma.util.ts";
import { PostServiceImplementation } from "../../../services/post/post.service.implementation.ts";

export class PostController {
  public static build() {
    return new PostController();
  }

  public async getAllPosts(request: FastifyRequest, reply: FastifyReply) {
    const aRepository = PostRepositoryPrisma.build(prisma);
    const aService = PostServiceImplementation.build(aRepository);

    const output = await aService.list();

    reply.status(200).send(output);
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

    const aRepository = PostRepositoryPrisma.build(prisma);
    const aService = PostServiceImplementation.build(aRepository);

    const output = await aService.create(title, content, author);
    const data = {
      id: output.id,
      title: output.title,
      content: output.content,
      author: output.author,
    };

    reply.status(200).send(data);
  }

  public async editPost(
    request: FastifyRequest<{
      Params: { postId: string };
      Body: { title?: string; content?: string; author?: string };
    }>,
    reply: FastifyReply
  ) {
    const { author, content, title } = request.body;
    const { postId } = request.params;

    const aRepository = PostRepositoryPrisma.build(prisma);
    const aService = PostServiceImplementation.build(aRepository);

    const output = await aService.update(postId, title, content, author);

    const data = {
      id: output.id,
      title: output.title,
      content: output.content,
      author: output.author,
    }

    reply.status(200).send(data);
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
