# 🏫 School-api

Servidor para gerenciamento e persistência de posts escolares

## 🛠️ Arquitetura:

Sistema node construido com a arquitetura MVC e as seguintes tecnologias:
<li>Fastify -> Gerenciamento de rotas
<li>PostgreSQL -> Banco de dados relacional SQL
<li>Prisma -> Interação com banco de dados
<li>Vitest -> Criação de testes unitários

## 📋 Etapas para execução do projeto:

### Setup inicial:

<li> Certifique-se de ter feito as seguintes instalações:
    <ul>
        <li>node v20.19.6</li>
        <li>docker</li>
    </ul>

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
