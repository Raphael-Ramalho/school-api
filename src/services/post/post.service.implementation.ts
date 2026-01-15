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

    const output = await this.repository.save(aPost);

    return output;
  }

  public async list(): Promise<ListOutputDTO> {
    const aPost = await this.repository.list();

    const output: ListOutputDTO = aPost.map((p) => ({
      id: p.id,
      title: p.title,
      content: p.content,
      author: p.author,
    }));

    return output;
  }
}
