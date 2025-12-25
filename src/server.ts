import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes.ts";

const port = 3030;
const app = Fastify({ logger: true });
const start = async () => {
  await app.register(cors);
  await app.register(routes);
  try {
    await app.listen({ port });
  } catch (error) {
    process.exit(1);
  }
};

start();
