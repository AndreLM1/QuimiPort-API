import type { FastifyInstance } from "fastify";
import type { InputRegistrarProdutoQuimicoDto } from "@/application/dtos/registrar-produto-quimico.dto.js"
import { ProdutoQuimicoController } from "@/adapters/in/http/controller/produto-quimico.controller.js"
import type { InputAlterarProdutoQuimico } from "@/application/dtos/alterar-produto-quimico.dto.js";
import { ClasseRisco } from "@/domain/enums/classe-de-risco.enum.js";
import { StatusProduto } from "@/domain/enums/status-produto.enum.js";
import { GrupoCompatibilidade } from "@/domain/enums/grupo-compatibilidade.enum.js";

export async function produtoQuimicoRoutes(app: FastifyInstance, controller: ProdutoQuimicoController) {
    app.post<{ Body: InputRegistrarProdutoQuimicoDto }>(
        "/produtos-quimicos",
        {
            schema: {
                tags: ["Produtos Químicos"],
                summary: "Cadastrar produto químico",
                description: "Registra um novo produto químico no sistema.",
                body: {
                    type: "object",
                    properties: {
                        nome: {
                            type: "string",
                            description: "Nome do produto químico."
                        },
                        numeroOnu: {
                            type: "string",
                            description: "Número ONU do produto químico. Deve conter quatro dígitos."
                        },
                        descricao: {
                            type: "string",
                            description: "Descrição do produto químico."
                        },
                        classeRisco: {
                            type: "string",
                            enum: Object.values(ClasseRisco),
                            description: "Classe de risco do produto químico."
                        },
                        statusProduto: {
                            type: "string",
                            enum: Object.values(StatusProduto),
                            description: "Situação atual do produto químico."
                        },
                        grupoCompatibilidade: {
                            type: "string",
                            enum: Object.values(GrupoCompatibilidade),
                            description: "Grupo de compatibilidade do produto químico."
                        }
                    },
                    required: [
                        "nome",
                        "numeroOnu",
                        "descricao",
                        "classeRisco",
                        "statusProduto",
                        "grupoCompatibilidade"
                    ],

                },
                response: {
                    201: {
                        description: "Produto químico cadastrado com sucesso",
                        type: "object",
                        properties: {
                            id: { type: "number" },
                            nome: { type: "string" },
                            numeroOnu: {
                                type: "object",
                                properties: {
                                    codigo: { type: "string" }
                                },
                                required: ["codigo"]
                            },
                            descricao: { type: "string" },
                            classeRisco: {
                                type: "string",
                                enum: Object.values(ClasseRisco)
                            },
                            statusProduto: {
                                type: "string",
                                enum: Object.values(StatusProduto)
                            },
                            grupoCompatibilidade: {
                                type: "string",
                                enum: Object.values(GrupoCompatibilidade)
                            },
                            dataCriacao: {
                                type: ["string", "null"],
                                format: "date-time"
                            },
                            dataAlteracao: {
                                type: ["string"],
                                format: "date-time",
                                nullable: true
                            }
                        },
                        required: [
                            "id",
                            "nome",
                            "numeroOnu",
                            "descricao",
                            "classeRisco",
                            "statusProduto",
                            "grupoCompatibilidade"
                        ]
                    }
                }
            }
        }, (request, reply) => {
            return controller.registrar(request, reply);
        });

    app.get("/produtos-quimicos", {
        schema: {
            tags: ["Produtos Químicos"],
            summary: "Listar produtos químicos",
            description: "Retorna a lista de produtos químicos cadastrados no sistema.",
            response: {
                200: {
                    description: "Lista de produtos químicos retornada com sucesso",
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "number" },
                            nome: { type: "string" },
                            numeroOnu: {
                                type: "object",
                                properties: {
                                    codigo: { type: "string" }
                                },
                                required: ["codigo"]
                            },
                            descricao: { type: "string" },
                            classeRisco: {
                                type: "string",
                                enum: Object.values(ClasseRisco)
                            },
                            statusProduto: {
                                type: "string",
                                enum: Object.values(StatusProduto)
                            },
                            grupoCompatibilidade: {
                                type: "string",
                                enum: Object.values(GrupoCompatibilidade)
                            },
                            dataCriacao: {
                                type: "string",
                                format: "date-time"
                            },
                            dataAlteracao: {
                                type: "string",
                                format: "date-time",
                                nullable: true
                            }
                        },
                        required: [
                            "id",
                            "nome",
                            "numeroOnu",
                            "descricao",
                            "classeRisco",
                            "statusProduto",
                            "grupoCompatibilidade",
                            "dataCriacao",
                            "dataAlteracao"
                        ]
                    }
                }
            }
        }
    }, (request, reply) => {
        return controller.findAll(request, reply);
    });


    app.get<{ Params: { id: string } }>(
        "/produtos-quimicos/:id",
        {
            schema: {
                tags: ["Produtos Químicos"],
                summary: "Buscar produto químico por ID",
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" }
                    },
                    required: ["id"]
                },
                response: {
                    200: {
                        description: "Produto químico encontrado com sucesso",
                        type: "object",
                        properties: {
                            id: { type: "number" },
                            nome: { type: "string" },
                            numeroOnu: {
                                type: "object",
                                properties: {
                                    codigo: { type: "string" }
                                },
                                required: ["codigo"]
                            },
                            descricao: { type: "string" },
                            classeRisco: {
                                type: "string",
                                enum: Object.values(ClasseRisco)
                            },
                            statusProduto: {
                                type: "string",
                                enum: Object.values(StatusProduto)
                            },
                            grupoCompatibilidade: {
                                type: "string",
                                enum: Object.values(GrupoCompatibilidade)
                            },
                            dataCriacao: {
                                type: "string",
                                format: "date-time"
                            },
                            dataAlteracao: {
                                type: "string",
                                format: "date-time",
                                nullable: true
                            }
                        },
                        required: [
                            "id",
                            "nome",
                            "numeroOnu",
                            "descricao",
                            "classeRisco",
                            "statusProduto",
                            "grupoCompatibilidade",
                            "dataCriacao",
                            "dataAlteracao"
                        ]
                    },
                    404: {
                        description: "Produto químico não encontrado",
                        type: "object",
                        properties: {
                            code: { type: "string" },
                            message: { type: "string" }
                        },
                        required: ["code", "message"]
                    }
                }

            }


        },
        (request, reply) => {
            return controller.findId(request, reply);
        }
    );


    app.patch<{ Params: { id: string } }>("/produtos-quimicos/:id/inativar", {
        schema: {
            tags: ["Produtos Químicos"],
            summary: "Inativar produto químico",
            params: {
                type: "object",
                properties: {
                    id: { type: "string" }
                },
                required: ["id"]
            },
            response: {
                200: {
                    description: "Produto Químico inativado com sucesso",
                    type: "object",
                    properties: {
                        id: { type: "number" },
                        nome: { type: "string" },
                        numeroOnu: {
                            type: "object",
                            properties: {
                                codigo: { type: "string" }
                            },
                            required: ["codigo"]
                        },
                        descricao: { type: "string" },
                        classeRisco: {
                            type: "string",
                            enum: Object.values(ClasseRisco)
                        },
                        statusProduto: {
                            type: "string",
                            enum: Object.values(StatusProduto)
                        },
                        grupoCompatibilidade: {
                            type: "string",
                            enum: Object.values(GrupoCompatibilidade)
                        },
                        dataCriacao: {
                            type: "string",
                            format: "date-time"
                        },
                        dataAlteracao: {
                            type: "string",
                            format: "date-time",
                            nullable: true
                        }
                    },
                    required: [
                        "id",
                        "nome",
                        "numeroOnu",
                        "descricao",
                        "classeRisco",
                        "statusProduto",
                        "grupoCompatibilidade",
                        "dataCriacao",
                        "dataAlteracao"
                    ]
                },
                404: {
                    description: "Erro de validação",
                    type: "object",
                    properties: {
                        code: { type: "string" },
                        message: { type: "string" }
                    },
                    required: ["code", "message"]
                }
            }

        }


    }, (request, reply) => {
        return controller.inativar(request, reply);
    })

    app.put<{ Params: { id: string }, Body: InputAlterarProdutoQuimico }>("/produtos-quimicos/:id", {
        schema: {
            tags: ["Produtos Químicos"],
            summary: "Alterar produto químico",
            description: "Alterar um produto químico.",
            params: {
                type: "object",
                properties: {
                    id: { type: "string" }
                },
                required: ["id"]
            },
            body: {
                type: "object",
                properties: {
                    nome: {
                        type: "string",
                        description: "Nome do produto químico."
                    },
                    numeroOnu: {
                        type: "string",
                        description: "Número ONU do produto químico. Deve conter quatro dígitos."
                    },
                    descricao: {
                        type: "string",
                        description: "Descrição do produto químico."
                    },
                    classeRisco: {
                        type: "string",
                        enum: Object.values(ClasseRisco),
                        description: "Classe de risco do produto químico."
                    },
                    grupoCompatibilidade: {
                        type: "string",
                        enum: Object.values(GrupoCompatibilidade),
                        description: "Grupo de compatibilidade do produto químico."
                    }
                },
                required: [
                    "nome",
                    "numeroOnu",
                    "descricao",
                    "classeRisco",
                    "grupoCompatibilidade"
                ],

            },
            response: {
                200: {
                    description: "Produto químico alterado com sucesso",
                    type: "object",
                    properties: {
                        id: { type: "number" },
                        nome: { type: "string" },
                        numeroOnu: {
                            type: "object",
                            properties: {
                                codigo: { type: "string" }
                            },
                            required: ["codigo"]
                        },
                        descricao: { type: "string" },
                        classeRisco: {
                            type: "string",
                            enum: Object.values(ClasseRisco)
                        },
                        statusProduto: {
                            type: "string",
                            enum: Object.values(StatusProduto)
                        },
                        grupoCompatibilidade: {
                            type: "string",
                            enum: Object.values(GrupoCompatibilidade)
                        },
                        dataCriacao: {
                            type: ["string"],
                            format: "date-time"
                        },
                        dataAlteracao: {
                            type: ["string"],
                            format: "date-time",
                            nullable: true
                        }
                    },
                    required: [
                        "id",
                        "nome",
                        "numeroOnu",
                        "descricao",
                        "classeRisco",
                        "statusProduto",
                        "grupoCompatibilidade",
                        "dataCriacao",
                        "dataAlteracao"
                    ]
                },
                400: {
                    description: "Dados inválidos para alteração do produto químico",
                    type: "object",
                    properties: {
                        error: { type: "string" },
                        message: { type: "string" },
                        violations: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    code: { type: "string" },
                                    field: { type: "string" },
                                    message: { type: "string" }
                                },
                                required: ["code", "field", "message"]
                            }
                        }
                    },
                    required: ["error", "message", "violations"]
                },
                404: {
                    description: "Erro de validação",
                    type: "object",
                    properties: {
                        code: { type: "string" },
                        message: { type: "string" }
                    },
                    required: ["code", "message"]
                }
            }
        }
    }, (request, reply) => {
        return controller.alterar(request, reply)
    })


}