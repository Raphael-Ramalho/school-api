import { FastifyInstance } from "fastify";
import { PostController } from "@/api/fastify/controllers/post.controller.js";
import {
  createPostSchema,
  deletePostSchema,
  editPostSchema,
  getPostSchema,
  listPostsSchema,
  searchPostSchema,
} from "@/api/fastify/swagger/post.schema.js";

export async function routes(fastify: FastifyInstance) {
  const { redis } = fastify;
  const postController = PostController.build(redis);

  fastify.get(
    "/posts",
    { schema: listPostsSchema },
    postController.getAllPosts.bind(postController),
  );

  fastify.get(
    "/posts/:postId",
    { schema: getPostSchema },
    postController.getPost.bind(postController),
  );

  fastify.post(
    "/posts",
    { schema: createPostSchema },
    postController.createPost.bind(postController),
  );

  fastify.put(
    "/posts/:postId",
    { schema: editPostSchema },
    postController.editPost.bind(postController),
  );

  fastify.delete(
    "/posts/:postId",
    { schema: deletePostSchema },
    postController.deletePost.bind(postController),
  );

  fastify.get(
    "/posts/search",
    { schema: searchPostSchema },
    postController.searchPost.bind(postController),
  );
}
