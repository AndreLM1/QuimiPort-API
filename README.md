
# QuimiPort-API

API REST para gerenciamento de produtos químicos e cargas químicas em ambiente portuário, desenvolvida como parte do **Tech Challenge – Fase 2**, da Pós-Tech em Full Stack Development da FIAP.

## Sobre o projeto

O QuimiPort busca centralizar o cadastro, a consulta e o gerenciamento de produtos e cargas químicas. A solução aplica regras de negócio ao ciclo de vida das cargas e mantém as informações persistidas em banco de dados, contribuindo para o controle e o acompanhamento das operações portuárias.


## Funcionalidades

- Cadastro, consulta, atualização e inativação de produtos químicos.
- Registro, consulta e atualização de cargas químicas.
- Gerenciamento das etapas da carga: análise, inspeção, liberação, bloqueio, movimentação, finalização e cancelamento.

## Tecnologias

- **Backend:** Node.js, TypeScript e Fastify.
- **Banco de dados:** PostgreSQL e node-postgres (`pg`).
- **Documentação da API:** Swagger / OpenAPI.
- **Testes:** Jest.
- **Containerização:** Docker e Docker Compose.

## Arquitetura

A aplicação utiliza **Arquitetura Hexagonal (Ports and Adapters)** em conjunto com princípios de **Domain-Driven Design (DDD)**, buscando separar as regras de negócio dos detalhes de infraestrutura.

- 📄 **[Conheça a arquitetura](docs/arquitetura.md)**

## Banco de dados

O projeto utiliza PostgreSQL como sistema gerenciador de banco de dados relacional.

Para conhecer a modelagem e a estrutura das tabelas:

- 📄 **[Consulte a estrutura do banco de dados](docs/banco-de-dados.md)**

## Execução Local

Configure as dependências, as variáveis de ambiente e o PostgreSQL para executar a aplicação localmente.

- 📄 **[Guia de Execução Local](docs/execucao-local.md)**

## Execução com Docker

Utilize o Docker Compose para executar a API e o banco de dados PostgreSQL em containers.

- 📄 **[Guia de Execução com Docker](docs/execucao-docker.md)**

## Testes Automatizados

O projeto utiliza Jest para validar as regras de negócio, os casos de uso e o tratamento de erros.

- 📄 **[Documentação de Testes](docs/testes.md)**


## Como acessar a documentação da API

A API possui documentação interativa disponibilizada pelo Swagger (OpenAPI), permitindo consultar os endpoints, visualizar os parâmetros e exemplos de requisições e testar as operações.

Com a aplicação em execução, acesse:

`http://localhost:3000/docs`

## Principais Endpoints

A API disponibiliza endpoints para o gerenciamento de produtos químicos e cargas químicas.

### Produtos Químicos

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/produtos-quimicos` | Cadastrar produto |
| GET | `/produtos-quimicos` | Listar produtos |
| GET | `/produtos-quimicos/:id` | Buscar produto por ID |
| PUT | `/produtos-quimicos/:id` | Atualizar produto |
| PATCH | `/produtos-quimicos/:id/inativar` | Inativar produto |

### Cargas Químicas

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/cargas-quimicas` | Cadastrar carga química |
| GET | `/cargas-quimicas` | Listar cargas |
| GET | `/cargas-quimicas/:id` | Buscar carga por ID |
| PUT | `/cargas-quimicas/:id` | Atualizar carga |
| PATCH | `/cargas-quimicas/:id/analisar` | Analisar carga |
| PATCH | `/cargas-quimicas/:id/inspecionar` | Inspecionar carga |
| PATCH | `/cargas-quimicas/:id/liberar` | Liberar carga |
| PATCH | `/cargas-quimicas/:id/bloquear` | Bloquear carga |
| PATCH | `/cargas-quimicas/:id/movimentar` | Movimentar carga |
| PATCH | `/cargas-quimicas/:id/finalizar` | Finalizar carga |
| PATCH | `/cargas-quimicas/:id/cancelar` | Cancelar carga |


## Documentação complementar

- 📄[Estrutura de Pastas](docs/estrutura-pastas.md)


## Integrantes

- André Lourenço Marques