import { describe, it, expect } from "vitest";
import { Post } from "./post.ts";

describe("Post Entity", () => {
  describe("create", () => {
    it("should create a new Post instance with provided data", () => {
      const title = "Test Post Title";
      const content = "This is test content for the post";
      const author = "John Doe";

      const post = Post.create(title, content, author);

      expect(post).toBeInstanceOf(Post);
      expect(post.title).toBe(title);
      expect(post.content).toBe(content);
      expect(post.author).toBe(author);
    });

    it("should create Post without id initially", () => {
      const post = Post.create("Title", "Content", "Author");

      expect(post.id).toBeUndefined();
    });
  });

  describe("getters", () => {
    it("should return correct title", () => {
      const title = "My Title";
      const post = Post.create(title, "Content", "Author");

      expect(post.title).toBe(title);
    });

    it("should return correct content", () => {
      const content = "My Content";
      const post = Post.create("Title", content, "Author");

      expect(post.content).toBe(content);
    });

    it("should return correct author", () => {
      const author = "Jane Doe";
      const post = Post.create("Title", "Content", author);

      expect(post.author).toBe(author);
    });
  });
});
