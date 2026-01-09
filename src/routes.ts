import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { PostController } from "./api/fastify/controllers/post.controller.ts";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  const postController = PostController.build();

  fastify.get("/posts", postController.getAllPosts);

  fastify.get("/posts/:postId", postController.getPost);

  fastify.post("/posts", postController.createPost);

  fastify.put("/posts/:postId", postController.editPost);

  fastify.delete("/posts/:postId", postController.deletePost);

  fastify.get("/posts/search", postController.findPost);
}
