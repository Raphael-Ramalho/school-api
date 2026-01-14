export type PostProps = {
  title: string;
  content: string;
  author: string;
};

export class Post {
  private constructor(readonly props: PostProps) {}

  public static create(title: string, content: string, author: string) {
    return new Post({ title, content, author });
  }

  public get title() {
    return this.props.title;
  }

  public get content() {
    return this.props.content;
  }

  public get author() {
    return this.props.author;
  }
}
