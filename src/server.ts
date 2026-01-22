import Fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { routes } from "@/routes.js";
import {
  swaggerConfig,
  swaggerUiConfig,
} from "@/api/fastify/swagger/swagger.config.js";

const port = 3030;
const app = Fastify({ logger: true });
const start = async () => {
  try {
    await app.register(cors);

    await app.register(swagger, swaggerConfig);
    await app.register(swaggerUi, swaggerUiConfig);

    await app.register(routes);

    await app.listen({ port });
  } catch (error) {
    process.exit(1);
  }
};

start();
