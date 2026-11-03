### Estrutura da Aplicação

```text
QuimiPort/
├── docs/
│   ├── arquitetura.md
│   ├── banco-de-dados.md
│   ├── estrutura-pastas.md
│   ├── execucao-docker.md
│   ├── execucao-local.md
│   └── testes.md
│  
├── src/
│   ├── adapters/
│   │   ├── in/
│   │   │   └── http/
│   │   │       ├── controller/
│   │   │       │   ├── carga-quimica.controller.ts
│   │   │       │   └── produto-quimica.controller.ts
│   │   │       ├── routes/
│   │   │       │    ├── carga-quimica.routes.ts
│   │   │       │    └── produto-quimica.routes.ts
│   │   │       ├── error-handler.test.ts
│   │   │       └── error-handler.ts
│   │   ├── out/
│   │   │   └── database/
│   │   │       ├── migrations/
│   │   │       │   └── 001_create_tables.sql
│   │   │       │   
│   │   │       ├── postgres/
│   │   │       │    ├── database.ts
│   │   │       │    └── teste-connection.ts
│   │   │       │
│   │   │       └── repositories/
│   │   │           ├── carga-quimica.repository.ts
│   │   │           └── produto-quimica.repository.ts
│   ├── application/
│   │   ├── dtos/
│   │   │   ├── alterar-carga-quimica.dto.ts
│   │   │   ├── alterar-produto-quimico.dto.ts
│   │   │   ├── registrar-carga-quimica.dto.ts
│   │   │   └── registrar-produto-quimico.dto.ts
│   │   │ 
│   │   ├── errors/
│   │   │   ├── resource-conflict.error.ts
│   │   │   └── resource-not-found.error.ts
│   │   │       
│   │   ├── mocks/
│   │   │   ├── carga-quimica-repository.mock.ts
│   │   │   └── produto-quimico-repository.mock.ts      
│   │   ├── ports/
│   │   │   └── out/
│   │   │       ├── carga-quimica-repository.ts/  
│   │   │       └── produto-quimico-repository.ts/  
│   │   │
│   │   ├── use-cases/
│   │   │   ├── carga-quimica/
│   │   │   │   ├── analisar-carga-quimica.use-case.ts
│   │   │   │   ├── atualizar-carga-quimica.use-case.ts
│   │   │   │   ├── bloquear-carga-quimica.use-case.ts
│   │   │   │   ├── cancelar-carga-quimica.use-case.ts
│   │   │   │   ├── finalizar-carga-quimica.use-case.ts
│   │   │   │   ├── inspecionar-carga-quimica.use-case.ts
│   │   │   │   ├── liberar-carga-quimica.use-case.ts
│   │   │   │   ├── listar-carga-quimica.use-case.ts
│   │   │   │   ├── listar-id-carga-quimica.use-case.ts
│   │   │   │   ├── movimentarcarga-quimica.use-case.ts
│   │   │   │   └── registrar-carga-quimica.use-case.ts
│   │   │   │   
│   │   │   ├── produto-quimico/
│   │   │   │   ├── alterar-produto-quimico.use-case.ts
│   │   │   │   ├── inativar-produto-quimico.use-case.ts
│   │   │   │   ├── listar-id-produto-quimico.use-case.ts
│   │   │   │   ├── listar-produto-quimico.use-case.ts
│   │   │   │   └── registrar-produto-quimico.use-case.ts
│   │   │   │ 
│   │   │   └── tests/
│   │   │       ├── analisar-carga-quimica.use-case.test.ts
│   │   │       ├── bloquear-carga-quimica.use-case.test.ts
│   │   │       ├── cancelar-carga-quimica.use-case.test.ts
│   │   │       ├── finalizar-carga-quimica.use-case.test.ts
│   │   │       ├── inspecionar-carga-quimica.use-case.test.ts
│   │   │       ├── liberar-carga-quimica.use-case.test.ts
│   │   │       ├── movimentarcarga-quimica.use-case.test.ts
│   │   │       ├── registrar-carga-quimica.use-case.test.ts
│   │   │       └── registrar-produto-quimico.use-case.test.ts
│   │   │
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── carga-quimica.ts
│   │   │   │   ├── documentoObrigatorio.ts
│   │   │   │   ├── numero-onu.ts
│   │   │   │   └── produto-quimico.ts
│   │   │   │   
│   │   │   ├── enums/
│   │   │   │   ├── classe-de-risco.enum.ts
│   │   │   │   ├── grupo-compatibilidade.enum.ts
│   │   │   │   ├── status-carga.enum.ts
│   │   │   │   ├── status-produto.enum.ts
│   │   │   │   └── unidade-de-medida.enum.ts
│   │   │   │   
│   │   │   ├── errors/
│   │   │   │   ├── carga-quimica.validation.ts
│   │   │   │   ├── domain-interface.error.ts
│   │   │   │   ├── domain-validation.error.ts
│   │   │   │   └── produto-quimico.validation.ts
│   │   │   ├── metadata/
│   │   │   │   └── grupo-compatibilidade.metadata.ts
│   │   │   │ 
│   │   │   └── tests/
│   │   │       ├── carga-quimica.test.ts
│   │   │       └── produto-quimico.test.ts
│   │   │      
│   │   ├── infrastructure/
│   │   │       └── config
│   │   │           └── swagger.ts
└── └── └── main/
            └── app.ts
```