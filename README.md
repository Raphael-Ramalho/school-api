# 🏫 School-api

Servidor Node para gerenciamento de posts escolares

## 🛠️ Construido com:
<li>Node
<li>Fastify
<li>Prisma
<li>PostgreSQL
<li>Vitest
<li>Docker

## 📋 Etapas para execução do projeto: 

### Setup inicial:

<li> Certifique-se de ter feito as seguintes instalações:
- node v20.19.6
- docker

<li> Com o docker aberto, monte as imagens:

    docker compose up -d

<li> Instale as dependências do projeto:

    yarn install

<li> Rode as migrações:

    yarn run:migrations

### Execução:

<li> Execute o servidor:

    yarn start


### Visualizar rotas e suas especificações:

<li> Com o servidor rodando, acesse a rota:

    http://localhost:3030/swagger#/

