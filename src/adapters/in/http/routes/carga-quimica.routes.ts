import type { FastifyInstance } from "fastify";
import type { InputRegistrarCargaQuimicaDto } from "@/application/dtos/registrar-carga-quimica.dto.js"
import { CargaQuimicaController } from "@/adapters/in/http/controller/carga-quimica.controller.js";
import type { InputAlterarCargaQuimica } from "@/application/dtos/alterar-carga-quimica.dto.js";
import { UnidadeDeMedida } from "@/domain/enums/unidade-de-medida.enum.js";
import { DocumentoObrigatorio } from "@/domain/entities/documentoObrigatorio.js";
import { StatusCargaQuimica } from "@/domain/enums/status-carga-quimica.enum.js";

export async function cargaQuimicaRoutes(app: FastifyInstance, controller: CargaQuimicaController) {
    app.post<{ Body: InputRegistrarCargaQuimicaDto }>("/cargas-quimicas", {
        schema: {
            tags: ["Carga Química"],
            summary: "Cadastrar carga química",
            description: "Registra uma nova carga química no sistema.",
            body: {
                type: "object",
                properties: {
                    codigoCarga: {
                        type: "string",
                        description: "Código da Carga Química."
                    },
                    produtoQuimicoId: {
                        type: "number",
                        description: "Código de identificação do Produto Químico."
                    },
                    quantidade: {
                        type: "number",
                        description: "Quantidade da Carga Química."
                    },
                    unidadeMedida: {
                        type: "string",
                        enum: Object.values(UnidadeDeMedida),
                        description: "Unidade de medida da Carga Química."
                    },
                    origem: {
                        type: "string",
                        description: "Origem da Carga Química."
                    },
                    destino: {
                        type: "string",
                        description: "Destino da Carga Química."
                    },
                    responsavelTecnico: {
                        type: "string",
                        description: "Responsável Técnico da Carga Química."
                    },
                    documentoObrigatorio: {
                        type: "object",
                        description: "Documentação obrigatória da Carga Química.",
                        properties: {
                            notaFiscal: {
                                type: "number",
                                description: "Número da Nota Fiscal."
                            },
                            declaracaoExpedidor: {
                                type: "boolean",
                                description: "Indica se a Declaração do Expedidor foi apresentada"
                            },
                            fichaDadosSeguranca: {
                                type: "boolean",
                                description: "Indica se a Ficha com Dados de Segurança do expedidor foi apresentada"
                            },
                            certificadoTransporteProdutosPerigoso: {
                                type: "boolean",
                                description: "Indica se o Certificado de Transporte de Produtos Perigosos foi apresentado"
                            }
                        },
                        required: [
                            "notaFiscal",
                            "declaracaoExpedidor",
                            "fichaDadosSeguranca",
                            "certificadoTransporteProdutosPerigoso"
                        ]
                    }
                },
                required: [
                    "codigoCarga",
                    "produtoQuimicoId",
                    "quantidade",
                    "unidadeMedida",
                    "origem",
                    "destino",
                    "responsavelTecnico",
                    "documentoObrigatorio"
                ]
            },
            response: {
                201: {
                    description: "Carga Química cadastrada com sucesso",
                    type: "object",
                    properties: {
                        id: { type: "number" },
                        codigoCarga: { type: "string" },
                        produtoQuimicoId: { type: "number" },
                        quantidade: { type: "number" },
                        unidadeMedida: {
                            type: "string",
                            enum: Object.values(UnidadeDeMedida)
                        },
                        origem: { type: "string" },
                        destino: { type: "string" },
                        responsavelTecnico: { type: "string" },
                        documentoObrigatorio: {
                            type: "object",
                            properties: {
                                notaFiscal: { type: "number" },
                                declaracaoExpedidor: { type: "boolean" },
                                fichaDadosSeguranca: { type: "boolean" },
                                certificadoTransporteProdutosPerigoso: { type: "boolean" }
                            },
                            required: [
                                "notaFiscal",
                                "declaracaoExpedidor",
                                "fichaDadosSeguranca",
                                "certificadoTransporteProdutosPerigoso"
                            ]
                        },
                        statusCarga: {
                            type: "string",
                            enum: Object.values(StatusCargaQuimica)
                        },
                        dataCriacao: {
                            type: ["string", "null"],
                            format: "date-time"
                        },
                        dataAtualizacao: {
                            type: ["string"],
                            format: "date-time",
                            nullable: true
                        }
                    },
                    required: [
                        "id",
                        "codigoCarga",
                        "produtoQuimicoId",
                        "quantidade",
                        "unidadeMedida",
                        "origem",
                        "destino",
                        "responsavelTecnico",
                        "documentoObrigatorio",
                        "statusCarga",
                        "dataCriacao",
                        "dataAtualizacao"

                    ]
                },
                400: {
                    description: "Não foi possível registrar a carga química devido a uma violação de regra de negócio.",
                    type: "object",
                    properties: {
                        error: {
                            type: "string",
                            example: "DomainValidationError"
                        },
                        message: {
                            type: "string",
                            example: "Não foi possível registrar a carga química"
                        },
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
                            },
                            example: [
                                {
                                    code: "PRODUTO_QUIMICO_INATIVO",
                                    field: "statusProduto",
                                    message: "Não é permitido registrar uma carga com um produto químico inativo"
                                }
                            ]
                        }
                    },
                    required: ["error", "message", "violations"]
                },
                404: {
                    description: "Produto químico associado à carga não encontrado.",
                    type: "object",
                    properties: {
                        code: {
                            type: "string",
                            example: "PRODUTO_QUIMICO_NAO_ENCONTRADO"
                        },
                        message: {
                            type: "string",
                            example: "Produto químico com ID 10 não encontrado"
                        }
                    },
                    required: ["code", "message"]
                },
                409: {
                    type: "object",
                    properties: {
                        code: {
                            type: "string",
                            example: "CODIGO_CARGA_DUPLICADO"
                        },
                        message: {
                            type: "string",
                            example: "Já existe uma carga química cadastrada com o código TESTE 5"
                        }
                    },
                    required: ["code", "message"]
                }
            }
        }
    }, (request, reply) => {
        return controller.registrar(request, reply)
    });

    app.get("/cargas-quimicas", {
        schema: {
            tags: ["Carga Química"],
            summary: "Cadastrar carga química",
            description: "Registra uma nova carga química no sistema.",
            response: {
                201: {
                    description: "Carga Química cadastrada com sucesso",
                    type: "object",
                    properties: {
                        id: { type: "number" },
                        codigoCarga: { type: "string" },
                        produtoQuimicoId: { type: "number" },
                        quantidade: { type: "number" },
                        unidadeMedida: {
                            type: "string",
                            enum: Object.values(UnidadeDeMedida)
                        },
                        origem: { type: "string" },
                        destino: { type: "string" },
                        responsavelTecnico: { type: "string" },
                        documentoObrigatorio: {
                            type: "object",
                            properties: {
                                notaFiscal: { type: "number" },
                                declaracaoExpedidor: { type: "boolean" },
                                fichaDadosSeguranca: { type: "boolean" },
                                certificadoTransporteProdutosPerigoso: { type: "boolean" }
                            },
                            required: [
                                "notaFiscal",
                                "declaracaoExpedidor",
                                "fichaDadosSeguranca",
                                "certificadoTransporteProdutosPerigoso"
                            ]
                        },
                        statusCarga: {
                            type: "string",
                            enum: Object.values(StatusCargaQuimica)
                        },
                        dataCriacao: {
                            type: ["string", "null"],
                            format: "date-time"
                        },
                        dataAtualizacao: {
                            type: ["string"],
                            format: "date-time",
                            nullable: true
                        }
                    },
                    required: [
                        "id",
                        "codigoCarga",
                        "produtoQuimicoId",
                        "quantidade",
                        "unidadeMedida",
                        "origem",
                        "destino",
                        "responsavelTecnico",
                        "documentoObrigatorio",
                        "statusCarga",
                        "dataCriacao",
                        "dataAtualizacao"

                    ]
                }
            }
        }
    }, (request, reply) => {
        return controller.findAll(request, reply);
    });

    app.get<{ Params: { id: string } }>("/cargas-quimicas/:id", (request, reply) => {
        return controller.findId(request, reply);
    })

    app.put<{ Params: { id: string }, Body: InputAlterarCargaQuimica }>("/cargas-quimicas/:id", (request, reply) => {
        return controller.alterar(request, reply)
    })

    app.patch<{ Params: { id: string } }>("/cargas-quimicas/:id/analisar", (request, reply) => {
        return controller.analisar(request, reply)
    })

    app.patch<{ Params: { id: string } }>("/cargas-quimicas/:id/inspecionar", (request, reply) => {
        return controller.inspecionar(request, reply)
    })

    app.patch<{ Params: { id: string } }>("/cargas-quimicas/:id/liberar", (request, reply) => {
        return controller.liberar(request, reply)
    })

    app.patch<{ Params: { id: string } }>("/cargas-quimicas/:id/movimentar", (request, reply) => {
        return controller.movimentar(request, reply)
    })

    app.patch<{ Params: { id: string } }>("/cargas-quimicas/:id/finalizar", (request, reply) => {
        return controller.finalizar(request, reply)
    })

    app.patch<{ Params: { id: string } }>("/cargas-quimicas/:id/bloquear", (request, reply) => {
        return controller.bloquear(request, reply)
    })

    app.patch<{ Params: { id: string } }>("/cargas-quimicas/:id/cancelar", (request, reply) => {
        return controller.cancelar(request, reply)
    })


};