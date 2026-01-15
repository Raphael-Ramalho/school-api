import { IPost } from "../../entities/post.types.ts";

export type CreateOutputDTO = {
  id: number;
  title: string;
  content: string;
  author: string;
};

export type UpdateOutputDTO = {
  id: number;
  title: string;
  content: string;
  author: string;
};

export type ListOutputDTO = {
  id: number;
  title: string;
  content: string;
  author: string;
}[];

export interface PostService {
  create(
    title: string,
    content: string,
    author: string
  ): Promise<CreateOutputDTO>;

  list(): Promise<ListOutputDTO>;

  update(
    id: string,
    title?: string,
    content?: string,
    author?: string
  ): Promise<UpdateOutputDTO>;
}
