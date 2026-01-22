import { IPost } from "@/entities/post.types.js";

export class Post {
  private constructor(readonly props: Partial<IPost>) {}

  public static create(title: string, content: string, author: string) {
    return new Post({ title, content, author });
  }

  public get id() {
    return this.props.id;
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
