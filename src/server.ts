import Fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { routes } from "./routes.ts";
import { swaggerConfig, swaggerUiConfig } from "./api/fastify/swagger/swagger.config.ts";

const port = 3030;
const app = Fastify({ logger: true });
const start = async () => {
  await app.register(cors);

  await app.register(swagger, swaggerConfig);
  await app.register(swaggerUi, swaggerUiConfig);

  await app.register(routes);
  try {
    await app.listen({ port });
  } catch (error) {
    process.exit(1);
  }
};

start();
