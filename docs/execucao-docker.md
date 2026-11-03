# Execução com Docker

## 1. Visão geral

O QuimiPort utiliza Docker e Docker Compose para facilitar a configuração e execução da aplicação em ambientes isolados.

A configuração foi organizada em dois serviços principais:

- **API:** container responsável pela execução da aplicação QuimiPort.
- **PostgreSQL:** container responsável pelo armazenamento e gerenciamento dos dados.

Essa abordagem permite executar a aplicação e o banco de dados de maneira integrada, reduzindo a necessidade de configurações manuais no ambiente de desenvolvimento.

## 2. Pré-requisitos

Antes de iniciar o projeto, é necessário possuir:

- Docker instalado;
- Docker Compose disponível;
- Repositório do QuimiPort clonado localmente.

O Docker Desktop pode ser utilizado em ambientes Windows, enquanto Docker Engine e Docker Compose também podem ser utilizados em ambientes Linux.

## 3. Configuração das variáveis de ambiente

Na raiz do projeto, crie um arquivo `.env` utilizando como referência o arquivo `.env.example`.

Configure as variáveis necessárias para a conexão com o PostgreSQL:

```env
NODE_ENV=production
PORT=3000

DATABASE_USER=admin
DATABASE_PASSWORD=sua_senha
DATABASE_HOST=localhost
DATABASE_NAME=admin
DATABASE_PORT=5432
```

Os valores apresentados são exemplos. Ajuste as configurações conforme necessário.

Durante a execução pelo Docker Compose, o serviço da API utiliza o nome `postgres` como endereço do banco de dados, permitindo a comunicação interna entre os containers.

O arquivo `.env` não deve ser versionado no repositório, pois contém informações de configuração e credenciais.

## 4. Construção e inicialização dos containers

Com o Docker em execução e o arquivo `.env` configurado, abra o terminal na raiz do projeto e execute:

```bash
docker compose up --build -d
```

Esse comando realiza as seguintes operações:

- Constrói a imagem da API utilizando o Dockerfile;
- Obtém a imagem do PostgreSQL, caso necessário;
- Cria os containers dos serviços;
- Configura a comunicação entre os containers;
- Inicializa o banco de dados;
- Disponibiliza a estrutura inicial do banco por meio da migration;
- Inicia a API após a verificação de saúde do PostgreSQL.

A opção `--build` solicita a construção da imagem da API, enquanto `-d` executa os containers em segundo plano.

## 5. Verificar os containers

Para verificar se os serviços foram inicializados corretamente, execute:

```bash
docker compose ps
```

O resultado deverá apresentar os dois serviços:

- `quimiport-api`: container da aplicação;
- `quimiport-postgres`: container do banco de dados.

O PostgreSQL possui um healthcheck baseado no comando `pg_isready`, utilizado para verificar sua disponibilidade.

A API depende da condição de saúde do banco para iniciar, reduzindo problemas de conexão durante a inicialização dos serviços.

## 6. Consultar os logs

Para visualizar os logs dos serviços, utilize:

```bash
docker compose logs
```

Para acompanhar os logs em tempo real:

```bash
docker compose logs -f
```

Também é possível consultar os logs de um serviço específico:

```bash
docker compose logs -f api
```

```bash
docker compose logs -f postgres
```

Esses comandos auxiliam na identificação de problemas durante a inicialização e execução da aplicação.

## 7. Acessar a aplicação

Após a inicialização dos containers, a API estará disponível no endereço:

```text
http://localhost:3000
```

A documentação interativa dos endpoints pode ser acessada pelo Swagger:

```text
http://localhost:3000/docs
```

Por meio dessa interface, é possível consultar os endpoints disponíveis e executar requisições para testar as funcionalidades do QuimiPort.

## 8. Acessar o banco de dados

O PostgreSQL pode ser acessado diretamente pelo terminal utilizando:

```bash
docker exec -it quimiport-postgres psql -U admin -d admin
```

Para listar as tabelas existentes:

```sql
\dt
```

A configuração do Docker Compose disponibiliza a porta `5433` no ambiente local, direcionando as conexões para a porta `5432` do container PostgreSQL.

Dessa forma, ferramentas externas de gerenciamento de banco de dados podem utilizar:

- Host: `localhost`;
- Porta: `5433`;
- Banco de dados: valor configurado em `DATABASE_NAME`;
- Usuário: valor configurado em `DATABASE_USER`;
- Senha: valor configurado em `DATABASE_PASSWORD`.

## 9. Persistência dos dados

O PostgreSQL utiliza um volume Docker chamado `postgres_data` para armazenar os dados do banco.

Esse volume permite preservar as informações mesmo quando os containers são interrompidos ou removidos.

A migration inicial, localizada em:

```text
src/adapters/out/database/migrations/001_create_tables.sql
```

é disponibilizada no diretório `/docker-entrypoint-initdb.d/` do container PostgreSQL.

Os scripts desse diretório são executados durante a inicialização de um banco de dados com diretório de dados vazio.

**Importante:** caso o volume já contenha um banco inicializado, os scripts de inicialização não serão executados novamente. Portanto, alterações posteriores na estrutura do banco exigem um procedimento específico de atualização.

## 10. Encerrar os containers

Para interromper e remover os containers criados pelo Docker Compose, execute:

```bash
docker compose down
```

Esse comando remove os containers e a rede criada pelo Compose, mas preserva o volume persistente do PostgreSQL.

**Atenção:** evite utilizar `docker compose down -v` sem necessidade, pois essa opção também remove os volumes associados e pode ocasionar a perda dos dados armazenados.

## 11. Resumo dos principais comandos

| Comando | Descrição |
|---|---|
| `docker compose up --build -d` | Constrói as imagens e inicia os serviços. |
| `docker compose ps` | Verifica o estado dos containers. |
| `docker compose logs` | Consulta os logs dos serviços. |
| `docker compose logs -f` | Acompanha os logs em tempo real. |
| `docker compose down` | Interrompe e remove os containers. |
| `docker exec -it quimiport-postgres psql -U admin -d admin` | Acessa o PostgreSQL pelo terminal. |

## 12. Considerações finais

A utilização do Docker Compose permite executar a API QuimiPort e o PostgreSQL de maneira integrada e padronizada.

A separação dos serviços em containers, associada ao uso de volumes persistentes e healthchecks, facilita a configuração do ambiente e contribui para a consistência da execução da aplicação.