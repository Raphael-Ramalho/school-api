import { Post } from "../entities/post.ts";
import { IPost } from "../entities/post.types.ts";
import {
  CreateOutputDTO,
  ListOutputDTO,
  UpdateOutputDTO,
  FindOutputDTO,
  SearchOutputDTO,
} from "../services/post/post.service.ts";

export interface PostRepository {
  save(post: Post): Promise<CreateOutputDTO>;
  list(): Promise<ListOutputDTO>;
  update(
    postInfo: Partial<Omit<IPost, "id">> & Pick<IPost, "id">
  ): Promise<UpdateOutputDTO>;
  find(id: number): Promise<FindOutputDTO>;
  delete(id: number): Promise<void>;
  search(query: string): Promise<SearchOutputDTO>;
}
