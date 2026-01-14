import { Post } from "../../entities/post.ts";
import { PostRepository } from "../../repository/post.repository.ts";
import { CreateOutputDTO, ListOutputDTO, PostService } from "./post.service.ts";

export class PostServiceImplementation implements PostService {
  private constructor(readonly repository: PostRepository) {}

  public static build(repository: PostRepository) {
    return new PostServiceImplementation(repository);
  }

  public async create(
    title: string,
    content: string,
    author: string
  ): Promise<CreateOutputDTO> {
    const aPost = Post.create(title, content, author);
    await this.repository.save(aPost);

    const output: CreateOutputDTO = {
      title,
      content,
      author,
    };

    return output;
  }

  public async list(): Promise<ListOutputDTO> {
    const aPost = await this.repository.list();
    const posts = aPost.map((p) => ({
      title: p.title,
      content: p.content,
      author: p.author,
    }));

    const output: ListOutputDTO = {
      posts,
    };

    return output;
  }
}
