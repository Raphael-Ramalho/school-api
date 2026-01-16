import { PrismaClient } from "@prisma/client/extension";
import { PostRepository } from "../post.repository.ts";
import { Post } from "../../entities/post.ts";
import {
  CreateOutputDTO,
  ListOutputDTO,
  UpdateOutputDTO,
  FindOutputDTO,
  SearchOutputDTO,
} from "../../services/post/post.service.ts";
import { IPost } from "../../entities/post.types.ts";

export class PostRepositoryPrisma implements PostRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new PostRepositoryPrisma(prisma);
  }

  public async save(post: Post): Promise<CreateOutputDTO> {
    const data = {
      title: post.title,
      content: post.content,
      author: post.author,
    };

    const output: CreateOutputDTO = await this.prisma.post.create({
      data,
    });

    return output;
  }

  public async update(
    postInfo: Partial<Omit<IPost, "id">> & Pick<IPost, "id">
  ): Promise<UpdateOutputDTO> {
    const data = {
      title: postInfo.title,
      content: postInfo.content,
      author: postInfo.author,
    };

    const output = await this.prisma.post.update({
      where: {
        id: postInfo.id,
      },
      data,
    });

    return output;
  }

  public async list(): Promise<ListOutputDTO> {
    const aList = await this.prisma.post.findMany();

    return aList;
  }

  public async find(id: number): Promise<FindOutputDTO> {
    const aPost = await this.prisma.post.findUnique({ where: { id } });

    if (!aPost) return null;

    return aPost;
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.post.delete({ where: { id } });
  }

  public async search(query: string): Promise<SearchOutputDTO> {
    const aPost = await this.prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
            },
          },
          {
            content: {
              contains: query,
            },
          },
        ],
      },
    });

    if (!aPost) return null;

    return aPost;
  }
}
