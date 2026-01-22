import { FastifyReply, FastifyRequest } from "fastify";
import { PostRepositoryPrisma } from "@/repository/prisma/post.repository.prisma.js";
import { prisma } from "@/util/prisma.util.js";
import { PostServiceImplementation } from "@/services/post/post.service.implementation.js";

export class PostController {
  public constructor(private readonly postService: PostServiceImplementation) {}

  public static build() {
    const aRepository = PostRepositoryPrisma.build(prisma);
    const aService = PostServiceImplementation.build(aRepository);

    return new PostController(aService);
  }

  public async getAllPosts(_request: FastifyRequest, reply: FastifyReply) {
    const output = await this.postService.list();

    reply.status(200).send(output);
  }

  public async getPost(
    request: FastifyRequest<{ Params: { postId: string } }>,
    reply: FastifyReply,
  ) {
    const { postId } = request.params;

    const output = await this.postService.find(postId);

    if (!output) {
      reply.status(404).send({ error: "post not found" });
    } else {
      reply.status(200).send(output);
    }
  }

  public async createPost(
    request: FastifyRequest<{
      Body: { title: string; content: string; author: string };
    }>,
    reply: FastifyReply,
  ) {
    const { author, content, title } = request.body;

    const output = await this.postService.create(title, content, author);
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
    reply: FastifyReply,
  ) {
    const { author, content, title } = request.body;
    const { postId } = request.params;

    const output = await this.postService.update(
      postId,
      title,
      content,
      author,
    );

    const data = {
      id: output.id,
      title: output.title,
      content: output.content,
      author: output.author,
    };

    reply.status(200).send(data);
  }

  public async deletePost(
    request: FastifyRequest<{ Params: { postId: string } }>,
    reply: FastifyReply,
  ) {
    const { postId } = request.params;

    await this.postService.delete(postId);

    reply.status(200).send(`deleted post with id: ${postId}`);
  }

  public async searchPost(
    request: FastifyRequest<{ Querystring: { find: string } }>,
    reply: FastifyReply,
  ) {
    const { find } = request.query;

    const output = await this.postService.search(find);

    const data = output.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.author,
    }));

    reply.status(200).send(data);
  }
}
