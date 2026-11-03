
# Arquitetura de Software

## Arquitetura Adotada

O QuimiPort foi desenvolvido utilizando a **Arquitetura Hexagonal (Ports and Adapters)**, associada aos princípios de Domain-Driven Design (DDD).

A escolha dessa arquitetura tem como objetivo isolar o núcleo da aplicação, especialmente o domínio e suas regras de negócio, dos agentes externos e dos detalhes tecnológicos de infraestrutura.

A comunicação entre o núcleo da aplicação e os agentes externos ocorre por meio de **Ports and Adapters**, permitindo que as dependências sejam direcionadas para abstrações, reduzindo o acoplamento entre as camadas.

## Estrutura da Arquitetura Hexagonal

A arquitetura está organizada em três áreas principais:

- **Domain:** concentra as entidades, objetos de valor e regras de negócio.
- **Application:** coordena os casos de uso e as operações da aplicação.
- **Adapters:** realizam a comunicação entre o núcleo da aplicação e os agentes externos.
- **Main:** realiza a configuração e a composição dos componentes necessários para executar a aplicação.

### Fluxo de comunicação

```text
              AGENTE EXTERNO
                Front-end Web
                     |
                     | HTTP/HTTPS
                     v
             INPUT ADAPTER
             Controllers / Routes
                     |
                     v
                 INPUT PORT
                     |
                     v
                APPLICATION
                  Use Cases
                     |
                     v
                  DOMAIN
              Entidades
              Value Objects
              Regras de Negócio
                     |
                     v
                 OUTPUT PORT
                     |
                     v
                OUTPUT ADAPTER
                 Repository
                     |
                     v
                PostgreSQL
              AGENTE EXTERNO
```

### Organização das responsabilidades

**Domain**

Responsável por representar o domínio do negócio e proteger suas regras e invariantes.

**Application**

Responsável por coordenar os casos de uso, controlar o fluxo das operações e utilizar os contratos definidos pelas portas de saída.

**Input Adapters**

Responsáveis por receber as requisições externas, interpretar os dados de entrada e encaminhá-los aos casos de uso.

**Output Adapters**

Responsáveis por implementar os contratos definidos pelas portas de saída, realizando operações de persistência e comunicação com agentes externos.

## Justificativa da Arquitetura

### Inversão de Dependência

O núcleo da aplicação não depende diretamente das implementações concretas dos agentes externos.

A comunicação ocorre por meio de contratos definidos pelas portas (Ports), enquanto os adaptadores (Adapters) implementam esses contratos.

Dessa forma, a Application depende de abstrações, e não de detalhes específicos de infraestrutura.

### Baixo Acoplamento

A utilização de Ports and Adapters reduz o acoplamento entre o núcleo da aplicação e os agentes externos.

O domínio e os casos de uso não precisam conhecer detalhes de implementação relacionados a:

- Banco de dados;
- Framework HTTP;
- Interfaces externas;
- APIs de terceiros;
- Tecnologias específicas de infraestrutura.

Isso permite substituir ou modificar implementações externas com menor impacto nas regras de negócio.

### Facilidade de Manutenção e Evolução

A separação entre o núcleo e os agentes externos facilita a manutenção e a evolução da aplicação.

Por exemplo, uma eventual substituição do PostgreSQL por outro sistema gerenciador de banco de dados poderá ser realizada por meio da implementação de um novo adaptador de saída, preservando os contratos definidos pelas portas.

### Proteção do Domínio

O domínio representa o núcleo da aplicação.

Suas regras de negócio devem permanecer independentes dos detalhes tecnológicos, garantindo que as decisões e os comportamentos do negócio não sejam condicionados pelo framework, banco de dados ou mecanismos de comunicação externa.

## Regras de Negócio e Separação de Responsabilidades

As regras de negócio do QuimiPort são concentradas principalmente na camada Domain.

A responsabilidade pela proteção dessas regras é atribuída aos elementos do próprio domínio, especialmente:

- Entidades;
- Value Objects;
- Agregados, quando aplicável;
- Serviços de domínio, quando necessários.

A camada Application é responsável por coordenar os casos de uso, mas não deve assumir as regras de negócio que pertencem ao Domain.

Dessa forma, a separação de responsabilidades ocorre da seguinte maneira:

```text
APPLICATION
    |
    | Coordena os casos de uso
    | Consulta e persiste informações
    | Controla o fluxo das operações
    v
DOMAIN
    |
    | Executa comportamentos de negócio
    | Protege regras de negócio
    | Mantém invariantes
    v
RESULTADO DA OPERAÇÃO
```

Essa separação permite que as regras de negócio permaneçam independentes dos detalhes tecnológicos da aplicação, facilitando a manutenção, os testes e a evolução do QuimiPort.
