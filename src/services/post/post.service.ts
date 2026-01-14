export type CreateOutputDTO = {
  title: string;
  content: string;
  author: string;
};

export type ListOutputDTO = {
  posts: {
    title: string;
    content: string;
    author: string;
  }[];
};

export interface PostService {
  create(
    title: string,
    content: string,
    author: string
  ): Promise<CreateOutputDTO>;

  list(): Promise<ListOutputDTO>
}
