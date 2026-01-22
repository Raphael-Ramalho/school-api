import { IPost } from "@/entities/post.types.js";

export type CreateOutputDTO = IPost;

export type UpdateOutputDTO = IPost;

export type ListOutputDTO = IPost[];

export type FindOutputDTO = IPost | null;

export type SearchOutputDTO = IPost[] | null;

export interface PostService {
  create(
    title: string,
    content: string,
    author: string,
  ): Promise<CreateOutputDTO>;

  list(): Promise<ListOutputDTO>;

  update(
    id: string,
    title?: string,
    content?: string,
    author?: string,
  ): Promise<UpdateOutputDTO>;

  find(id: string): Promise<FindOutputDTO>;

  delete(id: string): Promise<void>;

  search(query: string): Promise<SearchOutputDTO>;
}
