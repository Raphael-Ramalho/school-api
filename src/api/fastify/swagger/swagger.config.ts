import { SwaggerOptions } from "@fastify/swagger";
import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";
import { FastifyRegisterOptions } from "fastify";

export const swaggerConfig: FastifyRegisterOptions<SwaggerOptions> = {
  openapi: {
    info: {
      title: "School API",
      description: "API para gerenciamento de posts escolares",
      version: "1.0.0",
    },
  },
};

export const swaggerUiConfig: FastifyRegisterOptions<FastifySwaggerUiOptions> =
  {
    routePrefix: "/swagger",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
  };
