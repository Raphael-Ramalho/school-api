import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { PostController } from "./api/fastify/controllers/post.controller.ts";

export async function routes(fastify: FastifyInstance) {
  const postController = PostController.build();

  fastify.get("/posts", postController.getAllPosts.bind(postController));

  fastify.get("/posts/:postId", postController.getPost.bind(postController));

  fastify.post("/posts", postController.createPost.bind(postController));

  fastify.put("/posts/:postId", postController.editPost.bind(postController));

  fastify.delete(
    "/posts/:postId",
    postController.deletePost.bind(postController)
  );

  fastify.get("/posts/search", postController.findPost.bind(postController));
}
