import { PrismaClient } from "@prisma/client/extension";
import { PostRepository } from "../post.repository.ts";
import { Post } from "../../entities/post.ts";

export class PostRepositoryPrisma implements PostRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new PostRepositoryPrisma(prisma);
  }

  public async save(post: Post): Promise<void> {
    const data = {
      title: post.title,
      content: post.content,
      author: post.author,
    };

    await this.prisma.post.create({ data });
  }

  public async update(post: Post): Promise<void> {
    const data = {
      title: post.title,
      content: post.content,
      author: post.author,
    };

    await this.prisma.post.update({
      where: {
        id: 1, //raphael - fix
      },
      data,
    });
  }

  public async list():Promise<Post[]>{
    return null //raphael - fix
  }

  public async find(id: string): Promise<Post | null> {
    const aPost = await this.prisma.post.findUnique({ where: { id } });
    
    if(!aPost) return null

    return aPost //raphael - fix
  }
}
