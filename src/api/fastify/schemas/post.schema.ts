/**
 * Definições de Schema para a entidade Post.
 * Utilizado para documentação automática via Swagger/OpenAPI.
 */

const postProperties = {
  id: { type: "number" },
  title: { type: "string" },
  content: { type: "string" },
  author: { type: "string" },
};

export const listPostsSchema = {
  description: "Lista todos os posts",
  tags: ["Posts"],
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: postProperties,
      },
    },
  },
};

export const getPostSchema = {
  description: "Obtém um post pelo ID",
  tags: ["Posts"],
  params: {
    type: "object",
    properties: {
      postId: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: postProperties,
    },
    404: {
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
  },
};

export const createPostSchema = {
  description: "Cria um novo post",
  tags: ["Posts"],
  body: {
    type: "object",
    required: ["title", "content", "author"],
    properties: {
      title: { type: "string" },
      content: { type: "string" },
      author: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: postProperties,
    },
  },
};

export const editPostSchema = {
  description: "Edita um post existente",
  tags: ["Posts"],
  params: {
    type: "object",
    properties: {
      postId: { type: "string" },
    },
  },
  body: {
    type: "object",
    properties: {
      title: { type: "string" },
      content: { type: "string" },
      author: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: postProperties,
    },
  },
};

export const deletePostSchema = {
  description: "Exclui um post",
  tags: ["Posts"],
  params: {
    type: "object",
    properties: {
      postId: { type: "string" },
    },
  },
  response: {
    200: { type: "string" },
  },
};

export const searchPostSchema = {
  description: "Pesquisa posts por conteúdo ou título",
  tags: ["Posts"],
  querystring: {
    type: "object",
    properties: {
      find: { type: "string" },
    },
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: postProperties,
      },
    },
  },
};
