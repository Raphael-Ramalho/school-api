import { describe, it, expect, beforeEach, vi } from "vitest";
import { PostServiceImplementation } from "../../services/post/post.service.implementation.ts";
import { PostRepository } from "../../repository/post.repository.ts";
import { IPost } from "../../entities/post.types.ts";

describe("PostServiceImplementation", () => {
  let postService: PostServiceImplementation;
  let mockRepository: PostRepository;

  beforeEach(() => {
    mockRepository = {
      save: vi.fn(),
      list: vi.fn(),
      update: vi.fn(),
      find: vi.fn(),
      delete: vi.fn(),
      search: vi.fn(),
    };

    postService = PostServiceImplementation.build(mockRepository);
  });

  describe("create", () => {
    it("should create a post and return the output from repository", async () => {
      const title = "Test Title";
      const content = "Test Content";
      const author = "Test Author";
      const expectedOutput: IPost = {
        id: 1,
        title,
        content,
        author,
      };

      vi.spyOn(mockRepository, "save").mockResolvedValue(expectedOutput);

      const result = await postService.create(title, content, author);

      expect(mockRepository.save).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          title,
          content,
          author,
        })
      );
      expect(result).toEqual(expectedOutput);
    });
  });

  describe("list", () => {
    it("should return a list of posts with mapped properties", async () => {
      const mockPosts: IPost[] = [
        { id: 1, title: "Post 1", content: "Content 1", author: "Author 1" },
        { id: 2, title: "Post 2", content: "Content 2", author: "Author 2" },
      ];

      vi.spyOn(mockRepository, "list").mockResolvedValue(mockPosts);

      const result = await postService.list();

      expect(mockRepository.list).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockPosts);
      expect(result).toHaveLength(2);
    });

    it("should return empty array when no posts exist", async () => {
      vi.spyOn(mockRepository, "list").mockResolvedValue([]);

      const result = await postService.list();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe("update", () => {
    it("should update a post with provided data", async () => {
      const id = "1";
      const title = "Updated Title";
      const content = "Updated Content";
      const author = "Updated Author";
      const expectedOutput: IPost = {
        id: 1,
        title,
        content,
        author,
      };

      vi.spyOn(mockRepository, "update").mockResolvedValue(expectedOutput);

      const result = await postService.update(id, title, content, author);

      expect(mockRepository.update).toHaveBeenCalledTimes(1);
      expect(mockRepository.update).toHaveBeenCalledWith({
        id: 1,
        title,
        content,
        author,
      });
      expect(result).toEqual(expectedOutput);
    });

    it("should convert string id to number", async () => {
      const id = "42";
      const expectedOutput: IPost = {
        id: 42,
        title: "Title",
        content: "Content",
        author: "Author",
      };

      vi.spyOn(mockRepository, "update").mockResolvedValue(expectedOutput);

      await postService.update(id, "Title", "Content", "Author");

      expect(mockRepository.update).toHaveBeenCalledWith(
        expect.objectContaining({ id: 42 })
      );
    });
  });

  describe("find", () => {
    it("should find a post by id", async () => {
      const id = "1";
      const expectedOutput: IPost = {
        id: 1,
        title: "Found Post",
        content: "Found Content",
        author: "Found Author",
      };

      vi.spyOn(mockRepository, "find").mockResolvedValue(expectedOutput);

      const result = await postService.find(id);

      expect(mockRepository.find).toHaveBeenCalledTimes(1);
      expect(mockRepository.find).toHaveBeenCalledWith(1);
      expect(result).toEqual(expectedOutput);
    });

    it("should return null when post is not found", async () => {
      const id = "999";
      vi.spyOn(mockRepository, "find").mockResolvedValue(null);

      const result = await postService.find(id);

      expect(result).toBeNull();
    });

    it("should convert string id to number", async () => {
      const id = "123";
      vi.spyOn(mockRepository, "find").mockResolvedValue(null);

      await postService.find(id);

      expect(mockRepository.find).toHaveBeenCalledWith(123);
    });
  });

  describe("delete", () => {
    it("should delete a post by id", async () => {
      const id = "1";
      vi.spyOn(mockRepository, "delete").mockResolvedValue(undefined);

      await postService.delete(id);

      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it("should convert string id to number", async () => {
      const id = "456";
      vi.spyOn(mockRepository, "delete").mockResolvedValue(undefined);

      await postService.delete(id);

      expect(mockRepository.delete).toHaveBeenCalledWith(456);
    });
  });

  describe("search", () => {
    it("should search posts by query", async () => {
      const query = "test";
      const expectedOutput: IPost[] = [
        { id: 1, title: "Test Post", content: "Content", author: "Author" },
      ];

      vi.spyOn(mockRepository, "search").mockResolvedValue(expectedOutput);

      const result = await postService.search(query);

      expect(mockRepository.search).toHaveBeenCalledTimes(1);
      expect(mockRepository.search).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedOutput);
    });

    it("should return empty array when no posts match query", async () => {
      const query = "nonexistent";
      vi.spyOn(mockRepository, "search").mockResolvedValue([]);

      const result = await postService.search(query);

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });
});
