# Execução Local do Projeto

Este documento apresenta as instruções necessárias para configurar e executar o QuimiPort em ambiente local, sem a utilização de containers Docker.

## 1. Pré-requisitos

Antes de iniciar a aplicação, é necessário possuir as seguintes ferramentas instaladas:

- **Node.js:** ambiente de execução JavaScript.
- **npm:** gerenciador de pacotes do Node.js.
- **PostgreSQL:** sistema gerenciador de banco de dados utilizado pela aplicação.
- **Git:** ferramenta para versionamento e obtenção do código-fonte.

Também é necessário ter acesso ao repositório do projeto.

## 2. Obter o projeto

Primeiramente, clone o repositório Git:

```bash
git clone https://github.com/AndreLM1/QuimiPort-API.git
```

Entre no diretório do projeto:

```bash
cd QuimiPort-API
```

## 3. Instalar as dependências

Com o projeto aberto no terminal, execute:

```bash
npm install
```

Esse comando instala as dependências necessárias para executar e desenvolver a aplicação, conforme as configurações definidas no arquivo `package.json`.

## 4. Configurar as variáveis de ambiente

O projeto utiliza variáveis de ambiente para configurar a conexão com o banco de dados.

Crie um arquivo `.env` na raiz do projeto e configure as seguintes variáveis:

```env
NODE_ENV=development
PORT=3000

DATABASE_USER=admin
DATABASE_PASSWORD=sua_senha
DATABASE_HOST=localhost
DATABASE_NAME=admin
DATABASE_PORT=5432
```

**Importante:** os valores apresentados são exemplos. Ajuste as configurações de acordo com o usuário, a senha, o endereço e o banco de dados existentes no seu ambiente PostgreSQL.

O arquivo `.env` contém informações de configuração e credenciais, portanto não deve ser enviado ao repositório Git.

## 5. Preparar o banco de dados

Antes de executar a aplicação, é necessário garantir que o PostgreSQL esteja em execução e que o banco de dados configurado nas variáveis de ambiente exista.

A estrutura inicial do banco de dados está definida no seguinte arquivo SQL:

```text
src/adapters/out/database/migrations/001_create_tables.sql
```

Execute esse script no banco de dados configurado para criar as tabelas e demais estruturas necessárias à aplicação.

Exemplo utilizando o terminal:

```bash
psql -U admin -d admin -f src/adapters/out/database/migrations/001_create_tables.sql
```

Caso utilize outro usuário ou nome de banco de dados, ajuste os parâmetros do comando.

**Observação:** execute a migration somente quando estiver preparando um banco de dados que ainda não possui a estrutura do projeto. Evite executar novamente scripts de criação sobre um banco já inicializado.

## 6. Executar a aplicação

Após instalar as dependências, configurar as variáveis de ambiente e preparar o banco de dados, a aplicação poderá ser iniciada.

Para executar em ambiente de desenvolvimento, utilize:

```bash
npm run dev
```

Esse comando inicia a aplicação utilizando o `tsx` em modo de desenvolvimento, permitindo acompanhar as alterações realizadas no código.

Quando o servidor estiver iniciado, a API estará disponível no endereço:

```text
http://localhost:3000
```

## 7. Acessar a documentação da API

A documentação interativa da API é disponibilizada por meio do Swagger.

Com a aplicação em execução, acesse:

```text
http://localhost:3000/docs
```

Por meio dessa interface, é possível consultar os endpoints disponíveis, visualizar os parâmetros e executar requisições para testar as funcionalidades do QuimiPort.

## 8. Executar os testes automatizados

O projeto utiliza Jest para executar os testes automatizados.

Para executar a suíte de testes, utilize:

```bash
npm test
```

Os testes verificam o comportamento dos casos de uso e as regras de negócio implementadas no domínio, contribuindo para a validação das funcionalidades da aplicação.

## 9. Compilar e executar a versão de produção

Para gerar a versão compilada do projeto, execute:

```bash
npm run build
```

Após a compilação, a aplicação poderá ser iniciada utilizando:

```bash
npm start
```

Esse comando executa a aplicação a partir dos arquivos JavaScript gerados no diretório `dist`.

## 10. Resumo dos comandos

| Comando | Descrição |
|---|---|
| `npm install` | Instala as dependências do projeto. |
| `npm run dev` | Inicia a aplicação em desenvolvimento. |
| `npm test` | Executa os testes automatizados. |
| `npm run build` | Compila o projeto TypeScript. |
| `npm start` | Inicia a versão compilada da aplicação. |

