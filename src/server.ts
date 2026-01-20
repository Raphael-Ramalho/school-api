import Fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { routes } from "./routes.ts";

const port = 3030;
const app = Fastify({ logger: true });
const start = async () => {
  await app.register(cors);

  await app.register(swagger, {
    openapi: {
      info: {
        title: "School API",
        description: "API para gerenciamento de posts escolares",
        version: "1.0.0",
      },
    },
  });

  await app.register(swaggerUi, {
    routePrefix: "/documentation",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
  });

  await app.register(routes);
  try {
    await app.listen({ port });
  } catch (error) {
    process.exit(1);
  }
};

start();
