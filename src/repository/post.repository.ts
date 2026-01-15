import { Post } from "../entities/post.ts";
import { CreateOutputDTO, ListOutputDTO } from "../services/post/post.service.ts";

export interface PostRepository {
  save(post: Post): Promise<CreateOutputDTO>;
  list(): Promise<ListOutputDTO>;
}

