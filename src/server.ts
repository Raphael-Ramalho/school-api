import Fastify from "fastify";
/* import redis from "redis"; */
import "polyfill.js";
import cors from "@fastify/cors";
import fastifyRedis from "@fastify/redis";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { routes } from "@/routes.js";
import {
  swaggerConfig,
  swaggerUiConfig,
} from "@/api/fastify/swagger/swagger.config.js";

const serverPort = 3030;
const redisPort = 6379;

const app = Fastify({ logger: true });
const start = async () => {
  try {
    await app.register(cors);

    await app.register(swagger, swaggerConfig);
    await app.register(swaggerUi, swaggerUiConfig);

    await app.register(fastifyRedis, {
      port: redisPort,
    });

    await app.register(routes);

    await app.listen({ port: serverPort });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
