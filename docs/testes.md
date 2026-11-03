# Testes Automatizados

## 1. Visão geral

O QuimiPort utiliza testes automatizados para verificar o comportamento da aplicação e garantir que as principais regras de negócio sejam respeitadas.

A implementação dos testes utiliza **Jest** como framework de testes, permitindo executar cenários automatizados e verificar os resultados esperados das operações.

Os testes foram desenvolvidos principalmente para validar os casos de uso da aplicação e as regras protegidas pelas entidades do domínio.

## 2. Tecnologias utilizadas

As principais ferramentas utilizadas na implementação dos testes são:

- **Jest:** framework responsável pela execução dos testes automatizados.
- **TypeScript:** linguagem utilizada no desenvolvimento da aplicação e dos testes.
- **Mocks:** utilizados para simular dependências externas, como os repositórios, permitindo testar os casos de uso de maneira isolada.

## 3. Organização dos testes

Os testes estão organizados de acordo com os componentes e comportamentos que precisam ser verificados.

A estrutura contempla testes para:

- **Domain:** valida as regras de negócio e o comportamento das entidades.
- **Application:** valida a execução dos casos de uso, incluindo cenários de sucesso e situações em que uma operação deve ser rejeitada.
- **Tratamento de erros:** verifica se as exceções são convertidas nas respostas adequadas da aplicação.

Essa organização facilita a identificação dos cenários testados e permite manter os testes próximos aos componentes que estão sendo validados.

## 4. Tipos de cenários testados

Os testes contemplam cenários positivos e negativos.

### 4.1. Cenários de sucesso

Verificam se uma operação é executada corretamente quando todas as condições necessárias são atendidas.

Exemplos:

- Cadastro de produto químico;
- Registro de carga química;
- Consulta de informações;
- Atualização de dados;
- Execução das transições permitidas de status;
- Cancelamento de carga química em situações permitidas.

### 4.2. Cenários de validação e rejeição

Verificam se a aplicação impede operações que violam as regras de negócio.

Exemplos:

- Cadastro de produto químico sem nome;
- Cadastro de produto químico sem classe de risco;
- Registro de carga com produto químico inexistente;
- Registro de carga associada a produto inativo;
- Registro de carga com quantidade menor ou igual a zero;
- Liberação de carga sem documentação obrigatória;
- Tentativa de executar uma transição de status não permitida;
- Tentativa de cancelar uma carga finalizada.

### 4.3. Transições de status da carga

Também são realizados testes específicos para verificar o ciclo de vida da carga química.

São validadas as operações de:

- Analisar;
- Inspecionar;
- Liberar;
- Bloquear;
- Movimentar;
- Finalizar;
- Cancelar.

Esses testes verificam tanto as transições permitidas quanto as situações em que a operação deve ser rejeitada.

## 5. Utilização de Mocks

Nos testes dos casos de uso, são utilizados mocks para simular o comportamento dos repositórios.

Essa abordagem permite testar a lógica da aplicação sem depender diretamente de uma conexão com o PostgreSQL.

Os mocks possibilitam controlar os resultados das operações de persistência, simulando situações como:

- Retorno de um registro encontrado;
- Retorno de um registro inexistente;
- Persistência realizada com sucesso;
- Falhas ou condições que impedem a execução de uma operação.

Dessa forma, os testes conseguem verificar o comportamento dos casos de uso de maneira isolada e previsível.

## 6. Executar os testes

Antes de executar os testes, certifique-se de que as dependências do projeto estejam instaladas.

Na raiz do projeto, execute:

```bash
npm install
```

Para executar toda a suíte de testes, utilize:

```bash
npm test
```

Esse comando executa o script configurado no `package.json`, iniciando o Jest e apresentando os resultados dos testes no terminal.

## 7. Considerações finais

Os testes automatizados contribuem para a confiabilidade do QuimiPort, permitindo verificar se as funcionalidades e regras de negócio continuam funcionando conforme esperado.

A utilização de testes unitários com mocks permite validar os casos de uso de forma isolada, enquanto os testes das entidades verificam a proteção das regras fundamentais do domínio.

Essa organização facilita a manutenção da aplicação e oferece maior segurança durante a implementação de novas funcionalidades e alterações no código.