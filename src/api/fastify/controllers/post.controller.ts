import { FastifyReply, FastifyRequest } from "fastify";
import { PostRepositoryPrisma } from "../../../repository/prisma/post.repository.prisma.ts";
import { prisma } from "../../../util/prisma.util.ts";
import { PostServiceImplementation } from "../../../services/post/post.service.implementation.ts";

export class PostController {
  public constructor(private readonly postService: PostServiceImplementation) {}

  public static build() {
    const aRepository = PostRepositoryPrisma.build(prisma);
    const aService = PostServiceImplementation.build(aRepository);

    return new PostController(aService);
  }

  /**
   * Lista todos os posts cadastrados no sistema.
   *
   * @param {FastifyRequest} _request - Objeto da requisição.
   * @param {FastifyReply} reply - Objeto da resposta.
   * @returns {Promise<void>}
   */
  public async getAllPosts(_request: FastifyRequest, reply: FastifyReply) {
    const output = await this.postService.list();

    reply.status(200).send(output);
  }

  /**
   * Busca um post específico pelo seu identificador único.
   *
   * @param {FastifyRequest<{ Params: { postId: string } }>} request - Objeto da requisição contendo o ID no parâmetro.
   * @param {FastifyReply} reply - Objeto da resposta.
   * @returns {Promise<void>}
   */
  public async getPost(
    request: FastifyRequest<{ Params: { postId: string } }>,
    reply: FastifyReply
  ) {
    const { postId } = request.params;

    const output = await this.postService.find(postId);

    if (!output) {
      reply.status(404).send({ error: "post not found" });
    } else {
      reply.status(200).send(output);
    }
  }

  /**
   * Cria um novo post no sistema.
   *
   * @param {FastifyRequest<{ Body: { title: string; content: string; author: string } }>} request - Objeto da requisição contendo os dados do post.
   * @param {FastifyReply} reply - Objeto da resposta.
   * @returns {Promise<void>}
   */
  public async createPost(
    request: FastifyRequest<{
      Body: { title: string; content: string; author: string };
    }>,
    reply: FastifyReply
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

  /**
   * Atualiza os dados de um post existente.
   *
   * @param {FastifyRequest<{ Params: { postId: string }; Body: { title?: string; content?: string; author?: string } }>} request - Objeto da requisição com o ID e novos dados.
   * @param {FastifyReply} reply - Objeto da resposta.
   * @returns {Promise<void>}
   */
  public async editPost(
    request: FastifyRequest<{
      Params: { postId: string };
      Body: { title?: string; content?: string; author?: string };
    }>,
    reply: FastifyReply
  ) {
    const { author, content, title } = request.body;
    const { postId } = request.params;

    const output = await this.postService.update(
      postId,
      title,
      content,
      author
    );

    const data = {
      id: output.id,
      title: output.title,
      content: output.content,
      author: output.author,
    };

    reply.status(200).send(data);
  }

  /**
   * Remove um post do sistema pelo seu identificador único.
   *
   * @param {FastifyRequest<{ Params: { postId: string } }>} request - Objeto da requisição contendo o ID no parâmetro.
   * @param {FastifyReply} reply - Objeto da resposta.
   * @returns {Promise<void>}
   */
  public async deletePost(
    request: FastifyRequest<{ Params: { postId: string } }>,
    reply: FastifyReply
  ) {
    const { postId } = request.params;

    await this.postService.delete(postId);

    reply.status(200).send(`deleted post with id: ${postId}`);
  }

  /**
   * Realiza uma busca textual nos posts (título ou conteúdo).
   *
   * @param {FastifyRequest<{ Querystring: { find: string } }>} request - Objeto da requisição contendo o termo de busca.
   * @param {FastifyReply} reply - Objeto da resposta.
   * @returns {Promise<void>}
   */
  public async searchPost(
    request: FastifyRequest<{ Querystring: { find: string } }>,
    reply: FastifyReply
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
