export type CreateOutputDTO = {
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
}
