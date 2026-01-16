import { Post } from "../../entities/post.ts";
import { IPost } from "../../entities/post.types.ts";
import { PostRepository } from "../../repository/post.repository.ts";
import {
  CreateOutputDTO,
  FindOutputDTO,
  ListOutputDTO,
  PostService,
  SearchOutputDTO,
  UpdateOutputDTO,
} from "./post.service.ts";

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

  public async update(
    id: string,
    title?: string,
    content?: string,
    author?: string
  ): Promise<UpdateOutputDTO> {
    const post = { id: Number(id), title, content, author };

    const output = await this.repository.update(post);

    return output;
  }

  public async find(id: string): Promise<FindOutputDTO> {
    const postId = Number(id);

    const output = await this.repository.find(postId);

    return output;
  }

  public async delete(id: string): Promise<void> {
    const postId = Number(id);

    await this.repository.delete(postId);
  }

  public async search(query: string): Promise<SearchOutputDTO> {
    const output = await this.repository.search(query);

    return output
  }
}
