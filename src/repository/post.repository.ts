import { Post } from "../entities/post.ts";

export interface PostRepository {
  save(post: Post): Promise<void>;
  list(): Promise<Post[]>;
}

